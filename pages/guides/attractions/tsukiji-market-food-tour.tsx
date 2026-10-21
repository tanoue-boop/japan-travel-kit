import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  tsukijiCultureFoodTour,
  tsukijiFoodCultureWalkingTour,
  tsukijiFoodDrinkHalfDayTour,
  tsukijiStreetFoodTour,
} from "../../../lib/klook-links";

/**
 * The Tsukiji-only food guide. It deliberately does not overlap
 * /guides/attractions/tokyo-food-tour, which is the evening izakaya and bar-hopping
 * page: this one is a morning in one specific market, and the two link to each other
 * rather than repeating each other.
 *
 * The hours, closed days, buyer-priority rule and station walking times below were read
 * off the Tsukiji Outer Market's own site (tsukiji.or.jp) on 21 Oct 2026. The Toyosu
 * figures — the 05:00 visitor opening, the 05:30–06:30 tuna auction and the
 * 05:45–06:25 observation deck with its advance lottery — come from the Tokyo
 * Metropolitan Central Wholesale Market (shijou.metro.tokyo.lg.jp) and
 * toyosu-market.or.jp on the same date.
 *
 * Tour durations and meeting points are as each Klook listing describes itself. No
 * Klook price appears anywhere: Klook answers automated reads of its product pages
 * with HTTP 403, so no figure from a listing could be verified.
 */

const CHECKED_ISO = "2026-10-21";
const CHECKED = checkedLabel(CHECKED_ISO);

/** Opening hours as the market's own site publishes them. */
const hoursRows = [
  {
    what: "Tsukiji Outer Market shops (general)",
    hours: "9:00 a.m. – 2:00 p.m.",
    closed: "Many shops closed on Sundays and on some Wednesdays",
    note: "Each shop sets its own hours — the market-wide calendar follows the Tokyo Central Wholesale Market calendar",
  },
  {
    what: "Professional buyers' priority window",
    hours: "Until 9:00 a.m.",
    closed: "—",
    note: "The market asks visitors to give trade buyers priority before 9:00; this is a working market first",
  },
  {
    what: "Plat Tsukiji information centre",
    hours: "8:00 a.m. – 2:00 p.m. weekdays and Saturday; 10:00 a.m. – 2:00 p.m. Sundays, national holidays and market closure days",
    closed: "Year-end and New Year holidays",
    note: "The place to confirm which shops are trading on your date",
  },
  {
    what: "Plat Tsukiji public lounge",
    hours: "6:00 a.m. – 4:00 p.m. weekdays and Saturday; 7:00 a.m. – 4:00 p.m. Sundays, national holidays and market closure days",
    closed: "Year-end and New Year holidays",
    note: "Opens well before the shops do — useful if you arrive early for a tour",
  },
];

/** Tsukiji against Toyosu, which is the question everyone actually has. */
const marketRows = [
  {
    market: "Tsukiji Outer Market",
    what: "A street grid of retail and restaurant stalls — sushi, tamagoyaki, grilled skewers, knives, dried goods",
    when: "Shops generally 9:00 a.m. – 2:00 p.m.; buyers have priority until 9:00",
    auction: "No wholesale auction — that moved to Toyosu in 2018",
    getting: "Tsukiji Station (Tokyo Metro Hibiya Line) and Tsukijishijo Station (Toei Oedo Line) are both a 1-minute walk; Higashi-ginza about 3 minutes",
  },
  {
    market: "Toyosu Market",
    what: "The working wholesale market, seen from visitor corridors above the trading floors, plus restaurants",
    when: "General visitors from 5:00 a.m.; tuna auction about 5:30 – 6:30 a.m. on trading days",
    auction: "Observation deck 5:45 – 6:25 a.m. by advance online application and lottery; the 2nd-floor corridor needs no booking but mainly shows the frozen tuna",
    getting: "Shijo-mae Station on the Yurikamome line",
  },
];

/** The four bookable tour formats, as each listing describes itself. */
const tourRows = [
  {
    tour: "Street food tour",
    length: "About 2 hours",
    meet: "Tsukiji Hongwanji temple",
    covers: "Skewers, tamagoyaki, sushi, wagyu and seasonal seafood, after a stop at the temple",
  },
  {
    tour: "Food and culture walking tour",
    length: "About 3 hours",
    meet: "Tsukiji Hongan-ji, departing 08:30 or 11:00",
    covers: "Small group of up to 19, English-guided, with wagyu, sushi, tamagoyaki and fruit",
  },
  {
    tour: "Food and drink half-day tour",
    length: "Half day",
    meet: "As stated on the listing",
    covers: "Five tastings with a local guide on the market's history",
  },
  {
    tour: "Culture and food tour with a sit-down sushi stop",
    length: "As stated on the listing",
    meet: "As stated on the listing",
    covers: "Guided in English, Chinese or Spanish, ending at a sushi restaurant with sake",
  },
];

const whoFor = [
  {
    title: "Go at 9:00 if…",
    desc: `You want the market working but not closed to you. The outer market's published hours are 9:00 a.m. to 2:00 p.m., and the market itself asks that trade buyers get priority until 9:00 — so 9:00 is the earliest hour that is genuinely yours. Arrive then and you get the stalls at full strength with the queues still forming. Hours read off tsukiji.or.jp on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Go at 11:00 if…",
    desc: "You would rather not set an alarm, and you accept the trade-off. The 11:00 departures exist because plenty of visitors will not make a breakfast start, and the market is still trading. What you lose is the pick of the day: the stalls that sell out, sell out, and by early afternoon shutters start coming down ahead of the 2:00 p.m. close. It is the right call if the alternative is not going.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "Go to Toyosu instead if…",
    desc: `The auction is the thing you came for. Tsukiji has not hosted the wholesale tuna auction since it moved to Toyosu in 2018. Toyosu opens to general visitors at 5:00 a.m., the tuna auction runs roughly 5:30 to 6:30 on trading days, and the close-up observation deck is 5:45 to 6:25 by advance online application on a lottery — the 2nd-floor corridor above it needs no booking at all. Read off the Tokyo Metropolitan Central Wholesale Market's own pages on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12c3-4 7-5 10-5s6 2 8 5c-2 3-5 5-8 5s-7-1-10-5z" />
        <circle cx="16" cy="12" r="1" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Check your date against the market calendar first",
    desc: `This is the step that saves a wasted morning. Many Tsukiji shops close on Sundays and on some Wednesdays, and the market-wide calendar on the official site follows the Tokyo Central Wholesale Market's trading days — but it also says plainly that each shop keeps its own schedule. If your only free morning is a Wednesday, check the calendar before you book anything. Read off tsukiji.or.jp on ${CHECKED}.`,
  },
  {
    title: "Pick the start time, because it is the real choice",
    desc: "A 08:30 tour and an 11:00 tour of the same market are different mornings. The earlier one catches the market at full tilt and finishes in time for the rest of the day; the later one is easier on jet lag but runs into the afternoon wind-down. Several operators sell both departures on the same listing, so this is a dropdown rather than a different booking.",
  },
  {
    title: "Decide whether you want a sit-down meal in the price",
    desc: "The formats split here. A street-food walk is two hours of standing tastings; a culture-and-food tour adds a sit-down sushi course and sake at the end, which is a meal rather than a snack. The second is longer and costs more, and it is the better buy if it is replacing lunch rather than preceding it.",
  },
  {
    title: "Tell the operator about allergies before you pay, not on the day",
    desc: "Worth reading the fine print: at least one of the Tsukiji listings states outright that it cannot accommodate allergies, gluten intolerance, vegetarian diets or other dietary needs. A market tour is a sequence of fixed tastings at other people's stalls, so there is nothing for a guide to substitute. If this applies to you, check the listing's own wording before booking.",
  },
  {
    title: "Book ahead for the small-group departures",
    desc: "The walking tours cap out — one of the listings puts its group at up to 19 people, and the sit-down formats are smaller still — so popular morning slots on weekends and through cherry-blossom and autumn season go first. Midweek, a few days is usually enough. Same-day is possible but it is the thing least worth relying on, because the morning departure is the one everybody wants.",
  },
  {
    title: "Go hungry, and carry cash",
    desc: "A tasting tour is a meal spread over two to three hours, so do not eat first. The outer market is also a traditional retail street rather than a mall: card acceptance has improved but is not universal, and the small stalls are exactly where it is patchiest. Carry some yen for the things you buy outside the tour.",
  },
];

const faqItems = [
  {
    q: "Is a Tsukiji market food tour worth it?",
    a: `Yes, for one specific reason: the outer market is a grid of unlabelled stalls where the best things are not the ones with English menus, and a guide collapses an hour of guesswork into a sequence of tastings. The listings run from about two hours of street food up to a half day with a sit-down sushi course, and they all cover ground you could walk yourself — what you are buying is knowing which of the hundreds of stalls to stop at and what to order there. If you would rather do it alone, go at 9:00 a.m. when the buyers' priority window ends and work along the main lanes. Tour lengths as stated on the listings, checked ${CHECKED}.`,
  },
  {
    q: "What are Tsukiji Outer Market's opening hours?",
    a: `The market's own site gives shop hours as 9:00 a.m. to 2:00 p.m., with the caveat that each shop sets its own. It also asks visitors to give professional buyers priority until 9:00 a.m. — this is a working market, not an attraction with a gate. The Plat Tsukiji information centre opens earlier, at 8:00 a.m. on weekdays and Saturdays and 10:00 a.m. on Sundays, national holidays and market closure days, closing at 2:00 p.m.; its public lounge opens at 6:00 a.m. on weekdays and Saturdays and 7:00 a.m. otherwise, until 4:00 p.m. Read off tsukiji.or.jp on ${CHECKED}.`,
  },
  {
    q: "What days is Tsukiji market closed?",
    a: `There is no single answer, which is exactly why it catches people out. The official site says many shops are closed on Sundays and on some Wednesdays, and its calendar follows the Tokyo Central Wholesale Market's trading-day calendar — but the same page tells you to check the individual shop's schedule, because the outer market is hundreds of independent businesses rather than one operator. In practice: a weekday that is not a Wednesday is the safe bet, a Wednesday needs checking against the calendar, and a Sunday will be noticeably thinner. The Plat Tsukiji information centre is open every day except the year-end and New Year holidays. Checked ${CHECKED}.`,
  },
  {
    q: "What is the difference between Tsukiji and Toyosu?",
    a: `Tsukiji is where you eat; Toyosu is where the trading happens. The wholesale market — the tuna auction, the trading floors — moved to Toyosu in 2018, and what stayed at Tsukiji is the outer market, a street grid of retail stalls and small restaurants that is open to the public and does not need a reservation. Toyosu is a working facility you visit from viewing corridors: general visitors can enter from 5:00 a.m., the tuna auction runs about 5:30 to 6:30 a.m. on trading days, the close-up observation deck is 5:45 to 6:25 a.m. by advance online application on a lottery, and the second-floor visitors' corridor needs no booking but looks mainly onto the frozen tuna. If you want breakfast, go to Tsukiji. If you want the auction, go to Toyosu, and apply weeks in advance. Read off the market operators' own pages on ${CHECKED}.`,
  },
  {
    q: "What time should you go to Tsukiji?",
    a: "Nine in the morning is the sweet spot, and the reason is written into the market's own rules: trade buyers have priority until 9:00, and the shops' published hours start then. Turn up at 9:00 and the stalls are fully stocked, the queues at the famous ones are still short, and you have five hours before the 2:00 p.m. close. By midday the popular items start selling out, and by one o'clock shutters are coming down. If you are jet-lagged and awake at six, the Plat Tsukiji public lounge opens at 6:00 a.m. on weekdays and Saturdays — but the shops will not be trading yet.",
  },
  {
    q: "How long does a Tsukiji food tour take?",
    a: `Two to four hours depending on the format. The street-food version is listed at about two hours; the food-and-culture walking tour at about three, departing either 08:30 or 11:00; the food-and-drink format is sold as a half day. Add the walk from the station — one minute from either Tsukiji Station on the Hibiya Line or Tsukijishijo on the Toei Oedo Line — and a morning tour leaves your afternoon intact. Durations as stated on the listings, checked ${CHECKED}.`,
  },
  {
    q: "Do you need to book a Tsukiji food tour in advance?",
    a: "For the morning departures, yes. The groups are capped — one listing states up to 19 people, and the sit-down formats are smaller — and the 08:30 slot is the one everybody wants, so weekends and the cherry-blossom and autumn seasons fill first. A few days ahead covers most midweek dates. The market itself needs no booking at all: you can simply walk in during opening hours, which is the fallback if the tour you want is sold out.",
  },
  {
    q: "How do you get to Tsukiji Outer Market?",
    a: `It is one of the easier Tokyo destinations to reach. The market's own access page lists Tsukiji Station on the Tokyo Metro Hibiya Line and Tsukijishijo Station on the Toei Oedo Line as a one-minute walk each, and Higashi-ginza — served by both the Toei Asakusa Line and the Hibiya Line — as about three minutes. Note that none of those are JR, so a Japan Rail Pass does not cover the trip; a Tokyo Subway Ticket does. Walking times read off tsukiji.or.jp on ${CHECKED}.`,
  },
  {
    q: "Can you take children on a Tsukiji food tour?",
    a: "Usually, but check the listing rather than assuming. The constraint is rarely the market and almost always the food: the tastings are fixed, include raw fish, and several operators state that they cannot substitute items. A short street-food walk tends to suit a child better than a three-hour tour ending in a sushi course. Going independently sidesteps the problem entirely — the outer market has plenty of grilled and fried things on sticks, and nobody has to finish anything.",
  },
  {
    q: "What happens if it rains?",
    a: "Less than you would fear. The outer market is a tight grid of narrow lanes with stall awnings over much of it, and the tours run rain or shine because the stops are the point. An umbrella is awkward in the crowded lanes, so a rain jacket is the better choice. What rain does change is the crowd: a wet weekday morning at Tsukiji is noticeably easier going than a dry Saturday one.",
  },
  {
    q: "Tsukiji or an evening izakaya tour — which should you book?",
    a: "They are different meals and they do not clash, which is why plenty of people do both on the same trip. Tsukiji is a morning: seafood, standing tastings, a working market, finished by lunchtime. An izakaya crawl is a night: small bars, counters, drinking, and places that are hard to walk into as an outsider. If you only have room for one and you came for the food, take Tsukiji for the produce and the izakaya tour for the atmosphere — our Tokyo food and izakaya tours guide covers the evening version.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/tsukiji-market-food-tour") },
});

const TITLE = "Tsukiji Market Food Tour (2026): Hours, What to Eat and Which Tour to Book";
const DESC =
  "A Tsukiji market food tour in 2026: the outer market trades 9:00 a.m. to 2:00 p.m. with many shops closed Sundays and some Wednesdays, buyers have priority until 9:00, and tours run two to four hours from Tsukiji Hongan-ji. Plus how Tsukiji differs from Toyosu.";

export default function TsukijiMarketFoodTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tsukiji-market-food-tour" />
        {hreflangLinks("/guides/attractions/tsukiji-market-food-tour")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tsukiji-market-food-tour" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/attractions/tsukiji-market-food-tour",
              headline: TITLE,
              description: DESC,
              updated,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Tsukiji Market Food Tour",
                  item: "https://www.japan-travel-kit.com/guides/attractions/tsukiji-market-food-tour",
                },
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
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tsukiji Market Food Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tsukiji Market Food Tour (2026):<br />Hours, What to Eat and Which Tour to Book
          </h1>
          <p className={styles.heroSubtitle}>
            The outer market opens at nine and starts shutting at two, and some Wednesdays it
            barely opens at all. Here is how to time the morning — and which tour format fits it.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official hours, dated", "Tsukiji vs Toyosu"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclosure */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Market hours</p>
                <p className={styles.verdictStatValue}>9:00 a.m. – 2:00 p.m.</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Closed</p>
                <p className={styles.verdictStatValue}>Many shops Sundays &amp; some Weds</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best arrival</p>
                <p className={styles.verdictStatValue}>9:00, when buyer priority ends</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tour length</p>
                <p className={styles.verdictStatValue}>2–4 hours, 08:30 or 11:00</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> a Tsukiji market food tour is a morning in the Tsukiji Outer
              Market, a minute&apos;s walk from Tsukiji or Tsukijishijo stations, where shops trade from
              9:00 a.m. to 2:00 p.m. and professional buyers have priority until 9:00. Many shops close
              on Sundays and on some Wednesdays, so check your date first. Tours run about two hours
              for street food up to a half day with a sit-down sushi course, with 08:30 and 11:00
              departures from Tsukiji Hongan-ji. The tuna auction is not here — it moved to Toyosu in
              2018. Hours read off tsukiji.or.jp on {CHECKED}.
            </p>
            <a
              href={tsukijiStreetFoodTour.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check Tsukiji food tours on Klook →
            </a>
          </div>
        </div>

        {/* Intro / scope */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Tsukiji Outer Market?</h2>
          <p className={styles.bodyText}>
            It is the retail half of what used to be Tokyo&apos;s great fish market: a dense grid of
            narrow lanes lined with stalls and small restaurants selling sushi, grilled scallops,
            tamagoyaki on a stick, uni, dried goods, knives and tea. The wholesale half — the trading
            floors and the tuna auction — moved to Toyosu in 2018. The outer market stayed where it
            was, kept trading, and is open to anyone during shop hours with nothing to book.
          </p>
          <p className={styles.bodyText}>
            This guide is about that one market and the tours of it. If you want the evening version
            of a Tokyo food day — izakaya counters, Golden Gai, bar hopping in Shinjuku — that is our{" "}
            <Link href="/guides/attractions/tokyo-food-tour">Tokyo food and izakaya tours guide</Link>,
            and if you want to cook rather than eat,{" "}
            <Link href="/guides/attractions/tokyo-cooking-class">Tokyo cooking classes</Link> covers the
            sushi and ramen formats. The three are a morning, an evening and an afternoon, and they do
            not overlap.
          </p>
        </section>

        {/* Hours table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What Are Tsukiji Outer Market&apos;s Opening Hours?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "Hours", "Closed", "What to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.closed}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off the Tsukiji Outer Market&apos;s own site, tsukiji.or.jp, on {CHECKED} and subject to
            change. The market publishes a calendar based on the Tokyo Central Wholesale Market&apos;s
            trading days, while stating that each shop keeps its own schedule — so treat the calendar as
            a guide to the day, not a guarantee about a particular shop.
          </p>
        </section>

        {/* Tsukiji vs Toyosu */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Tsukiji or Toyosu — Which One Do You Actually Want?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Almost every misunderstanding about Tsukiji comes from this. They are two separate places
            on two separate stations, doing two separate jobs.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Market", "What it is", "When", "The auction", "Getting there"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {marketRows.map((row) => (
                    <tr key={row.market}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.market}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.auction}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.getting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Tsukiji figures from tsukiji.or.jp; Toyosu figures from the Tokyo Metropolitan Central
            Wholesale Market and toyosu-market.or.jp. Both read on {CHECKED} and subject to change. The
            Toyosu observation-deck lottery is applied for online in advance, in groups of up to five,
            with one entry per group — it is not first come, first served.
          </p>
        </section>

        {/* Timing */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>What Time Should You Go?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tour formats */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which tour</span>
          <h2 className={styles.sectionTitle}>Which Tsukiji Food Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Four formats, described as each listing describes itself. The real variables are how long
            you are standing and whether a sit-down meal is in the price.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Format", "Length", "Meeting point", "What it covers"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.meet}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Durations, meeting points and inclusions as the four Klook listings state them, all
            confirmed live and on sale on {CHECKED}. No price appears here: Klook answers automated
            reads of its product pages with HTTP 403, so there is no figure we could have verified —
            open a listing for the current price and its cancellation terms on your date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={tsukijiFoodCultureWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Compare Tsukiji tours on Klook →
            </a>
          </div>
        </section>

        {/* Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>Planning the Morning</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            A Tsukiji morning finishes by early afternoon, which leaves the rest of the day open. Our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> places
            it against the stops that do need a timed ticket, and{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise">a Tokyo Bay cruise</Link> is the evening
            that pairs with it most naturally — the same water, four hours later. Neither of the
            Tsukiji stations is JR, so if you are moving around on subway lines, our{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket guide</Link> works
            out whether the 24, 48 or 72-hour pass pays for itself.
          </p>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common Questions</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <KlookTourPicks
          heading="Tsukiji Food Tours You Can Book From Abroad"
          intro="The four Tsukiji listings compared in the table above, all confirmed live on 21 October 2026. Klook blocks automated price reads, so open a listing for the current figure, the departure time on your date and its cancellation terms."
          tours={[
            tsukijiStreetFoodTour,
            tsukijiFoodCultureWalkingTour,
            tsukijiFoodDrinkHalfDayTour,
            tsukijiCultureFoodTour,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 3v8a3 3 0 0 0 6 0V3" />
                  <path d="M7 11v10" />
                  <path d="M17 3c-1.5 2-2 4-2 6s.5 3 2 3 2-1 2-3-.5-4-2-6z" />
                  <path d="M17 12v9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Food and Izakaya Tours (2026): Shinjuku Bar Hopping and What to Eat</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-cooking-class" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h18" />
                  <path d="M5 12a7 7 0 0 1 14 0" />
                  <path d="M6 16h12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Cooking Class (2026): Sushi and Ramen Making — What to Expect</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-bay-cruise" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 18h20l-2 3H4z" />
                  <path d="M4 18V8h16v10" />
                  <path d="M12 8V4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Bay Cruise (2026): Yakatabune vs the Symphony, Times and Prices</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/asakusa-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M6 21V8l2-5M18 21V8l-2-5" />
                  <path d="M6 14h12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the 08:30 slot, not the 11:00 one</h2>
            <p className={styles.ctaBannerDesc}>
              The early departure is the one that sells out, because it is the one that catches the
              market trading rather than winding down. Klook checks out in English, takes foreign cards,
              and shows each tour&apos;s own cancellation terms before you pay.
            </p>
            <a href={tsukijiStreetFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Tsukiji food tours on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
