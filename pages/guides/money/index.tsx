import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Guides.module.css";
import { moneyArticles as articles } from "../../../lib/guides-money";

export default function GuidesMoneyPage() {
  return (
    <>
      <Head>
        <title>Japan Money &amp; Payment Guides 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Japan money and payment guides: cash vs card, ATM access, currency exchange, and how to pay at convenience stores and restaurants in Japan."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/money" />
        <meta property="og:title" content="Japan Money & Payment Guides 2026 | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/money" />
        <meta property="og:description" content="Japan money and payment guides: cash vs card, ATM access, currency exchange, and how to pay at convenience stores and restaurants in Japan." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Money & Payment Guides 2026 | Japan Travel Kit" />
        <meta name="twitter:description" content="Japan money and payment guides: cash vs card, ATM access, currency exchange, and how to pay at convenience stores and restaurants in Japan." />
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
          <span className={styles.breadCurrent}>Money &amp; Payment</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>💴 Money &amp; Payment</span>
          <h1 className={styles.heroTitle}>Japan Money &amp; Payment Guides</h1>
          <p className={styles.heroDesc}>
            Cash vs card, ATM access, currency exchange, and how to avoid fees —
            everything you need to manage money in Japan.
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <Link href="/guides" className={styles.backLink}>
          ← All guides
        </Link>

        <span className={styles.sectionLabel}>Money &amp; Payment</span>
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
