import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const ipadCompatibility = [
  { model: "iPad Pro (3rd gen+, 2018–)",    esim: "✓ Supported" },
  { model: "iPad Air (3rd gen+, 2019–)",    esim: "✓ Supported" },
  { model: "iPad mini (5th gen+, 2019–)",   esim: "✓ Supported" },
  { model: "iPad (7th gen+, 2019–)",        esim: "✓ Supported" },
  { model: "Older iPad models (pre-2019)",  esim: "✗ Not supported" },
  { model: "iPad Wi-Fi only (any model)",   esim: "✗ Not supported" },
];

const setupSteps = [
  {
    title: "Go to Settings → Cellular",
    desc: "Open the Settings app on your iPad. If you see a 'Cellular' option in the left-hand menu, your iPad supports eSIM. If there is no Cellular option, your iPad is Wi-Fi only and cannot use an eSIM.",
  },
  {
    title: "Tap 'Add eSIM'",
    desc: "Select 'Add eSIM' (or 'Add Cellular Plan' on older iPadOS versions). You'll be prompted to scan a QR code or enter details manually.",
  },
  {
    title: "Tap 'Use QR Code'",
    desc: "Choose 'Use QR Code' from the options. Your iPad's camera will open, ready to scan the QR code from your eSIM provider.",
  },
  {
    title: "Scan the QR code from your provider",
    desc: "Open the QR code from your eSIM provider — either in the provider's app, an email, or a downloaded PDF. Hold your iPad so the camera can read the code. It should scan within a few seconds.",
  },
  {
    title: "Label it 'Japan' and activate on arrival",
    desc: "Give your new eSIM a label (e.g. 'Japan') so it's easy to identify. Keep it in 'Off' mode until you land in Japan — then switch it to 'On' and select it as your cellular plan.",
  },
];

const ipadPicks = [
  {
    rank: "1",
    name: "Airalo",
    tagline: "Best Overall for iPad",
    pros: [
      "Works on all eSIM-capable iPad models",
      "QR code setup — same process as iPhone",
      "Docomo network — widest coverage in Japan",
      "Plans from $4.50 / 7 days",
    ],
    cons: [
      "Data-only (no voice, but iPad rarely needs it)",
      "Requires eSIM-capable iPad (cellular model)",
    ],
    cta: "Get Airalo Japan eSIM for iPad →",
    href: "https://airalo.pxf.io/c/7213504/1268485/15608",
  },
  {
    rank: "2",
    name: "Holafly",
    tagline: "Best Unlimited for iPad",
    pros: [
      "Unlimited data — ideal for streaming on a large screen",
      "SoftBank network",
      "No data cap to manage",
    ],
    cons: [
      "More expensive than capped plans",
      "Speed may throttle on very heavy use",
    ],
    cta: "View Holafly Japan Plans →",
    href: "#",
  },
  {
    rank: "3",
    name: "eSIM Go",
    tagline: "Best Budget for iPad",
    pros: [
      "Cheapest Japan eSIM — from $3.50 for 1 GB",
      "Docomo network",
      "Good for light iPad use (maps, messaging)",
    ],
    cons: [
      "Smaller data caps may not suit heavy streaming",
      "App less polished than Airalo",
    ],
    cta: "Get eSIM Go Japan →",
    href: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN",
  },
];

const ipadUseCases = [
  {
    title: "Maps and navigation",
    desc: "An eSIM-connected iPad makes a superb navigation device in Japan — the larger screen makes it much easier to read train maps, walking directions, and kanji on signs. Google Maps and Apple Maps both work seamlessly on Japanese LTE networks.",
  },
  {
    title: "Translation with the camera",
    desc: "The iPad camera's live translation feature (in the Camera app and Google Translate) is genuinely useful in Japan for menus, signs, and museum exhibits. A cellular connection lets you do this anywhere — not just when connected to Wi-Fi.",
  },
  {
    title: "Streaming on the shinkansen",
    desc: "The shinkansen has free Wi-Fi, but it's inconsistent and speed-limited. A Japan eSIM on your iPad means you can stream Netflix, YouTube, or downloaded content via LTE throughout the journey. For reliable streaming, choose Holafly's unlimited plan.",
  },
  {
    title: "Remote work from cafés and hotels",
    desc: "Japan's café Wi-Fi can be unreliable or require registration. An eSIM gives you a consistent fallback connection for emails, video calls, and cloud access without hunting for a reliable network.",
  },
];

const faqItems = [
  {
    q: "Can I use eSIM on my iPad in Japan?",
    a: "Yes — but only on cellular-capable iPad models. iPad Pro (3rd generation and later, 2018+), iPad Air (3rd gen+, 2019+), iPad mini (5th gen+, 2019+), and iPad (7th gen+, 2019+) all support eSIM when purchased in the cellular configuration. Wi-Fi-only iPads have no cellular hardware and cannot use an eSIM regardless of model or software version.",
  },
  {
    q: "Which eSIM works best for iPad in Japan?",
    a: "Airalo is the best choice for most iPad users. It works on any eSIM-capable iPad, runs on the Docomo network (Japan's most reliable), and installs via QR code in exactly the same way as on an iPhone. For heavy streaming or video use, Holafly's unlimited plan is worth the extra cost. For light data needs (maps, messaging), eSIM Go is the most affordable option.",
  },
  {
    q: "Can I share my iPhone eSIM with my iPad?",
    a: "Not directly — each device needs its own eSIM profile. However, you can use your iPhone as a Personal Hotspot (tethering) to share its data connection with your iPad over Wi-Fi or Bluetooth. This works with any Japan eSIM on your iPhone. The downside is that it uses your iPhone's battery and data allowance. If you're using both devices heavily, two separate eSIM plans may be more practical.",
  },
  {
    q: "Does eSIM work on Wi-Fi only iPad?",
    a: "No. Wi-Fi-only iPad models have no cellular modem and no eSIM slot — they cannot connect to mobile networks at all. If you're unsure whether your iPad is cellular-capable, go to Settings: if there is no 'Cellular' option in the menu, your iPad is Wi-Fi only. When purchasing an iPad specifically for Japan travel connectivity, ensure you choose the 'Wi-Fi + Cellular' model.",
  },
  {
    q: "How do I set up eSIM on iPad Pro?",
    a: "The process is identical to iPhone. Go to Settings → Cellular → Add eSIM → Use QR Code. Scan the QR code from your provider's app or email. Follow the on-screen prompts to download and activate the eSIM profile. Label it 'Japan' for easy identification. Switch it on when your flight lands — you'll have working 4G within a few minutes of arrival.",
  },
];

export default function JapanEsimIpadPage() {
  return (
    <>
      <Head>
        <title>Best eSIM for Japan on iPad 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to get a Japan eSIM for your iPad in 2026. We compare Airalo, Holafly and eSIM Go for iPad Pro, Air and mini — with a step-by-step setup guide."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-esim-ipad" />
        <meta property="og:title" content="Best eSIM for Japan on iPad 2026" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-esim-ipad" />
        <meta property="og:description" content="How to get a Japan eSIM for your iPad in 2026. We compare Airalo, Holafly and eSIM Go for iPad Pro, Air and mini — with a step-by-step setup guide." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best eSIM for Japan on iPad 2026" />
        <meta name="twitter:description" content="How to get a Japan eSIM for your iPad in 2026. We compare Airalo, Holafly and eSIM Go for iPad Pro, Air and mini — with a step-by-step setup guide." />
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
              headline: "Best eSIM for Japan on iPad (2026): Stay Connected on Your Tablet",
              dateModified: "2026-05-01",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "eSIM for iPad", item: "https://japan-travel-kit.com/guides/esim/japan-esim-ipad" },
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
          <span className={styles.breadCurrent}>eSIM for iPad</span>
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
            Best eSIM for Japan on iPad (2026):<br />Stay Connected on Your Tablet
          </h1>
          <p className={styles.heroSubtitle}>
            Travelling to Japan with an iPad? Here&apos;s how to get data on your tablet — without paying roaming fees.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "iPad Compatible", "All Models"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Best Overall</p>
                <p className={styles.verdictStatValue}>Airalo</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Unlimited</p>
                <p className={styles.verdictStatValue}>Holafly</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Compatible iPads</p>
                <p className={styles.verdictStatValue}>iPad Pro / Air / mini / iPad (cellular models)</p>
              </div>
            </div>
            <a
              href="https://airalo.pxf.io/c/7213504/1268485/15608"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM for iPad →
            </a>
          </div>
        </div>

        {/* iPad Compatibility */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Which iPads Support eSIM?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["iPad Model", "eSIM Support"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ipadCompatibility.map((row) => (
                    <tr key={row.model}>
                      <td className={styles.tdProvider}>{row.model}</td>
                      <td style={{
                        fontWeight: 600,
                        color: row.esim.startsWith("✓") ? "#15803d" : "#c62828",
                      }}>
                        {row.esim}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Important:</strong> eSIM support requires the cellular version of the iPad.
            Wi-Fi-only models — even the latest iPad Pro — cannot use eSIM or any mobile data connection.
            Check your iPad model in Settings → General → About to confirm your version.
          </p>
        </section>

        {/* Best eSIMs for iPad */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Top picks</span>
          <h2 className={styles.sectionTitle}>Best Japan eSIMs for iPad</h2>

          {ipadPicks.map((pick) => (
            <div key={pick.rank} style={{ marginBottom: "2rem", padding: "1.5rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                {pick.rank}. {pick.name} — {pick.tagline}
              </h3>
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
          ))}
        </section>

        {/* Setup Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Install eSIM on iPad</h2>
          <div className={styles.stepsList}>
            {setupSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            The process is identical on iPad Pro, iPad Air, iPad mini, and standard iPad. Complete
            steps 1–4 at home before you travel — the eSIM profile download requires an internet
            connection (Wi-Fi is fine). Only activate it in Japan when you arrive.
          </p>
        </section>

        {/* iPad vs iPhone */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>iPad vs iPhone eSIM: Any Difference?</h2>
          <p className={styles.bodyText}>
            The eSIM installation process is identical on iPad and iPhone — same QR code scan, same
            Settings menu structure, same activation steps. Any Japan eSIM that works on iPhone also
            works on a compatible iPad.
          </p>
          <p className={styles.bodyText}>
            The main practical difference is that most people travel with both devices. If you carry
            both an iPhone and an iPad, you have two options: buy a separate eSIM for each device,
            or use your iPhone&apos;s Personal Hotspot to share data with your iPad. The hotspot approach saves
            money but drains your iPhone&apos;s battery faster.
          </p>
          <p className={styles.bodyText}>
            If you&apos;re using your iPad heavily for navigation, translation, and streaming, a dedicated
            eSIM on the iPad gives you independence — especially useful if your iPhone battery runs low.
            At $4.50–$9.50 for Airalo&apos;s Japan plans, a second eSIM is a reasonable investment for
            a week-long trip.
          </p>
        </section>

        {/* Using iPad in Japan */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Use cases</span>
          <h2 className={styles.sectionTitle}>Using Your iPad in Japan</h2>
          <div className={styles.whoForGrid}>
            {ipadUseCases.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="9" y1="7" x2="15" y2="7" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="9" y1="17" x2="11" y2="17" />
                  </svg>
                </div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
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
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (Step-by-Step)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Get Airalo Japan eSIM for your iPad</h2>
            <p className={styles.ctaBannerDesc}>
              Works on all eSIM-capable iPads. Install at home, activate when you land.
              Docomo network, from $4.50 for 7 days.
            </p>
            <a
              href="https://airalo.pxf.io/c/7213504/1268485/15608"
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
