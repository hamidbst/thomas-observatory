/* =============================================================================
   events.js  —  upcoming astronomical events (bilingual)
   Eclipses, Moon phases, planetary oppositions & elongations, and seasons are
   COMPUTED with Astronomy Engine. Meteor-shower peaks come from a curated list.
   All display text is built through the i18n layer (t / I18N).
   ============================================================================= */

const METEOR_SHOWERS = [
  { key: "Quadrantids",    m: 1,  d: 4,  zhr: 110 },
  { key: "Lyrids",         m: 4,  d: 22, zhr: 18 },
  { key: "EtaAquariids",   m: 5,  d: 6,  zhr: 50 },
  { key: "DeltaAquariids", m: 7,  d: 30, zhr: 25 },
  { key: "Perseids",       m: 8,  d: 12, zhr: 100 },
  { key: "Draconids",      m: 10, d: 8,  zhr: 10 },
  { key: "Orionids",       m: 10, d: 21, zhr: 20 },
  { key: "Leonids",        m: 11, d: 17, zhr: 15 },
  { key: "Geminids",       m: 12, d: 14, zhr: 150 },
  { key: "Ursids",         m: 12, d: 22, zhr: 10 },
];

const Events = {
  all: [],
  filter: "all",
  shown: false,

  async render() {
    this.shown = true;
    const start = new Date();
    const end = new Date(); end.setMonth(end.getMonth() + CONFIG.EVENTS_MONTHS_AHEAD);
    const ev = [];

    this.gen(ev, () => this.moonPhases(start, end));
    this.gen(ev, () => this.lunarEclipses(start, end));
    this.gen(ev, () => this.solarEclipses(start, end));
    this.gen(ev, () => this.oppositions(start, end));
    this.gen(ev, () => this.elongations(start, end));
    this.gen(ev, () => this.seasons(start, end));
    this.gen(ev, () => this.meteors(start, end));

    ev.sort((a, b) => a.date - b.date);
    this.all = ev.filter(e => e.date >= start && e.date <= end);

    this.wireFilters();
    this.paint();
  },

  gen(list, fn) { try { fn().forEach(e => list.push(e)); } catch (e) { console.warn("event gen failed", e); } },

  moonPhases(start, end) {
    const out = [];
    let mq = Astronomy.SearchMoonQuarter(start);
    for (let i = 0; i < 60; i++) {
      const d = mq.time.date;
      if (d > end) break;
      if (mq.quarter === 0 || mq.quarter === 2) {   // New & Full only
        const isFull = mq.quarter === 2;
        let title = isFull ? t("events.fullMoon") : t("events.newMoon");
        let desc  = isFull ? t("events.fullMoonDesc") : t("events.newMoonDesc");
        if (isFull) {
          try {
            const gm = Astronomy.GeoMoon(d);
            const km = Math.sqrt(gm.x*gm.x+gm.y*gm.y+gm.z*gm.z)*149597870.7;
            if (km < 361000) { title = t("events.supermoon"); desc = t("events.supermoonDesc"); }
          } catch(e){}
        }
        out.push({ date: d, type: "moon", emoji: isFull ? "🌕" : "🌑", label: t("events.l_moon"), title, desc });
      }
      mq = Astronomy.NextMoonQuarter(mq);
    }
    return out;
  },

  lunarEclipses(start, end) {
    const out = [];
    let e = Astronomy.SearchLunarEclipse(start);
    for (let i = 0; i < 12; i++) {
      const d = e.peak.date;
      if (d > end) break;
      if (d >= start) {
        const kind = e.kind;   // "penumbral" | "partial" | "total"
        const desc = kind === "total" ? t("events.lunarTotalDesc")
                   : kind === "partial" ? t("events.lunarPartialDesc") : t("events.lunarPenumDesc");
        out.push({ date: d, type: "eclipse", emoji: "🌘", label: t("events.l_eclipse"),
          title: t("events.lunarEclipse", { kind: t("kinds." + kind) }), desc });
      }
      e = Astronomy.NextLunarEclipse(e.peak);
    }
    return out;
  },

  solarEclipses(start, end) {
    const out = [];
    let e = Astronomy.SearchGlobalSolarEclipse(start);
    for (let i = 0; i < 12; i++) {
      const d = e.peak.date;
      if (d > end) break;
      if (d >= start) {
        out.push({ date: d, type: "eclipse", emoji: "🌑", label: t("events.l_eclipse"),
          title: t("events.solarEclipse", { kind: t("kinds." + e.kind) }),
          desc: t("events.solarDesc", { lat: e.latitude.toFixed(0), lon: e.longitude.toFixed(0) }) });
      }
      e = Astronomy.NextGlobalSolarEclipse(e.peak);
    }
    return out;
  },

  oppositions(start, end) {
    const out = [];
    for (const b of ["Mars","Jupiter","Saturn","Uranus","Neptune"]) {
      try {
        let t0 = Astronomy.SearchRelativeLongitude(Astronomy.Body[b], 180, start);
        if (t0 && t0.date <= end) {
          const planet = I18N.body(b);
          out.push({ date: t0.date, type: "planet", emoji: "🪐", label: t("events.l_planet"),
            title: t("events.opposition", { planet }), desc: t("events.oppositionDesc", { planet }) });
        }
      } catch(e){}
    }
    return out;
  },

  elongations(start, end) {
    const out = [];
    for (const b of ["Mercury","Venus"]) {
      try {
        let e = Astronomy.SearchMaxElongation(Astronomy.Body[b], start);
        for (let i = 0; i < 6; i++) {
          if (e.time.date > end) break;
          if (e.time.date >= start) {
            const planet = I18N.body(b);
            const when = e.visibility === "morning" ? t("events.whenMorning") : t("events.whenEvening");
            out.push({ date: e.time.date, type: "planet", emoji: b === "Venus" ? "🌟" : "☿", label: t("events.l_planet"),
              title: t("events.elongation", { planet }),
              desc: t("events.elongationDesc", { planet, deg: e.elongation.toFixed(0), when }) });
          }
          e = Astronomy.SearchMaxElongation(Astronomy.Body[b], e.time.date);
        }
      } catch(err){}
    }
    return out;
  },

  seasons(start, end) {
    const out = [];
    for (let y = start.getFullYear(); y <= end.getFullYear(); y++) {
      try {
        const s = Astronomy.Seasons(y);
        const items = [
          [s.mar_equinox.date, "marEquinox"], [s.jun_solstice.date, "junSolstice"],
          [s.sep_equinox.date, "sepEquinox"], [s.dec_solstice.date, "decSolstice"],
        ];
        items.forEach(([d, key]) => out.push({ date: d, type: "season", emoji: "🌍", label: t("events.l_season"),
          title: t("events." + key), desc: t("events." + key + "Desc") }));
      } catch(e){}
    }
    return out;
  },

  meteors(start, end) {
    const out = [];
    for (let y = start.getFullYear(); y <= end.getFullYear(); y++) {
      for (const s of METEOR_SHOWERS) {
        const d = new Date(y, s.m - 1, s.d, 2, 0, 0);
        const name = t("events.ms." + s.key + ".name");
        const desc = t("events.ms." + s.key + ".desc");
        out.push({ date: d, type: "meteor", emoji: "☄️", label: t("events.l_meteor"),
          title: t("events.meteorTitle", { name }),
          desc: t("events.meteorDesc", { desc, zhr: s.zhr }) });
      }
    }
    return out;
  },

  wireFilters() {
    document.querySelectorAll("[data-evfilter]").forEach(ch => {
      if (ch._wired) return; ch._wired = true;
      ch.addEventListener("click", () => {
        document.querySelectorAll("[data-evfilter]").forEach(c => c.classList.remove("on"));
        ch.classList.add("on");
        this.filter = ch.dataset.evfilter;
        this.paint();
      });
    });
  },

  paint() {
    const host = U.el("events-list");
    const now = new Date();
    const list = this.all.filter(e => this.filter === "all" || e.type === this.filter);
    if (!list.length) { host.innerHTML = `<p class="muted">${t("events.none", { n: CONFIG.EVENTS_MONTHS_AHEAD })}</p>`; return; }
    host.innerHTML = list.map(e => `
      <div class="event">
        <div class="date">
          <div class="d">${e.date.getDate()}</div>
          <div class="m">${U.monthShort(e.date)}</div>
        </div>
        <div>
          <div class="event-type">${e.emoji} ${U.esc(e.label)}</div>
          <div class="title">${U.esc(e.title)}</div>
          <div class="desc">${U.esc(e.desc)}</div>
        </div>
        <div class="cd">${t("events.in", { t: U.countdown(e.date, now) })}</div>
      </div>`).join("");
  }
};

window.Events = Events;
