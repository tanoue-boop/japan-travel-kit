/**
 * The same Klook product, on another edition's locale path.
 *
 * Added 2026-11-01 (task jtk-20261101-A15) so a translated page can carry every
 * Klook block its English counterpart carries without a hand-copied constant per
 * product per language. Klook's product ids — the number at the front of every
 * activity / hotel / destination slug — are locale-independent, and the slug after
 * the id is Klook's own English slug in every locale (see lib/klook-links-ko.ts for
 * how that pairing was checked), so moving `/en-US/activity/70672-shibuya-sky-tokyo/`
 * to `/ko/activity/70672-shibuya-sky-tokyo/` is the same listing in Korean, priced
 * in KRW.
 *
 * Accepts every form lib/klook-links.ts holds:
 *
 *   1. a plain Klook page URL, with or without a locale segment;
 *   2. a `?aid=119070` link from `klookLink()`;
 *   3. an older `affiliate.klook.com/redirect?...&k_site=…` link — its k_site is used.
 *
 * Returns the plain `https://www.klook.com/<locale>/…?aid=119070` form. The page's
 * own ad id is stamped on later by components/KlookLink.tsx, exactly as for every
 * other Klook link, and scripts/check-i18n.js asserts the locale path on the built
 * page — so a product this cannot place shows up there rather than going unnoticed.
 */
import { KLOOK_AID } from "./klook-links";
import type { TranslatedLocale } from "./i18n";

/** Klook's own locale path segment for each edition. */
export const KLOOK_LOCALE_PATH: Record<TranslatedLocale, string> = {
  "zh-tw": "zh-TW",
  "zh-cn": "zh-CN",
  ko: "ko",
  th: "th",
};

/** A Klook locale segment: en-US, en-GB, zh-TW, ko, th, ja … */
const LOCALE_SEGMENT = /^[a-z]{2}(-[A-Z]{2})?$/;

export function klookFor(url: string, locale: TranslatedLocale): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }
  if (!/(^|\.)klook\.com$/i.test(parsed.hostname)) return url;

  if (parsed.pathname === "/redirect") {
    const kSite = parsed.searchParams.get("k_site");
    if (!kSite) return url;
    return klookFor(kSite, locale);
  }

  const segments = parsed.pathname.split("/").filter(Boolean);
  if (segments.length && LOCALE_SEGMENT.test(segments[0])) segments.shift();
  const path = `/${KLOOK_LOCALE_PATH[locale]}/${segments.join("/")}${parsed.pathname.endsWith("/") ? "/" : ""}`;

  parsed.searchParams.delete("aid");
  parsed.searchParams.set("aid", KLOOK_AID);
  return `https://www.klook.com${path}?${parsed.searchParams.toString()}`;
}

/** The same object with its `url` moved onto the edition's Klook locale path. */
export function withKlookLocale<T extends { url: string }>(item: T, locale: TranslatedLocale, overrides: Partial<T> = {}): T {
  return { ...item, ...overrides, url: klookFor(item.url, locale) };
}
