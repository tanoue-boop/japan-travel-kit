import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
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
  hiroshimaMiyajimaPrivateDayTour,
  hiroshimaStayAreas,
  jrPassWholeJapan,
  jrSanyoSaninAreaPass,
  klookEsim,
  shinkansenTokyoHiroshima,
} from "../../../lib/klook-links";

/**
 * Tokyo to Hiroshima on the Tokaido and Sanyo Shinkansen. Added 28 Oct 2026.
 *
 * What is printed here and where it came from, all read on 28 October 2026:
 *  - the ¥19,560 Tokyo→Hiroshima and ¥10,750 Shin-Osaka→Hiroshima reserved
 *    Ordinary fares, from JR West's own Smart EX product page on
 *    tickets.jr-odekake.net — NOZOMI/MIZUHO, regular season, one adult one way;
 *  - the ¥6,500 NOZOMI/MIZUHO supplement for Tokyo–Hiroshima, the rule that a
 *    pass holder needs "a special ticket issued only to JAPAN RAIL PASS
 *    holders", and the ¥50,000 / ¥80,000 / ¥100,000 online and ¥53,000 /
 *    ¥84,000 / ¥105,000 Exchange Order Ordinary pass prices, from the JR Group's
 *    own japanrailpass.net;
 *  - the oversized-baggage rule — over 160 cm and under 250 cm across three
 *    sides, a reservation required, ¥1,000 including tax without one, and the
 *    seat itself at no surcharge — from JR Central's own page;
 *  - the reserved-seat sale rule (10:00, one month before the day the train
 *    leaves its originating station) from JR Central's ticket-rules page;
 *  - the eight 2026–27 peak periods in which every NOZOMI car is reserved, from
 *    JR Central's own page for that change;
 *  - the ¥23,000 / ¥11,500 Sanyo-San'in Area Pass price, its coverage and the
 *    two sections it excludes, from JR West's own pass page;
 *  - the 3h 39m shortest and 3h 49m average journey, "0 transfer(s)", "127
 *    trains scheduled" and the 06:00 first departure from Klook's own
 *    Tokyo–Hiroshima rail page, which unlike its /activity/ pages answers
 *    automated reads.
 *
 * Two deliberate gaps, stated in the body rather than hidden. The window price
 * of a single ticket is not published as a static table by either operator — so
 * the only non-Smart-EX fare on the page is our own rounded reference value from
 * data/jr-fares.json, labelled as such. And no Klook price appears anywhere:
 * Klook answers automated reads of its product pages with HTTP 403.
 */

const OWN_ISO = "2026-10-28";
const OWN = checkedLabel(OWN_ISO);
/** The date our attractions dataset last read the Hiroshima and Miyajima admissions. */
const SIGHTS_CHECKED = checkedLabel(PRICES.peaceMuseum.checked);

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
const tokyoHiroshima = fares.segments.find((s) => s.id === "tokyo-hiroshima")!;
const osakaHiroshima = fares.segments.find((s) => s.id === "osaka-hiroshima")!;
/** "2026-09" -> "September 2026", for the one non-operator figure on the page. */
const FARE_AS_OF = new Date(`${fares.asOf}-01T00:00:00Z`).toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const SMART_EX_TOKYO = "¥19,560";
const NOZOMI_SUPPLEMENT = "¥6,500";
const JR_PASS_7 = "¥50,000";
const SANYO_SANIN = "¥23,000";

/**
 * The 2026–27 periods in which JR Central runs every NOZOMI car as a reserved
 * car. Straight off railway.jr-central.co.jp/nozomi/, read on 28 Oct 2026 — this
 * is the one rule on the route that turns a walk-up plan into a missed train.
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
    item: "Shortest Tokyo → Hiroshima journey",
    value: "3 hours 39 minutes",
    detail: 'A direct NOZOMI. Klook\'s own rail page for the route gives this as the shortest departure and states the route "features 0 transfer(s)"',
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Average journey on the same page",
    value: "3 hours 49 minutes",
    detail: "The average across the day's departures — the ten-minute spread is how many stops the NOZOMI you pick makes west of Shin-Osaka",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Departures per day",
    value: "127 trains, first at 06:00",
    detail: "Klook's count for a sample date. In practice you do not plan this route around the timetable; you plan it around which train your ticket lets you board",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Pass-eligible route (HIKARI + SAKURA)",
    value: `About ${Math.floor(tokyoHiroshima.minutes / 60)} hours, changing at Shin-Osaka`,
    detail: "No HIKARI runs Tokyo to Hiroshima straight through, so a JAPAN RAIL PASS without a supplement means a HIKARI to Shin-Osaka and a SAKURA or HIKARI onward",
    source: `Our own JR dataset, as of ${FARE_AS_OF} — a rounded reference value`,
  },
  {
    item: "MIZUHO and SAKURA",
    value: "Shin-Osaka and west only",
    detail: "JR West describes both as the Sanyo–Kyushu through services, running from Shin-Osaka to Kumamoto and Kagoshima-Chuo. Neither starts at Tokyo, so MIZUHO is not a Tokyo–Hiroshima option at all",
    source: `westjr.co.jp, ${OWN}`,
  },
  {
    item: "Seat classes sold for the route",
    value: "Non-reserved Ordinary, Reserved Ordinary, Reserved Green",
    detail: "The three ticket types Klook's route page lists for Tokyo to Hiroshima. There is no Gran Class on the Tokaido or Sanyo line — that is a Tohoku and Hokuriku car",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Sanyo leg on its own",
    value: `About ${osakaHiroshima.minutes} minutes, Shin-Osaka → Hiroshima`,
    detail: "Worth knowing because it is what the regional JR West passes cover, and what a Kansai-based trip actually buys",
    source: `Our own JR dataset, as of ${FARE_AS_OF} — a rounded reference value`,
  },
];

/** What it costs — operator figures first, our own reference value labelled as such. */
const priceRows = [
  {
    item: "Tokyo → Hiroshima, one way, reserved Ordinary",
    price: SMART_EX_TOKYO,
    covers: "JR's own Smart EX online price for one adult, NOZOMI or MIZUHO, regular season. Shin-Osaka → Hiroshima on the same table is ¥10,750",
    source: `JR West's Smart EX product page on tickets.jr-odekake.net, ${OWN}`,
  },
  {
    item: "Tokyo → Hiroshima on pass-eligible trains",
    price: `About ${yen(tokyoHiroshima.fareYen)}`,
    covers: "Basic fare plus the reserved-seat limited express charge on a HIKARI and SAKURA combination — the trains a JAPAN RAIL PASS covers without a supplement",
    source: `Our own JR fare dataset, as of ${FARE_AS_OF} — a rounded reference value, not an operator table`,
  },
  {
    item: "NOZOMI / MIZUHO supplement for pass holders",
    price: `${NOZOMI_SUPPLEMENT} Tokyo – Hiroshima`,
    covers:
      'The special ticket a JAPAN RAIL PASS holder buys to ride a NOZOMI. JR states "the same prices apply to Green Car tickets, reserved seat tickets in an ordinary car and non-reserved seat tickets in an ordinary car"',
    source: `japanrailpass.net, ${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS, Ordinary",
    price: `${JR_PASS_7} / ¥80,000 / ¥100,000 for 7 / 14 / 21 days online`,
    covers: "¥53,000, ¥84,000 and ¥105,000 as an Exchange Order from an overseas agency; Green Car is ¥70,000, ¥110,000 and ¥140,000 online",
    source: `The JR Group's own price table, ${OWN}`,
  },
  {
    item: "JR Sanyo-San'in Area Pass, 7 consecutive days",
    price: `${SANYO_SANIN} adult, ¥11,500 child`,
    covers:
      "Reserved Sanyo Shinkansen seats Shin-Osaka ⇔ Hakata and the JR Miyajima ferry, but explicitly not the Tokaido Shinkansen between Shin-Osaka and Tokyo — so it does nothing for the Tokyo leg",
    source: `JR West's own pass page, ${OWN}`,
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
    option: "A single reserved NOZOMI ticket each way",
    cost: `${SMART_EX_TOKYO} one way on Smart EX`,
    gets: "The 3h 39m direct train, no transfer, and nothing else to buy or plan.",
    pick: "The default. If Hiroshima is a there-and-back from Tokyo, two singles are about ¥39,000 against ¥50,000 for a 7-day pass — the pass loses.",
  },
  {
    option: "JAPAN RAIL PASS, 7-day Ordinary, on HIKARI and SAKURA",
    cost: `${JR_PASS_7} online`,
    gets: "Every JR line in the country, and a Tokyo–Hiroshima run that changes at Shin-Osaka instead of running through.",
    pick: "Only if the same week has Kyoto, Kanazawa or Tohoku in it as well. Our reference figures put a Tokyo–Kyoto–Hiroshima–Tokyo run at roughly ¥44,000, which is still under the pass price.",
  },
  {
    option: "JAPAN RAIL PASS plus the NOZOMI supplement",
    cost: `${JR_PASS_7} plus ${NOZOMI_SUPPLEMENT} each way`,
    gets: "The pass, and the fast direct train on the one leg where the change at Shin-Osaka actually costs you an hour.",
    pick: "If you already hold the pass for other reasons and this is the leg you do not want to spend five hours on. Buying the supplement on one leg only is allowed.",
  },
  {
    option: "JR Sanyo-San'in Area Pass, 7 days",
    cost: `${SANYO_SANIN} adult, ¥11,500 child`,
    gets: "Reserved Sanyo Shinkansen seats as far as Hakata, the San'in coast, and the JR ferry to Miyajima.",
    pick: "Not for the Tokyo leg — JR West excludes the Tokaido Shinkansen. This is the pass for the week that starts in Kansai and carries on west, which our Osaka to Hiroshima guide covers.",
  },
  {
    option: "Non-reserved Ordinary",
    cost: "Less than reserved; the saving is the reserved-seat charge",
    gets: "Walk up and board whichever train comes — except in the eight peak periods below, when every NOZOMI car is reserved.",
    pick: "Outside peak dates, travelling light, if you would rather not commit to a departure. Check the peak list first: in those windows there is no non-reserved NOZOMI car at all.",
  },
  {
    option: "The day sold as a guided tour",
    cost: "Check the listing for your date",
    gets: "The Peace Memorial Park, the Atomic Bomb Dome and the Miyajima crossing in one booking, with the ferry inside it.",
    pick: "Once the rail is settled, and especially if Hiroshima is a single day. The crossing and the tide are the parts of this trip that reward someone else having planned them.",
  },
];

const faqItems = [
  {
    q: "How long is the shinkansen from Tokyo to Hiroshima?",
    a: `Three hours forty, direct, on a NOZOMI. Klook's own rail page for the route gives the shortest departure as 3 hours 39 minutes and the average as 3 hours 49 minutes, and states the route "features 0 transfer(s)"; read on ${OWN}. The number changes if you are holding a JAPAN RAIL PASS, because the pass does not cover the NOZOMI: the pass-eligible route is a HIKARI to Shin-Osaka and a SAKURA or HIKARI onward, which our own dataset puts at about ${Math.floor(tokyoHiroshima.minutes / 60)} hours with the change. That hour-and-a-quarter difference is the single most important thing to settle before you buy anything, because it decides whether Hiroshima is a day trip or a night.`,
  },
  {
    q: "How much is the shinkansen from Tokyo to Hiroshima?",
    a: `${SMART_EX_TOKYO} one way for a reserved Ordinary seat, on JR's own Smart EX price. That figure is from JR West's Smart EX product page, for one adult in the regular season on a NOZOMI or MIZUHO, read on ${OWN}; the same table gives Shin-Osaka to Hiroshima as ¥10,750. Two singles are therefore about ¥39,000, which is the number to hold against the ${JR_PASS_7} a 7-day Ordinary JAPAN RAIL PASS costs online. If you are travelling on pass-eligible trains instead, our own rounded reference figure for the HIKARI and SAKURA combination is ${yen(tokyoHiroshima.fareYen)} — labelled as ours rather than an operator's, because neither JR East nor JR Central publishes the window price as a static table.`,
  },
  {
    q: "Is the JR Pass worth it for Tokyo to Hiroshima?",
    a: `Not for the round trip on its own. A 7-day Ordinary JAPAN RAIL PASS is ${JR_PASS_7} bought online — ¥53,000 as an Exchange Order from an overseas agency — and two reserved singles to Hiroshima and back come to roughly ¥39,000 on JR's own Smart EX price. Even adding Kyoto to the week, our reference fares put a Tokyo–Kyoto–Hiroshima–Tokyo run at about ¥44,000, still under the pass. The pass starts winning when a third long leg appears: Kanazawa, Sendai, Hakata. And remember what it does not buy — the NOZOMI and the MIZUHO need a separate ticket "issued only to JAPAN RAIL PASS holders", ${NOZOMI_SUPPLEMENT} for Tokyo–Hiroshima, the same price whether you sit in Green, reserved or non-reserved. All figures from japanrailpass.net, ${OWN}.`,
  },
  {
    q: "Do I need to reserve a seat?",
    a: `Usually no, and on eight sets of dates absolutely yes. JR Central's own page lists the periods in which every NOZOMI car runs as a reserved car with no non-reserved section at all: ${nozomiAllReservedPeriods.join("; ")}. Outside those windows the NOZOMI keeps its non-reserved cars, and JR Central notes that the HIKARI, KODAMA, MIZUHO, SAKURA and TSUBAME keep theirs as usual throughout. Reserved seats go on sale at 10:00 one month before the day the train leaves its originating station — so 10:00 on 1 March for a 1 April departure. If you are holding a rail pass the reservation is free, which means there is no reason not to make one.`,
  },
  {
    q: "Nozomi or Hikari: which should I take?",
    a: `NOZOMI unless a pass is making the decision for you. The NOZOMI is the only service that runs Tokyo to Hiroshima straight through, at 3 hours 39 minutes on Klook's own figure for the route. The HIKARI does not: a pass-eligible journey is a HIKARI to Shin-Osaka and a SAKURA or HIKARI onward, which adds a change and about an hour and a quarter. If you hold a JAPAN RAIL PASS you can buy the NOZOMI back for ${NOZOMI_SUPPLEMENT} each way and it is often worth it on this leg specifically, because the time you lose is larger here than on Tokyo–Kyoto. If you are buying ordinary tickets, there is no reason to choose the HIKARI route at all.`,
  },
  {
    q: "What are the luggage rules on this train?",
    a: `A suitcase over 160 cm needs its own reservation, and arriving without one costs ¥1,000. JR Central defines 特大荷物 — oversized baggage — as anything whose three sides add up to more than 160 cm and less than 250 cm, and the rule covers exactly the lines this journey uses: the Tokaido, Sanyo, Kyushu and Nishi-Kyushu Shinkansen. You book a 特大荷物スペースつき座席, a seat at the rear of certain reserved cars with the luggage space behind it, and JR charges no surcharge for it: it is "the same price as a standard or Green reserved seat". Board with an oversized bag and no reservation and you pay a ¥1,000 handling fee, tax included. Read on ${OWN}. Most airline-checked cases are under 160 cm; it is the ski bags, the oversized hold cases and the pushchairs in a bag that trip people up.`,
  },
  {
    q: "Can you do Hiroshima as a day trip from Tokyo?",
    a: `You can, and it is a seven-and-a-half-hour day on a train. Klook's rail page lists 127 departures with the first at 06:00 and the shortest journey at 3 hours 39 minutes, so an early NOZOMI out and a late one back leaves a usable afternoon. Whether it is a good idea is a different question: the Peace Memorial Park and the Atomic Bomb Dome take a morning, Miyajima needs a local train to Miyajimaguchi and a ferry on top of that, and the floating torii is worth seeing at high tide rather than at whatever hour you happen to arrive. One night in Hiroshima turns a forced march into two half-days. If you are set on the single day, the guided versions exist precisely because they remove the two timing decisions — the ferry and the tide — that cost a self-planned day its afternoon.`,
  },
  {
    q: "What does it cost once you are in Hiroshima?",
    a: `Very little, which surprises people. The Hiroshima Peace Memorial Museum is ${PRICES.peaceMuseum.adult} for an adult and free for junior high school age and younger, with high school at ¥100; the Peace Memorial Park around it and the Atomic Bomb Dome itself cost nothing. Itsukushima Shrine on Miyajima is ${PRICES.itsukushima.adult} adult and ${PRICES.itsukushima.child} for elementary and middle school. The one expensive item is optional: the Miyajima ropeway up Mt Misen is ${PRICES.miyajimaRopeway.adult} return. Read on ${SIGHTS_CHECKED}. Our Hiroshima and Miyajima day trip guide has the tide and ferry detail.`,
  },
  {
    q: "Is there a cheaper way from Tokyo to Hiroshima?",
    a: `Yes, and both alternatives cost you a day or a transfer. Overnight highway coaches run Tokyo to Hiroshima for a fraction of ${SMART_EX_TOKYO}, and ANA and JAL fly Haneda to Hiroshima Airport — but the airport is roughly an hour by bus from the city, which eats most of the flying time's advantage. Neither is covered by any JR pass. The honest cheap option on the rails is the non-reserved Ordinary seat, which saves you the reserved-seat charge, and the discount advance products JR sells through Smart EX and EX Reservation for specific trains and dates. If price is the binding constraint, price the coach against the non-reserved shinkansen seat rather than against a reserved NOZOMI.`,
  },
  {
    q: "Should you stop at Kyoto or Himeji on the way?",
    a: `Himeji, if either — and only on a ticket that lets you. Both sit on the line: Kyoto at about two hours from Tokyo and Himeji another hour west, with the castle a ten-minute walk from the shinkansen gates, which is the most efficient stopover in Japan. The catch is the ticket. A journey broken for a few hours is normally still one ticket, but an overnight break is two, and on a reserved seat each leg needs its own reservation. A pass holder can do it freely; a single-ticket traveller should check before assuming. Our Himeji Castle day trip guide has the castle's own admission and the times from Osaka and Kyoto.`,
  },
];

const TITLE = "Tokyo to Hiroshima Shinkansen: Times, Fares, JR Pass";
const DESCRIPTION =
  "Tokyo to Hiroshima Shinkansen: 3h39m direct on a Nozomi, ¥19,560 reserved on Smart EX. The JR Pass needs a ¥6,500 supplement for the Nozomi.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/transport/tokyo-to-hiroshima-shinkansen") },
});

export default function TokyoToHiroshimaShinkansenPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/tokyo-to-hiroshima-shinkansen" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/tokyo-to-hiroshima-shinkansen" />
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
              route: "/guides/transport/tokyo-to-hiroshima-shinkansen",
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
                  name: "Tokyo to Hiroshima Shinkansen",
                  item: "https://www.japan-travel-kit.com/guides/transport/tokyo-to-hiroshima-shinkansen",
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
          <span className={styles.breadCurrent}>Tokyo to Hiroshima Shinkansen</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo to Hiroshima Shinkansen:<br />Times, Fares and the JR Pass Catch
          </h1>
          <p className={styles.heroSubtitle}>
            Three hours forty on the one train your rail pass does not cover — and the eight sets of
            dates when that train has no non-reserved car at all.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "JR Central & JR West figures, dated", "Pass break-even included"].map((t) => (
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
                <p className={styles.verdictStatValue}>3h 39m, no transfer</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Reserved Ordinary</p>
                <p className={styles.verdictStatValue}>{SMART_EX_TOKYO} one way</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>NOZOMI on a JR Pass</p>
                <p className={styles.verdictStatValue}>+{NOZOMI_SUPPLEMENT} each way</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Luggage over 160 cm</p>
                <p className={styles.verdictStatValue}>Must be reserved</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>Tokyo to Hiroshima Shinkansen</strong> is one direct train on the Tokaido and
              Sanyo lines: Klook&apos;s own rail page gives the shortest departure as{" "}
              <strong>3 hours 39 minutes</strong> with <strong>&ldquo;0 transfer(s)&rdquo;</strong> and
              127 departures a day from 06:00. A reserved Ordinary seat is{" "}
              <strong>{SMART_EX_TOKYO}</strong> one way on JR&apos;s own Smart EX price. The catch is the
              train: the only through service is the <strong>NOZOMI</strong>, and a{" "}
              <strong>JAPAN RAIL PASS does not cover it</strong> — you either pay a{" "}
              <strong>{NOZOMI_SUPPLEMENT}</strong> supplement each way, or take a HIKARI to Shin-Osaka and
              change, which costs you about an hour and a quarter. Two reserved singles come to roughly
              ¥39,000 against <strong>{JR_PASS_7}</strong> for a 7-day pass, so a there-and-back trip does
              not justify the pass on its own. Two rules to check before you book: in{" "}
              <strong>eight peak periods</strong> every NOZOMI car is reserved, and a case over{" "}
              <strong>160 cm</strong> across three sides needs its own reserved luggage seat or a{" "}
              <strong>¥1,000</strong> fee. Operator figures read on {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenTokyoHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo → Hiroshima Tickets →
              </KlookLink>
              <KlookLink href={hiroshimaMiyajimaFerryDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Hiroshima &amp; Miyajima Day Tour →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why This Route Is a Ticket Question Before It Is a Train Question</h2>
          <p className={styles.bodyText}>
            Because there is exactly one fast train and most visitors are holding the one ticket that does
            not cover it. Tokyo to Hiroshima runs down the Tokaido Shinkansen to Shin-Osaka and straight on
            down the Sanyo Shinkansen without changing trains — but only if you are on a{" "}
            <strong>NOZOMI</strong>. No HIKARI runs the whole way, and the <strong>MIZUHO</strong> and{" "}
            <strong>SAKURA</strong> are the Sanyo–Kyushu through services that start at Shin-Osaka, which JR
            West describes on its own page as running to Kumamoto and Kagoshima-Chuo.
          </p>
          <p className={styles.bodyText}>
            So the decision tree is short. Buying ordinary tickets? Take the NOZOMI; there is no reason not
            to. Holding a <strong>JAPAN RAIL PASS</strong>? You are choosing between a{" "}
            {NOZOMI_SUPPLEMENT} supplement each way and a change at Shin-Osaka that adds about an hour and a
            quarter. Not yet bought a pass? Two reserved singles are roughly ¥39,000 against {JR_PASS_7},
            and that gap is the whole argument.
          </p>
          <p className={styles.bodyText}>
            The third thing worth settling early is the shape of the visit. Hiroshima and Miyajima are two
            different days wearing one name: the Peace Memorial Park is a walk from the tram, while Miyajima
            is a local train to Miyajimaguchi and a ferry, and the floating torii is a tide-table question
            rather than an opening-hours one. That is why this page ends with an argument about whether to
            stay a night — and why the guided days exist.
          </p>
        </section>

        {/* Route table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The train</span>
          <h2 className={styles.sectionTitle}>How Long Is the Shinkansen From Tokyo to Hiroshima?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Three hours thirty-nine minutes at the fastest, direct. Every figure below carries its source
            and the date it was read — including the two rows that explain why a pass holder&apos;s journey
            is a different length from everybody else&apos;s.
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
            For how shinkansen tickets work in general — the two-part fare, the seat classes, what a pass
            opens and what it does not — our{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> covers the mechanics,{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto</Link> is the same question two
            hours earlier on the same line, and{" "}
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen">Osaka to Hiroshima</Link> is the
            Sanyo leg on its own.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Hiroshima tickets →
            </KlookLink>
          </div>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Is the Shinkansen From Tokyo to Hiroshima?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {SMART_EX_TOKYO} one way for a reserved Ordinary seat. That is JR&apos;s own online price, read
            off JR West&apos;s Smart EX product page on {OWN} — one adult, regular season, NOZOMI or MIZUHO.
            One honest caveat: neither JR Central nor JR East publishes the station-window fare as a static
            table, so the pass-eligible row below is our own rounded reference value and is marked as such.
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
            by a couple of hundred yen either way. No Klook price appears on this page: Klook answers
            automated reads of its product pages with an error, so no figure from it could be verified.
          </p>
        </section>

        {/* Pass comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for Tokyo to Hiroshima?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Not on its own — and the reason is arithmetic rather than opinion. Two reserved singles are
            about ¥39,000 at JR&apos;s own Smart EX price; a 7-day Ordinary pass is {JR_PASS_7} online and
            ¥53,000 as an Exchange Order bought abroad.
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
            The rule JR writes down, in its own words: riding a NOZOMI or MIZUHO on a pass requires
            &ldquo;a special ticket issued only to JAPAN RAIL PASS holders&rdquo;, and{" "}
            &ldquo;the same prices apply to Green Car tickets, reserved seat tickets in an ordinary car and
            non-reserved seat tickets in an ordinary car&rdquo;. For Tokyo–Hiroshima that ticket is{" "}
            <strong>{NOZOMI_SUPPLEMENT}</strong>. Our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> has the break-even calculator
            for your own legs, and our{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa">Tokyo to Kanazawa guide</Link> covers the other
            long leg that usually decides it.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 day) →
            </KlookLink>
            <KlookLink href={jrSanyoSaninAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR Sanyo-San&apos;in Area Pass →
            </KlookLink>
          </div>
        </section>

        {/* Reservations */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservations</span>
          <h2 className={styles.sectionTitle}>Do I Need to Reserve a Seat?</h2>
          <p className={styles.bodyText}>
            Most of the year, no — and on eight sets of dates, there is no choice. JR Central runs{" "}
            <strong>every NOZOMI car as a reserved car</strong> in the peak periods below, which means the
            fast train to Hiroshima has no non-reserved section at all on those days. Read from JR
            Central&apos;s own page on {OWN}:
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
            HIKARI, KODAMA, MIZUHO, SAKURA and TSUBAME keep theirs as usual throughout. The booking window
            is the same whichever train you want: reserved seats go on sale at{" "}
            <strong>10:00, one month before</strong> the day the train leaves its originating station — so a
            1 April departure opens at 10:00 on 1 March. In months where the matching date does not exist,
            JR moves the sale to the 1st.
          </p>
          <p className={styles.bodyText}>
            Two practical consequences. If you hold a <strong>JAPAN RAIL PASS</strong>, the seat reservation
            itself is free, so make it — the only thing that costs money on this route is the NOZOMI
            supplement, not the seat. And if you are travelling in Golden Week, Obon or the New Year period,
            treat the reservation as part of buying the ticket rather than something to sort out at the
            station, because in those windows the alternative is not a non-reserved car; it is the next
            train with space.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Pick a train and seat class →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        {/* Luggage */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Luggage</span>
          <h2 className={styles.sectionTitle}>What Are the Oversized Luggage Rules?</h2>
          <p className={styles.bodyText}>
            A bag whose three sides add up to <strong>more than 160 cm and less than 250 cm</strong> is{" "}
            <strong>特大荷物</strong>, oversized baggage, and JR Central requires it to be booked in advance
            on exactly the lines this journey uses — the Tokaido, Sanyo, Kyushu and Nishi-Kyushu Shinkansen.
            What you book is a <strong>特大荷物スペースつき座席</strong>: a seat at the rear of certain
            reserved cars with the luggage space behind it. JR charges no surcharge for it — its own page
            says it is the same price as a standard or Green reserved seat.
          </p>
          <p className={styles.bodyText}>
            Board with an oversized bag and no reservation and there is a{" "}
            <strong>¥1,000 handling fee</strong>, tax included. Read on {OWN}. In practice most checked
            airline cases come in under 160 cm, so this is a rule about ski bags, oversized hold cases,
            golf travel covers and bagged pushchairs. If you are carrying one, note that the luggage seats
            are reserved-car seats only: a non-reserved ticket is not a way around the rule, it is a way
            into the fee.
          </p>
        </section>

        {/* Day trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day trip or night</span>
          <h2 className={styles.sectionTitle}>Can You Do Hiroshima as a Day Trip From Tokyo?</h2>
          <p className={styles.bodyText}>
            Physically yes; sensibly, only if Hiroshima city is all you want. Klook&apos;s rail page lists
            127 departures with the first at <strong>06:00</strong> and the shortest journey at{" "}
            <strong>3 hours 39 minutes</strong>, so an early NOZOMI out and a late one back gives you a
            full working afternoon in the city — at the cost of seven and a half hours on a train.
          </p>
          <p className={styles.bodyText}>
            The reason to stay a night is Miyajima. The island is a local JR train on to Miyajimaguchi and
            a ferry on top of the shinkansen, and the shot everyone comes for — the torii standing in water
            — depends on the tide rather than on when you arrive. Adding that to a Tokyo day trip means
            doing both halves badly. One night turns it into two unhurried half-days, and the city is cheap
            to sleep in by Tokyo standards.
          </p>
          <p className={styles.bodyText}>
            If the single day is fixed, the guided versions are worth the money for a specific reason
            rather than a vague one: they put the ferry inside the booking and schedule the island around
            the tide, which are the two decisions that cost a self-planned day its afternoon. Our{" "}
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip">Hiroshima and Miyajima day trip guide</Link>{" "}
            has the admissions, the ferry and the tide detail; our{" "}
            <Link href="/guides/attractions/japan-10-day-itinerary">10-day Japan itinerary</Link> shows where
            the night fits.
          </p>
        </section>

        <KlookTourPicks
          heading="Hiroshima and Miyajima, Once the Train Is Booked"
          intro="Four guided days covering the same two UNESCO sites in different shapes — a join-in coach, a version with the Miyajima ferry inside the booking, a private day at your own pace, and one listing that departs from Hiroshima, Kyoto or Osaka if you have not yet decided where to sleep. Open a listing for availability and the current price on your dates."
          tours={[
            hiroshimaMiyajimaFerryDayTour,
            hiroshimaMiyajimaJoinDayTour,
            hiroshimaMiyajimaPrivateDayTour,
            hiroshimaMiyajimaMultiCityDayTour,
          ]}
        />

        <KlookStayAreas
          heading="Where to Stay If Hiroshima Becomes a Night"
          intro="Two areas, and the choice is the same one the day-trip argument above turns on: the station, if Hiroshima is one stop inside a longer rail itinerary, or the park, if the reason you came is the thing you can walk to before the coaches arrive."
          areas={hiroshimaStayAreas}
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
            Data, because every decision on this route happens on a phone. Reserved seats open a month out
            and the apps are where you change them; the Miyajima ferry runs to a timetable you will want to
            check against your actual arrival; and the tide table that decides whether the torii is standing
            in water is something you look up on the morning, not the week before. An eSIM activated before
            you fly means all of that is a lookup from a platform rather than a guess.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it against
            the alternatives, and our{" "}
            <Link href="/guides/transport/ic-cards-japan">IC card guide</Link> covers tapping through the
            Hiroshima trams and the local gates once you are off the shinkansen.
          </p>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka to Hiroshima Shinkansen: Times, Fares, Day Trip</p>
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
            <Link href="/guides/transport/tokyo-to-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M4 12h16M4 17h10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kyoto (2026): Cheapest &amp; Fastest Ways to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kanazawa" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M12 5v12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kanazawa (2026): Kagayaki Times, Seats and Whether a Pass Pays</p>
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
            <Link href="/guides/attractions/japan-10-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day</p>
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
            <h2 className={styles.ctaBannerTitle}>One train, one ticket decision</h2>
            <p className={styles.ctaBannerDesc}>
              Book the NOZOMI if you are buying tickets; price the {NOZOMI_SUPPLEMENT} supplement against an
              hour and a quarter if you are holding a pass. Then decide whether Miyajima is worth a night —
              because on a single day from Tokyo, it is the half that gets cut.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={shinkansenTokyoHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Tokyo → Hiroshima Tickets →
              </KlookLink>
              <KlookLink href={hiroshimaMiyajimaJoinDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Hiroshima &amp; Miyajima Tours →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
