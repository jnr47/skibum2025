'use strict';
const fs = require('node:fs');
const path = require('node:path');
const token = process.env.MAPBOX_PUBLIC_TOKEN || '';
if (token && !token.startsWith('pk.')) throw new Error('MAPBOX_PUBLIC_TOKEN must be a public browser token, never a secret token');
// This deploy-time public configuration is intentionally excluded from Git.
fs.writeFileSync(path.join(__dirname, '../assets/runtime-config.js'),
  `window.SKIBUM_CONFIG = ${JSON.stringify({ mapboxPublicToken: token })};\n`);
console.log(token ? 'Public map configuration generated' : 'Map token not configured; forecast lists remain available');
