/* =============================================================================
   newsletter/send.js  —  the Friday job (run by .github/workflows/newsletter.yml)
   Builds this week's newsletter in French and English with the website's own
   code (newsletter/email.js + the site's js/ files), creates both as campaigns
   in Brevo and sends a test copy to NEWSLETTER_EMAIL.
   · "auto" (the Friday run): also schedules both for 17:00 the same day and
     emails you a short note saying so; cancel in Brevo before then if needed.
   · "draft" (manual test): leaves them as drafts. Nothing reaches subscribers.

   Environment:
     NL_MODE           "auto" | "draft" (default) | "preview" (only build the HTML files)
     BREVO_API_KEY     GitHub secret — the Brevo API key
     NEWSLETTER_EMAIL  GitHub secret — your address: test copies + the Friday note
   Output: newsletter/out/<date>-fr.html and -en.html, newsletter/last-run.json
   ============================================================================= */

process.env.TZ = process.env.TZ || "Europe/Paris";   // all times in French time
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const SENDER_EMAIL = "astro@thomasnima.com";          // the newsletter's sender address
const NO_REPLY = "noreply@thomasnima.com";            // reply-to: not a real mailbox, replies aren't read
const LISTS = { fr: 3, en: 4 };                       // Brevo list IDs
const SEND_HOUR = 17;                                 // Friday runs go out at 17:00 French time
const SITE_FILES = [
  "vendor/astronomy.browser.min.js", "js/config.js", "js/i18n.js", "js/util.js", "js/facts.js",
  "js/events.js", "js/tonight.js", "js/highlights.js", "js/skymap.js", "js/quiz.js", "newsletter/extras.js", "newsletter/email.js",
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

  if (mode !== "draft" && mode !== "auto") { console.log("Preview mode: emails built, nothing sent to Brevo."); return; }

  const key = process.env.BREVO_API_KEY;
  const me = (process.env.NEWSLETTER_EMAIL || "").trim();
  if (!key) throw new Error("BREVO_API_KEY is missing — add it under the repo's Settings → Secrets and variables → Actions.");

  // "auto" (the Friday run): schedule both campaigns for today at SEND_HOUR, French time,
  // unless that's too close. Manual "draft" runs never schedule anything.
  const sendAt = new Date(); sendAt.setHours(SEND_HOUR, 0, 0, 0);
  const canSchedule = mode === "auto" && sendAt - Date.now() > 30 * 60e3;
  const report = [];

  for (const lang of ["fr", "en"]) {
    const e = emails[lang];
    const body = {
      name: `Destination Space ${stamp} (${lang.toUpperCase()})`,
      subject: e.subject,
      previewText: e.preheader,
      sender: { name: e.fromName, email: SENDER_EMAIL },
      htmlContent: e.html,
      recipients: { listIds: [LISTS[lang]] },
    };
    body.replyTo = NO_REPLY;                           // the email asks readers to use the website form instead
    let camp, empty = false;
    try {
      camp = await brevo(key, "POST", "/emailCampaigns", body);
    } catch (err) {
      // Brevo refuses a list with no contacts yet: keep the draft anyway, without recipients
      if (!/no contacts/i.test(err.message)) throw err;
      delete body.recipients;
      empty = true;
      camp = await brevo(key, "POST", "/emailCampaigns", body);
      console.log(`[${lang}] the ${lang.toUpperCase()} list has no subscribers yet: draft created without recipients`);
    }
    console.log(`[${lang}] draft #${camp.id} created in Brevo (Campaigns) — not sent yet`);
    if (me) {
      try {
        await brevo(key, "POST", `/emailCampaigns/${camp.id}/sendTest`, { emailTo: [me] });
        console.log(`[${lang}] test copy sent to you`);
      } catch (err) {
        // the draft is still there; only the test copy failed (e.g. address not allowed as a test recipient)
        console.log(`[${lang}] could not send the test copy: ${err.message}`);
      }
    } else console.log(`[${lang}] NEWSLETTER_EMAIL not set: no test copy sent`);

    // schedule it, then read it back to be sure Brevo really queued it
    let status = empty ? "empty" : "draft", error = "";
    if (canSchedule && !empty) {
      try {
        await brevo(key, "PUT", `/emailCampaigns/${camp.id}`, { scheduledAt: sendAt.toISOString() });
        const check = await brevo(key, "GET", `/emailCampaigns/${camp.id}`);
        status = check.status === "queued" ? "scheduled" : "draft";
        if (status !== "scheduled") error = `Brevo status is "${check.status}"`;
      } catch (err) { error = err.message; }
      console.log(`[${lang}] ${status === "scheduled" ? `scheduled for ${sendAt.toISOString()}` : "NOT scheduled: " + error}`);
    }
    report.push({ lang, id: camp.id, subject: e.subject, status, error });
  }

  if (mode === "auto" && me) await sendReminder(key, me, report, sendAt, canSchedule);
}

// The Friday note to you: what's going out and when, and how to stop it.
async function sendReminder(key, me, report, sendAt, scheduled) {
  const hhmm = `${String(SEND_HOUR).padStart(2, "0")}:00`;
  const line = (r) => {
    const name = r.lang === "fr" ? "French" : "English";
    if (r.status === "scheduled") return `✅ <b>${name}</b> — goes out automatically today at <b>${hhmm}</b>.`;
    if (r.status === "empty") return `💤 <b>${name}</b> — nobody on this list yet, so nothing to send.`;
    return `⚠️ <b>${name}</b> — <b>not scheduled</b>${r.error ? ` (${r.error.replace(/[<>&]/g, "")})` : ""}. To send it, open it in Brevo → Campaigns and click Send.`;
  };
  const allOk = report.every(r => r.status === "scheduled" || r.status === "empty");
  const html = `<div style="font-family:Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1f2840;max-width:560px;">
    <p style="font-size:18px;font-weight:700;margin:0 0 10px;">📬 This week's newsletter is ready</p>
    <p>You should also have received the two test copies (subjects starting with "TEST").</p>
    <p>${report.map(line).join("<br>")}</p>
    ${scheduled ? `<p><b>Something wrong?</b> Before ${hhmm}, open <a href="https://app.brevo.com">Brevo</a> → Marketing → Campaigns, open this week's campaign and choose <b>Unschedule</b> (or edit it). If you do nothing, it goes out by itself.</p>` : ""}
    ${await subscriberSummary(key)}
    <p style="color:#6b7590;font-size:13px;">Sent only to you by the Friday job on GitHub (Actions → Weekly newsletter).</p></div>`;
  try {
    await brevo(key, "POST", "/smtp/email", {
      sender: { name: "Observatory newsletter robot", email: SENDER_EMAIL },
      to: [{ email: me }],
      subject: allOk ? `📬 Newsletter ready — goes out today at ${hhmm}` : "⚠️ Newsletter ready — please check, not everything is scheduled",
      htmlContent: html,
    });
    console.log("reminder sent to you");
  } catch (err) { console.log(`could not send the reminder: ${err.message}`); }
}

// For the Friday note: who joined each list in the last 7 days, and the totals.
// Only confirmed subscribers are on the lists; unsubscribed ones are left out.
async function subscriberSummary(key) {
  const since = Date.now() - 7 * 864e5;
  const esc = (s) => String(s).replace(/[<>&"]/g, "");
  try {
    const per = {};
    for (const lang of ["fr", "en"]) {
      const all = [];
      for (let offset = 0; offset < 10000; offset += 500) {
        const r = await brevo(key, "GET", `/contacts/lists/${LISTS[lang]}/contacts?limit=500&offset=${offset}`);
        const page = r.contacts || [];
        all.push(...page);
        if (page.length < 500) break;
      }
      const active = all.filter(c => !c.emailBlacklisted);
      per[lang] = { total: active.length,
        fresh: active.filter(c => new Date(c.createdAt) >= since).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) };
    }
    const fresh = ["fr", "en"].flatMap(l => per[l].fresh.map(c => ({ ...c, lang: l.toUpperCase() })));
    const day = (c) => new Date(c.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    const list = fresh.length
      ? fresh.map(c => `• ${esc(c.email)} <span style="color:#6b7590;">(${c.lang} · ${day(c)})</span>`).join("<br>")
      : `<span style="color:#6b7590;">No new subscribers this week.</span>`;
    return `<div style="margin:18px 0;padding:14px 16px;border-radius:10px;background:#f2f5fc;">
      <div style="font-weight:700;">👋 New subscribers this week: ${fresh.length}
        <span style="font-weight:400;color:#6b7590;">(FR: ${per.fr.fresh.length} · EN: ${per.en.fresh.length})</span></div>
      <div style="margin-top:6px;">${list}</div>
      <div style="margin-top:8px;font-weight:700;">Total: ${per.fr.total + per.en.total}
        <span style="font-weight:400;color:#6b7590;">(FR: ${per.fr.total} · EN: ${per.en.total})</span></div></div>`;
  } catch (err) {
    console.log(`could not read the subscriber lists: ${err.message}`);
    return `<p style="color:#6b7590;">(Couldn't read the subscriber lists this week.)</p>`;
  }
}

main().catch((err) => { console.error(err.message || err); process.exit(1); });
