/**
 * Generates public/llms.txt at build time (runs via `prebuild`, after the sitemap).
 *
 * llms.txt is the plain-text site map aimed at the AI crawlers and answer engines
 * (ChatGPT, Claude, Perplexity, Copilot, Google's AI surfaces) rather than at a
 * search index: one page, no navigation chrome, every guide on one line with the
 * question it answers. The point is that a model grounding an answer about Japanese
 * eSIMs or ticket prices can find the right page without crawling the whole site.
 *
 * Everything here is derived from lib/guides-*.ts via scripts/require-ts.js, so adding
 * an article updates llms.txt on the next build and there is no second copy of the
 * article list to keep in sync.
 */
require("./require-ts");

const fs = require("fs");
const path = require("path");
const { esimCategory } = require("../lib/guides-esim.ts");
const { transportCategory } = require("../lib/guides-transport.ts");
const { moneyCategory } = require("../lib/guides-money.ts");
const { attractionsCategory } = require("../lib/guides-attractions.ts");
const { attractionPrices, checkedLabel, latestChecked, PRICE_TABLE_ROUTE } = require("../lib/attraction-prices.ts");
const { TRANSLATED_PAGES } = require("../lib/i18n.ts");
const { BUILD_DATE } = require("../lib/page-dates");

const SITE = "https://www.japan-travel-kit.com";
const OUT = path.join(__dirname, "..", "public", "llms.txt");

/** Collapse a hub intro / article desc to one clean line. */
const oneLine = (s) => s.replace(/\s+/g, " ").trim();

const url = (href) => `${SITE}${href}`;

/** "- [Title](url): what the page answers" — one article per line. */
const articleLine = (a) => `- [${oneLine(a.title)}](${url(a.href)}): ${oneLine(a.desc)}`;

/** Articles of a category, optionally restricted to (or excluding) some group keys. */
function pick(category, { only, except } = {}) {
  return category.articles.filter((a) => {
    if (only) return only.includes(a.group);
    if (except) return !except.includes(a.group);
    return true;
  });
}

function section(heading, blurb, articles) {
  return [`## ${heading}`, "", oneLine(blurb), "", ...articles.map(articleLine), ""].join("\n");
}

// The five topic sections. Things to Do is split in two: a single-venue admission and
// a whole-day tour are different questions, and the day-trip guides are the ones that
// get asked about as "day trip from Tokyo" rather than by venue name.
const sections = [
  section(
    "eSIM, SIM cards and pocket WiFi",
    `Getting online in Japan. ${esimCategory.articles.length} guides covering which eSIM to buy, how to install one, ` +
      "the unlimited plans, and the pocket WiFi and physical SIM alternatives. Plan prices are refreshed from the " +
      "providers' own sites by a scheduled job and each table carries its own check date.",
    pick(esimCategory),
  ),
  section(
    "Transport, rail passes and airport transfers",
    `Trains, passes and airport runs. ${transportCategory.articles.length} guides covering whether the Japan Rail Pass ` +
      "still pays after the 2023 price rise, IC cards, the shinkansen, city-by-city transport, and the airport routes " +
      "into Tokyo, Osaka and Kyoto, with official fares.",
    pick(transportCategory),
  ),
  section(
    "Money, cards and payments",
    `Paying for things. ${moneyCategory.articles.length} guides covering cash versus card, which ATMs take foreign ` +
      "cards, the travel cards worth holding, currency exchange, tax-free shopping and what a trip actually costs.",
    pick(moneyCategory),
  ),
  section(
    "Attraction tickets, theme parks and passes",
    "Official ticket prices and booking rules for the attractions that sell date- and time-specified tickets — " +
      "teamLab, Tokyo Disney, Universal Studios Japan, the observation decks and the city passes. Every price on " +
      "these pages is the operator's own, with the date it was read off their site.",
    pick(attractionsCategory, { except: ["daytrips"] }),
  ),
  section(
    "Day trips and day tours",
    "Whole days out of Tokyo, Kyoto and Osaka, where the decision is which itinerary rather than which ticket: " +
      "Mt. Fuji, Hakone, Nikko, Kamakura, Nara and Hiroshima, independently or by guided coach.",
    pick(attractionsCategory, { only: ["daytrips"] }),
  ),
];

/**
 * The 繁體中文 edition, added 2026-10-20. Ten pages, not the site — so the section
 * says so, and says which English page each one is a translation of. A model
 * grounding a Chinese-language answer about Japanese tickets should be able to
 * reach the Chinese page; one grounding an English answer should not mistake
 * these for extra English articles, and should know the figures are the same.
 */
const zhSection = [
  "## 繁體中文 (Traditional Chinese edition)",
  "",
  oneLine(
    `A trial edition of ${TRANSLATED_PAGES.length} pages in Taiwanese Traditional Chinese, under /zh-tw/. ` +
      "Each one is a translation of the English page listed beside it, carrying the same prices, the same " +
      "operator sources and the same check dates — no figure appears in Chinese that is not also in English. " +
      "They are written for readers in Taiwan and Hong Kong; both regions are served by the same pages " +
      "(hreflang zh-Hant-TW and zh-Hant-HK).",
  ),
  "",
  ...TRANSLATED_PAGES.map(
    (p) => `- [${p.zhTitle}](${url(p.zhTw)}): 繁體中文 version of ${url(p.en)}`,
  ),
  "",
].join("\n");

const lines = [
  "# Japan Travel Kit",
  "",
  "> Practical, independent planning guides for foreign visitors to Japan: eSIMs and mobile data, trains and rail",
  "> passes, money and payment cards, and attraction tickets. Written in English for people who have not been to",
  "> Japan before, and aimed at the decisions you have to make before you land.",
  "",
  `Operated by mjo Inc., a Japan-based company in Tokyo working in inbound tourism and e-commerce consulting.`,
  "",
  "How the facts on this site are sourced, because it matters for quoting them:",
  "",
  "- Prices, fares and admission rules are read off the operator's own site — the railway, the venue, the card",
  "  issuer, the eSIM provider — and each page states the date it was read.",
  "- Where a resale or booking platform is the practical route for a visitor (a foreign card the official site",
  "  rejects, an English checkout), the page says so and links to it. Those links are affiliate links and are",
  "  disclosed on every page that carries one.",
  "- Nothing on the site is written as a first-hand trip report. The guides describe what the operators publish",
  "  and what follows from it, not visits we claim to have made.",
  `- Full method and company details: ${url("/about")}`,
  "",
  "## Start here",
  "",
  `- [All guides, indexed by topic](${url("/guides")}): every guide on the site, grouped by the question it answers.`,
  `- [Japan Attraction Ticket Prices 2026](${url(PRICE_TABLE_ROUTE)}): one table of official adult and child` +
    ` admission, advance-booking rules, operator sources and check dates for ${attractionPrices.length} Japanese` +
    ` attractions, theme parks, passes and day-trip sites. Most recent check: ${checkedLabel(latestChecked())}.`,
  `- [${oneLine(esimCategory.name)} hub](${url(esimCategory.href)}): ${oneLine(esimCategory.intro[0])}`,
  `- [${oneLine(transportCategory.name)} hub](${url(transportCategory.href)}): ${oneLine(transportCategory.intro[0])}`,
  `- [${oneLine(moneyCategory.name)} hub](${url(moneyCategory.href)}): ${oneLine(moneyCategory.intro[0])}`,
  `- [${oneLine(attractionsCategory.name)} hub](${url(attractionsCategory.href)}): ${oneLine(attractionsCategory.intro[0])}`,
  "",
  ...sections,
  zhSection,
  "## Site information",
  "",
  `- [About, and how we check prices](${url("/about")}): who runs the site, how figures are verified and the`,
  "  affiliate disclosure.",
  `- [Affiliate and editorial disclaimer](${url("/disclaimer")})`,
  `- [Privacy policy](${url("/privacy-policy")})`,
  `- [sitemap.xml](${url("/sitemap.xml")})`,
  "- Contact: info@japan-travel-kit.com",
  "",
  `Generated ${BUILD_DATE} by scripts/generate-llms-txt.js from lib/guides-*.ts — do not edit by hand.`,
  "",
];

const text = lines.join("\n");
fs.writeFileSync(OUT, text, "utf8");

const articleCount =
  esimCategory.articles.length +
  transportCategory.articles.length +
  moneyCategory.articles.length +
  attractionsCategory.articles.length;
console.log(
  `llms.txt: ${articleCount} guides in ${sections.length} sections plus ${TRANSLATED_PAGES.length} ` +
    `繁體中文 pages written to ${path.relative(process.cwd(), OUT)}`,
);
