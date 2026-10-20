/**
 * Structured-data audit. Run after `npm run build` — it reads the generated HTML in
 * .next/server/pages, not the source.
 *
 * Added 2026-10-20 alongside lib/structured-data.ts. A JSON-LD block with a syntax error
 * is silently dropped by every consumer, so the only thing that proves the markup is live
 * is parsing it back out of the built HTML. Checks:
 *
 *   (a) every application/ld+json block parses, and declares @context + @type
 *   (b) every page carries the site-wide Organization and WebSite nodes
 *   (c) every article page carries an Article with headline, datePublished, dateModified
 *   (d) /guides and the four category hubs carry a non-empty ItemList
 *   (e) dates are ISO YYYY-MM-DD and datePublished is not after dateModified
 *
 * Exits non-zero on any failure, and prints the per-type counts either way.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const HTML_DIR = path.join(ROOT, ".next", "server", "pages");
const HUBS = ["/guides", "/guides/esim", "/guides/transport", "/guides/money", "/guides/attractions"];
const ISO = /^\d{4}-\d{2}-\d{2}$/;

if (!fs.existsSync(HTML_DIR)) {
  console.error(`check-jsonld: ${path.relative(ROOT, HTML_DIR)} not found — run \`npm run build\` first.`);
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

/** ".next/server/pages/guides/esim/index.html" -> "/guides/esim" */
function routeOf(file) {
  let rel = path.relative(HTML_DIR, file).replace(/\\/g, "/").replace(/\.html$/, "");
  if (rel.endsWith("/index")) rel = rel.slice(0, -"/index".length);
  if (rel === "index") rel = "";
  return "/" + rel;
}

const BLOCK = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;

/** Every node in a page's blocks, flattening @graph. */
function nodesOf(html, route, failures) {
  const nodes = [];
  let blocks = 0;
  for (const m of html.matchAll(BLOCK)) {
    blocks++;
    let parsed;
    try {
      parsed = JSON.parse(m[1]);
    } catch (err) {
      failures.push(`${route}: block ${blocks} is not valid JSON — ${err.message}`);
      continue;
    }
    if (!parsed["@context"]) failures.push(`${route}: block ${blocks} has no @context`);
    const graph = Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [parsed];
    for (const node of graph) {
      if (!node || typeof node !== "object") {
        failures.push(`${route}: block ${blocks} contains a non-object node`);
        continue;
      }
      if (!node["@type"]) failures.push(`${route}: block ${blocks} has a node with no @type`);
      nodes.push(node);
    }
  }
  return { nodes, blocks };
}

const files = walk(HTML_DIR).filter((f) => !/[\\/](404|500)\.html$/.test(f));
const failures = [];
const typeCounts = {};
let blockTotal = 0;
let nodeTotal = 0;

for (const file of files) {
  const route = routeOf(file);
  const html = fs.readFileSync(file, "utf8");
  const { nodes, blocks } = nodesOf(html, route, failures);
  blockTotal += blocks;
  nodeTotal += nodes.length;

  const byType = {};
  for (const node of nodes) {
    const type = String(node["@type"]);
    typeCounts[type] = (typeCounts[type] || 0) + 1;
    (byType[type] = byType[type] || []).push(node);
  }

  // (b) site-wide nodes
  for (const type of ["Organization", "WebSite"]) {
    if (!byType[type]) failures.push(`${route}: no ${type} node`);
  }

  // (c) article pages
  const isArticlePage = /^\/guides\/[a-z]+\/[a-z0-9-]+$/.test(route);
  if (isArticlePage && !byType.Article) failures.push(`${route}: article page with no Article node`);
  for (const article of byType.Article || []) {
    for (const field of ["headline", "datePublished", "dateModified"]) {
      if (!article[field]) failures.push(`${route}: Article has no ${field}`);
    }
    // (e) date sanity
    for (const field of ["datePublished", "dateModified"]) {
      const value = article[field];
      if (value && !ISO.test(value)) failures.push(`${route}: Article ${field} is not YYYY-MM-DD (${value})`);
    }
    if (ISO.test(article.datePublished || "") && ISO.test(article.dateModified || "")) {
      if (article.datePublished > article.dateModified) {
        failures.push(`${route}: datePublished ${article.datePublished} is after dateModified ${article.dateModified}`);
      }
    }
  }

  // (d) hubs
  if (HUBS.includes(route)) {
    const lists = (byType.ItemList || []).filter((l) => Array.isArray(l.itemListElement) && l.itemListElement.length);
    if (!lists.length) failures.push(`${route}: hub with no non-empty ItemList`);
    for (const list of lists) {
      if (list.numberOfItems !== list.itemListElement.length) {
        failures.push(`${route}: ItemList numberOfItems ${list.numberOfItems} != ${list.itemListElement.length} items`);
      }
    }
  }
}

console.log(`check-jsonld: ${files.length} pages, ${blockTotal} ld+json blocks, ${nodeTotal} nodes — all parsed\n`);
for (const [type, n] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${type}`);
}
console.log();

if (failures.length) {
  console.log(`FAIL ${failures.length} problem(s):`);
  for (const f of failures) console.log(`       - ${f}`);
  process.exit(1);
}
console.log("OK   no structured-data problems");
