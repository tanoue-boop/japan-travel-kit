/**
 * Stay22 — the hotel-map affiliate added 27 Nov 2026 (task jtk-20261127-A30).
 *
 * Stay22 sits between this site and Booking.com, Expedia, Agoda, Trip.com, Vrbo and
 * others: a reader who books through one of its maps pays the partner's own price and
 * the partner's commission reaches us under one account. Two pieces:
 *
 * - The "Let Me Allez" script (pages/_app.tsx, next/script afterInteractive) keyed by
 *   STAY22_LMA_ID. It turns plain Booking.com / Expedia style links into tracked ones;
 *   it is not meant to touch the Klook, Simbye, Sakura, SafetyWing or Wise links.
 * - The map embed below, `embed/gm?aid=…&address=…`. Checked in Chromium on
 *   27 Nov 2026: "Shinjuku, Tokyo, Japan" renders the map with yen nightly prices on
 *   every marker, and a listing click opens the partner with pubref=japantravelkit-
 *   <campaign>. Every address in lib/hotel-stay.ts and on the where-to-stay pages was
 *   also checked to resolve to the intended place (the <title> of the embed names it).
 *
 * The campaign is the page slug (prefixed with the locale on translated pages), so
 * Stay22's report splits bookings by page.
 */
import type { Locale } from "./i18n";

export const STAY22_AID = "japantravelkit";
export const STAY22_LMA_ID = "6b08d1e509085d34c5ec537f";

/**
 * The inline loader from the Stay22 dashboard, unchanged apart from the lmaID constant
 * and `excludes`. `excludes: ['trip']` (task jtk-20261128-A36): without it the script
 * rewrote the Trip.com buttons in HotelStayBlock to stay22.com/allez/trip and dropped our
 * own Trip.com Allianceid/SID (seen on production 28 Nov 2026). "trip" is the script's own
 * partner key for trip.com; the script unions this array with the dashboard's excludes,
 * so the dashboard's list (viator) still applies.
 */
export const STAY22_LMA_SNIPPET = `(function (s, t, a, y, twenty, two) { s.Stay22 = s.Stay22 || {}; s.Stay22.params = { lmaID: '${STAY22_LMA_ID}', excludes: ['trip'] }; twenty = t.createElement(a); two = t.getElementsByTagName(a)[0]; twenty.async = 1; twenty.src = y; two.parentNode.insertBefore(twenty, two); })(window, document, 'script', 'https://lma.stay22.com/letmeallez.js');`;

/**
 * Map addresses for the area names used by the where-to-stay pages' KlookStayAreas
 * lists (lib/klook-links.ts). Each resolved to the intended place on 27 Nov 2026.
 */
export const STAY22_TOKYO_MAPS: Record<string, string> = {
  Shinjuku: "Shinjuku, Tokyo, Japan",
  "Tokyo Station / Marunouchi": "Tokyo Station, Tokyo, Japan",
  "Ueno / Asakusa": "Ueno, Tokyo, Japan",
  Shibuya: "Shibuya, Tokyo, Japan",
  Ginza: "Ginza, Tokyo, Japan",
};
export const STAY22_OSAKA_MAPS: Record<string, string> = {
  Umeda: "Umeda, Osaka, Japan",
  "Umeda / Osaka Station": "Umeda, Osaka, Japan",
  Namba: "Namba, Osaka, Japan",
  Tennoji: "Tennoji Station, Osaka, Japan",
  "Universal City": "Universal City, Osaka, Japan",
  Shinsaibashi: "Shinsaibashi, Osaka, Japan",
};
export const STAY22_KYOTO_MAPS: Record<string, string> = {
  "Kyoto Station": "Kyoto Station, Kyoto, Japan",
  "Karasuma Oike / Shijo": "Karasuma Oike, Kyoto, Japan",
  "Gion / Higashiyama": "Gion, Kyoto, Japan",
  Arashiyama: "Arashiyama, Kyoto, Japan",
};

/** `address` is "Area, City, Japan" — see the addresses checked in lib/hotel-stay.ts. */
export function stay22MapUrl(address: string, campaign: string): string {
  return `https://www.stay22.com/embed/gm?aid=${STAY22_AID}&address=${encodeURIComponent(address)}&campaign=${encodeURIComponent(campaign)}`;
}

/** "usj-hotels" on /guides/attractions/usj-hotels, "ko-usj-hotels" on /ko/…. */
export function stay22Campaign(pathname: string, locale: Locale): string {
  const slug = pathname.split("?")[0].split("/").filter(Boolean).pop() || "home";
  return locale === "en" ? slug : `${locale}-${slug}`;
}
