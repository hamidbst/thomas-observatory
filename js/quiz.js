/* =============================================================================
   quiz.js  —  the Astronomy Challenge (bilingual, 5 difficulty levels)
   Pick a level, answer 10 random questions from that level's bank, get instant
   feedback + explanations, then a fun performance message. All content EN/FR.
   ============================================================================= */

const QUIZ_CATS = {
  solar:   { en: "Solar System", fr: "Système solaire", color: "#e8c48c" },
  deep:    { en: "Deep Space",   fr: "Ciel profond",    color: "#b98cff" },
  phys:    { en: "Physics",      fr: "Physique",         color: "#7db4ff" },
  stars:   { en: "Stars",        fr: "Étoiles",          color: "#ffcf6b" },
  explore: { en: "Exploration",  fr: "Exploration",      color: "#6ee7a8" },
};

const QUIZ_LEVELS = [
  { id:0, emoji:"🚀", color:"#6ee7a8", name:{en:"Launchpad",     fr:"Rampe de lancement"},   desc:{en:"Warm-up — the basics of space.",         fr:"Échauffement — les bases de l'espace."} },
  { id:1, emoji:"🛰️", color:"#7db4ff", name:{en:"In Orbit",       fr:"En orbite"},            desc:{en:"Our Solar System and the night sky.",    fr:"Notre système solaire et le ciel nocturne."} },
  { id:2, emoji:"🌙", color:"#b98cff", name:{en:"Deep Space",     fr:"Espace lointain"},      desc:{en:"Stars, galaxies and light.",             fr:"Étoiles, galaxies et lumière."} },
  { id:3, emoji:"☄️", color:"#ffcf6b", name:{en:"Interstellar",   fr:"Interstellaire"},       desc:{en:"For serious sky-watchers.",              fr:"Pour les vrais observateurs du ciel."} },
  { id:4, emoji:"🌌", color:"#ff6b81", name:{en:"Event Horizon",  fr:"Horizon des événements"},desc:{en:"Expert — bend your mind.",              fr:"Expert — de quoi se tordre l'esprit."} },
  { id:5, emoji:"🕳️", color:"#ff5ecb", name:{en:"Singularity",    fr:"Singularité"},          desc:{en:"The hardest of all — physics at the edge of what we know.", fr:"Le plus dur de tous — la physique aux limites du savoir."} },
];

const QUIZ_BANK = [
  // ---------- Level 0: Launchpad ----------
  { level:0, cat:"stars", answer:0, q:{en:"What is the closest star to Earth?", fr:"Quelle est l'étoile la plus proche de la Terre ?"},
    choices:{en:["The Sun","Polaris","Sirius","Alpha Centauri"], fr:["Le Soleil","l'Étoile Polaire","Sirius","Alpha du Centaure"]},
    exp:{en:"The Sun! It's a star — just very close, so it looks huge and bright.", fr:"Le Soleil ! C'est une étoile — mais si proche qu'elle paraît énorme et brillante."}},
  { level:0, cat:"solar", answer:0, q:{en:"Which planet is known as the Red Planet?", fr:"Quelle planète est appelée la planète rouge ?"},
    choices:{en:["Mars","Venus","Jupiter","Mercury"], fr:["Mars","Vénus","Jupiter","Mercure"]},
    exp:{en:"Mars looks red because of rusty iron dust on its surface.", fr:"Mars paraît rouge à cause de la poussière de fer rouillé à sa surface."}},
  { level:0, cat:"solar", answer:0, q:{en:"What is at the centre of our Solar System?", fr:"Qu'y a-t-il au centre de notre système solaire ?"},
    choices:{en:["The Sun","The Earth","The Moon","A black hole"], fr:["Le Soleil","la Terre","la Lune","un trou noir"]},
    exp:{en:"The Sun — everything orbits around it.", fr:"Le Soleil — tout gravite autour de lui."}},
  { level:0, cat:"solar", answer:0, q:{en:"What is the name of Earth's natural satellite?", fr:"Comment s'appelle le satellite naturel de la Terre ?"},
    choices:{en:["The Moon","Titan","Europa","Phobos"], fr:["la Lune","Titan","Europe","Phobos"]},
    exp:{en:"The Moon — our only natural satellite.", fr:"La Lune — notre seul satellite naturel."}},
  { level:0, cat:"solar", answer:0, q:{en:"Which is the largest planet in the Solar System?", fr:"Quelle est la plus grande planète du système solaire ?"},
    choices:{en:["Jupiter","Saturn","Earth","Neptune"], fr:["Jupiter","Saturne","la Terre","Neptune"]},
    exp:{en:"Jupiter — more than 1,300 Earths would fit inside it.", fr:"Jupiter — on pourrait y loger plus de 1 300 Terres."}},
  { level:0, cat:"deep", answer:0, q:{en:"What do we call the streak of light when a space rock burns up in our sky?", fr:"Comment appelle-t-on la traînée de lumière quand une roche brûle dans le ciel ?"},
    choices:{en:["A meteor (shooting star)","A comet","A planet","A galaxy"], fr:["Un météore (étoile filante)","une comète","une planète","une galaxie"]},
    exp:{en:"A meteor — a 'shooting star' is just dust burning up in the air.", fr:"Un météore — une « étoile filante » n'est que de la poussière qui brûle dans l'air."}},
  { level:0, cat:"deep", answer:0, q:{en:"What is the Milky Way?", fr:"Qu'est-ce que la Voie lactée ?"},
    choices:{en:["Our galaxy","A planet","A comet","A star"], fr:["Notre galaxie","une planète","une comète","une étoile"]},
    exp:{en:"Our home galaxy — hundreds of billions of stars, including the Sun.", fr:"Notre galaxie — des centaines de milliards d'étoiles, dont le Soleil."}},
  { level:0, cat:"explore", answer:0, q:{en:"What tool do astronomers use to see faraway objects?", fr:"Quel instrument les astronomes utilisent-ils pour voir les objets lointains ?"},
    choices:{en:["A telescope","A microscope","A compass","A thermometer"], fr:["Un télescope","un microscope","une boussole","un thermomètre"]},
    exp:{en:"A telescope gathers light to reveal distant, faint objects.", fr:"Un télescope collecte la lumière pour révéler les objets lointains et faibles."}},
  { level:0, cat:"solar", answer:0, q:{en:"How many planets are in our Solar System?", fr:"Combien de planètes compte notre système solaire ?"},
    choices:{en:["8","9","7","12"], fr:["8","9","7","12"]},
    exp:{en:"Eight — Pluto was reclassified as a dwarf planet in 2006.", fr:"Huit — Pluton a été reclassée planète naine en 2006."}},
  { level:0, cat:"phys", answer:0, q:{en:"What is the hottest object in the Solar System?", fr:"Quel est l'objet le plus chaud du système solaire ?"},
    choices:{en:["The Sun","Mercury","Venus","Jupiter"], fr:["Le Soleil","Mercure","Vénus","Jupiter"]},
    exp:{en:"The Sun's core reaches about 15 million °C.", fr:"Le cœur du Soleil atteint environ 15 millions de °C."}},

  // ---------- Level 1: In Orbit ----------
  { level:1, cat:"solar", answer:0, q:{en:"Which planet is closest to the Sun?", fr:"Quelle planète est la plus proche du Soleil ?"},
    choices:{en:["Mercury","Venus","Earth","Mars"], fr:["Mercure","Vénus","la Terre","Mars"]},
    exp:{en:"Mercury — the smallest planet and the Sun's closest neighbour.", fr:"Mercure — la plus petite planète et la plus proche voisine du Soleil."}},
  { level:1, cat:"solar", answer:0, q:{en:"Which planet has the most spectacular ring system?", fr:"Quelle planète a le système d'anneaux le plus spectaculaire ?"},
    choices:{en:["Saturn","Jupiter","Mars","Mercury"], fr:["Saturne","Jupiter","Mars","Mercure"]},
    exp:{en:"Saturn's rings are made of countless chunks of ice and rock.", fr:"Les anneaux de Saturne sont faits d'innombrables morceaux de glace et de roche."}},
  { level:1, cat:"solar", answer:0, q:{en:"Which planet rotates on its side, tilted about 98°?", fr:"Quelle planète tourne couchée sur le côté, inclinée d'environ 98° ?"},
    choices:{en:["Uranus","Saturn","Mars","Venus"], fr:["Uranus","Saturne","Mars","Vénus"]},
    exp:{en:"Uranus — probably knocked over by a giant impact long ago.", fr:"Uranus — sans doute renversée par un impact géant il y a longtemps."}},
  { level:1, cat:"phys", answer:0, q:{en:"How long does Earth take to orbit the Sun once?", fr:"Combien de temps la Terre met-elle pour faire le tour du Soleil ?"},
    choices:{en:["One year","One day","One month","Ten years"], fr:["Un an","un jour","un mois","dix ans"]},
    exp:{en:"One year — about 365¼ days, which is why we add a leap day.", fr:"Un an — environ 365 jours ¼, d'où le jour bissextile."}},
  { level:1, cat:"deep", answer:0, q:{en:"What do we call a pattern of stars in the sky, like Orion?", fr:"Comment appelle-t-on un dessin d'étoiles dans le ciel, comme Orion ?"},
    choices:{en:["A constellation","A galaxy","A nebula","A cluster"], fr:["Une constellation","une galaxie","une nébuleuse","un amas"]},
    exp:{en:"A constellation — a recognisable pattern used to map the sky.", fr:"Une constellation — un motif reconnaissable pour cartographier le ciel."}},
  { level:1, cat:"solar", answer:0, q:{en:"The Great Red Spot is a giant storm on which planet?", fr:"La Grande Tache Rouge est une tempête géante sur quelle planète ?"},
    choices:{en:["Jupiter","Saturn","Mars","Neptune"], fr:["Jupiter","Saturne","Mars","Neptune"]},
    exp:{en:"Jupiter — a storm wider than Earth, raging for centuries.", fr:"Jupiter — une tempête plus large que la Terre, active depuis des siècles."}},
  { level:1, cat:"solar", answer:0, q:{en:"Which is the hottest planet in the Solar System?", fr:"Quelle est la planète la plus chaude du système solaire ?"},
    choices:{en:["Venus","Mercury","Mars","Jupiter"], fr:["Vénus","Mercure","Mars","Jupiter"]},
    exp:{en:"Venus (~465°C) — its thick CO₂ atmosphere traps heat, beating Mercury.", fr:"Vénus (~465 °C) — son épaisse atmosphère de CO₂ piège la chaleur, plus que Mercure."}},
  { level:1, cat:"explore", answer:2, q:{en:"What is the International Space Station?", fr:"Qu'est-ce que la Station Spatiale Internationale ?"},
    choices:{en:["A Moon base","A satellite of the Sun","A crewed lab orbiting Earth","A Mars probe"], fr:["Une base lunaire","un satellite du Soleil","un labo habité en orbite terrestre","une sonde martienne"]},
    exp:{en:"A crewed laboratory ~420 km up, circling Earth every ~90 minutes.", fr:"Un laboratoire habité à ~420 km, faisant le tour de la Terre en ~90 minutes."}},
  { level:1, cat:"phys", answer:1, q:{en:"Why does the Moon seem to change shape through the month?", fr:"Pourquoi la Lune semble-t-elle changer de forme au fil du mois ?"},
    choices:{en:["It really changes size","We see different amounts of its sunlit half","Earth's shadow covers it","Clouds hide part of it"], fr:["Elle change vraiment de taille","On voit une part différente de sa moitié éclairée","L'ombre de la Terre la couvre","Des nuages en cachent une partie"]},
    exp:{en:"Phases: as the Moon orbits, we see different amounts of its sunlit side.", fr:"Les phases : en orbitant, la Lune nous montre une part variable de sa face éclairée."}},
  { level:1, cat:"solar", answer:0, q:{en:"On Venus, which lasts longer — a day or a year?", fr:"Sur Vénus, qu'est-ce qui dure le plus longtemps — un jour ou une année ?"},
    choices:{en:["A day","A year","They're equal","Neither exists"], fr:["Un jour","une année","les deux sont égaux","aucun n'existe"]},
    exp:{en:"A Venus day (243 Earth days) is longer than its year (225 days)!", fr:"Un jour vénusien (243 jours terrestres) est plus long que son année (225 jours) !"}},

  // ---------- Level 2: Deep Space ----------
  { level:2, cat:"deep", answer:0, q:{en:"What is the closest large spiral galaxy to the Milky Way?", fr:"Quelle est la grande galaxie spirale la plus proche de la Voie lactée ?"},
    choices:{en:["Andromeda","Triangulum","Whirlpool","Sombrero"], fr:["Andromède","le Triangle","le Tourbillon","le Sombrero"]},
    exp:{en:"Andromeda (M31), ~2.5 million light-years away and heading toward us.", fr:"Andromède (M31), à ~2,5 millions d'années-lumière et fonçant vers nous."}},
  { level:2, cat:"phys", answer:0, q:{en:"A light-year measures…", fr:"Une année-lumière mesure…"},
    choices:{en:["distance","time","brightness","mass"], fr:["une distance","un temps","un éclat","une masse"]},
    exp:{en:"The distance light travels in a year — about 9.46 trillion km.", fr:"La distance parcourue par la lumière en un an — environ 9 460 milliards de km."}},
  { level:2, cat:"stars", answer:0, q:{en:"What will the Sun become at the end of its life?", fr:"Que deviendra le Soleil à la fin de sa vie ?"},
    choices:{en:["A white dwarf","A black hole","A neutron star","A supernova"], fr:["Une naine blanche","un trou noir","une étoile à neutrons","une supernova"]},
    exp:{en:"Too light for a black hole — it sheds its layers, leaving a white dwarf.", fr:"Trop léger pour un trou noir — il expulse ses couches et laisse une naine blanche."}},
  { level:2, cat:"stars", answer:0, q:{en:"What is the brightest star in Earth's night sky?", fr:"Quelle est l'étoile la plus brillante du ciel nocturne ?"},
    choices:{en:["Sirius","Polaris","Betelgeuse","Vega"], fr:["Sirius","l'Étoile Polaire","Bételgeuse","Véga"]},
    exp:{en:"Sirius, in Canis Major, at magnitude −1.46.", fr:"Sirius, dans le Grand Chien, de magnitude −1,46."}},
  { level:2, cat:"deep", answer:0, q:{en:"What is a nebula?", fr:"Qu'est-ce qu'une nébuleuse ?"},
    choices:{en:["A cloud of gas and dust where stars form","A dead star","A giant planet","A cluster of black holes"], fr:["Un nuage de gaz et de poussière où naissent les étoiles","une étoile morte","une planète géante","un amas de trous noirs"]},
    exp:{en:"Many nebulae are stellar nurseries — like the Orion Nebula.", fr:"Beaucoup de nébuleuses sont des pouponnières d'étoiles — comme la nébuleuse d'Orion."}},
  { level:2, cat:"phys", answer:0, q:{en:"The speed of light is closest to…", fr:"La vitesse de la lumière est proche de…"},
    choices:{en:["300,000 km/s","300 km/s","3,000 km/s","30 million km/s"], fr:["300 000 km/s","300 km/s","3 000 km/s","30 millions de km/s"]},
    exp:{en:"About 299,792 km/s — the cosmic speed limit.", fr:"Environ 299 792 km/s — la limite de vitesse de l'univers."}},
  { level:2, cat:"phys", answer:1, q:{en:"Why do we always see the same side of the Moon?", fr:"Pourquoi voyons-nous toujours la même face de la Lune ?"},
    choices:{en:["It doesn't spin","It's tidally locked — it spins once per orbit","Earth's shadow hides the far side","It's too far away"], fr:["Elle ne tourne pas","elle est en rotation synchrone — un tour par orbite","l'ombre de la Terre cache l'autre face","elle est trop loin"]},
    exp:{en:"Tidal locking: the Moon rotates once for every orbit of Earth.", fr:"Rotation synchrone : la Lune tourne une fois par orbite autour de la Terre."}},
  { level:2, cat:"stars", answer:0, q:{en:"Betelgeuse is a red…", fr:"Bételgeuse est une… rouge."},
    choices:{en:["supergiant","dwarf","neutron star","planet"], fr:["supergéante","naine","étoile à neutrons","planète"]},
    exp:{en:"A red supergiant so big it would swallow Mars' orbit — a future supernova.", fr:"Une supergéante rouge si grande qu'elle engloutirait l'orbite de Mars — future supernova."}},
  { level:2, cat:"phys", answer:0, q:{en:"About how long does sunlight take to reach Earth?", fr:"Combien de temps met la lumière du Soleil pour atteindre la Terre ?"},
    choices:{en:["8 minutes","8 seconds","8 hours","1 year"], fr:["8 minutes","8 secondes","8 heures","1 an"]},
    exp:{en:"About 8 minutes 20 seconds across ~150 million km.", fr:"Environ 8 minutes 20 secondes sur ~150 millions de km."}},
  { level:2, cat:"deep", answer:0, q:{en:"A supernova is…", fr:"Une supernova, c'est…"},
    choices:{en:["the explosive death of a massive star","the birth of a planet","a kind of comet","a solar flare"], fr:["la mort explosive d'une étoile massive","la naissance d'une planète","une sorte de comète","une éruption solaire"]},
    exp:{en:"A massive star exploding — briefly outshining an entire galaxy.", fr:"Une étoile massive qui explose — surpassant brièvement une galaxie entière."}},

  // ---------- Level 3: Interstellar ----------
  { level:3, cat:"phys", answer:0, q:{en:"Once something passes a black hole's ___, it can never escape.", fr:"Une fois franchi le/la ___ d'un trou noir, rien ne peut s'échapper."},
    choices:{en:["event horizon","photosphere","corona","accretion disk"], fr:["horizon des événements","photosphère","couronne","disque d'accrétion"]},
    exp:{en:"The event horizon — escaping there would need faster-than-light speed.", fr:"L'horizon des événements — s'en échapper exigerait de dépasser la lumière."}},
  { level:3, cat:"phys", answer:0, q:{en:"What powers the Sun?", fr:"Qu'est-ce qui alimente le Soleil ?"},
    choices:{en:["Nuclear fusion of hydrogen into helium","Burning coal","Chemical explosions","Electricity"], fr:["La fusion nucléaire de l'hydrogène en hélium","la combustion du charbon","des explosions chimiques","l'électricité"]},
    exp:{en:"Fusion in its core turns hydrogen into helium, releasing enormous energy.", fr:"La fusion en son cœur transforme l'hydrogène en hélium, libérant une énergie énorme."}},
  { level:3, cat:"explore", answer:1, q:{en:"Which spacecraft is the most distant human-made object from Earth?", fr:"Quel engin est l'objet fabriqué par l'humain le plus éloigné de la Terre ?"},
    choices:{en:["Cassini","Voyager 1","Hubble","New Horizons"], fr:["Cassini","Voyager 1","Hubble","New Horizons"]},
    exp:{en:"Voyager 1, launched 1977, is now in interstellar space over 24 billion km away.", fr:"Voyager 1, lancée en 1977, est dans l'espace interstellaire à plus de 24 milliards de km."}},
  { level:3, cat:"explore", answer:0, q:{en:"The James Webb Space Telescope mainly observes in…", fr:"Le télescope spatial James Webb observe surtout dans…"},
    choices:{en:["infrared light","X-rays","radio waves","ultraviolet light"], fr:["l'infrarouge","les rayons X","les ondes radio","l'ultraviolet"]},
    exp:{en:"Infrared — it sees through dust and detects the earliest, most distant galaxies.", fr:"L'infrarouge — il voit à travers la poussière et repère les galaxies les plus lointaines."}},
  { level:3, cat:"stars", answer:0, q:{en:"A pulsar is a…", fr:"Un pulsar est une…"},
    choices:{en:["rapidly spinning neutron star beaming radiation","young planet","type of comet","cloud of gas"], fr:["étoile à neutrons en rotation rapide émettant un faisceau","jeune planète","sorte de comète","nuage de gaz"]},
    exp:{en:"A spinning neutron star whose beams sweep past us like a lighthouse.", fr:"Une étoile à neutrons en rotation dont les faisceaux nous balaient comme un phare."}},
  { level:3, cat:"deep", answer:2, q:{en:"When will the Andromeda Galaxy collide with the Milky Way?", fr:"Quand la galaxie d'Andromède entrera-t-elle en collision avec la Voie lactée ?"},
    choices:{en:["Next year","In 100 years","In ~4–5 billion years","Never"], fr:["L'an prochain","dans 100 ans","dans ~4–5 milliards d'années","jamais"]},
    exp:{en:"In ~4.5 billion years — but stars are so far apart almost none will collide.", fr:"Dans ~4,5 milliards d'années — mais les étoiles sont si espacées qu'elles ne se heurteront presque pas."}},
  { level:3, cat:"phys", answer:0, q:{en:"What is dark energy thought to do?", fr:"Que fait, pense-t-on, l'énergie noire ?"},
    choices:{en:["Accelerate the universe's expansion","Slow the planets","Power the Sun","Create black holes"], fr:["Accélérer l'expansion de l'univers","ralentir les planètes","alimenter le Soleil","créer des trous noirs"]},
    exp:{en:"It's speeding up cosmic expansion — and makes up ~68% of the universe.", fr:"Elle accélère l'expansion cosmique — et représente ~68 % de l'univers."}},
  { level:3, cat:"phys", answer:2, q:{en:"A teaspoon of neutron-star material would weigh about…", fr:"Une cuillère de matière d'étoile à neutrons pèserait environ…"},
    choices:{en:["1 kilogram","1 tonne","a billion tonnes","the same as water"], fr:["1 kilogramme","1 tonne","un milliard de tonnes","comme l'eau"]},
    exp:{en:"About a billion tonnes — neutron stars are almost unimaginably dense.", fr:"Environ un milliard de tonnes — les étoiles à neutrons sont incroyablement denses."}},
  { level:3, cat:"deep", answer:0, q:{en:"A galaxy's light being 'redshifted' is evidence that…", fr:"Le « décalage vers le rouge » de la lumière d'une galaxie prouve que…"},
    choices:{en:["the universe is expanding","the galaxy is on fire","it's made of red stars","it's very cold"], fr:["l'univers est en expansion","la galaxie brûle","elle est faite d'étoiles rouges","elle est très froide"]},
    exp:{en:"Expansion stretches the light to longer, redder wavelengths.", fr:"L'expansion étire la lumière vers de plus grandes longueurs d'onde, plus rouges."}},
  { level:3, cat:"solar", answer:1, q:{en:"Which is the tallest known volcano in the Solar System?", fr:"Quel est le plus haut volcan connu du système solaire ?"},
    choices:{en:["Mauna Kea","Olympus Mons (Mars)","Mount Everest","Vesuvius"], fr:["Mauna Kea","Olympus Mons (Mars)","l'Everest","le Vésuve"]},
    exp:{en:"Olympus Mons on Mars — ~22 km high, nearly three times Everest.", fr:"Olympus Mons sur Mars — ~22 km de haut, presque trois fois l'Everest."}},

  // ---------- Level 4: Event Horizon ----------
  { level:4, cat:"deep", answer:0, q:{en:"What is the name of the supermassive black hole at the Milky Way's centre?", fr:"Comment s'appelle le trou noir supermassif au centre de la Voie lactée ?"},
    choices:{en:["Sagittarius A*","Cygnus X-1","M87*","Betelgeuse"], fr:["Sagittarius A*","Cygnus X-1","M87*","Bételgeuse"]},
    exp:{en:"Sagittarius A* — about 4 million times the Sun's mass. Imaged in 2022.", fr:"Sagittarius A* — environ 4 millions de fois la masse du Soleil. Imagé en 2022."}},
  { level:4, cat:"deep", answer:0, q:{en:"The cosmic microwave background is…", fr:"Le fond diffus cosmologique est…"},
    choices:{en:["the oldest light, from ~380,000 years after the Big Bang","light from the nearest star","a type of radio station","reflected sunlight"], fr:["la plus vieille lumière, ~380 000 ans après le Big Bang","la lumière de l'étoile la plus proche","une station radio","de la lumière solaire réfléchie"]},
    exp:{en:"The afterglow of the Big Bang, now cooled to microwaves filling all of space.", fr:"La lueur résiduelle du Big Bang, refroidie en micro-ondes qui emplissent l'espace."}},
  { level:4, cat:"phys", answer:2, q:{en:"Roughly what fraction of the universe is dark energy?", fr:"Quelle fraction de l'univers est de l'énergie noire, environ ?"},
    choices:{en:["About 5%","About 27%","About 68%","About 95%"], fr:["Environ 5 %","environ 27 %","environ 68 %","environ 95 %"]},
    exp:{en:"~68% dark energy, ~27% dark matter, ~5% ordinary matter.", fr:"~68 % d'énergie noire, ~27 % de matière noire, ~5 % de matière ordinaire."}},
  { level:4, cat:"phys", answer:0, q:{en:"Most of the universe's gold was likely forged in…", fr:"La majeure partie de l'or de l'univers a probablement été forgée dans…"},
    choices:{en:["neutron-star collisions","the Sun's core","volcanoes","comets"], fr:["des collisions d'étoiles à neutrons","le cœur du Soleil","des volcans","des comètes"]},
    exp:{en:"Neutron-star mergers — the gold in your ring may come from colliding dead stars.", fr:"Des fusions d'étoiles à neutrons — l'or de ta bague vient peut-être d'étoiles mortes."}},
  { level:4, cat:"stars", answer:1, q:{en:"The Chandrasekhar limit (~1.4 solar masses) is the maximum mass of a…", fr:"La limite de Chandrasekhar (~1,4 masse solaire) est la masse maximale d'une…"},
    choices:{en:["planet","white dwarf","galaxy","comet"], fr:["planète","naine blanche","galaxie","comète"]},
    exp:{en:"Above it, a white dwarf collapses — often triggering a supernova.", fr:"Au-delà, une naine blanche s'effondre — déclenchant souvent une supernova."}},
  { level:4, cat:"phys", answer:0, q:{en:"Gravitational lensing is when…", fr:"Une lentille gravitationnelle, c'est quand…"},
    choices:{en:["gravity bends light from objects behind a massive one","planets line up","a telescope zooms in","a star explodes"], fr:["la gravité courbe la lumière d'objets situés derrière une masse","des planètes s'alignent","un télescope zoome","une étoile explose"]},
    exp:{en:"Massive objects warp space, bending light — a prediction of general relativity.", fr:"Les masses déforment l'espace et courbent la lumière — une prédiction de la relativité générale."}},
  { level:4, cat:"phys", answer:2, q:{en:"Which particle streams from the Sun and passes right through you?", fr:"Quelle particule jaillit du Soleil et te traverse de part en part ?"},
    choices:{en:["Proton","Photon","Neutrino","Electron"], fr:["Proton","Photon","Neutrino","Électron"]},
    exp:{en:"Neutrinos — trillions pass through your body every second, unnoticed.", fr:"Les neutrinos — des milliers de milliards te traversent chaque seconde, sans que tu le sentes."}},
  { level:4, cat:"deep", answer:1, q:{en:"About how old is the universe?", fr:"Quel âge a l'univers, environ ?"},
    choices:{en:["4.6 billion years","13.8 billion years","1 million years","100 billion years"], fr:["4,6 milliards d'années","13,8 milliards d'années","1 million d'années","100 milliards d'années"]},
    exp:{en:"About 13.8 billion years — measured from the cosmic microwave background.", fr:"Environ 13,8 milliards d'années — mesuré grâce au fond diffus cosmologique."}},
  { level:4, cat:"deep", answer:0, q:{en:"A quasar is powered by…", fr:"Un quasar est alimenté par…"},
    choices:{en:["a supermassive black hole devouring matter","a cluster of new stars","a single giant planet","a supernova"], fr:["un trou noir supermassif dévorant de la matière","un amas de jeunes étoiles","une seule planète géante","une supernova"]},
    exp:{en:"Gas spiralling into a giant black hole glows brighter than a whole galaxy.", fr:"Le gaz qui spirale vers un trou noir géant brille plus qu'une galaxie entière."}},
  { level:4, cat:"phys", answer:0, q:{en:"Hubble's law relates a galaxy's distance to its…", fr:"La loi de Hubble relie la distance d'une galaxie à sa…"},
    choices:{en:["speed of recession","temperature","colour","number of stars"], fr:["vitesse d'éloignement","température","couleur","nombre d'étoiles"]},
    exp:{en:"Farther galaxies recede faster — key evidence for the expanding universe.", fr:"Les galaxies lointaines s'éloignent plus vite — preuve clé de l'expansion de l'univers."}},

  // ---------- Level 0: Launchpad (more) ----------
  { level:0, cat:"solar", answer:0, q:{en:"Which planet is the farthest from the Sun?", fr:"Quelle planète est la plus éloignée du Soleil ?"},
    choices:{en:["Neptune","Saturn","Mars","Jupiter"], fr:["Neptune","Saturne","Mars","Jupiter"]},
    exp:{en:"Neptune — a deep-blue, icy giant far out in the cold.", fr:"Neptune — une géante glacée bleu foncé, loin dans le froid."}},
  { level:0, cat:"deep", answer:1, q:{en:"A comet's tail always points…", fr:"La queue d'une comète pointe toujours…"},
    choices:{en:["toward the Sun","away from the Sun","straight down","backwards along its path"], fr:["vers le Soleil","à l'opposé du Soleil","droit vers le bas","en arrière sur sa trajectoire"]},
    exp:{en:"Away from the Sun — the solar wind blows the tail outward.", fr:"À l'opposé du Soleil — le vent solaire repousse la queue vers l'extérieur."}},
  { level:0, cat:"solar", answer:0, q:{en:"What does the Moon NOT have?", fr:"Qu'est-ce que la Lune N'A PAS ?"},
    choices:{en:["Air to breathe","Craters","Mountains","Dust"], fr:["De l'air pour respirer","des cratères","des montagnes","de la poussière"]},
    exp:{en:"No air — astronauts must bring their own to breathe.", fr:"Pas d'air — les astronautes doivent apporter le leur pour respirer."}},
  { level:0, cat:"phys", answer:0, q:{en:"What do we call the path a planet takes around the Sun?", fr:"Comment appelle-t-on le chemin d'une planète autour du Soleil ?"},
    choices:{en:["An orbit","A comet","A galaxy","A crater"], fr:["Une orbite","une comète","une galaxie","un cratère"]},
    exp:{en:"An orbit — a curved path held by the Sun's gravity.", fr:"Une orbite — un chemin courbe maintenu par la gravité du Soleil."}},
  { level:0, cat:"stars", answer:0, q:{en:"Which is usually MUCH bigger?", fr:"Qu'est-ce qui est généralement BIEN plus grand ?"},
    choices:{en:["A star","A planet","A moon","An asteroid"], fr:["Une étoile","une planète","une lune","un astéroïde"]},
    exp:{en:"Stars are huge balls of glowing gas — far bigger than planets.", fr:"Les étoiles sont d'énormes boules de gaz brillant — bien plus grandes que les planètes."}},

  // ---------- Level 1: In Orbit (more) ----------
  { level:1, cat:"solar", answer:0, q:{en:"Which planet spins the fastest, with a day of about 10 hours?", fr:"Quelle planète tourne le plus vite, avec un jour d'environ 10 heures ?"},
    choices:{en:["Jupiter","Earth","Mars","Venus"], fr:["Jupiter","la Terre","Mars","Vénus"]},
    exp:{en:"Jupiter — despite being the biggest, it spins in under 10 hours.", fr:"Jupiter — bien que la plus grosse, elle tourne en moins de 10 heures."}},
  { level:1, cat:"solar", answer:0, q:{en:"The main asteroid belt lies between which two planets?", fr:"La ceinture principale d'astéroïdes se trouve entre quelles deux planètes ?"},
    choices:{en:["Mars and Jupiter","Earth and Mars","Jupiter and Saturn","Venus and Earth"], fr:["Mars et Jupiter","la Terre et Mars","Jupiter et Saturne","Vénus et la Terre"]},
    exp:{en:"Between Mars and Jupiter — millions of rocky leftovers orbit there.", fr:"Entre Mars et Jupiter — des millions de débris rocheux y orbitent."}},
  { level:1, cat:"phys", answer:1, q:{en:"Earth's air is mostly made of which gas?", fr:"L'air de la Terre est surtout composé de quel gaz ?"},
    choices:{en:["Oxygen","Nitrogen","Carbon dioxide","Helium"], fr:["Oxygène","Azote","Dioxyde de carbone","Hélium"]},
    exp:{en:"About 78% nitrogen — oxygen is only around 21%.", fr:"Environ 78 % d'azote — l'oxygène ne représente qu'environ 21 %."}},
  { level:1, cat:"solar", answer:2, q:{en:"What is the largest moon in the Solar System?", fr:"Quelle est la plus grande lune du système solaire ?"},
    choices:{en:["Our Moon","Titan","Ganymede","Europa"], fr:["notre Lune","Titan","Ganymède","Europe"]},
    exp:{en:"Ganymede, a moon of Jupiter — bigger even than the planet Mercury.", fr:"Ganymède, une lune de Jupiter — plus grande même que la planète Mercure."}},
  { level:1, cat:"phys", answer:0, q:{en:"What causes a solar eclipse?", fr:"Qu'est-ce qui provoque une éclipse solaire ?"},
    choices:{en:["The Moon passes between Earth and the Sun","Earth passes between the Moon and Sun","The Sun switches off","Clouds cover the Sun"], fr:["La Lune passe entre la Terre et le Soleil","la Terre passe entre la Lune et le Soleil","le Soleil s'éteint","des nuages cachent le Soleil"]},
    exp:{en:"The Moon slips directly in front of the Sun, casting a shadow on Earth.", fr:"La Lune se place juste devant le Soleil et projette une ombre sur la Terre."}},

  // ---------- Level 2: Deep Space (more) ----------
  { level:2, cat:"stars", answer:1, q:{en:"The North Star, Polaris, sits in which constellation?", fr:"L'étoile Polaire se trouve dans quelle constellation ?"},
    choices:{en:["Ursa Major (Great Bear)","Ursa Minor (Little Bear)","Orion","Cassiopeia"], fr:["la Grande Ourse","la Petite Ourse","Orion","Cassiopée"]},
    exp:{en:"Ursa Minor — Polaris marks the tip of the Little Bear's tail.", fr:"La Petite Ourse — Polaris marque le bout de la queue de la Petite Ourse."}},
  { level:2, cat:"deep", answer:0, q:{en:"What is the 'Local Group'?", fr:"Qu'est-ce que le « Groupe local » ?"},
    choices:{en:["The cluster of galaxies our Milky Way belongs to","A group of nearby stars","The planets near Earth","A team of astronauts"], fr:["l'amas de galaxies dont fait partie notre Voie lactée","un groupe d'étoiles proches","les planètes proches de la Terre","une équipe d'astronautes"]},
    exp:{en:"Our galactic neighbourhood — about 80 galaxies, led by Andromeda and the Milky Way.", fr:"Notre voisinage galactique — environ 80 galaxies, menées par Andromède et la Voie lactée."}},
  { level:2, cat:"stars", answer:1, q:{en:"Compared with blue stars, red stars are…", fr:"Comparées aux étoiles bleues, les étoiles rouges sont…"},
    choices:{en:["hotter","cooler","always bigger","always closer"], fr:["plus chaudes","plus froides","toujours plus grandes","toujours plus proches"]},
    exp:{en:"Cooler — a star's colour reveals its temperature; blue is hottest, red is coolest.", fr:"Plus froides — la couleur d'une étoile révèle sa température ; le bleu est le plus chaud, le rouge le plus froid."}},
  { level:2, cat:"stars", answer:0, q:{en:"Which three bright stars form the 'Summer Triangle'?", fr:"Quelles trois étoiles brillantes forment le « Triangle d'été » ?"},
    choices:{en:["Vega, Deneb, Altair","Sirius, Rigel, Betelgeuse","Polaris, Vega, Mars","Castor, Pollux, Procyon"], fr:["Véga, Deneb, Altaïr","Sirius, Rigel, Bételgeuse","Polaris, Véga, Mars","Castor, Pollux, Procyon"]},
    exp:{en:"Vega, Deneb and Altair — high overhead on summer nights in the north.", fr:"Véga, Deneb et Altaïr — hautes dans le ciel des nuits d'été au nord."}},
  { level:2, cat:"deep", answer:0, q:{en:"A galaxy shaped like a flat, spinning disc with curved arms is a…", fr:"Une galaxie en forme de disque plat qui tourne, avec des bras courbés, est une…"},
    choices:{en:["spiral galaxy","elliptical galaxy","dwarf galaxy","irregular galaxy"], fr:["galaxie spirale","galaxie elliptique","galaxie naine","galaxie irrégulière"]},
    exp:{en:"A spiral galaxy — like our own Milky Way.", fr:"Une galaxie spirale — comme notre Voie lactée."}},

  // ---------- Level 3: Interstellar (more) ----------
  { level:3, cat:"solar", answer:1, q:{en:"The Kuiper Belt, home of Pluto, lies just beyond which planet?", fr:"La ceinture de Kuiper, où se trouve Pluton, est juste au-delà de quelle planète ?"},
    choices:{en:["Mars","Neptune","Jupiter","Saturn"], fr:["Mars","Neptune","Jupiter","Saturne"]},
    exp:{en:"Beyond Neptune — a ring of icy worlds including dwarf planet Pluto.", fr:"Au-delà de Neptune — un anneau de mondes glacés dont la planète naine Pluton."}},
  { level:3, cat:"deep", answer:0, q:{en:"What is the Oort Cloud?", fr:"Qu'est-ce que le nuage d'Oort ?"},
    choices:{en:["A distant shell of icy comets around the Solar System","A cloud on Jupiter","A nebula near the Sun","Dust in Saturn's rings"], fr:["une immense coquille de comètes glacées autour du système solaire","un nuage sur Jupiter","une nébuleuse près du Soleil","de la poussière dans les anneaux de Saturne"]},
    exp:{en:"A giant sphere of icy bodies far beyond the planets — where many comets come from.", fr:"Une sphère géante de corps glacés bien au-delà des planètes — d'où viennent beaucoup de comètes."}},
  { level:3, cat:"deep", answer:0, q:{en:"What is an exoplanet?", fr:"Qu'est-ce qu'une exoplanète ?"},
    choices:{en:["A planet orbiting another star","A very big moon","A failed star","A comet with planets"], fr:["une planète en orbite autour d'une autre étoile","une très grande lune","une étoile ratée","une comète avec des planètes"]},
    exp:{en:"A world beyond our Solar System — thousands have now been found.", fr:"Un monde au-delà de notre système solaire — on en a découvert des milliers."}},
  { level:3, cat:"phys", answer:1, q:{en:"The 'habitable zone' around a star is the region where…", fr:"La « zone habitable » autour d'une étoile est la région où…"},
    choices:{en:["it is always dark","liquid water could exist","gravity disappears","only gas giants form"], fr:["il fait toujours nuit","de l'eau liquide pourrait exister","la gravité disparaît","seules des géantes gazeuses se forment"]},
    exp:{en:"Not too hot, not too cold — the 'Goldilocks' zone where water can stay liquid.", fr:"Ni trop chaud, ni trop froid — la zone « Boucle d'or » où l'eau peut rester liquide."}},
  { level:3, cat:"phys", answer:1, q:{en:"What is the second most common element in the universe?", fr:"Quel est le deuxième élément le plus courant dans l'univers ?"},
    choices:{en:["Oxygen","Helium","Iron","Carbon"], fr:["Oxygène","Hélium","Fer","Carbone"]},
    exp:{en:"Helium — after hydrogen. Both were made mostly in the Big Bang.", fr:"L'hélium — après l'hydrogène. Les deux ont surtout été créés lors du Big Bang."}},

  // ---------- Level 4: Event Horizon (more) ----------
  { level:4, cat:"deep", answer:0, q:{en:"The Fermi Paradox asks:", fr:"Le paradoxe de Fermi demande :"},
    choices:{en:["If the universe is so big, where is everybody (aliens)?","Why is the sky dark at night?","How old is the Sun?","Why do planets orbit?"], fr:["Si l'univers est si grand, où est tout le monde (les extraterrestres) ?","Pourquoi le ciel est-il noir la nuit ?","Quel âge a le Soleil ?","Pourquoi les planètes orbitent-elles ?"]},
    exp:{en:"With billions of stars, why haven't we found alien life yet? Nobody knows.", fr:"Avec des milliards d'étoiles, pourquoi n'a-t-on pas trouvé de vie extraterrestre ? Personne ne le sait."}},
  { level:4, cat:"phys", answer:2, q:{en:"Protons and neutrons are built from tinier particles called…", fr:"Les protons et neutrons sont faits de particules plus petites appelées…"},
    choices:{en:["photons","neutrinos","quarks","atoms"], fr:["photons","neutrinos","quarks","atomes"]},
    exp:{en:"Quarks — held together by the strong force. Three quarks make a proton.", fr:"Des quarks — liés par la force forte. Trois quarks forment un proton."}},
  { level:4, cat:"phys", answer:0, q:{en:"The leftover glow of the Big Bang (the CMB) now has a temperature of about…", fr:"La lueur résiduelle du Big Bang (le fond diffus) a aujourd'hui une température d'environ…"},
    choices:{en:["−270°C (2.7 K, very cold)","100°C","15 million °C","0°C"], fr:["−270 °C (2,7 K, très froid)","100 °C","15 millions de °C","0 °C"]},
    exp:{en:"Just 2.7 degrees above absolute zero — the whole universe has cooled that much.", fr:"À peine 2,7 degrés au-dessus du zéro absolu — tout l'univers s'est autant refroidi."}},
  { level:4, cat:"phys", answer:0, q:{en:"Most of the ordinary matter in the universe is…", fr:"La majeure partie de la matière ordinaire de l'univers est de…"},
    choices:{en:["hydrogen","gold","iron","oxygen"], fr:["l'hydrogène","l'or","le fer","l'oxygène"]},
    exp:{en:"Hydrogen — the simplest and most abundant element, fuel for the stars.", fr:"L'hydrogène — l'élément le plus simple et le plus abondant, le carburant des étoiles."}},
  { level:4, cat:"deep", answer:0, q:{en:"The 'Great Attractor' is…", fr:"Le « Grand Attracteur » est…"},
    choices:{en:["a huge mass pulling our galaxies toward it","a giant star","a black hole inside the Sun","a type of comet"], fr:["une masse énorme qui attire nos galaxies vers elle","une étoile géante","un trou noir dans le Soleil","un type de comète"]},
    exp:{en:"A mysterious gravity source drawing the Milky Way and thousands of galaxies toward it.", fr:"Une source de gravité mystérieuse qui attire la Voie lactée et des milliers de galaxies."}},

  // ---------- Level 5: Singularity ----------
  { level:5, cat:"phys", answer:0, q:{en:"'Spaghettification' near a black hole is caused by…", fr:"La « spaghettification » près d'un trou noir est causée par…"},
    choices:{en:["tidal forces stretching you","heat","radiation","magnetism"], fr:["les forces de marée qui t'étirent","la chaleur","le rayonnement","le magnétisme"]},
    exp:{en:"Gravity pulls your feet far harder than your head, stretching you like spaghetti.", fr:"La gravité tire tes pieds bien plus fort que ta tête, t'étirant comme un spaghetti."}},
  { level:5, cat:"phys", answer:1, q:{en:"Hawking radiation means black holes slowly…", fr:"Le rayonnement de Hawking signifie que les trous noirs, lentement…"},
    choices:{en:["grow forever","evaporate and lose mass","turn into stars","stop time"], fr:["grossissent pour toujours","s'évaporent et perdent de la masse","deviennent des étoiles","arrêtent le temps"]},
    exp:{en:"Stephen Hawking showed black holes leak a tiny bit of energy and very slowly shrink.", fr:"Stephen Hawking a montré que les trous noirs fuient un peu d'énergie et rétrécissent très lentement."}},
  { level:5, cat:"phys", answer:0, q:{en:"The size of a black hole's event horizon is called its…", fr:"La taille de l'horizon des événements d'un trou noir s'appelle son…"},
    choices:{en:["Schwarzschild radius","Planck length","light-year","escape angle"], fr:["rayon de Schwarzschild","longueur de Planck","année-lumière","angle de fuite"]},
    exp:{en:"The Schwarzschild radius — squeeze any mass smaller than this and it becomes a black hole.", fr:"Le rayon de Schwarzschild — comprime une masse en dessous et elle devient un trou noir."}},
  { level:5, cat:"phys", answer:1, q:{en:"Near very strong gravity, time runs…", fr:"Près d'une gravité très forte, le temps s'écoule…"},
    choices:{en:["faster","slower","backwards","exactly the same"], fr:["plus vite","plus lentement","à l'envers","exactement pareil"]},
    exp:{en:"Gravitational time dilation — clocks tick slower deep in a gravity well (as in the film Interstellar!).", fr:"La dilatation gravitationnelle du temps — les horloges ralentissent au fond d'un puits de gravité (comme dans le film Interstellar !)."}},
  { level:5, cat:"phys", answer:2, q:{en:"A gravitational wave is a ripple in…", fr:"Une onde gravitationnelle est une ondulation dans…"},
    choices:{en:["the ocean","the air","spacetime itself","a magnetic field"], fr:["l'océan","l'air","l'espace-temps lui-même","un champ magnétique"]},
    exp:{en:"Ripples in spacetime, made by colliding black holes — first detected in 2015.", fr:"Des ondulations de l'espace-temps, créées par des trous noirs qui fusionnent — détectées en 2015."}},
  { level:5, cat:"deep", answer:0, q:{en:"The first-ever image of a black hole (2019) was made by the…", fr:"La toute première image d'un trou noir (2019) a été réalisée par le…"},
    choices:{en:["Event Horizon Telescope","Hubble Telescope","James Webb Telescope","Voyager probe"], fr:["Event Horizon Telescope","télescope Hubble","télescope James Webb","sonde Voyager"]},
    exp:{en:"A world-wide network of radio dishes imaged the black hole in galaxy M87.", fr:"Un réseau mondial d'antennes radio a imagé le trou noir de la galaxie M87."}},
  { level:5, cat:"deep", answer:1, q:{en:"We know dark matter exists mainly because…", fr:"On sait que la matière noire existe surtout parce que…"},
    choices:{en:["we can see it glow","galaxies spin too fast to hold together without it","it blocks starlight","it makes comets"], fr:["on la voit briller","les galaxies tournent trop vite pour tenir sans elle","elle bloque la lumière des étoiles","elle fabrique des comètes"]},
    exp:{en:"Galaxies rotate so fast they'd fly apart — unless extra unseen mass holds them together.", fr:"Les galaxies tournent si vite qu'elles se disperseraient — sauf si une masse invisible les retient."}},
  { level:5, cat:"deep", answer:2, q:{en:"The observable universe is about how wide?", fr:"L'univers observable fait environ quelle largeur ?"},
    choices:{en:["1 million light-years","1 billion light-years","93 billion light-years","100 light-years"], fr:["1 million d'années-lumière","1 milliard d'années-lumière","93 milliards d'années-lumière","100 années-lumière"]},
    exp:{en:"About 93 billion light-years across — because space itself has stretched.", fr:"Environ 93 milliards d'années-lumière — parce que l'espace lui-même s'est dilaté."}},
  { level:5, cat:"phys", answer:0, q:{en:"When matter meets antimatter, they…", fr:"Quand la matière rencontre l'antimatière, elles…"},
    choices:{en:["annihilate into pure energy","freeze","bounce apart","form a planet"], fr:["s'annihilent en énergie pure","gèlent","rebondissent","forment une planète"]},
    exp:{en:"They destroy each other, turning their mass into a burst of energy (E=mc²).", fr:"Elles se détruisent, transformant leur masse en une bouffée d'énergie (E=mc²)."}},
  { level:5, cat:"phys", answer:0, q:{en:"Quantum entanglement links two particles so that…", fr:"L'intrication quantique lie deux particules de sorte que…"},
    choices:{en:["measuring one instantly tells you about the other","they collide","they glow","they become one atom"], fr:["mesurer l'une renseigne instantanément sur l'autre","elles entrent en collision","elles brillent","elles deviennent un seul atome"]},
    exp:{en:"Einstein called it 'spooky action at a distance' — they stay connected across space.", fr:"Einstein l'appelait « action fantôme à distance » — elles restent liées à travers l'espace."}},
  { level:5, cat:"stars", answer:1, q:{en:"What stops a neutron star from collapsing into a black hole?", fr:"Qu'est-ce qui empêche une étoile à neutrons de s'effondrer en trou noir ?"},
    choices:{en:["Its heat","Neutron degeneracy pressure","Its magnetic field","Its spin"], fr:["Sa chaleur","La pression de dégénérescence des neutrons","Son champ magnétique","Sa rotation"]},
    exp:{en:"A quantum pressure between tightly-packed neutrons holds gravity off — up to a limit.", fr:"Une pression quantique entre neutrons serrés retient la gravité — jusqu'à une limite."}},
  { level:5, cat:"deep", answer:1, q:{en:"Type Ia supernovae are used as 'standard candles' to measure…", fr:"Les supernovae de type Ia servent de « chandelles standard » pour mesurer…"},
    choices:{en:["temperature","cosmic distances","a star's age","gravity"], fr:["la température","les distances cosmiques","l'âge d'une étoile","la gravité"]},
    exp:{en:"They always explode with about the same brightness, so their dimness reveals distance.", fr:"Elles explosent toujours avec à peu près le même éclat, donc leur faiblesse révèle la distance."}},
  { level:5, cat:"phys", answer:3, q:{en:"Which force has NOT yet been fully united with the others in one theory?", fr:"Quelle force n'a PAS encore été pleinement unifiée avec les autres en une seule théorie ?"},
    choices:{en:["Electromagnetism","The strong force","The weak force","Gravity"], fr:["L'électromagnétisme","la force forte","la force faible","la gravité"]},
    exp:{en:"Gravity — combining it with quantum physics is one of science's biggest unsolved puzzles.", fr:"La gravité — la combiner à la physique quantique est l'un des plus grands mystères de la science."}},
  { level:5, cat:"phys", answer:0, q:{en:"A theoretical 'white hole' would be…", fr:"Un « trou blanc » théorique serait…"},
    choices:{en:["the reverse of a black hole — nothing can enter","a very hot star","an empty galaxy","a frozen comet"], fr:["l'inverse d'un trou noir — rien ne peut y entrer","une étoile très chaude","une galaxie vide","une comète gelée"]},
    exp:{en:"A time-reversed black hole that only pushes things out. None have ever been seen.", fr:"Un trou noir inversé dans le temps qui ne fait qu'expulser. On n'en a jamais observé."}},
  { level:5, cat:"deep", answer:0, q:{en:"On the largest scale, galaxies are arranged in a…", fr:"À très grande échelle, les galaxies sont disposées en une…"},
    choices:{en:["'cosmic web' of filaments and empty voids","perfect grid","single straight line","solid ball"], fr:["« toile cosmique » de filaments et de vides","grille parfaite","seule ligne droite","boule solide"]},
    exp:{en:"Galaxies cluster along vast threads, with enormous empty voids between them.", fr:"Les galaxies s'alignent le long de vastes filaments, séparés par d'immenses vides."}},
];

// Fun, performance-based end messages (two variants per tier for replay variety).
const RESULT_MSGS = {
  perfect: [
    {en:"Flawless. Mission control is speechless — not a single miss. 🌟", fr:"Sans faute. Le centre de contrôle est bouche bée — pas une seule erreur ! 🌟"},
    {en:"A perfect score! NASA is checking whether you're secretly an astrophysicist. 🚀", fr:"Score parfait ! La NASA vérifie si tu n'es pas un astrophysicien secret. 🚀"},
  ],
  great: [
    {en:"Stellar work — you're orbiting the very top, a whisker from perfect! ✨", fr:"Travail stellaire — tu frôles la perfection, à un cheveu du sans-faute ! ✨"},
    {en:"Brilliant! The cosmos has very few secrets left from you. 🔭", fr:"Brillant ! Le cosmos n'a presque plus de secrets pour toi. 🔭"},
  ],
  good: [
    {en:"Solid flying! You know your way around the sky — keep climbing. 🌠", fr:"Beau pilotage ! Tu connais bien le ciel — continue de grimper. 🌠"},
    {en:"Nice run — you're well past the clouds and the stars are getting closer. 🚀", fr:"Belle manche — tu as dépassé les nuages, les étoiles se rapprochent. 🚀"},
  ],
  ok: [
    {en:"Liftoff achieved! A few wobbles, but you're airborne — try again and soar higher. 🛰️", fr:"Décollage réussi ! Quelques secousses, mais tu voles — retente pour monter plus haut. 🛰️"},
    {en:"Not bad, cadet — every astronaut trains a lot. One more orbit? 🌙", fr:"Pas mal, cadet — tout astronaute s'entraîne beaucoup. Encore une orbite ? 🌙"},
  ],
  low: [
    {en:"Houston, we have some studying to do! 😄 The universe is tricky — give it another shot.", fr:"Houston, on a des révisions à faire ! 😄 L'univers est retors — retente ta chance."},
    {en:"Every great astronomer started at zero gravity. Dust off and launch again! 🌌", fr:"Tout grand astronome a commencé en apesanteur. Repars à l'assaut ! 🌌"},
  ],
};

const Quiz = {
  view: "start",           // "start" | "question" | "result"
  level: 0,
  round: [], idx: 0, score: 0, streak: 0, best: 0, answered: false, chosen: null,
  started: false, msg: null,

  enter() {
    if (!this.started) {
      this.started = true;
      document.addEventListener("language-changed", () => this.repaint());
    }
    this.repaint();
  },

  L(o) { return o[(window.I18N && I18N.lang === "fr") ? "fr" : "en"]; },

  repaint() {
    if (this.view === "question") return this.paintQuestion();
    if (this.view === "result")   return this.paintResult();
    return this.paintStart();
  },

  host() { return U.el("quiz-app"); },

  // ---- level picker ----
  paintStart() {
    this.view = "start";
    const cards = QUIZ_LEVELS.map(lv => {
      const n = QUIZ_BANK.filter(q => q.level === lv.id).length;
      return `
      <button class="lvl-card" data-lvl="${lv.id}" style="--lc:${lv.color}">
        <div class="lvl-emoji">${lv.emoji}</div>
        <div class="lvl-name">${U.esc(this.L(lv.name))}</div>
        <div class="lvl-desc">${U.esc(this.L(lv.desc))}</div>
        <div class="lvl-meta">${Math.min(10,n)} ${t("quiz.questions")}</div>
      </button>`;
    }).join("");
    this.host().innerHTML = `
      <div class="quiz-center" style="margin-bottom:20px;">
        <div class="quiz-logo">🧠</div>
        <h2 class="quiz-h">${t("quiz.title")}</h2>
        <p class="quiz-intro">${t("quiz.pickIntro")}</p>
      </div>
      <div class="lvl-grid">${cards}</div>`;
    this.host().querySelectorAll(".lvl-card").forEach(c =>
      c.addEventListener("click", () => this.begin(parseInt(c.dataset.lvl,10))));
  },

  begin(levelId) {
    this.level = levelId;
    const pool = QUIZ_BANK.filter(q => q.level === levelId);
    const size = Math.min(10, pool.length);
    const idOf = q => q.q.en;
    const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };

    // Remember which questions were shown recently (per level) and favour fresh ones,
    // so replaying a level keeps feeling new until the whole bank has been seen.
    const seenKey = "obs-quiz-seen-" + levelId;
    let seen = [];
    try { seen = JSON.parse(localStorage.getItem(seenKey) || "[]"); } catch (e) {}
    const fresh = shuffle(pool.filter(q => !seen.includes(idOf(q))));
    const old = shuffle(pool.filter(q => seen.includes(idOf(q))));
    this.round = shuffle(fresh.concat(old).slice(0, size));

    let newSeen = Array.from(new Set(seen.concat(this.round.map(idOf))));
    if (newSeen.length >= pool.length) newSeen = this.round.map(idOf);   // cycled through — start over
    try { localStorage.setItem(seenKey, JSON.stringify(newSeen)); } catch (e) {}

    this.idx = 0; this.score = 0; this.streak = 0; this.best = 0; this.answered = false; this.chosen = null;
    this.view = "question";
    this.paintQuestion();
  },

  levelObj() { return QUIZ_LEVELS[this.level]; },

  paintQuestion() {
    this.view = "question";
    const q = this.round[this.idx];
    const cat = QUIZ_CATS[q.cat];
    const lv = this.levelObj();
    const choices = this.L(q.choices);
    this.host().innerHTML = `
      <div class="quiz-card">
        <div class="quiz-top">
          <span class="quiz-lvl" style="--lc:${lv.color}">${lv.emoji} ${U.esc(this.L(lv.name))}</span>
          <span class="quiz-progress">${t("quiz.question")} ${this.idx+1} ${t("quiz.of")} ${this.round.length}</span>
        </div>
        <div class="quiz-top" style="margin-bottom:14px;">
          <span class="quiz-cat" style="--cc:${cat.color}">${this.L(cat)}</span>
          <span class="quiz-scores"><span>${t("quiz.score")}: <b>${this.score}</b></span><span>${t("quiz.streak")}: <b>${this.streak}</b> 🔥</span></span>
        </div>
        <div class="quiz-q">${U.esc(this.L(q.q))}</div>
        <div class="quiz-choices">
          ${choices.map((c,i)=>`<button class="quiz-choice" data-i="${i}">${U.esc(c)}</button>`).join("")}
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>`;
    this.host().querySelectorAll(".quiz-choice").forEach(b =>
      b.addEventListener("click", () => this.answer(parseInt(b.dataset.i,10))));
    if (this.answered) this.reveal();   // restore feedback after a re-render (e.g. language switch)
  },

  answer(i) {
    if (this.answered) return;
    this.answered = true;
    this.chosen = i;
    const q = this.round[this.idx];
    if (i === q.answer) { this.score++; this.streak++; if (this.streak > this.best) this.best = this.streak; }
    else { this.streak = 0; }
    this.reveal();
  },

  reveal() {
    const q = this.round[this.idx];
    const correct = this.chosen === q.answer;
    this.host().querySelectorAll(".quiz-choice").forEach(b => {
      const bi = parseInt(b.dataset.i,10);
      b.classList.add("locked");
      if (bi === q.answer) b.classList.add("right");
      else if (bi === this.chosen) b.classList.add("wrong");
    });
    const last = this.idx === this.round.length - 1;
    U.el("quiz-feedback").innerHTML = `
      <div class="quiz-verdict ${correct?"ok":"no"}">${correct ? t("quiz.correct") : t("quiz.wrong")}</div>
      <div class="quiz-exp"><b>${t("quiz.theAnswer")}:</b> ${U.esc(this.L(q.exp))}</div>
      <button class="btn quiz-next" id="quiz-next-btn">${last ? t("quiz.finish") : t("quiz.next")}</button>`;
    U.el("quiz-next-btn").addEventListener("click", () => this.nextQ());
  },

  nextQ() {
    if (this.idx === this.round.length - 1) {
      // choose the fun message ONCE (so it doesn't reshuffle on language switch)
      const frac = this.score / this.round.length;
      const tier = frac === 1 ? "perfect" : frac >= 0.8 ? "great" : frac >= 0.6 ? "good" : frac >= 0.4 ? "ok" : "low";
      const pool = RESULT_MSGS[tier];
      this.msg = pool[Math.floor(Math.random()*pool.length)];
      this.view = "result";
      return this.paintResult();
    }
    this.idx++; this.answered = false; this.chosen = null; this.paintQuestion();
  },

  paintResult() {
    this.view = "result";
    const n = this.round.length, s = this.score;
    const frac = s / n;
    const lv = this.levelObj();
    const passed = frac >= 0.6;
    const hasNext = this.level < QUIZ_LEVELS.length - 1;
    const nextBtn = (passed && hasNext)
      ? `<button class="btn quiz-start" id="quiz-nextlvl-btn">${t("quiz.tryNext", { name: this.L(QUIZ_LEVELS[this.level+1].name) })}</button>` : "";
    this.host().innerHTML = `
      <div class="quiz-card quiz-center">
        <div class="quiz-logo">${s===n?"🏆":s>=n*0.6?"🌟":"🔭"}</div>
        <div class="quiz-onlevel" style="--lc:${lv.color}">${lv.emoji} ${t("quiz.onLevel", { name: U.esc(this.L(lv.name)) })}</div>
        <h2 class="quiz-h">${t("quiz.resultTitle")}</h2>
        <div class="quiz-bigscore">${s} / ${n}</div>
        <p class="quiz-intro">${U.esc(this.L(this.msg))}</p>
        <p class="quiz-intro small">${t("quiz.bestStreak")}: <b>${this.best}</b> 🔥</p>
        <div class="quiz-actions">
          ${nextBtn}
          <button class="btn quiz-ghost" id="quiz-again-btn">${t("quiz.again")}</button>
          <button class="btn quiz-ghost" id="quiz-levels-btn">${t("quiz.backToLevels")}</button>
        </div>
      </div>`;
    if (nextBtn) U.el("quiz-nextlvl-btn").addEventListener("click", () => this.begin(this.level+1));
    U.el("quiz-again-btn").addEventListener("click", () => this.begin(this.level));
    U.el("quiz-levels-btn").addEventListener("click", () => this.paintStart());
  }
};

window.Quiz = Quiz;
