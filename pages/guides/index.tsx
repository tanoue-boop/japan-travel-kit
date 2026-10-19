import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Guides.module.css";
import { esimCategory } from "../../lib/guides-esim";
import { transportCategory } from "../../lib/guides-transport";
import { moneyCategory } from "../../lib/guides-money";
import { attractionsCategory } from "../../lib/guides-attractions";
import { groupedArticles, type GuideCategory } from "../../lib/guide-hub";

/** Category cards up top, then the full index below — same grouping the hubs use. */
const categories: { category: GuideCategory; blurb: string }[] = [
  {
    category: esimCategory,
    blurb: "Which SIM to buy, how to install an eSIM, network coverage, and data plan comparisons for Japan.",
  },
  {
    category: transportCategory,
    blurb: "Shinkansen passes, IC cards, airport trains, and everything you need to navigate Japan's rail network.",
  },
  {
    category: moneyCategory,
    blurb: "Cash vs card, ATM access, currency exchange, and how to pay at convenience stores and restaurants.",
  },
  {
    category: attractionsCategory,
    blurb: "Tickets and experiences worth booking ahead — teamLab, Universal Studios Japan, Shibuya Sky, and how to skip the queues.",
  },
];

const totalGuides = categories.reduce((n, c) => n + c.category.articles.length, 0);

const DESC = `All ${totalGuides} Japan travel guides in one index: eSIM and SIM cards, transport and rail passes, money and payment, and attraction tickets — grouped by the question each one answers.`;

export default function GuidesIndexPage() {
  return (
    <>
      <Head>
        <title>Japan Travel Guides 2026: All {totalGuides} Guides by Topic | Japan Travel Kit</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides" />
        <meta property="og:title" content="Japan Travel Guides 2026 | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Travel Guides 2026 | Japan Travel Kit" />
        <meta name="twitter:description" content={DESC} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
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
          <span className={styles.breadCurrent}>Guides</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Travel Guides</p>
          <h1 className={styles.heroTitle}>Japan Travel Guides</h1>
          <div className={styles.heroRule} />
          <p className={styles.heroDesc}>
            Practical, independent guides for foreign visitors to Japan.
            Everything you need to know — prepared before you land.
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <p className={styles.sectionLabel}>Browse by topic</p>
        <h2 className={styles.sectionTitle}>All Categories</h2>

        <div className={styles.catGrid}>
          {categories.map(({ category, blurb }, i) => (
            <Link key={category.href} href={category.href} className={styles.catCard}>
              <span className={styles.catIndex} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.catBody}>
                <span className={styles.catName}>{category.name}</span>
                <span className={styles.catDesc}>{blurb}</span>
                <span className={styles.catMeta}>{category.articles.length} Guides →</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Full index — every guide, under the same intent groups as its hub */}
        <p className={styles.sectionLabel}>Every guide</p>
        <h2 className={styles.sectionTitle}>All {totalGuides} Guides</h2>

        {categories.map(({ category }) => (
          <section key={category.href} className={styles.indexCategory}>
            <h3 className={styles.indexCatTitle}>
              <Link href={category.href} className={styles.indexCatLink}>{category.name}</Link>
            </h3>
            <div className={styles.indexGroups}>
              {groupedArticles(category).map(({ group, articles }) => (
                <div key={group.key} className={styles.indexGroup}>
                  <p className={styles.indexGroupLabel}>{group.label}</p>
                  <ul className={styles.indexList}>
                    {articles.map((article) => (
                      <li key={article.href}>
                        <Link href={article.href} className={styles.indexLink}>{article.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
