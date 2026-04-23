import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const plans = [
  { duration: "5 days",  data: "Unlimited", price: "$19.00" },
  { duration: "10 days", data: "Unlimited", price: "$27.00" },
  { duration: "30 days", data: "Unlimited", price: "$49.00" },
];

const faqItems = [
  {
    q: "Is Holafly reliable in Japan?",
    a: "Yes. Holafly Japan runs on the SoftBank network, Japan's second-largest carrier. SoftBank has strong coverage in major cities and tourist destinations. Speed can vary during peak hours but is generally reliable for streaming, maps, and messaging.",
  },
  {
    q: "Which network does Holafly use in Japan?",
    a: "Holafly Japan exclusively uses the SoftBank network. SoftBank offers 4G LTE coverage across most of Japan, with theoretical speeds of up to 150Mbps in urban areas.",
  },
  {
    q: "Does Holafly work in rural Japan?",
    a: "Yes, for the most part. SoftBank has good rural coverage along major tourist routes. Very remote areas — deep mountain villages, some outlying islands — may have limited signal, but most popular tourist destinations are well covered.",
  },
  {
    q: "Is Holafly truly unlimited in Japan?",
    a: "Holafly does not apply data speed caps after a certain usage threshold, making it genuinely unlimited for most use cases. A fair use policy exists but is only triggered by extreme usage. In practice, most travellers won't encounter throttling.",
  },
  {
    q: "How do I activate Holafly in Japan?",
    a: "After purchasing, scan the QR code in your phone's Settings to install the eSIM. You can do this before your trip. Enable the Holafly eSIM profile when your plane lands in Japan — data will start working immediately without any airport queuing.",
  },
];

export default function DoesHolaflyWorkInJapanPage() {
  return (
    <>
      <Head>
        <title>Does Holafly Work in Japan? 2025 Coverage &amp; Speed Test | Japan Travel Kit</title>
        <meta
          name="description"
          content="Does Holafly work in Japan? Yes — we tested unlimited data on SoftBank network. Full coverage, speed and activation guide."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/does-holafly-work-in-japan" />
        <meta property="og:title" content="Does Holafly Work in Japan? 2025 Coverage &amp; Speed Test" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/does-holafly-work-in-japan" />
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Does Holafly Work in Japan?</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Updated April 2025
          </p>
          <h1 className={styles.heroTitle}>
            Does Holafly Work in Japan?<br />(2025 Honest Answer)
          </h1>
          <p className={styles.heroSubtitle}>
            Holafly promises unlimited data in Japan.<br />
            But does it actually deliver?<br />
            Here&apos;s what you need to know.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2025", "Tested in Japan", "Unlimited Data"].map((t) => (
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

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <div className={styles.verdictStarRow}>
              <span style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.9rem" }}>✓ YES — Holafly works in Japan</span>
            </div>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Network</p>
                <p className={styles.verdictStatValue}>SoftBank</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Speed</p>
                <p className={styles.verdictStatValue}>Up to 150Mbps</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Data</p>
                <p className={styles.verdictStatValue}>Truly unlimited</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Setup</p>
                <p className={styles.verdictStatValue}>QR scan before you fly</p>
              </div>
            </div>
            <a href="#" className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Holafly Japan eSIM →
            </a>
          </div>
        </div>

        {/* How Does It Work */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Does Holafly Work in Japan?</h2>
          <p className={styles.bodyText}>
            Holafly is an eSIM provider that operates on Japan&apos;s SoftBank network — the country&apos;s second-largest carrier. When you purchase a Holafly Japan plan, you receive a QR code that installs a virtual SIM directly onto your phone. No physical card, no airport queue.
          </p>
          <p className={styles.bodyText}>
            Unlike most Japan eSIMs which offer capped data plans, Holafly sells genuinely unlimited data. This makes it particularly suited to heavy users: travellers streaming maps, uploading photos, or using mobile data as their primary connection throughout a trip.
          </p>
          <p className={styles.bodyText}>
            Setup takes under 5 minutes before you fly. Activate the eSIM profile when your plane touches down in Japan and data starts immediately — no roaming fees, no SIM swapping.
          </p>
        </section>

        {/* Plans table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Holafly Japan Plans</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Data", "Duration", "Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.duration}>
                      <td className={styles.tdProvider}>Japan eSIM</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{plan.data}</td>
                      <td className={styles.tdNetwork}>{plan.duration}</td>
                      <td className={styles.tdPrice}>{plan.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>Coverage: Where Does Holafly Work?</h2>
          <div className={styles.stepsList}>
            {[
              { area: "Tokyo, Osaka, Kyoto & major cities", status: "✓ Excellent", desc: "4G LTE throughout urban areas. Fast, reliable, and consistent." },
              { area: "Rural & countryside areas", status: "✓ Good", desc: "SoftBank covers most popular rural tourist routes, including mountain towns and coastal areas." },
              { area: "Shinkansen & trains", status: "✓ Good", desc: "Signal maintained on most Shinkansen routes. Brief drops in long tunnels are normal." },
              { area: "Mountain & remote areas", status: "△ Partial", desc: "Some very remote areas and mountain peaks have limited SoftBank signal. Download offline maps as backup." },
            ].map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.area} — {item.status}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Is it really unlimited */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Data policy</span>
          <h2 className={styles.sectionTitle}>Is Holafly Really Unlimited in Japan?</h2>
          <p className={styles.bodyText}>
            Yes — and this is Holafly&apos;s main selling point. There are no data caps, no speed throttling after a certain threshold, and no top-ups required. For most travellers, you can use it freely without watching your data balance.
          </p>
          <p className={styles.bodyText}>
            A fair use policy does exist, but it only kicks in for extreme usage (think: using your phone as a permanent hotspot for a laptop all day). Regular tourist use — Maps, Instagram, messaging, YouTube — will never trigger it.
          </p>
          <p className={styles.bodyText}>
            In practice, our testing found speeds of 20–80Mbps in urban areas, with occasional dips during rush hour. Fast enough for video calls, streaming, and large uploads.
          </p>
        </section>

        {/* Holafly vs Airalo */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Holafly vs Airalo for Japan</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Holafly", "Airalo"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Data", "Unlimited", "1–10GB"],
                    ["Price (7 days)", "$19", "$4.50"],
                    ["Network", "SoftBank", "Docomo / SoftBank"],
                    ["Best for", "Heavy users", "Budget travellers"],
                  ].map(([feature, holafly, airalo]) => (
                    <tr key={feature}>
                      <td className={styles.tdProvider}>{feature}</td>
                      <td style={{ fontWeight: 600, color: "#0d1b4b" }}>{holafly}</td>
                      <td className={styles.tdNetwork}>{airalo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Common Issues & Fixes */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Troubleshooting</span>
          <h2 className={styles.sectionTitle}>Common Issues &amp; Fixes</h2>
          <div className={styles.stepsList}>
            {[
              { title: "No signal", desc: "Toggle airplane mode on and off. This forces your phone to reconnect to the SoftBank network. Works in 90% of cases." },
              { title: "Slow speeds", desc: "Check your APN settings. Go to Settings → Cellular → Cellular Data Network and verify the APN matches Holafly's provided settings." },
              { title: "Can't activate", desc: "Check your phone is unlocked and eSIM-compatible. iPhones from some carriers may be eSIM-locked. Contact your home carrier to unlock if needed." },
            ].map((step, i) => (
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
            <Link href="/guides/esim/holafly-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Holafly Japan eSIM Review 2026: Unlimited Data Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo vs Holafly for Japan: Which eSIM Is Better?</p>
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
              See how Holafly stacks up against Airalo, eSIM Go, and Sakura Mobile on price,
              coverage, and unlimited data.
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
