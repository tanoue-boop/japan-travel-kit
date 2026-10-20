/**
 * The site's two locales, and the English ↔ 繁體中文 page pairs.
 *
 * Added 2026-10-20 with the first ten Traditional Chinese pages. Taiwan and Hong
 * Kong are near the top of Japan's inbound arrivals, Google is the search engine
 * there, and Klook is already the booking route those readers use — so the trial
 * is the same ten highest-earning English entry pages, translated, with the
 * English URLs left exactly as they were.
 *
 * Structure: the Chinese pages live at `/zh-tw` + the English route, as real files
 * under `pages/zh-tw/`, rather than through next.config's `i18n` option. See the
 * note on ZH_TW_PREFIX for why.
 *
 * This module is the one list of pairs. It is read by:
 *
 *   - components/Hreflang.tsx — the <link rel="alternate"> set on both languages
 *   - components/Header.tsx / Footer.tsx — the English／繁體中文 switch, shown only
 *     where the other language actually has the page
 *   - scripts/generate-sitemap.js — the <xhtml:link> cross-references
 *   - scripts/generate-llms-txt.js — the 繁體中文 section
 *
 * It is plain data and plain functions (no JSX), so the build scripts can require
 * it through scripts/require-ts.js.
 */
import { SITE_URL } from "./structured-data";

export type Locale = "en" | "zh-tw";

/** The language the site was written in, and what x-default points at. */
export const DEFAULT_LOCALE: Locale = "en";

/**
 * URL prefix for the Traditional Chinese pages.
 *
 * Chosen over next.config's `i18n` sub-path routing because that option makes
 * *every* route exist under *every* locale: all 74 English pages would also answer
 * on /zh-tw/… and serve English, which is 74 duplicate URLs for the ten we have
 * actually translated. Real files under pages/zh-tw/ create exactly the ten routes,
 * and because scripts/generate-sitemap.js and lib/page-dates.js both work by
 * walking pages/ and mapping file → route, they pick the new pages up with no
 * change to how either resolves a route or a lastmod date.
 */
export const ZH_TW_PREFIX = "/zh-tw";

/**
 * hreflang values each locale is published under. The Chinese pages are written in
 * Taiwanese Traditional Chinese and serve Hong Kong readers too, so one page
 * carries both regional tags rather than pretending to a Hong Kong edition.
 */
export const HREFLANG: Record<Locale, string[]> = {
  en: ["en"],
  "zh-tw": ["zh-Hant-TW", "zh-Hant-HK"],
};

/** `lang` attribute for <html>. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  "zh-tw": "zh-Hant-TW",
};

/** JSON-LD `inLanguage`. */
export const JSONLD_LANG: Record<Locale, string> = {
  en: "en",
  "zh-tw": "zh-Hant-TW",
};

export type TranslatedPage = {
  /** English route. Unchanged by the translation. */
  en: string;
  /** Traditional Chinese route — ZH_TW_PREFIX + the English route. */
  zhTw: string;
  /** The Chinese page's <title>, without the " | Japan Travel Kit" suffix. */
  zhTitle: string;
  /** Short Chinese label, for the nav, the footer and llms.txt. */
  zhLabel: string;
};

/**
 * The ten pages, in the order they were picked: by revenue and clicks, with the
 * Things to Do hub last because it is the category entry point rather than an
 * article. Adding an eleventh page means adding its file under pages/zh-tw/ and a
 * row here — nothing else.
 */
export const TRANSLATED_PAGES: TranslatedPage[] = [
  {
    en: "/guides/attractions/shibuya-sky-tickets",
    zhTw: "/zh-tw/guides/attractions/shibuya-sky-tickets",
    zhTitle: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式",
    zhLabel: "澀谷SKY 門票",
  },
  {
    en: "/guides/attractions/teamlab-borderless-tickets",
    zhTw: "/zh-tw/guides/attractions/teamlab-borderless-tickets",
    zhTitle: "teamLab 無界 門票（2026）：票價、時段預約與購票管道",
    zhLabel: "teamLab 無界 門票",
  },
  {
    en: "/guides/attractions/teamlab-tokyo-tickets",
    zhTw: "/zh-tw/guides/attractions/teamlab-tokyo-tickets",
    zhTitle: "teamLab Planets 門票（2026）：票價、預約方式與無界比較",
    zhLabel: "teamLab Planets 門票",
  },
  {
    en: "/guides/attractions/tokyo-disney-tickets",
    zhTw: "/zh-tw/guides/attractions/tokyo-disney-tickets",
    zhTitle: "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選",
    zhLabel: "東京迪士尼門票",
  },
  {
    en: "/guides/attractions/usj-tickets-express-pass",
    zhTw: "/zh-tw/guides/attractions/usj-tickets-express-pass",
    zhTitle: "日本環球影城門票與快速通關（2026）：該買哪一種",
    zhLabel: "日本環球影城門票",
  },
  {
    en: "/guides/attractions/mt-fuji-day-tour-from-tokyo",
    zhTw: "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo",
    zhTitle: "富士山一日遊（東京出發．2026）：行程怎麼選、五合目看什麼",
    zhLabel: "富士山一日遊",
  },
  {
    en: "/guides/transport/tokyo-airport-transfer",
    zhTw: "/zh-tw/guides/transport/tokyo-airport-transfer",
    zhTitle: "成田機場到東京市區交通（2026）：Skyliner、N'EX 與利木津巴士比較",
    zhLabel: "成田機場到東京交通",
  },
  {
    en: "/guides/esim/best-esim-japan",
    zhTw: "/zh-tw/guides/esim/best-esim-japan",
    zhTitle: "日本網卡推薦（2026）：eSIM 方案比較與 Klook 日本 eSIM",
    zhLabel: "日本網卡推薦",
  },
  {
    en: "/guides/attractions/things-to-do-tokyo",
    zhTw: "/zh-tw/guides/attractions/things-to-do-tokyo",
    zhTitle: "東京自由行景點（2026）：必去景點哪些要先訂票、哪些可以現場去",
    zhLabel: "東京自由行景點",
  },
  {
    en: "/guides/attractions",
    zhTw: "/zh-tw/guides/attractions",
    zhTitle: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊",
    zhLabel: "日本景點門票",
  },
];

/** Which language a route belongs to, from the route alone. */
export function localeOf(route: string): Locale {
  return route === ZH_TW_PREFIX || route.startsWith(`${ZH_TW_PREFIX}/`) ? "zh-tw" : "en";
}

/** The pair a route belongs to, matching either side. Null when the page is English-only. */
export function pairFor(route: string): TranslatedPage | null {
  return TRANSLATED_PAGES.find((p) => p.en === route || p.zhTw === route) ?? null;
}

/** The Chinese route for an English one, or null if it has not been translated. */
export function zhTwRouteFor(enRoute: string): string | null {
  return TRANSLATED_PAGES.find((p) => p.en === enRoute)?.zhTw ?? null;
}

/**
 * The English route for any route. For a Chinese page this is its translation
 * source; for an English page, itself. Used for the language switch and for
 * x-default, both of which fall back to English.
 */
export function enRouteFor(route: string): string {
  if (localeOf(route) === "en") return route;
  const paired = pairFor(route);
  if (paired) return paired.en;
  // Not in the pair list: strip the prefix, which is where the English page would
  // be if it exists. "/zh-tw" alone strips to "" — that is the home page.
  return route.slice(ZH_TW_PREFIX.length) || "/";
}

export function absoluteUrl(route: string): string {
  return route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

export type HreflangAlternate = { hreflang: string; href: string };

/**
 * The full alternate set for one route — en, zh-Hant-TW, zh-Hant-HK and x-default.
 * Both languages emit the identical list, which is what Google requires for the
 * cluster to be believed. Returns [] for pages that exist in English only, where
 * there is nothing to declare.
 */
export function hreflangAlternates(route: string): HreflangAlternate[] {
  const pair = pairFor(route);
  if (!pair) return [];
  return [
    { hreflang: "en", href: absoluteUrl(pair.en) },
    { hreflang: "zh-Hant-TW", href: absoluteUrl(pair.zhTw) },
    { hreflang: "zh-Hant-HK", href: absoluteUrl(pair.zhTw) },
    { hreflang: "x-default", href: absoluteUrl(pair.en) },
  ];
}

/** "2026-10-20" -> "2026年10月" — the Chinese form of the "Updated" badge. */
export function zhMonthLabel(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return `${y}年${m}月`;
}

/** "2026-10-19" -> "2026年10月19日", for "checked on" lines. */
export function zhDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

/**
 * A price string from lib/attraction-prices.ts, read out in Chinese.
 *
 * Those records are written the way the English guides print them — "from ¥3,400",
 * "Free" — and the figure is the fact, not the English around it. This moves the
 * English qualifier into Chinese ("¥3,400 起") without touching the number, so the
 * two editions quote the same amount and neither page has its own copy of it.
 * Anything already language-neutral ("¥2,500", "¥3,900 – ¥6,900", "¥6,600~") is
 * returned unchanged.
 */
export function zhPrice(value: string | null | undefined): string {
  if (!value) return "—";
  const v = value.trim();
  if (/^free$/i.test(v)) return "免費";
  const from = v.match(/^from\s+(.+)$/i);
  if (from) return `${from[1]} 起`;
  return v;
}
