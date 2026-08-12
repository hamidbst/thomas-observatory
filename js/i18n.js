/* =============================================================================
   i18n.js  —  bilingual support (English / French)
   t(key, vars) looks up a dotted key in the current language, falling back to
   English, then to the key itself. Static HTML nodes carry data-i18n / data-i18n-html.
   Modules listen for the "language-changed" event and re-render.
   ============================================================================= */

const I18N = {
  lang: "en",

  dict: {
    en: {
      brand: { sub: "Live Sky Dashboard" },
      lang:  { en: "EN", fr: "FR", switch: "Français" },
      loc:   { locating: "locating…", useDevice: "use my location", useHome: "use home",
               home: "Home", device: "My location" },
      fact:  { loading: "Loading a cosmic fact…", another: "Another →" },
      nav:   { sky: "Live Sky", tonight: "Tonight", events: "Events", iss: "ISS",
               news: "News & APOD", quiz: "Quiz" },

      common:{ up: "UP", down: "down", telescope: "telescope", min: "min", now: "now",
               rises: "rises", sets: "sets", altitude: "Altitude", lit: "lit", loadingGeneric: "loading…" },

      bodies:{ Sun: "Sun", Moon: "Moon", Mercury: "Mercury", Venus: "Venus", Mars: "Mars",
               Jupiter: "Jupiter", Saturn: "Saturn", Uranus: "Uranus", Neptune: "Neptune" },
      dsotype:{ Galaxy: "Galaxy", "Globular cluster": "Globular cluster", "Open cluster": "Open cluster",
               "Planetary nebula": "Planetary nebula", Nebula: "Nebula", "Star-forming region": "Star-forming region",
               "Supernova remnant": "Supernova remnant", "Deep-sky object": "Deep-sky object" },

      sky: {
        title: "The sky above you",
        intro: "This is a live map of the real sky from your location. The edge of the circle is the horizon; the centre is straight up (the zenith). North is at the top.",
        legendTitle: "Legend",
        legend: '● Stars (size = brightness) &nbsp; · &nbsp; <span style="color:var(--accent-3)">●</span> Planets &nbsp; · &nbsp; <span style="color:var(--accent-2)">◇</span> Galaxies &amp; nebulae',
        c_lines: "Constellation lines", c_labels: "Names", c_dsos: "Deep-sky objects",
        c_mw: "Milky Way", c_planets: "Planets", nowBtn: "● Now",
        upNow: "Up right now",
        none: "No planets above the horizon at this moment — try dragging the time slider.",
        star: "Star", planet: "Planet", dso: "Deep-sky object"
      },

      tonight: {
        moonNow: "The Moon right now", sun: "Sun", planets: "Planets tonight — where & when",
        illuminated: "Illuminated", distance: "Distance", moonrise: "Moonrise", moonset: "Moonset",
        nextFull: "Next full", nextNew: "Next new",
        sunrise: "Sunrise", sunset: "Sunset", dayLength: "Day length",
        darkBegins: "Dark sky begins", dawnEnds: "Dawn (dark ends)",
        darkNote: "“Dark sky” is astronomical twilight’s end — the Sun is 18° below the horizon and the faintest stars and the Milky Way become visible.",
        planetsNote: "“Up” means the object is currently above your horizon. Altitude is height above the horizon (90° = straight overhead); azimuth is the compass direction (0° = N, 90° = E, 180° = S, 270° = W).",
        belowRises: "Below horizon · rises {t}", computing: "computing planet positions…"
      },

      phase: {
        new: "New Moon", waxcres: "Waxing Crescent", first: "First Quarter", waxgib: "Waxing Gibbous",
        full: "Full Moon", wangib: "Waning Gibbous", last: "Last Quarter", wancres: "Waning Crescent"
      },

      events: {
        title: "Upcoming astronomical events",
        f_all: "All", f_eclipse: "Eclipses", f_moon: "Moon phases", f_planet: "Planets",
        f_meteor: "Meteor showers", f_season: "Seasons",
        computing: "computing eclipses, phases, oppositions…",
        none: "No events of this type in the next {n} months.",
        in: "in {t}",
        l_moon: "Moon", l_eclipse: "Eclipse", l_planet: "Planet", l_meteor: "Meteors", l_season: "Season",
        fullMoon: "Full Moon", newMoon: "New Moon", supermoon: "Full Moon (Supermoon)",
        fullMoonDesc: "The Moon is fully lit — bright all night.",
        newMoonDesc: "The Moon is between Earth and Sun — darkest skies for deep-sky viewing.",
        supermoonDesc: "A Supermoon — the full Moon near its closest approach, appearing slightly larger and brighter.",
        lunarEclipse: "{kind} Lunar Eclipse",
        lunarTotalDesc: "The Moon passes fully into Earth's shadow and turns coppery red — a “Blood Moon.” Safe to watch with the naked eye.",
        lunarPartialDesc: "The Moon passes through Earth's shadow. Visible from the entire night side of Earth.",
        lunarPenumDesc: "The Moon passes through Earth's outer shadow. Visible from the entire night side of Earth.",
        solarEclipse: "{kind} Solar Eclipse",
        solarDesc: "The Moon covers the Sun somewhere on Earth (peak near {lat}°, {lon}°). NEVER look at the Sun without proper eclipse glasses.",
        opposition: "{planet} at Opposition",
        oppositionDesc: "{planet} is opposite the Sun — closest, biggest, and brightest for the year, and up all night. The best time to observe it.",
        elongation: "{planet} at Greatest Elongation",
        elongationDesc: "{planet} is at its farthest from the Sun in our sky ({deg}°) — best visible {when}.",
        whenMorning: "before sunrise in the east", whenEvening: "after sunset in the west",
        marEquinox: "March Equinox", junSolstice: "June Solstice", sepEquinox: "September Equinox", decSolstice: "December Solstice",
        marEquinoxDesc: "Day and night nearly equal; spring in the north, autumn in the south.",
        junSolsticeDesc: "Longest day in the northern hemisphere, shortest in the south.",
        sepEquinoxDesc: "Day and night nearly equal; autumn in the north, spring in the south.",
        decSolsticeDesc: "Shortest day in the north, longest in the south.",
        meteorTitle: "{name} Meteor Shower — Peak",
        meteorDesc: "{desc} Up to ~{zhr} meteors/hour under dark skies. Best after midnight; no telescope needed — just look up.",
        ms: {
          Quadrantids:    { name: "Quadrantids",    desc: "Sharp, brief peak; blue meteors. Radiant in Boötes." },
          Lyrids:         { name: "Lyrids",         desc: "Fast meteors from Comet Thatcher; occasional fireballs." },
          EtaAquariids:   { name: "Eta Aquariids",  desc: "Debris from Halley's Comet; best before dawn." },
          DeltaAquariids: { name: "Delta Aquariids",desc: "Faint, steady meteors; good from the south." },
          Perseids:       { name: "Perseids",       desc: "The summer classic — bright, fast, many fireballs." },
          Draconids:      { name: "Draconids",      desc: "Slow meteors; best in the evening, occasional outbursts." },
          Orionids:       { name: "Orionids",       desc: "Also from Halley's Comet; fast and faint." },
          Leonids:        { name: "Leonids",        desc: "Very fast; parent comet Tempel–Tuttle can bring storms." },
          Geminids:       { name: "Geminids",       desc: "The year's best — bright, plentiful, multicoloured." },
          Ursids:         { name: "Ursids",         desc: "A quiet shower near the winter solstice." }
        }
      },

      kinds: { total: "Total", partial: "Partial", penumbral: "Penumbral", annular: "Annular", hybrid: "Hybrid" },

      iss: {
        livePos: "International Space Station — live position",
        nextPasses: "Next visible passes over you",
        lat: "Latitude", lon: "Longitude", alt: "Altitude km", speed: "Speed km/h",
        computing: "computing orbital passes…",
        passesNote: "A “pass” is when the ISS flies over your sky. The best ones are after dusk or before dawn, when the station is lit by the Sun but your sky is dark.",
        noPasses: "No passes above 10° in the next 3 days from this location.",
        passLine: "Rises {a1} → peak {el}° {a2} → sets {a3}",
        visible: "visible!", daylight: "daylight pass",
        feedError: "Couldn't reach the live ISS feed. Check the internet connection.",
        tleError: "Pass predictions need orbital data from Celestrak, which couldn't be reached right now. The live map above still works. (It may be blocked on some networks — try again later.)"
      },

      news: {
        apodTitle: "NASA — Astronomy Picture of the Day",
        apodLoading: "fetching today's picture…",
        newsTitle: "Latest space news",
        newsLoading: "loading headlines…",
        apodError: "Couldn't load today's NASA picture ({msg}).",
        apodKeyHint: "If this keeps happening, the free DEMO_KEY may be rate-limited — get a personal key at api.nasa.gov and paste it into js/config.js.",
        newsError: "Couldn't load space headlines ({msg}).",
        imageCredit: "Image: NASA"
      },

      quiz: {
        title: "Astronomy Challenge",
        intro: "Ten questions across the whole cosmos — from the solar system to the edge of the observable universe. Ready?",
        start: "Start challenge", next: "Next question →", finish: "See results",
        question: "Question", of: "of", score: "Score", streak: "Streak",
        correct: "Correct!", wrong: "Not quite.", theAnswer: "Answer",
        again: "Play again", newSet: "New questions",
        resultTitle: "Challenge complete!",
        resultLine: "You scored {s} / {n}.",
        r_perfect: "Perfect score — you're a real astronomer! 🌟",
        r_great: "Brilliant work — the cosmos has no secrets from you. 🚀",
        r_good: "Nicely done — keep exploring! 🔭",
        r_ok: "Good effort — every astronomer starts here. Try again! ✨",
        bestStreak: "Best streak"
      }
    },

    fr: {
      brand: { sub: "Tableau de bord du ciel en direct" },
      lang:  { en: "EN", fr: "FR", switch: "English" },
      loc:   { locating: "localisation…", useDevice: "ma position", useHome: "domicile",
               home: "Domicile", device: "Ma position" },
      fact:  { loading: "Chargement d'un fait cosmique…", another: "Un autre →" },
      nav:   { sky: "Ciel en direct", tonight: "Ce soir", events: "Événements", iss: "ISS",
               news: "Actus & Image", quiz: "Quiz" },

      common:{ up: "AU-DESSUS", down: "sous l'horizon", telescope: "télescope", min: "min", now: "maintenant",
               rises: "se lève", sets: "se couche", altitude: "Hauteur", lit: "éclairée", loadingGeneric: "chargement…" },

      bodies:{ Sun: "Soleil", Moon: "Lune", Mercury: "Mercure", Venus: "Vénus", Mars: "Mars",
               Jupiter: "Jupiter", Saturn: "Saturne", Uranus: "Uranus", Neptune: "Neptune" },
      dsotype:{ Galaxy: "Galaxie", "Globular cluster": "Amas globulaire", "Open cluster": "Amas ouvert",
               "Planetary nebula": "Nébuleuse planétaire", Nebula: "Nébuleuse", "Star-forming region": "Région de formation d'étoiles",
               "Supernova remnant": "Rémanent de supernova", "Deep-sky object": "Objet du ciel profond" },

      sky: {
        title: "Le ciel au-dessus de toi",
        intro: "Ceci est une carte en direct du ciel réel depuis ta position. Le bord du cercle est l'horizon ; le centre est droit au-dessus (le zénith). Le Nord est en haut.",
        legendTitle: "Légende",
        legend: '● Étoiles (taille = éclat) &nbsp; · &nbsp; <span style="color:var(--accent-3)">●</span> Planètes &nbsp; · &nbsp; <span style="color:var(--accent-2)">◇</span> Galaxies &amp; nébuleuses',
        c_lines: "Lignes des constellations", c_labels: "Noms", c_dsos: "Objets du ciel profond",
        c_mw: "Voie lactée", c_planets: "Planètes", nowBtn: "● Maintenant",
        upNow: "Visibles maintenant",
        none: "Aucune planète au-dessus de l'horizon en ce moment — essaie de déplacer le curseur du temps.",
        star: "Étoile", planet: "Planète", dso: "Objet du ciel profond"
      },

      tonight: {
        moonNow: "La Lune en ce moment", sun: "Soleil", planets: "Planètes ce soir — où & quand",
        illuminated: "Éclairée", distance: "Distance", moonrise: "Lever de Lune", moonset: "Coucher de Lune",
        nextFull: "Prochaine pleine", nextNew: "Prochaine nouvelle",
        sunrise: "Lever du Soleil", sunset: "Coucher du Soleil", dayLength: "Durée du jour",
        darkBegins: "Nuit noire dès", dawnEnds: "Aube (fin de nuit)",
        darkNote: "La « nuit noire » est la fin du crépuscule astronomique — le Soleil est à 18° sous l'horizon et les étoiles les plus faibles ainsi que la Voie lactée deviennent visibles.",
        planetsNote: "« Au-dessus » signifie que l'objet est actuellement au-dessus de ton horizon. La hauteur est l'élévation au-dessus de l'horizon (90° = au zénith) ; l'azimut est la direction (0° = N, 90° = E, 180° = S, 270° = O).",
        belowRises: "Sous l'horizon · se lève à {t}", computing: "calcul des positions des planètes…"
      },

      phase: {
        new: "Nouvelle Lune", waxcres: "Premier Croissant", first: "Premier Quartier", waxgib: "Gibbeuse Croissante",
        full: "Pleine Lune", wangib: "Gibbeuse Décroissante", last: "Dernier Quartier", wancres: "Dernier Croissant"
      },

      events: {
        title: "Prochains événements astronomiques",
        f_all: "Tous", f_eclipse: "Éclipses", f_moon: "Phases de Lune", f_planet: "Planètes",
        f_meteor: "Pluies d'étoiles filantes", f_season: "Saisons",
        computing: "calcul des éclipses, phases, oppositions…",
        none: "Aucun événement de ce type dans les {n} prochains mois.",
        in: "dans {t}",
        l_moon: "Lune", l_eclipse: "Éclipse", l_planet: "Planète", l_meteor: "Météores", l_season: "Saison",
        fullMoon: "Pleine Lune", newMoon: "Nouvelle Lune", supermoon: "Pleine Lune (Super-Lune)",
        fullMoonDesc: "La Lune est entièrement éclairée — brillante toute la nuit.",
        newMoonDesc: "La Lune est entre la Terre et le Soleil — le ciel le plus sombre pour observer le ciel profond.",
        supermoonDesc: "Une Super-Lune — la pleine Lune près de son point le plus proche, paraissant un peu plus grande et brillante.",
        lunarEclipse: "Éclipse Lunaire {kind}",
        lunarTotalDesc: "La Lune entre entièrement dans l'ombre de la Terre et devient rouge cuivré — une « Lune de Sang ». Observable à l'œil nu sans danger.",
        lunarPartialDesc: "La Lune traverse l'ombre de la Terre. Visible depuis toute la face nocturne de la Terre.",
        lunarPenumDesc: "La Lune traverse la pénombre de la Terre. Visible depuis toute la face nocturne de la Terre.",
        solarEclipse: "Éclipse Solaire {kind}",
        solarDesc: "La Lune cache le Soleil quelque part sur Terre (maximum vers {lat}°, {lon}°). Ne regarde JAMAIS le Soleil sans lunettes d'éclipse adaptées.",
        opposition: "{planet} à l'Opposition",
        oppositionDesc: "{planet} est à l'opposé du Soleil — au plus près, plus grande et plus brillante de l'année, et visible toute la nuit. Le meilleur moment pour l'observer.",
        elongation: "{planet} à sa plus grande élongation",
        elongationDesc: "{planet} est au plus loin du Soleil dans notre ciel ({deg}°) — mieux visible {when}.",
        whenMorning: "avant le lever du Soleil, à l'est", whenEvening: "après le coucher du Soleil, à l'ouest",
        marEquinox: "Équinoxe de mars", junSolstice: "Solstice de juin", sepEquinox: "Équinoxe de septembre", decSolstice: "Solstice de décembre",
        marEquinoxDesc: "Jour et nuit presque égaux ; printemps au nord, automne au sud.",
        junSolsticeDesc: "Jour le plus long dans l'hémisphère nord, le plus court au sud.",
        sepEquinoxDesc: "Jour et nuit presque égaux ; automne au nord, printemps au sud.",
        decSolsticeDesc: "Jour le plus court au nord, le plus long au sud.",
        meteorTitle: "Pluie d'étoiles filantes des {name} — Maximum",
        meteorDesc: "{desc} Jusqu'à ~{zhr} météores/heure sous un ciel sombre. Idéal après minuit ; aucun télescope nécessaire — il suffit de lever les yeux.",
        ms: {
          Quadrantids:    { name: "Quadrantides",     desc: "Maximum bref et net ; météores bleus. Radiant dans le Bouvier." },
          Lyrids:         { name: "Lyrides",          desc: "Météores rapides de la comète Thatcher ; quelques bolides." },
          EtaAquariids:   { name: "Êta Aquariides",   desc: "Débris de la comète de Halley ; mieux avant l'aube." },
          DeltaAquariids: { name: "Delta Aquariides", desc: "Météores faibles et réguliers ; bien vus depuis le sud." },
          Perseids:       { name: "Perséides",        desc: "Le classique de l'été — brillants, rapides, beaucoup de bolides." },
          Draconids:      { name: "Draconides",       desc: "Météores lents ; mieux en soirée, sursauts occasionnels." },
          Orionids:       { name: "Orionides",        desc: "Aussi de la comète de Halley ; rapides et faibles." },
          Leonids:        { name: "Léonides",         desc: "Très rapides ; la comète Tempel–Tuttle peut provoquer des tempêtes." },
          Geminids:       { name: "Géminides",        desc: "Les meilleurs de l'année — brillants, nombreux, multicolores." },
          Ursids:         { name: "Ursides",          desc: "Une pluie discrète près du solstice d'hiver." }
        }
      },

      kinds: { total: "Totale", partial: "Partielle", penumbral: "par la Pénombre", annular: "Annulaire", hybrid: "Hybride" },

      iss: {
        livePos: "Station Spatiale Internationale — position en direct",
        nextPasses: "Prochains passages visibles au-dessus de toi",
        lat: "Latitude", lon: "Longitude", alt: "Altitude km", speed: "Vitesse km/h",
        computing: "calcul des passages orbitaux…",
        passesNote: "Un « passage » est le moment où l'ISS traverse ton ciel. Les meilleurs ont lieu après le crépuscule ou avant l'aube, quand la station est éclairée par le Soleil mais que ton ciel est sombre.",
        noPasses: "Aucun passage au-dessus de 10° dans les 3 prochains jours depuis cet endroit.",
        passLine: "Se lève {a1} → maximum {el}° {a2} → se couche {a3}",
        visible: "visible !", daylight: "passage de jour",
        feedError: "Impossible de joindre le flux ISS en direct. Vérifie la connexion internet.",
        tleError: "Les prévisions de passage nécessitent les données orbitales de Celestrak, injoignables pour l'instant. La carte en direct ci-dessus fonctionne toujours. (Elle peut être bloquée sur certains réseaux — réessaie plus tard.)"
      },

      news: {
        apodTitle: "NASA — Image astronomique du jour",
        apodLoading: "récupération de l'image du jour…",
        newsTitle: "Dernières actualités spatiales",
        newsLoading: "chargement des titres…",
        apodError: "Impossible de charger l'image NASA du jour ({msg}).",
        apodKeyHint: "Si cela persiste, la clé gratuite DEMO_KEY est peut-être limitée — obtiens une clé personnelle sur api.nasa.gov et colle-la dans js/config.js.",
        newsError: "Impossible de charger les actualités spatiales ({msg}).",
        imageCredit: "Image : NASA"
      },

      quiz: {
        title: "Défi Astronomie",
        intro: "Dix questions à travers tout le cosmos — du système solaire jusqu'au bord de l'univers observable. Prêt ?",
        start: "Commencer le défi", next: "Question suivante →", finish: "Voir les résultats",
        question: "Question", of: "sur", score: "Score", streak: "Série",
        correct: "Correct !", wrong: "Presque…", theAnswer: "Réponse",
        again: "Rejouer", newSet: "Nouvelles questions",
        resultTitle: "Défi terminé !",
        resultLine: "Ton score : {s} / {n}.",
        r_perfect: "Score parfait — un vrai astronome ! 🌟",
        r_great: "Brillant — le cosmos n'a plus de secrets pour toi. 🚀",
        r_good: "Bien joué — continue d'explorer ! 🔭",
        r_ok: "Bel effort — tout astronome commence ici. Réessaie ! ✨",
        bestStreak: "Meilleure série"
      }
    }
  },

  // compass points per language (French uses O for Ouest)
  compassPts: {
    en: ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],
    fr: ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSO","SO","OSO","O","ONO","NO","NNO"]
  },
  cardinals: { en: ["N","E","S","W"], fr: ["N","E","S","O"] },

  init() {
    this.lang = localStorage.getItem("obs-lang") || (navigator.language && navigator.language.startsWith("fr") ? "fr" : "en");
    document.documentElement.lang = this.lang;
  },

  // resolve a dotted key
  get(key, lang) {
    const parts = key.split(".");
    let o = this.dict[lang];
    for (const p of parts) { if (o == null) return undefined; o = o[p]; }
    return o;
  },

  t(key, vars) {
    let s = this.get(key, this.lang);
    if (s === undefined) s = this.get(key, "en");
    if (s === undefined) return key;
    if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  },

  locale() { return this.lang === "fr" ? "fr-FR" : undefined; },
  compass() { return this.compassPts[this.lang]; },
  body(en) { return this.t("bodies." + en); },
  dsotypeName(en) { return this.t("dsotype." + en); },

  applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = this.t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = this.t(el.getAttribute("data-i18n-html")); });
  },

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem("obs-lang", lang);
    document.documentElement.lang = lang;
    this.applyStatic();
    this._renderToggle();
    document.dispatchEvent(new CustomEvent("language-changed", { detail: lang }));
  },

  _renderToggle() {
    const el = U.el("lang-toggle");
    if (!el) return;
    el.textContent = this.t("lang.switch");
    el.setAttribute("aria-label", this.t("lang.switch"));
  },

  wireToggle() {
    const el = U.el("lang-toggle");
    if (!el) return;
    el.addEventListener("click", () => this.setLang(this.lang === "en" ? "fr" : "en"));
    this._renderToggle();
  }
};

// convenient global shortcut
function t(key, vars) { return I18N.t(key, vars); }

window.I18N = I18N;
window.t = t;
