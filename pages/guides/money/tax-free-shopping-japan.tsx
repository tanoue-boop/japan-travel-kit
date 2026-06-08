import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const taxFreeStores = [
  { type: "Electronics", examples: "Yodobashi Camera, Bic Camera, Akihabara stores" },
  { type: "Department stores", examples: "Isetan, Takashimaya, Mitsukoshi, Matsuya" },
  { type: "Drugstores", examples: "Matsumoto Kiyoshi, Sundrug, Don Quijote" },
  { type: "Fashion", examples: "UNIQLO, Zara, H&M, Beams, United Arrows" },
  { type: "Convenience stores", examples: "Some 7-Eleven, FamilyMart (larger stores)" },
];

const eligibleItems = [
  { category: "Electronics & cameras", notes: "All electronics qualify — one of the biggest savings categories" },
  { category: "Clothing & fashion", notes: "Any items totalling ¥5,000 or more in one store" },
  { category: "Cosmetics & medicine", notes: "Must be in original packaging; not for use in Japan" },
  { category: "Food & beverages", notes: "Must spend ¥5,000+ and not consume in Japan (sealed)" },
  { category: "Souvenirs & crafts", notes: "Traditional crafts, ceramics, lacquerware all qualify" },
];

const steps = [
  {
    title: "Shop at stores displaying a 'Tax-Free' sign",
    desc: "Look for the blue 'Tax Free' logo at the entrance. Most major retailers, department stores, and drugstores in tourist areas display this. Not every branch of a chain qualifies — check at each location.",
  },
  {
    title: "Spend ¥5,000 or more in a single store",
    desc: "The minimum is ¥5,000 per store visit (before tax). You can combine multiple items purchased in the same store on the same day. Note: this is per-store, not per-trip — you cannot combine purchases from different stores.",
  },
  {
    title: "Show your passport at checkout",
    desc: "You must present your original passport — not a copy, not a photo. The cashier will record your passport number and attach a purchase record sheet to your passport. Carry your passport whenever you plan to shop.",
  },
  {
    title: "Tax is deducted immediately at the register",
    desc: "Unlike some countries where you claim a refund at the airport, Japan deducts the tax at the point of sale. You pay the tax-free price directly. No forms to mail, no queuing at the airport refund counter.",
  },
  {
    title: "Keep all receipts until you leave Japan",
    desc: "Customs may inspect your tax-free purchases on departure. The purchase record attached to your passport will be collected at immigration. Do not open or use tax-free items before you leave Japan — this can result in a penalty.",
  },
];

const rules = [
  {
    title: "Do not open or use tax-free items in Japan",
    desc: "Tax-free goods are exempt on the condition that they will be exported. Opening, using, or wearing a tax-free item before departure invalidates the exemption and can result in customs penalties.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
  {
    title: "Always carry your passport",
    desc: "Tax-free shopping requires your original passport at every store. A photo on your phone is not accepted. If you leave it at the hotel, you will pay full price and cannot retroactively claim the exemption.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <circle cx="12" cy="10" r="3" />
        <path d="M6 18a6 6 0 0 1 12 0" />
      </svg>
    ),
  },
  {
    title: "Customs collects your purchase record on departure",
    desc: "At the airport immigration checkpoint, the purchase record attached to your passport will be collected. This is a standard procedure — do not remove it yourself. If items are inspected and do not match the records, you may be charged the tax retroactively.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    q: "How do I shop tax-free in Japan?",
    a: "Visit a store displaying the 'Tax Free' logo, spend ¥5,000 or more (before tax) in a single visit, and present your original passport at checkout. The tax is deducted immediately — you pay the reduced price at the register. No airport refund process is required.",
  },
  {
    q: "What is the minimum spend for tax-free shopping in Japan?",
    a: "¥5,000 per store per day (before tax). This applies to each store separately — you cannot combine purchases across different stores or on different days to meet the threshold. For food and consumable items, the minimum is also ¥5,000, but these must be sealed and not consumed in Japan.",
  },
  {
    q: "Can I open tax-free purchases in Japan?",
    a: "No. Tax-free items must leave Japan in their original, unopened condition. If customs finds that you have opened, worn, or used a tax-free item before departure, you may be required to pay the consumption tax. Keep all items sealed and in their original packaging until you are out of Japan.",
  },
  {
    q: "Do I need to declare tax-free goods at customs?",
    a: "You do not need to declare them yourself — customs handles this automatically. A purchase record is attached to your passport at the time of purchase, and this record is collected at the departure immigration checkpoint. If items are inspected and found to match, no action is required from you.",
  },
  {
    q: "Is Don Quijote tax-free for tourists?",
    a: "Yes. Don Quijote (also called Donki) is one of the most popular tax-free shopping destinations for tourists in Japan. Most branches in major tourist areas have a dedicated tax-free counter. Look for the 'Tax Free' signage at the entrance, spend ¥5,000 or more in one visit, and present your passport at checkout.",
  },
];

export default function TaxFreeShoppingJapanPage() {
  return (
    <>
      <Head>
        <title>Tax-Free Shopping in Japan 2026: Complete Guide | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to shop tax-free in Japan as a tourist. We explain the 10% consumption tax refund, minimum spend rules, qualifying stores, and what to watch out for."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/tax-free-shopping-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tax-Free Shopping in Japan 2026: Complete Guide | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/tax-free-shopping-japan" />
        <meta property="og:description" content="How to shop tax-free in Japan as a tourist. We explain the 10% consumption tax refund, minimum spend rules, qualifying stores, and what to watch out for." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tax-Free Shopping in Japan 2026: Complete Guide | Japan Travel Kit" />
        <meta name="twitter:description" content="How to shop tax-free in Japan as a tourist. We explain the 10% consumption tax refund, minimum spend rules, qualifying stores, and what to watch out for." />
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
              headline: "Tax-Free Shopping in Japan (2026): How to Get Your Consumption Tax Back",
              dateModified: "2026-05-02",
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
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Tax-Free Shopping", item: "https://www.japan-travel-kit.com/guides/money/tax-free-shopping-japan" },
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
          <span className={styles.breadCurrent}>Tax-Free Shopping</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🛍️</span> Updated May 2026
          </p>
          <h1 className={styles.heroTitle}>
            Tax-Free Shopping in Japan (2026):<br />How to Get Your Consumption Tax Back
          </h1>
          <p className={styles.heroSubtitle}>
            As a tourist, you can shop tax-free in Japan — saving up to 10% on everything
            from electronics to clothing.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "Save Up to 10%", "All Tourists"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Tax rate saved</p>
                <p className={styles.verdictStatValue}>10% (8% on food)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Who qualifies</p>
                <p className={styles.verdictStatValue}>Non-Japanese passport holders</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Minimum spend</p>
                <p className={styles.verdictStatValue}>¥5,000 per store</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>How it works:</strong> Show your passport at any store displaying the
              &lsquo;Tax Free&rsquo; sign, spend ¥5,000 or more, and the 10% consumption tax is
              deducted immediately at the register. No airport refund queue required.
            </p>
          </div>
        </div>

        {/* What Is Tax-Free Shopping */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is Tax-Free Shopping in Japan?</h2>
          <p className={styles.bodyText}>
            Japan charges a <strong>10% consumption tax</strong> (8% on food and non-alcoholic
            beverages) on most purchases. Under Japan&apos;s tourist tax exemption scheme,
            foreign visitors with a non-Japanese passport are entitled to shop without paying
            this tax — a significant saving on larger purchases.
          </p>
          <p className={styles.bodyText}>
            Unlike VAT refund systems in Europe, where you pay full price and reclaim
            the tax at the airport, Japan&apos;s system deducts the tax at the point of sale.
            You simply pay less at the register — no forms, no queuing at refund counters,
            no waiting for a bank transfer weeks later.
          </p>
          <p className={styles.bodyText}>
            The programme is widely available at department stores, electronics shops,
            drugstores, and an increasing number of fashion retailers in tourist areas.
            You&apos;ll see the blue &lsquo;Tax Free&rsquo; logo at the entrance of qualifying stores.
          </p>
        </section>

        {/* How to Shop Tax-Free — Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step by step</span>
          <h2 className={styles.sectionTitle}>How to Shop Tax-Free</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
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

        {/* Where to Shop Tax-Free */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to go</span>
          <h2 className={styles.sectionTitle}>Where to Shop Tax-Free</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Store Type", "Examples"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {taxFreeStores.map((row) => (
                    <tr key={row.type}>
                      <td className={styles.tdProvider}>{row.type}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Not every branch of a chain qualifies — always look for the &lsquo;Tax Free&rsquo;
            sign at the specific store you&apos;re visiting. In major tourist districts
            (Shinjuku, Akihabara, Shibuya, Namba, Kyoto Shijo), tax-free coverage is
            near-universal at large retailers.
          </p>
        </section>

        {/* What Can You Buy Tax-Free */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Eligible items</span>
          <h2 className={styles.sectionTitle}>What Can You Buy Tax-Free?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Category", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {eligibleItems.map((row) => (
                    <tr key={row.category}>
                      <td className={styles.tdProvider}>{row.category}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Important Rules */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Important rules</span>
          <h2 className={styles.sectionTitle}>Important Rules to Know</h2>
          <div className={styles.whoForGrid}>
            {rules.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
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
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget Guide (2026): How Much Does Japan Cost?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/currency-exchange-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="2" y1="20" x2="2" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Currency Exchange in Japan (2026): Best Ways to Get Yen</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/money" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Compare Japan Money &amp; Payment Options →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Make the most of your yen</h2>
            <p className={styles.ctaBannerDesc}>
              From tax-free shopping to ATMs and currency exchange — our money guides
              help you spend smarter in Japan.
            </p>
            <Link href="/guides/money" className={styles.ctaBannerBtn}>
              View All Money Guides →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
