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
  coverage: string;
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
    id: "jr-pass",
    name: "JR Pass (7-day)",
    rating: 4.8,
    reviewCount: 14000,
    price: "From $275",
    coverage: "JR trains nationwide",
    badge: "Best for Multi-City",
    badgeColor: "bg-blue-500",
    bestFor: "Multi-city itineraries",
    pros: ["Unlimited Shinkansen travel", "Covers JR buses & ferry", "Free seat reservations", "Valid 7/14/21 days"],
    cons: ["Not valid on Nozomi/Mizuho", "Expensive if staying in one city", "Must buy before arriving"],
    affiliateUrl: "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F",
    ctaText: "Book JR Pass on Klook",
  },
  {
    id: "suica-ic",
    name: "Suica IC Card",
    rating: 4.9,
    reviewCount: 8000,
    price: "¥500 deposit + charge",
    coverage: "All trains & buses",
    badge: "Must Have",
    badgeColor: "bg-green-500",
    bestFor: "Daily transit & payments",
    pros: ["Works on all trains & buses", "Use at convenience stores", "No queuing for tickets", "Works nationwide"],
    cons: ["Must top up regularly", "¥500 deposit required", "Refund process on departure"],
    affiliateUrl: "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F",
    ctaText: "Get Suica on Klook",
  },
  {
    id: "narita-express",
    name: "Narita Express (N'EX)",
    rating: 4.5,
    reviewCount: 367,
    price: "From $25",
    coverage: "Narita → Shinjuku/Shibuya",
    badge: "Fastest from Narita",
    badgeColor: "bg-orange-500",
    bestFor: "West-side Tokyo hotels",
    pros: ["Direct to Shinjuku & Shibuya", "Reserved seating", "Luggage space", "Round-trip discount"],
    cons: ["Only from Narita", "More expensive than bus"],
    affiliateUrl: "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264853&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F173165-narita-express-n-ex-round-trip-train-ticket-narita-airport-tokyo%2F",
    ctaText: "Book N'EX on Klook",
  },
  {
    id: "keisei-skyliner",
    name: "Keisei Skyliner",
    rating: 4.9,
    reviewCount: 77601,
    price: "From $14",
    coverage: "Narita → Ueno/Nippori",
    badge: "Most Popular Airport Train",
    badgeColor: "bg-blue-500",
    bestFor: "Budget airport express",
    pros: ["Fastest to Ueno (41 min)", "Most affordable airport express", "No reservation needed"],
    cons: ["Terminates at Ueno/Nippori", "Not JR Pass compatible"],
    affiliateUrl: "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264854&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F1410-skyliner-tokyo%2F",
    ctaText: "Book Skyliner on Klook",
  },
];

const badgeColorMap: Record<string, string> = {
  "bg-blue-500":   cardStyles.badgeBlue,
  "bg-green-500":  cardStyles.badgeGreen,
  "bg-orange-500": cardStyles.badgeOrange,
};

const faqItems = [
  {
    q: "Do I need a JR Pass for Japan?",
    a: "It depends on your itinerary. The JR Pass is worth it if you plan to travel between multiple cities — Tokyo to Kyoto to Hiroshima, for example. For a single-city stay or a short Tokyo-only trip, individual tickets and an IC card will be cheaper. Use a JR fare calculator to compare your planned routes against the pass price before buying.",
  },
  {
    q: "What is a Suica card and do I need one?",
    a: "Suica is a rechargeable contactless smart card that works as a transit pass and a payment card. Tap it to ride any train, subway, or bus in Japan, and to pay at convenience stores, vending machines, and many restaurants. Even if you have a JR Pass, you still need a Suica (or similar IC card) for local metro lines, buses, and everyday purchases.",
  },
  {
    q: "What's the best way to get from Narita Airport to Tokyo?",
    a: "The Keisei Skyliner is the fastest and most affordable option for most travellers — it reaches Ueno in 41 minutes from $14. The Narita Express N'EX ($25) goes directly to Shinjuku and Shibuya, which is more convenient if your hotel is on the west side of Tokyo. JR Pass holders can use the N'EX for free with a seat reservation.",
  },
  {
    q: "Is the JR Pass valid on the Shinkansen?",
    a: "Yes — but not on Nozomi or Mizuho services (the very fastest Shinkansen). It covers Hikari, Sakura, Kodama, and Hayabusa services, which are only 15–30 minutes slower. JR Pass holders must make free seat reservations in advance, which can be done at any JR ticket office or via the JR ticket app.",
  },
  {
    q: "Can I use IC cards everywhere in Japan?",
    a: "Suica and other IC cards (Pasmo, ICOCA, Nimoca) are accepted on virtually all trains, subways, and buses across Japan, and at convenience stores, most vending machines, and many restaurants. They are not valid for Shinkansen travel, which requires a separate ticket or JR Pass. Every tourist should have one.",
  },
];

export default function TransportationPage() {
  return (
    <>
      <Head>
        <title>Japan Transportation Guide 2026: JR Pass, IC Cards &amp; Airport Transfers | Japan Travel Kit</title>
        <meta
          name="description"
          content="Everything you need to get around Japan in 2026. Compare JR Pass, Suica IC card, Narita Express, and Keisei Skyliner — with honest pros, cons, and prices."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/transportation" />
        <meta property="og:title" content="Japan Transportation Guide 2026: JR Pass, IC Cards & Airport Transfers" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/transportation" />
        <meta property="og:description" content="Everything you need to get around Japan in 2026. Compare JR Pass, Suica IC card, Narita Express, and Keisei Skyliner — with honest pros, cons, and prices." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Transportation Guide 2026: JR Pass, IC Cards & Airport Transfers" />
        <meta name="twitter:description" content="Everything you need to get around Japan in 2026. Compare JR Pass, Suica IC card, Narita Express, and Keisei Skyliner — with honest pros, cons, and prices." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Transportation", item: "https://www.japan-travel-kit.com/transportation" },
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
              headline: "Japan Transportation Guide (2026): JR Pass, IC Cards & Airport Transfers",
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
          <span className={pageStyles.breadCurrent}>Transportation</span>
        </div>
      </div>

      {/* Page header */}
      <section className={pageStyles.pageHeader}>
        <div className={pageStyles.pageHeaderDots} />
        <div className={pageStyles.pageHeaderInner}>
          <p className={pageStyles.updated}>
            <span>🚄</span> Updated May 2026
          </p>
          <h1 className={pageStyles.pageTitle}>
            Japan Transportation<br />Guide (2026)
          </h1>
          <p className={pageStyles.pageDesc}>
            Everything you need to get around Japan. JR Pass, IC cards, airport transfers, and Shinkansen tickets.
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
                      <StarRating rating={item.rating} reviewCount={item.reviewCount} />
                    </div>
                    <div className={cardStyles.priceBlock}>
                      <p className={cardStyles.priceFrom}>Price</p>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 800, color: "#0d1b4b", lineHeight: 1.3 }}>{item.price}</p>
                    </div>
                  </div>

                  <div className={cardStyles.specs}>
                    <div>
                      <p className={cardStyles.specLabel}>Coverage</p>
                      <p className={cardStyles.specValue}>{item.coverage}</p>
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
                    {["Service", "Price", "Coverage", "Best For", "Rating"].map((h) => (
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
                        <td style={{ fontSize: "0.78rem" }}>{item.coverage}</td>
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
              Japan Transport Guides: City by City
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginTop: "0.3rem" }}>
              Tokyo, Kyoto, Osaka, Hiroshima, Fukuoka — how to get around each city.
            </p>
          </div>
          <Link href="/guides/transport" style={{
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
