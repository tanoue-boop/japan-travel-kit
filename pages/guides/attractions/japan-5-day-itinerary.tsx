import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookLink from "../../../components/KlookLink";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import fares from "../../../data/jr-fares.json";
import {
  hanedaLimousineBus,
  japanFiveDayPrep,
  japanFiveDayStayAreas,
  jrHarukaUrl,
  jrPassWholeJapan,
  keiseiSkylinerUrl,
  klookEsim,
  kyotoCityFushimiArashiyamaTour,
  kyotoFushimiInariWalkingTour,
  kyotoGionNightWalkingTour,
  naritaLimousineBus,
  shibuyaSkyTicketUrl,
  shinjukuNightFoodWalkingTour,
  shinkansenKyotoTokyo,
  shinkansenTokyoKyoto,
  teamlabPlanetsTicketUrl,
  tokyoSubwayTicket,
  tsukijiFoodCultureWalkingTour,
} from "../../../lib/klook-links";
import { gygShibuyaSky, gygTeamlabPlanets, type GygListing } from "../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { PRICES, checkedLabel } from "../../../lib/attraction-prices";

/**
 * Japan 5 Day Itinerary, written for the exact phrase. Added 5 Nov 2026 (task
 * jtk-20261105-01): Search Console had "japan itinerary 5 days" at 17 impressions and
 * position 19.76 over 28 days with no page built for it.
 *
 * Deliberately not tokyo-5-day-itinerary (one city, five days) and not
 * japan-first-time-itinerary (nine days). This page exists for the reader with five days
 * who wants both Tokyo and Kyoto, so it is built around the one long move, the single
 * Kyoto night and the flight out of Kansai, and it says so in the first paragraph.
 *
 * Read on 5 November 2026:
 *   japanrailpass.net/en/purchase/price/   7-day Ordinary ¥50,000 online, ¥53,000 Exchange
 *                                          Order; 14-day ¥80,000 / ¥84,000; 21-day ¥100,000
 *                                          / ¥105,000.
 *   smart-ex.jp/en/product/plan/service/   Sales open 5:30 one year before boarding; free
 *                                          changes before the gate; ¥320 refund fee before
 *                                          departure; regular fare less ¥200 off-peak, plus
 *                                          ¥200 peak, plus ¥400 top season.
 *
 * Carried from this site's earlier dated reads, each shown with its own date:
 *   lib/attraction-prices.ts               SHIBUYA SKY, teamLab Planets, Tokyo Subway Ticket.
 *   kyoto-2-day-itinerary (29 Oct 2026)    Kiyomizu-dera ¥500, 6:00 opening; kyoto.travel's
 *                                          10 / 25 / 35 minutes from Kyoto Station.
 *   tokyo-kyoto-osaka-7-day (25 Oct 2026)  "about 130 minutes" Tokyo–Kyoto, HARUKA ¥2,700 and
 *                                          about 80 minutes Kyoto–Kansai Airport.
 *
 * The Shinkansen and Narita Express fares are the reference values in data/jr-fares.json,
 * labelled as such. JR Central's fare table is a PDF that could not be machine-read on the
 * day, and the JR Pass verdict does not move for any plausible difference in them.
 *
 * Nothing here is first-hand and no Klook price appears: Klook answers automated reads
 * of its product pages with HTTP 403.
 */
const ROUTE = "/guides/attractions/japan-5-day-itinerary";
const SLUG = "japan-5-day-itinerary";
const CHECKED = checkedLabel("2026-11-05");
const RAIL_READ = checkedLabel("2026-10-25");
const KYOTO_READ = checkedLabel("2026-10-29");
const SENSOJI_READ = checkedLabel("2026-10-21");

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
const fare = (id: string) => fares.segments.find((s) => s.id === id)!.fareYen;
/** data/jr-fares.json carries its date as "2026-09". */
const FARE_AS_OF = new Date(`${fares.asOf}-01T00:00:00Z`).toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const SHINKANSEN = fare("tokyo-kyoto");
const NEX = fare("narita-tokyo");
/** HARUKA one-way ticket to Kyoto from 1 Nov 2026, adult, on westjr.co.jp. */
const HARUKA = 2700;
const PASS_ONLINE = 50000;
const PASS_ORDER = 53000;
const TOKYO_IN_KANSAI_OUT = NEX + SHINKANSEN + HARUKA;
const TOKYO_RETURN = (NEX + SHINKANSEN) * 2;

const SUBWAY_72 = 2000;
const SKY_SUNSET = 3400;
const TEAMLAB_FROM = 3800;
const KIYOMIZU = 500;
const TICKETS = SUBWAY_72 + SKY_SUNSET + TEAMLAB_FROM + KIYOMIZU;
const PLAN_TOTAL = TOKYO_IN_KANSAI_OUT + TICKETS;

type Stop = { time: string; place: string; allow: string; getting: string; booking: string };
type Pick = { label: string; url: string };
type Day = {
  n: number;
  heading: string;
  intro: ReactNode;
  stops: Stop[];
  book: ReactNode;
  picks: Pick[];
  gyg?: GygListing;
};

const days: Day[] = [
  {
    n: 1,
    heading: "Day 1 — Land in Tokyo, Check In, One Neighbourhood on Foot",
    intro:
      "Treat this as transport, check-in and one neighbourhood. Narita is about an hour from central Tokyo, so a morning landing gives you an afternoon and an evening landing gives you dinner. Either way, nothing that needs a ticket goes on this day.",
    stops: [
      { time: "On landing", place: "Immigration, baggage, phone online", allow: "1–1.5 hours", getting: "n/a", booking: "eSIM installed before you fly" },
      { time: "Afternoon", place: "Airport to your Tokyo hotel", allow: "40 minutes to 1.5 hours", getting: "Narita Express, Keisei Skyliner or limousine bus; Keikyu or the monorail from Haneda", booking: "Worth booking a seat" },
      { time: "Evening", place: "Your own neighbourhood: Omoide Yokocho from Shinjuku, Nakamise from Asakusa", allow: "2–3 hours", getting: "On foot", booking: "No" },
    ],
    book: (
      <>
        The airport leg, your data and the subway ticket, all before you fly. Our{" "}
        <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link> matches each
        Narita route to the side of the city you are staying on. The return half of a round-trip airport
        ticket is wasted on this plan, because you fly home from Kansai, so buy one way.
      </>
    ),
    picks: [
      { label: "Keisei Skyliner ticket →", url: keiseiSkylinerUrl },
      { label: "Narita limousine bus →", url: naritaLimousineBus.url },
      { label: "Haneda limousine bus →", url: hanedaLimousineBus.url },
      { label: "Tokyo Subway Ticket →", url: tokyoSubwayTicket.url },
      { label: "See Klook eSIM options →", url: klookEsim.url },
    ],
  },
  {
    n: 2,
    heading: "Day 2 — West Tokyo: Meiji Jingu, Harajuku, Shibuya and the Sunset Slot",
    intro:
      "Everything before the rooftop is free to walk into, which is why this day survives a slow start after a long flight. It sits here rather than on Day 3 because SHIBUYA SKY is the booking most likely to sell out, and if it does, Day 3's evening is still free to take a late slot.",
    stops: [
      { time: "Morning", place: "Meiji Jingu and the forest approach", allow: "1–1.5 hours", getting: "Chiyoda Line to Meiji-jingumae", booking: "No, it is free" },
      { time: "Late morning", place: "Takeshita Street, Omotesando and Cat Street, walking south", allow: "2 hours", getting: "On foot", booking: "No" },
      { time: "Afternoon", place: "Shibuya Crossing, Hachiko and the backstreets", allow: "1.5 hours", getting: "On foot down Cat Street", booking: "No" },
      { time: "Late afternoon", place: "SHIBUYA SKY", allow: "1–1.5 hours", getting: "Inside Shibuya Scramble Square, over the station", booking: "Yes, a timed slot" },
      { time: "Night", place: "Omoide Yokocho, Kabukicho and Golden Gai in Shinjuku", allow: "3 hours", getting: "Fukutoshin Line, Shibuya to Shinjuku-sanchome", booking: "Only if you take the food tour" },
    ],
    book: (
      <>
        The SHIBUYA SKY slot. Web tickets are ¥2,700 for entry before 15:00 and ¥3,400 from
        15:00, and a date opens at 00:00 Japan time two weeks ahead; our{" "}
        <Link href="/guides/attractions/shibuya-sky-tickets">Shibuya Sky tickets guide</Link> covers the
        bands. The night is the part a phone will not plan for you, so the guided Shinjuku food walk is the
        one tour worth adding here: Klook lists it at three hours, with three food stops and a Golden Gai
        drink.
      </>
    ),
    picks: [
      { label: "Shinjuku night food tour →", url: shinjukuNightFoodWalkingTour.url },
      { label: "Check Shibuya Sky tickets →", url: shibuyaSkyTicketUrl },
    ],
    gyg: gygShibuyaSky,
  },
  {
    n: 3,
    heading: "Day 3 — East Tokyo: Senso-ji Early, Tsukiji, then teamLab Planets",
    intro: (
      <>
        The old town first, then the bay. Senso-ji&apos;s main hall opens at 06:00, or 06:30 from October to
        March, on the temple&apos;s published hours read on {SENSOJI_READ}. An early start here buys the
        quiet that this temple does not have by mid-morning. Pack tonight: Day 4 is your only train.
      </>
    ),
    stops: [
      { time: "Early morning", place: "Senso-ji and Nakamise-dori, Asakusa", allow: "1.5 hours", getting: "Ginza Line or Toei Asakusa Line to Asakusa", booking: "No, it is free" },
      { time: "Late morning", place: "Tsukiji Outer Market, on foot with a guide or alone", allow: "3 hours on the tour below", getting: "Toei Asakusa Line, then Hibiya Line to Tsukiji", booking: "Only for the tour, which has an 11:00 departure" },
      { time: "Afternoon", place: "teamLab Planets TOKYO, Toyosu", allow: "2 hours", getting: "Yurakucho Line from Shintomicho to Toyosu, then Yurikamome to Shin-Toyosu", booking: "Required, a 30-minute entry slot" },
      { time: "Night", place: "Ginza or Tsukishima for dinner, then pack", allow: "2–3 hours", getting: "Yurakucho Line from Toyosu", booking: "No" },
    ],
    book: (
      <>
        teamLab Planets, without exception. The official store sells nothing on site, the adult price moves
        by date from {PRICES.teamlabPlanets.adult.replace("from ", "")}, and parts of it are walked barefoot through water, as
        our <Link href="/guides/attractions/teamlab-planets-tickets">teamLab Planets tickets guide</Link>{" "}
        explains. The Tsukiji walk is the optional part of the day: three hours, with 08:30 and 11:00
        departures from Tsukiji Hongan-ji as listed.
      </>
    ),
    picks: [
      { label: "Tsukiji food and culture walk →", url: tsukijiFoodCultureWalkingTour.url },
      { label: "teamLab Planets tickets →", url: teamlabPlanetsTicketUrl },
    ],
    gyg: gygTeamlabPlanets,
  },
  {
    n: 4,
    heading: "Day 4 — Tokyo to Kyoto by Shinkansen, Then Kiyomizu-dera and Gion",
    intro: (
      <>
        The spine of the trip. Tokyo to Kyoto on the Tokaido Shinkansen is about 130 minutes on JR
        Central&apos;s figure, read on {RAIL_READ}, so a 09:00 train still leaves you the whole afternoon in
        Kyoto. Hotel check-in is usually mid-afternoon, so hand your bags to the front desk on arrival.
      </>
    ),
    stops: [
      { time: "Morning", place: "Check out, Tokyo or Shinagawa Station, Tokaido Shinkansen", allow: "About 130 minutes on the train", getting: "Shinagawa is the quieter boarding station", booking: "A reserved seat, plus the oversized-baggage row for a large case" },
      { time: "Midday", place: "Arrive Kyoto Station, leave the bags at the hotel", allow: "1 hour", getting: "On foot if you stay at the station", booking: "One night in Kyoto" },
      { time: "Afternoon", place: "Kiyomizu-dera and the Sannenzaka and Ninenzaka lanes", allow: "2.5 hours", getting: "City Bus 100 or 206, about 35 minutes to the Higashiyama area", booking: "No, pay at the gate" },
      { time: "Night", place: "Gion lanes and Pontocho", allow: "3 hours", getting: "On foot downhill from Ninenzaka", booking: "Only for the guided walk" },
    ],
    book: (
      <>
        The seat first, then the Gion night walk, which Klook lists as a three-hour small-group evening
        through the backstreets and Hanamikoji; our{" "}
        <Link href="/guides/attractions/gion-night-walking-tour">Gion night walking tour guide</Link> covers
        which to pick. Kiyomizu-dera is ¥500 at the gate, read on {KYOTO_READ}.
      </>
    ),
    picks: [
      { label: "Tokyo → Kyoto shinkansen →", url: shinkansenTokyoKyoto.url },
      { label: "Gion night walking tour →", url: kyotoGionNightWalkingTour.url },
      { label: "Hotels around Kyoto Station →", url: japanFiveDayStayAreas[3].url },
    ],
  },
  {
    n: 5,
    heading: "Day 5 — Fushimi Inari at Dawn, Arashiyama, and the Train to Kansai Airport",
    intro:
      "Your last morning has the easiest start of the trip. Fushimi Inari is about 10 minutes from Kyoto Station on the Kyoto City tourism guide's figure, and it is free and open before the coaches arrive. Arashiyama fits if your flight leaves in the evening. If it leaves before about 16:00, stop after Fushimi Inari.",
    stops: [
      { time: "Early morning", place: "Fushimi Inari Taisha and the Senbon Torii gates", allow: "2 hours", getting: "JR Nara Line from Kyoto Station, about 10 minutes", booking: "No, it is free" },
      { time: "Late morning", place: "Arashiyama: the bamboo grove and Togetsukyo Bridge", allow: "2.5 hours", getting: "JR Sagano Line from Kyoto Station, about 25 minutes to Saga-Arashiyama", booking: "No" },
      { time: "Afternoon", place: "Back to Kyoto Station, collect the bags", allow: "1 hour", getting: "JR Sagano Line", booking: "No" },
      { time: "Late afternoon", place: "JR Haruka to Kansai Airport", allow: "About 80 minutes", getting: "From Kyoto Station", booking: "Worth buying ahead" },
    ],
    book: (
      <>
        Your exit. The Haruka one-way ticket to Kyoto is {yen(HARUKA)} for an adult from 1 November 2026,
        read off JR West on {RAIL_READ}. If you fly home from Tokyo instead, take the shinkansen back and
        allow the 130 minutes plus the airport run; that trade is in the table at the top. If you would
        rather hand the morning to a guide, Klook lists a full-day tour of Fushimi Inari, Arashiyama and
        Kiyomizu-dera leaving from the Hachijo side of Kyoto Station.
      </>
    ),
    picks: [
      { label: "Fushimi Inari walking tour →", url: kyotoFushimiInariWalkingTour.url },
      { label: "Kyoto one-day guided tour →", url: kyotoCityFushimiArashiyamaTour.url },
      { label: "JR Haruka ticket →", url: jrHarukaUrl },
      { label: "Kyoto → Tokyo shinkansen →", url: shinkansenKyotoTokyo.url },
    ],
  },
];

/** The three ways to cut five days. */
const splitRows = [
  {
    split: "Tokyo 3 nights, Kyoto 1 (this plan)",
    fly: "Into Tokyo, out of Kansai",
    days: "Days 1–3 Tokyo, Days 4–5 Kyoto",
    best: "A first trip that wants Tokyo's rooftops and teamLab as well as Kyoto's temples",
  },
  {
    split: "Tokyo 2 nights, Kyoto 2",
    fly: "Into Tokyo, out of Kansai",
    days: "Move on Day 3 instead of Day 4, drop the Day 3 table",
    best: "Temples over city: a slower Kyoto, at the cost of Asakusa and teamLab",
  },
  {
    split: "Tokyo 3 nights, Kyoto 1, back to Tokyo",
    fly: "Into and out of Tokyo",
    days: "As this plan, but Day 5 ends on the shinkansen",
    best: "A return ticket you cannot change. It costs you Arashiyama and the fare in the table below",
  },
];

const dayRows = [
  { day: "Day 1", am: "Land, immigration", pm: "Airport to hotel", night: "Your neighbourhood", klook: "Airport ticket, eSIM" },
  { day: "Day 2", am: "Meiji Jingu, Harajuku", pm: "Shibuya, SHIBUYA SKY", night: "Shinjuku alleys", klook: "SHIBUYA SKY, food tour" },
  { day: "Day 3", am: "Senso-ji, Tsukiji", pm: "teamLab Planets", night: "Ginza, pack", klook: "teamLab, Tsukiji walk" },
  { day: "Day 4", am: "Shinkansen to Kyoto", pm: "Kiyomizu-dera", night: "Gion, Pontocho", klook: "Shinkansen, Gion walk, hotel" },
  { day: "Day 5", am: "Fushimi Inari", pm: "Arashiyama, Haruka", night: "Fly home", klook: "Haruka, Fushimi Inari walk" },
];

/** Checklist: what fills, and when the window opens. */
const checklistRows = [
  {
    item: "SHIBUYA SKY (Day 2)",
    opens: "00:00 Japan time, exactly two weeks ahead",
    fills: "Sunset slots go first, so book at that moment",
    source: `Operator's release, read ${checkedLabel(PRICES.shibuyaSky.checked)}`,
  },
  {
    item: "teamLab Planets (Day 3)",
    opens: "On the official store and Klook, by date",
    fills: "Popular times sell out 2–3 weeks ahead, weekends and holidays first",
    source: `Official store, read ${checkedLabel(PRICES.teamlabPlanets.checked)}`,
  },
  {
    item: "Shinkansen seat (Day 4)",
    opens: "smartEX opens 5:30, one year before boarding",
    fills: "Reserve the oversized-baggage row early if you have a large case, as those rows are limited",
    source: `smart-ex.jp, read ${CHECKED}`,
  },
  {
    item: "Hotels (Tokyo 3 nights, Kyoto 1)",
    opens: "Book as soon as your flights are fixed",
    fills: "Cherry-blossom and autumn-leaf weeks in Kyoto are the first to tighten; no hotel price is listed here",
    source: "Klook hotel search, by area",
  },
  {
    item: "eSIM",
    opens: "Any time before you fly",
    fills: "It does not sell out, but install it at home while you have Wi-Fi",
    source: "Klook eSIM listing",
  },
];

const costRows = [
  { item: "Narita Express, Narita → Tokyo", price: yen(NEX), source: `Reference fare, ${FARE_AS_OF}` },
  { item: "Tokaido Shinkansen, Tokyo → Kyoto, reserved seat", price: yen(SHINKANSEN), source: `Reference fare, ${FARE_AS_OF}` },
  { item: "HARUKA, Kyoto → Kansai Airport", price: yen(HARUKA), source: `westjr.co.jp, ${RAIL_READ}` },
  { item: "Tokyo Subway Ticket, 72 hours", price: yen(SUBWAY_72), source: `tokyometro.jp, ${checkedLabel(PRICES.tokyoSubwayTicket.checked)}` },
  { item: "SHIBUYA SKY, entry from 15:00", price: yen(SKY_SUNSET), source: `Operator, ${checkedLabel(PRICES.shibuyaSky.checked)}` },
  { item: "teamLab Planets TOKYO", price: `from ${yen(TEAMLAB_FROM)}`, source: `Official store, ${checkedLabel(PRICES.teamlabPlanets.checked)}` },
  { item: "Kiyomizu-dera", price: yen(KIYOMIZU), source: `kiyomizudera.or.jp, ${KYOTO_READ}` },
  { item: "Meiji Jingu, Senso-ji, Fushimi Inari", price: "Free", source: "No ticket of any kind" },
  { item: "Total per adult, before hotels and food", price: `from ${yen(PLAN_TOTAL)}`, source: "Sum of the rows above" },
];

const passRows = [
  { route: "Tokyo in, Kansai out (this plan)", singles: yen(TOKYO_IN_KANSAI_OUT), online: yen(PASS_ONLINE - TOKYO_IN_KANSAI_OUT), order: yen(PASS_ORDER - TOKYO_IN_KANSAI_OUT) },
  { route: "Tokyo in and out, Kyoto and back", singles: yen(TOKYO_RETURN), online: yen(PASS_ONLINE - TOKYO_RETURN), order: yen(PASS_ORDER - TOKYO_RETURN) },
];

const faqItems = [
  {
    q: "Is 5 days enough for Japan?",
    a: `Yes, for two cities. Five days covers Tokyo and Kyoto properly on a first trip, because the Tokaido Shinkansen joins them in about 130 minutes and most of what you came for is walk-in. It is not enough for a third base: every extra city takes a morning of packing and a transfer. Add Osaka and you are on our 7-day route instead.`,
  },
  {
    q: "Should I do Tokyo and Kyoto in 5 days?",
    a: `Yes, if you can fly into Tokyo and out of Kansai, because you never retrace the route. Three nights in Tokyo and one in Kyoto gives you Days 1 to 3 in Tokyo and Days 4 and 5 in Kyoto. If you must fly home from Tokyo, it still works, but Day 5 ends on the shinkansen and you lose Arashiyama.`,
  },
  {
    q: "Do I need a JR Pass for 5 days in Japan?",
    a: `No. A 7-day Ordinary pass is ¥50,000 bought online or ¥53,000 as an overseas Exchange Order, read off japanrailpass.net on ${CHECKED}, and there is no shorter whole-country pass. This plan's three JR rides total about ${yen(TOKYO_IN_KANSAI_OUT)}, and even a Tokyo–Kyoto return with both Narita trains is about ${yen(TOKYO_RETURN)}. The pass also does not cover the Nozomi without a supplementary ticket. Buy single tickets.`,
  },
  {
    q: "How much does a 5-day trip to Japan cost?",
    a: `The transport and tickets on this plan come to from ${yen(PLAN_TOTAL)} per adult, before hotels and food. That is ${yen(TOKYO_IN_KANSAI_OUT)} of trains and ${yen(TICKETS)} of tickets, each dated in the table on this page. No hotel or food average is given here, because those move by season and party size; our Japan travel budget guide works through them.`,
  },
  {
    q: "Where should I stay for 5 days in Japan?",
    a: `Three nights at one Tokyo address and one night beside Kyoto Station. In Tokyo, Tokyo Station or Marunouchi puts the Day 4 train under your hotel, Shinjuku suits evenings, and Ueno or Asakusa suits the Skyliner and the Day 3 early start. In Kyoto, one night makes Kyoto Station the only sensible choice, since the shinkansen, the Fushimi Inari train and the Haruka all use it.`,
  },
  {
    q: "What should I book before a 5-day trip to Japan?",
    a: `Five things: the SHIBUYA SKY slot (dates open 00:00 Japan time two weeks ahead), teamLab Planets (popular times sell out 2–3 weeks ahead), the Day 4 shinkansen seat, your hotels and an eSIM. Everything else on this plan is walk-in, including every temple and shrine.`,
  },
  {
    q: "How is this different from a Tokyo 5-day itinerary?",
    a: `This page splits the five days between Tokyo and Kyoto. Our Tokyo 5-day itinerary stays in one hotel in Tokyo and uses day trips to Kawaguchiko and Kamakura, and our first-time Japan itinerary spreads Tokyo, Kyoto and Osaka over nine days.`,
  },
  {
    q: "Can I do this 5-day Japan itinerary with kids?",
    a: `Yes, with fewer stops a day rather than fewer days. Keep the timed ticket in the morning and drop the night tours. Children aged 6 to 12 at SHIBUYA SKY pay ¥1,200 at the counter, not online, and teamLab Planets is ${PRICES.teamlabPlanets.child} for ages 4 to 12. The shinkansen move is the easy part, with a seat each and room for the cases.`,
  },
  {
    q: "What if it rains on a 5-day Japan trip?",
    a: `Swap the order within the city. teamLab Planets is indoors, so Day 3 works in any weather. Rain hurts SHIBUYA SKY most, because the open-air rooftop can close in high wind, lightning or heavy rain; Klook's listing states free cancellation up to 24 hours before. In Kyoto, Fushimi Inari has no ticket to lose, so it can move to whichever morning is drier.`,
  },
];

const TITLE = "Japan 5 Day Itinerary: Tokyo and Kyoto, Day by Day (2026)";
const DESCRIPTION =
  "Japan 5 Day Itinerary for a first trip: Tokyo on Days 1–3, Kyoto on Days 4–5, with a table for each day, what to book, where to stay and JR Pass maths.";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 };

export default function Japan5DayItineraryPage({ updated }: { updated: PageUpdated }) {
  const url = `https://www.japan-travel-kit.com${ROUTE}`;
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={url} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={url} />
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }) }}
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
                { "@type": "ListItem", position: 4, name: "Japan 5 Day Itinerary", item: url },
              ],
            }),
          }}
        />
      </Head>

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
          <span className={styles.breadCurrent}>Japan 5 Day Itinerary</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan 5 Day Itinerary:<br />Tokyo and Kyoto, Day by Day
          </h1>
          <p className={styles.heroSubtitle}>
            Three nights in Tokyo, one in Kyoto, out from Kansai: what to do each day and what to book for it.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "A table for every day", "JR Pass maths", "What to book, and when"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links. We may earn a
            small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            This <strong>Japan 5 day itinerary</strong> is Tokyo and Kyoto, not one city: Days 1 to 3 in Tokyo
            on three hotel nights, then the <strong>130-minute</strong> Tokaido Shinkansen on Day 4 and Days 4
            and 5 in Kyoto on one night, flying home from Kansai Airport, about 80 minutes from Kyoto Station
            by Haruka. Transport and tickets come to <strong>from {yen(PLAN_TOTAL)}</strong> per adult before
            hotels and food, and a JR Pass does not pay for itself. If you want five days in one city, read
            our{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>Tokyo 5-day itinerary</Link>;
            if you have nine, our{" "}
            <Link href="/guides/attractions/japan-first-time-itinerary" style={linkStyle}>first-time Japan itinerary</Link>{" "}
            adds Osaka and two day trips.
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Route</p>
                <p className={styles.verdictStatValue}>Tokyo 3 nights, Kyoto 1</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Long train</p>
                <p className={styles.verdictStatValue}>One, about 130 minutes</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass?</p>
                <p className={styles.verdictStatValue}>No, buy single tickets</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book first</p>
                <p className={styles.verdictStatValue}>teamLab, SHIBUYA SKY, hotels</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book the hotels and the shinkansen seat as soon as your flights are
              fixed, teamLab Planets 2–3 weeks out, and SHIBUYA SKY the moment your date opens two weeks ahead.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo → Kyoto shinkansen →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At a glance</span>
          <h2 className={styles.sectionTitle}>What Does a 5-Day Japan Itinerary Look Like?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Two and a half days in Tokyo and a day and a half in Kyoto, with one train between them. Each day
            has its own table below; this is the whole trip on one screen.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Day", "Morning", "Afternoon", "Night", "Book on Klook"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayRows.map((row) => (
                    <tr key={row.day}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.day}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.am}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pm}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.night}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.klook}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The route</span>
          <h2 className={styles.sectionTitle}>Should You Do Tokyo and Kyoto in 5 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, and the decision that matters is your flight home. Flying out of Kansai saves you going back
            the way you came, which is worth more than almost any sight on a five-day trip.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Split", "Flights", "Days", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {splitRows.map((row) => (
                    <tr key={row.split}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.split}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fly}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.days}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Before you fly</span>
          <h2 className={styles.sectionTitle}>What Should You Book Before a 5-Day Trip to Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Five things, and only two of them can actually sell out on you. The rest of this plan is walk-in.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Booking", "When it opens", "When it fills", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {checklistRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.opens}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fills}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <KlookTripPrep
          heading="What to Book on Klook Before You Fly"
          intro="SHIBUYA SKY and teamLab sit in the day sections below. These are the bookings that hold the rest of the five days together, in the order worth making them."
          items={japanFiveDayPrep}
        />

        {days.map((day) => (
          <section key={day.n} className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>Day {day.n}</span>
            <h2 className={styles.sectionTitle}>{day.heading}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{day.intro}</p>
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
                    {day.stops.map((row) => (
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
            <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
              <strong>What to book for Day {day.n}.</strong> {day.book}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              {day.picks.map((pick) => (
                <KlookLink key={pick.url} href={pick.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                  {pick.label}
                </KlookLink>
              ))}
              {day.gyg ? <GygCompareButton slug={SLUG} listing={day.gyg} /> : null}
            </div>
          </section>
        ))}

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          The &ldquo;time to allow&rdquo; column in all five tables is our own planning allowance, not an operator
          figure. Kyoto journey times are the Kyoto City tourism guide&apos;s, read on {KYOTO_READ}.
        </p>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Rail pass</span>
          <h2 className={styles.sectionTitle}>Do You Need a JR Pass for 5 Days in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            No. There is no whole-country pass shorter than seven days, and at ¥50,000 online or ¥53,000 as an
            overseas Exchange Order, it costs far more than this route does in single tickets, whichever way
            you fly home.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Single tickets", "Extra with a ¥50,000 pass", "Extra with a ¥53,000 pass"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td className={styles.tdPrice}>{row.singles}</td>
                      <td className={styles.tdPrice}>{row.online}</td>
                      <td className={styles.tdPrice}>{row.order}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Pass prices read off japanrailpass.net on {CHECKED}. Single tickets: this plan is Narita Express,
            shinkansen and Haruka; the return is Narita Express and shinkansen, both ways. The shinkansen and
            Narita Express fares are this site&apos;s rounded regular-season reference fares ({FARE_AS_OF}), so
            confirm yours at booking: smartEX states ¥200 less off-peak, ¥200 more at peak and ¥400 more in top
            season. The pass also does not cover the Nozomi without a supplementary ticket. Our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>JR Pass guide</Link>{" "}
            works the break-even for longer trips, and{" "}
            <Link href="/guides/transport/tokyo-to-kyoto" style={{ color: "var(--text)", fontWeight: 600 }}>Tokyo to Kyoto</Link>{" "}
            compares the train with the bus.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kyoto shinkansen on Klook →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Longer trip? JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>How Much Does a 5-Day Trip to Japan Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            From {yen(PLAN_TOTAL)} per adult for the transport and tickets on this plan, before hotels and
            food. Every row carries its source and date; flights, hotels and meals are in our{" "}
            <Link href="/guides/money/japan-travel-budget" style={linkStyle}>Japan travel budget guide</Link>,
            because a made-up average would be worse than none.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Adult price", "Source and date read"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <KlookStayAreas
          heading="Where Should You Stay for 5 Days in Japan?"
          intro="Three nights at one Tokyo address, then one beside Kyoto Station. Four nights on two hotel bills is what makes five days feel unhurried. Pick the Tokyo base by the day it helps most; in Kyoto, the single night settles it."
          areas={japanFiveDayStayAreas}
        />

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
          heading="Guided Tours That Fit These Five Days"
          intro="Two evenings and a morning on this plan are better with someone who knows the alleys. All three are booked on the same Klook account as your tickets."
          tours={[shinjukuNightFoodWalkingTour, kyotoGionNightWalkingTour, kyotoFushimiInariWalkingTour]}
        />

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/tokyo-5-day-itinerary", title: "Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day" },
              { href: "/guides/attractions/japan-first-time-itinerary", title: "First Time Japan Itinerary (2026): 9 Days, Day by Day" },
              { href: "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary", title: "Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan, Day by Day" },
              { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan Itinerary 10 Days (2026): 10 Days in Japan, Day by Day" },
              { href: "/guides/attractions/where-to-stay-in-kyoto", title: "Where to Stay in Kyoto" },
              { href: "/guides/money/japan-travel-budget", title: "Japan Travel Budget" },
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

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Fix the one train first</h2>
            <p className={styles.ctaBannerDesc}>
              Everything on this plan hangs off the Day 4 shinkansen. Reserve that seat, then book the rest around it.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check Tokyo → Kyoto Shinkansen →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
