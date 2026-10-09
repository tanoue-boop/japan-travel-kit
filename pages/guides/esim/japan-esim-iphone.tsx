import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  getProvider,
  priceFrom,
  priceFromLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// Prices and affiliate links come from data/esim-prices.json (refreshed daily).
const link = (id: EsimProviderId) => getProvider(id).affiliateUrl;
const pricesCheckedAt = pricesCheckedLabel();

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

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
    priceFrom: priceFromLabel("airalo"),
    network: getProvider("airalo").network,
    affiliateUrl: link("airalo"),
    ctaLabel: "Get Airalo Japan eSIM →",
    pros: [
      "Dedicated iOS app installs the profile for you — no QR scan needed",
      "Top up from the app without touching iPhone Settings",
      "24/7 live chat support",
      "Trusted by 10M+ travellers worldwide",
    ],
    cons: [
      "Data-only (no voice calls or SMS)",
      "Requires eSIM-compatible iPhone (XS or later)",
    ],
    summary:
      `Airalo is the smoothest eSIM experience on iPhone, because it is the only one of the four with a native iOS app that can install the profile directly — you never open Settings → Cellular at all. Plans start at ${priceFromLabel("airalo")}.`,
  },
  {
    num: 2,
    name: "Holafly",
    badge: "Best Unlimited for iPhone",
    badgeColor: "#e65100",
    priceFrom: unlimitedFromLabel("holafly"),
    network: getProvider("holafly").network,
    affiliateUrl: link("airalo"),
    ctaLabel: HOLAFLY_ALT_LABEL,
    ctaNote: HOLAFLY_ALT_NOTE,
    pros: [
      "Unlimited on-device data — nothing to monitor in Settings → Cellular",
      "Plain QR-code install, so it works on every eSIM iPhone back to the XS",
      "Popular with US & European travellers",
    ],
    cons: [
      "Data-only (no voice calls or SMS)",
      "Hotspot capped at 1 GB/day — poor for tethering an iPad",
      "Pricier than capped alternatives",
    ],
    summary:
      `If you stream, use FaceTime Video heavily, or simply do not want to watch iOS's data meter, an unlimited plan removes the question. Holafly unlimited starts at ${unlimitedFromLabel("holafly")} — but note the 1 GB/day hotspot cap if you plan to tether an iPad or Mac.`,
  },
  {
    num: 3,
    name: "eSIM Go",
    badge: "Best Budget for iPhone",
    badgeColor: "#1565c0",
    priceFrom: priceFromLabel("esimgo"),
    network: getProvider("esimgo").network,
    affiliateUrl: link("esimgo"),
    ctaLabel: "Get eSIM Go Japan →",
    pros: [
      `Cheapest Japan eSIM at ${priceFromLabel("esimgo")}`,
      "Docomo network — excellent rural coverage",
      "Instant QR code activation via iPhone Settings",
      "Works in 190+ countries",
    ],
    cons: [
      "Data-only (no voice or SMS)",
      "No iOS app — install is QR-code only",
      "Email-only customer support",
    ],
    summary:
      `eSIM Go has no iOS app, so you install it the manual way: Settings → Cellular → Add eSIM → Use QR Code. That is two minutes of work for the lowest price of the four, from ${priceFromLabel("esimgo")}.`,
  },
  {
    num: 4,
    name: "Sakura Mobile",
    badge: "Best for Long Stay",
    badgeColor: "#2e7d32",
    priceFrom: priceFromLabel("sakura"),
    network: getProvider("sakura").network,
    affiliateUrl: link("sakura"),
    ctaLabel: "Get Sakura Mobile eSIM →",
    pros: [
      "Voice calls & SMS available (on their physical SIM plans)",
      "English phone & email support",
      "Physical SIM or eSIM available",
      "Best for stays of 1 month+",
    ],
    cons: [
      "Higher price than data-only eSIMs",
      "The only provider here needing a manual APN entry on iPhone (plus.4g)",
      "Not ideal for short trips",
    ],
    summary:
      `For longer stays, Sakura Mobile is the only tourist option with real English phone support and a voice-call option. One iPhone-specific caveat: it is the only provider on this page that may need a manual APN (plus.4g) under Settings → Cellular → Cellular Data Network. Plans from ${priceFromLabel("sakura")}.`,
  },
];

// iPhone-only install flow. The multi-device walkthrough (Android, iPad, Samsung,
// Pixel, troubleshooting) lives in how-to-set-up-esim-japan — we link rather than repeat it.
const setupSteps = [
  {
    title: "Check for an EID first (Settings → General → About)",
    desc: "Scroll to the bottom of the About screen. If an \"EID\" row is listed your iPhone has eSIM hardware; if it is missing, the handset cannot take a Japan eSIM at all and no amount of setup will change that.",
  },
  {
    title: "Install over WiFi at home, not at the airport",
    desc: "Downloading an eSIM profile needs an internet connection, and the one place you won't have one is the arrivals hall. Do this step days before you fly.",
  },
  {
    title: "Settings → Cellular → Add eSIM → Use QR Code",
    desc: "On iPhone 13 and later the \"Add eSIM\" row sits near the top of the Cellular screen; on XS–12 you scroll past your existing plan to find it. Airalo users can skip this entirely and install from the Airalo app instead.",
  },
  {
    title: "Label it \"Japan\" when iOS asks",
    desc: "iOS defaults to names like \"Secondary\" or the carrier's own label, which gets confusing once two plans are listed. Naming it \"Japan\" makes the arrival-day toggle obvious.",
  },
  {
    title: "Leave the plan toggled OFF until you land",
    desc: "An installed-but-off profile costs nothing and cannot be charged. Switch it on after the cabin crew clears flight mode, then set it as the data line.",
  },
];

const faqItems = [
  {
    q: "Which iPhones can use a Japan eSIM?",
    a: "iPhone XS and later (2018 onwards): XS, XS Max, XR, and every iPhone 11 through 16 model. iPhone XS to 12 run one eSIM plus one physical nano-SIM; iPhone 13 and later run two eSIMs at once. Two exceptions catch people out — iPhones bought in mainland China have no eSIM at all, and the Japanese-market iPhone XS/XR sold by some carriers can be eSIM-restricted.",
  },
  {
    q: "Can I use two eSIMs at once on iPhone?",
    a: "iPhone 13 and later support Dual SIM with two active eSIMs simultaneously — you can have your home eSIM and Japan eSIM active at the same time. iPhone XS through iPhone 12 support one active eSIM plus one physical nano-SIM at the same time. In all cases, only one SIM handles data at a time.",
  },
  {
    q: "Should I keep my home line on \"Default Voice\" while in Japan?",
    a: "Yes, for most travellers. In Settings → Cellular, leave your home SIM as the Default Voice Line and set the Japan eSIM as Cellular Data, then turn Data Roaming off on the home line. Your home number still rings and texts arrive, but no data goes through it — which is where roaming bills come from. Also switch off \"Allow Cellular Data Switching\", or iOS can quietly fall back to the home line when the Japan eSIM dips.",
  },
  {
    q: "My iPhone 14 has no SIM tray — does that change anything in Japan?",
    a: "Only for the better. US-market iPhone 14 and later are eSIM-only and ship SIM-unlocked, so there is no carrier lock to clear and no tray to fiddle with. You can hold up to eight Japan eSIM profiles on the device and keep two active.",
  },
  {
    q: "The eSIM installed but my iPhone says \"No Service\" in Japan — what now?",
    a: "Work through it in this order: confirm the Japan plan's toggle is on (Settings → Cellular), confirm it is selected under Cellular Data, then toggle Airplane Mode off and on to force a fresh network search. If it still shows no service, reset network settings via Settings → General → Transfer or Reset iPhone → Reset → Reset Network Settings. A Sakura Mobile eSIM may additionally need its APN typed in by hand as plus.4g.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-iphone") } });

export default function JapanEsimIphonePage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Best eSIM for Japan on iPhone 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Which eSIM works best for Japan on iPhone? We tested Airalo, Holafly and eSIM Go on iPhone XS to iPhone 16. Full setup guide."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-iphone" />
        <meta property="og:title" content="Best eSIM for Japan on iPhone 2026: Top Picks & Setup Guide" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-iphone" />
        <meta property="og:description" content="Which eSIM works best for Japan on iPhone? We tested Airalo, Holafly and eSIM Go on iPhone XS to iPhone 16. Full setup guide." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best eSIM for Japan on iPhone 2026: Top Picks & Setup Guide" />
        <meta name="twitter:description" content="Which eSIM works best for Japan on iPhone? We tested Airalo, Holafly and eSIM Go on iPhone XS to iPhone 16. Full setup guide." />
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
              headline: "Best eSIM for Japan on iPhone 2026: Top Picks & Setup Guide",
              dateModified: updated.iso,
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
            <span>📱</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan<br />on iPhone (2026)
          </h1>
          <p className={styles.heroSubtitle}>
            Which Japan eSIM installs cleanly on an iPhone, and exactly where to tap in iOS to do it.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "iPhone XS to iPhone 16", "Step-by-Step Guide"].map((t) => (
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
            <span className={styles.verdictLabel}>Short answer for iPhone</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              Every iPhone from the XS (2018) onwards takes a Japan eSIM, and the install is
              the same five taps on all of them: <strong>Settings → Cellular → Add eSIM → Use
              QR Code</strong>, then leave the plan switched off until you land. The only
              provider choice that actually changes the iPhone experience is{" "}
              <strong>Airalo</strong>, whose iOS app installs the profile for you so you never
              open Settings at all — which is why it is our pick here even though{" "}
              <strong>eSIM Go</strong> is cheaper. Prices checked {pricesCheckedAt}.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Easiest install on iOS</p>
                <p className={styles.verdictStatValue}>Airalo — from {priceFrom("airalo")}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest (QR install)</p>
                <p className={styles.verdictStatValue}>eSIM Go — from {priceFrom("esimgo")}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Needs manual APN</p>
                <p className={styles.verdictStatValue}>Sakura Mobile only (plus.4g)</p>
              </div>
            </div>
            <a href={link("airalo")} className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        {/* Which iPhones Support eSIM */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Which iPhones Support eSIM?</h2>
          <p className={styles.bodyText}>
            The number in brackets is what matters most on an iPhone: it is how many eSIM
            profiles can be <em>active at once</em>, not how many you can store. On iPhone 13
            and later you can run your home eSIM and a Japan eSIM side by side; on XS–12 the
            Japan eSIM has to share the phone with a physical nano-SIM instead. iPhones bought
            in mainland China have no eSIM support at all.
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

              <a
                href={pick.affiliateUrl}
                className={styles.pickCta}
                target="_blank"
                rel={pick.ctaNote ? "sponsored noopener" : "noopener noreferrer nofollow"}
                style={{ marginTop: "1rem" }}
              >
                {pick.ctaLabel}
              </a>
              {pick.ctaNote && (
                <p style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: "0.6rem", lineHeight: 1.6 }}>
                  {pick.ctaNote}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Setup Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Install eSIM on iPhone</h2>
          <p className={styles.bodyText}>
            Under two minutes, done at home before you fly. These five steps are iPhone-specific —
            for Android, iPad, Galaxy Tab or Pixel Tablet, use the{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              multi-device setup guide
            </Link>{" "}
            instead.
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

        {/* Dual SIM */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Dual SIM</span>
          <h2 className={styles.sectionTitle}>Keeping Your Home Number Live Alongside It</h2>
          <p className={styles.bodyText}>
            The short version for iPhone: set your home SIM as <strong>Default Voice Line</strong>,
            set the Japan eSIM as <strong>Cellular Data</strong>, turn <strong>Data Roaming off</strong>{" "}
            on the home line, and switch off <strong>Allow Cellular Data Switching</strong> so iOS
            cannot quietly fall back to your home carrier when the Japan signal dips. That last
            toggle is the one that produces surprise roaming bills.
          </p>
          <p className={styles.bodyText}>
            The full dual-SIM walkthrough — including the Android equivalents and what to do when
            a profile disappears after a restart — is in our{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              step-by-step eSIM setup guide for Japan
            </Link>.
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
                <p className={styles.relatedTitle}>Airalo Japan Review 2026: Is It Worth It?</p>
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
