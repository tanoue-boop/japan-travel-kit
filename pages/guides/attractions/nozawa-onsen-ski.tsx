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
  jrEastPass,
  klookEsim,
  nozawaHotelsUrl,
  nozawaOnsenSkiRental,
  nozawaSnowMonkeyShibuOnsenTour,
  nozawaSnowMonkeyZenkojiTour,
  ryuoNozawaTwoDayTourTokyo,
  type KlookTripPrepItem,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import HotelStayBlock from "../../../components/HotelStayBlock";

/**
 * Nozawa Onsen as a ski stay from Tokyo, for the reader searching "Nozawa Onsen
 * Ski" (task-jtk-20261117-02, 17 Nov 2026). The second Nagano page beside
 * hakuba-ski-tours: one mountain above a hot-spring village, reached from Iiyama
 * Station.
 *
 * Split from the neighbours: gala-yuzawa-ski-day-trip-from-tokyo is a day out;
 * niseko-ski-tours is Hokkaido; japan-winter-itinerary is a 12-day route;
 * hakuba-ski-tours is the bigger Nagano valley.
 *
 * Sources, all read 17 November 2026:
 *   nozawaski.com and nozawaski.com/event/20482/ — winter operation planned from
 *     Saturday 28 November.
 *   en.nozawaski.com/the-mountain/lift-ticket/ticket-prices/ — "Winter Fares –
 *     Season 2026-2027": price period 28 Nov – 5 May; 1 day Regular (19 Dec –
 *     28 Mar) adult ¥7,800, child (under 15) ¥4,700, senior (60+) ¥6,300.
 *   en.nozawaski.com/access/transport-guide/ — Tokyo → Iiyama, direct Hokuriku
 *     Shinkansen "around 1 hr 45 min".
 *   nozawaonsen.info/en/nozawa-onsen-liner/ and nozawakanko.jp/access/ — Nozawa
 *     Onsen Liner, Iiyama Station stop 4 → Nozawa Onsen, adult ¥600, child (6–12)
 *     ¥300, about 25 minutes, no booking; winter timetable 1 Dec 2026 – 31 Mar 2027.
 *   tickets.jr-odekake.net (JR West e5489 Shinkansen e-Ticket fare table, purchases
 *     from 14 March 2026) — Tokyo → Iiyama reserved, regular season, adult ¥8,690;
 *     +¥200 busy, +¥400 peak, −¥200 off-peak.
 *   nozawaski.com/winter/general/ — top 1,650 m, base 565 m, vertical 1,085 m,
 *     longest run 10,000 m, beginner 40% / intermediate 30% / advanced 30%. The
 *     same page still shows a 2024-25 operating period, so the course count (43
 *     there, 44 elsewhere) is left out.
 *   nozawaski.com/winter/course/map/ — Uenotaira wide and gentle, for beginners and
 *     families; Karasawa recommended for beginner lessons.
 *   nozawakanko.jp/hotspring/ — 13 public baths (soto-yu); a donation is requested.
 *   No official resort, village or operator page lists a direct bus from Tokyo or
 *   the airports, so none is printed.
 * Hakuba, Niseko and GALA Yuzawa rows are carried from hakuba-ski-tours (17 Nov
 * 2026), niseko-ski-tours (6 Nov 2026) and gala-yuzawa-ski-day-trip-from-tokyo
 * (15 Nov 2026).
 *
 * No Klook prices. Nothing here is first-hand.
 */

const CHECKED_ISO = "2026-11-17";
const CHECKED = checkedLabel(CHECKED_ISO);

const SHINKANSEN_TIME = "around 1 hour 45 minutes";
const SHINKANSEN_FARE = "¥8,690";
const LINER_TIME = "about 25 minutes";
const LINER_FARE = "¥600";
const OPEN = "28 November 2026";
const LIFT_ADULT = "¥7,800";
const LIFT_CHILD = "¥4,700";
const LIFT_SENIOR = "¥6,300";

const ROUTE = "/guides/attractions/nozawa-onsen-ski";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

/** Table 1 — Tokyo to Nozawa Onsen. First row is the answer. */
const accessRows = [
  {
    option: "Best for most: Hokuriku Shinkansen to Iiyama + Nozawa Onsen Liner bus",
    time: `${SHINKANSEN_TIME} + ${LINER_TIME}`,
    cost: `${SHINKANSEN_FARE} + ${LINER_FARE} = ¥9,290`,
    booking: "Bus: no booking. Train: reserved seat recommended",
    note: "The Liner leaves from bus stop 4 at Iiyama Station. The JR EAST PASS covers the shinkansen leg; the bus is paid separately.",
  },
  {
    option: "Small-group ski tour from Tokyo (2 days)",
    time: "Two days; times on the listing",
    cost: "Shown on the listing for your date",
    booking: "Book ahead",
    note: "Ryuo and Nozawa Onsen on one booking with transport from Tokyo and an hour of instruction — the version with no connections to plan.",
  },
  {
    option: "Direct bus from Tokyo or the airports",
    time: "—",
    cost: "—",
    booking: "—",
    note: "Not listed on the resort's, the village's or the bus operator's own access pages, so not compared here. The shinkansen is the published route.",
  },
];

/** Table 2 — season and official lift prices, 2026-27. */
const seasonRows = [
  { what: "Opening", detail: `${OPEN} (Saturday), planned` },
  { what: "Lift-ticket price period", detail: "28 November 2026 to 5 May 2027" },
  { what: "Regular season (prices below)", detail: "19 December 2026 to 28 March 2027" },
  { what: "Nozawa Onsen Liner winter timetable", detail: "1 December 2026 to 31 March 2027" },
];

const liftRows = [
  { who: "Adult", price: LIFT_ADULT },
  { who: "Child (under 15)", price: LIFT_CHILD },
  { who: "Senior (60+)", price: LIFT_SENIOR },
];

/** Table 3 — Nozawa Onsen vs Hakuba vs Niseko vs GALA Yuzawa. */
const compareRows = [
  {
    resort: "Nozawa Onsen (Nagano)",
    from: "Around 1 h 45 min to Iiyama + 25 min bus",
    season: "From 28 Nov 2026 (planned)",
    lift: `${LIFT_ADULT} (regular season)`,
    beginners: "40% beginner terrain on the resort's own split; Uenotaira is wide and gentle",
    onsen: "13 public baths (soto-yu), donation-based",
    best: "One mountain above an onsen village",
  },
  {
    resort: "Hakuba (Nagano)",
    from: "As little as 2 h 50 min by shinkansen + bus",
    season: "Dec 2026 – early May 2027 (valley, planned)",
    lift: "¥11,100 valley ticket; Happo-one ¥9,800 peak",
    beginners: "10 ski areas to choose from",
    onsen: "Six hot-spring sources in the village",
    best: "A ski week with the most terrain choice",
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
    q: "How do I get from Tokyo to Nozawa Onsen?",
    a: `Take the Hokuriku Shinkansen from Tokyo to Iiyama (${SHINKANSEN_TIME} on the direct trains, ${SHINKANSEN_FARE} for a reserved Shinkansen e-Ticket in regular season), then the Nozawa Onsen Liner bus from Iiyama Station stop 4 (${LINER_TIME}, ${LINER_FARE} for adults, ¥300 for children 6–12, no booking needed). Figures from the resort, the village and JR West, read ${CHECKED}.`,
  },
  {
    q: "When does Nozawa Onsen open for the 2026-27 ski season?",
    a: `Nozawa Onsen Snow Resort plans to open on Saturday ${OPEN}, and its 2026-27 lift-ticket prices run to 5 May 2027. Regular-season prices apply from 19 December 2026 to 28 March 2027. The opening depends on snow, so check the resort's own site before a late-November booking.`,
  },
  {
    q: "How much is a Nozawa Onsen lift ticket?",
    a: `A one-day ticket is ${LIFT_ADULT} for adults, ${LIFT_CHILD} for children under 15 and ${LIFT_SENIOR} for seniors 60 and over in regular season (19 December 2026 to 28 March 2027), on the resort's own 2026-27 fare page read ${CHECKED}.`,
  },
  {
    q: "Is Nozawa Onsen good for beginners?",
    a: "Yes. The resort's own terrain split is 40% beginner, 30% intermediate and 30% advanced. Its course map describes Uenotaira as wide and gently sloped, suited to beginners and families, and recommends Karasawa for beginner lessons. Book a lesson and rental ahead for holiday weeks.",
  },
  {
    q: "Can you day trip to Nozawa Onsen from Tokyo?",
    a: `It is possible but long: ${SHINKANSEN_TIME} to Iiyama plus ${LINER_TIME} on the bus each way, before any waiting for the connection. That is over four hours of travelling for a day on the snow. Nozawa Onsen suits a stay of two nights or more; for a day trip from Tokyo, GALA Yuzawa is 71 minutes by shinkansen with the slopes at the station.`,
  },
  {
    q: "Are the Nozawa Onsen public baths free?",
    a: "There are 13 public baths (soto-yu) in the village. The village tourism association does not charge a set fee but asks bathers for a donation, so carry some coins, and follow the bathing rules posted at each bath.",
  },
  {
    q: "Nozawa Onsen or Hakuba?",
    a: "Nozawa Onsen for one large mountain with the village and its baths at the bottom, reached with one change at Iiyama. Hakuba for a choice of 10 ski areas on one valley ticket (¥11,100 a day), reached by shinkansen to Nagano and a 70-minute bus. Both are Nagano, both are a few hours from Tokyo, and both open from late November or December.",
  },
  {
    q: "Does the JR Pass cover Nozawa Onsen?",
    a: "The JR EAST PASS covers the Hokuriku Shinkansen from Tokyo to Iiyama; the Nozawa Onsen Liner bus is a separate ¥600 fare. A Tokyo–Iiyama return on Shinkansen e-Tickets is about ¥17,400 in regular season against ¥35,000 for the 5-day pass, so the pass pays only if the same days include another long JR East trip.",
  },
];

const nozawaSameTrip: KlookTripPrepItem[] = [
  {
    label: nozawaOnsenSkiRental.title,
    ctaLabel: "Reserve Nozawa rental →",
    url: nozawaOnsenSkiRental.url,
    why: "Collected in front of the main gondola, so there is no gear to carry on the shinkansen or the Liner bus.",
  },
  {
    label: "Hotels near Nozawa Onsen Snow Resort",
    ctaLabel: "Check Nozawa hotels on Klook →",
    url: nozawaHotelsUrl,
    why: "The village is small; the bed decides whether the lifts and the soto-yu are a walk.",
  },
  {
    label: ryuoNozawaTwoDayTourTokyo.title,
    ctaLabel: "See the 2-day tour →",
    url: ryuoNozawaTwoDayTourTokyo.url,
    why: "Transport from Tokyo and two resorts in one booking, for a short trip with nothing to connect.",
  },
  {
    label: nozawaSnowMonkeyShibuOnsenTour.title,
    ctaLabel: "Check the snow monkey afternoon →",
    url: nozawaSnowMonkeyShibuOnsenTour.url,
    why: "A rest-day afternoon that departs from Nozawa Onsen.",
  },
  {
    label: klookEsim.name,
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
    why: "Lift status, the Liner timetable and the shinkansen back all live on a phone.",
  },
];

const TITLE = "Nozawa Onsen Ski (2026-27): Tokyo Access, Lifts & Onsen";
const DESCRIPTION =
  "Nozawa Onsen ski: Tokyo to Nozawa Onsen by shinkansen to Iiyama (¥8,690) and a ¥600 bus, a ¥7,800 lift day, 13 public baths and a Nozawa Onsen ski trip.";

const SAFETYWING_URL = "https://safetywing.com/nomad-insurance?referenceID=26614156&utm_source=26614156&utm_medium=Ambassador";

const related = [
  { href: "/guides/attractions/hakuba-ski-tours", title: "Hakuba Ski Tours (2026-27): Tokyo Access, Lifts & Resorts" },
  { href: "/guides/attractions/niseko-ski-tours", title: "Niseko Ski Tours (2027): Transfers, Lessons & 4 Areas" },
  { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "Tokyo to Gala Yuzawa 2026-27: Shinkansen Day Trip & JR Pass" },
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

export default function NozawaOnsenSkiPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Nozawa Onsen Ski", item: URL },
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
          <span className={styles.breadCurrent}>Nozawa Onsen Ski</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Nozawa Onsen Ski: <br />Tokyo to Nozawa Onsen, Lift Tickets and the 13 Baths
          </h1>
          <p className={styles.heroSubtitle}>
            One mountain with 1,085 m of vertical above a hot-spring village — one change at Iiyama
            from Tokyo, and no bus to reserve.
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
                <p className={styles.verdictStatValue}>Shinkansen to Iiyama + 25-min bus</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Opens</p>
                <p className={styles.verdictStatValue}>28 Nov 2026 (planned)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Lift ticket, 1 day</p>
                <p className={styles.verdictStatValue}>{LIFT_ADULT} adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Public baths</p>
                <p className={styles.verdictStatValue}>13 soto-yu, donation-based</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Nozawa Onsen ski</strong> trips from Tokyo take the{" "}
              <strong>Hokuriku Shinkansen to Iiyama ({SHINKANSEN_TIME}, {SHINKANSEN_FARE})</strong>, then the{" "}
              <strong>Nozawa Onsen Liner bus ({LINER_TIME}, {LINER_FARE}, no booking)</strong> from stop 4
              outside the station. Nozawa Onsen Snow Resort plans to open on{" "}
              <strong>{OPEN}</strong>, and a one-day lift ticket is <strong>{LIFT_ADULT}</strong> for an
              adult in regular season (19 December 2026 to 28 March 2027). The mountain has{" "}
              <strong>40% beginner terrain</strong> on the resort&apos;s own split, and the village below it
              has <strong>13 public baths</strong>. Figures are the operators&apos; own, read {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={nozawaOnsenSkiRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Reserve Nozawa Rental →
              </KlookLink>
              <KlookLink href={nozawaHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Nozawa Onsen Hotels →
              </KlookLink>
            </div>
          </div>
        </div>

        <WinterBookingTop
          heading="What Should You Book for a Nozawa Onsen Ski Trip in 2026-27?"
          checkedIso={CHECKED_ISO}
          deadline={
            <>
              Book the bed first — the village is small — then the rental for your ski days. The Liner bus
              needs no booking; the shinkansen seat to Iiyama can be reserved one month ahead. Regular-season
              lift prices start 19 December 2026.
            </>
          }
          tours={[
            { title: nozawaOnsenSkiRental.title, url: nozawaOnsenSkiRental.url, price: null, duration: "Per day", departs: "In front of the main gondola" },
            { title: ryuoNozawaTwoDayTourTokyo.title, url: ryuoNozawaTwoDayTourTokyo.url, price: null, duration: "2 days", departs: "Tokyo" },
            { title: nozawaSnowMonkeyShibuOnsenTour.title, url: nozawaSnowMonkeyShibuOnsenTour.url, price: null, duration: "Afternoon", departs: "Nozawa Onsen" },
          ]}
        />

        <KlookTripPrep
          label="Book on the same trip"
          heading="What a Nozawa Onsen Ski Trip Books Alongside the Lift Ticket"
          intro="The gear and the bed first, then a rest-day afternoon and data for the trip."
          items={nozawaSameTrip}
        />
        <p className={styles.bodyText} style={{ fontSize: "0.9rem" }}>
          <strong>Ski insurance:</strong> many standard travel policies exclude snowsports or off-piste.{" "}
          <a href={SAFETYWING_URL} target="_blank" rel="sponsored nofollow noopener noreferrer">
            SafetyWing
          </a>{" "}
          is one option; our{" "}
          <Link href="/guides/money/japan-ski-travel-insurance">Japan ski travel insurance guide</Link>{" "}
          sets out what each policy covers on and off the marked runs.
        </p>

        <EsimCtaTop />

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get From Tokyo to Nozawa Onsen?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Shinkansen to Iiyama, then the Nozawa Onsen Liner</strong> — ¥9,290 one way for the
            two, with one change. The bus needs no reservation.
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
            tickets.jr-odekake.net. Shinkansen time: en.nozawaski.com/access/transport-guide/. Liner bus:
            nozawaonsen.info/en/nozawa-onsen-liner/ and nozawakanko.jp/access/ (child 6–12 ¥300; winter
            timetable 1 Dec 2026 – 31 Mar 2027).
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrEastPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              JR EAST PASS →
            </KlookLink>
            <KlookLink href={ryuoNozawaTwoDayTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              2-day ski tour from Tokyo →
            </KlookLink>
          </div>
        </section>

        {/* Day trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day trip?</span>
          <h2 className={styles.sectionTitle}>Can You Day Trip to Nozawa Onsen From Tokyo?</h2>
          <p className={styles.bodyText}>
            <strong>Possible, but it is over four hours of travelling for one day on the snow.</strong>{" "}
            {SHINKANSEN_TIME} to Iiyama and {LINER_TIME} on the Liner each way, before any wait for the
            connection. Nozawa Onsen rewards two nights or more — the baths are the evening. For a day trip,
            the <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">GALA Yuzawa day trip</Link>{" "}
            is 71 minutes from Tokyo Station with the slopes at the station.
          </p>
        </section>

        {/* Season and lift tickets */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Season &amp; lift tickets</span>
          <h2 className={styles.sectionTitle}>When Does Nozawa Onsen Open, and How Much Is a Lift Ticket?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Opening is planned for Saturday {OPEN}</strong>, and a one-day ticket is{" "}
            <strong>{LIFT_ADULT}</strong> for an adult in regular season.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["2026-27", "Dates"].map((h) => (
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
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["1-day lift ticket, regular season", "Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {liftRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={sourceNote}>
            Last checked {CHECKED}: nozawaski.com (opening) and
            en.nozawaski.com/the-mountain/lift-ticket/ticket-prices/ (&ldquo;Winter Fares – Season
            2026-2027&rdquo;). Only the regular-season one-day prices are quoted; the opening date depends on
            snow.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nozawaOnsenSkiRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Reserve rental by the gondola →
            </KlookLink>
          </div>
        </section>

        {/* Beginners */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Beginners</span>
          <h2 className={styles.sectionTitle}>Is Nozawa Onsen Good for Beginners?</h2>
          <p className={styles.bodyText}>
            <strong>Yes — 40% of the terrain is graded beginner</strong>, 30% intermediate and 30% advanced,
            on the resort&apos;s own general-information page. Its course map describes{" "}
            <strong>Uenotaira</strong> as wide and gently sloped, suited to beginners and families, and
            recommends <strong>Karasawa</strong> for beginner lessons. The same page gives the mountain as a
            1,650 m top and a 565 m base — 1,085 m of vertical — with a longest run of 10,000 m.
          </p>
          <p className={styles.bodyText} style={sourceNote}>
            Last checked {CHECKED}: nozawaski.com/winter/general/ and nozawaski.com/winter/course/map/.
          </p>
        </section>

        {/* Onsen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The baths</span>
          <h2 className={styles.sectionTitle}>Are the Nozawa Onsen Public Baths Free?</h2>
          <p className={styles.bodyText}>
            <strong>There is no set fee, but a donation is requested.</strong> The village tourism
            association lists <strong>13 public baths (soto-yu)</strong> and asks bathers for a small
            donation. Follow the bathing rules posted at each one. If a private
            bath matters to you, check it in the hotel listing before you book.
          </p>
          <p className={styles.bodyText} style={sourceNote}>
            Last checked {CHECKED}: nozawakanko.jp/hotspring/.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nozawaHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nozawa Onsen hotels →
            </KlookLink>
            <KlookLink href={nozawaSnowMonkeyZenkojiTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Snow monkeys &amp; Zenko-ji from Nozawa →
            </KlookLink>
          </div>
        </section>

        {/* Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Nozawa Onsen or Hakuba? Nozawa vs Hakuba vs Niseko vs GALA Yuzawa</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Nozawa Onsen for one mountain and an onsen village; Hakuba for the most terrain choice;
            Niseko if you will fly to Hokkaido; GALA Yuzawa for a day trip.</strong>
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
            Last checked: Nozawa Onsen and Hakuba {CHECKED} (en.nozawaski.com, nozawakanko.jp,
            hakubavalley.com, happo-one.jp, vill.hakuba.nagano.jp/hotspring/); Niseko 6 November 2026
            (niseko.ne.jp); GALA Yuzawa 15 November 2026 (gala.co.jp). The table compares published dates,
            prices and terrain rather than snow quality, which varies by season.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Details for each: <Link href="/guides/attractions/hakuba-ski-tours">Hakuba ski tours</Link>,{" "}
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link> and the{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">GALA Yuzawa day trip from Tokyo</Link>.
          </p>
        </section>

        {/* Plan */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Plan the Nozawa Onsen ski trip</span>
          <h2 className={styles.sectionTitle}>How Long Should a Nozawa Onsen Ski Trip Be?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Two nights at least</strong>, so the travelling is not the whole trip: arrive in the
            afternoon, ski a full day, and leave after a morning on the snow.
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Do it yourself</p>
              <p className={styles.whoForDesc}>
                Shinkansen to Iiyama, the Liner to the village, a hotel near the lifts, rental reserved for
                your ski days and the lift ticket at {LIFT_ADULT} a day.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Let a tour carry it</p>
              <p className={styles.whoForDesc}>
                The two-day small-group tour from Tokyo puts the transport and two resorts on one booking.
                Check the listing for what is and is not included on your date.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Add a rest day</p>
              <p className={styles.whoForDesc}>
                Two tours depart from Nozawa Onsen for the Jigokudani snow monkeys — one with Shibu Onsen,
                one with Zenko-ji and a sake tasting.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Check the cancellation terms</p>
              <p className={styles.whoForDesc}>
                Snow and wind close lifts and delay buses. Read each listing&apos;s cancellation and
                bad-weather terms for your date before you pay.
              </p>
            </div>
          </div>
        </section>

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="nozawa" />

        {/* Pairing */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The rest of your winter</span>
          <h2 className={styles.sectionTitle}>What Can You Pair With Nozawa Onsen?</h2>
          <p className={styles.bodyText}>
            The <Link href="/guides/attractions/jigokudani-snow-monkey-tour">Jigokudani snow monkey tour</Link>{" "}
            is the classic rest day from northern Nagano. For a second resort, the{" "}
            <Link href="/guides/attractions/hakuba-ski-tours">Hakuba ski tours</Link> guide covers the valley
            reached by bus from Nagano, one stop back towards Tokyo on the shinkansen. To fit both into one
            trip, the <Link href="/guides/attractions/japan-ski-trip-itinerary">Japan ski trip itinerary</Link>{" "}
            lays out 7- and 10-day plans with the nights in each place. For a whole winter
            route, see the <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link>,
            and the <Link href="/guides/transport/jr-east-pass">JR East Pass guide</Link> for whether the pass
            pays.
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
          heading="Nozawa Onsen Bookings You Can Make Now"
          intro="Rental by the main gondola, a two-day tour from Tokyo, and two rest-day tours from the village. Open a listing for the price, what is included and the cancellation terms on your date."
          tours={[nozawaOnsenSkiRental, ryuoNozawaTwoDayTourTokyo, nozawaSnowMonkeyShibuOnsenTour, nozawaSnowMonkeyZenkojiTour]}
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
            <h2 className={styles.ctaBannerTitle}>One mountain, thirteen baths</h2>
            <p className={styles.ctaBannerDesc}>
              Nozawa Onsen plans to open {OPEN}. Book the bed and the rental; the Liner bus from Iiyama needs
              no reservation.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={nozawaHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Check Nozawa Hotels →
              </KlookLink>
              <KlookLink href={nozawaOnsenSkiRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Reserve Rental →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
