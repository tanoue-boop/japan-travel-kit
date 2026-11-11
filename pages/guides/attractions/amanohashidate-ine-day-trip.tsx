import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../components/BookingEsimCard";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  amanohashidateIneBayScenicTour,
  amanohashidateIneChionjiTour,
  amanohashidateIneFullDayTour,
  amanohashidateIneMiyamaKyotoTour,
  amanohashidateIneMiyamaTour,
  amanohashidateIneTwoDayPass,
  amanohashidateTripPrep,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Amanohashidate and Ine as a day out of Kyoto or Osaka. Added 6 Nov 2026, after
 * Klook recorded bookings of these tours on 4 and 5 November with no page here
 * to send them to.
 *
 * Every operator figure was read on 6 November 2026:
 *
 *   tankai.jp/trip/ineboat       Ine Bay boat fares, hours, stop conditions
 *   tankai.jp/trip/cable         Kasamatsu cable car and lift fares and seasons
 *   tankai.jp/highwaybus         highway bus times, fares, six daily round trips
 *   amanohashidate.jp            Viewland admission, seasons, lift suspensions
 *   uminokyoto.jp spid=85        Hashidate 2h14, Kounotori 2h28, reference fares
 *   ine-kankou.jp/access         Kyoto about 3 hours, Osaka about 3.5 by train and bus
 *   westjr.co.jp                 bus from Amanohashidate Station 60 minutes
 *
 * Two gaps are deliberate. Tankai's trip page says 30 minutes between
 * Amanohashidate and Ine while JR West says 60, and only 60 fits Ine's own
 * three-hour total, so the page plans on 60 and says why. The Ine bus timetable
 * could not be read automatically, so the page gives no frequency.
 *
 * Tour rows come from Klook listings as shown in the www.klook.com search index,
 * because Klook answers automated reads with HTTP 403. No Klook price appears.
 */

const OWN = checkedLabel("2026-11-06");

const tourRows = [
  {
    tour: amanohashidateIneFullDayTour,
    name: "Kyoto Amanohashidate & Ine Funaya",
    from: "Several cities; pick the departure time at checkout",
    time: "Listed 07:30–18:30",
    stops: "Chion-ji, Amanohashidate cable car, Ine boathouses",
    tickets: "Cable car or monorail and Ine boat are extra unless your package has them",
    lunch: "Not included; free time to buy your own",
  },
  {
    tour: amanohashidateIneBayScenicTour,
    name: "Amanohashidate, Ine Funaya & Ine Bay",
    from: "Osaka or Kyoto; you can board in one and leave in the other",
    time: "10–11 hours",
    stops: "Amanohashidate, Ine boathouses, Ine Bay boat",
    tickets: "One package includes both tickets; the other leaves them to buy from the guide",
    lunch: "Not shown as included",
  },
  {
    tour: amanohashidateIneChionjiTour,
    name: "Sea of Kyoto day trip with Chion-ji",
    from: "Osaka or Kyoto",
    time: "10.5 hours",
    stops: "Amanohashidate, Ine boathouses, Ine Bay boat, Chion-ji; Tango Sea Train optional",
    tickets: "Varies by plan; cable car fee refunded if both the cable car and lift are shut",
    lunch: "A local specialty meal on some plans",
  },
  {
    tour: amanohashidateIneMiyamaTour,
    name: "With Miyama thatched village",
    from: "Osaka or Kyoto",
    time: "9–10 hours",
    stops: "Amanohashidate, Ine boathouses, Miyama",
    tickets: "Read the listing for your date",
    lunch: "Read the listing for your date",
  },
  {
    tour: amanohashidateIneMiyamaKyotoTour,
    name: "With Miyama, from Kyoto",
    from: "Listed from Kyoto",
    time: "10 hours",
    stops: "Amanohashidate, Ine boathouses, Miyama",
    tickets: "Read the listing for your date",
    lunch: "Read the listing for your date",
  },
];

const officialRows = [
  {
    stop: "Ine Bay sightseeing boat",
    price: "¥1,200 adult, ¥600 ages 6–12; one under-6 free with each adult",
    hours: "9:00–16:00 on the hour and half-hour, all year; about 25 minutes",
    note: "Boards at Hide. May stop in wind of 10 m/s, waves of 0.8 m or visibility under 300 m",
    source: "tankai.jp",
  },
  {
    stop: "Kasamatsu Park cable car and lift",
    price: "¥800 adult, ¥400 child return",
    hours: "Cable car 9:00–18:00 March to October, to 17:30 in November and February, to 17:00 in December and January. Lift 9:00–16:00 March to November",
    note: "From 6 January to the end of February the lift runs weekends and holidays only, 10:00–16:00. The cable car takes about 4 minutes",
    source: "tankai.jp",
  },
  {
    stop: "Amanohashidate Viewland",
    price: "¥1,000 adult, ¥500 elementary",
    hours: "1 October to 15 November: from 9:00, last tickets 17:00, open to 17:30. 16 November to 15 February: 9:00–16:30. No regular closing day",
    note: "About 7 minutes on foot from Amanohashidate Station. On 18 November the lift stops from 15:00 and on 19 November it starts at 11:00; the monorail keeps running",
    source: "amanohashidate.jp",
  },
];

const routeRows = [
  {
    route: "Kyoto Station → Amanohashidate, limited express Hashidate",
    time: "2 hours 14 minutes, no change",
    fare: "¥4,790 adult, ¥2,400 child, reserved seat (reference example)",
    source: "uminokyoto.jp",
  },
  {
    route: "Osaka Station → Amanohashidate, Kounotori then Hashidate",
    time: "2 hours 28 minutes, one change at Fukuchiyama",
    fare: "¥5,680 adult, ¥2,840 child, reserved seat (reference example)",
    source: "uminokyoto.jp",
  },
  {
    route: "Kyoto Station → Amanohashidate, Tankai highway bus",
    time: "About 2 hours 5 minutes; six round trips a day",
    fare: "¥3,400–¥3,900 adult by date, ¥1,800 child",
    source: "tankai.jp",
  },
  {
    route: "Osaka → Amanohashidate, Tankai highway bus",
    time: "About 3 hours 18 to 3 hours 26 minutes",
    fare: "By date, on the operator's timetable page",
    source: "tankai.jp",
  },
  {
    route: "Amanohashidate Station → Ine, Tankai route bus",
    time: "About 60 minutes",
    fare: "On the operator's timetable page",
    source: "westjr.co.jp",
  },
  {
    route: "Kyoto → Ine, door to door by train and bus",
    time: "About 3 hours (about 3.5 from Osaka)",
    fare: "Sum of the legs above",
    source: "ine-kankou.jp",
  },
];

const faqItems = [
  {
    q: "Is Amanohashidate worth a day trip from Kyoto?",
    a: `Yes, if you add Ine and accept a long day. Amanohashidate on its own is a 3.6 km pine-covered sandbar, and JR West counts more than 5,000 pines on it. Paired with the roughly 230 boathouses at Ine, it gives you a side of Kyoto Prefecture that the city does not have. The cost is time: 2 hours 14 minutes each way on the limited express, or a tour day of 9 to 11 hours. With only two days in Kyoto, stay in the city. With three or more, this is a strong candidate for the spare day. Read ${OWN}.`,
  },
  {
    q: "How do I get from Kyoto to Amanohashidate?",
    a: `By limited express Hashidate from Kyoto Station, 2 hours 14 minutes with no change, about ¥4,790 for a reserved seat on the regional tourism site's reference example. The Tankai highway bus takes about 2 hours 5 minutes from Kyoto Station to Amanohashidate Station, runs six round trips a day and costs ¥3,400 to ¥3,900 by date. The bus is cheaper; the train has the fixed reserved seat. Read ${OWN}.`,
  },
  {
    q: "How do I get from Amanohashidate to Ine?",
    a: `By Tankai route bus from Amanohashidate Station, which JR West puts at about 60 minutes. Ine's tourism association tells visitors to board a bus for Kamairi or Ine Yubinkyoku-mae. Tankai's own trip page shows 30 minutes for the same pair, but only the hour fits Ine's published total of about 3 hours from Kyoto, so plan on 60. Check the number of buses a day on the operator's timetable before you set off, because that number decides whether the trip works on your own.`,
  },
  {
    q: "Can you do Amanohashidate and Ine in one day?",
    a: `Yes. It is what every tour here sells, in 9 to 11 hours. On your own it is about 3 hours each way from Kyoto by train and bus, so about 6 hours of travel. The fixed points are the last Ine boat at 16:00 and Viewland's last tickets at 17:00 until 15 November, with a 16:30 close after that. Start with the earliest departure you can manage, and work back from the bus timetable.`,
  },
  {
    q: "Is a tour better than going on your own?",
    a: `For most people visiting from Kyoto or Osaka for one day, yes, because Ine is the difficult leg. A tour removes the route bus and its timetable, so you cover both places without planning the day around that bus. Go on your own if you want more than a short stop at either place, want to stay until late afternoon, or are staying overnight in the area. If you do, the Klook 2-day sightseeing pass covers the boats, viewpoints and local buses, but not the train from Kyoto.`,
  },
  {
    q: "What is the best time to visit Amanohashidate?",
    a: `There is no single best month. JR West describes cherry blossom in spring, green pines in summer, autumn colour and snow in winter. The practical point is winter hours. The cable car runs all year but stops at 17:00 in December and January, Viewland closes at 16:30 from 16 November to 15 February, and from 6 January to the end of February the Kasamatsu lift runs only on weekends and holidays. Snow is not something you can book, so choose winter for the quiet rather than for a guaranteed white view. Read ${OWN}.`,
  },
  {
    q: "What happens on a rainy day?",
    a: `Most of the day still runs, with less to see from the viewpoints. Rain alone is not one of the Ine boat's published stop conditions: those are wind of 10 m/s, waves of 0.8 m and visibility under 300 m. The Kasamatsu lift can stop for weather or maintenance, and the Viewland lift has its own published suspensions. Tour listings differ on refunds. One offers a rebooking or full refund if the operator cancels for extreme weather, and another says a part-cancelled tour is not refundable. Read the wording on the listing you book.`,
  },
  {
    q: "Can you do this day trip with children?",
    a: `Yes, but the length is the real issue. Expect 9 to 11 hours, much of it on a coach. The boat is ¥600 for ages 6 to 12 with one under-6 free per adult, and the cable car is ¥400 return for a child. Viewland is ¥500 at elementary age and has a Ferris wheel, which makes it the easier viewpoint with children. Check the tour's own rule first: the Kyoto Amanohashidate & Ine Funaya listing lets ages 0 to 2 ride free without a seat and charges the adult rate from age 2.`,
  },
  {
    q: "What is the cancellation policy on these tours?",
    a: `The listings show free cancellation with either 24 or 48 hours' notice before the activity date, depending on the tour. Some Miyama-route listings ask for 48. Late arrivals and no-shows are not refunded, and at least one Kyoto-departing listing cancels if it does not reach a minimum of 10 participants, offering a new time or a refund. These are the listings' own terms as read ${OWN}, so read the one shown for your date before you pay.`,
  },
  {
    q: "Does the Kansai WIDE Area Pass cover Amanohashidate?",
    a: `JR West names Amanohashidate as a destination for that pass, and tickets can be booked up to a month ahead. How the Kyoto Tango Railway section is treated is not confirmed here, and the Hashidate runs over that line, so check the valid-area map before you rely on the pass. The route bus to Ine is a separate fare either way.`,
  },
];

const TITLE = "Amanohashidate Day Trip (2026): Ine Funaya, Tours & Trains";
const H1_LINE = "Amanohashidate Day Trip (2026):";
const DESCRIPTION =
  "Amanohashidate day trip from Kyoto: 2h14 by limited express or a 9–11 hour tour with the Ine boathouses and the ¥1,200 Ine Bay boat. Which tour to book.";

const ROUTE = "/guides/attractions/amanohashidate-ine-day-trip";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/kyoto-3-day-itinerary", title: "Kyoto 3 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto (2026): Temples, Timing and What to Book" },
  { href: "/guides/attractions/where-to-stay-in-kyoto", title: "Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Travel Time" },
  { href: "/guides/attractions/kansai-area-pass", title: "Kansai Area Pass (2026): Prices, What It Covers & Is It Worth It?" },
  { href: "/guides/attractions/himeji-castle-day-trip", title: "Himeji Castle Day Trip (2026): ¥2,500 Admission, and Times From Osaka & Kyoto" },
  { href: "/guides/attractions/arima-onsen-day-trip", title: "Arima Onsen Day Trip (2026): From Osaka or Kobe, and What the Baths Cost" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function AmanohashidateIneDayTripPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Amanohashidate Day Trip", item: URL },
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
          <span className={styles.breadCurrent}>Amanohashidate Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {H1_LINE}<br />Ine Boathouses, Tours and Trains From Kyoto
          </h1>
          <p className={styles.heroSubtitle}>
            A pine sandbar and a bay of boathouses on the Sea of Japan. The hard part is the last hour of the
            journey, so that is what this guide is built around.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares & hours, dated", "Five tours compared", "Tour or train"].map((t) => (
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
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Amanohashidate</strong> is about <strong>2 hours 14 minutes</strong> from Kyoto on the
              Hashidate limited express (about <strong>¥4,790</strong>), and <strong>Ine</strong> is about another
              hour by local bus, so the simplest way to do both in one day is a guided tour from Kyoto or Osaka
              (about <strong>9 to 11 hours</strong>). The core stops are the Kasamatsu Park or Amanohashidate
              Viewland lookout, the Ine boathouses and the roughly 25-minute Ine Bay cruise (adult{" "}
              <strong>¥1,200</strong>). Checked {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={amanohashidateIneFullDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Amanohashidate &amp; Ine Tour →
              </KlookLink>
              <KlookLink href={amanohashidateIneBayScenicTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Tour With Boat Tickets →
              </KlookLink>
            </div>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "1rem" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Train from Kyoto</p>
                <p className={styles.verdictStatValue}>2h14 to Amanohashidate</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tour day</p>
                <p className={styles.verdictStatValue}>9–11 hours from Kyoto or Osaka</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Ine Bay boat</p>
                <p className={styles.verdictStatValue}>¥1,200, about 25 minutes</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kyoto to Ine on your own</p>
                <p className={styles.verdictStatValue}>About 3 hours each way</p>
              </div>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Worth it */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Is Amanohashidate Worth a Day Trip From Kyoto?</h2>
          <p className={styles.bodyText}>
            Yes, if you have a spare day and pair it with Ine. Amanohashidate is a sandbar about{" "}
            <strong>3.6 km</strong> long with more than <strong>5,000 pines</strong>, and Ine has about{" "}
            <strong>230 boathouses</strong> along its bay, on JR West&apos;s figures. Neither looks like
            anything in Kyoto city, and that is the reason to go.
          </p>
          <p className={styles.bodyText}>
            The price is the distance. With two days in Kyoto, spend them in the city with our{" "}
            <Link href="/guides/attractions/kyoto-2-day-itinerary">Kyoto 2 day itinerary</Link>. With three or
            more, this can replace Nara or Uji on the spare day in our{" "}
            <Link href="/guides/attractions/kyoto-3-day-itinerary">Kyoto 3 day itinerary</Link>.
          </p>
        </section>

        {/* Tours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare tours</span>
          <h2 className={styles.sectionTitle}>Which Amanohashidate and Ine Day Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Start with the Kyoto Amanohashidate &amp; Ine Funaya tour if you want the plain version, and pick
            the Ine Bay scenic tour if you want the tickets settled in advance or need to finish in a different
            city. Choose a Miyama version only if the thatched village matters more to you than time at Ine.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Departs from", "Length", "Stops", "Cable car & boat", "Lunch", "Checked"].map((h) => (
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
                      <td style={{ fontSize: "0.86rem" }}>{row.tickets}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.lunch}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            These rows come from the listings as they appear in search results, so not every field is shown,
            and packages differ by date. Check the listing for your date: it shows the current price, meeting
            point and what your package includes.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={amanohashidateIneFullDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kyoto Amanohashidate &amp; Ine tour →
            </KlookLink>
            <KlookLink href={amanohashidateIneChionjiTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tour with Chion-ji →
            </KlookLink>
            <KlookLink href={amanohashidateIneMiyamaTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tour with Miyama →
            </KlookLink>
          </div>
        </section>

        {/* One day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The day</span>
          <h2 className={styles.sectionTitle}>Can You Do Amanohashidate and Ine in One Day?</h2>
          <p className={styles.bodyText}>
            Yes, and that is what these tours are for. The Ine Bay scenic tour lists a 7:30 departure, a boat
            around 13:30, and a return to Kyoto Station at about 17:30 or Dotonbori at about 18:30. On your own
            it is about 3 hours each way from Kyoto, so about 6 hours of the day goes on travel.
          </p>
          <p className={styles.bodyText}>
            Three clock times shape the day: the last Ine boat at <strong>16:00</strong>, the Kasamatsu lift
            at <strong>16:00</strong>, and Viewland&apos;s last tickets at <strong>17:00</strong>, with a{" "}
            <strong>16:30</strong> close from 16 November. A tour handles these for you. On your own, plan the day backwards from them.
          </p>
        </section>

        {/* Tour or not */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour or train</span>
          <h2 className={styles.sectionTitle}>Is a Tour Better Than Going on Your Own?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For a single day, yes. Reaching Amanohashidate on your own is easy; Ine is the difficult part. It
            has no railway, and you depend on a route bus. Ine&apos;s tourism association tells visitors to
            board a bus for <strong>Kamairi</strong> or <strong>Ine Yubinkyoku-mae</strong>. Check the number
            of buses a day on the operator&apos;s timetable before you commit.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Journey time", "Fare", "Source"].map((h) => (
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
                      <td style={{ fontSize: "0.82rem" }}>{row.source}, {OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Going on your own makes sense if you want to stay past the point a coach leaves, or to spend a night
            in the area. The Klook 2-day pass suits that plan: it covers the Amanohashidate sightseeing boat, the
            Kasamatsu Park and Viewland viewpoints, the Ine Bay cruise and local buses. It does not appear to
            include the train from Kyoto.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={amanohashidateIneTwoDayPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Amanohashidate &amp; Ine 2-day pass →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Train fares are the regional tourism site&apos;s reference examples and it asks readers to treat
            them as a guide. Tankai&apos;s own trip page shows 30 minutes between Amanohashidate and Ine; this guide uses
            JR West&apos;s 60 because it is the figure that fits Ine&apos;s 3-hour total from Kyoto.
          </p>
        </section>

        <BookingEsimCard lead="Planning the Amanohashidate trip? Get mobile data before you land." />

        {/* Official fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fares &amp; hours</span>
          <h2 className={styles.sectionTitle}>How Much Do the Boat and Viewpoints Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ¥800 or ¥1,000 for a viewpoint plus ¥1,200 for the boat, so ¥2,000 to ¥2,200 for an adult if your
            tour package does not include them. You only need one viewpoint: Kasamatsu Park or Viewland.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Official price", "Hours", "Good to know", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {officialRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.stop}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}, {OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Kasamatsu Park or Viewland?</strong> Pick by the view you want and the coach you are on.
            Viewland is the one you can walk to from the station, on Mt. Monju south of the sandbar, and has a
            Ferris wheel and a monorail. Kasamatsu Park is across the bay, reached by the cable car. Some tours
            fix this for you, so read the listing. You do not need to book the boat or either viewpoint in
            advance for an individual visit; neither operator&apos;s page asks for it.
          </p>
        </section>

        {/* Season */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>When to go</span>
          <h2 className={styles.sectionTitle}>What Is the Best Time to Visit Amanohashidate?</h2>
          <p className={styles.bodyText}>
            Any season works, so pick the one you want to see. JR West describes cherry blossom in spring, green
            pines in summer, autumn colour and snow-covered views in winter. Winter is the one that changes the
            plan, because hours shorten: the cable car stops at <strong>17:00</strong> in December and January,
            Viewland closes at <strong>16:30</strong> from 16 November to 15 February, and from{" "}
            <strong>6 January to the end of February</strong> the Kasamatsu lift runs only on weekends and
            holidays, from 10:00 to 16:00.
          </p>
          <p className={styles.bodyText}>
            The cable car and the Ine boat run all year, so a winter tour is workable. Snow itself cannot be
            planned for, so we would not book only for it. If the tour date is flexible, check the
            forecast for northern Kyoto before you lock it in, and use a listing with free cancellation.
          </p>
        </section>

        {/* Rain and kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Weather &amp; families</span>
          <h2 className={styles.sectionTitle}>What If It Rains, and Can You Bring Children?</h2>
          <p className={styles.bodyText}>
            <strong>In rain,</strong> the day usually continues. The Ine boat&apos;s published stop conditions
            are wind of 10 m/s, waves of 0.8 m and visibility under 300 m, and rain is not one of them. The
            cable car is the better choice than an open lift, and one listing says that if both are shut the
            cable car fee is refunded and the stop becomes a walk.
          </p>
          <p className={styles.bodyText}>
            <strong>With children,</strong> the fares are low but the day is long. The boat is ¥600 for ages 6
            to 12 with one under-6 free per adult, the cable car is ¥400 return, and Viewland is ¥500 at
            elementary age. Tour rules differ from these: the Kyoto Amanohashidate &amp; Ine Funaya listing
            charges the adult rate from age 2. All fares read {OWN}.
          </p>
        </section>

        {/* Cancellation */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Should You Book, and Can You Cancel?</h2>
          <p className={styles.bodyText}>
            Book once your Kyoto dates are fixed, and earlier for a weekend or a peak season. There is no fixed
            sell-out date, because availability is per tour and per day, so check your date now rather than the
            day before. These are join-in coach tours, and same-day booking is not something to rely on.
          </p>
          <p className={styles.bodyText}>
            The listings allow free cancellation with <strong>24 or 48 hours&apos; notice</strong>{" "}
            before the activity date, depending on the tour. Late arrivals and no-shows are not refunded, and
            at least one Kyoto-departing listing can cancel below a minimum of 10 participants. Weather wording
            varies too, so check it before you pay. Terms read {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={amanohashidateIneFullDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check your date on Klook →
            </KlookLink>
            <KlookLink href={amanohashidateIneMiyamaKyotoTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Miyama version from Kyoto →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Before you go"
          heading="What Should You Book Around an Amanohashidate Day?"
          intro="A 7:30 departure means the night before is part of the trip. These are the bookings around the tour itself. Open a listing for the price on your dates."
          items={amanohashidateTripPrep}
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
          heading="Amanohashidate and Ine Tours on Klook"
          intro="The four listings most readers will choose between. Open one for the current price and the package options on your date."
          tours={[
            amanohashidateIneFullDayTour,
            amanohashidateIneBayScenicTour,
            amanohashidateIneChionjiTour,
            amanohashidateIneMiyamaTour,
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
            <h2 className={styles.ctaBannerTitle}>One day, one coach, and no bus timetable</h2>
            <p className={styles.ctaBannerDesc}>
              The sandbar and the boathouses are about an hour apart by bus. A tour turns that into a single
              booking from Kyoto or Osaka.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={amanohashidateIneFullDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Amanohashidate Tour →
              </KlookLink>
              <KlookLink href={amanohashidateIneBayScenicTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Ine Bay Tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
