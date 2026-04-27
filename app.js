// ======================================================
//  APP.JS — CATIA V5 Cursos · Panel de Ventas
// ======================================================

const STORAGE_KEY = "catia_cursos_v2";
const SESSION_KEY = "catia_admin_session";

// ══════════════════════════════════════════════════════
//  🔐 CONTRASEÑA DE ADMINISTRADOR
//  Cambia el valor entre comillas por tu contraseña.
// ══════════════════════════════════════════════════════
const ADMIN_PASSWORD = "CatiaV5@Admin2025"; // ← CAMBIA ESTO

// ── Estado ────────────────────────────────────────────
let courses   = loadCourses();
let editingId = null;

// ── Init ──────────────────────────────────────────────
renderAll();
restoreSession();

// ══════════════════════════════════════════════════════
//  PERSISTENCIA
// ══════════════════════════════════════════════════════
function loadCourses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return JSON.parse(JSON.stringify(DEFAULT_COURSES));
}
function saveCourses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

// ══════════════════════════════════════════════════════
//  RENDER
// ══════════════════════════════════════════════════════
function renderAll() {
  ["basico","intermedio","avanzado"].forEach(renderLevel);
  updateStats();
}

function renderLevel(level) {
  const grid   = document.getElementById("grid-" + level);
  const subset = courses.filter(c => c.level === level);
  grid.innerHTML = "";
  if (subset.length === 0) {
    grid.innerHTML = `<div class="empty-state">Sin cursos en este nivel.<br>Usa el panel de administración para agregar uno.</div>`;
    return;
  }
  subset.forEach((course, i) => grid.appendChild(buildCard(course, i)));
}

function updateStats() {
  const el = document.getElementById("statTotal");
  if (el) el.textContent = courses.length;
}

// ══════════════════════════════════════════════════════
//  BUILD CARD
// ══════════════════════════════════════════════════════
function buildCard(course, delay) {
  const levelLabel = {
    basico:     "🟢 Básico",
    intermedio: "🟡 Intermedio",
    avanzado:   "🔴 Avanzado"
  };

  // ── Imagen / placeholder ──
  const imageHTML = course.image
    ? `<img class="card-img" src="${escHtml(course.image)}" alt="${escHtml(course.name)}"
         onerror="this.outerHTML='<div class=\\'card-img-placeholder\\'>⚙️</div>'" />`
    : `<div class="card-img-placeholder">⚙️</div>`;

  // ── Botón de video (solo si tiene video) ──
  const videoBtn = course.video
    ? `<button class="btn-preview" onclick="openVideoModal('${escHtml(course.video)}','${escHtml(course.name)}')">
         ▶ Ver preview
       </button>`
    : "";

  // ── WhatsApp ──
  const waMsg  = encodeURIComponent(
    `Hola, me interesa el curso *${course.name}* de CATIA V5 por $${Number(course.price).toLocaleString("es-MX")} MXN. ¿Me pueden dar más información?`
  );
  const waLink = `https://wa.me/${course.wa || DEFAULT_WA}?text=${waMsg}`;

  // ── Contenidos ──
  const itemsHTML = (course.items || []).map(it => `<li>${escHtml(it)}</li>`).join("");

  const div = document.createElement("div");
  div.className = `card ${course.level}`;
  div.style.animationDelay = `${delay * 80}ms`;
  div.dataset.id = course.id;

  div.innerHTML = `
    <div class="card-media">
      ${imageHTML}
      ${videoBtn}
    </div>
    <div class="card-body">
      <span class="card-level-badge">${levelLabel[course.level]}</span>
      <h3 class="card-title">${escHtml(course.name)}</h3>
      <p class="card-type">Tipo: ${escHtml(course.type)}</p>
      <ul class="card-items">${itemsHTML}</ul>
    </div>
    <div class="card-footer">
      <div class="card-price-row">
        <p class="card-price">$${Number(course.price).toLocaleString("es-MX")} MXN<span>(pago único)</span></p>
        <p class="card-delivery">📦 Entrega por Drive</p>
      </div>
      <div class="card-actions">
        <a class="btn-wa" href="${waLink}" target="_blank" rel="noopener">
          📲 Comprar por WhatsApp
        </a>
        <button class="btn-edit" title="Editar" onclick="editCourse(${course.id})">✏️</button>
        <button class="btn-del"  title="Eliminar" onclick="deleteCourse(${course.id})">🗑️</button>
      </div>
    </div>
  `;
  return div;
}

// ══════════════════════════════════════════════════════
//  VIDEO MODAL
// ══════════════════════════════════════════════════════

/**
 * Convierte cualquier URL de video en una URL embebible.
 * Soporta: YouTube, YouTube Shorts, Vimeo, archivos directos (.mp4, .webm, .ogg)
 */
function resolveVideoUrl(url) {
  if (!url) return { type: "none", src: "" };

  // YouTube normal: watch?v=ID  o  youtu.be/ID
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (ytMatch) {
    return {
      type: "iframe",
      src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return {
      type: "iframe",
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
    };
  }

  // Video directo (.mp4 / .webm / .ogg)
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) {
    return { type: "video", src: url };
  }

  // Fallback: intentar como iframe
  return { type: "iframe", src: url };
}

function openVideoModal(url, title) {
  const overlay   = document.getElementById("videoOverlay");
  const titleEl   = document.getElementById("videoTitle");
  const iframe    = document.getElementById("videoFrame");
  const videoTag  = document.getElementById("videoTag");
  const videoSrc  = document.getElementById("videoTagSrc");

  titleEl.textContent = title || "Vista previa del curso";

  // Limpiar estado anterior
  iframe.src   = "";
  videoTag.src = "";
  videoSrc.src = "";
  iframe.style.display   = "none";
  videoTag.style.display = "none";

  const resolved = resolveVideoUrl(url);

  if (resolved.type === "iframe") {
    iframe.src           = resolved.src;
    iframe.style.display = "block";
  } else if (resolved.type === "video") {
    videoSrc.src          = resolved.src;
    videoTag.load();
    videoTag.style.display = "block";
  }

  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeVideoModal(event) {
  // Si se pasó un evento, solo cerrar si el clic fue en el overlay (fondo oscuro)
  if (event && event.target !== document.getElementById("videoOverlay")) return;

  const overlay  = document.getElementById("videoOverlay");
  const iframe   = document.getElementById("videoFrame");
  const videoTag = document.getElementById("videoTag");

  // Detener reproducción
  iframe.src = "";
  videoTag.pause();
  videoTag.src = "";

  overlay.classList.add("hidden");
  document.body.style.overflow = "";
}

// Cerrar modal con tecla Escape
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeVideoModal();
    closeLoginModal();
  }
});

// ══════════════════════════════════════════════════════
//  ADMIN — AUTENTICACIÓN
// ══════════════════════════════════════════════════════
function restoreSession() {
  if (sessionStorage.getItem(SESSION_KEY) === "true") {
    setAdminUnlocked(true, false);
  }
}

function requestAdminAccess() {
  if (sessionStorage.getItem(SESSION_KEY) === "true") {
    toggleAdmin();
    return;
  }
  document.getElementById("loginOverlay").classList.remove("hidden");
  setTimeout(() => document.getElementById("adminPassword").focus(), 100);
}

function checkPassword() {
  const input = document.getElementById("adminPassword").value;
  if (input === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, "true");
    closeLoginModal();
    setAdminUnlocked(true, true);
  } else {
    document.getElementById("loginError").classList.remove("hidden");
    document.getElementById("adminPassword").value = "";
    document.getElementById("adminPassword").focus();
    const box = document.querySelector(".login-box");
    box.classList.add("shake");
    setTimeout(() => box.classList.remove("shake"), 500);
  }
}

function setAdminUnlocked(unlocked, openPanel) {
  const btn = document.getElementById("btnLogout");
  if (unlocked) {
    btn.classList.remove("hidden");
    if (openPanel) toggleAdmin();
  } else {
    btn.classList.add("hidden");
    document.getElementById("adminPanel").classList.add("hidden");
  }
}

function logoutAdmin() {
  sessionStorage.removeItem(SESSION_KEY);
  setAdminUnlocked(false, false);
  showToast("🔒 Sesión cerrada");
}

function closeLoginModal() {
  document.getElementById("loginOverlay").classList.add("hidden");
  document.getElementById("adminPassword").value = "";
  document.getElementById("loginError").classList.add("hidden");
}

// ══════════════════════════════════════════════════════
//  ADMIN — CRUD CURSOS
// ══════════════════════════════════════════════════════
function toggleAdmin() {
  const panel = document.getElementById("adminPanel");
  panel.classList.toggle("hidden");
  if (!panel.classList.contains("hidden")) {
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    cancelEdit();
  }
}

function saveCourse() {
  const name  = val("f-name").trim();
  const level = val("f-level");
  const type  = val("f-type").trim();
  const items = val("f-items").split("\n").map(s => s.trim()).filter(Boolean);
  const price = parseFloat(val("f-price"));
  const wa    = val("f-wa").trim();
  const image = val("f-image").trim();
  const video = val("f-video").trim();

  if (!name)               return showToast("⚠️ Escribe el nombre del curso", true);
  if (!type)               return showToast("⚠️ Escribe el tipo/descripción", true);
  if (isNaN(price)||price<=0) return showToast("⚠️ Precio inválido", true);
  if (!wa)                 return showToast("⚠️ Agrega el número de WhatsApp", true);

  if (editingId !== null) {
    const idx = courses.findIndex(c => c.id === editingId);
    if (idx > -1) {
      courses[idx] = { ...courses[idx], name, level, type, items, price, wa, image, video };
      showToast("✅ Curso actualizado");
    }
    editingId = null;
  } else {
    courses.push({ id: Date.now(), level, name, type, items, price, wa, image, video });
    showToast("✅ Curso agregado");
  }

  saveCourses();
  renderAll();
  clearForm();
}

function editCourse(id) {
  const course = courses.find(c => c.id === id);
  if (!course) return;
  editingId = id;

  setVal("f-name",  course.name);
  setVal("f-level", course.level);
  setVal("f-type",  course.type);
  setVal("f-items", (course.items || []).join("\n"));
  setVal("f-price", course.price);
  setVal("f-wa",    course.wa || DEFAULT_WA);
  setVal("f-image", course.image || "");
  setVal("f-video", course.video || "");

  previewImage(course.image || "");
  previewVideoInput(course.video || "");

  const panel = document.getElementById("adminPanel");
  panel.classList.remove("hidden");
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelector(".btn-save").textContent = "💾 Actualizar Curso";
  showToast("✏️ Editando: " + course.name);
}

function deleteCourse(id) {
  const course = courses.find(c => c.id === id);
  if (!course) return;
  if (!confirm(`¿Eliminar el curso "${course.name}"?`)) return;
  courses = courses.filter(c => c.id !== id);
  saveCourses();
  renderAll();
  showToast("🗑️ Curso eliminado");
}

function cancelEdit() {
  editingId = null;
  clearForm();
  document.querySelector(".btn-save").textContent = "💾 Guardar Curso";
}

function clearForm() {
  ["f-name","f-type","f-items","f-price","f-wa","f-image","f-video"]
    .forEach(id => setVal(id, ""));
  setVal("f-level", "basico");
  previewImage("");
  previewVideoInput("");
}

// ══════════════════════════════════════════════════════
//  ADMIN — PREVIEWS EN FORMULARIO
// ══════════════════════════════════════════════════════
function previewImage(src) {
  const wrap = document.getElementById("img-preview-wrap");
  const img  = document.getElementById("img-preview");
  if (src && src.trim()) {
    img.src = src.trim();
    wrap.classList.remove("hidden");
  } else {
    wrap.classList.add("hidden");
    img.src = "";
  }
}

function previewVideoInput(url) {
  const wrap    = document.getElementById("video-preview-wrap");
  const frame   = document.getElementById("video-preview-frame");
  const tag     = document.getElementById("video-preview-tag");
  const tagSrc  = document.getElementById("video-preview-tag-src");

  frame.src          = "";
  tagSrc.src         = "";
  frame.style.display = "none";
  tag.style.display   = "none";

  if (!url || !url.trim()) {
    wrap.classList.add("hidden");
    return;
  }

  const resolved = resolveVideoUrl(url.trim());
  wrap.classList.remove("hidden");

  if (resolved.type === "iframe") {
    // No autoplay en preview del formulario
    frame.src          = resolved.src.replace("autoplay=1", "autoplay=0");
    frame.style.display = "block";
  } else if (resolved.type === "video") {
    tagSrc.src         = resolved.src;
    tag.load();
    tag.style.display  = "block";
  }
}

// ══════════════════════════════════════════════════════
//  FILTROS
// ══════════════════════════════════════════════════════
function filterLevel(level, btn) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  ["basico","intermedio","avanzado"].forEach(l => {
    document.getElementById("section-" + l).classList
      .toggle("hidden", level !== "todos" && level !== l);
  });
}

// ══════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════
function val(id)    { const e=document.getElementById(id); return e?e.value:""; }
function setVal(id,v){ const e=document.getElementById(id); if(e) e.value=v; }
function escHtml(s) {
  return String(s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}

let toastTimer;
function showToast(msg, isError=false) {
  const old = document.querySelector(".toast");
  if (old) old.remove();
  clearTimeout(toastTimer);
  const t = document.createElement("div");
  t.className = "toast" + (isError ? " error" : "");
  t.textContent = msg;
  document.body.appendChild(t);
  toastTimer = setTimeout(() => t.remove(), 3200);
}
