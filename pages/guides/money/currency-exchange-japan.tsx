import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const bestWays = [
  {
    rank: 1,
    title: "ATM Withdrawal (Best Rate)",
    body: "Withdrawing yen directly from a Japanese ATM gives you the closest rate to the interbank exchange rate — far better than any counter. The two best networks for foreign cards are 7-Eleven ATMs (found inside every 7-Eleven convenience store) and Japan Post ATMs (at post offices nationwide). Both accept Visa, Mastercard, Maestro, Cirrus, and most international cards. Combine them with a travel card that charges no foreign transaction fees (Wise, Revolut, Charles Schwab) and your total cost is often under 0.5% — the closest thing to a perfect rate available to travellers.",
  },
  {
    rank: 2,
    title: "Wise / Revolut (Pre-loaded Card)",
    body: "Load your Wise or Revolut card with yen before you fly — both convert at the mid-market rate (the rate you see on Google) with minimal fees. Wise charges around 0.4–0.6% for JPY conversion; Revolut offers fee-free conversion up to a monthly limit. Once loaded, use the card at ATMs or directly at shops. This approach works especially well if you want to lock in a rate before travelling or if you prefer a debit card over carrying cash.",
  },
  {
    rank: 3,
    title: "Currency Exchange Counters (Last Resort)",
    body: "Banks, post offices, and authorised exchange bureaux (both in your home country and in Japan) can exchange cash, but the spread between the buy and sell rate typically costs you 3–8%. Airport counters in Japan (Narita, Haneda) are the most convenient but the most expensive. If you must use a counter, Travelex and airport bank branches in Japan generally offer better rates than hotel desks or standalone booths claiming 'no commission'. Bring yen from home only if you genuinely have no other option.",
  },
];

const avoidTable = [
  { location: "Airport exchange counters",   why: "Worst rates on the market — fees built into the spread" },
  { location: "Hotel front desk",            why: "Convenience mark-up; expect 5–10% worse than ATM" },
  { location: '"No commission" booths',      why: "Commission hidden in the exchange rate — often the worst overall" },
  { location: "Department store exchanges",  why: "Below-market rates; fine as a last resort, not a first choice" },
  { location: "Foreign bank ATMs in Japan",  why: "International network fees vary widely; use 7-Eleven or Japan Post instead" },
];

const budgetRows = [
  { length: "1 week",  budget: "¥50,000",  mid: "¥150,000", comfortable: "¥300,000" },
  { length: "2 weeks", budget: "¥100,000", mid: "¥300,000", comfortable: "¥600,000" },
  { length: "3 weeks", budget: "¥150,000", mid: "¥450,000", comfortable: "¥900,000" },
];

const cards = [
  {
    name: "Wise – Best Overall",
    desc: "Wise converts at the mid-market rate and charges a small transparent fee (around 0.4–0.6% for JPY). You can hold yen in your Wise account and spend directly, or convert on the fly. Available in most countries. The Wise card works at ATMs worldwide; note that Wise charges a small ATM fee after the first two free withdrawals per month.",
  },
  {
    name: "Charles Schwab – Best for US Travellers",
    desc: "The Charles Schwab Investor Checking account reimburses all ATM fees worldwide — including the fee charged by the Japanese ATM itself. Combined with no foreign transaction fees, this is effectively free yen at the best available rate. The only catch: you need a US address to open an account.",
  },
  {
    name: "Starling / Monzo – Best for UK Travellers",
    desc: "Both Starling and Monzo offer fee-free foreign currency spending and ATM withdrawals up to their monthly limits (Starling: unlimited; Monzo: £200/month free). Starling has a slight edge for international use due to no monthly withdrawal cap. Both use the Mastercard exchange rate, which is very close to the mid-market rate.",
  },
];

const faqItems = [
  {
    q: "Where is the best place to exchange money in Japan?",
    a: "The best place to get yen in Japan is a 7-Eleven ATM or Japan Post ATM using a travel card with no foreign fees (Wise, Revolut, or Charles Schwab). These give you the mid-market exchange rate with minimal charges. Currency exchange counters — including those at airports — offer significantly worse rates and should be avoided if possible.",
  },
  {
    q: "Should I get yen before going to Japan?",
    a: "We recommend bringing a small amount of yen (¥10,000–¥20,000) for immediate needs on arrival — transport from the airport, vending machines, or small purchases before you find an ATM. For the bulk of your spending, withdraw yen from a 7-Eleven or Japan Post ATM on arrival for a much better rate than you'll get at a foreign exchange counter.",
  },
  {
    q: "Is it better to use card or cash in Japan?",
    a: "Both. Japan remains more cash-reliant than most developed countries — many restaurants, smaller shops, temples, and vending machines are cash-only. That said, card acceptance has improved significantly, especially in cities and at convenience stores. The practical approach: carry ¥10,000–¥20,000 in cash at all times and use your card where accepted to minimise ATM trips.",
  },
  {
    q: "Can I exchange money at Japanese convenience stores?",
    a: "You cannot exchange currency at convenience store counters, but you can withdraw yen using a foreign card at the ATM inside. 7-Eleven ATMs in Japan are among the best in the country for foreign card acceptance — they take Visa, Mastercard, Maestro, American Express, and most international networks. The ATM interface is available in English.",
  },
  {
    q: "What is the best exchange rate app for Japan?",
    a: "For checking the current yen rate, Google (type 'USD to JPY') shows the mid-market rate in real time. The Wise app shows you exactly what rate you'll get and what fee you'll pay. XE Currency and OANDA are good secondary references. The rate shown on Google is the interbank rate — your actual cost will be slightly higher regardless of which method you use.",
  },
];

export default function CurrencyExchangeJapanPage() {
  return (
    <>
      <Head>
        <title>Currency Exchange in Japan 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Where should you exchange money in Japan? We rank the best options from ATMs to airport counters — and explain which to avoid to get the best yen rate."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/money/currency-exchange-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Currency Exchange in Japan 2026: Best Ways to Get Yen" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/money/currency-exchange-japan" />
        <meta property="og:description" content="Where should you exchange money in Japan? We rank the best options from ATMs to airport counters — and explain which to avoid to get the best yen rate." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Currency Exchange in Japan 2026: Best Ways to Get Yen" />
        <meta name="twitter:description" content="Where should you exchange money in Japan? We rank the best options from ATMs to airport counters — and explain which to avoid to get the best yen rate." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Currency Exchange", item: "https://japan-travel-kit.com/guides/money/currency-exchange-japan" },
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
              headline: "Currency Exchange in Japan (2026): Best Ways to Get Yen",
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Currency Exchange</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>💴</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Currency Exchange in Japan (2026):<br />Best Ways to Get Yen
          </h1>
          <p className={styles.heroSubtitle}>
            Where you exchange your money makes a big difference. Here&apos;s how to get the best yen rate — and what to avoid.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Best Rates", "Avoid These Mistakes"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Best option</p>
                <p className={styles.verdictStatValue}>7-Eleven ATM with a no-fee card</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Second best</p>
                <p className={styles.verdictStatValue}>Japan Post ATM</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Avoid</p>
                <p className={styles.verdictStatValue}>Airport exchange counters &amp; hotels</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bring</p>
                <p className={styles.verdictStatValue}>A travel card with no foreign fees</p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Ways to Get Yen */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Ranked options</span>
          <h2 className={styles.sectionTitle}>Best Ways to Get Yen</h2>
          <div className={styles.stepsList}>
            {bestWays.map((item) => (
              <div key={item.rank} className={styles.stepCard}>
                <span className={styles.stepNum}>{item.rank}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where NOT to Exchange */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What to avoid</span>
          <h2 className={styles.sectionTitle}>Where NOT to Exchange Money</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Location", "Why to Avoid"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {avoidTable.map((row) => (
                    <tr key={row.location}>
                      <td className={styles.tdProvider}>{row.location}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            The golden rule: the more convenient the exchange location, the worse the rate. Airport counters bank on travellers being in a hurry.
          </p>
        </section>

        {/* How Much Yen */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Planning</span>
          <h2 className={styles.sectionTitle}>How Much Yen Should I Bring?</h2>
          <p className={styles.bodyText}>
            Japan is still a heavily cash-based country — especially outside major cities. Budget travellers can manage on ¥7,000–¥8,000 per day; mid-range trips typically cost ¥20,000–¥25,000; comfortable travel runs to ¥50,000+. The table below gives rough totals per trip length.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip Length", "Budget", "Mid-range", "Comfortable"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {budgetRows.map((row) => (
                    <tr key={row.length}>
                      <td className={styles.tdProvider}>{row.length}</td>
                      <td className={styles.tdPrice}>{row.budget}</td>
                      <td className={styles.tdPrice}>{row.mid}</td>
                      <td className={styles.tdPrice}>{row.comfortable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            These are total yen estimates including accommodation, food, transport, and activities. Actual spending depends heavily on your itinerary and accommodation choices.
          </p>
        </section>

        {/* Best Cards */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Recommended cards</span>
          <h2 className={styles.sectionTitle}>Best Cards for Getting Yen</h2>
          <div className={styles.stepsList}>
            {cards.map((card) => (
              <div key={card.name} className={styles.stepCard}>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{card.name}</p>
                  <p className={styles.stepDesc}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Note: Japan&apos;s 7-Eleven and Japan Post ATMs often charge a ¥110–¥330 machine fee per withdrawal regardless of your card. This is separate from any fee your bank charges. A Wise or Charles Schwab card eliminates your bank&apos;s fees; the ATM&apos;s own fee is harder to avoid.
          </p>
        </section>

        {/* Before or After */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Strategy</span>
          <h2 className={styles.sectionTitle}>Should I Exchange Before or After Arriving?</h2>
          <p className={styles.bodyText}>
            Exchange a small amount — ¥10,000 to ¥20,000 — before you fly. This covers your airport transfer, any immediate purchases, and gives you breathing room before you find an ATM. The rate at a bank or post office in your home country is rarely great, but it&apos;s usually better than a dedicated airport exchange counter.
          </p>
          <p className={styles.bodyText}>
            For the bulk of your spending money, withdraw yen from a 7-Eleven or Japan Post ATM in Japan. The rate is significantly better than any over-the-counter exchange, and ATMs are available 24/7 at convenience stores across the country — you will never be far from one in any city or major tourist area.
          </p>
          <p className={styles.bodyText}>
            One practical tip: withdraw larger amounts less frequently to minimise ATM fees. A single ¥50,000 withdrawal costs the same machine fee as a ¥10,000 withdrawal.
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
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): What Actually Works?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                  <path d="M6 15h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Card for Japan (2026): Top Picks for Foreign Visitors</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/atms-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>ATMs in Japan (2026): Where to Find Them &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Planning your Japan trip budget?</h2>
            <p className={styles.ctaBannerDesc}>
              See our full breakdown of what Japan costs — accommodation, food, transport, and activities — for every budget level.
            </p>
            <Link href="/guides/money/japan-travel-budget" className={styles.ctaBannerBtn}>
              View Japan Travel Budget Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
