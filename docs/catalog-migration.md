# Catalog migration — September 22, 2026

The former 102 UI entries and 115 collector entries are consolidated into 103 ski-area records. The Canadian alias rows are merged; SilverStar is added to the UI and Grandvalira gains a weather-fetch record. Every canonical point was replaced with the matched OpenSkiData ski-area reference center, so old snapshots are intentionally not reused at changed coordinates.

Matches were reviewed by ski-area name, region, and geographic context. Important corrections: the legacy Aspen Snowmass point near Aspen town becomes Aspen Mountain; Snowmass remains its own mountain. Squaw Valley is Palisades Tahoe (Olympic Valley). Big Mountain is Whitefish Mountain Resort. These are representative ski-area map points, not official summit/base coordinates.

The historical `final_resorts.json` remains research only. Its parking claims and weather fields are not migrated into production truth. Preserve it for later review.

## Coordinate changes

| ID | Legacy name | Canonical name | Old lat/lng | Reference lat/lng | Shift (km, approximate) |
|---|---|---|---|---|---|
| whistler-blackcomb | Whistler Blackcomb | Whistler Blackcomb | 50.1163, -122.9574 | 50.080743, -122.931545 | 4.4 |
| vail | Vail | Vail | 39.6403, -106.3742 | 39.602952, -106.350729 | 4.6 |
| park-city | Park City | Park City | 40.6514, -111.5079 | 40.652042, -111.548735 | 3.4 |
| breckenridge | Breckenridge | Breckenridge | 39.4817, -106.0384 | 39.479996, -106.07823 | 3.4 |
| heavenly | Heavenly | Heavenly | 38.935, -119.9403 | 38.939719, -119.91196 | 2.5 |
| aspen-mountain | Aspen Snowmass | Aspen Mountain | 39.1911, -106.8175 | 39.165344, -106.81842 | 2.9 |
| jackson-hole | Jackson Hole | Jackson Hole | 43.5875, -110.8278 | 43.594869, -110.849454 | 1.9 |
| banff-sunshine | Banff Sunshine | Banff Sunshine | 51.1158, -115.7631 | 51.091987, -115.770856 | 2.7 |
| lake-louise | Lake Louise | Lake Louise | 51.4254, -116.1773 | 51.454644, -116.13254 | 4.5 |
| big-sky | Big Sky | Big Sky | 45.2846, -111.4008 | 45.284068, -111.40869 | 0.6 |
| steamboat | Steamboat | Steamboat | 40.458, -106.8047 | 40.453879, -106.775179 | 2.5 |
| mammoth-mountain | Mammoth Mountain | Mammoth Mountain | 37.6308, -119.0326 | 37.640185, -119.020484 | 1.5 |
| palisades-tahoe | Squaw Valley | Palisades Tahoe | 39.197, -120.2356 | 39.192425, -120.250061 | 1.3 |
| telluride | Telluride | Telluride | 37.9375, -107.8123 | 37.921239, -107.846779 | 3.5 |
| sun-valley | Sun Valley | Sun Valley | 43.6966, -114.3553 | 43.663211, -114.389455 | 4.6 |
| deer-valley | Deer Valley | Deer Valley | 40.6374, -111.4783 | 40.615013, -111.484141 | 2.5 |
| killington | Killington | Killington | 43.6046, -72.822 | 43.611293, -72.788868 | 2.8 |
| stowe | Stowe | Stowe | 44.5303, -72.7817 | 44.529654, -72.790229 | 0.7 |
| alta | Alta | Alta | 40.5885, -111.6376 | 40.580039, -111.624781 | 1.4 |
| snowbird | Snowbird | Snowbird | 40.5803, -111.6573 | 40.567151, -111.652311 | 1.5 |
| taos | Taos | Taos | 36.5924, -105.4467 | 36.578903, -105.450178 | 1.5 |
| copper-mountain | Copper Mountain | Copper Mountain | 39.5022, -106.1506 | 39.47767, -106.161249 | 2.9 |
| winter-park | Winter Park | Winter Park | 39.8868, -105.7625 | 39.867586, -105.775526 | 2.4 |
| keystone | Keystone | Keystone | 39.605, -105.9347 | 39.5718, -105.934358 | 3.7 |
| arapahoe-basin | Arapahoe Basin | Arapahoe Basin | 39.6426, -105.8717 | 39.626742, -105.878795 | 1.9 |
| crested-butte | Crested Butte | Crested Butte | 38.8997, -106.9653 | 38.898783, -106.943647 | 1.9 |
| loveland | Loveland | Loveland | 39.6803, -105.8978 | 39.678271, -105.910714 | 1.1 |
| mt-bachelor | Mt. Bachelor | Mt. Bachelor | 43.979, -121.688 | 43.991531, -121.685155 | 1.4 |
| crystal-mountain | Crystal Mountain | Crystal Mountain | 46.9358, -121.4742 | 46.933357, -121.486135 | 0.9 |
| stevens-pass | Stevens Pass | Stevens Pass | 47.7453, -121.0892 | 47.734909, -121.088263 | 1.2 |
| mt-baker | Mt. Baker | Mt. Baker | 48.8597, -121.6686 | 48.855239, -121.66648 | 0.5 |
| schweitzer | Schweitzer | Schweitzer | 48.3642, -116.6228 | 48.373419, -116.617841 | 1.1 |
| sun-peaks | Sun Peaks | Sun Peaks | 50.8817, -119.8847 | 50.886492, -119.884991 | 0.5 |
| revelstoke | Revelstoke | Revelstoke | 50.9981, -118.1956 | 50.968676, -118.126407 | 5.8 |
| fernie | Fernie | Fernie | 49.4653, -115.0636 | 49.457033, -115.106178 | 3.2 |
| big-white | Big White | Big White | 49.7311, -118.935 | 49.734059, -118.931604 | 0.4 |
| kicking-horse | Kicking Horse | Kicking Horse | 51.2514, -117.0492 | 51.28494, -117.06816 | 3.9 |
| mont-tremblant | Mont Tremblant | Mont Tremblant | 46.2094, -74.5847 | 46.216467, -74.556114 | 2.3 |
| blue-mountain | Blue Mountain | Blue Mountain | 44.5075, -80.3231 | 44.499597, -80.317762 | 1.0 |
| sugarloaf | Sugarloaf | Sugarloaf | 45.0314, -70.3139 | 45.049036, -70.315827 | 2.0 |
| sunday-river | Sunday River | Sunday River | 44.4697, -70.8561 | 44.474721, -70.877867 | 1.8 |
| sugarbush | Sugarbush | Sugarbush | 44.135, -72.9017 | 44.152371, -72.911269 | 2.1 |
| stratton | Stratton | Stratton | 43.1133, -72.9083 | 43.101071, -72.902415 | 1.4 |
| okemo | Okemo | Okemo | 43.4017, -72.7167 | 43.407268, -72.733283 | 1.5 |
| jay-peak | Jay Peak | Jay Peak | 44.9378, -72.5036 | 44.935604, -72.512278 | 0.7 |
| smugglers-notch | Smugglers' Notch | Smugglers' Notch | 44.5458, -72.7872 | 44.573259, -72.770057 | 3.3 |
| loon-mountain | Loon Mountain | Loon Mountain | 44.0369, -71.6206 | 44.04571, -71.640018 | 1.8 |
| cannon-mountain | Cannon Mountain | Cannon Mountain | 44.1572, -71.6978 | 44.168512, -71.702023 | 1.3 |
| wildcat-mountain | Wildcat Mountain | Wildcat Mountain | 44.2636, -71.2328 | 44.257153, -71.232299 | 0.7 |
| bretton-woods | Bretton Woods | Bretton Woods | 44.2633, -71.4439 | 44.250932, -71.468638 | 2.4 |
| snowbasin | Snowbasin | Snowbasin | 41.2156, -111.8567 | 41.20178, -111.862624 | 1.6 |
| powder-mountain | Powder Mountain | Powder Mountain | 41.3814, -111.7806 | 41.383919, -111.763635 | 1.4 |
| solitude | Solitude | Solitude | 40.62, -111.5917 | 40.612727, -111.604068 | 1.3 |
| brighton | Brighton | Brighton | 40.5981, -111.5831 | 40.598689, -111.580807 | 0.2 |
| snowmass | Snowmass | Snowmass | 39.2133, -106.9378 | 39.186443, -106.950206 | 3.2 |
| aspen-highlands | Aspen Highlands | Aspen Highlands | 39.1825, -106.8553 | 39.162085, -106.861281 | 2.3 |
| buttermilk | Buttermilk | Buttermilk | 39.2078, -106.8608 | 39.192625, -106.869985 | 1.9 |
| beaver-creek | Beaver Creek | Beaver Creek | 39.6042, -106.5164 | 39.599837, -106.530502 | 1.3 |
| purgatory | Purgatory | Purgatory | 37.6303, -107.8139 | 37.623252, -107.8357 | 2.1 |
| wolf-creek | Wolf Creek | Wolf Creek | 37.4722, -106.7931 | 37.464349, -106.787175 | 1.0 |
| monarch-mountain | Monarch Mountain | Monarch Mountain | 38.5117, -106.3317 | 38.512247, -106.342678 | 1.0 |
| eldora | Eldora | Eldora | 39.9372, -105.5828 | 39.932978, -105.586401 | 0.6 |
| grand-targhee | Grand Targhee | Grand Targhee | 43.7886, -110.9586 | 43.78584, -110.947184 | 1.0 |
| snow-king | Snow King | Snow King | 43.4783, -110.7628 | 43.465674, -110.758675 | 1.4 |
| bridger-bowl | Bridger Bowl | Bridger Bowl | 45.8167, -110.8969 | 45.822542, -110.908659 | 1.1 |
| whitefish-mountain-resort | Big Mountain | Whitefish Mountain Resort | 48.4928, -114.3483 | 48.476418, -114.324204 | 2.5 |
| montana-snowbowl | Snowbowl | Montana Snowbowl | 46.9417, -113.9492 | 47.022946, -114.006131 | 10.0 |
| grandvalira | Grand Valira | Grandvalira | 42.5397, 1.735 | 42.548541, 1.660859 | 6.1 |
| bogus-basin | Bogus Basin | Bogus Basin | 43.7725, -116.0939 | 43.778412, -116.093613 | 0.7 |
| tamarack | Tamarack | Tamarack | 44.6922, -116.1344 | 44.68512, -116.142901 | 1.0 |
| silver-mountain | Silver Mountain | Silver Mountain | 47.6764, -116.0703 | 47.51308, -116.132738 | 18.7 |
| mt-hood-meadows | Mt. Hood Meadows | Mt. Hood Meadows | 45.3319, -121.6653 | 45.337552, -121.659361 | 0.8 |
| timberline | Timberline | Timberline | 45.3306, -121.7108 | 45.33094, -121.724086 | 1.0 |
| willamette-pass | Willamette Pass | Willamette Pass | 43.6006, -122.0336 | 43.612493, -122.029486 | 1.4 |
| mission-ridge | Mission Ridge | Mission Ridge | 47.2917, -120.3997 | 47.283366, -120.411714 | 1.3 |
| the-summit-at-snoqualmie | Snoqualmie | The Summit at Snoqualmie | 47.4219, -121.4136 | 47.420513, -121.421831 | 0.6 |
| mt-spokane | Mt. Spokane | Mt. Spokane | 47.9208, -117.0856 | 47.927868, -117.112524 | 2.2 |
| white-pass | White Pass | White Pass | 46.6394, -121.3908 | 46.621518, -121.394163 | 2.0 |
| 49-degrees-north | 49 Degrees North | 49 Degrees North | 48.7511, -117.6369 | 48.29232, -117.561567 | 51.2 |
| red-mountain | Red Mountain | Red Mountain | 49.0917, -117.8233 | 49.105427, -117.841934 | 2.0 |
| whitewater | Whitewater | Whitewater | 49.5394, -117.2717 | 49.442118, -117.15647 | 13.6 |
| panorama | Panorama | Panorama | 50.8036, -116.0533 | 50.442751, -116.219569 | 41.7 |
| marmot-basin | Marmot Basin | Marmot Basin | 52.8236, -118.0747 | 52.796986, -118.104709 | 3.6 |
| nakiska | Nakiska | Nakiska | 50.98, -115.0733 | 50.948417, -115.169991 | 7.6 |
| castle-mountain | Castle Mountain | Castle Mountain | 49.4058, -114.5169 | 49.308858, -114.426567 | 12.6 |
| mount-norquay | Norquay | Mount Norquay | 51.1967, -115.5531 | 51.201164, -115.60373 | 3.6 |
| le-massif | Le Massif | Le Massif | 47.3136, -70.6358 | 47.279858, -70.59321 | 4.9 |
| calabogie | Calabogie | Calabogie | 45.2906, -76.7019 | 45.269461, -76.7866 | 7.0 |
| sierra-at-tahoe | Sierra-at-Tahoe | Sierra-at-Tahoe | 38.7986, -120.0828 | 38.796151, -120.078975 | 0.4 |
| kirkwood | Kirkwood | Kirkwood | 38.6867, -120.0656 | 38.673846, -120.064658 | 1.4 |
| northstar | Northstar | Northstar | 39.2733, -120.1211 | 39.2588, -120.137143 | 2.1 |
| homewood | Homewood | Homewood | 39.0833, -120.1667 | 39.07741, -120.173374 | 0.9 |
| mt-rose | Mt. Rose | Mt. Rose | 39.3397, -119.8894 | 39.319382, -119.883963 | 2.3 |
| diamond-peak | Diamond Peak | Diamond Peak | 39.2525, -119.9169 | 39.254221, -119.91413 | 0.3 |
| june-mountain | June Mountain | June Mountain | 37.7853, -119.0781 | 37.75502, -119.074517 | 3.4 |
| bear-mountain | Bear Mountain | Bear Mountain | 34.235, -116.865 | 34.219488, -116.859373 | 1.8 |
| snow-summit | Snow Summit | Snow Summit | 34.2306, -116.8886 | 34.228595, -116.891661 | 0.4 |
| mountain-high | Mountain High | Mountain High | 34.3811, -117.6881 | 34.372054, -117.686325 | 1.0 |
| ski-santa-fe | Ski Santa Fe | Ski Santa Fe | 35.7869, -105.7961 | 35.791322, -105.78955 | 0.8 |
| angel-fire | Angel Fire | Angel Fire | 36.3975, -105.2886 | 36.379402, -105.246831 | 4.2 |
| whiteface-mountain | Whiteface Mountain | Whiteface Mountain | 44.3659, -73.9024 | 44.362104, -73.880076 | 1.8 |
| bristol-mountain | Bristol Mountain | Bristol Mountain | 42.7455, -77.4016 | 42.742404, -77.414649 | 1.1 |
| silverstar-mountain-resort | SilverStar Mountain Resort | SilverStar Mountain Resort | 50.4, -119.0833 | 50.368896, -119.045193 | 4.4 |
