import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA link — Klook affiliate redirect.
const NIKKO_TOUR_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1309223&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F20405-nikko-cultural-day-tour-tokyo%2F";

const compareRows = [
  {
    option: "DIY by train",
    cost: "Tobu limited express from Asakusa, ~2 hours each way",
    flexibility: "Total — set your own pace and route",
    effort: "Medium — train, then local buses up to the falls and lake",
  },
  {
    option: "Guided day tour",
    cost: "Higher — bus tour from Tokyo, ~2.5 hours each way",
    flexibility: "Fixed route & timings",
    effort: "Very low — transport, guide and the main stops handled",
  },
];

const whoFor = [
  {
    title: "Do it yourself if…",
    desc: "You want flexibility and don't mind connecting from the train to local buses. The Tobu line runs direct from Asakusa to Nikko in about two hours, and from there buses climb the Irohazaka switchbacks up to Lake Chuzenji and Kegon Falls.",
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
    desc: "You'd rather see Toshogu Shrine, Kegon Falls and Lake Chuzenji in one efficient day without juggling timetables. Tours from Tokyo bundle the round-trip transport, an English-speaking guide and the mountain drive into a single booking.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Stay overnight if…",
    desc: "You want the hot springs and a slower trip. Nikko has its own onsen, and nearby Edo Wonderland recreates an Edo-period town. With a night in town you can pair the shrines and the falls with a relaxed soak instead of rushing both into one day.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 13c0-2 1.5-3 2.5-4.5C10.5 7 10 5 9 4c3 1 6 3 6 7a3 3 0 0 1-6 0" />
        <path d="M5 21h14" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Travel from Tokyo to Nikko",
    desc: "The classic route is the Tobu Nikko Line from Asakusa, with limited express trains reaching Tobu-Nikko Station in roughly two hours. JR also runs to Nikko via the Tohoku Shinkansen and a local connection. A guided bus tour takes about two and a half hours but removes all the planning.",
  },
  {
    title: "Visit Toshogu Shrine",
    desc: "Toshogu is the lavishly decorated mausoleum of Tokugawa Ieyasu, founder of the Edo shogunate, and a UNESCO World Heritage Site. The complex sits in a cedar forest a short bus ride or walk from the station, alongside other shrines and temples in the same wooded area.",
  },
  {
    title: "Cross the Shinkyo Bridge and head for the mountains",
    desc: "The vermilion Shinkyo Bridge marks the traditional entrance to Nikko's shrine area. From the town, buses climb the hairpin Irohazaka winding road up to the higher Oku-Nikko region — the road's curves are famous for autumn colour.",
  },
  {
    title: "See Kegon Falls and Lake Chuzenji",
    desc: "Kegon Falls drops about 97 metres and is counted among Japan's three most famous waterfalls. It is fed by Lake Chuzenji, which sits at the foot of Mt. Nantai. An elevator runs to a viewing platform near the base of the falls.",
  },
];

const faqItems = [
  {
    q: "How do I get to Nikko from Tokyo?",
    a: "The most popular route is the Tobu Nikko Line from Asakusa Station in Tokyo, with limited express services reaching Tobu-Nikko in about two hours. You can also go via JR, combining the Tohoku Shinkansen with a local line. Alternatively, a guided bus tour from central Tokyo takes roughly two and a half hours each way and handles all the connections for you.",
  },
  {
    q: "What is there to see in Nikko?",
    a: "Nikko's headline sight is Toshogu Shrine, the ornate UNESCO-listed mausoleum of Tokugawa Ieyasu, set among towering cedars. Up in the mountains are Kegon Falls — about 97 metres tall and one of Japan's three most famous waterfalls — and Lake Chuzenji at the foot of Mt. Nantai. The vermilion Shinkyo Bridge and the winding Irohazaka road are landmarks in their own right.",
  },
  {
    q: "Can you do Nikko as a day trip from Tokyo?",
    a: "Yes. Nikko is one of the most popular day trips from Tokyo. With an early start you can see Toshogu Shrine in the morning and reach Kegon Falls and Lake Chuzenji in the afternoon before heading back. Doing it independently takes careful timing of trains and mountain buses, which is why many visitors take a guided tour that fits the shrine, the falls and the lake into one organised day.",
  },
  {
    q: "How tall is Kegon Falls?",
    a: "Kegon Falls drops about 97 metres and is regarded as one of Japan's three most famous waterfalls. It is fed by Lake Chuzenji, which lies at the foot of Mt. Nantai in the higher Oku-Nikko area above the town. A paid elevator descends to a viewing platform near the base for a close-up look.",
  },
  {
    q: "Is Nikko better by train or on a guided tour?",
    a: "Going by train is flexible and lets you linger, but you'll need to connect from the Tobu or JR line to local buses up the Irohazaka switchbacks to reach the falls and lake. A guided tour costs more yet ties Toshogu, Kegon Falls and Lake Chuzenji together in one smooth day with transport and a guide included. Choose DIY for freedom and a tour for convenience.",
  },
  {
    q: "What food is Nikko known for?",
    a: "Nikko is famous for yuba (tofu skin), which appears in many local dishes from simple sashimi-style servings to yuba over rice. The town also has its own hot springs, and nearby Edo Wonderland is a theme park recreating an Edo-period townscape — both good reasons to consider staying overnight rather than rushing through in a single day.",
  },
];

export default function NikkoDayTripPage() {
  return (
    <>
      <Head>
        <title>Nikko Day Trip from Tokyo (2026): Toshogu Shrine, Kegon Falls &amp; How to Get There | Japan Travel Kit</title>
        <meta
          name="description"
          content="Nikko day trip from Tokyo in 2026: the UNESCO Toshogu Shrine, the 97-metre Kegon Falls, Lake Chuzenji and the Shinkyo Bridge. Train times, prices, and tour vs DIY."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/nikko-day-trip" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Nikko Day Trip from Tokyo (2026): Toshogu Shrine, Kegon Falls & How to Get There" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/nikko-day-trip" />
        <meta property="og:description" content="Nikko day trip from Tokyo in 2026: the UNESCO Toshogu Shrine, the 97-metre Kegon Falls, Lake Chuzenji and the Shinkyo Bridge. Train times, prices, and tour vs DIY." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nikko Day Trip from Tokyo (2026): Toshogu Shrine, Kegon Falls & How to Get There" />
        <meta name="twitter:description" content="Nikko day trip from Tokyo in 2026: the UNESCO Toshogu Shrine, the 97-metre Kegon Falls, Lake Chuzenji and the Shinkyo Bridge. Train times, prices, and tour vs DIY." />
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
              headline: "Nikko Day Trip from Tokyo (2026): Toshogu Shrine, Kegon Falls & How to Get There",
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
                { "@type": "ListItem", position: 4, name: "Nikko Day Trip", item: "https://www.japan-travel-kit.com/guides/attractions/nikko-day-trip" },
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
          <span className={styles.breadCurrent}>Nikko Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>⛩️</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Nikko Day Trip from Tokyo (2026):<br />Toshogu Shrine, Kegon Falls &amp; How to Get There
          </h1>
          <p className={styles.heroSubtitle}>
            About two hours north of Tokyo: a UNESCO-listed shrine in a cedar forest, a 97-metre waterfall, and
            a mountain lake. Here&apos;s how to do it yourself by train — or by guided tour.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "UNESCO World Heritage", "Train or Tour"].map((t) => (
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
                <p className={styles.verdictStatValue}>~2 hrs by Tobu from Asakusa</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Toshogu Shrine</p>
                <p className={styles.verdictStatValue}>UNESCO, Tokugawa Ieyasu</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kegon Falls</p>
                <p className={styles.verdictStatValue}>~97 m, Lake Chuzenji</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting around</p>
                <p className={styles.verdictStatValue}>Train + buses up Irohazaka</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Nikko pairs a lavish UNESCO shrine with mountain scenery just two hours
              from Tokyo. Go by Tobu train for flexibility, then ride local buses up to Kegon Falls and Lake
              Chuzenji — or take a guided tour that fits all three into one efficient day.
            </p>
            <a href={NIKKO_TOUR_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Browse Nikko Day Tours →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Nikko Makes a Great Day Trip</h2>
          <p className={styles.bodyText}>
            Nikko, in Tochigi Prefecture north of Tokyo, packs two very different experiences into one trip: a
            forested cluster of historic shrines and temples around Toshogu, and a mountain landscape of
            waterfalls and a high lake above the town. The shrine area is UNESCO-listed, and the drive up into
            the hills delivers some of the Kanto region&apos;s best scenery.
          </p>
          <p className={styles.bodyText}>
            The two anchors of any visit are Toshogu Shrine — the ornate mausoleum of Tokugawa Ieyasu, founder of
            the Edo shogunate — and Kegon Falls, a roughly 97-metre cascade fed by Lake Chuzenji. Add the
            vermilion Shinkyo Bridge and the hairpin Irohazaka road, and you have a full day. Below we compare
            doing it by train versus a guided tour, then lay out a simple route.
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
            Fares and tour prices are as of 2026 and subject to change — confirm at booking. English-guided day
            tours from Tokyo typically cover Toshogu, Kegon Falls and Lake Chuzenji with round-trip transport.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>How Should You Do Nikko?</h2>
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
          <h2 className={styles.sectionTitle}>A Simple Nikko Route</h2>
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
          <h2 className={styles.sectionTitle}>Trains, Buses &amp; the Irohazaka Road</h2>
          <p className={styles.bodyText}>
            The simplest approach is the Tobu Nikko Line limited express from Asakusa, reaching Tobu-Nikko in
            about two hours; JR also connects via the Tohoku Shinkansen and a local line. From the station,
            local buses climb the Irohazaka switchbacks to the higher Oku-Nikko area for Kegon Falls and Lake
            Chuzenji. Time the buses carefully if you go independently, as services thin out later in the day.
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
            <Link href="/guides/attractions/kamakura-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kamakura Day Trip from Tokyo (2026): Great Buddha, Temples &amp; How to Get There</p>
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
            <h2 className={styles.ctaBannerTitle}>Plan your Nikko day</h2>
            <p className={styles.ctaBannerDesc}>
              Going independently by train is flexible, but the buses up to the falls take planning. If
              you&apos;d rather have Toshogu, Kegon Falls and Lake Chuzenji handled in one day, a guided tour
              from Tokyo does the route for you.
            </p>
            <a href={NIKKO_TOUR_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              Browse Nikko Day Tours →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
