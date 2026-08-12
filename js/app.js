/* =============================================================================
   app.js  —  boots the site: i18n, branding, clock, starfield, tab navigation.
   ============================================================================= */

const App = {
  init() {
    I18N.init();               // pick language (saved / browser) before anything renders

    this.renderBranding();

    LOC.init();
    Facts.init();
    this.starfield();
    this.clock();
    this.tabs();

    I18N.applyStatic();        // translate all static [data-i18n] nodes
    I18N.wireToggle();         // language switch button

    // location label opens the location picker
    LOC.wire();
    LOC._render();

    // Sky map loads its catalogs and draws (default active tab)
    Sky.init();

    // Re-render location-dependent panels when the place changes
    document.addEventListener("location-changed", () => {
      if (this._tonightShown) Tonight.render();
    });

    // Re-render language-dependent panels when the language changes
    document.addEventListener("language-changed", () => {
      this.renderBranding();
      LOC._render();
      if (this._tick) this._tick();
      if (this._tonightShown) Tonight.render();
      if (Events.shown) Events.render();
      // Sky, ISS, Facts, Quiz react via their own language-changed listeners
    });

    // Facts opacity transition helper
    const ft = U.el("fact-text"); ft.style.transition = "opacity .18s ease";
  },

  renderBranding() {
    const name = (CONFIG.OWNER_NAME || "").trim();
    const title = name ? `${name}'s Observatory` : "Observatory";
    document.title = title;
    U.el("brand-title").innerHTML = `${U.esc(title)}<span class="sub">${t("brand.sub")}</span>`;
    U.el("foot-owner").textContent = title;
  },

  clock() {
    const t = U.el("clock-time"), d = U.el("clock-date");
    this._tick = () => {
      const now = new Date();
      t.textContent = U.timeHMS(now);
      d.textContent = U.dateLong(now);
    };
    this._tick(); setInterval(this._tick, 1000);
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
      case "events":  if (!Events.shown) Events.render(); break;
      case "iss":     ISS.init().then(() => ISS.start()); break;
      case "live":    Live.enter(); break;
      case "news":    News.loadAll(); break;
      case "quiz":    Quiz.enter(); break;
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
