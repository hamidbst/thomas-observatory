/* =============================================================================
   util.js  —  shared math, formatting, and small helpers
   ============================================================================= */

const U = {
  DEG: Math.PI / 180,
  RAD: 180 / Math.PI,

  clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); },
  norm360(d) { d %= 360; return d < 0 ? d + 360 : d; },
  norm24(h) { h %= 24; return h < 0 ? h + 24 : h; },

  // Greenwich apparent sidereal time (hours) via Astronomy Engine.
  gast(date) { return Astronomy.SiderealTime(date); },

  // Local sidereal time (hours) at a given east-longitude (deg).
  lst(date, lonDeg) { return U.norm24(Astronomy.SiderealTime(date) + lonDeg / 15); },

  /* Convert equatorial (RA hours, Dec deg) to horizontal (alt/az in deg)
     for an observer at latitude latDeg and local sidereal time lstHours.
     Azimuth measured from North (0°), increasing eastward. */
  eqToHoriz(raHours, decDeg, latDeg, lstHours) {
    const ha = U.norm24(lstHours - raHours) * 15 * U.DEG; // hour angle in rad
    const dec = decDeg * U.DEG, lat = latDeg * U.DEG;
    const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha);
    const alt = Math.asin(U.clamp(sinAlt, -1, 1));
    let cosA = (Math.sin(dec) - Math.sin(lat) * sinAlt) / (Math.cos(lat) * Math.cos(alt));
    cosA = U.clamp(cosA, -1, 1);
    let az = Math.acos(cosA);
    if (Math.sin(ha) > 0) az = 2 * Math.PI - az;   // resolve E/W ambiguity
    return { alt: alt * U.RAD, az: az * U.RAD };
  },

  // Compass label for an azimuth in degrees (localized).
  compass(az) {
    const dirs = (window.I18N ? I18N.compass() : ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]);
    return dirs[Math.round(U.norm360(az) / 22.5) % 16];
  },

  // B-V colour index -> approximate star RGB.
  bvColor(bv) {
    bv = parseFloat(bv);
    if (isNaN(bv)) bv = 0.6;
    bv = U.clamp(bv, -0.4, 2.0);
    let r, g, b, t;
    if (bv < 0.0)      { t = (bv + 0.4) / 0.4; r = 0.61 + 0.11*t + 0.1*t*t; g = 0.70 + 0.07*t + 0.1*t*t; b = 1.0; }
    else if (bv < 0.4) { t = bv / 0.4;         r = 0.83 + 0.17*t;          g = 0.87 + 0.11*t;          b = 1.0; }
    else if (bv < 1.6) { t = (bv - 0.4) / 1.2; r = 1.0;  g = 0.98 - 0.16*t; b = 1.0 - 0.5*t - 0.4*t*t; }
    else               { t = (bv - 1.6) / 0.4; r = 1.0;  g = 0.82 - 0.5*t;  b = 0.1; }
    const to = v => Math.round(U.clamp(v, 0, 1) * 255);
    return `rgb(${to(r)},${to(g)},${to(b)})`;
  },

  // Fetch + cache JSON data files.
  _cache: {},
  async json(path) {
    if (U._cache[path]) return U._cache[path];
    const r = await fetch(path);
    if (!r.ok) throw new Error(`Failed to load ${path} (${r.status})`);
    const j = await r.json();
    U._cache[path] = j;
    return j;
  },

  // Formatting -------------------------------------------------------------
  pad(n) { return String(n).padStart(2, "0"); },

  timeHM(date) {
    if (!date) return "—";
    const d = date instanceof Date ? date : date.date;
    return `${U.pad(d.getHours())}:${U.pad(d.getMinutes())}`;
  },
  timeHMS(date) { return `${U.pad(date.getHours())}:${U.pad(date.getMinutes())}:${U.pad(date.getSeconds())}`; },

  locale() { return window.I18N ? I18N.locale() : undefined; },

  dateLong(d) {
    return d.toLocaleDateString(U.locale(), { weekday:"long", year:"numeric", month:"long", day:"numeric" });
  },
  dateShort(d) {
    return d.toLocaleDateString(U.locale(), { month:"short", day:"numeric" });
  },
  monthShort(d) {
    return d.toLocaleDateString(U.locale(), { month:"short" });
  },

  // Human "3d 4h", "2h 10m", "45m", "now" (day unit localized: d / j)
  countdown(target, from = new Date()) {
    let s = Math.round((target - from) / 1000);
    const dayU = (window.I18N && I18N.lang === "fr") ? "j" : "d";
    if (s <= 0) return window.I18N ? I18N.t("common.now") : "now";
    const d = Math.floor(s/86400); s -= d*86400;
    const h = Math.floor(s/3600);  s -= h*3600;
    const m = Math.floor(s/60);
    if (d > 0) return `${d}${dayU} ${h}h`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  },

  el(id) { return document.getElementById(id); },
  esc(str) { return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); },
};

window.U = U;
