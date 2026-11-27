import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { hreflangLinks } from "../../../components/Hreflang";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  arashiyamaEarlyMorningWalk,
  arashiyamaHozukyoHalfDayTour,
  arashiyamaSaganoOptionalTour,
  hozugawaRiverBoatTicket,
  klookEsim,
  saganoArashiyamaKiyomizuTour,
  saganoHozugawaGuaranteedTour,
  saganoRomanticTrainTicket,
  whereToStayKyotoAreas,
  type KlookSameDayCard,
} from "../../../lib/klook-links";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import { gygArashiyama, gygHozugawaKudari } from "../../../lib/gyg-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// CTA links. The headline CTA is the guided train-and-boat day (112332), not the
// bare torokko seat: a one-way rail ticket cannot be assumed to pay Klook's 6.5%
// tours band, so the ticket link sits beside a "Compare on GetYourGuide" button
// instead of carrying the page. See the Sagano block in lib/klook-links.ts.
const TOUR_URL = saganoHozugawaGuaranteedTour.url;
const TICKET_URL = saganoRomanticTrainTicket.url;
const BOAT_URL = hozugawaRiverBoatTicket.url;
const ARASHIYAMA_HOTELS_URL = whereToStayKyotoAreas[3].url;
const KYOTO_STATION_HOTELS_URL = whereToStayKyotoAreas[0].url;

// Three cards directly under the ticket button (task-jtk-20261122-04): two tours (6.5%)
// and the eSIM (20%). No prices.
const SAGANO_SAME_DAY: KlookSameDayCard[] = [
  {
    kind: "Guided day",
    label: saganoHozugawaGuaranteedTour.title,
    ctaLabel: "Check the train & boat day →",
    url: TOUR_URL,
    why: "The torokko ride and the Hozugawa boat back down as one booking, for a reader who would rather not juggle two sales windows.",
  },
  {
    kind: "Walking tour",
    label: arashiyamaEarlyMorningWalk.title,
    ctaLabel: "Check the morning walk →",
    url: arashiyamaEarlyMorningWalk.url,
    why: "A 2.5-hour small-group walk from Saga-Arashiyama Station on quieter paths, ending with a matcha tea ceremony: the bamboo grove half of a torokko day.",
  },
  {
    kind: "eSIM",
    label: "Klook Japan eSIM",
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
    why: "The operator says closed dates can be added or changed, so its notices are worth checking on your phone on the day of the ride.",
  },
];

// Read on 7 November 2026 from sagano-kanko.co.jp:
//  - press release of 23 Oct 2026 (news/5535): new train from 1 Mar 2027, seat fee
//    ¥620 / ¥310 on top of the ¥880 / ¥440 fare, deck on the fare alone, Rankyo cabin
//    ¥9,000 a room, 30-day sales window, 1 Feb sale for 1 Mar rides, 2027 calendar,
//    current cars retire on 29 Dec 2026;
//  - press release of 22 Oct 2025: five-unit train, wider seat spacing and aisles;
//  - press release of 18 Sep 2026: light-up dates and the autumn extra trains;
//  - the 2026 operating calendar PDF: 16 Dec closed, 30-31 Dec winter closure;
//  - fare page and FAQ: group fares, same-day counters, standing tickets, free
//    cancellation to 23:59 the day before, QR on the day, JR Pass not valid;
//  - seat page: car layout, car 5 rules, the pet charge.
// No dated notice covers January and February 2027. The page says so, and builds the
// closure from the 2026 calendar (ends 29 Dec) and the 2027 calendar (starts 1 Mar).
//
// Read again on 16 November 2026 (R05): the fare page, the FAQ (1-1 to 1-12, 3-1,
// 5-1 to 5-22), the seat page, the 23 Oct 2026 release PDF, the 18 Sep 2026 light-up
// release PDF (news/5197) and the 2026 calendar PDF. Nothing above had changed. New
// from the FAQ: window seats are A and D; on trains to Kameoka seats C and D face
// forward, on trains to Saga A and B; seat changes are free three times up to 23:59
// the day before; groups of 15+ book through travel agents 1 year to 1 month ahead;
// the operator puts the autumn colour at mid-November to early December; FAQ 5-2
// names only its website and the torokko counters as places to buy (no JR offices).
// Nov-Dec 2026 running days are from the light-up release: lights 24 Oct - 29 Dec
// except closed 16 Dec; 81/82 on 24 Oct - 13 Dec and 26-27 Dec; 91/92 on 14-30 Nov
// and 5-6 Dec.
const CHECKED = checkedLabel("2026-11-16");
const LAST_CHECKED = "2026-11-16";
// Read 25 Oct 2026: Kameoka City's 保津川下り page, and Kyoto City's 7.3 km line length
// (the operator rounds it to about 7 km). Neither was read again on 7 Nov, so they keep
// their own date.
const BOAT_CHECKED = checkedLabel("2026-10-25");

const ADULT = "¥880";
const CHILD = "¥440";
const SEAT_FEE_ADULT = "¥620";
const SEAT_FEE_CHILD = "¥310";
const ADULT_2027 = "¥1,500";
const CHILD_2027 = "¥750";

const fareRows = [
  {
    ticket: "Adult, one way",
    price: ADULT,
    note: "Torokko Saga to Torokko Kameoka, or any shorter hop on the line — the fare is flat, not by distance.",
  },
  {
    ticket: "Child, one way (6 to 11)",
    price: CHILD,
    note: "Exactly half the adult fare. The operator defines a child as aged 6 or over and under 12.",
  },
  {
    ticket: "Group, 15 or more — adult",
    price: "¥800",
    note: "Child ¥400. The operator states there is no group discount on same-day tickets.",
  },
  {
    ticket: "Student group — adult",
    price: "¥710",
    note: "Child ¥360, on the operator's own fare table for school and student parties.",
  },
  {
    ticket: "Pet, in a carrier",
    price: "¥260",
    note: "A hand-luggage charge. The carrier must be within 70 cm long, about 90 cm in total dimensions and 10 kg.",
  },
];

const changeRows = [
  {
    item: "Adult, one way, with a seat",
    now: `${ADULT}, seat included`,
    next: `${ADULT_2027}: ${ADULT} fare + ${SEAT_FEE_ADULT} seat fee`,
  },
  {
    item: "Child, one way, with a seat",
    now: `${CHILD}, seat included`,
    next: `${CHILD_2027}: ${CHILD} fare + ${SEAT_FEE_CHILD} seat fee`,
  },
  {
    item: "Riding without a seat",
    now: "Limited standing tickets, sold on the day once reserved seats have gone",
    next: `On the deck of each car for the fare alone: ${ADULT} adult, ${CHILD} child`,
  },
  {
    item: "Private room",
    now: "None",
    next: "Premium Cabin Rankyo in car 4: ¥9,000 a room, up to 6 people, plus each rider's fare. Board at Torokko Saga or Torokko Kameoka",
  },
  {
    item: "Online sales open",
    now: "Midnight Japan time, one month before the ride",
    next: "Midnight Japan time, 30 days before the ride. For 1 March 2027 only: 1 February 2027, about 10:00",
  },
  {
    item: "Train",
    now: "Current cars, including open-air car 5, the Rich car. They retire on 29 December 2026",
    next: "New five-unit train: a locomotive and four passenger cars, with side glass down to foot level and a high glass ceiling",
  },
  {
    item: "First and last run",
    now: "Last run 29 December 2026",
    next: "First run 1 March 2027: Sagano No. 3, leaving Torokko Saga at 10:02",
  },
  {
    item: "Closed for winter",
    now: "30 December 2026 to 28 February 2027",
    next: "30 and 31 December 2027 are closed. January and February 2028 are not published yet",
  },
];

const seasonRows = [
  {
    period: "Now – 29 December 2026",
    status: "Running",
    note: "Regular departures from Torokko Saga run from 09:02 to 16:02, and the last train back leaves Torokko Kameoka at 16:30. Tuesday 29 December is the last run of the current cars.",
  },
  {
    period: "16 December 2026",
    status: "Closed",
    note: "The one closed date left before the end of the season, on the operator's 2026 calendar. The operator says closed dates can be added or changed.",
  },
  {
    period: "24 October – 29 December 2026",
    status: "Light-up",
    note: "The line is lit from 16:30 to the last train, and the operator says the lights can be seen from Sagano No. 16, the 16:30 from Torokko Kameoka. Extra train 81/82 (17:10 from Torokko Saga) runs 24 October – 13 December and 26–27 December. Extra train 91/92 (18:26) runs 14–30 November and 5–6 December.",
  },
  {
    period: "30 December 2026 – 28 February 2027",
    status: "Closed",
    note: "The winter closure. The operator's 2026 calendar marks 30 and 31 December as winter closure days, and its 2027 schedule starts on 1 March.",
  },
  {
    period: "From 1 March 2027",
    status: "New train",
    note: "The new train starts with Sagano No. 3 at 10:02, so the 09:02 does not run that day. The regular timetable is unchanged at 09:02 to 16:02 from Torokko Saga. The 2027 calendar closes most Wednesdays outside the busy weeks, such as 10 March and 14 April, so check your date.",
  },
];

const carRows = [
  {
    car: "Cars 1 to 4 — standard (until 29 Dec 2026)",
    what: "Enclosed cars with windows you can slide open, four-person seat boxes, wooden benches and bare bulbs — converted freight wagons, and they sound like it.",
    pick: "The default, and the only sensible choice if rain is forecast. Seats are sold by car number and seat letter A to D.",
  },
  {
    car: "Car 5 — the Rich car (until 29 Dec 2026)",
    what: "Open-air: no windows at all and a glass ceiling, positioned closest to the locomotive. The operator says it may get wet inside in the rain, umbrellas are banned on board, and there is no refund for rain.",
    pick: "The one to book for the gorge, and the one to regret in a downpour. Bring a raincoat. You have to select \"No. 5\" on the reservation form — it is not assigned automatically.",
  },
  {
    car: "Cars 1 to 4 — new train (from 1 Mar 2027)",
    what: "Side glass down to foot level, a high glass ceiling, wood-finish seats and floors, and a covered semi-outdoor deck at the doors of each car. Car 4 also holds the Rankyo cabin, with a tatami-style bench and a forward view.",
    pick: `A seat is ${ADULT_2027} for an adult. The deck is ${ADULT} and the cabin is ¥9,000 a room plus fares. The release does not include a seat map for the new cars.`,
  },
];

const combinationRows = [
  {
    option: "Torokko one way only",
    cost: `${ADULT} adult, ${CHILD} child; with a seat from 1 March 2027, ${ADULT_2027} and ${CHILD_2027}`,
    time: "About 25 minutes on the train",
    pick: "If Arashiyama is one stop on a full Kyoto day. Ride Saga to Kameoka, then walk 10 minutes to JR Umahori and take the JR Sagano Line back — the return leg is an ordinary train fare.",
  },
  {
    option: "Torokko one way + Hozugawa boat back",
    cost: `${ADULT} + ¥6,000 adult; ${CHILD} + ¥4,500 child (train fare until 29 December 2026)`,
    time: "Roughly half a day — 25 minutes up, about 2 hours back down",
    pick: "The classic pairing, and the reason most people ride the train at all: the boat finishes at Arashiyama, so you end the morning where you started without a return train.",
  },
  {
    option: "A guided day that includes both",
    cost: "Check the listing for your date",
    time: "Half day or full day depending on the itinerary",
    pick: "If your date is in the autumn, or the boat's season does not line up, or you simply do not want to hold two separate reservations an hour apart. A guided departure also solves the transfer between Torokko Kameoka and the boat pier, which is not walking distance.",
  },
];

// Table 1: where to buy, when each channel opens, and what it costs to change your mind.
// First row is the answer. No Klook price — the listing shows it.
const bookingRows = [
  {
    method: "Best for most: the operator's website",
    opens: "00:00 Japan time, one month before the ride (the same date the month before). Rides from 1 March 2027: 30 days before",
    cost: `Fare only: ${ADULT} adult, ${CHILD} child. Free cancellation to 23:59 the day before; seat changes free up to 3 times. Up to 8 tickets per purchase, credit or debit card with 3-D Secure`,
  },
  {
    method: "Klook (torokko ticket)",
    opens: "Bookable dates are shown on the listing",
    cost: "Price and cancellation terms are on the listing; read them before you pay",
  },
  {
    method: "Torokko station counters (Saga, Arashiyama, Kameoka)",
    opens: "Same day only, first come first served: about 08:35 at Torokko Saga, 08:50 at Torokko Arashiyama, 09:10 at Torokko Kameoka",
    cost: "Fare only. Cash, credit card or IC card (not PiTaPa). Limited standing tickets once reserved seats are gone. No sales at Torokko Hozukyo",
  },
  {
    method: "JR ticket offices",
    opens: "Not a sales point",
    cost: "The operator's FAQ names only its website and the torokko counters. The Japan Rail Pass and Seishun 18 Kippu are not valid",
  },
  {
    method: "Groups of 15 or more",
    opens: "Through travel agents, 1 year to 1 month before",
    cost: "¥800 adult, ¥400 child. No group seats in car 5, and no group discount on the day",
  },
];

// Table 2: direction. Only what the operator publishes — departures, which seats
// face forward, and where each end of the line leaves you.
const directionRows = [
  {
    dir: "Best for most: Torokko Saga → Torokko Kameoka (downbound)",
    times: "Hourly from Torokko Saga, 09:02 to 16:02. Extra trains at 17:10 and 18:26 on the dates in the calendar below",
    seats: "C and D face forward; A and D are window seats",
    fit: "Pairs with the Hozugawa boat, which runs back down from Kameoka to Arashiyama. On the booking form, pick the Saga/Arashiyama → Kameoka direction. A Saga ticket can also board at Torokko Arashiyama",
  },
  {
    dir: "Torokko Kameoka → Torokko Saga (upbound)",
    times: "Hourly from Torokko Kameoka, 09:30 to 16:30. Extra trains at 17:43 and 18:59 on the same dates",
    seats: "A and B face forward; A and D are window seats",
    fit: "Ends in Arashiyama, so the bamboo grove comes after the ride. Reach Kameoka by JR to Umahori, about 10 minutes on foot. The operator says the light-up can be seen from the 16:30 departure onwards. You may get off at Torokko Arashiyama, but cannot re-board",
  },
];

// Table 3: November and December 2026 running days, from the operator's 18 Sep 2026
// light-up release and 2026 calendar. "On sale" is the one-month rule applied.
const calendarRows = [
  { dates: "1 Nov – 29 Dec 2026", runs: "Runs every day except Wednesday 16 December", trains: "Regular trains 09:02 – 16:02 from Torokko Saga", sale: "Rides to 16 Dec are on sale now; 17 – 29 Dec open at 00:00 JST on 17 – 29 Nov" },
  { dates: "1 – 13 Nov", runs: "Running", trains: "Regular + extra 81/82 (17:10 from Saga)", sale: "On sale" },
  { dates: "14 – 30 Nov", runs: "Running", trains: "Regular + 81/82 + 91/92 (18:26 from Saga)", sale: "On sale" },
  { dates: "1 – 4 Dec", runs: "Running", trains: "Regular + 81/82", sale: "On sale" },
  { dates: "5 – 6 Dec (Sat – Sun)", runs: "Running", trains: "Regular + 81/82 + 91/92", sale: "On sale" },
  { dates: "7 – 13 Dec", runs: "Running", trains: "Regular + 81/82", sale: "On sale" },
  { dates: "14 – 15 Dec", runs: "Running", trains: "Regular trains only", sale: "On sale" },
  { dates: "16 Dec (Wed)", runs: "Closed", trains: "No trains", sale: "—" },
  { dates: "17 – 25 Dec", runs: "Running", trains: "Regular trains only", sale: "00:00 JST on 17 – 25 Nov" },
  { dates: "26 – 27 Dec (Sat – Sun)", runs: "Running", trains: "Regular + 81/82", sale: "00:00 JST on 26 – 27 Nov" },
  { dates: "28 – 29 Dec", runs: "Running; 29 Dec is the last day of the current cars", trains: "Regular trains only", sale: "00:00 JST on 28 – 29 Nov" },
  { dates: "30 Dec 2026 – 28 Feb 2027", runs: "Winter closure", trains: "No trains", sale: "—" },
];

const steps = [
  {
    title: "Check your date against the operating calendar first",
    desc: `Nothing else matters if the train is not running. The line runs to 29 December 2026, closes from 30 December to 28 February 2027 and reopens on 1 March 2027. The operator also closes on set dates inside each season, which are marked on its yearly calendar. Checked ${CHECKED}.`,
  },
  {
    title: "Book online as soon as the window opens, at midnight JST",
    desc: "For rides in 2026, sales open at midnight one month before the boarding date. For rides from 1 March 2027, they open at midnight 30 days before, except 1 March itself, which goes on sale on 1 February 2027 at about 10:00. Stations do not sell advance tickets. In the autumn foliage weeks, the good dates go first.",
  },
  {
    title: "Pick the car and the seat, not just the date",
    desc: "The reservation form asks for a car number and a seat letter from A to D within a four-person box. The operator's FAQ says A and D are the window seats, and that C and D face forward on trains to Kameoka, A and B on trains to Saga. Car 5, the open-air Rich car, has to be chosen explicitly — select \"No. 5\" on the form, up to 29 December 2026. The operator does not publish a river-side or mountain-side rule for cars 1 to 4, so if the view is the point, the open car is the answer rather than a seat letter.",
  },
  {
    title: "Show the QR code on the day",
    desc: "The operator's FAQ says the QR code only appears on the day of boarding, on a smartphone or tablet, and a printed voucher alone will not get you on. Cancellation is free until 23:59 the day before, and you can change seats on the same train up to three times by then. On the day, there are no refunds or changes.",
  },
  {
    title: "If it is sold out, turn up for a same-day ticket",
    desc: "Same-day tickets are sold first-come, first-served at the station counters — every station except Torokko Hozukyo. The operator gives opening times of about 08:35 at Torokko Saga, 08:50 at Torokko Arashiyama and 09:10 at Torokko Kameoka, and says a limited number of standing tickets go on sale once the reserved seats have gone.",
  },
  {
    title: "Book the boat separately, and in the right direction",
    desc: `The Hozugawa-kudari boat runs downstream from Kameoka to Arashiyama — the opposite direction to the train — which is why the pairing works. Kameoka City publishes ¥6,000 for an adult and ¥4,500 for a child aged 4 to elementary school, about two hours, with the main season 10 March to 30 November, heated winter boats from mid-December to 9 March, no service 29 December to 4 January, and suspension in bad weather or high water. Checked ${BOAT_CHECKED}.`,
  },
];

// The five questions in FAQPage (rule: 3 to 5). The older questions stay on the page
// as "More questions" below, but are not repeated in the structured data.
const faqItems = [
  {
    q: "When should I book the Sagano Romantic Train?",
    a: `At 00:00 Japan time one month before your ride, on the operator's website — tickets for a date go on sale on the same date the month before, so 29 December 2026 opens at 00:00 on 29 November. Book at that moment for the autumn colour, which the operator puts at mid-November to early December, because every seat is reserved and the operator does not say how fast a date sells. For rides from 1 March 2027 the window becomes 30 days, and 1 March itself goes on sale on 1 February 2027 at about 10:00. Cancellation is free until 23:59 the day before. Checked ${CHECKED}.`,
  },
  {
    q: "Can I buy Sagano Romantic Train tickets on the day?",
    a: `Yes, at the Torokko Saga, Torokko Arashiyama and Torokko Kameoka counters, first come first served, but not at Torokko Hozukyo. The operator gives sales start times of about 08:35, 08:50 and 09:10, with all three opening around 08:35 at busy times, and sells a limited number of standing tickets per car once the reserved seats have gone. When those are gone the train is full. Counters take cash, credit cards and IC cards other than PiTaPa. Checked ${CHECKED}.`,
  },
  {
    q: "Which direction is better on the Sagano Romantic Train?",
    a: `Torokko Saga to Torokko Kameoka for most people, because the Hozugawa boat runs the other way, from Kameoka back down to Arashiyama, so the two make one loop. Ride Kameoka to Saga instead if you want to finish at the bamboo grove or catch the light-up, which the operator says can be seen from the 16:30 train out of Kameoka. The fare is the same ${ADULT} either way. The operator's FAQ says seats C and D face forward on trains to Kameoka, and A and B on trains to Saga. Checked ${CHECKED}.`,
  },
  {
    q: "Is the Sagano train running in winter 2026-27?",
    a: `Only until 29 December 2026. It runs every day from 1 November to 29 December except Wednesday 16 December, then closes from 30 December 2026 to 28 February 2027 and reopens on 1 March 2027 with the new train. The operator's 2026 calendar marks 30 and 31 December as winter closure, and its 2027 schedule starts on 1 March. Checked ${CHECKED}.`,
  },
  {
    q: "What changes with the new Sagano train in 2027?",
    a: `From 1 March 2027 a new five-unit train replaces the current cars, which retire on 29 December 2026. A seat fee of ${SEAT_FEE_ADULT} (child ${SEAT_FEE_CHILD}) is added to the unchanged ${ADULT} fare, so an adult seat is ${ADULT_2027}; the covered deck of each car is fare only; and the Premium Cabin Rankyo in car 4 costs ¥9,000 a room for up to 6 people plus fares. Online sales move to 30 days before the ride. The first train is Sagano No. 3 at 10:02 on 1 March. Checked ${CHECKED}.`,
  },
];

const moreFaqItems = [
  {
    q: "How much are Sagano Romantic Train tickets?",
    a: `Until 29 December 2026, ${ADULT} for an adult and ${CHILD} for a child aged 6 to 11, one way, for the whole 7.3 km line between Torokko Saga and Torokko Kameoka — the fare is flat rather than by distance. Groups of 15 or more pay ¥800 and ¥400, and student groups ¥710 and ¥360, on the operator's own fare table; there is no group discount on same-day tickets. A pet in a carrier is a ¥260 hand-luggage charge. Figures checked ${CHECKED}.`,
  },
  {
    q: "How long is the Sagano Romantic Train ride, and how far does it go?",
    a: "About 25 minutes over 7.3 km, from Torokko Saga through Torokko Arashiyama and Torokko Hozukyo to Torokko Kameoka, following the Hozugawa gorge. Departures from Torokko Saga run roughly hourly from 09:02 to 16:02, with extra services at busy times of year. It is a one-way journey, not a loop — you have to plan how you are getting back before you book.",
  },
  {
    q: "Which days does the Sagano Romantic Train not run?",
    a: `The operator closes on set dates inside the season as well as in winter. In 2026 the one closed date left before the season ends is 16 December. On the 2027 calendar, most closed dates are Wednesdays outside the busy weeks, starting with 10 March and 14 April, and the line does not close at all in November. The operator says closed dates can change, so check its calendar for your date. Checked ${CHECKED}.`,
  },
  {
    q: "When is the last day to ride the Rich car?",
    a: `Tuesday 29 December 2026, if the date holds. The operator says the current cars are due to retire with that day's service, which includes open-air car 5, and its release on the new train describes glass-sided cars with a covered deck instead. Group bookings cannot use car 5, and seats on the last days go on sale one month ahead, so 29 December opens at midnight Japan time on 29 November. Checked ${CHECKED}.`,
  },
  {
    q: "Which side of the train should you sit on for the river?",
    a: "On the current train, the operator publishes a seat map — cars 1 to 4 have windowed four-person boxes with seats lettered A to D — and its FAQ says A and D are the window seats, with C and D facing forward on trains to Kameoka and A and B on trains to Saga. It does not publish which side of the train faces the Hozugawa, so any confident claim about a left or right side is somebody's guess rather than the railway's. The answer that is actually in the operator's own material is car 5, the open-air \"Rich\" car: no windows, a glass ceiling, and the gorge on both sides. It has to be selected explicitly when you book.",
  },
  {
    q: "Is car 5, the open-air Rich car, worth it?",
    a: "Up to 29 December 2026, it is the reason to ride the line rather than take the ordinary JR train through the same valley, and it is the only car where the view does not depend on which seat you drew. The trade-offs are published and real: no windows, so it may get wet inside in the rain; umbrellas are not allowed on board; and the operator states there is no refund for rain. Bring a raincoat and look at the forecast the day before. If the forecast is bad, a seat in cars 1 to 4 is the better booking.",
  },
  {
    q: "How do you get to Torokko Saga and Torokko Kameoka stations?",
    a: "Torokko Saga is adjacent to Saga-Arashiyama Station on the JR Sagano Line — about a five-minute walk — and also about five minutes from Randen Saga on the Keifuku Arashiyama line, or twenty minutes on foot from Hankyu Arashiyama. At the far end, Torokko Kameoka is about a ten-minute walk from Umahori Station on the JR Sanin (Sagano) Line, which is what makes a train-up, JR-back day easy to arrange.",
  },
  {
    q: "Should you add the Hozugawa River boat ride?",
    a: `It is the natural other half of the day, because the boat runs the opposite way: downstream from Kameoka to Arashiyama, so you finish where you started. Kameoka City publishes ¥6,000 for an adult and ¥4,500 for a child from 4 years old to elementary school, about two hours on the water, with the main season 10 March to 30 November and heated covered boats from mid-December to 9 March. There is no service 29 December to 4 January, and the boats are suspended in bad weather or high water — which is worth knowing before you build a non-refundable day around them. Checked ${BOAT_CHECKED}.`,
  },
  {
    q: "Is the Sagano Romantic Train worth it with children?",
    a: `Yes, and the pricing is friendly to it: ${CHILD} a child against ${ADULT} an adult until 29 December 2026 (${CHILD_2027} and ${ADULT_2027} with a seat from 1 March 2027), with a 25-minute ride that is short enough not to outlast anyone's patience. Two practical notes from the operator's own material: pushchairs have to be folded on board, and there are two wheelchair spaces on the train. Guide dogs and assistance dogs may travel; other pets need a carrier and the ¥260 charge. Car 5 is the one children ask for and also the one with no windows, so decide that by the weather rather than by vote.`,
  },
];

const TITLE = "Sagano Romantic Train Tickets 2026: When to Book & Seats";
const DESCRIPTION =
  "When to book the Sagano Romantic Train: seats open at 00:00 JST one month ahead, ¥880 one way. Nov–Dec 2026 running days, winter closure and links.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/sagano-romantic-train-tickets") },
});

export default function SaganoRomanticTrainTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/sagano-romantic-train-tickets" />
        {hreflangLinks("/guides/attractions/sagano-romantic-train-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/sagano-romantic-train-tickets" />
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
              route: "/guides/attractions/sagano-romantic-train-tickets",
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
                  name: "Sagano Romantic Train Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/sagano-romantic-train-tickets",
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Sagano Romantic Train Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Sagano Romantic Train Tickets 2026: <br />When to Book, Seats and Running Days
          </h1>
          <p className={styles.heroSubtitle}>
            Kyoto&apos;s torokko train up the Hozugawa gorge. Seats open a month ahead, the current cars
            retire on 29 December, the line closes until March, and a new train starts on 1 March 2027.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official operator fares", "New train from 1 March 2027"].map((t) => (
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

        {/* Answer-first: the first body paragraph, ahead of the Quick Answer box. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>When to book the Sagano Romantic Train:</strong> tickets go on sale on the operator&apos;s
            website at <strong>00:00 Japan time one month before you ride</strong>, so 29 December 2026, the
            last day of the current train, opens at 00:00 on 29 November. In the autumn colour, which the
            operator puts at <strong>mid-November to early December</strong>, book at that midnight: the
            operator does not publish a sell-out time, and once web seats are gone only same-day seats and a
            limited number of standing tickets are left at the station counters. The fare is{" "}
            <strong>{ADULT}</strong> adult and <strong>{CHILD}</strong> child one way, the line is{" "}
            <strong>closed from 30 December 2026 to 28 February 2027</strong>, and from{" "}
            <strong>1 March 2027</strong> a new train runs with a {SEAT_FEE_ADULT} seat fee, making a seat{" "}
            <strong>{ADULT_2027}</strong>, sold <strong>30 days</strong> ahead. Official figures checked{" "}
            {CHECKED}.
          </p>
        </section>

        {/* Same-day booking block, straight under the answer. Rates: the torokko ticket is
            a rail ticket (assume the 5% transport band); the guided days and the walk are
            tours (6.5%); the Hozugawa boat is an activity ticket; the Klook eSIM pays 20%.
            19 Nov 2026 (task-jtk-20261119-04, Act): position checked — already directly under the
            answer — and given the "Book this trip" label shared by the other AI-landing pages. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Book this trip</span>
          <h2 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>
            Book the Torokko Seat and the Rest of the Day
          </h2>
          <p className={styles.bodyText}>
            The seat is the only part of an Arashiyama day with a hard sales window. The boat back down, a
            guided walk and mobile data can be booked in the same sitting. Open a listing for your date&apos;s
            availability and current price.
          </p>
          {/* 22 Nov 2026 (task-jtk-20261122-04): one action button for the ticket, a line on
              the winter closure, then the same-day bookings as three cards. The Hozugawa boat
              ticket button left this row; it stays in the boat section and the FAQ block. */}
          <div className={styles.pickCtaRow}>
            <KlookLink href={TICKET_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Sagano train dates &amp; prices on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
            Pick your ride date on the listing to see the price and the seats left. The current train&apos;s last
            run is 29 December 2026, and the line does not run from 30 December 2026 to 28 February 2027.
          </p>
        </section>

        <KlookSameDayCards heading="What to Book for the Same Arashiyama Day" cards={SAGANO_SAME_DAY} />

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Adult, to 29 Dec 2026</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Adult seat, from 1 Mar 2027</p>
                <p className={styles.verdictStatValue}>{ADULT_2027}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Winter closure</p>
                <p className={styles.verdictStatValue}>30 Dec – 28 Feb</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Booking opens</p>
                <p className={styles.verdictStatValue}>1 month ahead; 30 days from Mar 2027</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              The full <strong>7.3 km</strong> run goes between <strong>Torokko Saga</strong> in Arashiyama
              and <strong>Torokko Kameoka</strong>, along the Hozugawa gorge, with departures from Torokko
              Saga roughly hourly from <strong>09:02 to 16:02</strong>. The child fare is for ages 6 to 11.
              Same-day tickets are sold first-come, first-served at every torokko station except Hozukyo.
              The <strong>Japan Rail Pass is not valid</strong> on this train. Klook sells the ticket and
              guided days that include it. Fares and dates are from the operator&apos;s own pages, read on{" "}
              {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Train + Hozugawa Boat Day →
              </KlookLink>
              <KlookLink href={TICKET_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Torokko Ticket Only →
              </KlookLink>
              <GygCompareButton slug="sagano-romantic-train-tickets" listing={gygArashiyama} />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Table 1: when and where to book */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>When Should You Book the Sagano Romantic Train?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            At 00:00 Japan time on the same date one month before your ride, on the operator&apos;s website.
            For rides from 1 March 2027 that becomes 30 days before, so 1 April 2027 opens at 00:00 on 2
            March; the one exception is 1 March 2027, on sale from about 10:00 on 1 February 2027.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where to book", "When it opens", "Cost and changes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.method}>
                      <td className={styles.tdProvider}>{row.method}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.opens}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {`Last checked: ${LAST_CHECKED}. Sources:`} the operator&apos;s{" "}
            <a href="https://www.sagano-kanko.co.jp/faq/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", fontWeight: 600 }}>
              FAQ
            </a>
            ,{" "}
            <a href="https://www.sagano-kanko.co.jp/ticket/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", fontWeight: 600 }}>
              fares and tickets page
            </a>
            {" "}and{" "}
            <a href="https://www.sagano-kanko.co.jp/news/5535/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", fontWeight: 600 }}>
              23 October 2026 release
            </a>
            . Changing the date or the number of people online means cancelling and buying again.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Torokko Dates on Klook →
            </KlookLink>
            <KlookLink href={TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Guided Train + Boat Day →
            </KlookLink>
          </div>
        </section>

        {/* Table 3: Nov-Dec 2026 running days */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Running days</span>
          <h2 className={styles.sectionTitle}>Is the Sagano Romantic Train Running in November and December 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, every day from 1 November to 29 December 2026 except Wednesday 16 December. Evening extra
            trains run on most autumn dates, and the line closes for winter from 30 December.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Dates", "Status", "Trains", "Goes on sale"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calendarRows.map((row) => (
                    <tr key={row.dates}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.dates}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.runs}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.trains}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {`Last checked: ${LAST_CHECKED}. Sources:`} the operator&apos;s{" "}
            <a href="https://www.sagano-kanko.co.jp/news/5197/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", fontWeight: 600 }}>
              light-up release of 18 September 2026
            </a>
            {" "}and its{" "}
            <a href="https://www.sagano-kanko.co.jp/train-info/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", fontWeight: 600 }}>
              operating calendar
            </a>
            . Extra trains: 81 leaves Torokko Saga at 17:10 and 82 leaves Torokko Kameoka at 17:43; 91
            leaves Saga at 18:26 and 92 leaves Kameoka at 18:59. The operator says closed dates and extra
            trains can be added or changed, and that if a booked train is cancelled the fare goes back to your
            card automatically.
          </p>
        </section>

        {/* Table 2: direction */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Direction</span>
          <h2 className={styles.sectionTitle}>Which Direction Is Better: Saga to Kameoka or Kameoka to Saga?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Saga to Kameoka for most trips, because the Hozugawa boat brings you back to Arashiyama. The fare
            is {ADULT} either way; what changes is the departure times, which seats face forward and where
            you end up.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Direction", "Departures", "Seats facing forward", "Why pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {directionRows.map((row) => (
                    <tr key={row.dir}>
                      <td className={styles.tdProvider}>{row.dir}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.times}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.seats}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {`Last checked: ${LAST_CHECKED}. Sources:`} the operator&apos;s{" "}
            <a href="https://www.sagano-kanko.co.jp/faq/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", fontWeight: 600 }}>
              FAQ
            </a>
            {" "}(seats and through tickets) and{" "}
            <a href="https://www.sagano-kanko.co.jp/train-info/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", fontWeight: 600 }}>
              timetable
            </a>
            . The operator does not publish crowd levels by direction or which side faces the river; the
            open car 5 sees both sides until 29 December 2026.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={BOAT_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Hozugawa Boat Back to Arashiyama →
            </KlookLink>
            <GygCompareButton slug="sagano-romantic-train-tickets" listing={gygHozugawaKudari} />
          </div>
        </section>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Sagano Romantic Train?</h2>
          <p className={styles.bodyText}>
            It is a 7.3 km sightseeing railway along the old Sanin main line, running from{" "}
            <strong>Torokko Saga</strong> beside Saga-Arashiyama station, through{" "}
            <strong>Torokko Arashiyama</strong> and <strong>Torokko Hozukyo</strong>, to{" "}
            <strong>Torokko Kameoka</strong>. The rolling stock is converted freight wagons: wooden benches,
            bare bulbs, windows that slide open, and a lot of noise. Car 5, the &quot;Rich&quot; car, has no
            windows at all and a glass ceiling. That train retires on 29 December 2026.
          </p>
          <p className={styles.bodyText}>
            Two things make it a booking decision rather than a sightseeing one. The first is that every seat
            is reserved and numbered, and the online window opens a month ahead — so autumn dates are decided
            a month before you arrive. The second is that it is a <em>one-way</em> line with a seasonal
            shutdown. Working out how you get back, and whether the train is running at all on your date,
            matters more than which seat you pick. Our{" "}
            <Link href="/guides/attractions/kyoto-2-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              2 day Kyoto itinerary
            </Link>
            {" "}and{" "}
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              3 day Kyoto itinerary
            </Link>
            {" "}show where the ride fits in a Kyoto trip.
          </p>
        </section>

        {/* Fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Are Sagano Romantic Train Tickets?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Fare", "What it means"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fares checked {CHECKED} against the operator&apos;s fare page and its press release of 23 October
            2026. These are the fares up to 29 December 2026. Note what is <em>not</em> on this table:
            there is no premium charge for car 5, the open-air car — it costs the same {ADULT}, which is why
            it is the first thing to go when a date opens. For the Kyoto admissions a torokko day usually
            sits beside, our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>
            {" "}carries the check date for each one.
          </p>
        </section>

        {/* 2026 v 2027: sits straight after the fare table so the fare is never read alone. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>2027 changes</span>
          <h2 className={styles.sectionTitle}>What Changes on the Sagano Romantic Train in 2027?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            From 1 March 2027 there is a new train and a new seat fee. The fare itself stays at {ADULT} and{" "}
            {CHILD}, so an adult seat rises from {ADULT} to {ADULT_2027}. Online sales also move to 30 days
            before the ride.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What changes", "2026 (to 29 December)", "2027 (from 1 March)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {changeRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.now}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.next}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Checked {CHECKED} against the operator&apos;s{" "}
            <a href="https://www.sagano-kanko.co.jp/news/5535/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", fontWeight: 600 }}>
              press release of 23 October 2026
            </a>
            {" "}and its 2026 calendar. The release does not say how deck places are sold, whether standing
            tickets continue, or what group fares will be from March 2027. The operator&apos;s new-train page
            lists a further release as coming soon, so check its site before you plan around those.
          </p>
        </section>

        {/* Season */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>When it runs</span>
          <h2 className={styles.sectionTitle}>When Does the Sagano Romantic Train Run — and When Is It Closed?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            This is the row of the page that ruins plans. The line shuts for two months of the winter, and
            there are closed dates inside the season as well. On 2026 evenings, the light-up is the reason
            to pick a late train.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Period", "Status", "What the operator says"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.period}>
                      <td className={styles.tdProvider}>{row.period}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.status}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Season and closure dates checked {CHECKED}. If your Kyoto dates fall in January or February,
            the torokko is simply not an option that trip — the{" "}
            <Link href="/guides/attractions/things-to-do-kyoto" style={{ color: "var(--text)", fontWeight: 600 }}>
              things to do in Kyoto
            </Link>
            {" "}round-up has the walk-in alternatives.
          </p>
          {/* An AI answer will not know whether the train runs on a given date, which is
              exactly what this CTA is for: a tour listing shows live availability. */}
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={arashiyamaSaganoOptionalTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Your Date&apos;s Availability →
            </KlookLink>
            <GygCompareButton slug="sagano-romantic-train-tickets" listing={gygArashiyama} />
          </div>
        </section>

        {/* Winter */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Winter</span>
          <h2 className={styles.sectionTitle}>Is the Sagano Romantic Train running in winter?</h2>
          <p className={styles.bodyText}>
            It runs until 29 December 2026, then <strong>stops from 30 December 2026 to 28 February
            2027</strong>. The operator&apos;s 2026 calendar marks 30 and 31 December as winter closure days,
            and its 2027 schedule has no dates before 1 March. It has not published a separate notice for
            January and February 2027, so those dates come from the two calendars. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Arashiyama is still worth the trip in winter. The{" "}
            <Link href="/guides/attractions/arashiyama-bamboo-forest-tour" style={{ color: "var(--red)", fontWeight: 600 }}>
              Arashiyama bamboo forest
            </Link>
            {" "}is open and free all year, and an early walk through the grove pairs well with{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental" style={{ color: "var(--red)", fontWeight: 600 }}>
              kimono rental in Arashiyama
            </Link>
            . Kameoka City also lists heated Hozugawa boats from mid-December to 9 March, with no service
            from 29 December to 4 January (checked {BOAT_CHECKED}). To sleep close to the grove,{" "}
            <Link href="/guides/attractions/where-to-stay-in-kyoto" style={{ color: "var(--red)", fontWeight: 600 }}>
              where to stay in Kyoto
            </Link>
            {" "}compares Arashiyama with the Kyoto Station area.
          </p>
        </section>

        <KlookTourPicks
          heading="What can I book in Arashiyama if the train is closed?"
          intro="The train and boat day comes first for anyone who can move their date. Klook says that tour is cancelled and refunded in full if the train is suspended, so it only works from now to 29 December 2026 or from 1 March 2027 (listing read 7 November 2026). The rest work on any winter date. Open a listing for availability and the current price."
          tours={[
            {
              ...saganoHozugawaGuaranteedTour,
              desc: "For dates up to 29 December 2026 or from 1 March 2027: the torokko one way, the river boat back down to Arashiyama, and free time in the bamboo grove",
            },
            arashiyamaEarlyMorningWalk,
            {
              title: "Hotels in Arashiyama",
              desc: "Sleep near the grove and be there before the crowds",
              url: ARASHIYAMA_HOTELS_URL,
            },
            {
              title: "Hotels near Kyoto Station",
              desc: "The JR Sagano Line to Saga-Arashiyama starts here, about 11 minutes by Rapid",
              url: KYOTO_STATION_HOTELS_URL,
            },
            {
              title: klookEsim.name,
              desc: "A Japan eSIM delivered as a QR code voucher, for maps and booking pages on your phone",
              url: klookEsim.url,
            },
            {
              ...saganoRomanticTrainTicket,
              desc: "The one-way torokko seat, if your dates fall on either side of the closure",
            },
          ]}
        />

        {/* Sold out */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Sold out</span>
          <h2 className={styles.sectionTitle}>What if the Sagano Romantic Train is sold out?</h2>
          <p className={styles.bodyText}>
            A sold-out website does not end the plan. The operator says it still sells <strong>same-day
            tickets</strong> at the Torokko Saga, Torokko Arashiyama and Torokko Kameoka counters, but not at
            Torokko Hozukyo. Sales start at about 08:35, 08:50 and 09:10 respectively, and all three open
            around 08:35 at peak times. Once reserved seats have gone, a limited number of{" "}
            <strong>standing tickets</strong> is sold for each car until they reach capacity. The operator
            also warns that you may not be able to board if a train is full.
          </p>
          <p className={styles.bodyText}>
            Because cancellation is free until 23:59 the day before, it can also be worth checking the website
            again that evening. If you would rather not queue, a guided day takes the train and the boat as
            one booking, so check it for your date. If the whole train is out, the JR Sagano Line still takes
            you to Arashiyama, though the Japan Rail Pass cannot be used on the torokko itself. Checked{" "}
            {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Train + Boat Day →
            </KlookLink>
            <KlookLink href={arashiyamaEarlyMorningWalk.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Arashiyama Walking Tour →
            </KlookLink>
            <KlookLink href={ARASHIYAMA_HOTELS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Arashiyama Hotels →
            </KlookLink>
            <KlookLink href={KYOTO_STATION_HOTELS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Kyoto Station Hotels →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Klook eSIM →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Torokko Ticket on Klook →
            </KlookLink>
            <GygCompareButton slug="sagano-romantic-train-tickets" listing={gygArashiyama} />
          </div>
        </section>

        {/* Cars and seats */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Seats</span>
          <h2 className={styles.sectionTitle}>Which Car and Which Seat Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The answer depends on your date, because the train changes on 1 March 2027.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Car", "What it is", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {carRows.map((row) => (
                    <tr key={row.car}>
                      <td className={styles.tdProvider}>{row.car}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            On the question everyone asks — <strong>which side faces the river</strong> — the honest answer is
            that the operator does not publish one for the current train. Its seating material describes the car layout (four-person
            boxes, seats lettered A to D) and the rules for car 5, and stops there. So treat any left-or-right
            advice you read as a guess, and take the open car if the gorge is the reason you are on the train.
            Accessibility, from the same pages: two wheelchair spaces on the train, guide and assistance dogs
            welcome, pushchairs folded, and pets only in a carrier within roughly 70 cm and 10 kg for a ¥260
            charge. Checked {CHECKED}.
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Torokko Saga and Torokko Kameoka?</h2>
          <p className={styles.bodyText}>
            <strong>Torokko Saga</strong> is adjacent to <strong>Saga-Arashiyama Station</strong> on the JR
            Sagano Line, about a five-minute walk. The operator also gives about five minutes from{" "}
            <strong>Randen Saga</strong> on the Keifuku Arashiyama line and about twenty minutes on foot from{" "}
            <strong>Hankyu Arashiyama</strong>. From Kyoto Station, the JR Sagano Line is the obvious approach
            and runs frequently.
          </p>
          <p className={styles.bodyText}>
            <strong>Torokko Kameoka</strong>, at the far end, is about a <strong>ten-minute walk</strong> from{" "}
            <strong>Umahori Station</strong> on the JR Sanin (Sagano) Line. That is what makes the cheapest
            version of this day work: ride the torokko one way, walk to Umahori, and come back on an ordinary
            JR train. It is also the detail that catches people out if they booked the Hozugawa boat — the
            boat pier is at Kameoka, not at Torokko Kameoka, and the two are not walking distance apart. Our{" "}
            <Link href="/guides/transport/kyoto-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              getting around Kyoto guide
            </Link>
            {" "}covers the JR, subway, Randen and bus layer this sits on, and the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kansai Area Pass
            </Link>
            {" "}covers the JR legs if you are moving between Kansai cities the same week — it does not cover
            the torokko itself, which is a private railway.
          </p>
        </section>

        {/* Combination */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Train Only, Train Plus Boat, or a Guided Day?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Cost", "Time", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {combinationRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Three things no summary can answer for your date, and all three are reasons to open a listing
            rather than read one: whether the torokko is running at all that day, whether the reserved seats
            are gone, and what the cancellation terms are if the Hozugawa boats are suspended for high water.
            The boat fares above are Kameoka City&apos;s published figures (¥6,000 adult, ¥4,500 child aged 4
            to elementary school, about two hours), checked {BOAT_CHECKED}; what they do not tell you is the
            availability on 18 November.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Guided Train + Boat Day →
            </KlookLink>
            <KlookLink href={BOAT_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Hozugawa Boat Ticket →
            </KlookLink>
            <GygCompareButton slug="sagano-romantic-train-tickets" listing={gygHozugawaKudari} />
          </div>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Book Sagano Romantic Train Tickets?</h2>
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
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Toei Kyoto Studio Park sells a set of a one-way Sagano Romantic Train ticket with park entry: see <Link href="/guides/attractions/toei-kyoto-studio-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Toei Kyoto Studio Park tickets</Link>.
          </p>
        </section>
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
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "2rem" }}>More Questions</h3>
          <div className={styles.faqList}>
            {moreFaqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{faqItems.length + i + 1}. {item.q}</span>
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
          heading="Guided Days That Include the Torokko"
          intro="All four hold the torokko seat for you, which is the part a month-ahead reservation window makes awkward. The first two pair the train with the Hozugawa boat; the third adds Kiyomizu-dera; the fourth has the ride as a selectable option, which is the one to open if your date falls near the winter shutdown. Open a listing for availability and the current price on your dates."
          tours={[saganoHozugawaGuaranteedTour, arashiyamaHozukyoHalfDayTour, saganoArashiyamaKiyomizuTour, arashiyamaSaganoOptionalTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 6 Nov 2026: the grove, the walk and who needs a guide. */}
            <Link href="/guides/attractions/arashiyama-bamboo-forest-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Arashiyama Bamboo Forest Tour (2026): Best Time, Tours and Routes From Kyoto</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): Temples, Timing and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 3 4-3 3 5-3 2v11H8V10L5 8z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Kimono Rental (2026): Which Area, What&apos;s Included, When to Return</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto and Nara Day Tour From Osaka (2026): Which Itinerary to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/arima-onsen-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 14h14v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
                  <path d="M9 10c0-2 1.5-2.5 1.5-4.5M14 10c0-2 1.5-2.5 1.5-4.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Arima Onsen Day Trip (2026): From Osaka or Kobe, and What the Baths Cost</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="12" rx="2" />
                  <path d="M3 11h18M7 21l1.5-4M17 21l-1.5-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Trains &amp; Taxis Explained</p>
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
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan, Day by Day</p>
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
            <h2 className={styles.ctaBannerTitle}>Ride up, float back down</h2>
            <p className={styles.ctaBannerDesc}>
              The torokko one way and the Hozugawa boat the other is the one version of this day that ends
              where it started. Reserved seats open a month ahead and the line shuts for the winter, so check
              your date before you build the rest of the day around it.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Train + Boat Day →
              </KlookLink>
              <KlookLink href={TICKET_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Torokko Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
