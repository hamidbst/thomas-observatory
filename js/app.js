/* =============================================================================
   app.js  —  boots the site: branding, clock, starfield, tab navigation.
   ============================================================================= */

const App = {
  init() {
    // Branding from config
    const name = (CONFIG.OWNER_NAME || "").trim();
    const title = name ? `${name}'s Observatory` : "Observatory";
    document.title = title + " · Live Sky";
    U.el("brand-title").innerHTML = `${U.esc(title)}<span class="sub">Live Sky Dashboard</span>`;
    U.el("foot-owner").textContent = title;

    LOC.init();
    Facts.init();
    this.starfield();
    this.clock();
    this.tabs();

    // location label toggles home / device
    U.el("clock-loc").addEventListener("click", () => LOC.toggle());
    LOC._render();

    // Sky map loads its catalogs and draws (default active tab)
    Sky.init();

    // Re-render location-dependent panels when the place changes
    document.addEventListener("location-changed", () => {
      if (this._tonightShown) Tonight.render();
    });

    // Facts opacity transition helper
    const ft = U.el("fact-text"); ft.style.transition = "opacity .18s ease";
  },

  clock() {
    const t = U.el("clock-time"), d = U.el("clock-date");
    const tick = () => {
      const now = new Date();
      t.textContent = U.timeHMS(now);
      d.textContent = U.dateLong(now);
    };
    tick(); setInterval(tick, 1000);
  },

  tabs() {
    const buttons = document.querySelectorAll("nav.tabs button");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        buttons.forEach(b => b.classList.toggle("active", b === btn));
        document.querySelectorAll(".tab-page").forEach(p => p.classList.remove("active"));
        U.el("tab-" + tab).classList.add("active");
        this.onShow(tab);
      });
    });
  },

  onShow(tab) {
    switch (tab) {
      case "sky":     Sky.resize(); Sky.render(); break;
      case "tonight": this._tonightShown = true; Tonight.render(); break;
      case "events":  if (!this._eventsShown) { this._eventsShown = true; Events.render(); } break;
      case "iss":     ISS.init().then(() => ISS.start()); break;
      case "news":    News.loadAll(); break;
    }
  },

  // Twinkling background starfield (decorative, behind everything)
  starfield() {
    const cv = U.el("starfield"), ctx = cv.getContext("2d");
    let stars = [];
    const resize = () => {
      cv.width = innerWidth; cv.height = innerHeight;
      const n = Math.round(innerWidth * innerHeight / 6000);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * cv.width, y: Math.random() * cv.height,
        r: Math.random() * 1.2 + 0.2, p: Math.random() * Math.PI * 2,
        s: Math.random() * 0.02 + 0.005
      }));
    };
    resize(); addEventListener("resize", resize);
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const s of stars) {
        s.p += s.s;
        const a = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(s.p));
        ctx.globalAlpha = a;
        ctx.fillStyle = "#dfe8ff";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    };
    loop();
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
