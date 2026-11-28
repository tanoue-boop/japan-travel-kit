import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, priceById } from "../../../lib/attraction-prices";
import {
  jrHarukaUrl,
  kyotoCityFushimiArashiyamaTour,
  kyotoFushimiInariWalkingTour,
  kyotoGionNightWalkingTour,
  kyotoHighlightBusTour,
  kyotoKimonoAiwafukuKiyomizu,
  kyotoNaraArashiyamaTour,
  kyotoOneDaySameDayCards,
  kyotoOneDayTripPrep,
  kyotoSubwayBusTicket,
  saganoHozugawaGuaranteedTour,
  saganoRomanticTrainTicket,
  shinkansenTokyoKyoto,
} from "../../../lib/klook-links";
import { nijoCastleTicket } from "../../../lib/klook-links-a35";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * One day in Kyoto, added 28 Nov 2026 (task-jtk-20261128-01).
 *
 * Next to its neighbours:
 *  - kyoto-2-day / kyoto-3-day are two and three days with a night in the city;
 *  - kyoto-day-trip-from-tokyo is the shinkansen and tour side of a Tokyo day trip;
 *  - this page is the one day inside Kyoto: three self-contained routes, and which of
 *    them still fits when you arrive from Osaka or Tokyo at a given hour.
 *
 * Official reads on 28 Nov 2026 (node fetch):
 *   traininfo.jr-central.co.jp      Tokyo → Kyoto, all westbound trains on the day: Nozomi
 *                                   127–135 min (median 132, 132 trains), first Nozomi 1
 *                                   06:00 → 08:08; 07:00 → 09:12, 08:00 → 10:15, 09:00 →
 *                                   11:15, 10:00 → 12:15. Kyoto → Tokyo last Nozomi 64
 *                                   21:38 → 23:45.
 *   timetable.jr-odekake.net        JR West's own timetable, Osaka station, JR Kyoto Line,
 *                                   Sat 28 Nov: Special Rapid Osaka → Kyoto 28–30 min
 *                                   (median 29, 64 trains), every 15 minutes in the morning
 *                                   (7:15 → 7:44, 8:00 → 8:29, 9:00 → 9:28).
 *   city.kyoto.lg.jp/kotsu          0000028378 Subway & Bus 1-Day Pass ¥1,100 / ¥550;
 *                                   0000028337 Bus 1-Day Pass sold to 30 Sep 2023, valid
 *                                   to 31 Mar 2024.
 *   kiyomizudera.or.jp              6:00 open, 18:00 close (18:30 Jul–Aug), 21:00 reception
 *                                   cut-off in night viewings; autumn night viewing
 *                                   21–30 Nov 2026 to 21:30.
 *   tenryuji.com/visit/             garden 8:30–17:00 (last 16:50), ¥500 / ¥300, buildings
 *                                   +¥300; early 7:30 garden opening 14–30 Nov 2026.
 *   westjr.co.jp                    HARUKA One-way Kansai Airport–Kyoto ¥2,700 / ¥1,350;
 *                                   WEST QR Kansai Area Pass ¥2,700 / ¥4,700 / ¥5,500 (1–3 days).
 * Carried with their own dates: city bus ¥230 / ¥120, subway ¥220–¥360, EX100/101 ¥500,
 * JR Inari about 5 min and Saga-Arashiyama about 11 min, Keihan ¥240 (kyoto-transportation,
 * 5 and 21 Nov); Kiyomizu-dera ¥500 (kyoto-2-day, 29 Oct); Sagano ¥880 and the
 * 30 Dec–28 Feb closure (sagano-romantic-train-tickets, 7 Nov); Osaka–Kyoto ¥580 (JR West
 * Keihanshin fare PDF, 23 Nov); Hozugawa boat (28 Nov); Nijo Castle from
 * data/attraction-prices.json.
 *
 * Not printed: JR fares inside Kyoto (no readable official table), and any Klook price.
 * The clock times in the route tables are a planning guide. No Klook ad id: spare is
 * empty, so links use ?aid=119070.
 */

const ROUTE = "/guides/attractions/kyoto-1-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const TODAY = checkedLabel("2026-11-28");
const TRANSPORT = checkedLabel("2026-11-21");
const ROUTES_READ = checkedLabel("2026-11-05");
const KIYOMIZU_FEE = checkedLabel("2026-10-29");
const SAGANO = checkedLabel("2026-11-07");
const JR_FARE = checkedLabel("2026-11-23");
const NIJO = priceById("nijoCastle");
const NIJO_CHECKED = checkedLabel(NIJO.checked);

const PASS = "¥1,100";
const BUS = "¥230";

const KOTSU = "https://www.city.kyoto.lg.jp/kotsu/page/";
const PASS_URL = `${KOTSU}0000028378.html`;
const OLD_PASS_URL = `${KOTSU}0000028337.html`;
const KIYOMIZU_URL = "https://www.kiyomizudera.or.jp/news/open-hour.php";
const TENRYUJI_URL = "https://www.tenryuji.com/visit/";
const JRC_URL = "https://traininfo.jr-central.co.jp/shinkansen/pc/ja/index.html";
const ODEKAKE_URL = "https://timetable.jr-odekake.net/station-timetable/2796011001";
const HARUKA_URL = "https://www.westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/";
const KANSAI_PASS_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/";

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type Stop = { time: string; place: string; move: string; book: string };

const routeA: Stop[] = [
  { time: "8:00", place: "Kiyomizu-dera (open from 6:00; ¥500 adult)", move: "City Bus 100 or 206 to Gojozaka, then about 10 min on foot; EX100 / EX101 (¥500) on Saturdays, Sundays and holidays", book: "No" },
  { time: "9:30", place: "Sannenzaka and Ninenzaka lanes, downhill from the temple gate", move: "On foot", book: "No" },
  { time: "11:30", place: "Kodai-ji area and lunch on Nene-no-michi", move: "On foot", book: "No" },
  { time: "13:00", place: "Yasaka Shrine and Maruyama Park (free)", move: "On foot, about 10 min", book: "No" },
  { time: "14:30", place: "Gion: Hanamikoji and the Shirakawa canal; tea ceremony or kimono photos", move: "On foot", book: "Only a kimono slot or a tea room" },
  { time: "17:30", place: "Gion after dark, then dinner in Pontocho", move: "On foot across Shijo bridge", book: "Only if you want a guided night walk" },
];

const routeB: Stop[] = [
  { time: "8:00", place: "Arashiyama bamboo grove (free, open path)", move: "JR Sagano Line Rapid to Saga-Arashiyama, about 11 min", book: "No" },
  { time: "8:30", place: "Tenryu-ji garden (8:30–17:00, ¥500 adult)", move: "On foot from the grove's north gate", book: "No" },
  { time: "10:00", place: "Togetsukyo bridge and the Katsura riverbank", move: "On foot", book: "No" },
  { time: "11:00", place: "Sagano Romantic Train, Torokko Saga → Kameoka (25 min, ¥880); the Hozugawa boat back is about 2 hours", move: "Torokko Saga is beside JR Saga-Arashiyama", book: "Yes — a reserved car and seat. Not running 30 Dec 2026 – 28 Feb 2027" },
  { time: "14:30", place: "Lunch on Arashiyama's main street", move: "The boat lands in Arashiyama", book: "No" },
  { time: "16:00", place: "Back east: Shijo, Nishiki Market or Kyoto Station", move: "Randen (¥250 flat) to Shijo-Omiya, or JR to Kyoto", book: "No" },
];

const routeC: Stop[] = [
  { time: "7:00", place: "Fushimi Inari Taisha, the Senbon Torii (free, no gate hours)", move: "JR Nara Line to Inari, about 5 min; the shrine is in front of the exit", book: "No" },
  { time: "9:30", place: "Leave the mountain path at the Yotsutsuji viewpoint or earlier", move: "Keihan from Fushimi-Inari to Kiyomizu-Gojo, then about 20 min on foot", book: "No" },
  { time: "10:30", place: "Kiyomizu-dera (¥500 adult)", move: "On foot uphill from Gojo-zaka", book: "No" },
  { time: "12:00", place: "Sannenzaka, Ninenzaka and lunch", move: "On foot", book: "No" },
  { time: "14:00", place: "Yasaka Shrine, Maruyama Park and Gion", move: "On foot", book: "No" },
  { time: "17:30", place: "Gion night walk, dinner in Pontocho", move: "On foot", book: "Only a guided walk" },
];

type ArrivalRow = { arrive: string; osaka: string; tokyo: string; fits: string };

const arrivalRows: ArrivalRow[] = [
  {
    arrive: "Before 8:00",
    osaka: "Special Rapid 7:15 → 7:44 or 7:30 → 7:59",
    tokyo: "Not possible — the first Nozomi reaches Kyoto at 8:08",
    fits: "All three routes in full; Route C (Fushimi Inari at 8:00) is the best use of it",
  },
  {
    arrive: "8:00–9:30",
    osaka: "Special Rapid 8:00 → 8:29, 9:00 → 9:28",
    tokyo: "Trains leaving Tokyo 06:00–07:15 (06:00 → 08:08, 07:00 → 09:12)",
    fits: "Route A or Route B in full. Route C works if Fushimi Inari is kept to the lower gates",
  },
  {
    arrive: "9:30–11:30",
    osaka: "Any Special Rapid, every 15 min",
    tokyo: "Nozomi 07:00 → 09:12, 08:00 → 10:15, 09:00 → 11:15",
    fits: "Route A (Higashiyama and Gion). Route B only without the torokko and the boat",
  },
  {
    arrive: "After 12:00",
    osaka: "Any Special Rapid, every 15 min",
    tokyo: "Nozomi 10:00 → 12:15 or later",
    fits: "Half a day: Fushimi Inari, then Gion for the evening",
  },
];

type AccessRow = { leg: string; time: string; fare: string; checked: ReactNode };

const accessRows: AccessRow[] = [
  { leg: "Osaka → Kyoto, JR Special Rapid", time: "28–30 min, every 15 min", fare: "¥580", checked: <>{ext(ODEKAKE_URL, "JR West timetable")}, {TODAY}; fare JR West, {JR_FARE}</> },
  { leg: "Tokyo → Kyoto, Nozomi", time: "127–135 min (about 2 h 12 min)", fare: "By date and seat", checked: <>{ext(JRC_URL, "JR Central")}, {TODAY}</> },
  { leg: "Kyoto → Tokyo, last Nozomi", time: "21:38 → 23:45", fare: "By date and seat", checked: <>{ext(JRC_URL, "JR Central")}, {TODAY}</> },
  { leg: "Kansai Airport → Kyoto, HARUKA", time: "Direct, no change", fare: "¥2,700 one-way ticket (visitors)", checked: <>{ext(HARUKA_URL, "westjr.co.jp")}, {TODAY}</> },
];

type CostRow = { route: string; pays: string; total: string };

const costRows: CostRow[] = [
  { route: "Route C — Fushimi Inari + Higashiyama", pays: `JR to Inari, Keihan to Kiyomizu-Gojo, one ${BUS} bus back; Kiyomizu-dera ¥500`, total: "¥730 plus the JR and Keihan fares" },
  { route: "Route A — Higashiyama and Gion", pays: `Two city buses at ${BUS}, Kiyomizu-dera ¥500; Yasaka Shrine free`, total: "About ¥960" },
  { route: "Route B — Arashiyama", pays: "JR to Saga-Arashiyama, Tenryu-ji ¥500, torokko ¥880, Hozugawa boat ¥6,000, Randen ¥250", total: "About ¥7,630 plus the JR fare" },
];

const faqItems = [
  {
    q: "Is one day enough in Kyoto?",
    a: `Enough for one side of the city. Pick one route: Higashiyama (Kiyomizu-dera, Sannenzaka, Yasaka Shrine, Gion), Arashiyama (bamboo grove, Tenryu-ji, Sagano Romantic Train), or Fushimi Inari plus Higashiyama. Kinkaku-ji, Arashiyama and Fushimi Inari sit on different sides of Kyoto, so trying all three in one day spends most of it on buses and trains.`,
  },
  {
    q: "What is the best one-day route in Kyoto?",
    a: "Fushimi Inari at 7:00, then Kiyomizu-dera, Sannenzaka and Gion. Fushimi Inari has no admission and no gate hours, and it is about 5 minutes from Kyoto Station on the JR Nara Line, so an early start beats the crowds. The rest of the day is one downhill walk from Kiyomizu-dera to Gion.",
  },
  {
    q: "How do you get around Kyoto in one day?",
    a: `By train where you can and bus for the last stretch. JR reaches Inari in about 5 minutes and Saga-Arashiyama in about 11. The city bus is a flat ${BUS} (child ¥120). There is no bus-only day pass any more: the ¥700 Bus 1-Day Pass went off sale on 30 September 2023 and could not be used after 31 March 2024. The ${PASS} Subway & Bus 1-Day Pass pays from the fifth ride.`,
  },
  {
    q: "Do I need to book anything in advance in Kyoto?",
    a: "Only the Sagano Romantic Train seat (not running 30 December 2026 to 28 February 2027), a kimono dressing slot and a guided tour if you want one. Kiyomizu-dera, Fushimi Inari, Yasaka Shrine, the bamboo grove and Tenryu-ji need no booking.",
  },
  {
    q: "Can I do a Kyoto day trip from Osaka or Tokyo?",
    a: "Yes. From Osaka the JR Special Rapid takes 28–30 minutes to Kyoto and runs every 15 minutes, for ¥580. From Tokyo the Nozomi takes about 2 hours 12 minutes; on the 28 November 2026 timetable the first one reaches Kyoto at 8:08 and the last one back leaves Kyoto at 21:38.",
  },
];

const TITLE = "One Day in Kyoto: 1 Day Itinerary, 3 Routes & Costs";
const DESCRIPTION =
  "One day in Kyoto: three timed routes (Kiyomizu–Gion, Arashiyama, Fushimi Inari), the ¥230 bus and ¥1,100 day pass, and day trips from Osaka or Tokyo.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/kyoto-3-day-itinerary", title: "Kyoto 3 Day Itinerary" },
  { href: "/guides/transport/kyoto-transportation", title: "Kyoto Transportation: Buses, Subway & Passes" },
  { href: "/guides/attractions/kyoto-day-trip-from-tokyo", title: "Kyoto Day Trip from Tokyo" },
  { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "Kyoto & Nara Day Tours from Osaka" },
  { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto" },
  { href: "/guides/attractions/kyoto-kimono-rental", title: "Kyoto Kimono Rental Prices Compared" },
  { href: "/guides/attractions", title: "More Things to Do in Japan →" },
];

function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map((c, j) => (
                  <td key={j} className={j === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const note = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
const h3 = { fontSize: "1.1rem", marginTop: "1.5rem" } as const;
const stopHead = ["Time", "Where", "Getting there", "Book ahead?"];
const stopRows = (stops: Stop[]) => stops.map((s) => [s.time, s.place, s.move, s.book]);

export default function Kyoto1DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Kyoto 1 Day Itinerary", item: URL },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          {crumbSep}
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          {crumbSep}
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          {crumbSep}
          <span className={styles.breadCurrent}>Kyoto 1 Day Itinerary</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            One Day in Kyoto (2026): <br />Three 1 Day Itineraries, from Osaka or Tokyo
          </h1>
          <p className={styles.heroSubtitle}>
            One side of the city, followed by the clock: Higashiyama and Gion, Arashiyama, or Fushimi Inari first — and
            which of them still fits the train you arrive on.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares & train times, dated", "Arrival-time table for Osaka & Tokyo"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>City bus</p>
                <p className={styles.verdictStatValue}>{BUS} flat; day pass {PASS}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Osaka</p>
                <p className={styles.verdictStatValue}>28–30 min, ¥580</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Tokyo</p>
                <p className={styles.verdictStatValue}>About 2 h 12 min</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>One day in Kyoto</strong> fits one of three routes of about 8:00 to 19:00:{" "}
              <strong>Higashiyama</strong> (Kiyomizu-dera → Sannenzaka → Yasaka Shrine → Gion, all on foot after one{" "}
              {BUS} bus), <strong>Arashiyama</strong> (bamboo grove → Tenryu-ji → Sagano Romantic Train, 11 minutes out
              on the JR Sagano Line), or <strong>Fushimi Inari at 7:00 plus Higashiyama</strong> (5 minutes on the JR Nara
              Line). Kyoto city buses charge a flat <strong>{BUS}</strong> a ride and there has been no bus-only day pass
              since 31 March 2024, so the day ticket is the <strong>{PASS} Subway &amp; Bus 1-Day Pass</strong>, which pays
              from the fifth ride (Kyoto City Transportation Bureau, {TODAY}). From Osaka the JR Special Rapid takes{" "}
              <strong>28–30 minutes</strong>; from Tokyo the Nozomi takes about <strong>2 hours 12 minutes</strong>, and the
              first one reaches Kyoto at 8:08.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              With a night in Kyoto, use the{" "}
              <Link href="/guides/attractions/kyoto-2-day-itinerary">Kyoto 2 day itinerary</Link>; with three, the{" "}
              <Link href="/guides/attractions/kyoto-3-day-itinerary">Kyoto 3 day itinerary</Link>. For the shinkansen
              tickets and tours from Tokyo, see the{" "}
              <Link href="/guides/attractions/kyoto-day-trip-from-tokyo">Kyoto day trip from Tokyo</Link> guide.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kyotoCityFushimiArashiyamaTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Kyoto 1-day guided tour →
              </KlookLink>
              <KlookLink href={kyotoFushimiInariWalkingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Fushimi Inari walking tour →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these before the day"
          heading="What Should You Book for One Day in Kyoto?"
          intro="A guided walk, a kimono slot, the Sagano train day, the JR pass or airport train, and data. Klook prices change by date, so open a listing for the figure on your day."
          items={kyotoOneDayTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Route A</span>
          <h2 className={styles.sectionTitle}>What Is the Best One-Day Route in Kyoto? Higashiyama to Gion</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Route A is the safest single day: one bus to Kiyomizu-dera, then a downhill walk through Sannenzaka,
            Ninenzaka and Maruyama Park into Gion, with nothing to book. Kiyomizu-dera opens at 6:00, so the earlier
            you start, the emptier the lanes. It is also the best day for a kimono, because the walk loops back past the
            same streets before the shop&apos;s return time — our{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental">Kyoto kimono rental</Link> guide compares the shops
            near Kiyomizu-dera and Gion.
          </p>
          <SimpleTable head={stopHead} rows={stopRows(routeA)} />
          <p className={styles.bodyText} style={note}>
            Last checked: 2026-11-28 — Kiyomizu-dera hours on {ext(KIYOMIZU_URL, "kiyomizudera.or.jp")} (6:00–18:00,
            18:30 in July and August; night viewing 21–30 November 2026 with reception to 21:00). Admission ¥500 as read
            on {KIYOMIZU_FEE}; bus routes and fares as in our{" "}
            <Link href="/guides/transport/kyoto-transportation">Kyoto transportation guide</Link> ({ROUTES_READ}). Times
            are a planning guide.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoKimonoAiwafukuKiyomizu.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kiyomizu kimono rental →
            </KlookLink>
            <KlookLink href={kyotoGionNightWalkingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Gion night walk →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={h3}>Route B: Arashiyama bamboo grove, Tenryu-ji and the Sagano train</h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The west side, all reached by JR or the Randen rather than the bus. Be at the bamboo grove by 8:00, then
            Tenryu-ji when its garden opens at 8:30. The one reserved ride is the Sagano Romantic Train, which does not
            run from 30 December 2026 to 28 February 2027; the river boat back down the gorge is covered in our{" "}
            <Link href="/guides/attractions/hozugawa-river-boat-ride">Hozugawa river boat ride</Link> guide (¥6,000
            adult, about 2 hours, no boats 29 December to 4 January).
          </p>
          <SimpleTable head={stopHead} rows={stopRows(routeB)} />
          <p className={styles.bodyText} style={note}>
            Last checked: 2026-11-28 — Tenryu-ji on {ext(TENRYUJI_URL, "tenryuji.com")} (garden 8:30–17:00, last entry
            16:50, ¥500 adult and ¥300 child, buildings ¥300 extra; early opening at 7:30 from 14 to 30 November 2026);
            Hozugawa boat {TODAY}. Sagano fare and closure {SAGANO}, as in our{" "}
            <Link href="/guides/attractions/sagano-romantic-train-tickets">Sagano Romantic Train guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={saganoHozugawaGuaranteedTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Sagano train &amp; river boat day →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={h3}>Route C: Fushimi Inari first, then Higashiyama</h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The route that gets the most famous view before the crowds: the Senbon Torii at 7:00, then the Keihan line
            north to Kiyomizu-Gojo and the second half of Route A. Fushimi Inari charges no admission and has no gate
            hours, so the hour you arrive is the only decision. If you want a guide for the mountain, our{" "}
            <Link href="/guides/attractions/fushimi-inari-tour">Fushimi Inari tour</Link> guide compares the walks.
          </p>
          <SimpleTable head={stopHead} rows={stopRows(routeC)} />
          <p className={styles.bodyText} style={note}>
            Last checked: 2026-11-28 — Kiyomizu-dera hours on {ext(KIYOMIZU_URL, "kiyomizudera.or.jp")}. JR Inari about
            5 minutes from Kyoto Station (JR West) and Keihan fares as in our{" "}
            <Link href="/guides/transport/kyoto-transportation">Kyoto transportation guide</Link> ({ROUTES_READ}).
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Arriving</span>
          <h2 className={styles.sectionTitle}>Which Route Fits a Kyoto Day Trip from Osaka or Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            From Osaka, any of the three: the JR Special Rapid reaches Kyoto in 28–30 minutes, every 15 minutes. From
            Tokyo, Route A or B on the first trains, and Route A only after about 9:30, because the first Nozomi reaches
            Kyoto at 8:08 and the last one back leaves at 21:38.
          </p>
          <SimpleTable
            head={["Arriving in Kyoto", "From Osaka (JR Special Rapid)", "From Tokyo (Nozomi)", "What still fits"]}
            rows={arrivalRows.map((r) => [r.arrive, r.osaka, r.tokyo, r.fits])}
          />
          <h3 className={styles.sectionTitle} style={h3}>How long are the trains to Kyoto?</h3>
          <SimpleTable
            head={["Leg", "Time", "Adult fare", "Checked"]}
            rows={accessRows.map((r) => [r.leg, r.time, r.fare, r.checked])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: 2026-11-28 — {ext(ODEKAKE_URL, "timetable.jr-odekake.net")} (JR West, Osaka station, JR Kyoto
            Line, Saturday 28 November timetable); {ext(JRC_URL, "traininfo.jr-central.co.jp")} (every Tokyo departure on
            the day); {ext(HARUKA_URL, "westjr.co.jp")} (HARUKA). Osaka–Kyoto fare from JR West&apos;s Keihanshin fare
            table, {JR_FARE}. Hankyu from Osaka-umeda reaches Kyoto-kawaramachi in about 43 minutes on its own timetable ({ROUTES_READ}),
            if you would rather arrive at Shijo.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Would rather not route it yourself? A guided day from Osaka takes in Kyoto and Nara together — our{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka">Kyoto and Nara day tour from Osaka</Link>{" "}
            guide compares them, and the <Link href="/guides/attractions/nara-day-trip">Nara day trip</Link> guide covers
            the deer park on its own.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoNaraArashiyamaTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kyoto &amp; Nara tour from Osaka →
            </KlookLink>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo → Kyoto shinkansen →
            </KlookLink>
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              HARUKA from Kansai Airport →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>How Do You Get Around Kyoto in One Day?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Train for the long part, bus or walking for the last stretch. A single route on this page uses two to four
            bus rides, so pay per ride with an IC card; the {PASS} pass only pays from the fifth ride.
          </p>
          <SimpleTable
            head={["Route", "What you pay for", "Adult total"]}
            rows={costRows.map((r) => [r.route, r.pays, r.total])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: 2026-11-28 — Subway &amp; Bus 1-Day Pass {PASS} (child ¥550) on{" "}
            {ext(PASS_URL, "city.kyoto.lg.jp")}; the old ¥700 Bus 1-Day Pass sold until 30 September 2023 and valid until
            31 March 2024 on {ext(OLD_PASS_URL, "city.kyoto.lg.jp")}. City bus {BUS} (child ¥120), subway ¥220–¥360 and
            Randen ¥250 as in our Kyoto transportation guide ({TRANSPORT}). JR fares inside Kyoto are not printed: no
            official fare table could be read.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Is there still a Kyoto bus day pass?</h3>
          <p className={styles.bodyText}>
            Not a bus-only one. Kyoto City stopped selling the ¥700 Bus 1-Day Pass on 30 September 2023, and it could not
            be used after 31 March 2024. The day ticket that covers city buses now is the {PASS} Subway &amp; Bus 1-Day
            Pass (¥550 for children); four {BUS} rides come to ¥920 and five to ¥1,150, so it pays from the fifth. It also
            takes Nijo Castle admission down by ¥100 — Nijo Castle is {NIJO.adult} ({NIJO_CHECKED}) and fits Route A as an
            afternoon swap; see our <Link href="/guides/attractions/nijo-castle-tickets">Nijo Castle tickets</Link>{" "}
            guide. The full break-even is in the{" "}
            <Link href="/guides/transport/kyoto-subway-bus-pass">Kyoto Subway &amp; Bus Pass guide</Link>.
          </p>
          <p className={styles.bodyText}>
            If you are coming in from Kansai Airport or adding Osaka or Nara, the WEST QR Kansai Area Pass is ¥2,700 for 1
            day, ¥4,700 for 2 and ¥5,500 for 3 ({ext(KANSAI_PASS_URL, "westjr.co.jp")}, {TODAY}); it covers JR and the
            HARUKA but not the city buses or subway. Our{" "}
            <Link href="/guides/attractions/kansai-area-pass">Kansai Area Pass guide</Link> works out when it pays.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do I Need to Book Anything in Advance in Kyoto?</h2>
          <p className={styles.bodyText}>
            Only three things, and none of them is a temple. The Sagano Romantic Train is a reserved car and seat at
            ¥880 one way, and it does not run from 30 December 2026 to 28 February 2027 (from 1 March 2027 a seat costs
            ¥1,500). A kimono dressing slot is an appointment. A guided walk is optional: Fushimi Inari in the morning or
            Gion in the evening. Kiyomizu-dera, Fushimi Inari, Yasaka Shrine, the bamboo grove and Tenryu-ji are all
            walk-up. Nijo Castle sells at the gate as well; only its Honmaru Palace is by reservation.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={saganoRomanticTrainTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Sagano Romantic Train ticket →
            </KlookLink>
            <KlookLink href={nijoCastleTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nijo Castle ticket →
            </KlookLink>
            <KlookLink href={kyotoSubwayBusTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Subway &amp; Bus 1-Day Pass →
            </KlookLink>
          </div>
        </section>

        <KlookSameDayCards heading="Book on the same day as the ticket" cards={kyotoOneDaySameDayCards} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Length</span>
          <h2 className={styles.sectionTitle}>Is One Day Enough in Kyoto?</h2>
          <p className={styles.bodyText}>
            Enough for one side of the city. Kiyomizu-dera and Gion are east, Arashiyama west, Fushimi Inari south and
            Kinkaku-ji north-west, and each route on this page keeps to one or two of them. A second day adds Arashiyama
            or Kinkaku-ji without rushing — the <Link href="/guides/attractions/kyoto-2-day-itinerary">2 days in Kyoto</Link>{" "}
            plan pairs them that way. For the full list of sights, see{" "}
            <Link href="/guides/attractions/things-to-do-kyoto">things to do in Kyoto</Link>.
          </p>
        </section>

        <BookingEsimCard lead="Bus stops, the Keihan transfer and the train back to Osaka or Tokyo — get mobile data before you land." />

        <KlookTourPicks
          heading="Guided Options for One Day in Kyoto"
          intro="A full-day city tour, a Fushimi Inari walk, a Gion night walk and a Kyoto-and-Nara day from Osaka. Klook prices and running dates change by date, so open a listing for your day."
          tours={[kyotoHighlightBusTour, kyotoFushimiInariWalkingTour, kyotoGionNightWalkingTour, kyotoNaraArashiyamaTour]}
        />

        <EsimCtaBottom />

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

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
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

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>One side of Kyoto, one day</h2>
            <p className={styles.ctaBannerDesc}>
              Pick the route that fits your arrival train, then book only the Sagano seat or the guide you want.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kyotoCityFushimiArashiyamaTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Kyoto day tour →
              </KlookLink>
              <KlookLink href={kyotoKimonoAiwafukuKiyomizu.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Kimono rental →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
