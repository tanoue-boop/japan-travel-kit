import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  fujiDayTour,
  fujiHakoneDayTour,
  fujiSubaruLineHakoneBusTour,
  fujiHakoneBulletTrainTour,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// Tour contents and durations below are as the Klook listings describe them, checked 19 Oct 2026.
// Klook answers automated requests to its product pages with HTTP 403, so no price is quoted here.
const CHECKED = "19 October 2026";

const tourRows = [
  {
    tour: "Fuji Fifth Station, Lake Kawaguchi, Oshino Hakkai & Gotemba",
    covers: "The Fifth Station plus the lake, the spring-water village and an outlet-mall stop",
    length: "Full day, returns to Tokyo the same evening",
    url: fujiDayTour.url,
    best: "The most sightseeing stops per day",
  },
  {
    tour: "Mt. Fuji & Hakone day tour",
    covers: "Fifth Station, the Owakudani volcanic valley with a cable-car descent, and a Lake Ashi cruise",
    length: "Listed as around 11 hours",
    best: "Two destinations in one day",
    url: fujiHakoneDayTour.url,
  },
  {
    tour: "Fuji Subaru Line 5th Station, Lake Ashi & Hakone join-in bus",
    covers: "A join-in coach version of the same Fuji-and-Hakone pairing",
    length: "Full day from Tokyo",
    best: "Lower-cost coach seat",
    url: fujiSubaruLineHakoneBusTour.url,
  },
  {
    tour: "Mt. Fuji & Hakone with bullet-train return",
    covers: "Fifth Station, Owakudani and Lake Ashi, with a shinkansen option for the trip back",
    length: "Full day from Tokyo",
    best: "Shorter, more comfortable return leg",
    url: fujiHakoneBulletTrainTour.url,
  },
];

const whoFor = [
  {
    title: "Take a Fuji-only tour if…",
    desc: "The mountain is the point and you want time at the lake. The Fifth Station, Lake Kawaguchi and Oshino Hakkai sit close together on the north side, so a Fuji-only day is a relaxed one with real stops rather than a sequence of coach transfers.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18l6-13 5 8 3-4 4 9z" />
        <line x1="2" y1="21" x2="22" y2="21" />
      </svg>
    ),
  },
  {
    title: "Take a Fuji + Hakone tour if…",
    desc: "You have one spare day and want two destinations out of it. The combined tours add the Owakudani volcanic valley, a cable car and a Lake Ashi cruise — around 11 hours on the listing we checked, which is a long day but a full one.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
        <path d="M5 12l4-7 4 6 2-2 4 5z" />
      </svg>
    ),
  },
  {
    title: "Go independently instead if…",
    desc: "You would rather set your own pace and are happy changing trains and buses. Hakone in particular is well covered by the Hakone Freepass, which turns the whole loop into one ticket. Fuji's Fifth Station is harder to reach without a tour or a hire car.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide whether you want Fuji only or Fuji plus Hakone",
    desc: "This is the real choice, and it sets the length of your day. A Fuji-only tour spends the time on the north side of the mountain; a combined tour trades some of that for Hakone's volcanic valley and lake cruise, at the cost of a longer day on a coach.",
  },
  {
    title: "Check what the Fifth Station actually is on your date",
    desc: `The Fuji Subaru Line Fifth Station is the highest point on the mountain reachable by road — the listing we checked describes it as 2,300 m above sea level. It is a viewpoint and a cluster of shops, not a summit: the official climbing season for Mt. Fuji ends on 10 September, and the trails above are closed in winter. Checked ${CHECKED}.`,
  },
  {
    title: "Accept that the view is weather-dependent",
    desc: "No tour can promise you the mountain. Fuji is frequently in cloud, and visibility tends to be better in the cooler, drier months and earlier in the day. Operators run the tour regardless, so book the day for the stops as well as the summit view.",
  },
  {
    title: "Book a date, in English, on a card that works",
    desc: "These are date-specified coach departures with limited seats, and the popular dates go first. Klook checks out in English and takes foreign cards, which matters because several Japanese operators' own booking pages do not handle either comfortably.",
  },
  {
    title: "Work out how you are getting to the pickup point",
    desc: "Most Tokyo departures leave from Shinjuku or near Tokyo Station early in the morning. Check which, and plan the first subway or JR ride of the day around it — missing a coach departure is not a recoverable mistake.",
  },
];

const faqItems = [
  {
    q: "Is a Mt. Fuji day tour from Tokyo worth it?",
    a: "For most visitors with one spare day, yes — mainly because the alternative is harder than it looks. The Fuji Subaru Line Fifth Station is not reachable by train, so going independently means a bus connection or a hire car, and the stops around the mountain are spread out. A coach tour collapses that into a single booking. The caveat is the weather: the mountain is often in cloud, and no tour can guarantee you see it.",
  },
  {
    q: "What is the Fuji Subaru Line Fifth Station?",
    a: `It is the highest point on Mt. Fuji that can be reached by road, and the point almost every day tour from Tokyo stops at — the Klook listing we checked describes it as 2,300 m above sea level. It is a viewpoint with shops and restaurants, not the summit. Mt. Fuji's official climbing season ends on 10 September, and the trails above the Fifth Station are closed in winter, so a day tour is a visit to the mountainside rather than a climb. Checked ${CHECKED}.`,
  },
  {
    q: "How long is a Mt. Fuji day tour from Tokyo?",
    a: `Expect a full day. The Mt. Fuji and Hakone combined tour we checked is listed at around 11 hours, and the Fuji-only tours return to Tokyo the same evening. Departures are early morning from central Tokyo. If your schedule is tight, a day tour is a whole day gone — not a half-day excursion. Durations as listed on ${CHECKED}.`,
  },
  {
    q: "Should I pick a Fuji-only tour or a Fuji and Hakone tour?",
    a: "Fuji-only tours stay on the north side of the mountain and usually take in Lake Kawaguchi and the spring-water village of Oshino Hakkai, which makes for a less rushed day with actual time at each stop. Fuji-and-Hakone tours add the Owakudani volcanic valley, a cable car and a cruise on Lake Ashi, but the day is longer and more of it is spent moving. Pick the combined tour if this is your only free day; pick Fuji-only if you would rather see less of it properly.",
  },
  {
    q: "Can I see Mt. Fuji on the tour if it is cloudy?",
    a: "Not reliably. Fuji makes its own weather and is in cloud a great deal of the time, especially in the warmer, more humid months. Visibility is generally better in the cooler, drier part of the year and earlier in the day. Tours run in any weather, so the sensible approach is to choose a tour whose other stops — the lake, the volcanic valley, the cruise — you would be happy with on their own.",
  },
  {
    q: "Can I do Mt. Fuji as a day trip without a tour?",
    a: "You can get to the Lake Kawaguchi area independently by highway bus or train, and from there a bus runs up the Subaru Line in season. It takes planning, the connections are not frequent, and a mistimed return leg can strand you. Hakone is the easier of the two to do alone, because the Hakone Freepass covers the whole loop of train, cable car, ropeway, bus and cruise on one ticket.",
  },
  {
    q: "Do I need a JR Pass for a Mt. Fuji day tour?",
    a: "No. Day tours from Tokyo travel by coach, and the fare is in the tour price — a rail pass buys you nothing on the journey. One exception is the tours that offer a shinkansen return leg to Tokyo, where a pass may cover that segment. If you are weighing a rail pass for the rest of your trip, our JR Pass guide works through the break-even.",
  },
  {
    q: "Where do Mt. Fuji day tours depart from in Tokyo?",
    a: "Most depart early in the morning from Shinjuku or the Tokyo Station area; the exact meeting point is on the listing you book. Confirm it when you book and plan the first leg of your day around it, because coach departures do not wait. The Tokyo Subway Ticket covers Metro and Toei lines if your pickup point is on one of them, but not JR.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/mt-fuji-day-tour-from-tokyo") } });

const TITLE = "Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See";
const DESC =
  "Comparing Mt. Fuji day tours from Tokyo for 2026: Fuji-only versus Fuji and Hakone, what the Subaru Line Fifth Station is, how long the day runs, and how to book from abroad.";

export default function MtFujiDayTourFromTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/mt-fuji-day-tour-from-tokyo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/mt-fuji-day-tour-from-tokyo" />
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Mt. Fuji Day Tour From Tokyo",
                  item: "https://www.japan-travel-kit.com/guides/attractions/mt-fuji-day-tour-from-tokyo",
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
          <span className={styles.breadCurrent}>Mt. Fuji Day Tour From Tokyo</span>
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
            Mt. Fuji Day Tour From Tokyo (2026):<br />Which Tour, and What You Actually See
          </h1>
          <p className={styles.heroSubtitle}>
            Every tour stops at the Subaru Line Fifth Station. What separates them is whether the rest of the
            day is Fuji or Hakone — and how long you are prepared to spend on a coach.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Fuji-only vs Fuji + Hakone", "What the Fifth Station is"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Day length</p>
                <p className={styles.verdictStatValue}>Up to ~11 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Main stop</p>
                <p className={styles.verdictStatValue}>Subaru Line 5th Station</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Departs</p>
                <p className={styles.verdictStatValue}>Early AM, central Tokyo</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fuji view</p>
                <p className={styles.verdictStatValue}>Never guaranteed</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> if this is your only spare day, take a Fuji-and-Hakone tour and get two
              destinations out of it. If you would rather see fewer things properly, take a Fuji-only tour that
              includes Lake Kawaguchi and Oshino Hakkai. Either way the day runs to about eleven hours and the
              mountain may be in cloud — choose a tour whose other stops you would still enjoy.
            </p>
            <a href={fujiHakoneDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Mt. Fuji day tours on Klook →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Nearly Everyone Takes a Tour</h2>
          <p className={styles.bodyText}>
            Mt. Fuji is about two hours from Tokyo by road and effectively unreachable by train at the point
            visitors want to stand. There is no station at the Fifth Station: the Fuji Subaru Line is a toll
            road, and getting up it independently means a bus connection from the Kawaguchiko area, running to a
            timetable that does not forgive a late start.
          </p>
          <p className={styles.bodyText}>
            That is why the day-tour market around Fuji is so large, and why the tours look so similar at first
            glance. They all stop at the Fifth Station. The difference is what they do with the other six hours
            — and that is the thing worth choosing on.
          </p>
        </section>

        {/* Tour comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Four Mt. Fuji Day Tours From Tokyo</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "What it covers", "Length", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider}>
                        <a href={row.url} target="_blank" rel="sponsored noopener" className={styles.tdLink}>
                          {row.tour}
                        </a>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Contents and durations are as the Klook listings described them on {CHECKED}. We do not quote prices
            here: Klook blocks automated reads of its product pages, so there is no figure we could have
            verified — open a listing for the current price on your date.
          </p>
        </section>

        {/* Who for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which day</span>
          <h2 className={styles.sectionTitle}>Which Kind of Day Suits You?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            If the Hakone half is what interests you most, it is also the half that works best on your own —
            see our <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone day trip guide</Link> for
            the Freepass prices and how the loop fits together.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book a Mt. Fuji Day Tour</h2>
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
            For the rail side of the trip — whether a pass is worth it at all, and how the shinkansen return
            option on some tours fits in — see our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> and{" "}
            <Link href="/guides/transport/tokyo-transportation">getting around Tokyo</Link>.
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
          heading="The Tours Compared Above"
          intro="All four depart Tokyo and stop at the Subaru Line Fifth Station. Open a listing to see the price and the departure point for your date."
          tours={[fujiHakoneDayTour, fujiDayTour, fujiSubaruLineHakoneBusTour, fujiHakoneBulletTrainTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
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
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M7 20h10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>One spare day, two destinations</h2>
            <p className={styles.ctaBannerDesc}>
              The Fuji-and-Hakone tours pair the Subaru Line Fifth Station with the Owakudani valley and a Lake
              Ashi cruise. Klook checks out in English and takes foreign cards.
            </p>
            <a href={fujiHakoneDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Mt. Fuji day tours on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
