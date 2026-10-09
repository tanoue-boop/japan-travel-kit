import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Guides.module.css";
import { esimCategory } from "../../lib/guides-esim";
import { transportCategory } from "../../lib/guides-transport";
import { moneyCategory } from "../../lib/guides-money";
import { attractionsCategory } from "../../lib/guides-attractions";
import { groupedArticles, type GuideCategory } from "../../lib/guide-hub";

function IconSim() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
      <line x1="9" y1="14" x2="9" y2="14" />
      <line x1="12" y1="14" x2="12" y2="14" />
      <line x1="15" y1="14" x2="15" y2="14" />
      <line x1="9" y1="17" x2="9" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="15" y1="17" x2="15" y2="17" />
    </svg>
  );
}

function IconTrain() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="14" rx="3" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <line x1="9" y1="3" x2="9" y2="10" />
      <line x1="15" y1="3" x2="15" y2="10" />
      <circle cx="8.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <path d="M7 21l2-4" />
      <path d="M17 21l-2-4" />
      <line x1="7" y1="21" x2="17" y2="21" />
    </svg>
  );
}

function IconMoney() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="22" height="13" rx="2" />
      <circle cx="12" cy="12.5" r="2.5" />
      <path d="M6 10v5" />
      <path d="M18 10v5" />
      <line x1="1" y1="10" x2="5" y2="10" />
      <line x1="19" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function IconTicket() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
      <path d="M13 6v2M13 11v2M13 16v2" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

/** Category cards up top, then the full index below — same grouping the hubs use. */
const categories: { category: GuideCategory; Icon: () => JSX.Element; blurb: string }[] = [
  {
    category: esimCategory,
    Icon: IconSim,
    blurb: "Which SIM to buy, how to install an eSIM, network coverage, and data plan comparisons for Japan.",
  },
  {
    category: transportCategory,
    Icon: IconTrain,
    blurb: "Shinkansen passes, IC cards, airport trains, and everything you need to navigate Japan's rail network.",
  },
  {
    category: moneyCategory,
    Icon: IconMoney,
    blurb: "Cash vs card, ATM access, currency exchange, and how to pay at convenience stores and restaurants.",
  },
  {
    category: attractionsCategory,
    Icon: IconTicket,
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
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Travel Guides</span>
          <h1 className={styles.heroTitle}>Japan Travel Guides</h1>
          <p className={styles.heroDesc}>
            Practical, independent guides for foreign visitors to Japan.
            Everything you need to know — prepared before you land.
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <span className={styles.sectionLabel}>Browse by topic</span>
        <h2 className={styles.sectionTitle}>All Categories</h2>

        <div className={styles.catGrid}>
          {categories.map(({ category, Icon, blurb }) => (
            <Link key={category.href} href={category.href} className={styles.catCard}>
              <div className={styles.catTop}>
                <div className={styles.catLeft}>
                  <div className={styles.catIconRow}>
                    <span className={styles.catIcon}>
                      <Icon />
                    </span>
                    <span className={`${styles.catBadge} ${styles.badgeSoftRed}`}>
                      {category.articles.length} Guides
                    </span>
                  </div>
                  <p className={styles.catName}>{category.name}</p>
                  <p className={styles.catDesc}>{blurb}</p>
                </div>
                <span className={styles.catArrow}>
                  <ChevronRight />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Full index — every guide, under the same intent groups as its hub */}
        <span className={styles.sectionLabel}>Every guide</span>
        <h2 className={styles.sectionTitle}>All {totalGuides} Guides</h2>

        {categories.map(({ category }) => (
          <section key={category.href} className={styles.indexCategory}>
            <h3 className={styles.indexCatTitle}>
              <span aria-hidden="true">{category.emoji}</span>{" "}
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
