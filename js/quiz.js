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
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
    this.round = pool.slice(0, 10);
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
