# 🎿 SKIBUM.COM - PROJECT DOCUMENTATION

## 📌 Quick Links
- **Live Site**: https://skibum.com
- **GitHub Repo**: https://github.com/jnr47/skibum2025
- **Cloudflare Worker**: https://skibum-worker.jnrubens.workers.dev
- **Backup (Vercel)**: https://skibum2025.vercel.app

---

## 🎯 PROJECT VISION

**SkiBum.com** is a live snowfall tracking website that shows skiers and snowboarders where snow fell overnight using an interactive "heatmap" style visualization.

### Core Features
- Interactive map showing 100+ North American ski resorts
- Real-time snowfall data (24hr, 7-day, season totals)
- Color-coded markers based on snowfall intensity
- Clickable resort detail pages with curated content
- Dark theme optimized for snow visualization

---

## 🏗️ SYSTEM ARCHITECTURE

```
┌─────────────────┐
│  User Browser   │
└────────┬────────┘
         │
         ↓
┌─────────────────────────────────┐
│  skibum.com                     │
│  (Cloudflare Pages)             │
│  - React + Mapbox GL JS         │
│  - 100 resort markers           │
│  - Detail pages                 │
└────────┬────────────────────────┘
         │
         ↓
┌─────────────────────────────────┐
│  Cloudflare Worker              │
│  ~/Desktop/skibum-worker        │
│  - API proxy layer              │
│  - KV caching                   │
│  - Data transformation          │
└────────┬────────────────────────┘
         │
         ↓
┌─────────────────────────────────┐
│  NOAA APIs (FREE!)              │
│  - NWS API: 7-day forecasts     │
│  - NCEI API: Historical data    │
└─────────────────────────────────┘
```

---

## ✅ COMPLETED WORK

### Phase 0: Infrastructure Setup ✓

#### Domain & DNS
- [x] Domain registered: **skibum.com** (Network Solutions)
- [x] Nameservers configured: `jasper.ns.cloudflare.com`, `poppy.ns.cloudflare.com`
- [x] SSL/HTTPS enabled
- [x] DNS propagated and working

#### Hosting & Deployment
- [x] Cloudflare Pages deployment configured
- [x] Vercel backup deployment configured
- [x] Auto-deploy on GitHub push enabled
- [x] GitHub repository created: `jnr47/skibum2025`

#### Authentication & Access
- [x] New Cloudflare account created (overcame 2FA lockout)
- [x] Wrangler CLI authenticated
- [x] GitHub account connected: `jnr47`

### Phase 0.5: Frontend Application ✓

#### Core Technology Stack
- [x] Single-page React application
- [x] Mapbox GL JS integration
- [x] Dark theme with glow effects
- [x] Responsive design

#### Map Features
- [x] Globe projection view
- [x] 100 ski resort markers
- [x] 5-tier color coding system:
  - 🔵 Light (0-3")
  - 🟢 Moderate (3-6")
  - 🟡 Good (6-12")
  - 🟠 Great (12-18")
  - 🔴 Epic (18"+)
- [x] Interactive legend
- [x] Clickable markers with navigation

#### Resort Database (100 Resorts)
- [x] **Colorado**: Vail, Aspen, Breckenridge, Keystone, Copper Mountain, Winter Park, Steamboat, Telluride, Crested Butte, Loveland
- [x] **Utah**: Park City, Alta, Snowbird, Deer Valley, Brighton, Solitude, Snowbasin, Powder Mountain, Sundance
- [x] **California**: Mammoth Mountain, Heavenly, Squaw Valley, Northstar, Kirkwood, Sugar Bowl, Sierra at Tahoe
- [x] **Wyoming**: Jackson Hole, Grand Targhee, Snow King
- [x] **Montana**: Big Sky, Whitefish, Red Lodge
- [x] **Idaho**: Sun Valley, Schweitzer, Bogus Basin
- [x] **New Mexico**: Taos, Angel Fire, Ski Santa Fe
- [x] **Washington**: Crystal Mountain, Stevens Pass, Mt. Baker, Mission Ridge
- [x] **Oregon**: Mt. Hood Meadows, Timberline, Mt. Bachelor
- [x] **Vermont**: Stowe, Killington, Sugarbush, Jay Peak, Okemo
- [x] **New Hampshire**: Loon, Cannon, Waterville Valley, Bretton Woods
- [x] **Maine**: Sugarloaf, Sunday River, Saddleback
- [x] **New York**: Whiteface, Gore, Hunter, Windham
- [x] **Pennsylvania**: Seven Springs, Blue Mountain, Camelback
- [x] **Michigan**: Boyne Mountain, Crystal Mountain, Nub's Nob
- [x] **Wisconsin**: Granite Peak, Cascade, Devil's Head
- [x] **Minnesota**: Lutsen Mountains, Spirit Mountain
- [x] **Canada - BC**: Whistler Blackcomb, Revelstoke, Fernie, Big White, Sun Peaks, Kicking Horse, Red Mountain, Panorama
- [x] **Canada - Alberta**: Lake Louise, Sunshine Village, Marmot Basin, Nakiska, Castle Mountain

#### Resort Detail Pages
- [x] Individual page template for each resort
- [x] Snowfall statistics display (24hr, 7-day, season)
- [x] Section placeholders:
  - Top 10 Ski Runs
  - Top 10 Restaurants
  - Top 10 Places to Stay
- [x] Back navigation to main map

### Phase 0.8: Cloudflare Worker (API Layer) ✓

#### Worker Setup
- [x] Worker created: `skibum-worker`
- [x] Deployed to: `https://skibum-worker.jnrubens.workers.dev`
- [x] Local development environment: `~/Desktop/skibum-worker/`
- [x] KV namespace configured: `SNOWFALL_CACHE`
  - Binding name: `SNOWFALL_CACHE`
  - Namespace ID: `63165cb54cb84a12afa9d39e05c9d0d9`

#### API Endpoints (Skeleton)
- [x] `GET /` - Health check
- [x] `GET /api/snowfall/:lat/:lng` - Single resort data
- [x] `POST /api/snowfall/batch` - Batch resort data

#### Initial Configuration
- [x] CORS headers configured
- [x] Error handling framework
- [x] Caching logic structure

---

## 🚧 CURRENT PHASE: NOAA Integration

### ⚠️ Why We Changed Direction

**Original Plan**: Weather Unlocked API
- **Problem**: Uses proprietary resort IDs, not lat/lng coordinates
- **Problem**: Costs money ($$$)
- **Problem**: Requires manual mapping of 100+ resorts to their IDs

**New Plan**: NOAA APIs
- ✅ **FREE** government data
- ✅ Uses lat/lng coordinates (what we already have!)
- ✅ High-quality data (it's the National Weather Service!)
- ✅ Generous rate limits
- ✅ Historical data available

### 📊 NOAA API Overview

#### NOAA National Weather Service (NWS) API
- **Base URL**: `https://api.weather.gov`
- **Cost**: FREE
- **Rate Limit**: Very generous (not publicly specified)
- **Authentication**: None required (but recommended to provide User-Agent)
- **Data Available**:
  - Current conditions
  - 7-day forecasts
  - Hourly forecasts
  - Weather alerts
  - Snow depth and accumulation

**Key Endpoints**:
```
GET /points/{lat},{lng}
  → Returns forecast URLs for a location

GET /gridpoints/{office}/{gridX},{gridY}/forecast
  → Returns 7-day forecast with snow predictions

GET /stations/{stationId}/observations/latest
  → Returns current weather observations
```

#### NOAA National Centers for Environmental Information (NCEI) API
- **Base URL**: `https://www.ncei.noaa.gov/cdo-web/api/v2`
- **Cost**: FREE
- **Rate Limit**: 10,000 requests/day
- **Authentication**: Requires API token (free)
- **Data Available**:
  - Historical daily/monthly/yearly data
  - Precipitation totals
  - Snow depth records
  - Season accumulation

**Key Endpoints**:
```
GET /data?datasetid=GHCND&stationid=GHCND:XXX&startdate=2024-10-01
  → Returns historical snow data for a station
```

### 🎯 Phase 1 Goals

#### 1. Worker Modification
- [ ] Remove Weather Unlocked API code
- [ ] Add NOAA NWS API integration
- [ ] Add NOAA NCEI API integration
- [ ] Implement proper error handling for government APIs
- [ ] Add intelligent caching (NOAA recommends caching)
- [ ] Transform NOAA data into skibum.com format

#### 2. Data Mapping
- [ ] Create `resort-weather-stations.json` mapping file
- [ ] Map each of 100 resorts to nearest NOAA weather station
- [ ] Include fallback stations for reliability
- [ ] Document station selection methodology

#### 3. API Response Format
Define consistent response format:
```json
{
  "resort": "Vail",
  "location": {"lat": 39.6403, "lng": -106.3742},
  "snowfall": {
    "24hr": 8.5,
    "7day": 24.0,
    "season": 156.0
  },
  "forecast": {
    "today": 4,
    "tomorrow": 2,
    "threeDays": 0
  },
  "lastUpdated": "2025-10-30T10:30:00Z",
  "source": "NOAA NWS",
  "stationId": "KEGE"
}
```

#### 4. Testing & Validation
- [ ] Test with 5-10 major resorts first
- [ ] Verify data accuracy against resort reports
- [ ] Test caching behavior
- [ ] Measure API response times
- [ ] Test error scenarios (station offline, no data, etc.)

#### 5. Frontend Updates
- [ ] Update API calls to use new worker endpoints
- [ ] Remove mock data
- [ ] Add "Last Updated" timestamp to UI
- [ ] Add data source attribution ("Powered by NOAA")
- [ ] Handle loading states
- [ ] Handle error states (no data available, etc.)

---

## 📁 PROJECT FILE STRUCTURE

### GitHub Repository: `jnr47/skibum2025`
```
skibum2025/
├── README.md                          # Project overview
├── PROJECT.md                         # This file (comprehensive docs)
├── index.html                         # Complete React + Mapbox app
├── resort-weather-stations.json       # Resort → NOAA station mapping (TODO)
└── docs/
    ├── NOAA-INTEGRATION.md           # NOAA API integration guide (TODO)
    └── DEPLOYMENT.md                 # Deployment instructions
```

### Local Worker Project: `~/Desktop/skibum-worker/`
```
skibum-worker/
├── src/
│   ├── index.js                      # Main worker code
│   ├── noaa-nws.js                   # NOAA NWS API client (TODO)
│   └── noaa-ncei.js                  # NOAA NCEI API client (TODO)
├── wrangler.jsonc                     # Cloudflare config
├── package.json                       # Dependencies
└── README.md                          # Worker-specific docs
```

---

## 🔑 CREDENTIALS & API KEYS

### Mapbox
- **Token**: `pk.eyJ1Ijoiam5yNDciLCJhIjoiY200azAzNHo3MGs5MTJpcTRxejE1cmp0NSJ9.YpIGfQ1PZljzCJ7EhCjz4A`
- **Status**: ✅ Active and configured in frontend
- **Location**: Embedded in `index.html`

### NOAA APIs
- **NWS API**: No authentication required
- **NCEI API**: Requires free token
  - **Status**: ⚠️ Need to register at https://www.ncdc.noaa.gov/cdo-web/token
  - **Location**: Will be stored in `wrangler.jsonc` as environment variable

### Cloudflare
- **Account**: New account (post-2FA lockout resolution)
- **Wrangler**: ✅ Authenticated on local machine
- **Worker**: `skibum-worker` deployed
- **Pages**: Auto-deploy enabled for `jnr47/skibum2025`
- **KV Namespace ID**: `63165cb54cb84a12afa9d39e05c9d0d9`

### GitHub
- **Username**: `jnr47`
- **Repository**: `skibum2025`
- **Access**: ✅ Connected to Cloudflare Pages and Vercel

### Domain
- **Registrar**: Network Solutions
- **Domain**: skibum.com
- **Nameservers**: Managed by Cloudflare

---

## 🛠️ DEVELOPMENT WORKFLOW

### Making Frontend Changes
```bash
# 1. Edit index.html locally or on GitHub

# 2. Test locally (open in browser)
open index.html

# 3. Commit and push
git add .
git commit -m "Description of changes"
git push origin main

# 4. Cloudflare Pages auto-deploys (usually < 2 minutes)
# Check: https://skibum.com
```

### Making Worker Changes
```bash
# 1. Navigate to worker directory
cd ~/Desktop/skibum-worker

# 2. Edit files in src/
code src/index.js

# 3. Test locally (optional)
npx wrangler dev

# 4. Deploy to Cloudflare
npm run deploy

# 5. Verify deployment
curl https://skibum-worker.jnrubens.workers.dev/
```

### Viewing Worker Logs
```bash
cd ~/Desktop/skibum-worker
npx wrangler tail
```

### Testing NOAA APIs (curl examples)
```bash
# Test NWS API for Vail, CO (39.6403, -106.3742)
curl "https://api.weather.gov/points/39.6403,-106.3742"

# Test NCEI API (requires token)
curl -H "token: YOUR_TOKEN" \
  "https://www.ncei.noaa.gov/cdo-web/api/v2/stations?locationid=FIPS:08"
```

---

## 📋 NEXT STEPS (Prioritized)

### 🔴 CRITICAL PATH - Week 1

#### Day 1: NOAA NWS Integration
- [ ] Research NOAA NWS API documentation thoroughly
- [ ] Test API calls for 5 major resorts (Vail, Aspen, Whistler, Park City, Heavenly)
- [ ] Create `src/noaa-nws.js` module with:
  - `getPointsData(lat, lng)` - Get forecast grid info
  - `getForecast(gridId, gridX, gridY)` - Get 7-day forecast
  - `getCurrentConditions(stationId)` - Get latest observations
- [ ] Update `src/index.js` to use NOAA NWS
- [ ] Test with real Vail data
- [ ] Deploy and verify on live site

#### Day 2: NCEI Token & Historical Data
- [ ] Register for NOAA NCEI API token
- [ ] Add token to `wrangler.jsonc` environment variables
- [ ] Create `src/noaa-ncei.js` module with:
  - `getHistoricalSnow(stationId, startDate, endDate)` - Get snow history
  - `getSeasonTotal(stationId, year)` - Calculate season accumulation
- [ ] Test with sample resorts
- [ ] Deploy and verify

#### Day 3: Resort-Station Mapping
- [ ] Research nearest NOAA stations for each resort
- [ ] Create `resort-weather-stations.json` with:
  ```json
  {
    "Vail": {
      "lat": 39.6403,
      "lng": -106.3742,
      "nwsStationId": "KEGE",
      "nceiStationId": "GHCND:USC00058839",
      "fallbackStations": ["KEGE", "KDEN"]
    }
  }
  ```
- [ ] Add mapping for all 100 resorts
- [ ] Document how stations were selected

#### Day 4-5: Frontend Integration
- [ ] Update frontend API calls to use new worker endpoints
- [ ] Remove all mock/simulated data
- [ ] Add "Last Updated" timestamps to UI
- [ ] Add "Powered by NOAA" attribution
- [ ] Improve error handling and loading states
- [ ] Test thoroughly across all 100 resorts
- [ ] Deploy final version

### 🟡 MEDIUM PRIORITY - Week 2

#### Content Development
- [ ] Add logo to replace placeholder mountain icon
- [ ] Curate "Top 10 Ski Runs" for major resorts:
  - Vail, Aspen, Breckenridge, Park City, Whistler (start here)
- [ ] Curate "Top 10 Restaurants" for major resorts
- [ ] Curate "Top 10 Places to Stay" for major resorts
- [ ] Create content template/guidelines for consistency

#### UX Improvements
- [ ] Fix/improve hover tooltips on map markers
- [ ] Add smooth zoom to resort on marker click
- [ ] Add search/filter functionality
- [ ] Add "Favorites" feature (localStorage)
- [ ] Improve mobile responsiveness

#### Data Enhancements
- [ ] Add 7-day forecast visualization
- [ ] Add historical snowfall charts (chart.js or similar)
- [ ] Add base depth and season opening/closing dates
- [ ] Add webcam links (where available)

### 🟢 FUTURE ENHANCEMENTS - Month 2+

#### Geographic Expansion
- [ ] Add European resorts (Alps, Pyrenees, etc.)
- [ ] Add Japanese resorts
- [ ] Research international weather APIs
- [ ] Add Chilean/Argentine resorts

#### Advanced Features
- [ ] User accounts and preferences
- [ ] Email/SMS alerts for powder days
- [ ] Historical trends and analytics
- [ ] AI-powered "powder day prediction"
- [ ] Integration with lift ticket prices
- [ ] Social features (share favorite resorts, powder alerts)

#### Performance & Optimization
- [ ] Implement service worker for offline functionality
- [ ] Add progressive web app (PWA) features
- [ ] Optimize map rendering for 500+ resorts
- [ ] Add CDN caching strategy
- [ ] Set up monitoring and analytics

---

## 🐛 KNOWN ISSUES & TROUBLESHOOTING

### Active Issues

#### 1. Weather Data Not Live ⚠️
- **Status**: Currently using simulated/mock data
- **Reason**: Original Weather Unlocked API used resort IDs, not lat/lng
- **Solution**: NOAA integration (in progress)
- **ETA**: Week 1

#### 2. Resort Content Placeholders ⚠️
- **Status**: All detail pages show "Content coming soon"
- **Affected**: Top 10 Runs, Restaurants, Accommodations
- **Solution**: Manual curation needed
- **ETA**: Week 2 (starting with top 20 resorts)

#### 3. Logo Placeholder ⚠️
- **Status**: Using generic mountain icon
- **Solution**: User has logo ready to add
- **ETA**: Day 1 of Week 2

### Resolved Issues

#### ✅ Cloudflare 2FA Lockout
- **Problem**: Could not access original Cloudflare account
- **Solution**: Created new account, reconfigured everything
- **Date Resolved**: Initial setup evening

#### ✅ DNS Propagation
- **Problem**: Domain not resolving initially
- **Solution**: Patience + correct nameserver configuration
- **Date Resolved**: Initial setup evening

#### ✅ Worker KV Namespace Duplicate Binding
- **Problem**: Worker deployment failed due to duplicate KV entries
- **Solution**: Cleaned up `wrangler.jsonc` to single binding
- **Date Resolved**: Initial setup evening

### Common Troubleshooting

#### Worker Deployment Fails
```bash
# Check wrangler.jsonc for duplicate bindings
# Ensure only ONE SNOWFALL_CACHE entry
# Try: npx wrangler whoami (verify auth)
# Try: rm -rf node_modules && npm install
```

#### Map Not Loading
```bash
# Check browser console for errors
# Verify Mapbox token in index.html
# Test: https://api.mapbox.com/styles/v1/mapbox/dark-v11
```

#### DNS Issues
```bash
# Verify nameservers
nslookup skibum.com

# Should return:
# jasper.ns.cloudflare.com
# poppy.ns.cloudflare.com
```

#### CORS Errors
```bash
# Ensure worker has CORS headers:
# 'Access-Control-Allow-Origin': '*'
# 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
```

---

## 📊 SUCCESS METRICS

### Technical Metrics
- ✅ Site uptime: 99.9%+
- ✅ Page load time: < 2 seconds
- ⏳ API response time: < 500ms (target)
- ⏳ Data accuracy: Within 10% of resort-reported values
- ✅ Mobile responsiveness: 100%

### User Metrics (Future)
- [ ] Daily active users
- [ ] Average session duration
- [ ] Bounce rate
- [ ] Conversion to detail pages
- [ ] Return visitor rate

### Content Metrics
- ✅ Resorts covered: 100
- ⏳ Resorts with full content: 0 (target: 100)
- ✅ Countries covered: 2 (US, Canada)
- ⏳ API data sources: 1 (NOAA - in progress)

---

## 🎓 LESSONS LEARNED

### What Went Well
1. **Single-file architecture**: Made initial development fast
2. **Cloudflare ecosystem**: Pages + Workers + KV = powerful combo
3. **Mapbox integration**: Smoother than expected
4. **GitHub auto-deploy**: Saved tons of time
5. **Decision to pivot to NOAA**: Will save money and be more reliable

### What Was Challenging
1. **2FA lockout**: Lost time but learned account recovery
2. **Weather API research**: Original API didn't match our needs
3. **Worker debugging**: Needed to learn Wrangler CLI
4. **Resort data collection**: Manual entry of 100 resorts time-consuming

### What to Do Differently
1. **API research first**: Thoroughly vet APIs before committing
2. **Incremental testing**: Test with 5-10 resorts before scaling to 100
3. **Documentation as we go**: This PROJECT.md should have been created earlier
4. **Content strategy**: Should have planned content curation from start

---

## 📚 TECHNICAL RESOURCES

### Documentation
- [NOAA NWS API Docs](https://www.weather.gov/documentation/services-web-api)
- [NOAA NCEI API Docs](https://www.ncdc.noaa.gov/cdo-web/webservices/v2)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Mapbox GL JS Docs](https://docs.mapbox.com/mapbox-gl-js/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

### Tutorials & Guides
- [NOAA API Getting Started](https://www.weather.gov/documentation/services-web-api#/)
- [Cloudflare Workers Tutorial](https://developers.cloudflare.com/workers/get-started/guide/)
- [React without Build Tools](https://react.dev/learn/add-react-to-an-existing-project)

### Tools
- [NOAA Weather Station Lookup](https://www.weather.gov/search)
- [GitHub Desktop](https://desktop.github.com/)
- [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) - API testing

---

## 💡 IDEAS & FUTURE VISION

### Short-term Ideas
- [ ] Add "powder alert" threshold customization
- [ ] Add metric/imperial unit toggle
- [ ] Add wind speed/direction data
- [ ] Add temperature data
- [ ] Add "resort conditions" (open runs, lifts)

### Medium-term Ideas
- [ ] Mobile app (React Native)
- [ ] API for third-party developers
- [ ] Partnership with resorts for official data
- [ ] Affiliate links for lift tickets/hotels
- [ ] User-generated content (reviews, photos)

### Long-term Vision
- [ ] AI-powered trip planning
- [ ] Real-time snow depth sensors network
- [ ] Weather prediction model trained on ski resort data
- [ ] Integration with ski tracking apps (Slopes, Trace Snow)
- [ ] Community features (meet other skiers, group trips)
- [ ] Monetization through premium features/partnerships

---

## 👥 TEAM & CONTACTS

### Project Owner
- **Name**: Jeffrey Rubens
- **Email**: jeffreyrubens@gmail.com
- **GitHub**: jnr47
- **Role**: Product owner, designer, developer

### Service Providers
- **Domain**: Network Solutions
- **Hosting**: Cloudflare (Pages + Workers)
- **Backup Hosting**: Vercel
- **Version Control**: GitHub
- **Map Provider**: Mapbox
- **Weather Data**: NOAA (free)

---

## 📅 PROJECT TIMELINE

### Week -1: Planning & Research
- Concept ideation
- Technology research
- Domain selection

### Week 0: Foundation (COMPLETED)
- ✅ Domain registration
- ✅ GitHub repository setup
- ✅ Cloudflare account creation
- ✅ Initial frontend development
- ✅ Mapbox integration
- ✅ 100 resort database creation
- ✅ Cloudflare Worker skeleton
- ✅ Live deployment

### Week 1: NOAA Integration (IN PROGRESS)
- 🔄 NOAA NWS API integration
- 🔄 NOAA NCEI API integration
- 🔄 Resort-station mapping
- 🔄 Frontend data integration
- 🔄 Testing and validation

### Week 2: Content & Polish
- Logo addition
- Content curation (top resorts)
- UX improvements
- Performance optimization

### Month 2+: Expansion & Features
- Geographic expansion
- Advanced features
- User accounts
- Analytics
- Monetization

---

## 📝 CHANGELOG

### 2025-10-30
- Created comprehensive PROJECT.md documentation
- Pivoted from Weather Unlocked to NOAA APIs
- Defined Phase 1 NOAA integration plan
- Documented all 100 resorts in database

### 2025-10-29 (Initial Setup Evening)
- Launched skibum.com live
- Deployed frontend with 100 resort markers
- Created Cloudflare Worker infrastructure
- Overcame Cloudflare 2FA lockout
- Configured DNS and SSL
- Set up GitHub repository
- Implemented Mapbox integration

---

## 🎯 CURRENT FOCUS

**Phase 1: NOAA Integration**

We are currently focused on replacing the simulated weather data with real NOAA data. This is the highest priority and will unlock the core value proposition of the site.

**This Week's Goals:**
1. Complete NOAA NWS API integration
2. Register for NCEI API token
3. Map all 100 resorts to weather stations
4. Deploy live weather data

---

## 🆘 GETTING HELP

### Quick Reference Commands
```bash
# Deploy frontend
git push origin main

# Deploy worker
cd ~/Desktop/skibum-worker && npm run deploy

# View logs
cd ~/Desktop/skibum-worker && npx wrangler tail

# Test NOAA API
curl "https://api.weather.gov/points/39.6403,-106.3742"
```

### When Stuck
1. Check this PROJECT.md file
2. Review NOAA API documentation
3. Check Cloudflare Workers documentation
4. Review browser console for frontend errors
5. Check worker logs with `npx wrangler tail`

---

**Last Updated**: October 30, 2025  
**Status**: 🟡 Active Development (NOAA Integration Phase)  
**Next Review**: November 6, 2025
