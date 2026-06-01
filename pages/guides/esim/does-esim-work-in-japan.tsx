import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const networkRows = [
  { provider: "Airalo",        network: "Docomo & SoftBank", coverage: "Excellent" },
  { provider: "eSIM Go",       network: "Docomo",            coverage: "Excellent" },
  { provider: "Holafly",       network: "SoftBank",          coverage: "Very good" },
  { provider: "Sakura Mobile", network: "Docomo",            coverage: "Excellent" },
];

const preflightChecks = [
  "Phone is eSIM-compatible (see list below)",
  "Phone is carrier-unlocked",
  "iOS or Android is up to date",
  "eSIM purchased and QR code saved as a screenshot",
  "Plan activation timing confirmed (some activate on first use, others on a fixed date)",
];

const whereItWorks = [
  {
    title: "Major cities",
    desc: "Tokyo, Osaka, Kyoto, Yokohama, Nagoya, Sapporo, Fukuoka — full 4G/5G across the entire city footprint, including subways and underground malls.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /><line x1="9" y1="9" x2="9" y2="9" /><line x1="9" y1="13" x2="9" y2="13" /><line x1="9" y1="17" x2="9" y2="17" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Regional cities",
    desc: "Hiroshima, Sendai, Kanazawa, Kumamoto, Nagasaki — reliable coverage throughout each city and on the JR lines connecting them.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" /><path d="M5 21V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v13" /><line x1="9" y1="9" x2="9" y2="13" /><line x1="15" y1="9" x2="15" y2="13" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Rural & mountain areas",
    desc: "Coverage is strong on popular tourist routes (Hakone, Nikko, Takayama), but pockets of weak signal exist deep in the mountains. Docomo-based providers handle this best.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 18 9 12 14 17 21 10" /><polyline points="14 10 21 10 21 17" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Shinkansen (bullet train)",
    desc: "Yes — works comfortably for browsing and messaging. Brief drops happen in long tunnels but signal returns within seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="16" height="10" rx="2" /><line x1="8" y1="20" x2="8" y2="18" /><line x1="16" y1="20" x2="16" y2="18" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Mt. Fuji climbing routes",
    desc: "Lower stations and most of the trail have working signal. Coverage near the summit is patchy and weather-dependent. Don't rely on data above the 8th station.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20l5-8 4 5 3-4 6 7H3z" /><circle cx="17" cy="6" r="2" />
      </svg>
    ),
    works: true,
  },
];

const faqItems = [
  {
    q: "Does eSIM work in rural Japan?",
    a: "Generally, yes. eSIM providers in Japan run on Docomo or SoftBank — both have strong nationwide coverage, including most rural and tourist areas. Docomo has the broadest reach, especially in mountainous regions. Very remote villages or deep mountains may have weak signal regardless of carrier.",
  },
  {
    q: "Does eSIM work on the Shinkansen?",
    a: "Yes. eSIMs work reliably on the Shinkansen because Docomo and SoftBank have tower coverage along the entire high-speed rail network. You may briefly lose signal inside long tunnels (especially on the Tokaido and Sanyo lines), but it reconnects automatically within seconds. Onboard WiFi is also available as a fallback.",
  },
  {
    q: "Which eSIM has the best coverage in Japan?",
    a: "Providers on Docomo (Airalo's Docomo plans, eSIM Go, Sakura Mobile) have the widest rural coverage. Providers on SoftBank (Holafly, Airalo's SoftBank plans) are excellent in cities and tourist areas but slightly weaker in remote mountains. For city-only trips, the difference isn't noticeable.",
  },
  {
    q: "Can I use eSIM at Japanese airports?",
    a: "Yes — and that's the whole point. If you activate your eSIM before flying, you'll have a live 4G/5G signal the moment you turn off airplane mode at Narita, Haneda, Kansai, New Chitose, Fukuoka, or any other Japanese airport. No need to queue at airport SIM vending machines.",
  },
  {
    q: "Does eSIM work in Kyoto and Osaka?",
    a: "Yes, excellently. Kyoto and Osaka have dense Docomo and SoftBank 4G/5G coverage including all temples, tourist districts, subway lines, and Universal Studios Japan. Any major eSIM provider will work reliably.",
  },
];

export default function DoesEsimWorkInJapanPage() {
  return (
    <>
      <Head>
        <title>Does eSIM Work in Japan? (2026): Complete Answer | Japan Travel Kit</title>
        <meta
          name="description"
          content="Yes, eSIM works excellently in Japan on Docomo and SoftBank networks. We explain coverage, compatible phones, and the best eSIM providers to use."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/does-esim-work-in-japan" />
        <meta property="og:title" content="Does eSIM Work in Japan? (2026): Complete Answer" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/does-esim-work-in-japan" />
        <meta property="og:description" content="Yes, eSIM works excellently in Japan on Docomo and SoftBank networks. We explain coverage, compatible phones, and the best eSIM providers to use." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Does eSIM Work in Japan? (2026): Complete Answer" />
        <meta name="twitter:description" content="Yes, eSIM works excellently in Japan on Docomo and SoftBank networks. We explain coverage, compatible phones, and the best eSIM providers to use." />
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
                { "@type": "ListItem", position: 4, name: "Does eSIM Work in Japan", item: "https://www.japan-travel-kit.com/guides/esim/does-esim-work-in-japan" },
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
              headline: "Does eSIM Work in Japan? (2026): Everything You Need to Know",
              dateModified: "2026-06-01",
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
          <span className={styles.breadCurrent}>Does eSIM Work in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📶</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Does eSIM Work in Japan? (2026):<br />Everything You Need to Know
          </h1>
          <p className={styles.heroSubtitle}>
            Yes — eSIMs work excellently in Japan. But there are a few things to check before you fly.
            Here&apos;s the complete answer.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Quick Answer", "All Phones"].map((t) => (
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

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Yes ✓</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Does eSIM work?</p>
                <p className={styles.verdictStatValue}>Yes — excellent compatibility</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Coverage</p>
                <p className={styles.verdictStatValue}>Excellent on Docomo &amp; SoftBank</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best providers</p>
                <p className={styles.verdictStatValue}>Airalo, eSIM Go, Holafly</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>One requirement</p>
                <p className={styles.verdictStatValue}>eSIM-compatible, unlocked phone</p>
              </div>
            </div>
            <a
              href="https://airalo.pxf.io/c/7213504/1268485/15608"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get a Japan eSIM →
            </a>
          </div>
        </div>

        {/* Yes, eSIM works */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>Yes, eSIM Works Great in Japan</h2>
          <p className={styles.bodyText}>
            Japan has one of the most advanced mobile networks in the world. 4G LTE coverage is
            effectively universal, 5G is rolling out fast across major cities, and the two carriers
            most eSIM providers use — Docomo and SoftBank — both rank in the top tier globally
            for reliability and speed.
          </p>
          <p className={styles.bodyText}>
            In practice, that means eSIMs work everywhere a tourist actually goes: city streets,
            train stations, restaurants, temples, the popular mountain hiking routes, and the
            Shinkansen between cities. Even rural regions like Tohoku and Shikoku have strong
            signal along all main roads and rail lines.
          </p>
          <p className={styles.bodyText}>
            The only requirement on your side is a phone that supports eSIM technology and is
            carrier-unlocked. If that&apos;s true, you can buy a Japan eSIM today, install it before
            you fly, and have a working data connection the moment you land.
          </p>
        </section>

        {/* Networks table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Networks</span>
          <h2 className={styles.sectionTitle}>Which Networks Do Japan eSIMs Use?</h2>
          <p className={styles.bodyText}>
            Every Japan eSIM runs on one of the two major Japanese carriers. Both networks are
            excellent — the difference matters most in remote rural areas, where Docomo has a
            slight edge.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Network</th>
                    <th>Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {networkRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td className={styles.tdNetwork}>{row.network}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.coverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Phone compatibility */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Does My Phone Support eSIM?</h2>
          <p className={styles.bodyText}>
            Almost every flagship phone made since 2018 supports eSIM. Here&apos;s a quick rule of
            thumb — if your device is on this list, you&apos;re good to go.
          </p>
          <div className={styles.pickGrid} style={{ marginTop: "1rem" }}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>iPhone (all supported)</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>iPhone XS, XS Max, XR (2018) and later</li>
                <li><span className={styles.proIcon}>+</span>iPhone 11, 12, 13, 14, 15, 16 series</li>
                <li><span className={styles.proIcon}>+</span>iPhone SE (2nd gen and later)</li>
                <li><span className={styles.proIcon}>+</span>U.S. iPhone 14 and later — eSIM-only</li>
              </ul>
            </div>
            <div className={styles.pickPros} style={{ background: "#eef5ff", borderColor: "#bcd4ff" }}>
              <p className={styles.pickListLabel}>Android (major models)</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>Google Pixel 3a and later (3a, 4–9)</li>
                <li><span className={styles.proIcon}>+</span>Samsung Galaxy S20 and later (S20–S25)</li>
                <li><span className={styles.proIcon}>+</span>Samsung Galaxy Z Flip / Fold (all models)</li>
                <li><span className={styles.proIcon}>+</span>Samsung Galaxy Note 20 series</li>
                <li><span className={styles.proIcon}>+</span>Most recent Oppo, OnePlus, Motorola flagships</li>
              </ul>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>One important caveat:</strong> some iPhones sold in Japan and certain Samsung
            models sold in Hong Kong don&apos;t support eSIM. If your phone was purchased in those
            markets, check the model number against Apple or Samsung&apos;s eSIM compatibility list
            before buying a plan.
          </p>
        </section>

        {/* Pre-flight checks */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Pre-flight checklist</span>
          <h2 className={styles.sectionTitle}>What You Need to Check Before Flying</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros} style={{ gridColumn: "1 / -1" }}>
              <p className={styles.pickListLabel}>Checklist</p>
              <ul className={styles.pickList}>
                {preflightChecks.map((c) => (
                  <li key={c}><span className={styles.proIcon}>✓</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The most common reason a Japan eSIM doesn&apos;t work is that the phone is carrier-locked
            — not a fault with the eSIM itself. If you&apos;re unsure, contact your home carrier and
            ask whether your handset is fully unlocked for international use.
          </p>
        </section>

        {/* Where does eSIM work */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Coverage map</span>
          <h2 className={styles.sectionTitle}>Where Does eSIM Work in Japan?</h2>
          <div className={styles.whoForGrid}>
            {whereItWorks.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Best eSIMs */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Recommended providers</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for Japan</h2>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0d1b4b", marginTop: "1rem", marginBottom: "0.5rem" }}>
            Airalo — Best Overall
          </h3>
          <p className={styles.bodyText}>
            The most popular Japan eSIM. Tiered plans from 1 GB to 10 GB, coverage on Docomo and
            SoftBank, and an app that makes setup effortless. Best for travellers who want a
            trusted brand at competitive prices.
          </p>
          <a
            href="https://airalo.pxf.io/c/7213504/1268485/15608"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            Get Airalo Japan eSIM →
          </a>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0d1b4b", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
            eSIM Go — Best Budget
          </h3>
          <p className={styles.bodyText}>
            The cheapest reliable Japan eSIM we&apos;ve tested. Runs on Docomo, with plans starting
            at around $3.50. Choose this if price is your priority and you only need a small data
            allowance.
          </p>
          <a
            href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            Get eSIM Go Japan eSIM →
          </a>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0d1b4b", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
            Holafly — Best Unlimited
          </h3>
          <p className={styles.bodyText}>
            The only major provider offering genuinely unlimited data for Japan. It costs more, but
            you&apos;ll never need to track your usage. Best for heavy streamers, content creators,
            and remote workers.
          </p>
          <a
            href="#"
            className={styles.pickCtaInternal}
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            Get Holafly Japan eSIM →
          </a>
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
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
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
            <Link href="/guides/esim/japan-esim-not-working" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan eSIM Not Working? Here&apos;s How to Fix It</p>
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
            <h2 className={styles.ctaBannerTitle}>Ready to pick a Japan eSIM?</h2>
            <p className={styles.ctaBannerDesc}>
              See how Airalo, Holafly, eSIM Go, and Sakura Mobile compare on price, coverage,
              and features — with our top picks for every type of trip.
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
