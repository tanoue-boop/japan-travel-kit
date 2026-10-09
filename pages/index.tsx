import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { esimArticles } from "../lib/guides-esim";
import { transportArticles } from "../lib/guides-transport";
import { moneyArticles } from "../lib/guides-money";
import { attractionArticles } from "../lib/guides-attractions";

const stats = [
  { value: "4+",   label: "SIM options compared" },
  { value: "100%", label: "Independent reviews"   },
  { value: "2026", label: "Prices verified"        },
  { value: "Free", label: "No sign-up required"    },
];

// The homepage's only category navigation. Until 2026-10-09 a "What do you need help with?"
// section sat above this one pointing at /sim-cards, /wifi-pocket, /transport and /money —
// the first two now 301 to guides already linked below, and the other two *were* these hubs.
// One set of four cards, one destination each.
const guideHubs = [
  {
    href: "/guides/esim",
    iconSrc: "/icons/card-sim.svg",
    iconAlt: "eSIM guides icon",
    title: "eSIM & SIM Cards",
    desc: "Which eSIM to buy, how to install it, network coverage, and honest plan comparisons.",
    badge: `${esimArticles.length} Guides`,
    badgeCls: styles.badgeSoftRed,
  },
  {
    href: "/guides/transport",
    iconSrc: "/icons/card-transport.svg",
    iconAlt: "Transport guides icon",
    title: "Getting Around",
    desc: "Shinkansen passes, IC cards, airport trains, and city-by-city transport guides.",
    badge: `${transportArticles.length} Guides`,
    badgeCls: styles.badgeSoftGreen,
  },
  {
    href: "/guides/money",
    iconSrc: "/icons/card-money.svg",
    iconAlt: "Money guides icon",
    title: "Money & Payment",
    desc: "Travel cards, ATM access, cash vs card, and how to pay your way across Japan.",
    badge: `${moneyArticles.length} Guides`,
    badgeCls: styles.badgeSoftAmber,
  },
  {
    href: "/guides/attractions",
    iconSrc: "/icons/icon-attractions.svg",
    iconAlt: "Things to Do icon",
    title: "Things to Do",
    desc: "Tickets and experiences worth booking ahead — teamLab, USJ, Shibuya Sky and more.",
    badge: `${attractionArticles.length} Guides`,
    badgeCls: styles.badgeSoftBlue,
  },
];

// Popular guides. Chosen 2026-10-09 from Search Console impressions for 2026-09-09–10-06 plus
// the pages that actually earn, replacing a hand-picked list that matched neither. Direct
// links from the homepage push crawl equity to the articles worth ranking.
const popularHrefs = [
  "/guides/money/wise-vs-revolut-japan",
  "/guides/esim/best-esim-japan",
  "/guides/esim/sakura-mobile-review",
  "/guides/attractions/teamlab-tokyo-tickets",
  "/guides/attractions/teamlab-borderless-tickets",
  "/guides/transport/osaka-airport-transfer",
  "/guides/money/best-travel-insurance-japan",
  "/guides/transport/ic-cards-japan",
  "/guides/transport/osaka-metro-pass",
];
const allArticles = [...esimArticles, ...transportArticles, ...moneyArticles, ...attractionArticles];
const popularGuides = popularHrefs.map((href) => {
  const article = allArticles.find((a) => a.href === href);
  if (!article) throw new Error(`index: popular guide ${href} is not in any category list`);
  return article;
});
const totalGuides = allArticles.length;

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Japan Travel Kit — Practical Travel Tips for Japan</title>
        <meta name="description" content="Compare Japan SIM cards, pocket WiFi, and eSIMs for 2026. Practical advice on transport, money, and connectivity — all in plain English, before you land." />
        <link rel="canonical" href="https://www.japan-travel-kit.com" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Japan Travel Kit — Practical Travel Tips for Japan" />
        <meta property="og:description" content="Compare Japan SIM cards, pocket WiFi, and eSIMs for 2026. Practical advice on transport, money, and connectivity — all in plain English, before you land." />
        <meta property="og:url" content="https://www.japan-travel-kit.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Travel Kit — Practical Travel Tips for Japan" />
        <meta name="twitter:description" content="Compare Japan SIM cards, pocket WiFi, and eSIMs for 2026. Practical advice on transport, money, and connectivity — all in plain English, before you land." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Japan Travel Kit",
              url: "https://www.japan-travel-kit.com",
              description: "Practical travel information for foreign visitors to Japan.",
            }),
          }}
        />
      </Head>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroDots} />

        <div className={styles.heroInner}>
          <div className={styles.pill}>
            <span className={styles.pillDot} />
            Updated for the 2026 travel season
          </div>

          <h1 className={styles.title}>
            Everything you need
            <br />
            <span className={styles.titleAccent}>before Japan</span>
          </h1>

          <p className={styles.desc}>
            Japan Travel Kit is your no-nonsense guide to connectivity,
            transport, and money — all in plain English, before you land.
          </p>

          <div className={styles.actions}>
            <Link href="/guides/esim/best-esim-japan" className={styles.btnPrimary}>
              Compare Japan eSIMs →
            </Link>
            <Link href="#categories" className={styles.btnGhost}>
              Browse Topics
            </Link>
          </div>
        </div>

        <div className={styles.wave}>
          <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="48">
            <path d="M0 48L1440 48L1440 12C1200 44 960 52 720 36C480 20 240 4 0 28L0 48Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <p className={styles.statValue}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Guides hubs — the one category navigation on the page */}
      <section id="categories" className={styles.categories}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionLabel}>Read before you go</span>
          <h2 className={styles.sectionTitle}>Travel Guides</h2>
          <p className={styles.sectionDesc}>
            In-depth, independent guides for every part of your Japan trip — written in plain English.
          </p>
        </div>

        <div className={styles.catGrid}>
          {guideHubs.map((hub) => (
            <Link key={hub.href} href={hub.href} className={styles.catCard}>
              <div className={styles.catTop}>
                <div className={styles.catLeft}>
                  <div className={styles.catIconRow}>
                    <span className={styles.catIcon}>
                      <Image src={hub.iconSrc} width={46} height={46} alt={hub.iconAlt} unoptimized />
                    </span>
                    <span className={`${styles.catBadge} ${hub.badgeCls}`}>{hub.badge}</span>
                  </div>
                  <h3 className={styles.catTitle}>{hub.title}</h3>
                  <p className={styles.catDesc}>{hub.desc}</p>
                </div>
                <div className={styles.catArrow}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className={styles.sectionFootLink}>
          <Link href="/guides">Browse all {totalGuides} guides →</Link>
        </p>
      </section>

      {/* Popular Guides */}
      <section className={styles.categories}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionLabel}>Most read</span>
          <h2 className={styles.sectionTitle}>Popular Guides</h2>
          <p className={styles.sectionDesc}>
            The articles travellers open most before landing in Japan.
          </p>
        </div>

        <div className={styles.catGrid}>
          {popularGuides.map((article) => (
            <Link key={article.href} href={article.href} className={styles.catCard}>
              <div className={styles.catTop}>
                <div className={styles.catLeft}>
                  <div className={styles.catIconRow}>
                    <span className={`${styles.catBadge} ${styles.badgeSoftRed}`}>{article.badge}</span>
                  </div>
                  <h3 className={styles.catTitle}>{article.title}</h3>
                  <p className={styles.catDesc}>{article.desc}</p>
                </div>
                <div className={styles.catArrow}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust — the one general-interest block on the page. The "Quick tips every visitor
          should know" section that used to sit above it said nothing the guides don't say
          better, and pushed the guide links further down. Removed 2026-10-09. */}
      <section className={styles.trust}>
        <div className={styles.trustBox}>
          <span className={styles.trustFlag}>🇯🇵</span>
          <div className={styles.trustContent}>
            <h2 className={styles.trustTitle}>Independent. Honest. Up-to-date.</h2>
            <p className={styles.trustDesc}>
              We research every product we recommend and check its prices against the provider&apos;s own published rates. Our reviews are never
              sponsored — we only earn a small affiliate commission if you buy through
              our links, at no extra cost to you.
            </p>
          </div>
          <div className={styles.trustChecks}>
            {["No paid placements", "Verified prices", "Updated monthly"].map((t) => (
              <div key={t} className={styles.trustCheck}>
                <span className={styles.checkIcon}>✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaBox}>
          <div className={styles.ctaDots} />
          <div className={styles.ctaOrb} />
          <div className={styles.ctaInner}>
            <p className={styles.ctaEyebrow}>Start here</p>
            <h2 className={styles.ctaTitle}>Ready to plan your Japan trip?</h2>
            <p className={styles.ctaDesc}>
              Start with connectivity — the most important thing to sort before you land.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.btnPrimary}>
              Find the Best Japan eSIM →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
