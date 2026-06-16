import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { esimArticles } from "../lib/guides-esim";
import { transportArticles } from "../lib/guides-transport";
import { moneyArticles } from "../lib/guides-money";
import { attractionArticles } from "../lib/guides-attractions";

const categories = [
  {
    href: "/sim-cards",
    iconSrc: "/icons/card-sim.svg",
    iconAlt: "SIM Cards & eSIM icon",
    title: "SIM Cards & eSIM",
    desc: "Stay connected from day one. Compare tourist SIM cards and eSIMs — data, coverage, and instant activation.",
    badge: "Most Popular",
    badgeCls: styles.badgeSoftRed,
  },
  {
    href: "/wifi-pocket",
    iconSrc: "/icons/card-wifi.svg",
    iconAlt: "Pocket WiFi icon",
    title: "Pocket WiFi",
    desc: "Rent a portable WiFi router for unlimited data. Great for groups, families, or heavy data users.",
    badge: "Great for Groups",
    badgeCls: styles.badgeSoftBlue,
  },
  {
    href: "/transportation",
    iconSrc: "/icons/card-transport.svg",
    iconAlt: "Transportation icon",
    title: "Transportation",
    desc: "JR Pass, IC cards, Shinkansen tickets. Everything you need to travel Japan quickly and affordably.",
    badge: "Save Money",
    badgeCls: styles.badgeSoftGreen,
  },
  {
    href: "/money",
    iconSrc: "/icons/card-money.svg",
    iconAlt: "Money & Payment icon",
    title: "Money & Payment",
    desc: "Best travel cards, ATM tips, and how to handle cash in Japan's largely cash-based economy.",
    badge: "Must Read",
    badgeCls: styles.badgeSoftAmber,
  },
];

const tips = [
  { iconSrc: "/icons/tip-sim.svg",  iconAlt: "Get a SIM before you land", title: "Get a SIM before you land", body: "Order an eSIM online and activate it the moment your plane touches down — no airport queues." },
  { iconSrc: "/icons/tip-cash.svg", iconAlt: "Always carry cash",          title: "Always carry cash",          body: "Japan is still cash-heavy. 7-Eleven and Japan Post ATMs accept foreign Visa/Mastercard." },
  { iconSrc: "/icons/tip-ic.svg",   iconAlt: "Load an IC card",            title: "Load an IC card",            body: "Suica or Pasmo works on almost every train, bus, and at convenience stores nationwide." },
  { iconSrc: "/icons/tip-plug.svg", iconAlt: "Type A plugs",               title: "Type A plugs (100V)",        body: "Same shape as the US. Most devices work without an adapter — just check your voltage." },
];

const stats = [
  { value: "4+",   label: "SIM options compared" },
  { value: "100%", label: "Independent reviews"   },
  { value: "2026", label: "Prices verified"        },
  { value: "Free", label: "No sign-up required"    },
];

// Content guide hubs — route crawlers from the homepage into the article ecosystem
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
  {
    href: "/guides",
    iconSrc: "/icons/icon-guide.svg",
    iconAlt: "All guides icon",
    title: "All Guides",
    desc: "Browse every Japan travel guide in one place, organised by topic.",
    badge: "Browse all",
    badgeCls: styles.badgeSoftRed,
  },
];

// Popular individual guides — direct links push crawl equity to key articles
const popularHrefs = [
  "/guides/esim/best-esim-japan",
  "/guides/esim/cheapest-esim-japan",
  "/guides/transport/jr-pass-guide",
  "/guides/transport/ic-cards-japan",
  "/guides/money/best-travel-card-japan",
  "/guides/money/best-travel-insurance-japan",
  "/guides/attractions/teamlab-tokyo-tickets",
  "/guides/attractions/usj-tickets-express-pass",
  "/guides/attractions/shibuya-sky-tickets",
];
const allArticles = [...esimArticles, ...transportArticles, ...moneyArticles, ...attractionArticles];
const popularGuides = popularHrefs
  .map((href) => allArticles.find((a) => a.href === href))
  .filter((a): a is (typeof allArticles)[number] => Boolean(a));

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
            <Link href="/sim-cards" className={styles.btnPrimary}>
              Compare SIM Cards →
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

      {/* Categories */}
      <section id="categories" className={styles.categories}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionLabel}>What we cover</span>
          <h2 className={styles.sectionTitle}>What do you need help with?</h2>
          <p className={styles.sectionDesc}>
            Practical, unbiased guides on everything every Japan visitor needs to sort out.
          </p>
        </div>

        <div className={styles.catGrid}>
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href} className={styles.catCard}>
              <div className={styles.catTop}>
                <div className={styles.catLeft}>
                  <div className={styles.catIconRow}>
                    <span className={styles.catIcon}>
                      <Image src={cat.iconSrc} width={46} height={46} alt={cat.iconAlt} unoptimized />
                    </span>
                    <span className={`${styles.catBadge} ${cat.badgeCls}`}>{cat.badge}</span>
                  </div>
                  <h3 className={styles.catTitle}>{cat.title}</h3>
                  <p className={styles.catDesc}>{cat.desc}</p>
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

      {/* Travel Guides hubs */}
      <section className={styles.categories}>
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

      {/* Tips */}
      <section className={styles.tips}>
        <div className={styles.tipsDots} />
        <div className={styles.tipsInner}>
          <div className={styles.tipsHead}>
            <span className={styles.tipsLabel}>Before you go</span>
            <h2 className={styles.tipsTitle}>Quick tips every visitor should know</h2>
            <p className={styles.tipsSubtitle}>Japan has some quirks. Sort these out before you board the plane.</p>
          </div>
          <div className={styles.tipsGrid}>
            {tips.map((t) => (
              <div key={t.title} className={styles.tipCard}>
                <div className={styles.tipIcon}>
                  <Image src={t.iconSrc} width={48} height={48} alt={t.iconAlt} unoptimized />
                </div>
                <h3 className={styles.tipTitle}>{t.title}</h3>
                <p className={styles.tipBody}>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className={styles.trust}>
        <div className={styles.trustBox}>
          <span className={styles.trustFlag}>🇯🇵</span>
          <div className={styles.trustContent}>
            <h2 className={styles.trustTitle}>Independent. Honest. Up-to-date.</h2>
            <p className={styles.trustDesc}>
              We research and test every product we recommend. Our reviews are never
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
            <Link href="/sim-cards" className={styles.btnPrimary}>
              Find the Best Japan SIM Card →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
