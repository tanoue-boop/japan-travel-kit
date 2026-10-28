import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import fares from "../../../data/jr-fares.json";
import {
  ghibliParkNagoyaBusTour,
  ghibliParkTicket,
  jrPassWholeJapan,
  klookEsim,
  legolandJapanHotelPackage,
  legolandJapanTicket,
  nagoyaParkStayAreas,
  shinkansenTokyoNagoya,
  shoryudoHighwayBusPass,
  takayamaShirakawagoNagoyaDayTrip,
  shirakawagoTakayamaOldTownDayTour,
} from "../../../lib/klook-links";

/**
 * Tokyo to Nagoya on the Tokaido Shinkansen. Added 28 Oct 2026, and the first
 * page on this site that treats Nagoya as a destination rather than a station
 * the Kyoto trains pass through — because the two parks and the two UNESCO
 * villages this site already covers are all reached from it.
 *
 * What is printed here and where it came from, all read on 28 October 2026:
 *  - the ¥11,100 Tokyo→Nagoya reserved Ordinary NOZOMI/MIZUHO fare and the
 *    ¥10,890 HIKARI/KODAMA/SAKURA/TSUBAME fare, from smart-ex.jp's own smartEX
 *    Service price table for reserved seats in ordinary cars (the operator's
 *    PDF, "As of April 1, 2025");
 *  - the ¥4,180 NOZOMI/MIZUHO ticket for Tokyo or Shinagawa to Nagoya, the rule
 *    that a pass holder must buy one each time, and that "the same prices apply
 *    to Green Car tickets, reserved seat tickets in an ordinary car and
 *    non-reserved seat tickets in an ordinary car", from japanrailpass.net;
 *  - the ¥50,000 / ¥80,000 / ¥100,000 online and ¥53,000 / ¥84,000 / ¥105,000
 *    Exchange Order Ordinary pass prices, and the Green Car figures, from the JR
 *    Group's own price page;
 *  - the eight 2026–27 periods in which every NOZOMI car runs as a reserved car,
 *    and that the HIKARI, KODAMA, MIZUHO, SAKURA and TSUBAME "will maintain
 *    standard non-reserved seating" through them, from JR Central's own page;
 *  - the oversized-baggage rule — a total of three dimensions over 160 cm and
 *    up to 250 cm, a reserved seat with a baggage area required, no surcharge
 *    for that seat, and a ¥1,000 fee including tax without one — from JR
 *    Central's own luggage page;
 *  - the "1h 26m" shortest and "2h 26m" average journey, "0 transfer(s)",
 *    "451 trains scheduled on Nov. 03, 2026", the 06:00 first and 22:10 last
 *    departure and the three seat classes, from Klook's own Tokyo–Nagoya rail
 *    page, which unlike its /activity/ pages answers automated reads;
 *  - the 2h45m reservation-required Nohi Bus run between Takayama and the
 *    Meitetsu Bus Center at Nagoya Station, from nouhibus.co.jp;
 *  - the Kintetsu-Nagoya 10:25 → Iseshi 11:40 / Ujiyamada 11:42 Shimakaze
 *    timing and the ¥1,900 / ¥3,700 / ¥4,900 / ¥6,700 KINTETSU RAIL PASS
 *    prices, from kintetsu.co.jp's own English pages.
 *
 * The Ghibli Park and LEGOLAND access figures carry their own, earlier date:
 * they were read off Meitetsu Bus, Linimo and the Aonami Line on 26 Oct 2026 for
 * those two guides, and are reused here rather than re-stated, which is why the
 * table labels them with that date.
 *
 * Two deliberate gaps. The station-window price of a single ticket is not
 * published as a static table by JR Central, so the only non-smartEX fare here
 * is our own rounded reference value from data/jr-fares.json, labelled as such.
 * And no Klook price appears anywhere: Klook answers automated reads of its
 * product pages with HTTP 403.
 */

const OWN_ISO = "2026-10-28";
const OWN = checkedLabel(OWN_ISO);
/** The day the two Nagoya park guides read their operators' access figures. */
const PARKS = checkedLabel("2026-10-26");

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
const tokyoNagoya = fares.segments.find((s) => s.id === "tokyo-nagoya")!;
/** "2026-09" -> "September 2026", for the one non-operator figure on the page. */
const FARE_AS_OF = new Date(`${fares.asOf}-01T00:00:00Z`).toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const SMART_EX_NOZOMI = "¥11,100";
const SMART_EX_HIKARI = "¥10,890";
const NOZOMI_TICKET = "¥4,180";
const JR_PASS_7 = "¥50,000";
const KINTETSU_PASS_1 = "¥1,900";

/**
 * The 2026–27 periods in which JR Central runs every NOZOMI car as a reserved
 * car. Straight off railway.jr-central.co.jp/nozomi/, read on 28 Oct 2026 — and
 * the one rule on this route that turns a walk-up plan into a missed train,
 * because the NOZOMI is the only service that does Tokyo to Nagoya in 1h 26m.
 */
const nozomiAllReservedPeriods = [
  "24 April – 6 May 2026 (Golden Week)",
  "7 – 16 August 2026 (Obon)",
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
    item: "Shortest Tokyo → Nagoya journey",
    value: "1 hour 26 minutes",
    detail: 'A direct NOZOMI. Klook\'s own rail page for the route gives this as the shortest departure and states the route "features 0 transfer(s)"',
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Average journey on the same page",
    value: "2 hours 26 minutes",
    detail: "The average across the whole day, which is an hour longer than the fastest — because that average includes the KODAMA, which stops everywhere between Tokyo and Nagoya",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Departures per day",
    value: "451 trains, 06:00 to 22:10",
    detail: "Klook's count for a sample date (3 November 2026). This is the densest intercity rail corridor in the world: you do not plan around the timetable, you plan around which train your ticket lets you board",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Pass-eligible route (HIKARI or KODAMA)",
    value: `About ${Math.floor(tokyoNagoya.minutes / 60)}h ${tokyoNagoya.minutes % 60}m, no transfer`,
    detail: "A JAPAN RAIL PASS does not cover the NOZOMI, but it does cover the HIKARI, which runs Tokyo to Nagoya straight through. You lose roughly a quarter of an hour, not an hour — which is why this route is the kindest Tokaido leg to a pass holder",
    source: `Our own JR dataset, as of ${FARE_AS_OF} — a rounded reference value`,
  },
  {
    item: "Seat classes sold for the route",
    value: "Non-reserved Ordinary, Reserved Ordinary, Reserved Green",
    detail: "The three ticket types Klook's route page lists. There is no Gran Class on the Tokaido line — that is a Tohoku and Hokuriku car",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Starting from Shinagawa instead",
    value: "Same ticket, same NOZOMI ticket price",
    detail: "Every Tokaido NOZOMI calls at Shinagawa a few minutes out of Tokyo, and JR prices the pass holder's NOZOMI ticket as \"Tokyo/Shinagawa – Nagoya\" — one figure for both. If you are staying on the south or west side of the city, board there",
    source: `japanrailpass.net, ${OWN}`,
  },
];

/** What it costs — operator figures first, our own reference value labelled as such. */
const priceRows = [
  {
    item: "Tokyo → Nagoya, one way, reserved Ordinary (NOZOMI / MIZUHO)",
    price: SMART_EX_NOZOMI,
    covers: "JR's own smartEX online price for one adult in the regular season, on the fast train. This is the figure almost everyone pays",
    source: `smart-ex.jp's own smartEX fare table, ${OWN}`,
  },
  {
    item: "The same seat on a HIKARI, KODAMA, SAKURA or TSUBAME",
    price: SMART_EX_HIKARI,
    covers: "¥210 less, on the same smartEX table — the discount for not taking the NOZOMI. On this route the slower train costs you about a quarter of an hour",
    source: `smart-ex.jp's own smartEX fare table, ${OWN}`,
  },
  {
    item: "Tokyo → Nagoya at the station window",
    price: `About ${yen(tokyoNagoya.fareYen)}`,
    covers: "Basic fare plus the reserved-seat limited express charge on a HIKARI — the train a JAPAN RAIL PASS covers without a supplement",
    source: `Our own JR fare dataset, as of ${FARE_AS_OF} — a rounded reference value, not an operator table`,
  },
  {
    item: "NOZOMI / MIZUHO ticket for pass holders",
    price: `${NOZOMI_TICKET} Tokyo or Shinagawa – Nagoya`,
    covers:
      'The special ticket a JAPAN RAIL PASS holder buys to ride a NOZOMI, each time. JR states "the same prices apply to Green Car tickets, reserved seat tickets in an ordinary car and non-reserved seat tickets in an ordinary car"',
    source: `japanrailpass.net, ${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS, Ordinary",
    price: `${JR_PASS_7} / ¥80,000 / ¥100,000 for 7 / 14 / 21 days online`,
    covers: "¥53,000, ¥84,000 and ¥105,000 as an Exchange Order from an overseas agency; Green Car is ¥70,000, ¥110,000 and ¥140,000 online and ¥74,000, ¥116,000 and ¥147,000 as an Exchange Order",
    source: `The JR Group's own price table, ${OWN}`,
  },
  {
    item: "KINTETSU RAIL PASS, for the Ise leg",
    price: `${KINTETSU_PASS_1} 1-day, ¥3,700 2-day, ¥4,900 5-day, ¥6,700 5-day Plus`,
    covers: "Kintetsu's own visitor pass, which is the network that runs from Kintetsu-Nagoya to Ise — a different railway from JR, so no JR pass touches it",
    source: `kintetsu.co.jp's English pass page, ${OWN}`,
  },
];

/** Which ticket, for which trip. */
const compareRows = [
  {
    option: "A single reserved NOZOMI ticket each way",
    cost: `${SMART_EX_NOZOMI} one way on smartEX`,
    gets: "The 1h 26m direct train, no transfer, and nothing else to buy or plan.",
    pick: "The default. Two singles are about ¥22,200 against ¥50,000 for a 7-day pass — a there-and-back trip to Nagoya does not come close to justifying the pass.",
  },
  {
    option: "JAPAN RAIL PASS, 7-day Ordinary, on the HIKARI",
    cost: `${JR_PASS_7} online`,
    gets: "Every JR line in the country, and a Tokyo–Nagoya run that is still direct — the HIKARI does not need a change here.",
    pick: "Only if the same week has Kyoto, Kanazawa, Hiroshima or Tohoku in it too. Nagoya is the one Tokaido city where the pass costs you almost no time, which makes it the best stopover on a pass itinerary.",
  },
  {
    option: "JAPAN RAIL PASS plus the NOZOMI ticket",
    cost: `${JR_PASS_7} plus ${NOZOMI_TICKET} each way`,
    gets: "The pass, and the fastest train on a leg where the HIKARI is only about fifteen minutes slower.",
    pick: "Rarely worth it here, and that is the honest answer — ¥4,180 for a quarter of an hour. Save the NOZOMI ticket for Tokyo–Hiroshima, where the gap is an hour and a quarter.",
  },
  {
    option: "Non-reserved Ordinary",
    cost: "Less than reserved; the saving is the reserved-seat charge",
    gets: "Walk up and board whichever train comes — except in the eight peak periods below, when every NOZOMI car is reserved.",
    pick: "Outside peak dates and travelling light. On a corridor with 451 departures a day this is a genuinely workable plan, which it is not on a route with thirty.",
  },
  {
    option: "Shoryudo Highway Bus Pass",
    cost: "Check the listing for your dates",
    gets: "Three or five days of foreign-visitor highway buses around the Chubu region out of Nagoya, airport access included.",
    pick: "Not for the Tokyo leg — this is the pass for what you do *after* you arrive, if the plan is Takayama, Shirakawa-go and Ise rather than one park and back.",
  },
  {
    option: "The day sold as a guided tour from Nagoya",
    cost: "Check the listing for your date",
    gets: "Shirakawa-go and the Takayama old town, or Ghibli Park with the Aichi Museum of Flight, in one booking.",
    pick: "Once the rail is settled. These are the days where the local connection — a Linimo change, or a reservation-only mountain bus — is the part worth handing to somebody else.",
  },
];

/** What Nagoya is actually the gateway to, and what each connection costs. */
const fromNagoyaRows = [
  {
    place: "Ghibli Park (Nagakute)",
    how: "Meitetsu direct bus from the Bus Center at Nagoya Station, or the Higashiyama subway line to Fujigaoka and the Linimo",
    time: "40 minutes by direct bus",
    cost: "¥1,200 adult / ¥600 child on the bus; the Linimo leg from Fujigaoka is ¥400 / ¥200",
    source: `Meitetsu Bus and Linimo's own sites, ${PARKS}`,
  },
  {
    place: "LEGOLAND® Japan (Kinjofuto)",
    how: "The Aonami Line from Nagoya Station — the same building the shinkansen arrives in",
    time: "24 minutes, 15.2 km",
    cost: "¥360 adult / ¥180 child",
    source: `aonamiline.co.jp, ${PARKS}`,
  },
  {
    place: "Takayama and Shirakawa-go",
    how: "Nohi Bus between the Meitetsu Bus Center at Nagoya Station and the Takayama Nohi Bus Center, or a guided day out of Nagoya Station",
    time: "2 hours 45 minutes to Takayama; the guided days are listed at about 11 hours round trip",
    cost: "Reservation required on the bus. Tour prices are on the listing",
    source: `nouhibus.co.jp, ${OWN}`,
  },
  {
    place: "Ise (Ise Jingu)",
    how: "Kintetsu from Kintetsu-Nagoya, which is a separate railway from JR and sits beside the JR station",
    time: "About 1h 15m — Kintetsu's own Shimakaze timetable runs 10:25 from Kintetsu-Nagoya to Iseshi at 11:40 and Ujiyamada at 11:42",
    cost: `No JR pass covers it. The KINTETSU RAIL PASS is ${KINTETSU_PASS_1} for one day`,
    source: `kintetsu.co.jp, ${OWN}`,
  },
  {
    place: "Kyoto, Osaka and the rest of the Tokaido",
    how: "Stay on the same platform and carry on west",
    time: "Nagoya sits roughly a third of the way along the Tokyo–Shin-Osaka line",
    cost: "Covered by the same ticket rules as this page",
    source: `This guide, ${OWN}`,
  },
];

const faqItems = [
  {
    q: "How long is the shinkansen from Tokyo to Nagoya?",
    a: `One hour twenty-six minutes, direct, on a NOZOMI. Klook's own rail page for the route gives the shortest departure as 1 hour 26 minutes, the average across the day as 2 hours 26 minutes, and states the route "features 0 transfer(s)"; read on ${OWN}. The spread between those two numbers is entirely about which train you board — a NOZOMI makes a handful of stops, a KODAMA makes all of them. The useful thing about this particular leg is that a JAPAN RAIL PASS barely changes the answer: the HIKARI also runs Tokyo to Nagoya straight through, and our own dataset puts it at about ${Math.floor(tokyoNagoya.minutes / 60)} hours ${tokyoNagoya.minutes % 60} minutes. That is a quarter of an hour, not the hour and a quarter a pass costs you on the run to Hiroshima.`,
  },
  {
    q: "How much is the Tokyo to Nagoya shinkansen?",
    a: `${SMART_EX_NOZOMI} one way for a reserved Ordinary seat on a NOZOMI, which is JR's own smartEX online price for one adult in the regular season, read on ${OWN}. The same official table prices the identical seat on a HIKARI, KODAMA, SAKURA or TSUBAME at ${SMART_EX_HIKARI} — ¥210 less for about fifteen minutes more. Two singles therefore come to roughly ¥22,200, which is the number to hold against the ${JR_PASS_7} a 7-day Ordinary JAPAN RAIL PASS costs online: the pass loses badly on this route alone. If you are buying at a station window rather than online, our own rounded reference figure for the HIKARI is ${yen(tokyoNagoya.fareYen)}, labelled as ours because JR Central does not publish the window fare as a static table.`,
  },
  {
    q: "Is Nagoya worth a stop?",
    a: "As a base, yes; as a sightseeing city, it depends what you came for. The honest case for Nagoya is that it is the only station from which four genuinely good days are each under three hours away: Ghibli Park is a 40-minute bus from the Bus Center in the station complex, LEGOLAND Japan is 24 minutes on the Aonami Line from the same building, Shirakawa-go and Takayama are a reservation-only mountain bus ride north, and Ise Jingu is about an hour and a quarter east on the Kintetsu network. None of those is reachable in a day from Tokyo without a lot of train. The city itself — the castle, Osu, the Toyota and SCMaglev museums — is a solid half-day rather than a reason to come. So the answer most trips land on is one or two nights in Nagoya built around one of those four days, rather than a stop on the way to Kyoto.",
  },
  {
    q: "Can I visit Ghibli Park as a day trip from Tokyo?",
    a: `Physically yes, and it is a long day. The shinkansen is 1h 26m each way and the Meitetsu direct bus from Nagoya Station is 40 minutes on the operator's own figure, so the travelling alone is about four and a half hours. The problem is not the distance, it is the ticket: Ghibli Park sells date- and time-specified passes, with a designated entry time for Ghibli's Grand Warehouse, and they go on sale two months ahead. Pair a 9 a.m. Warehouse slot with a shinkansen from Tokyo and you are leaving before 06:00. A night in Nagoya — or at one of the Nagakute hotels out by the Linimo — removes that problem entirely, which is why our Ghibli Park guide argues for it. Access figures read ${PARKS}, train figures ${OWN}.`,
  },
  {
    q: "Is the JR Pass worth it for Tokyo to Nagoya?",
    a: `Not for the round trip, no — but Nagoya is the best-value stop on a pass you are buying anyway. A 7-day Ordinary JAPAN RAIL PASS is ${JR_PASS_7} online and ¥53,000 as an Exchange Order from an overseas agency; two reserved singles to Nagoya and back are about ¥22,200 on JR's own smartEX price. Nothing about that arithmetic works. What does work is the time cost: because the HIKARI runs Tokyo to Nagoya through without a change, a pass holder here gives up roughly fifteen minutes, against an hour and a quarter on the Hiroshima run. So if you already hold a pass for Kyoto, Kanazawa or Hiroshima, adding Nagoya is nearly free. And the ${NOZOMI_TICKET} NOZOMI ticket, which is genuinely worth buying on the long legs, is the one thing you can safely skip here. All pass figures from japanrailpass.net, ${OWN}.`,
  },
  {
    q: "Do I need to reserve a seat?",
    a: `Usually no — this is the one Japanese intercity route where turning up works, with 451 departures on Klook's sample date — and on eight sets of dates absolutely yes. JR Central's own page lists the periods in which every NOZOMI car runs as a reserved car with no non-reserved section at all: ${nozomiAllReservedPeriods.join("; ")}. Through those windows JR Central states that trains other than the NOZOMI — the HIKARI, KODAMA, MIZUHO, SAKURA and TSUBAME — "will maintain standard non-reserved seating", so the slower train is the walk-up fallback. Reserved seats go on sale at 10:00 one month before the day the train leaves its originating station. If you hold a rail pass the reservation itself is free, so there is no reason not to make one. Read on ${OWN}.`,
  },
  {
    q: "What are the luggage rules on this train?",
    a: `A case whose three dimensions add up to more than 160 cm needs its own reserved seat, and arriving without one costs ¥1,000 including tax. JR Central's own luggage page defines oversized baggage as a total of three dimensions between 161 and 250 cm, requires it to go in the baggage space behind a seat with an oversized baggage area, and is explicit that the seat costs nothing extra: tickets are "the same price as reserved seats in ordinary cars and green cars". You ask for it at a ticket office, at a reserved-seat machine, or online by selecting the seat with a baggage area. Read on ${OWN}. Most airline-checked cases come in under 160 cm; it is ski bags, golf covers, oversized hold cases and bagged pushchairs that trip people up — and note that the baggage seats are reserved-car seats, so a non-reserved ticket is not a way around the rule.`,
  },
  {
    q: "Can I do Shirakawa-go and Takayama from Nagoya?",
    a: `Yes, and Nagoya is the usual starting point for it. Nohi Bus runs between the Meitetsu Bus Center at Nagoya Station and the Takayama Nohi Bus Center in 2 hours 45 minutes, reservation required, on its own published figure read ${OWN}. From Takayama, Shirakawa-go is a further bus. The reason most visitors book the guided version instead is that the day is two bus connections rather than one, and Klook's Nagoya departures are listed at about 11 hours with roughly two hours in Shirakawa-go and two in the Takayama old town — which is what the day actually looks like if you do it and come back the same night. Our Takayama and Shirakawa-go guide compares the Nagoya, Kanazawa and Takayama departures and carries the Nohi Bus and Hokuriku Railroad fares.`,
  },
  {
    q: "Is there a cheaper way from Tokyo to Nagoya?",
    a: `Yes, and the honest list is short. Overnight and daytime highway coaches run Tokyo to Nagoya for a fraction of ${SMART_EX_NOZOMI} and take roughly six hours; no JR pass covers them. On the rails, the cheap options are the non-reserved Ordinary seat, which saves you the reserved-seat charge, and the ¥210 you save by taking a HIKARI or KODAMA instead of the NOZOMI — plus the discounted advance products JR sells through smartEX and EX Reservation for specific trains and dates. Flying is not a serious option on this route: Chubu Centrair is nearly an hour from the city, which eats the whole advantage over a 1h 26m train. If price is the binding constraint, price the coach against the non-reserved shinkansen seat rather than against a reserved NOZOMI.`,
  },
  {
    q: "Which train should I take — Nozomi, Hikari or Kodama?",
    a: `NOZOMI if you are buying a ticket, HIKARI if you are holding a pass, and KODAMA only by accident. The NOZOMI is the fastest at 1h 26m and costs ${SMART_EX_NOZOMI} reserved; the HIKARI also runs through to Nagoya without a change, costs ${SMART_EX_HIKARI}, and takes about a quarter of an hour longer. The KODAMA stops at every station on the Tokaido line and is the reason Klook's average for the route is a full hour longer than its fastest departure — it is a local service in shinkansen clothing. The decision is really made by your ticket rather than your preference: a JAPAN RAIL PASS covers the HIKARI and the KODAMA but not the NOZOMI, and on this particular leg that restriction costs you very little.`,
  },
];

const TITLE = "Tokyo to Nagoya Shinkansen: Times, Fares, JR Pass";
const DESCRIPTION =
  "Tokyo to Nagoya Shinkansen: 1h26m direct on a Nozomi, ¥11,100 reserved on smartEX. A JR Pass covers the Hikari here, so it costs 15 minutes, not an hour.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/transport/tokyo-to-nagoya-shinkansen") },
});

export default function TokyoToNagoyaShinkansenPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/tokyo-to-nagoya-shinkansen" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/tokyo-to-nagoya-shinkansen" />
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
              route: "/guides/transport/tokyo-to-nagoya-shinkansen",
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
                  name: "Tokyo to Nagoya Shinkansen",
                  item: "https://www.japan-travel-kit.com/guides/transport/tokyo-to-nagoya-shinkansen",
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
          <span className={styles.breadCurrent}>Tokyo to Nagoya Shinkansen</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo to Nagoya Shinkansen:<br />Times, Fares and the JR Pass
          </h1>
          <p className={styles.heroSubtitle}>
            Ninety minutes, 451 trains a day — and the one Tokaido leg where a rail pass costs you a
            quarter of an hour instead of an hour and a quarter.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "smartEX & JR Group figures, dated", "Pass break-even included", "What Nagoya reaches"].map((t) => (
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
                <p className={styles.verdictStatValue}>1h 26m, no transfer</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Reserved Ordinary</p>
                <p className={styles.verdictStatValue}>{SMART_EX_NOZOMI} one way</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On a JR Pass (Hikari)</p>
                <p className={styles.verdictStatValue}>Covered, about 1h 40m</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Departures a day</p>
                <p className={styles.verdictStatValue}>451, 06:00–22:10</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>Tokyo to Nagoya Shinkansen</strong> takes{" "}
              <strong>1 hour 26 minutes</strong> on a direct NOZOMI — Klook&apos;s own rail page gives that
              as the shortest departure, with <strong>&ldquo;0 transfer(s)&rdquo;</strong> and{" "}
              <strong>451 trains</strong> on its sample date, from 06:00 to 22:10. A reserved Ordinary seat is{" "}
              <strong>{SMART_EX_NOZOMI}</strong> one way on JR&apos;s own smartEX price, or{" "}
              <strong>{SMART_EX_HIKARI}</strong> for the same seat on a HIKARI or KODAMA. The thing that makes
              this leg different from every other Tokaido run: a{" "}
              <strong>JAPAN RAIL PASS does not cover the NOZOMI, but the HIKARI goes straight through to
              Nagoya anyway</strong>, so a pass holder loses about <strong>fifteen minutes</strong> rather than
              the hour and a quarter the Hiroshima run costs — and the {NOZOMI_TICKET} NOZOMI ticket is the one
              you can safely skip. Two singles are roughly ¥22,200 against <strong>{JR_PASS_7}</strong> for a
              7-day pass, so a there-and-back trip does not justify a pass on its own. Nagoya earns the stop
              for what it reaches: Ghibli Park, LEGOLAND Japan, Shirakawa-go and Ise. Operator figures read on{" "}
              {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenTokyoNagoya.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo → Nagoya Tickets →
              </KlookLink>
              <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Ghibli Park Day Tour from Nagoya →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Nagoya Is the Easiest Tokaido Stop to Get Wrong</h2>
          <p className={styles.bodyText}>
            Because most people treat it as the city the Kyoto train passes through. On the timetable it is
            about a third of the way down the Tokaido Shinkansen from Tokyo to Shin-Osaka, which makes it the
            easiest long leg in Japan: <strong>1h 26m</strong> on a NOZOMI, no transfer, and more departures
            per day than most countries run in a week.
          </p>
          <p className={styles.bodyText}>
            The ticket decision is also the simplest on the whole line, and for a reason worth saying out
            loud. On every other Tokaido and Sanyo leg, a <strong>JAPAN RAIL PASS</strong> forces a choice
            between a supplement and a slower journey — the pass does not cover the NOZOMI. Tokyo to Nagoya is
            the exception: the <strong>HIKARI</strong> runs the route straight through, so the pass-eligible
            journey is still direct and only about fifteen minutes longer. The {NOZOMI_TICKET} NOZOMI ticket
            exists for this pair, and on this pair it is rarely worth buying.
          </p>
          <p className={styles.bodyText}>
            What is genuinely worth planning is the other end. Nagoya is not a sightseeing city so much as a
            junction with four good days hanging off it — Ghibli Park out on the Linimo, LEGOLAND Japan on the
            Aonami Line, Shirakawa-go and Takayama up the mountain road, and Ise Jingu on a railway JR passes
            do not touch. Every one of those has a connection with its own operator, its own fare and, in two
            cases, its own reservation rule. That is the part of this trip that rewards reading ahead, and it
            is what the rest of this page is about.
          </p>
        </section>

        {/* Route table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The train</span>
          <h2 className={styles.sectionTitle}>How Long Is the Shinkansen From Tokyo to Nagoya?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            One hour twenty-six minutes at the fastest, direct. Every figure below carries its source and the
            date it was read — including the row that explains why a pass holder&apos;s journey here is barely
            different from everybody else&apos;s.
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
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto</Link> is the same line forty minutes
            further on, and{" "}
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen">Tokyo to Hiroshima</Link> is the leg
            where the pass restriction actually hurts.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoNagoya.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Nagoya tickets →
            </KlookLink>
          </div>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Is the Tokyo to Nagoya Shinkansen?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {SMART_EX_NOZOMI} one way for a reserved Ordinary seat on a NOZOMI, and {SMART_EX_HIKARI} for the
            same seat on a HIKARI or KODAMA. Both are JR&apos;s own online prices, read off smart-ex.jp&apos;s
            published smartEX fare table on {OWN} — one adult, regular season. One honest caveat: JR Central
            does not publish the station-window fare as a static table, so the window row below is our own
            rounded reference value and is marked as such.
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
            Subject to change — confirm before buying. {fares.note} smartEX prices are the online figures and
            differ from the station-window price; peak and off-peak dates move the reserved-seat charge by a
            couple of hundred yen either way. No Klook price appears on this page: Klook answers automated
            reads of its product pages with an error, so no figure from it could be verified.
          </p>
        </section>

        {/* Pass comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for Tokyo to Nagoya?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Not on its own — two reserved singles are about ¥22,200 at JR&apos;s own smartEX price against{" "}
            {JR_PASS_7} for a 7-day Ordinary pass online, and ¥53,000 as an Exchange Order bought abroad. But
            Nagoya is the cheapest city on the line to <em>add</em> to a pass you already need, because it
            costs a pass holder almost no time.
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
            The rule JR writes down, in its own words: riding a NOZOMI or MIZUHO on a pass requires a special
            ticket sold only to JAPAN RAIL PASS holders, and &ldquo;the same prices apply to Green Car tickets,
            reserved seat tickets in an ordinary car and non-reserved seat tickets in an ordinary car&rdquo;.
            For Tokyo or Shinagawa to Nagoya that ticket is <strong>{NOZOMI_TICKET}</strong> — the cheapest of
            the six pairs JR prices, and the one most worth skipping. Our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> has the break-even worked against
            your own legs, and our{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa">Tokyo to Kanazawa guide</Link> covers the other
            Chubu approach, which reaches Shirakawa-go from the north instead.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 day) →
            </KlookLink>
            <KlookLink href={shoryudoHighwayBusPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shoryudo Highway Bus Pass →
            </KlookLink>
          </div>
        </section>

        {/* Reservations */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservations</span>
          <h2 className={styles.sectionTitle}>Do I Need to Reserve a Seat?</h2>
          <p className={styles.bodyText}>
            Most of the year, genuinely no. With 451 departures on Klook&apos;s sample date, this is the one
            Japanese intercity route where showing up at the gates and taking the next train is a reasonable
            plan rather than a gamble. On eight sets of dates, though, there is no choice: JR Central runs{" "}
            <strong>every NOZOMI car as a reserved car</strong> in the peak periods below, which means the fast
            train to Nagoya has no non-reserved section at all on those days. Read from JR Central&apos;s own
            page on {OWN}:
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
            The saving grace on this route is the HIKARI. JR Central states that through those same windows
            trains other than the NOZOMI — it names the HIKARI, KODAMA, MIZUHO, SAKURA and TSUBAME —{" "}
            &ldquo;will maintain standard non-reserved seating&rdquo;, and the HIKARI runs Tokyo to Nagoya
            through. So even in Golden Week there is a walk-up train; it just takes a quarter of an hour longer.
          </p>
          <p className={styles.bodyText}>
            If you do want a reservation, the window is the same whichever train you pick: reserved seats go on
            sale at <strong>10:00, one month before</strong> the day the train leaves its originating station —
            so a 1 April departure opens at 10:00 on 1 March. With a <strong>JAPAN RAIL PASS</strong> the seat
            reservation itself is free, which on this route means the whole thing costs you nothing at all.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoNagoya.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Pick a train and seat class →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        {/* What Nagoya reaches */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>From Nagoya</span>
          <h2 className={styles.sectionTitle}>Is Nagoya Worth a Stop?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            As a base, yes — and the case is this table rather than the city itself. Four days that are
            awkward or impossible from Tokyo are all straightforward from Nagoya Station, and two of the four
            connections leave from inside the same building the shinkansen arrives in.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "How you get there", "How long", "What it costs", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fromNagoyaRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.how}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two of these have a booking rule that matters more than the train. Ghibli Park sells date- and
            time-specified passes that go on sale two months ahead, with a designated entry time for Ghibli&apos;s
            Grand Warehouse — our{" "}
            <Link href="/guides/attractions/ghibli-park-tickets">Ghibli Park tickets guide</Link> has the
            calendar, the two pass tiers and the park&apos;s own prices. LEGOLAND Japan prices by date, which
            our{" "}
            <Link href="/guides/attractions/legoland-japan-tickets">LEGOLAND Japan tickets guide</Link>{" "}
            explains. And the mountain buses north are reservation-only on several services, which our{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go guide</Link>{" "}
            covers departure by departure.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Ghibli Park tickets →
            </KlookLink>
            <KlookLink href={legolandJapanTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              LEGOLAND® Japan tickets →
            </KlookLink>
          </div>
        </section>

        {/* Luggage */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Luggage</span>
          <h2 className={styles.sectionTitle}>What Are the Oversized Luggage Rules?</h2>
          <p className={styles.bodyText}>
            A bag whose three dimensions add up to <strong>more than 160 cm</strong> has to be booked in
            advance. JR Central&apos;s own luggage page defines oversized baggage as a total of three
            dimensions <strong>between 161 and 250 cm</strong>, and requires it to go in the baggage space
            behind a seat with an oversized baggage area. The seat costs nothing extra: JR states the tickets
            are &ldquo;the same price as reserved seats in ordinary cars and green cars&rdquo;.
          </p>
          <p className={styles.bodyText}>
            Turn up with an oversized bag and no reservation and there is a{" "}
            <strong>¥1,000 baggage fee, tax included</strong>. Read on {OWN}. You reserve it at a station
            ticket office, at a reserved-seat vending machine, or online by selecting the seat with a baggage
            area. In practice most airline-checked cases come in under 160 cm, so this is a rule about ski
            bags, golf travel covers, oversized hold cases and bagged pushchairs — and note that the baggage
            seats exist only in reserved cars, so a non-reserved ticket is not a way around the rule.
          </p>
        </section>

        {/* Day trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day trip or night</span>
          <h2 className={styles.sectionTitle}>Can I Visit Ghibli Park as a Day Trip From Tokyo?</h2>
          <p className={styles.bodyText}>
            You can, and the maths is tighter than it looks. The shinkansen is <strong>1h 26m</strong> each
            way and the Meitetsu direct bus from the Bus Center at Nagoya Station is{" "}
            <strong>40 minutes</strong> on the operator&apos;s own figure, so you are looking at about four and
            a half hours of travelling around whatever time you spend in the park.
          </p>
          <p className={styles.bodyText}>
            The real constraint is not distance but the ticket. Ghibli Park sells date- and time-specified
            passes with a designated entry time for Ghibli&apos;s Grand Warehouse, and the morning slots are
            the ones that go first. Pair a 9 a.m. Warehouse entry with a train from Tokyo and you are leaving
            before 06:00 — and the Meitetsu direct bus does not run on park closure days, which include
            Tuesdays. A night in Nagoya, or at one of the Nagakute hotels out by the Linimo, turns a
            before-dawn start into a normal morning.
          </p>
          <p className={styles.bodyText}>
            The same argument applies with more force to Shirakawa-go. That is a 2h45m reservation-required
            bus beyond Nagoya, which no same-day return from Tokyo survives in any useful form. If either of
            those two is the reason you are going, book the night — and if you would rather not plan the local
            legs at all, the guided days out of Nagoya Station exist precisely because the connections are the
            fiddly part.
          </p>
        </section>

        <KlookTourPicks
          heading="The Days Nagoya Is Actually For"
          intro="Four bookings, all starting at or near Nagoya Station: the guided Ghibli Park day that handles the Linimo for you, the bare park ticket, and the two Shirakawa-go and Takayama departures that turn a two-bus mountain day into one reservation. Open a listing for availability and the current price on your dates."
          tours={[
            ghibliParkNagoyaBusTour,
            takayamaShirakawagoNagoyaDayTrip,
            shirakawagoTakayamaOldTownDayTour,
            legolandJapanHotelPackage,
          ]}
        />

        <KlookStayAreas
          heading="Where to Stay If Nagoya Becomes a Night"
          intro="Two areas, and the choice follows straight from the table above: the station, if Nagoya is one stop inside a longer rail itinerary and the parks are day trips from it, or out by the Linimo, if the thing that brought you here is a 9 a.m. entry time at Ghibli's Grand Warehouse."
          areas={nagoyaParkStayAreas}
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
            Data, because every decision past Nagoya Station happens on a phone. The Ghibli Park pass is a QR
            code with an entry time on it; the Meitetsu bus and the Nohi Bus both have timetables you will
            want to check against your actual arrival; and the Linimo change at Fujigaoka is the kind of thing
            that is trivial with a map and tedious without one. An eSIM activated before you fly means all of
            that is a lookup rather than a guess.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it against the
            alternatives, and our{" "}
            <Link href="/guides/transport/ic-cards-japan">IC card guide</Link> covers tapping through the
            Nagoya subway, the Aonami Line and the Meitetsu gates once you are off the shinkansen.
          </p>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/ghibli-park-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c4 0 7 3 7 7 0 5-7 11-7 11S5 15 5 10c0-4 3-7 7-7z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Ghibli Park Tickets (2026): Prices, the Sale Date and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/legoland-japan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="9" width="16" height="10" rx="1.5" />
                  <path d="M8 9V7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2M14 9V7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>LEGOLAND Japan Tickets (2026): Prices by Date and What to Skip</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/takayama-shirakawago-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19h16M7 19l5-11 5 11" />
                  <path d="M9.5 14h5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Takayama &amp; Shirakawa-go Tour (2026): Which Departure, and What It Costs</p>
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
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M12 5v12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Hiroshima Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kanazawa" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kanazawa (2026): Kagayaki Times, Seats and Whether a Pass Pays</p>
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
            <h2 className={styles.ctaBannerTitle}>Ninety minutes, and then the decision that matters</h2>
            <p className={styles.ctaBannerDesc}>
              Book the NOZOMI if you are buying a ticket and the HIKARI if you are holding a pass — on this leg
              the difference is about fifteen minutes. Then settle the thing Nagoya is actually for: a Ghibli
              Park entry time, or a reservation on the bus north.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={shinkansenTokyoNagoya.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Tokyo → Nagoya Tickets →
              </KlookLink>
              <KlookLink href={takayamaShirakawagoNagoyaDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Shirakawa-go Day Tours →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
