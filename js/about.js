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
    // fresh "are you human?" maths question + a start timestamp each render
    this.hc = { a: 1 + Math.floor(Math.random() * 8), b: 1 + Math.floor(Math.random() * 8), t0: Date.now() };
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
            <input class="cf-input" name="email" type="email" maxlength="120" placeholder="${U.esc(t("about.fEmail"))}" />
            <input class="cf-input" name="from" maxlength="80" placeholder="${U.esc(t("about.fFrom"))}" />
            <textarea class="cf-input" name="message" required rows="5" maxlength="1500" placeholder="${U.esc(t("about.fMsg"))}"></textarea>
            <div class="cf-human">
              <label for="cf-human-in">${U.esc(t("about.human", { a: this.hc.a, b: this.hc.b }))}</label>
              <input class="cf-input cf-num" id="cf-human-in" name="human" type="text" inputmode="numeric" maxlength="3" autocomplete="off" />
            </div>
            <input type="checkbox" name="botcheck" class="cf-hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <button type="submit" class="btn cf-send">${t("about.send")}</button>
            <div class="cf-status" id="cf-status" role="status"></div>
          </form>
        </div>
      </div>`;
    U.el("contact-form").addEventListener("submit", (e) => this.submit(e));
  },

  async submit(e) {
    e.preventDefault();
    const f = e.target;
    const status = U.el("cf-status");
    if (f.botcheck.checked) return;                       // honeypot: silently ignore bots
    if (Date.now() - this.hc.t0 < 2500) return;           // submitted implausibly fast = bot

    const key = (CONFIG.CONTACT_KEY || "").trim();
    if (!key) { status.className = "cf-status err"; status.textContent = t("about.notSet"); return; }

    const name = f.name.value.trim(), email = f.email.value.trim(),
          from = f.from.value.trim(), message = f.message.value.trim();

    // required name
    if (!name) { status.className = "cf-status err"; status.textContent = t("about.errName"); f.name.focus(); return; }
    // human check (simple maths)
    if (parseInt(f.human.value, 10) !== this.hc.a + this.hc.b) {
      status.className = "cf-status err"; status.textContent = t("about.errHuman"); f.human.focus(); return;
    }
    if (!message) return;

    const btn = f.querySelector(".cf-send");
    btn.disabled = true;
    status.className = "cf-status"; status.textContent = t("about.sending");

    const payload = {
      access_key: key,
      subject: "New message from Thomas Nima's Observatory 🔭",
      from_name: "Observatory contact form",
      name: name,
      from_where: from || "—",
      message
    };
    // If they left an email, use it as the reply-to so you can reply directly.
    if (email) {
      if (/^\S+@\S+\.\S+$/.test(email)) { payload.email = email; payload.replyto = email; }
      else { payload.message += `\n\n(Contact they typed: ${email})`; }
    }
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      const j = await r.json();
      if (j.success) { status.className = "cf-status ok"; status.textContent = t("about.thanks"); f.reset(); }
      else throw new Error(j.message || "failed");
    } catch (err) {
      status.className = "cf-status err"; status.textContent = t("about.errorMsg");
    } finally {
      btn.disabled = false;
    }
  }
};

window.About = About;
