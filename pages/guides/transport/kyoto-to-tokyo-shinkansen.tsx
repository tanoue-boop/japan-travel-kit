import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import {
  hanedaLimousineBus,
  jrPassWholeJapan,
  klookEsim,
  kyotoToTokyoArrivalStayAreas,
  kyotoToTokyoTripPrep,
  naritaLimousineBus,
  shinkansenKyotoTokyo,
  tokyoPrivateAirportTransfer,
  tokyoSharedAirportTransfer,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kyoto to Tokyo on the Tokaido Shinkansen. Added 29 Oct 2026 as the eastbound
 * counterpart to pages/guides/transport/tokyo-to-kyoto.tsx, which stays the
 * "cheapest and fastest ways" comparison for the westbound trip.
 *
 * The two pages deliberately do not share a table. tokyo-to-kyoto answers
 * "how do I get from Tokyo to Kyoto" by ranking the shinkansen trains against
 * the night buses. This page answers the
 * questions that only exist in the other direction and are the ones a traveller
 * actually has on their last Kyoto morning: which Kyoto Station platform, which
 * Tokyo-area station to get off at, which side of the train Mt Fuji is on when
 * you are heading east, what to do with the cases after checkout, and whether
 * the day can end at an airport. The bus-versus-train comparison is linked, not
 * repeated.
 *
 * What is printed here and where it came from, all read on 29 October 2026:
 *  - "130 minutes from Tokyo to Kyoto" and "You'll arrive in Kyoto from Tokyo
 *    in about 2 hours", from JR Central's own Tokaido Shinkansen page on
 *    global.jr-central.co.jp;
 *  - "Travel from Tokyo Station to Shin-Osaka in just 2 hours 21 minutes" and
 *    "For the best view of Mt. Fuji, choose Seat E in Standard Class or Seat D
 *    in Green Class", from JR Central's own Shinkansen Perfect Guide;
 *  - the Tokaido station order (Tokyo, Shinagawa, Shin-Yokohama, Odawara,
 *    Atami, Mishima, Shin-Fuji, Shizuoka … Kyoto, Shin-Osaka), from JR
 *    Central's own station-map index;
 *  - the eight 2026–27 periods in which every NOZOMI car runs as a reserved
 *    car, from JR Central's railway.jr-central.co.jp/nozomi/, with the English
 *    wording — "During the peak periods, Nozomi trains do not have non-reserved
 *    seat setting available" and "Hikari, Kodama, Mizuho, Sakura, and Tsubame
 *    trains have non-reserved seats as usual" — from global.jr-central.co.jp/en/nozomi/;
 *  - the ¥4,960 NOZOMI/MIZUHO ticket for Tokyo–Kyoto, the rule that "the same
 *    prices apply to Green Car tickets, reserved seat tickets in an ordinary car
 *    and non-reserved seat tickets in an ordinary car", and the sales window
 *    "from one month prior to the day of boarding the train to the day of
 *    boarding the train", from japanrailpass.net;
 *  - the ¥50,000 / ¥80,000 / ¥100,000 online and ¥53,000 / ¥84,000 / ¥105,000
 *    Exchange Order Ordinary pass prices, plus the Green Car figures, from
 *    japanrailpass.net's own price page;
 *  - the oversized-baggage rule — 160 cm or less in the racks, 161 to 250 cm in
 *    a reserved seat with a baggage area, no surcharge for that seat, ¥1,000
 *    including tax without one — from JR Central's own luggage page;
 *  - "2h" shortest and "4h 1m" average journey, "0 transfer(s)", "352 trains
 *    scheduled on Nov. 04, 2026", the 06:03 first and 21:38 last departure and
 *    the three seat classes, from Klook's own Kyoto–Tokyo rail page, which
 *    unlike its /activity/ pages answers automated reads.
 *
 * Two honest gaps, both labelled on the page itself.
 *
 * First, the fare. JR Central publishes the smartEX reserved-seat price list
 * only as a PDF that could not be read automatically from here, and it does not
 * publish the station-window fare as a static HTML table at all. So the only
 * ticket price on this page that is not an operator figure is our own rounded
 * reference value out of data/jr-fares.json, and the table says so in the source
 * column rather than dressing it up as JR's.
 *
 * Second, Kyoto Station's platform numbers. The authoritative source is JR
 * West's own Kyoto Station map, which is a PDF that also could not be parsed;
 * tracks 11–14 with the Tokyo-bound trains on 11 and 13 was confirmed through
 * the westjr.co.jp search index for that official map, and the source column
 * says exactly that.
 *
 * And no Klook price appears anywhere: Klook answers automated reads of its
 * product pages with HTTP 403.
 *
 * 11 Nov 2026 (task-jtk-20261111-R03, rank fix for "kyoto to tokyo train"). Both
 * gaps above are now closed, all read on 11 November 2026:
 *  - the fare: JR Central's smartEX price lists (smart-ex.jp/en/product/plan/
 *    service/pdf/service_fares_reserved.pdf and …_non_reserved.pdf, "As of April
 *    1, 2025", regular season, one adult) were extracted as text. Kyoto–Tokyo is
 *    ¥13,970 reserved on a Nozomi/Mizuho, ¥13,650 reserved on a Hikari/Kodama and
 *    ¥13,320 non-reserved. data/jr-fares.json carries 13970 for this pair, which
 *    is the official Nozomi figure (its "Hikari" label is the mismatch); the JSON
 *    is left alone because jr-pass-guide prints ¥13,970 in its own text, and this
 *    page now prints the operator figures directly instead of reading the JSON;
 *  - the platforms: JR West's own station timetable for Kyoto, Tokaido
 *    Shinkansen towards Nagoya/Tokyo (timetable.jr-odekake.net, 11 Nov 2026) shows
 *    the Tokyo-bound trains on tracks 11 and 12 — not 11 and 13 as this page said;
 *  - the journey times, from the same timetable's train pages for 11 Nov 2026:
 *    Nozomi 76 08:13 → Tokyo 10:24 (2h11), Hikari 642 08:33 → 11:12 (2h39),
 *    Kodama 808 08:10 → 11:48 (3h38), last Tokyo-bound Nozomi 64 21:38 → 23:45;
 *    first Tokyo-bound departure 06:14 (Nozomi 230);
 *  - Kyoto Station's gates (Shinkansen Central Exit leads to the Hachijo side, not
 *    to the north "Central Exit"; Central Transfer gate for JR local lines; the
 *    city-bus terminal in front of the north Central Exit), from kyoto.travel, the
 *    site of the Kyoto City Tourism Association.
 *
 * 18 Nov 2026 (task-jtk-20261118-R07, "kyoto to tokyo train" at 16th). Title and H1
 * now lead with "Kyoto to Tokyo Train 2026" and carry "Kyoto to Tokyo shinkansen";
 * FAQ cut to five questions; a buying-options table (smartEX / station / Klook) added.
 * Re-read on 18 November 2026:
 *  - smartEX price PDFs ("As of April 1, 2025", still the current lists): Kyoto–Tokyo
 *    ¥13,970 Nozomi reserved, ¥13,650 Hikari/Kodama reserved, ¥13,320 non-reserved;
 *    off-peak −¥200, peak +¥200, super-peak +¥400 for a Tokaido-only trip;
 *  - smart-ex.jp/en/product/plan/service/: sales from 5:30 a.m. one year before (train and
 *    seat confirmed after 8:00 a.m. one month before), up to 4 minutes before departure;
 *    changes free; refund fee ¥320 before departure; QR ticket or IC card at the gate;
 *  - the station price: JR Central's own 30 May 2023 release (jr-central.co.jp/news/
 *    release/_pdf/000042742.pdf) gives ¥14,170 as the standard Tokyo/Shinagawa–Kyoto
 *    Nozomi fare, regular season. JR Central/JR West's 16 Oct 2026 release (…/000046069.pdf)
 *    raises the Nozomi/Mizuho reserved limited-express charge for Tokyo–Kyoto by ¥700 for
 *    tickets bought from 1 July 2027 and leaves non-reserved unchanged — so ¥14,170 is
 *    the current station price until then;
 *  - japanrailpass.net: NOZOMI MIZUHO Ticket Tokyo–Kyoto ¥4,960; 7-day Ordinary ¥50,000
 *    online / ¥53,000 Exchange Order.
 * data/jr-fares.json keeps 13970 for tokyo-kyoto: it equals the official smartEX Nozomi
 * figure, and no operator page gives a Hikari station price for the pair (the ¥13,850
 * seen elsewhere comes from jr-group.jp, which states it is a private site), so there is
 * no official number to change it to. Journey times stay the 11 Nov timetable reads.
 */

const OWN_ISO = "2026-10-29";
const OWN = checkedLabel(OWN_ISO);
const NOW_ISO = "2026-11-11";
const NOW = checkedLabel(NOW_ISO);
const TODAY_ISO = "2026-11-18";
const TODAY = checkedLabel(TODAY_ISO);

/** Official pages behind the fares and the JR Pass rule, re-read on TODAY_ISO. */
const FARE_SOURCES = [
  { label: "smartEX fares (JR Central)", href: "https://smart-ex.jp/en/product/plan/service/" },
  { label: "JR Central fare release", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
  { label: "JAPAN RAIL PASS NOZOMI MIZUHO Ticket", href: "https://japanrailpass.net/en/use/special-ticket/" },
  { label: "JR West Kyoto timetable", href: "https://timetable.jr-odekake.net/" },
];

/** Station-price constant: JR Central's standard Nozomi fare, valid until 1 July 2027 purchases. */
const STATION_NOZOMI = "¥14,170";

/** smartEX, "As of April 1, 2025", regular season, one adult, read on 11 Nov 2026. */
const NOZOMI_RESERVED = "¥13,970";
const HIKARI_RESERVED = "¥13,650";
const NON_RESERVED = "¥13,320";

const NOZOMI_TICKET = "¥4,960";
const JR_PASS_7 = "¥50,000";
const BAGGAGE_FEE = "¥1,000";

/**
 * The 2026–27 periods in which JR Central runs every NOZOMI car as a reserved
 * car. Straight off railway.jr-central.co.jp/nozomi/, read on 29 Oct 2026. This
 * matters more leaving Kyoto than it does leaving Tokyo: a Kyoto departure is
 * usually the last morning of a trip, with a flight or a booked Tokyo night at
 * the other end of it, so there is no later train to fall back on.
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

/**
 * (a) Nozomi, Hikari, Kodama side by side. Times are one real train of each type
 * on JR West's Kyoto timetable for 11 Nov 2026; fares are smartEX regular season.
 */
const trainTypeRows = [
  {
    train: "Bottom line: take a Nozomi",
    example: "The fastest of the three; no change of train",
    time: "2h 11m",
    fare: `${NOZOMI_RESERVED} reserved on smartEX (${STATION_NOZOMI} at the station)`,
    pass: `JR Pass holders: Hikari at no extra cost, or Nozomi plus the ${NOZOMI_TICKET} ticket`,
  },
  {
    train: "Nozomi",
    example: "Nozomi 76: Kyoto 08:13 → Tokyo 10:24",
    time: "2h 11m",
    fare: `${NOZOMI_RESERVED} reserved / ${NON_RESERVED} non-reserved`,
    pass: `Not covered on its own — a pass holder buys the ${NOZOMI_TICKET} NOZOMI/MIZUHO ticket each time`,
  },
  {
    train: "Hikari",
    example: "Hikari 642: Kyoto 08:33 → Tokyo 11:12",
    time: "2h 39m",
    fare: `${HIKARI_RESERVED} reserved / ${NON_RESERVED} non-reserved`,
    pass: "Covered, seat reservation free",
  },
  {
    train: "Kodama",
    example: "Kodama 808: Kyoto 08:10 → Tokyo 11:48",
    time: "3h 38m",
    fare: `${HIKARI_RESERVED} reserved / ${NON_RESERVED} non-reserved`,
    pass: "Covered, seat reservation free — stops at every station",
  },
];

/**
 * (b) Kyoto Station: where the Tokyo trains leave from and which gate gets you
 * there. Platforms from JR West's timetable; gates from kyoto.travel (Kyoto City
 * Tourism Association), both read on 11 Nov 2026.
 */
const stationRows = [
  {
    item: "Tokyo-bound shinkansen platforms",
    answer: "Tracks 11 and 12",
    detail:
      "Every Tokyo-bound train on JR West's Kyoto timetable for 11 November 2026 is shown on track 11 or 12. The board and your ticket give the track for your train; JR West notes the track can change on the day",
    source: `timetable.jr-odekake.net, ${NOW}`,
  },
  {
    item: "From the street, south side",
    answer: "Hachijo Exit",
    detail:
      'The shinkansen concourse sits on the Hachijo (south) side. The gate called "Shinkansen Central Exit" leads to the Hachijo Exit — it is not the north-side "Central Exit" of the local lines, which is the commonest wrong turn',
    source: `kyoto.travel (Kyoto City Tourism Association), ${NOW}`,
  },
  {
    item: "From the street, north side",
    answer: "Central Exit (Kyoto Tower side)",
    detail:
      "The city-bus terminal is right in front of the north Central Exit, at the foot of Kyoto Tower. Coming from there, allow several minutes with cases to cross the station to the shinkansen gates",
    source: `kyoto.travel, ${NOW}`,
  },
  {
    item: "From a JR local train (Kyoto, Kosei or Nara Line)",
    answer: "Central Transfer gate",
    detail:
      'The "Transfer to JR Lines (Central Transfer)" gate links the local-line platforms to the shinkansen without leaving the paid area, and has escalators, lifts and a multipurpose toilet just outside it',
    source: `kyoto.travel, ${NOW}`,
  },
  {
    item: "From the Karasuma subway line",
    answer: "Subway South Ticket Gate → Hachijo side",
    detail:
      "The Hachijo-side routes from the shinkansen concourse, including the Hachijo East Exit at the back of the concourse, lead underground to the Karasuma Line's South Ticket Gate",
    source: `kyoto.travel, ${NOW}`,
  },
];

/**
 * (c) When to book, and what to book with a big case. JR Central and
 * japanrailpass.net figures; the all-reserved Nozomi dates were read on 29 Oct.
 */
const bookingRows = [
  {
    item: "When reserved seats go on sale",
    answer: "One month before the day of travel",
    detail:
      'JR Central\'s luggage page says baggage-area seats open one month in advance "like other reserved seats"; the JAPAN RAIL PASS NOZOMI/MIZUHO ticket is sold "from one month prior to the day of boarding the train to the day of boarding the train"',
    source: `global.jr-central.co.jp and japanrailpass.net, ${NOW}`,
  },
  {
    item: "Remaining 2026–27 dates when every Nozomi seat is reserved",
    answer: "21–23 Nov 2026; 25 Dec 2026 – 5 Jan 2027; 9–11 Jan 2027; 20–22 Mar 2027",
    detail:
      "On these dates the Nozomi has no non-reserved car at all, so a walk-up Nozomi ticket is not possible. JR Central publishes no separate rule for the autumn-leaf season; its November dates are the 21–23 November long weekend. Hikari and Kodama keep their non-reserved cars but JR Central warns they “may be overcrowded”",
    source: `railway.jr-central.co.jp/nozomi and global.jr-central.co.jp/en/nozomi, ${OWN}`,
  },
  {
    item: "Bag up to 160 cm (three sides added)",
    answer: "No booking, no fee",
    detail: "Overhead rack, at your feet or in the deck storage area",
    source: `JR Central's luggage page, ${NOW}`,
  },
  {
    item: "Bag 161–250 cm",
    answer: "Book a seat with an oversized baggage area",
    detail: `Same price as an ordinary reserved or Green seat; book it at a ticket office, a reserved-seat machine ("Seat with an oversized baggage area") or online. Board without one and the fee is ${BAGGAGE_FEE} including tax`,
    source: `JR Central's luggage page, ${NOW}`,
  },
  {
    item: "Bag over 250 cm",
    answer: "Not allowed on board",
    detail: "JR Central: baggage over 250 cm in total “cannot be brought on board” — send it by courier instead",
    source: `JR Central's luggage page, ${NOW}`,
  },
];

/** The route as the operator and the booking page state it. */
const routeRows = [
  {
    item: "Fastest Kyoto → Tokyo journey",
    value: "About 2 hours 10 minutes, no transfer",
    detail:
      'On JR West\'s own timetable for 11 November 2026, Nozomi 76 leaves Kyoto at 08:13 and reaches Tokyo at 10:24 — 2 hours 11 minutes. JR Central\'s own Tokaido Shinkansen page puts the leg at "130 minutes", and Klook\'s eastbound rail page states the route "features 0 transfer(s)"',
    source: `timetable.jr-odekake.net, ${NOW}; global.jr-central.co.jp and klook.com rail page, ${OWN}`,
  },
  {
    item: "Average journey on the booking page",
    value: "4 hours 1 minute",
    detail:
      "Klook's average across the whole day, and the gap between that and the 2-hour fastest is the KODAMA — the all-stops Tokaido service, which adds roughly two hours between Kyoto and Tokyo. The average is not the journey you will take unless you book badly",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "First and last train to Tokyo",
    value: "06:14 and 21:38 (arrives 23:45)",
    detail:
      "JR West's Kyoto timetable for 11 November 2026: the first Tokyo-bound departure is Nozomi 230 at 06:14 and the last is Nozomi 64 at 21:38, into Tokyo at 23:45. The four eastbound departures after it that evening run only as far as Nagoya. Klook's rail page counted 352 trains across its sample day (4 November 2026)",
    source: `timetable.jr-odekake.net, ${NOW}; klook.com rail page, ${OWN}`,
  },
  {
    item: "Seat classes sold for the route",
    value: "Non-reserved Ordinary, Reserved Ordinary, Reserved Green",
    detail:
      "The three ticket types Klook's eastbound route page lists. There is no Gran Class on the Tokaido line — that is a Tohoku and Hokuriku car. JR Central's new Supreme Class debuts above Green on this line, but it is not a seat class the route page sells yet",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Tokyo-area stations before the terminus",
    value: "Shin-Yokohama, then Shinagawa, then Tokyo",
    detail:
      "The order the line runs in heading east, from JR Central's own station index: Kyoto, Maibara, Gifu-Hashima, Nagoya, Mikawa-Anjo, Toyohashi, Hamamatsu, Kakegawa, Shizuoka, Shin-Fuji, Mishima, Atami, Odawara, Shin-Yokohama, Shinagawa, Tokyo. Which of the last three you get off at is a real decision — see below",
    source: `global.jr-central.co.jp station index, ${OWN}`,
  },
  {
    item: "Carrying on to Shin-Osaka instead",
    value: "The same trains run the other way",
    detail:
      'For scale on the line as a whole, JR Central states "Travel from Tokyo Station to Shin-Osaka in just 2 hours 21 minutes" — Kyoto is the stop before it, which is why a Kyoto departure is only about a quarter of an hour shorter than an Osaka one',
    source: `JR Central Shinkansen Perfect Guide, ${OWN}`,
  },
];

/** What it costs. Operator figures first; the one value that is ours says so. */
const priceRows = [
  {
    item: "Nozomi, reserved Ordinary seat",
    price: NOZOMI_RESERVED,
    covers:
      "One adult, one way, regular season, on JR Central's smartEX service. The off-peak price is ¥200 lower and peak-season prices are higher, on smartEX's own season rules",
    source: `smart-ex.jp price list "As of April 1, 2025", ${TODAY}`,
  },
  {
    item: "Nozomi, reserved Ordinary seat, bought at the station",
    price: STATION_NOZOMI,
    covers:
      "JR Central's standard Tokyo/Shinagawa–Kyoto fare on a Nozomi, regular season, at a ticket machine or JR ticket office. JR Central and JR West have announced that the Nozomi reserved-seat charge on this pair rises by ¥700 for tickets bought from 1 July 2027; the non-reserved charge does not change",
    source: `jr-central.co.jp releases of 30 May 2023 and 16 Oct 2026, ${TODAY}`,
  },
  {
    item: "Hikari or Kodama, reserved Ordinary seat",
    price: HIKARI_RESERVED,
    covers:
      "The same seat on the slower trains, ¥320 less than the Nozomi. These are the trains a JAPAN RAIL PASS covers with no extra ticket",
    source: `smart-ex.jp price list "As of April 1, 2025", ${NOW}`,
  },
  {
    item: "Non-reserved Ordinary seat",
    price: NON_RESERVED,
    covers:
      "Any Nozomi, Hikari or Kodama with a non-reserved car; sit where you find space. Not an option on a Nozomi in the peak periods further down this page, when every Nozomi car is reserved",
    source: `smart-ex.jp price list "As of April 1, 2025", ${NOW}`,
  },
  {
    item: "Reserved Green Car",
    price: "More than reserved Ordinary; sold as its own class",
    covers:
      "Klook's eastbound route page sells all three classes for this route. Green is the quieter, wider car — and for Mt Fuji the window seat letter changes: JR Central names Seat D in Green Class rather than Seat E",
    source: `klook.com rail page and JR Central's Shinkansen Perfect Guide, ${OWN}`,
  },
  {
    item: "NOZOMI / MIZUHO ticket for rail-pass holders",
    price: `${NOZOMI_TICKET} Tokyo – Kyoto`,
    covers:
      'The special ticket a JAPAN RAIL PASS holder has to buy to ride a NOZOMI, each time. JR states "the same prices apply to Green Car tickets, reserved seat tickets in an ordinary car and non-reserved seat tickets in an ordinary car", and it is on sale "from one month prior to the day of boarding the train to the day of boarding the train"',
    source: `japanrailpass.net, ${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS, Ordinary",
    price: `${JR_PASS_7} / ¥80,000 / ¥100,000 for 7 / 14 / 21 days online`,
    covers:
      "¥53,000, ¥84,000 and ¥105,000 as an Exchange Order bought through an overseas agency. Green Car is ¥70,000, ¥110,000 and ¥140,000 online and ¥74,000, ¥116,000 and ¥147,000 as an Exchange Order",
    source: `japanrailpass.net's own price page, ${OWN}`,
  },
  {
    item: "Oversized baggage, booked wrong",
    price: `${BAGGAGE_FEE} including tax`,
    covers:
      "The fee JR charges for boarding with a case over 160 cm across three dimensions and no reserved seat with a baggage area. The seat itself is free — see the luggage section below",
    source: `JR Central's own luggage page, ${OWN}`,
  },
];

/** Which ticket, for which trip. */
const compareRows = [
  {
    option: "One reserved Ordinary ticket, bought in advance",
    cost: `${NOZOMI_RESERVED} on a Nozomi, ${HIKARI_RESERVED} on a Hikari (smartEX)`,
    gets: "A named seat on a 2-hour direct train, with the luggage question settled before you leave the hotel.",
    pick: "The default, and especially so on a last Kyoto morning — you are travelling with everything you bought, on a train you cannot afford to miss.",
  },
  {
    option: "Non-reserved Ordinary, walk up",
    cost: `${NON_RESERVED} (smartEX)`,
    gets: "Any train with a non-reserved car, whenever you reach the platform.",
    pick: "A fine plan on a normal weekday with hand luggage. A bad one in the peak periods below, when NOZOMI trains have no non-reserved car at all.",
  },
  {
    option: "JAPAN RAIL PASS on the HIKARI or KODAMA",
    cost: `${JR_PASS_7} online, ¥53,000 as an Exchange Order`,
    gets: "The journey at no extra charge, plus the Yamanote and the Narita Express at the Tokyo end — on a HIKARI (2h39 on the 11 November timetable) or a KODAMA (3h38), both direct.",
    pick: "Only if the same week already has Hiroshima, Kanazawa or Tohoku in it. A Kyoto–Tokyo single plus a Tokyo–Kyoto single does not come close to ¥50,000.",
  },
  {
    option: "JAPAN RAIL PASS plus the NOZOMI ticket",
    cost: `${JR_PASS_7} plus ${NOZOMI_TICKET} for this leg`,
    gets: "The pass, and the fast train — the 2h11 run rather than the HIKARI's 2h39.",
    pick: "Worth it on the one leg where you are catching a flight or have a timed booking in Tokyo. JR prices it the same whether you then sit in Green, reserved or non-reserved.",
  },
  {
    option: "The night bus",
    cost: "A fraction of the fare, at about seven to eight hours",
    gets: "The cheapest way between the two cities, with a night on board.",
    pick: "Rarely the right call eastbound with a full suitcase. The westbound page compares it properly rather than this one repeating the table.",
  },
];

/**
 * (b, 18 Nov 2026) Where to buy the ticket. smartEX terms from smart-ex.jp/en/product/plan/
 * service/, the station price from JR Central's releases, the Klook classes from its
 * own rail page. No Klook price: it changes by date.
 */
const buyRows = [
  {
    way: "Bottom line: smartEX for most visitors",
    price: `${NOZOMI_RESERVED} Nozomi reserved — ¥200 under the ${STATION_NOZOMI} station price`,
    when: "Book in advance, pick the seat on a map, change for free; Klook if you would rather pay before you fly",
    board: "QR ticket or a registered IC card",
  },
  {
    way: "smartEX (JR Central's own site and app, in English)",
    price: `${NOZOMI_RESERVED} Nozomi / ${HIKARI_RESERVED} Hikari or Kodama / ${NON_RESERVED} non-reserved`,
    when: "From 5:30 a.m. one year before (train and seat confirmed one month before) up to 4 minutes before departure. Changes free before departure; refund fee ¥320",
    board: "QR ticket or IC card straight through the shinkansen gate",
  },
  {
    way: "Station ticket machine or JR ticket office",
    price: `${STATION_NOZOMI} Nozomi reserved, regular season`,
    when: "Reserved seats go on sale one month before the day of travel; this is also where JR Pass holders reserve and buy the NOZOMI MIZUHO ticket",
    board: "Paper ticket through the gate",
  },
  {
    way: "Klook (Kyoto–Tokyo rail page)",
    price: "Shown for your date on the listing (not quoted here)",
    when: "Book in English before the trip; the route page sells non-reserved, reserved Ordinary and reserved Green",
    board: "Follow the listing's own collection or boarding instructions",
  },
];

/** Tokyo, Shinagawa or Shin-Yokohama — the decision this page exists for. */
const arrivalRows = [
  {
    station: "Bottom line: Tokyo Station",
    forWho: "Most travellers — Shinagawa instead if you are heading to Haneda, Shibuya or Odaiba",
    why: "The terminus, so there is no stop to watch for; Shinagawa comes one stop earlier",
    transfer: "See the two rows below",
    source: `JR Central station index, ${OWN}`,
  },
  {
    station: "Tokyo Station",
    forWho: "Marunouchi, Ginza, Nihonbashi, Asakusa, Ueno — and anyone flying out of Narita",
    why: "The terminus, so nobody has to watch for the stop. The Narita Express and the Marunouchi, Yamanote, Chuo and Keiyo lines all leave from the same complex, and the Tokaido platforms are inside the building",
    transfer: "Narita Express, JR Yamanote, Chuo and Keiyo lines, Tokyo Metro Marunouchi Line",
    source: `JR Central station index, ${OWN}`,
  },
  {
    station: "Shinagawa",
    forWho: "Shibuya, Meguro, Odaiba, Yokohama — and anyone flying out of Haneda",
    why: "The stop before the terminus, which saves the last stretch into Tokyo Station and its crowds. Keikyu to Haneda runs from the same station, and the Yamanote reaches Shibuya in a few stops",
    transfer: "JR Yamanote Line; Keikyu Line to Haneda Airport",
    source: `JR Central station index, ${OWN}`,
  },
  {
    station: "Shin-Yokohama",
    forWho: "Yokohama, Minato Mirai, Kamakura and the whole south-west side",
    why: "Two stops before Tokyo. If your night is in Yokohama rather than Tokyo, getting off here saves a double-back of the better part of an hour with the cases",
    transfer: "Local lines into Yokohama",
    source: `JR Central station index, ${OWN}`,
  },
];

const faqItems = [
  {
    q: "How long is the train from Kyoto to Tokyo?",
    a: `About 2 hours 11 minutes on the fastest train, a Nozomi, with no change. On JR West's own Kyoto timetable for 11 November 2026, Nozomi 76 leaves Kyoto at 08:13 and reaches Tokyo at 10:24 (2h 11m); Hikari 642 leaves at 08:33 and arrives at 11:12 (2h 39m); and Kodama 808, which stops at every station, leaves at 08:10 and arrives at 11:48 (3h 38m). The first Tokyo-bound train that day was at 06:14 and the last at 21:38, arriving 23:45. Read on ${NOW}; times vary slightly by train and date.`,
  },
  {
    q: "How much is the Kyoto to Tokyo shinkansen?",
    a: `${NOZOMI_RESERVED} one way for a reserved seat on a Nozomi on JR Central's smartEX, ${HIKARI_RESERVED} on a Hikari or Kodama, and ${NON_RESERVED} non-reserved — one adult, regular season, from smartEX's price list "As of April 1, 2025", checked on ${TODAY}. At a station ticket machine or office the Nozomi reserved seat is ${STATION_NOZOMI}, JR Central's standard fare. Off-peak dates are ¥200 cheaper and peak dates ¥200–¥400 dearer for a reserved seat. JR Central has announced that the Nozomi reserved-seat charge for Tokyo–Kyoto rises by ¥700 for tickets bought from 1 July 2027; non-reserved does not change.`,
  },
  {
    q: "Can I use the JR Pass from Kyoto to Tokyo?",
    a: `Yes. The JAPAN RAIL PASS covers the Hikari and Kodama between Kyoto and Tokyo at no extra charge, with free seat reservations. For a Nozomi you buy the ${NOZOMI_TICKET} NOZOMI MIZUHO Ticket for each ride, the same price for Green, reserved or non-reserved seats (japanrailpass.net, checked on ${TODAY}). For this one leg the pass does not pay: a 7-day Ordinary pass is ${JR_PASS_7} online or ¥53,000 as an Exchange Order, against a one-way smartEX fare of ${NOZOMI_RESERVED}. It starts to make sense when the same week includes Hiroshima, Kanazawa or Tohoku.`,
  },
  {
    q: "Which side to sit for Mt Fuji from Kyoto to Tokyo?",
    a: `The left side in the direction of travel — book seat E in an Ordinary car or seat D in the Green Car. JR Central's own Shinkansen Perfect Guide says "For the best view of Mt. Fuji, choose Seat E in Standard Class or Seat D in Green Class"; seat letters are fixed to the carriage, so heading east from Kyoto that window is on your left. The mountain comes late on this run, on the Shizuoka–Shin-Fuji–Mishima stretch in the last third of the journey, and it is often hidden by cloud. Read on ${OWN}.`,
  },
  {
    q: "Do I need to reserve a seat?",
    a: `Not on most days — every Nozomi, Hikari and Kodama has non-reserved cars outside the peak periods, at ${NON_RESERVED}. But on JR Central's peak dates every Nozomi car is reserved (remaining 2026–27 dates: 21–23 Nov 2026; 25 Dec 2026 – 5 Jan 2027; 9–11 Jan 2027; 20–22 Mar 2027), and a case over 160 cm needs a reserved seat with an oversized baggage area or a ${BAGGAGE_FEE} fee. Reserved seats go on sale one month before the day of travel at stations; smartEX takes requests up to a year ahead. On a last Kyoto morning with a flight or a booked Tokyo night, reserve. Read on ${OWN} and ${TODAY}.`,
  },
];

const TITLE = "Kyoto to Tokyo Train 2026: Shinkansen Time, Price & Tickets";
const DESCRIPTION =
  "Kyoto to Tokyo train: fastest Kyoto to Tokyo shinkansen 2h11 (Nozomi), ¥13,970 reserved on smartEX (18 Nov 2026). JR Pass: Hikari free, Nozomi +¥4,960.";

/** "Last checked … Official pages: …" under each table. */
function SourcesLine({ what }: { what: string }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      <strong>Last checked: {TODAY_ISO}</strong> ({what}). Official pages:{" "}
      {FARE_SOURCES.map((s, i) => (
        <span key={s.href}>
          <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>{s.label}</a>
          {i < FARE_SOURCES.length - 1 ? ", " : "."}
        </span>
      ))}
    </p>
  );
}
const CANONICAL = "https://www.japan-travel-kit.com/guides/transport/kyoto-to-tokyo-shinkansen";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/transport/kyoto-to-tokyo-shinkansen") },
});

export default function KyotoToTokyoShinkansenPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={CANONICAL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={CANONICAL} />
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
              route: "/guides/transport/kyoto-to-tokyo-shinkansen",
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
                { "@type": "ListItem", position: 4, name: "Kyoto to Tokyo Train", item: CANONICAL },
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Kyoto to Tokyo Train</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kyoto to Tokyo Train 2026: <br />Kyoto to Tokyo Shinkansen Time, Price &amp; Tickets
          </h1>
          <p className={styles.heroSubtitle}>
            Leaving from Kyoto Station: the Nozomi, Hikari and Kodama compared, smartEX against the station
            and Klook, and which Tokyo stop to get off at.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "smartEX fares, dated", "Kyoto Station tracks 11–12", "Tokyo, Shinagawa or Shin-Yokohama"].map((t) => (
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
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Kyoto → Tokyo</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fastest journey</p>
                <p className={styles.verdictStatValue}>2h 11m on a Nozomi, no transfer</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Reserved seat (smartEX)</p>
                <p className={styles.verdictStatValue}>{NOZOMI_RESERVED} Nozomi, {HIKARI_RESERVED} Hikari</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Last train to Tokyo</p>
                <p className={styles.verdictStatValue}>21:38, arrives 23:45</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On a JR Pass</p>
                <p className={styles.verdictStatValue}>Hikari free, Nozomi {NOZOMI_TICKET}</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>Kyoto to Tokyo train</strong> is the Tokaido Shinkansen, and the fastest one, a Nozomi,
              takes <strong>about 2 hours 11 minutes</strong> with no change (JR West timetable, {NOW}). A reserved
              seat costs <strong>{NOZOMI_RESERVED}</strong> one way on JR Central&apos;s smartEX ({STATION_NOZOMI} at
              the station; {HIKARI_RESERVED} on a Hikari or Kodama; adult, regular season, checked {TODAY}). With
              a <strong>JAPAN RAIL PASS</strong> the Hikari and Kodama cost nothing extra, while the Nozomi needs
              a <strong>{NOZOMI_TICKET}</strong> NOZOMI MIZUHO Ticket for each ride (japanrailpass.net, {TODAY}).
            </p>
            <p className={styles.verdictText}>
              Trains leave from tracks 11 and 12 on Kyoto Station&apos;s Hachijo (south) side, and the last one
              to Tokyo is 21:38. This page is the eastbound trip; going the other way, see{" "}
              <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenKyotoTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Kyoto → Tokyo Tickets →
              </KlookLink>
              <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Price the JAPAN RAIL PASS →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="Book with the train"
          heading="Book the Same Day: Tokyo Hotel, Subway Ticket, eSIM"
          intro="The train ends inside Tokyo Station. A room near it, a subway ticket for the days after and data for the journey are the three bookings the shinkansen ticket does not cover."
          items={kyotoToTokyoTripPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why the Kyoto to Tokyo Train Is Not Just Tokyo to Kyoto Backwards</h2>
          <p className={styles.bodyText}>
            The train is the same train and the line is the same line. What changes is everything around it.
            Going west, you leave from the station your hotel is probably near, you arrive at a single
            terminus, and Mt Fuji turns up on your right about forty minutes in. Going east, you leave on the
            last morning of a Kyoto stay, from platforms on the far side of a very large station, with more
            luggage than you arrived with — and you arrive in a city with three shinkansen stops, only one of
            which is likely to be the right one for you.
          </p>
          <p className={styles.bodyText}>
            So this page is built around the four decisions that only exist in this direction:{" "}
            <strong>which Kyoto Station gates and platforms</strong>, <strong>what to do with the cases
            after checkout</strong>, <strong>which side the mountain is on when you are facing the other
            way</strong>, and <strong>whether to get off at Tokyo, Shinagawa or Shin-Yokohama</strong>. The
            ticket decision is the same in both directions and we cover it below; the shinkansen-versus-bus
            comparison lives on the westbound page, and we link to it rather than printing the table twice.
          </p>
          <p className={styles.bodyText}>
            One thing worth knowing before anything else: the eastbound timetable stops earlier than people
            expect. JR West&apos;s own Kyoto timetable for 11 November 2026 puts the last Tokyo-bound
            departure at <strong>21:38</strong>, into Tokyo at 23:45. If this is your travel day and there is a flight on the other side of it,
            that number does more to shape the plan than the fare does.
          </p>
        </section>

        {/* Route table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The train</span>
          <h2 className={styles.sectionTitle}>How Long Is the Train from Kyoto to Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About 2 hours 10 minutes on a Nozomi, 2 hours 40 minutes on a Hikari and 3 hours 40 minutes on a
            Kodama — all direct, with no transfer. The times below are one real morning train of each type on
            JR West&apos;s own Kyoto timetable for 11 November 2026, and the fares are JR Central&apos;s smartEX
            prices for one adult in the regular season, both read on {NOW}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Train", "Example (11 Nov 2026)", "Kyoto → Tokyo", "Fare, one adult (smartEX)", "On a JR Pass"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trainTypeRows.map((row) => (
                    <tr key={row.train}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.train}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.example}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourcesLine what={`smartEX fares and the JR Pass ticket; example train times from JR West's timetable for ${NOW_ISO}`} />
          <p className={styles.bodyText} style={{ margin: "1rem 0" }}>
            The rest of the route, with the first and last trains and the stations before Tokyo:
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
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> covers the mechanics, and{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto</Link> is the westbound version of
            this trip, with the night bus priced against the train. Starting from Osaka instead, the{" "}
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen">Tokyo to Osaka shinkansen price and time guide</Link>{" "}
            has the Shin-Osaka fares for every seat class.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenKyotoTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kyoto → Tokyo tickets →
            </KlookLink>
          </div>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Is the Kyoto to Tokyo Shinkansen?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>{NOZOMI_RESERVED}</strong> one way for a reserved Ordinary seat on a Nozomi,{" "}
            <strong>{HIKARI_RESERVED}</strong> on a Hikari or Kodama and <strong>{NON_RESERVED}</strong>{" "}
            non-reserved — JR Central&apos;s smartEX prices for one adult in the regular season, from its own
            price list dated &ldquo;As of April 1, 2025&rdquo; and checked again on {TODAY}. At a station
            machine or ticket office the Nozomi reserved seat is <strong>{STATION_NOZOMI}</strong>. The
            pass-holder rows are japanrailpass.net&apos;s own figures.
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
            Subject to change — confirm before buying. smartEX prices are for one adult, one way; on
            smartEX&apos;s own season rule the off-peak reserved price is ¥200 lower and peak-season prices are
            higher. No Klook price appears on this page: Klook prices change by date, so check the listing
            for your date.
          </p>
          <SourcesLine what="smartEX price lists, JR Central's fare releases and japanrailpass.net" />
        </section>

        {/* Buying options */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tickets</span>
          <h2 className={styles.sectionTitle}>Where Do I Buy Kyoto to Tokyo Shinkansen Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            On JR Central&apos;s smartEX for the lowest regular fare — {NOZOMI_RESERVED} against {STATION_NOZOMI}{" "}
            for the same Nozomi seat at the station — or on Klook if you want it settled before you fly. The
            station machines and ticket offices are where JR Pass holders reserve, and where anyone can buy on
            the day.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where to buy", "Price (adult, regular season)", "Booking window and changes", "At the gate"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyRows.map((row) => (
                    <tr key={row.way}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.way}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.board}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourcesLine what="smartEX booking rules, station fare and JR Pass ticket; Klook seat classes from its rail page, 29 Oct 2026" />
          <p className={styles.bodyText}>
            The things a quick answer leaves out: on the peak dates further down every Nozomi seat is reserved,
            so book as soon as the date is fixed; smartEX changes are free until departure, while a refund before
            departure costs ¥320; and a case over 160 cm needs a seat with an oversized baggage area, which JR
            Central sells at ticket offices, reserved-seat machines and online. For how each ticket type works,
            see the <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenKyotoTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Kyoto → Tokyo seats on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Pass comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Can I Use the JR Pass from Kyoto to Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes: the Hikari and Kodama are covered with a free seat reservation, and the Nozomi needs the{" "}
            <strong>{NOZOMI_TICKET}</strong> NOZOMI/MIZUHO ticket per ride. Buying a pass for this leg alone
            does not pay, though. A 7-day Ordinary <strong>JAPAN RAIL PASS</strong> is {JR_PASS_7} online and
            ¥53,000 as an Exchange Order bought abroad, against a one-way smartEX fare of {NOZOMI_RESERVED}{" "}
            on a Nozomi — so even a round trip between the two cities does not get there. What changes the
            answer is the rest of the week, and what you do with JR once you are in Tokyo.
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
            ticket issued only to JAPAN RAIL PASS holders, and &ldquo;the same prices apply to Green Car
            tickets, reserved seat tickets in an ordinary car and non-reserved seat tickets in an ordinary
            car&rdquo;. For Tokyo–Kyoto that ticket is <strong>{NOZOMI_TICKET}</strong>, and it is sold
            &ldquo;from one month prior to the day of boarding the train to the day of boarding the
            train&rdquo; at reserved-seat machines, JR ticket offices and Travel Centers. Our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works the break-even against
            your own legs, and{" "}
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary">our 7-day Tokyo–Kyoto–Osaka
            itinerary</Link> is the trip shape where it most often does pay.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 day) →
            </KlookLink>
            <KlookLink href={shinkansenKyotoTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Price a single instead →
            </KlookLink>
          </div>
        </section>

        {/* Mt Fuji */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The view</span>
          <h2 className={styles.sectionTitle}>Which Side to Sit for Mt Fuji from Kyoto to Tokyo?</h2>
          <p className={styles.bodyText}>
            <strong>On your left</strong> in the direction of travel — and the seat to book is the same letter
            as in the other direction. JR Central&apos;s own Shinkansen Perfect Guide puts it without any
            qualification: &ldquo;For the best view of Mt. Fuji, choose Seat E in Standard Class or Seat D in
            Green Class.&rdquo; It does not say right or left, and it does not need to. Seat letters are fixed
            to the carriage rather than to which way the train is pointing, so the E and D windows look out at
            the same physical side of the train on every run. Heading west out of Tokyo that side is your
            right; heading east out of Kyoto it is your left.
          </p>
          <p className={styles.bodyText}>
            The timing is the other thing that flips. Westbound, Fuji arrives early. Eastbound it arrives
            late: on JR Central&apos;s own station order the mountain sits on the{" "}
            <strong>Shizuoka–Shin-Fuji–Mishima</strong> stretch, which on a Kyoto departure is the last third
            of the journey rather than the first. If you were planning to sleep, sleep early.
          </p>
          <p className={styles.bodyText}>
            And the caveat that no booking can fix: Fuji is frequently invisible. Clear, dry winter mornings
            give the best odds; hazy summer afternoons the worst. A window seat is worth booking for it, but
            it is not worth paying a Green Car premium for a view the weather decides. Read on {OWN}.
          </p>
        </section>

        {/* Kyoto Station */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Leaving Kyoto</span>
          <h2 className={styles.sectionTitle}>Which Platform Does the Tokyo Train Leave from at Kyoto Station?</h2>
          <p className={styles.bodyText}>
            <strong>Track 11 or 12.</strong> Every Tokyo-bound train on JR West&apos;s own Kyoto timetable for
            11 November 2026 is listed on one of those two tracks. They sit behind their own shinkansen gates on
            the <strong>Hachijo — south — side</strong> of the station, the opposite side from the north Central
            Exit, the city-bus terminal and Kyoto Tower. Which gate to use depends on how you reach the station:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where you are", "Use", "What to know", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stationRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.answer}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Why this is worth a table rather than a footnote: if your last Kyoto morning ends anywhere on
            the north side — Nishiki Market, the Karasuma subway, almost any city bus — you have a walk of
            several minutes through one of the busiest concourses in Japan before you even reach the gates.
            With cases, on a departure day, build that in.
          </p>
          <p className={styles.bodyText}>
            The luggage itself has three sensible answers. Leave the cases in the hotel luggage room after
            checkout and collect them on the way to the station; take them to Kyoto Station and use the
            lockers or the staffed service there; or forward them to your Tokyo hotel with a takkyubin
            courier, which is what anyone with more bags than hands does and which sidesteps the shinkansen
            oversized-baggage reservation entirely. Fees and cut-off times vary by hotel and counter, so they are
            not quoted here — ask at the desk the night before, and confirm the Tokyo hotel will accept a
            delivery.
          </p>
          <p className={styles.bodyText}>
            For the Kyoto-side logistics of that morning — which bus, which subway, and whether a day pass is
            worth buying for half a day — see{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto</Link> and our{" "}
            <Link href="/guides/transport/kyoto-subway-bus-pass">Kyoto Subway &amp; Bus pass verdict</Link>,
            and if this train ends a short Kyoto stay, our{" "}
            <Link href="/guides/attractions/kyoto-3-day-itinerary">3-day Kyoto itinerary</Link> plans the
            days before it.
          </p>
        </section>

        {/* Where to get off */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Arriving</span>
          <h2 className={styles.sectionTitle}>Should I Get Off at Tokyo, Shinagawa or Shin-Yokohama?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Whichever is nearest your bed or your flight. On JR Central&apos;s own station index the line runs{" "}
            <strong>Shin-Yokohama, then Shinagawa, then Tokyo</strong> — so two of your three options come up
            before the terminus, and getting off early is often the shorter journey door to door.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Get off at", "Best for", "Why", "Change to", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {arrivalRows.map((row) => (
                    <tr key={row.station}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.station}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.forWho}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.transfer}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {OWN_ISO}</strong> (station order on the Tokaido Shinkansen). Official page:{" "}
            <a href="https://global.jr-central.co.jp/en/" target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>
              JR Central (global.jr-central.co.jp)
            </a>.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            One practical note against all of the above: the terminus is the easy option precisely because you
            cannot miss it. If you are tired, carrying a lot, or travelling with children, Tokyo Station is
            not the wrong answer even when Shinagawa is technically closer. Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo guide</Link>{" "}
            compares the areas properly, and our{" "}
            <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link> covers
            the Narita and Haneda runs from each of them.
          </p>
        </section>

        {/* Reservations */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservations</span>
          <h2 className={styles.sectionTitle}>Do I Need to Reserve a Seat from Kyoto to Tokyo?</h2>
          <p className={styles.bodyText}>
            Most of the year, no — but book as soon as your date is fixed on the peak dates below, or if a
            case is over 160 cm. Reserved seats go on sale one month before the day of travel.
          </p>
          <div className={styles.tableWrap} style={{ margin: "1rem 0" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Situation", "What to do", "Detail", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.answer}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText}>
            Outside the peak dates, walking up works. With <strong>352 eastbound departures</strong> on Klook&apos;s sample date,
            turning up and taking the next train on a non-reserved ticket is a reasonable plan rather than a
            gamble. On eight sets of dates it stops being optional: JR Central runs{" "}
            <strong>every NOZOMI car as a reserved car</strong> through the peak periods, so the fast train to
            Tokyo has no non-reserved section at all on those days. Read from JR Central&apos;s own page on{" "}
            {OWN}:
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
            JR Central&apos;s English wording is that &ldquo;during the peak periods, Nozomi trains do not have
            non-reserved seat setting available&rdquo;, while &ldquo;Hikari, Kodama, Mizuho, Sakura, and
            Tsubame trains have non-reserved seats as usual&rdquo; — with its own warning that non-reserved
            seating on the HIKARI and KODAMA &ldquo;may be overcrowded during the peak periods&rdquo;. So
            there is a walk-up fallback in Golden Week; it is slower and it may mean standing.
          </p>
          <p className={styles.bodyText}>
            Two reasons to reserve on this leg even outside those dates, both specific to the direction. A
            Kyoto departure is usually the last morning of a trip, with a booked Tokyo night or a flight on
            the other end of it and no later train to absorb a mistake. And you are carrying more than you
            arrived with, which makes a named seat — and a baggage space, if you need one — worth the few
            hundred yen. With a <strong>JAPAN RAIL PASS</strong> the reservation itself is free, so there is
            no argument at all.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenKyotoTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Pick a train and seat class →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        {/* Luggage */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Luggage</span>
          <h2 className={styles.sectionTitle}>Where Do I Put Large Luggage on the Shinkansen?</h2>
          <p className={styles.bodyText}>
            A bag whose three dimensions add up to <strong>160 cm or less</strong> goes in the overhead rack
            or at your feet, with nothing to book and nothing to pay. Above that, JR Central&apos;s own
            luggage page requires a reserved seat with an oversized baggage area: baggage totalling{" "}
            <strong>between 161 and 250 cm</strong> has to travel in the baggage space behind one of those
            seats. The seat costs nothing extra — JR states the tickets are &ldquo;the same price as reserved
            seats in ordinary cars and green cars&rdquo;.
          </p>
          <p className={styles.bodyText}>
            Board with an oversized case and no reservation and there is a{" "}
            <strong>{BAGGAGE_FEE} baggage fee, tax included</strong>. You book the seat at a ticket office by
            asking for one with an oversized baggage area, at a reserved-seat vending machine, or online. The
            rule applies to the Tokaido, Sanyo and Kyushu Shinkansen, which is exactly this journey. Read on{" "}
            {OWN}.
          </p>
          <p className={styles.bodyText}>
            This bites harder leaving Kyoto than arriving. Most airline-checked cases come in under 160 cm,
            but a trip&apos;s worth of shopping, a bagged pushchair, a ski bag or a golf cover will not — and
            the baggage seats only exist in reserved cars, so a non-reserved ticket is not a way around the
            rule. If the maths is close, forwarding the big case to Tokyo by courier is cheaper than
            discovering the answer at the gate.
          </p>
        </section>

        <KlookTourPicks
          heading="The Other Half of a Kyoto → Tokyo Travel Day"
          intro="A Kyoto departure usually ends at a Tokyo hotel or an airport, and that second leg is the one people leave to chance. Four bookings for it, all picked up at Tokyo or Shinagawa: a private car if you are arriving with every bag you own, the shared shuttle if you are not, and the limousine bus from either airport for the day you fly out. Open a listing for availability and the current price on your dates."
          tours={[
            tokyoPrivateAirportTransfer,
            tokyoSharedAirportTransfer,
            naritaLimousineBus,
            hanedaLimousineBus,
          ]}
        />

        <KlookStayAreas
          heading="Where to Stay at the Tokyo End"
          intro="Ranked for the twenty minutes after a shinkansen arrives rather than for a whole Tokyo trip — which is a different list. Marunouchi leads because the Tokaido platforms are inside the building; Shibuya is on it at all because the train calls at Shinagawa before the terminus."
          areas={kyotoToTokyoArrivalStayAreas}
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

        {/* Before you go */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you board</span>
          <h2 className={styles.sectionTitle}>One Thing to Sort Before the Last Kyoto Morning</h2>
          <p className={styles.bodyText}>
            Data, because a travel day is made of lookups. Your seat is a QR code or a reservation to show, the
            Kyoto Station concourse is where you will want a map rather than a guess, and at the far end you
            have to decide between Shinagawa and Tokyo while the train is still moving. An eSIM activated
            before you fly means all of that is a glance at a phone.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it against the
            alternatives, and our{" "}
            <Link href="/guides/transport/ic-cards-japan">IC card guide</Link> explains why an ICOCA still taps
            you through the Yamanote gates at the Tokyo end — though not onto the shinkansen itself.
          </p>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 5 Nov 2026: this train as the way back from a day in Kyoto. */}
            <Link href="/guides/attractions/kyoto-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Day Trip from Tokyo: Train, Cost &amp; Plan (2026)</p>
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
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M12 5v12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Nagoya Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Trains &amp; Taxis Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-4 7 4v13" />
                  <path d="M10 21v-6h4v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l20-5-20-5 4 5z" />
                  <path d="M6 16v4l4-2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
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
            <h2 className={styles.ctaBannerTitle}>Two hours, and three decisions worth making first</h2>
            <p className={styles.ctaBannerDesc}>
              Book the seat before the last Kyoto morning rather than on it — a named seat, a baggage space if
              you need one, and a train early enough that 21:38 is not your fallback. Then settle where in
              Tokyo you are getting off, and what happens after that.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={shinkansenKyotoTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Kyoto → Tokyo Tickets →
              </KlookLink>
              <KlookLink href={tokyoPrivateAirportTransfer.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Tokyo Airport Transfers →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
