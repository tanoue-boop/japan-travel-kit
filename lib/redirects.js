// 301 redirects for the September 2026 restructure (96 articles → 37, now 48 after the
// October partial revert below). Shared by next.config.js (redirects) and
// scripts/generate-sitemap.js (exclusions).
//
// 2026-10-09: eleven of those merges were reverted. GSC for 2026-09-09–10-06 showed the
// absorbed URLs were still ranking on search intents the merge target does not serve
// (device-specific setup, single-city transport passes, trip-length and audience queries),
// and the targets lost position after inheriting them. Those pages are live again, so their
// entries are gone from this map — do not re-add them without checking Search Console first.
const removedGuides = {
  // eSIM (23)
  "/guides/esim/japan-esim-3-days": "/guides/esim/japan-esim-data-plans",
  "/guides/esim/japan-esim-5-days": "/guides/esim/japan-esim-data-plans",
  "/guides/esim/japan-esim-7-days": "/guides/esim/japan-esim-data-plans",
  "/guides/esim/japan-esim-10-days": "/guides/esim/japan-esim-data-plans",
  "/guides/esim/japan-sim-short-vs-long-stay": "/guides/esim/japan-esim-data-plans",
  "/guides/esim/airalo-vs-esim-go-japan": "/guides/esim/airalo-vs-holafly-japan",
  "/guides/esim/holafly-vs-esim-go-japan": "/guides/esim/airalo-vs-holafly-japan",
  "/guides/esim/sakura-mobile-vs-airalo-japan": "/guides/esim/airalo-vs-holafly-japan",
  "/guides/esim/sakura-mobile-vs-holafly-japan": "/guides/esim/airalo-vs-holafly-japan",
  "/guides/esim/best-unlimited-esim-japan": "/guides/esim/japan-esim-unlimited",
  "/guides/esim/does-airalo-work-in-japan": "/guides/esim/airalo-japan-review",
  "/guides/esim/does-holafly-work-in-japan": "/guides/esim/holafly-japan-review",
  "/guides/esim/japan-esim-android": "/guides/esim/how-to-set-up-esim-japan",
  "/guides/esim/japan-esim-ipad": "/guides/esim/how-to-set-up-esim-japan",
  "/guides/esim/japan-esim-android-tablet": "/guides/esim/how-to-set-up-esim-japan",
  "/guides/esim/japan-esim-not-working": "/guides/esim/how-to-set-up-esim-japan",
  "/guides/esim/japan-esim-with-phone-number": "/guides/esim/sakura-mobile-review",
  "/guides/esim/japan-esim-faq": "/guides/esim/best-esim-japan",
  "/guides/esim/japan-esim-vs-roaming": "/guides/esim/best-esim-japan",
  "/guides/esim/japan-esim-seniors": "/guides/esim/best-esim-japan",
  "/guides/esim/japan-esim-business": "/guides/esim/best-esim-japan",
  "/guides/esim/japan-airport-sim-cards": "/guides/esim/best-esim-japan",
  "/guides/esim/free-wifi-japan": "/guides/esim/cheapest-esim-japan",
  // Money (3)
  "/guides/money/japan-travel-insurance": "/guides/money/best-travel-insurance-japan",
  "/guides/money/tipping-in-japan": "/guides/money/cash-vs-card-japan",
  "/guides/money/how-much-yen-to-bring-japan": "/guides/money/currency-exchange-japan",
  // Transport (5)
  "/guides/transport/tokyo-airport-limousine-bus": "/guides/transport/tokyo-airport-transfer",
  "/guides/transport/skyliner-vs-nex": "/guides/transport/tokyo-airport-transfer",
  "/guides/transport/tokyo-subway-ticket": "/guides/transport/tokyo-transportation",
  "/guides/transport/hiroshima-transportation": "/guides/transport",
  "/guides/transport/fukuoka-transportation": "/guides/transport",
  // Attractions (17)
  "/guides/attractions/tokyo-observation-decks": "/guides/attractions/shibuya-sky-tickets",
  "/guides/attractions/mt-fuji-day-trip-tokyo": "/guides/attractions",
  "/guides/attractions/nara-day-trip": "/guides/attractions",
  "/guides/attractions/nikko-day-trip": "/guides/attractions",
  "/guides/attractions/kamakura-day-trip": "/guides/attractions",
  "/guides/attractions/hiroshima-miyajima-day-trip": "/guides/attractions",
  "/guides/attractions/things-to-do-tokyo": "/guides/attractions",
  "/guides/attractions/things-to-do-kyoto": "/guides/attractions",
  "/guides/attractions/things-to-do-osaka": "/guides/attractions",
  "/guides/attractions/kimono-rental-japan": "/guides/attractions",
  "/guides/attractions/tokyo-go-kart": "/guides/attractions",
  "/guides/attractions/tea-ceremony-japan": "/guides/attractions",
  "/guides/attractions/tokyo-food-tour": "/guides/attractions",
  "/guides/attractions/tokyo-cooking-class": "/guides/attractions",
  "/guides/attractions/samurai-ninja-experience-tokyo": "/guides/attractions",
  "/guides/attractions/warner-bros-studio-tour-tokyo": "/guides/attractions",
  "/guides/attractions/osaka-attractions-pass": "/guides/attractions",
};

// The original top-level landing pages, retired 2026-10-09. They predated /guides and had
// drifted into near-duplicates of a guide that covered the same ground better, so each now
// 301s to the guide that owns the topic. Revenue elements were moved first: /wifi-pocket's
// two Klook rental cards now live in pocket-wifi-vs-esim-japan (via lib/pocket-wifi.ts), and
// /sim-cards' voice and physical-SIM columns in best-esim-japan. Everything /money and
// /transportation sold was already present in the destination guides.
const removedPages = {
  "/sim-cards": "/guides/esim/best-esim-japan",
  "/wifi-pocket": "/guides/esim/pocket-wifi-vs-esim-japan",
  "/money": "/guides/money",
  "/transportation": "/guides/transport",
};

/** Every 301 on the site, old URL -> new URL. */
const allRedirects = { ...removedGuides, ...removedPages };

module.exports = { removedGuides, removedPages, allRedirects };
