import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
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
// so the break-even table leaves them out rather than estimating them.
const CHECKED_ISO = "2026-11-13";
const CHECKED = checkedLabel(CHECKED_ISO);
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
    note: "The digital pass is one ticket per phone; a paper pass works for anyone.",
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

// Only legs with an official fare are listed; the total is a floor.
const legRows = [
  {
    leg: "Fares that can be checked add up to ¥5,520 of the ¥7,100 pass",
    adult: "¥5,520",
    child: "—",
    source: "The Tozan Train, cable car and closing bus make up the rest",
  },
  { leg: "Odakyu Line, Shinjuku → Odawara (regular fare)", adult: "¥910", child: "—", source: "odakyu.jp" },
  { leg: "Hakone Ropeway, Sounzan → Togendai (one way)", adult: ROPEWAY, child: "¥700", source: "Odakyu Hakone fare notice, from 1 Oct 2025" },
  { leg: "Hakone Sightseeing Cruise, Togendai → Hakone-machi / Moto-Hakone (one way)", adult: CRUISE, child: "¥850", source: "Odakyu Hakone fare notice, from 1 Oct 2025" },
  { leg: "Odakyu Line, Odawara → Shinjuku (regular fare)", adult: "¥910", child: "—", source: "odakyu.jp" },
  { leg: "Not counted: Hakone Tozan Train, cable car, Tozan Bus", adult: "Not priced here", child: "—", source: "No official English fare table to quote" },
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
    why: `The ropeway (${ROPEWAY}), the cruise (${CRUISE}) and the Odakyu return (¥1,820) are ¥5,520 before the Tozan Train, cable car and bus. Odakyu says it is "worth it even for a day trip".`,
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
    q: "Where can I buy the Hakone Freepass?",
    a: `Online through Odakyu's EMot Online Tickets (a digital QR pass, smartphones only), at Odakyu Line station ticket machines and the Odakyu Sightseeing Service Center (paper), at 7-Eleven through 7-Ticket, at Odakyu Travel stores, and in Hakone at Hakone Tozan Railway machines and Hakone Tozan Bus information centres. Odakyu stations sell it from one month before; ticket machines only sell passes valid from the same day. Klook also sells it with an English checkout. Checked ${CHECKED}.`,
  },
  {
    q: "Is the Hakone Freepass worth it for a day trip?",
    a: `Yes, if you ride the full loop. There is no 1-day version, but the ropeway (${ROPEWAY} one way) and the Lake Ashi cruise (${CRUISE} one way) plus the Odakyu Line return (¥910 each way) already come to ¥5,520 before the Tozan Train, cable car and bus, and Odakyu itself says the pass is worth it even for a day trip. It does not pay for a visit to Hakone-Yumoto only. Fares checked ${CHECKED}.`,
  },
  {
    q: "Does the Hakone Freepass include the Romancecar?",
    a: `No. The Shinjuku version includes one Odakyu Line return, but the Limited Express Romancecar needs a separate seat ticket: ${ROMANCECAR} for an adult and ¥600 for a child each way between Shinjuku and Hakone-Yumoto, or ¥200 / ¥100 from Odawara. It takes about 80 minutes direct, and booking the seat through EMot Online Tickets is ¥50 cheaper. Odakyu's own example: pass ${PASS_2_DAY_SHINJUKU} + Romancecar both ways ¥2,400 = ¥9,500. Checked ${CHECKED}.`,
  },
  {
    q: "Is a 2-day Hakone Freepass valid for 48 hours?",
    a: `No. Odakyu counts the date of purchase as the first day of validity regardless of the time you buy it, so a 2-day pass ends after the last train or bus on the following day. Buy it on the morning you start travelling. Checked on odakyu.jp on ${CHECKED}.`,
  },
];

const TITLE = "Hakone Freepass (Free Pass) 2026: Price & Where to Buy";
const DESCRIPTION =
  "Hakone Freepass (Hakone Free Pass) 2026: ¥7,100 for 2 days from Shinjuku, ¥6,000 from Odawara, 8 rides covered, Romancecar ¥1,200 extra. Where to buy it.";

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

function LastChecked({ children }: { children?: ReactNode }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      Last checked: {CHECKED_ISO} —{" "}
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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Hakone Freepass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Hakone Freepass (Hakone Free Pass) 2026:<br />Price, 8 Rides Covered &amp; Where to Buy
          </h1>
          <p className={styles.heroSubtitle}>
            Odakyu&apos;s own prices from Shinjuku and Odawara, the 8 kinds of transport it covers, the
            Romancecar seat it does not, and where to buy it before you go.
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
            The <strong>Hakone Freepass</strong> costs <strong>{PASS_2_DAY_SHINJUKU} for an adult and ¥1,600
            for a child for 2 days from Shinjuku</strong>, or {PASS_2_DAY_ODAWARA} / ¥1,500 from Odawara, and the
            3-day versions are {PASS_3_DAY_SHINJUKU} and {PASS_3_DAY_ODAWARA}. It gives unlimited rides on{" "}
            <strong>8 kinds of transport</strong> in Hakone — the Hakone Tozan Train, the cable car, the Hakone
            Ropeway, the Lake Ashi pirate-ship cruise and four bus services — plus one Odakyu Line return from
            Shinjuku. The <strong>Romancecar is not included</strong>: its seat is {ROMANCECAR} extra per adult
            each way from Shinjuku to Hakone-Yumoto. Prices checked on hakonenavi.jp and odakyu.jp on {CHECKED}.
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
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Hakone Free Pass on Klook →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Hakone Day Tour Instead →
              </KlookLink>
            </div>
          </div>
        </div>

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
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the Hakone Freepass on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What else should you book with the Hakone Freepass?"
          headingLevel={3}
          intro="The pass covers the transport. These three book on the same Klook account: a guided Hakone day if you only have one day, a room in Hakone for the second day of the pass, and data for the digital ticket."
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
          <LastChecked>. Klook row: no official source; the listing itself has the current terms.</LastChecked>
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
          <LastChecked>
            . The pass also gives discounts at around 70 spots in Hakone; the list changes, so it is not priced here.
          </LastChecked>
        </section>

        {/* Break-even and worth it */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Is it worth it?</span>
          <h2 className={styles.sectionTitle}>Is the Hakone Freepass Worth It for a Day Trip?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, if you ride the whole loop. The fares below — the only legs with an official published fare —
            already reach ¥5,520 of the {PASS_2_DAY_SHINJUKU} pass before the Tozan Train, the cable car and the
            closing bus, and Odakyu says the pass is &ldquo;worth it even for a day trip&rdquo;.
          </p>
          <Table head={["Leg (adult, without the pass)", "Adult", "Child", "Source"]} rows={legRows.map((r) => [r.leg, r.adult, r.child, r.source])} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} —{" "}
            <a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">Odakyu Hakone fare notice (PDF)</a>,{" "}
            <a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp</a>. The premium cabin on the
            cruise is another ¥800 / ¥400 one way.
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
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the Hakone Free Pass →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Compare a Hakone Day Tour →
            </KlookLink>
          </div>
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
            guide covers the night.
          </p>
        </section>

        {/* Digital or paper */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The ticket itself</span>
          <h2 className={styles.sectionTitle}>Digital or Paper: Which Hakone Freepass Should You Get?</h2>
          <Table head={["", "Digital (EMot)", "Paper"]} rows={formatRows.map((r) => [r.item, r.digital, r.paper])} />
          <LastChecked>
            . Go digital if your group stays together on one phone; go paper if a child has a Kids Phone or you would
            rather not depend on a battery. Validity is by calendar day: a 2-day pass ends after the last service on
            the day after purchase, not 48 hours later.
          </LastChecked>
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
                <p className={styles.relatedTitle}>Hakone Ryokan with Private Onsen (2026): 4 Inns Compared</p>
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
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Hakone Free Pass →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Hakone Day Tours →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
