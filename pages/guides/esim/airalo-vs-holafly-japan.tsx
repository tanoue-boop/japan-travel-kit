import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const comparisonRows = [
  { feature: "Price (7 days)", airalo: "$4.50 (1GB)", holafly: "$19 (Unlimited)" },
  { feature: "Data", airalo: "1GB–10GB", holafly: "Unlimited" },
  { feature: "Network", airalo: "Docomo & SoftBank", holafly: "SoftBank" },
  { feature: "Speed throttling", airalo: "No", holafly: "Fair use policy" },
  { feature: "Voice calls", airalo: "No", holafly: "No" },
  { feature: "App quality", airalo: "Excellent", holafly: "Good" },
  { feature: "Customer support", airalo: "24/7 live chat", holafly: "Email & chat" },
  { feature: "Countries", airalo: "190+", holafly: "200+" },
  { feature: "Best for", airalo: "Budget & short trips", holafly: "Heavy users" },
];

const priceRows = [
  { usage: "1GB / 7 days",    airalo: "$4.50",  holafly: "$19",  winner: "Airalo" },
  { usage: "3GB / 7 days",    airalo: "$9.50",  holafly: "$19",  winner: "Airalo" },
  { usage: "10GB / 10 days",  airalo: "$18",    holafly: "$27",  winner: "Airalo" },
  { usage: "Unlimited / 10 days", airalo: "N/A", holafly: "$27", winner: "Holafly" },
  { usage: "Unlimited / 30 days", airalo: "N/A", holafly: "$49", winner: "Holafly" },
];

const faqItems = [
  {
    q: "Is Airalo or Holafly better for Japan?",
    a: "For most travellers, Airalo offers better value. If you use 1–10 GB during your trip, Airalo's data plans cost significantly less than Holafly's unlimited plans. Holafly is the better choice only if you're a heavy data user who streams video, uses a hotspot constantly, or simply doesn't want to think about data limits.",
  },
  {
    q: "Is Holafly worth the extra cost in Japan?",
    a: "Holafly is worth the extra cost if you genuinely need unlimited data — for example, if you stream Netflix, upload lots of video, or share your connection with others. For light to moderate usage (maps, social media, messaging), the extra cost rarely justifies itself. Airalo's 3GB or 10GB plans cover most typical tourist usage at a fraction of the price.",
  },
  {
    q: "Which has better coverage, Airalo or Holafly?",
    a: "Airalo has an advantage here. Airalo runs on both Docomo and SoftBank networks, giving you better rural coverage across Japan. Holafly runs on SoftBank only. Both cover major cities, tourist routes, and popular areas well — but Airalo's Docomo access means stronger signal in mountainous regions and rural areas.",
  },
  {
    q: "Can I switch from Airalo to Holafly mid-trip?",
    a: "Yes, if your phone supports multiple eSIM profiles. You can install both eSIMs on your device (most modern iPhones and many Android phones support this), then switch between them as needed. Install both before you depart to make the process easier.",
  },
  {
    q: "Which is cheaper for a 2-week Japan trip?",
    a: "Airalo is cheaper for a 2-week trip unless you're a very heavy data user. Airalo's 10GB 30-day plan costs $18, compared to Holafly's 10-day plan at $27 or 30-day plan at $49. Even the heaviest typical tourist usage (constant maps, social media, some streaming) rarely exceeds 10GB in two weeks.",
  },
];

export default function AiraloVsHolaflyJapanPage() {
  return (
    <>
      <Head>
        <title>Airalo vs Holafly Japan 2026: Which Is Better? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Airalo or Holafly for Japan? We compare price, data, coverage and support head-to-head — with a clear recommendation for every type of traveller."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/airalo-vs-holafly-japan" />
        <meta property="og:title" content="Airalo vs Holafly Japan 2026: Which Is Better?" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/airalo-vs-holafly-japan" />
        <meta property="og:description" content="Airalo or Holafly for Japan? We compare price, data, coverage and support head-to-head — with a clear recommendation for every type of traveller." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Airalo vs Holafly Japan 2026: Which Is Better?" />
        <meta name="twitter:description" content="Airalo or Holafly for Japan? We compare price, data, coverage and support head-to-head — with a clear recommendation for every type of traveller." />
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
                { "@type": "ListItem", position: 4, name: "Airalo vs Holafly Japan", item: "https://www.japan-travel-kit.com/guides/esim/airalo-vs-holafly-japan" },
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
              headline: "Airalo vs Holafly for Japan (2026): Which Should You Choose?",
              dateModified: "2026-05-26",
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
          <span className={styles.breadCurrent}>Airalo vs Holafly Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>⚔️</span> Updated May 2026
          </p>
          <h1 className={styles.heroTitle}>
            Airalo vs Holafly for Japan (2026):<br />Which Should You Choose?
          </h1>
          <p className={styles.heroSubtitle}>
            Both are popular Japan eSIMs — but they suit very different travellers.
            Here&apos;s the honest comparison.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "Head-to-Head", "Honest Verdict"].map((t) => (
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

        {/* Quick Verdict Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Verdict</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Head-to-Head</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Choose Airalo if</p>
                <p className={styles.verdictStatValue}>Budget-conscious, 1–2 weeks, light–moderate data user</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Choose Holafly if</p>
                <p className={styles.verdictStatValue}>Heavy data user, worry-free travel, 10+ days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price Difference</p>
                <p className={styles.verdictStatValue}>Airalo from $4.50 vs Holafly from $19</p>
              </div>
            </div>
            <div className={styles.pickCtaRow}>
              <a
                href="https://airalo.pxf.io/c/7213504/1268485/15608"
                className={styles.verdictBtn}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get Airalo →
              </a>
              <a
                href="#"
                className={styles.pickCtaInternal}
              >
                Get Holafly →
              </a>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Side-by-Side Comparison</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Airalo</th>
                    <th>Holafly</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td className={styles.ftEsim}>{row.airalo}</td>
                      <td className={styles.ftSim}>{row.holafly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Airalo Key Strengths */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Provider Deep Dive</span>
          <h2 className={styles.sectionTitle}>Airalo for Japan: Key Strengths</h2>
          <div className={styles.choiceGrid}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderEsim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Airalo Japan</p>
                  <p className={styles.choiceCardSubtitle}>From $4.50 / 7 days</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Unbeatable cost — 1GB from $4.50</li>
                  <li><span className={styles.choiceCheck}>✓</span> Granular plans: 1GB, 3GB, 10GB</li>
                  <li><span className={styles.choiceCheck}>✓</span> Docomo network for strong rural coverage</li>
                  <li><span className={styles.choiceCheck}>✓</span> Industry-leading app experience</li>
                  <li><span className={styles.choiceCheck}>✓</span> 24/7 live chat support</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Airalo&apos;s biggest advantage is value. At $4.50 for 1GB over 7 days, it&apos;s the cheapest
            eSIM option for Japan. The tiered data plans let you buy only what you need, so
            you&apos;re never paying for unused data. Running on Docomo (Japan&apos;s widest network),
            you&apos;ll get reliable signal from Tokyo to rural Tohoku.
          </p>
          <Link href="/guides/esim/airalo-japan-review" className={styles.pickCtaInternal} style={{ marginTop: "0.5rem", display: "inline-flex" }}>
            Full Airalo Japan Review →
          </Link>
        </section>

        {/* Holafly Key Strengths */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Provider Deep Dive</span>
          <h2 className={styles.sectionTitle}>Holafly for Japan: Key Strengths</h2>
          <div className={styles.choiceGrid}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderSim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Holafly Japan</p>
                  <p className={styles.choiceCardSubtitle}>From $19 / Unlimited</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> True unlimited data — no data cap to worry about</li>
                  <li><span className={styles.choiceCheck}>✓</span> Comfortable for streaming &amp; video calls</li>
                  <li><span className={styles.choiceCheck}>✓</span> 10-day plan at $27 suits heavy users</li>
                  <li><span className={styles.choiceCheck}>✓</span> Simple pricing — one plan, no decisions</li>
                  <li><span className={styles.choiceCheck}>✓</span> Live chat customer support</li>
                </ul>
              </div>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Holafly&apos;s core appeal is peace of mind. There&apos;s no data counter to watch, no
            choosing between Google Maps and Instagram. If you stream video, share your hotspot,
            or simply don&apos;t want to track your usage — Holafly removes that friction entirely.
            The 10-day unlimited plan at $27 is competitive for heavy users.
          </p>
          <Link href="/guides/esim/holafly-japan-review" className={styles.pickCtaInternal} style={{ marginTop: "0.5rem", display: "inline-flex" }}>
            Full Holafly Japan Review →
          </Link>
        </section>

        {/* Price Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Value Analysis</span>
          <h2 className={styles.sectionTitle}>Price Comparison: When Does Holafly Win?</h2>
          <p className={styles.bodyText}>
            The real question is whether Holafly&apos;s unlimited plan is worth the premium over
            Airalo&apos;s data-capped plans. Here&apos;s the breakdown by actual usage scenario:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Usage Scenario</th>
                    <th>Airalo Cost</th>
                    <th>Holafly Cost</th>
                    <th>Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.usage}>
                      <td className={styles.ftFeature}>{row.usage}</td>
                      <td className={styles.ftEsim}>{row.airalo}</td>
                      <td className={styles.ftSim}>{row.holafly}</td>
                      <td>
                        <span className={row.winner === "Airalo" ? styles.ftWinnerEsim : styles.ftWinnerSim} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", fontWeight: 700, padding: "0.15rem 0.55rem", borderRadius: "9999px" }}>
                          {row.winner}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Bottom line:</strong> Airalo wins on price for virtually every usage scenario
            up to 10GB. Holafly only makes financial sense if you genuinely need unlimited data —
            i.e., you&apos;re streaming video daily or tethering a laptop.
          </p>
        </section>

        {/* Which Should You Choose */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Decision Guide</span>
          <h2 className={styles.sectionTitle}>Which Should You Choose?</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>1 week, normal use</p>
              <p className={styles.whoForDesc}>
                Airalo 3GB ($9.50). Maps, social media, messaging — 3GB is more than enough for a week.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>2 weeks, normal use</p>
              <p className={styles.whoForDesc}>
                Airalo 10GB ($18). A comfortable buffer for two weeks without video streaming.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Heavy user / video</p>
              <p className={styles.whoForDesc}>
                Holafly. Stream, upload, and share your hotspot without a data counter in your head.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Budget traveller</p>
              <p className={styles.whoForDesc}>
                Airalo 1GB ($4.50). Use offline maps and WiFi at cafes. The cheapest option by far.
              </p>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <a
              href="https://airalo.pxf.io/c/7213504/1268485/15608"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM →
            </a>
            <a
              href="#"
              className={styles.pickCtaInternal}
            >
              Get Holafly Japan eSIM →
            </a>
          </div>
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom Line</span>
          <h2 className={styles.sectionTitle}>Our Verdict</h2>
          <p className={styles.verdictText}>
            For most travellers, <strong>Airalo offers better value</strong>. The combination of
            affordable data plans, Docomo coverage, and a best-in-class app makes it the default
            recommendation for anyone visiting Japan for 1–4 weeks on a typical tourist itinerary.
          </p>
          <p className={styles.verdictText}>
            Choose Holafly only if you genuinely need unlimited data — heavy streamers, digital
            nomads, or anyone sharing their phone&apos;s hotspot throughout the day. For everyone else,
            Airalo&apos;s 3GB or 10GB plan will cover the trip at a fraction of Holafly&apos;s price.
          </p>
          <p className={styles.verdictText}>
            The price difference is meaningful: Airalo&apos;s 10GB plan for $18 versus Holafly&apos;s
            10-day unlimited for $27. Unless you reliably hit 10GB+, Airalo wins on value every time.
          </p>
          <div className={styles.pickCtaRow}>
            <a
              href="https://airalo.pxf.io/c/7213504/1268485/15608"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM →
            </a>
            <a
              href="#"
              className={styles.pickCtaInternal}
            >
              Get Holafly Japan eSIM →
            </a>
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
            <Link href="/guides/esim/holafly-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Holafly Japan eSIM Review 2026</p>
                <span className={styles.relatedArrow}>Read review →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks</p>
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
