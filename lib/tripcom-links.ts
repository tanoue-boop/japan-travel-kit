/**
 * Trip.com affiliate links — approved 27 Nov 2026, added 28 Nov 2026 (task
 * jtk-20261128-A36) as the second button in components/HotelStayBlock.tsx.
 *
 * The link format is the one the Trip.com affiliate dashboard generated on 28 Nov 2026:
 *   https://www.trip.com/hotels/list?city=<city id>&Allianceid=11518634&SID=337186144
 *     &trip_sub1=<page slug>&trip_sub3=D21643631
 * trip_sub1 carries the page slug (locale-prefixed on translated pages, the same rule as
 * the Stay22 campaign in lib/stay22.ts) so the Trip.com report splits bookings by page.
 *
 * City ids: every id used on the site is in TRIPCOM_CITY below and was checked on
 * 28 Nov 2026 by opening https://www.trip.com/hotels/list?city=<id> and reading the
 * cityId / cityName of the hotels it lists (script: .a36tmp/verify-cities.mjs). Do not
 * add an id without doing the same.
 */
import type { Locale } from "./i18n";

export const TRIPCOM_ALLIANCE_ID = "11518634";
export const TRIPCOM_SID = "337186144";
export const TRIPCOM_SUB3 = "D21643631";

/** Trip.com hotel city ids, checked on 28 Nov 2026 (see above). */
export const TRIPCOM_CITY = {
  tokyo: 228,
  urayasu: 35751, // Tokyo Disney Resort / Maihama ("Tokyo Disneyland Area" zone)
  hakone: 1165,
  fujikawaguchiko: 50160,
  fujiyoshida: 50161, // Fuji-Q Highland
  kyoto: 734,
  osaka: 219,
  hiroshima: 262, // "Hiroshima City"
  hatsukaichi: 50273, // Miyajima
  kanazawa: 3663,
  sapporo: 641,
  kutchan: 92450, // Niseko Hirafu / Grand Hirafu
  hakuba: 35707,
  nozawaonsen: 50353,
  nagano: 4123, // "Nagano City"
  yuzawa: 50133, // Echigo-Yuzawa and GALA Yuzawa
  kobe: 423, // includes Arima Onsen (Trip.com zone 14007)
  fukuoka: 248,
  beppu: 4828,
  yufu: 62275, // Yufuin
} as const;

export type TripcomCity = keyof typeof TRIPCOM_CITY;

/** "usj-hotels" on /guides/attractions/usj-hotels, "ko-usj-hotels" on /ko/…. */
export function tripcomSub1(pathname: string, locale: Locale): string {
  const slug = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean).pop() || "home";
  return locale === "en" ? slug : `${locale}-${slug}`;
}

/** The Trip.com hotel list for a city, tagged with the page slug. */
export function tripcomHotelListUrl(city: TripcomCity, sub1: string): string {
  const q = new URLSearchParams({
    city: String(TRIPCOM_CITY[city]),
    Allianceid: TRIPCOM_ALLIANCE_ID,
    SID: TRIPCOM_SID,
    trip_sub1: sub1,
    trip_sub3: TRIPCOM_SUB3,
  });
  return `https://www.trip.com/hotels/list?${q.toString()}`;
}
