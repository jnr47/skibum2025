/* Shared forecast contract used by the collector and all three pages. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SkiBumForecast = factory();
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const HOUR = 3600000;
  const FRESH_HOURS = 12;
  const fields = ['snowfall_24hr', 'snowfall_48hr', 'snowfall_7day'];
  const empty = () => ({ forecast24hr: null, forecast48hr: null, forecast7day: null, status: 'unavailable', lastUpdated: null, windowStart: null });
  function validRecord(r) {
    if (!r || r.units !== 'in' || r.data_source !== 'Open-Meteo' || !r.resort_id) return false;
    const start = Date.parse(r.window_start), updated = Date.parse(r.last_updated);
    return Number.isFinite(start) && start % HOUR === 0 && Number.isFinite(updated) && updated >= start &&
      updated - start < 2 * HOUR &&
      fields.every(k => Number.isFinite(r[k]) && r[k] >= 0) &&
      r.snowfall_24hr <= r.snowfall_48hr && r.snowfall_48hr <= r.snowfall_7day &&
      [24, 48, 168].every((hours, i) => Date.parse(r.window_ends?.[fields[i]]) === start + hours * HOUR);
  }
  function status(r, now = Date.now()) {
    if (!validRecord(r) || !['fresh', 'stale'].includes(r.status)) return 'unavailable';
    const age = now - Date.parse(r.last_updated);
    if (age < -5 * 60000 || Date.parse(r.window_start) > now) return 'unavailable';
    return r.status === 'stale' || age > FRESH_HOURS * HOUR || now - Date.parse(r.window_start) > FRESH_HOURS * HOUR ? 'stale' : 'fresh';
  }
  function view(r, now) {
    const state = status(r, now);
    return {
      forecast24hr: state === 'fresh' ? r.snowfall_24hr : null,
      forecast48hr: state === 'fresh' ? r.snowfall_48hr : null,
      forecast7day: state === 'fresh' ? r.snowfall_7day : null,
      status: state,
      lastUpdated: validRecord(r) ? r.last_updated : null,
      windowStart: validRecord(r) ? r.window_start : null
    };
  }
  function views(snapshot, catalog, now = Date.now()) {
    const records = snapshot?.schema_version === 2 && Array.isArray(snapshot.resorts) ? snapshot.resorts : [];
    const counts = new Map();
    for (const r of records) counts.set(r.resort_id, (counts.get(r.resort_id) || 0) + 1);
    return Object.fromEntries(catalog.map(resort => {
      const record = counts.get(resort.id) === 1 && records.find(r => r.resort_id === resort.id);
      // A changed forecast point must never inherit another location's weather.
      return [resort.id, record && record.lat === resort.lat && record.lng === resort.lng ? view(record, now) : empty()];
    }));
  }
  function format(value) { return Number.isFinite(value) ? `${value.toFixed(1)}″` : 'Unavailable'; }
  function utc(value) { return new Date(value).toISOString().replace('T', ' ').replace(':00.000Z', ' UTC'); }
  // Consumer-facing copy only; validation and freshness rules stay unchanged.
  function freshnessLabel(v) {
    if (v?.status === 'fresh') return 'Updated recently.';
    if (v?.status === 'stale') return 'Snow forecasts are refreshing.';
    return 'Forecast unavailable. Please try again later.';
  }
  function overviewLabel(data) {
    const all = Object.values(data);
    if (all.some(v => v.status === 'fresh')) {
      return all.every(v => v.status === 'fresh') ? 'Updated recently.' : 'Some forecasts are unavailable. Explore the latest available snow forecasts.';
    }
    return all.some(v => v.status === 'stale') ? 'Snow forecasts are refreshing.' : 'Forecast unavailable. Please try again later.';
  }
  function description(v) {
    if (!v?.lastUpdated) return 'Forecast unavailable; no valid timestamped data.';
    return `${v.status === 'fresh' ? 'Forecast' : 'Stale forecast — excluded from snow totals and rankings'}. Retrieved ${utc(v.lastUpdated)}. Windows start ${utc(v.windowStart)} (24h / 48h / 168h).`;
  }
  function summary(data) {
    const all = Object.values(data), fresh = all.filter(v => v.status === 'fresh');
    const starts = [...new Set(fresh.map(v => v.windowStart))];
    const updated = fresh.map(v => v.lastUpdated).sort()[0];
    return `${fresh.length}/${all.length} forecasts available · ${all.filter(v => v.status === 'stale').length} stale · ${all.filter(v => v.status === 'unavailable').length} unavailable` +
      (updated ? `. Oldest retrieval ${utc(updated)}.` : '.') +
      (starts.length === 1 ? ` Windows start ${utc(starts[0])}; totals cover 24h, 48h, or 168h from that time.` : '');
  }
  return { HOUR, FRESH_HOURS, fields, empty, validRecord, status, view, views, format, freshnessLabel, overviewLabel, description, summary };
}));
