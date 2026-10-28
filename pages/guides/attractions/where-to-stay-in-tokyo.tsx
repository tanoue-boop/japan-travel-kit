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
import { whereToStayTokyoAreas, whereToStayTokyoTripPrep } from "../../../lib/klook-links";

/**
 * Where to Stay in Tokyo — five areas compared on the lines that serve them and
 * the airport route to each, rather than on hotels.
 *
 * The rule this page is built on: no hotel names, no room impressions and no
 * nightly rates anywhere. None of the three can be verified from here, and two of
 * them move by date — which is also the reason the Klook area hotel search sits
 * directly under the comparison rather than at the foot of the page. What *can* be
 * verified is the rail geography, and every figure below carries the operator and
 * the date it was read:
 *
 *   haneda-tokyo-access.com (Keikyu)  estimated times from Haneda T3 and T1·2   26 Oct 2026
 *   keisei.co.jp                      Skyliner, Keisei-Ueno ↔ Narita T2·3        26 Oct 2026
 *   odakyu-global.com                 Shinjuku–Hakone-Yumoto, Romancecar fee     26 Oct 2026
 *   gotokyo.org (TMG official guide)  Tokyo Station → Ginza / Shinjuku           26 Oct 2026
 *   www8.cao.go.jp (Cabinet Office)   the public-holiday dates in the booking Q   26 Oct 2026
 *
 * Three figures are carried over from this site's own earlier reads and are dated
 * to those rather than to today: JR East's Narita Express times and fares and JR
 * Central's "about 130 minutes" Tokyo–Kyoto (25 Oct 2026), and the Fujikyu highway
 * bus times and fares to Kawaguchiko (21 Oct 2026).
 *
 * No Klook price appears anywhere: Klook answers automated reads of its product
 * pages with HTTP 403.
 */

/** The date this page's own figures were read off the operators' sites. */
const OWN = checkedLabel("2026-10-26");

/** JR East's N'EX figures and JR Central's Tokaido time, from the 25 Oct 2026 read. */
const JR_CHECKED = checkedLabel("2026-10-25");

/** The Fujikyu highway-bus times and fares, from the 21 Oct 2026 read. */
const BUS_CHECKED = checkedLabel("2026-10-21");

type Area = {
  area: string;
  who: string;
  /** Stations and lines — network facts, not timings. */
  lines: string;
  /** Journey times we could verify, each with its operator. */
  times: string;
  /** How the airport trains reach it. */
  airport: string;
};

/**
 * Ordered by who should pick them, not by size: the first-timer default first,
 * then the two bases chosen around a departure (shinkansen, Narita), then the two
 * chosen around an evening.
 */
const areas: Area[] = [
  {
    area: "Shinjuku",
    who: "First trips, and any trip with Hakone or the Fuji lakes in it",
    lines:
      "JR Shinjuku — Yamanote loop, Chuo Rapid, Saikyo and Shonan-Shinjuku; the Odakyu and Keio termini; Marunouchi, Shinjuku and Oedo subway lines; the Shinjuku Expressway Bus Terminal",
    times:
      "Hakone-Yumoto approx. 80 min on the Odakyu Romancecar; Kawaguchiko approx. 1 hr 45 min by Fujikyu highway bus; Tokyo Station 14 min on the Chuo Line Rapid",
    airport:
      "Narita: Narita Express direct, ¥3,330. Haneda: 30 min from Terminal 3 and 33 from Terminal 1·2 on Keikyu's estimate, with one change",
  },
  {
    area: "Tokyo Station / Marunouchi",
    who: "Shinkansen day trips, and short trips where you would rather not cross the city with cases",
    lines:
      "JR Tokyo — Yamanote loop, Chuo Rapid, Keihin-Tohoku, Tokaido and Yokosuka lines; the Tokaido and Tohoku shinkansen; Marunouchi subway line",
    times:
      "Kyoto about 130 min on the Tokaido Shinkansen; Ginza 3 min on the Marunouchi Line; Shinjuku 14 min on the Chuo Line Rapid; Kawaguchiko about 130 min by highway bus",
    airport:
      "Narita: Narita Express as fast as 53 min, ¥3,140, no transfer. Haneda: 20 min from Terminal 3 and 23 from Terminal 1·2",
  },
  {
    area: "Ueno / Asakusa",
    who: "Landing at Narita, and the old-Tokyo half of a first trip",
    lines:
      "JR Ueno — Yamanote loop, Keihin-Tohoku and the Tohoku shinkansen; Ginza and Hibiya subway lines; Keisei-Ueno next door. Asakusa sits on the Ginza, Toei Asakusa and Tobu lines",
    times:
      "Asakusa is a few stops from Ueno on the Ginza Line; Kawaguchiko about 130 min by highway bus from Ueno",
    airport:
      "Narita: Keisei Skyliner, 41 min to Keisei-Ueno from Terminal 2·3, ¥2,580; or the Access Express through to Asakusa in 50 min, ¥1,280. Haneda: Asakusa 34 min from Terminal 3 and 37 from Terminal 1·2",
  },
  {
    area: "Shibuya",
    who: "Second trips, evenings out, and an early start on a Fuji bus",
    lines:
      "JR Shibuya — Yamanote loop, Saikyo and Shonan-Shinjuku; Ginza, Hanzomon and Fukutoshin subway lines; Tokyu Toyoko and Keio Inokashira",
    times:
      "Harajuku one stop and Shinjuku two on the Yamanote loop; Kawaguchiko about 120 min by highway bus from Shibuya; SHIBUYA SKY is inside the station complex",
    airport:
      "Narita: Narita Express direct, ¥3,330. Haneda: 23 min from Terminal 3 and 26 from Terminal 1·2",
  },
  {
    area: "Ginza",
    who: "Quiet evenings, department-store shopping, and the shortest run to Haneda",
    lines:
      "Ginza — the Ginza, Marunouchi and Hibiya subway lines; Higashi-ginza adds the Toei Asakusa Line, which the Keikyu airport trains run through onto",
    times: "Tokyo Station 3 min on the Marunouchi Line, or about 15 min on foot",
    airport:
      "Haneda: Higashi-ginza 23 min from Terminal 3 and 26 from Terminal 1·2, on a through train with no change. Narita: the Keisei Access Express runs onto the same Toei Asakusa Line (Keisei puts Asakusa at 50 min)",
  },
];

/** Sources for the table, printed under it so every number is attributable. */
const sourceNote = [
  `Haneda times are Keikyu's own estimated travel times, read on ${OWN}; they exclude transfer time.`,
  `The Skyliner figure is Keisei's, read on ${OWN}.`,
  `The Romancecar time is Odakyu's "approx. 80 min", read on ${OWN} — the limited express surcharge is ¥1,200 for an adult and ¥600 for a child on top of the ordinary fare.`,
  `Tokyo Station → Ginza and Tokyo Station → Shinjuku are from gotokyo.org, the Tokyo Metropolitan Government's official guide, read on ${OWN}.`,
  `Narita Express times and fares and the "about 130 minutes" Tokyo–Kyoto shinkansen figure are from JR East and JR Central, read on ${JR_CHECKED}.`,
  `Kawaguchiko highway-bus times are Fujikyu's, read on ${BUS_CHECKED}: ¥2,200 for an adult from Shinjuku (¥2,000 booked online), and from ¥2,300 from Tokyo Station, Ueno or Shibuya.`,
].join(" ");

const faqItems = [
  {
    q: "What is the best area to stay in Tokyo for first-timers?",
    a: `Shinjuku, for one reason that has nothing to do with the neighbourhood: more lines leave from it than from anywhere else, so a wrong guess about what you want to see costs you less. It is a Yamanote loop stop and the terminus of the Chuo, Odakyu and Keio lines, three subway lines run through it, and the expressway bus terminal is upstairs. If your plan includes Hakone or the Fuji lakes, that matters twice over: Odakyu puts Shinjuku to Hakone-Yumoto at approximately 80 minutes on the Romancecar, and the Fujikyu highway bus reaches Kawaguchiko Station in about 1 hour 45 minutes for ¥2,200. Read on ${OWN} and ${BUS_CHECKED} respectively.`,
  },
  {
    q: "Is Shinjuku or Shibuya better to stay in?",
    a: `Shinjuku if this is your first trip, Shibuya if it is not. They are two stops apart on the Yamanote loop, so the sightseeing difference is close to nothing — what differs is what leaves from under you. Shinjuku has the Odakyu line to Hakone, the Chuo Rapid west, and the expressway bus terminal; Shibuya has three subway lines, the Tokyu Toyoko to Yokohama, and SHIBUYA SKY inside the station complex. From Haneda, Keikyu's estimates put Shibuya closer: 23 minutes from Terminal 3 against 30 to Shinjuku, read on ${OWN}.`,
  },
  {
    q: "Where to stay in Tokyo with kids?",
    a: `Ueno or Tokyo Station, and the reason is stairs rather than sights. Ueno puts the park, the zoo and the museums within walking distance of the hotel, so a tired afternoon ends without a train; Tokyo Station means the shinkansen for a day trip starts under the building rather than after a cross-city change with a pushchair. If Tokyo Disney is in the plan it changes the answer entirely — the resort has its own hotel cluster at Maihama, and our Tokyo Disney guide covers how the date-specified tickets work.`,
  },
  {
    q: "Where to stay in Tokyo for day trips to Mt Fuji?",
    a: `Shinjuku, clearly. The Fujikyu highway bus to Kawaguchiko Station is listed at approximately 1 hour 45 minutes from Shinjuku at ¥2,200 for an adult, or ¥2,000 booked online — against about 130 minutes from Tokyo Station or Ueno and about 120 minutes from Shibuya, both from ¥2,300. Shinjuku is also where the Odakyu Romancecar leaves for Hakone, approximately 80 minutes to Hakone-Yumoto. Bus figures read on ${BUS_CHECKED}, the Romancecar on ${OWN}.`,
  },
  {
    q: "Which area is closest to Haneda or Narita?",
    a: `They pull in opposite directions, which is why the airport you land at is worth deciding the area on. For Haneda, Keikyu's own estimated times from Terminal 3 are Shinagawa 11 minutes, Tokyo 20, Shibuya and Higashi-ginza 23 each, Shinjuku 30 and Asakusa 34; add about three minutes from Terminal 1·2. For Narita, Ueno and Asakusa win — Keisei puts the Skyliner at 41 minutes from Terminal 2·3 to Keisei-Ueno — while Tokyo Station, Shibuya and Shinjuku are reached without a transfer on the Narita Express. Keikyu and Keisei read on ${OWN}, JR East on ${JR_CHECKED}.`,
  },
  {
    q: "How early should I book a Tokyo hotel?",
    a: `We do not publish a number here, because nobody publishes one: availability and price are per-hotel and per-date, and any "book X weeks ahead" figure would be invented. What is a published fact is the calendar you are booking against. Japan's Cabinet Office lists Showa Day on 29 April, Constitution Memorial Day on 3 May, Greenery Day on 4 May and Children's Day on 5 May — the Golden Week cluster — plus Mountain Day on 11 August, read on ${OWN}. Those weeks, the New Year period and the cherry-blossom and autumn-leaf weeks are when domestic demand is added to yours. The practical move is the opposite of guessing: open the hotel search for your actual dates, in two or three of the areas above, and compare what is left.`,
  },
  {
    q: "Should I stay in one area for a whole Tokyo trip or move?",
    a: "One area, in almost every case. Tokyo's rail network is what makes a single base work: the Yamanote loop touches Shinjuku, Shibuya, Tokyo Station and Ueno, so no area in the table is more than a short ride from the others. Moving hotels costs you a morning of packing and an afternoon of luggage for a saving of perhaps fifteen minutes a day. The one exception is a trip that ends at a different airport from the one it started at, where a last night nearer the departure terminal can be worth it.",
  },
  {
    q: "Is it cheaper to stay outside central Tokyo?",
    a: "Often, and the question is whether the fares and the time eat the saving. An area one or two stops off the Yamanote loop — Ikebukuro, Shinagawa, Nippori, Kinshicho — still has the loop or a through-running subway at the door, and that is the test worth applying: not how far out it is, but whether it is on a line you will actually use. We print no rates here because we cannot verify them; the area searches below show what is available on your dates.",
  },
  {
    q: "Which Tokyo area is best for food and nightlife?",
    a: "Shinjuku and Shibuya, with Asakusa as the quieter alternative. Shinjuku's Omoide Yokocho and Golden Gai and Shibuya's back streets are the dense late-night areas, and both are Yamanote stops, so you can stay in one and drink in the other. Ginza is the opposite end of the scale: expensive, calm, and largely finished by the time the other two get going — which is exactly why some people pick it.",
  },
  {
    q: "Do Tokyo hotels have rooms big enough for three or four people?",
    a: "This is the question that most often forces a second booking, and it is worth settling before you choose an area rather than after. Standard Japanese business-hotel rooms are built for one or two; triples and quads exist but are a smaller share of the inventory, so filtering by party size narrows your choices far more than filtering by area does. Search for your actual party size first, then pick the area from what comes back.",
  },
];

const TITLE = "Where to Stay in Tokyo (2026): Best Areas Compared";
const DESCRIPTION =
  "Where to stay in Tokyo in 2026: 5 areas compared on the lines that serve them, the airport route to each, and the day trips that leave from the door.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/where-to-stay-in-tokyo") } });

export default function WhereToStayInTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/where-to-stay-in-tokyo" />
        {hreflangLinks("/guides/attractions/where-to-stay-in-tokyo")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/where-to-stay-in-tokyo" />
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
              route: "/guides/attractions/where-to-stay-in-tokyo",
              headline: "Where to Stay in Tokyo (2026): Best Areas Compared",
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
                  name: "Where to Stay in Tokyo",
                  item: "https://www.japan-travel-kit.com/guides/attractions/where-to-stay-in-tokyo",
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
          <span className={styles.breadCurrent}>Where to Stay in Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Where to Stay in Tokyo (2026):<br />Best Areas, Compared by Line and Airport
          </h1>
          <p className={styles.heroSubtitle}>
            Five areas, compared on the lines that serve them rather than on hotels — because in Tokyo
            the station decides your days.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "5 areas compared", "Operator journey times"].map((t) => (
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
                <p className={styles.verdictStatLabel}>First trip</p>
                <p className={styles.verdictStatValue}>Shinjuku</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shinkansen day trips</p>
                <p className={styles.verdictStatValue}>Tokyo Station</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Landing at Narita</p>
                <p className={styles.verdictStatValue}>Ueno / Asakusa — 41 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Landing at Haneda</p>
                <p className={styles.verdictStatValue}>Ginza / Shibuya — 23 min</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> pick Shinjuku for a first trip, Tokyo Station if your plan has
              shinkansen day trips in it, Ueno or Asakusa if you land at Narita, Shibuya for a second trip,
              and Ginza for quiet evenings and the shortest Haneda run. Then do the one thing an answer
              cannot do for you — check what is actually free on your dates.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={whereToStayTokyoAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Shinjuku hotels on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Answer-first intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay in Tokyo?</h2>
          <p className={styles.bodyText}>
            <strong>Where to stay in Tokyo</strong> comes down to five areas, and for a first trip the
            answer is <strong>Shinjuku</strong>: it is a Yamanote loop stop, the terminus of the Chuo,
            Odakyu and Keio lines, and the place the Hakone Romancecar (<strong>approx. 80 minutes</strong>{" "}
            to Hakone-Yumoto, Odakyu&apos;s own figure) and the Kawaguchiko highway bus (
            <strong>approx. 1 hr 45 min</strong>, ¥2,200) leave from. Choose{" "}
            <strong>Tokyo Station / Marunouchi</strong> instead if your trip has shinkansen day trips in it —
            Kyoto is <strong>about 130 minutes</strong> from under the hotel — <strong>Ueno or Asakusa</strong>{" "}
            if you land at Narita, where Keisei puts the Skyliner at <strong>41 minutes</strong> to
            Keisei-Ueno, <strong>Shibuya</strong> for a second trip and the evenings, and{" "}
            <strong>Ginza</strong> for the shortest Haneda run: Higashi-ginza is{" "}
            <strong>23 minutes</strong> from Haneda Terminal 3 on a through train with no change.
          </p>
          <p className={styles.bodyText}>
            What follows is the comparison behind that, and what it deliberately leaves out. There are no
            hotel names, no room impressions and no nightly rates on this page: we cannot verify any of the
            three from here, and two of them change with your dates. Every journey time below carries the
            operator who published it and the date we read it.
          </p>
        </section>

        {/* Area comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Tokyo Areas Compared</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Read the third and fourth columns first. In Tokyo the area you pick is really a choice of which
            lines are under your hotel, and the difference between a good base and a bad one shows up on the
            morning you leave for a day trip or the evening you land.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Who it suits", "Stations & lines", "Verified journey times", "From the airport"].map((h) => (
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
                      <td style={{ fontSize: "0.85rem" }}>{row.times}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.airport}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {sourceNote} Journey times exclude the walk to and from the platform, and none of them is a
            guarantee for a particular departure.
          </p>
        </section>

        {/* Klook hotels — directly under the comparison, which is the point of the page. */}
        <KlookStayAreas
          heading="Where to Stay in Tokyo: Hotel Search by Area"
          intro="This is the step the comparison above cannot finish for you. Which rooms are left, at what price, is a per-date question, so each area below links straight into Klook's own hotel search for that district — set your dates and compare two or three of them against each other."
          areas={whereToStayTokyoAreas}
        />

        {/* Question headings */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>First trips</span>
          <h2 className={styles.sectionTitle}>What Is the Best Area to Stay in Tokyo for First-Timers?</h2>
          <p className={styles.bodyText}>
            <strong>Shinjuku</strong> — because more lines leave from it than from anywhere else, so a wrong
            guess about what you want to see costs you less. It is a Yamanote loop stop and the terminus of
            the Chuo, Odakyu and Keio lines, three subway lines run through it, and the expressway bus
            terminal is upstairs.
          </p>
          <p className={styles.bodyText}>
            The usual objection is that Shinjuku Station is overwhelming, and it is: it has more exits than
            any station most visitors have used. That is a two-day problem at most, and it buys you a base
            from which Hakone, the Fuji lakes, Kamakura and the whole of west Tokyo are a single ride. If you
            would rather not deal with it, Ueno is the gentler version of the same argument — smaller
            station, Yamanote loop, and the Keisei Skyliner from Narita arrives there faster than anywhere
            else in the city. Our{" "}
            <Link href="/guides/transport/tokyo-transportation">getting around Tokyo guide</Link> explains
            which lines the IC card and the subway pass actually cover.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Head to head</span>
          <h2 className={styles.sectionTitle}>Is Shinjuku or Shibuya Better to Stay In?</h2>
          <p className={styles.bodyText}>
            <strong>Shinjuku if this is your first trip, Shibuya if it is not.</strong> They are two stops
            apart on the Yamanote loop, so the sightseeing difference is close to nothing — what differs is
            what leaves from under you.
          </p>
          <p className={styles.bodyText}>
            Shinjuku has the Odakyu line to Hakone, the Chuo Rapid heading west, and the expressway bus
            terminal, which is why it wins for a trip with day trips in it. Shibuya has three subway lines,
            the Tokyu Toyoko to Yokohama, and SHIBUYA SKY inside the station complex — and it is closer to
            Haneda, 23 minutes from Terminal 3 against 30 to Shinjuku on Keikyu&apos;s estimates, read on{" "}
            {OWN}. If the sunset deck slot is the fixed point of your trip, our{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets">Shibuya Sky tickets guide</Link> covers how
            far ahead those slots go.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Where to Stay in Tokyo With Kids?</h2>
          <p className={styles.bodyText}>
            <strong>Ueno or Tokyo Station</strong>, and the reason is stairs rather than sights. Ueno puts
            the park, the zoo and the museums within walking distance, so a tired afternoon ends without a
            train; Tokyo Station means a day trip starts under the building rather than after a cross-city
            change with a pushchair.
          </p>
          <p className={styles.bodyText}>
            Two things change the answer. If Tokyo Disney is in the plan, the resort has its own hotel
            cluster at Maihama and the tickets are date-specified with no gate sales — our{" "}
            <Link href="/guides/attractions/tokyo-disney-tickets">Tokyo Disney tickets guide</Link> explains
            that first. And if your party is three or four people, filter by party size before you filter by
            area: standard Japanese hotel rooms are built for one or two, so the rooms that fit a family are
            a smaller share of what is listed.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day trips</span>
          <h2 className={styles.sectionTitle}>Where to Stay in Tokyo for Day Trips to Mt Fuji?</h2>
          <p className={styles.bodyText}>
            <strong>Shinjuku</strong>, clearly. The Fujikyu highway bus to Kawaguchiko Station is listed at
            approximately <strong>1 hour 45 minutes</strong> from Shinjuku at <strong>¥2,200</strong> for an
            adult, or ¥2,000 booked online — against about 130 minutes from Tokyo Station or Ueno and about
            120 minutes from Shibuya, both from ¥2,300. Read on {BUS_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Shinjuku is also where the Odakyu Romancecar leaves for Hakone: approximately 80 minutes to
            Hakone-Yumoto, with a ¥1,200 adult and ¥600 child limited express surcharge on top of the
            ordinary fare, read on {OWN}. Between them those two routes cover almost every mountain day a
            Tokyo trip can contain — the detail is in our{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo">Kawaguchiko day trip guide</Link>{" "}
            and our{" "}
            <Link href="/guides/attractions/hakone-free-pass">Hakone Free Pass guide</Link>. Both the bus and
            the Romancecar are reserved seats, which is the one thing on a Fuji day that genuinely has to be
            booked rather than turned up for.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Airports</span>
          <h2 className={styles.sectionTitle}>Which Area Is Closest to Haneda or Narita?</h2>
          <p className={styles.bodyText}>
            <strong>They pull in opposite directions</strong>, which is why the airport you land at is worth
            choosing the area on. For Haneda, Keikyu&apos;s own estimated times from Terminal 3 are Shinagawa
            11 minutes, Tokyo 20, Shibuya and Higashi-ginza 23 each, Shinjuku 30 and Asakusa 34; from
            Terminal 1·2 add about three minutes. Read on {OWN}.
          </p>
          <p className={styles.bodyText}>
            For Narita the answer flips east. Keisei puts the Skyliner at 41 minutes from Terminal 2·3 to
            Keisei-Ueno, which no other route into the city matches, while the Narita Express reaches Tokyo
            Station, Shibuya and Shinjuku without a transfer — &ldquo;as fast as 53 minutes&rdquo; to Tokyo
            Station at ¥3,140, and ¥3,330 to Shibuya or Shinjuku, read on {JR_CHECKED}. Our{" "}
            <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link> compares
            every route and fare, including what to do after the last train.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How Early Should You Book a Tokyo Hotel?</h2>
          <p className={styles.bodyText}>
            <strong>We do not publish a number, because nobody publishes one.</strong> Availability and
            price are per-hotel and per-date, so any &ldquo;book X weeks ahead&rdquo; figure would be
            invented. What is a published fact is the calendar you are booking against.
          </p>
          <p className={styles.bodyText}>
            Japan&apos;s Cabinet Office lists Showa Day on 29 April, Constitution Memorial Day on 3 May,
            Greenery Day on 4 May and Children&apos;s Day on 5 May — the Golden Week cluster — plus Mountain
            Day on 11 August, read on {OWN}. Those weeks, the New Year period, and the cherry-blossom and
            autumn-leaf weeks are when domestic demand lands on top of yours. The useful move is the
            opposite of guessing: open the area searches above for your actual dates and party size, and
            compare two or three districts against each other. That is the one part of this decision no
            summary can do for you, because it depends on a night that has not happened yet.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={whereToStayTokyoAreas[1].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Tokyo Station hotels on Klook →
            </KlookLink>
            <KlookLink href={whereToStayTokyoAreas[3].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Shibuya hotels on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Supporting Klook block — the airport tickets and the pass the area choice rides on. */}
        <KlookTripPrep
          label="Booked alongside"
          heading="What Else Does the Area You Pick Decide?"
          intro="Each of these follows from the area rather than the other way round: the airport ticket you want depends on which side of the city your hotel is, and the pass that pays off depends on whether your base is a JR station or a subway one."
          items={whereToStayTokyoTripPrep}
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
            <Link href="/guides/attractions/tokyo-night-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 3h14l-1 9a6 6 0 0 1-12 0z" />
                  <path d="M12 21v-3M8 21h8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Night Food Tour (2026): Omoide Yokocho, Golden Gai and the 20+ Rule</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l20-5-20-5v4l12 1-12 1z" />
                  <line x1="4" y1="21" x2="20" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.9 6.3 6.9.8-5 4.7 1.3 6.8L12 17.4l-6.1 3.2L7.2 13.8l-5-4.7 6.9-.8z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
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
              The comparison above gets you to two or three areas. Which rooms are left, and at what price,
              is a question only your dates can answer — so open the hotel search for each and compare them
              side by side.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={whereToStayTokyoAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check Shinjuku hotels on Klook →
              </KlookLink>
              <KlookLink href={whereToStayTokyoAreas[4].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Check Ginza hotels on Klook →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
