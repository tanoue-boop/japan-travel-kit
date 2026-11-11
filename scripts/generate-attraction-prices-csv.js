/**
 * Writes public/data/japan-attraction-prices.csv from data/attraction-prices.json
 * (runs in `prebuild`).
 *
 * The CSV is the download behind /guides/attractions/japan-attraction-ticket-prices and
 * the `distribution` of its schema.org Dataset. It is built by the same
 * lib/attraction-prices-core.js the page uses, so the file and the table always hold
 * the same rows; the monthly re-check edits the JSON only.
 */
const fs = require("fs");
const path = require("path");
const { buildRows, toCsv } = require("../lib/attraction-prices-core");

const ROOT = path.join(__dirname, "..");
const data = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "attraction-prices.json"), "utf8"));
const rows = buildRows(data);
const out = path.join(ROOT, "public", "data", "japan-attraction-prices.csv");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, toCsv(rows));
console.log(`attraction prices csv: ${rows.length} attractions -> ${path.relative(ROOT, out)}`);
