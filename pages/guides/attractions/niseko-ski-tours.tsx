import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import WinterBookingTop from "../../../components/WinterBookingTop";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  hokkaidoPrivateCarCharterNiseko,
  japanWinterStayAreas,
  jrHokkaidoRailPass,
  klookEsim,
  newChitoseAirportTransfers,
  nisekoHirafuEnglishSkiLesson,
  nisekoHirafuLiftPassBusTour,
  nisekoResortShuttleBus,
  nisekoRusutsuKiroroPrivateLesson,
  nisekoSkiHotSpringTourFromSapporo,
  nisekoSkiSnowboardRental,
  noboribetsuToyaNisekoDayTour,
  rhythmNisekoPrivateSkiLesson,
  type KlookTripPrepItem,
} from "../../../lib/klook-links";

/**
 * Niseko as the thing you book rather than the place you read about, written
 * for the reader searching "Niseko Ski Tours". Added 1 Nov 2026 — four weeks
 * before the lifts open on 28 November 2026, and seven before the peak season
 * that starts on Christmas Eve, which is the window in which this trip is
 * actually decided.
 *
 * The page exists because the search term hides three different questions. Some
 * readers want a guided day out of Sapporo and will never sleep at the resort.
 * Some want the airport transfer and a lesson, and the word "tour" is just how
 * they said it. And some want to know whether Niseko is worth the two and a half
 * hours from the airport at all. So the page answers the access, the season and
 * the four areas first, then splits the booking decision explicitly.
 *
 * How it differs from the Hokkaido pages already on this site.
 * sapporo-snow-festival-tours is one February week in the city;
 * hokkaido-7-day-itinerary routes a whole island and deliberately skips the ski
 * version; otaru-day-trip-from-sapporo is a ¥800 train ride. This is the resort
 * itself, with Niseko United's own pass prices and the one published deadline on
 * the trip — the peak-season lesson booking rule.
 *
 * Sources, all read 1 November 2026.
 *
 *   niseko.ne.jp/en/lift/      Niseko United's own All Mountain Pass page. The
 *                              four areas: Niseko Annupuri International Ski
 *                              Area, Niseko Village Ski Resort, Niseko Tokyu
 *                              Grand HIRAFU, Niseko Hanazono Resort. All four
 *                              open 28 Nov 2026; Annupuri and Grand HIRAFU run
 *                              to 5 May 2027, Hanazono to 11 Apr 2027, Village
 *                              to 4 Apr 2027. Night skiing 12 Dec 2026 –
 *                              22 Mar 2027. Five price periods: Early 28 Nov –
 *                              11 Dec 2026 (not sold online), Regular 12–23 Dec
 *                              2026 and 1–22 Mar 2027, Peak 24 Dec 2026 –
 *                              28 Feb 2027, Spring 23 Mar – 4 Apr 2027, Final
 *                              5 Apr – 5 May 2027. One-day adult / youth 13-15 /
 *                              child 4-12 / senior 65+: Early and Spring ¥8,800 /
 *                              ¥7,500 / ¥5,300 / ¥7,500; Regular ¥12,600 /
 *                              ¥10,700 / ¥7,600 / ¥10,700; Peak ¥13,500 /
 *                              ¥11,500 / ¥8,100 / ¥11,500; Final ¥6,300 /
 *                              ¥5,400 / ¥3,800 / ¥5,400.
 *   niseko.ne.jp/en/niseko/    Niseko United's own "Getting to Niseko" page,
 *     getting-to-niseko/       from New Chitose Airport: direct bus 2.5 hrs
 *                              ¥6,000, booking required; train plus local bus
 *                              3 hrs ¥6,200, no booking; rental car 2 hrs from
 *                              ¥8,000/day; private transfer 2 hrs from ¥25,000;
 *                              seasonal ski bus 3–3.5 hrs ¥6,000, December to
 *                              March only.
 *   niseko.ne.jp/en/news/      Niseko United's own month-by-month: December is
 *     which-month-in-winter-   the locals' pick with quiet lifts and pre-holiday
 *     is-best-to-visit-niseko/ rates; January is "Japanuary", "one of the most
 *                              consistent places in the world for snowfall" and
 *                              crowded with it; February is peak powder with
 *                              Lunar New Year crowds and buildings "almost
 *                              buried"; March brings "sunnier skies and more
 *                              mild temperatures", spring discounts on lessons
 *                              and rental, and "the best month for backcountry";
 *                              April into early May is spring skiing through
 *                              Golden Week at reduced rates.
 *   en.grand-hirafu.jp/snow/   Grand Hirafu's own snow and terrain figures.
 *     discover/                Cumulative monthly snowfall for the most recent
 *                              completed season, measured on the Shirakaba
 *                              Course at about 850 m: December 386 cm, January
 *                              620 cm, February 263 cm, March 75 cm. Maximum
 *                              snow depth base/summit by month: Dec 75/210,
 *                              Jan 175/380, Feb 170/400, Mar 110/380, Apr
 *                              55/315, May 0/170 cm. Terrain: 22 courses — 9
 *                              beginner, 6 intermediate, 7 advanced — 2 gondolas
 *                              and 7 chairlifts, 940 m vertical, 135 ha, 1,200 m
 *                              top and 260 m base, 5,300 m longest run, 40°
 *                              steepest.
 *   hanazononiseko.com/en/     The resort-operated Niseko International
 *     winter/ski-school        Snowsports School (NISS), running since 2004:
 *                              operating 28 Nov 2026 – 11 Apr 2027 (tentative),
 *                              group, private and DIAMOND X PRO lessons, 2026-27
 *                              bookings open, and the sentence this page is built
 *                              around — "During peak season, only full-day
 *                              lessons are available for advance booking."
 *
 * Re-read on 6 November 2026 for the winter booking pass (task jtk-20261106-A21).
 * niseko.ne.jp/en/lift/ and getting-to-niseko/: all dates, price periods, pass
 * prices and access figures unchanged. The page's 2026-27 one-day table labels no
 * period on the ¥6,300 row; it is read as Final by elimination. On the access page
 * the seasonal ski bus sits in the block for connecting flights via Narita or
 * Haneda rather than in the direct New Chitose block, but it is still a bus from
 * New Chitose, so the row stands.
 *
 *   hanazononiseko.com/en/     The correction that pass made. The school's own
 *     winter/ski-school/       peak is not Niseko United's lift-pass peak: Peak 14
 *     private                  Dec 2026 – 3 Jan 2027 and 6–12 Feb 2027; Regular
 *                              8–13 Dec, 4 Jan – 5 Feb and 13–28 Feb; Early/Spring
 *                              28 Nov – 7 Dec and 1 Mar – 11 Apr. Private rates per
 *                              group of up to 6, peak / regular / early-spring:
 *                              Niseko Classic 6 hours ¥120,000 / ¥93,000 / ¥87,000;
 *                              AM ¥93,000 / ¥71,000 / ¥59,000; PM ¥55,000 / ¥43,000
 *                              / ¥43,000. This page used to read the full-day rule
 *                              against 24 Dec – 28 Feb, which was wrong.
 *
 * What is deliberately absent. No accommodation prices. No Klook price in the
 * body, because Klook answers automated reads of its product pages with HTTP 403;
 * the WinterBookingTop block carries the one indexed from-price, dated. And no
 * claim about how early any particular week sells out: Niseko United says in its
 * own words that popular properties and peak holiday periods sell out early, and
 * that is as far as the sourcing goes, so that is as far as this page goes.
 *
 * Also changed in that pass: `nisekoPrivateOneDayTour` (90084) left the page, since
 * the index shows a green-season tour for summer and autumn, and 12479 gave way to
 * Klook's New Chitose transfer page, since its indexed text is a Tomamu route.
 *
 * Nothing here is first-hand.
 */

const OWN_ISO = "2026-11-01";
const OWN = checkedLabel(OWN_ISO);

/** The winter pass's re-reads of the official sites and of Klook's index. */
const SEASON_ISO = "2026-11-06";
const SEASON = checkedLabel(SEASON_ISO);

/** The resort school's own peak, which is not the lift-pass peak below. */
const LESSON_PEAK = "14 December 2026 to 3 January 2027 and 6 to 12 February 2027";

const AIRPORT_BUS = "2.5 hours";
const AIRPORT_BUS_FARE = "¥6,000";
const AIRPORT_TRAIN = "3 hours";
const AIRPORT_TRAIN_FARE = "¥6,200";
const SEASON_OPEN = "28 November 2026";
const PEAK_FROM = "24 December 2026";
const PEAK_TO = "28 February 2027";
const PEAK_DAY = "¥13,500";
const REGULAR_DAY = "¥12,600";
const EARLY_DAY = "¥8,800";

/** Getting there, on Niseko United's own published figures. */
const accessRows = [
  {
    option: "Direct bus from New Chitose Airport",
    time: AIRPORT_BUS,
    cost: AIRPORT_BUS_FARE,
    booking: "Booking required",
    note: `The default for a first trip and the one that takes ski bags. Niseko United's own figure. Because it needs booking, it is a before-you-fly decision — there is no walk-up version of this option. Read ${OWN}.`,
  },
  {
    option: "Train plus local bus",
    time: AIRPORT_TRAIN,
    cost: AIRPORT_TRAIN_FARE,
    booking: "No booking required",
    note: "Half an hour slower and ¥200 more than the coach, and it is the only option you can simply turn up for — which is exactly what it is for. The reason to avoid it is the luggage: a change with ski bags on a winter platform is the part nobody plans for.",
  },
  {
    option: "Seasonal ski bus",
    time: "3 to 3.5 hours",
    cost: AIRPORT_BUS_FARE,
    booking: "Booking required; December to March only",
    note: "Same fare as the direct coach and up to an hour longer, because it serves resort stops along the way. Useful if your accommodation is on its route and not otherwise.",
  },
  {
    option: "Rental car",
    time: "2 hours",
    cost: "From ¥8,000 per day",
    booking: "Booking required",
    note: "The fastest published option and the one with a condition attached: this is a Hokkaido winter road, and if you have not driven on snow and ice before, the two hours is not the relevant number.",
  },
  {
    option: "Private transfer",
    time: "2 hours",
    cost: "From ¥25,000",
    booking: "Booking required",
    note: "Per vehicle rather than per person, which is what makes it rational for a family or a group of four or more rather than extravagant. Also the only option that leaves when your flight actually lands.",
  },
];

/** The season, exactly as Niseko United publishes it. */
const seasonRows = [
  { what: "All four areas open", detail: `${SEASON_OPEN}` },
  { what: "Grand HIRAFU & Annupuri close", detail: "5 May 2027" },
  { what: "Hanazono closes", detail: "11 April 2027" },
  { what: "Niseko Village closes", detail: "4 April 2027" },
  { what: "Night skiing", detail: "12 December 2026 to 22 March 2027" },
  { what: "Early season", detail: "28 November to 11 December 2026 — and the pass is not sold online in this period" },
  { what: "Regular season", detail: "12 to 23 December 2026, and 1 to 22 March 2027" },
  { what: "Peak season", detail: `${PEAK_FROM} to ${PEAK_TO}` },
  { what: "Spring season", detail: "23 March to 4 April 2027" },
  { what: "Final season", detail: "5 April to 5 May 2027" },
];

/** One-day All Mountain Pass, by period and age. Niseko United's own prices. */
const passRows = [
  { period: "Early (28 Nov – 11 Dec 2026)", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "Regular (12–23 Dec 2026, 1–22 Mar 2027)", adult: REGULAR_DAY, youth: "¥10,700", child: "¥7,600", senior: "¥10,700" },
  { period: `Peak (${PEAK_FROM} – ${PEAK_TO})`, adult: PEAK_DAY, youth: "¥11,500", child: "¥8,100", senior: "¥11,500" },
  { period: "Spring (23 Mar – 4 Apr 2027)", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "Final (5 Apr – 5 May 2027)", adult: "¥6,300", youth: "¥5,400", child: "¥3,800", senior: "¥5,400" },
];

/** The four areas, and what sleeping in each one actually buys. */
const areaRows = [
  {
    area: "Grand HIRAFU",
    what: "The biggest of the four and the one with a village attached — restaurants, bars, rental shops and the resort ski school",
    stay: "The default base, and the only one where an evening out is a walk rather than a shuttle ride",
    note: "Grand Hirafu's own figures: 22 courses graded 9 beginner, 6 intermediate and 7 advanced, 2 gondolas and 7 chairlifts, 940 m of vertical from a 1,200 m top to a 260 m base, and a 5,300 m longest run.",
  },
  {
    area: "Hanazono",
    what: "The quietest side of the mountain, and home to the resort-operated Niseko International Snowsports School",
    stay: "The pick for a family or a first-timer — fewer people on the beginner terrain, and the lessons start here",
    note: "This is also where the published lesson rule lives: in peak season only full-day lessons can be booked in advance. Read it before you plan a half-day over Christmas.",
  },
  {
    area: "Niseko Village",
    what: "The hotel-led side, with the lifts at the door of the accommodation rather than a street away",
    stay: "Worth it for ski-in, ski-out convenience and for a trip that is not going out in the evenings",
    note: "The first of the four to close — 4 April 2027, a month before Grand HIRAFU and Annupuri. Check it against a late-season booking.",
  },
  {
    area: "Annupuri",
    what: "The widest, gentlest terrain of the four, on the far western side of the linked area",
    stay: "The quiet option, and a good one for intermediates who want space rather than nightlife",
    note: "Runs the full season to 5 May 2027 alongside Grand HIRAFU, which makes it the pick for a spring or Golden Week trip.",
  },
];

/** Which month, on the resort's own month-by-month and its own snow figures. */
const monthRows = [
  {
    month: "December",
    snow: "386 cm cumulative at Grand Hirafu in the most recent completed season",
    crowds: "Quiet lifts before the holidays; pre-peak accommodation rates",
    verdict: "Niseko United calls this the locals' month. Early season is the cheapest pass of the winter at ¥8,800 — but the pass is not sold online before 12 December, and peak pricing starts on Christmas Eve.",
  },
  {
    month: "January",
    snow: "620 cm cumulative — the snowiest month of that season by a wide margin",
    crowds: "Busy. The resort's own word is crowded",
    verdict: `"Japanuary", and Niseko United's own claim is that it is "one of the most consistent places in the world for snowfall". The trade is the whole month sits inside peak pricing at ${PEAK_DAY} a day.`,
  },
  {
    month: "February",
    snow: "263 cm cumulative, with the deepest summit snowpack of the season at 400 cm",
    crowds: "Busy, and busiest around Lunar New Year — popular restaurants fill",
    verdict: "Peak powder continues and the villages are at their most photogenic, buried in snow. Still peak pricing until 28 February, and the week that also fills Sapporo for the Snow Festival.",
  },
  {
    month: "March",
    snow: "75 cm cumulative, but 380 cm still on the summit",
    crowds: "Thinner after the first week",
    verdict: "The value month, and the resort says so itself: sunnier skies, milder temperatures, spring discounts on lessons and rental, and \"the best month for backcountry exploration\". Regular pricing to 22 March, then spring pricing at ¥8,800.",
  },
  {
    month: "April to early May",
    snow: "Summit depth still 315 cm in April and 170 cm in May on the resort's own table",
    crowds: "Quiet outside Golden Week",
    verdict: "Spring skiing at the cheapest pass of the year — ¥6,300 a day from 5 April. Only Grand HIRAFU and Annupuri are open this late; Niseko Village shuts 4 April and Hanazono 11 April.",
  },
];

const faqItems = [
  {
    q: "How do I get from New Chitose Airport to Niseko?",
    a: `Niseko United publishes five options and the honest default is the direct bus: ${AIRPORT_BUS} and ${AIRPORT_BUS_FARE}, booking required, on its own access page read ${OWN}. The alternatives, same source: train plus local bus at ${AIRPORT_TRAIN} and ${AIRPORT_TRAIN_FARE} with no booking needed; a seasonal ski bus at 3 to 3.5 hours and ${AIRPORT_BUS_FARE}, December to March only; a rental car at 2 hours from ¥8,000 a day; and a private transfer at 2 hours from ¥25,000. Two things decide it for most people. First, luggage — the coach listings carry ski equipment plus a bag per person, and a train-and-bus change with ski bags on a Hokkaido platform in January is the part nobody plans for. Second, booking: only the train-and-bus route can be walked up to, and every other option is a decision you make before you fly. If you are driving, note that the published 2 hours assumes you are comfortable on snow and ice.`,
  },
  {
    q: "When is the best time to ski in Niseko?",
    a: `January for snow, March for value, December if you want the mountain quiet. Grand Hirafu's own cumulative snowfall for the most recent completed season, measured on the Shirakaba Course at about 850 m and read ${OWN}, was 386 cm in December, 620 cm in January, 263 cm in February and 75 cm in March — so January is the month by a wide margin, and Niseko United's own description of it is "one of the most consistent places in the world for snowfall". The cost of that is crowds and peak pricing: the whole of January sits inside the ${PEAK_FROM} to ${PEAK_TO} peak band at ${PEAK_DAY} a day. February keeps the powder and adds Lunar New Year crowds, with the deepest summit snowpack of the season at 400 cm. March is the one the resort itself sells on value — sunnier skies, milder temperatures, spring discounts on lessons and rental, and in its own words "the best month for backcountry exploration" — with 380 cm still on the summit and the pass dropping to ${EARLY_DAY} from 23 March. December before the holidays is the locals' pick: quiet lifts, pre-peak rates, and the cheapest pass of the winter at ${EARLY_DAY}.`,
  },
  {
    q: "Do I need to book Niseko ski lessons in advance?",
    a: `Yes, and there is a published rule behind it rather than just advice. The resort-operated Niseko International Snowsports School states on its own page, read ${SEASON}, that "during peak season, only full-day lessons are available for advance booking", and its own lesson peak is ${LESSON_PEAK}. That is not the lift-pass peak: a half-day lesson in late January can still be booked ahead, while one on 20 December or 8 February is something you turn up and ask about. If a half day in those weeks is what your legs or your children can manage, either book a full day and quit early, or move your dates. The school runs 28 November 2026 to 11 April 2027 on its own tentative dates, offers group, private and fully customised programmes, and has 2026-27 bookings open. Private lessons through a reseller are a separate pool of availability and take a foreign card in English, which is worth knowing if the resort school is full on your date.`,
  },
  {
    q: "Is Niseko good for beginners?",
    a: `Yes — more so than its powder reputation suggests. On Grand Hirafu's own terrain figures read ${OWN}, 9 of its 22 courses are graded beginner against 6 intermediate and 7 advanced, and the gentlest, widest terrain of the four linked areas is at Annupuri on the western side. Two practical points in a beginner's favour. The linked All Mountain Pass means you are not stuck on one hill while you improve, and the resort-run ski school is based at Hanazono, which is the quietest side — fewer fast skiers on the slope you are learning on. Two against. The booking rule above is the real one: in the resort school's own peak, ${LESSON_PEAK}, only full-day lessons can be reserved in advance, which is awkward for a first-timer who wants a cautious half day. And the peak one-day pass is ${PEAK_DAY} for an adult, so a beginner in January is paying the same per day for nine beginner runs as an expert is paying for the whole mountain — an argument for December or March.`,
  },
  {
    q: "Where should I stay in Niseko?",
    a: `Grand HIRAFU unless you have a reason not to. It is the largest of the four areas and the only one with a village attached, which means restaurants, bars, rental shops and the evening are a walk rather than a shuttle ride. Its own figures: 22 courses, 2 gondolas and 7 chairlifts, 940 m of vertical from a 1,200 m summit to a 260 m base, and a 5,300 m longest run. The three alternatives each buy something specific. Hanazono is the quietest side and the home of the resort ski school, which makes it the family and first-timer pick. Niseko Village is hotel-led and genuinely ski-in, ski-out, so it suits a trip that is not going out at night. Annupuri has the widest, gentlest terrain and the least traffic. One date check that catches people: the four areas do not close together. Niseko Village shuts 4 April 2027 and Hanazono 11 April, while Grand HIRAFU and Annupuri run to 5 May — so a late-season or Golden Week booking has only two of the four open. All dates Niseko United's own, read ${OWN}.`,
  },
  {
    q: "How much is a Niseko lift pass?",
    a: `A one-day All Mountain Pass covering all four areas is ${PEAK_DAY} for an adult in peak season, ${REGULAR_DAY} in regular season and ${EARLY_DAY} in early or spring season, dropping to ¥6,300 for the final weeks — Niseko United's own prices, read ${OWN}. Children aged 4 to 12 are ¥8,100 at peak, ¥7,600 regular, ¥5,300 early or spring and ¥3,800 final. Youths aged 13 to 15 and seniors aged 65 and over pay the same as each other: ¥11,500 peak, ¥10,700 regular, ¥7,500 early or spring, ¥5,400 final. The periods are the thing to plan around rather than the prices: peak runs ${PEAK_FROM} to ${PEAK_TO}, which swallows Christmas, New Year, the whole of January and all of February. One operational detail worth knowing — the early-season pass, for 28 November to 11 December 2026, is not sold online, so the cheapest week of the winter is a counter purchase.`,
  },
  {
    q: "Do you need a tour for Niseko, or can you do it yourself?",
    a: `It depends entirely on where you are sleeping, and that is the one question this search term hides. If you are staying at Niseko, you do not need a tour: book the airport coach, book a lesson, reserve the gear, buy the pass, and the days look after themselves. If you are staying in Sapporo — which plenty of people are, because the city is where the hotels and the restaurants are — then a guided day is the only sensible way to ski Niseko, because Niseko United's own access figures make the run 2 to 3.5 hours each way from the airport side and a self-assembled day burns most of the daylight on buses. That is what the lift-pass-and-coach day out of Sapporo is for: a fixed six hours on Grand Hirafu with the transport and the pass in one booking. The third case is a mixed party — some skiing, some not — and there the private car charter is the listing that works, because it is priced per vehicle rather than per skier.`,
  },
  {
    q: "Can you do Niseko as a day trip from Sapporo?",
    a: `Yes, as a booked day rather than an improvised one. The constraint is the distance: Niseko United's own access page puts New Chitose to Niseko at ${AIRPORT_BUS} by booked coach and ${AIRPORT_TRAIN} by train plus local bus, and Sapporo is on the same side of that journey — so a self-arranged day trip spends most of the daylight travelling. The listings that solve it sell a fixed window on the snow with the coach inside the price, typically about six hours on Grand Hirafu with the lift pass included, picking up at several central Sapporo stops. That is the right shape for a city-based trip that wants one real ski day. If you want two, the arithmetic changes and a two- or three-day tour with the beds inside it stops being an indulgence. And if the mountain is closed for wind — which happens, and happens most to the upper lifts — the non-ski Hokkaido day that takes in Noboribetsu and Lake Toya is the fallback that uses the same coach network.`,
  },
  {
    q: "Is there night skiing at Niseko?",
    a: `Yes, from 12 December 2026 to 22 March 2027 on Niseko United's own dates, read ${OWN}. It is one of the genuine arguments for Niseko over a Honshu resort: the lit runs extend a short winter day at the latitude where the day is shortest, and they are at their best in exactly the weeks the snow is heaviest. Two caveats. The dates do not cover the full season — the first fortnight from the ${SEASON_OPEN} opening has no night skiing, and nor do the spring and final periods after 22 March, which matters if you have picked a cheap April week. And night operation is weather-dependent in the way everything here is: upper lifts hold for wind, and a storm night is the night the lights are off. Check the resort's own daily status rather than a guide, including this one.`,
  },
  {
    q: "How long should a Niseko trip be?",
    a: `Three nights minimum if you are coming for the snow, and the reason is the access rather than the mountain. Niseko United's own figures make the airport run ${AIRPORT_BUS} by booked coach each way, so a two-night trip spends a meaningful share of itself in a vehicle, and a one-night trip is not worth the transfer. Three nights gives you two full days plus an arrival afternoon or a departure morning. Five to seven is where Niseko starts to pay for itself, because the thing it is actually famous for — consistent, repeated powder — is a statistical argument, not a single-day one, and Grand Hirafu's own January figure of 620 cm in a month is a lot of mornings rather than one. The counter-argument: if your trip is mostly cities and you want one ski day on it, do not move your base to Niseko at all. Book a guided day out of Sapporo and keep the city hotel.`,
  },
];

/** The same-trip block: the eSIM, the Niseko coach, the pass, then what the trip already booked. */
const nisekoSameTrip: KlookTripPrepItem[] = [
  {
    label: klookEsim.name,
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
    why: "A Niseko day is decided by weather: upper lifts hold for wind, areas close and reopen through a storm, and those notices reach a phone rather than a noticeboard at the bottom of the hill.",
  },
  {
    label: nisekoResortShuttleBus.title,
    ctaLabel: "Check the Niseko shuttle →",
    url: nisekoResortShuttleBus.url,
    why: "Niseko United's own figures put the direct coach from New Chitose at 2.5 hours and ¥6,000, against 3 hours and ¥6,200 by train and bus. This listing carries ski equipment plus one bag per person, and it asks for 45 minutes after a domestic landing and 90 after an international one, so match it to your flight.",
  },
  {
    label: jrHokkaidoRailPass.title,
    ctaLabel: "Price the JR Hokkaido pass →",
    url: jrHokkaidoRailPass.url,
    why: "Only if Niseko is one stop on a longer island trip. It runs from ¥22,000 for five days on JR Hokkaido's own page and covers no coach, so a trip that goes from the airport to the resort and back should skip it.",
  },
  {
    label: nisekoHirafuEnglishSkiLesson.title,
    ctaLabel: "Check Niseko lessons →",
    url: nisekoHirafuEnglishSkiLesson.url,
    why: `The booking with a published rule behind it: the resort-run school takes advance bookings for full days only in its own peak, ${LESSON_PEAK}, so a half day in those weeks needs a reseller or a turn-up.`,
  },
  {
    label: nisekoSkiSnowboardRental.title,
    ctaLabel: "Check Niseko rental →",
    url: nisekoSkiSnowboardRental.url,
    why: "Gear reserved before you fly and collected in Hirafu at the foot of the lifts, which is the difference between skiing on your first morning and queueing through it.",
  },
  {
    label: "Hotels in Niseko",
    ctaLabel: "Check Niseko hotels on Klook →",
    url: japanWinterStayAreas[7].url,
    why: "The booking that fixes everything else. Which of the four areas you sleep in decides whether the lifts are a walk or a shuttle ride, and Niseko United itself says the peak holiday periods sell out early.",
  },
];

const TITLE = "Niseko Ski Tours (2027): Transfers, Lessons & 4 Areas";
const DESCRIPTION =
  "Niseko ski tours and transfers: 2.5 hours from New Chitose Airport by booked coach, four linked areas, and a ¥13,500 peak lift pass. 2026-27 dates.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/niseko-ski-tours") },
});

export default function NisekoSkiToursPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/niseko-ski-tours" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/niseko-ski-tours" />
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
              route: "/guides/attractions/niseko-ski-tours",
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Niseko Ski Tours",
                  item: "https://www.japan-travel-kit.com/guides/attractions/niseko-ski-tours",
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
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Niseko Ski Tours</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Niseko Ski Tours:<br />Getting There, Lessons and the Four Areas
          </h1>
          <p className={styles.heroSubtitle}>
            Four linked ski areas, {AIRPORT_BUS} from New Chitose by booked coach, and one published
            deadline that catches people — the peak-season lesson rule.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "2026-27 dates, official", "All Mountain Pass prices", "Peak lesson rule, sourced"].map((t) => (
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

        <WinterBookingTop
          heading="Which Niseko Ski Tours Should You Book for Winter 2026-27?"
          checkedIso={SEASON_ISO}
          deadline={
            <>
              For Christmas or New Year, book the lesson and the airport coach by 28 November, the day the
              lifts open: the resort school&apos;s lesson peak starts 14 December, and in it only full days
              can be booked ahead. For January or February, book by 31 December, before the school&apos;s
              second peak on 6 to 12 February.
            </>
          }
          tours={[
            {
              title: nisekoHirafuLiftPassBusTour.title,
              url: nisekoHirafuLiftPassBusTour.url,
              price: null,
              duration: "Same-day return, 6-hour lift ticket",
              departs: "10 stops in central Sapporo",
            },
            {
              title: nisekoHirafuEnglishSkiLesson.title,
              url: nisekoHirafuEnglishSkiLesson.url,
              price: null,
              duration: "4 or 6 hours",
              departs: "Niseko Tokyu Grand Hirafu",
            },
            {
              title: noboribetsuToyaNisekoDayTour.title,
              url: noboribetsuToyaNisekoDayTour.url,
              price: null,
              duration: "About 10 hours",
              departs: "Sapporo",
            },
          ]}
        />

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From New Chitose</p>
                <p className={styles.verdictStatValue}>{AIRPORT_BUS} by booked coach</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Season</p>
                <p className={styles.verdictStatValue}>28 Nov 2026 – 5 May 2027</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Lift pass, 1 day</p>
                <p className={styles.verdictStatValue}>{PEAK_DAY} peak / {EARLY_DAY} early</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book ahead?</p>
                <p className={styles.verdictStatValue}>Lessons and the transfer, yes</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Niseko ski tours</strong> start with the journey, because it is the longest part:
              Niseko United&apos;s own access page puts <strong>New Chitose Airport to Niseko at{" "}
              {AIRPORT_BUS} and {AIRPORT_BUS_FARE} by booked direct coach</strong>, {AIRPORT_TRAIN} and{" "}
              {AIRPORT_TRAIN_FARE} by train plus local bus with no booking, or 2 hours by rental car or
              private transfer. What you reach is <strong>four linked ski areas on one pass</strong> —{" "}
              <strong>Grand HIRAFU</strong> (the biggest, with the village), <strong>Hanazono</strong>{" "}
              (the quietest, and where the resort ski school is), <strong>Niseko Village</strong>{" "}
              (ski-in, ski-out hotels) and <strong>Annupuri</strong> (the widest, gentlest terrain). All
              four open <strong>{SEASON_OPEN}</strong>; Grand HIRAFU and Annupuri run to{" "}
              <strong>5 May 2027</strong>. A one-day All Mountain Pass is <strong>{PEAK_DAY}</strong> in
              the <strong>{PEAK_FROM} to {PEAK_TO}</strong> peak band and <strong>{EARLY_DAY}</strong>{" "}
              early or spring. And the one thing to book rather than buy on the day is a{" "}
              <strong>lesson</strong>: the resort school states that in its own peak, {LESSON_PEAK}, only
              full-day lessons can be reserved in advance. All figures the operators&apos; own, re-read{" "}
              {SEASON}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={nisekoHirafuLiftPassBusTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Niseko Day from Sapporo →
              </KlookLink>
              <KlookLink href={nisekoResortShuttleBus.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Airport Shuttle to Niseko →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Same-trip block, moved up from above the FAQ on 6 Nov 2026. */}
        <KlookTripPrep
          label="Book on the same trip"
          heading="What a Niseko Trip Actually Books"
          intro="Data and the airport coach first, because nothing else on this list fails if you get it wrong on the day. Niseko United's own access page prices the gap: a booked coach is 2.5 hours and the walk-up train-and-bus is 3."
          items={nisekoSameTrip}
        />

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get From New Chitose Airport to Niseko?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>{AIRPORT_BUS} and {AIRPORT_BUS_FARE} on a booked direct coach</strong> is the answer
            for most people, and it is Niseko United&apos;s own figure. The resort publishes five options
            and the differences between them are not really about speed — the spread is 2 to 3.5 hours —
            but about <strong>whether you can turn up without a booking</strong> and{" "}
            <strong>what happens to your ski bags</strong>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Cost", "Booking", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.booking}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every time and fare in the table is Niseko United&apos;s own, from its own &ldquo;Getting to
            Niseko&rdquo; page, re-read {SEASON}. The notes column is ours. One thing the table cannot tell you
            and a listing can: whether a given coach takes ski equipment and how much luggage per person
            — the resort shuttle listing states one piece plus equipment, which is the detail that makes
            it a different product from the train.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nisekoResortShuttleBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Niseko resort shuttle →
            </KlookLink>
            <KlookLink href={hokkaidoPrivateCarCharterNiseko.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Private car to Niseko →
            </KlookLink>
            <KlookLink href={newChitoseAirportTransfers.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              New Chitose transfers →
            </KlookLink>
          </div>
        </section>

        {/* Season */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Season</span>
          <h2 className={styles.sectionTitle}>When Does Niseko Open and Close for 2026-27?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            All four areas open <strong>{SEASON_OPEN}</strong>, but they do not close together — and the
            five <strong>price periods</strong> matter more to your booking than the opening date does,
            because the peak band swallows Christmas, New Year, the whole of January and all of February.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `Niseko United, 2026-27 (read ${SEASON})`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            All dates Niseko United&apos;s own, read {SEASON}. The resort describes the closing dates as
            scheduled, and a Hokkaido spring can move them. The detail worth re-reading before a
            late-season booking: <strong>Niseko Village closes 4 April and Hanazono 11 April</strong>,
            while Grand HIRAFU and Annupuri carry on to 5 May.
          </p>
        </section>

        {/* Pass prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Lift pass</span>
          <h2 className={styles.sectionTitle}>How Much Is a Niseko Lift Pass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            A one-day <strong>All Mountain Pass</strong> covering all four areas runs from{" "}
            <strong>{EARLY_DAY}</strong> to <strong>{PEAK_DAY}</strong> for an adult depending purely on
            when you go. Youths aged 13–15 and seniors aged 65 and over pay the same as each other, which
            is unusual and worth knowing if you are travelling with either.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Period", "Adult", "Youth 13–15", "Child 4–12", "Senior 65+"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.period}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.period}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td className={styles.tdPrice}>{row.youth}</td>
                      <td className={styles.tdPrice}>{row.child}</td>
                      <td className={styles.tdPrice}>{row.senior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>One operational detail that changes a plan.</strong> The early-season pass — the
            cheapest week of the winter, 28 November to 11 December 2026 — is{" "}
            <strong>not sold online</strong> on Niseko United&apos;s own note. So the cheapest skiing of
            the season is a counter purchase on arrival, which is fine, but it is not something you can
            lock in from home. Multi-day passes run to seven days and a 50-hour online-only ticket exists;
            we quote only the one-day figures here, because those are the ones on the resort&apos;s own
            table we could read in full. All prices read {SEASON}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={nisekoHirafuLiftPassBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hirafu lift pass + bus day →
            </KlookLink>
            <KlookLink href={nisekoSkiSnowboardRental.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Reserve Niseko rental →
            </KlookLink>
          </div>
        </section>

        {/* Lessons — the booking section, with the published deadline */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Lessons</span>
          <h2 className={styles.sectionTitle}>Do I Need to Book Niseko Ski Lessons in Advance?</h2>
          <p className={styles.bodyText}>
            <strong>Yes — and there is a published rule behind it, not just advice.</strong> The
            resort-operated <strong>Niseko International Snowsports School</strong> states on its own page,
            read {SEASON}:{" "}
            <em>&ldquo;During peak season, only full-day lessons are available for advance
            booking.&rdquo;</em> The school&apos;s own peak is{" "}
            <strong>{LESSON_PEAK}</strong>, which is not the lift-pass peak of {PEAK_FROM} to {PEAK_TO}. So
            across the Christmas and New Year weeks and the 6 to 12 February week, a half-day lesson is
            something you turn up and ask about rather than something you reserve.
          </p>
          <p className={styles.bodyText}>
            That is the single most useful sentence on this page for a family or a first-timer, because it
            inverts the usual plan. If a half day in those weeks is what your legs or your children can
            actually manage, you have three choices: book a full day and quit at lunch, move to the
            school&apos;s regular weeks (8 to 13 December, 4 January to 5 February, 13 to 28 February), or
            book through a reseller, which is a separate pool of availability, prices in your own currency
            and reads in English. The school itself runs <strong>{SEASON_OPEN} to 11 April 2027</strong> on
            its own tentative dates, offers group, private and fully customised programmes, and has 2026-27
            bookings open.
          </p>
          <p className={styles.bodyText}>
            The school&apos;s private rates are per group of up to six, on its own page read {SEASON}: the
            six-hour Niseko Classic is <strong>¥120,000</strong> peak, ¥93,000 regular and ¥87,000 in early
            and spring weeks; a morning lesson is ¥93,000, ¥71,000 and ¥59,000; an afternoon lesson is
            ¥55,000, ¥43,000 and ¥43,000. Group lessons have their own rates, and they do not run from 28
            November to 7 December. Open a listing for the reseller&apos;s price on your own dates.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nisekoHirafuEnglishSkiLesson.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hirafu English lesson →
            </KlookLink>
            <KlookLink href={rhythmNisekoPrivateSkiLesson.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Rhythm private lesson →
            </KlookLink>
            <KlookLink href={nisekoRusutsuKiroroPrivateLesson.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Niseko / Rusutsu / Kiroro →
            </KlookLink>
          </div>
        </section>

        {/* The four areas */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The four areas</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay in Niseko?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Grand HIRAFU unless you have a reason not to.</strong> It is the largest of the four
            linked areas and the only one with a village attached, which means dinner is a walk rather
            than a shuttle ride. The other three each buy something specific, and the last column is where
            the real decisions are.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "What it is", "Who should sleep there", "The thing to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.stay}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Area names and closing dates are Niseko United&apos;s own; the Grand HIRAFU terrain figures
            are Grand Hirafu&apos;s own — 22 courses graded 9 beginner, 6 intermediate and 7 advanced, 2
            gondolas and 7 chairlifts, 940 m of vertical from a 1,200 m top to a 260 m base, 135 hectares,
            a 5,300 m longest run and 40° at the steepest. Both read {OWN}. Niseko United says in its own
            words that the most popular properties and the peak holiday periods sell out early; it
            publishes no figure for how early, so neither do we.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={japanWinterStayAreas[7].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Niseko hotels →
            </KlookLink>
            <KlookLink href={nisekoSkiHotSpringTourFromSapporo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              2 or 3 nights, booked as one →
            </KlookLink>
          </div>
        </section>

        {/* Which month */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which month</span>
          <h2 className={styles.sectionTitle}>When Is the Best Time to Ski in Niseko?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>January for snow, March for value, December for a quiet mountain.</strong> The snowfall
            column is Grand Hirafu&apos;s own cumulative monthly total for the most recent completed
            season, measured on the Shirakaba Course at about 850 m; the crowd and verdict columns follow
            Niseko United&apos;s own month-by-month guidance and its published price periods.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Month", "Snowfall (last full season)", "Crowds", "Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthRows.map((row) => (
                    <tr key={row.month}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.month}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.snow}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.crowds}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Snowfall figures are one season, not an average, and are the resort&apos;s own measurement at
            one point on the mountain — read them as the shape of a winter rather than a forecast of
            yours. Everything in this table read {OWN}. <strong>Night skiing</strong> runs 12 December
            2026 to 22 March 2027, which means neither the opening fortnight nor the cheap April weeks
            have it.
          </p>
        </section>

        {/* Tour or DIY */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Tour or not</span>
          <h2 className={styles.sectionTitle}>Do You Need a Tour, or Can You Do Niseko Yourself?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            It depends entirely on where you are sleeping — which is the question the phrase
            &ldquo;Niseko ski tours&rdquo; actually hides. Four cases, and they want four different
            bookings.
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Staying at Niseko? No tour needed</p>
              <p className={styles.whoForDesc}>
                Book the airport coach, reserve the gear, book a lesson if you want one, buy the pass, and
                the days look after themselves — all four areas are on one pass and linked. The only
                bookings with deadlines are the transfer, the lesson in peak season, and the bed.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Staying in Sapporo? Book the day</p>
              <p className={styles.whoForDesc}>
                This is the real case for a guided day. Niseko United&apos;s own access figures make the
                run 2 to 3.5 hours each way, so a self-assembled day trip spends the daylight on buses.
                The lift-pass-and-coach listing sells a fixed window on Grand Hirafu with the transport
                and the pass inside one price.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Mixed party? Book per vehicle</p>
              <p className={styles.whoForDesc}>
                Some skiing, some not, is the hardest Niseko trip to arrange and the one where per-seat
                pricing falls apart. The private car charter is priced per vehicle, which is also what
                makes it rational for four or more rather than extravagant.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Check the weather clause either way</p>
              <p className={styles.whoForDesc}>
                Specific to this mountain: the upper lifts hold for wind often enough that it is a
                planning assumption rather than bad luck. Before you book, read what happens if the
                operator cancels and what happens if you do — nothing on this page can tell you, because
                it is per listing and per date.
              </p>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            One booking that is none of the above: <strong>data</strong>. A Niseko day is decided by
            weather more than any other ski trip in Japan — lifts hold and reopen through a storm, areas
            close, road transfers run late — and every one of those notices reaches a phone rather than a
            noticeboard at the bottom of the hill.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it
            against the alternatives, and our{" "}
            <Link href="/guides/money/japan-ski-travel-insurance">best travel insurance for skiing in Japan</Link>{" "}
            covers the other thing to sort before a lift ticket: standard travel policies routinely
            exclude snowsports.
          </p>
        </section>

        {/* The rest of the winter */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The rest of your winter</span>
          <h2 className={styles.sectionTitle}>What Should You Pair With a Niseko Trip?</h2>
          <p className={styles.bodyText}>
            A February trip can take in the city as well as the snow. Our{" "}
            <Link href="/guides/attractions/sapporo-snow-festival-tours">Sapporo Snow Festival guide</Link>{" "}
            covers the eight days in the city on 4 to 11 February 2027, and our{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo">Otaru day trip from Sapporo</Link>{" "}
            is the easiest rest day on the way back to the airport. If the snow is only part of your week, our{" "}
            <Link href="/guides/attractions/hokkaido-7-day-itinerary">Hokkaido 7 day itinerary</Link> has a
            ski swap built in, and our{" "}
            <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link> treats
            Hokkaido as one leg of a national trip.
          </p>
          <p className={styles.bodyText}>
            Coming through Tokyo? If you have not skied before and want to test it before committing to
            Hokkaido, a{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">GALA Yuzawa ski day from Tokyo</Link>{" "}
            is the low-commitment version. For non-skiers in your party, the{" "}
            <Link href="/guides/attractions/jigokudani-snow-monkey-tour">Jigokudani snow monkey tour</Link>{" "}
            and the{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go tour</Link>{" "}
            are snow days with no skis, and our guide to{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo illuminations</Link> covers the
            evenings at the start or end of the flight.
          </p>
        </section>

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

        {/* Klook tours */}
        <KlookTourPicks
          heading="The Niseko Days You Can Actually Book"
          intro="Four shapes of the same trip: a fixed six hours on Grand Hirafu out of Sapporo with the pass inside it, two or three nights with the beds inside it, a private car for a party that is not all skiing, and the non-ski Hokkaido day for the morning the upper lifts are held for wind."
          tours={[nisekoHirafuLiftPassBusTour, nisekoSkiHotSpringTourFromSapporo, hokkaidoPrivateCarCharterNiseko, noboribetsuToyaNisekoDayTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Gala Yuzawa Ski Day Trip from Tokyo: 71 Min, ¥8,000 Lifts</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-insurance-japan" className={styles.relatedCard}>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Insurance for Japan 2026: Who Needs What, Cost</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-ski-travel-insurance" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Ski Travel Insurance: What Standard Policies Exclude</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hokkaido-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hokkaido 7 Day Itinerary: 7 Days in Hokkaido, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sapporo-snow-festival-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sapporo Snow Festival Tours (2027): 4–11 Feb, Free Sites</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-winter-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Winter Itinerary: 12 Days, Day by Day (2027)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17l2-6h10l2 6" />
                  <path d="M12 11V5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Otaru Day Trip from Sapporo (2027): ¥800, 33 Min by JR</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/jigokudani-snow-monkey-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Snow Monkey Tour from Tokyo: Jigokudani Park Guide 2026</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/takayama-shirakawago-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l9-16 9 16z" />
                  <line x1="8" y1="21" x2="8" y2="15" />
                  <line x1="16" y1="21" x2="16" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Takayama and Shirakawa-go Tour (2026): Which Departure</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-illumination-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3 11v2h6v-2a6 6 0 0 0-3-11z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Illuminations 2026: Dates, Hours and the Free Ones</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="2" width="12" height="20" rx="2" />
                  <line x1="10" y1="18" x2="14" y2="18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan (2026): Providers, Prices and Which to Pick</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Four areas, one pass, and one deadline</h2>
            <p className={styles.ctaBannerDesc}>
              The lifts open {SEASON_OPEN} and peak pricing starts {PEAK_FROM}. The transfer and the
              lesson are the two bookings with dates attached: from 14 December to 3 January and on 6 to 12
              February, the resort school only takes advance bookings for full days.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={nisekoHirafuLiftPassBusTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                See the Niseko Ski Day →
              </KlookLink>
              <KlookLink href={nisekoHirafuEnglishSkiLesson.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Book a Niseko Lesson →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
