/* =============================================================================
   newsletter/email.js  —  builds the weekly "Your sky this week" email (EN/FR)
   Pure string-building (no DOM), so the same code runs in the browser preview
   (newsletter/preview.html) and on GitHub's servers for the weekly job.
   It reuses the site's own modules, which must be loaded first: Astronomy,
   CONFIG, I18N/t, U, FACTS_EN/FR, Events, Tonight, Highlights (HL_DSO), Sky
   (CONS_FR, DSO_INFO, EXTRA_DSOS), QUIZ_BANK and newsletter/extras.js — so the email always says the
   same thing as the website.
   ============================================================================= */

// One edition for France: times are computed for the centre of the country.
const NL_PLACE = { lat: 46.6, lon: 2.4, elevation: 150 };

const NL_STR = {
  en: {
    brand: "Thomas Nima's Observatory", kicker: "Destination Space",
    title: "Your sky this week", place: "central France", forPlace: "times for {place}",
    hello: "Hello, stargazers! Here's your programme for the week.",
    skyIntro: "Most of these wonders need no telescope at all.",
    sights: "The best sights to look for", from: "From {t}",
    sightsFoot: "Picked for the evening, before 23:00. Stars and deep-sky objects rise about 4 minutes earlier each night, so these stay well placed all week; the Moon and planets move more.",
    moon: "The Moon this week", moonTonight: "Tonight: {phase}, {pct}% lit.",
    dark: "Darkest evenings for faint objects: {days}.",
    darkAll: "The Moon stays out of the way every evening this week — great for faint galaxies and nebulae.",
    noDark: "The Moon is bright every evening this week — perfect for exploring its craters with binoculars, harder for faint galaxies.",
    events: "This week", noEvents: "No special events this week — a perfect time to hunt for the sights above.",
    comingUp: "Coming up",
    object: "Object of the week", con: "Constellation: {con}", objWhere: "Around 22:00 look {dir}, {alt}° high",
    news: "Space news", newsNote: "", launches: "Next rocket launches",
    apod: "NASA picture of the day", apodVideo: "Today it's a video — watch it on NASA's site",
    fact: "Fact of the week",
    quiz: "Quiz of the week", quizHint: "Think you know? The answer is in next week's email.",
    lastAnswer: "Last week's answer",
    challenge: "Challenge of the week",
    anniv: "This week in space history", annivAgo: "{n} years ago · {date}",
    thomas: "A note from Thomas", thomasThings: "What caught my eye this week", readMore: "Read more", inFrench: "(in French)",
    noReply: "Please don't reply to this email, replies aren't read. To write to us, use the “Write to me” form on the About page at",
    cta: "Open the live sky map",
    footer: "You're receiving this because you signed up at thomasnima.com.", unsub: "Unsubscribe",
    subject: "🚀 Destination Space · your sky this week, {range}",
    preheader: "{lead} — plus the Moon, this week's events, space news and a quiz.",
  },
  fr: {
    brand: "L'Observatoire de Thomas Nima", kicker: "Cap sur l'espace",
    title: "Ton ciel cette semaine", place: "le centre de la France", forPlace: "heures pour {place}",
    hello: "Bonjour les astronomes en herbe ! Voici ton programme de la semaine.",
    skyIntro: "La plupart de ces merveilles se voient sans télescope.",
    sights: "Les plus beaux objets à observer", from: "Dès {t}",
    sightsFoot: "Choisis pour la soirée, avant 23:00. Les étoiles et les objets du ciel profond se lèvent environ 4 minutes plus tôt chaque soir : ils restent bien placés toute la semaine ; la Lune et les planètes bougent davantage.",
    moon: "La Lune cette semaine", moonTonight: "Ce soir : {phase}, éclairée à {pct} %.",
    dark: "Soirées les plus sombres pour les objets faibles : {days}.",
    darkAll: "La Lune ne gêne aucune soirée cette semaine — idéal pour les galaxies et nébuleuses faibles.",
    noDark: "La Lune est brillante tous les soirs cette semaine — parfait pour explorer ses cratères aux jumelles, plus difficile pour les galaxies faibles.",
    events: "Cette semaine", noEvents: "Pas d'événement particulier cette semaine — le moment idéal pour chercher les objets ci-dessus.",
    comingUp: "Bientôt",
    object: "L'objet de la semaine", con: "Constellation : {con}", objWhere: "Vers 22:00, regarde vers {dir}, à {alt}° de hauteur",
    news: "Actualités spatiales", newsNote: "(articles en anglais)", launches: "Prochains lancements",
    apod: "L'image astronomique du jour (NASA)", apodVideo: "Aujourd'hui c'est une vidéo — à voir sur le site de la NASA",
    fact: "Le fait de la semaine",
    quiz: "Le quiz de la semaine", quizHint: "Tu crois savoir ? La réponse sera dans l'e-mail de la semaine prochaine.",
    lastAnswer: "Réponse de la semaine dernière",
    challenge: "Le défi de la semaine",
    anniv: "Cette semaine dans l'histoire de l'espace", annivAgo: "Il y a {n} ans · {date}",
    thomas: "Le mot de Thomas", thomasThings: "Ce qui m'a intéressé cette semaine", readMore: "En savoir plus", inFrench: "",
    noReply: "Merci de ne pas répondre à cet e-mail : les réponses ne sont pas lues. Pour nous écrire, utilise le formulaire « Écris-moi » de la page À propos sur",
    cta: "Ouvrir la carte du ciel en direct",
    footer: "Cet e-mail t'est envoyé suite à ton inscription sur thomasnima.com.", unsub: "Se désinscrire",
    subject: "🚀 Cap sur l'espace · ton ciel du {range}",
    preheader: "{lead} — et aussi la Lune, les événements, l'actu spatiale et un quiz.",
  },
};

// Best-sights entries (HL_DSO keys) → catalog designation, so the object of the
// week is always something not already in tonight's list.
const NL_HL_DESIG = { pleiades: "M45", orion: "M42", andromeda: "M31", beehive: "M44", m13: "M13",
  double: "hPer", lagoon: "M8", omegacen: "ωCen", m22: "M22", m7: "M7", ring: "M57", whirlpool: "M51" };

// Email palette + font (inline styles only — email clients ignore <style> blocks)
const NL_C = { bg: "#05060d", card: "#141a30", border: "#263055", text: "#e8ecf8", dim: "#9aa6c4",
  faint: "#6b779a", accent: "#7db4ff", gold: "#ffcf6b", violet: "#b98cff" };
const NL_F = "'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const NL = {
  // Remote data the email uses. Same APIs as the website's News & Space Live tabs.
  SOURCES: {
    news: "https://api.spaceflightnewsapi.net/v4/articles/?limit=3&ordering=-published_at",
    launches: "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=3&hide_recent_previous=true",
    apod: () => `https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(CONFIG.NASA_API_KEY)}&thumbs=true`,
    // Thomas's weekly note: the "Newsletter" tab of the Google Form's spreadsheet,
    // published as CSV. That tab keeps only answers sent from the parent's Google
    // account, without the email column.
    thomas: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR-W6nGmoPuKAF47NnJtvK8IydlPe-oQ4s8wRkiHPfkwbF9gT-PIkf5kZG-x1K584dyv3F5gfegjLP-/pub?gid=2134035130&single=true&output=csv",
  },

  // Fetch news/launches/APOD/Thomas's notes and normalise them. dsosJSON is the site's
  // data/dsos.bright.json (the caller loads it: fetch in a browser, a file on GitHub).
  async fetchAll(dsosJSON) {
    const get = async (url) => { try { const r = await fetch(url); return r.ok ? await r.json() : null; } catch (e) { return null; } };
    const text = async (url) => { try { const r = await fetch(url); return r.ok ? await r.text() : ""; } catch (e) { return ""; } };
    const [nj, lj, aj, tc] = await Promise.all([get(this.SOURCES.news), get(this.SOURCES.launches), get(this.SOURCES.apod()), text(this.SOURCES.thomas)]);
    return {
      thomas: this.csv(tc).slice(1),                    // rows without the header line
      dsos: ((dsosJSON && dsosJSON.features) || []).concat(EXTRA_DSOS),
      news: ((nj && nj.results) || []).map(a => ({ title: a.title, url: a.url, site: a.news_site })),
      launches: ((lj && lj.results) || []).map(l => ({ name: l.name, net: l.net,
        provider: l.launch_service_provider && l.launch_service_provider.name,
        where: l.pad && l.pad.location && l.pad.location.name })),
      apod: aj && aj.title ? aj : null,
    };
  },

  build({ lang = "en", date = new Date(), dsos = [], news = [], launches = [], apod = null, thomas = [],
          siteUrl = "https://thomasnima.com", unsubscribeUrl = "#" } = {}) {
    globalThis.LOC = globalThis.LOC || {};
    const prevLang = I18N.lang, prevLoc = LOC.current;
    I18N.lang = lang;
    LOC.current = { ...NL_PLACE, name: NL_STR[lang].place };   // highlights.js reads LOC.current
    try { return this._build(lang, date, { dsos, news, launches, apod, thomas, siteUrl, unsubscribeUrl }); }
    finally { I18N.lang = prevLang; LOC.current = prevLoc; }
  },

  _build(lang, date, d) {
    const S = NL_STR[lang];
    const s = (k, vars) => this.fill(S[k], vars);
    const loc = lang === "fr" ? "fr-FR" : "en-GB";
    const start = this.dayAt(date, 0, 0), end = this.dayAt(date, 7, 0);
    const week = Math.floor(start.getTime() / (7 * 864e5));   // rotates fact / object / quiz weekly
    const obs = new Astronomy.Observer(NL_PLACE.lat, NL_PLACE.lon, NL_PLACE.elevation);

    let sights = { list: [], milkyway: false };
    try { sights = Highlights.compute({ untilHour: 23, date }); } catch (e) {}   // family-friendly: evening only
    sights.list = sights.list.slice(0, 6);
    const moon = this.moon(start, obs);
    const ev = this.events(start, end);
    const obj = this.objectOfWeek(start, d.dsos, this.featured(sights.list), week);
    const quiz = this.quiz(week, lang);
    const facts = lang === "fr" ? FACTS_FR : FACTS_EN;
    const fact = facts.length ? facts[this.mod(week, facts.length)] : "";
    const challenge = this.challenge(start, moon, week);
    const anniv = this.anniversary(start, end, week);
    const note = this.thomasNote(d.thomas, date);

    const range = this.range(start, this.dayAt(date, 6, 0), loc);
    const lead = ev.week[0] ? ev.week[0].title : (sights.list[0] ? this.cap(sights.list[0].name) : S.title);
    const subject = s("subject", { range });
    const preheader = s("preheader", { lead });

    const E = U.esc;
    const C = NL_C;
    const P = (txt, extra = "") => `<div style="font-size:14px;line-height:1.6;color:${C.dim};${extra}">${txt}</div>`;
    const sections = [];

    // ✍️ Thomas's own words, first — only when he wrote something this week.
    // His English box is optional: if it's empty, the French text is shown, marked as such.
    if (note) {
      const pick = (fr, en) => lang === "en" && en ? { txt: en, fr: false } : { txt: fr, fr: lang === "en" && !!fr };
      const lines = (txt) => E(txt).replace(/\r?\n/g, "<br>");
      const inFr = (p) => p.fr ? ` <span style="font-size:12px;color:${C.faint};">${E(S.inFrench)}</span>` : "";
      const msg = pick(note.fr, note.en);
      const things = note.things.map(th => {
        const p = pick(th.fr, th.en);
        if (!p.txt) return "";
        const [title, ...rest] = p.txt.trim().split(/\r?\n/);
        return `<div style="margin-top:12px;padding:12px 14px;border-radius:10px;background:#0e1326;border:1px solid ${C.border};">
          <div style="font-size:15px;font-weight:700;color:${C.text};">${E(title)}${inFr(p)}</div>
          ${rest.join("").trim() ? P(lines(rest.join("\n").trim()), "margin-top:4px;") : ""}
          ${th.link ? `<div style="margin-top:6px;font-size:13px;"><a href="${E(th.link)}" style="color:${C.accent};">${E(S.readMore)} →</a></div>` : ""}</div>`;
      }).join("");
      sections.push(this.card("✍️", S.thomas, `
        <div style="font-size:15.5px;line-height:1.65;color:${C.text};">${lines(msg.txt)}${inFr(msg)}</div>
        <div style="font-size:14px;color:${C.gold};font-weight:700;margin-top:8px;">— Thomas</div>
        ${things ? `<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C.faint};font-weight:700;margin:16px 0 0;">🔎 ${E(S.thomasThings)}</div>${things}` : ""}`));
    }

    // heading for the sky part of the email (best sights to object of the week)
    sections.push(`<tr><td style="padding:12px 4px 16px;font-family:${NL_F};">
      <div style="font-size:24px;font-weight:800;color:${C.text};line-height:1.2;">🔭 ${E(S.title)}</div>
      <div style="font-size:14px;color:${C.dim};margin-top:6px;line-height:1.55;">${E(S.skyIntro)} ${E(this.cap(s("forPlace", { place: S.place })))}.</div>
    </td></tr>`);

    // 🌟 the best sights — the same ranking as the website's Tonight tab
    if (sights.list.length) {
      const rows = sights.list.map(o => this.row(o.emoji, `
        <div style="font-size:15px;font-weight:700;color:${C.text};">${E(this.cap(o.name))}
          <span style="font-size:11px;font-weight:700;color:${C.gold};text-transform:uppercase;letter-spacing:1px;">&nbsp;${E(t("hl.inst_" + o.inst))}</span></div>
        ${P(E(this.cap(o.blurb)), "font-size:13px;margin-top:2px;")}
        <div style="font-size:12.5px;color:${C.accent};margin-top:4px;">🕒 ${E(s("from", { t: U.timeHMS(o.bestTime).slice(0, 5) }))} · 🧭 ${E(t("hl.look", { dir: U.compass(o.bestAz), alt: Math.round(o.bestAlt) }))}</div>`)).join("");
      sections.push(this.card("🌟", S.sights, rows
        + (sights.milkyway ? P("🌌 " + E(t("hl.milkyway")), "font-size:13px;margin-top:12px;") : "")
        + P(E(S.sightsFoot), `font-size:12px;color:${C.faint};margin-top:12px;`)));
    }

    // 🌙 the Moon
    {
      const qs = moon.qs.map(q => `<div style="font-size:14px;color:${C.text};margin-top:6px;">${q.emoji} <b>${E(q.name)}</b>
        <span style="color:${C.dim};">— ${E(this.when(q.date, loc, true))}</span></div>`).join("");
      const darkTxt = moon.dark.length === 7 ? S.darkAll : moon.dark.length === 0 ? S.noDark
        : s("dark", { days: moon.dark.map(x => x.toLocaleDateString(loc, { weekday: "long" })).join(", ") });
      sections.push(this.card("🌙", S.moon, `
        <div style="font-size:16px;color:${C.text};"><span style="font-size:26px;vertical-align:middle;">${moon.emoji}</span>&nbsp; ${E(s("moonTonight", { phase: moon.phase, pct: moon.pct }))}</div>
        ${qs}${P(E(darkTxt), "margin-top:10px;")}`));
    }

    // 🎯 challenge of the week — a small observing mission that works this month
    if (challenge) sections.push(this.card("🎯", S.challenge, `
      <div style="font-size:17px;font-weight:800;color:${C.gold};">${challenge.emoji} ${E(challenge.title[lang])}
        <span style="font-size:11px;font-weight:700;color:${C.accent};text-transform:uppercase;letter-spacing:1px;">&nbsp;${E(t("hl.inst_" + challenge.inst))}</span></div>
      <div style="font-size:14.5px;line-height:1.6;color:${C.text};margin-top:8px;">${E(challenge.how[lang])}</div>`));

    // 📅 events this week (+ what's coming next)
    {
      const evRow = (e, small) => this.row(e.emoji, `
        <div style="font-size:${small ? 14 : 15}px;font-weight:700;color:${C.text};">${E(e.title)}</div>
        <div style="font-size:12.5px;color:${C.accent};margin-top:2px;">${E(this.when(e.date, loc, !["meteor", "season"].includes(e.type)))}</div>
        ${small ? "" : P(E(e.desc), "font-size:13px;margin-top:3px;")}`);
      const body = ev.week.length ? ev.week.map(e => evRow(e, false)).join("") : P(E(S.noEvents));
      const next = ev.next.length ? `<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C.faint};font-weight:700;margin:16px 0 2px;">${E(S.comingUp)}</div>`
        + ev.next.map(e => evRow(e, true)).join("") : "";
      sections.push(this.card("📅", S.events, body + next));
    }

    // 🌌 object of the week
    if (obj) sections.push(this.card("🌌", S.object, `
      <div style="font-size:20px;font-weight:800;color:${C.gold};">${E(obj.name)}</div>
      <div style="font-size:13px;color:${C.violet};margin-top:2px;">${E(obj.desig)} · ${E(obj.type)} · ${E(s("con", { con: obj.con }))}</div>
      ${P(E(obj.desc), "margin-top:8px;")}
      <div style="font-size:13px;color:${C.accent};margin-top:8px;">🧭 ${E(s("objWhere", { dir: obj.dir, alt: obj.alt }))} · ${E(t("hl.inst_" + obj.inst))}</div>`));

    // 🚀 news + launches
    if (d.news.length || d.launches.length) {
      const news = d.news.map(a => `<div style="margin-top:8px;font-size:14px;line-height:1.45;">
        <a href="${E(a.url)}" style="color:${C.accent};text-decoration:none;font-weight:600;">${E(a.title)}</a>
        <span style="color:${C.faint};font-size:12px;"> — ${E(a.site || "")}</span></div>`).join("");
      const launches = d.launches.map(l => { const dt = new Date(l.net); return `<div style="margin-top:8px;font-size:14px;line-height:1.45;color:${C.text};">
        🚀 <b>${E(l.name)}</b><br><span style="color:${C.dim};font-size:12.5px;">${E(this.when(dt, loc, true))}${l.provider ? " · " + E(l.provider) : ""}${l.where ? " · " + E(l.where) : ""}</span></div>`; }).join("");
      sections.push(this.card("🚀", S.news + (S.newsNote ? ` <span style="text-transform:none;letter-spacing:0;font-weight:400;">${E(S.newsNote)}</span>` : ""),
        news + (launches ? `<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C.faint};font-weight:700;margin:16px 0 0;">${E(S.launches)}</div>${launches}` : "")));
    }

    // 🖼️ NASA picture of the day
    if (d.apod) {
      const page = "https://apod.nasa.gov/apod/astropix.html";
      const img = d.apod.media_type === "image" ? d.apod.url : (d.apod.thumbnail_url || "");
      sections.push(this.card("🖼️", S.apod, (img
        ? `<a href="${E(page)}"><img src="${E(img)}" alt="${E(d.apod.title)}" width="540" style="display:block;width:100%;max-width:540px;height:auto;border-radius:10px;border:0;"></a>`
        : "")
        + `<div style="font-size:15px;font-weight:700;margin-top:${img ? 10 : 0}px;"><a href="${E(page)}" style="color:${C.text};text-decoration:none;">${E(d.apod.title)}</a></div>`
        + (d.apod.media_type === "image" ? "" : P(`<a href="${E(page)}" style="color:${C.accent};">${E(S.apodVideo)} →</a>`, "font-size:13px;margin-top:4px;"))));
    }

    // 🧑‍🚀 this week in space history
    if (anniv) sections.push(this.card("🧑‍🚀", S.anniv, `
      <div style="font-size:13px;font-weight:700;color:${C.accent};">${E(s("annivAgo", { n: anniv.ago, date: anniv.date.toLocaleDateString(loc, { day: "numeric", month: "long", year: "numeric" }) }))}</div>
      <div style="font-size:15px;line-height:1.6;color:${C.text};margin-top:6px;">${anniv.a.emoji} ${E(anniv.a[lang])}</div>`));

    // ✨ fact (site content — contains <b> tags, so not escaped)
    if (fact) sections.push(this.card("✨", S.fact, `<div style="font-size:15px;line-height:1.6;color:${C.text};">${fact}</div>`));

    // 🧠 quiz (+ last week's answer)
    if (quiz) {
      const L = (o) => (o[lang] != null ? o[lang] : o.en);
      const cur = quiz.cur, prev = quiz.prev, ch = L(cur.q.choices);
      const choices = cur.order.map((ci, i) => `<div style="font-size:14px;color:${C.text};margin-top:6px;">
        <b style="color:${C.accent};">${"ABCD"[i]}.</b> ${E(ch[ci])}</div>`).join("");
      const pch = L(prev.q.choices);
      sections.push(this.card("🧠", S.quiz, `
        <div style="font-size:15px;font-weight:700;color:${C.text};">${E(L(cur.q.q))}</div>${choices}
        ${P(E(S.quizHint), `font-size:12.5px;font-style:italic;margin-top:10px;`)}
        <div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:#0e1326;border:1px solid ${C.border};">
          <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${C.faint};font-weight:700;">${E(S.lastAnswer)}</div>
          <div style="font-size:13.5px;color:${C.text};margin-top:4px;">${E(L(prev.q.q))}</div>
          <div style="font-size:13.5px;color:${C.gold};margin-top:4px;font-weight:700;">${"ABCD"[prev.correctPos]}. ${E(pch[prev.q.answer])}</div>
          ${P(E(L(prev.q.exp)), "font-size:13px;margin-top:2px;")}
        </div>`));
    }

    const html = this.page(lang, subject, preheader, `
      <tr><td style="padding:8px 4px 20px;font-family:${NL_F};">
        <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${C.dim};font-weight:700;">🔭 ${E(S.brand)}</div>
        <div style="font-size:30px;font-weight:800;color:${C.text};margin:8px 0 4px;line-height:1.15;">${E(S.kicker)}</div>
        <div style="font-size:14px;color:${C.accent};">${E(this.weekLabel(start, this.dayAt(date, 6, 0), lang, loc))}</div>
        ${note ? "" : `<div style="font-size:15px;color:${C.dim};margin-top:14px;line-height:1.55;">${E(S.hello)}</div>`}
      </td></tr>
      ${sections.join("")}
      <tr><td align="center" style="padding:10px 0 26px;font-family:${NL_F};">
        <a href="${E(d.siteUrl)}" style="display:inline-block;background:${C.accent};color:${C.bg};text-decoration:none;font-weight:700;font-size:15px;padding:13px 22px;border-radius:10px;">🌌 ${E(S.cta)}</a>
      </td></tr>
      <tr><td align="center" style="padding:0 10px 30px;font-family:${NL_F};font-size:12px;line-height:1.6;color:${C.faint};">
        ${E(S.noReply)} <a href="${E(d.siteUrl)}" style="color:${C.accent};text-decoration:underline;">thomasnima.com</a>.<br>
        ${E(S.footer)}<br><a href="${E(d.unsubscribeUrl)}" style="color:${C.faint};text-decoration:underline;">${E(S.unsub)}</a>
      </td></tr>`);

    return { subject, preheader, html, fromName: S.brand };
  },

  // "Semaine du 7 au 13 novembre" / "Week of November 7–13", for the top of the email
  weekLabel(a, b, lang, loc) {
    const mon = (x) => x.toLocaleDateString(loc, { month: "long" }), same = a.getMonth() === b.getMonth();
    if (lang === "en") return `Week of ${mon(a)} ${a.getDate()}${same ? "–" : ` – ${mon(b)} `}${b.getDate()}`;
    const day = (x) => x.getDate() === 1 ? "1er" : x.getDate();
    return `Semaine du ${day(a)}${same ? "" : " " + mon(a)} au ${day(b)} ${mon(b)}`;
  },

  // ---- content ----

  moon(start, obs) {
    const tonight = this.dayAt(start, 0, 21);
    const angle = Astronomy.MoonPhase(tonight);
    const pct = Math.round(Astronomy.Illumination(Astronomy.Body.Moon, tonight).phase_fraction * 100);
    const keys = ["new", "first", "full", "last"], emo = ["🌑", "🌓", "🌕", "🌗"];
    const end = this.dayAt(start, 7, 0), qs = [];
    try {
      let mq = Astronomy.SearchMoonQuarter(start);
      for (let i = 0; i < 6 && mq.time.date < end; i++) {
        qs.push({ date: mq.time.date, name: t("phase." + keys[mq.quarter]), emoji: emo[mq.quarter] });
        mq = Astronomy.NextMoonQuarter(mq);
      }
    } catch (e) {}
    // a "dark evening" = at 22:00 the Moon is below the horizon or less than 25% lit
    const dark = [];
    for (let i = 0; i < 7; i++) {
      const at = this.dayAt(start, i, 22);
      try {
        const eq = Astronomy.Equator(Astronomy.Body.Moon, at, obs, true, true);
        const h = U.eqToHoriz(eq.ra, eq.dec, NL_PLACE.lat, U.lst(at, NL_PLACE.lon));
        if (h.alt < 0 || Astronomy.Illumination(Astronomy.Body.Moon, at).phase_fraction < 0.25) dark.push(at);
      } catch (e) {}
    }
    const key = Tonight.phaseKey(angle);
    const emoji = { new: "🌑", waxcres: "🌒", first: "🌓", waxgib: "🌔", full: "🌕", wangib: "🌖", last: "🌗", wancres: "🌘" }[key];
    return { phase: t("phase." + key), pct, emoji, qs, dark };
  },

  // same generators as the website's Events tab; moon phases are in the Moon card,
  // except supermoons, which are worth a mention
  events(start, end) {
    const far = this.dayAt(start, 60, 0);
    let all = [];
    for (const g of ["lunarEclipses", "solarEclipses", "oppositions", "elongations", "seasons", "meteors", "moonPhases"]) {
      try { all = all.concat(Events[g](start, far)); } catch (e) {}
    }
    const keep = e => e.type !== "moon" || e.title === t("events.supermoon");
    all = all.filter(e => e.date >= start && e.date < far && keep(e)).sort((a, b) => a.date - b.date);
    return { week: all.filter(e => e.date < end), next: all.filter(e => e.date >= end).slice(0, 2) };
  },

  // designations already shown in tonight's best-sights list
  featured(list) {
    const names = new Set(list.map(o => o.name));
    const out = new Set();
    for (const o of HL_DSO) if (names.has(Highlights.L(o.name))) out.add(NL_HL_DESIG[o.key]);
    return out;
  },

  // a named deep-sky object that is well up at 22:00 and not already featured,
  // rotating every week
  objectOfWeek(start, dsos, featured, week) {
    const at = this.dayAt(start, 0, 22), lst = U.lst(at, NL_PLACE.lon);
    const cands = [];
    for (const f of dsos) {
      const desig = f.properties.desig || "", key = desig.replace(/\s+/g, "");
      const info = DSO_INFO[key];
      if (!info || !info.name.en || featured.has(key) || key === "χPer") continue;   // χ Per duplicates h Per
      const raH = U.norm24(f.geometry.coordinates[0] / 15), dec = f.geometry.coordinates[1];
      const h = U.eqToHoriz(raH, dec, NL_PLACE.lat, lst);
      if (h.alt >= 25) cands.push({ key, desig, info, f, h, raH, dec });
    }
    if (!cands.length) return null;
    cands.sort((a, b) => a.key.localeCompare(b.key));
    const c = cands[this.mod(week, cands.length)];
    let con = "";
    try { con = Astronomy.Constellation(c.raH, c.dec).name; } catch (e) {}
    if (I18N.lang === "fr") con = CONS_FR[con] || (con === "Serpens" ? "Serpent" : con);
    const mag = c.f.properties.mag;
    return { name: Sky.L(c.info.name), desig: c.desig, type: Sky.dsoType(c.f.properties.type), desc: Sky.L(c.info.desc),
      con, dir: U.compass(c.h.az), alt: Math.round(c.h.alt), inst: mag <= 4.5 ? "eye" : mag <= 7.5 ? "binoc" : "scope" };
  },

  // this week's question and last week's (for the answer), from the site's quiz bank
  // (easy levels only), with the choices shuffled the same way every time
  quiz(week) {
    const bank = QUIZ_BANK.filter(q => q.level <= 2);
    if (!bank.length) return null;
    const pick = (w) => {
      const q = bank[this.mod(w, bank.length)];
      const order = this.shuffle([...Array(q.choices.en.length).keys()], w * 7919 + 13);
      return { q, order, correctPos: order.indexOf(q.answer) };
    };
    return { cur: pick(week), prev: pick(week - 1) };
  },

  // an observing challenge that works this month (and with this week's Moon),
  // rotating every week
  challenge(start, moon, week) {
    if (typeof NL_CHALLENGES === "undefined") return null;
    const month = this.dayAt(start, 3, 0).getMonth() + 1;
    const moonOut = moon.pct >= 15 && moon.dark.length < 7;     // a lit Moon in some evenings
    const dark = moon.dark.length >= 2;                          // at least two Moon-free evenings
    const ok = NL_CHALLENGES.filter(c => (!c.months || c.months.includes(month))
      && (c.needs !== "moon" || moonOut) && (c.needs !== "dark" || dark));
    // two weeks out of three, prefer a seasonal one (it's only possible right now)
    const seasonal = ok.filter(c => c.months);
    const pool = seasonal.length && this.mod(week, 3) ? seasonal : ok;
    return pool.length ? pool[this.mod(week, pool.length)] : null;
  },

  // a moment of space history whose anniversary falls this week (rounder
  // anniversaries first: 50, 25, 10, 5 years)
  anniversary(start, end, week) {
    if (typeof NL_ANNIV === "undefined") return null;
    const hits = [];
    for (const a of NL_ANNIV) {
      for (const yr of [start.getFullYear(), start.getFullYear() + 1]) {
        const date = new Date(a.y, a.m - 1, a.d), when = new Date(yr, a.m - 1, a.d);
        if (when >= start && when < end && yr > a.y) hits.push({ a, date, ago: yr - a.y });
      }
    }
    if (!hits.length) return null;
    const round = (h) => [50, 25, 10, 5].findIndex(n => h.ago % n === 0);
    const score = (h) => { const r = round(h); return r < 0 ? 9 : r; };
    const best = Math.min(...hits.map(score));
    const top = hits.filter(h => score(h) === best);
    return top[this.mod(week, top.length)];
  },

  // Thomas's note for this edition: the latest form answer sent in the 7 days
  // before the newsletter goes out. Columns (see the "Newsletter" tab): time,
  // note FR, note EN, thing 1 FR, thing 1 EN, link 1, thing 2 FR, thing 2 EN, link 2.
  thomasNote(rows, date) {
    const from = date.getTime() - 7 * 864e5;
    const when = (s) => { const m = /^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d)/.exec(s || ""); return m ? new Date(+m[1], m[2] - 1, +m[3], +m[4], +m[5]).getTime() : NaN; };
    const link = (s) => /^https?:\/\/\S+$/i.test((s || "").trim()) ? s.trim() : "";   // web links only
    const row = (rows || []).filter(r => { const t = when(r[0]); return t > from && t <= date.getTime() && (r[1] || "").trim(); })
      .sort((a, b) => when(b[0]) - when(a[0]))[0];
    if (!row) return null;
    const v = (i) => (row[i] || "").trim();
    const fr = (i) => v(i).replace(/"([^"\n]+)"/g, "« $1 »");   // French text gets guillemets
    return { fr: fr(1), en: v(2),
      things: [{ fr: fr(3), en: v(4), link: link(v(5)) }, { fr: fr(6), en: v(7), link: link(v(8)) }] };
  },

  // Small CSV reader (quoted fields may contain commas, quotes and line breaks).
  csv(text) {
    const rows = []; let row = [], cell = "", q = false;
    for (let i = 0; i < (text || "").length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
        else if (c === '"') q = false;
        else cell += c;
      } else if (c === '"') q = true;
      else if (c === ",") { row.push(cell); cell = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); rows.push(row); row = []; cell = "";
      } else cell += c;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows;
  },

  // ---- layout ----

  page(lang, subject, preheader, rows) {
    const C = NL_C;
    return `<!DOCTYPE html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"><title>${U.esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.bg};">${U.esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bg}" style="background:${C.bg};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
${rows}
</table></td></tr></table></body></html>`;
  },

  card(emoji, title, inner) {
    const C = NL_C;
    return `<tr><td style="padding:0 0 14px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.card}" style="background:${C.card};border:1px solid ${C.border};border-radius:14px;">
<tr><td style="padding:18px 20px;font-family:${NL_F};color:${C.text};">
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C.dim};font-weight:700;margin:0 0 8px;">${emoji} ${title}</div>
${inner}
</td></tr></table></td></tr>`;
  },

  row(emoji, inner) {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="34" valign="top" style="font-size:20px;padding:9px 0 0;">${emoji}</td>
<td valign="top" style="padding:8px 0;border-bottom:1px solid ${NL_C.border};font-family:${NL_F};">${inner}</td></tr></table>`;
  },

  // ---- helpers ----

  fill(str, vars) { let out = str; for (const k in (vars || {})) out = out.split("{" + k + "}").join(vars[k]); return out; },
  cap(str) { return str ? str.charAt(0).toUpperCase() + str.slice(1) : str; },
  mod(n, m) { return ((n % m) + m) % m; },
  // local date + days + hour — safe across daylight-saving changes
  dayAt(d, days, hour) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days, hour, 0, 0); },
  when(d, loc, withTime) {
    const day = this.cap(d.toLocaleDateString(loc, { weekday: "short", day: "numeric", month: "short" }));
    return withTime ? `${day} · ${U.timeHMS(d).slice(0, 5)}` : day;
  },
  range(a, b, loc) {
    const mon = (x) => x.toLocaleDateString(loc, { month: "short" });
    if (a.getMonth() === b.getMonth())
      return loc === "fr-FR" ? `${a.getDate()}–${b.getDate()} ${mon(a)}` : `${mon(a)} ${a.getDate()}–${b.getDate()}`;
    return loc === "fr-FR" ? `${a.getDate()} ${mon(a)} – ${b.getDate()} ${mon(b)}` : `${mon(a)} ${a.getDate()} – ${mon(b)} ${b.getDate()}`;
  },
  shuffle(arr, seed) {
    let a = seed >>> 0;
    const rnd = () => { a = (a + 0x6D2B79F5) | 0; let x = Math.imul(a ^ (a >>> 15), 1 | a); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    return arr;
  },
};

window.NL = NL;
