import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { kamakuraEnoshimaDayTourUrl, tokyoSubwayTicket, tokyoSightseeingBusTour } from "../../../lib/klook-links";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";

// CTA link — Klook affiliate redirect (tracking link, listing confirmed live 19 Oct 2026),
// shared with the ticket price table.
const KAMAKURA_TOUR_URL = kamakuraEnoshimaDayTourUrl;

// Admissions and hours read off kotoku-in.jp and hasedera.jp; tour duration as the Klook
// listing describes it. All checked 19 Oct 2026. Rail fares are not quoted: JR East's fare
// tables are not readable by an automated request, and an IC card shows you the figure at
// the gate anyway.
// Both admissions and the check date are owned by lib/attraction-prices.ts, shared with
// the ticket price table.
const CHECKED = checkedLabel(PRICES.kotokuin.checked);

const compareRows = [
  {
    option: "DIY by train",
    cost: "One direct JR line, 50–60 minutes each way, and a rail pass covers it",
    flexibility: "Total — linger or leave as you like",
    effort: "Low — one train, then walk or ride the Enoden",
  },
  {
    option: "Guided day tour",
    cost: "One booking that usually adds Enoshima; the listing we checked runs 10.3 hours",
    flexibility: "Fixed route & timings",
    effort: "Very low — transport, guide and stops sorted",
  },
];

const admissionRows = [
  {
    site: "Kotoku-in (Great Buddha)",
    adult: PRICES.kotokuin.adult,
    child: `${PRICES.kotokuin.child} (ages 6–12)`,
    note: "+¥50 to step inside the statue; under 6 free",
  },
  {
    site: "Hase-dera",
    adult: PRICES.hasedera.adult,
    child: `${PRICES.hasedera.child} (${PRICES.hasedera.childAges})`,
    note: "08:00–17:00, to 17:30 April–June; last entry 30 min earlier",
  },
];

const whoFor = [
  {
    title: "Do it yourself if…",
    desc: "You want the cheapest, most flexible version. Kamakura is about an hour from Tokyo on a single JR line, and the headline sights are walkable or a short hop apart on the coastal Enoden tram — easy to navigate at your own pace.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
  {
    title: "Take a guided tour if…",
    desc: "You'd rather cover more without planning. Many tours pair Kamakura with nearby Enoshima island, bundling the transport, an English-speaking guide, and the key temple stops into one smooth day out from Tokyo.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Go in June if…",
    desc: "You love hydrangeas. Hase-dera's slopes are famous for them in mid-June, when the temple gets busy. Any time of year, the seaside setting, the Great Buddha and the bamboo of Hokoku-ji make Kamakura a rewarding coastal contrast to the city.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 5a3 3 0 0 0-3 3M12 5a3 3 0 0 1 3 3M5 12a3 3 0 0 0 3 3M5 12a3 3 0 0 1 3-3M19 12a3 3 0 0 1-3 3M19 12a3 3 0 0 0-3-3M12 19a3 3 0 0 1-3-3M12 19a3 3 0 0 0 3-3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Take the train from Tokyo",
    desc: "From Tokyo Station the JR Yokosuka Line runs direct to Kamakura, and from Shinjuku the JR Shonan-Shinjuku Line does the same — about 50 to 60 minutes. Both are JR lines, so a Japan Rail Pass covers them, and an IC card handles the fare if you do not hold one. That combination is what makes Kamakura the least fiddly day trip out of Tokyo.",
  },
  {
    title: "See the Great Buddha at Kotoku-in",
    desc: `The bronze Great Buddha (Daibutsu) sits in the open air at Kotoku-in and is a National Treasure. Admission is ¥300 for an adult and ¥150 for ages 6 to 12, with under-sixes free, and stepping inside the statue costs a further ¥50 per person. The temple opens at 8:00 and closes at 17:30 from April to September and 17:00 from October to March; the statue's interior closes at 16:30 year round. Checked ${CHECKED}.`,
  },
  {
    title: "Walk to Hase-dera",
    desc: `A 5 to 7 minute walk away, Hase-dera is set on a hillside with an eleven-headed Kannon, the Benten-kutsu cave, countless small Jizo statues and a viewpoint over the sea. Admission is ¥400 for an adult and ¥200 for ages 6 to 11. It opens at 8:00, closing at 17:00 from July to March and 17:30 from April to June, with last entry half an hour earlier — the longer hours fall in the hydrangea season, which is not a coincidence. Checked ${CHECKED}.`,
  },
  {
    title: "Ride the Enoden and explore central Kamakura",
    desc: "The retro Enoden tram hugs the coast at roughly 12–15 minute intervals; Kamakura to Hase is just a few minutes. Back in the centre, Tsurugaoka Hachimangu shrine, the food-stall street of Komachi-dori, and the bamboo grove and tea house at Hokoku-ji round out the day.",
  },
];

const faqItems = [
  {
    q: "How do I get to Kamakura from Tokyo?",
    a: "Kamakura is about an hour from Tokyo and needs no planning beyond turning up. The JR Yokosuka Line runs direct from Tokyo Station and the JR Shonan-Shinjuku Line from Shinjuku, both taking roughly 50 to 60 minutes. Because both are JR lines, a Japan Rail Pass covers the journey outright, and without one an IC card works at the gate — there is no reservation to make and no private-railway surcharge to work out.",
  },
  {
    q: "What is there to see in Kamakura?",
    a: "The headline sights are the bronze Great Buddha at Kotoku-in and the hillside temple of Hase-dera, a short walk apart near the coast. In central Kamakura you'll find the Tsurugaoka Hachimangu shrine, the food-stall street of Komachi-dori, and the bamboo grove at Hokoku-ji. The seaside Enoden tram ties it together and is an experience in itself.",
  },
  {
    q: "How much does it cost to see the Great Buddha and Hase-dera?",
    a: `Very little, which is part of Kamakura's appeal. Kotoku-in, home of the Great Buddha, is ¥300 for an adult and ¥150 for ages 6 to 12, plus ¥50 per person to step inside the statue. Hase-dera is ¥400 for an adult and ¥200 for ages 6 to 11. The two are a 5 to 7 minute walk apart near Hase Station, so the headline pair of sights comes to ¥700 for an adult. Read off each temple's official site on ${CHECKED} and subject to change.`,
  },
  {
    q: "Is Kamakura better by train or on a guided tour?",
    a: "Going by train is the cheapest and most flexible option — Kamakura is close, the main sights are walkable or a short Enoden ride apart, and you set your own pace. A guided tour costs more but often pairs Kamakura with nearby Enoshima island and handles all the transport and stops. Choose DIY for budget and freedom, a tour for convenience.",
  },
  {
    q: "When is the best time to visit Kamakura?",
    a: "Kamakura is good year-round, but mid-June is special for the hydrangeas at Hase-dera, which draw crowds. Spring and autumn bring pleasant weather and seasonal colour, while the coastal setting makes summer appealing too. Whenever you go, start early to enjoy the Great Buddha and Hase-dera before the day-trippers arrive.",
  },
  {
    q: "What is the Enoden, and why is it famous?",
    a: "The Enoden (Enoshima Electric Railway) is a charming retro tram that runs along the coast between Kamakura and Fujisawa, with services roughly every 12–15 minutes. The ride from Kamakura to Hase is only a few minutes. The line is well known for its seaside views and for the Kamakurakokomae railway crossing, a much-photographed coastal spot.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/kamakura-day-trip") } });

export default function KamakuraDayTripPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Kamakura Day Trip From Tokyo (2026): Great Buddha, Hase-dera &amp; the Fares | Japan Travel Kit</title>
        <meta
          name="description"
          content="Kamakura day trip from Tokyo in 2026: the direct JR line a rail pass already covers, official admissions for Kotoku-in and Hase-dera, the Enoden tram, and whether a guided tour adds anything."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kamakura-day-trip" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Kamakura Day Trip From Tokyo (2026): Great Buddha, Hase-dera and the Fares" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kamakura-day-trip" />
        <meta property="og:description" content="Kamakura day trip from Tokyo in 2026: the direct JR line a rail pass already covers, official admissions for Kotoku-in and Hase-dera, the Enoden tram, and whether a guided tour adds anything." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kamakura Day Trip From Tokyo (2026): Great Buddha, Hase-dera and the Fares" />
        <meta name="twitter:description" content="Kamakura day trip from Tokyo in 2026: the direct JR line a rail pass already covers, official admissions for Kotoku-in and Hase-dera, the Enoden tram, and whether a guided tour adds anything." />
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
              route: "/guides/attractions/kamakura-day-trip",
              headline: "Kamakura Day Trip From Tokyo (2026): Great Buddha, Hase-dera and the Fares",
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
                { "@type": "ListItem", position: 4, name: "Kamakura Day Trip", item: "https://www.japan-travel-kit.com/guides/attractions/kamakura-day-trip" },
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
          <span className={styles.breadCurrent}>Kamakura Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Kamakura Day Trip From Tokyo (2026):<br />Great Buddha, Hase-dera &amp; the Fares
          </h1>
          <p className={styles.heroSubtitle}>
            An hour from Tokyo by train: the open-air bronze Great Buddha, the hillside temple of Hase-dera, and a
            retro tram along the coast. Here&apos;s how to do it yourself — or by guided tour.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "~1 Hour from Tokyo", "Train or Tour"].map((t) => (
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
                <p className={styles.verdictStatLabel}>From Tokyo</p>
                <p className={styles.verdictStatValue}>50–60 min, one direct JR line</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Great Buddha</p>
                <p className={styles.verdictStatValue}>¥300 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hase-dera</p>
                <p className={styles.verdictStatValue}>¥400 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Rail pass</p>
                <p className={styles.verdictStatValue}>Covers the whole journey</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Kamakura is the day trip that needs the least planning of any out of
              Tokyo. One direct JR line gets you there in under an hour, a Japan Rail Pass covers it outright,
              and the two headline sights — the open-air Great Buddha and the hillside temple of Hase-dera —
              are a seven-minute walk apart and come to ¥700 between them for an adult. Take a tour only if
              you want Enoshima added on and would rather not think about it.
            </p>
            <KlookLink href={KAMAKURA_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Browse Kamakura Day Tours →
            </KlookLink>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Kamakura Is Such an Easy Escape</h2>
          <p className={styles.bodyText}>
            Once the seat of Japan&apos;s medieval shogunate, Kamakura is now a relaxed seaside town of temples,
            shrines, and tree-lined hills — and it sits barely an hour from Tokyo. That closeness, combined with a
            cluster of genuinely famous sights and a coastal tram that&apos;s a joy to ride, makes it one of the
            most popular day trips in the country.
          </p>
          <p className={styles.bodyText}>
            The two must-sees are the open-air bronze Great Buddha and the hillside temple of Hase-dera, a short
            walk apart. Add the central shrine of Tsurugaoka Hachimangu, the snack street of Komachi-dori, and the
            bamboo grove at Hokoku-ji, and you have a full, varied day. Below we compare doing it yourself versus a
            guided tour, then lay out a simple route.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Train vs tour</span>
          <h2 className={styles.sectionTitle}>DIY by Train vs a Guided Tour</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Cost", "Flexibility", "Effort"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.flexibility}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.effort}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Tour duration as the Klook listing described it on {CHECKED}. We do not quote a tour price here —
            Klook blocks automated reads of its product pages, so open the listing for the figure on your
            date. Rail fares are not quoted either; an IC card shows you the amount at the gate, and a{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan Rail Pass
            </Link>{" "}
            covers the journey entirely.
          </p>
        </section>

        {/* Admissions */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it costs</span>
          <h2 className={styles.sectionTitle}>Admissions for the Two Main Sights</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Site", "Adult", "Child", "Hours and extras"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {admissionRows.map((row) => (
                    <tr key={row.site}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.site}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off kotoku-in.jp and hasedera.jp on {CHECKED}. Kotoku-in opens at 8:00 and closes at 17:30
            from April to September and 17:00 from October to March, with the statue&apos;s interior closing at
            16:30 year round. Subject to change — confirm before you go.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>How Should You Do Kamakura?</h2>
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

        {/* Route / steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>A Simple Kamakura Route</h2>
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
        </section>

        {/* Getting there note */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>Trains, Passes &amp; the Enoden</h2>
          <p className={styles.bodyText}>
            The simplest approach is the direct JR Yokosuka Line from Tokyo Station, or the JR Shonan-Shinjuku
            Line from Shinjuku — both around 50 to 60 minutes, and both valid with a Japan Rail Pass. Once you
            arrive, the coastal Enoden tram links the central station with Hase, for the Great Buddha and
            Hase-dera, in just a few minutes.
          </p>
          <p className={styles.bodyText}>
            For how IC cards and the Tokyo end of the journey work, see{" "}
            <Link href="/guides/transport/tokyo-transportation">getting around Tokyo</Link>, and our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> for whether a pass pays across
            your whole trip. If you would rather spend the day on a mountain than a coastline,{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone</Link> and{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo">Lake Kawaguchi</Link> are the other two
            easy days out of Tokyo.
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
          heading="Booking the Kamakura Day"
          intro="The guided version, which usually adds Enoshima, plus the two Tokyo-end bookings worth having in place. Open a listing for the current price on your date."
          tours={[
            {
              title: "Kamakura & Enoshima day trip from Tokyo",
              desc: "Tsurugaoka Hachimangu, Hase-dera, the Great Buddha and Enoshima on a guided coach, listed at 10.3 hours",
              url: KAMAKURA_TOUR_URL,
            },
            tokyoSubwayTicket,
            tokyoSightseeingBusTour,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Karuizawa Day Trip From Tokyo (2026): Shinkansen Times and the Five Stops</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20h18L14 7l-3 5-2-3z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Trip From Tokyo (2026): How to Get There Yourself</p>
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
                <p className={styles.relatedTitle}>Nikko Day Trip From Tokyo (2026): Getting There, Costs &amp; Whether to Take a Tour</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
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
            <h2 className={styles.ctaBannerTitle}>Plan your Kamakura day</h2>
            <p className={styles.ctaBannerDesc}>
              Going independently by train is cheap and easy. If you&apos;d rather have the route and transport
              handled — and often Enoshima added on — a guided day tour from Tokyo does the planning for you.
            </p>
            <KlookLink href={KAMAKURA_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              Browse Kamakura Day Tours →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
