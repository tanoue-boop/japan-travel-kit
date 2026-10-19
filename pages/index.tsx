import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { esimArticles } from "../lib/guides-esim";
import { transportArticles } from "../lib/guides-transport";
import { moneyArticles } from "../lib/guides-money";
import { attractionArticles } from "../lib/guides-attractions";
import { articlesForCity } from "../lib/guide-hub";
import { pageUpdated } from "../lib/page-dates";

const allArticles = [...esimArticles, ...transportArticles, ...moneyArticles, ...attractionArticles];
const totalGuides = allArticles.length;

const dayTripCount = attractionArticles.filter((a) => a.group === "daytrips").length;
const cityCounts = {
  tokyo: articlesForCity("tokyo", attractionArticles, transportArticles).length,
  kyoto: articlesForCity("kyoto", attractionArticles, transportArticles).length,
  osaka: articlesForCity("osaka", attractionArticles, transportArticles).length,
};

// The homepage's only category navigation. Until 2026-10-09 a "What do you need help with?"
// section sat above this one pointing at /sim-cards, /wifi-pocket, /transport and /money —
// the first two now 301 to guides already linked below, and the other two *were* these hubs.
// One set of four cards, one destination each.
//
// Things to Do moved to the front 2026-10-19: it is the largest category, the one the daily
// article queue feeds, and the one the traffic and the bookings come from. eSIM, which this
// page was built around in September, now sits where its share of the site actually is.
const guideHubs = [
  {
    href: "/guides/attractions",
    iconSrc: "/icons/icon-attractions.svg",
    iconAlt: "Things to Do icon",
    title: "Things to Do",
    desc: "Tickets, tours, theme parks and day trips — what needs booking ahead, at what official price, and which booking route works from abroad.",
    badge: `${attractionArticles.length} Guides`,
    badgeCls: styles.badgeSoftBlue,
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
    href: "/guides/esim",
    iconSrc: "/icons/card-sim.svg",
    iconAlt: "eSIM guides icon",
    title: "eSIM & SIM Cards",
    desc: "Which eSIM to buy, how to install it, network coverage, and honest plan comparisons.",
    badge: `${esimArticles.length} Guides`,
    badgeCls: styles.badgeSoftRed,
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
];

// Destination cards. Most visitors describe what they want by city ("things to do in Kyoto"),
// not by our category names, and each city hub now lists every guide we have for that city.
const destinations = [
  {
    href: "/guides/attractions/things-to-do-tokyo",
    title: "Tokyo",
    desc: "The decks, the teamLab slots, Disney, the studio tour — and the four day trips out of the city.",
    badge: `${cityCounts.tokyo} Guides`,
    badgeCls: styles.badgeSoftBlue,
  },
  {
    href: "/guides/attractions/things-to-do-kyoto",
    title: "Kyoto",
    desc: "Mostly walk-in temples, which changes how you plan a day — plus kimono rental and the bus pass maths.",
    badge: `${cityCounts.kyoto} Guides`,
    badgeCls: styles.badgeSoftGreen,
  },
  {
    href: "/guides/attractions/things-to-do-osaka",
    title: "Osaka",
    desc: "Where a city pass actually pays off, the one attraction no pass covers, and the Kansai day trips.",
    badge: `${cityCounts.osaka} Guides`,
    badgeCls: styles.badgeSoftAmber,
  },
  {
    href: "/guides/attractions#daytrips",
    title: "Day Trips & Tours",
    desc: "Mt. Fuji, Hakone, Nikko, Kamakura, Nara, Hiroshima — which itinerary to book, and when doing it yourself is cheaper.",
    badge: `${dayTripCount} Guides`,
    badgeCls: styles.badgeSoftRed,
  },
];

// Popular guides. Reordered 2026-10-19: the five attraction and tour guides that lead are the
// ones GA4 ranks highest and the ones the Klook commission comes from — shibuya-sky-tickets is
// the single most-read page on the site. The money and eSIM guides that earn kept their places
// behind them. Direct links from the homepage push crawl equity to the articles worth ranking.
const popularHrefs = [
  "/guides/attractions/shibuya-sky-tickets",
  "/guides/attractions/teamlab-tokyo-tickets",
  "/guides/attractions/tokyo-disney-tickets",
  "/guides/attractions/mt-fuji-day-tour-from-tokyo",
  "/guides/attractions/kyoto-nara-day-tour-from-osaka",
  "/guides/money/wise-vs-revolut-japan",
  "/guides/esim/best-esim-japan",
  "/guides/esim/sakura-mobile-review",
  "/guides/transport/osaka-airport-transfer",
  "/guides/money/best-travel-insurance-japan",
  "/guides/transport/ic-cards-japan",
  "/guides/transport/osaka-metro-pass",
];
const popularGuides = popularHrefs.map((href) => {
  const article = allArticles.find((a) => a.href === href);
  if (!article) throw new Error(`index: popular guide ${href} is not in any category list`);
  return article;
});

const TITLE = "Japan Travel Kit — Japan Tickets, Tours & Trip Planning for 2026";
const DESC =
  "Which Japan attractions, tours and day trips need booking ahead — with official prices and the booking route that works from abroad. Plus the transport, eSIM and money basics to sort before you land.";

/**
 * "Prices checked" stat. Taken from the most recently updated Things to Do guide rather than
 * the build date, so the number on the homepage is a date we actually re-checked prices on.
 */
export const getStaticProps = () => {
  const latest = attractionArticles
    .map((a) => pageUpdated(a.href).iso)
    .sort()
    .reverse()[0];
  const [y, m] = latest.split("-").map(Number);
  return {
    props: {
      pricesChecked: new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }),
    },
  };
};

export default function HomePage({ pricesChecked }: { pricesChecked: string }) {
  // Counts and dates, not claims: nothing here asserts we have been anywhere or tried anything.
  const stats = [
    { value: `${attractionArticles.length}`, label: "Ticket & tour guides" },
    { value: "3",                            label: "City hubs: Tokyo, Kyoto, Osaka" },
    { value: `${totalGuides}`,               label: "Guides in total" },
    { value: pricesChecked,                  label: "Prices last checked" },
  ];

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content="https://www.japan-travel-kit.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Japan Travel Kit",
              url: "https://www.japan-travel-kit.com",
              description:
                "Japan attraction tickets, tours and day trips — what to book ahead, at what price — plus transport, eSIM and money guides for foreign visitors.",
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
            What to book
            <br />
            <span className={styles.titleAccent}>before Japan</span>
          </h1>

          <p className={styles.desc}>
            The tickets, tours and day trips that need reserving ahead — with official prices and the
            booking route that works from abroad. Then the trip prep: transport, eSIM and money.
          </p>

          <div className={styles.actions}>
            <Link href="/guides/attractions" className={styles.btnPrimary}>
              Browse Tours &amp; Tickets →
            </Link>
            <Link href="#categories" className={styles.btnGhost}>
              Plan Your Trip
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
          <span className={styles.sectionLabel}>Plan your trip</span>
          <h2 className={styles.sectionTitle}>Travel Guides</h2>
          <p className={styles.sectionDesc}>
            Start with what you need to book, then sort the rest — in-depth, independent guides for every
            part of your Japan trip.
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

        {/* Destinations — the city hubs, which list every guide for their city */}
        <h3 className={styles.subHead}>Browse by city</h3>

        <div className={styles.catGrid}>
          {destinations.map((dest) => (
            <Link key={dest.href} href={dest.href} className={styles.catCard}>
              <div className={styles.catTop}>
                <div className={styles.catLeft}>
                  <div className={styles.catIconRow}>
                    <span className={`${styles.catBadge} ${dest.badgeCls}`}>{dest.badge}</span>
                  </div>
                  <p className={styles.catTitle}>{dest.title}</p>
                  <p className={styles.catDesc}>{dest.desc}</p>
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
              Start with the bookings — the timed tickets and tours are the only part of a Japan trip that
              can sell out before you arrive.
            </p>
            <Link href="/guides/attractions" className={styles.btnPrimary}>
              Browse Tours &amp; Tickets →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
