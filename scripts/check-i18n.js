/**
 * Post-build check for the 繁體中文 and 简体中文 editions.
 *
 *   npm run build && node scripts/check-i18n.js
 *
 * Reads the generated HTML in .next/server/pages and asserts, for every translated
 * page in lib/i18n.ts, the four things that are easy to get wrong and invisible until
 * a crawler tells you months later:
 *
 *   1. all three languages carry the complete, reciprocal hreflang set
 *      (en, zh-Hant-TW, zh-Hant-HK, zh-Hans, zh-Hans-SG, x-default) — a one-sided
 *      set is ignored;
 *   2. the Chinese <title> contains the search term that edition targets, in its own
 *      script — 澀谷SKY 門票 on /zh-tw, 涩谷SKY 门票 on /zh-cn;
 *   3. <html lang> and the canonical point at the page itself;
 *   4. every Klook link on a Chinese page is a www.klook.com URL in that edition's
 *      own locale path (/zh-TW/ or /zh-CN/) with aid=119070, and carries
 *      rel="sponsored noopener". The locale check is the point: a zh-CN page linking
 *      a /zh-TW/ product would hand a Singaporean reader a Traditional checkout
 *      priced in TWD.
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
  HTML_LANG,
  absoluteUrl,
  hreflangAlternates,
  routeOf,
} = require("../lib/i18n.ts");

const BUILD = path.join(__dirname, "..", ".next", "server", "pages");

/**
 * The search term each Chinese title has to contain, verbatim, per edition. Keyed by
 * the English route so the two scripts' terms sit side by side and neither can be
 * quietly dropped when a page is added.
 */
const SEARCH_TERMS = {
  "/guides/attractions": { "zh-tw": "日本景點門票", "zh-cn": "日本景点门票" },
  "/guides/attractions/shibuya-sky-tickets": { "zh-tw": "澀谷SKY 門票", "zh-cn": "涩谷SKY 门票" },
  "/guides/attractions/teamlab-borderless-tickets": { "zh-tw": "teamLab 無界 門票", "zh-cn": "teamLab 无界 门票" },
  "/guides/attractions/teamlab-tokyo-tickets": { "zh-tw": "teamLab Planets 門票", "zh-cn": "teamLab Planets 门票" },
  "/guides/attractions/tokyo-disney-tickets": { "zh-tw": "東京迪士尼門票", "zh-cn": "东京迪士尼门票" },
  "/guides/attractions/usj-tickets-express-pass": { "zh-tw": "日本環球影城門票", "zh-cn": "日本环球影城门票" },
  "/guides/attractions/mt-fuji-day-tour-from-tokyo": { "zh-tw": "富士山一日遊", "zh-cn": "富士山一日游" },
  "/guides/transport/tokyo-airport-transfer": { "zh-tw": "成田機場到東京", "zh-cn": "成田机场到东京" },
  "/guides/esim/best-esim-japan": { "zh-tw": "日本網卡推薦", "zh-cn": "日本eSIM推荐" },
  "/guides/attractions/things-to-do-tokyo": { "zh-tw": "東京自由行", "zh-cn": "东京自由行" },
};

/** Klook's own locale path each edition must link. */
const KLOOK_PREFIX = {
  "zh-tw": "https://www.klook.com/zh-TW/",
  "zh-cn": "https://www.klook.com/zh-CN/",
};

const ZH_LOCALES = ["zh-tw", "zh-cn"];

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

for (const page of TRANSLATED_PAGES) {
  // 1. Reciprocity: all three pages emit the same six links.
  const en = html(page.en);
  if (en) checkHreflang(page.en, en);

  for (const locale of ZH_LOCALES) {
    const route = routeOf(page, locale);
    const markup = html(route);
    if (markup) checkHreflang(route, markup);
    if (!markup) continue;

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

    console.log(`✓ ${route} — ${new Set(urls).size} Klook product link(s), title: ${title}`);
  }
}

// The sitemap has to cross-reference every side too.
const sitemap = fs.readFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), "utf8");
if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) fail("sitemap: missing xhtml namespace");
for (const page of TRANSLATED_PAGES) {
  for (const route of [page.en, page.zhTw, page.zhCn]) {
    for (const { hreflang, href } of hreflangAlternates(route)) {
      if (!sitemap.includes(`<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)) {
        fail(`sitemap: ${route} missing alternate ${hreflang}`);
      }
    }
    if (!sitemap.includes(`<loc>${absoluteUrl(route)}</loc>`)) fail(`sitemap: ${route} not listed`);
  }
}

// llms.txt has to list both Chinese editions.
const llms = fs.readFileSync(path.join(__dirname, "..", "public", "llms.txt"), "utf8");
for (const page of TRANSLATED_PAGES) {
  for (const route of [page.zhTw, page.zhCn]) {
    if (!llms.includes(absoluteUrl(route))) fail(`llms.txt: ${route} not listed`);
  }
}

if (failures.length) {
  console.error(`\ni18n check: ${failures.length} failure(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `\ni18n check: ${TRANSLATED_PAGES.length} pages × ${ZH_LOCALES.length} Chinese editions OK — ` +
    "hreflang, titles, canonicals, Klook locales, sitemap, llms.txt",
);
