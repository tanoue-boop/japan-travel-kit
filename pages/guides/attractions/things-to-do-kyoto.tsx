import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// Pillar page — no external CTA. Internal links aggregated below.

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const faqItems = [
  {
    q: "What are the best things to do in Kyoto?",
    a: "Kyoto's signature sights include the thousand vermilion gates of Fushimi Inari Taisha, the wooden terrace of Kiyomizu-dera, the Arashiyama bamboo grove and Tenryu-ji, the golden pavilion of Kinkaku-ji, the geisha district of Gion, and Nishiki Market. Many are temples and shrines, so you can combine famous landmarks with quiet backstreets in a single day.",
  },
  {
    q: "How many days do I need in Kyoto?",
    a: "Two to three days lets you cover the headline areas without rushing — a day around eastern Kyoto (Kiyomizu-dera, Gion), a day for Arashiyama and the north (Kinkaku-ji), and time for Fushimi Inari, which is best early or late. Kyoto also makes a great base for a day trip to Nara, so factor that in if temples and deer both appeal.",
  },
  {
    q: "Is Fushimi Inari free, and when should I go?",
    a: "Yes — Fushimi Inari Taisha is free to enter and open 24 hours, which is part of why it's so popular. The famous Senbon Torii (thousands of vermilion gates) get crowded by mid-morning, so the best experience is early morning or after dark, when the paths up the mountain are quieter and atmospheric.",
  },
  {
    q: "What experiences should I book ahead in Kyoto?",
    a: "Kyoto is ideal for cultural experiences such as kimono rental and a tea ceremony, both of which are popular and worth reserving in advance, especially in peak seasons. This page links to our dedicated guides for those, plus a Nara day trip, so you can plan the bookable parts of your visit before you arrive.",
  },
];

export default function ThingsToDoKyotoPage() {
  return (
    <>
      <Head>
        <title>Best Things to Do in Kyoto (2026): Temples, Geisha &amp; Experiences | Japan Travel Kit</title>
        <meta
          name="description"
          content="A guide to Kyoto's best sights and experiences in 2026 — Fushimi Inari, Kiyomizu-dera, the Arashiyama bamboo grove, Kinkaku-ji, Gion and Nishiki Market — with links to full guides."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/things-to-do-kyoto" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best Things to Do in Kyoto (2026): Temples, Geisha & Experiences" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/things-to-do-kyoto" />
        <meta property="og:description" content="A guide to Kyoto's best sights and experiences in 2026 — Fushimi Inari, Kiyomizu-dera, the Arashiyama bamboo grove, Kinkaku-ji, Gion and Nishiki Market — with links to full guides." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Things to Do in Kyoto (2026): Temples, Geisha & Experiences" />
        <meta name="twitter:description" content="A guide to Kyoto's best sights and experiences in 2026 — Fushimi Inari, Kiyomizu-dera, the Arashiyama bamboo grove, Kinkaku-ji, Gion and Nishiki Market — with links to full guides." />
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
              headline: "Best Things to Do in Kyoto (2026): Temples, Geisha & Experiences",
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
                { "@type": "ListItem", position: 4, name: "Best Things to Do in Kyoto", item: "https://www.japan-travel-kit.com/guides/attractions/things-to-do-kyoto" },
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
          <span className={styles.breadCurrent}>Best Things to Do in Kyoto</span>
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
            Best Things to Do in Kyoto (2026):<br />Temples, Geisha &amp; Experiences
          </h1>
          <p className={styles.heroSubtitle}>
            A planner&apos;s overview of Kyoto&apos;s greatest hits — vermilion shrine gates, wooden temple
            terraces, a bamboo grove, the golden pavilion and the geisha district — each with a link to learn more.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Temples & Shrines", "Links to Full Guides"].map((t) => (
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
            Kyoto was Japan&apos;s imperial capital for over a thousand years, and it still holds the country&apos;s
            densest concentration of temples, shrines, gardens, and traditional culture. This page gives you a
            planner&apos;s overview of the headline sights and the experiences worth booking, then points you to a
            full guide where one exists. Rather than quoting prices that shift, we link through to the detail.
          </p>
          <p className={styles.bodyText}>
            Kyoto rewards an early start: its most famous spots fill up by mid-morning, so it pays to front-load
            the big sights and save the backstreets, markets, and cultural experiences for the busier middle of
            the day.
          </p>
        </section>

        {/* Shrines & temples */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shrines &amp; temples</span>
          <h2 className={styles.sectionTitle}>Fushimi Inari &amp; Kiyomizu-dera</h2>
          <p className={styles.bodyText}>
            <strong>Fushimi Inari Taisha</strong> is Kyoto&apos;s most photographed sight — thousands of vermilion
            torii gates winding up a wooded mountain. It&apos;s free and open 24 hours, so go early or after dark
            to beat the crowds along the Senbon Torii. Across town, <strong>Kiyomizu-dera</strong> is a
            UNESCO-listed temple famous for its great wooden terrace projecting over the hillside, with sweeping
            views back across the city and atmospheric lanes leading up to the gate.
          </p>
        </section>

        {/* Arashiyama & Kinkaku-ji */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>West &amp; north</span>
          <h2 className={styles.sectionTitle}>Arashiyama &amp; the Golden Pavilion</h2>
          <p className={styles.bodyText}>
            In the west, <strong>Arashiyama</strong> pairs its towering bamboo grove with the Zen temple and
            celebrated garden of <strong>Tenryu-ji</strong>, plus riverside walks and a scenic setting that&apos;s
            especially lovely in autumn. To the north, <strong>Kinkaku-ji</strong> — the Golden Pavilion — is a
            gold-leaf-covered hall mirrored in its reflecting pond, one of the most iconic images of Japan and an
            easy pairing with a temple-focused day.
          </p>
        </section>

        {/* Gion & culture */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Old Kyoto</span>
          <h2 className={styles.sectionTitle}>Gion, Nishiki Market &amp; Cultural Experiences</h2>
          <p className={styles.bodyText}>
            <strong>Gion</strong> is Kyoto&apos;s historic geisha district, a maze of wooden machiya, teahouses,
            and lantern-lit lanes where you may glimpse a geiko or maiko heading to an appointment (always observe
            respectfully). The covered <strong>Nishiki Market</strong> — &ldquo;Kyoto&apos;s kitchen&rdquo; — is
            the place to graze on local specialities. Kyoto is also the best city for traditional experiences:
            slip into a{" "}
            <Link href="/guides/attractions/kimono-rental-japan" style={linkStyle}>kimono rental</Link> to wander
            the old streets, or sit down for a{" "}
            <Link href="/guides/attractions/tea-ceremony-japan" style={linkStyle}>Japanese tea ceremony</Link>{" "}
            built around Uji matcha.
          </p>
        </section>

        {/* Day trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Beyond the city</span>
          <h2 className={styles.sectionTitle}>An Easy Day Trip to Nara</h2>
          <p className={styles.bodyText}>
            Kyoto makes an excellent base for a day trip. Just an hour away, <strong>Nara</strong> offers
            free-roaming deer, the Great Buddha at Todai-ji, and the lantern-lined Kasuga Taisha shrine. For how
            to do it by train or guided tour, see our{" "}
            <Link href="/guides/attractions/nara-day-trip" style={linkStyle}>Nara day trip guide</Link>.
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
            <Link href="/guides/attractions/kimono-rental-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M12 7v14" />
                  <path d="M8 3L5 9v8a2 2 0 0 0 2 2M16 3l3 6v8a2 2 0 0 1-2 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kimono Rental in Japan (2026): Kyoto &amp; Asakusa — Prices &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tea-ceremony-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
                  <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
                  <path d="M7 3v2M11 3v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japanese Tea Ceremony Experience (2026): Tokyo, Kyoto &amp; What to Expect</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Transport Guides: Trains, Passes &amp; Getting Around</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
