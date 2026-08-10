/* =============================================================================
   events.js  —  upcoming astronomical events
   Eclipses, Moon phases, planetary oppositions & elongations, and seasons are
   COMPUTED with Astronomy Engine. Meteor-shower peaks come from a curated list.
   ============================================================================= */

const METEOR_SHOWERS = [
  { name: "Quadrantids",        m: 1,  d: 4,  zhr: 110, desc: "Sharp, brief peak; blue meteors. Radiant in Boötes." },
  { name: "Lyrids",             m: 4,  d: 22, zhr: 18,  desc: "Fast meteors from Comet Thatcher; occasional fireballs." },
  { name: "Eta Aquariids",      m: 5,  d: 6,  zhr: 50,  desc: "Debris from Halley's Comet; best before dawn." },
  { name: "Delta Aquariids",    m: 7,  d: 30, zhr: 25,  desc: "Faint, steady meteors; good from the south." },
  { name: "Perseids",           m: 8,  d: 12, zhr: 100, desc: "The summer classic — bright, fast, many fireballs." },
  { name: "Draconids",          m: 10, d: 8,  zhr: 10,  desc: "Slow meteors; best in the evening, occasional outbursts." },
  { name: "Orionids",           m: 10, d: 21, zhr: 20,  desc: "Also from Halley's Comet; fast and faint." },
  { name: "Leonids",            m: 11, d: 17, zhr: 15,  desc: "Very fast; parent comet Tempel–Tuttle can bring storms." },
  { name: "Geminids",           m: 12, d: 14, zhr: 150, desc: "The year's best — bright, plentiful, multicoloured." },
  { name: "Ursids",             m: 12, d: 22, zhr: 10,  desc: "A quiet shower near the winter solstice." },
];

const Events = {
  all: [],
  filter: "all",

  async render() {
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
        let title = isFull ? "Full Moon" : "New Moon";
        let desc = isFull ? "The Moon is fully lit — bright all night."
                          : "The Moon is between Earth and Sun — darkest skies for deep-sky viewing.";
        if (isFull) {
          try {
            const gm = Astronomy.GeoMoon(d);
            const km = Math.sqrt(gm.x*gm.x+gm.y*gm.y+gm.z*gm.z)*149597870.7;
            if (km < 361000) { title = "Full Moon (Supermoon)"; desc = "A Supermoon — the full Moon near its closest approach, appearing slightly larger and brighter."; }
          } catch(e){}
        }
        out.push({ date: d, type: "moon", emoji: isFull ? "🌕" : "🌑", label: "Moon", title, desc });
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
        out.push({ date: d, type: "eclipse", emoji: "🌘", label: "Eclipse",
          title: `${cap(kind)} Lunar Eclipse`,
          desc: kind === "total"
            ? "The Moon passes fully into Earth's shadow and turns coppery red — a “Blood Moon.” Safe to watch with the naked eye."
            : `The Moon passes through Earth's ${kind === "partial" ? "" : "outer "}shadow. Visible from the entire night side of Earth.` });
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
        out.push({ date: d, type: "eclipse", emoji: "🌑", label: "Eclipse",
          title: `${cap(e.kind)} Solar Eclipse`,
          desc: `The Moon covers the Sun somewhere on Earth (peak near ${e.latitude.toFixed(0)}°, ${e.longitude.toFixed(0)}°). NEVER look at the Sun without proper eclipse glasses.` });
      }
      e = Astronomy.NextGlobalSolarEclipse(e.peak);
    }
    return out;
  },

  oppositions(start, end) {
    const out = [];
    const planets = ["Mars","Jupiter","Saturn","Uranus","Neptune"];
    for (const b of planets) {
      try {
        let t = Astronomy.SearchRelativeLongitude(Astronomy.Body[b], 180, start);
        if (t && t.date <= end) {
          out.push({ date: t.date, type: "planet", emoji: "🪐", label: "Planet",
            title: `${b} at Opposition`,
            desc: `${b} is opposite the Sun — closest, biggest, and brightest for the year, and up all night. The best time to observe it.` });
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
            const when = e.visibility === "morning" ? "before sunrise in the east" : "after sunset in the west";
            out.push({ date: e.time.date, type: "planet", emoji: b === "Venus" ? "🌟" : "☿", label: "Planet",
              title: `${b} at Greatest Elongation`,
              desc: `${b} is at its farthest from the Sun in our sky (${e.elongation.toFixed(0)}°) — best visible ${when}.` });
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
          [s.mar_equinox.date, "March Equinox", "Day and night nearly equal; spring in the north, autumn in the south."],
          [s.jun_solstice.date, "June Solstice", "Longest day in the northern hemisphere, shortest in the south."],
          [s.sep_equinox.date, "September Equinox", "Day and night nearly equal; autumn in the north, spring in the south."],
          [s.dec_solstice.date, "December Solstice", "Shortest day in the north, longest in the south."],
        ];
        items.forEach(([d, title, desc]) => out.push({ date: d, type: "season", emoji: "🌍", label: "Season", title, desc }));
      } catch(e){}
    }
    return out;
  },

  meteors(start, end) {
    const out = [];
    for (let y = start.getFullYear(); y <= end.getFullYear(); y++) {
      for (const s of METEOR_SHOWERS) {
        const d = new Date(y, s.m - 1, s.d, 2, 0, 0);
        out.push({ date: d, type: "meteor", emoji: "☄️", label: "Meteors",
          title: `${s.name} Meteor Shower — Peak`,
          desc: `${s.desc} Up to ~${s.zhr} meteors/hour under dark skies. Best after midnight; no telescope needed — just look up.` });
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
    if (!list.length) { host.innerHTML = `<p class="muted">No events of this type in the next ${CONFIG.EVENTS_MONTHS_AHEAD} months.</p>`; return; }
    host.innerHTML = list.map(e => `
      <div class="event">
        <div class="date">
          <div class="d">${e.date.getDate()}</div>
          <div class="m">${e.date.toLocaleDateString(undefined,{month:"short"})}</div>
        </div>
        <div>
          <div class="event-type">${e.emoji} ${e.label}</div>
          <div class="title">${U.esc(e.title)}</div>
          <div class="desc">${U.esc(e.desc)}</div>
        </div>
        <div class="cd">in ${U.countdown(e.date, now)}</div>
      </div>`).join("");
  }
};

function cap(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

window.Events = Events;
