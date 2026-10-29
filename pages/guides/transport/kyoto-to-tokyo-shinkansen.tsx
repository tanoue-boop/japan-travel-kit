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
  hanedaLimousineBus,
  jrPassWholeJapan,
  klookEsim,
  kyotoToTokyoArrivalStayAreas,
  naritaLimousineBus,
  shinkansenKyotoTokyo,
  tokyoPrivateAirportTransfer,
  tokyoSharedAirportTransfer,
} from "../../../lib/klook-links";

/**
 * Kyoto to Tokyo on the Tokaido Shinkansen. Added 29 Oct 2026 as the eastbound
 * counterpart to pages/guides/transport/tokyo-to-kyoto.tsx, which stays the
 * "cheapest and fastest ways" comparison for the westbound trip.
 *
 * The two pages deliberately do not share a table. tokyo-to-kyoto answers
 * "how do I get from Tokyo to Kyoto" by ranking the shinkansen against the
 * highway bus, the local-train marathon and a rental car. This page answers the
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
 */

const OWN_ISO = "2026-10-29";
const OWN = checkedLabel(OWN_ISO);

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
/** Our own reference value for the leg — same segment, read in reverse. */
const kyotoTokyo = fares.segments.find((s) => s.id === "tokyo-kyoto")!;
/** "2026-09" -> "September 2026", for the one non-operator figure on the page. */
const FARE_AS_OF = new Date(`${fares.asOf}-01T00:00:00Z`).toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

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

/** The route as the operator and the booking page state it. */
const routeRows = [
  {
    item: "Fastest Kyoto → Tokyo journey",
    value: "About 2 hours, no transfer",
    detail:
      'JR Central\'s own Tokaido Shinkansen page puts the leg at "130 minutes" and says you arrive "in about 2 hours". Klook\'s rail page for the eastbound route gives its shortest departure as "2h" and states the route "features 0 transfer(s)"',
    source: `global.jr-central.co.jp and klook.com rail page, ${OWN}`,
  },
  {
    item: "Average journey on the booking page",
    value: "4 hours 1 minute",
    detail:
      "Klook's average across the whole day, and the gap between that and the 2-hour fastest is the KODAMA — the all-stops Tokaido service, which adds roughly two hours between Kyoto and Tokyo. The average is not the journey you will take unless you book badly",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Departures per day",
    value: "352 trains, 06:03 to 21:38",
    detail:
      "Klook's count for a sample date (4 November 2026). The eastbound timetable is the asymmetry worth knowing: the last Tokyo train out of Kyoto leaves well before 22:00, so a late Kyoto dinner and a same-night Tokyo arrival do not both fit",
    source: `klook.com rail page, ${OWN}`,
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
    item: "Kyoto → Tokyo, one way, reserved Ordinary",
    price: `About ${yen(kyotoTokyo.fareYen)}`,
    covers:
      "Basic fare plus the reserved-seat limited express charge, one adult, regular season. This is the number to budget with",
    source: `Our own JR fare dataset, as of ${FARE_AS_OF} — a rounded reference value, not an operator table`,
  },
  {
    item: "Non-reserved Ordinary",
    price: "Less than reserved, by the reserved-seat charge",
    covers:
      "Board any NOZOMI, HIKARI or KODAMA with a non-reserved car and sit where you find space. On a corridor with 352 eastbound departures a day this is a workable plan — outside the peak periods further down this page",
    source: `Charge structure per JR Central's ticket rules, ${OWN}`,
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
    cost: `About ${yen(kyotoTokyo.fareYen)} one way`,
    gets: "A named seat on a 2-hour direct train, with the luggage question settled before you leave the hotel.",
    pick: "The default, and especially so on a last Kyoto morning — you are travelling with everything you bought, on a train you cannot afford to miss.",
  },
  {
    option: "Non-reserved Ordinary, walk up",
    cost: "The reserved-seat charge less than the above",
    gets: "Any train with a non-reserved car, whenever you reach the platform.",
    pick: "A fine plan on a normal weekday with hand luggage. A bad one in the peak periods below, when NOZOMI trains have no non-reserved car at all.",
  },
  {
    option: "JAPAN RAIL PASS on the HIKARI or KODAMA",
    cost: `${JR_PASS_7} online, ¥53,000 as an Exchange Order`,
    gets: "The journey at no extra charge, plus the Yamanote and the Narita Express at the Tokyo end — on a HIKARI, which is slower than a NOZOMI but still direct.",
    pick: "Only if the same week already has Hiroshima, Kanazawa or Tohoku in it. A Kyoto–Tokyo single plus a Tokyo–Kyoto single does not come close to ¥50,000.",
  },
  {
    option: "JAPAN RAIL PASS plus the NOZOMI ticket",
    cost: `${JR_PASS_7} plus ${NOZOMI_TICKET} for this leg`,
    gets: "The pass, and the fast train — the 2-hour run rather than the HIKARI's.",
    pick: "Worth it on the one leg where you are catching a flight or have a timed booking in Tokyo. JR prices it the same whether you then sit in Green, reserved or non-reserved.",
  },
  {
    option: "The highway bus or the local-train route",
    cost: "A fraction of the fare, at eight to nine hours",
    gets: "The cheapest way between the two cities, overnight in the bus's case.",
    pick: "Rarely the right call eastbound with a full suitcase. We compare it properly on the westbound page rather than repeating the table here.",
  },
];

/** Tokyo, Shinagawa or Shin-Yokohama — the decision this page exists for. */
const arrivalRows = [
  {
    station: "Tokyo Station",
    forWho: "Marunouchi, Ginza, Nihonbashi, Asakusa, Ueno — and anyone flying out of Narita",
    why: "The terminus, so nobody has to watch for the stop. The Narita Express and the Marunouchi, Yamanote, Chuo and Keiyo lines all leave from the same complex, and the Tokaido platforms are inside the building",
    source: `JR Central station index, ${OWN}`,
  },
  {
    station: "Shinagawa",
    forWho: "Shibuya, Meguro, Odaiba, Yokohama — and anyone flying out of Haneda",
    why: "The stop before the terminus, which saves the last stretch into Tokyo Station and its crowds. Keikyu to Haneda runs from the same station, and the Yamanote reaches Shibuya in a few stops",
    source: `JR Central station index, ${OWN}`,
  },
  {
    station: "Shin-Yokohama",
    forWho: "Yokohama, Minato Mirai, Kamakura and the whole south-west side",
    why: "Two stops before Tokyo. If your night is in Yokohama rather than Tokyo, getting off here saves a double-back of the better part of an hour with the cases",
    source: `JR Central station index, ${OWN}`,
  },
];

const faqItems = [
  {
    q: "How long is the shinkansen from Kyoto to Tokyo?",
    a: `About two hours on a direct NOZOMI. JR Central's own Tokaido Shinkansen page gives the leg as "130 minutes" and says you arrive "in about 2 hours"; Klook's eastbound rail page for the route lists its shortest departure as "2h" and states the route "features 0 transfer(s)". Both read on ${OWN}. The number to ignore is the average on the booking page, which is 4 hours 1 minute — that average includes the KODAMA, the all-stops Tokaido service, which roughly doubles the journey. There is no transfer on any of them: Kyoto is a through station on the same line that terminates at Tokyo.`,
  },
  {
    q: "How much is the shinkansen from Kyoto to Tokyo?",
    a: `Budget about ${yen(kyotoTokyo.fareYen)} one way for a reserved seat in an ordinary car — basic fare plus the reserved-seat limited express charge, one adult, regular season. We label that as our own rounded reference figure rather than an operator price, and the reason is worth saying: JR Central publishes the smartEX price list only as a PDF and does not publish the station-window fare as a static table, so no live operator figure for this exact pair could be verified from here on ${OWN}. The prices on this page that *are* JR's own are the pass-holder ones: the NOZOMI/MIZUHO ticket for Tokyo–Kyoto is ${NOZOMI_TICKET}, and a 7-day Ordinary JAPAN RAIL PASS is ${JR_PASS_7} online or ¥53,000 as an Exchange Order. A non-reserved seat costs the reserved-seat charge less; a Green Car seat costs more and is sold as its own class. Check the live price for your date before you buy — peak and off-peak dates move the reserved-seat charge either way.`,
  },
  {
    q: "Which side is Mt Fuji on from Kyoto to Tokyo?",
    a: `On your left in the direction of travel — and the seat letter to book is the same one as in the other direction. JR Central's own Shinkansen Perfect Guide says it plainly: "For the best view of Mt. Fuji, choose Seat E in Standard Class or Seat D in Green Class." It gives no direction with that advice, and it does not need to: seat letters are fixed to the carriage, not to which way the train is pointing, so the E and D windows look out at the same physical side of the train whichever end of the line you started from. Heading west out of Tokyo that side is on your right; heading east out of Kyoto it is on your left. On the eastbound run the mountain comes up late — Mt Fuji sits between Shizuoka and Mishima on JR Central's own station order, so you want to be awake for the last third rather than the first. And the obvious caveat: Fuji is often not visible at all. Clear winter mornings are the best odds, summer afternoons the worst. Read on ${OWN}.`,
  },
  {
    q: "Do I need to reserve a seat?",
    a: `Most of the year, no — and on eight sets of dates it is not optional. With 352 eastbound departures on Klook's sample date, walking up and taking the next train with a non-reserved ticket genuinely works on an ordinary weekday. But JR Central runs every NOZOMI car as a reserved car through the peak periods, which means the fast train to Tokyo has no non-reserved section at all on those days: ${nozomiAllReservedPeriods.join("; ")}. JR Central's English wording is "During the peak periods, Nozomi trains do not have non-reserved seat setting available", while "Hikari, Kodama, Mizuho, Sakura, and Tsubame trains have non-reserved seats as usual" — with the warning that non-reserved seating on the HIKARI and KODAMA "may be overcrowded during the peak periods". Two reasons to reserve anyway on this particular leg: a Kyoto departure is usually the last morning of a trip, with a booked Tokyo night or a flight at the other end, and you are carrying more luggage than you arrived with. If you hold a rail pass the reservation itself is free. Read on ${OWN}.`,
  },
  {
    q: "Is the JR Pass worth it for Kyoto to Tokyo?",
    a: `Not for this leg on its own. A 7-day Ordinary JAPAN RAIL PASS is ${JR_PASS_7} bought online through JR's own reservation site, or ¥53,000 as an Exchange Order from an overseas agency, read on japanrailpass.net on ${OWN} — against a one-way reserved fare in the region of ${yen(kyotoTokyo.fareYen)}. Even a Tokyo–Kyoto–Tokyo round trip lands well under the pass. Where the pass starts to make sense is when the same week includes Hiroshima, Kanazawa, Nikko or Tohoku, or when you will lean on JR inside Tokyo — the Yamanote and the Narita Express are both covered, which is worth real money on an arrival and departure day. One catch specific to this route: the pass does not cover the NOZOMI, so a pass holder rides a HIKARI, which is direct but slower, or buys the ${NOZOMI_TICKET} NOZOMI/MIZUHO ticket for Tokyo–Kyoto. JR prices that ticket identically for Green, reserved and non-reserved seats, so there is no upgrade logic to work out — if the fast train matters on your last morning, buy it.`,
  },
  {
    q: "Where do I put large luggage on the shinkansen?",
    a: `Anything whose three dimensions add up to 160 cm or less goes in the overhead rack or at your feet, with no booking and no fee. Over that, JR Central's own luggage page requires a reserved seat with an oversized baggage area: baggage totalling "between 161 and 250 cm" has to go in the baggage space behind one of those seats. The seat does not cost extra — JR states the tickets are "the same price as reserved seats in ordinary cars and green cars" — and you book it at a ticket office by asking for a seat with an oversized baggage area, at a reserved-seat vending machine, or online. Board with an oversized case and no reservation and there is a ${BAGGAGE_FEE} baggage fee including tax. The rule covers the Tokaido, Sanyo and Kyushu Shinkansen, which is exactly this journey. Read on ${OWN}. This matters more leaving Kyoto than arriving: most airline-checked cases are under 160 cm, but a trip's worth of shopping, a bagged pushchair or a ski bag will not be — and the baggage seats only exist in reserved cars, so a non-reserved ticket is not a way round it.`,
  },
  {
    q: "Which platform does the Tokyo train leave from at Kyoto Station?",
    a: `The Tokaido Shinkansen uses tracks 11 to 14 at Kyoto Station, with the Tokyo-bound (eastbound) trains on 11 and 13 and the Shin-Osaka direction on 12 and 14. Those platforms sit behind their own shinkansen ticket gates on the Hachijo — south — side of the station, which is the opposite side from the Karasuma entrance, the bus terminal and the Kyoto Tower. Allow for that: crossing Kyoto Station from the north side to the shinkansen gates with cases is a walk of several minutes through a very busy concourse, not a dash. We confirmed the track numbers through the westjr.co.jp search index for JR West's own Kyoto Station map on ${OWN}, because the map itself is published as a PDF we could not read automatically — so check the departure boards on the day, as you would anyway. Platform assignment for an individual train is shown on the board and on your reservation.`,
  },
  {
    q: "Should I get off at Tokyo, Shinagawa or Shin-Yokohama?",
    a: `Whichever is nearest your bed or your flight — all three are stops on the way in, in that reverse order. On JR Central's own station index the line runs Shin-Yokohama, then Shinagawa, then Tokyo. Get off at Tokyo Station for Marunouchi, Ginza, Nihonbashi, Asakusa and Ueno, and for the Narita Express, which leaves from the same complex. Get off at Shinagawa for Shibuya, Meguro, Odaiba and anything on the Keikyu Line — including Haneda Airport, which is a direct run from the same station and saves you going into Tokyo Station and back out again. Get off at Shin-Yokohama if your night is in Yokohama or Minato Mirai, which saves the better part of an hour of doubling back. One practical note: the terminus is the easy option precisely because you cannot miss it, so if you are tired, carrying a lot, or travelling with children, Tokyo Station is not the wrong answer even when Shinagawa is technically closer.`,
  },
  {
    q: "What time is the last shinkansen from Kyoto to Tokyo?",
    a: `Klook's eastbound rail page lists departures from 06:03 to 21:38 on its sample date of 4 November 2026, read on ${OWN}. That late-evening cut-off is the one piece of eastbound asymmetry worth planning around: a long last dinner in Gion and a same-night arrival in Tokyo do not reliably both fit, and the final departures of the day are not always the fast ones. If your flight out of Narita or Haneda is an early morning one, the usual answer is to take an afternoon or early-evening train and sleep on the Tokyo side rather than squeeze the last train — which is also why the Tokyo Station and Shinagawa-adjacent areas are the ones worth paying for on that single night. Check the live timetable for your own date; seasonal and special-schedule days move the last departure.`,
  },
  {
    q: "Can I use a Suica or ICOCA to ride the shinkansen?",
    a: `Not as a fare. An IC card taps you through local and subway gates, but the Tokaido Shinkansen needs its own ticket — a basic fare ticket plus a limited express ticket, or a single combined ticket, or a QR code if you booked online. What the card is genuinely useful for on this trip is everything either side of the train: the Kyoto city buses and subway on your last morning, and the Yamanote, Metro and Keikyu once you are off at Tokyo or Shinagawa. ICOCA works in Tokyo and Suica works in Kyoto — the ten major cards are interoperable across the networks, which our IC card guide sets out card by card. Charge it before you leave Kyoto so the Tokyo end is a tap rather than a queue.`,
  },
  {
    q: "What do I do with my suitcases after checking out in Kyoto?",
    a: `Three options, in order of how little effort each takes. Leave the cases in your hotel's luggage room after checkout, go and do your last Kyoto morning, and collect them on the way to the station — almost every hotel will hold them for the day and it costs nothing. Or take them to Kyoto Station and use the coin lockers or the staffed luggage service there, which is the better plan if the morning ends on the Hachijo side anyway. Or forward them: a takkyubin courier counter will send cases to a Tokyo hotel, usually for next-day arrival, which is what people with more luggage than hands do and what saves you the oversized-baggage reservation on the train entirely. Sizes, fees and cut-off times vary by hotel and counter, so we do not quote them here — ask at your hotel desk the night before, which is also when to confirm they will accept a delivery at the Tokyo end.`,
  },
];

const TITLE = "Kyoto to Tokyo Shinkansen: Times, Fares, JR Pass";
const DESCRIPTION =
  "Kyoto to Tokyo Shinkansen: about 2 hours on a Nozomi, 352 trains a day, 06:03 to 21:38. Mt Fuji is seat E, now on your left — plus the JR Pass maths.";
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
                { "@type": "ListItem", position: 4, name: "Kyoto to Tokyo Shinkansen", item: CANONICAL },
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
          <span className={styles.breadCurrent}>Kyoto to Tokyo Shinkansen</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kyoto to Tokyo Shinkansen:<br />Times, Fares and the JR Pass
          </h1>
          <p className={styles.heroSubtitle}>
            Two hours, 352 eastbound trains a day — and four decisions the westbound trip never asks
            you to make.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "JR Central figures, dated", "Mt Fuji seat side", "Tokyo, Shinagawa or Shin-Yokohama"].map((t) => (
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
                <p className={styles.verdictStatValue}>About 2 hours, no transfer</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Departures a day</p>
                <p className={styles.verdictStatValue}>352, 06:03–21:38</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Mt Fuji side</p>
                <p className={styles.verdictStatValue}>Seat E (D in Green) — on your left</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On a JR Pass</p>
                <p className={styles.verdictStatValue}>Hikari free, Nozomi {NOZOMI_TICKET}</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>Kyoto to Tokyo Shinkansen</strong> takes{" "}
              <strong>about 2 hours</strong> on a direct NOZOMI — JR Central&apos;s own page gives the leg as{" "}
              <strong>&ldquo;130 minutes&rdquo;</strong>, and Klook&apos;s eastbound rail page lists its shortest
              departure as <strong>&ldquo;2h&rdquo;</strong> with <strong>&ldquo;0 transfer(s)&rdquo;</strong>,{" "}
              <strong>352 trains</strong> on its sample date and departures from{" "}
              <strong>06:03 to 21:38</strong>. Budget roughly <strong>{yen(kyotoTokyo.fareYen)}</strong> one way
              for a reserved ordinary seat — our own rounded reference figure, because JR publishes this fare
              only as a PDF. Three things are different in this direction: Mt Fuji is on{" "}
              <strong>your left</strong> (still <strong>Seat E</strong>, or <strong>Seat D</strong> in Green, on
              JR Central&apos;s own advice — the letters are fixed to the carriage), the train calls at{" "}
              <strong>Shin-Yokohama and Shinagawa before Tokyo Station</strong> so you may not want the
              terminus, and the Tokaido platforms at Kyoto Station are behind their own gates on the{" "}
              <strong>Hachijo (south) side</strong>. A <strong>JAPAN RAIL PASS</strong> covers the HIKARI but
              not the NOZOMI, which costs <strong>{NOZOMI_TICKET}</strong> extra for this pair. Operator
              figures read on {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenKyotoTokyo.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Kyoto → Tokyo Tickets →
              </KlookLink>
              <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Price the JAPAN RAIL PASS →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Kyoto → Tokyo Is Not Just Tokyo → Kyoto Backwards</h2>
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
            expect. Klook&apos;s rail page puts the last Kyoto departure of its sample day at{" "}
            <strong>21:38</strong>. If this is your travel day and there is a flight on the other side of it,
            that number does more to shape the plan than the fare does.
          </p>
        </section>

        {/* Route table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The train</span>
          <h2 className={styles.sectionTitle}>How Long Is the Shinkansen From Kyoto to Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About two hours at the fastest, with no transfer. Every figure below carries its source and the
            date it was read — including the one that trips people up, which is the four-hour average on the
            booking page.
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
            this trip with the highway bus and local-train options priced against the train.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenKyotoTokyo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kyoto → Tokyo tickets →
            </KlookLink>
          </div>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Is the Shinkansen From Kyoto to Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Budget about <strong>{yen(kyotoTokyo.fareYen)}</strong> one way for a reserved ordinary seat. One
            honest caveat up front, because it decides how to read the table: JR Central publishes its smartEX
            price list only as a PDF, and does not publish the station-window fare as a static table at all, so
            the single-ticket row below is <em>our own</em> rounded reference value and is marked as such. The
            pass-holder rows are JR&apos;s own figures, read on {OWN}.
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
            Subject to change — confirm before buying. {fares.note} Peak and off-peak dates move the
            reserved-seat charge by a couple of hundred yen either way, and online prices differ from the
            station window. No Klook price appears on this page: Klook answers automated reads of its product
            pages with an error, so no figure from it could be verified.
          </p>
        </section>

        {/* Pass comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for Kyoto to Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Not for this leg alone. A 7-day Ordinary <strong>JAPAN RAIL PASS</strong> is {JR_PASS_7} online and
            ¥53,000 as an Exchange Order bought abroad, against a one-way fare in the region of{" "}
            {yen(kyotoTokyo.fareYen)} — so even a round trip between the two cities does not get there. What
            changes the answer is the rest of the week, and what you do with JR once you are in Tokyo.
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
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 day) →
            </KlookLink>
            <KlookLink href={shinkansenKyotoTokyo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Price a single instead →
            </KlookLink>
          </div>
        </section>

        {/* Mt Fuji */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The view</span>
          <h2 className={styles.sectionTitle}>Which Side Is Mt Fuji On From Kyoto to Tokyo?</h2>
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
          <h2 className={styles.sectionTitle}>Which Platform at Kyoto Station, and What About the Luggage?</h2>
          <p className={styles.bodyText}>
            The Tokaido Shinkansen uses <strong>tracks 11 to 14</strong> at Kyoto Station, with the
            Tokyo-bound trains on <strong>11 and 13</strong>. They sit behind their own shinkansen ticket
            gates on the <strong>Hachijo — south — side</strong> of the station, which is the opposite side
            from the Karasuma entrance, the bus terminal and the Kyoto Tower. We confirmed the track numbers
            through the westjr.co.jp search index for JR West&apos;s own Kyoto Station map on {OWN}, because
            the map is published as a PDF we could not read automatically — so give the departure boards a
            glance on the day, as you would anyway.
          </p>
          <p className={styles.bodyText}>
            Why this is worth a paragraph rather than a footnote: if your last Kyoto morning ends anywhere on
            the north side — Nishiki Market, the Karasuma subway, almost any city bus — you have a walk of
            several minutes through one of the busiest concourses in Japan before you even reach the gates.
            With cases, on a departure day, build that in.
          </p>
          <p className={styles.bodyText}>
            The luggage itself has three sensible answers. Leave the cases in the hotel luggage room after
            checkout and collect them on the way to the station; take them to Kyoto Station and use the
            lockers or the staffed service there; or forward them to your Tokyo hotel with a takkyubin
            courier, which is what anyone with more bags than hands does and which sidesteps the shinkansen
            oversized-baggage reservation entirely. Fees and cut-off times vary by hotel and counter, so we do
            not quote them — ask at the desk the night before, and confirm the Tokyo hotel will accept a
            delivery.
          </p>
          <p className={styles.bodyText}>
            For the Kyoto-side logistics of that morning — which bus, which subway, and whether a day pass is
            worth buying for half a day — see{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto</Link> and our{" "}
            <Link href="/guides/transport/kyoto-subway-bus-pass">Kyoto Subway &amp; Bus pass verdict</Link>.
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
                    {["Get off at", "Best for", "Why", "Source & date checked"].map((h) => (
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
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
          <h2 className={styles.sectionTitle}>Do I Need to Reserve a Seat?</h2>
          <p className={styles.bodyText}>
            Most of the year, no. With <strong>352 eastbound departures</strong> on Klook&apos;s sample date,
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
            <KlookLink href={shinkansenKyotoTokyo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
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
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
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
              <KlookLink href={shinkansenKyotoTokyo.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Kyoto → Tokyo Tickets →
              </KlookLink>
              <KlookLink href={tokyoPrivateAirportTransfer.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Tokyo Airport Transfers →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
