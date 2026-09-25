# SkiBum forecast foundation

A static ski-area forecast map backed by a validated resort catalog and timestamped Open-Meteo model forecasts. These are **predictions, not measured snowfall, base depth, resort operating status, or road conditions**.

## Data flow

`data/resorts.json` → `scripts/fetch-snow-data.js` → `forecast-data.json` → homepage, map, Mammoth page.

- `data/resorts.json` is the only production resort catalog: 103 stable IDs, canonical names, aliases, reference coordinates, and location provenance.
- `assets/resorts.js` is generated for browsers with `npm run build:catalog`; CI checks it matches the source.
- `assets/forecast.js` shares validation/freshness/display rules between the collector and browser.
- `snow-data.json`, `final_resorts.json`, and `test_algorithm.js` are **legacy artifacts**, not sources for the production forecast UI. Parking research has not been verified for current use.

## Local development

Requires Node 22+. There are no npm runtime dependencies.

```sh
npm ci                 # pinned development/test dependencies
npm run check
npm run build           # generates catalog and public map configuration
npm run fetch:snow      # requests current forecasts; writes forecast-data.json locally
python3 -m http.server 8000
```

Open `http://localhost:8000/`, `/map.html`, and `/mammoth.html`. Serve at the site root because data/assets use root-relative paths.

Browser interaction checks: `npx playwright install chromium`, then `npm run test:browser`. The browser suite uses deterministic weather and Mapbox fixtures; it does not verify external token permissions or live basemap rendering.

## Forecast contract

Eight UTC calendar days of hourly snowfall are requested as Unix timestamps. A single collection run uses its starting UTC hour for all resorts. Open-Meteo snowfall is a **preceding-hour sum**, so an interval beginning at 10:00 uses samples ending at 11:00 through the exact end of the interval. Totals cover 24, 48, and 168 elapsed hours. The UI states their starting time; they are not rolling totals from each visitor's arrival time.

All required samples must be present, finite, nonnegative and in centimeters before conversion to inches. Missing values are never zero-filled. Each record contains requested coordinates, provider grid coordinates/elevation, retrieval time, and explicit interval endpoints. The retrieval time is not a weather-model issue time.

The collector retries up to three times with a 15-second timeout per attempt. Isolated failures retain a matching valid prior record for up to 72 hours, with its original timestamps/windows and `stale` status. Without a usable prior record, values are null and unavailable. Below 80% fresh coverage, publication fails and the previous file is left intact. Successful writes use an atomic rename.

Browsers treat records older than 12 hours as stale, including records whose window start is over 12 hours old. Stale/unavailable values are excluded from map heat, totals and rankings; the UI explains their status. Freshness is re-evaluated every minute, and the snapshot is re-fetched every five minutes. Zero is shown as `0.0″` only for valid fresh data.

## Map configuration required before deployment

GitHub secret protection rejected the pre-existing hardcoded Mapbox token. It has been removed from the edited pages rather than bypassing protection. Set `MAPBOX_PUBLIC_TOKEN` in the hosting build environment and use `npm run build` as the build command. The generated `assets/runtime-config.js` is ignored by Git. Use a Mapbox **public** token with appropriate URL restrictions; never use a secret token. Without configuration, the map is unavailable and forecast totals remain usable. This draft must not be deployed until the host build setting and token are configured and verified.

## Automation and deployment boundary

The data workflow runs at 00:17, 06:17, 12:17 and 18:17 UTC (actual starts may be delayed). Only `main` may publish. Validation runs before collection. Workflow failures leave an Actions failure summary; enable repository failure notifications for the operator. Direct data commits are retained for the existing static-host architecture.

`Foundation checks` validates pull requests without collecting weather or deploying. No production deploy command is part of this change. Hosting integrations are external to this repository: verify Cloudflare/Vercel production-branch settings before merging. Branch previews may be created by those integrations.

After deployment approval, merge and run **Update Snow Data** on `main` to refresh the seeded snapshot. Do not claim current forecasts from an aged PR snapshot. Confirm all three pages show actual collection times. Roll back by reverting the code commit; the legacy snapshot remains available to the old implementation.

## Sources and limitations

See [source/attribution page](docs/data-sources.html), [catalog migration](docs/catalog-migration.md), and [data license](DATA_LICENSE.md). Forecasts use representative ski-area points from a reviewed OpenSkiData reference match, not verified summit/base observations. A point forecast cannot describe every elevation/aspect of a resort.

For commercial operation configure `OPEN_METEO_API_KEY` as a GitHub Actions secret. The collector then uses the customer endpoint. Do not put the key in frontend code. Free endpoint use and attribution must comply with the provider's terms.

Pass, distance, parking, email alerts and booking are not implemented by this milestone. Homepage controls for unconnected ranking filters are disabled. Legacy parking policy prose and editorial content still require separate verification.

## Historical intent

The old README is preserved in `docs/history/README-2025-11-07.md`. `PROJECT.md` contains the December 2025 roadmap and is not an implementation status report. The old Worker/NOAA caching issue is historical.
