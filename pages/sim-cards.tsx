import Head from "next/head";
import Link from "next/link";
import { simCards } from "../lib/sim-cards";
import SIMCardCard from "../components/SIMCardCard";
import styles from "../styles/SimCards.module.css";

const faqItems = [
  {
    q: "Do I need a Japan SIM card or can I use my home carrier?",
    a: "International roaming is usually very expensive ($10–15/day). A tourist SIM or eSIM is far cheaper — typically $10–30 for 2–4 weeks of data.",
  },
  {
    q: "What's the difference between a SIM card and an eSIM?",
    a: "A physical SIM is a tiny card you insert into your phone. An eSIM is digital — scan a QR code and it activates instantly. Most modern phones (iPhone XS+, recent Android) support eSIM.",
  },
  {
    q: "Which network has the best coverage in Japan?",
    a: "Docomo has the most extensive rural coverage. SoftBank and au are excellent in cities. For most tourist routes (Tokyo, Kyoto, Osaka, Hiroshima), any major carrier works well.",
  },
  {
    q: "Can I make phone calls with a tourist SIM?",
    a: "Most data-only tourist SIMs don't include voice calls. IIJmio and Sakura Mobile offer voice-enabled plans. For international calls, WhatsApp and LINE work over data.",
  },
  {
    q: "When should I buy my Japan SIM card?",
    a: "Buy an eSIM before you leave home — activate it the moment your plane lands. Physical SIMs can be picked up at the airport on arrival, but popular options sometimes sell out.",
  },
];

const badgeColorMap: Record<string, string> = {
  "bg-blue-500":   styles.tdBadgeBlue,
  "bg-green-500":  styles.tdBadgeGreen,
  "bg-orange-500": styles.tdBadgeOrange,
};

export default function SIMCardsPage() {
  return (
    <>
      <Head>
        <title>Best Japan SIM Cards 2025 — Compare Tourist SIM & eSIM | Japan Travel Kit</title>
        <meta
          name="description"
          content="Compare the best Japan tourist SIM cards and eSIMs for 2025. Airalo, IIJmio, Klook, Sakura Mobile — prices, coverage, and honest reviews."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/sim-cards" />
        <meta property="og:title" content="Best Japan SIM Cards 2025 — Compare Tourist SIM & eSIM" />
        <meta property="og:url" content="https://japan-travel-kit.com/sim-cards" />
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
          <span className={styles.breadCurrent}>SIM Cards</span>
        </div>
      </div>

      {/* Page header */}
      <section className={styles.pageHeader}>
        <div className={styles.pageHeaderDots} />
        <div className={styles.pageHeaderInner}>
          <p className={styles.updated}>
            <span>📱</span> Updated April 2025
          </p>
          <h1 className={styles.pageTitle}>
            Best Japan SIM Cards<br />&amp; eSIMs for Tourists
          </h1>
          <p className={styles.pageDesc}>
            We compared {simCards.length} popular tourist SIM options on price, coverage, and ease of use.
            Here&apos;s our honest recommendation for each type of traveler.
          </p>
          <div className={styles.badges}>
            {["Independently reviewed", "Prices verified", "No paid placements"].map((t) => (
              <span key={t} className={styles.badge}>
                <span className={styles.badgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Affiliate disclosure */}
        <div className={styles.disclosure}>
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links below are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our rankings or reviews.
          </p>
        </div>

        {/* Quick nav */}
        <div className={styles.quickNav}>
          <p className={styles.quickNavLabel}>Jump to:</p>
          <div className={styles.quickNavGrid}>
            {simCards.map((sim) => (
              <a key={sim.id} href={`#${sim.id}`} className={styles.quickNavItem}>
                <span className={styles.quickNavArrow}>→</span>
                <span>{sim.name}</span>
                {sim.badge && <span className={styles.quickNavBadge}>{sim.badge}</span>}
              </a>
            ))}
          </div>
        </div>

        {/* SIM cards */}
        <div className={styles.simList}>
          {simCards.map((sim) => (
            <div key={sim.id} id={sim.id}>
              <SIMCardCard sim={sim} />
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <section className={styles.comparison}>
          <div className={styles.comparisonHead}>
            <span className={styles.sectionLabel}>At a glance</span>
            <h2 className={styles.sectionTitle}>Quick Comparison</h2>
          </div>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "From", "Network", "eSIM", "Voice", "Rating"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {simCards.map((sim) => {
                    const cheapest = sim.plans.reduce((a, b) => (a.price < b.price ? a : b));
                    const badgeCls = sim.badgeColor ? (badgeColorMap[sim.badgeColor] ?? styles.tdBadgeBlue) : "";
                    return (
                      <tr key={sim.id}>
                        <td>
                          <a href={`#${sim.id}`} className={styles.tdName}>{sim.name}</a>
                          {sim.badge && (
                            <span className={`${styles.tdBadge} ${badgeCls}`}>{sim.badge}</span>
                          )}
                        </td>
                        <td className={styles.tdPrice}>${cheapest.price.toFixed(2)}</td>
                        <td style={{ fontSize: "0.78rem" }}>{sim.coverage.split("(")[0].trim()}</td>
                        <td>{sim.esim ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>{sim.voiceCall ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>
                          <span className={styles.tdRating}>
                            <span style={{ color: "#fbbf24" }}>★</span>
                            {sim.rating}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Article link */}
        <div style={{
          background: "linear-gradient(135deg, #0d1b4b, #1a237e)",
          borderRadius: "20px",
          padding: "2rem 1.75rem",
          marginTop: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f87171", marginBottom: "0.3rem" }}>
              In-depth guide
            </p>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
              Best eSIM for Japan 2025: Tested &amp; Compared
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginTop: "0.3rem" }}>
              Which eSIM is actually right for your trip? We break it down.
            </p>
          </div>
          <Link href="/guides/esim/best-esim-japan" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "#c62828",
            color: "#fff",
            padding: "0.7rem 1.4rem",
            borderRadius: "10px",
            fontSize: "0.88rem",
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            Read the guide →
          </Link>
        </div>

        {/* FAQ */}
        <section className={styles.faq}>
          <div className={styles.faqHead}>
            <span className={styles.sectionLabel}>FAQ</span>
            <h2 className={styles.sectionTitle}>Common Questions</h2>
          </div>
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
      </div>
    </>
  );
}
