import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Guides.module.css";
import PartnerPick, { PartnerTextLink } from "../../components/PartnerPick";
import HotelStayEntry from "../../components/HotelStayEntry";
import { fujiDayTour, klookEsim, tokyoSubwayTicket } from "../../lib/klook-links";
import { esimCategory } from "../../lib/guides-esim";
import { transportCategory } from "../../lib/guides-transport";
import { moneyCategory } from "../../lib/guides-money";
import { attractionsCategory } from "../../lib/guides-attractions";
import { groupedArticles, type GuideCategory } from "../../lib/guide-hub";
import { itemListJsonLd } from "../../lib/structured-data";

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

// A single string: JSX children inside <title> render as "All <!-- -->173<!-- --> Guides".
// Site name first: the page's largest query is the navigational "japan-travel-kit.com", and the
// home page (/) leads with "Japan Travel Kit | Tickets, Tours…", so the two titles still differ after it.
const TITLE = "Japan Travel Kit: Japan Travel Guides for 2026";
const DESC =
  "Japan Travel Kit's guide index: every Japan travel guide for 2026 in four topics — eSIM, money, transport and attraction tickets to book before you fly.";

// Questions this page is reached for (GSC, Oct–Nov 2026), answered in one or two sentences each
// and linked to the guide that carries the detail.
const faqItems = [
  {
    q: "What is Japan Travel Kit?",
    a: "Japan Travel Kit (japan-travel-kit.com) is an independent English-language site of Japan travel guides on eSIM, money, transport and attraction tickets. Prices and hours are taken from official sites and each guide shows the date it was last updated.",
  },
  {
    q: "What is the best eSIM for Japan?",
    a: "For most trips, Simbye: it has the lowest list price for 10 GB of the six eSIMs compared in the best eSIM for Japan guide. Sakura Mobile is the only one of the six that comes with a Japanese phone number.",
  },
  {
    q: "What is the best pocket WiFi for Japan, or is an eSIM better?",
    a: "For one or two travellers an eSIM is cheaper and there is nothing to collect or return. A pocket WiFi pays off when three or more people or devices share one router; the pocket WiFi guide compares Sakura Mobile, Ninja WiFi and Japan Wireless per day.",
  },
];

// ItemList of every guide, in the order this page renders them, so an AI crawler reading
// one page gets the whole site's contents rather than four hub links.
const ALL_GUIDES = categories.flatMap(({ category }) =>
  groupedArticles(category).flatMap(({ articles }) => articles),
);

export default function GuidesIndexPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: itemListJsonLd({
              route: "/guides",
              name: `Japan Travel Kit — all ${totalGuides} Japan travel guides`,
              description: DESC,
              items: ALL_GUIDES,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
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
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Guides</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Travel Guides</p>
          <h1 className={styles.heroTitle}>Japan Travel Guides 2026: eSIM, Money, Transport and Tickets</h1>
          <div className={styles.heroRule} />
          <p className={styles.heroDesc}>
            Japan Travel Kit has {totalGuides} Japan travel guides for 2026, and all of them sit in four topics below: <Link href="/guides/esim" style={{ color: "inherit", textDecoration: "underline" }}>eSIM</Link>,{" "}
            <Link href="/guides/money" style={{ color: "inherit", textDecoration: "underline" }}>money</Link>,{" "}
            <Link href="/guides/transport" style={{ color: "inherit", textDecoration: "underline" }}>transport</Link> and{" "}
            <Link href="/guides/attractions" style={{ color: "inherit", textDecoration: "underline" }}>tickets and things to do</Link>.
            The short answers: Simbye is the{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "inherit", textDecoration: "underline" }}>eSIM for most trips</Link>, carry{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "inherit", textDecoration: "underline" }}>¥10,000–¥20,000 in cash a day</Link>, and
            book teamLab, SHIBUYA SKY and Universal Studios tickets before you fly.
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

        {/* Visible copy of faqItems (FAQPage above), with links to the guide behind each answer. */}
        <section style={{ marginTop: "2.5rem" }}>
          <p className={styles.sectionLabel}>Quick answers</p>
          <h2 className={styles.sectionTitle}>What Is Japan Travel Kit?</h2>
          <p className={styles.catDesc} style={{ display: "block", marginBottom: "1.5rem" }}>
            Japan Travel Kit (japan-travel-kit.com) is an independent English-language site of {totalGuides} Japan
            travel guides on eSIM, money, transport and attraction tickets. Prices and hours are taken from official
            sites, and each guide shows the date it was last updated.
          </p>
          <h2 className={styles.sectionTitle}>What Is the Best eSIM for Japan?</h2>
          <p className={styles.catDesc} style={{ display: "block", marginBottom: "1.5rem" }}>
            For most trips, Simbye: it has the lowest list price for 10 GB of the six eSIMs compared in the{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ textDecoration: "underline" }}>best eSIM for Japan</Link>{" "}
            guide. Sakura Mobile is the only one of the six that comes with a Japanese phone number.
          </p>
          <h2 className={styles.sectionTitle}>What Is the Best Pocket WiFi for Japan, or Is an eSIM Better?</h2>
          <p className={styles.catDesc} style={{ display: "block", marginBottom: "1.5rem" }}>
            For one or two travellers an eSIM is cheaper and there is nothing to collect or return. A pocket WiFi pays
            off when three or more people or devices share one router; the{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={{ textDecoration: "underline" }}>best pocket WiFi for Japan</Link>{" "}
            guide compares Sakura Mobile, Ninja WiFi and Japan Wireless per day.
          </p>
        </section>

        <PartnerPick
          label="Before you land"
          heading="Three things to book ahead"
          cta={{ href: klookEsim.url, label: klookEsim.ctaLabel }}
        >
          Most of these guides come down to a few bookings, and Klook sells all three in one account: a{" "}
          <PartnerTextLink href={klookEsim.url}>Japan eSIM</PartnerTextLink> to get online when you land, the{" "}
          <PartnerTextLink href={tokyoSubwayTicket.url}>Tokyo Subway Ticket</PartnerTextLink> for your first days in
          the city, and a <PartnerTextLink href={fujiDayTour.url}>Mt. Fuji day tour</PartnerTextLink> for a day out.
        </PartnerPick>

        {/* A28 (27 Nov 2026): the way into the where-to-stay guides and Klook hotels (6.5%). */}
        <HotelStayEntry />

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
