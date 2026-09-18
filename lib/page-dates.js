/**
 * Last-modified dates for pages, shared by scripts/generate-sitemap.js (sitemap
 * <lastmod>) and getStaticProps in pages ("Updated <Month YYYY>" badges and
 * JSON-LD dateModified), so every surface reports the same date.
 *
 * Source of truth is git: the date of the last commit that touched the page file.
 *
 * - Full clone (local builds): read from `git log`.
 * - Shallow clone (Vercel builds): `git log` would clamp every older file to the
 *   clone boundary, so fall back to data/page-dates.json — a snapshot written by
 *   the prebuild step from a full clone and committed alongside the pages.
 * - No git and no snapshot entry: the build date.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// process.cwd(), not __dirname: inside the Next.js server bundle __dirname is not the source tree.
const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "pages");
const SNAPSHOT = path.join(ROOT, "data", "page-dates.json");
const BUILD_DATE = new Date().toISOString().slice(0, 10);

function git(args) {
  return execSync(`git ${args}`, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
}

let fullHistory;
/** True when git is available and the clone has complete history. */
function hasFullHistory() {
  if (fullHistory === undefined) {
    try {
      fullHistory = git("rev-parse --is-shallow-repository") === "false";
    } catch {
      fullHistory = false;
    }
  }
  return fullHistory;
}

let snapshot;
function readSnapshot() {
  if (snapshot === undefined) {
    try {
      snapshot = JSON.parse(fs.readFileSync(SNAPSHOT, "utf8"));
    } catch {
      snapshot = {};
    }
  }
  return snapshot;
}

/** "/guides/money/atms-in-japan" -> "pages/guides/money/atms-in-japan.tsx" (or .../index.tsx). */
function routeToFile(route) {
  const rel = route === "/" ? "index" : route.replace(/^\//, "");
  for (const candidate of [`${rel}.tsx`, `${rel}/index.tsx`]) {
    const full = path.join(PAGES_DIR, candidate);
    if (fs.existsSync(full)) return full;
  }
  throw new Error(`page-dates: no page file for route ${route}`);
}

/** "pages/guides/money/atms-in-japan.tsx" -> "/guides/money/atms-in-japan". */
function fileToRoute(file) {
  let rel = path.relative(PAGES_DIR, file).replace(/\\/g, "/").replace(/\.tsx$/, "");
  if (rel.endsWith("/index")) rel = rel.slice(0, -"/index".length);
  if (rel === "index") rel = "";
  return "/" + rel;
}

/** Last-modified date for a route as "YYYY-MM-DD". */
function lastModified(route) {
  if (hasFullHistory()) {
    const iso = git(`log -1 --format=%cI -- "${routeToFile(route)}"`);
    if (iso) return iso.slice(0, 10);
  }
  return readSnapshot()[route] || BUILD_DATE;
}

/** "2026-06-08" -> "June 2026" */
function formatMonthYear(iso) {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

/**
 * Props for a page's "Updated" badge and JSON-LD dateModified.
 * @param {string} route
 * @returns {{ iso: string, label: string }}
 */
function pageUpdated(route) {
  const iso = lastModified(route);
  return { iso, label: formatMonthYear(iso) };
}

/**
 * "Updated <Month YYYY>" labels for a list of article routes, keyed by route —
 * for guide-hub listing cards.
 * @param {string[]} routes
 * @returns {Record<string, string>}
 */
function articleDates(routes) {
  return Object.fromEntries(routes.map((route) => [route, pageUpdated(route).label]));
}

/** Writes data/page-dates.json for the given routes (called by the prebuild step). */
function writeSnapshot(routes) {
  const out = {};
  for (const route of [...routes].sort()) out[route] = lastModified(route);
  fs.writeFileSync(SNAPSHOT, JSON.stringify(out, null, 2) + "\n", "utf8");
  return out;
}

module.exports = {
  BUILD_DATE,
  PAGES_DIR,
  hasFullHistory,
  routeToFile,
  fileToRoute,
  lastModified,
  formatMonthYear,
  pageUpdated,
  articleDates,
  writeSnapshot,
};
