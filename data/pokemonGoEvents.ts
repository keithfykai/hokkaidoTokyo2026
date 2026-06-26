export type PokemonFeature = {
  name: string;
  pokedexId: number;
  detail?: string;
  priority?: "High" | "Medium" | "Bonus";
};

export type PokemonGoEvent = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  time?: string;
  category: "Raid" | "Community Day" | "Anniversary" | "Go Fest" | "Bonus";
  summary: string;
  details: string[];
  pokemon: PokemonFeature[];
};

export const pokemonImage = (pokedexId: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedexId}.png`;

export const pokemonGoEvents: PokemonGoEvent[] = [
  {
    id: "mega-skarmory-raid-day",
    title: "Super Mega Raid Day: Mega Skarmory",
    startDate: "2026-06-27",
    endDate: "2026-06-27",
    time: "2 PM – 5 PM",
    category: "Raid",
    summary: "Mega Skarmory gets a focused raid window before the trip begins.",
    details: ["Short raid-day window", "Useful steel/flying Mega energy target"],
    pokemon: [{ name: "Skarmory", pokedexId: 227, detail: "Mega raid feature" }],
  },
  {
    id: "shadow-palkia",
    title: "Shadow Palkia",
    startDate: "2026-07-01",
    endDate: "2026-08-04",
    category: "Raid",
    summary: "Shadow Palkia appears through early August.",
    details: ["Active during the Hokkaido road trip", "Strong Dragon/Water legendary target"],
    pokemon: [{ name: "Palkia", pokedexId: 484, detail: "Shadow legendary" }],
  },
  {
    id: "legendary-birds-mega-lucario-july",
    title: "Legendary Birds + Mega Lucario",
    startDate: "2026-07-01",
    endDate: "2026-07-05",
    category: "Raid",
    summary: "Articuno, Zapdos, Moltres, and Mega Lucario overlap with the trip.",
    details: ["Returns again July 13–14", "Good raid pool during Furano, Noboribetsu, Hakodate, and Otaru"],
    pokemon: [
      { name: "Articuno", pokedexId: 144, detail: "5-star raid" },
      { name: "Zapdos", pokedexId: 145, detail: "5-star raid" },
      { name: "Moltres", pokedexId: 146, detail: "5-star raid" },
      { name: "Lucario", pokedexId: 448, detail: "Mega raid", priority: "High" },
    ],
  },
  {
    id: "sobble-community-day",
    title: "Sobble Community Day",
    startDate: "2026-07-04",
    endDate: "2026-07-04",
    time: "2 PM – 5 PM",
    category: "Community Day",
    summary: "Sobble takes over during the Otaru travel day.",
    details: ["Community Day window", "Plan catches around the Hakodate → Otaru drive"],
    pokemon: [{ name: "Sobble", pokedexId: 816, detail: "Community Day feature", priority: "High" }],
  },
  {
    id: "tenth-anniversary-party",
    title: "10th Anniversary Party",
    startDate: "2026-07-04",
    endDate: "2026-07-06",
    category: "Anniversary",
    summary: "Golden Lures, Gimmighoul, costumed Pokémon, and boosted catch rewards.",
    details: [
      "Gimmighoul spawning at Golden Lures",
      "Shiny Gimmighoul available until July 31",
      "4x XP and Stardust for catching Pokémon",
      "Costumed Pikachu and Eevee",
    ],
    pokemon: [
      { name: "Gimmighoul", pokedexId: 999, detail: "Golden Lure spawns", priority: "High" },
      { name: "Pikachu", pokedexId: 25, detail: "Costumed encounter" },
      { name: "Eevee", pokedexId: 133, detail: "Costumed encounter" },
    ],
  },
  {
    id: "road-of-legends-july-6",
    title: "Road of Legends: Raid Hours Day 1",
    startDate: "2026-07-06",
    endDate: "2026-07-06",
    time: "6 PM – 8 PM",
    category: "Raid",
    summary: "All legendaries and mythicals in raids, with Rayquaza as a top priority.",
    details: [
      "6–7 PM: 5-star raids",
      "7–8 PM: Mega raids",
      "Mega Salamence available",
      "No Mewtwo raids noted",
    ],
    pokemon: [
      { name: "Rayquaza", pokedexId: 384, detail: "Priority target", priority: "High" },
      { name: "Salamence", pokedexId: 373, detail: "Mega raid" },
    ],
  },
  {
    id: "road-of-legends-july-7",
    title: "Road of Legends: White Kyurem + Necrozma",
    startDate: "2026-07-07",
    endDate: "2026-07-07",
    time: "6 PM – 8 PM",
    category: "Raid",
    summary: "White Kyurem, Dawn Wings Necrozma, Zekrom, and Mega Tyranitar headline Tokyo transfer day.",
    details: [
      "White Kyurem energy farming: 1,000 energy per evolution",
      "Dawn Wings Necrozma energy farming: 1,000 energy per evolution",
      "White Kyurem marked as number 1 ice attacker",
      "Dawn Wings Necrozma marked as number 1 shadow attacker",
    ],
    pokemon: [
      { name: "Kyurem", pokedexId: 646, detail: "White Kyurem energy", priority: "High" },
      { name: "Necrozma", pokedexId: 800, detail: "Dawn Wings energy", priority: "High" },
      { name: "Zekrom", pokedexId: 644, detail: "5-star raid" },
      { name: "Tyranitar", pokedexId: 248, detail: "Mega raid" },
    ],
  },
  {
    id: "road-of-legends-july-8",
    title: "Road of Legends: Black Kyurem + Dusk Mane",
    startDate: "2026-07-08",
    endDate: "2026-07-08",
    time: "6 PM – 8 PM",
    category: "Raid",
    summary: "Black Kyurem, Dusk Mane Necrozma, Reshiram, and Mega Gardevoir.",
    details: ["Energy farming day for Black Kyurem and Dusk Mane Necrozma"],
    pokemon: [
      { name: "Kyurem", pokedexId: 646, detail: "Black Kyurem energy", priority: "High" },
      { name: "Necrozma", pokedexId: 800, detail: "Dusk Mane energy", priority: "High" },
      { name: "Reshiram", pokedexId: 643, detail: "5-star raid" },
      { name: "Gardevoir", pokedexId: 282, detail: "Mega raid" },
    ],
  },
  {
    id: "road-of-legends-july-9",
    title: "Road of Legends: Crown Forms",
    startDate: "2026-07-09",
    endDate: "2026-07-09",
    time: "6 PM – 8 PM",
    category: "Raid",
    summary: "Crowned Zacian, Crowned Zamazenta, and Mega Gengar.",
    details: ["Farm energy for Crown Sword Zacian and Crown Shield Zamazenta"],
    pokemon: [
      { name: "Zacian", pokedexId: 888, detail: "Crown Sword energy", priority: "High" },
      { name: "Zamazenta", pokedexId: 889, detail: "Crown Shield energy", priority: "High" },
      { name: "Gengar", pokedexId: 94, detail: "Mega raid" },
    ],
  },
  {
    id: "road-of-legends-july-10",
    title: "Road of Legends: Origin + Primal",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    category: "Raid",
    summary: "Origin Palkia, Origin Dialga, Primal Kyogre, and Primal Groudon.",
    details: [
      "Primal Kyogre and Primal Groudon energy farming",
      "Higher Premier Ball catch rate during Road of Legends",
      "2 free daily passes July 6–10",
    ],
    pokemon: [
      { name: "Palkia", pokedexId: 484, detail: "Origin Forme" },
      { name: "Dialga", pokedexId: 483, detail: "Origin Forme" },
      { name: "Kyogre", pokedexId: 382, detail: "Primal energy", priority: "High" },
      { name: "Groudon", pokedexId: 383, detail: "Primal energy", priority: "High" },
    ],
  },
  {
    id: "go-fest-2026-day-1",
    title: "Pokémon Go Fest 2026 Global: Day 1",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "10 AM – 7 PM",
    category: "Go Fest",
    summary: "Mega Mewtwo X day with rotating Ice/Electric/Fire, Psychic/Ghost/Water, and Flying/Rock/Dragon blocks.",
    details: [
      "10 AM–1 PM: Mega Ampharos, Mega Blaziken, Mega Abomasnow",
      "1–4 PM: Mega Alakazam, Mega Gengar, Mega Swampert",
      "4–7 PM: Mega Pidgeot, Mega Aerodactyl, Mega Salamence",
      "High priority: Rayquaza candy and missing Mega Pokédex entries",
    ],
    pokemon: [
      { name: "Mewtwo", pokedexId: 150, detail: "Mega Mewtwo X", priority: "High" },
      { name: "Ampharos", pokedexId: 181, detail: "Missing Mega Pokédex", priority: "High" },
      { name: "Blaziken", pokedexId: 257, detail: "Missing Mega Pokédex", priority: "High" },
      { name: "Abomasnow", pokedexId: 460, detail: "Missing Mega Pokédex", priority: "High" },
      { name: "Rayquaza", pokedexId: 384, detail: "Candy priority", priority: "High" },
    ],
  },
  {
    id: "go-fest-2026-day-2",
    title: "Pokémon Go Fest 2026 Global: Day 2",
    startDate: "2026-07-12",
    endDate: "2026-07-12",
    time: "10 AM – 7 PM",
    category: "Go Fest",
    summary: "Mega Mewtwo Y day with Ground/Steel/Normal, Poison/Bug/Grass, and Dark/Fairy/Fighting blocks.",
    details: [
      "10 AM–1 PM: Mega Metagross, Mega Garchomp, Mega Audino",
      "1–4 PM: Mega Sceptile is the key Mega need",
      "4–7 PM: Mega Lucario remains high priority",
    ],
    pokemon: [
      { name: "Mewtwo", pokedexId: 150, detail: "Mega Mewtwo Y", priority: "High" },
      { name: "Sceptile", pokedexId: 254, detail: "High-priority Mega", priority: "High" },
      { name: "Lucario", pokedexId: 448, detail: "High-priority Mega", priority: "High" },
      { name: "Garchomp", pokedexId: 445, detail: "Mega raid" },
      { name: "Metagross", pokedexId: 376, detail: "Mega raid" },
    ],
  },
  {
    id: "legendary-birds-mega-lucario-return",
    title: "Legendary Birds + Mega Lucario Return",
    startDate: "2026-07-13",
    endDate: "2026-07-14",
    category: "Raid",
    summary: "Articuno, Zapdos, Moltres, and Mega Lucario return after Go Fest.",
    details: ["Short encore raid window"],
    pokemon: [
      { name: "Articuno", pokedexId: 144 },
      { name: "Zapdos", pokedexId: 145 },
      { name: "Moltres", pokedexId: 146 },
      { name: "Lucario", pokedexId: 448, detail: "Mega raid", priority: "High" },
    ],
  },
  {
    id: "special-anniversary-pikachu-celebration",
    title: "Special Anniversary Pikachu Celebration",
    startDate: "2026-07-13",
    endDate: "2026-07-20",
    category: "Anniversary",
    summary: "A focused Pikachu celebration with multiple costume variants across the anniversary week.",
    details: [
      "Dapper Pikachu available for 3 teams",
      "Safari Hat Pikachu",
      "Varsity Hat Pikachu",
      "Amethyst Crown Pikachu",
      "World Championships Pikachu from 2022, 2023, and 2024",
    ],
    pokemon: [
      { name: "Pikachu", pokedexId: 25, detail: "Dapper Pikachu · 3 teams", priority: "High" },
      { name: "Pikachu", pokedexId: 25, detail: "Safari Hat Pikachu" },
      { name: "Pikachu", pokedexId: 25, detail: "Varsity Hat Pikachu" },
      { name: "Pikachu", pokedexId: 25, detail: "Amethyst Crown Pikachu" },
      { name: "Pikachu", pokedexId: 25, detail: "World Championships 2022" },
      { name: "Pikachu", pokedexId: 25, detail: "World Championships 2023" },
      { name: "Pikachu", pokedexId: 25, detail: "World Championships 2024" },
    ],
  },
  {
    id: "kyogre-mega-sceptile",
    title: "Kyogre + Mega Sceptile",
    startDate: "2026-07-15",
    endDate: "2026-07-21",
    category: "Raid",
    summary: "Kyogre and Mega Sceptile headline the raid rotation.",
    details: ["Good water legendary and grass Mega window"],
    pokemon: [
      { name: "Kyogre", pokedexId: 382 },
      { name: "Sceptile", pokedexId: 254, detail: "Mega raid" },
    ],
  },
  {
    id: "solgaleo-mega-salamence",
    title: "Solgaleo Shiny Debut + Mega Salamence",
    startDate: "2026-07-22",
    endDate: "2026-07-28",
    category: "Raid",
    summary: "Solgaleo shiny debut week with Mega Salamence.",
    details: ["Shiny Solgaleo debut", "Dragon Mega raid option"],
    pokemon: [
      { name: "Solgaleo", pokedexId: 791, detail: "Shiny debut", priority: "High" },
      { name: "Salamence", pokedexId: 373, detail: "Mega raid" },
    ],
  },
  {
    id: "kyurem-mega-aggron",
    title: "Kyurem + Mega Aggron",
    startDate: "2026-07-29",
    endDate: "2026-08-04",
    category: "Raid",
    summary: "Kyurem returns with Mega Aggron into early August.",
    details: ["Final listed schedule block"],
    pokemon: [
      { name: "Kyurem", pokedexId: 646 },
      { name: "Aggron", pokedexId: 306, detail: "Mega raid" },
    ],
  },
  {
    id: "mega-raichu-raid-day",
    title: "Super Mega Raid Day: Mega Raichu X and Y",
    startDate: "2026-07-18",
    endDate: "2026-07-18",
    category: "Raid",
    summary: "Mega Raichu X and Y raid day, 2-5pm.",
    details: ["Single-day raid feature"],
    pokemon: [{ name: "Raichu", pokedexId: 26, detail: "Mega Raichu X/Y" }],
  },
  {
    id: "mega-rayquaza-weekend",
    title: "Mega Rayquaza Weekend",
    startDate: "2026-07-25",
    endDate: "2026-07-26",
    category: "Raid",
    summary: "Mega Rayquaza weekend, obtain Meteorite and Rayquaza through special research.",
    details: ["High-value Dragon/Flying Mega weekend"],
    pokemon: [{ name: "Rayquaza", pokedexId: 384, detail: "Mega raid", priority: "High" }],
  },
];

export const getPokemonEventsForDate = (date: string) =>
  pokemonGoEvents.filter((event) => event.startDate <= date && event.endDate >= date);

export const formatPokemonEventDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${date}T00:00:00+09:00`));
