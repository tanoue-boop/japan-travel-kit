/**
 * Japan eSIM price tracker — the one place that turns data/esim-prices.json into rows.
 *
 * Plain CommonJS on purpose: the page (via lib/esim-tracker.ts) and the prebuild CSV
 * writer (scripts/generate-esim-tracker-csv.js) both call it, so the table on
 * /guides/esim/japan-esim-price-tracker and public/data/japan-esim-prices.csv can never
 * disagree.
 *
 * Two kinds of provider feed the rows:
 *   - data.providers.*           the five read daily by scripts/fetch-esim-prices.mjs
 *                                (USD; checked date = that provider's fetchedAt).
 *                                Their non-price facts sit in data.tracker.autoFacts.
 *   - data.tracker.providers[]   read by hand on the provider's own site, re-checked on
 *                                the 1st of each month. Prices stay in the currency the
 *                                site shows; USD is converted with data.tracker.fx.
 * Nothing is filled in by guesswork: a fact the provider does not publish stays null and
 * prints as a blank cell.
 */

const round = (n, dp = 2) => Math.round(n * 10 ** dp) / 10 ** dp;

/** ISO timestamp or date -> "YYYY-MM-DD". */
const day = (iso) => (iso ? String(iso).slice(0, 10) : null);

function toUsd(price, currency, fx) {
  if (currency === "USD") return { priceUsd: round(price), fxRate: null, fxDate: null };
  const rate = fx && fx.perUsd ? fx.perUsd[currency] : undefined;
  if (!rate) throw new Error(`esim-tracker: no FX rate for ${currency}`);
  return { priceUsd: round(price / rate), fxRate: rate, fxDate: fx.date };
}

function planLabel(p) {
  const d = `${p.days} ${p.days === 1 ? "day" : "days"}`;
  if (p.unlimited) return `Unlimited / ${d}`;
  if (p.dailyCapGb) return `${p.dailyCapGb} GB/day / ${d}`;
  return `${p.gb} GB / ${d}`;
}

/** Every priced plan, one row each, in no particular order. */
function buildRows(data) {
  const tracker = data.tracker || {};
  const fx = tracker.fx || null;
  const rows = [];

  for (const [id, facts] of Object.entries(tracker.autoFacts || {})) {
    const p = data.providers[id];
    if (!p) continue;
    for (const plan of p.plans) {
      const gb = plan.unlimited ? null : plan.gb;
      rows.push({
        id: `${id}:${plan.id}`,
        providerId: id,
        provider: facts.name || p.name,
        plan: planLabel(plan),
        gb,
        dailyCapGb: plan.dailyCapGb || null,
        unlimited: !!plan.unlimited,
        days: plan.days,
        price: plan.priceUsd,
        currency: "USD",
        priceUsd: round(plan.priceUsd),
        fxRate: null,
        fxDate: null,
        perGbUsd: !plan.unlimited && gb && !plan.dailyCapGb ? round(plan.priceUsd / gb) : null,
        carriers: facts.carriers || p.network || null,
        tethering: facts.tethering ?? null,
        phoneNumber: facts.phoneNumber ?? null,
        note: plan.note || null,
        checkedOn: day(p.fetchedAt),
        sourceUrl: facts.sourceUrl || p.sourceUrl,
        officialUrl: facts.officialUrl || p.sourceUrl,
      });
    }
  }

  for (const p of tracker.providers || []) {
    p.plans.forEach((plan, i) => {
      const { priceUsd, fxRate, fxDate } = toUsd(plan.price, p.currency, fx);
      const gb = plan.unlimited ? null : plan.gb;
      rows.push({
        id: `${p.id}:${i}`,
        providerId: p.id,
        provider: p.name,
        plan: planLabel(plan),
        gb,
        dailyCapGb: plan.dailyCapGb || null,
        unlimited: !!plan.unlimited,
        days: plan.days,
        price: plan.price,
        currency: p.currency,
        priceUsd,
        fxRate,
        fxDate,
        perGbUsd: !plan.unlimited && gb && !plan.dailyCapGb ? round(priceUsd / gb) : null,
        carriers: plan.carriers ?? p.carriers ?? null,
        tethering: p.tethering ?? null,
        phoneNumber: p.phoneNumber ?? null,
        note: plan.note || null,
        checkedOn: p.checkedOn,
        sourceUrl: plan.sourceUrl || p.sourceUrl,
        officialUrl: p.officialUrl || p.sourceUrl,
      });
    });
  }
  return rows;
}

function median(nums) {
  if (!nums.length) return null;
  const s = [...nums].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return round(s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2);
}

const minBy = (list, f) => (list.length ? list.reduce((a, b) => (f(b) < f(a) ? b : a)) : null);

/** The headline numbers, all computed from the rows. */
function summarize(rows) {
  const fixed = rows.filter((r) => r.perGbUsd !== null);
  const unl7 = rows.filter((r) => r.unlimited && r.days === 7);
  const unl = rows.filter((r) => r.unlimited);
  const dates = rows.map((r) => r.checkedOn).filter(Boolean).sort();
  const perProviderBestGb = Object.values(
    fixed.reduce((acc, r) => {
      if (!acc[r.providerId] || r.perGbUsd < acc[r.providerId]) acc[r.providerId] = r.perGbUsd;
      return acc;
    }, {})
  );
  return {
    providers: new Set(rows.map((r) => r.providerId)).size,
    plans: rows.length,
    firstChecked: dates[0] || null,
    lastChecked: dates[dates.length - 1] || null,
    cheapestPerGb: minBy(fixed, (r) => r.perGbUsd),
    medianPerGb: median(fixed.map((r) => r.perGbUsd)),
    medianBestPerGbByProvider: median(perProviderBestGb),
    cheapestUnlimited7: minBy(unl7, (r) => r.priceUsd),
    /** Every 7-day unlimited plan at the lowest price — more than one when providers tie. */
    cheapestUnlimited7All: unl7.filter((r) => unl7.length && r.priceUsd === minBy(unl7, (x) => x.priceUsd).priceUsd),
    cheapestPerGbAll: fixed.filter((r) => fixed.length && r.perGbUsd === minBy(fixed, (x) => x.perGbUsd).perGbUsd),
    medianUnlimited7: median(unl7.map((r) => r.priceUsd)),
    unlimited7Count: unl7.length,
    cheapestUnlimitedPerDay: minBy(unl, (r) => r.priceUsd / r.days),
    cheapestPlan: minBy(rows, (r) => r.priceUsd),
  };
}

const CSV_COLUMNS = [
  ["provider", (r) => r.provider],
  ["plan", (r) => r.plan],
  ["data_gb", (r) => (r.unlimited ? "" : r.dailyCapGb ? "" : r.gb)],
  ["daily_cap_gb", (r) => r.dailyCapGb ?? ""],
  ["unlimited", (r) => (r.unlimited ? "yes" : "no")],
  ["days", (r) => r.days],
  ["price", (r) => r.price],
  ["currency", (r) => r.currency],
  ["price_usd", (r) => r.priceUsd],
  ["usd_per_gb", (r) => r.perGbUsd ?? ""],
  ["fx_per_usd", (r) => r.fxRate ?? ""],
  ["fx_date", (r) => r.fxDate ?? ""],
  ["carriers", (r) => r.carriers ?? ""],
  ["tethering", (r) => r.tethering ?? ""],
  ["japanese_phone_number", (r) => r.phoneNumber ?? ""],
  ["note", (r) => r.note ?? ""],
  ["checked_on", (r) => r.checkedOn ?? ""],
  ["source_url", (r) => r.sourceUrl ?? ""],
];

function csvCell(v) {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Rows sorted the way the page's "all plans" view sorts them: provider, then data, then days. */
function sortForCsv(rows) {
  return [...rows].sort(
    (a, b) =>
      a.provider.localeCompare(b.provider) ||
      Number(a.unlimited) - Number(b.unlimited) ||
      (a.gb ?? a.dailyCapGb ?? 0) - (b.gb ?? b.dailyCapGb ?? 0) ||
      a.days - b.days
  );
}

function toCsv(rows) {
  const lines = [CSV_COLUMNS.map(([h]) => h).join(",")];
  for (const r of sortForCsv(rows)) lines.push(CSV_COLUMNS.map(([, f]) => csvCell(f(r))).join(","));
  return lines.join("\n") + "\n";
}

module.exports = { buildRows, summarize, toCsv, median, planLabel };
