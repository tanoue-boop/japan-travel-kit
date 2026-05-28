import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const dataTable = [
  { activity: "Google Maps",      perDay: "50MB",   total: "150MB"  },
  { activity: "Social media",     perDay: "100MB",  total: "300MB"  },
  { activity: "Messaging",        perDay: "20MB",   total: "60MB"   },
  { activity: "Light browsing",   perDay: "50MB",   total: "150MB"  },
  { activity: "Total (light use)",perDay: "~220MB", total: "~660MB" },
  { activity: "Total (moderate)", perDay: "~500MB", total: "~1.5GB" },
];

const faqItems = [
  {
    q: "How much data do I need for 3 days in Japan?",
    a: "For light use (maps, messaging, occasional browsing), you'll use around 500MB–700MB over 3 days. For moderate use that includes social media and some streaming, budget 1–1.5GB. A 1GB plan covers the vast majority of 3-day visitors.",
  },
  {
    q: "Is 1GB enough for 3 days in Japan?",
    a: "Yes, for most travellers. 1GB comfortably covers Google Maps navigation, messaging apps, social media browsing, and light web use across a 3-day trip. Only heavy video streamers or hotspot users will need more.",
  },
  {
    q: "What is the cheapest eSIM for a 3-day Japan trip?",
    a: "eSIM Go's 1GB plan at $3.50 is the cheapest reliable option. It runs on Docomo's network and covers all major tourist areas. The next cheapest is Airalo at $4.50 for 1GB.",
  },
  {
    q: "Can I get a Japan eSIM for just 3 days?",
    a: "Most eSIM providers sell plans starting at 7 days — there are very few 3-day specific plans. However, a 7-day 1GB plan from eSIM Go ($3.50) or Airalo ($4.50) is still the cheapest and most practical option for a 3-day trip.",
  },
  {
    q: "Should I get unlimited data for 3 days in Japan?",
    a: "No — unlimited plans like Holafly start at $19 for 5 days, which is significant overkill for a 3-day trip where you'll use under 1GB. Save your money and get a 1GB plan instead.",
  },
];

export default function JapanEsim3DaysPage() {
  return (
    <>
      <Head>
        <title>Best Japan eSIM for 3 Days 2026: Top Picks | Japan Travel Kit</title>
        <meta
          name="description"
          content="Only visiting Japan for 3 days? You need 1GB at most. We recommend the cheapest and most reliable eSIMs for short trips — from just $3.50."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-3-days" />
        <meta property="og:title" content="Best Japan eSIM for 3 Days 2026: Top Picks | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-3-days" />
        <meta property="og:description" content="Only visiting Japan for 3 days? You need 1GB at most. We recommend the cheapest and most reliable eSIMs for short trips — from just $3.50." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Japan eSIM for 3 Days 2026: Top Picks | Japan Travel Kit" />
        <meta name="twitter:description" content="Only visiting Japan for 3 days? You need 1GB at most. We recommend the cheapest and most reliable eSIMs for short trips — from just $3.50." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Best Japan eSIM for 3 Days", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-3-days" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Best Japan eSIM for 3 Days (2026): Top Picks for Short Trips",
              dateModified: "2026-05-27",
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
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM &amp; SIM Cards</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Best Japan eSIM for 3 Days</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Updated May 2026
          </p>
          <h1 className={styles.heroTitle}>
            Best Japan eSIM for 3 Days (2026):<br />Top Picks for Short Trips
          </h1>
          <p className={styles.heroSubtitle}>
            Only in Japan for 3 days? You don&apos;t need much data — and you definitely
            don&apos;t need to overpay. Here&apos;s exactly what to get.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "3-Day Trips", "Best Value"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our review or verdict.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>3-Day Trips</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Pick</p>
                <p className={styles.verdictStatValue}>eSIM Go 1GB ($3.50)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Runner-Up</p>
                <p className={styles.verdictStatValue}>Airalo 1GB ($4.50)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Data Needed</p>
                <p className={styles.verdictStatValue}>~500MB–1GB for 3 days</p>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", marginTop: "0.75rem", marginBottom: "1rem" }}>
              <strong style={{ color: "#fbbf24" }}>Avoid:</strong> Unlimited plans — they&apos;re overkill and expensive for a 3-day trip.
            </p>
            <div className={styles.pickCtaRow}>
              <a
                href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN"
                className={styles.verdictBtn}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get eSIM Go ($3.50) →
              </a>
              <a
                href="https://airalo.pxf.io/c/7213504/1268485/15608"
                className={styles.pickCtaInternal}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get Airalo ($4.50) →
              </a>
            </div>
          </div>
        </div>

        {/* How Much Data */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Data Guide</span>
          <h2 className={styles.sectionTitle}>How Much Data Do You Need for 3 Days?</h2>
          <p className={styles.bodyText}>
            Three days in Japan is enough to explore Tokyo or one other major city. The good news:
            you won&apos;t use nearly as much data as you might think. Here&apos;s a realistic breakdown:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Per Day</th>
                    <th>3 Days Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((row) => (
                    <tr key={row.activity} style={row.activity.startsWith("Total") ? { fontWeight: 700 } : {}}>
                      <td className={styles.ftFeature}>{row.activity}</td>
                      <td className={styles.ftEsim}>{row.perDay}</td>
                      <td className={styles.ftSim}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Conclusion:</strong> 1GB is enough for the vast majority of 3-day visitors. Even moderate
            users — scrolling social media, running Google Maps all day — will stay under 1.5GB.
            Heavy users (video streaming, daily hotspot) should consider a 3GB plan, but that&apos;s the exception.
          </p>
        </section>

        {/* Best eSIMs for 3 Days */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Top Picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for a 3-Day Japan Trip</h2>

          {/* eSIM Go */}
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderEsim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>1. eSIM Go 1GB – Best Value</p>
                  <p className={styles.choiceCardSubtitle}>$3.50 / 7 days · Docomo network</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Cheapest reliable Japan eSIM available</li>
                  <li><span className={styles.choiceCheck}>✓</span> Docomo network — excellent coverage nationwide</li>
                  <li><span className={styles.choiceCheck}>✓</span> 7-day validity covers your full 3-day trip</li>
                  <li><span className={styles.choiceCheck}>✓</span> Instant QR code activation</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            eSIM Go&apos;s 1GB plan at $3.50 is our top pick for 3-day Japan trips. It runs on Docomo —
            Japan&apos;s most extensive network — and gives you 1GB over 7 days. More than enough for
            a 3-day stay, even with heavy map usage.
          </p>
          <a
            href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.75rem", marginBottom: "2rem", display: "inline-flex" }}
          >
            Get eSIM Go for Japan →
          </a>

          {/* Airalo */}
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderSim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>2. Airalo 1GB – Best Support</p>
                  <p className={styles.choiceCardSubtitle}>$4.50 / 7 days · Docomo &amp; SoftBank</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> 24/7 live chat support via app</li>
                  <li><span className={styles.choiceCheck}>✓</span> Both Docomo &amp; SoftBank networks</li>
                  <li><span className={styles.choiceCheck}>✓</span> Trusted by 10M+ travellers worldwide</li>
                  <li><span className={styles.choiceCheck}>✓</span> Easy-to-use app for activation</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Airalo costs $1 more than eSIM Go but offers a better app experience and 24/7 live chat
            support — worth it if this is your first eSIM or you prefer backup support within reach.
          </p>
          <a
            href="https://airalo.pxf.io/c/7213504/1268485/15608"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.75rem", marginBottom: "2rem", display: "inline-flex" }}
          >
            Get Airalo Japan eSIM →
          </a>

          {/* Holafly */}
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader}`} style={{ background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)" }}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>3. Holafly – Only If You Stream Constantly</p>
                  <p className={styles.choiceCardSubtitle}>$19 / 5 days · Unlimited · SoftBank</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Truly unlimited data — no cap to worry about</li>
                  <li><span className={styles.choiceCheck}>✓</span> Good for daily video streaming</li>
                  <li><span className={styles.conIcon}>−</span> $19 is expensive for a 3-day trip</li>
                  <li><span className={styles.conIcon}>−</span> SoftBank only — weaker rural coverage</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Holafly&apos;s cheapest plan is $19 for 5 days. For a 3-day trip, that&apos;s significant overkill
            for most travellers. Only consider it if you stream video constantly and can&apos;t stand
            watching a data counter.
          </p>
          <a
            href="#"
            className={styles.pickCtaInternal}
            style={{ marginTop: "0.75rem", marginBottom: "0.5rem", display: "inline-flex" }}
          >
            Get Holafly Japan eSIM →
          </a>
        </section>

        {/* Pocket WiFi */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Alternative</span>
          <h2 className={styles.sectionTitle}>What About Pocket WiFi?</h2>
          <p className={styles.bodyText}>
            Pocket WiFi rentals for 3 days cost around $6.75–$15 depending on the provider.
            That&apos;s comparable to an eSIM — but comes with the hassle of picking up and returning
            a physical device, charging a second gadget, and carrying it everywhere.
          </p>
          <p className={styles.bodyText}>
            For solo or couple travel, an eSIM is simpler, cheaper, and requires no hardware.
            Pocket WiFi makes more sense for groups of 3+ who can share one device and split the cost.
          </p>
        </section>

        {/* Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Travel Tips</span>
          <h2 className={styles.sectionTitle}>Tips for 3-Day Japan Trips</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Use hotel WiFi fully</p>
              <p className={styles.whoForDesc}>
                Download maps, upload photos, and stream video over hotel WiFi to save your eSIM data for when you&apos;re out exploring.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Download offline maps</p>
              <p className={styles.whoForDesc}>
                Download Google Maps or Maps.me for your destination area before leaving. Offline maps use zero data while navigating.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 6l5 5 5-5 5 5 5-5" /><path d="M1 12l5 5 5-5 5 5 5-5" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Use konbini free WiFi</p>
              <p className={styles.whoForDesc}>
                7-Eleven, FamilyMart, and Lawson offer free WiFi. Use it as a supplement when you&apos;re grabbing snacks.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Set up eSIM before flying</p>
              <p className={styles.whoForDesc}>
                Install your eSIM at home before your flight. You&apos;ll have a live signal before you reach baggage claim at Narita or Haneda.
              </p>
            </div>
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

        {/* Related Articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related Guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/esim/cheapest-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cheapest eSIM for Japan 2026: Best Budget Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/esim-go-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>eSIM Go Japan Review 2026: Best Budget eSIM?</p>
                <span className={styles.relatedArrow}>Read review →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-sim-short-vs-long-stay" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Japan SIM Card for Your Trip Length (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/sim-cards" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Compare All Japan SIM Options</p>
                <span className={styles.relatedArrow}>View comparison →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to get connected in Japan?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare all Japan eSIM options — Airalo, Holafly, eSIM Go, and Sakura Mobile —
              on price, coverage, and features.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              View Full eSIM Comparison →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
