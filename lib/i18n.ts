/**
 * The site's three locales, and the English ↔ 繁體中文 ↔ 简体中文 page triples.
 *
 * Added 2026-10-20 with the first ten Traditional Chinese pages. Taiwan and Hong
 * Kong are near the top of Japan's inbound arrivals, Google is the search engine
 * there, and Klook is already the booking route those readers use — so the trial
 * is the same ten highest-earning English entry pages, translated, with the
 * English URLs left exactly as they were.
 *
 * Extended the same day with 简体中文 under /zh-cn. Chinese is published as a
 * Traditional/Simplified set rather than one script: the readers this edition is
 * for are the Chinese communities of Singapore and Malaysia and Chinese speakers
 * living outside the mainland — all of them on Google, most of them already
 * holding a Klook account — and they read Simplified, not Taiwan's Traditional.
 * The two editions are separate pages rather than one page plus a converter,
 * because the vocabulary differs and not only the characters: 流量卡 / eSIM where
 * Taiwan says 網卡, 一日游 where Taiwan says 一日遊, 快速通行证 for USJ's Express
 * Pass where Taiwan says 快速通關.
 *
 * Structure: the Chinese pages live at `/zh-tw` or `/zh-cn` + the English route, as
 * real files under `pages/zh-tw/` and `pages/zh-cn/`, rather than through
 * next.config's `i18n` option. See the note on ZH_PREFIX for why.
 *
 * This module is the one list of triples. It is read by:
 *
 *   - components/Hreflang.tsx — the <link rel="alternate"> set on all three languages
 *   - components/Header.tsx / Footer.tsx — the English／繁體中文／简体中文 switch,
 *     shown only where the other languages actually have the page
 *   - components/ZhChrome.tsx / ZhSeo.tsx — which script the shared furniture renders in
 *   - scripts/generate-sitemap.js — the <xhtml:link> cross-references
 *   - scripts/generate-llms-txt.js — the 繁體中文 and 简体中文 sections
 *
 * It is plain data and plain functions (no JSX), so the build scripts can require
 * it through scripts/require-ts.js.
 */
import { SITE_URL } from "./structured-data";

export type Locale = "en" | "zh-tw" | "zh-cn";

/** The two Chinese editions. Everything script-dependent is keyed by this. */
export type ZhLocale = Exclude<Locale, "en">;

/** The language the site was written in, and what x-default points at. */
export const DEFAULT_LOCALE: Locale = "en";

/**
 * URL prefix for each Chinese edition.
 *
 * Chosen over next.config's `i18n` sub-path routing because that option makes
 * *every* route exist under *every* locale: all 74 English pages would also answer
 * on /zh-tw/… and /zh-cn/… and serve English, which is 148 duplicate URLs for the
 * ten pages we have actually translated. Real files under pages/zh-tw/ and
 * pages/zh-cn/ create exactly the twenty routes, and because
 * scripts/generate-sitemap.js and lib/page-dates.js both work by walking pages/ and
 * mapping file → route, they pick the new pages up with no change to how either
 * resolves a route or a lastmod date.
 */
export const ZH_PREFIX: Record<ZhLocale, string> = {
  "zh-tw": "/zh-tw",
  "zh-cn": "/zh-cn",
};

export const ZH_TW_PREFIX = ZH_PREFIX["zh-tw"];
export const ZH_CN_PREFIX = ZH_PREFIX["zh-cn"];

/**
 * hreflang values each locale is published under.
 *
 * The Traditional pages are written in Taiwanese Traditional Chinese and serve Hong
 * Kong readers too, so one page carries both regional tags rather than pretending to
 * a Hong Kong edition. The Simplified pages carry the script-only `zh-Hans` plus
 * `zh-Hans-SG`: Singapore is the single largest audience for this edition and worth
 * naming, while every other Simplified-reading region falls through to `zh-Hans`.
 */
export const HREFLANG: Record<Locale, string[]> = {
  en: ["en"],
  "zh-tw": ["zh-Hant-TW", "zh-Hant-HK"],
  "zh-cn": ["zh-Hans", "zh-Hans-SG"],
};

/** `lang` attribute for <html>. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  "zh-tw": "zh-Hant-TW",
  "zh-cn": "zh-Hans",
};

/** JSON-LD `inLanguage`. */
export const JSONLD_LANG: Record<Locale, string> = {
  en: "en",
  "zh-tw": "zh-Hant-TW",
  "zh-cn": "zh-Hans",
};

/** Open Graph `og:locale`. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  "zh-tw": "zh_TW",
  "zh-cn": "zh_CN",
};

/** The name each language calls itself, for the language switch. */
export const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  "zh-tw": "繁體中文",
  "zh-cn": "简体中文",
};

export type TranslatedPage = {
  /** English route. Unchanged by the translations. */
  en: string;
  /** Traditional Chinese route — ZH_PREFIX["zh-tw"] + the English route. */
  zhTw: string;
  /** The 繁體中文 page's <title>, without the " | Japan Travel Kit" suffix. */
  zhTitle: string;
  /** Short 繁體中文 label, for the nav, the footer and llms.txt. */
  zhLabel: string;
  /** Simplified Chinese route — ZH_PREFIX["zh-cn"] + the English route. */
  zhCn: string;
  /** The 简体中文 page's <title>, without the suffix. */
  zhCnTitle: string;
  /** Short 简体中文 label. */
  zhCnLabel: string;
};

/**
 * The ten pages, in the order they were picked: by revenue and clicks, with the
 * Things to Do hub last because it is the category entry point rather than an
 * article. Adding an eleventh page means adding its files under pages/zh-tw/ and
 * pages/zh-cn/ and a row here — nothing else.
 *
 * The two Chinese titles are not conversions of each other. Each carries the phrase
 * its own readers type into Google, checked against live results for that script
 * before being written in: 澀谷SKY 門票 against 涩谷SKY 门票, 日本網卡推薦 against
 * 日本eSIM推荐, 快速通關 against 快速通行证.
 */
export const TRANSLATED_PAGES: TranslatedPage[] = [
  {
    en: "/guides/attractions/shibuya-sky-tickets",
    zhTw: "/zh-tw/guides/attractions/shibuya-sky-tickets",
    zhTitle: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式",
    zhLabel: "澀谷SKY 門票",
    zhCn: "/zh-cn/guides/attractions/shibuya-sky-tickets",
    zhCnTitle: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式",
    zhCnLabel: "涩谷SKY 门票",
  },
  {
    en: "/guides/attractions/teamlab-borderless-tickets",
    zhTw: "/zh-tw/guides/attractions/teamlab-borderless-tickets",
    zhTitle: "teamLab 無界 門票（2026）：票價、時段預約與購票管道",
    zhLabel: "teamLab 無界 門票",
    zhCn: "/zh-cn/guides/attractions/teamlab-borderless-tickets",
    zhCnTitle: "teamLab 无界 门票（2026）：票价、时段预约与购票渠道",
    zhCnLabel: "teamLab 无界 门票",
  },
  {
    en: "/guides/attractions/teamlab-tokyo-tickets",
    zhTw: "/zh-tw/guides/attractions/teamlab-tokyo-tickets",
    zhTitle: "teamLab Planets 門票（2026）：票價、預約方式與無界比較",
    zhLabel: "teamLab Planets 門票",
    zhCn: "/zh-cn/guides/attractions/teamlab-tokyo-tickets",
    zhCnTitle: "teamLab Planets 门票（2026）：票价、预约方式与无界比较",
    zhCnLabel: "teamLab Planets 门票",
  },
  {
    en: "/guides/attractions/tokyo-disney-tickets",
    zhTw: "/zh-tw/guides/attractions/tokyo-disney-tickets",
    zhTitle: "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選",
    zhLabel: "東京迪士尼門票",
    zhCn: "/zh-cn/guides/attractions/tokyo-disney-tickets",
    zhCnTitle: "东京迪士尼门票（2026）：乐园与海洋怎么买、怎么选",
    zhCnLabel: "东京迪士尼门票",
  },
  {
    en: "/guides/attractions/usj-tickets-express-pass",
    zhTw: "/zh-tw/guides/attractions/usj-tickets-express-pass",
    zhTitle: "日本環球影城門票與快速通關（2026）：該買哪一種",
    zhLabel: "日本環球影城門票",
    zhCn: "/zh-cn/guides/attractions/usj-tickets-express-pass",
    zhCnTitle: "日本环球影城门票与快速通行证（2026）：该买哪一种",
    zhCnLabel: "日本环球影城门票",
  },
  {
    en: "/guides/attractions/mt-fuji-day-tour-from-tokyo",
    zhTw: "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo",
    zhTitle: "富士山一日遊（東京出發．2026）：行程怎麼選、五合目看什麼",
    zhLabel: "富士山一日遊",
    zhCn: "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo",
    zhCnTitle: "富士山一日游（东京出发·2026）：行程怎么选、五合目看什么",
    zhCnLabel: "富士山一日游",
  },
  {
    en: "/guides/transport/tokyo-airport-transfer",
    zhTw: "/zh-tw/guides/transport/tokyo-airport-transfer",
    zhTitle: "成田機場到東京市區交通（2026）：Skyliner、N'EX 與利木津巴士比較",
    zhLabel: "成田機場到東京交通",
    zhCn: "/zh-cn/guides/transport/tokyo-airport-transfer",
    zhCnTitle: "成田机场到东京市区交通（2026）：Skyliner、N'EX 与利木津巴士比较",
    zhCnLabel: "成田机场到东京交通",
  },
  {
    en: "/guides/esim/best-esim-japan",
    zhTw: "/zh-tw/guides/esim/best-esim-japan",
    zhTitle: "日本網卡推薦（2026）：eSIM 方案比較與 Klook 日本 eSIM",
    zhLabel: "日本網卡推薦",
    zhCn: "/zh-cn/guides/esim/best-esim-japan",
    zhCnTitle: "日本eSIM推荐（2026）：流量卡方案比较与 Klook 日本 eSIM",
    zhCnLabel: "日本eSIM推荐",
  },
  {
    en: "/guides/attractions/things-to-do-tokyo",
    zhTw: "/zh-tw/guides/attractions/things-to-do-tokyo",
    zhTitle: "東京自由行景點（2026）：必去景點哪些要先訂票、哪些可以現場去",
    zhLabel: "東京自由行景點",
    zhCn: "/zh-cn/guides/attractions/things-to-do-tokyo",
    zhCnTitle: "东京自由行景点（2026）：必去景点哪些要先订票、哪些可以现场去",
    zhCnLabel: "东京自由行景点",
  },
  {
    en: "/guides/attractions",
    zhTw: "/zh-tw/guides/attractions",
    zhTitle: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊",
    zhLabel: "日本景點門票",
    zhCn: "/zh-cn/guides/attractions",
    zhCnTitle: "日本景点门票攻略（2026）：官方票价、预约方式与一日游",
    zhCnLabel: "日本景点门票",
  },
];

/** Which language a route belongs to, from the route alone. */
export function localeOf(route: string): Locale {
  for (const locale of ["zh-tw", "zh-cn"] as ZhLocale[]) {
    const prefix = ZH_PREFIX[locale];
    if (route === prefix || route.startsWith(`${prefix}/`)) return locale;
  }
  return "en";
}

/**
 * Which Chinese edition a route belongs to. English routes answer "zh-tw", because
 * the only callers are the shared Chinese components, which never render on an
 * English page — see components/ZhChrome.tsx.
 */
export function zhLocaleOf(route: string): ZhLocale {
  return localeOf(route) === "zh-cn" ? "zh-cn" : "zh-tw";
}

/** The triple a route belongs to, matching any side. Null when the page is English-only. */
export function pairFor(route: string): TranslatedPage | null {
  return TRANSLATED_PAGES.find((p) => p.en === route || p.zhTw === route || p.zhCn === route) ?? null;
}

/** One side of a triple, by locale. */
export function routeOf(page: TranslatedPage, locale: Locale): string {
  return locale === "en" ? page.en : locale === "zh-tw" ? page.zhTw : page.zhCn;
}

/** The <title> of one Chinese side of a triple. */
export function zhTitleOf(page: TranslatedPage, locale: ZhLocale): string {
  return locale === "zh-tw" ? page.zhTitle : page.zhCnTitle;
}

/** The short label of one Chinese side of a triple. */
export function zhLabelOf(page: TranslatedPage, locale: ZhLocale): string {
  return locale === "zh-tw" ? page.zhLabel : page.zhCnLabel;
}

/** The route in one Chinese edition for an English one, or null if untranslated. */
export function zhRouteFor(enRoute: string, locale: ZhLocale): string | null {
  const page = TRANSLATED_PAGES.find((p) => p.en === enRoute);
  return page ? routeOf(page, locale) : null;
}

/**
 * The English route for any route. For a Chinese page this is its translation
 * source; for an English page, itself. Used for the language switch and for
 * x-default, both of which fall back to English.
 */
export function enRouteFor(route: string): string {
  const locale = localeOf(route);
  if (locale === "en") return route;
  const paired = pairFor(route);
  if (paired) return paired.en;
  // Not in the list: strip the prefix, which is where the English page would be if
  // it exists. "/zh-tw" alone strips to "" — that is the home page.
  return route.slice(ZH_PREFIX[locale].length) || "/";
}

export function absoluteUrl(route: string): string {
  return route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

export type HreflangAlternate = { hreflang: string; href: string };

/**
 * The full alternate set for one route — en, zh-Hant-TW, zh-Hant-HK, zh-Hans,
 * zh-Hans-SG and x-default. All three languages emit the identical list, which is
 * what Google requires for the cluster to be believed. Returns [] for pages that
 * exist in English only, where there is nothing to declare.
 */
export function hreflangAlternates(route: string): HreflangAlternate[] {
  const pair = pairFor(route);
  if (!pair) return [];
  return [
    { hreflang: "en", href: absoluteUrl(pair.en) },
    { hreflang: "zh-Hant-TW", href: absoluteUrl(pair.zhTw) },
    { hreflang: "zh-Hant-HK", href: absoluteUrl(pair.zhTw) },
    { hreflang: "zh-Hans", href: absoluteUrl(pair.zhCn) },
    { hreflang: "zh-Hans-SG", href: absoluteUrl(pair.zhCn) },
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
 * English qualifier into Chinese ("¥3,400 起") without touching the number, so all
 * three editions quote the same amount and no page has its own copy of it.
 * Anything already language-neutral ("¥2,500", "¥3,900 – ¥6,900", "¥6,600~") is
 * returned unchanged. "起" is the same word in both scripts; only "免費／免费" is not.
 */
export function zhPrice(value: string | null | undefined, locale: ZhLocale = "zh-tw"): string {
  if (!value) return "—";
  const v = value.trim();
  if (/^free$/i.test(v)) return locale === "zh-tw" ? "免費" : "免费";
  const from = v.match(/^from\s+(.+)$/i);
  if (from) return `${from[1]} 起`;
  return v;
}
