import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import { whereToStayKyotoAreas, whereToStayKyotoTripPrep } from "../../../lib/klook-links";

/**
 * Where to Stay in Kyoto — four areas compared on the lines that serve them and
 * the time to the four sights most Kyoto trips are actually built around, rather
 * than on hotels.
 *
 * Same rule as where-to-stay-in-tokyo and -osaka: no hotel names, no room
 * impressions and no nightly rates anywhere. None of the three can be verified
 * from here and two of them move with your dates — which is also why the Klook
 * area hotel search sits directly under the comparison rather than at the foot of
 * the page. What *can* be verified is the transport geography and the tax, and
 * every figure below carries the body that published it and the date it was read:
 *
 *   kyoto.travel (Kyoto City Tourism Association)  times from Kyoto Station to    26 Oct 2026
 *                                                  the four sights; JR Kyoto →
 *                                                  Saga-Arashiyama; Osaka–Kyoto
 *   inari.jp (Fushimi Inari Taisha)                JR Nara Line, 2 stations /     26 Oct 2026
 *                                                  5 minutes; Keihan walk
 *   kiyomizudera.or.jp                             City Bus 100 / 206 to          26 Oct 2026
 *                                                  Gojozaka, 10-minute walk
 *   shokoku-ji.jp (Kinkaku-ji)                     the Kinkakuji-michi bus routes 26 Oct 2026
 *   city.kyoto.lg.jp (Transportation Bureau)       flat bus fare and the two      26 Oct 2026
 *                                                  day passes
 *   randen.keifuku.co.jp                           the Randen flat fare           26 Oct 2026
 *   city.kyoto.lg.jp (Finance Bureau)              the lodging tax bands that     26 Oct 2026
 *                                                  took effect 1 March 2026
 *
 * No Klook price appears anywhere: Klook answers automated reads of its product
 * pages with HTTP 403.
 */

/** The date this page's own figures were read off the official sites. */
const OWN = checkedLabel("2026-10-26");

type Area = {
  area: string;
  who: string;
  /** Stations and lines — network facts, not timings. */
  lines: string;
  /** What this base does to the four-sight problem. */
  sights: string;
  /** How Kyoto Station reaches it, which is also how the shinkansen and Haruka do. */
  fromStation: string;
};

/**
 * Ordered by who should pick them: the arrival-and-departure default first, then
 * the one base that is central for the evenings, then the one that is next to the
 * most famous walk, then the outlier whose argument is that it is not in the city.
 */
const areas: Area[] = [
  {
    area: "Kyoto Station",
    who: "Two-night stops, trips that arrive and leave by shinkansen or from Kansai Airport, and anyone with a bus-heavy plan",
    lines:
      "JR Kyoto — the Tokaido Shinkansen, the Sagano (San-in) Line west, the Nara Line south and every Haruka; the Karasuma subway line; the terminus for the 100 and 101 sightseeing bus routes",
    sights:
      "The only base all four are measured from: Fushimi Inari 10 min, Saga/Arashiyama 25 min, Higashiyama for Kiyomizu-dera 35 min, Kinkaku-ji 40 min",
    fromStation: "You are at it — including the shinkansen platforms and the airport Haruka",
  },
  {
    area: "Karasuma Oike / Shijo",
    who: "Three nights or more, evenings in Pontocho and Nishiki Market, and trips that continue to Osaka",
    lines:
      "The one point the Karasuma and Tozai subway lines cross; Hankyu Karasuma and Kyoto-Kawaramachi, and Keihan Sanjo a walk east — the two private lines to Osaka",
    sights:
      "The central compromise: both subway lines from the door, so neither the Kinkaku-ji buses in the north-west nor the Higashiyama walk in the east starts with a trip to Kyoto Station first",
    fromStation: "Two stops to Shijo and three to Karasuma Oike on the Karasuma subway line",
  },
  {
    area: "Gion / Higashiyama",
    who: "Three nights or more, and anyone who wants Kiyomizu-dera before the coaches arrive",
    lines:
      "Served by the 100 bus from Kyoto Station, the Tozai subway line at Higashiyama and Sanjo-Keihan, and the Keihan main line at Gion-Shijo",
    sights:
      "The Kiyomizu-dera base. The temple's own directions are the 100 or 206 bus to Gojozaka and ten minutes east on foot — from Gion that walk is the whole journey",
    fromStation: "City Bus 100, the Higashiyama route, which the temple's own site names as running via Kiyomizu-dera and Gion",
  },
  {
    area: "Arashiyama",
    who: "Second visits, a quiet last night, and anyone who wants the bamboo grove without the day-trip crowd",
    lines:
      "JR Saga-Arashiyama on the Sagano (San-in) Line; Randen Arashiyama on the Keifuku line from Shijo-Omiya; Hankyu Arashiyama on its own branch. No city bus or municipal subway base",
    sights:
      "One sight on foot and three a long way off: Togetsukyo Bridge is about 8 minutes' walk from Saga-Arashiyama, and Fushimi Inari and Kiyomizu-dera are on the opposite side of the city",
    fromStation: "JR Sagano Line to Saga-Arashiyama, about 11 minutes — rapid and local trains both stop",
  },
];

/** The four sights, each with the route its own operator or the city publishes. */
const sightRows = [
  {
    sight: "Fushimi Inari Taisha",
    fromKyotoStation: "10 min",
    route: "JR Nara Line to Inari — the shrine's own site: “right next to Inari Station on the JR Nara Line (2 stations/5 minutes from Kyoto Station)”",
    alt: "Keihan main line to Fushimi-inari, then 5 minutes' walk east",
  },
  {
    sight: "Kiyomizu-dera (Higashiyama)",
    fromKyotoStation: "35 min",
    route: "City Bus 206 via Higashioji-dori, or City Bus 100 bound for Ginkaku-ji via Kiyomizu-dera and Gion; get off at Gojozaka and walk east 10 minutes",
    alt: "On foot from a Gion or Higashiyama base",
  },
  {
    sight: "Arashiyama / Sagano",
    fromKyotoStation: "25 min",
    route: "JR Sagano (San-in) Line to Saga-Arashiyama, about 11 minutes; about 8 minutes' walk to the Togetsukyo Bridge area",
    alt: "Keifuku Randen from Shijo-Omiya — a flat ¥220 adult, ¥110 child, the whole line",
  },
  {
    sight: "Kinkaku-ji (Kinugasa)",
    fromKyotoStation: "40 min",
    route: "City bus to the Kinkakuji-michi stop; the temple's own site names routes 12, 59, 205 and M1",
    alt: "No rail station — this is the one sight of the four with no train to it",
  },
];

/** Kyoto's lodging tax, per person per night, as the city publishes it. */
const taxRows = [
  { band: "Under ¥6,000", tax: "¥200" },
  { band: "¥6,000 to under ¥20,000", tax: "¥400" },
  { band: "¥20,000 to under ¥50,000", tax: "¥1,000" },
  { band: "¥50,000 to under ¥100,000", tax: "¥4,000" },
  { band: "¥100,000 and over", tax: "¥10,000" },
];

/** Sources for the tables, printed under them so every number is attributable. */
const sourceNote = [
  `The “minutes from Kyoto Station” column is from kyoto.travel, the Kyoto City Tourism Association's official guide, read on ${OWN}; the same page gives the JR Sagano Line at about 11 minutes to Saga-Arashiyama and about an 8-minute walk to the Togetsukyo Bridge area.`,
  `The Fushimi Inari figures are the shrine's own, from inari.jp, read on ${OWN}.`,
  `The Kiyomizu-dera bus routes, the Gojozaka stop and the 10-minute walk are from kiyomizudera.or.jp, read on ${OWN}.`,
  `The Kinkakuji-michi bus routes are from shokoku-ji.jp, Kinkaku-ji's own site, read on ${OWN}.`,
  `The Randen flat fare is Keifuku's published fare, read on ${OWN}.`,
].join(" ");

const faqItems = [
  {
    q: "What is the best area to stay in Kyoto?",
    a: `Kyoto Station for a two-night stop, Karasuma Oike or Shijo for three nights or more. Kyoto Station is where the Tokaido Shinkansen and the airport Haruka put you down, where the 100 and 101 sightseeing buses start, and the point all four of Kyoto's headline sights are measured from on the official Kyoto travel guide: Fushimi Inari 10 minutes, Saga/Arashiyama 25, Higashiyama for Kiyomizu-dera 35 and Kinkaku-ji 40, read on ${OWN}. Karasuma Oike is the better base once you have more than two nights, because it is the one point the Karasuma and Tozai subway lines cross, with Pontocho, Nishiki Market and the Hankyu and Keihan lines to Osaka on foot — so the evenings do not need a bus and neither does the second half of the city.`,
  },
  {
    q: "Is it better to stay near Kyoto Station or Gion?",
    a: `Kyoto Station if your trip is short or train-shaped, Gion if it is three nights or longer and Kiyomizu-dera is the thing you came for. The honest difference is small and specific. From Kyoto Station, Kiyomizu-dera is the 206 or the 100 bus to the Gojozaka stop and then ten minutes east on foot, which is the temple's own published route, read on ${OWN} — from Gion, that walk is the entire journey, which is what lets you be there before the coaches. What Gion costs you is everything on rails: the shinkansen, the Haruka from Kansai Airport, the Nara Line to Fushimi Inari and the Sagano Line to Arashiyama all leave from Kyoto Station, and from Gion each of those starts with a bus or a subway ride first.`,
  },
  {
    q: "Should I stay in Kyoto or Osaka?",
    a: `Stay in Kyoto if Kyoto is the point of the trip, and in Osaka if you are splitting your time across Kansai. The two are close enough that either works: on the official Kyoto travel guide, read on ${OWN}, Osaka Station to Kyoto Station is approximately 30 minutes on the JR Special Rapid, Osaka-umeda to Kyoto-Kawaramachi approximately 45 minutes on the Hankyu, and Yodoyabashi to Gion-Shijo approximately 48 minutes on the Keihan limited express. What that commute cannot buy you is a Kyoto morning. Fushimi Inari and Kiyomizu-dera are at their best before the day trippers arrive, and the day trippers arrive on exactly those trains. Sleep in Kyoto for at least the nights either side of those two sights, and use Osaka for the Universal Studios and Dotonbori half of a Kansai trip.`,
  },
  {
    q: "Where to stay in Kyoto for Arashiyama?",
    a: `Arashiyama itself, if Arashiyama is the reason you are going — otherwise Kyoto Station. Arashiyama is the one Kyoto base that no city bus and neither subway line serves: it is reached on the JR Sagano (San-in) Line, which the official Kyoto travel guide puts at about 11 minutes from Kyoto Station to Saga-Arashiyama with an 8-minute walk to the Togetsukyo Bridge area, or on the Keifuku Randen from Shijo-Omiya at a flat ¥220 for an adult and ¥110 for a child. Both read on ${OWN}. Staying there buys you the bamboo grove and the river at the hours the trains are not running people in; the trade is that Fushimi Inari and Kiyomizu-dera are then on the far side of the city, so one night in Arashiyama and the rest nearer the station often beats four nights out there.`,
  },
  {
    q: "How early should I book a Kyoto hotel in autumn and cherry blossom season?",
    a: `We do not publish a number, because nobody publishes one: availability and nightly price are per-hotel and per-date, so any “book X weeks ahead” figure would be invented. What is published is what you are booking against. Kyoto's two peak windows are the cherry-blossom weeks from late March into early April and the autumn-leaf weeks of mid to late November, and in both of them domestic demand lands on top of international — the same weeks the city's own transport bureau's sightseeing bus routes are at their fullest. Two things do have published numbers. Kyoto's lodging tax has been charged on new rates since 1 March 2026, from ¥200 to ¥10,000 per person per night depending on the room rate, read on ${OWN}; and it is set by the date you stay, not the date you book, so booking early does not lock in the old rate. The practical move is the opposite of guessing: open the hotel search for your real dates and party size in two or three of the areas above and compare what is left.`,
  },
  {
    q: "How much is Kyoto's lodging tax and is it included in the room price?",
    a: `It is charged per person per night, on top of the room, and Kyoto City revised the bands on 1 March 2026: ¥200 for a room under ¥6,000, ¥400 from ¥6,000 to under ¥20,000, ¥1,000 from ¥20,000 to under ¥50,000, ¥4,000 from ¥50,000 to under ¥100,000, and ¥10,000 at ¥100,000 and above. Read on ${OWN}. The city states the amount is decided by the date of your stay, so a booking made before the change still pays the new rate for a night after it. Whether it is already in the figure you see depends on the seller — some include it in the total and some collect it at the desk, so check the breakdown before you treat two quotes as comparable.`,
  },
  {
    q: "Do I need a rail pass or a bus pass for the area I pick?",
    a: `It depends which base you choose, which is the real reason the area decision matters. Kyoto city buses are a flat ¥230 a ride in the uniform-fare zone, and the Kyoto City Transportation Bureau sells a Subway & Bus 1-Day Pass at ¥1,100 for an adult and ¥550 for a child, and a Subway 1-Day Pass at ¥800 and ¥400 — read on ${OWN}. Those cover the Gion and Kinkaku-ji ends of a trip from a Kyoto Station or Karasuma base. They do not cover JR, which is what reaches Fushimi Inari and Arashiyama, and they do not cover the Keifuku Randen. So a Gion base plus a day pass is a sensible pairing; an Arashiyama base and a city bus pass is close to a waste.`,
  },
  {
    q: "Where should I stay in Kyoto with kids?",
    a: `Kyoto Station, for the same reason it suits a short trip: it removes transfers. A tired afternoon ends with a short bus or train ride to the building you are sleeping in rather than a walk uphill in Higashiyama, the station itself has the food halls and the luggage lockers, and the Nara Line south and the Sagano Line west both leave from under it, so a day trip is one ride. Two practical notes that apply across the city. Standard Japanese hotel rooms are built for one or two people, so filtering by party size narrows the list far more than filtering by area does — do that first. And Kyoto's lodging tax is per person per night, which means a family of four pays it four times.`,
  },
  {
    q: "Is one area enough for a whole Kyoto trip, or should I move?",
    a: `One area for almost any trip of four nights or fewer. Kyoto is small, and the cost of moving — a morning of packing, an afternoon of luggage — buys back very little, because no base in the city is close to all four headline sights: Kinkaku-ji is in the north-west, Fushimi Inari in the south, Arashiyama in the west and Kiyomizu-dera in the east. The one split that genuinely earns its keep is a last night in Arashiyama after the day trippers have gone, or the reverse: Arashiyama first and then a move in towards the station for the departure. Beyond that, pick the base whose lines match the days you have actually planned.`,
  },
];

const TITLE = "Where to Stay in Kyoto (2026): Best Areas Compared";
const DESCRIPTION =
  "Where to stay in Kyoto in 2026: 4 areas — Kyoto Station, Karasuma Oike, Gion and Arashiyama — compared on their lines and travel time to the big sights.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/where-to-stay-in-kyoto") } });

export default function WhereToStayInKyotoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/where-to-stay-in-kyoto" />
        {hreflangLinks("/guides/attractions/where-to-stay-in-kyoto")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/where-to-stay-in-kyoto" />
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
            __html: articleJsonLd({
              route: "/guides/attractions/where-to-stay-in-kyoto",
              headline: "Where to Stay in Kyoto (2026): Best Areas Compared",
              description: DESCRIPTION,
              updated,
            }),
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Where to Stay in Kyoto",
                  item: "https://www.japan-travel-kit.com/guides/attractions/where-to-stay-in-kyoto",
                },
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
          <span className={styles.breadCurrent}>Where to Stay in Kyoto</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Where to Stay in Kyoto (2026):<br />Best Areas, Compared by Line and Travel Time
          </h1>
          <p className={styles.heroSubtitle}>
            Four areas, compared on the lines under them and the official time to the four sights your
            days will actually be built around.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "4 areas compared", "Official travel times"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Two nights</p>
                <p className={styles.verdictStatValue}>Kyoto Station</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Three nights or more</p>
                <p className={styles.verdictStatValue}>Karasuma Oike / Shijo</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kiyomizu-dera at dawn</p>
                <p className={styles.verdictStatValue}>Gion / Higashiyama</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bamboo grove early</p>
                <p className={styles.verdictStatValue}>Arashiyama — JR, 11 min out</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Kyoto Station if your trip is short or train-shaped, Karasuma Oike
              or Shijo once you have three nights, Gion if Kiyomizu-dera before the coaches is the point,
              and Arashiyama for a quiet night out west. Then do the one thing an answer cannot do for
              you — check what is actually free on your dates.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={whereToStayKyotoAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Kyoto Station hotels on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Answer-first intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay in Kyoto?</h2>
          <p className={styles.bodyText}>
            <strong>Where to stay in Kyoto</strong> comes down to four areas, and the answer depends on how
            many nights you have. <strong>Kyoto Station</strong> is the two-night default: the Tokaido
            Shinkansen and the airport Haruka arrive there, the 100 and 101 sightseeing buses start there,
            and it is the point the city&apos;s own travel guide measures the four headline sights from —
            Fushimi Inari <strong>10 minutes</strong>, Saga/Arashiyama <strong>25</strong>, Higashiyama for
            Kiyomizu-dera <strong>35</strong> and Kinkaku-ji <strong>40</strong>, read on {OWN}. At three
            nights or more, <strong>Karasuma Oike / Shijo</strong> wins: it is the one point the Karasuma and
            Tozai subway lines cross, with Pontocho, Nishiki Market and the Hankyu and Keihan lines to Osaka
            on foot. Choose <strong>Gion / Higashiyama</strong> if Kiyomizu-dera before the coaches is the
            point — from there the temple&apos;s own ten-minute walk up from Gojozaka is the whole journey —
            and <strong>Arashiyama</strong> for the bamboo grove early, about <strong>11 minutes</strong> out
            on the JR Sagano Line.
          </p>
          <p className={styles.bodyText}>
            What follows is the comparison behind that, and what it deliberately leaves out. There are no
            hotel names, no room impressions and no nightly rates on this page: we cannot verify any of the
            three from here, and two of them change with your dates. Every journey time below carries the
            official body that published it and the date we read it.
          </p>
        </section>

        {/* Area comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Kyoto Areas Compared</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Read the fourth column first. Kyoto&apos;s problem is that its four famous sights sit on four
            different sides of the city, so no base is close to all of them — what an area actually buys you
            is which one you can walk to and which lines carry you to the rest.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Who it suits", "Stations & lines", "What it does for the four sights", "From Kyoto Station"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areas.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.lines}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.sights}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.fromStation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Stop counts on the Karasuma subway line are from the line&apos;s own station order. Journey times
            exclude the walk to and from the platform, and none of them is a guarantee for a particular
            departure.
          </p>
        </section>

        {/* The four sights */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Travel times</span>
          <h2 className={styles.sectionTitle}>How Far Is Each Sight From Kyoto Station?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            These are the figures the area decision is really made against. The second column is the official
            Kyoto travel guide&apos;s own minutes from Kyoto Station; the third is the route each sight&apos;s
            own operator publishes, which is what you will actually be following on the morning.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Sight", "From Kyoto Station", "The published route", "The other way in"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sightRows.map((row) => (
                    <tr key={row.sight}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.sight}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.fromKyotoStation}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.alt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {sourceNote} Kyoto city buses are a flat ¥230 a ride in the uniform-fare zone, and the Kyoto City
            Transportation Bureau&apos;s Subway &amp; Bus 1-Day Pass is ¥1,100 for an adult and ¥550 for a
            child, with a Subway 1-Day Pass at ¥800 and ¥400 — read on {OWN}. Neither pass covers JR or the
            Keifuku Randen. Our{" "}
            <Link href="/guides/transport/kyoto-subway-bus-pass">Kyoto subway and bus pass guide</Link> works
            the break-even against single fares.
          </p>
        </section>

        {/* Klook hotels — directly under the comparison, which is the point of the page. */}
        <KlookStayAreas
          heading="Where to Stay in Kyoto: Hotel Search by Area"
          intro="This is the step the comparison above cannot finish for you. Which rooms are left, and at what price, is a per-date question — so each area below links straight into Klook's own hotel search for that district. Set your dates and your party size, and compare two or three of them against each other."
          areas={whereToStayKyotoAreas}
        />

        {/* Question headings */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The default</span>
          <h2 className={styles.sectionTitle}>What Is the Best Area to Stay in Kyoto?</h2>
          <p className={styles.bodyText}>
            <strong>Kyoto Station for a two-night stop, Karasuma Oike or Shijo for three nights or more.</strong>{" "}
            Kyoto Station wins short trips because it removes transfers from both ends of them: the shinkansen
            and the Haruka from Kansai Airport arrive there, the 100 and 101 sightseeing bus routes start
            there, and the Nara Line to Fushimi Inari and the Sagano Line to Arashiyama leave from the same
            building.
          </p>
          <p className={styles.bodyText}>
            Once you have more nights, that advantage stops mattering and a different one starts. Karasuma
            Oike is the single point the Karasuma and Tozai subway lines cross, which means the north-west
            (Kinkaku-ji) and the east (Higashiyama) both open from the door rather than via the station — and
            Shijo-Kawaramachi, Pontocho, Nishiki Market and the Hankyu and Keihan lines to Osaka are a walk.
            Our{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto guide</Link> covers which
            of those the city passes actually include.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Head to head</span>
          <h2 className={styles.sectionTitle}>Is It Better to Stay Near Kyoto Station or Gion?</h2>
          <p className={styles.bodyText}>
            <strong>Kyoto Station if your trip is short or train-shaped, Gion if it is three nights or more
            and Kiyomizu-dera is what you came for.</strong> The difference is small and very specific.
          </p>
          <p className={styles.bodyText}>
            Kiyomizu-dera&apos;s own directions from JR Kyoto Station are City Bus 206 via Higashioji-dori or
            City Bus 100 bound for Ginkaku-ji via Kiyomizu-dera and Gion, getting off at Gojozaka and walking
            east for ten minutes — read on {OWN}. From a Gion base, that ten-minute walk is the whole journey,
            which is exactly what lets you be at the temple before the first coaches. What Gion costs you is
            everything on rails: the shinkansen, the Haruka, the Nara Line to Fushimi Inari and the Sagano
            Line to Arashiyama all start at Kyoto Station, so from Gion each of those days begins with a bus
            or a subway ride first. If you are arriving on the Tokaido Shinkansen, our{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link> covers which train and
            which seat.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Kyoto vs Osaka</span>
          <h2 className={styles.sectionTitle}>Should I Stay in Kyoto or Osaka?</h2>
          <p className={styles.bodyText}>
            <strong>Kyoto if Kyoto is the point of the trip; Osaka if you are splitting Kansai between
            several cities.</strong> Either works, because the two are close: on the official Kyoto travel
            guide, read on {OWN}, Osaka Station to Kyoto Station is approximately 30 minutes on the JR Special
            Rapid, Osaka-umeda to Kyoto-Kawaramachi approximately 45 minutes on the Hankyu, and Yodoyabashi to
            Gion-Shijo approximately 48 minutes on the Keihan limited express.
          </p>
          <p className={styles.bodyText}>
            What the commute cannot buy you is a Kyoto morning. Fushimi Inari and Kiyomizu-dera are at their
            quietest before the day trippers arrive, and the day trippers arrive on those same three trains.
            So the useful compromise is not one city or the other: it is Kyoto nights on either side of the
            two sights you care most about, and Osaka for the Dotonbori and Universal Studios half of the
            trip. Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka guide</Link>{" "}
            compares the Osaka areas the same way, and the{" "}
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary">
              Tokyo–Kyoto–Osaka seven-day itinerary
            </Link>{" "}
            sets out how the nights divide.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Arashiyama</span>
          <h2 className={styles.sectionTitle}>Where to Stay in Kyoto for Arashiyama?</h2>
          <p className={styles.bodyText}>
            <strong>Arashiyama itself if the grove and the river are the reason you came — otherwise Kyoto
            Station.</strong> Arashiyama is the one Kyoto base that no city bus and neither subway line
            serves. It is the JR Sagano (San-in) Line, about 11 minutes from Kyoto Station to Saga-Arashiyama
            with about an 8-minute walk to the Togetsukyo Bridge area, or the Keifuku Randen from Shijo-Omiya
            at a flat ¥220 for an adult and ¥110 for a child. Both read on {OWN}.
          </p>
          <p className={styles.bodyText}>
            The trade is the other three sights. From Arashiyama, Fushimi Inari and Kiyomizu-dera are on the
            opposite side of the city, so a four-night Arashiyama stay spends a lot of its mornings travelling
            back in. One night out there and the rest nearer the station usually beats it. If the Sagano
            Romantic Train is in your plan, book that before you book the room — our{" "}
            <Link href="/guides/attractions/sagano-romantic-train-tickets">
              Sagano Romantic Train guide
            </Link>{" "}
            explains why its reserved seats go first.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>
            How Early Should I Book a Kyoto Hotel in Autumn and Cherry Blossom Season?
          </h2>
          <p className={styles.bodyText}>
            <strong>We do not publish a number, because nobody publishes one.</strong> Availability and
            nightly price are per-hotel and per-date, so any &ldquo;book X weeks ahead&rdquo; figure would be
            invented. What is published is what you are booking against: the cherry-blossom weeks from late
            March into early April, and the autumn-leaf weeks of mid to late November. In both, Japanese
            domestic demand lands on top of international demand for the same rooms and the same buses.
          </p>
          <p className={styles.bodyText}>
            One thing about those dates does have a published number, and it is worth knowing before you
            compare two quotes. Kyoto City revised its lodging tax on 1 March 2026, and it is charged{" "}
            <strong>per person per night</strong> on top of the room — and the city states the amount is set
            by the date you stay, not the date you book, so an early booking does not lock in an old rate.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Room rate, per person per night", "Kyoto lodging tax"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {taxRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider}>{row.band}</td>
                      <td className={styles.tdPrice}>{row.tax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Kyoto City&apos;s own published bands, in force since 1 March 2026, read on {OWN}. Some sellers
            include the tax in the total and some collect it at the desk, so check the breakdown before
            treating two prices as comparable. A family of four pays it four times a night.
          </p>
          <p className={styles.bodyText}>
            The practical move, then, is the opposite of guessing a lead time: open the area searches for your
            real dates and party size and compare two or three districts against each other. That is the one
            part of this decision no summary can finish, because it depends on a night that has not happened
            yet.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={whereToStayKyotoAreas[1].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Karasuma Oike hotels on Klook →
            </KlookLink>
            <KlookLink href={whereToStayKyotoAreas[2].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Gion hotels on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Supporting Klook block — the airport train and the guided days a base is chosen against. */}
        <KlookTripPrep
          label="Booked alongside"
          heading="What Else Does the Area You Pick Decide?"
          intro="Each of these follows from the area rather than the other way round: the airport train you want depends on whether your base is Kyoto Station, and whether a guided day is worth it depends on how far your base is from the sight you most want to see early."
          items={whereToStayKyotoTripPrep}
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.9 6.3 6.9.8-5 4.7 1.3 6.8L12 17.4l-6.1 3.2L7.2 13.8l-5-4.7 6.9-.8z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Subway &amp; Day Passes Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-subway-bus-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18M7 15h4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Subway &amp; Bus Pass (2026): Is the 1-Day Pass Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l4 3-1 4 2 11H7l2-11-1-4z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Kimono Rental (2026): Shops by Area, Return Times and What It Costs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Pick the area, then check the dates</h2>
            <p className={styles.ctaBannerDesc}>
              The comparison above narrows Kyoto to two or three areas. Which rooms are left, and at what
              price, is a question only your dates can answer — and in cherry-blossom and autumn-leaf weeks
              it answers it quickly.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={whereToStayKyotoAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check Kyoto Station hotels on Klook →
              </KlookLink>
              <KlookLink href={whereToStayKyotoAreas[3].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Check Arashiyama hotels on Klook →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
