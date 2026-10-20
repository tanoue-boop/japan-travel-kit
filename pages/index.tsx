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
//
// Restyled 2026-10-19: the coloured icon tile and pill badge on each card are gone. The list
// is now four rule-divided rows with a numeral, a serif title and the guide count as a small
// caps line — the category is carried by its name, not by a colour.
const guideHubs = [
  {
    href: "/guides/attractions",
    title: "Things to Do",
    desc: "Tickets, tours, theme parks and day trips — what needs booking ahead, at what official price, and which booking route works from abroad.",
    badge: `${attractionArticles.length} Guides`,
  },
  {
    href: "/guides/transport",
    title: "Getting Around",
    desc: "Shinkansen passes, IC cards, airport trains, and city-by-city transport guides.",
    badge: `${transportArticles.length} Guides`,
  },
  {
    href: "/guides/esim",
    title: "eSIM & SIM Cards",
    desc: "Which eSIM to buy, how to install it, network coverage, and honest plan comparisons.",
    badge: `${esimArticles.length} Guides`,
  },
  {
    href: "/guides/money",
    title: "Money & Payment",
    desc: "Travel cards, ATM access, cash vs card, and how to pay your way across Japan.",
    badge: `${moneyArticles.length} Guides`,
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
  },
  {
    href: "/guides/attractions/things-to-do-kyoto",
    title: "Kyoto",
    desc: "Mostly walk-in temples, which changes how you plan a day — plus kimono rental and the bus pass maths.",
    badge: `${cityCounts.kyoto} Guides`,
  },
  {
    href: "/guides/attractions/things-to-do-osaka",
    title: "Osaka",
    desc: "Where a city pass actually pays off, the one attraction no pass covers, and the Kansai day trips.",
    badge: `${cityCounts.osaka} Guides`,
  },
  {
    href: "/guides/attractions#daytrips",
    title: "Day Trips & Tours",
    desc: "Mt. Fuji, Hakone, Nikko, Kamakura, Nara, Hiroshima — which itinerary to book, and when doing it yourself is cheaper.",
    badge: `${dayTripCount} Guides`,
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
        {/* The WebSite node that used to sit here moved to pages/_document.tsx on
            2026-10-20, where it is emitted on every page alongside Organization —
            keeping it here as well would have declared the site twice on the home page. */}
      </Head>

      {/* Hero — copy left, one photograph right. Replaced the navy gradient / glow /
          pill-button hero on 2026-10-19. */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>Updated for the 2026 season</p>

            <h1 className={styles.title}>
              What to book
              <span className={styles.titleAccent}>before Japan</span>
            </h1>

            <p className={styles.desc}>
              The tickets, tours and day trips that need reserving ahead — with official prices and the
              booking route that works from abroad. Then the trip prep: transport, eSIM and money.
            </p>

            <div className={styles.actions}>
              <Link href="/guides/attractions" className={styles.btnPrimary}>
                Browse Tours &amp; Tickets <span aria-hidden="true">→</span>
              </Link>
              <Link href="#categories" className={styles.btnSecondary}>
                Plan Your Trip
              </Link>
            </div>
          </div>

          <figure className={styles.heroFigure}>
            <Image
              src="/images/hero-kyoto-yasaka-street.webp"
              alt="An empty early-morning street in the Higashiyama district of Kyoto, with the Yasaka Pagoda beyond the machiya rooftops"
              fill
              priority
              sizes="(min-width: 900px) 50vw, 100vw"
              className={styles.heroImage}
            />
          </figure>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCell}>
              <p className={styles.statValue}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Guides hubs — the one category navigation on the page */}
      <section id="categories" className={styles.sectionWhite}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>Plan your trip</p>
          <h2 className={styles.sectionTitle}>Travel Guides</h2>
          <div className={styles.titleRule} />
          <p className={styles.sectionDesc}>
            Start with what you need to book, then sort the rest — in-depth, independent guides for every
            part of your Japan trip.
          </p>

          <div className={styles.ruleGrid}>
            {guideHubs.map((hub, i) => (
              <Link key={hub.href} href={hub.href} className={styles.row}>
                <span className={styles.rowIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.rowBody}>
                  <span className={styles.rowTitle}>{hub.title}</span>
                  <span className={styles.rowDesc}>{hub.desc}</span>
                  <span className={styles.rowFoot}>
                    <span className={styles.rowMeta}>{hub.badge}</span>
                    <span className={styles.rowArrow} aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations — the city hubs, which list every guide for their city */}
      <section className={styles.sectionPaper}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>Destinations</p>
          <h2 className={styles.sectionTitle}>Browse by city</h2>
          <div className={styles.titleRule} />
          <p className={styles.sectionDesc}>
            Most trips are planned city by city. Each hub lists every guide we have written for it.
          </p>

          <div className={styles.ruleGrid}>
            {destinations.map((dest, i) => (
              <Link key={dest.href} href={dest.href} className={styles.row}>
                <span className={styles.rowIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.rowBody}>
                  <span className={styles.rowTitle}>{dest.title}</span>
                  <span className={styles.rowDesc}>{dest.desc}</span>
                  <span className={styles.rowFoot}>
                    <span className={styles.rowMeta}>{dest.badge}</span>
                    <span className={styles.rowArrow} aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <p className={styles.sectionFootLink}>
            <Link href="/guides">Browse all {totalGuides} guides →</Link>
          </p>
        </div>
      </section>

      {/* Popular Guides */}
      <section className={styles.sectionWhite}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>Most read</p>
          <h2 className={styles.sectionTitle}>Popular Guides</h2>
          <div className={styles.titleRule} />
          <p className={styles.sectionDesc}>
            The articles travellers open most before landing in Japan.
          </p>

          <div className={styles.ruleGrid}>
            {popularGuides.map((article, i) => (
              <Link key={article.href} href={article.href} className={styles.row}>
                <span className={styles.rowIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.rowBody}>
                  <span className={styles.rowTitle}>{article.title}</span>
                  <span className={styles.rowDesc}>{article.desc}</span>
                  <span className={styles.rowFoot}>
                    <span className={styles.rowMeta}>{article.badge}</span>
                    <span className={styles.rowArrow} aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust — the one general-interest block on the page. The "Quick tips every visitor
          should know" section that used to sit above it said nothing the guides don't say
          better, and pushed the guide links further down. Removed 2026-10-09. */}
      <section className={styles.trust}>
        <div className={styles.trustInner}>
          <div>
            <p className={styles.trustEyebrow}>How we work</p>
            <h2 className={styles.trustTitle}>Independent. Honest. Up-to-date.</h2>
            <div className={styles.trustRule} />
            <p className={styles.trustDesc}>
              We research every product we recommend and check its prices against the provider&apos;s own published rates. Our reviews are never
              sponsored — we only earn a small affiliate commission if you buy through
              our links, at no extra cost to you.
            </p>
          </div>
          <div className={styles.trustChecks}>
            {["No paid placements", "Verified prices", "Updated monthly"].map((t) => (
              <div key={t} className={styles.trustCheck}>{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaEyebrow}>Start here</p>
          <h2 className={styles.ctaTitle}>Ready to plan your Japan trip?</h2>
          <div className={styles.ctaRule} />
          <p className={styles.ctaDesc}>
            Start with the bookings — the timed tickets and tours are the only part of a Japan trip that
            can sell out before you arrive.
          </p>
          <Link href="/guides/attractions" className={styles.btnPrimary}>
            Browse Tours &amp; Tickets <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
