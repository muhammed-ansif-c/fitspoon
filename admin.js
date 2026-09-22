/* ==========================================================================
   FITSPOON ADMIN PANEL LOGIC
   Password: fitspoon2026  (change this in ADMIN_PASSWORD below)
   ========================================================================== */

const ADMIN_PASSWORD   = "fitspoon2026";
const STORAGE_KEY      = "fitspoon_menu_data";
const SITE_SETTINGS_KEY = "fitspoon_site_settings";

function getSiteSettings() {
  try {
    const saved = localStorage.getItem(SITE_SETTINGS_KEY);
    if (saved) return Object.assign({}, DEFAULT_SITE_SETTINGS, JSON.parse(saved));
  } catch(e) {}
  return Object.assign({}, DEFAULT_SITE_SETTINGS);
}

// ── Auth ──────────────────────────────────────────────────────────────────

const loginScreen  = document.getElementById("loginScreen");
const adminPanel   = document.getElementById("adminPanel");
const passwordInput = document.getElementById("passwordInput");
const loginBtn     = document.getElementById("loginBtn");
const loginError   = document.getElementById("loginError");
const logoutBtn    = document.getElementById("logoutBtn");
const togglePwdBtn = document.getElementById("togglePwdBtn");

function checkSession() {
  if (sessionStorage.getItem("fs_admin") === "1") showPanel();
}

loginBtn.addEventListener("click", doLogin);
passwordInput.addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });

function doLogin() {
  if (passwordInput.value === ADMIN_PASSWORD) {
    sessionStorage.setItem("fs_admin", "1");
    loginError.classList.remove("show");
    showPanel();
  } else {
    loginError.classList.add("show");
    passwordInput.value = "";
    passwordInput.focus();
  }
}

togglePwdBtn.addEventListener("click", () => {
  const isText = passwordInput.type === "text";
  passwordInput.type = isText ? "password" : "text";
  togglePwdBtn.innerHTML = isText
    ? '<i class="fa-solid fa-eye"></i>'
    : '<i class="fa-solid fa-eye-slash"></i>';
});

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("fs_admin");
  adminPanel.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  passwordInput.value = "";
});

function showPanel() {
  loginScreen.classList.add("hidden");
  adminPanel.classList.remove("hidden");
  loadAndRender();
  initTabs();
  loadSettingsIntoForms();
}

// ── Data Layer ────────────────────────────────────────────────────────────

function getMenuData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch(e) {}
  // Fall back to the hardcoded BOWL_DATA from app.js
  return JSON.parse(JSON.stringify(BOWL_DATA));
}

function saveMenuData(data) {
  // Reassign sequential numbers
  data.forEach((b, i) => { b.number = i + 1; });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Render Admin Grid ─────────────────────────────────────────────────────

const adminGrid = document.getElementById("adminGrid");
const statTotal = document.getElementById("statTotal");
const statVeg   = document.getElementById("statVeg");
const statEgg   = document.getElementById("statEgg");
const statSpicy = document.getElementById("statSpicy");

function loadAndRender() {
  const data = getMenuData();

  statTotal.textContent = data.length;
  statVeg.textContent   = data.filter(b => b.dietType === "veg").length;
  statEgg.textContent   = data.filter(b => b.dietType === "egg").length;
  statSpicy.textContent = data.filter(b => b.dietType === "spicy").length;

  adminGrid.innerHTML = data.map((bowl, idx) => {
    const dietLabel = bowl.dietType === "veg" ? "🌱 Pure Veg"
                    : bowl.dietType === "spicy" ? "🌶️ Spicy"
                    : "🥚 Contains Egg";

    const cats = (bowl.category || []).filter(c => c !== "all").map(c =>
      `<span class="cat-pill">${c}</span>`
    ).join("");

    const imgHtml = bowl.image
      ? `<img class="admin-card-image" src="${bowl.image}" alt="${bowl.nameEn}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : "";
    const placeholder = `<div class="admin-card-image-placeholder" style="${bowl.image ? 'display:none' : ''}">🥗</div>`;

    return `
      <div class="admin-bowl-card">
        ${imgHtml}
        ${placeholder}
        <div class="admin-card-body">
          <div class="admin-card-top">
            <div>
              <div class="admin-bowl-name">${bowl.number}. ${bowl.nameEn}</div>
              ${bowl.nameMl ? `<div class="admin-bowl-name-ml">${bowl.nameMl}</div>` : ""}
            </div>
            <span class="badge-diet ${bowl.dietType}">${dietLabel}</span>
          </div>
          <div class="admin-card-prices">
            <div class="price-tag"><span>Reg</span> ₹${bowl.prices?.regular || "-"}</div>
            <div class="price-tag"><span>Hi-Pro</span> ₹${bowl.prices?.highProtein || "-"}</div>
            <div class="price-tag"><span>Prem</span> ₹${bowl.prices?.premium || "-"}</div>
          </div>
          <div class="admin-card-cats">${cats}</div>
        </div>
        <div class="admin-card-actions">
          <button class="btn-edit-bowl" onclick="openEditModal(${idx})">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
          <button class="btn-delete-bowl" onclick="openDeleteConfirm(${idx})">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </div>
      </div>
    `;
  }).join("");

  if (data.length === 0) {
    adminGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#94a3b8">
        <i class="fa-solid fa-bowl-food" style="font-size:48px;margin-bottom:12px;display:block;color:#cbd5e1"></i>
        <p style="font-size:15px;font-weight:600">No bowls yet. Add your first bowl!</p>
      </div>
    `;
  }
}

// ── Tabs ──────────────────────────────────────────────────────────────────

function initTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
    });
  });
}

// ── Site Settings: Load into forms ───────────────────────────────────────

function loadSettingsIntoForms() {
  const s = getSiteSettings();
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ""; };

  // Brand
  set("s_brandName",        s.brandName);
  set("s_brandTagline",     s.brandTagline);
  // Announcement
  set("s_announcementText", s.announcementText);
  set("s_morningHours",     s.morningHours);
  set("s_eveningHours",     s.eveningHours);
  // Hero
  set("s_heroBadge",        s.heroBadge);
  set("s_heroHeading",      s.heroHeading);
  set("s_heroSubheading",   s.heroSubheading);
  set("s_heroBannerImage",  s.heroBannerImage);
  set("s_heroRegularLabel", s.heroRegularLabel);
  set("s_heroRegularPrice", s.heroRegularPrice);
  set("s_heroHighLabel",    s.heroHighLabel);
  set("s_heroHighPrice",    s.heroHighPrice);
  set("s_heroHighBadge",    s.heroHighBadge);
  set("s_heroPremiumLabel", s.heroPremiumLabel);
  set("s_heroPremiumPrice", s.heroPremiumPrice);
  set("s_meta1",            s.meta1);
  set("s_meta2",            s.meta2);
  set("s_meta3",            s.meta3);
  set("s_founderTip",       s.founderTip);
  // About
  set("s_aboutSubtitle",    s.aboutSubtitle);
  set("s_aboutHeading",     s.aboutHeading);
  set("s_aboutQuote",       s.aboutQuote);
  set("s_aboutBody",        s.aboutBody);
  set("s_bullet1Title",     s.bullet1Title);
  set("s_bullet1Desc",      s.bullet1Desc);
  set("s_bullet2Title",     s.bullet2Title);
  set("s_bullet2Desc",      s.bullet2Desc);
  set("s_counterHeading",   s.counterHeading);
  set("s_counterDesc",      s.counterDesc);
  // Footer
  set("s_footerDesc",       s.footerDesc);
  set("s_footerCopyright",  s.footerCopyright);
  set("s_footerTagline",    s.footerTagline);
  set("s_footerMorning",    s.footerMorning);
  set("s_footerEvening",    s.footerEvening);
  set("s_priceRegular",     s.priceRegular);
  set("s_priceHigh",        s.priceHigh);
  set("s_pricePremium",     s.pricePremium);
  // Contact & QR
  set("s_whatsapp",         s.whatsapp);
  set("s_whatsappDisplay",  s.whatsappDisplay);
  set("s_whatsappGreeting", s.whatsappGreeting);
  set("s_qrUrl",            s.qrUrl);
  set("s_qrLabel",          s.qrLabel);

  // Live QR preview
  updateQrPreview();

  // QR URL input live preview
  const qrInput = document.getElementById("s_qrUrl");
  if (qrInput) qrInput.addEventListener("input", updateQrPreview);
}

function updateQrPreview() {
  const url = (document.getElementById("s_qrUrl")?.value || "").trim();
  const img = document.getElementById("qrPreviewImg");
  if (img && url) img.src = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(url)}`;
}

// ── Site Settings: Save ───────────────────────────────────────────────────

function saveSettings(section) {
  const current = getSiteSettings();
  const get = id => (document.getElementById(id)?.value || "").trim();

  if (section === "brand") {
    current.brandName        = get("s_brandName");
    current.brandTagline     = get("s_brandTagline");
    current.announcementText = get("s_announcementText");
    current.morningHours     = get("s_morningHours");
    current.eveningHours     = get("s_eveningHours");
  }

  if (section === "hero") {
    current.heroBadge        = get("s_heroBadge");
    current.heroHeading      = get("s_heroHeading");
    current.heroSubheading   = get("s_heroSubheading");
    current.heroBannerImage  = get("s_heroBannerImage");
    current.heroRegularLabel = get("s_heroRegularLabel");
    current.heroRegularPrice = get("s_heroRegularPrice");
    current.heroHighLabel    = get("s_heroHighLabel");
    current.heroHighPrice    = get("s_heroHighPrice");
    current.heroHighBadge    = get("s_heroHighBadge");
    current.heroPremiumLabel = get("s_heroPremiumLabel");
    current.heroPremiumPrice = get("s_heroPremiumPrice");
    current.meta1            = get("s_meta1");
    current.meta2            = get("s_meta2");
    current.meta3            = get("s_meta3");
    current.founderTip       = get("s_founderTip");
  }

  if (section === "about") {
    current.aboutSubtitle  = get("s_aboutSubtitle");
    current.aboutHeading   = get("s_aboutHeading");
    current.aboutQuote     = get("s_aboutQuote");
    current.aboutBody      = get("s_aboutBody");
    current.bullet1Title   = get("s_bullet1Title");
    current.bullet1Desc    = get("s_bullet1Desc");
    current.bullet2Title   = get("s_bullet2Title");
    current.bullet2Desc    = get("s_bullet2Desc");
    current.counterHeading = get("s_counterHeading");
    current.counterDesc    = get("s_counterDesc");
  }

  if (section === "footer") {
    current.footerDesc      = get("s_footerDesc");
    current.footerCopyright = get("s_footerCopyright");
    current.footerTagline   = get("s_footerTagline");
    current.footerMorning   = get("s_footerMorning");
    current.footerEvening   = get("s_footerEvening");
    current.priceRegular    = get("s_priceRegular");
    current.priceHigh       = get("s_priceHigh");
    current.pricePremium    = get("s_pricePremium");
  }

  if (section === "contact") {
    current.whatsapp         = get("s_whatsapp");
    current.whatsappDisplay  = get("s_whatsappDisplay");
    current.whatsappGreeting = get("s_whatsappGreeting");
    current.qrUrl            = get("s_qrUrl");
    current.qrLabel          = get("s_qrLabel");
  }

  localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(current));
  showToast("✅ Saved! Refresh the live site to see changes.");
}

// ── Reset to Defaults ─────────────────────────────────────────────────────

document.getElementById("resetDefaultsBtn").addEventListener("click", () => {
  if (!confirm("This will reset the entire menu back to the original defaults. Are you sure?")) return;
  localStorage.removeItem(STORAGE_KEY);
  loadAndRender();
  showToast("Menu reset to defaults!");
});

// ── Add / Edit Modal ──────────────────────────────────────────────────────

const bowlModal        = document.getElementById("bowlModal");
const bowlModalOverlay = document.getElementById("bowlModalOverlay");
const bowlModalTitle   = document.getElementById("bowlModalTitle");
const bowlForm         = document.getElementById("bowlForm");
const formError        = document.getElementById("formError");
const saveBowlBtn      = document.getElementById("saveBowlBtn");
const cancelBowlBtn    = document.getElementById("cancelBowlBtn");
const closeBowlModalBtn = document.getElementById("closeBowlModalBtn");
const ingredientsList  = document.getElementById("ingredientsList");
const addIngredientBtn = document.getElementById("addIngredientBtn");
const imageInput       = document.getElementById("f_image");
const imagePreview     = document.getElementById("imagePreview");
const imagePlaceholder = document.getElementById("imagePlaceholder");

let editingIndex = null; // null = add, number = edit

document.getElementById("openAddBowlBtn").addEventListener("click", () => openAddModal());

function openAddModal() {
  editingIndex = null;
  bowlModalTitle.textContent = "Add New Bowl";
  resetForm();
  openModal();
}

function openEditModal(idx) {
  editingIndex = idx;
  bowlModalTitle.textContent = "Edit Bowl";
  const data = getMenuData();
  populateForm(data[idx]);
  openModal();
}

function openModal() {
  bowlModal.classList.add("open");
  bowlModalOverlay.classList.add("active");
}

function closeModal() {
  bowlModal.classList.remove("open");
  bowlModalOverlay.classList.remove("active");
  formError.textContent = "";
}

cancelBowlBtn.addEventListener("click", closeModal);
closeBowlModalBtn.addEventListener("click", closeModal);
bowlModalOverlay.addEventListener("click", closeModal);

// Image preview
imageInput.addEventListener("input", () => {
  const val = imageInput.value.trim();
  if (val) {
    imagePreview.src = val;
    imagePreview.classList.remove("hidden");
    imagePlaceholder.style.display = "none";
    imagePreview.onerror = () => {
      imagePreview.classList.add("hidden");
      imagePlaceholder.style.display = "flex";
    };
  } else {
    imagePreview.classList.add("hidden");
    imagePlaceholder.style.display = "flex";
  }
});

// Add ingredient row
addIngredientBtn.addEventListener("click", () => addIngredientRow("", "", false));

function addIngredientRow(en = "", ml = "", highlight = false) {
  const row = document.createElement("div");
  row.className = "ingredient-row";
  row.innerHTML = `
    <input type="text" placeholder="English name" value="${escHtml(en)}" class="ing-en">
    <input type="text" placeholder="Malayalam (optional)" value="${escHtml(ml)}" class="ing-ml">
    <button type="button" class="ingredient-highlight-toggle ${highlight ? 'active' : ''}" title="Mark as key ingredient (highlighted)">
      <i class="fa-solid fa-star"></i>
    </button>
    <button type="button" class="ingredient-remove-btn" title="Remove">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;
  row.querySelector(".ingredient-highlight-toggle").addEventListener("click", function() {
    this.classList.toggle("active");
  });
  row.querySelector(".ingredient-remove-btn").addEventListener("click", () => row.remove());
  ingredientsList.appendChild(row);
}

function resetForm() {
  bowlForm.reset();
  ingredientsList.innerHTML = "";
  // Add 3 blank ingredient rows by default
  addIngredientRow(); addIngredientRow(); addIngredientRow();
  imagePreview.classList.add("hidden");
  imagePlaceholder.style.display = "flex";
  imagePreview.src = "";
  // Uncheck all category checkboxes
  document.querySelectorAll('input[name="cat"]').forEach(cb => cb.checked = false);
}

function populateForm(bowl) {
  document.getElementById("f_nameEn").value         = bowl.nameEn || "";
  document.getElementById("f_nameMl").value         = bowl.nameMl || "";
  document.getElementById("f_dietType").value       = bowl.dietType || "veg";
  document.getElementById("f_proteinBadge").value   = bowl.proteinBadge || "";
  document.getElementById("f_timingBadge").value    = bowl.timingBadge || "";
  document.getElementById("f_timingBadgeMl").value  = bowl.timingBadgeMl || "";
  document.getElementById("f_calories").value       = bowl.calories || "";
  document.getElementById("f_carbs").value          = bowl.carbs || "";
  document.getElementById("f_fats").value           = bowl.fats || "";
  document.getElementById("f_priceRegular").value   = bowl.prices?.regular || "";
  document.getElementById("f_priceHighProtein").value = bowl.prices?.highProtein || "";
  document.getElementById("f_pricePremium").value   = bowl.prices?.premium || "";
  document.getElementById("f_dressingEn").value     = bowl.dressingEn || "";
  document.getElementById("f_dressingMl").value     = bowl.dressingMl || "";
  document.getElementById("f_prepEn").value         = bowl.prepMethodEn || "";
  document.getElementById("f_quoteEn").value        = bowl.founderQuoteEn || "";
  document.getElementById("f_image").value          = bowl.image || "";

  // Image preview
  if (bowl.image) {
    imagePreview.src = bowl.image;
    imagePreview.classList.remove("hidden");
    imagePlaceholder.style.display = "none";
  } else {
    imagePreview.classList.add("hidden");
    imagePlaceholder.style.display = "flex";
  }

  // Categories
  const cats = bowl.category || [];
  document.querySelectorAll('input[name="cat"]').forEach(cb => {
    cb.checked = cats.includes(cb.value);
  });

  // Ingredients
  ingredientsList.innerHTML = "";
  (bowl.ingredients || []).forEach(ing => {
    addIngredientRow(ing.en, ing.ml, ing.highlight);
  });
  if ((bowl.ingredients || []).length === 0) {
    addIngredientRow(); addIngredientRow(); addIngredientRow();
  }
}

function collectFormData() {
  const nameEn = document.getElementById("f_nameEn").value.trim();
  const priceRegular = parseInt(document.getElementById("f_priceRegular").value);
  const priceHigh    = parseInt(document.getElementById("f_priceHighProtein").value);
  const pricePremium = parseInt(document.getElementById("f_pricePremium").value);

  if (!nameEn) return { error: "Bowl name (English) is required." };
  if (!priceRegular || !priceHigh || !pricePremium) return { error: "All three prices are required." };

  // Collect ingredients
  const ingRows = ingredientsList.querySelectorAll(".ingredient-row");
  const ingredients = [];
  ingRows.forEach(row => {
    const en = row.querySelector(".ing-en").value.trim();
    const ml = row.querySelector(".ing-ml").value.trim();
    if (en) {
      ingredients.push({
        en,
        ml: ml || en,
        highlight: row.querySelector(".ingredient-highlight-toggle").classList.contains("active")
      });
    }
  });

  // Collect categories
  const selectedCats = ["all"];
  document.querySelectorAll('input[name="cat"]:checked').forEach(cb => {
    selectedCats.push(cb.value);
  });

  const nameEn_ = nameEn;
  const id = nameEn_.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return {
    bowl: {
      id,
      nameEn: nameEn_,
      nameMl:          document.getElementById("f_nameMl").value.trim() || nameEn_,
      dietType:        document.getElementById("f_dietType").value,
      proteinBadge:    document.getElementById("f_proteinBadge").value.trim(),
      timingBadge:     document.getElementById("f_timingBadge").value.trim(),
      timingBadgeMl:   document.getElementById("f_timingBadgeMl").value.trim(),
      calories:        document.getElementById("f_calories").value.trim(),
      carbs:           document.getElementById("f_carbs").value.trim(),
      fats:            document.getElementById("f_fats").value.trim(),
      prices: { regular: priceRegular, highProtein: priceHigh, premium: pricePremium },
      category:        selectedCats,
      ingredients,
      dressingEn:      document.getElementById("f_dressingEn").value.trim(),
      dressingMl:      document.getElementById("f_dressingMl").value.trim(),
      prepMethodEn:    document.getElementById("f_prepEn").value.trim(),
      prepMethodMl:    document.getElementById("f_prepEn").value.trim(), // same for simplicity
      founderQuoteEn:  document.getElementById("f_quoteEn").value.trim(),
      founderQuoteMl:  document.getElementById("f_quoteEn").value.trim(),
      image:           document.getElementById("f_image").value.trim(),
    }
  };
}

saveBowlBtn.addEventListener("click", () => {
  formError.textContent = "";
  const result = collectFormData();
  if (result.error) {
    formError.textContent = result.error;
    return;
  }

  const data = getMenuData();

  if (editingIndex === null) {
    // Add new
    result.bowl.number = data.length + 1;
    data.push(result.bowl);
    showToast("Bowl added to menu!");
  } else {
    // Update existing — preserve the id if exists
    result.bowl.number = data[editingIndex].number;
    data[editingIndex] = result.bowl;
    showToast("Bowl updated successfully!");
  }

  saveMenuData(data);
  loadAndRender();
  closeModal();
});

// ── Delete ────────────────────────────────────────────────────────────────

const deleteModal    = document.getElementById("deleteModal");
const deleteOverlay  = document.getElementById("deleteOverlay");
const deleteModalName = document.getElementById("deleteModalName");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn  = document.getElementById("cancelDeleteBtn");

let deletingIndex = null;

function openDeleteConfirm(idx) {
  const data = getMenuData();
  deletingIndex = idx;
  deleteModalName.textContent = `"${data[idx].nameEn}" will be removed from the menu.`;
  deleteModal.classList.add("open");
  deleteOverlay.classList.add("active");
}

function closeDeleteModal() {
  deleteModal.classList.remove("open");
  deleteOverlay.classList.remove("active");
  deletingIndex = null;
}

cancelDeleteBtn.addEventListener("click", closeDeleteModal);
deleteOverlay.addEventListener("click", closeDeleteModal);

confirmDeleteBtn.addEventListener("click", () => {
  if (deletingIndex === null) return;
  const data = getMenuData();
  const name = data[deletingIndex].nameEn;
  data.splice(deletingIndex, 1);
  saveMenuData(data);
  closeDeleteModal();
  loadAndRender();
  showToast(`"${name}" deleted.`);
});

// ── Toast ─────────────────────────────────────────────────────────────────

const adminToast    = document.getElementById("adminToast");
const adminToastMsg = document.getElementById("adminToastMsg");
let toastTimer;

function showToast(msg) {
  clearTimeout(toastTimer);
  adminToastMsg.textContent = msg;
  adminToast.classList.add("show");
  toastTimer = setTimeout(() => adminToast.classList.remove("show"), 2800);
}

// ── Escape Key ────────────────────────────────────────────────────────────

document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeModal(); closeDeleteModal(); }
});

// ── Helpers ───────────────────────────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Boot ──────────────────────────────────────────────────────────────────

checkSession();
