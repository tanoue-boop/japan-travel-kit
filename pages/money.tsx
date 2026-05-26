import Head from "next/head";
import Link from "next/link";
import StarRating from "../components/StarRating";
import pageStyles from "../styles/SimCards.module.css";
import cardStyles from "../styles/SIMCardCard.module.css";
import guideStyles from "../styles/Guides.module.css";
import { moneyArticles } from "../lib/guides-money";

const suica = {
  id: "suica-ic",
  name: "Suica IC Card",
  rating: 4.9,
  reviewCount: 8000,
  price: "¥500 deposit + charge",
  badge: "Must Have",
  pros: [
    "Works on all trains & buses",
    "Accepted at convenience stores",
    "No foreign transaction fees",
    "Works nationwide",
  ],
  cons: [
    "Requires top-up with cash or card",
    "¥500 deposit required",
  ],
  affiliateUrl:
    "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F",
  ctaText: "Get Suica on Klook",
};

export default function MoneyPage() {
  return (
    <>
      <Head>
        <title>Money &amp; Payment in Japan 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to handle money in Japan. Best cards, ATMs, currency exchange tips, and cashless payment options — everything you need before you land."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/money" />
        <meta property="og:title" content="Money & Payment in Japan 2026 | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/money" />
        <meta
          property="og:description"
          content="How to handle money in Japan. Best cards, ATMs, currency exchange tips, and cashless payment options — everything you need before you land."
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Money & Payment in Japan 2026 | Japan Travel Kit" />
        <meta
          name="twitter:description"
          content="How to handle money in Japan. Best cards, ATMs, currency exchange tips, and cashless payment options — everything you need before you land."
        />
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
              "@type": "Article",
              headline: "Money & Payment in Japan (2026)",
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

      {/* Hero */}
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
            How to pay, where to get cash, and how to avoid unnecessary fees in Japan.
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

        {/* Suica card */}
        <div className={pageStyles.simList}>
          <div id={suica.id}>
            <article className={cardStyles.card}>
              <div className={cardStyles.header}>
                <div className={cardStyles.nameBlock}>
                  <div className={cardStyles.badgeRow}>
                    <span className={`${cardStyles.badge} ${cardStyles.badgeGreen}`}>{suica.badge}</span>
                  </div>
                  <h3 className={cardStyles.name}>{suica.name}</h3>
                  <StarRating rating={suica.rating} reviewCount={suica.reviewCount} />
                </div>
                <div className={cardStyles.priceBlock}>
                  <p className={cardStyles.priceFrom}>Price</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 800, color: "#0d1b4b", lineHeight: 1.3 }}>
                    {suica.price}
                  </p>
                </div>
              </div>

              <div className={cardStyles.proscons}>
                <div>
                  <p className={`${cardStyles.pcLabel} ${cardStyles.prosLabel}`}>✓ Pros</p>
                  <ul className={cardStyles.pcList}>
                    {suica.pros.map((p) => (
                      <li key={p} className={cardStyles.pcItem}>
                        <span className={cardStyles.iconPro}>+</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={`${cardStyles.pcLabel} ${cardStyles.consLabel}`}>✗ Cons</p>
                  <ul className={cardStyles.pcList}>
                    {suica.cons.map((c) => (
                      <li key={c} className={cardStyles.pcItem}>
                        <span className={cardStyles.iconCon}>−</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={cardStyles.cta}>
                <a
                  href={suica.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={cardStyles.ctaBtn}
                >
                  {suica.ctaText}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>

        {/* Money Guides section */}
        <section style={{ marginTop: "3.5rem" }}>
          <span className={pageStyles.sectionLabel}>Guides</span>
          <h2 className={pageStyles.sectionTitle}>Japan Money Guides</h2>
          <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6, marginBottom: "1.75rem", marginTop: "-0.75rem" }}>
            Everything you need to know about handling money in Japan.
          </p>
          <div className={guideStyles.articleList}>
            {moneyArticles.map((article) => (
              <Link key={article.href} href={article.href} className={guideStyles.articleCard}>
                <div className={guideStyles.articleMeta}>
                  <span className={guideStyles.articleBadge}>{article.badge}</span>
                  <p className={guideStyles.articleTitle}>{article.title}</p>
                  <p className={guideStyles.articleDesc}>{article.desc}</p>
                  <div className={guideStyles.articleFooter}>
                    <span className={guideStyles.articleDate}>Updated {article.date}</span>
                    <span className={guideStyles.articleReadMore}>Read guide →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <Link
            href="/guides/money"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "#c62828",
              color: "#fff",
              padding: "0.85rem 2rem",
              borderRadius: "12px",
              fontSize: "0.95rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            View all Money Guides →
          </Link>
        </div>
      </div>
    </>
  );
}
