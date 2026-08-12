/* =============================================================================
   news.js  —  NASA Astronomy Picture of the Day + latest space headlines
   ============================================================================= */

const News = {
  loadedAPOD: false, loadedNews: false,

  loadAll() { this.apod(); this.headlines(); },

  async apod() {
    if (this.loadedAPOD) return;
    const host = U.el("apod");
    try {
      const r = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(CONFIG.NASA_API_KEY)}&thumbs=true`);
      if (!r.ok) throw new Error(`NASA API returned ${r.status}`);
      const d = await r.json();
      const media = d.media_type === "video"
        ? `<iframe src="${U.esc(d.url)}" allowfullscreen loading="lazy"></iframe>`
        : `<a href="${U.esc(d.hdurl || d.url)}" target="_blank" rel="noopener"><img src="${U.esc(d.url)}" alt="${U.esc(d.title)}" loading="lazy"></a>`;
      host.innerHTML = `
        <div>${media}</div>
        <div>
          <div class="title">${U.esc(d.title)}</div>
          <div class="small muted">${U.esc(d.date)}</div>
          <div class="expl">${U.esc(d.explanation)}</div>
          ${d.copyright ? `<div class="credit">© ${U.esc(d.copyright.trim())}</div>` : `<div class="credit">${t("news.imageCredit")}</div>`}
        </div>`;
      this.loadedAPOD = true;
    } catch (e) {
      host.innerHTML = `<p class="err">${t("news.apodError", { msg: U.esc(e.message) })}<br>
        <span class="muted small">${t("news.apodKeyHint")}</span></p>`;
    }
  },

  async headlines() {
    if (this.loadedNews) return;
    const host = U.el("news-list");
    try {
      const r = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=9&ordering=-published_at");
      if (!r.ok) throw new Error(`News API returned ${r.status}`);
      const d = await r.json();
      host.innerHTML = d.results.map(a => `
        <a class="news-item" href="${U.esc(a.url)}" target="_blank" rel="noopener">
          <img src="${U.esc(a.image_url)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">
          <div>
            <div class="h">${U.esc(a.title)}</div>
            <div class="s"><span class="src">${U.esc(a.news_site)}</span> · ${new Date(a.published_at).toLocaleDateString(undefined,{month:"short",day:"numeric"})} — ${U.esc((a.summary||"").slice(0,150))}${(a.summary||"").length>150?"…":""}</div>
          </div>
        </a>`).join("");
      this.loadedNews = true;
    } catch (e) {
      host.innerHTML = `<p class="err">${t("news.newsError", { msg: U.esc(e.message) })}</p>`;
    }
  }
};

window.News = News;
