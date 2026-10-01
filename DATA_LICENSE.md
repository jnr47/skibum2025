# Resort-location data attribution and license

The location portion of `data/resorts.json` and its generated browser representation in `assets/resorts.js` is derived from OpenSkiData / OpenSkiMap.org's ski-area GeoJSON, downloaded 2026-09-22. It is made available under the Open Database License (ODbL) 1.0, including its share-alike terms. This notice covers the derived data, not unrelated application code or images.

Credit: Data from OpenSkiData / OpenSkiMap.org, © OpenStreetMap contributors (ODbL), Skimap.org, Who's On First, © Mapterhorn.

- Dataset and licensing: https://openskidata.org/
- Download: https://tiles.openskimap.org/geojson/ski_areas.geojson
- ODbL: https://opendatacommons.org/licenses/odbl/1-0/
- OpenStreetMap: https://www.openstreetmap.org/copyright
- Skimap.org: https://skimap.org/
- Who's On First: https://whosonfirst.org/docs/licenses/
- Elevation source: https://mapterhorn.com/

Each resort stores upstream source URLs and the date its identity/location was cross-checked. Source feature names and reference centers are retained as provenance; application IDs are independent of OpenSkiData's changing feature hashes.

Weather data: Open-Meteo, https://open-meteo.com/, CC BY 4.0. SkiBum sums the hourly snowfall amounts and converts centimeters to inches. API access terms are separate from the weather data license: https://open-meteo.com/en/pricing and https://open-meteo.com/en/terms.
