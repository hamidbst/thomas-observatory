/* =============================================================================
   newsletter/send.js  —  the Friday job (run by .github/workflows/newsletter.yml)
   Builds this week's newsletter in French and English with the website's own
   code (newsletter/email.js + the site's js/ files), then, in "draft" mode,
   creates both as DRAFT campaigns in Brevo and sends a test copy to
   NEWSLETTER_EMAIL. Nothing reaches subscribers until someone clicks Send in
   Brevo.

   Environment:
     NL_MODE           "draft" (default) | "preview" (only build the HTML files)
     BREVO_API_KEY     GitHub secret — the Brevo API key
     NEWSLETTER_EMAIL  GitHub secret — your address: test copy + "reply to"
   Output: newsletter/out/<date>-fr.html and -en.html, newsletter/last-run.json
   ============================================================================= */

process.env.TZ = process.env.TZ || "Europe/Paris";   // all times in French time
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const SENDER_EMAIL = "ciel@thomasnima.com";
const LISTS = { fr: 3, en: 4 };                       // Brevo list IDs
const SITE_FILES = [
  "vendor/astronomy.browser.min.js", "js/config.js", "js/i18n.js", "js/util.js", "js/facts.js",
  "js/events.js", "js/tonight.js", "js/highlights.js", "js/skymap.js", "js/quiz.js", "newsletter/email.js",
];

// Load the site's browser scripts into one sandbox, like <script> tags on a page.
function loadSite() {
  const ctx = vm.createContext({ console, fetch, setTimeout, clearTimeout, URL, URLSearchParams });
  ctx.window = ctx;
  ctx.self = ctx;
  ctx.document = { addEventListener() {}, getElementById: () => null, querySelectorAll: () => [] };
  ctx.localStorage = { getItem: () => null, setItem() {} };
  ctx.navigator = { language: "fr-FR" };
  ctx.LOC = { current: null };
  for (const f of SITE_FILES) vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
  if (!ctx.Astronomy || !ctx.NL) throw new Error("Could not load the site's scripts.");
  return ctx;
}

async function brevo(key, method, apiPath, body) {
  const r = await fetch("https://api.brevo.com/v3" + apiPath, {
    method,
    headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const txt = await r.text();
  if (!r.ok) throw new Error(`Brevo ${method} ${apiPath} → ${r.status}: ${txt}`);
  return txt ? JSON.parse(txt) : {};
}

async function main() {
  const mode = (process.env.NL_MODE || "draft").trim().toLowerCase();
  const site = loadSite();
  const dsos = JSON.parse(fs.readFileSync(path.join(ROOT, "data/dsos.bright.json"), "utf8"));
  const data = await site.NL.fetchAll(dsos);
  console.log(`Data: ${data.news.length} news, ${data.launches.length} launches, APOD ${data.apod ? "yes" : "no"}`);

  const stamp = new Date().toLocaleDateString("sv-SE");           // YYYY-MM-DD, French time
  const outDir = path.join(ROOT, "newsletter", "out");
  fs.mkdirSync(outDir, { recursive: true });
  const emails = {};
  for (const lang of ["fr", "en"]) {
    // {{ unsubscribe }} is Brevo's placeholder for each subscriber's own unsubscribe link
    const e = site.NL.build({ lang, ...data, unsubscribeUrl: "{{ unsubscribe }}" });
    emails[lang] = e;
    fs.writeFileSync(path.join(outDir, `${stamp}-${lang}.html`), e.html);
    console.log(`[${lang}] ${e.subject}  (${Math.round(e.html.length / 1024)} KB)`);
  }
  fs.writeFileSync(path.join(ROOT, "newsletter", "last-run.json"),
    JSON.stringify({ date: stamp, mode, subjects: { fr: emails.fr.subject, en: emails.en.subject } }, null, 2) + "\n");

  if (mode !== "draft") { console.log("Preview mode: emails built, nothing sent to Brevo."); return; }

  const key = process.env.BREVO_API_KEY;
  const me = (process.env.NEWSLETTER_EMAIL || "").trim();
  if (!key) throw new Error("BREVO_API_KEY is missing — add it under the repo's Settings → Secrets and variables → Actions.");

  for (const lang of ["fr", "en"]) {
    const e = emails[lang];
    const body = {
      name: `Weekly sky ${stamp} (${lang.toUpperCase()})`,
      subject: e.subject,
      previewText: e.preheader,
      sender: { name: e.fromName, email: SENDER_EMAIL },
      htmlContent: e.html,
      recipients: { listIds: [LISTS[lang]] },
    };
    if (me) body.replyTo = me;
    let camp;
    try {
      camp = await brevo(key, "POST", "/emailCampaigns", body);
    } catch (err) {
      // Brevo refuses a list with no contacts yet: keep the draft anyway, without recipients
      if (!/no contacts/i.test(err.message)) throw err;
      delete body.recipients;
      camp = await brevo(key, "POST", "/emailCampaigns", body);
      console.log(`[${lang}] the ${lang.toUpperCase()} list has no subscribers yet: draft created without recipients`);
    }
    console.log(`[${lang}] draft #${camp.id} created in Brevo (Campaigns) — not sent yet`);
    if (!me) { console.log(`[${lang}] NEWSLETTER_EMAIL not set: no test copy sent`); continue; }
    try {
      await brevo(key, "POST", `/emailCampaigns/${camp.id}/sendTest`, { emailTo: [me] });
      console.log(`[${lang}] test copy sent to you`);
    } catch (err) {
      // the draft is still there; only the test copy failed (e.g. address not allowed as a test recipient)
      console.log(`[${lang}] could not send the test copy: ${err.message}`);
    }
  }
}

main().catch((err) => { console.error(err.message || err); process.exit(1); });
