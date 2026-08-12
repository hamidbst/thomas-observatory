/* =============================================================================
   skymap.js  —  live all-sky star chart
   Projection: azimuthal-equidistant centred on the zenith.
   Centre = straight up; edge of circle = horizon. North at top, East at left.
   ============================================================================= */

const Sky = {
  canvas: null, ctx: null, tip: null,
  size: 800, cx: 400, cy: 400, R: 392,
  offsetMin: 0,
  toggles: { lines: true, labels: true, dsos: true, mw: true, planets: true },
  data: {},           // stars, lines, dsos, mw, names
  drawn: [],          // hit-test list for hover
  ready: false,

  PLANETS: [
    ["Mercury", "#c9c2b6"], ["Venus", "#f6e6bd"], ["Mars", "#ff6b4a"],
    ["Jupiter", "#e8c48c"], ["Saturn", "#e6d3a3"], ["Uranus", "#9fe6ea"], ["Neptune", "#6f8cff"]
  ],

  async init() {
    this.canvas = U.el("skymap");
    this.ctx = this.canvas.getContext("2d");
    this.tip = U.el("sky-tip");

    // load catalogs
    try {
      const [stars, lines, cons, dsos, mw, names] = await Promise.all([
        U.json("data/stars.6.json"),
        U.json("data/constellations.lines.json"),
        U.json("data/constellations.json"),
        U.json("data/dsos.bright.json"),
        U.json("data/mw.json"),
        U.json("data/starnames.json"),
      ]);
      this.data = { stars: stars.features, lines: lines.features, cons: cons.features,
                    dsos: dsos.features, mw: mw.features, names };
      this.ready = true;
    } catch (e) {
      console.error(e);
      U.el("sky-intro").innerHTML = `<span class="err">Could not load star data: ${U.esc(e.message)}</span>`;
      return;
    }

    // controls
    document.querySelectorAll("[data-toggle]").forEach(ch => {
      ch.addEventListener("click", () => {
        const k = ch.dataset.toggle;
        this.toggles[k] = !this.toggles[k];
        ch.classList.toggle("on", this.toggles[k]);
        this.render();
      });
    });
    const slider = U.el("sky-time");
    slider.addEventListener("input", () => {
      this.offsetMin = parseInt(slider.value, 10);
      U.el("sky-time-label").textContent = this.offsetLabel();
      this.render();
    });
    U.el("sky-now").addEventListener("click", () => {
      this.offsetMin = 0; slider.value = 0;
      U.el("sky-time-label").textContent = t("common.now"); this.render();
    });

    // hover
    this.canvas.addEventListener("mousemove", (e) => this.hover(e));
    this.canvas.addEventListener("mouseleave", () => { this.tip.style.display = "none"; });

    window.addEventListener("resize", () => { this.resize(); this.render(); });
    document.addEventListener("location-changed", () => this.render());
    document.addEventListener("language-changed", () => this.render());

    this.resize();
    this.render();
    setInterval(() => { if (this.offsetMin === 0) this.render(); }, CONFIG.SKY_REFRESH_SECONDS * 1000);
  },

  offsetLabel() {
    if (this.offsetMin === 0) return t("common.now");
    const sign = this.offsetMin > 0 ? "+" : "−";
    const m = Math.abs(this.offsetMin);
    const h = Math.floor(m / 60), mm = m % 60;
    return `${sign}${h ? h + "h " : ""}${mm}m`;
  },

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const css = this.canvas.clientWidth || 800;
    this.size = css;
    this.canvas.width = Math.round(css * dpr);
    this.canvas.height = Math.round(css * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cx = css / 2; this.cy = css / 2; this.R = css / 2 - 8;
  },

  now() { return new Date(Date.now() + this.offsetMin * 60000); },

  // project horizontal coords to screen; returns null if well below horizon
  project(alt, az) {
    if (alt < -1.5) return null;
    const r = (90 - alt) / 90 * this.R;
    const a = az * U.DEG;
    return { x: this.cx - r * Math.sin(a), y: this.cy - r * Math.cos(a), r };
  },

  render() {
    if (!this.ready) return;
    const ctx = this.ctx, date = this.now();
    const lat = LOC.current.lat, lon = LOC.current.lon;
    const lst = U.lst(date, lon);
    this.drawn = [];

    // clear
    ctx.clearRect(0, 0, this.size, this.size);

    // horizon disk + zenith glow
    ctx.save();
    const g = ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, this.R);
    g.addColorStop(0, "#0b1436"); g.addColorStop(0.8, "#070a1c"); g.addColorStop(1, "#04060f");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(this.cx, this.cy, this.R, 0, 7); ctx.fill();
    ctx.restore();

    // clip everything to the horizon circle
    ctx.save();
    ctx.beginPath(); ctx.arc(this.cx, this.cy, this.R, 0, 7); ctx.clip();

    if (this.toggles.mw) this.drawMilkyWay(lat, lst);
    this.drawAltRings();
    if (this.toggles.lines) this.drawConstellations(lat, lst);
    this.drawStars(lat, lst);
    if (this.toggles.dsos) this.drawDSOs(lat, lst);
    if (this.toggles.labels) this.drawConNames(lat, lst);
    if (this.toggles.planets) this.drawSolarSystem(date, lat, lon, lst);

    ctx.restore();

    // horizon ring + cardinal directions
    this.drawFrame();
    this.updateVisiblePanel();
  },

  drawAltRings() {
    const ctx = this.ctx;
    ctx.strokeStyle = "rgba(125,160,230,0.10)"; ctx.lineWidth = 1;
    [30, 60].forEach(alt => {
      const r = (90 - alt) / 90 * this.R;
      ctx.beginPath(); ctx.arc(this.cx, this.cy, r, 0, 7); ctx.stroke();
    });
  },

  drawFrame() {
    const ctx = this.ctx;
    ctx.strokeStyle = "rgba(140,180,255,0.35)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(this.cx, this.cy, this.R, 0, 7); ctx.stroke();
    ctx.fillStyle = "rgba(180,200,255,0.85)";
    ctx.font = "600 14px " + "Segoe UI, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const m = 16;
    const c = (window.I18N && I18N.cardinals[I18N.lang]) || ["N","E","S","W"];
    ctx.fillText(c[0], this.cx, m - 2);              // North (top)
    ctx.fillText(c[2], this.cx, this.size - m + 2);  // South (bottom)
    ctx.fillText(c[1], m - 2, this.cy);              // East (left)
    ctx.fillText(c[3], this.size - m + 2, this.cy);  // West (right)
  },

  drawMilkyWay(lat, lst) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    this.data.mw.forEach(f => {
      const polys = f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : [f.geometry.coordinates];
      polys.forEach(poly => {
        poly.forEach(ring => {
          let started = false, anyUp = false;
          ctx.beginPath();
          for (const [ra, dec] of ring) {
            const h = U.eqToHoriz(U.norm24(ra / 15), dec, lat, lst);
            const p = this.project(h.alt, h.az);
            if (!p) { started = false; continue; }
            if (h.alt > 0) anyUp = true;
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else ctx.lineTo(p.x, p.y);
          }
          if (anyUp) { ctx.closePath(); ctx.fillStyle = "rgba(120,150,235,0.045)"; ctx.fill(); }
        });
      });
    });
    ctx.restore();
  },

  drawConstellations(lat, lst) {
    const ctx = this.ctx;
    ctx.strokeStyle = "rgba(120,165,255,0.34)"; ctx.lineWidth = 1;
    this.data.lines.forEach(f => {
      const segs = f.geometry.coordinates;
      segs.forEach(seg => {
        ctx.beginPath();
        let prev = null;
        for (const [ra, dec] of seg) {
          const h = U.eqToHoriz(U.norm24(ra / 15), dec, lat, lst);
          if (h.alt <= 0) { prev = null; continue; }
          const p = this.project(h.alt, h.az);
          if (!p) { prev = null; continue; }
          if (prev) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
          prev = p;
        }
        ctx.stroke();
      });
    });
  },

  drawStars(lat, lst) {
    const ctx = this.ctx;
    const limit = CONFIG.STAR_MAG_LIMIT;
    for (const f of this.data.stars) {
      const mag = f.properties.mag;
      if (mag > limit) continue;
      const [ra, dec] = f.geometry.coordinates;
      const h = U.eqToHoriz(U.norm24(ra / 15), dec, lat, lst);
      if (h.alt <= 0) continue;
      const p = this.project(h.alt, h.az);
      if (!p) continue;
      const rad = Math.max(0.5, (limit + 0.7 - mag) * 0.52);
      ctx.beginPath();
      ctx.fillStyle = U.bvColor(f.properties.bv);
      ctx.globalAlpha = U.clamp(1.1 - mag / (limit + 1), 0.35, 1);
      ctx.arc(p.x, p.y, rad, 0, 7); ctx.fill();
      ctx.globalAlpha = 1;

      // bright named stars: label + hit target
      if (mag < 2.6) {
        const nm = this.data.names[f.id] && this.data.names[f.id].name;
        if (nm) {
          this.drawn.push({ x: p.x, y: p.y, name: nm,
            meta: `${t("sky.star")} · mag ${mag.toFixed(2)} · ${h.alt.toFixed(0)}° ${U.compass(h.az)}` });
          if (this.toggles.labels && mag < 1.8) {
            ctx.fillStyle = "rgba(215,225,255,0.75)";
            ctx.font = "11px Segoe UI, sans-serif";
            ctx.textAlign = "left"; ctx.textBaseline = "middle";
            ctx.fillText(nm, p.x + rad + 3, p.y);
          }
        }
      }
    }
  },

  drawDSOs(lat, lst) {
    const ctx = this.ctx;
    for (const f of this.data.dsos) {
      const [ra, dec] = f.geometry.coordinates;
      const h = U.eqToHoriz(U.norm24(ra / 15), dec, lat, lst);
      if (h.alt <= 0) continue;
      const p = this.project(h.alt, h.az);
      if (!p) continue;
      const pr = f.properties;
      const name = pr.name || pr.desig || (pr.messier ? "M" + pr.messier : "");
      ctx.save();
      ctx.strokeStyle = "rgba(196,150,255,0.9)"; ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - 4); ctx.lineTo(p.x + 4, p.y);
      ctx.lineTo(p.x, p.y + 4); ctx.lineTo(p.x - 4, p.y); ctx.closePath();
      ctx.stroke();
      ctx.restore();
      let short = name;
      this.drawn.push({ x: p.x, y: p.y, name: name || t("sky.dso"),
        meta: `${this.dsoType(pr.type)} · ${h.alt.toFixed(0)}° ${U.compass(h.az)}` });
      if (this.toggles.labels && short) {
        ctx.fillStyle = "rgba(200,170,255,0.7)";
        ctx.font = "10px Segoe UI, sans-serif";
        ctx.textAlign = "left"; ctx.textBaseline = "middle";
        ctx.fillText(short, p.x + 6, p.y);
      }
    }
  },

  dsoType(type) {
    const map = { gg:"Galaxy", g:"Galaxy", gc:"Globular cluster", oc:"Open cluster",
      pn:"Planetary nebula", dn:"Nebula", bn:"Nebula", sfr:"Star-forming region",
      snr:"Supernova remnant" };
    return I18N.dsotypeName(map[type] || "Deep-sky object");
  },

  drawConNames(lat, lst) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(150,180,255,0.5)";
    ctx.font = "italic 12px Segoe UI, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (const f of this.data.cons) {
      if (!f.geometry) continue;
      const [ra, dec] = f.geometry.coordinates;
      const h = U.eqToHoriz(U.norm24(ra / 15), dec, lat, lst);
      if (h.alt < 8) continue;
      const p = this.project(h.alt, h.az);
      if (!p) continue;
      ctx.fillText(f.properties.name, p.x, p.y);
    }
  },

  drawSolarSystem(date, lat, lon, lst) {
    const ctx = this.ctx;
    const observer = new Astronomy.Observer(lat, lon, LOC.current.elevation || 0);

    const place = (body) => {
      const eq = Astronomy.Equator(Astronomy.Body[body], date, observer, true, true);
      return U.eqToHoriz(eq.ra, eq.dec, lat, lst);
    };

    // Sun (only when up)
    try {
      const hs = place("Sun");
      if (hs.alt > 0) {
        const p = this.project(hs.alt, hs.az);
        if (p) { this.disk(p, 9, "#ffd66b", "#ffb43a"); this.label(p, I18N.body("Sun"), 9);
          this.drawn.push({ x:p.x, y:p.y, name:I18N.body("Sun"), meta:`${hs.alt.toFixed(0)}° ${U.compass(hs.az)}` }); }
      }
    } catch(e){}

    // Moon
    try {
      const hm = place("Moon");
      if (hm.alt > 0) {
        const p = this.project(hm.alt, hm.az);
        if (p) {
          const ill = Astronomy.Illumination(Astronomy.Body.Moon, date);
          this.moonGlyph(p, 8, ill.phase_fraction, ill.phase_angle);
          this.label(p, I18N.body("Moon"), 8);
          this.drawn.push({ x:p.x, y:p.y, name:I18N.body("Moon"),
            meta:`${Math.round(ill.phase_fraction*100)}% ${t("common.lit")} · ${hm.alt.toFixed(0)}° ${U.compass(hm.az)}` });
        }
      }
    } catch(e){}

    // Planets
    for (const [body, color] of this.PLANETS) {
      try {
        const h = place(body);
        if (h.alt <= 0) continue;
        const p = this.project(h.alt, h.az);
        if (!p) continue;
        const rad = (body === "Jupiter" || body === "Venus") ? 5 : (body === "Uranus" || body === "Neptune" ? 3 : 4);
        this.disk(p, rad, color, color);
        this.drawn.push({ x:p.x, y:p.y, name:I18N.body(body),
          meta:`${t("sky.planet")} · ${h.alt.toFixed(0)}° ${U.compass(h.az)}` });
        if (this.toggles.labels) this.label(p, I18N.body(body), rad);
      } catch(e){}
    }
  },

  disk(p, r, fill, ring) {
    const ctx = this.ctx;
    ctx.beginPath(); ctx.arc(p.x, p.y, r + 2, 0, 7);
    ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fill();
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7);
    ctx.fillStyle = fill; ctx.fill();
    ctx.lineWidth = 1; ctx.strokeStyle = ring; ctx.stroke();
  },

  moonGlyph(p, r, frac, phaseAngle) {
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7);
    ctx.fillStyle = "#3a4256"; ctx.fill();   // dark side
    // lit fraction as a simple crescent overlay
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.clip();
    ctx.fillStyle = "#e9eefb";
    const waxing = (phaseAngle <= 180);
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, r * Math.abs(1 - 2*frac), r, 0, 0, 7);
    // draw lit half then subtract — approximate
    ctx.fillRect(waxing ? p.x : p.x - r, p.y - r, r, 2*r);
    ctx.fillStyle = frac > 0.5 ? "#e9eefb" : "#3a4256";
    ctx.beginPath(); ctx.ellipse(p.x, p.y, r*Math.abs(1-2*frac), r, 0, 0, 7); ctx.fill();
    ctx.restore();
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7);
    ctx.lineWidth = 1; ctx.strokeStyle = "rgba(220,230,255,0.6)"; ctx.stroke();
  },

  label(p, text, r) {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(255,240,210,0.92)";
    ctx.font = "600 11px Segoe UI, sans-serif";
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText(text, p.x + r + 4, p.y);
  },

  hover(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    let best = null, bd = 16 * 16;
    for (const o of this.drawn) {
      const d = (o.x - mx) ** 2 + (o.y - my) ** 2;
      if (d < bd) { bd = d; best = o; }
    }
    if (best) {
      this.tip.style.display = "block";
      this.tip.style.left = (mx + 14) + "px";
      this.tip.style.top = (my + 10) + "px";
      this.tip.innerHTML = `<div class="name">${U.esc(best.name)}</div><div class="meta">${U.esc(best.meta)}</div>`;
    } else {
      this.tip.style.display = "none";
    }
  },

  // side panel: what's up now (planets + moon)
  updateVisiblePanel() {
    const date = this.now();
    const lat = LOC.current.lat, lon = LOC.current.lon, lst = U.lst(date, lon);
    const observer = new Astronomy.Observer(lat, lon, LOC.current.elevation || 0);
    const rows = [];
    const check = (body, label) => {
      try {
        const eq = Astronomy.Equator(Astronomy.Body[body], date, observer, true, true);
        const h = U.eqToHoriz(eq.ra, eq.dec, lat, lst);
        if (h.alt > 0) rows.push(`<div class="kv"><span class="k">${label}</span><span class="v">${h.alt.toFixed(0)}° · ${U.compass(h.az)}</span></div>`);
      } catch(e){}
    };
    check("Moon", "🌙 " + I18N.body("Moon"));
    ["Venus","Mars","Jupiter","Saturn","Mercury","Uranus","Neptune"].forEach(b => check(b, planetEmoji(b) + " " + I18N.body(b)));
    const host = U.el("sky-visible");
    if (host) host.innerHTML = rows.length
      ? `<div class="section-title" style="margin-top:14px;">${t("sky.upNow")}</div>${rows.join("")}`
      : `<p class="small muted" style="margin-top:14px;">${t("sky.none")}</p>`;
  }
};

function planetEmoji(b){ return ({Mercury:"☿",Venus:"♀",Mars:"♂",Jupiter:"♃",Saturn:"♄",Uranus:"⛢",Neptune:"♆"})[b]||"•"; }

window.Sky = Sky;
