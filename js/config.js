/* =============================================================================
   config.js  —  The ONE place to change personal settings.
   -----------------------------------------------------------------------------
   Everything you might want to tweak lives here. No need to touch other files.
   ============================================================================= */

const CONFIG = {

  // --- Who is this for? -------------------------------------------------------
  // Shown in the title and header, e.g. "Aria's Observatory".
  OWNER_NAME: "Thomas Nima",       // <-- CHANGE to your son's name

  // --- Fallback location ------------------------------------------------------
  // The site now defaults to the visitor's REAL location. This city is only the
  // fallback, used when the browser can't or won't share the location.
  // Find coordinates at https://www.latlong.net if you want to change it.
  HOME: {
    name: "La Colle-sur-Loup",     // <-- CHANGE to your city name
    lat: 43.6847,                  // <-- CHANGE latitude  (North = +, South = -)
    lon: 7.0967,                   // <-- CHANGE longitude (East  = +, West  = -)
    elevation: 90                  // metres above sea level (rough is fine)
  },

  // --- NASA API key -----------------------------------------------------------
  // "DEMO_KEY" works out of the box but is rate-limited. Get a free key in
  // 30 seconds at https://api.nasa.gov and paste it here for higher limits.
  NASA_API_KEY: "7xZYdBtLGKnhEp9kyari6hgEKrccj9hoaY6DJCOk",

  // --- Behaviour tuning -------------------------------------------------------
  SKY_REFRESH_SECONDS: 60,         // how often the live sky redraws
  ISS_REFRESH_SECONDS: 5,          // how often the ISS position updates
  EVENTS_MONTHS_AHEAD: 9,          // how far ahead the events calendar looks
  STAR_MAG_LIMIT: 5.6,             // faintest stars drawn on the map (higher = more)
};

// Make available everywhere.
window.CONFIG = CONFIG;
