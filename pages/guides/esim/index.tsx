import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Guides.module.css";

const articles = [
  {
    href: "/guides/esim/best-esim-japan",
    badge: "Comparison",
    title: "Best eSIM for Japan 2025: Top 4 Picks Tested & Compared",
    desc: "Airalo, Holafly, eSIM Go, and Sakura Mobile — compared on price, speed, coverage, and ease of setup. Which one is right for your trip?",
    date: "April 2025",
  },
  {
    href: "/guides/esim/airalo-japan-review",
    badge: "Review",
    title: "Airalo Japan Review 2025: Is It Worth It?",
    desc: "We tested Airalo's Japan eSIM plans, speeds, and setup process. An honest verdict on pricing, coverage, and who it's best for.",
    date: "April 2025",
  },
  {
    href: "/guides/esim/esim-vs-sim-japan",
    badge: "Guide",
    title: "eSIM vs SIM Card for Japan: Which Should You Get?",
    desc: "Both work in Japan — but one is faster, cheaper, and easier to set up. We compare price, compatibility, and convenience to help you choose.",
    date: "April 2025",
  },
  {
    href: "/guides/esim/holafly-japan-review",
    badge: "Review",
    title: "Holafly Japan eSIM Review 2025: Unlimited Data Worth It?",
    desc: "Holafly offers unlimited data for Japan — but is the price right? We tested speeds, coverage, and setup to give you an honest verdict.",
    date: "April 2025",
  },
  {
    href: "/guides/esim/how-to-set-up-esim-japan",
    badge: "Guide",
    title: "How to Set Up an eSIM in Japan (Step-by-Step)",
    desc: "Install your Japan eSIM before you fly and have 4G the moment you land. Works for iPhone and Android. Takes under 5 minutes.",
    date: "April 2025",
  },
  {
    href: "/guides/esim/sakura-mobile-review",
    badge: "Review",
    title: "Sakura Mobile Review 2025: Best SIM for Long Stays?",
    desc: "The only tourist SIM with real English support and voice calls. We review Sakura Mobile's plans, Docomo coverage, and whether the price is justified.",
    date: "April 2025",
  },
  {
    href: "/guides/esim/esim-go-japan-review",
    badge: "Review",
    title: "eSIM Go Japan Review 2025: Best Budget eSIM?",
    desc: "The cheapest Japan eSIM we tested. eSIM Go offers Docomo coverage from $3.50 — but how does it hold up on speed, setup, and support?",
    date: "April 2025",
  },
  {
    href: "/guides/esim/cheapest-esim-japan",
    badge: "Comparison",
    title: "Cheapest eSIM for Japan 2025: Best Budget Picks",
    desc: "Don't overpay for data in Japan. We compared eSIM Go, Airalo, Holafly, and Sakura Mobile on price per GB. Starts from $3.50.",
    date: "April 2025",
  },
  {
    href: "/guides/esim/japan-sim-short-vs-long-stay",
    badge: "Guide",
    title: "Best Japan SIM Card for Your Trip Length (2025)",
    desc: "1 week or 1 month? The right SIM depends on how long you're staying. We match the best option to every trip length from 1 day to 1 month+.",
    date: "April 2025",
  },
  {
    href: "/guides/esim/japan-esim-iphone",
    badge: "Guide",
    title: "Best eSIM for Japan on iPhone (2025): Top Picks & Setup Guide",
    desc: "Which eSIM works best for Japan on iPhone XS to iPhone 16? We compare Airalo, Holafly, and eSIM Go — plus a full step-by-step setup guide.",
    date: "April 2025",
  },
];

export default function GuidesEsimPage() {
  return (
    <>
      <Head>
        <title>Japan eSIM Guides 2025 | Japan Travel Kit</title>
        <meta
          name="description"
          content="eSIM and SIM card guides for Japan: which eSIM to buy, how to install it, network coverage, and data plan comparisons."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim" />
        <meta property="og:title" content="Japan eSIM Guides 2025 | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim" />
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
          <span className={styles.breadCurrent}>eSIM & SIM Cards</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>📱 eSIM & SIM Cards</span>
          <h1 className={styles.heroTitle}>Japan eSIM Guides</h1>
          <p className={styles.heroDesc}>
            Which SIM to buy, how to install a Japan eSIM, network coverage breakdowns,
            and honest comparisons — so you can stay connected from the moment you land.
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <Link href="/guides" className={styles.backLink}>
          ← All guides
        </Link>

        <span className={styles.sectionLabel}>eSIM & SIM Cards</span>
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
