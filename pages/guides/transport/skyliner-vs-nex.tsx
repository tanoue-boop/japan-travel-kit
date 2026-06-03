import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const SKYLINER_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264854&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F1410-skyliner-tokyo%2F";
const NEX_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264853&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F173165-narita-express-n-ex-round-trip-train-ticket-narita-airport-tokyo%2F";

const compareRows = [
  { feature: "Operator",        skyliner: "Keisei (private rail)",   nex: "JR East" },
  { feature: "One-way fare",    skyliner: "¥2,570",                  nex: "¥3,070" },
  { feature: "Fastest time",    skyliner: "41 min to Nippori",       nex: "~60 min to Tokyo Station" },
  { feature: "Covered by JR Pass", skyliner: "No",                   nex: "Yes — free" },
  { feature: "IC card on fare", skyliner: "No (separate surcharge)", nex: "Yes" },
  { feature: "Direct stops",    skyliner: "Nippori, Keisei Ueno",    nex: "Tokyo, Shinjuku, Shibuya, Yokohama" },
  { feature: "Frequency",       skyliner: "~every 30 min",           nex: "~every 30 min" },
  { feature: "Discount option", skyliner: "+ Tokyo Subway combo",    nex: "Foreign round-trip ¥4,000" },
];

const destinationRows = [
  { dest: "Nippori",              pick: "Skyliner", note: "41 min direct — the fastest train link to central Tokyo." },
  { dest: "Keisei Ueno",          pick: "Skyliner", note: "Skyliner terminus, a few minutes past Nippori (~44 min, 2026 estimate)." },
  { dest: "Asakusa / Akihabara",  pick: "Skyliner", note: "Take the Skyliner to Ueno/Nippori, then a short Metro or Toei hop." },
  { dest: "Tokyo Station",        pick: "N'EX",     note: "~60 min direct, no transfer." },
  { dest: "Shibuya",              pick: "N'EX",     note: "75 min direct on the same train." },
  { dest: "Shinjuku",             pick: "N'EX",     note: "90 min direct — no dragging bags through transfers." },
  { dest: "Yokohama",             pick: "N'EX",     note: "90 min direct, the obvious choice south of Tokyo." },
];

const skylinerPoints = [
  {
    title: "Fastest train from Narita to central Tokyo",
    desc: "The Keisei Skyliner covers the 66 km from Narita Airport to Nippori (east Tokyo) in just 41 minutes for ¥2,570. From Nippori it's a short JR or subway ride onward, and the line terminates one stop further at Keisei Ueno.",
  },
  {
    title: "Not covered by the JR Pass",
    desc: "The Skyliner runs on the Keisei private railway, not JR, so JR Pass holders cannot ride it for free. IC cards (Suica or Pasmo) also do not cover the Skyliner reserved-seat surcharge — that is paid separately.",
  },
  {
    title: "Best paired with the Tokyo Subway Ticket",
    desc: "Keisei sells a combined Skyliner + Tokyo Subway 24/48/72-hour ticket. If your hotel is in east or north Tokyo and you plan to explore by metro, this combination is often faster and cheaper than the N'EX.",
  },
];

const nexPoints = [
  {
    title: "Covered by the JR Pass",
    desc: "The N'EX is a JR East service, so JR Pass holders travel free. If you arrive on your first day with a 7-day or 14-day pass, this is the obvious option — just reserve a seat at the airport's JR ticket counter (Midori no Madoguchi).",
  },
  {
    title: "Direct to west and central Tokyo",
    desc: "The N'EX runs directly to Tokyo Station (~60 min), Shibuya (75 min), Shinjuku (90 min), and Yokohama (90 min) without changing trains. For travellers staying in west Tokyo, that single-seat ride is hard to beat with luggage.",
  },
  {
    title: "Foreign-visitor round-trip ticket",
    desc: "JR East offers a discounted N'EX round-trip ticket for foreign passport holders: ¥4,000 for a round trip, versus ¥6,140 for two one-way tickets. Buy it at the Narita Airport JR ticket counter on arrival with your passport.",
  },
];

const faqItems = [
  {
    q: "Skyliner or N'EX — which is faster?",
    a: "It depends where you're going. The Keisei Skyliner is the single fastest train from Narita to central Tokyo, reaching Nippori in 41 minutes. But it only runs to Nippori and Keisei Ueno, so if your destination is Shinjuku, Shibuya, or Yokohama, the Narita Express (N'EX) is usually quicker overall because it goes there directly without a transfer.",
  },
  {
    q: "Is the Skyliner cheaper than the N'EX?",
    a: "Yes. The Skyliner is ¥2,570 one-way, while the N'EX is ¥3,070 one-way. However, JR Pass holders ride the N'EX for free, which makes the N'EX effectively cheaper if you already hold a pass. Without a pass and heading to east Tokyo, the Skyliner is both faster and cheaper.",
  },
  {
    q: "Can I use the Skyliner with a JR Pass?",
    a: "No. The Skyliner runs on the Keisei private railway, which the Japan Rail Pass does not cover. JR Pass holders should take the N'EX, which is a JR East service and free with the pass. If you don't have a JR Pass, the Skyliner is a strong option for east Tokyo.",
  },
  {
    q: "Which train should I take to Shinjuku from Narita?",
    a: "The Narita Express (N'EX) runs directly to Shinjuku in about 90 minutes (¥3,070, or free with a JR Pass) with no transfer — the easiest option with luggage. Alternatively, the Skyliner to Nippori (41 min) followed by the JR Yamanote Line to Shinjuku also works and can be cheaper, but it involves a change of train.",
  },
  {
    q: "Do trains run late at night from Narita?",
    a: "Both the Skyliner and N'EX stop running around 11pm to midnight. If your flight lands late, your options are the Airport Limousine Bus (which runs slightly later) or a taxi — budget ¥20,000 or more for a Narita taxi into central Tokyo. Check the last-departure times in advance if you have an evening arrival.",
  },
];

export default function SkylinerVsNexPage() {
  return (
    <>
      <Head>
        <title>Skyliner vs N&apos;EX 2026: Best Train from Narita to Tokyo? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Skyliner or Narita Express (N'EX)? We compare price, speed, JR Pass coverage, and direct stops by destination to find the best train from Narita to Tokyo in 2026."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/skyliner-vs-nex" />
        <meta property="og:title" content="Skyliner vs N'EX 2026: Best Train from Narita to Tokyo?" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/skyliner-vs-nex" />
        <meta property="og:description" content="Skyliner or Narita Express (N'EX)? We compare price, speed, JR Pass coverage, and direct stops by destination to find the best train from Narita to Tokyo in 2026." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Skyliner vs N'EX 2026: Best Train from Narita to Tokyo?" />
        <meta name="twitter:description" content="Skyliner or Narita Express (N'EX)? We compare price, speed, JR Pass coverage, and direct stops by destination to find the best train from Narita to Tokyo in 2026." />
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
                { "@type": "ListItem", position: 4, name: "Skyliner vs N'EX", item: "https://www.japan-travel-kit.com/guides/transport/skyliner-vs-nex" },
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
              headline: "Skyliner vs N'EX (2026): Best Train from Narita to Tokyo?",
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
          <span className={styles.breadCurrent}>Skyliner vs N&apos;EX</span>
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
            Skyliner vs N&apos;EX (2026):<br />Best Train from Narita to Tokyo?
          </h1>
          <p className={styles.heroSubtitle}>
            Both are fast, comfortable airport trains — but the right one depends entirely on where you&apos;re staying.
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
                <p className={styles.verdictStatLabel}>Cheaper &amp; faster</p>
                <p className={styles.verdictStatValue}>Skyliner (¥2,570, 41 min)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Free with JR Pass</p>
                <p className={styles.verdictStatValue}>N&apos;EX (¥3,070)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Most direct stops</p>
                <p className={styles.verdictStatValue}>N&apos;EX</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Rule of thumb:</strong> Heading to <strong>east or north Tokyo</strong> (Ueno, Nippori, Asakusa)?
              Take the <strong>Skyliner</strong> — it&apos;s faster and cheaper. Heading to <strong>west or central Tokyo</strong>
              {" "}(Shinjuku, Shibuya, Tokyo Station, Yokohama), or holding a JR Pass? Take the <strong>N&apos;EX</strong> for a direct, transfer-free ride.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              For all Narita and Haneda options — including buses and taxis — see our full{" "}
              <Link href="/guides/transport/tokyo-airport-transfer" style={{ fontWeight: 600 }}>Tokyo airport transfer guide</Link>.
              This article focuses just on the Skyliner-versus-N&apos;EX decision.
            </p>
          </div>
        </div>

        {/* Head-to-head table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head-to-head</span>
          <h2 className={styles.sectionTitle}>Skyliner vs N&apos;EX at a Glance</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Keisei Skyliner", "Narita Express (N'EX)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td>{row.skyliner}</td>
                      <td>{row.nex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Fares are approximate 2026 one-way prices and can change. The Skyliner time is to Nippori (66 km); the N&apos;EX time is to Tokyo Station.
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Times marked as estimates are 2026 guides only and may vary by service. Always check the live schedule before you travel.
          </p>
        </section>

        {/* Skyliner guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Keisei Skyliner</span>
          <h2 className={styles.sectionTitle}>When to Choose the Skyliner</h2>
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
            href={SKYLINER_URL}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book Keisei Skyliner on Klook →
          </a>
        </section>

        {/* N'EX guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Narita Express</span>
          <h2 className={styles.sectionTitle}>When to Choose the N&apos;EX</h2>
          <div className={styles.stepsList}>
            {nexPoints.map((point, i) => (
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
            href={NEX_URL}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book N&apos;EX Tickets on Klook →
          </a>
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>The Verdict</h2>
          <p className={styles.verdictText}>
            There&apos;s no single winner — the right train is the one that drops you closest to your hotel. If you&apos;re
            staying in <strong>east Tokyo</strong> (Ueno, Nippori, Asakusa, Akihabara), the Skyliner is faster, cheaper,
            and pairs neatly with the Tokyo Subway Ticket.
          </p>
          <p className={styles.verdictText}>
            If you&apos;re heading to <strong>west or central Tokyo</strong> — Shinjuku, Shibuya, Tokyo Station, or
            Yokohama — the N&apos;EX wins on convenience with a direct, transfer-free ride. And if you hold a JR Pass,
            the N&apos;EX is effectively free, making it the obvious first-day choice.
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
            <h2 className={styles.ctaBannerTitle}>Book your Narita airport train</h2>
            <p className={styles.ctaBannerDesc}>
              Reserve the Skyliner or N&apos;EX online before you fly and walk straight to the platform on arrival —
              no ticket-machine queues after a long flight.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={SKYLINER_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
                Book Skyliner →
              </a>
              <a href={NEX_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
                Book N&apos;EX →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
