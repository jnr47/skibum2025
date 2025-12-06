# SkiBum.com - Project Documentation

## Project Overview
SkiBum.com is a live snow tracking and ski trip planning platform that helps skiers and vanlifers find the best resorts based on real-time conditions, pass ownership, and overnight parking availability.

**Core Value Proposition:** 
The fastest way to decide where to ski – and where to sleep. Snow, passes, and overnight parking all in one place.

## Current Status (As of December 5, 2024)

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

## V1.5 Roadmap - Decision Engine Launch

### Phase 1: Data Foundation (Week 1-2)
**Goal:** Build the logic engine that powers recommendations

**Data Model Expansion:**
- Add parking_legality_score (0-10) for each resort
- Add overnight_notes, num_overnight_options
- Add pass arrays: ["Ikon", "Epic", "Indy"]
- Add terrain data, vertical drop
- Add day_ticket_price estimates

**Scoring Algorithm:**
```
total_score = 
  0.4 * snow_score +      // Recent + forecast snowfall
  0.2 * pass_score +      // On user's pass = high score
  0.2 * travel_score +    // Drive time bands
  0.2 * overnight_score   // Parking legality
```

**Parking Research System:**
Automated research using Claude API + web search to gather parking intel from:
- Official resort websites (parking pages, FAQs, policies)
- Campendium, The Dyrt, iOverlander, Hipcamp
- Skiburrito.com
- Reddit (r/vanlife, r/skiing, regional subs)
- TGR Forums, Newschoolers, Mountain Project

**Research Script Details:**
- Location: `/Users/dad/Documents/skibum-research/`
- Script: `research_resort.py`
- Cost: ~$0.50-2.00 per resort
- Time: 60 seconds per resort vs 2-3 hours manual
- Output: Structured JSON with parking scores, policies, enforcement levels, backup options

**Completed Research (As of Dec 5, 2024):**
1. Breckenridge - 1/10 (strict enforcement, good alternatives 3mi away)
2. Big Sky - 1/10 (strict, limited alternatives, Bozeman 45mi)
3. Arapahoe Basin - 1/10 (gates lock 6PM-7AM)
4. Killington - 6/10 (Skyeship Base allows overnight, 2 night/week limit)
5. Vail - 3/10 (paid overnight $35-60, free lots prohibited)

**Known Data Gaps to Address:**
- Stratton (friend reports vanlife-friendly, script found limited evidence - needs manual verification)
- Need to improve official website search accuracy

**Remaining Resorts to Research:** 25 of top 30 Western resorts

### Phase 2: Frontend Transformation (Week 3-4)
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
   - CTA: "View Full Map →"

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

**Drive Time Calculation:**
- Integrate Google Maps Distance Matrix API or Mapbox Directions
- Cache results for major city pairs
- Fall back to straight-line estimates

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

### Immediate (V1.5)
- [ ] Complete parking research for remaining 25 resorts
- [ ] Improve research script to better search official resort sites
- [ ] Build recommendation API endpoint
- [ ] Implement hero form UI
- [ ] Set up email capture system

### Short-term (V2)
- [ ] Create user accounts system
- [ ] Build UGC submission workflow
- [ ] Set up monthly auto-refresh of parking data
- [ ] Investigate RV Life / Campendium API access

### Long-term (V3+)
- [ ] Mobile app
- [ ] AI trip planner with natural language
- [ ] Partnership integrations (resorts, gear brands)
- [ ] Marketplace for parking spot exchange

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
- Pass-aware recommendations (unique)
- Parking legality database (no one else has this)
- Vanlife-first UX (not an afterthought)
- Decision engine vs information display

## Repository & Deployment

**GitHub:** [Repository URL if applicable]
**Live Site:** skibum.com
**Staging:** [Cloudflare Pages preview URLs]

**Deployment Process:**
- Push to main branch
- GitHub Actions runs data update workflow
- Cloudflare Pages auto-deploys

## Notes & Learnings

### December 5, 2024 - Research Automation Breakthrough
- Built Claude API-powered research script
- Validated it can reduce 90 hours of manual work to ~30 minutes
- Discovered web search rate limits (30/second) - need 2-3 min spacing between searches
- Original research approach works well, gives ~80% accuracy
- Human review still critical for edge cases (Stratton example)
- Cost per resort: $0.50-2.00 (very affordable at scale)

### Key Insight
The parking legality layer is genuinely differentiated. No competitor owns this data. But it must be:
1. Comprehensive (30+ resorts minimum for launch)
2. Current (monthly refresh needed)
3. Trustworthy (user verification + official sources)
4. Visible (front-and-center in UX, not buried)

This is the feature that makes SkiBum irreplaceable.

---

## Contact & Team
- **Project Lead:** Jeff
- **Role:** Global Alliance Manager at Cloudflare (day job)
- **Goal:** Make ski trips tax-deductible research expenses 🎿

---

*Last Updated: December 5, 2024*
