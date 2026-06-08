import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const comparisonRows = [
  { feature: "Setup", esim: "QR code — install before you fly", physicalSim: "At airport kiosk or mail delivery" },
  { feature: "Installation", esim: "Digital, no physical card", physicalSim: "Insert physical SIM card" },
  { feature: "Phone requirement", esim: "eSIM-compatible device only", physicalSim: "Any unlocked phone" },
  { feature: "Voice calls", esim: "Data-only (most plans)", physicalSim: "Available (e.g. Sakura Mobile)" },
  { feature: "Price", esim: "From $3.50", physicalSim: "From ~¥3,000 (~$20)" },
  { feature: "Best for", esim: "Short trips (1 day – 1 month)", physicalSim: "Long stays (1 month+) or voice needs" },
];

const esimPros = [
  "Instant setup — install before you fly",
  "No physical card to lose or swap",
  "Cheaper for short trips",
  "Keep your home SIM active in the other slot",
  "Works in 190+ countries with multi-country plans",
];

const esimCons = [
  "Requires an eSIM-compatible device",
  "Data-only on most Japan plans (no voice)",
  "Less English support on some providers",
];

const simPros = [
  "Works on any unlocked phone",
  "Voice calls and SMS available",
  "English customer support (Sakura Mobile)",
  "Better value for stays of 1 month or longer",
  "No need to check device compatibility",
];

const simCons = [
  "Must pick up at airport or wait for delivery",
  "More expensive than eSIM for short trips",
  "Physical card can be lost or damaged",
  "Must swap your home SIM out",
];

const esimPicks = [
  {
    rank: 1,
    badge: "Best Overall eSIM",
    badgeClass: "pickBadgeBlue" as const,
    name: "Airalo",
    summary:
      "Airalo is our top pick for Japan eSIM — the world's largest marketplace with plans from $4.50 for 7 days. Runs on Docomo and SoftBank. Instant QR code activation, easy app, and works on iPhone and Android.",
    bestFor: "Most travellers visiting for 1 week to 1 month",
    pros: ["Prices from $4.50", "Docomo & SoftBank coverage", "Trusted by 10M+ travellers"],
    cons: ["Data-only", "Support can be slow"],
    href: "https://airalo.pxf.io/c/7213504/1268485/15608",
    cta: "Get Airalo Japan eSIM →",
  },
  {
    rank: 2,
    badge: "Best Budget eSIM",
    badgeClass: "pickBadgeGreen" as const,
    name: "eSIM Go",
    summary:
      "eSIM Go is the cheapest Japan eSIM available, with plans from around $3.50. Runs on Docomo — one of Japan's best networks. Ideal for travellers who want data without paying over the odds.",
    bestFor: "Budget travellers on short trips (1–14 days)",
    pros: ["Cheapest plans available", "Docomo network", "Simple QR setup"],
    cons: ["Less well-known brand", "Data-only", "Smaller plans at entry level"],
    href: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN",
    cta: "Get eSIM Go Japan →",
  },
  {
    rank: 3,
    badge: "Best Unlimited eSIM",
    badgeClass: "pickBadgeOrange" as const,
    name: "Holafly",
    summary:
      "Holafly offers unlimited data for Japan on SoftBank — no GB limits, no running out mid-trip. Best for heavy data users who stream video, make video calls, or want peace of mind.",
    bestFor: "Heavy data users, streamers, long itineraries",
    pros: ["Unlimited data", "SoftBank network", "No overage worries"],
    cons: ["More expensive than capped plans", "Fair-use speed limits apply", "Data-only"],
    href: "#",
    cta: "View Holafly Plans →",
  },
];

const simPick = {
  rank: 1,
  badge: "Best Physical SIM",
  badgeClass: "pickBadgeBlue" as const,
  name: "Sakura Mobile",
  summary:
    "Sakura Mobile is the only Japan tourist SIM with genuine English-speaking customer support, voice calls, and flexible plans designed for both short and long stays. Runs on Docomo — Japan's most extensive network.",
  bestFor: "Longer stays, travellers who need voice calls, those wanting English support",
  pros: [
    "Voice calls & SMS included",
    "English-speaking support team",
    "Docomo network — best rural coverage",
    "Flexible plan lengths",
  ],
  cons: [
    "More expensive than eSIM for short stays",
    "Requires airport pickup or delivery",
    "Need to swap your home SIM",
  ],
  href: "https://p.sakuramobile.jp/idevaffiliate.php?id=486",
  cta: "Get Sakura Mobile SIM →",
};

const scenarios = [
  { trip: "1 week or under", recommendation: "eSIM Go", reason: "Cheapest data for short trips — no need for a physical card" },
  { trip: "2–4 weeks", recommendation: "Airalo", reason: "Best value for the typical tourist visit — competitive per-GB pricing" },
  { trip: "1 month or more", recommendation: "Sakura Mobile", reason: "Physical SIM with better long-stay rates, English support, voice calls" },
  { trip: "Voice calls needed", recommendation: "Sakura Mobile", reason: "Only tourist option with real Japanese phone number and call capability" },
  { trip: "Group of 3+", recommendation: "Consider Pocket WiFi", reason: "One shared device can be more cost-effective than individual SIMs for groups" },
  { trip: "Unlimited data needed", recommendation: "Holafly eSIM", reason: "No data caps for heavy users — streaming and video calls without limits" },
];

const faqItems = [
  {
    q: "Is eSIM better than a SIM card for Japan?",
    a: "For most tourists visiting Japan for 1–30 days, an eSIM is the better choice. It is cheaper, faster to set up, and requires no visit to an airport kiosk. The main limitation is that most Japan eSIMs are data-only — if you need voice calls or SMS, a physical SIM (Sakura Mobile) is the better option. eSIM also requires a compatible device — most smartphones made after 2018 and most current-generation tablets qualify.",
  },
  {
    q: "Can I get a physical SIM at Japan airports?",
    a: "Yes. Physical SIM cards and eSIM QR codes are available at vending machines and kiosks in most major Japanese airports, including Narita, Haneda, Kansai, and Chubu. However, airport prices are typically higher than when you pre-order online. Pre-ordering from Sakura Mobile before you fly is usually cheaper and avoids any queue time on arrival.",
  },
  {
    q: "Which is cheaper, eSIM or physical SIM for Japan?",
    a: "eSIMs are significantly cheaper for short trips. A Japan eSIM from Airalo starts at $4.50 for 7 days / 1 GB, while a physical tourist SIM from Sakura Mobile typically starts around ¥3,000–¥4,000 (~$20–$27) for a basic plan. For stays of 1 month or longer, the gap narrows and a physical SIM may offer better per-day value with voice capability included.",
  },
  {
    q: "Do I need to be in Japan to activate a physical SIM?",
    a: "Generally, yes — a Japan SIM card must be inserted and activated in Japan. However, Sakura Mobile ships SIMs internationally, so you receive the card before you travel and insert it when you land. Some providers also offer pre-activated eSIM QR codes that you scan before departure and activate on arrival.",
  },
  {
    q: "What happens if my eSIM doesn't work in Japan?",
    a: "First, ensure the eSIM profile is toggled on in your phone's settings and that your device is not in airplane mode. If you still have no signal, check that the eSIM is set as the primary data line. Contact your eSIM provider's support — Airalo, Holafly, and eSIM Go all offer online support. As a backup, 7-Eleven convenience stores in Japan sell physical SIM cards at reasonable prices.",
  },
];

export default function JapanSimCardVsEsim2026Page() {
  return (
    <>
      <Head>
        <title>Japan SIM Card vs eSIM 2026: Which Is Better? | Japan Travel Kit</title>
        <meta
          name="description"
          content="SIM card or eSIM for Japan in 2026? We compare setup, price, coverage and voice calls across Airalo, eSIM Go, Holafly and Sakura Mobile to help you decide."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-vs-esim-2026" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Japan SIM Card vs eSIM 2026: Which Is Better? | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-sim-card-vs-esim-2026" />
        <meta property="og:description" content="SIM card or eSIM for Japan in 2026? We compare setup, price, coverage and voice calls across Airalo, eSIM Go, Holafly and Sakura Mobile to help you decide." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan SIM Card vs eSIM 2026: Which Is Better? | Japan Travel Kit" />
        <meta name="twitter:description" content="SIM card or eSIM for Japan in 2026? We compare setup, price, coverage and voice calls across Airalo, eSIM Go, Holafly and Sakura Mobile to help you decide." />
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
              headline: "Japan SIM Card vs eSIM (2026): Which Should You Choose?",
              dateModified: "2026-05-02",
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "SIM Card vs eSIM", item: "https://www.japan-travel-kit.com/guides/esim/japan-sim-card-vs-esim-2026" },
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
          <span className={styles.breadCurrent}>SIM Card vs eSIM</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📶</span> Updated May 2026
          </p>
          <h1 className={styles.heroTitle}>
            Japan SIM Card vs eSIM (2026):<br />Which Should You Choose?
          </h1>
          <p className={styles.heroSubtitle}>
            Both work great in Japan. But one is faster to set up, cheaper, and doesn&apos;t
            require visiting a store. Here&apos;s how to choose.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "Full Comparison", "2026 Prices"].map((t) => (
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
            This doesn&apos;t affect our comparisons or recommendations.{" "}
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
                <p className={styles.verdictStatLabel}>For most travellers</p>
                <p className={styles.verdictStatValue}>eSIM (Airalo or eSIM Go)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Need voice calls?</p>
                <p className={styles.verdictStatValue}>Physical SIM (Sakura Mobile)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Older phone?</p>
                <p className={styles.verdictStatValue}>Physical SIM</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>eSIM wins for most trips.</strong> It&apos;s cheaper, faster to activate,
              and requires no airport visit. The exception: if you need voice calls or SMS,
              or if your phone is older than 2018, a physical SIM from Sakura Mobile is
              the right choice.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>What&apos;s the Difference?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Feature", "eSIM", "Physical SIM"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.esim}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.physicalSim}</td>
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
          <h2 className={styles.sectionTitle}>eSIM: Full Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {esimPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {esimCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Physical SIM Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Physical SIM</span>
          <h2 className={styles.sectionTitle}>Physical SIM: Full Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {simPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {simCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Best eSIMs */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top eSIM picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for Japan 2026</h2>
          <div className={styles.picksList}>
            {esimPicks.map((pick) => (
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

        {/* Best Physical SIM */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top SIM pick</span>
          <h2 className={styles.sectionTitle}>Best Physical SIM for Japan 2026</h2>
          <div className={styles.picksList}>
            <div className={styles.pickCard}>
              <div className={styles.pickCardHeader}>
                <div className={styles.pickRank}>
                  <span className={styles.pickNumber}>{simPick.rank}</span>
                  <div className={styles.pickMeta}>
                    <span className={`${styles.pickBadge} ${styles[simPick.badgeClass]}`}>{simPick.badge}</span>
                    <span className={styles.pickName}>{simPick.name}</span>
                  </div>
                </div>
              </div>
              <div className={styles.pickCardBody}>
                <p className={styles.pickSummary}>{simPick.summary}</p>
                <div className={styles.pickTarget}>
                  <span className={styles.pickTargetLabel}>Best for:</span>
                  <span>{simPick.bestFor}</span>
                </div>
                <div className={styles.pickGrid}>
                  <div className={styles.pickPros}>
                    <p className={styles.pickListLabel}>Pros</p>
                    <ul className={styles.pickList}>
                      {simPick.pros.map((p) => (
                        <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.pickCons}>
                    <p className={styles.pickListLabel}>Cons</p>
                    <ul className={styles.pickList}>
                      {simPick.cons.map((c) => (
                        <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a
                  href={simPick.href}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {simPick.cta}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Which Should You Choose */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Decision guide</span>
          <h2 className={styles.sectionTitle}>Which Should You Choose?</h2>
          <p className={styles.bodyText}>
            The right option depends on your trip length, device, and whether you need voice calls.
            Here&apos;s a quick scenario guide:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your Situation", "Recommendation", "Reason"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((row) => (
                    <tr key={row.trip}>
                      <td className={styles.tdProvider}>{row.trip}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.recommendation}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026: Best SIM for Long Stays?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/esim-vs-sim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4" />
                  <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
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
            <h2 className={styles.ctaBannerTitle}>Compare all Japan connectivity options</h2>
            <p className={styles.ctaBannerDesc}>
              eSIM, physical SIM, Pocket WiFi — we compare every way to stay connected
              in Japan so you can choose with confidence.
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
