import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  fujiPhotographyDayTour,
  kawaguchikoAnswerCards,
  kawaguchikoPrivateDayTour,
  kawaguchikoYamanakakoBusTour,
  mtFujiPass,
  tokyoMtFujiHighwayBus,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * The Kawaguchiko-only day trip, as distinct from the two Fuji guides either side of it:
 * mt-fuji-day-trip-tokyo is the independent route to the mountain in general, and
 * mt-fuji-day-tour-from-tokyo compares the coach tours that go to the Subaru Line Fifth
 * Station. This page is the north-shore day — Chureito Pagoda, Oishi Park, the ropeway,
 * the lake boat and Oshino Hakkai — and nothing above the lake.
 *
 * Every fare, hour and journey time below was read off the operator's own site on
 * 21 Oct 2026 and is dated in the copy: bus.fujikyu.co.jp (highway bus and the
 * Kawaguchiko sightseeing bus), fujikyu-railway.jp (Otsuki–Kawaguchiko fares),
 * mtfujiropeway.jp (ropeway), fujigokokisen.jp (the lake boats) and
 * vill.oshino.lg.jp plus en.fujiyoshida.net (Oshino Hakkai and Arakurayama Sengen Park).
 * The Mt. Fuji Pass figures come from lib/attraction-prices.ts, which carries its own date.
 *
 * No Klook price appears: Klook answers automated reads of its product pages with HTTP
 * 403, so there is no figure here we could have verified.
 *
 * Re-read on 17 November 2026 (task-jtk-20261117-R03, "Tokyo to Kawaguchiko"):
 *
 *   bus.fujikyu.co.jp/en/highway/fujisan/shinjuku-kawaguchiko/ and /highway/detail/id/1
 *       Fujikyu Bus + Keio Bus; Busta Shinjuku → Kawaguchiko Sta. approx 1h45; ¥2,200 adult,
 *       ¥2,000 paid online; child half; reserved seats, sales from one month before until
 *       10 min before departure; arrivals may be delayed by road conditions and extreme
 *       weather with no refund for a late arrival. Timetable JSON on the Japanese page:
 *       first 06:45 → 08:30, 07:15 → 09:00; last back Kawaguchiko 20:15 → 22:00
 *   fujikyu-railway.jp/fujikaiyuu/   Fuji Excursion: Shinjuku → Kawaguchiko fastest 1h53;
 *       ¥4,200 one way (fare ¥2,580 + limited express ¥1,620); Shinjuku → Shimoyoshida
 *       ¥4,010; four round trips a day plus a seasonal one (93/94 weekdays 22 Oct–29 Dec and
 *       12 Jan–26 Feb, not 4–8 Jan; 81/78 weekends and holidays 24 Oct–28 Feb); all seats
 *       reserved; on sale one month before from 10:00. Weekday down 7:30/8:30/9:30/10:30 →
 *       9:28/10:26/11:28/12:24; No. 36 Shimoyoshida 15:12 → Shinjuku 16:59 (16:58 weekends)
 *   jreast.co.jp/en/multi/fuji/about.html   JR East's own Fuji page (Fuji Excursion to
 *       Kawaguchiko Station)
 *   mtfujiropeway.jp   closed 7–18 Dec 2026 for annual inspection; short hours 25–26 Nov
 *       (last up 15:00); snow or ice can delay opening or close it for the day
 *   eco.mtk.nao.ac.jp/koyomi (NAOJ, Kofu)   sunset 16:39 on 15 Nov, 16:33 on 1 Dec,
 *       16:34 on 15 Dec, 16:55 on 15 Jan, 17:27 on 15 Feb
 *   japan.travel (JNTO) Lake Kawaguchi + Fuji Five Lakes itinerary   winter is the best time
 *       to see Mt. Fuji clearly; mornings, before haze and cloud build
 *   Klook listing 100747 (www.klook.com search index)   Chureito Pagoda, Oishi Park,
 *       Oshino Hakkai, the Lawson and the Hikawa clock shop — five stops, from Tokyo
 */

/** Everything on this page except the Mt. Fuji Pass was read off its operator on this date. */
const CHECKED_ISO = "2026-10-21";
const CHECKED = checkedLabel(CHECKED_ISO);
/** The transport, sunset and ropeway figures re-read for R03. */
const NOW = checkedLabel("2026-11-17");
const LAST_CHECKED = "2026-11-17";

const OFFICIAL = [
  { label: "Fujikyu Bus (Shinjuku–Kawaguchiko line, run with Keio Bus)", href: "https://bus.fujikyu.co.jp/en/highway/fujisan/shinjuku-kawaguchiko/" },
  { label: "Keio Highway Bus reservations", href: "https://www.highwaybus.com/gp/index" },
  { label: "Fujikyu Railway, Fuji Excursion fares and timetable", href: "https://www.fujikyu-railway.jp/fujikaiyuu/" },
  { label: "JR East, Mt. Fuji", href: "https://www.jreast.co.jp/en/multi/fuji/about.html" },
];

/** Table 1 (R03): the three ways from Tokyo to Kawaguchiko, verdict first. */
const compareRows = [
  {
    item: "Verdict",
    bus: "Best for most day trips: cheapest, and a bus every 10–30 minutes",
    train: "Best if the Chureito Pagoda is the point, or the road may be slow",
    tour: "Best for five stops in one day with no timetable to manage",
  },
  {
    item: "Tokyo → Kawaguchiko",
    bus: "About 1 hr 45 min, Busta Shinjuku → Kawaguchiko Station, no change",
    train: "1 hr 53 min at fastest, Shinjuku → Kawaguchiko, no change (Fuji Excursion)",
    tour: "One coach from a Tokyo meeting point; the itinerary sets the day",
  },
  {
    item: "One-way fare (adult)",
    bus: "¥2,200, or ¥2,000 paid online; child half",
    train: "¥4,200 (fare ¥2,580 + limited express ¥1,620)",
    tour: "Sold as a day package; see the listing for your date",
  },
  {
    item: "How often",
    bus: "First bus 06:45; last back from Kawaguchiko 20:15",
    train: "Four a day each way, plus one on set winter dates; last back 17:41",
    tour: "One morning departure",
  },
  {
    item: "Do you need to book?",
    bus: "Yes, seats are reserved; on sale one month ahead, to 10 min before",
    train: "Yes, every seat is reserved; on sale one month ahead from 10:00",
    tour: "Yes; the listing shows its cancellation terms",
  },
  {
    item: "Winter note",
    bus: "Snow or traffic can delay arrival, and the fare is not refunded for it",
    train: "Off the road, so a snow day hits it less than the bus",
    tour: "Fixed times: if Fuji is in cloud, the coach still moves on",
  },
];

/** Table 2 (R03): a weekday by the clock, bus out and Fuji Excursion back. */
const itineraryRows = [
  {
    time: "Answer",
    what: "Bus out at 07:15, the lake in the morning, the pagoda after lunch, and the 15:12 Fuji Excursion home before dark",
    note: "Out ¥2,000–¥2,200, back ¥4,010",
  },
  {
    time: "07:15 → 09:00",
    what: "Highway bus, Busta Shinjuku (4th floor, south exit) → Kawaguchiko Station",
    note: "Reserved seat; the 06:45 gets in at 08:30",
  },
  {
    time: "09:10",
    what: "Red Line sightseeing bus to the ropeway or Oishi Park, while the mountain is most often clear",
    note: "From ¥180 a ride; ¥1,500 day pass",
  },
  {
    time: "12:00",
    what: "Lunch by the lake, then the lake boat if there is time",
    note: "Boat ¥1,000 adult",
  },
  {
    time: "13:30",
    what: "Fujikyu train from Kawaguchiko a few stops to Shimoyoshida",
    note: "Local train, no booking",
  },
  {
    time: "14:00",
    what: "Chureito Pagoda, 398 steps up in Arakurayama Sengen Park",
    note: "About 25 min on foot from Shimoyoshida Station",
  },
  {
    time: "15:12 → 16:59",
    what: "Fuji Excursion 36, Shimoyoshida → Shinjuku (16:58 at weekends)",
    note: "¥4,010; book the seat with the bus",
  },
  {
    time: "Back-up",
    what: "Missed it? Buses leave Kawaguchiko Station for Shinjuku until 20:15",
    note: "Reserved seat, so book from your phone",
  },
];

/** Table 3 (R03): winter, December to February. */
const winterRows = [
  {
    item: "Answer",
    detail: "Leave early and plan to be heading home by about 16:30: the sun sets around 16:33–16:43 in December",
    source: "NAOJ (Kofu)",
  },
  {
    item: "Sunset",
    detail: "16:39 on 15 Nov, 16:34 on 15 Dec, 16:55 on 15 Jan, 17:27 on 15 Feb",
    source: "eco.mtk.nao.ac.jp",
  },
  {
    item: "When Fuji is easiest to see",
    detail: "Winter is the clearest season, and mornings beat afternoons, before haze and cloud build",
    source: "japan.travel (JNTO)",
  },
  {
    item: "Roads",
    detail: "Bus arrivals can run late in snow, ice, accidents or traffic, with no refund for a late arrival, so the train is the safer leg on a snow day",
    source: "bus.fujikyu.co.jp",
  },
  {
    item: "Ropeway",
    detail: "Closed 7–18 December 2026 for inspection; short hours 25–26 November (last ride up 15:00); snow or ice can delay the opening or close it for the day",
    source: "mtfujiropeway.jp",
  },
  {
    item: "Extra Fuji Excursion",
    detail: "No. 93/94 on weekdays 22 Oct–29 Dec and 12 Jan–26 Feb (not 4–8 Jan); No. 81/78 at weekends and holidays 24 Oct–28 Feb",
    source: "fujikyu-railway.jp",
  },
];
/** The pass keeps the date from the guide that verified it. */
const PASS_CHECKED = checkedLabel(PRICES.mtFujiPass.checked);

const routeRows = [
  {
    route: "Answer: highway bus, Busta Shinjuku → Kawaguchiko Station",
    time: "Listed as approximately 1 hr 45 min",
    fare: "¥2,200 adult (¥2,000 booked online); child ¥1,100 / ¥1,000",
    notes: "The default. Direct, no transfer, first bus 06:45, and the most departures of any route on the list",
  },
  {
    route: "Train: Fuji Excursion limited express, Shinjuku → Kawaguchiko",
    time: "1 hr 53 min at fastest, no change",
    fare: "¥4,200 adult (fare ¥2,580 + limited express ¥1,620)",
    notes: "Four a day each way, all seats reserved; stops at Shimoyoshida for the Chureito Pagoda",
  },
  {
    route: "Highway bus, Tokyo Station / Ueno",
    time: "About 130 min",
    fare: "From ¥2,300 adult",
    notes: "Useful if you are based on the Marunouchi or Ueno side rather than west Tokyo",
  },
  {
    route: "Highway bus, Shibuya",
    time: "About 120 min",
    fare: "From ¥2,300 adult",
    notes: "Also serves Fuji-Q Highland and Mt. Fuji Station on the way",
  },
  {
    route: "Highway bus, Haneda Airport / Shinagawa",
    time: "About 180 min",
    fare: "From ¥2,300 adult",
    notes: "Goes straight from the airport, which saves a city transfer on an arrival day",
  },
  {
    route: "Train: JR Chuo Line to Otsuki, then change to the Fujikyu Railway",
    time: "Fujikyu leg Otsuki → Kawaguchiko",
    fare: "¥1,170 adult, ¥590 child; limited express supplement ¥400 adult / ¥200 child",
    notes: "The Fujikyu portion is a private line, so a JR Pass stops at Otsuki and you pay this part",
  },
];

const stopRows = [
  {
    stop: "Arakurayama Sengen Park (Chureito Pagoda)",
    price: "No admission fee published on the official listing",
    hours: "Open 24 hours; seasonal evening illumination between 16:00 and 21:50",
    getting: "398 steps up from the park entrance; about 25 minutes on foot from Shimoyoshida Station on the Fujikyu Railway Line",
    source: "en.fujiyoshida.net",
  },
  {
    stop: "Oishi Park, on the north shore of Lake Kawaguchi",
    price: "Free to walk",
    hours: "Open park — no gate",
    getting: "Red Line sightseeing bus from Kawaguchiko Station",
    source: "bus.fujikyu.co.jp (bus route)",
  },
  {
    stop: "Mt. Fuji Panoramic Ropeway",
    price: "Round trip ¥1,200 adult and ¥600 child from 1 November 2026",
    hours: "Closed 7–18 December 2026 for annual inspection",
    getting: "Lower station is by the Kawaguchiko lakeside, a Red Line bus stop from the station",
    source: "mtfujiropeway.jp",
  },
  {
    stop: "Lake Kawaguchiko sightseeing boat",
    price: "Appare ¥1,000 adult / ¥500 child; Ensoleillé ¥1,000 / ¥500 one way, ¥1,800 / ¥900 round trip",
    hours: "Published per season — check the operator's business-hours page for your date",
    getting: "Boarding at the Kawaguchiko lakeside, near the ropeway station",
    source: "fujigokokisen.jp",
  },
  {
    stop: "Oshino Hakkai (the eight spring-water ponds)",
    price: "Free, except Sokonashi-ike: ¥300 adult (junior high and over), ¥150 child, ¥100 ages 1 to pre-school",
    hours: "The ponds can be seen 24 hours; Sokonashi-ike is inside the Hannoki Bayashi museum grounds, 09:00–17:00",
    getting: "Bus from Kawaguchiko or Fujisan Station — it is inland, away from the lake",
    source: "vill.oshino.lg.jp",
  },
];

const passRows = [
  {
    option: "Kawaguchiko sightseeing bus, 1-day pass",
    adult: "¥1,500",
    child: "¥750",
    what: "Unlimited rides on the Red, Green and Blue Lines around Kawaguchiko, Saiko and the Motosuko lakes",
  },
  {
    option: "Kawaguchiko sightseeing bus, 2-day pass",
    adult: "¥2,000",
    child: "¥1,000",
    what: "The same three lines over two consecutive days — only worth it if you stay the night",
  },
  {
    option: "Single ride on the sightseeing bus",
    adult: "From ¥180",
    child: "—",
    what: "Zone-based fare, no reservation; the Red Line is a scheduled local bus",
  },
  {
    option: "Mt. Fuji Pass, 1 day",
    adult: PRICES.mtFujiPass.adult,
    child: PRICES.mtFujiPass.child,
    what: "Unlimited buses and trains across the whole Fuji area plus the ropeway and the lake cruise — sold to foreign passport holders only",
  },
];

const whoFor = [
  {
    title: "Go by highway bus if…",
    desc: `You want the simplest version. Shinjuku to Kawaguchiko Station is listed at approximately 1 hour 45 minutes with no transfer, at ¥2,200 for an adult or ¥2,000 booked online, and the bus also runs from Tokyo Station, Shibuya, Akihabara, Ikebukuro and Haneda. It is the one route where a late start still leaves you a usable day. Fares and times read off the Fujikyu bus site on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M3 11h18" />
        <circle cx="7.5" cy="19" r="1.5" />
        <circle cx="16.5" cy="19" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Go by train if…",
    desc: `The Chureito Pagoda is the point of your day. The pagoda is at Shimoyoshida, which is a Fujikyu Railway station a few stops short of Kawaguchiko — so the train lets you do the pagoda first and the lake afterwards without doubling back. The Fujikyu leg from Otsuki is ¥1,170 for an adult and ¥590 for a child, plus ¥400 for a limited express seat, and it is a private line a JR Pass does not cover. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
  {
    title: "Take a tour if…",
    desc: "You would rather not plan the connections, or you want the Fifth Station on the mountain itself as well as the lake. A coach collapses the day into one booking and removes the two things most likely to go wrong — missing the Red Line bus, and missing the last bus home. It also removes your ability to wait out a cloud.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18l6-13 5 8 3-4 4 9z" />
        <line x1="2" y1="21" x2="22" y2="21" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Pick two or three stops, not five",
    desc: "The Kawaguchiko area is not compact. The Chureito Pagoda is on the railway several stops from the lake, Oishi Park is along the north shore, and Oshino Hakkai is inland on a different bus. Two of those plus the ropeway or the boat is a full day; attempting all of them is a day spent waiting at bus stops.",
  },
  {
    title: "Book the outbound leg, then work out the bus pass",
    desc: `The highway bus is a reserved seat, so that is the first booking. Once you know your arrival time, decide between single fares and a pass: the Kawaguchiko sightseeing bus is from ¥180 a ride on a zone fare, and the 1-day pass across the Red, Green and Blue Lines is ¥1,500 for an adult and ¥750 for a child. Three or more hops pays for the pass; two does not. Read off the Fujikyu bus site on ${CHECKED}.`,
  },
  {
    title: "Decide whether the Mt. Fuji Pass is a different question",
    desc: `It is. The Mt. Fuji Pass is ${PRICES.mtFujiPass.adult} for one day and covers unlimited buses and trains across the whole Fuji area plus the ropeway and the lake cruise, but it is sold only to foreign passport holders and your passport is checked at purchase. For a single day confined to the north shore, the ¥1,500 local bus pass plus individual tickets is usually less. Pass prices checked ${PASS_CHECKED}.`,
  },
  {
    title: "Check the ropeway before you build an afternoon on it",
    desc: `The Mt. Fuji Panoramic Ropeway publishes a round-trip fare of ¥1,200 for an adult and ¥600 for a child from 1 November 2026, and it closes entirely from 7 to 18 December 2026 for annual inspection. Occasional maintenance days also cut the last ascent short. Read off the operator's own notice on ${CHECKED}.`,
  },
  {
    title: "Fix the return leg before you start sightseeing",
    desc: "This is the step people skip and regret. Both the bus and the direct train thin out through the evening, and the Kawaguchiko area has no useful late service back to Tokyo. Book the return at the same time as the outbound and treat it as the hard edge of the day.",
  },
  {
    title: "Accept that the mountain may be in cloud",
    desc: "Fuji makes its own weather and spends a great deal of the year hidden. Nobody can sell you a guarantee, so choose stops — the lake shore, the spring-water ponds, the pagoda itself — that you would be happy with on a grey day. The cooler, drier months and the earlier part of the day give better odds.",
  },
];

/** The five questions in FAQPage (R03). */
const faqItems = [
  {
    q: "How do I get from Tokyo to Kawaguchiko?",
    a: `By highway bus from Busta Shinjuku: Fujikyu and Keio list it at approximately 1 hour 45 minutes to Kawaguchiko Station with no change, for ¥2,200 an adult or ¥2,000 paid online, with the first bus at 06:45. By train, the Fuji Excursion limited express runs from Shinjuku to Kawaguchiko in 1 hour 53 minutes at its fastest for ¥4,200 one way, four times a day. The cheaper rail route is the JR Chuo Line to Otsuki and the Fujikyu Railway from there, ¥1,170 for the Fujikyu leg. Checked ${NOW}.`,
  },
  {
    q: "Is the bus or train better to Kawaguchiko?",
    a: `The bus, for most day trips. It is ¥2,200 against ¥4,200 on the Fuji Excursion, about 8 minutes quicker on paper when the road is clear, and leaves Shinjuku every 10 to 30 minutes from 06:45, while the train runs four times a day. Take the train if the Chureito Pagoda matters most, because it stops at Shimoyoshida below the pagoda, or on a snow or holiday-traffic day, because it is off the road. A good split is bus out and the 15:12 Fuji Excursion back from Shimoyoshida. Checked ${NOW}.`,
  },
  {
    q: "Can you do Kawaguchiko as a day trip from Tokyo?",
    a: `Yes. The 07:15 bus from Shinjuku reaches Kawaguchiko Station at 09:00, which leaves time for the lake in the morning and the Chureito Pagoda after lunch, and buses back to Shinjuku run until 20:15. Plan on two or three stops, not five. In winter the sun sets at about 16:33 to 16:43 in December, so aim to be on your way home by then. Checked ${NOW}.`,
  },
  {
    q: "Do I need to book the Kawaguchiko bus?",
    a: `Yes, book it. Every seat on the Shinjuku–Kawaguchiko highway bus is reserved; sales open one month before the travel date and close 10 minutes before departure, and paying online is ¥200 cheaper than the counter. Book the return at the same time as the outbound, because it is the leg that decides when your day ends. The Fuji Excursion train is reserved-only too, on sale from 10:00 one month ahead. Checked ${NOW}.`,
  },
  {
    q: "Is a Mt Fuji day tour worth it?",
    a: `Yes, if you want more than two stops or the Fifth Station, and do not want to manage buses. A Kawaguchiko-area tour such as Klook's scenic photography day tour covers five stops in one day, including the Chureito Pagoda, Oishi Park and Oshino Hakkai, which is hard to match by public transport. On your own, the bus costs ¥2,200 each way and you choose when to leave. For which tour goes where, see our Mt. Fuji day tour comparison. Stops as listed on ${NOW}.`,
  },
];

/** Kept on the page, outside FAQPage. */
const moreFaqItems = [
  {
    q: "Is Kawaguchiko worth a day trip from Tokyo?",
    a: "Yes, if you want to look at Mt. Fuji rather than stand on it. The north shore of Lake Kawaguchi is where the photographs come from — the Chureito Pagoda above Fujiyoshida, the lake at Oishi Park, the spring-fed ponds at Oshino Hakkai — and all of it is reachable on public transport in a day. What a day trip here does not give you is the mountain itself: the Fuji Subaru Line Fifth Station is a separate journey up a toll road with no station, and that is the thing coach tours exist for.",
  },
  {
    q: "Can I take the bus from Tokyo Station, Shibuya or Haneda instead?",
    a: `Yes. The same operator runs buses from Tokyo Station and Ueno (about 130 minutes, from ¥2,300), Shibuya (about 120 minutes, from ¥2,300), Akihabara and Ikebukuro (from ¥2,200) and Haneda Airport via Shinagawa (about 180 minutes, from ¥2,300). Shinjuku has by far the most departures. Read off the Fujikyu bus site on ${CHECKED}.`,
  },
  {
    q: "How long does a Kawaguchiko day trip take?",
    a: "A full day, not a half day. The fastest direct leg is listed at about 1 hour 45 minutes each way, so three and a half hours are gone before you have seen anything, and the stops around the lake are far enough apart that moving between two of them takes a real bite out of the afternoon. Plan it as the only thing you do that day, and fix your return before you leave Tokyo.",
  },
  {
    q: "What is there to do in Kawaguchiko in one day?",
    a: `Five things carry the area, and you can fit two or three. The Chureito Pagoda in Arakurayama Sengen Park is 398 steps up from the entrance and about 25 minutes on foot from Shimoyoshida Station, open 24 hours with no admission fee published on the official listing. Oishi Park on the north shore is a free lakeside walk. The Mt. Fuji Panoramic Ropeway runs up Mt. Tenjo for a round trip of ¥1,200 adult and ¥600 child from 1 November 2026. The lake boats are ¥1,000 for an adult and ¥500 for a child. Oshino Hakkai, inland, is free to walk except Sokonashi-ike, which sits inside the Hannoki Bayashi museum grounds at ¥300 for an adult and ¥150 for a child, 09:00 to 17:00. All checked ${CHECKED}.`,
  },
  {
    q: "How do you get around once you are in Kawaguchiko?",
    a: `On the Kawaguchiko sightseeing bus, which runs three colour-coded lines — the Red Line around the north shore of Lake Kawaguchi including Oishi Park, the Green Line around Lake Saiko, and the Blue Line out to Narusawa, Shoji and Lake Motosu. It is a scheduled local bus, so there is nothing to reserve. A single ride starts at ¥180 on a zone-based fare, and an unlimited pass across all three lines is ¥1,500 for an adult and ¥750 for a child for one day, or ¥2,000 and ¥1,000 for two. Read off the Fujikyu bus site on ${CHECKED}.`,
  },
  {
    q: "Do you need the Mt. Fuji Pass for a Kawaguchiko day trip?",
    a: `Usually not. The Mt. Fuji Pass covers unlimited buses and trains across the whole Mt. Fuji area plus the ropeway and the lake cruise, at ${PRICES.mtFujiPass.adult} for one day, ¥10,200 for two and ¥12,400 for three for an adult, with half price for a child — and it is sold to foreign passport holders only, with a passport check at purchase. For one day confined to the north shore, the ¥1,500 local bus pass plus the ropeway and boat tickets individually comes to less. The pass earns its price when you are moving across the whole Fuji area or staying more than a day. Pass prices checked ${PASS_CHECKED}; bus pass prices ${CHECKED}.`,
  },
  {
    q: "When is the best time of day and year to go?",
    a: "Earlier is better on both counts. Mt. Fuji is more often visible in the cooler, drier months than in the warm, humid ones, and more often in the morning than the afternoon — but that is a tendency, not a promise, and a Tokyo forecast tells you very little about what the summit is doing. The practical consequence is to take the earliest bus you are willing to take, and to check a Kawaguchiko-area forecast the night before rather than a Tokyo one.",
  },
  {
    q: "Can you do Kawaguchiko with children?",
    a: `It works, with fewer stops. The journey is long enough that two destinations plus lunch is a realistic day for a child, and the 398 steps at the Chureito Pagoda are the one stop that may not suit everybody. The things children tend to like best are the two with child fares: the ropeway at ¥600 for a child from 1 November 2026, and the lake boat at ¥500. Oshino Hakkai is flat, free to walk and short. Fuji-Q Highland is also on the same bus route if an amusement park is the better use of the day — our Fuji-Q guide covers its passes. Checked ${CHECKED}.`,
  },
  {
    q: "What happens if it rains, and what should I wear?",
    a: "Rain takes the mountain out of the day, so a wet forecast is a genuine reason to swap the date if you can — this is one of the few day trips where the weather is most of the product. If you go anyway, the indoor-ish options are the lake boat and the museums around the north shore; the ropeway can stop running in poor weather. Dress for a place noticeably cooler and windier than Tokyo, especially on the ropeway and at the top of the pagoda steps, and wear shoes you are happy climbing 398 steps in.",
  },
  {
    q: "Kawaguchiko or the Fuji Subaru Line Fifth Station?",
    a: "Kawaguchiko if you want to see Fuji, the Fifth Station if you want to be on it. The north shore gives you the classic views — the pagoda, the lake, the ponds — and is entirely doable on public transport. The Fifth Station is halfway up the mountain by road, has no railway station, and needs a further bus on a thin timetable, which is why nearly every coach tour from Tokyo is built around it. Our Mt. Fuji day tour comparison covers which itineraries go where.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/kawaguchiko-day-trip-from-tokyo") },
});

const TITLE = "Tokyo to Kawaguchiko Day Trip 2026: Bus, Train or Tour?";
const DESC =
  "Tokyo to Kawaguchiko: the Shinjuku bus is ¥2,200 and 1h45, the Fuji Excursion train ¥4,200 and 1h53, or take a day tour. Compare, then book a seat or tour.";

export default function KawaguchikoDayTripFromTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kawaguchiko-day-trip-from-tokyo" />
        {hreflangLinks("/guides/attractions/kawaguchiko-day-trip-from-tokyo")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kawaguchiko-day-trip-from-tokyo" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
              route: "/guides/attractions/kawaguchiko-day-trip-from-tokyo",
              headline: TITLE,
              description: DESC,
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
                  name: "Tokyo to Kawaguchiko Day Trip",
                  item: "https://www.japan-travel-kit.com/guides/attractions/kawaguchiko-day-trip-from-tokyo",
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
          <span className={styles.breadCurrent}>Tokyo to Kawaguchiko Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo to Kawaguchiko Day Trip (2026): <br />Bus, Train or Tour?
          </h1>
          <p className={styles.heroSubtitle}>
            A Kawaguchiko day trip from Tokyo by highway bus, Fuji Excursion train or coach tour: the
            official times and fares, a day by the clock, and what changes in winter.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares, dated", "Bus vs train vs tour"].map((t) => (
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

        {/* Answer first (R03) */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The highway bus from Busta Shinjuku to Kawaguchiko Station takes about 1 hour 45 minutes and
            costs ¥2,200 one way (¥2,000 paid online), with the first bus at 06:45 and the last back at 20:15.
            The JR–Fujikyu limited express Fuji Excursion runs from Shinjuku to Kawaguchiko in 1 hour 53
            minutes at its fastest for ¥4,200, four times a day with every seat reserved. A Kawaguchiko day
            tour from Tokyo covers about five stops in one day, such as the Chureito Pagoda, Oishi Park and
            Oshino Hakkai, against two or three on your own. Fares and times read off Fujikyu Bus, Keio and
            Fujikyu Railway on {NOW}.
          </p>
        </section>

        {/* Book this trip, straight under the answer (19 Nov 2026, Act; moved up from under the
            Quick Answer): scenic day tour and Fujikawaguchiko hotels 6.5%, highway bus 5%,
            Klook eSIM 20%. */}
        <KlookSameDayCards
          heading="Book this trip: the tour or the bus, a night at the lake, and data"
          cards={kawaguchikoAnswerCards}
          footnote={
            <>
              For the inns themselves, see our{" "}
              <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view">Kawaguchiko ryokan with a Mt Fuji view</Link>.
            </>
          }
        />

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bus, Shinjuku → Kawaguchiko</p>
                <p className={styles.verdictStatValue}>~1 hr 45 min, ¥2,200 (¥2,000 online)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fuji Excursion train</p>
                <p className={styles.verdictStatValue}>1 hr 53 min, ¥4,200</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day tour</p>
                <p className={styles.verdictStatValue}>About five stops in one day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On your own</p>
                <p className={styles.verdictStatValue}>Two or three stops, not five</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> for a Kawaguchiko day trip from Tokyo, take the bus out of Shinjuku
              in the morning and book the return at the same time — the bus to 20:15, or the 15:12 Fuji
              Excursion from Shimoyoshida after the Chureito Pagoda. Take a tour if you want five stops
              without managing a single timetable. Both the bus and the train sell reserved seats from one
              month ahead. Checked {NOW}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={fujiPhotographyDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check the Kawaguchiko day tour on Klook →
              </KlookLink>
              <KlookLink href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                Or just the bus seat →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Table 1 (R03): bus vs train vs tour */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Bus vs train vs tour</span>
          <h2 className={styles.sectionTitle}>Is the Bus or Train Better to Kawaguchiko?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The bus, for most people: it is ¥2,000 cheaper than the Fuji Excursion and runs every 10 to 30
            minutes. The train wins for the Chureito Pagoda and on snow days, and a tour wins when you want
            more stops than buses allow.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Highway bus (Shinjuku)", "Train (Fuji Excursion)", "Day tour"].map((h) => (
                      <th key={h || "item"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bus}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.train}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Official sources:{" "}
            {OFFICIAL.map((o, i) => (
              <span key={o.href}>
                <a href={o.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)" }}>{o.label}</a>
                {i < OFFICIAL.length - 1 ? "; " : "."}
              </span>
            ))}{" "}
            Tour stops as shown on the Klook listing for its scenic photography day tour. For the tours that
            add the Fifth Station, see our{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              Mt. Fuji day tour comparison
            </Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Tokyo–Kawaguchiko bus on Klook →
            </KlookLink>
            <KlookLink href={kawaguchikoYamanakakoBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Or a Kawaguchiko day tour →
            </KlookLink>
          </div>
        </section>

        {/* Intro / scope */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What a Kawaguchiko Day Actually Covers</h2>
          <p className={styles.bodyText}>
            Kawaguchiko is the north-shore town on Lake Kawaguchi, and it is where almost every
            photograph of Mt. Fuji you have seen was taken from. That is the whole appeal: you are
            looking at the mountain across water or over a pagoda roof, not standing on it. The five
            things worth the trip are the Chureito Pagoda in Arakurayama Sengen Park, the lakeside at
            Oishi Park, the Mt. Fuji Panoramic Ropeway up Mt. Tenjo, the sightseeing boat on the lake,
            and the spring-water ponds at Oshino Hakkai, inland.
          </p>
          <p className={styles.bodyText}>
            This guide is the Tokyo to Kawaguchiko journey and the day at the lake, and it is deliberately
            narrower than the three around it. If you want the Fuji area in general on your own — what the
            Mt. Fuji Pass covers and the viewpoints you can reach alone — that is our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo">Mt. Fuji day trip guide</Link>. If
            you want the Fuji Subaru Line Fifth Station, on the mountain itself, there is no train to it
            and a coach is the sensible route: our{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo">Mt. Fuji day tour comparison</Link>{" "}
            covers which itineraries go where. And if one day is not enough, our{" "}
            <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view">Kawaguchiko ryokan guide</Link>{" "}
            covers the night at the lake. This page is the day.
          </p>
        </section>

        {/* Routes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get From Tokyo to Kawaguchiko?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Most directly by the highway bus from Busta Shinjuku or the Fuji Excursion train from Shinjuku,
            both without a change. Every route from Tokyo is below, with the time and the one-way fare.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Journey time", "One-way fare", "What to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED} for the Shinjuku bus and the Fuji Excursion (Fujikyu Bus and
            Fujikyu Railway); the other bus terminals and the Otsuki–Kawaguchiko fares read on {CHECKED}.
            Subject to change — confirm when you book. Note that the
            Fujikyu Railway is a private line, so a Japan Rail Pass covers you only as far as Otsuki; our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            works through whether a pass earns its price across the rest of a trip. The{" "}
            <Link href="/guides/transport/tokyo-wide-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Tokyo Wide Pass
            </Link>{" "}
            is the exception: it covers the whole Fujikyu Railway, so the Fuji Excursion runs from Shinjuku to
            Kawaguchiko on it — worth it once the same three days hold a second day trip.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo–Kawaguchiko bus on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Table 2 (R03): a day by the clock */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Itinerary</span>
          <h2 className={styles.sectionTitle}>Can You Do Kawaguchiko as a Day Trip From Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, with two or three stops. The plan below takes the bus out and the Fuji Excursion back from
            Shimoyoshida, so the pagoda comes last and you are on the train before sunset in winter.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Time (weekday)", "What", "Ticket / note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itineraryRows.map((row) => (
                    <tr key={row.time}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Bus times from the Fujikyu Bus timetable for the Shinjuku–Kawaguchiko
            line (some departures do not run on days Fuji-Q Highland is closed); train times and the ¥4,010
            Shinjuku–Shimoyoshida fare from{" "}
            <a href="https://www.fujikyu-railway.jp/fujikaiyuu/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)" }}>
              Fujikyu Railway&apos;s Fuji Excursion page
            </a>{" "}
            (timetable from 14 March 2026). Sightseeing bus and boat fares read on {CHECKED}. Staying the night
            instead? Our{" "}
            <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kawaguchiko ryokan guide
            </Link>{" "}
            lists inns with the view from the room.
          </p>
        </section>

        {/* Which version */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which version</span>
          <h2 className={styles.sectionTitle}>Bus, Train or a Tour?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The five stops */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What to see</span>
          <h2 className={styles.sectionTitle}>What Is There to Do in Kawaguchiko in One Day?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Five stops carry the area, and a day holds two or three of them. Every price and hour below
            is the operator&apos;s own, with the site it came from.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Admission", "Hours / closures", "Getting there", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stopRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.stop}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            All five read off those operators&apos; own sites on {CHECKED}, and subject to change. The
            ropeway fare above is the figure its operator published as taking effect on 1 November 2026;
            check the current one before you go. For admissions across the rest of Japan,
            each with its own check date, see our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        {/* Table 3 (R03): winter */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Winter</span>
          <h2 className={styles.sectionTitle}>What Changes on a Winter Day Trip to Kawaguchiko?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The days are short and the mountain is at its clearest. Start early, put the views in the
            morning, and settle the ride home before about 16:30 in December.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "What to know", "Source"].map((h) => (
                      <th key={h || "item"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {winterRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Sunset for Kofu, Yamanashi&apos;s prefectural capital, from the{" "}
            <a href="https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s2012.html" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)" }}>
              National Astronomical Observatory of Japan tables
            </a>
            ; visibility from{" "}
            <a href="https://www.japan.travel/en/spot/1329/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)" }}>
              JNTO&apos;s Lake Kawaguchi page
            </a>
            ; ropeway notice from{" "}
            <a href="https://www.mtfujiropeway.jp/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)" }}>
              mtfujiropeway.jp
            </a>
            . For snow rather than views, see our{" "}
            <Link href="/guides/attractions/tokyo-snow-day-trip" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo snow day trip guide
            </Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={fujiPhotographyDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kawaguchiko day tour from Tokyo →
            </KlookLink>
          </div>
        </section>

        {/* Local transport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>Is the Sightseeing Bus Pass Worth It?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Three or more hops, yes; two, no. The Kawaguchiko sightseeing bus runs three colour-coded
            lines out of Kawaguchiko Station — Red around the north shore of Lake Kawaguchi, Green around
            Lake Saiko, Blue out to Narusawa, Shoji and Lake Motosu — as scheduled local buses with
            nothing to reserve.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Adult", "Child", "What it covers"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td className={styles.tdPrice}>{row.child}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Sightseeing bus prices read off the Fujikyu bus site on {CHECKED}; Mt. Fuji Pass prices off
            the official Fujikyu pass site on {PASS_CHECKED}. The Mt. Fuji Pass is sold to foreign
            passport holders only and your passport is checked at purchase.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={mtFujiPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Mt. Fuji Pass on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Planning steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>Planning the Day</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            If the Kawaguchiko day is replacing a city day, it is worth knowing what it costs you: our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> sets out
            what three days in the city actually hold, and the honest answer is that a Fuji day inside
            three is a bad trade. If you would rather have a hot-spring loop than a mountain view,{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone</Link> is the easier of
            the two to do independently, because one pass covers the whole circuit. And if the roller
            coasters are the real draw,{" "}
            Fuji-Q Highland is one stop before Kawaguchiko on the same bus route — entry is free, and our{" "}
            <Link href="/guides/attractions/fuji-q-highland-tickets">Fuji-Q Highland tickets</Link> guide
            compares the 1-Day Pass with paying per ride.
          </p>
        </section>

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Tokyo to Kawaguchiko: Common Questions</h2>
          <div className={styles.faqList}>
            {[...faqItems, ...moreFaqItems].map((item, i) => (
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
          heading="The Guided Versions of This Day"
          intro="Three Kawaguchiko-area day tours out of Tokyo and the seat-only bus, for when the connections are the part you would rather not own. Klook prices change by date, so open a listing for the figure and the departure point on your date."
          tours={[kawaguchikoYamanakakoBusTour, fujiPhotographyDayTour, kawaguchikoPrivateDayTour, tokyoMtFujiHighwayBus]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 12 Nov 2026: a night at Lake Kawaguchi for the Mt Fuji view. */}
            <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Ryokan with Mt Fuji View (2026): 6 Inns</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 30 Oct 2026: the pass that covers the Fuji Excursion into Kawaguchiko end to end. */}
            <Link href="/guides/transport/tokyo-wide-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Tokyo Wide Pass 2026: Price, Map &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Karuizawa Day Trip From Tokyo (2026): Shinkansen Times and the Five Stops</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Trip From Tokyo (2026): How to Get There Yourself</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="12" rx="2" />
                  <path d="M3 11h18" />
                  <circle cx="7.5" cy="19" r="1.5" />
                  <circle cx="16.5" cy="19" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-snow-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M4.9 6l14.2 12M4.9 18L19.1 6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Snow Day Trip (2026–27): Yeti, Fujiten or Gala</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/fuji-q-highland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Fuji-Q Highland Tickets (2026): Free Pass Prices, the Q Pack &amp; How to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
                  <path d="M5 12l4-7 4 6 2-2 4 5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Day Trip From Tokyo (2026): Timed Itinerary, Cost and Tours</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the leg that decides the day</h2>
            <p className={styles.ctaBannerDesc}>
              The highway bus is a reserved seat and the last useful services back to Tokyo go in the
              evening, so the outbound and the return are the two bookings worth settling first. Klook
              checks out in English and takes foreign cards.
            </p>
            <KlookLink href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
              View Tokyo–Kawaguchiko bus tickets on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
