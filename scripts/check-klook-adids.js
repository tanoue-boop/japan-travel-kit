/**
 * Klook ad-id coverage check. Runs on every build (from `prebuild`) and never fails it.
 *
 *   node scripts/check-klook-adids.js            # source scan, before the build
 *   node scripts/check-klook-adids.js --built     # audit the generated HTML, after it
 *
 * Why. Klook reports clicks and bookings per `aff_adid`, so data/klook-adids.json
 * gives every page its own ad id and components/KlookLink.tsx stamps it on the
 * page's Klook links (see lib/klook-adids.ts). A page with no entry in that JSON
 * still works — its links fall back to the old `?aid=119070` form — but its
 * bookings land in Klook's single "Text Links (direct)" row and cannot be told
 * apart from any other page's. That is silent, which is what this script is for:
 * it lists the pages that need an ad id moving out of the JSON's `spare` list.
 *
 * The source scan finds pages that render a Klook link without reading the build
 * output: a page carries Klook links if it imports components/KlookLink, or
 * imports any component that does (KlookTourPicks, KlookStayAreas, LocaleHome
 * and the rest are found this way rather than listed here).
 *
 * `--built` is the stricter, slower check — for every `klook.com` anchor in
 * .next/server/pages it asserts the `aff_adid` is the one belonging to the page
 * the anchor is on, and counts the ones that fell back.
 *
 * A key of the form `<route>#<placement>` is a second id for one block on that page
 * (see lib/klook-adids.ts). An anchor may carry either id, each placement id must turn
 * up on its page, and no id may be listed twice.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PAGES_DIR = path.join(ROOT, "pages");
const BUILD_DIR = path.join(ROOT, ".next", "server", "pages");
const adIds = require("../data/klook-adids.json");

const BUILT = process.argv.includes("--built");

/** Every .tsx under a directory. */
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

/** pages/zh-tw/guides/.../x.tsx -> /zh-tw/guides/.../x, and index -> its directory. */
function routeOf(file) {
  const rel = path.relative(PAGES_DIR, file).replace(/\\/g, "/").replace(/\.tsx$/, "");
  const route = `/${rel.replace(/(^|\/)index$/, "")}`;
  return route.length > 1 ? route.replace(/\/$/, "") : "/";
}

const SPECIAL = new Set(["/_app", "/_document", "/404", "/500"]);

// ---------------------------------------------------------------------------
// Source scan — which pages render Klook links
// ---------------------------------------------------------------------------

const sources = [...walk(PAGES_DIR), ...walk(path.join(ROOT, "components"))];

/** file -> the local .tsx files it imports. */
const importsOf = new Map();
for (const file of sources) {
  const src = fs.readFileSync(file, "utf8");
  const specs = [...src.matchAll(/from\s+"(\.[^"]+)"/g)].map((m) => m[1]);
  const resolved = [];
  for (const spec of specs) {
    const base = path.resolve(path.dirname(file), spec);
    for (const candidate of [`${base}.tsx`, path.join(base, "index.tsx")]) {
      if (fs.existsSync(candidate)) {
        resolved.push(candidate);
        break;
      }
    }
  }
  importsOf.set(file, resolved);
}

const KLOOK_LINK = path.join(ROOT, "components", "KlookLink.tsx");
const rendersKlook = new Set([KLOOK_LINK]);
for (let pass = 0; pass < sources.length; pass++) {
  const before = rendersKlook.size;
  for (const [file, deps] of importsOf) {
    if (deps.some((d) => rendersKlook.has(d))) rendersKlook.add(file);
  }
  if (rendersKlook.size === before) break;
}

const klookRoutes = walk(PAGES_DIR)
  .filter((f) => rendersKlook.has(f))
  .map(routeOf)
  .filter((r) => !SPECIAL.has(r))
  .sort();

// `borrowed`: pages using another page's id until real ids are issued. Counted as covered,
// left out of the duplicate check on purpose, and printed so they are not forgotten.
const allPages = { ...adIds.borrowed, ...adIds.pages };
const pageKeys = Object.keys(allPages).filter((k) => !k.includes("#"));
const placementKeys = Object.keys(allPages).filter((k) => k.includes("#"));

const missing = klookRoutes.filter((r) => !(r in allPages));
const stale = [...pageKeys, ...placementKeys.map((k) => k.split("#")[0])].filter((r) => !klookRoutes.includes(r));

const allIds = [...Object.values(adIds.pages), ...adIds.spare];
const duplicates = [...new Set(allIds.filter((id, i) => allIds.indexOf(id) !== i))];

console.log(
  `Klook ad ids: ${pageKeys.length} pages (${Object.keys(adIds.borrowed).length} on a borrowed id), ${placementKeys.length} placements, ${adIds.spare.length} spare; ` +
    `${klookRoutes.length} pages carry Klook links`,
);
if (duplicates.length) console.warn(`\n! ad id(s) listed more than once: ${duplicates.join(", ")}`);
if (missing.length) {
  console.warn(
    `\n! ${missing.length} page(s) with Klook links have no ad id — their links fall back to ?aid=119070\n` +
      `  and cannot be told apart in Klook's report. Move a spare id out of data/klook-adids.json:\n` +
      missing.map((r) => `  - ${r}`).join("\n"),
  );
}
if (stale.length) {
  console.warn(
    `\n! ${stale.length} ad id(s) are assigned to a route with no Klook link (renamed or removed page?):\n` +
      stale.map((r) => `  - ${r}`).join("\n"),
  );
}
if (!missing.length && !stale.length) console.log("✓ every page with a Klook link has its own ad id");

// ---------------------------------------------------------------------------
// --built — the generated HTML must carry each page's own ad id
// ---------------------------------------------------------------------------

if (BUILT) {
  if (!fs.existsSync(BUILD_DIR)) {
    console.warn(`\n! no build output at ${path.relative(ROOT, BUILD_DIR)} — run npm run build first`);
    process.exit(0);
  }

  const htmlFiles = [];
  (function walkHtml(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walkHtml(full);
      else if (entry.name.endsWith(".html")) htmlFiles.push(full);
    }
  })(BUILD_DIR);

  let total = 0;
  let correct = 0;
  const wrong = [];
  const fallback = new Map();
  const unusedPlacements = new Set(placementKeys);

  for (const file of htmlFiles) {
    const rel = path.relative(BUILD_DIR, file).replace(/\\/g, "/").replace(/\.html$/, "");
    const route = `/${rel === "index" ? "" : rel}`.replace(/\/$/, "") || "/";
    const expected = allPages[route];
    const placementIds = new Map(
      placementKeys.filter((k) => k.startsWith(`${route}#`)).map((k) => [allPages[k], k]),
    );
    const markup = fs.readFileSync(file, "utf8");
    const hrefs = [...markup.matchAll(/<a\s[^>]*href="([^"]*klook\.com[^"]*)"/g)].map((m) =>
      m[1].replace(/&amp;/g, "&"),
    );
    for (const href of hrefs) {
      total++;
      const adId = (href.match(/[?&]aff_adid=(\d+)/) || [])[1];
      if (expected === undefined) {
        if (adId) wrong.push(`${route}: ad id ${adId} on a page with none assigned — ${href.slice(0, 90)}`);
        else fallback.set(route, (fallback.get(route) || 0) + 1);
      } else if (Number(adId) === expected) {
        correct++;
      } else if (placementIds.has(Number(adId))) {
        correct++;
        unusedPlacements.delete(placementIds.get(Number(adId)));
      } else {
        wrong.push(`${route}: expected aff_adid=${expected}, got ${adId || "none"} — ${href.slice(0, 90)}`);
      }
    }
  }

  const fallbackCount = [...fallback.values()].reduce((a, b) => a + b, 0);
  const attributable = total - fallbackCount;
  console.log(`\nBuilt HTML (${htmlFiles.length} pages)`);
  console.log(`  (a) Klook links total:            ${total}`);
  console.log(
    `  (b) carrying their page's ad id:  ${correct}/${attributable}` +
      `${attributable ? ` (${((correct / attributable) * 100).toFixed(1)}%)` : ""}`,
  );
  console.log(`  (c) ?aid= fallback (no ad id):     ${fallbackCount}`);
  for (const [route, n] of [...fallback].sort()) console.log(`      - ${route}  ${n}`);
  if (unusedPlacements.size) {
    console.warn(`\n! ${unusedPlacements.size} placement id(s) appear on no link:`);
    for (const key of unusedPlacements) console.warn(`  ${key}`);
  }
  if (wrong.length) {
    console.warn(`\n! ${wrong.length} link(s) carry the wrong ad id:`);
    for (const line of wrong.slice(0, 40)) console.warn(`  ${line}`);
  }
}

process.exit(0);
