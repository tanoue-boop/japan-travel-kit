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
  dazaifuYanagawaDayTour,
  dazaifuYanagawaTravelPass,
  fukuokaAirportTransfers,
  fukuokaStayAreas,
  fukuokaTeamlabBusTour,
  fukuokaTwoDayTripPrep,
  jrKyushuRailPass,
  klookEsim,
  teamlabForestFukuokaTicket,
  yanagawaItoshimaDayTour,
  yanagawaStrawberryDazaifuTour,
  yufuinBeppuNoMoriTour,
  yufuinBeppuRopewayTour,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Two days in Fukuoka, based in the city: Hakata, Tenjin and the yatai on Day 1,
 * Dazaifu and the Yanagawa canals (or Yufuin) on Day 2. Added 15 Nov 2026
 * (task-jtk-20261115-01).
 *
 * Next to its neighbours:
 *  - kyushu-5-day-itinerary answers "how to see northern Kyushu in five days";
 *  - yufuin-beppu-tour-from-fukuoka answers "which Yufuin/Beppu tour";
 *  - teamlab-fukuoka-tickets answers "what the museum costs and how to get there";
 *  - this page answers "two days with Fukuoka as the base, and what to book for each".
 *
 * Official reads on 15 Nov 2026:
 *   ensen24.jp/kippu/en/dazaifu-yanagawa/   Dazaifu & Yanagawa Sightseeing Ticket: digital
 *                                     ¥3,620 adult / ¥1,810 child, paper ¥3,730 / ¥1,870;
 *                                     Tenjin or Yakuin → Dazaifu → Yanagawa → back, either
 *                                     order; valid 2 days from first use; boat registration
 *                                     closes 15:00; kotatsu boats 1 Dec–end Feb except in
 *                                     rain or snow; Kyushu National Museum 9:30–17:00
 *                                     (last entry 16:30), closed Mondays
 *   nishitetsu.jp/en/sightseeing/     Tenjin → Futsukaichi limited express 13 min, change
 *                                     to the Dazaifu Line; Tenjin → Yanagawa limited
 *                                     express 45 min
 *   nishitetsu.jp/en/bus/dazaihu_liner.html  Tabito bus Hakata BT → Dazaifu 40 min, ¥800
 *                                     cash / ¥780 IC; airport intl → Dazaifu 25 min,
 *                                     ¥700 / ¥680; no reservation
 *   dazaifutenmangu.or.jp/en/plan/faq No entrance fee; gates from 6:30 (6:00 at the earliest),
 *                                     close 18:30 Dec–Mar, 19:30 Jun–Aug, 19:00 otherwise;
 *                                     about 30 min from Tenjin by train
 *   yanagawakk.co.jp (index, index_e) Shared punt ¥2,200 adult, ¥1,100 ages 6–11, under 6
 *                                     free; about 3 km / 60 min, Shogetsu → Ohana; every
 *                                     30 min 9:40–15:10; summer schedule 1 Jul–15 Sep 2026;
 *                                     mid-Feb draining period (about 10 days) 40-min course
 *                                     ¥1,700; free shuttle back; Tenjin 45 min by Nishitetsu
 *   fukuoka-airport.jp/en/target/beginner.html  Subway Hakata → domestic terminal about
 *                                     5 min, Tenjin about 10 min; not connected to the
 *                                     international terminal (free shuttle bus)
 *   subway.city.fukuoka.lg.jp/eng/fare/one/  1 Day Pass ¥640 adult, ¥320 child
 *   yokanavi.com/en/yatai/            Over 100 stalls, open from 18:00, may not open in
 *                                     stormy weather
 *   jrkyushu.co.jp/english/railpass/  Northern Kyushu pass ¥15,000 (3 days), ¥17,000 (5)
 *
 * Carried with their own dates: Hakata–Yufuin 2h12m–2h21m on the Yufuin no Mori, ¥6,130
 * (online ¥5,600), all-reserved, on sale one month ahead (JR Kyushu, 7 Nov 2026, read for
 * kyushu-5-day-itinerary); teamLab Forest Fukuoka from ¥2,400 adult, 11:00–19:00 weekdays,
 * 10:00–19:00 weekends, 15 min on foot from Tojinmachi exit 3 (29 Oct 2026, read for
 * teamlab-fukuoka-tickets).
 *
 * Not printed: a Dazaifu → Yanagawa end-to-end time (no official figure), the Kyushu
 * National Museum fee, Canal City's hours, yatai prices and any Klook price.
 */

const ROUTE = "/guides/attractions/fukuoka-2-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-15");
const JR_TIME = checkedLabel("2026-11-07");
const TEAMLAB = checkedLabel("2026-10-29");

const PUNT = "¥2,200";
const KIPPU = "¥3,620";
const KIPPU_PAPER = "¥3,730";
const TABITO = "¥800";
const SUBWAY_DAY = "¥640";
const YUFUIN_FARE = "¥6,130";
const NORTH_3DAY = "¥15,000";
const TEAMLAB_ADULT = "¥2,400";

type Row = { day: string; area: string; sights: string; move: string; book: string };

/** Table 1: the two days at a glance — first row is the answer. */
const overviewRows: Row[] = [
  {
    day: "Day 1",
    area: "Hakata, Canal City, Tenjin, Nakasu",
    sights: "Hakata Station area and Canal City Hakata; Tenjin; teamLab Forest Fukuoka if you want a ticketed hour; the yatai food stalls from 18:00",
    move: "Subway (1 Day Pass " + SUBWAY_DAY + ") and on foot",
    book: "Hotel; teamLab slot if you go",
  },
  {
    day: "Day 2",
    area: "Yanagawa + Dazaifu (or Yufuin)",
    sights: "The Yanagawa punt ride on the canals, then Dazaifu Tenmangu and its approach; or Yufuin by train or coach tour",
    move: "Nishitetsu train on one sightseeing ticket, or a coach tour from Hakata Station",
    book: "Sightseeing ticket or tour; for Yufuin, a reserved train seat or tour",
  },
];

type Stop = { time: string; place: string; allow: string; getting: string; booking: string };

const day1: Stop[] = [
  {
    time: "Morning",
    place: "Arrive: Fukuoka Airport (domestic terminal) → Hakata",
    allow: "About 5 minutes on the subway",
    getting: "Fukuoka City Subway from the domestic terminal; from the international terminal, the free shuttle bus to the domestic terminal first",
    booking: "No — or a private car from the airport",
  },
  {
    time: "Late morning",
    place: "Hakata Station area and Canal City Hakata — drop bags, lunch",
    allow: "2 hours",
    getting: "On foot from Hakata Station",
    booking: "No",
  },
  {
    time: "Afternoon",
    place: "teamLab Forest Fukuoka (BOSS E・ZO, Jigyohama) — or Tenjin's shopping streets",
    allow: "1–2 hours inside teamLab",
    getting: "Subway to Tojinmachi, then 15 minutes on foot from exit 3",
    booking: `Yes for teamLab — adult from ${TEAMLAB_ADULT}; dates can sell out in advance`,
  },
  {
    time: "Evening (from 18:00)",
    place: "Yatai food stalls in Nakasu and Tenjin",
    allow: "1–2 hours",
    getting: "Subway to Nakasu-Kawabata or Tenjin and walk",
    booking: "No — seats are shared and first come; stalls may not open in storms",
  },
];

const day2: Stop[] = [
  {
    time: "Morning",
    place: "Nishitetsu Fukuoka (Tenjin) → Nishitetsu Yanagawa",
    allow: "45 minutes",
    getting: "Tenjin–Omuta Line limited express, about every 30 minutes in the daytime",
    booking: "Buy the Dazaifu & Yanagawa Sightseeing Ticket before boarding (or the Klook pass)",
  },
  {
    time: "Late morning",
    place: "Yanagawa punt ride, Shogetsu boarding area → Ohana",
    allow: "About 60 minutes on the water",
    getting: "Shogetsu is about 5 minutes on foot from Nishitetsu Yanagawa; a free shuttle runs back",
    booking: `Ticket included in the sightseeing ticket; otherwise ${PUNT} at the dock. Registration on the ticket closes 15:00`,
  },
  {
    time: "Midday",
    place: "Lunch in Yanagawa — steamed eel (unagi no seiromushi) is the local dish",
    allow: "1 hour",
    getting: "On foot around Ohana and Okinohata",
    booking: "No",
  },
  {
    time: "Afternoon",
    place: "Yanagawa → Dazaifu Tenmangu and the Kyushu National Museum",
    allow: "2–3 hours",
    getting: "Nishitetsu north to Futsukaichi, then the Dazaifu Line; the shrine is on foot from Dazaifu Station",
    booking: "No — the shrine has no entrance fee; the museum closes 17:00 (last entry 16:30) and on Mondays",
  },
  {
    time: "Evening",
    place: "Dazaifu → Tenjin, dinner at the yatai or in Hakata",
    allow: "About 30 minutes",
    getting: "Dazaifu Line to Futsukaichi, limited express to Tenjin",
    booking: "No",
  },
];

/** Table 2: getting there and around — official times and fares only. */
const transportRows = [
  {
    route: "Fukuoka Airport (domestic) → Hakata / Tenjin, subway",
    time: "About 5 min to Hakata, about 10 min to Tenjin",
    fare: `1 Day Pass ${SUBWAY_DAY} adult, ¥320 child (single fares by distance)`,
    note: "The subway does not reach the international terminal — take the free shuttle bus to the domestic terminal",
    source: `fukuoka-airport.jp; subway.city.fukuoka.lg.jp, ${OWN}`,
  },
  {
    route: "Fukuoka (Tenjin) → Dazaifu, Nishitetsu train",
    time: "About 30 min: limited express 13 min to Futsukaichi, then the Dazaifu Line",
    fare: `In the Dazaifu & Yanagawa Sightseeing Ticket (${KIPPU} digital, ${KIPPU_PAPER} paper, adult)`,
    note: "The ticket covers Tenjin or Yakuin → Dazaifu → Yanagawa → back, in either order, over 2 days",
    source: `nishitetsu.jp; dazaifutenmangu.or.jp, ${OWN}`,
  },
  {
    route: "Hakata Bus Terminal → Dazaifu, Tabito bus",
    time: "About 40 min (airport international terminal → Dazaifu about 25 min)",
    fare: `${TABITO} cash, ¥780 IC or card (airport: ¥700 / ¥680)`,
    note: "No reservation; a full bus may not take you",
    source: `nishitetsu.jp, ${OWN}`,
  },
  {
    route: "Fukuoka (Tenjin) → Nishitetsu Yanagawa",
    time: "45 min by limited express",
    fare: "In the sightseeing ticket",
    note: "Daytime limited expresses about every 30 minutes",
    source: `nishitetsu.jp; yanagawakk.co.jp, ${OWN}`,
  },
  {
    route: "Dazaifu ⇄ Yanagawa",
    time: "No official end-to-end time published",
    fare: "In the sightseeing ticket",
    note: "Change at Futsukaichi between the Dazaifu Line and the Tenjin–Omuta Line",
    source: `nishitetsu.jp, ${OWN}`,
  },
  {
    route: "Hakata → Yufuin, JR Yufuin no Mori",
    time: "2h12m–2h21m",
    fare: `${YUFUIN_FARE} one way (online ¥5,600)`,
    note: "All seats reserved; on sale one month ahead at 10:00",
    source: `JR Kyushu, ${JR_TIME}`,
  },
];

/** Table 3: what Day 1 and Day 2 cost at the gate. */
const priceRows = [
  {
    stop: "Yanagawa punt ride (shared boat)",
    price: `${PUNT} adult, ¥1,100 ages 6–11, under 6 free`,
    hours: "Every 30 min, 9:40–15:10 (regular season); about 60 min",
    note: "The operator says peak dates may be priced higher. Private boats from ¥20,000 per boat",
  },
  {
    stop: "Dazaifu & Yanagawa Sightseeing Ticket (Nishitetsu)",
    price: `${KIPPU} digital, ${KIPPU_PAPER} paper (child ¥1,810 / ¥1,870)`,
    hours: "Valid 2 days from first use; boat registration closes 15:00",
    note: "Round trip from Tenjin or Yakuin plus the shared punt ticket; show it at the station window, not the automatic gates",
  },
  {
    stop: "Dazaifu Tenmangu",
    price: "Free",
    hours: "From 6:30 (6:00 at the earliest); closes 18:30 Dec–Mar, 19:30 Jun–Aug, 19:00 otherwise",
    note: "The shrine's museum and nearby sights charge separately",
  },
  {
    stop: "Kyushu National Museum",
    price: "See the museum's site for the current exhibition",
    hours: "9:30–17:00, last entry 16:30; closed Mondays",
    note: "Fee not printed here: it depends on the exhibition",
  },
  {
    stop: "teamLab Forest Fukuoka",
    price: `Adult from ${TEAMLAB_ADULT} (peak ¥2,700), ages 4–15 ¥1,000`,
    hours: "11:00–19:00 weekdays, 10:00–19:00 weekends and holidays",
    note: `Read ${TEAMLAB} on teamlab.art`,
  },
];

/** Table 4: seasons — only what the operators publish. */
const seasonRows = [
  {
    when: "December – February",
    what: "Yanagawa runs kotatsu boats (a heated table under a quilt) except in rain or snow; yatai are open from 18:00 but may close in storms; Dazaifu Tenmangu closes at 18:30",
    plan: "Yanagawa in the late morning when it is warmest; Dazaifu after",
  },
  {
    when: "Mid-February (about 10 days)",
    what: "The moat is drained: the boat runs a 40-minute course instead, ¥1,700 adult",
    plan: "The sightseeing ticket's holders get the difference refunded at the counter",
  },
  {
    when: "1 July – 15 September 2026",
    what: "Summer boat schedule: departures 8:10–10:40 and 15:40–19:40 only",
    plan: "Do Yanagawa first thing, or late in the day",
  },
  {
    when: "Plum season",
    what: "Dazaifu Tenmangu has over 6,000 plum trees (Nishitetsu's figure)",
    plan: "Expect the approach to be at its busiest",
  },
];

const faqItems = [
  {
    q: "Is 2 days in Fukuoka enough?",
    a: `Yes, for the city and one day out. Day 1 covers Hakata, Canal City, Tenjin and the yatai from 18:00. Day 2 covers Yanagawa (45 minutes from Tenjin by Nishitetsu) and Dazaifu Tenmangu (about 30 minutes from Tenjin) on one ${KIPPU} sightseeing ticket. Prices read on official sites ${OWN}.`,
  },
  {
    q: "Can I do Dazaifu and Yanagawa in one day?",
    a: `Yes. Nishitetsu's Dazaifu & Yanagawa Sightseeing Ticket (${KIPPU} digital, ${KIPPU_PAPER} paper) covers the round trip from Tenjin in either order plus the Yanagawa boat. Boat registration on the ticket closes at 15:00 and the boat takes about 60 minutes, while the shrine stays open into the evening — so Yanagawa first is the safer order.`,
  },
  {
    q: "Should I go to Yufuin or Dazaifu from Fukuoka?",
    a: `Dazaifu and Yanagawa if you want an easy day: 30 to 45 minutes each way, no reservations. Yufuin if you want an onsen town: 2h12m–2h21m on the all-reserved Yufuin no Mori (${YUFUIN_FARE} one way, JR Kyushu ${JR_TIME}), or a 10 to 10.5-hour coach tour that adds Beppu.`,
  },
  {
    q: "Do I need the JR Kyushu Rail Pass for 2 days in Fukuoka?",
    a: `No. Dazaifu and Yanagawa are on Nishitetsu, which the JR pass does not cover. Even for Yufuin, two Yufuin no Mori tickets at ${YUFUIN_FARE} each come to ¥12,260, less than the 3-day Northern Kyushu pass at ${NORTH_3DAY}. The pass pays when Fukuoka is the start of a longer Kyushu trip.`,
  },
  {
    q: "Where should I stay in Fukuoka, Hakata or Tenjin?",
    a: "Hakata for arrivals, the shinkansen and coach tours, which meet at Hakata Station. Tenjin if Day 2 is Dazaifu and Yanagawa by Nishitetsu, which starts at Fukuoka (Tenjin) Station, and for the yatai at night. The subway links the two in a few minutes.",
  },
  {
    q: "What time do the Fukuoka yatai open?",
    a: "Fukuoka City's tourist site says the stalls open from 18:00 and that a stall may not open in stormy weather or if the owner is unwell. There are over 100 of them; seats are few and shared, so go in a small group and do not linger.",
  },
  {
    q: "How do I get from Fukuoka Airport to Hakata?",
    a: `By subway from the domestic terminal: about 5 minutes to Hakata and 10 to Tenjin. The subway does not reach the international terminal, so take the free shuttle bus to the domestic terminal first. A subway 1 Day Pass is ${SUBWAY_DAY}.`,
  },
  {
    q: "Is the Yanagawa boat ride open in winter?",
    a: "Yes. From 1 December to the end of February the boats run with kotatsu — a heated table under a quilt — except in rain or snow. For about 10 days in mid-February the moat is drained and the boat runs a shorter 40-minute course.",
  },
];

const TITLE = "Fukuoka 2 Day Itinerary (2026): Dazaifu, Yanagawa or Yufuin";
const DESCRIPTION =
  "Fukuoka 2 day itinerary: Hakata, Tenjin and the yatai on Day 1, Dazaifu and the Yanagawa boat on Day 2. A Fukuoka itinerary for 2 days in Fukuoka by train.";

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

export default function Fukuoka2DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Fukuoka 2 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Fukuoka 2 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Fukuoka 2 Day Itinerary (2026): <br />2 Days in Fukuoka, Dazaifu and Yanagawa
          </h1>
          <p className={styles.heroSubtitle}>
            One day in the city ending at the food stalls; one day out on the Nishitetsu line to the shrine and the
            canals — or to Yufuin if you want an onsen town instead.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official times & fares, dated", "A table for each day", "Yanagawa or Yufuin"].map((t) => (
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
                <p className={styles.verdictStatValue}>Hakata, Canal City, Tenjin, yatai from 18:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Yanagawa boat + Dazaifu Tenmangu</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tenjin → Dazaifu / Yanagawa</p>
                <p className={styles.verdictStatValue}>About 30 min / 45 min by Nishitetsu</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Or Yufuin</p>
                <p className={styles.verdictStatValue}>2h12m+ by Yufuin no Mori, or a tour</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Fukuoka 2 day itinerary</strong> is one day in the city and one day out. On{" "}
              <strong>Day 1</strong>, walk Hakata and Canal City, spend the afternoon in Tenjin or at teamLab Forest,
              and eat at the <strong>yatai food stalls, which open from 18:00</strong>. On <strong>Day 2</strong>, take
              the Nishitetsu train to <strong>Yanagawa (45 minutes from Tenjin)</strong> for the{" "}
              <strong>60-minute canal boat ({PUNT})</strong>, then <strong>Dazaifu Tenmangu</strong>, about 30 minutes
              back towards Tenjin, on one <strong>{KIPPU}</strong> sightseeing ticket. For Yufuin instead, the Yufuin no
              Mori train takes <strong>2h12m–2h21m</strong> from Hakata, or a coach tour takes the whole day. Times and
              prices read on the operators&apos; sites {OWN}; JR times {JR_TIME}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={dazaifuYanagawaDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Dazaifu &amp; Yanagawa Tour →
              </KlookLink>
              <KlookLink href={fukuokaStayAreas[1].url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Hakata Hotels →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Overview */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fukuoka itinerary</span>
          <h2 className={styles.sectionTitle}>How Should I Spend 2 Days in Fukuoka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            City first, day trip second. Day 1 needs almost nothing booked and fits around your flight or
            shinkansen in; Day 2 runs on a Nishitetsu ticket or a coach tour. This is a Fukuoka itinerary with the
            city as the base — for five days around Kumamoto, Aso and Nagasaki, see our{" "}
            <Link href="/guides/attractions/kyushu-5-day-itinerary">Kyushu 5-day itinerary</Link>.
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
            <a href="https://www.nishitetsu.jp/en/sightseeing/" target="_blank" rel="noopener">nishitetsu.jp</a>,{" "}
            <a href="https://yokanavi.com/en/yatai/" target="_blank" rel="noopener">yokanavi.com</a> (Fukuoka City),{" "}
            <a href="https://subway.city.fukuoka.lg.jp/eng/fare/one/" target="_blank" rel="noopener">subway.city.fukuoka.lg.jp</a>.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>What Should I Do on Day 1 in Fukuoka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Hakata and Canal City around arrival, Tenjin or teamLab Forest in the afternoon, and the yatai at night.
            The subway joins all of it: about 5 minutes from the airport to Hakata, and a {SUBWAY_DAY} day pass covers
            every line. The operator puts teamLab Forest at about an hour inside — prices, hours and peak dates are
            in our{" "}
            <Link href="/guides/attractions/teamlab-fukuoka-tickets">teamLab Fukuoka tickets</Link> guide.
          </p>
          <StopTable rows={day1} />
          <p className={styles.bodyText} style={noteStyle}>
            Airport times from fukuoka-airport.jp and the yatai hours from Fukuoka City&apos;s yokanavi.com, {OWN};
            teamLab figures from teamlab.art and e-zofukuoka.com, {TEAMLAB}. &ldquo;Time to allow&rdquo; is a planning
            allowance, not an official figure.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Is teamLab Forest Fukuoka Worth It on a 2-Day Trip?
          </h3>
          <p className={styles.bodyText}>
            If you want one ticketed hour on Day 1, yes — it is the cheapest adult tier of the permanent teamLab
            venues, from {TEAMLAB_ADULT}, and the venue suggests about an hour. It is not on a subway line: allow 15
            minutes on foot from Tojinmachi. Prices, peak dates and the walk are in our{" "}
            <Link href="/guides/attractions/teamlab-fukuoka-tickets">teamLab Fukuoka tickets guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={teamlabForestFukuokaTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              teamLab Forest ticket →
            </KlookLink>
            <KlookLink href={fukuokaTeamlabBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Bus day with teamLab →
            </KlookLink>
          </div>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What Time Do the Fukuoka Yatai Open?
          </h3>
          <p className={styles.bodyText}>
            From 18:00. Fukuoka City counts over 100 stalls, and says a stall may not open if the weather is stormy
            or the owner is unwell. Seats are few and shared, so go in twos or threes and move on after a dish or two.
            Nothing is bookable — which is why Day 1 is the night for them.
          </p>
        </section>

        {/* Day 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>Is a Day Trip to Dazaifu and Yanagawa Worth It?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes — it is the easiest full day out of Fukuoka, and one Nishitetsu ticket covers it. Go to{" "}
            <strong>Yanagawa first</strong>: the boat registration on the ticket closes at <strong>15:00</strong> and the
            ride takes about an hour, while Dazaifu Tenmangu stays open until 18:30 even in winter.
          </p>
          <StopTable rows={day2} />
          <p className={styles.bodyText} style={noteStyle}>
            Train times from nishitetsu.jp; boat times and the walk from yanagawakk.co.jp; shrine hours from
            dazaifutenmangu.or.jp; museum hours from Nishitetsu&apos;s ticket page — all {OWN}.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Ticket or tour?</strong> The sightseeing ticket is the cheapest way and lets you choose the order
            and the hours; it is valid for 2 days from first use, but you cannot leave the gates anywhere except Dazaifu
            and Yanagawa. A coach tour from Hakata Station does the same day on one booking and adds Itoshima&apos;s
            coast or strawberry picking, depending on the listing. Read the listing&apos;s weather terms: Klook&apos;s
            Fukuoka day tours state when a typhoon or snow cancellation is confirmed, and on a two-day trip there is no
            spare day to move to.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={dazaifuYanagawaDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Dazaifu &amp; Yanagawa day tour →
            </KlookLink>
            <KlookLink href={yanagawaStrawberryDazaifuTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              + strawberry picking →
            </KlookLink>
            <KlookLink href={dazaifuYanagawaTravelPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Dazaifu &amp; Yanagawa pass →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book for Two Days in Fukuoka"
          intro="The Day 2 tour or pass, the hotel, the airport leg and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={fukuokaTwoDayTripPrep}
        />

        {/* Yufuin vs Dazaifu */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day 2, the other way</span>
          <h2 className={styles.sectionTitle}>Should I Go to Yufuin or Dazaifu From Fukuoka?</h2>
          <p className={styles.bodyText}>
            Dazaifu and Yanagawa for an easy day with no seat to book: 30 to 45 minutes each way on Nishitetsu. Yufuin
            for an onsen town: the <strong>Yufuin no Mori</strong> takes <strong>2h12m–2h21m</strong> from Hakata,{" "}
            <strong>{YUFUIN_FARE}</strong> one way (¥5,600 online), every seat reserved and sold from one month ahead
            (JR Kyushu, {JR_TIME}). Coach tours from Fukuoka run 10 to 10.5 hours and add the Beppu hells, often with a
            stop at Dazaifu on the way. Six tours are compared in our{" "}
            <Link href="/guides/attractions/yufuin-beppu-tour-from-fukuoka">Yufuin and Beppu day trip from Fukuoka guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={yufuinBeppuNoMoriTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Yufuin no Mori + Beppu tour →
            </KlookLink>
            <KlookLink href={yufuinBeppuRopewayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Dazaifu, Yufuin &amp; Beppu tour →
            </KlookLink>
          </div>
        </section>

        {/* Transport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Dazaifu, Yanagawa and Yufuin From Fukuoka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The subway in the city, Nishitetsu trains (or the Tabito bus) to Dazaifu and Yanagawa, and JR for Yufuin.
            Only the Yufuin no Mori needs a reservation.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Fare", "Notes", "Source & date checked"].map((h) => (
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
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.fukuoka-airport.jp/en/target/beginner.html" target="_blank" rel="noopener">fukuoka-airport.jp</a>,{" "}
            <a href="https://www.nishitetsu.jp/en/bus/dazaihu_liner.html" target="_blank" rel="noopener">Tabito bus</a>,{" "}
            <a href="http://www.ensen24.jp/kippu/en/dazaifu-yanagawa/" target="_blank" rel="noopener">Nishitetsu sightseeing ticket</a>,{" "}
            <a href="https://www.dazaifutenmangu.or.jp/en/" target="_blank" rel="noopener">dazaifutenmangu.or.jp</a>. Yufuin no
            Mori figures from JR Kyushu, {JR_TIME}, as used in our Kyushu itinerary.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={fukuokaAirportTransfers.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Fukuoka Airport transfer →
            </KlookLink>
            <KlookLink href={dazaifuYanagawaTravelPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Dazaifu &amp; Yanagawa pass →
            </KlookLink>
          </div>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Do Dazaifu, the Yanagawa Boat and teamLab Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Dazaifu Tenmangu is free, the Yanagawa boat is {PUNT}, and the sightseeing ticket that includes the boat and
            the trains is {KIPPU} on a phone or {KIPPU_PAPER} on paper.
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
                  {priceRows.map((row) => (
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
            <a href="https://www.yanagawakk.co.jp/index_e.html" target="_blank" rel="noopener">yanagawakk.co.jp</a>,{" "}
            <a href="http://www.ensen24.jp/kippu/en/dazaifu-yanagawa/" target="_blank" rel="noopener">ensen24.jp</a> (Nishitetsu),{" "}
            <a href="https://www.dazaifutenmangu.or.jp/en/" target="_blank" rel="noopener">dazaifutenmangu.or.jp</a>. teamLab
            from teamlab.art, {TEAMLAB}. No Klook price appears on this page.
          </p>
        </section>

        {/* Where to stay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay in Fukuoka: Hakata or Tenjin?</h2>
          <p className={styles.bodyText}>
            <strong>Hakata</strong> if you arrive by shinkansen or take a coach tour on Day 2 — the tours meet at Hakata
            Station, and the airport is about 5 minutes away by subway. <strong>Tenjin</strong> if Day 2 is Dazaifu and
            Yanagawa on your own, because the Nishitetsu trains start at Fukuoka (Tenjin) Station, and the Tenjin and
            Nakasu yatai are a walk away at night. The subway joins the two, so neither is a wrong answer for two nights.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for Fukuoka"
          intro="Room prices and availability change by date, so each area links to Klook's hotel search for it."
          areas={[fukuokaStayAreas[1], fukuokaStayAreas[2], fukuokaStayAreas[0]]}
        />

        {/* JR pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rail pass</span>
          <h2 className={styles.sectionTitle}>Do I Need the JR Kyushu Rail Pass for Fukuoka?</h2>
          <p className={styles.bodyText}>
            Not for two days. Dazaifu and Yanagawa are on Nishitetsu, a private railway the JR pass does not cover.
            For Yufuin, two Yufuin no Mori tickets at {YUFUIN_FARE} each come to <strong>¥12,260</strong>, below the
            3-day Northern Kyushu pass at <strong>{NORTH_3DAY}</strong> (JR Kyushu, {OWN}; ¥17,000 for 5 days). The
            pass pays when Fukuoka is the start of a longer Kyushu trip with Kumamoto or Nagasaki in it — our{" "}
            <Link href="/guides/attractions/kyushu-5-day-itinerary">Kyushu 5-day itinerary</Link> works the sums, and
            the <Link href="/guides/transport/jr-kyushu-rail-pass">JR Kyushu Rail Pass guide</Link> compares the three
            passes. If you do take the pass to Yufuin, every Yufuin no Mori seat is reserved, and the Northern pass
            includes six free ones — see{" "}
            <Link href="/guides/transport/jr-kyushu-rail-pass#seats">how the Yufuin no Mori seats work on the pass</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKyushuRailPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the JR Kyushu Rail Pass →
            </KlookLink>
          </div>
        </section>

        {/* Seasons */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Seasons</span>
          <h2 className={styles.sectionTitle}>When Is the Best Time for 2 Days in Fukuoka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Any month works; what changes is the Yanagawa boat. Winter brings the kotatsu boats, mid-February a short
            drained-moat course, and summer a split timetable.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["When", "What changes", "How to plan"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.when}>
                      <td className={styles.tdProvider} style={thStyle}>{row.when}</td>
                      <td style={thStyle}>{row.what}</td>
                      <td style={thStyle}>{row.plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}: yanagawakk.co.jp, nishitetsu.jp, dazaifutenmangu.or.jp, yokanavi.com.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The boat queue, a yatai closed for the weather and the tour pick-up all reach you on your phone.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the alternatives.
          </p>
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Adding Nagasaki to the trip? See <Link href="/guides/attractions/huis-ten-bosch-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Huis Ten Bosch tickets</Link> for the theme park and the <Link href="/guides/attractions/gunkanjima-tour" style={{ color: "var(--red)", fontWeight: 600 }}>Gunkanjima tour</Link> for Battleship Island.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For day trips by bus from Fukuoka, the <Link href="/guides/transport/sunq-pass" style={{ color: "var(--red)", fontWeight: 600 }}>SUNQ Pass</Link> covers expressway and local buses (Northern Kyushu ¥10,000 for 3 days, digital).
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For an aquarium, <Link href="/guides/attractions/marine-world-uminonakamichi-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Marine World Uminonakamichi</Link> is ¥2,500 for adults, open 10:00–17:00 in winter, reached by the JR Kashii Line from Hakata.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For getting around, the <Link href="/guides/transport/fukuoka-tourist-city-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Fukuoka Tourist City Pass</Link> is ¥2,500 a day (¥2,800 with Dazaifu); for Dazaifu plus the Yanagawa boat, Nishitetsu&apos;s <Link href="/guides/transport/dazaifu-yanagawa-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Dazaifu & Yanagawa pass</Link> is ¥3,620 digital.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For a day further south, <Link href="/guides/attractions/kumamoto-castle-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kumamoto Castle</Link> is ¥800 for adults, open 9:00–17:00.
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
          heading="Guided Days From Fukuoka"
          intro="Three Dazaifu and Yanagawa days, and a Yufuin and Beppu day. Durations, pick-up and inclusions are on each listing."
          tours={[dazaifuYanagawaDayTour, yanagawaStrawberryDazaifuTour, yanagawaItoshimaDayTour, yufuinBeppuNoMoriTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/yufuin-beppu-tour-from-fukuoka", title: "Yufuin and Beppu Tour from Fukuoka: Tours, Trains and Onsen Time" },
              { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking" },
              { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5 Day Itinerary (2026): Fukuoka, Beppu, Kumamoto and Takachiho" },
              { href: "/guides/transport/jr-kyushu-rail-pass", title: "JR Kyushu Rail Pass 2026: Prices, New Oct 1 Pass & Worth It?" },
              { href: "/guides/attractions/hiroshima-2-day-itinerary", title: "2 Days in Hiroshima: Day-by-Day Itinerary (2026)" },
              { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary (2026): Day by Day, and What to Book" },
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
            <h2 className={styles.ctaBannerTitle}>One day in the city, one day on the canals</h2>
            <p className={styles.ctaBannerDesc}>
              Book a hotel at Hakata or Tenjin, settle Day 2 as a tour or a Nishitetsu ticket, and leave the first
              evening for the yatai.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={dazaifuYanagawaDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Dazaifu &amp; Yanagawa Tour →
              </KlookLink>
              <KlookLink href={fukuokaStayAreas[2].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Hotels in Tenjin →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
