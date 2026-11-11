/**
 * Japan attraction ticket prices — the one place that turns data/attraction-prices.json
 * into rows and summary numbers.
 *
 * Plain CommonJS on purpose: lib/attraction-prices.ts (read by the price table, the
 * home page and every guide that quotes a price) and the prebuild CSV writer
 * (scripts/generate-attraction-prices-csv.js) both call it, so the table on
 * /guides/attractions/japan-attraction-ticket-prices and
 * public/data/japan-attraction-prices.csv can never disagree.
 *
 * Monthly update: re-read each `sourceUrl`, and for every record whose figures moved,
 * push the old { checked, adult, child } onto `history` before writing the new ones.
 * Records whose figures did not move only get a new `checked` date. A fact the operator
 * does not publish stays null and prints as a blank cell — nothing is filled by guesswork.
 */

const median = (nums) => {
  if (!nums.length) return null;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
};

/** The latest earlier check whose figures differ from today's, or null. */
function lastChange(rec) {
  const hist = rec.history || [];
  if (!hist.length) return null;
  const prev = hist[hist.length - 1];
  // Readings carried over from a guide are written in that guide's own words, so they
  // are compared on the yen figures; readings made for this table compare as written.
  const changed =
    prev.adultMinYen !== undefined
      ? prev.adultMinYen !== rec.adultMinYen ||
        (prev.adultMaxYen != null && rec.adultMaxYen != null && prev.adultMaxYen !== rec.adultMaxYen)
      : prev.adult !== rec.adult || (prev.child ?? null) !== (rec.child ?? null);
  return changed ? prev : null;
}

/** Every record, one row each, in file order. */
function buildRows(data) {
  return data.attractions.map((rec) => {
    const prev = (rec.history || []).length ? rec.history[rec.history.length - 1] : null;
    const change = lastChange(rec);
    return {
      id: rec.id,
      name: rec.name,
      ticket: rec.ticket,
      area: rec.area,
      group: rec.group,
      adult: rec.adult,
      adultMinYen: rec.adultMinYen ?? null,
      adultMaxYen: rec.adultMaxYen ?? null,
      child: rec.child ?? null,
      childAges: rec.childAges ?? null,
      atDoor: rec.atDoor ?? null,
      pricing: rec.pricing,
      booking: rec.booking,
      bookingNote: rec.bookingNote,
      sameDay: rec.sameDay ?? null,
      hours: rec.hours ?? null,
      revisedOn: rec.revised ? rec.revised.date : null,
      revisionNote: rec.revised ? rec.revised.note : null,
      previousAdult: prev ? prev.adult : null,
      previousChild: prev ? prev.child ?? null : null,
      previousChecked: prev ? prev.checked : null,
      changedOn: change ? rec.checked : null,
      checked: rec.checked,
      source: rec.source,
      sourceUrl: rec.sourceUrl,
      href: rec.href ?? null,
    };
  });
}

/** The numbers quoted in the page intro, the FAQ and the Dataset description. */
function summarize(rows) {
  const priced = rows.filter((r) => r.adultMinYen !== null);
  const paid = priced.filter((r) => r.adultMinYen > 0);
  const free = priced.filter((r) => r.adultMaxYen === 0);
  const minPaid = paid.length ? Math.min(...paid.map((r) => r.adultMinYen)) : null;
  const maxPaid = paid.length ? Math.max(...paid.map((r) => r.adultMaxYen ?? r.adultMinYen)) : null;
  const dates = rows.map((r) => r.checked).sort();
  return {
    count: rows.length,
    pricedCount: priced.length,
    paidCount: paid.length,
    freeCount: free.length,
    medianAdultYen: median(paid.map((r) => r.adultMinYen)),
    medianAdultYenAll: median(priced.map((r) => r.adultMinYen)),
    cheapestPaid: paid.filter((r) => r.adultMinYen === minPaid),
    dearest: paid.filter((r) => (r.adultMaxYen ?? r.adultMinYen) === maxPaid),
    minPaidYen: minPaid,
    maxPaidYen: maxPaid,
    mustBook: rows.filter((r) => r.booking === "Required"),
    noBooking: rows.filter((r) => r.booking === "Not needed"),
    variable: rows.filter((r) => r.pricing === "variable"),
    noSameDay: rows.filter((r) => r.sameDay === "No"),
    changed: rows.filter((r) => r.changedOn),
    revisedIn: (year) => rows.filter((r) => r.revisedOn && r.revisedOn.startsWith(String(year))),
    firstChecked: dates[0] || null,
    lastChecked: dates[dates.length - 1] || null,
  };
}

const CSV_COLUMNS = [
  ["id", (r) => r.id],
  ["name", (r) => r.name],
  ["ticket", (r) => r.ticket],
  ["area", (r) => r.area],
  ["category", (r) => r.group],
  ["adult_price", (r) => r.adult],
  ["adult_min_jpy", (r) => r.adultMinYen],
  ["adult_max_jpy", (r) => r.adultMaxYen],
  ["child_price", (r) => r.child],
  ["child_ages", (r) => r.childAges],
  ["price_at_door", (r) => r.atDoor],
  ["pricing", (r) => r.pricing],
  ["advance_booking", (r) => r.booking],
  ["same_day_tickets", (r) => r.sameDay],
  ["hours", (r) => r.hours],
  ["price_revised_on", (r) => r.revisedOn],
  ["price_revision", (r) => r.revisionNote],
  ["previous_adult_price", (r) => r.previousAdult],
  ["previous_checked_on", (r) => r.previousChecked],
  ["changed_since_previous_check", (r) => (r.previousChecked ? (r.changedOn ? "yes" : "no") : null)],
  ["checked_on", (r) => r.checked],
  ["source_url", (r) => r.sourceUrl],
  ["guide_url", (r) => (r.href ? `https://www.japan-travel-kit.com${r.href}` : null)],
];

const cell = (v) => {
  if (v === null || v === undefined) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function toCsv(rows) {
  const head = CSV_COLUMNS.map(([h]) => h).join(",");
  const body = rows.map((r) => CSV_COLUMNS.map(([, f]) => cell(f(r))).join(","));
  return `${[head, ...body].join("\n")}\n`;
}

module.exports = { buildRows, summarize, toCsv, median, CSV_COLUMNS };
