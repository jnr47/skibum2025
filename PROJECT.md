# SkiBum.com - Project Documentation

## Project Overview
SkiBum.com is a live snow tracking and ski trip planning platform that helps skiers and vanlifers find the best resorts based on real-time conditions, pass ownership, and overnight parking availability.

**Core Value Proposition:** 
The fastest way to decide where to ski — and where to sleep. Snow, passes, and overnight parking all in one place.

## Current Status (As of December 12, 2025)

### 🎉 MAJOR MILESTONE: Decision Engine Built & Tested!

**What's Complete:**
- ✅ Parking research: 18 resorts with detailed scores and policies
- ✅ Pass affiliation data: All 18 resorts mapped to Ikon/Epic/etc
- ✅ Snow data integration: Live weather data from Open-Meteo API
- ✅ Coordinates: All 18 resorts geocoded
- ✅ **Working decision algorithm with real data**
- ✅ **Successfully tested with 3 user scenarios**

### What's Live on SkiBum.com
- Homepage with interactive map (Mapbox)
- 115 North American ski resorts tracked
- Real-time snow data via Open-Meteo API
- GitHub Actions automation (updates every 6 hours)
- Hosted on Cloudflare Pages / Vercel backup
- Vintage 1970s ski culture aesthetic
- Mobile-optimized design

### Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Map:** Mapbox GL JS
- **Weather Data:** Open-Meteo API (global coverage)
- **Automation:** GitHub Actions (automated updates)
- **Hosting:** Cloudflare Pages + Vercel backup
- **Decision Engine:** Node.js JavaScript algorithm
- **Data Pipeline:** Python scripts for research + merging

---

## 🎯 Strategic Direction: Decision Engine First

**Old approach:** "Here's information about ski resorts"  
**New approach:** "I will tell you where to go this weekend in 30 seconds"

The hero decision form will be the primary product, with the map serving as a secondary exploration tool.

### Core Differentiators
1. **Pass-Aware Recommendations** ✅ WORKING - Filters by Ikon/Epic/Indy ownership + snow + parking
2. **Parking Legality Layer** ✅ COMPLETE - 18 resorts researched, this is our moat
3. **Vanlife-Friendly Focus** ✅ WORKING - Parking prioritization built into algorithm
4. **Decision Engine** ✅ TESTED - "Show me the best places to go" vs browsing data manually

---

## 📊 Data Infrastructure (COMPLETE - December 12, 2025)

### Parking Research System
**Location:** `/Users/dad/Documents/skibum-research/`

**Completed Research (18 Resorts):**

**Top Tier Parking (7-8/10):**
- Mt. Bachelor - 8/10 (official paid overnight parking)
- Powderhorn - 8/10 (4th dirt lot allowed)
- Whitefish - 8/10 (Aspen Lot, $25/night, 3-day max)
- Bridger Bowl - 7/10 (allowed with advance permission, winter only)

**Mid Tier Parking (4-6/10):**
- Killington - 6/10 (Skyeship Base, 2 night/week limit)
- Kicking Horse - 6/10 (mixed enforcement reports)
- Breckenridge - 4/10 (town lots only, resort prohibited)

**Poor Parking (1-3/10):**
- Vail - 3/10 ($35-60/night paid only)
- Mammoth - 3/10 (strict winter prohibition)
- Whistler - 2/10 (winter prohibition for snow removal)
- Steamboat - 2/10 (no overnight except paid garage)
- Stratton - 2/10 (unclear policy)

**No Parking (0-1/10):**
- Jackson Hole - 1/10 (hotel guests only, strict)
- Big Sky - 1/10 (strict prohibition)
- Arapahoe Basin - 1/10 (gates lock overnight)
- Park City - 1/10 (explicit prohibition)
- Aspen Snowmass - 1/10 (explicit prohibition)
- Deer Valley - 0/10 (strictest policy)

### Data Pipeline (WORKING)

**Scripts Created:**
1. `research_resort_old.py` - Automated parking research (Claude API + web search)
2. `parking_database.py` - Excel database management with auto-scoring
3. `merge_data.py` - Combines parking + pass affiliation data
4. `merge_snow_data.py` - Integrates snow data from GitHub repo
5. `test_algorithm.js` - Decision algorithm with real data testing

**Data Flow:**
```
Parking Research → Excel Database → JSON Export
        ↓
Pass Affiliations (CSV) → Merge Script → merged_resorts.json
        ↓
GitHub Snow Data (115 resorts) → Merge Script → final_resorts.json (18 complete)
        ↓
Decision Algorithm → Ranked Recommendations
```

### Final Dataset Structure
**File:** `final_resorts.json` (18 resorts)
```json
{
  "name": "Jackson Hole",
  "parking_score": 1,
  "parking_policy": "Full policy text...",
  "enforcement": "strict",
  "allowed_lots": [],
  "passes": ["Ikon", "Mountain Collective"],
  "latitude": 43.5875,
  "longitude": -110.8278,
  "coordinates": {"lat": 43.5875, "lng": -110.8278},
  "snow_24h": 0,
  "snow_48h": 0,
  "snow_7day": 4.1,
  "forecast_text": "Weather description",
  "last_updated": "2025-12-12T18:41:47.312Z",
  "region": null
}
```

---

## 🧮 Decision Algorithm (COMPLETE & TESTED)

### Scoring Formula
```javascript
total_score = 
  snow_score * 0.4 +      // 40% - Recent + forecast snowfall
  pass_score * 0.2 +      // 20% - On user's pass = 10, not on pass = 0
  parking_score * 0.4     // 40% - Parking legality (0-10 from research)
```

**Weights are configurable** - users can adjust priorities

### Snow Scoring Logic
- **24h snowfall:** 60% weight (fresh powder most important!)
- **7-day forecast:** 40% weight (upcoming conditions)
- Thresholds: 6" = good, 12" = excellent

### Test Results (December 12, 2025)

**Test 1: Ikon Pass Holder + Vanlifer**
- Weights: Snow 30%, Pass 20%, Parking 50%
- Winner: **Killington** (6/10 parking + Ikon pass match)
- Algorithm correctly prioritized good parking over better parking with no pass

**Test 2: Epic Pass Holder + Powder Chaser**
- Weights: Snow 60%, Pass 30%, Parking 10%
- Winner: **Breckenridge** (Epic pass match, decent parking)
- Algorithm correctly prioritized pass + snow over parking

**Test 3: Balanced (Ikon + Epic holder)**
- Weights: Snow 40%, Pass 30%, Parking 30%
- Winner: **Killington** (best combo of all factors)

**✅ Algorithm Status:** Fully functional, tested, ready for frontend integration

---

## 🚀 Roadmap

### Phase 1: Data Foundation ✅ COMPLETE
- ✅ Parking research system (18 resorts)
- ✅ Pass affiliation data (625 resorts)
- ✅ Snow data integration (GitHub automation)
- ✅ Coordinates for all 18 resorts
- ✅ Decision algorithm built and tested

### Phase 2: Frontend Integration (NEXT UP)
**Goal:** Build the decision form UI

**Tasks:**
1. Create hero form component
   - Input: Origin location
   - Input: Pass selection (Ikon/Epic/Indy chips)
   - Input: Priority sliders (Snow/Pass/Parking weights)
   - Button: "Find My Resort"

2. Results display
   - Top 5 ranked resorts
   - Show: Name, total score, snow conditions, parking score, pass match
   - Links to resort detail pages

3. API endpoint setup
   - Route: `/api/recommend`
   - Accepts: origin, passes[], weights{}
   - Returns: Ranked resort list

4. Drive time integration (Mapbox Directions API)
   - Calculate actual drive times from origin
   - Add travel_score to algorithm (currently placeholder)

### Phase 3: Expand Coverage (Week 3-4)
- Research remaining 12 resorts from Top 30 most-searched
- Target: 30 resorts total with complete data
- Continue expanding from there

### Phase 4: Polish & Launch
- QA testing (mobile, edge cases)
- Analytics setup (GA4)
- SEO optimization (resort pages with parking info)
- Soft launch to trusted users

---

## 🎯 Success Metrics

**Phase 1 Complete (Current):**
- ✅ 18 resorts with complete data
- ✅ Working decision algorithm
- ✅ Tested with multiple user scenarios
- ✅ Data pipeline automated

**Phase 2 Goals (Frontend):**
- [ ] Hero form functional
- [ ] Results displaying correctly
- [ ] Drive time calculation working
- [ ] Mobile responsive

**Launch Targets:**
- 500+ decision form submissions (Week 1)
- 100+ email signups (Week 1)
- 2,000+ pageviews (Week 1)

---

## 💭 Key Learnings

### What Worked Well
1. **Hybrid automation:** Claude API for research (80%) + manual verification (20%) = high quality data
2. **Simple data pipeline:** Python → JSON → JavaScript works smoothly
3. **Modular approach:** Separate scripts for each step makes debugging easy
4. **Testing early:** Caught issues before building frontend

### Critical Success Factors
1. **Parking data is the moat** - No competitor has this
2. **Pass-aware filtering** - Users care deeply about "free with my pass"
3. **Decision speed** - Algorithm must be fast (<1 second response)
4. **Mobile-first** - Vanlifers are on phones in parking lots

---

## 📁 Repository Structure

### Main Repo (GitHub: jnr47/skibum2025)
```
skibum2025/
├── snow-data.json          # 115 resorts, auto-updated every 6hrs
├── index.html              # Homepage with map
├── map.html                # Full map view
├── decision-engine/        # NEW - Decision algorithm files
│   ├── final_resorts.json  # 18 resorts with complete data
│   └── test_algorithm.js   # Algorithm test script
└── .github/workflows/      # GitHub Actions for automation
```

### Research Repo (Local: ~/Documents/skibum-research)
```
skibum-research/
├── research_resort_old.py      # Automated parking research
├── parking_database.py         # Excel management
├── merge_data.py               # Parking + passes merger
├── merge_snow_data.py          # Snow data integration
├── skibum_parking_database.xlsx # Master Excel database
├── Resorts_Global_Pass_Affiliations.csv
└── output/
    ├── merged_resorts.json     # Parking + passes (18)
    ├── final_resorts.json      # Complete dataset (18)
    └── test_algorithm.js       # Algorithm test
```

---

## 🔧 Next Session Priorities

1. **Build frontend decision form**
   - Create HTML/React component
   - Wire up algorithm
   - Test with real users

2. **Add drive time calculation**
   - Integrate Mapbox Directions API
   - Complete the travel_score in algorithm

3. **Research 12 more resorts**
   - Complete Top 30 most-searched list
   - Expand coverage to 30 total

---

## 📝 Session Summary - December 12, 2025

**Major Accomplishments:**
- ✅ Successfully merged parking data (18 resorts) with snow data from GitHub (115 resorts)
- ✅ Added coordinates to all 18 researched resorts
- ✅ Built and tested decision algorithm with real data
- ✅ Validated algorithm with 3 different user scenarios
- ✅ Created complete data pipeline: research → merge → algorithm → results

**Files Created:**
- `merge_snow_data.py` - Integrates GitHub snow data with parking research
- `test_algorithm.js` - Working decision algorithm with real data
- `final_resorts.json` - Complete dataset (18 resorts ready for production)

**Technical Wins:**
- Pass matching works correctly (Ikon/Epic prioritization)
- Parking scores properly weighted
- Snow scoring logic functional (tested in dry conditions)
- Algorithm produces sensible rankings based on user preferences

**Next Steps:**
- Frontend form integration
- Mapbox drive time calculation
- Expand to 30 resorts

---

**Last Updated:** December 12, 2025  
**Status:** 🟢 Phase 1 Complete - Decision Engine Ready  
**Next Phase:** Frontend Integration

---

*Ready to revolutionize ski trip planning! 🎿*
