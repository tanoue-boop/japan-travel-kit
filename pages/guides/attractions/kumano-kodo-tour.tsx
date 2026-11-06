import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  jrKansaiWideAreaPass,
  kumanoKodoPrivateWalk,
  kumanoKodoTripPrep,
  kumanoKoyaTwoDayTour,
  kumanoKuroshioTickets,
  kumanoMultiDayPilgrimage,
  kumanoNachiHayatamaTour,
  kumanoNachiNagoyaTour,
  kumanoSanzanExpressTour,
  kumanoSanzanPilgrimageTour,
  kumanoShirahamaTwoDayTour,
  kumanoWakayamaHotels,
  kumanoYunomineGuesthouse,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

/**
 * The Kumano Kodo as a tour or an overnight walk. Added 6 Nov 2026.
 *
 * Read on 6 November 2026:
 *
 *   tb-kumano.jp           section pages for distance, walking time, climb and rating;
 *                          difficulty page; suggested walks; Dual Pilgrim (about 38 km);
 *                          Takijiri bus about 40 minutes; train page (Shin-Osaka–Kii-Tanabe
 *                          2 hours, Tennoji 1 h 45, Kyoto 2 h 35); tips and safety; heat and
 *                          winter articles; children article; luggage and storage page
 *   wakayama-kanko.or.jp   Shin-Osaka–Kii-Tanabe about 2 h 20; Hosshinmon-oji 6.9 km and
 *                          about 2.5 hours; Kii-Tanabe to Hosshinmon bus about 2.5 hours;
 *                          40 km in 2 days; last-bus times on an April 2024 timetable
 *   visitwakayama.jp       Nakahechi "the most popular route for Kumano pilgrims";
 *                          spring and autumn the most popular walking seasons
 *   hongu.jp               Hongu bus times to Kii-Tanabe, Shirahama and Shingu; dark early
 *                          October to May; Hosshinmon bus timetable revised 19 Sep 2026
 *   town.shirahama         Shin-Osaka–Shirahama about 2 h 10
 *   westjr.co.jp           Kansai WIDE Area Pass covers the Kuroshio; 5 days ¥12,000 / ¥6,000
 *
 * Gaps left open on purpose: no bus fare is printed, because the fare charts are images.
 * No JR fare is printed, because none was readable. The bureau's own figures differ by
 * page (38 km and about 40 km for the two-day route; shorter times on its rating page
 * than on its section pages), so the page shows the difference. No Kyoto or Shirahama
 * departure turned up on Klook, so the page says Osaka and Nagoya only. Tour rows come
 * from the www.klook.com search index because Klook answers automated reads with HTTP
 * 403. No Klook price appears.
 */

const OWN = checkedLabel("2026-11-06");

const tourRows = [
  {
    tour: kumanoSanzanExpressTour,
    name: "Kumano Sanzan one-day tour (choose the Kumano route)",
    from: "Osaka, Shinsaibashi",
    time: "About 10 hours listed",
    stops: "Hongu, Hayatama and Nachi shrines, Nachi Falls, a light hike on the old road",
    note: "Reviews mention about 7 km from Hosshinmon-oji and a 7:00 to 20:00 day. Tickets and meals excluded. Start time changes by route and season",
  },
  {
    tour: kumanoSanzanPilgrimageTour,
    name: "Kumano Kodo & Kumano Sanzan full-day pilgrimage",
    from: "Osaka",
    time: "Window of about 07:00 to 19:50",
    stops: "Listing names Nachi Falls and the Kumano Kodo",
    note: "Several departure times, chosen at checkout. Walking distance not readable",
  },
  {
    tour: kumanoNachiHayatamaTour,
    name: "Nachi Taisha & Hayatama Taisha guided bus day",
    from: "Osaka",
    time: "12 hours 45 minutes, 07:30 to 20:15",
    stops: "Nachi Taisha, Nachi Falls, Hayatama Taisha",
    note: "Run in Japanese with a translation device. Boxed lunch on the bus. Many stone steps. Needs a minimum group size",
  },
  {
    tour: kumanoNachiNagoyaTour,
    name: "Kumano Kodo walk & Nachi Falls",
    from: "Nagoya",
    time: "11 hours",
    stops: "Kumano-Nachi Taisha, about 4 hours exploring the Kumano trails",
    note: "The tour for a Nagoya base. Free cancellation shown",
  },
  {
    tour: kumanoKodoPrivateWalk,
    name: "World Heritage Kumano Kodo private walking tour",
    from: "Wakayama, not Osaka",
    time: "6 hours to 2 days",
    stops: "Options include Hosshinmon-oji to Hongu. A Nachi option covers Daimon-zaka and the falls",
    note: "English or Japanese guide. The Nachi option meets at Kii-Katsuura Station at 11:40. No suitcases",
  },
];

const routeRows = [
  {
    section: "Hosshinmon-oji → Kumano Hongu Taisha",
    distance: "About 7 to 7.5 km",
    time: "2 to 3 hours",
    climb: "+190 m / −460 m",
    rating: "2",
    note: "The classic half day. Mostly downhill",
  },
  {
    section: "Takijiri-oji → Takahara",
    distance: "3.7 km",
    time: "About 2 hours",
    climb: "Not listed",
    rating: "2.5",
    note: "Short, but rated harder than the Hongu half day",
  },
  {
    section: "Takijiri-oji → Tsugizakura-oji",
    distance: "About 17 km",
    time: "7 to 10 hours",
    climb: "+1,260 m / −850 m",
    rating: "4",
    note: "Day 1 if you want a shorter Day 2",
  },
  {
    section: "Tsugizakura-oji → Kumano Hongu Taisha",
    distance: "About 21 km",
    time: "8 to 11 hours",
    climb: "+850 m / −1,360 m",
    rating: "4",
    note: "No restaurants on the way. Bring lunch",
  },
  {
    section: "Chikatsuyu-oji → Kumano Hongu Taisha",
    distance: "About 24.5 km",
    time: "9 to 12 hours",
    climb: "+1,100 m / −1,380 m",
    rating: "4",
    note: "Day 2 if you slept in Chikatsuyu. A long day",
  },
  {
    section: "Kogumotori-goe (Hongu side toward Koguchi)",
    distance: "About 13 km",
    time: "4.5 to 6 hours",
    climb: "+670 m / −690 m",
    rating: "4",
    note: "Moss-covered steps can be treacherous when wet",
  },
  {
    section: "Daimon-zaka (toward Nachi Taisha)",
    distance: "About 1 km of slope",
    time: "About 30 minutes",
    climb: "267 stone steps",
    rating: "1.5",
    note: "The short climb up to Nachi Taisha",
  },
];

const compareRows = [
  {
    point: "Time needed",
    day: "One day of 10 to 12 hours 45 minutes, leaving from Osaka",
    stay: "Two walking days, plus travel to Tanabe and back",
  },
  {
    point: "Walking",
    day: "A short stretch. One tour's reviews mention about 7 km",
    stay: "About 38 to 40 km, Takijiri-oji to Kumano Hongu Taisha",
  },
  {
    point: "What you see",
    day: "Up to all three grand shrines, by coach",
    stay: "The old road on foot, ending at one grand shrine: Hongu",
  },
  {
    point: "Planning",
    day: "One booking, no connections",
    stay: "Inns, bus times, lunch and bags are yours to arrange",
  },
  {
    point: "Bags",
    day: "Leave them at your Osaka hotel",
    stay: "Carry them, or book a shuttle at least 20 days ahead",
  },
  {
    point: "Best for",
    day: "A first look on a full Kansai trip",
    stay: "Walking being the point of the trip",
  },
];

const transportRows = [
  {
    route: "Limited express Kuroshio, Shin-Osaka → Kii-Tanabe",
    time: "About 2 hours to 2 hours 20 minutes",
    detail: "2 hours on the bureau's page, about 2 hours 20 on Wakayama's. Some trains end at Shirahama",
    source: "tb-kumano.jp, wakayama-kanko.or.jp",
  },
  {
    route: "Kuroshio, Tennoji → Kii-Tanabe",
    time: "1 hour 45 minutes",
    detail: "The quicker boarding point in south Osaka",
    source: "tb-kumano.jp",
  },
  {
    route: "Kuroshio, Kyoto → Kii-Tanabe",
    time: "2 hours 35 minutes",
    detail: "Not all trains run to and from Kyoto",
    source: "tb-kumano.jp",
  },
  {
    route: "Kuroshio, Shin-Osaka → Shirahama",
    time: "About 2 hours 10 minutes",
    detail: "Klook's rail page shows about 2 hours 23 from Osaka Station on its fastest train",
    source: "town.shirahama.wakayama.jp, klook.com",
  },
  {
    route: "Bus, Kii-Tanabe Station → Takijiri",
    time: "About 40 minutes",
    detail: "Start of the Nakahechi. Buses also leave from Shirahama",
    source: "tb-kumano.jp, meikobus.jp",
  },
  {
    route: "Bus, Kii-Tanabe Station → Hosshinmon-oji",
    time: "About 2.5 hours",
    detail: "Start of the half-day walk",
    source: "wakayama-kanko.or.jp",
  },
  {
    route: "Bus, Hongu Taisha-mae → Kii-Tanabe",
    time: "About 2 hours",
    detail: "Ryujin Bus. To Shirahama Onsen is 90 minutes on the Meiko express bus",
    source: "hongu.jp",
  },
  {
    route: "Bus, Hongu Taisha-mae → Shingu Station",
    time: "80 minutes",
    detail: "The way out toward Nachi and Kii-Katsuura",
    source: "hongu.jp",
  },
];

const bagRows = [
  {
    option: "Daily luggage shuttle",
    cost: "On request",
    rule: "Only between inns both booked through KUMANO TRAVEL. Book at least 20 days ahead. No last-minute requests in Tanabe",
  },
  {
    option: "Yamato next-day shipping",
    cost: "¥940 to ¥2,510 by size, Kansai rates",
    rule: "No booking. Delivery is the next day or later, so carry what you need for the walk. Mostly cash when sending",
  },
  {
    option: "TANABE Tourist Information Center",
    cost: "¥500 a bag a day",
    rule: "Next to Kii-Tanabe Station, 9:00 to 18:00 daily, up to one month, no reservation",
  },
  {
    option: "Coin lockers, JR Kii-Tanabe Station",
    cost: "¥400 to ¥700 a day",
    rule: "3-day maximum, 23 lockers, 5:00 to 24:00",
  },
];

const faqItems = [
  {
    q: "Can you do the Kumano Kodo in one day?",
    a: `A section of it, yes; the whole route, no. The usual one-day walk is Hosshinmon-oji to Kumano Hongu Taisha, about 7 km and 2 to 3 hours. From Osaka, coach tours run about 10 to 12 hours 45 minutes and visit the shrines with a short walk. The main Nakahechi route is about 38 km and takes two days. Read ${OWN}.`,
  },
  {
    q: "Do I need a guide for the Kumano Kodo?",
    a: "No. We found no rule that requires one, and the Tanabe City Kumano Tourism Bureau publishes route pages and maps for walkers on their own. A guide adds the history and the route-finding. The bureau suggests checking that a guide holds a national translator guide license or the Koyasan and Kumano regional guide license.",
  },
  {
    q: "How hard is the Kumano Kodo Nakahechi route?",
    a: `Moderate to hard. The bureau rates its two main stages 4 out of 5, with about 1,260 m of climbing on the first and walks of 7 to 11 hours a day. Hosshinmon-oji to Hongu rates 2 and is mostly downhill. The bureau says most injuries are slips and falls on stone and roots. Read ${OWN}.`,
  },
  {
    q: "How do I get to the Kumano Kodo from Osaka?",
    a: `Take the limited express Kuroshio from Shin-Osaka to Kii-Tanabe, about 2 hours to 2 hours 20 minutes, then a bus of about 40 minutes to Takijiri. For Hosshinmon-oji the bus takes about 2.5 hours from Kii-Tanabe. By public transport that is too long for a same-day return, so stay over or book a coach tour. Read ${OWN}.`,
  },
  {
    q: "When is the best time to walk the Kumano Kodo?",
    a: "Spring and autumn are the most popular walking seasons, according to Wakayama's tourism site, and the smaller villages fill up then. From June to September the bureau advises heat precautions. Winter is walkable on the Nakahechi, but days are short, some buses run less often and some inns close.",
  },
  {
    q: "Can you do the Kumano Kodo from Kyoto?",
    a: "Yes, but we found no Klook tour leaving from Kyoto. Kyoto to Kii-Tanabe is 2 hours 35 minutes on the Kuroshio, and not all trains run there. The practical options are a night in Tanabe, or an early move to Osaka for a tour that leaves from Shinsaibashi.",
  },
  {
    q: "Is the Kumano Kodo suitable for children?",
    a: "Short sections are. The bureau's rule of thumb is about a kilometre for every year of age, walked slower than adults. It names Daimon-zaka and Hosshinmon-oji to Hongu as the easiest, and says the full Tsugizakura-oji to Hongu stretch is not advisable with smaller children. We found no official stroller guidance, and the bureau calls the trail rugged, so do not plan on one.",
  },
  {
    q: "What should I wear on the Kumano Kodo?",
    a: "Sturdy, worn-in shoes and quick-drying layers. The bureau says to avoid cotton, carry rainwear and a folding umbrella, and use a rain cover on your day pack. In summer it recommends light long trousers and long sleeves over shorts and sandals, partly for ticks. Carry your own water and a small light.",
  },
  {
    q: "What happens if it rains on the Kumano Kodo?",
    a: "You usually walk in it, slowly. The Kii Peninsula is among the wettest areas in Japan, and the old cobble steps are particularly slippery when wet. The bureau says to avoid walking in extreme weather, and warns that typhoons can bring flash floods and landslides. Check the forecast each morning, and check how your tour handles bad weather.",
  },
  {
    q: "Can I send my luggage ahead on the Kumano Kodo?",
    a: `Yes. The daily shuttle works only between inns booked through KUMANO TRAVEL, at least 20 days ahead. Next-day shipping with Yamato needs no booking and costs ¥940 to ¥2,510 by size at the Kansai rates. You can also leave bags at the TANABE Tourist Information Center for ¥500 a bag a day. Read ${OWN}.`,
  },
];

const TITLE = "Kumano Kodo Tour (2026): Day Trips, Routes and Difficulty";
const H1_LINE = "Kumano Kodo Tour (2026):";
const DESCRIPTION =
  "Kumano Kodo Tour options from Osaka: 10 to 12¾ hour day trips, the 7 km Hosshinmon walk, the 38 km Nakahechi, trains, gear, luggage and when to go.";

const ROUTE = "/guides/attractions/kumano-kodo-tour";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn't" },
  { href: "/guides/attractions/kansai-area-pass", title: "Kansai Area Pass (2026): Prices, What It Covers & Is It Worth It?" },
  { href: "/guides/attractions/arima-onsen-day-trip", title: "Arima Onsen Day Trip (2026): From Osaka or Kobe, and What the Baths Cost" },
  { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day" },
  { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KumanoKodoTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESCRIPTION, updated }),
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
                { "@type": "ListItem", position: 4, name: "Kumano Kodo Tour", item: URL },
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
          <span className={styles.breadCurrent}>Kumano Kodo Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {H1_LINE}<br />Day Trips, the Nakahechi and How Far You Walk
          </h1>
          <p className={styles.heroSubtitle}>
            A thousand-year-old pilgrimage road in the Kii Mountains. The choice is a long coach day from Osaka
            with a short walk, or two real days on foot.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official distances, dated", "Five tours compared", "Day tour or overnight"].map((t) => (
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

        {/* Lead paragraph: the whole answer, in the body rather than the hero. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A <strong>Kumano Kodo Tour</strong> from Osaka is a guided coach day of about{" "}
            <strong>10 to 12 hours 45 minutes</strong> that visits the grand shrines with a short walk on the old
            road, which reviews of one tour put at about 7 km. The most popular route is the Nakahechi, from
            Takijiri-oji to Kumano Hongu Taisha: <strong>about 38 km over two days</strong>, at 6 to 12 hours on
            foot a day depending on where you sleep. A single day gets you a highlight, not the route. Read{" "}
            {OWN} from Klook, the Tanabe City Kumano Tourism Bureau and Wakayama&apos;s tourism sites.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day tour from Osaka</p>
                <p className={styles.verdictStatValue}>10 to 12h45</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Classic half-day walk</p>
                <p className={styles.verdictStatValue}>About 7 km, 2 to 3 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Takijiri-oji to Hongu</p>
                <p className={styles.verdictStatValue}>About 38 km, 2 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shin-Osaka to Kii-Tanabe</p>
                <p className={styles.verdictStatValue}>About 2h to 2h20</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> on a Kansai trip, book the Kumano Sanzan one-day tour from Shinsaibashi.
              If walking is the reason you came, give it two days from Tanabe.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kumanoSanzanExpressTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Kumano Sanzan One-Day Tour →
              </KlookLink>
              <KlookLink href={kumanoSanzanPilgrimageTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Full-Day Pilgrimage Tour →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* One day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The day</span>
          <h2 className={styles.sectionTitle}>Can You Do the Kumano Kodo in One Day?</h2>
          <p className={styles.bodyText}>
            A section of it, yes. The bureau calls Hosshinmon-oji to Kumano Hongu Taisha an excellent half-day
            walk: about 7 km in 2 to 3 hours, mostly downhill. Wakayama&apos;s own course page measures it at 6.9
            km and about 2 hours 30 minutes, without breaks. It is the walk that reviews of the Kumano Sanzan
            tour describe, so read the itinerary before you book for the walk alone.
          </p>
          <p className={styles.bodyText}>
            Without a tour, a same-day return from Osaka does not work. You would spend about 4.5 to 5 hours each
            way on the Kuroshio and the bus to Hosshinmon-oji, and the last bus from Hongu toward Kii-Tanabe left
            at 16:40 on the April 2024 timetable the prefecture quotes. Sleep in Tanabe the night before, and you
            can walk Takijiri-oji to Chikatsuyu-oji in a day and take the bus back.
          </p>
          <p className={styles.bodyText}>
            Fitting this into a longer trip? It suits a spare day in Osaka on our{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">Japan 14 day itinerary</Link>, and our{" "}
            <Link href="/guides/attractions/things-to-do-osaka">things to do in Osaka guide</Link> covers the rest
            of the city.
          </p>
        </section>

        {/* Tours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare tours</span>
          <h2 className={styles.sectionTitle}>Which Kumano Kodo Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Pick the Kumano Sanzan tour for all three grand shrines in a day. Pick the Nachi and Hayatama bus day
            if the waterfall matters more than the walk, and the private tour if you are already in the Kumano
            area and want a guide on the trail. We found no tour leaving from Kyoto or Shirahama.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Leaves from", "Length", "Stops", "Good to know", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.tour.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.name}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.86rem" }}>{row.from}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.stops}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook blocks automated reads of its product pages, so these rows come from the listings as they appear
            in search results, and we could not read every field. The Kumano Sanzan listing is one tour with three
            routes, so pick Kumano on the package. Its published 09:30 start is the example for the Awaji route,
            and the operator changes times twice a year, so read the start for your date. Open any listing for the
            current price, the exact meeting point and what your package includes.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kumanoSanzanExpressTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kumano Sanzan tour →
            </KlookLink>
            <KlookLink href={kumanoNachiHayatamaTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nachi &amp; Hayatama bus day →
            </KlookLink>
            <KlookLink href={kumanoKodoPrivateWalk.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Private walking tour →
            </KlookLink>
          </div>
        </section>

        {/* Difficulty */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The route</span>
          <h2 className={styles.sectionTitle}>How Hard Is the Kumano Kodo Nakahechi Route?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Moderate to hard. The Tanabe City Kumano Tourism Bureau rates its two main stages 4 out of 5, where 5
            is a long day on steep, difficult ground for experienced walkers. The half day from Hosshinmon-oji
            rates 2. Choose by the climb and the hours, not the kilometres.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Section", "Distance", "Walking time", "Climb / descent", "Rating (1–5)", "Good to know", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.section}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.section}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.distance}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.climb}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.rating}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>tb-kumano.jp, {OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Official figures differ by page. The bureau gives about 38 km for Takijiri-oji to Hongu on one page and
            about 40 km across its suggested two days, and Wakayama&apos;s course page says about 40 km. Its rating
            page shows shorter times (for example 6.5 hours for Tsugizakura-oji to Hongu) for a healthy walker
            without a pack in good weather, excluding breaks. We print the longer section-page times, which suit
            planning better. Ratings are the bureau&apos;s own subjective estimates. Wakayama&apos;s course page
            also mentions a detour at Iwagami Pass and a recent reopening, so check trail status before you walk.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>On the two-day walk,</strong> the prefecture warns of steep ups and downs after Kobiro-oji, and
            of a long gap without toilets after it. There are no restaurants between Tsugizakura-oji and Hongu,
            so ask your inn for a packed lunch. The natural water on the trail has not been tested, so fill your
            bottles before you leave.
          </p>
        </section>

        {/* Day or overnight */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day or overnight</span>
          <h2 className={styles.sectionTitle}>Is a Day Tour or a Night on the Trail Better?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            A day tour is better if the Kumano Kodo is one stop on a Kansai trip. A night is better if the walk is
            the point, because a coach day leaves little of it. The bureau suggests sleeping in Chikatsuyu on the
            two-day walk, and in Tanabe, or Takahara if you come from Osaka or Kyoto, the night before.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Day tour from Osaka", "1 night, 2 days on foot"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.point}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.point}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.day}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.stay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Want a night without planning it?</strong> Klook also lists coach tours with a hotel night. The
            2-day Koyasan tour pairs Mt. Koya with the Kumano Kodo and Nachi Falls, with Toretore Market lunch and
            hotel meals. The 2-day Shirahama tour adds the coast at Sandanbeki and Senjojiki, and uses Daimon-zaka
            as its walk. Neither is a two-day hike, so read the trail time on the listing. We could read only the
            title of the third, a multi-day tour of Hongu and Nachi.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kumanoKoyaTwoDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              2-day Koyasan &amp; Kumano tour →
            </KlookLink>
            <KlookLink href={kumanoShirahamaTwoDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              2-day Shirahama &amp; Nachi tour →
            </KlookLink>
            <KlookLink href={kumanoMultiDayPilgrimage.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Multi-day Hongu &amp; Nachi tour →
            </KlookLink>
          </div>
        </section>

        {/* Guide */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Guides</span>
          <h2 className={styles.sectionTitle}>Do I Need a Guide for the Kumano Kodo?</h2>
          <p className={styles.bodyText}>
            No. We found no rule that requires one, and the bureau publishes route pages and maps for walkers on
            their own. It does call a local guide one of the best ways to get the most from the walk, and it says
            to check for a national translator guide license or the Koyasan and Kumano regional guide license. A
            private guide on Klook suits anyone who wants the history explained on the trail.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kumanoKodoPrivateWalk.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Book a private guide →
            </KlookLink>
          </div>
        </section>

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to the Kumano Kodo From Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Take the limited express Kuroshio to Kii-Tanabe, then a bus. Shin-Osaka to Kii-Tanabe is about 2 hours
            to 2 hours 20 minutes, and the bus to Takijiri takes about 40 minutes. Shirahama works as a base too,
            because buses to Takijiri and Hongu also leave from there.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Good to know", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transportRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}, {OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Which ticket?</strong> JR West lists the Kuroshio among the limited expresses on the{" "}
            <Link href="/guides/attractions/kansai-area-pass">Kansai WIDE Area Pass</Link> (¥12,000 for an adult,
            ¥6,000 for a child, 5 days, reserved seats booked before boarding) and names Shirahama as a trip you
            can make with it. The area map is an image we could not read, so confirm Kii-Tanabe on it. The
            ordinary Kansai Area Pass does not cover the Kuroshio.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kumanoKuroshioTickets.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kuroshio tickets →
            </KlookLink>
            <KlookLink href={jrKansaiWideAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kansai WIDE Area Pass →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The bus times are round figures, and the Hongu ones are given from Hongu. JR buses do not serve these
            routes, and the fare charts are images, so we print no bus fares. Timetables changed on 19 September
            2026, and some Hosshinmon-oji buses run from April to November only. Check the current timetable on
            the bureau&apos;s bus page before you plan a connection.
          </p>
        </section>

        {/* Wear */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What to wear</span>
          <h2 className={styles.sectionTitle}>What Should I Wear on the Kumano Kodo?</h2>
          <p className={styles.bodyText}>
            Sturdy, worn-in shoes and quick-drying layers. The bureau says to avoid cotton and to break in your
            shoes before the trip. Pack rainwear, a folding umbrella and a rain cover for your day pack. In summer
            it recommends light long trousers and a long-sleeved shirt rather than shorts and sandals, which also
            helps against ticks. Bring a warm hat and gloves in winter, plus a small light on any walk that could
            run late.
          </p>
        </section>

        {/* Rain */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rain</span>
          <h2 className={styles.sectionTitle}>What Happens if It Rains on the Kumano Kodo?</h2>
          <p className={styles.bodyText}>
            Expect it, and slow down. The bureau calls the Kii Peninsula one of the wettest areas in Japan, and it
            says most injuries are slips and falls on stone and root-lined paths. The old cobble steps are
            particularly slippery when wet, so take care on stone stairs such as Daimon-zaka. Avoid walking in extreme
            weather, and note that typhoons can bring flash floods and landslides. We could not read the
            bad-weather terms on every tour, so check yours.
          </p>
        </section>

        {/* Season */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>When to go</span>
          <h2 className={styles.sectionTitle}>When Is the Best Time to Walk the Kumano Kodo?</h2>
          <p className={styles.bodyText}>
            Spring and autumn, the most popular walking seasons on Wakayama&apos;s tourism site. They are also
            when small villages fill up, so book the inn first. The Nakahechi stays open all year, though the
            Kohechi route between Koyasan and Hongu closes in winter.
          </p>
          <p className={styles.bodyText}>
            <strong>Summer:</strong> the bureau advises heat precautions from June to September and cites
            forecasts of 30 to 40°C. Start early, carry plenty of water, and use local buses to shorten the walk.{" "}
            <strong>Winter:</strong> days are at their shortest. Hongu&apos;s tourism site notes that it gets dark
            early from October to May, sooner in the forest. The bureau&apos;s tips warn of freezing temperatures
            and occasional snow from late December to late February, though a separate article calls the south of
            the peninsula mild. Plan for the colder case. Some buses reduce service, and some inns close.
          </p>
          <p className={styles.bodyText}>
            In any season, the bureau says to leave early and aim to arrive between 15:00 and 17:00, because the
            valleys where most villages sit go dark first.
          </p>
        </section>

        {/* Children */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Is the Kumano Kodo Suitable for Children?</h2>
          <p className={styles.bodyText}>
            On short sections, yes. The bureau&apos;s rule of thumb is about a kilometre for every year of age,
            walked more slowly than adults. It names Daimon-zaka and Hosshinmon-oji to Hongu as the easiest, and
            says the full Tsugizakura-oji to Hongu stretch is not advisable with smaller children. Infants take
            much more preparation. We found no official stroller guidance, and the bureau calls the trail rugged,
            so do not plan on one. On local buses, under-6s ride free and ages 6 to 11 pay half, on the
            bureau&apos;s 2022 article. We could not read child rules on the Klook listings, and a coach day of
            10 hours or more is the bigger test.
          </p>
        </section>

        {/* Luggage */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Luggage</span>
          <h2 className={styles.sectionTitle}>Can I Send My Luggage Ahead on the Kumano Kodo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, but the same-day shuttle needs planning. It runs only between inns booked through KUMANO TRAVEL,
            at least 20 days ahead. Otherwise, ship your case to your last inn, or leave it in Tanabe. We found
            no luggage or transfer product on Klook. On a day tour, leave bags at your Osaka hotel; the private
            walking tour does not allow suitcases.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Cost", "Good to know", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bagRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.rule}</td>
                      <td style={{ fontSize: "0.82rem" }}>tb-kumano.jp, {OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Stay: the night decides the two-day walk. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay for the Kumano Kodo?</h2>
          <p className={styles.bodyText}>
            In Tanabe the night before you start, and at Yunomine Onsen, Kawayu Onsen or Watarase Onsen after you
            reach Hongu, the three areas Wakayama&apos;s course page names. For the night on the trail, the
            prefecture points to the Chikatsuyu and Nonaka area, and notes that sleeping nearer Tsugizakura-oji
            shortens Day 2. The bureau&apos;s KUMANO TRAVEL site handles small inns, and the luggage shuttle works
            only with bookings made there.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kumanoWakayamaHotels.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Wakayama hotels on Klook →
            </KlookLink>
            <KlookLink href={kumanoYunomineGuesthouse.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Guesthouse at Yunomine →
            </KlookLink>
          </div>
        </section>

        {/* Cancellation */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Should You Book, and Can You Cancel?</h2>
          <p className={styles.bodyText}>
            For a day tour, book once your Osaka dates are fixed. We cannot give a sell-out date, because
            availability is per tour and per day. For the two-day walk, the firm deadline is the luggage shuttle
            at 20 days, and the inns in small villages are the real limit in spring and autumn.
          </p>
          <p className={styles.bodyText}>
            Terms differ by listing. The Nachi and Hayatama bus day shows free cancellation with 24 hours&apos;
            notice, and it can be called off below a minimum group: one page shows 15 people by 14 days before
            departure, another 20. The Nagoya tour shows free cancellation. We could not read the terms on the
            other listings, so read yours before you pay. Terms read {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kumanoSanzanExpressTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check your date on Klook →
            </KlookLink>
            <KlookLink href={kumanoNachiNagoyaTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tour from Nagoya →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Before you go"
          heading="What Should You Book Around the Kumano Kodo?"
          intro="The tour or the walk is only part of it. These are the pieces that decide your start time. Open a listing for the price on your dates."
          items={kumanoKodoTripPrep}
        />

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
          heading="Kumano Kodo Tours on Klook"
          intro="The four listings most readers will choose between. Open one for the current price, the meeting point and the package options on your date."
          tours={[
            kumanoSanzanExpressTour,
            kumanoSanzanPilgrimageTour,
            kumanoNachiHayatamaTour,
            kumanoKodoPrivateWalk,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{guide.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Three grand shrines, one day from Osaka</h2>
            <p className={styles.ctaBannerDesc}>
              A guided coach day covers the Kumano shrines in about 10 to 12 hours 45 minutes, with no connections to plan.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kumanoSanzanExpressTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Kumano Sanzan Tour →
              </KlookLink>
              <KlookLink href={kumanoNachiHayatamaTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Nachi Bus Day →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
