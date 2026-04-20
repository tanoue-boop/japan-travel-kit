import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Guides.module.css";

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

function ChevronRight() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

const categories = [
  {
    href: "/guides/esim",
    Icon: IconSim,
    name: "eSIM & SIM Cards",
    desc: "Which SIM to buy, how to install an eSIM, network coverage, and data plan comparisons for Japan.",
    badge: "4 Guides",
    badgeCls: styles.badgeSoftRed,
    soon: false,
  },
  {
    href: "/guides/transportation",
    Icon: IconTrain,
    name: "Getting Around",
    desc: "Shinkansen passes, IC cards, airport trains, and everything you need to navigate Japan's rail network.",
    badge: "Coming Soon",
    badgeCls: styles.badgeSoftGray,
    soon: true,
  },
  {
    href: "/guides/money",
    Icon: IconMoney,
    name: "Money & Payment",
    desc: "Cash vs card, ATM access, currency exchange, and how to pay at convenience stores and restaurants.",
    badge: "Coming Soon",
    badgeCls: styles.badgeSoftGray,
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
          {categories.map((cat) => {
            const cardContent = (
              <div className={styles.catTop}>
                <div className={styles.catLeft}>
                  <div className={styles.catIconRow}>
                    <span className={styles.catIcon}>
                      <cat.Icon />
                    </span>
                    <span className={`${styles.catBadge} ${cat.badgeCls}`}>{cat.badge}</span>
                  </div>
                  <p className={styles.catName}>{cat.name}</p>
                  <p className={styles.catDesc}>{cat.desc}</p>
                </div>
                {cat.soon ? (
                  <span className={styles.catArrowSoon}>Soon</span>
                ) : (
                  <span className={styles.catArrow}>
                    <ChevronRight />
                  </span>
                )}
              </div>
            );

            return cat.soon ? (
              <div key={cat.href} className={styles.catCardSoon}>
                {cardContent}
              </div>
            ) : (
              <Link key={cat.href} href={cat.href} className={styles.catCard}>
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
