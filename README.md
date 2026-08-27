# 🥚 Steal an Egg (Roblox) — Official Community Wiki & Database

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)
[![Theme: Monochrome B&W](https://img.shields.io/badge/Theme-Monochrome%20B%26W-09090b.svg)](#design-philosophy)
[![Roblox Version: Sakura Update](https://img.shields.io/badge/Roblox-Steal%20an%20Egg%20v1.4.2-white.svg)](https://www.roblox.com)

An ultra-modern, responsive, high-contrast **Black & White / Monochrome** Wiki and Database for the popular Roblox experience **Steal an Egg**.

---

## 🚀 Features

- **📖 Complete Gameplay Guides**: Detailed breakdown of the core stealing loop, egg hatching mechanics, 5-minute world resets, and Saturday Admin Abuse events.
- **🗺️ Biomes & Guardians Explorer**: Full data for all 10 explorable zones (Forest, Lake, Desert, Jungle, Snow, Volcano, Abyss Ocean, Prehistoric, Cosmic, and Cherry Blossom) including speed requirements and guardian hazard warnings.
- **🥚 Interactive Pet & Egg Database**: Comprehensive database containing 80+ pets across all 10 rarity tiers (Common to Divine & Brainrot Store) with real-time search, category filters, and detailed modal inspection.
- **⚡ Mutations & Sakura Incubator**: Multiplier guides for Silver (1.25x), Bloom (1.5x), Golden (2x), Rainbow (2.5x), and Spirit Bloom (3x).
- **🏏 Weapons, Base & Speed Upgrades**: PvP bat mechanics, pen expansion perks, and treadmill speed formulas.
- **🧮 Interactive Multiplier Calculator**: Calculate exact passive cash-per-second (`$/s`, `$/m`, `$/hr`) based on base income, egg size multiplier, mutations, and duplicate pet stacks.
- **🎁 Promo Codes & Events Tracker**: Real-time status tracker on in-game codes with warning guidance against phishing scams.
- **🌐 Open Source & REST JSON Endpoints**: Direct access to `data/biomes.json` and `data/pets.json` for community developers.

---

## 🖥️ Live GitHub Pages Deployment

To enable GitHub Pages for this repository:
1. Open this repository on GitHub: [https://github.com/kipperadrian3-boop/Steal-An-Egg-Wiki](https://github.com/kipperadrian3-boop/Steal-An-Egg-Wiki)
2. Go to **Settings** > **Pages**
3. Under **Branch**, select `main` (root `/`) and click **Save**.
4. Your website will be live at:
   👉 **`https://kipperadrian3-boop.github.io/Steal-An-Egg-Wiki/`**

---

## 📂 Project Structure

```
Steal-An-Egg-Wiki/
├── index.html          # Semantic HTML5 Wiki application
├── style.css           # Custom responsive B&W design system & animations
├── app.js              # Tab router, interactive search, filters, calculator, pet index
├── data/
│   ├── pets.json       # Structured pet stats, rarities, biomes, income
│   └── biomes.json     # Biome metadata, speed requirements, guardians
├── README.md           # Documentation, GitHub Pages deployment guide
├── LICENSE             # MIT Open Source License
└── .gitignore          # Git exclusion rules
```

---

## 🎨 Design Philosophy

Built with a sleek, minimalist **Monochrome / Black & White** aesthetic inspired by modern tech documentation (Obsidian, JetBrains Mono, Inter, Space Grotesk). Fast, zero dependencies, accessible, and lightweight.

---

## 🤝 Contributing

Contributions are welcome! If new pets, biomes, or balance patches are released in Roblox *Steal an Egg*:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewPetsUpdate`)
3. Update `data/pets.json` or `data/biomes.json`
4. Commit your Changes (`git commit -m 'Add new Cherry Blossom pets'`)
5. Push to the Branch (`git push origin feature/NewPetsUpdate`)
6. Open a Pull Request

---

## ⚖️ License & Disclaimer

Distributed under the **MIT License**. See `LICENSE` for more information.

*Disclaimer: Steal an Egg Wiki is an independent community project and is not affiliated with or endorsed by Roblox Corporation.*
