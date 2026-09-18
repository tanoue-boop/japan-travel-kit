/**
 * Generates public/sitemap.xml and data/page-dates.json at build time (runs via `prebuild`).
 *
 * - Walks pages/ for every routable .tsx page (skips _app, _document, api/, 404/500).
 * - lastmod = date of the last git commit that touched the page file, resolved by
 *   lib/page-dates.js (which also feeds the "Updated" badges and JSON-LD dateModified
 *   in pages, so all three stay in sync). See that module for the shallow-clone fallback.
 * - data/page-dates.json is the committed snapshot of those dates, used when the
 *   build environment has no full git history.
 * - Any URL that has been 301-redirected in lib/redirects.js is excluded.
 */
const fs = require("fs");
const path = require("path");
const { removedGuides } = require("../lib/redirects");
const { BUILD_DATE, PAGES_DIR, fileToRoute, writeSnapshot } = require("../lib/page-dates");

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
  if (["/sim-cards", "/guides"].includes(route)) return { changefreq: "monthly", priority: "0.9" };
  if (["/wifi-pocket", "/transportation", "/money"].includes(route)) return { changefreq: "monthly", priority: "0.8" };
  if (["/about"].includes(route)) return { changefreq: "yearly", priority: "0.5" };
  if (["/disclaimer", "/privacy-policy"].includes(route)) return { changefreq: "yearly", priority: "0.3" };
  return { changefreq: "monthly", priority: "0.8" }; // guide hubs + articles
}

const routes = walk(PAGES_DIR)
  .filter((f) => !/[\\/]_(app|document)\.tsx$/.test(f) && !/[\\/](404|500)\.tsx$/.test(f))
  .map(fileToRoute)
  .filter((route) => !(route in removedGuides))
  .sort((a, b) => a.localeCompare(b));

const lastmod = writeSnapshot(routes);

const urls = routes.map((route) => {
  const { changefreq, priority } = meta(route);
  const loc = route === "/" ? `${SITE}/` : `${SITE}${route}`;
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod[route]}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
});

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  `  <!-- Generated ${BUILD_DATE} by scripts/generate-sitemap.js — do not edit by hand -->`,
  ...urls,
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(OUT, xml, "utf8");
console.log(`sitemap: ${routes.length} URLs written to ${path.relative(process.cwd(), OUT)}; dates snapshot in data/page-dates.json`);
