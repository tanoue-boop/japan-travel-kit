/**
 * Pings IndexNow so Bing (and DuckDuckGo / Ecosia / Yahoo, which all use Bing's
 * index) picks up new and updated pages within minutes instead of waiting for a
 * crawl. GA4 says the Bing family is where nearly all of our human search traffic
 * comes from, so this is the cheapest indexing lever we have.
 *
 *   node scripts/indexnow-submit.mjs            # every URL in public/sitemap.xml
 *   node scripts/indexnow-submit.mjs --changed  # only URLs touched by the last commit
 *   node scripts/indexnow-submit.mjs --dry-run  # print the payload, don't POST
 *
 * public/sitemap.xml is the single source of truth for what may be submitted:
 * it already excludes redirected and noindex routes, so --changed intersects the
 * changed page files with it rather than re-deriving those rules.
 *
 * Ownership is proven by public/<key>.txt, which must stay deployed and contain
 * exactly the key below. Rotating the key means renaming that file too.
 *
 * Runs on every push to main via .github/workflows/indexnow.yml.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITEMAP = path.join(ROOT, "public", "sitemap.xml");

const HOST = "www.japan-travel-kit.com";
const SITE = `https://${HOST}`;
const KEY = "913e70b1f5e617517c045926fafbaac6";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS = 10_000; // IndexNow's documented per-request limit

const CHANGED = process.argv.includes("--changed");
const DRY_RUN = process.argv.includes("--dry-run");

/** Every <loc> in the generated sitemap. */
function sitemapUrls() {
  const xml = fs.readFileSync(SITEMAP, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

/** "pages/guides/money/atms-in-japan.tsx" -> "https://.../guides/money/atms-in-japan". */
function fileToUrl(file) {
  let rel = file.replace(/^pages\//, "").replace(/\.tsx$/, "");
  if (rel.endsWith("/index")) rel = rel.slice(0, -"/index".length);
  return rel === "index" ? `${SITE}/` : `${SITE}/${rel}`;
}

/**
 * URLs for the pages/ files changed by the last commit, limited to routes that
 * are actually in the sitemap (so deleted, redirected and noindex pages drop out).
 */
function changedUrls() {
  const diff = execFileSync("git", ["diff", "--name-only", "HEAD~1", "HEAD"], { cwd: ROOT }).toString();
  const files = diff.split("\n").filter((f) => f.startsWith("pages/") && f.endsWith(".tsx"));
  const live = new Set(sitemapUrls());
  return [...new Set(files.map(fileToUrl))].filter((url) => live.has(url));
}

const urls = (CHANGED ? changedUrls() : sitemapUrls()).slice(0, MAX_URLS);

if (urls.length === 0) {
  // A lib/-only or asset-only commit: nothing page-shaped changed, so there is
  // nothing worth asking Bing to re-crawl. Not an error.
  console.log("indexnow: no URLs to submit.");
  process.exit(0);
}

console.log(`indexnow: submitting ${urls.length} URL${urls.length === 1 ? "" : "s"}${CHANGED ? " (changed)" : ""}`);
for (const url of urls) console.log(`  ${url}`);

if (DRY_RUN) {
  console.log("indexnow: --dry-run, not posting.");
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
});
const body = (await res.text()).trim();

// 200 OK and 202 Accepted (key not yet validated) both mean the submission landed.
console.log(`indexnow: HTTP ${res.status} ${res.statusText}${body ? ` — ${body}` : ""}`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
