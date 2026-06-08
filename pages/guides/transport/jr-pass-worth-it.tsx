import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const itineraries = [
  { route: "Tokyo only", fares: "~¥0 intercity JR", verdict: "Skip", win: false },
  { route: "Kansai only (Kyoto / Osaka / Nara / Kobe)", fares: "~¥3,000–¥6,000", verdict: "Skip", win: false },
  { route: "Golden Route round trip (Tokyo → Kyoto → Osaka → Tokyo)", fares: "~¥29,000", verdict: "Skip — cheaper individually", win: false },
  { route: "Tokyo → Kyoto → Hiroshima → Tokyo (one loop)", fares: "~¥44,000", verdict: "Borderline", win: false },
  { route: "Tokyo → Kanazawa → Kyoto → Hiroshima → Tokyo", fares: "~¥55,000+", verdict: "✓ Worth it", win: true },
  { route: "Multi-region (Tokyo + Tohoku / Hokkaido / Kyushu)", fares: "~¥60,000+", verdict: "✓ Worth it", win: true },
];

const buyIt = [
  "You're compressing several long-distance legs into one week (e.g. Tokyo–Hiroshima–Kanazawa)",
  "Your trip reaches far regions — Hokkaido, Tohoku, or Kyushu — by rail",
  "You'll backtrack a lot (out-and-back day trips on the Shinkansen)",
  "You value the flexibility of hopping on any covered train without buying tickets each time",
];

const skipIt = [
  "You're staying in Tokyo, or only in the Kansai region (Kyoto/Osaka/Nara)",
  "You're doing the classic Golden Route once (Tokyo–Kyoto–Osaka and back)",
  "You only make one or two intercity trips total",
  "Your longest hops are better flown (Tokyo–Sapporo, Tokyo–Fukuoka)",
];

const alternatives = [
  {
    name: "Individual Shinkansen tickets",
    bestFor: "1–2 intercity trips, including the Golden Route",
    desc: "Buy at station machines, ticket counters, or via Smart EX/EkiNet. For a single Tokyo–Kyoto round trip (~¥27,940 on the Hikari) you pay far less than a ¥50,000 pass. You can also pay the Nozomi supplement (~¥4,960 each way Tokyo–Kyoto) for the fastest service.",
  },
  {
    name: "Regional JR passes",
    bestFor: "Travel concentrated in one area",
    desc: "Cheaper, area-limited passes often beat the national pass: the Kansai WIDE Area Pass (Kyoto/Osaka/Himeji/Okayama), the JR Kyushu Rail Pass, and the Hokuriku Arch Pass (Tokyo–Kanazawa–Osaka). If your trip stays in one region, price these first.",
  },
  {
    name: "Domestic flights",
    bestFor: "Very long hops",
    desc: "For Tokyo–Sapporo or Tokyo–Fukuoka, low-cost carriers (Peach, Jetstar, ANA/JAL specials) are usually cheaper and faster than rail. Book early for the best fares and factor in airport transfer time.",
  },
];

const faqItems = [
  {
    q: "Is the JR Pass worth it in 2026?",
    a: "For most travellers, no. After the October 2023 price increase that pushed the 7-day Ordinary pass from ¥29,650 to ¥50,000 (about a 70% rise), the break-even point moved a long way up. To get your money back on a 7-day pass you need roughly ¥50,000 of covered JR travel in a week — which usually means several long-distance Shinkansen legs (e.g. Tokyo–Hiroshima plus Kanazawa or Tohoku). If you're staying in Tokyo, doing only the Golden Route, or only making one or two intercity trips, individual tickets are cheaper.",
  },
  {
    q: "How much does the JR Pass cost in 2026?",
    a: "The nationwide Ordinary pass is ¥50,000 (7 days), ¥80,000 (14 days), and ¥100,000 (21 days). The Green Car (first class) version is higher — around ¥70,000 for 7 days. Note: from 1 October 2026, the overseas-sold 7-day Ordinary pass is set to rise from ¥50,000 to ¥53,000, while the official online reservation price is expected to stay the same. Always confirm current prices before buying.",
  },
  {
    q: "Does the JR Pass cover the Tokyo–Kyoto bullet train?",
    a: "Yes — on the Hikari and Kodama services (about ¥13,970 one-way, ¥27,940 round trip). It does not cover the faster Nozomi without paying a separate supplement (around ¥4,960 each way Tokyo–Kyoto). A single Golden Route round trip on covered trains costs roughly ¥29,000, which is well under the ¥50,000 pass price — so the pass rarely pays off for that trip alone.",
  },
  {
    q: "Who is allowed to buy the JR Pass?",
    a: "The JR Pass is for foreign tourists visiting Japan on a short-term \"Temporary Visitor\" entry status. It is not available to residents or long-stay visa holders. You'll need to show your passport with the Temporary Visitor stamp when you exchange your voucher for the pass in Japan.",
  },
  {
    q: "Does the JR Pass cover city subways and buses?",
    a: "No. The pass only covers JR-operated trains, JR buses, and the Miyajima ferry. City subways (Tokyo Metro, Osaka Metro), private railways (Kintetsu, Hankyu), and most local buses are not included. Pair the pass with a Suica or Pasmo IC card for city travel — see our IC card guide.",
  },
];

export default function JrPassWorthItPage() {
  return (
    <>
      <Head>
        <title>Is the JR Pass Worth It in 2026? Honest Cost Breakdown | Japan Travel Kit</title>
        <meta
          name="description"
          content="Is the JR Pass worth it in 2026? After the price hike to ¥50,000, most itineraries don't break even. We show the math, who should buy it, and cheaper alternatives."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/jr-pass-worth-it" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Is the JR Pass Worth It in 2026? Honest Cost Breakdown" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/jr-pass-worth-it" />
        <meta property="og:description" content="Is the JR Pass worth it in 2026? After the price hike to ¥50,000, most itineraries don't break even. We show the math, who should buy it, and cheaper alternatives." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Is the JR Pass Worth It in 2026? Honest Cost Breakdown" />
        <meta name="twitter:description" content="Is the JR Pass worth it in 2026? After the price hike to ¥50,000, most itineraries don't break even. We show the math, who should buy it, and cheaper alternatives." />
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
              headline: "Is the JR Pass Worth It in 2026? Honest Cost Breakdown",
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Is the JR Pass Worth It?", item: "https://www.japan-travel-kit.com/guides/transport/jr-pass-worth-it" },
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
          <span className={styles.breadCurrent}>Is the JR Pass Worth It?</span>
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
            Is the JR Pass Worth It in 2026?<br />Honest Cost Breakdown
          </h1>
          <p className={styles.heroSubtitle}>
            Since the 2023 price hike to ¥50,000, the JR Pass no longer pays off for most itineraries.
            Here&apos;s the honest math — including when you should genuinely skip it.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Real Break-Even Math", "Cheaper Alternatives"].map((t) => (
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
            <span className={styles.verdictLabel}>The Honest Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Worth it if</p>
                <p className={styles.verdictStatValue}>Several long-distance legs in 7 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Not worth it if</p>
                <p className={styles.verdictStatValue}>Tokyo only, Kansai only, or Golden Route</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>7-day price (2026)</p>
                <p className={styles.verdictStatValue}>¥50,000 (Ordinary)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Break-even</p>
                <p className={styles.verdictStatValue}>~¥50,000 of JR travel/week</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> For the typical first-timer doing Tokyo, Kyoto, and Osaka,
              the JR Pass costs <em>more</em> than buying tickets individually. It only pays off if your route
              packs in multiple long-distance Shinkansen trips. If yours does, here are current options:
            </p>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Check JR Pass Prices →
            </a>
          </div>
        </div>

        {/* Conclusion first */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Start here</span>
          <h2 className={styles.sectionTitle}>The Short Version: Most Trips Don&apos;t Break Even</h2>
          <p className={styles.bodyText}>
            The JR Pass used to be a near-automatic buy. That changed in <strong>October 2023</strong>, when
            the 7-day Ordinary pass jumped from <strong>¥29,650 to ¥50,000</strong> — a roughly 70% increase
            overnight. At the old price, a single Tokyo–Kyoto–Hiroshima trip paid it off. At ¥50,000, the
            maths is far less forgiving.
          </p>
          <p className={styles.bodyText}>
            To justify a 7-day pass you now need to use roughly <strong>¥50,000 of covered JR travel</strong> in
            a week. That&apos;s a high bar. The classic &quot;Golden Route&quot; — Tokyo, Kyoto, and Osaka and back —
            only adds up to about ¥29,000 in covered Shinkansen fares. Buying those tickets individually saves
            you over ¥20,000. We&apos;d rather tell you that honestly than sell you a pass you won&apos;t use.
          </p>
          <p className={styles.bodyText}>
            The pass still wins for one specific traveller: someone covering long distances and several regions in
            a short window. The sections below show exactly where the line falls. (For how the pass works,
            what it covers, and how to redeem it, see our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              full JR Pass guide
            </Link>.)
          </p>
        </section>

        {/* Break-even thinking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The math</span>
          <h2 className={styles.sectionTitle}>How to Work Out Your Own Break-Even</h2>
          <p className={styles.bodyText}>
            Forget rules of thumb and do the only calculation that matters: add up the individual fares for
            the JR trips you&apos;d actually take, then compare to the pass price. The pass is worth it only if
            your total exceeds it.
          </p>
          <ul className={styles.bodyList}>
            <li>Tokyo ⇄ Kyoto on the Hikari: about <strong>¥13,970 one-way</strong>, <strong>¥27,940 round trip</strong>.</li>
            <li>The faster Nozomi isn&apos;t covered — it needs a supplement (about <strong>¥4,960 each way</strong> Tokyo–Kyoto), so the pass forces you onto the slightly slower Hikari anyway.</li>
            <li>City subways, private railways, and most buses are <strong>never</strong> covered, so they don&apos;t count toward your total.</li>
            <li>The 7-day pass is <strong>¥50,000</strong>; 14-day <strong>¥80,000</strong>; 21-day <strong>¥100,000</strong> (Green Car is higher — around ¥70,000 for 7 days).</li>
          </ul>
          <p className={styles.bodyText}>
            One more thing to factor in: from <strong>1 October 2026</strong>, the overseas-sold 7-day Ordinary
            pass is set to rise from ¥50,000 to <strong>¥53,000</strong> (the official online reservation price is
            expected to hold). That nudges the break-even point even higher for most travellers.
          </p>
        </section>

        {/* Itinerary table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Real itineraries</span>
          <h2 className={styles.sectionTitle}>Does Your Itinerary Pay Off? (7-day pass, ¥50,000)</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Itinerary", "Covered JR fares", "Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itineraries.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.fares}</td>
                      <td style={{ fontWeight: 700, color: row.win ? "#c62828" : "#374151" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Tokyo–Kyoto fares are confirmed; other totals are approximate 2026 estimates for covered
            (Hikari/Sakura) services and will vary by route, season, and seat reservations — confirm current
            fares before deciding. Figures exclude non-covered subways, private rail, and the Nozomi supplement.
          </p>
        </section>

        {/* Buy / Skip */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>The verdict</span>
          <h2 className={styles.sectionTitle}>When to Buy It — and When to Skip It</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Buy the JR Pass if…</p>
              <ul className={styles.pickList}>
                {buyIt.map((item) => (
                  <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Skip it if…</p>
              <ul className={styles.pickList}>
                {skipIt.map((item) => (
                  <li key={item}><span className={styles.conIcon}>✗</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Alternatives */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>If you skip it</span>
          <h2 className={styles.sectionTitle}>Cheaper Alternatives to the JR Pass</h2>
          <p className={styles.bodyText}>
            If the pass doesn&apos;t pay off for your route, you have three solid options — often a mix is best:
          </p>
          <div className={styles.stepsList}>
            {alternatives.map((alt, i) => (
              <div key={alt.name} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{alt.name} <span style={{ fontWeight: 400, color: "#9ca3af" }}>— {alt.bestFor}</span></p>
                  <p className={styles.stepDesc}>{alt.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            For a deeper look at buying single tickets and using the Shinkansen, see our{" "}
            <Link href="/guides/transport/shinkansen-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              Shinkansen guide
            </Link>{" "}
            and our{" "}
            <Link href="/guides/transport/tokyo-to-kyoto" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo to Kyoto comparison
            </Link>.
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
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="14" rx="2" />
                  <path d="M3 11h18" />
                  <path d="M7 18v3M17 18v3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Types, Prices &amp; How to Use It</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="7" r="2" />
                  <circle cx="18" cy="17" r="2" />
                  <path d="M8 7h6a4 4 0 0 1 0 8H10a4 4 0 0 0 0 8" transform="translate(0 -4)" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kyoto (2026): Cheapest &amp; Fastest Ways to Get There</p>
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
            <h2 className={styles.ctaBannerTitle}>Pass pays off for your route?</h2>
            <p className={styles.ctaBannerDesc}>
              If your itinerary clears the break-even line, lock in the 7-day Japan Rail Pass and travel
              long-distance without buying tickets each time.
            </p>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              View JR Pass Options →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
