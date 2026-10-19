/**
 * Guard for the 2026-10-19 restyle (task jtk-20261019-12). Fails if any of the things the
 * new design system bans has crept back into the repo.
 *
 *   node scripts/check-restyle.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["styles", "pages", "components", "lib", "scripts", "public"];
const EXTS = new Set([".css", ".tsx", ".ts", ".js", ".mjs", ".json", ".svg"]);
const SKIP = /node_modules|[\\/]\.next[\\/]|package-lock|tsconfig\.tsbuildinfo/;

/** The retired template palette: the reds, pinks and navies, plus their tints. */
const OLD_ACCENTS = [
  "c62828", "b71c1c", "b91c1c", "e65100", "ef4444", "dc2626", "f87171", "fca5a5",
  "fecaca", "fee2e2", "fff5f5", "be185d", "9d174d", "7f1d1d",
  "0d1b4b", "080e2d", "1a237e", "1e40af", "1a56db", "1d4ed8", "1565c0", "2563eb",
];

const CHECKS = [
  { name: "gradients",            re: /linear-gradient|radial-gradient/gi },
  // A shadow over 8px is a glow or a lift; neither exists in this system.
  { name: "box-shadow over 8px",  re: /box-shadow:[^;]*?\b(?:[1-9]\d|9)\d*px/gi },
  { name: "blur filters",         re: /filter:\s*blur\(/gi },
  { name: "corner radius over 4px", re: /border-?[Rr]adius:\s*"?(?:(?:[5-9]|\d{2,})px|\d+rem|50%|9{3,4}px)/g },
  { name: "old accent colours",   re: new RegExp(`#(?:${OLD_ACCENTS.join("|")})\\b`, "gi") },
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (SKIP.test(p)) continue;
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXTS.has(extname(p))) out.push(p);
  }
  return out;
}

const files = ROOTS.flatMap((r) => walk(r));
let failed = false;

for (const { name, re } of CHECKS) {
  const hits = [];
  for (const f of files) {
    if (f.endsWith("check-restyle.mjs")) continue;
    for (const line of readFileSync(f, "utf8").split("\n")) {
      re.lastIndex = 0;
      if (re.test(line)) hits.push(`${f}: ${line.trim().slice(0, 110)}`);
    }
  }
  console.log(`${name}: ${hits.length}`);
  for (const h of hits.slice(0, 10)) console.log("   ", h);
  if (hits.length) failed = true;
}

console.log(`\nscanned ${files.length} files`);
process.exit(failed ? 1 : 0);
