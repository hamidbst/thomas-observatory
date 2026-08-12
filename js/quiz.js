/* =============================================================================
   quiz.js  —  the Astronomy Challenge (bilingual)
   A bank of stable, real-astronomy multiple-choice questions. Each round is 10
   random questions with instant feedback, an explanation, score, and streaks.
   ============================================================================= */

const QUIZ_CATS = {
  solar:   { en: "Solar System", fr: "Système solaire", color: "#e8c48c" },
  deep:    { en: "Deep Space",   fr: "Ciel profond",    color: "#b98cff" },
  phys:    { en: "Physics",      fr: "Physique",         color: "#7db4ff" },
  stars:   { en: "Stars",        fr: "Étoiles",          color: "#ffcf6b" },
  explore: { en: "Exploration",  fr: "Exploration",      color: "#6ee7a8" },
};

const QUIZ_BANK = [
  { cat:"solar", answer:0,
    q:{en:"Which is the largest planet in the Solar System?", fr:"Quelle est la plus grande planète du Système solaire ?"},
    choices:{en:["Jupiter","Saturn","Neptune","Earth"], fr:["Jupiter","Saturne","Neptune","la Terre"]},
    exp:{en:"Jupiter — you could fit more than 1,300 Earths inside it.", fr:"Jupiter — on pourrait y loger plus de 1 300 Terres."}},

  { cat:"solar", answer:0,
    q:{en:"Which planet rotates on its side, tilted about 98°?", fr:"Quelle planète tourne couchée sur le côté, inclinée d'environ 98° ?"},
    choices:{en:["Uranus","Venus","Mars","Saturn"], fr:["Uranus","Vénus","Mars","Saturne"]},
    exp:{en:"Uranus — probably knocked over by a giant impact long ago.", fr:"Uranus — sans doute renversée par un impact géant il y a longtemps."}},

  { cat:"solar", answer:0,
    q:{en:"On Venus, which lasts longer?", fr:"Sur Vénus, qu'est-ce qui dure le plus longtemps ?"},
    choices:{en:["A day","A year","They're equal","It depends on the season"], fr:["Un jour","Une année","Les deux sont égaux","Cela dépend de la saison"]},
    exp:{en:"A Venus day (243 Earth days) is longer than its year (225 days).", fr:"Un jour vénusien (243 jours terrestres) est plus long que son année (225 jours)."}},

  { cat:"solar", answer:0,
    q:{en:"Which is the hottest planet in the Solar System?", fr:"Quelle est la planète la plus chaude du Système solaire ?"},
    choices:{en:["Venus","Mercury","Mars","Jupiter"], fr:["Vénus","Mercure","Mars","Jupiter"]},
    exp:{en:"Venus (~465°C) — its thick CO₂ atmosphere traps heat, so it's even hotter than Mercury.", fr:"Vénus (~465 °C) — son épaisse atmosphère de CO₂ piège la chaleur, la rendant plus chaude que Mercure."}},

  { cat:"solar", answer:0,
    q:{en:"The Great Red Spot is a giant storm on which planet?", fr:"La Grande Tache Rouge est une tempête géante sur quelle planète ?"},
    choices:{en:["Jupiter","Saturn","Mars","Neptune"], fr:["Jupiter","Saturne","Mars","Neptune"]},
    exp:{en:"Jupiter — a storm wider than Earth that has raged for centuries.", fr:"Jupiter — une tempête plus large que la Terre qui dure depuis des siècles."}},

  { cat:"solar", answer:0,
    q:{en:"What are Saturn's rings mostly made of?", fr:"De quoi sont surtout faits les anneaux de Saturne ?"},
    choices:{en:["Ice and rock","Gas","Solid metal","Only dust"], fr:["De glace et de roche","De gaz","De métal solide","De poussière seulement"]},
    exp:{en:"Countless chunks of ice and rock, from grains to house-sized boulders.", fr:"D'innombrables morceaux de glace et de roche, du grain au bloc gros comme une maison."}},

  { cat:"phys", answer:0,
    q:{en:"Once something passes a black hole's ___, it can never escape.", fr:"Une fois franchi le/la ___ d'un trou noir, rien ne peut s'échapper."},
    choices:{en:["event horizon","photosphere","corona","accretion disk"], fr:["horizon des événements","photosphère","couronne","disque d'accrétion"]},
    exp:{en:"The event horizon is the point of no return, where escape would need faster-than-light speed.", fr:"L'horizon des événements est le point de non-retour, où s'échapper exigerait de dépasser la vitesse de la lumière."}},

  { cat:"phys", answer:0,
    q:{en:"About how long does sunlight take to reach Earth?", fr:"Combien de temps met la lumière du Soleil pour atteindre la Terre ?"},
    choices:{en:["8 minutes","8 seconds","8 hours","1 year"], fr:["8 minutes","8 secondes","8 heures","1 an"]},
    exp:{en:"About 8 minutes 20 seconds across ~150 million km.", fr:"Environ 8 minutes 20 secondes sur ~150 millions de km."}},

  { cat:"phys", answer:0,
    q:{en:"The speed of light is closest to…", fr:"La vitesse de la lumière est proche de…"},
    choices:{en:["300,000 km/s","300 km/s","3,000 km/s","30 million km/s"], fr:["300 000 km/s","300 km/s","3 000 km/s","30 millions de km/s"]},
    exp:{en:"About 299,792 km/s — the cosmic speed limit.", fr:"Environ 299 792 km/s — la limite de vitesse de l'univers."}},

  { cat:"phys", answer:0,
    q:{en:"Why do we always see the same side of the Moon?", fr:"Pourquoi voyons-nous toujours la même face de la Lune ?"},
    choices:{en:["It's tidally locked — it spins once per orbit","It doesn't rotate at all","Earth's shadow hides the far side","It's too far to see the other side"], fr:["Elle est en rotation synchrone — un tour sur elle-même par orbite","Elle ne tourne pas du tout","L'ombre de la Terre cache l'autre face","Elle est trop loin pour voir l'autre côté"]},
    exp:{en:"Tidal locking: the Moon rotates exactly once for each orbit of Earth.", fr:"Rotation synchrone : la Lune tourne exactement une fois sur elle-même par orbite autour de la Terre."}},

  { cat:"phys", answer:0,
    q:{en:"What keeps planets in orbit around the Sun?", fr:"Qu'est-ce qui maintient les planètes en orbite autour du Soleil ?"},
    choices:{en:["Gravity","Magnetism","The solar wind","Friction"], fr:["La gravité","Le magnétisme","Le vent solaire","Le frottement"]},
    exp:{en:"The Sun's gravity curves their paths into orbits.", fr:"La gravité du Soleil courbe leur trajectoire en orbites."}},

  { cat:"stars", answer:0,
    q:{en:"What will the Sun become at the end of its life?", fr:"Que deviendra le Soleil à la fin de sa vie ?"},
    choices:{en:["A white dwarf","A black hole","A neutron star","A supernova"], fr:["Une naine blanche","Un trou noir","Une étoile à neutrons","Une supernova"]},
    exp:{en:"It's too light for a black hole — it will shed its outer layers and leave a white dwarf.", fr:"Trop léger pour un trou noir — il expulsera ses couches externes et laissera une naine blanche."}},

  { cat:"stars", answer:0,
    q:{en:"What is the brightest star in Earth's night sky?", fr:"Quelle est l'étoile la plus brillante du ciel nocturne ?"},
    choices:{en:["Sirius","Polaris","Betelgeuse","Vega"], fr:["Sirius","l'Étoile Polaire","Bételgeuse","Véga"]},
    exp:{en:"Sirius, in Canis Major, at magnitude −1.46.", fr:"Sirius, dans le Grand Chien, de magnitude −1,46."}},

  { cat:"stars", answer:1,
    q:{en:"Why is Polaris, the North Star, so useful?", fr:"Pourquoi l'Étoile Polaire est-elle si utile ?"},
    choices:{en:["It's the brightest star","It sits almost above Earth's north pole","It's the closest star","It's the largest star"], fr:["C'est l'étoile la plus brillante","Elle est presque au-dessus du pôle nord terrestre","C'est l'étoile la plus proche","C'est la plus grande étoile"]},
    exp:{en:"It lies near the north celestial pole, so it barely moves and points north.", fr:"Elle est proche du pôle céleste nord : elle bouge à peine et indique le nord."}},

  { cat:"stars", answer:0,
    q:{en:"Betelgeuse is a red…", fr:"Bételgeuse est une… rouge."},
    choices:{en:["supergiant","dwarf","neutron star","planet"], fr:["supergéante","naine","étoile à neutrons","planète"]},
    exp:{en:"A red supergiant so big it would swallow Mars' orbit — and a future supernova.", fr:"Une supergéante rouge si grande qu'elle engloutirait l'orbite de Mars — et une future supernova."}},

  { cat:"deep", answer:0,
    q:{en:"What is the closest large spiral galaxy to the Milky Way?", fr:"Quelle est la grande galaxie spirale la plus proche de la Voie lactée ?"},
    choices:{en:["Andromeda","Triangulum","Whirlpool","Sombrero"], fr:["Andromède","le Triangle","le Tourbillon","le Sombrero"]},
    exp:{en:"Andromeda (M31), ~2.5 million light-years away and heading toward us.", fr:"Andromède (M31), à ~2,5 millions d'années-lumière et fonçant vers nous."}},

  { cat:"deep", answer:0,
    q:{en:"A light-year measures…", fr:"Une année-lumière mesure…"},
    choices:{en:["distance","time","brightness","mass"], fr:["une distance","un temps","un éclat","une masse"]},
    exp:{en:"The distance light travels in one year — about 9.46 trillion km.", fr:"La distance parcourue par la lumière en un an — environ 9 460 milliards de km."}},

  { cat:"deep", answer:0,
    q:{en:"A supernova is…", fr:"Une supernova, c'est…"},
    choices:{en:["the explosive death of a massive star","the birth of a planet","a type of comet","a solar flare"], fr:["la mort explosive d'une étoile massive","la naissance d'une planète","un type de comète","une éruption solaire"]},
    exp:{en:"A massive star collapsing and exploding — briefly outshining a whole galaxy.", fr:"Une étoile massive qui s'effondre et explose — surpassant brièvement une galaxie entière."}},

  { cat:"deep", answer:0,
    q:{en:"What is a nebula?", fr:"Qu'est-ce qu'une nébuleuse ?"},
    choices:{en:["A cloud of gas and dust where stars can form","A dead star","A giant planet","A cluster of black holes"], fr:["Un nuage de gaz et de poussière où des étoiles peuvent naître","Une étoile morte","Une planète géante","Un amas de trous noirs"]},
    exp:{en:"Many nebulae are stellar nurseries — like the Orion Nebula.", fr:"Beaucoup de nébuleuses sont des pouponnières d'étoiles — comme la nébuleuse d'Orion."}},

  { cat:"deep", answer:0,
    q:{en:"Our Sun belongs to which galaxy?", fr:"Notre Soleil appartient à quelle galaxie ?"},
    choices:{en:["The Milky Way","Andromeda","The Large Magellanic Cloud","Centaurus A"], fr:["la Voie lactée","Andromède","le Grand Nuage de Magellan","Centaurus A"]},
    exp:{en:"The Milky Way, a barred spiral of a few hundred billion stars.", fr:"La Voie lactée, une spirale barrée de quelques centaines de milliards d'étoiles."}},

  { cat:"explore", answer:0,
    q:{en:"Who was the first person to walk on the Moon?", fr:"Qui fut la première personne à marcher sur la Lune ?"},
    choices:{en:["Neil Armstrong","Buzz Aldrin","Yuri Gagarin","Michael Collins"], fr:["Neil Armstrong","Buzz Aldrin","Youri Gagarine","Michael Collins"]},
    exp:{en:"Neil Armstrong, Apollo 11, July 1969.", fr:"Neil Armstrong, Apollo 11, juillet 1969."}},

  { cat:"explore", answer:0,
    q:{en:"The James Webb Space Telescope (launched 2021) mainly observes in…", fr:"Le télescope spatial James Webb (lancé en 2021) observe surtout dans…"},
    choices:{en:["infrared light","X-rays","radio waves","ultraviolet light"], fr:["l'infrarouge","les rayons X","les ondes radio","l'ultraviolet"]},
    exp:{en:"Infrared — it can see through dust and detect the earliest, most distant galaxies.", fr:"L'infrarouge — il voit à travers la poussière et détecte les galaxies les plus anciennes et lointaines."}},

  { cat:"explore", answer:2,
    q:{en:"What is the International Space Station?", fr:"Qu'est-ce que la Station Spatiale Internationale ?"},
    choices:{en:["A telescope on the Moon","A satellite around the Sun","A crewed laboratory orbiting Earth","A probe near Mars"], fr:["Un télescope sur la Lune","Un satellite autour du Soleil","Un laboratoire habité en orbite autour de la Terre","Une sonde près de Mars"]},
    exp:{en:"A crewed lab ~420 km up, circling Earth about every 90 minutes.", fr:"Un laboratoire habité à ~420 km, faisant le tour de la Terre en ~90 minutes."}},

  { cat:"explore", answer:1,
    q:{en:"Which spacecraft is the most distant human-made object from Earth?", fr:"Quel engin est l'objet fabriqué par l'humain le plus éloigné de la Terre ?"},
    choices:{en:["Cassini","Voyager 1","Hubble","New Horizons"], fr:["Cassini","Voyager 1","Hubble","New Horizons"]},
    exp:{en:"Voyager 1, launched 1977, is now in interstellar space over 24 billion km away.", fr:"Voyager 1, lancée en 1977, est dans l'espace interstellaire à plus de 24 milliards de km."}},
];

const Quiz = {
  view: "start",           // "start" | "question" | "result"
  round: [], idx: 0, score: 0, streak: 0, best: 0, answered: false, chosen: null,
  started: false,

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

  paintStart() {
    this.view = "start";
    this.host().innerHTML = `
      <div class="quiz-card quiz-center">
        <div class="quiz-logo">🧠</div>
        <h2 class="quiz-h">${t("quiz.title")}</h2>
        <p class="quiz-intro">${t("quiz.intro")}</p>
        <button class="btn quiz-start" id="quiz-start-btn">${t("quiz.start")}</button>
      </div>`;
    U.el("quiz-start-btn").addEventListener("click", () => this.begin());
  },

  begin() {
    const pool = [...QUIZ_BANK];
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
    this.round = pool.slice(0, 10);
    this.idx = 0; this.score = 0; this.streak = 0; this.best = 0; this.answered = false; this.chosen = null;
    this.view = "question";
    this.paintQuestion();
  },

  paintQuestion() {
    this.view = "question";
    const q = this.round[this.idx];
    const cat = QUIZ_CATS[q.cat];
    const choices = this.L(q.choices);
    this.host().innerHTML = `
      <div class="quiz-card">
        <div class="quiz-top">
          <span class="quiz-cat" style="--cc:${cat.color}">${this.L(cat)}</span>
          <span class="quiz-progress">${t("quiz.question")} ${this.idx+1} ${t("quiz.of")} ${this.round.length}</span>
        </div>
        <div class="quiz-scores">
          <span>${t("quiz.score")}: <b>${this.score}</b></span>
          <span>${t("quiz.streak")}: <b>${this.streak}</b> 🔥</span>
        </div>
        <div class="quiz-q">${U.esc(this.L(q.q))}</div>
        <div class="quiz-choices" id="quiz-choices">
          ${choices.map((c,i)=>`<button class="quiz-choice" data-i="${i}">${U.esc(c)}</button>`).join("")}
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>`;
    document.querySelectorAll(".quiz-choice").forEach(b =>
      b.addEventListener("click", () => this.answer(parseInt(b.dataset.i,10))));
    if (this.answered) this.reveal();   // restore feedback after a re-render (e.g. language switch)
  },

  answer(i) {
    if (this.answered) return;
    this.answered = true;
    this.chosen = i;
    const q = this.round[this.idx];
    const correct = i === q.answer;
    if (correct) { this.score++; this.streak++; if (this.streak > this.best) this.best = this.streak; }
    else { this.streak = 0; }
    this.reveal();
  },

  // Idempotent: shows the locked choices + explanation for the already-answered question.
  reveal() {
    const q = this.round[this.idx];
    const correct = this.chosen === q.answer;
    document.querySelectorAll(".quiz-choice").forEach(b => {
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
    if (this.idx === this.round.length - 1) { this.view = "result"; return this.paintResult(); }
    this.idx++; this.answered = false; this.chosen = null; this.paintQuestion();
  },

  paintResult() {
    this.view = "result";
    const n = this.round.length, s = this.score;
    let msg;
    if (s === n) msg = t("quiz.r_perfect");
    else if (s >= n*0.8) msg = t("quiz.r_great");
    else if (s >= n*0.5) msg = t("quiz.r_good");
    else msg = t("quiz.r_ok");
    this.host().innerHTML = `
      <div class="quiz-card quiz-center">
        <div class="quiz-logo">${s===n?"🏆":s>=n*0.5?"🌟":"🔭"}</div>
        <h2 class="quiz-h">${t("quiz.resultTitle")}</h2>
        <div class="quiz-bigscore">${s} / ${n}</div>
        <p class="quiz-intro">${msg}</p>
        <p class="quiz-intro small">${t("quiz.bestStreak")}: <b>${this.best}</b> 🔥</p>
        <div class="quiz-actions">
          <button class="btn quiz-start" id="quiz-again-btn">${t("quiz.again")}</button>
        </div>
      </div>`;
    U.el("quiz-again-btn").addEventListener("click", () => this.begin());
  }
};

window.Quiz = Quiz;
