/* =============================================================================
   subscribe.js  —  "Destination Space" (Cap sur l'espace) sign-up box, shown under every tab
   Sends the address to the Brevo subscription form for the chosen language
   (CONFIG.NEWSLETTER_FORMS). Brevo stores it and emails a confirmation link
   (double opt-in) — nobody is subscribed until they click it, so a clear
   pop-up tells the visitor to go and check their inbox.
   Hidden until both form addresses are set in config.js.
   ============================================================================= */

const Subscribe = {
  sent: false,
  t0: 0,

  init() {
    document.addEventListener("language-changed", () => { if (!this.sent) this.render(); });
    this.render();
  },

  forms() {
    const f = CONFIG.NEWSLETTER_FORMS || {};
    return (f.fr && f.en) ? f : null;
  },

  render() {
    const host = U.el("subscribe-app");
    if (!host) return;
    if (!this.forms()) { host.hidden = true; host.innerHTML = ""; return; }
    host.hidden = false;
    this.t0 = Date.now();
    const lang = I18N.lang === "en" ? "en" : "fr";
    host.innerHTML = `
      <div class="panel sub-panel">
        <div class="sub-head">
          <div class="sub-emoji">📬</div>
          <div>
            <div class="section-title" style="margin:0 0 4px;">${t("sub.title")}</div>
            <p class="sub-pitch">${t("sub.pitch")}</p>
          </div>
        </div>
        <form class="sub-form" novalidate>
          <input class="cf-input" name="email" type="email" autocomplete="email"
                 placeholder="${U.esc(t("sub.email"))}" aria-label="${U.esc(t("sub.email"))}" />
          <select class="cf-input sub-lang" name="lang" aria-label="${U.esc(t("sub.lang"))}">
            <option value="fr"${lang === "fr" ? " selected" : ""}>Français</option>
            <option value="en"${lang === "en" ? " selected" : ""}>English</option>
          </select>
          <button class="btn cf-send sub-send" type="submit">${t("sub.button")}</button>
          <label class="sub-consent"><input type="checkbox" name="consent" /> ${t("sub.consent")}</label>
          <input type="text" name="website" class="cf-hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
        </form>
        <div class="cf-status sub-status" role="status"></div>
        <p class="small muted sub-privacy">🔒 ${t("sub.privacy")}</p>
      </div>`;
    host.querySelector("form").addEventListener("submit", (e) => { e.preventDefault(); this.submit(e.target); });
  },

  submit(f) {
    const status = U.el("subscribe-app").querySelector(".sub-status");
    const fail = (key, field) => { status.className = "cf-status sub-status err"; status.textContent = t(key); if (field) field.focus(); };
    if (f.website.value) return;                          // honeypot: silently ignore bots
    if (Date.now() - this.t0 < 2000) return;              // submitted implausibly fast = bot
    const email = f.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail("sub.errEmail", f.email);
    if (!f.consent.checked) return fail("sub.errConsent", f.consent);

    const lang = f.lang.value === "en" ? "en" : "fr";
    // the same fields Brevo's own embedded form sends
    const fields = { EMAIL: email, email_address_check: "", locale: lang };
    const btn = f.querySelector("button");
    btn.disabled = true; btn.textContent = "…";
    status.textContent = "";
    fetch(this.forms()[lang], { method: "POST", body: new URLSearchParams(fields) })
      .then(r => r.json())
      .then(res => {
        if (res && res.success) return this.done(email);
        btn.disabled = false; btn.textContent = t("sub.button");
        fail("sub.errSend");
      })
      .catch(() => { this.postFrame(this.forms()[lang], fields); this.done(email); });   // reply unreadable: send it the classic way
  },

  // Fallback: a normal form post into a hidden iframe (the reply can't be read).
  postFrame(action, fields) {
    let frame = document.getElementById("sub-frame");
    if (!frame) {
      frame = document.createElement("iframe");
      frame.name = frame.id = "sub-frame"; frame.hidden = true; frame.title = "subscribe";
      document.body.appendChild(frame);
    }
    const post = document.createElement("form");
    post.method = "POST"; post.action = action; post.target = "sub-frame"; post.hidden = true;
    for (const k in fields) { const i = document.createElement("input"); i.type = "hidden"; i.name = k; i.value = fields[k]; post.appendChild(i); }
    document.body.appendChild(post);
    post.submit();
    post.remove();
  },

  // Signed up: a pop-up that can't be missed, and the box itself keeps the reminder.
  done(email) {
    this.sent = true;
    const msg = `
      <div class="sub-done-icon">📩</div>
      <div class="sub-done-title">${t("sub.doneTitle")}</div>
      <p>${t("sub.doneSent", { email: `<b>${U.esc(email)}</b>` })}</p>
      <p class="sub-done-step">👉 ${t("sub.doneStep")}</p>
      <p class="small muted">${t("sub.doneSpam")}</p>`;
    U.el("subscribe-app").querySelector(".sub-panel").innerHTML = `<div class="sub-done">${msg}</div>`;

    const modal = document.createElement("div");
    modal.className = "loc-modal sub-modal";
    modal.innerHTML = `<div class="loc-box sub-done" role="dialog" aria-modal="true">
        <button class="loc-x" aria-label="${U.esc(t("sub.doneClose"))}">✕</button>${msg}
        <button class="btn cf-send sub-done-ok">${t("sub.doneClose")}</button></div>`;
    const close = () => { modal.remove(); document.removeEventListener("keydown", esc); };
    const esc = (e) => { if (e.key === "Escape") close(); };
    modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest(".loc-x, .sub-done-ok")) close(); });
    document.addEventListener("keydown", esc);
    document.body.appendChild(modal);
    modal.querySelector(".sub-done-ok").focus();
  }
};

window.Subscribe = Subscribe;
