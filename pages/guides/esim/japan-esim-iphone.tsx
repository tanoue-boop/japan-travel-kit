import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const AIRALO_URL = "https://airalo.pxf.io/c/7213504/1268485/15608";
const SAKURA_URL = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
const ESIMGO_URL = "https://breezesim.com?sca_ref=11082101.AF8vabyRKN";
const HOLAFLY_URL = "#";

const iphoneModels = [
  { model: "iPhone XS / XR",     esim: "✓ (1 eSIM)"  },
  { model: "iPhone 11 series",   esim: "✓ (1 eSIM)"  },
  { model: "iPhone 12 series",   esim: "✓ (1 eSIM)"  },
  { model: "iPhone 13 series",   esim: "✓ (2 eSIMs)" },
  { model: "iPhone 14 series",   esim: "✓ (2 eSIMs)" },
  { model: "iPhone 15 series",   esim: "✓ (2 eSIMs)" },
  { model: "iPhone 16 series",   esim: "✓ (2 eSIMs)" },
];

const picks = [
  {
    num: 1,
    name: "Airalo",
    badge: "Best Overall for iPhone",
    badgeColor: "#0d1b4b",
    priceFrom: "$4.50 / 7 days",
    network: "Docomo & SoftBank",
    affiliateUrl: AIRALO_URL,
    ctaLabel: "Get Airalo Japan eSIM →",
    pros: [
      "Dedicated iOS app makes setup effortless",
      "QR code + in-app eSIM installation",
      "24/7 live chat support",
      "Trusted by 10M+ travellers worldwide",
    ],
    cons: [
      "Data-only (no voice calls or SMS)",
      "Requires eSIM-compatible iPhone (XS or later)",
    ],
    summary:
      "Airalo is the smoothest eSIM experience on iPhone. Their app lets you scan, install, and manage your Japan eSIM without ever leaving the app — no hunting through Settings. Plans start at $4.50 for 1 GB / 7 days on Docomo and SoftBank.",
  },
  {
    num: 2,
    name: "Holafly",
    badge: "Best Unlimited for iPhone",
    badgeColor: "#e65100",
    priceFrom: "$19 / 5 days",
    network: "SoftBank (nationwide)",
    affiliateUrl: HOLAFLY_URL,
    ctaLabel: "Get Holafly Japan eSIM →",
    pros: [
      "Truly unlimited data — no caps or throttling",
      "Simple QR code setup on iPhone",
      "Popular with US & European travellers",
      "No data tracking needed",
    ],
    cons: [
      "Data-only (no voice calls or SMS)",
      "Pricier than capped alternatives",
      "eSIM-compatible iPhone required",
    ],
    summary:
      "If you stream Apple TV+, use FaceTime Video frequently, or simply hate tracking data, Holafly's unlimited plan removes all anxiety. At $19 for 5 days or $49 for 30 days, it's the best unlimited eSIM for iPhone users visiting Japan.",
  },
  {
    num: 3,
    name: "eSIM Go",
    badge: "Best Budget for iPhone",
    badgeColor: "#1565c0",
    priceFrom: "$3.50 / 7 days",
    network: "Docomo (nationwide)",
    affiliateUrl: ESIMGO_URL,
    ctaLabel: "Get eSIM Go Japan →",
    pros: [
      "Cheapest Japan eSIM at $3.50 / 1 GB",
      "Docomo network — excellent rural coverage",
      "Instant QR code activation via iPhone Settings",
      "Works in 190+ countries",
    ],
    cons: [
      "Data-only (no voice or SMS)",
      "Email-only customer support",
      "Smaller brand than Airalo",
    ],
    summary:
      "eSIM Go works perfectly on iPhone — scan the QR code in Settings → Cellular → Add eSIM and you're done in under two minutes. At $3.50 for 1 GB / 7 days on Docomo, it's the most affordable Japan eSIM for iPhone users on a budget.",
  },
  {
    num: 4,
    name: "Sakura Mobile",
    badge: "Best for Long Stay",
    badgeColor: "#2e7d32",
    priceFrom: "$28 / 30 days",
    network: "Docomo (nationwide)",
    affiliateUrl: SAKURA_URL,
    ctaLabel: "Get Sakura Mobile SIM →",
    pros: [
      "Voice calls & SMS included",
      "English phone & email support",
      "Physical SIM or eSIM available",
      "Best for stays of 1 month+",
    ],
    cons: [
      "Higher price than data-only eSIMs",
      "Setup slightly more involved than Airalo",
      "Not ideal for short trips",
    ],
    summary:
      "For longer stays where you need to make calls — booking restaurants, contacting accommodation, or handling admin — Sakura Mobile is the only tourist option with voice calls and real English support. Works as eSIM on iPhone XS and later.",
  },
];

const setupSteps = [
  {
    title: "Go to Settings → Cellular",
    desc: "Open the Settings app on your iPhone and tap \"Cellular\" (or \"Mobile Data\" in some regions).",
  },
  {
    title: "Tap \"Add eSIM\"",
    desc: "Scroll down and tap \"Add eSIM\". On iPhone 13 and later with iOS 16+, you may see \"Add eSIM\" directly on the Cellular screen.",
  },
  {
    title: "Tap \"Use QR Code\"",
    desc: "Select \"Use QR Code\" from the options. Your camera will open automatically.",
  },
  {
    title: "Scan the QR code from your provider",
    desc: "Point your camera at the QR code from Airalo, eSIM Go, or your chosen provider. The eSIM will download in seconds.",
  },
  {
    title: "Label it \"Japan\" and keep it OFF until you land",
    desc: "Name the eSIM \"Japan\" so it's easy to find later. Leave it turned OFF — set your primary SIM as the default for calls and data until you arrive in Japan.",
  },
];

const dualSimTips = [
  {
    title: "Receive calls on your home SIM while using Japan data",
    desc: "In Settings → Cellular, set your home SIM as the \"Default Voice Line\" and your Japan eSIM as the \"Default Data\". Your phone will ring on your home number while all data routes through the Japan eSIM.",
  },
  {
    title: "Switch data to your Japan eSIM on arrival",
    desc: "When you land, go to Settings → Cellular → Cellular Data and select your Japan eSIM. This routes all data through the local network. Your home SIM stays active for calls and SMS but won't use data (avoiding roaming charges).",
  },
  {
    title: "Turn off data roaming on your home SIM",
    desc: "To be safe, go to Settings → Cellular → [Your Home SIM] and turn off \"Data Roaming\". This prevents accidental roaming charges if your home SIM tries to connect.",
  },
];

const faqItems = [
  {
    q: "Does my iPhone support eSIM for Japan?",
    a: "iPhone XS and later (released 2018 onwards) support eSIM. This includes the XS, XS Max, XR, and all iPhone 11, 12, 13, 14, 15, and 16 models. To confirm, go to Settings → General → About and scroll down to find \"EID\" — if it's listed, your iPhone supports eSIM. Note: iPhones bought in mainland China do not support eSIM.",
  },
  {
    q: "Can I use eSIM on a carrier-locked iPhone?",
    a: "Usually no. Carrier-locked iPhones typically block eSIM from other providers. You'll need to contact your carrier to unlock your iPhone before using a Japan eSIM. Most carriers will unlock your phone if your contract is paid up or if you've owned the device for a set period. iPhone 14 and later models sold in the US are eSIM-only and SIM-unlocked by default.",
  },
  {
    q: "How do I switch between SIMs on iPhone?",
    a: "Go to Settings → Cellular → Cellular Data, then select which SIM to use for data. For calls, go to Settings → Cellular → Default Voice Line. On iPhone 13 and later, you can also manage dual SIM settings directly from the Cellular screen. You can switch at any time — no restart needed.",
  },
  {
    q: "Can I use two eSIMs at once on iPhone?",
    a: "iPhone 13 and later support Dual SIM with two active eSIMs simultaneously — you can have your home eSIM and Japan eSIM active at the same time. iPhone XS through iPhone 12 support one active eSIM plus one physical nano-SIM at the same time. In all cases, only one SIM handles data at a time.",
  },
  {
    q: "What if my Japan eSIM doesn't work on iPhone?",
    a: "First, check that your iPhone is unlocked (Settings → General → About — if you see \"No SIM restrictions\" it's unlocked). Then confirm the eSIM is turned on and set as the data line (Settings → Cellular → Cellular Data). If the eSIM installed but shows \"No Service\", try toggling Airplane Mode on and off, or go to Settings → General → Transfer or Reset iPhone → Reset → Reset Network Settings. Contact your provider's support if the issue persists.",
  },
];

export default function JapanEsimIphonePage() {
  return (
    <>
      <Head>
        <title>Best eSIM for Japan on iPhone 2025: Top Picks &amp; Setup Guide | Japan Travel Kit</title>
        <meta
          name="description"
          content="Which eSIM works best for Japan on iPhone? We tested Airalo, Holafly and eSIM Go on iPhone XS to iPhone 16. Full setup guide."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-esim-iphone" />
        <meta property="og:title" content="Best eSIM for Japan on iPhone 2025: Top Picks & Setup Guide" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-esim-iphone" />
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
          <span className={styles.breadCurrent}>Japan eSIM for iPhone</span>
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
            Best eSIM for Japan<br />on iPhone (2025)
          </h1>
          <p className={styles.heroSubtitle}>
            iPhone makes eSIM setup incredibly easy. Here&apos;s the best Japan eSIM for every iPhone model.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2025", "iPhone XS to iPhone 16", "Step-by-Step Guide"].map((t) => (
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

        {/* Quick Verdict Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Verdict</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Overall</p>
                <p className={styles.verdictStatValue}>Airalo — from $4.50</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Unlimited</p>
                <p className={styles.verdictStatValue}>Holafly — from $19</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Budget</p>
                <p className={styles.verdictStatValue}>eSIM Go — from $3.50</p>
              </div>
            </div>
            <a href={AIRALO_URL} className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        {/* Which iPhones Support eSIM */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Which iPhones Support eSIM?</h2>
          <p className={styles.bodyText}>
            All iPhone models from the XS (2018) onwards support eSIM. iPhone 13 and later can
            run two eSIMs simultaneously, letting you keep your home SIM active while using a
            Japan data eSIM. The only exception is iPhones purchased in mainland China, which
            do not support eSIM.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>iPhone Model</th>
                    <th>eSIM Support</th>
                  </tr>
                </thead>
                <tbody>
                  {iphoneModels.map((row) => (
                    <tr key={row.model}>
                      <td className={styles.tdProvider}>{row.model}</td>
                      <td style={{ color: "#16a34a", fontWeight: 700 }}>{row.esim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            To confirm eSIM support on your device: Settings → General → About → scroll to EID. If EID is present, your iPhone supports eSIM.
          </p>
        </section>

        {/* Best eSIMs for iPhone */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rankings</span>
          <h2 className={styles.sectionTitle}>Best Japan eSIMs for iPhone</h2>

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
                <Link href="/sim-cards" className={styles.pickCta} style={{ marginTop: "1rem" }}>
                  {pick.ctaLabel}
                </Link>
              )}
            </div>
          ))}
        </section>

        {/* Setup Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Install eSIM on iPhone</h2>
          <p className={styles.bodyText}>
            iPhone eSIM setup takes under two minutes. Follow these steps after purchasing your Japan eSIM — you can do this at home before you fly.
          </p>
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
        </section>

        {/* Dual SIM Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Dual SIM</span>
          <h2 className={styles.sectionTitle}>Dual SIM Tips for iPhone</h2>
          <p className={styles.bodyText}>
            iPhone 13 and later support two active eSIMs simultaneously. This lets you keep your
            home number reachable while all data routes through your Japan eSIM — the best of
            both worlds. Here&apos;s how to set it up correctly.
          </p>
          <div className={styles.whoForGrid}>
            {dualSimTips.map((tip) => (
              <div key={tip.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <p className={styles.whoForTitle}>{tip.title}</p>
                <p className={styles.whoForDesc}>{tip.desc}</p>
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
                <p className={styles.relatedTitle}>Best eSIM for Japan 2025: Top 4 Picks Tested &amp; Compared</p>
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
            <Link href="/guides/esim/airalo-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2025: Is It Worth It?</p>
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
              See how Airalo, Holafly, eSIM Go, and Sakura Mobile compare on price, coverage, and features.
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
