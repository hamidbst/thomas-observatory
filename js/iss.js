/* =============================================================================
   iss.js  —  International Space Station
   Live position from the wheretheiss.at API (no key). Pass predictions computed
   locally from a fresh TLE (Celestrak) with satellite.js (SGP4).
   ============================================================================= */

const ISS = {
  canvas: null, ctx: null,
  land: null,
  satrec: null,
  last: null,          // last known {lat, lon, alt, vel}
  track: [],           // recent ground-track points
  timer: null,
  started: false,

  async init() {
    this.canvas = U.el("iss-canvas");
    this.ctx = this.canvas.getContext("2d");
    try { this.land = await U.json("data/land.geojson"); } catch(e) { this.land = null; }
    window.addEventListener("resize", () => this.draw());
    document.addEventListener("location-changed", () => { this.draw(); this.computePasses(); });
    document.addEventListener("language-changed", () => { if (this.last) this.stats(); this.paintPasses(this.lastPasses || []); });
  },

  start() {
    if (this.started) return;
    this.started = true;
    this.tick();
    this.timer = setInterval(() => this.tick(), CONFIG.ISS_REFRESH_SECONDS * 1000);
    this.loadTLEandPasses();
  },

  async tick() {
    try {
      const r = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
      const d = await r.json();
      this.last = { lat: d.latitude, lon: d.longitude, alt: d.altitude, vel: d.velocity, vis: d.visibility };
      this.track.push([d.longitude, d.latitude]);
      if (this.track.length > 90) this.track.shift();
      this.draw();
      this.stats();
    } catch (e) {
      U.el("iss-stats").innerHTML = `<div class="err" style="grid-column:1/-1">${t("iss.feedError")}</div>`;
    }
  },

  stats() {
    if (!this.last) return;
    const l = this.last;
    U.el("iss-stats").innerHTML = `
      <div class="stat"><div class="num">${l.lat.toFixed(1)}°</div><div class="lbl">${t("iss.lat")}</div></div>
      <div class="stat"><div class="num">${l.lon.toFixed(1)}°</div><div class="lbl">${t("iss.lon")}</div></div>
      <div class="stat"><div class="num">${Math.round(l.alt)}</div><div class="lbl">${t("iss.alt")}</div></div>
      <div class="stat"><div class="num">${Math.round(l.vel).toLocaleString(U.locale())}</div><div class="lbl">${t("iss.speed")}</div></div>`;
  },

  // equirectangular projection
  xy(lon, lat, W, H) { return [ (lon + 180) / 360 * W, (90 - lat) / 180 * H ]; },

  draw() {
    if (!this.ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = this.canvas.clientWidth || 720, H = W / 2;
    this.canvas.width = W * dpr; this.canvas.height = H * dpr;
    this.canvas.style.height = H + "px";
    const ctx = this.ctx;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    // ocean
    const og = ctx.createLinearGradient(0,0,0,H);
    og.addColorStop(0,"#0a1f38"); og.addColorStop(1,"#06121f");
    ctx.fillStyle = og; ctx.fillRect(0,0,W,H);

    // land
    if (this.land) {
      ctx.fillStyle = "#14351f"; ctx.strokeStyle = "rgba(110,231,168,0.35)"; ctx.lineWidth = 0.6;
      this.land.features.forEach(f => {
        const polys = f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : [f.geometry.coordinates];
        polys.forEach(poly => poly.forEach(ring => {
          ctx.beginPath();
          ring.forEach(([lon,lat], i) => { const [x,y] = this.xy(lon,lat,W,H); i ? ctx.lineTo(x,y) : ctx.moveTo(x,y); });
          ctx.closePath(); ctx.fill(); ctx.stroke();
        }));
      });
    }
    // graticule
    ctx.strokeStyle = "rgba(125,180,255,0.10)"; ctx.lineWidth = 0.5;
    for (let lon=-150; lon<=150; lon+=30){ const [x] = this.xy(lon,0,W,H); ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let lat=-60; lat<=60; lat+=30){ const [,y] = this.xy(0,lat,W,H); ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    // observer
    const o = LOC.current; const [ox,oy] = this.xy(o.lon,o.lat,W,H);
    ctx.fillStyle = "#7db4ff"; ctx.beginPath(); ctx.arc(ox,oy,3,0,7); ctx.fill();
    ctx.strokeStyle="rgba(125,180,255,0.6)"; ctx.beginPath(); ctx.arc(ox,oy,7,0,7); ctx.stroke();

    // ground track
    if (this.track.length > 1) {
      ctx.strokeStyle = "rgba(255,207,107,0.5)"; ctx.lineWidth = 1.5; ctx.beginPath();
      this.track.forEach(([lon,lat], i) => {
        const [x,y] = this.xy(lon,lat,W,H);
        if (i===0) ctx.moveTo(x,y);
        else { const [px] = this.xy(this.track[i-1][0],0,W,H); if (Math.abs(x-px) > W*0.5) ctx.moveTo(x,y); else ctx.lineTo(x,y); }
      });
      ctx.stroke();
    }
    // ISS marker
    if (this.last) {
      const [x,y] = this.xy(this.last.lon,this.last.lat,W,H);
      ctx.fillStyle="#fff"; ctx.font="16px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.shadowColor="rgba(255,207,107,0.9)"; ctx.shadowBlur=12;
      ctx.fillText("🛰️", x, y);
      ctx.shadowBlur=0;
    }
  },

  async loadTLEandPasses() {
    try {
      const r = await fetch("https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE");
      const txt = await r.text();
      const lines = txt.trim().split("\n").map(s => s.trim());
      const i1 = lines.findIndex(l => l.startsWith("1 "));
      if (i1 < 0) throw new Error("no TLE");
      this.satrec = satellite.twoline2satrec(lines[i1], lines[i1+1]);
      this.computePasses();
    } catch (e) {
      U.el("iss-passes").innerHTML = `<p class="muted small">${t("iss.tleError")}</p>`;
    }
  },

  computePasses() {
    if (!this.satrec) return;
    const o = LOC.current;
    const gd = { longitude: o.lon * U.DEG, latitude: o.lat * U.DEG, height: (o.elevation||0)/1000 };
    const passes = [];
    const stepMs = 30000, horizon = 10;   // degrees
    let inPass = false, cur = null;
    const startT = Date.now();
    for (let t = startT; t < startT + 3*86400*1000; t += stepMs) {
      const date = new Date(t);
      let el, az;
      try {
        const pv = satellite.propagate(this.satrec, date);
        if (!pv.position) continue;
        const gmst = satellite.gstime(date);
        const ecf = satellite.eciToEcf(pv.position, gmst);
        const look = satellite.ecfToLookAngles(gd, ecf);
        el = look.elevation * U.RAD; az = look.azimuth * U.RAD;
      } catch(e){ continue; }
      if (el >= horizon && !inPass) { inPass = true; cur = { start: date, startAz: az, maxEl: el, maxAz: az }; }
      else if (el >= horizon && inPass) { if (el > cur.maxEl) { cur.maxEl = el; cur.maxAz = az; } }
      else if (el < horizon && inPass) { inPass = false; cur.end = date; cur.endAz = az; passes.push(cur); if (passes.length >= 6) break; }
    }
    this.lastPasses = passes;
    this.paintPasses(passes);
  },

  sunAlt(date) {
    try {
      const obs = new Astronomy.Observer(LOC.current.lat, LOC.current.lon, LOC.current.elevation||0);
      const eq = Astronomy.Equator(Astronomy.Body.Sun, date, obs, true, true);
      const h = U.eqToHoriz(eq.ra, eq.dec, LOC.current.lat, U.lst(date, LOC.current.lon));
      return h.alt;
    } catch(e){ return 0; }
  },

  paintPasses(passes) {
    const host = U.el("iss-passes");
    if (!host) return;
    if (!passes.length) { host.innerHTML = `<p class="muted small">${t("iss.noPasses")}</p>`; return; }
    host.innerHTML = passes.map(p => {
      const durMin = Math.round((p.end - p.start)/60000);
      const sun = this.sunAlt(p.start);
      const visible = sun < -6 && p.maxEl > 15;
      const day = p.start.toLocaleDateString(U.locale(),{weekday:"short", month:"short", day:"numeric"});
      const line = t("iss.passLine", { a1: U.compass(p.startAz), el: p.maxEl.toFixed(0), a2: U.compass(p.maxAz), a3: U.compass(p.endAz) });
      const tag = visible ? ` · <span style='color:var(--good)'>${t("iss.visible")}</span>` : ` · ${t("iss.daylight")}`;
      return `
        <div class="pass">
          <div>
            <div class="when">${visible ? "✨ " : ""}${day} · ${U.timeHMS(p.start).slice(0,5)}</div>
            <div class="info">${line}${tag}</div>
          </div>
          <div class="dur">${durMin} ${t("common.min")}</div>
        </div>`;
    }).join("");
  }
};

window.ISS = ISS;
