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
  network: string;
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
    id: "ninja-wifi",
    name: "Ninja WiFi",
    rating: 4.7,
    reviewCount: 11297,
    price: "From $2.25/day",
    network: "Docomo 4G LTE",
    badge: "Most Popular",
    badgeColor: "bg-blue-500",
    bestFor: "Groups, unlimited data",
    pros: ["Unlimited data", "Airport pickup at all major airports", "Up to 10 devices", "200K+ customers"],
    cons: ["Must return at airport", "Battery lasts ~8 hours", "Extra device to carry"],
    affiliateUrl: "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1285120&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F16399-unlimited-4g-lte-wifi-japan-airport-pickup-ninja-wifi%2F",
    ctaText: "Book Ninja WiFi on Klook",
  },
  {
    id: "global-wifi",
    name: "Global WiFi + Powerbank",
    rating: 4.7,
    reviewCount: 5255,
    price: "From $1.85/day",
    network: "Docomo/SoftBank 4G",
    badge: "Best Value",
    badgeColor: "bg-green-500",
    bestFor: "Budget groups",
    pros: ["Cheapest per day", "Free powerbank included", "Unlimited data", "Multiple airports"],
    cons: ["Fewer reviews than Ninja WiFi", "Must return at airport"],
    affiliateUrl: "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1285121&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F21250-4g-wifi-japan%2F",
    ctaText: "Book Global WiFi on Klook",
  },
  {
    id: "airalo-esim",
    name: "Airalo eSIM",
    rating: 4.8,
    reviewCount: 89000,
    price: "From $4.50",
    network: "Docomo & SoftBank",
    badge: "Best for Solo",
    badgeColor: "bg-orange-500",
    bestFor: "Solo travellers",
    pros: ["No device to carry", "Instant setup before landing", "Cheaper for solo travellers"],
    cons: ["1 device only", "Requires eSIM-compatible phone", "Data-only"],
    affiliateUrl: "https://airalo.pxf.io/c/7213504/1268485/15608",
    ctaText: "Get Airalo eSIM",
  },
  {
    id: "esim-go",
    name: "eSIM Go",
    rating: 4.2,
    reviewCount: 2900,
    price: "From $3.50",
    network: "Docomo",
    badge: "Cheapest",
    badgeColor: "bg-green-500",
    bestFor: "Budget solo",
    pros: ["Cheapest overall", "Docomo network", "No device to carry"],
    cons: ["1 device only", "Requires eSIM-compatible phone", "Data-only"],
    affiliateUrl: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN",
    ctaText: "Get eSIM Go",
  },
];

const badgeColorMap: Record<string, string> = {
  "bg-blue-500":   cardStyles.badgeBlue,
  "bg-green-500":  cardStyles.badgeGreen,
  "bg-orange-500": cardStyles.badgeOrange,
};

const faqItems = [
  {
    q: "What's the difference between pocket WiFi and an eSIM?",
    a: "Pocket WiFi is a physical device that creates a personal hotspot — ideal for groups sharing one connection. An eSIM is a digital SIM built into your phone — cheaper for solo travellers with no device to carry. If you're travelling alone and your phone supports eSIM, an eSIM is almost always better value. For groups of 3+, pocket WiFi often works out cheaper per person.",
  },
  {
    q: "How many devices can connect to pocket WiFi?",
    a: "Most rental pocket WiFi devices support up to 10 simultaneous connections, making them ideal for families or small groups where everyone wants their own phone or tablet connected. Connection speed may slow slightly with multiple devices active at once, but in practice it's rarely noticeable for typical tourist use — maps, messaging, and light browsing.",
  },
  {
    q: "How long does a pocket WiFi battery last in Japan?",
    a: "Most rental pocket WiFi batteries last 6–10 hours of continuous use. Ninja WiFi devices typically last around 8 hours. For a full day of sightseeing, you may need to recharge during the day — Global WiFi includes a free powerbank, which solves this problem. Carrying a charging cable is always recommended.",
  },
  {
    q: "Where do I pick up and return pocket WiFi in Japan?",
    a: "Most providers offer airport pickup at Narita, Haneda, Kansai, and Fukuoka airports. Return is usually at the airport on departure — drop it in the dedicated return box before boarding. Some providers also offer hotel delivery. Book in advance to guarantee availability, especially during busy travel seasons like spring (cherry blossom) and autumn.",
  },
  {
    q: "Should I get pocket WiFi or an eSIM for my Japan trip?",
    a: "For solo travellers: an eSIM is cheaper, simpler, and means one less device to carry. For couples or groups: pocket WiFi often costs less per person, especially for 3+ people sharing one device. If you need to share connectivity across a group and everyone's using their own phone, pocket WiFi is the better choice. If you travel alone and have a compatible phone, get an eSIM.",
  },
];

export default function WifiPocketPage() {
  return (
    <>
      <Head>
        <title>Best Pocket WiFi for Japan 2026: Top Rentals Compared | Japan Travel Kit</title>
        <meta
          name="description"
          content="Compare the best pocket WiFi rentals for Japan in 2026. Ninja WiFi, Global WiFi, and eSIM alternatives — with prices, coverage, and airport pickup."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/wifi-pocket" />
        <meta property="og:title" content="Best Pocket WiFi for Japan 2026: Top Rentals Compared" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/wifi-pocket" />
        <meta property="og:description" content="Compare the best pocket WiFi rentals for Japan in 2026. Ninja WiFi, Global WiFi, and eSIM alternatives — with prices, coverage, and airport pickup." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Pocket WiFi for Japan 2026: Top Rentals Compared" />
        <meta name="twitter:description" content="Compare the best pocket WiFi rentals for Japan in 2026. Ninja WiFi, Global WiFi, and eSIM alternatives — with prices, coverage, and airport pickup." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Pocket WiFi", item: "https://www.japan-travel-kit.com/wifi-pocket" },
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
              headline: "Best Pocket WiFi Rentals for Japan (2026)",
              dateModified: "2026-05-26",
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
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
          <span className={pageStyles.breadCurrent}>Pocket WiFi</span>
        </div>
      </div>

      {/* Page header */}
      <section className={pageStyles.pageHeader}>
        <div className={pageStyles.pageHeaderDots} />
        <div className={pageStyles.pageHeaderInner}>
          <p className={pageStyles.updated}>
            <span>📶</span> Updated May 2026
          </p>
          <h1 className={pageStyles.pageTitle}>
            Best Pocket WiFi Rentals<br />for Japan (2026)
          </h1>
          <p className={pageStyles.pageDesc}>
            Compare the best pocket WiFi rentals for Japan. Unlimited data, airport pickup, perfect for groups.
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
                      <p className={cardStyles.specLabel}>Network</p>
                      <p className={cardStyles.specValue}>{item.network}</p>
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
                    {["Provider", "Price", "Network", "Best For", "Rating"].map((h) => (
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
                        <td style={{ fontSize: "0.78rem" }}>{item.network}</td>
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
              In-depth guide
            </p>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
              Pocket WiFi vs eSIM for Japan (2026): Which Is Better?
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginTop: "0.3rem" }}>
              We compare price, convenience, and coverage so you can choose.
            </p>
          </div>
          <Link href="/guides/esim/pocket-wifi-vs-esim-japan" style={{
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
            Read the guide →
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
