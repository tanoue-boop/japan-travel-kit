import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const atmComparison = [
  {
    name: "7-Eleven ATM (Seven Bank)",
    availability: "Nationwide, 24 hours",
    foreign: "Yes",
    languages: "English, Chinese, Korean, others",
    networks: "Visa, Mastercard, Maestro, UnionPay, Amex",
    limit: "~¥50,000 per transaction",
    notes: "Most reliable option for tourists",
  },
  {
    name: "Japan Post Bank ATM",
    availability: "Post offices + some stations",
    foreign: "Yes",
    languages: "English",
    networks: "Visa, Mastercard, Maestro, Cirrus, Plus",
    limit: "~¥100,000 per transaction",
    notes: "Open during post office hours; some extended access",
  },
  {
    name: "AEON Bank ATM",
    availability: "AEON malls and some supermarkets",
    foreign: "Yes",
    languages: "English, Chinese",
    networks: "Visa, Mastercard, Maestro, Cirrus, Plus",
    limit: "~¥100,000 per transaction",
    notes: "24-hour access at most AEON mall locations",
  },
  {
    name: "Lawson ATM (E-net)",
    availability: "Lawson convenience stores",
    foreign: "Some locations",
    languages: "English (limited)",
    networks: "Visa, Mastercard (select machines only)",
    limit: "Varies",
    notes: "Not all Lawson ATMs accept foreign cards — check the screen",
  },
  {
    name: "Standard bank ATMs (Mizuho, MUFG, etc.)",
    availability: "Bank branches",
    foreign: "Rarely",
    languages: "Japanese only",
    networks: "Domestic cards only (typically)",
    limit: "N/A",
    notes: "Do not rely on these for foreign card withdrawals",
  },
];

const howToUseSteps = [
  {
    title: "Look for the English language option immediately",
    desc: "On 7-Eleven and Japan Post ATMs, an English option appears on the first screen. Select it before doing anything else — menus are much easier to navigate in English, and you'll avoid accidentally selecting the wrong service.",
  },
  {
    title: "Choose 'Withdrawal' from the main menu",
    desc: "Select 'Withdrawal' (or 'Cash advance' on some machines). You'll be prompted to insert your card — or on some machines, insert first before selecting a language. Follow the on-screen prompts.",
  },
  {
    title: "Enter your PIN",
    desc: "Japanese ATMs use standard numeric PINs. If your card has a PIN longer than 4 digits, it may not work — contact your bank before travelling to set a 4-digit PIN. Use the on-screen keypad or physical number keys.",
  },
  {
    title: "Select JPY and enter your withdrawal amount",
    desc: "Always withdraw in Japanese yen (JPY). If offered a choice between your home currency and JPY, always choose JPY — the DCC (Dynamic Currency Conversion) rate is set by the bank and is typically 3–5% worse.",
  },
  {
    title: "Confirm the amount and collect your cash",
    desc: "Review the amount on screen, confirm, and wait. Japanese ATMs dispense cash quickly and also return your card before the cash is ejected — don't walk away without collecting both.",
  },
  {
    title: "Take your card and receipt",
    desc: "The machine will beep if you forget your card — a helpful feature. Take the receipt if you want a record of the exchange rate applied. Japanese ATMs typically show the transaction amount in both JPY and your home currency.",
  },
];

const feesAndLimits = [
  { item: "7-Eleven (Seven Bank) ATM fee", detail: "¥110–¥220 per transaction (charged by Seven Bank, separate from any card fee)" },
  { item: "Japan Post ATM fee", detail: "Free during business hours; ¥110 evenings and weekends" },
  { item: "AEON Bank ATM fee", detail: "¥0–¥110 depending on time and card type" },
  { item: "Your card's foreign ATM fee", detail: "Varies — Wise and Charles Schwab reimburse these; standard bank cards typically charge 1.5–3%" },
  { item: "Single transaction limit", detail: "¥50,000 at 7-Eleven; ¥100,000 at Japan Post and AEON" },
  { item: "Daily withdrawal limit", detail: "Set by your home bank — check before you travel; typically ¥100,000–¥300,000 equivalent" },
];

const faqItems = [
  {
    q: "Which ATMs in Japan accept foreign cards?",
    a: "The most reliable options for foreign cards are 7-Eleven ATMs (Seven Bank), Japan Post Bank ATMs, and AEON Bank ATMs. 7-Eleven ATMs are available 24 hours nationwide and accept Visa, Mastercard, Maestro, UnionPay, and American Express. Most standard bank ATMs (Mizuho, MUFG, SMBC) do not accept foreign cards.",
  },
  {
    q: "How much does it cost to withdraw cash from a Japanese ATM?",
    a: "7-Eleven ATMs charge ¥110–¥220 per transaction. Japan Post Bank charges nothing during business hours and ¥110 at other times. On top of the ATM fee, your home bank may charge a foreign ATM fee (typically 1.5–3%). Cards like Wise and Charles Schwab reimburse ATM fees — a meaningful saving over a two-week trip.",
  },
  {
    q: "Is there a withdrawal limit at Japanese ATMs?",
    a: "Yes. 7-Eleven ATMs allow up to ¥50,000 per transaction. Japan Post and AEON ATMs typically allow up to ¥100,000. Your home bank may also impose a daily withdrawal limit — check before you travel. If you need a larger amount, make multiple withdrawals or plan across multiple days.",
  },
  {
    q: "Can I use Apple Pay or Google Pay at Japanese ATMs?",
    a: "No — Japanese ATMs require a physical card. However, Apple Pay and Google Pay work at many contactless payment terminals in convenience stores, supermarkets, and chain restaurants. For ATM withdrawals specifically, you'll need a physical card.",
  },
  {
    q: "What should I do if the ATM declines my card?",
    a: "First, try a different ATM — 7-Eleven ATMs are the most consistently compatible with foreign cards. Check that your card's PIN is 4 digits (some cards with 5- or 6-digit PINs fail at Japanese ATMs). Contact your bank to confirm the card isn't blocked for overseas use. As a last resort, Citibank branches (or former Citibank ATMs now operated by SMBC) also accept foreign Visa and Mastercard.",
  },
];

const tips = [
  "Withdraw cash at the airport on arrival — 7-Eleven ATMs operate in most major airports, and you'll want cash immediately for transport and tips.",
  "Avoid withdrawing in very small amounts — the ¥110–¥220 ATM fee is the same regardless of the amount withdrawn. Withdraw ¥20,000–¥30,000 at a time to minimise the per-note fee cost.",
  "Save the ATM receipt — it shows the exact exchange rate applied, useful for expense tracking and confirming your bank's conversion rate.",
  "Rural Japan has fewer ATMs — stock up on cash in cities before heading to rural areas, mountain towns, or smaller islands. Convenience store coverage drops significantly outside urban centres.",
];

export default function AtmsInJapanPage() {
  return (
    <>
      <Head>
        <title>ATMs in Japan 2026: Which Accept Foreign Cards | Japan Travel Kit</title>
        <meta
          name="description"
          content="Most Japanese ATMs don't accept foreign cards. We explain which ones do — 7-Eleven, Japan Post, AEON — and how to avoid fees and withdrawal limits."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/money/atms-in-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="ATMs in Japan 2026: Which Accept Foreign Cards | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/money/atms-in-japan" />
        <meta property="og:description" content="Most Japanese ATMs don't accept foreign cards. We explain which ones do — 7-Eleven, Japan Post, AEON — and how to avoid fees and withdrawal limits." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ATMs in Japan 2026: Which Accept Foreign Cards | Japan Travel Kit" />
        <meta name="twitter:description" content="Most Japanese ATMs don't accept foreign cards. We explain which ones do — 7-Eleven, Japan Post, AEON — and how to avoid fees and withdrawal limits." />
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
              headline: "ATMs in Japan (2026): Where to Find Them & How to Use Them",
              dateModified: "2026-04-26",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "ATMs in Japan", item: "https://japan-travel-kit.com/guides/money/atms-in-japan" },
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>ATMs in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🏧</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            ATMs in Japan (2026):<br />Where to Find Them &amp; How to Use Them
          </h1>
          <p className={styles.heroSubtitle}>
            Most Japanese ATMs don&apos;t accept foreign cards. We explain which ones do,
            how to avoid fees, and exactly what to do at the machine.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "7-Eleven & Japan Post", "Fee Guide Included"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Most Reliable</p>
                <p className={styles.verdictStatValue}>7-Eleven ATM</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Available 24 Hours</p>
                <p className={styles.verdictStatValue}>Yes (nationwide)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ATM Fee</p>
                <p className={styles.verdictStatValue}>¥110–¥220</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Use 7-Eleven ATMs first.</strong> They accept the widest range of foreign cards,
              operate 24 hours, and have English-language interfaces.
              Japan Post ATMs are a reliable backup during post office hours.
            </p>
          </div>
        </div>

        {/* ATM Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Which Japanese ATMs Accept Foreign Cards?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ATM", "Hours", "Foreign Cards", "Languages", "Max Withdrawal"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {atmComparison.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ minWidth: "160px" }}>{row.name}</td>
                      <td style={{ fontSize: "0.83rem", whiteSpace: "nowrap" }}>{row.availability}</td>
                      <td>
                        {row.foreign === "Yes"
                          ? <span style={{ color: "#16a34a", fontWeight: 700 }}>✓ Yes</span>
                          : row.foreign === "Rarely"
                          ? <span style={{ color: "#dc2626", fontWeight: 700 }}>✗ No</span>
                          : <span style={{ color: "#d97706", fontWeight: 600 }}>Some</span>
                        }
                      </td>
                      <td style={{ fontSize: "0.8rem" }}>{row.languages}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7-Eleven ATM */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Best option</span>
          <h2 className={styles.sectionTitle}>7-Eleven ATMs (Seven Bank)</h2>
          <p className={styles.bodyText}>
            Seven Bank ATMs — found inside every 7-Eleven convenience store in Japan — are the single
            most reliable option for foreign card withdrawals. They accept Visa, Mastercard, Maestro,
            UnionPay, American Express, Diners Club, and several other networks.
          </p>
          <p className={styles.bodyText}>
            The English interface is clear and well-designed. After selecting English on the first screen,
            you&apos;ll be guided through the withdrawal process step by step. Machines dispense cash
            quickly and return your card before handing over the notes — a small but important
            design choice that prevents cards from being left behind.
          </p>
          <p className={styles.bodyText}>
            7-Eleven stores are open 24 hours and are found throughout Japan — not just in cities,
            but in smaller towns along major tourist routes. The ATM fee is ¥110–¥220 per transaction,
            depending on the time of day and your card type.
          </p>
        </section>

        {/* Japan Post ATM */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Backup option</span>
          <h2 className={styles.sectionTitle}>Japan Post Bank ATMs</h2>
          <p className={styles.bodyText}>
            Japan Post Bank ATMs are available at all post offices and some train stations.
            They accept a wide range of international cards via the Visa, Mastercard, Maestro,
            Cirrus, and Plus networks. The maximum withdrawal is typically ¥100,000 per transaction —
            higher than 7-Eleven&apos;s ¥50,000 limit.
          </p>
          <p className={styles.bodyText}>
            The main limitation is availability: Japan Post ATMs operate during post office hours
            (generally 9am–6pm on weekdays, limited hours on weekends) rather than around the clock.
            Some Japan Post ATMs at major stations and tourist areas have extended hours,
            but this varies by location.
          </p>
          <p className={styles.bodyText}>
            There is no ATM fee during regular business hours. A ¥110 fee applies for evening and
            weekend access where extended hours are available.
          </p>
        </section>

        {/* How to Use */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step by step</span>
          <h2 className={styles.sectionTitle}>How to Use a Japanese ATM</h2>
          <div className={styles.stepsList}>
            {howToUseSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fees & Limits */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Costs</span>
          <h2 className={styles.sectionTitle}>ATM Fees &amp; Withdrawal Limits</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Fee / Limit", "Details"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feesAndLimits.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap", minWidth: "200px" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            For cards with ATM fee reimbursement (e.g. Charles Schwab, some Wise plans),
            the Seven Bank fee is refunded by your home bank — making the effective withdrawal cost ¥0.
            See our{" "}
            <Link href="/guides/money/best-travel-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              Best Travel Card for Japan guide
            </Link>{" "}
            for the full comparison.
          </p>
        </section>

        {/* Tips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tips</span>
          <h2 className={styles.sectionTitle}>Tips for Getting Cash in Japan</h2>
          <ul className={styles.bodyList}>
            {tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
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
                  <line x1="7" y1="15" x2="12" y2="15" />
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
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                  <line x1="14" y1="15" x2="17" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Card for Japan (2026): Top Picks for Foreign Visitors</p>
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
          </div>
        </section>
      </div>
    </>
  );
}
