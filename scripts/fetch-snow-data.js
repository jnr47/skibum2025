'use strict';
const fs = require('node:fs');
const path = require('node:path');
const catalog = require('../data/resorts.json');
const { validateCatalog } = require('./build-catalog');
const { HOUR, fields, validRecord } = require('../assets/forecast');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function aggregate(payload, windowStart) {
  const h = payload.hourly;
  if (payload.hourly_units?.snowfall !== 'cm' || payload.hourly_units?.time !== 'unixtime' ||
      !Array.isArray(h?.time) || !Array.isArray(h?.snowfall) || h.time.length !== h.snowfall.length) {
    throw new Error('Missing hourly data or unexpected units');
  }
  const byTime = new Map();
  h.time.forEach((seconds, i) => {
    if (!Number.isFinite(seconds) || seconds * 1000 % HOUR !== 0 || byTime.has(seconds * 1000)) throw new Error('Invalid/duplicate hourly timestamp');
    byTime.set(seconds * 1000, h.snowfall[i]);
  });
  let sum = 0;
  const result = {};
  // Open-Meteo snowfall is the sum for the PRECEDING hour. The sample at
  // start + 1h covers [start, start + 1h); never include the hour before start.
  for (let hour = 1; hour <= 168; hour++) {
    const cm = byTime.get(windowStart + hour * HOUR);
    if (!Number.isFinite(cm) || cm < 0 || cm > 1000) throw new Error(`Missing/invalid snowfall at hour ${hour}`);
    sum += cm;
    const index = [24, 48, 168].indexOf(hour);
    if (index >= 0) result[fields[index]] = Math.round(sum / 2.54 * 10) / 10;
  }
  return result;
}

async function fetchForecast(resort, windowStart, { fetchImpl = fetch, sleep = delay, clock = Date.now } = {}) {
  const endpoint = process.env.OPEN_METEO_API_KEY ? 'https://customer-api.open-meteo.com/v1/forecast' : 'https://api.open-meteo.com/v1/forecast';
  const url = new URL(endpoint);
  const params = { latitude: resort.lat, longitude: resort.lng, hourly: 'snowfall', forecast_days: 8, timezone: 'GMT', timeformat: 'unixtime' };
  if (process.env.OPEN_METEO_API_KEY) params.apikey = process.env.OPEN_METEO_API_KEY;
  url.search = new URLSearchParams(params).toString();
  let error;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetchImpl(url, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`Weather provider returned HTTP ${response.status}`);
      const payload = await response.json();
      const totals = aggregate(payload, windowStart);
      if (![payload.latitude, payload.longitude, payload.elevation].every(Number.isFinite)) throw new Error('Missing model location metadata');
      return {
        resort_id: resort.id, name: resort.name, lat: resort.lat, lng: resort.lng,
        status: 'fresh', units: 'in', data_source: 'Open-Meteo',
        window_start: new Date(windowStart).toISOString(),
        window_ends: Object.fromEntries(fields.map((key, i) => [key, new Date(windowStart + [24, 48, 168][i] * HOUR).toISOString()])),
        ...totals, last_updated: new Date(clock()).toISOString(),
        model_location: { lat: payload.latitude, lng: payload.longitude, elevation_m: payload.elevation }
      };
    } catch (err) {
      // Never include request URLs or provider bodies (which may include API keys).
      error = err;
      if (attempt < 2) await sleep(500 * 2 ** attempt);
    }
  }
  throw new Error(error?.name === 'TimeoutError' ? 'Weather request timed out' : 'Weather fetch or validation failed');
}

function fallback(resort, previous, now) {
  const candidates = previous?.schema_version === 2 && Array.isArray(previous.resorts) ? previous.resorts.filter(r => r.resort_id === resort.id) : [];
  const old = candidates.length === 1 ? candidates[0] : null;
  const age = now - Date.parse(old?.last_updated);
  if (validRecord(old) && old.lat === resort.lat && old.lng === resort.lng && age >= 0 && age <= 72 * HOUR) {
    return { ...old, status: 'stale', last_attempted_at: new Date(now).toISOString(), error: 'Refresh failed; retained previous forecast with its original time windows' };
  }
  return { resort_id: resort.id, name: resort.name, lat: resort.lat, lng: resort.lng,
    status: 'unavailable', units: 'in', data_source: 'Open-Meteo',
    snowfall_24hr: null, snowfall_48hr: null, snowfall_7day: null,
    window_start: null, window_ends: null, last_updated: null,
    last_attempted_at: new Date(now).toISOString(), error: 'No valid forecast available' };
}

async function generateSnowData({ resorts = catalog.resorts, previous = null, now = Date.now(), getForecast = fetchForecast, sleep = delay } = {}) {
  const windowStart = Math.floor(now / HOUR) * HOUR;
  const results = [];
  for (const resort of resorts.filter(r => r.forecast_enabled)) {
    try {
      const record = await getForecast(resort, windowStart);
      if (!validRecord(record) || record.window_start !== new Date(windowStart).toISOString()) throw new Error('Invalid forecast record');
      results.push(record);
    } catch {
      results.push(fallback(resort, previous, now));
    }
    await sleep(100);
  }
  const coverage = {
    fresh: results.filter(r => r.status === 'fresh').length,
    stale: results.filter(r => r.status === 'stale').length,
    unavailable: results.filter(r => r.status === 'unavailable').length
  };
  // Keep the entire previous file intact during widespread provider failure.
  if (!results.length || coverage.fresh / results.length < 0.8) throw new Error(`Publication refused: ${coverage.fresh}/${results.length} fresh forecasts (80% required)`);
  return { schema_version: 2, generated_at: new Date(now).toISOString(), total_resorts: results.length,
    data_source: 'Open-Meteo', units: 'in', coverage, resorts: results };
}
function writeSnapshot(target, data) {
  const temporary = `${target}.tmp`;
  try {
    fs.writeFileSync(temporary, JSON.stringify(data, null, 2) + '\n');
    fs.renameSync(temporary, target);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
}
async function main() {
  validateCatalog(catalog);
  const target = path.resolve(process.env.SNOW_OUTPUT_PATH || path.join(__dirname, '../forecast-data.json'));
  let previous = null;
  if (fs.existsSync(target)) {
    try { previous = JSON.parse(fs.readFileSync(target, 'utf8')); } catch { /* Corrupt files cannot supply fallback data. */ }
  }
  const data = await generateSnowData({ previous });
  writeSnapshot(target, data);
  console.log(`Published ${data.total_resorts} forecasts: ${JSON.stringify(data.coverage)}`);
}
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
module.exports = { aggregate, fetchForecast, fallback, generateSnowData, writeSnapshot };
