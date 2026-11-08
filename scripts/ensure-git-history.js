/**
 * Runs first in `prebuild`. Vercel checks the repo out as a shallow clone, and on a
 * shallow clone lib/page-dates.js cannot read per-page commit dates from git, so it
 * falls back to the committed data/page-dates.json snapshot — which the daily tasks do
 * not commit, so production dateModified / "Updated" badges / sitemap lastmod went stale
 * (found 2026-11-08, task-jtk-20261108-05).
 *
 * Fix: if the clone is shallow, fetch the full history so page-dates reads git directly.
 * Tries the configured remote first, then the public GitHub URL (Vercel does not always
 * set a remote). Any failure is non-fatal: the build continues on the snapshot.
 */
const { execSync } = require("child_process");

const ROOT = process.cwd();

function git(args, timeout = 120000) {
  return execSync(`git ${args}`, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"], timeout })
    .toString()
    .trim();
}

function isShallow() {
  try {
    return git("rev-parse --is-shallow-repository") === "true";
  } catch {
    return null; // no git
  }
}

const shallow = isShallow();
if (shallow === null) {
  console.log("ensure-git-history: no git repository; page dates use data/page-dates.json.");
  process.exit(0);
}
if (!shallow) {
  console.log("ensure-git-history: full history present.");
  process.exit(0);
}

const owner = process.env.VERCEL_GIT_REPO_OWNER || "tanoue-boop";
const slug = process.env.VERCEL_GIT_REPO_SLUG || "japan-travel-kit";
const attempts = [
  "fetch --unshallow --quiet --no-tags",
  `fetch --unshallow --quiet --no-tags https://github.com/${owner}/${slug}.git`,
];

for (const args of attempts) {
  try {
    git(args);
    if (isShallow() === false) {
      console.log(`ensure-git-history: unshallowed with "git ${args}".`);
      process.exit(0);
    }
  } catch (err) {
    const msg = (err.stderr ? err.stderr.toString() : err.message).split("\n")[0];
    console.log(`ensure-git-history: "git ${args}" failed: ${msg}`);
  }
}
console.log("ensure-git-history: still shallow; page dates fall back to data/page-dates.json.");
