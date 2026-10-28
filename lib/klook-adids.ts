/**
 * One Klook ad id per page, and the one place a Klook affiliate URL is built.
 *
 * Why this exists. Klook's affiliate dashboard reports clicks and bookings per
 * *ad id* (`aff_adid`), not per referring page: every link of the
 * `?aid=119070` form lands in a single "Text Links (direct) 119070" row, so 60
 * articles selling 60 different tickets were indistinguishable in the report —
 * on 27 Oct 2026 that row showed 16 clicks and 0 bookings while the five
 * bookings of the previous week all came through two old per-link ad ids
 * (1299140 and 1299135). An ad id per link cannot answer "which article sold
 * this" either, because the same product is linked from a dozen pages.
 *
 * So the unit is the page. data/klook-adids.json holds one ad id per page path
 * (160 were created in Klook's own link tool on 27 Oct 2026; the ones not yet on
 * a page sit in its `spare` list), and `klookAffiliateUrl` rebuilds whatever Klook URL a
 * page hands it into the redirect form carrying *that page's* ad id:
 *
 *   https://affiliate.klook.com/redirect?aid=119070&aff_adid=<page>&k_site=<product URL>
 *
 * The product (`k_site`) is never changed — only how the click is labelled.
 * Three input forms all come out the same way:
 *
 *   1. a plain Klook page URL                      -> used as k_site as-is
 *   2. a `?aid=119070` link from `klookLink()`      -> `aid` stripped, then as k_site
 *   3. an older `redirect?...aff_adid=129xxxx&k_site=…` link -> its k_site reused,
 *      the old ad id replaced, because those ids identify a product, not a page
 *
 * A page with no entry in the JSON keeps the old `?aid=` form rather than
 * borrowing a spare id — a wrong attribution is worse than none —  and
 * scripts/check-klook-adids.js lists those pages on every build.
 *
 * Non-Klook URLs are returned byte-for-byte, so components/KlookLink.tsx is
 * safe to use on any outbound link.
 */
import adIds from "../data/klook-adids.json";
import { KLOOK_AID, klookLink } from "./klook-links";

/** Klook's affiliate redirect endpoint — the only URL that carries an ad id. */
const KLOOK_REDIRECT = "https://affiliate.klook.com/redirect";

/** Page path -> ad id, straight out of data/klook-adids.json. */
const PAGE_AD_IDS: Record<string, number> = adIds.pages;

/** klook.com and every subdomain of it (www, affiliate, s). */
const KLOOK_HOST = /(^|\.)klook\.com$/i;

/**
 * The key `data/klook-adids.json` is written with: a route path, no query, no
 * hash, no trailing slash. `/zh-tw/guides/...` is a real route on this site, so
 * nothing about the locale is special-cased.
 */
export function normalizeKlookPagePath(pagePath: string): string {
  const path = pagePath.split("?")[0].split("#")[0];
  if (!path) return "/";
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

/** This page's Klook ad id, or null if the page has not been given one yet. */
export function klookAdIdFor(pagePath: string): number | null {
  return PAGE_AD_IDS[normalizeKlookPagePath(pagePath)] ?? null;
}

/** Every page path that has an ad id — read by scripts/check-klook-adids.js. */
export const klookAdIdPages = (): string[] => Object.keys(PAGE_AD_IDS);

/**
 * The Klook URL to put in an `href`, labelled with the ad id of the page the
 * link sits on.
 *
 * @param url      Any Klook URL — plain, `?aid=`-suffixed, or an older
 *                 `affiliate.klook.com/redirect` link. Anything that is not a
 *                 Klook URL is returned unchanged.
 * @param pagePath The route the link is rendered on, e.g.
 *                 `/guides/attractions/shibuya-sky-tickets`.
 */
export function klookAffiliateUrl(url: string, pagePath: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url; // relative or malformed — not ours to rewrite
  }
  if (!KLOOK_HOST.test(parsed.hostname)) return url;

  // The product page the reader ends up on. Identical in, identical out.
  let product: string;
  if (parsed.pathname === "/redirect") {
    const kSite = parsed.searchParams.get("k_site");
    if (!kSite) return url; // a redirect with no destination to carry over
    product = kSite;
  } else {
    parsed.searchParams.delete("aid"); // the aid belongs on the redirect, not inside k_site
    product = parsed.toString();
  }

  const adId = klookAdIdFor(pagePath);
  if (adId === null) return klookLink(product);

  return `${KLOOK_REDIRECT}?aid=${KLOOK_AID}&aff_adid=${adId}&k_site=${encodeURIComponent(product)}`;
}
