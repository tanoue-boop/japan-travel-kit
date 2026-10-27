import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import GygCompare from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  dotonboriCityCruise,
  dotonboriDaytimeFoodTour,
  dotonboriNaniwaSightseeingBoat,
  jrHarukaUrl,
  klookEsim,
  kuromonMarketFoodTour,
  nankaiRapitUrl,
  osakaAmazingPass,
  osakaAquariumKaiyukanTicket,
  osakaCastleTicket,
  osakaCastleUmedaTonboriDayTour,
  osakaTwoDayStayAreas,
  osakaWalkingFoodTour,
  shinkansenTokyoOsaka,
  umedaSkyBuildingTicket,
  usjStudioPassUrl,
} from "../../../lib/klook-links";
import { gygOsaka, gygUsj, gygUsjExpressPass } from "../../../lib/gyg-links";

/**
 * Two days in Osaka, written as an order-and-booking plan rather than a list of
 * sights. Added 27 Oct 2026.
 *
 * How it differs from the two Osaka pages it sits beside, which is the whole
 * reason it exists as a separate article:
 *  - things-to-do-osaka answers "what is there", city-wide and un-sequenced;
 *  - osaka-attractions-pass answers "does the Amazing Pass pay for itself";
 *  - this page answers "in what order, on which day, and what has to be bought
 *    before I fly" — so its unit is the half-day, not the attraction.
 *
 * Every figure below is either read out of lib/attraction-prices.ts (which carries
 * the operator and the date for each) or verified against the operator's own site
 * and dated in the table. The ones verified for this page on 27 October 2026:
 *  - the Kuchu Teien Observatory's ¥2,000 / ¥500 admission and its 9:30–22:30
 *    hours with last admission at 22:00, from skybldg.co.jp;
 *  - the Enjoy Eco Card's ¥820 weekday / ¥620 weekend / ¥310 child prices and
 *    its coverage, from subway.osakametro.co.jp;
 *  - JR West's discounted HARUKA one-way prices and the 1 November 2026
 *    increase, from westjr.co.jp;
 *  - the Osaka–Kyoto and Tokyo–Kyoto journey times, from kyoto.travel, the
 *    official Kyoto travel guide;
 *  - the Tokyo–Osaka shinkansen shortest journey time and zero transfers, from
 *    Klook's own route page for the route.
 * The castle, cruise and Kaiyukan rows carry the dates from our own guides for
 * those tickets, each against the operator's site, and say so in the table.
 *
 * The "time to allow" column is our own planning allowance and is labelled as
 * such. No Klook price appears anywhere: Klook answers automated reads of its
 * product pages with HTTP 403.
 */

/** Figures read off the operators' own sites for this page. */
const OWN_ISO = "2026-10-27";
const OWN = checkedLabel(OWN_ISO);

/** Dates carried over from our own guides for the Osaka tickets. */
const CASTLE_CHECKED = checkedLabel("2026-10-23");
const CRUISE_CHECKED = checkedLabel("2026-10-23");
const KAIYUKAN_CHECKED = checkedLabel("2026-10-22");

const PASS_1_DAY = PRICES.osakaAmazingPass.adult;
const PASS_2_DAY = "¥3,300";
const PASS_CHECKED = checkedLabel(PRICES.osakaAmazingPass.checked);

const CASTLE_ADULT = "¥1,200";
const CRUISE_ADULT = "¥2,000";
const UMEDA_ADULT = "¥2,000";
const ECO_CARD_WEEKDAY = "¥820";
const ECO_CARD_WEEKEND = "¥620";

type Stop = {
  time: string;
  place: string;
  /** Our planning allowance, not an operator figure. */
  allow: string;
  getting: string;
  booking: string;
};

const day1: Stop[] = [
  {
    time: "From 9:00, when the tower opens",
    place: "Osaka Castle main tower, then the park, moats and Otemon approach",
    allow: "1 hour inside, 1–2 hours for the grounds",
    getting: "Osaka Metro Tanimachi 4-chome or JR Osakajokoen — about 15–20 minutes on foot from every station",
    booking: "No slot, but the museum may cap entry on a busy day — go at opening",
  },
  {
    time: "Late morning",
    place: "Nishinomaru Garden, the paid lawn with the postcard view of the tower",
    allow: "30–45 minutes",
    getting: "Inside the castle walls, a few minutes from the tower",
    booking: "No — a separate gate fee, and it closes on Mondays",
  },
  {
    time: "Lunch",
    place: "Kuromon Ichiba Market, Nipponbashi",
    allow: "1–1.5 hours",
    getting: "Tanimachi Line to Nipponbashi, or the Chuo and Sennichimae lines via Namba",
    booking: "No, unless you want a guided food walk",
  },
  {
    time: "Early afternoon",
    place: "Shinsaibashi-suji arcade and Doguyasuji kitchenware street",
    allow: "1.5 hours",
    getting: "On foot north from Kuromon, under cover the whole way",
    booking: "No",
  },
  {
    time: "Mid-afternoon",
    place: "Tombori River Cruise from Tazaemonbashi Pier",
    allow: "20 minutes afloat, about 40 minutes door to door",
    getting: "On foot from the Shinsaibashi arcade — the pier is on the Dotonbori canal",
    booking: "Timed ticket. Pass holders exchange at the desk, and the evening boats go first",
  },
  {
    time: "Early evening",
    place: "Dotonbori, the Glico sign and Hozenji Yokocho",
    allow: "2 hours",
    getting: "On foot from the pier",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Shinsekai and Tsutenkaku for kushikatsu, or a guided bar crawl around Namba",
    allow: "2–3 hours",
    getting: "Midosuji Line to Dobutsuen-mae, or stay in Namba and walk",
    booking: "Only if you want a guide",
  },
];

const day2: Stop[] = [
  {
    time: "From opening",
    place: "Osaka Aquarium Kaiyukan, Tempozan",
    allow: "2–2.5 hours — and it has to be one unbroken visit",
    getting: "Osaka Metro Chuo Line to Osakako, exit 1, about 5 minutes on foot",
    booking: "Required in practice — a 15-minute entry slot, and re-entry ended on 15 June 2026",
  },
  {
    time: "Late morning",
    place: "Tempozan Harbor Village — the Giant Ferris Wheel and the Marketplace",
    allow: "1–1.5 hours, lunch included",
    getting: "Next door to the aquarium exit",
    booking: "No — and eat here rather than planning to go back in",
  },
  {
    time: "Early afternoon, before 15:00",
    place: "Umeda Sky Building, Kuchu Teien Observatory",
    allow: "1–1.5 hours",
    getting: "Chuo Line to Hommachi, Midosuji Line to Umeda, then about 7 minutes on foot",
    booking: "No slot. The 15:00 cut-off is a pass rule, not a ticket rule",
  },
  {
    time: "Mid-afternoon",
    place: "Umeda — the department stores, HEP FIVE and the station complex",
    allow: "1.5–2 hours",
    getting: "On foot back under the tracks",
    booking: "No",
  },
  {
    time: "Late afternoon",
    place: "Shitennoji and the Abeno Harukas deck, or back to Minami for anything Day 1 overran on",
    allow: "1.5–2 hours",
    getting: "Midosuji Line south to Tennoji — about 20 minutes from Umeda",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Dinner wherever your base is, or the Dotonbori night cruise if you skipped the daytime one",
    allow: "2 hours",
    getting: "Midosuji Line",
    booking: "The night boats are the ones that sell out",
  },
];

/** Prices and hours, each against the operator's own site with the date it was read. */
const ticketRows = [
  {
    stop: "Osaka Castle main tower (Day 1)",
    price: `${CASTLE_ADULT} adult, ¥600 university and high school with ID, free below that`,
    hours: "9:00–18:00, ticket sales and last admission 17:30; closed 28 December – 1 January",
    booking: "Not needed",
    note: "The museum reserves the right to restrict entry earlier than 17:30 when numbers are high",
    source: `osakacastle.net, ${CASTLE_CHECKED}`,
  },
  {
    stop: "Nishinomaru Garden (Day 1)",
    price: "¥300 (¥350 in cherry-blossom season)",
    hours: "9:00–17:00 March–October, 9:00–16:30 November–February; closed Mondays",
    booking: "Not needed",
    note: "Separate from the tower ticket, and the one part of the castle a Monday takes away",
    source: `Osaka Amazing Pass facility list, ${CASTLE_CHECKED}`,
  },
  {
    stop: "Tombori River Cruise (Day 1)",
    price: `${CRUISE_ADULT} adult, ¥1,000 student, ¥500 elementary-school child`,
    hours: "Departures 11:00–21:00, on the hour and the half hour; about 20 minutes afloat",
    booking: "Timed ticket",
    note: "Free on the Osaka Amazing Pass after you exchange it at the desk; evening slots go first",
    source: `Osaka's official tourism site and the pass operator's facility list, ${CRUISE_CHECKED}`,
  },
  {
    stop: "Osaka Aquarium Kaiyukan (Day 2)",
    price: "¥2,700–3,200 adult by date, ¥1,400–1,650 school child, ¥700–800 aged 3 and over",
    hours: "Published on a per-date calendar; the pattern is a 10:00 open and a 20:00 close with last admission an hour before",
    booking: "Strongly advised",
    note: "Dynamic pricing by date, 15-minute entry slots on sale from about 30 days ahead, and no re-entry since 15 June 2026",
    source: `kaiyukan.com, ${KAIYUKAN_CHECKED}`,
  },
  {
    stop: "Umeda Sky Building, Kuchu Teien (Day 2)",
    price: `${UMEDA_ADULT} adult, ¥500 child aged 4–12, free under 4`,
    hours: "9:30–22:30, last admission 22:00, open all year",
    booking: "Not needed",
    note: "Free on the Amazing Pass only if you enter before 15:00 — after that the pass is a 10% discount",
    source: `skybldg.co.jp, ${OWN}`,
  },
  {
    stop: "Osaka Amazing Pass",
    price: `${PASS_1_DAY} for 1 day, ${PASS_2_DAY} for 2 days`,
    hours: "Valid on the calendar day, or two consecutive days on the 2-day version",
    booking: "Not needed",
    note: "Unlimited Osaka Metro and city buses plus 40-plus free admissions. Not Universal Studios Japan, and not the Kaiyukan",
    source: `osp.osaka-info.jp/en, ${PASS_CHECKED}`,
  },
  {
    stop: "Enjoy Eco Card (the transport-only alternative)",
    price: `${ECO_CARD_WEEKDAY} adult on a weekday, ${ECO_CARD_WEEKEND} at the weekend or on a holiday, ¥310 child`,
    hours: "One calendar day",
    booking: "Not needed",
    note: "Unlimited Osaka Metro and Osaka City Bus with discounts at about 20 city facilities — no admissions included",
    source: `subway.osakametro.co.jp, ${OWN}`,
  },
  {
    stop: "Universal Studios Japan 1-Day Studio Pass (the Day 2 alternative)",
    price: "Tiered by date — no fixed figure is published",
    hours: "Varies by date on the park's own calendar",
    booking: "Required",
    note: "Online only since 2025, and Super Nintendo World area timed entry is handled free in the park's own app",
    source: "Our USJ guide, with the park's own date-tiered pricing",
  },
];

/** Where to stay for two days, with the condition each area carries. */
const stayRows = [
  {
    area: "Namba",
    door: "Midosuji, Yotsubashi and Sennichimae subway lines, the Nankai terminus for Kansai Airport, and Kintetsu for Nara",
    walk: "Dotonbori, Kuromon Market, the Shinsaibashi arcade and Hozenji Yokocho — the whole of Day 1's evening",
    catch: "Loud until late, which is either the point or the problem",
    pick: "The default for two days. It makes Day 1 a walking day and the airport run a single train.",
  },
  {
    area: "Umeda / Osaka Station",
    door: "JR Osaka — the Loop Line, the Kyoto and Kobe lines and the Yumesaki through services — plus Hankyu, Hanshin and the Midosuji Line",
    walk: "The Umeda Sky Building, the department stores and HEP FIVE",
    catch: "A 20-minute Midosuji ride from Day 1's evening, and the station complex takes some learning",
    pick: "If the two days arrive from Kyoto or leave by shinkansen, or if one of them is Universal Studios Japan.",
  },
  {
    area: "Tennoji",
    door: "Midosuji and Tanimachi lines, JR Loop and Hanwa lines, Kintetsu Minami-Osaka, and the first city HARUKA stop",
    walk: "Shitennoji, the Abeno Harukas deck and Shinsekai one stop away",
    catch: "The furthest of the three Midosuji hubs from Dotonbori, and the quietest in the evening",
    pick: "The cheaper base, and the one that shortens the Kansai Airport leg at both ends of a short trip.",
  },
  {
    area: "Universal City",
    door: "JR Yumesaki Line only — about 20 minutes from Osaka Station on the Osaka Convention & Tourism Bureau's own figure",
    walk: "The Universal Studios Japan gates",
    catch: "No Osaka Metro pass reaches you, and everything else in this itinerary is a JR ride plus a change",
    pick: "Only if one of your two days is the park and you want to be at the gates before opening.",
  },
];

/** Long-distance and airport access, operators' own published figures. */
const accessRows = [
  {
    route: "Tokyo → Shin-Osaka, Tokaido Shinkansen",
    time: "Shortest 2 hr 14 min, no transfer",
    fare: "By date and seat class — non-reserved, reserved and Green Car",
    note: `Time and the zero-transfer figure from Klook's own Tokyo–Osaka rail page, read ${OWN}. Shin-Osaka is two stops up the Midosuji Line from Umeda.`,
  },
  {
    route: "Tokyo → Kyoto, Tokaido Shinkansen",
    time: "Approx. 130 min on Nozomi, 170 min on Hikari",
    fare: "By date and seat class",
    note: `The official Kyoto travel guide's own figures, read ${OWN} — useful if Osaka is the second half of a Kyoto trip rather than the arrival city.`,
  },
  {
    route: "Kyoto → Osaka Station, JR Special Rapid",
    time: "Approx. 30 min",
    fare: "Ordinary fare, nothing reserved",
    note: `kyoto.travel's own figure, read ${OWN}. The cheapest and simplest way into these two days from a Kyoto base — there is nothing to book.`,
  },
  {
    route: "Kyoto-Kawaramachi → Osaka-umeda, Hankyu",
    time: "Approx. 45 min",
    fare: "Ordinary fare",
    note: `Also kyoto.travel, read ${OWN}. The Keihan from Gion-Shijo to Yodoyabashi is approximately 48 minutes on the same source.`,
  },
  {
    route: "Kansai Airport → Tennoji / Osaka / Shin-Osaka, JR HARUKA",
    time: "Direct, no transfer",
    fare: "Discounted one-way for a foreign passport entering as a temporary visitor: ¥1,300 Tennoji and ¥1,800 Osaka or Shin-Osaka through 31 October 2026, then ¥1,600 and ¥1,900 from 1 November 2026",
    note: `JR West's own published prices and its own announced increase, read ${OWN}. Kyoto on the same ticket goes ¥2,200 → ¥2,700.`,
  },
  {
    route: "Kansai Airport → Namba, Nankai Rapi:t",
    time: "Minimum 34 min, no transfer",
    fare: "¥700 adult limited express ticket on top of the ordinary fare — ¥300 more bought onboard, ¥150 less ticketless",
    note: "Nankai's own figures, read 26 October 2026 for our USJ guide. The pick if your base is Namba.",
  },
];

const bookingWindow = [
  {
    title: "Weeks ahead — Universal Studios Japan",
    desc: "Only if the park is one of your two days. The Studio Pass is online-only and date-tiered, and 2026 is the park's 25th-anniversary season, so the cheap dates and the Express Passes both go early.",
  },
  {
    title: "A few weeks ahead — the Kaiyukan",
    desc: "Entry is a 15-minute slot and the e-ticket opens about 30 days before your date. Re-entry ended on 15 June 2026, so the slot you pick decides the shape of your whole morning.",
  },
  {
    title: "The day before, or the morning of — the Tombori cruise",
    desc: "A timed ticket rather than a scarce one, but the evening sailings go first. If you are on an Amazing Pass, exchange it at the reception desk during the day for an evening slot.",
  },
  {
    title: "Nothing at all — the castle, the Umeda deck, Kuromon, Dotonbori",
    desc: "Four of the six headline stops in these two days are walk-up. The castle has no slot and the Umeda deck sells same-day tickets at the 39th-floor counter until 22:00.",
  },
];

const faqItems = [
  {
    q: "Is 2 days enough for Osaka?",
    a: `Yes — more comfortably than two days in Tokyo or Kyoto. Osaka's sights cluster into two halves that the Midosuji Line joins end to end: the castle and Minami (Dotonbori, Kuromon, Shinsaibashi) on one day, and the bay and Umeda (the Kaiyukan, Tempozan, the Kuchu Teien deck) on the other. Umeda to Namba is about 20 minutes on one line with no change. Two days covers both halves without rushing. What two days does not hold is Universal Studios Japan as well — that is a full day, and it comes out of one of these two rather than being added to them.`,
  },
  {
    q: "What should I do on a 2 day trip to Osaka?",
    a: `Day 1 the castle and Minami: the main tower from 9:00 (${CASTLE_ADULT} adult), the Nishinomaru Garden, lunch at Kuromon Ichiba Market, the Shinsaibashi arcade, the ${CRUISE_ADULT} Tombori River Cruise, then Dotonbori in the evening and kushikatsu in Shinsekai. Day 2 the bay and Umeda: the Kaiyukan from opening, Tempozan Harbor Village for lunch, the Umeda Sky Building's Kuchu Teien Observatory (${UMEDA_ADULT}) in the early afternoon, then Umeda or Tennoji. That order is deliberate: Day 1's only timed ticket is cheap and frequent, so a missed booking is recoverable, while Day 2 opens with the one attraction that has a fixed entry slot.`,
  },
  {
    q: "Is the Osaka Amazing Pass worth it for 2 days?",
    a: `For this itinerary, on Day 1, yes — and the 2-day version is the one to think twice about. The pass is ${PASS_1_DAY} for one day and ${PASS_2_DAY} for two, read on ${PASS_CHECKED}. Day 1 alone puts the castle tower (${CASTLE_ADULT}), the Nishinomaru Garden (¥300) and the Tombori cruise (${CRUISE_ADULT}) on it, which is ¥3,500 of gate prices against a ${PASS_1_DAY} pass, before a single subway ride. Day 2 is the problem: the Kaiyukan is not an Amazing Pass facility at all, and the Umeda deck is only free before 15:00. If Day 2 is the aquarium, buy a 1-day pass for Day 1 and an ${ECO_CARD_WEEKDAY} Enjoy Eco Card — ${ECO_CARD_WEEKEND} at the weekend — for Day 2, which is transport only and was read off Osaka Metro's own site on ${OWN}.`,
  },
  {
    q: "Where should I stay in Osaka for 2 days?",
    a: `Namba, unless one of your days is Universal Studios Japan. Namba puts the whole of Day 1's evening on foot — Dotonbori, Kuromon Market, the Shinsaibashi arcade — and it is the Nankai terminus, so the airport run starts under the hotel. Umeda is the pick if you arrive from Kyoto by JR or leave by shinkansen from Shin-Osaka, and Tennoji is the cheaper version of the same Midosuji stretch with the shortest HARUKA leg. Universal City only earns it if the park is a whole day: it is reached on the JR Yumesaki Line, which no Osaka Metro pass covers. Our where to stay in Osaka guide compares the four on the lines under them.`,
  },
  {
    q: "Can you do Universal Studios Japan on a 2 day Osaka trip?",
    a: `You can, but it replaces Day 2 rather than slotting into it. USJ is a full day — the park is about 20 minutes from Osaka Station on the JR Yumesaki Line via Nishikujo, on the Osaka Convention & Tourism Bureau's own figure, and standby waits on the headline rides run into hours on busy dates. If you do it, the Day 2 above goes entirely: no Kaiyukan, no Umeda deck. Three things to settle first. The Studio Pass is online-only and tiered by date, so there is no gate price to quote. Super Nintendo World needs an area timed-entry ticket, which is free through the park's own app on the day. And neither the Amazing Pass nor any Osaka Metro pass covers the park or the train out to it.`,
  },
  {
    q: "What do you actually need to book in advance in Osaka?",
    a: `Less than in Tokyo. Of the six headline stops in these two days, exactly one has a hard entry slot — the Kaiyukan, whose e-ticket specifies your entry in 15-minute units and goes on sale about 30 days ahead, and which ended re-entry on 15 June 2026. The Tombori cruise is a timed ticket but a frequent one, running 11:00 to 21:00 on the hour and the half hour. Osaka Castle, the Umeda Sky Building, Kuromon Market and Dotonbori need nothing at all. Add Universal Studios Japan and the answer changes completely: that one is online-only, date-tiered and the thing to buy first.`,
  },
  {
    q: "How do you get to Osaka from Tokyo or Kyoto?",
    a: `From Tokyo, the Tokaido Shinkansen to Shin-Osaka — Klook's own route page for Tokyo to Osaka gives a shortest journey of 2 hr 14 min with no transfer, read on ${OWN}, and Shin-Osaka is two stops up the Midosuji Line from Umeda. From Kyoto it is barely a journey: the official Kyoto travel guide puts Osaka Station to Kyoto Station at approximately 30 minutes on the JR Special Rapid, with the Hankyu to Osaka-umeda at approximately 45 minutes and the Keihan from Gion-Shijo to Yodoyabashi at approximately 48 — read on ${OWN}. None of those three is reserved, so there is nothing to book and no reason to buy a rail pass for the hop alone.`,
  },
  {
    q: "How much does a 2 day Osaka itinerary cost in admissions?",
    a: `Day 1's three paid stops are ${CASTLE_ADULT} for the castle tower, ¥300 for the Nishinomaru Garden and ${CRUISE_ADULT} for the Tombori cruise — ¥3,500 for one adult, or nothing beyond a ${PASS_1_DAY} Amazing Pass. Day 2 is the expensive one precisely because the pass does not help: the Kaiyukan runs ¥2,700 to ¥3,200 for an adult depending on the date, and the Umeda deck is ${UMEDA_ADULT}. Everything else in both days — Kuromon Market, Dotonbori, the Shinsaibashi arcade, Tempozan Harbor Village, Shinsekai, the castle grounds — costs nothing to walk into. Sources and the date each figure was read are in the table above.`,
  },
  {
    q: "Is Osaka walkable, or do you need a pass?",
    a: `Each half is walkable; the two halves are not. Day 1 above is one continuous walk from Kuromon Market through Shinsaibashi to the Dotonbori pier, and Day 2's aquarium and Harbor Village are next door to each other. What you need transport for is the four or five hops between clusters — the castle, the bay, Umeda, Tennoji. That is the question the two passes answer differently: the Amazing Pass at ${PASS_1_DAY} bundles those rides with admissions, while the Enjoy Eco Card at ${ECO_CARD_WEEKDAY} on a weekday and ${ECO_CARD_WEEKEND} at the weekend is rides only, read off Osaka Metro's own site on ${OWN}. On a day with no paid admissions, the cheaper card wins easily.`,
  },
  {
    q: "What is the best time of day for the Dotonbori cruise and the Umeda deck?",
    a: `Opposite answers, and they do not conflict. The Dotonbori canal is a neon street from the water, so the boat is better after dark — which is also why the evening sailings are the ones that fill, and why the pass operator tells pass holders to exchange their voucher during the daytime for an evening slot. The Umeda deck is the other way round on this itinerary: the rooftop is open until 22:30 with last admission at 22:00, but the Amazing Pass only covers it free before 15:00, so a pass day pushes you into the early afternoon. If you are paying ${UMEDA_ADULT} at the counter anyway, go at 21:00 — same view, a fraction of the crowd. Hours read on ${OWN}.`,
  },
  {
    q: "Can you add Kyoto, Nara or Kobe to a 2 day Osaka trip?",
    a: `Not without giving up half of Osaka, and that is the honest trade. Each of those is a day trip in its own right: Kyoto is approximately 30 minutes away on the JR Special Rapid, Nara about 35, and Kobe about 30 minutes to Sannomiya on the Kobe Tourism Bureau's own figure. Any of them replaces Day 2 rather than fitting beside it. With three or four days in Osaka the arithmetic flips and a day trip becomes the best thing you can add — our Kobe day trip and Kyoto-and-Nara guides cover both, and our seven and ten-day itineraries build Osaka in as one leg of a longer route.`,
  },
  {
    q: "Does this itinerary work with children, or in the rain?",
    a: `Both, with one swap each way. For children, Day 2 is the stronger day — the Kaiyukan is a single one-way route rather than a maze, it is ¥700–800 from age 3 and free below, and the Tempozan Ferris wheel is next door; on Day 1 the ¥500 child fare on the Tombori cruise and twenty minutes afloat beat any museum. For rain, Osaka is unusually well set up: the Shinsaibashi arcade runs most of a kilometre under cover into Dotonbori, Kuromon Market is roofed, and the castle tower and the Kaiyukan are both indoor. What rain takes away is the Tombori boat, which has no roof, and the open rooftop ring at the top of the Umeda Sky Building.`,
  },
];

const TITLE = "Osaka 2 Day Itinerary (2026): Day by Day, and What to Book";
const DESCRIPTION =
  "A tested-order Osaka 2 Day Itinerary: the castle and Minami on Day 1, the bay and Umeda on Day 2, with a table for each day and official prices — Osaka Castle ¥1,200, the Tombori cruise ¥2,000, the Umeda deck ¥2,000, and the one booking that has a fixed entry slot.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/osaka-2-day-itinerary") },
});

export default function Osaka2DayItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/osaka-2-day-itinerary" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/osaka-2-day-itinerary" />
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
              route: "/guides/attractions/osaka-2-day-itinerary",
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
                  name: "Osaka 2 Day Itinerary",
                  item: "https://www.japan-travel-kit.com/guides/attractions/osaka-2-day-itinerary",
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
          <span className={styles.breadCurrent}>Osaka 2 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Osaka 2 Day Itinerary (2026):<br />Day by Day, and What to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Two halves of one city, joined end to end by a single subway line. The order matters more
            than the list — and only one stop in it has a fixed entry slot.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices & hours, dated", "A table for each day"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Day 1</p>
                <p className={styles.verdictStatValue}>Castle, Kuromon, Dotonbori</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Kaiyukan, Tempozan, Umeda</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 1 admissions</p>
                <p className={styles.verdictStatValue}>¥3,500, or {PASS_1_DAY} on the pass</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Must book ahead</p>
                <p className={styles.verdictStatValue}>The Kaiyukan slot (and USJ)</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              A workable <strong>Osaka 2 day itinerary</strong> gives each day one half of the city.{" "}
              <strong>Day 1</strong> is the castle and Minami: the main tower from its{" "}
              <strong>9:00</strong> opening ({CASTLE_ADULT} adult), the Nishinomaru Garden (¥300), lunch at{" "}
              <strong>Kuromon Ichiba Market</strong>, the covered Shinsaibashi arcade, the{" "}
              <strong>{CRUISE_ADULT}</strong> 20-minute <strong>Tombori River Cruise</strong>, then Dotonbori
              and Shinsekai after dark. <strong>Day 2</strong> is the bay and Umeda: the{" "}
              <strong>Osaka Aquarium Kaiyukan</strong> from opening (¥2,700–3,200 by date, about 2 hours, and
              no re-entry since 15 June 2026), Tempozan Harbor Village for lunch, then the{" "}
              <strong>Umeda Sky Building</strong> rooftop ({UMEDA_ADULT}, open to 22:30). Umeda to Namba is
              about 20 minutes on the Midosuji Line, so neither day has a long journey in it. Exactly one
              stop needs booking: the Kaiyukan&apos;s 15-minute entry slot. Prices read off the operators&apos;
              own sites on the dates in the table below.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={osakaCastleUmedaTonboriDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Both Days as One Guided Day →
              </a>
              <a href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Osaka Amazing Pass (1 / 2 day) →
              </a>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Should You Split Two Days in Osaka?</h2>
          <p className={styles.bodyText}>
            Into a south day and a north-and-bay day. Osaka&apos;s sights are not scattered: almost
            everything a first visit wants sits either around <strong>Minami</strong> — Namba, Dotonbori,
            Shinsaibashi, Kuromon, with the castle a few minutes east — or around{" "}
            <strong>Umeda and the bay</strong>, and the <strong>Midosuji Line</strong> joins the two ends in
            about 20 minutes with no change. Give each half a day and you spend almost no time travelling.
            Mix them and you will cross the city four times.
          </p>
          <p className={styles.bodyText}>
            This guide is about that order and the bookings inside it, which is what separates it from the
            other two Osaka pages on this site. Our{" "}
            <Link href="/guides/attractions/things-to-do-osaka">things to do in Osaka guide</Link> is the
            city-wide list of what exists, and our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass guide</Link> works
            through whether the pass pays for itself. Here, each day carries its own table — time of day,
            where, how long to allow, how you get there, and whether it needs booking — with the Klook
            listings for that day&apos;s bookings directly underneath it.
          </p>
          <p className={styles.bodyText}>
            One decision shapes everything else, so settle it first: is{" "}
            <strong>Universal Studios Japan</strong> one of your two days? If it is, it replaces Day 2
            entirely — the park is a full day, it is on the JR Yumesaki Line rather than the subway, and no
            Osaka pass covers it. There is a section on that below.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>Day 1 — Osaka Castle, Kuromon Market and Dotonbori</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The south of the city, finishing on a neon canal. Day 1 goes first because its only timed
            ticket — the Tombori cruise — is cheap and runs every half hour, so a missed slot costs you
            nothing. It also starts at the one place where arriving at opening genuinely helps: the castle
            museum states that it may cap entry before its 17:30 cut-off when numbers are high, and 9:00 is
            never the busy hour.
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 1.</strong> The pass, if you are buying one — Day 1 is the day it
            pays for itself, with the castle tower, the Nishinomaru Garden and the Tombori cruise all free
            on it. The cruise itself, if you want an evening sailing, because those are the slots that go:
            the pass operator&apos;s own advice is to exchange a pass voucher during the daytime for a later
            boat. Nothing else here is bookable at all. Our{" "}
            <Link href="/guides/attractions/osaka-castle-tickets">Osaka Castle tickets guide</Link> covers
            the four other paid facilities inside the park walls, and our{" "}
            <Link href="/guides/attractions/dotonbori-river-cruise">Dotonbori river cruise guide</Link>{" "}
            compares the four boats that work the same stretch of water.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass →
            </a>
            <a href={osakaCastleTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Castle ticket →
            </a>
            <a href={dotonboriCityCruise.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Dotonbori cruise →
            </a>
            <a href={kuromonMarketFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kuromon Market food walk →
            </a>
          </div>
        </section>

        {/* Day 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>Day 2 — the Kaiyukan, Tempozan and the Umeda Sky Building</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The bay in the morning, the north of the city in the afternoon. Day 2 opens with the only stop
            in these two days that has a hard entry slot, and with the rule most guides have not caught up
            with: the Kaiyukan <strong>ended re-entry on 15 June 2026</strong>. That single change is why
            lunch is at Tempozan Marketplace <em>after</em> the aquarium rather than in the middle of it.
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 2.</strong> The Kaiyukan, without exception — entry is specified in
            15-minute units, the e-ticket opens about 30 days before your date, and the ticket window sells
            same-day only, so the queue you avoid is a real one. The Umeda deck needs nothing: the 39th-floor
            counter sells same-day tickets until 22:00. The one thing to work out before you leave the hotel
            is the clock on the pass — free entry to the Umeda deck stops at 15:00, after which the pass is a
            10% discount, which is the whole argument for doing the bay first. Details in our{" "}
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets">Kaiyukan tickets guide</Link>{" "}
            and our{" "}
            <Link href="/guides/attractions/umeda-sky-building-tickets">Umeda Sky Building tickets guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kaiyukan ticket →
            </a>
            <a href={umedaSkyBuildingTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Umeda Sky Building ticket →
            </a>
            <a href={osakaWalkingFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka walking &amp; food tour →
            </a>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The &ldquo;time to allow&rdquo; column in both tables is our own planning allowance, not an
            operator figure. Opening hours and prices are in the dated table below, each against the
            operator&apos;s own site.
          </p>
        </section>

        {/* Prices and hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; hours</span>
          <h2 className={styles.sectionTitle}>What Does an Osaka 2 Day Itinerary Cost in Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Day 1 is ¥3,500 of admissions for one adult, or nothing beyond a {PASS_1_DAY} pass. Day 2 is the
            expensive day, and the reason is that neither of its two paid stops is fully covered by any
            Osaka pass. Every figure below is the operator&apos;s own published price, with the site it came
            from and the date it was read.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Official price", "Hours", "Booking", "Source & date checked"].map((h) => (
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
                      <td style={{ fontSize: "0.85rem" }}>
                        <strong>{row.booking}</strong> — {row.note}
                      </td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm at booking. The Umeda deck and Enjoy Eco Card rows were read off
            skybldg.co.jp and subway.osakametro.co.jp on {OWN}; the castle, garden, cruise, Kaiyukan and
            Amazing Pass rows carry the dates from our own guides for those tickets, each against the
            operator&apos;s own site. The same figures appear with the same dates in the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>. No Klook price appears anywhere on this page: Klook answers automated reads of its
            product pages with an error, so no figure from it could be verified.
          </p>
        </section>

        {/* Booking window */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>What Do You Need to Book in Advance for Osaka?</h2>
          <p className={styles.bodyText}>
            One stop out of thirteen, which is the single most reassuring thing about planning Osaka after
            planning Tokyo. Here is the whole itinerary sorted by how far ahead each thing has to be bought.
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
            Cancellation is the other half of the question, and on a two-day trip it matters more than on a
            week: there is no spare day to move a rained-off rooftop or a sold-out slot into. Check the
            cancellation window on whichever route you book the Kaiyukan and — if you are doing it — the
            Studio Pass, because those are the two tickets with a date locked into them. The walk-up stops
            carry no such risk at all.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kaiyukan on Klook →
            </a>
            <a href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Amazing Pass on Klook →
            </a>
          </div>
        </section>

        {/* The pass question */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The pass</span>
          <h2 className={styles.sectionTitle}>Is the Osaka Amazing Pass Worth It for 2 Days?</h2>
          <p className={styles.bodyText}>
            For Day 1, comfortably. For Day 2, usually not — and that asymmetry is the most useful thing on
            this page. The pass is <strong>{PASS_1_DAY} for one day</strong> and{" "}
            <strong>{PASS_2_DAY} for two</strong>, read on {PASS_CHECKED}. Day 1 puts the castle tower
            ({CASTLE_ADULT}), the Nishinomaru Garden (¥300) and the Tombori River Cruise ({CRUISE_ADULT}) on
            it — <strong>¥3,500 of gate prices</strong> — before you count a single Midosuji ride.
          </p>
          <p className={styles.bodyText}>
            Day 2 breaks it twice. The <strong>Kaiyukan is not an Amazing Pass facility</strong>, which
            catches out more visitors than any other fact about the pass, and the{" "}
            <strong>Umeda Sky Building is only free before 15:00</strong> — after that the pass becomes a
            10% discount, so an evening visit still costs about ¥1,800. On a Day 2 built around those two,
            the better buy is transport only: Osaka Metro&apos;s own{" "}
            <strong>Enjoy Eco Card</strong> is <strong>{ECO_CARD_WEEKDAY}</strong> for an adult on a
            weekday, <strong>{ECO_CARD_WEEKEND}</strong> at the weekend or on a public holiday and ¥310 for
            a child, and covers unlimited Osaka Metro and Osaka City Bus with discounts at about 20 city
            facilities. Read off subway.osakametro.co.jp on {OWN}.
          </p>
          <p className={styles.bodyText}>
            So the arithmetic that works for most two-day trips is a <strong>1-day Amazing Pass for Day 1</strong>{" "}
            and an Enjoy Eco Card or an IC card for Day 2 — not the {PASS_2_DAY} two-day pass. The
            exception is a second day that stays inside the pass&apos;s own facility list: the HEP FIVE
            Ferris wheel, Tsutenkaku, the Santa Maria harbour cruise and the Umeda deck before 15:00 are all
            on it, and a day built from those does justify the longer version. Our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass guide</Link> runs the
            break-even across the whole city, and our{" "}
            <Link href="/guides/transport/osaka-metro-pass">Osaka Metro pass guide</Link> compares the
            transport-only options.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Amazing Pass (1 / 2 day) →
            </a>
          </div>
        </section>

        {/* Where to stay */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay in Osaka for 2 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            On a two-day trip the base is not a comfort question, it is a time question: every crossing you
            make with luggage comes out of the sightseeing. These four are the areas this itinerary actually
            touches, with what is at the door and what each one costs you.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Lines at the door", "On foot from the hotel", "The catch", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stayRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.walk}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.catch}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            We publish no room rates, because none can be verified — availability and price are per-hotel and
            per-date. The Universal City walking and journey figures are the Osaka Convention &amp; Tourism
            Bureau&apos;s own. Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={{ color: "var(--text)", fontWeight: 600 }}>
              where to stay in Osaka guide
            </Link>{" "}
            compares the same four areas on the airport routes and the day trips, and our{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              getting around Osaka guide
            </Link>{" "}
            explains how the Midosuji Line and IC cards fit together.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for the Four Areas Above"
          intro="Which rooms are left and at what price is a per-date question, so each area links into Klook's own hotel search for it. On two days the thing to compare is not the nightly rate but how many subway crossings the location saves you — which is what the why line on each one is about."
          areas={osakaTwoDayStayAreas}
        />

        {/* Getting to Osaka */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Osaka From Tokyo, Kyoto or Kansai Airport?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Two days in Osaka is almost always two days inside a longer trip, so the arrival is usually a
            shinkansen from Tokyo, a half-hour hop from Kyoto, or a flight into Kansai. Every figure below is
            the operator&apos;s or the official tourism body&apos;s own published number.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Journey time", "Fare", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The one date-sensitive figure here is the HARUKA. JR West&apos;s discounted one-way for foreign
            passport holders entering as temporary visitors rises on <strong>1 November 2026</strong> — Tennoji
            from ¥1,300 to ¥1,600, Osaka and Shin-Osaka from ¥1,800 to ¥1,900, and Kyoto from ¥2,200 to
            ¥2,700. If your trip straddles that date, the ticket you buy for the inbound leg and the one you
            buy for the outbound may not be the same price. Read on {OWN}. Our{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit">HARUKA vs Nankai Rapi:t comparison</Link>{" "}
            sets the two airport trains against each other, and our{" "}
            <Link href="/guides/transport/osaka-airport-transfer">Osaka airport transfer guide</Link> covers
            Itami and the limousine buses as well.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Osaka shinkansen →
            </a>
            <a href={jrHarukaUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR HARUKA ticket →
            </a>
            <a href={nankaiRapitUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nankai Rapi:t ticket →
            </a>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            One more arrival-day booking that is not transport: data. The Kaiyukan slot is a QR code in an
            inbox, the Universal Studios Japan area tickets are issued inside the park&apos;s own app, and
            every &ldquo;getting there&rdquo; column above assumes you can open a map.{" "}
            <a href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </a>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it against
            the alternatives.
          </p>
        </section>

        {/* USJ */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The USJ question</span>
          <h2 className={styles.sectionTitle}>Can You Do Universal Studios Japan on a 2 Day Osaka Trip?</h2>
          <p className={styles.bodyText}>
            Yes, but it is a swap rather than an addition. Universal Studios Japan is a{" "}
            <strong>full day</strong>: the park is about 20 minutes from Osaka Station on the JR Yumesaki
            Line, usually with a change at Nishikujo, and on busy dates the standby queues on the headline
            rides run into hours. Put it in and Day 2 above goes — no Kaiyukan, no Tempozan, no Umeda
            rooftop. That is a genuine loss, so it is worth deciding deliberately rather than discovering
            on the morning.
          </p>
          <p className={styles.bodyText}>
            Three practical points if you do. The <strong>1-Day Studio Pass is online-only</strong> and
            tiered by date, so there is no gate price for us to quote — and 2026 is the park&apos;s
            25th-anniversary season, which is why the quieter dates go early.{" "}
            <strong>Super Nintendo World needs an area timed-entry ticket</strong>, which is free through
            the park&apos;s own app on the day and is a separate thing from the Express Pass. And{" "}
            <strong>no Osaka pass helps</strong>: the park is not on the Amazing Pass, and no Osaka Metro
            pass covers the JR ride out to Universal City. The whole of it is in our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">USJ tickets and Express Pass guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={usjStudioPassUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              USJ Studio Pass on Klook →
            </a>
          </div>
        </section>

        {/* The two Klook tour slots */}
        <KlookTourPicks
          heading="If You Would Rather Not Route Either Day Yourself"
          intro="The first listing is the closest thing to this whole guide in one booking — the castle, the Umeda deck and the Dotonbori river cruise in a single guided day. The other three are the food and boat hours either side of it. Klook blocks automated price reads, so open a listing for the figure on your dates."
          tours={[osakaCastleUmedaTonboriDayTour, dotonboriDaytimeFoodTour, kuromonMarketFoodTour, dotonboriNaniwaSightseeingBoat]}
        />

        {/* GYG, for the USJ tickets Klook pays least on */}
        <GygCompare
          slug="osaka-2-day-itinerary"
          heading="If Your Universal Studios Japan Date Has Already Gone"
          intro="The one ticket in this itinerary that cannot simply be moved to the other day is the Studio Pass — it is date-specified, and the Express Pass is capped per day on top. Both are sold on GetYourGuide as well, with the same caveat as everywhere else: the Express Pass does not include park admission. The wider Osaka catalogue is there too if you are rebuilding a day from scratch."
          listings={[gygUsj, gygUsjExpressPass, gygOsaka]}
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kobe-day-trip-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kobe Day Trip from Osaka (2026): Routes, the Beef and What Fits in a Day</p>
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
            <Link href="/guides/attractions/dotonbori-river-cruise" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 15h18l-2 5H5z" />
                  <path d="M12 4v11M7 9h10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Dotonbori River Cruise (2026): ¥2,000, 20 Minutes and Which Boat to Take</p>
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
            <h2 className={styles.ctaBannerTitle}>Two days, one subway line, one booking that matters</h2>
            <p className={styles.ctaBannerDesc}>
              Book the Kaiyukan slot, decide whether Day 1 is a pass day, and leave the rest walk-up. If you
              would rather hand both days to a guide, the castle, the Umeda deck and the river cruise are
              sold as one.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={osakaCastleUmedaTonboriDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Guided Osaka Day →
              </a>
              <a href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Amazing Pass →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
