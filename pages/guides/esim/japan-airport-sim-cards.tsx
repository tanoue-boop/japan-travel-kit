import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const airports = [
  { airport: "Narita (NRT)", available: "✓", location: "Arrivals hall, B1F" },
  { airport: "Haneda (HND)", available: "✓", location: "Arrivals hall" },
  { airport: "Kansai / Osaka (KIX)", available: "✓", location: "Arrivals hall" },
  { airport: "Chubu / Nagoya (NGO)", available: "✓", location: "Arrivals hall" },
  { airport: "Fukuoka (FUK)", available: "✓", location: "Arrivals hall" },
  { airport: "Sapporo / New Chitose (CTS)", available: "✓", location: "Arrivals hall" },
];

const comparisonRows = [
  { label: "Price", esim: "From $3.50", airport: "From $28" },
  { label: "Setup", esim: "Before you land", airport: "At airport" },
  { label: "Queue", esim: "None", airport: "Possible" },
  { label: "Connected on landing", esim: "Instant", airport: "After setup" },
  { label: "Best for", esim: "Prepared travellers", airport: "Last-minute" },
];

const airportPros = [
  "No advance planning needed",
  "Physical SIM works on any unlocked phone",
  "Staff can help with setup on the spot",
];

const airportCons = [
  "More expensive than online eSIMs",
  "Queues at peak arrival times",
  "Limited plan options vs online",
  "Counters may be closed late at night",
];

const esimPicks = [
  {
    rank: 1,
    name: "Airalo – Best Overall",
    desc: "The world's largest eSIM marketplace with Japan plans from $4.50 / 7 days. Runs on Docomo and SoftBank — Japan's two most reliable networks. Buy before you fly, scan a QR code, and you're connected the moment you land.",
    href: "https://airalo.pxf.io/c/7213504/1268485/15608",
    cta: "Get Airalo Japan eSIM →",
  },
  {
    rank: 2,
    name: "eSIM Go – Best Budget",
    desc: "The cheapest Japan eSIM we've tested, with plans starting from $3.50 on Docomo. Ideal for short stays where you need reliable data without spending much.",
    href: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN",
    cta: "Get eSIM Go Japan →",
  },
  {
    rank: 3,
    name: "Holafly – Best Unlimited",
    desc: "The only major provider offering truly unlimited data for Japan on SoftBank. Best if you navigate constantly, stream, or simply want zero data tracking.",
    href: "#",
    cta: "View Holafly Plans →",
  },
  {
    rank: 4,
    name: "Sakura Mobile – Best with Voice",
    desc: "The only tourist eSIM with real voice calls and English-speaking customer support. Also operates physical airport counters at Narita and Kansai for in-person setup.",
    href: "https://p.sakuramobile.jp/idevaffiliate.php?id=486",
    cta: "Get Sakura Mobile →",
  },
];

const lateNightSteps = [
  {
    title: "Use the airport's free Wi-Fi",
    desc: "Most major Japanese airports offer free Wi-Fi in the arrivals area. Use it to contact your accommodation and arrange onward transport.",
  },
  {
    title: "Find a convenience store",
    desc: "7-Eleven, FamilyMart, and Lawson locations near most airports offer free Wi-Fi without registration — useful for maps and messaging apps until morning.",
  },
  {
    title: "Visit a SIM counter in the morning",
    desc: "Most counters open at 7–8am. If you're staying overnight near the airport, wait until morning to pick up your SIM — or buy an eSIM right now from your phone.",
  },
];

const faqItems = [
  {
    q: "Can I buy a SIM card at Narita Airport?",
    a: "Yes. Narita Airport has SIM card counters in the arrivals hall on B1F. Multiple providers operate there including Sakura Mobile and others. Expect possible queues during peak arrival periods, and note that most counters close around 9–11pm.",
  },
  {
    q: "Are airport SIM cards expensive in Japan?",
    a: "Compared to pre-ordered eSIMs, yes. Airport SIM cards typically start from around $28–$35 for a 7-day plan. Airalo and eSIM Go offer comparable plans from $3.50–$4.50 — a significant saving, especially for longer trips.",
  },
  {
    q: "What if I arrive at night and the SIM counter is closed?",
    a: "Most SIM counters at Japanese airports close between 9–11pm. If you arrive late, connect to the airport's free WiFi to reach your accommodation. Major convenience stores (7-Eleven, FamilyMart) near most airports also offer free WiFi without registration. The best long-term solution is to buy an eSIM before departure — it activates instantly on landing regardless of arrival time.",
  },
  {
    q: "Can I use an eSIM at Japanese airports?",
    a: "Yes — if you purchased and installed an eSIM before your flight, it activates as soon as you land in Japan. No counter, no queue, no waiting. This is why pre-ordered eSIMs like Airalo or eSIM Go are so popular among frequent travellers.",
  },
  {
    q: "Which is better: airport SIM or pre-ordered eSIM?",
    a: "Pre-ordered eSIM wins on almost every metric: price, convenience, and speed. The only cases where an airport SIM makes sense are if your phone doesn't support eSIM (older devices), or if you forgot to prepare in advance and need a physical SIM immediately on arrival.",
  },
];

export default function JapanAirportSimCardsPage() {
  return (
    <>
      <Head>
        <title>Japan Airport SIM Cards 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Can you buy a SIM card at Japanese airports? Yes — but pre-ordered eSIMs are cheaper and faster. We compare airport SIMs vs eSIMs for every major Japan airport."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-airport-sim-cards" />
        <meta property="og:title" content="Japan Airport SIM Cards 2026 | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-airport-sim-cards" />
        <meta property="og:description" content="Can you buy a SIM card at Japanese airports? Yes — but pre-ordered eSIMs are cheaper and faster. We compare airport SIMs vs eSIMs for every major Japan airport." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Airport SIM Cards 2026 | Japan Travel Kit" />
        <meta name="twitter:description" content="Can you buy a SIM card at Japanese airports? Yes — but pre-ordered eSIMs are cheaper and faster. We compare airport SIMs vs eSIMs for every major Japan airport." />
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
              headline: "Japan Airport SIM Cards & eSIMs (2026): What to Know Before You Land",
              dateModified: "2026-04-25",
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
          <span className={styles.breadCurrent}>Japan Airport SIM Cards</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>✈️</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Japan Airport SIM Cards &amp; eSIMs (2026):<br />What to Know Before You Land
          </h1>
          <p className={styles.heroSubtitle}>
            Can you buy a SIM card at Japanese airports?
            Yes — but there&apos;s a cheaper, faster option most travellers miss.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "All Major Airports", "Honest Comparison"].map((t) => (
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
                <p className={styles.verdictStatLabel}>SIM at Airport</p>
                <p className={styles.verdictStatValue}>Yes — all major airports</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Airport SIM</p>
                <p className={styles.verdictStatValue}>Sakura Mobile</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Pre-flight eSIM</p>
                <p className={styles.verdictStatValue}>Airalo / eSIM Go</p>
              </div>
            </div>
            <a
              href="https://airalo.pxf.io/c/7213504/1268485/15608"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM — From $3.50 →
            </a>
          </div>
        </div>

        {/* Airport availability table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Availability</span>
          <h2 className={styles.sectionTitle}>Which Japanese Airports Sell SIM Cards?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Airport", "SIM Available", "Location"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {airports.map((row) => (
                    <tr key={row.airport}>
                      <td className={styles.tdProvider}>{row.airport}</td>
                      <td style={{ fontWeight: 700, color: "#22c55e" }}>{row.available}</td>
                      <td className={styles.tdNetwork}>{row.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Note: Counter hours vary by airport and provider. Most counters close between 9–11pm. Check the airport&apos;s official website before planning a late-night arrival.
          </p>
        </section>

        {/* Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>Airport SIM Cards: Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {airportPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {airportCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* eSIM vs Airport SIM comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>eSIM vs Airport SIM: Which Is Better?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th></th>
                    <th>eSIM (pre-flight)</th>
                    <th>Airport SIM</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <td className={styles.tdProvider} style={{ fontWeight: 600 }}>{row.label}</td>
                      <td className={styles.tdPrice}>{row.esim}</td>
                      <td className={styles.tdNetwork}>{row.airport}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            For most travellers, a pre-ordered eSIM is the clear winner. The price gap alone — from $3.50 vs $28+ — makes it hard to justify an airport SIM unless your phone doesn&apos;t support eSIM or you&apos;re genuinely in a last-minute situation.
          </p>
        </section>

        {/* Best eSIMs to buy */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Top picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs to Buy Before You Fly</h2>
          <div className={styles.stepsList}>
            {esimPicks.map((pick) => (
              <div key={pick.rank} className={styles.stepCard}>
                <span className={styles.stepNum}>{pick.rank}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{pick.name}</p>
                  <p className={styles.stepDesc}>{pick.desc}</p>
                  <a
                    href={pick.href}
                    className={styles.pickCta}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    style={{ marginTop: "0.75rem", display: "inline-block" }}
                  >
                    {pick.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What if you need airport SIM */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Emergency plan</span>
          <h2 className={styles.sectionTitle}>What If You Need a SIM at the Airport?</h2>
          <p className={styles.bodyText}>
            If you&apos;ve arrived without an eSIM and need connectivity immediately,{" "}
            <strong>Sakura Mobile</strong> is the best airport option. They operate counters at
            Narita (NRT) and Kansai (KIX) airports with English-speaking staff who can assist
            with setup on the spot. Their plans include data and optional voice calls — the only
            tourist SIM in Japan to offer this combination.
          </p>
          <p className={styles.bodyText}>
            <strong>Arriving late at night?</strong> Most SIM counters close between 9–11pm.
            If you arrive after hours, here&apos;s what to do:
          </p>
          <div className={styles.stepsList} style={{ marginTop: "0.5rem" }}>
            {lateNightSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://p.sakuramobile.jp/idevaffiliate.php?id=486"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Get Sakura Mobile →
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
            <h2 className={styles.ctaBannerTitle}>Skip the airport queue</h2>
            <p className={styles.ctaBannerDesc}>
              Buy your Japan eSIM now and be connected the moment you land —
              no counter, no queue, from $3.50.
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
