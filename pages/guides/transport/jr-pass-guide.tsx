import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const passTypes = [
  { type: "Ordinary",          duration: "7 days",  price: "$275" },
  { type: "Ordinary",          duration: "14 days", price: "$441" },
  { type: "Ordinary",          duration: "21 days", price: "$563" },
  { type: "Green (1st class)", duration: "7 days",  price: "$370" },
  { type: "Green (1st class)", duration: "14 days", price: "$597" },
  { type: "Green (1st class)", duration: "21 days", price: "$747" },
];

const itineraries = [
  { route: "Tokyo only",                              without: "$0",   with7: "$275", note: "not worth it" },
  { route: "Tokyo + Kyoto",                           without: "$220", with7: "$275", note: "borderline"   },
  { route: "Tokyo + Kyoto + Osaka + Hiroshima",       without: "$380", with7: "$275", note: "✓ saves $105"  },
  { route: "Tokyo + Kyoto + Hiroshima + Fukuoka",     without: "$460", with7: "$275", note: "✓ saves $185"  },
];

const covered = [
  "Most Shinkansen (Hikari, Sakura, Kodama — not Nozomi/Mizuho)",
  "All JR local and express trains nationwide",
  "JR bus lines",
  "Miyajima Ferry (Hiroshima)",
];

const notCovered = [
  "Nozomi and Mizuho Shinkansen (fastest services)",
  "Tokyo Metro and city subways",
  "Private railways (Kintetsu, Hankyu, etc.)",
];

const steps = [
  {
    title: "Buy online before arriving in Japan",
    desc: "Purchase from an authorised reseller. The JR Pass cannot be bought inside Japan. All resellers charge the same fixed official price.",
  },
  {
    title: "Receive your Exchange Order by mail or email",
    desc: "This is not the pass itself — it's a voucher. Keep it safe. You'll exchange it at a JR Travel Service Center on arrival in Japan.",
  },
  {
    title: "Exchange at a JR Travel Service Center at the airport",
    desc: "Available at Narita, Haneda, Osaka Itami, and all major stations. Show your passport and Exchange Order. Takes around 15 minutes.",
  },
  {
    title: "Show your pass at staffed ticket gates",
    desc: "Use the wide staffed gates — not the IC card barriers. For reserved Shinkansen seats (free with the pass), book at any JR ticket counter.",
  },
];

const tips = [
  {
    title: "Reserve seats — they're free",
    desc: "Seat reservations on Shinkansen are included with the JR Pass. Reserve at any JR ticket counter or via JR Smart EX to guarantee your spot on busy routes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Take Hikari, not Nozomi",
    desc: "The Nozomi and Mizuho Shinkansen are not covered. Hikari and Sakura services are covered and arrive only 10–15 minutes later on most routes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
  },
  {
    title: "Pair with an IC card for city travel",
    desc: "The JR Pass only covers JR lines. Load a Suica or Pasmo with ¥3,000–5,000 for Tokyo Metro, Osaka subway, buses, and convenience stores.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    q: "Is the JR Pass worth it in 2026?",
    a: "The JR Pass is worth it if you're travelling between at least three cities. The Tokyo–Kyoto–Osaka–Hiroshima route costs around $380 in individual Shinkansen tickets versus $275 for a 7-day pass. If you're staying in one city or making only one intercity journey, individual tickets will be cheaper.",
  },
  {
    q: "Can I use the JR Pass on the Shinkansen?",
    a: "Yes — but not on the Nozomi or Mizuho (the fastest services on the Tokaido and Sanyo lines). The next-fastest options — Hikari and Sakura — are fully covered and add only 10–15 minutes on most journeys. On Tohoku, Hokuriku, and Kyushu Shinkansen lines, almost all services are covered.",
  },
  {
    q: "Where can I buy the JR Pass?",
    a: "You must purchase the JR Pass outside Japan through an authorised reseller. Prices are set by JR and are the same across all sellers. After purchase you receive an Exchange Order which you redeem at a JR Travel Service Center in Japan, available at major airports and stations.",
  },
  {
    q: "Can I use the JR Pass on the Tokyo subway?",
    a: "No. The JR Pass only covers JR-operated lines. Tokyo Metro and Toei Subway are separate operators and are not covered. Load an IC card (Suica or Pasmo) with cash for all subway, city bus, and private rail travel.",
  },
  {
    q: "What's the difference between Ordinary and Green (1st class)?",
    a: "Green class offers wider, more reclinable seats and quieter carriages — equivalent to business class. Ordinary class is already comfortable by international standards and is the right choice for most tourists. Green is worth considering for very long journeys or if you plan many long-distance Shinkansen trips.",
  },
];

export default function JrPassGuidePage() {
  return (
    <>
      <Head>
        <title>JR Pass Guide 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Is the JR Pass worth it for your Japan trip? We break down all pass types, prices, and real itinerary costs to help you decide before you buy."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/transport/jr-pass-guide" />
        <meta property="og:title" content="JR Pass Guide 2026: Is It Worth It for Your Japan Trip?" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/transport/jr-pass-guide" />
        <meta property="og:description" content="Is the JR Pass worth it for your Japan trip? We break down all pass types, prices, and real itinerary costs to help you decide before you buy." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JR Pass Guide 2026: Is It Worth It for Your Japan Trip?" />
        <meta name="twitter:description" content="Is the JR Pass worth it for your Japan trip? We break down all pass types, prices, and real itinerary costs to help you decide before you buy." />
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
              headline: "JR Pass Guide 2026: Is It Worth It for Your Japan Trip?",
              dateModified: "2026-04-24",
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://japan-travel-kit.com",
              },
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>JR Pass Guide</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚄</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            JR Pass Guide 2026: Is It Worth It<br />for Your Japan Trip?
          </h1>
          <p className={styles.heroSubtitle}>
            The JR Pass can save you hundreds of dollars — or cost you more than buying tickets individually. Here&apos;s how to decide.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "All Pass Types", "Cost Calculator"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.{" "}
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
                <p className={styles.verdictStatLabel}>Worth it if</p>
                <p className={styles.verdictStatValue}>Travelling between 3+ cities</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Not worth it if</p>
                <p className={styles.verdictStatValue}>Staying in Tokyo only</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Most popular</p>
                <p className={styles.verdictStatValue}>7-day pass ($275)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Key tip</p>
                <p className={styles.verdictStatValue}>Buy online before you fly</p>
              </div>
            </div>
            <a href="#" className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              View JR Pass Options →
            </a>
          </div>
        </div>

        {/* What Is the JR Pass? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the JR Pass?</h2>
          <p className={styles.bodyText}>
            The JR Pass (Japan Rail Pass) is a flat-fee rail pass available exclusively to foreign tourists visiting Japan on a temporary visitor visa. It covers unlimited travel on trains, buses, and some ferries operated by Japan Railways Group — the national rail operator.
          </p>
          <p className={styles.bodyText}>
            The pass covers most Shinkansen (bullet trains), all JR local and express trains, JR bus routes, and even the Miyajima Ferry in Hiroshima. One critical rule: <strong>the JR Pass cannot be purchased inside Japan</strong>. You must buy it before arrival and exchange your voucher at a JR Travel Service Center on arrival.
          </p>
          <p className={styles.bodyText}>
            The JR Pass was introduced in 1981 to attract foreign tourists. Today it remains one of the most popular travel products for visitors — but with rising prices, it&apos;s worth calculating whether it suits your specific itinerary before buying.
          </p>
        </section>

        {/* JR Pass Types & Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>JR Pass Types &amp; Prices</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass Type", "Duration", "Adult Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passTypes.map((p, i) => (
                    <tr key={i}>
                      <td className={styles.tdProvider}>{p.type}</td>
                      <td className={styles.tdNetwork}>{p.duration}</td>
                      <td className={styles.tdPrice}>{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Prices are in USD at official rates. Child passes (ages 6–11) are approximately half price. All authorised resellers charge the same fixed official price.
          </p>
        </section>

        {/* Is the JR Pass Worth It? */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost calculator</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It?</h2>
          <p className={styles.bodyText}>
            Add up the individual Shinkansen fares for your planned route and compare to the 7-day pass price ($275). The real-route examples below are a reliable guide:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Itinerary", "Without Pass", "With 7-day Pass ($275)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itineraries.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.without}</td>
                      <td>
                        <span style={{ fontWeight: 700, color: row.note.startsWith("✓") ? "#c62828" : "#374151" }}>
                          {row.with7}
                        </span>{" "}
                        <span style={{ fontWeight: 400, color: "#9ca3af", fontSize: "0.8rem" }}>({row.note})</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Individual fares are approximate unreserved one-way prices. A 14-day pass ($441) makes sense for longer trips including Sapporo, Kanazawa, or Kyushu.
          </p>
        </section>

        {/* What Does the JR Pass Cover? */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>What Does the JR Pass Cover?</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Covered</p>
              <ul className={styles.pickList}>
                {covered.map((item) => (
                  <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Not Covered</p>
              <ul className={styles.pickList}>
                {notCovered.map((item) => (
                  <li key={item}><span className={styles.conIcon}>✗</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How to Buy & Use the JR Pass */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Buy &amp; Use the JR Pass</h2>
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

        {/* JR Pass Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Pro tips</span>
          <h2 className={styles.sectionTitle}>JR Pass Tips</h2>
          <div className={styles.whoForGrid}>
            {tips.map((tip) => (
              <div key={tip.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{tip.icon}</div>
                <p className={styles.whoForTitle}>{tip.title}</p>
                <p className={styles.whoForDesc}>{tip.desc}</p>
              </div>
            ))}
          </div>
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
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <div className={styles.relatedCardSoon}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="22" height="13" rx="2" />
                  <circle cx="12" cy="12.5" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Money in Japan 2026: Cash vs Card Guide</p>
                <span className={styles.relatedSoon}>Coming soon</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Stay connected on every journey</h2>
            <p className={styles.ctaBannerDesc}>
              Pair your JR Pass with the right eSIM — have 4G data from the moment you land at Narita or Haneda.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              Find the Best eSIM for Japan →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
