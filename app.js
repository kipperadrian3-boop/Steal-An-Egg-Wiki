/**
 * Steal an Egg Wiki (Roblox)
 * Full Interactive Engine: Sorting, Search, Grid/Table Toggle & Calculator.
 */

// 100% Verified in-game datasets
const FALLBACK_BIOMES = [
  { "name": "Forest", "speed": 0, "speedFormatted": "0 Speed (Start)", "guardian": "Chicken", "topPet": "Brr Brr Patapim ($1.8K/s)" },
  { "name": "Lake", "speed": 900, "speedFormatted": "900 Speed", "guardian": "Swan", "topPet": "Leviathan ($12K/s)" },
  { "name": "Desert", "speed": 10000, "speedFormatted": "10K Speed", "guardian": "Scorpion", "topPet": "Sand Spider ($16K/s)" },
  { "name": "Jungle", "speed": 40000, "speedFormatted": "40K Speed", "guardian": "Tiger", "topPet": "Spider ($22K/s)" },
  { "name": "Snow", "speed": 170000, "speedFormatted": "170K Speed", "guardian": "Yeti", "topPet": "Ice Dragon ($65M/s)" },
  { "name": "Volcano", "speed": 700000, "speedFormatted": "700K Speed", "guardian": "Hellhound", "topPet": "Lava Dragon ($100M/s)" },
  { "name": "Abyss Ocean", "speed": 2500000, "speedFormatted": "2.5M Speed", "guardian": "Moby", "topPet": "El Maja ($130M/s)" },
  { "name": "Prehistoric", "speed": 17000000, "speedFormatted": "17M Speed", "guardian": "T-Rex", "topPet": "Mosasaurus ($180M/s)" },
  { "name": "Cosmic", "speed": 700000000, "speedFormatted": "700M Speed", "guardian": "Dragon", "topPet": "Unicorn ($1B/s)" },
  { "name": "Cherry Blossom", "speed": 2500000000, "speedFormatted": "2.5B Speed", "guardian": "Nine-Tails Kitsune", "topPet": "Kitsune ($1.8B/s)" }
];

const FALLBACK_PETS = [
  { "id": "p01", "name": "Chicken", "biome": "Forest", "rarity": "Common", "income": 1 },
  { "id": "p02", "name": "Dog", "biome": "Forest", "rarity": "Common", "income": 2 },
  { "id": "p03", "name": "Frog", "biome": "Lake", "rarity": "Common", "income": 3 },
  { "id": "p04", "name": "Duckling", "biome": "Lake", "rarity": "Common", "income": 4 },
  { "id": "p05", "name": "Jerboa", "biome": "Desert", "rarity": "Common", "income": 6 },
  { "id": "p06", "name": "Bird", "biome": "Forest", "rarity": "Uncommon", "income": 8 },
  { "id": "p07", "name": "Catfish", "biome": "Lake", "rarity": "Uncommon", "income": 12 },
  { "id": "p08", "name": "Fennec", "biome": "Desert", "rarity": "Uncommon", "income": 18 },
  { "id": "p09", "name": "Owl", "biome": "Forest", "rarity": "Rare", "income": 35 },
  { "id": "p10", "name": "Raccoon", "biome": "Forest", "rarity": "Rare", "income": 45 },
  { "id": "p11", "name": "Turtle", "biome": "Lake", "rarity": "Rare", "income": 60 },
  { "id": "p12", "name": "Camel", "biome": "Desert", "rarity": "Rare", "income": 75 },
  { "id": "p13", "name": "Chimpanzee", "biome": "Jungle", "rarity": "Rare", "income": 90 },
  { "id": "p14", "name": "Snake", "biome": "Desert", "rarity": "Rare", "income": 90 },
  { "id": "p15", "name": "Toucan", "biome": "Jungle", "rarity": "Rare", "income": 110 },
  { "id": "p16", "name": "Penguin", "biome": "Snow", "rarity": "Rare", "income": 140 },
  { "id": "p17", "name": "Fox", "biome": "Forest", "rarity": "Epic", "income": 180 },
  { "id": "p18", "name": "Lava Gecko", "biome": "Volcano", "rarity": "Rare", "income": 180 },
  { "id": "p19", "name": "Parrotfish", "biome": "Abyss Ocean", "rarity": "Rare", "income": 220 },
  { "id": "p20", "name": "Bear", "biome": "Forest", "rarity": "Epic", "income": 240 },
  { "id": "p21", "name": "Trulimero Trulicina", "biome": "Lake", "rarity": "Epic", "income": 260 },
  { "id": "p22", "name": "Dodo", "biome": "Prehistoric", "rarity": "Rare", "income": 280 },
  { "id": "p23", "name": "Swan", "biome": "Lake", "rarity": "Epic", "income": 320 },
  { "id": "p24", "name": "Tob Tobi Tob Tob", "biome": "Desert", "rarity": "Epic", "income": 380 },
  { "id": "p25", "name": "Crocodile", "biome": "Jungle", "rarity": "Epic", "income": 420 },
  { "id": "p26", "name": "Scorpion", "biome": "Desert", "rarity": "Epic", "income": 450 },
  { "id": "p27", "name": "Walrus", "biome": "Snow", "rarity": "Epic", "income": 600 },
  { "id": "p28", "name": "Lava Frog", "biome": "Volcano", "rarity": "Epic", "income": 850 },
  { "id": "p29", "name": "Swordfish", "biome": "Abyss Ocean", "rarity": "Epic", "income": 1100 },
  { "id": "p30", "name": "Centipede", "biome": "Cosmic", "rarity": "Epic", "income": 1500 },
  { "id": "p31", "name": "Brr Brr Patapim", "biome": "Forest", "rarity": "Legendary", "income": 1800 },
  { "id": "p32", "name": "Velociraptor", "biome": "Prehistoric", "rarity": "Epic", "income": 1800 },
  { "id": "p33", "name": "Axolotl", "biome": "Lake", "rarity": "Legendary", "income": 2800 },
  { "id": "p34", "name": "Crane", "biome": "Cherry Blossom", "rarity": "Epic", "income": 3200 },
  { "id": "p35", "name": "Royal Sphinx", "biome": "Desert", "rarity": "Legendary", "income": 3500 },
  { "id": "p36", "name": "Gorilla", "biome": "Jungle", "rarity": "Legendary", "income": 4800 },
  { "id": "p37", "name": "Orangutini Ananassini", "biome": "Jungle", "rarity": "Legendary", "income": 5500 },
  { "id": "p38", "name": "Tiger", "biome": "Jungle", "rarity": "Legendary", "income": 6200 },
  { "id": "p39", "name": "Polar Bear", "biome": "Snow", "rarity": "Legendary", "income": 7000 },
  { "id": "p40", "name": "Flaming Bull", "biome": "Volcano", "rarity": "Legendary", "income": 9500 },
  { "id": "p41", "name": "Lava Iguana", "biome": "Volcano", "rarity": "Legendary", "income": 11000 },
  { "id": "p42", "name": "Leviathan", "biome": "Lake", "rarity": "Mythic", "income": 12000 },
  { "id": "p43", "name": "Shark", "biome": "Abyss Ocean", "rarity": "Legendary", "income": 15000 },
  { "id": "p44", "name": "Sand Spider", "biome": "Desert", "rarity": "Mythic", "income": 16000 },
  { "id": "p45", "name": "Pterodactyl", "biome": "Prehistoric", "rarity": "Legendary", "income": 22000 },
  { "id": "p46", "name": "Spider", "biome": "Jungle", "rarity": "Mythic", "income": 22000 },
  { "id": "p47", "name": "Cosmic Gecko", "biome": "Cosmic", "rarity": "Legendary", "income": 30000 },
  { "id": "p48", "name": "Sabertooth Tiger", "biome": "Snow", "rarity": "Mythic", "income": 35000 },
  { "id": "p49", "name": "Salamander", "biome": "Cherry Blossom", "rarity": "Legendary", "income": 35000 },
  { "id": "p50", "name": "Mammoth", "biome": "Snow", "rarity": "Mythic", "income": 42000 },
  { "id": "p51", "name": "Chillin Chilli", "biome": "Volcano", "rarity": "Mythic", "income": 55000 },
  { "id": "p52", "name": "Orca", "biome": "Abyss Ocean", "rarity": "Mythic", "income": 80000 },
  { "id": "p53", "name": "Ankylosaurus", "biome": "Prehistoric", "rarity": "Mythic", "income": 110000 },
  { "id": "p54", "name": "Cosmic Gorilla", "biome": "Cosmic", "rarity": "Mythic", "income": 180000 },
  { "id": "p55", "name": "Red Panda", "biome": "Cherry Blossom", "rarity": "Mythic", "income": 200000 },
  { "id": "p56", "name": "King Mammoth", "biome": "Snow", "rarity": "Cosmic", "income": 400000 },
  { "id": "p57", "name": "Whale Shark", "biome": "Abyss Ocean", "rarity": "Cosmic", "income": 700000 },
  { "id": "p58", "name": "Beluga Whale", "biome": "Abyss Ocean", "rarity": "Cosmic", "income": 850000 },
  { "id": "p59", "name": "Tralaledon", "biome": "Prehistoric", "rarity": "Secret", "income": 850000 },
  { "id": "p60", "name": "Triceratops", "biome": "Prehistoric", "rarity": "Cosmic", "income": 1200000 },
  { "id": "p61", "name": "Bronto", "biome": "Prehistoric", "rarity": "Cosmic", "income": 1500000 },
  { "id": "p62", "name": "Snow Owl", "biome": "Cherry Blossom", "rarity": "Cosmic", "income": 3500000 },
  { "id": "p63", "name": "Koi", "biome": "Cherry Blossom", "rarity": "Cosmic", "income": 4200000 },
  { "id": "p64", "name": "Yeti", "biome": "Snow", "rarity": "Secret", "income": 5000000 },
  { "id": "p65", "name": "Cerberus", "biome": "Volcano", "rarity": "Secret", "income": 8000000 },
  { "id": "p66", "name": "Kraken", "biome": "Abyss Ocean", "rarity": "Secret", "income": 15000000 },
  { "id": "p67", "name": "T-Rex", "biome": "Prehistoric", "rarity": "Secret", "income": 25000000 },
  { "id": "p68", "name": "Cosmic Skeleton Boss", "biome": "Cosmic", "rarity": "Secret", "income": 45000000 },
  { "id": "p69", "name": "Ice Dragon", "biome": "Snow", "rarity": "Eternal", "income": 65000000 },
  { "id": "p70", "name": "Phoenix", "biome": "Volcano", "rarity": "Eternal", "income": 85000000 },
  { "id": "p71", "name": "Stag", "biome": "Cherry Blossom", "rarity": "Secret", "income": 90000000 },
  { "id": "p72", "name": "Lava Dragon", "biome": "Volcano", "rarity": "Eternal", "income": 100000000 },
  { "id": "p73", "name": "El Maja", "biome": "Abyss Ocean", "rarity": "Eternal", "income": 130000000 },
  { "id": "p74", "name": "Mosasaurus", "biome": "Prehistoric", "rarity": "Eternal", "income": 180000000 },
  { "id": "p75", "name": "Eternal Lunar Dragon", "biome": "Cosmic", "rarity": "Eternal", "income": 250000000 },
  { "id": "p76", "name": "Oni Tiger", "biome": "Cherry Blossom", "rarity": "Eternal", "income": 350000000 },
  { "id": "p77", "name": "Unicorn", "biome": "Cosmic", "rarity": "Divine", "income": 1000000000 },
  { "id": "p78", "name": "Kitsune", "biome": "Cherry Blossom", "rarity": "Divine", "income": 1800000000 },
  
  { "id": "b01", "name": "Bananita Dolphinita", "biome": "Brainrot Store", "rarity": "Brainrot", "income": 100000 },
  { "id": "b02", "name": "Belula Beluga", "biome": "Brainrot Store", "rarity": "Brainrot", "income": 500000 },
  { "id": "b03", "name": "Mangolini Parrochini", "biome": "Brainrot Store", "rarity": "Brainrot", "income": 2000000 },
  { "id": "b04", "name": "Bomboclat Crocolat", "biome": "Brainrot Store", "rarity": "Brainrot", "income": 10000000 },
  { "id": "b05", "name": "Strawberry Elephant", "biome": "Brainrot Store", "rarity": "Brainrot", "income": 50000000 }
];

let biomes = FALLBACK_BIOMES;
let pets = FALLBACK_PETS;
let sortAscending = true; // Wenig -> Viel
let activeView = 'grid'; // 'grid' or 'table'

// Compact Currency Formatter
function formatMoney(amount) {
  const n = Number(amount) || 0;
  if (n < 1000) return `$${n}/s`;
  if (n < 1e6) return `$${(n / 1e3).toFixed(1)}K/s`;
  if (n < 1e9) return `$${(n / 1e6).toFixed(1)}M/s`;
  if (n < 1e12) return `$${(n / 1e9).toFixed(1)}B/s`;
  return `$${(n / 1e12).toFixed(1)}T/s`;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const bRes = await fetch('data/biomes.json');
    if (bRes.ok) biomes = await bRes.json();
  } catch (e) {}

  try {
    const pRes = await fetch('data/pets.json');
    if (pRes.ok) pets = await pRes.json();
  } catch (e) {}

  const bBadge = document.getElementById('biomeCountBadge');
  const pBadge = document.getElementById('petCountBadge');
  if (bBadge) bBadge.textContent = biomes.length;
  if (pBadge) pBadge.textContent = pets.length;

  initTheme();
  initTabs();
  initViewToggle();
  renderBiomes();
  renderPets();
  initCalculator();
});

// Theme Toggle
function initTheme() {
  const btn = document.getElementById('themeToggleBtn');
  const icon = document.getElementById('themeIcon');
  const saved = localStorage.getItem('sae_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  if (icon) icon.textContent = saved === 'dark' ? '🌓' : '☀️';

  if (btn) {
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sae_theme', next);
      if (icon) icon.textContent = next === 'dark' ? '🌓' : '☀️';
    });
  }
}

// Tabs
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  function activateTab(tabId) {
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    panes.forEach(p => p.classList.toggle('active', p.id === `pane-${tabId}`));
    window.location.hash = tabId;
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  const currentHash = window.location.hash.replace('#', '');
  if (currentHash && document.getElementById(`pane-${currentHash}`)) {
    activateTab(currentHash);
  }
}

// View Toggle (Cards vs Table)
function initViewToggle() {
  const gridBtn = document.getElementById('viewGridBtn');
  const tblBtn = document.getElementById('viewTableBtn');
  const cardsView = document.getElementById('petsCardsView');
  const tblView = document.getElementById('petsTableView');

  if (gridBtn && tblBtn) {
    gridBtn.addEventListener('click', () => {
      activeView = 'grid';
      gridBtn.classList.add('active');
      tblBtn.classList.remove('active');
      if (cardsView) cardsView.style.display = 'grid';
      if (tblView) tblView.style.display = 'none';
    });

    tblBtn.addEventListener('click', () => {
      activeView = 'table';
      tblBtn.classList.add('active');
      gridBtn.classList.remove('active');
      if (cardsView) cardsView.style.display = 'none';
      if (tblView) tblView.style.display = 'block';
    });
  }
}

// Render Biomes
function renderBiomes() {
  const container = document.getElementById('biomesContainer');
  if (!container) return;

  container.innerHTML = biomes.map((b, idx) => `
    <div class="biome-card">
      <div class="biome-header">
        <span class="biome-title">${idx + 1}. ${b.name}</span>
        <span class="speed-tag">⚡ ${b.speedFormatted}</span>
      </div>
      <div class="biome-detail">
        Guardian: <strong>${b.guardian}</strong>
      </div>
      <div class="biome-detail">
        Top Pet: <strong>${b.topPet}</strong>
      </div>
    </div>
  `).join('');
}

// Render Pets (Sorted Low -> High)
function renderPets() {
  const cardsContainer = document.getElementById('petsCardsView');
  const tableBody = document.getElementById('petsTableBody');
  const filterCount = document.getElementById('filterCount');
  const searchInput = document.getElementById('searchInput');
  const biomeSelect = document.getElementById('biomeSelect');
  const raritySelect = document.getElementById('raritySelect');
  const sortBtn = document.getElementById('sortToggleBtn');
  const sortIcon = document.getElementById('sortIcon');
  const sortText = document.getElementById('sortText');

  function update() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const biome = biomeSelect?.value || 'all';
    const rarity = raritySelect?.value || 'all';

    let list = pets.filter(p => {
      const matchBiome = biome === 'all' || p.biome === biome;
      const matchRarity = rarity === 'all' || p.rarity === rarity;
      const matchQuery = !query || 
        p.name.toLowerCase().includes(query) ||
        p.biome.toLowerCase().includes(query) ||
        p.rarity.toLowerCase().includes(query);

      return matchBiome && matchRarity && matchQuery;
    });

    // Sort by income (Default: Low -> High)
    list.sort((a, b) => sortAscending ? (a.income - b.income) : (b.income - a.income));

    if (filterCount) filterCount.textContent = list.length;

    // Render Cards View
    if (cardsContainer) {
      if (list.length === 0) {
        cardsContainer.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 32px; color: var(--text-dim);">
            Keine Pets für diesen Filter gefunden.
          </div>
        `;
      } else {
        cardsContainer.innerHTML = list.map((p, idx) => `
          <div class="pet-card">
            <div class="pet-card-header">
              <div>
                <span class="pet-number">#${idx + 1}</span>
                <div class="pet-name">${p.name}</div>
                <div class="pet-biome-pill">📍 ${p.biome}</div>
              </div>
              <span class="badge-rarity rarity-${p.rarity}">${p.rarity}</span>
            </div>

            <div class="pet-income-banner">
              <span class="pet-income-label">Verdienst</span>
              <span class="pet-income-val">${formatMoney(p.income)}</span>
            </div>
          </div>
        `).join('');
      }
    }

    // Render Table View
    if (tableBody) {
      if (list.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-dim);">Keine Pets gefunden.</td></tr>`;
      } else {
        tableBody.innerHTML = list.map((p, idx) => `
          <tr>
            <td style="color: var(--text-dim); font-family: var(--font-mono);">${idx + 1}</td>
            <td><strong>${p.name}</strong></td>
            <td><code>${p.biome}</code></td>
            <td><span class="badge-rarity rarity-${p.rarity}">${p.rarity}</span></td>
            <td style="text-align: right; font-family: var(--font-mono); font-weight: 700; color: var(--text-main);">${formatMoney(p.income)}</td>
          </tr>
        `).join('');
      }
    }
  }

  if (searchInput) searchInput.addEventListener('input', update);
  if (biomeSelect) biomeSelect.addEventListener('change', update);
  if (raritySelect) raritySelect.addEventListener('change', update);

  if (sortBtn) {
    sortBtn.addEventListener('click', () => {
      sortAscending = !sortAscending;
      if (sortIcon) sortIcon.textContent = sortAscending ? '▲' : '▼';
      if (sortText) sortText.textContent = sortAscending ? 'Wenig ➔ Viel' : 'Viel ➔ Wenig';
      update();
    });
  }

  update();
}

// Income Calculator
function initCalculator() {
  const petSelect = document.getElementById('calcPetSelect');
  const sizeSelect = document.getElementById('calcSizeSelect');
  const mutSelect = document.getElementById('calcMutSelect');
  const countInput = document.getElementById('calcCountInput');
  const totalDisplay = document.getElementById('calcTotalDisplay');
  const minDisplay = document.getElementById('calcMinDisplay');
  const hourDisplay = document.getElementById('calcHourDisplay');

  if (!petSelect) return;

  // Sorted low to high
  const sorted = [...pets].sort((a, b) => a.income - b.income);
  petSelect.innerHTML = sorted.map(p => `
    <option value="${p.id}">${p.name} (${p.rarity} — ${formatMoney(p.income)})</option>
  `).join('');

  // Default to a solid mid-tier pet
  const defaultPet = sorted.find(p => p.name === 'Brr Brr Patapim') || sorted[0];
  if (defaultPet) petSelect.value = defaultPet.id;

  function calculate() {
    const selected = pets.find(p => p.id === petSelect.value);
    if (!selected) return;

    const base = Number(selected.income) || 0;
    const size = Number(sizeSelect.value) || 1;
    const mut = Number(mutSelect.value) || 1;
    const count = Math.max(1, parseInt(countInput.value) || 1);

    const perSec = base * size * mut * count;
    const perMin = perSec * 60;
    const perHour = perSec * 3600;

    if (totalDisplay) totalDisplay.textContent = formatMoney(perSec);
    if (minDisplay) minDisplay.textContent = formatMoney(perMin).replace('/s', '/min');
    if (hourDisplay) hourDisplay.textContent = formatMoney(perHour).replace('/s', '/hr');
  }

  petSelect.addEventListener('change', calculate);
  sizeSelect.addEventListener('change', calculate);
  mutSelect.addEventListener('change', calculate);
  countInput.addEventListener('input', calculate);

  calculate();
}
