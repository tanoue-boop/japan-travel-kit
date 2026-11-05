/**
 * Post-build revenue-link audit: every published page must carry at least one link
 * that pays.
 *
 *   npm run build && npm run check:revenue
 *   node scripts/check-revenue-links.mjs --write    # also rewrites docs/revenue-link-audit.md
 *
 * Reads every .html under .next/server/pages and counts the <a href> anchors that
 * earn a commission. A plain www.klook.com link, a GetYourGuide link with no partner
 * id or a Wise link with no tracking does not count: the reader gets there, the site
 * gets nothing, and that is the failure this script exists to catch.
 *
 * Only real anchors are counted. The same URLs also appear in JSON-LD and in
 * __NEXT_DATA__, and neither of those can be clicked.
 *
 * Exits 1 if any page has 0 revenue links. /404 and /500 are skipped: they are error
 * pages rather than published content, and they are not in the sitemap.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUILD_DIR = path.join(ROOT, ".next", "server", "pages");
const REPORT = path.join(ROOT, "docs", "revenue-link-audit.md");
const SKIP = new Set(["/404", "/500"]);

/** Label -> does this href pay. Order is the order shown in the report. */
const PARTNERS = [
  ["Klook", (u) => /^https:\/\/affiliate\.klook\.com\/redirect\?/.test(u) && /[?&]aff_adid=\d+/.test(u)],
  ["GetYourGuide", (u) => /getyourguide\.com/.test(u) && /[?&]partner_id=EFTLTCP(&|$)/.test(u)],
  ["Airalo", (u) => /^https:\/\/airalo\.pxf\.io\//.test(u)],
  ["Breeze", (u) => /breezesim\.com/.test(u) && /[?&]sca_ref=/.test(u)],
  ["Sakura Mobile", (u) => /^https:\/\/p\.sakuramobile\.jp\/idevaffiliate\.php/.test(u)],
  ["Wise", (u) => /^https:\/\/wise\.prf\.hn\//.test(u)],
  ["SafetyWing", (u) => /safetywing\.com\/nomad-insurance\?/.test(u) && /[?&]referenceID=26614156(&|$)/.test(u)],
  ["Simbye", (u) => /simbye/i.test(u) && /[?&]ref=eqvmffxd(&|$)/.test(u)],
];

function htmlFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) htmlFiles(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function routeOf(file) {
  const rel = path.relative(BUILD_DIR, file).replace(/\\/g, "/").replace(/\.html$/, "");
  return rel === "index" ? "/" : `/${rel}`;
}

function audit(file) {
  const markup = fs.readFileSync(file, "utf8");
  const counts = new Map();
  for (const [, raw] of markup.matchAll(/<a\s[^>]*?href="([^"]*)"/g)) {
    const href = raw.replace(/&amp;/g, "&");
    const hit = PARTNERS.find(([, pays]) => pays(href));
    if (hit) counts.set(hit[0], (counts.get(hit[0]) || 0) + 1);
  }
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  return { route: routeOf(file), total, counts };
}

const breakdown = (counts) =>
  PARTNERS.filter(([name]) => counts.has(name))
    .map(([name]) => `${name} ×${counts.get(name)}`)
    .join(", ") || "—";

function writeReport(rows) {
  const zero = rows.filter((r) => r.total === 0);
  const one = rows.filter((r) => r.total === 1);
  const rest = rows.filter((r) => r.total > 1);
  const table = (list) =>
    list.length
      ? [
          "| ページURL | 報酬リンク本数 | リンク先 |",
          "| --- | --- | --- |",
          ...list.map((r) => `| ${r.route} | ${r.total} | ${breakdown(r.counts)} |`),
        ].join("\n")
      : "（該当なし）";
  const body = [
    "# 報酬リンク監査",
    "",
    "`npm run build` 後に `node scripts/check-revenue-links.mjs --write` で生成。手で編集しない。",
    "",
    "数えるのは .next/server/pages の HTML の `<a href>` のみ（JSON-LD と __NEXT_DATA__ は数えない）。",
    "対象：affiliate.klook.com の aff_adid 付き redirect、getyourguide.com（partner_id=EFTLTCP）、airalo.pxf.io、",
    "breezesim.com の sca_ref、p.sakuramobile.jp/idevaffiliate.php、wise.prf.hn、",
    "safetywing.com/nomad-insurance（referenceID=26614156）、Simbye（ref=eqvmffxd）。",
    "/404 と /500 はエラーページのため対象外。",
    "",
    `全 ${rows.length} ページ：0本 ${zero.length}／1本 ${one.length}／2本以上 ${rest.length}`,
    "",
    `## 0本のページ（${zero.length}）`,
    "",
    table(zero),
    "",
    `## 1本だけのページ（${one.length}）`,
    "",
    table(one),
    "",
    `## 2本以上のページ（${rest.length}）`,
    "",
    table(rest),
    "",
  ].join("\n");
  fs.mkdirSync(path.dirname(REPORT), { recursive: true });
  fs.writeFileSync(REPORT, body);
  console.log(`wrote ${path.relative(ROOT, REPORT)}`);
}

if (!fs.existsSync(BUILD_DIR)) {
  console.error("check-revenue-links: no build output — run npm run build first");
  process.exit(1);
}

const rows = htmlFiles(BUILD_DIR)
  .map(audit)
  .filter((r) => !SKIP.has(r.route))
  .sort((a, b) => a.total - b.total || a.route.localeCompare(b.route));

if (process.argv.includes("--write")) writeReport(rows);

const zero = rows.filter((r) => r.total === 0);
const one = rows.filter((r) => r.total === 1);
console.log(`Revenue links: ${rows.length} pages, ${zero.length} with none, ${one.length} with one`);
for (const r of one) console.log(`  1 link  ${r.route} (${breakdown(r.counts)})`);
if (zero.length) {
  console.error(`\n✗ ${zero.length} page(s) carry no revenue link:`);
  for (const r of zero) console.error(`  - ${r.route}`);
  process.exit(1);
}
console.log("✓ every page carries at least one revenue link");
