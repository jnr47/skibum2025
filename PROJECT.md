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

## 🎯 CURRENT STATUS (December 3, 2025)

**Status**: 🟢 NEW HOMEPAGE LAUNCHED!

**What's Working:**
- ✅ **NEW HOMEPAGE** - Modern, clean design with full site structure
- ✅ **Interactive map** - Now at /map.html (117 resorts with real Open-Meteo data)
- ✅ Site loads in <500ms
- ✅ Map preview with heatmap visualization on homepage
- ✅ Top 10 resorts section (primary navigation)
- ✅ Vanlife section (differentiator)
- ✅ Storm tracker section
- ✅ Guides section
- ✅ Email capture
- ✅ Mobile optimized
- ✅ SEO meta tags
- ✅ Hero section with Mammoth Mountain background image
- ✅ Larger, more prominent logo

**Site Architecture:**
- `index.html` = New homepage (marketing/navigation hub)
- `map.html` = Interactive snow tracking map (your original index.html)
- Clean separation between marketing and tool

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
├── index.html                          ← NEW homepage
├── map.html                            ← Interactive map (old index.html)
├── snow-data.json                      ← Auto-updated every 6 hours
├── skibum_logo_blacktype_small.png     ← Logo file
├── images/
│   └── mammoth-hero.jpeg              ← Hero background image
└── mammoth.html                        ← Future resort page template
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
1. **Build first resort page template** (use Mammoth Mountain as test)
2. **Test affiliate link integration** (Travelpayouts)
3. **Write first vanlife guide** (overnight parking basics)

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

**Last Updated**: December 3, 2025, 4:35 PM ET  
**Status**: 🟢 New Homepage Live - Phase 1 Complete  
**Next Session**: Build Mammoth Mountain resort page template  
**Focus**: Execution on 10 resort pages, then vanlife content 🎿
