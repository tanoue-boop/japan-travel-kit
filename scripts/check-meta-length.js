/**
 * Title and meta-description length audit. Runs at the end of every build and never
 * fails it.
 *
 *   npm run build                       # runs this as the last step
 *   node scripts/check-meta-length.js   # re-run against the existing build output
 *
 * Why. Bing Webmaster Tools' URL inspection reports "Title too long" and "Meta
 * Description too long or too short" against indexed pages, and Google simply cuts
 * the tag off mid-word in the result — on 27 Oct 2026, 84 of the site's 152 URLs had
 * a title over 70 characters (median 76) and 95 had a description outside 50–160
 * (median 177). A truncated title loses the part of the sentence that would have
 * earned the click, so the fix is a budget per language, enforced here so the next
 * page written cannot quietly exceed it.
 *
 * It reads the generated HTML in .next/server/pages rather than the sources: the
 * displayed <title> is the page's own string plus whatever suffix the shared head
 * helper adds (see components/IntlSeo.tsx), and only the build output knows what
 * the reader will actually be shown.
 *
 * Budgets, per locale (lib/i18n.ts decides which from the route):
 *
 *   en                      title <= 60   description 120–155
 *   zh-tw, zh-cn, ko, th    title <= 35   description  60–80
 *
 * The CJK and Thai budgets are roughly half the English ones because Google's
 * truncation is by rendered width, not by character: a Chinese glyph is about twice
 * as wide as a Latin letter, and a Korean syllable block the same. That is also why
 * the translated pages drop the " | Japan Travel Kit" suffix — nineteen characters
 * of it would be more than half a 35-character budget.
 *
 * Counting. Characters are counted as code points with combining marks (Unicode Mn)
 * removed, so a Thai word carrying vowel and tone marks above and below the line
 * counts the glyphs a reader sees rather than the code points the string holds.
 * Korean is precomposed, so it is unaffected either way.
 *
 * Warn-only, on purpose. This is a search-presentation budget, not a correctness
 * invariant: a page that is two characters long should still deploy, with the
 * overage listed where whoever wrote it will see it. Same contract as
 * scripts/check-klook-adids.js — it prints and exits 0.
 */
require("./require-ts");

const fs = require("fs");
const path = require("path");
const { localeOf } = require("../lib/i18n.ts");

const ROOT = path.join(__dirname, "..");
const BUILD_DIR = path.join(ROOT, ".next", "server", "pages");

/** Per-locale budgets. English is the Google/Bing guidance; see the note above for CJK. */
const BUDGETS = {
  en: { title: 60, descMin: 120, descMax: 155 },
  "zh-tw": { title: 35, descMin: 60, descMax: 80 },
  "zh-cn": { title: 35, descMin: 60, descMax: 80 },
  ko: { title: 35, descMin: 60, descMax: 80 },
  th: { title: 35, descMin: 60, descMax: 80 },
};

/** Pages with no search presentation to budget. */
const SKIP = new Set(["/404", "/500"]);

if (!fs.existsSync(BUILD_DIR)) {
  console.warn(
    `! check-meta-length: no build output at ${path.relative(ROOT, BUILD_DIR)} — run npm run build first`,
  );
  process.exit(0);
}

/** Every .html under a directory. */
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

/** ".next/server/pages/guides/esim/index.html" -> "/guides/esim" */
function routeOf(file) {
  let rel = path.relative(BUILD_DIR, file).replace(/\\/g, "/").replace(/\.html$/, "");
  if (rel.endsWith("/index")) rel = rel.slice(0, -"/index".length);
  if (rel === "index") rel = "";
  return `/${rel}`;
}

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  "#x27": "'",
  "#39": "'",
  "#x2F": "/",
};

/** React escapes the head tags; count what a reader sees, not the entities. */
function decode(s) {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-z]+);/g, (whole, name) => {
    if (ENTITIES[name] !== undefined) return ENTITIES[name];
    const hex = name.match(/^#x([0-9a-fA-F]+)$/);
    if (hex) return String.fromCodePoint(parseInt(hex[1], 16));
    const dec = name.match(/^#(\d+)$/);
    if (dec) return String.fromCodePoint(Number(dec[1]));
    return whole;
  });
}

/** Visible glyphs: code points, minus zero-width combining marks (Thai vowels/tones). */
function len(s) {
  return [...s.replace(/\p{Mn}/gu, "")].length;
}

const files = walk(BUILD_DIR).filter((f) => !SKIP.has(routeOf(f)));
const rows = [];
const warnings = [];

for (const file of files.sort()) {
  const route = routeOf(file);
  const markup = fs.readFileSync(file, "utf8");
  const locale = localeOf(route);
  const budget = BUDGETS[locale];

  // React splits an interpolated title into text nodes separated by `<!-- -->`
  // ("{TITLE} | Japan Travel Kit" is two of them), so the comments come out before
  // the string is measured — a reader never sees them and nor does a crawler.
  const title = decode(
    ((markup.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || "").replace(/<!--[\s\S]*?-->/g, ""),
  );
  const descMatch =
    markup.match(/<meta\s+name="description"\s+content="([^"]*)"/) ||
    markup.match(/<meta\s+content="([^"]*)"\s+name="description"/);
  const desc = decode(descMatch ? descMatch[1] : "");

  const titleLen = len(title);
  const descLen = len(desc);
  rows.push({ route, locale, titleLen, descLen });

  if (!title) warnings.push(`${route}: no <title>`);
  else if (titleLen > budget.title) {
    warnings.push(`${route}: title ${titleLen} > ${budget.title} (${locale}) — "${title}"`);
  }

  if (!desc) warnings.push(`${route}: no meta description`);
  else if (descLen < budget.descMin || descLen > budget.descMax) {
    warnings.push(
      `${route}: description ${descLen} outside ${budget.descMin}–${budget.descMax} (${locale}) — "${desc}"`,
    );
  }
}

/** Longest title and the description extremes, per locale group, for the summary. */
function extremes(group) {
  const subset = rows.filter((r) => group.includes(r.locale));
  if (!subset.length) return null;
  const titles = [...subset].sort((a, b) => b.titleLen - a.titleLen);
  const descs = [...subset].sort((a, b) => a.descLen - b.descLen);
  return {
    n: subset.length,
    title: titles[0],
    descMin: descs[0],
    descMax: descs[descs.length - 1],
  };
}

console.log(`\ncheck-meta-length: ${rows.length} built pages`);
for (const [label, group] of [
  ["en   (title <= 60, desc 120-155)", ["en"]],
  ["intl (title <= 35, desc 60-80) ", ["zh-tw", "zh-cn", "ko", "th"]],
]) {
  const e = extremes(group);
  if (!e) continue;
  console.log(
    `  ${label}  ${String(e.n).padStart(3)} pages` +
      `  longest title ${e.title.titleLen} (${e.title.route})` +
      `  desc ${e.descMin.descLen}–${e.descMax.descLen}`,
  );
}

if (warnings.length) {
  console.warn(`\n! ${warnings.length} page(s) outside the budget:`);
  for (const line of warnings) console.warn(`  - ${line}`);
  console.warn("");
} else {
  console.log("  ✓ every title and description is within its budget\n");
}

process.exit(0);
