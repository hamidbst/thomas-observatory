# 🔭 Observatory — a live astronomy dashboard

A self-contained website that shows the **real sky right now** for your location,
tonight's Moon and planets, upcoming astronomical events, the live position of the
International Space Station, and the latest space news + NASA's Astronomy Picture
of the Day.

Built for a curious mind that already knows the basics — real data, real
calculations, no dumbing-down.

---

## 1. Make it yours (30 seconds)

Open **`js/config.js`** in any text editor and change the top few lines:

```js
OWNER_NAME: "Explorer",          // your name  → "Aria's Observatory"
HOME: {
  name: "Home",                  // your city name
  lat: 40.7128,                  // your latitude  (North +, South −)
  lon: -74.0060,                 // your longitude (East +,  West −)
},
```

Find your latitude/longitude at <https://www.latlong.net> (search your city, copy
the two numbers). That's the only required change.

Optional: get a free NASA key at <https://api.nasa.gov> (takes 30 seconds) and paste
it into `NASA_API_KEY` for higher picture/news limits. The built-in `DEMO_KEY` works
too, just with a lower hourly limit.

---

## 2. Run it on your computer

The site loads data files, so it needs to be *served* (not just double-clicked).
From this folder run **one** of:

```bash
python -m http.server 8777
```

then open <http://localhost:8777> in a browser. (Any static file server works.)

---

## 3. Put it online (free, so he can open it anywhere)

**Easiest — Netlify Drop (no coding, ~1 minute):**

1. Go to <https://app.netlify.com/drop>
2. Drag this whole `astro-observatory` folder onto the page.
3. You instantly get a public link like `https://starry-sky-1234.netlify.app`.
4. (Optional) Make a free Netlify account to keep the link permanently and rename it.

**Alternative — GitHub Pages:** create a repo, upload these files, then
Settings → Pages → deploy from the `main` branch. Your site appears at
`https://<username>.github.io/<repo>/`.

Everything is static — no server, database, or paid service is ever required.

---

## What's under the hood

| Feature | Where the data comes from |
|---|---|
| Live sky map (stars, constellations, deep-sky objects, Milky Way) | Open **d3-celestial** catalogs, bundled in `data/` |
| Planet / Moon / Sun positions, rise-set, phases, eclipses, oppositions, seasons | **Astronomy Engine** (computed in your browser, works offline) |
| ISS live position | **wheretheiss.at** API |
| ISS pass predictions | **satellite.js** (SGP4) with fresh orbital data from **Celestrak** |
| Picture of the Day | **NASA APOD** API |
| Space headlines | **Spaceflight News** API |

All libraries are MIT-licensed and vendored locally in `vendor/`, so the core of the
site keeps working even with no internet — only the live news, picture, and ISS feed
need a connection.

## Files

```
index.html         the page
css/styles.css     the deep-space theme
js/config.js       ← your settings live here
js/skymap.js       the live star chart
js/tonight.js      Moon, Sun, planets tonight
js/events.js       eclipses, phases, oppositions, meteor showers
js/iss.js          ISS tracker + passes
js/news.js         APOD + news
js/*.js            supporting modules
data/              star & map catalogs
vendor/            astronomy libraries
```

Clear skies! ✨
