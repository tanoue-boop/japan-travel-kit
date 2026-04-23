import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Guides.module.css";
import { transportArticles as articles } from "../../../lib/guides-transport";

export default function GuidesTransportPage() {
  return (
    <>
      <Head>
        <title>Japan Transport Guides 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Japan transport guides: JR Pass, IC cards (Suica & Pasmo), airport trains, and everything you need to navigate Japan's rail network."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/transport" />
        <meta property="og:title" content="Japan Transport Guides 2026 | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/transport" />
        <meta property="og:description" content="Japan transport guides: JR Pass, IC cards (Suica & Pasmo), airport trains, and everything you need to navigate Japan's rail network." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Transport Guides 2026 | Japan Travel Kit" />
        <meta name="twitter:description" content="Japan transport guides: JR Pass, IC cards (Suica & Pasmo), airport trains, and everything you need to navigate Japan's rail network." />
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
          <span className={styles.breadCurrent}>Transport &amp; Getting Around</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>🚄 Transport &amp; Getting Around</span>
          <h1 className={styles.heroTitle}>Japan Transport Guides</h1>
          <p className={styles.heroDesc}>
            JR Pass, IC cards, Shinkansen routes, airport trains, and everything you need
            to get around Japan — prepared before you arrive.
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <Link href="/guides" className={styles.backLink}>
          ← All guides
        </Link>

        <span className={styles.sectionLabel}>Transport &amp; Getting Around</span>
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
