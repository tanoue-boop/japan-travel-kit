import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const kixOptions = [
  { option: "Haruka Limited Express", time: "50–75 min",  price: "¥3,060",  bestFor: "Speed & JR Pass users"   },
  { option: "Nankai Rapi:t",          time: "~40 min",    price: "¥1,880",  bestFor: "Balance of speed & cost" },
  { option: "Nankai Local Train",     time: "~70 min",    price: "¥1,500",  bestFor: "Budget travel"           },
  { option: "Limousine Bus",          time: "60–90 min",  price: "¥1,600",  bestFor: "Heavy luggage"           },
  { option: "Taxi",                   time: "60–80 min",  price: "¥15,000+", bestFor: "Groups / direct hotel"  },
];

const itmOptions = [
  { option: "Osaka Monorail + Subway", time: "~40 min",    price: "¥600",    bestFor: "Budget"                       },
  { option: "Limousine Bus",           time: "25–40 min",  price: "¥760",    bestFor: "Direct to hotels & city centre" },
  { option: "Taxi",                    time: "20–40 min",  price: "¥3,000+", bestFor: "Comfort / late night"          },
];

const harukaPoints = [
  {
    title: "Covered by the JR Pass",
    desc: "The Haruka is operated by JR West and is fully covered by the Japan Rail Pass, including 7-day and 14-day passes. JR Pass holders can board for free — just reserve a seat at the JR ticket office at Kansai Airport. This makes it the default choice for travellers who already have a pass.",
  },
  {
    title: "Direct connections to Osaka, Kyoto, and Shin-Osaka",
    desc: "The Haruka runs directly from Kansai Airport to Tennoji (30 min), Osaka (Namba area via Shin-Imamiya, 45 min), Shin-Osaka (60 min), and Kyoto (75 min) without a transfer. If you are continuing to Kyoto or boarding the Shinkansen at Shin-Osaka, this is by far the most convenient option.",
  },
  {
    title: "ICOCA & HARUKA discount for foreign visitors",
    desc: "JR West offers a discounted ICOCA & HARUKA package exclusively for foreign passport holders. It includes a one-way or round-trip Haruka ticket at a reduced price plus a preloaded ICOCA IC card. Buy it at the JR ticket office at Kansai Airport on arrival with your passport.",
  },
  {
    title: "Runs every 30 minutes throughout the day",
    desc: "The Haruka departs roughly every 30 minutes from Kansai Airport Station. Check the schedule if you arrive on an early-morning or late-evening flight — the first departure is around 6:30am and the last around 10:15pm.",
  },
];

const rapiTPoints = [
  {
    title: "Fastest connection to Namba",
    desc: "The Nankai Rapi:t covers the 50 km from Kansai Airport to Namba (south Osaka's main hub) in around 40 minutes — making it the fastest way to reach the Dotonbori and Shinsaibashi areas. Namba is one of Osaka's two major hubs alongside Umeda/Osaka Station.",
  },
  {
    title: "Not covered by the JR Pass",
    desc: "The Rapi:t runs on the Nankai private railway, not JR. JR Pass holders cannot use it. However, Nankai offers its own tourist discount pass (the Yokoso! Osaka Ticket) that includes a Rapi:t ticket and one day of Osaka Metro access — worth considering if you plan to explore by subway on your first day.",
  },
  {
    title: "Iconic design",
    desc: "The Rapi:t is one of the most recognisable trains in Japan — a futuristic steel design nicknamed 'Iron Man' or 'Robocop'. It runs in two classes: Super Seat (reserved, premium seats) and Regular (unreserved standard). Both classes arrive at the same time.",
  },
];

const tips = [
  {
    title: "KIX is on an artificial island — factor in extra time",
    desc: "Kansai International Airport is built on a reclaimed island 5 km off the Osaka coast. The connection bridge adds a few minutes to every journey and means there are no last-minute taxi options from the mainland if you miss a train. Arrive at the airport with plenty of time to spare.",
  },
  {
    title: "Set up your IC card before you land",
    desc: "An IC card (Suica or ICOCA) loaded in advance works on the Nankai local train and Osaka Metro from arrival. ICOCA is the local Kansai IC card and works on every train and bus in the region. JR Pass holders can pick up ICOCA separately at the airport JR ticket office.",
  },
  {
    title: "JR Pass users: always choose the Haruka",
    desc: "If you have a JR Pass and are heading to Osaka, Kyoto, or Shin-Osaka, the Haruka is free and faster than any alternative. Reserve a seat at the airport JR office on arrival — it takes 5 minutes and guarantees a spot on the next departure.",
  },
  {
    title: "ITM is much closer to the city than KIX",
    desc: "Itami Airport (ITM) handles domestic flights only and sits just 10 km north of Osaka city centre. The Limousine Bus runs directly to Osaka and Umeda (around 25 minutes) and is the most practical option — no train transfer needed. Monorail and subway works for budget travel.",
  },
];

const faqItems = [
  {
    q: "What is the cheapest way from KIX to Osaka city?",
    a: "The cheapest option is the Nankai Local Train (non-express service) from Kansai Airport to Namba at around ¥1,500. The journey takes approximately 70 minutes. If you have a JR Pass, the Haruka Limited Express is free and faster — making it effectively the best-value option for pass holders.",
  },
  {
    q: "Can I use the JR Pass from Kansai Airport?",
    a: "Yes. The Haruka Limited Express is operated by JR West and is fully covered by the Japan Rail Pass. Validate or activate your JR Pass at the JR ticket office at Kansai Airport Station on arrival, then reserve a Haruka seat. The pass covers travel to Tennoji, Shin-Osaka, and Kyoto.",
  },
  {
    q: "How long does it take from KIX to Osaka?",
    a: "Journey time depends on which part of Osaka you're heading to and which service you take. The Nankai Rapi:t reaches Namba in around 40 minutes (¥1,880). The JR Haruka reaches Tennoji in 30 minutes and Shin-Osaka in 60 minutes (¥3,060, or free with JR Pass). Allow 90–100 minutes by Limousine Bus during peak hours.",
  },
  {
    q: "What is the difference between KIX and ITM?",
    a: "Kansai International Airport (KIX) handles international flights and some domestic routes. It is located on an artificial island 50+ km from central Osaka. Itami Airport (ITM) handles domestic flights only and is located just 10 km north of Osaka city. For visitors arriving from abroad, KIX is almost certainly your arrival point.",
  },
  {
    q: "Is there a direct train from Kansai Airport to Kyoto?",
    a: "Yes. The JR Haruka Limited Express runs directly from Kansai Airport to Kyoto Station in approximately 75 minutes without any transfers. JR Pass holders travel free; others pay ¥3,640 for a reserved seat. This is the most convenient way to reach Kyoto from the airport in a single step.",
  },
];

export default function OsakaAirportTransferPage() {
  return (
    <>
      <Head>
        <title>Osaka Airport Transfer 2026: KIX &amp; ITM Guide | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to get from Kansai Airport (KIX) or Itami (ITM) to Osaka city. We compare trains, buses and taxis on price, speed and convenience — with 2026 fares."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/transport/osaka-airport-transfer" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Osaka Airport Transfer 2026: KIX &amp; ITM Guide | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/transport/osaka-airport-transfer" />
        <meta property="og:description" content="How to get from Kansai Airport (KIX) or Itami (ITM) to Osaka city. We compare trains, buses and taxis on price, speed and convenience — with 2026 fares." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Osaka Airport Transfer 2026: KIX &amp; ITM Guide" />
        <meta name="twitter:description" content="How to get from Kansai Airport (KIX) or Itami (ITM) to Osaka city. We compare trains, buses and taxis on price, speed and convenience — with 2026 fares." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Osaka Airport Transfer", item: "https://japan-travel-kit.com/guides/transport/osaka-airport-transfer" },
              ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Osaka Airport Transfer Guide (2026): KIX & ITM to the City",
              datePublished: "2026-04-28",
              dateModified: "2026-04-28",
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Osaka Airport Transfer</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚆</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Osaka Airport Transfer Guide (2026):<br />KIX &amp; ITM to the City
          </h1>
          <p className={styles.heroSubtitle}>
            Osaka has two airports — Kansai International and Itami. Here&apos;s the fastest and cheapest way to get into the city from each.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "KIX & ITM", "All Options"].map((t) => (
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
                <p className={styles.verdictStatLabel}>KIX cheapest</p>
                <p className={styles.verdictStatValue}>Nankai Local (~¥1,500)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>KIX fastest</p>
                <p className={styles.verdictStatValue}>Haruka Express (~50 min)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ITM cheapest</p>
                <p className={styles.verdictStatValue}>Monorail + subway (~¥600)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ITM fastest</p>
                <p className={styles.verdictStatValue}>Limousine Bus (~25–30 min)</p>
              </div>
            </div>
          </div>
        </div>

        {/* KIX Options */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Kansai International Airport (KIX)</span>
          <h2 className={styles.sectionTitle}>KIX Transfer Options</h2>
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
                  {kixOptions.map((row) => (
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
            Prices are approximate 2026 one-way fares. JR Pass holders travel free on the Haruka. The Nankai Rapi:t requires a separate surcharge ticket.
          </p>
        </section>

        {/* ITM Options */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Itami Airport (ITM)</span>
          <h2 className={styles.sectionTitle}>ITM Transfer Options</h2>
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
                  {itmOptions.map((row) => (
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
            Itami handles domestic flights only. Most international visitors arrive at KIX. If you have a connecting domestic flight into ITM, the Limousine Bus is the simplest way into the city.
          </p>
        </section>

        {/* Haruka Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Haruka Limited Express</span>
          <h2 className={styles.sectionTitle}>Haruka Limited Express Guide</h2>
          <div className={styles.stepsList}>
            {harukaPoints.map((point, i) => (
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
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book JR Pass (includes Haruka) on Klook →
          </a>
        </section>

        {/* Rapi:t Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Nankai Rapi:t</span>
          <h2 className={styles.sectionTitle}>Nankai Rapi:t Guide</h2>
          <div className={styles.stepsList}>
            {rapiTPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Tips</span>
          <h2 className={styles.sectionTitle}>Tips for Osaka Airport Transfers</h2>
          <div className={styles.stepsList}>
            {tips.map((tip, i) => (
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
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
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Travelling across Japan by rail?</h2>
            <p className={styles.ctaBannerDesc}>
              A JR Pass covers the Haruka from Kansai Airport and all Shinkansen services between Osaka, Kyoto, and Tokyo. Find out if it&apos;s worth it for your itinerary.
            </p>
            <Link href="/guides/transport/jr-pass-guide" className={styles.ctaBannerBtn}>
              Read the JR Pass Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
