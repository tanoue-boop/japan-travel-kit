import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const compatibleTablets = [
  { brand: "Samsung", model: "Galaxy Tab S9 / S9+ / S9 Ultra", esimSupport: "✓ Yes" },
  { brand: "Samsung", model: "Galaxy Tab S8 / S8+ / S8 Ultra", esimSupport: "✓ Yes" },
  { brand: "Samsung", model: "Galaxy Tab S7 FE (5G version)", esimSupport: "✓ Yes" },
  { brand: "Google", model: "Pixel Tablet", esimSupport: "✓ Yes" },
  { brand: "Lenovo", model: "Tab P12 Pro", esimSupport: "✓ Yes" },
  { brand: "Most older models", model: "Galaxy Tab S6 and earlier", esimSupport: "✗ No" },
];

const picks = [
  {
    rank: 1,
    badge: "Best Overall",
    badgeClass: "pickBadgeBlue" as const,
    name: "Airalo",
    summary:
      "Airalo is the world's largest eSIM marketplace and our top pick for Japan on any device — including Android tablets. Plans start at $4.50 for 1 GB / 7 days, running on Docomo and SoftBank networks. Setup is straightforward: buy, scan the QR code in your tablet's SIM settings, and activate on arrival.",
    bestFor: "Short trips, first-time eSIM users, budget-conscious travellers",
    pros: [
      "World's largest eSIM marketplace",
      "Works on Samsung Galaxy Tab and Pixel Tablet",
      "Plans from $4.50 — cheapest on the market",
      "Easy QR code setup before you fly",
    ],
    cons: [
      "Data-only (no voice calls)",
      "Customer support can be slow",
    ],
    href: "https://airalo.pxf.io/c/7213504/1268485/15608",
    cta: "Get Airalo Japan eSIM →",
  },
  {
    rank: 2,
    badge: "Best Unlimited",
    badgeClass: "pickBadgeOrange" as const,
    name: "Holafly",
    summary:
      "Holafly offers unlimited data for Japan on the SoftBank network — ideal if you plan heavy use of streaming, maps, or video calls on your tablet. No data cap means you never need to worry about running out mid-trip, though fair-use speeds apply after a daily threshold.",
    bestFor: "Heavy data users, long stays, streaming video",
    pros: [
      "Unlimited data — no worrying about GB limits",
      "Compatible with eSIM Android tablets",
      "Simple setup via QR code",
    ],
    cons: [
      "Higher price than data-capped alternatives",
      "Speed throttled after daily fair-use limit",
      "Data-only (no voice or SMS)",
    ],
    href: "#",
    cta: "View Holafly Plans →",
  },
  {
    rank: 3,
    badge: "Best Budget",
    badgeClass: "pickBadgeGreen" as const,
    name: "eSIM Go",
    summary:
      "eSIM Go is the cheapest Japan eSIM we tested, with plans starting from around $3.50. It runs on the Docomo network and works on Android tablets that support eSIM. Perfect for travellers who want reliable connectivity without paying premium prices.",
    bestFor: "Budget travellers, short trips under 2 weeks",
    pros: [
      "Cheapest Japan eSIM available — from $3.50",
      "Docomo network — excellent Japan coverage",
      "Works on eSIM-compatible Android tablets",
    ],
    cons: [
      "Smaller data allowances at entry level",
      "Less-known brand than Airalo",
      "Data-only",
    ],
    href: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN",
    cta: "Get eSIM Go Japan →",
  },
];

const samsungSteps = [
  {
    title: "Go to Settings → Connections → SIM Manager",
    desc: "On Samsung Galaxy Tab, the eSIM settings are found under Connections, then SIM Manager. The exact path may vary slightly between One UI versions.",
  },
  {
    title: "Tap 'Add eSIM' or 'Add mobile plan'",
    desc: "Select the option to add a new eSIM profile. Your tablet will prompt you to scan a QR code.",
  },
  {
    title: "Scan the QR code from your eSIM provider",
    desc: "Use the QR code sent by Airalo, eSIM Go, or Holafly after purchase. The code is usually emailed and also visible in the provider's app. Hold your tablet camera up to the QR code on another device or printout.",
  },
  {
    title: "Keep the eSIM OFF until you land in Japan",
    desc: "After installation, disable the eSIM profile until you arrive. Activating it early may consume your data plan before your trip. Switch it on once your flight lands.",
  },
];

const pixelSteps = [
  {
    title: "Go to Settings → Network & Internet",
    desc: "On Google Pixel Tablet, eSIM settings are found under Network & Internet in the main Settings menu.",
  },
  {
    title: "Tap 'SIMs' → 'Add eSIM'",
    desc: "Select SIMs from the network settings, then choose 'Add eSIM' or 'Download a SIM instead'.",
  },
  {
    title: "Scan the QR code from your provider",
    desc: "Point the Pixel Tablet camera at the QR code provided by Airalo, eSIM Go, or Holafly. The profile downloads and installs automatically.",
  },
  {
    title: "Activate on arrival in Japan",
    desc: "Toggle the Japan eSIM profile on when you land. You should see network bars within a few seconds as the tablet connects to Docomo or SoftBank.",
  },
];

const useCases = [
  {
    title: "Navigation & maps",
    desc: "A large tablet screen makes Google Maps significantly easier to read in Japan — especially for complex train station layouts and walking directions in unfamiliar neighbourhoods.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
  {
    title: "Translation on the go",
    desc: "Use Google Translate's camera function to instantly translate Japanese menus, signs, and labels. A tablet's larger camera viewfinder makes real-time translation considerably easier than on a phone.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8l6 6" /><path d="M4 14l6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" />
        <path d="M22 22l-5-10-5 10" /><path d="M14 18h6" />
      </svg>
    ),
  },
  {
    title: "Shinkansen entertainment",
    desc: "Japan's bullet trains are a great opportunity to watch downloaded content or stream video. With a Japan eSIM on your tablet, you have reliable data for the entire journey — no dependence on train WiFi.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="15" rx="2" />
        <polyline points="17 2 12 7 7 2" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    q: "Can I use eSIM on my Samsung Galaxy tablet in Japan?",
    a: "Yes — if your Samsung Galaxy tablet supports eSIM. The Galaxy Tab S8 series and S9 series all support eSIM. Older models (Tab S7 LTE, Tab S6, and earlier) generally do not. Check your tablet's specs or Settings → Connections → SIM Manager to confirm. If the 'Add eSIM' option appears, your device is compatible.",
  },
  {
    q: "Which eSIM works best for Android tablets in Japan?",
    a: "Airalo is our top pick for most travellers — it offers competitive pricing from $4.50, runs on Docomo and SoftBank (the two best networks in Japan), and installs via a simple QR code that works on both Samsung Galaxy Tab and Google Pixel Tablet. For unlimited data, Holafly is the better choice, though it costs more per day.",
  },
  {
    q: "Is my Android tablet carrier-unlocked for Japan?",
    a: "Most Android tablets purchased directly from manufacturers or unlocked retailers work in Japan without issue. Tablets bought from mobile carriers (such as T-Mobile, Verizon, or EE) may be carrier-locked and unable to use a Japanese eSIM. Check your tablet's documentation or contact your carrier to confirm if it is unlocked before purchasing a Japan eSIM.",
  },
  {
    q: "Can I share my phone's eSIM with my Android tablet?",
    a: "Not directly — eSIM profiles are device-specific and cannot be transferred between a phone and tablet. However, you can set up a mobile hotspot on your phone (using a Japan eSIM) and connect your tablet to it via WiFi. Alternatively, purchase a separate eSIM for your tablet — both Airalo and eSIM Go offer affordable options that cover both devices independently.",
  },
  {
    q: "How do I check if my Android tablet supports eSIM?",
    a: "Go to Settings on your tablet. On Samsung Galaxy Tab, navigate to Connections → SIM Manager — if you see an 'Add eSIM' or 'Add mobile plan' option, your device supports eSIM. On Google Pixel Tablet, go to Settings → Network & Internet → SIMs. If 'Add eSIM' or 'Download a SIM instead' appears, the device is eSIM-compatible. You can also check the manufacturer's specifications page for your specific model.",
  },
];

export default function JapanEsimAndroidTabletPage() {
  return (
    <>
      <Head>
        <title>Best eSIM for Japan on Android Tablet 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to get a Japan eSIM for your Android tablet in 2026. We compare Airalo, Holafly and eSIM Go for Samsung Galaxy Tab and Google Pixel Tablet."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-esim-android-tablet" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best eSIM for Japan on Android Tablet 2026 | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-esim-android-tablet" />
        <meta property="og:description" content="How to get a Japan eSIM for your Android tablet in 2026. We compare Airalo, Holafly and eSIM Go for Samsung Galaxy Tab and Google Pixel Tablet." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best eSIM for Japan on Android Tablet 2026 | Japan Travel Kit" />
        <meta name="twitter:description" content="How to get a Japan eSIM for your Android tablet in 2026. We compare Airalo, Holafly and eSIM Go for Samsung Galaxy Tab and Google Pixel Tablet." />
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
              headline: "Best eSIM for Japan on Android Tablet (2026)",
              dateModified: "2026-05-02",
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://japan-travel-kit.com",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "eSIM for Android Tablet", item: "https://japan-travel-kit.com/guides/esim/japan-esim-android-tablet" },
              ],
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
          <span className={styles.breadCurrent}>eSIM for Android Tablet</span>
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
            Best eSIM for Japan on<br />Android Tablet (2026)
          </h1>
          <p className={styles.heroSubtitle}>
            Travelling to Japan with a Samsung or Google Pixel tablet? Here&apos;s how to get
            data on your Android tablet without paying roaming fees.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "Android Tablets", "All Major Brands"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Affiliate Disclosure */}
        <div className={styles.disclosure}>
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our recommendations.{" "}
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
                <p className={styles.verdictStatLabel}>Best overall</p>
                <p className={styles.verdictStatValue}>Airalo</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best unlimited</p>
                <p className={styles.verdictStatValue}>Holafly</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best budget</p>
                <p className={styles.verdictStatValue}>eSIM Go</p>
              </div>
            </div>
            <a
              href="https://airalo.pxf.io/c/7213504/1268485/15608"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        {/* Compatible Tablets */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Which Android Tablets Support eSIM?</h2>
          <p className={styles.bodyText}>
            eSIM support on Android tablets is still limited compared to phones. Before purchasing
            a Japan eSIM, confirm your specific tablet model supports eSIM. Here are the most
            common tourist devices:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Brand", "Model", "eSIM Support"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compatibleTablets.map((row) => (
                    <tr key={row.model}>
                      <td className={styles.tdProvider}>{row.brand}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.model}</td>
                      <td style={{ fontWeight: 700, color: row.esimSupport.startsWith("✓") ? "#16a34a" : "#b91c1c" }}>
                        {row.esimSupport}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            If your tablet is not listed, check your device settings: go to Settings → Connections
            → SIM Manager (Samsung) or Settings → Network &amp; Internet → SIMs (Pixel). If
            &apos;Add eSIM&apos; appears as an option, your tablet is compatible.
          </p>
        </section>

        {/* Best Picks */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top picks</span>
          <h2 className={styles.sectionTitle}>Best Japan eSIMs for Android Tablet</h2>
          <div className={styles.picksList}>
            {picks.map((pick) => (
              <div key={pick.rank} className={styles.pickCard}>
                <div className={styles.pickCardHeader}>
                  <div className={styles.pickRank}>
                    <span className={styles.pickNumber}>{pick.rank}</span>
                    <div className={styles.pickMeta}>
                      <span className={`${styles.pickBadge} ${styles[pick.badgeClass]}`}>{pick.badge}</span>
                      <span className={styles.pickName}>{pick.name}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.pickCardBody}>
                  <p className={styles.pickSummary}>{pick.summary}</p>
                  <div className={styles.pickTarget}>
                    <span className={styles.pickTargetLabel}>Best for:</span>
                    <span>{pick.bestFor}</span>
                  </div>
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
                  <a
                    href={pick.href}
                    className={styles.pickCta}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {pick.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Install guide - Samsung */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Install eSIM on Samsung Galaxy Tab</h2>
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
        </section>

        {/* Install guide - Pixel */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Install eSIM on Google Pixel Tablet</h2>
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

        {/* Use cases */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Why use a tablet in Japan</span>
          <h2 className={styles.sectionTitle}>Using Your Android Tablet in Japan</h2>
          <div className={styles.whoForGrid}>
            {useCases.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            One important note: if your Android tablet only has WiFi capabilities (no cellular
            radio), an eSIM cannot be installed regardless of the software. Check that your tablet
            is a cellular (LTE/5G) model before purchasing a Japan eSIM.
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
            <Link href="/guides/esim/japan-esim-ipad" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan on iPad (2026): Stay Connected on Your Tablet</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-android" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan on Android (2026): Top Picks &amp; Setup Guide</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              See how Airalo, Holafly, eSIM Go, and Sakura Mobile compare on price,
              coverage, and features.
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
