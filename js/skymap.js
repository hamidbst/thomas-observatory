/* =============================================================================
   skymap.js  —  live all-sky star chart
   Projection: azimuthal-equidistant centred on the zenith.
   Centre = straight up; edge of circle = horizon. North at top, East at left.
   ============================================================================= */

// French names for the 88 constellations (keyed by the English/Latin name in the
// data). Used so the map reads in French when the site is in French.
const CONS_FR = {
  "Andromeda":"Andromède","Antlia":"Machine pneumatique","Apus":"Oiseau de paradis",
  "Aquarius":"Verseau","Aquila":"Aigle","Ara":"Autel","Aries":"Bélier","Auriga":"Cocher",
  "Boötes":"Bouvier","Caelum":"Burin","Camelopardalis":"Girafe","Cancer":"Cancer",
  "Canes Venatici":"Chiens de chasse","Canis Major":"Grand Chien","Canis Minor":"Petit Chien",
  "Capricornus":"Capricorne","Carina":"Carène","Cassiopeia":"Cassiopée","Centaurus":"Centaure",
  "Cepheus":"Céphée","Cetus":"Baleine","Chamaeleon":"Caméléon","Circinus":"Compas",
  "Columba":"Colombe","Coma Berenices":"Chevelure de Bérénice","Corona Austrina":"Couronne australe",
  "Corona Borealis":"Couronne boréale","Corvus":"Corbeau","Crater":"Coupe","Crux":"Croix du Sud",
  "Cygnus":"Cygne","Delphinus":"Dauphin","Dorado":"Dorade","Draco":"Dragon","Equuleus":"Petit Cheval",
  "Eridanus":"Éridan","Fornax":"Fourneau","Gemini":"Gémeaux","Grus":"Grue","Hercules":"Hercule",
  "Horologium":"Horloge","Hydra":"Hydre","Hydrus":"Hydre mâle","Indus":"Indien","Lacerta":"Lézard",
  "Leo":"Lion","Leo Minor":"Petit Lion","Lepus":"Lièvre","Libra":"Balance","Lupus":"Loup","Lynx":"Lynx",
  "Lyra":"Lyre","Mensa":"Table","Microscopium":"Microscope","Monoceros":"Licorne","Musca":"Mouche",
  "Norma":"Règle","Octans":"Octant","Ophiuchus":"Ophiuchus (Serpentaire)","Orion":"Orion","Pavo":"Paon",
  "Pegasus":"Pégase","Perseus":"Persée","Phoenix":"Phénix","Pictor":"Peintre","Pisces":"Poissons",
  "Piscis Austrinus":"Poisson austral","Puppis":"Poupe","Pyxis":"Boussole","Reticulum":"Réticule",
  "Sagitta":"Flèche","Sagittarius":"Sagittaire","Scorpius":"Scorpion","Sculptor":"Sculpteur",
  "Scutum":"Écu de Sobieski","Serpens Caput":"Serpent (tête)","Serpens Cauda":"Serpent (queue)",
  "Sextans":"Sextant","Taurus":"Taureau","Telescopium":"Télescope","Triangulum":"Triangle",
  "Triangulum Australe":"Triangle austral","Tucana":"Toucan","Ursa Major":"Grande Ourse",
  "Ursa Minor":"Petite Ourse","Vela":"Voiles","Virgo":"Vierge","Volans":"Poisson volant",
  "Vulpecula":"Petit Renard"
};

// Famous deep-sky objects that aren't in the bright-DSO catalog file — added so the
// map shows them (M13 among them, which the user asked about). RA is in degrees.
const EXTRA_DSOS = [
  ["M 13", "gc", 5.8, 250.421, 36.460], ["M 92", "gc", 6.4, 259.281, 43.136],
  ["M 3", "gc", 6.2, 205.548, 28.377], ["M 5", "gc", 5.6, 229.638, 2.081],
  ["M 15", "gc", 6.2, 322.493, 12.167], ["M 57", "pn", 8.8, 283.396, 33.029],
  ["M 27", "pn", 7.4, 299.901, 22.721], ["M 51", "g", 8.4, 202.470, 47.195],
  ["M 81", "g", 6.9, 148.888, 69.065], ["M 82", "g", 8.4, 148.968, 69.680],
  ["M 104", "g", 8.0, 189.998, -11.623], ["M 1", "snr", 8.4, 83.634, 22.015],
  ["M 101", "g", 7.9, 210.802, 54.349], ["M 64", "g", 8.5, 194.182, 21.683],
  ["M 63", "g", 8.6, 198.955, 42.029], ["M 97", "pn", 9.9, 168.699, 55.019],
  ["M 11", "oc", 6.3, 282.766, -6.271], ["M 22", "gc", 5.1, 279.100, -23.905],
  ["M 17", "sfr", 6.0, 275.196, -16.177], ["M 20", "sfr", 6.3, 270.680, -22.972],
  ["M 78", "dn", 8.3, 86.690, 0.050], ["NGC 7293", "pn", 7.6, 337.411, -20.837],
].map(([desig, type, mag, ra, dec]) => ({
  type: "Feature", properties: { desig, type, mag }, geometry: { type: "Point", coordinates: [ra, dec] }
}));

// Common names + a one-line description (EN/FR) for notable objects, keyed by the
// designation with spaces removed ("M 13" → "M13"). Shown when you tap an object.
const DSO_INFO = {
  M13:{name:{en:"Hercules Cluster",fr:"Amas d'Hercule"},desc:{en:"A glittering ball of several hundred thousand ancient stars, ~25,000 light-years away — the finest globular cluster in the northern sky.",fr:"Une boule scintillante de plusieurs centaines de milliers d'étoiles anciennes, à ~25 000 années-lumière — le plus bel amas globulaire du ciel boréal."}},
  M92:{name:{en:"",fr:""},desc:{en:"A bright, dense globular cluster in Hercules, often overlooked next to its famous neighbour M13.",fr:"Un amas globulaire dense et brillant d'Hercule, souvent éclipsé par son célèbre voisin M13."}},
  M3:{name:{en:"",fr:""},desc:{en:"One of the richest globular clusters, with around half a million stars some 34,000 light-years away.",fr:"L'un des amas globulaires les plus riches, avec près d'un demi-million d'étoiles à environ 34 000 années-lumière."}},
  M5:{name:{en:"",fr:""},desc:{en:"A big, bright globular cluster — one of the oldest known, at roughly 13 billion years.",fr:"Un amas globulaire vaste et brillant — l'un des plus vieux connus, âgé d'environ 13 milliards d'années."}},
  M15:{name:{en:"",fr:""},desc:{en:"A very compact globular cluster in Pegasus with an extremely dense core.",fr:"Un amas globulaire très compact de Pégase, au cœur extrêmement dense."}},
  M57:{name:{en:"Ring Nebula",fr:"Nébuleuse de l'Anneau"},desc:{en:"A dying star's glowing smoke ring — the puffed-off outer layers of a star like our Sun.",fr:"L'anneau de fumée lumineux d'une étoile mourante — les couches externes soufflées par une étoile comme le Soleil."}},
  M27:{name:{en:"Dumbbell Nebula",fr:"Nébuleuse de l'Haltère"},desc:{en:"A bright planetary nebula, one of the first ever discovered — gas blown off by a dying star.",fr:"Une nébuleuse planétaire brillante, l'une des premières découvertes — du gaz éjecté par une étoile mourante."}},
  M51:{name:{en:"Whirlpool Galaxy",fr:"Galaxie du Tourbillon"},desc:{en:"A classic face-on spiral galaxy caught in the act of merging with a smaller companion.",fr:"Une galaxie spirale vue de face, surprise en pleine fusion avec une petite compagne."}},
  M81:{name:{en:"Bode's Galaxy",fr:"Galaxie de Bode"},desc:{en:"A grand, bright spiral galaxy about 12 million light-years away in Ursa Major.",fr:"Une grande galaxie spirale brillante à environ 12 millions d'années-lumière, dans la Grande Ourse."}},
  M82:{name:{en:"Cigar Galaxy",fr:"Galaxie du Cigare"},desc:{en:"An edge-on 'starburst' galaxy furiously forming stars, torn by a close pass with M81.",fr:"Une galaxie « à flambée d'étoiles » vue par la tranche, bouleversée par un passage rapproché de M81."}},
  M104:{name:{en:"Sombrero Galaxy",fr:"Galaxie du Sombrero"},desc:{en:"An edge-on spiral with a bright bulge and a dark dust lane, like a wide-brimmed hat.",fr:"Une spirale vue par la tranche, avec un bulbe brillant et une bande de poussière sombre, comme un chapeau à large bord."}},
  M1:{name:{en:"Crab Nebula",fr:"Nébuleuse du Crabe"},desc:{en:"The wreckage of a star that exploded in 1054 AD, recorded by astronomers at the time.",fr:"Les débris d'une étoile qui a explosé en 1054, observée par les astronomes de l'époque."}},
  M101:{name:{en:"Pinwheel Galaxy",fr:"Galaxie du Moulinet"},desc:{en:"A huge face-on spiral galaxy with sweeping arms, like a cosmic pinwheel.",fr:"Une immense galaxie spirale vue de face aux bras déployés, tel un moulinet cosmique."}},
  M64:{name:{en:"Black Eye Galaxy",fr:"Galaxie de l'Œil noir"},desc:{en:"A spiral galaxy with a dramatic dark band of dust in front of its bright core — like a black eye.",fr:"Une galaxie spirale avec une spectaculaire bande de poussière sombre devant son noyau — comme un œil au beurre noir."}},
  M63:{name:{en:"Sunflower Galaxy",fr:"Galaxie du Tournesol"},desc:{en:"A spiral galaxy whose bright, patchy arms resemble the petals of a sunflower.",fr:"Une galaxie spirale dont les bras lumineux et morcelés évoquent les pétales d'un tournesol."}},
  M97:{name:{en:"Owl Nebula",fr:"Nébuleuse du Hibou"},desc:{en:"A round planetary nebula with two dark 'eyes', like the face of an owl.",fr:"Une nébuleuse planétaire ronde avec deux « yeux » sombres, comme le visage d'un hibou."}},
  M11:{name:{en:"Wild Duck Cluster",fr:"Amas du Canard sauvage"},desc:{en:"A rich, compact open cluster whose brightest stars form a V, like a flight of wild ducks.",fr:"Un amas ouvert riche et compact dont les étoiles les plus brillantes dessinent un V, comme un vol de canards sauvages."}},
  M22:{name:{en:"",fr:""},desc:{en:"One of the brightest globular clusters in the sky — a dense swarm of ancient stars in Sagittarius.",fr:"L'un des amas globulaires les plus brillants du ciel — un essaim dense d'étoiles anciennes dans le Sagittaire."}},
  M17:{name:{en:"Swan (Omega) Nebula",fr:"Nébuleuse du Cygne (Oméga)"},desc:{en:"A bright glowing cloud shaped like a swan on water, busy forming new stars.",fr:"Un nuage lumineux en forme de cygne sur l'eau, où naissent de nouvelles étoiles."}},
  M20:{name:{en:"Trifid Nebula",fr:"Nébuleuse Trifide"},desc:{en:"A colourful nebula split into three glowing lobes by dark lanes of dust.",fr:"Une nébuleuse colorée divisée en trois lobes lumineux par des bandes de poussière sombre."}},
  M78:{name:{en:"",fr:""},desc:{en:"A bluish reflection nebula near Orion's belt, glowing by the light of nearby stars.",fr:"Une nébuleuse par réflexion bleutée près de la ceinture d'Orion, éclairée par la lumière d'étoiles voisines."}},
  NGC7293:{name:{en:"Helix Nebula",fr:"Nébuleuse de l'Hélice"},desc:{en:"One of the closest planetary nebulae — a dying star's glowing shells, nicknamed the 'Eye of God'.",fr:"L'une des nébuleuses planétaires les plus proches — les coquilles lumineuses d'une étoile mourante, surnommée « l'Œil de Dieu »."}},
  M31:{name:{en:"Andromeda Galaxy",fr:"Galaxie d'Andromède"},desc:{en:"The nearest big galaxy to ours, 2.5 million light-years away — the most distant thing visible to the naked eye.",fr:"La grande galaxie la plus proche de la nôtre, à 2,5 millions d'années-lumière — l'objet le plus lointain visible à l'œil nu."}},
  M33:{name:{en:"Triangulum Galaxy",fr:"Galaxie du Triangle"},desc:{en:"A nearby face-on spiral galaxy, the third-largest in our Local Group.",fr:"Une galaxie spirale proche vue de face, la troisième plus grande de notre Groupe local."}},
  M42:{name:{en:"Orion Nebula",fr:"Nébuleuse d'Orion"},desc:{en:"A vast nursery where new stars are being born right now — visible to the naked eye in Orion's sword.",fr:"Une immense pouponnière où des étoiles naissent en ce moment — visible à l'œil nu dans l'épée d'Orion."}},
  M44:{name:{en:"Beehive Cluster",fr:"Amas de la Crèche"},desc:{en:"A nearby open cluster that looks like a swarm of bees through binoculars.",fr:"Un amas ouvert proche qui ressemble à un essaim d'abeilles aux jumelles."}},
  M45:{name:{en:"Pleiades (Seven Sisters)",fr:"Pléiades"},desc:{en:"A dazzling cluster of hot young blue stars, easily seen with the naked eye.",fr:"Un amas éblouissant de jeunes étoiles bleues et chaudes, facile à voir à l'œil nu."}},
  M8:{name:{en:"Lagoon Nebula",fr:"Nébuleuse de la Lagune"},desc:{en:"A large, bright star-forming cloud in Sagittarius.",fr:"Un vaste et brillant nuage de formation d'étoiles, dans le Sagittaire."}},
  M16:{name:{en:"Eagle Nebula",fr:"Nébuleuse de l'Aigle"},desc:{en:"Home of the famous 'Pillars of Creation' — towers of gas where stars are forming.",fr:"Abrite les célèbres « Piliers de la création » — des colonnes de gaz où naissent des étoiles."}},
  M6:{name:{en:"Butterfly Cluster",fr:"Amas du Papillon"},desc:{en:"An open cluster whose stars trace the shape of a butterfly.",fr:"Un amas ouvert dont les étoiles dessinent la forme d'un papillon."}},
  M7:{name:{en:"Ptolemy Cluster",fr:"Amas de Ptolémée"},desc:{en:"A bright naked-eye star cluster noted by Ptolemy almost 2,000 years ago.",fr:"Un amas d'étoiles visible à l'œil nu, signalé par Ptolémée il y a près de 2 000 ans."}},
  Mel25:{name:{en:"Hyades",fr:"Hyades"},desc:{en:"The nearest star cluster, forming the V-shaped face of Taurus the bull.",fr:"L'amas d'étoiles le plus proche, formant le V du visage du Taureau."}},
  Mel111:{name:{en:"Coma Star Cluster",fr:"Amas de la Chevelure"},desc:{en:"A loose, wide scattering of stars best seen with binoculars.",fr:"Un large semis d'étoiles lâche, à admirer aux jumelles."}},
  Cr399:{name:{en:"Coathanger",fr:"Le Cintre"},desc:{en:"A chance line of stars that really does look like an upside-down coathanger.",fr:"Un alignement fortuit d'étoiles qui ressemble vraiment à un cintre à l'envers."}},
  hPer:{name:{en:"Double Cluster",fr:"Double amas de Persée"},desc:{en:"A stunning pair of bright open clusters side by side in Perseus.",fr:"Une superbe paire d'amas ouverts brillants côte à côte dans Persée."}},
  "χPer":{name:{en:"Double Cluster",fr:"Double amas de Persée"},desc:{en:"A stunning pair of bright open clusters side by side in Perseus.",fr:"Une superbe paire d'amas ouverts brillants côte à côte dans Persée."}},
  LMC:{name:{en:"Large Magellanic Cloud",fr:"Grand Nuage de Magellan"},desc:{en:"A small companion galaxy of the Milky Way, visible from the southern hemisphere.",fr:"Une petite galaxie compagne de la Voie lactée, visible de l'hémisphère sud."}},
  SMC:{name:{en:"Small Magellanic Cloud",fr:"Petit Nuage de Magellan"},desc:{en:"A dwarf companion galaxy of the Milky Way, seen from southern skies.",fr:"Une galaxie naine compagne de la Voie lactée, visible des cieux austraux."}},
  "ωCen":{name:{en:"Omega Centauri",fr:"Oméga du Centaure"},desc:{en:"The largest and brightest globular cluster of all, with millions of stars.",fr:"Le plus grand et le plus brillant des amas globulaires, avec des millions d'étoiles."}},
  "47Tuc":{name:{en:"47 Tucanae",fr:"47 du Toucan"},desc:{en:"A spectacular southern globular cluster, second only to Omega Centauri.",fr:"Un amas globulaire austral spectaculaire, juste derrière Oméga du Centaure."}},
  "ηCar":{name:{en:"Carina Nebula",fr:"Nébuleuse de la Carène"},desc:{en:"A huge, bright nebula surrounding the unstable star Eta Carinae.",fr:"Une nébuleuse immense et brillante entourant l'étoile instable Eta Carinae."}},
};

const Sky = {
  canvas: null, ctx: null, tip: null,
  size: 800, cx: 400, cy: 400, R: 392,
  offsetMin: 0,
  toggles: { lines: true, labels: true, dsos: true, mw: true, planets: true },
  data: {},           // stars, lines, dsos, mw, names
  drawn: [],          // hit-test list for hover
  ready: false,

  PLANETS: [
    ["Mercury", "#c9c2b6"], ["Venus", "#f6e6bd"], ["Mars", "#ff6b4a"],
    ["Jupiter", "#e8c48c"], ["Saturn", "#e6d3a3"], ["Uranus", "#9fe6ea"], ["Neptune", "#6f8cff"]
  ],

  async init() {
    this.canvas = U.el("skymap");
    this.ctx = this.canvas.getContext("2d");
    this.tip = U.el("sky-tip");

    // load catalogs
    try {
      const [stars, lines, cons, dsos, mw, names] = await Promise.all([
        U.json("data/stars.6.json"),
        U.json("data/constellations.lines.json"),
        U.json("data/constellations.json"),
        U.json("data/dsos.bright.json"),
        U.json("data/mw.json"),
        U.json("data/starnames.json"),
      ]);
      this.data = { stars: stars.features, lines: lines.features, cons: cons.features,
                    dsos: dsos.features.concat(EXTRA_DSOS), mw: mw.features, names };
      this.ready = true;
    } catch (e) {
      console.error(e);
      U.el("sky-intro").innerHTML = `<span class="err">Could not load star data: ${U.esc(e.message)}</span>`;
      return;
    }

    // controls
    document.querySelectorAll("[data-toggle]").forEach(ch => {
      ch.addEventListener("click", () => {
        const k = ch.dataset.toggle;
        this.toggles[k] = !this.toggles[k];
        ch.classList.toggle("on", this.toggles[k]);
        this.render();
      });
    });
    const slider = U.el("sky-time");
    slider.addEventListener("input", () => {
      this.offsetMin = parseInt(slider.value, 10);
      U.el("sky-time-label").textContent = this.offsetLabel();
      this.hideDetail(); this.render();
    });
    U.el("sky-now").addEventListener("click", () => {
      this.offsetMin = 0; slider.value = 0;
      U.el("sky-time-label").textContent = t("common.now"); this.hideDetail(); this.render();
    });

    // hover (desktop quick info) + click/tap (sticky detail card, works on mobile)
    this.canvas.addEventListener("mousemove", (e) => this.hover(e));
    this.canvas.addEventListener("mouseleave", () => { this.tip.style.display = "none"; });
    this.canvas.addEventListener("click", (e) => this.click(e));

    window.addEventListener("resize", () => { this.resize(); this.hideDetail(); this.render(); });
    document.addEventListener("location-changed", () => { this.hideDetail(); this.render(); });
    document.addEventListener("language-changed", () => { this.hideDetail(); this.render(); });

    this.resize();
    this.render();
    setInterval(() => { if (this.offsetMin === 0) this.render(); }, CONFIG.SKY_REFRESH_SECONDS * 1000);
  },

  offsetLabel() {
    if (this.offsetMin === 0) return t("common.now");
    const sign = this.offsetMin > 0 ? "+" : "−";
    const m = Math.abs(this.offsetMin);
    const h = Math.floor(m / 60), mm = m % 60;
    return `${sign}${h ? h + "h " : ""}${mm}m`;
  },

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const css = this.canvas.clientWidth || 800;
    this.size = css;
    this.canvas.width = Math.round(css * dpr);
    this.canvas.height = Math.round(css * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cx = css / 2; this.cy = css / 2; this.R = css / 2 - 8;
  },

  now() { return new Date(Date.now() + this.offsetMin * 60000); },

  // project horizontal coords to screen; returns null if well below horizon
  project(alt, az) {
    if (alt < -1.5) return null;
    const r = (90 - alt) / 90 * this.R;
    const a = az * U.DEG;
    return { x: this.cx - r * Math.sin(a), y: this.cy - r * Math.cos(a), r };
  },

  render() {
    if (!this.ready) return;
    const ctx = this.ctx, date = this.now();
    const lat = LOC.current.lat, lon = LOC.current.lon;
    const lst = U.lst(date, lon);
    this.drawn = [];

    // clear
    ctx.clearRect(0, 0, this.size, this.size);

    // horizon disk + zenith glow
    ctx.save();
    const g = ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.R);
    g.addColorStop(0, "#0b1436"); g.addColorStop(0.8, "#070a1c"); g.addColorStop(1, "#04060f");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(this.cx, this.cy, this.R, 0, 7); ctx.fill();
    ctx.restore();

    // clip everything to the horizon circle
    ctx.save();
    ctx.beginPath(); ctx.arc(this.cx, this.cy, this.R, 0, 7); ctx.clip();

    if (this.toggles.mw) this.drawMilkyWay(lat, lst);
    this.drawAltRings();
    if (this.toggles.lines) this.drawConstellations(lat, lst);
    this.drawStars(lat, lst);
    if (this.toggles.dsos) this.drawDSOs(lat, lst);
    if (this.toggles.labels) this.drawConNames(lat, lst);
    if (this.toggles.planets) this.drawSolarSystem(date, lat, lon, lst);

    ctx.restore();

    // horizon ring + cardinal directions
    this.drawFrame();
    this.updateVisiblePanel();
  },

  drawAltRings() {
    const ctx = this.ctx;
    ctx.strokeStyle = "rgba(125,160,230,0.10)"; ctx.lineWidth = 1;
    [30, 60].forEach(alt => {
      const r = (90 - alt) / 90 * this.R;
      ctx.beginPath(); ctx.arc(this.cx, this.cy, r, 0, 7); ctx.stroke();
    });
  },

  drawFrame() {
    const ctx = this.ctx;
    ctx.strokeStyle = "rgba(140,180,255,0.35)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(this.cx, this.cy, this.R, 0, 7); ctx.stroke();
    ctx.fillStyle = "rgba(180,200,255,0.85)";
    ctx.font = "600 14px " + "Segoe UI, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const m = 16;
    const c = (window.I18N && I18N.cardinals[I18N.lang]) || ["N","E","S","W"];
    ctx.fillText(c[0], this.cx, m - 2);              // North (top)
    ctx.fillText(c[2], this.cx, this.size - m + 2);  // South (bottom)
    ctx.fillText(c[1], m - 2, this.cy);              // East (left)
    ctx.fillText(c[3], this.size - m + 2, this.cy);  // West (right)
  },

  drawMilkyWay(lat, lst) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    this.data.mw.forEach(f => {
      const polys = f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : [f.geometry.coordinates];
      polys.forEach(poly => {
        poly.forEach(ring => {
          let started = false, anyUp = false;
          ctx.beginPath();
          for (const [ra, dec] of ring) {
            const h = U.eqToHoriz(U.norm24(ra / 15), dec, lat, lst);
            const p = this.project(h.alt, h.az);
            if (!p) { started = false; continue; }
            if (h.alt > 0) anyUp = true;
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else ctx.lineTo(p.x, p.y);
          }
          if (anyUp) { ctx.closePath(); ctx.fillStyle = "rgba(120,150,235,0.045)"; ctx.fill(); }
        });
      });
    });
    ctx.restore();
  },

  drawConstellations(lat, lst) {
    const ctx = this.ctx;
    ctx.strokeStyle = "rgba(120,165,255,0.34)"; ctx.lineWidth = 1;
    this.data.lines.forEach(f => {
      const segs = f.geometry.coordinates;
      segs.forEach(seg => {
        ctx.beginPath();
        let prev = null;
        for (const [ra, dec] of seg) {
          const h = U.eqToHoriz(U.norm24(ra / 15), dec, lat, lst);
          if (h.alt <= 0) { prev = null; continue; }
          const p = this.project(h.alt, h.az);
          if (!p) { prev = null; continue; }
          if (prev) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
          prev = p;
        }
        ctx.stroke();
      });
    });
  },

  drawStars(lat, lst) {
    const ctx = this.ctx;
    const limit = CONFIG.STAR_MAG_LIMIT;
    for (const f of this.data.stars) {
      const mag = f.properties.mag;
      if (mag > limit) continue;
      const [ra, dec] = f.geometry.coordinates;
      const h = U.eqToHoriz(U.norm24(ra / 15), dec, lat, lst);
      if (h.alt <= 0) continue;
      const p = this.project(h.alt, h.az);
      if (!p) continue;
      const rad = Math.max(0.5, (limit + 0.7 - mag) * 0.52);
      ctx.beginPath();
      ctx.fillStyle = U.bvColor(f.properties.bv);
      ctx.globalAlpha = U.clamp(1.1 - mag / (limit + 1), 0.35, 1);
      ctx.arc(p.x, p.y, rad, 0, 7); ctx.fill();
      ctx.globalAlpha = 1;

      // bright named stars: label + hit target
      if (mag < 2.6) {
        const nm = this.data.names[f.id] && this.data.names[f.id].name;
        if (nm) {
          this.drawn.push({ x: p.x, y: p.y, name: nm,
            meta: `${t("sky.star")} · mag ${mag.toFixed(2)} · ${h.alt.toFixed(0)}° ${U.compass(h.az)}` });
          if (this.toggles.labels && mag < 1.8) {
            ctx.fillStyle = "rgba(215,225,255,0.75)";
            ctx.font = "11px Segoe UI, sans-serif";
            ctx.textAlign = "left"; ctx.textBaseline = "middle";
            ctx.fillText(nm, p.x + rad + 3, p.y);
          }
        }
      }
    }
  },

  drawDSOs(lat, lst) {
    const ctx = this.ctx;
    for (const f of this.data.dsos) {
      const [ra, dec] = f.geometry.coordinates;
      const h = U.eqToHoriz(U.norm24(ra / 15), dec, lat, lst);
      if (h.alt <= 0) continue;
      const p = this.project(h.alt, h.az);
      if (!p) continue;
      const pr = f.properties;
      const name = pr.name || pr.desig || (pr.messier ? "M" + pr.messier : "");
      ctx.save();
      ctx.strokeStyle = "rgba(196,150,255,0.9)"; ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - 4); ctx.lineTo(p.x + 4, p.y);
      ctx.lineTo(p.x, p.y + 4); ctx.lineTo(p.x - 4, p.y); ctx.closePath();
      ctx.stroke();
      ctx.restore();
      let short = name;
      const info = DSO_INFO[(pr.desig || "").replace(/\s+/g, "")];
      const common = info ? this.L(info.name) : "";
      const desc = info ? this.L(info.desc) : "";
      this.drawn.push({ x: p.x, y: p.y,
        name: common || name || t("sky.dso"),
        sub: common ? name : "",
        meta: `${this.dsoType(pr.type)} · ${h.alt.toFixed(0)}° ${U.compass(h.az)}`,
        desc });
      if (this.toggles.labels && short) {
        ctx.fillStyle = "rgba(200,170,255,0.7)";
        ctx.font = "10px Segoe UI, sans-serif";
        ctx.textAlign = "left"; ctx.textBaseline = "middle";
        ctx.fillText(short, p.x + 6, p.y);
      }
    }
  },

  dsoType(type) {
    // the catalog also uses s / sd / i for galaxies (M31, M33, the Magellanic Clouds)
    // and en for emission nebulae (η Car)
    const map = { gg:"Galaxy", g:"Galaxy", s:"Galaxy", sd:"Galaxy", i:"Galaxy", en:"Nebula",
      gc:"Globular cluster", oc:"Open cluster",
      pn:"Planetary nebula", dn:"Nebula", bn:"Nebula", sfr:"Star-forming region",
      snr:"Supernova remnant" };
    return I18N.dsotypeName(map[type] || "Deep-sky object");
  },

  drawConNames(lat, lst) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(150,180,255,0.5)";
    ctx.font = "italic 12px Segoe UI, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (const f of this.data.cons) {
      if (!f.geometry) continue;
      const [ra, dec] = f.geometry.coordinates;
      const h = U.eqToHoriz(U.norm24(ra / 15), dec, lat, lst);
      if (h.alt < 8) continue;
      const p = this.project(h.alt, h.az);
      if (!p) continue;
      const nm = f.properties.name;
      const label = (window.I18N && I18N.lang === "fr") ? (CONS_FR[nm] || nm) : nm;
      ctx.fillText(label, p.x, p.y);
    }
  },

  drawSolarSystem(date, lat, lon, lst) {
    const ctx = this.ctx;
    const observer = new Astronomy.Observer(lat, lon, LOC.current.elevation || 0);

    const place = (body) => {
      const eq = Astronomy.Equator(Astronomy.Body[body], date, observer, true, true);
      return U.eqToHoriz(eq.ra, eq.dec, lat, lst);
    };

    // Sun (only when up)
    try {
      const hs = place("Sun");
      if (hs.alt > 0) {
        const p = this.project(hs.alt, hs.az);
        if (p) { this.disk(p, 9, "#ffd66b", "#ffb43a"); this.label(p, I18N.body("Sun"), 9);
          this.drawn.push({ x:p.x, y:p.y, name:I18N.body("Sun"), meta:`${hs.alt.toFixed(0)}° ${U.compass(hs.az)}` }); }
      }
    } catch(e){}

    // Moon
    try {
      const hm = place("Moon");
      if (hm.alt > 0) {
        const p = this.project(hm.alt, hm.az);
        if (p) {
          const ill = Astronomy.Illumination(Astronomy.Body.Moon, date);
          this.moonGlyph(p, 8, ill.phase_fraction, ill.phase_angle);
          this.label(p, I18N.body("Moon"), 8);
          this.drawn.push({ x:p.x, y:p.y, name:I18N.body("Moon"),
            meta:`${Math.round(ill.phase_fraction*100)}% ${t("common.lit")} · ${hm.alt.toFixed(0)}° ${U.compass(hm.az)}` });
        }
      }
    } catch(e){}

    // Planets
    for (const [body, color] of this.PLANETS) {
      try {
        const h = place(body);
        if (h.alt <= 0) continue;
        const p = this.project(h.alt, h.az);
        if (!p) continue;
        const rad = (body === "Jupiter" || body === "Venus") ? 5 : (body === "Uranus" || body === "Neptune" ? 3 : 4);
        this.disk(p, rad, color, color);
        this.drawn.push({ x:p.x, y:p.y, name:I18N.body(body),
          meta:`${t("sky.planet")} · ${h.alt.toFixed(0)}° ${U.compass(h.az)}` });
        if (this.toggles.labels) this.label(p, I18N.body(body), rad);
      } catch(e){}
    }
  },

  disk(p, r, fill, ring) {
    const ctx = this.ctx;
    ctx.beginPath(); ctx.arc(p.x, p.y, r + 2, 0, 7);
    ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fill();
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7);
    ctx.fillStyle = fill; ctx.fill();
    ctx.lineWidth = 1; ctx.strokeStyle = ring; ctx.stroke();
  },

  moonGlyph(p, r, frac, phaseAngle) {
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7);
    ctx.fillStyle = "#3a4256"; ctx.fill();   // dark side
    // lit fraction as a simple crescent overlay
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.clip();
    ctx.fillStyle = "#e9eefb";
    const waxing = (phaseAngle <= 180);
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, r * Math.abs(1 - 2*frac), r, 0, 0, 7);
    // draw lit half then subtract — approximate
    ctx.fillRect(waxing ? p.x : p.x - r, p.y - r, r, 2*r);
    ctx.fillStyle = frac > 0.5 ? "#e9eefb" : "#3a4256";
    ctx.beginPath(); ctx.ellipse(p.x, p.y, r*Math.abs(1-2*frac), r, 0, 0, 7); ctx.fill();
    ctx.restore();
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7);
    ctx.lineWidth = 1; ctx.strokeStyle = "rgba(220,230,255,0.6)"; ctx.stroke();
  },

  label(p, text, r) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(255,240,210,0.92)";
    ctx.font = "600 11px Segoe UI, sans-serif";
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText(text, p.x + r + 4, p.y);
  },

  hover(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    let best = null, bd = 16 * 16;
    for (const o of this.drawn) {
      const d = (o.x - mx) ** 2 + (o.y - my) ** 2;
      if (d < bd) { bd = d; best = o; }
    }
    if (best) {
      this.tip.style.display = "block";
      this.tip.style.left = (mx + 14) + "px";
      this.tip.style.top = (my + 10) + "px";
      this.tip.innerHTML = `<div class="name">${U.esc(best.name)}</div>`
        + (best.sub ? `<div class="meta">${U.esc(best.sub)}</div>` : "")
        + `<div class="meta">${U.esc(best.meta)}</div>`;
    } else {
      this.tip.style.display = "none";
    }
  },

  // pick a bilingual string {en,fr} for the current language
  L(o) { const l = (window.I18N && I18N.lang) || "en"; return (o && o[l]) ? o[l] : (o ? o.en : ""); },

  // tap/click → sticky detail card (the main way to inspect objects on mobile)
  click(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    let best = null, bd = 20 * 20;
    for (const o of this.drawn) {
      const d = (o.x - mx) ** 2 + (o.y - my) ** 2;
      if (d < bd) { bd = d; best = o; }
    }
    if (best) this.showDetail(best, mx, my); else this.hideDetail();
  },

  showDetail(o, mx, my) {
    const d = U.el("sky-detail");
    if (!d) return;
    d.innerHTML = `<button class="sd-close" aria-label="close">✕</button>
      <div class="sd-title">${U.esc(o.name)}</div>
      ${o.sub ? `<div class="sd-sub">${U.esc(o.sub)}</div>` : ""}
      <div class="sd-meta">${U.esc(o.meta)}</div>
      ${o.desc ? `<div class="sd-desc">${U.esc(o.desc)}</div>` : ""}`;
    d.hidden = false;
    // position near the tap, clamped inside the map panel
    const shell = this.canvas.parentElement;
    const ox = this.canvas.offsetLeft, oy = this.canvas.offsetTop;
    const dw = d.offsetWidth, dh = d.offsetHeight;
    let left = ox + mx + 14, top = oy + my + 10;
    if (left + dw > shell.clientWidth - 6) left = Math.max(6, ox + mx - dw - 10);
    if (top + dh > shell.clientHeight - 6) top = Math.max(6, shell.clientHeight - dh - 6);
    d.style.left = Math.max(6, left) + "px";
    d.style.top = Math.max(6, top) + "px";
    d.querySelector(".sd-close").addEventListener("click", (ev) => { ev.stopPropagation(); this.hideDetail(); });
  },

  hideDetail() { const d = U.el("sky-detail"); if (d) d.hidden = true; },

  // side panel: what's up now (planets + moon)
  updateVisiblePanel() {
    const date = this.now();
    const lat = LOC.current.lat, lon = LOC.current.lon, lst = U.lst(date, lon);
    const observer = new Astronomy.Observer(lat, lon, LOC.current.elevation || 0);
    const rows = [];
    const check = (body, label) => {
      try {
        const eq = Astronomy.Equator(Astronomy.Body[body], date, observer, true, true);
        const h = U.eqToHoriz(eq.ra, eq.dec, lat, lst);
        if (h.alt > 0) rows.push(`<div class="kv"><span class="k">${label}</span><span class="v">${h.alt.toFixed(0)}° · ${U.compass(h.az)}</span></div>`);
      } catch(e){}
    };
    check("Moon", "🌙 " + I18N.body("Moon"));
    ["Venus","Mars","Jupiter","Saturn","Mercury","Uranus","Neptune"].forEach(b => check(b, planetEmoji(b) + " " + I18N.body(b)));
    const host = U.el("sky-visible");
    if (host) host.innerHTML = rows.length
      ? `<div class="section-title" style="margin-top:14px;">${t("sky.upNow")}</div>${rows.join("")}`
      : `<p class="small muted" style="margin-top:14px;">${t("sky.none")}</p>`;
  }
};

function planetEmoji(b){ return ({Mercury:"☿",Venus:"♀",Mars:"♂",Jupiter:"♃",Saturn:"♄",Uranus:"⛢",Neptune:"♆"})[b]||"•"; }

window.Sky = Sky;
