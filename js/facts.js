/* =============================================================================
   facts.js  —  a rotating "did you know" banner (English + French).
   Real, substantive astronomy — written for someone who already knows the basics.
   The two arrays are parallel: index i is the same fact in each language.
   ============================================================================= */

const FACTS_EN = [
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

const FACTS_FR = [
  "Une <b>étoile à neutrons</b> concentre plus de masse que le Soleil dans une sphère de la taille d'une ville. Un sucre de cette matière pèserait environ un milliard de tonnes sur Terre.",
  "La <b>galaxie d'Andromède</b> est décalée vers le bleu — elle fonce vers nous à ~110 km/s et fusionnera avec la Voie lactée dans environ 4,5 milliards d'années.",
  "La lumière du Soleil met <b>8 minutes 20 secondes</b> pour nous atteindre, mais un photon né dans le cœur du Soleil peut mettre plus de 100 000 ans à rejoindre la surface en zigzaguant.",
  "La densité moyenne de <b>Saturne</b> est inférieure à celle de l'eau. Avec une baignoire assez grande, Saturne flotterait.",
  "L'horizon des événements d'un <b>trou noir</b> n'est pas une surface solide — c'est la distance où la vitesse de libération égale celle de la lumière. Rien de spécial ne s'y passe localement… jusqu'à ce que les forces de marée t'attrapent.",
  "Le fond diffus cosmologique est la <b>plus vieille lumière de l'univers</b> — émise 380 000 ans après le Big Bang. Une partie de la neige d'une vieille télé analogique était littéralement ce rayonnement.",
  "<b>Bételgeuse</b> est si grande que, si elle remplaçait le Soleil, sa surface dépasserait l'orbite de Mars. Elle pourrait exploser en supernova à tout moment dans les ~100 000 prochaines années.",
  "Il y a plus d'<b>étoiles dans l'univers observable</b> (~10²³) que de grains de sable sur toutes les plages de la Terre.",
  "<b>Vénus</b> tourne à l'envers et si lentement que son jour (243 jours terrestres) est plus long que son année (225 jours).",
  "La sonde <b>Voyager 1</b>, lancée en 1977, est maintenant dans l'espace interstellaire à plus de 24 milliards de km — son signal radio met plus de 22 heures à nous parvenir.",
  "Une <b>cuillère du cœur du Soleil</b> libérerait l'énergie d'une bombe nucléaire — pourtant la puissance du Soleil par mètre cube est inférieure à celle d'un tas de compost. Il est juste immense.",
  "La Grande Tache Rouge de <b>Jupiter</b> est une tempête plus large que la Terre qui dure depuis au moins 350 ans — même si elle rétrécit ces dernières décennies.",
  "Comme l'univers est en expansion, il existe des galaxies dont la lumière ne <b>nous atteindra jamais</b> — elles s'éloignent plus vite que la lumière ne peut combler l'écart.",
  "Le <b>Vide du Bouvier</b> est une région de ~330 millions d'années-lumière presque sans galaxies. Si la Voie lactée en occupait le centre, on n'aurait pas su que d'autres galaxies existaient avant les années 1960.",
  "Les <b>fusions d'étoiles à neutrons</b> forgent une grande partie de l'or et du platine de l'univers. L'or de tes bijoux est probablement né d'une collision d'étoiles mortes.",
  "Un jour sur <b>Mercure</b> (d'un lever de Soleil au suivant) dure 176 jours terrestres — deux de ses années.",
  "Le <b>Soleil</b> perd environ 4 millions de tonnes de masse chaque seconde, converties en énergie via E=mc². Il fait cela depuis 4,6 milliards d'années et n'est qu'à la moitié de sa vie.",
  "<b>Olympus Mons</b> sur Mars est le plus haut volcan connu — environ 22 km de haut, presque trois fois l'Everest, avec une base grande comme l'Arizona.",
  "La <b>Voie lactée</b> et tout ce qu'elle contient filent à ~600 km/s vers une région appelée le Grand Attracteur, pour des raisons encore mal comprises.",
  "Un <b>pulsar</b> peut tourner des centaines de fois par seconde, balayant l'espace de faisceaux avec une précision d'horloge — certains sont de meilleurs garde-temps que les horloges atomiques.",
  "L'espace n'est pas totalement vide : le <b>milieu interstellaire</b> contient environ un atome par centimètre cube, et même les vides les plus vides brillent faiblement de la lueur de la création.",
  "<b>Titan</b>, la plus grande lune de Saturne, a des lacs et des rivières — mais de méthane et d'éthane liquides, sous une épaisse atmosphère orange d'azote.",
  "Si tu pouvais plier une feuille de papier <b>103 fois</b>, son épaisseur dépasserait le diamètre de l'univers observable (chaque pli double l'épaisseur).",
  "La <b>collision Andromède–Voie lactée</b> ne perturbera presque aucune étoile — les galaxies sont surtout du vide, donc les étoiles ne se heurtent quasiment jamais.",
  "<b>Sagittarius A*</b>, le trou noir au centre de la Voie lactée, a 4 millions de fois la masse du Soleil — pourtant son « ombre », imagée en 2022, paraît plus petite qu'un beignet posé sur la Lune vu depuis la Terre.",
  "L'<b>endroit le plus froid connu</b> de l'univers n'est pas l'espace lointain — c'est la nébuleuse du Boomerang, à environ 1 kelvin, plus froide que le fond cosmique, refroidie par son propre gaz en expansion rapide.",
  "L'<b>exoplanète HD 189733b</b> a des vents de 8 700 km/h et il y pleut probablement du verre en fusion — à l'horizontale.",
  "L'<b>expansion de l'univers accélère</b>, poussée par l'énergie noire, qui représente ~68 % de tout — et on ignore encore ce que c'est.",
];

const FACTS_FA = [
  "یک <b>ستارهٔ نوترونی</b> جرمی بیش از خورشید را در گویی به اندازهٔ یک شهر جای می‌دهد. یک حبهٔ قند از مادهٔ آن روی زمین حدود یک میلیارد تن وزن دارد.",
  "<b>کهکشان آندرومدا</b> به‌سوی آبی جابه‌جا شده — با سرعت حدود ۱۱۰ کیلومتر بر ثانیه به‌سوی ما می‌آید و در حدود ۴٫۵ میلیارد سال دیگر با راه شیری ادغام می‌شود.",
  "نور خورشید <b>۸ دقیقه و ۲۰ ثانیه</b> طول می‌کشد تا به ما برسد، اما فوتونی که در هستهٔ خورشید زاده می‌شود ممکن است بیش از ۱۰۰٬۰۰۰ سال طول بکشد تا نخست به سطح برسد.",
  "چگالی میانگین <b>زحل</b> از آب کمتر است. اگر وانی به‌قدر کافی بزرگ داشتی، زحل روی آب شناور می‌ماند.",
  "افق رویداد یک <b>سیاه‌چاله</b> سطحی جامد نیست — فاصله‌ای است که در آن سرعت فرار برابر سرعت نور می‌شود. آنجا به‌طور موضعی اتفاق خاصی نمی‌افتد… تا وقتی نیروهای کِشندی تو را بگیرند.",
  "تابش زمینهٔ ریزموج کیهانی <b>قدیمی‌ترین نور جهان</b> است — ۳۸۰٬۰۰۰ سال پس از مهبانگ رها شد. بخشی از برفکِ تلویزیون‌های قدیمی آنالوگ دقیقاً همین تابش بود.",
  "<b>ابط‌الجوزا (بتلجوز)</b> آن‌قدر بزرگ است که اگر جای خورشید بود، سطحش تا فراتر از مدار مریخ می‌رسید. ممکن است هر زمانی در ۱۰۰٬۰۰۰ سال آینده ابرنواختر شود.",
  "در جهان قابل‌مشاهده <b>ستاره‌های بیشتری</b> (حدود ۱۰²³) هست تا دانه‌های شن روی همهٔ ساحل‌های زمین.",
  "<b>زهره</b> برعکس و چنان کند می‌چرخد که روزش (۲۴۳ روز زمینی) از سالش (۲۲۵ روز) بلندتر است.",
  "کاوشگر <b>وویجر ۱</b>، پرتاب‌شده در ۱۹۷۷، اکنون در فضای میان‌ستاره‌ای و بیش از ۲۴ میلیارد کیلومتر دور است — سیگنال رادیویی‌اش بیش از ۲۲ ساعت طول می‌کشد تا به ما برسد.",
  "یک <b>قاشق از هستهٔ خورشید</b> انرژی‌ای مثل یک بمب اتمی آزاد می‌کند — با این حال توان خورشید در هر مترمکعب کمتر از یک تودهٔ کمپوست است. فقط بسیار عظیم است.",
  "<b>لکهٔ سرخ بزرگ مشتری</b> توفانی پهن‌تر از زمین است که دست‌کم ۳۵۰ سال ادامه داشته — هرچند در دهه‌های اخیر کوچک‌تر شده.",
  "چون جهان در حال انبساط است، کهکشان‌هایی هستند که نورشان <b>هرگز به ما نمی‌رسد</b> — سریع‌تر از آنکه نور بتواند فاصله را پُر کند دور می‌شوند.",
  "<b>تهیگاه گاوران (بوتس)</b> ناحیه‌ای به پهنای حدود ۳۳۰ میلیون سال نوری است که تقریباً هیچ کهکشانی ندارد. اگر راه شیری در مرکز آن بود، تا دههٔ ۱۹۶۰ نمی‌دانستیم کهکشان‌های دیگری وجود دارند.",
  "<b>ادغام ستاره‌های نوترونی</b> بخش زیادی از طلا و پلاتین جهان را می‌سازد. طلای جواهرات تو احتمالاً در برخورد ستاره‌های مرده ساخته شده است.",
  "یک روز روی <b>عطارد</b> (از یک طلوع تا طلوع بعدی) ۱۷۶ روز زمینی طول می‌کشد — دو سالِ آن.",
  "<b>خورشید</b> هر ثانیه حدود ۴ میلیون تن جرم از دست می‌دهد و آن را با E=mc² به انرژی تبدیل می‌کند. ۴٫۶ میلیارد سال است این کار را می‌کند و تازه به میانهٔ عمرش رسیده.",
  "<b>الیمپوس مونس</b> روی مریخ بلندترین آتشفشان شناخته‌شده است — حدود ۲۲ کیلومتر بلندی، نزدیک به سه برابر اورست، با پایه‌ای به اندازهٔ آریزونا.",
  "<b>راه شیری</b> و هر چه در آن است با سرعت حدود ۶۰۰ کیلومتر بر ثانیه به‌سوی ناحیه‌ای به نام «جاذب بزرگ» می‌شتابند، به دلایلی که هنوز کاملاً روشن نیست.",
  "یک <b>تپ‌اختر (پالسار)</b> می‌تواند صدها بار در ثانیه بچرخد و پرتوهایش را با دقتی ساعت‌وار در فضا بروبد — برخی دقیق‌تر از ساعت‌های اتمی زمان نگه می‌دارند.",
  "فضا کاملاً خالی نیست: <b>محیط میان‌ستاره‌ای</b> حدود یک اتم در هر سانتی‌متر مکعب دارد، و حتی خالی‌ترین تهیگاه‌ها هم از پس‌تابِ آفرینش کم‌رنگ می‌درخشند.",
  "<b>تایتان</b>، بزرگ‌ترین قمر زحل، دریاچه و رودخانه دارد — اما از متان و اتان مایع، زیر جوی غلیظ و نارنجی از نیتروژن.",
  "اگر می‌توانستی یک برگ کاغذ را <b>۱۰۳ بار</b> تا کنی، ضخامتش از قطر جهان قابل‌مشاهده بیشتر می‌شد (هر تا ضخامت را دو برابر می‌کند).",
  "<b>برخورد آندرومدا و راه شیری</b> تقریباً هیچ ستاره‌ای را به‌هم نمی‌زند — کهکشان‌ها بیشتر فضای خالی‌اند، پس ستاره‌ها تقریباً هرگز به هم نمی‌خورند.",
  "<b>کمان‌اِی‌* (Sagittarius A*)</b>، سیاه‌چالهٔ مرکز راه شیری، ۴ میلیون برابر جرم خورشید است — با این حال «سایه‌»اش که نخستین‌بار در ۲۰۲۲ تصویربرداری شد، کوچک‌تر از یک دونات روی ماه از دید زمین به‌نظر می‌رسد.",
  "<b>سردترین جای شناخته‌شدهٔ</b> جهان فضای دور نیست — سحابی بومرنگ است با حدود ۱ کلوین، سردتر از زمینهٔ کیهانی، که با گاز به‌سرعت منبسط‌شوندهٔ خودش سرد شده.",
  "<b>سیارهٔ فراخورشیدی HD 189733b</b> بادهایی با سرعت ۸٬۷۰۰ کیلومتر بر ساعت دارد و احتمالاً شیشهٔ مذاب می‌بارد — آن هم به‌صورت افقی.",
  "<b>انبساط جهان در حال شتاب گرفتن است</b>، به‌رانشِ انرژی تاریک که حدود ۶۸٪ همه‌چیز را می‌سازد — و ما هنوز نمی‌دانیم چیست.",
];

const Facts = {
  order: [],
  i: 0,
  init() {
    this.order = FACTS_EN.map((_, i) => i);
    for (let i = this.order.length - 1; i > 0; i--) {   // shuffle
      const j = Math.floor(Math.random() * (i + 1));
      [this.order[i], this.order[j]] = [this.order[j], this.order[i]];
    }
    this.show();
    U.el("fact-next").addEventListener("click", () => this.next());
    document.addEventListener("language-changed", () => this.show());
    setInterval(() => this.next(), 22000);
  },
  arr() { const l = window.I18N && I18N.lang; return l === "fa" ? FACTS_FA : l === "fr" ? FACTS_FR : FACTS_EN; },
  show() {
    const el = U.el("fact-text");
    el.style.opacity = 0;
    setTimeout(() => { el.innerHTML = this.arr()[this.order[this.i]]; el.style.opacity = 1; }, 180);
  },
  next() { this.i = (this.i + 1) % this.order.length; this.show(); }
};

window.Facts = Facts;
