/**
 * Writes public/data/japan-esim-prices.csv from data/esim-prices.json (runs in `prebuild`).
 *
 * The CSV is the download behind /guides/esim/japan-esim-price-tracker and the
 * `distribution` of its schema.org Dataset. It is built by the same
 * lib/esim-tracker-core.js the page uses, so the file and the table always hold the
 * same rows. Because the daily price workflow rewrites the JSON and every deploy runs
 * prebuild, the published CSV follows the JSON without anyone editing it by hand.
 */
const fs = require("fs");
const path = require("path");
const { buildRows, toCsv } = require("../lib/esim-tracker-core");

const ROOT = path.join(__dirname, "..");
const data = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "esim-prices.json"), "utf8"));
const rows = buildRows(data);
const out = path.join(ROOT, "public", "data", "japan-esim-prices.csv");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, toCsv(rows));
console.log(`esim tracker csv: ${rows.length} plans -> ${path.relative(ROOT, out)}`);
