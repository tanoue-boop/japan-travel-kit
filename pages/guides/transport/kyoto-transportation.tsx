import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const transportOptions = [
  { mode: "City Bus",   bestFor: "Temples, Gion, Fushimi Inari",    fare: "¥230 / ride",       icCard: "✓" },
  { mode: "Subway",     bestFor: "Fast north–south & east–west",     fare: "From ¥210",         icCard: "✓" },
  { mode: "JR Local",   bestFor: "Arashiyama, Nijo, Uji",           fare: "From ¥200",         icCard: "✓" },
  { mode: "Bicycle",    bestFor: "Temple districts, riverside",      fare: "¥1,000–2,000 / day", icCard: "—" },
  { mode: "Taxi",       bestFor: "Groups, luggage, late night",      fare: "¥680 flag fall",    icCard: "✓" },
];

const dayPasses = [
  { pass: "City Bus 1-Day Pass",        price: "¥700",   coverage: "All Kyoto City Bus routes",       bestFor: "Temple-heavy days in west / north" },
  { pass: "Subway 1-Day Pass",          price: "¥800",   coverage: "Both subway lines",               bestFor: "East–west sightseeing via Tozai Line" },
  { pass: "Bus + Subway 1-Day Pass",    price: "¥1,100", coverage: "All city buses + both subways",   bestFor: "Full-day itineraries mixing all areas" },
  { pass: "Subway 2-Day Pass",          price: "¥1,400", coverage: "Both subway lines for 2 days",    bestFor: "Focused subway-based multi-day trips" },
];

const busTips = [
  {
    title: "Pay when you exit — not when you board",
    desc: "On most Kyoto city buses, you board at the rear door and pay the flat ¥230 fare when you exit at the front. Tap your IC card on the reader near the driver, or drop exact coins in the fare box. Have change ready if paying cash.",
  },
  {
    title: "Routes 100 and 101 cover the main sights",
    desc: "The 100 Bus (Higashiyama Route) links Kyoto Station to Gion, Kiyomizudera, Heian Shrine, and the Silver Pavilion. The 101 goes from Kyoto Station to the Gold Pavilion via Nijo Castle. Both run frequently on weekdays and weekends.",
  },
  {
    title: "Buses can be very crowded in peak season",
    desc: "During cherry blossom (late March–early April) and autumn leaves (mid-November), city buses are often standing-room only. Walk between nearby attractions or take the subway when buses are jammed.",
  },
];

const subwayLines = [
  {
    title: "Karasuma Line (north–south)",
    desc: "Runs from Kokusai Kaikan in the north through Kyoto Station to Takeda in the south. Key stops: Kyoto Station, Shijo (Gion area), Marutamachi, Kitaoji (Golden Pavilion bus stop). Blue line.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4" /><path d="M17 21l-2-4" />
        <line x1="7" y1="21" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    title: "Tozai Line (east–west)",
    desc: "Runs from Rokujizo in the southeast to Uzumasa Tenjingawa in the west. Key stops: Sanjo Keihan (east Gion), Higashiyama (Nanzenji), Nijo Castle. Red line.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4" /><path d="M17 21l-2-4" />
        <line x1="7" y1="21" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    title: "Transfer at Karasuma Oike",
    desc: "The two lines intersect at Karasuma Oike — Kyoto's main transfer hub. From here you can reach anywhere on the subway network, and connecting bus routes extend coverage to areas without a direct subway stop.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
];

const kyotoAccess = [
  {
    title: "From Tokyo: Shinkansen (2 hr 15 min)",
    desc: "The Nozomi (fastest, not JR Pass valid) takes about 2 hours 15 minutes from Tokyo Station. The Hikari (JR Pass valid) takes roughly 2 hours 40 minutes. Trains depart every 10 minutes during peak hours. IC cards do not cover Shinkansen fares — use a separate ticket or JR Pass.",
  },
  {
    title: "From Osaka (Shin-Osaka): Shinkansen (15 min)",
    desc: "The shortest Shinkansen hop in Japan. Alternatively, the Hankyu Kyoto Line from Umeda takes 45 minutes at ¥400 — not JR Pass valid but excellent value for budget travellers heading directly between Osaka and Kyoto.",
  },
  {
    title: "From Kansai Airport (KIX): Haruka Express (75 min)",
    desc: "The JR Haruka runs directly from KIX to Kyoto Station in 75 minutes, stopping at Shin-Osaka. From ¥3,640 non-reserved. Foreign visitors can buy a discounted IC CP ticket. JR Pass holders ride free — validate your pass at the airport JR counter before boarding.",
  },
];

const tips = [
  {
    title: "Load your IC card before you arrive",
    desc: "Suica or Pasmo via Apple Pay or Google Pay means no queueing at Kyoto Station machines. Queues during cherry blossom and autumn season can be 30+ minutes.",
  },
  {
    title: "Walk between nearby sights — Kyoto rewards it",
    desc: "The Higashiyama area stretches from Kiyomizudera to Nanzenji and is walkable end-to-end in under an hour. Side streets and quiet shrines that buses skip are the best part.",
  },
  {
    title: "Avoid taxis in narrow tourist areas",
    desc: "Central Kyoto streets are tight. Taxis can be stuck 20+ minutes in Gion or Nishiki Market on routes that take 5 minutes on foot. Walk or take the bus in these areas.",
  },
  {
    title: "Google Maps is reliable for Kyoto buses",
    desc: "Google Maps shows real-time delay information for most Kyoto city bus services and includes English directions for every stop. Bus stop QR codes also link to live arrival boards.",
  },
];

const faqItems = [
  {
    q: "Do I need a day pass for Kyoto city buses?",
    a: "It depends on how many rides you take. At ¥230 per ride, you need at least 4 rides for the ¥700 bus day pass to break even. On a full sightseeing day with 5–6 bus rides (Kyoto Station → Kinkakuji → Kiyomizudera → Gion → back), the pass saves money. On a lighter day, an IC card paying per ride is simpler.",
  },
  {
    q: "Can I use my Suica IC card in Kyoto?",
    a: "Yes. Suica, Pasmo, and all other IC cards work on Kyoto City Bus, both subway lines, and JR local trains (Sagano Line to Arashiyama, Nara Line to Uji). IC cards do not cover Shinkansen fares — those need a separate ticket or JR Pass.",
  },
  {
    q: "What is the best way to get from Kyoto Station to Kinkakuji?",
    a: "Take Kyoto City Bus route 101 or 205 from Kyoto Station (Karasuma Central Gate) to Kinkakujicho (金閣寺道). The ride takes about 40 minutes and costs ¥230. Alternatively, take the Karasuma Line subway to Kitaoji station then a 12-minute walk or short taxi — faster when buses are delayed.",
  },
  {
    q: "How do I get to Arashiyama from central Kyoto?",
    a: "Three options: (1) JR Sagano Line from Kyoto Station to Saga-Arashiyama — 15 minutes, ¥240, IC card valid. This is the fastest and most convenient. (2) Keifuku Randen tram from Shijo-Omiya — 20 minutes, ¥220, cash or contactless only (IC card not accepted). (3) City Bus routes 28 or 11 from Kyoto Station — around 50 minutes, ¥230, IC card valid. Choose JR for speed.",
  },
  {
    q: "Is the Kyoto subway English-friendly?",
    a: "Yes. All subway station signs and train announcements are bilingual. Ticket machines at every station have English options and accept IC cards, cash, and credit cards at major stations. Platform maps and exit guides are also in English.",
  },
];

export default function KyotoTransportationPage() {
  return (
    <>
      <Head>
        <title>Getting Around Kyoto 2026: Bus, Train &amp; Taxi Guide | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to get around Kyoto by bus, subway, JR train, and taxi. IC card tips, day pass breakdown, and access from Tokyo and Kansai Airport — all covered."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/transport/kyoto-transportation" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Getting Around Kyoto 2026: Bus, Train &amp; Taxi Guide | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/transport/kyoto-transportation" />
        <meta property="og:description" content="How to get around Kyoto by bus, subway, JR train, and taxi. IC card tips, day pass breakdown, and access from Tokyo and Kansai Airport — all covered." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Getting Around Kyoto 2026: Bus, Train &amp; Taxi Guide | Japan Travel Kit" />
        <meta name="twitter:description" content="How to get around Kyoto by bus, subway, JR train, and taxi. IC card tips, day pass breakdown, and access from Tokyo and Kansai Airport — all covered." />
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
              headline: "Getting Around Kyoto (2026): Buses, Trains & Taxis Explained",
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
                { "@type": "ListItem", position: 1, name: "Home",                        item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",                      item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport & Getting Around",  item: "https://japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Getting Around Kyoto",        item: "https://japan-travel-kit.com/guides/transport/kyoto-transportation" },
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
          <span className={styles.breadCurrent}>Getting Around Kyoto</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚌</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Getting Around Kyoto (2026):<br />Buses, Trains &amp; Taxis Explained
          </h1>
          <p className={styles.heroSubtitle}>
            Kyoto&apos;s city bus and subway cover nearly every major sight. Here&apos;s how to get around efficiently — without wasting time or money.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "All Transport Options", "IC Card Tips"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Best for most visitors</p>
                <p className={styles.verdictStatValue}>City Bus + IC Card</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bus day pass</p>
                <p className={styles.verdictStatValue}>¥700 (adults)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>IC card works on</p>
                <p className={styles.verdictStatValue}>Buses, subway, JR local trains</p>
              </div>
            </div>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Suica IC Card on Klook →
            </a>
          </div>
        </div>

        {/* Transport options comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Kyoto Transport Options at a Glance</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Mode", "Best For", "Fare", "IC Card"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transportOptions.map((row) => (
                    <tr key={row.mode}>
                      <td className={styles.tdProvider}>{row.mode}</td>
                      <td className={styles.tdBestFor}>{row.bestFor}</td>
                      <td className={styles.tdPrice}>{row.fare}</td>
                      <td style={{ fontSize: "0.85rem", color: "#374151" }}>{row.icCard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* City Bus section */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Main option</span>
          <h2 className={styles.sectionTitle}>City Bus</h2>
          <p className={styles.bodyText}>
            The Kyoto City Bus is the primary way to reach most major tourist attractions — Kinkakuji, Kiyomizudera, Fushimi Inari, Gion, and Arashiyama are all reachable by bus. The flat fare of <strong>¥230</strong> applies to most routes within the city. Pay when you exit by tapping your IC card or inserting exact coins near the driver.
          </p>
          <div className={styles.stepsList}>
            {busTips.map((tip, i) => (
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

        {/* Subway section */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Fast option</span>
          <h2 className={styles.sectionTitle}>Kyoto Subway</h2>
          <p className={styles.bodyText}>
            Kyoto&apos;s municipal subway has just two lines, but they cover the most important cross-city routes. Fares start at ¥210 and the system is fully IC card compatible. When buses are stuck in tourist traffic, the subway is almost always faster.
          </p>
          <div className={styles.whoForGrid}>
            {subwayLines.map((line) => (
              <div key={line.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{line.icon}</div>
                <p className={styles.whoForTitle}>{line.title}</p>
                <p className={styles.whoForDesc}>{line.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* IC Card section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Essential tool</span>
          <h2 className={styles.sectionTitle}>IC Card: Your Most Important Travel Item in Kyoto</h2>
          <p className={styles.bodyText}>
            An IC card (Suica or Pasmo) is the single most useful thing you can carry in Kyoto. It works on all city buses, both subway lines, JR local trains (Arashiyama Sagano Line, Uji Nara Line), and most taxis. Tap to board, tap to exit — no tickets, no change, no queueing.
          </p>
          <p className={styles.bodyText}>
            You can load an IC card onto your phone via Apple Pay (iPhone XR and later) or Google Pay (most NFC Android phones), or pick up a physical Suica card at any JR station machine in Japan.
          </p>
          <p className={styles.bodyText}>
            Load your IC card before arriving in Kyoto to avoid queues at Kyoto Station machines — during cherry blossom and autumn leaf season, waits at vending machines can exceed 30 minutes.
          </p>
          <a
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Get Suica IC Card on Klook →
          </a>
        </section>

        {/* Day Pass table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day passes</span>
          <h2 className={styles.sectionTitle}>Kyoto Day Pass Options</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price", "Coverage", "Best For"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayPasses.map((p) => (
                    <tr key={p.pass}>
                      <td className={styles.tdProvider}>{p.pass}</td>
                      <td className={styles.tdPrice}>{p.price}</td>
                      <td className={styles.tdNetwork}>{p.coverage}</td>
                      <td className={styles.tdBestFor}>{p.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Day passes are sold at Kyoto Station Bus Information Center, subway ticket machines, and major hotels. They are not loaded to an IC card — you receive a separate paper ticket.
          </p>
        </section>

        {/* Getting to/from Kyoto */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Getting here</span>
          <h2 className={styles.sectionTitle}>Getting To and From Kyoto</h2>
          <div className={styles.stepsList}>
            {kyotoAccess.map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1265372&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F18400-jr-haruka-airport-express-train-tickets-osaka%2F"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Book Haruka Airport Express on Klook →
            </a>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
              className={styles.pickCtaInternal}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Book JR Pass on Klook →
            </a>
          </div>
        </section>

        {/* Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>Tips for Getting Around Kyoto</h2>
          <div className={styles.whoForGrid}>
            {tips.map((tip) => (
              <div key={tip.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
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
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="22" height="13" rx="2" />
                  <circle cx="12" cy="12.5" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4" /><path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Don&apos;t forget your eSIM</h2>
            <p className={styles.ctaBannerDesc}>
              Google Maps and real-time bus trackers need mobile data. A Japan eSIM means you&apos;re connected before you leave the airport — no SIM swap, no roaming fees.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              Find the Best eSIM for Japan →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
