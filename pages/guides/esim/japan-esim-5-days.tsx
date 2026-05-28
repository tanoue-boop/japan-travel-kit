import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const dataTable = [
  { activity: "Google Maps",      perDay: "50MB",    total: "250MB"  },
  { activity: "Social media",     perDay: "150MB",   total: "750MB"  },
  { activity: "Messaging",        perDay: "20MB",    total: "100MB"  },
  { activity: "Light browsing",   perDay: "80MB",    total: "400MB"  },
  { activity: "Total (light use)",perDay: "~300MB",  total: "~1.5GB" },
  { activity: "Total (moderate)", perDay: "~600MB",  total: "~3GB"   },
  { activity: "Total (heavy use)", perDay: "~1GB+", total: "~5GB+"  },
];

const itinerary = [
  { day: "Day 1", location: "Arrive Tokyo",    note: "Heavy map use — airport navigation", data: "~500MB" },
  { day: "Day 2", location: "Tokyo sightseeing", note: "Shibuya, Shinjuku, Asakusa",        data: "~300MB" },
  { day: "Day 3", location: "Shinkansen to Kyoto", note: "Train has WiFi; light usage",    data: "~200MB" },
  { day: "Day 4", location: "Kyoto temples",   note: "Maps, photos, social posting",        data: "~300MB" },
  { day: "Day 5", location: "Departure day",   note: "Airport navigation, messaging",       data: "~200MB" },
];

const faqItems = [
  {
    q: "How much data do I need for 5 days in Japan?",
    a: "For light use, around 1–1.5GB. For moderate use including regular social media, Google Maps all day, and some browsing, budget 2–3GB. Heavy users who stream video should get 5GB or consider unlimited.",
  },
  {
    q: "Is 1GB enough for 5 days in Japan?",
    a: "It depends on your habits. 1GB can work if you rely heavily on hotel WiFi and offline maps. But for most travellers who actively use their phone throughout the day, 1GB will feel tight over 5 days. We recommend 3GB as the safe option.",
  },
  {
    q: "What is the best eSIM for a Tokyo and Kyoto trip?",
    a: "Airalo's 3GB plan at $9.50 is our top recommendation for a 5-day Tokyo–Kyoto trip. It gives you a comfortable buffer for navigation-heavy arrival days and tourist exploration without overpaying.",
  },
  {
    q: "Can I top up my eSIM if I run out in Japan?",
    a: "Yes. Airalo and eSIM Go both allow top-ups from within their apps. You can purchase an additional data package while in Japan and it activates instantly — no need to scan a new QR code.",
  },
  {
    q: "Is Holafly worth it for 5 days in Japan?",
    a: "For most travellers, no. Holafly's 5-day plan costs $19, while Airalo's 3GB 30-day plan costs $9.50. Unless you genuinely stream video daily or share your hotspot, Airalo is better value for a 5-day trip.",
  },
];

export default function JapanEsim5DaysPage() {
  return (
    <>
      <Head>
        <title>Best Japan eSIM for 5 Days 2026: Top Picks | Japan Travel Kit</title>
        <meta
          name="description"
          content="Visiting Japan for 5 days? You'll need 1–3GB. We compare the best eSIM plans for a typical Tokyo and Kyoto trip — with prices from $3.50."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-5-days" />
        <meta property="og:title" content="Best Japan eSIM for 5 Days 2026: Top Picks | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-5-days" />
        <meta property="og:description" content="Visiting Japan for 5 days? You'll need 1–3GB. We compare the best eSIM plans for a typical Tokyo and Kyoto trip — with prices from $3.50." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Japan eSIM for 5 Days 2026: Top Picks | Japan Travel Kit" />
        <meta name="twitter:description" content="Visiting Japan for 5 days? You'll need 1–3GB. We compare the best eSIM plans for a typical Tokyo and Kyoto trip — with prices from $3.50." />
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
                { "@type": "ListItem", position: 4, name: "Best Japan eSIM for 5 Days", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-5-days" },
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
              headline: "Best Japan eSIM for 5 Days (2026): Top Picks for Short Trips",
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
          <span className={styles.breadCurrent}>Best Japan eSIM for 5 Days</span>
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
            Best Japan eSIM for 5 Days (2026):<br />Top Picks for Short Trips
          </h1>
          <p className={styles.heroSubtitle}>
            Five days in Japan is enough for Tokyo and one more city.
            Here&apos;s the right eSIM plan — without overspending.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "5-Day Trips", "Best Value"].map((t) => (
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
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>5-Day Trips</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for Light Users</p>
                <p className={styles.verdictStatValue}>eSIM Go 1GB ($3.50)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Overall</p>
                <p className={styles.verdictStatValue}>Airalo 3GB ($9.50)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Data Needed</p>
                <p className={styles.verdictStatValue}>1GB–3GB for 5 days</p>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", marginTop: "0.75rem", marginBottom: "1rem" }}>
              <strong style={{ color: "#fbbf24" }}>Avoid:</strong> Unlimited plans — still overkill for most 5-day travellers.
            </p>
            <div className={styles.pickCtaRow}>
              <a
                href="https://airalo.pxf.io/c/7213504/1268485/15608"
                className={styles.verdictBtn}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get Airalo 3GB ($9.50) →
              </a>
              <a
                href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN"
                className={styles.pickCtaInternal}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get eSIM Go ($3.50) →
              </a>
            </div>
          </div>
        </div>

        {/* How Much Data */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Data Guide</span>
          <h2 className={styles.sectionTitle}>How Much Data Do You Need for 5 Days?</h2>
          <p className={styles.bodyText}>
            Five days gives you enough time for Tokyo plus one other city — typically Kyoto, Osaka,
            or Hakone. Your data usage will vary significantly depending on how much you rely on
            navigation and social media. Here&apos;s a realistic breakdown:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Per Day</th>
                    <th>5 Days Total</th>
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
            <strong>Recommendation:</strong> A 3GB plan is the sweet spot for most 5-day visitors.
            It gives you comfortable headroom without overpaying. Light users who rely on hotel
            WiFi can get away with 1GB.
          </p>
        </section>

        {/* 5-Day Itinerary */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Itinerary Guide</span>
          <h2 className={styles.sectionTitle}>Typical 5-Day Japan Itinerary &amp; Data Use</h2>
          <p className={styles.bodyText}>
            A Tokyo → Kyoto trip is Japan&apos;s most popular 5-day itinerary. Here&apos;s how data usage
            breaks down day by day:
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
                    <td className={styles.ftSim}>~1.5GB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Based on this itinerary, most travellers will use around 1.5GB. We recommend a 3GB
            plan for a comfortable buffer — especially on arrival day when map usage spikes.
          </p>
        </section>

        {/* Best eSIMs for 5 Days */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Top Picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for a 5-Day Japan Trip</h2>

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
                  <p className={styles.choiceCardTitle}>1. eSIM Go 1GB – Best for Light Users</p>
                  <p className={styles.choiceCardSubtitle}>$3.50 / 7 days · Docomo network</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Cheapest option — only $3.50</li>
                  <li><span className={styles.choiceCheck}>✓</span> Docomo network — nationwide coverage</li>
                  <li><span className={styles.choiceCheck}>✓</span> Works well if you use hotel WiFi heavily</li>
                  <li><span className={styles.conIcon}>−</span> 1GB may feel tight for active phone users</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Perfect if you download offline maps in advance, use hotel WiFi for streaming, and
            don&apos;t post to social media constantly. If that sounds like you, $3.50 is hard to beat.
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
                  <p className={styles.choiceCardTitle}>2. Airalo 3GB – Best Overall for 5 Days</p>
                  <p className={styles.choiceCardSubtitle}>$9.50 / 30 days · Docomo &amp; SoftBank</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> 3GB covers most 5-day itineraries comfortably</li>
                  <li><span className={styles.choiceCheck}>✓</span> Docomo &amp; SoftBank — dual network access</li>
                  <li><span className={styles.choiceCheck}>✓</span> 24/7 live chat support</li>
                  <li><span className={styles.choiceCheck}>✓</span> Top-up available in-app if needed</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Airalo&apos;s 3GB plan is our recommended pick for 5-day visitors. At $9.50, it gives you
            a comfortable data buffer for an active trip — maps, social media, messaging, and
            occasional browsing — without the worry of running out.
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
                  <p className={styles.choiceCardTitle}>3. Holafly 5-Day – For Heavy Users Only</p>
                  <p className={styles.choiceCardSubtitle}>$19 / Unlimited · SoftBank</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Truly unlimited data — no cap</li>
                  <li><span className={styles.choiceCheck}>✓</span> Great for daily video streaming</li>
                  <li><span className={styles.conIcon}>−</span> $19 is expensive vs. Airalo 3GB at $9.50</li>
                  <li><span className={styles.conIcon}>−</span> Fair use policy may throttle heavy usage</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText}>
            Holafly is only worth considering if you genuinely need unlimited data — streaming
            Netflix on the shinkansen, uploading large videos, or sharing your hotspot constantly.
            For typical tourists, Airalo&apos;s 3GB plan costs half the price and covers all typical real-world needs.
          </p>
          <a
            href="#"
            className={styles.pickCtaInternal}
            style={{ marginTop: "0.75rem", marginBottom: "0.5rem", display: "inline-flex" }}
          >
            Get Holafly Japan eSIM →
          </a>
        </section>

        {/* Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Travel Tips</span>
          <h2 className={styles.sectionTitle}>Tips for 5-Day Japan Trips</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" /><path d="M3 12h4l3-9 4 18 3-9h4" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Shinkansen tip</p>
              <p className={styles.whoForDesc}>
                Download offline content before boarding the shinkansen. The train has WiFi, but save your eSIM data for city exploration.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Arrival day alert</p>
              <p className={styles.whoForDesc}>
                Arrival day uses the most data — airport navigation, finding your hotel, first-day exploration. Expect 400–500MB on Day 1.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Batch your uploads</p>
              <p className={styles.whoForDesc}>
                Save Instagram and photo uploads for hotel WiFi in the evenings. This alone can halve your daily data usage.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Set up before flying</p>
              <p className={styles.whoForDesc}>
                Install your eSIM at home before departure. It takes 2 minutes and ensures you&apos;re connected the moment you land.
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
            <Link href="/guides/esim/japan-esim-3-days" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Japan eSIM for 3 Days 2026: Top Picks for Short Trips</p>
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
            <Link href="/guides/esim/airalo-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2026: Is It Worth It?</p>
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
