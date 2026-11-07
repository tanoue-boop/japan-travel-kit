import Head from "next/head";
import Link from "next/link";
import { hreflangLinks } from "../../../components/Hreflang";
import type { ReactNode } from "react";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import WinterBookingTop from "../../../components/WinterBookingTop";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  bieiFuranoLavenderDayTour,
  furanoBieiBluePondDayTour,
  hokkaidoSevenDayStayAreas,
  jozankeiHotSpringBusTrip,
  jrHokkaidoRailPass,
  klookEsim,
  lakeShikotsuIceFestivalHalfDayTour,
  newChitoseAirportTransfers,
  nisekoResortShuttleBus,
  noboribetsuToyaNisekoDayTour,
  noboribetsuToyaOtaruDayTour,
  otaruCanalCruiseSealCarving,
  otaruShakotanYoichiCoachTour,
  otaruSnowParkDayTour,
  sapporoFuranoAreaPass,
  sapporoFuranoBieiLavenderBusTour,
  sapporoJozankeiBuddhaDayTour,
  sapporoSnowParkHalfDayTour,
  sapporoTvTowerMoiwaSetTicket,
  type KlookTripPrepItem,
} from "../../../lib/klook-links";
import {
  asahiyamaBieiHighlightsTour,
  furanoBieiWinterIlluminationTour,
  yoichiOtaruWalkingTour,
} from "../../../lib/klook-links-winter-hokkaido";

/**
 * A seven-day Hokkaido route, written for the reader searching "Hokkaido 7 Day
 * Itinerary". Added 1 Nov 2026 alongside otaru-day-trip-from-sapporo, and
 * deliberately in the same week as sapporo-snow-festival-tours: the February
 * dates that page carries are the dates this page's winter variant is planned
 * around, and they were announced a year ahead.
 *
 * Why this page is not another "Japan itinerary". Every multi-day itinerary on
 * this site so far runs the Tokyo–Kyoto–Osaka corridor, where the decision is
 * which shinkansen and whether the national JR Pass pays. Hokkaido is a
 * different problem in three specific ways, and the page is organised around
 * them rather than around sights:
 *
 *   1. You fly in. The island is a flight from Tokyo or Osaka, not a train, so
 *      the arrival and departure days are shaped by New Chitose rather than by
 *      a station.
 *   2. The distances are real. Sapporo to Asahikawa is 1 hr 25 min on a limited
 *      express and Sapporo to Furano two hours in summer — which means a seven-day route
 *      sleeps in two or three places, and the pass arithmetic is completely
 *      different from the Honshu one. Worked in full below: on this route the
 *      seven-day island pass does not pay and the four-day area pass does.
 *   3. It is two different destinations. The same seven days in February and in
 *      July share an outline and almost nothing else, so the winter and summer
 *      variants get their own table rather than a parenthesis.
 *
 * Sources. Read on 1 November 2026:
 *   jrhokkaido.co.jp/airport/   札幌〜新千歳空港 1,230円, 特別快速最速36分・快速最速
 *                               37分・区間快速最速43分, six Airport Trains an hour in
 *                               the daytime, and the uシート reserved seat at
 *                               ¥1,000 or ¥800 ticketless.
 *   jrhokkaido.co.jp            the English airport page: "There are six Airport
 *     /global/english/travel/    Trains per hour between 9:00 and 16:00 from New
 *     airport.html               Chitose Airport to Sapporo: 1 Special Rapid train
 *                               (fastest: 33 mins), 3 Rapid trains (fastest: 37
 *                               mins), and 2 Semi-Rapid trains (fastest: 43
 *                               mins)", and "73 mins to Otaru (fastest)".
 *   jrhokkaido.co.jp            the operator's own Sapporo↔Otaru page: ¥800 and
 *     /global/english/travel/    about 33 minutes at fastest on the Rapid Airport,
 *     airport_otaru              33 to 41 minutes across the day, five of six cars
 *                               non-reserved, Kitaca/Suica/PASMO accepted. Read
 *                               through the jrhokkaido.co.jp search index on this
 *                               date; read directly on 30 Oct 2026 for
 *                               sapporo-snow-festival-tours.
 *   jrhokkaido.co.jp            JR Hokkaido's own model-route page for Furano and
 *     /global/english/travel/    Asahikawa: Sapporo→Furano "2hr Furano Lavender
 *     model/furano.html          Express (Reserved)" at ¥12,560 round trip,
 *                               Sapporo→Asahikawa "1hr 25min Ltd. Exp.
 *                               Lilac/Kamui (Reserved)" at ¥10,880 round trip, and
 *                               Asahikawa→Biei/Furano "40min Local train".
 *   jrhokkaido.co.jp            the pass prices: Hokkaido Rail Pass 5 days
 *     /global/english/ticket/    ¥22,000, 7 days ¥28,000, 10 days ¥37,000
 *     railpass/                  pre-purchase and ¥1,000 more at a station, child
 *                               half, all consecutive-day with no flexible
 *                               version; the 4-day Sapporo–Furano Area Pass at
 *                               ¥11,000 pre-purchase covering New Chitose,
 *                               Sapporo, Otaru, Furano, Biei and Asahikawa but not
 *                               Tomamu; the 4-day Sapporo–Noboribetsu Area Pass at
 *                               ¥10,000 covering New Chitose, Sapporo, Otaru and
 *                               Noboribetsu but not Toya.
 *   city.asahikawa.hokkaido.jp  Asahiyama Zoo's own pages: adult ¥1,000 and
 *     /asahiyamazoo/             junior-high-and-under free, the winter season from
 *                               11 November at 10:30–15:30 with last admission
 *                               15:00, and the zoo closed 4 to 10 November while
 *                               it changes season. The penguin walk runs when
 *                               there is enough snow for a course — the zoo's own
 *                               notice puts that at roughly late December to
 *                               mid-March, twice a day.
 *   otaru.cc                    the canal cruise: 大人（中学生以上）￥1,800 by day and
 *                               ￥2,000 at night, 小学生 ￥500, 40分, boarding at
 *                               小樽運河中央橋, arrive 15分前, cancelled for weather.
 *   otaru.gr.jp/event/          the 2027 Otaru Snow Light Path: 「2月6日～13日」,
 *     yukiakari2027              with details stated as still to be confirmed.
 *   farm-tomita.co.jp/en/       Farm Tomita's own hours, 9:30–16:30, with
 *                               "Admission is not allowed outside of opening
 *                               hours". The site does not state an admission fee
 *                               or a bloom window on that page, so neither is
 *                               stated here.
 *   nikka.com/en/distilleries   the Yoichi distillery: tours free, reservations
 *     /yoichi/                   requested in advance, a 5-minute walk from JR
 *                               Yoichi Station, and "there are few trains
 *                               operating between Otaru Station and Yoichi
 *                               Station".
 *   jal.co.jp                   Tokyo (Haneda) to Sapporo at 1 hour 30 minutes
 *     /flights/en-us/            with 16 flights a day, from JAL's own domestic
 *     japan-domestic-routes      route list. That page answers automated reads
 *                               with HTTP 403, so it was read through the
 *                               jal.co.jp search index.
 *
 * Re-read on 6 November 2026 for the winter booking pass (task jtk-20261106-A21).
 * This pass corrected the winter version of the route:
 *   jrhokkaido.co.jp            The Furano Lavender Express is "a seasonal train":
 *     /global/english/travel/    JR Hokkaido's 2026 timetable has it on June to
 *     model/furano.html and      September dates, last run 23 Sep, with no winter
 *     the 2026 sightseeing       dates. The same page says "You can also go to
 *     train timetable            Biei and Furano via Asahikawa when the Furano
 *                                Lavender Express is not operated". This page used
 *                                to route December to March on it, and to print
 *                                Sapporo–Furano in two hours all year.
 *                                That page's 40 minutes is Furano–Biei, not
 *                                Asahikawa–Biei or –Furano as we used to say. It
 *                                publishes no Asahikawa–Furano time and none is
 *                                printed here.
 *   jrhokkaido.co.jp            ¥1,380 Asahikawa–Furano, from JR Hokkaido's 2026
 *     /CM/Info/press/pdf/        Furano Line notice, which also says IC cards do not
 *     260325_KO_Furano-Biei.pdf  work between Asahikawa and Furano. The rail totals
 *                                are now ¥17,160 by the Lavender Express and ¥17,700
 *                                in winter.
 *   jrhokkaido.co.jp/global/    pass prices unchanged, and the area pass "allows an
 *     english/ticket/railpass/   ordinary car reserved seat", which is what makes it
 *                                work on the all-reserved Lilac and Kamui.
 *   city.asahikawa.hokkaido.jp  Winter opening 11 Nov 2026 to 7 Apr 2027, 10:30–
 *     /asahiyamazoo/ (d082799,   15:30, last admission 15:00, closed 30 Dec to 1 Jan;
 *     d084291)                   penguin walks 11:00 and 14:30, March 11:00 only,
 *                                start date to be announced on official social media;
 *                                adult ¥1,000 now, ¥1,400 from 29 Apr 2027.
 *   hyoutou-special.asia        Lake Shikotsu ice festival 30 Jan to 23 Feb 2027.
 *   otaru.gr.jp/event/          Snow Light Path dates unchanged, details to follow.
 *     yukiakari2027
 *   Listings: 12479 is out because its indexed text is a Tomamu route, 181965 because
 *   its indexed body describes Cape Kamui rather than Yoichi, and 164281 because its
 *   indexed dates stop at 15 Mar 2026.
 *
 * Deliberately absent: an Osaka–New Chitose flight duration. No carrier page we
 * could read on 1 Nov 2026 published one, and the aggregator figures are not an
 * operator's own, so the table says to check the airline timetable rather than
 * printing a number.
 *
 * Carried from our own pages, with their original check dates: the 4–11 February
 * 2027 Sapporo Snow Festival dates and the free-admission line (committee
 * announcement and FAQ, 30 Oct 2026), the Sapporo subway day tickets
 * (Transportation Bureau, 30 Oct 2026), the JMA 1991–2020 Sapporo normals
 * (28 Oct 2026) and the national JR Pass prices after the 1 October 2026
 * revision (JR Group, carried from our JR Pass guide).
 *
 * Nothing here is first-hand. Klook answers automated reads of its product pages
 * with HTTP 403, so the body carries no Klook price; the WinterBookingTop block
 * carries the indexed from-prices, dated, and nothing else on the page does.
 */

/** Figures read off the operators' own sites for this page. */
const OWN_ISO = "2026-11-01";
const OWN = checkedLabel(OWN_ISO);

/** The winter pass's re-reads of the official sites and of Klook's index. */
const SEASON_ISO = "2026-11-06";
const SEASON = checkedLabel(SEASON_ISO);

/** Carried from our own Hokkaido pages, with their own check dates. */
const FESTIVAL_CHECKED = checkedLabel("2026-10-30");
const JMA_CHECKED = checkedLabel("2026-10-28");

const AIRPORT_FARE = "¥1,230";
const OTARU_FARE = "¥800";
const ASAHIKAWA_RT = "¥10,880";
const ASAHIKAWA_OW = "¥5,440";
const FURANO_RT = "¥12,560";
const FURANO_OW = "¥6,280";
const FURANO_LOCAL = "¥1,380";
/** Furano to Sapporo out of season: the local to Asahikawa, then the Lilac or Kamui. */
const FURANO_WINTER = "¥6,820";
const TOTAL_SUMMER = "¥17,160";
const TOTAL_WINTER = "¥17,700";
const PASS_7 = "¥28,000";
const PASS_5 = "¥22,000";
const PASS_10 = "¥37,000";
const AREA_FURANO = "¥11,000";
const AREA_NOBORIBETSU = "¥10,000";
const ZOO_ADULT = "¥1,000";
const CRUISE_DAY = "¥1,800";
const SUBWAY_DAY_PASS = "¥830";
const DONICHIKA = "¥520";
const FEB_MAX = "0.4°C";
const FEB_MIN = "−6.2°C";
const FEB_SNOW = "116 cm";
const HND_FLIGHT = "1 hour 30 minutes";

type Stop = {
  time: string;
  place: string;
  /** Our own planning allowance, not an operator figure. */
  allow: string;
  getting: string;
  booking: string;
};

type Pick = { label: string; url: string };

type Day = {
  n: number;
  label: string;
  heading: string;
  intro: string;
  stops: Stop[];
  book: ReactNode;
  picks: Pick[];
};

/** Where the seven nights go, and why. */
const baseRows = [
  {
    base: "Sapporo Station",
    nights: "4 of 6",
    why: "Nights 1, 2, 3 and 6. Every leg of this route starts under this building — the Rapid Airport from New Chitose, the Lilac and Kamui to Asahikawa, and in summer the Furano Lavender Express — and Odori is one subway stop or a covered walk. The two blocks of nights can be one booking with a gap or two separate ones; prices usually decide it.",
  },
  {
    base: "Furano",
    nights: "2 of 6",
    why: "Nights 4 and 5. The reason to sleep inland rather than commute: Biei and Furano as a day trip from Sapporo is a ten-hour coach run, and as two mornings from a Furano room it is the best part of the week in either season.",
  },
  {
    base: "Otaru Station (swap)",
    nights: "1, instead of a Sapporo night",
    why: "Swap night 3 here if the canal after dark is the point — and specifically in the first fortnight of February, when the Snow Light Path runs. It is ¥800 and about 33 minutes back, so the swap costs almost nothing.",
  },
  {
    base: "Niseko (ski version only)",
    nights: "2, instead of Furano",
    why: "Only for a week that is really a ski week. The airport coach runs to Niseko directly from New Chitose and takes ski bags, which is why that version of this route never touches Sapporo on the arrival day.",
  },
];

/** The two seasons, day by day. */
const seasonRows = [
  {
    day: "Day 1",
    winter: "Fly in, Rapid Airport to Sapporo, Odori and Susukino after dark — which in December is from about four in the afternoon",
    summer: "Fly in, Rapid Airport to Sapporo, and a long light evening in Odori Park and the beer garden that runs in it in summer",
  },
  {
    day: "Day 2",
    winter: "Sapporo: the Snow Festival sites in the first fortnight of February, otherwise a Jozankei onsen half day and an indoor afternoon",
    summer: "Sapporo: Mt Moiwa at dusk, the Hill of the Buddha and Shiroi Koibito Park, all of which are better without ice underfoot",
  },
  {
    day: "Day 3",
    winter: "Otaru, finishing after dark for the canal lamps — and on 6 to 13 February 2027, the Snow Light Path",
    summer: "Otaru plus the Yoichi distillery, or the Shakotan peninsula and Cape Kamui, which are only worth the drive in summer",
  },
  {
    day: "Day 4",
    winter: "Asahikawa and Asahiyama Zoo in the one season the penguins walk, then the local train down to Furano",
    summer: "Asahikawa and Asahiyama Zoo at summer hours, then the local train down through Biei to Furano",
  },
  {
    day: "Day 5",
    winter: "Biei and Furano under snow: the hills white rather than striped, and a ski or snow-play half day at the Furano slopes",
    summer: "Farm Tomita and the Biei hills — the lavender weeks are the reason this is the single most-booked day in Hokkaido",
  },
  {
    day: "Day 6",
    winter: "Back to Sapporo by the local train to Asahikawa and the Lilac or Kamui, because the Lavender Express is a summer train, then a snow-park half day or, 30 January to 23 February 2027, the Lake Shikotsu ice festival",
    summer: "Back to Sapporo, then Noboribetsu and Lake Toya as a long day south, or a slow last afternoon in the city",
  },
  {
    day: "Day 7",
    winter: "Sapporo to New Chitose and out — not on the first departure of the day, because February holds flights",
    summer: "Sapporo to New Chitose and out, with time for the airport itself, which is a destination in its own right",
  },
];

/** The pass arithmetic, on JR Hokkaido's own fares. */
const passRows = [
  {
    leg: "New Chitose Airport → Sapporo (Day 1)",
    fare: AIRPORT_FARE,
    note: "Rapid Airport, 36 to 43 minutes by service type. No reservation needed; the uシート seat is ¥1,000 more.",
  },
  {
    leg: "Sapporo ↔ Otaru return (Day 3)",
    fare: "¥1,600",
    note: `${OTARU_FARE} each way, about 33 minutes at fastest. The cheapest leg on the route.`,
  },
  {
    leg: "Sapporo → Asahikawa, limited express reserved (Day 4)",
    fare: ASAHIKAWA_OW,
    note: `Half of JR Hokkaido's own ${ASAHIKAWA_RT} round-trip figure for the Ltd. Exp. Lilac/Kamui, 1 hr 25 min.`,
  },
  {
    leg: "Asahikawa → Biei → Furano, local trains (Day 4)",
    fare: FURANO_LOCAL,
    note: `Asahikawa–Furano on JR Hokkaido's own 2026 notice for the line, which also says IC cards do not work between Asahikawa and Furano, so buy a ticket. Read ${SEASON}.`,
  },
  {
    leg: "Furano → Sapporo, Furano Lavender Express reserved (Day 6, summer)",
    fare: FURANO_OW,
    note: `Half of JR Hokkaido's own ${FURANO_RT} round-trip figure. Two hours, no transfer, on the June to September dates JR Hokkaido publishes; the 2027 dates are awaiting its announcement.`,
  },
  {
    leg: "Furano → Asahikawa → Sapporo, local then Lilac or Kamui (Day 6, winter)",
    fare: FURANO_WINTER,
    note: `${FURANO_LOCAL} plus ${ASAHIKAWA_OW}. This is the route JR Hokkaido gives for when the Lavender Express is not operated. Allow a full morning, and check the timetable for the local connection.`,
  },
  {
    leg: "Sapporo → New Chitose Airport (Day 7)",
    fare: AIRPORT_FARE,
    note: "The same Rapid Airport in reverse.",
  },
  {
    leg: "Total, summer version",
    fare: TOTAL_SUMMER,
    note: "Every leg above except the winter return.",
  },
  {
    leg: "Total, winter version",
    fare: TOTAL_WINTER,
    note: "Every leg above except the Lavender Express. Either way, under ¥18,000.",
  },
];

const days: Day[] = [
  {
    n: 1,
    label: "Day 1",
    heading: "Day 1 — Fly In, and the 36 Minutes From New Chitose to Sapporo",
    intro:
      "Hokkaido starts at an airport rather than a station, and that is the only thing about Day 1 you need to get right. New Chitose to Sapporo is a train that runs six times an hour in the daytime, takes between 36 and 43 minutes depending on which one you catch, and costs ¥1,230 — so there is no transfer to arrange and no ticket to hold. What is worth deciding before you land is whether you want a seat with your cases rather than a space by the door, and whether your phone will work when you step out of the terminal.",
    stops: [
      {
        time: "On landing",
        place: "Immigration, baggage, and getting online",
        allow: "45 minutes to 1.5 hours",
        getting: "n/a",
        booking: "An eSIM activated before you fly — nothing to collect at a counter",
      },
      {
        time: "Within the hour",
        place: "New Chitose Airport station → Sapporo on the Rapid Airport",
        allow: "36–43 minutes",
        getting: `JR, ${AIRPORT_FARE} adult; six services an hour from 09:00 to 16:00`,
        booking: "No, unless you want the uシート reserved car — ¥1,000 more, or ¥800 ticketless",
      },
      {
        time: "Late afternoon",
        place: "Check in near Sapporo Station and drop the cases",
        allow: "45 minutes",
        getting: "On foot, much of it underground if you picked the base for that",
        booking: "Yes — four of the six nights are here",
      },
      {
        time: "Evening",
        place: "Odori Park, the Sapporo TV Tower deck and Susukino",
        allow: "2–3 hours",
        getting: "One subway stop from Sapporo Station, or about 10 minutes on foot",
        booking: "No for the park and the street; the deck is a walk-up ticket",
      },
    ],
    book: (
      <>
        Your data, the room, and — if you are landing with hold luggage in February — a seat rather than a
        platform. The train needs nothing booked, which is the useful thing about this arrival; the booked
        road transfer is the alternative worth having when the cases are large or the hotel is not beside a
        station, and it is a before-you-fly decision. One Day 1 decision that is not transport: if you are
        arriving before midday, New Chitose runs through to Otaru in 73 minutes at fastest without a
        change, which turns an arrival afternoon into a real one — see our{" "}
        <Link href="/guides/attractions/otaru-day-trip-from-sapporo">Otaru day trip guide</Link> for how
        that reshapes the week.
      </>
    ),
    picks: [
      { label: "New Chitose transfers →", url: newChitoseAirportTransfers.url },
      { label: "See Klook eSIM options →", url: klookEsim.url },
      { label: "Price the JR Hokkaido pass →", url: jrHokkaidoRailPass.url },
      { label: "TV Tower + Moiwa set ticket →", url: sapporoTvTowerMoiwaSetTicket.url },
    ],
  },
  {
    n: 2,
    label: "Day 2",
    heading: "Day 2 — Sapporo, and the Half Day That Gets You Out of It",
    intro:
      "Sapporo is a grid city of about two million people and it is not, on its own, a two-day sight. What it is good at is being a base — and the best version of Day 2 is half a day in the city and half a day just outside it. In the first fortnight of February that second half is already decided for you: the Snow Festival runs 4 to 11 February 2027 across three free sites, and an evening at the lit Odori sculptures is the single best-value thing on this itinerary. Outside those dates, Jozankei is under an hour south and is the answer to the thing a February Sapporo day actually needs, which is an indoor middle.",
    stops: [
      {
        time: "Morning",
        place: "Odori Park, the Hokkaido Government Office and the Nijo fish market",
        allow: "2–3 hours",
        getting: "On foot and one or two subway stops",
        booking: "No",
      },
      {
        time: "Midday",
        place: "A ramen or soup-curry lunch, then the Sapporo Beer Museum",
        allow: "2 hours",
        getting: "Toho Line, or the Factory loop bus",
        booking: "No for the museum; the tasting is paid on the day",
      },
      {
        time: "Afternoon",
        place: "Jozankei onsen or the Hill of the Buddha — or, 4–11 February 2027, the Tsudome festival site",
        allow: "Half a day",
        getting: "Jotetsu bus or a booked coach; Tsudome is the Toho Line to Eiwamachi plus a shuttle",
        booking: "Advised for a guided half day; nothing for the festival sites, which are free",
      },
      {
        time: "Evening",
        place: "Mt Moiwa ropeway at dusk, or the lit Odori and Susukino sites in festival week",
        allow: "2–3 hours",
        getting: "Streetcar then the ropeway; or one subway stop for Odori",
        booking: "Walk-up for the ropeway; nothing at all for the festival",
      },
    ],
    book: (
      <>
        The half day out, and nothing else. All three Snow Festival sites are free on the organising
        committee&apos;s own FAQ — 「全会場無料です」, read {FESTIVAL_CHECKED} — so in festival week the
        money goes on the room and the days out rather than on tickets, which our{" "}
        <Link href="/guides/attractions/sapporo-snow-festival-tours">Sapporo Snow Festival guide</Link>{" "}
        works through in detail. Outside those dates, the Jozankei listings are the ones to open: one is an
        onsen day with the Jotetsu bus ticket inside the booking, the other pairs the gorge with Tadao
        Ando&apos;s Hill of the Buddha and Shiroi Koibito Park. Inside the city, the only pass worth
        anything is the Transportation Bureau&apos;s subway day ticket — {SUBWAY_DAY_PASS} on a weekday and{" "}
        {DONICHIKA} at weekends and on public holidays, against a ¥210 one-zone ride, so it pays from three
        or four rides.
      </>
    ),
    picks: [
      { label: "Jozankei & Hill of the Buddha day →", url: sapporoJozankeiBuddhaDayTour.url },
      { label: "Jozankei onsen day with bus →", url: jozankeiHotSpringBusTrip.url },
      { label: "TV Tower + Moiwa set ticket →", url: sapporoTvTowerMoiwaSetTicket.url },
      { label: "Check Sapporo hotels →", url: hokkaidoSevenDayStayAreas[0].url },
    ],
  },
  {
    n: 3,
    label: "Day 3",
    heading: "Day 3 — Otaru, and Whether to Add Yoichi",
    intro:
      "The cheapest good day of the week: ¥800 and about 33 minutes each way on the Rapid Airport, to a port town you walk rather than queue for. The canal and its gas lamps are about half an hour, Sakaimachi-dori is an hour or two of glass workshops and converted banks, and the sushi is the one thing here people travel for. Two decisions attach to this day. Whether to finish after dark, because the canal is a lamp-lit view rather than a daylight one — and whether to add the Nikka distillery at Yoichi, which is the only part of the day where a booked coach beats a train ticket.",
    stops: [
      {
        time: "Morning",
        place: "Sapporo → Otaru, then the canal on foot",
        allow: "40 minutes on the train, 30–45 at the canal",
        getting: `JR Rapid Airport, ${OTARU_FARE} adult; the canal is about 10 minutes downhill from the station`,
        booking: "No — IC cards work at the gate",
      },
      {
        time: "Midday",
        place: "Sakaimachi-dori, the steam clock and the glass workshops, then a sushi lunch",
        allow: "2–3 hours",
        getting: "On foot from the canal",
        booking: "Worth booking a sushi counter on a weekend; nothing else",
      },
      {
        time: "Afternoon",
        place: "The Yoichi distillery, or Tenguyama, or the Otaru Aquarium",
        allow: "2–3 hours",
        getting: "JR to Yoichi then a 5-minute walk — but Nikka warns there are few trains; bus or coach for the rest",
        booking: "Yes for a Nikka tour — free, but reservations are requested in advance",
      },
      {
        time: "Dusk",
        place: `The canal cruise after dark, or the Snow Light Path on 6–13 February 2027`,
        allow: "40 minutes on the water, plus the 15 minutes the operator asks you to arrive before",
        getting: "Boarding at the Chuo-bashi bridge, a short walk from the station",
        booking: `Advised on a busy date. ${CRUISE_DAY} adult by day, ¥2,000 at night, ¥500 primary-school child`,
      },
    ],
    book: (
      <>
        Not the train — the half of the day that is not Otaru. Nikka&apos;s own FAQ says distillery tours
        are free of charge but that reservations are requested in advance, and its access page warns that{" "}
        <em>&ldquo;there are few trains operating between Otaru Station and Yoichi Station&rdquo;</em>: a
        fixed-time booking at the far end of a thin timetable is exactly what a guided day solves, which is
        why the Yoichi listings lead here. The distillery is closed 23 December to 7 January. The canal
        cruise is the other thing worth holding —
        the operator&apos;s own fares are {CRUISE_DAY} adult by day and ¥2,000 at night for 40 minutes, and
        its own policy is that sailings are cancelled for weather. Our{" "}
        <Link href="/guides/attractions/otaru-day-trip-from-sapporo">Otaru day trip from Sapporo</Link>{" "}
        guide has the full version of this day, including the case for sleeping here instead.
      </>
    ),
    picks: [
      { label: "Yoichi & Otaru walking day →", url: yoichiOtaruWalkingTour.url },
      { label: "Cape Kamui + Yoichi coach day →", url: otaruShakotanYoichiCoachTour.url },
      { label: "Canal cruise + workshop →", url: otaruCanalCruiseSealCarving.url },
      { label: "Otaru & snow park day →", url: otaruSnowParkDayTour.url },
    ],
  },
  {
    n: 4,
    label: "Day 4",
    heading: "Day 4 — Inland: Asahikawa, the Zoo, and the Train Down to Furano",
    intro:
      "This is the day the itinerary stops being a city break. Sapporo to Asahikawa is 1 hr 25 min on the Ltd. Exp. Lilac or Kamui, and Asahiyama Zoo — the reason almost everyone makes this trip — is the most-visited thing in Hokkaido outside Sapporo. Then rather than going back, you carry on south by local train through Biei to Furano, and sleeping at the far end is what turns Day 5 from a coach day into a morning. Two hard facts to plan around. The zoo closes for New Year, 30 December to 1 January. And in winter it shuts at 15:30, with last admission at 15:00 — which is before you would normally think about leaving.",
    stops: [
      {
        time: "Early morning",
        place: "Sapporo → Asahikawa",
        allow: "1 hr 25 min",
        getting: `Ltd. Exp. Lilac or Kamui, all seats reserved — ${ASAHIKAWA_OW} one way on JR Hokkaido's own round-trip figure`,
        booking: "Yes — these are all-reserved trains",
      },
      {
        time: "Morning to mid-afternoon",
        place: "Asahiyama Zoo",
        allow: "3–4 hours",
        getting: "Asahikawa Denki Kidosha bus from in front of Asahikawa Station",
        booking: `No. ${ZOO_ADULT} adult, free for junior-high age and under`,
      },
      {
        time: "Mid-afternoon",
        place: "Back to Asahikawa, then the local train south",
        allow: "Check the timetable: JR Hokkaido publishes 40 minutes for Biei–Furano, and no time for the Asahikawa leg",
        getting: `JR local train, ${FURANO_LOCAL} Asahikawa–Furano. IC cards do not work on this line`,
        booking: "No",
      },
      {
        time: "Evening",
        place: "Check in at Furano, and eat where the farms are",
        allow: "The rest of the day",
        getting: "On foot or a short taxi from the station",
        booking: "Yes — two nights, and Furano has far fewer rooms than Sapporo",
      },
    ],
    book: (
      <>
        The reserved seats and the Furano room, in that order. The Lilac and Kamui are all-reserved trains,
        so the Asahikawa leg is a booking rather than a turn-up — and this is the leg that decides the pass
        question, because this leg, the return from Furano on Day 6 and the Otaru return already come to
        more than the four-day Sapporo–Furano Area Pass costs. The zoo is {ZOO_ADULT} at the gate (¥1,400
        from 29 April 2027) and needs nothing booked; what it needs is the right hours. Asahiyama&apos;s
        own pages, read {SEASON}: the winter season runs <strong>11 November 2026 to 7 April 2027</strong>{" "}
        at <strong>10:30–15:30 with last admission 15:00</strong>, and the zoo is{" "}
        <strong>closed 30 December to 1 January</strong>. The penguin walk — genuinely the reason to come
        in winter — only runs once there is enough snow for a course, which the zoo puts at late December
        to mid-March, at 11:00 and 14:30, and 11:00 only in March. The 2026-27 start date is awaiting the
        zoo&apos;s announcement on its official social media.
      </>
    ),
    picks: [
      { label: "Asahiyama Zoo day from Sapporo →", url: asahiyamaBieiHighlightsTour.url },
      { label: "Furano & Biei Blue Pond day →", url: furanoBieiBluePondDayTour.url },
      { label: "Check Furano hotels →", url: hokkaidoSevenDayStayAreas[2].url },
      { label: "Price the JR Hokkaido pass →", url: jrHokkaidoRailPass.url },
    ],
  },
  {
    n: 5,
    label: "Day 5",
    heading: "Day 5 — Biei and Furano: the Day the Season Decides",
    intro:
      "Of the seven days, this is the one that is a completely different day in February and in July, and the one that justifies the two nights inland. In summer it is the striped hills of Shikisai-no-oka, Farm Tomita's lavender and the Shirogane Blue Pond — a landscape day, and the reason Hokkaido is on anyone's list in July. In winter it is the same hills under snow, which is quieter and emptier and better than it sounds, plus the Furano ski area at the end of the valley. Either way the practical point is the same: this country is laid out for cars, the buses are infrequent, and from a Furano base you get the mornings rather than the middle of a coach day.",
    stops: [
      {
        time: "Morning",
        place: "Farm Tomita and the Furano flower farms (summer), or the Furano ski area (winter)",
        allow: "2–3 hours",
        getting: "Local train to Naka-Furano in summer, or a resort shuttle in winter",
        booking: "No for the farm; yes for lift tickets and rental",
      },
      {
        time: "Midday",
        place: "Furano omelette curry or a farm restaurant lunch",
        allow: "1 hour",
        getting: "On foot",
        booking: "No",
      },
      {
        time: "Afternoon",
        place: "Biei: Shikisai-no-oka, the patchwork hills, the Shirogane Blue Pond",
        allow: "3–4 hours",
        getting: "Local train to Biei plus a local bus, a sightseeing bus, a taxi course or a booked coach",
        booking: "Strongly advised in some form — this is the leg public transport serves worst",
      },
      {
        time: "Evening",
        place: "Back in Furano — and in winter, a very dark sky",
        allow: "The rest of the day",
        getting: "Local train or the day tour's own drop-off",
        booking: "No",
      },
    ],
    book: (
      <>
        The way you move around Biei, which is the only genuinely difficult transport problem on this
        itinerary. Farm Tomita publishes its own hours — 9:30 to 16:30, with &ldquo;admission is not
        allowed outside of opening hours&rdquo;, read {OWN} — and the farm itself is not the issue; getting
        between it, the hills and the Blue Pond without a car is. The three honest options are a sightseeing
        bus, a taxi course, or a guided day out of Sapporo that covers the lot and gives up the early light.
        If your trip is in the lavender weeks, book that in some form well ahead: this is the single
        most-booked day in Hokkaido, and the listings differ on exactly the thing that matters — whether the
        Blue Pond is in the itinerary, whether Farm Tomita is, and whether lunch is inside the price. We do
        not publish a bloom window, because Farm Tomita&apos;s own page does not state one.
      </>
    ),
    picks: [
      { label: "Furano & Biei winter day →", url: furanoBieiWinterIlluminationTour.url },
      { label: "Biei & Furano lavender day (summer) →", url: bieiFuranoLavenderDayTour.url },
      { label: "Furano, Blue Pond & Shikisai-no-oka →", url: furanoBieiBluePondDayTour.url },
      { label: "Furano & Biei join-in coach (summer) →", url: sapporoFuranoBieiLavenderBusTour.url },
      { label: "Check Furano hotels →", url: hokkaidoSevenDayStayAreas[2].url },
    ],
  },
  {
    n: 6,
    label: "Day 6",
    heading: "Day 6 — Back to Sapporo, and the Last Big Day Out",
    intro:
      "How you get back depends on the season. In summer the Furano Lavender Express runs to Sapporo in two hours with no transfer, so Day 6 can be a travel morning and still be a full day. It is a seasonal train, so from December to February you take the local to Asahikawa and change to the Lilac or Kamui, which uses up the morning. What you do with the afternoon splits by season too. In winter the honest answer is close to Sapporo: a snow-park half day, or from 30 January to 23 February 2027 the Lake Shikotsu ice festival, which is lit from 16:30 and sold both as a guided half day and as a plain coach seat. In summer it is the long run south to Noboribetsu and Lake Toya — the hot-spring valley and the caldera lake — which is a lot of coach for one day but the only way to see either without a second base.",
    stops: [
      {
        time: "Morning",
        place: "Furano → Sapporo: Lavender Express in summer, local train and Lilac or Kamui in winter",
        allow: "2 hours",
        getting: `Summer: reserved limited express, ${FURANO_OW} one way on JR Hokkaido's own round-trip figure. Winter: ${FURANO_WINTER} by the route through Asahikawa`,
        booking: "Yes",
      },
      {
        time: "Afternoon",
        place: "A ski or snow-play day (winter), or Noboribetsu and Lake Toya (summer)",
        allow: "Half a day to a full one",
        getting: "Resort shuttle from Sapporo, or a join-in coach",
        booking: "Yes — both are booked departures with fixed pick-ups",
      },
      {
        time: "Evening",
        place: "Last dinner in Susukino, or the Lake Shikotsu ice festival lit after dark in February",
        allow: "2–3 hours",
        getting: "One subway stop; or a round-trip coach seat to the lake",
        booking: "No for Susukino; yes for the lake coach",
      },
      {
        time: "Late",
        place: "Repack, and check tomorrow's flight",
        allow: "1 hour",
        getting: "n/a",
        booking: "n/a",
      },
    ],
    book: (
      <>
        Whichever of the two afternoons you picked and, in summer, the Lavender Express seat that gets you back
        for it. If you want a ski day instead, our{" "}
        <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours guide</Link> sets out the same-day
        lift and coach package from Sapporo. From 30 January to 23 February 2027 the Lake Shikotsu ice
        festival is the alternative worth knowing about, and the half-day tour below is the simple way to
        reach it.
        Whatever you book, read the cancellation window. This is the day a Hokkaido snow day takes away — it
        does not close the free festival sites, but it closes roads out of the city.
      </>
    ),
    picks: [
      { label: "Noboribetsu, Toya & Otaru day →", url: noboribetsuToyaOtaruDayTour.url },
      { label: "Lake Shikotsu ice festival →", url: lakeShikotsuIceFestivalHalfDayTour.url },
      { label: "Sapporo snow park half day →", url: sapporoSnowParkHalfDayTour.url },
      { label: "Noboribetsu, Toya & Niseko day →", url: noboribetsuToyaNisekoDayTour.url },
    ],
  },
  {
    n: 7,
    label: "Day 7",
    heading: "Day 7 — New Chitose, and the One Thing Not to Do",
    intro:
      "Hokkaido's departure day has a specific trap in it, and it is weather. The Rapid Airport is 36 to 43 minutes and ¥1,230, six services an hour in the daytime, so the leg itself is easy — but in February the road and air sides of New Chitose are the parts of this trip most likely to be disrupted, which is the argument against booking the first departure of the day. The other thing worth knowing is that New Chitose is an unusually good airport to be early at: the domestic terminal is a shopping street with a cinema and a hot spring in it, so an extra hour there is not a wasted one.",
    stops: [
      {
        time: "Morning",
        place: "Last shopping around Sapporo Station and Odori",
        allow: "1–2 hours",
        getting: "On foot, underground",
        booking: "No",
      },
      {
        time: "Three hours before the flight",
        place: "Sapporo → New Chitose Airport",
        allow: "36–43 minutes, plus slack",
        getting: `Rapid Airport, ${AIRPORT_FARE} adult; the uシート reserved car is ¥1,000 more`,
        booking: "No — but reserve the seat if you have hold cases",
      },
      {
        time: "At the airport",
        place: "The domestic terminal's shopping floor and food street",
        allow: "1–2 hours",
        getting: "On foot from the station, which is under the terminal",
        booking: "No",
      },
      {
        time: "Departure",
        place: "Fly to Tokyo, Osaka or onward",
        allow: `${HND_FLIGHT} to Haneda on JAL's own figure`,
        getting: "n/a",
        booking: "Booked long ago — but not the first flight of the day in winter",
      },
    ],
    book: (
      <>
        Nothing new, and that is the point of a well-planned last day. Two things to check rather than buy.
        First, your eSIM or data plan should still be live on the departure date — a flight change notice in
        February arrives on your phone, not at a counter. Second, if you are connecting onward in Tokyo or
        Osaka, give the Hokkaido leg more slack than you would give a shinkansen: JAL&apos;s own domestic
        route list puts Haneda to Sapporo at {HND_FLIGHT} with sixteen flights a day, so a missed morning
        departure is recoverable — a missed international connection is not.
      </>
    ),
    picks: [
      { label: "New Chitose transfers →", url: newChitoseAirportTransfers.url },
      { label: "See Klook eSIM options →", url: klookEsim.url },
    ],
  },
];

/** The same-trip block under the Quick Answer box. */
const hokkaidoSameTrip: KlookTripPrepItem[] = [
  {
    label: klookEsim.name,
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
    why: "A February week here runs on notices: train delays, road closures and flight changes all reach your phone first, and the Asahikawa and Furano legs need a live timetable.",
  },
  {
    label: newChitoseAirportTransfers.title,
    ctaLabel: "Check New Chitose transfers →",
    url: newChitoseAirportTransfers.url,
    why: `The Rapid Airport train at ${AIRPORT_FARE} suits most arrivals. A booked car is for a late landing, a hotel away from a station, or a party with ski bags.`,
  },
  {
    label: sapporoFuranoAreaPass.title,
    ctaLabel: "Price the area pass →",
    url: sapporoFuranoAreaPass.url,
    why: `The pass that pays on this route: ${AREA_FURANO} for four consecutive days on JR Hokkaido's own page, laid over Days 3 to 6.`,
  },
  {
    label: "Hotels around Sapporo Station",
    ctaLabel: "Check Sapporo hotels on Klook →",
    url: hokkaidoSevenDayStayAreas[0].url,
    why: "Four of the six nights are here, and every rail leg of the week starts in this building.",
  },
];

const faqItems = [
  {
    q: "Is 7 days enough for Hokkaido?",
    a: `For one half of the island, yes — comfortably. Seven days with six nights covers Sapporo, Otaru, Asahikawa, Biei and Furano without a single rushed morning, which is the route this page lays out: four nights in Sapporo, two in Furano. What seven days does not cover is the whole island. Hokkaido is roughly the size of Austria, and the east — Shiretoko, Kushiro, the Akan lakes — is another four or five hours beyond Asahikawa; Hakodate in the south is a further run again. A seven-day trip that tries to add either ends up as a week of trains. The honest planning rule is one base per two to three nights: at two bases you see the west properly, at three you see it in a hurry, and at four you have booked a transport itinerary rather than a holiday.`,
  },
  {
    q: "Do I need a car in Hokkaido?",
    a: `Not for this route, with one genuine exception. Sapporo, Otaru, Asahikawa and Furano are all on JR lines with limited expresses or several-an-hour rapids between them — Sapporo to Otaru is ${OTARU_FARE} and about 33 minutes, Sapporo to Asahikawa 1 hr 25 min, Sapporo to Furano two hours on the seasonal Lavender Express in summer, all JR Hokkaido's own figures read ${OWN}. In winter that train does not run, so you go by the local train to Asahikawa and the Lilac or Kamui. Inside Sapporo the subway does everything. The exception is Day 5: Biei's patchwork hills, Shikisai-no-oka and the Shirogane Blue Pond are spread across farmland with infrequent local buses, and that is the one leg where not having a car genuinely costs you. The three workable answers without one are a sightseeing bus, a taxi course from Biei station, or a guided day — which is why that day's listings are the most useful ones on this page. Two cautions about driving instead: winter road conditions in Hokkaido are the real thing, not an inconvenience, and a car is dead money on the four days you are in cities.`,
  },
  {
    q: "Is the Hokkaido Rail Pass worth it for 7 days?",
    a: `On this route, no — and the arithmetic is worth seeing rather than taking on trust. JR Hokkaido's own prices, read ${OWN}: the Hokkaido Rail Pass is ${PASS_5} for five consecutive days, ${PASS_7} for seven and ${PASS_10} for ten when bought before arrival, ¥1,000 more at a station, with no flexible-day version. Now the legs. The airport runs are ${AIRPORT_FARE} each way. Otaru return is ¥1,600. Sapporo to Asahikawa reserved is ${ASAHIKAWA_OW} one way, which is half JR Hokkaido's own ${ASAHIKAWA_RT} round-trip figure. Asahikawa to Furano by local train is ${FURANO_LOCAL}. Furano back to Sapporo on the summer Lavender Express is ${FURANO_OW}, half its own ${FURANO_RT}, or ${FURANO_WINTER} in winter by the local train and the Lilac or Kamui. That totals ${TOTAL_SUMMER} in summer and ${TOTAL_WINTER} in winter, so under ¥18,000 either way. Against ${PASS_7}, the seven-day pass loses by about ¥10,000. What does pay is the four-day Sapporo–Furano Area Pass at ${AREA_FURANO}: the Asahikawa and Furano limited-express legs alone are ¥11,720 of fares, and that pass also covers New Chitose, Sapporo, Otaru and Biei — so used across Days 3 to 6 it clears its cost with the Otaru return on top. The Sapporo–Noboribetsu Area Pass at ${AREA_NOBORIBETSU} is the equivalent for a route that goes south instead of inland. And the national JR Pass, at ¥53,000 for seven days after the 1 October 2026 revision, has no business on an island-only trip at all.`,
  },
  {
    q: "Where should I stay in Hokkaido?",
    a: `Two bases for seven days: Sapporo for four nights and Furano for two. Sapporo Station is the base that makes the route work rather than the base with the view — the Rapid Airport from New Chitose, the Lilac and Kamui to Asahikawa and, in summer, the Furano Lavender Express all leave from that building, and Odori is one subway stop or a covered walk, which in a month averaging a ${FEB_MAX} daily maximum matters more than anything else. Furano for Nights 4 and 5 is the part people skip and should not: Biei and Furano as a day trip from Sapporo is a ten-hour coach run, and as two mornings from a Furano room it is the best part of the week. Two worthwhile swaps. Put Night 3 in Otaru if the lit canal is the point, and especially in the first fortnight of February when the Snow Light Path runs — it is ${OTARU_FARE} and about 33 minutes back, so it costs almost nothing. And if the week is really a ski week, replace Furano with Niseko, because the airport coach runs there directly from New Chitose and takes ski bags.`,
  },
  {
    q: "What is the best time to visit Hokkaido?",
    a: `There are two right answers and they are different holidays. February is the winter one, and it has fixed dates attached: the Sapporo Snow Festival runs 4 to 11 February 2027 across three free sites on the committee's own announcement (read ${FESTIVAL_CHECKED}), the Otaru Snow Light Path runs 6 to 13 February 2027 on the Otaru Tourism Association's own page (read ${OWN}), and Asahiyama Zoo's penguin walk needs a snow course, and the zoo announces its start date on its official social media. The cost is the weather: on the Japan Meteorological Agency's 1991–2020 normals for Sapporo, February averages a daily maximum of ${FEB_MAX}, a minimum of ${FEB_MIN} and ${FEB_SNOW} of snowfall (read ${JMA_CHECKED}). July is the summer one, and it is the opposite trip — the Furano lavender and the Biei hills, long daylight, and the one month the rest of Japan is unbearable and Hokkaido is not. Between them: May for the late cherry blossom and the Shakotan coast, late September and October for the Daisetsuzan colours. The months to think twice about are November, when the island is between seasons and attractions close to change over — Asahiyama Zoo itself shuts 4 to 10 November — and April, which is mud.`,
  },
  {
    q: "How do I get from New Chitose Airport to Sapporo?",
    a: `The Rapid Airport train, for ${AIRPORT_FARE}. JR Hokkaido's own figures, read ${OWN}: six Airport Trains an hour between 09:00 and 16:00 — one Special Rapid, three Rapid and two Semi-Rapid — with the Japanese page giving fastest times of 36, 37 and 43 minutes by service type and the English page quoting 33 minutes for the Special Rapid. The station is under the domestic terminal, nothing needs reserving, and Kitaca, Suica and PASMO all work at the gate. Car 4 is the reserved uシート at ¥1,000 on top of the fare, or ¥800 reserved ticketless, and in winter it earns that because the ordinary cars fill with ski bags. Two things the train does that people do not expect. It runs through to Otaru without a change — 73 minutes at fastest on JR Hokkaido's own figure — so an early arrival can go straight there. And the alternative, a booked road transfer, has one real advantage: it ends at your hotel door rather than at a station with cases in snow. Book it before you fly, and check the pick-up terms on the listing.`,
  },
  {
    q: "How long does it take to fly to Hokkaido from Tokyo or Osaka?",
    a: `Haneda to New Chitose is ${HND_FLIGHT} with sixteen flights a day, on JAL's own domestic route list read ${OWN} — which makes it one of the busiest air routes in the world and, in practice, a turn-up-and-fly leg if you hold a flexible fare. For Osaka we are not going to print a number: no carrier page we could read on that date published a duration for Itami or Kansai to New Chitose, and the aggregator figures are not an operator's own, so check the airline's timetable for your date. What matters for planning is the same either way. Add the ${AIRPORT_FARE} and 36 to 43 minutes from New Chitose into Sapporo on top of whatever the flight is, give a February departure more slack than you would give a shinkansen, and do not book the first flight out on your last morning. The train alternative exists — the Hokkaido Shinkansen reaches Shin-Hakodate-Hokuto, not Sapporo — but on a seven-day trip it spends a day of the week on each direction.`,
  },
  {
    q: "What does a 7-day Hokkaido trip cost in transport?",
    a: `Under ¥18,000 a head in rail fares on the route above, which is the figure most people get wrong in both directions. Broken out from JR Hokkaido's own numbers, read ${OWN}: ${AIRPORT_FARE} in from New Chitose, ¥1,600 for the Otaru return, ${ASAHIKAWA_OW} for the reserved limited express to Asahikawa, ${FURANO_LOCAL} for the local train from Asahikawa to Furano, ${FURANO_OW} for the summer Lavender Express back or ${FURANO_WINTER} by the winter route through Asahikawa, ${AIRPORT_FARE} out again: ${TOTAL_SUMMER} in summer and ${TOTAL_WINTER} in winter. Inside Sapporo, a one-zone subway ride is ¥210 and the Transportation Bureau's day tickets are ${SUBWAY_DAY_PASS} on a weekday and ${DONICHIKA} at weekends and on public holidays, so they pay from three or four rides. What is not in that figure, and what actually sets the budget: the flights in and out, six nights of rooms, and the guided days for Biei and Yoichi where public transport is genuinely bad. Those are the three lines worth comparing, and all three are per-date rather than fixed — which is why no price for any of them appears on this page.`,
  },
  {
    q: "Can you do this itinerary in reverse, or from New Chitose outwards?",
    a: `Yes, and one version of the reverse is better than the original. If your week is a ski week, fly in and go straight to Niseko or Rusutsu by the resort coach — it runs from New Chitose directly and the listing carries ski equipment plus one piece of luggage per person, which the Rapid Airport and a JR change at Otaru do not. Two or three nights there, then come back through Sapporo for the city half of the week. The other reverse — inland first, cities last — works less well, for a mundane reason: the Asahikawa and Furano limited expresses are all-reserved and less frequent than the airport rapids, so putting them on an arrival day with a delayed flight behind you is the one scheduling risk in the week. If you do run the route inland-first, buy the four-day Sapporo–Furano Area Pass for the front of the trip rather than the back, because that is where the expensive legs will be.`,
  },
  {
    q: "What if I only have 5 days, or want 10?",
    a: `Cut Day 6 and one Sapporo night for five days: arrive, one Sapporo day, Otaru, Asahikawa-and-Furano, fly out — which keeps the two things people come for and drops the discretionary big day out. Note that the five-day Hokkaido Rail Pass at ${PASS_5} is even further from paying on that shape of trip than the seven-day one is, while the four-day area pass still clears its cost. For ten days, do not add a fourth base in the west — add the east. Ten days is roughly the point at which Shiretoko or the Akan lakes become a real part of a trip rather than a long train, and it is also the point at which the ten-day island pass at ${PASS_10} starts to be worth pricing, because the eastern legs are long and expensive in a way the western ones are not. Our Japan 14-day itinerary works the same logic for a national route rather than an island one, and our Japan winter itinerary is the version that treats Hokkaido as one leg of a national February trip instead of the whole of it.`,
  },
];

const TITLE = "Hokkaido 7 Day Itinerary: 7 Days in Hokkaido, Day by Day";
const DESCRIPTION =
  "Hokkaido 7 day itinerary with a table for each day: Sapporo, Otaru, Asahikawa, Biei and Furano, plus hotel bases, flights and the rail pass maths.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/hokkaido-7-day-itinerary") },
});

export default function Hokkaido7DayItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/hokkaido-7-day-itinerary" />
        {hreflangLinks("/guides/attractions/hokkaido-7-day-itinerary")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/hokkaido-7-day-itinerary" />
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
              route: "/guides/attractions/hokkaido-7-day-itinerary",
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
                  name: "Hokkaido 7 Day Itinerary",
                  item: "https://www.japan-travel-kit.com/guides/attractions/hokkaido-7-day-itinerary",
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
          <span className={styles.breadCurrent}>Hokkaido 7 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Hokkaido 7 Day Itinerary:<br />7 Days in Hokkaido, Day by Day
          </h1>
          <p className={styles.heroSubtitle}>
            Two bases, six nights and a table for every day — plus the rail-pass arithmetic on JR
            Hokkaido&apos;s own fares, and the February and July versions side by side.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "A table per day", "Operator fares, dated", "Winter and summer variants"].map((t) => (
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
          heading="Which Hokkaido Tours Should You Book for a 7 Day Itinerary?"
          checkedIso={SEASON_ISO}
          deadline={
            <>
              Book the room first if your week touches the Sapporo Snow Festival on 4 to 11 February 2027 or
              the Otaru Snow Light Path on 6 to 13 February. Hold day tours by 31 December, and leave the
              Nikka distillery until its reservations open four weeks ahead.
            </>
          }
          tours={[
            {
              title: furanoBieiWinterIlluminationTour.title,
              url: furanoBieiWinterIlluminationTour.url,
              price: null,
              duration: "About 10 hours",
              departs: "Sapporo",
            },
            {
              title: asahiyamaBieiHighlightsTour.title,
              url: asahiyamaBieiHighlightsTour.url,
              price: "from about US$55",
              duration: "Full day",
              departs: "Sapporo",
            },
            {
              title: yoichiOtaruWalkingTour.title,
              url: yoichiOtaruWalkingTour.url,
              price: null,
              duration: "See listing",
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
                <p className={styles.verdictStatLabel}>The route</p>
                <p className={styles.verdictStatValue}>Sapporo · Otaru · Asahikawa · Biei · Furano</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bases</p>
                <p className={styles.verdictStatValue}>Sapporo 4 nights, Furano 2</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Rail fares, whole week</p>
                <p className={styles.verdictStatValue}>Under ¥18,000 a head</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>7-day island pass?</p>
                <p className={styles.verdictStatValue}>No — the 4-day area pass pays</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              This <strong>Hokkaido 7 day itinerary</strong> uses <strong>two bases and six nights</strong>
              {" "}— <strong>Sapporo for four</strong> and <strong>Furano for two</strong> — and runs{" "}
              <strong>Sapporo → Otaru → Asahikawa → Biei and Furano → Sapporo</strong>. The distances are
              short enough to do it entirely by train, on JR Hokkaido&apos;s own figures: New Chitose to
              Sapporo is <strong>{AIRPORT_FARE}</strong> and <strong>36 to 43 minutes</strong>, Sapporo to
              Otaru <strong>{OTARU_FARE}</strong> and <strong>about 33 minutes</strong>, Sapporo to
              Asahikawa <strong>1 hr 25 min</strong> on a reserved Lilac or Kamui, and Furano back to
              Sapporo <strong>two hours</strong> on the Furano Lavender Express in summer, or by local train
              and Lilac or Kamui in winter. Add it up and the whole
              week is <strong>under ¥18,000</strong> of rail fares a head — which is why the{" "}
              <strong>seven-day Hokkaido Rail Pass at {PASS_7} does not pay on this route</strong>, while
              the four-day <strong>Sapporo–Furano Area Pass at {AREA_FURANO}</strong> does. The one day you
              cannot do well on public transport is <strong>Biei</strong>, and the one day that is a
              completely different holiday in <strong>February</strong> and <strong>July</strong> is{" "}
              <strong>Furano</strong>. Fares and pass prices read {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={hokkaidoSevenDayStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Sapporo Hotels →
              </KlookLink>
              <KlookLink href={jrHokkaidoRailPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Price the JR Hokkaido Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book With a Hokkaido Week"
          intro="Three things sit outside the seven days: the data that carries every weather and timetable notice, the airport leg, and the rail pass that pays on this route. Klook blocks automated price reads, so open a listing for the figure on your own dates."
          items={hokkaidoSameTrip}
        />

        {/* Bases */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The shape of the week</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay in Hokkaido for 7 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Two bases, not four.</strong> The single most common mistake on a Hokkaido week is
            treating it like a Honshu week and changing hotel every two nights — which on an island this
            size means spending the week on trains. Four nights in Sapporo and two in Furano gets you
            everything below with no rushed morning, and the two optional swaps in the table are the only
            ones worth making.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Base", "Nights", "Why there"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {baseRows.map((row) => (
                    <tr key={row.base}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.base}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.nights}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Winter or summer */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Winter or summer</span>
          <h2 className={styles.sectionTitle}>What Is the Best Time to Visit Hokkaido?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>February and July, and they are different holidays.</strong> The outline of the week is
            the same in both; the content of four of the seven days is not, so they are set out separately
            rather than hedged. February has fixed dates to plan around — the{" "}
            <strong>Sapporo Snow Festival on 4 to 11 February 2027</strong> and the{" "}
            <strong>Otaru Snow Light Path on 6 to 13 February 2027</strong> — and a cost: a mean daily
            maximum of <strong>{FEB_MAX}</strong> and <strong>{FEB_SNOW}</strong> of snowfall in the month
            on the JMA&apos;s 1991–2020 Sapporo normals. July has the Furano lavender and long daylight, and
            is the one month Hokkaido is pleasant while the rest of Japan is not.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Day", "Winter version (Dec–Mar)", "Summer version (Jun–Aug)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.day}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.day}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.winter}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.summer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Snow Festival dates from the organising committee&apos;s own announcement, read{" "}
            {FESTIVAL_CHECKED} for our{" "}
            <Link href="/guides/attractions/sapporo-snow-festival-tours" style={{ color: "var(--text)", fontWeight: 600 }}>
              Sapporo Snow Festival guide
            </Link>
            ; Snow Light Path dates from the Otaru Tourism Association&apos;s own 2027 page, read {OWN},
            which states the dates and adds that details follow as they are confirmed. Temperature and
            snowfall normals from the Japan Meteorological Agency, read {JMA_CHECKED}. The two months to
            think twice about are November, when attractions close to change season — Asahiyama Zoo itself
            shuts 4 to 10 November — and April.
          </p>
        </section>

        {/* The pass arithmetic */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The pass maths</span>
          <h2 className={styles.sectionTitle}>Is the Hokkaido Rail Pass Worth It for 7 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Not on this route — and the four-day area pass is.</strong> This is the most useful
            number on the page, so here is the whole working rather than a verdict. Every fare below is JR
            Hokkaido&apos;s own, read {OWN} or {SEASON}, and the two limited-express figures are half of the
            round-trip prices the operator publishes on its own model-route page.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Leg", "Adult fare", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>So which pass, if any.</strong> The <strong>Hokkaido Rail Pass</strong> is {PASS_5} for
            five consecutive days, <strong>{PASS_7}</strong> for seven and {PASS_10} for ten bought before
            arrival, ¥1,000 more at a station, child half, with no flexible-day version — so against under
            ¥18,000 of fares the seven-day pass loses by about ¥10,000. The{" "}
            <strong>Sapporo–Furano Area Pass</strong> at <strong>{AREA_FURANO}</strong> for four
            consecutive days is the one that pays: the Asahikawa and Furano limited-express legs alone are
            ¥11,720, and the pass also covers New Chitose, Sapporo, Otaru and Biei, so laid over Days 3 to
            6 it clears its cost with the Otaru return on top. (It does not cover Tomamu.) The{" "}
            <strong>Sapporo–Noboribetsu Area Pass</strong> at {AREA_NOBORIBETSU} is the equivalent for a
            route that goes south rather than inland, covering New Chitose, Sapporo, Otaru and Noboribetsu
            but not Toya. And the national <strong>JR Pass</strong> — ¥53,000 for seven days, ¥84,000 for
            fourteen and ¥105,000 for twenty-one after the 1 October 2026 revision — has no place on an
            island-only trip; our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> explains when it does.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrHokkaidoRailPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Price the JR Hokkaido pass →
            </KlookLink>
            <KlookLink href={newChitoseAirportTransfers.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              New Chitose transfers →
            </KlookLink>
            <KlookLink href={nisekoResortShuttleBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Niseko resort shuttle →
            </KlookLink>
          </div>
        </section>

        <p className={styles.bodyText} style={{ marginBottom: "2.5rem" }}>
          Each of the seven days below carries its own table — time of day, where, how long to allow, how
          you get there, and whether it needs booking — with that day&apos;s listings underneath it. If your
          trip is a different shape, our{" "}
          <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link> runs a
          twelve-day national route with a February Hokkaido variant, our{" "}
          <Link href="/guides/attractions/japan-10-day-itinerary">Japan 10 day itinerary</Link> and{" "}
          <Link href="/guides/attractions/japan-14-day-itinerary">Japan 14-day itinerary</Link> cover the
          Tokyo–Kyoto–Osaka corridor instead, and our{" "}
          <Link href="/guides/attractions/sapporo-snow-festival-tours">Sapporo Snow Festival guide</Link>{" "}
          is the version of this week built entirely around the February dates. Flying home through Tokyo
          gives you other winter days to add: a ski day with our{" "}
          <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">GALA Yuzawa day trip from Tokyo</Link>,
          the bathing monkeys on a{" "}
          <Link href="/guides/attractions/jigokudani-snow-monkey-tour">Jigokudani snow monkey tour</Link>, or an
          evening with the <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo illuminations</Link>.
          Our <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go tour guide</Link>{" "}
          covers the snow villages on the Honshu side.
        </p>

        {/* Day 1 to Day 7 */}
        {days.map((day) => (
          <section key={day.n} className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>{day.label}</span>
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
                <KlookLink
                  key={pick.url}
                  href={pick.url}
                  target="_blank"
                  rel="sponsored noopener"
                  className={styles.pickCta}
                >
                  {pick.label}
                </KlookLink>
              ))}
            </div>
          </section>
        ))}

        <p
          className={styles.bodyText}
          style={{ marginTop: "-1.5rem", marginBottom: "3.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}
        >
          The &ldquo;time to allow&rdquo; column in all seven tables is our own planning allowance, not an
          operator figure. Every journey time and fare is the operator&apos;s own: the airport, Otaru,
          Asahikawa and Furano legs from JR Hokkaido&apos;s own pages, Asahiyama Zoo&apos;s{" "}
          {ZOO_ADULT} admission and winter hours from the City of Asahikawa, the canal cruise fares from the
          operator&apos;s own site, Farm Tomita&apos;s hours from Farm Tomita, and the Yoichi distillery
          lines from Nikka — all read {OWN}. The Snow Festival dates and the Sapporo subway day tickets are
          carried from our{" "}
          <Link href="/guides/attractions/sapporo-snow-festival-tours" style={{ color: "var(--text)", fontWeight: 600 }}>
            Sapporo Snow Festival guide
          </Link>
          , read {FESTIVAL_CHECKED}.
        </p>

        {/* Accommodation — required on every itinerary page on this site. */}
        <KlookStayAreas
          heading="Hotel Searches for the Bases Above"
          intro="Four searches for a two-base week, plus the two swaps. Which rooms are left and at what price is a per-date question on an island with a hard February peak, so each base links into Klook's own hotel search for it — and the why line on each one is the transport argument from the tables above rather than a view."
          areas={hokkaidoSevenDayStayAreas}
        />

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3rem" }}>
          One timing note that applies to all four. The February week this island is busiest in is a set of
          fixed dates announced a year ahead — the Snow Festival committee published the 2027 dates on 11
          February 2026 — so rooms for the first fortnight of February are the booking with no fallback,
          and Otaru is the standard answer when Sapporo is full. We publish no occupancy figure, because
          none is published.
        </p>

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
          heading="The Four Days This Route Actually Books"
          intro="Of the seven days above, four are walk-up and three are not. These are the three that are genuinely hard without a booking — Biei and Furano, Otaru plus Yoichi, and the Asahikawa zoo run — plus the long southern day for a week with a spare one."
          tours={[furanoBieiBluePondDayTour, yoichiOtaruWalkingTour, asahiyamaBieiHighlightsTour, noboribetsuToyaOtaruDayTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 7 Nov 2026: the inland day as one coach booking from Sapporo. */}
            <Link href="/guides/attractions/furano-biei-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Furano Biei Tour from Sapporo (2026): Winter vs Summer</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 3 Nov 2026: the island pass this route prices, worked across five, seven and ten days. */}
            <Link href="/guides/transport/hokkaido-rail-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hokkaido Rail Pass (2026): Price and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 1 Nov 2026: the ski version of this week, which this route deliberately skips. */}
            <Link href="/guides/attractions/niseko-ski-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Niseko Ski Tours (2027): Transfers, Lessons &amp; the Four Areas</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17l1-5h12l1 5M9 12V7h6v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Otaru Day Trip from Sapporo (2027): ¥800, 33 Min by JR</p>
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
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Winter Itinerary: 12 Days, Day by Day (2027)</p>
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
                  <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Ski Travel Insurance (2027): What Actually Needs Covering</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide (2026): Prices, Coverage and Whether It Pays</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Two bases, six nights, under ¥18,000 of trains</h2>
            <p className={styles.ctaBannerDesc}>
              The rail legs need almost nothing booked. The rooms and the three guided days do — and in the
              first fortnight of February the rooms are the only part of this week with no fallback.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={hokkaidoSevenDayStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check Sapporo Hotels →
              </KlookLink>
              <KlookLink href={hokkaidoSevenDayStayAreas[2].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check Furano Hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
