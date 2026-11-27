/**
 * Rules shared by every JR-WEST RAIL PASS, for the one-pass pages added by task
 * jtk-20261127-A35 (jr-west-all-area-pass, sanyo-sanin-area-pass,
 * kansai-hokuriku-area-pass, kansai-wide-area-pass, kansai-sanin-area-pass,
 * hokuriku-area-pass).
 *
 * Read by node fetch on 27 November 2026 from each pass's page under
 * westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/<pass>/ — the
 * eligibility, purchase, seat-reservation, validity and refund blocks are worded
 * the same on all six. JR West's footer on those pages says the displayed
 * information is "current as of August 1, 2024, and subject to change"; the prices
 * are the ones the page shows on the date read, and each page prints that date.
 */
export const JRWEST_CHECKED_ISO = "2026-11-27";

export const JRWEST_PASS_BASE = "https://www.westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/";

/** How to buy — one row per route, same on every JR-WEST RAIL PASS page. */
export const jrWestBuyRows: string[][] = [
  [
    "Klook or another travel agency outside Japan",
    "An exchange order (MCO or E-TICKET)",
    "Exchange it within 3 months of issue, in Japan, at a JR West exchange location with your passport",
  ],
  [
    "JR-WEST ONLINE TRAIN RESERVATION",
    "A reservation on JR West's own site, paid by credit card",
    "Opens one month before the first day, from 10:00 JST. Collect at a ticket machine (IC-chip passport) or a ticket office",
  ],
  [
    "A travel agency in Japan",
    "The pass",
    "Sold up to one month before the first day of use",
  ],
];

/** Rules that catch people out — same wording on every JR-WEST RAIL PASS page. */
export const jrWestRuleRows: string[][] = [
  ["Who can use it", "A foreign passport holder entering Japan as a Temporary Visitor (短期滞在). Japanese nationals cannot, including those with permanent residence abroad"],
  ["Days", "Consecutive days, from 0:00 on the first day to 24:00 on the last (JST)"],
  ["Seat reservations", "Free, at a ticket machine or ticket office before boarding; from the 7th reservation, only at a JR ticket office"],
  ["Small children", "Up to two children aged 1–5 travel free with each pass holder if they do not take a reserved seat"],
  ["Refund", "Before first use only: the price minus 10% (minimum ¥220). None after the pass starts"],
  ["Changes", "Start date, length and pass type cannot be changed once the exchange order is exchanged"],
];
