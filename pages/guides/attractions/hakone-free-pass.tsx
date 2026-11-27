import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { hreflangLinks } from "../../../components/Hreflang";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  hakoneCruiseCableCarTour,
  hakoneFreepass,
  hakoneFreepassTripPrep,
  hakoneLoopBusTour,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import HotelStayBlock from "../../../components/HotelStayBlock";

// CTA links — the two Klook listings this page uses. Both are existing constants in
// lib/klook-links.ts rather than new ones: listing 821 (the pass, Klook's 5%
// passes-and-transport band, and the listing Klook itself titles "Hakone Free Pass")
// and listing 87293 (the guided loop, 6.5%). Re-confirmed live through the
// www.klook.com search index on 25 Oct 2026.
const HAKONE_PASS_URL = hakoneFreepass.url;
const HAKONE_TOUR_URL = hakoneLoopBusTour.url;

// Every figure on this page was re-read on 13 November 2026 (task-jtk-20261113-R06):
//   - pass prices for Shinjuku, Machida, Fujisawa and Odawara, the 8 covered modes, the
//     one Odakyu Line return, Izu-Hakone Bus not covered, where to buy, the one-month
//     advance sale and the same-day-only machines: hakonenavi.jp free_pass page
//   - the Romancecar seat (+¥1,200 / +¥600 from Shinjuku, +¥200 / +¥100 from Odawara),
//     about 80 minutes, EMot ¥50 cheaper, ¥910 Odawara–Shinjuku regular fare, Odakyu's
//     ¥9,500 worked example, "worth it even for a day trip", For Group up to 4 phones,
//     machine payment methods, the calendar-day validity rule: odakyu.jp/english/passes/hakone/
//   - ropeway ¥2,000 / ¥700 one way and cruise ¥1,700 / ¥850 one way, in force since
//     1 Oct 2025: Odakyu Hakone's fare notice PDF on hakonenavi.jp, and the
//     hakonetrip.odakyu-global.com spot pages (cruise premium cabin +¥800 / +¥400)
// The Tozan Train, cable car and bus fares had no official English fare table to quote,
// so they are not priced one by one.
//
// Re-checked on 20 November 2026 (task-jtk-20261120-R06). odakyu.jp, hakonenavi.jp and
// odakyu-global.com all returned 504 to a direct read that day, so these were confirmed
// through the search index of those official domains instead:
//   - the 2-day / 3-day prices from Shinjuku and Odawara, Romancecar +¥1,200 / +¥200:
//     odakyu-global.com/passes/hakone-freepass/ and hakonetrip.odakyu-global.com
//   - the whole Shinjuku loop ("golden course") at ¥8,322 in IC-card fares without the pass
//     vs ¥7,100 with it, ¥1,222 saved: Hakone Navi article 4252 (Odakyu Hakone's own site)
//   - JR passes not valid inside Hakone, but usable to reach Odawara; the Odawara version
//     for JR travellers: Odakyu's Hakone Freepass FAQ (odakyu-global.com/blog/2053/)
// The where-to-buy and digital-vs-paper rows stay as read on 13 November.
//
// Re-read on 27 November 2026 (task-jtk-20261127-R17); all four domains answered a direct read:
//   - every price on the page, the 8 modes, where to buy (EMot, Odakyu stations one month ahead,
//     same-day machines, 7-Eleven, Tozan stations and bus offices): hakonenavi.jp free_pass page
//   - Romancecar +¥1,200 / +¥600 (Odawara +¥200 / +¥100), about 80 min, "worth it even for a day
//     trip", For Group up to 4, machine payment methods: odakyu.jp/english/passes/hakone/
//   - the single fare of every ride on the loop, in IC-card fares: Hakone Navi's Japanese
//     breakdown (feature/22866, "as of 30 Sep 2025", i.e. the October 2025 fares): Shinjuku ⇄
//     Hakone-Yumoto ¥1,261 each way, Tozan Train Hakone-Yumoto → Chokoku-no-Mori ¥460 (→ Gora
//     +¥160), cable car Gora → Sounzan ¥430, ropeway Sounzan → Togendai ¥2,000, cruise Togendai →
//     Moto-Hakone ¥1,700, Tozan Bus Moto-Hakone → Hakone-Yumoto ¥1,210; its 2-day route with
//     four extra bus rides ¥10,622 vs ¥7,100 = ¥3,522 saved; Gora Park ¥650 free with the pass.
//     The seven loop legs add up to exactly the ¥8,322 of the English article 4252.
//   - ride times: Hakone Navi ropeway FAQ (15 min per section, change at Owakudani), cruise FAQ
//     (25–35 min one way; H Line bus to Moto-Hakone about 40 min, K Line about 35), the Japanese
//     Freepass LP (cable car about 10 min), Odakyu HAKONE TRIP 2-day itinerary (Tozan Train about
//     40 min to Chokoku-no-Mori)
//   - other passes for the 1-day question: Odakyu Hakone's fare notice PDF (Owakudani 2-Day Pass
//     from Odawara ¥5,000 / ¥1,300, ropeway validity extended to Togendai; Sightseeing Cruise &
//     Ropeway Pass ¥5,000 / ¥1,400 for 1 day). Hakone Navi article 4252's pass table still shows
//     the old ¥3,700 for the Owakudani pass, so the fare notice is used.
const CHECKED_ISO = "2026-11-27";
const CHECKED = checkedLabel(CHECKED_ISO);
const BUY_CHECKED_ISO = "2026-11-27";
const BREAKDOWN_URL = "https://www.hakonenavi.jp/feature/22866";
const LP_URL = "https://www.hakonenavi.jp/lp/hakone-freepass/";
const ROPEWAY_URL = "https://www.hakonenavi.jp/international/en/transportation/hakone-ropeway";
const CRUISE_URL = "https://www.hakonenavi.jp/international/en/transportation/hakone-kankosen";
const ITINERARY_URL = "https://hakonetrip.odakyu-global.com/feature/hakone-2-day-itinerary/";
const LOOP_URL = "https://www.hakonenavi.jp/international/en/article/4252";
const JR_URL = "https://odakyu-global.com/blog/2053/";
const LOOP_REGULAR = "¥8,322";
const LOOP_SAVING = "¥1,222";
const NAVI_URL = "https://www.hakonenavi.jp/international/en/discount_passes/free_pass";
const ODAKYU_URL = "https://www.odakyu.jp/english/passes/hakone/";
const FARE_NOTICE_URL = "https://www.hakonenavi.jp/international/en/wp-content/uploads/sites/2/2025/09/re_price202510.pdf";

const PASS_2_DAY_SHINJUKU = "¥7,100";
const PASS_3_DAY_SHINJUKU = "¥7,500";
const PASS_2_DAY_ODAWARA = "¥6,000";
const PASS_3_DAY_ODAWARA = "¥6,400";
const ROMANCECAR = "¥1,200";
const ROPEWAY = "¥2,000";
const CRUISE = "¥1,700";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

// First row is the answer most readers came for.
const priceRows = [
  { pass: "Most Tokyo visitors: 2 days from Shinjuku", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "From Shinjuku (Odakyu Line return included)", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "From Odawara (Hakone area only)", d2a: PASS_2_DAY_ODAWARA, d2c: "¥1,500", d3a: PASS_3_DAY_ODAWARA, d3c: "¥1,750" },
  { pass: "From Machida", d2a: "¥6,820", d2c: "¥1,600", d3a: "¥7,220", d3c: "¥1,850" },
  { pass: "From Fujisawa", d2a: "¥7,050", d2c: "¥1,600", d3a: "¥7,450", d3c: "¥1,850" },
];

const buyRows = [
  {
    where: "Short answer",
    ticket: "Buy online before you go if everyone has a smartphone",
    when: "Paper at an Odakyu station if a child has no phone of their own",
    note: "The digital pass lives on a smartphone (For Group puts up to 4 on one phone if you travel together); a paper pass works for anyone.",
  },
  {
    where: "EMot Online Tickets (Odakyu's own site)",
    ticket: "Digital QR code, smartphones only",
    when: "Online, before you travel",
    note: "Up to 4 tickets on one phone with the For Group option, travelling together. A Romancecar seat booked here is ¥50 cheaper than at the station. Refunds only where the ticket shows a Refund button.",
  },
  {
    where: "Odakyu Line stations (ticket machines) and Odakyu Sightseeing Service Center",
    ticket: "Paper ticket",
    when: "From one month before at Odakyu Line stations; machines only sell passes valid from the same day",
    note: "Machines take cash, PASMO/Suica and American Express, Diners Club, JCB, Mastercard and Visa.",
  },
  {
    where: "7-Eleven (7-Ticket)",
    ticket: "Paper ticket from the store's multifunction copier",
    when: "Before you travel",
    note: "No issuance fee. The version with the Odakyu Line return is sold as a Shinjuku departure only.",
  },
  {
    where: "In Hakone: Hakone Tozan Railway machines and Hakone Tozan Bus information centres",
    ticket: "Paper ticket",
    when: "On the day",
    note: "Machines at Hakone-Yumoto, Gora, Sounzan and other Tozan stations; bus offices at Odawara station, Hakone-Yumoto, Moto-Hakone, Hakone-machi, Sengoku, Togendai and Miyagino.",
  },
  {
    where: "Klook",
    ticket: "A Klook booking for the same Odakyu pass",
    when: "Online, before you travel",
    note: "English checkout for a card issued abroad. Read the listing for how the voucher is redeemed and its cancellation terms.",
  },
];

const coverageRows = [
  {
    mode: "Odakyu Line (Shinjuku ⇄ Odawara)",
    included: "✓ One return trip",
    note: "Shinjuku version only, with stop-overs allowed on the way. The Odawara version does not include it.",
  },
  { mode: "Hakone Tozan Train (Odawara / Hakone-Yumoto ⇄ Gora)", included: "✓ Unlimited", note: "The switchback mountain railway — the first leg of the loop from Hakone-Yumoto." },
  { mode: "Hakone Tozan Cable Car (Gora ⇄ Sounzan)", included: "✓ Unlimited", note: "A funicular up to the ropeway's lower station." },
  { mode: "Hakone Ropeway (Sounzan ⇄ Owakudani ⇄ Togendai)", included: "✓ Unlimited", note: `The Owakudani leg, and the most expensive single ride on the loop at ${ROPEWAY} one way.` },
  { mode: "Hakone Sightseeing Cruise (Lake Ashi pirate ships)", included: "✓ Unlimited", note: `Togendai to Hakone-machi or Moto-Hakone, ${CRUISE} one way without the pass. The premium cabin is extra.` },
  { mode: "Hakone Tozan Bus (designated areas)", included: "✓ Unlimited", note: "How you close the loop back to Hakone-Yumoto or Odawara." },
  { mode: "\"KANKO SHISETSU-MEGURI\" sightseeing bus", included: "✓ Unlimited", note: "Run by Hakone Tozan Bus and Odakyu Highway Bus between the sightseeing spots." },
  { mode: "Odakyu Highway Bus (designated areas)", included: "✓ Unlimited", note: "Reserved-ticket holders board first, so a bus can be full." },
  { mode: "Tokai Bus (designated areas)", included: "✓ Unlimited", note: "Within the designated sections only." },
  { mode: "Limited Express Romancecar", included: "✗ Not included", note: `A separate seat ticket: ${ROMANCECAR} adult, ¥600 child, Shinjuku to Hakone-Yumoto.` },
  { mode: "Izu-Hakone Bus", included: "✗ Not included", note: "A different operator. Check the bus company before you board." },
];

// Row 1 is the answer. Every single fare is Hakone Navi's own (IC-card fares, adult, October
// 2025 fares), and the seven loop legs add up to its ¥8,322 total for the one-day loop.
const fareRows: ReactNode[][] = [
  ["Answer", "The pass pays for itself on the 7th ride of the loop, the train back to Shinjuku", LOOP_REGULAR, `${LOOP_SAVING} more than the ${PASS_2_DAY_SHINJUKU} pass`],
  ["1. Odakyu Line + Tozan Line", "Shinjuku → Hakone-Yumoto", "¥1,261", "¥1,261"],
  ["2. Hakone Tozan Train", "Hakone-Yumoto → Chokoku-no-Mori (one stop before Gora)", "¥460", "¥1,721"],
  ["3. Hakone Tozan Cable Car", "Gora → Sounzan", "¥430", "¥2,151"],
  ["4. Hakone Ropeway", "Sounzan → Owakudani → Togendai", ROPEWAY, "¥4,151"],
  ["5. Hakone Sightseeing Cruise", "Togendai → Moto-Hakone", CRUISE, "¥5,851"],
  ["6. Hakone Tozan Bus", "Moto-Hakone → Hakone-Yumoto", "¥1,210", "¥7,061 — still ¥39 under the pass"],
  ["7. Odakyu Line + Tozan Line", "Hakone-Yumoto → Shinjuku", "¥1,261", `${LOOP_REGULAR} — the pass has paid`],
  ["2-day pass from Shinjuku", "Same loop on the pass", PASS_2_DAY_SHINJUKU, `${LOOP_SAVING} saved in one day`],
  ["3-day pass from Shinjuku", "Same loop on the pass", PASS_3_DAY_SHINJUKU, "¥822 saved in one day"],
  ["Hakone Navi's 2-day route", "The loop plus 4 bus rides to museums and the marsh garden", "¥10,622", `¥3,522 saved with the ${PASS_2_DAY_SHINJUKU} pass`],
  ["Odawara pass, rides 2–6 only", "Hakone-Yumoto round the loop and back", "¥5,800", `¥200 under the ${PASS_2_DAY_ODAWARA} pass — pays with the Odawara ⇄ Hakone-Yumoto train or a second day`],
];

// Row 1 is the answer: the whole loop and how long it takes. Times are the operators' own.
const routeRows: ReactNode[][] = [
  ["The whole loop", "Hakone-Yumoto → Gora → Sounzan → Owakudani → Togendai → Moto-Hakone → Hakone-Yumoto", "About 2½–3 hours of riding, plus changes and stops", "✓ Every leg"],
  ["1. Romancecar or Odakyu Line", "Shinjuku → Hakone-Yumoto", "About 80 min direct on the Romancecar; ordinary trains usually change at Odawara", `✓ Odakyu Line (Shinjuku version, one return) · ✗ Romancecar seat +${ROMANCECAR}`],
  ["2. Hakone Tozan Train", "Hakone-Yumoto → Gora (switchbacks)", "About 40 min to Chokoku-no-Mori; Gora is the next stop", "✓"],
  ["3. Hakone Tozan Cable Car", "Gora → Sounzan", "About 10 min", "✓"],
  ["4. Hakone Ropeway", "Sounzan → Owakudani → Ubako → Togendai", "About 15 min per section; change gondolas at Owakudani", "✓"],
  ["5. Hakone Sightseeing Cruise (pirate ship)", "Togendai → Hakone-machi or Moto-Hakone", "About 25–35 min", "✓ (premium cabin +¥800)"],
  ["6. Hakone Tozan Bus", "Moto-Hakone → Hakone-Yumoto", "About 40 min (H Line) or 35 min (K Line)", "✓ · ✗ Izu-Hakone Bus"],
  ["7. Odakyu Line or Romancecar", "Hakone-Yumoto → Shinjuku", "As ride 1", "✓ Odakyu Line · ✗ Romancecar seat"],
];

// Row 1 is the answer to "is there a 1-day pass?".
const passChoiceRows: ReactNode[][] = [
  ["Answer: there is no 1-day Hakone Freepass", "Buy the 2-day pass even for one day if you ride the whole loop", `${PASS_2_DAY_SHINJUKU} from Shinjuku, ${LOOP_SAVING} under single fares`],
  ["Hakone Freepass (2 or 3 days)", "The full loop, a night in Hakone, or both", `${PASS_2_DAY_SHINJUKU} / ${PASS_3_DAY_SHINJUKU} from Shinjuku, ${PASS_2_DAY_ODAWARA} / ${PASS_3_DAY_ODAWARA} from Odawara`],
  ["Owakudani 2-Day Pass", "Owakudani and the ropeway only: Tozan Train, cable car and the whole ropeway to Togendai, Gora Park free — no cruise, no bus", "¥5,000 adult, ¥1,300 child from Odawara"],
  ["Sightseeing Cruise & Ropeway Pass (1 day)", "Arriving by car: the ropeway and the Lake Ashi cruise only", "¥5,000 adult, ¥1,400 child"],
  ["Single tickets", "Hakone-Yumoto only, for an onsen and lunch", "Pay per ride"],
];

const worthRows = [
  {
    plan: "Two days in Hakone, one night in an onsen inn",
    verdict: "✓ Buy the 2-day pass",
    why: `The pass is priced for this. ${PASS_2_DAY_SHINJUKU} from Shinjuku covers the Odakyu return and every leg of the loop on both days.`,
  },
  {
    plan: "A single day trip from Tokyo, riding the whole loop",
    verdict: "✓ Still worth it",
    why: `The seven single fares of the loop from Shinjuku add up to ${LOOP_REGULAR}, so the ${PASS_2_DAY_SHINJUKU} pass saves ${LOOP_SAVING} even if you only use the first day. Odakyu says it is "worth it even for a day trip".`,
  },
  {
    plan: "Arriving by shinkansen at Odawara, or already staying in Hakone",
    verdict: "✓ Buy the Odawara version",
    why: `${PASS_2_DAY_ODAWARA} instead of ${PASS_2_DAY_SHINJUKU}, because it drops the Odakyu Line return you will not use. Same 8 modes inside Hakone.`,
  },
  {
    plan: "Hakone-Yumoto only, for an onsen and lunch",
    verdict: "✗ Skip it",
    why: "Without the ropeway and the cruise, the pass does not pay for itself. Pay per ride.",
  },
  {
    plan: "You want the loop done for you, with no timetables",
    verdict: "✗ Take a day tour instead",
    why: "A guided coach covers Owakudani and Lake Ashi on a fixed departure and gets you back to Tokyo the same evening — a different purchase from a transport pass.",
  },
];

const formatRows = [
  { item: "Which to get", digital: "Digital if everyone in your group has a smartphone and you want to skip the station queue", paper: "Paper if a child has a Kids Phone or you would rather not depend on a battery" },
  { item: "Where you get it", digital: "EMot Online Tickets, on a smartphone only", paper: "Odakyu Sightseeing Service Center or a station ticket machine" },
  { item: "Paying", digital: "Online", paper: "Machines take cash, PASMO/Suica and American Express, Diners Club, JCB, Mastercard, Visa" },
  { item: "A group", digital: "Up to 4 tickets on one phone with the For Group option; you must travel together, and at the gate scan companions first and your own last", paper: "One paper pass each" },
  { item: "Children", digital: "6–11 pay the child fare, under 6 need no ticket. Japanese Kids Phones are not accepted", paper: "6–11 pay the child fare, under 6 need no ticket" },
  { item: "Refund", digital: "Only where the ticket shows a Refund button; a leg suspended by weather is refunded through the EMot support desk", paper: "If a service is suspended, refunded at the last station you travel to, only for transport not used" },
];

const faqItems = [
  {
    q: "How much is the Hakone Freepass in 2026?",
    a: `${PASS_2_DAY_SHINJUKU} for an adult and ¥1,600 for a child (6–11) for 2 days from Shinjuku, and ${PASS_3_DAY_SHINJUKU} / ¥1,850 for 3 days. The Hakone-area-only version from Odawara is ${PASS_2_DAY_ODAWARA} / ¥1,500 for 2 days and ${PASS_3_DAY_ODAWARA} / ¥1,750 for 3. These prices have applied since 1 October 2025. Checked on hakonenavi.jp and odakyu.jp on ${CHECKED}.`,
  },
  {
    q: "Is the Hakone Freepass worth it?",
    a: `Yes, if you ride the whole loop, even in one day. Hakone Navi's single fares for the loop from Shinjuku — Odakyu Line ¥1,261 each way, Tozan Train ¥460, cable car ¥430, ropeway ${ROPEWAY}, Lake Ashi cruise ${CRUISE} and the bus back ¥1,210 — add up to ${LOOP_REGULAR}, against ${PASS_2_DAY_SHINJUKU} for the 2-day pass: ${LOOP_SAVING} saved, and ¥3,522 on Hakone Navi's 2-day route. The pass pays on the 7th ride, the train home. It does not pay for a visit to Hakone-Yumoto only. Checked ${CHECKED}.`,
  },
  {
    q: "Where can I buy the Hakone Freepass?",
    a: `Online through Odakyu's EMot Online Tickets (a digital QR pass on a smartphone, up to 4 on one phone with For Group), on paper at Odakyu Line stations from one month before (ticket machines sell same-day passes only), at 7-Eleven through 7-Ticket, and in Hakone at Hakone Tozan Railway machines and Hakone Tozan Bus offices. Klook sells the same Odakyu pass with an English checkout for a card issued abroad. The price is the same pass either way; what changes is the ticket format and how early you can buy. Checked ${checkedLabel(BUY_CHECKED_ISO)}.`,
  },
  {
    q: "Does the Hakone Freepass include the Romancecar?",
    a: `No. The Shinjuku version includes one Odakyu Line return, but the Limited Express Romancecar needs a separate seat ticket: ${ROMANCECAR} for an adult and ¥600 for a child each way between Shinjuku and Hakone-Yumoto, or ¥200 / ¥100 from Odawara. It takes about 80 minutes direct, and booking the seat through EMot Online Tickets is ¥50 cheaper. Odakyu's own example: pass ${PASS_2_DAY_SHINJUKU} + Romancecar both ways ¥2,400 = ¥9,500. Checked ${CHECKED}.`,
  },
  {
    q: "1-day or 2-day: which Hakone pass should I get?",
    a: `There is no 1-day Hakone Freepass; it is sold for 2 or 3 days only. Buy the 2-day pass (${PASS_2_DAY_SHINJUKU} from Shinjuku) even for a day trip if you ride the whole loop, because it is ${LOOP_SAVING} under the single fares. For Owakudani without the lake, the Owakudani 2-Day Pass (¥5,000 from Odawara) covers the Tozan Train, cable car and the ropeway; if you arrive by car, the 1-day Sightseeing Cruise & Ropeway Pass is ¥5,000. Checked on Odakyu Hakone's fare notice and Hakone Navi ${CHECKED}.`,
  },
];

// Odakyu's own spelling, "Freepass", leads the title and the H1 in the same order;
// "Hakone Free Pass" follows in the description and the H1 subtitle.
const TITLE = "Hakone Freepass 2026: Price from Shinjuku & Is It Worth It?";
const DESCRIPTION =
  "Hakone Freepass 2026: ¥7,100 for 2 days from Shinjuku, ¥6,000 from Odawara, 8 rides unlimited. One loop costs ¥8,322 in single fares, so it saves ¥1,222.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/hakone-free-pass") } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h || `blank-${i}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: r === 0 ? 700 : undefined }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LastChecked({ children, iso = CHECKED_ISO }: { children?: ReactNode; iso?: string }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      Last checked: {iso} —{" "}
      <a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp (Hakone Freepass)</a>,{" "}
      <a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp (Hakone Freepass)</a>
      {children}
    </p>
  );
}

export default function HakoneFreePassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/hakone-free-pass" />
        {hreflangLinks("/guides/attractions/hakone-free-pass")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/hakone-free-pass" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/attractions/hakone-free-pass",
              headline: TITLE,
              description: DESCRIPTION,
              updated,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Hakone Freepass", item: "https://www.japan-travel-kit.com/guides/attractions/hakone-free-pass" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: "/guides/attractions/hakone-free-pass",
              name: "Hakone Freepass",
              description: DESCRIPTION,
              brand: "Odakyu",
              currency: "JPY",
              lowPrice: 6000,
              highPrice: 7500,
              offerCount: 4,
            }),
          }}
        />
      </Head>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Hakone Freepass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Hakone Freepass 2026: Price from Shinjuku, <br />Route &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            The Hakone Free Pass at Odakyu&apos;s own prices from Shinjuku and Odawara, the loop it pays for in a
            single day, the digital version for your phone, and the Romancecar seat it does not cover.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official Odakyu prices", "No 1-day version"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclosure */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The 2-day <strong>Hakone Freepass</strong> costs <strong>{PASS_2_DAY_SHINJUKU} for an adult from
            Shinjuku and {PASS_2_DAY_ODAWARA} from Odawara</strong> ({PASS_3_DAY_SHINJUKU} and{" "}
            {PASS_3_DAY_ODAWARA} for 3 days), with unlimited rides on 8 kinds of transport in Hakone. One loop
            from Shinjuku — Odakyu Line, Tozan Train, cable car, ropeway, Lake Ashi cruise and bus — costs{" "}
            <strong>{LOOP_REGULAR} in single fares</strong>, so the pass is <strong>{LOOP_SAVING} cheaper even
            on a day trip</strong>. The Romancecar seat ({ROMANCECAR} each way from Shinjuku) is extra; all prices
            checked on Odakyu&apos;s and Hakone Navi&apos;s official pages on {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            This page is about the pass — the Hakone Free Pass prices, what it covers, and where to buy it. How
            to spend the day itself, stop by stop, is in our{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              Hakone day trip from Tokyo
            </Link>{" "}
            guide, and how to use both days of the pass with a night in between is our{" "}
            <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>
              Hakone 2 day itinerary
            </Link>
            .
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>2-day, from Shinjuku</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_SHINJUKU}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>2-day, from Odawara</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_ODAWARA}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Covered</p>
                <p className={styles.verdictStatValue}>8 kinds of transport</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Romancecar</p>
                <p className={styles.verdictStatValue}>+{ROMANCECAR}, not included</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              Odakyu spells it <strong>Freepass</strong>; most people search for Hakone Free Pass. It is the same
              ticket. There is no 1-day version, buying online (EMot or Klook) avoids the station queue, and the
              Odawara version is the one to buy if a shinkansen is bringing you in.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Hakone Free Pass on Klook →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Hakone Day Tour Instead →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="hakone" />

        <EsimCtaTop />

        {/* Price table — question heading, answer first, conclusion in row 1. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the Hakone Freepass in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {PASS_2_DAY_SHINJUKU} for an adult for 2 days from Shinjuku, which is the version most Tokyo visitors
            need. The price depends on the station the pass starts from, and the third day costs only ¥400 more.
          </p>
          <Table
            head={["Departure station", "2 days, adult", "2 days, child", "3 days, adult", "3 days, child"]}
            rows={priceRows.map((r) => [r.pass, r.d2a, r.d2c, r.d3a, r.d3c])}
          />
          <LastChecked>
            . Child fares are for ages 6–11; under 6 ride free. These prices have applied since 1 October 2025. The
            Romancecar seat is extra: {ROMANCECAR} / ¥600 from Shinjuku, ¥200 / ¥100 from Odawara, to Hakone-Yumoto.
          </LastChecked>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            Shinjuku or Odawara? The ¥1,100 difference is the Odakyu Line return between Shinjuku and Odawara and
            nothing else — both versions cover the same 8 kinds of transport inside Hakone. Every pass on this site
            sits alongside the others in our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              Japan attraction ticket prices table
            </Link>
            .
          </p>
          {/* Directly under the price table: the pass, then what to book on the same trip. */}
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check the Hakone Freepass on Klook →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Only one day? Compare a guided Hakone day tour →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What else should you book with the Hakone Freepass?"
          headingLevel={3}
          intro="The pass covers the transport, not the day or the night. If you only have one day and want no timetables, a guided Hakone day tour does the same loop on one booking; if you have two, a room in Hakone uses the second day you have already paid for. Data for the digital ticket books on the same Klook account."
          items={hakoneFreepassTripPrep}
        />

        {/* Where to buy */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Where Can I Buy the Hakone Freepass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Online through Odakyu&apos;s EMot Online Tickets or Klook, or on paper at any Odakyu Line station,
            7-Eleven or in Hakone itself. What changes is the ticket you get and how early you can buy it.
          </p>
          <Table
            head={["Where", "What you get", "When you can buy", "Worth knowing"]}
            rows={buyRows.map((r) => [r.where, r.ticket, r.when, r.note])}
          />
          <LastChecked iso={BUY_CHECKED_ISO}>. Klook row: no official source; the listing itself has the current terms.</LastChecked>
        </section>

        {/* Coverage table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Included vs not</span>
          <h2 className={styles.sectionTitle}>What Does the Hakone Freepass Cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Unlimited rides on 8 kinds of transport inside Hakone, plus one Odakyu Line return on the Shinjuku
            version. The Romancecar seat and the Izu-Hakone Bus are not covered.
          </p>
          <Table head={["Transport", "On the pass?", "What that means"]} rows={coverageRows.map((r) => [r.mode, r.included, r.note])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            . The pass also gives discounts at around 70 spots in Hakone; the list changes, so it is not priced here.
          </LastChecked>
        </section>

        {/* Break-even and worth it */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Is it worth it?</span>
          <h2 className={styles.sectionTitle}>Is the Hakone Freepass Worth It?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, if you ride the whole loop, even in one day: the seven single fares from Shinjuku and back add up
            to {LOOP_REGULAR} against {PASS_2_DAY_SHINJUKU} for the pass, a saving of {LOOP_SAVING}. The running
            total passes the price of the pass on the 7th ride, the train back to Shinjuku.
          </p>
          <Table head={["Ride, in loop order", "Section", "Single fare, adult", "Running total"]} rows={fareRows} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} —{" "}
            <a href={BREAKDOWN_URL} target="_blank" rel="noopener noreferrer">Hakone Navi fare breakdown (Japanese)</a>,{" "}
            <a href={LOOP_URL} target="_blank" rel="noopener noreferrer">Hakone Navi (loop total)</a>,{" "}
            <a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">Odakyu Hakone fare notice (PDF)</a>,{" "}
            <a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp (Hakone Freepass)</a>. IC-card
            fares for an adult, no Romancecar. Riding the Tozan Train on to Gora adds ¥160. Child single fares are
            not in the breakdown; the ropeway is ¥700 and the cruise ¥850 for a child, one way. The pass also makes
            Hakone Gora Park (¥650) free, and the premium cabin on the cruise is another ¥800 one way.
          </p>
          <Table head={["Your plan", "Verdict", "Why"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Both the ropeway and the cruise stop in bad weather, and the ropeway can close at short notice at
            Owakudani. If a leg is suspended and you did not ride it, the paper pass is refunded at the last
            station you travel to. The day-by-day route — what to see at each stop and when to leave Tokyo — is
            in our{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              Hakone day trip from Tokyo
            </Link>{" "}
            guide; this page covers the pass itself.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check the Hakone Free Pass →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Compare a Hakone Day Tour →
            </KlookLink>
          </div>
        </section>

        {/* Route map as a table, in riding order (no map image). */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Route map</span>
          <h2 className={styles.sectionTitle}>What Is the Hakone Freepass Route, in Order?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Seven rides in a circle: Odakyu Line to Hakone-Yumoto, Tozan Train up to Gora, cable car to Sounzan,
            ropeway over Owakudani to Togendai, pirate ship across Lake Ashi, bus back to Hakone-Yumoto, and the
            Odakyu Line home. Every leg is on the Freepass, and it works in either direction.
          </p>
          <Table head={["Ride", "Section", "Time", "On the Freepass?"]} rows={routeRows} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} —{" "}
            <a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp (Romancecar time)</a>,{" "}
            <a href={ITINERARY_URL} target="_blank" rel="noopener noreferrer">Odakyu HAKONE TRIP (Tozan Train time)</a>,{" "}
            <a href={LP_URL} target="_blank" rel="noopener noreferrer">Hakone Navi Freepass page (cable car, Japanese)</a>,{" "}
            <a href={ROPEWAY_URL} target="_blank" rel="noopener noreferrer">Hakone Ropeway FAQ</a>,{" "}
            <a href={CRUISE_URL} target="_blank" rel="noopener noreferrer">Hakone Sightseeing Cruise FAQ (cruise and bus times)</a>.
            The riding total is these times added up. The ropeway and the cruise stop in strong wind or bad
            weather, and the ropeway also closes for its yearly maintenance — the winter dates are in our{" "}
            <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>Hakone 2 day itinerary</Link>.
          </p>
        </section>

        {/* 1-day vs 2-day */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which pass</span>
          <h2 className={styles.sectionTitle}>1-Day or 2-Day: Which Hakone Pass Should I Get?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The 2-day Hakone Freepass, even for one day, if you ride the whole loop — there is no 1-day Freepass,
            and the 2-day one is still {LOOP_SAVING} under the single fares. A narrower pass only makes sense if
            you skip the lake or the ropeway.
          </p>
          <Table head={["Pass", "Buy it for", "Adult price"]} rows={passChoiceRows} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} —{" "}
            <a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">Odakyu Hakone fare notice (PDF)</a>,{" "}
            <a href={LOOP_URL} target="_blank" rel="noopener noreferrer">Hakone Navi discount passes</a>,{" "}
            <a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp (Hakone Freepass)</a>.
          </p>
        </section>

        {/* Romancecar */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>Does the Hakone Freepass Include the Romancecar?</h2>
          <p className={styles.bodyText}>
            No. The Shinjuku version covers one Odakyu Line return, but the Limited Express Romancecar needs a
            separate seat ticket: <strong>{ROMANCECAR} for an adult and ¥600 for a child each way</strong> from
            Shinjuku to Hakone-Yumoto. It takes about <strong>80 minutes direct</strong>, all seats reserved, and
            booking the seat on EMot Online Tickets is ¥50 cheaper than at the station. Odakyu&apos;s own worked
            example for a return trip from Shinjuku is the pass at {PASS_2_DAY_SHINJUKU} plus the Romancecar both
            ways at ¥2,400, ¥9,500 in total. The ordinary Odakyu trains the pass covers take longer and usually
            mean a change at Odawara.
          </p>
          <p className={styles.bodyText}>
            Hakone also pairs with the Fuji Five Lakes, a separate pass and region — our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>
              Mt. Fuji day trip guide
            </Link>{" "}
            covers it. If Hakone is one night inside a longer route, the{" "}
            <Link href="/guides/attractions/tokyo-7-day-itinerary" style={linkStyle}>
              7-day Tokyo itinerary
            </Link>
            , the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>
              5-day Tokyo itinerary
            </Link>{" "}
            and the{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary" style={linkStyle}>
              14-day Japan itinerary
            </Link>{" "}
            show where the Hakone day sits, and our{" "}
            <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>
              Hakone ryokan with private onsen
            </Link>{" "}
            guide covers the night: 10 inns by area, from Hakone-Yumoto to Lake Ashi, with the bus or train
            each one is reached by.
          </p>
        </section>

        {/* JR Pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>JR Pass holders</span>
          <h2 className={styles.sectionTitle}>Can I Use the Hakone Freepass with a JR Pass?</h2>
          <p className={styles.bodyText}>
            Yes, but they do different jobs: Odakyu says the JR Pass and the JR Tokyo Wide Pass cannot be used
            inside the Hakone area, only to reach Odawara on JR lines. From Odawara, the{" "}
            <strong>Odawara version of the Hakone Freepass ({PASS_2_DAY_ODAWARA} for 2 days, {PASS_3_DAY_ODAWARA}{" "}
            for 3)</strong> covers the whole loop and leaves out the Odakyu Line you would not ride. If you then go
            back to Shinjuku on the Romancecar, you need its seat ticket and the Odawara–Shinjuku base fare on top.
            Whether a JR pass pays at all for a Tokyo trip is in our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass guide
            </Link>{" "}
            and the{" "}
            <Link href="/guides/transport/tokyo-wide-pass" style={linkStyle}>
              JR Tokyo Wide Pass guide
            </Link>
            . Odakyu&apos;s other one-day pass from Shinjuku, the{" "}
            <Link href="/guides/attractions/enoshima-kamakura-pass" style={linkStyle}>
              Enoshima-Kamakura Freepass
            </Link>
            , works the same way for the coast: an Odakyu return plus unlimited Enoden rides.
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} —{" "}
            <a href={JR_URL} target="_blank" rel="noopener noreferrer">Odakyu Hakone Freepass FAQ</a>,{" "}
            <a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp (Hakone Freepass)</a>.
          </p>
        </section>

        {/* Digital or paper */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The ticket itself</span>
          <h2 className={styles.sectionTitle}>Digital or Paper: Which Hakone Freepass Should You Get?</h2>
          <Table head={["", "Digital (EMot)", "Paper"]} rows={formatRows.map((r) => [r.item, r.digital, r.paper])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            . Go digital if your group stays together on one phone; go paper if a child has a Kids Phone or you would
            rather not depend on a battery. Validity is by calendar day: a 2-day pass ends after the last service on
            the day after purchase, not 48 hours later.
          </LastChecked>
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Two Odakyu passes go further than Hakone: the <Link href="/guides/transport/fuji-hakone-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Fuji Hakone Pass</Link> adds the Fuji Five Lakes, and the <Link href="/guides/transport/hakone-kamakura-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Hakone Kamakura Pass</Link> adds the Enoden to Kamakura.
          </p>
        </section>
        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Hakone Freepass FAQ</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <KlookTourPicks
          heading="If One Day Is All You Have"
          intro="A pass is the right buy for doing the loop yourself. For a single day out of Tokyo without timetables, these are the guided versions of the same loop — one coach, one fixed departure, back in the city the same evening. Open a listing for the current price on your date."
          tours={[hakoneLoopBusTour, hakoneCruiseCableCarTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 7 Nov 2026: where to spend the night this 2-day pass covers. */}
            <Link href="/guides/attractions/hakone-ryokan-private-onsen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Ryokan with Private Onsen: 10 Inns by Area (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/*
              Added 30 Oct 2026, and reciprocal: the JR Pass guide already sends readers here to
              explain that the Freepass is Odakyu's and no JR pass covers it. The link back is for
              the reader working out which passes a Tokyo-plus-Hakone trip actually needs.
            */}
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Cost 2026: New Prices &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Day Trip From Tokyo (2026): Freepass Prices vs a Day Tour</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Trip From Tokyo (2026): How to Get There Yourself</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="10" rx="2" />
                  <path d="M7 21l1-4M17 21l-1-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
                  <path d="M4 12l5-7 4 6 2-2 5 3z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-attraction-ticket-prices" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Attraction Ticket Prices 2026: Official Prices and Booking Rules</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ride the whole Hakone loop on one ticket</h2>
            <p className={styles.ctaBannerDesc}>
              8 kinds of transport, two or three days, and an English checkout that takes a foreign card. If you
              only have one day and want no timetables, the guided coach version of the same loop is the better buy.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Hakone Free Pass →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Hakone Day Tours →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
