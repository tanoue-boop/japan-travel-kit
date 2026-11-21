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
  echigoYuzawaStationSkiRental,
  hakubaAirportShuttleBus,
  hakubaHotelsUrl,
  hakubaSkiSnowboardRental,
  klookEsim,
  luggageDeliveryCards,
  naganoHakubaShuttleBus,
  nisekoLiftTicketGearDelivery,
  nisekoResortShuttleBus,
  nozawaHotelsUrl,
  nozawaOnsenSkiRental,
  shinkansenTokyoGalaYuzawa,
  shinkansenTokyoNagano,
  type KlookTripPrepItem,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Japan ski trip itinerary — the planning page that sits above the four resort
 * pages (task-jtk-20261118-01, 18 Nov 2026). Written because Australian buyers on
 * 15 Nov booked the Tokyo → Echigo-Yuzawa shinkansen and nothing else, and the
 * site had resort pages but no page that says how many nights go where.
 *
 * Split from the neighbours: japan-winter-itinerary is a sightseeing winter route
 * with one ski stop; this page is a trip where skiing is the point. Each resort's
 * detail stays on hakuba-ski-tours, nozawa-onsen-ski, niseko-ski-tours,
 * gala-yuzawa-ski-day-trip-from-tokyo and sapporo-ski-day-trip.
 *
 * Re-read on 18 November 2026:
 *   en.nozawaski.com/the-mountain/lift-ticket/ticket-prices/ — 2026-27 period
 *     28 Nov – 5 May; regular 19 Dec – 28 Mar; 1 day adult ¥7,800, 3 days ¥21,200.
 *   en.nozawaski.com/access/transport-guide/ — Tokyo → Iiyama direct Hokuriku
 *     Shinkansen "around 1 hr 45 min".
 *   nozawaonsen.info/en/nozawa-onsen-liner/ — Liner adult ¥600 one way.
 *   hakubavalley.com/en/ticket_en/ — 2026-27 all-mountain pass: 1 day adult
 *     ¥11,100; 4 days ¥42,800, valid 8 days from first use.
 *   hakubavalley.com/en/access_en/ — from Tokyo by Hokuriku Shinkansen and express
 *     bus "in as little as 2 hours 50 minutes"; from Osaka by Tokaido Shinkansen,
 *     limited express Shinano and Azusa "in as little as 4 hours 50 minutes"; from
 *     Nagoya by the Shinano "in as little as 3 hours 30 minutes".
 *   alpico.co.jp/traffic/express/nagano_hakuba/ — winter timetable 12 Dec 2026 –
 *     26 Mar 2027; reservation-only services booked through Highway Bus.com.
 *   niseko.ne.jp/en/lift/ — All Mountain Pass 2026-27: peak (24 Dec – 28 Feb) 1 day
 *     ¥13,500, 4 days ¥52,500; regular (12–23 Dec, 1–22 Mar) 1 day ¥12,600.
 *   niseko.ne.jp/en/niseko/getting-to-niseko/ — New Chitose → Niseko direct bus
 *     2.5 hrs ¥6,000 booking required; train + local bus 3 hrs ¥6,200; Haneda →
 *     New Chitose 1 hr 35 min, Narita → New Chitose 1 hr 50 min.
 *   gala.co.jp/winter/hours-pricing/ — gondola & lift ticket adult ¥8,000 (web
 *     ¥7,500); slopes from 19 Dec 2026.
 * Carried with their own check dates from the sister pages: Tokyo → Nagano about
 *   80 min and ¥8,250 (Shinkansen e-Ticket reserved, regular season), Alpico bus 70
 *   min ¥3,500, Tokyo → Iiyama ¥8,690, Liner about 25 min — hakuba-ski-tours and
 *   nozawa-onsen-ski, 17 Nov 2026. GALA 71 min from Tokyo and the ¥6,500 1-day ski
 *   set — gala-yuzawa-ski-day-trip-from-tokyo (gala.co.jp, 1 and 15 Nov 2026).
 *   Niseko United's month guide (January the most consistent snowfall, February
 *   peak powder, December and March quieter) and Grand Hirafu's 620 cm January
 *   snowfall — niseko-ski-tours (1 and 6 Nov 2026).
 *
 * No Klook prices. Nothing here is first-hand.
 */

const CHECKED_ISO = "2026-11-18";
const CHECKED = checkedLabel(CHECKED_ISO);
const SISTER = checkedLabel("2026-11-17");

const ROUTE = "/guides/attractions/japan-ski-trip-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

/** Table 1 — Honshu (Nagano / Niigata) vs Hokkaido. First row is the answer. */
const regionRows = [
  {
    region: "Best for a first ski trip from Tokyo: Honshu — Hakuba or Nozawa Onsen (Nagano)",
    access: "No flight: shinkansen + bus, as little as 2 h 50 min to Hakuba; around 1 h 45 min + a 25-min bus to Nozawa Onsen",
    snow: "Snowfall is not compared on this page",
    cost: "1-day lift ¥7,800 (Nozawa) to ¥11,100 (Hakuba Valley, 10 areas)",
    fits: "7 days: 1 + 4 + 2 nights",
  },
  {
    region: "Honshu — Yuzawa (Niigata)",
    access: "71 min by shinkansen to GALA Yuzawa; slopes at the station",
    snow: "Not compared on this page",
    cost: "1-day lift ¥8,000 at GALA",
    fits: "A day trip from a Tokyo hotel, or one extra ski day",
  },
  {
    region: "Hokkaido — Niseko (and the Sapporo resorts)",
    access: "Flight to New Chitose (1 h 35 min from Haneda), then 2.5 h by booked coach",
    snow: "Grand Hirafu measured 620 cm of snowfall in January in its last completed season (its own figure)",
    cost: "1-day All Mountain Pass ¥13,500 at peak (24 Dec – 28 Feb)",
    fits: "10 days or more, so the flight is worth it",
  },
];

/** Table 2a — 7 days, Tokyo + one Nagano resort. */
const sevenDayRows = [
  { day: "Day 1", base: "Tokyo", move: "Arrive; airport to hotel", book: "Airport transfer, eSIM" },
  { day: "Day 2", base: "Hakuba (or Nozawa Onsen)", move: "Tokyo → Nagano by shinkansen, about 80 min; Alpico bus to Hakuba, 70 min (Nozawa: shinkansen to Iiyama around 1 h 45 min + Liner bus 25 min)", book: "Shinkansen seat; Nagano–Hakuba bus (reservation required); rental for your ski days" },
  { day: "Days 3–5", base: "Hakuba (or Nozawa Onsen)", move: "Ski; resort shuttles", book: "Lift tickets (Hakuba Valley 1 day ¥11,100, or Nozawa 3 days ¥21,200)" },
  { day: "Day 6", base: "Tokyo", move: "Morning on the snow, afternoon back to Tokyo the same way", book: "Return shinkansen seat and bus" },
  { day: "Day 7", base: "Tokyo", move: "Tokyo day; fly home on the morning of day 8", book: "City tickets if any" },
];

/** Table 2b — 10 days, two Nagano resorts. */
const tenDayRows = [
  { day: "Day 1", base: "Tokyo", move: "Arrive", book: "Airport transfer, eSIM" },
  { day: "Day 2", base: "Hakuba", move: "Tokyo → Nagano shinkansen + Alpico bus (as little as 2 h 50 min)", book: "Shinkansen, bus, Hakuba rental" },
  { day: "Days 3–6", base: "Hakuba", move: "Ski four days across the valley's 10 areas", book: "Hakuba Valley 4-day ticket ¥42,800 (valid 8 days from first use)" },
  { day: "Day 7", base: "Nozawa Onsen", move: "Bus back to Nagano, one stop on the shinkansen to Iiyama, Liner bus to the village", book: "Nagano bus, Nozawa rental" },
  { day: "Days 8–9", base: "Nozawa Onsen", move: "Ski; 13 public baths in the village", book: "Nozawa lift tickets (1 day ¥7,800)" },
  { day: "Day 10", base: "Tokyo / fly home", move: "Liner bus (25 min) + shinkansen from Iiyama (around 1 h 45 min)", book: "Return shinkansen seat" },
];

/** Table 2c — 10 days, Hokkaido. */
const tenDayHokkaidoRows = [
  { day: "Day 1", base: "Tokyo or New Chitose", move: "Arrive; connect to New Chitose (1 h 35 min from Haneda, 1 h 50 min from Narita)", book: "Domestic flight" },
  { day: "Day 2", base: "Niseko", move: "Direct coach from New Chitose, 2.5 h, ¥6,000 (booking required)", book: "Niseko coach, rental, lessons" },
  { day: "Days 3–7", base: "Niseko", move: "Ski the four linked areas", book: "All Mountain Pass (peak 4 days ¥52,500; buy the length you need)" },
  { day: "Day 8", base: "Sapporo", move: "Coach Niseko → Sapporo", book: "Coach seat, Sapporo hotel" },
  { day: "Day 9", base: "Sapporo", move: "A city day, or a ski day at Teine or Kiroro", book: "Sapporo ski day tour if you ski" },
  { day: "Day 10", base: "Fly home", move: "Train or coach to New Chitose", book: "—" },
];

/** Table 3 — getting there from Tokyo and Osaka. */
const accessRows = [
  {
    resort: "Hakuba",
    tokyo: "Hokuriku Shinkansen to Nagano (about 80 min, ¥8,250) + Alpico bus (70 min, ¥3,500): as little as 2 h 50 min",
    osaka: "Tokaido Shinkansen, limited express Shinano and Azusa: as little as 4 h 50 min (Nagoya: 3 h 30 min)",
    booking: "Bus reservation required; reserved shinkansen seat recommended",
  },
  {
    resort: "Nozawa Onsen",
    tokyo: "Hokuriku Shinkansen to Iiyama (around 1 h 45 min, ¥8,690) + Nozawa Onsen Liner (25 min, ¥600)",
    osaka: "No route published on the resort's own access page; via Tokyo or Nagano",
    booking: "Liner: no booking",
  },
  {
    resort: "GALA Yuzawa",
    tokyo: "Joetsu Shinkansen direct to GALA Yuzawa station: 71 min at the fastest",
    osaka: "Via Tokyo, then the Joetsu Shinkansen",
    booking: "Reserved shinkansen seat",
  },
  {
    resort: "Niseko",
    tokyo: "Fly Haneda → New Chitose (1 h 35 min) or Narita (1 h 50 min), then coach 2.5 h (¥6,000) or train + bus 3 h (¥6,200)",
    osaka: "Fly to New Chitose, then the same coach",
    booking: "Coach booking required; train + bus no booking",
  },
];

/** Table 4 — cost on the snow, official prices. */
const costRows = [
  { resort: "Nozawa Onsen", day: "¥7,800 (regular season, 19 Dec – 28 Mar)", multi: "3 days ¥21,200", rental: "On the rental listing", transfer: "Liner bus ¥600 from Iiyama" },
  { resort: "Hakuba Valley (10 areas)", day: "¥11,100", multi: "4 days ¥42,800 (valid 8 days)", rental: "On the rental listing", transfer: "Alpico bus ¥3,500 from Nagano" },
  { resort: "GALA Yuzawa", day: "¥8,000 (web ¥7,500)", multi: "—", rental: "Ski set ¥6,500 a day (GALA's own rental)", transfer: "None: the station is at the slopes" },
  { resort: "Niseko United", day: "¥13,500 peak; ¥12,600 regular", multi: "Peak 4 days ¥52,500", rental: "On the rental listing", transfer: "Coach ¥6,000 from New Chitose" },
];

const faqItems = [
  {
    q: "What is a good 7-day Japan ski trip itinerary?",
    a: `One night in Tokyo, four nights in Hakuba or Nozawa Onsen, then two nights back in Tokyo. Tokyo to Nagano is about 80 minutes on the Hokuriku Shinkansen (¥8,250 reserved, regular season) and the Alpico bus to Hakuba is 70 minutes (¥3,500, reservation required); for Nozawa Onsen it is around 1 h 45 min to Iiyama (¥8,690) and the ¥600 Liner bus. That leaves three full ski days plus a morning. Figures read ${SISTER} and ${CHECKED}.`,
  },
  {
    q: "How many days do you need for a ski trip in Japan?",
    a: "Seven days is enough for one Nagano resort from Tokyo, because there is no flight: about three and a half days on the snow. For Niseko, plan ten days or more — the domestic flight to New Chitose and the 2.5-hour coach take most of a day each way. A single ski day from Tokyo works at GALA Yuzawa, 71 minutes by shinkansen with the slopes at the station.",
  },
  {
    q: "Hakuba or Niseko?",
    a: "Hakuba if you land in Tokyo and want no second flight: as little as 2 h 50 min by shinkansen and bus, and one ¥11,100 ticket covers 10 ski areas. Niseko if the trip is about Hokkaido snow and you will fly to New Chitose: then 2.5 hours by coach, ¥13,500 a day at peak. Nozawa Onsen is the Nagano alternative for one mountain above an onsen village at ¥7,800 a day.",
  },
  {
    q: "Can you ski in Japan without a car?",
    a: "Yes. Hakuba, Nozawa Onsen, GALA Yuzawa and Niseko are all reached by shinkansen or flight plus a bus. Two of the buses need a booking: the Alpico Nagano–Hakuba express (reservation required) and the direct New Chitose–Niseko coach (booking required). The Nozawa Onsen Liner from Iiyama needs none, and GALA has its own shinkansen station.",
  },
  {
    q: "When is the best time to ski in Japan?",
    a: "Mid-January to February for the most snow: Niseko United's own month guide calls January one of the most consistent places in the world for snowfall and February peak powder, with crowds to match. December and March are quieter; Niseko's regular-season pass is ¥12,600 against ¥13,500 at peak. In 2026-27 Nozawa Onsen and Niseko plan to open on 28 November, Hakuba Valley from December and GALA's slopes on 19 December, and most run into early May.",
  },
  {
    q: "Do you need ski travel insurance for Japan?",
    a: "Check before you go: many standard travel policies exclude snowsports or skiing off the marked runs, and a ski injury abroad is expensive. Our Japan ski travel insurance guide sets out what policies cover on-piste and off-piste.",
  },
  {
    q: "Should you book lift tickets and rental before you arrive?",
    a: "Rental and the bed, yes — they are what runs short in holiday weeks. Lift tickets are sold at the resorts, and some are cheaper online: GALA's web ticket is ¥7,500 against ¥8,000 at the window. Niseko's early-season pass (28 Nov – 11 Dec) is not sold online.",
  },
  {
    q: "Can you go from Hakuba to Nozawa Onsen on the same trip?",
    a: "Yes, with two changes: the Alpico bus back to Nagano (70 minutes), one stop on the Hokuriku Shinkansen to Iiyama, and the Nozawa Onsen Liner (25 minutes, ¥600) to the village. It fits a 10-day trip with four ski days in Hakuba and two in Nozawa.",
  },
];

const sameTrip: KlookTripPrepItem[] = [
  {
    label: "Hotels in Hakuba",
    ctaLabel: "Check Hakuba hotels on Klook →",
    url: hakubaHotelsUrl,
    why: "Four nights in one place make the bed the biggest booking of the trip; which resort it sits beside decides your morning shuttle.",
  },
  {
    label: "Hotels near Nozawa Onsen Snow Resort",
    ctaLabel: "Check Nozawa hotels on Klook →",
    url: nozawaHotelsUrl,
    why: "A small village where the beds near the lifts and the public baths go first in holiday weeks.",
  },
  {
    label: hakubaSkiSnowboardRental.title,
    ctaLabel: "Reserve Hakuba rental →",
    url: hakubaSkiSnowboardRental.url,
    why: "Priced by the number of days, one to seven — the length of a ski week.",
  },
  {
    label: nozawaOnsenSkiRental.title,
    ctaLabel: "Reserve Nozawa rental →",
    url: nozawaOnsenSkiRental.url,
    why: "Collected in front of the main gondola, so no gear on the shinkansen.",
  },
  {
    label: hakubaAirportShuttleBus.title,
    ctaLabel: "Check the airport shuttle →",
    url: hakubaAirportShuttleBus.url,
    why: "Narita or Haneda straight to Hakuba with ski equipment and one bag per person included — skip the Tokyo night on day 1.",
  },
  {
    label: klookEsim.name,
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
    why: "Bus reservations, lift status and the shinkansen back all live on a phone.",
  },
  luggageDeliveryCards.skiItinerary,
];

const TITLE = "Japan Ski Trip Itinerary: 7 & 10 Days, Hakuba to Niseko";
const DESCRIPTION =
  "Japan ski trip itinerary: 7 days skiing in Japan = Tokyo 1 night, Hakuba or Nozawa 4, Tokyo 2. A 10-day Japan ski itinerary for Niseko, with lift prices.";

const SAFETYWING_URL = "https://safetywing.com/nomad-insurance?referenceID=26614156&utm_source=26614156&utm_medium=Ambassador";

const related = [
  { href: "/guides/attractions/hakuba-ski-tours", title: "Hakuba Ski Tours (2026-27): Tokyo Access, Lifts & Resorts" },
  { href: "/guides/attractions/nozawa-onsen-ski", title: "Nozawa Onsen Ski (2026-27): Tokyo Access, Lifts & Onsen" },
  { href: "/guides/attractions/niseko-ski-tours", title: "Niseko Ski Tours (2027): Transfers, Lessons & 4 Areas" },
  { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "Tokyo to Gala Yuzawa 2026-27: Shinkansen Day Trip & JR Pass" },
  { href: "/guides/attractions/sapporo-ski-day-trip", title: "Sapporo Ski Day Trip 2026-27: Teine, Kiroro & Rusutsu Tours" },
  { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary: 12 Days, Day by Day (2027)" },
  { href: "/guides/money/japan-ski-travel-insurance", title: "Japan Ski Travel Insurance: What Standard Policies Exclude" },
  { href: "/guides/esim/best-esim-japan", title: "Best eSIM for Japan (2026): Providers, Prices and Which to Pick" },
  { href: "/guides/attractions", title: "More Things to Do in Japan →" },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

type DayRow = { day: string; base: string; move: string; book: string };

function DayTable({ rows }: { rows: DayRow[] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Day", "Base", "Getting around", "Book ahead"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.day}>
                <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.day}</td>
                <td style={{ fontSize: "0.86rem" }}>{row.base}</td>
                <td style={{ fontSize: "0.86rem" }}>{row.move}</td>
                <td style={{ fontSize: "0.86rem" }}>{row.book}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function JapanSkiTripItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Japan Ski Trip Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Japan Ski Trip Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan Ski Trip Itinerary: <br />7 Days Skiing in Japan, Plus a 10-Day Japan Ski Itinerary
          </h1>
          <p className={styles.heroSubtitle}>
            How many nights go where, how to get between Tokyo and the snow without a car, and what to book
            before you fly.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "2026-27 lift prices, official", "Shinkansen + bus times", "7- and 10-day plans"].map((t) => (
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
                <p className={styles.verdictStatLabel}>7 days</p>
                <p className={styles.verdictStatValue}>Tokyo 1 → Hakuba or Nozawa 4 → Tokyo 2 nights</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tokyo → Hakuba</p>
                <p className={styles.verdictStatValue}>As little as 2 h 50 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Niseko</p>
                <p className={styles.verdictStatValue}>10 days+: flight + 2.5 h coach</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Lift, 1 day (adult)</p>
                <p className={styles.verdictStatValue}>¥7,800 – ¥13,500</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Japan ski trip itinerary</strong> for 7 days is{" "}
              <strong>one night in Tokyo, four nights in Hakuba or Nozawa Onsen, then two nights back in
              Tokyo</strong>. Tokyo to Nagano is <strong>about 80 minutes on the Hokuriku Shinkansen
              (¥8,250)</strong>, and the Alpico bus from Nagano to Hakuba is <strong>70 minutes (¥3,500,
              reservation required)</strong>; for Nozawa Onsen, the shinkansen to Iiyama is around 1 h 45 min
              (¥8,690) and the Liner bus 25 minutes (¥600). For <strong>Niseko</strong>, add a flight — Haneda to
              New Chitose is 1 h 35 min, then 2.5 hours by coach (¥6,000) — and plan 10 days. A one-day lift
              ticket runs from ¥7,800 (Nozawa Onsen) to ¥13,500 (Niseko at peak) in 2026-27, on the resorts&apos;
              own price pages read {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={hakubaHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Hakuba Hotels →
              </KlookLink>
              <KlookLink href={hakubaSkiSnowboardRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Reserve Ski Rental →
              </KlookLink>
            </div>
          </div>
        </div>

        <WinterBookingTop
          heading="What Should You Book First for a Japan Ski Trip?"
          checkedIso={CHECKED_ISO}
          deadline={
            <>
              The bed first, then rental for your ski days and the buses that need a reservation (Nagano–Hakuba,
              New Chitose–Niseko). Shinkansen seats open one month ahead. Peak lift prices start 19 December
              (Nozawa) and 24 December (Niseko).
            </>
          }
          tours={[
            { title: hakubaSkiSnowboardRental.title, url: hakubaSkiSnowboardRental.url, price: null, duration: "1–7 days", departs: "Hakuba Village" },
            { title: hakubaAirportShuttleBus.title, url: hakubaAirportShuttleBus.url, price: null, duration: "One way", departs: "Narita, Haneda or Tokyo" },
            { title: nisekoResortShuttleBus.title, url: nisekoResortShuttleBus.url, price: null, duration: "One way", departs: "New Chitose or Sapporo" },
          ]}
        />

        <KlookTripPrep
          label="Book on the same trip"
          heading="What a Japan Ski Trip Books Alongside the Lift Ticket"
          intro="The bed and the gear for the four nights at the resort, the airport run, data for the trip, and a way to send the city suitcase so you travel with the ski bag only."
          items={sameTrip}
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

        {/* How many days */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Trip length</span>
          <h2 className={styles.sectionTitle}>How Many Days Do You Need for a Ski Trip in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>Seven days for one Nagano resort; ten or more for Niseko.</strong> From Tokyo, Hakuba and
            Nozawa Onsen are a morning away by shinkansen and bus, so a week gives about three and a half days
            on the snow. Niseko adds a domestic flight and a 2.5-hour coach each way, which is why it suits a
            longer trip. If you only have one day, the{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">GALA Yuzawa day trip</Link>{" "}
            is 71 minutes from Tokyo Station with the slopes at the station.
          </p>
        </section>

        {/* Region */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Choose the region</span>
          <h2 className={styles.sectionTitle}>Hakuba or Niseko? Honshu vs Hokkaido for a Japan Ski Trip</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Honshu (Hakuba, Nozawa Onsen) if you fly into Tokyo and want no second flight; Hokkaido
            (Niseko) if the trip is about the snow and you have ten days.</strong>
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Region", "Access from Tokyo", "Snow", "Cost (1-day lift, adult)", "Fits"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {regionRows.map((row) => (
                    <tr key={row.region}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.region}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.access}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.snow}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.fits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={sourceNote}>
            Last checked {CHECKED}: hakubavalley.com/en/access_en/ and /en/ticket_en/,
            en.nozawaski.com/the-mountain/lift-ticket/ticket-prices/, gala.co.jp/winter/hours-pricing/,
            niseko.ne.jp/en/lift/ and niseko.ne.jp/en/niseko/getting-to-niseko/. Nozawa journey time from
            nozawa-onsen-ski (read {SISTER}); Grand Hirafu snowfall from en.grand-hirafu.jp/snow/discover/ as
            carried on our Niseko page (read 1 November 2026).
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Each resort in detail: <Link href="/guides/attractions/hakuba-ski-tours">Hakuba ski tours</Link>,{" "}
            <Link href="/guides/attractions/nozawa-onsen-ski">Nozawa Onsen ski</Link>,{" "}
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link> and the{" "}
            <Link href="/guides/attractions/sapporo-ski-day-trip">Sapporo ski day trip</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakubaHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Hakuba hotels →
            </KlookLink>
            <KlookLink href={nisekoLiftTicketGearDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Niseko lift ticket + gear →
            </KlookLink>
          </div>
        </section>

        {/* 7-day */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>7 days</span>
          <h2 className={styles.sectionTitle}>What Does a 7-Day Japan Ski Itinerary Look Like?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Tokyo one night, Hakuba or Nozawa Onsen four nights, Tokyo two nights</strong> — three full
            ski days and a morning, with no flight inside Japan.
          </p>
          <DayTable rows={sevenDayRows} />
          <p className={styles.bodyText} style={sourceNote}>
            Last checked: lift prices {CHECKED} (hakubavalley.com/en/ticket_en/,
            en.nozawaski.com/the-mountain/lift-ticket/ticket-prices/). Shinkansen times and fares and the Alpico
            bus read {SISTER} (media.jreast.co.jp, tickets.jr-odekake.net, alpico.co.jp, nozawaonsen.info); the
            Alpico route page re-read {CHECKED} still marks reservation-only services. If you land at Narita or
            Haneda in the morning, the airport shuttle straight to Hakuba replaces day 1 in Tokyo.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoNagano.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo → Nagano shinkansen →
            </KlookLink>
            <KlookLink href={naganoHakubaShuttleBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nagano → Hakuba bus →
            </KlookLink>
            <KlookLink href={hakubaAirportShuttleBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Airport → Hakuba shuttle →
            </KlookLink>
          </div>
        </section>

        {/* 10-day */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>10 days</span>
          <h2 className={styles.sectionTitle}>What About 10 Days? Two Nagano Resorts, or Niseko</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Ten days fits Hakuba and Nozawa Onsen on one trip, or a Niseko week with a Sapporo
            finish.</strong> The Hakuba Valley 4-day ticket (¥42,800) is valid for 8 days from first use, so a
            rest day does not waste it.
          </p>
          <h3 className={styles.bodyText} style={{ fontWeight: 700, marginBottom: "0.5rem" }}>10 days, Nagano: Hakuba + Nozawa Onsen</h3>
          <DayTable rows={tenDayRows} />
          <h3 className={styles.bodyText} style={{ fontWeight: 700, margin: "1.25rem 0 0.5rem" }}>10 days, Hokkaido: Niseko + Sapporo</h3>
          <DayTable rows={tenDayHokkaidoRows} />
          <p className={styles.bodyText} style={sourceNote}>
            Last checked {CHECKED}: hakubavalley.com/en/ticket_en/ (4-day ticket and its validity),
            en.nozawaski.com (lift prices), niseko.ne.jp/en/lift/ (All Mountain Pass, peak 24 Dec 2026 – 28 Feb
            2027) and niseko.ne.jp/en/niseko/getting-to-niseko/ (flights and coach). Nozawa travel times read{" "}
            {SISTER}. Sapporo resorts: see the{" "}
            <Link href="/guides/attractions/sapporo-ski-day-trip">Sapporo ski day trip</Link> guide.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nozawaHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nozawa Onsen hotels →
            </KlookLink>
            <KlookLink href={nisekoResortShuttleBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              New Chitose → Niseko coach →
            </KlookLink>
          </div>
        </section>

        {/* Access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to the Ski Resorts From Tokyo and Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>From Tokyo, the Hokuriku Shinkansen and a bus to Hakuba (as little as 2 h 50 min); from
            Osaka, the Tokaido Shinkansen and two limited expresses (as little as 4 h 50 min).</strong> Niseko
            is a flight from either.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Resort", "From Tokyo (adult, one way)", "From Osaka", "Booking"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.resort}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.resort}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.tokyo}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.osaka}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={sourceNote}>
            Last checked {CHECKED}: hakubavalley.com/en/access_en/ (Tokyo, Osaka and Nagoya times),
            en.nozawaski.com/access/transport-guide/, niseko.ne.jp/en/niseko/getting-to-niseko/. Shinkansen fares
            are Shinkansen e-Tickets, reserved seat, regular season (tickets.jr-odekake.net) and the Alpico and
            Liner fares, read {SISTER}; GALA&apos;s 71 minutes from gala.co.jp (read 15 November 2026).
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoNagano.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo → Nagano shinkansen →
            </KlookLink>
            <KlookLink href={shinkansenTokyoGalaYuzawa.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo → GALA Yuzawa shinkansen →
            </KlookLink>
          </div>
        </section>

        {/* No car */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>No car</span>
          <h2 className={styles.sectionTitle}>Can You Ski in Japan Without a Car?</h2>
          <p className={styles.bodyText}>
            <strong>Yes — every resort on this page is reached by shinkansen or flight plus a bus.</strong> Two
            of those buses need a booking: Alpico&apos;s Nagano–Hakuba express (reservation-only services, winter
            timetable 12 December 2026 to 26 March 2027) and the direct New Chitose–Niseko coach. The Nozawa
            Onsen Liner from Iiyama needs no booking, and GALA Yuzawa has its own shinkansen station. Ski bags
            travel on the Hakuba and Niseko airport shuttles; on the shinkansen, renting at the resort saves
            carrying them.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nozawaOnsenSkiRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nozawa rental by the gondola →
            </KlookLink>
            <KlookLink href={echigoYuzawaStationSkiRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Echigo-Yuzawa rental by the station →
            </KlookLink>
          </div>
        </section>

        {/* Cost */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>How Much Does a Ski Trip to Japan Cost on the Snow?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>A one-day adult lift ticket is ¥7,800 at Nozawa Onsen, ¥8,000 at GALA Yuzawa, ¥11,100 for
            the Hakuba Valley and ¥13,500 at Niseko in peak season.</strong> Add rental and the bus from the
            station.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Resort", "1-day lift (adult)", "Multi-day", "Rental", "Transfer"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.resort}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.resort}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.day}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.multi}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.rental}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.transfer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={sourceNote}>
            Last checked {CHECKED}: en.nozawaski.com/the-mountain/lift-ticket/ticket-prices/,
            hakubavalley.com/en/ticket_en/, gala.co.jp/winter/hours-pricing/, niseko.ne.jp/en/lift/ and
            niseko.ne.jp/en/niseko/getting-to-niseko/. GALA rental from gala.co.jp/winter/rental/ (read 1 November
            2026); bus fares read {SISTER}. Hakuba, Nozawa and Niseko rental is priced by the shop — open the
            listing for your dates.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakubaSkiSnowboardRental.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Hakuba rental, 1–7 days →
            </KlookLink>
            <KlookLink href={nisekoLiftTicketGearDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Niseko lift + gear delivery →
            </KlookLink>
          </div>
        </section>

        {/* Best time */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>When to go</span>
          <h2 className={styles.sectionTitle}>When Is the Best Time to Ski in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>Mid-January to February for the most snow; December and March for quieter slopes.</strong>{" "}
            Niseko United&apos;s own month guide calls January one of the most consistent places in the world
            for snowfall and February peak powder, with crowds to match, and its regular-season pass (12–23
            December and 1–22 March) is ¥12,600 against ¥13,500 at peak. For 2026-27, Nozawa Onsen and Niseko
            plan to open on 28 November, the Hakuba Valley from December and GALA&apos;s slopes on 19 December;
            all four run into spring, most to early May. Openings depend on snow, so check the resort before an
            early-season booking.
          </p>
          <p className={styles.bodyText} style={sourceNote}>
            Last checked {CHECKED} (season dates and pass prices on each resort&apos;s own site). Niseko month
            guide: niseko.ne.jp/en/news/which-month-in-winter-is-best-to-visit-niseko/, read 1 November 2026.
          </p>
        </section>

        {/* Insurance */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Insurance</span>
          <h2 className={styles.sectionTitle}>Do You Need Ski Travel Insurance for Japan?</h2>
          <p className={styles.bodyText}>
            <strong>Check your policy before you book the lift tickets:</strong> many standard travel policies
            exclude snowsports, or cover the marked runs but not off-piste. Our{" "}
            <Link href="/guides/money/japan-ski-travel-insurance">Japan ski travel insurance guide</Link> sets
            out what to look for;{" "}
            <a href={SAFETYWING_URL} target="_blank" rel="sponsored nofollow noopener noreferrer">
              SafetyWing
            </a>{" "}
            is one option it covers.
          </p>
        </section>

        {/* Ski vs winter sightseeing */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which page is yours</span>
          <h2 className={styles.sectionTitle}>Ski Trip or Winter Sightseeing Trip?</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Skiing is the point</p>
              <p className={styles.whoForDesc}>
                This page: four or more nights at one resort, the rest in Tokyo.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Sightseeing with some snow</p>
              <p className={styles.whoForDesc}>
                The <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link>: 12
                days of cities, onsen and festivals, with snow as one stop.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>One ski day from Tokyo</p>
              <p className={styles.whoForDesc}>
                The <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">GALA Yuzawa day trip</Link>.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Check the cancellation terms</p>
              <p className={styles.whoForDesc}>
                Snow and wind close lifts and delay buses. Read each listing&apos;s cancellation and bad-weather
                terms for your date before you pay.
              </p>
            </div>
          </div>
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
          heading="Japan Ski Trip Bookings You Can Make Now"
          intro="Rental at Hakuba and Nozawa Onsen, the airport coaches to Hakuba and Niseko, and Niseko's lift ticket with gear delivered. Open a listing for the price, what is included and the cancellation terms on your date."
          tours={[hakubaSkiSnowboardRental, nozawaOnsenSkiRental, hakubaAirportShuttleBus, nisekoResortShuttleBus, nisekoLiftTicketGearDelivery]}
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
            <h2 className={styles.ctaBannerTitle}>Four nights on the snow, no car needed</h2>
            <p className={styles.ctaBannerDesc}>
              Book the bed and the rental first, then the buses that need a seat. Shinkansen tickets open one month
              ahead.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={hakubaHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Check Hakuba Hotels →
              </KlookLink>
              <KlookLink href={nozawaHotelsUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Check Nozawa Hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
