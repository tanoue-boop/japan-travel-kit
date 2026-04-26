import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const whatToLookFor = [
  {
    rank: 1,
    name: "No foreign transaction fees",
    desc: "Many standard credit and debit cards charge 1–3% on every purchase abroad. Over a two-week trip, this adds up fast. Only use cards that waive foreign transaction fees entirely.",
  },
  {
    rank: 2,
    name: "Real exchange rates (interbank or mid-market)",
    desc: "Banks and currency exchange desks typically mark up the exchange rate by 2–4%. The best travel cards use the mid-market rate — the rate you see on Google — so you always know exactly what you're paying.",
  },
  {
    rank: 3,
    name: "ATM access without surcharges",
    desc: "Japan is still heavily cash-based. Your card needs to work at Japanese ATMs (7-Eleven, Japan Post, AEON) without charging extra. Some cards also reimburse third-party ATM fees — a significant bonus.",
  },
  {
    rank: 4,
    name: "Chip-and-PIN and contactless support",
    desc: "Japanese card terminals overwhelmingly use chip-and-PIN. Magstripe-only cards are often declined. Ensure your card has an EMV chip. Contactless (Visa/Mastercard tap) is growing but not yet universal.",
  },
];

const bestCards = [
  {
    name: "Wise (formerly TransferWise)",
    badge: "Best Overall",
    badgeColor: "#16a34a",
    pros: [
      "Mid-market exchange rate with a small, transparent conversion fee (~0.5–1.5%)",
      "Fee-free ATM withdrawals up to ¥75,000/month (approx.)",
      "Holds multiple currencies — convert before you travel to lock in a rate",
      "Works at all major Japanese ATM networks (7-Eleven, Japan Post, AEON)",
    ],
    cons: [
      "ATM fee applies above the monthly free allowance (~1.75% thereafter)",
      "Requires a smartphone app for setup and management",
      "Not a credit card — no purchase protection or rewards points",
    ],
    verdict: "Wise is our top pick for most travellers. The exchange rate is consistently better than any high-street bank, ATM access is reliable across Japan, and the app makes it easy to track spending in real time.",
  },
  {
    name: "Revolut",
    badge: "Best for Frequent Travellers",
    badgeColor: "#2563eb",
    pros: [
      "Mid-market rate on weekdays (a small markup applies on weekends)",
      "Free ATM withdrawals up to a monthly limit (limit varies by plan tier)",
      "Instant spend notifications and easy card freeze via the app",
      "Premium and Metal plans offer higher ATM limits and travel insurance",
    ],
    cons: [
      "Weekend exchange rate is marked up ~0.5–1% compared to weekday rate",
      "Free plan has a lower ATM allowance than Wise",
      "Some users report occasional card declines in rural Japan",
    ],
    verdict: "Revolut is a strong alternative — particularly the paid plans, which offer higher ATM limits and additional travel perks. The weekend markup is a minor trade-off for most trips.",
  },
  {
    name: "Charles Schwab Investor Checking (US only)",
    badge: "Best for US Travellers",
    badgeColor: "#7c3aed",
    pros: [
      "Unlimited ATM fee reimbursements worldwide, including Japan",
      "No foreign transaction fees on any purchase",
      "No monthly fees, no minimum balance requirement",
      "Uses the Visa exchange rate — competitive and consistent",
    ],
    cons: [
      "Available to US residents only",
      "No physical branches outside the US — app-based management",
      "Linked to a brokerage account (minor setup step)",
    ],
    verdict: "For US travellers, Charles Schwab is the gold standard. Unlimited ATM fee reimbursements mean you never pay an extra yen at a 7-Eleven ATM — a significant advantage in a cash-heavy country like Japan.",
  },
  {
    name: "Starling Bank / Monzo (UK only)",
    badge: "Best for UK Travellers",
    badgeColor: "#0891b2",
    pros: [
      "Both use the Mastercard exchange rate with no additional markup",
      "No foreign transaction fees on purchases",
      "Fee-free ATM withdrawals abroad up to monthly limits",
      "User-friendly apps with instant spend notifications",
    ],
    cons: [
      "Monthly ATM allowance applies — check your plan before you go",
      "UK residents only",
      "No ATM fee reimbursements for third-party charges",
    ],
    verdict: "UK travellers should hold either Starling or Monzo as their primary Japan card. Both offer genuinely fee-free spending abroad. Starling has a slight edge on ATM limits; Monzo has a better budgeting interface.",
  },
];

const cardsToAvoid = [
  { card: "Standard high-street bank cards", reason: "Typically charge 1.5–3% foreign transaction fees plus unfavourable exchange rates. Fine as a backup, not as a primary card." },
  { card: "Pre-paid travel money cards (e.g. Caxton, Travelex)", reason: "Often lock in poor exchange rates when you load the card. Wise and Revolut offer better rates with more flexibility." },
  { card: "Airport currency exchange desks", reason: "Not a card, but frequently used as an alternative. Rates are consistently 5–10% worse than mid-market. Avoid entirely." },
];

const howToUseSteps = [
  {
    title: "Set up and fund your card before you fly",
    desc: "Don't wait until the airport — app-based cards can take 3–7 business days to arrive by post. Load some yen-equivalent balance before departing; Wise lets you hold and convert at the mid-market rate before you travel.",
  },
  {
    title: "Always pay in Japanese yen (JPY)",
    desc: "At payment terminals, you may be offered a choice between paying in yen or your home currency (Dynamic Currency Conversion). Always choose yen. DCC rates are set by the merchant and are typically 3–5% worse than your card's rate.",
  },
  {
    title: "Use 7-Eleven or Japan Post ATMs for cash",
    desc: "These are the most reliable ATM networks for foreign cards in Japan. 7-Eleven ATMs are available 24 hours. Japan Post Bank ATMs work during post office hours and some have extended evening access. Both accept Visa, Mastercard, and Maestro.",
  },
  {
    title: "Keep a backup card and some emergency cash",
    desc: "Even the best travel cards occasionally experience technical issues or unexpected blocks. Carry a second card from a different network (e.g. a Visa and a Mastercard), plus ¥10,000–¥20,000 in cash for areas where cards are not accepted.",
  },
];

const faqItems = [
  {
    q: "Can I use a credit card in Japan?",
    a: "Yes — credit cards are accepted at most hotels, department stores, convenience stores, chain restaurants, and tourist-facing businesses. However, many smaller restaurants, local cafes, temples, and market vendors are cash only. Always carry ¥10,000–¥20,000 in cash as a backup, even if you plan to pay by card wherever possible.",
  },
  {
    q: "Which is better for Japan — Wise or Revolut?",
    a: "Wise is slightly better for most travellers: it uses the mid-market rate every day of the week (Revolut adds a small markup on weekends) and offers a more generous free ATM allowance by default. However, Revolut's paid plans can match or exceed Wise for heavy ATM users. Both are significantly better than a standard bank card.",
  },
  {
    q: "Do I need to notify my bank before travelling to Japan?",
    a: "For dedicated travel cards (Wise, Revolut, Starling, Monzo), no notification is needed — they're designed for international use. For standard bank cards, it's worth checking with your bank, as some institutions block overseas transactions without advance notice. A travel notification usually takes 2–3 minutes via your bank's app or phone line.",
  },
  {
    q: "Is it safe to use contactless cards in Japan?",
    a: "Yes. Contactless terminals are increasingly common at convenience stores (7-Eleven, Lawson, FamilyMart), major chain restaurants, and transport hubs. However, chip-and-PIN remains the dominant method at supermarkets, smaller shops, and restaurants. Ensure your card supports both.",
  },
  {
    q: "How much yen should I withdraw at a Japanese ATM?",
    a: "A useful rule of thumb: budget ¥5,000–¥10,000 per day in cash for meals, transport, and small purchases, then top up as needed. Withdrawing in larger amounts reduces the relative impact of any per-transaction fees. Most Japanese ATMs have a single withdrawal limit of around ¥50,000–¥100,000.",
  },
];

export default function BestTravelCardJapanPage() {
  return (
    <>
      <Head>
        <title>Best Travel Card for Japan 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Which travel card is best for Japan? We compare Wise, Revolut, Charles Schwab and more — no foreign transaction fees, real exchange rates, ATM access."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/money/best-travel-card-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best Travel Card for Japan 2026 | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/money/best-travel-card-japan" />
        <meta property="og:description" content="Which travel card is best for Japan? We compare Wise, Revolut, Charles Schwab and more — no foreign transaction fees, real exchange rates, ATM access." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Travel Card for Japan 2026 | Japan Travel Kit" />
        <meta name="twitter:description" content="Which travel card is best for Japan? We compare Wise, Revolut, Charles Schwab and more — no foreign transaction fees, real exchange rates, ATM access." />
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
              headline: "Best Travel Card for Japan (2026): Top Picks for Foreign Visitors",
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
                { "@type": "ListItem", position: 4, name: "Best Travel Card for Japan", item: "https://japan-travel-kit.com/guides/money/best-travel-card-japan" },
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
          <span className={styles.breadCurrent}>Best Travel Card</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>💳</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Best Travel Card for Japan (2026):<br />Top Picks for Foreign Visitors
          </h1>
          <p className={styles.heroSubtitle}>
            Japan is still heavily cash-based — but the right card saves you real money on
            exchange rates and ATM fees. We compared the top options for US, UK, and international travellers.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Wise & Revolut Compared", "ATM Tips Included"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Best Overall</p>
                <p className={styles.verdictStatValue}>Wise</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for US Travellers</p>
                <p className={styles.verdictStatValue}>Charles Schwab</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for UK Travellers</p>
                <p className={styles.verdictStatValue}>Starling / Monzo</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Key rule:</strong> Always pay in <strong>Japanese yen (JPY)</strong> at terminals —
              never accept Dynamic Currency Conversion (DCC). And always carry some cash:
              many restaurants, temples, and local shops are still cash only.
            </p>
          </div>
        </div>

        {/* What to Look For */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Criteria</span>
          <h2 className={styles.sectionTitle}>What to Look For in a Japan Travel Card</h2>
          <div className={styles.stepsList}>
            {whatToLookFor.map((item) => (
              <div key={item.rank} className={styles.stepCard}>
                <span className={styles.stepNum}>{item.rank}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.name}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Cards */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Our picks</span>
          <h2 className={styles.sectionTitle}>Best Travel Cards for Japan</h2>

          {bestCards.map((card) => (
            <div key={card.name} className={styles.providerBlock}>
              <div className={styles.providerHeader}>
                <h3 className={styles.providerName}>{card.name}</h3>
                <span
                  className={styles.providerBadge}
                  style={{ background: card.badgeColor }}
                >
                  {card.badge}
                </span>
              </div>
              <div className={styles.pickGrid}>
                <div className={styles.pickPros}>
                  <p className={styles.pickListLabel}>Pros</p>
                  <ul className={styles.pickList}>
                    {card.pros.map((p) => (
                      <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.pickCons}>
                  <p className={styles.pickListLabel}>Cons</p>
                  <ul className={styles.pickList}>
                    {card.cons.map((c) => (
                      <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className={styles.bodyText} style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                <strong>Our verdict:</strong> {card.verdict}
              </p>
            </div>
          ))}
        </section>

        {/* Cards to Avoid */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Watch out</span>
          <h2 className={styles.sectionTitle}>Cards and Options to Avoid</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Card / Method", "Why to Avoid"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cardsToAvoid.map((row) => (
                    <tr key={row.card}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.card}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>How to Use Your Travel Card in Japan</h2>
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

        {/* Do I Still Need Cash? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Cash vs card</span>
          <h2 className={styles.sectionTitle}>Do I Still Need Cash in Japan?</h2>
          <p className={styles.bodyText}>
            Yes — even in 2026. Japan has made significant progress toward a cashless society,
            but cash remains essential for many situations:
          </p>
          <ul className={styles.bodyList}>
            <li>Most small restaurants, ramen shops, and izakayas are cash only</li>
            <li>Temple entrance fees, shrine offerings, and vending machines require coins and notes</li>
            <li>Many rural areas and smaller towns have limited card acceptance</li>
            <li>Some budget accommodation and guesthouses still prefer cash payment</li>
          </ul>
          <p className={styles.bodyText}>
            A practical approach: withdraw ¥20,000–¥30,000 at a 7-Eleven or Japan Post ATM on arrival
            and keep it as a running cash reserve. Top up as needed. Your travel card handles hotels,
            chain restaurants, and convenience stores; cash covers everything else.
          </p>
          <p className={styles.bodyText}>
            For a full breakdown of where cards work and where they don&apos;t, see our{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              Cash vs Card in Japan guide
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
