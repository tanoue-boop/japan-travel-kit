import Head from "next/head";
import Link from "next/link";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { warnerBrosStudioTourTokyo, warnerBrosStudioTourSameDayPrep } from "../../../lib/klook-links";
import { gygWarnerBrosStudioTourTokyo } from "../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// Sources, all on wbstudiotour.jp:
// - /en/tickets/ — standard entry from ¥6,600 / ¥5,500 / ¥4,000, prices vary through the
//   year, non-refundable, ¥1,500 per date/time change via Visitor Services before the
//   original booking time, unauthorised and auction tickets not valid. Read 8 Nov 2026.
// - /en/ticket-information/price/ — age bands (adult 18+, junior 12–17, child 4–11, 3 and
//   under free infant ticket), group and Nerima-resident rates, tea packages. Read 8 Nov 2026.
// - /en/faqs/tickets/ — enter within 30 minutes of the slot, late arrivals moved to the next
//   available time, non-transferable. Read 8 Nov 2026.
// - /en/faqs/facilities/ — allow three to four hours, coin lockers inside and outside,
//   pushchairs, photography. Read 8 Nov 2026.
// - /en/authorised-distributors/ — Klook and GetYourGuide both listed. Read 8 Nov 2026.
// - /en/plan-your-visit/location/ — address and journey times. Read 8 Nov 2026.
// Re-read 16 Nov 2026 (task jtk-20261116-R03):
// - /en/news_20251120/ — "Important Notice: Ticket Pricing Update": date-based prices for
//   admissions from 1 July 2026 (standard ¥6,600–¥7,300 / ¥5,500–¥6,000 / ¥4,000–¥4,400,
//   package, afternoon tea, group); current prices through 30 June 2026.
// - /en/notice_20250116/ (?p=14673) — the earlier revision, admissions from 1 April 2025:
//   standard ¥7,000 / ¥5,800 / ¥4,200 (price table image EN_new-price-list.png).
// - /en/tickets/ — Dinner at Hogwarts events, tea package availability windows.
// - /en/dinner-at-hogwarts-magical-winter/ and /en/dinner-at-hogwarts-magical-feast-share/.
// - /en/plan-your-visit/opening-times/ — tickets on sale until 31 March 2027.
// - /en/plan-your-visit/location/ — Oedo Line 20 min, Seibu 17 min, limousine bus stop.
// The standard-entry adult and child figures and the check date are owned by
// lib/attraction-prices.ts, shared with the ticket price table.
const P = PRICES.wbStudioTour;
const CHECKED = checkedLabel(P.checked);

const OFFICIAL = {
  tickets: "https://www.wbstudiotour.jp/en/tickets/",
  priceUpdate: "https://www.wbstudiotour.jp/en/news_20251120/",
  revision2025: "https://www.wbstudiotour.jp/en/notice_20250116/",
  priceList: "https://www.wbstudiotour.jp/en/ticket-information/price/",
  openingTimes: "https://www.wbstudiotour.jp/en/plan-your-visit/opening-times/",
  location: "https://www.wbstudiotour.jp/en/plan-your-visit/location/",
  dinnerWinter: "https://www.wbstudiotour.jp/en/dinner-at-hogwarts-magical-winter/",
  dinnerShare: "https://www.wbstudiotour.jp/en/dinner-at-hogwarts-magical-feast-share/",
};

/** Ticket × price × the date the price applies from, as the official site states it. */
const priceRows = [
  { ticket: "Standard entry", adult: "¥6,600–¥7,300", junior: "¥5,500–¥6,000", child: "¥4,000–¥4,400", from: "Admissions from 1 Jul 2026 (price varies by date)" },
  { ticket: "Package Tickets", adult: "¥10,080–¥10,780", junior: "¥8,980–¥9,480", child: "¥7,480–¥7,880", from: "Admissions from 1 Jul 2026" },
  { ticket: "Afternoon Tea Package", adult: "¥14,000–¥14,700", junior: "¥12,900–¥13,400", child: "¥11,400–¥11,800", from: "Admissions from 1 Jul 2026; on sale for visits up to 11 Jan 2027" },
  { ticket: "Evening High Tea Package", adult: "¥16,500–¥16,800", junior: "¥15,300–¥15,500", child: "¥13,700–¥13,900", from: "Price list; on sale for visits up to 10 Jan 2027" },
  { ticket: "Group (20+ people)", adult: "¥6,000", junior: "¥5,000", child: "¥3,600", from: "Unchanged in the July 2026 update" },
  { ticket: "Nerima residents (tours after 13:00)", adult: "¥5,000", junior: "¥4,150", child: "¥3,000", from: "Price list" },
  { ticket: "Standard entry, previous price", adult: "¥7,000", junior: "¥5,800", child: "¥4,200", from: "1 Apr 2025 – 30 Jun 2026 (flat)" },
];

const accessRows = [
  { from: "Shinjuku Station", route: "Toei Oedo Line, direct to Toshimaen", time: "20 min", pass: "Yes — Toei subway line" },
  { from: "Ikebukuro (Seibu-Ikebukuro Station)", route: "Seibu Ikebukuro Line, direct to Toshimaen", time: "17 min", pass: "No — Seibu private railway" },
  { from: "Tokyo Station", route: "No direct line: ride to Shinjuku or Ikebukuro, then take one of the two routes above", time: "Not given officially", pass: "Only on the Oedo Line leg" },
  { from: "Haneda Airport", route: "Airport Limousine Bus (Haneda ⇔ Hikarigaoka/Nerima route) to the \"WARNER BROS. STUDIO TOUR TOKYO\" stop, from 1 Mar 2026", time: "Not given on the location page", pass: "No" },
  { from: "Toshimaen Station", route: "Walk to the entrance", time: "2 min", pass: "—" },
];

/** What the official site says about availability — nothing beyond it. */
const sellOutRows = [
  { item: "Dates on sale now", value: "Visits up to 31 March 2027; later dates are announced on the official X, Instagram, Facebook and TikTok", source: "Opening times page" },
  { item: "Weekends, holidays, year-end", value: "No day-by-day sell-out guide is published; the site says only that your preferred date and time may sell out, and prices vary by date", source: "Tickets page" },
  { item: "Magical Winter season", value: "13 November 2026 – 11 January 2027", source: "Dinner at Hogwarts pages" },
  { item: "Dinner at Hogwarts ~Magical Winter~ (2, 3, 10, 11 Dec 2026)", value: "Newsletter pre-sale sold out; no tickets currently available — more may be released", source: "Magical Winter dinner page" },
  { item: "Dinner at Hogwarts ~A Magical Feast to Share~ (5, 12 Dec 2026)", value: "No tickets currently available — more may be released", source: "Tickets page" },
  { item: "On-site ticket office", value: "Sells only slots that have not sold out", source: "Tickets page" },
];

/** The rules a booker needs, each read off the official site on the check date. */
const ruleRows = [
  { item: "Adult (18 and over)", value: "¥6,600–¥7,300 — varies by date", source: "July 2026 price update" },
  { item: "Junior (12–17)", value: "¥5,500–¥6,000 — varies by date", source: "July 2026 price update" },
  { item: "Child (4–11)", value: "¥4,000–¥4,400 — varies by date", source: "July 2026 price update" },
  { item: "3 and under", value: "Free — select the free infant ticket", source: "Price list" },
  { item: "Refunds", value: "Non-refundable and non-transferable", source: "Tickets FAQ" },
  { item: "Changing date or time", value: "¥1,500 each time; contact Visitor Services before the original slot", source: "Tickets page" },
  { item: "Entry window", value: "Enter within 30 minutes of your booked time", source: "Tickets FAQ" },
  { item: "Time to allow", value: "3–4 hours (no set limit)", source: "Facilities FAQ" },
  { item: "Nearest station", value: "Toshimaen, 2-minute walk", source: "Location page" },
];

const whoFor = [
  {
    title: "Standard entry is the right default…",
    desc: "At ¥6,600~ for an adult it covers the whole tour: the Great Hall, Diagon Alley, the Hogwarts Express at Platform 9¾, the Ministry of Magic atrium and the sets, costumes and props. Nothing in the tour itself is gated behind a higher tier.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 4l-9 9 2 2 9-9z" />
        <path d="M5 19l2-6 4 4-6 2z" />
      </svg>
    ),
  },
  {
    title: "The tea packages are a meal, not more tour…",
    desc: "Afternoon Tea takes an adult ticket from ¥6,600~ to ¥14,000~, and Evening High Tea to ¥16,500~. You are paying roughly ¥7,400–¥9,900 for the sitting, not for extra access. Worth it if the meal is the occasion; otherwise skip it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8z" />
        <path d="M16 9h2a2 2 0 0 1 0 4h-2" />
        <line x1="3" y1="21" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    title: "Book a date and time, don't turn up…",
    desc: "Tickets are date- and time-specified. The official site does keep an on-site ticket office, but it says plainly that pre-booking is recommended because your preferred date and time may be sold out. Treat the walk-up option as a fallback, not a plan.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="3" x2="8" y2="7" />
        <line x1="16" y1="3" x2="16" y2="7" />
      </svg>
    ),
  },
];

/** Official site or an authorised reseller — only what each side states. */
const sellerRows = [
  {
    where: "Official site (wbstudiotour.jp)",
    lang: "Japanese and English site; a WeChat Mini Program for Chinese visitors",
    change: "Non-refundable; ¥1,500 per date/time change through Visitor Services, before the original slot",
  },
  {
    where: "Klook (authorised distributor)",
    lang: "English checkout, e-ticket on your phone",
    change: "Klook's own terms apply — they are shown on the listing for your date",
  },
  {
    where: "GetYourGuide (authorised distributor)",
    lang: "Checkout in the language of your GetYourGuide account",
    change: "GetYourGuide's own terms apply — read them on the listing",
  },
  {
    where: "On-site ticket office",
    lang: "At the entrance in Nerima",
    change: "Only if your date and time have not sold out",
  },
];

const steps = [
  {
    title: "Pick your date and arrival time first",
    desc: "Admission is timed, and the official site warns that preferred slots sell out. The official FAQ recommends allowing three to four hours, so an afternoon slot will take up your evening too. You must enter within 30 minutes of the time on your ticket.",
  },
  {
    title: "Check the price for your actual date",
    desc: `For admissions from 1 July 2026 the official site prices standard entry by date: ¥6,600–¥7,300 (adult, 18+), ¥5,500–¥6,000 (junior, 12–17) and ¥4,000–¥4,400 (child, 4–11). Ages 3 and under go free on an infant ticket. The figure for your date is the one shown at checkout. Checked ${CHECKED}.`,
  },
  {
    title: "Decide on a tea package before you check out",
    desc: "Afternoon Tea and Evening High Tea are bought with the ticket, not added later. They roughly double the adult price, so settle it at booking rather than discovering the option on arrival.",
  },
  {
    title: "Buy from the official site or an authorised distributor only",
    desc: "The official site states that only tickets bought directly or from an authorised distributor are valid, and that tickets from unauthorised third parties, including auction sites, will not get you in. Klook and GetYourGuide are both on the official distributor list; Klook sells the same date- and time-specified admission with an English checkout and an e-ticket.",
  },
  {
    title: "Be sure of the date before you pay",
    desc: "Tickets are non-refundable. A date or time change costs ¥1,500 each time on the official booking, and has to be requested through Visitor Services before your original slot. A reseller applies its own change terms, shown on its listing.",
  },
];

const faqItems = [
  {
    q: "How much are Harry Potter Studio Tour Tokyo tickets in 2026?",
    a: `For admissions from 1 July 2026, standard entry costs ¥6,600–¥7,300 for an adult (18+), ¥5,500–¥6,000 for a junior (12–17) and ¥4,000–¥4,400 for a child (4–11), depending on the date; ages 3 and under are free on an infant ticket. From 1 April 2025 to 30 June 2026 the same ticket was a flat ¥7,000 / ¥5,800 / ¥4,200. The Afternoon Tea Package is ¥14,000–¥14,700 for an adult. Figures from the official Warner Bros. Studio Tour Tokyo site, checked ${CHECKED}.`,
  },
  {
    q: "Can you buy Warner Bros Studio Tour Tokyo tickets at the door?",
    a: `Yes, but only for slots that have not sold out. The official site says tickets are also sold at the on-site ticket office, and recommends pre-booking because your preferred admission date and time may be sold out. Every ticket is for a set date and entry time, tickets are non-refundable, and a date or time change costs ¥1,500. Checked ${CHECKED}.`,
  },
  {
    q: "How do I get from Shinjuku to the Harry Potter studio?",
    a: `Take the Toei Oedo Line from Shinjuku direct to Toshimaen — 20 minutes, according to the official location page — then walk two minutes to the entrance. The Oedo Line is a Toei subway line, so the Tokyo Subway Ticket covers it. From Ikebukuro, the Seibu Ikebukuro Line runs direct to Toshimaen in 17 minutes, but it is a private railway and is not covered. Checked ${CHECKED}.`,
  },
  {
    q: "How long do you need at the Harry Potter Studio Tour Tokyo?",
    a: `The official FAQ recommends allowing three to four hours, with no time limit once you are inside. You must enter within 30 minutes of the time on your ticket; arrive later and staff offer the next available slot, subject to availability. Add the 20-minute Oedo Line ride each way from Shinjuku, and the visit takes half a day. Checked ${CHECKED}.`,
  },
  {
    q: "What is Dinner at Hogwarts?",
    a: `Dinner at Hogwarts is a limited-date dinner event in the Great Hall at the Tokyo studio tour, with studio tour admission included. In 2026 there are two: ~Magical Winter~ on 2, 3, 10 and 11 December (¥58,000, ages 18 and over, multi-course dinner with free-flow drinks and an after-hours studio tour, 4:45–10:00 PM), and ~A Magical Feast to Share~ on 5 and 12 December (¥29,000 for adults 20+, ¥15,000 from elementary school age to 19, sharing-style dinner, bookings of three to four guests, 5:30–8:00 PM). On ${CHECKED} the official site showed no tickets currently available for either, with more possibly released.`,
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/warner-bros-studio-tour-tokyo-tickets") },
});

const TITLE = "Harry Potter Tokyo Tickets 2026: Studio Tour Price & Booking";
const DESC =
  "Harry Potter Tokyo tickets: Warner Bros Studio Tour Tokyo price ¥6,600–¥7,300 adult, ¥4,000–¥4,400 child from Jul 2026, timed entry, 20 min from Shinjuku.";

export default function WarnerBrosStudioTourTokyoTicketsPage({ updated }: { updated: PageUpdated }) {
  const muted = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/warner-bros-studio-tour-tokyo-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/warner-bros-studio-tour-tokyo-tickets" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
              route: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets",
              headline: TITLE,
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Harry Potter Tokyo Tickets (Warner Bros. Studio Tour Tokyo)",
                  item: "https://www.japan-travel-kit.com/guides/attractions/warner-bros-studio-tour-tokyo-tickets",
                },
              ],
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
          <span className={styles.breadCurrent}>Warner Bros. Studio Tour Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Harry Potter Tokyo Tickets 2026:<br />Warner Bros. Studio Tour Tokyo Price &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Official prices after the July 2026 price update, the date-and-time booking rules, the train from
            Shinjuku or Ikebukuro to Toshimaen, and what is already sold out this winter.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices & rules", "Access from Shinjuku"].map((t) => (
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

        {/* Answer first */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Harry Potter Tokyo tickets — officially Warner Bros. Studio Tour Tokyo – The Making of Harry
            Potter — cost ¥6,600–¥7,300 for an adult (18+), ¥5,500–¥6,000 for a junior (12–17) and
            ¥4,000–¥4,400 for a child (4–11), under the date-based prices the official site applies to
            admissions from 1 July 2026; ages 3 and under go free. Every ticket is for a set date and entry
            time, and the on-site ticket office sells only slots that have not sold out, so book before you go.
            The official FAQ says to allow three to four hours, and Toshimaen Station, a 2-minute walk away, is
            20 minutes from Shinjuku on the Toei Oedo Line. Checked {CHECKED}.
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
                <p className={styles.verdictStatLabel}>Adult entry</p>
                <p className={styles.verdictStatValue}>¥6,600–¥7,300</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Child entry (4–11)</p>
                <p className={styles.verdictStatValue}>¥4,000–¥4,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Allow</p>
                <p className={styles.verdictStatValue}>3–4 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Nearest station</p>
                <p className={styles.verdictStatValue}>Toshimaen (2 min)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book a dated, timed slot in advance from the official site or an
              authorised distributor such as Klook — preferred slots sell out, tickets are non-refundable, and
              each date change is ¥1,500. Resale and auction tickets are not valid. Prices checked on {CHECKED}.
            </p>
            <KlookLink href={warnerBrosStudioTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check studio tour tickets on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Same-day block sits high: the ticket itself is in Klook's 2% band, so the
            6.5% hotel and tour rows, the 5% subway pass and the 20% eSIM carry the page. */}
        <KlookTripPrep
          label="Same day, same booking"
          heading="What should you book for the rest of the studio tour day?"
          intro="Three to four hours in Nerima leaves the rest of the day open, and the Shinjuku route there is a single subway ride. These book on the same Klook account as the ticket."
          items={warnerBrosStudioTourSameDayPrep}
        />

        <EsimCtaTop />

        {/* Price table with revision dates */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much are Harry Potter Studio Tour Tokyo tickets in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Standard entry is ¥6,600–¥7,300 for an adult, depending on the date, for admissions from 1 July
            2026. Before that, from 1 April 2025 to 30 June 2026, it was a flat ¥7,000.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Adult (18+)", "Junior (12–17)", "Child (4–11)", "Applies to"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Best way to buy</td>
                    <td colSpan={4} style={{ fontSize: "0.88rem" }}>
                      <strong>The official site&apos;s date-and-time ticket, or the Klook ticket plus the Tokyo
                      Subway Ticket for the Oedo Line ride</strong> — both are authorised, both are for a fixed slot.
                    </td>
                  </tr>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.junior}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.child}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.from}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Last checked: {P.checked}. Sources:{" "}
            <a href={OFFICIAL.priceUpdate} target="_blank" rel="noopener">Ticket Pricing Update notice</a> (July
            2026 prices),{" "}
            <a href={OFFICIAL.revision2025} target="_blank" rel="noopener">Notice of Ticket Price Revision</a> (April
            2025 prices),{" "}
            <a href={OFFICIAL.tickets} target="_blank" rel="noopener">tickets page</a> and{" "}
            <a href={OFFICIAL.priceList} target="_blank" rel="noopener">price list</a>, all on wbstudiotour.jp.
            The price list page shows a lower floor for standard entry (¥6,300 adult, ¥5,200 junior, ¥3,800
            child) than the July 2026 notice and the tickets page; the price shown for your date at checkout is
            the one that applies. Ages 3 and under need the free infant ticket.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <KlookLink href={warnerBrosStudioTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Harry Potter Tokyo tickets on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Rules table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The rules</span>
          <h2 className={styles.sectionTitle}>What are the rules for Harry Potter Studio Tour Tokyo tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Tickets are for a fixed date and entry time, non-refundable, and ¥1,500 to change. Every line below
            is from the official Warner Bros. Studio Tour Tokyo site, read on {CHECKED}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", `Official rule (checked ${CHECKED})`, "Where it is stated"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ruleRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Sources: wbstudiotour.jp — tickets page, ticket price list, tickets FAQ, facilities FAQ and location
            page, all read {CHECKED}.
          </p>
        </section>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What is the Warner Bros. Studio Tour Tokyo?</h2>
          <p className={styles.bodyText}>
            Warner Bros. Studio Tour Tokyo — The Making of Harry Potter is a self-paced indoor walk through film
            sets, costumes and props, on the former Toshimaen amusement park site in Nerima. It was the first
            Warner Bros. Studio Tour in Asia, and it covers the sets most visitors come for: the Great Hall,
            Diagon Alley and the Hogwarts Express at Platform 9¾.
          </p>
          <p className={styles.bodyText}>
            Tokyo also has sections London does not, including a Ministry of Magic atrium with the Floo Network
            fireplaces and a green-screen Quidditch sequence. It is not a theme park: there are no rides, and
            the time you spend is reading, looking and photographing rather than queuing. It is one of the few
            Tokyo sights that has to be booked ahead —{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">our things to do in Tokyo guide</Link> lists the
            others that need a dated ticket.
          </p>
        </section>

        {/* When it sells out */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Availability</span>
          <h2 className={styles.sectionTitle}>When do Harry Potter Studio Tour Tokyo tickets sell out?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Book as soon as your date is fixed: tickets are on sale only up to 31 March 2027, the official site
            warns that preferred dates and times may sell out, and both December Dinner at Hogwarts events
            show no tickets left. It does not publish which days sell out first.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", `Official status (checked ${CHECKED})`, "Where it is stated"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Bottom line</td>
                    <td colSpan={2} style={{ fontSize: "0.88rem" }}>
                      <strong>Book your slot when the trip dates are set; dates after 31 March 2027 are not on sale yet.</strong>
                    </td>
                  </tr>
                  {sellOutRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Last checked: {P.checked}. Sources:{" "}
            <a href={OFFICIAL.openingTimes} target="_blank" rel="noopener">opening times</a>,{" "}
            <a href={OFFICIAL.tickets} target="_blank" rel="noopener">tickets</a>,{" "}
            <a href={OFFICIAL.dinnerWinter} target="_blank" rel="noopener">Dinner at Hogwarts ~Magical Winter~</a>{" "}
            and{" "}
            <a href={OFFICIAL.dinnerShare} target="_blank" rel="noopener">Dinner at Hogwarts ~A Magical Feast to Share~</a>{" "}
            on wbstudiotour.jp.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Travelling with children? The{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids">Tokyo itinerary with kids</Link> sets out
            the other dated family tickets — Disney, LEGOLAND Discovery Center and Sanrio Puroland — so the
            studio tour date can be chosen around them.
          </p>
        </section>

        {/* Dinner at Hogwarts */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Special events</span>
          <h2 className={styles.sectionTitle}>What is Dinner at Hogwarts?</h2>
          <p className={styles.bodyText}>
            Dinner at Hogwarts is a limited-date dinner in the Great Hall, sold as its own ticket with studio
            tour admission included. Two run in December 2026, and on {CHECKED} the official site showed no
            tickets currently available for either, noting that more may be released.
          </p>
          <p className={styles.bodyText}>
            <strong>~Magical Winter~</strong> (2, 3, 10 and 11 December 2026) is ¥58,000 per person, ages 18 and
            over only: a multi-course dinner with free-flow beer, wine and soft drinks, a drink in the Gryffindor
            Common Room and an after-hours studio tour, from 4:45 PM registration to 10:00 PM.{" "}
            <strong>~A Magical Feast to Share~</strong> (5 and 12 December 2026) is the family version: ¥29,000
            for adults 20 and over and ¥15,000 from elementary school age to 19, a sharing-style dinner for
            bookings of three to four guests, 5:30–8:00 PM, with no after-hours tour. Both fall inside the
            Magical Winter season, 13 November 2026 to 11 January 2027.
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Is standard entry or a tea package better?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do I book Harry Potter Studio Tour Tokyo tickets?</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={muted}>
            The official sources checked on {CHECKED} do not give a date on which each month&apos;s tickets go on
            sale, or say which days sell out first — only that preferred dates and times may sell out. Check the
            calendar for your dates as soon as they are fixed.
          </p>
        </section>

        {/* Cancel / change */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Changes</span>
          <h2 className={styles.sectionTitle}>Can I cancel or change Harry Potter Studio Tour Tokyo tickets?</h2>
          <p className={styles.bodyText}>
            You cannot cancel for a refund: the official site states that tickets are non-refundable and
            non-transferable. You can move the date or time for ¥1,500 per change, by contacting Visitor
            Services before your original booking time. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            A ticket from an authorised reseller follows that reseller&apos;s own change terms, which are shown
            on the listing — check them for your date before you pay.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <KlookLink href={warnerBrosStudioTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check studio tour tickets on Klook →
            </KlookLink>
            <GygCompareButton slug="warner-bros-studio-tour-tokyo-tickets" listing={gygWarnerBrosStudioTourTokyo} />
          </div>
        </section>

        {/* Authorised sellers */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Is Klook an authorised seller for Studio Tour Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes. Klook is on the official authorised-distributor list on wbstudiotour.jp, as is GetYourGuide,
            checked {CHECKED}. The official site states that only tickets bought directly or from an authorised
            distributor are valid, and that tickets from unauthorised third parties, including online auction
            sites, will not get you in.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "Language and ticket", "Refunds and changes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sellerRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.lang}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Official rules and the distributor list from wbstudiotour.jp, read {CHECKED}. Reseller prices
            change with the date and currency, so none are given here — check the listing for your date.
          </p>
        </section>

        {/* Time needed */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Time needed</span>
          <h2 className={styles.sectionTitle}>How long do you need at the Harry Potter Studio Tour Tokyo?</h2>
          <p className={styles.bodyText}>
            The official FAQ recommends three to four hours, with no set limit once you are in. You have to
            enter within 30 minutes of the time on your ticket; arrive later and staff will offer the next
            available slot, subject to availability on the day. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            That makes it half a day, not a whole one. In the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">5-day Tokyo itinerary</Link> it fits as a
            swap for a rainy city day; on a shorter trip, fit it around the{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">3-day Tokyo itinerary</Link> by giving it
            one morning or one afternoon.
          </p>
        </section>

        {/* At the door */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>On the day</span>
          <h2 className={styles.sectionTitle}>Can you buy Warner Bros Studio Tour Tokyo tickets at the door?</h2>
          <p className={styles.bodyText}>
            Only for slots that have not sold out. The official site says tickets are also sold at the on-site ticket office, but recommends
            pre-booking because your preferred date and time may be sold out. Without a booking you get
            whatever slot is left that day, if any. Checked {CHECKED}.
          </p>
        </section>

        {/* What to bring */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Bags and buggies</span>
          <h2 className={styles.sectionTitle}>Are there lockers, and can you bring a pushchair?</h2>
          <p className={styles.bodyText}>
            Coin-operated lockers are available both inside and outside the building, and the official FAQ asks
            for large suitcases to go in the outdoor ones. Pushchairs are welcome, with a limited number of free
            rentals at the Information Desk; wagon-style buggies and other non-standard ones are not allowed.
            Photos and video on phones and handheld cameras are allowed in most areas, but not in the pre-show
            cinema or the green-screen areas. Checked {CHECKED}.
          </p>
        </section>

        {/* Access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How do I get from Shinjuku to the Harry Potter studio?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Take the Toei Oedo Line from Shinjuku direct to Toshimaen (20 minutes), then walk two minutes. From
            Ikebukuro the Seibu Ikebukuro Line takes 17 minutes. The address is 1-1-7 Kasugacho, Nerima-ku,
            Tokyo 179-0074 — north-west Tokyo, well outside the Yamanote loop.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["From", "Route", "Journey time (official)", "Tokyo Subway Ticket?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Best route</td>
                    <td colSpan={3} style={{ fontSize: "0.88rem" }}>
                      <strong>Toei Oedo Line from Shinjuku — one train, 20 minutes, covered by the Tokyo Subway Ticket.</strong>
                    </td>
                  </tr>
                  {accessRows.map((row) => (
                    <tr key={row.from}>
                      <td className={styles.tdProvider}>{row.from}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.pass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Last checked: {P.checked}. Journey times, the limousine bus stop and the address from the official{" "}
            <a href={OFFICIAL.location} target="_blank" rel="noopener">location page</a> on wbstudiotour.jp; the
            official site gives no time from Tokyo Station or Haneda. Single fares are not listed here — the
            ticket machine and each operator&apos;s route search show the fare for your card.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The Shinjuku route runs on the Toei Oedo Line, which is a subway line — so it is covered by the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket</Link> if you are carrying
            one. The Seibu Ikebukuro Line is a private railway and is not. Our{" "}
            <Link href="/guides/transport/tokyo-transportation">Tokyo transport guide</Link> explains which
            operator runs what. A hotel on the Oedo Line makes the trip a single ride;{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo</Link> compares the
            main areas, Shinjuku among them.
          </p>
        </section>

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common Questions</h2>
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/sanrio-puroland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sanrio Puroland Tickets (2026): Prices, Variable Pricing &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disney Tickets (2026): Disneyland &amp; DisneySea — How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-planets-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Price, Hours and How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
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
            <h2 className={styles.ctaBannerTitle}>Timed admission, so pick a slot</h2>
            <p className={styles.ctaBannerDesc}>
              The official advice is to pre-book, because preferred dates and times sell out. Klook sells the
              same date- and time-specified admission with an English checkout and an e-ticket.
            </p>
            <KlookLink href={warnerBrosStudioTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
              View studio tour tickets on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
