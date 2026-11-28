import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import BookingEsimCard from "../../../components/BookingEsimCard";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { gygSanrioPuroland } from "../../../lib/gyg-links";
import {
  sanrioPurolandAnswerCards,
  sanrioPurolandCompareCards,
  sanrioPurolandTicket,
  sanrioPurolandTripPrep,
  tokyoSightseeingBusTour,
  warnerBrosStudioTourTokyo,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Rebuilt 12 Nov 2026 (task jtk-20261112-R03) around the searches that land here:
 * "sanrio puroland", "sanrio puroland tickets", "puroland ticket price", "puropass".
 *
 * Sources, each checked on 12 Nov 2026:
 *  - puroland.jp/news/passport_information_2026/: Day Passport ¥3,900–¥6,900 adult
 *    (18–64), ¥2,800–¥5,800 child (3–17) and senior (65+); Afternoon Passport (from
 *    14:00) ¥2,800–¥4,600 and ¥2,500–¥4,300; effective 1 Aug 2026; under-3s free;
 *  - puroland.jp/passport/list/: passport names, annual passport prices, price by visit
 *    date, e-passport cheaper than the same-day window, window open from 30 minutes
 *    before opening to 90 minutes before closing, age bands;
 *  - puroland.jp/ticket/guidance/: arrival reservation required on top of a passport,
 *    same-day reservations only while slots remain, no refund on a passport if entry is
 *    refused for lack of a reservation;
 *  - puroland.jp/puropass/: PUROPASS is a priority pass, not admission; ¥1,500 priority
 *    entry, ¥2,500 pair, parade seats ¥1,000–¥3,000; limited numbers; no refunds;
 *  - puroland.jp/access/ and puroland.jp/language/: about 30 minutes from Shinjuku on the
 *    Keio Line limited express to Keio Tama Center, about 23 minutes from Tachikawa on
 *    the Tama Monorail, 5 minutes' walk from Tama Center;
 *  - puroland.jp home page: 9:30–17:00 shown for 12 Nov 2026. Hours vary by date and are
 *    printed for that date only.
 *
 * Re-checked 19 Nov 2026 (task jtk-20261119-R03, title moved to "Price, Skip-the-Line &
 * Booking"):
 *  - the official price calendar's month files (puroland.jp/common_v2/json/2026MM.json,
 *    the data behind puroland.jp/ticket/), 19 Nov 2026 – 31 Jan 2027: adult Day Passport
 *    ¥3,900–¥5,600 on weekdays and ¥5,600–¥6,600 on Saturdays, Sundays, holidays and
 *    28 Dec – 5 Jan; child/senior ¥2,800–¥4,500 and ¥4,500–¥5,500; Afternoon adult
 *    ¥2,800–¥3,800 and ¥3,800–¥4,400, child/senior ¥2,500–¥3,500 and ¥3,500–¥4,100.
 *    February 2027 had no prices yet. Hours 19 Nov 9:30–17:00, 21 Nov 8:30–18:00;
 *  - puroland.jp/passport/list/: the official e-Passport is "the only passport with the
 *    arrival reservation included", date-specified, cancellable until the day before;
 *    Lawson / FamilyMart tickets are date-specified and non-cancellable; the Keio
 *    Amusement Passport (with a Keio/Inokashira one-day ticket) and an Odakyu round-trip
 *    EMot e-passport exist;
 *  - puroland.jp/puropass/: advance PUROPASS sold through Lawson Ticket (membership
 *    required); priority entry ¥1,500, pair ¥2,500; parade seats ¥1,000–¥3,000; in-park
 *    priority passes for theatres and rides sold on the day;
 *  - day schedules /system/json/schedule/day/20261119.json and 20261121.json for show
 *    and parade times; schedule page: greetings need a digital numbered ticket issued
 *    from park opening;
 *  - keio.co.jp/global/routes/stations/shinjuku/: Shinjuku → Keio Tama Center ¥360
 *    ticket / ¥356 IC. No official Odakyu fare page could be read, so none is printed;
 *  - puroland.jp/access/: Narita airport bus to Keio Tama Center ¥1,700, 90–140 min.
 * No Klook or GetYourGuide price appears on this page.
 *
 * Re-checked 28 Nov 2026 (task jtk-20261128-R08, title moved to "Online vs Gate Price &
 * Hours"):
 *  - puroland.jp/ticket/ and /schedule/ label the calendar prices 当日の窓口料金 (the
 *    same-day window price), so the price table is the gate price;
 *  - puroland.jp/passport/e-passport/: the official e-Passport is ¥100 off the window
 *    price, includes the arrival reservation, cancellable until 23:59 the day before;
 *  - puroland.jp/language/: an Official Ticket Discount Coupon shown at the window takes
 *    ¥200 off the window price (Day or Afternoon coupon), up to 5 people per coupon,
 *    valid to 31 Mar 2027, not combinable with other coupons;
 *  - calendar month files 202611–202703: prices unchanged for 28 Nov 2026 – 31 Jan 2027
 *    (adult weekday ¥3,900–¥5,600, weekend/holiday/28 Dec–5 Jan ¥5,600–¥6,600); hours
 *    and closed days published to 31 Mar 2027, prices not yet for Feb–Mar 2027;
 *  - the Klook listing (activity 2276) returned 403, so no Klook price or discount is
 *    printed.
 */
const P = PRICES.sanrioPuroland;
const CHECKED = checkedLabel(P.checked);
const CHECKED_ISO = "2026-11-28";
const OPEN_TODAY = "8:30 to 18:00";

const officialLink = { color: "var(--text)", fontWeight: 600 } as const;

function LastChecked({ sources }: { sources: { label: string; href: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      Last checked: {CHECKED_ISO}. Official source{sources.length > 1 ? "s" : ""}:{" "}
      {sources.map((s, i) => (
        <span key={s.href}>
          {i > 0 ? ", " : ""}
          <a href={s.href} target="_blank" rel="noopener" style={officialLink}>
            {s.label}
          </a>
        </span>
      ))}
      .
    </p>
  );
}

/**
 * Table 1: ticket × weekday / weekend × adult / child / senior. The answer row first.
 * Weekday and weekend ranges are the official calendar's prices for 19 Nov 2026 – 31 Jan 2027.
 */
const priceRows = [
  {
    ticket: "Bottom line: adult Day Passport at the gate",
    weekday: "¥3,900 – ¥5,600",
    weekend: "¥5,600 – ¥6,600",
    band: "¥3,900 – ¥6,900; ¥100 less as the official e-Passport",
  },
  { ticket: "Day Passport — adult (18–64)", weekday: "¥3,900 – ¥5,600", weekend: "¥5,600 – ¥6,600", band: P.adult },
  { ticket: "Day Passport — child (3–17) or senior (65+)", weekday: "¥2,800 – ¥4,500", weekend: "¥4,500 – ¥5,500", band: P.child },
  { ticket: "Afternoon Passport (entry from 14:00) — adult", weekday: "¥2,800 – ¥3,800", weekend: "¥3,800 – ¥4,400", band: "¥2,800 – ¥4,600" },
  { ticket: "Afternoon Passport — child or senior", weekday: "¥2,500 – ¥3,500", weekend: "¥3,500 – ¥4,100", band: "¥2,500 – ¥4,300" },
  { ticket: "Under 3", weekday: "Free", weekend: "Free", band: "Free" },
  { ticket: "PUROPASS priority entry (skip-the-line add-on, not admission)", weekday: "¥1,500", weekend: "¥1,500", band: "¥2,500 for a pair" },
];

/**
 * Online vs at the gate (R08). The calendar is the gate price; the e-Passport is ¥100 off
 * it and the overseas coupon ¥200 off it, both stated on puroland.jp. Ranges are adult Day
 * Passports for 28 Nov 2026 – 31 Jan 2027.
 */
const gateRows = [
  {
    way: "Bottom line: official e-Passport, bought online",
    weekday: "¥3,800 – ¥5,500",
    weekend: "¥5,500 – ¥6,500",
    saving: "¥100 below the gate price",
    reservation: "Included; cancellable until 23:59 the day before",
  },
  {
    way: "Same-day window at the gate",
    weekday: "¥3,900 – ¥5,600",
    weekend: "¥5,600 – ¥6,600",
    saving: "The calendar price (child/senior ¥2,800 – ¥5,500)",
    reservation: "Book separately; same-day slots only while they last",
  },
  {
    way: "Gate + official overseas visitor coupon",
    weekday: "¥3,700 – ¥5,400",
    weekend: "¥5,400 – ¥6,400",
    saving: "¥200 below the gate price; one coupon covers up to 5 people; valid to 31 Mar 2027",
    reservation: "Book separately; you still queue at the window",
  },
  {
    way: "Klook voucher (online travel agency)",
    weekday: "Shown for your date at checkout",
    weekend: "Shown for your date at checkout",
    saving: "Klook's own price and promotions; compare with the e-Passport row for your date",
    reservation: "Follow the voucher's instructions; Klook's cancellation terms shown before you pay",
  },
];

/** Opening hours from the official calendar month files. The answer row first. */
const hoursRows = [
  {
    period: "Bottom line",
    weekday: "Opens 9:00–10:00, closes 17:00 or 18:00",
    weekend: "Opens 8:30 (Dec) or 10:00 (Jan), closes 18:00",
  },
  {
    period: "28 Nov – 27 Dec 2026",
    weekday: "9:00–18:00 or 9:30–17:00 (8:30–18:00 on 11 and 25 Dec)",
    weekend: "8:30–18:00",
  },
  { period: "28 – 31 Dec 2026", weekday: "8:30–18:00 every day", weekend: "8:30–18:00" },
  { period: "1 – 5 Jan 2027", weekday: "10:00–18:00 every day", weekend: "10:00–18:00" },
  {
    period: "8 – 31 Jan 2027",
    weekday: "10:00–17:00",
    weekend: "10:00–18:00 (also Mon 11 Jan, a holiday)",
  },
  {
    period: "Closed days",
    weekday: "3, 9, 10 Dec · 6, 7, 13, 14 Jan · 10, 17, 18, 24, 25 Feb · 10, 11, 17, 18 Mar",
    weekend: "None on weekends to 31 Mar 2027",
  },
  {
    period: "Ticket window",
    weekday: "From 30 minutes before opening to 90 minutes before closing",
    weekend: "Same",
  },
  {
    period: "Time needed",
    weekday: "A full day for both parades and both theatre shows; the Afternoon Passport admits from 14:00",
    weekend: "Same; the longer weekend hours add evening showings",
  },
  {
    period: "Getting there",
    weekday: "5-minute walk from Tama Center (Keio, Odakyu, Tama Monorail)",
    weekend: "About 30 minutes from Shinjuku on the Keio Line limited express",
  },
];

/** Table 2: the answer row first. */
const bookingRows = [
  {
    route: "Official e-Passport — the default",
    when: "Before your date, on puroland.jp (Sanrio+ account). ¥100 below the same-day window price",
    rule: "The only passport with the arrival reservation included. Date-specified; cancellable until the day before",
  },
  {
    route: "Klook voucher + arrival reservation",
    when: "Before you fly, with an English checkout and an overseas card",
    rule: "Klook's own cancellation terms, shown before you pay. Check the voucher for how to register the reservation",
  },
  {
    route: "Lawson / FamilyMart convenience-store ticket",
    when: "In Japan, at the store or on their Japanese websites",
    rule: "Date-specified and non-cancellable; the arrival reservation is a separate booking",
  },
  {
    route: "Same-day window",
    when: "From 30 minutes before opening to 90 minutes before closing",
    rule: "Still needs an arrival reservation; extra same-day slots are added around opening, while they last",
  },
  {
    route: "PUROPASS priority passes",
    when: "Priority entry and parade seats in advance (Lawson Ticket, membership needed); theatre and ride passes in the park on the day",
    rule: "Limited numbers and no refunds after purchase",
  },
];

/** Table 3: the answer row first. */
const busyRows = [
  {
    signal: "A date near the top of the price band",
    meaning: "Puroland prices by expected demand, and widened the bands on 1 August 2026 to spread visitors out",
    action: "Book the passport and the arrival reservation before you fly",
  },
  {
    signal: "A date near ¥3,900 (adult Day Passport)",
    meaning: "The park expects fewer visitors that day",
    action: "The cheapest day to go, and the best pick if your dates are flexible",
  },
  {
    signal: "Busy times at the window",
    meaning: "The official overseas page warns you may have to wait",
    action: "Arrive with an e-ticket rather than queueing to buy one",
  },
  {
    signal: "Closed days",
    meaning: "The park has days with no operation, shown on its schedule",
    action: "Check puroland.jp/schedule/ before you fix the date",
  },
];

/** Table 4: the answer row first. */
const accessRows = [
  {
    from: "Bottom line: Shinjuku on the Keio Line",
    route: "Keio Line limited express bound for Hashimoto to Keio Tama Center; central gate, turn left",
    time: "About 30 minutes, then a 5-minute walk",
    fare: "¥356 by IC card, ¥360 ticket",
  },
  {
    from: "Shinjuku on the Odakyu Line",
    route: "Odakyu Line to Odakyu Tama Center (about 12 minutes from Shin-Yurigaoka); west gate, turn left",
    time: "5-minute walk from the station",
    fare: "Not printed here: check the fare chart at Odakyu Shinjuku",
  },
  {
    from: "Tachikawa",
    route: "Tama Monorail to Tama Center",
    time: "About 23 minutes, then a 5-minute walk",
    fare: "—",
  },
  {
    from: "Narita or Haneda Airport",
    route: "Airport limousine bus to Keio Tama Center",
    time: "About 90 to 140 minutes",
    fare: "¥1,700 from Narita (half for children)",
  },
];

/** Table 5: a day plan built from the official schedules for 19 Nov (Thu) and 21 Nov (Sat) 2026. */
const dayPlanRows = [
  {
    slot: "Bottom line",
    weekday: "Build the day around the 2 parades and one showing each of the 2 theatre shows",
    weekend: "Same plan; the longer weekend hours add evening showings",
  },
  {
    slot: "Opening",
    weekday: "9:30 — take a greeting ticket (digital, issued from opening), then the boat ride",
    weekend: "8:30 — the same, an hour earlier",
  },
  {
    slot: "Morning shows",
    weekday: "beyond words 10:05 · KAWAII KABUKI 11:00",
    weekend: "KAWAII KABUKI 9:45 · beyond words 10:00",
  },
  {
    slot: "The Quest of Wonders Parade",
    weekday: "12:30 and 16:15",
    weekend: "11:00 and 15:00",
  },
  {
    slot: "Afternoon shows",
    weekday: "KAWAII KABUKI 13:30, 14:50 · beyond words 13:35, 15:00",
    weekend: "KAWAII KABUKI 12:20, 13:45, 16:00, 17:20 · beyond words 12:15, 13:45, 16:10, 17:35",
  },
  {
    slot: "With an Afternoon Passport (from 14:00)",
    weekday: "KAWAII KABUKI 14:50 or beyond words 15:00, then the 16:15 parade — park closes 17:00",
    weekend: "Parade 15:00, KAWAII KABUKI 16:00 or 17:20, beyond words 16:10 or 17:35 — closes 18:00",
  },
];

const whoFor = [
  {
    title: "Day Passport if…",
    desc: "You want the parades and the shows, which are the point of Puroland rather than the rides. A full day starts at ¥3,900 for an adult on the cheapest dates and runs to ¥6,900 on the busiest — a gap of ¥3,000 that depends entirely on which day you pick.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z" />
      </svg>
    ),
  },
  {
    title: "Afternoon Passport if…",
    desc: "You are fitting Puroland around something else, or travelling with small children who will not last a full day. It admits you from 14:00 and starts at ¥2,800 for an adult — roughly a thousand yen below the cheapest full day.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
  },
  {
    title: "Shift your date if…",
    desc: "Your schedule has any slack in it. Puroland prices by expected demand and added more price tiers on 1 August 2026 specifically to spread visitors out, so moving a visit to a cheaper date is the single biggest saving available on this ticket.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 10h18M8 2v4M16 2v4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Check the price for your date",
    desc: `Puroland publishes a calendar with a price per date rather than one list price: an adult Day Passport ranges from ¥3,900 to ¥6,900, and some lower prices are not offered at all in busy periods. Open the calendar before the ticket page. Checked ${CHECKED}.`,
  },
  {
    title: "Buy the passport: official e-Passport or Klook",
    desc: "The park recommends its own e-Passport as cheaper than the window, and it is the only passport with the arrival reservation built in; it needs a Sanrio+ account and can be cancelled until the day before. Klook sells the same admission with an English checkout and an e-ticket, which helps if a Japanese site refuses an overseas card.",
  },
  {
    title: "If your ticket is not the official e-Passport, register the arrival reservation",
    desc: `This is the step that catches people out. The official ticket guidance says visitors without an arrival reservation are refused entry and the passport is not refunded, and that a reservation on its own does not admit you either. Checked ${CHECKED}.`,
  },
  {
    title: "Add a PUROPASS only if a show, ride or parade seat matters",
    desc: "Priority entry is ¥1,500 and parade seats run from ¥1,000 to ¥3,000. They sell in limited numbers and cannot be refunded, so buy them after the date is fixed.",
  },
];

const faqItems = [
  {
    q: "How much are Sanrio Puroland tickets in 2026?",
    a: `A Day Passport at the gate is ¥3,900 to ¥6,900 for an adult aged 18–64 and ¥2,800 to ¥5,800 for a child aged 3–17 or a senior aged 65 and over, depending on the date; from 28 November 2026 to 31 January 2027 adult weekdays are ¥3,900 to ¥5,600 and weekends and holidays ¥5,600 to ¥6,600. The Afternoon Passport, entry from 14:00, is ¥2,800 to ¥4,600 for an adult. Children under 3 are free. Checked on puroland.jp, ${CHECKED}.`,
  },
  {
    q: "Is it cheaper to buy Sanrio Puroland tickets online or at the gate?",
    a: `Online, slightly: the official e-Passport is ¥100 below the gate price and is the only ticket with the arrival reservation included. Overseas visitors can also show the official discount coupon from puroland.jp's overseas page at the window for ¥200 off, for up to 5 people, valid to 31 March 2027, but they still need to book the arrival reservation separately. Checked on puroland.jp, ${CHECKED}.`,
  },
  {
    q: "Do you need to book Sanrio Puroland tickets in advance?",
    a: `In practice, yes: entry needs an arrival reservation for your date as well as a passport, and without one you are refused entry. The window still sells passports on the day, from 30 minutes before opening to 90 minutes before closing, but same-day reservations exist only while slots remain. Checked on puroland.jp, ${CHECKED}.`,
  },
  {
    q: "What are Sanrio Puroland's opening hours?",
    a: `Hours change by date: in December 2026 weekends run 8:30–18:00 and weekdays 9:00–18:00 or 9:30–17:00, and in January 2027 the park opens at 10:00 and closes at 17:00 on weekdays or 18:00 on weekends and holidays. It is closed on some Wednesdays and Thursdays, including 3, 9 and 10 December and 6, 7, 13 and 14 January. Checked on the puroland.jp calendar, ${CHECKED}.`,
  },
  {
    q: "Is Sanrio Puroland worth it for adults?",
    a: "Yes, if you like the Sanrio characters: the day is theatre shows such as KAWAII KABUKI, a parade twice a day and character greetings rather than thrill rides, all indoors. An adult aged 18–64 pays the full ¥3,900 to ¥6,900 Day Passport, so a weekday date or the Afternoon Passport from ¥2,800 is the way to keep the cost down.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/sanrio-puroland-tickets") } });

const TITLE = "Sanrio Puroland Tickets 2026: Online vs Gate Price & Hours";
const DESCRIPTION =
  "Sanrio Puroland tickets: adult ¥3,900–¥6,900 at the gate by date, ¥100 less as the official e-Passport. Opening hours, closed days, 30 min from Shinjuku.";

export default function SanrioPurolandTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/sanrio-puroland-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/sanrio-puroland-tickets" />
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
              route: "/guides/attractions/sanrio-puroland-tickets",
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
                { "@type": "ListItem", position: 4, name: "Sanrio Puroland Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/sanrio-puroland-tickets" },
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Sanrio Puroland Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Sanrio Puroland Tickets 2026: <br />Online vs Gate Price &amp; Opening Hours
          </h1>
          <p className={styles.heroSubtitle}>
            The gate price by date, what the official e-Passport and the overseas coupon take off it,
            the opening hours and closed days, and the arrival reservation you also need.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Indoor park"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Answer first */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Sanrio Puroland tickets cost ¥3,900 to ¥6,900 for an adult Day Passport at the gate and ¥2,800
            to ¥5,800 for a child (3–17) or senior (65+), set by the visit date, and the official e-Passport
            bought online is ¥100 less and includes the arrival reservation every visitor needs. From 28
            November 2026 to 31 January 2027 the official calendar prices adult weekdays at ¥3,900 to ¥5,600
            and weekends, holidays and 28 December to 5 January at ¥5,600 to ¥6,600. The park is open{" "}
            {OPEN_TODAY} on Saturday 28 November, 10:00 to 17:00 or 18:00 through January, and is a 5-minute
            walk from Keio Tama Center, about 30 minutes from Shinjuku on the Keio Line. Official figures,
            checked {CHECKED}.
          </p>
        </section>

        {/* Disclosure */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* R03 (19 Nov 2026): the ticket button sits directly under the answer, then the
            same-day hotel and eSIM cards. No Klook or GetYourGuide price. */}
        <div className={styles.pickCtaRow} style={{ marginTop: "0.5rem" }}>
          <KlookLink href={sanrioPurolandTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
            Check Sanrio Puroland tickets for your date on Klook →
          </KlookLink>
          <GygCompareButton slug="sanrio-puroland-tickets" listing={gygSanrioPuroland} />
        </div>

        <KlookSameDayCards
          heading="Booking Puroland? Sort the bed and the data for the same trip"
          cards={sanrioPurolandAnswerCards}
        />

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day Passport at the gate (adult)</p>
                <p className={styles.verdictStatValue}>¥3,900 – ¥6,900</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Official e-Passport online</p>
                <p className={styles.verdictStatValue}>¥100 below the gate</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Also required</p>
                <p className={styles.verdictStatValue}>Arrival reservation</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Shinjuku</p>
                <p className={styles.verdictStatValue}>About 30 min (Keio Line)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the price is set by the date, not by the seller, so open Puroland&apos;s
              calendar and shift the visit to a cheaper day if you can — that is worth up to ¥3,000 per adult.
              Buy the passport before you go, and unless it is the official e-Passport (which includes it),
              register the arrival reservation for the same date, because the park refuses entry without one.
              Checked on puroland.jp, {CHECKED}.
            </p>
            <KlookLink href={sanrioPurolandTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Sanrio Puroland tickets on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much are Sanrio Puroland tickets in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            An adult Day Passport is ¥3,900 to ¥6,900 at the gate and a child or senior Day Passport ¥2,800
            to ¥5,800, set by the date you visit. These are the calendar&apos;s same-day window prices; the
            two middle columns are the ranges it shows for 28 November 2026 to 31 January 2027, with 28
            December to 5 January counted as weekend. February and March 2027 prices are not on the calendar
            yet.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket (gate price)", "Weekdays", "Weekends & holidays", "Full band since 1 Aug 2026"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.weekday}</td>
                      <td className={styles.tdPrice}>{row.weekend}</td>
                      <td>{row.band}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "puroland.jp price calendar", href: "https://www.puroland.jp/ticket/" },
              { label: "puroland.jp passport prices (revised 1 Aug 2026)", href: "https://www.puroland.jp/news/passport_information_2026/" },
              { label: "puroland.jp passport list", href: "https://www.puroland.jp/passport/list/" },
              { label: "puroland.jp PUROPASS", href: "https://www.puroland.jp/puropass/" },
            ]}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Annual Passports are ¥23,000 (digital) or ¥25,000 (card) for anyone 18 and over and ¥12,000 or
            ¥14,000 for a child, with some excluded dates. Groups of 20 or more get a group rate.
          </p>
        </section>

        {/* Online vs at the gate — added 28 Nov 2026 (R08) */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Online vs gate</span>
          <h2 className={styles.sectionTitle}>Is it cheaper to buy Sanrio Puroland tickets online or at the gate?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Online, by ¥100: the official e-Passport costs ¥100 less than the gate price for the same date and
            is the only ticket with the arrival reservation built in. The biggest saving on the gate price is
            the official overseas visitor coupon at ¥200 off, but it still means queueing at the window and
            booking the reservation yourself.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Way to buy", "Adult, weekdays", "Adult, weekends & holidays", "Price vs the gate", "Arrival reservation"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gateRows.map((row) => (
                    <tr key={row.way}>
                      <td className={styles.tdProvider}>{row.way}</td>
                      <td className={styles.tdPrice}>{row.weekday}</td>
                      <td className={styles.tdPrice}>{row.weekend}</td>
                      <td>{row.saving}</td>
                      <td>{row.reservation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "puroland.jp price calendar (same-day window prices)", href: "https://www.puroland.jp/ticket/" },
              { label: "puroland.jp official e-Passport", href: "https://www.puroland.jp/passport/e-passport/" },
              { label: "puroland.jp overseas visitors coupon", href: "https://www.puroland.jp/language/" },
            ]}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Adult Day Passport ranges for 28 November 2026 to 31 January 2027. The e-Passport needs a Sanrio+
            account; the coupon is for one Day or Afternoon purchase at the window and cannot be combined with
            other coupons. A Klook voucher suits you if the Japanese checkout refuses an overseas card.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={sanrioPurolandTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Compare the Klook price for your Puroland date →
            </KlookLink>
          </div>
        </section>

        <KlookSameDayCards
          heading="Book for the same trip as the Puroland passport"
          cards={sanrioPurolandCompareCards}
        />

        {/* Opening hours — added 28 Nov 2026 (R08) */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What are Sanrio Puroland&apos;s opening hours?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Sanrio Puroland opens between 8:30 and 10:00 and closes at 17:00 or 18:00, depending on the date:
            December weekends run 8:30–18:00 and January 2027 days start at 10:00. The park closes on some
            Wednesdays and Thursdays, so check the date before you buy.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Dates", "Weekdays", "Weekends & holidays"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.period}>
                      <td className={styles.tdProvider}>{row.period}</td>
                      <td>{row.weekday}</td>
                      <td>{row.weekend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "puroland.jp schedule and calendar", href: "https://www.puroland.jp/schedule/" },
              { label: "puroland.jp ticket guidance", href: "https://www.puroland.jp/ticket/guidance/" },
              { label: "puroland.jp access", href: "https://www.puroland.jp/access/" },
            ]}
          />
        </section>

        <EsimCtaTop />

        {/* Booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do you need to book Sanrio Puroland tickets in advance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes for the arrival reservation: without one for your date you are refused entry, even with a
            passport. The window does sell passports on the day, but same-day reservations exist only while
            slots remain, so book before you travel — the official e-Passport does both in one purchase.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Way to book", "When", "Cancellation and entry rules"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td>{row.when}</td>
                      <td>{row.rule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "puroland.jp ticket guidance", href: "https://www.puroland.jp/ticket/guidance/" },
              { label: "puroland.jp passport list", href: "https://www.puroland.jp/passport/list/" },
            ]}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Which to choose:</strong> the official e-Passport if the Japanese checkout accepts your
            card; a Klook voucher if it does not, or if you want the cancellation terms in English before you
            pay. Either way, the arrival reservation is the step that decides whether you get in.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={sanrioPurolandTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Sanrio Puroland dates on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Skip-the-line — added 19 Nov 2026 (R03) */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Skip-the-line</span>
          <h2 className={styles.sectionTitle}>Is the Sanrio Puroland skip-the-line ticket worth it?</h2>
          <p className={styles.bodyText}>
            On a weekend or holiday, usually yes. Puroland&apos;s own skip-the-line product is PUROPASS: priority
            entry at ¥1,500 per person (¥2,500 for a pair) lets you into the building before general visitors,
            and passes for the theatres and rides are sold inside the park on the day. The calendar prices dates
            by expected demand, so a date at ¥5,600 or more is the one where getting in first pays off; on a
            weekday near ¥3,900 it matters much less.
          </p>
          <p className={styles.bodyText}>
            Three things to know before you pay. PUROPASS is not admission, so you still need a passport and
            an arrival reservation. The advance passes are sold through Lawson Ticket, which needs a member
            account, in limited numbers and with no refunds. And parade seats are a separate PUROPASS at ¥1,000
            to ¥3,000. If a reseller bundles priority access with the passport, check exactly which pass the
            listing includes. Puroland also runs a VIP Plan with a multilingual guide, priority attractions and
            reserved parade seats; see its overseas visitors page for the current plan. Checked on puroland.jp,{" "}
            {CHECKED}.
          </p>
          <LastChecked
            sources={[
              { label: "puroland.jp PUROPASS", href: "https://www.puroland.jp/puropass/" },
              { label: "puroland.jp overseas visitors page", href: "https://www.puroland.jp/language/" },
            ]}
          />
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do you book Sanrio Puroland tickets?</h2>
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
        </section>

        {/* Busy days */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Crowds</span>
          <h2 className={styles.sectionTitle}>When is Sanrio Puroland busiest?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The price calendar is the best guide: Puroland sets each date&apos;s price by expected demand, so
            the dates at the top of the band are the ones it expects to be fullest.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Signal", "What it means", "What to do"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {busyRows.map((row) => (
                    <tr key={row.signal}>
                      <td className={styles.tdProvider}>{row.signal}</td>
                      <td>{row.meaning}</td>
                      <td>{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "puroland.jp price revision notice", href: "https://www.puroland.jp/news/passport_information_2026/" },
              { label: "puroland.jp overseas visitors page", href: "https://www.puroland.jp/language/" },
              { label: "puroland.jp schedule", href: "https://www.puroland.jp/schedule/" },
            ]}
          />
        </section>

        {/* Which passport */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which passport</span>
          <h2 className={styles.sectionTitle}>Day, Afternoon, or a Different Date?</h2>
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

        <BookingEsimCard lead="Puroland booked? Get mobile data before you land." />

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How do you get to Sanrio Puroland from Shinjuku?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Take the Keio Line limited express bound for Hashimoto from Shinjuku to Keio Tama Center, about
            30 minutes and ¥356 by IC card, and walk about 5 minutes to the park. The Odakyu Line and the Tama
            Monorail also stop at Tama Center.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["From", "Route", "Time", "Fare (adult)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.from}>
                      <td className={styles.tdProvider}>{row.from}</td>
                      <td>{row.route}</td>
                      <td>{row.time}</td>
                      <td>{row.fare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "puroland.jp access", href: "https://www.puroland.jp/access/" },
              { label: "puroland.jp overseas visitors page", href: "https://www.puroland.jp/language/" },
              { label: "keio.co.jp Shinjuku fare table", href: "https://www.keio.co.jp/global/routes/stations/shinjuku/" },
            ]}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Both railways also sell passport bundles: the Keio Amusement Passport, sold at Keio and Inokashira
            Line stations on the day only, adds a Keio and Inokashira one-day rail ticket to a Day Passport and is
            exchanged at the park window, and Odakyu sells an EMot e-passport with an Odakyu round-trip ticket.
            Either still needs an arrival reservation.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            None of those lines is Tokyo Metro or Toei, which means a{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={officialLink}>
              Tokyo Subway Ticket
            </Link>{" "}
            does not cover the trip out here. Pay the Keio or Odakyu fare with an IC card; our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={officialLink}>
              guide to getting around Tokyo
            </Link>{" "}
            covers which card to use.
          </p>
        </section>

        <KlookTripPrep
          label="Book for the same day"
          heading="What Else Is Worth Booking for a Puroland Day?"
          intro="Puroland is a half day indoors at Tama Center, so the base you sleep in and the other half of the day are the bookings left to make."
          items={sanrioPurolandTripPrep}
        />

        {/* Day plan — added 19 Nov 2026 (R03) */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day plan</span>
          <h2 className={styles.sectionTitle}>How should you plan a day at Sanrio Puroland?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Plan around the parade, which runs twice a day, and the two theatre shows, KAWAII KABUKI and
            beyond words, which repeat through the day. The times below are the official schedules for a
            weekday (Thursday 19 November 2026, open 9:30–17:00) and a Saturday (21 November, 8:30–18:00);
            they change by date, so open the schedule for your own day.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["When", "Weekday example (19 Nov)", "Weekend example (21 Nov)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayPlanRows.map((row) => (
                    <tr key={row.slot}>
                      <td className={styles.tdProvider}>{row.slot}</td>
                      <td>{row.weekday}</td>
                      <td>{row.weekend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[{ label: "puroland.jp schedule", href: "https://www.puroland.jp/schedule/" }]}
          />
        </section>

        {/* Adults */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>For adults</span>
          <h2 className={styles.sectionTitle}>Is Sanrio Puroland worth it for adults?</h2>
          <p className={styles.bodyText}>
            Yes, if you like the Sanrio characters: the day is theatre shows, parades and character greetings
            rather than thrill rides, and it is all indoors. Adults aged 18–64 pay the full ¥3,900 to ¥6,900
            Day Passport, so a weekday date or the Afternoon Passport is the way to keep the cost down.
          </p>
          <p className={styles.bodyText}>
            Being indoors also makes it the obvious day to move a rained-out plan to. If the trip is built
            around one Tokyo park day, our{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={officialLink}>
              things to do in Tokyo
            </Link>{" "}
            guide compares it with Disney and the other bookable sights, and the{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={officialLink}>
              Tokyo itinerary with kids
            </Link>{" "}
            gives it a full day of its own.
          </p>
        </section>

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

        {/* Klook picks for the other half of the day. The Puroland CTAs above are unchanged;
            the guided tour is the higher-commission slot and leads. */}
        <KlookTourPicks
          heading="The Other Half of a Puroland Day"
          intro="Puroland runs 3 to 5 hours by its own listing's estimate, which leaves most of a day free — and both of these are booked on the same Klook account as the passport. If the trip is built around character parks rather than temples, the Harry Potter studio tour in Nerima is the closest thing Tokyo has to a second one."
          tours={[tokyoSightseeingBusTour, warnerBrosStudioTourTokyo]}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Another park on the west side of Tokyo: <Link href="/guides/attractions/yomiuriland-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Yomiuriland tickets</Link>, with the One-Day Pass and the evening After Pass.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Sanrio&apos;s second park, <Link href="/guides/attractions/harmonyland-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Sanrio Harmonyland</Link> in Oita, has a day passport at ¥3,600 or ¥4,200.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For Moomin fans, <Link href="/guides/attractions/moominvalley-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Moominvalley Park</Link> in Hanno, Saitama, sells a one-day pass at ¥3,900 in advance.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For Doraemon, the <Link href="/guides/attractions/fujiko-f-fujio-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Fujiko F Fujio (Doraemon) Museum</Link> is ¥1,000 for adults; book a timed ticket in advance.
          </p>
        </section>
        <EsimCtaBottom />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 3 Nov 2026: the family version of the Tokyo route — Disney, LEGOLAND Discovery, Sanrio, child fares. */}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Itinerary with Kids: 5 Days, Day by Day (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/ghibli-park-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c4 0 7 3 7 7 0 5-7 11-7 11S5 15 5 10c0-4 3-7 7-7z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Ghibli Park Tickets (2026): Prices, When They Go On Sale and How to Buy From Overseas</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/legoland-japan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="9" width="16" height="11" rx="2" />
                  <path d="M8 9V6h8v3M9 13h.01M15 13h.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>LEGOLAND Japan Tickets (2026): Prices, Hours and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-2.8L7 19l1-6-4-4 5.5-.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disney Tickets (2026): Disneyland &amp; DisneySea — How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v14H4z" />
                  <path d="M8 5v14M16 5v14M4 10h16M4 14h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Warner Bros. Studio Tour Tokyo Tickets (2026): Prices &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/fuji-q-highland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Fuji-Q Highland Tickets (2026): Free Pass Prices, the Q Pack &amp; How to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-tower-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l4 10h-8l4-10z" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Tower Tickets (2026): Prices, Main Deck vs Top Deck &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l4 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
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
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
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
            <h2 className={styles.ctaBannerTitle}>Hold the passport before you travel</h2>
            <p className={styles.ctaBannerDesc}>
              Klook sells Sanrio Puroland admission with an English checkout and an e-ticket — useful if a
              Japanese attraction site has already refused your card. Remember to register the arrival
              reservation for the same date.
            </p>
            <KlookLink href={sanrioPurolandTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
              View Sanrio Puroland tickets →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
