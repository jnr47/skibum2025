'use strict';
const fs = require('node:fs');
const path = require('node:path');
const catalog = require('../data/resorts.json');
function validateCatalog(value) {
  if (value.schema_version !== 1 || !Array.isArray(value.resorts) || !value.resorts.length) throw new Error('Invalid catalog');
  const ids = new Set(), names = new Set(), points = new Set();
  for (const r of value.resorts) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id) || ids.has(r.id)) throw new Error(`Invalid/duplicate ID: ${r.id}`);
    ids.add(r.id);
    for (const name of [r.name, ...r.aliases]) {
      const key = name.toLowerCase();
      if (!name || names.has(key)) throw new Error(`Ambiguous name: ${name}`);
      names.add(key);
    }
    if (!Number.isFinite(r.lat) || Math.abs(r.lat) > 90 || !Number.isFinite(r.lng) || Math.abs(r.lng) > 180) throw new Error(`Invalid coordinates: ${r.id}`);
    const point = `${r.lat},${r.lng}`;
    if (points.has(point)) throw new Error(`Duplicate location: ${r.id}`);
    points.add(point);
    if (!r.location?.sources?.length || !r.location.checked_on || r.location.kind !== 'ski_area_reference') throw new Error(`Missing location provenance: ${r.id}`);
  }
  return value;
}
function build(check = false) {
  validateCatalog(catalog);
  const content = '// Generated from data/resorts.json. Run npm run build:catalog; do not edit.\n' +
    `window.SKIBUM_RESORTS = ${JSON.stringify(catalog.resorts, null, 2)};\n`;
  const target = path.join(__dirname, '../assets/resorts.js');
  if (check) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== content) throw new Error('Browser catalog is out of date');
  } else fs.writeFileSync(target, content);
  console.log(`${catalog.resorts.length} unique resorts validated`);
}
if (require.main === module) build(process.argv.includes('--check'));
module.exports = { validateCatalog };
