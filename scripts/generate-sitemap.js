/**
 * Generates public/sitemap.xml and data/page-dates.json at build time (runs via `prebuild`).
 *
 * - Walks pages/ for every routable .tsx page (skips _app, _document, api/, 404/500).
 * - lastmod = date of the last git commit that touched the page file, resolved by
 *   lib/page-dates.js (which also feeds the "Updated" badges and JSON-LD dateModified
 *   in pages, so all three stay in sync). See that module for the shallow-clone fallback.
 * - data/page-dates.json is the committed snapshot of those dates, used when the
 *   build environment has no full git history. data/page-published.json is the same
 *   thing for first-published dates, which feed JSON-LD datePublished.
 * - Any URL that has been 301-redirected in lib/redirects.js is excluded (both the merged
 *   guides and the retired top-level landing pages).
 * - Pages that set robots=noindex are excluded too. /disclaimer and /privacy-policy were
 *   listed here until 2026-10-09 despite being noindex, which is a contradictory signal.
 * - Pages that exist in both English and 繁體中文 carry <xhtml:link> alternates for the
 *   whole cluster (en, zh-Hant-TW, zh-Hant-HK, x-default), from lib/i18n.ts — the same
 *   list the <link rel="alternate"> tags in the pages' <head> are built from. Because the
 *   Chinese pages are real files under pages/zh-tw/, the walk above finds them with no
 *   special case; only the alternates below are new.
 */
require("./require-ts");

const fs = require("fs");
const path = require("path");
const { allRedirects } = require("../lib/redirects");
const { BUILD_DATE, PAGES_DIR, fileToRoute, writeSnapshot, writePublishedSnapshot } = require("../lib/page-dates");
const { hreflangAlternates } = require("../lib/i18n.ts");

const SITE = "https://www.japan-travel-kit.com";
const OUT = path.join(__dirname, "..", "public", "sitemap.xml");

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

function meta(route) {
  if (route === "/") return { changefreq: "monthly", priority: "1.0" };
  if (route === "/guides") return { changefreq: "monthly", priority: "0.9" };
  if (["/about"].includes(route)) return { changefreq: "yearly", priority: "0.5" };
  if (["/disclaimer", "/privacy-policy"].includes(route)) return { changefreq: "yearly", priority: "0.3" };
  return { changefreq: "monthly", priority: "0.8" }; // guide hubs + articles
}

/** True when the page declares <meta name="robots" content="noindex..."> */
function isNoindex(file) {
  return /content=\{?"noindex/.test(fs.readFileSync(file, "utf8"));
}

const routes = walk(PAGES_DIR)
  .filter((f) => !/[\\/]_(app|document)\.tsx$/.test(f) && !/[\\/](404|500)\.tsx$/.test(f))
  .filter((f) => !isNoindex(f))
  .map(fileToRoute)
  .filter((route) => !(route in allRedirects))
  .sort((a, b) => a.localeCompare(b));

const lastmod = writeSnapshot(routes);
// Published dates are not in the sitemap, but the same snapshot mechanism has to run
// here: on a shallow clone, `git log --diff-filter=A` cannot see the add commit either.
writePublishedSnapshot(routes);

const urls = routes.map((route) => {
  const { changefreq, priority } = meta(route);
  const loc = route === "/" ? `${SITE}/` : `${SITE}${route}`;
  // Every URL in a translated pair lists the complete cluster, itself included —
  // that reciprocity is what Google requires before it will honour the grouping.
  const alternates = hreflangAlternates(route).map(
    ({ hreflang, href }) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`,
  );
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    ...alternates,
    `    <lastmod>${lastmod[route]}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
});

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  `  <!-- Generated ${BUILD_DATE} by scripts/generate-sitemap.js — do not edit by hand -->`,
  ...urls,
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(OUT, xml, "utf8");
const paired = routes.filter((route) => hreflangAlternates(route).length > 0).length;
console.log(
  `sitemap: ${routes.length} URLs written to ${path.relative(process.cwd(), OUT)} ` +
    `(${paired} with hreflang alternates); ` +
    "date snapshots in data/page-dates.json and data/page-published.json",
);
