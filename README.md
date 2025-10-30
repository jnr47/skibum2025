[README.md](https://github.com/user-attachments/files/23245623/README.md)
# 🎿 SkiBum.com

**Live snowfall tracking for ski resorts across North America**

[![Live Site](https://img.shields.io/badge/Live-skibum.com-blue)](https://skibum.com)
[![Status](https://img.shields.io/badge/Status-Active%20Development-yellow)]()

---

## 🌨️ What is SkiBum?

SkiBum is an interactive map that shows real-time snowfall data for 100+ ski resorts. See where the powder fell overnight with color-coded markers showing snowfall intensity from the last 24 hours, 7 days, and full season totals.

**🔗 Visit**: [skibum.com](https://skibum.com)

---

## ✨ Features

- 🗺️ **Interactive Map** - Dark-themed globe view with smooth navigation
- 🎯 **100+ Resorts** - Covering US and Canadian ski destinations
- 🌡️ **Real-Time Data** - Powered by NOAA weather APIs (free government data!)
- 🎨 **Color-Coded Markers** - Instantly see light dustings vs. epic powder dumps
- 📊 **Detailed Stats** - 24hr, 7-day, and season accumulation for each resort
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

---

## 🏔️ Resort Coverage

**Current**: 100 resorts across:
- Colorado (Vail, Aspen, Breckenridge, etc.)
- Utah (Park City, Alta, Snowbird, etc.)
- California (Mammoth, Heavenly, Squaw Valley, etc.)
- Canada (Whistler, Banff, Lake Louise, etc.)
- And more across North America

**Coming Soon**: European Alps, Japan, South America

---

## 🛠️ Tech Stack

- **Frontend**: React + Mapbox GL JS (single-page app)
- **API**: Cloudflare Workers + NOAA APIs
- **Hosting**: Cloudflare Pages
- **Data Source**: NOAA National Weather Service (free!)
- **Caching**: Cloudflare KV Storage

---

## 📁 Project Structure

```
skibum2025/
├── README.md          # This file
├── PROJECT.md         # Comprehensive technical documentation
└── index.html         # Complete React application
```

---

## 🚀 Development Status

**Current Phase**: NOAA API Integration

We're actively building the real-time data pipeline using free NOAA weather APIs. The site is live and functional with 100 resort markers - we're now connecting it to live snowfall data.

See [PROJECT.md](PROJECT.md) for detailed technical documentation, roadmap, and development guide.

---

## 🌟 Roadmap

### Phase 1 (Current)
- ✅ Interactive map with 100 resorts
- ✅ Cloudflare infrastructure deployed
- 🔄 NOAA API integration (in progress)

### Phase 2
- 📝 Curated content (top runs, restaurants, hotels)
- 🎨 Logo and branding
- 📊 7-day forecast visualization

### Phase 3
- 🌍 Geographic expansion (Europe, Asia, South America)
- 📈 Historical data and trends
- 🔔 Powder alerts
- 👤 User accounts and preferences

---

## 📊 Data Sources

All weather data is provided free by:
- **NOAA National Weather Service** - 7-day forecasts and current conditions
- **NOAA NCEI** - Historical snowfall records and season totals

---

## 🤝 Contributing

This is currently a solo project, but suggestions and feedback are welcome! Feel free to open an issue with ideas, bug reports, or feature requests.

---

## 📄 License

All rights reserved. This is a personal project.

---

## 📧 Contact

**Project Owner**: Jeffrey Rubens  
**GitHub**: [@jnr47](https://github.com/jnr47)  
**Website**: [skibum.com](https://skibum.com)

---

## 🎯 Quick Links

- **Live Site**: [skibum.com](https://skibum.com)
- **Technical Docs**: [PROJECT.md](PROJECT.md)
- **Cloudflare Worker**: [API Status](https://skibum-worker.jnrubens.workers.dev)

---

**Built with ❄️ for powder seekers everywhere**
