import Link from "next/link";
import styles from "../styles/Guides.module.css";
import { groupedArticles, startHereArticle, type GuideCategory } from "../lib/guide-hub";

function BreadSep() {
  return (
    <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

/**
 * Body of a category hub: breadcrumb, hero, pillar introduction, one "start here" article,
 * then every article in the category grouped by search intent (lib/guide-hub.ts).
 *
 * Shared by the four hubs so they stay structurally identical; each page keeps its own
 * <Head> because the titles and descriptions are per-category SEO copy.
 */
export default function GuideHub({
  category,
  heading,
  heroDesc,
  dates,
}: {
  category: GuideCategory;
  /** <h1>. Usually a search-friendly phrasing of category.name. */
  heading: string;
  heroDesc: string;
  dates: Record<string, string>;
}) {
  const start = startHereArticle(category);
  const groups = groupedArticles(category);

  return (
    <>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <BreadSep />
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <BreadSep />
          <span className={styles.breadCurrent}>{category.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>{category.emoji} {category.name}</span>
          <h1 className={styles.heroTitle}>{heading}</h1>
          <p className={styles.heroDesc}>{heroDesc}</p>
        </div>
      </section>

      <div className={styles.content}>
        <Link href="/guides" className={styles.backLink}>
          ← All guides
        </Link>

        {/* Pillar introduction */}
        <div className={styles.intro}>
          {category.intro.map((para) => (
            <p key={para} className={styles.introText}>{para}</p>
          ))}
        </div>

        {/* Start here */}
        <Link href={start.href} className={styles.startHere}>
          <span className={styles.startHereLabel}>Read this first</span>
          <p className={styles.startHereTitle}>{start.title}</p>
          <p className={styles.startHereWhy}>{category.startHereWhy}</p>
          <span className={styles.startHereArrow}>Read guide →</span>
        </Link>

        {/* Groups */}
        {groups.map(({ group, articles }) => (
          <section key={group.key} className={styles.groupSection}>
            <h2 className={styles.groupTitle}>{group.label}</h2>
            <p className={styles.groupDesc}>{group.desc}</p>

            <div className={styles.articleList}>
              {articles.map((article) => (
                <Link key={article.href} href={article.href} className={styles.articleCard}>
                  <div className={styles.articleMeta}>
                    <span className={styles.articleBadge}>{article.badge}</span>
                    <p className={styles.articleTitle}>{article.title}</p>
                    <p className={styles.articleDesc}>{article.desc}</p>
                    <div className={styles.articleFooter}>
                      <span className={styles.articleDate}>Updated {dates[article.href]}</span>
                      <span className={styles.articleReadMore}>Read guide →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
