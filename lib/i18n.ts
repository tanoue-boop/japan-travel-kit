/**
 * The site's locales, and the English ↔ translation groups.
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
 * Extended again 2026-10-21 with 한국어 under /ko and ไทย under /th — the second
 * language wave. Korea and Thailand are the first and fourth largest inbound
 * markets for Japan, both on Google, and Klook has full ko and th storefronts, so
 * the mechanism is the one above with no new moving parts. These two are a
 * five-page trial rather than ten: the highest-earning entry pages only
 * (Shibuya Sky, Tokyo Disney, USJ, teamLab Planets, the eSIM comparison). The
 * Chinese editions keep all ten, so a group can now be any subset of locales —
 * see `hreflangAlternates`, which emits only the sides that exist.
 *
 * Structure: a translated page lives at its locale prefix + the English route, as
 * a real file under `pages/<prefix>/`, rather than through next.config's `i18n`
 * option. See the note on LOCALE_PREFIX for why.
 *
 * This module is the one list of groups. It is read by:
 *
 *   - components/Hreflang.tsx — the <link rel="alternate"> set on every side
 *   - components/Header.tsx / Footer.tsx — the language switch, shown only where
 *     the other languages actually have the page
 *   - components/IntlChrome.tsx / IntlSeo.tsx — which language the shared
 *     furniture renders in
 *   - scripts/generate-sitemap.js — the <xhtml:link> cross-references
 *   - scripts/generate-llms-txt.js — the per-edition sections
 *   - scripts/check-i18n.js — the post-build audit of all of the above
 *
 * It is plain data and plain functions (no JSX), so the build scripts can require
 * it through scripts/require-ts.js.
 */
import { SITE_URL } from "./structured-data";

export type Locale = "en" | "zh-tw" | "zh-cn" | "ko" | "th";

/** Every locale that is a translation of English — i.e. everything with a prefix. */
export type TranslatedLocale = Exclude<Locale, "en">;

/** The two Chinese editions. Everything script-dependent is keyed by this. */
export type ZhLocale = "zh-tw" | "zh-cn";

/** The language the site was written in, and what x-default points at. */
export const DEFAULT_LOCALE: Locale = "en";

/** Every locale, English first — the order the switch and the hreflang set use. */
export const LOCALES: Locale[] = ["en", "zh-tw", "zh-cn", "ko", "th"];

/** The translated editions, in the order they were launched. */
export const TRANSLATED_LOCALES: TranslatedLocale[] = ["zh-tw", "zh-cn", "ko", "th"];

/**
 * URL prefix for each translated edition.
 *
 * Chosen over next.config's `i18n` sub-path routing because that option makes
 * *every* route exist under *every* locale: all 74 English pages would also answer
 * on /zh-tw/…, /zh-cn/…, /ko/… and /th/… and serve English, which is hundreds of
 * duplicate URLs for the thirty pages we have actually translated. Real files
 * under pages/<prefix>/ create exactly the routes that exist, and because
 * scripts/generate-sitemap.js and lib/page-dates.js both work by walking pages/ and
 * mapping file → route, they pick new pages up with no change to how either
 * resolves a route or a lastmod date.
 */
export const LOCALE_PREFIX: Record<TranslatedLocale, string> = {
  "zh-tw": "/zh-tw",
  "zh-cn": "/zh-cn",
  ko: "/ko",
  th: "/th",
};

/**
 * hreflang values each locale is published under.
 *
 * The Traditional pages are written in Taiwanese Traditional Chinese and serve Hong
 * Kong readers too, so one page carries both regional tags rather than pretending to
 * a Hong Kong edition. The Simplified pages carry the script-only `zh-Hans` plus
 * `zh-Hans-SG`: Singapore is the single largest audience for this edition and worth
 * naming, while every other Simplified-reading region falls through to `zh-Hans`.
 * Korean and Thai each get one region tag — `ko-KR` and `th-TH` — because that is
 * where effectively all of their readers are, and a bare `ko` would also claim the
 * Korean speakers of China and Japan, who are not who these pages are written for.
 */
export const HREFLANG: Record<Locale, string[]> = {
  en: ["en"],
  "zh-tw": ["zh-Hant-TW", "zh-Hant-HK"],
  "zh-cn": ["zh-Hans", "zh-Hans-SG"],
  ko: ["ko-KR"],
  th: ["th-TH"],
};

/**
 * `lang` attribute for <html>.
 *
 * Chinese needs the script subtag, because Traditional and Simplified are the same
 * language in two scripts and a bare `zh` would tell a browser or a screen reader
 * nothing useful. Korean and Thai have no such split, so they get the plain
 * language tag — the region lives in hreflang, which is where it means something.
 */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  "zh-tw": "zh-Hant-TW",
  "zh-cn": "zh-Hans",
  ko: "ko",
  th: "th",
};

/** JSON-LD `inLanguage`. */
export const JSONLD_LANG: Record<Locale, string> = {
  en: "en",
  "zh-tw": "zh-Hant-TW",
  "zh-cn": "zh-Hans",
  ko: "ko",
  th: "th",
};

/** Open Graph `og:locale`. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  "zh-tw": "zh_TW",
  "zh-cn": "zh_CN",
  ko: "ko_KR",
  th: "th_TH",
};

/** The name each language calls itself, for the language switch. */
export const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  "zh-tw": "繁體中文",
  "zh-cn": "简体中文",
  ko: "한국어",
  th: "ไทย",
};

export type TranslatedPage = {
  /** English route. Unchanged by the translations. */
  en: string;
  /** Traditional Chinese route — LOCALE_PREFIX["zh-tw"] + the English route. */
  zhTw: string;
  /** The 繁體中文 page's <title>, without the " | Japan Travel Kit" suffix. */
  zhTitle: string;
  /** Short 繁體中文 label, for the nav, the footer and llms.txt. */
  zhLabel: string;
  /** Simplified Chinese route — LOCALE_PREFIX["zh-cn"] + the English route. */
  zhCn: string;
  /** The 简体中文 page's <title>, without the suffix. */
  zhCnTitle: string;
  /** Short 简体中文 label. */
  zhCnLabel: string;
  /** Korean route, on the five pages that have one. */
  ko?: string;
  koTitle?: string;
  koLabel?: string;
  /** Thai route, on the five pages that have one. */
  th?: string;
  thTitle?: string;
  thLabel?: string;
};

/**
 * The ten pages, in the order they were picked: by revenue and clicks, with the
 * Things to Do hub last because it is the category entry point rather than an
 * article. Adding a page to an edition means adding its file under pages/<prefix>/
 * and the three fields here — nothing else.
 *
 * The titles are not conversions of each other. Each carries the phrase its own
 * readers type into Google, checked against live results in that language before
 * being written in: 澀谷SKY 門票 against 涩谷SKY 门票 against 시부야 스카이 예약
 * against ตั๋ว Shibuya Sky; 快速通關 against 快速通行证 against 익스프레스 패스
 * against Express Pass.
 *
 * Korean and Thai exist on five of the ten rows. The missing ones are left absent
 * rather than pointed at English: a page that does not exist in a language must not
 * appear in that language's hreflang set or its sitemap alternates.
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
    ko: "/ko/guides/attractions/shibuya-sky-tickets",
    koTitle: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법",
    koLabel: "시부야 스카이 예약",
    th: "/th/guides/attractions/shibuya-sky-tickets",
    thTitle: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง",
    thLabel: "ตั๋ว Shibuya Sky",
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
    ko: "/ko/guides/attractions/teamlab-tokyo-tickets",
    koTitle: "팀랩 플래닛 예약(2026): 티켓 가격, 입장 시간, 보더리스와 비교",
    koLabel: "팀랩 플래닛 예약",
    th: "/th/guides/attractions/teamlab-tokyo-tickets",
    thTitle: "ตั๋ว teamLab Planets (2026): ราคา รอบเข้าชม และเทียบกับ Borderless",
    thLabel: "ตั๋ว teamLab Planets",
  },
  {
    en: "/guides/attractions/tokyo-disney-tickets",
    zhTw: "/zh-tw/guides/attractions/tokyo-disney-tickets",
    zhTitle: "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選",
    zhLabel: "東京迪士尼門票",
    zhCn: "/zh-cn/guides/attractions/tokyo-disney-tickets",
    zhCnTitle: "东京迪士尼门票（2026）：乐园与海洋怎么买、怎么选",
    zhCnLabel: "东京迪士尼门票",
    ko: "/ko/guides/attractions/tokyo-disney-tickets",
    koTitle: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드·씨 선택",
    koLabel: "도쿄 디즈니랜드 티켓",
    th: "/th/guides/attractions/tokyo-disney-tickets",
    thTitle: "ตั๋วดิสนีย์แลนด์โตเกียว (2026): บัตรระบุวัน และเลือกแลนด์หรือซี",
    thLabel: "ตั๋วดิสนีย์แลนด์โตเกียว",
  },
  {
    en: "/guides/attractions/usj-tickets-express-pass",
    zhTw: "/zh-tw/guides/attractions/usj-tickets-express-pass",
    zhTitle: "日本環球影城門票與快速通關（2026）：該買哪一種",
    zhLabel: "日本環球影城門票",
    zhCn: "/zh-cn/guides/attractions/usj-tickets-express-pass",
    zhCnTitle: "日本环球影城门票与快速通行证（2026）：该买哪一种",
    zhCnLabel: "日本环球影城门票",
    ko: "/ko/guides/attractions/usj-tickets-express-pass",
    koTitle: "유니버설 스튜디오 재팬 익스프레스 패스(2026): 티켓은 어떤 것을 살까",
    koLabel: "USJ 익스프레스 패스",
    th: "/th/guides/attractions/usj-tickets-express-pass",
    thTitle: "บัตร USJ และ Express Pass USJ (2026): ควรซื้อแบบไหน",
    thLabel: "Express Pass USJ",
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
    ko: "/ko/guides/esim/best-esim-japan",
    koTitle: "일본 이심 추천(2026): eSIM 요금제 비교와 클룩 일본 eSIM",
    koLabel: "일본 이심 추천",
    th: "/th/guides/esim/best-esim-japan",
    thTitle: "eSIM ญี่ปุ่น 2026: เทียบแพ็กเกจ และ eSIM ญี่ปุ่นของ Klook",
    thLabel: "eSIM ญี่ปุ่น",
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
  for (const locale of TRANSLATED_LOCALES) {
    const prefix = LOCALE_PREFIX[locale];
    if (route === prefix || route.startsWith(`${prefix}/`)) return locale;
  }
  return "en";
}

/**
 * Which translated edition a route belongs to. English routes answer "zh-tw",
 * because the only callers are the shared translated-page components, which never
 * render on an English page — see components/IntlChrome.tsx.
 */
export function translatedLocaleOf(route: string): TranslatedLocale {
  const locale = localeOf(route);
  return locale === "en" ? "zh-tw" : locale;
}

/** The group a route belongs to, matching any side. Null when the page is English-only. */
export function pairFor(route: string): TranslatedPage | null {
  return (
    TRANSLATED_PAGES.find(
      (p) => p.en === route || p.zhTw === route || p.zhCn === route || p.ko === route || p.th === route,
    ) ?? null
  );
}

/** One side of a group, by locale. Null where that language does not have the page. */
export function routeOf(page: TranslatedPage, locale: Locale): string | null {
  switch (locale) {
    case "en":
      return page.en;
    case "zh-tw":
      return page.zhTw;
    case "zh-cn":
      return page.zhCn;
    case "ko":
      return page.ko ?? null;
    case "th":
      return page.th ?? null;
  }
}

/** The <title> of one side of a group, without the site-name suffix. */
export function titleOf(page: TranslatedPage, locale: TranslatedLocale): string | null {
  switch (locale) {
    case "zh-tw":
      return page.zhTitle;
    case "zh-cn":
      return page.zhCnTitle;
    case "ko":
      return page.koTitle ?? null;
    case "th":
      return page.thTitle ?? null;
  }
}

/** The short nav/footer label of one side of a group. */
export function labelOf(page: TranslatedPage, locale: TranslatedLocale): string | null {
  switch (locale) {
    case "zh-tw":
      return page.zhLabel;
    case "zh-cn":
      return page.zhCnLabel;
    case "ko":
      return page.koLabel ?? null;
    case "th":
      return page.thLabel ?? null;
  }
}

/** Every group that has a page in `locale`, in declaration order. */
export function pagesIn(locale: TranslatedLocale): TranslatedPage[] {
  return TRANSLATED_PAGES.filter((p) => routeOf(p, locale) !== null);
}

/**
 * The English route for any route. For a translated page this is its translation
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
  return route.slice(LOCALE_PREFIX[locale].length) || "/";
}

export function absoluteUrl(route: string): string {
  return route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

export type HreflangAlternate = { hreflang: string; href: string };

/**
 * The full alternate set for one route — one entry per hreflang value of every
 * language that actually has this page, plus x-default on the English one. Every
 * side of a group emits the identical list, which is what Google requires before it
 * will believe the cluster. Returns [] for pages that exist in English only, where
 * there is nothing to declare.
 *
 * A language without the page contributes nothing: the five pages that are not in
 * Korean or Thai declare the Chinese cluster only, exactly as they did before those
 * editions existed.
 */
export function hreflangAlternates(route: string): HreflangAlternate[] {
  const pair = pairFor(route);
  if (!pair) return [];
  const out: HreflangAlternate[] = [];
  for (const locale of LOCALES) {
    const side = routeOf(pair, locale);
    if (!side) continue;
    for (const hreflang of HREFLANG[locale]) out.push({ hreflang, href: absoluteUrl(side) });
  }
  out.push({ hreflang: "x-default", href: absoluteUrl(pair.en) });
  return out;
}

const THAI_MONTHS = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

/**
 * "2026-10-20" -> "2026年10月" / "2026년 10월" / "ตุลาคม 2026" — the translated form
 * of the "Updated" badge. Hand-rolled rather than toLocaleDateString so the server
 * and the browser render the identical string with no ICU data in the bundle.
 *
 * Thai years are written in the Gregorian era here, not the Buddhist one. These
 * pages quote the same facts as the English page, including its dates, and 2026 is
 * also what the operators' own booking calendars show a Thai visitor.
 */
export function monthLabel(iso: string, locale: TranslatedLocale): string {
  const [y, m] = iso.split("-").map(Number);
  if (locale === "ko") return `${y}년 ${m}월`;
  if (locale === "th") return `${THAI_MONTHS[m - 1]} ${y}`;
  return `${y}年${m}月`;
}

/** "2026-10-19" -> "2026年10月19日" / "2026년 10월 19일" / "19 ตุลาคม 2026". */
export function dateLabel(iso: string, locale: TranslatedLocale): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (locale === "ko") return `${y}년 ${m}월 ${d}일`;
  if (locale === "th") return `${d} ${THAI_MONTHS[m - 1]} ${y}`;
  return `${y}年${m}月${d}日`;
}

/**
 * A price string from lib/attraction-prices.ts, read out in the page's language.
 *
 * Those records are written the way the English guides print them — "from ¥3,400",
 * "Free" — and the figure is the fact, not the English around it. This moves the
 * English qualifier into the target language ("¥3,400 起", "¥3,400부터",
 * "เริ่มต้น ¥3,400") without touching the number, so every edition quotes the same
 * amount and no page has its own copy of it. Anything already language-neutral
 * ("¥2,500", "¥3,900 – ¥6,900", "¥6,600~") is returned unchanged.
 */
export function priceLabel(value: string | null | undefined, locale: TranslatedLocale): string {
  if (!value) return "—";
  const v = value.trim();
  if (/^free$/i.test(v)) {
    if (locale === "zh-tw") return "免費";
    if (locale === "zh-cn") return "免费";
    if (locale === "ko") return "무료";
    return "ฟรี";
  }
  const from = v.match(/^from\s+(.+)$/i);
  if (from) {
    if (locale === "ko") return `${from[1]}부터`;
    if (locale === "th") return `เริ่มต้น ${from[1]}`;
    // "起" is the same word in both Chinese scripts.
    return `${from[1]} 起`;
  }
  return v;
}

// ── Chinese entry points ────────────────────────────────────────────────────
// The twenty Chinese pages call these; they are the three functions above with the
// script fixed. Kept as their own names because "zh" is the one locale where a page
// has to say which script it is in (zhPrice("Free", "zh-cn") is 免费, not 免費).

/** "2026-10-20" -> "2026年10月". */
export function zhMonthLabel(iso: string): string {
  return monthLabel(iso, "zh-tw");
}

/** "2026-10-19" -> "2026年10月19日", for "checked on" lines. */
export function zhDateLabel(iso: string): string {
  return dateLabel(iso, "zh-tw");
}

/** A price record read out in Chinese — see priceLabel. */
export function zhPrice(value: string | null | undefined, locale: ZhLocale = "zh-tw"): string {
  return priceLabel(value, locale);
}
