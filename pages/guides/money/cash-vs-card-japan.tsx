import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const placeRows = [
  { place: "Convenience stores (7-Eleven, FamilyMart, Lawson)", cash: "✓", card: "✓" },
  { place: "Department stores & shopping malls", cash: "✓", card: "✓" },
  { place: "Supermarkets", cash: "✓", card: "Usually" },
  { place: "Chain restaurants (McDonald's, Yoshinoya, etc.)", cash: "✓", card: "✓" },
  { place: "Small / local restaurants", cash: "✓", card: "Often cash only" },
  { place: "Izakayas (Japanese pubs)", cash: "✓", card: "Often cash only" },
  { place: "Vending machines", cash: "✓", card: "IC card (Suica / Pasmo)" },
  { place: "Shinkansen tickets (at counter)", cash: "✓", card: "✓" },
  { place: "Taxis", cash: "✓", card: "Usually" },
  { place: "Temples & shrines", cash: "Required", card: "✗" },
  { place: "Street food & festival stalls", cash: "Required", card: "✗" },
  { place: "Ryokan (traditional inn)", cash: "Usually required", card: "Sometimes" },
];

const atmGuide = [
  {
    rank: 1,
    name: "7-Bank ATM (inside 7-Eleven)",
    desc: "The #1 recommendation for foreign visitors. 7-Bank ATMs accept virtually all foreign Visa, Mastercard, Amex, and Maestro cards. Open 24/7, English menu available. Found at every 7-Eleven convenience store across Japan — there are over 21,000 of them.",
  },
  {
    rank: 2,
    name: "Japan Post Bank ATM (郵便局 / ゆうちょ)",
    desc: "Available at post offices across Japan, including rural areas. Accepts international cards from most networks. English interface available. Hours are typically 9am–5pm on weekdays, with some 24/7 locations in major cities.",
  },
  {
    rank: 3,
    name: "AEON Bank ATM",
    desc: "Found inside AEON supermarkets and malls. Accept international cards and are often open late (many 24/7). A reliable option in suburban and rural areas where 7-Elevens are less common.",
  },
];

const cashPros = [
  "Works everywhere — no exceptions",
  "No foreign transaction fees at point of payment",
  "Vending machines, temples, and street food require it",
  "Tipping isn't a thing in Japan — exact change is appreciated",
];

const cashCons = [
  "ATM withdrawal fees ($2–$5 per transaction, depending on your bank)",
  "Need to plan ahead for withdrawals",
  "Risk if lost or stolen — no chargeback",
  "Carrying large amounts can feel uncomfortable",
];

const cardPros = [
  "Accepted at all major chains and department stores",
  "No need to carry large amounts of cash",
  "Travel cards (Wise, Revolut) offer near-interbank exchange rates",
  "Suica IC card loaded via Apple Pay / Google Pay works on trains",
];

const cardCons = [
  "Many small restaurants, izakayas, and rural spots are cash only",
  "Some cards charge 2–3% foreign transaction fees",
  "ATM withdrawals carry a fee (¥110–¥220 per transaction)",
  "Chip-and-PIN may be required at some terminals",
];

const faqItems = [
  {
    q: "Do I need cash in Japan?",
    a: "Yes — Japan is still significantly more cash-dependent than most developed countries. While card acceptance has improved, especially after the 2020 Olympics push, many local restaurants, izakayas, shrines, temples, street food stalls, and ryokan still require cash. The safe approach: always carry at least ¥10,000–¥20,000 on you.",
  },
  {
    q: "How much cash should I bring to Japan?",
    a: "A good rule of thumb is ¥5,000–¥10,000 per day for meals and incidentals, plus a buffer for cash-only experiences. For a 10-day trip, having ¥50,000–¥100,000 available (either brought as foreign currency or withdrawn from ATMs) is a reasonable range. Don't arrive with nothing — exchange rates at airports are poor, and ATMs may have per-transaction limits.",
  },
  {
    q: "Which ATMs accept foreign cards in Japan?",
    a: "7-Bank ATMs (in 7-Eleven), Japan Post Bank ATMs, and AEON Bank ATMs are the most reliable for foreign Visa, Mastercard, and Amex cards. Avoid regular Japanese bank ATMs (e.g., Mizuho, SMBC, Resona) as most do not accept foreign cards. 7-Bank is the most widely accessible — there's a 7-Eleven on almost every urban street corner in Japan.",
  },
  {
    q: "Does Japan prefer Visa or Mastercard?",
    a: "Both Visa and Mastercard are widely accepted where cards are accepted at all. Amex and Discover have lower acceptance rates. For ATMs, Visa tends to have the broadest compatibility, though Mastercard works well too. JCB is Japan's domestic card network and works everywhere, but it's not issued internationally to most travellers.",
  },
  {
    q: "What are the best travel cards for Japan?",
    a: "Wise (formerly TransferWise) and Revolut are consistently recommended for Japan travel. Both offer near-interbank exchange rates with low or no foreign transaction fees. Charles Schwab's investor checking account (for US residents) offers full ATM fee reimbursement worldwide. Avoid standard bank credit cards that charge 2–3% foreign transaction fees — the savings on a 2-week trip can be significant.",
  },
];

export default function CashVsCardJapanPage() {
  return (
    <>
      <Head>
        <title>Cash vs Card in Japan 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Japan is still cash-heavy — but cards work in more places than you'd think. Which ATMs accept foreign cards, where cash is required, and how to avoid fees."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/money/cash-vs-card-japan" />
        <meta property="og:title" content="Cash vs Card in Japan 2026 | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/money/cash-vs-card-japan" />
        <meta property="og:description" content="Japan is still cash-heavy — but cards work in more places than you'd think. Which ATMs accept foreign cards, where cash is required, and how to avoid fees." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cash vs Card in Japan 2026 | Japan Travel Kit" />
        <meta name="twitter:description" content="Japan is still cash-heavy — but cards work in more places than you'd think. Which ATMs accept foreign cards, where cash is required, and how to avoid fees." />
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
              headline: "Cash vs Card in Japan (2026): What Actually Works?",
              dateModified: "2026-04-24",
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
          <span className={styles.breadCurrent}>Cash vs Card</span>
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
            Cash vs Card in Japan (2026):<br />What Actually Works?
          </h1>
          <p className={styles.heroSubtitle}>
            Japan is more cash-dependent than most countries — but cards work
            in far more places than they used to.
            Here&apos;s exactly where to use each, and how to avoid paying unnecessary fees.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "All Major Payment Types", "ATM Guide Included"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our recommendations.{" "}
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
                <p className={styles.verdictStatLabel}>Always Carry Cash</p>
                <p className={styles.verdictStatValue}>¥20,000–¥30,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best ATM for Foreigners</p>
                <p className={styles.verdictStatValue}>7-Bank (7-Eleven)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Travel Card</p>
                <p className={styles.verdictStatValue}>Wise / Revolut</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> Bring both. Use a low-fee travel card for department stores, chains, and online bookings.
              Keep cash for local restaurants, izakayas, shrines, temples, vending machines, and anything off the tourist trail.
            </p>
          </div>
        </div>

        {/* Where cash and cards work */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At a glance</span>
          <h2 className={styles.sectionTitle}>Where Cash vs Card Works in Japan</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Where</th>
                    <th>Cash</th>
                    <th>Card</th>
                  </tr>
                </thead>
                <tbody>
                  {placeRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider}>{row.place}</td>
                      <td style={{ fontWeight: 700, color: row.cash === "Required" ? "#c62828" : row.cash === "✓" ? "#22c55e" : "#78716c" }}>{row.cash}</td>
                      <td style={{ fontWeight: 600, color: row.card === "✓" ? "#22c55e" : row.card === "✗" ? "#c62828" : "#78716c" }}>{row.card}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Card acceptance has improved significantly since 2020, but smaller and traditional establishments remain predominantly cash-only.
            When in doubt, ask before ordering.
          </p>
        </section>

        {/* Cash reality */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The reality</span>
          <h2 className={styles.sectionTitle}>Why Japan Is Still a Cash Society</h2>
          <p className={styles.bodyText}>
            Japan ranks among the most cash-reliant developed countries in the world.
            Surveys consistently show that a large share of Japanese transactions — especially outside major cities — are settled in cash.
            This isn&apos;t just inertia: many small business owners prefer cash to avoid card terminal fees (which in Japan can run 3–5% per transaction for merchants).
          </p>
          <p className={styles.bodyText}>
            The COVID era and the 2020 Olympics accelerated contactless adoption, and you&apos;ll now find card terminals at nearly all convenience stores, department stores, and chain restaurants.
            But step off the tourist trail — into a neighbourhood izakaya, a roadside ramen shop, a rural onsen, or a rural temple — and cash remains king.
          </p>
          <p className={styles.bodyText}>
            <strong>The safe rule:</strong> always keep at least ¥10,000–¥20,000 on your person.
            You will use it, and the ATMs are good enough that topping up is easy.
          </p>
        </section>

        {/* Pros & Cons: Cash */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>Cash in Japan: Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {cashPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {cashCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pros & Cons: Card */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>Cards in Japan: Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {cardPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {cardCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ATM Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ATM guide</span>
          <h2 className={styles.sectionTitle}>Best ATMs for Foreign Cards in Japan</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            Most Japanese bank ATMs (Mizuho, SMBC, Resona) <strong>do not accept foreign cards</strong>.
            Stick to these three networks — they&apos;re available nationwide and have English interfaces:
          </p>
          <div className={styles.stepsList}>
            {atmGuide.map((atm) => (
              <div key={atm.rank} className={styles.stepCard}>
                <span className={styles.stepNum}>{atm.rank}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{atm.name}</p>
                  <p className={styles.stepDesc}>{atm.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            ATM fees: Japanese ATMs typically charge ¥110–¥220 per transaction. Your home bank may also charge a foreign withdrawal fee.
            Using a Wise or Revolut card can eliminate the home bank fee — you still pay the Japanese ATM fee.
          </p>
        </section>

        {/* Travel card tips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Pro tip</span>
          <h2 className={styles.sectionTitle}>How to Minimise Fees in Japan</h2>
          <p className={styles.bodyText}>
            The most expensive mistake travellers make is using a regular bank card with a 2–3% foreign transaction fee for every purchase, plus $3–$5 per ATM withdrawal.
            On a 2-week Japan trip with daily spending of ¥15,000, those fees can add up to $50–$100 in avoidable costs.
          </p>
          <p className={styles.bodyText}>
            <strong>Wise</strong> and <strong>Revolut</strong> both offer near-interbank exchange rates with zero or minimal foreign transaction fees.
            Load your Wise or Revolut account in your home currency before departure and use it for card payments wherever cards are accepted.
            For ATM withdrawals (you&apos;ll need them), Wise offers up to 2 free ATM withdrawals per month; Revolut offers free withdrawals up to a monthly limit on its free tier.
          </p>
          <p className={styles.bodyText}>
            US travellers: Charles Schwab&apos;s High-Yield Investor Checking account reimburses all ATM fees worldwide — making it the gold standard for international travel cash access.
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
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                  <line x1="9" y1="14" x2="9" y2="14" />
                  <line x1="12" y1="14" x2="12" y2="14" />
                  <line x1="15" y1="14" x2="15" y2="14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-airport-sim-cards" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Airport SIM Cards &amp; eSIMs (2026): What to Know Before You Land</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Get your Japan eSIM sorted too</h2>
            <p className={styles.ctaBannerDesc}>
              While you&apos;re planning your money strategy — don&apos;t forget data.
              Get connected the moment you land with a Japan eSIM from $3.50.
            </p>
            <a
              href="https://airalo.pxf.io/c/7213504/1268485/15608"
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
