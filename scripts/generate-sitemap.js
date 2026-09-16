/**
 * Generates public/sitemap.xml at build time (runs via `prebuild`).
 *
 * - Walks pages/ for every routable .tsx page (skips _app, _document, api/, 404/500).
 * - lastmod = date of the last git commit that touched the page file
 *   (falls back to the build date if git history is unavailable, e.g. shallow clones).
 * - Any URL that has been 301-redirected in lib/redirects.js is excluded.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { removedGuides } = require("../lib/redirects");

const SITE = "https://www.japan-travel-kit.com";
const PAGES_DIR = path.join(__dirname, "..", "pages");
const OUT = path.join(__dirname, "..", "public", "sitemap.xml");
const BUILD_DATE = new Date().toISOString().slice(0, 10);

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

function toRoute(file) {
  let rel = path.relative(PAGES_DIR, file).replace(/\\/g, "/").replace(/\.tsx$/, "");
  if (rel.endsWith("/index")) rel = rel.slice(0, -"/index".length);
  if (rel === "index") rel = "";
  return "/" + rel;
}

function gitLastMod(file) {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${file}"`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    return iso ? iso.slice(0, 10) : BUILD_DATE;
  } catch {
    return BUILD_DATE;
  }
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
  .map((f) => ({ file: f, route: toRoute(f) }))
  .filter(({ route }) => !(route in removedGuides))
  .sort((a, b) => a.route.localeCompare(b.route));

const urls = routes.map(({ file, route }) => {
  const { changefreq, priority } = meta(route);
  const loc = route === "/" ? `${SITE}/` : `${SITE}${route}`;
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${gitLastMod(file)}</lastmod>`,
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
console.log(`sitemap: ${routes.length} URLs written to ${path.relative(process.cwd(), OUT)}`);
