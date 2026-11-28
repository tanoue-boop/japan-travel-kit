import Head from "next/head";
import Link from "next/link";
import { hreflangLinks } from "../../../components/Hreflang";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import WinterBookingTop from "../../../components/WinterBookingTop";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  hakubaAirportShuttleBus,
  hakubaExpressBusTokyo,
  hakubaHapponeBusLiftRental,
  hakubaHotelsUrl,
  hakubaSkiResortDayTourTokyo,
  hakubaSkiSnowboardRental,
  jrEastPass,
  klookEsim,
  luggageDeliveryCards,
  naganoHakubaShuttleBus,
  shinkansenTokyoNagano,
  spicyHakubaSkiRental,
  tsugaikeBusLiftRental,
  type KlookTripPrepItem,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import HotelStayBlock from "../../../components/HotelStayBlock";

/**
 * Hakuba as an overnight ski trip from Tokyo, for the reader searching "Hakuba Ski
 * Tours" (task-jtk-20261117-02, 17 Nov 2026). Written because Australian buyers on
 * 15 Nov bought the Tokyo → Echigo-Yuzawa shinkansen and nothing else: this is
 * the page for the reader who wants a ski week in Nagano rather than a day.
 *
 * Split from the neighbours: gala-yuzawa-ski-day-trip-from-tokyo is a day out and
 * back; niseko-ski-tours is Hokkaido; japan-winter-itinerary is a 12-day national
 * route. This page is staying in Nagano for the snow.
 *
 * Sources, all read 17 November 2026:
 *   hakubavalley.com/ticket/ (and /en/ticket_en/) — Hakuba Valley ticket 2026-27,
 *     one day adult (13+) ¥11,100, child (6–12) ¥6,400, 5 and under free.
 *   hakubavalley.com/en/seasonpass/ — season planned from December 2026 to around
 *     early May 2027, snow permitting.
 *   hakubavalley.com/en/about_hakubavalley_en/ — 10 ski areas.
 *   hakubavalley.com/en/access_en/ — Tokyo by Hokuriku Shinkansen and express bus
 *     "in as little as 2 hours 50 minutes".
 *   happo-one.jp/en/ticket/ — 1-day window price 2026-27: early (1–18 Dec 2026)
 *     ¥6,400 / ¥3,200, peak (19 Dec 2026 – 22 Mar 2027) ¥9,800 / ¥4,900, spring
 *     (23 Mar – 5 May 2027) ¥6,400 / ¥3,200; adult 18–64, child 6–17.
 *   happo-one.jp — winter operation planned from 1 December.
 *   tsugaike.gr.jp — 2026-27 season opening 1 December confirmed.
 *   iwatake-mountain-resort.com/winter — 18 Dec 2026 – 28 Mar 2027, planned.
 *   Hakuba47, Goryu and Cortina: no 2026-27 date on their own sites on this read.
 *   alpico.co.jp/traffic/express/nagano_hakuba/ and its fare and timetable PDFs
 *     (posted 12 Nov 2026) — Nagano Station east exit → Hakuba Happo bus terminal
 *     ¥3,500 adult one way, direct buses 70 minutes (the route page gives 1 h 10
 *     to 2 h 05 by service), reservation required; winter timetable 12 Dec 2026 –
 *     26 Mar 2027.
 *   alpico.co.jp/traffic/express/hakuba_shinjuku/ — Shinjuku → Hakuba, daytime
 *     5 h 13 min, overnight 7 h 23 min; winter adult fare to the Hakuba area from
 *     ¥6,600, up to ¥7,800 on peak days, night buses +¥2,000; winter 5 Dec 2026 –
 *     31 Mar 2027.
 *   media.jreast.co.jp/articles/6416 — Tokyo → Nagano on the Kagayaki "about 80
 *     minutes".
 *   tickets.jr-odekake.net (JR West e5489 Shinkansen e-Ticket, fare table for
 *     purchases from 14 March 2026) — Tokyo → Nagano reserved, regular season,
 *     adult ¥8,250; +¥200 busy, +¥400 peak, −¥200 off-peak.
 *   vill.hakuba.nagano.jp/hotspring/ — six hot-spring sources in the village.
 * Niseko and GALA Yuzawa rows are carried from niseko-ski-tours (Niseko United,
 * read 6 Nov 2026) and gala-yuzawa-ski-day-trip-from-tokyo (GALA, read 15 Nov
 * 2026). Nozawa rows from nozawa-onsen-ski (read 17 Nov 2026).
 *
 * No Klook prices. Nothing here is first-hand.
 */

const CHECKED_ISO = "2026-11-17";
const CHECKED = checkedLabel(CHECKED_ISO);

const SHINKANSEN_TIME = "about 80 minutes";
const SHINKANSEN_FARE = "¥8,250";
const BUS_TIME = "70 minutes";
const BUS_FARE = "¥3,500";
const DOOR_TO_DOOR = "2 hours 50 minutes";
const DIRECT_BUS_TIME = "5 hours 13 minutes";
const DIRECT_BUS_FARE = "from ¥6,600";
const VALLEY_DAY = "¥11,100";
const VALLEY_CHILD = "¥6,400";
const HAPPO_PEAK = "¥9,800";
const HAPPO_EARLY = "¥6,400";

const ROUTE = "/guides/attractions/hakuba-ski-tours";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

/** Table 1 — how to get to Hakuba from Tokyo. First row is the answer. */
const accessRows = [
  {
    option: "Best for most: Hokuriku Shinkansen to Nagano + Alpico express bus",
    time: `${SHINKANSEN_TIME} + ${BUS_TIME} (as little as ${DOOR_TO_DOOR} in all)`,
    cost: `${SHINKANSEN_FARE} + ${BUS_FARE} = ¥11,750`,
    booking: "Bus: reservation required. Train: reserved seat recommended",
    note: "The fastest way in, and the one the JR EAST PASS covers as far as Nagano. The bus leaves from Nagano Station's east exit and runs to the Hakuba Happo bus terminal.",
  },
  {
    option: "Direct highway bus from Shinjuku (Busta Shinjuku)",
    time: `${DIRECT_BUS_TIME} daytime; 7 hours 23 minutes overnight`,
    cost: `${DIRECT_BUS_FARE} in winter (up to ¥7,800 on peak days; night buses +¥2,000)`,
    booking: "Reservation required",
    note: "No change of vehicle and the cheapest seat, at the cost of about two extra hours. The overnight bus arrives in time for a first lift.",
  },
  {
    option: "Bus + lift + rental package from Tokyo",
    time: "Coach both ways; times on the listing",
    cost: "Shown on the listing for your date",
    booking: "Book ahead (one checkout)",
    note: "Coach, lift ticket and rental set in one booking — the version that needs no planning, for one resort on one day or a short stay.",
  },
  {
    option: "Airport coach from Narita / Haneda",
    time: "Times on the listing",
    cost: "Shown on the listing for your date",
    booking: "Book ahead",
    note: "Straight from the arrival gate to the Hakuba resorts, with ski equipment and one bag per person included — no Tokyo night needed.",
  },
];

/** Table 2 — season and official 1-day lift prices, 2026-27. */
const seasonRows = [
  { what: "Hakuba Valley (10 ski areas)", detail: "Planned December 2026 to around early May 2027, snow permitting" },
  { what: "Happo-one", detail: "Winter operation planned from 1 December 2026" },
  { what: "Tsugaike Kogen", detail: "Opening 1 December 2026 confirmed" },
  { what: "Iwatake", detail: "18 December 2026 to 28 March 2027 (planned)" },
  { what: "Hakuba47, Goryu, Cortina", detail: "Awaiting the official announcement on each resort's own site" },
];

const liftRows = [
  { ticket: "Hakuba Valley ticket, 1 day (all 10 areas)", adult: VALLEY_DAY, child: VALLEY_CHILD, note: "Adult 13+, child 6–12, 5 and under free" },
  { ticket: "Happo-one, 1 day — peak (19 Dec 2026 – 22 Mar 2027)", adult: HAPPO_PEAK, child: "¥4,900", note: "Ticket-window price; adult 18–64, child 6–17" },
  { ticket: "Happo-one, 1 day — early (1–18 Dec 2026)", adult: HAPPO_EARLY, child: "¥3,200", note: "Ticket-window price" },
  { ticket: "Happo-one, 1 day — spring (23 Mar – 5 May 2027)", adult: HAPPO_EARLY, child: "¥3,200", note: "Ticket-window price" },
];

/** Table 3 — Hakuba vs Nozawa Onsen vs Niseko vs GALA Yuzawa. */
const compareRows = [
  {
    resort: "Hakuba (Nagano)",
    from: `As little as ${DOOR_TO_DOOR} by shinkansen + bus`,
    season: "Dec 2026 – early May 2027 (valley, planned)",
    lift: `${VALLEY_DAY} valley ticket; Happo-one ${HAPPO_PEAK} peak`,
    beginners: "10 ski areas to choose from; pick one with a ski school and gentle lower slopes",
    onsen: "Six hot-spring sources in the village (Hakuba village's own page)",
    best: "A ski week with the most terrain choice",
  },
  {
    resort: "Nozawa Onsen (Nagano)",
    from: "About 1 h 45 min to Iiyama + 25 min bus",
    season: "From 28 Nov 2026 (planned)",
    lift: "¥7,800 (regular season)",
    beginners: "40% beginner terrain on the resort's own split; Uenotaira is wide and gentle",
    onsen: "13 public baths (soto-yu), donation-based",
    best: "One mountain above an onsen village",
  },
  {
    resort: "Niseko (Hokkaido)",
    from: "A flight to New Chitose, then 2.5 hours by coach",
    season: "28 Nov 2026 – 5 May 2027",
    lift: "¥13,500 peak (All Mountain Pass)",
    beginners: "Grand Hirafu: 9 of 22 courses graded beginner",
    onsen: "Not covered by the sources on this page",
    best: "Hokkaido powder, if you will fly for it",
  },
  {
    resort: "GALA Yuzawa (Niigata)",
    from: "71 minutes by shinkansen, slopes at the station",
    season: "Slopes 19 Dec 2026 – 5 May 2027",
    lift: "¥8,000 at the window",
    beginners: "35% beginner terrain on the resort's own figures",
    onsen: "Not covered by the sources on this page",
    best: "A day trip, back in Tokyo for dinner",
  },
];

const faqItems = [
  {
    q: "How do I get to Hakuba from Tokyo?",
    a: `Take the Hokuriku Shinkansen from Tokyo to Nagano (${SHINKANSEN_TIME} on the Kagayaki, ${SHINKANSEN_FARE} for a reserved Shinkansen e-Ticket in regular season), then the Alpico express bus from Nagano Station's east exit to the Hakuba Happo bus terminal (${BUS_TIME} on the direct services, ${BUS_FARE}, reservation required). Hakuba Valley's own access page puts the whole run at as little as ${DOOR_TO_DOOR}. The alternative is the direct Alpico/Keio highway bus from Busta Shinjuku: ${DIRECT_BUS_TIME} in the daytime, 7 hours 23 minutes overnight, ${DIRECT_BUS_FARE} in winter. All figures read ${CHECKED}.`,
  },
  {
    q: "When does the Hakuba ski season start in 2026-27?",
    a: `Hakuba Valley plans the season from December 2026 to around early May 2027, snow permitting. Of the individual resorts, Tsugaike Kogen has confirmed 1 December 2026, Happo-one plans winter operation from 1 December, and Iwatake plans 18 December 2026 to 28 March 2027. Hakuba47, Goryu and Cortina had not posted 2026-27 dates on their own sites when read ${CHECKED} — check each resort's site before you book a December stay.`,
  },
  {
    q: "How much is a Hakuba lift ticket?",
    a: `The Hakuba Valley ticket, valid at all 10 ski areas, is ${VALLEY_DAY} a day for adults (13+) and ${VALLEY_CHILD} for children aged 6–12 in 2026-27; 5 and under ski free. A single-resort ticket is cheaper: Happo-one's own window price is ${HAPPO_PEAK} in peak season (19 December 2026 to 22 March 2027) and ${HAPPO_EARLY} in early and spring season. Official prices, read ${CHECKED}.`,
  },
  {
    q: "Hakuba or Niseko?",
    a: `Hakuba if you are flying into Tokyo and do not want a second flight: it is as little as ${DOOR_TO_DOOR} by shinkansen and bus, and the valley ticket covers 10 ski areas for ${VALLEY_DAY} a day. Niseko if the trip is about Hokkaido snow and you will fly to New Chitose for it: the coach from the airport is another 2.5 hours, and the peak All Mountain Pass is ¥13,500. Both open in late November or December and run into May.`,
  },
  {
    q: "Can you do Hakuba as a day trip from Tokyo?",
    a: `Yes, but only as a booked tour: the run is close to three hours each way even on the fastest connection, which leaves a short day on the snow if you assemble it yourself. A one-day tour from Tokyo with the lift ticket and rental in the booking is the practical version. For a first day on snow with less travelling, GALA Yuzawa is 71 minutes from Tokyo Station with the slopes at the station.`,
  },
  {
    q: "Is the JR Pass or JR EAST PASS worth it for Hakuba?",
    a: `The JR EAST PASS (¥35,000 for 5 days) covers the Hokuriku Shinkansen as far as Nagano, but not the Alpico bus to Hakuba. A Tokyo–Nagano return on Shinkansen e-Tickets is about ¥16,500 in regular season, so the pass only pays if the same five days include another long JR East trip, such as Nozawa Onsen via Iiyama or GALA Yuzawa.`,
  },
  {
    q: "Do I need to book the Nagano–Hakuba bus in advance?",
    a: `Yes. Alpico's own route page marks the Nagano–Hakuba express bus as reservation required, and the winter timetable runs 12 December 2026 to 26 March 2027. The Shinjuku–Hakuba highway bus is also reservation-only. Book the bus once your shinkansen time is fixed, and leave a margin: the operators state that buses leave on schedule.`,
  },
  {
    q: "Are there hot springs in Hakuba?",
    a: "Yes. Hakuba village's own hot-spring page describes six hot-spring sources in the village, including Happo Onsen, which it calls one of Japan's strongest alkaline springs. Many hotels have their own baths; if the onsen is the point of the trip, Nozawa Onsen is the resort built around its public baths.",
  },
];

const hakubaSameTrip: KlookTripPrepItem[] = [
  {
    label: naganoHakubaShuttleBus.title,
    ctaLabel: "Check the Nagano–Hakuba bus →",
    url: naganoHakubaShuttleBus.url,
    why: "The leg after the shinkansen: Nagano Station's east exit to Hakuba 47, Happo, Iwatake and Tsugaike, with ski and snowboard storage.",
  },
  {
    label: hakubaHapponeBusLiftRental.title,
    ctaLabel: "See the Happo-one package →",
    url: hakubaHapponeBusLiftRental.url,
    why: "Coach from Tokyo, Happo-one's lift ticket and a rental set in one checkout — the shortest list of bookings for a short stay.",
  },
  {
    label: hakubaSkiSnowboardRental.title,
    ctaLabel: "Reserve Hakuba rental →",
    url: hakubaSkiSnowboardRental.url,
    why: "Priced by the number of days, one to seven, and reserved before you fly rather than queued for on your first morning.",
  },
  {
    label: "Hotels in Hakuba",
    ctaLabel: "Check Hakuba hotels on Klook →",
    url: hakubaHotelsUrl,
    why: "The booking that fixes the rest: which resort you sleep beside decides which shuttle you ride each morning.",
  },
  {
    label: klookEsim.name,
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
    why: "Lift status, shuttle changes and bus reservations all reach a phone, and the valley ticket's choice of 10 ski areas is a decision made on the morning's conditions.",
  },
  luggageDeliveryCards.hakuba,
];

const TITLE = "Hakuba Ski Tours (2026-27): Tokyo Access, Lifts & Resorts";
const DESCRIPTION =
  "Hakuba ski tours and how to get to Hakuba from Tokyo: shinkansen to Nagano (¥8,250) plus a 70-min ¥3,500 bus, ¥11,100 valley lift ticket, 2026-27 season.";

const SAFETYWING_URL = "https://safetywing.com/nomad-insurance?referenceID=26614156&utm_source=26614156&utm_medium=Ambassador";

const related = [
  { href: "/guides/attractions/nozawa-onsen-ski", title: "Nozawa Onsen Ski (2026-27): Tokyo Access, Lifts & Onsen" },
  { href: "/guides/attractions/niseko-ski-tours", title: "Niseko Ski Tours (2027): Transfers, Lessons & 4 Areas" },
  { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "How to Get to Gala Yuzawa from Tokyo: Shinkansen & JR Pass" },
  { href: "/guides/attractions/japan-ski-trip-itinerary", title: "Japan Ski Trip Itinerary: 7 & 10 Days, Hakuba to Niseko" },
  { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary: 12 Days, Day by Day (2027)" },
  { href: "/guides/money/japan-ski-travel-insurance", title: "Japan Ski Travel Insurance: What Standard Policies Exclude" },
  { href: "/guides/attractions/jigokudani-snow-monkey-tour", title: "Snow Monkey Tour from Tokyo: Jigokudani Park Guide 2027" },
  { href: "/guides/transport/jr-east-pass", title: "JR East Pass 2026: Price, Coverage & Is It Worth It?" },
  { href: "/guides/esim/best-esim-japan", title: "Best eSIM for Japan (2026): Providers, Prices and Which to Pick" },
  { href: "/guides/attractions", title: "More Things to Do in Japan →" },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function HakubaSkiToursPage({ updated }: { updated: PageUpdated }) {
  const sourceNote = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        {hreflangLinks(ROUTE)}
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
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Hakuba Ski Tours", item: URL },
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
          <span className={styles.breadCurrent}>Hakuba Ski Tours</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Hakuba Ski Tours: <br />How to Get to Hakuba From Tokyo, Lifts and Resorts
          </h1>
          <p className={styles.heroSubtitle}>
            Ten ski areas on one valley ticket, as little as {DOOR_TO_DOOR} from Tokyo by shinkansen
            and bus — and the bus is the part you have to reserve.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "2026-27 dates, official", "Lift prices, official", "Shinkansen + bus fares"].map((t) => (
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

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Tokyo</p>
                <p className={styles.verdictStatValue}>{DOOR_TO_DOOR} (train + bus)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Season</p>
                <p className={styles.verdictStatValue}>Dec 2026 – early May 2027</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Valley ticket, 1 day</p>
                <p className={styles.verdictStatValue}>{VALLEY_DAY} adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book ahead?</p>
                <p className={styles.verdictStatValue}>The bus, yes — reservation required</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Hakuba ski tours</strong> start with the journey: from Tokyo, take the{" "}
              <strong>Hokuriku Shinkansen to Nagano ({SHINKANSEN_TIME}, {SHINKANSEN_FARE})</strong> and then
              the <strong>Alpico express bus to Hakuba ({BUS_TIME}, {BUS_FARE}, reservation required)</strong>{" "}
              — as little as {DOOR_TO_DOOR} in all — or the <strong>direct bus from Shinjuku</strong>{" "}
              ({DIRECT_BUS_TIME}, {DIRECT_BUS_FARE} in winter). The 2026-27 season is planned from{" "}
              <strong>December 2026 to around early May 2027</strong> (Hakuba Valley), with Tsugaike and
              Happo-one opening <strong>1 December</strong>. A one-day <strong>Hakuba Valley ticket</strong>{" "}
              for all 10 ski areas is <strong>{VALLEY_DAY}</strong> for an adult. Fares and prices are the
              operators&apos; own, read {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={hakubaHapponeBusLiftRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Bus + Lift + Rental From Tokyo →
              </KlookLink>
              <KlookLink href={hakubaHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Hakuba Hotels →
              </KlookLink>
            </div>
          </div>
        </div>

        <WinterBookingTop
          heading="Which Hakuba Ski Trip Should You Book for 2026-27?"
          checkedIso={CHECKED_ISO}
          deadline={
            <>
              Book the bed and the bus first: the Nagano–Hakuba express bus and the Shinjuku highway bus
              are both reservation-only, and Happo-one&apos;s peak pricing starts 19 December 2026. For
              Christmas or New Year, settle both before you book flights.
            </>
          }
          tours={[
            { title: hakubaHapponeBusLiftRental.title, url: hakubaHapponeBusLiftRental.url, price: null, duration: "Round-trip coach + lift + rental", departs: "Tokyo" },
            { title: tsugaikeBusLiftRental.title, url: tsugaikeBusLiftRental.url, price: null, duration: "Round-trip coach + lift + rental", departs: "Tokyo" },
            { title: hakubaSkiResortDayTourTokyo.title, url: hakubaSkiResortDayTourTokyo.url, price: null, duration: "One day", departs: "Tokyo" },
          ]}
        />

        {/* Same-trip block, directly under the main CTA. */}
        <KlookTripPrep
          label="Book on the same trip"
          heading="What a Hakuba Ski Trip Books Alongside the Lift Ticket"
          intro="The transfer, the gear and the bed — plus data, because lift status and bus changes reach a phone first, and a bag service for the Tokyo end of the trip."
          items={hakubaSameTrip}
        />
        <p className={styles.bodyText} style={{ fontSize: "0.9rem" }}>
          <strong>Ski insurance:</strong> many standard travel policies exclude snowsports or off-piste.{" "}
          <a href={SAFETYWING_URL} target="_blank" rel="sponsored nofollow noopener noreferrer">
            SafetyWing
          </a>{" "}
          is one option; our{" "}
          <Link href="/guides/money/japan-ski-travel-insurance">ski travel insurance for Japan</Link> guide{" "}
          sets out what each policy covers on and off the marked runs.
        </p>

        <EsimCtaTop />

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Hakuba From Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Shinkansen to Nagano, then the Alpico bus</strong> — {SHINKANSEN_TIME} and{" "}
            {BUS_TIME}, ¥11,750 one way for the two. The direct Shinjuku bus is about ¥5,000 cheaper and
            about two hours slower. Hakuba Valley also lists the limited express Azusa from Shinjuku at as
            little as 3 hours 40 minutes.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Fare (adult, one way)", "Booking", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.booking}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={sourceNote}>
            Last checked {CHECKED}. Shinkansen fare: Shinkansen e-Ticket, reserved seat, regular season, for
            purchases from 14 March 2026 (+¥200 busy season, +¥400 peak, −¥200 off-peak) —
            tickets.jr-odekake.net. Shinkansen time: media.jreast.co.jp/articles/6416. Nagano–Hakuba bus:
            alpico.co.jp/traffic/express/nagano_hakuba/ (winter timetable 12 Dec 2026 – 26 Mar 2027).
            Shinjuku–Hakuba bus: alpico.co.jp/traffic/express/hakuba_shinjuku/ (winter 5 Dec 2026 – 31 Mar
            2027). Door-to-door time: hakubavalley.com/en/access_en/.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={naganoHakubaShuttleBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nagano → Hakuba bus →
            </KlookLink>
            <KlookLink href={hakubaExpressBusTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo → Hakuba express bus →
            </KlookLink>
            <KlookLink href={hakubaAirportShuttleBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Airport → Hakuba coach →
            </KlookLink>
            <KlookLink href={jrEastPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              JR EAST PASS →
            </KlookLink>
            <KlookLink href={shinkansenTokyoNagano.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo → Nagano shinkansen →
            </KlookLink>
          </div>
        </section>

        {/* Season and lift tickets */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Season &amp; lift tickets</span>
          <h2 className={styles.sectionTitle}>When Does the Hakuba Ski Season Start in 2026-27?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>December 2026, running to around early May 2027</strong>, on Hakuba Valley&apos;s own
            plan. Tsugaike Kogen and Happo-one open first, on <strong>1 December 2026</strong>; Iwatake
            follows on 18 December.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Resort", "2026-27 season"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={sourceNote}>
            Last checked {CHECKED}: hakubavalley.com/en/seasonpass/, happo-one.jp, tsugaike.gr.jp,
            iwatake-mountain-resort.com/winter. Opening dates depend on snow.
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>
            How Much Is a Hakuba Lift Ticket?
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>{VALLEY_DAY} a day for the Hakuba Valley ticket</strong>, which works at all 10 ski
            areas; a single resort costs less — Happo-one is {HAPPO_PEAK} at peak.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket (2026-27)", "Adult", "Child", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {liftRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td className={styles.tdPrice}>{row.child}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={sourceNote}>
            Last checked {CHECKED}: hakubavalley.com/ticket/ and happo-one.jp/en/ticket/. Child age bands
            differ between the two tickets.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakubaHapponeBusLiftRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Happo-one bus + lift + rental →
            </KlookLink>
            <KlookLink href={tsugaikeBusLiftRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tsugaike bus + lift + rental →
            </KlookLink>
            <KlookLink href={spicyHakubaSkiRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Spicy rental (5 shops) →
            </KlookLink>
          </div>
        </section>

        {/* Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Hakuba or Niseko? Hakuba vs Nozawa Onsen vs GALA Yuzawa</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Hakuba for the most terrain without a flight; Niseko if you will fly to Hokkaido;
            Nozawa Onsen for one mountain and a hot-spring village; GALA Yuzawa for a day trip.</strong>
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Resort", "From Tokyo", "2026-27 season", "1-day lift (adult)", "Beginners", "Onsen", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.resort}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.resort}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.from}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.season}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.lift}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.beginners}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.onsen}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={sourceNote}>
            Last checked: Hakuba and Nozawa Onsen {CHECKED} (hakubavalley.com, happo-one.jp,
            vill.hakuba.nagano.jp/hotspring/, en.nozawaski.com, nozawakanko.jp); Niseko 6 November 2026
            (niseko.ne.jp); GALA Yuzawa 15 November 2026 (gala.co.jp). Snow conditions vary by season, so
            the table compares published dates, prices and terrain rather than snow quality.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Details for each: <Link href="/guides/attractions/nozawa-onsen-ski">Nozawa Onsen ski</Link>,{" "}
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link> and, for a single day,{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">how to get to Gala Yuzawa from Tokyo</Link>{" "}
            by direct shinkansen.
          </p>
        </section>

        {/* Day trip or stay */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Plan the Hakuba ski trip</span>
          <h2 className={styles.sectionTitle}>Should You Stay in Hakuba or Take a Day Tour?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Stay at least two nights</strong> if you are skiing more than once: close to three
            hours each way is a lot for a single day. The day tour is for one taste of Hakuba from a Tokyo
            hotel.
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>A ski week: stay in the valley</p>
              <p className={styles.whoForDesc}>
                Shinkansen and bus in, the Hakuba Valley ticket for {VALLEY_DAY} a day, rental reserved for
                the number of days you ski. The valley ticket lets you pick a resort by the morning&apos;s
                weather.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Two or three days: a package</p>
              <p className={styles.whoForDesc}>
                The Happo-one and Tsugaike packages put the coach, the lift ticket and the rental in one
                checkout. Check whether the listing includes the bed or only the day.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>One day from Tokyo: a tour</p>
              <p className={styles.whoForDesc}>
                The one-day Hakuba tour carries the transport, lift ticket and rental. For a first day on
                snow with less travelling, GALA Yuzawa is 71 minutes from Tokyo Station.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Check the cancellation terms</p>
              <p className={styles.whoForDesc}>
                Bus operators do not wait for a delayed flight or train, and a lift closed for wind is a
                normal Hakuba day. Read the listing&apos;s cancellation and bad-weather terms for your date
                before you pay.
              </p>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={hakubaSkiResortDayTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Hakuba day tour from Tokyo →
            </KlookLink>
            <KlookLink href={hakubaHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Hakuba hotels →
            </KlookLink>
          </div>
        </section>

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="hakuba" />

        {/* Pairing */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The rest of your winter</span>
          <h2 className={styles.sectionTitle}>What Can You Pair With a Hakuba Ski Trip?</h2>
          <p className={styles.bodyText}>
            Nagano Station, where the bus leaves, is also the start of the{" "}
            <Link href="/guides/attractions/jigokudani-snow-monkey-tour">Jigokudani snow monkey tour</Link>,
            which makes a good rest day. For a second resort on the same trip, the{" "}
            <Link href="/guides/attractions/nozawa-onsen-ski">Nozawa Onsen ski</Link> guide covers the
            village off Iiyama, one stop beyond Nagano on the shinkansen, and the{" "}
            <Link href="/guides/attractions/japan-ski-trip-itinerary">Japan ski trip itinerary</Link> sets out
            7- and 10-day plans with the nights in each. For a whole winter route, see our{" "}
            <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link>, and the{" "}
            <Link href="/guides/transport/jr-east-pass">JR East Pass guide</Link> for whether the pass pays.
          </p>
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Lift prices by resort for 2026-27: <Link href="/guides/attractions/hakuba-happo-one-lift-ticket" style={{ color: "var(--red)", fontWeight: 600 }}>Happo-one</Link> ¥9,800 a day at peak, <Link href="/guides/attractions/hakuba-goryu-47-lift-ticket" style={{ color: "var(--red)", fontWeight: 600 }}>Hakuba47 and Goryu</Link> ¥9,500 online and <Link href="/guides/attractions/tsugaike-kogen-lift-ticket" style={{ color: "var(--red)", fontWeight: 600 }}>Tsugaike</Link> ¥9,800 at the window.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Beyond Hakuba, <Link href="/guides/attractions/myoko-suginohara-lift-ticket" style={{ color: "var(--red)", fontWeight: 600 }}>Myoko Suginohara</Link> in Myoko is ¥9,000 a day for adults and free up to elementary school age.
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

        <KlookTourPicks
          heading="Hakuba Ski Tours You Can Book"
          intro="Packages with the coach, lift and rental in one booking, a one-day tour from Tokyo, the airport coach and the rental shops. Open a listing for the price, what is included and the cancellation terms on your date."
          tours={[hakubaHapponeBusLiftRental, tsugaikeBusLiftRental, hakubaSkiResortDayTourTokyo, hakubaAirportShuttleBus, hakubaSkiSnowboardRental]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18l6-13 5 8 3-4 4 9z" />
                    <line x1="2" y1="21" x2="22" y2="21" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ten ski areas, one valley ticket</h2>
            <p className={styles.ctaBannerDesc}>
              Tsugaike and Happo-one open 1 December 2026 and Happo-one&apos;s peak pricing starts 19
              December. Reserve the bus and the bed first.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={hakubaHapponeBusLiftRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                See the Hakuba Package →
              </KlookLink>
              <KlookLink href={naganoHakubaShuttleBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Book the Nagano Bus →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
