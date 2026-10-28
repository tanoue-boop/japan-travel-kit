import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  shinjukuNightFoodWalkingTour,
  shinjukuBarHoppingNightTour,
  shinjukuNightFoodieTourWagyuSushi,
  goldenGaiFoodTastingExperience,
  goldenGaiBarHoppingExperience,
  shinjukuPrivateNightFoodTour,
  shibuyaBarHoppingTour,
  shinjukuShibuyaNightBarTour,
  shibuyaFoodCultureWalkingTour,
  tokyoNightTourAkihabaraShibuya,
  tsukijiStreetFoodTour,
  tokyoSubwayTicket,
  whereToStayTokyoAreas,
} from "../../../lib/klook-links";
import { articleJsonLd } from "../../../lib/structured-data";

/**
 * Tokyo Night Food Tour — the after-dark entry page, in the 6.5% Klook
 * tours-and-activities band.
 *
 * Role split with tokyo-food-tour.tsx, which already ranks for the generic term:
 * that page is the daytime market walk and the general "what is a food tour"
 * question, this one is the evening — izakaya, alley bars, Golden Gai, and the
 * age rule that comes with them. The first body paragraph says so in one line so
 * neither a reader nor a crawler has to guess which page answers what.
 *
 * Sourcing. Tour duration, stops, inclusions and the age requirement are what
 * the Klook listings publish — read through the www.klook.com search index on
 * 27 Oct 2026, because Klook answers automated reads of its /activity/ pages
 * with HTTP 403 (confirmed again that day for listing 102521). The alley figures
 * are official: en.shinjuku-omoide.com for Omoide Yokocho and golden-gai.tokyo
 * and gotokyo.org (Tokyo Metropolitan Government) for Golden Gai, all read on
 * 27 Oct 2026. No price appears anywhere. Nothing here is first-hand.
 */
const CHECKED = "27 October 2026";

/** Evening formats, as the listings themselves describe them. */
const tourRows = [
  {
    style: "Shinjuku night food walk",
    length: "3 hrs, join-in",
    area: "Omoide Yokocho → Kabukicho → Golden Gai",
    includes: "Tastings at three local food spots, plus a drink at a Golden Gai izakaya",
    suits: "A first night out — food-led, with the drink at the end rather than throughout",
  },
  {
    style: "Shinjuku bar hopping",
    length: "3 hrs, join-in",
    area: "First bar in Omoide Yokocho, then two in Kabukicho and Golden Gai",
    includes: "All food and drinks — yakitori, gyoza, grilled vegetables, local beer and sake",
    suits: "Ages 20 and over; the listing asks for valid photo ID",
  },
  {
    style: "Shinjuku night foodie tour",
    length: "3 hrs, English and Japanese",
    area: "A hidden Shinjuku sushi restaurant, then wagyu",
    includes: "Sit-down sushi and wagyu beef, finishing on a dessert or a drink",
    suits: "People who would rather have two proper meals than eight small plates",
  },
  {
    style: "Golden Gai food tasting",
    length: "3 hrs, guided",
    area: "Shinjuku, ending inside Golden Gai",
    includes: "Yakitori and a bowl of ramen, then a drink in Golden Gai itself",
    suits: "Anyone whose single must-do is getting inside a Golden Gai bar",
  },
  {
    style: "Shibuya bar hopping",
    length: "3 hrs, join-in",
    area: "Two local bars and izakaya on the Shibuya side",
    includes: "Bar stops with an English-speaking guide",
    suits: "An evening that starts at a Shibuya rooftop slot rather than Shinjuku",
  },
  {
    style: "Private Shinjuku evening",
    length: "Private half day",
    area: "Omoide Yokocho, Kabukicho and Golden Gai, at your pace",
    includes: "Your own guide rather than a join-in departure",
    suits: "Groups, fixed start times, and anyone the join-in slots do not fit",
  },
];

/** Official figures for the two alleys every listing names. */
const alleyRows = [
  {
    place: "Omoide Yokocho (Memory Lane)",
    fact: "About 80 premises including ticket shops, of which some 60 are bars and restaurants — mostly motsuyakiya and yakitoriya — packed into about 2,000 m²",
    access: "By the West Exit (Nishiguchi) of Shinjuku Station; roots in the open-air market that formed in the burnt-out ruins after the Second World War",
    source: "en.shinjuku-omoide.com (the alley's own association)",
  },
  {
    place: "Shinjuku Golden Gai",
    fact: "Approximately 280 bars and pubs, in what the Tokyo Metropolitan Government describes as a tight six-row block of alleys, at 1-1-6 Kabukicho",
    access: "5 minutes on foot from the east exit of Shinjuku Station; most bars open relatively late, typically around 20:00, and hours vary by store",
    source: "golden-gai.tokyo and gotokyo.org (Tokyo Metropolitan Government)",
  },
];

const whoFor = [
  {
    title: "Book the food walk if…",
    desc: "You want to eat, and the bars are the setting rather than the point. The three-hour Shinjuku walk we checked covers Omoide Yokocho, Kabukicho and Golden Gai with tastings at three local food spots and one drink at a Golden Gai izakaya at the end — so you see the same alleys as a bar crawl, on a full stomach.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16l-1.5 12.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
    ),
  },
  {
    title: "Book the bar hop if…",
    desc: "Getting inside a Golden Gai bar is the whole ambition. Most of those roughly 280 bars seat under ten people, many charge their own cover, and a few do not welcome walk-ins who cannot read the sign. The three-bar Shinjuku crawl we checked includes all food and drinks and states Japan's drinking age of 20 on its own listing, with ID required.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3h14l-1 9a6 6 0 0 1-12 0z" />
        <path d="M12 21v-3M8 21h8" />
      </svg>
    ),
  },
  {
    title: "Book the private evening if…",
    desc: "Your group is more than four, your start time is fixed by a show or a shinkansen, or someone in the party does not drink. A private half day across the same three areas sets its own pace; a join-in departure cannot. It is also the easiest format on which to raise a dietary requirement and get a straight answer before you pay.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 14h1a4 4 0 0 1 4 4v3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Check the age rule before anything else",
    desc: "Japan's legal drinking age is 20, and the Shinjuku bar-hopping listing we checked states it in those words and asks for valid photo ID as proof of age. That is not the operator being cautious — it is the law, and a 19-year-old on a family trip will be turned away at the first bar. If the group includes under-20s, the food-led walks and the daytime market tours are the alternative, not a quiet word with the guide.",
  },
  {
    title: "Pick the alley, then the format",
    desc: "Omoide Yokocho is about 80 premises in roughly 2,000 m² by Shinjuku's West Exit, mostly yakitori and offal counters — it is a food alley. Golden Gai is approximately 280 tiny bars five minutes from the East Exit, and the Tokyo Metropolitan Government notes most of them open around 20:00 — it is a drinking alley. A tour that promises both is promising a walk between two different kinds of evening.",
  },
  {
    title: "Book the date, not the week",
    desc: "These are small-group join-ins with one or two departures a night, and Friday and Saturday fill first — as do the weeks around Golden Week, the cherry blossom and the autumn leaves. There is no walk-up equivalent: if the departure is gone, the alternative is walking the alleys yourself, which is a different evening. Open your date on the listing as soon as the trip is fixed.",
  },
  {
    title: "Read what's actually included",
    desc: "The listings diverge sharply here and the headline price hides it. One of the Shinjuku crawls states all food and drinks are included across three bars; the food walk includes three tastings and one drink; the foodie tour is built around two sit-down courses. Count the venues and the included drinks before comparing anything else.",
  },
  {
    title: "Plan the way home before you start",
    desc: "A three-hour evening tour that starts at 18:00 or 19:00 ends comfortably inside the service day, but a late start does not. Tokyo's subway stops running around midnight and taxis from Kabukicho on a Saturday night are their own queue. A 24-, 48- or 72-hour subway ticket is the cheap insurance here, since the last leg home is the part a food tour does not include.",
  },
];

const faqItems = [
  {
    q: "What is a Tokyo night food tour?",
    a: "A two- to three-hour small-group walk after dark through Tokyo's izakaya alleys with an English-speaking guide, eating and drinking at three or more venues rather than sitting down at one. In Shinjuku, the standard route is Omoide Yokocho, then Kabukicho, then Golden Gai. The format splits into two: food-led walks, where you eat at three local spots and have one drink at the end, and bar hops, where all food and drinks across three bars are included and the drinking is the point. Both run about three hours on the listings we checked.",
  },
  {
    q: "How is this different from a daytime Tokyo food tour?",
    a: "Different districts, different rules, different food. A daytime Tokyo food tour is a market graze — the Tsukiji Outer Market, fresh seafood, tamagoyaki, open to all ages. A Tokyo night food tour is izakaya and alley bars, built around yakitori, gyoza and sake, and any departure that includes alcohol is restricted to ages 20 and over. If you want both, do the market in the morning and the alleys in the evening; they are genuinely separate experiences rather than the same tour at two times of day.",
  },
  {
    q: "Is a Tokyo izakaya tour worth it?",
    a: `Yes, for Golden Gai specifically, and it is a closer call for Omoide Yokocho. Golden Gai is approximately 280 bars in a tight six-row block, most of them seating under ten people, many with their own cover charge and a handwritten Japanese sign — on the Tokyo Metropolitan Government's own note, most open around 20:00. Walking in cold is possible and frequently awkward. Omoide Yokocho is about 60 bars and restaurants among roughly 80 premises in 2,000 m², and the yakitori counters there are easier to join unaided. So: pay for the bars, consider walking the food alley yourself. Checked ${CHECKED}.`,
  },
  {
    q: "Which area is best for a night food tour in Tokyo?",
    a: "Shinjuku, for a first night. Omoide Yokocho sits by the West Exit of Shinjuku Station and Golden Gai is five minutes from the East Exit, so the three districts a tour covers are within a short walk of one another and of the station you will leave from. Shibuya is the alternative if your evening already starts on that side of the loop — a rooftop slot, say — and there is a listing that runs across both Shinjuku and Shibuya for exactly that case. Yurakucho's gado-shita, the izakaya under the Yamanote tracks, is a genuine fourth option, but we could not confirm an English-language tour of it on Klook, so it is a walk rather than a booking.",
  },
  {
    q: "Do I need to book a Tokyo night food tour in advance?",
    a: "Yes. These are small-group join-ins with one or two departures an evening, so a Friday or Saturday can be sold out a week or more ahead, and the weeks around Golden Week, the cherry blossom and the autumn leaves go earliest. Unlike an observation deck there is no same-day window to fall back on — if the departure is gone, your alternative is walking the alleys unguided. Open your date on the listing as soon as your Tokyo nights are fixed, and check the free-cancellation window on the booking panel while you are there; small-group food tours typically close that window earlier than tickets do.",
  },
  {
    q: "Can kids join a Tokyo night food tour?",
    a: "Not the alcohol-inclusive ones. Japan's legal drinking age is 20, and the Shinjuku bar-hopping listing we checked says so on its own page and asks for valid ID — so under-20s cannot join, with or without a parent. The food-led evening walks sometimes set their own lower minimum age, but they still end with a drink in Golden Gai, so read the age line on the specific listing rather than assuming. For a family evening, the Tsukiji street-food walk and the guided night tour through Ueno, Akihabara and Shibuya are the two formats that are not built around drinking.",
  },
  {
    q: "What will I eat on a Tokyo night food tour?",
    a: "Izakaya food: yakitori (grilled chicken skewers), gyoza, grilled vegetables and karaage, usually with local beer and sake, which is exactly what one of the Shinjuku bar-hopping listings names. The Golden Gai food tasting adds a bowl of ramen; the Shinjuku foodie tour is built instead around sushi at a hidden restaurant and wagyu beef. Exact dishes move with the venue and the season. Flag any dietary requirement when you book — these are tiny kitchens with short menus, and the private tour is the format with the most room to adapt.",
  },
  {
    q: "How much does a Tokyo night food tour cost?",
    a: `We do not quote a figure: Klook blocks automated reads of its product pages, so we have no verified price, and the headline number is the least comparable part of these listings anyway. Compare what moves it — how many venues, whether all drinks are included or only one, whether a sit-down course is part of it, and the group cap. A crawl with all food and drinks across three bars is a different product from a walk with three tastings and a nightcap. Open a listing for the current price on your date. Checked ${CHECKED}.`,
  },
  {
    q: "Do I need cash on a Tokyo night food tour?",
    a: "Carry some. The tour itself is prepaid, but Golden Gai's bars are tiny independent businesses and many are cash-first, and a few charge a seating fee on top of drinks if you go back on your own afterwards. The same is true of the yakitori counters in Omoide Yokocho. A few thousand yen covers the extra round the guide does not pay for and the taxi you may want at the end.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-night-food-tour") } });

const TITLE = "Tokyo Night Food Tour (2026): Omoide Yokocho, Golden Gai";
const DESCRIPTION =
  "A Tokyo night food tour runs about 3 hours through Omoide Yokocho, Kabukicho and Golden Gai — roughly 280 tiny bars, most opening around 20:00. 20+ only.";

export default function TokyoNightFoodTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-night-food-tour" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-night-food-tour" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
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
              route: "/guides/attractions/tokyo-night-food-tour",
              headline: TITLE,
              description: DESCRIPTION,
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
                { "@type": "ListItem", position: 4, name: "Tokyo Night Food Tour", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-night-food-tour" },
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
          <span className={styles.breadCurrent}>Tokyo Night Food Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Night Food Tour (2026):<br />Omoide Yokocho, Golden Gai and the 20+ Rule
          </h1>
          <p className={styles.heroSubtitle}>
            Red lanterns, six-seat bars and yakitori smoke — the Shinjuku alleys are a different city after dark.
            Here is which evening tour does what, and the age rule that decides who can come.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Shinjuku After Dark", "Ages 20+ if Alcohol"].map((t) => (
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

        {/* Answer-first body paragraph */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>What Is a Tokyo Night Food Tour?</h2>
          <p className={styles.bodyText}>
            A <strong>Tokyo night food tour</strong> is a roughly <strong>three-hour</strong> small-group evening
            walk through Shinjuku&apos;s izakaya alleys with an English-speaking guide, eating and drinking at
            three or more venues: <strong>Omoide Yokocho</strong> by the station&apos;s West Exit — about 80
            premises, some 60 of them bars and restaurants, in roughly 2,000 m² — then <strong>Kabukicho</strong>,
            and finally <strong>Golden Gai</strong>, approximately 280 tiny bars five minutes from the East Exit,
            most of which the Tokyo Metropolitan Government notes do not open until around 20:00. Formats split
            two ways: food-led walks with three tastings and a drink at the end, and bar hops with all food and
            drinks across three bars included. Any departure that includes alcohol is for{" "}
            <strong>ages 20 and over</strong> — Japan&apos;s legal drinking age, which the Shinjuku bar-hopping
            listing states and enforces with photo ID. Figures as the alleys&apos; own associations, the Tokyo
            Metropolitan Government and the Klook listings stated them on {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            One line on how this differs from our{" "}
            <Link href="/guides/attractions/tokyo-food-tour" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo food and izakaya tours guide
            </Link>
            : that page covers the daytime market graze and the general question of whether to take a food tour at
            all, while this one is only the evening — the alleys, the bars, the drinking age and which of the night
            departures to book.
          </p>
        </section>

        {/* Quick Answer Box with the main CTA */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Shinjuku&apos;s three alleys</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>About 3 hrs, small group</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Golden Gai</p>
                <p className={styles.verdictStatValue}>~280 bars, open ~20:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Age</p>
                <p className={styles.verdictStatValue}>20+ with ID if alcohol</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> you are buying the doorway, not the drink. Roughly 280 Golden Gai bars seat
              fewer than ten people each behind a handwritten sign, and walking into one unaided is possible but
              rarely relaxing. Book the bar hop if that is the ambition; book the food walk if you want to eat and
              see the same alleys on a full stomach.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinjukuNightFoodWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the Shinjuku night food walk →
              </KlookLink>
              <KlookLink href={shinjukuBarHoppingNightTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the three-bar crawl →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Which Tokyo Night Food Tour Should I Book?</h2>
          <p className={styles.bodyText}>
            Every row below is what the Klook listing itself publishes — length, the areas it names, what it states
            is included, and the age line where it carries one. Nothing is inferred.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.6rem" }}>
                  Tokyo evening tour formats as listed on Klook, checked {CHECKED}. No prices: Klook blocks
                  automated reads of its product pages, so we have no verified figure for any of these.
                </caption>
                <thead>
                  <tr>
                    {["Tour style", "Length", "Area", "What's included", "Who it suits"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.style}>
                      <td className={styles.tdProvider}>{row.style}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.includes}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.suits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.1rem" }}>
            <KlookLink href={goldenGaiFoodTastingExperience.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Open the Golden Gai tasting →
            </KlookLink>
            <KlookLink href={shinjukuPrivateNightFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Open the private evening →
            </KlookLink>
          </div>
        </section>

        {/* Official alley figures */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The two alleys</span>
          <h2 className={styles.sectionTitle}>Omoide Yokocho or Golden Gai — What&apos;s the Difference?</h2>
          <p className={styles.bodyText}>
            Tours name both in the same sentence, which hides how different they are. These are the official
            figures rather than tour copy, and they explain why one is a food alley and the other a drinking one.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.6rem" }}>
                  Read on the sources named in the last column on {CHECKED}. Neither association publishes
                  alley-wide opening hours; the Tokyo Metropolitan Government&apos;s note that most Golden Gai bars
                  open around 20:00 is the closest thing to one, and it states that hours vary by store.
                </caption>
                <thead>
                  <tr>
                    {["Alley", "What the official source states", "Access and hours", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {alleyRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fact}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.access}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The practical consequence: a 20:00 Golden Gai opening means an evening tour that starts at 18:00 spends
            its first hour somewhere else by necessity, which is exactly why the standard route runs Omoide Yokocho
            first and Golden Gai last.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>Is a Tokyo Izakaya Tour Worth It for You?</h2>
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

        {/* Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do I Pick and Book a Tokyo Night Food Tour?</h2>
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.2rem" }}>
            <KlookLink href={shinjukuBarHoppingNightTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check departures on your date →
            </KlookLink>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the subway ticket →
            </KlookLink>
          </div>
        </section>

        {/* Families and non-drinkers */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>If the group includes under-20s</span>
          <h2 className={styles.sectionTitle}>Can Kids Join a Tokyo Night Food Tour?</h2>
          <p className={styles.bodyText}>
            Not the alcohol-inclusive ones. Japan&apos;s legal drinking age is 20, and the Shinjuku bar-hopping
            listing states it on its own page and asks for valid photo ID — so under-20s cannot join a bar crawl,
            accompanied or not. The food-led evening walks set their own minimum ages and still finish with a drink
            in Golden Gai, so read the age line on the specific listing rather than assuming it is more relaxed.
          </p>
          <p className={styles.bodyText}>
            The two formats that are not built around drinking are the Tsukiji street-food walk — a daytime market
            graze covered in our{" "}
            <Link href="/guides/attractions/tsukiji-market-food-tour" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tsukiji market food tour guide
            </Link>{" "}
            — and the guided night tour from Ueno through Akihabara to the Shibuya crossing, which is a
            lights-and-streets evening with the train fares between stops included rather than a bar crawl.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoNightTourAkihabaraShibuya.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the Ueno–Akihabara–Shibuya night tour →
            </KlookLink>
            <KlookLink href={tsukijiStreetFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the Tsukiji street-food walk →
            </KlookLink>
          </div>
        </section>

        <KlookTourPicks
          heading="Tokyo Night Food Tours We Checked"
          intro={`Every listing here was confirmed live and on sale on ${CHECKED}. We do not print prices — Klook blocks automated reads of its product pages — so open a listing for the current figure on your date.`}
          tours={[
            shinjukuNightFoodWalkingTour,
            shinjukuBarHoppingNightTour,
            shinjukuNightFoodieTourWagyuSushi,
            goldenGaiFoodTastingExperience,
            goldenGaiBarHoppingExperience,
            shinjukuPrivateNightFoodTour,
            shinjukuShibuyaNightBarTour,
            shibuyaBarHoppingTour,
            shibuyaFoodCultureWalkingTour,
            tokyoNightTourAkihabaraShibuya,
          ]}
        />

        <KlookStayAreas
          heading="Where to Stay for a Tokyo Night Food Tour"
          intro="Every tour in this guide meets within a few minutes of Shinjuku or Shibuya Station, and the evening ends near where it started. Sleeping on the west side of the Yamanote loop turns the walk home into a walk rather than a last-train calculation."
          areas={whereToStayTokyoAreas}
        />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Tokyo Night Food Tour: Common Questions</h2>
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16l-1.5 12.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9z" />
                  <path d="M9 7a3 3 0 0 1 6 0" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Food &amp; Izakaya Tours (2026): Shinjuku Bar Hopping &amp; What to Eat</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tsukiji-market-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c3-4 7-5 10-5s6 2 8 5c-2 3-5 5-8 5s-7-1-10-5z" />
                  <circle cx="16" cy="12" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tsukiji Market Food Tour (2026): Hours, What to Eat and Which Tour to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v8a6 6 0 0 0 12 0V3" />
                  <path d="M12 17v4M9 21h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Food Tour (2026): Which One to Book, Times and What You Eat</p>
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
                  <path d="M3 10h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Three Days in Tokyo (2026): A Plan That Books in the Right Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V9l9-6 9 6v12" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Tokyo (2026): Shinjuku vs Tokyo Station vs Ueno</p>
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
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20" />
                  <path d="M8 22h8" />
                  <path d="M9 7l3-3 3 3" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Get inside Golden Gai</h2>
            <p className={styles.ctaBannerDesc}>
              Approximately 280 bars in a six-row block, most of them opening around 20:00 and seating fewer than ten
              people — a guide is the difference between looking down the alley and sitting in it. Alcohol-inclusive
              tours are for ages 20 and over, with photo ID. Details as listed on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={shinjukuBarHoppingNightTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check the three-bar Shinjuku crawl →
              </KlookLink>
              <KlookLink href={shinjukuNightFoodWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Or the food-led night walk →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
