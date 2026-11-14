/**
 * Post-build check for the translated editions — 繁體中文, 简体中文, 한국어 and ไทย.
 *
 *   npm run build && node scripts/check-i18n.js
 *
 * Reads the generated HTML in .next/server/pages and asserts, for every group in
 * lib/i18n.ts's PAGE_GROUPS — the four language entry pages plus the translated guide
 * set — and every language that group exists in, the four things that are easy to get
 * wrong and invisible until a crawler tells you months later:
 *
 *   1. every side of a group carries the complete, reciprocal hreflang set — a
 *      one-sided set is ignored. The set is per group, not global: the five pages
 *      that are Chinese-only must not claim ko-KR or th-TH;
 *   2. the translated <title> contains the search term that edition targets, in its
 *      own language — 澀谷SKY 門票 on /zh-tw, 涩谷SKY 门票 on /zh-cn,
 *      시부야 스카이 티켓 on /ko, ตั๋ว Shibuya Sky on /th;
 *   3. <html lang> and the canonical point at the page itself;
 *   4. every Klook link on a translated page sells a www.klook.com product in that
 *      edition's own locale path (/zh-TW/, /zh-CN/, /ko/ or /th/) with aid=119070,
 *      and carries rel="sponsored noopener". The product is read out of the
 *      redirect's `k_site`, which is where it lives now that each link carries the
 *      page's own `aff_adid`. The locale check is the point: a zh-CN
 *      page linking a /zh-TW/ product would hand a Singaporean reader a Traditional
 *      checkout priced in TWD, and a /ko/ page linking /en-US/ would hand a Korean
 *      reader an English one priced in USD.
 *
 *   5. (warn-only) every translated article has the same <h2> count as its English
 *      page, KlookTourPicks/KlookTripPrep wherever the English page has them, and at
 *      least 80% of its Klook links — see the section near the end.
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
  PAGE_GROUPS,
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
  // The four language entry pages, added 2026-10-21. Keyed by "/" because the English
  // side of that group is the home page.
  "/": {
    "zh-tw": "日本旅遊實用指南",
    "zh-cn": "日本旅游实用指南",
    ko: "일본 여행 준비 가이드",
    th: "ไกด์เที่ยวญี่ปุ่น",
  },
  "/guides/attractions": { "zh-tw": "日本景點門票", "zh-cn": "日本景点门票" },
  "/guides/attractions/shibuya-sky-tickets": {
    "zh-tw": "澀谷SKY 門票",
    "zh-cn": "涩谷SKY 门票",
    // 2026-11-13 (R02): "시부야 스카이 티켓" is the top Korean query (130 impressions in
    // GSC 10/14~11/10, ahead of 시부야 스카이 예약 at 91); the title now leads with it.
    ko: "시부야 스카이 티켓",
    th: "ตั๋ว Shibuya Sky",
  },
  "/guides/attractions/teamlab-borderless-tickets": {
    "zh-tw": "teamLab 無界 門票",
    "zh-cn": "teamLab 无界 门票",
    ko: "팀랩 보더리스",
    th: "teamLab Borderless",
  },
  // Added 2026-11-01 with the Skytree and Dotonbori editions. The Korean and Thai
  // terms are the transliterations those readers actually search — 도쿄 스카이트리
  // rather than Tokyo Skytree, ล่องเรือโดทงโบริ rather than Dotonbori cruise —
  // while Thai keeps the Latin "Tokyo Skytree", which is what Thai results show.
  "/guides/attractions/tokyo-skytree-tickets": {
    "zh-tw": "東京晴空塔門票",
    "zh-cn": "东京晴空塔门票",
    ko: "도쿄 스카이트리 티켓",
    th: "ตั๋ว Tokyo Skytree",
  },
  "/guides/attractions/dotonbori-river-cruise": {
    "zh-tw": "道頓堀遊船",
    "zh-cn": "道顿堀游船",
    ko: "도톤보리 리버크루즈",
    th: "ล่องเรือโดทงโบริ",
  },
  "/guides/attractions/teamlab-planets-tickets": {
    "zh-tw": "teamLab Planets 門票",
    "zh-cn": "teamLab Planets 门票",
    ko: "팀랩 플래닛 예약",
    th: "ตั๋ว teamLab Planets",
  },
  // From 2026-11-06 the comparison page, so it must not chase the Planets ticket terms.
  "/guides/attractions/teamlab-tokyo-tickets": {
    "zh-tw": "teamLab Planets 無界 比較",
    "zh-cn": "teamLab Planets 无界 比较",
    ko: "팀랩 플래닛 보더리스 비교",
    th: "teamLab Planets หรือ Borderless",
  },
  "/guides/attractions/tokyo-disney-tickets": {
    "zh-tw": "東京迪士尼門票",
    "zh-cn": "东京迪士尼门票",
    ko: "도쿄 디즈니랜드 티켓",
    th: "ตั๋วดิสนีย์แลนด์",
  },
  // 14 Nov 2026 (R01): retargeted from "tickets" to the Express Pass query itself.
  "/guides/attractions/usj-tickets-express-pass": {
    "zh-tw": "日本環球影城快速通關",
    "zh-cn": "日本环球影城快速通关",
    ko: "유니버설 스튜디오 재팬 익스프레스 패스",
    th: "Express Pass ยูนิเวอร์แซล",
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
  // Added 2026-11-06 with the winter set. Chinese readers write 札幌雪祭 in both scripts;
  // the other four differ only by script, or by the 一日游 / 行程 wording each side uses.
  "/guides/attractions/jigokudani-snow-monkey-tour": {
    "zh-tw": "地獄谷野猿公苑",
    "zh-cn": "地狱谷野猿公苑",
    ko: "지고쿠다니 원숭이 공원",
    th: "ลิงหิมะจิโกกุดานิ",
  },
  "/guides/attractions/sapporo-snow-festival-tours": {
    "zh-tw": "札幌雪祭",
    "zh-cn": "札幌雪祭",
    ko: "삿포로 눈축제",
    th: "เทศกาลหิมะซัปโปโร",
  },
  "/guides/attractions/niseko-ski-tours": {
    "zh-tw": "二世谷滑雪",
    "zh-cn": "二世谷滑雪",
    ko: "니세코 스키",
    th: "เล่นสกีนิเซโกะ",
  },
  "/guides/attractions/hokkaido-7-day-itinerary": {
    "zh-tw": "北海道7天行程",
    "zh-cn": "北海道7日游",
    ko: "홋카이도 7일 여행",
    th: "เที่ยวฮอกไกโด 7 วัน",
  },
  "/guides/attractions/japan-winter-itinerary": {
    "zh-tw": "日本冬季行程",
    "zh-cn": "日本冬季行程",
    ko: "일본 겨울 여행",
    th: "เที่ยวญี่ปุ่นหน้าหนาว",
  },
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

for (const page of PAGE_GROUPS) {
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
    //
    // Since 27 Oct 2026 every Klook link is an affiliate.klook.com/redirect URL
    // carrying the page's own `aff_adid`, with the product in `k_site` (see
    // lib/klook-adids.ts). The product is what this check is about, so the
    // locale test reads k_site; `aid=119070` is on the redirect itself.
    const urls = [...markup.matchAll(/href="(https:\/\/[^"]*klook[^"]*)"/g)].map((m) =>
      m[1].replace(/&amp;/g, "&"),
    );
    if (urls.length === 0) fail(`${route}: no Klook link on the page at all`);
    for (const url of new Set(urls)) {
      const kSite = (url.match(/[?&]k_site=([^&]+)/) || [])[1];
      const product = kSite ? decodeURIComponent(kSite) : url;
      if (!product.startsWith(KLOOK_PREFIX[locale])) {
        fail(`${route}: Klook link not ${locale} — ${product}`);
      }
      if (!url.includes("aid=119070")) fail(`${route}: Klook link missing aid=119070 — ${url}`);
    }
    const anchors = [...markup.matchAll(/<a\s[^>]*href="https:\/\/[^"]*klook\.com[^"]*"[^>]*>/g)].map((m) => m[0]);
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
const translatedRoutes = PAGE_GROUPS.flatMap((page) =>
  TRANSLATED_LOCALES.map((locale) => routeOf(page, locale)).filter(Boolean),
);

// The sitemap has to cross-reference every side too.
const sitemap = fs.readFileSync(path.join(__dirname, "..", "public", "sitemap.xml"), "utf8");
if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) fail("sitemap: missing xhtml namespace");
for (const page of PAGE_GROUPS) {
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

// ---------------------------------------------------------------------------
// 5. Parity with the English page (added 2026-11-01, task jtk-20261101-A15).
//
// The translated articles had drifted into shortened versions of the English ones —
// /ko/…/shibuya-sky-tickets was 405 lines against 848, with no KlookTourPicks, one of
// two KlookTripPrep blocks, no GetYourGuide button and 7 Klook links against 15 — so a
// reader who switched language lost both content and the links that pay. For every
// translated article this lists the ones that do not carry:
//
//   a. the same number of <h2> sections as the English page (built HTML);
//   b. KlookTourPicks and KlookTripPrep wherever the English page has them (source);
//   c. at least 80% of the English page's Klook links (built HTML anchors).
//
// Warn-only, like check-klook-adids and check-meta-length: it prints the list and
// never changes the exit code. Hubs are skipped — the language entry pages (A14) and
// /guides/attractions, whose English side is a generated index of English-only
// articles rather than an article to mirror.
// ---------------------------------------------------------------------------
const PARITY_SKIP = new Set(["/", "/guides/attractions"]);
const PARITY_COMPONENTS = ["KlookTourPicks", "KlookTripPrep"];
const PAGES_DIR = path.join(__dirname, "..", "pages");

function sourceOf(route) {
  for (const file of [path.join(PAGES_DIR, `${route}.tsx`), path.join(PAGES_DIR, route, "index.tsx")]) {
    if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
  }
  return "";
}
const h2Count = (markup) => (markup.match(/<h2[\s>]/g) || []).length;
const klookCount = (markup) => (markup.match(/<a\s[^>]*href="[^"]*klook\.com[^"]*"/g) || []).length;

const parityGaps = [];
let parityChecked = 0;
for (const page of PAGE_GROUPS) {
  if (PARITY_SKIP.has(page.en)) continue;
  const enFile = path.join(BUILD, `${page.en.replace(/^\//, "")}.html`);
  if (!fs.existsSync(enFile)) continue;
  const enMarkup = fs.readFileSync(enFile, "utf8");
  const enSource = sourceOf(page.en);
  const enH2 = h2Count(enMarkup);
  const enKlook = klookCount(enMarkup);

  for (const locale of TRANSLATED_LOCALES) {
    const route = routeOf(page, locale);
    if (!route) continue;
    const file = path.join(BUILD, `${route.replace(/^\//, "")}.html`);
    if (!fs.existsSync(file)) continue;
    const markup = fs.readFileSync(file, "utf8");
    const source = sourceOf(route);
    const gaps = [];
    const h2 = h2Count(markup);
    if (h2 !== enH2) gaps.push(`h2 ${h2} vs English ${enH2}`);
    for (const c of PARITY_COMPONENTS) {
      const re = new RegExp(`<${c}[\\s>/]`);
      if (re.test(enSource) && !re.test(source)) gaps.push(`no ${c}`);
    }
    const klook = klookCount(markup);
    if (klook < Math.ceil(enKlook * 0.8)) gaps.push(`Klook links ${klook} vs English ${enKlook} (< 80%)`);
    parityChecked++;
    if (gaps.length) parityGaps.push(`${route}: ${gaps.join("; ")}`);
  }
}

console.log(`\nParity with English: ${parityChecked} translated articles checked (h2 count, KlookTourPicks/KlookTripPrep, Klook links >= 80%)`);
if (parityGaps.length) {
  console.warn(`! ${parityGaps.length} translated page(s) fall short of their English page:`);
  for (const gap of parityGaps) console.warn(`  - ${gap}`);
} else {
  console.log("✓ every translated article matches its English page's sections and revenue blocks");
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
