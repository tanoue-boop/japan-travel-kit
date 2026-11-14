import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  churaumiAquariumTicket,
  churaumiKouriNorthernDayTour,
  keramaHalfDaySnorkelNaha,
  keramaTokashikiSnorkelDive,
  klookEsim,
  kokusaiStreetHotelsUrl,
  nahaAirportCarRental,
  okinawaChurashimaBusDayTour,
  okinawaManzamoKouriChuraumiTour,
  okinawaThreeDayStayAreas,
  okinawaThreeDayTripPrep,
  shuriCastlePeaceWalkingTour,
  southernOkinawaDayTrip,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Three days in Okinawa (Naha base), written as a routing-and-booking plan.
 * Added 14 Nov 2026 (task-jtk-20261114-01).
 *
 * Next to its neighbours:
 *  - okinawa-day-tours answers "which tour from Naha, north or south";
 *  - okinawa-churaumi-aquarium-tickets answers "what the aquarium costs and how to get in";
 *  - this page answers "how to spend three days in Okinawa, and what to book for each".
 *
 * Official reads on 14 Nov 2026:
 *   oki-park.jp/shurijo/info/14/      Paid area ¥400 / ¥300 / ¥160 to 21 Nov 2026; from 23 Nov
 *                                     2026 ¥1,000 adult, ¥760 high school, ¥370 elementary and
 *                                     junior high, under 6 free, the same with or without the
 *                                     Seiden interior. A Yui Rail 1- or 2-day pass shown at the
 *                                     window gets the group rate.
 *   oki-park.jp/shurijo/info/15/      Paid area 8:30–19:00 (last 18:30) Apr–Nov, 8:30–18:00 (last
 *                                     17:30) Dec–Mar; free area from 8:00. Park closed all day
 *                                     22 Nov 2026; on 23 Nov the paid area opens at 12:00 and
 *                                     the Seiden opens to the public from noon.
 *   oki-park.jp/shurijo/ticket_guide/ Seiden interior by timed reservation, no extra charge;
 *                                     for entry from 1 Jan 2027 sales open 13:00 on the 1st of the
 *                                     month two months ahead; same-day slots only if left, to 15
 *                                     min before the slot; 90–120 min for the whole visit; Shuri
 *                                     Station ⇄ Suimui-kan about 20 min; busiest 8:30–11:00;
 *                                     change to the day before, refund to two days before (Webket).
 *   yui-rail.co.jp                    Naha Airport → Kencho-mae ¥290, 13 min; → Makishi ¥320,
 *                                     16 min; → Shuri ¥360, 27 min. 1-day pass ¥1,000 (24 h),
 *                                     2-day ¥1,800 (48 h).
 *   churaumi.okinawa/en/guide/        ¥2,180 / ¥1,440 / ¥710, under 6 free; off season
 *     info, hour, access              8:30–18:30, last entry 17:30; no scheduled closing days
 *                                     until 31 Mar 2027, typhoon closures possible; about 2 h by
 *                                     car from Naha Airport via the expressway, about 3 h by
 *                                     express bus.
 *   vill.tokashiki.okinawa.jp         From 1 Oct 2026: Marine Liner Tokashiki ¥3,300 adult one
 *     /soshiki/sitekanri/5/2/1365     way, about 40 min, Tomari 9:00 → 9:40, back 17:00 → 17:40 in
 *                                     winter (17:30 → 18:10 Mar–Sep); Ferry Tokashiki ¥2,200, about
 *                                     70 min, Tomari 10:00 → 11:10, back 15:30 → 16:40 in winter
 *                                     (16:00 Mar–Sep); ¥100 environmental tax; buy 30 min before.
 *   vill.zamami.okinawa.jp            Queen Zamami ¥3,950 adult one way, Ferry Zamami ¥2,900;
 *     /sempaku/ryokin_jikoku/, /ship/,  50–70 min and 90–120 min (village FAQ); ¥100 island tax;
 *     /faq/                           bookings from the same date one month before; Queen Zamami
 *                                     out of service 20 Oct – 3 Dec 2026 for dry dock.
 *   data.jma.go.jp typhoon normals    Okinawa region approaches 1991–2020: May 0.4, Jun 0.6, Jul
 *                                     1.5, Aug 2.2, Sep 1.9, Oct 1.1, Nov 0.3, Dec 0.0, none
 *                                     Jan–Apr; 7.7 a year.
 *   data.jma.go.jp Naha normals       Jan 17.3°C mean (19.8 / 14.9), Feb 17.5 (20.2 / 15.1), Nov
 *                                     22.5 (25.0 / 20.4), Dec 19.0 (21.5 / 16.8).
 *
 * Carried with their own dates: Emerald Beach swimming 1 Apr – 31 Oct 2026 (oki-park.jp,
 * 3 Nov 2026, read for okinawa-churaumi-aquarium-tickets), and the Klook tour durations
 * (5 Nov 2026, read for okinawa-day-tours).
 *
 * Not printed: a sea temperature (no single official figure), the express-bus fare, a
 * drive time to Kouri Island, and any Klook price.
 */

const ROUTE = "/guides/attractions/okinawa-3-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-14");
const BEACH = checkedLabel("2026-11-03");
const TOURS = checkedLabel("2026-11-05");

const SHURI_NEW = "¥1,000";
const SHURI_OLD = "¥400";
const CHURAUMI = "¥2,180";
const MARINE_LINER = "¥3,300";
const FERRY_TOKASHIKI = "¥2,200";
const QUEEN_ZAMAMI = "¥3,950";
const FERRY_ZAMAMI = "¥2,900";
const MONORAIL_DAY = "¥1,000";
const MONORAIL_2DAY = "¥1,800";

type Row = { day: string; area: string; sights: string; move: string; book: string };

/** Table 1: the three days at a glance — first row is the answer. */
const overviewRows: Row[] = [
  {
    day: "Day 1",
    area: "Naha",
    sights: "Shuri Castle (the rebuilt Seiden opens inside from 23 Nov 2026), Kokusai-dori, Makishi market area",
    move: "Yui Rail monorail: airport → Makishi 16 min, → Shuri 27 min",
    book: `Hotel; Shuri Castle Seiden time slot (${SHURI_NEW} from 23 Nov 2026)`,
  },
  {
    day: "Day 2",
    area: "The north: Motobu and Kouri Island",
    sights: "Churaumi Aquarium, Kouri Island, Cape Manzamo (on most tours)",
    move: "Day tour from Naha or Chatan, or a rental car — about 2 h each way by car",
    book: "Day tour or rental car; aquarium ticket if the tour does not include it",
  },
  {
    day: "Day 3",
    area: "Kerama Islands — or southern Okinawa / American Village",
    sights: "Tokashiki or Zamami beaches and snorkelling; or Cape Chinen and the south",
    move: "Fast boat from Tomari Port, about 40 min to Tokashiki; or a southern day tour",
    book: "Boat seat or snorkel tour; southern tour if you skip the sea",
  },
];

type Stop = { time: string; place: string; allow: string; getting: string; booking: string };

const day1: Stop[] = [
  {
    time: "Morning",
    place: "Arrive at Naha Airport; drop bags at a hotel near Kokusai-dori",
    allow: "1 hour",
    getting: "Yui Rail to Kencho-mae (13 min, ¥290) or Makishi (16 min, ¥320)",
    booking: "Hotel",
  },
  {
    time: "Midday",
    place: "Shuri Castle Park — 12:00–14:00 is the quieter window on the park's own forecast",
    allow: "90–120 minutes including the Seiden (the park's figure)",
    getting: "Yui Rail to Shuri (27 min from the airport), then about 20 min on foot to the Suimui-kan entrance",
    booking: "Yes, for the Seiden interior from 23 Nov 2026 — a timed ticket; the paid area alone needs no slot",
  },
  {
    time: "Afternoon",
    place: "Kokusai-dori and the side arcades by Makishi Station",
    allow: "2–3 hours",
    getting: "Yui Rail Shuri → Makishi",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Dinner around Kokusai-dori",
    allow: "—",
    getting: "On foot",
    booking: "No",
  },
];

const day2: Stop[] = [
  {
    time: "Early morning",
    place: "Tour pick-up in Naha or Chatan — or collect the rental car",
    allow: "—",
    getting: "Tour coach, or drive north on the Okinawa Expressway",
    booking: "Yes — tour seat or car",
  },
  {
    time: "Morning",
    place: "Cape Manzamo (on most northern tours)",
    allow: "30–45 minutes",
    getting: "Coach or car",
    booking: "No",
  },
  {
    time: "Midday–afternoon",
    place: "Churaumi Aquarium (opens 8:30) in Ocean Expo Park",
    allow: "About 3–3.5 hours on Klook's northern tour",
    getting: "About 2 hours from Naha Airport by car; about 3 hours by express bus",
    booking: `Ticket (${CHURAUMI} adult) — check whether the tour includes it`,
  },
  {
    time: "Late afternoon",
    place: "Kouri Island and its bridge",
    allow: "1 hour",
    getting: "Coach or car",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Back in Naha — tours run about 10 hours in total",
    allow: "—",
    getting: "Coach or car",
    booking: "—",
  },
];

const day3: Stop[] = [
  {
    time: "9:00",
    place: "Option A: Marine Liner Tokashiki from Tomari Port (north pier), arriving 9:40",
    allow: "Day on the island",
    getting: `Fast boat, about 40 min, ${MARINE_LINER} adult one way`,
    booking: "Buy at least 30 minutes before; return at 17:00 in winter (17:30 Mar–Sep)",
  },
  {
    time: "Morning",
    place: "Option B: a half-day Kerama snorkel with pick-up in Naha",
    allow: "About 3 hours on the listing",
    getting: "Pick-up from designated areas of Naha",
    booking: "Yes — morning or afternoon session",
  },
  {
    time: "Day",
    place: "Option C: southern Okinawa — Cape Chinen and the Nirai Kanai Bridge",
    allow: "About 8 hours from a 9:30 departure on Klook's listing",
    getting: "Day trip from Naha, or a car",
    booking: "Tour or car",
  },
  {
    time: "Evening",
    place: "American Village in Chatan, or Kokusai-dori again",
    allow: "2–3 hours",
    getting: "Car or taxi to Chatan; the northern day tour also stops there",
    booking: "No",
  },
];

/** Table 2: getting around. */
const transportRows = [
  {
    route: "Naha Airport → Kencho-mae / Makishi (Yui Rail)",
    time: "13 min / 16 min",
    fare: "¥290 / ¥320 adult",
    book: `No. 1-day pass ${MONORAIL_DAY} (24 h), 2-day ${MONORAIL_2DAY} (48 h)`,
    source: `yui-rail.co.jp, ${OWN}`,
  },
  {
    route: "Naha Airport → Shuri (Yui Rail)",
    time: "27 min, then about 20 min on foot",
    fare: "¥360 adult",
    book: "No. Show a 1- or 2-day pass at the Shuri Castle window for the group rate",
    source: `yui-rail.co.jp; oki-park.jp/shurijo, ${OWN}`,
  },
  {
    route: "Naha Airport → Churaumi Aquarium",
    time: "About 2 h by car (expressway); about 3 h by express bus",
    fare: "Bus fares vary by operator — not printed here",
    book: "Car or tour; the aquarium's car parks are free",
    source: `churaumi.okinawa, ${OWN}`,
  },
  {
    route: "Tomari Port → Tokashiki (Marine Liner Tokashiki)",
    time: "About 40 min",
    fare: `${MARINE_LINER} adult, ¥1,650 child one way + ¥100 tax`,
    book: "Buy 30 min before departure. 9:00 out; 17:00 back in winter",
    source: `vill.tokashiki.okinawa.jp, ${OWN}`,
  },
  {
    route: "Tomari Port → Tokashiki (Ferry Tokashiki)",
    time: "About 70 min",
    fare: `${FERRY_TOKASHIKI} adult, ¥1,100 child one way + ¥100 tax`,
    book: "10:00 out; 15:30 back in winter (16:00 Mar–Sep)",
    source: `vill.tokashiki.okinawa.jp, ${OWN}`,
  },
  {
    route: "Tomari Port → Zamami (Queen Zamami / Ferry Zamami)",
    time: "50–70 min / 90–120 min",
    fare: `${QUEEN_ZAMAMI} / ${FERRY_ZAMAMI} adult one way + ¥100 tax`,
    book: "Reservations from the same date one month before. Queen Zamami out of service 20 Oct – 3 Dec 2026",
    source: `vill.zamami.okinawa.jp, ${OWN}`,
  },
];

/** Table 3: admissions. */
const ticketRows = [
  {
    stop: "Shuri Castle Park (paid area) — from 23 Nov 2026",
    price: `${SHURI_NEW} adult, ¥760 high school, ¥370 elementary & junior high, under 6 free`,
    hours: "8:30–19:00 Apr–Nov (last 18:30); 8:30–18:00 Dec–Mar (last 17:30)",
    note: `Until 21 Nov 2026: ${SHURI_OLD} adult. Closed all day 22 Nov; paid area from 12:00 on 23 Nov. Seiden interior needs a timed slot, no extra charge`,
  },
  {
    stop: "Okinawa Churaumi Aquarium",
    price: `${CHURAUMI} adult, ¥1,440 high school, ¥710 elementary & junior high, under 6 free`,
    hours: "8:30–18:30 off season, last entry 17:30",
    note: "No scheduled closing days until 31 Mar 2027; can close for typhoons",
  },
];

/** Table 4: when to book, and the seasons. */
const bookingRows = [
  {
    what: "Shuri Castle Seiden time slot",
    when: "For entry from 1 Jan 2027: from 13:00 on the 1st of the month two months before",
    why: "The interior is by timed reservation; same-day slots are sold only if any are left",
  },
  {
    what: "Zamami boats",
    when: "From the same date one month before",
    why: "The village says boats can be full without a booking in summer holidays and long weekends",
  },
  {
    what: "Northern day tour or rental car",
    when: "As soon as the date is fixed",
    why: "Tours are sold per departure; read the typhoon and cancellation terms on the listing",
  },
  {
    what: "Kerama snorkel tour",
    when: "With the hotel",
    why: "Sea conditions decide the day — put it on Day 3 only if Day 2 can swap with it",
  },
  {
    what: "Typhoon months",
    when: "Jul–Oct: 1.1 to 2.2 approaches a month (JMA 1991–2020)",
    why: "Boats and tours stop, and the aquarium can close. Jan–Apr has no approaches in the normals",
  },
  {
    what: "Winter (Dec–Feb)",
    when: "Naha averages 17.3°C in January (JMA normal)",
    why: "Sightseeing weather, not beach weather; the Ocean Expo Park beach swims 1 Apr – 31 Oct",
  },
];

const faqItems = [
  {
    q: "How should I spend 3 days in Okinawa?",
    a: `Day 1 in Naha — Shuri Castle and Kokusai-dori by monorail; Day 2 in the north — Churaumi Aquarium and Kouri Island by day tour or rental car (about 2 hours each way by car); Day 3 in the Kerama Islands, 40 minutes by fast boat from Tomari Port, or in the south. Stay in Naha all three nights. Figures read on official sites ${OWN}.`,
  },
  {
    q: "Do I need a car in Okinawa?",
    a: "Not for Naha: the Yui Rail monorail runs from the airport to Kokusai-dori and Shuri. For the north, yes or a tour — the aquarium is about 2 hours from Naha Airport by car and about 3 by express bus. Klook's rental-car page states non-residents need a passport, their own licence, an international driving permit and a credit card.",
  },
  {
    q: "Can I visit Churaumi Aquarium as a day trip from Naha?",
    a: `Yes. Northern day tours from Naha or Chatan run about 10 hours with about 3 to 3.5 hours at the aquarium, plus Kouri Island and Cape Manzamo. By car it is about 2 hours each way. Admission is ${CHURAUMI} for an adult; check whether your tour option includes it.`,
  },
  {
    q: "How much is Shuri Castle?",
    a: `${SHURI_NEW} for an adult from 23 November 2026, when the rebuilt Seiden opens inside; ${SHURI_OLD} until 21 November. The park is closed all day on 22 November. Seeing inside the Seiden needs a timed ticket at no extra charge. Read on oki-park.jp ${OWN}.`,
  },
  {
    q: "How do I get to the Kerama Islands from Naha?",
    a: `From Tomari Port. To Tokashiki: the Marine Liner takes about 40 minutes (${MARINE_LINER} adult one way) and Ferry Tokashiki about 70 (${FERRY_TOKASHIKI}). To Zamami: Queen Zamami 50–70 minutes (${QUEEN_ZAMAMI}) or Ferry Zamami 90–120 (${FERRY_ZAMAMI}). Queen Zamami is out of service from 20 October to 3 December 2026.`,
  },
  {
    q: "Is Okinawa worth visiting in winter?",
    a: "For sightseeing, yes: Naha's January average is 17.3°C (JMA 1991–2020), Shuri Castle and the aquarium are open, and the normals show no typhoon approaches from January to April. It is not beach season — the Ocean Expo Park's swimming beach ran 1 April to 31 October in 2026.",
  },
  {
    q: "When is typhoon season in Okinawa?",
    a: "July to October carries most of it: the Okinawa region averages 1.5 approaches in July, 2.2 in August, 1.9 in September and 1.1 in October (JMA normals, 1991–2020). Boats to the Kerama Islands and day tours stop in a typhoon, and the aquarium may close.",
  },
  {
    q: "Where should I stay in Okinawa for 3 days?",
    a: "In Naha, near a monorail station on Kokusai-dori (Makishi, Miebashi or Kencho-mae). One hotel covers all three days: the monorail to the airport and Shuri, tour pick-ups in Naha and Tomari Port for the Kerama boats.",
  },
];

const TITLE = "Okinawa 3 Day Itinerary (2026): Naha, Churaumi and Kerama";
const DESCRIPTION =
  "Okinawa 3 day itinerary: Naha and Shuri Castle, Churaumi and Kouri Island, then Kerama. An Okinawa itinerary for 3 days in Okinawa, and what to book.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const thStyle = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

function StopTable({ rows }: { rows: Stop[] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Time of day", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.place}>
                <td className={styles.tdProvider} style={thStyle}>{row.time}</td>
                <td style={thStyle}>{row.place}</td>
                <td style={thStyle}>{row.allow}</td>
                <td style={thStyle}>{row.getting}</td>
                <td style={thStyle}>{row.booking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Okinawa3DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Okinawa 3 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Okinawa 3 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Okinawa 3 Day Itinerary (2026):<br />3 Days in Okinawa — Naha, Churaumi and Kerama
          </h1>
          <p className={styles.heroSubtitle}>
            One Naha hotel, three different days: the castle and the main street, the aquarium in the north, and
            the islands across the water. The northern day and the boat are the parts to book.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices & boat times, dated", "A table for each day", "Typhoon months from JMA"].map((t) => (
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

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 1</p>
                <p className={styles.verdictStatValue}>Naha: Shuri Castle, Kokusai-dori</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Churaumi Aquarium &amp; Kouri Island</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 3</p>
                <p className={styles.verdictStatValue}>Kerama Islands (40 min by boat) or the south</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Base</p>
                <p className={styles.verdictStatValue}>One hotel near Kokusai-dori</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              An <strong>Okinawa 3 day itinerary</strong> works best from one hotel in Naha. On{" "}
              <strong>Day 1</strong>, take the monorail to Shuri Castle and spend the afternoon on Kokusai-dori. On{" "}
              <strong>Day 2</strong>, go north to Churaumi Aquarium and Kouri Island — about{" "}
              <strong>2 hours by car</strong> from Naha Airport, so a day tour or a rental car beats the 3-hour bus.
              On <strong>Day 3</strong>, take the fast boat from Tomari Port to Tokashiki in the Kerama Islands (about{" "}
              <strong>40 minutes</strong>, {MARINE_LINER} one way) or tour the south. Shuri Castle is{" "}
              <strong>{SHURI_NEW}</strong> from 23 November 2026. Figures read on official sites {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Churaumi &amp; Kouri Island Tour →
              </KlookLink>
              <KlookLink href={kokusaiStreetHotelsUrl} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Hotels near Kokusai-dori →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Overview */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Should I Spend 3 Days in Okinawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Naha first, the north second, the sea third. Day 1 needs only the monorail; Day 2 runs on a tour or a
            car; Day 3 runs on a boat or a snorkel tour, so keep it swappable with Day 2 in case the sea is rough.
            For which northern or southern tour to book, see our{" "}
            <Link href="/guides/attractions/okinawa-day-tours">Okinawa day tours comparison</Link>; for the
            aquarium&apos;s prices and hours in full, our{" "}
            <Link href="/guides/attractions/okinawa-churaumi-aquarium-tickets">Churaumi Aquarium tickets guide</Link>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Day", "Area", "What to see", "Getting around", "What to book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {overviewRows.map((row) => (
                    <tr key={row.day}>
                      <td className={styles.tdProvider} style={thStyle}>{row.day}</td>
                      <td style={thStyle}>{row.area}</td>
                      <td style={thStyle}>{row.sights}</td>
                      <td style={thStyle}>{row.move}</td>
                      <td style={thStyle}>{row.book}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://oki-park.jp/shurijo/info/14/" target="_blank" rel="noopener">oki-park.jp/shurijo</a>,{" "}
            <a href="https://www.yui-rail.co.jp/" target="_blank" rel="noopener">yui-rail.co.jp</a>,{" "}
            <a href="https://churaumi.okinawa/en/guide/access/" target="_blank" rel="noopener">churaumi.okinawa</a>,{" "}
            <a href="https://www.vill.tokashiki.okinawa.jp/soshiki/sitekanri/5/2/1365.html" target="_blank" rel="noopener">vill.tokashiki.okinawa.jp</a>.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>What Should I Do on Day 1 in Naha?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Shuri Castle around midday and Kokusai-dori for the rest of the day, all on the Yui Rail monorail. The
            castle park&apos;s own crowd forecast marks 8:30–11:00 as very busy and 12:00–14:00 as relatively quiet,
            which suits an arrival-day morning flight.
          </p>
          <StopTable rows={day1} />
          <p className={styles.bodyText} style={noteStyle}>
            Monorail times and fares from yui-rail.co.jp, castle times from oki-park.jp/shurijo, both {OWN}.
            &ldquo;Time to allow&rdquo; is a planning allowance unless marked as the operator&apos;s figure.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Do I Need to Book Shuri Castle?
          </h3>
          <p className={styles.bodyText}>
            Only to go inside the Seiden. From <strong>23 November 2026</strong> the rebuilt main hall opens to the
            public, and its interior is by timed ticket at no extra charge; a ticket without a slot still covers the
            rest of the paid area and the Seiden from outside. For entry from 1 January 2027, slots go on sale at
            13:00 on the 1st of the month two months before. Official tickets bought on Webket can change date until
            the day before and be refunded until two days before. The park is closed all day on 22 November 2026,
            and on 23 November the paid area opens at 12:00. Shoes come off inside the Seiden.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 1.</strong> The hotel, and the Seiden slot if you want the interior. A
            guided walk covers Shuri Castle and Tamaudun with someone explaining the Ryukyu kingdom.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kokusaiStreetHotelsUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hotels near Kokusai-dori →
            </KlookLink>
            <KlookLink href={shuriCastlePeaceWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shuri Castle walking tour →
            </KlookLink>
          </div>
        </section>

        {/* Day 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>Can I Visit Churaumi Aquarium as a Day Trip From Naha?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes — it is the standard Day 2. The aquarium is about <strong>2 hours by car</strong> from Naha Airport
            on the Okinawa Expressway and about <strong>3 hours by express bus</strong>. Northern day tours from Naha
            or Chatan run about 10 hours and give about 3 to 3.5 hours inside, with Kouri Island and Cape Manzamo
            on the way.
          </p>
          <StopTable rows={day2} />
          <p className={styles.bodyText} style={noteStyle}>
            Access and opening time from churaumi.okinawa, {OWN}; tour lengths and time at the aquarium from
            Klook&apos;s listings, read {TOURS}. Times at Cape Manzamo and Kouri Island are planning allowances.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Northern day tour →
            </KlookLink>
            <KlookLink href={okinawaManzamoKouriChuraumiTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Manzamo, Kouri &amp; Churaumi tour →
            </KlookLink>
            <KlookLink href={churaumiAquariumTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Aquarium ticket only →
            </KlookLink>
          </div>
        </section>

        {/* Car */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Car or tour</span>
          <h2 className={styles.sectionTitle}>Do I Need a Car in Okinawa?</h2>
          <p className={styles.bodyText}>
            Not in Naha, and not on a 3-day trip if you take a tour north. The monorail covers the airport,
            Kokusai-dori and Shuri, and the Kerama boats leave from Tomari Port in the city. A car pays on Day 2 if
            you want your own hours at the aquarium, Bise or Kouri Island, or have children and luggage; the
            aquarium&apos;s Ocean Expo Park car parks are free. Klook&apos;s Naha Airport rental page states
            non-residents need a passport, their own licence, an international driving permit and a credit card.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nahaAirportCarRental.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Naha Airport car rentals →
            </KlookLink>
            <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Or the northern tour →
            </KlookLink>
          </div>
        </section>

        {/* Day 3 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 3</span>
          <h2 className={styles.sectionTitle}>Can I Do the Kerama Islands as a Day Trip From Naha?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, to Tokashiki. The Marine Liner leaves Tomari Port at <strong>9:00</strong>, arrives at{" "}
            <strong>9:40</strong>, and comes back at 17:00 in winter (17:30 from March to September) — a full day on
            the island for {MARINE_LINER} each way. Without the boat timetable, a half-day snorkel tour collects you
            in Naha. If the sea is rough, swap in the south.
          </p>
          <StopTable rows={day3} />
          <p className={styles.bodyText} style={noteStyle}>
            Boat times and fares from vill.tokashiki.okinawa.jp, {OWN}. Tour lengths from Klook&apos;s listings ({TOURS} for
            the southern trip, {OWN} for the snorkel).
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Boat or tour?</strong> The boat is the cheaper way to a beach day on Tokashiki. The tour is the
            easier way to the water: pick-up in Naha, about 3 hours, and the operator picks the spot. Boats and
            tours both depend on the sea, so check the weather terms on the listing before you pay.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={keramaHalfDaySnorkelNaha.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kerama snorkel from Naha →
            </KlookLink>
            <KlookLink href={keramaTokashikiSnorkelDive.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokashiki snorkel &amp; dive →
            </KlookLink>
            <KlookLink href={southernOkinawaDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Southern Okinawa day trip →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What Should I Book for This Okinawa Itinerary?"
          intro="The northern day, the Kerama day, the hotel, a car if you drive, and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={okinawaThreeDayTripPrep}
        />

        {/* Transport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>How Do You Get Around Okinawa in 3 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The monorail in Naha, a tour or car to the north, and a boat from Tomari Port to the islands. A 2-day
            monorail pass ({MONORAIL_2DAY}) also gets you the group rate at Shuri Castle.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Fare", "Booking", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transportRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={thStyle}>{row.route}</td>
                      <td style={thStyle}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.book}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.yui-rail.co.jp/routemap/nahakuko/?t=fare" target="_blank" rel="noopener">Yui Rail fares</a>,{" "}
            <a href="https://churaumi.okinawa/en/guide/access/" target="_blank" rel="noopener">Churaumi access</a>,{" "}
            <a href="https://www.vill.tokashiki.okinawa.jp/soshiki/sitekanri/5/2/1365.html" target="_blank" rel="noopener">Tokashiki boats</a>,{" "}
            <a href="https://www.vill.zamami.okinawa.jp/sempaku/ryokin_jikoku/" target="_blank" rel="noopener">Zamami boats</a>. Tokashiki
            fares are those from 1 October 2026. The Marine Liner boards at Tomari Port&apos;s north pier; the
            ferries leave from in front of the Tomarin terminal.
          </p>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Admission</span>
          <h2 className={styles.sectionTitle}>How Much Are Shuri Castle and Churaumi Aquarium?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Shuri Castle is {SHURI_NEW} for an adult from 23 November 2026, and Churaumi Aquarium is {CHURAUMI}.
            On Day 3, the boat fare is the main cost.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Place", "Official price", "Hours", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={thStyle}>{row.stop}</td>
                      <td className={styles.tdPrice} style={thStyle}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://oki-park.jp/shurijo/info/14/" target="_blank" rel="noopener">Shuri Castle fees</a>,{" "}
            <a href="https://oki-park.jp/shurijo/info/15/" target="_blank" rel="noopener">Shuri Castle hours</a>,{" "}
            <a href="https://churaumi.okinawa/en/guide/info/" target="_blank" rel="noopener">Churaumi Aquarium fees</a>. No
            Klook price appears on this page.
          </p>
        </section>

        {/* Winter */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Season</span>
          <h2 className={styles.sectionTitle}>Is Okinawa Worth Visiting in Winter?</h2>
          <p className={styles.bodyText}>
            Yes for sightseeing, less so for the beach. Naha&apos;s January average is <strong>17.3°C</strong>{" "}
            (daily high 19.8°C, low 14.9°C) in the Japan Meteorological Agency&apos;s 1991–2020 normals, and the
            normals show no typhoon approaches from January to April. Shuri Castle and the aquarium are open;
            the aquarium lists no scheduled closing days until 31 March 2027. The Ocean Expo Park&apos;s swimming
            beach was open 1 April to 31 October in 2026 (read {BEACH}), so plan a winter Day 3 around a boat or
            the south rather than a swim. Our{" "}
            <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link> covers the snow
            side of the same season.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            When Is Typhoon Season in Okinawa?
          </h3>
          <p className={styles.bodyText}>
            July to October. The JMA normals for the Okinawa region give 1.5 approaches in July, 2.2 in August,
            1.9 in September and 1.1 in October, out of 7.7 a year; May has 0.4, June 0.6 and November 0.3. In a
            typhoon the boats and tours stop and the aquarium may close, so on a summer trip keep Day 2 and Day 3
            swappable and read the cancellation terms before you book. Read on{" "}
            <a href="https://www.data.jma.go.jp/yoho/typhoon/statistics/average/average.html" target="_blank" rel="noopener">data.jma.go.jp</a>,{" "}
            {OWN}.
          </p>
        </section>

        {/* Where to stay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay in Okinawa?</h2>
          <p className={styles.bodyText}>
            In Naha, near a monorail station on Kokusai-dori — Makishi, Miebashi or Kencho-mae. One hotel covers all
            three days: the monorail runs to the airport and to Shuri, tour pick-ups are in Naha, and Tomari Port for
            the Kerama boats is in the city. A night on the Motobu Peninsula only makes sense if you drive and want
            the aquarium at opening.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for Three Days in Okinawa"
          intro="Room prices and availability change by date, so each area links to Klook's listing or hotel search for it."
          areas={okinawaThreeDayStayAreas}
        />

        {/* Booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>When Should I Book for Okinawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Shuri Castle Seiden slot and the boats have fixed booking windows; the tours and the car go as soon as
            your dates are fixed. The season decides how much slack to leave.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "When", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={thStyle}>{row.what}</td>
                      <td style={thStyle}>{row.when}</td>
                      <td style={thStyle}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://oki-park.jp/shurijo/ticket_guide/" target="_blank" rel="noopener">oki-park.jp/shurijo/ticket_guide</a>,{" "}
            <a href="https://www.vill.zamami.okinawa.jp/ship/" target="_blank" rel="noopener">vill.zamami.okinawa.jp</a>,{" "}
            <a href="https://www.data.jma.go.jp/stats/etrn/view/nml_sfc_ym.php?prec_no=91&amp;block_no=47936" target="_blank" rel="noopener">JMA Naha normals</a>.
            Beach season from oki-park.jp, {BEACH}.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The Seiden QR ticket, boat notices and the tour&apos;s meeting message all reach you on your phone.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the alternatives.
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
          heading="Day Tours for This Okinawa Itinerary"
          intro="Northern days for Day 2, the Kerama sea and the south for Day 3. Durations, pick-up and inclusions are on each listing."
          tours={[churaumiKouriNorthernDayTour, okinawaChurashimaBusDayTour, keramaHalfDaySnorkelNaha, southernOkinawaDayTrip]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/okinawa-day-tours", title: "Okinawa Day Tours from Naha: North vs South Compared (2026)" },
              { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "Okinawa Churaumi Aquarium Tickets 2026: Price, Hours, Access" },
              { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary: Kanazawa, Shirakawa-go and Takayama" },
              { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day" },
              { href: "/guides/attractions/hiroshima-2-day-itinerary", title: "Hiroshima 2 Day Itinerary (2026): Peace Park and Miyajima" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
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
            <h2 className={styles.ctaBannerTitle}>Naha, the north, then the sea</h2>
            <p className={styles.ctaBannerDesc}>
              Book one hotel near Kokusai-dori, a northern tour or car for Day 2, and the Kerama boat or snorkel for
              Day 3 — and keep the last two swappable for the weather.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={churaumiKouriNorthernDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Northern Tour →
              </KlookLink>
              <KlookLink href={keramaHalfDaySnorkelNaha.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Kerama Snorkel from Naha →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
