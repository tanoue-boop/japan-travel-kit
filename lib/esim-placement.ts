import { getProvider } from "./esim-prices";

/**
 * Where an eSIM button sits, so each one can be told apart in every report.
 *
 * One name per block, used four ways:
 *   - GA4: `data-placement` on the block, read by the click handler in pages/_app.tsx;
 *   - Klook: the `#<placement>` key in data/klook-adids.json (see lib/klook-adids.ts);
 *   - Simbye: `utm_campaign`, with the page in `utm_content` (see simbyeTrackedUrl);
 *   - Airalo: Impact's `subId1`, with the page in `subId2`.
 */
export const ESIM_PLACEMENT = {
  bookingCard: "booking-esim-card",
  daysTable: "esim-days-table",
  brandCompare: "brand-compare-table",
} as const;

/** "/ko/guides/attractions/shibuya-sky-tickets" -> "ko-shibuya-sky-tickets". */
export function pageTag(route: string): string {
  const parts = route.split("/").filter(Boolean);
  const locale = parts[0] === "guides" ? "" : `${parts[0]}-`;
  return `${locale}${parts[parts.length - 1]}`;
}

/** The Airalo affiliate link with the placement in Impact's sub IDs. */
export function airaloTrackedUrl(placement: string, tag: string): string {
  const url = getProvider("airalo").affiliateUrl;
  return `${url}${url.includes("?") ? "&" : "?"}subId1=${placement}&subId2=${tag}`;
}
