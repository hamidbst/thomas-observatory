/* =============================================================================
   location.js  —  where is the observer?
   Default = the visitor's real device location (falls back to CONFIG.HOME if the
   browser can't/won't share it). A picker lets you search any city on Earth to
   see how the sky looks from there. The choice is remembered in localStorage.
   Other modules read LOC.current and listen for the "location-changed" event.
   ============================================================================= */

const LOC = {
  current: { ...CONFIG.HOME },
  mode: "fallback",   // "device" | "custom" | "fallback"

  init() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem("obs-loc") || "null"); } catch (e) {}
    if (saved && saved.mode === "custom" && isFinite(saved.lat) && isFinite(saved.lon)) {
      // a place the user explicitly chose — restore it, don't re-prompt
      this._apply(saved, "custom", false);
    } else {
      // default: use the visitor's real location, falling back to the home city
      this._apply({ ...CONFIG.HOME }, "fallback", false);   // show something immediately
      this.useDevice(true);
    }
  },

  _apply(loc, mode, save) {
    this.current = { name: loc.name, lat: loc.lat, lon: loc.lon, elevation: loc.elevation || 0 };
    this.mode = mode;
    if (save) localStorage.setItem("obs-loc", JSON.stringify({ mode, ...this.current }));
    else if (mode !== "custom") localStorage.removeItem("obs-loc");
    document.dispatchEvent(new CustomEvent("location-changed", { detail: this.current }));
    this._render();
    this._renderModalCurrent();
  },

  useDevice(silent) {
    if (!navigator.geolocation) { if (!silent) this._toast(t("loc.denied")); return; }
    const locEl = U.el("clock-loc");
    if (locEl) locEl.innerHTML = "📍 " + t("loc.locating");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude, lon = pos.coords.longitude;
        const name = (await this._reverseName(lat, lon)) || t("loc.device");
        this._apply({ name, lat, lon, elevation: pos.coords.altitude || 0 }, "device", false);
      },
      () => { if (!silent) this._toast(t("loc.denied")); this._render(); },   // denied → keep the fallback city
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );
  },

  // coordinates → a human city name (free, no API key)
  async _reverseName(lat, lon) {
    try {
      const lang = (window.I18N && I18N.lang) || "en";
      const r = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${lang}`);
      if (!r.ok) return null;
      const j = await r.json();
      const city = j.city || j.locality || j.principalSubdivision;
      if (!city) return null;
      return (j.countryCode && city !== j.countryName) ? `${city}, ${j.countryCode}` : city;
    } catch (e) { return null; }
  },

  setPlace(p) {
    this._apply({ name: p.name, lat: p.lat, lon: p.lon, elevation: p.elevation || 0 }, "custom", true);
    this.closeModal();
  },

  _render() {
    const el = U.el("clock-loc");
    if (!el) return;
    const l = this.current;
    const cw = (window.I18N && I18N.lang === "fr") ? "O" : "W";
    const latTxt = `${Math.abs(l.lat).toFixed(2)}°${l.lat >= 0 ? "N" : "S"}`;
    const lonTxt = `${Math.abs(l.lon).toFixed(2)}°${l.lon >= 0 ? "E" : cw}`;
    el.innerHTML = `📍 ${U.esc(l.name)} · ${latTxt} ${lonTxt} <span class="small">(${t("loc.change")})</span>`;
  },

  // ---------------- picker modal ----------------
  openModal() {
    const m = U.el("loc-modal");
    if (!m) return;
    m.hidden = false;
    this._renderModalCurrent();
    const inp = U.el("loc-input");
    if (inp) { inp.value = ""; setTimeout(() => inp.focus(), 30); }
    U.el("loc-results").innerHTML = "";
  },
  closeModal() { const m = U.el("loc-modal"); if (m) m.hidden = true; },

  _renderModalCurrent() {
    const el = U.el("loc-current");
    if (!el) return;
    const l = this.current;
    el.innerHTML = `${t("loc.current")}: <b>${U.esc(l.name)}</b> (${l.lat.toFixed(2)}, ${l.lon.toFixed(2)})`;
  },

  async search(q) {
    const host = U.el("loc-results");
    q = (q || "").trim();
    if (!q) return;
    host.innerHTML = `<div class="loading small"><span class="spinner"></span> ${t("loc.searching")}</div>`;
    try {
      const lang = (window.I18N && I18N.lang) || "en";
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=${lang}&format=json`;
      const r = await fetch(url);
      const j = await r.json();
      const res = j.results || [];
      if (!res.length) { host.innerHTML = `<p class="muted small">${t("loc.noResults")}</p>`; return; }
      host.innerHTML = res.map((p, i) => {
        const sub = [p.admin1, p.country].filter(Boolean).join(", ");
        return `<button class="loc-result" data-i="${i}"><b>${U.esc(p.name)}</b>${sub ? ` <span class="muted">${U.esc(sub)}</span>` : ""}</button>`;
      }).join("");
      host.querySelectorAll(".loc-result").forEach(b => b.addEventListener("click", () => {
        const p = res[parseInt(b.dataset.i, 10)];
        this.setPlace({ name: p.name, lat: p.latitude, lon: p.longitude, elevation: p.elevation || 0 });
      }));
    } catch (e) {
      host.innerHTML = `<p class="err small">${U.esc(e.message)}</p>`;
    }
  },

  wire() {
    const open = () => this.openModal();
    U.el("clock-loc").addEventListener("click", open);
    U.el("loc-close").addEventListener("click", () => this.closeModal());
    U.el("loc-modal").addEventListener("click", (e) => { if (e.target.id === "loc-modal") this.closeModal(); });
    U.el("loc-mine").addEventListener("click", () => { this.useDevice(false); this.closeModal(); });
    U.el("loc-go").addEventListener("click", () => this.search(U.el("loc-input").value));
    U.el("loc-input").addEventListener("keydown", (e) => { if (e.key === "Enter") this.search(U.el("loc-input").value); });
    document.addEventListener("language-changed", () => { this._render(); this._renderModalCurrent(); });
  },

  _toast(msg) {
    const el = U.el("loc-results");
    if (el) el.innerHTML = `<p class="muted small">${U.esc(msg)}</p>`;
  }
};

window.LOC = LOC;
