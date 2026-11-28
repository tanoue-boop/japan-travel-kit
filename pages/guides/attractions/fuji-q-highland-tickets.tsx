import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  fujiQHighlandTripPrep,
  fujiQHighlandQPack,
  fujiQHighlandPass,
  fujiQHighlandAdmission,
  tokyoMtFujiHighwayBus,
  mtFujiPass,
  kawaguchikoYamanakakoBusTour,
  fujikawaguchikoHotels,
  type KlookSameDayCard,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import HotelStayBlock from "../../../components/HotelStayBlock";
import { hreflangLinks } from "../../../components/Hreflang";

// Pass price bands, the free-entry rule, the coaster names and the rail/bus access
// below were first read off fujiq.jp (/en/, /en/ticket/ and /en/access/) on 20 Oct 2026.
// The adult and elementary 1-Day Pass bands are owned by lib/attraction-prices.ts,
// shared with the ticket price table.
//
// Re-read 23 Nov 2026 (task-jtk-20261123-R04), all on the official sites:
// - fujiq.jp/en/ticket/ — free entrance; 1-Day Pass adult 6,000–7,900 yen, junior/senior
//   high 5,500–7,400, elementary 4,400–5,100, toddler (1+) and senior (65+) 2,100–2,600;
//   Afternoon Pass from 13:00 adult 4,100–6,000; Thomas Land Pass adult 3,000–3,500;
//   Sunset Night Pass from 16:00 adult 3,700/4,000; virtual-queue pass = 1-Day Pass +2,000;
//   1-Day Pass with priority admission online only, not sold 1 Dec 2026 – 5 Feb 2027.
// - fujiq.jp/en/ticket/attraction.html — entry 0 yen; Fujiyama, Takabisha, Eejanaika,
//   ZOKKON and Attack on Titan 2,000 yen a ride; the 1,500-yen thrill rides; Thomas Land 500.
// - fujiq.jp/en/ticket/priority.html — priority tickets: price by ride and time, same for
//   all ages, online from 18:00 three days before to 60 min before the slot, limited per day.
// - fujiq.jp/event/tokuQpack_2025.html — Super Toku-Q Pack from Busta Shinjuku: round-trip
//   bus + 1-Day Pass + one priority ride (9:00–10:00), adult 11,100 / junior-senior high
//   10,700 / elementary 7,100 yen. bus.fujikyu.co.jp/otoku/fujiq-beginner/ — Toku-Q Pack is
//   the round-trip direct bus + 1-Day Pass, price by departure point, 30+ departure points.
// - bus.fujikyu.co.jp/highway/detail/id/1 — Shinjuku to Fuji-Q about 1 h 40 min, adult from
//   2,200 yen (2,000 booked online).
// - fujiq.jp/schedule/highland/202611/ and /202612/ — hours by date, closed 10 Dec 2026;
//   Tentekomai closed 5 Oct 2026 – late Jul 2027 (planned), Ferris wheel 9 Nov 2026 – 31 Jan 2027.
// - fujiq.jp/en/relate/ — official-hotel perks: priority admission, luggage kept during the stay.
// Klook answers automated reads of its product pages with HTTP 403, so no Klook price appears.
const P = PRICES.fujiQHighland;
const CHECKED = checkedLabel("2026-11-23");
const LAST_CHECKED = "2026-11-23";
const TICKET_URL = "https://www.fujiq.jp/en/ticket/";
const RIDES_URL = "https://www.fujiq.jp/en/ticket/attraction.html";
const PRIORITY_URL = "https://www.fujiq.jp/en/ticket/priority.html";
const TOKUQ_URL = "https://bus.fujikyu.co.jp/otoku/fujiq-beginner/";
const SUPER_TOKUQ_URL = "https://www.fujiq.jp/event/tokuQpack_2025.html";
const HOURS_URL = "https://www.fujiq.jp/en/schedule/index.html";
const HOTEL_URL = "https://www.fujiq.jp/en/relate/index.html";
const BUS_URL = "https://bus.fujikyu.co.jp/highway/detail/id/1";

const lastChecked = { marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
const verdictRow = { fontWeight: 700 } as const;

// Row 1 is the answer; the rest are adult prices as fujiq.jp lists them.
const priceRows = [
  {
    ticket: "Which to buy",
    price: "4+ big coasters → 1-Day Pass",
    covers: "1–2 rides → free entry and pay per ride; from Tokyo by bus → Toku-Q Pack",
  },
  { ticket: "Park entry (free admission ticket)", price: "Free (¥0)", covers: "Entry only — every ride is paid for at the machines inside" },
  { ticket: "1-Day Pass (the Free Pass)", price: "¥6,000 – ¥7,900 by date", covers: "Unlimited rides all day, apart from the attractions the park lists as excluded" },
  { ticket: "Afternoon Pass", price: "¥4,100 – ¥6,000 by date", covers: "Unlimited rides from 13:00" },
  { ticket: "Sunset★Night Pass", price: "¥3,700 / ¥4,000", covers: "From 16:00 on days the park is open after 19:00; sold at the park on the day only" },
  { ticket: "Thomas Land Pass", price: "¥3,000 – ¥3,500 by date", covers: "All 12 Thomas Land rides; rides outside Thomas Land are extra" },
  { ticket: "1-Day Pass with priority admission", price: "Monthly price table", covers: "Online only; enter before opening, with only the big coasters running in that window; not sold 1 Dec 2026 – 5 Feb 2027" },
  { ticket: "Virtual-queue 1-Day Pass (Bunshin-kun)", price: "1-Day Pass price + ¥2,000", covers: "Queue for selected rides in the Q-chan app; limited numbers, adults to elementary age only" },
  { ticket: "One ride on a big coaster", price: "¥2,000", covers: "Fujiyama, Takabisha, Eejanaika, ZOKKON, Attack on Titan THE RIDE" },
];

const ageRows = [
  { ticket: "Adult (18–64)", day: P.adult, afternoon: "¥4,100 – ¥6,000" },
  { ticket: "Junior / senior high", day: "¥5,500 – ¥7,400", afternoon: "¥3,800 – ¥5,700" },
  { ticket: "Elementary", day: P.child, afternoon: "¥3,500 – ¥4,200" },
  { ticket: "Toddler (1 and over)", day: "¥2,100 – ¥2,600", afternoon: "¥1,700 – ¥2,100" },
  { ticket: "Senior (65+)", day: "¥2,100 – ¥2,600", afternoon: "¥1,700 – ¥2,100" },
];

// Pay per ride, from fujiq.jp/en/ticket/attraction.html. Row 1 is the break-even.
const rideRows = [
  { ride: "Break-even", price: "3 big coasters = ¥6,000", note: "Equal to the pass on its cheapest dates; 4 big coasters (¥8,000) cost more than the pass on any date" },
  { ride: "Fujiyama, Takabisha, Eejanaika, ZOKKON, Attack on Titan THE RIDE", price: "¥2,000 a ride", note: "The rides most visitors come for" },
  { ride: "Tondemina, Tekkotsubanchou, Nagashimasuka, Fuji Airways, Panic Rock, Desperation Fortress, 3D Shooting Ride", price: "¥1,500 a ride", note: "Tentekomai (also ¥1,500) is closed until late July 2027" },
  { ride: "Senritsu Meikyu (haunted hospital)", price: "¥4,000 / ¥8,000 per group", note: "Up to 4 people; ¥4,000 with a 1-Day or Afternoon Pass, ¥8,000 without; sold as a timed ticket" },
  { ride: "Thomas Land rides", price: "¥500 a ride", note: "Or the Thomas Land Pass at ¥3,000 – ¥3,500" },
];

// The Toku-Q Pack, the plain pass and the priority ticket side by side. Row 1 is the answer.
const compareRows = [
  {
    option: "Which to pick",
    price: "—",
    includes: "From Tokyo by bus: Toku-Q Pack. Already near the lakes or on the train: 1-Day Pass. Busy day: add a Priority Ticket.",
  },
  {
    option: "Super Toku-Q Pack (from Busta Shinjuku)",
    price: "¥11,100 adult · ¥10,700 junior/senior high · ¥7,100 elementary",
    includes: "Round-trip highway bus + 1-Day Pass + one priority ride on one coaster, used 9:00–10:00",
  },
  {
    option: "Toku-Q Pack (other departure points)",
    price: "Set by departure point",
    includes: "Round-trip direct bus + 1-Day Pass, from 30+ points around Tokyo and Shizuoka plus Nagoya, Kyoto and Osaka",
  },
  {
    option: "1-Day Pass on its own",
    price: "¥6,000 – ¥7,900 by date",
    includes: "Unlimited rides; no transport",
  },
  {
    option: "Priority Ticket (Fuji-Q's fast pass)",
    price: "By ride and time; same for all ages",
    includes: "Shorter wait on one ride; still needs a pass or a ride ticket. Online from 18:00 three days before",
  },
];

const hoursRows = [
  { when: "Short answer", hours: "Opens 9:00 or 10:00, closes 17:00 – 20:00", note: "Hours change by date — check the month table before you go" },
  { when: "November 2026", hours: "9:00 – 18:00 / 19:00 / 20:00", note: "30 Nov: 10:00 – 17:00; no closed day in November" },
  { when: "December 2026, weekdays to 25 Dec", hours: "10:00 – 17:00", note: "Closed Thursday 10 December" },
  { when: "December 2026, weekends", hours: "9:00 – 18:00", note: "5–6, 12–13 and 19–20 December" },
  { when: "26 – 30 December 2026", hours: "9:00 – 19:00", note: "31 December: 9:00 until 1:00 the next morning" },
  { when: "Rides closed for works", hours: "—", note: "Tentekomai 5 Oct 2026 – late Jul 2027 (planned); Ferris wheel 9 Nov 2026 – 31 Jan 2027; Red Tower for now" },
];

// Under the price table: the bus bundle and bus seat (5%), the lakes tour and a night at the lake (6.5%).
const priceTableCards: KlookSameDayCard[] = [
  {
    label: fujiQHighlandQPack.title,
    ctaLabel: "Check the Fuji-Q Q Pack on Klook →",
    url: fujiQHighlandQPack.url,
    kind: "Pass + bus",
    why: "The 1-Day Pass with a round-trip highway bus from Shinjuku or Ueno on one voucher, with an English checkout.",
  },
  {
    label: tokyoMtFujiHighwayBus.title,
    ctaLabel: "Check the Fuji highway bus →",
    url: tokyoMtFujiHighwayBus.url,
    kind: "Bus",
    why: "Just the seat, for paying per ride or buying the pass at the park. The coach serves Fuji-Q Highland and Kawaguchiko.",
  },
  {
    label: kawaguchikoYamanakakoBusTour.title,
    ctaLabel: "Check the Kawaguchiko bus tour →",
    url: kawaguchikoYamanakakoBusTour.url,
    kind: "Tour",
    why: "For anyone in the group who would rather see the lakes than ride: a guided coach day on the same side of Mt. Fuji.",
  },
  {
    label: fujikawaguchikoHotels.title,
    ctaLabel: "Check Fujikawaguchiko hotels →",
    url: fujikawaguchikoHotels.url,
    kind: "Hotel",
    why: "Kawaguchiko Station is the next stop after the park on the Shinjuku bus, so a night at the lake turns a park day into two.",
  },
];

const whoFor = [
  {
    title: "Toku-Q / Q Pack if…",
    desc: "You are coming from Tokyo without a car. Both bundle the 1-Day Pass with the round-trip highway bus, so the whole day is one booking instead of three — and the bus ends at the park's own terminal rather than at a station you then have to transfer from.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M3 11h18M7 17v3M17 17v3" />
      </svg>
    ),
  },
  {
    title: "Pass only if…",
    desc: "You are already in the Fuji Five Lakes area, or you are arriving by train, and you will ride four or more of the big coasters. The 1-Day Pass is ¥6,000 to ¥7,900 for an adult; four big coasters at ¥2,000 each come to ¥8,000.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
        <path d="M3 21h18" />
      </svg>
    ),
  },
  {
    title: "Entry only if…",
    desc: "The rides are not the point. Entry to Fuji-Q is free, and you can pay for individual attractions at the machines inside — the sensible route if you are there for the Mt. Fuji views, the Naruto and Thomas areas, or one or two coasters.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20l6-12 3 5 2-3 7 10z" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Know that entry is free — the pass is for the rides",
    desc: `Fuji-Q's own ticket page says the park is free to enter, with ride tickets sold at machines inside. So the question is never whether to buy a ticket; it is whether to buy the 1-Day Pass or pay per ride. Checked ${CHECKED}.`,
  },
  {
    title: "Check the price for your date, not the headline figure",
    desc: `The pass is priced by date: ¥6,000 to ¥7,900 for an adult 1-Day Pass, and ¥4,100 to ¥6,000 for the Afternoon Pass from 13:00. Fuji-Q publishes month-by-month tables, so look up the date you are actually going before you budget for it. Checked ${CHECKED}.`,
  },
  {
    title: "Decide how you are getting there before you buy the pass",
    desc: "This is what separates the bundles from the plain pass. The Toku-Q Pack and Klook's Q Pack include the round-trip highway bus from Tokyo; the plain pass does not. If you are travelling by train — JR to Otsuki, then the Fujikyuko Line to Fuji-Q Highland Station — the plain pass is the one you want.",
  },
  {
    title: "Check the hours and the ride closures for your date",
    desc: `Hours move by date — 10:00 to 17:00 on most December weekdays, 9:00 to 18:00 on December weekends — and the monthly page lists which rides are closed each day. Tentekomai is closed until late July 2027 for construction. Checked ${CHECKED}.`,
  },
];

// The first five go into FAQPage, ordered by the searches this page answers.
const faqItems = [
  {
    q: "How much are Fuji-Q Highland tickets in 2026?",
    a: `Entry to Fuji-Q Highland is free. What costs money is riding: the 1-Day Pass is ¥6,000 to ¥7,900 for an adult aged 18–64, ¥5,500 to ¥7,400 for a junior or senior high-school student, ¥4,400 to ¥5,100 for an elementary-school child and ¥2,100 to ¥2,600 for a toddler aged 1 and over or a senior aged 65 and over. The Afternoon Pass, valid from 13:00, is ¥4,100 to ¥6,000 for an adult. A single ride on a big coaster is ¥2,000. Figures read off fujiq.jp on ${CHECKED}.`,
  },
  {
    q: "Is entry to Fuji-Q Highland free?",
    a: `Yes. The official ticket page states that Fuji-Q Highland has free entrance — the free admission ticket is ¥0 — and that visitors buy ride tickets from machines inside the park. Someone in your group who does not ride can come in, see the park and the Mt. Fuji views, and pay nothing. Checked ${CHECKED}.`,
  },
  {
    q: "Is the Fuji-Q Free Pass worth it, or should I pay per ride?",
    a: `Count the big coasters. Fujiyama, Takabisha, Eejanaika, ZOKKON and Attack on Titan THE RIDE are ¥2,000 a ride, so three of them cost ¥6,000 — the 1-Day Pass's cheapest price — and four cost ¥8,000, more than the pass on any date (¥6,000 to ¥7,900). Ride four or more and buy the pass; ride one or two and pay per ride. Ride prices read on fujiq.jp, ${CHECKED}.`,
  },
  {
    q: "What is the Toku-Q Pack?",
    a: `Fujikyu's own set ticket: a round-trip direct highway bus to Fuji-Q Highland plus the 1-Day Pass, sold from more than 30 departure points around Tokyo and Shizuoka and from Nagoya, Kyoto and Osaka, with the price set by departure point. From Busta Shinjuku the Super Toku-Q Pack adds one priority ride on one coaster between 9:00 and 10:00, at ¥11,100 for an adult, ¥10,700 for a junior or senior high-school student and ¥7,100 for an elementary-school child. Read on fujiq.jp and bus.fujikyu.co.jp, ${CHECKED}.`,
  },
  {
    q: "Does Fuji-Q Highland have a fast pass?",
    a: `Yes — Fuji-Q calls it a Priority Ticket. It cuts the wait on one of the popular rides on its list, is priced by ride and time at the same price for all ages, and goes on sale online from 18:00 three days before until 60 minutes before your slot, in limited numbers. You still need a 1-Day Pass or a ride ticket as well. A separate 1-Day Pass with priority admission lets you in before opening, but is not sold from 1 December 2026 to 5 February 2027. Read ${CHECKED}.`,
  },
  {
    q: "How do I get to Fuji-Q Highland from Shinjuku?",
    a: `By the Fujikyu highway bus from Busta Shinjuku, about 1 hour 40 minutes to the Fuji-Q Highland stop, from ¥2,200 for an adult (¥2,000 booked online); traffic can make it longer. Fuji-Q Highland is the stop before Kawaguchiko Station. The Toku-Q Pack and the Q Pack on Klook both bundle a round-trip bus with the 1-Day Pass. Bus times read on Fujikyu's site, ${CHECKED}.`,
  },
  {
    q: "Where can I buy Fuji-Q Highland tickets in advance?",
    a: `On Fuji-Q's official online ticket site, which sells the 1-Day Pass, the Afternoon Pass, the Thomas Land Pass and the online-only priority-admission pass, or on Klook, which sells the pass and the bus-inclusive Q Pack. The Toku-Q Pack is sold on Fuji-Q's official online site and by the Fujikyu call centre. Official tickets cannot be refunded or changed in number or age group after purchase. Read ${CHECKED}.`,
  },
  {
    q: "What are Fuji-Q Highland's opening hours?",
    a: `They change by date. In November 2026 the park opens at 9:00 and closes between 18:00 and 20:00; in December most weekdays are 10:00 to 17:00 and weekends 9:00 to 18:00, with the park closed on 10 December. Fuji-Q publishes a monthly table and a daily list of closed rides. Read on fujiq.jp, ${CHECKED}.`,
  },
  {
    q: "What are the main roller coasters at Fuji-Q Highland?",
    a: "Fujiyama, billed as the King of Coasters; Eejanaika, a fourth-dimension hypercoaster; Takabisha, billed as the steepest roller coaster; and ZOKKON — all ¥2,000 a ride. Tentekomai, the sky roller, is closed from 5 October 2026 to late July 2027 (planned) while a new ride is built. There are also themed areas built around Naruto, Thomas the Tank Engine and San-X characters.",
  },
  {
    q: "Can you see Mt. Fuji from Fuji-Q Highland?",
    a: "The park sits at the foot of the mountain near Kawaguchiko, and the mountain is the backdrop to it on a clear day. As anywhere in the Fuji Five Lakes, visibility depends on the weather, and the cooler, drier months give better odds than midsummer. Treat it as the reason to pick a clear forecast rather than a guarantee.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/fuji-q-highland-tickets") } });

// Title and H1 open with the same words, so Google has one wording to show (16 Nov 2026, C01).
// 23 Nov 2026 (R04): price, free entry and the Free Pass in the title, for "fuji-q highland tickets",
// "fuji q highland entrance fee" and "fuji q pass".
const TITLE = "Fuji-Q Highland Tickets 2026: Price, Free Entry & Free Pass";
const DESCRIPTION =
  "Fuji-Q Highland tickets 2026: entry is free, the 1-Day Pass is ¥6,000–¥7,900 by date and big coasters are ¥2,000 a ride — ride 4+ and the pass wins.";

export default function FujiQHighlandTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/fuji-q-highland-tickets" />
        {hreflangLinks("/guides/attractions/fuji-q-highland-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/fuji-q-highland-tickets" />
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
              mainEntity: faqItems.slice(0, 5).map((item) => ({
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
              route: "/guides/attractions/fuji-q-highland-tickets",
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
                { "@type": "ListItem", position: 4, name: "Fuji-Q Highland Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/fuji-q-highland-tickets" },
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
          <span className={styles.breadCurrent}>Fuji-Q Highland Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Fuji-Q Highland Tickets 2026: <br />Price, Free Entry and the Free Pass
          </h1>
          <p className={styles.heroSubtitle}>
            Entry to the park is free — what you are buying is the right to ride. The 1-Day Pass, the
            pass and the bus in one Toku-Q Pack, or a ¥2,000 ticket per coaster: which one comes out cheaper
            depends on how many rides you want.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Free park entry"].map((t) => (
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

        {/* Lead paragraph: the whole answer, in the body rather than the hero (23 Nov 2026, R04). */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>Fuji-Q Highland is free to enter, and its 1-Day Pass (the Free Pass) costs ¥6,000 to ¥7,900</strong>{" "}
            for an adult depending on the date. The big coasters — Fujiyama, Takabisha, Eejanaika and ZOKKON —
            are ¥2,000 a ride, so <strong>if you will ride four or more, buy the Free Pass</strong>; for one or
            two, pay per ride. From Busta Shinjuku, the Super Toku-Q Pack puts the round-trip bus, the 1-Day Pass
            and one priority ride on one ticket for ¥11,100 for an adult. Prices read on fujiq.jp, {CHECKED}.
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
                <p className={styles.verdictStatLabel}>Park entry</p>
                <p className={styles.verdictStatValue}>Free</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1-Day Pass (adult)</p>
                <p className={styles.verdictStatValue}>¥6,000 – ¥7,900</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Big coaster, one ride</p>
                <p className={styles.verdictStatValue}>¥2,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Tokyo</p>
                <p className={styles.verdictStatValue}>Toku-Q / Q Pack (pass + bus)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> do not buy an entry ticket — entry is free. Buy the 1-Day Pass if you
              will ride four or more big coasters, the Afternoon Pass if you are arriving after lunch, or nothing
              at all and pay per ride at the machines inside. Coming from Tokyo without a car, book the pass
              with the round-trip bus attached: Fujikyu&apos;s Toku-Q Pack or Klook&apos;s Q Pack. Prices read
              off fujiq.jp on {CHECKED}.
            </p>
            <KlookLink href={fujiQHighlandQPack.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check the Fuji-Q Q Pack on Klook →
            </KlookLink>
          </div>
        </div>

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="kawaguchiko" areas={["fujiQ", "kawaguchikoStation", "lakeKawaguchi"]} />

        <EsimCtaTop />

        {/* Price table — question heading, answer row first (23 Nov 2026, R04). */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Are Fuji-Q Highland Tickets?</h2>
          <p className={styles.bodyText}>
            Entry is free; the 1-Day Pass is ¥6,000 to ¥7,900 for an adult by date, and a big coaster is ¥2,000
            a ride. Every ticket Fuji-Q sells, with what it covers:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Adult price", "What it covers"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row, i) => (
                    <tr key={row.ticket} style={i === 0 ? verdictRow : undefined}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={lastChecked}>
            Last checked: {LAST_CHECKED} · {TICKET_URL} · {RIDES_URL}
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            1-Day and Afternoon Pass prices by age
          </h3>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Age group", "1-Day Pass", "Afternoon Pass (from 13:00)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ageRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.day}</td>
                      <td className={styles.tdPrice}>{row.afternoon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The park prices by date and publishes month-by-month tables, so check the figure for your own date.
            Toddlers buy a QR ticket online or at the ticket booth on the day.
          </p>
          <p className={styles.bodyText} style={lastChecked}>
            Last checked: {LAST_CHECKED} · {TICKET_URL}
          </p>
        </section>

        {/* Klook straight under the price table: Q Pack and bus seat 5%, lakes tour and hotel 6.5%. */}
        <KlookSameDayCards
          heading="Book the park day: pass with the bus, the bus alone, the lakes tour, or a night at the lake"
          cards={priceTableCards}
          footnote={
            <>
              For inns on the lake with Mt. Fuji from the room, see our{" "}
              <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view">Kawaguchiko ryokan with a Mt Fuji view</Link>.
            </>
          }
        />

        {/* Free entry */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Entry</span>
          <h2 className={styles.sectionTitle}>Is Entry to Fuji-Q Free?</h2>
          <p className={styles.bodyText}>
            Yes. Fuji-Q Highland&apos;s official ticket page says the park is free to enter: the free admission
            ticket is ¥0, applied for at the ticket counter or online, and every ride is then paid for with a
            ride ticket from the machines inside — or covered by a pass. That makes Fuji-Q unusual among big
            Japanese parks, and useful for mixed groups: anyone who does not ride can come in for the Mt. Fuji
            views and the Naruto, Thomas Land and San-X areas and pay nothing. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The park leads with its coasters — Fujiyama, the King of Coasters; the fourth-dimension Eejanaika;
            the steep-drop Takabisha; and ZOKKON. Tentekomai, the sky roller, is closed from 5 October 2026 to
            late July 2027 (planned) while a new ride is built.
          </p>
        </section>

        {/* Pay per ride */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pass or pay per ride</span>
          <h2 className={styles.sectionTitle}>Fuji-Q Free Pass vs Pay-Per-Ride: Which Is Cheaper?</h2>
          <p className={styles.bodyText}>
            The Free Pass is cheaper from the fourth big coaster: four rides at ¥2,000 come to ¥8,000, above the
            pass&apos;s ¥7,900 top price, and three come to ¥6,000, equal to its lowest. Ride prices from the
            official attraction price list:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ride", "Price per ride", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rideRows.map((row, i) => (
                    <tr key={row.ride} style={i === 0 ? verdictRow : undefined}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.ride}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={lastChecked}>
            Last checked: {LAST_CHECKED} · {RIDES_URL}
          </p>
        </section>

        {/* Toku-Q, pass, fast pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Toku-Q Pack</span>
          <h2 className={styles.sectionTitle}>What Is the Toku-Q Pack?</h2>
          <p className={styles.bodyText}>
            The Toku-Q Pack is Fujikyu&apos;s set ticket of a round-trip direct highway bus to Fuji-Q Highland
            plus the 1-Day Pass, priced by where you leave from. From Busta Shinjuku the Super Toku-Q Pack also
            includes one priority ride on one coaster between 9:00 and 10:00, at ¥11,100 for an adult. For
            comparison, the Shinjuku bus booked online (¥2,000 each way) and the pass bought separately come to
            ¥10,000 to ¥11,900 depending on the date.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Price", "What is included"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row.option} style={i === 0 ? verdictRow : undefined}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.includes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={lastChecked}>
            Last checked: {LAST_CHECKED} · {SUPER_TOKUQ_URL} · {TOKUQ_URL} · {PRIORITY_URL} · {BUS_URL}
          </p>
          <p className={styles.bodyText}>
            The Priority Ticket is the park&apos;s fast pass: it shortens the wait on one ride on Fuji-Q&apos;s list
            (Fujiyama, ZOKKON, Takabisha and Eejanaika among them), costs the same for every age, and sells in
            limited numbers — up to 10 per purchase — online from 18:00 three days before until 60 minutes
            before your slot, or at the machines by each ride on the day. It does not replace the pass; you
            still need a 1-Day Pass or a ride ticket. Checked {CHECKED}.
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Toku-Q Pack, Pass, or Nothing at All?</h2>
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

        {/* Where to buy */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Buying ahead</span>
          <h2 className={styles.sectionTitle}>Where to Buy Fuji-Q Tickets in Advance?</h2>
          <p className={styles.bodyText}>
            Two places: Fuji-Q&apos;s official online ticket site or Klook. The official site sells the 1-Day Pass,
            the Afternoon Pass and the Thomas Land Pass for a date, plus the online-only 1-Day Pass with priority
            admission and the virtual-queue pass (until the day before). The Toku-Q Pack is sold through the same
            official site or the Fujikyu call centre. Official tickets cannot be refunded, or changed in number
            or age group, after purchase; the Sunset★Night Pass is sold only at the park on the day, from 16:00.
            Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Klook sells the 1-Day Pass, an admission ticket and the Q Pack — the pass with a round-trip highway
            bus from Shinjuku or Ueno — with an English checkout. A day here also fits a week in the city: our{" "}
            <Link href="/guides/attractions/tokyo-7-day-itinerary">Tokyo 7-day itinerary</Link> puts the Fuji day on
            Day 6, and the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices">Japan attraction ticket prices</Link>{" "}
            table sets Fuji-Q against the other big parks.
          </p>
        </section>

        {/* The three Klook listings, Q Pack (bus-inclusive) first. */}
        <KlookTourPicks
          heading="The Three Fuji-Q Listings on Klook, in Order"
          intro="All three are the same park; what differs is whether the transport and the rides are in the price. The Q Pack is the one to book from Tokyo, the plain pass if you are arriving by train, and the admission ticket if you are going for the views and the themed areas rather than the coasters."
          tours={[fujiQHighlandQPack, fujiQHighlandPass, fujiQHighlandAdmission]}
        />

        {/* Hotel */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Staying over</span>
          <h2 className={styles.sectionTitle}>Is Highland Resort Hotel &amp; Spa Worth It?</h2>
          <p className={styles.bodyText}>
            It is worth it if you want to be on the coasters before the day visitors arrive. Highland Resort Hotel
            &amp; Spa is Fuji-Q&apos;s official hotel, directly connected to the park with Mt. Fuji in front, and
            Fuji-Q lists two perks for official-hotel guests: priority admission to the park (with only some
            attractions running in that window) and luggage kept for you during the stay. The highway bus
            terminal is in the hotel&apos;s own car park, and the hotel has Thomas and Naruto character rooms, with
            a Sumikko Gurashi room opening on 28 November. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            If the view and a hot spring matter more than an early start on the rides, Kawaguchiko is one stop
            on, and our{" "}
            <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view">Kawaguchiko ryokan with a Mt Fuji view</Link>{" "}
            guide compares six inns there. Travelling with children, our{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids">Tokyo itinerary with kids</Link> shows where
            a day out fits around Disney and the indoor days.
          </p>
          <p className={styles.bodyText} style={lastChecked}>
            Last checked: {LAST_CHECKED} · {HOTEL_URL}
          </p>
        </section>

        {/* Hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What Are Fuji-Q Highland&apos;s Opening Hours?</h2>
          <p className={styles.bodyText}>
            Fuji-Q opens at 9:00 or 10:00 and closes between 17:00 and 20:00 depending on the date, and it has
            occasional closed days — 10 December in 2026.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["When", "Hours", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row, i) => (
                    <tr key={row.when} style={i === 0 ? verdictRow : undefined}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td className={styles.tdPrice}>{row.hours}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={lastChecked}>
            Last checked: {LAST_CHECKED} · {HOURS_URL}
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book Fuji-Q Highland Tickets</h2>
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

        <BookingEsimCard lead="Fuji-Q booked? Get mobile data before you land." />

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Fuji-Q Highland From Tokyo?</h2>
          <p className={styles.bodyText}>
            By the Fujikyu highway bus from Busta Shinjuku, about 1 hour 40 minutes to the Fuji-Q Highland stop,
            from ¥2,200 for an adult (¥2,000 booked online), and more in traffic. The highway bus terminates at a
            bus terminal in the Highland Resort Hotel &amp; Spa car park, at the park itself. By rail, the route is
            a JR service to Otsuki and then the Fujikyuko Line to Fuji-Q Highland Station. Last checked:{" "}
            {LAST_CHECKED} · {BUS_URL}
          </p>
          <p className={styles.bodyText}>
            That difference is why the bus-inclusive packs exist and why they are usually the better buy for a
            day trip: the coach drops you at the gate and takes you back, and there is no rail transfer at
            Otsuki to time. If you would rather keep the day flexible, our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              independent Mt. Fuji day trip guide
            </Link>{" "}
            covers the same corridor without a park ticket attached, the{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kawaguchiko day trip from Tokyo
            </Link>{" "}
            guide sets out the lake one stop further on, and the{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              Mt. Fuji day tour comparison
            </Link>{" "}
            is the route for anyone in the group heading for the Fifth Station instead.
          </p>
        </section>

        <KlookTripPrep
          label="Book for the same day"
          heading="What Else Is Worth Booking for a Fuji-Q Day?"
          intro="The park ticket settles the day itself. The base you leave from and the lakes on either side of it are the other bookings this trip takes."
          items={fujiQHighlandTripPrep}
        />

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

        {/* Transport-only alternatives for anyone skipping the Q Pack. */}
        <KlookTourPicks
          heading="Getting There Without the Q Pack"
          intro="If you already have a pass, or you want the Fuji Five Lakes rather than the coasters, these two cover the journey on their own — the highway bus serves Fuji-Q Highland and Kawaguchiko, and the area pass covers the local buses and trains once you are there."
          tours={[tokyoMtFujiHighwayBus, mtFujiPass]}
        />

        <p className={styles.bodyText}>
          Shinjuku, where the Fuji-Q bus leaves from, is also the first-trip pick in our <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo</Link> guide.
        </p>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Seeing more of the lakes around the park? Fujikyu&apos;s <Link href="/guides/transport/mt-fuji-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Mt. Fuji Pass</Link> covers the buses and trains round Mt. Fuji for one to three days.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Nearby on Lake Kawaguchi, the <Link href="/guides/attractions/mt-fuji-panoramic-ropeway-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Mt. Fuji Panoramic Ropeway</Link> is ¥1,200 return and the <Link href="/guides/attractions/kawaguchiko-music-forest-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kawaguchiko Music Forest Museum</Link> ¥1,800 on weekdays.
          </p>
        </section>
        <EsimCtaBottom />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
                  <path d="M5 12l4-7 4 6 2-2 4 5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20l6-12 3 5 2-3 7 10z" />
                  <line x1="2" y1="20" x2="22" y2="20" />
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
                  <rect x="3" y="5" width="18" height="12" rx="2" />
                  <path d="M3 11h18M7 17v3M17 17v3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
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
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <h2 className={styles.ctaBannerTitle}>One booking for the whole day</h2>
            <p className={styles.ctaBannerDesc}>
              The Q Pack puts the 1-Day Free Pass and the round-trip highway bus from Shinjuku or Ueno on one
              voucher, with an English checkout — which is the difference between a day trip and a logistics
              exercise.
            </p>
            <KlookLink href={fujiQHighlandQPack.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
              View the Fuji-Q Q Pack →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
