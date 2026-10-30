import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import GygCompare from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  dotonboriCityCruise,
  jrHarukaUrl,
  jrKansaiAreaPass,
  klookEsim,
  kuromonMarketFoodTour,
  kyotoHighlightBusTour,
  kyotoNaraArashiyamaTour,
  kyotoNaraKiyomizuTour,
  nankaiRapitUrl,
  osakaAmazingPass,
  osakaKyotoThreeDayStayAreas,
  osakaKyotoThreeDayTripPrep,
  shinkansenTokyoKyoto,
  shinkansenTokyoOsaka,
  usjStudioPassUrl,
} from "../../../lib/klook-links";
import { gygOsaka, gygUsj, gygUsjExpressPass } from "../../../lib/gyg-links";

/**
 * Three days across Osaka and Kyoto, written as a routing-and-booking plan.
 * Added 30 Oct 2026 for the exact phrase "Osaka Kyoto 3 Day Itinerary".
 *
 * Why it exists next to the four itinerary pages it sits beside:
 *  - osaka-2-day-itinerary and kyoto-2-day-itinerary each route one city and
 *    assume the other is someone else's problem;
 *  - tokyo-kyoto-osaka-7-day-itinerary is a week with a shinkansen in it;
 *  - this page answers the question those three do not: what fits when the whole
 *    trip is three days in and out of Kansai, and whether to sleep in one city
 *    or two.
 *
 * The two decisions this page is actually about are the base and the pass, and
 * both are arithmetic rather than taste — which is why the hotel block and the
 * airport-and-rail block are not optional extras here. Every figure is the
 * operator's or the official tourism body's own, with the date it was read.
 *
 * Verified for this page on 30 October 2026:
 *   westjr.co.jp  the HARUKA One-way Ticket table — ¥1,300 Tennoji, ¥1,800
 *                 Osaka/Shin-Osaka and ¥2,200 Kyoto for an adult through
 *                 31 October 2026, becoming ¥1,600, ¥1,900 and ¥2,700 from
 *                 1 November 2026, with child fares at half; the eligibility
 *                 ("a passport issued by a foreign government", entering as a
 *                 "Temporary Visitor"); and that it cannot be bought in Japan.
 *
 * Carried from our own guides, each against the operator's site, with that
 * page's date rather than today's:
 *   kyoto.travel (29 Oct)        Osaka Station → Kyoto about 30 min on the JR
 *                                Special Rapid; Osaka-umeda → Kyoto-Kawaramachi
 *                                about 45 min on Hankyu; Tokyo → Kyoto about
 *                                130 min on Nozomi and 170 on Hikari; and the
 *                                Kyoto Station travel times — Fushimi Inari 10,
 *                                Saga/Arashiyama 25, Higashiyama 35,
 *                                Kinkaku-ji 40 minutes.
 *   westjr.co.jp (25 Oct)        the WEST QR Kansai Area Pass at ¥2,700 for one
 *                                day, ¥4,700 two, ¥5,500 three and ¥6,700 four,
 *                                child at half; the Kansai Mini Pass at ¥3,000
 *                                for three consecutive days.
 *   nankai (26 Oct)              Rapi:t to Namba in a minimum of 34 minutes on a
 *                                ¥700 adult limited express ticket on top of the
 *                                ordinary fare.
 *   usj.co.jp (26–27 Oct)        that USJ publishes no fixed Studio Pass figure
 *                                and has priced Express Passes on demand since
 *                                2018; that tickets go on sale about two months
 *                                ahead; that a pass is valid only for its printed
 *                                date with no refund; and that the official app
 *                                has been required for Area Timed Entry Tickets
 *                                since 5 January 2026.
 *   our Osaka ticket guides      Osaka Castle ¥1,200, 9:00–18:00, last admission
 *     (22–27 Oct)                17:30; the Kuchu Teien Observatory ¥2,000 and
 *                                9:30–22:30 with last admission 22:00; the
 *                                Tombori River Cruise ¥2,000; Kaiyukan ¥2,700 to
 *                                ¥3,200 by date; the Osaka Amazing Pass ¥2,500
 *                                for one day and ¥3,300 for two; the Enjoy Eco
 *                                Card ¥820 weekday and ¥620 weekend.
 *   our Kyoto guides (26–29 Oct) Kiyomizu-dera ¥500 and open from 6:00; Nijo
 *                                Castle ¥1,300 with the Ninomaru-goten Palace;
 *                                the flat ¥230 city-bus fare and the ¥1,100
 *                                Subway & Bus 1-Day Pass; Kyoto's banded lodging
 *                                tax, in force since 1 March 2026.
 *
 * The "time to allow" column in each day table is our own planning allowance and
 * is labelled as such. Nothing here is first-hand, and no Klook price appears
 * anywhere: Klook answers automated reads of its product pages with HTTP 403.
 */

/** Figures read off the operator's own site for this page. */
const OWN_ISO = "2026-10-30";
const OWN = checkedLabel(OWN_ISO);

/** Dates carried from our own guides, each against the operator. */
const KYOTO_TRAVEL_CHECKED = checkedLabel("2026-10-29");
const JR_WEST_PASS_CHECKED = checkedLabel("2026-10-25");
const USJ_CHECKED = checkedLabel("2026-10-27");
const USJ_ACCESS_CHECKED = checkedLabel("2026-10-26");
const OSAKA_TICKETS_CHECKED = checkedLabel("2026-10-27");
const CASTLE_CHECKED = checkedLabel("2026-10-23");
const KAIYUKAN_CHECKED = checkedLabel("2026-10-22");
const PASS_CHECKED = checkedLabel("2026-10-19");
const KYOTO_CITY_CHECKED = checkedLabel("2026-10-26");

const CASTLE_ADULT = "¥1,200";
const UMEDA_ADULT = "¥2,000";
const CRUISE_ADULT = "¥2,000";
const KIYOMIZU_ADULT = "¥500";
const NIJO_ADULT = "¥1,300";
const OSAKA_PASS_1_DAY = "¥2,500";
const OSAKA_PASS_2_DAY = "¥3,300";
const KANSAI_PASS_3_DAY = "¥5,500";
const KYOTO_PASS_ADULT = "¥1,100";
const KYOTO_BUS_FARE = "¥230";

type Stop = {
  part: string;
  place: string;
  /** Our planning allowance, not an operator figure. */
  allow: string;
  getting: string;
  booking: string;
};

const day1: Stop[] = [
  {
    part: "Morning, from 9:00",
    place: "Osaka Castle main tower, then the moats, Otemon approach and Nishinomaru Garden",
    allow: "1 hour inside the tower, 1–2 hours for the grounds",
    getting: "Osaka Metro Tanimachi 4-chome or JR Osakajokoen — about 15–20 minutes on foot from any of the gates",
    booking: "No slot. Open 9:00, last admission 17:30 — go at opening and the queue is the shortest it gets",
  },
  {
    part: "Late morning",
    place: "Kuromon Ichiba Market, Nipponbashi",
    allow: "1–1.5 hours",
    getting: "Tanimachi Line south to Nipponbashi, about 10 minutes",
    booking: "No, unless you want a guided food walk — those are a fixed departure time",
  },
  {
    part: "Early afternoon",
    place: "Shinsaibashi-suji arcade, Doguyasuji and Hozenji Yokocho",
    allow: "1.5 hours",
    getting: "On foot north from Kuromon, under cover almost the whole way",
    booking: "No",
  },
  {
    part: "Mid-afternoon",
    place: "Tombori River Cruise from Tazaemonbashi Pier",
    allow: "20 minutes afloat, about 40 minutes door to door",
    getting: "On foot from the arcade — the pier is on the Dotonbori canal itself",
    booking: "Timed ticket. Pass holders exchange at the desk, and the evening departures go first",
  },
  {
    part: "Late afternoon",
    place: "Kuchu Teien Observatory, Umeda Sky Building",
    allow: "1–1.5 hours, longer if you stay for dusk",
    getting: "Midosuji Line north from Namba to Umeda, about 8 minutes, then roughly 10 on foot",
    booking: "No. Open 9:30–22:30 with last admission 22:00, so this is the one stop that cannot be too late",
  },
  {
    part: "Evening",
    place: "Dotonbori, the Glico sign and dinner in Minami",
    allow: "2–3 hours",
    getting: "Midosuji Line back south to Namba",
    booking: "No",
  },
];

const day2: Stop[] = [
  {
    part: "Before 7:00",
    place: "Fushimi Inari Taisha and the Senbon Torii gate paths",
    allow: "1 hour for the lower gates, 2–3 hours to the summit",
    getting: "JR Nara Line to JR Inari — about 9 minutes from Kyoto Station, and every rapid stops",
    booking: "Nothing to book and no admission. The only stop in three days where the hour is the whole decision",
  },
  {
    part: "Mid-morning",
    place: "Kiyomizu-dera, then the Sannenzaka and Ninenzaka lanes",
    allow: "1 hour at the temple, 1 hour on the lanes",
    getting: "City Bus 100 or 206 to Gojozaka, then about 10 minutes uphill on foot",
    booking: "No — and it opens at 6:00, which is earlier than any other major Kyoto temple",
  },
  {
    part: "Lunch",
    place: "Nishiki Market, or the Gion end of Shijo",
    allow: "1–1.5 hours",
    getting: "Bus or the Keihan Line west, Karasuma subway at Shijo",
    booking: "No",
  },
  {
    part: "Early afternoon",
    place: "Nijo Castle and the Ninomaru-goten Palace",
    allow: "1.5–2 hours",
    getting: "Tozai subway line to Nijojo-mae, directly outside the gate",
    booking: "No, unless you want Honmaru-goten — that one is advance web reservation only",
  },
  {
    part: "Late afternoon",
    place: "Yasaka Shrine, Maruyama Park and the walk down into Gion",
    allow: "1–1.5 hours",
    getting: "Tozai line east to Higashiyama, or the 100 bus back along the morning's route",
    booking: "No",
  },
  {
    part: "Evening",
    place: "Hanamikoji and the Shirakawa lanes, then the train back to Osaka",
    allow: "2 hours, plus about 30 minutes on the train",
    getting: "Keihan from Gion-Shijo, or JR Special Rapid from Kyoto Station — about 30 minutes to Osaka Station",
    booking: "No. If you are sleeping in Kyoto instead, this is the evening that pays for the second hotel",
  },
];

const day3: Stop[] = [
  {
    part: "Option A — morning",
    place: "Arashiyama bamboo grove and Tenryu-ji, before the coaches arrive",
    allow: "1.5–2 hours",
    getting: "JR Sagano Line Rapid from Kyoto Station, about 11 minutes; Kyoto City puts Saga/Arashiyama 25 minutes from the station",
    booking: "No for the grove. Yes for the Sagano Romantic Train, which is a reserved car and seat",
  },
  {
    part: "Option A — afternoon",
    place: "Kinkaku-ji, the Golden Pavilion, then back to Kansai Airport",
    allow: "1 hour at the temple, 75–100 minutes to the airport",
    getting: "Karasuma subway to Kitaoji then City Bus 204 or 205; the HARUKA runs from Kyoto Station with no transfer",
    booking: "No for the temple. It closes at 17:00, which is the hard edge of this version of Day 3",
  },
  {
    part: "Option B — all day",
    place: "Nara: Todai-ji, the Great Buddha, Nara Park and Kasuga Taisha",
    allow: "5–6 hours in Nara, plus about 45 minutes each way",
    getting: "JR Nara Line or the Kintetsu limited express from Kyoto, about 45 minutes; about 45 minutes from Osaka too",
    booking: "No admissions to book. A guided Kyoto-and-Nara coach day is the one booking here",
  },
  {
    part: "Option C — all day",
    place: "Universal Studios Japan",
    allow: "Park opening to close — treat it as the whole day",
    getting: "JR Loop Line to Nishikujo then the Yumesaki Line to Universal City; about 20 minutes from Osaka Station",
    booking: "Yes, and date-specific. A Studio Pass is valid only for its printed date, with no refund",
  },
  {
    part: "Option D — half day",
    place: "Osaka Aquarium Kaiyukan and the bay, for a rainy or child-led Day 3",
    allow: "2.5–3 hours inside",
    getting: "Chuo Line to Osakako, then about 5 minutes on foot",
    booking: "The e-ticket books a 15-minute entry slot from 30 days out — the only timed entry in three days",
  },
];

/** Admissions, hours and passes, each against the operator's own site with the date read. */
const ticketRows = [
  {
    stop: "Osaka Castle main tower (Day 1)",
    price: `${CASTLE_ADULT} adult; free below junior-high age`,
    hours: "9:00–18:00, last admission 17:30",
    booking: "Not needed",
    note: "The four other paid facilities inside the park total ¥5,200 on their own, which is why the city pass wins on an Osaka day rather than on an Osaka trip",
    source: `our Osaka Castle guide, against the operator, ${CASTLE_CHECKED}`,
  },
  {
    stop: "Tombori River Cruise (Day 1)",
    price: `${CRUISE_ADULT} adult`,
    hours: "A 20-minute ride from Tazaemonbashi Pier, every half hour from 11:00 to 21:00",
    booking: "Timed ticket",
    note: "Included on the Osaka Amazing Pass with no time cut-off, exchanged at the pier desk for a departure time. The after-dark departures are the ones that fill, and the boat is open to the sky",
    source: `our Dotonbori cruise guide, ${CASTLE_CHECKED}`,
  },
  {
    stop: "Kuchu Teien Observatory, Umeda Sky Building (Day 1)",
    price: `${UMEDA_ADULT} adult, ¥500 child aged 4 to elementary school`,
    hours: "9:30–22:30, last admission 22:00",
    booking: "Not needed",
    note: "The latest-closing thing on Day 1 by several hours, and free on the Amazing Pass only if you are through the gate by 15:00",
    source: `skybldg.co.jp via our Umeda guide, ${OSAKA_TICKETS_CHECKED}`,
  },
  {
    stop: "Osaka Amazing Pass (Day 1)",
    price: `${OSAKA_PASS_1_DAY} for one day, ${OSAKA_PASS_2_DAY} for two`,
    hours: "One or two calendar days",
    booking: "Not needed",
    note: "Day 1 alone is about ¥5,200 of admissions plus metro rides, so the one-day pass pays on that day and does nothing on the Kyoto day — it covers no JR at all. The Umeda deck is free on it only before 15:00",
    source: `our Osaka Amazing Pass guide, ${PASS_CHECKED}`,
  },
  {
    stop: "Fushimi Inari Taisha (Day 2)",
    price: "No admission charge",
    hours: "The gate paths are ungated and open outside shrine-office hours, which is what makes the dawn slot possible",
    booking: "Not needed",
    note: "The Senbon Torii fills from mid-morning and empties after dark. Kyoto City advises against City Bus South No. 5 for this trip — it records timing variations over 24 minutes",
    source: `kyoto.travel via our Kyoto itinerary, ${KYOTO_TRAVEL_CHECKED}`,
  },
  {
    stop: "Kiyomizu-dera (Day 2)",
    price: `${KIYOMIZU_ADULT} adult, ¥200 elementary and junior high`,
    hours: "6:00 open, 18:00 close (18:30 in July and August)",
    booking: "Not needed",
    note: "A 6:00 opening is the earliest of any major Kyoto temple, which is the reason this is Day 2's second stop rather than its first",
    source: `kiyomizudera.or.jp via our Kyoto itinerary, ${KYOTO_TRAVEL_CHECKED}`,
  },
  {
    stop: "Nijo Castle (Day 2)",
    price: `¥800 castle only, ${NIJO_ADULT} with the Ninomaru-goten Palace`,
    hours: "8:45–16:00, closing 17:00",
    booking: "Only for Honmaru-goten",
    note: "Admission drops to ¥700 with a one-day subway ticket; Honmaru-goten is ¥1,000 by advance web reservation only",
    source: `nijo-jocastle.city.kyoto.lg.jp via our Kyoto itinerary, ${KYOTO_TRAVEL_CHECKED}`,
  },
  {
    stop: "Kyoto Subway & Bus 1-Day Pass (Day 2)",
    price: `${KYOTO_PASS_ADULT} adult, ¥550 child`,
    hours: "One calendar day",
    booking: "Not needed",
    note: `The flat city-bus fare is ${KYOTO_BUS_FARE}, so about five rides break even — and the pass also takes ¥100 off Nijo Castle. It covers no JR, which is what Day 2 uses for Fushimi Inari`,
    source: `Kyoto City Transportation Bureau via our Kyoto guides, ${KYOTO_CITY_CHECKED}`,
  },
  {
    stop: "Osaka Aquarium Kaiyukan (Day 3, option D)",
    price: "¥2,700 to ¥3,200 adult, by date",
    hours: "By season — check the date before you build a half day on it",
    booking: "A 15-minute entry slot, bookable from 30 days out",
    note: "The only timed entry in three days other than USJ, and the re-entry rule ended in June 2026",
    source: `our Kaiyukan guide, against the operator, ${KAIYUKAN_CHECKED}`,
  },
  {
    stop: "Universal Studios Japan Studio Pass (Day 3, option C)",
    price: "No fixed figure is published — the price moves with the date",
    hours: "Park hours move by date too",
    booking: "Date-specific, about two months ahead",
    note: "USJ's own pages state that a pass bought in advance is valid only for its printed date with no refund, and that Express Passes have been priced on demand since 2018. We quote no yen figure because USJ publishes none",
    source: `usj.co.jp via our USJ guide, ${USJ_CHECKED}`,
  },
];

/** Where to sleep, and what each option costs you in moves. */
const stayRows = [
  {
    option: "Three nights in Osaka",
    moves: "One check-in, one check-out",
    good: "Day 1 and Day 3 both start at the door, Kansai Airport is 34–50 minutes away depending on the train, and the Dotonbori evening is a walk rather than a last train",
    bad: "Day 2 begins and ends with about 30 minutes of train each way, so a 6:30 Fushimi Inari means leaving around 5:45",
    pick: "The default for three days, and the only version that works if the airport legs are both out of Kansai.",
  },
  {
    option: "Three nights in Kyoto",
    moves: "One check-in, one check-out",
    good: "The dawn Fushimi Inari becomes easy, Nara is 45 minutes away, and the Haruka reaches Kyoto Station with no transfer",
    bad: "The Osaka day costs you the same 30 minutes in reverse, and Dotonbori at 21:00 means a late train rather than a short walk",
    pick: "If two of your three days are Kyoto-and-Nara rather than Kyoto-and-Osaka.",
  },
  {
    option: "Two nights Osaka, one night Kyoto",
    moves: "Two check-ins, and one morning spent moving luggage",
    good: "Buys exactly one thing: the Kyoto evening and the next dawn without a train attached to either",
    bad: "You lose roughly half a morning to the move, which on a three-day trip is a tenth of the whole trip",
    pick: "Only if an empty Kiyomizu-dera or Fushimi Inari at first light is the reason you came.",
  },
  {
    option: "A night at Universal City",
    moves: "Two or three check-ins",
    good: "The park gates are a short walk from the station, which is worth something if you are there at opening",
    bad: "You are about 20 minutes of JR from everything else here and no Osaka Metro pass reaches you",
    pick: "Only if USJ is a whole day and you are travelling with children.",
  },
];

/** Long-distance and airport access — operators' and official bodies' own figures. */
const accessRows = [
  {
    route: "Kansai Airport → Kyoto, JR HARUKA",
    time: "Direct, no transfer",
    fare: "Discounted one-way for foreign passport holders entering as temporary visitors: ¥2,200 adult through 31 October 2026, ¥2,700 from 1 November 2026",
    note: `JR West's own table, read ${OWN}. Child fares are half. It cannot be bought inside Japan — it is an exchange order or the JR-WEST online reservation before you fly.`,
  },
  {
    route: "Kansai Airport → Tennoji or Shin-Osaka, JR HARUKA",
    time: "Direct, no transfer",
    fare: "¥1,300 Tennoji and ¥1,800 Osaka/Shin-Osaka through 31 October 2026; ¥1,600 and ¥1,900 from 1 November 2026",
    note: `Same JR West table, read ${OWN}. Tennoji is the first city stop, which is why a Tennoji base shortens the airport leg at both ends.`,
  },
  {
    route: "Kansai Airport → Namba, Nankai Rapi:t",
    time: "Minimum 34 minutes",
    fare: "A ¥700 adult limited express ticket on top of the ordinary fare",
    note: `Nankai's own figures, carried from our airport guide, ${USJ_ACCESS_CHECKED}. The only airport train that reaches a Minami base with no change at all.`,
  },
  {
    route: "Osaka Station → Kyoto Station, JR Special Rapid",
    time: "Approx. 30 minutes",
    fare: "Ordinary fare, nothing reserved",
    note: `kyoto.travel's own figure, ${KYOTO_TRAVEL_CHECKED}. The cheapest and fastest city hop, with nothing to book — and it is covered by the Kansai Area Pass.`,
  },
  {
    route: "Osaka-umeda → Kyoto-Kawaramachi, Hankyu",
    time: "Approx. 45 minutes",
    fare: "Ordinary fare",
    note: `Also kyoto.travel, ${KYOTO_TRAVEL_CHECKED}. Lands at Shijo rather than at Kyoto Station, which is the better end of the city for the Gion evening. Not covered by any JR pass.`,
  },
  {
    route: "Kyoto or Osaka → Nara",
    time: "Approx. 45 minutes from either",
    fare: "Ordinary fare on JR, or a Kintetsu limited express ticket on top",
    note: `Carried from our Nara guide and kyoto.travel, ${KYOTO_TRAVEL_CHECKED}. This is why Nara is a Day 3 and never an afternoon.`,
  },
  {
    route: "Tokyo → Kyoto or Shin-Osaka, Tokaido Shinkansen",
    time: "Approx. 130 min to Kyoto on Nozomi, 170 on Hikari",
    fare: "By date and seat class — non-reserved, reserved and Green Car",
    note: `kyoto.travel's figures, ${KYOTO_TRAVEL_CHECKED}. The nationwide JR Pass does not cover Nozomi, which is usually the fact that decides whether a pass helps a three-day Kansai leg at all.`,
  },
];

/** The 3-day pass arithmetic, stated as the comparison rather than as a verdict. */
const passRows = [
  {
    item: "WEST QR Kansai Area Pass, 3 days",
    price: `${KANSAI_PASS_3_DAY} adult, ¥2,750 child`,
    covers:
      "Unlimited JR West local, rapid and special rapid trains around Osaka, Kyoto, Kobe, Nara and Himeji, plus unlimited HARUKA non-reserved seats and two reserved HARUKA seats",
    verdict:
      "Pays if both airport legs are the HARUKA and at least one day is a JR day: two Kyoto HARUKA singles alone are ¥5,400 from 1 November 2026",
  },
  {
    item: "Kansai Mini Pass, 3 consecutive days",
    price: "¥3,000 adult, ¥1,500 child",
    covers: "Rapid and local JR West trains and the Kansai-Airport Rapid Service — no limited express, so no HARUKA",
    verdict: "Cheaper, and the right answer only if you will do the airport run on the slow Rapid rather than the HARUKA",
  },
  {
    item: "Two HARUKA singles and pay-as-you-go",
    price: "¥5,400 adult for two Kyoto singles from 1 November 2026, plus each city hop",
    covers: "Nothing else",
    verdict: "The baseline the pass has to beat. On a three-day trip that uses JR twice between cities, it usually does not",
  },
  {
    item: "Osaka Amazing Pass, 1 day",
    price: `${OSAKA_PASS_1_DAY}`,
    covers: "Osaka Metro and city buses plus admission to more than 40 facilities, including the castle, the Umeda deck and the Tombori cruise",
    verdict: "A different product, not a competitor: buy it for Day 1 and nothing else. It touches no JR and so is useless on the Kyoto day",
  },
];

const bookingWindow = [
  {
    title: "Two months ahead — Universal Studios Japan, if Day 3 is the park",
    desc: "USJ's own purchase-period release puts tickets on sale about two months before the visit date, and a Studio Pass bought in advance is valid only for the date printed on it with no refund. The Express Pass is priced on demand and its day's allocation can sell out, which is the part of a park day that cannot be fixed on the morning.",
  },
  {
    title: "Weeks ahead — the hotel, and whether it is one hotel or two",
    desc: "This is the booking that decides the shape of all three days, not just where you sleep. A single Osaka base costs you about 30 minutes of train at each end of the Kyoto day; a split stay buys the Kyoto evening and the next dawn and costs you half a morning of luggage. Decide it before you book anything else, because the day tables change with it.",
  },
  {
    title: "Before you fly — the airport train or the regional pass",
    desc: "The HARUKA discounted one-way cannot be bought inside Japan: it is an exchange order through an agency or the JR-WEST online reservation with a card, before arrival. The Kansai Area Pass is the same decision in pass form, and the three-day version is the one shaped like this trip.",
  },
  {
    title: "A week or two ahead — one guided day, and one timed ticket",
    desc: "If Day 2 or Day 3 should be a coach rather than a routing exercise, that is a join-in departure with a fixed time. The Tombori River Cruise is a timed ticket whose evening boats go first, and Kaiyukan books a 15-minute entry slot from 30 days out. Everything else in these three days is walk-up.",
  },
  {
    title: "Nothing at all — the castle, the temples, the arcades, the grove",
    desc: "Osaka Castle, Kiyomizu-dera, Nijo Castle, Fushimi Inari, Nishiki Market, Kuromon, Dotonbori, the Umeda deck and the bamboo grove are all walk-up, and two of them charge nothing. On three days in Kansai the scarce resource is the early hour and the hotel, not the ticket.",
  },
];

const faqItems = [
  {
    q: "Is 3 days enough for Osaka and Kyoto?",
    a: `Enough for both cities properly, and not enough to add a third. Three days buys one Osaka day, one Kyoto day and one day that is yours — Nara, Universal Studios Japan, Arashiyama, or the bay with children. The reason it works is the distance: kyoto.travel puts Osaka Station about 30 minutes from Kyoto Station on the JR Special Rapid, and Osaka-umeda about 45 minutes from Kyoto-Kawaramachi on Hankyu, read ${KYOTO_TRAVEL_CHECKED}. What three days will not hold is Kyoto done thoroughly — its four headline sights sit on four different sides of the city, 10 to 40 minutes out of Kyoto Station on the city's own figures — plus Nara, plus Himeji, plus USJ. Pick one Day 3 and let the others go.`,
  },
  {
    q: "Should I stay in Osaka or Kyoto for 3 days?",
    a: `Osaka, unless two of your three days are Kyoto-and-Nara. The arithmetic is simple: whichever city you sleep in, the other one costs you about 30 minutes of train each way, so the base should be the city you spend more days in and the one your airport legs favour. Osaka wins on both for most three-day trips — Nankai's Rapi:t reaches Namba in a minimum of 34 minutes with no change, Day 1 and most Day 3 options start at the door, and the Dotonbori evening is a walk rather than a last train. Kyoto wins if you want the dawn Fushimi Inari without a 5:45 start and Nara on Day 3, since both are 45 minutes or less from Kyoto Station. A split stay — two nights Osaka, one Kyoto — buys the Kyoto evening and the next dawn at the price of half a morning moving luggage, which on three days is about a tenth of the trip.`,
  },
  {
    q: "How do I get from Kansai Airport to Kyoto?",
    a: `The JR HARUKA, with no transfer. For foreign passport holders entering as temporary visitors, JR West's discounted one-way to Kyoto is ¥2,200 for an adult and ¥1,100 for a child through 31 October 2026, rising to ¥2,700 and ¥1,350 from 1 November 2026 — so a trip that straddles that date does not pay the same price in both directions. Read on ${OWN}. Two practical points from JR West's own page: the ticket cannot be bought inside Japan, only as an exchange order through an overseas agency or on the JR-WEST online reservation with a card before you arrive; and the same train reaches Tennoji (¥1,300, then ¥1,600) and Osaka/Shin-Osaka (¥1,800, then ¥1,900) on the way. If you are also doing a Kyoto–Osaka hop or a Nara day, price the three-day Kansai Area Pass against it instead — it covers the HARUKA.`,
  },
  {
    q: "How long is the train from Osaka to Kyoto?",
    a: `About 30 minutes on the JR Special Rapid, on kyoto.travel's own figure, read ${KYOTO_TRAVEL_CHECKED}. That is ordinary fare with nothing reserved and nothing to book, and it is covered by the Kansai Area Pass. The two private alternatives are slower but land better: Hankyu from Osaka-umeda reaches Kyoto-Kawaramachi in about 45 minutes and puts you at Shijo, in the middle of the Gion and Pontocho end of the city, and Keihan from Yodoyabashi runs up the east bank to Gion-Shijo and Sanjo. Neither is on any JR pass. The practical reading for a three-day trip: use JR when the day starts at Kyoto Station — Fushimi Inari and Arashiyama are both JR — and Hankyu or Keihan when it ends in Gion.`,
  },
  {
    q: "Is the Kansai Area Pass worth it for 3 days?",
    a: `Usually yes, if both airport legs are the HARUKA. JR West's WEST QR Kansai Area Pass is ${KANSAI_PASS_3_DAY} for an adult over three days and ¥2,750 for a child, read ${JR_WEST_PASS_CHECKED}, and it covers unlimited HARUKA non-reserved seats plus two reserved ones, the Osaka–Kyoto special rapids, and the JR lines to Nara and Himeji. Two HARUKA singles to Kyoto alone are ¥5,400 from 1 November 2026, which is most of the pass before you have ridden anything between the cities. It stops paying in three cases: if you fly in and out of Itami or Kobe rather than Kansai; if your Kyoto and Osaka days use Hankyu, Keihan and the subways rather than JR, none of which the pass touches; or if the airport run is your only JR ride, in which case the ¥3,000 Kansai Mini Pass or two singles are cheaper. Our Kansai Area Pass guide has the full price table and the line-by-line coverage.`,
  },
  {
    q: "Do I need to book USJ in advance?",
    a: `Yes, and for a specific date. USJ's own pages state that tickets go on sale about two months before the visit date, that a Studio Pass bought in advance is valid only for the date printed on it, and that there is no refund and no move to another time slot if you miss a time-designated attraction — read on ${USJ_CHECKED}. The park publishes no fixed Studio Pass figure: the price moves with the date, and Express Passes have been priced on demand since 2018, so the day's figure appears at checkout. One more thing that catches three-day trips: since 5 January 2026 the official USJ app has been required to obtain Area Timed Entry Tickets and Standby Entry Tickets for Super Nintendo World, and you register your admission ticket in the app first — which is a reason to have data working on the morning of Day 3 rather than at the gate.`,
  },
  {
    q: "What is the best order for 3 days in Osaka and Kyoto?",
    a: `Osaka first, Kyoto second, your choice third — and the order is not arbitrary. Day 1 in Osaka works on an arrival day because nothing in it needs an early start: Osaka Castle opens at 9:00, the arcades are covered, and the Umeda deck takes last admission at 22:00, so a flight that lands at midday still gets most of the day. Day 2 is Kyoto because it is the day that wants a 6:30 start, and you will manage that on your second morning rather than your first. Day 3 is last because it is the one that absorbs the damage: if the weather turns, swap Arashiyama for Kaiyukan; if a flight is early, make it a half day near the airport line. Reverse the order and you spend your jet-lagged first morning trying to be at Fushimi Inari at dawn.`,
  },
  {
    q: "What does a 3 day Osaka and Kyoto itinerary cost in admissions?",
    a: `About ¥5,200 for an adult on Day 1 and about ¥1,800 on Day 2, with Day 3 anywhere from nothing to a park ticket. Day 1 is ${CASTLE_ADULT} for the castle tower, ${CRUISE_ADULT} for the Tombori River Cruise and ${UMEDA_ADULT} for the Kuchu Teien Observatory, which is exactly why the ${OSAKA_PASS_1_DAY} Osaka Amazing Pass pays on that one day — it includes all three plus the metro. Day 2 is ${KIYOMIZU_ADULT} at Kiyomizu-dera and ${NIJO_ADULT} at Nijo Castle with the Ninomaru-goten Palace, and Fushimi Inari charges nothing at all. Add the ${KYOTO_PASS_ADULT} Kyoto Subway & Bus 1-Day Pass if the Kyoto day is bus-heavy, against a flat ${KYOTO_BUS_FARE} fare. Day 3 is free if it is Nara's park and Todai-ji's grounds, ¥2,700–¥3,200 if it is Kaiyukan, and a date-priced Studio Pass if it is USJ. Sources and dates are in the table above.`,
  },
  {
    q: "Can I do Nara as well in 3 days?",
    a: `Yes, as the whole of Day 3 — not as an afternoon. Nara is about 45 minutes from Kyoto on the JR Nara Line or the Kintetsu limited express and about the same from Osaka, which makes it easy and also makes it a day. Todai-ji, the Great Buddha, the deer in Nara Park and Kasuga Taisha are a comfortable five to six hours with lunch, and the walk between them is most of the pleasure. What you cannot do is bolt it onto the Kyoto day: that would mean three cities and two long transfers in one day, and you would see the inside of trains. If Nara is the priority, consider sleeping in Kyoto for all three nights — it shortens both the Nara day and the dawn start on Day 2.`,
  },
  {
    q: "Which day should Universal Studios Japan be?",
    a: `Day 3, and only if you are willing to give up the alternative. USJ is a full day — gates to close — so it replaces Nara, Arashiyama and the bay rather than fitting beside them. Putting it last also puts the one date-locked, non-refundable ticket in the trip at the end, where a delayed flight on the way in cannot destroy it. Two practical notes. The park is reached by the JR Loop Line to Nishikujo and the Yumesaki Line on to Universal City, about 20 minutes from Osaka Station on the Osaka Convention & Tourism Bureau's figure, read ${USJ_ACCESS_CHECKED} — so a JR base at Umeda or Osaka Station shortens the morning. And no Osaka Metro pass covers that run, and the Amazing Pass does not include the park: the Studio Pass is always separate.`,
  },
  {
    q: "Does this itinerary work in the rain?",
    a: `Day 1 holds up best, Day 2 least, and Day 3 is the one you swap. Osaka's Day 1 is largely indoors or under cover — the castle museum, Kuromon's covered market, the Shinsaibashi and Doguyasuji arcades, and the Kuchu Teien Observatory, which is open to 22:30 — with the exception of the Tombori River Cruise, which is an open boat with no roof, so wind and rain are felt rather than watched. Kyoto's Day 2 loses the two things it is built on: the Fushimi Inari mountain paths are steep, stepped and slippery wet, and the Sannenzaka lanes are at their worst crowded and wet together. Nijo Castle's Ninomaru-goten Palace and Nishiki Market are the dry parts. For Day 3, rain is exactly what option D is for: Kaiyukan is entirely indoors and books a 15-minute entry slot from 30 days out, so it is the swap that can be made the evening before.`,
  },
  {
    q: "Is 3 days in Kansai doable with children?",
    a: `Yes, with two changes to the plan. First, cut Day 2's dawn start: the lower Fushimi Inari gates are a short, flat, free walk that works at 9:00 as well as at 6:30, and losing the empty-gate photograph is a fair trade for a child who sleeps. Second, make Day 3 either Universal Studios Japan or Kaiyukan rather than Nara's temples — though Nara Park's deer are, in practice, the most child-friendly thing in the region. Useful figures: Osaka Castle is free below junior-high age, the Kuchu Teien Observatory is ¥500 for a child from age 4 to elementary school, the Kyoto Subway & Bus 1-Day Pass is ¥550 for a child against a flat ${KYOTO_BUS_FARE} fare, and the three-day Kansai Area Pass is ¥2,750 for a child. Kyoto's buses are pay-on-exit and crowded, which with a pushchair is the single strongest argument for using JR and the subway on Day 2.`,
  },
];

const TITLE = "Osaka Kyoto 3 Day Itinerary (2026): Day by Day & Bookings";
const DESCRIPTION =
  "An Osaka Kyoto 3 day itinerary from Kansai Airport: the castle and Dotonbori on Day 1, Fushimi Inari and Kiyomizu-dera on Day 2, Nara or USJ on Day 3.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/osaka-kyoto-3-day-itinerary") },
});

export default function OsakaKyotoThreeDayItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/osaka-kyoto-3-day-itinerary" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/osaka-kyoto-3-day-itinerary" />
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
              route: "/guides/attractions/osaka-kyoto-3-day-itinerary",
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
                  name: "Osaka Kyoto 3 Day Itinerary",
                  item: "https://www.japan-travel-kit.com/guides/attractions/osaka-kyoto-3-day-itinerary",
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
          <span className={styles.breadCurrent}>Osaka Kyoto 3 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Osaka Kyoto 3 Day Itinerary (2026):<br />Day by Day, and What to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Two cities thirty minutes apart, in and out of Kansai Airport. The plan is decided by two
            things — which city you sleep in, and whether the regional pass pays.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices & hours, dated", "A table for each day", "One base or two, worked out"].map((t) => (
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
                <p className={styles.verdictStatValue}>Osaka: castle, Kuromon, Tombori, Umeda</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Kyoto: Fushimi Inari, Kiyomizu-dera, Nijo, Gion</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 3</p>
                <p className={styles.verdictStatValue}>Nara, Arashiyama, USJ or the bay</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where to sleep</p>
                <p className={styles.verdictStatValue}>Three nights in Osaka, for most trips</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              A workable <strong>Osaka Kyoto 3 day itinerary</strong> gives each city one day and keeps the
              third free. <strong>Day 1 is Osaka</strong>: the castle from <strong>9:00</strong>{" "}
              ({CASTLE_ADULT} adult), Kuromon Ichiba, the Shinsaibashi arcades, the{" "}
              <strong>Tombori River Cruise</strong> ({CRUISE_ADULT}) and the{" "}
              <strong>Kuchu Teien Observatory</strong> ({UMEDA_ADULT}, last admission <strong>22:00</strong>),
              finishing in Dotonbori. <strong>Day 2 is Kyoto</strong>, about <strong>30 minutes</strong> away
              on the JR Special Rapid: <strong>Fushimi Inari before 7:00</strong> (free and ungated),{" "}
              <strong>Kiyomizu-dera</strong> from <strong>6:00</strong> ({KIYOMIZU_ADULT}),{" "}
              <strong>Nijo Castle</strong> ({NIJO_ADULT} with the Ninomaru-goten Palace) and Gion at dusk.{" "}
              <strong>Day 3 is the choice</strong> — Nara (about 45 minutes), Arashiyama and Kinkaku-ji,
              Universal Studios Japan, or Kaiyukan if it rains. Sleep in <strong>Osaka all three nights</strong>{" "}
              unless two of your days are Kyoto-and-Nara, and price the{" "}
              <strong>three-day Kansai Area Pass at {KANSAI_PASS_3_DAY}</strong> against two HARUKA singles,
              which are ¥5,400 from 1 November 2026. Figures read off the operators&apos; own sites, the
              HARUKA table on {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={jrKansaiAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Price the 3-Day Kansai Pass →
              </KlookLink>
              <KlookLink href={kyotoNaraKiyomizuTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Kyoto &amp; Nara as One Guided Day →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Should You Split 3 Days Between Osaka and Kyoto?</h2>
          <p className={styles.bodyText}>
            One day each, and one day you choose. That is not a compromise — it is what the geography
            allows. The official Kyoto travel guide puts <strong>Osaka Station about 30 minutes from
            Kyoto Station</strong> on the JR Special Rapid and <strong>Osaka-umeda about 45 minutes from
            Kyoto-Kawaramachi</strong> on Hankyu, read {KYOTO_TRAVEL_CHECKED}. Half an hour is close enough
            that one base serves both cities, and far enough that doing both cities in one day wastes the day.
          </p>
          <p className={styles.bodyText}>
            This page is about that split and the two bookings inside it, which is what separates it from the
            other itineraries here. Our{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary">Osaka 2 day itinerary</Link> and{" "}
            <Link href="/guides/attractions/kyoto-2-day-itinerary">Kyoto 2 day itinerary</Link> each route one
            city on the assumption you have two days for it; our{" "}
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary">7-day Tokyo, Kyoto and Osaka
            itinerary</Link> is a week with a shinkansen in it. Here, each day carries its own table — part
            of day, where, how long to allow, how you get there, and whether it needs booking — with the
            Klook listings for that day&apos;s bookings underneath it.
          </p>
          <p className={styles.bodyText}>
            Two decisions shape everything else, and both are arithmetic. <strong>Which city do you sleep
            in?</strong> Whichever you choose, the other costs about 30 minutes of train each way, so the base
            should follow your Day 3 and your airport legs. <strong>Does the regional pass pay?</strong> Two
            HARUKA singles to Kyoto are ¥5,400 from 1 November 2026 against{" "}
            {KANSAI_PASS_3_DAY} for a three-day Kansai Area Pass that also covers the city hops. Both are
            worked through below, with the tables to check them against your own dates.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>Day 1 — Osaka: the Castle, Minami and the Umeda Deck</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Osaka goes first because it is the day an arrival can absorb. Nothing in it needs dawn: the castle
            tower opens at <strong>9:00</strong>, the Kuromon and Shinsaibashi stretch is covered against
            weather, and the Umeda deck takes last admission at <strong>22:00</strong> — so a flight that
            lands at midday still gets two thirds of this day, which is not true of Day 2.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Part of day", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {day1.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.part}</td>
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
            <strong>What to book for Day 1.</strong> One pass and one timed ticket, with one condition
            attached. The <strong>Osaka Amazing Pass</strong> at {OSAKA_PASS_1_DAY} for a day includes the
            castle tower, the Tombori River Cruise and the Kuchu Teien Observatory — about ¥5,200 of
            admissions on this day alone — plus the metro rides between them, which is why it pays on Day 1
            and on no other day of this trip. The condition: the <strong>Umeda deck is free on the pass only
            if you enter before 15:00</strong>, and from 15:00 the pass becomes a 10% discount instead. So a
            pass day and a sunset on the rooftop do not overlap — move the deck to late morning if you are
            holding the pass, or buy that one ticket separately and keep the dusk. The{" "}
            <strong>Tombori River Cruise</strong> is a timed ticket whose after-dark departures fill first,
            and pass holders exchange at the pier desk for a departure time; note that the boat is open to
            the sky. One thing to be clear about: Klook does not sell the operator&apos;s own Tombori boat as
            a standalone listing — what it sells is the other Dotonbori boats from the same pier, and the
            pass that includes the Tombori one free. A <strong>Kuromon food walk</strong> is the only thing
            here with a fixed departure time. Our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass guide</Link> works the
            break-even facility by facility, and our{" "}
            <Link href="/guides/attractions/dotonbori-river-cruise">Dotonbori river cruise guide</Link>{" "}
            compares the four boats.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
            <KlookLink href={dotonboriCityCruise.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Dotonbori city cruise →
            </KlookLink>
            <KlookLink href={kuromonMarketFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kuromon food walk →
            </KlookLink>
          </div>
        </section>

        {/* Day 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>Day 2 — Kyoto: Fushimi Inari at Dawn, Then East</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Kyoto gets the early start, because exactly one stop in three days is ruined by arriving at a
            sensible hour. The <strong>Senbon Torii gate paths at Fushimi Inari are free, ungated and
            open</strong>, and they are full from mid-morning until dark. From an Osaka base that means a
            train around 5:45; from Kyoto it means getting up. Settle that before you book the hotel, because
            it is the single biggest argument for sleeping in Kyoto.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Part of day", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {day2.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.part}</td>
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
            <strong>What to book for Day 2.</strong> Nothing, unless you would rather not route it. Every stop
            on this day is walk-up and one of them is free — which is the real difference between planning
            Kyoto and planning Tokyo. The two things worth buying are a{" "}
            <strong>guided day</strong>, which solves the four-compass-points problem Kyoto actually poses, and
            the <strong>Kyoto Subway &amp; Bus 1-Day Pass</strong> at {KYOTO_PASS_ADULT} if the day turns out
            bus-heavy — against a flat {KYOTO_BUS_FARE} fare, about five rides break even, and it takes ¥100
            off Nijo Castle. Note that the pass covers no JR, and Fushimi Inari is JR. Our{" "}
            <Link href="/guides/attractions/kyoto-2-day-itinerary">Kyoto 2 day itinerary</Link> has the full
            version of this day plus a second one, and our{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto guide</Link> covers the
            buses and the two subway lines.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoHighlightBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kyoto four-sight guided day →
            </KlookLink>
            <KlookLink href={kyotoNaraArashiyamaTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Arashiyama &amp; Fushimi Inari from Osaka →
            </KlookLink>
          </div>
        </section>

        {/* Day 3 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 3</span>
          <h2 className={styles.sectionTitle}>Day 3 — Nara, Arashiyama, USJ or the Bay</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Day 3 is a choice between four whole days, not a list of extras — and it is the day that absorbs
            the trip&apos;s damage. If the weather turns, option D is indoors. If your flight is early, option
            A can be halved. Only one of the four needs a ticket bought weeks ago, and it is the only one that
            cannot be changed on the morning.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {day3.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.part}</td>
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
            <strong>What to book for Day 3.</strong> If it is <strong>USJ</strong>, a dated Studio Pass, about
            two months ahead — see the section below, because this is the one booking in the trip with no
            flexibility in it at all. If it is <strong>Nara or Kyoto&apos;s west side</strong>, either nothing
            or one guided coach day, which is the version that does the routing for you. If it is{" "}
            <strong>Kaiyukan</strong>, a 15-minute entry slot, bookable from 30 days out. Our{" "}
            <Link href="/guides/attractions/nara-day-trip">Nara day trip guide</Link> covers what fits in a
            day there, and our{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka">Kyoto and Nara day tour
            guide</Link> compares the coach routes out of Osaka.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoNaraKiyomizuTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kyoto &amp; Nara day tour →
            </KlookLink>
            <KlookLink href={kyotoNaraArashiyamaTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Arashiyama, Nara &amp; Fushimi Inari day →
            </KlookLink>
            <KlookLink href={usjStudioPassUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              USJ Studio Pass →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The &ldquo;time to allow&rdquo; column in all three tables is our own planning allowance, not an
            operator figure. Opening hours and admissions are in the dated table below, each against the
            operator&apos;s own site or against the guide on this site that verified it.
          </p>
        </section>

        {/* Prices and hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; hours</span>
          <h2 className={styles.sectionTitle}>What Does an Osaka and Kyoto 3 Day Itinerary Cost in Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About <strong>¥5,200 of admissions on Day 1</strong> and about <strong>¥1,800 on Day 2</strong>,
            with Day 3 anywhere between nothing and a park ticket. The imbalance is the useful part: Osaka
            charges for views and boats, Kyoto charges for gates and lets its most famous shrine in free. Every
            figure below is the operator&apos;s own published price, with the source and the date it was read.
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
            Subject to change — confirm with the operator. Each row carries the date the figure was read off
            the operator&apos;s own site, either for this page or for the guide on this site named in the
            source column. The same admissions appear with the same dates in the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>{" "}
            where that table carries them. No Klook price appears anywhere on this page: Klook answers
            automated reads of its product pages with an error, so no figure from it could be verified.
          </p>
        </section>

        {/* Where to stay */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Should You Stay in Osaka or Kyoto for 3 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Osaka for three nights, unless two of your three days are Kyoto-and-Nara. On a three-day trip the
            hotel is not a comfort decision — it is the decision that sets how much of each day you spend on a
            train, and how many mornings you spend moving luggage. These are the four options this itinerary
            actually produces, with what each one costs you.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Luggage moves", "What it buys", "What it costs", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stayRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.moves}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.good}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bad}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            We publish no room rates, because none can be verified — availability and price are per-hotel and
            per-date. The journey times are the official bodies&apos; own, read {KYOTO_TRAVEL_CHECKED}. One
            thing to budget for that is not the room: if you do sleep in Kyoto, its lodging tax has been banded
            since <strong>1 March 2026</strong>, from ¥200 a person a night under ¥6,000 upward. Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={{ color: "var(--text)", fontWeight: 600 }}>
              where to stay in Osaka guide
            </Link>{" "}
            and{" "}
            <Link href="/guides/attractions/where-to-stay-in-kyoto" style={{ color: "var(--text)", fontWeight: 600 }}>
              where to stay in Kyoto guide
            </Link>{" "}
            compare the areas inside each city on the lines under them, and the Kyoto one carries the full
            lodging-tax band table.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for the Bases Above"
          intro="Which rooms are left and at what price is a per-date question, so each option links into Klook's own hotel search for it. On three days the thing to compare is not the nightly rate but how many city crossings and luggage moves the location saves you — which is what the why line on each one is about."
          areas={osakaKyotoThreeDayStayAreas}
        />

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get From Kansai Airport to Osaka and Kyoto?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Three days in Kansai is almost always in and out of Kansai Airport, so the arrival is the HARUKA
            to Kyoto, Shin-Osaka or Tennoji, or Nankai&apos;s Rapi:t to Namba. Every figure below is the
            operator&apos;s or the official tourism body&apos;s own published number — and one of them changes
            on 1 November 2026.
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
            Two things on this table are worth acting on rather than reading. The{" "}
            <strong>HARUKA discounted one-way rises on 1 November 2026</strong> — to Kyoto from ¥2,200 to
            ¥2,700 for an adult, to Tennoji from ¥1,300 to ¥1,600, to Osaka and Shin-Osaka from ¥1,800 to
            ¥1,900, with child fares at half — and JR West states it cannot be bought inside Japan at all, only
            as an exchange order through an overseas agency or on the JR-WEST online reservation with a card.
            Read {OWN}. And the nationwide <strong>JR Pass does not cover Nozomi</strong>, the fast
            Tokyo–Kyoto service, which is normally what decides whether a pass helps a three-day Kansai leg
            inside a longer trip. Our{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit">HARUKA vs Nankai Rapi:t guide</Link>{" "}
            compares the two airport trains, and our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> runs the break-even against
            point-to-point tickets.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR HARUKA ticket →
            </KlookLink>
            <KlookLink href={nankaiRapitUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nankai Rapi:t ticket →
            </KlookLink>
            <KlookLink href={shinkansenTokyoOsaka.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Osaka shinkansen →
            </KlookLink>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kyoto shinkansen →
            </KlookLink>
          </div>
        </section>

        {/* The pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The pass</span>
          <h2 className={styles.sectionTitle}>Is the Kansai Area Pass Worth It for 3 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Usually yes — if both airport legs are the HARUKA. The three-day WEST QR Kansai Area Pass is{" "}
            <strong>{KANSAI_PASS_3_DAY} for an adult</strong> and ¥2,750 for a child, read{" "}
            {JR_WEST_PASS_CHECKED}, and two HARUKA singles to Kyoto on their own are ¥5,400 from 1 November
            2026. That is the whole argument in one line. Here is what it is being compared against.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Price", "What it covers", "When it wins"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The three cases where it does not pay are worth knowing before you buy. If you fly in or out of
            Itami or Kobe rather than Kansai, the pass loses its biggest single component. If your Osaka and
            Kyoto days run on Hankyu, Keihan and the two cities&apos; subways rather than on JR — which is
            genuinely common, because those lines land closer to Gion and to Minami — the pass covers none of
            it. And if the airport run is your only JR ride at all, the ¥3,000 Kansai Mini Pass or two singles
            are cheaper. Our{" "}
            <Link href="/guides/attractions/kansai-area-pass">Kansai Area Pass guide</Link> has the full price
            table, the line-by-line coverage and the 1 October 2026 switch to the WEST QR version.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKansaiAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR-West Kansai Rail Pass →
            </KlookLink>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
          </div>
        </section>

        {/* USJ */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Day 3, option C</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book USJ in Advance?</h2>
          <p className={styles.bodyText}>
            Yes, and for a named date. This is the only booking in three days that cannot be rearranged on the
            morning, which is why it belongs on Day 3 rather than Day 1. What USJ itself publishes, read{" "}
            {USJ_CHECKED}: tickets go on sale about <strong>two months</strong> before the visit date; a pass
            bought in advance is <strong>valid only for the date printed on it</strong>, with no refund and no
            move to another slot if you miss a time-designated attraction; and the park quotes{" "}
            <strong>no fixed Studio Pass figure</strong> at all, because the price moves with the date and
            Express Passes have been priced on demand since 2018. We therefore quote no yen figure here — the
            day&apos;s price appears at checkout.
          </p>
          <p className={styles.bodyText}>
            One more rule catches three-day trips specifically. Since <strong>5 January 2026</strong> the
            official USJ app has been required to obtain Area Timed Entry Tickets and Standby Entry Tickets for
            Super Nintendo World, and you register your admission ticket in the app first. That is a reason to
            have data working before you reach the gates, not after. Getting there: the JR Loop Line to
            Nishikujo and the Yumesaki Line on to Universal City, about <strong>20 minutes from Osaka
            Station</strong> on the Osaka Convention &amp; Tourism Bureau&apos;s figure, read{" "}
            {USJ_ACCESS_CHECKED} — and no Osaka Metro pass covers that run. Our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">USJ Express Pass guide</Link> sets out
            which variants exist and the dates a Studio Pass alone is enough.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={usjStudioPassUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              USJ Studio Pass on Klook →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Klook eSIM for the app →
            </KlookLink>
          </div>
        </section>

        <GygCompare
          slug="osaka-kyoto-3-day-itinerary"
          heading="The USJ Tickets, Compared on GetYourGuide"
          intro="One product on this page is worth checking in two places. The USJ Studio Pass and the Express Pass are sold by GetYourGuide as well as by Klook, and the Express Pass in particular is the ticket we have the least reason to steer you to one seller for. We publish no price or cancellation comparison — neither seller's pages can be read automatically, so neither could be verified."
          listings={[gygUsj, gygUsjExpressPass, gygOsaka]}
        />

        {/* Booking window */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>What Should You Book Before a 3 Day Kansai Trip?</h2>
          <p className={styles.bodyText}>
            Four things, and one of them is not a ticket. Here is the whole trip sorted by how far ahead each
            thing has to be settled — which on three days matters more than on a week, because there is no
            spare day to move anything into.
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
            Cancellation terms matter more here than on a longer trip, for the same reason: with three days
            there is nowhere to move a rained-off plan. Check the window on whichever route you book the USJ
            pass, the Kaiyukan slot and any guided day, since those three are the ones with a date and a time
            locked into them. Everything else in these three days is walk-up and carries no risk at all.
          </p>
        </section>

        {/* Trip prep */}
        <KlookTripPrep
          label="Before you go"
          heading="The Bookings That Sit Outside the Three Days"
          intro="Six bookings happen before the itinerary starts: the regional pass, the two airport trains it is priced against, the city pass for Day 1, one guided day if Day 2 or Day 3 should be someone else's routing problem, and data. Klook blocks automated price reads, so open a listing for the figure on your own dates."
          items={osakaKyotoThreeDayTripPrep}
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

        {/* Klook tours */}
        <KlookTourPicks
          heading="If You Would Rather Not Route Day 2 or Day 3 Yourself"
          intro="The first two listings are the closest thing to a whole day of this guide in one booking — Kyoto's four compass points as a single coach day, and the Kyoto-and-Nara version for Day 3. The other two are the Osaka hours this itinerary singles out: the Dotonbori canal after dark and the Kuromon market at lunchtime."
          tours={[kyotoHighlightBusTour, kyotoNaraKiyomizuTour, dotonboriCityCruise, kuromonMarketFoodTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/osaka-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka 2 Day Itinerary (2026): Day by Day, and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto 2 Day Itinerary (2026): Day by Day, and Bookings</p>
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
            <Link href="/guides/attractions/kansai-area-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kansai Area Pass (2026): Prices, What It Covers and Whether It Pays</p>
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
                <p className={styles.relatedTitle}>Where to Stay in Osaka (2026): Best Areas, Compared by Line and Travel Time</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Travel Time</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 10V7a2 2 0 0 1 4 0M14 7a2 2 0 0 1 4 0v3" />
                  <path d="M5 13a7 7 0 0 0 14 0z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Kyoto or Osaka, and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2.5 5.5L20 10l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Express Pass 2026: Types, Prices &amp; Do You Need One</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/haruka-vs-nankai-rapit" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>HARUKA vs Nankai Rapi:t (2026): Which Kansai Airport Train</p>
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
            <h2 className={styles.ctaBannerTitle}>Three days, two cities, two decisions</h2>
            <p className={styles.ctaBannerDesc}>
              Settle the base and the pass and the rest of this itinerary is walk-up. If Day 2 or Day 3 should
              be someone else&apos;s routing problem, Kyoto&apos;s four sights and the Nara day are both sold
              as a single coach day.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={jrKansaiAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Price the 3-Day Kansai Pass →
              </KlookLink>
              <KlookLink href={kyotoNaraKiyomizuTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Kyoto &amp; Nara Day →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
