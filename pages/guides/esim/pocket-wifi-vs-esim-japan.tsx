import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const faqItems = [
  {
    q: "Is eSIM cheaper than Pocket WiFi in Japan?",
    a: "For solo travellers, yes. eSIM plans start from $3.50–$4.50 for 7 days, while Pocket WiFi typically costs $5–$10 per day. For groups of 3 or more, Pocket WiFi can work out cheaper per person when shared.",
  },
  {
    q: "Can I use Pocket WiFi and eSIM together?",
    a: "Yes. Some travellers use a Pocket WiFi for their laptop and tablet, and an eSIM on their phone for convenience. There's no technical barrier to using both simultaneously.",
  },
  {
    q: "Does Pocket WiFi work on the Shinkansen?",
    a: "Generally yes, though signal can drop briefly in tunnels. Major Pocket WiFi providers in Japan run on NTT Docomo or SoftBank networks, which have good Shinkansen coverage between major cities.",
  },
  {
    q: "Which is better for a family trip to Japan?",
    a: "For families with multiple devices — phones, tablets, kids' devices — Pocket WiFi is usually more cost-effective since one unit can connect up to 10 devices at a flat daily rate. For couples or solo travellers, eSIM is simpler and cheaper.",
  },
  {
    q: "Can I rent Pocket WiFi at Japanese airports?",
    a: "Yes. Narita, Haneda, Kansai, and most major international airports have Pocket WiFi rental counters. You can also arrange delivery to your hotel or pick up in advance at select locations. Returning the device is required at the end of your trip.",
  },
];

export default function PocketWifiVsEsimPage() {
  return (
    <>
      <Head>
        <title>Pocket WiFi vs eSIM for Japan 2026: Which Is Better? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Pocket WiFi or eSIM for Japan? We compare price, convenience, and coverage to help you choose the best option for your trip."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/pocket-wifi-vs-esim-japan" />
        <meta property="og:title" content="Pocket WiFi vs eSIM for Japan 2026: Which Is Better?" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/pocket-wifi-vs-esim-japan" />
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
          <span className={styles.breadCurrent}>Pocket WiFi vs eSIM</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📶</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Pocket WiFi vs eSIM for Japan (2026):<br />Which Is Better?
          </h1>
          <p className={styles.heroSubtitle}>
            Both keep you connected in Japan.<br />
            But one is cheaper, simpler, and requires no extra hardware to carry.<br />
            Here&apos;s how to choose.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Honest Comparison", "All Device Types"].map((t) => (
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
        <section className={styles.choiceSection}>
          <span className={styles.sectionLabel}>Quick Answer</span>
          <h2 className={styles.sectionTitle}>Which Should You Choose?</h2>
          <div className={styles.choiceGrid}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderEsim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Choose eSIM if…</p>
                  <p className={styles.choiceCardSubtitle}>Best for solo travellers</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Solo traveller</li>
                  <li><span className={styles.choiceCheck}>✓</span> Budget traveller (from $3.50)</li>
                  <li><span className={styles.choiceCheck}>✓</span> Short stay (under 2 weeks)</li>
                  <li><span className={styles.choiceCheck}>✓</span> eSIM-compatible phone</li>
                </ul>
              </div>
            </div>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderSim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="6" width="18" height="12" rx="2" />
                    <path d="M19 9h2v6h-2" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Choose Pocket WiFi if…</p>
                  <p className={styles.choiceCardSubtitle}>Best for groups &amp; families</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Group of 2 or more</li>
                  <li><span className={styles.choiceCheck}>✓</span> No eSIM-compatible phone</li>
                  <li><span className={styles.choiceCheck}>✓</span> Need laptop / tablet data</li>
                  <li><span className={styles.choiceCheck}>✓</span> Want unlimited data</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What's the Difference */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>What&apos;s the Difference?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Feature", "eSIM", "Pocket WiFi"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Setup", "QR code scan", "Pick up at airport"],
                    ["Devices", "1 phone", "Up to 10 devices"],
                    ["Battery needed", "No", "Yes"],
                    ["Price", "From $3.50", "From $5/day"],
                    ["Best for", "Solo travel", "Groups & families"],
                    ["Data limit", "Capped or unlimited", "Usually unlimited"],
                  ].map(([feature, esim, wifi]) => (
                    <tr key={feature}>
                      <td className={styles.tdProvider}>{feature}</td>
                      <td style={{ color: "#1a56db", fontWeight: 600 }}>{esim}</td>
                      <td className={styles.tdNetwork}>{wifi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* eSIM Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>eSIM</span>
          <h2 className={styles.sectionTitle}>eSIM: Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {[
                  "No extra device to carry",
                  "Instant activation before landing",
                  "Cheaper for solo travellers",
                  "Works on one phone seamlessly",
                ].map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {[
                  "Requires eSIM-compatible phone",
                  "Data-only (most plans)",
                  "Can't share with travel companions",
                ].map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pocket WiFi Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Pocket WiFi</span>
          <h2 className={styles.sectionTitle}>Pocket WiFi: Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {[
                  "Share with up to 10 devices",
                  "Works on any device (laptop, tablet)",
                  "No phone compatibility issues",
                  "Usually unlimited data",
                ].map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {[
                  "Extra device to carry and charge",
                  "Must pick up at airport or delivery",
                  "Can be lost or forgotten",
                  "More expensive for solo use",
                ].map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Which Should You Choose - scenarios */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Scenarios</span>
          <h2 className={styles.sectionTitle}>Which Should You Choose?</h2>
          <div className={styles.stepsList}>
            {[
              { scenario: "Solo traveller", rec: "eSIM", desc: "Simpler, cheaper, no extra hardware. Activate before landing and go." },
              { scenario: "Group of 2 or more", rec: "Pocket WiFi", desc: "Sharing one device is more cost-effective. Everyone stays connected." },
              { scenario: "No eSIM-compatible phone", rec: "Pocket WiFi", desc: "If your phone doesn't support eSIM, Pocket WiFi is the practical choice." },
              { scenario: "Need laptop data too", rec: "Pocket WiFi", desc: "Connect multiple devices including laptops, tablets, and cameras." },
              { scenario: "Short stay (under 1 week)", rec: "eSIM Go or Airalo", desc: "Budget eSIM plans start from $3.50 for 7 days — hard to beat for a short trip." },
            ].map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.scenario} → {item.rec}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Recommendations */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Our picks</span>
          <h2 className={styles.sectionTitle}>Our Recommendations</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Best eSIM: Airalo</p>
              <p className={styles.whoForDesc}>Largest eSIM marketplace. Japan plans from $4.50. Runs on Docomo &amp; SoftBank.</p>
              <a href="https://airalo.pxf.io/c/7213504/1268485/15608" className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                Get Airalo →
              </a>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Best Budget eSIM: eSIM Go</p>
              <p className={styles.whoForDesc}>Japan plans from $3.50 for 7 days. Great value on Docomo network.</p>
              <a href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN" className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                Get eSIM Go →
              </a>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="18" height="12" rx="2" />
                  <path d="M19 9h2v6h-2" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Best Pocket WiFi</p>
              <p className={styles.whoForDesc}>Compare the best Pocket WiFi rental options for Japan, including airport pickup and hotel delivery.</p>
              <Link href="/wifi-pocket" className={styles.pickCta} style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                View Pocket WiFi options →
              </Link>
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
            <Link href="/guides/esim/cheapest-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cheapest eSIM for Japan 2026: Best Budget Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/wifi-pocket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="18" height="12" rx="2" />
                  <path d="M19 9h2v6h-2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Pocket WiFi for Japan: Compare &amp; Rent Options</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to choose your Japan eSIM?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare Airalo, Holafly, eSIM Go, and Sakura Mobile on price, coverage, and features.
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
