import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  shinsekaiNightFoodTour,
  absoluteOsakaFoodTour,
  shinsekaiHalfDayFoodTour,
  dotonboriDaytimeFoodTour,
  kuromonMarketFoodTour,
  osakaWalkingFoodTour,
  nambaBarHoppingNightTour,
  osakaTakoyakiCookingClass,
  osakaOkonomiyakiPrivateTour,
  osakaVegetarianSushiClass,
  osakaRamenNoodleClass,
  dotonboriCityCruise,
  osakaAmazingPass,
  osakaTwoDayStayAreas,
} from "../../../lib/klook-links";
import { articleJsonLd } from "../../../lib/structured-data";

/**
 * Osaka Food Tour — the entry page for the search term, in the 6.5% Klook
 * tours-and-activities band.
 *
 * Everything in the comparison table and in the tour descriptions is what the
 * Klook listing itself publishes (duration, start time, group size, dishes and
 * drinks included, area), read through the www.klook.com search index on
 * 27 Oct 2026 because Klook answers automated reads of its /activity/ pages with
 * HTTP 403. The facility rows — Kuromon Market, Shinsekai, Dotonbori — are the
 * operators' and the city's own figures, read the same day on kuromon.com and
 * osaka-info.jp. No price appears anywhere: what a food tour includes moves the
 * figure far more than the date does, and we have no verified figure to print.
 *
 * Nothing on this page is first-hand.
 */
const CHECKED = "27 October 2026";

/** Tour styles, as the three listings' own pages describe them. */
const tourRows = [
  {
    style: "Market food walk (daytime)",
    length: "Half day, join-in",
    area: "Kuromon Ichiba, Nipponbashi",
    includes: "Stall tastings including takoyaki, in a small group",
    suits: "Anyone with an afternoon free, families, no-alcohol groups",
  },
  {
    style: "Dotonbori daytime walk",
    length: "3 hrs, listed 11:00–14:00, 2–10 people",
    area: "Dotonbori and the Minami back streets",
    includes: "Kushikatsu, takoyaki, a seasonal lunch set at an izakaya, a local dessert",
    suits: "A first day in Osaka — it doubles as lunch",
  },
  {
    style: "Shinsekai night food tour",
    length: "3 hrs, listed 17:30–20:30, 2–9 people",
    area: "Shinsekai — five eateries, from sit-down places to a standing bar",
    includes: "15 dishes and 3 drinks: kushikatsu, doteyaki, takoyaki, oden, yakitori, gyoza, taiyaki",
    suits: "Travellers who want dinner solved and the old district explained",
  },
  {
    style: "Dotonbori evening crawl",
    length: "3 hrs, join-in",
    area: "Off the main Dotonbori strip, through a side alley",
    includes: "Kushikatsu, Michelin-rated takoyaki, a seasonal spread at a hidden izakaya, dessert",
    suits: "A second evening, once you have already walked the main strip",
  },
  {
    style: "Bar hopping (Namba / Tenma)",
    length: "3 hrs 30 min, join-in, English-speaking guide",
    area: "The bars around Namba and Tenma rather than Dotonbori",
    includes: "Bar stops rather than a meal — drink-led",
    suits: "Ages 20 and over only, and people who have eaten already",
  },
  {
    style: "Cooking class (takoyaki)",
    length: "Listed 19:50–21:30, Tako no Tetsu, Umeda",
    area: "B2F Osaka Marubiru, about 10 min on foot from JR Osaka Station",
    includes: "You cook your own takoyaki from English instructions, then okonomiyaki and a dessert",
    suits: "Rain, children, and anyone who wants the skill rather than the stroll",
  },
];

/** Facility rows — the operators' and the city's own published figures. */
const placeRows = [
  {
    place: "Kuromon Ichiba Market",
    fact: "About 150 shops along a roofed arcade stretching about 580 m, at 2-4-1 Nipponbashi, Chuo-ku",
    hours: "No market-wide hours are published; individual shops list times such as 08:00–18:00, 09:00–18:00 and 10:00–21:00",
    source: "kuromon.com (market's own site)",
  },
  {
    place: "Shinsekai",
    fact: "Known for Tsutenkaku tower and Janjan Yokocho, which the city puts at about 50 shops including kushikatsu and doteyaki restaurants",
    hours: "Directly adjacent to Ebisucho Station (Osaka Metro Sakaisuji Line); 3 min walk from Dobutsuenmae Station",
    source: "osaka-info.jp (Osaka Convention & Tourism Bureau)",
  },
  {
    place: "Dotonbori",
    fact: "The city calls it the symbolic business and shopping district of Minami, lined on both sides with restaurants and giant three-dimensional signs",
    hours: "Right outside Namba Station — Nankai, Kintetsu, and the Midosuji, Sennichimae and Yotsubashi subway lines",
    source: "osaka-info.jp (Osaka Convention & Tourism Bureau)",
  },
];

const whoFor = [
  {
    title: "Book the Shinsekai night tour if…",
    desc: "You want dinner and a district in one booking. The listing we checked runs 17:30–20:30 for 2 to 9 people through five Shinsekai eateries with 15 dishes and 3 drinks — kushikatsu and doteyaki first, because both started in these streets. It is the only Osaka food tour listing that publishes its clock, its group size and its dish count together, which makes it the easiest one to plan a day around.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3v8a6 6 0 0 0 12 0V3" />
        <path d="M12 17v4M9 21h6" />
      </svg>
    ),
  },
  {
    title: "Book a market walk if…",
    desc: "You are travelling with children, keeping off alcohol, or only have an afternoon. The Kuromon Ichiba walk is a daytime graze through a covered arcade of about 150 shops, and the Dotonbori daytime tour is listed at 11:00–14:00 — which means it is also lunch, and the rest of the day stays yours.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16l-1.5 12.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
    ),
  },
  {
    title: "Book a cooking class if…",
    desc: "It is raining, your group includes under-20s, or you want to take something home. The Tako no Tetsu class in Umeda is listed at 19:50–21:30 with English instructions and okonomiyaki afterwards; the okonomiyaki half day is private, so it is the one that bends around a train time. Both are indoors from start to finish.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h16" />
        <path d="M5 12a7 7 0 0 1 14 0" />
        <path d="M6 16h12l-1 4H7z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide whether you are buying lunch, dinner, or a skill",
    desc: "This is the whole decision and it is easy to get wrong. The Dotonbori daytime tour is listed at 11:00–14:00, so it replaces lunch. The Shinsekai tour is 17:30–20:30, so it replaces dinner. A cooking class is an evening activity that happens to feed you. Book two food tours on the same day and you will not finish either.",
  },
  {
    title: "Check the group size and the departure count, not just the price",
    desc: "The Osaka food tours we checked are small-group join-ins — 2 to 9 people on the Shinsekai evening, 2 to 10 on the Dotonbori daytime walk. A listing that caps at nine seats has nine seats, so a Friday or Saturday evening in cherry-blossom or autumn-leaf season can be gone while weekday slots on the same week are wide open. If your dates are fixed, open the listing early and look at which days still show a departure.",
  },
  {
    title: "Pick the district you have not already walked",
    desc: "Most visitors walk Dotonbori on their first evening without planning to — it is right outside Namba Station. Shinsekai is a 3-minute walk from Dobutsuenmae and nobody wanders into it by accident, which is why it is the better guided evening. If you are staying in Namba, treat Dotonbori as the free walk and pay for Shinsekai.",
  },
  {
    title: "Read the cancellation terms before the date, not after",
    desc: "Food tours are small-group and the operator is committing a guide and restaurant covers, so the free-cancellation window is usually shorter than it is on a ticket. Each Klook listing states its own terms on the booking panel — check the window on your listing before you commit, especially if your Osaka day is sandwiched between two shinkansen.",
  },
  {
    title: "Carry cash for the things the tour does not cover",
    desc: "The tastings are included; the thing you spot afterwards is not. Kuromon's shops and the smallest Shinsekai counters are often cash-first, so keep some yen on you even though the tour itself is prepaid.",
  },
];

const faqItems = [
  {
    q: "What food is Osaka famous for?",
    a: "Takoyaki (octopus dumplings), okonomiyaki (a savoury pancake), and kushikatsu (deep-fried skewers) are the three dishes every Osaka food tour is built on, with doteyaki — beef tendon simmered in miso — close behind. Kushikatsu and doteyaki are specifically Shinsekai dishes: the Shinsekai night tour we checked opens with both because they started in those streets. The Shinsekai listing names 15 dishes in all, including takoyaki, oden, yakitori, gyoza, tonpeiyaki, karaage and a taiyaki dessert. Osaka's nickname for itself, tenka no daidokoro, means the nation's kitchen.",
  },
  {
    q: "Is an Osaka food tour worth it?",
    a: `It is worth it for the places you would not walk into, and it is not worth it for the places you would. Dotonbori is right outside Namba Station and you will walk it anyway for free. Shinsekai is a different matter: a 3-minute walk from Dobutsuenmae Station, mostly counters with handwritten Japanese menus, and the tour we checked gets you into five of them with 15 dishes and 3 drinks and someone explaining what doteyaki is. Kuromon Ichiba is about 150 shops along 580 m of arcade on the market's own figures — easy to walk and hard to order from. What you are paying for is access and ordering, not food. Checked ${CHECKED}.`,
  },
  {
    q: "Which Osaka food tour should I book?",
    a: "If you have one evening, book the Shinsekai night tour: 17:30–20:30, five eateries, 15 dishes and 3 drinks, and the district nobody finds by accident. If you have one afternoon, book the Dotonbori daytime walk at 11:00–14:00 or the Kuromon market walk — both are daytime, both suit families, and neither is drink-led. If it is raining or your group includes under-20s, book the Tako no Tetsu takoyaki class in Umeda (19:50–21:30) instead. The bar-hopping tour around Namba and Tenma is a drink-led 3½ hours, not a meal — book it for a second night, not a first.",
  },
  {
    q: "Are Osaka food tours good for vegetarians?",
    a: "Honestly, not very. The Osaka canon is octopus, pork, beef tendon and deep-fried skewers, and dashi made from bonito is in most of the rest — so a kushikatsu crawl cannot be made vegetarian by swapping one skewer. Klook's one listing that is vegetarian by design is a modern vegetarian sushi cooking class in Osaka, which is the honest answer rather than a food tour with caveats. If you still want a walking tour, flag the requirement in the booking notes and read the operator's reply before you pay — small-group tours have fixed restaurant stops and limited menus, so an operator who cannot accommodate you will say so.",
  },
  {
    q: "What time do Osaka food tours start?",
    a: `The daytime Dotonbori tour is listed at 11:00–14:00 and the Shinsekai night tour at 17:30–20:30; the Tako no Tetsu takoyaki class in Umeda runs 19:50–21:30. The market walks are half-day daytime departures. Exact departures move by date, so the listing for your day is the only thing that settles it — but the pattern is reliable: one late-morning slot that is really lunch, and one early-evening slot that is really dinner. Times as listed on ${CHECKED}.`,
  },
  {
    q: "Do I need to book an Osaka food tour in advance?",
    a: "Yes, and earlier than you would a ticket. These are small-group join-ins — 2 to 9 people on the Shinsekai evening, 2 to 10 on the Dotonbori daytime walk — so a single Saturday departure holds fewer than ten seats, and there is no walk-up equivalent the way there is for an observation deck. Weekends, Golden Week, the cherry-blossom weeks and the autumn-leaf season go first. Open your date on the listing as soon as the trip is fixed: if the departure is showing, book it; if it is not, the next day usually is.",
  },
  {
    q: "How much does an Osaka food tour cost?",
    a: `We do not print a figure, and the reason is not coyness — Klook blocks automated reads of its product pages, so we have no verified price to quote, and the headline number is the least useful part of the comparison anyway. Compare these instead: how many dishes are included (the Shinsekai listing says 15), how many drinks (3 on the same listing), how many venues, the group cap, and whether a full meal is included or you are grazing between stops. A three-hour tour with 15 dishes and a drinks allowance is a different product from a walk that stops outside places. Open the listing for the current price on your date. Checked ${CHECKED}.`,
  },
  {
    q: "Can children join an Osaka food tour?",
    a: "On the daytime walks and the cooking classes, generally yes — they are food-led, not drink-led. On the bar-hopping tour around Namba and Tenma, no: alcohol-inclusive tours in Japan are for ages 20 and over, which is the legal drinking age. Each listing states its own minimum age and whether a child rate exists, so check that line on the booking panel rather than assuming. If the group includes under-20s, the Kuromon market walk and the Umeda takoyaki class are the two safest picks.",
  },
  {
    q: "What happens if it rains on my Osaka food tour?",
    a: "Less than you would think. Kuromon Ichiba is a roofed arcade for its full 580 m on the market's own figures, and the Shinsekai and Dotonbori routes move between indoor eateries rather than standing in the street — so a wet evening is an inconvenience, not a cancellation. If the forecast is genuinely bad, the cooking classes are indoors end to end: the Tako no Tetsu takoyaki class in Umeda and the 2½-hour ramen noodle-making class both happen in one room.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/osaka-food-tour") } });

const TITLE = "Osaka Food Tour (2026): Which One to Book, Times and What You Eat";
const DESCRIPTION =
  "An Osaka food tour is the fastest way into takoyaki, okonomiyaki and kushikatsu: the Shinsekai night tour runs 17:30–20:30 with 15 dishes, the Dotonbori walk 11:00–14:00. Times, areas, what is included and which to book.";

export default function OsakaFoodTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/osaka-food-tour" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/osaka-food-tour" />
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
              route: "/guides/attractions/osaka-food-tour",
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
                { "@type": "ListItem", position: 4, name: "Osaka Food Tour", item: "https://www.japan-travel-kit.com/guides/attractions/osaka-food-tour" },
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
          <span className={styles.breadCurrent}>Osaka Food Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Osaka Food Tour (2026):<br />Which One to Book, Times and What You Eat
          </h1>
          <p className={styles.heroSubtitle}>
            Takoyaki, okonomiyaki and kushikatsu in the city that calls itself the nation&apos;s kitchen — and the
            one decision that matters: market walk, Shinsekai evening, or cooking class.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Shinsekai & Dotonbori", "Small-Group Tours"].map((t) => (
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
          <h2 className={styles.sectionTitle}>What Is an Osaka Food Tour, and Which One Should You Book?</h2>
          <p className={styles.bodyText}>
            An <strong>Osaka food tour</strong> is a two- to three-and-a-half-hour small-group walk through one of
            three eating districts — Kuromon Ichiba market, Dotonbori, or Shinsekai — with an English-speaking guide
            ordering for you. There are two slots and you only need one: the Dotonbori daytime walk is listed at
            <strong> 11:00–14:00</strong> for 2 to 10 people and is effectively lunch, and the Shinsekai night tour
            runs <strong>17:30–20:30</strong> for 2 to 9 people through <strong>five eateries with 15 dishes and
            3 drinks</strong> and is effectively dinner. If you have one evening in Osaka, book Shinsekai: it is a
            3-minute walk from Dobutsuenmae Station, its menus are handwritten in Japanese, and kushikatsu and
            doteyaki both started in those streets. Dotonbori you will walk for free anyway — it is right outside
            Namba Station. All details as the Klook listings and the Osaka Convention &amp; Tourism Bureau stated
            them on {CHECKED}.
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
                <p className={styles.verdictStatLabel}>Best single pick</p>
                <p className={styles.verdictStatValue}>Shinsekai, 17:30–20:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Daytime pick</p>
                <p className={styles.verdictStatValue}>Dotonbori, 11:00–14:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Group size</p>
                <p className={styles.verdictStatValue}>2–9 or 2–10 people</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Alcohol tours</p>
                <p className={styles.verdictStatValue}>Ages 20+ only</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> pick by the hour, not by the dish. One late-morning tour and one
              early-evening tour will not both fit in a day, and almost every Osaka listing is one or the other.
              Book the evening if you only book one.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={shinsekaiNightFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the Shinsekai night tour →
              </a>
              <a href={dotonboriDaytimeFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the Dotonbori daytime walk →
              </a>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Which Kind of Osaka Food Tour Is Which?</h2>
          <p className={styles.bodyText}>
            Everything in this table is what the Klook listing itself publishes — duration, start time, group size,
            area and inclusions. Nothing is inferred, and anything a listing does not state is left out.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.6rem" }}>
                  Osaka food tour formats as listed on Klook, checked {CHECKED}. No prices: Klook blocks automated
                  reads of its product pages, so we have no verified figure for any of these.
                </caption>
                <thead>
                  <tr>
                    {["Tour style", "Length & time", "Area", "What's included", "Who it suits"].map((h) => (
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
            <a href={shinsekaiNightFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Open the Shinsekai listing →
            </a>
            <a href={kuromonMarketFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Open the Kuromon market walk →
            </a>
          </div>
        </section>

        {/* Facility facts table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The three districts</span>
          <h2 className={styles.sectionTitle}>Where Do Osaka Food Tours Actually Go?</h2>
          <p className={styles.bodyText}>
            Three areas carry almost every Osaka food tour. These rows are the operators&apos; and the city&apos;s
            own published figures rather than a tour description — useful because they tell you what you could do on
            your own, and therefore what a guide is actually adding.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", textAlign: "left", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.6rem" }}>
                  Read on the sources named in the last column on {CHECKED}. Kuromon publishes no market-wide
                  opening hours, so none is stated here.
                </caption>
                <thead>
                  <tr>
                    {["District", "What the operator or city states", "Hours / access", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {placeRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fact}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>Who Should Book Which?</h2>
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

        {/* Steps — the booking decisions an AI answer will not make for you */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do I Pick and Book an Osaka Food Tour?</h2>
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
            <a href={shinsekaiNightFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check departures on your date →
            </a>
            <a href={shinsekaiHalfDayFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Second Shinsekai departure →
            </a>
          </div>
        </section>

        {/* Cooking classes */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The indoor version</span>
          <h2 className={styles.sectionTitle}>Should I Do a Cooking Class Instead of a Food Tour?</h2>
          <p className={styles.bodyText}>
            If your group includes under-20s, the forecast is wet, or you want the skill rather than the stroll, yes.
            The Tako no Tetsu class in Umeda is listed at <strong>19:50–21:30</strong> at B2F Osaka Marubiru,
            1-9-20 Umeda, about ten minutes on foot from JR Osaka Station: you cook your own takoyaki from English
            instructions and then try okonomiyaki and a local dessert. The okonomiyaki option is a three-hour private
            half day, which means it bends around a shinkansen time in a way a join-in departure cannot. And a
            two-and-a-half-hour ramen noodle-making class is the one food activity in this guide that never goes
            outdoors at all. Details as listed on {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Vegetarians should start here rather than with a walking tour. Osaka&apos;s canon is octopus, pork, beef
            tendon and deep-fried skewers, with bonito dashi in much of the rest — so Klook&apos;s modern vegetarian
            sushi class is a more honest answer than a kushikatsu crawl with substitutions.
          </p>
        </section>

        <KlookTourPicks
          heading="Osaka Food Tours and Classes We Checked"
          intro={`Every listing here was confirmed live and on sale on ${CHECKED}. We do not print prices — Klook blocks automated reads of its product pages — so open a listing for the current figure on your date.`}
          tours={[
            shinsekaiNightFoodTour,
            dotonboriDaytimeFoodTour,
            kuromonMarketFoodTour,
            absoluteOsakaFoodTour,
            shinsekaiHalfDayFoodTour,
            osakaWalkingFoodTour,
            nambaBarHoppingNightTour,
            osakaTakoyakiCookingClass,
            osakaOkonomiyakiPrivateTour,
            osakaVegetarianSushiClass,
            osakaRamenNoodleClass,
          ]}
        />

        {/* What to pair it with */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Round out the evening</span>
          <h2 className={styles.sectionTitle}>What Should I Pair an Osaka Food Tour With?</h2>
          <p className={styles.bodyText}>
            A 20-minute boat ride, if the tour is the daytime one. The Dotonbori city cruise leaves from
            Tazaemonbashi Pier past the Glico sign and fits neatly into the hours either side of an 11:00–14:00 food
            walk — our{" "}
            <Link href="/guides/attractions/dotonbori-river-cruise" style={{ color: "var(--red)", fontWeight: 600 }}>
              Dotonbori river cruise guide
            </Link>{" "}
            covers which of the three operators does what.
          </p>
          <p className={styles.bodyText}>
            If the food tour is one item on a longer list, the Osaka Amazing Pass covers unlimited Osaka Metro and
            city buses plus admission to more than 40 facilities, which is the 5% transport-and-passes option rather
            than a tour — worth pricing against your own route in our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka attractions pass guide
            </Link>
            . And if you have two days, our{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              two-day Osaka itinerary
            </Link>{" "}
            already slots a food walk into each of them.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={dotonboriCityCruise.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the Dotonbori cruise →
            </a>
            <a href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the Osaka Amazing Pass →
            </a>
          </div>
        </section>

        <KlookStayAreas
          heading="Where to Stay for an Osaka Food Tour"
          intro="Every food tour in this guide meets in Minami or at Umeda, so the area you sleep in decides whether a 20:30 finish is a ten-minute walk or a train ride. Namba is the default: Dotonbori and Kuromon are on foot and Shinsekai is three Midosuji stops away."
          areas={osakaTwoDayStayAreas}
        />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Osaka Food Tour: Common Questions</h2>
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
            <Link href="/guides/attractions/dotonbori-river-cruise" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 18h20l-2 3H4z" />
                  <path d="M4 18V8h16v10" />
                  <path d="M12 8V4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Dotonbori River Cruise (2026): Which Boat, Times and Whether a Pass Covers It</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 10h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Two Days in Osaka (2026): A Plan That Books in the Right Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-night-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 3h14l-1 9a6 6 0 0 1-12 0z" />
                  <path d="M12 21v-3M8 21h8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Night Food Tour (2026): Omoide Yokocho, Golden Gai and the 20+ Rule</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <path d="M3 11h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): What It Covers and When It Pays</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V9l9-6 9 6v12" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka (2026): Namba vs Umeda vs Tennoji</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Subway, IC Cards and the Passes</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Eat your way through Shinsekai</h2>
            <p className={styles.ctaBannerDesc}>
              Five eateries, 15 dishes and 3 drinks between 17:30 and 20:30, in a group of 2 to 9 — the district
              nobody finds by accident, with someone to order for you. Alcohol-inclusive tours are for ages 20 and
              over. Details as listed on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow}>
              <a href={shinsekaiNightFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check the Shinsekai night tour →
              </a>
              <a href={dotonboriDaytimeFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Or the 11:00 Dotonbori walk →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
