import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA link — Klook affiliate redirect.
const HIROSHIMA_TOUR_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1307052&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F76852-hiroshima-miyajima-bus-tour%2F";

const compareRows = [
  {
    option: "DIY by shinkansen",
    cost: "Bullet-train fares (JR Pass valid on Hikari/Sakura, not Nozomi/Mizuho)",
    flexibility: "Total — set your own pace and stops",
    effort: "Moderate — book trains, plan the ferry and timings",
  },
  {
    option: "Guided bus tour",
    cost: "Higher — round-trip shinkansen, bus, lunch often included",
    flexibility: "Fixed route & timings",
    effort: "Very low — transport, guide and ferry sorted",
  },
];

const whoFor = [
  {
    title: "Do it yourself if…",
    desc: "You're comfortable with bullet trains and want to control the day. The shinkansen makes Hiroshima reachable in roughly 90 minutes to two hours from Osaka or Kyoto, and both the Peace Park and the Miyajima ferry are straightforward to navigate solo.",
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
    desc: "You'd rather not manage train and ferry logistics. Many tours bundle round-trip shinkansen, the bus between sights, the Miyajima ferry, an English-speaking guide, and often a Hiroshima okonomiyaki lunch — a stress-free way to see both in a single long day.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 6v12M16 6v12" />
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="7" cy="20" r="1.5" />
        <circle cx="17" cy="20" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Allow a full day either way…",
    desc: "Hiroshima and Miyajima together make a long day out from Kansai. Build in the ferry crossing and the time it takes to do the Peace Memorial Park justice, and treat it as a single full-day trip rather than something to rush.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Take the shinkansen to Hiroshima",
    desc: "From Osaka it's roughly 90 minutes and from Kyoto about 100–120 minutes by bullet train. If you hold a Japan Rail Pass, note it's valid on Hikari and Sakura services but not on the fastest Nozomi and Mizuho trains — plan around that to avoid an extra fare.",
  },
  {
    title: "Visit the Peace Memorial Park",
    desc: "The Peace Memorial Park sits in central Hiroshima, with the UNESCO-listed Atomic Bomb Dome at its edge. It's a place of remembrance, so allow time to walk it thoughtfully. The Peace Memorial Museum requires advance reservations during the busy 8–16 August period.",
  },
  {
    title: "Cross to Miyajima by ferry",
    desc: "From the mainland it's a ferry of about 10 minutes to Miyajima island. The crossing itself is part of the experience, with the island's famous torii gate coming into view as you approach.",
  },
  {
    title: "See Itsukushima Shrine and its floating torii",
    desc: "Itsukushima Shrine and its great torii are UNESCO-listed; shrine admission is around ¥300 (2026, subject to change). At high tide the torii appears to float on the water. For wider views, the Mt. Misen ropeway costs roughly ¥2,000 round trip.",
  },
];

const faqItems = [
  {
    q: "How do I get to Hiroshima from Osaka or Kyoto?",
    a: "By shinkansen it's roughly 90 minutes from Osaka and about 100–120 minutes from Kyoto. If you have a Japan Rail Pass, it covers the Hikari and Sakura bullet trains but not the faster Nozomi and Mizuho services — so check which train you board to avoid paying a separate fare.",
  },
  {
    q: "Can I see both Hiroshima and Miyajima in one day?",
    a: "Yes, and it's the classic pairing — but plan for a full day. You'll want enough time to walk the Peace Memorial Park thoughtfully, then take the roughly 10-minute ferry across to Miyajima for Itsukushima Shrine and its floating torii. Going by shinkansen independently or on a guided bus tour both make a same-day round trip from Kansai realistic.",
  },
  {
    q: "Does the Japan Rail Pass work on the train to Hiroshima?",
    a: "Partly. The nationwide Japan Rail Pass is valid on Hikari and Sakura shinkansen to Hiroshima, but not on the fastest Nozomi and Mizuho trains. If you have a pass, board a Hikari or Sakura service; the journey is only modestly longer and you avoid an additional ticket.",
  },
  {
    q: "How much does it cost to visit Itsukushima Shrine and the torii?",
    a: "Admission to Itsukushima Shrine on Miyajima is around ¥300 as of 2026 and subject to change. The ferry to the island takes about 10 minutes. If you'd like the elevated views, the Mt. Misen ropeway runs roughly ¥2,000 for a round trip. Confirm current prices and ferry times before you travel.",
  },
  {
    q: "When does the floating torii actually 'float'?",
    a: "The great torii of Itsukushima Shrine appears to float on the water at high tide, while at low tide you can often walk out across the sand toward it. Both are worth seeing, so it's worth checking the tide times for your visit and planning which you'd prefer to catch.",
  },
  {
    q: "Are there any closures or reservations I should know about?",
    a: "Two to note for 2026: the Peace Memorial Museum requires advance reservations during the busy period of 8–16 August, and Hiroshima Castle is closed for interior renovation from March 2026 — the grounds remain accessible, but you can't go inside. Always confirm current opening details before you go.",
  },
];

export default function HiroshimaMiyajimaDayTripPage() {
  return (
    <>
      <Head>
        <title>Hiroshima &amp; Miyajima Day Trip (2026): Peace Park, Floating Torii &amp; How to Go | Japan Travel Kit</title>
        <meta
          name="description"
          content="Hiroshima and Miyajima day trip in 2026: the Peace Memorial Park, Atomic Bomb Dome and Miyajima's floating torii. Shinkansen times, JR Pass notes, and tour vs DIY."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/hiroshima-miyajima-day-trip" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Hiroshima & Miyajima Day Trip (2026): Peace Park, Floating Torii & How to Go" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/hiroshima-miyajima-day-trip" />
        <meta property="og:description" content="Hiroshima and Miyajima day trip in 2026: the Peace Memorial Park, Atomic Bomb Dome and Miyajima's floating torii. Shinkansen times, JR Pass notes, and tour vs DIY." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hiroshima & Miyajima Day Trip (2026): Peace Park, Floating Torii & How to Go" />
        <meta name="twitter:description" content="Hiroshima and Miyajima day trip in 2026: the Peace Memorial Park, Atomic Bomb Dome and Miyajima's floating torii. Shinkansen times, JR Pass notes, and tour vs DIY." />
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
              headline: "Hiroshima & Miyajima Day Trip (2026): Peace Park, Floating Torii & How to Go",
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
                { "@type": "ListItem", position: 4, name: "Hiroshima & Miyajima Day Trip", item: "https://www.japan-travel-kit.com/guides/attractions/hiroshima-miyajima-day-trip" },
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
          <span className={styles.breadCurrent}>Hiroshima &amp; Miyajima Day Trip</span>
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
            Hiroshima &amp; Miyajima Day Trip (2026):<br />Peace Park, Floating Torii &amp; How to Go
          </h1>
          <p className={styles.heroSubtitle}>
            Two UNESCO sites in one long day from Kansai: the Peace Memorial Park and Atomic Bomb Dome, then
            Miyajima&apos;s floating torii. Here&apos;s how to do it by shinkansen — or by guided tour.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Two UNESCO Sites", "Shinkansen or Tour"].map((t) => (
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
                <p className={styles.verdictStatLabel}>From Osaka</p>
                <p className={styles.verdictStatValue}>~90 min by shinkansen</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Kyoto</p>
                <p className={styles.verdictStatValue}>~100–120 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Miyajima ferry</p>
                <p className={styles.verdictStatValue}>~10 min crossing</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shrine entry</p>
                <p className={styles.verdictStatValue}>~¥300</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Pair the Peace Memorial Park with Miyajima&apos;s floating torii in a
              single full day from Kansai. Going by shinkansen gives you full control (mind the JR Pass Nozomi
              exclusion); a guided bus tour bundles the trains, ferry, and lunch if you&apos;d rather not plan.
            </p>
            <a href={HIROSHIMA_TOUR_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Browse Hiroshima Day Tours →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>A Day of Remembrance and Beauty</h2>
          <p className={styles.bodyText}>
            A Hiroshima and Miyajima day trip brings together two very different but deeply moving places. In the
            city, the Peace Memorial Park and the Atomic Bomb Dome stand as a sober, UNESCO-listed reminder of
            1945 and a powerful call for peace. A short ferry away, the island of Miyajima offers one of
            Japan&apos;s most photographed sights: the great torii of Itsukushima Shrine, also UNESCO-listed,
            appearing to float on the sea at high tide.
          </p>
          <p className={styles.bodyText}>
            We&apos;ve written this guide with respect for the history involved, focusing on the practical facts
            you need to plan a thoughtful visit — how to get there, what it costs, and a couple of important
            closures and reservations to be aware of in 2026.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Shinkansen vs tour</span>
          <h2 className={styles.sectionTitle}>DIY by Bullet Train vs a Guided Tour</h2>
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
            Tour inclusions and prices vary by operator and season (2026, variable — confirm at booking). Many
            guided options include round-trip shinkansen, the local bus, the Miyajima ferry, and a Hiroshima
            okonomiyaki lunch.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>How Should You Visit?</h2>
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
          <h2 className={styles.sectionTitle}>The Route, Step by Step</h2>
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

        {/* Good to know */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Good to know</span>
          <h2 className={styles.sectionTitle}>2026 Closures &amp; Reservations</h2>
          <p className={styles.bodyText}>
            A couple of practical points can affect your plans this year. The Hiroshima Peace Memorial Museum
            requires advance reservations during the busy commemorative period of 8–16 August, so book ahead if
            you&apos;re visiting then. Separately, Hiroshima Castle is closed for interior renovation from March
            2026 — its grounds stay open, but you can&apos;t go inside.
          </p>
          <p className={styles.bodyText}>
            For more on bullet-train classes, seat reservations, and where the JR Pass does and doesn&apos;t
            apply, see our{" "}
            <Link href="/guides/transport/shinkansen-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              shinkansen guide
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
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide (2026): Bullet Trains, Seats &amp; the JR Pass</p>
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
            <h2 className={styles.ctaBannerTitle}>Plan your Hiroshima day</h2>
            <p className={styles.ctaBannerDesc}>
              Going by shinkansen gives you full control over the day. If you&apos;d rather have the trains, ferry,
              and lunch arranged for you, a guided tour covers both Hiroshima and Miyajima with an English guide.
            </p>
            <a href={HIROSHIMA_TOUR_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              Browse Hiroshima Day Tours →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
