import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const AIRALO_URL = "https://airalo.pxf.io/c/7213504/1268485/15608";
const SAKURA_URL = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
const ESIMGO_URL = "https://breezesim.com?sca_ref=11082101.AF8vabyRKN";
const HOLAFLY_URL = "#";

const priceTable = [
  { provider: "eSIM Go",       p1gb: "$3.50", p5gb: "$8.00",  p10gb: "$14.00", unlimited: "✗" },
  { provider: "Airalo",        p1gb: "$4.50", p5gb: "$9.50",  p10gb: "$18.00", unlimited: "✗" },
  { provider: "Holafly",       p1gb: "✗",     p5gb: "✗",      p10gb: "✗",      unlimited: "$19.00" },
  { provider: "Sakura Mobile", p1gb: "✗",     p5gb: "✗",      p10gb: "$28.00", unlimited: "✗" },
];

const picks = [
  {
    num: 1,
    name: "eSIM Go",
    badge: "Cheapest Per GB",
    badgeColor: "#1565c0",
    priceFrom: "$3.50 / 7 days",
    network: "Docomo (nationwide)",
    affiliateUrl: ESIMGO_URL,
    ctaLabel: "Get eSIM Go Japan →",
    pros: [
      "Lowest price per GB on the market",
      "Docomo network — best rural coverage",
      "Instant QR code activation",
      "Works in 190+ countries",
    ],
    cons: [
      "Data-only (no voice or SMS)",
      "Smaller brand — less community support",
      "Email-only customer service",
    ],
    summary:
      "eSIM Go is the cheapest Japan eSIM we tested, at $3.50 for 1 GB / 7 days. It runs on Docomo — Japan's most reliable network — and activates instantly via QR code. Ideal for short visits or anyone watching their budget.",
  },
  {
    num: 2,
    name: "Airalo",
    badge: "Best Balance",
    badgeColor: "#0d1b4b",
    priceFrom: "$4.50 / 7 days",
    network: "Docomo & SoftBank",
    affiliateUrl: AIRALO_URL,
    ctaLabel: "Get Airalo Japan eSIM →",
    pros: [
      "Trusted by 10M+ travellers worldwide",
      "Slightly more data options than eSIM Go",
      "24/7 live chat support",
      "Easy-to-use app",
    ],
    cons: [
      "Data-only (no voice calls or SMS)",
      "Slightly pricier than eSIM Go",
      "eSIM-compatible phone required",
    ],
    summary:
      "Airalo costs a little more than eSIM Go ($4.50 vs $3.50 for 1 GB), but you get 24/7 live chat support and the backing of the world's largest eSIM marketplace. A great choice if you want budget pricing with stronger customer support.",
  },
  {
    num: 3,
    name: "Holafly",
    badge: "Cheapest Unlimited",
    badgeColor: "#e65100",
    priceFrom: "$19 / 5 days",
    network: "SoftBank (nationwide)",
    affiliateUrl: HOLAFLY_URL,
    ctaLabel: "Get Holafly Japan eSIM →",
    pros: [
      "Truly unlimited data — no caps",
      "No speed throttling after a threshold",
      "Easy QR code setup",
      "Popular with US & European travellers",
    ],
    cons: [
      "Data-only (no calls or SMS)",
      "Pricier than capped alternatives",
      "eSIM-only device required",
    ],
    summary:
      "If you stream constantly, use Google Maps all day, or simply want peace of mind about your data, Holafly's unlimited plan at $19 for 5 days is the most affordable unlimited eSIM for Japan. It costs more per GB than eSIM Go, but on an unlimited plan, per-GB cost is irrelevant.",
  },
  {
    num: 4,
    name: "Sakura Mobile",
    badge: "Cheapest with Voice",
    badgeColor: "#2e7d32",
    priceFrom: "$28 / 30 days",
    network: "Docomo (nationwide)",
    affiliateUrl: SAKURA_URL,
    ctaLabel: "Get Sakura Mobile SIM →",
    pros: [
      "Voice calls & SMS included",
      "Full English customer support by phone",
      "Physical SIM or eSIM available",
      "Best for stays of 1 month+",
    ],
    cons: [
      "Higher price than data-only options",
      "Requires advance order for physical SIM",
      "Not ideal for short trips",
    ],
    summary:
      "Sakura Mobile is the only budget-friendly option that includes real voice calls — not just VoIP over data. At $28 for 30 days / 7 GB, it's the cheapest SIM for Japan if calling is a requirement. Runs on Docomo with dedicated English-language support.",
  },
];

const dealTips = [
  {
    trip: "Short trip (up to 7 days)",
    pick: "eSIM Go 1 GB — $3.50",
    why: "Covers typical tourist data use (maps, social, messaging) without overpaying.",
    url: ESIMGO_URL,
  },
  {
    trip: "Two-week trip",
    pick: "eSIM Go 5 GB — $8.00",
    why: "Plenty of data for navigation, translation apps, and social media over 15 days.",
    url: ESIMGO_URL,
  },
  {
    trip: "One-month stay",
    pick: "eSIM Go 10 GB ($14) or Sakura Mobile ($28)",
    why: "eSIM Go if data-only is fine; Sakura Mobile if you need voice calls.",
    url: ESIMGO_URL,
  },
  {
    trip: "Heavy data user",
    pick: "Holafly Unlimited — from $19",
    why: "Stream video, use your phone as a hotspot, or simply stop worrying about data altogether.",
    url: HOLAFLY_URL,
  },
];

const faqItems = [
  {
    q: "What is the cheapest eSIM for Japan?",
    a: "eSIM Go is the cheapest Japan eSIM available, starting at $3.50 for 1 GB / 7 days on the Docomo network. Airalo is a close second at $4.50 for the same data. Both are data-only eSIMs that activate instantly via QR code.",
  },
  {
    q: "Is a cheap eSIM reliable in Japan?",
    a: "Yes. Cheap eSIMs like eSIM Go and Airalo run on the same Docomo and SoftBank infrastructure used by expensive plans. Network quality in Japan is world-class regardless of which reseller you buy from — you're paying less for distribution, not for a worse connection.",
  },
  {
    q: "How much data do I need for 1 week in Japan?",
    a: "For typical tourist use — Google Maps, messaging apps, light social media — 1 GB is usually enough for a week. If you plan to stream video, use a hotspot, or navigate heavily, go for 3–5 GB. Heavy users (constant streaming, working remotely) should consider an unlimited plan like Holafly.",
  },
  {
    q: "Can I top up a cheap eSIM in Japan?",
    a: "Yes, with Airalo. You can purchase an additional plan from the Airalo app while in Japan and it tops up your existing profile without scanning a new QR code. eSIM Go also allows additional data purchases, though the process varies. Holafly's unlimited plan means you'll never need a top-up.",
  },
  {
    q: "Is eSIM cheaper than roaming in Japan?",
    a: "Almost always, yes. Most international roaming plans charge $10–15 per day. eSIM Go starts at $3.50 for a full week — less than a single day of roaming. Even Holafly's unlimited plan at $19 / 5 days works out far cheaper than roaming charges for the same period.",
  },
];

export default function CheapestEsimJapanPage() {
  return (
    <>
      <Head>
        <title>Cheapest eSIM for Japan 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Looking for the cheapest eSIM for Japan? We compared prices across Airalo, eSIM Go, Holafly and Sakura Mobile. From $3.50."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/cheapest-esim-japan" />
        <meta property="og:title" content="Cheapest eSIM for Japan 2026: Best Budget Picks Tested & Compared" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/cheapest-esim-japan" />
        <meta property="og:description" content="Looking for the cheapest eSIM for Japan? We compared prices across Airalo, eSIM Go, Holafly and Sakura Mobile. From $3.50." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cheapest eSIM for Japan 2026: Best Budget Picks Tested & Compared" />
        <meta name="twitter:description" content="Looking for the cheapest eSIM for Japan? We compared prices across Airalo, eSIM Go, Holafly and Sakura Mobile. From $3.50." />
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
              headline: "Cheapest eSIM for Japan 2026: Best Budget Picks Tested & Compared",
              dateModified: "2026-04-01",
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Cheapest eSIM for Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>💰</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Cheapest eSIM for Japan 2026:<br />Best Budget Picks
          </h1>
          <p className={styles.heroSubtitle}>
            You don&apos;t need to overpay to stay connected in Japan. Here are the best value eSIMs we tested.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "4 eSIMs Compared", "Prices Verified"].map((t) => (
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
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest Overall</p>
                <p className={styles.verdictStatValue}>eSIM Go from $3.50</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest Unlimited</p>
                <p className={styles.verdictStatValue}>Holafly from $19</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Value Long Stay</p>
                <p className={styles.verdictStatValue}>Sakura Mobile from $28</p>
              </div>
            </div>
            <a href={ESIMGO_URL} className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get eSIM Go Japan (from $3.50) →
            </a>
          </div>
        </div>

        {/* Price Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At a glance</span>
          <h2 className={styles.sectionTitle}>Price Comparison</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "1 GB", "5 GB", "10 GB", "Unlimited"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceTable.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider} style={{ fontWeight: 700 }}>{row.provider}</td>
                      <td className={row.p1gb === "✗" ? styles.tdNo : styles.tdPrice}>{row.p1gb}</td>
                      <td className={row.p5gb === "✗" ? styles.tdNo : styles.tdPrice}>{row.p5gb}</td>
                      <td className={row.p10gb === "✗" ? styles.tdNo : styles.tdPrice}>{row.p10gb}</td>
                      <td className={row.unlimited === "✗" ? styles.tdNo : styles.tdPrice}>{row.unlimited}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Prices are approximate and subject to change. Please verify the latest pricing on each provider&apos;s official website. All plans are eSIM-only unless noted.
          </p>
        </section>

        {/* Best Cheap eSIMs */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rankings</span>
          <h2 className={styles.sectionTitle}>Best Cheap eSIMs for Japan</h2>

          {picks.map((pick) => (
            <div key={pick.num} style={{ marginBottom: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  background: pick.badgeColor,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  flexShrink: 0,
                }}>{pick.num}</span>
                <h3 className={styles.sectionTitle} style={{ margin: 0, fontSize: "1.2rem" }}>
                  {pick.name}
                  <span style={{
                    display: "inline-block",
                    marginLeft: "0.6rem",
                    background: pick.badgeColor,
                    color: "#fff",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    verticalAlign: "middle",
                  }}>{pick.badge}</span>
                </h3>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>
                  <strong style={{ color: "#0d1b4b" }}>From:</strong> {pick.priceFrom}
                </span>
                <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>
                  <strong style={{ color: "#0d1b4b" }}>Network:</strong> {pick.network}
                </span>
              </div>

              <p className={styles.bodyText}>{pick.summary}</p>

              <div className={styles.pickGrid}>
                <div className={styles.pickPros}>
                  <p className={styles.pickListLabel}>Pros</p>
                  <ul className={styles.pickList}>
                    {pick.pros.map((p) => (
                      <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.pickCons}>
                  <p className={styles.pickListLabel}>Cons</p>
                  <ul className={styles.pickList}>
                    {pick.cons.map((c) => (
                      <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {pick.affiliateUrl !== "#" ? (
                <a
                  href={pick.affiliateUrl}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  style={{ marginTop: "1rem" }}
                >
                  {pick.ctaLabel}
                </a>
              ) : (
                <Link
                  href="/sim-cards"
                  className={styles.pickCta}
                  style={{ marginTop: "1rem" }}
                >
                  {pick.ctaLabel}
                </Link>
              )}
            </div>
          ))}
        </section>

        {/* How to Get the Best Deal */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Buying guide</span>
          <h2 className={styles.sectionTitle}>How to Get the Best Deal</h2>
          <div className={styles.stepsList}>
            {dealTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.trip}</p>
                  <p className={styles.stepDesc}>
                    <strong>{tip.pick}</strong> — {tip.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Are Cheap eSIMs Reliable */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Network quality</span>
          <h2 className={styles.sectionTitle}>Are Cheap eSIMs Reliable in Japan?</h2>
          <p className={styles.bodyText}>
            Yes — and here&apos;s why. Japan&apos;s mobile infrastructure is among the best in the world.
            Docomo and SoftBank, the two networks used by budget eSIMs like eSIM Go and Airalo,
            consistently rank among the world&apos;s top 10 for 4G coverage and download speeds.
          </p>
          <p className={styles.bodyText}>
            When you buy a cheap eSIM for Japan, you&apos;re not buying a worse network — you&apos;re buying
            the same Docomo or SoftBank signal at a lower price. The cost savings come from lower
            distribution overhead (no physical SIM cards, no airport kiosks) and competitive
            reseller pricing, not from degraded network access.
          </p>
          <p className={styles.bodyText}>
            In practice, eSIM Go and Airalo both provide the same download speeds and coverage as
            plans that cost three times more. The main trade-off at lower price points is customer
            support quality — eSIM Go offers email-only support, while Airalo has 24/7 live chat.
            For most travellers who just need their eSIM to work, support rarely comes up.
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
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/esim-go-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>eSIM Go Japan Review 2026: Best Budget eSIM?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/esim-vs-sim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>eSIM vs SIM Card for Japan: Which Should You Get?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              See how eSIM Go, Airalo, Holafly, and Sakura Mobile compare on price, coverage, and features.
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
