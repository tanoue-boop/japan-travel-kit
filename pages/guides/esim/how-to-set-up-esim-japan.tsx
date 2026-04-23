import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const beforeYouStart = [
  "eSIM-compatible phone",
  "Unlocked phone (not carrier-locked)",
  "WiFi connection",
  "QR code from your eSIM provider",
];

const iphoneSteps = [
  {
    title: "Go to Settings → Cellular",
    desc: "Open the Settings app on your iPhone and tap 'Cellular' (or 'Mobile Data' in some regions).",
  },
  {
    title: "Tap \"Add eSIM\"",
    desc: "Scroll down and tap 'Add eSIM'. On newer iPhones you may see 'Add eSIM' directly at the top of the Cellular screen.",
  },
  {
    title: "Tap \"Use QR Code\"",
    desc: "Select 'Use QR Code' when prompted. Your camera will open ready to scan.",
  },
  {
    title: "Scan the QR code from your provider",
    desc: "Hold your phone's camera over the QR code sent by your eSIM provider. The code is usually in a confirmation email or inside the provider's app.",
  },
  {
    title: "Label it \"Japan eSIM\"",
    desc: "When prompted to name the new plan, type 'Japan eSIM' so you can easily identify it later.",
  },
  {
    title: "Keep it OFF until you land in Japan",
    desc: "Leave the Japan eSIM plan switched off for now. You'll switch it on when your plane lands to avoid unexpected data charges en route.",
  },
];

const androidSteps = [
  {
    title: "Go to Settings → Network & Internet",
    desc: "Open Settings and tap 'Network & Internet'. On Samsung devices this may be listed as 'Connections'.",
  },
  {
    title: "Tap \"SIMs\" or \"Mobile Network\"",
    desc: "Find the SIM or Mobile Network section. The exact label varies by manufacturer and Android version.",
  },
  {
    title: "Tap \"Add eSIM\" or \"Download a SIM\"",
    desc: "Look for an option to add or download a new SIM. On Google Pixel it reads 'Download a SIM'; on Samsung it reads 'Add mobile plan'.",
  },
  {
    title: "Scan the QR code",
    desc: "Select 'Scan QR code' and point your camera at the QR code from your provider. Confirm the details when prompted.",
  },
  {
    title: "Label it \"Japan eSIM\"",
    desc: "Name the new profile 'Japan eSIM' so it's easy to identify when switching between plans.",
  },
  {
    title: "Keep it OFF until you land",
    desc: "Toggle the Japan eSIM plan off for now. Switch it on after landing to start your data plan from day one.",
  },
];

const troubleshootItems = [
  {
    title: '"eSIM not working" after scanning',
    desc: "Restart your phone. A full reboot clears most provisioning errors and resolves the majority of eSIM setup problems.",
  },
  {
    title: '"No signal" after activating',
    desc: "Check APN settings. Go to Settings → Cellular → Cellular Data Network and enter the APN details from your provider's setup guide.",
  },
  {
    title: '"QR code won\'t scan"',
    desc: "Enter the activation code manually. Most providers include a text-based code alongside the QR code — use that instead.",
  },
  {
    title: '"Phone says locked"',
    desc: "Your device is carrier-locked. Contact your home carrier to request an unlock before you travel. This usually takes 24–48 hours.",
  },
];

const esimRecommend = [
  { label: "Best overall",   name: "Airalo",        detail: "From $4.50 / 7 days",   href: "https://airalo.pxf.io/c/7213504/1268485/15608" },
  { label: "Unlimited data", name: "Holafly",       detail: "From $19 / 5 days",     href: "#" },
  { label: "Best value",     name: "eSIM Go",       detail: "From $3.00 / 7 days",   href: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN" },
  { label: "Long stay",      name: "Sakura Mobile", detail: "Voice + data plans",     href: "https://p.sakuramobile.jp/idevaffiliate.php?id=486" },
];

const faqItems = [
  {
    q: "Can I set up eSIM before arriving in Japan?",
    a: "Yes — and you should. You can scan the QR code and install the eSIM profile at home over WiFi. Just leave the plan switched off until your plane lands in Japan. This way you have instant 4G without queuing at airport SIM machines.",
  },
  {
    q: "Will setting up eSIM delete my current SIM?",
    a: "No. Installing a Japan eSIM adds a second profile alongside your existing SIM. Your home SIM and number remain completely intact. You can switch between them at any time in Settings.",
  },
  {
    q: "Can I use two eSIMs at once?",
    a: "Most modern iPhones (XS and later) and many Android devices support Dual SIM, allowing one physical SIM and one eSIM active simultaneously. Dual eSIM (two eSIMs active at once) is supported on iPhone 13 and later and select Android models.",
  },
  {
    q: "What if my QR code expires?",
    a: "Most eSIM QR codes expire after 30–90 days if unused. If yours expires before you travel, contact your provider — they will usually reissue the QR code or activation code free of charge.",
  },
  {
    q: "Does eSIM work on all iPhones?",
    a: "eSIM is supported on iPhone XS (2018) and all later models. iPhones purchased in mainland China do not support eSIM. iPhones bought through certain carriers may be eSIM-locked — contact your carrier to unlock before travelling.",
  },
];

export default function HowToSetUpEsimJapanPage() {
  return (
    <>
      <Head>
        <title>How to Set Up an eSIM in Japan (iPhone &amp; Android Guide 2026) | Japan Travel Kit</title>
        <meta
          name="description"
          content="Step-by-step guide to setting up your Japan eSIM before you fly. Works for iPhone and Android. Takes under 5 minutes."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/how-to-set-up-esim-japan" />
        <meta property="og:title" content="How to Set Up an eSIM in Japan (iPhone & Android Guide 2026)" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/how-to-set-up-esim-japan" />
        <meta property="og:description" content="Step-by-step guide to setting up your Japan eSIM before you fly. Works for iPhone and Android. Takes under 5 minutes." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Set Up an eSIM in Japan (iPhone & Android Guide 2026)" />
        <meta name="twitter:description" content="Step-by-step guide to setting up your Japan eSIM before you fly. Works for iPhone and Android. Takes under 5 minutes." />
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
              headline: "How to Set Up an eSIM in Japan (iPhone & Android Guide 2026)",
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
          <span className={styles.breadCurrent}>How to Set Up eSIM in Japan</span>
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
            How to Set Up an eSIM in Japan<br />(Step-by-Step)
          </h1>
          <p className={styles.heroSubtitle}>
            Takes under 5 minutes. Do it before you fly and you&apos;ll have 4G the moment your plane lands.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "iPhone & Android", "Takes 5 Minutes"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>

        {/* Before You Start */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Checklist</span>
          <h2 className={styles.sectionTitle}>Before You Start</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Make sure you have all four of the following before you begin:
          </p>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <ul className={styles.pickList}>
                {beforeYouStart.map((item) => (
                  <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* iPhone Setup */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>iOS</span>
          <h2 className={styles.sectionTitle}>How to Set Up eSIM on iPhone</h2>
          <div className={styles.stepsList}>
            {iphoneSteps.map((step, i) => (
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

        {/* Android Setup */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Android</span>
          <h2 className={styles.sectionTitle}>How to Set Up eSIM on Android</h2>
          <div className={styles.stepsList}>
            {androidSteps.map((step, i) => (
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

        {/* When to Activate */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Activation</span>
          <h2 className={styles.sectionTitle}>When to Activate</h2>
          <p className={styles.bodyText}>
            The best time to activate your Japan eSIM is right after your plane lands — not before.
            As soon as the crew announces you can disable flight mode, switch it off
            and go to Settings → Cellular and enable your Japan eSIM profile.
          </p>
          <p className={styles.bodyText}>
            Within a few seconds you&apos;ll see your carrier name (Docomo, SoftBank, or au) appear in
            the status bar and your data connection will be live. You&apos;ll have 4G before you
            reach baggage claim — no airport SIM vending machines required.
          </p>
          <p className={styles.bodyText}>
            If you want to keep your home SIM active for calls and texts, leave it enabled alongside
            your Japan eSIM. Set your Japan eSIM as the default for &ldquo;Cellular Data&rdquo; so all
            internet traffic uses the Japan plan.
          </p>
        </section>

        {/* Troubleshooting */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Troubleshooting</span>
          <h2 className={styles.sectionTitle}>Troubleshooting Common Issues</h2>
          <div className={styles.stepsList}>
            {troubleshootItems.map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Which eSIM Should I Get */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Recommendations</span>
          <h2 className={styles.sectionTitle}>Which eSIM Should I Get?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Once you know how to install an eSIM, the next question is which provider to use.
            Here are our top picks for Japan:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Best For", "Provider", "Details", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {esimRecommend.map((r) => (
                    <tr key={r.name}>
                      <td className={styles.tdNetwork}>{r.label}</td>
                      <td className={styles.tdProvider}>{r.name}</td>
                      <td>{r.detail}</td>
                      <td>
                        <a
                          href={r.href}
                          className={styles.tableBtn}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                        >
                          Get deal →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Not sure which to pick?{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              Read our full comparison →
            </Link>
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
            <Link href="/guides/esim/airalo-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2026: Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/esim-vs-sim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="9" height="14" rx="1" />
                  <rect x="13" y="5" width="9" height="14" rx="1" />
                  <line x1="11" y1="12" x2="13" y2="12" />
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
            <h2 className={styles.ctaBannerTitle}>Ready to pick your Japan eSIM?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare Airalo, Holafly, eSIM Go, and Sakura Mobile on price, coverage, and features —
              all in one place.
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
