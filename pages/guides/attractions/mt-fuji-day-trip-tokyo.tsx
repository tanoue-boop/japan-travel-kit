import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  tokyoMtFujiHighwayBus,
  mtFujiPass,
  fujiPhotographyDayTour,
  fujiDayTour,
} from "../../../lib/klook-links";

// Mt. Fuji Pass prices and conditions read off bus.fujikyu.co.jp/mtpass/en on 19 Oct 2026.
// Fuji Excursion journey time and frequency from Klook's own Fuji Excursion rail page the
// same day — Klook answers automated reads of its *product* pages with HTTP 403, so no tour
// or ticket price is quoted here.
const CHECKED = "19 October 2026";

const routeRows = [
  {
    route: "Fuji Excursion limited express",
    from: "Shinjuku, direct to Kawaguchiko",
    time: "Around 1 hr 45 min",
    notes: "Up to four services a day each way, all seats reserved — book the seat, not just the day",
  },
  {
    route: "Highway bus",
    from: "Shinjuku, Tokyo Station, Shibuya and others",
    time: "Listed as within 3 hours",
    notes: "More departures than the train, and it also runs to Fuji-Q Highland and Fujisan Station",
  },
  {
    route: "JR Chuo Line + Fujikyu Railway",
    from: "Shinjuku via Otsuki",
    time: "Longer, with a change at Otsuki",
    notes: "The fallback when the direct services are full; the Fujikyu leg is private, so a rail pass stops at Otsuki",
  },
];

const passRows = [
  { pass: "Mt. Fuji Pass, 1 day", adult: "¥7,500", child: "¥3,750" },
  { pass: "Mt. Fuji Pass, 2 day", adult: "¥10,200", child: "¥5,100" },
  { pass: "Mt. Fuji Pass, 3 day", adult: "¥12,400", child: "¥6,200" },
];

const whoFor = [
  {
    title: "Go independently if…",
    desc: "You want to choose your own viewpoints and stay as long as you like at each. The direct train puts you in Kawaguchiko in under two hours, and local buses fan out from the station to the lake, Oshino Hakkai and the Chureito Pagoda steps. This is the version where you decide when to leave.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
  {
    title: "Take a tour instead if…",
    desc: "The Fuji Subaru Line Fifth Station is on your list. There is no train to it, and reaching it independently means another bus connection on a thin timetable. A coach tour collapses the whole day into one booking — our tour comparison covers which itineraries go where.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M3 11h18" />
        <circle cx="7.5" cy="19" r="1.5" />
        <circle cx="16.5" cy="19" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Buy the Mt. Fuji Pass if…",
    desc: `You are making three or more bus hops around the Five Lakes, or adding the ropeway and the lake cruise. It is sold to foreign passport holders only and costs ¥7,500 for one day, so it is a question of how much you plan to move rather than a default purchase. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
        <path d="M13 6v2M13 11v2M13 16v2" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Book the outbound leg before anything else",
    desc: "Every seat on the Fuji Excursion is reserved and there are only around four services a day each way, so the train decides your day rather than the other way round. The highway bus has more departures and is the easier thing to get at short notice — it is also the thing that sits in traffic.",
  },
  {
    title: "Pick your viewpoint, because they are not close together",
    desc: "Arakurayama Sengen Park (the Chureito Pagoda) is on the Fujikyu line a few stops short of Kawaguchiko. Oishi Park sits across the lake. Oshino Hakkai is a bus ride inland. Two of these in a day is comfortable; four is a day spent on buses.",
  },
  {
    title: "Work out whether you need the pass",
    desc: `The Mt. Fuji Pass covers unlimited buses and trains around the Mt. Fuji area plus admission to several facilities, and is sold only to foreign passport holders, with a passport check at purchase. One day is ¥7,500 for an adult and ¥3,750 for ages 6–11. Two or three single bus fares will not reach that; a full day of hopping plus the ropeway and the cruise will. Prices read off the official Fujikyu site on ${CHECKED}.`,
  },
  {
    title: "Accept that the mountain may not appear",
    desc: "Fuji makes its own weather and is in cloud a great deal of the time. Visibility is generally better in the cooler, drier part of the year and earlier in the day. Nobody can sell you a guarantee, so plan a day whose other stops — the lake, the spring-water ponds, the villages — you would be happy with regardless.",
  },
  {
    title: "Plan the return leg at the same time as the outbound",
    desc: "This is the step people skip. The last useful direct services back to Tokyo leave in the late afternoon and early evening, and a missed reservation on a thin timetable turns a day trip into an overnight stay. Fix the return before you start sightseeing.",
  },
];

const faqItems = [
  {
    q: "Can you do Mt. Fuji as a day trip from Tokyo without a tour?",
    a: `Yes, as long as the Lake Kawaguchi area is what you want rather than the mountain itself. The Fuji Excursion limited express runs direct from Shinjuku to Kawaguchiko in roughly 1 hour 45 minutes, with up to four services a day in each direction, and highway buses cover the same journey within three hours from several Tokyo terminals. From Kawaguchiko Station, local buses reach the lake, Oshino Hakkai and the Chureito Pagoda. Journey times checked ${CHECKED}.`,
  },
  {
    q: "What can't you reach independently?",
    a: "The Fuji Subaru Line Fifth Station, realistically. It is the highest point on the mountain reachable by road and the stop almost every coach tour is built around, but there is no station there and getting up the toll road means a further bus connection on a limited timetable. If standing on the mountainside is the point of your day, a tour is the sensible route — see our Mt. Fuji day tour comparison for what the itineraries actually cover.",
  },
  {
    q: "How long does a Mt. Fuji day trip take?",
    a: `A full day, not a half day. The fastest direct leg is around 1 hour 45 minutes each way, so three and a half hours are spoken for before you have seen anything, and the viewpoints around Lake Kawaguchi are spread out enough that moving between two of them takes a real bite out of the afternoon. Treat it as the only thing you do that day. Journey time checked ${CHECKED}.`,
  },
  {
    q: "Is the Mt. Fuji Pass worth buying?",
    a: `It depends entirely on how much you intend to move. The pass covers unlimited buses and trains around the Mt. Fuji area plus entry to several facilities, and costs ¥7,500 for one day, ¥10,200 for two and ¥12,400 for three for an adult aged 12 and over, with half price for ages 6–11. It is sold to foreign travellers only and your passport is checked at purchase. A single out-and-back bus trip from Kawaguchiko Station will not justify it; a day of lake-shore hops with the ropeway and the sightseeing cruise added will. Prices read off the official Fujikyu site on ${CHECKED}.`,
  },
  {
    q: "Does a JR Pass cover the trip to Kawaguchiko?",
    a: "Only part of it. The Fuji Excursion runs over JR track as far as Otsuki and then continues onto the Fujikyu Railway, which is a private line and not covered by a Japan Rail Pass — you pay the Fujikyu portion separately, plus the limited-express charge. If you are weighing a rail pass for the rest of your trip, our JR Pass guide works through the break-even.",
  },
  {
    q: "When is the best time of year for a clear view of Fuji?",
    a: "The cooler, drier months give better odds than the warm, humid ones, and early in the day is generally better than the afternoon. That is a tendency rather than a promise: the mountain is in cloud a great deal of the time in any season, and the forecast for Tokyo tells you very little about what the summit is doing. Check a Kawaguchiko-area forecast the night before and choose stops you would enjoy without the view.",
  },
  {
    q: "Can you climb Mt. Fuji on a day trip?",
    a: "No. The official climbing season runs only to 10 September, the ascent is an overnight undertaking for most people, and the trails above the Fifth Station are closed outside the season. A day trip from Tokyo is a visit to the viewpoints around the mountain, or at most to the Fifth Station by road — not a climb.",
  },
  {
    q: "Kawaguchiko or Hakone for a day out of Tokyo?",
    a: "Kawaguchiko if you want to look at Fuji; Hakone if you want a day out that happens to have Fuji in the background. Kawaguchiko has the pagoda, the lake and the spring-water village, and is the better side of the mountain for photographs. Hakone is a hot-spring area with a volcanic valley, a ropeway and a lake cruise, and the Hakone Freepass bundles the whole loop onto one ticket — which makes it the easier of the two to do independently.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/mt-fuji-day-trip-tokyo") } });

const TITLE = "Mt. Fuji Day Trip From Tokyo (2026): How to Get There Yourself";
const DESC =
  "Doing Mt. Fuji from Tokyo under your own steam in 2026: the direct train and bus to Kawaguchiko, which viewpoints are reachable without a tour, official Mt. Fuji Pass prices, and what a coach is still needed for.";

export default function MtFujiDayTripTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/mt-fuji-day-trip-tokyo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/mt-fuji-day-trip-tokyo" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: TITLE,
              dateModified: updated.iso,
              author: { "@type": "Organization", name: "Japan Travel Kit", url: "https://www.japan-travel-kit.com" },
              publisher: { "@type": "Organization", name: "Japan Travel Kit", url: "https://www.japan-travel-kit.com" },
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
                { "@type": "ListItem", position: 4, name: "Mt. Fuji Day Trip From Tokyo", item: "https://www.japan-travel-kit.com/guides/attractions/mt-fuji-day-trip-tokyo" },
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
          <span className={styles.breadCurrent}>Mt. Fuji Day Trip From Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🗻</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Mt. Fuji Day Trip From Tokyo (2026):<br />How to Get There Yourself
          </h1>
          <p className={styles.heroSubtitle}>
            A direct train puts you at Lake Kawaguchi in under two hours. What that buys you, what it does
            not reach, and whether the Mt. Fuji Pass earns its ¥7,500.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Train & bus routes", "Official pass prices"].map((t) => (
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
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
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
                <p className={styles.verdictStatLabel}>Shinjuku → Kawaguchiko</p>
                <p className={styles.verdictStatValue}>~1 hr 45 min direct</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Direct trains per day</p>
                <p className={styles.verdictStatValue}>Up to 4 each way</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Mt. Fuji Pass, 1 day</p>
                <p className={styles.verdictStatValue}>¥7,500 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Needs a tour</p>
                <p className={styles.verdictStatValue}>Subaru Line 5th Station</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> going independently works well if the Lake Kawaguchi side is what
              you want — the Fuji Excursion runs direct from Shinjuku in about an hour and three-quarters,
              and local buses handle the rest. Book the reserved seat early, because there are only around
              four services a day each way. The one thing you cannot do on your own is the Fifth Station on
              the mountain itself; that needs a coach.
            </p>
            <a href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Tokyo–Mt. Fuji bus seats on Klook →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What &ldquo;Mt. Fuji in a Day&rdquo; Actually Means</h2>
          <p className={styles.bodyText}>
            There are two different trips sharing one name. One is a day around Lake Kawaguchi on the north
            side of the mountain — the Chureito Pagoda, the lake shore, the spring-water ponds at Oshino
            Hakkai — all of it reachable by public transport and entirely doable on your own. The other is a
            drive up the Fuji Subaru Line to the Fifth Station, on the mountain itself, which has no railway
            station and a bus timetable that does not forgive a late start.
          </p>
          <p className={styles.bodyText}>
            This guide is about the first one. If the Fifth Station is what you pictured, read our{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo">Mt. Fuji day tour comparison</Link>{" "}
            instead — it covers which coach itineraries go where and how long each day runs.
          </p>
        </section>

        {/* Routes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>Three Ways to Reach Kawaguchiko</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "From", "Journey time", "What to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.from}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Fuji Excursion journey time and frequency as listed on Klook&apos;s Fuji Excursion rail page on{" "}
            {CHECKED}; the highway bus duration is as the Klook listing describes it. Fares are deliberately
            absent — Klook blocks automated reads of its product pages, so open a listing for the price on
            your date. For how the Tokyo end of the journey works, see our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              Getting Around Tokyo guide
            </Link>.
          </p>
        </section>

        {/* Who for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which version</span>
          <h2 className={styles.sectionTitle}>Independently, by Tour, or With the Pass?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pass prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The pass</span>
          <h2 className={styles.sectionTitle}>Mt. Fuji Pass Prices</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Mt. Fuji Pass bundles unlimited buses and trains around the Mt. Fuji area with entry to a
            number of leisure facilities. Two conditions matter before you compare it against single fares:
            it is sold to foreign travellers only, and your passport is checked at the point of purchase.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Adult (12+)", "Child (6–11)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td className={styles.tdPrice}>{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Read off the official Fujikyu Mt. Fuji Pass site on {CHECKED}. Subject to change — confirm before
            you buy.
          </p>
        </section>

        {/* Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>Planning the Day Yourself</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            On the rail side, note that the Fujikyu Railway portion of the journey is a private line and not
            covered by a Japan Rail Pass — our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works through whether a pass
            earns its price across the rest of a trip. If you would rather pair Fuji with a hot-spring day,{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone</Link> is the easier of the
            two to do without a tour.
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
          heading="Booking the Fuji Side of the Trip"
          intro="The transport and the pass for an independent day, plus the two coach options for the parts public transport does not reach. Open a listing for the current price on your date."
          tours={[tokyoMtFujiHighwayBus, mtFujiPass, fujiPhotographyDayTour, fujiDayTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
                  <path d="M5 12l4-7 4 6 2-2 4 5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Day Trip From Tokyo (2026): Freepass Prices vs a Day Tour</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nikko-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M6 21V9l6-4 6 4v12" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nikko Day Trip From Tokyo (2026): Getting There, Costs &amp; Tours</p>
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
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Lock in the Kawaguchiko leg</h2>
            <p className={styles.ctaBannerDesc}>
              The direct train runs only a handful of times a day and every seat is reserved, so the bus is
              the more forgiving booking. Klook checks out in English and takes foreign cards.
            </p>
            <a href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Tokyo–Mt. Fuji bus tickets on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
