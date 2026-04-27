import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const naritaOptions = [
  { option: "Narita Express (N'EX)",  time: "~60 min",    price: "¥3,070", bestFor: "Speed & comfort"         },
  { option: "Keisei Skyliner",        time: "~41 min",    price: "¥2,570", bestFor: "Fastest to Ueno/Nippori" },
  { option: "Limousine Bus",          time: "90–120 min", price: "¥3,200", bestFor: "Heavy luggage"           },
  { option: "Keisei Local Train",     time: "~90 min",    price: "¥1,320", bestFor: "Budget"                  },
  { option: "Taxi",                   time: "60–90 min",  price: "¥20,000+", bestFor: "Groups / late night"   },
];

const hanedaOptions = [
  { option: "Keikyu Line",     time: "~37 min",  price: "¥310",    bestFor: "Budget & speed" },
  { option: "Tokyo Monorail",  time: "~20 min",  price: "¥500",    bestFor: "Reaching Hamamatsucho quickly" },
  { option: "Limousine Bus",   time: "30–60 min", price: "¥1,200", bestFor: "Heavy luggage / hotel transfers" },
  { option: "Taxi",            time: "30–60 min", price: "¥6,000+", bestFor: "Direct door-to-door" },
];

const nexGuidePoints = [
  {
    title: "Covered by the JR Pass",
    desc: "The N'EX is a JR service, so JR Pass holders travel free. If you have a 7-day or 14-day pass, this is the obvious first-day option from Narita. Reserve a seat at the airport's JR ticket counter (Midori no Madoguchi).",
  },
  {
    title: "Direct connections to major stations",
    desc: "The N'EX runs directly to Shinjuku (90 min), Shibuya (75 min), and Yokohama (90 min) without changing trains. For travellers staying in west Tokyo, this is hard to beat for convenience.",
  },
  {
    title: "Foreign visitor discount ticket available",
    desc: "JR East offers a discounted N'EX Tokyo round-trip ticket for foreign passport holders: ¥4,000 for a round trip (versus ¥6,140 for two singles). Buy at the Narita Airport JR ticket counter on arrival with your passport.",
  },
  {
    title: "Runs roughly every 30 minutes",
    desc: "Departures from Narita Terminal 1 and Terminal 2/3 run approximately every 30 minutes throughout the day. Check the schedule in advance if arriving on an early-morning or late-evening flight.",
  },
];

const skylinerPoints = [
  {
    title: "Fastest train between Narita and central Tokyo",
    desc: "The Keisei Skyliner covers the 66 km between Narita Airport and Nippori (east Tokyo) in just 41 minutes. From Nippori, it's a short JR or subway ride to most Tokyo neighbourhoods.",
  },
  {
    title: "Not covered by the JR Pass",
    desc: "The Skyliner runs on the Keisei private railway, not JR. JR Pass holders cannot use it. However, Keisei offers a combined Skyliner + Tokyo Subway 24/48/72-hour ticket — useful if you plan to explore Tokyo by metro.",
  },
  {
    title: "Best for travellers heading to east or north Tokyo",
    desc: "If your hotel is in Asakusa, Ueno, Akihabara, or anywhere served by the Tokyo Metro/Toei lines, the Skyliner + subway combination is often faster and cheaper than the N'EX.",
  },
];

const busPoints = [
  {
    title: "Ideal for heavy or oversized luggage",
    desc: "The Airport Limousine Bus loads luggage into the cargo hold — you don't have to wrestle bags through train carriages and up escalators. Particularly useful for families, those with ski gear, or travellers with large suitcases.",
  },
  {
    title: "Direct routes to major hotels",
    desc: "Many limousine bus services stop directly at major hotel areas: Shinjuku, Shibuya, Tokyo Station, Akasaka, Ikebukuro. Some routes stop at individual hotels. Check the TCAT (Tokyo City Air Terminal) schedule for routes.",
  },
  {
    title: "Subject to traffic delays",
    desc: "Tokyo traffic on the expressway can be severe during peak hours (7–9am, 5–8pm). Budget extra time if travelling during rush hour, or consider taking the train and sending heavy luggage via takkyubin (luggage delivery service) to your hotel.",
  },
];

const transferTips = [
  {
    title: "Set up your IC card before you land",
    desc: "An IC card (Suica or Pasmo) loaded via the Suica app lets you tap through train gates the moment you arrive. No queueing at ticket machines. If you don't have one, IC card machines at Narita and Haneda have English interfaces.",
  },
  {
    title: "Late-night arrivals have limited options",
    desc: "Trains from Narita stop running around 11pm–midnight. If your flight lands late, your options are the Airport Limousine bus (runs until around 11:30pm) or a taxi. Budget ¥20,000–¥25,000 for a Narita taxi; Haneda is closer and cheaper at ¥6,000–¥8,000.",
  },
  {
    title: "JR Pass users: validate the pass before boarding",
    desc: "If you arrive at Narita with a JR Pass exchange order, validate it at the JR East Travel Service Center in the arrivals hall before attempting to board the N'EX. The exchange order alone does not get you through the gate.",
  },
  {
    title: "Consider luggage forwarding (takkyubin)",
    desc: "Japan's takkyubin courier services (Yamato Transport is the most common) ship your luggage from the airport to your hotel for ¥1,500–¥3,000 per bag. It arrives the next day. This lets you travel light by train and frees you from dragging heavy cases through stations.",
  },
];

const faqItems = [
  {
    q: "What is the cheapest way from Narita to Tokyo?",
    a: "The cheapest train option is the Keisei Limited Express (not the Skyliner) at ¥1,320, which takes around 90 minutes to Ueno. If you hold a JR Pass, the Narita Express is free and the most comfortable option. For pure budget travel without a pass, the Keisei Limited Express is the best value.",
  },
  {
    q: "How long does it take from Haneda to central Tokyo?",
    a: "Haneda Airport (HND) is much closer to the city than Narita. The Keikyu Line reaches Shinagawa in about 13 minutes (¥310), and Shinjuku in about 37 minutes with a transfer. The Tokyo Monorail reaches Hamamatsucho in about 20 minutes (¥500). Taxis take 30–60 minutes depending on traffic and cost ¥6,000–¥9,000.",
  },
  {
    q: "Can I use my IC card from Narita Airport?",
    a: "Yes — IC cards (Suica and Pasmo) work on the Keisei local train and the N'EX from Narita. However, they do not cover the Keisei Skyliner surcharge (you pay separately for the Skyliner reserved seat). At Haneda, IC cards work on both the Keikyu Line and Tokyo Monorail. Load your IC card at any ticket machine in the airport arrivals hall.",
  },
  {
    q: "Is the Narita Express worth it?",
    a: "If you have a JR Pass, absolutely — it's free and the most comfortable option. Without a pass, the N'EX at ¥3,070 (one-way) is worth it for the direct connection to Shinjuku, Shibuya, and Yokohama without changing trains. The foreign visitor round-trip ticket (¥4,000) makes it particularly good value if you're flying home from Narita too.",
  },
  {
    q: "How do I get from Narita to Shinjuku?",
    a: "The fastest option is the Narita Express (N'EX), which runs directly to Shinjuku in about 90 minutes (¥3,070 without a pass; free with JR Pass). The next best option is the Keisei Skyliner to Nippori (41 min) followed by the JR Yamanote Line to Shinjuku (about 30 min more). Both are reliable choices; the N'EX wins on luggage convenience since you stay on the same train.",
  },
];

export default function TokyoAirportTransferPage() {
  return (
    <>
      <Head>
        <title>Tokyo Airport Transfer 2026: Narita &amp; Haneda | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to get from Narita or Haneda airport to central Tokyo. We compare trains, buses, and taxis on price, speed, and convenience — with 2026 fares."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/transport/tokyo-airport-transfer" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tokyo Airport Transfer 2026: Narita &amp; Haneda | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/transport/tokyo-airport-transfer" />
        <meta property="og:description" content="How to get from Narita or Haneda airport to central Tokyo. We compare trains, buses, and taxis on price, speed, and convenience — with 2026 fares." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tokyo Airport Transfer 2026: Narita &amp; Haneda | Japan Travel Kit" />
        <meta name="twitter:description" content="How to get from Narita or Haneda airport to central Tokyo. We compare trains, buses, and taxis on price, speed, and convenience — with 2026 fares." />
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
              headline: "Tokyo Airport Transfer Guide (2026): Narita & Haneda to the City",
              dateModified: "2026-04-27",
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
                { "@type": "ListItem", position: 1, name: "Home",                    item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",                  item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport & Getting Around", item: "https://japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Tokyo Airport Transfer",  item: "https://japan-travel-kit.com/guides/transport/tokyo-airport-transfer" },
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tokyo Airport Transfer</span>
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
            Tokyo Airport Transfer Guide (2026):<br />Narita &amp; Haneda to the City
          </h1>
          <p className={styles.heroSubtitle}>
            Getting from the airport to central Tokyo is easy — once you know which option suits your budget and schedule.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Narita & Haneda", "All Options"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest</p>
                <p className={styles.verdictStatValue}>Keisei Local (¥1,320)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fastest from Narita</p>
                <p className={styles.verdictStatValue}>Keisei Skyliner (41 min)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for Most Travellers</p>
                <p className={styles.verdictStatValue}>N&apos;EX or Skyliner</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Rule of thumb:</strong> Use the <strong>Narita Express (N&apos;EX)</strong> if you have a JR Pass or are heading to west Tokyo (Shinjuku, Shibuya, Yokohama).
              Use the <strong>Keisei Skyliner</strong> if you&apos;re heading to Ueno or east Tokyo. From <strong>Haneda</strong>, take the Keikyu Line — it&apos;s fast, cheap, and easy.
            </p>
          </div>
        </div>

        {/* Narita Options */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Narita Airport (NRT)</span>
          <h2 className={styles.sectionTitle}>Narita Airport Transfer Options</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Price", "Best For"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {naritaOptions.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Narita Airport (NRT) is approximately 60–70 km east of central Tokyo. Train journey times above are to Shinjuku or Ueno unless otherwise noted. Taxi prices are highly variable and include tolls.
          </p>
        </section>

        {/* Haneda Options */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Haneda Airport (HND)</span>
          <h2 className={styles.sectionTitle}>Haneda Airport Transfer Options</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Price", "Best For"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hanedaOptions.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Haneda Airport (HND) is only 15–20 km from central Tokyo — one of the closest major airports to any capital city in the world. Most travellers find Haneda significantly easier to navigate than Narita.
          </p>
        </section>

        {/* N'EX Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Narita Express</span>
          <h2 className={styles.sectionTitle}>Narita Express (N&apos;EX) Guide</h2>
          <div className={styles.stepsList}>
            {nexGuidePoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F173165-narita-express-n-ex-round-trip-train-ticket-narita-airport-tokyo%2F"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book N&apos;EX Tickets on Klook →
          </a>
        </section>

        {/* Skyliner Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Keisei Skyliner</span>
          <h2 className={styles.sectionTitle}>Keisei Skyliner Guide</h2>
          <div className={styles.stepsList}>
            {skylinerPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F1410-skyliner-tokyo%2F"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book Keisei Skyliner on Klook →
          </a>
        </section>

        {/* Limousine Bus */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Airport bus</span>
          <h2 className={styles.sectionTitle}>Airport Limousine Bus</h2>
          <div className={styles.stepsList}>
            {busPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F2274-narita-airport-limousine-bus-tokyo%2F"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Narita Limousine Bus on Klook →
            </a>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F150434-haneda-airport-limousine-bus-tokyo%2F"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Haneda Limousine Bus on Klook →
            </a>
          </div>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Tips</span>
          <h2 className={styles.sectionTitle}>Tips for Airport Transfers</h2>
          <div className={styles.stepsList}>
            {transferTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <line x1="9" y1="3" x2="9" y2="10" />
                  <line x1="15" y1="3" x2="15" y2="10" />
                  <circle cx="8.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <circle cx="15.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <path d="M7 21l2-4" />
                  <path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="8" width="20" height="10" rx="2" />
                  <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                  <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
                  <circle cx="17" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
