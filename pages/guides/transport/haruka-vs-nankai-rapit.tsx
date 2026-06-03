import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const HARUKA_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1265372&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F18400-jr-haruka-airport-express-train-tickets-osaka%2F";
const RAPIT_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1265374&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F599-kansai-airport-namba-train-ticket-osaka%2F";

const compareRows = [
  { feature: "Operator",          haruka: "JR West",                     rapit: "Nankai (private rail)" },
  { feature: "One-way fare",      haruka: "¥3,060 (¥3,640 to Kyoto)",    rapit: "¥1,880" },
  { feature: "Journey time",      haruka: "Tennoji 30 / Shin-Osaka 60",  rapit: "~40 min to Namba" },
  { feature: "Covered by JR Pass", haruka: "Yes — free",                 rapit: "No" },
  { feature: "Kansai Area Pass",  haruka: "Valid (2026 — confirm)",      rapit: "No" },
  { feature: "Direct to",         haruka: "Tennoji, Shin-Osaka, Kyoto",  rapit: "Namba" },
  { feature: "Discount option",   haruka: "ICOCA & HARUKA package",      rapit: "Yokoso! Osaka Ticket" },
];

const destinationRows = [
  { dest: "Namba (Dotonbori, Shinsaibashi)", pick: "Nankai Rapi:t", note: "~40 min direct — the fastest way to southern Osaka's main hub." },
  { dest: "Tennoji",        pick: "Haruka", note: "30 min direct on the JR Haruka." },
  { dest: "Shin-Osaka",     pick: "Haruka", note: "60 min direct — ideal if you're connecting to the Shinkansen." },
  { dest: "Kyoto",          pick: "Haruka", note: "75 min direct, no transfer (¥3,640, or free with JR Pass)." },
  { dest: "Umeda / Osaka Stn", pick: "Haruka", note: "Reach via Shin-Osaka or Tennoji; the Haruka is the JR-network choice." },
];

const harukaPoints = [
  {
    title: "Free with the JR Pass",
    desc: "The Haruka is a JR West Limited Express, so Japan Rail Pass holders ride free — just reserve a seat at the JR ticket office at Kansai Airport on arrival. Regional passes such as the Kansai Area Pass also cover it (a 2026 guide — confirm current coverage).",
  },
  {
    title: "Direct to Tennoji, Shin-Osaka and Kyoto",
    desc: "The Haruka runs directly to Tennoji (30 min), Shin-Osaka (60 min), and Kyoto (75 min) without a transfer. If you're heading to Kyoto or connecting to the Shinkansen at Shin-Osaka, it's by far the most convenient option from KIX.",
  },
  {
    title: "ICOCA & HARUKA discount for visitors",
    desc: "JR West offers a discounted ICOCA & HARUKA package for foreign passport holders, bundling a reduced-price Haruka ticket with a preloaded ICOCA IC card. Buy it at the JR ticket office at Kansai Airport with your passport.",
  },
];

const rapitPoints = [
  {
    title: "Fastest direct train to Namba",
    desc: "The Nankai Rapi:t covers the 50 km from Kansai Airport to Namba — the gateway to Dotonbori and Shinsaibashi — in around 40 minutes for ¥1,880. If your hotel is in southern Osaka, it's the quickest single-seat ride.",
  },
  {
    title: "Not covered by the JR Pass",
    desc: "The Rapi:t runs on the Nankai private railway, so the JR Pass doesn't apply. Nankai instead offers its own Yokoso! Osaka Ticket, which bundles a Rapi:t ride with one day of unlimited Osaka Metro travel — handy for a first-day sightseeing push.",
  },
  {
    title: "Two seat classes, same arrival time",
    desc: "The Rapi:t runs in Super Seat (reserved premium) and Regular (standard) classes. Both reach Namba at the same time — upgrading buys you a roomier seat, not a faster journey.",
  },
];

const faqItems = [
  {
    q: "Haruka or Nankai Rapi:t — which is better?",
    a: "It comes down to your destination. If you're heading to Namba (Dotonbori, Shinsaibashi) in southern Osaka, the Nankai Rapi:t is the fastest direct train at around 40 minutes. If you're going to Tennoji, Shin-Osaka, or onward to Kyoto, the JR Haruka is the better choice because it runs there directly — and it's free for JR Pass holders.",
  },
  {
    q: "Is the Rapi:t cheaper than the Haruka?",
    a: "Yes, for travellers without a rail pass. The Nankai Rapi:t to Namba is ¥1,880 one-way, while the Haruka is ¥3,060 to Tennoji or Shin-Osaka (and ¥3,640 to Kyoto). However, JR Pass holders ride the Haruka for free, which flips the value entirely if you already hold a pass.",
  },
  {
    q: "Can I use the JR Pass on the Haruka?",
    a: "Yes. The Haruka is operated by JR West and is fully covered by the Japan Rail Pass. Activate or validate your pass at the JR ticket office at Kansai Airport Station, then reserve a Haruka seat. The Nankai Rapi:t is not covered by the JR Pass, as it runs on a private railway.",
  },
  {
    q: "What's the fastest train from Kansai Airport to Namba?",
    a: "The Nankai Rapi:t, at around 40 minutes direct, is the fastest way to reach Namba. The Haruka does not serve Namba directly. If you're on a budget and not in a hurry, the Nankai local train also reaches Namba in about 70 minutes for around ¥1,500.",
  },
  {
    q: "Is there a direct train from Kansai Airport to Kyoto?",
    a: "Yes. The JR Haruka runs directly from Kansai Airport to Kyoto Station in about 75 minutes with no transfer. JR Pass holders travel free; others pay ¥3,640 for a reserved seat. The Nankai Rapi:t does not go to Kyoto, so the Haruka is the clear choice for that route.",
  },
];

export default function HarukaVsNankaiRapitPage() {
  return (
    <>
      <Head>
        <title>Haruka vs Nankai Rapi:t 2026: Best Train from Kansai Airport? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Haruka or Nankai Rapi:t from Kansai Airport (KIX) to Osaka? We compare fares, journey times, JR Pass coverage, and direct stops by destination for 2026."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/haruka-vs-nankai-rapit" />
        <meta property="og:title" content="Haruka vs Nankai Rapi:t 2026: Best Train from Kansai Airport to Osaka?" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/haruka-vs-nankai-rapit" />
        <meta property="og:description" content="Haruka or Nankai Rapi:t from Kansai Airport (KIX) to Osaka? We compare fares, journey times, JR Pass coverage, and direct stops by destination for 2026." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Haruka vs Nankai Rapi:t 2026: Best Train from Kansai Airport?" />
        <meta name="twitter:description" content="Haruka or Nankai Rapi:t from Kansai Airport (KIX) to Osaka? We compare fares, journey times, JR Pass coverage, and direct stops by destination for 2026." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home",      item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",    item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Haruka vs Nankai Rapi:t", item: "https://www.japan-travel-kit.com/guides/transport/haruka-vs-nankai-rapit" },
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
              headline: "Haruka vs Nankai Rapi:t (2026): Best Train from Kansai Airport to Osaka?",
              dateModified: "2026-06-03",
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Haruka vs Nankai Rapi:t</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚄</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Haruka vs Nankai Rapi:t (2026):<br />Best Train from Kansai Airport?
          </h1>
          <p className={styles.heroSubtitle}>
            One runs to Namba, the other to Tennoji, Shin-Osaka and Kyoto. Your hotel decides the winner.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "By Destination", "2026 Fares"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for Namba</p>
                <p className={styles.verdictStatValue}>Nankai Rapi:t (~40 min)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for Kyoto / Shin-Osaka</p>
                <p className={styles.verdictStatValue}>JR Haruka</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Free with JR Pass</p>
                <p className={styles.verdictStatValue}>Haruka only</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Rule of thumb:</strong> Staying near <strong>Namba</strong> (Dotonbori, Shinsaibashi)? Take the
              {" "}<strong>Nankai Rapi:t</strong> — it&apos;s the fastest direct train and cheaper too. Heading to
              {" "}<strong>Tennoji, Shin-Osaka, or Kyoto</strong>, or holding a JR Pass? Take the <strong>JR Haruka</strong>.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              For every KIX and Itami option — including buses and taxis — see our full{" "}
              <Link href="/guides/transport/osaka-airport-transfer" style={{ fontWeight: 600 }}>Osaka airport transfer guide</Link>.
              This article focuses on the Haruka-versus-Rapi:t decision.
            </p>
          </div>
        </div>

        {/* Head-to-head table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head-to-head</span>
          <h2 className={styles.sectionTitle}>Haruka vs Rapi:t at a Glance</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "JR Haruka", "Nankai Rapi:t"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td>{row.haruka}</td>
                      <td>{row.rapit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Fares are approximate 2026 one-way prices and can change. The Haruka is free for JR Pass holders; the Rapi:t requires a separate limited-express surcharge ticket. Pass coverage marked &ldquo;confirm&rdquo; is a 2026 guide — check current conditions before you travel.
          </p>
        </section>

        {/* By destination */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By destination</span>
          <h2 className={styles.sectionTitle}>Which Train for Your Hotel?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Destination", "Best train", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {destinationRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b", whiteSpace: "nowrap" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Haruka guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>JR Haruka</span>
          <h2 className={styles.sectionTitle}>When to Choose the Haruka</h2>
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
            href={HARUKA_URL}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book Haruka Express on Klook →
          </a>
        </section>

        {/* Rapi:t guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Nankai Rapi:t</span>
          <h2 className={styles.sectionTitle}>When to Choose the Rapi:t</h2>
          <div className={styles.stepsList}>
            {rapitPoints.map((point, i) => (
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
            href={RAPIT_URL}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book Nankai Rapi:t on Klook →
          </a>
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>The Verdict</h2>
          <p className={styles.verdictText}>
            The two trains barely compete — they serve different parts of Osaka. For <strong>Namba</strong> and southern
            Osaka, the <strong>Nankai Rapi:t</strong> is faster and cheaper, and pairs well with the Yokoso! Osaka Ticket
            if you&apos;ll be riding the Osaka Metro on day one.
          </p>
          <p className={styles.verdictText}>
            For <strong>Tennoji, Shin-Osaka, or Kyoto</strong> — or any traveller holding a JR Pass — the <strong>JR
            Haruka</strong> wins outright with direct, transfer-free service and free travel on the pass. Match the train
            to your destination and you can&apos;t go wrong.
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Compare Japan Transport Options →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book your Kansai Airport train</h2>
            <p className={styles.ctaBannerDesc}>
              Reserve the Haruka or Nankai Rapi:t online before you fly and head straight to the platform on arrival
              at KIX.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={HARUKA_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
                Book Haruka →
              </a>
              <a href={RAPIT_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
                Book Rapi:t →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
