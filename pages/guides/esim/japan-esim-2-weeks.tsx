import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const dataTable = [
  { usageType: "Light",             perDay: "~300MB", total: "~4.2GB"  },
  { usageType: "Moderate",          perDay: "~600MB", total: "~8.4GB"  },
  { usageType: "Heavy (streaming)", perDay: "~1GB+",  total: "~14GB+"  },
];

const faqItems = [
  {
    q: "How much data do I need for 2 weeks in Japan?",
    a: "For light use — Maps, messaging, occasional browsing — you'll need around 4–5GB for 14 days. Moderate users who post regularly to social media and browse throughout the day should budget 7–9GB. Heavy users who stream video or share hotspots daily may need 14GB+ or an unlimited plan.",
  },
  {
    q: "Is 10GB enough for 2 weeks in Japan?",
    a: "Yes, for the majority of travellers. Most tourists on a 2-week trip use under 8–9GB even with active social media use. 10GB provides a comfortable buffer without overpaying. If you download offline maps and use hotel WiFi for streaming, you may finish with data to spare.",
  },
  {
    q: "What is the best eSIM for a 2-week Japan trip?",
    a: "eSIM Go's 10GB plan at $14 is our top recommendation for most 2-week travellers — it's the best value per GB. If you prefer live chat support and dual-network access, Airalo's 10GB plan at $18 is the alternative. For heavy users who stream daily, Holafly's unlimited 30-day plan is worth considering.",
  },
  {
    q: "Should I get unlimited data for 2 weeks in Japan?",
    a: "Only if you genuinely use more than 10GB. Holafly's 30-day unlimited plan costs around $27–$49 depending on duration. For most 2-week tourists, eSIM Go 10GB at $14 is sufficient and far cheaper. Consider unlimited only if you work remotely, stream video constantly, or share your hotspot with travel companions.",
  },
  {
    q: "Can I use Sakura Mobile as an eSIM for 2 weeks?",
    a: "Yes. Sakura Mobile offers both physical SIM cards and eSIMs with voice call support. Their plans start around $28 for 2GB+ with voice. This is the best option if you need a real Japanese phone number — for example, for accommodation booking systems that require SMS verification.",
  },
];

export default function JapanEsim2WeeksPage() {
  return (
    <>
      <Head>
        <title>Best Japan eSIM for 2 Weeks 2026: 14-Day Trip Picks | Japan Travel Kit</title>
        <meta
          name="description"
          content="Visiting Japan for 2 weeks? Most travellers need 5–10GB. We compare the best eSIM plans for a 14-day trip — with data estimates and honest recommendations."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-2-weeks" />
        <meta property="og:title" content="Best Japan eSIM for 2 Weeks 2026: 14-Day Trip Picks | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-2-weeks" />
        <meta property="og:description" content="Visiting Japan for 2 weeks? Most travellers need 5–10GB. We compare the best eSIM plans for a 14-day trip — with data estimates and honest recommendations." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Japan eSIM for 2 Weeks 2026: 14-Day Trip Picks | Japan Travel Kit" />
        <meta name="twitter:description" content="Visiting Japan for 2 weeks? Most travellers need 5–10GB. We compare the best eSIM plans for a 14-day trip — with data estimates and honest recommendations." />
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
                { "@type": "ListItem", position: 4, name: "Best Japan eSIM for 2 Weeks", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-2-weeks" },
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
              headline: "Best Japan eSIM for 2 Weeks (2026): Top Picks for Longer Stays",
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
          <span className={styles.breadCurrent}>Best Japan eSIM for 2 Weeks</span>
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
            Best Japan eSIM for 2 Weeks (2026):<br />Top Picks for Longer Stays
          </h1>
          <p className={styles.heroSubtitle}>
            Two weeks in Japan means more cities,
            more data, and more to plan. Here&apos;s exactly
            what eSIM plan to get for a 14-day trip.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "2-Week Trips", "Best Value"].map((t) => (
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
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>2-Week Trips</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Overall</p>
                <p className={styles.verdictStatValue}>eSIM Go 10GB ($14)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Heavy Users</p>
                <p className={styles.verdictStatValue}>Holafly ($27–$49)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Need Voice Calls</p>
                <p className={styles.verdictStatValue}>Sakura Mobile ($28)</p>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", marginTop: "0.75rem", marginBottom: "1rem" }}>
              <strong style={{ color: "#fbbf24" }}>Data needed:</strong> 5GB–15GB for 2 weeks (most travellers: 10GB is enough)
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
          <h2 className={styles.sectionTitle}>How Much Data Do You Need for 2 Weeks?</h2>
          <p className={styles.bodyText}>
            Two weeks in Japan gives you time to explore well beyond the Golden Route — but data
            needs are still manageable. Here&apos;s how usage breaks down by travel style:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Usage Type</th>
                    <th>Per Day</th>
                    <th>14 Days Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((row) => (
                    <tr key={row.usageType}>
                      <td className={styles.ftFeature}>{row.usageType}</td>
                      <td className={styles.ftEsim}>{row.perDay}</td>
                      <td className={styles.ftSim} style={{ fontWeight: 700 }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Conclusion:</strong> A 10GB plan is enough for the vast majority of 2-week
            travellers — even those who use social media actively. Only daily video streaming
            pushes you above 10GB. Download offline maps, use hotel WiFi for uploads, and
            10GB will see you through.
          </p>
        </section>

        {/* 2-Week Itinerary */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Itinerary Guide</span>
          <h2 className={styles.sectionTitle}>Typical 2-Week Japan Itinerary &amp; Data Use</h2>
          <p className={styles.bodyText}>
            Two weeks allows you to cover all the major destinations plus some off-the-beaten-path
            highlights. Data usage is highest on travel days when you&apos;re navigating between cities.
          </p>

          <div style={{ marginTop: "1.25rem" }}>
            <p style={{ fontWeight: 700, color: "#0d1b4b", marginBottom: "0.5rem" }}>Week 1</p>
            <ul className={styles.pickList} style={{ marginBottom: "1.25rem" }}>
              <li><span className={styles.proIcon}>▸</span> <strong>Days 1–3:</strong> Tokyo — arrival, exploration, heavy map use (~900MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Day 4 (Nikko or Hakone):</strong> Day trip from Tokyo, moderate navigation (~300MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Day 5:</strong> Shinkansen to Kyoto — train WiFi available (~200MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Days 6–7:</strong> Kyoto — temple visits, maps, social posts (~600MB)</li>
            </ul>

            <p style={{ fontWeight: 700, color: "#0d1b4b", marginBottom: "0.5rem" }}>Week 2</p>
            <ul className={styles.pickList} style={{ marginBottom: "1.25rem" }}>
              <li><span className={styles.proIcon}>▸</span> <strong>Days 8–9:</strong> Osaka — active city use, food navigation (~600MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Day 10:</strong> Hiroshima day trip — Shinkansen + city maps (~300MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Days 11–12:</strong> Fukuoka — new city, heavy first-day map use (~500MB)</li>
              <li><span className={styles.proIcon}>▸</span> <strong>Days 13–14:</strong> Return journey &amp; departure — light use (~300MB)</li>
            </ul>
          </div>

          <p className={styles.bodyText}>
            Total estimated: approximately <strong>3.7GB</strong> for moderate use across the full
            14-day itinerary. A 10GB plan gives you generous headroom — including for social media,
            extra browsing, and unexpected navigation needs.
          </p>
          <p className={styles.bodyText}>
            <strong>Note:</strong> Data usage is heaviest on arrival days and travel days between
            cities — when you&apos;re navigating unfamiliar streets without the benefit of offline maps.
          </p>
        </section>

        {/* Best eSIMs for 2 Weeks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Top Picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for a 2-Week Japan Trip</h2>

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
                  <li><span className={styles.choiceCheck}>✓</span> Best price per GB on the market for 2-week trips</li>
                  <li><span className={styles.choiceCheck}>✓</span> Docomo network — Japan&apos;s widest rural coverage</li>
                  <li><span className={styles.choiceCheck}>✓</span> 30-day validity comfortably covers 14-day trips</li>
                  <li><span className={styles.choiceCheck}>✓</span> In-app top-up available if needed</li>
                  <li><span className={styles.conIcon}>−</span> Email-only support (no live chat)</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            eSIM Go&apos;s 10GB plan at $14 is our top pick for 2-week travellers. With 30-day validity
            covering your full trip and enough data for most travel styles, it&apos;s hard to beat on value.
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
                  <li><span className={styles.choiceCheck}>✓</span> Docomo &amp; SoftBank — dual network access</li>
                  <li><span className={styles.choiceCheck}>✓</span> 24/7 live chat support from anywhere in Japan</li>
                  <li><span className={styles.choiceCheck}>✓</span> Trusted brand — 10M+ users globally</li>
                  <li><span className={styles.conIcon}>−</span> $4 more than eSIM Go for the same 10GB</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            At $18, Airalo costs $4 more than eSIM Go for the same 10GB. The premium buys you
            24/7 live chat support and dual-network access — worth it if you&apos;re a first-time eSIM
            user or want the reassurance of instant help if something goes wrong.
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
                  <p className={styles.choiceCardTitle}>3. Holafly 30-day – For Heavy Users</p>
                  <p className={styles.choiceCardSubtitle}>$27–$49 / Unlimited · SoftBank</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Truly unlimited — stream, hotspot, browse without worry</li>
                  <li><span className={styles.choiceCheck}>✓</span> Best for remote workers and content creators</li>
                  <li><span className={styles.conIcon}>−</span> 2–3x the price of eSIM Go 10GB</li>
                  <li><span className={styles.conIcon}>−</span> Fair use throttling above certain daily thresholds</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Holafly&apos;s 30-day unlimited plan makes sense only for remote workers who video call
            all day, vloggers who upload large files regularly, or groups sharing one connection.
            For standard tourists, the premium is rarely justified.
          </p>
          <a
            href="#"
            className={styles.pickCtaInternal}
            style={{ marginTop: "0.75rem", marginBottom: "2rem", display: "inline-flex" }}
          >
            Get Holafly Japan eSIM →
          </a>

          {/* Sakura Mobile */}
          <div className={styles.choiceGrid} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader}`} style={{ background: "linear-gradient(135deg, #be185d 0%, #9d174d 100%)" }}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>4. Sakura Mobile – Need Voice Calls</p>
                  <p className={styles.choiceCardSubtitle}>From $28 / Data + Voice · Docomo</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Only tourist SIM with real voice call support</li>
                  <li><span className={styles.choiceCheck}>✓</span> Japanese phone number included</li>
                  <li><span className={styles.choiceCheck}>✓</span> English-speaking customer support</li>
                  <li><span className={styles.conIcon}>−</span> More expensive than data-only eSIMs</li>
                  <li><span className={styles.conIcon}>−</span> Requires advance ordering and SIM delivery</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Sakura Mobile is the right choice if you need a real Japanese phone number — for hotel
            SMS verification, local taxi apps, or making calls. It&apos;s the only tourist-friendly SIM
            with voice support and English customer service. Not necessary for most visitors.
          </p>
          <a
            href="https://p.sakuramobile.jp/idevaffiliate.php?id=486"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.75rem", marginBottom: "0.5rem", display: "inline-flex" }}
          >
            Get Sakura Mobile →
          </a>
        </section>

        {/* Physical SIM consideration */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>SIM vs eSIM</span>
          <h2 className={styles.sectionTitle}>Should I Consider a Physical SIM for 2 Weeks?</h2>
          <p className={styles.bodyText}>
            For most 2-week visitors, an eSIM is the better choice. But here are the scenarios
            where a physical SIM makes sense:
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Voice calls needed</p>
              <p className={styles.whoForDesc}>
                If you need a real Japanese phone number for calls or SMS, Sakura Mobile&apos;s
                physical SIM or eSIM is your only tourist-friendly option.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>No eSIM-compatible phone</p>
              <p className={styles.whoForDesc}>
                Older smartphones (pre-2018) don&apos;t support eSIM. In this case, a physical SIM
                card from Sakura Mobile or a Japan airport SIM is the only option.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Staying 1 month or more</p>
              <p className={styles.whoForDesc}>
                For stays over one month, consider Japan&apos;s domestic MVNO SIMs — IIJmio or
                Rakuten Mobile — which offer better long-term rates than tourist eSIMs.
              </p>
            </div>
          </div>
        </section>

        {/* Data saving tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Travel Tips</span>
          <h2 className={styles.sectionTitle}>Data Saving Tips for 2-Week Trips</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Offline maps first</p>
              <p className={styles.whoForDesc}>
                Download Google Maps for every city before you visit. Offline navigation
                uses zero data — one of the biggest single savings over a 14-day trip.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>WiFi for video streaming</p>
              <p className={styles.whoForDesc}>
                Watch Netflix and YouTube only over hotel WiFi. Streaming consumes 1GB+
                per hour — the biggest single data drain on any trip.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Konbini WiFi as backup</p>
              <p className={styles.whoForDesc}>
                7-Eleven, Lawson, and FamilyMart all offer free WiFi. Useful for quick
                tasks when you want to preserve your eSIM data on busy days.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Batch your social posts</p>
              <p className={styles.whoForDesc}>
                Write captions and queue photos during the day, then post everything over
                hotel WiFi in the evening. Reduces social media data use significantly.
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
            <Link href="/guides/esim/japan-esim-10-days" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Japan eSIM for 10 Days (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-sim-short-vs-long-stay" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Japan SIM Card for Your Trip Length (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026: Best SIM for Long Stays?</p>
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
