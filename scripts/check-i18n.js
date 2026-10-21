/**
 * Post-build check for the translated editions — 繁體中文, 简体中文, 한국어 and ไทย.
 *
 *   npm run build && node scripts/check-i18n.js
 *
 * Reads the generated HTML in .next/server/pages and asserts, for every page in
 * lib/i18n.ts and every language that page exists in, the four things that are easy
 * to get wrong and invisible until a crawler tells you months later:
 *
 *   1. every side of a group carries the complete, reciprocal hreflang set — a
 *      one-sided set is ignored. The set is per group, not global: the five pages
 *      that are Chinese-only must not claim ko-KR or th-TH;
 *   2. the translated <title> contains the search term that edition targets, in its
 *      own language — 澀谷SKY 門票 on /zh-tw, 涩谷SKY 门票 on /zh-cn,
 *      시부야 스카이 예약 on /ko, ตั๋ว Shibuya Sky on /th;
 *   3. <html lang> and the canonical point at the page itself;
 *   4. every Klook link on a translated page is a www.klook.com URL in that
 *      edition's own locale path (/zh-TW/, /zh-CN/, /ko/ or /th/) with aid=119070,
 *      and carries rel="sponsored noopener". The locale check is the point: a zh-CN
 *      page linking a /zh-TW/ product would hand a Singaporean reader a Traditional
 *      checkout priced in TWD, and a /ko/ page linking /en-US/ would hand a Korean
 *      reader an English one priced in USD.
 *
 * Note on hreflang casing: React 18 serialises the `hrefLang` prop verbatim, and
 * HTML attribute names are case-insensitive, so `hrefLang="en"` in the markup is
 * `hreflang="en"` to every parser. The match below is case-insensitive for that
 * reason rather than out of laziness.
 */
require("./require-ts");

const fs = require("fs");
const path = require("path");
const {
  TRANSLATED_PAGES,
  TRANSLATED_LOCALES,
  HTML_LANG,
  absoluteUrl,
  hreflangAlternates,
  routeOf,
} = require("../lib/i18n.ts");

const BUILD = path.join(__dirname, "..", ".next", "server", "pages");

/**
 * The search term each translated title has to contain, verbatim, per edition.
 * Keyed by the English route so every language's term for a page sits on one line
 * and none can be quietly dropped when a page is added to an edition.
 *
 * Each term was checked against live results in that language before it was written
 * into the title — see the 2026-10-21 task record for the Korean and Thai searches.
 * A locale listed here but absent from the group is not checked; a locale present in
 * the group but missing here is a failure, so adding a page to an edition without
 * deciding what it ranks for cannot pass silently.
 */
const SEARCH_TERMS = {
  "/guides/attractions": { "zh-tw": "日本景點門票", "zh-cn": "日本景点门票" },
  "/guides/attractions/shibuya-sky-tickets": {
    "zh-tw": "澀谷SKY 門票",
    "zh-cn": "涩谷SKY 门票",
    ko: "시부야 스카이 예약",
    th: "ตั๋ว Shibuya Sky",
  },
  "/guides/attractions/teamlab-borderless-tickets": { "zh-tw": "teamLab 無界 門票", "zh-cn": "teamLab 无界 门票" },
  "/guides/attractions/teamlab-tokyo-tickets": {
    "zh-tw": "teamLab Planets 門票",
    "zh-cn": "teamLab Planets 门票",
    ko: "팀랩 플래닛 예약",
    th: "ตั๋ว teamLab Planets",
  },
  "/guides/attractions/tokyo-disney-tickets": {
    "zh-tw": "東京迪士尼門票",
    "zh-cn": "东京迪士尼门票",
    ko: "도쿄 디즈니랜드 티켓",
    th: "ตั๋วดิสนีย์แลนด์",
  },
  "/guides/attractions/usj-tickets-express-pass": {
    "zh-tw": "日本環球影城門票",
    "zh-cn": "日本环球影城门票",
    ko: "유니버설 스튜디오 재팬 익스프레스 패스",
    th: "Express Pass USJ",
  },
  "/guides/attractions/mt-fuji-day-tour-from-tokyo": { "zh-tw": "富士山一日遊", "zh-cn": "富士山一日游" },
  "/guides/transport/tokyo-airport-transfer": { "zh-tw": "成田機場到東京", "zh-cn": "成田机场到东京" },
  "/guides/esim/best-esim-japan": {
    "zh-tw": "日本網卡推薦",
    "zh-cn": "日本eSIM推荐",
    ko: "일본 이심",
    th: "eSIM ญี่ปุ่น",
  },
  "/guides/attractions/things-to-do-tokyo": { "zh-tw": "東京自由行", "zh-cn": "东京自由行" },
};

/** Klook's own locale path each edition must link. */
const KLOOK_PREFIX = {
  "zh-tw": "https://www.klook.com/zh-TW/",
  "zh-cn": "https://www.klook.com/zh-CN/",
  ko: "https://www.klook.com/ko/",
  th: "https://www.klook.com/th/",
};

const failures = [];
const fail = (msg) => failures.push(msg);

function html(route) {
  const file = path.join(BUILD, `${route === "/" ? "index" : route.replace(/^\//, "")}.html`);
  if (!fs.existsSync(file)) {
    fail(`no built HTML for ${route} (looked for ${path.relative(process.cwd(), file)})`);
    return "";
  }
  return fs.readFileSync(file, "utf8");
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function checkHreflang(route, markup) {
  for (const { hreflang, href } of hreflangAlternates(route)) {
    const re = new RegExp(`rel="alternate"\\s+hreflang="${escape(hreflang)}"\\s+href="${escape(href)}"`, "i");
    if (!re.test(markup)) fail(`${route}: missing hreflang ${hreflang} -> ${href}`);
  }
}

let checked = 0;

for (const page of TRANSLATED_PAGES) {
  // 1. Reciprocity: every side of the group emits the same set.
  const en = html(page.en);
  if (en) checkHreflang(page.en, en);

  for (const locale of TRANSLATED_LOCALES) {
    const route = routeOf(page, locale);
    if (!route) continue; // this edition does not have this page
    const markup = html(route);
    if (!markup) continue;
    checkHreflang(route, markup);

    // 2. The title carries this edition's search term.
    const title = (markup.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || "";
    const term = (SEARCH_TERMS[page.en] || {})[locale];
    if (!term) fail(`${route}: no ${locale} search term declared in scripts/check-i18n.js`);
    else if (!title.includes(term)) fail(`${route}: title lacks "${term}" — got "${title}"`);

    // 3. Language and canonical.
    const lang = (markup.match(/<html\s+lang="([^"]+)"/) || [])[1];
    if (lang !== HTML_LANG[locale]) {
      fail(`${route}: <html lang> is "${lang}", expected ${HTML_LANG[locale]}`);
    }
    if (!markup.includes(`rel="canonical" href="${absoluteUrl(route)}"`)) {
      fail(`${route}: canonical does not point at itself`);
    }

    // 4. Klook links: this edition's locale path, our aid, and rel="sponsored noopener".
    const urls = [...markup.matchAll(/href="(https:\/\/[^"]*klook[^"]*)"/g)].map((m) =>
      m[1].replace(/&amp;/g, "&"),
    );
    if (urls.length === 0) fail(`${route}: no Klook link on the page at all`);
    for (const url of new Set(urls)) {
      if (!url.startsWith(KLOOK_PREFIX[locale])) fail(`${route}: Klook link not ${locale} — ${url}`);
      if (!url.includes("aid=119070")) fail(`${route}: Klook link missing aid=119070 — ${url}`);
    }
    const anchors = [...markup.matchAll(/<a\s[^>]*href="https:\/\/www\.klook\.com[^"]*"[^>]*>/g)].map((m) => m[0]);
    for (const anchor of anchors) {
      if (!/rel="sponsored noopener"/.test(anchor)) {
        fail(`${route}: Klook anchor without rel="sponsored noopener" — ${anchor.slice(0, 140)}`);
      }
    }

    checked++;
    console.log(`✓ ${route} — ${new Set(urls).size} Klook product link(s), title: ${title}`);
  }
}

/** Every translated route the site publishes, in group order. */
const translatedRoutes = TRANSLATED_PAGES.flatMap((page) =>
  TRANSLATED_LOCALES.map((locale) => routeOf(page, locale)).filter(Boolean),
);

// The sitemap has to cross-reference every side too.
const sitemap = fs.readFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), "utf8");
if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) fail("sitemap: missing xhtml namespace");
for (const page of TRANSLATED_PAGES) {
  for (const route of [page.en, ...TRANSLATED_LOCALES.map((l) => routeOf(page, l)).filter(Boolean)]) {
    for (const { hreflang, href } of hreflangAlternates(route)) {
      if (!sitemap.includes(`<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)) {
        fail(`sitemap: ${route} missing alternate ${hreflang}`);
      }
    }
    if (!sitemap.includes(`<loc>${absoluteUrl(route)}</loc>`)) fail(`sitemap: ${route} not listed`);
  }
}

// llms.txt has to list every translated page.
const llms = fs.readFileSync(path.join(__dirname, "..", "public", "llms.txt"), "utf8");
for (const route of translatedRoutes) {
  if (!llms.includes(absoluteUrl(route))) fail(`llms.txt: ${route} not listed`);
}

if (failures.length) {
  console.error(`\ni18n check: ${failures.length} failure(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `\ni18n check: ${checked} translated pages across ${TRANSLATED_LOCALES.length} editions OK — ` +
    "hreflang, titles, canonicals, Klook locales, sitemap, llms.txt",
);
