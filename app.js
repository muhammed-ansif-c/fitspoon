/* ==========================================================================
   FITSPOON - MADE FOR YOU GAIN
   Interactive Digital Menu, QR Ordering & Macro System Logic
   ========================================================================== */

// Complete Bowls Dataset extracted from screenshots
const BOWL_DATA = [
  {
    id: "classic-protein-bowl",
    number: 1,
    nameEn: "Classic Protein Bowl",
    nameMl: "ക്ലാസിക് പ്രോട്ടീൻ ബൗൾ",
    image: "images/classic_protein_bowl.jpg",
    category: ["all", "morning", "egg"],
    dietType: "egg", // 'veg' | 'egg'
    timingBadge: "🌅 Morning Hero",
    timingBadgeMl: "🌅 പ്രഭാത ഭക്ഷണം",
    proteinBadge: "~26g Protein",
    calories: "340 kcal",
    carbs: "38g",
    fats: "8g",
    ingredients: [
      { en: "2 Boiled Eggs", ml: "2 വേവിച്ച മുട്ട", highlight: true },
      { en: "50g Moong Sprouts", ml: "50g ചെറുപയർ", highlight: true },
      { en: "40g Chickpeas", ml: "40g കടല", highlight: true },
      { en: "50g Sweet Potato", ml: "50g മധുരക്കിഴങ്ങ്", highlight: true },
      { en: "Cucumber", ml: "കുക്കുമ്പർ", highlight: false },
      { en: "Tomato", ml: "തക്കാളി", highlight: false },
      { en: "Carrot", ml: "കാരറ്റ്", highlight: false }
    ],
    dressingEn: "Lemon + Cracked Black Pepper",
    dressingMl: "ഫ്രഷ് നാരങ്ങാനീര് + കുരുമുളക് പൊടി",
    prepMethodEn: "Chickpeas soaked overnight and boiled fresh. Moong sprouts gently steamed. Sweet potato boiled into soft cubes. Fresh vegetables sliced crisp and arranged neatly in bowl with lemon-pepper dressing.",
    prepMethodMl: "കടല രാത്രി വെള്ളത്തിൽ കുതിർത്ത് രാവിലെ വേവിക്കുക. ചെറുപയർ ചെറുതായി സ്റ്റീം ചെയ്യുക. മധുരക്കിഴങ്ങ് വേവിച്ച് ചെറിയ കഷ്ണങ്ങളാക്കുക. പച്ചക്കറികൾ ഫ്രഷ് ആയി അരിഞ്ഞ് ബൗളിൽ അലങ്കരിച്ച് നാരങ്ങാനീരും കുരുമുളകും ചേർക്കുക.",
    founderQuoteEn: "“ഇങ്ങനെ ചെയ്താൽ customer-ന് healthy salad മാത്രമല്ല, proper protein meal എന്ന feeling കിട്ടും.”",
    founderQuoteMl: "“ഇങ്ങനെ ചെയ്താൽ customer-ന് healthy salad മാത്രമല്ല, proper protein meal എന്ന feeling കിട്ടും.”",
    prices: {
      regular: 119,
      highProtein: 159,
      premium: 199
    }
  },
  {
    id: "green-high-protein-bowl",
    number: 2,
    nameEn: "Green High-Protein Bowl",
    nameMl: "ഗ്രീൻ ഹൈ-പ്രോട്ടീൻ ബൗൾ",
    image: "images/green_protein_bowl.jpg",
    category: ["all", "morning", "evening", "veg"],
    dietType: "veg",
    timingBadge: "🌱 100% Pure Veg",
    timingBadgeMl: "🌱 100% വെജ്",
    proteinBadge: "~28g Protein",
    calories: "360 kcal",
    carbs: "42g",
    fats: "6g",
    ingredients: [
      { en: "50g High-Protein Soya", ml: "50g സോയാ ചങ്ക്സ്", highlight: true },
      { en: "50g Chickpeas", ml: "50g കടല", highlight: true },
      { en: "60g Moong Sprouts", ml: "60g ചെറുപയർ", highlight: true },
      { en: "Fresh Guava Cubes", ml: "പേരയ്ക്ക", highlight: true },
      { en: "Cucumber", ml: "കുക്കുമ്പർ", highlight: false },
      { en: "Carrot", ml: "കാരറ്റ്", highlight: false },
      { en: "Tomato", ml: "തക്കാളി", highlight: false }
    ],
    dressingEn: "Lemon + Fresh Garden Mint Dressing",
    dressingMl: "നാരങ്ങാനീര് + ഫ്രഷ് പുതിനയില ഡ്രസ്സിംഗ്",
    prepMethodEn: "Soya chunks, chickpeas, and sprouts lightly steamed and chilled. Mixed with freshly chopped cucumber, carrot, tomato, and juicy guava cubes with a refreshing lemon-mint kick.",
    prepMethodMl: "സോയ, കടല, പയർ എന്നിവ വേവിച്ച് തണുപ്പിക്കുക. കുക്കുമ്പർ, കാരറ്റ്, തക്കാളി, പേരയ്ക്ക എന്നിവ ഫ്രഷ് ആയി ചേർത്ത് പുതിന-നാരങ്ങ ഡ്രസ്സിംഗ് നൽകുക.",
    founderQuoteEn: "👉 ഇത് 100% vegetarian high-protein bowl ആയി ആസ്വദിക്കാം.",
    founderQuoteMl: "👉 ഇത് pure vegetarian high-protein bowl ആയി നൽകാം.",
    prices: {
      regular: 129,
      highProtein: 169,
      premium: 209
    }
  },
  {
    id: "sweet-potato-protein-bowl",
    number: 3,
    nameEn: "Sweet Potato Protein Bowl",
    nameMl: "സ്വീറ്റ് പൊട്ടാറ്റോ പ്രോട്ടീൻ ബൗൾ",
    image: "images/sweet_potato_bowl.jpg",
    category: ["all", "morning", "egg"],
    dietType: "egg",
    timingBadge: "🍠 Energy & Sweet/Savoury",
    timingBadgeMl: "🍠 മധുരവും സ്വാദും",
    proteinBadge: "~24g Protein",
    calories: "385 kcal",
    carbs: "52g",
    fats: "7g",
    ingredients: [
      { en: "2 Boiled Eggs", ml: "2 മുട്ട", highlight: true },
      { en: "80g Sweet Potato", ml: "80g മധുരക്കിഴങ്ങ്", highlight: true },
      { en: "40g Chickpeas", ml: "40g കടല", highlight: true },
      { en: "40g Moong Sprouts", ml: "40g ചെറുപയർ", highlight: false },
      { en: "30g Sweet Corn", ml: "30g കോൺ", highlight: true },
      { en: "Crisp Apple", ml: "ആപ്പിൾ", highlight: true },
      { en: "Cucumber", ml: "കുക്കുമ്പർ", highlight: false }
    ],
    dressingEn: "Lemon Pepper & Citrus Drizzle",
    dressingMl: "നാരങ്ങാനീര് + പെപ്പർ ഡ്രെസ്സിംഗ്",
    prepMethodEn: "Tender boiled sweet potato pairs seamlessly with crisp apple matchsticks and sweet corn, balanced by savory chickpeas and eggs.",
    prepMethodMl: "Sweet potato + apple കാരണം ചെറിയ മധുരവും, chickpeas + egg കാരണം savoury taste-ഉം കിട്ടും.",
    founderQuoteEn: "Sweet potato + apple gives a subtle natural sweetness, while chickpeas + egg deliver rich savoury balance.",
    founderQuoteMl: "മധുരക്കിഴങ്ങും ആപ്പിളും ചേരുമ്പോൾ സ്വാഭാവിക മധുരവും മുട്ടയും കടലയും ചേരുമ്പോൾ നല്ല രുചിയും ലഭിക്കുന്നു.",
    prices: {
      regular: 129,
      highProtein: 169,
      premium: 209
    }
  },
  {
    id: "spicy-protein-bowl",
    number: 4,
    nameEn: "Spicy Protein Bowl",
    nameMl: "സ്പൈസി പ്രോട്ടീൻ ബൗൾ",
    image: "images/spicy_protein_bowl.jpg",
    category: ["all", "evening", "veg"],
    dietType: "spicy",
    timingBadge: "🌶️ Gym Goers' Favorite",
    timingBadgeMl: "🌶️ ജിം സ്പെഷ്യൽ",
    proteinBadge: "~27g Protein",
    calories: "355 kcal",
    carbs: "44g",
    fats: "5g",
    ingredients: [
      { en: "50g Soya Chunks", ml: "50g സോയാ ചങ്ക്സ്", highlight: true },
      { en: "40g Chickpeas", ml: "40g കടല", highlight: true },
      { en: "40g Sweet Corn", ml: "40g സ്വീറ്റ് കോൺ", highlight: true },
      { en: "Sweet Potato", ml: "മധുരക്കിഴങ്ങ്", highlight: true },
      { en: "Tomato", ml: "തക്കാളി", highlight: false },
      { en: "Cucumber", ml: "കുക്കുമ്പർ", highlight: false },
      { en: "Carrot", ml: "കാരറ്റ്", highlight: false }
    ],
    dressingEn: "Lemon + Chilli Flakes + Black Pepper + Black Salt",
    dressingMl: "നാരങ്ങ + ചില്ലി ഫ്ലേക്സ് + കുരുമുളക് + ഇന്തുപ്പ്",
    prepMethodEn: "High-protein soya and chickpeas tossed with steamed corn and roasted sweet potato, coated in a spicy crushed pepper and chilli-lemon punch.",
    prepMethodMl: "സോയയും കടലയും വേവിച്ച് ചില്ലി ഫ്ലേക്സ്, കുരുമുളക്, നാരങ്ങാനീര്, ഇന്തുപ്പ് എന്നിവ ചേർത്ത് തയ്യാറാക്കുന്നു.",
    founderQuoteEn: "👉 Gym പോകുന്നവർക്ക് spicy option ആയി ഇത് കൊടുക്കാം.",
    founderQuoteMl: "👉 ജിമ്മിൽ പോകുന്നവർക്ക് ഏറ്റവും അനുയോജ്യമായ സ്പൈസി ബൗൾ.",
    prices: {
      regular: 129,
      highProtein: 169,
      premium: 209
    }
  },
  {
    id: "fresh-fruit-protein-bowl",
    number: 5,
    nameEn: "Fresh Fruit Protein Bowl",
    nameMl: "ഫ്രഷ് ഫ്രൂട്ട് പ്രോട്ടീൻ ബൗൾ",
    image: "images/fresh_fruit_bowl.jpg",
    category: ["all", "morning", "egg", "fruit"],
    dietType: "egg",
    timingBadge: "🍎 Morning Breakfast Pick",
    timingBadgeMl: "🍎 പ്രഭാത സ്പെഷ്യൽ",
    proteinBadge: "~22g Protein",
    calories: "315 kcal",
    carbs: "46g",
    fats: "5g",
    ingredients: [
      { en: "2 Boiled Eggs", ml: "2 മുട്ട", highlight: true },
      { en: "Moong Sprouts", ml: "ചെറുപയർ", highlight: true },
      { en: "Chickpeas", ml: "കടല", highlight: false },
      { en: "Crisp Apple", ml: "ആപ്പിൾ", highlight: true },
      { en: "Fresh Guava", ml: "പേരയ്ക്ക", highlight: true },
      { en: "Pineapple", ml: "പൈനാപ്പിൾ", highlight: true },
      { en: "Orange Segments", ml: "ഓറഞ്ച്", highlight: true },
      { en: "Cucumber", ml: "കുക്കുമ്പർ", highlight: false }
    ],
    dressingEn: "Lemon + pinch of Himalayan Black Salt",
    dressingMl: "നാരങ്ങാനീര് + ചെറിയ അളവിൽ ഇന്തുപ്പ്",
    prepMethodEn: "A vitamin C and enzyme-packed bowl combining diced apples, tropical pineapple, sweet guava, and juicy oranges with protein-rich eggs and sprouts.",
    prepMethodMl: "ആപ്പിൾ, പൈനാപ്പിൾ, പേരയ്ക്ക, ഓറഞ്ച് എന്നിവ മുട്ടയും പയറും ചേർത്ത് നാരങ്ങാനീരും ഇന്തുപ്പും തൂവി തയ്യാറാക്കുന്നു.",
    founderQuoteEn: "👉 രാവിലെ breakfast ആയി ഏറ്റവും നല്ല option ആണ്.",
    founderQuoteMl: "👉 പ്രഭാതഭക്ഷണത്തിന് ഏറ്റവും ഉത്തമമായ പോഷക ബൗൾ.",
    prices: {
      regular: 139,
      highProtein: 179,
      premium: 219
    }
  },
  {
    id: "tropical-protein-bowl",
    number: 6,
    nameEn: "Tropical Protein Bowl",
    nameMl: "ട്രോപ്പിക്കൽ പ്രോട്ടീൻ ബൗൾ",
    image: "images/tropical_protein_bowl.jpg",
    category: ["all", "evening", "veg", "fruit"],
    dietType: "veg",
    timingBadge: "🍍 Tropical Freshness",
    timingBadgeMl: "🍍 ട്രോപ്പിക്കൽ സ്പെഷ്യൽ",
    proteinBadge: "~25g Protein",
    calories: "330 kcal",
    carbs: "48g",
    fats: "4g",
    ingredients: [
      { en: "High-Protein Soya", ml: "സോയാ ചങ്ക്സ്", highlight: true },
      { en: "Chickpeas", ml: "കടല", highlight: true },
      { en: "Sweet Potato", ml: "മധുരക്കിഴങ്ങ്", highlight: true },
      { en: "Juicy Pineapple", ml: "പൈനാപ്പിൾ", highlight: true },
      { en: "Watermelon Cubes", ml: "തണ്ണിമത്തൻ", highlight: true },
      { en: "Orange Slices", ml: "ഓറഞ്ച്", highlight: true },
      { en: "Cucumber", ml: "കുക്കുമ്പർ", highlight: false },
      { en: "Carrot", ml: "കാരറ്റ്", highlight: false }
    ],
    dressingEn: "Lemon + Mint + Black Pepper",
    dressingMl: "നാരങ്ങ + പുതിന + കുരുമുളക്",
    prepMethodEn: "Succulent tropical fruits meet plant protein. Crisp watermelon and pineapple cubes balanced by warm sweet potato and soya with cool mint dressing.",
    prepMethodMl: "സോയ, കടല, മധുരക്കിഴങ്ങ് എന്നിവ പഴങ്ങളോടൊപ്പം ചേർത്ത് നാരങ്ങ-പുതിന ഡ്രസ്സിംഗിൽ നൽകുന്നു.",
    founderQuoteEn: "👉 വളരെ fresh ആയിട്ടുള്ള taste ആയിരിക്കും.",
    founderQuoteMl: "👉 വളരെ ഫ്രഷ് ആയ സ്വാദും ഉന്മേഷവും നൽകുന്നു.",
    prices: {
      regular: 139,
      highProtein: 179,
      premium: 219
    }
  },
  {
    id: "summer-fresh-bowl",
    number: 7,
    nameEn: "Summer Fresh Bowl",
    nameMl: "സമ്മർ ഫ്രഷ് ബൗൾ",
    image: "images/summer_fresh_bowl.jpg",
    category: ["all", "morning", "egg", "fruit"],
    dietType: "egg",
    timingBadge: "🍉 Light & Hydrating",
    timingBadgeMl: "🍉 ലൈറ്റ് മീൽ",
    proteinBadge: "~21g Protein",
    calories: "285 kcal",
    carbs: "36g",
    fats: "5g",
    ingredients: [
      { en: "2 Boiled Eggs", ml: "2 മുട്ട", highlight: true },
      { en: "Moong Sprouts", ml: "ചെറുപയർ", highlight: true },
      { en: "Chickpeas", ml: "കടല", highlight: true },
      { en: "Cucumber", ml: "കുക്കുമ്പർ", highlight: false },
      { en: "Juicy Watermelon", ml: "തണ്ണിമത്തൻ", highlight: true },
      { en: "Pink Guava", ml: "പേരയ്ക്ക", highlight: true },
      { en: "Fresh Orange", ml: "ഓറഞ്ച്", highlight: false },
      { en: "Carrot", ml: "കാരറ്റ്", highlight: false }
    ],
    dressingEn: "Fresh Mint & Citrus Himalayan Salt",
    dressingMl: "പുതിന + നാരങ്ങാനീര് + ഇന്തുപ്പ്",
    prepMethodEn: "High-hydration fruits like watermelon and cucumber teamed with boiled country eggs and sprouted moong for light, clean post-run energy.",
    prepMethodMl: "തണ്ണിമത്തനും കുക്കുമ്പറും മുട്ടയും ചേർത്ത് വേനൽക്കാലത്ത് ശരീരത്തിന് കുളിർമയും പ്രോട്ടീനും നൽകുന്ന ലൈറ്റ് മീൽ.",
    founderQuoteEn: "👉 Light meal ആഗ്രഹിക്കുന്നവർക്ക് കൊടുക്കാം.",
    founderQuoteMl: "👉 ലൈറ്റ് മീൽ ആഗ്രഹിക്കുന്നവർക്ക് ഏറ്റവും അനുയോജ്യം.",
    prices: {
      regular: 119,
      highProtein: 159,
      premium: 199
    }
  }
];

// Application State
const state = {
  currentLang: "en", // 'en' | 'ml'
  activeFilter: "all",
  searchQuery: "",
  selectedTiers: {}, // { 'bowlId': 'regular' | 'highProtein' | 'premium' }
  tray: [] // [{ bowlId, tier, price, qty, nameEn, nameMl, image }]
};

// Initialize default tiers for all bowls
BOWL_DATA.forEach(bowl => {
  state.selectedTiers[bowl.id] = "highProtein"; // High protein is the popular choice!
});

// Load Tray from localStorage if exists
try {
  const savedTray = localStorage.getItem("fitspoon_tray");
  if (savedTray) {
    state.tray = JSON.parse(savedTray);
  }
} catch (e) {
  console.warn("Could not read tray from localStorage", e);
}

// ==========================================================================
// DOM Elements
// ==========================================================================
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilterBtns = document.querySelectorAll(".filter-chip");
const langToggleBtn = document.getElementById("langToggleBtn");
const langLabel = document.getElementById("langLabel");
const mobileLangLabel = document.getElementById("mobileLangLabel");

// Tray Drawer Elements
const openTrayBtn = document.getElementById("openTrayBtn");
const closeTrayBtn = document.getElementById("closeTrayBtn");
const trayDrawer = document.getElementById("trayDrawer");
const trayBackdrop = document.getElementById("trayBackdrop");
const trayDrawerBody = document.getElementById("trayDrawerBody");
const trayTotalPrice = document.getElementById("trayTotalPrice");
const trayCountBadge = document.getElementById("trayCountBadge");
const mobileTrayCount = document.getElementById("mobileTrayCount");
const whatsappCheckoutBtn = document.getElementById("whatsappCheckoutBtn");
const showTokenBtn = document.getElementById("showTokenBtn");

// QR Standee Modal Elements
const openQrModalBtn = document.getElementById("openQrModalBtn");
const closeQrModalBtn = document.getElementById("closeQrModalBtn");
const qrStandeeModal = document.getElementById("qrStandeeModal");
const qrModalBackdrop = document.getElementById("qrModalBackdrop");

// Product Modal Elements
const productModal = document.getElementById("productModal");
const productModalBackdrop = document.getElementById("productModalBackdrop");
const closeProductModalBtn = document.getElementById("closeProductModalBtn");
const modalDynamicContent = document.getElementById("modalDynamicContent");

// Token Modal Elements
const tokenModal = document.getElementById("tokenModal");
const tokenModalBackdrop = document.getElementById("tokenModalBackdrop");
const closeTokenModalBtn = document.getElementById("closeTokenModalBtn");
const displayTokenNumber = document.getElementById("displayTokenNumber");
const displayTokenSummary = document.getElementById("displayTokenSummary");

// Macro Calculator Elements
const userWeightInput = document.getElementById("userWeight");
const fitnessGoalSelect = document.getElementById("fitnessGoal");
const targetProteinVal = document.getElementById("targetProteinVal");
const calcHintText = document.getElementById("calcHintText");

// Toast
const toastNotification = document.getElementById("toastNotification");
const toastMessage = document.getElementById("toastMessage");

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderBowls();
  updateTrayUI();
  setupEventListeners();
  calculateTargetProtein();
});

// ==========================================================================
// Render Products Grid
// ==========================================================================
function renderBowls() {
  const query = state.searchQuery.toLowerCase().trim();
  const filter = state.activeFilter;
  const isMl = state.currentLang === "ml";

  const filtered = BOWL_DATA.filter(bowl => {
    // Filter match
    const matchesCategory = filter === "all" || bowl.category.includes(filter);

    // Search match (checks English name, Malayalam name, and ingredient names)
    const matchesSearch = !query || 
      bowl.nameEn.toLowerCase().includes(query) ||
      bowl.nameMl.toLowerCase().includes(query) ||
      bowl.ingredients.some(i => i.en.toLowerCase().includes(query) || i.ml.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 16px; color: #64748b;">
        <i class="fa-solid fa-seedling" style="font-size: 38px; color: #a7f3d0; margin-bottom: 12px; display: block;"></i>
        <h4 style="font-size: 18px; color: #1e293b; margin-bottom: 6px;">${isMl ? "ബൗളുകൾ കണ്ടെത്താനായില്ല" : "No bowls found matching your search"}</h4>
        <p style="font-size: 14px;">${isMl ? "മറ്റൊരു വാക്ക് ഉപയോഗിച്ച് തിരയുക അല്ലെങ്കിൽ ഫിൽട്ടർ മാറ്റുക." : "Try searching for another ingredient or change the category filter."}</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(bowl => {
    const selectedTier = state.selectedTiers[bowl.id] || "highProtein";
    const currentPrice = bowl.prices[selectedTier];

    // Diet badge icon & text
    let dietBadgeHtml = "";
    if (bowl.dietType === "veg") {
      dietBadgeHtml = `<span class="badge-dietary veg"><span class="diet-dot"></span> Pure Veg</span>`;
    } else if (bowl.dietType === "spicy") {
      dietBadgeHtml = `<span class="badge-dietary spicy"><span class="diet-dot"></span> Spicy Fuel</span>`;
    } else {
      dietBadgeHtml = `<span class="badge-dietary egg"><span class="diet-dot"></span> Contains Egg</span>`;
    }

    // Ingredients pills
    const ingredientsHtml = bowl.ingredients.map(ing => {
      const label = isMl ? ing.ml : ing.en;
      return `<span class="ingredient-pill ${ing.highlight ? 'highlight' : ''}">${label}</span>`;
    }).join("");

    return `
      <article class="bowl-card" id="card-${bowl.id}">
        <!-- Image Wrap -->
        <div class="card-image-wrap" onclick="openBowlDetailModal('${bowl.id}')">
          <img src="${bowl.image}" alt="${bowl.nameEn}" class="bowl-img" loading="lazy">
          
          <div class="card-badges-top">
            ${dietBadgeHtml}
            <span class="badge-timing">${isMl ? bowl.timingBadgeMl : bowl.timingBadge}</span>
          </div>

          <div class="badge-protein-corner">
            <i class="fa-solid fa-bolt"></i>
            <span>${bowl.proteinBadge}</span>
          </div>
        </div>

        <!-- Body Content -->
        <div class="card-content">
          <div class="card-title-row">
            <h4 class="bowl-name-en">${bowl.number}. ${isMl ? bowl.nameMl : bowl.nameEn}</h4>
            <div class="bowl-name-ml">${isMl ? bowl.nameEn : bowl.nameMl}</div>
          </div>

          <!-- Macros Quick Bar -->
          <div class="card-macros-strip">
            <span class="macro-tag"><i class="fa-solid fa-fire text-warning"></i> <strong>${bowl.calories}</strong></span>
            <span class="macro-tag"><i class="fa-solid fa-wheat-awn text-accent"></i> Carbs: <strong>${bowl.carbs}</strong></span>
            <span class="macro-tag"><i class="fa-solid fa-droplet text-danger"></i> Healthy Fats: <strong>${bowl.fats}</strong></span>
          </div>

          <!-- Ingredients List -->
          <span class="ingredients-section-label">${isMl ? "ചേരുവകൾ (Ingredients)" : "Key Ingredients"}</span>
          <div class="ingredients-pills-wrap">
            ${ingredientsHtml}
          </div>

          <!-- Dressing Note -->
          <div class="dressing-box">
            <i class="fa-solid fa-lemon"></i>
            <span><strong>${isMl ? "ഡ്രസ്സിംഗ്:" : "Dressing:"}</strong> ${isMl ? bowl.dressingMl : bowl.dressingEn}</span>
          </div>

          <!-- Founder Tip / Taste Note -->
          <div class="benefit-quote">
            ${isMl ? bowl.founderQuoteMl : bowl.founderQuoteEn}
          </div>

          <!-- Portion Size / Pricing Selector -->
          <div class="card-tier-selector">
            <div class="tier-options-group">
              <button type="button" class="tier-btn ${selectedTier === 'regular' ? 'selected' : ''}" onclick="selectBowlTier('${bowl.id}', 'regular')">
                <span class="tier-btn-label">${isMl ? "റെഗുലർ" : "Regular"}</span>
                <span class="tier-btn-price">₹${bowl.prices.regular}</span>
              </button>
              <button type="button" class="tier-btn ${selectedTier === 'highProtein' ? 'selected' : ''}" onclick="selectBowlTier('${bowl.id}', 'highProtein')">
                <span class="tier-btn-label">${isMl ? "ഹൈ പ്രോട്ടീൻ" : "High Pro"}</span>
                <span class="tier-btn-price">₹${bowl.prices.highProtein}</span>
              </button>
              <button type="button" class="tier-btn ${selectedTier === 'premium' ? 'selected' : ''}" onclick="selectBowlTier('${bowl.id}', 'premium')">
                <span class="tier-btn-label">${isMl ? "പ്രീമിയം" : "Premium"}</span>
                <span class="tier-btn-price">₹${bowl.prices.premium}</span>
              </button>
            </div>

            <!-- Action Buttons -->
            <div class="card-actions-row">
              <button type="button" class="btn-add-tray" onclick="addToTray('${bowl.id}')">
                <i class="fa-solid fa-plus"></i>
                <span>${isMl ? "ട്രേയിൽ ചേർക്കുക" : "Add to Tray"} • ₹${currentPrice}</span>
              </button>
              <button type="button" class="btn-view-details" title="${isMl ? 'വിശദാംശങ്ങൾ കാണുക' : 'View full recipe'}" onclick="openBowlDetailModal('${bowl.id}')">
                <i class="fa-solid fa-circle-info"></i>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// ==========================================================================
// Interactive Actions: Tier Selection & Tray Management
// ==========================================================================
function selectBowlTier(bowlId, tier) {
  state.selectedTiers[bowlId] = tier;
  renderBowls();
}

function addToTray(bowlId) {
  const bowl = BOWL_DATA.find(b => b.id === bowlId);
  if (!bowl) return;

  const tier = state.selectedTiers[bowlId] || "highProtein";
  const price = bowl.prices[tier];

  // Check if item with same bowlId and tier already exists in tray
  const existingItem = state.tray.find(item => item.bowlId === bowlId && item.tier === tier);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    state.tray.push({
      bowlId: bowl.id,
      nameEn: bowl.nameEn,
      nameMl: bowl.nameMl,
      image: bowl.image,
      tier: tier,
      price: price,
      qty: 1
    });
  }

  saveTray();
  updateTrayUI();

  // Show Toast
  const tierName = tier === 'regular' ? 'Regular' : (tier === 'highProtein' ? 'High Protein' : 'Premium');
  const itemName = state.currentLang === 'ml' ? bowl.nameMl : bowl.nameEn;
  showToast(`Added ${itemName} (${tierName}) to your tray!`);
}

function updateItemQty(index, change) {
  if (state.tray[index]) {
    state.tray[index].qty += change;
    if (state.tray[index].qty <= 0) {
      state.tray.splice(index, 1);
    }
  }
  saveTray();
  updateTrayUI();
}

function removeTrayItem(index) {
  state.tray.splice(index, 1);
  saveTray();
  updateTrayUI();
}

function saveTray() {
  try {
    localStorage.setItem("fitspoon_tray", JSON.stringify(state.tray));
  } catch (e) {
    console.warn("localStorage error", e);
  }
}

function updateTrayUI() {
  const totalCount = state.tray.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = state.tray.reduce((acc, item) => acc + (item.price * item.qty), 0);

  // Update badge count
  trayCountBadge.textContent = totalCount;
  mobileTrayCount.textContent = totalCount;
  trayTotalPrice.textContent = `₹${totalPrice}`;

  // Animate badge
  trayCountBadge.style.transform = "scale(1.3)";
  mobileTrayCount.style.transform = "scale(1.3)";
  setTimeout(() => {
    trayCountBadge.style.transform = "scale(1)";
    mobileTrayCount.style.transform = "scale(1)";
  }, 200);

  const isMl = state.currentLang === "ml";

  // Render Drawer Items
  if (state.tray.length === 0) {
    trayDrawerBody.innerHTML = `
      <div class="empty-tray-view">
        <i class="fa-solid fa-bowl-food"></i>
        <h4>${isMl ? "നിങ്ങളുടെ ട്രേ കാലിയാണ്" : "Your tray is currently empty"}</h4>
        <p>${isMl ? "മെനുവിൽ നിന്ന് പുതിയ പ്രോട്ടീൻ ബൗളുകൾ തിരഞ്ഞെടുക്കൂ!" : "Explore our menu and add wholesome protein bowls crafted fresh for your gains."}</p>
        <button class="btn-start-exploring" onclick="closeTrayDrawer(); document.getElementById('menuSection').scrollIntoView({behavior: 'smooth'})">
          ${isMl ? "മെനു കാണുക" : "Explore Bowls"}
        </button>
      </div>
    `;
    whatsappCheckoutBtn.style.display = "none";
    showTokenBtn.style.display = "none";
  } else {
    whatsappCheckoutBtn.style.display = "flex";
    showTokenBtn.style.display = "flex";

    trayDrawerBody.innerHTML = state.tray.map((item, index) => {
      const tierLabel = item.tier === 'regular' ? (isMl ? 'റെഗുലർ' : 'Regular') : 
                       (item.tier === 'highProtein' ? (isMl ? 'ഹൈ പ്രോട്ടീൻ' : 'High Protein') : 
                       (isMl ? 'പ്രീമിയം' : 'Premium'));

      const name = isMl ? item.nameMl : item.nameEn;

      return `
        <div class="tray-item-row">
          <img src="${item.image}" alt="${item.nameEn}" class="tray-item-thumb">
          <div class="tray-item-info">
            <h5 class="tray-item-name">${name}</h5>
            <span class="tray-item-tier">${tierLabel}</span>
            <div class="tray-item-pricing">
              <span class="tray-item-price">₹${item.price * item.qty}</span>
              <div class="qty-control">
                <button type="button" class="qty-btn" onclick="updateItemQty(${index}, -1)" aria-label="Decrease quantity">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="qty-number">${item.qty}</span>
                <button type="button" class="qty-btn" onclick="updateItemQty(${index}, 1)" aria-label="Increase quantity">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <button type="button" class="tray-remove-item" onclick="removeTrayItem(${index})" title="Remove item">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
    }).join("");
  }
}

// ==========================================================================
// Modals & Drawers Control
// ==========================================================================
function openTrayDrawer() {
  trayDrawer.classList.add("open");
  trayBackdrop.classList.add("active");
  trayDrawer.setAttribute("aria-hidden", "false");
}

function closeTrayDrawer() {
  trayDrawer.classList.remove("open");
  trayBackdrop.classList.remove("active");
  trayDrawer.setAttribute("aria-hidden", "true");
}

function openBowlDetailModal(bowlId) {
  const bowl = BOWL_DATA.find(b => b.id === bowlId);
  if (!bowl) return;

  const isMl = state.currentLang === "ml";
  const selectedTier = state.selectedTiers[bowlId] || "highProtein";

  modalDynamicContent.innerHTML = `
    <img src="${bowl.image}" alt="${bowl.nameEn}" class="modal-hero-img">
    <div class="modal-body-pad">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 8px;">
        <div>
          <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: #111827;">
            ${bowl.number}. ${isMl ? bowl.nameMl : bowl.nameEn}
          </h3>
          <span style="font-size: 13.5px; font-weight: 600; color: #2e7d32;">${isMl ? bowl.nameEn : bowl.nameMl}</span>
        </div>
        <span class="badge-protein-corner" style="position: static;">
          <i class="fa-solid fa-bolt"></i> ${bowl.proteinBadge}
        </span>
      </div>

      <p style="font-size: 13.5px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
        ${isMl ? bowl.prepMethodMl : bowl.prepMethodEn}
      </p>

      <div class="modal-recipe-box">
        <strong><i class="fa-solid fa-list-check text-success"></i> ${isMl ? "ചേരുവകൾ (Exact Breakdown):" : "Full Recipe & Ingredients:"}</strong>
        <ul style="margin-left: 18px; margin-top: 6px;">
          ${bowl.ingredients.map(i => `<li>${isMl ? i.ml : i.en}</li>`).join("")}
        </ul>
      </div>

      <div class="dressing-box" style="margin-bottom: 16px;">
        <i class="fa-solid fa-lemon"></i>
        <span><strong>${isMl ? "ഡ്രസ്സിംഗ്:" : "Special Dressing:"}</strong> ${isMl ? bowl.dressingMl : bowl.dressingEn}</span>
      </div>

      <div class="benefit-quote" style="margin-bottom: 20px;">
        ${isMl ? bowl.founderQuoteMl : bowl.founderQuoteEn}
      </div>

      <!-- Quick Add from Modal -->
      <button class="btn-add-tray" style="width: 100%; padding: 13px; font-size: 14px;" onclick="addToTray('${bowl.id}'); closeBowlModal();">
        <i class="fa-solid fa-plus"></i>
        <span>${isMl ? "ഈ ബൗൾ ട്രേയിൽ ചേർക്കുക" : "Add to Tray"} • ₹${bowl.prices[selectedTier]}</span>
      </button>
    </div>
  `;

  productModal.classList.add("open");
  productModalBackdrop.classList.add("active");
  productModal.setAttribute("aria-hidden", "false");
}

function closeBowlModal() {
  productModal.classList.remove("open");
  productModalBackdrop.classList.remove("active");
  productModal.setAttribute("aria-hidden", "true");
}

function openQrStandeeModal() {
  qrStandeeModal.classList.add("open");
  qrModalBackdrop.classList.add("active");
  qrStandeeModal.setAttribute("aria-hidden", "false");
}

function closeQrStandeeModal() {
  qrStandeeModal.classList.remove("open");
  qrModalBackdrop.classList.remove("active");
  qrStandeeModal.setAttribute("aria-hidden", "true");
}

function openTokenModal() {
  if (state.tray.length === 0) {
    showToast("Please add at least one bowl to generate a token!");
    return;
  }

  // Generate random token number
  const randomNum = Math.floor(10 + Math.random() * 90);
  displayTokenNumber.textContent = `#FS-${randomNum}`;

  const isMl = state.currentLang === "ml";
  const itemsList = state.tray.map(item => {
    const tierName = item.tier === 'regular' ? 'Regular' : (item.tier === 'highProtein' ? 'High Protein' : 'Premium');
    return `<div>• <strong>${item.qty}x</strong> ${isMl ? item.nameMl : item.nameEn} (${tierName}) — ₹${item.price * item.qty}</div>`;
  }).join("");

  const totalPrice = state.tray.reduce((acc, item) => acc + (item.price * item.qty), 0);

  displayTokenSummary.innerHTML = `
    ${itemsList}
    <div style="margin-top: 8px; pt-2; border-top: 1px dashed #cbd5e1; font-weight: 800; color: #166534;">
      Total: ₹${totalPrice}
    </div>
  `;

  tokenModal.classList.add("open");
  tokenModalBackdrop.classList.add("active");
  tokenModal.setAttribute("aria-hidden", "false");
  closeTrayDrawer();
}

function closeTokenModal() {
  tokenModal.classList.remove("open");
  tokenModalBackdrop.classList.remove("active");
  tokenModal.setAttribute("aria-hidden", "true");
}

// ==========================================================================
// WhatsApp Order Generator
// ==========================================================================
function sendWhatsAppOrder() {
  if (state.tray.length === 0) {
    showToast("Your tray is empty!");
    return;
  }

  const tokenNum = Math.floor(10 + Math.random() * 90);
  let message = `*Fitspoon Counter Order (#FS-${tokenNum})*%0A`;
  message += `_Made for you gain_%0A%0A`;
  message += `*Items Ordered:*%0A`;

  state.tray.forEach(item => {
    const tier = item.tier === 'regular' ? 'Regular' : (item.tier === 'highProtein' ? 'High Protein' : 'Premium');
    message += `• ${item.qty}x ${item.nameEn} [${tier}] - ₹${item.price * item.qty}%0A`;
  });

  const total = state.tray.reduce((acc, item) => acc + (item.price * item.qty), 0);
  message += `%0A*Total Amount:* ₹${total}%0A`;
  message += `*Pickup:* Counter Pickup / Fresh Order%0A%0A`;
  message += `Please prepare my fresh bowl! 💪🥗`;

  const waUrl = `https://wa.me/917561857049?text=${message}`;
  window.open(waUrl, "_blank");
}

// ==========================================================================
// Language Switcher
// ==========================================================================
function toggleLanguage() {
  state.currentLang = state.currentLang === "en" ? "ml" : "en";
  document.body.setAttribute("data-lang", state.currentLang);

  if (state.currentLang === "ml") {
    langLabel.textContent = "English";
    mobileLangLabel.textContent = "English";
  } else {
    langLabel.textContent = "മലയാളം";
    mobileLangLabel.textContent = "മലയാളം";
  }

  // Update all data-en / data-ml text elements
  document.querySelectorAll("[data-en][data-ml]").forEach(el => {
    if (state.currentLang === "ml") {
      el.textContent = el.getAttribute("data-ml");
    } else {
      el.textContent = el.getAttribute("data-en");
    }
  });

  // Update search input placeholder
  if (state.currentLang === "ml") {
    searchInput.placeholder = searchInput.getAttribute("data-ml-ph");
  } else {
    searchInput.placeholder = searchInput.getAttribute("data-en-ph");
  }

  // Re-render bowls with updated language
  renderBowls();
  updateTrayUI();
}

// ==========================================================================
// Macro Calculator
// ==========================================================================
function calculateTargetProtein() {
  const weight = parseFloat(userWeightInput.value) || 65;
  const goal = fitnessGoalSelect.value;

  let multiplier = 1.6;
  if (goal === "maintenance") multiplier = 1.2;
  if (goal === "fat_loss") multiplier = 1.6;
  if (goal === "muscle_gain") multiplier = 2.0;

  const target = Math.round(weight * multiplier);
  targetProteinVal.textContent = target;

  if (goal === "muscle_gain") {
    calcHintText.textContent = `2 Fitspoon High-Protein Bowls provide ~56g-64g clean bioavailable protein toward your ${target}g goal!`;
  } else if (goal === "fat_loss") {
    calcHintText.textContent = `High-fiber Moong sprouts & chickpeas keep you full for 4-5 hours while burning fat.`;
  } else {
    calcHintText.textContent = `1 Fitspoon Fresh Bowl provides balanced energy without feeling heavy or sluggish.`;
  }
}

// ==========================================================================
// Toast Notification
// ==========================================================================
let toastTimeout;
function showToast(msg) {
  clearTimeout(toastTimeout);
  toastMessage.textContent = msg;
  toastNotification.classList.add("show");
  toastTimeout = setTimeout(() => {
    toastNotification.classList.remove("show");
  }, 2600);
}

// ==========================================================================
// Event Listeners
// ==========================================================================
function setupEventListeners() {
  // Search
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderBowls();
  });

  // Filter chips
  categoryFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryFilterBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      state.activeFilter = btn.getAttribute("data-filter");
      renderBowls();
    });
  });

  // Language toggle
  langToggleBtn.addEventListener("click", toggleLanguage);

  // Tray Drawer
  openTrayBtn.addEventListener("click", openTrayDrawer);
  closeTrayBtn.addEventListener("click", closeTrayDrawer);
  trayBackdrop.addEventListener("click", closeTrayDrawer);

  // QR Modal
  openQrModalBtn.addEventListener("click", openQrStandeeModal);
  closeQrModalBtn.addEventListener("click", closeQrStandeeModal);
  qrModalBackdrop.addEventListener("click", closeQrStandeeModal);

  // Product Modal
  closeProductModalBtn.addEventListener("click", closeBowlModal);
  productModalBackdrop.addEventListener("click", closeBowlModal);

  // Token Modal
  showTokenBtn.addEventListener("click", openTokenModal);
  closeTokenModalBtn.addEventListener("click", closeTokenModal);
  tokenModalBackdrop.addEventListener("click", closeTokenModal);

  // WhatsApp Checkout
  whatsappCheckoutBtn.addEventListener("click", sendWhatsAppOrder);

  // Calculator inputs
  userWeightInput.addEventListener("input", calculateTargetProtein);
  fitnessGoalSelect.addEventListener("change", calculateTargetProtein);

  // Escape key to close any open modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeTrayDrawer();
      closeBowlModal();
      closeQrStandeeModal();
      closeTokenModal();
    }
  });
}
