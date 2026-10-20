/**
 * Post-build check for the 繁體中文 edition.
 *
 *   npm run build && node scripts/check-i18n.js
 *
 * Reads the generated HTML in .next/server/pages and asserts, for every pair in
 * lib/i18n.ts, the four things that are easy to get wrong and invisible until a
 * crawler tells you months later:
 *
 *   1. both languages carry the complete, reciprocal hreflang set
 *      (en, zh-Hant-TW, zh-Hant-HK, x-default) — a one-sided set is ignored;
 *   2. the Chinese <title> contains the Taiwanese search term the page targets;
 *   3. <html lang> and the canonical point at the page itself;
 *   4. every Klook link on a Chinese page is a www.klook.com/zh-TW/ URL with
 *      aid=119070, and carries rel="sponsored noopener".
 *
 * Note on hreflang casing: React 18 serialises the `hrefLang` prop verbatim, and
 * HTML attribute names are case-insensitive, so `hrefLang="en"` in the markup is
 * `hreflang="en"` to every parser. The match below is case-insensitive for that
 * reason rather than out of laziness.
 */
require("./require-ts");

const fs = require("fs");
const path = require("path");
const { TRANSLATED_PAGES, absoluteUrl, hreflangAlternates } = require("../lib/i18n.ts");

const BUILD = path.join(__dirname, "..", ".next", "server", "pages");

/** The Taiwanese search term each Chinese title has to contain, verbatim. */
const SEARCH_TERMS = {
  "/zh-tw/guides/attractions": "日本景點門票",
  "/zh-tw/guides/attractions/shibuya-sky-tickets": "澀谷SKY 門票",
  "/zh-tw/guides/attractions/teamlab-borderless-tickets": "teamLab 無界 門票",
  "/zh-tw/guides/attractions/teamlab-tokyo-tickets": "teamLab Planets 門票",
  "/zh-tw/guides/attractions/tokyo-disney-tickets": "東京迪士尼門票",
  "/zh-tw/guides/attractions/usj-tickets-express-pass": "日本環球影城門票",
  "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo": "富士山一日遊",
  "/zh-tw/guides/transport/tokyo-airport-transfer": "成田機場到東京",
  "/zh-tw/guides/esim/best-esim-japan": "日本網卡推薦",
  "/zh-tw/guides/attractions/things-to-do-tokyo": "東京自由行",
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

for (const page of TRANSLATED_PAGES) {
  // 1. Reciprocity: the English page and the Chinese page emit the same four links.
  const en = html(page.en);
  const zh = html(page.zhTw);
  if (en) checkHreflang(page.en, en);
  if (zh) checkHreflang(page.zhTw, zh);
  if (!zh) continue;

  // 2. The title carries the search term.
  const title = (zh.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || "";
  const term = SEARCH_TERMS[page.zhTw];
  if (!term) fail(`${page.zhTw}: no search term declared in scripts/check-i18n.js`);
  else if (!title.includes(term)) fail(`${page.zhTw}: title lacks "${term}" — got "${title}"`);

  // 3. Language and canonical.
  const lang = (zh.match(/<html\s+lang="([^"]+)"/) || [])[1];
  if (lang !== "zh-Hant-TW") fail(`${page.zhTw}: <html lang> is "${lang}", expected zh-Hant-TW`);
  if (!zh.includes(`rel="canonical" href="${absoluteUrl(page.zhTw)}"`)) {
    fail(`${page.zhTw}: canonical does not point at itself`);
  }

  // 4. Klook links: zh-TW locale, our aid, and rel="sponsored noopener".
  const urls = [...zh.matchAll(/href="(https:\/\/[^"]*klook[^"]*)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
  if (urls.length === 0) fail(`${page.zhTw}: no Klook link on the page at all`);
  for (const url of new Set(urls)) {
    if (!url.startsWith("https://www.klook.com/zh-TW/")) fail(`${page.zhTw}: Klook link not zh-TW — ${url}`);
    if (!url.includes("aid=119070")) fail(`${page.zhTw}: Klook link missing aid=119070 — ${url}`);
  }
  const anchors = [...zh.matchAll(/<a\s[^>]*href="https:\/\/www\.klook\.com[^"]*"[^>]*>/g)].map((m) => m[0]);
  for (const anchor of anchors) {
    if (!/rel="sponsored noopener"/.test(anchor)) {
      fail(`${page.zhTw}: Klook anchor without rel="sponsored noopener" — ${anchor.slice(0, 140)}`);
    }
  }

  console.log(`✓ ${page.zhTw} — ${new Set(urls).size} Klook product link(s), title: ${title}`);
}

// The sitemap has to cross-reference both sides too.
const sitemap = fs.readFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), "utf8");
if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) fail("sitemap: missing xhtml namespace");
for (const page of TRANSLATED_PAGES) {
  for (const route of [page.en, page.zhTw]) {
    for (const { hreflang, href } of hreflangAlternates(route)) {
      if (!sitemap.includes(`<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`)) {
        fail(`sitemap: ${route} missing alternate ${hreflang}`);
      }
    }
  }
  if (!sitemap.includes(`<loc>${absoluteUrl(page.zhTw)}</loc>`)) fail(`sitemap: ${page.zhTw} not listed`);
}

// llms.txt has to list the Chinese pages.
const llms = fs.readFileSync(path.join(__dirname, "..", "public", "llms.txt"), "utf8");
for (const page of TRANSLATED_PAGES) {
  if (!llms.includes(absoluteUrl(page.zhTw))) fail(`llms.txt: ${page.zhTw} not listed`);
}

if (failures.length) {
  console.error(`\ni18n check: ${failures.length} failure(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`\ni18n check: ${TRANSLATED_PAGES.length} page pairs OK — hreflang, titles, canonicals, Klook links, sitemap, llms.txt`);
