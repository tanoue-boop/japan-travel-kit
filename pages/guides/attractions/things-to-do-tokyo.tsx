import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// Pillar page — no external CTA. Internal links aggregated below.

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const faqItems = [
  {
    q: "What are the best things to do in Tokyo?",
    a: "Tokyo's most popular ticketed experiences include the Shibuya Sky rooftop and other observation decks, the teamLab digital-art museums, Tokyo Disneyland and DisneySea, the Warner Bros. Studio Tour, street go-karting, sumo, and kimono rental — plus an easy day trip to Mt. Fuji. Most reward booking ahead, since the best slots sell out. This page links to a detailed guide for each.",
  },
  {
    q: "Do I need to book Tokyo attraction tickets in advance?",
    a: "For the popular ones, yes. Shibuya Sky's sunset slots, Tokyo Disney, the Warner Bros. Studio Tour, and teamLab all use timed entry and regularly sell out days or weeks ahead. Booking online also tends to be cheaper than buying on the day, and several official sites reject foreign cards — so a reseller is often the smoother route. See each guide for the specifics.",
  },
  {
    q: "Are there free things to do in Tokyo?",
    a: "Yes. The Tokyo Metropolitan Government Building (Tocho) in Shinjuku has observation decks at about 202 metres that are free to enter — the best no-cost city view in Tokyo. Many shrines, parks, and neighbourhoods cost nothing to wander, so you can balance the paid experiences below with plenty of free sightseeing.",
  },
  {
    q: "How many days do I need for Tokyo's attractions?",
    a: "It depends on your interests, but three to four days lets you combine a couple of big ticketed attractions — say a theme park and a studio tour — with observation decks, an experience like go-karting or kimono, and a day trip to Mt. Fuji. Because several attractions need timed entry, it helps to fix those dates first, then plan the flexible sightseeing around them.",
  },
];

export default function ThingsToDoTokyoPage() {
  return (
    <>
      <Head>
        <title>Best Things to Do in Tokyo (2026): Tickets, Attractions &amp; Experiences | Japan Travel Kit</title>
        <meta
          name="description"
          content="A guide to Tokyo's best ticketed attractions and experiences in 2026 — observation decks, teamLab, Disney, the Warner Bros. studio tour, go-karts, sumo, kimono and Mt. Fuji day trips."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/things-to-do-tokyo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best Things to Do in Tokyo (2026): Tickets, Attractions & Experiences" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/things-to-do-tokyo" />
        <meta property="og:description" content="A guide to Tokyo's best ticketed attractions and experiences in 2026 — observation decks, teamLab, Disney, the Warner Bros. studio tour, go-karts, sumo, kimono and Mt. Fuji day trips." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Things to Do in Tokyo (2026): Tickets, Attractions & Experiences" />
        <meta name="twitter:description" content="A guide to Tokyo's best ticketed attractions and experiences in 2026 — observation decks, teamLab, Disney, the Warner Bros. studio tour, go-karts, sumo, kimono and Mt. Fuji day trips." />
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
              headline: "Best Things to Do in Tokyo (2026): Tickets, Attractions & Experiences",
              dateModified: "2026-06-17",
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
                { "@type": "ListItem", position: 4, name: "Best Things to Do in Tokyo", item: "https://www.japan-travel-kit.com/guides/attractions/things-to-do-tokyo" },
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
          <span className={styles.breadCurrent}>Best Things to Do in Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🗼</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Best Things to Do in Tokyo (2026):<br />Tickets, Attractions &amp; Experiences
          </h1>
          <p className={styles.heroSubtitle}>
            A planner&apos;s overview of Tokyo&apos;s best ticketed attractions — observation decks, digital-art
            museums, theme parks, and one-of-a-kind experiences — each with a link to our full guide.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Tickets & Experiences", "Links to Full Guides"].map((t) => (
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
            Tokyo has more to do than any single trip can hold, so this page focuses on the ticketed attractions
            and experiences worth planning ahead. For each one you&apos;ll find a short summary and a link to our
            full guide, where we cover prices, timing, and exactly how to book. Where we quote a price, it&apos;s
            a confirmed figure; everything else points you to the detailed guide rather than guessing.
          </p>
          <p className={styles.bodyText}>
            One theme runs through all of them: the best experiences use timed entry and sell out. If something
            below catches your eye, lock in the date early and build the rest of your sightseeing around it.
          </p>
        </section>

        {/* Views from above */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Views from above</span>
          <h2 className={styles.sectionTitle}>Observation Decks</h2>
          <p className={styles.bodyText}>
            <strong>Shibuya Sky</strong> is the iconic open-air rooftop above the Shibuya Scramble Crossing, at
            around ¥2,500 for an advance online adult ticket — its sunset slots are the prize and the first to
            sell out. See our{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={linkStyle}>full Shibuya Sky tickets guide</Link>.
            If you want to weigh it against Tokyo Skytree, Tokyo Tower, and the free Tocho deck, our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>observation decks comparison</Link>{" "}
            breaks down heights, prices, and which to choose.
          </p>
        </section>

        {/* teamLab */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Digital art</span>
          <h2 className={styles.sectionTitle}>teamLab Museums</h2>
          <p className={styles.bodyText}>
            Tokyo has two teamLab digital-art museums — Planets in Toyosu and Borderless in Azabudai — both
            immersive, walk-through experiences that use timed entry and sell out fast. Our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets" style={linkStyle}>teamLab tickets guide</Link>{" "}
            compares the two and explains which suits your trip and how to book before they&apos;re gone.
          </p>
        </section>

        {/* Theme parks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Theme parks</span>
          <h2 className={styles.sectionTitle}>Tokyo Disney &amp; the Warner Bros. Studio Tour</h2>
          <p className={styles.bodyText}>
            <strong>Tokyo Disney</strong> (Disneyland and DisneySea) uses date-specified tickets that sell out
            weeks ahead, with no gate sales — and the official site can block foreign cards. Our{" "}
            <Link href="/guides/attractions/tokyo-disney-tickets" style={linkStyle}>Tokyo Disney tickets guide</Link>{" "}
            explains how to buy and how to choose between the two parks. For Harry Potter fans, the{" "}
            <strong>Warner Bros. Studio Tour Tokyo</strong> is Asia&apos;s first of its kind and the world&apos;s
            largest indoor facility of its type, with timed entry and no re-entry — details in our{" "}
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo" style={linkStyle}>studio tour guide</Link>.
          </p>
        </section>

        {/* Experiences */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Experiences</span>
          <h2 className={styles.sectionTitle}>Go-Karts, Sumo &amp; Kimono</h2>
          <p className={styles.bodyText}>
            For something hands-on, <strong>street go-karting</strong> lets you drive Tokyo&apos;s public roads in
            costume — but it requires an International Driving Permit sorted before you fly. Our{" "}
            <Link href="/guides/attractions/tokyo-go-kart" style={linkStyle}>go-kart guide</Link> covers the rules
            by country. To see Japan&apos;s national sport, our{" "}
            <Link href="/guides/attractions/sumo-tokyo-tickets" style={linkStyle}>sumo in Tokyo guide</Link>{" "}
            explains tournament tickets (January, May, and September) versus a year-round morning practice tour.
            And for a more traditional day, a{" "}
            <Link href="/guides/attractions/kimono-rental-japan" style={linkStyle}>kimono rental</Link> in Asakusa
            includes dressing, hair, and hundreds of designs.
          </p>
        </section>

        {/* Day trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Beyond the city</span>
          <h2 className={styles.sectionTitle}>A Mt. Fuji Day Trip</h2>
          <p className={styles.bodyText}>
            When you&apos;re ready to leave the city, a <strong>Mt. Fuji day trip</strong> ties together the
            Chureito Pagoda, Oshino Hakkai, Lake Kawaguchiko, and the 5th Station in a long but rewarding day.
            Our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>Mt. Fuji day trip guide</Link>{" "}
            compares group tours, private tours, and going it alone by train.
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
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Things to Do in Japan: Tickets &amp; Experiences →</p>
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
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V8l7-4 7 4v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
