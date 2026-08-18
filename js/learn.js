/* =============================================================================
   learn.js  —  the "Learn about Space" library.
   Categories → tappable topics with short, engaging explanations + a "wow" fact.
   Trilingual (en / fr / fa). Pure content + a small accordion UI.
   ============================================================================= */

const LEARN = [
  { emoji:"🪐", color:"#e8c48c",
    name:{en:"The Solar System", fr:"Le système solaire", fa:"منظومهٔ شمسی"},
    topics:[
      { title:{en:"The Sun — our star", fr:"Le Soleil — notre étoile", fa:"خورشید — ستارهٔ ما"},
        body:{en:"The Sun is a giant ball of glowing gas so big that over a million Earths could fit inside it. Deep in its core it crushes hydrogen into helium, releasing the light and warmth that keep every living thing alive.", fr:"Le Soleil est une boule géante de gaz incandescent, si grande que plus d'un million de Terres pourraient y tenir. Au fond de son cœur, il écrase l'hydrogène en hélium, libérant la lumière et la chaleur qui maintiennent la vie.", fa:"خورشید گویی غول‌آسا از گاز درخشان است، آن‌قدر بزرگ که بیش از یک میلیون زمین در آن جا می‌شود. در ژرفای هسته‌اش هیدروژن را به هلیوم می‌فشارد و نور و گرمایی آزاد می‌کند که زندگی را ممکن می‌سازد."},
        wow:{en:"✨ The Sun makes up 99.8% of all the mass in the Solar System — everything else is just leftovers!", fr:"✨ Le Soleil représente 99,8 % de toute la masse du système solaire — le reste n'est que des miettes !", fa:"✨ خورشید ۹۹٫۸٪ کل جرم منظومهٔ شمسی است — بقیهٔ همه‌چیز فقط ته‌مانده است!"} },
      { title:{en:"The rocky planets", fr:"Les planètes rocheuses", fa:"سیاره‌های سنگی"},
        body:{en:"The four planets closest to the Sun — Mercury, Venus, Earth and Mars — are small worlds of rock and metal. Venus is a scorching greenhouse, Mars is a frozen desert, and Earth sits in the 'just right' zone for oceans and life.", fr:"Les quatre planètes les plus proches du Soleil — Mercure, Vénus, la Terre et Mars — sont de petits mondes de roche et de métal. Vénus est une serre brûlante, Mars un désert gelé, et la Terre se trouve dans la zone « idéale » pour les océans et la vie.", fa:"چهار سیارهٔ نزدیک به خورشید — عطارد، زهره، زمین و مریخ — دنیاهایی کوچک از سنگ و فلزند. زهره گلخانه‌ای سوزان است، مریخ بیابانی یخ‌زده، و زمین در منطقهٔ «درست» برای اقیانوس‌ها و زندگی قرار دارد."},
        wow:{en:"✨ A day on Venus is longer than its whole year!", fr:"✨ Un jour sur Vénus dure plus longtemps que son année entière !", fa:"✨ یک روز روی زهره از کل سالش بلندتر است!"} },
      { title:{en:"The giant planets", fr:"Les planètes géantes", fa:"سیاره‌های غول‌پیکر"},
        body:{en:"Far from the Sun live the giants: Jupiter and Saturn are huge balls of gas, while Uranus and Neptune are icy worlds. Jupiter is so big that all the other planets could fit inside it, and Saturn's rings are billions of chunks of ice.", fr:"Loin du Soleil vivent les géantes : Jupiter et Saturne sont d'énormes boules de gaz, tandis qu'Uranus et Neptune sont des mondes glacés. Jupiter est si grande que toutes les autres planètes tiendraient dedans, et les anneaux de Saturne sont des milliards de morceaux de glace.", fa:"دور از خورشید غول‌ها زندگی می‌کنند: مشتری و زحل گوی‌های عظیم گازند، و اورانوس و نپتون دنیاهایی یخی. مشتری آن‌قدر بزرگ است که همهٔ سیاره‌های دیگر در آن جا می‌شوند، و حلقه‌های زحل میلیاردها تکه یخ‌اند."},
        wow:{en:"✨ Saturn is so light for its size that it would float in a giant bathtub of water.", fr:"✨ Saturne est si légère pour sa taille qu'elle flotterait dans une baignoire géante d'eau.", fa:"✨ زحل نسبت به اندازه‌اش چنان سبک است که در وانی غول‌آسا از آب شناور می‌ماند."} },
      { title:{en:"Comets, asteroids & meteors", fr:"Comètes, astéroïdes et météores", fa:"دنباله‌دارها، سیارک‌ها و شهاب‌ها"},
        body:{en:"Left over from the birth of the planets are millions of space rocks. Asteroids are rocky, comets are 'dirty snowballs' that grow glowing tails near the Sun, and when tiny bits hit our air they burn up as shooting stars.", fr:"Il reste de la naissance des planètes des millions de roches spatiales. Les astéroïdes sont rocheux, les comètes sont des « boules de neige sales » qui déploient une queue lumineuse près du Soleil, et quand de petits morceaux percutent notre air, ils brûlent en étoiles filantes.", fa:"از زایش سیاره‌ها میلیون‌ها تکه‌سنگ فضایی باقی مانده. سیارک‌ها سنگی‌اند، دنباله‌دارها «گلوله‌برف‌های کثیف»‌اند که نزدیک خورشید دنباله‌ای درخشان می‌گیرند، و وقتی ذره‌های کوچک به هوای ما می‌خورند، همچون ستارهٔ پرنده می‌سوزند."},
        wow:{en:"✨ Most 'shooting stars' are no bigger than a grain of sand.", fr:"✨ La plupart des « étoiles filantes » ne sont pas plus grosses qu'un grain de sable.", fa:"✨ بیشتر «ستاره‌های پرنده» از یک دانهٔ شن بزرگ‌تر نیستند."} },
    ]},

  { emoji:"⭐", color:"#ffcf6b",
    name:{en:"Stars", fr:"Les étoiles", fa:"ستاره‌ها"},
    topics:[
      { title:{en:"How stars are born", fr:"La naissance des étoiles", fa:"چگونه ستاره‌ها زاده می‌شوند"},
        body:{en:"Stars are born inside giant clouds of gas and dust called nebulae. Gravity slowly pulls the gas together until the centre gets so hot and squeezed that it 'switches on' and begins to shine.", fr:"Les étoiles naissent dans d'immenses nuages de gaz et de poussière appelés nébuleuses. La gravité rassemble lentement le gaz jusqu'à ce que le centre devienne si chaud et comprimé qu'il « s'allume » et se met à briller.", fa:"ستاره‌ها درون ابرهای عظیم گاز و غبار به نام سحابی زاده می‌شوند. گرانش گاز را آرام‌آرام گرد هم می‌کشد تا مرکز چنان داغ و فشرده شود که «روشن» شود و درخشیدن آغاز کند."},
        wow:{en:"✨ Stars are often born together, like brothers and sisters, in the same cloud.", fr:"✨ Les étoiles naissent souvent ensemble, comme des frères et sœurs, dans le même nuage.", fa:"✨ ستاره‌ها اغلب با هم، مثل خواهر و برادر، در یک ابر زاده می‌شوند."} },
      { title:{en:"Colours & temperatures", fr:"Couleurs et températures", fa:"رنگ‌ها و دماها"},
        body:{en:"A star's colour tells you how hot it is. Blue stars are the hottest, white and yellow are in the middle (like our Sun), and red stars are the coolest — the opposite of a hot and cold tap!", fr:"La couleur d'une étoile révèle sa température. Les étoiles bleues sont les plus chaudes, les blanches et jaunes au milieu (comme notre Soleil), et les rouges les plus froides — l'inverse d'un robinet chaud et froid !", fa:"رنگ یک ستاره دمایش را نشان می‌دهد. ستاره‌های آبی داغ‌ترین‌اند، سفید و زرد میانه (مثل خورشید ما)، و سرخ‌ها سردترین — برعکس شیر آب سرد و گرم!"},
        wow:{en:"✨ The hottest stars can be over 40,000°C on the surface.", fr:"✨ Les étoiles les plus chaudes peuvent dépasser 40 000 °C en surface.", fa:"✨ داغ‌ترین ستاره‌ها می‌توانند در سطح بیش از ۴۰٬۰۰۰ درجهٔ سانتی‌گراد باشند."} },
      { title:{en:"How stars die", fr:"La mort des étoiles", fa:"چگونه ستاره‌ها می‌میرند"},
        body:{en:"Stars don't live forever. A star like the Sun will puff off its outer layers and shrink into a tiny 'white dwarf'. But giant stars die in a gigantic explosion called a supernova — briefly outshining a whole galaxy.", fr:"Les étoiles ne vivent pas éternellement. Une étoile comme le Soleil expulsera ses couches externes et se réduira en une petite « naine blanche ». Mais les étoiles géantes meurent dans une explosion colossale, la supernova — surpassant brièvement une galaxie entière.", fa:"ستاره‌ها جاودانه نیستند. ستاره‌ای مثل خورشید لایه‌های بیرونی‌اش را بیرون می‌دمد و به «کوتولهٔ سفید» کوچکی فرومی‌رود. اما ستاره‌های غول‌پیکر در انفجاری عظیم به نام ابرنواختر می‌میرند — که لحظه‌ای از یک کهکشان کامل درخشان‌تر است."},
        wow:{en:"✨ The iron in your blood and the calcium in your bones were made inside dying stars.", fr:"✨ Le fer de ton sang et le calcium de tes os ont été fabriqués dans des étoiles mourantes.", fa:"✨ آهنِ خونت و کلسیمِ استخوان‌هایت درون ستاره‌های در حال مرگ ساخته شده‌اند."} },
      { title:{en:"Constellations", fr:"Les constellations", fa:"صورت‌های فلکی"},
        body:{en:"Constellations are patterns that people long ago imagined by connecting the stars — like a giant dot-to-dot in the sky. There are 88 of them, and they help astronomers find their way around the night.", fr:"Les constellations sont des figures que les peuples anciens imaginaient en reliant les étoiles — comme un immense jeu de points à relier dans le ciel. Il y en a 88, et elles aident les astronomes à se repérer la nuit.", fa:"صورت‌های فلکی نقش‌هایی‌اند که مردمان کهن با وصل‌کردن ستاره‌ها تصور می‌کردند — مثل یک نقطه‌به‌نقطهٔ غول‌آسا در آسمان. ۸۸ تای آن‌ها هست و به ستاره‌شناسان کمک می‌کنند شب راه خود را بیابند."},
        wow:{en:"✨ The stars in a constellation aren't really neighbours — some are hundreds of times farther than others.", fr:"✨ Les étoiles d'une constellation ne sont pas vraiment voisines — certaines sont des centaines de fois plus loin que d'autres.", fa:"✨ ستاره‌های یک صورت فلکی واقعاً همسایه نیستند — برخی صدها برابر دورتر از دیگرانند."} },
    ]},

  { emoji:"🌌", color:"#b98cff",
    name:{en:"Galaxies & the Universe", fr:"Galaxies et Univers", fa:"کهکشان‌ها و جهان"},
    topics:[
      { title:{en:"Our galaxy, the Milky Way", fr:"Notre galaxie, la Voie lactée", fa:"کهکشان ما، راه شیری"},
        body:{en:"We live inside a giant spinning city of stars called the Milky Way — a spiral galaxy of a few hundred billion stars. On a really dark night you can see it as a faint band of light across the sky: our galaxy seen edge-on from the inside.", fr:"Nous vivons dans une gigantesque ville tournoyante d'étoiles, la Voie lactée — une galaxie spirale de quelques centaines de milliards d'étoiles. Par une nuit bien noire, tu la vois comme une bande de lumière traversant le ciel : notre galaxie vue par la tranche, de l'intérieur.", fa:"ما درون شهری غول‌آسا و چرخان از ستاره‌ها به نام راه شیری زندگی می‌کنیم — کهکشانی مارپیچی با چند صد میلیارد ستاره. در شبی کاملاً تاریک آن را همچون نواری کم‌نور در آسمان می‌بینی: کهکشان ما که از درون و از پهلو دیده می‌شود."},
        wow:{en:"✨ It takes the Sun about 230 million years to go once around the Milky Way.", fr:"✨ Il faut environ 230 millions d'années au Soleil pour faire un tour de la Voie lactée.", fa:"✨ خورشید حدود ۲۳۰ میلیون سال طول می‌کشد تا یک‌بار دور راه شیری بگردد."} },
      { title:{en:"Types of galaxies", fr:"Les types de galaxies", fa:"انواع کهکشان‌ها"},
        body:{en:"Galaxies come in shapes: elegant spirals with curving arms, giant egg-shaped ellipticals, and messy irregulars. Each is an island of billions of stars, and there are more galaxies in the universe than people who have ever lived.", fr:"Les galaxies ont des formes variées : d'élégantes spirales aux bras courbes, d'énormes elliptiques en forme d'œuf, et des irrégulières en désordre. Chacune est une île de milliards d'étoiles, et il y a plus de galaxies que d'êtres humains ayant jamais vécu.", fa:"کهکشان‌ها شکل‌های گوناگون دارند: مارپیچ‌های زیبا با بازوهای خمیده، بیضوی‌های غول‌آسای تخم‌مرغی، و نامنظم‌های به‌هم‌ریخته. هر یک جزیره‌ای از میلیاردها ستاره است، و در جهان کهکشان‌ها از همهٔ انسان‌هایی که تا کنون زیسته‌اند بیشترند."},
        wow:{en:"✨ There are an estimated 2 trillion galaxies in the observable universe.", fr:"✨ On estime à 2 000 milliards le nombre de galaxies dans l'univers observable.", fa:"✨ تخمین می‌زنند حدود ۲ تریلیون کهکشان در جهان قابل‌مشاهده هست."} },
      { title:{en:"The Big Bang", fr:"Le Big Bang", fa:"مهبانگ"},
        body:{en:"About 13.8 billion years ago, everything — space, time and matter — burst into being from a single incredibly hot, dense point, and the universe has been expanding and cooling ever since. This is the Big Bang.", fr:"Il y a environ 13,8 milliards d'années, tout — l'espace, le temps, la matière — a surgi d'un point incroyablement chaud et dense, et l'univers n'a cessé de s'étendre et de refroidir depuis. C'est le Big Bang.", fa:"حدود ۱۳٫۸ میلیارد سال پیش، همه‌چیز — فضا، زمان و ماده — از یک نقطهٔ فوق‌العاده داغ و چگال پدید آمد، و از آن زمان جهان پیوسته در حال انبساط و سردشدن است. این همان مهبانگ است."},
        wow:{en:"✨ We can still 'see' the heat of the Big Bang as a faint glow all across the sky.", fr:"✨ On peut encore « voir » la chaleur du Big Bang, une faible lueur dans tout le ciel.", fa:"✨ ما هنوز می‌توانیم گرمای مهبانگ را همچون درخششی کم‌رنگ در سراسر آسمان «ببینیم»."} },
      { title:{en:"Dark matter & dark energy", fr:"Matière noire et énergie noire", fa:"مادهٔ تاریک و انرژی تاریک"},
        body:{en:"Everything we can see — stars, planets, people — is only about 5% of the universe. The rest is invisible 'dark matter' (which holds galaxies together) and mysterious 'dark energy' (which pushes the universe apart). Nobody knows exactly what they are.", fr:"Tout ce que nous voyons — étoiles, planètes, êtres humains — ne représente qu'environ 5 % de l'univers. Le reste est de la « matière noire » invisible (qui maintient les galaxies) et une mystérieuse « énergie noire » (qui écarte l'univers). Personne ne sait exactement ce que c'est.", fa:"هر چه می‌بینیم — ستاره‌ها، سیاره‌ها، انسان‌ها — تنها حدود ۵٪ جهان است. بقیه «مادهٔ تاریکِ» نامرئی است (که کهکشان‌ها را کنار هم نگه می‌دارد) و «انرژی تاریکِ» مرموز (که جهان را از هم می‌راند). هیچ‌کس دقیقاً نمی‌داند این‌ها چیستند."},
        wow:{en:"✨ 95% of the universe is made of stuff we cannot see and don't understand yet.", fr:"✨ 95 % de l'univers est fait de choses qu'on ne voit pas et qu'on ne comprend pas encore.", fa:"✨ ۹۵٪ جهان از چیزی ساخته شده که نمی‌بینیم و هنوز نمی‌فهمیم."} },
    ]},

  { emoji:"🕳️", color:"#ff6b81",
    name:{en:"Black Holes", fr:"Les trous noirs", fa:"سیاه‌چاله‌ها"},
    topics:[
      { title:{en:"What is a black hole?", fr:"Qu'est-ce qu'un trou noir ?", fa:"سیاه‌چاله چیست؟"},
        body:{en:"A black hole is a place where gravity is so strong that nothing — not even light — can escape. They form when a giant star collapses at the end of its life, squeezing a huge amount of mass into a tiny space.", fr:"Un trou noir est un endroit où la gravité est si forte que rien — pas même la lumière — ne peut s'échapper. Ils se forment quand une étoile géante s'effondre en fin de vie, comprimant une énorme masse dans un espace minuscule.", fa:"سیاه‌چاله جایی است که گرانش چنان قوی است که هیچ‌چیز — حتی نور — نمی‌تواند بگریزد. آن‌ها وقتی شکل می‌گیرند که ستاره‌ای غول‌پیکر در پایان عمرش فرومی‌پاشد و جرمی عظیم را در فضایی ریز می‌فشارد."},
        wow:{en:"✨ If you squeezed the whole Earth into a black hole, it would be smaller than a marble.", fr:"✨ Si tu comprimais toute la Terre en trou noir, elle serait plus petite qu'une bille.", fa:"✨ اگر کل زمین را در سیاه‌چاله بفشاری، از یک تیله کوچک‌تر می‌شود."} },
      { title:{en:"The point of no return", fr:"Le point de non-retour", fa:"نقطهٔ بی‌بازگشت"},
        body:{en:"The edge of a black hole is called the event horizon — cross it and you can never come back. Fall in feet-first and gravity would stretch you like spaghetti! Time itself also runs slower the closer you get.", fr:"Le bord d'un trou noir s'appelle l'horizon des événements — le franchir, c'est ne jamais pouvoir revenir. Si tu tombais les pieds d'abord, la gravité t'étirerait comme un spaghetti ! Et le temps s'écoule plus lentement à mesure qu'on s'approche.", fa:"لبهٔ سیاه‌چاله «افق رویداد» نام دارد — از آن بگذری، دیگر هرگز بازنمی‌گردی. اگر با پا اول بیفتی، گرانش تو را مثل اسپاگتی می‌کشد! و هرچه نزدیک‌تر شوی، زمان کندتر می‌گذرد."},
        wow:{en:"✨ Near a black hole, one hour for you could be seven years for everyone far away.", fr:"✨ Près d'un trou noir, une heure pour toi pourrait valoir sept ans pour les autres, au loin.", fa:"✨ نزدیک یک سیاه‌چاله، یک ساعت برای تو می‌تواند هفت سال برای دیگرانِ دور باشد."} },
      { title:{en:"Giants at the centre", fr:"Des géants au centre", fa:"غول‌ها در مرکز"},
        body:{en:"At the heart of almost every galaxy hides a supermassive black hole — millions or billions of times heavier than the Sun. Our Milky Way has one called Sagittarius A*, and the stars near it whip around at incredible speeds.", fr:"Au cœur de presque chaque galaxie se cache un trou noir supermassif — des millions ou des milliards de fois plus lourd que le Soleil. Notre Voie lactée en a un, Sagittarius A*, et les étoiles proches tournent autour à des vitesses folles.", fa:"در قلب تقریباً هر کهکشان یک سیاه‌چالهٔ کلان‌جرم پنهان است — میلیون‌ها یا میلیاردها بار سنگین‌تر از خورشید. راه شیری ما یکی به نام کمان‌اِی‌* دارد، و ستاره‌های نزدیکش با سرعتی باورنکردنی گِردش می‌چرخند."},
        wow:{en:"✨ The black hole at the centre of our galaxy is 4 million times the mass of the Sun.", fr:"✨ Le trou noir au centre de notre galaxie pèse 4 millions de fois la masse du Soleil.", fa:"✨ سیاه‌چالهٔ مرکز کهکشان ما ۴ میلیون برابر جرم خورشید است."} },
      { title:{en:"Seeing the unseeable", fr:"Voir l'invisible", fa:"دیدنِ نادیدنی"},
        body:{en:"You can't see a black hole directly — it's black! But in 2019, astronomers linked telescopes all around the world to photograph the glowing gas swirling around one, revealing its dark shadow for the first time.", fr:"On ne peut pas voir un trou noir directement — il est noir ! Mais en 2019, des astronomes ont relié des télescopes du monde entier pour photographier le gaz brillant qui tourbillonne autour de l'un d'eux, révélant pour la première fois son ombre sombre.", fa:"نمی‌توانی سیاه‌چاله را مستقیم ببینی — سیاه است! اما در ۲۰۱۹، ستاره‌شناسان تلسکوپ‌های سراسر جهان را به‌هم پیوند دادند تا از گازِ درخشانِ چرخانِ گرد یکی از آن‌ها عکس بگیرند و برای نخستین‌بار سایهٔ تاریکش را آشکار کنند."},
        wow:{en:"✨ The first black-hole photo showed one 55 million light-years away, in galaxy M87.", fr:"✨ La première photo montrait un trou noir à 55 millions d'années-lumière, dans la galaxie M87.", fa:"✨ نخستین عکس سیاه‌چاله، یکی را در ۵۵ میلیون سال نوری، در کهکشان M87، نشان داد."} },
    ]},

  { emoji:"🚀", color:"#6ee7a8",
    name:{en:"Space Exploration", fr:"L'exploration spatiale", fa:"اکتشاف فضا"},
    topics:[
      { title:{en:"How rockets work", fr:"Comment fonctionnent les fusées", fa:"موشک‌ها چگونه کار می‌کنند"},
        body:{en:"Rockets fly by throwing burning gas downwards super fast, which pushes them upwards — the same way a balloon zooms around when you let it go. To escape Earth's gravity, they must reach about 28,000 km/h!", fr:"Les fusées volent en projetant du gaz brûlant vers le bas à très grande vitesse, ce qui les pousse vers le haut — comme un ballon qui file quand on le lâche. Pour échapper à la gravité terrestre, elles doivent atteindre environ 28 000 km/h !", fa:"موشک‌ها با پرتاب گازِ سوزان به‌سمت پایین با سرعت بسیار زیاد پرواز می‌کنند، و همین آن‌ها را به بالا می‌راند — درست مثل بادکنکی که وقتی رهایش کنی به‌سرعت می‌چرخد. برای فرار از گرانش زمین باید به حدود ۲۸٬۰۰۰ کیلومتر بر ساعت برسند!"},
        wow:{en:"✨ A rocket has to go about 25 times faster than a passenger jet to reach orbit.", fr:"✨ Une fusée doit aller environ 25 fois plus vite qu'un avion de ligne pour se mettre en orbite.", fa:"✨ یک موشک باید حدود ۲۵ برابر سریع‌تر از یک هواپیمای مسافربری برود تا به مدار برسد."} },
      { title:{en:"Walking on the Moon", fr:"Marcher sur la Lune", fa:"راه‌رفتن روی ماه"},
        body:{en:"Between 1969 and 1972, twelve astronauts walked on the Moon. They bounced in the low gravity, planted flags, and brought back Moon rocks. Their footprints are still there — with no wind or rain, they could last millions of years.", fr:"Entre 1969 et 1972, douze astronautes ont marché sur la Lune. Ils bondissaient dans la faible gravité, plantaient des drapeaux et rapportaient des roches lunaires. Leurs empreintes y sont encore — sans vent ni pluie, elles pourraient durer des millions d'années.", fa:"میان سال‌های ۱۹۶۹ تا ۱۹۷۲، دوازده فضانورد روی ماه راه رفتند. در گرانش کم می‌جهیدند، پرچم می‌کاشتند و سنگ‌های ماه را با خود آوردند. جای پایشان هنوز آنجاست — بی باد و باران، می‌تواند میلیون‌ها سال بماند."},
        wow:{en:"✨ The Moon is the only other world humans have ever stood on.", fr:"✨ La Lune est le seul autre monde sur lequel des humains se soient tenus.", fa:"✨ ماه تنها دنیای دیگری است که انسان تا کنون رویش ایستاده."} },
      { title:{en:"Robots on Mars", fr:"Des robots sur Mars", fa:"ربات‌ها روی مریخ"},
        body:{en:"Since we can't send people to Mars yet, we send robots. Rovers like Perseverance drive across the red desert, drilling rocks and searching for signs that tiny life might once have existed there.", fr:"Comme on ne peut pas encore envoyer d'humains sur Mars, on envoie des robots. Des rovers comme Perseverance roulent dans le désert rouge, forent des roches et cherchent des traces d'une vie minuscule qui aurait pu exister.", fa:"چون هنوز نمی‌توانیم انسان به مریخ بفرستیم، ربات می‌فرستیم. مریخ‌نوردهایی مثل استقامت (Perseverance) در بیابان سرخ می‌رانند، سنگ‌ها را مته می‌کنند و دنبال نشانه‌هایی از حیاتِ ریز می‌گردند که شاید روزی آنجا بوده."},
        wow:{en:"✨ A helicopter named Ingenuity became the first machine to fly on another planet.", fr:"✨ Un hélicoptère nommé Ingenuity est devenu la première machine à voler sur une autre planète.", fa:"✨ بالگردی به نام نبوغ (Ingenuity) نخستین ماشینی شد که در سیاره‌ای دیگر پرواز کرد."} },
      { title:{en:"Great telescopes", fr:"Les grands télescopes", fa:"تلسکوپ‌های بزرگ"},
        body:{en:"Telescopes in space see farther than any on the ground. Hubble has sent back jaw-dropping photos for over 30 years, and the newer James Webb telescope sees in infrared light, peering back to the very first galaxies.", fr:"Les télescopes dans l'espace voient plus loin que ceux au sol. Hubble renvoie des photos époustouflantes depuis plus de 30 ans, et le plus récent télescope James Webb voit en infrarouge, remontant jusqu'aux toutes premières galaxies.", fa:"تلسکوپ‌های فضایی دورتر از هر تلسکوپ زمینی می‌بینند. هابل بیش از ۳۰ سال است عکس‌های خیره‌کننده می‌فرستد، و تلسکوپ تازه‌تر جیمز وب در نور فروسرخ می‌بیند و تا نخستین کهکشان‌ها را می‌کاود."},
        wow:{en:"✨ Webb can see light that has travelled for over 13 billion years to reach it.", fr:"✨ Webb peut voir une lumière qui a voyagé plus de 13 milliards d'années pour l'atteindre.", fa:"✨ وب می‌تواند نوری را ببیند که بیش از ۱۳ میلیارد سال سفر کرده تا به آن برسد."} },
    ]},

  { emoji:"🔭", color:"#7db4ff",
    name:{en:"Stargazing Tips", fr:"Observer le ciel", fa:"رصد آسمان"},
    topics:[
      { title:{en:"Start with your own eyes", fr:"Commence avec tes yeux", fa:"با چشم خودت شروع کن"},
        body:{en:"You don't need any equipment to start! Find a spot away from bright lights, let your eyes adjust for 15–20 minutes, and look up. You'll be amazed how many more stars appear once your eyes get used to the dark.", fr:"Pas besoin de matériel pour commencer ! Trouve un endroit loin des lumières vives, laisse tes yeux s'habituer 15 à 20 minutes, et lève la tête. Tu seras étonné du nombre d'étoiles qui apparaissent quand tes yeux s'adaptent à l'obscurité.", fa:"برای شروع به هیچ وسیله‌ای نیاز نداری! جایی دور از نورهای تند پیدا کن، ۱۵ تا ۲۰ دقیقه بگذار چشمانت عادت کنند، و به بالا نگاه کن. شگفت‌زده می‌شوی که وقتی چشمانت به تاریکی خو می‌گیرند چه تعداد ستارهٔ بیشتری پدیدار می‌شود."},
        wow:{en:"✨ From a truly dark place you can see about 3,000 stars with your eyes alone.", fr:"✨ Depuis un lieu vraiment sombre, on voit environ 3 000 étoiles à l'œil nu.", fa:"✨ از جایی واقعاً تاریک می‌توانی با چشم غیرمسلح حدود ۳٬۰۰۰ ستاره ببینی."} },
      { title:{en:"Binoculars & telescopes", fr:"Jumelles et télescopes", fa:"دوربین دوچشمی و تلسکوپ"},
        body:{en:"A simple pair of binoculars is a brilliant first step — they reveal craters on the Moon, the moons of Jupiter, and hidden star clusters. Telescopes show even more, but start small: the best telescope is the one you'll actually use.", fr:"Une simple paire de jumelles est un excellent premier pas — elles révèlent les cratères de la Lune, les lunes de Jupiter et des amas d'étoiles cachés. Les télescopes montrent encore plus, mais commence petit : le meilleur télescope est celui que tu utiliseras vraiment.", fa:"یک دوربین دوچشمی ساده گام نخستِ فوق‌العاده‌ای است — دهانه‌های ماه، قمرهای مشتری و خوشه‌های پنهانِ ستاره را آشکار می‌کند. تلسکوپ‌ها بیشتر نشان می‌دهند، اما کوچک شروع کن: بهترین تلسکوپ همان است که واقعاً از آن استفاده کنی."},
        wow:{en:"✨ With ordinary binoculars you can see the same four moons of Jupiter that Galileo found in 1610.", fr:"✨ Avec de simples jumelles, tu vois les quatre lunes de Jupiter que Galilée a découvertes en 1610.", fa:"✨ با دوربین دوچشمی معمولی همان چهار قمر مشتری را می‌بینی که گالیله در ۱۶۱۰ کشف کرد."} },
      { title:{en:"The Moon's phases", fr:"Les phases de la Lune", fa:"فازهای ماه"},
        body:{en:"The Moon seems to change shape over about a month, from a thin crescent to a full circle and back. It isn't really changing — we're just seeing different amounts of its sunlit half as it orbits the Earth.", fr:"La Lune semble changer de forme en un mois environ, d'un fin croissant à un cercle complet, puis revient. Elle ne change pas vraiment — nous voyons simplement des portions différentes de sa moitié éclairée pendant qu'elle tourne autour de la Terre.", fa:"ماه در حدود یک ماه ظاهراً شکلش را عوض می‌کند، از هلالی باریک تا دایره‌ای کامل و دوباره برمی‌گردد. در واقع تغییری نمی‌کند — ما فقط بخش‌های متفاوتی از نیمهٔ آفتاب‌گیرش را می‌بینیم، همان‌طور که به دور زمین می‌گردد."},
        wow:{en:"✨ The Moon always shows us the same face — we never see its far side from Earth.", fr:"✨ La Lune nous montre toujours la même face — depuis la Terre, on ne voit jamais sa face cachée.", fa:"✨ ماه همیشه یک روی خود را نشانمان می‌دهد — از زمین هرگز نیمهٔ دورش را نمی‌بینیم."} },
      { title:{en:"Catching a meteor shower", fr:"Voir une pluie d'étoiles filantes", fa:"تماشای بارش شهابی"},
        body:{en:"A few times a year, Earth ploughs through a trail of comet dust and the sky fills with shooting stars. Just lie back, get comfortable, and be patient — no telescope needed. The best shows come after midnight.", fr:"Quelques fois par an, la Terre traverse une traînée de poussière de comète et le ciel se remplit d'étoiles filantes. Allonge-toi, installe-toi confortablement et sois patient — aucun télescope nécessaire. Les plus beaux spectacles ont lieu après minuit.", fa:"چند بار در سال، زمین از میان ردی از غبار دنباله‌دار می‌گذرد و آسمان از ستاره‌های پرنده پر می‌شود. فقط دراز بکش، راحت باش و صبور — نیازی به تلسکوپ نیست. بهترین نمایش‌ها پس از نیمه‌شب‌اند."},
        wow:{en:"✨ During the Geminids in December you might see over one meteor every minute.", fr:"✨ Pendant les Géminides en décembre, tu peux voir plus d'un météore par minute.", fa:"✨ در جریان جوزایی (جمینید) در دسامبر شاید بیش از یک شهاب در هر دقیقه ببینی."} },
    ]},
];

// Extra topics per category (index-aligned with LEARN). Pooled with the base topics
// so each visit to a subject shows a different random selection.
const LEARN_MORE = [
  [ // Solar System
    { title:{en:"Our home, planet Earth", fr:"Notre maison, la Terre", fa:"خانهٔ ما، سیارهٔ زمین"},
      body:{en:"Earth is the only place we know of with oceans of liquid water and living things. A blanket of air keeps us warm and breathing, and a magnetic shield deflects harmful particles from the Sun.", fr:"La Terre est le seul endroit connu avec des océans d'eau liquide et des êtres vivants. Une couche d'air nous garde au chaud et respirables, et un bouclier magnétique dévie les particules dangereuses du Soleil.", fa:"زمین تنها جایی است که می‌شناسیم با اقیانوس‌های آب مایع و موجودات زنده. لایه‌ای از هوا ما را گرم و قابل تنفس نگه می‌دارد، و سپری مغناطیسی ذرات خطرناک خورشید را منحرف می‌کند."},
      wow:{en:"✨ Earth is the only planet not named after a Greek or Roman god.", fr:"✨ La Terre est la seule planète qui ne porte pas le nom d'un dieu grec ou romain.", fa:"✨ زمین تنها سیاره‌ای است که نامش از یک خدای یونانی یا رومی گرفته نشده."} },
    { title:{en:"Moons — worlds of their own", fr:"Les lunes — des mondes à part", fa:"قمرها — دنیاهایی برای خودشان"},
      body:{en:"Most planets have moons, and some are amazing. Jupiter's moon Europa hides a deep ocean under its icy shell, and Saturn's giant moon Titan has rivers and lakes of liquid methane.", fr:"La plupart des planètes ont des lunes, et certaines sont extraordinaires. Europe, une lune de Jupiter, cache un océan profond sous sa glace, et Titan, l'immense lune de Saturne, a des rivières et des lacs de méthane liquide.", fa:"بیشتر سیاره‌ها قمر دارند، و برخی شگفت‌انگیزند. اروپا، قمر مشتری، اقیانوسی ژرف زیر پوستهٔ یخی‌اش پنهان کرده، و تایتان، قمر بزرگ زحل، رودها و دریاچه‌هایی از متان مایع دارد."},
      wow:{en:"✨ Jupiter and Saturn each have over 90 moons!", fr:"✨ Jupiter et Saturne ont chacune plus de 90 lunes !", fa:"✨ مشتری و زحل هرکدام بیش از ۹۰ قمر دارند!"} },
  ],
  [ // Stars
    { title:{en:"The nearest star", fr:"L'étoile la plus proche", fa:"نزدیک‌ترین ستاره"},
      body:{en:"After the Sun, our closest star is Proxima Centauri, about 4 light-years away. Even in the fastest spacecraft we've ever built, the journey there would take tens of thousands of years.", fr:"Après le Soleil, l'étoile la plus proche est Proxima du Centaure, à environ 4 années-lumière. Même dans le vaisseau le plus rapide jamais construit, le voyage prendrait des dizaines de milliers d'années.", fa:"پس از خورشید، نزدیک‌ترین ستاره پروکسیما قنطورس است، حدود ۴ سال نوری دورتر. حتی با سریع‌ترین فضاپیمایی که ساخته‌ایم، سفر به آنجا ده‌ها هزار سال طول می‌کشد."},
      wow:{en:"✨ Light from Proxima Centauri takes over 4 years to reach us.", fr:"✨ La lumière de Proxima du Centaure met plus de 4 ans à nous parvenir.", fa:"✨ نور پروکسیما قنطورس بیش از ۴ سال طول می‌کشد تا به ما برسد."} },
    { title:{en:"Giant and dwarf stars", fr:"Étoiles géantes et naines", fa:"ستاره‌های غول‌پیکر و کوتوله"},
      body:{en:"Stars come in wildly different sizes. Some 'supergiants' are so vast they would swallow the inner planets, while small 'dwarf' stars burn slowly and can keep shining for trillions of years.", fr:"Les étoiles ont des tailles très différentes. Certaines « supergéantes » sont si vastes qu'elles engloutiraient les planètes intérieures, tandis que les petites « naines » brûlent lentement et brillent des milliers de milliards d'années.", fa:"ستاره‌ها اندازه‌های بسیار متفاوتی دارند. برخی «اَبَرغول‌ها» چنان بزرگ‌اند که سیاره‌های داخلی را می‌بلعند، در حالی که «کوتوله‌های» کوچک آرام می‌سوزند و می‌توانند تریلیون‌ها سال بدرخشند."},
      wow:{en:"✨ The biggest known stars are over 1,000 times wider than the Sun.", fr:"✨ Les plus grandes étoiles connues sont plus de 1 000 fois plus larges que le Soleil.", fa:"✨ بزرگ‌ترین ستاره‌های شناخته‌شده بیش از ۱٬۰۰۰ برابر پهن‌تر از خورشیدند."} },
  ],
  [ // Galaxies & the Universe
    { title:{en:"The Andromeda Galaxy", fr:"La galaxie d'Andromède", fa:"کهکشان آندرومدا"},
      body:{en:"Andromeda is our biggest galactic neighbour and the farthest thing you can see with just your eyes. It's slowly heading toward us and will merge with the Milky Way billions of years from now.", fr:"Andromède est notre plus grande voisine galactique et l'objet le plus lointain visible à l'œil nu. Elle se dirige lentement vers nous et fusionnera avec la Voie lactée dans des milliards d'années.", fa:"آندرومدا بزرگ‌ترین همسایهٔ کهکشانی ماست و دورترین چیزی که تنها با چشم می‌بینی. آرام‌آرام به‌سوی ما می‌آید و میلیاردها سال بعد با راه شیری ادغام می‌شود."},
      wow:{en:"✨ Andromeda holds about a trillion stars — even more than the Milky Way.", fr:"✨ Andromède compte environ mille milliards d'étoiles — encore plus que la Voie lactée.", fa:"✨ آندرومدا حدود یک تریلیون ستاره دارد — حتی بیشتر از راه شیری."} },
    { title:{en:"The expanding universe", fr:"L'univers en expansion", fa:"جهانِ در حال انبساط"},
      body:{en:"Space itself is stretching, carrying galaxies away from each other like dots drawn on an inflating balloon. The farther away a galaxy is, the faster it rushes away from us.", fr:"L'espace lui-même s'étire, éloignant les galaxies les unes des autres comme des points sur un ballon qu'on gonfle. Plus une galaxie est lointaine, plus elle s'éloigne vite.", fa:"خودِ فضا در حال کش‌آمدن است و کهکشان‌ها را مثل نقطه‌هایی روی بادکنکی که باد می‌شود از هم دور می‌کند. هرچه کهکشانی دورتر باشد، سریع‌تر از ما دور می‌شود."},
      wow:{en:"✨ Some galaxies are moving away so fast their light will never reach us.", fr:"✨ Certaines galaxies s'éloignent si vite que leur lumière ne nous parviendra jamais.", fa:"✨ برخی کهکشان‌ها چنان سریع دور می‌شوند که نورشان هرگز به ما نمی‌رسد."} },
  ],
  [ // Black Holes
    { title:{en:"Where do black holes come from?", fr:"D'où viennent les trous noirs ?", fa:"سیاه‌چاله‌ها از کجا می‌آیند؟"},
      body:{en:"When a star far heavier than the Sun runs out of fuel, its core collapses under its own gravity and keeps crushing down until it becomes a black hole. The biggest ones grow by swallowing gas and stars.", fr:"Quand une étoile bien plus lourde que le Soleil épuise son carburant, son cœur s'effondre sous sa propre gravité et se comprime jusqu'à devenir un trou noir. Les plus grands grossissent en avalant gaz et étoiles.", fa:"وقتی ستاره‌ای بسیار سنگین‌تر از خورشید سوختش تمام می‌شود، هسته‌اش زیر گرانش خودش فرومی‌پاشد و آن‌قدر فشرده می‌شود تا سیاه‌چاله شود. بزرگ‌ترین‌ها با بلعیدن گاز و ستاره رشد می‌کنند."},
      wow:{en:"✨ The smallest black holes still weigh several times more than the Sun.", fr:"✨ Les plus petits trous noirs pèsent tout de même plusieurs fois plus que le Soleil.", fa:"✨ کوچک‌ترین سیاه‌چاله‌ها هم چند برابر خورشید وزن دارند."} },
    { title:{en:"Warping space and time", fr:"Déformer l'espace et le temps", fa:"خم‌کردن فضا و زمان"},
      body:{en:"A black hole bends space and time so strongly that passing light curves around it, and clocks close to it tick more slowly. Einstein predicted all of this more than a hundred years ago.", fr:"Un trou noir courbe l'espace et le temps si fort que la lumière qui passe se recourbe autour, et les horloges toutes proches battent plus lentement. Einstein a prédit tout cela il y a plus de cent ans.", fa:"سیاه‌چاله فضا و زمان را چنان خم می‌کند که نورِ عبوری گِردش منحنی می‌شود، و ساعت‌های نزدیک به آن کندتر تیک می‌زنند. اینشتین همهٔ این‌ها را بیش از صد سال پیش پیش‌بینی کرد."},
      wow:{en:"✨ A black hole's gravity can bend the light of stars hidden behind it.", fr:"✨ La gravité d'un trou noir peut courber la lumière d'étoiles cachées derrière lui.", fa:"✨ گرانش سیاه‌چاله می‌تواند نور ستاره‌های پنهان‌شده پشتش را خم کند."} },
  ],
  [ // Space Exploration
    { title:{en:"Living on the Space Station", fr:"Vivre dans la station spatiale", fa:"زندگی در ایستگاه فضایی"},
      body:{en:"On the International Space Station, astronauts float in weightlessness, sleep strapped to the wall, and drink water that's been recycled. Circling Earth so fast, they see 16 sunrises every day.", fr:"Dans la Station spatiale internationale, les astronautes flottent en apesanteur, dorment attachés au mur et boivent de l'eau recyclée. Tournant si vite autour de la Terre, ils voient 16 levers de Soleil par jour.", fa:"در ایستگاه فضایی بین‌المللی، فضانوردان در بی‌وزنی شناورند، بسته به دیوار می‌خوابند و آبِ بازیافت‌شده می‌نوشند. چون بسیار سریع دور زمین می‌چرخند، هر روز ۱۶ طلوع خورشید می‌بینند."},
      wow:{en:"✨ The Space Station circles the whole Earth in about 90 minutes.", fr:"✨ La station spatiale fait le tour de la Terre en 90 minutes environ.", fa:"✨ ایستگاه فضایی در حدود ۹۰ دقیقه یک‌بار دور کل زمین می‌گردد."} },
    { title:{en:"Voyager — our farthest messenger", fr:"Voyager — notre messager le plus lointain", fa:"وویجر — دورترین پیام‌رسانِ ما"},
      body:{en:"Launched in 1977, the two Voyager probes have flown past the giant planets and left the Solar System. Each carries a golden record of sounds and pictures from Earth, in case anyone ever finds it.", fr:"Lancées en 1977, les deux sondes Voyager ont dépassé les planètes géantes et quitté le système solaire. Chacune emporte un disque d'or de sons et d'images de la Terre, au cas où quelqu'un le trouverait un jour.", fa:"دو کاوشگر وویجر که در ۱۹۷۷ پرتاب شدند، از کنار سیاره‌های غول‌پیکر گذشته و از منظومهٔ شمسی بیرون رفته‌اند. هرکدام یک صفحهٔ طلایی از صداها و تصاویر زمین با خود دارند، شاید روزی کسی آن را بیابد."},
      wow:{en:"✨ Voyager 1 is the most distant human-made object — over 24 billion km away.", fr:"✨ Voyager 1 est l'objet humain le plus lointain — à plus de 24 milliards de km.", fa:"✨ وویجر ۱ دورترین شیء ساختِ بشر است — بیش از ۲۴ میلیارد کیلومتر دورتر."} },
  ],
  [ // Stargazing Tips
    { title:{en:"Reading a star map", fr:"Lire une carte du ciel", fa:"خواندن نقشهٔ آسمان"},
      body:{en:"A star map — or an app like this one — shows which stars and planets are above you right now. Hold it up toward the sky and match the patterns to find constellations and planets.", fr:"Une carte du ciel — ou une appli comme celle-ci — montre quelles étoiles et planètes sont au-dessus de toi en ce moment. Lève-la vers le ciel et compare les figures pour trouver constellations et planètes.", fa:"یک نقشهٔ آسمان — یا برنامه‌ای مثل همین — نشان می‌دهد همین حالا کدام ستاره‌ها و سیاره‌ها بالای سرت هستند. آن را رو به آسمان بگیر و نقش‌ها را تطبیق بده تا صورت‌های فلکی و سیاره‌ها را بیابی."},
      wow:{en:"✨ The whole sky appears to slowly turn at night — because Earth is spinning.", fr:"✨ Tout le ciel semble tourner lentement la nuit — parce que la Terre tourne.", fa:"✨ تمام آسمان شب آرام‌آرام می‌چرخد — چون زمین در حال چرخش است."} },
    { title:{en:"The best nights to look up", fr:"Les meilleures nuits pour observer", fa:"بهترین شب‌ها برای نگاه به آسمان"},
      body:{en:"Clear, moonless nights far from city lights show the most stars. Check the weather, dress warmly, bring a red-light torch to protect your night vision, and be patient.", fr:"Les nuits claires et sans Lune, loin des lumières de la ville, révèlent le plus d'étoiles. Regarde la météo, habille-toi chaudement, prends une lampe à lumière rouge pour préserver ta vision nocturne, et sois patient.", fa:"شب‌های صاف و بی‌ماه، دور از نورهای شهر، بیشترین ستاره‌ها را نشان می‌دهند. هوا را بررسی کن، گرم بپوش، یک چراغ‌قوهٔ نور قرمز بردار تا دید شبت حفظ شود، و صبور باش."},
      wow:{en:"✨ City lights can hide up to 90% of the stars you'd see from the countryside.", fr:"✨ Les lumières de la ville peuvent cacher jusqu'à 90 % des étoiles visibles à la campagne.", fa:"✨ نورهای شهر می‌توانند تا ۹۰٪ ستاره‌هایی را که از روستا می‌بینی پنهان کنند."} },
  ],
];

// A quick 3-question check per category (index-aligned with LEARN). answer = index in choices.
const LEARN_QUIZ = [
  [ // Solar System
    { answer:0, q:{en:"What fraction of the Solar System's mass is the Sun?", fr:"Quelle part de la masse du système solaire représente le Soleil ?", fa:"چه کسری از جرم منظومهٔ شمسی خورشید است؟"},
      choices:{en:["About 99.8%","About half","About 10%"], fr:["Environ 99,8 %","Environ la moitié","Environ 10 %"], fa:["حدود ۹۹٫۸٪","حدود نصف","حدود ۱۰٪"]} },
    { answer:0, q:{en:"On which planet is a day longer than a year?", fr:"Sur quelle planète un jour dure-t-il plus qu'une année ?", fa:"روی کدام سیاره یک روز از یک سال بلندتر است؟"},
      choices:{en:["Venus","Mars","Jupiter"], fr:["Vénus","Mars","Jupiter"], fa:["زهره","مریخ","مشتری"]} },
    { answer:0, q:{en:"A comet grows a glowing tail when it is near…", fr:"Une comète déploie une queue lumineuse quand elle est près…", fa:"دنباله‌دار وقتی نزدیک … باشد دنباله‌ای درخشان می‌گیرد."},
      choices:{en:["the Sun","Earth","the Moon"], fr:["du Soleil","de la Terre","de la Lune"], fa:["خورشید","زمین","ماه"]} },
  ],
  [ // Stars
    { answer:0, q:{en:"Which colour of star is the hottest?", fr:"Quelle couleur d'étoile est la plus chaude ?", fa:"کدام رنگِ ستاره داغ‌ترین است؟"},
      choices:{en:["Blue","Red","Yellow"], fr:["Bleue","Rouge","Jaune"], fa:["آبی","سرخ","زرد"]} },
    { answer:0, q:{en:"A star like the Sun ends its life as a…", fr:"Une étoile comme le Soleil finit sa vie en…", fa:"ستاره‌ای مثل خورشید عمرش را به‌صورت … پایان می‌دهد."},
      choices:{en:["white dwarf","black hole","new planet"], fr:["naine blanche","trou noir","nouvelle planète"], fa:["کوتولهٔ سفید","سیاه‌چاله","سیارهٔ نو"]} },
    { answer:0, q:{en:"How many constellations are there?", fr:"Combien y a-t-il de constellations ?", fa:"چند صورت فلکی وجود دارد؟"},
      choices:{en:["88","12","1000"], fr:["88","12","1000"], fa:["۸۸","۱۲","۱۰۰۰"]} },
  ],
  [ // Galaxies & the Universe
    { answer:0, q:{en:"What shape is the Milky Way?", fr:"Quelle est la forme de la Voie lactée ?", fa:"شکل راه شیری چگونه است؟"},
      choices:{en:["A spiral","A cube","A ring"], fr:["Une spirale","Un cube","Un anneau"], fa:["مارپیچ","مکعب","حلقه"]} },
    { answer:0, q:{en:"About how long ago was the Big Bang?", fr:"Il y a environ combien de temps a eu lieu le Big Bang ?", fa:"مهبانگ تقریباً چند وقت پیش رخ داد؟"},
      choices:{en:["13.8 billion years","1 million years","100 years"], fr:["13,8 milliards d'années","1 million d'années","100 ans"], fa:["۱۳٫۸ میلیارد سال","۱ میلیون سال","۱۰۰ سال"]} },
    { answer:0, q:{en:"How much of the universe is the normal stuff we can see?", fr:"Quelle part de l'univers est la matière normale qu'on voit ?", fa:"چه مقدار از جهان همان مادهٔ معمولی است که می‌بینیم؟"},
      choices:{en:["About 5%","About 50%","About 95%"], fr:["Environ 5 %","Environ 50 %","Environ 95 %"], fa:["حدود ۵٪","حدود ۵۰٪","حدود ۹۵٪"]} },
  ],
  [ // Black Holes
    { answer:0, q:{en:"What can escape a black hole?", fr:"Qu'est-ce qui peut s'échapper d'un trou noir ?", fa:"چه چیزی می‌تواند از سیاه‌چاله بگریزد؟"},
      choices:{en:["Nothing, not even light","Only light","Fast rockets"], fr:["Rien, pas même la lumière","Seulement la lumière","Les fusées rapides"], fa:["هیچ‌چیز، حتی نور","فقط نور","موشک‌های سریع"]} },
    { answer:0, q:{en:"The edge of a black hole is called the…", fr:"Le bord d'un trou noir s'appelle…", fa:"لبهٔ سیاه‌چاله … نام دارد."},
      choices:{en:["event horizon","finish line","ring"], fr:["horizon des événements","ligne d'arrivée","anneau"], fa:["افق رویداد","خط پایان","حلقه"]} },
    { answer:0, q:{en:"The black hole at our galaxy's centre is called…", fr:"Le trou noir au centre de notre galaxie s'appelle…", fa:"سیاه‌چالهٔ مرکز کهکشان ما … نام دارد."},
      choices:{en:["Sagittarius A*","Polaris","Halley"], fr:["Sagittarius A*","Polaris","Halley"], fa:["کمان‌اِی‌* (Sagittarius A*)","ستارهٔ قطبی","هالی"]} },
  ],
  [ // Space Exploration
    { answer:0, q:{en:"A rocket pushes itself up by throwing gas…", fr:"Une fusée se propulse vers le haut en projetant du gaz…", fa:"موشک با پرتاب گاز به سمت … خود را بالا می‌راند."},
      choices:{en:["downwards","upwards","sideways"], fr:["vers le bas","vers le haut","sur le côté"], fa:["پایین","بالا","کنار"]} },
    { answer:0, q:{en:"Who explores Mars for us right now?", fr:"Qui explore Mars pour nous en ce moment ?", fa:"همین حالا چه کسی برای ما مریخ را کاوش می‌کند؟"},
      choices:{en:["Robots (rovers)","People living there","Nobody"], fr:["Des robots (rovers)","Des gens qui y vivent","Personne"], fa:["ربات‌ها (مریخ‌نوردها)","مردمی که آنجا زندگی می‌کنند","هیچ‌کس"]} },
    { answer:0, q:{en:"The James Webb telescope mainly sees in…", fr:"Le télescope James Webb voit surtout en…", fa:"تلسکوپ جیمز وب بیشتر در … می‌بیند."},
      choices:{en:["infrared light","sound","X-rays"], fr:["infrarouge","son","rayons X"], fa:["نور فروسرخ","صدا","پرتوهای ایکس"]} },
  ],
  [ // Stargazing Tips
    { answer:0, q:{en:"Before observing, let your eyes adjust to the dark for about…", fr:"Avant d'observer, laisse tes yeux s'habituer à l'obscurité pendant environ…", fa:"پیش از رصد، بگذار چشمانت حدود … به تاریکی عادت کنند."},
      choices:{en:["15–20 minutes","1 second","3 hours"], fr:["15–20 minutes","1 seconde","3 heures"], fa:["۱۵ تا ۲۰ دقیقه","۱ ثانیه","۳ ساعت"]} },
    { answer:0, q:{en:"A great, cheap first tool for stargazing is…", fr:"Un excellent premier outil, pas cher, pour observer est…", fa:"یک ابزارِ اولِ عالی و ارزان برای رصد … است."},
      choices:{en:["binoculars","a microscope","a camera flash"], fr:["des jumelles","un microscope","un flash d'appareil photo"], fa:["دوربین دوچشمی","میکروسکوپ","فلاش دوربین"]} },
    { answer:0, q:{en:"The best meteor showers are usually seen…", fr:"Les plus belles pluies d'étoiles filantes se voient surtout…", fa:"بهترین بارش‌های شهابی معمولاً … دیده می‌شوند."},
      choices:{en:["after midnight","at noon","at sunset"], fr:["après minuit","à midi","au coucher du soleil"], fa:["پس از نیمه‌شب","ظهر","هنگام غروب"]} },
  ],
];

// Extra questions per category — pooled with LEARN_QUIZ so each test picks a fresh random 3.
const LEARN_QUIZ_MORE = [
  [ // Solar System
    { answer:0, q:{en:"Which planet is famous for its beautiful rings?", fr:"Quelle planète est célèbre pour ses magnifiques anneaux ?", fa:"کدام سیاره به‌خاطر حلقه‌های زیبایش مشهور است؟"},
      choices:{en:["Saturn","Mars","Mercury"], fr:["Saturne","Mars","Mercure"], fa:["زحل","مریخ","عطارد"]} },
    { answer:0, q:{en:"Which is the largest planet?", fr:"Quelle est la plus grande planète ?", fa:"بزرگ‌ترین سیاره کدام است؟"},
      choices:{en:["Jupiter","Earth","Venus"], fr:["Jupiter","la Terre","Vénus"], fa:["مشتری","زمین","زهره"]} },
    { answer:0, q:{en:"The four planets nearest the Sun are made mostly of…", fr:"Les quatre planètes les plus proches du Soleil sont surtout faites de…", fa:"چهار سیارهٔ نزدیک به خورشید بیشتر از … ساخته شده‌اند."},
      choices:{en:["rock and metal","gas","ice"], fr:["roche et métal","gaz","glace"], fa:["سنگ و فلز","گاز","یخ"]} },
  ],
  [ // Stars
    { answer:0, q:{en:"Stars are born inside giant clouds called…", fr:"Les étoiles naissent dans d'immenses nuages appelés…", fa:"ستاره‌ها درون ابرهای عظیمی به نام … زاده می‌شوند."},
      choices:{en:["nebulae","black holes","comets"], fr:["nébuleuses","trous noirs","comètes"], fa:["سحابی‌ها","سیاه‌چاله‌ها","دنباله‌دارها"]} },
    { answer:0, q:{en:"The iron in your blood was made inside…", fr:"Le fer de ton sang a été fabriqué dans…", fa:"آهنِ خون تو درون … ساخته شده است."},
      choices:{en:["stars","the ocean","volcanoes"], fr:["des étoiles","l'océan","des volcans"], fa:["ستاره‌ها","اقیانوس","آتشفشان‌ها"]} },
    { answer:0, q:{en:"A red star is ___ than a blue star.", fr:"Une étoile rouge est ___ qu'une étoile bleue.", fa:"یک ستارهٔ سرخ از یک ستارهٔ آبی … است."},
      choices:{en:["cooler","hotter","heavier"], fr:["plus froide","plus chaude","plus lourde"], fa:["سردتر","داغ‌تر","سنگین‌تر"]} },
  ],
  [ // Galaxies & the Universe
    { answer:0, q:{en:"The invisible stuff that holds galaxies together is called…", fr:"La matière invisible qui maintient les galaxies s'appelle…", fa:"مادهٔ نامرئی‌ای که کهکشان‌ها را کنار هم نگه می‌دارد … نام دارد."},
      choices:{en:["dark matter","moonlight","fog"], fr:["la matière noire","le clair de lune","le brouillard"], fa:["مادهٔ تاریک","مهتاب","مه"]} },
    { answer:0, q:{en:"About how many galaxies are in the observable universe?", fr:"Environ combien de galaxies compte l'univers observable ?", fa:"در جهان قابل‌مشاهده تقریباً چند کهکشان هست؟"},
      choices:{en:["About 2 trillion","About 100","About 5"], fr:["Environ 2 000 milliards","Environ 100","Environ 5"], fa:["حدود ۲ تریلیون","حدود ۱۰۰","حدود ۵"]} },
    { answer:0, q:{en:"The leftover glow of the Big Bang fills…", fr:"La lueur résiduelle du Big Bang remplit…", fa:"پس‌تابِ مهبانگ … را پر کرده است."},
      choices:{en:["the whole sky","only Earth","only the Sun"], fr:["tout le ciel","seulement la Terre","seulement le Soleil"], fa:["تمام آسمان","فقط زمین","فقط خورشید"]} },
  ],
  [ // Black Holes
    { answer:0, q:{en:"Falling into a black hole, gravity would stretch you like…", fr:"En tombant dans un trou noir, la gravité t'étirerait comme…", fa:"با افتادن در سیاه‌چاله، گرانش تو را مثل … می‌کشد."},
      choices:{en:["spaghetti","a football","a cloud"], fr:["un spaghetti","un ballon","un nuage"], fa:["اسپاگتی","یک توپ","یک ابر"]} },
    { answer:0, q:{en:"Black holes form when a giant star…", fr:"Les trous noirs se forment quand une étoile géante…", fa:"سیاه‌چاله‌ها وقتی شکل می‌گیرند که ستاره‌ای غول‌پیکر…"},
      choices:{en:["collapses at the end of its life","gets cold","becomes a planet"], fr:["s'effondre en fin de vie","refroidit","devient une planète"], fa:["در پایان عمرش فرومی‌پاشد","سرد می‌شود","به سیاره تبدیل می‌شود"]} },
    { answer:0, q:{en:"The first-ever photo of a black hole was taken in…", fr:"La toute première photo d'un trou noir a été prise en…", fa:"نخستین عکس یک سیاه‌چاله در سال … گرفته شد."},
      choices:{en:["2019","1969","1500"], fr:["2019","1969","1500"], fa:["۲۰۱۹","۱۹۶۹","۱۵۰۰"]} },
  ],
  [ // Space Exploration
    { answer:0, q:{en:"The first people walked on the Moon in…", fr:"Les premiers humains ont marché sur la Lune en…", fa:"نخستین انسان‌ها در سال … روی ماه راه رفتند."},
      choices:{en:["1969","2020","1500"], fr:["1969","2020","1500"], fa:["۱۹۶۹","۲۰۲۰","۱۵۰۰"]} },
    { answer:0, q:{en:"To reach orbit, a rocket must go about…", fr:"Pour se mettre en orbite, une fusée doit aller à environ…", fa:"برای رسیدن به مدار، یک موشک باید با سرعت حدود … برود."},
      choices:{en:["28,000 km/h","100 km/h","5 km/h"], fr:["28 000 km/h","100 km/h","5 km/h"], fa:["۲۸٬۰۰۰ کیلومتر بر ساعت","۱۰۰ کیلومتر بر ساعت","۵ کیلومتر بر ساعت"]} },
    { answer:0, q:{en:"The little helicopter that flew on Mars was named…", fr:"Le petit hélicoptère qui a volé sur Mars s'appelait…", fa:"بالگرد کوچکی که روی مریخ پرواز کرد … نام داشت."},
      choices:{en:["Ingenuity","Concorde","Apollo"], fr:["Ingenuity","Concorde","Apollo"], fa:["نبوغ (Ingenuity)","کنکورد","آپولو"]} },
  ],
  [ // Stargazing Tips
    { answer:0, q:{en:"With binoculars you can spot the four biggest moons of…", fr:"Aux jumelles, tu peux repérer les quatre plus grandes lunes de…", fa:"با دوربین دوچشمی می‌توانی چهار قمر بزرگِ … را ببینی."},
      choices:{en:["Jupiter","the Sun","Mars"], fr:["Jupiter","du Soleil","de Mars"], fa:["مشتری","خورشید","مریخ"]} },
    { answer:0, q:{en:"We always see the same ___ of the Moon.", fr:"On voit toujours la même ___ de la Lune.", fa:"ما همیشه یک … ماه را می‌بینیم."},
      choices:{en:["side","colour","size"], fr:["face","couleur","taille"], fa:["رو","رنگ","اندازه"]} },
    { answer:0, q:{en:"From a truly dark place, about how many stars can you see with your eyes?", fr:"Depuis un lieu vraiment sombre, environ combien d'étoiles vois-tu à l'œil nu ?", fa:"از جایی واقعاً تاریک، تقریباً چند ستاره با چشم می‌بینی؟"},
      choices:{en:["About 3,000","About 10","Millions"], fr:["Environ 3 000","Environ 10","Des millions"], fa:["حدود ۳٬۰۰۰","حدود ۱۰","میلیون‌ها"]} },
  ],
];

const Learn = {
  started: false, view: "cats", cat: 0, open: -1,
  qz: false, qi: 0, qs: 0, qa: false, qShuffled: null, qRound: [], spot: null, topicOrder: [], SHOW: 4,

  enter() {
    if (!this.started) { this.started = true; document.addEventListener("language-changed", () => this.repaint()); }
    // Opening the Learn tab always starts fresh at the subjects grid, with a new spotlight.
    this.qz = false; this.view = "cats"; this.open = -1;
    this.spot = this._randomTopic();
    this.paintCats();
  },
  L(o) { const l = (window.I18N && I18N.lang) || "en"; return (o[l] != null) ? o[l] : o.en; },
  _shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
  _topics(ci) { return LEARN[ci].topics.concat(LEARN_MORE[ci] || []); },
  _randomTopic() {
    const ci = Math.floor(Math.random() * LEARN.length);
    const ti = Math.floor(Math.random() * this._topics(ci).length);
    // avoid repeating the previous spotlight when possible
    if (this.spot && this.spot.ci === ci && this.spot.ti === ti && this._topics(ci).length > 1) return this._randomTopic();
    return { ci, ti };
  },
  // open a category with a fresh random selection of topics (optionally forcing one in)
  openCat(ci, forceTi) {
    this.cat = ci;
    const total = this._topics(ci).length;
    const idxs = this._shuffle(Array.from({ length: total }, (_, i) => i)).slice(0, Math.min(this.SHOW, total));
    if (forceTi != null && !idxs.includes(forceTi)) idxs[idxs.length - 1] = forceTi;
    this.topicOrder = idxs;
    this.open = (forceTi != null) ? forceTi : -1;
    this.paintTopics();
  },
  host() { return U.el("learn-app"); },
  // full pool for a category = base 3 + extra 3
  _pool() { return (LEARN_QUIZ[this.cat] || []).concat(LEARN_QUIZ_MORE[this.cat] || []); },
  repaint() {
    if (this.qz) return (this.qi >= this.qRound.length) ? this.paintResult() : this.paintQuiz();
    this.view === "topics" ? this.paintTopics() : this.paintCats();
  },

  paintCats() {
    this.view = "cats"; this.qz = false;
    if (!this.spot) this.spot = this._randomTopic();
    const sc = LEARN[this.spot.ci], stp = this._topics(this.spot.ci)[this.spot.ti];
    const cards = LEARN.map((c, i) => `
      <button class="learn-card" data-i="${i}" style="--lc:${c.color}">
        <div class="learn-emoji">${c.emoji}</div>
        <div class="learn-cname">${U.esc(this.L(c.name))}</div>
        <div class="learn-count">${this._topics(i).length} ${t("learn.topics")}</div>
      </button>`).join("");
    this.host().innerHTML = `
      <div class="panel learn-spot" style="--lc:${sc.color}">
        <div class="learn-spot-tag">✨ ${t("learn.spotlight")} · ${sc.emoji} ${U.esc(this.L(sc.name))}</div>
        <div class="learn-spot-title">${U.esc(this.L(stp.title))}</div>
        <p class="learn-spot-body">${U.esc(this.L(stp.body))}</p>
        <div class="learn-wow">${U.esc(this.L(stp.wow))}</div>
        <div class="learn-spot-actions">
          <button class="btn small" id="learn-spot-more">${t("learn.another")}</button>
          <button class="btn small learn-ghost" id="learn-spot-open">${t("learn.explore")}</button>
        </div>
      </div>
      <div class="panel">
        <div class="section-title">📚 ${t("learn.title")}</div>
        <p class="small muted" style="margin:2px 0 16px;">${t("learn.intro")}</p>
        <div class="learn-grid">${cards}</div>
      </div>`;
    U.el("learn-spot-more").addEventListener("click", () => { this.spot = this._randomTopic(); this.paintCats(); });
    U.el("learn-spot-open").addEventListener("click", () => this.openCat(this.spot.ci, this.spot.ti));
    this.host().querySelectorAll(".learn-card").forEach(b =>
      b.addEventListener("click", () => this.openCat(parseInt(b.dataset.i, 10))));
  },

  paintTopics() {
    this.view = "topics"; this.qz = false;
    const c = LEARN[this.cat];
    const topics = this._topics(this.cat);
    if (!this.topicOrder || !this.topicOrder.length)
      this.topicOrder = this._shuffle(topics.map((_, i) => i)).slice(0, Math.min(this.SHOW, topics.length));
    const items = this.topicOrder.map((ti) => { const tp = topics[ti]; return `
      <div class="learn-topic ${this.open === ti ? "open" : ""}" data-i="${ti}">
        <button class="learn-thead">${U.esc(this.L(tp.title))}<span class="learn-caret">▾</span></button>
        <div class="learn-tbody">
          <p>${U.esc(this.L(tp.body))}</p>
          <div class="learn-wow">${U.esc(this.L(tp.wow))}</div>
        </div>
      </div>`; }).join("");
    this.host().innerHTML = `
      <div class="panel">
        <button class="btn small learn-back" id="learn-back">${t("learn.back")}</button>
        <div class="section-title" style="--lc:${c.color};color:var(--lc);margin-top:12px;">${c.emoji} ${U.esc(this.L(c.name))}</div>
        ${items}
        <button class="btn learn-test" id="learn-test">${t("learn.test")}</button>
      </div>`;
    U.el("learn-back").addEventListener("click", () => this.paintCats());
    U.el("learn-test").addEventListener("click", () => this.startQuiz());
    this.host().querySelectorAll(".learn-topic").forEach(el =>
      el.querySelector(".learn-thead").addEventListener("click", () => {
        const i = parseInt(el.dataset.i, 10);
        this.open = (this.open === i) ? -1 : i;
        this.paintTopics();
      }));
  },

  // ---- mini-quiz ----
  startQuiz() {
    // pick a fresh random 3 questions from the pool each time
    this.qRound = this._shuffle(this._pool().slice()).slice(0, 3);
    this.qz = true; this.qi = 0; this.qs = 0; this.qa = false; this.paintQuiz();
  },

  paintQuiz() {
    this.qz = true;
    const qs = this.qRound, q = qs[this.qi], c = LEARN[this.cat];
    const ch = this.L(q.choices).map((text, idx) => ({ text, correct: idx === q.answer }));
    for (let i = ch.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ch[i], ch[j]] = [ch[j], ch[i]]; }
    this.qShuffled = ch; this.qa = false;
    this.host().innerHTML = `
      <div class="panel">
        <div class="quiz-top">
          <span class="quiz-lvl" style="--lc:${c.color}">${c.emoji} ${U.esc(this.L(c.name))}</span>
          <span class="quiz-progress">${this.qi + 1} / ${qs.length}</span>
        </div>
        <div class="quiz-q">${U.esc(this.L(q.q))}</div>
        <div class="quiz-choices">${ch.map((o, i) => `<button class="quiz-choice" data-i="${i}">${U.esc(o.text)}</button>`).join("")}</div>
        <div class="quiz-feedback" id="learn-qfb"></div>
      </div>`;
    this.host().querySelectorAll(".quiz-choice").forEach(b => b.addEventListener("click", () => this.answerQ(parseInt(b.dataset.i, 10))));
  },

  answerQ(i) {
    if (this.qa) return;
    this.qa = true;
    const correct = this.qShuffled[i].correct;
    if (correct) this.qs++;
    this.host().querySelectorAll(".quiz-choice").forEach((b, bi) => {
      b.classList.add("locked");
      if (this.qShuffled[bi].correct) b.classList.add("right");
      else if (bi === i) b.classList.add("wrong");
    });
    const last = this.qi === this.qRound.length - 1;
    U.el("learn-qfb").innerHTML = `
      <div class="quiz-verdict ${correct ? "ok" : "no"}">${correct ? t("learn.correct") : t("learn.wrong")}</div>
      <button class="btn quiz-next" id="learn-qnext">${last ? t("learn.seeResult") : t("learn.next")}</button>`;
    U.el("learn-qnext").addEventListener("click", () => this.nextQ());
  },

  nextQ() { this.qi++; this.qa = false; (this.qi >= this.qRound.length) ? this.paintResult() : this.paintQuiz(); },

  paintResult() {
    const n = this.qRound.length, s = this.qs;
    const good = Math.ceil(n * 0.6);
    const msg = s === n ? t("learn.rPerfect") : s >= good ? t("learn.rGood") : t("learn.rLow");
    const emoji = s === n ? "🌟" : s >= good ? "👍" : "📚";
    this.host().innerHTML = `
      <div class="panel quiz-center">
        <div class="quiz-logo">${emoji}</div>
        <div class="quiz-bigscore">${s} / ${n}</div>
        <p class="quiz-intro">${t("learn.scoreLine", { s, n })} ${U.esc(msg)}</p>
        <div class="quiz-actions">
          <button class="btn quiz-start" id="learn-qagain">${t("learn.again")}</button>
          <button class="btn quiz-ghost" id="learn-qback">${t("learn.backTopics")}</button>
        </div>
      </div>`;
    U.el("learn-qagain").addEventListener("click", () => this.startQuiz());
    U.el("learn-qback").addEventListener("click", () => this.paintTopics());
  }
};

window.Learn = Learn;
