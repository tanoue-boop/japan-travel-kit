import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const wifiSpots = [
  { location: "7-Eleven",               provider: "7SPOT",                   registration: "Required (email)" },
  { location: "Starbucks",              provider: "at_STARBUCKS_Wi2",         registration: "Required"         },
  { location: "McDonald's",             provider: "Wi2",                      registration: "Required"         },
  { location: "JR Train Stations",      provider: "Shinkansen Free Wi-Fi",    registration: "Required"         },
  { location: "Narita / Haneda Airport", provider: "Airport Free Wi-Fi",      registration: "Required"         },
  { location: "Tokyo Metro",            provider: "Metro Wi-Fi",              registration: "Required"         },
];

const simOptions = [
  {
    rank: "1",
    name: "eSIM Go",
    tag: "Best Budget",
    price: "From $3.50 / 7 days",
    highlight: "The cheapest Japan eSIM we tested. Runs on Docomo network. No registration hassle — buy, install, and go.",
    href: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN",
    reviewHref: "/guides/esim/esim-go-japan-review",
  },
  {
    rank: "2",
    name: "Airalo Japan",
    tag: "Best Overall",
    price: "From $4.50 / 7 days",
    highlight: "World's largest eSIM marketplace. Easy app, instant setup, reliable Docomo/SoftBank coverage nationwide.",
    href: "https://airalo.pxf.io/c/7213504/1268485/15608",
    reviewHref: "/guides/esim/airalo-japan-review",
  },
  {
    rank: "3",
    name: "Holafly Japan",
    tag: "Best Unlimited",
    price: "From $19 / 5 days",
    highlight: "Unlimited data, no daily caps. Best for heavy users, streamers, and remote workers in Japan.",
    href: "#",
    reviewHref: "/guides/esim/holafly-japan-review",
  },
];

const relyOnWifiPros = [
  "Works if you're staying in central Tokyo for a short trip",
  "Airport WiFi is reliable enough for arrival logistics",
  "Convenience store WiFi can cover quick map checks",
];

const relyOnWifiCons = [
  "Any travel outside major cities becomes very difficult",
  "Constant registration forms slow you down",
  "Speed is often too slow for video calls or streaming",
  "No connection between WiFi spots — blank zones on the go",
  "Rural areas, mountain routes, and day trips often have no coverage",
];

const faqItems = [
  {
    q: "Is there free WiFi in Japan?",
    a: "Yes, free WiFi exists across Japan — in convenience stores, cafes, stations, airports, and some shopping centres. However, almost all public WiFi requires registration (usually an email address or social login), and connection speeds and reliability vary widely. Most travellers find it more convenient to use a SIM card or eSIM for consistent connectivity.",
  },
  {
    q: "Does Japan have free WiFi on trains?",
    a: "Shinkansen bullet trains have free WiFi on board, but it's often slow and intermittent — especially during long tunnel sections. Urban subway networks like Tokyo Metro have station WiFi, but signal drops when the train is moving between stations. For reliable connectivity on the go, a SIM card or eSIM is more practical.",
  },
  {
    q: "Can I use Google Maps without a SIM in Japan?",
    a: "You can download Google Maps offline for specific areas before you travel — this covers basic walking navigation without mobile data. However, real-time transit directions (bus times, subway delays, Shinkansen schedules) require an active internet connection. You'll also need data for translation apps, ride-hailing, and booking on the go.",
  },
  {
    q: "Is Japan WiFi fast enough for streaming?",
    a: "Public WiFi in Japan is generally not fast or reliable enough for streaming. Convenience store WiFi (7SPOT, FamilyMart) is slow and limited to 30–60 minutes per session. Hotel and Airbnb WiFi is usually better — but you won't have it while travelling. A 3–10 GB eSIM plan is the practical solution for travellers who need fast, reliable connectivity.",
  },
  {
    q: "Do convenience stores in Japan have free WiFi?",
    a: "Yes. 7-Eleven (7SPOT), FamilyMart, and Lawson all offer free WiFi. However, you must register with an email address each session, and usage is typically limited to 30–60 minutes at a time. You must be inside or near the store for the signal to work. It's useful in a pinch, but not a substitute for a SIM card.",
  },
];

export default function FreeWifiJapanPage() {
  return (
    <>
      <Head>
        <title>Free WiFi in Japan 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Free WiFi exists in Japan but it's patchy and requires registration. We explain where to find it, how reliable it is, and why most travellers use a SIM instead."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/free-wifi-japan" />
        <meta property="og:title" content="Free WiFi in Japan (2026): Where to Find It & Why You Still Need a SIM" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/free-wifi-japan" />
        <meta property="og:description" content="Free WiFi exists in Japan but it's patchy and requires registration. We explain where to find it, how reliable it is, and why most travellers use a SIM instead." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free WiFi in Japan (2026): Where to Find It & Why You Still Need a SIM" />
        <meta name="twitter:description" content="Free WiFi exists in Japan but it's patchy and requires registration. We explain where to find it, how reliable it is, and why most travellers use a SIM instead." />
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
              headline: "Free WiFi in Japan (2026): Where to Find It & Why You Still Need a SIM",
              dateModified: "2026-04-24",
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
          <span className={styles.breadCurrent}>Free WiFi in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📶</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Free WiFi in Japan (2026):<br />Where to Find It &amp; Why You Still Need a SIM
          </h1>
          <p className={styles.heroSubtitle}>
            Japan has free WiFi — but it&apos;s patchy, slow, and often requires registration. Here&apos;s what to expect and why most travellers use a SIM instead.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Honest Guide", "All Traveller Types"].map((t) => (
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
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Free WiFi exists?</p>
                <p className={styles.verdictStatValue}>Yes, but unreliable</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best free WiFi spots</p>
                <p className={styles.verdictStatValue}>7-Eleven, Starbucks, stations</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Most travellers need</p>
                <p className={styles.verdictStatValue}>A SIM or eSIM card</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best budget SIM</p>
                <p className={styles.verdictStatValue}>eSIM Go from $3.50</p>
              </div>
            </div>
            <a
              href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get eSIM Go from $3.50 →
            </a>
          </div>
        </div>

        {/* Where to Find Free WiFi */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>WiFi map</span>
          <h2 className={styles.sectionTitle}>Where to Find Free WiFi in Japan</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Location", "WiFi Provider", "Registration"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {wifiSpots.map((spot) => (
                    <tr key={spot.location}>
                      <td className={styles.tdProvider}>{spot.location}</td>
                      <td className={styles.tdNetwork}>{spot.provider}</td>
                      <td style={{ fontSize: "0.82rem", color: "#6b7280" }}>{spot.registration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Most free WiFi spots require registration with an email address each time. Sessions are often limited to 30–60 minutes.
          </p>
        </section>

        {/* Is Free WiFi in Japan Reliable? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Honest assessment</span>
          <h2 className={styles.sectionTitle}>Is Free WiFi in Japan Reliable?</h2>
          <p className={styles.bodyText}>
            The short answer: not really. Japan&apos;s reputation for technology can give visitors the wrong impression about free WiFi. The reality on the ground is mixed at best.
          </p>
          <p className={styles.bodyText}>
            <strong>Speed is inconsistent.</strong> Convenience store WiFi (7SPOT, FamilyMart Wi2) is often slow — fine for checking a map, but not for video calls or navigation in real time. Station WiFi is better, but only available at specific spots.
          </p>
          <p className={styles.bodyText}>
            <strong>Registration is required every time.</strong> Almost every free WiFi spot in Japan requires an email address, phone number, or social media login for each new session. This adds friction that makes it impractical as a primary connectivity solution.
          </p>
          <p className={styles.bodyText}>
            <strong>Rural and suburban areas are mostly uncovered.</strong> Free WiFi is concentrated in urban centres and tourist corridors. Once you leave central Tokyo, Osaka, or Kyoto, free WiFi effectively disappears — including on many local trains and buses.
          </p>
        </section>

        {/* Why Most Use SIM */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Why most travellers choose differently</span>
          <h2 className={styles.sectionTitle}>Why Most Travellers Use a SIM Instead</h2>
          <p className={styles.bodyText}>
            The main advantage of a SIM or eSIM is that it works everywhere, all the time — no registration forms, no session limits, no WiFi dead zones between spots.
          </p>
          <p className={styles.bodyText}>
            Practically, this matters for Google Maps navigation while walking, translation apps in restaurants and shops, real-time train schedules, and calling or messaging family on the go. These are the moments when free WiFi simply isn&apos;t available.
          </p>
          <p className={styles.bodyText}>
            A 5–10 GB Japan eSIM costs less than a single Starbucks order per day. For most travellers, the convenience far outweighs the cost.
          </p>
        </section>

        {/* Best SIM Options */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top picks</span>
          <h2 className={styles.sectionTitle}>Best SIM Options for Japan</h2>
          <div className={styles.picksList}>
            {simOptions.map((sim) => (
              <div key={sim.name} className={styles.pickCard}>
                <div className={styles.pickCardHeader}>
                  <div className={styles.pickRank}>
                    <span className={styles.pickNumber}>{sim.rank}</span>
                    <div className={styles.pickMeta}>
                      <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>{sim.tag}</span>
                      <span className={styles.pickName}>{sim.name}</span>
                    </div>
                  </div>
                  <span className={styles.tdPrice}>{sim.price}</span>
                </div>
                <div className={styles.pickCardBody}>
                  <p className={styles.pickSummary}>{sim.highlight}</p>
                  <div className={styles.pickCtaRow}>
                    <a
                      href={sim.href}
                      className={styles.pickCta}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      Get {sim.name} →
                    </a>
                    <Link href={sim.reviewHref} className={styles.pickCtaInternal}>
                      Read review →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Can You Get By on Free WiFi Alone? */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Reality check</span>
          <h2 className={styles.sectionTitle}>Can You Get By on Free WiFi Alone?</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>When it&apos;s just about possible</p>
              <ul className={styles.pickList}>
                {relyOnWifiPros.map((item) => (
                  <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>When it breaks down</p>
              <ul className={styles.pickList}>
                {relyOnWifiCons.map((item) => (
                  <li key={item}><span className={styles.conIcon}>✗</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            Technically possible for a very city-focused short trip — but the experience will be frustrating. The moment you leave a WiFi spot, you lose maps, translation, and real-time transport info. For most travellers visiting Japan, a SIM card is a practical necessity, not a luxury.
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
            <Link href="/guides/esim/cheapest-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cheapest eSIM for Japan 2026: Best Budget Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Pocket WiFi vs eSIM for Japan (2026): Which Is Better?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Skip the registration forms</h2>
            <p className={styles.ctaBannerDesc}>
              Get a Japan eSIM before you fly — have 4G everywhere from the moment you land.
              Starts from $3.50 for 7 days.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              Compare Japan eSIM Options →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
