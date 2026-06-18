import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA link — build-ahead. Plain Klook search link for now.
// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const KAMAKURA_TOUR_URL = "https://www.klook.com/en-US/search/?query=Kamakura%20Enoshima%20day%20trip%20Tokyo";

const compareRows = [
  {
    option: "DIY by train",
    cost: "~¥920 each way from Tokyo (JR Pass valid)",
    flexibility: "Total — linger or leave as you like",
    effort: "Low — one direct JR line, then walk or ride the Enoden",
  },
  {
    option: "Guided day tour",
    cost: "Higher — paid tour, often Kamakura plus Enoshima",
    flexibility: "Fixed route & timings",
    effort: "Very low — transport, guide and stops sorted",
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
    desc: "From Tokyo Station the JR Yokosuka Line runs direct to Kamakura, and from Shinjuku the JR Shonan-Shinjuku Line does the same — about 50–60 minutes and roughly ¥920 one way. Both are covered by the Japan Rail Pass if you hold one.",
  },
  {
    title: "See the Great Buddha at Kotoku-in",
    desc: "The bronze Great Buddha (Daibutsu) at Kotoku-in stands about 11.4 metres tall (around 13.4 metres including the base), was cast in 1252, and has sat in the open air since a 1498 tsunami swept away its hall. It's a National Treasure; admission is around ¥300, with a small extra charge to step inside the statue.",
  },
  {
    title: "Walk to Hase-dera",
    desc: "A 5–7 minute walk away, Hase-dera (admission ¥400, founded in 736) is set on a hillside with an eleven-headed Kannon, the Benten-kutsu cave, countless small Jizo statues, and a viewpoint over the sea. It's open year-round and is the hydrangea highlight in mid-June. Hase Station is about a 5-minute walk from the temple.",
  },
  {
    title: "Ride the Enoden and explore central Kamakura",
    desc: "The retro Enoden tram hugs the coast at roughly 12–15 minute intervals; Kamakura to Hase is just a few minutes. Back in the centre, Tsurugaoka Hachimangu shrine, the food-stall street of Komachi-dori, and the bamboo grove and tea house at Hokoku-ji round out the day.",
  },
];

const faqItems = [
  {
    q: "How do I get to Kamakura from Tokyo?",
    a: "Kamakura is about an hour from Tokyo. The JR Yokosuka Line runs direct from Tokyo Station, and the JR Shonan-Shinjuku Line connects from Shinjuku — both take roughly 50–60 minutes and cost around ¥920 each way. If you have a Japan Rail Pass, the journey is covered, which makes Kamakura one of the easiest day trips from the capital.",
  },
  {
    q: "What is there to see in Kamakura?",
    a: "The headline sights are the bronze Great Buddha at Kotoku-in and the hillside temple of Hase-dera, a short walk apart near the coast. In central Kamakura you'll find the Tsurugaoka Hachimangu shrine, the food-stall street of Komachi-dori, and the bamboo grove at Hokoku-ji. The seaside Enoden tram ties it together and is an experience in itself.",
  },
  {
    q: "How much does it cost to see the Great Buddha and Hase-dera?",
    a: "Admission to Kotoku-in, home of the Great Buddha, is around ¥300, with a small additional charge to view the interior of the statue. Hase-dera costs ¥400 to enter. Prices are as of 2026 and subject to change, so confirm on arrival. Both are within a 5–7 minute walk of each other near Hase Station.",
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

export default function KamakuraDayTripPage() {
  return (
    <>
      <Head>
        <title>Kamakura Day Trip from Tokyo (2026): Great Buddha, Temples &amp; How to Get There | Japan Travel Kit</title>
        <meta
          name="description"
          content="Kamakura day trip from Tokyo in 2026: the bronze Great Buddha at Kotoku-in, Hase-dera, the coastal Enoden tram and central shrines. Train times, prices, and tour vs DIY."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kamakura-day-trip" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Kamakura Day Trip from Tokyo (2026): Great Buddha, Temples & How to Get There" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kamakura-day-trip" />
        <meta property="og:description" content="Kamakura day trip from Tokyo in 2026: the bronze Great Buddha at Kotoku-in, Hase-dera, the coastal Enoden tram and central shrines. Train times, prices, and tour vs DIY." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kamakura Day Trip from Tokyo (2026): Great Buddha, Temples & How to Get There" />
        <meta name="twitter:description" content="Kamakura day trip from Tokyo in 2026: the bronze Great Buddha at Kotoku-in, Hase-dera, the coastal Enoden tram and central shrines. Train times, prices, and tour vs DIY." />
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
              headline: "Kamakura Day Trip from Tokyo (2026): Great Buddha, Temples & How to Get There",
              dateModified: "2026-06-18",
              author: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
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
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🪷</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Kamakura Day Trip from Tokyo (2026):<br />Great Buddha, Temples &amp; How to Get There
          </h1>
          <p className={styles.heroSubtitle}>
            An hour from Tokyo by train: the open-air bronze Great Buddha, the hillside temple of Hase-dera, and a
            retro tram along the coast. Here&apos;s how to do it yourself — or by guided tour.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "~1 Hour from Tokyo", "Train or Tour"].map((t) => (
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
                <p className={styles.verdictStatLabel}>From Tokyo</p>
                <p className={styles.verdictStatValue}>~1 hour, ~¥920 each way</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Great Buddha</p>
                <p className={styles.verdictStatValue}>Kotoku-in, ~¥300</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hase-dera</p>
                <p className={styles.verdictStatValue}>¥400, hydrangeas in June</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting around</p>
                <p className={styles.verdictStatValue}>Walk + coastal Enoden tram</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Kamakura is one of the easiest day trips from Tokyo — a direct JR line,
              a National-Treasure Great Buddha, seaside temples, and a retro tram. Go by train for budget and
              flexibility, or take a guided tour that pairs it with Enoshima if you&apos;d rather not plan.
            </p>
            <a href={KAMAKURA_TOUR_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Browse Kamakura Day Tours →
            </a>
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Fares and tour prices are as of 2026 and subject to change — confirm at booking. Many guided options
            combine Kamakura with the nearby island of Enoshima.
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
            Line from Shinjuku — both around 50–60 minutes for roughly ¥920 one way, and both valid with the Japan
            Rail Pass. Once you arrive, the coastal Enoden tram links the central station with Hase (for the Great
            Buddha and Hase-dera) in just a few minutes.
          </p>
          <p className={styles.bodyText}>
            For more on lines, IC cards, and passes around the wider region, see our{" "}
            <Link href="/guides/transport" style={{ color: "var(--red)", fontWeight: 600 }}>
              transport guides
            </Link>.
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Things to Do in Tokyo (2026): Tickets, Attractions &amp; Experiences</p>
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
                <p className={styles.relatedTitle}>Mt Fuji Day Trip from Tokyo (2026): Tours, Routes &amp; Tips</p>
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
                <p className={styles.relatedTitle}>Nara Day Trip (2026): Deer Park, Todai-ji &amp; How to Get There</p>
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
            <h2 className={styles.ctaBannerTitle}>Plan your Kamakura day</h2>
            <p className={styles.ctaBannerDesc}>
              Going independently by train is cheap and easy. If you&apos;d rather have the route and transport
              handled — and often Enoshima added on — a guided day tour from Tokyo does the planning for you.
            </p>
            <a href={KAMAKURA_TOUR_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              Browse Kamakura Day Tours →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
