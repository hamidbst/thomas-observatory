/* =============================================================================
   about.js  —  the "About Me" page: Thomas Nima's intro + a friendly contact box.
   Messages are sent through Web3Forms to the parent's email (key in config.js),
   so no server is needed and the email address is never shown on the page.
   ============================================================================= */

const About = {
  started: false,

  enter() {
    if (!this.started) {
      this.started = true;
      document.addEventListener("language-changed", () => this.render());
    }
    this.render();
  },

  render() {
    this.t0 = Date.now();                                  // start time, to spot instant bot submissions
    let cover = I18N.t("about.cover");
    if (!Array.isArray(cover)) cover = [];
    U.el("about-app").innerHTML = `
      <div class="about-wrap">
        <div class="panel about-card">
          <div class="about-hero">
            <div class="about-avatar">🧑‍🚀</div>
            <h2 class="about-hi">${U.esc(t("about.hi"))}</h2>
          </div>
          ${t("about.nameNote") ? `<p class="about-note small muted">${U.esc(t("about.nameNote"))}</p>` : ""}
          <p>${U.esc(t("about.bday"))}</p>
          <p>${U.esc(t("about.love"))}</p>
          <p>${U.esc(t("about.why"))}</p>
          <div class="section-title" style="margin-top:18px;">${t("about.coverTitle")}</div>
          <ul class="about-list">${cover.map(c => `<li>${U.esc(c)}</li>`).join("")}</ul>
          <p class="about-hear">${U.esc(t("about.hear"))}</p>
        </div>

        <div class="panel about-card">
          <div class="section-title">${t("about.contactTitle")}</div>
          <form id="contact-form" class="contact-form" novalidate>
            <input class="cf-input" name="name" required maxlength="60" placeholder="${U.esc(t("about.fName"))}" />
            <div>
              <input class="cf-input" name="email" type="email" maxlength="120" placeholder="${U.esc(t("about.fEmail"))}" style="width:100%;" />
              <div class="small muted cf-hint">${U.esc(t("about.emailHint"))}</div>
            </div>
            <input class="cf-input" name="from" maxlength="80" placeholder="${U.esc(t("about.fFrom"))}" />
            <textarea class="cf-input" name="message" required rows="5" maxlength="1500" placeholder="${U.esc(t("about.fMsg"))}"></textarea>
            <div class="cf-captcha" id="cf-captcha"></div>
            <input type="checkbox" name="botcheck" class="cf-hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <button type="submit" class="btn cf-send">${t("about.send")}</button>
            <div class="cf-status" id="cf-status" role="status"></div>
          </form>
        </div>
      </div>`;
    U.el("contact-form").addEventListener("submit", (e) => this.submit(e));
    this.captcha();
  },

  // "I am human" check by hCaptcha. Web3Forms verifies it on its side and rejects
  // any message without it, so robots can't skip the page and post directly.
  CAPTCHA_SITEKEY: "50b2fe65-b00b-4b9e-ad62-3ba471098be2",   // Web3Forms' shared key for free plans
  widget: null,

  captcha() {
    const box = U.el("cf-captcha");
    if (!box) return;
    if (window.hcaptcha && window.hcaptcha.render) {
      this.widget = window.hcaptcha.render(box, { sitekey: this.CAPTCHA_SITEKEY, theme: "dark" });
      return;
    }
    if (this.captchaLoading) return;
    this.captchaLoading = true;
    window.aboutCaptchaReady = () => this.captcha();
    const s = document.createElement("script");
    s.src = "https://js.hcaptcha.com/1/api.js?render=explicit&onload=aboutCaptchaReady&hl=" + (I18N.lang === "fr" ? "fr" : "en");
    s.async = true; s.defer = true;
    document.head.appendChild(s);
  },

  async submit(e) {
    e.preventDefault();
    const f = e.target;
    const status = U.el("cf-status");
    if (f.botcheck.checked) return;                       // honeypot: silently ignore bots
    if (Date.now() - this.t0 < 2500) return;              // submitted implausibly fast = bot

    const key = (CONFIG.CONTACT_KEY || "").trim();
    if (!key) { status.className = "cf-status err"; status.textContent = t("about.notSet"); return; }

    const name = f.name.value.trim(), email = f.email.value.trim(),
          from = f.from.value.trim(), message = f.message.value.trim();

    // required name
    if (!name) { status.className = "cf-status err"; status.textContent = t("about.errName"); f.name.focus(); return; }
    if (!message) return;
    // human check (hCaptcha)
    const token = (window.hcaptcha && this.widget != null) ? window.hcaptcha.getResponse(this.widget) : "";
    if (!token) { status.className = "cf-status err"; status.textContent = t("about.errHuman"); return; }

    const btn = f.querySelector(".cf-send");
    btn.disabled = true;
    status.className = "cf-status"; status.textContent = t("about.sending");

    const payload = {
      access_key: key,
      subject: "New message from Thomas Nima's Observatory 🔭",
      from_name: "Observatory contact form",
      name: name,
      from_where: from || "—",
      message,
      "h-captcha-response": token
    };
    // If they left an email, use it as the reply-to so you can reply directly.
    const validEmail = /^\S+@\S+\.\S+$/.test(email);
    if (email) {
      if (validEmail) { payload.email = email; payload.replyto = email; }
      else { payload.message += `\n\n(Contact they typed: ${email})`; }
    }
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      const j = await r.json();
      if (!j.success) throw new Error(j.message || "failed");
      status.className = "cf-status ok"; status.textContent = t("about.thanks"); f.reset();
      U.popup(`
        <div class="sub-done-icon">🚀</div>
        <div class="sub-done-title">${U.esc(t("about.sentTitle"))}</div>
        <p>${U.esc(t("about.sentThanks", { name }))}</p>
        <p class="sub-done-step">${validEmail
          ? t("about.sentReply", { email: `<b>${U.esc(email)}</b>` })
          : U.esc(t("about.sentNoEmail"))}</p>`, t("about.sentOk"));
    } catch (err) {
      status.className = "cf-status err"; status.textContent = t("about.errorMsg");
    } finally {
      btn.disabled = false;
      if (window.hcaptcha && this.widget != null) window.hcaptcha.reset(this.widget);   // a token works only once
    }
  }
};

window.About = About;
