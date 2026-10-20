/**
 * Publication and last-modified dates for pages, shared by scripts/generate-sitemap.js
 * (sitemap <lastmod>) and getStaticProps in pages ("Updated <Month YYYY>" badges and
 * JSON-LD datePublished / dateModified), so every surface reports the same dates.
 *
 * Source of truth is git: the first and the last commit that touched the page file.
 *
 * - Full clone (local builds): read from `git log`.
 * - Shallow clone (Vercel builds): `git log` would clamp every older file to the
 *   clone boundary, so fall back to data/page-dates.json and data/page-published.json —
 *   snapshots written by the prebuild step from a full clone and committed alongside
 *   the pages.
 * - No git and no snapshot entry: the build date (lastmod) or the lastmod (published).
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// process.cwd(), not __dirname: inside the Next.js server bundle __dirname is not the source tree.
const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "pages");
const SNAPSHOT = path.join(ROOT, "data", "page-dates.json");
const PUBLISHED_SNAPSHOT = path.join(ROOT, "data", "page-published.json");
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

const snapshots = {};
function readSnapshot(file) {
  if (snapshots[file] === undefined) {
    try {
      snapshots[file] = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch {
      snapshots[file] = {};
    }
  }
  return snapshots[file];
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
  return readSnapshot(SNAPSHOT)[route] || BUILD_DATE;
}

const publishedCache = {};
/**
 * Publication date for a route as "YYYY-MM-DD" — the commit that first added the page
 * file. Added 2026-10-20 for JSON-LD `datePublished`, which AI answer engines use
 * alongside dateModified to judge how current a page is.
 *
 * `--diff-filter=A` can return more than one commit: several guides on this site were
 * deleted and later restored, so the file has been added twice. The oldest entry (the
 * last line git prints) is the real publication date.
 */
function firstPublished(route) {
  if (publishedCache[route]) return publishedCache[route];
  let iso;
  if (hasFullHistory()) {
    const log = git(`log --diff-filter=A --format=%cI -- "${routeToFile(route)}"`);
    const added = log.split("\n").filter(Boolean);
    if (added.length) iso = added[added.length - 1].slice(0, 10);
  }
  // A page not yet committed has no add commit at all; fall back to the snapshot, then
  // to its last-modified date, which for an uncommitted file is the build date.
  publishedCache[route] = iso || readSnapshot(PUBLISHED_SNAPSHOT)[route] || lastModified(route);
  return publishedCache[route];
}

/** "2026-06-08" -> "June 2026" */
function formatMonthYear(iso) {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

/**
 * Props for a page's "Updated" badge and its JSON-LD dates.
 * @param {string} route
 * @returns {{ iso: string, label: string, published: string }}
 */
function pageUpdated(route) {
  const iso = lastModified(route);
  return { iso, label: formatMonthYear(iso), published: firstPublished(route) };
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

/** Writes data/page-published.json for the given routes (called by the prebuild step). */
function writePublishedSnapshot(routes) {
  const out = {};
  for (const route of [...routes].sort()) out[route] = firstPublished(route);
  fs.writeFileSync(PUBLISHED_SNAPSHOT, JSON.stringify(out, null, 2) + "\n", "utf8");
  return out;
}

module.exports = {
  BUILD_DATE,
  PAGES_DIR,
  hasFullHistory,
  routeToFile,
  fileToRoute,
  lastModified,
  firstPublished,
  formatMonthYear,
  pageUpdated,
  articleDates,
  writeSnapshot,
  writePublishedSnapshot,
};
