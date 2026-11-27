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
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  hanedaLimousineBus,
  keiseiSkylinerUrl,
  shibuyaSkyTicketUrl,
  shinjukuNightFoodWalkingTour,
  skytreeTicket,
  teamlabPlanetsTicketUrl,
  tokyoHotelAirportLuggageDelivery,
  tokyoOneDaySameDayCards,
  tokyoOneDayTripPrep,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  tsukijiStreetFoodTour,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * One day in Tokyo, added 27 Nov 2026 (task-jtk-20261127-01, re-run of 20261125-01).
 *
 * Next to its neighbours:
 *  - tokyo-2-day-itinerary is two days, or a layover with one night in the city;
 *  - tokyo-3/4/5/7-day add days and day trips;
 *  - this page is one day only: a free day on a business trip, or a same-day layover
 *    at Narita or Haneda, with three self-contained routes and the layover maths.
 *
 * Official reads on 27 Nov 2026:
 *   tokyometro.jp/en/ticket/value/travel  Tokyo Subway 24-hour Ticket ¥1,000 adult / ¥500 child
 *                                         (48 h ¥1,500, 72 h ¥2,000); all Tokyo Metro and Toei lines
 *   tokyometro.jp/en/ticket/regular       IC fares ¥178 / ¥209 / ¥252 / ¥293 / ¥324 by distance
 *   meijijingu.or.jp/en/visit             free; November 6:10–16:10, December 6:40–16:00
 *   keisei.co.jp (Skyliner coupon page)   ¥2,580 one-way, ¥2,310 online discount; 36 min to Nippori
 *                                         (fastest), 41 min to Keisei-Ueno on the English top page
 *   limousinebus.co.jp/en/line/detail     Haneda–Tokyo Station ¥1,200, Narita–Tokyo Station ¥3,100
 *   tsukiji.or.jp/english                 professional buyers have priority until 9:00; visitors
 *                                         asked to refrain from sightseeing and group tours in December
 * Carried with their own dates: Senso-ji hours (senso-ji.jp, 9 Nov), Keikyu Haneda T3 →
 * Shinagawa ¥330 / 11 min and → Asakusa 34 min (Keikyu, 25 Oct, via tokyo-airport-transfer),
 * limousine bus timetable times (17 Nov), N'EX (JR East, 3 Nov), deck prices from
 * lib/attraction-prices.ts.
 *
 * Not printed: a minimum layover time (no official source gives one), the Yurikamome fare,
 * and any Klook price. "In the city" hours in the layover table are planning allowances.
 * No Klook ad id: spare was empty on 27 Nov, so links use ?aid=119070.
 */

const ROUTE = "/guides/attractions/tokyo-1-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const TODAY = checkedLabel("2026-11-27");
const SENSOJI = checkedLabel("2026-11-09");
const KEIKYU = checkedLabel("2026-10-25");
const BUS_TIMES = checkedLabel("2026-11-17");
const NEX = checkedLabel("2026-11-03");
const SKY = checkedLabel(PRICES.shibuyaSky.checked);
const SKYTREE = checkedLabel(PRICES.tokyoSkytree.checked);
const DECKS = checkedLabel(PRICES.tokyoTower.checked);

const PASS_24 = "¥1,000";

const SUBWAY_URL = "https://www.tokyometro.jp/en/ticket/value/travel/index.html";
const METRO_FARES_URL = "https://www.tokyometro.jp/en/ticket/regular/index.html";
const MEIJI_URL = "https://www.meijijingu.or.jp/en/visit/";
const SENSOJI_URL = "https://www.senso-ji.jp/about/";
const TSUKIJI_URL = "https://www.tsukiji.or.jp/english/";
const SKYLINER_URL = "https://www.keisei.co.jp/keisei/tetudou/skyliner/us/tickets/coupon.php";
const KEIKYU_URL = "https://www.keikyu.co.jp/ride/ticket/";
const LIMO_HND_URL = "https://www.limousinebus.co.jp/en/line/detail/Haneda-Tokyo/";
const LIMO_NRT_URL = "https://www.limousinebus.co.jp/en/line/detail/Narita-Tokyo/";

const K = ({ href, children }: { href: string; children: ReactNode }) => (
  <KlookLink href={href} target="_blank" rel="sponsored nofollow noopener">{children}</KlookLink>
);
const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type Stop = { time: string; place: string; move: string; book: string };

const routeA: Stop[] = [
  { time: "8:00", place: "Senso-ji and Nakamise-dori, Asakusa", move: "Ginza Line or Toei Asakusa Line to Asakusa", book: "No. The main hall opens 6:30 October–March, 6:00 otherwise" },
  { time: "10:00", place: `TOKYO SKYTREE Floor 350 (${PRICES.tokyoSkytree.adult}), lunch in Solamachi below`, move: "Toei Asakusa Line, two stops to Oshiage", book: "Advised: the same-day counter adds ¥500 per ticket" },
  { time: "13:30", place: "Ueno Park and the Ameyoko market street", move: "Back to Asakusa, then the Ginza Line to Ueno", book: "No" },
  { time: "16:00", place: "Akihabara", move: "Hibiya Line, Naka-okachimachi → Akihabara, one stop", book: "No" },
  { time: "18:30", place: `Tokyo Tower Main Deck, lit up (${PRICES.tokyoTower.adult}, open to 23:00)`, move: "Hibiya Line, Akihabara → Kamiyacho, no change", book: "No. The Main Deck costs the same at the door" },
];

const routeB: Stop[] = [
  { time: "8:00", place: "Meiji Jingu (free; 6:10–16:10 in November, 6:40–16:00 in December)", move: "Chiyoda or Fukutoshin Line to Meiji-jingumae", book: "No" },
  { time: "10:00", place: "Takeshita Street and Omotesando, Harajuku", move: "On foot from the shrine gate", book: "No" },
  { time: "12:00", place: "Shibuya Scramble Crossing, Hachiko, lunch", move: "Fukutoshin Line, one stop to Shibuya", book: "No" },
  { time: "14:00", place: "Tokyo Metropolitan Government Building decks, Shinjuku (free)", move: "Fukutoshin Line to Shinjuku-sanchome, then Toei Oedo Line to Tochomae", book: "No ticket; check which deck is open the day before" },
  { time: "16:00", place: `SHIBUYA SKY at sunset (${PRICES.shibuyaSky.adult} online, before / from 15:00)`, move: "Back to Shibuya; the entrance is in the station building", book: "Yes — the sunset slots sell out; dates open 00:00 JST two weeks ahead" },
  { time: "18:30", place: "Shinjuku after dark: Omoide Yokocho, Kabukicho, Golden Gai", move: "Fukutoshin Line to Shinjuku-sanchome", book: "No, unless you want a guided food walk" },
];

const routeC: Stop[] = [
  { time: "9:00", place: "Tsukiji Outer Market: breakfast stalls and tamagoyaki", move: "Hibiya Line to Tsukiji, or Toei Oedo Line to Tsukijishijo", book: "No. Professional buyers have priority until 9:00" },
  { time: "11:00", place: "Ginza: Chuo-dori and the department-store food halls", move: "On foot, about 15 minutes, or Hibiya Line one stop to Higashi-ginza", book: "No" },
  { time: "13:30", place: `teamLab Planets TOKYO, Toyosu (${PRICES.teamlabPlanets.adult})`, move: "Yurakucho Line, Ginza-itchome → Toyosu", book: "Required: a 30-minute entry slot, nothing sold on site" },
  { time: "16:00", place: "Odaiba: the seaside park and the Rainbow Bridge at dusk", move: "Yurikamome from Toyosu (separate fare, not on the subway ticket)", book: "No" },
  { time: "18:30", place: "Back across the bay for dinner in Shimbashi or Ginza", move: "Yurikamome to Shimbashi", book: "No" },
];

type LayoverRow = { layover: string; haneda: string; narita: string };

const layoverRows: LayoverRow[] = [
  {
    layover: "Under 6 hours",
    haneda: "Stay at the airport. After entry formalities and the trip back, the time in the city is under 1.5 hours",
    narita: "Stay at the airport",
  },
  {
    layover: "6 hours",
    haneda: "Yes, one stop: about 1.5–2 hours in Asakusa (Senso-ji) on the Keikyu through train, 34 min from Terminal 3",
    narita: "Not worth it: about 1 hour in Ueno after two Skyliner rides of 41 min",
  },
  {
    layover: "8 hours",
    haneda: "Yes: about 3.5 hours — Asakusa and Skytree, or Shibuya Crossing and Shibuya Sky",
    narita: "Yes, tight: about 3 hours on the Asakusa side (Senso-ji, then Ueno), by Skyliner",
  },
  {
    layover: "10 hours or more",
    haneda: "Yes: about 5.5 hours — Route A or Route B, cut at the 15:00 stop",
    narita: "Yes: about 5 hours — the first half of Route A from Keisei-Ueno",
  },
];

type AccessRow = { leg: string; time: string; fare: string; checked: ReactNode };

const accessRows: AccessRow[] = [
  { leg: "Haneda T3 → Shinagawa, Keikyu Airport Line", time: "11 min", fare: "¥330", checked: <>{ext(KEIKYU_URL, "keikyu.co.jp")}, {KEIKYU}</> },
  { leg: "Haneda T3 → Asakusa, Keikyu through train", time: "34 min, no change", fare: "See Keikyu's fare search", checked: <>Keikyu, {KEIKYU}</> },
  { leg: "Haneda → Tokyo Station, Airport Limousine Bus", time: "About 40 min on the timetable", fare: "¥1,200", checked: <>{ext(LIMO_HND_URL, "limousinebus.co.jp")}, fare {TODAY}; time {BUS_TIMES}</> },
  { leg: "Narita T2·3 → Keisei-Ueno, Keisei Skyliner", time: "41 min (36 min to Nippori)", fare: "¥2,580; ¥2,310 discount ticket online", checked: <>{ext(SKYLINER_URL, "keisei.co.jp")}, {TODAY}</> },
  { leg: "Narita → Tokyo Station, Narita Express (N'EX)", time: "From 53 min", fare: "¥3,140", checked: <>JR East, {NEX}</> },
  { leg: "Narita → Tokyo Station, Airport Limousine Bus", time: "1 h 40 min on the timetable", fare: "¥3,100", checked: <>{ext(LIMO_NRT_URL, "limousinebus.co.jp")}, fare {TODAY}; time {BUS_TIMES}</> },
];

type CostRow = { route: string; tickets: string; total: string };

const costRows: CostRow[] = [
  { route: "Route A — Asakusa → Skytree → Tokyo Tower", tickets: `Subway ${PASS_24} + Skytree ${PRICES.tokyoSkytree.adult} + Tokyo Tower ${PRICES.tokyoTower.adult}`, total: "From ¥4,300" },
  { route: "Route B — Meiji Jingu → Shibuya → Shinjuku", tickets: `Subway ${PASS_24} + SHIBUYA SKY ¥3,400 (entry from 15:00); Meiji Jingu and the Shinjuku decks are free`, total: "¥4,400" },
  { route: "Route C — Tsukiji → Ginza → Toyosu → Odaiba", tickets: `Subway ${PASS_24} + teamLab Planets ${PRICES.teamlabPlanets.adult} + Yurikamome fares`, total: "From ¥4,800 plus the Yurikamome" },
];

const faqItems = [
  {
    q: "Is one day enough in Tokyo?",
    a: `Enough for one side of the city, not for all of it. Pick one route: Asakusa and Skytree (old Tokyo), Harajuku, Shibuya and Shinjuku (the west side), or Tsukiji, Ginza and Odaiba (the bay). Each runs about 8:00 to 20:00 on the subway, and a 24-hour Tokyo Subway Ticket at ${PASS_24} covers every subway leg. Mixing two sides costs an hour or more on trains.`,
  },
  {
    q: "What can I do in Tokyo on a layover?",
    a: `From Haneda, the Keikyu line reaches Shinagawa in 11 minutes and Asakusa in 34 minutes from Terminal 3, so a 6-hour layover leaves about 1.5–2 hours in Asakusa and 8 hours leaves about 3.5. From Narita, the Skyliner takes 41 minutes to Keisei-Ueno, so allow 8 hours or more. You go through immigration to leave the airport, and no official source gives a minimum layover time.`,
  },
  {
    q: "How much does one day in Tokyo cost?",
    a: `About ¥4,300 to ¥4,800 in transport and tickets before food: the ${PASS_24} 24-hour subway ticket plus one or two paid decks (Skytree ${PRICES.tokyoSkytree.adult}, Tokyo Tower ${PRICES.tokyoTower.adult}, SHIBUYA SKY ${PRICES.shibuyaSky.adult}). Add the airport train on a layover: ¥330 to Shinagawa from Haneda, or ¥2,580 each way on the Skyliner from Narita.`,
  },
  {
    q: "Do I need to book anything in advance for one day in Tokyo?",
    a: "Only the timed tickets: a SHIBUYA SKY sunset slot (dates open at 00:00 Japan time two weeks ahead) and teamLab Planets (30-minute slots, nothing sold on site). Skytree is ¥500 cheaper booked ahead. Senso-ji, Meiji Jingu, Tsukiji and the Shinjuku decks need no booking.",
  },
  {
    q: "Is the Tokyo Subway Ticket worth it for one day?",
    a: `Usually. The 24-hour ticket is ${PASS_24} and Tokyo Metro IC fares run ¥178 to ¥324 a ride, so it pays at about five or six rides; each route on this page uses five to seven. It covers Tokyo Metro and Toei lines only — not JR, the Yamanote Line or the Yurikamome.`,
  },
];

const TITLE = "One Day in Tokyo: 1 Day Itinerary, 3 Routes & Layover";
const DESCRIPTION =
  "One day in Tokyo: three 1 day itinerary routes with times (Asakusa, Shibuya–Shinjuku, Tsukiji–Odaiba), the ¥1,000 subway pass and 6–10 hour layover plans.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/tokyo-2-day-itinerary", title: "Tokyo 2 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/tokyo-3-day-itinerary", title: "Tokyo 3 Day Itinerary" },
  { href: "/guides/transport/tokyo-airport-transfer", title: "Tokyo Airport Transfer: Narita & Haneda to the City" },
  { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket: Price & Is It Worth It?" },
  { href: "/guides/transport/japan-luggage-delivery", title: "Japan Luggage Delivery: Takkyubin Prices & Deadlines" },
  { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo" },
  { href: "/guides/attractions/tokyo-observation-decks", title: "Tokyo Observation Decks Compared" },
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

export default function Tokyo1DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Tokyo 1 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Tokyo 1 Day Itinerary</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            One Day in Tokyo (2026): <br />Three 1 Day Itineraries and a Layover Plan
          </h1>
          <p className={styles.heroSubtitle}>
            A free day on a business trip or a long gap between flights: pick one side of the city, follow the times,
            and book only the one slot that sells out.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares & hours, dated", "Narita & Haneda layover table"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Each route</p>
                <p className={styles.verdictStatValue}>About 8:00–20:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting around</p>
                <p className={styles.verdictStatValue}>Subway 24 h, {PASS_24}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Layover minimum</p>
                <p className={styles.verdictStatValue}>6 h Haneda, 8 h Narita</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>One day in Tokyo</strong> fits one of three routes, each about 12 hours from 8:00 to 20:00:{" "}
              <strong>Asakusa → Skytree → Ueno → Tokyo Tower</strong>, <strong>Meiji Jingu → Harajuku → Shibuya → Shinjuku</strong>,
              or <strong>Tsukiji → Ginza → Toyosu → Odaiba</strong>. The <strong>24-hour Tokyo Subway Ticket costs {PASS_24}</strong>{" "}
              for an adult and covers every Tokyo Metro and Toei leg of each route (tokyometro.jp, {TODAY}); tickets
              take the day to about ¥4,300–¥4,800 before food. On a layover, Haneda gives you a city stop from about{" "}
              <strong>6 hours</strong> (Keikyu, 34 minutes to Asakusa) and Narita from about <strong>8 hours</strong>{" "}
              (Skyliner, 41 minutes to Keisei-Ueno).
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              With a night in the city as well, use the{" "}
              <Link href="/guides/attractions/tokyo-2-day-itinerary">Tokyo 2 day itinerary</Link>; with three days, the{" "}
              <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Tokyo Subway Ticket 24 h →
              </KlookLink>
              <KlookLink href={tokyoSightseeingBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Tokyo 1-day bus tour →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these before the day"
          heading="What Should You Book for One Day in Tokyo?"
          intro="The subway pass, the airport leg, a guided day if you want one, luggage and data. Klook prices change by date, so open a listing for the figure on your day."
          items={tokyoOneDayTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Route A</span>
          <h2 className={styles.sectionTitle}>What Is the Best One-Day Route in Tokyo? Asakusa to Skytree</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Route A is the safest first day: old Tokyo in the morning, the tallest deck at midday and Tokyo Tower lit up
            at night, all on the Ginza, Toei Asakusa and Hibiya lines. Only Skytree is worth booking.
          </p>
          <SimpleTable head={stopHead} rows={stopRows(routeA)} />
          <p className={styles.bodyText} style={note}>
            Last checked: Senso-ji hours {SENSOJI} on {ext(SENSOJI_URL, "senso-ji.jp")}; Skytree {SKYTREE} and Tokyo
            Tower {DECKS} on the operators&apos; sites, as in our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices">attraction price table</Link>. Times are a
            planning guide.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Skytree ticket →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={h3}>Route B: Meiji Jingu, Harajuku, Shibuya and Shinjuku</h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The west side, almost all on the Fukutoshin Line. The fixed point is the SHIBUYA SKY sunset slot: book it
            first and fit the afternoon around it.
          </p>
          <SimpleTable head={stopHead} rows={stopRows(routeB)} />
          <p className={styles.bodyText} style={note}>
            Last checked: Meiji Jingu {TODAY} on {ext(MEIJI_URL, "meijijingu.or.jp")}; SHIBUYA SKY {SKY} (
            {PRICES.shibuyaSky.source}). Facilities inside the shrine keep shorter hours, mainly 9:00–16:00.
          </p>

          <h3 className={styles.sectionTitle} style={h3}>Route C: Tsukiji, Ginza, Toyosu and Odaiba</h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The bay side, for a food morning and a waterfront evening. The Tsukiji Outer Market asks visitors to
            refrain from sightseeing and group tours in December, when New Year shoppers fill it, so in December take
            Route A or B instead.
          </p>
          <SimpleTable head={stopHead} rows={stopRows(routeC)} />
          <p className={styles.bodyText} style={note}>
            Last checked {TODAY}: {ext(TSUKIJI_URL, "tsukiji.or.jp")} (buyer priority until 9:00, the December notice);
            teamLab Planets {DECKS} on the official ticket store. The Yurikamome is a separate company and is not on the
            Tokyo Subway Ticket.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tsukijiStreetFoodTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tsukiji food tour →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Layover</span>
          <h2 className={styles.sectionTitle}>What Can I Do in Tokyo on a Layover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            With 6 hours at Haneda, one stop such as Senso-ji; with 8 hours at Narita, the Asakusa side. Leaving the
            airport means going through immigration, so you need to be able to enter Japan on your passport. No
            official source gives a minimum layover time; the hours below allow about 1 hour for arrival formalities
            and 2 hours back at the airport before departure, as a planning allowance — check your airline&apos;s
            check-in deadline.
          </p>
          <SimpleTable
            head={["Layover", "Haneda (HND)", "Narita (NRT)"]}
            rows={layoverRows.map((r) => [r.layover, r.haneda, r.narita])}
          />
          <h3 className={styles.sectionTitle} style={h3}>How do you get from the airport to the city?</h3>
          <SimpleTable
            head={["Leg", "Time", "Adult fare", "Checked"]}
            rows={accessRows.map((r) => [r.leg, r.time, r.fare, r.checked])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {TODAY}: {ext(SKYLINER_URL, "keisei.co.jp")} (Skyliner),{" "}
            {ext(LIMO_HND_URL, "limousinebus.co.jp")} (bus fares). Keikyu {KEIKYU}, timetable times {BUS_TIMES} and
            N&apos;EX {NEX}, as in our <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link>.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Bags are the other limit. If your luggage is not checked through, leave it in an airport locker or send it
            to your hotel; the <Link href="/guides/transport/japan-luggage-delivery">Japan luggage delivery guide</Link>{" "}
            has the counters, prices and same-day cut-off times.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={keiseiSkylinerUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Keisei Skyliner (Narita) →
            </KlookLink>
            <KlookLink href={hanedaLimousineBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Haneda limousine bus →
            </KlookLink>
            <KlookLink href={tokyoHotelAirportLuggageDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Luggage delivery →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>How Much Does One Day in Tokyo Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About ¥4,300 to ¥4,800 per adult in transport and tickets, before food: the {PASS_24} subway ticket plus one
            or two paid decks. The airport leg comes on top on a layover.
          </p>
          <SimpleTable
            head={["Route", "What you pay for", "Adult total"]}
            rows={costRows.map((r) => [r.route, r.tickets, r.total])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {TODAY}: Tokyo Subway Ticket on {ext(SUBWAY_URL, "tokyometro.jp")} (24 h {PASS_24}, child ¥500).
            Deck prices with their own dates in our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices">attraction price table</Link>. SHIBUYA SKY is{" "}
            ¥2,700 for entry before 15:00.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Is the 24-hour subway ticket worth it for one day?</h3>
          <p className={styles.bodyText}>
            Usually. Tokyo Metro IC fares are ¥178 to ¥324 a ride by distance ({ext(METRO_FARES_URL, "tokyometro.jp")},{" "}
            {TODAY}), so {PASS_24} pays at about five or six rides, and each route here uses five to seven. The 24 hours
            run from your first ride, so a layover that starts at 14:00 can use it into the next morning. It does not
            cover JR, including the Yamanote Line, or the Yurikamome. The{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket guide</Link> has the full break-even.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do I Need to Book Anything in Advance?</h2>
          <p className={styles.bodyText}>
            Only the timed tickets. SHIBUYA SKY sells each date from 00:00 Japan time two weeks ahead, and only the
            sunset slots sell out; teamLab Planets sells 30-minute slots and nothing on site; Skytree is ¥500 cheaper
            per ticket booked ahead. Senso-ji, Meiji Jingu, Tsukiji, the Shinjuku decks and the Tokyo Tower Main Deck
            need no booking.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              SHIBUYA SKY →
            </KlookLink>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              teamLab Planets →
            </KlookLink>
            <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Skytree →
            </KlookLink>
          </div>
        </section>

        <KlookSameDayCards heading="Book on the same day as the deck" cards={tokyoOneDaySameDayCards} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Length</span>
          <h2 className={styles.sectionTitle}>Is One Day Enough in Tokyo?</h2>
          <p className={styles.bodyText}>
            Enough for one side of the city. Each route stays within a few subway lines; trying to do Asakusa and
            Shinjuku and Odaiba on one day spends an hour or more on trains and leaves each place at a run. If you can
            add a night, the <Link href="/guides/attractions/tokyo-2-day-itinerary">2 days in Tokyo</Link> plan does the
            west side and the east side on separate days. For the full list of sights to choose from, see{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo</Link>, and for the trip budget
            beyond one day, the <Link href="/guides/money/tokyo-trip-cost">Tokyo trip cost</Link> guide.
          </p>
        </section>

        <BookingEsimCard lead="Timed QR tickets, subway routes and the train back to the airport — get mobile data before you land." />

        <KlookTourPicks
          heading="Guided Options for One Day in Tokyo"
          intro="A full-day coach loop, a Tsukiji food morning and a Shinjuku food evening. Klook prices and running dates change by date, so open a listing for your day."
          tours={[tokyoSightseeingBusTour, tsukijiStreetFoodTour, shinjukuNightFoodWalkingTour]}
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
            <h2 className={styles.ctaBannerTitle}>One side of Tokyo, one day</h2>
            <p className={styles.ctaBannerDesc}>
              Get the 24-hour subway ticket and the airport leg first, then the one timed slot your route needs.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Tokyo Subway Ticket →
              </KlookLink>
              <KlookLink href={keiseiSkylinerUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Skyliner →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
