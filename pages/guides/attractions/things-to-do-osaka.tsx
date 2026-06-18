import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// Pillar page — no external CTA. Internal links aggregated below.

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const faqItems = [
  {
    q: "What are the best things to do in Osaka?",
    a: "Osaka's highlights include Osaka Castle, the neon-lit Dotonbori entertainment district, Universal Studios Japan, the Kaiyukan aquarium with its whale sharks, the Umeda Sky Building's open-air observatory, and the retro Shinsekai quarter around Tsutenkaku tower. It's a city built around food and fun, so leave room for street eats in Dotonbori and the Kuromon market.",
  },
  {
    q: "How many days do I need in Osaka?",
    a: "Two days suits most visitors: one for the city itself — Osaka Castle, Dotonbori, Shinsekai and the markets — and one for a bigger attraction like Universal Studios Japan or the Kaiyukan aquarium. Osaka is also a natural base for a day trip to Nara, so add a day if you'd like to combine the city with the deer park and Great Buddha.",
  },
  {
    q: "Is the Osaka Amazing Pass worth it?",
    a: "It can be, if you plan to ride the subway a lot and visit several included attractions in a day. The Osaka Amazing Pass bundles unlimited subway travel with entry to many sights — but note it doesn't cover Universal Studios Japan or the Kaiyukan aquarium. Our Osaka attractions and passes guide breaks down what's included and whether it pays off for your itinerary.",
  },
  {
    q: "What should I eat in Osaka?",
    a: "Osaka is Japan's street-food capital, and Dotonbori is the place to graze: takoyaki (octopus balls) and okonomiyaki (savoury pancakes) are the local icons, alongside kushikatsu skewers — especially in Shinsekai. The Kuromon Ichiba market and the Namba area are great for working through the city's specialities at your own pace.",
  },
];

export default function ThingsToDoOsakaPage() {
  return (
    <>
      <Head>
        <title>Best Things to Do in Osaka (2026): Castle, Dotonbori &amp; USJ | Japan Travel Kit</title>
        <meta
          name="description"
          content="A guide to Osaka's best sights in 2026 — Osaka Castle, the Dotonbori district, Universal Studios Japan, the Kaiyukan aquarium, the Umeda Sky Building and Shinsekai — with links to full guides."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/things-to-do-osaka" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best Things to Do in Osaka (2026): Castle, Dotonbori & USJ" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/things-to-do-osaka" />
        <meta property="og:description" content="A guide to Osaka's best sights in 2026 — Osaka Castle, the Dotonbori district, Universal Studios Japan, the Kaiyukan aquarium, the Umeda Sky Building and Shinsekai — with links to full guides." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Things to Do in Osaka (2026): Castle, Dotonbori & USJ" />
        <meta name="twitter:description" content="A guide to Osaka's best sights in 2026 — Osaka Castle, the Dotonbori district, Universal Studios Japan, the Kaiyukan aquarium, the Umeda Sky Building and Shinsekai — with links to full guides." />
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
              headline: "Best Things to Do in Osaka (2026): Castle, Dotonbori & USJ",
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
                { "@type": "ListItem", position: 4, name: "Best Things to Do in Osaka", item: "https://www.japan-travel-kit.com/guides/attractions/things-to-do-osaka" },
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
          <span className={styles.breadCurrent}>Best Things to Do in Osaka</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🏯</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Best Things to Do in Osaka (2026):<br />Castle, Dotonbori &amp; USJ
          </h1>
          <p className={styles.heroSubtitle}>
            A planner&apos;s overview of Osaka&apos;s best — a hilltop castle, neon-lit street-food canals, a
            blockbuster theme park, whale sharks and a sky garden — each with a link to learn more.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Food & Fun", "Links to Full Guides"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How to Use This Guide</h2>
          <p className={styles.bodyText}>
            Osaka is Japan&apos;s great food-and-fun city — louder, more relaxed, and more playful than Kyoto or
            Tokyo, and a brilliant base for the wider Kansai region. This page gives you a planner&apos;s overview
            of the sights and experiences worth your time, with a link to our full guide wherever one exists.
            Rather than quote prices that move, we keep figures to a minimum and point you to the detail.
          </p>
          <p className={styles.bodyText}>
            Two days is enough to enjoy the city and one big attraction, with the option of a Nara day trip on
            top. Mix the landmarks below with plenty of grazing — in Osaka, the street food is half the point.
          </p>
        </section>

        {/* Castle & Dotonbori */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The icons</span>
          <h2 className={styles.sectionTitle}>Osaka Castle &amp; Dotonbori</h2>
          <p className={styles.bodyText}>
            <strong>Osaka Castle</strong> is the city&apos;s landmark — a reconstructed keep set in a moated park,
            with a museum inside and city views from the top (the keep&apos;s admission is modest, around ¥600,
            2026 and subject to change). After dark, head to <strong>Dotonbori</strong>, the neon-soaked canal
            district famous for the running Glico sign and wall-to-wall street food: takoyaki, okonomiyaki, and
            more. It&apos;s the beating heart of Osaka nightlife and people-watching.
          </p>
        </section>

        {/* USJ & Kaiyukan */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Big attractions</span>
          <h2 className={styles.sectionTitle}>Universal Studios Japan &amp; the Kaiyukan</h2>
          <p className={styles.bodyText}>
            <strong>Universal Studios Japan</strong> is the region&apos;s blockbuster theme park, home to Super
            Nintendo World and a roster of major rides — it needs online tickets and, for some areas, timed entry,
            so plan ahead with our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass" style={linkStyle}>USJ tickets &amp; Express Pass guide</Link>.
            On the waterfront, the <strong>Kaiyukan</strong> is one of the world&apos;s great aquariums, built
            around a giant central tank with whale sharks — a superb option for families or a rainy day.
          </p>
        </section>

        {/* Umeda & Shinsekai */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Views &amp; old Osaka</span>
          <h2 className={styles.sectionTitle}>Umeda Sky Building &amp; Shinsekai</h2>
          <p className={styles.bodyText}>
            For the view, the <strong>Umeda Sky Building</strong>&apos;s Floating Garden Observatory links two
            towers with an open-air rooftop ring high above the north of the city. For a complete change of mood,
            <strong> Shinsekai</strong> is a retro, slightly ramshackle quarter around the <strong>Tsutenkaku</strong>{" "}
            tower, packed with kushikatsu (deep-fried skewer) joints and a nostalgic, mid-century atmosphere. Round
            it off at the <strong>Kuromon Ichiba</strong> market and the buzzing streets of Namba.
          </p>
        </section>

        {/* Passes & day trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Plan smarter</span>
          <h2 className={styles.sectionTitle}>Passes &amp; a Nara Day Trip</h2>
          <p className={styles.bodyText}>
            If you&apos;ll be hopping between sights, a city pass can save money — see our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>Osaka attractions &amp; passes guide</Link>{" "}
            for whether the Amazing Pass pays off (note it excludes USJ and the Kaiyukan). And because Osaka is
            barely an hour from <strong>Nara</strong>, it&apos;s an easy base for a day trip to the deer park and
            Great Buddha — our{" "}
            <Link href="/guides/attractions/nara-day-trip" style={linkStyle}>Nara day trip guide</Link> shows how.
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
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3a9 9 0 0 0 0 18M3 12h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7" />
                  <path d="M9 11h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Attractions &amp; Passes (2026): Amazing Pass, Kaiyukan, Umeda Sky &amp; More</p>
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
          </div>
        </section>
      </div>
    </>
  );
}
