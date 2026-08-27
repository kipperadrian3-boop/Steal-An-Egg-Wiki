/**
 * Steal an Egg Wiki - Main Application Logic
 * Supports deep linking, instant search, dynamic filters, responsive tabs,
 * offline/file:// embedded fallback data, and interactive income calculator.
 */

// Embedded fallback datasets to ensure 100% functionality on both local file:// protocols and HTTP servers
const FALLBACK_BIOMES = [
  {
    "id": "forest",
    "name": "Forest",
    "speedReq": 0,
    "speedReqFormatted": "0 (Starting)",
    "guardian": "Giant Chicken",
    "difficulty": "Easy",
    "description": "The tranquil starting zone where every egg thief begins. Gentle paths, low risk, and basic starter nests.",
    "hazard": "Pecking attack if caught lingering near the nest without moving.",
    "topPet": "Brr Brr Patapim"
  },
  {
    "id": "lake",
    "name": "Lake",
    "speedReq": 900,
    "speedReqFormatted": "900 Speed",
    "guardian": "Majestic Swan",
    "difficulty": "Easy - Medium",
    "description": "A misty lakeside with nests hidden around reeds and docks. Water currents slightly slow down unaware thieves.",
    "hazard": "Wing slap flings players away from water nests.",
    "topPet": "Lake Leviathan"
  },
  {
    "id": "desert",
    "name": "Desert",
    "speedReq": 10000,
    "speedReqFormatted": "10,000 Speed (10K)",
    "guardian": "Emperor Scorpion",
    "difficulty": "Medium",
    "description": "Arid dunes with quicksand patches and ancient ruin nests. Scorpion strikes are swift and relentless.",
    "hazard": "Sting attack knocks eggs out of your hands immediately.",
    "topPet": "Royal Sphinx"
  },
  {
    "id": "jungle",
    "name": "Jungle",
    "speedReq": 40000,
    "speedReqFormatted": "40,000 Speed (40K)",
    "guardian": "Apex Tiger",
    "difficulty": "Medium - Hard",
    "description": "Dense foliage with elevated canopy nests and vines. The Tiger prowls through blind spots.",
    "hazard": "Pounce sprint covers huge distances in seconds.",
    "topPet": "Orangutini Ananassini"
  },
  {
    "id": "snow",
    "name": "Snow & Tundra",
    "speedReq": 170000,
    "speedReqFormatted": "170,000 Speed (170K)",
    "guardian": "Frost Yeti",
    "difficulty": "Hard",
    "description": "Freezing tundra with slippery ice floors and towering glacier nests. Requires high momentum.",
    "hazard": "Ground slam causes tremors that slow recovery.",
    "topPet": "Ice Dragon"
  },
  {
    "id": "volcano",
    "name": "Volcano",
    "speedReq": 700000,
    "speedReqFormatted": "700,000 Speed (700K)",
    "guardian": "Infernal Hellhound",
    "difficulty": "Hard - Expert",
    "description": "Molten lava rivers and rocky crags where rare fiery eggs bake under intense heat.",
    "hazard": "Fire breath and magma pools that incinerate unprotected runs.",
    "topPet": "Cerberus"
  },
  {
    "id": "abyss-ocean",
    "name": "Abyss Ocean",
    "speedReq": 2500000,
    "speedReqFormatted": "2,500,000 Speed (2.5M)",
    "guardian": "Abyssal Leviathan",
    "difficulty": "Expert",
    "description": "The crushing deep sea zone illuminated only by bioluminescent eggs and deep oceanic trenches.",
    "hazard": "Whirlpool pull and tentacle sweeps.",
    "topPet": "El Maja"
  },
  {
    "id": "prehistoric",
    "name": "Prehistoric",
    "speedReq": 17000000,
    "speedReqFormatted": "17,000,000 Speed (17M)",
    "guardian": "Tyrannosaurus Rex",
    "difficulty": "Master",
    "description": "Primeval jungle filled with colossal dinosaur nests, giant fossils, and massive prehistoric eggs.",
    "hazard": "Devastating roar stun and massive charge hitbox.",
    "topPet": "Mosasaurus"
  },
  {
    "id": "cosmic",
    "name": "Cosmic Realm",
    "speedReq": 700000000,
    "speedReqFormatted": "700,000,000 Speed (700M)",
    "guardian": "Astral Void Dragon",
    "difficulty": "Grandmaster",
    "description": "Floating celestial platforms across the void of space with starry nests and god-tier celestial eggs.",
    "hazard": "Gravity shifts and void beams.",
    "topPet": "Unicorn (Divine)"
  },
  {
    "id": "cherry-blossom",
    "name": "Cherry Blossom (Sakura)",
    "speedReq": 2500000000,
    "speedReqFormatted": "2,500,000,000 Speed (2.5B)",
    "guardian": "Nine-Tailed Kitsune",
    "difficulty": "Endgame Divine",
    "description": "The sacred endgame sanctuary with ethereal sakura petals, the mystical Sakura Incubator, and top-tier income pets.",
    "hazard": "Spirit burst and phantom illusions.",
    "topPet": "Kitsune (Divine)"
  }
];

const FALLBACK_PETS = [
  { "id": "p01", "name": "Chicken", "biome": "forest", "rarity": "Common", "income": 1, "incomeFormatted": "$1/s", "tier": 1, "egg": "Forest Common Egg", "desc": "A trusty starter bird. Modest income to kickstart your first treadmill sessions." },
  { "id": "p02", "name": "Dog", "biome": "forest", "rarity": "Common", "income": 2, "incomeFormatted": "$2/s", "tier": 1, "egg": "Forest Common Egg", "desc": "Man's best friend in the egg fields. Reliable early passive cash." },
  { "id": "p03", "name": "Bird", "biome": "forest", "rarity": "Uncommon", "income": 5, "incomeFormatted": "$5/s", "tier": 2, "egg": "Forest Uncommon Egg", "desc": "Small winged flyer hatched from gentle forest canopies." },
  { "id": "p04", "name": "Owl", "biome": "forest", "rarity": "Uncommon", "income": 12, "incomeFormatted": "$12/s", "tier": 2, "egg": "Forest Uncommon Egg", "desc": "Nocturnal guardian that boosts your early base income noticeably." },
  { "id": "p05", "name": "Raccoon", "biome": "forest", "rarity": "Rare", "income": 35, "incomeFormatted": "$35/s", "tier": 3, "egg": "Forest Rare Egg", "desc": "A sneaky bandit pet. Helps you afford the first pen capacity upgrade." },
  { "id": "p06", "name": "Fox", "biome": "forest", "rarity": "Rare", "income": 80, "incomeFormatted": "$80/s", "tier": 3, "egg": "Forest Rare Egg", "desc": "Quick and nimble creature found near deep thickets." },
  { "id": "p07", "name": "Wolf", "biome": "forest", "rarity": "Epic", "income": 250, "incomeFormatted": "$250/s", "tier": 4, "egg": "Forest Epic Egg", "desc": "Pack hunter with sharp eyes and solid early-game income." },
  { "id": "p08", "name": "Brr Brr Patapim", "biome": "forest", "rarity": "Legendary", "income": 1200, "incomeFormatted": "$1.2K/s", "tier": 5, "egg": "Forest Giant Nest", "desc": "The crown jewel of the Forest. Massive early game boost to reach the Lake." },

  { "id": "p09", "name": "Frog", "biome": "lake", "rarity": "Common", "income": 800, "incomeFormatted": "$800/s", "tier": 1, "egg": "Lake Egg", "desc": "Pond hopper that helps fund speed workouts for the desert." },
  { "id": "p10", "name": "Catfish", "biome": "lake", "rarity": "Common", "income": 1800, "incomeFormatted": "$1.8K/s", "tier": 1, "egg": "Lake Egg", "desc": "Bottom feeder swimming through murky lake waters." },
  { "id": "p11", "name": "Duck", "biome": "lake", "rarity": "Uncommon", "income": 4500, "incomeFormatted": "$4.5K/s", "tier": 2, "egg": "Lake Egg", "desc": "Splashing duck from the reeds with solid $/s." },
  { "id": "p12", "name": "Turtle", "biome": "lake", "rarity": "Uncommon", "income": 10000, "incomeFormatted": "$10K/s", "tier": 2, "egg": "Lake Egg", "desc": "Armored reptile carrying consistent cash production." },
  { "id": "p13", "name": "Axolotl", "biome": "lake", "rarity": "Rare", "income": 28000, "incomeFormatted": "$28K/s", "tier": 3, "egg": "Lake Large Nest", "desc": "Adorable amphibious regenerator with great multiplier potential." },
  { "id": "p14", "name": "Trulimero Trulicina", "biome": "lake", "rarity": "Rare", "income": 65000, "incomeFormatted": "$65K/s", "tier": 3, "egg": "Lake Large Nest", "desc": "Exotic aquatic myth that provides hefty income boost." },
  { "id": "p15", "name": "Giant Swan", "biome": "lake", "rarity": "Epic", "income": 180000, "incomeFormatted": "$180K/s", "tier": 4, "egg": "Lake Swan Nest", "desc": "Majestic avian pet guarded fiercely by the lake matriarch." },
  { "id": "p16", "name": "Lake Leviathan", "biome": "lake", "rarity": "Legendary", "income": 500000, "incomeFormatted": "$500K/s", "tier": 5, "egg": "Deep Lake Shallows", "desc": "Dominates the Lake biome. Essential for speeding up into the Desert." },

  { "id": "p17", "name": "Jerboa", "biome": "desert", "rarity": "Common", "income": 350000, "incomeFormatted": "$350K/s", "tier": 1, "egg": "Desert Egg", "desc": "Desert hopper surviving extreme temperature swings." },
  { "id": "p18", "name": "Sand Viper", "biome": "desert", "rarity": "Common", "income": 750000, "incomeFormatted": "$750K/s", "tier": 1, "egg": "Desert Egg", "desc": "Lethal venomous serpent buried in the golden sand." },
  { "id": "p19", "name": "Camel", "biome": "desert", "rarity": "Uncommon", "income": 1800000, "incomeFormatted": "$1.8M/s", "tier": 2, "egg": "Desert Oasis Egg", "desc": "Dune traveler that stores high cash reserves." },
  { "id": "p20", "name": "Desert Vulture", "biome": "desert", "rarity": "Uncommon", "income": 4200000, "incomeFormatted": "$4.2M/s", "tier": 2, "egg": "Desert Oasis Egg", "desc": "Circling scavenger hovering above ancient ruins." },
  { "id": "p21", "name": "Sand Spider", "biome": "desert", "rarity": "Rare", "income": 11000000, "incomeFormatted": "$11M/s", "tier": 3, "egg": "Desert Ruin Nest", "desc": "Eight-legged ambush predator from subterranean burrows." },
  { "id": "p22", "name": "Emperor Scorpion", "biome": "desert", "rarity": "Epic", "income": 32000000, "incomeFormatted": "$32M/s", "tier": 4, "egg": "Scorpion Lair", "desc": "Armored arachnid miniature of the terrifying Desert guardian." },
  { "id": "p23", "name": "Anubis Jackal", "biome": "desert", "rarity": "Legendary", "income": 95000000, "incomeFormatted": "$95M/s", "tier": 5, "egg": "Pharaoh Pyramid Nest", "desc": "Sacred guardian pet granting immense spiritual wealth." },
  { "id": "p24", "name": "Royal Sphinx", "biome": "desert", "rarity": "Mythic", "income": 280000000, "incomeFormatted": "$280M/s", "tier": 6, "egg": "Sphinx Chamber", "desc": "Mythical riddler pet. Yields insane returns for Jungle progression." },

  { "id": "p25", "name": "Toucan", "biome": "jungle", "rarity": "Common", "income": 150000000, "incomeFormatted": "$150M/s", "tier": 1, "egg": "Jungle Egg", "desc": "Brightly beaked tropical bird nesting high in the jungle." },
  { "id": "p26", "name": "Chimpanzee", "biome": "jungle", "rarity": "Common", "income": 350000000, "incomeFormatted": "$350M/s", "tier": 1, "egg": "Jungle Egg", "desc": "Acrobatic primate swinging through tree canopies." },
  { "id": "p27", "name": "Crocodile", "biome": "jungle", "rarity": "Uncommon", "income": 800000000, "incomeFormatted": "$800M/s", "tier": 2, "egg": "Swamp River Nest", "desc": "Prehistoric reptile lurking along riverbanks." },
  { "id": "p28", "name": "Gorilla", "biome": "jungle", "rarity": "Rare", "income": 2000000000, "incomeFormatted": "$2B/s", "tier": 3, "egg": "Jungle Canopy Nest", "desc": "Colossal silverback powerhouse pet." },
  { "id": "p29", "name": "Black Panther", "biome": "jungle", "rarity": "Epic", "income": 5500000000, "incomeFormatted": "$5.5B/s", "tier": 4, "egg": "Panther Den", "desc": "Shadowy stealth predator hunting from above." },
  { "id": "p30", "name": "Jungle Tiger", "biome": "jungle", "rarity": "Legendary", "income": 16000000000, "incomeFormatted": "$16B/s", "tier": 5, "egg": "Apex Tiger Nest", "desc": "Ferocious striped carnivore from the heart of the rainforest." },
  { "id": "p31", "name": "Orangutini Ananassini", "biome": "jungle", "rarity": "Mythic", "income": 45000000000, "incomeFormatted": "$45B/s", "tier": 6, "egg": "Sacred Totem Nest", "desc": "Legendary tropical anomaly pet producing overwhelming $/s." },
  { "id": "p32", "name": "Ancient Quetzalcoatl", "biome": "jungle", "rarity": "Cosmic", "income": 120000000000, "incomeFormatted": "$120B/s", "tier": 7, "egg": "Sun Temple Altar", "desc": "Feathered serpent deity from ancient jungle mythos." },

  { "id": "p33", "name": "Penguin", "biome": "snow", "rarity": "Common", "income": 80000000000, "incomeFormatted": "$80B/s", "tier": 1, "egg": "Glacier Egg", "desc": "Cute waddler sliding effortlessly across icy terrain." },
  { "id": "p34", "name": "Walrus", "biome": "snow", "rarity": "Common", "income": 190000000000, "incomeFormatted": "$190B/s", "tier": 1, "egg": "Glacier Egg", "desc": "Tusked behemoth sunbathing on frozen floes." },
  { "id": "p35", "name": "Snow Leopard", "biome": "snow", "rarity": "Uncommon", "income": 450000000000, "incomeFormatted": "$450B/s", "tier": 2, "egg": "Frozen Peak Egg", "desc": "Ghostly feline adapted to extreme subzero blizzards." },
  { "id": "p36", "name": "Polar Bear", "biome": "snow", "rarity": "Rare", "income": 1100000000000, "incomeFormatted": "$1.1T/s", "tier": 3, "egg": "Ice Cave Nest", "desc": "Apex Arctic predator generating trillion-tier income." },
  { "id": "p37", "name": "Sabertooth Tiger", "biome": "snow", "rarity": "Epic", "income": 3000000000000, "incomeFormatted": "$3T/s", "tier": 4, "egg": "Frozen Fossil Nest", "desc": "Ancient fanged hunter preserved in deep ice." },
  { "id": "p38", "name": "Mammoth", "biome": "snow", "rarity": "Legendary", "income": 8500000000000, "incomeFormatted": "$8.5T/s", "tier": 5, "egg": "Mammoth Graveyard", "desc": "Giant woolly titan marching across tundra steppes." },
  { "id": "p39", "name": "King Mammoth", "biome": "snow", "rarity": "Mythic", "income": 25000000000000, "incomeFormatted": "$25T/s", "tier": 6, "egg": "Yeti Glacier Vault", "desc": "Royal prehistoric patriarch crowned in frost." },
  { "id": "p40", "name": "Ice Dragon", "biome": "snow", "rarity": "Cosmic", "income": 75000000000000, "incomeFormatted": "$75T/s", "tier": 7, "egg": "Blizzard Summit Altar", "desc": "Breathes absolute zero frost. Shatters income goals." },

  { "id": "p41", "name": "Lava Gecko", "biome": "volcano", "rarity": "Common", "income": 50000000000000, "incomeFormatted": "$50T/s", "tier": 1, "egg": "Magma Egg", "desc": "Heat-resistant lizard skittering across molten lava." },
  { "id": "p42", "name": "Lava Frog", "biome": "volcano", "rarity": "Common", "income": 120000000000000, "incomeFormatted": "$120T/s", "tier": 1, "egg": "Magma Egg", "desc": "Obsidian skin protects this amphibian from magma pools." },
  { "id": "p43", "name": "Flaming Bull", "biome": "volcano", "rarity": "Uncommon", "income": 300000000000000, "incomeFormatted": "$300T/s", "tier": 2, "egg": "Volcanic Core Egg", "desc": "Raging horned beast with burning hooves." },
  { "id": "p44", "name": "Lava Iguana", "biome": "volcano", "rarity": "Rare", "income": 800000000000000, "incomeFormatted": "$800T/s", "tier": 3, "egg": "Obsidian Nest", "desc": "Basking in incandescent magma flows." },
  { "id": "p45", "name": "Chillin Chilli", "biome": "volcano", "rarity": "Epic", "income": 2200000000000000, "incomeFormatted": "$2.2Qa/s", "tier": 4, "egg": "Inferno Chamber", "desc": "Spicy volcanic mascot bursting with explosive energy." },
  { "id": "p46", "name": "Magma Phoenix", "biome": "volcano", "rarity": "Legendary", "income": 6500000000000000, "incomeFormatted": "$6.5Qa/s", "tier": 5, "egg": "Cinder Crater Nest", "desc": "Reborn perpetually from the heart of the volcano." },
  { "id": "p47", "name": "Cerberus", "biome": "volcano", "rarity": "Mythic", "income": 20000000000000000, "incomeFormatted": "$20Qa/s", "tier": 6, "egg": "Hellhound Lair", "desc": "Three-headed hound guarding the volcanic underworld." },
  { "id": "p48", "name": "Infernal Titan", "biome": "volcano", "rarity": "Secret", "income": 65000000000000000, "incomeFormatted": "$65Qa/s", "tier": 8, "egg": "Core Rift Nest", "desc": "Primeval elemental forged when the volcano first erupted." },

  { "id": "p49", "name": "Abyssal Angler", "biome": "abyss-ocean", "rarity": "Common", "income": 40000000000000000, "incomeFormatted": "$40Qa/s", "tier": 1, "egg": "Abyss Egg", "desc": "Bioluminescent lure attracting deep ocean riches." },
  { "id": "p50", "name": "Vampire Squid", "biome": "abyss-ocean", "rarity": "Uncommon", "income": 110000000000000000, "incomeFormatted": "$110Qa/s", "tier": 2, "egg": "Trench Egg", "desc": "Ghostly cephalopod glowing in crushing depths." },
  { "id": "p51", "name": "Gulper Eel", "biome": "abyss-ocean", "rarity": "Rare", "income": 320000000000000000, "incomeFormatted": "$320Qa/s", "tier": 3, "egg": "Hydrothermal Nest", "desc": "Enormous jaw capable of devouring entire fortunes." },
  { "id": "p52", "name": "Megalodon", "biome": "abyss-ocean", "rarity": "Epic", "income": 950000000000000000, "incomeFormatted": "$950Qa/s", "tier": 4, "egg": "Ancient Trench Vault", "desc": "Colossal apex shark ruling the dark oceanic depths." },
  { "id": "p53", "name": "Deep Sea Hydra", "biome": "abyss-ocean", "rarity": "Legendary", "income": 3000000000000000000, "incomeFormatted": "$3Qi/s", "tier": 5, "egg": "Mariana Abyss Nest", "desc": "Multi-headed terror regenerating wealth per head." },
  { "id": "p54", "name": "Kraken", "biome": "abyss-ocean", "rarity": "Secret", "income": 15000000000000000000, "incomeFormatted": "$15Qi/s", "tier": 8, "egg": "Sunken Citadel Egg", "desc": "Mythical titan of sea storms and shipwrecks." },
  { "id": "p55", "name": "El Maja", "biome": "abyss-ocean", "rarity": "Eternal", "income": 130000000000000000000, "incomeFormatted": "$130Qi/s", "tier": 9, "egg": "Abyssal Heart Nest", "desc": "Endgame abyssal monarch providing unmatched quintillion flow." },
  { "id": "p56", "name": "Cthulhu Spawn", "biome": "abyss-ocean", "rarity": "Eternal", "income": 400000000000000000000, "incomeFormatted": "$400Qi/s", "tier": 9, "egg": "Cosmic Trench Rift", "desc": "Eldritch herald from the oldest ocean depths." },

  { "id": "p57", "name": "Velociraptor", "biome": "prehistoric", "rarity": "Common", "income": 250000000000000000000, "incomeFormatted": "$250Qi/s", "tier": 1, "egg": "Fossil Egg", "desc": "Fast pack runner with razor claws and high speed synergy." },
  { "id": "p58", "name": "Triceratops", "biome": "prehistoric", "rarity": "Uncommon", "income": 700000000000000000000, "incomeFormatted": "$700Qi/s", "tier": 2, "egg": "Dino Egg", "desc": "Triple-horned herbivorous tank with stalwart returns." },
  { "id": "p59", "name": "Pterodactyl", "biome": "prehistoric", "rarity": "Rare", "income": 2000000000000000000000, "incomeFormatted": "$2Sx/s", "tier": 3, "egg": "Pterosaur Cliff Nest", "desc": "Prehistoric glider swooping over primeval swamps." },
  { "id": "p60", "name": "Stegosaurus", "biome": "prehistoric", "rarity": "Epic", "income": 6000000000000000000000, "incomeFormatted": "$6Sx/s", "tier": 4, "egg": "Amber Nest", "desc": "Plated dinosaur with a spiked thagomizer tail." },
  { "id": "p61", "name": "Bronto", "biome": "prehistoric", "rarity": "Cosmic", "income": 18000000000000000000000, "incomeFormatted": "$18Sx/s", "tier": 7, "egg": "Colossal Dino Nest", "desc": "Gentle giant whose footprints shake the entire biome." },
  { "id": "p62", "name": "Spinosaurus", "biome": "prehistoric", "rarity": "Legendary", "income": 55000000000000000000000, "incomeFormatted": "$55Sx/s", "tier": 5, "egg": "River Predator Nest", "desc": "Sail-backed semi-aquatic super predator." },
  { "id": "p63", "name": "Tyrannosaurus Rex", "biome": "prehistoric", "rarity": "Secret", "income": 180000000000000000000000, "incomeFormatted": "$180Sx/s", "tier": 8, "egg": "Apex Rex Lair", "desc": "The undisputed king of the dinosaurs." },
  { "id": "p64", "name": "Mosasaurus", "biome": "prehistoric", "rarity": "Eternal", "income": 600000000000000000000000, "incomeFormatted": "$600Sx/s", "tier": 9, "egg": "Prehistoric Lagoon", "desc": "Apex marine reptile ruling the primeval oceans." },

  { "id": "p65", "name": "Starlight Wisp", "biome": "cosmic", "rarity": "Common", "income": 400000000000000000000000, "incomeFormatted": "$400Sx/s", "tier": 1, "egg": "Nebula Egg", "desc": "Living stardust collected from cosmic nebulae." },
  { "id": "p66", "name": "Lunar Wolf", "biome": "cosmic", "rarity": "Uncommon", "income": 1200000000000000000000000, "incomeFormatted": "$1.2Sp/s", "tier": 2, "egg": "Moonrock Egg", "desc": "Howls at supernovas and gathers astral momentum." },
  { "id": "p67", "name": "Solar Phoenix", "biome": "cosmic", "rarity": "Rare", "income": 4000000000000000000000000, "incomeFormatted": "$4Sp/s", "tier": 3, "egg": "Supernova Nest", "desc": "Blazing avian forged in thermonuclear fusion." },
  { "id": "p68", "name": "Galactic Golem", "biome": "cosmic", "rarity": "Epic", "income": 14000000000000000000000000, "incomeFormatted": "$14Sp/s", "tier": 4, "egg": "Asteroid Vault", "desc": "Constructed from compressed planetary cores." },
  { "id": "p69", "name": "Black Hole Serpent", "biome": "cosmic", "rarity": "Legendary", "income": 50000000000000000000000000, "incomeFormatted": "$50Sp/s", "tier": 5, "egg": "Singularity Nest", "desc": "Devours light and emits infinite cash particles." },
  { "id": "p70", "name": "Eternal Lunar Dragon", "biome": "cosmic", "rarity": "Eternal", "income": 250000000000000000000000000, "incomeFormatted": "$250Sp/s", "tier": 9, "egg": "Eclipse Altar", "desc": "Breathes astral moonlight with unimaginable power." },
  { "id": "p71", "name": "Cosmic Archon", "biome": "cosmic", "rarity": "Secret", "income": 600000000000000000000000000, "incomeFormatted": "$600Sp/s", "tier": 8, "egg": "Celestial Core", "desc": "Guardian of the universal balance." },
  { "id": "p72", "name": "Unicorn", "biome": "cosmic", "rarity": "Divine", "income": 1000000000000000000000000000, "incomeFormatted": "$1Oc/s (1B base)", "tier": 10, "egg": "Starlight Genesis Egg", "desc": "Divine mythical horned deity. Generates monumental cosmic wealth." },

  { "id": "p73", "name": "Sakura Butterfly", "biome": "cherry-blossom", "rarity": "Common", "income": 800000000000000000000000000, "incomeFormatted": "$800Sp/s", "tier": 1, "egg": "Blossom Egg", "desc": "Delicate spirit butterfly carrying blooming blessings." },
  { "id": "p74", "name": "Tanuki Trickster", "biome": "cherry-blossom", "rarity": "Uncommon", "income": 2500000000000000000000000000, "incomeFormatted": "$2.5Oc/s", "tier": 2, "egg": "Shrine Egg", "desc": "Playful shapeshifter leaving gold coins in its wake." },
  { "id": "p75", "name": "Sakura Crane", "biome": "cherry-blossom", "rarity": "Epic", "income": 8000000000000000000000000000, "incomeFormatted": "$8Oc/s", "tier": 4, "egg": "Sakura Branch Nest", "desc": "Sacred bird required to unlock the mystical Sakura Incubator." },
  { "id": "p76", "name": "Spirit Samurai Dog", "biome": "cherry-blossom", "rarity": "Rare", "income": 24000000000000000000000000000, "incomeFormatted": "$24Oc/s", "tier": 3, "egg": "Zen Garden Nest", "desc": "Honorable katana-wielding guardian of the grove." },
  { "id": "p77", "name": "Bloom Koi Dragon", "biome": "cherry-blossom", "rarity": "Legendary", "income": 80000000000000000000000000000, "incomeFormatted": "$80Oc/s", "tier": 5, "egg": "Lotus Pond Altar", "desc": "Koi that swam up the spiritual waterfall to become a dragon." },
  { "id": "p78", "name": "Sakura Orochi", "biome": "cherry-blossom", "rarity": "Mythic", "income": 300000000000000000000000000000, "incomeFormatted": "$300Oc/s", "tier": 6, "egg": "Torii Gate Sanctum", "desc": "Eight-headed cherry serpent blessed by divine spirit blossoms." },
  { "id": "p79", "name": "Spirit Kitsune Master", "biome": "cherry-blossom", "rarity": "Eternal", "income": 900000000000000000000000000000, "incomeFormatted": "$900Oc/s", "tier": 9, "egg": "Sacred Shrine Peak", "desc": "Ascended fox spirit master commanding nine radiant tails." },
  { "id": "p80", "name": "Kitsune (Divine)", "biome": "cherry-blossom", "rarity": "Divine", "income": 1800000000000000000000000000000, "incomeFormatted": "$1.8N/s (1.8B top)", "tier": 10, "egg": "Divine Blossom Genesis", "desc": "The highest earning pet in the entire game! Generates maximum endgame income." },

  { "id": "p81", "name": "Skibidi Cameraman Pet", "biome": "brainrot", "rarity": "Brainrot", "income": 1000000000000, "incomeFormatted": "$1T/s", "tier": 8, "egg": "Brainrot Store Egg", "desc": "Exclusive Robux store pet from the viral meme series." },
  { "id": "p82", "name": "Speaker Titan", "biome": "brainrot", "rarity": "Brainrot", "income": 15000000000000, "incomeFormatted": "$15T/s", "tier": 8, "egg": "Brainrot Store Egg", "desc": "Blasts high-frequency soundwaves to generate cash." },
  { "id": "p83", "name": "G-Man Toilet", "biome": "brainrot", "rarity": "Brainrot", "income": 75000000000000, "incomeFormatted": "$75T/s", "tier": 8, "egg": "Brainrot Store Egg", "desc": "Laser-equipped limited edition meme collectible." },
  { "id": "p84", "name": "Sigma Doge", "biome": "brainrot", "rarity": "Brainrot", "income": 300000000000000, "incomeFormatted": "$300T/s", "tier": 8, "egg": "Brainrot Store Egg", "desc": "The ultimate grindset canine generating passive sigma value." },
  { "id": "p85", "name": "Grimace Monster", "biome": "brainrot", "rarity": "Brainrot", "income": 1200000000000000, "incomeFormatted": "$1.2Qa/s", "tier": 8, "egg": "Brainrot Store Egg", "desc": "Purple shaking terror from the limited shop rotation." },
  { "id": "p86", "name": "Capybara King", "biome": "brainrot", "rarity": "Brainrot", "income": 5000000000000000, "incomeFormatted": "$5Qa/s", "tier": 8, "egg": "Brainrot Store Egg", "desc": "Unbothered royalty pulling up with heavyweight income." }
];

// App State
let biomesData = FALLBACK_BIOMES;
let petsData = FALLBACK_PETS;
let currentBiomeFilter = 'all';
let currentRarityFilter = 'all';
let currentSearchQuery = '';

// DOM Elements
const tabBar = document.getElementById('tabBar');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const biomesContainer = document.getElementById('biomesContainer');
const petsGrid = document.getElementById('petsGrid');
const petSearchInput = document.getElementById('petSearchInput');
const raritySelect = document.getElementById('raritySelect');
const biomeFilterPills = document.getElementById('biomeFilterPills');
const petResultsCount = document.getElementById('petResultsCount');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const petModal = document.getElementById('petModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalBody = document.getElementById('modalBody');

// Calculator DOM Elements
const calcPetSelect = document.getElementById('calcPetSelect');
const calcSizeSelect = document.getElementById('calcSizeSelect');
const calcMutationSelect = document.getElementById('calcMutationSelect');
const calcPetCount = document.getElementById('calcPetCount');
const calcTotalIncome = document.getElementById('calcTotalIncome');
const calcSubtext = document.getElementById('calcSubtext');
const calcBreakdownBase = document.getElementById('calcBreakdownBase');
const calcBreakdownMult = document.getElementById('calcBreakdownMult');
const calcBreakdownMin = document.getElementById('calcBreakdownMin');
const calcBreakdownHour = document.getElementById('calcBreakdownHour');

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  await loadExternalData();
  initNavigation();
  initTheme();
  renderBiomes();
  renderPets();
  initCalculator();
  initModal();
});

// Load JSON datasets if running under HTTP/S
async function loadExternalData() {
  try {
    const biomesRes = await fetch('data/biomes.json');
    if (biomesRes.ok) biomesData = await biomesRes.json();
  } catch (e) {
    console.info('Using embedded fallback biomes dataset.');
  }

  try {
    const petsRes = await fetch('data/pets.json');
    if (petsRes.ok) petsData = await petsRes.json();
  } catch (e) {
    console.info('Using embedded fallback pets dataset.');
  }

  const biomeBadge = document.getElementById('biomeCountBadge');
  const petBadge = document.getElementById('petCountBadge');
  if (biomeBadge) biomeBadge.textContent = biomesData.length;
  if (petBadge) petBadge.textContent = petsData.length;
}

// Navigation & Tab Switching
function initNavigation() {
  function switchTab(targetTabId) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === targetTabId);
    });

    tabPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${targetTabId}`);
    });

    window.location.hash = targetTabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Handle URL hash on initial load & popstate
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(`panel-${initialHash}`)) {
    switchTab(initialHash);
  }

  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'overview';
    if (document.getElementById(`panel-${hash}`)) {
      switchTab(hash);
    }
  });
}

// Theme Switcher (Obsidian Dark / Crisp Light Monochrome)
function initTheme() {
  const savedTheme = localStorage.getItem('sae_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '🌓' : '☀️';

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('sae_theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '🌓' : '☀️';
  });
}

// Render Biomes Tab
function renderBiomes() {
  if (!biomesContainer) return;
  biomesContainer.innerHTML = biomesData.map((b, idx) => `
    <div class="card biome-card">
      <div class="card-header">
        <div>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">ZONE #${idx + 1}</span>
          <h3 class="card-title">${b.name}</h3>
        </div>
        <span class="biome-speed">⚡ ${b.speedReqFormatted}</span>
      </div>
      <div class="card-body">
        <p>${b.description}</p>
        <div class="hazard-box">
          <strong>⚠️ Hazard:</strong> ${b.hazard}
        </div>
        <div class="biome-guardian">
          <span>🛡️ <strong>Guardian:</strong> ${b.guardian}</span>
        </div>
      </div>
      <div class="card-footer">
        <span>Top Pet: <strong>${b.topPet}</strong></span>
        <span>Pets: 8 Total</span>
      </div>
    </div>
  `).join('');
}

// Format Large Currency Numbers
function formatCurrency(num) {
  if (num === null || num === undefined) return '$0';
  if (typeof num === 'string' && isNaN(Number(num))) return num;
  
  const n = Number(num);
  if (n < 1000) return `$${n}`;
  if (n < 1e6) return `$${(n / 1e3).toFixed(1)}K`;
  if (n < 1e9) return `$${(n / 1e6).toFixed(1)}M`;
  if (n < 1e12) return `$${(n / 1e9).toFixed(1)}B`;
  if (n < 1e15) return `$${(n / 1e12).toFixed(1)}T`;
  if (n < 1e18) return `$${(n / 1e15).toFixed(1)}Qa`;
  if (n < 1e21) return `$${(n / 1e18).toFixed(1)}Qi`;
  if (n < 1e24) return `$${(n / 1e21).toFixed(1)}Sx`;
  if (n < 1e27) return `$${(n / 1e24).toFixed(1)}Sp`;
  if (n < 1e30) return `$${(n / 1e27).toFixed(1)}Oc`;
  return `$${(n / 1e30).toFixed(1)}N`;
}

// Render Pets Tab & Filters
function renderPets() {
  if (!petsGrid) return;

  const filtered = petsData.filter(pet => {
    const matchesBiome = currentBiomeFilter === 'all' || pet.biome.toLowerCase() === currentBiomeFilter.toLowerCase();
    const matchesRarity = currentRarityFilter === 'all' || pet.rarity.toLowerCase() === currentRarityFilter.toLowerCase();
    const query = currentSearchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      pet.name.toLowerCase().includes(query) ||
      pet.rarity.toLowerCase().includes(query) ||
      pet.biome.toLowerCase().includes(query) ||
      pet.egg.toLowerCase().includes(query) ||
      pet.desc.toLowerCase().includes(query);

    return matchesBiome && matchesRarity && matchesSearch;
  });

  if (petResultsCount) petResultsCount.textContent = filtered.length;

  if (filtered.length === 0) {
    petsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: var(--bg-secondary); border-radius: var(--radius-lg); border: 1px dashed var(--border-medium);">
        <p style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">No Pets Found</p>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Try adjusting your search query or selecting "All Biomes".</p>
      </div>
    `;
    return;
  }

  petsGrid.innerHTML = filtered.map(pet => `
    <div class="pet-card" onclick="openPetModal('${pet.id}')">
      <div class="pet-header">
        <div class="pet-title-box">
          <span class="pet-biome-tag">📍 ${pet.biome.replace('-', ' ')}</span>
          <h3>${pet.name}</h3>
        </div>
        <span class="rarity-tag rarity-${pet.rarity}">${pet.rarity}</span>
      </div>

      <div class="pet-income-box">
        <div class="pet-income-label">Base Passive Income</div>
        <div class="pet-income-val">${formatCurrency(pet.income)} / s</div>
      </div>

      <p class="pet-desc">${pet.desc}</p>

      <div class="card-footer" style="margin-top: 12px; font-size: 0.78rem;">
        <span>🥚 ${pet.egg}</span>
        <span>Inspect ↗</span>
      </div>
    </div>
  `).join('');
}

// Search & Filter Events
if (petSearchInput) {
  petSearchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value;
    renderPets();
  });
}

if (raritySelect) {
  raritySelect.addEventListener('change', (e) => {
    currentRarityFilter = e.target.value;
    renderPets();
  });
}

if (biomeFilterPills) {
  biomeFilterPills.addEventListener('click', (e) => {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;
    biomeFilterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentBiomeFilter = pill.dataset.biome;
    renderPets();
  });
}

// Pet Modal Details
window.openPetModal = function(petId) {
  const pet = petsData.find(p => p.id === petId);
  if (!pet || !modalBody || !petModal) return;

  const biomeObj = biomesData.find(b => b.id === pet.biome) || { name: pet.biome, speedReqFormatted: 'N/A', guardian: 'Unknown' };

  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
      <span class="rarity-tag rarity-${pet.rarity}" style="font-size: 0.82rem; padding: 4px 12px;">${pet.rarity}</span>
      <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">ID: ${pet.id}</span>
    </div>
    
    <h2 style="font-size: 1.8rem; margin-bottom: 8px;">${pet.name}</h2>
    <p style="color: var(--text-secondary); margin-bottom: 20px;">${pet.desc}</p>

    <div style="background: var(--bg-tertiary); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 20px;">
      <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Base Cash Generation</div>
      <div style="font-family: var(--font-mono); font-size: 1.8rem; font-weight: 800; color: var(--text-primary);">${formatCurrency(pet.income)} / sec</div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.85rem;">
      <div style="background: var(--bg-card); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <span style="color: var(--text-muted); display: block; font-size: 0.72rem; text-transform: uppercase;">Origin Biome</span>
        <strong>${biomeObj.name}</strong>
      </div>
      <div style="background: var(--bg-card); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <span style="color: var(--text-muted); display: block; font-size: 0.72rem; text-transform: uppercase;">Required Speed</span>
        <strong style="font-family: var(--font-mono);">${biomeObj.speedReqFormatted || '0'}</strong>
      </div>
      <div style="background: var(--bg-card); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); grid-column: 1 / -1;">
        <span style="color: var(--text-muted); display: block; font-size: 0.72rem; text-transform: uppercase;">Source Egg Nest</span>
        <strong>${pet.egg}</strong>
      </div>
    </div>

    <div style="margin-top: 24px; display: flex; gap: 12px;">
      <button class="btn-header primary" style="flex: 1; justify-content: center; padding: 12px;" onclick="loadInCalculator('${pet.id}')">
        Calculate in Multiplier Tool 🧮
      </button>
    </div>
  `;

  petModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function initModal() {
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (petModal) {
    petModal.addEventListener('click', (e) => {
      if (e.target === petModal) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && petModal && petModal.classList.contains('active')) {
      closeModal();
    }
  });
}

function closeModal() {
  if (petModal) petModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Load Pet directly into Calculator from Modal
window.loadInCalculator = function(petId) {
  closeModal();
  const calcTabBtn = document.querySelector('[data-tab="calculator"]');
  if (calcTabBtn) calcTabBtn.click();
  if (calcPetSelect) {
    calcPetSelect.value = petId;
    calculateIncome();
  }
};

// Interactive Income Calculator
function initCalculator() {
  if (!calcPetSelect) return;

  // Populate Pets Dropdown sorted by income
  const sortedPets = [...petsData].sort((a, b) => a.income - b.income);
  calcPetSelect.innerHTML = sortedPets.map(p => `
    <option value="${p.id}">${p.name} (${p.rarity} - ${formatCurrency(p.income)}/s)</option>
  `).join('');

  // Default to a notable mid/high pet
  const defaultPet = sortedPets.find(p => p.name === 'Bronto') || sortedPets[0];
  if (defaultPet) calcPetSelect.value = defaultPet.id;

  calcPetSelect.addEventListener('change', calculateIncome);
  calcSizeSelect.addEventListener('change', calculateIncome);
  calcMutationSelect.addEventListener('change', calculateIncome);
  calcPetCount.addEventListener('input', calculateIncome);

  calculateIncome();
}

function calculateIncome() {
  if (!calcPetSelect || !calcTotalIncome) return;

  const selectedPetId = calcPetSelect.value;
  const pet = petsData.find(p => p.id === selectedPetId);
  if (!pet) return;

  const baseIncome = Number(pet.income) || 0;
  const sizeMult = Number(calcSizeSelect.value) || 1;
  const mutMult = Number(calcMutationSelect.value) || 1;
  const count = Math.max(1, parseInt(calcPetCount.value) || 1);

  const totalMult = sizeMult * mutMult;
  const singleUnitPerSec = baseIncome * totalMult;
  const totalPerSec = singleUnitPerSec * count;
  const totalPerMin = totalPerSec * 60;
  const totalPerHour = totalPerSec * 3600;

  calcTotalIncome.textContent = `${formatCurrency(totalPerSec)} / s`;
  if (calcSubtext) {
    calcSubtext.textContent = `Hatching with ${calcSizeSelect.options[calcSizeSelect.selectedIndex].text} & ${calcMutationSelect.options[calcMutationSelect.selectedIndex].text} (${count} Pet${count > 1 ? 's' : ''})`;
  }

  if (calcBreakdownBase) calcBreakdownBase.textContent = `${formatCurrency(baseIncome)} / s`;
  if (calcBreakdownMult) calcBreakdownMult.textContent = `${totalMult.toFixed(2)}x (${sizeMult}x Size × ${mutMult}x Mutation)`;
  if (calcBreakdownMin) calcBreakdownMin.textContent = `${formatCurrency(totalPerMin)} / min`;
  if (calcBreakdownHour) calcBreakdownHour.textContent = `${formatCurrency(totalPerHour)} / hr`;
}
