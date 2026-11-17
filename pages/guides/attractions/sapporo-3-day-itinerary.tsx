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
  asahiyamaWinterBluePondTour,
  japanWinterStayAreas,
  jozankeiMoriNoUtaSpaDayTour,
  klookEsim,
  newChitoseAirportTransfers,
  newChitoseSapporoSharedTransfer,
  otaruSnowParkDayTour,
  sapporoFuranoAreaPass,
  sapporoKokusaiSkiOtaruAquariumDayTour,
  sapporoSnowFestivalStayAreas,
  sapporoThreeDayTripPrep,
} from "../../../lib/klook-links";
import { asahiyamaBieiHighlightsTour, sapporoKokusaiOtaruDayTour } from "../../../lib/klook-links-winter-hokkaido";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Three days with Sapporo as the base: the city on Day 1, Otaru on Day 2, and
 * Asahiyama Zoo and Biei (or a ski day) on Day 3. Added 16 Nov 2026
 * (task-jtk-20261116-01), ahead of the winter season.
 *
 * Next to its neighbours:
 *  - hokkaido-7-day-itinerary answers "how to see Hokkaido in a week, two bases";
 *  - otaru-day-trip-from-sapporo, furano-biei-tour, sapporo-ski-day-trip and
 *    sapporo-snow-festival-tours each answer one day or one event in detail;
 *  - this page answers "three days, one Sapporo hotel, what goes on which day and
 *    what to book", and sends the detail to those pages.
 *
 * Official reads on 16 Nov 2026:
 *   jrhokkaido.co.jp/global/english/ticket/regular/  New Chitose Airport–Sapporo ¥1,230
 *                                     (reserved u-seat ¥2,230), Sapporo–Otaru ¥800 (¥1,800),
 *                                     Sapporo–Asahikawa Lilac/Kamui ¥5,440, Asahikawa–Biei
 *                                     local ¥680, Furano Lavender Express summer only
 *   jrhokkaido.co.jp/global/english/travel/model/winter03.html  Sapporo → Asahikawa 1hr 25min
 *                                     (Lilac/Kamui, reserved); Asahikawa Sta → Asahiyama Zoo
 *                                     40 min by bus; Sapporo → Otaru 35 min (Rapid Airport);
 *                                     Sapporo → New Chitose 37 min; Sapporo White Illumination
 *                                     late Nov to mid March; Otaru Snow Light Path early to mid Feb
 *   jrhokkaido.co.jp/airport/         Rapid Airport fastest 37 min, Special Rapid fastest 33 min
 *                                     (36 min in the daytime table), six trains an hour 9:00–16:00;
 *                                     u-seat ¥1,000 (¥800 ticketless)
 *   jrhokkaido.co.jp/global/english/ticket/railpass/  Sapporo–Furano Area Pass ¥11,000
 *                                     pre-purchase, ¥12,000 at a station, 4 days
 *   city.asahikawa.hokkaido.jp/asahiyamazoo/ (news 6 Nov 2026; fees page updated 1 Oct 2026)
 *                                     winter season 11 Nov 2026 – 7 Apr 2027, 10:30–15:30, last
 *                                     entry 15:00; closed 30 Dec – 1 Jan; penguin walk in the snow
 *                                     season, late Dec to mid Mar, 11:00 and 14:30 (11:00 only in
 *                                     March), start announced on the zoo's SNS, may be suspended
 *                                     for weather; adult ¥1,000, junior-high age and under free
 *   snowfes.com/news/948.html         77th Sapporo Snow Festival 4–11 Feb 2027; Odori West 1–11,
 *                                     Susukino (Ekimae-dori South 4–6), Tsudome; notice dated
 *                                     13 Jul 2026, "順次更新予定"
 *   eco.mtk.nao.ac.jp/koyomi/dni/     NAOJ, Sapporo: sunset 16:01 on 1 Dec 2026, 16:50 on
 *                                     4 Feb 2027, 19:18 on 1 Jul 2027 (sunrise 3:59)
 *
 * Carried with their own dates: Odori lit to 22:00, Susukino to 23:00, Tsudome 10:00–16:00,
 * all sites free (snowfes.com/faq, 6 Nov 2026); Otaru Snow Light Path 6–13 Feb 2027
 * (otaru.gr.jp, 6 Nov 2026); Blue Pond light-up 22 Oct 2026 – 21 Apr 2027 and about
 * 2.5 hours' drive from Sapporo to Biei (furano-biei-tour, 15 Nov 2026); subway ¥210 single,
 * ¥830 weekday 1-day, ¥520 Donichika (city.sapporo.jp, 30 Oct 2026); the canal about 10 min
 * on foot from JR Otaru Station (otaru-day-trip-from-sapporo, 1 Nov 2026); JMA 1991–2020
 * February normals for Sapporo, mean max 0.4°C, mean min −6.2°C (28 Oct 2026).
 *
 * Not printed: Jozankei bus times, Nijo Market hours, the zoo's summer hours, and any
 * Klook price.
 */

const ROUTE = "/guides/attractions/sapporo-3-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-16");
const FEST_FAQ = checkedLabel("2026-11-06");
const BIEI = checkedLabel("2026-11-15");
const SUBWAY = checkedLabel("2026-10-30");
const OTARU_WALK = checkedLabel("2026-11-01");
const JMA = checkedLabel("2026-10-28");

const AIRPORT_FARE = "¥1,230";
const OTARU_FARE = "¥800";
const ASAHIKAWA_FARE = "¥5,440";
const BIEI_FARE = "¥680";
const ZOO_ADULT = "¥1,000";
const AREA_PASS = "¥11,000";

type Row = { day: string; area: string; sights: string; move: string; book: string };

/** Table 1: the three days at a glance — first row is the answer. */
const overviewRows: Row[] = [
  {
    day: "Day 1",
    area: "Sapporo city: Odori, Nijo Market, Susukino",
    sights: "Arrive from New Chitose; Odori Park, the Clock Tower and TV Tower; Nijo Market; dinner and the lights in Susukino",
    move: `Rapid Airport (37 min, ${AIRPORT_FARE}), then subway and on foot`,
    book: "Hotel; airport transfer if you have heavy cases",
  },
  {
    day: "Day 2",
    area: "Otaru",
    sights: "Otaru Canal, Sakaimachi street; back for the evening, or stay late for the Snow Light Path (6–13 Feb 2027)",
    move: `JR Rapid Airport, 35 min, ${OTARU_FARE} each way`,
    book: "Nothing — or a coach day that adds a snow park",
  },
  {
    day: "Day 3",
    area: "Asahiyama Zoo + Biei (or skiing, or Jozankei)",
    sights: "Asahiyama Zoo and the penguin walk; Shirahige Falls and the Blue Pond light-up in Biei",
    move: "Coach tour (about 10 hours), or Lilac/Kamui to Asahikawa, 1h25m, then a 40-min bus",
    book: "Yes — the tour, or reserved limited-express seats (all seats reserved)",
  },
];

type Stop = { time: string; place: string; allow: string; getting: string; booking: string };

const day1: Stop[] = [
  {
    time: "Morning",
    place: "New Chitose Airport → Sapporo Station",
    allow: "37 minutes (Rapid Airport); 33 at fastest on the Special Rapid",
    getting: `JR Rapid Airport, six trains an hour in the daytime, ${AIRPORT_FARE}; car 4 is the reserved u-seat`,
    booking: "No — or a shared or private transfer to the hotel",
  },
  {
    time: "Late morning",
    place: "Odori Park, Sapporo Clock Tower, TV Tower",
    allow: "2 hours",
    getting: "On foot from Sapporo Station, or one subway stop to Odori",
    booking: "No",
  },
  {
    time: "Lunch",
    place: "Nijo Market (seafood bowls)",
    allow: "1 hour",
    getting: "On foot from Odori, a few blocks south-east",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Susukino — dinner; in festival week the ice-sculpture site",
    allow: "2–3 hours",
    getting: `Subway to Susukino (single ride from ¥210; ${SUBWAY})`,
    booking: "No",
  },
];

const day2: Stop[] = [
  {
    time: "Morning",
    place: "Sapporo → Otaru",
    allow: "35 minutes",
    getting: `JR Rapid Airport, ${OTARU_FARE}; five of the six cars are non-reserved, so an IC card is enough`,
    booking: "No",
  },
  {
    time: "Late morning",
    place: "Otaru Canal",
    allow: "1 hour",
    getting: `About 10 minutes on foot, downhill, from JR Otaru Station (${OTARU_WALK})`,
    booking: "No",
  },
  {
    time: "Afternoon",
    place: "Sakaimachi street — glass, music boxes, sweets",
    allow: "2–3 hours",
    getting: "On foot from the canal",
    booking: "No",
  },
  {
    time: "Late afternoon",
    place: "Otaru → Sapporo (or stay for the Snow Light Path, 6–13 Feb 2027)",
    allow: "35 minutes",
    getting: `JR Rapid Airport, ${OTARU_FARE}`,
    booking: "No",
  },
];

const day3: Stop[] = [
  {
    time: "About 8:00",
    place: "Sapporo → Asahikawa (by train) — or the tour leaves Sapporo",
    allow: "1 hour 25 minutes by Lilac/Kamui",
    getting: `Limited express, all seats reserved, ${ASAHIKAWA_FARE} one way`,
    booking: "Yes — a reserved seat, or the tour",
  },
  {
    time: "About 10:30",
    place: "Asahikawa Station → Asahiyama Zoo",
    allow: "40 minutes by bus",
    getting: "Bus from Asahikawa Station",
    booking: `No — admission ${ZOO_ADULT} adult, junior-high age and under free`,
  },
  {
    time: "11:00 or 14:30",
    place: "Penguin walk (late Dec to mid Mar, in snow)",
    allow: "Arrive early on the route; the zoo's last entry is 15:00",
    getting: "Inside the zoo; the west gate is the closest entrance",
    booking: "No — may be suspended for weather; March 11:00 only",
  },
  {
    time: "Late afternoon to evening",
    place: "Biei: Shirahige Falls and the Blue Pond light-up (tour) — or back to Sapporo by train",
    allow: "Tour returns in the evening; by train, 40 min bus + 1h25m",
    getting: `Tour coach; by train, Asahikawa–Biei is a ${BIEI_FARE} local, but the zoo and the lit pond in one day is a tour job`,
    booking: "Yes, the tour",
  },
];

/** Table 3: getting there and around — JR Hokkaido figures only. */
const transportRows = [
  {
    route: "New Chitose Airport → Sapporo, Rapid Airport",
    time: "37 min (Special Rapid 33 min at fastest)",
    fare: `${AIRPORT_FARE}; reserved u-seat ¥2,230 in total`,
    note: "Six trains an hour 9:00–16:00; five non-reserved cars",
  },
  {
    route: "Sapporo → Otaru, Rapid Airport",
    time: "35 min",
    fare: `${OTARU_FARE}; reserved ¥1,800 in total`,
    note: "Same train as the airport service, running on through Sapporo",
  },
  {
    route: "Sapporo → Asahikawa, Ltd. Exp. Lilac / Kamui",
    time: "1 hr 25 min",
    fare: `${ASAHIKAWA_FARE} (basic fare + reserved limited-express ticket)`,
    note: "All seats reserved; then 40 min by bus to Asahiyama Zoo",
  },
  {
    route: "Asahikawa → Biei, local train",
    time: "See the timetable",
    fare: BIEI_FARE,
    note: "The Blue Pond is a further bus or drive from Biei Station — tours go direct",
  },
];

/** Table 4: winter and summer — only dated figures. */
const seasonRows = [
  {
    item: "Sunset in Sapporo",
    winter: "16:01 on 1 Dec 2026; 16:50 on 4 Feb 2027",
    summer: "19:18 on 1 Jul 2027 (sunrise 3:59)",
    source: `NAOJ, ${OWN}`,
  },
  {
    item: "Asahiyama Zoo",
    winter: "11 Nov 2026 – 7 Apr 2027, 10:30–15:30, last entry 15:00; closed 30 Dec – 1 Jan",
    summer: "Summer-season hours are on the zoo's calendar (not printed here)",
    source: `city.asahikawa.hokkaido.jp, ${OWN}`,
  },
  {
    item: "Penguin walk",
    winter: "Late Dec to mid Mar, 11:00 and 14:30 (11:00 only in March), snow permitting",
    summer: "Not held — it runs in the snow season only",
    source: `city.asahikawa.hokkaido.jp, ${OWN}`,
  },
  {
    item: "Blue Pond, Biei",
    winter: "Snow covers the water; light-up 22 Oct 2026 – 21 Apr 2027",
    summer: "Blue water by daylight; no light-up",
    source: `biei-hokkaido.jp, ${BIEI}`,
  },
  {
    item: "Roads and coach tours",
    winter: "Coaches run on snow; Klook's winter listings warn of delays and that a late arrival can miss the penguin walk",
    summer: "Flower routes to Furano; the Furano Lavender Express train runs in summer only",
    source: `Klook listings and JR Hokkaido, ${OWN}`,
  },
  {
    item: "Events",
    winter: "Snow Festival 4–11 Feb 2027; Otaru Snow Light Path 6–13 Feb 2027; Sapporo White Illumination late Nov to mid Mar",
    summer: "—",
    source: `snowfes.com, ${OWN}; otaru.gr.jp, ${FEST_FAQ}; JR Hokkaido, ${OWN}`,
  },
];

const faqItems = [
  {
    q: "Is 3 days in Sapporo enough?",
    a: `Yes, for the city and two days out. Day 1 is Odori, Nijo Market and Susukino; Day 2 is Otaru, 35 minutes away by JR for ${OTARU_FARE}; Day 3 is Asahiyama Zoo and the Biei Blue Pond by coach tour, or a ski day. For Furano, Hakodate or a second base, see the Hokkaido 7-day itinerary. Fares read on JR Hokkaido's site ${OWN}.`,
  },
  {
    q: "Is Otaru worth a day trip from Sapporo?",
    a: `Yes. It is 35 minutes on the JR Rapid Airport for ${OTARU_FARE} each way, nothing needs booking, and the canal is about a 10-minute walk from the station. In February the Snow Light Path runs 6–13 Feb 2027, so stay into the evening that week.`,
  },
  {
    q: "Can you do Asahiyama Zoo and Biei in one day from Sapporo?",
    a: `Yes, on a coach tour of about 10 hours. By train it is hard in winter: Sapporo to Asahikawa is 1h25m (${ASAHIKAWA_FARE}), the zoo is a further 40 minutes by bus and closes its gate at 15:00, and the Blue Pond is lit after dark well beyond Biei Station.`,
  },
  {
    q: "When is the Sapporo Snow Festival 2027?",
    a: `4 to 11 February 2027, the 77th edition, at Odori Park (West 1 to West 11), Susukino and Tsudome. The organisers announced the dates and will add details as they are fixed (snowfes.com, read ${OWN}). Entry to every site is free.`,
  },
  {
    q: "Where should I stay in Sapporo for 3 days?",
    a: "Near Sapporo Station: the airport train, the Otaru train, the Asahikawa limited expresses and most tour pick-ups start there. Susukino suits travellers who want restaurants and nightlife at the door; it is a short subway ride away.",
  },
  {
    q: "What time is the penguin walk at Asahiyama Zoo?",
    a: `11:00 and 14:30 in the snow season, from about late December to mid-March, and 11:00 only in March. The zoo announces the start on its social media and may suspend the walk for weather. Read ${OWN}.`,
  },
  {
    q: "How do I get from New Chitose Airport to Sapporo?",
    a: `By JR Rapid Airport: 37 minutes and ${AIRPORT_FARE}, six trains an hour in the daytime. Car 4 is the reserved u-seat, ¥1,000 extra (¥800 ticketless). With ski bags or a family, a shared or private transfer to the hotel door is the alternative.`,
  },
  {
    q: "Do I need a JR pass for 3 days in Sapporo?",
    a: `Only if you go to Asahikawa by train. The airport, Otaru and Asahikawa return fares add up to ¥14,940, above the 4-day Sapporo–Furano Area Pass at ${AREA_PASS}. Without the Asahikawa train, the fares are ¥4,060 and no pass pays.`,
  },
  {
    q: "What should I wear in Sapporo in winter?",
    a: `Clothes for below freezing: the Japan Meteorological Agency's February normals for Sapporo are a mean daily maximum of 0.4°C and minimum of −6.2°C. Boots with grip matter more than anything else, because pavements are packed snow and ice.`,
  },
];

const TITLE = "Sapporo 3 Day Itinerary (2027): Winter, Otaru & Asahiyama";
const DESCRIPTION =
  "Sapporo 3 day itinerary: the city, Otaru (35 min by JR), then Asahiyama Zoo or skiing. 3 days in Sapporo: a Sapporo itinerary winter plan and what to book.";

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
              {["Time", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
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

export default function Sapporo3DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Sapporo 3 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Sapporo 3 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Sapporo 3 Day Itinerary (2027): <br />3 Days in Sapporo, Winter Edition
          </h1>
          <p className={styles.heroSubtitle}>
            One hotel, three days: the city, the canal town, and the zoo where penguins walk in the snow — with the
            Snow Festival dates and what to book before you fly.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "JR Hokkaido times & fares, dated", "A table for each day", "Winter and summer"].map((t) => (
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
                <p className={styles.verdictStatValue}>Odori, Nijo Market, Susukino</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Otaru — 35 min by JR, {OTARU_FARE}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 3</p>
                <p className={styles.verdictStatValue}>Asahiyama Zoo + Biei tour, or skiing</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Snow Festival 2027</p>
                <p className={styles.verdictStatValue}>4–11 February, free</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Sapporo 3 day itinerary</strong> is the city on Day 1, Otaru on Day 2 and Asahikawa on Day 3.
              On <strong>Day 1</strong>, take the Rapid Airport in (37 minutes, {AIRPORT_FARE}) and walk Odori Park,
              Nijo Market and Susukino. On <strong>Day 2</strong>, go to <strong>Otaru, 35 minutes by JR for{" "}
              {OTARU_FARE}</strong>, for the canal and Sakaimachi. On <strong>Day 3</strong>, take a coach tour of about
              10 hours to <strong>Asahiyama Zoo and the Biei Blue Pond light-up</strong>, or spend the day skiing near
              the city. In winter, time the trip for the <strong>Sapporo Snow Festival, 4–11 February 2027</strong>,
              and book the hotel first. Times and fares read on JR Hokkaido&apos;s site, the zoo&apos;s site and the
              festival&apos;s site {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={asahiyamaWinterBluePondTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Asahiyama &amp; Blue Pond Tour →
              </KlookLink>
              <KlookLink href={japanWinterStayAreas[6].url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Sapporo Station Hotels →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Overview */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Sapporo itinerary</span>
          <h2 className={styles.sectionTitle}>How Should I Spend 3 Days in Sapporo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            City first, the easy day trip second, the long day trip last. Only Day 3 needs a booking. This page keeps
            one hotel in Sapporo for all three nights; for a week with a second base in Furano, see our{" "}
            <Link href="/guides/attractions/hokkaido-7-day-itinerary">Hokkaido 7-day itinerary</Link>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Day", "Where", "What to see", "Getting there", "What to book"].map((h) => (
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
            <a href="https://www.jrhokkaido.co.jp/global/english/ticket/regular/index.html" target="_blank" rel="noopener">JR Hokkaido fares</a>,{" "}
            <a href="https://www.jrhokkaido.co.jp/global/english/travel/model/winter03.html" target="_blank" rel="noopener">JR Hokkaido winter route</a>,{" "}
            <a href="https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/" target="_blank" rel="noopener">Asahiyama Zoo</a>. Otaru
            Snow Light Path dates from otaru.gr.jp, {FEST_FAQ}.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>What Should I Do on Day 1 in Sapporo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Arrive, drop bags, and walk the centre: Odori Park, the Clock Tower and the TV Tower are within a few
            blocks of each other, Nijo Market is lunch, and Susukino is dinner. Nothing needs booking.
          </p>
          <StopTable rows={day1} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.jrhokkaido.co.jp/airport/" target="_blank" rel="noopener">jrhokkaido.co.jp/airport</a>. Subway
            fares from city.sapporo.jp, {SUBWAY}: ¥210 single, ¥830 weekday 1-day ticket, ¥520 Donichika ticket at
            weekends. &ldquo;Time to allow&rdquo; is a planning allowance, not an official figure.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Should I Book an Airport Transfer to Sapporo?
          </h3>
          <p className={styles.bodyText}>
            Not usually: the Rapid Airport runs six times an hour in the daytime and takes 37 minutes. A booked
            transfer earns its place with ski bags, small children or a late arrival in snow, because it ends at the
            hotel door. The shared transfer listing asks for a buffer after landing, so book it before you fly.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={newChitoseSapporoSharedTransfer.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Shared airport transfer →
            </KlookLink>
            <KlookLink href={newChitoseAirportTransfers.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Private car from New Chitose →
            </KlookLink>
          </div>
        </section>

        {/* Day 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>Is Otaru Worth a Day Trip From Sapporo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes — it is the shortest good day trip in Hokkaido: <strong>35 minutes and {OTARU_FARE}</strong> each way on
            the JR Rapid Airport, with nothing to book. The canal and Sakaimachi fill a day at walking pace (our{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo">Otaru day trip from Sapporo</Link> guide covers
            half-day and full-day plans). In the week of{" "}
            <strong>6–13 February 2027</strong>, stay for the Snow Light Path after dark.
          </p>
          <StopTable rows={day2} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.jrhokkaido.co.jp/global/english/ticket/regular/index.html" target="_blank" rel="noopener">JR Hokkaido fares</a>,{" "}
            <a href="https://www.jrhokkaido.co.jp/global/english/travel/model/winter03.html" target="_blank" rel="noopener">JR Hokkaido winter route</a>. The
            walk to the canal, cruise fares and the Yoichi distillery are in our{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo">Otaru day trip from Sapporo guide</Link>.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Train or tour?</strong> The train is cheap and flexible. A coach day makes sense only if you want
            to add something the train does not reach — a snow park, or Shiroi Koibito Park — on the same day.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={otaruSnowParkDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Otaru + snow park day tour →
            </KlookLink>
          </div>
        </section>

        {/* Day 3 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 3</span>
          <h2 className={styles.sectionTitle}>Can You Do Asahiyama Zoo and Biei in One Day From Sapporo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, on a coach tour of about 10 hours — and in winter that is the practical way. By train, Sapporo to
            Asahikawa is <strong>1h25m ({ASAHIKAWA_FARE})</strong>, the zoo is another <strong>40 minutes</strong> by bus
            and its <strong>last entry is 15:00</strong>, and the Blue Pond is lit after dark, well beyond Biei
            Station. A tour strings them together and brings you back to Sapporo the same night.
          </p>
          <StopTable rows={day3} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/news-blog/news.html" target="_blank" rel="noopener">Asahiyama Zoo winter notice</a>,{" "}
            <a href="https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/generalinformation/d052849.html" target="_blank" rel="noopener">zoo admission</a>,{" "}
            <a href="https://www.jrhokkaido.co.jp/global/english/travel/model/winter03.html" target="_blank" rel="noopener">JR Hokkaido winter route</a>. Blue
            Pond light-up dates from biei-hokkaido.jp, {BIEI}. Clock times are a planning allowance, not a timetable.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Which tour?</strong> For the penguin walk and the lit Blue Pond, pick a winter listing that names
            both and includes zoo admission. Read the weather terms before you pay: Klook&apos;s winter listings warn
            that snow can delay the coach and a late arrival can miss the penguin walk, and on a three-day trip there
            is no spare day to move to. Six Furano and Biei tours are compared in our{" "}
            <Link href="/guides/attractions/furano-biei-tour">Furano and Biei tour guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={asahiyamaWinterBluePondTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Winter zoo + Blue Pond light-up →
            </KlookLink>
            <KlookLink href={asahiyamaBieiHighlightsTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Zoo, Blue Pond &amp; Ningle Terrace →
            </KlookLink>
          </div>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What Time Is the Penguin Walk at Asahiyama Zoo?
          </h3>
          <p className={styles.bodyText}>
            11:00 and 14:30, in the snow season from about late December to mid-March; in March, 11:00 only. The zoo
            announces the first walk on its social media and may cancel a walk for weather. Admission is{" "}
            {ZOO_ADULT} for adults and free for junior-high age and under (read {OWN}).
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What If I Would Rather Ski or Soak on Day 3?
          </h3>
          <p className={styles.bodyText}>
            Swap the zoo for a ski day: the resorts closest to Sapporo are a half-day or day trip with rental and
            transport in one booking — compared in our{" "}
            <Link href="/guides/attractions/sapporo-ski-day-trip">Sapporo ski day trip guide</Link>. Or spend it in
            the hot springs at Jozankei, in the mountains south-west of the city.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={sapporoKokusaiOtaruDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Sapporo Kokusai ski + Otaru →
            </KlookLink>
            <KlookLink href={sapporoKokusaiSkiOtaruAquariumDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Sapporo Kokusai ski day →
            </KlookLink>
            <KlookLink href={jozankeiMoriNoUtaSpaDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Jozankei onsen day →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book for 3 Days in Sapporo"
          intro="The Day 3 tour, the hotel, the airport leg, the pass if it pays, and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={sapporoThreeDayTripPrep}
        />

        {/* Transport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Otaru and Asahikawa From Sapporo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By JR Hokkaido. The airport and Otaru are on the same Rapid Airport line through Sapporo; Asahikawa is on
            the Lilac and Kamui limited expresses, where every seat is reserved.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Adult fare", "Notes"].map((h) => (
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
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.jrhokkaido.co.jp/global/english/ticket/regular/index.html" target="_blank" rel="noopener">JR Hokkaido regular tickets</a>,{" "}
            <a href="https://www.jrhokkaido.co.jp/global/english/travel/model/winter03.html" target="_blank" rel="noopener">JR Hokkaido winter route</a>,{" "}
            <a href="https://www.jrhokkaido.co.jp/airport/" target="_blank" rel="noopener">jrhokkaido.co.jp/airport</a>. Children
            aged 6–11 pay half.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Do I Need a JR Pass for 3 Days in Sapporo?
          </h3>
          <p className={styles.bodyText}>
            Only if Day 3 is Asahikawa by train. The airport, Otaru and Asahikawa return fares come to{" "}
            <strong>¥14,940</strong>, above the 4-day <strong>Sapporo–Furano Area Pass at {AREA_PASS}</strong>{" "}
            (bought before arrival; ¥12,000 at a station). With a tour on Day 3, the airport and Otaru fares are
            ¥4,060 and no pass pays. Pass details are in our{" "}
            <Link href="/guides/transport/hokkaido-rail-pass">Hokkaido Rail Pass guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={sapporoFuranoAreaPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Sapporo–Furano Area Pass →
            </KlookLink>
          </div>
        </section>

        {/* Seasons */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Winter vs summer</span>
          <h2 className={styles.sectionTitle}>Sapporo Itinerary Winter vs Summer: What Changes?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Shorter days and snow. The sun sets around 16:00 in December, so outdoor sights go in the morning and the
            lit ones — Susukino, the Blue Pond, the Otaru Snow Light Path — after dark. The penguin walk and the Snow
            Festival happen only in winter.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "Winter (Dec–Feb)", "Summer (Jun–Aug)", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={thStyle}>{row.item}</td>
                      <td style={thStyle}>{row.winter}</td>
                      <td style={thStyle}>{row.summer}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s0012.html" target="_blank" rel="noopener">NAOJ sunrise and sunset, Sapporo</a>,{" "}
            <a href="https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/news-blog/news.html" target="_blank" rel="noopener">Asahiyama Zoo</a>,{" "}
            <a href="https://www.snowfes.com/news/948.html" target="_blank" rel="noopener">snowfes.com</a>,{" "}
            <a href="https://www.jrhokkaido.co.jp/global/english/ticket/regular/index.html" target="_blank" rel="noopener">JR Hokkaido</a>. Blue
            Pond light-up from biei-hokkaido.jp, {BIEI}.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What Should I Wear in Sapporo in Winter?
          </h3>
          <p className={styles.bodyText}>
            Clothes for below freezing. The Japan Meteorological Agency&apos;s February normals for Sapporo are a mean
            daily maximum of 0.4°C and minimum of −6.2°C (1991–2020, read {JMA}). Boots with grip matter most:
            pavements are packed snow and ice for weeks at a time.
          </p>
        </section>

        {/* Snow Festival */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Snow Festival</span>
          <h2 className={styles.sectionTitle}>When Is the Sapporo Snow Festival 2027?</h2>
          <p className={styles.bodyText}>
            <strong>4 to 11 February 2027</strong>, the 77th festival, on three sites: Odori Park from West 1 to West
            11, Ekimae-dori in Susukino between South 4 and South 6, and Tsudome. The organisers&apos; notice, dated 13 July
            2026, says further details will be added as they are fixed (read {OWN}). All sites are free; Odori is lit until
            22:00, Susukino until 23:00, and Tsudome is open 10:00–16:00 (festival FAQ, {FEST_FAQ}). If your three
            days fall in that week, Day 1 becomes Odori and Susukino after dark, and rooms near Sapporo Station are
            the booking to make first. Site maps and the days out that only run in February are in our{" "}
            <Link href="/guides/attractions/sapporo-snow-festival-tours">Sapporo Snow Festival guide</Link>.
          </p>
        </section>

        {/* Where to stay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay in Sapporo?</h2>
          <p className={styles.bodyText}>
            <strong>Sapporo Station</strong> for this itinerary: the Rapid Airport arrives there, the Otaru train and
            the Asahikawa limited expresses leave from there, and Odori is one subway stop or a covered walk away.{" "}
            <strong>Susukino</strong> if evenings matter more than early starts — restaurants are at the door and, in
            festival week, so are the ice sculptures. <strong>Otaru</strong> works as one night if you want the canal
            lit after the day-trippers leave.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for Sapporo"
          intro="Room prices and availability change by date, so each area links to Klook's hotel search for it."
          areas={[sapporoSnowFestivalStayAreas[0], sapporoSnowFestivalStayAreas[1], sapporoSnowFestivalStayAreas[2]]}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Train times, the penguin-walk notice and a tour pick-up point all arrive on your phone.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
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
          heading="Guided Days From Sapporo"
          intro="Two winter Asahiyama and Biei days, an Otaru day with a snow park, and a Jozankei onsen day. Durations, pick-up and inclusions are on each listing."
          tours={[asahiyamaWinterBluePondTour, asahiyamaBieiHighlightsTour, otaruSnowParkDayTour, jozankeiMoriNoUtaSpaDayTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/hokkaido-winter-tours", title: "Hokkaido Winter Tours 2026-27: Best Day Tours From Sapporo" },
              { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo (2027): ¥800, 33 Min by JR" },
              { href: "/guides/attractions/furano-biei-tour", title: "Furano & Biei Day Tour from Sapporo (2026): Winter Light-Ups" },
              { href: "/guides/attractions/sapporo-ski-day-trip", title: "Sapporo Ski Day Trip 2026-27: Teine, Kiroro & Rusutsu Tours" },
              { href: "/guides/attractions/sapporo-snow-festival-tours", title: "Sapporo Snow Festival Tours (2027): 4–11 Feb, Free Sites" },
              { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7 Day Itinerary: 7 Days in Hokkaido, Day by Day" },
              { href: "/guides/transport/hokkaido-rail-pass", title: "Hokkaido Rail Pass (2026): Price and Is It Worth It?" },
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
            <h2 className={styles.ctaBannerTitle}>One hotel, three days, one booking that matters</h2>
            <p className={styles.ctaBannerDesc}>
              Settle a room near Sapporo Station, book the Day 3 coach, and leave the city and Otaru to the train.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={asahiyamaWinterBluePondTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Winter Asahiyama Tour →
              </KlookLink>
              <KlookLink href={japanWinterStayAreas[6].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Hotels at Sapporo Station →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
