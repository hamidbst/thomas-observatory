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

  // --- Contact form key -------------------------------------------------------
  // Switches on the "Write to me" box on the About page. Messages are emailed to
  // whatever address you register — no server needed, and the email stays private.
  // To get a free key (30 seconds): go to https://web3forms.com , enter the parent's
  // email, press "Create Access Key", check that inbox, then paste the key here.
  // Until this is filled in, the form politely says it isn't switched on yet.
  CONTACT_KEY: "6fe3049e-2088-42b8-882c-36659cb2e0f6",

  // --- Newsletter sign-up (Brevo) -------------------------------------------------
  // The "Destination Space" (Cap sur l'espace) box at the bottom of every page. Each value is the address
  // of a Brevo subscription form (one per language, each adding people to its own
  // list and sending the confirmation email). In Brevo: open the form → Share /
  // Embed → copy the form's action address (https://…sibforms.com/serve/…).
  // These addresses are public by design, not secrets. Until both are filled in,
  // the box stays hidden.
  NEWSLETTER_FORMS: {
    fr: "https://31e2a1a9.sibforms.com/serve/MUIFAEBI0vVZuBYIG9_NFuYolNWZRzggOz3aTSEGp3cpmz0T_TMLEDLv7H7Q0iHhEH7Ad0btljQauwz-sgx57SIcnBmYPbH68buQQ-otdKTSDBY_TwTn1a6C3vyW8Zt_QDECgHCCjt9EsV7leAv6bNnj3Ng9b8N3fH0206sAei4Vg8FdC7ZZI58gpRNjjBDOByVryaIBuiObJpMxfw==",
    en: "https://31e2a1a9.sibforms.com/serve/MUIFANQB-ScvUq61aPjPQGP9cGIRfRuBhaz4C7r-TZgmkXNycHZSk1-CoANUhtL3vMB5-dPHZT-0exFC_8kxwP-dU3lXOdpp_oREVV4iQx9Vq4RkBfEuFT66ktKiXJRTuKapzkngHfG0nrd08NZKi5LAceMAll3dV-UBrcbZJZMnS588gPcDnIwkhVBA3-0aN2HldH_Gz06uLGBEoQ==",
  },

  // --- Behaviour tuning -------------------------------------------------------
  SKY_REFRESH_SECONDS: 60,         // how often the live sky redraws
  ISS_REFRESH_SECONDS: 5,          // how often the ISS position updates
  EVENTS_MONTHS_AHEAD: 9,          // how far ahead the events calendar looks
  STAR_MAG_LIMIT: 5.6,             // faintest stars drawn on the map (higher = more)
};

// Make available everywhere.
window.CONFIG = CONFIG;
