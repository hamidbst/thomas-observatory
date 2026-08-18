/* =============================================================================
   highlights.js  —  "What can I see tonight?"
   Computes the best objects visible from the observer's location during tonight's
   dark window, ranks them by observability (altitude, brightness, Moon glare),
   and says when/where/how to look. Uses Astronomy Engine + a curated object list.
   ============================================================================= */

// Curated "greatest hits" deep-sky objects (J2000: ra in hours, dec in degrees).
const HL_DSO = [
  { key:"pleiades", ra:3.790, dec:24.11, mag:1.6, inst:"eye", emoji:"✨", fame:88,
    name:{en:"The Pleiades (Seven Sisters)", fr:"les Pléiades", fa:"پروین (ثریا)"},
    blurb:{en:"A sparkling little cluster of blue baby stars — how many can you count?", fr:"un petit amas scintillant de jeunes étoiles bleues — combien peux-tu en compter ?", fa:"خوشه‌ای کوچک و درخشان از ستاره‌های آبیِ جوان — چند تا می‌توانی بشماری؟"} },
  { key:"orion", ra:5.588, dec:-5.39, mag:4.0, inst:"eye", emoji:"🌫️", fame:92,
    name:{en:"The Orion Nebula", fr:"la nébuleuse d'Orion", fa:"سحابی جبّار (شکارچی)"},
    blurb:{en:"A glowing cloud where brand-new stars are being born, in Orion's sword.", fr:"un nuage lumineux où naissent de nouvelles étoiles, dans l'épée d'Orion.", fa:"ابری درخشان که در آن ستاره‌های نو زاده می‌شوند، در شمشیر شکارچی."} },
  { key:"andromeda", ra:0.712, dec:41.27, mag:3.4, inst:"eye", emoji:"🌌", fame:90,
    name:{en:"The Andromeda Galaxy", fr:"la galaxie d'Andromède", fa:"کهکشان آندرومدا"},
    blurb:{en:"The most distant thing your eyes can see — a whole galaxy, 2.5 million light-years away.", fr:"l'objet le plus lointain visible à l'œil nu — une galaxie entière, à 2,5 millions d'années-lumière.", fa:"دورترین چیزی که با چشم می‌بینی — یک کهکشان کامل، در ۲٫۵ میلیون سال نوری."} },
  { key:"beehive", ra:8.674, dec:19.98, mag:3.7, inst:"binoc", emoji:"🐝", fame:72,
    name:{en:"The Beehive Cluster", fr:"l'amas de la Ruche", fa:"خوشهٔ کندوی عسل"},
    blurb:{en:"A fuzzy patch to the eye that bursts into a swarm of stars in binoculars.", fr:"une tache floue à l'œil nu qui devient un essaim d'étoiles aux jumelles.", fa:"لکه‌ای مه‌آلود برای چشم که با دوربین دوچشمی به انبوهی از ستاره تبدیل می‌شود."} },
  { key:"m13", ra:16.695, dec:36.46, mag:5.8, inst:"binoc", emoji:"🔵", fame:78,
    name:{en:"The Great Hercules Cluster", fr:"l'amas d'Hercule", fa:"خوشهٔ بزرگ هرکول"},
    blurb:{en:"A tight ball of hundreds of thousands of ancient stars.", fr:"une boule serrée de centaines de milliers d'étoiles anciennes.", fa:"گویی فشرده از صدها هزار ستارهٔ کهن."} },
  { key:"double", ra:2.33, dec:57.14, mag:3.8, inst:"binoc", emoji:"✨", fame:74,
    name:{en:"The Double Cluster", fr:"le Double Amas", fa:"خوشهٔ دوتایی"},
    blurb:{en:"Two glittering star clusters side by side — beautiful in binoculars.", fr:"deux amas d'étoiles scintillants côte à côte — superbes aux jumelles.", fa:"دو خوشهٔ ستاره‌ایِ درخشان کنار هم — زیبا با دوربین دوچشمی."} },
  { key:"lagoon", ra:18.06, dec:-24.38, mag:4.6, inst:"binoc", emoji:"🌫️", fame:70,
    name:{en:"The Lagoon Nebula", fr:"la nébuleuse de la Lagune", fa:"سحابی مرداب"},
    blurb:{en:"A bright star-forming cloud toward the centre of our galaxy.", fr:"un nuage lumineux de formation d'étoiles vers le centre de la galaxie.", fa:"ابری درخشان و ستاره‌ساز به‌سوی مرکز کهکشان ما."} },
  { key:"omegacen", ra:13.446, dec:-47.48, mag:3.9, inst:"eye", emoji:"🔵", fame:86,
    name:{en:"Omega Centauri", fr:"Oméga du Centaure", fa:"اُمگا قنطورس"},
    blurb:{en:"The biggest, brightest globular cluster — millions of stars in one ball.", fr:"le plus grand et le plus brillant amas globulaire — des millions d'étoiles.", fa:"بزرگ‌ترین و درخشان‌ترین خوشهٔ کروی — میلیون‌ها ستاره در یک گوی."} },
  { key:"m22", ra:18.606, dec:-23.90, mag:5.1, inst:"binoc", emoji:"🔵", fame:68,
    name:{en:"The Sagittarius Cluster (M22)", fr:"l'amas M22 du Sagittaire", fa:"خوشهٔ کمان (M22)"},
    blurb:{en:"A big, bright ball of stars near the heart of the Milky Way.", fr:"une grande boule d'étoiles brillante près du cœur de la Voie lactée.", fa:"گوی بزرگ و درخشانی از ستاره‌ها نزدیک قلب راه شیری."} },
  { key:"m7", ra:17.897, dec:-34.79, mag:3.3, inst:"eye", emoji:"✨", fame:66,
    name:{en:"The Ptolemy Cluster (M7)", fr:"l'amas de Ptolémée (M7)", fa:"خوشهٔ بطلمیوس (M7)"},
    blurb:{en:"A bright scatter of stars known since ancient times.", fr:"une dispersion d'étoiles brillantes connue depuis l'Antiquité.", fa:"پراکندگی درخشانی از ستاره‌ها که از دوران باستان شناخته شده."} },
  { key:"albireo", ra:19.512, dec:27.96, mag:3.1, inst:"scope", emoji:"🎨", fame:62,
    name:{en:"Albireo (a colourful double star)", fr:"Albiréo (étoile double colorée)", fa:"آلبیریو (ستارهٔ دوتاییِ رنگی)"},
    blurb:{en:"One star that splits into a gold and a blue jewel in a small telescope.", fr:"une étoile qui se sépare en un joyau doré et un bleu dans une petite lunette.", fa:"ستاره‌ای که در تلسکوپ کوچک به دو نگینِ طلایی و آبی تقسیم می‌شود."} },
  { key:"ring", ra:18.885, dec:33.03, mag:8.8, inst:"scope", emoji:"💍", fame:64,
    name:{en:"The Ring Nebula", fr:"la nébuleuse de l'Anneau", fa:"سحابی حلقه"},
    blurb:{en:"A perfect smoke-ring puffed out by a dying star (needs a telescope).", fr:"un anneau de fumée parfait soufflé par une étoile mourante (télescope).", fa:"حلقهٔ دودِ کاملی که ستاره‌ای در حال مرگ بیرون داده (نیاز به تلسکوپ)."} },
  { key:"whirlpool", ra:13.497, dec:47.20, mag:8.4, inst:"scope", emoji:"🌀", fame:66,
    name:{en:"The Whirlpool Galaxy", fr:"la galaxie du Tourbillon", fa:"کهکشان گرداب"},
    blurb:{en:"Two galaxies caught mid-dance — a classic spiral (telescope).", fr:"deux galaxies en pleine danse — une spirale classique (télescope).", fa:"دو کهکشان در میانهٔ رقص — یک مارپیچ کلاسیک (تلسکوپ)."} },
];

// Planets & Moon — base interest, emoji, instrument, and blurb.
const HL_SS = {
  Moon:    { base:82, emoji:"🌙", inst:"binoc", blurb:{en:"Our nearest neighbour — binoculars reveal craters, mountains and dark 'seas'.", fr:"notre plus proche voisine — les jumelles révèlent cratères, montagnes et « mers » sombres.", fa:"نزدیک‌ترین همسایهٔ ما — با دوربین دوچشمی دهانه‌ها، کوه‌ها و «دریا»های تیره دیده می‌شوند."} },
  Venus:   { base:96, emoji:"♀", inst:"eye", blurb:{en:"The dazzling 'evening/morning star' — the brightest planet, impossible to miss.", fr:"l'éblouissante « étoile du soir/matin » — la planète la plus brillante, impossible à manquer.", fa:"«ستارهٔ صبح/شام» خیره‌کننده — درخشان‌ترین سیاره، غیرممکن است نبینی‌اش."} },
  Jupiter: { base:95, emoji:"♃", inst:"binoc", blurb:{en:"The biggest planet — with binoculars you can spot its four largest moons as tiny dots.", fr:"la plus grande planète — aux jumelles, repère ses quatre plus grandes lunes en petits points.", fa:"بزرگ‌ترین سیاره — با دوربین دوچشمی چهار قمر بزرگش را مثل نقطه‌های ریز می‌بینی."} },
  Saturn:  { base:90, emoji:"♄", inst:"scope", blurb:{en:"Its rings are the jewel of the night sky — any small telescope shows them.", fr:"ses anneaux sont le joyau du ciel — la moindre petite lunette les montre.", fa:"حلقه‌هایش نگین آسمان شب‌اند — هر تلسکوپ کوچکی آن‌ها را نشان می‌دهد."} },
  Mars:    { base:84, emoji:"♂", inst:"eye", blurb:{en:"The Red Planet, glowing amber to the naked eye.", fr:"la planète rouge, d'un éclat ambré à l'œil nu.", fa:"سیارهٔ سرخ، با درخششی کهربایی برای چشم غیرمسلح."} },
  Mercury: { base:58, emoji:"☿", inst:"eye", blurb:{en:"Elusive and quick — catch it low in the sky just after sunset or before sunrise.", fr:"insaisissable et rapide — attrape-la basse, juste après le coucher ou avant le lever du Soleil.", fa:"گریزپا و سریع — پایینِ آسمان، درست پس از غروب یا پیش از طلوع خورشید شکارش کن."} },
  Uranus:  { base:46, emoji:"⛢", inst:"binoc", blurb:{en:"A faint blue-green world — a fun challenge to hunt down with binoculars.", fr:"un monde bleu-vert pâle — un joli défi à débusquer aux jumelles.", fa:"دنیایی کم‌نور و آبی-سبز — چالشی جذاب برای یافتن با دوربین دوچشمی."} },
  Neptune: { base:34, emoji:"♆", inst:"scope", blurb:{en:"The most distant planet — you'll need a telescope to catch its tiny blue dot.", fr:"la planète la plus lointaine — il faut un télescope pour saisir son petit point bleu.", fa:"دورترین سیاره — برای دیدن نقطهٔ آبیِ ریزش به تلسکوپ نیاز داری."} },
};

const Highlights = {
  started: false,

  enter() {
    if (!this.started) {
      this.started = true;
      document.addEventListener("language-changed", () => this.render());
      document.addEventListener("location-changed", () => this.render());
    }
    this.render();
  },

  render() {
    const host = U.el("highlights");
    if (!host) return;
    let res;
    try { res = this.compute(); }
    catch (e) { console.error(e); host.innerHTML = ""; return; }

    if (!res || !res.list.length) {
      host.innerHTML = `<div class="panel"><div class="section-title">🔭 ${t("hl.title")}</div><p class="muted small">${t("hl.none")}</p></div>`;
      return;
    }
    const rows = res.list.map((o, i) => `
      <div class="hl-row">
        <div class="hl-rank">${i + 1}</div>
        <div class="hl-emoji">${o.emoji}</div>
        <div class="hl-body">
          <div class="hl-name">${U.esc(o.name)} <span class="hl-inst">${t("hl.inst_" + o.inst)}</span></div>
          <div class="hl-why">${U.esc(o.blurb)}</div>
          <div class="hl-when">🕒 ${t("hl.bestAround", { t: U.timeHMS(o.bestTime).slice(0,5) })} · 🧭 ${t("hl.look", { dir: U.compass(o.bestAz), alt: Math.round(o.bestAlt) })}</div>
        </div>
      </div>`).join("");

    host.innerHTML = `
      <div class="panel hl-panel">
        <div class="section-title">🔭 ${t("hl.title")}</div>
        <p class="small muted hl-intro">${t("hl.intro", { place: U.esc(LOC.current.name) })}</p>
        ${rows}
        ${res.milkyway ? `<div class="hl-bonus">🌌 ${t("hl.milkyway")}</div>` : ""}
        <p class="small muted hl-foot">${t("hl.foot")}</p>
      </div>`;
  },

  compute() {
    const lat = LOC.current.lat, lon = LOC.current.lon;
    const obs = new Astronomy.Observer(lat, lon, LOC.current.elevation || 0);
    const now = new Date();

    // tonight's dark window (dusk .. dawn), falling back sensibly
    const noon = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
    const setT = this._rise(obs, "Sun", -1, noon);
    const sunset = setT || new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0);
    const sunrise = this._rise(obs, "Sun", +1, sunset) || new Date(sunset.getTime() + 10 * 3600e3);
    let dusk = this._alt(obs, "Sun", -1, sunset, -12) || sunset;
    let dawn = this._alt(obs, "Sun", +1, new Date(sunrise.getTime() - 4 * 3600e3), -12) || sunrise;
    if (dawn <= dusk) { dusk = sunset; dawn = sunrise; }        // polar / no real darkness

    // sample times across the window (every ~20 min)
    const samples = [];
    for (let t2 = dusk.getTime(); t2 <= dawn.getTime(); t2 += 20 * 60000) samples.push(new Date(t2));
    if (samples.length < 2) samples.push(dawn);

    const mid = new Date((dusk.getTime() + dawn.getTime()) / 2);
    const moonFrac = (() => { try { return Astronomy.Illumination(Astronomy.Body.Moon, mid).phase_fraction; } catch (e) { return 0; } })();

    const cands = [];

    // ---- Solar system ----
    for (const body in HL_SS) {
      const info = HL_SS[body];
      const best = this._track(samples, lat, lon, (d) => {
        const eq = Astronomy.Equator(Astronomy.Body[body], d, obs, true, true);
        return { ra: eq.ra, dec: eq.dec };
      });
      if (best.alt < 8) continue;
      let mag = null; try { mag = Astronomy.Illumination(Astronomy.Body[body], best.time).mag; } catch (e) {}
      const score = info.base * (0.45 + 0.55 * Math.min(best.alt / 55, 1));
      cands.push({ score, emoji: info.emoji, inst: info.inst,
        name: (body === "Moon" ? I18N.body("Moon") : I18N.body(body)),
        blurb: this.L(info.blurb), bestTime: best.time, bestAlt: best.alt, bestAz: best.az });
    }

    // ---- Deep-sky objects ----
    for (const o of HL_DSO) {
      const best = this._track(samples, lat, lon, () => ({ ra: o.ra, dec: o.dec }));
      if (best.alt < 12) continue;
      // Moon glare penalty for faint objects
      let moonPen = 1;
      if (o.mag > 4 && moonFrac > 0.4) {
        try {
          const meq = Astronomy.Equator(Astronomy.Body.Moon, best.time, obs, true, true);
          const mh = U.eqToHoriz(meq.ra, meq.dec, lat, U.lst(best.time, lon));
          if (mh.alt > 0) moonPen = 1 - 0.5 * moonFrac;
        } catch (e) {}
      }
      const score = o.fame * (0.45 + 0.55 * Math.min(best.alt / 55, 1)) * moonPen;
      cands.push({ score, emoji: o.emoji, inst: o.inst, name: this.L(o.name),
        blurb: this.L(o.blurb), bestTime: best.time, bestAlt: best.alt, bestAz: best.az });
    }

    cands.sort((a, b) => b.score - a.score);
    const list = cands.slice(0, 7);

    // bonus Milky Way tip when the Moon is faint or down for much of the night
    const milkyway = moonFrac < 0.35;

    return { list, milkyway };
  },

  // track an object's highest point across the sample times
  _track(samples, lat, lon, getEq) {
    let best = { alt: -90, az: 0, time: samples[0] };
    for (const d of samples) {
      const eq = getEq(d);
      const h = U.eqToHoriz(eq.ra, eq.dec, lat, U.lst(d, lon));
      if (h.alt > best.alt) best = { alt: h.alt, az: h.az, time: d };
    }
    return best;
  },

  _rise(obs, body, dir, from) { try { const t2 = Astronomy.SearchRiseSet(Astronomy.Body[body], obs, dir, from, 1); return t2 ? t2.date : null; } catch (e) { return null; } },
  _alt(obs, body, dir, from, alt) { try { const t2 = Astronomy.SearchAltitude(Astronomy.Body[body], obs, dir, from, 1, alt); return t2 ? t2.date : null; } catch (e) { return null; } },

  L(o) { const l = (window.I18N && I18N.lang) || "en"; return (o[l] != null) ? o[l] : o.en; }
};

window.Highlights = Highlights;
