/* =============================================================================
   location.js  —  where is the observer?
   Default = CONFIG.HOME. A button can switch to the browser's real location.
   The choice is remembered in localStorage. Other modules read LOC.current
   and listen for the "location-changed" event.
   ============================================================================= */

const LOC = {
  current: { ...CONFIG.HOME },
  mode: "home",   // "home" | "device"

  init() {
    const saved = localStorage.getItem("obs-loc-mode");
    if (saved === "device") this.useDevice(true);
    else this._apply({ ...CONFIG.HOME }, "home");
  },

  _apply(loc, mode) {
    this.current = loc;
    this.mode = mode;
    localStorage.setItem("obs-loc-mode", mode);
    document.dispatchEvent(new CustomEvent("location-changed", { detail: loc }));
    this._render();
  },

  useHome() { this._apply({ ...CONFIG.HOME }, "home"); },

  useDevice(silent) {
    if (!navigator.geolocation) {
      if (!silent) alert("This device can't share its location. Using home instead.");
      return this.useHome();
    }
    const locEl = U.el("clock-loc");
    if (locEl) locEl.textContent = "📍 " + t("loc.locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this._apply({
          name: t("loc.device"),
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          elevation: pos.coords.altitude || 0
        }, "device");
      },
      () => { if (!silent) alert("Location permission denied. Using home."); this.useHome(); },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );
  },

  // Toggle when the location label is clicked.
  toggle() { this.mode === "home" ? this.useDevice(false) : this.useHome(); },

  _render() {
    const el = U.el("clock-loc");
    if (!el) return;
    const l = this.current;
    const cw = (window.I18N && I18N.lang === "fr") ? "O" : "W";
    const latTxt = `${Math.abs(l.lat).toFixed(2)}°${l.lat >= 0 ? "N" : "S"}`;
    const lonTxt = `${Math.abs(l.lon).toFixed(2)}°${l.lon >= 0 ? "E" : cw}`;
    el.innerHTML = `📍 ${U.esc(l.name)} · ${latTxt} ${lonTxt} ` +
      `<span class="small">(${this.mode === "home" ? t("loc.useDevice") : t("loc.useHome")})</span>`;
  }
};

window.LOC = LOC;
