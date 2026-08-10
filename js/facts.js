/* =============================================================================
   facts.js  —  a rotating "did you know" banner.
   Real, substantive astronomy — written for someone who already knows the basics.
   ============================================================================= */

const FACTS = [
  "A <b>neutron star</b> packs more mass than the Sun into a sphere the size of a city. A sugar-cube of its material would weigh about a billion tonnes on Earth.",
  "The <b>Andromeda Galaxy</b> is blueshifted — it's falling toward us at ~110 km/s and will merge with the Milky Way in roughly 4.5 billion years.",
  "Light from the Sun takes <b>8 minutes 20 seconds</b> to reach us, but a photon born in the Sun's core can take over 100,000 years to random-walk its way to the surface first.",
  "<b>Saturn's</b> average density is less than water's. If you had a bathtub big enough, Saturn would float.",
  "A <b>black hole's</b> event horizon isn't a solid surface — it's the distance where the escape velocity equals the speed of light. Nothing special happens there locally… until the tidal forces get you.",
  "The cosmic microwave background is the <b>oldest light in the universe</b> — released 380,000 years after the Big Bang. Some of the static on an old analog TV was literally this radiation.",
  "<b>Betelgeuse</b> is so large that if it replaced the Sun, its surface would extend past the orbit of Mars. It may go supernova any time in the next ~100,000 years.",
  "There are more <b>stars in the observable universe</b> (~10²³) than grains of sand on all of Earth's beaches.",
  "<b>Venus</b> spins backwards and so slowly that its day (243 Earth days) is longer than its year (225 days).",
  "The <b>Voyager 1</b> probe, launched in 1977, is now in interstellar space over 24 billion km away — its radio signal takes more than 22 hours to reach us.",
  "A <b>teaspoon of the Sun's core</b> would release energy like a nuclear bomb — yet the Sun's power output per cubic metre is actually less than a compost heap. It's just enormous.",
  "<b>Jupiter's</b> Great Red Spot is a storm wider than Earth that has raged for at least 350 years — though it's been shrinking in recent decades.",
  "Because the universe is expanding, there are galaxies whose light will <b>never reach us</b> — they're receding faster than light can close the gap.",
  "The <b>Boötes Void</b> is a region of space ~330 million light-years across with almost no galaxies. If the Milky Way were in its centre, we wouldn't have known other galaxies existed until the 1960s.",
  "<b>Neutron star mergers</b> forge much of the universe's gold and platinum. The gold in your jewellery was likely made in a collision of dead stars.",
  "One day on <b>Mercury</b> (sunrise to sunrise) lasts 176 Earth days — two of its years.",
  "The <b>Sun</b> loses about 4 million tonnes of mass every second, converting it to energy via E=mc². It's done this for 4.6 billion years and is barely halfway through its life.",
  "<b>Olympus Mons</b> on Mars is the tallest known volcano — about 22 km high, nearly three times the height of Everest, with a base the size of Arizona.",
  "The <b>Milky Way</b> and everything in it is racing at ~600 km/s toward a region called the Great Attractor, for reasons still not fully understood.",
  "A <b>pulsar</b> can spin hundreds of times per second, sweeping beams of radiation across space with clock-like precision — some are more accurate timekeepers than atomic clocks.",
  "Space is not completely empty: the <b>interstellar medium</b> holds about one atom per cubic centimetre, and even the emptiest voids glow faintly with the afterglow of creation.",
  "<b>Titan</b>, Saturn's largest moon, has lakes and rivers — but of liquid methane and ethane, under a thick orange nitrogen atmosphere.",
  "If you could fold a piece of paper <b>103 times</b>, its thickness would exceed the diameter of the observable universe (each fold doubles the thickness).",
  "The <b>Andromeda–Milky Way collision</b> will barely disturb any individual star — galaxies are mostly empty space, so stars almost never hit each other.",
  "<b>Sagittarius A*</b>, the black hole at the Milky Way's centre, has 4 million times the Sun's mass — yet its 'shadow' first imaged in 2022 appears smaller than a doughnut on the Moon would from Earth.",
  "The <b>coldest known place</b> in the universe isn't deep space — it's the Boomerang Nebula at about 1 kelvin, colder than the cosmic background, chilled by its own rapidly expanding gas.",
  "<b>Exoplanet HD 189733b</b> has winds of 8,700 km/h and it likely rains molten glass — sideways.",
  "The universe's <b>expansion is accelerating</b>, driven by dark energy, which makes up ~68% of everything — and we still don't know what it is.",
];

const Facts = {
  order: [],
  i: 0,
  init() {
    this.order = FACTS.map((_, i) => i);
    for (let i = this.order.length - 1; i > 0; i--) {   // shuffle
      const j = Math.floor(Math.random() * (i + 1));
      [this.order[i], this.order[j]] = [this.order[j], this.order[i]];
    }
    this.show();
    U.el("fact-next").addEventListener("click", () => this.next());
    setInterval(() => this.next(), 22000);
  },
  show() {
    const el = U.el("fact-text");
    el.style.opacity = 0;
    setTimeout(() => { el.innerHTML = FACTS[this.order[this.i]]; el.style.opacity = 1; }, 180);
  },
  next() { this.i = (this.i + 1) % this.order.length; this.show(); }
};

window.Facts = Facts;
