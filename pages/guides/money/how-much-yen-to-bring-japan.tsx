import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const dailyTable = [
  { category: "Accommodation", budget: "¥3,000",  mid: "¥10,000", comfort: "¥20,000" },
  { category: "Food",          budget: "¥1,500",  mid: "¥4,000",  comfort: "¥8,000"  },
  { category: "Transport",     budget: "¥500",    mid: "¥1,500",  comfort: "¥3,000"  },
  { category: "Activities",    budget: "¥500",    mid: "¥2,000",  comfort: "¥5,000"  },
  { category: "Total / day",   budget: "¥5,500",  mid: "¥17,500", comfort: "¥36,000" },
];

const tripLengthTable = [
  { trip: "3 days",  budget: "¥15,000", mid: "¥50,000",  comfort: "¥100,000" },
  { trip: "7 days",  budget: "¥35,000", mid: "¥120,000", comfort: "¥250,000" },
  { trip: "14 days", budget: "¥70,000", mid: "¥240,000", comfort: "¥500,000" },
];

const faqItems = [
  {
    q: "How much yen should I bring for 2 weeks in Japan?",
    a: "It depends on your travel style. Budget travellers can manage with around ¥70,000 in cash for 14 days, mid-range travellers should plan for ¥240,000 total spending (though much can go on card), and comfortable travellers up to ¥500,000. You don't need to carry all of it as cash — bring ¥30,000–¥50,000 to start and top up from 7-Eleven ATMs as you go.",
  },
  {
    q: "Can I use my card everywhere in Japan?",
    a: "No. While cards are accepted at hotels, convenience stores, department stores, and major attractions, many small restaurants, temples, shrines, market stalls, and rural businesses are still cash-only. Always carry at least ¥10,000 in cash as a backup, even if you plan to pay by card most of the time.",
  },
  {
    q: "Is it better to get yen before or after arriving in Japan?",
    a: "After. Exchange rates at your home bank and at Japanese airport counters are usually poor. The best approach is to withdraw yen from a 7-Eleven ATM after you arrive — they accept foreign cards and offer near-market rates. A small amount (¥10,000–¥20,000) exchanged before you fly is fine for peace of mind, but don't exchange large sums in advance.",
  },
  {
    q: "How much cash do I need per day in Japan?",
    a: "Budget travellers typically spend ¥5,000–¥8,000 per day, mid-range travellers ¥10,000–¥15,000, and comfortable travellers ¥20,000–¥30,000. Not all of that needs to be cash — but plan to have at least a few thousand yen on hand each day for cash-only restaurants, temples, and small shops.",
  },
  {
    q: "What is the best way to carry money in Japan?",
    a: "A combination works best: a travel card like Wise or Revolut for card payments and fee-free ATM withdrawals, plus enough physical cash for daily cash-only spending. Keep an emergency ¥10,000 note separate from your main wallet, and load an IC card (Suica/Pasmo) to handle small purchases and transport without fumbling for coins.",
  },
];

export default function HowMuchYenToBringPage() {
  const metaTitle = "How Much Yen to Bring to Japan 2026: Realistic Guide | Japan Travel Kit";
  const metaDescription =
    "How much yen do you need for Japan? We break down daily cash needs for budget, mid-range, and comfortable travellers — with totals by trip length.";
  const canonical = "https://www.japan-travel-kit.com/guides/money/how-much-yen-to-bring-japan";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:url" content={canonical} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "How Much Yen to Bring", item: "https://www.japan-travel-kit.com/guides/money/how-much-yen-to-bring-japan" },
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
              headline: "How Much Yen to Bring to Japan (2026): A Realistic Guide",
              dateModified: "2026-06-02",
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
          <span className={styles.breadCurrent}>How Much Yen to Bring</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>💴</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            How Much Yen to Bring to Japan (2026):<br />A Realistic Guide
          </h1>
          <p className={styles.heroSubtitle}>
            Bringing too little cash causes stress.
            Bringing too much means carrying it home.
            Here&apos;s exactly how much yen to prepare for your trip.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "All Budgets", "2026 Prices"].map((t) => (
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
            <strong>Affiliate disclosure:</strong> Some links on this page may be affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our advice.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Cash per day</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Budget Traveller</p>
                <p className={styles.verdictStatValue}>¥5,000–¥8,000 / day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Mid-Range</p>
                <p className={styles.verdictStatValue}>¥10,000–¥15,000 / day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Comfortable</p>
                <p className={styles.verdictStatValue}>¥20,000–¥30,000 / day</p>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", marginTop: "0.75rem", marginBottom: 0 }}>
              <strong style={{ color: "#fbbf24" }}>Always bring some cash:</strong> a minimum of ¥10,000 on hand, even if you plan to pay by card.
            </p>
          </div>
        </div>

        {/* Daily Cash Needs */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Daily Budget</span>
          <h2 className={styles.sectionTitle}>Daily Cash Needs by Travel Style</h2>
          <p className={styles.bodyText}>
            How much you spend each day in Japan depends almost entirely on your travel style. Here&apos;s a
            realistic breakdown across the three most common budgets — from backpacker to comfortable:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Budget</th>
                    <th>Mid-range</th>
                    <th>Comfortable</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyTable.map((row) => (
                    <tr key={row.category} style={row.category.startsWith("Total") ? { fontWeight: 700 } : {}}>
                      <td className={styles.ftFeature}>{row.category}</td>
                      <td className={styles.ftEsim}>{row.budget}</td>
                      <td className={styles.ftSim}>{row.mid}</td>
                      <td className={styles.tdPrice}>{row.comfort}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Remember: not all of this needs to be cash. Accommodation and many activities can go on a card —
            but food at small restaurants, temple fees, and local transport often can&apos;t.
          </p>
        </section>

        {/* By Trip Length */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Trip Totals</span>
          <h2 className={styles.sectionTitle}>How Much Cash by Trip Length</h2>
          <p className={styles.bodyText}>
            Scaling the daily figures up gives you a rough total to plan around. These are total spending
            estimates — you&apos;ll put much of the mid-range and comfortable figures on card, withdrawing
            cash as needed:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Trip</th>
                    <th>Budget</th>
                    <th>Mid-range</th>
                    <th>Comfortable</th>
                  </tr>
                </thead>
                <tbody>
                  {tripLengthTable.map((row) => (
                    <tr key={row.trip}>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.trip}</td>
                      <td className={styles.ftEsim}>{row.budget}</td>
                      <td className={styles.ftSim}>{row.mid}</td>
                      <td className={styles.tdPrice}>{row.comfort}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>In practice:</strong> carry ¥30,000–¥50,000 in cash to start your trip, then top up from
            7-Eleven ATMs every few days. There&apos;s no need — and no benefit — to carrying your entire
            budget in notes.
          </p>
        </section>

        {/* Where you must use cash */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Cash Only</span>
          <h2 className={styles.sectionTitle}>Where You Must Use Cash</h2>
          <p className={styles.bodyText}>
            Japan is modernising fast, but plenty of places still take cash and nothing else. Always keep
            notes on hand for these:
          </p>
          <ul className={styles.bodyList}>
            <li>Small restaurants, teishoku diners, and ramen shops (especially ticket-machine counters)</li>
            <li>Temple and shrine entry fees</li>
            <li>Street-food stalls and local markets</li>
            <li>Rural areas and countryside guesthouses</li>
            <li>Some taxis, particularly outside major cities</li>
          </ul>
        </section>

        {/* Where cards work fine */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Card Friendly</span>
          <h2 className={styles.sectionTitle}>Where Cards Work Fine</h2>
          <p className={styles.bodyText}>
            Card acceptance has improved dramatically in recent years. You can comfortably pay by card at:
          </p>
          <ul className={styles.bodyList}>
            <li>Hotels and ryokan</li>
            <li>Convenience stores (7-Eleven, Lawson, FamilyMart)</li>
            <li>Department stores and chain shops</li>
            <li>Major tourist attractions and their ticket counters</li>
          </ul>
          <p className={styles.bodyText}>
            For the best card to use abroad, see our guide to the{" "}
            <Link href="/guides/money/best-travel-card-japan" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              best travel cards for Japan
            </Link>.
          </p>
        </section>

        {/* Best ways to get yen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting Yen</span>
          <h2 className={styles.sectionTitle}>Best Ways to Get Yen</h2>
          <ul className={styles.bodyList}>
            <li><strong>7-Eleven ATMs</strong> — the safest, most reliable option. They&apos;re everywhere, accept foreign cards, have English menus, and offer near-market rates.</li>
            <li><strong>A Wise (or similar) card</strong> — lets you withdraw with minimal fees and excellent exchange rates, and pay directly in shops that take cards.</li>
            <li><strong>Avoid airport exchange counters</strong> — convenient, but the rates are consistently among the worst you&apos;ll find.</li>
          </ul>
          <p className={styles.bodyText}>
            For a deeper look at rates and fees, read our{" "}
            <Link href="/guides/money/currency-exchange-japan" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              currency exchange guide
            </Link>{" "}
            and our rundown of{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              which ATMs accept foreign cards
            </Link>.
          </p>
        </section>

        {/* Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Travel Tips</span>
          <h2 className={styles.sectionTitle}>Tips for Managing Cash in Japan</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 12h.01M18 12h.01" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Keep an emergency note</p>
              <p className={styles.whoForDesc}>
                Stash a ¥10,000 note separate from your main wallet. If your card fails or an ATM is down,
                you&apos;ll always have a fallback for food and transport.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h2" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Load an IC card</p>
              <p className={styles.whoForDesc}>
                Top up a Suica or Pasmo to pay for transport and small purchases. It clears your pockets of
                coins and works at most convenience stores too.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v10M9 9.5h4a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3h4" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Break ¥10,000 notes early</p>
              <p className={styles.whoForDesc}>
                Large notes can be awkward at small shops and stalls. Break them at a convenience store or
                station early in the day so you always have smaller bills and coins.
              </p>
            </div>
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

        {/* Related Articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related Guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/atms-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="3" width="12" height="18" rx="2" /><path d="M9 7h6M9 11h6" /><circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>ATMs in Japan (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/currency-exchange-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h14l-3-3M21 16H7l3 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Currency Exchange in Japan (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/money" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Compare Japan Money Options</p>
                <span className={styles.relatedArrow}>View comparison →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Sort out your money before you fly</h2>
            <p className={styles.ctaBannerDesc}>
              The right travel card saves you money on every purchase and ATM withdrawal in Japan.
              See our top picks for foreign visitors.
            </p>
            <Link href="/guides/money/best-travel-card-japan" className={styles.ctaBannerBtn}>
              Read the Best Travel Card Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
