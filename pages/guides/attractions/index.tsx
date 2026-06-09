import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Guides.module.css";
import { attractionArticles as articles } from "../../../lib/guides-attractions";

export default function GuidesAttractionsPage() {
  return (
    <>
      <Head>
        <title>Things to Do in Japan: Tickets & Experiences (2026) | Japan Travel Kit</title>
        <meta
          name="description"
          content="Japan attraction guides: teamLab, Universal Studios Japan, Shibuya Sky and more. How to book tickets, skip the queues, and pick the right experience for your trip."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Things to Do in Japan: Tickets & Experiences (2026) | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions" />
        <meta property="og:description" content="Japan attraction guides: teamLab, Universal Studios Japan, Shibuya Sky and more. How to book tickets, skip the queues, and pick the right experience for your trip." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Things to Do in Japan: Tickets & Experiences (2026) | Japan Travel Kit" />
        <meta name="twitter:description" content="Japan attraction guides: teamLab, Universal Studios Japan, Shibuya Sky and more. How to book tickets, skip the queues, and pick the right experience for your trip." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
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
          <span className={styles.breadCurrent}>Things to Do</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>🎟️ Things to Do</span>
          <h1 className={styles.heroTitle}>Things to Do in Japan</h1>
          <p className={styles.heroDesc}>
            Tickets and experiences worth planning ahead — teamLab, Universal Studios Japan,
            Shibuya Sky and more. How to book, when to go, and which option suits your trip.
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <Link href="/guides" className={styles.backLink}>
          ← All guides
        </Link>

        <span className={styles.sectionLabel}>Things to Do</span>
        <h2 className={styles.sectionTitle}>
          {articles.length} {articles.length === 1 ? "Guide" : "Guides"}
        </h2>

        <div className={styles.articleList}>
          {articles.map((article) => (
            <Link key={article.href} href={article.href} className={styles.articleCard}>
              <div className={styles.articleMeta}>
                <span className={styles.articleBadge}>{article.badge}</span>
                <p className={styles.articleTitle}>{article.title}</p>
                <p className={styles.articleDesc}>{article.desc}</p>
                <div className={styles.articleFooter}>
                  <span className={styles.articleDate}>Updated {article.date}</span>
                  <span className={styles.articleReadMore}>Read guide →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
