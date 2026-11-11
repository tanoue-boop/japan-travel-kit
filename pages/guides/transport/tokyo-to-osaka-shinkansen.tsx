import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import KlookLink from "../../../components/KlookLink";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import fares from "../../../data/jr-fares.json";
import {
  dotonboriDaytimeFoodTour,
  jrPassWholeJapan,
  klookEsim,
  osakaAmazingPass,
  shinkansenTokyoOsaka,
  tokyoOsakaArrivalPrep,
  tokyoOsakaArrivalStayAreas,
} from "../../../lib/klook-links";

/**
 * Tokyo to Osaka on the Tokaido Shinkansen, added 4 Nov 2026. The site's other
 * Tokaido leg pages are tokyo-to-kyoto (the bus-versus-train comparison),
 * kyoto-to-tokyo-shinkansen and tokyo-to-nagoya-shinkansen; this one answers the
 * whole-line question and carries the fare change JR announced on 16 Oct 2026.
 *
 * What is printed here and where it came from, all read on 4 November 2026:
 *  - "Travel from Tokyo Station to Shin-Osaka in just 2 hours 21 minutes", "For the
 *    best view of Mt. Fuji, choose Seat E in Standard Class or Seat D in Green Class"
 *    and the non-reserved car numbers (Nozomi 1–2, Hikari 1–5, Kodama 1–6 and 13–16),
 *    from JR Central's Shinkansen Perfect Guide;
 *  - up to 18 trains an hour and about 383 a day (FY2024) on the whole line, from
 *    JR Central's own Tokaido Shinkansen page;
 *  - ¥14,720 Nozomi and ¥14,400 Hikari/Kodama reserved Ordinary, "about 2h30", "about
 *    3 hours" and "about 4 hours", from JR Tokai Tours' station guide (a July 2026 page);
 *  - ¥14,720 → ¥15,420 reserved and ¥19,590 → ¥23,290 Green, tickets bought from
 *    1 July 2027 and Green boarding from 15 December 2027, with non-reserved
 *    unchanged, from the JR Central / JR West joint release of 16 October 2026;
 *  - ¥14,520 Nozomi and ¥14,200 Hikari/Kodama reserved, ¥19,390 and ¥19,070 Green,
 *    ¥7,250 and ¥7,090 child, and the ±¥200 / +¥400 season rule, from smart-ex.jp's
 *    two smartEX Service price tables, both "As of April 1, 2025";
 *  - smartEX on sale from 5:30 one year ahead, seats confirmed after 8:00 one month
 *    ahead, free changes up to 4 minutes before departure, from smart-ex.jp;
 *  - that non-reserved is ¥530 less than the regular reserved charge, from JR
 *    Central's ticket rules. No operator table for the Tokyo–Shin-Osaka non-reserved
 *    fare could be read, so ¥13,870 is that rule applied to ¥14,400 and is labelled;
 *  - the ¥4,960 Tokyo–Shin-Osaka NOZOMI/MIZUHO ticket and its rules, from
 *    japanrailpass.net and JR Central's own page for it;
 *  - the pass prices, from japanrailpass.net's price page;
 *  - the eight 2026–27 all-reserved Nozomi periods, from railway.jr-central.co.jp/nozomi/;
 *  - the baggage rule, from JR Central's oversized-baggage page;
 *  - 345 trains on 10 Nov 2026, 06:00 first, 21:31 last, three seat classes and zero
 *    transfers, from Klook's rail page, which answers automated reads. That page also
 *    shows a shortest time of 2h 14m, which no JR source supports, so the headline
 *    figure is JR Central's and the page says so.
 *
 * The highway-bus time is a booking site's, labelled as such, and no flight time is
 * printed because neither ANA's nor JAL's pages stated one. No Klook price appears.
 */

const OWN = checkedLabel("2026-11-04");

const tokyoOsaka = fares.segments.find((s) => s.id === "tokyo-shin-osaka")!;

const WINDOW_NOZOMI = "¥14,720";
const WINDOW_HIKARI = "¥14,400";
const SMART_NOZOMI = "¥14,520";
const SMART_HIKARI = "¥14,200";
const NON_RESERVED = "about ¥13,870";
const NOZOMI_TICKET = "¥4,960";
const JR_PASS_ONLINE = "¥50,000";
const JR_PASS_ORDER = "¥53,000";

/** Only the periods still ahead on the date this page was read. */
const nozomiAllReservedPeriods = [
  "21 – 23 November 2026",
  "25 December 2026 – 5 January 2027",
  "9 – 11 January 2027",
  "20 – 22 March 2027",
];

const trainRows = [
  {
    train: "Nozomi",
    time: "2h 21m fastest; about 2h 30m typical",
    stops: "Shinagawa, Shin-Yokohama, Nagoya, Kyoto as standard",
    pass: "Not without the ¥4,960 ticket",
    source: `JR Central Perfect Guide and JR Tokai Tours, ${OWN}`,
  },
  {
    train: "Hikari",
    time: "About 3 hours",
    stops: "More stops than the Nozomi, including Shizuoka or Hamamatsu on some services",
    pass: "Yes",
    source: `JR Tokai Tours, ${OWN}`,
  },
  {
    train: "Kodama",
    time: "About 4 hours",
    stops: "All 17 stations on the line",
    pass: "Yes",
    source: `JR Tokai Tours, ${OWN}`,
  },
];

const frequencyRows = [
  {
    item: "Trains on the booking page",
    value: "345 on 10 Nov 2026",
    detail: "Klook's count for its sample date, Tokyo to Osaka, with no transfer on any of them",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "First and last train",
    value: "06:00 and 21:31",
    detail: "On the same sample date. Check your own date: holiday timetables move the last trains",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Whole-line frequency",
    value: "Up to 18 trains an hour",
    detail: "About 383 trains a day across the Tokaido Shinkansen in FY2024, so a missed train is rarely a long wait",
    source: `global.jr-central.co.jp, ${OWN}`,
  },
];

const priceRows = [
  {
    ticket: "Reserved Ordinary, Nozomi",
    window: WINDOW_NOZOMI,
    smart: SMART_NOZOMI,
    note: "The ticket most travellers buy. ¥15,420 at the window for tickets bought from 1 July 2027",
  },
  {
    ticket: "Reserved Ordinary, Hikari or Kodama",
    window: WINDOW_HIKARI,
    smart: SMART_HIKARI,
    note: "¥320 less than the Nozomi for a journey about half an hour longer on a Hikari",
  },
  {
    ticket: "Non-reserved Ordinary",
    window: NON_RESERVED,
    smart: "Not read",
    note: "Our working: JR Central's ¥530 reduction from the ¥14,400 reserved fare. Unchanged by the 2027 revision",
  },
  {
    ticket: "Green Car, Nozomi",
    window: "¥19,590",
    smart: "¥19,390",
    note: "¥23,290 at the window once both 2027 changes apply, for boarding from 15 December 2027",
  },
  {
    ticket: "Green Car, Hikari or Kodama",
    window: "Not read",
    smart: "¥19,070",
    note: "The smartEX table's regular-season figure",
  },
  {
    ticket: "Reserved Ordinary, child",
    window: "Not read",
    smart: "¥7,250 Nozomi, ¥7,090 Hikari",
    note: "The smartEX child tables. Peak and off-peak changes are half the adult amount",
  },
];

const compareRows = [
  {
    option: "A reserved Nozomi each way",
    cost: `${SMART_NOZOMI} one way, ¥29,040 return on smartEX`,
    pick: "The default for a Tokyo–Osaka return. You are on the fastest train and spend ¥20,960 less than the cheapest 7-day pass.",
  },
  {
    option: "JR Pass on the Hikari",
    cost: `${JR_PASS_ONLINE} online, ${JR_PASS_ORDER} from an overseas agency`,
    pick: "Only if the same seven days also reach Hiroshima, Kanazawa or Tohoku. At smartEX prices it takes four Nozomi one-ways to pass ¥50,000.",
  },
  {
    option: "JR Pass plus the Nozomi ticket",
    cost: `${JR_PASS_ONLINE} plus ${NOZOMI_TICKET} each way`,
    pick: "Worth it for the half hour on a day with a flight or timed booking. JR charges the same for reserved, non-reserved and Green.",
  },
  {
    option: "Non-reserved Ordinary",
    cost: NON_RESERVED,
    pick: "Fine outside the peak periods with hand luggage. Oversized bags cannot use it, because the baggage seats are in reserved cars.",
  },
];

const bookingRows = [
  {
    route: "smartEX (JR's own site or app)",
    how: "Register with a compatible credit card, then buy from 5:30 one year before boarding until 4 minutes before departure. Seats are confirmed after 8:00 one month before travel, and you board with a QR code or IC card.",
    cancel: "Change your train free as often as you like, up to 4 minutes before departure and within 3 months of purchase. Refunds carry a fee.",
  },
  {
    route: "Klook's rail page",
    how: "Pick the date, train and seat class on the Tokyo to Osaka route page, with non-reserved, reserved and Green Car listed.",
    cancel: "Klook's own terms apply and are shown at checkout, so read them before you pay.",
  },
  {
    route: "Station machine or ticket office",
    how: "Paper tickets at Tokyo Station on the day. Reserved seats at JR stations go on sale at 10:00 one month before the train leaves its first station.",
    cancel: "Ask at the ticket office. This is also where a JR Pass holder buys the Nozomi ticket.",
  },
];

const altRows = [
  {
    option: "Shinkansen (Nozomi)",
    time: "2h 21m fastest",
    cost: `${SMART_NOZOMI} reserved on smartEX`,
    verdict: "City centre to Shin-Osaka, every few minutes at peak. The answer for nearly every first trip.",
    source: `JR Central and smart-ex.jp, ${OWN}`,
  },
  {
    option: "Overnight highway bus",
    time: "About 8 to 9 hours",
    cost: "Varies by date, operator and seat; check the listing",
    verdict: "The cheapest option, and it saves a hotel night if you can sleep on a coach. A bad fit with large cases.",
    source: `kosokubus.com, a booking site rather than an operator, ${OWN}`,
  },
  {
    option: "Flight, Haneda to Itami or Kansai",
    time: "No figure printed",
    cost: "Varies by date and airline",
    verdict: "ANA's and JAL's own pages checked do not give a published flight time, so none is printed here. Add airport transfers at both ends before comparing it with the train.",
    source: `ana.co.jp and jal.co.jp, ${OWN}`,
  },
];

const faqItems = [
  {
    q: "How long is the shinkansen from Tokyo to Osaka?",
    a: `2 hours 21 minutes at the fastest, on JR Central's own figure for a Nozomi from Tokyo Station to Shin-Osaka, with no transfer. Most Nozomi take about 2 hours 30 minutes, the Hikari about 3 hours and the all-stops Kodama about 4 hours, on JR Tokai Tours' station guide. All read on ${OWN}. Klook's booking page also shows 2h 14m as its shortest time, which no JR source supports, so plan on the JR figure.`,
  },
  {
    q: "How much is the Tokyo to Osaka shinkansen?",
    a: `${WINDOW_NOZOMI} one way for a reserved Ordinary seat on a Nozomi at the station-window price, or ${SMART_NOZOMI} on JR's own smartEX. The same seat on a Hikari or Kodama is ${WINDOW_HIKARI}, or ${SMART_HIKARI} on smartEX. Those are one adult in the regular season. On smartEX, peak dates add ¥200, the top season adds ¥400 and off-peak takes off ¥200. Green Car on a Nozomi is ¥19,590 at the window and ¥19,390 on smartEX. Read on ${OWN}.`,
  },
  {
    q: "Are Tokyo to Osaka shinkansen fares going up?",
    a: `Yes, in 2027. JR Central and JR West announced on 16 October 2026 that the Nozomi and Mizuho reserved charge rises for tickets bought from 1 July 2027, which takes Tokyo–Shin-Osaka from ${WINDOW_NOZOMI} to ¥15,420. Green Car goes from ¥19,590 to ¥23,290 for boarding from 15 December 2027. The non-reserved charge does not change. A trip before those dates is unaffected. Read on ${OWN}.`,
  },
  {
    q: "Can I use the JR Pass on the Nozomi?",
    a: `Not on its own. A pass holder needs the separate NOZOMI/MIZUHO ticket, which is ${NOZOMI_TICKET} for Tokyo or Shinagawa to Shin-Osaka, one ticket per ride. It is sold at JR station machines and ticket offices from one month before boarding, and JR Central says it cannot be reserved online before you arrive in Japan. The same price applies to reserved, non-reserved and Green tickets, though Green is for Green Car pass holders only. The pass does cover the Hikari and Kodama with no extra ticket. Read on ${OWN}.`,
  },
  {
    q: "Is the JR Pass worth it for Tokyo to Osaka?",
    a: `Not for a return. A return on smartEX is ¥29,040 on the Nozomi against ${JR_PASS_ONLINE} for a 7-day Ordinary pass online, or ${JR_PASS_ORDER} from an overseas agency. You would need four Tokyo–Osaka one-ways inside the seven days before the pass came out ahead. It starts to pay when the same week also reaches Hiroshima, Kanazawa or Tohoku. Read on ${OWN}.`,
  },
  {
    q: "Which side of the shinkansen can you see Mt Fuji from Tokyo to Osaka?",
    a: `The right-hand side going west. JR Central says "For the best view of Mt. Fuji, choose Seat E in Standard Class or Seat D in Green Class", and those are the window seats on that side. The mountain comes up between Mishima and Shizuoka, in the first part of the journey. Visibility depends on the weather, and JR Central itself warns the mountain may not always be visible. Read on ${OWN}.`,
  },
  {
    q: "Do I need to book the shinkansen in advance?",
    a: `Usually no, and on some dates yes. JR Central runs up to 18 trains an hour on the line, so walking up with a non-reserved ticket works on an ordinary day. In the peak periods every Nozomi car is reserved: ${nozomiAllReservedPeriods.join("; ")}. The Hikari and Kodama keep non-reserved cars then, though JR warns they may be overcrowded. Book ahead if you have an oversized bag, a fixed connection or a window seat you care about. Read on ${OWN}.`,
  },
  {
    q: "Can I bring large luggage on the Tokaido Shinkansen?",
    a: `Yes, with a reservation if it is large enough. Bags of 160 cm or less across the three dimensions need no booking. Bags of 161 to 250 cm need a seat with an oversized baggage area, which costs the same as a normal reserved seat, and boarding with one and no reservation means a ¥1,000 fee including tax. Anything over 250 cm cannot come on board. Non-reserved cars have no such seats. Read on JR Central's own page, ${OWN}.`,
  },
  {
    q: "Does the shinkansen stop at Osaka Station?",
    a: "No. It stops at Shin-Osaka, two stops north of Umeda on the Midosuji Line, and Umeda is joined to Osaka Station. Your train ticket to Osaka is a Shin-Osaka ticket, and Namba, Dotonbori and Tennoji are further along the same subway line. Allow time for that last connection if you have a booking the same day.",
  },
  {
    q: "What is the difference between Nozomi, Hikari and Kodama?",
    a: `Speed and stops. The Nozomi is the fastest and the only one a JR Pass does not cover outright. The Hikari stops more and takes about 3 hours. The Kodama stops at all 17 stations and takes about 4 hours. Non-reserved cars differ too: JR Central lists cars 1–2 on the Nozomi, 1–5 on the Hikari and 1–6 and 13–16 on the Kodama, subject to change. Departure boards show the Nozomi in yellow, the Hikari in red and the Kodama in blue. Read on ${OWN}.`,
  },
  {
    q: "Can I do Osaka as a day trip from Tokyo?",
    a: `You can, and most first-time travellers should not. It is about 5 hours on the train in a day and about ¥29,040 return, and the last train on Klook's sample date left at 21:31. A night in Osaka costs you far less of the day. If Osaka is one stop on a longer route, our first-time itinerary gives it two nights.`,
  },
];

const TITLE = "Tokyo to Osaka Shinkansen: Times, Fares, JR Pass";
const DESCRIPTION =
  "Tokyo to Osaka Shinkansen: 2h21m at the fastest on a Nozomi, ¥14,720 reserved or ¥14,520 on smartEX. The JR Pass catch, Mt Fuji seats and 2027 fare rise.";
const ROUTE = "/guides/transport/tokyo-to-osaka-shinkansen";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function TokyoToOsakaShinkansenPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESCRIPTION, updated }),
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
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Transport & Getting Around",
                  item: "https://www.japan-travel-kit.com/guides/transport",
                },
                { "@type": "ListItem", position: 4, name: "Tokyo to Osaka Shinkansen", item: URL },
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tokyo to Osaka Shinkansen</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo to Osaka Shinkansen:<br />Times, Fares and the JR Pass
          </h1>
          <p className={styles.heroSubtitle}>
            The fastest trains, what each seat costs, the Nozomi rule that catches pass holders, and the
            fare change already announced for 2027.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "JR's own fares, dated", "JR Pass break-even", "Mt Fuji seat and luggage rules"].map((t) => (
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

        {/* Lead paragraph: the whole answer, before anything else. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The <strong>Tokyo to Osaka Shinkansen</strong> takes <strong>2 hours 21 minutes</strong> at the
            fastest on a direct Nozomi from Tokyo Station to Shin-Osaka, and most Nozomi take about 2 hours 30.
            A reserved Ordinary seat costs <strong>{WINDOW_NOZOMI}</strong> one way at the station-window price
            or <strong>{SMART_NOZOMI}</strong> on JR&apos;s own smartEX, and a non-reserved seat is about ¥850
            less. A <strong>JR Pass does not cover the Nozomi</strong> without a separate {NOZOMI_TICKET} ticket,
            so pass holders usually ride the Hikari, at about 3 hours. Book on smartEX, or on Klook&apos;s rail
            page if you would rather check out in one place. All figures read on {OWN}.
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
                <p className={styles.verdictStatLabel}>Fastest journey</p>
                <p className={styles.verdictStatValue}>2h 21m, no transfer</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Reserved Nozomi</p>
                <p className={styles.verdictStatValue}>{WINDOW_NOZOMI}, or {SMART_NOZOMI} on smartEX</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass on the Nozomi</p>
                <p className={styles.verdictStatValue}>Needs a {NOZOMI_TICKET} ticket</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Mt Fuji seat</p>
                <p className={styles.verdictStatValue}>E, or D in Green Car</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> buy a reserved Nozomi seat each way unless your week also reaches
              Hiroshima, Kanazawa or Tohoku. Two singles are ¥29,040 on smartEX against {JR_PASS_ONLINE} for the
              cheapest 7-day pass.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo → Osaka Tickets on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        <BookingEsimCard />

        {/* Times */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The train</span>
          <h2 className={styles.sectionTitle}>How Long Is the Shinkansen From Tokyo to Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            2 hours 21 minutes on the fastest Nozomi, and about 2 hours 30 on most of them. The gap between
            the three trains is the number of stops, not the speed of the line, and there is no transfer on
            any of them. Our own reference value for a Hikari is about {Math.floor(tokyoOsaka.minutes / 60)}h{" "}
            {tokyoOsaka.minutes % 60}m, in line with JR Tokai Tours&apos; &ldquo;about 3 hours&rdquo;.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Train", "Tokyo to Shin-Osaka", "Stops", "On a JR Pass?", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trainRows.map((row) => (
                    <tr key={row.train}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.train}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.stops}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Frequency</span>
          <h2 className={styles.sectionTitle}>How Often Do Trains Run, and What Is the Last One?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Several an hour from 06:00 until about 21:30, which is why a missed train costs you minutes
            rather than an hour.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Value", "What it means", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {frequencyRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook&apos;s page also gives 2h 14m as its shortest time and 2h 30m in its own text for the Nozomi.
            No JR source supports the 2h 14m figure, so the headline here is JR Central&apos;s.
          </p>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Is the Tokyo to Osaka Shinkansen?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {WINDOW_NOZOMI} one way for a reserved Nozomi seat at the window and {SMART_NOZOMI} on smartEX,
            for one adult in the regular season. Booking online saves ¥200 on both the Nozomi and the Hikari.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket, one way", "Window", "smartEX", "What to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.ticket}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.window}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.smart}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read on {OWN}. Window Nozomi and Green figures are from the JR Central and JR West release of 16
            October 2026, the window Hikari figure from JR Tokai Tours&apos; station guide, and smartEX figures
            from smart-ex.jp&apos;s price tables dated 1 April 2025. On smartEX, peak dates add ¥200, the top
            season adds ¥400 and off-peak takes off ¥200. No Klook price appears here because Klook&apos;s
            prices change by date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Osaka tickets on Klook →
            </KlookLink>
          </div>
        </section>

        {/* 2027 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Fare change</span>
          <h2 className={styles.sectionTitle}>Are Tokyo to Osaka Fares Going Up?</h2>
          <p className={styles.bodyText}>
            Yes, from 2027. JR Central and JR West announced on 16 October 2026 that the Nozomi and Mizuho
            reserved charge goes up for <strong>tickets bought from 1 July 2027</strong>, taking Tokyo to
            Shin-Osaka from {WINDOW_NOZOMI} to <strong>¥15,420</strong>. Green Car goes from ¥19,590 to{" "}
            <strong>¥23,290</strong> for boarding from 15 December 2027. The non-reserved charge is not changing.
          </p>
          <p className={styles.bodyText}>
            The release sets those dates by purchase for the reserved seat and by boarding for Green Car, so a
            trip in late 2027 is worth pricing again. Those are window figures, and the release does not list
            the smartEX equivalents for these seats. Read on {OWN}.
          </p>
        </section>

        {/* JR Pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>Can I Use the JR Pass on the Nozomi?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Not on its own. You need the separate NOZOMI/MIZUHO ticket, {NOZOMI_TICKET} for Tokyo or Shinagawa
            to Shin-Osaka, for every Nozomi ride. It is sold at JR machines and ticket offices from one month
            before boarding, and JR Central says it cannot be reserved online before you reach Japan. The
            Hikari and Kodama are covered with no extra ticket. Is the pass worth it for a return? No:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "What it costs", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Ordinary pass prices are {JR_PASS_ONLINE} / ¥80,000 / ¥100,000 for 7, 14 and 21 days on the official
            site, and {JR_PASS_ORDER} / ¥84,000 / ¥105,000 as an Exchange Order from an overseas agency, read on
            japanrailpass.net on {OWN}. Our <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link>{" "}
            works the break-even against your own legs.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 day) →
            </KlookLink>
            <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Or single tickets on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Mt Fuji */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Seats</span>
          <h2 className={styles.sectionTitle}>Which Side of the Shinkansen Can You See Mt Fuji From Tokyo to Osaka?</h2>
          <p className={styles.bodyText}>
            The right-hand side going west, in <strong>Seat E</strong> in Ordinary or <strong>Seat D</strong> in
            Green Car. JR Central&apos;s own wording is &ldquo;For the best view of Mt. Fuji, choose Seat E in
            Standard Class or Seat D in Green Class&rdquo;, and it warns the mountain may not always be visible.
            On the line&apos;s station order it sits between Mishima and Shizuoka, so it comes up in the first part
            of the trip. Read on {OWN}.
          </p>
          <p className={styles.bodyText}>
            With a non-reserved ticket you cannot choose a side at all, which is the best reason to pay the
            difference on this route. The reservation has to be made for that seat letter, so pick it on the
            seat map or ask for it at the ticket office.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do I Need to Book the Shinkansen in Advance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Usually no, and on these dates yes: every Nozomi car is reserved through the peak periods below,
            so a walk-up Nozomi ticket does not exist. The Hikari and Kodama keep non-reserved cars, though JR
            warns they may be overcrowded. Read on {OWN}.
          </p>
          <ul className={styles.pickList}>
            {nozomiAllReservedPeriods.map((period) => (
              <li key={period}>
                <span className={styles.proIcon}>▸</span>
                <span><strong>{period}</strong></span>
              </li>
            ))}
          </ul>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>How Do You Buy the Ticket?</h3>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "How it works", "Changes and refunds"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.how}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.cancel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Pick a train and seat class on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Luggage */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Luggage</span>
          <h2 className={styles.sectionTitle}>Can I Bring Large Luggage on the Tokaido Shinkansen?</h2>
          <p className={styles.bodyText}>
            Yes. A bag of 160 cm or less across the three dimensions goes on the rack or at your feet with no
            booking. A bag of <strong>161 to 250 cm</strong> needs a seat with an oversized baggage area, which
            costs the same as a normal reserved seat. Board with one and no reservation and JR charges{" "}
            <strong>¥1,000 including tax</strong>. Anything over 250 cm cannot come on board.
          </p>
          <p className={styles.bodyText}>
            Those seats are the back rows of certain cars, with the space behind them shared by the five
            passengers in that row. Non-reserved cars have none. Choose &ldquo;Seat with an oversized baggage
            area&rdquo; online, or ask at a ticket office. JR Pass holders can use JAPAN RAIL PASS Reservation
            or ask the staff. Read on JR Central&apos;s own page, {OWN}.
          </p>
        </section>

        {/* Alternatives */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Is the Shinkansen Better Than a Night Bus or Flight?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For most first trips, yes. The bus wins on price alone and the train wins on everything else.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Cost", "Verdict", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {altRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Arrival */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Arrival</span>
          <h2 className={styles.sectionTitle}>What Should You Do When You Arrive in Osaka?</h2>
          <p className={styles.bodyText}>
            Change to the Midosuji Line at Shin-Osaka, which runs through Umeda to Namba and Tennoji. The
            shinkansen does not reach Osaka Station, so this last leg is part of every trip. If you arrive by
            mid-morning, an Osaka Amazing Pass at {PRICES.osakaAmazingPass.adult} for one day covers the subway
            and the sights that day (operator price, read{" "}
            {checkedLabel(PRICES.osakaAmazingPass.checked)}); arriving later, it rarely pays, because the
            Umeda Sky Building is free on it only until 15:00. The{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass break-even table</Link>{" "}
            has the sums. Our{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary">Osaka 2-day itinerary</Link> plans what
            follows, and <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka</Link>{" "}
            compares the neighbourhoods in full.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
            <KlookLink href={dotonboriDaytimeFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Dotonbori food tour →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book with the train"
          heading="What to Book for the Day You Arrive"
          intro="The train is the one part of this day JR has already solved. These four are what the rest of it needs: lunch at the other end, a way around the city, a bed, and data on your phone."
          items={tokyoOsakaArrivalPrep}
        />

        <KlookStayAreas
          heading="Where to Stay in Osaka After the Shinkansen"
          intro="All three sit on the Midosuji Line from Shin-Osaka, so the choice is about what comes next rather than how you get there."
          areas={tokyoOsakaArrivalStayAreas}
        />

        <KlookTourPicks
          heading="What to Book for the First Afternoon"
          intro="If you arrive by lunchtime, these two fill the day. Open a listing for availability and the current price on your dates."
          tours={[dotonboriDaytimeFoodTour, osakaAmazingPass]}
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

        {/* Before you go */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you go</span>
          <h2 className={styles.sectionTitle}>One Thing to Sort Before You Board</h2>
          <p className={styles.bodyText}>
            Data. A smartEX change, a QR ticket and a delay notice all happen on your phone, and you will want a
            map the moment you step out at Shin-Osaka.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it with the
            alternatives.
          </p>
        </section>

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/japan-first-time-itinerary", title: "First Time Japan Itinerary (2026): 9 Days, Day by Day" },
              { href: "/guides/transport/shinkansen-guide", title: "Shinkansen Guide 2026: Tickets, Passes & Tips for First-Timers" },
              { href: "/guides/transport/tokyo-to-kyoto", title: "Tokyo to Kyoto (2026): Cheapest & Fastest Ways to Get There" },
              { href: "/guides/transport/tokyo-to-nagoya-shinkansen", title: "Tokyo to Nagoya Shinkansen: Times, Fares, JR Pass" },
              { href: "/guides/transport/osaka-to-hiroshima-shinkansen", title: "Osaka to Hiroshima Shinkansen (2026): Time and Price" },
              { href: "/guides/transport/jr-pass-guide", title: "JR Pass Cost 2026: New Prices & Is It Worth It?" },
            ].map((card) => (
              <Link key={card.href} href={card.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="14" rx="3" />
                    <line x1="4" y1="10" x2="20" y2="10" />
                    <path d="M7 21l2-4M17 21l-2-4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{card.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the seat, then the rest of Osaka</h2>
            <p className={styles.ctaBannerDesc}>
              Seat E for Mt Fuji, a reserved car if you have a large bag, and the Hikari if you hold a JR Pass.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Tokyo → Osaka Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
