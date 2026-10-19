/**
 * Pocket WiFi rentals we sell through Klook.
 *
 * Single source of truth for the two rental products, so the comparison table on
 * best-pocket-wifi-japan, the rental cards on pocket-wifi-vs-esim-japan and the
 * group cost maths on japan-esim-family-group can never drift apart. Moved here
 * from /wifi-pocket when that page was merged into the eSIM guide hub (2026-10-09).
 *
 * Everything below is what the linked Klook listing itself states — `klookUrl` is
 * the listing each row describes, so any claim here can be checked against it.
 * Nothing is inferred from the vendors' own marketing.
 *
 * Two check dates, because they are checked by two different means:
 * - `specsCheckedAt` covers devices, battery, network, collection, return, rating
 *   and review counts. Re-read off the listings on 2026-10-19, which is when the
 *   second rental turned out to be a hotel-delivery product rather than the
 *   airport pickup it had been described as since the merge.
 * - `ratesCheckedAt` covers `fromUsdPerDay` only. Klook prices are per-locale and
 *   per-booking-length and cannot be read without loading the booking widget, so
 *   they are hand-checked rather than scraped (unlike eSIM prices, which come
 *   from data/esim-prices.json daily). `fromUsdPerDay` is the advertised "from"
 *   rate: the cheapest rental length, booked in advance. Longer rentals and peak
 *   season cost more, so always present it as a floor, never as a quote.
 *
 * When you touch this file, update whichever date you actually re-checked.
 */

export type PocketWifi = {
  id: string;
  name: string;
  /** Title of the Klook listing as it is displayed there. */
  klookTitle: string;
  /** Plain listing URL — the source for every spec on this row. */
  klookUrl: string;
  /** Rating out of 5 shown on the Klook listing. */
  rating: number;
  /** Review count as Klook displays it, e.g. "11.5K". */
  reviews: string;
  /** Bookings as Klook displays it, e.g. "200K+". */
  bookings: string;
  /** Advertised cheapest daily rate in USD on the linked Klook listing. */
  fromUsdPerDay: number;
  /** Data allowance as the listing states it. */
  data: string;
  network: string;
  maxDevices: number;
  batteryHours: string;
  /** How you get hold of the router. */
  collect: string;
  /** How the router goes back at the end of the trip. */
  returnBy: string;
  /** `collect` and `returnBy` as one mid-sentence clause, for prose that mentions both. */
  logistics: string;
  badge: string;
  badgeColor: "bg-blue-500" | "bg-green-500" | "bg-orange-500";
  bestFor: string;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  ctaText: string;
};

/** Last hand-check of the daily rates below. */
export const ratesCheckedAt = "2026-10-09";

/** Last read-through of everything other than the rates. */
export const specsCheckedAt = "2026-10-19";

export const pocketWifis: PocketWifi[] = [
  {
    id: "ninja-wifi",
    name: "Ninja WiFi",
    klookTitle: "4G Portable WiFi (Japan Pick Up) with Unlimited Data for Japan",
    klookUrl: "https://www.klook.com/activity/16399-unlimited-4g-lte-wifi-japan-airport-pickup-ninja-wifi/",
    rating: 4.7,
    reviews: "11.5K",
    bookings: "200K+",
    fromUsdPerDay: 2.25,
    data: "Unlimited",
    network: "SoftBank",
    maxDevices: 5,
    batteryHours: "9 hours",
    collect: "Airport counter",
    returnBy: "Airport counter",
    logistics: "collected and returned at an airport counter",
    badge: "Most Booked",
    badgeColor: "bg-blue-500",
    bestFor: "Landing with data already working",
    pros: [
      "Unlimited data",
      "Pick up and return at all Japan international airports",
      "Power bank included",
      "4.7/5 from 11.5K Klook reviews, 200K+ booked",
    ],
    cons: ["Up to 5 devices, not 10", "Counter opening hours bind an early or late flight", "Extra device to carry and charge"],
    affiliateUrl:
      "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1285120&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F16399-unlimited-4g-lte-wifi-japan-airport-pickup-ninja-wifi%2F",
    ctaText: "Book Ninja WiFi on Klook",
  },
  {
    id: "hotel-delivery",
    name: "Hotel-delivery router",
    klookTitle: "Unlimited 4G WiFi and Powerbank (JP Hotel Two Way Delivery) for Japan",
    klookUrl: "https://www.klook.com/en-US/activity/21250-4g-wifi-japan/",
    rating: 4.6,
    reviews: "2.1K",
    bookings: "10K+",
    fromUsdPerDay: 1.85,
    data: "Unlimited",
    network: "SoftBank",
    maxDevices: 10,
    batteryHours: "9 hours",
    collect: "Delivered to your hotel",
    returnBy: "Prepaid envelope in any Japan Post box",
    logistics: "delivered to your hotel and posted back in a prepaid envelope",
    badge: "Most Devices",
    badgeColor: "bg-green-500",
    bestFor: "Groups with a lot of devices",
    pros: [
      "Up to 10 devices",
      "Unlimited data",
      "Waiting at the hotel — no counter queue on arrival",
      "Goes back in a prepaid envelope, not at a counter",
    ],
    cons: [
      "Hotel delivery only in Tokyo, Osaka, Nagoya, Fukuoka and Hokkaido",
      "No data between landing and check-in",
      "2.1K Klook reviews against 11.5K for the airport option",
    ],
    affiliateUrl:
      "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1285121&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F21250-4g-wifi-japan%2F",
    ctaText: "Book hotel delivery on Klook",
  },
];

/** The cheapest advertised daily rate across our rentals. */
export function cheapestPerDay(): PocketWifi {
  return pocketWifis.reduce((a, b) => (b.fromUsdPerDay < a.fromUsdPerDay ? b : a));
}

/** A rental by id. Throws at build time if an id drifts out of the list. */
export function pocketWifi(id: string): PocketWifi {
  const found = pocketWifis.find((w) => w.id === id);
  if (!found) throw new Error(`pocket-wifi: no rental with id ${id}`);
  return found;
}

/** "$12.95" — cheapest rental for a trip of `days`, one device for the whole group. */
export function rentalCost(days: number): number {
  return Math.round(cheapestPerDay().fromUsdPerDay * days * 100) / 100;
}

/** Advertised floor for a trip of `days` on a specific rental. */
export function rentalTotal(wifi: PocketWifi, days: number): number {
  return Math.round(wifi.fromUsdPerDay * days * 100) / 100;
}
