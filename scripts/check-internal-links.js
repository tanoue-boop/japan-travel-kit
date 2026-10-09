/**
 * Internal-link audit. Run after `npm run build` (or standalone — it reads source, not output).
 *
 * Reports four counts, all of which must be 0:
 *   (a) internal links pointing at a URL that 301s (lib/redirects.js)
 *   (b) internal links pointing at a route that does not exist (404)
 *   (c) articles linked from fewer than 2 other articles, or not linked from their category hub
 *   (d) href="#" placeholders
 *
 * Also checks the generated sitemap for 301 sources and noindex pages.
 *
 * Links are collected from pages/ plus the hub article lists in lib/guides-*.ts (which the hub
 * pages render). Header/Footer links are site-wide chrome, so they are excluded from the
 * inbound-link counts in (c) — a nav link is not editorial support for an article.
 */
const fs = require("fs");
const path = require("path");
const { allRedirects } = require("../lib/redirects");
const { PAGES_DIR, fileToRoute } = require("../lib/page-dates");

const ROOT = path.join(__dirname, "..");

/** Hub route -> lib source file whose article hrefs that hub renders. */
const HUB_LISTS = {
  "/guides/esim": "lib/guides-esim.ts",
  "/guides/transport": "lib/guides-transport.ts",
  "/guides/money": "lib/guides-money.ts",
  "/guides/attractions": "lib/guides-attractions.ts",
};

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "api") continue;
      out.push(...walk(full));
    } else if (entry.name.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

const pageFiles = walk(PAGES_DIR).filter(
  (f) => !/[\\/]_(app|document)\.tsx$/.test(f) && !/[\\/](404|500)\.tsx$/.test(f),
);
const routes = new Set(pageFiles.map(fileToRoute));

/** Article routes = everything under /guides/<category>/ (hubs and static pages excluded). */
const articles = [...routes].filter((r) => /^\/guides\/[a-z]+\/[a-z0-9-]+$/.test(r)).sort();

/** href="/x" and href={"/x"} — internal paths only, query/hash stripped. */
function internalHrefs(src) {
  const out = [];
  for (const m of src.matchAll(/href=(?:"([^"]*)"|\{"([^"]*)"\})/g)) {
    out.push(m[1] ?? m[2]);
  }
  return out;
}

const hashOnly = [];
const links = []; // { from, to }

for (const file of pageFiles) {
  const from = fileToRoute(file);
  const src = fs.readFileSync(file, "utf8");
  for (const raw of internalHrefs(src)) {
    if (raw === "#") {
      hashOnly.push(from);
      continue;
    }
    if (!raw.startsWith("/")) continue; // external or in-page anchor
    links.push({ from, to: raw.replace(/[?#].*$/, "") });
  }
}

// Hub listing cards come from lib/guides-*.ts, not from literal hrefs in the hub page.
for (const [hub, rel] of Object.entries(HUB_LISTS)) {
  const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
  for (const m of src.matchAll(/href:\s*"(\/[^"]*)"/g)) links.push({ from: hub, to: m[1] });
}

const chrome = new Set(["Header", "Footer"]);
for (const name of chrome) {
  const src = fs.readFileSync(path.join(ROOT, "components", `${name}.tsx`), "utf8");
  for (const raw of internalHrefs(src)) {
    if (!raw.startsWith("/")) continue;
    links.push({ from: `components/${name}.tsx`, to: raw.replace(/[?#].*$/, ""), chrome: true });
  }
}

const redirected = links.filter((l) => l.to in allRedirects);
const missing = links.filter((l) => !(l.to in allRedirects) && !routes.has(l.to));

const editorial = links.filter((l) => !l.chrome);
const inboundFromArticles = new Map(articles.map((a) => [a, new Set()]));
const hubLinked = new Set();
for (const l of editorial) {
  if (!inboundFromArticles.has(l.to)) continue;
  if (articles.includes(l.from) && l.from !== l.to) inboundFromArticles.get(l.to).add(l.from);
  if (l.from in HUB_LISTS) hubLinked.add(l.to);
}

const thinlyLinked = articles.filter((a) => inboundFromArticles.get(a).size < 2);
const hubOrphans = articles.filter((a) => !hubLinked.has(a));

// Sitemap: no 301 sources, no noindex pages.
const sitemapPath = path.join(ROOT, "public", "sitemap.xml");
let sitemapRedirects = [];
let sitemapNoindex = [];
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const locs = [...xml.matchAll(/<loc>https:\/\/www\.japan-travel-kit\.com(\/[^<]*)?<\/loc>/g)].map(
    (m) => (m[1] === "/" || m[1] === undefined ? "/" : m[1]),
  );
  sitemapRedirects = locs.filter((r) => r in allRedirects);
  const noindex = new Set(
    pageFiles
      .filter((f) => /content="noindex|content=\{?"noindex/.test(fs.readFileSync(f, "utf8")))
      .map(fileToRoute),
  );
  sitemapNoindex = locs.filter((r) => noindex.has(r));
}

const report = [
  ["(a) internal links to a 301 source", redirected.map((l) => `${l.from} -> ${l.to}`)],
  ["(b) internal links to a missing route (404)", missing.map((l) => `${l.from} -> ${l.to}`)],
  ["(c1) articles with <2 inbound article links", thinlyLinked.map((a) => `${a} (${inboundFromArticles.get(a).size})`)],
  ["(c2) articles not listed on their category hub", hubOrphans],
  ['(d) href="#" placeholders', hashOnly],
  ["sitemap: 301 sources", sitemapRedirects],
  ["sitemap: noindex pages", sitemapNoindex],
];

let failed = false;
console.log(`routes: ${routes.size}  articles: ${articles.length}  internal links: ${links.length}\n`);
for (const [label, items] of report) {
  console.log(`${items.length === 0 ? "OK  " : "FAIL"} ${label}: ${items.length}`);
  for (const item of items) console.log(`       - ${item}`);
  if (items.length) failed = true;
}
process.exit(failed ? 1 : 0);
