import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// NOTE: Wise affiliate programme not yet approved — plain link for now.
// TODO: replace with approved affiliate link once accepted.
const WISE_URL = "https://wise.com/";

const feeRows = [
  { item: "Monthly / annual fee", detail: "None — you pay only a one-off fee when the card is issued" },
  { item: "Exchange rate",        detail: "Mid-market rate (the rate you see on Google)" },
  { item: "Conversion fee",       detail: "Mid-market rate with a fee from ~0.4%, varying by currency" },
  { item: "ATM withdrawals",      detail: "Free up to a monthly allowance set by your account's country (¥30,000/mo on a Japan-registered account); above that ~1.75–2.69%" },
  { item: "Japanese ATM fee",     detail: "The ATM operator may add ~¥220 per withdrawal, separate from Wise" },
];

const howToSteps = [
  {
    title: "Order and fund the card before you fly",
    desc: "The Wise card is posted to you, so order well ahead of your trip. Add money to your account and, if you like, convert it to yen in advance to lock in the mid-market rate before you travel.",
  },
  {
    title: "Hold yen or let it auto-convert",
    desc: "You can convert money to JPY and hold it in your Wise account, or simply spend from another currency and let Wise convert at the time of payment. Holding yen lets you fix your rate ahead of time.",
  },
  {
    title: "Always choose to pay in yen (JPY)",
    desc: "At terminals and ATMs you may be offered your home currency instead of yen — this is Dynamic Currency Conversion (DCC), and the rate is set by the merchant, typically 3–5% worse. Always decline it and pay in JPY so Wise handles the conversion.",
  },
  {
    title: "Use 7-Eleven (Seven Bank) ATMs for cash",
    desc: "Seven Bank ATMs inside 7-Eleven stores are the most reliable for foreign cards, run 24/7, and offer an English menu. They typically allow up to ¥50,000 per withdrawal (and around ¥500,000 per day), which lets you take out more in one go to minimise per-withdrawal fees.",
  },
];

const pros = [
  "Mid-market exchange rate with a small, transparent fee",
  "No monthly or annual fee — just a one-off card cost",
  "Free ATM withdrawals up to a monthly allowance (¥30,000/mo on a Japan-registered account)",
  "Hold and convert yen in advance to lock in a rate",
  "Works at 7-Eleven, Japan Post, and AEON ATMs",
];

const cons = [
  "ATM operator fee (~¥220) may apply on the Japanese side",
  "A fee (~1.75–2.69%) applies above the monthly free ATM allowance",
  "Not a credit card — no purchase protection or rewards points",
  "Requires a smartphone app to set up and manage",
];

const faqItems = [
  {
    q: "Does the Wise card work in Japan?",
    a: "Yes. The Wise debit card works at Japanese ATMs and at card terminals that accept Visa or Mastercard. The most reliable ATMs for foreign cards are Seven Bank (inside 7-Eleven), Japan Post, and AEON. As Japan is still partly cash-based, use the card for hotels, chain stores, and convenience stores, and keep some cash for smaller venues.",
  },
  {
    q: "How much does Wise charge in Japan?",
    a: "Wise converts at the mid-market rate with a small conversion fee that varies by currency (from around 0.4%) and charges no monthly or annual fee — only a one-off cost when the card is issued. ATM withdrawals are free up to a monthly allowance that depends on your account's registration country: around ¥30,000 on a Japan-registered account, or roughly £250 / $250 / €250 elsewhere. Above the allowance the fee is around 1.75–2.69%. Wise revised this structure on 1 May 2026. Separately, the Japanese ATM operator may add its own fee (often around ¥220 per withdrawal). Confirm current fees on the official Wise site.",
  },
  {
    q: "How do I avoid fees with Wise at Japanese ATMs?",
    a: "Two habits help. First, always choose to pay in yen (JPY) rather than your home currency — declining Dynamic Currency Conversion keeps the rate in Wise's hands. Second, withdraw larger amounts less often to stay within the monthly free allowance (around ¥30,000 on a Japan-registered account) and to spread any flat operator fee across more cash. Seven Bank ATMs allow up to ¥50,000 per withdrawal.",
  },
  {
    q: "Should I hold yen in Wise before I travel?",
    a: "It's optional but useful. Converting to yen in advance lets you lock in the mid-market rate at a moment of your choosing, so currency movements during your trip don't affect what you've already converted. Alternatively, you can leave the money in your home currency and let Wise convert it at the point of payment — the rate is the same mid-market rate either way.",
  },
  {
    q: "Is Wise better than a normal bank card for Japan?",
    a: "For most travellers, yes. A typical home-bank debit or credit card charges around 3% on foreign transactions plus a marked-up exchange rate. Wise uses the mid-market rate with a fee from around 0.4%, so on a two-week trip the savings are meaningful. That said, it's a debit product, so carry a backup card and some cash too.",
  },
];

export default function WiseCardJapanPage() {
  return (
    <>
      <Head>
        <title>Wise Card in Japan 2026: Fees, ATMs &amp; How to Use It | Japan Travel Kit</title>
        <meta
          name="description"
          content="Does the Wise card work in Japan? We cover fees, the mid-market rate, ATM limits at 7-Eleven, avoiding DCC, and how to use Wise to save money in 2026."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/wise-card-japan" />
        <meta property="og:title" content="Wise Card in Japan (2026): Fees, ATMs & How to Use It" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/wise-card-japan" />
        <meta property="og:description" content="Does the Wise card work in Japan? We cover fees, the mid-market rate, ATM limits at 7-Eleven, avoiding DCC, and how to use Wise to save money in 2026." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wise Card in Japan (2026): Fees, ATMs & How to Use It" />
        <meta name="twitter:description" content="Does the Wise card work in Japan? We cover fees, the mid-market rate, ATM limits at 7-Eleven, avoiding DCC, and how to use Wise to save money in 2026." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home",            item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",          item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Wise Card in Japan", item: "https://www.japan-travel-kit.com/guides/money/wise-card-japan" },
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
              headline: "Wise Card in Japan (2026): Fees, ATMs & How to Use It",
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Wise Card in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>💳</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Wise Card in Japan (2026):<br />Fees, ATMs &amp; How to Use It
          </h1>
          <p className={styles.heroSubtitle}>
            One of the cheapest ways to spend in Japan — if you know how to dodge DCC and ATM fees. Here&apos;s the full guide.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Mid-Market Rate", "7-Eleven ATM Tips"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclaimer */}
        <div className={styles.disclosure}>
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Not financial advice.</strong> This guide is general information only. Fees and limits are current
            as of 2026, can change, and depend on the country where your Wise account is registered — always confirm the latest on the official{" "}
            <a href={WISE_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#92400e", fontWeight: 600 }}>Wise fees page</a>{" "}
            before you rely on them.
          </p>
        </div>

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Works in Japan?</p>
                <p className={styles.verdictStatValue}>Yes</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Exchange rate</p>
                <p className={styles.verdictStatValue}>Mid-market</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Free ATM allowance</p>
                <p className={styles.verdictStatValue}>¥30,000/mo (JP acct)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Wise is one of the best-value ways to spend in Japan — it uses the mid-market
              rate with a fee from around 0.4% and no monthly cost. Two rules make it work: always <strong>pay in
              yen</strong> (decline DCC), and use <strong>7-Eleven (Seven Bank) ATMs</strong> for cash.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              Weighing it against Revolut? See our{" "}
              <Link href="/guides/money/wise-vs-revolut-japan" style={{ fontWeight: 600 }}>Wise vs Revolut for Japan</Link>{" "}
              comparison.
            </p>
          </div>
        </div>

        {/* What is Wise */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Wise Card?</h2>
          <p className={styles.bodyText}>
            Wise (formerly TransferWise) is a multi-currency account with a linked debit card. Rather than marking up
            the exchange rate like a traditional bank, Wise converts at the mid-market rate — the same rate you see on
            Google — and charges a small, clearly stated fee on top.
          </p>
          <p className={styles.bodyText}>
            You can hold dozens of currencies in one account, including Japanese yen. That means you can convert to yen
            before your trip and spend from your JPY balance, or hold your home currency and let Wise convert as you
            spend. It&apos;s a debit product, not a credit card, so you spend money you&apos;ve loaded.
          </p>
        </section>

        {/* Fees table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fees</span>
          <h2 className={styles.sectionTitle}>Wise Fees in Japan (2026)</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feeRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.9rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Your free ATM allowance depends on the country where your Wise account is registered — for example ¥30,000/month on a Japan-registered account, or roughly £250 / $250 / €250 / 400 AUD per month for UK, US, Eurozone, and Australian accounts. Wise revised its ATM fee structure on 1 May 2026, and the conversion fee varies by currency (from around 0.4%). These are a 2026 guide — confirm the current figures in your Wise app or on the official Wise fees page.
          </p>
        </section>

        {/* How to use */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>How to use it</span>
          <h2 className={styles.sectionTitle}>How to Use Wise in Japan</h2>
          <div className={styles.stepsList}>
            {howToSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={WISE_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "1.5rem", display: "inline-block" }}>
            Visit Wise →
          </a>
        </section>

        {/* Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>Wise Pros &amp; Cons for Japan</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {pros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {cons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cash reminder */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Don&apos;t forget cash</span>
          <h2 className={styles.sectionTitle}>You&apos;ll Still Need Some Cash</h2>
          <p className={styles.bodyText}>
            Even with a great card, Japan still runs on cash in plenty of places — small restaurants, izakayas,
            temples, shrines, and market stalls are often cash only. Withdraw ¥20,000–¥30,000 from a 7-Eleven ATM on
            arrival and keep it as a running reserve, topping up as needed.
          </p>
          <p className={styles.bodyText}>
            For more on which machines accept foreign cards and how to avoid limits, see our{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--red)", fontWeight: 600 }}>ATMs in Japan guide</Link>,
            and for where cards work at all, our{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>cash vs card guide</Link>.
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
            <Link href="/guides/money/wise-vs-revolut-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Wise vs Revolut for Japan (2026): Which Travel Card Wins?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
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
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="7" x2="16" y2="7" />
                  <line x1="8" y1="11" x2="16" y2="11" />
                  <line x1="8" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>ATMs in Japan (2026): Where to Find Them &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): What Actually Works?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Get your Wise card before you go</h2>
            <p className={styles.ctaBannerDesc}>
              The card is posted to you, so order ahead. Land in Japan ready to spend at the mid-market rate and skip
              the airport exchange counters.
            </p>
            <a href={WISE_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
              Visit Wise →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
