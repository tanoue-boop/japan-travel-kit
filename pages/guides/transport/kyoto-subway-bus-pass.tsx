import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const PASS_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1266287&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F118071-kyoto-city-subway-and-bus-ticket%2F";

const priceRows = [
  { pass: "Subway & Bus 1-Day", adult: "¥1,100", child: "¥550", covers: "All city buses + both subway lines" },
  { pass: "Subway-only 1-Day",  adult: "¥800",   child: "¥400", covers: "Karasuma + Tozai subway lines" },
];

const vsRows = [
  { scenario: "Temple-hopping across spread-out sights", pick: "Subway & Bus Pass", note: "Kinkakuji, Kiyomizudera, Gion and Arashiyama are best reached by city bus — the combined pass covers them all." },
  { scenario: "Mostly cross-city hops on the subway",    pick: "Subway-only Pass",  note: "Cheaper at ¥800 if your day runs along the Karasuma or Tozai lines and skips the buses." },
  { scenario: "Only 2–3 rides all day",                  pick: "Suica / ICOCA",     note: "Pay-as-you-go is cheaper than any day pass at this level of use." },
];

const breakEvenPoints = [
  {
    title: "The combined pass: about 5 rides",
    desc: "The Subway & Bus 1-Day Pass is ¥1,100. With a flat city-bus fare of ¥230 and subway fares from ¥210, you need roughly five rides to break even. A full temple day usually clears that before mid-afternoon.",
  },
  {
    title: "The subway-only pass: about 4 rides",
    desc: "The Subway-only 1-Day Pass is ¥800. At ¥210+ per subway ride, four or more rides put you ahead. It's the better buy only if your itinerary stays on the two subway lines.",
  },
  {
    title: "Below that, use an IC card",
    desc: "If you'll take just a couple of journeys, a pay-as-you-go Suica or ICOCA is cheaper and more flexible — and it also works on JR local trains to Arashiyama and Uji, which the passes do not cover.",
  },
];

const noticePoints = [
  {
    title: "The old ¥700 Bus 1-Day Pass is gone",
    desc: "Many older guides still mention a ¥700 City Bus 1-Day Pass. It has been discontinued — sales ended in September 2023 and it stopped being usable at the end of March 2024. The current bus-inclusive option is the ¥1,100 Subway & Bus 1-Day Pass. Don't go looking for the ¥700 ticket; it no longer exists.",
  },
  {
    title: "No large luggage on city buses",
    desc: "Kyoto city buses don't accept large suitcases — they get too crowded, especially in peak season. Use the coin lockers or luggage storage at Kyoto Station, or a luggage-forwarding service, before you start a bus-based sightseeing day.",
  },
  {
    title: "Some areas aren't covered",
    desc: "The pass covers the city-centre network, but outlying spots such as Kibune & Kurama and Mt Hiei sit outside it or need an extra fare. Treat coverage of fringe areas as a 2026 guide and confirm before you travel.",
  },
];

const buyPoints = [
  {
    title: "Subway station machines & info centres",
    desc: "Buy the pass at subway ticket machines, the Kyoto Station Bus Information Center, and many major hotels. It's a separate paper ticket — it isn't loaded onto an IC card.",
  },
  {
    title: "Online via Klook (voucher)",
    desc: "You can buy a voucher in advance and exchange it for the pass after you arrive. This locks in the price and saves a decision after a long travel day.",
  },
];

const faqItems = [
  {
    q: "Is the Kyoto Subway & Bus 1-Day Pass worth it?",
    a: "It's worth it on a full sightseeing day with around five or more rides. The pass costs ¥1,100 for adults (¥550 for children), while a single city-bus ride is ¥230 and subway fares start at ¥210 — so five rides cover the cost. A typical temple day (Kyoto Station → Kinkakuji → Kiyomizudera → Gion → back) easily clears that. On a lighter day, a pay-as-you-go IC card is cheaper.",
  },
  {
    q: "What happened to the ¥700 Kyoto bus day pass?",
    a: "It was discontinued. Sales of the City Bus 1-Day Pass ended in September 2023 and it could no longer be used after the end of March 2024. If a guide still recommends the ¥700 bus pass, it's out of date. The current bus-inclusive option is the ¥1,100 Subway & Bus 1-Day Pass.",
  },
  {
    q: "Subway & Bus Pass or Subway-only Pass — which should I buy?",
    a: "Choose the Subway & Bus Pass (¥1,100) if your day mixes buses and subway, which most temple itineraries do — Kinkakuji, Kiyomizudera, and Gion are best reached by bus. Choose the cheaper Subway-only Pass (¥800) only if you'll stay on the Karasuma and Tozai subway lines all day. If you'll take just a few rides, skip both and use an IC card.",
  },
  {
    q: "Does the pass cover JR trains to Arashiyama?",
    a: "No. The pass covers Kyoto city buses and the two municipal subway lines, but not JR. The JR Sagano Line to Saga-Arashiyama and the JR Nara Line to Uji are not included — for those, use a pay-as-you-go IC card, which is accepted on JR local trains. This is one reason an IC card remains useful even if you buy a day pass.",
  },
  {
    q: "Can I take a suitcase on a Kyoto city bus?",
    a: "Large suitcases aren't suitable for Kyoto city buses, which get extremely crowded — especially during cherry-blossom and autumn-leaf season. Store your luggage in a coin locker or storage service at Kyoto Station, or forward it to your accommodation, before starting a bus-based day of sightseeing.",
  },
];

export default function KyotoSubwayBusPassPage() {
  return (
    <>
      <Head>
        <title>Is the Kyoto Subway &amp; Bus 1-Day Pass Worth It? 2026 Guide | Japan Travel Kit</title>
        <meta
          name="description"
          content="Is the Kyoto Subway & Bus 1-Day Pass worth it? We cover the ¥1,100 price, the break-even point, the discontinued ¥700 bus pass, and when an IC card is cheaper in 2026."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/kyoto-subway-bus-pass" />
        <meta property="og:title" content="Is the Kyoto Subway & Bus 1-Day Pass Worth It? (2026 Guide)" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/kyoto-subway-bus-pass" />
        <meta property="og:description" content="Is the Kyoto Subway & Bus 1-Day Pass worth it? We cover the ¥1,100 price, the break-even point, the discontinued ¥700 bus pass, and when an IC card is cheaper in 2026." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Is the Kyoto Subway & Bus 1-Day Pass Worth It? (2026)" />
        <meta name="twitter:description" content="Is the Kyoto Subway & Bus 1-Day Pass worth it? We cover the ¥1,100 price, the break-even point, the discontinued ¥700 bus pass, and when an IC card is cheaper in 2026." />
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
                { "@type": "ListItem", position: 4, name: "Kyoto Subway & Bus Pass", item: "https://www.japan-travel-kit.com/guides/transport/kyoto-subway-bus-pass" },
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
              headline: "Is the Kyoto Subway & Bus 1-Day Pass Worth It? (2026 Guide)",
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
          <span className={styles.breadCurrent}>Kyoto Subway &amp; Bus Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚌</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Is the Kyoto Subway &amp; Bus<br />1-Day Pass Worth It? (2026 Guide)
          </h1>
          <p className={styles.heroSubtitle}>
            A great deal on a temple-hopping day — and a waste on a quiet one. Here&apos;s exactly where the line falls.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Break-Even Maths", "¥700 Pass Update"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Worth it from</p>
                <p className={styles.verdictStatValue}>~5 rides / day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price (adult)</p>
                <p className={styles.verdictStatValue}>¥1,100 Subway &amp; Bus</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Old ¥700 bus pass</p>
                <p className={styles.verdictStatValue}>Discontinued</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> The <strong>Subway &amp; Bus 1-Day Pass (¥1,100)</strong> pays off on a busy
              temple day of roughly five or more rides. For lighter days — or any day relying on JR trains to Arashiyama —
              a pay-as-you-go <strong>Suica or ICOCA</strong> is cheaper and more flexible.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              This guide weighs up the pass on its own. For the full picture on buses, subway, and JR, see our{" "}
              <Link href="/guides/transport/kyoto-transportation" style={{ fontWeight: 600 }}>getting around Kyoto guide</Link>.
            </p>
          </div>
        </div>

        {/* Pricing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Current Pass Prices (2026)</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Adult", "Child", "Covers"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            City-bus fares are a flat ¥230 and subway fares start at ¥210. The passes are paper tickets — they are not loaded onto an IC card. Prices are current 2026 figures; confirm before buying.
          </p>
        </section>

        {/* Important notice */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Before you buy</span>
          <h2 className={styles.sectionTitle}>Three Things to Know First</h2>
          <div className={styles.stepsList}>
            {noticePoints.map((point, i) => (
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

        {/* Break-even */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>How Many Rides to Break Even?</h2>
          <div className={styles.stepsList}>
            {breakEvenPoints.map((point, i) => (
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

        {/* Which pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which to use</span>
          <h2 className={styles.sectionTitle}>Which Pass (or No Pass) Fits Your Day?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your day looks like", "Best choice", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsRows.map((row) => (
                    <tr key={row.scenario}>
                      <td className={styles.tdProvider}>{row.scenario}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b", whiteSpace: "nowrap" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Worked example */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Worked example</span>
          <h2 className={styles.sectionTitle}>A Day Where the Pass Wins</h2>
          <p className={styles.bodyText}>
            Picture a classic Kyoto temple day: bus from Kyoto Station to Kinkakuji in the morning, across to
            Kiyomizudera by bus, down to Gion, then the subway back to your hotel — with a detour or two in between.
            That&apos;s five or more rides.
          </p>
          <p className={styles.bodyText}>
            At ¥230 a bus ride, those journeys add up to ¥1,150 or more on a pay-as-you-go card. The ¥1,100 Subway &amp;
            Bus Pass covers the lot, and every extra hop is free. On a day like that, the pass is the clear winner — and
            you skip fumbling for change each time you step off a bus.
          </p>
          <p className={styles.bodyText}>
            Flip it around: a relaxed day walking the Higashiyama district with two rides would cost less on an IC card,
            and the pass would leave you out of pocket. It all comes down to how many times you ride.
          </p>
        </section>

        {/* Where to buy */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Where to Buy the Pass</h2>
          <div className={styles.stepsList}>
            {buyPoints.map((point, i) => (
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
            href={PASS_URL}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book Kyoto Subway &amp; Bus Pass on Klook →
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4" /><path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Trains &amp; Taxis Explained</p>
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
            <h2 className={styles.ctaBannerTitle}>Planning a full day of temples?</h2>
            <p className={styles.ctaBannerDesc}>
              If you&apos;ll be hopping between Kinkakuji, Kiyomizudera, and Gion, lock in the Subway &amp; Bus Pass
              online and exchange it after you arrive.
            </p>
            <a href={PASS_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
              Book Kyoto Subway &amp; Bus Pass on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
