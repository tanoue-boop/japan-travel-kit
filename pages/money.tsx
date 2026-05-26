import Head from "next/head";
import Link from "next/link";
import StarRating from "../components/StarRating";
import pageStyles from "../styles/SimCards.module.css";
import cardStyles from "../styles/SIMCardCard.module.css";

type Item = {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: string;
  notes: string;
  badge: string;
  badgeColor: "bg-blue-500" | "bg-green-500" | "bg-orange-500";
  bestFor: string;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  ctaText: string;
};

const items: Item[] = [
  {
    id: "wise-card",
    name: "Wise Travel Card",
    rating: 4.8,
    reviewCount: 50000,
    price: "Free to get",
    notes: "Real exchange rate",
    badge: "Best Exchange Rate",
    badgeColor: "bg-blue-500",
    bestFor: "Low fees, best rates",
    pros: ["Real exchange rate", "No foreign transaction fees", "Works at 7-Eleven ATMs", "Multi-currency"],
    cons: ["Small conversion fee", "Setup takes a few days", "Not instant"],
    affiliateUrl: "#",
    ctaText: "Get Wise Card",
  },
  {
    id: "7eleven-atm",
    name: "7-Eleven ATM",
    rating: 4.9,
    reviewCount: 0,
    price: "~¥220 fee/withdrawal",
    notes: "All major foreign cards",
    badge: "Best ATM for Tourists",
    badgeColor: "bg-green-500",
    bestFor: "Cash withdrawal",
    pros: ["Accepts all foreign cards", "Available 24/7", "English interface", "Nationwide (26,000+ locations)"],
    cons: ["¥220 fee per use", "Your bank may charge additional fees"],
    affiliateUrl: "#",
    ctaText: "Learn More",
  },
  {
    id: "suica-payment",
    name: "Suica IC Card",
    rating: 4.9,
    reviewCount: 8000,
    price: "¥500 deposit",
    notes: "Nationwide IC network",
    badge: "Best for Daily Use",
    badgeColor: "bg-green-500",
    bestFor: "Cashless daily payments",
    pros: ["Contactless payment everywhere", "Trains, buses, convenience stores", "No foreign transaction fees"],
    cons: ["Must top up with cash or card", "¥500 deposit required"],
    affiliateUrl: "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F",
    ctaText: "Get Suica on Klook",
  },
  {
    id: "cash-yen",
    name: "Cash (Yen)",
    rating: 5.0,
    reviewCount: 0,
    price: "Exchange rate varies",
    notes: "Works everywhere",
    badge: "Always Carry Some",
    badgeColor: "bg-orange-500",
    bestFor: "Small shops & temples",
    pros: ["Accepted everywhere", "Essential for small restaurants & temples", "No fees at many places"],
    cons: ["Risk of loss/theft", "Exchange rates vary", "Heavy to carry large amounts"],
    affiliateUrl: "#",
    ctaText: "See ATM Guide",
  },
];

const badgeColorMap: Record<string, string> = {
  "bg-blue-500":   cardStyles.badgeBlue,
  "bg-green-500":  cardStyles.badgeGreen,
  "bg-orange-500": cardStyles.badgeOrange,
};

const faqItems = [
  {
    q: "Does Japan still use a lot of cash?",
    a: "Yes — Japan is more cash-reliant than most developed countries, especially outside major cities. Small restaurants, temples, shrines, many ryokan, and some taxis still prefer or require cash. That said, IC cards, contactless credit cards, and digital payments now cover a much wider range of places than even five years ago. Always carry at least ¥5,000–10,000 in cash.",
  },
  {
    q: "Which ATMs in Japan accept foreign cards?",
    a: "The most reliable ATMs for foreign cards are 7-Eleven ATMs (¥220 fee per withdrawal, available 24/7 at 26,000+ locations across Japan), Japan Post ATMs (at post offices, fee varies), and AEON bank ATMs. Most regular Japanese bank ATMs do NOT accept foreign cards — look specifically for 7-Eleven ATMs for the most reliable experience.",
  },
  {
    q: "How much cash should I carry in Japan?",
    a: "Budget travellers: around ¥3,000–5,000 per day for cash spending on food and entry fees. Mid-range: ¥8,000–15,000 per day. Withdraw from 7-Eleven ATMs rather than exchanging at the airport — you'll typically get a better effective rate, especially if you use a Wise or Revolut card to minimise the bank's fee on top of the ATM charge.",
  },
  {
    q: "What's the best travel card for Japan?",
    a: "Wise is consistently recommended for Japan — it uses the real mid-market exchange rate, charges no foreign transaction fee, and works at 7-Eleven ATMs. Revolut, Charles Schwab (US travellers), and Starling Bank (UK travellers) are also popular alternatives. Avoid using a standard debit or credit card with overseas transaction fees, which can add 2–3% to every purchase.",
  },
  {
    q: "Do I need to tip in Japan?",
    a: "No — tipping is not customary in Japan and in some cases can cause confusion or even offence. Service charges are already included in restaurant and hotel bills. The standard way to show appreciation is to thank staff politely, return dishes to a tray, and leave your table tidy. Never tip.",
  },
];

export default function MoneyPage() {
  return (
    <>
      <Head>
        <title>Money &amp; Payment in Japan 2026: Cards, ATMs &amp; Cash Tips | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to handle money in Japan in 2026. Best travel cards, ATMs that accept foreign cards, currency exchange tips, and how much cash to carry."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/money" />
        <meta property="og:title" content="Money & Payment in Japan 2026: Cards, ATMs & Cash Tips" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/money" />
        <meta property="og:description" content="How to handle money in Japan in 2026. Best travel cards, ATMs that accept foreign cards, currency exchange tips, and how much cash to carry." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Money & Payment in Japan 2026: Cards, ATMs & Cash Tips" />
        <meta name="twitter:description" content="How to handle money in Japan in 2026. Best travel cards, ATMs that accept foreign cards, currency exchange tips, and how much cash to carry." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Money & Payment", item: "https://www.japan-travel-kit.com/money" },
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
              headline: "Money & Payment in Japan (2026): Cards, ATMs & Cash Tips",
              dateModified: "2026-05-26",
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
      <div className={pageStyles.breadcrumb}>
        <div className={pageStyles.breadcrumbInner}>
          <Link href="/" className={pageStyles.breadLink}>Home</Link>
          <svg className={pageStyles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={pageStyles.breadCurrent}>Money &amp; Payment</span>
        </div>
      </div>

      {/* Page header */}
      <section className={pageStyles.pageHeader}>
        <div className={pageStyles.pageHeaderDots} />
        <div className={pageStyles.pageHeaderInner}>
          <p className={pageStyles.updated}>
            <span>💴</span> Updated May 2026
          </p>
          <h1 className={pageStyles.pageTitle}>
            Money &amp; Payment<br />in Japan (2026)
          </h1>
          <p className={pageStyles.pageDesc}>
            How to handle money in Japan. The best cards, ATMs, currency exchange, and cashless tips.
          </p>
          <div className={pageStyles.badges}>
            {["Independently reviewed", "Prices verified", "No paid placements"].map((t) => (
              <span key={t} className={pageStyles.badge}>
                <span className={pageStyles.badgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={pageStyles.content}>
        {/* Affiliate disclosure */}
        <div className={pageStyles.disclosure}>
          <span className={pageStyles.disclosureIcon}>ℹ️</span>
          <p className={pageStyles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links below are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our rankings or reviews.
          </p>
        </div>

        {/* Quick nav */}
        <div className={pageStyles.quickNav}>
          <p className={pageStyles.quickNavLabel}>Jump to:</p>
          <div className={pageStyles.quickNavGrid}>
            {items.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={pageStyles.quickNavItem}>
                <span className={pageStyles.quickNavArrow}>→</span>
                <span>{item.name}</span>
                {item.badge && <span className={pageStyles.quickNavBadge}>{item.badge}</span>}
              </a>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className={pageStyles.simList}>
          {items.map((item) => {
            const badgeCls = badgeColorMap[item.badgeColor] ?? cardStyles.badgeBlue;
            return (
              <div key={item.id} id={item.id}>
                <article className={cardStyles.card}>
                  <div className={cardStyles.header}>
                    <div className={cardStyles.nameBlock}>
                      <div className={cardStyles.badgeRow}>
                        <span className={`${cardStyles.badge} ${badgeCls}`}>{item.badge}</span>
                      </div>
                      <h3 className={cardStyles.name}>{item.name}</h3>
                      {item.reviewCount > 0 && (
                        <StarRating rating={item.rating} reviewCount={item.reviewCount} />
                      )}
                      {item.reviewCount === 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.3rem" }}>
                          {[1,2,3,4,5].map((n) => (
                            <span key={n} style={{ color: "#fbbf24", fontSize: "1rem" }}>★</span>
                          ))}
                          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#374151" }}>{item.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className={cardStyles.priceBlock}>
                      <p className={cardStyles.priceFrom}>Price</p>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 800, color: "#0d1b4b", lineHeight: 1.3 }}>{item.price}</p>
                    </div>
                  </div>

                  <div className={cardStyles.specs}>
                    <div>
                      <p className={cardStyles.specLabel}>Key Feature</p>
                      <p className={cardStyles.specValue}>{item.notes}</p>
                    </div>
                    <div>
                      <p className={cardStyles.specLabel}>Best For</p>
                      <p className={cardStyles.specValue}>{item.bestFor}</p>
                    </div>
                  </div>

                  <div className={cardStyles.proscons}>
                    <div>
                      <p className={`${cardStyles.pcLabel} ${cardStyles.prosLabel}`}>✓ Pros</p>
                      <ul className={cardStyles.pcList}>
                        {item.pros.map((p) => (
                          <li key={p} className={cardStyles.pcItem}>
                            <span className={cardStyles.iconPro}>+</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className={`${cardStyles.pcLabel} ${cardStyles.consLabel}`}>✗ Cons</p>
                      <ul className={cardStyles.pcList}>
                        {item.cons.map((c) => (
                          <li key={c} className={cardStyles.pcItem}>
                            <span className={cardStyles.iconCon}>−</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={cardStyles.cta}>
                    <a
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={cardStyles.ctaBtn}
                    >
                      {item.ctaText}
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <section className={pageStyles.comparison}>
          <div className={pageStyles.comparisonHead}>
            <span className={pageStyles.sectionLabel}>At a glance</span>
            <h2 className={pageStyles.sectionTitle}>Quick Comparison</h2>
          </div>
          <div className={pageStyles.tableWrap}>
            <div className={pageStyles.tableScroll}>
              <table className={pageStyles.table}>
                <thead>
                  <tr>
                    {["Service", "Price", "Key Feature", "Best For", "Rating"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const badgeCls = badgeColorMap[item.badgeColor] ?? pageStyles.tdBadgeBlue;
                    return (
                      <tr key={item.id}>
                        <td>
                          <a href={`#${item.id}`} className={pageStyles.tdName}>{item.name}</a>
                          <span className={`${pageStyles.tdBadge} ${badgeCls}`}>{item.badge}</span>
                        </td>
                        <td className={pageStyles.tdPrice}>{item.price}</td>
                        <td style={{ fontSize: "0.78rem" }}>{item.notes}</td>
                        <td style={{ fontSize: "0.78rem" }}>{item.bestFor}</td>
                        <td>
                          <span className={pageStyles.tdRating}>
                            <span style={{ color: "#fbbf24" }}>★</span>
                            {item.rating}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Related guide link */}
        <div style={{
          background: "linear-gradient(135deg, #0d1b4b, #1a237e)",
          borderRadius: "20px",
          padding: "2rem 1.75rem",
          marginTop: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f87171", marginBottom: "0.3rem" }}>
              In-depth guides
            </p>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
              Money &amp; Payment Guides for Japan
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginTop: "0.3rem" }}>
              Cards, ATMs, cash, tipping, tax-free shopping — everything covered.
            </p>
          </div>
          <Link href="/guides/money" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "#c62828",
            color: "#fff",
            padding: "0.7rem 1.4rem",
            borderRadius: "10px",
            fontSize: "0.88rem",
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            View all guides →
          </Link>
        </div>

        {/* FAQ */}
        <section className={pageStyles.faq}>
          <div className={pageStyles.faqHead}>
            <span className={pageStyles.sectionLabel}>FAQ</span>
            <h2 className={pageStyles.sectionTitle}>Common Questions</h2>
          </div>
          <div className={pageStyles.faqList}>
            {faqItems.map((item, i) => (
              <details key={item.q} className={pageStyles.faqItem}>
                <summary className={pageStyles.faqSummary}>
                  <span>{i + 1}. {item.q}</span>
                  <svg className={pageStyles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={pageStyles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
