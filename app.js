/**
 * Steal an Egg Wiki - Client Script
 * Direct, fast, factual, and offline-compatible.
 */

// Offline fallback datasets matching verified official data
const FALLBACK_BIOMES = [
  {
    "id": "forest",
    "name": "Forest",
    "speedReqFormatted": "0 (Starting)",
    "guardian": "Chicken",
    "topPet": "Brr Brr Patapim ($1.8K/s)",
    "petCount": 8,
    "pets": ["Chicken", "Dog", "Bird", "Owl", "Raccoon", "Fox", "Bear", "Brr Brr Patapim"]
  },
  {
    "id": "lake",
    "name": "Lake",
    "speedReqFormatted": "900 Speed",
    "guardian": "Swan",
    "topPet": "Leviathan ($12K/s)",
    "petCount": 8,
    "pets": ["Frog", "Duckling", "Catfish", "Turtle", "Trulimero Trulicina", "Swan", "Axolotl", "Leviathan"]
  },
  {
    "id": "desert",
    "name": "Desert",
    "speedReqFormatted": "10,000 Speed (10K)",
    "guardian": "Scorpion",
    "topPet": "Sand Spider ($16K/s)",
    "petCount": 8,
    "pets": ["Jerboa", "Fennec", "Camel", "Snake", "Tob Tobi Tob Tob", "Scorpion", "Royal Sphinx", "Sand Spider"]
  },
  {
    "id": "jungle",
    "name": "Jungle",
    "speedReqFormatted": "40,000 Speed (40K)",
    "guardian": "Tiger",
    "topPet": "Ancient Jaguar ($30K/s)",
    "petCount": 8,
    "pets": ["Chimpanzee", "Toucan", "Crocodile", "Gorilla", "Orangutini Ananassini", "Tiger", "Spider", "Ancient Jaguar"]
  },
  {
    "id": "snow",
    "name": "Snow",
    "speedReqFormatted": "170,000 Speed (170K)",
    "guardian": "Yeti",
    "topPet": "Ice Dragon ($65M/s)",
    "petCount": 8,
    "pets": ["Penguin", "Walrus", "Polar Bear", "Sabertooth Tiger", "Mammoth", "King Mammoth", "Yeti", "Ice Dragon"]
  },
  {
    "id": "volcano",
    "name": "Volcano",
    "speedReqFormatted": "700,000 Speed (700K)",
    "guardian": "Hellhound",
    "topPet": "Lava Dragon ($100M/s)",
    "petCount": 8,
    "pets": ["Lava Gecko", "Lava Frog", "Flaming Bull", "Lava Iguana", "Chillin Chilli", "Cerberus", "Phoenix", "Lava Dragon"]
  },
  {
    "id": "abyss-ocean",
    "name": "Abyss Ocean",
    "speedReqFormatted": "2,500,000 Speed (2.5M)",
    "guardian": "Moby",
    "topPet": "El Maja ($130M/s)",
    "petCount": 8,
    "pets": ["Parrotfish", "Swordfish", "Shark", "Orca", "Whale Shark", "Beluga Whale", "Kraken", "El Maja"]
  },
  {
    "id": "prehistoric",
    "name": "Prehistoric",
    "speedReqFormatted": "17,000,000 Speed (17M)",
    "guardian": "T-Rex",
    "topPet": "Mosasaurus ($180M/s)",
    "petCount": 8,
    "pets": ["Dodo", "Velociraptor", "Pterodactyl", "Ankylosaurus", "Triceratops", "Bronto", "Tyrannosaurus Rex", "Mosasaurus"]
  },
  {
    "id": "cosmic",
    "name": "Cosmic",
    "speedReqFormatted": "700,000,000 Speed (700M)",
    "guardian": "Dragon",
    "topPet": "Unicorn ($1B/s)",
    "petCount": 8,
    "pets": ["Centapede", "Cosmic Gecko", "Cosmic Gorilla", "La Vacca Saturno Saturnita", "Cosmic Skeleton Boss", "Cosmic Dragon", "Eternal Lunar Dragon", "Unicorn"]
  },
  {
    "id": "cherry-blossom",
    "name": "Cherry Blossom",
    "speedReqFormatted": "2,500,000,000 Speed (2.5B)",
    "guardian": "Nine-Tails Kitsune",
    "topPet": "Kitsune ($1.8B/s)",
    "petCount": 8,
    "pets": ["Crane", "Salamander", "Red Panda", "Snow Owl", "Koi", "Stag", "Oni Tiger", "Kitsune"]
  }
];

const FALLBACK_PETS = [
  { "id": "f01", "name": "Chicken", "biome": "forest", "rarity": "Common", "income": 1, "egg": "Common Egg" },
  { "id": "f02", "name": "Dog", "biome": "forest", "rarity": "Common", "income": 2, "egg": "Common Egg" },
  { "id": "f03", "name": "Bird", "biome": "forest", "rarity": "Uncommon", "income": 8, "egg": "Uncommon Egg" },
  { "id": "f04", "name": "Owl", "biome": "forest", "rarity": "Rare", "income": 35, "egg": "Rare Egg" },
  { "id": "f05", "name": "Raccoon", "biome": "forest", "rarity": "Rare", "income": 45, "egg": "Rare Egg" },
  { "id": "f06", "name": "Fox", "biome": "forest", "rarity": "Epic", "income": 180, "egg": "Epic Egg" },
  { "id": "f07", "name": "Bear", "biome": "forest", "rarity": "Epic", "income": 240, "egg": "Epic Egg" },
  { "id": "f08", "name": "Brr Brr Patapim", "biome": "forest", "rarity": "Legendary", "income": 1800, "egg": "Giant Nest" },

  { "id": "l01", "name": "Frog", "biome": "lake", "rarity": "Common", "income": 3, "egg": "Lake Egg" },
  { "id": "l02", "name": "Duckling", "biome": "lake", "rarity": "Common", "income": 4, "egg": "Lake Egg" },
  { "id": "l03", "name": "Catfish", "biome": "lake", "rarity": "Uncommon", "income": 12, "egg": "Lake Egg" },
  { "id": "l04", "name": "Turtle", "biome": "lake", "rarity": "Rare", "income": 60, "egg": "Lake Egg" },
  { "id": "l05", "name": "Trulimero Trulicina", "biome": "lake", "rarity": "Epic", "income": 260, "egg": "Lake Large Egg" },
  { "id": "l06", "name": "Swan", "biome": "lake", "rarity": "Epic", "income": 320, "egg": "Swan Nest" },
  { "id": "l07", "name": "Axolotl", "biome": "lake", "rarity": "Legendary", "income": 2800, "egg": "Deep Lake Egg" },
  { "id": "l08", "name": "Leviathan", "biome": "lake", "rarity": "Mythic", "income": 12000, "egg": "Sunken Lake Nest" },

  { "id": "d01", "name": "Jerboa", "biome": "desert", "rarity": "Common", "income": 6, "egg": "Desert Egg" },
  { "id": "d02", "name": "Fennec", "biome": "desert", "rarity": "Uncommon", "income": 18, "egg": "Desert Egg" },
  { "id": "d03", "name": "Camel", "biome": "desert", "rarity": "Rare", "income": 75, "egg": "Oasis Egg" },
  { "id": "d04", "name": "Snake", "biome": "desert", "rarity": "Rare", "income": 90, "egg": "Desert Egg" },
  { "id": "d05", "name": "Tob Tobi Tob Tob", "biome": "desert", "rarity": "Epic", "income": 380, "egg": "Ruin Egg" },
  { "id": "d06", "name": "Scorpion", "biome": "desert", "rarity": "Epic", "income": 450, "egg": "Scorpion Lair" },
  { "id": "d07", "name": "Royal Sphinx", "biome": "desert", "rarity": "Legendary", "income": 3500, "egg": "Pyramid Nest" },
  { "id": "d08", "name": "Sand Spider", "biome": "desert", "rarity": "Mythic", "income": 16000, "egg": "Dune Vault" },

  { "id": "j01", "name": "Chimpanzee", "biome": "jungle", "rarity": "Rare", "income": 90, "egg": "Jungle Egg" },
  { "id": "j02", "name": "Toucan", "biome": "jungle", "rarity": "Rare", "income": 110, "egg": "Jungle Egg" },
  { "id": "j03", "name": "Crocodile", "biome": "jungle", "rarity": "Epic", "income": 420, "egg": "Riverbed Egg" },
  { "id": "j04", "name": "Gorilla", "biome": "jungle", "rarity": "Legendary", "income": 4800, "egg": "Canopy Egg" },
  { "id": "j05", "name": "Orangutini Ananassini", "biome": "jungle", "rarity": "Legendary", "income": 5500, "egg": "Totem Nest" },
  { "id": "j06", "name": "Tiger", "biome": "jungle", "rarity": "Legendary", "income": 6200, "egg": "Tiger Lair" },
  { "id": "j07", "name": "Spider", "biome": "jungle", "rarity": "Mythic", "income": 22000, "egg": "Webbed Nest" },
  { "id": "j08", "name": "Ancient Jaguar", "biome": "jungle", "rarity": "Mythic", "income": 30000, "egg": "Temple Altar" },

  { "id": "s01", "name": "Penguin", "biome": "snow", "rarity": "Rare", "income": 140, "egg": "Ice Egg" },
  { "id": "s02", "name": "Walrus", "biome": "snow", "rarity": "Epic", "income": 600, "egg": "Ice Egg" },
  { "id": "s03", "name": "Polar Bear", "biome": "snow", "rarity": "Legendary", "income": 7000, "egg": "Glacier Nest" },
  { "id": "s04", "name": "Sabertooth Tiger", "biome": "snow", "rarity": "Mythic", "income": 35000, "egg": "Frozen Peak" },
  { "id": "s05", "name": "Mammoth", "biome": "snow", "rarity": "Mythic", "income": 42000, "egg": "Mammoth Nest" },
  { "id": "s06", "name": "King Mammoth", "biome": "snow", "rarity": "Cosmic", "income": 400000, "egg": "Glacier Core" },
  { "id": "s07", "name": "Yeti", "biome": "snow", "rarity": "Secret", "income": 5000000, "egg": "Yeti Cave" },
  { "id": "s08", "name": "Ice Dragon", "biome": "snow", "rarity": "Eternal", "income": 65000000, "egg": "Blizzard Altar" },

  { "id": "v01", "name": "Lava Gecko", "biome": "volcano", "rarity": "Rare", "income": 180, "egg": "Magma Egg" },
  { "id": "v02", "name": "Lava Frog", "biome": "volcano", "rarity": "Epic", "income": 850, "egg": "Magma Egg" },
  { "id": "v03", "name": "Flaming Bull", "biome": "volcano", "rarity": "Legendary", "income": 9500, "egg": "Cinder Nest" },
  { "id": "v04", "name": "Lava Iguana", "biome": "volcano", "rarity": "Legendary", "income": 11000, "egg": "Cinder Nest" },
  { "id": "v05", "name": "Chillin Chilli", "biome": "volcano", "rarity": "Mythic", "income": 55000, "egg": "Inferno Egg" },
  { "id": "v06", "name": "Cerberus", "biome": "volcano", "rarity": "Secret", "income": 8000000, "egg": "Hellhound Lair" },
  { "id": "v07", "name": "Phoenix", "biome": "volcano", "rarity": "Eternal", "income": 85000000, "egg": "Volcanic Core" },
  { "id": "v08", "name": "Lava Dragon", "biome": "volcano", "rarity": "Eternal", "income": 100000000, "egg": "Core Chamber" },

  { "id": "a01", "name": "Parrotfish", "biome": "abyss-ocean", "rarity": "Rare", "income": 220, "egg": "Abyss Egg" },
  { "id": "a02", "name": "Swordfish", "biome": "abyss-ocean", "rarity": "Epic", "income": 1200, "egg": "Abyss Egg" },
  { "id": "a03", "name": "Shark", "biome": "abyss-ocean", "rarity": "Legendary", "income": 14000, "egg": "Trench Egg" },
  { "id": "a04", "name": "Orca", "biome": "abyss-ocean", "rarity": "Mythic", "income": 75000, "egg": "Trench Egg" },
  { "id": "a05", "name": "Whale Shark", "biome": "abyss-ocean", "rarity": "Cosmic", "income": 650000, "egg": "Deep Trench" },
  { "id": "a06", "name": "Beluga Whale", "biome": "abyss-ocean", "rarity": "Cosmic", "income": 800000, "egg": "Deep Trench" },
  { "id": "a07", "name": "Kraken", "biome": "abyss-ocean", "rarity": "Secret", "income": 15000000, "egg": "Sunken Citadel" },
  { "id": "a08", "name": "El Maja", "biome": "abyss-ocean", "rarity": "Eternal", "income": 130000000, "egg": "Abyssal Heart" },

  { "id": "p01", "name": "Dodo", "biome": "prehistoric", "rarity": "Rare", "income": 300, "egg": "Fossil Egg" },
  { "id": "p02", "name": "Velociraptor", "biome": "prehistoric", "rarity": "Epic", "income": 1800, "egg": "Fossil Egg" },
  { "id": "p03", "name": "Pterodactyl", "biome": "prehistoric", "rarity": "Legendary", "income": 20000, "egg": "Cliff Nest" },
  { "id": "p04", "name": "Ankylosaurus", "biome": "prehistoric", "rarity": "Mythic", "income": 110000, "egg": "Amber Nest" },
  { "id": "p05", "name": "Triceratops", "biome": "prehistoric", "rarity": "Cosmic", "income": 1200000, "egg": "Dino Nest" },
  { "id": "p06", "name": "Bronto", "biome": "prehistoric", "rarity": "Cosmic", "income": 1500000, "egg": "Colossal Nest" },
  { "id": "p07", "name": "Tyrannosaurus Rex", "biome": "prehistoric", "rarity": "Secret", "income": 35000000, "egg": "Apex Rex Nest" },
  { "id": "p08", "name": "Mosasaurus", "biome": "prehistoric", "rarity": "Eternal", "income": 180000000, "egg": "Lagoon Vault" },

  { "id": "c01", "name": "Centapede", "biome": "cosmic", "rarity": "Epic", "income": 2500, "egg": "Nebula Egg" },
  { "id": "c02", "name": "Cosmic Gecko", "biome": "cosmic", "rarity": "Legendary", "income": 28000, "egg": "Nebula Egg" },
  { "id": "c03", "name": "Cosmic Gorilla", "biome": "cosmic", "rarity": "Mythic", "income": 150000, "egg": "Starlight Egg" },
  { "id": "c04", "name": "La Vacca Saturno Saturnita", "biome": "cosmic", "rarity": "Cosmic", "income": 2500000, "egg": "Saturn Ring Nest" },
  { "id": "c05", "name": "Cosmic Skeleton Boss", "biome": "cosmic", "rarity": "Secret", "income": 45000000, "egg": "Void Vault" },
  { "id": "c06", "name": "Cosmic Dragon", "biome": "cosmic", "rarity": "Secret", "income": 80000000, "egg": "Starlight Altar" },
  { "id": "c07", "name": "Eternal Lunar Dragon", "biome": "cosmic", "rarity": "Eternal", "income": 250000000, "egg": "Eclipse Core" },
  { "id": "c08", "name": "Unicorn", "biome": "cosmic", "rarity": "Divine", "income": 1000000000, "egg": "Genesis Egg" },

  { "id": "cb01", "name": "Crane", "biome": "cherry-blossom", "rarity": "Epic", "income": 3200, "egg": "Sakura Egg" },
  { "id": "cb02", "name": "Salamander", "biome": "cherry-blossom", "rarity": "Legendary", "income": 35000, "egg": "Sakura Egg" },
  { "id": "cb03", "name": "Red Panda", "biome": "cherry-blossom", "rarity": "Mythic", "income": 200000, "egg": "Shrine Egg" },
  { "id": "cb04", "name": "Snow Owl", "biome": "cherry-blossom", "rarity": "Cosmic", "income": 3500000, "egg": "Torii Gate Nest" },
  { "id": "cb05", "name": "Koi", "biome": "cherry-blossom", "rarity": "Cosmic", "income": 4200000, "egg": "Lotus Pond" },
  { "id": "cb06", "name": "Stag", "biome": "cherry-blossom", "rarity": "Secret", "income": 90000000, "egg": "Spirit Forest" },
  { "id": "cb07", "name": "Oni Tiger", "biome": "cherry-blossom", "rarity": "Eternal", "income": 350000000, "egg": "Sanctum Altar" },
  { "id": "cb08", "name": "Kitsune", "biome": "cherry-blossom", "rarity": "Divine", "income": 1800000000, "egg": "Divine Blossom Egg" },

  { "id": "br01", "name": "Bananita Dolphinita", "biome": "brainrot", "rarity": "Brainrot", "income": 100000, "egg": "Brainrot Store Egg" },
  { "id": "br02", "name": "Belula Beluga", "biome": "brainrot", "rarity": "Brainrot", "income": 500000, "egg": "Brainrot Store Egg" },
  { "id": "br03", "name": "Mangolini Parrochini", "biome": "brainrot", "rarity": "Brainrot", "income": 2000000, "egg": "Brainrot Store Egg" },
  { "id": "br04", "name": "Bomboclat Crocolat", "biome": "brainrot", "rarity": "Brainrot", "income": 10000000, "egg": "Brainrot Store Egg" },
  { "id": "br05", "name": "Strawberry Elephant", "biome": "brainrot", "rarity": "Brainrot", "income": 50000000, "egg": "Brainrot Store Egg" },
  { "id": "br06", "name": "Skibidi Toilet Pet", "biome": "brainrot", "rarity": "Brainrot", "income": 250000000, "egg": "Brainrot Store Egg" }
];

let biomes = FALLBACK_BIOMES;
let pets = FALLBACK_PETS;

// Currency Formatter
function fmt(num) {
  if (num === null || num === undefined) return '$0';
  const n = Number(num);
  if (n < 1000) return `$${n}/s`;
  if (n < 1e6) return `$${(n / 1e3).toFixed(1)}K/s`;
  if (n < 1e9) return `$${(n / 1e6).toFixed(1)}M/s`;
  if (n < 1e12) return `$${(n / 1e9).toFixed(1)}B/s`;
  return `$${(n / 1e12).toFixed(1)}T/s`;
}

document.addEventListener('DOMContentLoaded', async () => {
  // Try fetching JSON if on web server
  try {
    const bRes = await fetch('data/biomes.json');
    if (bRes.ok) biomes = await bRes.json();
  } catch (e) {}

  try {
    const pRes = await fetch('data/pets.json');
    if (pRes.ok) pets = await pRes.json();
  } catch (e) {}

  initTheme();
  initTabs();
  renderBiomes();
  renderPets();
  initCalculator();
});

// Theme switcher
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const icon = document.getElementById('themeIcon');
  const saved = localStorage.getItem('sae_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  if (icon) icon.textContent = saved === 'dark' ? '🌓' : '☀️';

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sae_theme', next);
      if (icon) icon.textContent = next === 'dark' ? '🌓' : '☀️';
    });
  }
}

// Navigation Tabs
function initTabs() {
  const tabs = document.querySelectorAll('.tab-link');
  const panels = document.querySelectorAll('.tab-panel');

  function showTab(id) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === id));
    panels.forEach(p => p.classList.toggle('active', p.id === `panel-${id}`));
    window.location.hash = id;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => showTab(tab.dataset.tab));
  });

  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(`panel-${hash}`)) {
    showTab(hash);
  }
}

// Render Biomes Table & Cards
function renderBiomes() {
  const tbody = document.getElementById('biomesTableBody');
  const grid = document.getElementById('biomesCardsGrid');

  if (tbody) {
    tbody.innerHTML = biomes.map(b => `
      <tr>
        <td><strong>${b.name}</strong></td>
        <td><code>${b.speedReqFormatted}</code></td>
        <td>${b.guardian}</td>
        <td><strong>${b.topPet}</strong></td>
        <td>${b.petCount || 8}</td>
      </tr>
    `).join('');
  }

  if (grid) {
    grid.innerHTML = biomes.map(b => `
      <div class="biome-box">
        <div class="biome-box-header">
          <span class="biome-name">${b.name}</span>
          <span class="biome-speed">⚡ ${b.speedReqFormatted}</span>
        </div>
        <div class="biome-meta">
          <div>Guardian: <strong>${b.guardian}</strong></div>
          <div>Top Pet: <strong>${b.topPet}</strong></div>
        </div>
        <div class="biome-pet-list">
          Pets: ${b.pets ? b.pets.join(', ') : '8 Unique Pets'}
        </div>
      </div>
    `).join('');
  }
}

// Render Pets Table
function renderPets() {
  const tbody = document.getElementById('petsTableBody');
  const countEl = document.getElementById('petFilterCount');
  const searchInput = document.getElementById('petSearchInput');
  const biomeFilter = document.getElementById('biomeSelectFilter');
  const rarityFilter = document.getElementById('raritySelectFilter');

  function update() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const b = biomeFilter?.value || 'all';
    const r = rarityFilter?.value || 'all';

    const filtered = pets.filter(p => {
      const matchBiome = b === 'all' || p.biome.toLowerCase() === b.toLowerCase();
      const matchRarity = r === 'all' || p.rarity.toLowerCase() === r.toLowerCase();
      const matchQuery = !q || 
        p.name.toLowerCase().includes(q) ||
        p.biome.toLowerCase().includes(q) ||
        p.rarity.toLowerCase().includes(q) ||
        p.egg.toLowerCase().includes(q);

      return matchBiome && matchRarity && matchQuery;
    });

    if (countEl) countEl.textContent = filtered.length;

    if (tbody) {
      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: var(--text-dim);">No pets found.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map(p => `
        <tr>
          <td><strong>${p.name}</strong></td>
          <td><code style="text-transform: capitalize;">${p.biome.replace('-', ' ')}</code></td>
          <td><span class="badge-rarity rarity-${p.rarity}">${p.rarity}</span></td>
          <td><strong>${fmt(p.income)}</strong></td>
          <td>${p.egg}</td>
        </tr>
      `).join('');
    }
  }

  if (searchInput) searchInput.addEventListener('input', update);
  if (biomeFilter) biomeFilter.addEventListener('change', update);
  if (rarityFilter) rarityFilter.addEventListener('change', update);

  update();
}

// Calculator Logic
function initCalculator() {
  const petSelect = document.getElementById('calcPet');
  const sizeSelect = document.getElementById('calcSize');
  const mutSelect = document.getElementById('calcMutation');
  const countInput = document.getElementById('calcCount');
  const totalEl = document.getElementById('calcTotal');
  const minEl = document.getElementById('calcMin');
  const hourEl = document.getElementById('calcHour');

  if (!petSelect) return;

  const sorted = [...pets].sort((a, b) => a.income - b.income);
  petSelect.innerHTML = sorted.map(p => `
    <option value="${p.id}">${p.name} (${p.rarity} - ${fmt(p.income)})</option>
  `).join('');

  // Default to a solid mid-tier pet
  const def = sorted.find(p => p.name === 'Bronto') || sorted[0];
  if (def) petSelect.value = def.id;

  function calc() {
    const pet = pets.find(p => p.id === petSelect.value);
    if (!pet) return;

    const base = Number(pet.income) || 0;
    const size = Number(sizeSelect.value) || 1;
    const mut = Number(mutSelect.value) || 1;
    const count = Math.max(1, parseInt(countInput.value) || 1);

    const perSec = base * size * mut * count;
    const perMin = perSec * 60;
    const perHour = perSec * 3600;

    if (totalEl) totalEl.textContent = fmt(perSec);
    if (minEl) minEl.textContent = fmt(perMin).replace('/s', '/min');
    if (hourEl) hourEl.textContent = fmt(perHour).replace('/s', '/hr');
  }

  petSelect.addEventListener('change', calc);
  sizeSelect.addEventListener('change', calc);
  mutSelect.addEventListener('change', calc);
  countInput.addEventListener('input', calc);

  calc();
}
