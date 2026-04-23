import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const faqItems = [
  {
    q: "What's the cheapest way to get data for a group in Japan?",
    a: "For small groups (2–3 people), individual eSIMs from eSIM Go at $3.50–$4.50 per person are usually cheapest. For groups of 4 or more, a shared Pocket WiFi at $10/day divides better per person, especially if you need laptop connectivity too.",
  },
  {
    q: "Can families share one eSIM in Japan?",
    a: "No. An eSIM is tied to a single device. Each person needs their own eSIM or SIM card. To share connectivity, use a Pocket WiFi router which allows up to 10 devices to connect simultaneously.",
  },
  {
    q: "Is Pocket WiFi better than eSIM for families?",
    a: "For families with multiple devices, Pocket WiFi is often more practical. One device covers everyone — including kids' tablets and parents' phones — at a flat daily rate. However, for a family where each member has an eSIM-compatible phone and the trip is short, individual eSIMs may work out cheaper.",
  },
  {
    q: "Do children need their own SIM card in Japan?",
    a: "Children's phones and tablets need connectivity too, but they can share a Pocket WiFi without needing their own SIM. If your child has an eSIM-compatible device and needs independent connectivity, an individual eSIM is the cleanest solution.",
  },
  {
    q: "Can I buy multiple eSIMs on one Airalo account?",
    a: "Yes. You can purchase separate Japan eSIM plans for each device on a single Airalo account. Each device gets its own QR code and data plan. There's no family or group discount, but the per-person price is still competitive.",
  },
];

export default function JapanEsimFamilyGroupPage() {
  return (
    <>
      <Head>
        <title>Best eSIM for Japan: Family &amp; Group Travel 2025 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Travelling to Japan with family or a group? We compare individual eSIMs vs shared Pocket WiFi to find the most cost-effective option."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-esim-family-group" />
        <meta property="og:title" content="Best eSIM for Japan: Family &amp; Group Travel 2025" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-esim-family-group" />
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
          <span className={styles.breadCurrent}>eSIM for Families &amp; Groups</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>👨‍👩‍👧‍👦</span> Updated April 2025
          </p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan:<br />Family &amp; Group Travel (2025)
          </h1>
          <p className={styles.heroSubtitle}>
            Travelling to Japan with family or friends?<br />
            Here&apos;s the most cost-effective way to keep everyone connected.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2025", "Groups & Families", "Cost Comparison"].map((t) => (
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
          <h2 className={styles.sectionTitle}>Which Option Is Best for Your Group?</h2>
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
                  <p className={styles.choiceCardTitle}>Individual eSIMs</p>
                  <p className={styles.choiceCardSubtitle}>Best for small groups</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Small group (2–3 people)</li>
                  <li><span className={styles.choiceCheck}>✓</span> Everyone has eSIM-compatible phone</li>
                  <li><span className={styles.choiceCheck}>✓</span> Budget group (eSIM Go per person)</li>
                  <li><span className={styles.choiceCheck}>✓</span> Short stay (under 2 weeks)</li>
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
                  <p className={styles.choiceCardTitle}>Shared Pocket WiFi</p>
                  <p className={styles.choiceCardSubtitle}>Best for large groups &amp; families</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Large group (4 or more)</li>
                  <li><span className={styles.choiceCheck}>✓</span> Travelling with kids</li>
                  <li><span className={styles.choiceCheck}>✓</span> Need laptops &amp; tablets connected</li>
                  <li><span className={styles.choiceCheck}>✓</span> Not everyone has eSIM phone</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Option 1: Individual eSIMs */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Option 1</span>
          <h2 className={styles.sectionTitle}>Individual eSIMs for Each Person</h2>
          <p className={styles.bodyText}>
            Each group member purchases their own eSIM plan. This gives everyone independent connectivity — no sharing, no battery dependency on a single Pocket WiFi device, and no queuing at airport counters.
          </p>
          <p className={styles.bodyText}>
            The main advantage for small groups is cost: eSIM Go Japan plans start at $3.50 per person for 7 days, and Airalo starts at $4.50. For a couple, that&apos;s $7–$9 total for a week&apos;s data — far cheaper than a shared Pocket WiFi rental.
          </p>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {[
                  "No device to carry or charge",
                  "Independent connectivity for each person",
                  "Cheapest for small groups",
                  "Activate before landing",
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
                  "No group discount available",
                  "Laptops & tablets excluded",
                ].map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Option 2: Pocket WiFi */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Option 2</span>
          <h2 className={styles.sectionTitle}>Shared Pocket WiFi for the Group</h2>
          <p className={styles.bodyText}>
            A single Pocket WiFi router connects up to 10 devices simultaneously — phones, tablets, laptops, cameras. One person carries the device and everyone shares the connection.
          </p>
          <p className={styles.bodyText}>
            Pocket WiFi typically costs $8–$12 per day in Japan. Divided across 4–5 people, that&apos;s $2–$3 per person per day — competitive with individual eSIM plans and includes unlimited data on most rentals.
          </p>
          <p className={styles.bodyText}>
            The catch: someone has to carry the device and keep it charged. Battery life is typically 8–12 hours. For families with a dedicated bag carrier, this is rarely a problem.{" "}
            <Link href="/wifi-pocket" style={{ color: "#c62828", fontWeight: 600 }}>Compare Pocket WiFi options →</Link>
          </p>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {[
                  "Connects up to 10 devices",
                  "Works on any device (no eSIM needed)",
                  "Usually unlimited data",
                  "Cost-effective for 4+ people",
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
                  "Airport pickup required",
                  "If device dies, everyone loses data",
                ].map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost breakdown</span>
          <h2 className={styles.sectionTitle}>Cost Comparison by Group Size</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Group Size", "Individual eSIM (7 days)", "Pocket WiFi (7 days)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["2 people", "$7 (eSIM Go × 2)", "$70 ($10/day)"],
                    ["3 people", "$10.50", "$70 ($10/day)"],
                    ["4 people", "$14", "$70 ($10/day)"],
                    ["5+ people", "$17.50+", "$70 ($10/day)"],
                  ].map(([size, esim, wifi]) => (
                    <tr key={size}>
                      <td className={styles.tdProvider}>{size}</td>
                      <td style={{ fontWeight: 600, color: "#0d1b4b" }}>{esim}</td>
                      <td className={styles.tdNetwork}>{wifi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#6b7280" }}>
            * eSIM Go prices based on 1GB/7-day plan at $3.50 per person. Pocket WiFi based on typical $10/day unlimited rental.
          </p>
        </section>

        {/* Best eSIMs for Families */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Our picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for Families</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Airalo – Best for Couples</p>
              <p className={styles.whoForDesc}>$4.50 per person for 7 days. Docomo &amp; SoftBank. Easy QR setup before landing.</p>
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
              <p className={styles.whoForTitle}>eSIM Go – Best Budget per Person</p>
              <p className={styles.whoForDesc}>From $3.50 per person for 7 days. Docomo network. Cheapest option for groups.</p>
              <a href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN" className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                Get eSIM Go →
              </a>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Holafly – Best for Data-Heavy Families</p>
              <p className={styles.whoForDesc}>Unlimited data per person. SoftBank network. From $19/person for 5 days.</p>
              <a href="#" className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                Get Holafly →
              </a>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Tips</span>
          <h2 className={styles.sectionTitle}>Tips for Group Travel Connectivity</h2>
          <div className={styles.stepsList}>
            {[
              { title: "Mix and match is fine", desc: "Not everyone needs the same provider. Some in your group might prefer Airalo; others might go with eSIM Go. They all work independently." },
              { title: "Download offline maps before landing", desc: "Google Maps and Apple Maps both support offline downloads. Save your key destinations so you're covered even if data is slow or unavailable briefly." },
              { title: "Use group chat apps over data", desc: "LINE, WhatsApp, and Telegram all work on Japan data. Set up a group chat before the trip so you can coordinate without relying on SMS or calls." },
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
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="18" height="12" rx="2" />
                  <path d="M19 9h2v6h-2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Pocket WiFi vs eSIM for Japan (2025): Which Is Better?</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              Airalo, Holafly, eSIM Go, and Sakura Mobile — compared on price, coverage, and ease of setup.
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
