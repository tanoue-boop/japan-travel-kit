import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { priceById, checkedLabel } from "../../../lib/attraction-prices";
import {
  hiroshimaMiyajimaFullDayPrivateTour,
  hiroshimaMiyajimaJoinDayTour,
  hiroshimaMiyajimaMultiCityDayTour,
  hiroshimaMiyajimaPrivateDayTour,
  hiroshimaMiyajimaPrivateWalkingDay,
  hiroshimaPeaceHalfDayTour,
  hiroshimaPeaceMuseumTicket,
  hiroshimaPrivateWalkingTour,
  hiroshimaTwoDayStayAreas,
  hiroshimaTwoDayTripPrep,
  jrKansaiHiroshimaAreaPass,
  klookEsim,
  shinkansenOsakaHiroshima,
  shinkansenTokyoHiroshima,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Two days in Hiroshima and Miyajima, written as a routing-and-booking plan. Added
 * 8 Nov 2026 (task-jtk-20261108-01).
 *
 * Next to its neighbours:
 *  - hiroshima-miyajima-day-trip answers "can both fit in one day";
 *  - hiroshima-peace-memorial-tours answers "which guided visit to the park";
 *  - tokyo- and osaka-to-hiroshima-shinkansen answer "which train";
 *  - this page answers "in what order over two days, where to sleep, and what to book".
 *
 * Official reads on 8 Nov 2026:
 *   hpmmuseum.jp (page_id=47)      ¥200 / ¥100 / free / ¥100 aged 65+; 7:30 opening,
 *                                  closing 19:00 Mar–Jul and Sep–Nov, 18:00 Dec–Feb,
 *                                  20:00 Aug; reserved early and late slots; closed
 *                                  30–31 Dec and mid-February
 *   itsukushimajinja.jp            ¥300 / ¥200 / ¥100, ¥500 with the Treasure Hall;
 *                                  6:30 opening, closing by season
 *   miyajima-ropeway.info          ¥2,000 return / ¥1,100 one way adult, ¥1,000 / ¥550
 *                                  child (6 to under 12); 9:00–16:00 up, last down 16:30;
 *                                  ride times; free shuttle to Momijidani from 9:50;
 *                                  some dates need advance reservations
 *   jr-miyajimaferry.co.jp         ¥200 / ¥100 one way; about 10 minutes; 6:25–22:42 from
 *                                  Miyajimaguchi, 5:45–22:14 from Miyajima; about every
 *                                  15 minutes in the day; Great Torii sailings 9:10–16:10;
 *                                  Japan Rail Pass and JR-WEST passes accepted
 *   miyajima-matsudai.co.jp        ¥200 / ¥100 one way, ¥400 / ¥200 return; about 10
 *                                  minutes; IC and contactless cards; ¥100 tax on top
 *   city.hatsukaichi.hiroshima.jp  Miyajima visitor tax ¥100 a visit, or ¥500 a year;
 *                                  collected with the boat fare; preschool children
 *                                  exempt; in force since 1 October 2023
 *   city.hiroshima.lg.jp           Hiroshima Castle keep closed 22 March 2026; the
 *                                  Sannomaru History Museum opens 1 June 2027 (first
 *                                  floor) and 1 October 2027 (second floor)
 *   dive-hiroshima.com             World Heritage Sea Route about 45 minutes, ¥2,200;
 *                                  JR + ferry from Hiroshima Station about 45 minutes,
 *                                  ¥620; tram + ferry from the Peace Park about 65 min
 *   miyajima.or.jp                 tide-table pages and how to read them (no figures
 *                                  printed here: the tide changes every day)
 * Carried with their own dates: museum last entry, busiest hours and the 15–20 Feb 2027
 * closure (5 Nov 2026); the shinkansen times and the JR fares and pass prices (28 Oct).
 *
 * Not printed: Shukkeien's admission (no current official figure was found) and any
 * Klook price. The "time to allow" column is a planning allowance, labelled as such.
 */

const ROUTE = "/guides/attractions/hiroshima-2-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-08");
const MUSEUM_NOTICES = checkedLabel("2026-11-05");
const RAIL = checkedLabel("2026-10-28");

/** Official adult price, from data/attraction-prices.json (peaceMuseum). */
const MUSEUM_ADULT = priceById("peaceMuseum").adult;
/** Official adult price, from data/attraction-prices.json (itsukushima). */
const SHRINE_ADULT = priceById("itsukushima").adult;
const ROPEWAY_RETURN = "¥2,000";
const FERRY_ONE_WAY = "¥200";
const VISITOR_TAX = "¥100";

type Stop = {
  time: string;
  place: string;
  /** Planning allowance, not an operator figure. */
  allow: string;
  getting: string;
  booking: string;
};

const day1: Stop[] = [
  {
    time: "Morning",
    place: "Arrive by shinkansen; leave bags at the hotel or in station lockers",
    allow: "Tokyo 3h 39m at the fastest, Osaka 1h 20m",
    getting: "Tokaido–Sanyo or Sanyo Shinkansen to Hiroshima Station",
    booking: "Reserved seat recommended; Nozomi needs a supplement with a JR Pass",
  },
  {
    time: "Late morning",
    place: "Atomic Bomb Dome and the Peace Memorial Park — the Children's Peace Monument, the Cenotaph and the Flame of Peace",
    allow: "About 1 hour",
    getting: "Tram from Hiroshima Station to Genbaku-Dome-mae",
    booking: "No — the park and the Dome are open to walk, and the Dome is viewed from outside",
  },
  {
    time: "Midday to afternoon",
    place: "Hiroshima Peace Memorial Museum",
    allow: "About 2 hours; the audio guide alone runs about 70 minutes",
    getting: "On foot across the park",
    booking: `Ticket at the door or online; the museum names about 11:00–15:00 as its busiest time`,
  },
  {
    time: "Late afternoon",
    place: "Shukkeien Garden, or the grounds of Hiroshima Castle",
    allow: "1 hour",
    getting: "Tram, or on foot north of the park",
    booking: "No. The castle keep itself closed on 22 March 2026",
  },
  {
    time: "Evening",
    place: "Hiroshima-style okonomiyaki, around Hatchobori and Hondori",
    allow: "1–1.5 hours",
    getting: "On foot or tram",
    booking: "No; popular counters queue rather than take bookings",
  },
];

const day2: Stop[] = [
  {
    time: "Early morning",
    place: "To Miyajima: JR to Miyajimaguchi and the ferry, or the boat from the Peace Park",
    allow: "About 45 minutes from Hiroshima Station",
    getting: "JR Sanyo Line + JR or Matsudai ferry (about 10 minutes on the water)",
    booking: `No; the ${VISITOR_TAX} visitor tax is added at the ferry gate or ticket machine`,
  },
  {
    time: "Morning",
    place: "Itsukushima Shrine and the great torii; at low tide, the walk out on the sand",
    allow: "1–1.5 hours",
    getting: "On foot from the pier along the shore",
    booking: "No. Check the tide table the night before",
  },
  {
    time: "Late morning to early afternoon",
    place: "Mt. Misen by the Miyajima Ropeway, then the walk to the summit",
    allow: "2.5–3 hours including the walk",
    getting: "Free shuttle bus to Momijidani station from 9:50, then two ropeway lines (about 10 + 4 minutes)",
    booking: "Usually walk-up; the ropeway notes that some dates need advance reservations",
  },
  {
    time: "Afternoon",
    place: "Omotesando shopping street — momiji manju and grilled oysters — and Daisho-in or Senjokaku",
    allow: "1–1.5 hours",
    getting: "On foot",
    booking: "No",
  },
  {
    time: "Late afternoon",
    place: "A second look at the torii at the other tide, then back to the mainland",
    allow: "30 minutes",
    getting: "Ferry to Miyajimaguchi, JR to Hiroshima Station",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Shinkansen on to the next city, or a night on the island",
    allow: "Osaka 1h 20m, Tokyo 3h 39m at the fastest",
    getting: "Sanyo Shinkansen from Hiroshima Station",
    booking: "Reserve the onward seat with the arrival",
  },
];

const ticketRows = [
  {
    stop: "Peace Memorial Museum (Day 1)",
    price: `${MUSEUM_ADULT} adult, ¥100 high school, free junior high and younger, ¥100 aged 65+ with a passport`,
    hours: "7:30–19:00 Mar–Jul and Sep–Nov, 7:30–18:00 Dec–Feb, 7:30–20:00 Aug",
    note: "7:30–8:30 and the last evening hour need an online reservation. Closed 30–31 December and 15–20 February 2027. Last entry 30 minutes before closing",
    source: `hpmmuseum.jp, ${OWN} (closure dates and last entry ${MUSEUM_NOTICES})`,
  },
  {
    stop: "Peace Memorial Park and Atomic Bomb Dome (Day 1)",
    price: "Free",
    hours: "Open park; the Dome is viewed from outside",
    note: "No ticket and no entry to the Dome itself",
    source: `hpmmuseum.jp, ${MUSEUM_NOTICES}`,
  },
  {
    stop: "Hiroshima Castle keep (Day 1 option)",
    price: "—",
    hours: "Closed to visitors since 22 March 2026",
    note: "The exterior can still be seen. The Sannomaru History Museum is due to open on 1 June 2027",
    source: `city.hiroshima.lg.jp, ${OWN}`,
  },
  {
    stop: "Itsukushima Shrine (Day 2)",
    price: `${SHRINE_ADULT} adult, ¥200 high school, ¥100 elementary and junior high; ¥500 adult with the Treasure Hall`,
    hours: "From 6:30; closes 17:30 (15 Oct–30 Nov), 17:00 (December), 17:30 (4 Jan–end Feb), 18:00 (1 Mar–14 Oct)",
    note: "The combined ticket is sold only at the shrine entrance. Treasure Hall 8:00–17:00",
    source: `itsukushimajinja.jp, ${OWN}`,
  },
  {
    stop: "Miyajima Ropeway (Day 2)",
    price: `${ROPEWAY_RETURN} return / ¥1,100 one way adult; ¥1,000 / ¥550 child (6 to under 12)`,
    hours: "Up 9:00–16:00, last down 16:30",
    note: "Can stop for high wind or thunder. Some dates need advance reservations",
    source: `miyajima-ropeway.info, ${OWN}`,
  },
  {
    stop: "Miyajima visitor tax (Day 2)",
    price: `${VISITOR_TAX} a person a visit, or ¥500 for a year`,
    hours: "Charged on every boat to the island",
    note: "Added to the ferry fare; preschool children are exempt",
    source: `city.hatsukaichi.hiroshima.jp, ${OWN}`,
  },
];

const ferryRows = [
  {
    route: "JR Sanyo Line to Miyajimaguchi + JR West Miyajima Ferry",
    time: "About 45 minutes from Hiroshima Station; about 10 minutes on the ferry",
    fare: `Ferry ${FERRY_ONE_WAY} adult, ¥100 child one way; route ¥620 with the train`,
    pass: "Yes — the Japan Rail Pass and JR-WEST passes are accepted on the ferry and the train",
    note: "First ferry 6:25 and last 22:42 from Miyajimaguchi. Sailings 9:10–16:10 take the Great Torii route past the gate",
  },
  {
    route: "Hiroden tram or JR to Miyajimaguchi + Miyajima Matsudai ferry",
    time: "Tram from the Peace Park about 65 minutes; about 10 minutes on the ferry",
    fare: `Ferry ${FERRY_ONE_WAY} adult, ¥100 child one way; ¥400 / ¥200 return`,
    pass: "Not listed as a JR Pass ferry",
    note: "IC cards and contactless credit cards accepted at the gate. Same pier area, a different operator",
  },
  {
    route: "World Heritage Sea Route from the Peace Park",
    time: "About 45 minutes, direct",
    fare: "¥2,200 on Hiroshima's official tourism site; confirm with the operator",
    pass: "No",
    note: "Leaves from the Motoyasu pier beside the park and lands at Miyajima, so the two sites join with no train",
  },
];

const stayRows = [
  {
    area: "Hiroshima Station",
    good: "The shinkansen both days, and the JR local to Miyajimaguchi",
    catch: "The park is a tram ride away, and the evenings are better further south",
    pick: "If Hiroshima is one stop on a rail trip and you are carrying cases",
  },
  {
    area: "Peace Memorial Park area (Hondori, Hatchobori)",
    good: "Day 1 on foot, the museum at 7:30, okonomiyaki in the evening, and the World Heritage Sea Route boat next to the park",
    catch: "A tram or taxi back to the station with luggage on Day 2",
    pick: "The default for two days",
  },
  {
    area: "Miyajima (one night)",
    good: "The shrine from 6:30 and the island in the evening, when the day visitors have gone",
    catch: "Fewer and more expensive rooms; the luggage crosses on the ferry",
    pick: "If the torii at dusk or dawn is the reason you came",
  },
];

const bookingWindow = [
  {
    title: "As soon as the dates are fixed — the shinkansen seats and a Miyajima room",
    desc: "Reserved seats go on sale at 10:00 one month before the day, and in JR Central's peak periods every Nozomi car is reserved. The island has few rooms compared with the city.",
  },
  {
    title: "A few weeks ahead — a guided day, if you want one",
    desc: "Private tours are set up by the operator after booking, so they need lead time. Check the cancellation window on the listing; a typhoon can stop the ferries.",
  },
  {
    title: "A few days ahead — the museum web ticket",
    desc: "Optional for regular hours, but the museum says queues to buy tickets at the door are long at its busiest time. The 7:30 slot needs a reservation.",
  },
  {
    title: "The night before — the tide table",
    desc: "The Miyajima Tourist Association publishes tide times for every day, and marks the hours when you can walk out to the torii. Plan the shrine around it.",
  },
];

const faqItems = [
  {
    q: "Is 2 days enough for Hiroshima and Miyajima?",
    a: `Yes. Two days lets you give the Peace Memorial Park and museum a full Day 1 and Miyajima a full Day 2, including Mt. Misen. In one day you usually have to drop the ropeway or rush the museum. The museum is ${MUSEUM_ADULT} for an adult and Itsukushima Shrine ${SHRINE_ADULT}, read ${OWN}.`,
  },
  {
    q: "How do you get from Hiroshima to Miyajima?",
    a: `Three ways. JR to Miyajimaguchi and the ferry takes about 45 minutes from Hiroshima Station; the JR ferry is ${FERRY_ONE_WAY} one way and accepts the Japan Rail Pass. The Hiroden tram to Miyajimaguchi takes about 65 minutes from the Peace Park. The World Heritage Sea Route boat goes direct from the Peace Park in about 45 minutes. Every boat adds the ${VISITOR_TAX} Miyajima visitor tax. Read ${OWN}.`,
  },
  {
    q: "Should you stay overnight on Miyajima?",
    a: "Only if the early or late hours are the point. The shrine opens at 6:30 and the island is quieter after the day visitors leave. For most two-day trips, a hotel near the Peace Park or Hiroshima Station is simpler, because ferries run from about 6:25 to after 22:00.",
  },
  {
    q: "Is the JR Pass worth it for Hiroshima?",
    a: `Not for this trip alone. A Tokyo–Hiroshima reserved ticket is ¥19,560 one way on JR's Smart EX, while the 7-day Japan Rail Pass is ¥50,000 on the official site or ¥53,000 through overseas agents, and Nozomi still needs a ¥6,500 supplement. From Osaka, JR West's 5-day Kansai-Hiroshima Area Pass (¥17,000) usually wins. Read ${RAIL}.`,
  },
  {
    q: "When is low tide at Itsukushima Shrine?",
    a: "It changes every day. The Miyajima Tourist Association's tide table lists high and low tide times and marks the hours when you can walk out to the great torii. Check the page for your date the night before.",
  },
  {
    q: "What should I book before visiting Hiroshima?",
    a: "The shinkansen seats, the hotel (book first if you want a night on Miyajima), a guided day if you want one, and the museum's web ticket if you will arrive at its busiest time. The park, the shrine and the ferries are walk-up.",
  },
  {
    q: "How much is the Miyajima visitor tax, and how do you pay it?",
    a: `${VISITOR_TAX} per person per visit, added to the ferry fare at the ticket machine, counter or IC card gate. Preschool children are exempt, and a ¥500 one-year option is available. JR passes cover the JR ferry but not the tax. Read on Hatsukaichi City's site ${OWN}.`,
  },
  {
    q: "Is the Hiroshima Castle keep open?",
    a: `No. Hiroshima City closed the keep to visitors on 22 March 2026 because of its age; the exterior can still be seen. The Sannomaru History Museum is due to open on 1 June 2027. Read ${OWN}.`,
  },
  {
    q: "Is this itinerary OK with children or in the rain?",
    a: "Yes, with care. Junior high students and younger enter the museum free, but some exhibits show injured and dead people, so parents may want to look at the museum's site first. In heavy rain or wind, the ropeway can stop, so keep the Day 2 afternoon flexible.",
  },
];

const TITLE = "Hiroshima 2 Day Itinerary (2026): Peace Park and Miyajima";
const DESCRIPTION =
  "A Hiroshima 2 day itinerary: the Peace Park and ¥200 museum on Day 1, Miyajima on Day 2. Hiroshima and Miyajima 2 days with ferries, tides and hotels.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function Hiroshima2DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Hiroshima 2 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Hiroshima 2 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Hiroshima 2 Day Itinerary (2026):<br />The Peace Park, Miyajima and What to Book
          </h1>
          <p className={styles.heroSubtitle}>
            One day for the city and its memorial, one day for the island. The ferry, the tide and where you
            sleep decide how the two days go.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices & hours, dated", "A table for each day", "Three ways to Miyajima compared"].map((t) => (
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

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 1</p>
                <p className={styles.verdictStatValue}>Peace Park, Dome, museum, okonomiyaki</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Miyajima: shrine, Mt. Misen, Omotesando</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>To Miyajima</p>
                <p className={styles.verdictStatValue}>JR ferry ~10 min, {FERRY_ONE_WAY} + {VISITOR_TAX} tax</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book ahead</p>
                <p className={styles.verdictStatValue}>Shinkansen seats, hotel, any tour</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Hiroshima 2 day itinerary</strong> works best as one day per site. On{" "}
              <strong>Day 1</strong>, walk the Peace Memorial Park and the Atomic Bomb Dome, then give the{" "}
              <strong>Peace Memorial Museum</strong> about two hours (<strong>{MUSEUM_ADULT}</strong> for an
              adult, open from <strong>7:30</strong>). On <strong>Day 2</strong>, go to{" "}
              <strong>Miyajima</strong>: JR to Miyajimaguchi, then the JR ferry, about{" "}
              <strong>10 minutes</strong> on the water and {FERRY_ONE_WAY} one way, plus the{" "}
              <strong>{VISITOR_TAX} Miyajima visitor tax</strong>. Itsukushima Shrine is {SHRINE_ADULT} and the
              Mt. Misen ropeway {ROPEWAY_RETURN} return. Hiroshima is <strong>3h 39m</strong> from Tokyo and{" "}
              <strong>1h 20m</strong> from Osaka by shinkansen at the fastest. Official figures read {OWN};
              train times {RAIL}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={hiroshimaMiyajimaPrivateDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Private Hiroshima &amp; Miyajima Day →
              </KlookLink>
              <KlookLink href={shinkansenTokyoHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Tokyo → Hiroshima Shinkansen →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Is 2 Days Enough for Hiroshima and Miyajima?</h2>
          <p className={styles.bodyText}>
            Yes, and it is the comfortable length. The two UNESCO World Heritage sites are about 45 minutes
            apart, and each fills a day well: the Peace Memorial Park and museum need time and quiet, and
            Miyajima has a ropeway, a mountain and a tide to plan around. Our{" "}
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip">Hiroshima and Miyajima day trip guide</Link>{" "}
            covers doing both in one day; this page is for the version with a night in between.
          </p>
          <p className={styles.bodyText}>
            The order matters. Do the city first, because you arrive there by shinkansen and the museum is the
            part that rewards a fresh, unhurried morning. Do the island second, because you can then take the
            evening train onward from Hiroshima Station, or sleep on Miyajima and leave the next morning.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>Day 1 — What to Do in Hiroshima City</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Peace Memorial Park, the Atomic Bomb Dome and the museum, with a garden in the late afternoon
            and okonomiyaki for dinner. The museum is the anchor: it names about 11:00–15:00 as its busiest
            time, so arrive early or late in that window, or book a web ticket.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Time of day", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {day1.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Museum busiest hours and audio-guide length from hpmmuseum.jp, {MUSEUM_NOTICES}; castle closure from
            Hiroshima City, {OWN}; train times from Klook&apos;s rail route pages, {RAIL}. &ldquo;Time to
            allow&rdquo; is a planning allowance, not an official figure.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 1.</strong> Nothing is required. If you want the history explained,
            a guided walk of the park and museum is the one thing worth booking; our{" "}
            <Link href="/guides/attractions/hiroshima-peace-memorial-tours">Hiroshima Peace Memorial tour guide</Link>{" "}
            compares the options, from 2 to 5 hours. Hiroshima Castle&apos;s keep closed to visitors on 22 March
            2026, so the private city walk that lists the castle now means the grounds and the outside of the
            keep.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hiroshimaPeaceHalfDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Peace Park &amp; museum tour →
            </KlookLink>
            <KlookLink href={hiroshimaPrivateWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Private city walk →
            </KlookLink>
            <KlookLink href={hiroshimaPeaceMuseumTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Museum ticket →
            </KlookLink>
          </div>
        </section>

        {/* Day 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>Day 2 — What to Do on Miyajima</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Itsukushima Shrine and the great torii, Mt. Misen and the Omotesando street, then back to the
            mainland. The hard edge is the ropeway: the last car up leaves at <strong>16:00</strong>, so go up
            before lunch rather than after.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Time of day", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {day2.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Ferry, ropeway and shuttle times from the operators&apos; own sites, {OWN}. &ldquo;Time to
            allow&rdquo; is a planning allowance, not an official figure.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 2.</strong> Nothing has to be booked, but this is the day a guide
            saves the most effort: ferry, tide and ropeway timing in one plan. The private day starts in
            Hiroshima with pick-up listed for hotels near JR Hiroshima Station; the walking version uses
            public transport with a guide; the join-in day includes an okonomiyaki lunch.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hiroshimaMiyajimaPrivateDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Private Miyajima day →
            </KlookLink>
            <KlookLink href={hiroshimaMiyajimaPrivateWalkingDay.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Private walking day →
            </KlookLink>
            <KlookLink href={hiroshimaMiyajimaMultiCityDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Join-in day with lunch →
            </KlookLink>
          </div>
        </section>

        {/* Getting to Miyajima */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting to Miyajima</span>
          <h2 className={styles.sectionTitle}>How Do You Get From Hiroshima to Miyajima?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By JR and the JR ferry if you hold a Japan Rail Pass; by the World Heritage Sea Route if you want to
            go straight from the Peace Park. Both ferries from Miyajimaguchi take about 10 minutes. Every boat
            to the island adds the {VISITOR_TAX} visitor tax.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Fare", "JR Pass?", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ferryRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Ferry fares and times from jr-miyajimaferry.co.jp and miyajima-matsudai.co.jp; journey times, the
            ¥620 JR route and the ¥2,200 sea route fare from dive-hiroshima.com, Hiroshima&apos;s official
            tourism site. All read {OWN}. The sea route operator&apos;s own fare page should be checked before
            you travel.
          </p>
        </section>

        {/* Visitor tax */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Visitor tax</span>
          <h2 className={styles.sectionTitle}>How Much Is the Miyajima Visitor Tax?</h2>
          <p className={styles.bodyText}>
            <strong>{VISITOR_TAX} per person per visit</strong>, collected by the boat operator with the fare.
            Hatsukaichi City, which levies it, says it is added at the ticket machine or counter, or taken
            from your IC card at the automatic gate together with the fare. Preschool children are exempt, and
            a one-year payment of ¥500 is available for repeat visitors. A rail pass covers the JR ferry but
            not the tax. The tax has applied since 1 October 2023. Read on Hatsukaichi City&apos;s site, {OWN}.
          </p>
        </section>

        {/* Tides */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tides</span>
          <h2 className={styles.sectionTitle}>When Is Low Tide at Itsukushima Shrine?</h2>
          <p className={styles.bodyText}>
            It moves every day, so check it for your date. The{" "}
            <a href="https://www.miyajima.or.jp/sio/sio_mikata.html" target="_blank" rel="noopener">
              Miyajima Tourist Association&apos;s tide table
            </a>{" "}
            lists each day&apos;s high and low tides with the time and level, and marks the hours when you can
            walk out on the sand to the great torii. At high tide, the shrine and the torii appear to float.
          </p>
          <p className={styles.bodyText}>
            On two days you can see both. Plan the shrine for whichever tide you care about most, and come
            back past the torii before the ferry. The JR ferry&apos;s Great Torii sailings, from Miyajimaguchi
            between 9:10 and 16:10, pass close to the gate on the way over.
          </p>
        </section>

        {/* Prices and hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; hours</span>
          <h2 className={styles.sectionTitle}>What Do Two Days in Hiroshima Cost in Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Very little: {MUSEUM_ADULT} for the museum and {SHRINE_ADULT} for the shrine, or {ROPEWAY_RETURN}{" "}
            more with the ropeway. The park and the Dome are free. Transport and the hotel are the real cost.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Official price", "Hours", "Notes", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.stop}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm with each operator. Shukkeien Garden&apos;s admission is not listed here;
            check the garden&apos;s own site. No Klook price appears on this page, because Klook prices change by
            date.
          </p>
        </section>

        {/* JR Pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rail pass</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for Hiroshima?</h2>
          <p className={styles.bodyText}>
            Not for a Tokyo–Hiroshima return on its own. JR&apos;s Smart EX price for a reserved Tokyo–Hiroshima
            ticket is <strong>¥19,560</strong> one way. The 7-day Ordinary Japan Rail Pass is{" "}
            <strong>¥50,000</strong> on the official site, ¥53,000 through overseas agents, and on the fastest
            Nozomi and Mizuho trains a pass holder still pays a <strong>¥6,500</strong> supplement between Tokyo
            and Hiroshima. A pass pays when Hiroshima is one stop on a longer rail trip; the{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass price and break-even table</Link> shows which
            weeks clear ¥53,000. The pass does cover the
            JR train to Miyajimaguchi and the JR ferry.
          </p>
          <p className={styles.bodyText}>
            From Osaka or Kyoto, JR West&apos;s <strong>5-day Kansai-Hiroshima Area Pass</strong> (¥17,000 adult)
            covers reserved Sanyo Shinkansen seats between Shin-Osaka and Hiroshima, the local trains and the JR
            ferry, and costs less than a reserved Osaka–Hiroshima return. Prices read {RAIL}. Our{" "}
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen">Tokyo to Hiroshima shinkansen guide</Link>{" "}
            and{" "}
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen">Osaka to Hiroshima shinkansen guide</Link>{" "}
            have the full fare tables.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Hiroshima shinkansen →
            </KlookLink>
            <KlookLink href={shinkansenOsakaHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka → Hiroshima shinkansen →
            </KlookLink>
            <KlookLink href={jrKansaiHiroshimaAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kansai-Hiroshima Area Pass →
            </KlookLink>
          </div>
        </section>

        {/* Where to stay */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Should You Stay Overnight on Miyajima?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Only if the early or late hours are what you came for. The shrine opens at 6:30, and the ferries
            run from early morning to after 22:00, so a city hotel still gives you a long day on the island.
            For most two-day trips, the Peace Park area is the easiest base.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "What it gives you", "The catch", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stayRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.good}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.catch}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for the Three Areas"
          intro="Room prices and availability change by date, so each area links to Klook's hotel search for it."
          areas={hiroshimaTwoDayStayAreas}
        />

        {/* Tour or DIY */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Tour or DIY</span>
          <h2 className={styles.sectionTitle}>Should You Take a Tour or Go on Your Own?</h2>
          <p className={styles.bodyText}>
            On your own is easy: the tram, the train and the ferry are simple, and nothing needs a ticket in
            advance. A tour helps with two things: the history of the Peace Park explained by a guide, and the
            Miyajima day planned around the ferry and the tide.
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Private day from Hiroshima</p>
              <p className={styles.whoForDesc}>
                Your own guide and start time for the two sites, with hotel pick-up listed near JR Hiroshima
                Station. The full-day private tour is listed at 8 hours with a route you can adjust.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Join-in day</p>
              <p className={styles.whoForDesc}>
                An English-guided group day covering the Peace Memorial Park, the museum and Itsukushima Shrine,
                with an okonomiyaki lunch on the listing, and departures from Hiroshima, Kyoto or Osaka.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>On your own</p>
              <p className={styles.whoForDesc}>
                The cheapest way. Buy the museum web ticket if you will arrive in the busy middle of the day,
                and read the tide table the night before Day 2.
              </p>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Check the cancellation terms on the listing for your date: on two days there is little room to
            move a guided day if a typhoon stops the ferries.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hiroshimaMiyajimaFullDayPrivateTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              8-hour private tour →
            </KlookLink>
            <KlookLink href={hiroshimaMiyajimaJoinDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Another join-in day →
            </KlookLink>
          </div>
        </section>

        {/* Booking window */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>What Should I Book Before Visiting Hiroshima?</h2>
          <p className={styles.bodyText}>
            The trains, the hotel and any guided day. The park, the shrine and the ferries are walk-up.
          </p>
          <div className={styles.whoForGrid}>
            {bookingWindow.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Data matters on both days: the ferry timetable, the tide table and a museum web ticket are all on
            your phone.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the
            alternatives.
          </p>
        </section>

        <KlookTripPrep
          label="Before you go"
          heading="Book These Before Your Two Days in Hiroshima"
          intro="The train in, a pass to price against your route, the Miyajima day, the island hotel and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={hiroshimaTwoDayTripPrep}
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
          heading="Guided Days for Hiroshima and Miyajima"
          intro="Private days with your own guide, and a join-in day that covers both sites. Durations, pick-up and inclusions are on each listing."
          tours={[hiroshimaMiyajimaPrivateDayTour, hiroshimaMiyajimaPrivateWalkingDay, hiroshimaMiyajimaFullDayPrivateTour, hiroshimaMiyajimaMultiCityDayTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "Hiroshima and Miyajima Day Trip (2026): Is One Day Enough?" },
              { href: "/guides/attractions/hiroshima-peace-memorial-tours", title: "Hiroshima Peace Memorial Tour: Guides, Museum & Tickets" },
              { href: "/guides/transport/tokyo-to-hiroshima-shinkansen", title: "Tokyo to Hiroshima Shinkansen: Times, Fares, JR Pass" },
              { href: "/guides/transport/osaka-to-hiroshima-shinkansen", title: "Osaka to Hiroshima Shinkansen (2026): Time and Price" },
              { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day" },
              { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan Itinerary 10 Days (2026): 10 Days in Japan, Day by Day" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>One day for the city, one for the island</h2>
            <p className={styles.ctaBannerDesc}>
              Book the train and the hotel, read the tide table the night before Day 2, and add a guide if you
              want the ferry and the timing handled for you.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={hiroshimaMiyajimaPrivateDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Private Day →
              </KlookLink>
              <KlookLink href={hiroshimaTwoDayStayAreas[1].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Hotels Near the Peace Park →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
