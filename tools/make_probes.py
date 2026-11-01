"""Build data/probes.json for the "Sondes & télescopes" tab from JPL Horizons.

For each Voyager:
  state  : heliocentric position (AU) and velocity (AU/day) at EPOCH, ICRF/J2000
           equatorial axes (same as Astronomy Engine's EQJ), so the page can
           extrapolate linearly (gravity changes this by < 1e-5 AU per year).
  path   : [year, x, y, z]: decimal year and heliocentric ecliptic x, y, z (AU) since
           launch, for the top-view map and its timeline.
Usage: python make_probes.py <output.json>
"""
import json, sys, urllib.parse, urllib.request

EPOCH = "2026-11-01"
API = "https://ssd.jpl.nasa.gov/api/horizons.api"
PROBES = {"v1": ("-31", "1977-09-08"), "v2": ("-32", "1977-08-23")}


def horizons(cmd, start, stop, step, plane):
    q = {"format": "text", "COMMAND": f"'{cmd}'", "OBJ_DATA": "'NO'", "MAKE_EPHEM": "'YES'",
         "EPHEM_TYPE": "'VECTORS'", "CENTER": "'500@10'", "REF_PLANE": f"'{plane}'",
         "REF_SYSTEM": "'ICRF'", "VEC_TABLE": "'2'", "OUT_UNITS": "'AU-D'", "CSV_FORMAT": "'YES'",
         "START_TIME": f"'{start}'", "STOP_TIME": f"'{stop}'", "STEP_SIZE": f"'{step}'"}
    txt = urllib.request.urlopen(API + "?" + urllib.parse.urlencode(q), timeout=60).read().decode()
    body = txt.split("$$SOE")[1].split("$$EOE")[0]
    rows = []
    for line in body.strip().splitlines():
        f = [x.strip() for x in line.split(",")]
        rows.append((float(f[0]), [float(v) for v in f[2:8]]))   # Julian date, state
    return rows


out = {"epoch": EPOCH + "T00:00:00Z", "source": "NASA/JPL Horizons", "probes": {}}
for key, (cmd, launch) in PROBES.items():
    st = horizons(cmd, EPOCH, "2026-11-02", "1d", "FRAME")[0][1]
    path = []
    for start, stop, step in [(launch, "1990-01-01", "5d"), ("1990-01-01", EPOCH, "90d")]:
        for jd, v in horizons(cmd, start, stop, step, "ECLIPTIC"):
            year = 2000 + (jd - 2451545.0) / 365.25
            if path and year <= path[-1][0]:
                continue                                   # the two ranges share 1990-01-01
            path.append([round(year, 4), round(v[0], 3), round(v[1], 3), round(v[2], 3)])
    out["probes"][key] = {"pos": st[0:3], "vel": st[3:6], "path": path}
    print(key, "pos", [round(x, 2) for x in st[0:3]], "points", len(path))

with open(sys.argv[1], "w", encoding="utf-8") as fh:
    json.dump(out, fh, separators=(",", ":"))
