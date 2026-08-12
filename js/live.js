/* =============================================================================
   live.js  —  "Space Live" tab
   • Next rocket launches with ticking T‑minus countdowns (The Space Devs API)
   • The Sun right now — live NASA SDO images + current solar activity (NOAA SWPC)
   ============================================================================= */

const Live = {
  loaded: false,
  launchesData: null,
  sunCh: "0193",
  cdTimer: null,

  SUN_CHANNELS: [
    ["0193",  "ch_193"],
    ["0304",  "ch_304"],
    ["HMIIC", "ch_surface"],
    ["HMIB",  "ch_magnetic"],
  ],

  enter() {
    if (!this.loaded) {
      this.loaded = true;
      this.loadLaunches();
      this.initSun();
      this.loadSunActivity();
      document.addEventListener("language-changed", () => {
        if (this.launchesData) this.renderLaunches(this.launchesData);
        this.renderSunChannels();
        this.loadSunActivity();
      });
    }
    if (!this.cdTimer) this.cdTimer = setInterval(() => this.tickCountdowns(), 1000);
  },

  // ---------------- Launches ----------------
  async loadLaunches() {
    const host = U.el("launch-list");
    // use a 30-minute localStorage cache to respect the API's rate limit
    try {
      const cached = JSON.parse(localStorage.getItem("obs-launches") || "null");
      if (cached && Date.now() - cached.t < 30 * 60 * 1000) {
        this.launchesData = cached.data;
        return this.renderLaunches(cached.data);
      }
    } catch (e) {}
    try {
      const r = await fetch("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5&hide_recent_previous=true");
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      const data = (j.results || []).map(x => ({
        name: x.name,
        net: x.net,
        precision: x.net_precision && x.net_precision.name,
        provider: x.launch_service_provider && x.launch_service_provider.name,
        rocket: x.rocket && x.rocket.configuration && x.rocket.configuration.name,
        pad: x.pad && x.pad.name,
        place: x.pad && x.pad.location && x.pad.location.name,
        image: (x.image && (x.image.image_url || x.image)) || null,
        mission: x.mission && x.mission.name,
      }));
      this.launchesData = data;
      localStorage.setItem("obs-launches", JSON.stringify({ t: Date.now(), data }));
      this.renderLaunches(data);
    } catch (e) {
      host.innerHTML = `<p class="err">${t("live.launchError", { msg: U.esc(e.message) })}</p>`;
    }
  },

  renderLaunches(list) {
    const host = U.el("launch-list");
    if (!list || !list.length) { host.innerHTML = `<p class="muted">${t("live.noLaunch")}</p>`; return; }
    host.innerHTML = list.map(l => {
      const coarse = !["Minute", "Hour", "Second"].includes(l.precision);
      const img = l.image ? `<img class="launch-img" src="${U.esc(l.image)}" alt="" loading="lazy" onerror="this.style.display='none'">` : "";
      const when = new Date(l.net).toLocaleString(U.locale(), { weekday:"short", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit" });
      return `
      <div class="launch">
        ${img}
        <div class="launch-body">
          <div class="launch-name">${U.esc(l.name)}</div>
          <div class="launch-meta">${l.provider ? U.esc(l.provider) : ""}${l.rocket ? " · " + U.esc(l.rocket) : ""}</div>
          <div class="launch-meta">📍 ${U.esc([l.pad, l.place].filter(Boolean).join(", "))}</div>
          <div class="launch-when">${U.esc(when)}${coarse ? ` · <span class="muted">${t("live.estimated")}</span>` : ""}</div>
          <div class="launch-cd" data-net="${U.esc(l.net)}">T− …</div>
        </div>
      </div>`;
    }).join("");
    this.tickCountdowns();
  },

  tickCountdowns() {
    const fr = window.I18N && I18N.lang === "fr";
    document.querySelectorAll(".launch-cd").forEach(el => {
      const net = new Date(el.dataset.net).getTime();
      let ms = net - Date.now();
      if (ms <= 0) { el.textContent = t("live.liftoff"); el.classList.add("go"); return; }
      let s = Math.floor(ms / 1000);
      const d = Math.floor(s / 86400); s -= d * 86400;
      const h = Math.floor(s / 3600); s -= h * 3600;
      const m = Math.floor(s / 60); s -= m * 60;
      const p = n => String(n).padStart(2, "0");
      el.textContent = `T− ${d > 0 ? d + (fr ? "j " : "d ") : ""}${p(h)}:${p(m)}:${p(s)}`;
    });
  },

  // ---------------- The Sun ----------------
  initSun() {
    this.renderSunChannels();
    this.showSun();
  },

  renderSunChannels() {
    const host = U.el("sun-channels");
    if (!host) return;
    host.innerHTML = this.SUN_CHANNELS.map(([ch, key]) =>
      `<span class="chip ${ch === this.sunCh ? "on" : ""}" data-ch="${ch}">${t("live." + key)}</span>`).join("");
    host.querySelectorAll("[data-ch]").forEach(c =>
      c.addEventListener("click", () => { this.sunCh = c.dataset.ch; this.renderSunChannels(); this.showSun(); }));
  },

  showSun() {
    const img = U.el("sun-img");
    if (!img) return;
    img.src = `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_${this.sunCh}.jpg?cb=${Date.now()}`;
  },

  async loadSunActivity() {
    const host = U.el("sun-activity");
    if (!host) return;
    const rows = [];
    // latest X-ray flare
    try {
      const r = await fetch("https://services.swpc.noaa.gov/json/goes/primary/xray-flares-latest.json");
      const j = await r.json();
      const rec = Array.isArray(j) ? j[0] : j;
      const cls = rec && (rec.max_class || rec.current_class);
      if (cls) rows.push(`<div class="kv"><span class="k">${t("live.flare")}</span><span class="v">${U.esc(cls)}</span></div>`);
    } catch (e) {}
    // planetary K index (geomagnetic activity)
    try {
      const r = await fetch("https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json");
      const j = await r.json();
      let kp = NaN;
      if (Array.isArray(j) && j.length) {
        if (Array.isArray(j[0])) {
          // legacy format: [header, ...rows]
          const header = j[0].map(h => String(h).toLowerCase());
          let ki = header.findIndex(h => h.includes("kp")); if (ki < 0) ki = 1;
          for (let i = j.length - 1; i >= 1; i--) { const v = parseFloat(j[i][ki]); if (isFinite(v)) { kp = Math.round(v); break; } }
        } else {
          // current format: array of objects {time_tag, Kp, ...}
          for (let i = j.length - 1; i >= 0; i--) { const v = parseFloat(j[i].Kp ?? j[i].kp); if (isFinite(v)) { kp = Math.round(v); break; } }
        }
      }
      if (isFinite(kp)) {
        const scale = kp >= 5 ? " ⚠️" : "";
        rows.push(`<div class="kv"><span class="k">${t("live.kp")}</span><span class="v">${kp}${scale}</span></div>`);
      }
    } catch (e) {}
    host.innerHTML = rows.length
      ? `<div class="section-title" style="margin-top:14px;">${t("live.activity")}</div>${rows.join("")}`
      : "";
  }
};

window.Live = Live;
