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

/**
 * The Japan product page with the discount code already applied, in the same shape as
 * the `link` on every plan in the price feed. Spelled out here for the places that must
 * not pull the whole price file into their bundle, such as the sticky bar in _app.tsx.
 */
export const SIMBYE_JAPAN_DISCOUNT_URL = `${SIMBYE_ORIGIN}/discount/${SIMBYE_DISCOUNT_CODE}?redirect=${SIMBYE_JAPAN_PATH}?ref=${SIMBYE_REF}`;

/**
 * The discount link with the placement on it, for Simbye's own analytics.
 *
 * The shape matters. Tested against simbye.com on 6 Nov 2026: adding `&utm_...` after
 * SIMBYE_JAPAN_DISCOUNT_URL makes the redirect drop the `ref` nested inside `redirect=`,
 * which would lose the referral. With `ref` beside the utm parameters, the 302 lands on
 * /products/esim-japan?ref=eqvmffxd&utm_... and still sets the discount cookie.
 */
export function simbyeTrackedUrl(placement: string, pageTag: string): string {
  const query = new URLSearchParams({
    ref: SIMBYE_REF,
    utm_source: "japantravelkit",
    utm_medium: "affiliate",
    utm_campaign: placement,
    utm_content: pageTag,
  });
  return `${SIMBYE_ORIGIN}/discount/${SIMBYE_DISCOUNT_CODE}?redirect=${SIMBYE_JAPAN_PATH}&${query}`;
}
