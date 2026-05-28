import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const dataTable = [
  { activity: "Google Maps",             perDay: "50MB",   total: "500MB"  },
  { activity: "Social media",            perDay: "150MB",  total: "1,500MB" },
  { activity: "Messaging",               perDay: "20MB",   total: "200MB"  },
  { activity: "Browsing",                perDay: "100MB",  total: "1,000MB" },
  { activity: "Total (light)",           perDay: "~320MB", total: "~3.2GB" },
  { activity: "Total (moderate)",        perDay: "~600MB", total: "~6GB"   },
  { activity: "Total (heavy)",           perDay: "~1GB+",  total: "~10GB+" },
];

const itinerary = [
  { day: "Day 1–3",  location: "Tokyo",              note: "Arrival and exploration; heavy map use",  data: "~900MB" },
  { day: "Day 4",    location: "Shinkansen to Kyoto", note: "Train WiFi available; light use",      data: "~200MB" },
  { day: "Day 5–6",  location: "Kyoto & Nara",        note: "Maps, photos, social posts",           data: "~500MB" },
  { day: "Day 7",    location: "Osaka",               note: "Active city use, navigation",          data: "~350MB" },
  { day: "Day 8",    location: "Day trip (Hiroshima/Kobe)", note: "Moderate use; travel maps",      data: "~300MB" },
  { day: "Day 9",    location: "Return to Tokyo",     note: "Train WiFi; light browsing",           data: "~200MB" },
  { day: "Day 10",   location: "Departure",           note: "Airport navigation, messaging",        data: "~150MB" },
];

const faqItems = [
  {
    q: "How much data do I need for 10 days in Japan?",
    a: "For light use — Maps, messaging, occasional browsing — expect around 3–3.5GB over 10 days. Moderate users who post regularly to social media and browse throughout the day should budget 5–7GB. Heavy users who stream video or share their hotspot daily should consider 10GB+ or an unlimited plan.",
  },
  {
    q: "Is 10GB enough for 10 days in Japan?",
    a: "Yes, for most travellers. Even moderate-to-heavy users who post to social media regularly and browse throughout the day typically use under 7GB on a 10-day trip. 10GB provides a comfortable buffer for almost all travel styles.",
  },
  {
    q: "Is Holafly or Airalo better for a 10-day Japan trip?",
    a: "It depends on your data usage. If you typically use under 10GB, eSIM Go (10GB at $14) or Airalo (10GB at $18) is better value than Holafly ($27 unlimited). Holafly only makes sense if you genuinely need more than 10GB — which requires heavy daily video streaming or constant hotspot sharing.",
  },
  {
    q: "Can I extend my Japan eSIM plan?",
    a: "Yes. Both Airalo and eSIM Go allow in-app top-ups or plan extensions. You can purchase additional data while in Japan and it activates instantly. This makes it safe to start with a 10GB plan and top up only if needed, rather than paying for unlimited upfront.",
  },
  {
    q: "What happens if I run out of data in Japan?",
    a: "With Airalo or eSIM Go, you can top up immediately via the app without needing a new QR code. Your connection resumes within minutes. Japan also has convenience store and station WiFi as a short-term backup, though coverage is inconsistent.",
  },
];

export default function JapanEsim10DaysPage() {
  return (
    <>
      <Head>
        <title>Best Japan eSIM for 10 Days 2026: Extended Trip Picks | Japan Travel Kit</title>
        <meta
          name="description"
          content="Visiting Japan for 10 days? You'll need 3–10GB. We compare the best eSIM plans for an extended trip covering Tokyo, Kyoto, Osaka and beyond."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-10-days" />
        <meta property="og:title" content="Best Japan eSIM for 10 Days 2026: Extended Trip Picks | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-10-days" />
        <meta property="og:description" content="Visiting Japan for 10 days? You'll need 3–10GB. We compare the best eSIM plans for an extended trip covering Tokyo, Kyoto, Osaka and beyond." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Japan eSIM for 10 Days 2026: Extended Trip Picks | Japan Travel Kit" />
        <meta name="twitter:description" content="Visiting Japan for 10 days? You'll need 3–10GB. We compare the best eSIM plans for an extended trip covering Tokyo, Kyoto, Osaka and beyond." />
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
                { "@type": "ListItem", position: 4, name: "Best Japan eSIM for 10 Days", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-10-days" },
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
              headline: "Best Japan eSIM for 10 Days (2026): Top Picks for Extended Trips",
              dateModified: "2026-05-28",
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
          <span className={styles.breadCurrent}>Best Japan eSIM for 10 Days</span>
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
            Best Japan eSIM for 10 Days (2026):<br />Top Picks for Extended Trips
          </h1>
          <p className={styles.heroSubtitle}>
            10 days lets you cover Tokyo, Kyoto, Osaka,
            and one more destination. Here&apos;s the right eSIM
            plan for your extended Japan trip.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "10-Day Trips", "Best Value"].map((t) => (
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
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>10-Day Trips</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Overall</p>
                <p className={styles.verdictStatValue}>Airalo 10GB ($18)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Budget</p>
                <p className={styles.verdictStatValue}>eSIM Go 10GB ($14)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Heavy Users</p>
                <p className={styles.verdictStatValue}>Holafly Unlimited ($27)</p>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", marginTop: "0.75rem", marginBottom: "1rem" }}>
              <strong style={{ color: "#fbbf24" }}>Data needed:</strong> 3GB–10GB for 10 days (most travellers)
            </p>
            <div className={styles.pickCtaRow}>
              <a
                href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN"
                className={styles.verdictBtn}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get eSIM Go 10GB ($14) →
              </a>
              <a
                href="https://airalo.pxf.io/c/7213504/1268485/15608"
                className={styles.pickCtaInternal}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get Airalo 10GB ($18) →
              </a>
            </div>
          </div>
        </div>

        {/* How Much Data */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Data Guide</span>
          <h2 className={styles.sectionTitle}>How Much Data Do You Need for 10 Days?</h2>
          <p className={styles.bodyText}>
            Ten days means more cities, more navigation, and more opportunities to stay connected.
            Here&apos;s a realistic breakdown of data usage across different travel styles:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Per Day</th>
                    <th>10 Days Total</th>
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
            <strong>Recommendation:</strong> A 5GB plan covers light-to-moderate users comfortably.
            For peace of mind across 10 days, step up to 10GB — eSIM Go&apos;s 10GB plan at $14
            is the best value option for most travellers.
          </p>
        </section>

        {/* 10-Day Itinerary */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Itinerary Guide</span>
          <h2 className={styles.sectionTitle}>Typical 10-Day Japan Itinerary &amp; Data Use</h2>
          <p className={styles.bodyText}>
            Ten days is enough to cover the Golden Route plus one additional destination —
            Hiroshima, Kobe, or Nara. Here&apos;s how data usage typically breaks down:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Location</th>
                    <th>Notes</th>
                    <th>Est. Data</th>
                  </tr>
                </thead>
                <tbody>
                  {itinerary.map((row) => (
                    <tr key={row.day}>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.day}</td>
                      <td className={styles.ftFeature}>{row.location}</td>
                      <td className={styles.ftEsim} style={{ fontSize: "0.8rem" }}>{row.note}</td>
                      <td className={styles.ftSim}>{row.data}</td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: 700 }}>
                    <td colSpan={3} className={styles.ftFeature}>Total estimated</td>
                    <td className={styles.ftSim}>~2.6GB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Most travellers will use around 2.5–4GB on a 10-day trip. We recommend a
            <strong> 5–10GB plan</strong> for a comfortable buffer across the full itinerary,
            especially if you&apos;re active on social media.
          </p>
        </section>

        {/* Best eSIMs for 10 Days */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Top Picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for a 10-Day Japan Trip</h2>

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
                  <p className={styles.choiceCardTitle}>1. eSIM Go 10GB – Best Value</p>
                  <p className={styles.choiceCardSubtitle}>$14 / 30 days · Docomo network</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> 10GB at $14 — best price per GB for 10-day trips</li>
                  <li><span className={styles.choiceCheck}>✓</span> Docomo network — reliable nationwide coverage</li>
                  <li><span className={styles.choiceCheck}>✓</span> Ample headroom for social media and navigation</li>
                  <li><span className={styles.conIcon}>−</span> Email-only support (no live chat)</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            eSIM Go&apos;s 10GB plan at $14 is the best value option for a 10-day Japan trip.
            It&apos;s cheaper than Airalo&apos;s equivalent and provides enough data for even
            active social media users without overpaying for unlimited.
          </p>
          <a
            href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.75rem", marginBottom: "2rem", display: "inline-flex" }}
          >
            Get eSIM Go 10GB →
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
                  <p className={styles.choiceCardTitle}>2. Airalo 10GB – Best Support</p>
                  <p className={styles.choiceCardSubtitle}>$18 / 30 days · Docomo &amp; SoftBank</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Docomo &amp; SoftBank — dual-network access</li>
                  <li><span className={styles.choiceCheck}>✓</span> 24/7 live chat support via the Airalo app</li>
                  <li><span className={styles.choiceCheck}>✓</span> Trusted by 10M+ travellers globally</li>
                  <li><span className={styles.choiceCheck}>✓</span> Easy in-app top-up if needed</li>
                  <li><span className={styles.conIcon}>−</span> $4 more expensive than eSIM Go for the same data</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Airalo&apos;s 10GB plan costs $18 — slightly more than eSIM Go — but includes 24/7 live
            chat support and dual-network access (Docomo + SoftBank). It&apos;s worth the extra $4 if you
            prefer the reassurance of live support during your trip.
          </p>
          <a
            href="https://airalo.pxf.io/c/7213504/1268485/15608"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.75rem", marginBottom: "2rem", display: "inline-flex" }}
          >
            Get Airalo 10GB →
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
                  <p className={styles.choiceCardTitle}>3. Holafly 10-day – For Heavy Users</p>
                  <p className={styles.choiceCardSubtitle}>$27 / Unlimited · SoftBank</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Unlimited data — no cap, no top-up anxiety</li>
                  <li><span className={styles.choiceCheck}>✓</span> Best if you stream video daily or share your hotspot</li>
                  <li><span className={styles.conIcon}>−</span> $27 vs eSIM Go $14 — nearly double the price</li>
                  <li><span className={styles.conIcon}>−</span> Fair use policy may throttle at high volumes</li>
                  <li><span className={styles.conIcon}>−</span> SoftBank only — slightly narrower coverage</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Holafly&apos;s unlimited plan for 10 days costs $27. That&apos;s $13 more than eSIM Go&apos;s 10GB
            plan — worth the added cost only if you genuinely need more than 10GB. Most 10-day
            visitors do not.
          </p>
          <a
            href="#"
            className={styles.pickCtaInternal}
            style={{ marginTop: "0.75rem", marginBottom: "0.5rem", display: "inline-flex" }}
          >
            Get Holafly Japan eSIM →
          </a>
        </section>

        {/* Is Holafly Worth It */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Value Analysis</span>
          <h2 className={styles.sectionTitle}>Is Holafly Worth It for 10 Days?</h2>
          <p className={styles.bodyText}>
            Let&apos;s put the numbers side by side:
          </p>
          <ul className={styles.pickList} style={{ marginBottom: "1rem" }}>
            <li><span className={styles.proIcon}>+</span> Holafly unlimited (10-day): <strong>$27</strong></li>
            <li><span className={styles.proIcon}>+</span> eSIM Go 10GB (30-day): <strong>$14</strong></li>
            <li><span className={styles.conIcon}>−</span> Difference: <strong>$13</strong> — the price of &ldquo;unlimited peace of mind&rdquo;</li>
          </ul>
          <p className={styles.bodyText}>
            That $13 premium is only rational if you plan to use more than 10GB across your trip.
            To put that in context: you&apos;d need to stream roughly 10 hours of Netflix at standard
            definition every day, or share your hotspot continuously with other travellers.
          </p>
          <p className={styles.bodyText}>
            <strong>Our verdict:</strong> Holafly is only the logical choice for genuinely heavy users
            — remote workers, vloggers, or groups sharing one connection. For the vast majority of
            10-day tourists, eSIM Go 10GB at $14 is the smarter pick.
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

        {/* Related Articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related Guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/esim/japan-esim-7-days" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Japan eSIM for 7 Days (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-2-weeks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Japan eSIM for 2 Weeks (2026)</p>
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
                <p className={styles.relatedTitle}>eSIM Go Japan Review 2026</p>
                <span className={styles.relatedArrow}>Read review →</span>
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
