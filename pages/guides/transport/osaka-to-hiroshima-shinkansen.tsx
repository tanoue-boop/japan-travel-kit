import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import fares from "../../../data/jr-fares.json";
import {
  hiroshimaMiyajimaFerryDayTour,
  hiroshimaMiyajimaJoinDayTour,
  hiroshimaMiyajimaMultiCityDayTour,
  jrKansaiHiroshimaAreaPass,
  jrPassWholeJapan,
  jrSanyoSaninAreaPass,
  klookEsim,
  osakaHiroshimaMiyajimaBulletTrainDayTrip,
  osakaHiroshimaMiyajimaPrivateDayTour,
  shinkansenOsakaHiroshima,
} from "../../../lib/klook-links";

/**
 * Osaka to Hiroshima on the Sanyo Shinkansen. Added 28 Oct 2026. Sister page to
 * tokyo-to-hiroshima-shinkansen: same sources, different leg, and a genuinely
 * different answer — from Kansai this is a day trip, and the pass that fits is
 * a JR West regional one rather than the national pass.
 *
 * What is printed here and where it came from, all read on 28 October 2026:
 *  - the ¥10,750 Shin-Osaka→Hiroshima reserved Ordinary fare, from JR West's own
 *    Smart EX product page on tickets.jr-odekake.net — NOZOMI/MIZUHO, regular
 *    season, one adult one way;
 *  - the ¥17,000 / ¥8,500 five-day Kansai-Hiroshima Area Pass and the ¥23,000 /
 *    ¥11,500 seven-day Sanyo-San'in Area Pass, their Shinkansen sections, the
 *    sections they exclude and the JR Miyajima ferry with its ¥100 visitation
 *    tax, from JR West's own pass pages;
 *  - the rule that a JAPAN RAIL PASS holder riding a NOZOMI or MIZUHO needs "a
 *    special ticket issued only to JAPAN RAIL PASS holders", and the ¥50,000 /
 *    ¥80,000 / ¥100,000 online Ordinary prices, from japanrailpass.net;
 *  - the oversized-baggage rule (over 160 cm and under 250 cm across three
 *    sides, reservation required, ¥1,000 including tax without one, no
 *    surcharge on the seat) and the eight 2026–27 periods in which every NOZOMI
 *    car is reserved, from JR Central's own pages;
 *  - the reserved-seat sale rule (10:00, one month before the day the train
 *    leaves its originating station) from JR Central's ticket-rules page;
 *  - the 1h 20m shortest and 2h 15m average journey, "0 transfer(s)", "181
 *    trains scheduled" and the 06:00 first departure from Klook's own
 *    Osaka–Hiroshima rail page, which unlike its /activity/ pages answers
 *    automated reads. That page's departure list named the MIZUHO, HIKARI,
 *    SAKURA and KODAMA; it did not name a NOZOMI, which is why the NOZOMI is
 *    described here from JR's own pass and fare pages instead.
 *
 * No Klook price appears anywhere: Klook answers automated reads of its product
 * pages with HTTP 403.
 */

const OWN_ISO = "2026-10-28";
const OWN = checkedLabel(OWN_ISO);
/** The date our attractions dataset last read the Hiroshima and Miyajima admissions. */
const SIGHTS_CHECKED = checkedLabel(PRICES.peaceMuseum.checked);

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
const osakaHiroshima = fares.segments.find((s) => s.id === "osaka-hiroshima")!;
const kyotoHiroshima = fares.segments.find((s) => s.id === "kyoto-hiroshima")!;
/** "2026-09" -> "September 2026", for the figures that are ours rather than JR's. */
const FARE_AS_OF = new Date(`${fares.asOf}-01T00:00:00Z`).toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const SMART_EX_OSAKA = "¥10,750";
const KANSAI_HIROSHIMA = "¥17,000";
const SANYO_SANIN = "¥23,000";
const JR_PASS_7 = "¥50,000";

/**
 * The 2026–27 periods in which JR Central runs every NOZOMI car as a reserved
 * car. From railway.jr-central.co.jp/nozomi/, read on 28 Oct 2026.
 */
const nozomiAllReservedPeriods = [
  "24 April – 6 May 2026",
  "7 – 16 August 2026",
  "18 – 23 September 2026",
  "10 – 12 October 2026",
  "21 – 23 November 2026",
  "25 December 2026 – 5 January 2027",
  "9 – 11 January 2027",
  "20 – 22 March 2027",
];

/** The route, as the operators and the booking page state it. */
const routeRows = [
  {
    item: "Shortest Osaka → Hiroshima journey",
    value: "1 hour 20 minutes",
    detail: 'Klook\'s own rail page for the route gives this as the shortest departure and states the route "features 0 transfer(s)"',
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Average journey on the same page",
    value: "2 hours 15 minutes",
    detail: "The average across the whole day, which is dragged up by the all-stations KODAMA. The spread between 1h 20m and the average is entirely a question of which service you board",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Departures per day",
    value: "181 trains, first at 06:00",
    detail: "Klook's count for a sample date — the Sanyo Shinkansen's frequency is why this works as a day trip in a way Tokyo to Hiroshima does not",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Services named on the booking page",
    value: "MIZUHO, HIKARI, SAKURA, KODAMA",
    detail: "The MIZUHO is the fast Sanyo–Kyushu through service and the one behind the 1h 20m figure; the KODAMA stops everywhere. The NOZOMI also works this leg, but Klook's departure list on the day we read it did not name one",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "What MIZUHO and SAKURA actually are",
    value: "Sanyo–Kyushu through services",
    detail: "JR West describes both as running from Shin-Osaka into Kyushu — Shin-Osaka to Kumamoto in as little as 2 hours 57 minutes, to Kagoshima-Chuo in 3 hours 41 minutes. Hiroshima is a stop on the way",
    source: `westjr.co.jp, ${OWN}`,
  },
  {
    item: "Seat classes sold for the route",
    value: "Non-reserved Ordinary, Reserved Ordinary, Reserved Green",
    detail: "The three ticket types Klook's route page lists. There is no Gran Class on the Sanyo line — that is a Tohoku and Hokuriku car",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Kyoto → Hiroshima, for comparison",
    value: `About ${Math.floor(kyotoHiroshima.minutes / 60)} hours ${kyotoHiroshima.minutes % 60} minutes`,
    detail: "If you are based in Kyoto rather than Osaka, the leg is about twenty minutes longer and the same passes apply",
    source: `Our own JR dataset, as of ${FARE_AS_OF} — a rounded reference value`,
  },
];

/** What it costs — operator figures first, our own reference value labelled as such. */
const priceRows = [
  {
    item: "Shin-Osaka → Hiroshima, one way, reserved Ordinary",
    price: SMART_EX_OSAKA,
    covers: "JR's own Smart EX online price for one adult, NOZOMI or MIZUHO, regular season. The same table gives Tokyo → Hiroshima as ¥19,560",
    source: `JR West's Smart EX product page on tickets.jr-odekake.net, ${OWN}`,
  },
  {
    item: "Shin-Osaka → Hiroshima on pass-eligible trains",
    price: `About ${yen(osakaHiroshima.fareYen)}`,
    covers: "Basic fare plus the reserved-seat limited express charge on a SAKURA — the fast service a JAPAN RAIL PASS covers here without a supplement",
    source: `Our own JR fare dataset, as of ${FARE_AS_OF} — a rounded reference value, not an operator table`,
  },
  {
    item: "JR Kansai-Hiroshima Area Pass, 5 days",
    price: `${KANSAI_HIROSHIMA} adult, ¥8,500 child`,
    covers:
      "Reserved Sanyo Shinkansen seats Shin-Osaka ⇔ Hiroshima, the HARUKA, KUROSHIO, KONOTORI and KINOSAKI limited expresses, JR West local lines across Kansai — and the JR Miyajima ferry. Not Hiroshima ⇔ Hakata",
    source: `JR West's own pass page, ${OWN}`,
  },
  {
    item: "JR Sanyo-San'in Area Pass, 7 consecutive days",
    price: `${SANYO_SANIN} adult, ¥11,500 child`,
    covers:
      "The same idea stretched to Hakata and the San'in coast, with the JR Miyajima ferry. Not the Tokaido Shinkansen between Shin-Osaka and Tokyo, and not the Kyushu Shinkansen past Hakata",
    source: `JR West's own pass page, ${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS, 7-day Ordinary",
    price: `${JR_PASS_7} online, ¥53,000 as an overseas Exchange Order`,
    covers: "The whole JR network — but not the NOZOMI or MIZUHO without a separate supplementary ticket sold only to pass holders",
    source: `The JR Group's own price table, ${OWN}`,
  },
  {
    item: "Miyajima ferry visitation tax",
    price: "¥100",
    covers: "Payable on boarding the JR West Miyajima ferry even when a pass covers the crossing itself — JR West states it on both pass pages",
    source: `JR West's own pass pages, ${OWN}`,
  },
  {
    item: "What you pay once you are there",
    price: `${PRICES.peaceMuseum.adult} museum, ${PRICES.itsukushima.adult} shrine`,
    covers: `Hiroshima Peace Memorial Museum admission and Itsukushima Shrine on Miyajima. The Peace Memorial Park and the Atomic Bomb Dome cost nothing; the Miyajima ropeway is ${PRICES.miyajimaRopeway.adult} return`,
    source: `Operators' own sites, ${SIGHTS_CHECKED}`,
  },
];

/** Which ticket, for which trip. */
const compareRows = [
  {
    option: "Two reserved singles, Shin-Osaka ⇄ Hiroshima",
    cost: `About ¥21,500 return on JR's Smart EX price`,
    gets: "The 1h 20m train each way, booked for the trains you actually want, with nothing else to redeem.",
    pick: "If you cannot use a JR West pass — they are sold only to non-Japanese passport holders on a Temporary Visitor stamp — or if you would rather not collect anything at a counter. Otherwise the five-day pass below costs less than this.",
  },
  {
    option: "JR Kansai-Hiroshima Area Pass, 5 days",
    cost: `${KANSAI_HIROSHIMA} adult, ¥8,500 child`,
    gets: "Reserved Sanyo Shinkansen seats as far as Hiroshima, the Kansai local network, the airport HARUKA, and the JR ferry to Miyajima.",
    pick: "Almost any Kansai week with one Hiroshima day in it. ¥17,000 is less than the ¥21,500 a same-day return costs on singles, so it pays for itself on that trip alone and the airport run and the local network come free.",
  },
  {
    option: "JR Sanyo-San'in Area Pass, 7 days",
    cost: `${SANYO_SANIN} adult, ¥11,500 child`,
    gets: "Everything the five-day pass covers plus the Shinkansen on to Hakata, the San'in coast and two more days.",
    pick: "Only if the trip carries on west — Hakata, Izumo, Tottori. For a Kansai base with one Hiroshima day in it, the cheaper pass covers the same train.",
  },
  {
    option: "JAPAN RAIL PASS, 7-day Ordinary",
    cost: `${JR_PASS_7} online`,
    gets: "Every JR line in the country, which matters only if Tokyo or Kanazawa is also in the week.",
    pick: "Not for this leg. ¥50,000 is more than twice what a Hiroshima return costs on singles, and it still does not cover the NOZOMI or MIZUHO without a supplement.",
  },
  {
    option: "Non-reserved Ordinary",
    cost: "Less than reserved; the saving is the reserved-seat charge",
    gets: "Walk up and board — except in the eight peak periods when every NOZOMI car is reserved.",
    pick: "Outside peak dates on a route with 181 departures a day, this is a genuinely reasonable way to travel. Check the peak list first.",
  },
  {
    option: "The day sold as a tour out of Osaka",
    cost: "Check the listing for your date",
    gets: "The Shinkansen leg, the Peace Memorial Park and the Miyajima crossing in one booking, with a guide on the Hiroshima half.",
    pick: "If the day is a single shot and you would rather not spend it reading timetables. The ferry and the tide are the parts that reward someone else having planned them.",
  },
];

const faqItems = [
  {
    q: "How long is the shinkansen from Osaka to Hiroshima?",
    a: `One hour twenty at the fastest, direct. Klook's own rail page for the route gives the shortest departure as 1 hour 20 minutes and states the route "features 0 transfer(s)"; the average across the day is 2 hours 15 minutes, because the all-stations KODAMA is in that average too. Read on ${OWN}. The same page counts 181 departures on a sample date with the first at 06:00, which is the real reason this works as a day trip while Tokyo to Hiroshima does not: you are never more than a short wait from a train in either direction.`,
  },
  {
    q: "How much is the shinkansen from Osaka to Hiroshima?",
    a: `${SMART_EX_OSAKA} one way for a reserved Ordinary seat, which is JR's own Smart EX online price for one adult in the regular season on a NOZOMI or MIZUHO — read off JR West's Smart EX product page on ${OWN}. A same-day return is therefore about ¥21,500, and that is the number every pass on this page has to beat. On pass-eligible trains our own rounded reference figure for the SAKURA is ${yen(osakaHiroshima.fareYen)}, labelled as ours rather than an operator's because JR West does not publish the station-window fare as a static table.`,
  },
  {
    q: "Can I do Hiroshima as a day trip from Osaka?",
    a: `Yes, comfortably — this is the route where the day trip genuinely works. At 1 hour 20 minutes each way on the fastest service, with the first departure at 06:00 and 181 trains across the day on Klook's count, you can be in the Peace Memorial Park before the coaches and still be back in Osaka for dinner. The thing that decides whether it is one day or two is Miyajima: the island needs a local JR train on to Miyajimaguchi and a ferry on top of the Shinkansen, and the floating torii is a tide-table question rather than an opening-hours one. Hiroshima city alone is a relaxed day from Osaka. Hiroshima and Miyajima both, in one day from Osaka, is a long one.`,
  },
  {
    q: "Is the JR Pass worth it for Osaka to Hiroshima?",
    a: `The nationwide one, almost never — a JR West regional pass, usually yes. Here is the arithmetic that settles it. A reserved single is ${SMART_EX_OSAKA} on JR's own Smart EX price, so a same-day return is about ¥21,500. JR West's five-day Kansai-Hiroshima Area Pass is ${KANSAI_HIROSHIMA} adult and ¥8,500 child — less than that return — and it also covers the Kansai local network, the airport HARUKA and the JR ferry to Miyajima, so it pays for itself on the Hiroshima day alone. The nationwide 7-day Ordinary JAPAN RAIL PASS is ${JR_PASS_7} online, more than twice the return, and it still does not cover the NOZOMI or MIZUHO without a separate supplementary ticket. All prices from JR West's and the JR Group's own pages, ${OWN}.`,
  },
  {
    q: "Do I need to reserve a seat?",
    a: `Not usually on a route with 181 departures a day — but check the date first. JR Central runs every NOZOMI car as a reserved car, with no non-reserved section at all, in these 2026–27 periods: ${nozomiAllReservedPeriods.join("; ")}. Outside them the NOZOMI keeps its non-reserved cars, and JR Central notes that the HIKARI, KODAMA, MIZUHO, SAKURA and TSUBAME keep theirs as usual throughout. Reserved seats go on sale at 10:00 one month before the day the train leaves its originating station. If you are holding a JR West area pass, the reserved seat costs nothing extra, so there is no reason to stand.`,
  },
  {
    q: "Does a pass cover the ferry to Miyajima?",
    a: `The JR West one, yes — with a ¥100 tax on top. Both the Kansai-Hiroshima Area Pass and the Sanyo-San'in Area Pass list the JR West Miyajima Ferry between Miyajimaguchi and Miyajima as included, and both state that a ¥100 visitation tax must be paid on boarding regardless. The nationwide JAPAN RAIL PASS covers the same JR ferry. What none of them covers is the other operator's boat from the same pier, or the high-speed services from Hiroshima city — so read the sign at the terminal rather than following the crowd. Read on ${OWN}.`,
  },
  {
    q: "Nozomi or Hikari: which should I take?",
    a: `On this leg it barely matters, which is the opposite of the answer from Tokyo. The fast services — NOZOMI and MIZUHO — run Shin-Osaka to Hiroshima in about an hour and twenty; the SAKURA and HIKARI take roughly an hour and a half; the KODAMA stops everywhere and is the reason Klook's average for the route is 2 hours 15 minutes. If you are buying a ticket, take whatever leaves soonest. If you are holding a nationwide JAPAN RAIL PASS, take the SAKURA or HIKARI, because the NOZOMI and MIZUHO need a supplement and the time you save is ten or fifteen minutes rather than the hour and a quarter it would be from Tokyo. If you are holding a JR West area pass, JR West's own page lists only the Tokaido and Kyushu Shinkansen sections as unavailable — it names no train type as excluded on the Sanyo Shinkansen itself.`,
  },
  {
    q: "What are the luggage rules on this train?",
    a: `A bag whose three sides add up to more than 160 cm and less than 250 cm is 特大荷物 — oversized baggage — and JR Central requires it to be booked in advance on the Tokaido, Sanyo, Kyushu and Nishi-Kyushu Shinkansen, which includes every train on this route. You reserve a 特大荷物スペースつき座席, a seat at the rear of certain reserved cars with the luggage space behind it, and JR charges no surcharge: its own page says it is the same price as a standard or Green reserved seat. Board with an oversized bag and no reservation and there is a ¥1,000 handling fee, tax included. Read on ${OWN}. For a day trip out of Osaka this rarely bites, because you are not carrying the cases — it is the people moving hotels on the same day who get caught.`,
  },
  {
    q: "What does a day in Hiroshima actually cost?",
    a: `Less than the train. The Hiroshima Peace Memorial Museum is ${PRICES.peaceMuseum.adult} for an adult and free for junior high school age and younger, with high school at ¥100; the Peace Memorial Park and the Atomic Bomb Dome cost nothing at all. Itsukushima Shrine on Miyajima is ${PRICES.itsukushima.adult} adult and ${PRICES.itsukushima.child} for elementary and middle school. The one expensive optional item is the Miyajima ropeway up Mt Misen at ${PRICES.miyajimaRopeway.adult} return. Read on ${SIGHTS_CHECKED}. Add the ¥100 Miyajima visitation tax and the local trains and ferry, and the admissions are a rounding error beside the ${SMART_EX_OSAKA} each way.`,
  },
  {
    q: "Should you stop at Himeji or Okayama on the way?",
    a: `Himeji, if your ticket allows it — the castle is a ten-minute walk from the Shinkansen gates, which makes it the most efficient stopover in Japan. Okayama is the junction for Kurashiki and the Seto bridges rather than a sight in itself. The constraint is the ticket, not the train: a journey broken for a few hours is normally still one ticket, an overnight break is two, and each reserved leg needs its own seat. A JR West area pass makes the whole question disappear, which is one more argument for the five-day pass if your week has more than one of these days in it. Our Himeji Castle day trip guide has the castle's own admission and times.`,
  },
];

const TITLE = "Osaka to Hiroshima Shinkansen: Times, Fares, Day Trip";
const DESCRIPTION =
  "Osaka to Hiroshima Shinkansen: 1h20m at the fastest, ¥10,750 reserved on Smart EX, and an easy day trip. JR Pass rules and the Miyajima ferry explained.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/transport/osaka-to-hiroshima-shinkansen") },
});

export default function OsakaToHiroshimaShinkansenPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/osaka-to-hiroshima-shinkansen" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/osaka-to-hiroshima-shinkansen" />
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
              route: "/guides/transport/osaka-to-hiroshima-shinkansen",
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
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Transport & Getting Around",
                  item: "https://www.japan-travel-kit.com/guides/transport",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Osaka to Hiroshima Shinkansen",
                  item: "https://www.japan-travel-kit.com/guides/transport/osaka-to-hiroshima-shinkansen",
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Osaka to Hiroshima Shinkansen</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Osaka to Hiroshima Shinkansen:<br />Times, Fares and Whether It Works as a Day Trip
          </h1>
          <p className={styles.heroSubtitle}>
            Eighty minutes on the fast train, 181 departures a day — and a ¥17,000 JR West pass that is
            worth about two returns.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "JR West & JR Central figures, dated", "Regional passes compared"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Fastest journey</p>
                <p className={styles.verdictStatValue}>1h 20m, no transfer</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Reserved Ordinary</p>
                <p className={styles.verdictStatValue}>{SMART_EX_OSAKA} one way</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day trip?</p>
                <p className={styles.verdictStatValue}>Yes — 181 trains a day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Pass that fits</p>
                <p className={styles.verdictStatValue}>{KANSAI_HIROSHIMA} / 5 days</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>Osaka to Hiroshima Shinkansen</strong> takes{" "}
              <strong>1 hour 20 minutes</strong> at the fastest, direct: Klook&apos;s own rail page for the
              route gives that as the shortest departure, puts the all-day average at{" "}
              <strong>2 hours 15 minutes</strong>, and counts <strong>181 trains</strong> from{" "}
              <strong>06:00</strong> with <strong>&ldquo;0 transfer(s)&rdquo;</strong>. A reserved Ordinary
              seat is <strong>{SMART_EX_OSAKA}</strong> one way on JR&apos;s own Smart EX price — about
              ¥21,500 for a same-day return. That makes Hiroshima a real{" "}
              <strong>day trip from Osaka</strong>, which it is not from Tokyo. On passes, the one shaped
              like this trip is JR West&apos;s <strong>5-day Kansai-Hiroshima Area Pass</strong> at{" "}
              <strong>{KANSAI_HIROSHIMA}</strong> adult — <strong>less than the return</strong> — covering
              reserved Sanyo Shinkansen seats as far as Hiroshima, the Kansai local network and the{" "}
              <strong>JR Miyajima ferry</strong>, with a <strong>¥100</strong> visitation tax still payable
              at the boat. The nationwide JAPAN RAIL PASS
              at <strong>{JR_PASS_7}</strong> is more than twice that return and still excludes the NOZOMI
              and MIZUHO without a supplement. Operator figures read on {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenOsakaHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Osaka → Hiroshima Tickets →
              </KlookLink>
              <KlookLink href={osakaHiroshimaMiyajimaBulletTrainDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Osaka Day Trip with the Bullet Train →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why This Leg Is the Easy One</h2>
          <p className={styles.bodyText}>
            Because it is short, frequent and entirely inside one operator&apos;s territory. Shin-Osaka to
            Hiroshima is a single hop down the <strong>Sanyo Shinkansen</strong> with no change, 181
            departures on Klook&apos;s count for a sample date, and a fastest time of{" "}
            <strong>1 hour 20 minutes</strong>. Nothing about the route needs planning the way the Tokyo
            leg does — which is why the interesting question here is not <em>how</em> but{" "}
            <em>on what ticket</em>.
          </p>
          <p className={styles.bodyText}>
            And the ticket answer is different from the Tokyo one. Because the whole journey sits on JR
            West metals, the passes that fit are <strong>JR West regional passes</strong> rather than the
            national one: the five-day <strong>Kansai-Hiroshima Area Pass</strong> at {KANSAI_HIROSHIMA},
            or the seven-day <strong>Sanyo-San&apos;in Area Pass</strong> at {SANYO_SANIN} if the trip
            carries on to Hakata. A nationwide JAPAN RAIL PASS at {JR_PASS_7} is simply the wrong size for
            a Kansai week.
          </p>
          <p className={styles.bodyText}>
            The one thing worth deciding before you book is how much of Miyajima you want. Hiroshima city —
            the Peace Memorial Park, the Dome, the museum — is a relaxed day from Osaka. Adding the island
            means a local JR train to Miyajimaguchi and a ferry on top, and a tide table rather than an
            opening time deciding what the famous torii looks like when you get there.
          </p>
        </section>

        {/* Route table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The train</span>
          <h2 className={styles.sectionTitle}>How Long Is the Shinkansen From Osaka to Hiroshima?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            One hour twenty minutes at the fastest, direct — and the gap between that and the two-and-a-
            quarter-hour average is entirely which service you board. Every figure carries its source and
            the date it was read.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Value", "What it means", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            For how shinkansen tickets work in general, our{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> covers the two-part
            fare and the seat classes;{" "}
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen">Tokyo to Hiroshima</Link> is the
            same destination with a very different answer; and{" "}
            <Link href="/guides/transport/osaka-transportation">getting around Osaka</Link> covers the
            subway ride to Shin-Osaka before any of this starts.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenOsakaHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka → Hiroshima tickets →
            </KlookLink>
          </div>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Is the Shinkansen From Osaka to Hiroshima?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {SMART_EX_OSAKA} one way for a reserved Ordinary seat — JR&apos;s own Smart EX online price for
            one adult in the regular season, read off JR West&apos;s product page on {OWN}. A same-day
            return is about ¥21,500, and that is the figure every pass below has to beat.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price", "What it covers", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm before buying. {fares.note} Smart EX prices are the online figures
            and differ from the station-window price; peak and off-peak dates move the reserved-seat charge
            by a couple of hundred yen either way. The JR West area passes are sold to non-Japanese passport
            holders on a Temporary Visitor stamp. No Klook price appears on this page: Klook answers
            automated reads of its product pages with an error, so no figure from it could be verified.
          </p>
        </section>

        {/* Pass comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Which Pass Is Worth It for Osaka to Hiroshima?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The regional one, and the arithmetic is unusually clean. A return on singles is about ¥21,500;
            the five-day Kansai-Hiroshima Area Pass is {KANSAI_HIROSHIMA}, which is less — and it throws in
            the Kansai local network, the airport HARUKA and the JR ferry to Miyajima on top. The
            nationwide pass is the one that does not make sense here.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "What it costs", "What it gets you", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.gets}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            One difference worth knowing between the regional passes and the national one. JR West&apos;s
            own page for the Sanyo-San&apos;in Area Pass lists exactly two things as unavailable — the
            Tokaido Shinkansen between Shin-Osaka and Tokyo, and the Kyushu Shinkansen between Hakata and
            Kagoshima-Chuo — and names no train type as excluded on the Sanyo Shinkansen itself. The
            nationwide JAPAN RAIL PASS does exclude train types: riding a NOZOMI or MIZUHO on it needs
            &ldquo;a special ticket issued only to JAPAN RAIL PASS holders&rdquo;. Our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> has the break-even calculator,
            and our{" "}
            <Link href="/guides/attractions/kansai-area-pass">Kansai Area Pass guide</Link> covers the
            cheaper JR West passes that stop short of the Shinkansen.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKansaiHiroshimaAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR Kansai-Hiroshima Area Pass (5 day) →
            </KlookLink>
            <KlookLink href={jrSanyoSaninAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR Sanyo-San&apos;in Area Pass (7 day) →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        {/* Day trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day trip</span>
          <h2 className={styles.sectionTitle}>Can I Do Hiroshima as a Day Trip From Osaka?</h2>
          <p className={styles.bodyText}>
            Yes — and unlike the Tokyo version, it is a pleasant day rather than an endurance test.
            Eighty minutes each way on the fastest service, a first departure at <strong>06:00</strong> and{" "}
            <strong>181 trains</strong> across the day on Klook&apos;s count mean you choose your hours
            rather than having them chosen for you. Hiroshima city itself is walkable and tram-served: the
            Peace Memorial Park, the Atomic Bomb Dome and the museum sit together, and the museum is{" "}
            {PRICES.peaceMuseum.adult} with the park and the Dome free.
          </p>
          <p className={styles.bodyText}>
            Miyajima is the decision. The island is a local JR train on to Miyajimaguchi plus a ferry, and
            the shot everyone comes for — the torii standing in water — depends on the tide rather than on
            when you arrive. Doing the park properly and the island properly in one day from Osaka is a
            long day; doing one of them is comfortable. If you want both and have the night, Hiroshima is
            cheap to sleep in by Kansai standards.
          </p>
          <p className={styles.bodyText}>
            If the single day is fixed, the guided departures from Osaka exist for a concrete reason rather
            than a vague one: they put the Shinkansen leg and the ferry inside one booking and schedule the
            island around the tide. Our{" "}
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip">Hiroshima and Miyajima day trip guide</Link>{" "}
            has the admissions and the ferry detail, and our{" "}
            <Link href="/guides/attractions/things-to-do-osaka">things to do in Osaka guide</Link> covers
            what the day is competing with.
          </p>
        </section>

        {/* Reservations and luggage */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservations &amp; luggage</span>
          <h2 className={styles.sectionTitle}>Do I Need to Reserve a Seat — and What About Big Bags?</h2>
          <p className={styles.bodyText}>
            On 181 departures a day, usually not — with one exception you cannot see from the timetable.
            JR Central runs <strong>every NOZOMI car as a reserved car</strong> in the periods below, which
            means that on those dates there is no non-reserved seat on the fast service at all. Read from
            JR Central&apos;s own page on {OWN}:
          </p>
          <ul className={styles.pickList}>
            {nozomiAllReservedPeriods.map((period) => (
              <li key={period}>
                <span className={styles.proIcon}>▸</span>
                <span><strong>{period}</strong></span>
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            Outside those windows the NOZOMI keeps its non-reserved cars, and JR Central states that the
            HIKARI, KODAMA, MIZUHO, SAKURA and TSUBAME keep theirs as usual throughout. Reserved seats go
            on sale at <strong>10:00, one month before</strong> the day the train leaves its originating
            station. On a pass the reservation costs nothing, so make it.
          </p>
          <p className={styles.bodyText}>
            Luggage has its own rule, and it applies to this line. A bag whose three sides add up to{" "}
            <strong>more than 160 cm and less than 250 cm</strong> is <strong>特大荷物</strong> and must be
            booked in advance on the Tokaido, Sanyo, Kyushu and Nishi-Kyushu Shinkansen. What you reserve
            is a <strong>特大荷物スペースつき座席</strong> — a seat at the rear of certain reserved cars
            with the luggage space behind it — at no surcharge: JR&apos;s own page says it is the same
            price as a standard or Green reserved seat. Without the reservation there is a{" "}
            <strong>¥1,000</strong> handling fee, tax included. On a day trip out of Osaka you are not
            carrying the cases, so this mostly matters on the day you change cities.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenOsakaHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Pick a train and seat class →
            </KlookLink>
            <KlookLink href={jrKansaiHiroshimaAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR Kansai-Hiroshima Area Pass →
            </KlookLink>
          </div>
        </section>

        {/* Miyajima */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The ferry</span>
          <h2 className={styles.sectionTitle}>Does a Pass Cover the Ferry to Miyajima?</h2>
          <p className={styles.bodyText}>
            The JR one does, and there is still ¥100 to pay. Both JR West area passes list the{" "}
            <strong>JR West Miyajima Ferry</strong> between Miyajimaguchi and Miyajima as included, and
            both state on the same page that a <strong>¥100 visitation tax</strong> must be paid when you
            board. The nationwide JAPAN RAIL PASS covers the same JR ferry. What no rail pass covers is the
            other operator&apos;s boat leaving the same pier, or the high-speed services that run from
            Hiroshima city itself — so check the sign at the terminal rather than following the queue.
          </p>
          <p className={styles.bodyText}>
            On the island, Itsukushima Shrine is {PRICES.itsukushima.adult} for an adult and{" "}
            {PRICES.itsukushima.child} for elementary and middle school, and the Mt Misen ropeway is{" "}
            {PRICES.miyajimaRopeway.adult} return — the single most expensive item on a Miyajima day, and
            entirely optional. Read on {SIGHTS_CHECKED}. The tide is the thing to look up on the morning:
            the torii only stands in water for part of the day, and no ticket changes that.
          </p>
        </section>

        <KlookTourPicks
          heading="Hiroshima and Miyajima From a Kansai Base"
          intro="Five listings in the shapes this day actually comes in — an Osaka departure with the Shinkansen leg inside the booking, a private Osaka day built around Miyajima and Mt Misen, two guided days that start in Hiroshima once you have made your own way there, and one listing sold from Hiroshima, Kyoto or Osaka if you have not decided yet. Open a listing for availability and the current price on your dates."
          tours={[
            osakaHiroshimaMiyajimaBulletTrainDayTrip,
            osakaHiroshimaMiyajimaPrivateDayTour,
            hiroshimaMiyajimaFerryDayTour,
            hiroshimaMiyajimaJoinDayTour,
            hiroshimaMiyajimaMultiCityDayTour,
          ]}
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

        {/* Before you go */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you go</span>
          <h2 className={styles.sectionTitle}>One Thing to Sort Before You Board</h2>
          <p className={styles.bodyText}>
            Data, because a day trip is a day of lookups. The tide table that decides what the torii looks
            like, the ferry timetable at Miyajimaguchi, the next train back when the museum takes longer
            than you expected — all of it lives on a phone, and none of it is worth guessing at from a
            platform. An eSIM activated before you fly covers the whole trip.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it against
            the alternatives, and our{" "}
            <Link href="/guides/transport/ic-cards-japan">IC card guide</Link> covers the Hiroshima trams
            and the local gates once you are off the Shinkansen.
          </p>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Hiroshima Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 18h16M6 18V9l6-5 6 5v9" />
                  <path d="M10 18v-4h4v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hiroshima and Miyajima Day Trip (2026): Is One Day Enough?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kansai-area-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kansai Area Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/himeji-castle-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V8l3-3 4 3 4-3 3 3v13" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Himeji Castle Day Trip (2026): ¥2,500 Admission, and Times From Osaka &amp; Kyoto</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
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
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Subway, Trains &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Transport &amp; Getting Around Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Eighty minutes, and a pass that fits</h2>
            <p className={styles.ctaBannerDesc}>
              Price the five-day Kansai-Hiroshima Area Pass against two singles before you book anything —
              at {KANSAI_HIROSHIMA} it costs less than the ¥21,500 return. Then decide the Miyajima
              question: the island is a ferry and a tide table on top of the Shinkansen.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={shinkansenOsakaHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Osaka → Hiroshima Tickets →
              </KlookLink>
              <KlookLink href={osakaHiroshimaMiyajimaBulletTrainDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Osaka Day Trip →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
