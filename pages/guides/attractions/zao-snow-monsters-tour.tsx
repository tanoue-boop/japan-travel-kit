import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  jrEastPass,
  mountZaoDestinationUrl,
  zaoGinzanDayTourFromSendai,
  zaoGinzanTwoDayOnsenTour,
  zaoSnowMonsterIlluminationTour,
  zaoSnowMonstersTripPrep,
  zaoTwoDayTourFromTokyo,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Zao snow monsters tour. Added 9 Nov 2026 (task-jtk-20261109-02), a winter page
 * published ahead of the January–February season.
 *
 * Official reads on 9 Nov 2026:
 *   zaoropeway.co.jp/winter/guide.php   Jizo Sancho Station (1,661 m) round trip ¥4,400 adult /
 *                                       ¥2,200 child, one way ¥2,200 / ¥1,100; Juhyo Kogen
 *                                       Station (1,331 m) round trip ¥2,200 / ¥1,100; adult =
 *                                       junior high school and over, child = elementary school;
 *                                       Sanroku line 8:30–17:00 (7 min), Sancho line 8:45–16:45
 *                                       (10 min), both "subject to change"; last upward departure
 *                                       for a round trip to Jizo Sancho 16:00; may stop for
 *                                       weather; closed for inspection 4–13 Nov 2026
 *   zaoropeway.co.jp/winter/juhyo.php   rime forms in Nov–Dec, grows from January, peak in
 *                                       February, melts in March; Jan–Feb average -10 to -15 °C
 *   yamagatakanko.com (STAY YAMAGATA)   visible December to February, peak February; 45 min by
 *                                       bus from Yamagata Station to Zao Onsen Bus Terminal,
 *                                       then about 10 min on foot to Zao Sanroku Station
 *   travel.yamagatakotsu.jp             Yamagata Station–Zao Onsen bus ¥1,200 adult / ¥600 child,
 *                                       no return discount; 13 departures, 6:50 to 18:55; the
 *                                       timetable rows run about 36–40 minutes
 *   yamagatakotsu.jp/highwaybus/post-9  Sendai–Zao winter highway bus: 2025–26 season 20 Dec 2025
 *                                       to 15 Mar 2026, seat reservation, ¥2,500 adult, Sendai
 *                                       Station East Exit 8:00 → Zao Onsen 9:25. No 2026–27 timetable
 *                                       was on the page.
 *   japan.travel (JNTO)                 Tokyo to Yamagata about 2.5 hours on the Yamagata Shinkansen
 *
 * Not printed: the 2026–27 light-up dates and hours (the ropeway site lists a light-up notice
 * dated 4 Oct 2026 with no dates in its text), any queue time, and any Klook price.
 */

const ROUTE = "/guides/attractions/zao-snow-monsters-tour";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-09");

const ropewayRows = [
  { leg: "Zao Sanroku → Jizo Sancho Station (1,661 m), round trip", adult: "¥4,400", child: "¥2,200", note: "The top station, where the snow monsters are. One way ¥2,200 / ¥1,100" },
  { leg: "Zao Sanroku → Juhyo Kogen Station (1,331 m), round trip", adult: "¥2,200", child: "¥1,100", note: "The middle station only. One way ¥1,200 / ¥600" },
  { leg: "Sanroku line (lower section)", adult: "8:30–17:00", child: "7 min", note: "Hours subject to change" },
  { leg: "Sancho line (upper section)", adult: "8:45–16:45", child: "10 min", note: "Hours subject to change" },
  { leg: "Last departure up, for a round trip to the top", adult: "16:00 from Zao Sanroku", child: "—", note: "The ropeway may stop in bad weather" },
];

const accessRows = [
  {
    from: "Tokyo",
    route: "Yamagata Shinkansen to Yamagata, then the Zao Onsen bus",
    time: "About 2.5 hours by train, then about 40–45 minutes by bus and a 10-minute walk",
    fare: "Bus ¥1,200 adult, ¥600 child. Shinkansen fare not printed here",
    source: "japan.travel; yamagatakotsu.jp; yamagatakanko.com",
  },
  {
    from: "Yamagata Station",
    route: "Yamagata Kotsu bus to Zao Onsen Bus Terminal",
    time: "Timetable rows about 36–40 minutes (STAY YAMAGATA gives 45); 13 departures, 6:50–18:55",
    fare: "¥1,200 adult, ¥600 child, no return discount",
    source: "travel.yamagatakotsu.jp; yamagatakanko.com",
  },
  {
    from: "Sendai",
    route: "Winter highway bus, Sendai Station East Exit to Zao Onsen (seat reservation)",
    time: "1 h 25 min (8:00 → 9:25 in the 2025–26 timetable)",
    fare: "¥2,500 adult in 2025–26. The 2026–27 timetable was not yet on the operator's page",
    source: "yamagatakotsu.jp",
  },
  {
    from: "Zao Onsen Bus Terminal",
    route: "On foot to Zao Sanroku Station (Zao Ropeway)",
    time: "About 10 minutes",
    fare: "—",
    source: "yamagatakanko.com",
  },
];

const tourRows = [
  {
    tour: "Ginzan Onsen & Zao Snow Monsters day tour",
    from: "Sendai",
    days: "1 day",
    includes: "Zao Ropeway to the snow monsters, Ginzan Onsen, a lunch named in the title",
    night: "No",
    url: zaoGinzanDayTourFromSendai.url,
  },
  {
    tour: "Snow monster illumination tour",
    from: "Sendai Station",
    days: "Evening, listed at 6 hours",
    includes: "Round-trip transfer and the heated Nightcruiser snow vehicle among the lit-up trees; no English-speaking guide",
    night: "Yes",
    url: zaoSnowMonsterIlluminationTour.url,
  },
  {
    tour: "Ginzan Onsen, Zao & Fox Village 2-day tour",
    from: "Check the listing",
    days: "2 days, 1 night",
    includes: "A night at an onsen hotel with breakfast and dinner, the snow monsters, Ginzan Onsen, the Zao Fox Village",
    night: "No",
    url: zaoGinzanTwoDayOnsenTour.url,
  },
  {
    tour: "2-day tour from Tokyo with Yamadera",
    from: "Tokyo",
    days: "2 days",
    includes: "Ginzan Onsen, the snow monsters, the Yamadera mountain temple and the Zao Fox Village",
    night: "No",
    url: zaoTwoDayTourFromTokyo.url,
  },
];

const faqItems = [
  {
    q: "When can you see the Zao snow monsters?",
    a: `From December to early March, at their largest in February. Zao Ropeway's own page says the rime starts forming in November and December, grows from January, peaks in February and melts in March; Yamagata's official tourism site gives December to February with the peak in February. Read ${OWN}.`,
  },
  {
    q: "Where do you see the Zao snow monsters?",
    a: "From the Zao Ropeway at Zao Onsen, Yamagata. Ride the Sanroku line (7 minutes) to Juhyo Kogen Station, then the Sancho line (10 minutes) to Jizo Sancho Station at 1,661 m, where the trees are. A round trip to the top is ¥4,400 for an adult and ¥2,200 for a child.",
  },
  {
    q: "How do you get to the Zao snow monsters from Tokyo?",
    a: "Take the Yamagata Shinkansen to Yamagata (about 2.5 hours), then the Yamagata Kotsu bus to Zao Onsen Bus Terminal (¥1,200, about 40–45 minutes), then walk about 10 minutes to the ropeway. A day trip leaves little time at the top, so most visitors from Tokyo either stay a night or take a two-day tour.",
  },
  {
    q: "Can you see Zao and Ginzan Onsen in one day?",
    a: "From Sendai, yes: the Ginzan Onsen & Zao Snow Monsters day tour does both in one day. From Tokyo, the tours on Klook that combine the two are two-day tours.",
  },
  {
    q: "What happens if the ropeway stops for wind?",
    a: "The ropeway states that it may stop in bad weather. On the Sendai day tour, the listing says the plan changes to a footbath at Zao Onsen and the ¥3,000 ropeway fee is refunded, and that the Zao Chuo Ropeway is used if the Zao Ropeway cannot be booked. Each tour sets its own terms, so check the listing for your date.",
  },
  {
    q: "What should you wear to see the snow monsters?",
    a: "Full winter gear. Zao Ropeway gives an average of -10 to -15 °C at the top in January and February, and asks visitors to come fully protected against the cold: a warm waterproof outer layer, a hat, gloves and boots with grip.",
  },
  {
    q: "Is the night illumination worth it?",
    a: "It is a different view rather than a better one: the trees are lit after dark, and the Nightcruiser snow vehicle goes in among them. The Sendai illumination tour includes the transfer both ways. The official sources checked do not give the 2026–27 light-up dates yet, so check the listing for your date.",
  },
  {
    q: "Is a Zao snow monsters tour suitable for children?",
    a: "The ropeway sells child fares (¥2,200 round trip to the top, for elementary school age). The cold at the top is the limit to plan around; each tour lists its own age rules, so check the listing before booking.",
  },
];

const TITLE = "Zao Snow Monsters Tour (2026–27): Season, Ropeway and Tours";
const DESCRIPTION =
  "Zao snow monsters tour guide: when the Zao juhyo peak, the ¥4,400 ropeway, getting there from Tokyo or Sendai, and which snow monsters Japan tour to book.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function ZaoSnowMonstersTourPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Zao Snow Monsters Tour", item: URL },
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
          <span className={styles.breadCurrent}>Zao Snow Monsters Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Zao Snow Monsters Tour (2026–27):<br />When to Go, the Ropeway, and Which Tour to Book
          </h1>
          <p className={styles.heroSubtitle}>
            The rime-frozen trees of Zao, Yamagata, at the top of a two-stage ropeway. The season, the fares, the
            routes from Tokyo and Sendai, and the four kinds of tour.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares & hours, dated", "Tokyo and Sendai routes", "Tours compared"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Season</p>
                <p className={styles.verdictStatValue}>December to early March, peak February</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Zao Ropeway, Jizo Sancho Station (1,661 m)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Ropeway</p>
                <p className={styles.verdictStatValue}>¥4,400 adult round trip</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Tokyo</p>
                <p className={styles.verdictStatValue}>2-day tour, or shinkansen + bus</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Zao snow monsters tour</strong> goes to Zao Onsen in Yamagata, where the frozen trees
              (<em>juhyo</em>) stand from <strong>December to early March, at their largest in February</strong>.
              You see them from the top of the <strong>Zao Ropeway</strong>: 7 minutes on the lower line and 10 on
              the upper one to Jizo Sancho Station at 1,661 m, <strong>¥4,400</strong> round trip for an adult
              (zaoropeway.co.jp, read {OWN}). Tokyo is about 2.5 hours away by shinkansen plus 40–45 minutes by bus,
              so a day trip leaves little time at the top: the usual choices are a <strong>day tour from
              Sendai</strong> or a <strong>two-day tour from Tokyo</strong>, both paired with Ginzan Onsen.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={zaoGinzanDayTourFromSendai.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Day tour from Sendai →
              </KlookLink>
              <KlookLink href={zaoTwoDayTourFromTokyo.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                2-day tour from Tokyo →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Season */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Season</span>
          <h2 className={styles.sectionTitle}>When Can You See the Zao Snow Monsters?</h2>
          <p className={styles.bodyText}>
            <strong>From December to early March, best in February.</strong> Zao Ropeway&apos;s own page describes
            the cycle: supercooled droplets in the snow clouds freeze onto the fir branches in November and December,
            snow packs into the gaps, the trees grow through January, reach their peak in February, and start to melt
            and collapse in March. Yamagata&apos;s official tourism site, STAY YAMAGATA, gives December to February
            with the peak in February. How big they are on a given week depends on the weather before it, so a
            late-January or February date is the safest. Read {OWN}.
          </p>
          <p className={styles.bodyText}>
            The ropeway is closed for its autumn inspection from 4 to 13 November 2026, before the winter season.
          </p>
        </section>

        {/* Ropeway */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Ropeway</span>
          <h2 className={styles.sectionTitle}>How Much Is the Zao Ropeway, and When Does It Run?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>¥4,400 round trip for an adult</strong> to Jizo Sancho Station, the top, and ¥2,200 for a child
            (elementary school age; adult means junior high school and over). The trip is two lines with a change at
            Juhyo Kogen Station. The last upward departure for a round trip to the top is <strong>16:00</strong>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket / line", "Adult (or hours)", "Child (or ride time)", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ropewayRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            zaoropeway.co.jp, fares and hours page, read {OWN}. The hours are marked as subject to change. Some
            tours include the ropeway ticket and some leave it to you to pay on the day; check the listing for what
            yours includes.
          </p>
        </section>

        {/* Access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to the Zao Snow Monsters from Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Take the <strong>Yamagata Shinkansen to Yamagata</strong> (about 2.5 hours), the{" "}
            <strong>Yamagata Kotsu bus to Zao Onsen</strong> (¥1,200, about 40–45 minutes), and walk about 10
            minutes to the ropeway. From Sendai, a seat-reserved winter highway bus runs straight to Zao Onsen.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["From", "Route", "Time", "Fare", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.from}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.from}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.8rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            All read {OWN}. The bus journey time is read off the operator&apos;s timetable rows, which do not state
            one; STAY YAMAGATA gives 45 minutes. The Sendai highway bus runs in winter only, and its page still showed
            the 2025–26 season (20 December 2025 to 15 March 2026) when it was read, so check the 2026–27 dates
            before relying on it.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Is a rail pass worth it?</strong> Both the Yamagata Shinkansen and the Tohoku Shinkansen to
            Sendai are JR East lines, so a trip that adds Sendai, Ginzan Onsen or Nikko may suit the JR EAST PASS.
            Our <Link href="/guides/transport/jr-east-pass">JR East Pass guide</Link> does the arithmetic.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrEastPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR EAST PASS →
            </KlookLink>
          </div>
        </section>

        {/* Tours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tours</span>
          <h2 className={styles.sectionTitle}>Which Zao Snow Monsters Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Pick by where you start.</strong> Already in Sendai: the day tour with Ginzan Onsen, or the
            evening illumination tour. Starting in Tokyo: a two-day tour, which adds a night at an onsen and Ginzan
            Onsen without a second long transfer.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Departs", "Length", "What it covers", "Night light-up", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.from}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.days}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.includes}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.night}</td>
                      <td style={{ fontSize: "0.85rem" }}>
                        <KlookLink href={row.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          Check dates →
                        </KlookLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From each Klook listing, read {OWN}. No price is printed, because Klook prices change by date. Meeting
            points, cancellation windows and what happens if the ropeway stops are set per listing.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={mountZaoDestinationUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              All Mount Zao tours on Klook →
            </KlookLink>
          </div>
        </section>

        {/* One day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Zao + Ginzan Onsen</span>
          <h2 className={styles.sectionTitle}>Can You See Zao and Ginzan Onsen in One Day?</h2>
          <p className={styles.bodyText}>
            <strong>From Sendai, yes</strong>, on a tour: the Ginzan Onsen &amp; Zao Snow Monsters day tour does
            the ropeway and the old hot-spring street in one day. On your own it is harder, because Ginzan Onsen and
            Zao Onsen are far apart and each is reached by its own bus. <strong>From Tokyo</strong>, the
            tours on Klook that combine the two are two-day tours, with a night at an onsen hotel in between. For the onsen street itself, its winter shuttle and staying the night, see the{" "}
            <Link href="/guides/attractions/ginzan-onsen-tour">Ginzan Onsen tour guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={zaoGinzanDayTourFromSendai.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Ginzan & Zao day tour (Sendai) →
            </KlookLink>
            <KlookLink href={zaoGinzanTwoDayOnsenTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              2-day tour with onsen hotel →
            </KlookLink>
          </div>
        </section>

        {/* Wind */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Weather</span>
          <h2 className={styles.sectionTitle}>What Happens If the Ropeway Stops for Wind?</h2>
          <p className={styles.bodyText}>
            The ropeway states plainly that it may stop in bad weather, and in mid-winter that is mostly wind. What
            happens next depends on the tour. On the Sendai day tour, the listing says the plan changes to a footbath
            at Zao Onsen and the <strong>¥3,000 ropeway fee is refunded</strong>, and that the Zao Chuo Ropeway, a
            separate line from the same village, is used if the Zao Ropeway cannot be booked. The same listing says
            the trees may not be visible in poor weather and that the tour runs either way. Other tours set their own
            terms; check the listing for your date. Going on your own, the ropeway&apos;s site shows each line&apos;s
            status on the day.
          </p>
        </section>

        {/* Clothing */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What to wear</span>
          <h2 className={styles.sectionTitle}>What Should You Wear to See the Snow Monsters?</h2>
          <p className={styles.bodyText}>
            <strong>Full winter gear.</strong> Zao Ropeway gives an average of <strong>-10 to -15 °C</strong> at the
            top in January and February, says it can fall lower, and asks visitors to come fully protected against
            the cold. That means a warm, windproof and waterproof outer layer, a hat that covers the ears, gloves,
            and boots with grip for the snow at the top station. Skis and snowboards cannot be taken up to ski
            down from the snow-monster area.
          </p>
        </section>

        {/* Night */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Night light-up</span>
          <h2 className={styles.sectionTitle}>Is the Night Illumination Worth It?</h2>
          <p className={styles.bodyText}>
            It is a different view rather than a better one. After dark the trees are lit, and the Nightcruiser snow
            vehicle goes in among them, which the daytime ropeway does not. The Sendai illumination tour, listed at
            six hours, includes the transfer both ways, which matters because the last buses back from Zao Onsen
            leave in the evening. The ropeway posted a light-up notice on 4 October 2026, but the official sources
            checked do not give the 2026–27 dates or hours yet. There is no fixed sell-out date, because it moves with
            the weekday and the snow; check the listing for your date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={zaoSnowMonsterIlluminationTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Illumination tour from Sendai →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book with the tour"
          heading="Book These on the Same Day as Your Zao Tour"
          intro="The two-day tour from Tokyo, the rail pass for going on your own, a bed near Tokyo Station and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={zaoSnowMonstersTripPrep}
        />

        {/* Children */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>With children</span>
          <h2 className={styles.sectionTitle}>Is a Zao Snow Monsters Tour Suitable for Children?</h2>
          <p className={styles.bodyText}>
            The ropeway sells a child fare (¥2,200 round trip to the top, for elementary school age). The cold at the
            top is the limit to plan around. Each tour lists its own age rules and whether it carries child seats, so
            check the listing before booking.
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
          heading="Zao Snow Monster Tours on Klook"
          intro="Two from Sendai and two over two days. Durations, meeting points and inclusions are on each listing."
          tours={[zaoGinzanDayTourFromSendai, zaoSnowMonsterIlluminationTour, zaoGinzanTwoDayOnsenTour, zaoTwoDayTourFromTokyo]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/ginzan-onsen-tour", title: "Ginzan Onsen Tour (2026–27): Day Trip, Winter and Gas Lamps" },
              { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary" },
              { href: "/guides/attractions/jigokudani-snow-monkey-tour", title: "Jigokudani Snow Monkey Tour" },
              { href: "/guides/transport/jr-east-pass", title: "JR East Pass (2026): Price, Coverage and Is It Worth It?" },
              { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7-Day Itinerary" },
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
            <h2 className={styles.ctaBannerTitle}>February is the month for the snow monsters</h2>
            <p className={styles.ctaBannerDesc}>
              From Sendai, one day with Ginzan Onsen. From Tokyo, two days with a night at an onsen.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={zaoGinzanDayTourFromSendai.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Day Tour from Sendai →
              </KlookLink>
              <KlookLink href={zaoTwoDayTourFromTokyo.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                2-Day Tour from Tokyo →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
