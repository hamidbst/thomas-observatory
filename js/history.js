/* =============================================================================
   history.js  —  "The Story of Astronomy"
   A big-picture timeline of how human understanding of the cosmos changed, in
   stages. Layer 1 = era + one-line big idea (always shown). Layer 2 = a deeper
   paragraph you can expand. Bilingual (en / fr).
   Module is named `Timeline` to avoid clobbering the built-in window.History.
   ============================================================================= */

const HISTORY = [
  { emoji:"🌅", color:"#ffcf6b",
    when:{en:"Thousands of years ago", fr:"Il y a des milliers d'années"},
    era:{en:"The first sky-watchers", fr:"Les premiers observateurs du ciel"},
    headline:{en:"People watched the Sun, Moon and stars to keep time and find their way.", fr:"Les peuples observaient le Soleil, la Lune et les étoiles pour mesurer le temps et s'orienter."},
    detail:{en:"Long before telescopes, ancient cultures across the world tracked the sky. They built stone monuments and calendars around the Sun and Moon, named patterns of stars, and wove the sky into their myths and farming. Many imagined the sky as a giant dome turning over a flat Earth.", fr:"Bien avant les télescopes, des cultures anciennes du monde entier suivaient le ciel. Elles bâtissaient des monuments de pierre et des calendriers réglés sur le Soleil et la Lune, nommaient des figures d'étoiles, et tissaient le ciel dans leurs mythes et l'agriculture. Beaucoup imaginaient le ciel comme un immense dôme tournant au-dessus d'une Terre plate."} },

  { emoji:"🌍", color:"#6ee7a8",
    when:{en:"~350 BCE – 150 CE · Ancient Greece", fr:"~350 av. J.-C. – 150 apr. J.-C. · Grèce antique"},
    era:{en:"Earth at the centre", fr:"La Terre au centre"},
    headline:{en:"Great thinkers placed a still Earth at the centre, with everything circling around it.", fr:"De grands penseurs placèrent une Terre immobile au centre, tout tournant autour."},
    detail:{en:"Greek philosophers like Aristotle argued the Earth stood still at the centre of everything, wrapped in spinning crystal spheres carrying the Sun, Moon, planets and stars. Around 150 CE, Ptolemy turned this 'geocentric' picture into a detailed system that could predict where the planets would appear. It felt obvious — the ground doesn't seem to move — and it was believed for over 1,400 years.", fr:"Des philosophes grecs comme Aristote soutenaient que la Terre restait immobile au centre de tout, entourée de sphères de cristal tournantes portant le Soleil, la Lune, les planètes et les étoiles. Vers 150 apr. J.-C., Ptolémée transforma cette image « géocentrique » en un système détaillé capable de prédire la position des planètes. Cela semblait évident — le sol ne paraît pas bouger — et on y crut pendant plus de 1 400 ans."} },

  { emoji:"☀️", color:"#ffd66b",
    when:{en:"1543 · Copernicus", fr:"1543 · Copernic"},
    era:{en:"The Sun takes centre stage", fr:"Le Soleil au centre"},
    headline:{en:"Copernicus dared to say the Earth moves — around the Sun.", fr:"Copernic osa dire que la Terre bouge — autour du Soleil."},
    detail:{en:"A Polish astronomer named Nicolaus Copernicus suggested a bold new idea: the Sun, not the Earth, sits at the centre, and the Earth is just one of the planets circling it. This 'heliocentric' model was simpler and explained the strange loops planets seemed to make. It was so revolutionary that his book was published only as he lay dying — and it slowly changed how humans saw their place in the cosmos.", fr:"Un astronome polonais, Nicolas Copernic, proposa une idée audacieuse : le Soleil, et non la Terre, occupe le centre, et la Terre n'est qu'une planète parmi d'autres qui l'entourent. Ce modèle « héliocentrique » était plus simple et expliquait les boucles étranges que semblaient tracer les planètes. Si révolutionnaire que son livre ne parut qu'à sa mort — il changea peu à peu la façon dont les humains voyaient leur place dans le cosmos."} },

  { emoji:"🔭", color:"#7db4ff",
    when:{en:"Early 1600s · Galileo & Kepler", fr:"Début des années 1600 · Galilée et Kepler"},
    era:{en:"A closer look", fr:"Un regard plus proche"},
    headline:{en:"The first telescopes revealed a sky nothing like people had imagined.", fr:"Les premiers télescopes révélèrent un ciel bien différent de ce qu'on imaginait."},
    detail:{en:"In 1609 Galileo pointed a new invention — the telescope — at the sky and made astonishing discoveries: mountains and craters on the Moon, four moons circling Jupiter, and the phases of Venus. These were clear signs that not everything orbits the Earth. Around the same time, Johannes Kepler worked out that planets move in stretched circles called ellipses, not perfect circles — finally matching the real motions in the sky.", fr:"En 1609, Galilée pointa une invention nouvelle — la lunette — vers le ciel et fit des découvertes stupéfiantes : des montagnes et des cratères sur la Lune, quatre lunes autour de Jupiter, et les phases de Vénus. C'étaient des signes clairs que tout ne tourne pas autour de la Terre. À la même époque, Johannes Kepler découvrit que les planètes se déplacent sur des cercles étirés, les ellipses, et non des cercles parfaits — épousant enfin les mouvements réels du ciel."} },

  { emoji:"🍎", color:"#ff6b81",
    when:{en:"1687 · Newton", fr:"1687 · Newton"},
    era:{en:"The law of gravity", fr:"La loi de la gravité"},
    headline:{en:"Newton showed one force — gravity — rules both falling apples and orbiting planets.", fr:"Newton montra qu'une seule force — la gravité — régit la chute des pommes et l'orbite des planètes."},
    detail:{en:"Isaac Newton discovered that the same force pulling an apple to the ground also holds the Moon in orbit and keeps the planets circling the Sun. With his law of gravity and laws of motion, the whole Solar System could be explained by a single, simple set of rules — and predicted with astonishing accuracy. For the first time, the heavens and the Earth obeyed the very same physics.", fr:"Isaac Newton découvrit que la force qui attire une pomme vers le sol retient aussi la Lune en orbite et fait tourner les planètes autour du Soleil. Avec sa loi de la gravité et ses lois du mouvement, tout le système solaire s'expliquait par un ensemble de règles simples — et se prédisait avec une précision stupéfiante. Pour la première fois, le ciel et la Terre obéissaient à la même physique."} },

  { emoji:"🌌", color:"#b98cff",
    when:{en:"1920s · Edwin Hubble", fr:"Années 1920 · Edwin Hubble"},
    era:{en:"A universe of galaxies", fr:"Un univers de galaxies"},
    headline:{en:"Those faint smudges in the sky turned out to be whole other galaxies.", fr:"Ces taches floues dans le ciel se révélèrent être d'autres galaxies entières."},
    detail:{en:"For a long time people thought the Milky Way was the entire universe. In the 1920s, Edwin Hubble proved that faint fuzzy 'nebulae' were actually separate galaxies, unimaginably far away — the universe was suddenly billions of times bigger. He also found that galaxies are rushing apart: the universe is expanding. That was the clue that it once had a beginning.", fr:"Longtemps, on crut que la Voie lactée était tout l'univers. Dans les années 1920, Edwin Hubble prouva que de faibles « nébuleuses » floues étaient en fait des galaxies séparées, incroyablement lointaines — l'univers devint soudain des milliards de fois plus grand. Il découvrit aussi que les galaxies s'éloignent les unes des autres : l'univers est en expansion. C'était l'indice qu'il avait eu un commencement."} },

  { emoji:"💥", color:"#ff9e6b",
    when:{en:"Mid–late 1900s", fr:"Milieu–fin du XXᵉ siècle"},
    era:{en:"The Big Bang", fr:"Le Big Bang"},
    headline:{en:"Rewinding the expanding universe led back to a hot, dense beginning.", fr:"Rembobiner l'univers en expansion ramène à un début chaud et dense."},
    detail:{en:"If galaxies are flying apart today, then long ago everything must have been packed together. Scientists traced the expansion back about 13.8 billion years to a hot, dense start — the Big Bang. In 1965 they even detected its faint leftover heat, the cosmic microwave background, glowing all across the sky. It was powerful evidence that the universe truly had a beginning and has been growing and cooling ever since.", fr:"Si les galaxies s'écartent aujourd'hui, alors autrefois tout devait être serré. Les scientifiques ont remonté l'expansion sur environ 13,8 milliards d'années jusqu'à un début chaud et dense — le Big Bang. En 1965, ils détectèrent même sa faible chaleur résiduelle, le fond diffus cosmologique, qui brille dans tout le ciel. Preuve puissante que l'univers a bien eu un commencement et n'a cessé de grandir et de refroidir depuis."} },

  { emoji:"🚀", color:"#7db4ff",
    when:{en:"1957 – today", fr:"1957 – aujourd'hui"},
    era:{en:"The space age — new eyes on the cosmos", fr:"L'ère spatiale — de nouveaux yeux sur le cosmos"},
    headline:{en:"We began leaving Earth and building telescopes that see almost to the dawn of time.", fr:"Nous avons quitté la Terre et bâti des télescopes qui voient presque jusqu'à l'aube du temps."},
    detail:{en:"Since the first satellite in 1957, humans have walked on the Moon, sent robots across the Solar System, and lived in orbit on the Space Station. Great telescopes like Hubble and James Webb capture breathtaking views of distant galaxies, while new tools let us detect ripples in spacetime (gravitational waves) and even take the first photo of a black hole in 2019. The story is still being written — and you're part of it.", fr:"Depuis le premier satellite en 1957, des humains ont marché sur la Lune, envoyé des robots à travers le système solaire et vécu en orbite dans la station spatiale. De grands télescopes comme Hubble et James Webb saisissent des vues à couper le souffle de galaxies lointaines, tandis que de nouveaux instruments détectent des ondulations de l'espace-temps (les ondes gravitationnelles) et ont même pris la première photo d'un trou noir en 2019. L'histoire s'écrit encore — et tu en fais partie."} },
];

const Timeline = {
  started: false, open: new Set(),

  enter() {
    if (!this.started) { this.started = true; document.addEventListener("language-changed", () => this.render()); }
    this.render();
  },
  L(o) { const l = (window.I18N && I18N.lang) || "en"; return (o[l] != null) ? o[l] : o.en; },

  render() {
    const items = HISTORY.map((s, i) => `
      <div class="tl-item ${this.open.has(i) ? "open" : ""}" data-i="${i}" style="--c:${s.color}">
        <div class="tl-dot">${s.emoji}</div>
        <button class="tl-head">
          <div class="tl-when">${U.esc(this.L(s.when))}</div>
          <div class="tl-era">${U.esc(this.L(s.era))} <span class="tl-caret">▾</span></div>
          <div class="tl-headline">${U.esc(this.L(s.headline))}</div>
        </button>
        <div class="tl-detail"><p>${U.esc(this.L(s.detail))}</p></div>
      </div>`).join("");
    U.el("history-app").innerHTML = `
      <div class="panel">
        <div class="section-title">📜 ${t("history.title")}</div>
        <p class="small muted" style="margin:2px 0 20px;">${t("history.intro")}</p>
        <div class="timeline">${items}</div>
      </div>`;
    U.el("history-app").querySelectorAll(".tl-item").forEach(el =>
      el.querySelector(".tl-head").addEventListener("click", () => {
        const i = parseInt(el.dataset.i, 10);
        this.open.has(i) ? this.open.delete(i) : this.open.add(i);
        this.render();
      }));
  }
};

window.Timeline = Timeline;
