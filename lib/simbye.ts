/**
 * Simbye partner programme: the referral code, the reader discount and the one place
 * that puts the referral code on a URL.
 *
 * Joined 5 Nov 2026. One `ref` covers every page of simbye.com. The discount code takes
 * 15% off every eSIM plan but not phone numbers. Programme rules that bind what the
 * site may say: no Google Ads (brand terms included), coupon-site listings only with
 * prior approval, no claim that is not on simbye.com or in the price feed, and the
 * affiliate relationship has to be disclosed.
 *
 * Clicks reach GA4 as affiliate_click with partner=simbye through the simbye.com entry
 * in AFFILIATE_PARTNERS in pages/_app.tsx, which matches on hostname.
 *
 * Prices are not here: they live in data/esim-prices.json, written by
 * scripts/fetch-esim-prices.mjs from Simbye's own feed. Plan-level `link` values in that
 * file come straight from the feed, which already carries the referral code.
 */
export const SIMBYE_REF = "eqvmffxd";
export const SIMBYE_DISCOUNT_CODE = "ROEBHIOM";
export const SIMBYE_DISCOUNT_PERCENT = 15;

const SIMBYE_ORIGIN = "https://simbye.com";

/** A simbye.com path or URL with the referral code on it. Idempotent. */
export function simbyeLink(pathOrUrl: string): string {
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${SIMBYE_ORIGIN}${pathOrUrl}`;
  if (url.includes(`ref=${SIMBYE_REF}`)) return url;
  return `${url}${url.includes("?") ? "&" : "?"}ref=${SIMBYE_REF}`;
}

/** The Japan product page, the default target for a Simbye CTA. */
export const SIMBYE_JAPAN_PATH = "/products/esim-japan";
