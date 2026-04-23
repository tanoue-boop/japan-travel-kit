import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const compatTable = [
  { brand: "Samsung", models: "Galaxy S20 and later", support: "✓" },
  { brand: "Google",  models: "Pixel 3 and later",    support: "✓" },
  { brand: "Sony",    models: "Xperia 10 III and later", support: "✓" },
  { brand: "OnePlus", models: "OnePlus 12 and later",  support: "✓" },
  { brand: "Motorola", models: "Razr series",          support: "✓" },
];

const providers = [
  {
    rank: "1",
    name: "Airalo",
    tagline: "Best Overall for Android",
    pros: [
      "Works on all major Android brands",
      "Instant QR activation — no roaming SIM needed",
      "From $4.50 for 7 days",
      "Docomo & SoftBank coverage",
    ],
    cons: [
      "Data-only (no calls or SMS)",
      "Requires eSIM-compatible Android model",
    ],
    price: "From $4.50",
    href: "https://airalo.pxf.io/c/7213504/1268485/15608",
    cta: "Get Airalo →",
  },
  {
    rank: "2",
    name: "Holafly",
    tagline: "Best Unlimited Data",
    pros: [
      "Unlimited data — no cap anxiety",
      "Easy setup via QR code",
      "Good coverage across major cities",
    ],
    cons: [
      "Pricier than capped plans",
      "Data-only (no calls or SMS)",
      "Speed may throttle at peak times",
    ],
    price: "From ~$28 / 5 days",
    href: "#",
    cta: "View Holafly →",
  },
  {
    rank: "3",
    name: "eSIM Go",
    tagline: "Best Budget Option",
    pros: [
      "Cheapest Japan eSIM we tested",
      "Docomo coverage from $3.50",
      "Simple activation",
    ],
    cons: [
      "Smaller brand — limited reviews",
      "Data-only",
    ],
    price: "From $3.50",
    href: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN",
    cta: "Get eSIM Go →",
  },
  {
    rank: "4",
    name: "Sakura Mobile",
    tagline: "Best for Long Stays",
    pros: [
      "Available with voice calls & SMS",
      "English customer support",
      "Docomo network (best rural coverage)",
    ],
    cons: [
      "More expensive than data-only plans",
      "Requires longer commitment",
    ],
    price: "From $28 / 30 days",
    href: "https://p.sakuramobile.jp/idevaffiliate.php?id=486",
    cta: "Get Sakura Mobile →",
  },
];

const samsungSteps = [
  { title: "Open Settings", desc: "Go to Settings → Connections → SIM Manager." },
  { title: "Add mobile plan", desc: "Tap 'Add mobile plan' or 'Add eSIM'." },
  { title: "Scan QR code", desc: "Select 'Scan QR code' and scan the code provided by your eSIM provider." },
  { title: "Confirm the plan", desc: "Review the plan details and confirm the download. This takes 1–2 minutes." },
  { title: "Switch eSIM in Japan", desc: "When you land, go to SIM Manager and toggle to your Japan eSIM profile." },
];

const pixelSteps = [
  { title: "Open Settings", desc: "Go to Settings → Network & internet → SIMs." },
  { title: "Add eSIM", desc: "Tap '+' or 'Add eSIM' at the top of the screen." },
  { title: "Download a SIM", desc: "Select 'Download a SIM instead?' or scan the QR code directly." },
  { title: "Scan your QR code", desc: "Point the camera at your eSIM provider's QR code and wait for the download to complete." },
  { title: "Activate on arrival", desc: "In Japan, go to Settings → SIMs and activate your Japan eSIM profile." },
];

const faqItems = [
  {
    q: "Does Airalo work on Samsung Galaxy phones?",
    a: "Yes. Airalo works on all eSIM-compatible Samsung Galaxy phones, including Galaxy S20 and later models. Make sure your handset is carrier-unlocked before travelling.",
  },
  {
    q: "Can I use an eSIM on an Android phone bought in Japan?",
    a: "Phones purchased in Japan (especially carrier-locked units) may have eSIM functionality restricted to domestic networks. If you bought your Android phone outside Japan and it's unlocked, it will almost certainly support international eSIMs.",
  },
  {
    q: "Do I need to turn off my home SIM when using a Japan eSIM?",
    a: "Not necessarily. Most modern Android phones support dual SIM (physical + eSIM simultaneously). You can keep your home SIM active for calls and WhatsApp while routing all mobile data through your Japan eSIM. Just set your Japan eSIM as the default data SIM.",
  },
  {
    q: "Will my APN settings configure automatically?",
    a: "In most cases, yes. When you activate your Japan eSIM on Android, the correct APN settings are pushed automatically by the network. If data doesn't work after activation, check the manual APN settings provided by your eSIM provider.",
  },
  {
    q: "Is there a Japan eSIM that works with Google Pixel?",
    a: "Yes — all four providers listed in this guide (Airalo, Holafly, eSIM Go, and Sakura Mobile) work with Google Pixel 3 and later. Pixel phones have excellent eSIM support and the setup process is straightforward.",
  },
];

export default function JapanEsimAndroidPage() {
  return (
    <>
      <Head>
        <title>Best eSIM for Japan on Android 2026: Top Picks &amp; Setup Guide | Japan Travel Kit</title>
        <meta
          name="description"
          content="Which eSIM works best for Japan on Android? We tested Airalo, Holafly and eSIM Go on Samsung, Pixel and more. Full setup guide."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-esim-android" />
        <meta property="og:title" content="Best eSIM for Japan on Android 2026: Top Picks & Setup Guide" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-esim-android" />
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
          <span className={styles.breadCurrent}>Japan eSIM for Android</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan<br />on Android (2026)
          </h1>
          <p className={styles.heroSubtitle}>
            Android makes eSIM setup simple. Here&apos;s the best Japan eSIM for every major Android device.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Samsung, Pixel & More", "Step-by-Step Guide"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Verdict */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Verdict</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Overall</p>
                <p className={styles.verdictStatValue}>Airalo</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Unlimited</p>
                <p className={styles.verdictStatValue}>Holafly</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Budget</p>
                <p className={styles.verdictStatValue}>eSIM Go</p>
              </div>
            </div>
            <a href="https://airalo.pxf.io/c/7213504/1268485/15608" className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        {/* Compatibility Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Which Android Phones Support eSIM?</h2>
          <p className={styles.bodyText}>
            Most flagship Android phones released since 2018–2020 support eSIM. The table below covers the most common brands. If your model isn&apos;t listed, check your phone&apos;s spec sheet or Settings → About Phone for &ldquo;eSIM&rdquo; or &ldquo;SIM Management.&rdquo;
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Brand", "Models", "eSIM Support"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compatTable.map((row) => (
                    <tr key={row.brand}>
                      <td className={styles.tdProvider}>{row.brand}</td>
                      <td className={styles.tdNetwork}>{row.models}</td>
                      <td className={styles.tdPrice}>{row.support}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#6b7280" }}>
            Note: Carrier-locked phones may not accept international eSIMs. Check with your home carrier before travelling.
          </p>
        </section>

        {/* Best eSIMs for Android */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Recommendations</span>
          <h2 className={styles.sectionTitle}>Best Japan eSIMs for Android</h2>
          <p className={styles.bodyText}>
            All four options below have been tested on Samsung Galaxy and Google Pixel devices.
            Each works via QR code — no physical SIM swap needed.
          </p>
        </section>

        {providers.map((p) => (
          <section key={p.name} className={styles.prosConsSection} style={{ marginBottom: "2rem" }}>
            <span className={styles.sectionLabel}>#{p.rank}</span>
            <h3 className={styles.sectionTitle} style={{ fontSize: "1.25rem" }}>{p.name} — {p.tagline}</h3>
            <div className={styles.pickGrid}>
              <div className={styles.pickPros}>
                <p className={styles.pickListLabel}>Pros</p>
                <ul className={styles.pickList}>
                  {p.pros.map((item) => (
                    <li key={item}><span className={styles.proIcon}>+</span>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.pickCons}>
                <p className={styles.pickListLabel}>Cons</p>
                <ul className={styles.pickList}>
                  {p.cons.map((item) => (
                    <li key={item}><span className={styles.conIcon}>−</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
              <strong>Price:</strong> {p.price}
            </p>
            <a href={p.href} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "0.75rem", display: "inline-block" }}>
              {p.cta}
            </a>
          </section>
        ))}

        {/* How to Install — Samsung */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Install eSIM on Android</h2>

          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0d1b4b", margin: "1.5rem 0 0.75rem" }}>
            Samsung Galaxy
          </h3>
          <div className={styles.stepsList}>
            {samsungSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0d1b4b", margin: "2rem 0 0.75rem" }}>
            Google Pixel
          </h3>
          <div className={styles.stepsList}>
            {pixelSteps.map((step, i) => (
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

        {/* APN Settings */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Connectivity</span>
          <h2 className={styles.sectionTitle}>APN Settings for Japan</h2>
          <p className={styles.bodyText}>
            In most cases, APN settings are automatically configured when you activate your Japan eSIM. You don&apos;t need to do anything manually — the carrier profile is pushed to your phone during the download.
          </p>
          <p className={styles.bodyText}>
            If mobile data doesn&apos;t work after activation, try the following manual steps:
          </p>
          <div className={styles.stepsList}>
            {[
              { title: "Open Settings → Network & internet → Mobile network", desc: "Navigate to your Japan eSIM profile within SIM settings." },
              { title: "Access Point Names (APN)", desc: "Tap 'Access Point Names' or 'APN' to view or edit the current settings." },
              { title: "Add a new APN", desc: "Tap '+' to create a new entry. Enter the APN name and address provided by your eSIM provider (usually in their app or confirmation email)." },
              { title: "Save and restart", desc: "Save the APN settings and toggle airplane mode off and on. Data should now connect." },
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
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-iphone" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan on iPhone (2026): Top Picks &amp; Setup Guide</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (iPhone &amp; Android Guide 2026)</p>
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
              See how Airalo, Holafly, eSIM Go, and Sakura Mobile compare on price, coverage, and Android compatibility.
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
