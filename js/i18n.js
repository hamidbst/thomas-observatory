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
      brand: { sub: "Live Sky Dashboard", title: "{name}'s Observatory", observatory: "Observatory" },
      lang:  { en: "EN", fr: "FR", switch: "Français" },
      loc:   { locating: "locating…", home: "Home", device: "My location",
               title: "Choose a viewing location",
               intro: "See the sky from your own spot, or explore it from anywhere on Earth.",
               useMine: "📍 Use my location", searchPh: "Search a city or place…",
               search: "Search", searching: "searching…",
               noResults: "No places found — try another spelling.",
               current: "Currently showing", change: "change", denied: "Location unavailable — using the default city." },
      fact:  { loading: "Loading a cosmic fact…", another: "Another →" },
      nav:   { sky: "Live Sky", tonight: "Tonight", events: "Events", iss: "ISS",
               live: "Space Live", news: "News & APOD", quiz: "Quiz", learn: "Learn", about: "About Me" },

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

      hl: {
        title: "What can I see tonight?",
        intro: "The best sights from {place} tonight, ranked — with when and where to look.",
        bestAround: "Best around {t}", look: "look {dir}, {alt}° high",
        inst_eye: "naked eye", inst_binoc: "binoculars", inst_scope: "telescope",
        milkyway: "The Moon is faint tonight — away from city lights, look for the Milky Way: a soft band of light arching across the sky. That's our galaxy seen edge-on.",
        foot: "Times are for your location and shift as the night goes on.",
        none: "The Sun barely sets right now (or nothing notable is up) — try again another night."
      },

      learn: {
        title: "Learn about Space",
        intro: "Pick a subject and discover cool facts, explained simply.",
        topics: "topics", back: "← Subjects", backTopics: "← Back to topics",
        spotlight: "Did you know?", another: "🔀 Another", explore: "Explore this subject →",
        test: "🎯 Test what you learned",
        correct: "Correct!", wrong: "Not quite.", next: "Next →", seeResult: "See result",
        again: "Try again", scoreLine: "You got {s} of {n}.",
        rPerfect: "Perfect! You really learned this. 🌟",
        rGood: "Well done — you've got it! 👍",
        rLow: "Good try! Read the topics again and you'll ace it. 📚"
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

      live: {
        launchesTitle: "Next rocket launches",
        sunTitle: "The Sun right now",
        loadingLaunches: "fetching upcoming launches…",
        loadingSun: "loading the latest solar images…",
        launchError: "Couldn't load the launch schedule ({msg}). Try again later.",
        sunError: "Couldn't load solar activity ({msg}).",
        liftoff: "Liftoff! 🚀", estimated: "date estimated", noLaunch: "No upcoming launches found right now.",
        ch_193: "Corona", ch_304: "Chromosphere", ch_surface: "Sunspots", ch_magnetic: "Magnetic field",
        activity: "Solar activity", flare: "Latest X-ray flare", kp: "Geomagnetic activity (Kp)",
        sunCaption: "Live images from NASA's Solar Dynamics Observatory, refreshed through the day."
      },

      quiz: {
        title: "Astronomy Challenge",
        pickIntro: "Choose your mission difficulty, then test your cosmic knowledge. Each round is 10 questions.",
        play: "Launch ▶", questions: "questions",
        next: "Next question →", finish: "See results",
        question: "Question", of: "of", score: "Score", streak: "Streak",
        correct: "Correct!", wrong: "Not quite.", theAnswer: "Answer",
        again: "Play again", backToLevels: "← Choose level",
        tryNext: "Next level: {name} →",
        resultTitle: "Mission complete!",
        onLevel: "Level: {name}",
        bestStreak: "Best streak"
      },

      about: {
        hi: "Hi, I'm Thomas Nima! 👋",
        nameNote: "P.S. — my name is French, so “Thomas” is said “Toma” — the “s” stays silent! 😄",
        bday: "I was born on Valentine's Day — the 14th of February, 2018 — so my birthday is the day full of hearts ❤️.",
        love: "I LOVE space and astronomy. Planets, stars, black holes, rockets… I want to know it all!",
        why: "I built this website so I could follow what's happening up in the sky — and so other kids like me have a fun place to explore it too.",
        coverTitle: "What you can do here",
        cover: [
          "🌌 See the real sky above you right now",
          "🔭 Find tonight's Moon and planets",
          "📅 Check upcoming space events, like meteor showers and eclipses",
          "🛰️ Track the Space Station as it flies over you",
          "🚀 Watch live rocket launches and the Sun",
          "📰 Read the latest space news and NASA's picture of the day",
          "🧠 Test yourself in the astronomy quiz"
        ],
        hear: "I'd love to hear from you! What cool things have you built or discovered? Is there something useful I could add to help you? Write to me below — I read every message, and I'll write back if you leave your email!",
        contactTitle: "Write to me ✉️",
        fName: "Your first name", fEmail: "Your email — only if you'd like a reply (optional)",
        human: "Quick check — what is {a} + {b}?", errName: "Please write your name first. 🙂",
        errHuman: "Almost! Please answer the little maths question.",
        fFrom: "Where are you from? (optional)", fMsg: "Your message",
        send: "Send 🚀", sending: "Sending…",
        thanks: "Woohoo — your message just blasted off to me! 🚀 I'll read it very soon. Thank you! 🌟",
        errorMsg: "Oops — something went wrong. Please try again in a moment.",
        notSet: "The message box isn't switched on yet. (Grown-ups: see the README to add a free contact key.)"
      }
    },

    fr: {
      brand: { sub: "Tableau de bord du ciel en direct", title: "L'Observatoire de {name}", observatory: "Observatoire" },
      lang:  { en: "EN", fr: "FR", switch: "English" },
      loc:   { locating: "localisation…", home: "Domicile", device: "Ma position",
               title: "Choisir un lieu d'observation",
               intro: "Observe le ciel depuis chez toi, ou explore-le depuis n'importe où sur Terre.",
               useMine: "📍 Utiliser ma position", searchPh: "Rechercher une ville ou un lieu…",
               search: "Rechercher", searching: "recherche…",
               noResults: "Aucun lieu trouvé — essaie une autre orthographe.",
               current: "Affichage actuel", change: "changer", denied: "Position indisponible — utilisation de la ville par défaut." },
      fact:  { loading: "Chargement d'un fait cosmique…", another: "Un autre →" },
      nav:   { sky: "Ciel en direct", tonight: "Ce soir", events: "Événements", iss: "ISS",
               live: "Espace en direct", news: "Actus & Image", quiz: "Quiz", learn: "Apprendre", about: "À propos" },

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

      hl: {
        title: "Que puis-je voir ce soir ?",
        intro: "Les plus beaux objets visibles depuis {place} ce soir, classés — avec quand et où regarder.",
        bestAround: "Vers {t}", look: "regarde vers {dir}, à {alt}° de hauteur",
        inst_eye: "à l'œil nu", inst_binoc: "aux jumelles", inst_scope: "au télescope",
        milkyway: "La Lune est peu lumineuse ce soir — loin des lumières de la ville, cherche la Voie lactée : une douce bande de lumière traversant le ciel. C'est notre galaxie vue par la tranche.",
        foot: "Les heures correspondent à ta position et évoluent au fil de la nuit.",
        none: "Le Soleil ne se couche presque pas en ce moment (ou rien de notable n'est visible) — réessaie une autre nuit."
      },

      learn: {
        title: "Apprends l'espace",
        intro: "Choisis un sujet et découvre des faits fascinants, expliqués simplement.",
        topics: "sujets", back: "← Sujets", backTopics: "← Retour aux sujets",
        spotlight: "Le savais-tu ?", another: "🔀 Un autre", explore: "Explorer ce sujet →",
        test: "🎯 Teste ce que tu as appris",
        correct: "Correct !", wrong: "Presque…", next: "Suivant →", seeResult: "Voir le résultat",
        again: "Réessayer", scoreLine: "Tu as {s} sur {n}.",
        rPerfect: "Parfait ! Tu as vraiment tout retenu. 🌟",
        rGood: "Bravo — c'est acquis ! 👍",
        rLow: "Bel essai ! Relis les sujets et tu vas y arriver. 📚"
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

      live: {
        launchesTitle: "Prochains lancements de fusées",
        sunTitle: "Le Soleil en ce moment",
        loadingLaunches: "récupération des prochains lancements…",
        loadingSun: "chargement des dernières images solaires…",
        launchError: "Impossible de charger le calendrier des lancements ({msg}). Réessaie plus tard.",
        sunError: "Impossible de charger l'activité solaire ({msg}).",
        liftoff: "Décollage ! 🚀", estimated: "date estimée", noLaunch: "Aucun lancement à venir trouvé pour le moment.",
        ch_193: "Couronne", ch_304: "Chromosphère", ch_surface: "Taches solaires", ch_magnetic: "Champ magnétique",
        activity: "Activité solaire", flare: "Dernière éruption (rayons X)", kp: "Activité géomagnétique (Kp)",
        sunCaption: "Images en direct du Solar Dynamics Observatory de la NASA, actualisées au fil de la journée."
      },

      quiz: {
        title: "Défi Astronomie",
        pickIntro: "Choisis la difficulté de ta mission, puis teste tes connaissances cosmiques. Chaque manche compte 10 questions.",
        play: "Décoller ▶", questions: "questions",
        next: "Question suivante →", finish: "Voir les résultats",
        question: "Question", of: "sur", score: "Score", streak: "Série",
        correct: "Correct !", wrong: "Presque…", theAnswer: "Réponse",
        again: "Rejouer", backToLevels: "← Choisir un niveau",
        tryNext: "Niveau suivant : {name} →",
        resultTitle: "Mission accomplie !",
        onLevel: "Niveau : {name}",
        bestStreak: "Meilleure série"
      },

      about: {
        hi: "Salut, moi c'est Thomas Nima ! 👋",
        nameNote: "",
        bday: "Je suis né le jour de la Saint-Valentin — le 14 février 2018 — alors mon anniversaire, c'est le jour plein de cœurs ❤️.",
        love: "J'ADORE l'espace et l'astronomie. Les planètes, les étoiles, les trous noirs, les fusées… je veux tout savoir !",
        why: "J'ai créé ce site pour suivre ce qui se passe dans le ciel — et pour que d'autres enfants comme moi aient un endroit amusant pour l'explorer aussi.",
        coverTitle: "Ce que tu peux faire ici",
        cover: [
          "🌌 Voir le vrai ciel au-dessus de toi en ce moment",
          "🔭 Trouver la Lune et les planètes de ce soir",
          "📅 Voir les prochains événements, comme les pluies d'étoiles filantes et les éclipses",
          "🛰️ Suivre la Station spatiale quand elle passe au-dessus de toi",
          "🚀 Regarder les lancements de fusées en direct et le Soleil",
          "📰 Lire les dernières actus de l'espace et l'image du jour de la NASA",
          "🧠 Te tester dans le quiz d'astronomie"
        ],
        hear: "J'adorerais avoir de tes nouvelles ! Qu'as-tu construit ou découvert de chouette ? Y a-t-il quelque chose d'utile que je pourrais ajouter pour toi ? Écris-moi ci-dessous — je lis chaque message, et je te réponds si tu laisses ton email !",
        contactTitle: "Écris-moi ✉️",
        fName: "Ton prénom", fEmail: "Ton email — seulement si tu veux une réponse (facultatif)",
        human: "Petite vérification — combien font {a} + {b} ?", errName: "Écris d'abord ton prénom, s'il te plaît. 🙂",
        errHuman: "Presque ! Réponds à la petite question de calcul.",
        fFrom: "D'où viens-tu ? (facultatif)", fMsg: "Ton message",
        send: "Envoyer 🚀", sending: "Envoi…",
        thanks: "Youpi — ton message vient de décoller vers moi ! 🚀 Je le lirai très bientôt. Merci ! 🌟",
        errorMsg: "Oups — une erreur s'est produite. Réessaie dans un instant.",
        notSet: "La boîte à messages n'est pas encore activée. (Pour les grands : voir le README pour ajouter une clé de contact gratuite.)"
      }
    },

    fa: {
      brand: { sub: "داشبورد زندهٔ آسمان", title: "رصدخانهٔ نیما", observatory: "رصدخانه" },
      loc:   { locating: "در حال یافتن موقعیت…", home: "خانه", device: "موقعیت من",
               title: "یک مکان برای رصد انتخاب کن",
               intro: "آسمان را از محل خودت ببین، یا آن را از هر جای زمین کاوش کن.",
               useMine: "📍 استفاده از موقعیت من", searchPh: "جستجوی یک شهر یا مکان…",
               search: "جستجو", searching: "در حال جستجو…",
               noResults: "مکانی پیدا نشد — املای دیگری را امتحان کن.",
               current: "در حال نمایش", change: "تغییر", denied: "موقعیت در دسترس نیست — از شهر پیش‌فرض استفاده می‌شود." },
      fact:  { loading: "در حال بارگذاری یک نکتهٔ کیهانی…", another: "یکی دیگر ←" },
      nav:   { sky: "آسمان زنده", tonight: "امشب", events: "رویدادها", iss: "ایستگاه فضایی",
               live: "فضا زنده", news: "اخبار و تصویر", quiz: "آزمون", learn: "آموزش", about: "دربارهٔ من" },

      common:{ up: "بالای افق", down: "زیر افق", telescope: "تلسکوپ", min: "دقیقه", now: "اکنون",
               rises: "طلوع", sets: "غروب", altitude: "ارتفاع", lit: "روشن", loadingGeneric: "در حال بارگذاری…" },

      bodies:{ Sun: "خورشید", Moon: "ماه", Mercury: "عطارد", Venus: "زهره", Mars: "مریخ",
               Jupiter: "مشتری", Saturn: "زحل", Uranus: "اورانوس", Neptune: "نپتون" },
      dsotype:{ Galaxy: "کهکشان", "Globular cluster": "خوشهٔ کروی", "Open cluster": "خوشهٔ باز",
               "Planetary nebula": "سحابی سیاره‌نما", Nebula: "سحابی", "Star-forming region": "ناحیهٔ ستاره‌زایی",
               "Supernova remnant": "بازماندهٔ ابرنواختر", "Deep-sky object": "جرم آسمان ژرف" },

      sky: {
        title: "آسمان بالای سرت",
        intro: "این نقشهٔ زندهٔ آسمان واقعی از محل توست. لبهٔ دایره افق است؛ مرکز درست بالای سر (سمت‌الرأس). شمال بالاست.",
        legendTitle: "راهنما",
        legend: '● ستاره‌ها (اندازه = درخشندگی) &nbsp; · &nbsp; <span style="color:var(--accent-3)">●</span> سیاره‌ها &nbsp; · &nbsp; <span style="color:var(--accent-2)">◇</span> کهکشان‌ها و سحابی‌ها',
        c_lines: "خطوط صورت‌های فلکی", c_labels: "نام‌ها", c_dsos: "اجرام آسمان ژرف",
        c_mw: "راه شیری", c_planets: "سیاره‌ها", nowBtn: "● اکنون",
        upNow: "همین حالا بالای افق",
        none: "در این لحظه هیچ سیاره‌ای بالای افق نیست — نوار زمان را جابه‌جا کن.",
        star: "ستاره", planet: "سیاره", dso: "جرم آسمان ژرف"
      },

      tonight: {
        moonNow: "ماه در این لحظه", sun: "خورشید", planets: "سیاره‌های امشب — کجا و کِی",
        illuminated: "روشن‌شده", distance: "فاصله", moonrise: "طلوع ماه", moonset: "غروب ماه",
        nextFull: "بدر بعدی", nextNew: "ماه نوِ بعدی",
        sunrise: "طلوع خورشید", sunset: "غروب خورشید", dayLength: "طول روز",
        darkBegins: "آغاز آسمان تاریک", dawnEnds: "سپیده‌دم (پایان تاریکی)",
        darkNote: "«آسمان تاریک» پایان گرگ‌ومیش نجومی است — خورشید ۱۸ درجه زیر افق است و کم‌نورترین ستاره‌ها و راه شیری دیده می‌شوند.",
        planetsNote: "«بالای افق» یعنی جرم اکنون بالای افق توست. ارتفاع یعنی بلندی از افق (۹۰ درجه = درست بالای سر)؛ سمت جهت قطب‌نماست (۰ = شمال، ۹۰ = شرق، ۱۸۰ = جنوب، ۲۷۰ = غرب).",
        belowRises: "زیر افق · طلوع در {t}", computing: "در حال محاسبهٔ موقعیت سیاره‌ها…"
      },

      hl: {
        title: "امشب چه چیزهایی می‌توانم ببینم؟",
        intro: "بهترین دیدنی‌های امشب از {place}، رتبه‌بندی‌شده — همراه با زمان و جهت نگاه.",
        bestAround: "حدود ساعت {t}", look: "به سمت {dir} نگاه کن، {alt} درجه بالای افق",
        inst_eye: "با چشم غیرمسلح", inst_binoc: "با دوربین دوچشمی", inst_scope: "با تلسکوپ",
        milkyway: "امشب ماه کم‌نور است — دور از نورهای شهر، دنبال راه شیری بگرد: نواری نرم از نور که در آسمان کشیده شده. این کهکشان ماست که از پهلو دیده می‌شود.",
        foot: "ساعت‌ها برای موقعیت توست و در طول شب تغییر می‌کنند.",
        none: "خورشید در این ایام تقریباً غروب نمی‌کند (یا چیز مهمی بالای افق نیست) — شبی دیگر امتحان کن."
      },

      learn: {
        title: "دربارهٔ فضا بیاموز",
        intro: "یک موضوع را انتخاب کن و نکته‌های جالبی را ساده و روشن کشف کن.",
        topics: "موضوع", back: "← موضوع‌ها", backTopics: "← بازگشت به موضوع‌ها",
        spotlight: "می‌دانستی؟", another: "🔀 یکی دیگر", explore: "کاوش این موضوع ←",
        test: "🎯 آموخته‌هایت را بسنج",
        correct: "درست!", wrong: "نزدیک بود…", next: "بعدی ←", seeResult: "دیدن نتیجه",
        again: "دوباره امتحان کن", scoreLine: "{s} از {n} درست.",
        rPerfect: "عالی! واقعاً یاد گرفتی. 🌟",
        rGood: "آفرین — بلدی! 👍",
        rLow: "تلاش خوبی بود! موضوع‌ها را دوباره بخوان تا عالی شوی. 📚"
      },

      phase: {
        new: "ماه نو", waxcres: "هلال نوجوان", first: "تربیع اول", waxgib: "محدب فزاینده",
        full: "بدر", wangib: "محدب کاهنده", last: "تربیع آخر", wancres: "هلال پیر"
      },

      events: {
        title: "رویدادهای نجومی پیش‌رو",
        f_all: "همه", f_eclipse: "خسوف و کسوف", f_moon: "فازهای ماه", f_planet: "سیاره‌ها",
        f_meteor: "بارش شهابی", f_season: "فصل‌ها",
        computing: "در حال محاسبهٔ گرفت‌ها، فازها، مقابله‌ها…",
        none: "هیچ رویدادی از این نوع در {n} ماه آینده نیست.",
        in: "تا {t} دیگر",
        l_moon: "ماه", l_eclipse: "گرفت", l_planet: "سیاره", l_meteor: "شهاب‌ها", l_season: "فصل",
        fullMoon: "بدر (ماه کامل)", newMoon: "ماه نو", supermoon: "بدر (اَبَرماه)",
        fullMoonDesc: "ماه کاملاً روشن است — تمام شب می‌درخشد.",
        newMoonDesc: "ماه میان زمین و خورشید است — تاریک‌ترین آسمان برای رصد اجرام ژرف.",
        supermoonDesc: "اَبَرماه — ماه کامل نزدیک به کمترین فاصله‌اش، کمی بزرگ‌تر و روشن‌تر به‌نظر می‌رسد.",
        lunarEclipse: "خسوف {kind}",
        lunarTotalDesc: "ماه کاملاً وارد سایهٔ زمین می‌شود و به رنگ مسی-قرمز درمی‌آید — «ماه خونین». با چشم غیرمسلح بی‌خطر است.",
        lunarPartialDesc: "ماه از سایهٔ زمین می‌گذرد. از سراسر نیمهٔ شبِ زمین دیده می‌شود.",
        lunarPenumDesc: "ماه از نیم‌سایهٔ زمین می‌گذرد. از سراسر نیمهٔ شبِ زمین دیده می‌شود.",
        solarEclipse: "کسوف {kind}",
        solarDesc: "ماه خورشید را جایی روی زمین می‌پوشاند (اوج نزدیک {lat}°، {lon}°). هرگز بدون عینک مخصوص کسوف به خورشید نگاه نکن.",
        opposition: "مقابلهٔ {planet}",
        oppositionDesc: "{planet} روبه‌روی خورشید است — نزدیک‌ترین، بزرگ‌ترین و درخشان‌ترین حالت سال، و تمام شب بالای افق. بهترین زمان برای رصد.",
        elongation: "بیشترین کشیدگیِ {planet}",
        elongationDesc: "{planet} در دورترین فاصله از خورشید در آسمان ماست ({deg}°) — بهترین دید {when}.",
        whenMorning: "پیش از طلوع خورشید، در شرق", whenEvening: "پس از غروب خورشید، در غرب",
        marEquinox: "اعتدال بهاری (مارس)", junSolstice: "انقلاب تابستانی (ژوئن)", sepEquinox: "اعتدال پاییزی (سپتامبر)", decSolstice: "انقلاب زمستانی (دسامبر)",
        marEquinoxDesc: "روز و شب تقریباً برابر؛ بهار در نیم‌کرهٔ شمالی، پاییز در جنوبی.",
        junSolsticeDesc: "بلندترین روز در نیم‌کرهٔ شمالی، کوتاه‌ترین در جنوبی.",
        sepEquinoxDesc: "روز و شب تقریباً برابر؛ پاییز در شمال، بهار در جنوب.",
        decSolsticeDesc: "کوتاه‌ترین روز در شمال، بلندترین در جنوب.",
        meteorTitle: "بارش شهابی {name} — اوج",
        meteorDesc: "{desc} تا حدود ~{zhr} شهاب در ساعت زیر آسمان تاریک. بهترین زمان پس از نیمه‌شب؛ بدون تلسکوپ — فقط به بالا نگاه کن.",
        ms: {
          Quadrantids:    { name: "ربع‌نما (کوادرانتید)", desc: "اوج کوتاه و تیز؛ شهاب‌های آبی. کانون در صورت فلکی گاوران." },
          Lyrids:         { name: "شلیاقی (لیرید)",       desc: "شهاب‌های سریع از دنباله‌دار تاچر؛ گاهی گوی‌های آتشین." },
          EtaAquariids:   { name: "اِتا دلوی",            desc: "بازمانده‌های دنباله‌دار هالی؛ بهترین دید پیش از سپیده." },
          DeltaAquariids: { name: "دلتا دلوی",           desc: "شهاب‌های کم‌نور و پیوسته؛ خوب از نیم‌کرهٔ جنوبی." },
          Perseids:       { name: "برساوشی (پرساید)",     desc: "کلاسیک تابستان — روشن، سریع، پر از گوی آتشین." },
          Draconids:      { name: "تنّینی (دراکونید)",    desc: "شهاب‌های کند؛ بهترین دید در سرِ شب، گاهی فوران." },
          Orionids:       { name: "شکارچی (اوریونید)",    desc: "باز هم از دنباله‌دار هالی؛ سریع و کم‌نور." },
          Leonids:        { name: "اسدی (لئونید)",        desc: "بسیار سریع؛ دنباله‌دار تمپل-تاتل می‌تواند توفان شهابی بیاورد." },
          Geminids:       { name: "جوزایی (جمینید)",      desc: "بهترین بارش سال — روشن، پرشمار، رنگارنگ." },
          Ursids:         { name: "دبی (اورسید)",         desc: "بارشی آرام نزدیک انقلاب زمستانی." }
        }
      },

      kinds: { total: "کلی", partial: "جزئی", penumbral: "نیم‌سایه‌ای", annular: "حلقوی", hybrid: "مرکب" },

      iss: {
        livePos: "ایستگاه فضایی بین‌المللی — موقعیت زنده",
        nextPasses: "گذرهای قابل‌مشاهدهٔ بعدی از فراز تو",
        lat: "عرض جغرافیایی", lon: "طول جغرافیایی", alt: "ارتفاع (کیلومتر)", speed: "سرعت (کیلومتر/ساعت)",
        computing: "در حال محاسبهٔ گذرهای مداری…",
        passesNote: "«گذر» یعنی زمانی که ایستگاه از آسمان تو می‌گذرد. بهترین‌ها پس از غروب یا پیش از سپیده‌اند، وقتی ایستگاه در نور خورشید است اما آسمان تو تاریک است.",
        noPasses: "در ۳ روز آینده هیچ گذری بالای ۱۰ درجه از این مکان نیست.",
        passLine: "طلوع از {a1} ← اوج {el}° در {a2} ← غروب در {a3}",
        visible: "قابل‌مشاهده!", daylight: "گذر روزانه",
        feedError: "دسترسی به دادهٔ زندهٔ ایستگاه ممکن نشد. اتصال اینترنت را بررسی کن.",
        tleError: "پیش‌بینی گذرها به دادهٔ مداری از Celestrak نیاز دارد که اکنون در دسترس نیست. نقشهٔ زندهٔ بالا همچنان کار می‌کند. (ممکن است در برخی شبکه‌ها مسدود باشد — بعداً امتحان کن.)"
      },

      news: {
        apodTitle: "ناسا — تصویر نجومی روز",
        apodLoading: "در حال دریافت تصویر امروز…",
        newsTitle: "تازه‌ترین اخبار فضایی",
        newsLoading: "در حال بارگذاری تیترها…",
        apodError: "بارگذاری تصویر امروز ناسا ممکن نشد ({msg}).",
        apodKeyHint: "اگر تکرار شد، شاید کلید رایگان DEMO_KEY محدود شده باشد — یک کلید شخصی از api.nasa.gov بگیر و در js/config.js بگذار.",
        newsError: "بارگذاری اخبار فضایی ممکن نشد ({msg}).",
        imageCredit: "تصویر: ناسا"
      },

      live: {
        launchesTitle: "پرتاب‌های بعدی موشک",
        sunTitle: "خورشید در این لحظه",
        loadingLaunches: "در حال دریافت پرتاب‌های پیش‌رو…",
        loadingSun: "در حال بارگذاری تازه‌ترین تصاویر خورشید…",
        launchError: "بارگذاری برنامهٔ پرتاب‌ها ممکن نشد ({msg}). بعداً امتحان کن.",
        sunError: "بارگذاری فعالیت خورشیدی ممکن نشد ({msg}).",
        liftoff: "پرتاب شد! 🚀", estimated: "تاریخ تخمینی", noLaunch: "اکنون پرتاب پیش‌رویی یافت نشد.",
        ch_193: "تاج (کرونا)", ch_304: "شیدسپهر (کروموسفر)", ch_surface: "لکه‌های خورشیدی", ch_magnetic: "میدان مغناطیسی",
        activity: "فعالیت خورشیدی", flare: "آخرین شرارهٔ پرتو ایکس", kp: "فعالیت زمین‌مغناطیسی (Kp)",
        sunCaption: "تصاویر زنده از رصدخانهٔ دینامیک خورشیدی ناسا (SDO)، در طول روز به‌روز می‌شوند."
      },

      quiz: {
        title: "چالش نجوم",
        pickIntro: "سطح مأموریتت را انتخاب کن و دانش کیهانی‌ات را بسنج. هر دور ۱۰ سؤال است.",
        play: "پرتاب ▶", questions: "سؤال",
        next: "سؤال بعدی ←", finish: "دیدن نتیجه",
        question: "سؤال", of: "از", score: "امتیاز", streak: "زنجیره",
        correct: "درست!", wrong: "نزدیک بود…", theAnswer: "پاسخ",
        again: "بازی دوباره", backToLevels: "← انتخاب سطح",
        tryNext: "سطح بعدی: {name} ←",
        resultTitle: "مأموریت کامل شد!",
        onLevel: "سطح: {name}",
        bestStreak: "بهترین زنجیره"
      },

      about: {
        hi: "سلام، من نیما هستم! 👋",
        nameNote: "پی‌نوشت — «نیما» نام ایرانی من است؛ به فارسی می‌توانی مرا نیما صدا کنی! 😄",
        bday: "من روز ولنتاین — ۱۴ فوریهٔ ۲۰۱۸ — به دنیا آمدم، پس تولدم روزِ پُر از قلب است ❤️.",
        love: "من عاشق فضا و نجوم هستم. سیاره‌ها، ستاره‌ها، سیاه‌چاله‌ها، موشک‌ها… می‌خواهم همه‌چیز را بدانم!",
        why: "این وب‌سایت را ساختم تا خودم بتوانم رویدادهای آسمان را دنبال کنم — و بچه‌های دیگری مثل من هم جای باحالی برای کاوش داشته باشند.",
        coverTitle: "اینجا چه کارهایی می‌توانی بکنی",
        cover: [
          "🌌 دیدن آسمان واقعی بالای سرت همین حالا",
          "🔭 یافتن ماه و سیاره‌های امشب",
          "📅 دیدن رویدادهای پیش‌رو، مثل بارش شهابی و گرفت‌ها",
          "🛰️ ردیابی ایستگاه فضایی هنگام عبور از فراز تو",
          "🚀 تماشای پرتاب زندهٔ موشک‌ها و خورشید",
          "📰 خواندن تازه‌ترین اخبار فضا و تصویر روز ناسا",
          "🧠 سنجش خودت در آزمون نجوم"
        ],
        hear: "خیلی دوست دارم از تو بشنوم! چه چیزهای باحالی ساخته یا کشف کرده‌ای؟ چیز مفیدی هست که بتوانم برایت اضافه کنم؟ پایین برایم بنویس — هر پیام را می‌خوانم و اگر ایمیلت را بگذاری برایت جواب می‌دهم!",
        contactTitle: "برایم بنویس ✉️",
        fName: "نام کوچک تو", fEmail: "ایمیل تو — فقط اگر جواب می‌خواهی (اختیاری)",
        human: "یک بررسی کوتاه — {a} + {b} چند می‌شود؟", errName: "لطفاً اول نامت را بنویس. 🙂",
        errHuman: "تقریباً! لطفاً به سؤال کوچک ریاضی پاسخ بده.",
        fFrom: "اهل کجایی؟ (اختیاری)", fMsg: "پیام تو",
        send: "ارسال 🚀", sending: "در حال ارسال…",
        thanks: "هورا — پیامت همین الان به‌سوی من پرتاب شد! 🚀 خیلی زود می‌خوانمش. ممنون! 🌟",
        errorMsg: "اوه — مشکلی پیش آمد. لطفاً کمی بعد دوباره امتحان کن.",
        notSet: "جعبهٔ پیام هنوز فعال نشده است. (برای بزرگ‌ترها: برای افزودن کلید تماس رایگان به README نگاه کنید.)"
      }
    }
  },

  // compass points per language (French uses O for Ouest; Persian keeps Latin, as astronomers do)
  compassPts: {
    en: ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],
    fr: ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSO","SO","OSO","O","ONO","NO","NNO"],
    fa: ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
  },
  cardinals: { en: ["N","E","S","W"], fr: ["N","E","S","O"], fa: ["N","E","S","W"] },

  LANGS: ["en", "fr", "fa"],
  LANG_LABELS: { en: "EN", fr: "FR", fa: "فا" },

  // Countries where French is the main language (→ French). Bilingual countries
  // (BE/CH/CA) fall back to the browser language as a tiebreaker.
  FR_PRIMARY: new Set(["FR","MC","LU","GP","MQ","GF","RE","YT","NC","PF","WF","PM","BL","MF",
    "BJ","BF","CG","CD","CI","DJ","GA","GN","ML","NE","SN","TG","CM","MG","HT","CF","TD","KM","SC","VU"]),
  FR_PARTIAL: new Set(["BE","CH","CA"]),

  init() {
    const saved = localStorage.getItem("obs-lang");
    if (saved && this.LANGS.includes(saved)) { this.lang = saved; this._applyDir(); return; }
    // No manual choice yet → provisionally use the browser language, then refine by country.
    const nav = (navigator.language || "").toLowerCase();
    this.lang = nav.startsWith("fa") ? "fa" : nav.startsWith("fr") ? "fr" : "en";
    this._applyDir();
    this._autoDetect(nav);
  },

  // Look up the visitor's country (by IP — no permission prompt) and switch the
  // language to match, unless they've meanwhile chosen one manually.
  async _autoDetect(nav) {
    let cc = "";
    try {
      const r = await fetch("https://get.geojs.io/v1/ip/country.json", { cache: "no-store" });
      if (r.ok) { const j = await r.json(); cc = String(j.country || j.country_code || "").toUpperCase(); }
    } catch (e) {}
    if (localStorage.getItem("obs-lang")) return;   // manual choice was made — respect it
    const mapped = this._langForCountry(cc, nav);
    if (mapped && mapped !== this.lang) this._applyLang(mapped);
  },

  _langForCountry(cc, nav) {
    nav = nav || "";
    if (cc === "IR") return "fa";
    if (this.FR_PRIMARY.has(cc)) return "fr";
    if (this.FR_PARTIAL.has(cc)) return nav.startsWith("fr") ? "fr" : "en";
    return nav.startsWith("fr") ? "fr" : nav.startsWith("fa") ? "fa" : "en";
  },

  _applyDir() {
    document.documentElement.lang = this.lang;
    document.documentElement.dir = (this.lang === "fa") ? "rtl" : "ltr";
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

  locale() { return this.lang === "fr" ? "fr-FR" : this.lang === "fa" ? "fa-IR-u-ca-gregory" : undefined; },
  compass() { return this.compassPts[this.lang]; },
  body(en) { return this.t("bodies." + en); },
  dsotypeName(en) { return this.t("dsotype." + en); },

  applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = this.t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = this.t(el.getAttribute("data-i18n-html")); });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.setAttribute("placeholder", this.t(el.getAttribute("data-i18n-ph"))); });
  },

  // Manual choice from the toggle — remembered across visits.
  setLang(lang) {
    localStorage.setItem("obs-lang", lang);
    this._applyLang(lang);
  },

  // Apply a language (auto or manual) without persisting it.
  _applyLang(lang) {
    this.lang = lang;
    this._applyDir();
    this.applyStatic();
    this._renderToggle();
    document.dispatchEvent(new CustomEvent("language-changed", { detail: lang }));
  },

  // A little EN | FR | فا segmented control.
  _renderToggle() {
    const el = U.el("lang-toggle");
    if (!el) return;
    el.innerHTML = this.LANGS.map(l =>
      `<span class="lang-opt ${l === this.lang ? "on" : ""}" data-lang="${l}">${this.LANG_LABELS[l]}</span>`).join("");
    el.querySelectorAll("[data-lang]").forEach(s =>
      s.addEventListener("click", () => { if (s.dataset.lang !== this.lang) this.setLang(s.dataset.lang); }));
  },

  wireToggle() { this._renderToggle(); }
};

// convenient global shortcut
function t(key, vars) { return I18N.t(key, vars); }

window.I18N = I18N;
window.t = t;
