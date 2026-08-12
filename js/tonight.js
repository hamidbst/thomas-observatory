/* =============================================================================
   tonight.js  —  Moon, Sun, and the planets for the observer, right now.
   All values computed locally with Astronomy Engine (works offline).
   ============================================================================= */

const Tonight = {
  built: false,

  observer() {
    const l = LOC.current;
    return new Astronomy.Observer(l.lat, l.lon, l.elevation || 0);
  },

  riseSet(body, dir, from) {
    try {
      const t = Astronomy.SearchRiseSet(Astronomy.Body[body], this.observer(), dir, from, 1);
      return t ? t.date : null;
    } catch (e) { return null; }
  },

  phaseName(angle) {
    // angle: 0 new, 90 first quarter, 180 full, 270 last quarter
    const names = [
      [0, "new"], [45, "waxcres"], [90, "first"], [135, "waxgib"],
      [180, "full"], [225, "wangib"], [270, "last"], [315, "wancres"], [360, "new"]
    ];
    let best = names[0];
    for (const n of names) if (Math.abs(angle - n[0]) < Math.abs(angle - best[0])) best = n;
    return t("phase." + best[1]);
  },

  render() {
    const now = new Date();
    this.renderMoon(now);
    this.renderSun(now);
    this.renderPlanets(now);
  },

  renderMoon(now) {
    let angle, illum, distKm;
    try {
      angle = Astronomy.MoonPhase(now);                         // 0..360
      illum = Astronomy.Illumination(Astronomy.Body.Moon, now); // phase_fraction
      const gm = Astronomy.GeoMoon(now);                        // AU vector
      distKm = Math.sqrt(gm.x*gm.x + gm.y*gm.y + gm.z*gm.z) * 149597870.7;
    } catch (e) { U.el("moon-info").innerHTML = `<span class="err">Moon error</span>`; return; }

    const frac = illum.phase_fraction;
    const waxing = angle < 180;
    this.drawMoon(frac, waxing);

    const rise = this.riseSet("Moon", +1, now);
    const set  = this.riseSet("Moon", -1, now);
    const nextFull = this.nextQuarter(now, 2);
    const nextNew  = this.nextQuarter(now, 0);

    U.el("moon-info").innerHTML = `
      <div style="font-size:18px;font-weight:700;margin-bottom:6px;">${this.phaseName(angle)}</div>
      <div class="kv"><span class="k">${t("tonight.illuminated")}</span><span class="v">${Math.round(frac*100)}%</span></div>
      <div class="kv"><span class="k">${t("tonight.distance")}</span><span class="v">${Math.round(distKm).toLocaleString(U.locale())} km</span></div>
      <div class="kv"><span class="k">${t("tonight.moonrise")}</span><span class="v">${rise ? U.timeHMS(rise).slice(0,5) : "—"}</span></div>
      <div class="kv"><span class="k">${t("tonight.moonset")}</span><span class="v">${set ? U.timeHMS(set).slice(0,5) : "—"}</span></div>
      <div class="kv"><span class="k">${t("tonight.nextFull")}</span><span class="v">${nextFull ? U.dateShort(nextFull) : "—"}</span></div>
      <div class="kv"><span class="k">${t("tonight.nextNew")}</span><span class="v">${nextNew ? U.dateShort(nextNew) : "—"}</span></div>`;
  },

  nextQuarter(from, wantQuarter) {
    // wantQuarter: 0 new, 1 first, 2 full, 3 last
    try {
      let mq = Astronomy.SearchMoonQuarter(from);
      for (let i = 0; i < 8; i++) {
        if (mq.quarter === wantQuarter) return mq.time.date;
        mq = Astronomy.NextMoonQuarter(mq);
      }
    } catch (e) {}
    return null;
  },

  drawMoon(k, waxing) {
    const cv = U.el("moon-canvas"), ctx = cv.getContext("2d");
    const size = cv.width, cx = size/2, cy = size/2, r = size/2 - 4;
    if (LOC.current.lat < 0) waxing = !waxing;   // southern hemisphere flips orientation
    ctx.clearRect(0,0,size,size);
    // dark disk with subtle texture
    ctx.beginPath(); ctx.arc(cx,cy,r,0,7);
    ctx.fillStyle = "#2b3245"; ctx.fill();
    // lit region, row by row (always geometrically correct)
    ctx.fillStyle = "#eef2ff";
    const a = 1 - 2*k;                      // signed terminator factor
    for (let y = -r; y <= r; y++) {
      const xh = Math.sqrt(Math.max(0, r*r - y*y));
      const xt = a * xh;                    // terminator x at this row
      let x0, x1;
      if (waxing) { x0 = xt; x1 = xh; } else { x0 = -xh; x1 = -xt; }
      if (x1 > x0) ctx.fillRect(cx + x0, cy + y, (x1 - x0), 1);
    }
    // rim
    ctx.beginPath(); ctx.arc(cx,cy,r,0,7);
    ctx.lineWidth = 1.5; ctx.strokeStyle = "rgba(200,215,255,0.5)"; ctx.stroke();
  },

  renderSun(now) {
    const rise = this.riseSet("Sun", +1, now);
    const set  = this.riseSet("Sun", -1, now);
    let dayLen = "—";
    if (rise && set) {
      // length of today: find today's rise then today's set after it
      const r0 = this.riseSet("Sun", +1, new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0));
      const s0 = r0 ? this.riseSet("Sun", -1, r0) : null;
      if (r0 && s0) {
        const mins = Math.round((s0 - r0)/60000);
        dayLen = `${Math.floor(mins/60)}h ${mins%60}m`;
      }
    }
    // astronomical darkness (Sun at -18°) — when real stargazing begins
    let darkStart = null, darkEnd = null;
    try {
      darkStart = Astronomy.SearchAltitude(Astronomy.Body.Sun, this.observer(), -1, now, 1, -18);
      darkEnd   = Astronomy.SearchAltitude(Astronomy.Body.Sun, this.observer(), +1, now, 1, -18);
    } catch(e){}

    U.el("sun-info").innerHTML = `
      <div class="kv"><span class="k">${t("tonight.sunrise")}</span><span class="v">${rise ? U.timeHMS(rise).slice(0,5) : "—"}</span></div>
      <div class="kv"><span class="k">${t("tonight.sunset")}</span><span class="v">${set ? U.timeHMS(set).slice(0,5) : "—"}</span></div>
      <div class="kv"><span class="k">${t("tonight.dayLength")}</span><span class="v">${dayLen}</span></div>
      <div class="kv"><span class="k">${t("tonight.darkBegins")}</span><span class="v">${darkStart ? U.timeHMS(darkStart.date).slice(0,5) : "—"}</span></div>
      <div class="kv"><span class="k">${t("tonight.dawnEnds")}</span><span class="v">${darkEnd ? U.timeHMS(darkEnd.date).slice(0,5) : "—"}</span></div>
      <p class="small muted" style="margin-top:10px;">${t("tonight.darkNote")}</p>`;
  },

  renderPlanets(now) {
    const bodies = ["Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune"];
    const colors = { Mercury:"#c9c2b6",Venus:"#f6e6bd",Mars:"#ff6b4a",Jupiter:"#e8c48c",Saturn:"#e6d3a3",Uranus:"#9fe6ea",Neptune:"#6f8cff" };
    const lstH = U.lst(now, LOC.current.lon);
    const rows = bodies.map(b => {
      let alt=null, az=null, mag=null;
      try {
        const eq = Astronomy.Equator(Astronomy.Body[b], now, this.observer(), true, true);
        const h = U.eqToHoriz(eq.ra, eq.dec, LOC.current.lat, lstH);
        alt = h.alt; az = h.az;
        mag = Astronomy.Illumination(Astronomy.Body[b], now).mag;
      } catch(e){}
      const rise = this.riseSet(b, +1, now);
      const set  = this.riseSet(b, -1, now);
      const up = alt !== null && alt > 0;
      const naked = mag !== null && mag < 6.0;
      return `
        <div class="body-row">
          <div class="ico" style="background:${colors[b]}"></div>
          <div>
            <div class="nm">${I18N.body(b)} ${naked ? "" : `<span class="small muted">(${t("common.telescope")})</span>`}</div>
            <div class="st">${up ? `${t("common.altitude")} ${alt.toFixed(0)}° · ${U.compass(az)} (${az.toFixed(0)}°)` : t("tonight.belowRises", { t: rise ? U.timeHMS(rise).slice(0,5) : "—" })}
              ${mag !== null ? ` · mag ${mag.toFixed(1)}` : ""}</div>
          </div>
          <div class="st" style="text-align:right;">↑ ${rise ? U.timeHMS(rise).slice(0,5) : "—"}<br>↓ ${set ? U.timeHMS(set).slice(0,5) : "—"}</div>
          <div><span class="badge ${up ? "up" : "down"}">${up ? t("common.up") : t("common.down")}</span></div>
        </div>`;
    });
    U.el("planet-list").innerHTML = rows.join("");
  }
};

window.Tonight = Tonight;
