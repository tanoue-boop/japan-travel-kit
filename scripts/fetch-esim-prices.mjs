/**
 * Refreshes data/esim-prices.json with the latest Japan eSIM prices.
 *
 * Runs daily via .github/workflows/update-prices.yml and can be run locally:
 *   node scripts/fetch-esim-prices.mjs            # update JSON, always exit 0
 *   node scripts/fetch-esim-prices.mjs --dry-run  # print results, don't write
 *   node scripts/fetch-esim-prices.mjs --strict   # exit 1 if any provider failed (local debugging)
 *   node scripts/fetch-esim-prices.mjs --fail=airalo,sakura   # simulate fetch failures to exercise the fallback
 *
 * Design rule: never break the build. Each provider is fetched independently;
 * when a fetch or parse fails (or returns something implausible) that provider's
 * existing plans AND fetchedAt are left untouched, so the site keeps serving the
 * last known-good prices with an honest "checked on" date.
 *
 * Sources (all public, no auth):
 *   Airalo     www.airalo.com/japan-esim?currency=USD   -> Nuxt payload (__NUXT_DATA__, devalue format)
 *   Holafly    esim.holafly.com/esim-japan/             -> static HTML price table
 *   eSIM Go    breezesim.com (Breeze is eSIM Go's consumer brand) -> Shopify products JSON
 *   Sakura     www.sakuramobile.jp blog post            -> static comparison table (USD + JPY).
 *              Sakura's own plan page prices are rendered by a Checkfront booking
 *              widget behind an authenticated API, so the blog table is the only
 *              parseable official source.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "data", "esim-prices.json");
const DRY_RUN = process.argv.includes("--dry-run");
const STRICT = process.argv.includes("--strict");
const FORCE_FAIL = new Set((process.argv.find((a) => a.startsWith("--fail=")) ?? "--fail=").slice(7).split(",").filter(Boolean));
const TIMEOUT_MS = 30_000;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36 japan-travel-kit-price-bot";

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
async function get(url, { json = false } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: {
        "user-agent": UA,
        "accept-language": "en-US,en;q=0.9",
        accept: json ? "application/json" : "text/html,*/*",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return json ? res.json() : res.text();
  } finally {
    clearTimeout(t);
  }
}

const round2 = (n) => Math.round(n * 100) / 100;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function makePlan({ provider, gb, days, priceUsd, unlimited = false, note, dailyCapGb }) {
  const d = `${days} ${days === 1 ? "day" : "days"}`;
  const name = unlimited ? `Unlimited / ${d}` : `${gb} GB / ${d}`;
  const plan = {
    id: `${provider}-${slug(name)}`,
    name,
    gb: unlimited ? null : gb,
    days,
    priceUsd: round2(priceUsd),
    unlimited,
  };
  if (dailyCapGb) plan.dailyCapGb = dailyCapGb;
  if (note) plan.note = note;
  return plan;
}

function sortPlans(plans) {
  return [...plans].sort((a, b) => {
    if (a.unlimited !== b.unlimited) return a.unlimited ? 1 : -1;
    return (a.gb ?? 0) - (b.gb ?? 0) || a.days - b.days || a.priceUsd - b.priceUsd;
  });
}

/** Guard against a parser silently returning garbage after a site redesign. */
function validate(plans, providerId) {
  if (!Array.isArray(plans) || plans.length < 3) {
    throw new Error(`${providerId}: only ${plans?.length ?? 0} plans parsed (expected >= 3)`);
  }
  for (const p of plans) {
    if (!(p.days >= 1 && p.days <= 365)) throw new Error(`${providerId}: bad days ${JSON.stringify(p)}`);
    if (!(p.priceUsd >= 0.5 && p.priceUsd <= 500)) throw new Error(`${providerId}: bad price ${JSON.stringify(p)}`);
    if (!p.unlimited && !(p.gb >= 0.5 && p.gb <= 1000)) throw new Error(`${providerId}: bad gb ${JSON.stringify(p)}`);
  }
  const ids = new Set(plans.map((p) => p.id));
  if (ids.size !== plans.length) throw new Error(`${providerId}: duplicate plan ids`);
  return plans;
}

// ---------------------------------------------------------------------------
// Airalo — Nuxt 3 payload serialised with devalue: a flat array where object
// values are indexes into the same array. Package objects have price/amount/day.
// ---------------------------------------------------------------------------
async function fetchAiralo() {
  const html = await get("https://www.airalo.com/japan-esim?currency=USD");
  const m = html.match(/<script type="application\/json"[^>]*id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) throw new Error("airalo: __NUXT_DATA__ not found");
  const arr = JSON.parse(m[1]);
  const WRAPPERS = new Set(["Reactive", "Ref", "ShallowRef", "ShallowReactive", "EmptyRef"]);
  const resolve = (i, depth = 0) => {
    if (typeof i !== "number" || depth > 5) return i;
    const v = arr[i];
    if (Array.isArray(v)) {
      if (v.length && typeof v[0] === "string" && WRAPPERS.has(v[0])) return resolve(v[1], depth + 1);
      return v.map((x) => resolve(x, depth + 1));
    }
    if (v && typeof v === "object") {
      return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, resolve(x, depth + 1)]));
    }
    return v;
  };
  const seen = new Set();
  const plans = [];
  arr.forEach((v, i) => {
    if (!v || typeof v !== "object" || Array.isArray(v)) return;
    if (!("price" in v && "amount" in v && "day" in v)) return;
    const o = resolve(i);
    if (!o?.price?.currency?.code || o.price.currency.code !== "USD") return;
    if (o.type && o.type !== "sim") return;
    if (seen.has(o.id)) return;
    seen.add(o.id);
    const unlimited = !!o.is_unlimited;
    plans.push(
      makePlan({
        provider: "airalo",
        gb: unlimited ? null : Number(o.amount) / 1024,
        days: Number(o.day),
        priceUsd: Number(o.price.amount),
        unlimited,
        note: unlimited ? "Fair-use policy applies" : undefined,
      })
    );
  });
  return sortPlans(plans);
}

// ---------------------------------------------------------------------------
// Holafly — server-rendered table: <th>N days</th><td><span>$ 11.90</span><span>USD</span>
// ---------------------------------------------------------------------------
async function fetchHolafly() {
  const html = await get("https://esim.holafly.com/esim-japan/");
  const re = /(\d+)\s*days?<\/th>\s*<td[^>]*>\s*<span>\s*\$\s*([\d.,]+)\s*<\/span>\s*<span[^>]*>\s*USD/gi;
  const plans = [];
  let m;
  while ((m = re.exec(html))) {
    plans.push(
      makePlan({
        provider: "holafly",
        gb: null,
        days: Number(m[1]),
        priceUsd: Number(m[2].replace(",", "")),
        unlimited: true,
        note: "Hotspot capped at 1 GB/day",
      })
    );
  }
  return sortPlans(plans);
}

// ---------------------------------------------------------------------------
// eSIM Go (Breeze) — Shopify storefront JSON. SKU encodes data + validity:
//   esimd_1GB_7D_JP_V2, esimd_ULE_5D_JP_V2 (Unlimited Essential)
// ---------------------------------------------------------------------------
async function fetchEsimGo() {
  const meta = await get("https://breezesim.com/meta.json", { json: true });
  if (meta?.currency !== "USD") throw new Error(`esimgo: shop currency is ${meta?.currency}, expected USD`);
  // Shopify Markets localises prices by request geo (a Japan runner gets JPY);
  // ?currency=USD pins the response to the shop's base currency.
  const { product } = await get("https://breezesim.com/products/esim-japan.json?currency=USD", { json: true });
  const plans = [];
  for (const v of product?.variants ?? []) {
    const sku = String(v.sku || "");
    let m;
    if ((m = sku.match(/^esimd_(\d+)GB_(\d+)D_JP/i))) {
      plans.push(makePlan({ provider: "esimgo", gb: Number(m[1]), days: Number(m[2]), priceUsd: Number(v.price) }));
    } else if ((m = sku.match(/^esimd_ULE_(\d+)D_JP/i))) {
      plans.push(
        makePlan({
          provider: "esimgo",
          gb: null,
          days: Number(m[1]),
          priceUsd: Number(v.price),
          unlimited: true,
          note: "Unlimited Essential — speed reduced after daily high-speed allowance",
        })
      );
    }
  }
  return sortPlans(plans);
}

// ---------------------------------------------------------------------------
// Sakura Mobile — comparison table on their official blog post. After stripping
// tags each row reads: "7 days 30.36 USD (4,620 yen) 37.95 USD (5,775 yen) 27.50 USD (4,490 yen)"
// columns: Sakura 3GB/day | Sakura Unlimited | Holafly
// ---------------------------------------------------------------------------
async function fetchSakura() {
  const html = await get(
    "https://www.sakuramobile.jp/blog/japan-sim/sakura-mobile-vs-holafly-which-esim-is-best-for-your-japan-trip/"
  );
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");
  const header = text.search(/Trip Length\s+Sakura Mobile 3GB\/day\s+Sakura Mobile Unlimited/i);
  if (header < 0) throw new Error("sakura: comparison table header not found");
  const section = text.slice(header, header + 3000);
  const re = /(\d+)\s*days\s+([\d.]+)\s*USD\s*\([\d,]+\s*yen\)\s+([\d.]+)\s*USD\s*\([\d,]+\s*yen\)/gi;
  const plans = [];
  let m;
  while ((m = re.exec(section))) {
    const days = Number(m[1]);
    plans.push(
      makePlan({
        provider: "sakura",
        gb: 3 * days,
        days,
        priceUsd: Number(m[2]),
        dailyCapGb: 3,
        note: "3 GB/day high-speed, then reduced speed (Docomo)",
      })
    );
    plans.push(
      makePlan({
        provider: "sakura",
        gb: null,
        days,
        priceUsd: Number(m[3]),
        unlimited: true,
        note: "Unlimited on-device (au/KDDI); hotspot allowance by plan length",
      })
    );
  }
  return sortPlans(plans);
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------
const FETCHERS = { airalo: fetchAiralo, holafly: fetchHolafly, esimgo: fetchEsimGo, sakura: fetchSakura };

const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
const now = new Date().toISOString();
const report = [];
let anyFailed = false;

for (const [id, fetcher] of Object.entries(FETCHERS)) {
  const provider = data.providers[id];
  if (!provider) {
    report.push({ id, status: "skipped", detail: "provider missing from JSON" });
    continue;
  }
  try {
    if (FORCE_FAIL.has(id)) throw new Error("simulated failure (--fail)");
    const plans = validate(await fetcher(), id);
    const changed = JSON.stringify(plans) !== JSON.stringify(provider.plans);
    provider.plans = plans;
    provider.fetchedAt = now;
    if (changed || !provider.updatedAt) provider.updatedAt = now;
    report.push({ id, status: "ok", detail: `${plans.length} plans${changed ? " (prices changed)" : " (unchanged)"}` });
  } catch (err) {
    anyFailed = true;
    report.push({
      id,
      status: "FALLBACK",
      detail: `${err.message} — kept ${provider.plans?.length ?? 0} existing plans, fetchedAt ${provider.fetchedAt}`,
    });
  }
}

data.generatedAt = now;

console.log("eSIM price refresh");
for (const r of report) console.log(`  ${r.status.padEnd(8)} ${r.id.padEnd(8)} ${r.detail}`);

if (DRY_RUN) {
  console.log("\n--dry-run: not writing", DATA_FILE);
} else {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + "\n");
  console.log("\nWrote", path.relative(process.cwd(), DATA_FILE));
}

process.exit(STRICT && anyFailed ? 1 : 0);
