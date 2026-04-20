import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Guides.module.css";

const categories = [
  {
    href: "/guides/esim",
    icon: "📱",
    name: "eSIM & SIM Cards",
    desc: "Which SIM to buy, how to install an eSIM, network coverage, and data plan comparisons for Japan.",
    count: 1,
  },
  {
    href: "/guides/transportation",
    icon: "🚅",
    name: "Getting Around",
    desc: "Shinkansen passes, IC cards, airport trains, and everything you need to navigate Japan's rail network.",
    count: 0,
    soon: true,
  },
  {
    href: "/guides/money",
    icon: "💴",
    name: "Money & Payment",
    desc: "Cash vs card, ATM access, currency exchange, and how to pay at convenience stores and restaurants.",
    count: 0,
    soon: true,
  },
];

export default function GuidesIndexPage() {
  return (
    <>
      <Head>
        <title>Japan Travel Guides 2025 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Practical Japan travel guides: eSIM & SIM cards, getting around, money and payment. Up-to-date, independent advice for foreign visitors."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides" />
        <meta property="og:title" content="Japan Travel Guides 2025 | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides" />
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
          {categories.map((cat) => (
            cat.soon ? (
              <div
                key={cat.href}
                className={styles.catCard}
                style={{ opacity: 0.55, cursor: "default", transform: "none", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
              >
                <span className={styles.catIcon}>{cat.icon}</span>
                <p className={styles.catName}>{cat.name}</p>
                <p className={styles.catDesc}>{cat.desc}</p>
                <span className={styles.catCount}>Coming soon</span>
              </div>
            ) : (
              <Link key={cat.href} href={cat.href} className={styles.catCard}>
                <span className={styles.catIcon}>{cat.icon}</span>
                <p className={styles.catName}>{cat.name}</p>
                <p className={styles.catDesc}>{cat.desc}</p>
                <span className={styles.catCount}>→ {cat.count} {cat.count === 1 ? "guide" : "guides"}</span>
              </Link>
            )
          ))}
        </div>
      </div>
    </>
  );
}
