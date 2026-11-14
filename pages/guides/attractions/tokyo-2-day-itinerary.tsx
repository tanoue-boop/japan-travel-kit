import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  hanedaLimousineBus,
  keiseiSkylinerUrl,
  klookEsim,
  shibuyaSkyTicketUrl,
  shinjukuNightFoodWalkingTour,
  skytreeTicket,
  teamlabPlanetsTicketUrl,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  tokyoTowerTicket,
  tokyoTwoDayStayAreas,
  tokyoTwoDayTripPrep,
  tsukijiStreetFoodTour,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Two days in Tokyo, written as a routing-and-booking plan. Added 9 Nov 2026
 * (task-jtk-20261109-01).
 *
 * Next to its neighbours:
 *  - tokyo-3-day-itinerary adds a third, central day (Imperial Palace, Ginza, Tokyo Tower);
 *  - tokyo-5-day-itinerary adds Kawaguchiko and Kamakura;
 *  - this page answers "two days only, or a long layover: which half of the city on
 *    which day, which pass, where to sleep, and what to book".
 *
 * Official reads on 9 Nov 2026:
 *   tokyometro.jp/en/ticket/value/travel  Tokyo Subway Ticket ¥1,000 / ¥1,500 / ¥2,000 adult,
 *                                         ¥500 / ¥750 / ¥1,000 child; all Tokyo Metro and Toei
 *                                         Subway lines; valid from the travel starting time;
 *                                         for overseas visitors and residents outside the
 *                                         eight listed prefectures
 *   tokyometro.jp/en/ticket/regular       Tokyo Metro adult fares, IC ¥178 / ¥209 / ¥252 /
 *                                         ¥293 / ¥324 (ticket ¥180–¥330) by distance band
 *   meijijingu.or.jp/en/visit             free; November 6:10–16:10, December 6:40–16:00
 *   senso-ji.jp/about                     main hall 6:00–17:00, opening 6:30 October–March
 * Carried with their own dates from lib/attraction-prices.ts: SHIBUYA SKY (28 Oct), Tokyo
 * Skytree, Tokyo Tower, teamLab Planets and the Metropolitan Government Building decks
 * (6 Nov). Airport times and fares from the operators, as dated on tokyo-airport-transfer
 * (25 Oct).
 *
 * Not printed: Toei Subway's single fares (no current official table could be read), any
 * minimum layover time, and any Klook price. "Time to allow" is a planning allowance.
 */

const ROUTE = "/guides/attractions/tokyo-2-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-09");
const AIRPORT = checkedLabel("2026-10-25");
const DECKS = checkedLabel("2026-11-06");
const SKY = checkedLabel(PRICES.shibuyaSky.checked);

const PASS_48 = "¥1,500";
const PASS_48_CHILD = "¥750";

type Stop = {
  time: string;
  place: string;
  /** Planning allowance, not an operator figure. */
  allow: string;
  getting: string;
  booking: string;
};

const day1: Stop[] = [
  {
    time: "Morning",
    place: "Meiji Jingu, then Takeshita Street and Omotesando in Harajuku",
    allow: "2–2.5 hours",
    getting: "Chiyoda or Fukutoshin Line to Meiji-jingumae, or JR to Harajuku",
    booking: "No. The shrine is free and opens at sunrise (6:10 in November)",
  },
  {
    time: "Midday",
    place: "Shibuya Scramble Crossing, Hachiko and lunch around Shibuya",
    allow: "1.5 hours",
    getting: "Fukutoshin Line, one stop from Meiji-jingumae, or about 20 minutes on foot",
    booking: "No",
  },
  {
    time: "Afternoon",
    place: "Shinjuku: the free Tokyo Metropolitan Government Building decks",
    allow: "1–1.5 hours",
    getting: "Fukutoshin Line to Shinjuku-sanchome, then Toei Oedo Line to Tochomae",
    booking: "No ticket of any kind; which deck is open varies, so check the day before",
  },
  {
    time: "Late afternoon / sunset",
    place: "SHIBUYA SKY, on top of Shibuya Scramble Square",
    allow: "1–1.5 hours",
    getting: "Back to Shibuya on the Fukutoshin Line; the entrance is in the station building",
    booking: "Yes. A date and time slot, and the sunset slots are the ones that sell out",
  },
  {
    time: "Evening",
    place: "Shinjuku after dark: Omoide Yokocho, Kabukicho and Golden Gai",
    allow: "2–3 hours",
    getting: "Fukutoshin Line to Shinjuku-sanchome",
    booking: "No, unless you want a guided food walk",
  },
];

const day2: Stop[] = [
  {
    time: "Early morning",
    place: "Senso-ji and Nakamise-dori, Asakusa",
    allow: "1.5 hours",
    getting: "Ginza Line or Toei Asakusa Line to Asakusa",
    booking: "No. The main hall opens at 6:30 from October to March, 6:00 otherwise",
  },
  {
    time: "Late morning",
    place: "TOKYO SKYTREE, Floor 350",
    allow: "1.5–2 hours with Solamachi below",
    getting: "Toei Asakusa Line, two stops to Oshiage, or about 20 minutes on foot",
    booking: "Advised. The same-day counter adds a ¥500 service fee per ticket",
  },
  {
    time: "Lunch",
    place: "Tsukiji Outer Market, or Ueno Park and Ameyoko if you are staying in Ueno",
    allow: "1.5 hours",
    getting: "Toei Asakusa Line to Higashi-ginza, then Hibiya Line one stop to Tsukiji",
    booking: "No. Most stalls wind down by mid-afternoon, so go before 14:00",
  },
  {
    time: "Afternoon",
    place: "teamLab Planets TOKYO, Toyosu (optional)",
    allow: "2 hours, including the entry queue",
    getting: "Yurakucho Line to Toyosu, or Yurikamome to Shin-Toyosu",
    booking: "Required. A 30-minute entry slot, and nothing is sold on site",
  },
  {
    time: "Evening",
    place: "Tokyo Tower Main Deck, lit up after dark",
    allow: "1 hour",
    getting: "Hibiya Line to Kamiyacho, or Toei Oedo Line to Akabanebashi",
    booking: "Not needed for the Main Deck, which is open to 23:00",
  },
];

const layoverRows: Stop[] = [
  {
    time: "Arrival evening (Haneda)",
    place: "Keikyu to Shinagawa, then the city: Shibuya Crossing and Shinjuku after dark",
    allow: "3–4 hours",
    getting: "Keikyu Airport Line, 11 minutes to Shinagawa from Terminal 3",
    booking: "No; a Shinjuku food walk if you want a guide for the evening",
  },
  {
    time: "Arrival evening (Narita)",
    place: "Skyliner to Ueno, then Asakusa: Senso-ji grounds and the Sumida riverside",
    allow: "3 hours",
    getting: "Keisei Skyliner, 41 minutes to Keisei-Ueno",
    booking: "The Skyliner seat can be bought before you fly",
  },
  {
    time: "Next morning",
    place: "Senso-ji at opening, or Meiji Jingu at sunrise",
    allow: "1.5 hours",
    getting: "Subway from your hotel",
    booking: "No",
  },
  {
    time: "Late morning",
    place: "One deck: SHIBUYA SKY from 10:00, or Skytree next to Asakusa",
    allow: "1–1.5 hours",
    getting: "Subway",
    booking: "Book the slot before you land",
  },
  {
    time: "Back to the airport",
    place: "Haneda from Asakusa is 34 minutes on the Keikyu through train (to Terminal 3)",
    allow: "Leave the city with the airline's check-in deadline in mind",
    getting: "Keikyu / Toei Asakusa Line, or the Skyliner from Keisei-Ueno to Narita",
    booking: "No",
  },
];

const ticketRows = [
  {
    stop: "Tokyo Subway Ticket, 48 hours (both days)",
    price: `${PASS_48} adult, ${PASS_48_CHILD} child (24 h ¥1,000, 72 h ¥2,000)`,
    hours: "48 hours from the time you start travelling",
    note: "All Tokyo Metro and Toei Subway lines. Not valid on JR, including the Yamanote Line",
    source: `tokyometro.jp, ${OWN}`,
  },
  {
    stop: "Meiji Jingu (Day 1)",
    price: "Free",
    hours: "Sunrise to sunset: 6:10–16:10 in November, 6:40–16:00 in December",
    note: "Facilities inside keep shorter hours, mostly 9:00–16:00",
    source: `meijijingu.or.jp, ${OWN}`,
  },
  {
    stop: "Tokyo Metropolitan Government Building decks (Day 1)",
    price: PRICES.tochoDeck.adult,
    hours: "Varies, and which of the two decks is open varies with it",
    note: PRICES.tochoDeck.bookingNote,
    source: `${PRICES.tochoDeck.source}, ${DECKS}`,
  },
  {
    stop: "SHIBUYA SKY (Day 1)",
    price: `${PRICES.shibuyaSky.adult} adult online (entry before / from 15:00); ${PRICES.shibuyaSky.atDoor} at the counter`,
    hours: "Per-date calendar on the official site",
    note: PRICES.shibuyaSky.bookingNote,
    source: `${PRICES.shibuyaSky.source}, ${SKY}`,
  },
  {
    stop: "Senso-ji main hall (Day 2)",
    price: "No admission charge",
    hours: "6:00–17:00; opens 6:30 October–March",
    note: "Walk in; nothing to book",
    source: `senso-ji.jp, ${OWN}`,
  },
  {
    stop: "TOKYO SKYTREE, Floor 350 (Day 2)",
    price: `${PRICES.tokyoSkytree.adult} adult, ${PRICES.tokyoSkytree.child} child`,
    hours: "Per-date calendar on the official site",
    note: PRICES.tokyoSkytree.bookingNote,
    source: `${PRICES.tokyoSkytree.source}, ${DECKS}`,
  },
  {
    stop: "teamLab Planets TOKYO (Day 2, optional)",
    price: `${PRICES.teamlabPlanets.adult} adult, ${PRICES.teamlabPlanets.child} child`,
    hours: "Varies by date",
    note: PRICES.teamlabPlanets.bookingNote,
    source: `teamlabplanets.dmm.com, ${DECKS}`,
  },
  {
    stop: "Tokyo Tower Main Deck (Day 2 evening)",
    price: `${PRICES.tokyoTower.adult} adult, ${PRICES.tokyoTower.child} child`,
    hours: "9:00–23:00, last admission 22:30",
    note: PRICES.tokyoTower.bookingNote,
    source: `${PRICES.tokyoTower.source}, ${DECKS}`,
  },
];

const fareRows = [
  { band: "1–6 km", ic: "¥178", ticket: "¥180", rides: "9 rides" },
  { band: "7–11 km", ic: "¥209", ticket: "¥210", rides: "8 rides" },
  { band: "12–19 km", ic: "¥252", ticket: "¥260", rides: "6 rides" },
  { band: "20–27 km", ic: "¥293", ticket: "¥300", rides: "6 rides" },
];

const stayRows = [
  {
    area: "Shinjuku or Shibuya",
    good: "Day 1 on your doorstep, the evening in Shinjuku without a ride home, and the Fukutoshin Line for the whole west side",
    catch: "Day 2 starts across the city: Shibuya to Asakusa is the full length of the Ginza Line",
    pick: "If the nightlife and SHIBUYA SKY at sunset are the priority",
  },
  {
    area: "Tokyo Station / Ginza",
    good: "Halfway between the two days, three subway lines in Ginza, and direct trains to Narita and Haneda",
    catch: "Quiet at night compared with Shinjuku or Asakusa",
    pick: "If you arrive or leave by shinkansen, or want the shortest ride on both days",
  },
  {
    area: "Ueno / Asakusa",
    good: "Senso-ji at 6:30 on foot, the Ginza Line straight to Shibuya, and the Skyliner from Narita ending at Keisei-Ueno",
    catch: "Day 1's evening in Shinjuku means a longer ride back",
    pick: "If you land at Narita, or want the old-Tokyo side in the evenings",
  },
];

const bookingWindow = [
  {
    title: "As soon as the dates are fixed: the hotel",
    desc: "On two nights, the area you sleep in decides how much of each day goes on the subway. Book that first.",
  },
  {
    title: "Two weeks out, at 00:00 Japan time: SHIBUYA SKY",
    desc: "Each date goes on sale online at midnight Japan time, two weeks before. Only the sunset slots sell out; the rest of the day usually does not. Check the listing for your date.",
  },
  {
    title: "Before you fly: teamLab Planets and the airport leg",
    desc: "teamLab Planets sells only timed entry slots, with nothing at the door. The Skyliner and the subway pass can both be bought ahead and collected at the airport.",
  },
  {
    title: "A few days out: Skytree, and any guided tour",
    desc: "Skytree's on-site availability depends on the day, and booking ahead avoids the ¥500 on-site fee. Tours list their own cancellation window, so read it for your date.",
  },
];

const faqItems = [
  {
    q: "Is 2 days enough for Tokyo?",
    a: "Enough for a first look at both halves of the city: the west side (Harajuku, Shibuya, Shinjuku) on Day 1 and the east side (Asakusa, Skytree, Tsukiji, Tokyo Tower) on Day 2. It is not enough for a day trip to Mt. Fuji, Hakone or Kamakura, or for the central day (the Imperial Palace and Ginza) that a third day adds.",
  },
  {
    q: "What should you do with 2 days in Tokyo?",
    a: "Day 1: Meiji Jingu and Harajuku in the morning, the Shibuya Crossing at midday, the free Metropolitan Government Building decks in Shinjuku, SHIBUYA SKY at sunset and Shinjuku's alleys at night. Day 2: Senso-ji at opening, Tokyo Skytree, lunch at Tsukiji Outer Market, teamLab Planets if you want it, and Tokyo Tower after dark.",
  },
  {
    q: "Is the Tokyo Subway Ticket worth it for 2 days?",
    a: `Usually, if you route the days on the subway. The 48-hour ticket is ${PASS_48} for an adult and covers every Tokyo Metro and Toei line. Tokyo Metro's IC fares run from ¥178, so the ticket pays for itself at about 8 rides of ¥209, or 6 longer ones. It does not cover JR, including the Yamanote Line. Read on tokyometro.jp ${OWN}.`,
  },
  {
    q: "Where should you stay for 2 days in Tokyo?",
    a: "Shinjuku or Shibuya if the evenings matter most, Tokyo Station or Ginza for the shortest rides on both days, and Ueno or Asakusa if you land at Narita (the Skyliner ends at Keisei-Ueno) or want Senso-ji on foot in the morning.",
  },
  {
    q: "What can you do in Tokyo on a long layover?",
    a: `From Haneda, the Keikyu line reaches Shinagawa in 11 minutes and Asakusa in 34 minutes from Terminal 3, so Senso-ji or Shibuya fit into a long layover. From Narita, the Skyliner takes 41 minutes to Keisei-Ueno, next to Asakusa. The official sources checked do not give a minimum layover time; allow for immigration and for the airline's check-in deadline on the way back. Airport times read ${AIRPORT}.`,
  },
  {
    q: "What should I book before a 2-day Tokyo trip?",
    a: "The hotel first, then SHIBUYA SKY if you want sunset (dates open at 00:00 Japan time two weeks ahead), teamLab Planets if it is on your list (timed slots only), and the airport train. Skytree is cheaper booked ahead. Meiji Jingu, Senso-ji, the Tsukiji market, the Metropolitan Government Building decks and the Tokyo Tower Main Deck need no booking.",
  },
  {
    q: "Which Tokyo attractions need booking in advance?",
    a: `In this plan, teamLab Planets (a 30-minute entry slot, nothing sold at the door) and the SHIBUYA SKY sunset slots. Skytree's same-day counter adds a ¥500 fee per ticket, so booking ahead is cheaper. SHIBUYA SKY read ${SKY}; the others ${DECKS}.`,
  },
  {
    q: "Does this 2-day plan work with children or in the rain?",
    a: "Yes, with fewer stops. The 48-hour subway ticket is ¥750 for a child. On a rainy day, swap the outdoor stops (Meiji Jingu, Takeshita Street, Tsukiji) for teamLab Planets, Skytree's Solamachi mall and the Metropolitan Government Building decks, which are all indoors. Decks lose their view in low cloud, so check the sky before you book a slot.",
  },
];

const TITLE = "Tokyo 2 Day Itinerary (2026): Day by Day, and What to Book";
const DESCRIPTION =
  "A Tokyo 2 day itinerary: Shibuya, Harajuku and Shinjuku on Day 1, Asakusa and Skytree on Day 2. 2 days in Tokyo with the ¥1,500 subway pass and hotels.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function Tokyo2DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Tokyo 2 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Tokyo 2 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo 2 Day Itinerary (2026):<br />West Side, East Side, and What to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Two days is one half of the city each. The subway pass, the hotel area and two timed tickets
            decide how much of each day you actually get.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices & hours, dated", "A table for each day", "Long-layover version"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Day 1 (west)</p>
                <p className={styles.verdictStatValue}>Meiji Jingu, Harajuku, Shibuya, Shinjuku</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2 (east)</p>
                <p className={styles.verdictStatValue}>Asakusa, Skytree, Tsukiji, Tokyo Tower</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting around</p>
                <p className={styles.verdictStatValue}>Tokyo Subway Ticket 48 h, {PASS_48}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book ahead</p>
                <p className={styles.verdictStatValue}>Hotel, SHIBUYA SKY sunset, teamLab Planets</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Tokyo 2 day itinerary</strong> splits the city in two. On <strong>Day 1</strong>, do the
              west side: Meiji Jingu and Harajuku in the morning, the Shibuya Crossing, the free Shinjuku city
              decks, <strong>SHIBUYA SKY</strong> at sunset and Shinjuku at night. On <strong>Day 2</strong>, do
              the east side: <strong>Senso-ji</strong> in Asakusa from 6:30, Tokyo Skytree, lunch at Tsukiji
              Outer Market and <strong>Tokyo Tower</strong> after dark. Get around on the{" "}
              <strong>48-hour Tokyo Subway Ticket, {PASS_48}</strong> for an adult (read on tokyometro.jp{" "}
              {OWN}); it covers all Tokyo Metro and Toei lines but not JR. Only <strong>three</strong> things
              need booking ahead: the hotel, a SHIBUYA SKY sunset slot, and teamLab Planets if you add it.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Tokyo Subway Ticket 48 h →
              </KlookLink>
              <KlookLink href={tokyoTwoDayStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Hotels in Shinjuku →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Is 2 Days Enough for Tokyo?</h2>
          <p className={styles.bodyText}>
            Enough for a first look at both halves of the city, if each day stays on its own side. The west
            (Harajuku, Shibuya, Shinjuku) is modern Tokyo: the crossing, the decks and the alleys after dark.
            The east (Asakusa, Skytree, Tsukiji, Tokyo Tower) is the older city, the river and the two towers.
            Mixing them on one day costs an hour or more on trains.
          </p>
          <p className={styles.bodyText}>
            What two days leave out: the central day around the Imperial Palace and Ginza, which our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> adds, and any
            day trip to Mt. Fuji, Hakone or Kamakura, which the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">5 day Tokyo itinerary</Link> fits in. If you
            have only one night between flights, use the layover version further down.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>What Should You Do on Day 1? The West Side</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Harajuku, Shibuya and Shinjuku, all on the Fukutoshin Line, so the subway pass covers the whole day.
            The fixed point is the SHIBUYA SKY slot: book it for sunset and build the afternoon around it.
          </p>
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
                  {day1.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Meiji Jingu hours from meijijingu.or.jp, {OWN}; SHIBUYA SKY booking rules {SKY}; the city decks{" "}
            {DECKS}. &ldquo;Time to allow&rdquo; is a planning allowance, not an official figure.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 1.</strong> The SHIBUYA SKY slot, online: it is cheaper than the
            counter and the only way to hold sunset. A guided food walk is the one other booking worth making,
            for the Shinjuku evening. Our{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets">SHIBUYA SKY tickets guide</Link> has the time
            bands and the release rule.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinjukuNightFoodWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shinjuku night food walk →
            </KlookLink>
            <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              SHIBUYA SKY ticket →
            </KlookLink>
          </div>
        </section>

        {/* Day 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>What Should You Do on Day 2? The East Side</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Asakusa early, Skytree late morning, Tsukiji for lunch and Tokyo Tower at night. teamLab Planets in
            Toyosu fits the afternoon if you want it; without it, spend the afternoon in Ueno Park or back in
            Asakusa.
          </p>
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
                  {day2.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Senso-ji hours from senso-ji.jp, {OWN}; Skytree, teamLab Planets and Tokyo Tower from the operators,{" "}
            {DECKS}. &ldquo;Time to allow&rdquo; is a planning allowance, not an official figure.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 2.</strong> The Skytree ticket ahead (it avoids the ¥500 same-day
            fee; the{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets">Tokyo Skytree tickets guide</Link> has the
            350 m and 450 m prices), and the teamLab Planets slot if you are going. If you would rather hand the east side to a
            guide, the sightseeing bus day tour covers the Imperial Palace gardens, Asakusa and Skytree; the
            Tsukiji street-food walk is a two-hour version of lunch.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoSightseeingBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo sightseeing day tour →
            </KlookLink>
            <KlookLink href={tsukijiStreetFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tsukiji street food tour →
            </KlookLink>
            <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Skytree ticket →
            </KlookLink>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Planets ticket →
            </KlookLink>
          </div>
        </section>

        {/* Subway pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>Is the Tokyo Subway Ticket Worth It for 2 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Usually yes, on this plan. The <strong>48-hour Tokyo Subway Ticket is {PASS_48}</strong> for an
            adult and {PASS_48_CHILD} for a child, and covers every Tokyo Metro and Toei Subway line for 48
            hours from the time you start travelling. Paying as you go with a Suica or PASMO, a Tokyo Metro ride
            costs ¥178 to ¥324 by distance, so the pass pays for itself at about <strong>8 rides of ¥209</strong>,
            or 6 longer ones. Both days above take about 6 to 8 subway rides each. Read on tokyometro.jp, {OWN}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tokyo Metro distance", "IC card fare", "Paper ticket", `Rides to pass ${PASS_48}`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.band}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.ic}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rides}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The catch is JR.</strong> The ticket does not cover JR lines, including the Yamanote Line
            loop between Harajuku, Shibuya and Shinjuku. This plan routes Day 1 on the Fukutoshin Line instead,
            so the pass still works; if you prefer the Yamanote, pay those rides with an IC card on top. The
            official page lists it for overseas visitors and for Japan residents living outside Tokyo and the
            surrounding prefectures. If your days are mostly on foot, or you are spending
            one day out of the city, an IC card alone is the cheaper default.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fares from tokyometro.jp/en/ticket/regular and the pass from tokyometro.jp/en/ticket/value/travel,
            both {OWN}. &ldquo;Rides to pass&rdquo; is the number of rides at that fare that cost more than the
            48-hour ticket. Toei Subway sets its own fares; the official sources checked do not give a current
            Toei table, so none is printed. Our{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket guide</Link> covers
            collection and the 24- and 72-hour versions.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Subway Ticket (48 h) →
            </KlookLink>
          </div>
        </section>

        {/* Prices and hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; hours</span>
          <h2 className={styles.sectionTitle}>What Do Two Days in Tokyo Cost in Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Less than you might expect: Meiji Jingu, Senso-ji, the Shibuya Crossing, Tsukiji and the
            Metropolitan Government Building decks are free. The paid stops are the two decks you choose and
            teamLab Planets. Each figure carries the date it was read off the operator&apos;s site.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Official price", "Hours", "Notes", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.stop}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change; confirm with each operator. No Klook price appears on this page, because Klook
            prices change by date. For a one-deck trip, our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">Tokyo observation decks guide</Link>{" "}
            compares all of them.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Timed tickets</span>
          <h2 className={styles.sectionTitle}>Which Tokyo Attractions Need Booking in Advance?</h2>
          <p className={styles.bodyText}>
            On this plan, two: <strong>teamLab Planets</strong>, which sells only 30-minute entry slots with
            nothing at the door, and <strong>SHIBUYA SKY</strong> if you want sunset. SHIBUYA SKY releases each
            date online at 00:00 Japan time two weeks ahead, and the sunset slots are the ones that sell out;
            the rest of the day usually does not. <strong>Skytree</strong> is the third worth booking,
            for price rather than space: the same-day counter adds ¥500 a ticket. There is no fixed sell-out
            date for any of them, because it moves with the season and the weekday; check the listing for your
            date.
          </p>
          <div className={styles.whoForGrid}>
            {bookingWindow.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              SHIBUYA SKY →
            </KlookLink>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Planets →
            </KlookLink>
            <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              TOKYO SKYTREE →
            </KlookLink>
            <KlookLink href={tokyoTowerTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Tower →
            </KlookLink>
          </div>
        </section>

        {/* Same-day prep, because the timed tickets above sit in the lower commission bands. */}
        <KlookTripPrep
          label="Book these with your tickets"
          heading="Book These on the Same Day as Your Deck Tickets"
          intro="The subway pass, the airport train, a guided day or evening, the hotel and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={tokyoTwoDayTripPrep}
        />

        {/* Where to stay */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay for 2 Days in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Near one of the two days, or halfway between them. Shinjuku or Shibuya puts Day 1 and its evening on
            your doorstep; Ueno or Asakusa does the same for Day 2; Tokyo Station or Ginza splits the difference.
            Our <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo guide</Link>{" "}
            compares five areas in more detail.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "What it gives you", "The catch", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stayRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.good}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.catch}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for the Three Areas"
          intro="Room prices and availability change by date, so each area links to Klook's hotel search for it."
          areas={tokyoTwoDayStayAreas}
        />

        {/* Layover */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Layover version</span>
          <h2 className={styles.sectionTitle}>What Can You Do in Tokyo on a Long Layover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            With one night between flights, take one evening and one morning from the plan above. Haneda is the
            easy airport for this: the Keikyu line reaches Shinagawa in <strong>11 minutes</strong> and Asakusa
            in <strong>34 minutes</strong> from Terminal 3. From Narita, the Skyliner takes{" "}
            <strong>41 minutes</strong> to Keisei-Ueno, so sleep on the Ueno or Asakusa side. The official
            sources checked do not give a minimum layover time; allow for immigration on arrival and for the
            airline&apos;s check-in deadline on the way back. Airport times read {AIRPORT}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["When", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {layoverRows.map((row) => (
                    <tr key={row.time}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Our <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link> has
            every route from both airports with fares, and the{" "}
            <Link href="/guides/transport/skyliner-vs-nex">Skyliner vs N&apos;EX comparison</Link> picks
            between the two Narita trains by hotel station. The Skyliner and the Haneda limousine bus can both be
            booked before you fly; the{" "}
            <Link href="/guides/transport/tokyo-airport-limousine-bus">Airport Limousine Bus guide</Link>{" "}
            has the bus fare and timetable time for each route.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={keiseiSkylinerUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Keisei Skyliner (Narita) →
            </KlookLink>
            <KlookLink href={hanedaLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Haneda limousine bus →
            </KlookLink>
          </div>
        </section>

        {/* Rain and kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rain &amp; children</span>
          <h2 className={styles.sectionTitle}>Does a 2-Day Tokyo Plan Work in the Rain or With Children?</h2>
          <p className={styles.bodyText}>
            Yes, with swaps. In the rain, move the outdoor stops (Meiji Jingu, Takeshita Street, Tsukiji) and
            lean on the indoor ones: teamLab Planets, Skytree&apos;s Solamachi mall, and the Metropolitan
            Government Building decks. In low cloud, the decks lose their view, which is a reason to book
            SHIBUYA SKY close to the date rather than weeks out. With children, cut each day to three or four
            stops; the 48-hour subway ticket is {PASS_48_CHILD} for a child, and the child prices for the decks
            and teamLab Planets are in the table above.
          </p>
        </section>

        {/* Before you go */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Before you go</span>
          <h2 className={styles.sectionTitle}>What Should I Book Before a 2-Day Tokyo Trip?</h2>
          <p className={styles.bodyText}>
            The checklist, in the order to do it:
          </p>
          <ul className={styles.bodyText} style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
            <li>The hotel, in one of the three areas above.</li>
            <li>The airport leg: the Skyliner from Narita, or nothing from Haneda beyond an IC card.</li>
            <li>SHIBUYA SKY for sunset on Day 1, when your date opens two weeks ahead.</li>
            <li>teamLab Planets for the Day 2 afternoon, if it is on your list.</li>
            <li>The Skytree ticket, to avoid the same-day fee.</li>
            <li>The 48-hour Tokyo Subway Ticket, collected on arrival.</li>
            <li>Data for both days: maps, the deck QR codes and train times run from your phone.</li>
          </ul>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the
            alternatives.
          </p>
        </section>

        <EsimCtaBottom />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Budgeting the two days? The{" "}
            <Link href="/guides/money/tokyo-trip-cost" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Tokyo trip cost
            </Link>{" "}
            guide gives a daily budget per person at three levels, from the city government&apos;s own visitor survey.
          </p>
        </section>

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
          heading="Guided Options for Two Days in Tokyo"
          intro="A guided east-side day, a Shinjuku evening and a Tsukiji lunch. Durations, meeting points and inclusions are on each listing."
          tours={[tokyoSightseeingBusTour, shinjukuNightFoodWalkingTour, tsukijiStreetFoodTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/tokyo-3-day-itinerary", title: "Tokyo 3 Day Itinerary (2026): What to Book, and in What Order" },
              { href: "/guides/attractions/tokyo-5-day-itinerary", title: "Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day" },
              { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo 2026: Top Picks and Ticket Prices" },
              { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?" },
              { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport" },
              { href: "/guides/transport/tokyo-airport-transfer", title: "Tokyo Airport Transfer Guide (2026): Narita & Haneda to the City" },
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
            <h2 className={styles.ctaBannerTitle}>West on Day 1, east on Day 2</h2>
            <p className={styles.ctaBannerDesc}>
              Fix the hotel, book the SHIBUYA SKY sunset slot when it opens, and let one 48-hour subway ticket
              carry both days.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={tokyoTwoDayStayAreas[1].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Hotels Near Tokyo Station →
              </KlookLink>
              <KlookLink href={tokyoSightseeingBusTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Tokyo Day Tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
