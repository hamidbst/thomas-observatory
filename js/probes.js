/* =============================================================================
   probes.js  —  "Sondes & télescopes": Voyager 1 & 2 and the James Webb telescope
   · Voyagers: live distances, light time, speed and direction in the sky, from
     data/probes.json (NASA/JPL Horizons, made by tools/make_probes.py). Each
     probe's position and velocity at one date are extrapolated in a straight
     line: far from the planets they barely curve (< 0.0001 AU a year), so the
     file stays accurate for years. Their past paths draw the trajectory map.
   · The sky map also shows where they are (Sky.drawSolarSystem → Probes.skyMarks).
   · Webb: where it sits (L2), key facts, and the latest pictures from ESA's feed.
   ============================================================================= */

const PR_AU_KM = 149597870.7, PR_C_KMS = 299792.458;

const PR_TXT = {
  en: {
    title: "Probes & Telescopes",
    intro: "Our robots far from home: the two Voyager probes, launched in 1977 and still talking to us from beyond the planets, and the James Webb Space Telescope, which looks back to the dawn of the Universe.",
    launched: "Launched {date}",
    fromEarth: "Distance from Earth", km: "km",
    auLine: "That's {n} times the distance from the Earth to the Sun.",
    light: "A radio message takes <b>{h} h {m} min</b> to reach it.",
    speed: "Speed: <b>{v} km/s</b>, about {kmh} km/h.",
    sky: "In the sky: towards the constellation <b>{con}</b>.",
    up: "It's above your horizon right now ({alt}°, {dir}): find it on the Live Sky map!",
    down: "It's below your horizon right now.",
    never: "From where you are, it never rises above the horizon: it's too far {side} in the sky. To see it, you'd have to travel {side} of latitude {lim}.",
    v1status: "In interstellar space since 25 August 2012: the first human-made object to get there.",
    v2status: "In interstellar space since 5 November 2018. The only probe to have visited Uranus and Neptune.",
    mapTitle: "Their journey through the Solar System",
    mapNote: "Seen from above the Solar System. Distances are squeezed (the further out, the more) so that everything fits: in reality Voyager 1 is about 6 times further than Neptune.",
    play: "▶ Play", pause: "⏸ Pause", now: "Today",
    heliopause: "edge of the Sun's bubble",
    storiesTitle: "Amazing stories",
    stories: [
      ["💿", "A message for aliens", "Each Voyager carries a gold-plated record: greetings in 55 languages, music from Bach to Chuck Berry, sounds of Earth (rain, laughter, a heartbeat) and 115 pictures. With instructions on how to play it!"],
      ["🔵", "The Pale Blue Dot", "In 1990, Voyager 1 turned around and photographed the Earth from 6 billion km away: a tiny blue speck in a ray of sunlight. It's one of the most famous photos ever taken."],
      ["🔋", "Running on a nuclear battery", "Too far from the Sun for solar panels, the Voyagers run on a nuclear battery that weakens a little every year. Engineers switch instruments off one by one to keep them talking as long as possible."],
      ["🌠", "Leaving the Sun's bubble", "The Sun blows a wind that makes a huge bubble around the planets. Voyager 1 crossed its edge in 2012, Voyager 2 in 2018. In about 40,000 years, Voyager 1 will pass near another star."],
    ],
    webbTitle: "James Webb Space Telescope",
    webbIntro: "Launched on 25 December 2021 on a European Ariane 5 rocket from Kourou, Webb is the largest telescope ever sent into space. It sees in infrared, the light of warm things: it can look through clouds of dust and see the first galaxies, born more than 13 billion years ago.",
    webbWhere: "Where is it?",
    webbWhereTxt: "Webb doesn't orbit the Earth. It sits 1.5 million km away (4 times further than the Moon) on the side facing away from the Sun, at a spot called L2. There, the Sun, the Earth and the Moon are always behind its sunshield, which keeps it ice-cold.",
    webbDir: "From Earth, it's roughly in the direction of the constellation <b>{con}</b>, opposite the Sun: high in the sky around midnight. Far too faint to see, though!",
    l2: "L2", sun: "Sun", earth: "Earth", moon: "Moon", notScale: "not to scale",
    facts: [
      ["🪞", "6.5 m", "golden mirror, made of 18 hexagons"],
      ["⛱️", "21 × 14 m", "sunshield, about the size of a tennis court"],
      ["🥶", "−233 °C", "on the cold side, to see faint infrared light"],
      ["🕰️", "13.5 billion years", "how far back in time it can look"],
    ],
    gallery: "Webb's latest pictures", galleryNote: "From ESA's official Webb website (titles in English). Click a picture to see it big.",
    galleryErr: "The pictures couldn't be loaded right now.",
  },
  fr: {
    title: "Sondes & télescopes",
    intro: "Nos robots loin de la maison : les deux sondes Voyager, lancées en 1977 et qui nous parlent encore depuis au-delà des planètes, et le télescope spatial James Webb, qui remonte jusqu'à l'aube de l'Univers.",
    launched: "Lancée le {date}",
    fromEarth: "Distance depuis la Terre", km: "km",
    auLine: "C'est {n} fois la distance de la Terre au Soleil.",
    light: "Un message radio met <b>{h} h {m} min</b> pour l'atteindre.",
    speed: "Vitesse : <b>{v} km/s</b>, environ {kmh} km/h.",
    sky: "Dans le ciel : en direction de la constellation <b>{con}</b>.",
    up: "Elle est au-dessus de ton horizon en ce moment ({alt}°, {dir}) : repère-la sur la carte du ciel !",
    down: "Elle est sous ton horizon en ce moment.",
    never: "D'où tu es, elle ne se lève jamais au-dessus de l'horizon : elle est trop au {side} dans le ciel. Pour la voir, il faudrait voyager au {side} de la latitude {lim}.",
    v1status: "Dans l'espace interstellaire depuis le 25 août 2012 : le premier objet humain à y arriver.",
    v2status: "Dans l'espace interstellaire depuis le 5 novembre 2018. La seule sonde à avoir visité Uranus et Neptune.",
    mapTitle: "Leur voyage à travers le système solaire",
    mapNote: "Vu d'au-dessus du système solaire. Les distances sont resserrées (d'autant plus qu'on s'éloigne) pour que tout tienne : en réalité, Voyager 1 est environ 6 fois plus loin que Neptune.",
    play: "▶ Lecture", pause: "⏸ Pause", now: "Aujourd'hui",
    heliopause: "bord de la bulle du Soleil",
    storiesTitle: "Des histoires incroyables",
    stories: [
      ["💿", "Un message pour les extraterrestres", "Chaque Voyager emporte un disque plaqué or : des salutations en 55 langues, de la musique de Bach à Chuck Berry, des sons de la Terre (la pluie, des rires, un battement de cœur) et 115 images. Avec le mode d'emploi pour l'écouter !"],
      ["🔵", "Le point bleu pâle", "En 1990, Voyager 1 s'est retournée et a photographié la Terre à 6 milliards de km : un minuscule point bleu dans un rayon de soleil. C'est l'une des photos les plus célèbres de l'histoire."],
      ["🔋", "Une pile nucléaire", "Trop loin du Soleil pour des panneaux solaires, les Voyager fonctionnent avec une pile nucléaire qui faiblit un peu chaque année. Les ingénieurs éteignent les instruments un par un pour qu'elles nous parlent le plus longtemps possible."],
      ["🌠", "Sortir de la bulle du Soleil", "Le Soleil souffle un vent qui forme une immense bulle autour des planètes. Voyager 1 en a franchi le bord en 2012, Voyager 2 en 2018. Dans environ 40 000 ans, Voyager 1 passera près d'une autre étoile."],
    ],
    webbTitle: "Le télescope spatial James Webb",
    webbIntro: "Lancé le 25 décembre 2021 par une fusée européenne Ariane 5 depuis Kourou, Webb est le plus grand télescope jamais envoyé dans l'espace. Il voit dans l'infrarouge, la lumière des objets tièdes : il peut regarder à travers les nuages de poussière et voir les premières galaxies, nées il y a plus de 13 milliards d'années.",
    webbWhere: "Où est-il ?",
    webbWhereTxt: "Webb ne tourne pas autour de la Terre. Il se trouve à 1,5 million de km (4 fois plus loin que la Lune), du côté opposé au Soleil, à un endroit appelé L2. Là, le Soleil, la Terre et la Lune sont toujours derrière son pare-soleil, ce qui le garde glacé.",
    webbDir: "Depuis la Terre, il est à peu près en direction de la constellation <b>{con}</b>, à l'opposé du Soleil : haut dans le ciel vers minuit. Bien trop faible pour être vu, hélas !",
    l2: "L2", sun: "Soleil", earth: "Terre", moon: "Lune", notScale: "pas à l'échelle",
    facts: [
      ["🪞", "6,5 m", "miroir doré, fait de 18 hexagones"],
      ["⛱️", "21 × 14 m", "pare-soleil, à peu près la taille d'un court de tennis"],
      ["🥶", "−233 °C", "du côté froid, pour voir la faible lumière infrarouge"],
      ["🕰️", "13,5 milliards d'années", "jusqu'où il peut remonter dans le passé"],
    ],
    gallery: "Les dernières images de Webb", galleryNote: "Issues du site officiel de Webb à l'ESA (titres en anglais). Clique sur une image pour la voir en grand.",
    galleryErr: "Les images n'ont pas pu être chargées pour le moment.",
  },
};

// Flybys and milestones drawn on the map (date → marked on the path)
const PR_FLYBYS = {
  v1: [["Jupiter", "1979-03-05"], ["Saturn", "1980-11-12"]],
  v2: [["Jupiter", "1979-07-09"], ["Saturn", "1981-08-25"], ["Uranus", "1986-01-24"], ["Neptune", "1989-08-25"]],
};
const PR_LAUNCH = { v1: "1977-09-05", v2: "1977-08-20" };
const PR_COLOR = { v1: "#ffcf6b", v2: "#6ee7a8" };
const PR_ORBITS = [["Earth", 1.0], ["Mars", 1.52], ["Jupiter", 5.2], ["Saturn", 9.58], ["Uranus", 19.2], ["Neptune", 30.07]];

const Probes = {
  data: null, loading: null, started: false, timer: null,
  year: null, playing: false,

  T(key, vars) {
    let s = (PR_TXT[I18N.lang] || PR_TXT.en)[key];
    if (vars && typeof s === "string") for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  },

  load() {
    if (!this.loading) this.loading = fetch(`data/probes.json?v=${window.SITE_VERSION || 0}`)
      .then(r => r.json()).then(j => (this.data = j)).catch(() => null);
    return this.loading;
  },

  // Where a Voyager is at `date`: from the Sun / from the Earth (AU), direction
  // seen from Earth (RA hours, Dec degrees, J2000) and speed (km/s).
  state(key, date = new Date()) {
    const p = this.data.probes[key];
    const days = (date - new Date(this.data.epoch)) / 864e5;
    const pos = p.pos.map((x, i) => x + p.vel[i] * days);
    const e = Astronomy.HelioVector(Astronomy.Body.Earth, date);
    const g = [pos[0] - e.x, pos[1] - e.y, pos[2] - e.z];
    const rE = Math.hypot(...g);
    return { rS: Math.hypot(...pos), rE, pos,
      ra: U.norm24(Math.atan2(g[1], g[0]) * 12 / Math.PI), dec: Math.asin(g[2] / rE) * 180 / Math.PI,
      v: Math.hypot(...p.vel) * PR_AU_KM / 86400 };
  },

  // the constellation a direction falls in, in the page's language
  con(ra, dec) {
    let c = "";
    try { c = Astronomy.Constellation(ra, dec).name; } catch (e) {}
    return I18N.lang === "fr" ? (CONS_FR[c] || c) : c;
  },

  // markers for the Live Sky map (called from Sky.drawSolarSystem)
  skyMarks(date, lat, lst) {
    if (!this.data) return [];
    return ["v1", "v2"].map(k => {
      const st = this.state(k, date);
      const h = U.eqToHoriz(st.ra, st.dec, lat, lst);
      const bn = (st.rE * PR_AU_KM / 1e9).toFixed(1).replace(".", I18N.lang === "fr" ? "," : ".");
      return { key: k, name: k === "v1" ? "Voyager 1" : "Voyager 2", color: PR_COLOR[k], alt: h.alt, az: h.az,
        desc: I18N.lang === "fr"
          ? `Sonde spatiale à ${bn} milliards de km. Bien trop loin pour être vue, mais elle est dans cette direction !`
          : `Space probe ${bn} billion km away. Far too distant to see, but this is where it is!` };
    });
  },

  enter() {
    if (!this.started) {
      this.started = true;
      document.addEventListener("language-changed", () => { if (U.el("tab-probes").classList.contains("active")) this.render(); });
    }
    this.load().then(() => this.render());
  },

  render() {
    const host = U.el("probes-app");
    if (!this.data) { host.innerHTML = `<div class="panel muted">${U.esc(this.T("galleryErr"))}</div>`; return; }
    const loc = I18N.lang === "fr" ? "fr-FR" : "en-GB";
    const card = (k) => `
      <div class="panel pr-card" style="--c:${PR_COLOR[k]}">
        <div class="pr-head"><span class="pr-emoji">🛰️</span><div>
          <div class="pr-name">${k === "v1" ? "Voyager 1" : "Voyager 2"}</div>
          <div class="small muted">${U.esc(this.T("launched", { date: new Date(PR_LAUNCH[k] + "T12:00").toLocaleDateString(loc, { day: "numeric", month: "long", year: "numeric" }) }))}</div>
        </div></div>
        <div class="pr-label">${U.esc(this.T("fromEarth"))}</div>
        <div class="pr-km"><span id="pr-km-${k}">…</span> <span class="pr-unit">${this.T("km")}</span></div>
        <div class="pr-lines" id="pr-lines-${k}"></div>
        <div class="pr-status">${U.esc(this.T(k + "status"))}</div>
      </div>`;
    const stories = this.T("stories").map(([e, t1, d]) => `
      <div class="pr-story"><div class="pr-story-e">${e}</div><div><div class="pr-story-t">${U.esc(t1)}</div><div class="small">${U.esc(d)}</div></div></div>`).join("");
    const facts = this.T("facts").map(([e, big, d]) => `
      <div class="pr-fact"><div class="pr-fact-e">${e}</div><div class="pr-fact-b">${U.esc(big)}</div><div class="small muted">${U.esc(d)}</div></div>`).join("");
    const e = Astronomy.HelioVector(Astronomy.Body.Earth, new Date());   // L2 lies along Sun → Earth
    const r = Math.hypot(e.x, e.y, e.z);
    const webbCon = this.con(U.norm24(Math.atan2(e.y, e.x) * 12 / Math.PI), Math.asin(e.z / r) * 180 / Math.PI);

    host.innerHTML = `
      <div class="panel">
        <div class="section-title">🛰️ ${U.esc(this.T("title"))}</div>
        <p style="margin:0;">${U.esc(this.T("intro"))}</p>
      </div>
      <div class="grid cols-2" style="margin-top:18px;">${card("v1")}${card("v2")}</div>
      <div class="panel" style="margin-top:18px;">
        <div class="section-title">🗺️ ${U.esc(this.T("mapTitle"))}</div>
        <div class="pr-map-wrap"><canvas id="pr-map"></canvas></div>
        <div class="pr-controls">
          <button class="btn small" id="pr-play">${this.T("play")}</button>
          <input type="range" id="pr-year" min="1977.6" max="${this.nowYear().toFixed(3)}" step="0.01" value="${(this.year || this.nowYear()).toFixed(3)}" aria-label="year" />
          <button class="btn small" id="pr-now">${U.esc(this.T("now"))}</button>
        </div>
        <p class="small muted" style="margin:10px 0 0;">${U.esc(this.T("mapNote"))}</p>
      </div>
      <div class="panel" style="margin-top:18px;">
        <div class="section-title">✨ ${U.esc(this.T("storiesTitle"))}</div>
        <div class="pr-stories">${stories}</div>
      </div>
      <div class="panel" style="margin-top:18px;">
        <div class="section-title">🔭 ${U.esc(this.T("webbTitle"))}</div>
        <p style="margin-top:0;">${U.esc(this.T("webbIntro"))}</p>
        <div class="pr-facts">${facts}</div>
        <div class="pr-webb">
          <div>${this.l2Diagram()}</div>
          <div>
            <div class="pr-story-t">📍 ${U.esc(this.T("webbWhere"))}</div>
            <p class="small" style="margin:6px 0;">${U.esc(this.T("webbWhereTxt"))}</p>
            <p class="small" style="margin:6px 0;">${this.T("webbDir", { con: U.esc(webbCon) })}</p>
          </div>
        </div>
        <div class="pr-story-t" style="margin-top:18px;">🖼️ ${U.esc(this.T("gallery"))}</div>
        <p class="small muted" style="margin:4px 0 10px;">${U.esc(this.T("galleryNote"))}</p>
        <div class="pr-gallery" id="pr-gallery"><div class="loading"><span class="spinner"></span></div></div>
      </div>`;

    const slider = U.el("pr-year");
    slider.addEventListener("input", () => { this.stop(); this.year = +slider.value; this.drawMap(); });
    U.el("pr-play").addEventListener("click", () => this.playing ? this.stop() : this.play());
    U.el("pr-now").addEventListener("click", () => { this.stop(); this.year = this.nowYear(); slider.value = this.year; this.drawMap(); });
    if (!this._resize) { this._resize = () => { if (U.el("pr-map")) this.drawMap(); }; addEventListener("resize", this._resize); }
    this.drawMap();
    this.tick();
    clearInterval(this.timer);
    this.timer = setInterval(() => { if (U.el("tab-probes").classList.contains("active")) this.tick(); }, 1000);
    this.gallery();
  },

  nowYear(d = new Date()) { return 2000 + (d - Date.UTC(2000, 0, 1, 12)) / (365.25 * 864e5); },

  // the live numbers on the two Voyager cards
  // a direction that never clears the horizon from this latitude gets an explanation instead of "below right now"
  neverUp(dec, lat) {
    if (dec > lat - 90 && dec < lat + 90) return "";
    const south = dec < 0, lim = Math.round(south ? dec + 90 : dec - 90);
    const fr = I18N.lang === "fr", side = south ? (fr ? "sud" : "south") : (fr ? "nord" : "north");
    return this.T("never", { side, lim: Math.abs(lim) + "° " + (lim >= 0 ? "N" : "S") });
  },

  tick() {
    const now = new Date(), fr = I18N.lang === "fr";
    const lat = LOC.current.lat, lst = U.lst(now, LOC.current.lon);
    const nf = (n, d = 0) => n.toLocaleString(fr ? "fr-FR" : "en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });
    for (const k of ["v1", "v2"]) {
      const st = this.state(k, now), km = U.el("pr-km-" + k), lines = U.el("pr-lines-" + k);
      if (!km) return;
      km.textContent = nf(st.rE * PR_AU_KM);
      const lt = st.rE * PR_AU_KM / PR_C_KMS / 3600;              // light time, hours
      const h = U.eqToHoriz(st.ra, st.dec, lat, lst);
      lines.innerHTML = [
        U.esc(this.T("auLine", { n: nf(st.rE, 1) })),
        this.T("light", { h: Math.floor(lt), m: Math.floor((lt % 1) * 60) }),
        this.T("speed", { v: nf(st.v, 1), kmh: nf(Math.round(st.v * 3600 / 1000) * 1000) }),
        this.T("sky", { con: U.esc(this.con(st.ra, st.dec)) }) + " "
          + U.esc(h.alt > 0 ? this.T("up", { alt: Math.round(h.alt), dir: U.compass(h.az) }) : this.neverUp(st.dec, lat) || this.T("down")),
      ].map(x => `<div>${x}</div>`).join("");
    }
  },

  play() {
    const slider = U.el("pr-year");
    if (!slider) return;
    if (this.year == null || this.year >= this.nowYear() - 0.05) this.year = 1977.6;
    this.playing = true; U.el("pr-play").textContent = this.T("pause");
    const step = () => {
      if (!this.playing || !U.el("pr-year")) return;
      this.year = Math.min(this.nowYear(), this.year + 0.08);
      U.el("pr-year").value = this.year; this.drawMap();
      if (this.year >= this.nowYear()) this.stop(); else requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },
  stop() { this.playing = false; const b = U.el("pr-play"); if (b) b.textContent = this.T("play"); },

  // top view of the Solar System with both journeys up to the chosen year
  drawMap() {
    const cv = U.el("pr-map");
    if (!cv) return;
    const w = cv.parentElement.clientWidth, hgt = Math.round(Math.min(560, w * 0.8));
    const dpr = window.devicePixelRatio || 1;
    cv.width = w * dpr; cv.height = hgt * dpr; cv.style.height = hgt + "px";
    const ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, hgt);
    const year = this.year == null ? this.nowYear() : this.year;
    const cx = w * 0.56, cy = hgt * 0.5;
    const k = (Math.min(w * 0.44, hgt / 2) - 14) / Math.sqrt(185);   // radius ∝ √distance
    // direction as seen from above, distance from the Sun in 3D (the Voyagers fly far above/below the planets)
    const P = (x, y, z = 0) => { const r = Math.hypot(x, y, z), f = Math.hypot(x, y), s = f ? k * Math.sqrt(r) / f : 0; return [cx + x * s, cy - y * s]; };
    const fr = I18N.lang === "fr";

    // the Sun's bubble (heliopause, ~120 AU) and the planets' orbits
    ctx.setLineDash([4, 5]); ctx.strokeStyle = "rgba(185,140,255,0.45)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, k * Math.sqrt(120), 0, 7); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "rgba(185,140,255,0.8)"; ctx.font = "11px Segoe UI, sans-serif"; ctx.textAlign = "center";
    ctx.fillText(this.T("heliopause"), cx, cy - k * Math.sqrt(120) - 5);
    const date = new Date(Date.UTC(2000, 0, 1, 12) + (year - 2000) * 365.25 * 864e5);
    const eps = 23.4392911 * Math.PI / 180;
    for (const [body, a] of PR_ORBITS) {
      ctx.strokeStyle = "rgba(125,160,230,0.18)";
      ctx.beginPath(); ctx.arc(cx, cy, k * Math.sqrt(a), 0, 7); ctx.stroke();
      if (a < 5) continue;                               // inner planets: too crowded to label
      try {
        const v = Astronomy.HelioVector(Astronomy.Body[body], date);
        const [px, py] = P(v.x, v.y * Math.cos(eps) + v.z * Math.sin(eps), -v.y * Math.sin(eps) + v.z * Math.cos(eps));
        ctx.fillStyle = "#c9d6ff"; ctx.beginPath(); ctx.arc(px, py, 3, 0, 7); ctx.fill();
        ctx.fillStyle = "rgba(201,214,255,0.8)"; ctx.textAlign = "left"; ctx.fillText(I18N.body(body), px + 5, py - 4);
      } catch (e) {}
    }
    ctx.fillStyle = "#ffd66b"; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, 7); ctx.fill();

    // each probe: path so far, flybys passed, current position
    for (const key of ["v1", "v2"]) {
      const path = this.data.probes[key].path.filter(p => p[0] <= year);
      if (!path.length) continue;
      let last = path[path.length - 1];
      if (year > last[0]) {                              // after the file's last point: straight line
        const st = this.state(key, date);
        last = [year, st.pos[0], st.pos[1] * Math.cos(eps) + st.pos[2] * Math.sin(eps), -st.pos[1] * Math.sin(eps) + st.pos[2] * Math.cos(eps)];
        path.push(last);
      }
      ctx.strokeStyle = PR_COLOR[key]; ctx.lineWidth = 2; ctx.beginPath();
      path.forEach((p, i) => { const [x, y] = P(p[1], p[2], p[3]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.stroke(); ctx.lineWidth = 1;
      for (const [body, d] of PR_FLYBYS[key]) {
        const fy = this.nowYear(new Date(d + "T12:00Z"));
        if (fy > year) continue;
        const near = this.data.probes[key].path.reduce((b, p) => Math.abs(p[0] - fy) < Math.abs(b[0] - fy) ? p : b);
        const [x, y] = P(near[1], near[2], near[3]);
        ctx.strokeStyle = PR_COLOR[key]; ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.stroke();
      }
      const [x, y] = P(last[1], last[2], last[3]);
      ctx.fillStyle = PR_COLOR[key]; ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill();
      ctx.font = "600 12px Segoe UI, sans-serif"; ctx.textAlign = x > cx ? "left" : "right";
      ctx.fillText(key === "v1" ? "Voyager 1" : "Voyager 2", x + (x > cx ? 8 : -8), y + 4);
    }

    // year
    ctx.fillStyle = "rgba(232,236,248,0.9)"; ctx.font = "800 26px Segoe UI, sans-serif"; ctx.textAlign = "left";
    ctx.fillText(String(Math.floor(year)), 10, 32);
    ctx.font = "11px Segoe UI, sans-serif"; ctx.fillStyle = "rgba(154,166,196,0.9)";
    ctx.fillText(fr ? "☀️ au centre" : "☀️ in the centre", 10, 50);
  },

  // Sun – Earth – L2 sketch (not to scale)
  l2Diagram() {
    const T = (k) => U.esc(this.T(k));
    return `<svg viewBox="0 0 320 120" class="pr-l2" role="img" aria-label="Sun, Earth and L2">
      <circle cx="34" cy="60" r="22" fill="#ffd66b"/><text x="34" y="100" text-anchor="middle">${T("sun")}</text>
      <line x1="60" y1="60" x2="300" y2="60" stroke="rgba(125,160,230,0.35)" stroke-dasharray="4 4"/>
      <circle cx="200" cy="60" r="7" fill="#5fa8ff"/><text x="200" y="88" text-anchor="middle">${T("earth")}</text>
      <circle cx="200" cy="60" r="18" fill="none" stroke="rgba(125,160,230,0.3)"/><circle cx="218" cy="60" r="2.5" fill="#cfd6e6"/>
      <text x="224" y="50" class="pr-l2-s">${T("moon")}</text>
      <text x="280" y="44" text-anchor="middle" style="font-size:17px;">🛰️</text>
      <text x="280" y="80" text-anchor="middle" font-weight="700">${T("l2")}</text>
      <text x="240" y="108" text-anchor="middle" class="pr-l2-s">${I18N.lang === "fr" ? "1,5 million km" : "1.5 million km"} · ${T("notScale")}</text>
    </svg>`;
  },

  // latest Webb pictures from ESA's RSS feed (one per news release)
  gallery() {
    const host = U.el("pr-gallery");
    const fill = (items) => {
      if (!U.el("pr-gallery")) return;
      host.innerHTML = items.length ? items.map(it => `
        <a class="pr-pic" href="${U.esc(it.link)}" target="_blank" rel="noopener">
          <img src="${U.esc(it.img)}" alt="${U.esc(it.title)}" loading="lazy" />
          <span>${U.esc(it.title)}</span></a>`).join("")
        : `<p class="small muted">${U.esc(this.T("galleryErr"))}</p>`;
    };
    if (this._pics) return fill(this._pics);
    fetch("https://esawebb.org/images/feed/").then(r => r.text()).then(xml => {
      const doc = new DOMParser().parseFromString(xml, "application/xml");
      const seen = new Set(), out = [];
      for (const it of doc.querySelectorAll("item")) {
        const link = (it.querySelector("link") || {}).textContent || "";
        const code = (link.match(/\/images\/([a-z0-9-]+)\/?$/i) || [])[1];
        if (!code || !/^https:\/\/esawebb\.org\//.test(link)) continue;
        const release = code.replace(/[a-z]$/, "");
        if (seen.has(release)) continue;
        seen.add(release);
        out.push({ link, title: ((it.querySelector("title") || {}).textContent || "").trim(),
          img: `https://cdn.esawebb.org/archives/images/thumb350x/${code}.jpg` });
        if (out.length === 6) break;
      }
      this._pics = out; fill(out);
    }).catch(() => fill([]));
  },
};

window.Probes = Probes;
