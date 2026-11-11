import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../components/BookingEsimCard";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import { gygArashiyama } from "../../../lib/gyg-links";
import {
  arashiyamaEarlyMorningWalk,
  arashiyamaGardenLunchWalkingTour,
  arashiyamaRickshawTour,
  arashiyamaSaganoHalfDayWalk,
  arashiyamaSaganoOptionalTour,
  arashiyamaTenryujiWalkingTour,
  arashiyamaTripPrep,
  kyotoPanoramicDayTour,
  saganoHozugawaGuaranteedTour,
  saganoRomanticTrainTicket,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Arashiyama Bamboo Forest Tour. Added 6 Nov 2026. The role against
 * sagano-romantic-train-tickets: that page is the train and the boat, this one
 * is the grove and the walk around it.
 *
 * Read on 6 November 2026:
 *
 *   tenryuji.com/visit            hours, fees, north gate, the 14-30 Nov 7:30 opening,
 *                                 13 and 15 minutes on foot from JR and Hankyu
 *   tenryuji.com/precincts        Hyakkaen path to the north gate, then the bamboo path
 *   kyoto.travel                  JR about 11 minutes; subway ¥260 and about 20 minutes,
 *                                 Randen ¥250 and about 15; buses not advised; go early;
 *                                 the Kameyama Park route; the ¥30,000 fine
 *   japan.travel/en/spot/1141     about ten minutes on foot from Saga-Arashiyama;
 *                                 about 400 m between Nomiya Shrine and Okochi Sanso
 *   Klook destination page        free, open 24/7, about 500 m, 20 to 30 minutes,
 *                                 crowds from about 8:30
 *
 * Gaps left open on purpose. No official page we could read states the grove's
 * hours or admission, so those two facts carry Klook's destination page. JR and
 * Hankyu fares could not be read and are not printed. Neither Tenryu-ji nor the
 * city publishes a stroller rule that we could find. No body publishes hourly
 * crowd counts, so the crowd table is a planning guide with its sources named.
 * Tour rows come from the www.klook.com search index because Klook answers
 * automated reads with HTTP 403. No Klook price appears.
 */

const OWN = checkedLabel("2026-11-06");

const crowdRows = [
  {
    time: "Before 8:00",
    expect: "The window to aim for. Klook points to sunrise, and Kyoto's tourism site to early morning",
    plan: "Walk in from the Kameyama Park side, which Kyoto's tourism site calls relatively empty",
  },
  {
    time: "From about 8:30",
    expect: "Klook says crowds start arriving around now. Tenryu-ji's garden and north gate open at 8:30",
    plan: "Be through the grove first, then go into Tenryu-ji",
  },
  {
    time: "Rest of the day",
    expect: "Kyoto's tourism site says the area is always crowded with people after the best shots",
    plan: "Check its live cameras and congestion forecast before you travel",
  },
  {
    time: "Cherry blossom and autumn colour",
    expect: "Named by Kyoto's tourism site as the seasons to take extra care",
    plan: "Use the earliest slot you can. Tenryu-ji's garden opens at 7:30 from 14 to 30 November 2026",
  },
];

const tourRows = [
  {
    tour: arashiyamaEarlyMorningWalk,
    name: "Early morning small-group walk",
    time: "2 hours 30 minutes",
    meet: "Saga-Arashiyama Station",
    includes: "Quieter paths beyond the main route, a Katsura River viewpoint, matcha tea ceremony at the end",
  },
  {
    tour: arashiyamaTenryujiWalkingTour,
    name: "Bamboo grove & Tenryu-ji walking tour",
    time: "4 to 5 hours; an 8:30 start is listed",
    meet: "Sunrise Tours Desk, Kyoto AVANTI B1F, opposite the Hachijo exit of Kyoto Station",
    includes: "Licensed English-speaking guide, Tenryu-ji, Togetsukyo, about 3 km on foot. Jojakko-ji or Okochi Sanso on July to September departures",
  },
  {
    tour: arashiyamaSaganoHalfDayWalk,
    name: "Arashiyama and Sagano half-day walk",
    time: "3 hours 45 minutes",
    meet: "Read the listing; Daikaku-ji is named as a location",
    includes: "Guided walk through Arashiyama and Sagano",
  },
  {
    tour: arashiyamaGardenLunchWalkingTour,
    name: "Bamboo forest & garden half-day walk",
    time: "5 hours",
    meet: "Read the listing",
    includes: "Tenryu-ji, Okochi Sanso, vegetarian lunch inside Tenryu-ji",
  },
  {
    tour: arashiyamaRickshawTour,
    name: "Ebisuya rickshaw tour",
    time: "30 minutes to 2 hours",
    meet: "Read the listing",
    includes: "Private for your group, part of the route through the bamboo, photos by the driver-guide, drop-off where you choose",
  },
  {
    tour: kyotoPanoramicDayTour,
    name: "Kyoto panoramic day trip",
    time: "10 to 11 hours",
    meet: "Osaka or Kyoto; read the listing",
    includes: "Kinkaku-ji, Arashiyama, Nijo Castle, Fushimi Inari",
  },
];

const routeRows = [
  {
    route: "JR Sagano Line, Kyoto Station → Saga-Arashiyama",
    time: "About 11 minutes by Rapid, no change",
    fare: "JR fare; shown at the ticket machine",
    walk: "About 10 minutes to the grove, 13 to Tenryu-ji",
    note: "Fastest, but crowded. The platform is further away than most, and the back of the train has more room",
  },
  {
    route: "Subway, then Randen, Kyoto Station → Arashiyama",
    time: "About 20 minutes on the subway, about 15 on the Randen, plus the change",
    fare: "¥260 + ¥250 = ¥510 adult. Subway & Randen 1-Day Ticket ¥1,300",
    walk: "Tenryu-ji lists its gate as directly outside the station",
    note: "The route Kyoto's tourism site calls more comfortable. Change at Karasuma Oike and Uzumasa Tenjingawa",
  },
  {
    route: "Hankyu, from Karasuma or Kyoto-kawaramachi → Arashiyama",
    time: "No Hankyu station at Kyoto Station. Change at Katsura for the Arashiyama Line",
    fare: "Shown on Hankyu's fare search",
    walk: "15 minutes to Tenryu-ji",
    note: "Best from central Kyoto or Osaka, not from Kyoto Station",
  },
  {
    route: "City bus from Kyoto Station",
    time: "Not advised",
    fare: "-",
    walk: "-",
    note: "Kyoto's tourism site calls this route crowded and time-consuming",
  },
];

const costRows = [
  { item: "Bamboo grove path", price: "Free", hours: "Open 24 hours", source: "Klook destination page" },
  {
    item: "Tenryu-ji garden",
    price: "¥500 high school and over, ¥300 elementary and junior high, preschool free",
    hours: "8:30–17:00, last entry 16:50. From 7:30, 14 to 30 November 2026",
    source: "tenryuji.com",
  },
  {
    item: "Tenryu-ji halls",
    price: "¥300 on top of the garden fee",
    hours: "8:30–16:45, last entry 16:30",
    source: "tenryuji.com",
  },
  {
    item: "Tenryu-ji Hatto Cloud Dragon",
    price: "¥500, separate",
    hours: "9:00–16:30, last entry 16:20. Weekends and holidays only",
    source: "tenryuji.com",
  },
];

const faqItems = [
  {
    q: "Is the Arashiyama Bamboo Forest free?",
    a: `Yes. Klook's destination page says there is no entrance fee and no ticket, and that the grove is open 24 hours. Paid sites sit beside it: Tenryu-ji's garden is ¥500 for an adult. The official Kyoto pages checked do not give hours or admission for the path, so those two points rest on Klook's page. Read ${OWN}.`,
  },
  {
    q: "What time should I go to the Arashiyama Bamboo Forest?",
    a: `Before 8:00. Klook says crowds start arriving around 8:30, and Kyoto's official tourism site also advises going early in the morning. On a late start, check the city's live cameras and congestion forecast before you travel. Read ${OWN}.`,
  },
  {
    q: "Is an Arashiyama tour worth it?",
    a: "For the grove alone, no. It is free, and it is an 11-minute train ride and about a 10-minute walk from Kyoto Station. A tour is worth it for the guide, a quieter route, the matcha ending on the early walk, or a start at Kyoto Station. If you only want the photo, go by yourself before 8:00.",
  },
  {
    q: "How long do you need in Arashiyama?",
    a: "Allow 20 to 30 minutes for the grove, on Klook's estimate. A morning covers the grove and Tenryu-ji, which matches the 2.5 to 5 hour walking tours. Allow most of a day if you add the Sagano train and the Hozugawa boat, because the boat alone takes about 2 hours.",
  },
  {
    q: "How do I get to Arashiyama from Kyoto Station?",
    a: `Take the JR Sagano Line to Saga-Arashiyama, about 11 minutes by Rapid, then walk about 10 minutes to the grove. The alternative is the subway to Uzumasa Tenjingawa, about 20 minutes and ¥260, then the Randen to Arashiyama, about 15 minutes and ¥250. Kyoto's tourism site advises against the bus from Kyoto Station. Read ${OWN}.`,
  },
  {
    q: "How long is the bamboo path?",
    a: "About 400 m between Nomiya Shrine and Okochi Sanso on the Japan National Tourism Organization's figure, and about 500 m on Klook's. Either way, plan on 20 to 30 minutes at a walking pace with photo stops.",
  },
  {
    q: "Do I need to book an Arashiyama tour in advance?",
    a: "The grove needs no booking. A tour does, and there is no fixed sell-out date because availability is per tour and per day. The Kyoto AVANTI tour may cancel a date with fewer than 2 adults booked 4 days ahead, so keep a free-morning fallback. Check availability once your Kyoto dates are fixed.",
  },
  {
    q: "Can I walk through from Tenryu-ji to the bamboo grove?",
    a: "Yes. Tenryu-ji's precinct guide runs the Hyakkaen path to the north gate, and the bamboo path connects beyond it. The north gate opens at 8:30, even during the 7:30 garden opening from 14 to 30 November 2026.",
  },
  {
    q: "Is Arashiyama good on a rainy day?",
    a: "Yes, with fewer outdoor stops. The official sources checked list no closure for the grove, and Tenryu-ji's halls are an indoor option for ¥300 on top of the garden fee. The Hozugawa boat can stop in bad weather. On the Sagano train, the open car 5 can get wet inside until it retires on 29 December 2026, and umbrellas are banned on board.",
  },
  {
    q: "Can you bring a stroller or children to the Arashiyama Bamboo Forest?",
    a: "Children are fine, and the grove is free for them too, but no official stroller rule is published. Tenryu-ji says its Hyakkaen path follows the natural slope of the land, so call the temple on 075-881-1235 about stroller access. Pick a short plan: the rickshaw runs from 30 minutes, while the Kyoto AVANTI walk covers about 3 km.",
  },
];

const TITLE = "Arashiyama Bamboo Forest Tour (2026): Best Time & Routes";
const H1_LINE = "Arashiyama Bamboo Forest Tour (2026):";
const DESCRIPTION =
  "Arashiyama Bamboo Forest Tour: 2.5 to 5 hour walks from Saga-Arashiyama or Kyoto Station. The grove is free and open 24/7, so go before 8:00.";

const ROUTE = "/guides/attractions/arashiyama-bamboo-forest-tour";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/sagano-romantic-train-tickets", title: "Sagano Romantic Train Tickets 2026–2027: Fares and Booking" },
  { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto (2026): Temples, Timing and What to Book" },
  { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/kyoto-3-day-itinerary", title: "Kyoto 3 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/fushimi-inari-tour", title: "Fushimi Inari Tour 2026: Hike Time, Hours & Best Time" },
  { href: "/guides/attractions/kyoto-kimono-rental", title: "Kyoto Kimono Rental (2026): Which Area, What's Included, When to Return" },
  { href: "/guides/transport/kyoto-transportation", title: "Getting Around Kyoto (2026): Buses, Trains & Taxis Explained" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ArashiyamaBambooForestTourPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Arashiyama Bamboo Forest Tour", item: URL },
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
          <span className={styles.breadCurrent}>Arashiyama Bamboo Forest Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {H1_LINE}<br />Best Time, Tours and Routes From Kyoto
          </h1>
          <p className={styles.heroSubtitle}>
            The grove is free, so the real decisions are when to arrive and whether a guide adds enough to the
            walk around it.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares & hours, dated", "Six tours compared", "Rain, children, what to wear"].map((t) => (
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
            You do not need an <strong>Arashiyama Bamboo Forest Tour</strong> to enter the grove: the path is{" "}
            <strong>free and open 24 hours</strong>, about 400 to 500 m long, and takes 20 to 30 minutes. Go{" "}
            <strong>before 8:00</strong>, because crowds start arriving around 8:30. A guided walking tour runs{" "}
            <strong>2.5 to 5 hours</strong> on Klook and adds a quieter route, Tenryu-ji, Togetsukyo Bridge or a
            matcha ceremony, depending on the tour. The Sagano train is a separate booking. Read {OWN} from
            Klook, Tenryu-ji and Kyoto&apos;s tourism site.
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
                <p className={styles.verdictStatLabel}>Grove admission</p>
                <p className={styles.verdictStatValue}>Free, open 24 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best time</p>
                <p className={styles.verdictStatValue}>Before 8:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Walking tours</p>
                <p className={styles.verdictStatValue}>2.5 to 5 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Kyoto Station</p>
                <p className={styles.verdictStatValue}>About 11 minutes by JR</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> for the photo alone, go by yourself. For a guide, book the early morning
              walk if you can reach Saga-Arashiyama, or the Tenryu-ji walking tour if you want to start at Kyoto
              Station.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={arashiyamaEarlyMorningWalk.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Early Morning Walking Tour →
              </KlookLink>
              <KlookLink href={arashiyamaTenryujiWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Tour From Kyoto Station →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Free */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>Is the Arashiyama Bamboo Forest Free?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, with no ticket and no closing time, on Klook&apos;s destination page. What costs money is what
            sits beside the path. Tenryu-ji&apos;s garden is the one most visitors add.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Price", "Hours", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}, {OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The official Kyoto pages checked do not give the path&apos;s hours or admission, so both rest on
            Klook&apos;s page. Tenryu-ji&apos;s early opening applies to the garden entrance only. The north
            gate still opens at 8:30.
          </p>
        </section>

        {/* Best time */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Crowds</span>
          <h2 className={styles.sectionTitle}>What Time Should I Go to the Arashiyama Bamboo Forest?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Before 8:00. Klook puts the arrival of the crowds at around 8:30, and Kyoto&apos;s tourism site also
            says to go early. Plan to finish the grove before Tenryu-ji opens, not after.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["When", `What the sources say (read ${OWN})`, "What to do"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {crowdRows.map((row) => (
                    <tr key={row.time}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.expect}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            This is a planning guide, not a count of visitors. No source publishes hourly numbers. For
            today&apos;s picture, use the congestion forecast and live cameras linked from{" "}
            <a href="https://kyoto.travel/en/areas/saga-arashiyama/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kyoto&apos;s Saga &amp; Arashiyama page
            </a>.
          </p>
        </section>

        {/* Tours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare tours</span>
          <h2 className={styles.sectionTitle}>Is an Arashiyama Tour Worth It?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For the grove alone, no. For the context around it, yes. The early walk suits a quiet morning and
            ends with matcha. The Kyoto Station tour suits a first visit, because the guide handles the transport
            as well. The rickshaw suits a short visit or anyone who would rather not walk far.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Length", "Meeting point", "What is included", "Checked"].map((h) => (
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
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.meet}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.includes}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            These rows come from the listings as they appear in search results. The early walk&apos;s start time and most cancellation terms were not
            shown, and packages differ by date. The listing shows both, plus the current price. The Kyoto AVANTI
            tour may cancel a date with fewer than 2 adults booked 4 days before.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={arashiyamaEarlyMorningWalk.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Early morning walk →
            </KlookLink>
            <KlookLink href={arashiyamaTenryujiWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tenryu-ji walking tour →
            </KlookLink>
            <KlookLink href={arashiyamaRickshawTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Rickshaw tour →
            </KlookLink>
          </div>
        </section>

        {/* How long */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need in Arashiyama?</h2>
          <p className={styles.bodyText}>
            Half a day covers most visits. The grove is 20 to 30 minutes on Klook&apos;s estimate, and the 2.5 to
            5 hour tours show what a morning holds. A workable self-guided order is the grove first, then
            Tenryu-ji from its north gate, then Togetsukyo Bridge.
          </p>
          <p className={styles.bodyText}>
            A full day needs the train and the boat. The Hozugawa boat alone is about 2 hours. Our{" "}
            <Link href="/guides/attractions/sagano-romantic-train-tickets">Sagano Romantic Train guide</Link> covers
            the seats and the booking window, and this page stays with the grove and the walk. The train is closed
            from 30 December 2026 to 28 February 2027, and from 1 March 2027 a new train adds a seat fee (adult
            ¥1,500 in total). If you want both held in one booking, use the train and boat day below.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={saganoHozugawaGuaranteedTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Train, boat &amp; Arashiyama day →
            </KlookLink>
            <KlookLink href={saganoRomanticTrainTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Sagano train ticket →
            </KlookLink>
            <GygCompareButton slug="arashiyama-bamboo-forest-tour" listing={gygArashiyama} />
          </div>
        </section>

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Arashiyama From Kyoto Station?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Take the JR Sagano Line to Saga-Arashiyama, about 11 minutes by Rapid. It is the fastest way and no
            change is needed. Use the subway and Randen if you would rather avoid the crowded JR carriages, and
            avoid the bus.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Adult fare", "Walk", "Good to know", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.walk}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Times and the subway and Randen fares are from Kyoto&apos;s tourism site, the walk to the grove from
            the Japan National Tourism Organization, and the walks to Tenryu-ji from the temple. JR and Hankyu
            fares are not listed here, so check the operators&apos; sites. Neither Kyoto day pass
            covers JR. See{" "}
            <Link href="/guides/transport/kyoto-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              getting around Kyoto
            </Link>{" "}
            for the passes.
          </p>
        </section>

        <BookingEsimCard lead="Planning the Arashiyama route? Get mobile data before you land." />

        {/* Rain */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Weather</span>
          <h2 className={styles.sectionTitle}>What Happens at Arashiyama on a Rainy Day?</h2>
          <p className={styles.bodyText}>
            The grove stays usable: the official sources checked list no closure rule for it. The fallback indoors is Tenryu-ji&apos;s
            halls, ¥300 on top of the garden fee. The two rides are less certain. The Hozugawa boat can be
            suspended in bad weather or high water, and the Sagano train&apos;s open car 5 can get wet inside,
            with umbrellas banned on board and no refund for rain. Read the rain wording on a tour listing before
            you pay.
          </p>
        </section>

        {/* Children */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Can You Bring Children or a Stroller?</h2>
          <p className={styles.bodyText}>
            Yes for children, but no official source confirms strollers. The grove has no ticket, Tenryu-ji&apos;s garden
            is ¥300 for elementary and junior high pupils, and preschool children enter free. Neither
            Tenryu-ji&apos;s pages nor Kyoto&apos;s tourism site give a stroller rule, and the temple says its
            Hyakkaen path follows the natural slope of the land. Call Tenryu-ji on 075-881-1235 (8:30–17:00)
            before you bring one. With small children, the rickshaw from 30 minutes is the shortest tour here.
          </p>
        </section>

        {/* Clothes */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What to wear</span>
          <h2 className={styles.sectionTitle}>What Should You Wear to Arashiyama?</h2>
          <p className={styles.bodyText}>
            Walking shoes, and layers for an early start. The Kyoto AVANTI tour alone covers about 3 km on foot,
            and everything here is outdoors except the temple halls. If you want a kimono, dress in Arashiyama
            so the walk starts at the shop rather than on a train. Our{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental">Kyoto kimono rental guide</Link> compares the
            areas.
          </p>
          <p className={styles.bodyText}>
            Two rules matter in the grove. Do not mark the bamboo: Kyoto&apos;s tourism site reports that
            graffiti cut into stalks meant they had to be felled. Arashiyama is also a Beautification Promotion
            Area, where violators can be fined up to ¥30,000, and walking on the train tracks and smoking on the
            street are prohibited.
          </p>
        </section>

        <KlookTripPrep
          label="Before you go"
          heading="What Should You Book Around Arashiyama?"
          intro="The grove itself needs no booking, so the plan depends on where you sleep and what you add to the morning. Open a listing for the price on your dates."
          items={arashiyamaTripPrep}
        />

        <EsimCtaBottom />

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
          heading="Arashiyama Tours on Klook"
          intro="The four listings most readers will choose between. Open one for the current price, the start time and the package options on your date."
          tours={[
            arashiyamaEarlyMorningWalk,
            arashiyamaTenryujiWalkingTour,
            arashiyamaGardenLunchWalkingTour,
            arashiyamaSaganoOptionalTour,
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
            <h2 className={styles.ctaBannerTitle}>Be in the grove before 8:30</h2>
            <p className={styles.ctaBannerDesc}>
              The path is free. A guide adds a quieter route and the temple around it.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={arashiyamaEarlyMorningWalk.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Early Morning Walk →
              </KlookLink>
              <KlookLink href={arashiyamaTenryujiWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Tenryu-ji Tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
