import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const causeRows = [
  { problem: "No signal at all", cause: "eSIM not activated" },
  { problem: "Signal but no data", cause: "Wrong data line selected" },
  { problem: "Slow speeds", cause: "APN settings wrong" },
  { problem: "eSIM disappeared", cause: "Phone restarted, needs re-enabling" },
  { problem: '"No service" message', cause: "Carrier-locked phone" },
];

const apnRows = [
  { provider: "Airalo (Docomo)", apn: "Auto-configured" },
  { provider: "eSIM Go (Docomo)", apn: "Auto-configured" },
  { provider: "Holafly (SoftBank)", apn: "Auto-configured" },
  { provider: "Sakura Mobile", apn: "plus.4g" },
];

const supportRows = [
  { provider: "Airalo", support: "24/7 live chat in app" },
  { provider: "eSIM Go", support: "Email support" },
  { provider: "Holafly", support: "Live chat" },
  { provider: "Sakura Mobile", support: "English phone support" },
];

const fixSteps = [
  {
    title: "Fix 1: eSIM Not Activated",
    steps: [
      "Open your eSIM provider app (Airalo, eSIM Go, Holafly, etc.)",
      "Find your Japan plan in the app and check its activation status",
      'Tap "Activate" if the plan shows as installed but not active',
      "Toggle airplane mode off and on to force a network search",
      "Wait 30–60 seconds for your device to connect to the network",
    ],
  },
  {
    title: "Fix 2: Wrong Data Line Selected (iPhone)",
    steps: [
      "Open Settings → Cellular (or Mobile Data)",
      'Tap "Cellular Data" at the top of the screen',
      "Select your Japan eSIM line from the list",
      'Make sure "Allow Cellular Data Switching" is enabled',
      "Return to the home screen and test your connection",
    ],
  },
  {
    title: "Fix 3: Wrong Data Line Selected (Android)",
    steps: [
      "Open Settings → Network & Internet → SIMs",
      "Select your Japan eSIM as the preferred data SIM",
      'Toggle "Mobile data" on for that SIM if needed',
      'Check "Preferred SIM for Mobile Data" is set correctly',
      "Restart your phone if the change doesn't take effect",
    ],
  },
];

const faqItems = [
  {
    q: "Why is my Japan eSIM not connecting?",
    a: "The most common reasons are: (1) the eSIM is installed but not activated — open your provider's app and check the plan status; (2) your phone is still trying to use your home SIM for data — go to Settings → Cellular and switch the data line to your Japan eSIM; (3) your APN settings are wrong — most major providers auto-configure APN, but Sakura Mobile requires manual entry of 'plus.4g'; (4) your phone is carrier-locked — check with your home carrier if you're unsure.",
  },
  {
    q: "How do I activate my Japan eSIM?",
    a: "The activation process varies by provider, but generally: (1) open your provider's app or scan the QR code you received at purchase; (2) the eSIM profile will download to your phone; (3) go to Settings → Cellular → add or enable the new eSIM; (4) set it as your data line. Some providers require you to tap 'Activate' in their app after installation. Most eSIMs activate automatically when you first land in Japan and connect to a local tower.",
  },
  {
    q: "Why does my eSIM show signal but no data?",
    a: "Signal bars but no data is almost always a data line configuration issue. Your phone has registered on the network (hence signal) but is still routing data through your home SIM instead of the Japan eSIM. Fix: go to Settings → Cellular (iPhone) or Settings → Network & Internet → SIMs (Android) and manually set your Japan eSIM as the active data line. On iPhone, also check that 'Allow Cellular Data Switching' is enabled.",
  },
  {
    q: "Can I get a refund if my eSIM doesn't work?",
    a: "Refund policies vary by provider. Airalo offers refunds for unused plans if the eSIM never connected — contact their 24/7 live chat. Holafly similarly offers refunds for non-functional eSIMs. eSIM Go handles refund requests via email. Always try the troubleshooting steps first, as most issues are configuration problems rather than faulty eSIMs. If support confirms the eSIM is defective, providers will typically refund or replace.",
  },
  {
    q: "What should I do if my eSIM stops working mid-trip?",
    a: "First, try the quick fix checklist: toggle airplane mode, restart your phone, and verify the data line is set correctly. If that doesn't work, check your data balance in the provider's app — you may have run out. If you still have data and the connection is dead, contact your provider's support immediately. Airalo's 24/7 live chat is the fastest option. If you need internet urgently, most convenience stores (7-Eleven, FamilyMart, Lawson) offer free WiFi as a temporary solution.",
  },
];

export default function JapanEsimNotWorkingPage() {
  return (
    <>
      <Head>
        <title>Japan eSIM Not Working? How to Fix It (2026) | Japan Travel Kit</title>
        <meta
          name="description"
          content="Japan eSIM not connecting? We cover the most common causes — wrong data line, APN settings, activation issues — with step-by-step fixes for iPhone and Android."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-not-working" />
        <meta property="og:title" content="Japan eSIM Not Working? How to Fix It (2026)" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-not-working" />
        <meta property="og:description" content="Japan eSIM not connecting? We cover the most common causes — wrong data line, APN settings, activation issues — with step-by-step fixes for iPhone and Android." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan eSIM Not Working? How to Fix It (2026)" />
        <meta name="twitter:description" content="Japan eSIM not connecting? We cover the most common causes — wrong data line, APN settings, activation issues — with step-by-step fixes for iPhone and Android." />
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
                { "@type": "ListItem", position: 4, name: "Japan eSIM Not Working", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-not-working" },
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
              headline: "Japan eSIM Not Working? Here's How to Fix It (2026)",
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
          <span className={styles.breadCurrent}>Japan eSIM Not Working</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🛠️</span> Updated May 2026
          </p>
          <h1 className={styles.heroTitle}>
            Japan eSIM Not Working?<br />Here&apos;s How to Fix It (2026)
          </h1>
          <p className={styles.heroSubtitle}>
            Landed in Japan and your eSIM isn&apos;t connecting? Don&apos;t panic.
            Here are the most common causes and exactly how to fix them.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "Fix Guide", "All Providers"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>

        {/* Quick Fix Checklist */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Fix Checklist</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Try these first</span>
          </div>
          <div className={styles.verdictBody}>
            <p style={{ fontSize: "0.85rem", color: "#374151", marginBottom: "1rem", lineHeight: 1.6 }}>
              Work through this checklist in order. Most issues are fixed by step 3.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                "Toggle airplane mode off and on",
                "Check eSIM is set as the active data line",
                "Verify eSIM is activated (not just installed) in your provider app",
                "Check APN settings are correct",
                "Restart your phone",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 1rem", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
                  <span style={{ width: "1.5rem", height: "1.5rem", background: "#0d1b4b", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: "0.88rem", color: "#374151", fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Most Common Causes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Diagnosis</span>
          <h2 className={styles.sectionTitle}>Most Common Causes</h2>
          <p className={styles.bodyText}>
            Use this table to identify your problem based on what you&apos;re seeing:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>What You See</th>
                    <th>Likely Cause</th>
                  </tr>
                </thead>
                <tbody>
                  {causeRows.map((row) => (
                    <tr key={row.problem}>
                      <td className={styles.ftFeature}>{row.problem}</td>
                      <td className={styles.ftSim}>{row.cause}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Fix Steps */}
        {fixSteps.map((fix, fi) => (
          <section key={fi} className={styles.installSection}>
            <span className={styles.sectionLabel}>Step-by-step fix</span>
            <h2 className={styles.sectionTitle}>{fix.title}</h2>
            <div className={styles.stepsList}>
              {fix.steps.map((step, i) => (
                <div key={i} className={styles.stepCard}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <div className={styles.stepBody}>
                    <p className={styles.stepDesc}>{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Fix 4: APN Settings */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fix 4</span>
          <h2 className={styles.sectionTitle}>Fix 4: APN Settings</h2>
          <p className={styles.bodyText}>
            Most major Japan eSIM providers auto-configure APN settings during installation.
            However, if your data isn&apos;t working and everything else looks correct, it&apos;s worth
            verifying the APN manually. Here are the correct settings per provider:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>APN Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {apnRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td className={row.apn === "Auto-configured" ? styles.ftSim : styles.tdPrice}>{row.apn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>To manually set APN on iPhone:</strong> Go to Settings → Cellular → Cellular Data
            Network → APN. Enter the APN value from the table above. Leave username and password blank
            unless your provider specifies otherwise.
          </p>
          <p className={styles.bodyText}>
            <strong>To manually set APN on Android:</strong> Go to Settings → Network &amp; Internet →
            SIMs → [Your eSIM] → Access Point Names. Tap the + icon to add a new APN and enter
            the values provided.
          </p>
        </section>

        {/* Fix 5: Carrier-Locked Phone */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Fix 5</span>
          <h2 className={styles.sectionTitle}>Fix 5: Carrier-Locked Phone</h2>
          <p className={styles.bodyText}>
            If your phone shows &ldquo;No Service&rdquo; or &ldquo;SIM Not Supported&rdquo; despite the eSIM being
            properly installed and activated, your device may be carrier-locked. This means
            your home carrier has restricted the phone to only use their own SIM cards.
          </p>
          <div className={styles.stepsList}>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>1</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Check if your phone is locked</p>
                <p className={styles.stepDesc}>
                  iPhone: go to Settings → General → About → Carrier Lock. If it says
                  &ldquo;No SIM Restrictions&rdquo;, your phone is unlocked. Android: try inserting a
                  different carrier&apos;s SIM — if it works, you&apos;re unlocked.
                </p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>2</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Request an unlock from your carrier</p>
                <p className={styles.stepDesc}>
                  Contact your home carrier before you travel. Most carriers will unlock phones
                  that have completed their contract period. Processing can take 1–5 business days.
                </p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>3</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Alternative: rent a Pocket WiFi</p>
                <p className={styles.stepDesc}>
                  If you can&apos;t unlock your phone in time, a Pocket WiFi device from the airport
                  or hotel works independently of your phone&apos;s lock status.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Still Not Working: Contact Support */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Escalation</span>
          <h2 className={styles.sectionTitle}>Still Not Working? Contact Support</h2>
          <p className={styles.bodyText}>
            If you&apos;ve tried all the steps above and your eSIM still isn&apos;t working, contact
            your provider directly. Here&apos;s how to reach each one:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Support Channel</th>
                  </tr>
                </thead>
                <tbody>
                  {supportRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td className={styles.ftSim}>{row.support}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Tip:</strong> When contacting support, have ready: your order number or
            email address, your phone model and OS version, a screenshot of your eSIM settings,
            and a description of exactly what you see (error messages, signal bars, etc.).
            This speeds up diagnosis significantly.
          </p>
        </section>

        {/* Prevention */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Prevention</span>
          <h2 className={styles.sectionTitle}>How to Avoid This Next Time</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l1.36-1.36a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Test before you fly</p>
              <p className={styles.whoForDesc}>
                Install your eSIM at home, set it as your data line, and verify it shows
                &ldquo;Installed&rdquo; or &ldquo;Enabled&rdquo; in settings before you depart.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Note your APN settings</p>
              <p className={styles.whoForDesc}>
                Screenshot or write down your provider&apos;s APN settings before you leave.
                You may need them if the settings reset on your device.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Check expiry dates</p>
              <p className={styles.whoForDesc}>
                eSIM plans have validity periods — make sure your plan covers your entire
                stay in Japan. Top up or extend before it expires.
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
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M9 9h6M9 13h4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (Step-by-Step)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
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
            <Link href="/guides/esim/japan-esim-faq" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan eSIM FAQ 2026: Every Common Question Answered</p>
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
            <h2 className={styles.ctaBannerTitle}>Still need to buy a Japan eSIM?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare Airalo, Holafly, eSIM Go, and Sakura Mobile on price, coverage,
              and support — and find the right one for your trip.
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
