/**
 * Pocket WiFi rentals we sell through Klook.
 *
 * Single source of truth for the two rental products, so the comparison cards on
 * pocket-wifi-vs-esim-japan and the group cost maths on japan-esim-family-group
 * can never drift apart. Moved here from /wifi-pocket when that page was merged
 * into the eSIM guide hub (2026-10-09).
 *
 * `fromUsdPerDay` is the advertised "from" rate on the linked Klook listing: the
 * cheapest rental length, booked in advance. Longer rentals and peak season cost
 * more, so always present it as a floor, never as a quote. Unlike eSIM prices
 * (data/esim-prices.json) these are not scraped daily — check them by hand when
 * you touch this file, and update `ratesCheckedAt`.
 */

export type PocketWifi = {
  id: string;
  name: string;
  rating: number;
  /** Advertised cheapest daily rate in USD on the linked Klook listing. */
  fromUsdPerDay: number;
  network: string;
  maxDevices: number;
  batteryHours: string;
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

export const pocketWifis: PocketWifi[] = [
  {
    id: "ninja-wifi",
    name: "Ninja WiFi",
    rating: 4.7,
    fromUsdPerDay: 2.25,
    network: "Docomo 4G LTE",
    maxDevices: 10,
    batteryHours: "~8 hours",
    badge: "Most Popular",
    badgeColor: "bg-blue-500",
    bestFor: "Groups, unlimited data",
    pros: ["Unlimited data", "Airport pickup at all major airports", "Up to 10 devices", "200K+ customers"],
    cons: ["Must return at airport", "Battery lasts ~8 hours", "Extra device to carry"],
    affiliateUrl:
      "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1285120&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F16399-unlimited-4g-lte-wifi-japan-airport-pickup-ninja-wifi%2F",
    ctaText: "Book Ninja WiFi on Klook",
  },
  {
    id: "global-wifi",
    name: "Global WiFi + Powerbank",
    rating: 4.7,
    fromUsdPerDay: 1.85,
    network: "Docomo/SoftBank 4G",
    maxDevices: 10,
    batteryHours: "~8 hours (powerbank included)",
    badge: "Best Value",
    badgeColor: "bg-green-500",
    bestFor: "Budget groups",
    pros: ["Cheapest per day", "Free powerbank included", "Unlimited data", "Multiple airports"],
    cons: ["Fewer reviews than Ninja WiFi", "Must return at airport"],
    affiliateUrl:
      "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1285121&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F21250-4g-wifi-japan%2F",
    ctaText: "Book Global WiFi on Klook",
  },
];

/** The cheapest advertised daily rate across our rentals. */
export function cheapestPerDay(): PocketWifi {
  return pocketWifis.reduce((a, b) => (b.fromUsdPerDay < a.fromUsdPerDay ? b : a));
}

/** "$12.95" — cheapest rental for a trip of `days`, one device for the whole group. */
export function rentalCost(days: number): number {
  return Math.round(cheapestPerDay().fromUsdPerDay * days * 100) / 100;
}
