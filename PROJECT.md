# SkiBum.com - Project Documentation

## Project Overview
SkiBum.com is a live snow tracking and ski trip planning platform that helps skiers and vanlifers find the best resorts based on real-time conditions, pass ownership, and overnight parking availability.

**Core Value Proposition:** 
The fastest way to decide where to ski — and where to sleep. Snow, passes, and overnight parking all in one place.

## Current Status (As of December 12, 2025)

### What's Live
- Homepage with interactive map (Mapbox)
- 117+ North American ski resorts tracked
- Real-time snow data via Open-Meteo API
- GitHub Actions automation for data updates
- Hosted on Cloudflare Pages
- First resort page template (Mammoth Mountain)
- Vintage 1970s ski culture aesthetic
- Mobile-optimized design

### Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Map:** Mapbox GL JS
- **Data:** Open-Meteo API (global weather coverage)
- **Automation:** GitHub Actions (automated data updates)
- **Hosting:** Cloudflare Pages
- **Version Control:** GitHub
- **Data Management:** Excel + Python scripts for parking research
- **Decision Engine:** JavaScript algorithm (Node.js compatible)

## Critical Strategic Pivot (December 5, 2024)

### The Problem Identified
Current site is "informational" but not "irreplaceable." It shows data but doesn't make decisions for users.

### The New Direction: Decision Engine First

**Old approach:** "Here's information about ski resorts"
**New approach:** "I will tell you where to go this weekend in 30 seconds"

The hero decision form becomes the primary product, with the map serving as a secondary exploration tool.

### Core Differentiators
1. **Pass-Aware Recommendations** - No other tool filters by Ikon/Epic/Indy ownership + snow + drive time
2. **Parking Legality Layer** - First-class treatment of overnight parking rules (the moat)
3. **Vanlife-Friendly Focus** - Not an afterthought; core to the product
4. **Decision Engine** - "Show me the best places to go" vs browsing data manually

## Data Infrastructure (Completed December 12, 2025)

### Parking Research System
**Location:** `/Users/dad/Documents/skibum-research/`

**Components:**
1. **research_resort_old.py** - Automated parking research using Claude API + web search
   - Cost: ~$0.02-0.50 per resort
   - Time: 60 seconds per resort
   - Sources: Official sites, Reddit, vanlife forums, Campendium, iOverlander
   - Output: Structured JSON with scores, policies, enforcement levels

2. **parking_database.py** - Excel database management
   - Creates Excel template with auto-calculating formulas
   - Imports automated research results
   - Exports to JSON for production use
   - Supports manual data entry and verification

3. **Excel Database** - `skibum_parking_database_YYYYMMDD.xlsx`
   - 3 tabs: Resort Parking Data, Scoring Guide, Alternatives Database
   - Auto-calculating parking scores and status
   - Manual override capability for corrections
   - 18 resorts researched (as of Dec 10)

**Completed Research (18 Resorts - December 12, 2025):**

**Top 10 Most-Searched Resorts:**
1. Jackson Hole - 1/10 (hotel guests only, strict enforcement)
2. Vail - 3/10 (paid overnight $35-60, free lots prohibited)
3. Breckenridge - 4/10 (town lots only, resort lots prohibited)
4. Park City - Score TBD
5. Aspen Snowmass - Score TBD
6. Whistler Blackcomb - Score TBD
7. Mammoth Mountain - Score TBD
8. Killington - 6/10 (Skyeship Base allows overnight, 2 night/week limit)
9. Steamboat - Score TBD
10. Deer Valley - Score TBD

**Additional Researched Resorts:**
- Arapahoe Basin - 1/10 (gates lock overnight)
- Big Sky - 1/10 (strict enforcement)
- Mt. Bachelor - 8/10 (official paid overnight parking available)
- Bridger Bowl - 7/10 (allowed with advance permission, winter only)
- Powderhorn - Score TBD
- Kicking Horse - Score TBD
- Whitefish - Score TBD
- Stratton - 2/10 (needs manual verification - conflicting data)

**Key Findings:**
- Resorts with official overnight parking: Mt. Bachelor, Bridger Bowl, Killington
- Hostile resorts (strict enforcement, no alternatives): Jackson Hole, Big Sky, A-Basin
- Mixed enforcement: Breckenridge (town allows, resort prohibits)
- Cost range for paid overnight: $0 (free) to $75/night

### Pass Affiliation Database
**File:** `Resorts_Global_Pass_Affiliations.csv`
- 625 resorts globally
- Pass types tracked: Ikon, Epic, Indy, Mountain Collective, Powder Alliance, Freedom, Power
- Successfully merged with parking data

### Merged Resort Data
**File:** `output/merged_resorts.json`
- Combines parking scores + pass affiliations
- 18 resorts with complete data
- Ready for decision algorithm integration
- Placeholders for snow data and coordinates (to be added)

**Data Structure:**
```json
{
  "name": "Resort Name",
  "parking_score": 0-10,
  "parking_policy": "Full policy text",
  "enforcement": "strict/moderate/relaxed",
  "allowed_lots": ["Lot names"],
  "passes": ["Ikon", "Epic"],
  "snow_24h": null,
  "snow_72h": null,
  "coordinates": null,
  "region": "State/Province"
}
```

## Decision Algorithm (Built December 12, 2025)

### Scoring Logic
**File:** `decision_algorithm.js`

**Formula:**
```
total_score = 
  0.4 * snow_score +      // Recent + forecast snowfall (placeholder)
  0.2 * pass_score +      // On user's pass = 10, not on pass = 0
  0.2 * travel_score +    // Drive time bands (placeholder)
  0.2 * overnight_score   // Parking legality score
```

**Weights are configurable** - users can adjust priorities

**Current Status:**
- ✅ Pass matching: WORKING (filters by Ikon/Epic/Indy)
- ✅ Parking scoring: WORKING (uses research data)
- ⚠️ Snow scoring: PLACEHOLDER (needs GitHub data integration)
- ⚠️ Travel scoring: PLACEHOLDER (needs coordinates + distance calc)

**Test Results:**
For user with Ikon pass, algorithm correctly ranks:
1. Killington (5.2/10) - Ikon + good parking (6/10)
2. Steamboat (4.4/10) - Ikon + poor parking (2/10)
3. Jackson Hole (4.2/10) - Ikon + terrible parking (1/10)

Algorithm successfully prioritizes resorts with better parking when pass matches.

## V1.5 Roadmap - Decision Engine Launch

### Phase 1: Data Foundation ✅ COMPLETED (December 12, 2025)
**Goal:** Build the logic engine that powers recommendations

**Completed:**
- ✅ Parking research system (18 resorts researched)
- ✅ Excel database with auto-scoring
- ✅ Pass affiliation data (625 resorts)
- ✅ Data merging pipeline (parking + passes)
- ✅ Decision algorithm core logic
- ✅ Pass-aware filtering working

**Remaining:**
- [ ] Integrate snow data from GitHub (Open-Meteo API)
- [ ] Add resort coordinates for all resorts
- [ ] Implement drive time calculation (Mapbox Directions API)
- [ ] Research remaining top 30 resorts (12 more needed)

### Phase 2: Frontend Transformation (Week 3-4) - IN PROGRESS
**Goal:** Rebuild homepage around decision engine

**New Homepage Structure:**
1. **Hero Section** (Top of page)
   - Headline: "Where should you ski this weekend?"
   - Subhead: "Real-time snow, passes, and overnight parking—all in one place"
   - Decision form with inputs:
     * Leaving from: [Denver, CO]
     * Passes owned: [Ikon, Epic, Indy] (multi-select chips)
     * Trip window: [Fri → Sun] (date picker)
   - CTA: "Show me the best places to go"
   - Subtext: "Powder, parking, and drive-time ranked recommendations"

2. **Results Cards** (Dynamic, appears after form submission)
   - Top 3-5 resorts ranked by total_score
   - Each card shows: snow totals, pass match, overnight score, drive time
   - CTAs: "View Trip" | "Add to Favorites"

3. **Map Preview Section** (Mid-page)
   - Headline: "Your entire season — visualized"
   - Smaller map preview with pass filter toggles
   - CTA: "View Full Map ↓"

4. **Why SkiBum?** (Feature cards)
   - Skip the planning chaos
   - Sleep legally near the mountain
   - Chase storms intelligently  
   - Plan your entire ski roadtrip

**Map Page Upgrades:**
- Search bar with autocomplete (zoom to resort)
- Pass filter chips (All | Epic | Ikon | Indy | Independent)
- Snow filters (Any | >3" 24h | >6" 72h | Storm incoming)
- Van-friendly toggle (shows only overnight_score >= 7)
- Enhanced pin popups with mini-cards

**API Endpoint:**
- Route: `/api/recommend`
- Accepts: origin, passes[], start_date, end_date, max_drive_hours
- Returns: Top 5 ranked resorts with scores + summary

**Integration Needed:**
- Connect decision_algorithm.js to frontend
- Add snow data from GitHub Actions workflow
- Implement Mapbox Directions API for drive times
- Build results card UI

### Phase 3: Conversion & Retention (Week 5-6)
**Email Capture Flows:**
- "Save Your Results" prompt after hero form
- "Get weekly storm alerts" opt-in
- Lead magnets: "Best Overnight Spots Guide" PDF

**Favorites System (v1):**
- LocalStorage-based (logged-out)
- Heart icon to save resorts
- "Email me this list" prompt

**SEO Foundation:**
- Update resort pages with "Overnight Parking" sections
- Display parking_legality_score visually
- Show nearby Hipcamp/Harvest Hosts
- Target long-tail keywords: "Ikon resorts near Denver with free parking"
- Schema markup for SkiResort + FAQ

**Content Strategy:**
5-10 high-value blog posts:
- "Ikon Resorts Near Denver with Free Parking"
- "Best Vanlife-Friendly Ski Resorts in Colorado"
- "Where to Sleep Overnight at [Resort Name]"

### Phase 4: Polish & Launch (Week 7)
- QA testing (hero form, scoring logic, mobile)
- GA4 events (form submissions, result clicks, signups)
- Heatmaps (Hotjar)
- Launch content (Reddit posts, email, social)
- Soft launch with 10-20 trusted users

## Post-V1.5: Future Phases

### V2: UGC & Community (Weeks 8-10)
- Parking intel submission form
- User reviews/comments on resort pages
- Voting: "Is this info still accurate?"
- Community-sourced data validation

### V3: Trip Planning Tools (Weeks 11-13)
- Multi-resort itinerary builder
- "Save trips" with notes
- Route optimization (fuel/time estimates)
- Storm-chasing mode

### V4: Monetization (Weeks 14-16)
- SkiBum+ subscription ($5-10/mo)
  * Advanced filters
  * Storm alerts
  * Trip planning tools
- Optimized affiliate links (gear > hotels)
- Partnership outreach to gear brands

## Success Metrics

**Week 1 Post-Launch:**
- 500+ hero form submissions
- 100+ email signups
- 2,000+ pageviews

**Month 1:**
- 5,000+ hero form submissions
- 500+ email list
- 10+ organic mentions (Reddit/forums)
- 3-5 parking pages ranking on Google page 1

**Month 3:**
- 20,000+ monthly users
- 2,000+ email subscribers
- First affiliate revenue ($100+)
- User-submitted parking intel flowing

## Technical Debt & Improvements Needed

### Immediate (Phase 2)
- [ ] Integrate snow data from GitHub into merged_resorts.json
- [ ] Add coordinates for all 18 researched resorts
- [ ] Implement Mapbox Directions API for drive times
- [ ] Test algorithm with real snow data
- [ ] Build frontend form that calls decision_algorithm.js

### Short-term (V2)
- [ ] Research remaining 12 resorts from Top 30
- [ ] Create user accounts system
- [ ] Build UGC submission workflow
- [ ] Set up monthly auto-refresh of parking data
- [ ] Investigate RV Life / Campendium API access

### Long-term (V3+)
- [ ] Mobile app
- [ ] AI trip planner with natural language
- [ ] Partnership integrations (resorts, gear brands)
- [ ] Marketplace for parking spot exchange

## Files & Repository Structure

### Parking Research Repository
**Location:** `/Users/dad/Documents/skibum-research/`

```
skibum-research/
├── .env (API key)
├── venv/ (Python virtual environment)
├── research_resort_old.py (working research script)
├── parking_database.py (Excel management)
├── merge_data.py (combines parking + pass data)
├── decision_algorithm.js (scoring logic)
├── export_parking.py (Excel → JSON)
├── skibum_parking_database_20241210.xlsx (master database)
├── Resorts_Global_Pass_Affiliations.csv (625 resorts)
├── output/
│   ├── all_resorts_parking.json (18 resorts, parking only)
│   ├── merged_resorts.json (18 resorts, parking + passes)
│   ├── jackson_hole_parking.json
│   ├── killington_parking.json
│   └── [16 more individual resort files]
└── README.md
```

### Main SkiBum.com Repository
**Location:** GitHub (separate repo)
- Weather data (Open-Meteo API via GitHub Actions)
- Map interface (Mapbox GL JS)
- Frontend HTML/CSS/JS
- 117 resort coordinates

**Next Integration Step:**
Copy `merged_resorts.json` to main repo and integrate with existing snow data

## Design Philosophy

**Aesthetic:** 1970s après-ski culture
- Vintage ski photography
- Retro color palette (burnt orange, cream, forest green)
- Authentic, non-corporate vibe
- "Ski bum" authenticity over slick corporate design

**UX Principles:**
- Decision speed over information density
- Mobile-first (vanlifers are on phones)
- Reduce planning time by 80%
- Make the hard questions easy (parking legality)

## Competitive Landscape

**What Exists:**
- OpenSnow: Best snow forecasting, but no pass awareness or parking intel
- Epic/Ikon apps: Pass-specific, no multi-pass comparison or parking
- OnTheSnow: General info, no decision engine
- Vanlife apps: Not ski-focused, don't understand resort policies

**SkiBum's Moat:**
- Pass-aware recommendations (unique) ✅ WORKING
- Parking legality database (no one else has this) ✅ 18 RESORTS COMPLETE
- Vanlife-first UX (not an afterthought)
- Decision engine vs information display ✅ ALGORITHM BUILT

## Key Resources & References

### Parking Intel Sources (Validated)
- **SnowBrains Article:** "North American Ski Resorts That Allow Camping" (Dec 2024)
  - Lists 40+ resorts that officially allow overnight parking
  - Validated against our research (Mt. Bachelor, Bridger Bowl confirmed)
- Official resort websites (when accessible)
- Reddit: r/vanlife, r/skiing
- Campendium, iOverlander, TheDyrt
- TGR Forums, Newschoolers

### API Costs (Actual)
- Claude API for parking research: $0.02-0.50 per resort
- Open-Meteo API: Free
- Mapbox (planned): Free tier sufficient for MVP

## Notes & Learnings

### December 12, 2025 - Data Infrastructure Complete
**Accomplishments:**
- Built complete parking research pipeline (automated + manual verification)
- Researched 18 resorts including all Top 10 most-searched
- Created Excel database with auto-scoring formulas
- Merged parking + pass data for 18 resorts
- Built working decision algorithm with pass-aware filtering
- Validated algorithm successfully ranks resorts by parking quality

**Key Insights:**
- Hybrid approach works best: automation (80%) + manual verification (20%)
- Excel database provides flexibility for manual corrections
- Pass matching is critical - users care more about "free with my pass" than absolute quality
- Parking scores significantly affect rankings (Killington beats Jackson Hole despite both being Ikon)
- Bot protection on official sites requires human verification for ~30% of resorts

**Cost Analysis:**
- Total spent on parking research: ~$5-10 for 18 resorts
- Average: $0.28-0.56 per resort
- Time saved vs manual: ~30-40 hours (2-3 hours manual vs 1 minute automated + 5 min verification)

### December 5, 2024 - Research Automation Breakthrough
- Built Claude API-powered research script
- Validated it can reduce 90 hours of manual work to ~30 minutes
- Discovered web search rate limits (30/second) - need 2-3 min spacing between searches
- Original research approach works well, gives ~80% accuracy
- Human review still critical for edge cases (Stratton example)
- Cost per resort: $0.50-2.00 (very affordable at scale)

### Critical Success Factors
The parking legality layer is genuinely differentiated. No competitor owns this data. But it must be:
1. Comprehensive (30+ resorts minimum for launch) - ✅ 18/30 complete
2. Current (monthly refresh needed) - System built, automation ready
3. Trustworthy (user verification + official sources) - Hybrid approach working
4. Visible (front-and-center in UX, not buried) - Ready for integration

This is the feature that makes SkiBum irreplaceable.

---

## Contact & Team
- **Project Lead:** Jeff
- **Role:** Global Alliance Manager at Cloudflare (day job)
- **Goal:** Make ski trips tax-deductible research expenses 🎿

---

## Next Session Priorities
1. Integrate snow data from GitHub into merged_resorts.json
2. Add resort coordinates (lat/long) for distance calculations
3. Test decision algorithm with real snow data
4. Implement Mapbox Directions API for accurate drive times
5. Build frontend form UI that calls the algorithm

---

*Last Updated: December 12, 2025*
