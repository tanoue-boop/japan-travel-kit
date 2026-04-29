import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const topPicks = [
  {
    rank: 1,
    name: "Airalo",
    badge: "Easiest Setup",
    badgeClass: "pickBadgeBlue" as const,
    summary: "The largest eSIM marketplace in the world, with a clear app and a dedicated help section. Airalo's Japan plans run on Docomo and SoftBank — two of the most reliable networks in the country. Plans start at $4.50 for 1 GB / 7 days.",
    bestFor: "Seniors who want a simple app and proven reliability",
    pros: ["Simple, English-friendly app", "Instant QR code delivery", "Trusted by 10M+ travellers", "Competitive pricing from $4.50"],
    cons: ["Data-only (no calls or SMS)", "Customer support can be slow"],
    cta: "Get Airalo Japan eSIM →",
    href: "https://airalo.pxf.io/c/7213504/1268485/15608",
  },
  {
    rank: 2,
    name: "Sakura Mobile",
    badge: "Best Support",
    badgeClass: "pickBadgeOrange" as const,
    summary: "Sakura Mobile is the only major Japan SIM provider with a dedicated English-speaking support team based in Japan. Their eSIM includes voice calls and SMS — making it the safest choice for anyone who needs to call for help while travelling.",
    bestFor: "Seniors who want English phone support and the option to make calls",
    pros: ["English-speaking Japan-based support", "Includes voice calls + SMS", "Docomo network (widest rural coverage)", "Easy online activation"],
    cons: ["More expensive than data-only options", "Plans are longer-term (30 days minimum)"],
    cta: "Get Sakura Mobile eSIM →",
    href: "https://p.sakuramobile.jp/idevaffiliate.php?id=486",
  },
  {
    rank: 3,
    name: "eSIM Go",
    badge: "Best Value",
    badgeClass: "pickBadgeGreen" as const,
    summary: "eSIM Go offers Japan coverage on Docomo from $3.50 — the most affordable option we've tested. The setup process is straightforward, and plans are available in short durations that suit a 1–2 week visit.",
    bestFor: "Seniors comfortable with basic technology who want to minimise cost",
    pros: ["Lowest price from $3.50", "Docomo network coverage", "No contract or long-term commitment", "Works on iPhone and Android"],
    cons: ["No voice or SMS", "Smaller brand — less name recognition", "Support is online-only"],
    cta: "Get eSIM Go Japan →",
    href: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN",
  },
];

const setupSteps = [
  {
    title: "Check your phone is eSIM compatible",
    desc: "Go to Settings → General → About. If you see 'EID' (a long number), your phone supports eSIM. Most iPhones from XS (2018) onward and many modern Android phones are compatible. See the compatibility check section below.",
  },
  {
    title: "Purchase your plan online before you fly",
    desc: "Buy from the provider's website or app. You'll receive a QR code by email or in-app — usually within minutes. No physical delivery needed.",
  },
  {
    title: "Scan the QR code in your phone's Settings",
    desc: "On iPhone: Settings → Cellular → Add eSIM → Use QR Code. On Android: Settings → Network → SIM → Add eSIM → Scan QR Code. The exact path varies slightly by phone model.",
  },
  {
    title: "Follow the on-screen prompts",
    desc: "Give the plan a label (e.g., 'Japan eSIM'), then choose whether to use it for data when abroad. No PIN or physical handling needed — the whole process takes under 5 minutes.",
  },
  {
    title: "Switch to the eSIM when you land in Japan",
    desc: "On arrival, open Settings → Cellular and switch your data line to the Japan eSIM. You'll have a live 4G signal before you reach baggage claim. Keep your home SIM for calls if needed.",
  },
];

const helpOptions = [
  {
    title: "Contact Sakura Mobile's English support team",
    desc: "Sakura Mobile has an English-speaking support team based in Japan. You can reach them by email or contact form — they typically respond within a few hours during business hours.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.18 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
      </svg>
    ),
  },
  {
    title: "Ask at your hotel front desk",
    desc: "Most hotels in Japan have English-speaking staff who can help with basic eSIM setup — scanning a QR code, switching data lines, or troubleshooting a connection issue.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Visit a tourist information centre",
    desc: "Major tourist information centres in Tokyo, Kyoto, and Osaka have multilingual staff. Bring your phone and the eSIM QR code email — staff can often help you scan and activate on the spot.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

const compatibility = [
  { device: "iPhone XS / XS Max / XR (2018)",   esim: "✓" },
  { device: "iPhone 11 / 11 Pro / 11 Pro Max",   esim: "✓" },
  { device: "iPhone SE (2nd gen, 2020)",          esim: "✓" },
  { device: "iPhone 12 / 13 / 14 / 15 / 16",    esim: "✓" },
  { device: "Samsung Galaxy S21 / S22 / S23 / S24", esim: "✓" },
  { device: "Google Pixel 3a and later",          esim: "✓" },
  { device: "iPhone X and earlier",               esim: "✗" },
  { device: "Older Android phones (pre-2019)",    esim: "Check model" },
];

const faqItems = [
  {
    q: "Is setting up an eSIM difficult for older travellers?",
    a: "Not anymore. On iPhone, the process is Settings → Cellular → Add eSIM → Use QR Code, then point your camera at the QR code you received by email. It takes under 5 minutes with no physical SIM handling. If you find it tricky, the hotel front desk or a tourist information centre can usually help you scan and activate.",
  },
  {
    q: "Which eSIM provider has the best English support for seniors?",
    a: "Sakura Mobile stands out for English-speaking support. Their team is based in Japan and can be reached by email or contact form. If you're worried about needing help during your trip, Sakura Mobile's Docomo eSIM with voice calls included gives the most complete safety net.",
  },
  {
    q: "Can I keep my home phone number while using a Japan eSIM?",
    a: "Yes. A Japan eSIM adds a second data line to your phone without replacing your existing SIM. Your home SIM card stays in the phone and your home number remains active — you just switch the data connection to the Japan eSIM while travelling. You can still receive calls on your home number (roaming charges may apply for calls).",
  },
  {
    q: "What if my phone doesn't support eSIM?",
    a: "If your phone isn't eSIM compatible (common with phones purchased before 2019), a physical SIM card is your alternative. Sakura Mobile offers a physical SIM that ships internationally. At the airport, Japan has SIM vending machines at Narita, Haneda, and Kansai Airport. Pre-ordering online is cheaper and faster.",
  },
  {
    q: "Does an eSIM work in rural Japan and on day trips?",
    a: "Airalo and Sakura Mobile both use Docomo, which has the widest rural coverage in Japan. Popular day-trip destinations like Nikko, Hakone, Nara, and Hiroshima all have reliable Docomo coverage. Very remote islands or deep mountain areas may have limited signal regardless of provider.",
  },
];

export default function JapanEsimSeniorsPage() {
  return (
    <>
      <Head>
        <title>Best eSIM for Japan for Seniors 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="The easiest Japan eSIM options for older travellers — simple setup, English support, and no contracts. Airalo, Sakura Mobile, and eSIM Go compared."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-esim-seniors" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best eSIM for Japan for Seniors 2026 | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-esim-seniors" />
        <meta property="og:description" content="The easiest Japan eSIM options for older travellers — simple setup, English support, and no contracts. Airalo, Sakura Mobile, and eSIM Go compared." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best eSIM for Japan for Seniors 2026 | Japan Travel Kit" />
        <meta name="twitter:description" content="The easiest Japan eSIM options for older travellers — simple setup, English support, and no contracts. Airalo, Sakura Mobile, and eSIM Go compared." />
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
              headline: "Best eSIM for Japan for Seniors (2026): Easy Setup, No Contracts",
              dateModified: "2026-04-29",
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
                { "@type": "ListItem", position: 1, name: "Home",               item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",             item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards",   item: "https://japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "eSIM for Seniors",   item: "https://japan-travel-kit.com/guides/esim/japan-esim-seniors" },
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
          <span className={styles.breadCurrent}>eSIM for Seniors</span>
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
            Best eSIM for Japan for Seniors (2026):<br />Easy Setup, No Contracts
          </h1>
          <p className={styles.heroSubtitle}>
            Stay connected in Japan without the hassle of physical SIM cards or complicated plans. We&apos;ve picked the easiest options for older travellers.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Simple Setup", "English Support"].map((t) => (
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

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Easiest setup</p>
                <p className={styles.verdictStatValue}>Airalo (scan QR, done)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best English support</p>
                <p className={styles.verdictStatValue}>Sakura Mobile</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best value</p>
                <p className={styles.verdictStatValue}>eSIM Go from $3.50</p>
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

        {/* Is eSIM Easy section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The basics</span>
          <h2 className={styles.sectionTitle}>Is an eSIM Easy to Set Up?</h2>
          <p className={styles.bodyText}>
            Yes — and it&apos;s easier than changing a physical SIM card. An eSIM is a digital SIM built into your phone. To activate one, you scan a QR code in your phone&apos;s settings. No tiny tray, no ejector tool, no handling a small card that&apos;s easy to drop or lose.
          </p>
          <p className={styles.bodyText}>
            The entire process takes under 5 minutes and can be done at home before you fly. When you land in Japan, you switch to the eSIM in Settings and you have a live 4G connection — no airport queues, no vending machines.
          </p>
          <p className={styles.bodyText}>
            The one requirement: your phone must support eSIM. Most smartphones bought in 2019 or later do. See the compatibility table below to check yours.
          </p>
        </section>

        {/* Best eSIMs section */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for Japan for Seniors</h2>
          <div className={styles.picksList}>
            {topPicks.map((pick) => (
              <div key={pick.name} className={styles.pickCard}>
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
                  <div className={styles.pickCtaRow}>
                    <a href={pick.href} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
                      {pick.cta}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-Step Setup */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Set Up Your Japan eSIM</h2>
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

        {/* What If I Need Help */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Getting help</span>
          <h2 className={styles.sectionTitle}>What If I Need Help in Japan?</h2>
          <p className={styles.bodyText}>
            If you have trouble connecting after arrival, don&apos;t worry — there are several ways to get assistance without needing to find a phone shop.
          </p>
          <div className={styles.whoForGrid}>
            {helpOptions.map((opt) => (
              <div key={opt.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{opt.icon}</div>
                <p className={styles.whoForTitle}>{opt.title}</p>
                <p className={styles.whoForDesc}>{opt.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Phone Compatibility Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Does My Phone Support eSIM?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Phone</th>
                    <th>eSIM Supported</th>
                  </tr>
                </thead>
                <tbody>
                  {compatibility.map((row) => (
                    <tr key={row.device}>
                      <td className={styles.tdProvider}>{row.device}</td>
                      <td style={{ fontSize: "0.85rem", color: row.esim === "✓" ? "#15803d" : row.esim === "✗" ? "#b91c1c" : "#92400e", fontWeight: 700 }}>
                        {row.esim}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            To confirm eSIM support on your phone: go to <strong>Settings → General → About</strong> (iPhone) or <strong>Settings → About Phone</strong> (Android). If you see an EID number, your phone supports eSIM.
          </p>
        </section>

        {/* Alternatives section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Alternatives</span>
          <h2 className={styles.sectionTitle}>What If My Phone Doesn&apos;t Support eSIM?</h2>
          <p className={styles.bodyText}>
            If your phone doesn&apos;t support eSIM, a physical SIM card is the straightforward alternative. Sakura Mobile ships physical SIM cards internationally — you can order before you fly and it arrives at your home address.
          </p>
          <p className={styles.bodyText}>
            Japan&apos;s major airports (Narita, Haneda, Kansai) also have SIM card vending machines in the arrivals hall. The machines have English-language interfaces and accept major credit cards. Prices are slightly higher than pre-ordering online, but they work immediately after purchase.
          </p>
          <p className={styles.bodyText}>
            Some hotels also sell or loan SIM cards — worth checking with your accommodation before you fly.
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
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
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
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
              See how Airalo, Sakura Mobile, and eSIM Go compare on price, coverage, and features in our full comparison guide.
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
