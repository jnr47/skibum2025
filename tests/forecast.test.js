'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { aggregate, fetchForecast, fallback, generateSnowData, writeSnapshot } = require('../scripts/fetch-snow-data');
const F = require('../assets/forecast');
const { validateCatalog } = require('../scripts/build-catalog');
const catalog = require('../data/resorts.json');
const H = F.HOUR;
const start = Date.parse('2026-11-01T06:00:00Z'); // US fall DST transition
const now = start + 30 * 60000;
const resort = catalog.resorts[0];
function payload(at = start) {
  return { hourly_units: { time: 'unixtime', snowfall: 'cm' }, latitude: resort.lat, longitude: resort.lng, elevation: 1800,
    hourly: { time: Array.from({ length: 192 }, (_, i) => (at - 23 * H + i * H) / 1000), snowfall: Array(192).fill(2.54) } };
}
function record(r = resort, at = start) {
  return { resort_id: r.id, lat: r.lat, lng: r.lng, data_source: 'Open-Meteo', status: 'fresh', units: 'in',
    window_start: new Date(at).toISOString(), last_updated: new Date(at + 30 * 60000).toISOString(),
    window_ends: Object.fromEntries(F.fields.map((k,i) => [k,new Date(at + [24,48,168][i]*H).toISOString()])),
    snowfall_24hr: 24, snowfall_48hr: 48, snowfall_7day: 168 };
}
const previous = r => ({ schema_version: 2, resorts: [r] });
const noSleep = async () => {};
test('24/48/168 exact future intervals exclude past-hour snowfall and convert cm to inches', () => {
  const p = payload();
  p.hourly.snowfall[23] = 999; // sample at start covers the PRECEDING hour
  assert.deepEqual(aggregate(p, start), { snowfall_24hr:24,snowfall_48hr:48,snowfall_7day:168 });
});
test('zero snowfall is valid, not unavailable', () => {
  const p = payload(); p.hourly.snowfall.fill(0);
  assert.equal(aggregate(p, start).snowfall_7day, 0);
  assert.equal(F.format(0), '0.0″');
  assert.equal(F.format(null), 'Unavailable');
});
for (const date of ['2026-03-08T07:00:00Z','2026-11-01T06:00:00Z','2026-09-22T23:00:00Z','2026-09-23T00:00:00Z']) {
  test(`UTC intervals survive DST/midnight: ${date}`, () => {
    const at = Date.parse(date); assert.equal(aggregate(payload(at), at).snowfall_7day,168);
  });
}
for (const bad of [null, undefined, NaN, -1, '2.54', Infinity, 1001]) {
  test(`reject missing/invalid hour: ${String(bad)}`, () => {
    const p=payload();p.hourly.snowfall[40]=bad;assert.throws(()=>aggregate(p,start));
  });
}
test('reject short, duplicate, gapped, misaligned and wrong-unit responses', () => {
  for (const mutate of [p=>p.hourly.time.pop(),p=>p.hourly.time[24]=p.hourly.time[23],p=>p.hourly.time[24]+=3600*500,p=>p.hourly.time[24]+=1,p=>p.hourly_units.snowfall='inch']) {
    const p=payload();mutate(p);assert.throws(()=>aggregate(p,start));
  }
});
test('retry transient HTTP errors and request UTC epochs with enough horizon', async () => {
  let calls=0;
  const result = await fetchForecast(resort,start,{clock:()=>now,sleep:noSleep,fetchImpl:async(url,options)=>{
    assert.equal(url.searchParams.get('timezone'),'GMT');assert.equal(url.searchParams.get('forecast_days'),'8');
    assert.equal(url.searchParams.get('timeformat'),'unixtime');assert.ok(options.signal);
    return ++calls===1?{ok:false,status:429}:{ok:true,json:async()=>payload()};
  }});
  assert.equal(calls,2);assert.equal(result.snowfall_24hr,24);assert.equal(result.model_location.elevation_m,1800);
});
test('exhausted retry does not expose URLs or credentials', async () => {
  let calls=0;
  await assert.rejects(fetchForecast(resort,start,{sleep:noSleep,fetchImpl:async()=>{calls++;throw Error('https://provider/?apikey=SECRET');}}),e=>!e.message.includes('SECRET'));
  assert.equal(calls,3);
});
test('isolated failure retains previous timestamps and windows, marked stale', () => {
  const old=record(resort,start-6*H);const r=fallback(resort,previous(old),now);
  assert.equal(r.status,'stale');assert.equal(r.window_start,old.window_start);assert.equal(r.last_updated,old.last_updated);
  assert.equal(F.view(r,now).forecast24hr,null);
});
test('legacy, expired, mismatched, malformed and absent fallback cannot become fresh zeros', () => {
  for (const p of [null,{resorts:[record()]},previous(record(resort,start-80*H)),previous({...record(),lat:0}),previous({...record(),snowfall_24hr:null})]) {
    const r=fallback(resort,p,now);assert.equal(r.status,'unavailable');assert.equal(r.snowfall_24hr,null);assert.equal(r.last_updated,null);
  }
});
test('freshness is derived from actual retrieval/window times; future timestamps rejected', () => {
  assert.equal(F.status(record(),now),'fresh');assert.equal(F.status(record(),now+13*H),'stale');
  assert.equal(F.status(record(),start-6*H),'unavailable');
});
test('ID joins reject coordinate changes and duplicate IDs; legacy format unavailable', () => {
  assert.equal(F.views(previous(record()),[resort],now)[resort.id].forecast24hr,24);
  assert.equal(F.views(previous({...record(),lat:0}),[resort],now)[resort.id].forecast24hr,null);
  assert.equal(F.views({schema_version:2,resorts:[record(),record()]},[resort],now)[resort.id].forecast24hr,null);
  assert.equal(F.views({resorts:[record()]},[resort],now)[resort.id].forecast24hr,null);
});
test('80% coverage permits partial failure; lower coverage refuses publication', async () => {
  const resorts=catalog.resorts.slice(0,5);
  const getForecast=async r=>{if(r.id===resorts[4].id)throw Error();return record(r);};
  const result=await generateSnowData({resorts,now,getForecast,sleep:noSleep});
  assert.deepEqual(result.coverage,{fresh:4,stale:0,unavailable:1});
  await assert.rejects(generateSnowData({resorts,now,getForecast:async()=>{throw Error();},sleep:noSleep}),/Publication refused/);
});
test('failed collection leaves existing snapshot byte-for-byte intact', async () => {
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'skibum-test-'));const target=path.join(dir,'forecast.json');
  try {
    fs.writeFileSync(target,'previous valid snapshot');
    await assert.rejects(async()=>{const data=await generateSnowData({resorts:[resort],now,getForecast:async()=>{throw Error();},sleep:noSleep});writeSnapshot(target,data);});
    assert.equal(fs.readFileSync(target,'utf8'),'previous valid snapshot');
    writeSnapshot(target,{checked:true});assert.deepEqual(JSON.parse(fs.readFileSync(target)),{checked:true});assert.ok(!fs.existsSync(target+'.tmp'));
  } finally {fs.rmSync(dir,{recursive:true,force:true});}
});
test('catalog names, aliases, IDs and locations are unique with provenance', () => {
  validateCatalog(catalog);assert.equal(catalog.resorts.length,103);
  for (const mutate of [c=>c.resorts.push(c.resorts[0]),c=>c.resorts[1].aliases.push(c.resorts[0].name),c=>c.resorts[1].lat=200]) {
    const copy=structuredClone(catalog);mutate(copy);assert.throws(()=>validateCatalog(copy));
  }
});
test('known coordinate and identity regressions are corrected', () => {
  const find=id=>catalog.resorts.find(r=>r.id===id);
  assert.ok(find('panorama').lat<50.6);assert.ok(find('49-degrees-north').lat<48.5);
  assert.ok(find('palisades-tahoe').aliases.includes('Squaw Valley'));
  assert.ok(find('whitefish-mountain-resort').aliases.includes('Big Mountain'));
  assert.notDeepEqual([find('aspen-mountain').lat,find('aspen-mountain').lng],[find('snowmass').lat,find('snowmass').lng]);
});
