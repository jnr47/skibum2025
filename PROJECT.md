# 🎿 SKIBUM.COM - PROJECT DOCUMENTATION

## 📌 Quick Links
- **Live Site**: https://skibum.com
- **Interactive Map**: https://skibum.com/map.html
- **GitHub Repo**: https://github.com/jnr47/skibum2025
- **GitHub Actions**: Runs every 6 hours automatically (0, 6, 12, 18 UTC)
- **Snow Data JSON**: https://skibum.com/snow-data.json
- **Google Search Console**: Verified ✅
- **Travelpayouts Dashboard**: Active ✅

---

## 🎯 CURRENT STATUS (December 5, 2025)

**Status**: 🟢 MAMMOTH MOUNTAIN TEMPLATE COMPLETE!

**What's Working:**
- ✅ **NEW HOMEPAGE** - Modern, clean design with full site structure
- ✅ **Interactive map** - Now at /map.html (117 resorts with real Open-Meteo data)
- ✅ **MAMMOTH MOUNTAIN PAGE** - Complete 13-section resort template ready
- ✅ Site loads in <500ms
- ✅ Map preview with heatmap visualization on homepage
- ✅ **REAL TRAIL MAP IMAGES** - Top 10 resorts showing actual ski maps (not emojis!)
- ✅ **Real vanlife winter photo** - Gorgeous snowy van scene
- ✅ **Real storm radar image** - Actual weather visualization
- ✅ **Clean shield logo** - skibum_128.png used consistently
- ✅ Compact navigation (50px logo, optimized spacing)
- ✅ Tight spacing - resort tiles visible above fold
- ✅ Mobile optimized with fixed button text wrapping
- ✅ SEO meta tags
- ✅ Real Mammoth Mountain banner image

**Site Architecture:**
- `index.html` = Homepage (marketing/navigation hub)
- `map.html` = Interactive snow tracking map
- `mammoth.html` = Complete resort page template (13 sections)
- Clean separation between marketing and tool

**Image Assets Added:**
- `/images/resorts/` - 10 trail map images (.avif format): vail, aspen, breckenridge, park-city, whistler, jackson-hole, mammoth, palisades, steamboat, big-sky
- `/images/mammoth-hero.jpeg` - Hero background
- `/images/vanlife-winter.jpg` - Vanlife section photo
- `/images/storm-radar.jpg` - Storm tracker visualization
- `/images/skibum-shield.png` - Transparent logo for footer

---

## 🎯 THE NEW VISION (December 3, 2025)

### **What Changed:**
We pivoted from an **affiliate-heavy monetization strategy** to building a **genuine planning hub** that differentiates through:

1. **Real utility** - Centralized snow data, cams, road conditions
2. **Vanlife focus** - Overnight parking guides (no competitor does this)
3. **Map as centerpiece** - Interactive tool, not just content
4. **Content supports tool** - Not the other way around

### **Why We Changed:**
- Affiliate marketing is saturated with AI-generated content
- Need differentiation beyond just "another ski blog"
- The map + vanlife angle = unique positioning
- Build audience first, monetize later

---

## 📐 HOMEPAGE STRUCTURE

### Section 1: Hero
- **Headline**: "Where should you ski this weekend?"
- **Subheadline**: Real-time snow, cams, road conditions, vanlife parking
- **CTAs**: "Open the Map" (primary) | "Explore Resorts" (secondary)
- **Background**: Mammoth Mountain hero image with blue overlay
- **Design**: Compact, above-the-fold

### Section 2: Map Preview
- **Title**: "Your entire season, all on one map"
- **Visual**: Embedded Mapbox map with heatmap visualization
- **Purpose**: Show the tool, drive clicks to full map
- **CTA**: "View Full Map →"

### Section 3: Top 10 Resorts (PRIMARY NAVIGATION)
**Featured Resorts:**
1. Vail
2. Aspen Snowmass
3. Breckenridge
4. Park City
5. Whistler Blackcomb
6. Jackson Hole
7. Mammoth Mountain
8. Palisades Tahoe
9. Steamboat
10. Big Sky

**Why these 10:**
- Highest search volume in North America
- Geographic diversity (West Coast, Rockies, Canada)
- Mix of Ikon/Epic pass coverage
- Strong vanlife culture

**Card Display:**
- Full-width grid (3 columns desktop, 2 mobile)
- Shows: Resort name, snowfall amount, pass badge
- Clickable → leads to individual resort pages (to be built)

### Section 4: Vanlife on the Mountain
**Layout**: Two-column (text left, visual right)
**Content**: 
- Clear overnight parking rules
- Safe spots to stay
- Camp-friendly options
**Differentiator**: "The only ski platform built with vanlife in mind"

### Section 5: Storm Tracker
**Layout**: Two-column
**Purpose**: Drive email signups for powder alerts
**Updates**: Daily storm tracking

### Section 6: Guides
**SEO-driven articles** (to be written):
- Best Ski Resorts for Vanlife
- Where to Park Overnight at Ski Resorts
- Ikon vs Epic for Road Trips
- Best U.S. Powder Mountains
- Top Budget Ski Trips

### Section 7: Email Capture
**Headline**: "Get Powder Alerts & Overnight Parking Updates"
**Promise**: "No spam. Ever."
**Purpose**: Build owned audience

### Section 8: Footer
Standard footer with navigation links and "Built for the ones who chase it" tagline

---

## 🗂️ FILE STRUCTURE

```
skibum2025/
├── index.html                          ← Homepage
├── map.html                            ← Interactive map
├── mammoth.html                        ← Resort page template (COMPLETE)
├── snow-data.json                      ← Auto-updated every 6 hours
├── skibum_128.png                      ← Shield logo (official)
├── skibum_logo_blacktype_small.png     ← Old logo (legacy)
├── mammoth_mountain_banner.jpg         ← Hero banner image
├── images/
│   ├── resorts/                        ← Trail map images (.avif)
│   │   ├── vail.avif
│   │   ├── aspen.avif
│   │   ├── breckenridge.avif
│   │   ├── park-city.avif
│   │   ├── whistler.avif
│   │   ├── jackson-hole.avif
│   │   ├── mammoth.avif
│   │   ├── palisades.avif
│   │   ├── steamboat.avif
│   │   └── big-sky.avif
│   ├── mammoth-hero.jpeg               ← Hero background image
│   ├── vanlife-winter.jpg              ← Vanlife section photo
│   ├── storm-radar.jpg                 ← Storm tracker visualization
│   └── skibum-shield.png               ← Transparent logo for footer
└── .github/
    └── workflows/
        └── update-snow-data.yml        ← GitHub Action workflow
```

---

## 🎨 DESIGN SYSTEM

### Colors:
- **Primary Blue**: #1e3a5f
- **Accent Orange**: #ff6b35
- **Light Background**: #f8f9fa
- **White**: #ffffff
- **Text Dark**: #2c3e50
- **Text Light**: #6c757d

### Typography:
- **Font**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Hero H1**: 2rem (mobile: 1.5rem)
- **Section Titles**: 1.75rem
- **Body**: 1rem

### Layout:
- **Max Width**: 1200px
- **Padding**: 2rem (desktop), 1.5rem (mobile)
- **Grid**: 3 columns (desktop) → 2 (tablet) → 1 (mobile)

### Logo:
- **Size**: 80px height
- **Position**: Top-left in navigation

---

## 🚀 12-WEEK ROADMAP

### WEEKS 1-2: Foundation ✅ COMPLETE
- ✅ New homepage launched
- ✅ Homepage → Map separation
- ✅ Basic structure in place

### WEEKS 3-6: Build Top 10 Resort Pages
**Priority**: Build complete pages for the top 10 resorts first

**Each resort page includes:**
1. Hero with snow forecast (24hr, 48hr, 7-day)
2. Live mountain & road cams
3. Parking & vanlife overnight guide
4. Resort overview & stats
5. Best routes to get there
6. Where to stay (affiliate section)
7. Essential gear (affiliate section)
8. Lift tickets & passes
9. Plan your trip (itineraries)
10. Embedded map
11. FAQ (SEO-optimized)
12. Email capture

### WEEKS 7-8: Vanlife Content Layer
- Build vanlife guide page
- Add parking info to all 10 resort pages
- Create "Where to Park Overnight" comprehensive guide

### WEEKS 9-10: SEO & Content
**Write 4 Core Articles:**
1. Best Ski Resorts for Vanlife
2. Where to Park Overnight at Ski Resorts
3. Ikon vs Epic for Road Trips
4. Best U.S. Powder Mountains

### WEEKS 11-12: Light Monetization
- Add Booking.com affiliate links (via Travelpayouts or Awin)
- Add Hipcamp/Harvest Hosts links
- Add gear affiliate links (Backcountry, Evo, REI)
- Set up email automation for powder alerts

---

## 💰 MONETIZATION STRATEGY (REVISED)

### Phase 1: Build Audience (Months 1-3)
**Focus**: Traffic + Email list + Brand
- No aggressive monetization
- Light affiliate links only
- Build trust first

### Phase 2: Introduce Affiliates (Months 4-6)
**Revenue Streams:**
1. **Lodging** (Booking.com via Awin - 25-40% commission)
2. **Vanlife** (Hipcamp, Harvest Hosts - 10-15% commission)
3. **Gear** (Backcountry, REI, Evo - 5-10% commission)
4. **Activities** (Viator - 8% commission)

### Phase 3: Premium Features (Month 7+)
**Potential Premium Offerings:**
- Advanced trip planner
- Custom powder alerts by region
- "Vanlife Mode" with diesel-safe gas stations
- Multi-resort itinerary builder

**Conservative Revenue Goals:**
- Month 3: $0 (audience building)
- Month 6: $1,000-2,000/month
- Month 12: $5,000-10,000/month
- Year 2: $25,000+/month (if traffic scales)

---

## 📊 TRAFFIC STRATEGY

### SEO (Primary)
**Target Keywords:**
- "ski conditions [resort name]"
- "where to park overnight [resort name]"
- "vanlife ski resorts"
- "best ski resorts for vanlife"
- "powder forecast [region]"

**Content Strategy:**
- 10 resort pages (long-tail SEO)
- 4-5 comprehensive guides
- Regular blog updates

### Social (Secondary)
**Platforms:**
- Instagram (vanlife audience)
- Reddit (r/skiing, r/vanlife)
- Facebook (vanlife groups)

**Content:**
- Map flyovers
- Powder alerts
- Parking guides
- Storm chase content

### Email (Retention)
**Weekly Newsletter:**
- Weekend powder forecast
- Best parking options this week
- Storm tracker updates
- New resort pages

---

## 🛠️ TECHNICAL STACK

### Frontend:
- **HTML/CSS/JavaScript** (no frameworks on homepage)
- **React** (for interactive map only)
- **Mapbox GL JS** (mapping)
- **Cloudflare Pages** (hosting)

### Data:
- **Open-Meteo API** (weather data)
- **GitHub Actions** (automated updates every 6 hours)
- **Static JSON** (snow-data.json)

### Tools:
- **Google Search Console** (SEO tracking)
- **Travelpayouts** (affiliate tracking)
- **Git/GitHub** (version control)

---

## 📋 NEXT SESSION PRIORITIES

### Immediate (Next Session):
1. **Option A: Scale Resort Pages** - Duplicate Mammoth template for remaining 9 resorts
2. **Option B: Implement New Ideas** - Pivot based on new strategy
3. **Link Mammoth page from homepage** - Update Top 10 resort tiles to link to /mammoth.html
4. **Test affiliate link tracking** - Verify Travelpayouts integration
5. **Integrate real snow data** - Connect mammoth.html to snow-data.json

### If Scaling (Option A):
1. Collect banner images for 9 remaining resorts
2. Customize resort-specific data (stats, cams, parking info)
3. Update resort names, taglines, and content
4. Test each page on mobile

### If Pivoting (Option B):
1. Document new strategy/ideas
2. Prioritize features based on user value
3. Update roadmap accordingly

### Short-term (Weeks 2-3):
1. Replicate template for remaining 9 resorts
2. Add real snow data to resort pages
3. Integrate mountain cams (public URLs)
4. Add road cams (DOT APIs)

### Medium-term (Months 2-3):
1. Expand to 35 resorts
2. Write 4 core SEO articles
3. Build comprehensive vanlife guide
4. Set up email automation

---

## 💭 KEY DECISIONS MADE (December 3, 2025)

### Decision 1: Two-File Architecture
**Chose**: Separate homepage (index.html) and map (map.html)
**Why**: Clean separation, easier to maintain, better user flow

### Decision 2: Resorts as Primary Navigation
**Chose**: Full-width resort grid as main navigation
**Why**: Resort pages = core content = monetization = SEO

### Decision 3: Vanlife as Differentiator
**Chose**: Prominent vanlife section, dedicated guides
**Why**: No competitor addresses this, passionate niche audience

### Decision 4: Preview Map with Fake Data
**Chose**: Show heatmap with fake snow data on homepage
**Why**: Always looks impressive, drives clicks to real map

### Decision 5: Top 10 First, Then Scale
**Chose**: Build 10 complete pages before expanding
**Why**: Test conversion, prove model, iterate before scaling

---

## 🎯 SUCCESS METRICS

### Month 1:
- [ ] Homepage live and functional
- [ ] 10 resort pages complete
- [ ] 100 email subscribers
- [ ] 1,000 monthly visitors

### Month 3:
- [ ] 35 resort pages live
- [ ] 4 core guides published
- [ ] 500 email subscribers
- [ ] 5,000 monthly visitors
- [ ] First affiliate conversions

### Month 6:
- [ ] All 117 resort pages live
- [ ] 10+ comprehensive guides
- [ ] 2,000 email subscribers
- [ ] 20,000 monthly visitors
- [ ] $1,000-2,000/month revenue

### Month 12:
- [ ] Established brand
- [ ] 5,000+ email subscribers
- [ ] 50,000+ monthly visitors
- [ ] $5,000-10,000/month revenue
- [ ] Featured in vanlife/ski media

---

## 📝 LESSONS LEARNED

### What Worked:
✅ **Simple two-file architecture** - Easy to understand and maintain
✅ **Map as centerpiece** - Strong differentiator
✅ **Vanlife angle** - Unique positioning
✅ **Clean design** - Professional, not cheesy
✅ **Mobile-first approach** - Looks great on phones

### What to Remember:
- **Traction before monetization** - Build audience first
- **Content supports tool** - Not the other way around
- **Vanlife = wedge** - Lean into it heavily
- **Start with 10, then scale** - Don't build all 117 at once
- **Real utility > SEO tricks** - Focus on genuinely useful features

### What's Next:
- Build resort page template
- Write vanlife content
- Set up email system
- Drive initial traffic

---

## 🔗 IMPORTANT LINKS

### Development:
- GitHub: https://github.com/jnr47/skibum2025
- Cloudflare Pages: Auto-deploys from GitHub

### SEO & Analytics:
- Google Search Console: Verified
- (Add Google Analytics in future session)

### Affiliate Programs:
- Travelpayouts: https://www.travelpayouts.com/
- Awin (priority): https://www.awin.com/us
- Yelp API: https://www.yelp.com/developers

### Data Sources:
- Open-Meteo: Weather API (currently in use)
- State DOT APIs: Road conditions
- Public webcams: Mountain cams

---

**Last Updated**: December 5, 2025  
**Status**: 🟢 Mammoth Mountain Template Complete  
**Next Session**: Replicate template for remaining 9 resorts OR implement new ideas  
**Focus**: Scale resort pages or pivot to new features 🎿

## 📸 MAMMOTH MOUNTAIN TEMPLATE - SESSION SUMMARY (December 5, 2025)

### Major Accomplishments:
1. **Complete 13-Section Template Built** - Following master resort page structure
2. **All Sections Implemented**:
   - Hero with real Mammoth Mountain banner image
   - Conditions card with 5-column grid (24hr, Temp, IKON badge, Next Storm, Base Depth)
   - "Is It a Good Time to Go?" with Powder badge
   - Live Mountain & Road Cams (6 camera links)
   - Parking & Vanlife Guide (complete overnight parking info)
   - Resort Overview & Stats with Local Intel
   - Best Routes (from LA and Reno)
   - Where to Stay (3 lodging options with affiliate structure)
   - Essential Gear (4 categories with Backcountry/Evo/REI links)
   - Lift Tickets & Passes
   - Plan Your Trip (sample itinerary with tabs)
   - Resort Map placeholder
   - FAQ (6 SEO-optimized questions with collapsible answers)
   - Email Capture (bottom CTA)

3. **Design Refinements**:
   - Logo standardized: shield icon (skibum_128.png) + "Skibum" + "Built for the ones who chase it."
   - Hero banner reduced from 60vh to 35vh (much more compact)
   - All white space compressed (60px → 35px section padding)
   - Conditions card optimized (tighter spacing, smaller fonts)
   - IKON badge centered in conditions bar (not floating)
   - Buttons made more compact (12px/24px padding)

4. **Assets Created**:
   - `mammoth.html` - Complete resort page template
   - `mammoth_mountain_banner.jpg` - Real Mammoth peaks hero image
   - `skibum_128.png` - Official shield logo (128px)

### Technical Implementation:
- Vintage 1970s aesthetic: Cream (#F5F1E8), burnt orange (#D9512C), navy (#0B1B2B)
- Bebas Neue for headers, Libre Franklin for body text
- Fully responsive with mobile optimization
- JavaScript for FAQ toggles, itinerary tabs, smooth scrolling
- Ready for snow-data.json integration
- All affiliate links structured and ready

### Key Design Decisions:
1. **IKON badge in center** - Not overlapping, part of the metrics grid
2. **Compact spacing** - Reduced all padding/margins by ~40%
3. **Real banner image** - Authentic Mammoth Mountain photo
4. **Logo consistency** - Shield + text format matches homepage
5. **Green vanlife section** - Differentiator with unique color treatment

### Ready to Scale:
This template can now be duplicated for the remaining 9 Top 10 resorts:
1. ✅ Mammoth Mountain (complete)
2. ⏳ Vail
3. ⏳ Aspen Snowmass
4. ⏳ Breckenridge
5. ⏳ Park City
6. ⏳ Whistler Blackcomb
7. ⏳ Jackson Hole
8. ⏳ Palisades Tahoe
9. ⏳ Steamboat
10. ⏳ Big Sky

---

## 📸 SESSION SUMMARY (December 3, 2025)

### Major Accomplishments:
1. **Homepage Design Complete** - Complete from scratch in one session
2. **Visual Upgrade** - Replaced all placeholder emojis with professional images
3. **Trail Maps Integration** - 10 actual resort ski maps (.avif format)
4. **Photography** - Real vanlife winter scene, storm radar, hero background
5. **Spacing Optimization** - Tightened layout to show resort tiles above fold
6. **Navigation Polish** - Compact header (50px logo, sticky positioning)
7. **Logo Refinement** - Transparent shield PNG for footer
8. **Mobile Fixes** - Button text wrapping, touch targets, responsive images
9. **Strategic Pivot Documentation** - Updated vision from affiliate-heavy to planning hub

### Files Created/Updated:
- `index.html` - Complete new homepage (production ready)
- `PROJECT.md` - Updated documentation
- `CHANGELOG.md` - Session log created
- 10 trail map images uploaded to `/images/resorts/`
- 4 additional images for sections (hero, vanlife, storm, logo)

### Key Decisions:
- Real images > emojis (authenticity over convenience)
- Tight spacing to show resort tiles above fold (conversion optimization)
- Compact navigation to maximize content space
- Map preview uses fake data for consistent visual appeal
- Two-file architecture maintained (index.html + map.html)

### Next Session Goals:
1. Build Mammoth Mountain resort page as template
2. Implement 13-section structure from vision doc
3. Integrate real snow data from snow-data.json
4. Add mountain cams (if public URLs available)
5. Test affiliate link integration
6. Mobile optimization testing

---
