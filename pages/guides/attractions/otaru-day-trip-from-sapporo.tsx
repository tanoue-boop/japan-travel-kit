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
  capeKamuiOtaruCanalCruiseDayTour,
  jrHokkaidoRailPass,
  klookEsim,
  newChitoseAirportTransfers,
  otaruAsarigawaSkiDayTour,
  otaruCanalCruiseSealCarving,
  otaruShakotanYoichiCoachTour,
  otaruSnowParkDayTour,
  sapporoFuranoAreaPass,
  sapporoKokusaiSkiOtaruAquariumDayTour,
  sapporoSnowFestivalStayAreas,
  type KlookTripPrepItem,
} from "../../../lib/klook-links";
import {
  sapporoKokusaiOtaruDayTour,
  yoichiOtaruWalkingTour,
} from "../../../lib/klook-links-winter-hokkaido";

/**
 * Otaru as a day out of Sapporo, written for the reader searching "Otaru Day
 * Trip from Sapporo". Added 1 Nov 2026, in the same batch as the Hokkaido
 * seven-day itinerary and a day after the Sapporo Snow Festival page, because
 * the February weeks those two pages are about are exactly the weeks this day
 * trip is most searched.
 *
 * The shape of the page follows from one fact: this is the cheapest and
 * shortest day trip anywhere on this site. ¥800 and about 33 minutes on a train
 * that runs several times an hour, to a town whose three headline sights — the
 * canal, Sakaimachi and the glass workshops — cost nothing to walk past. So the
 * page answers the fare, the time and "is it worth it" in the first paragraph
 * and then spends its length on the four decisions that are actually hard:
 * half day or full day, winter or not, tour or train, and whether to bolt Yoichi
 * on the end.
 *
 * How it differs from the two neighbours. sapporo-snow-festival-tours sells the
 * week around a free festival and mentions Otaru as the fallback bed;
 * hokkaido-7-day-itinerary places Otaru inside a seven-night route. This page is
 * the day itself, with the operators' own fares and the one timing trap in it
 * (the Otaru–Yoichi service).
 *
 * Sources. Read on 1 November 2026:
 *   jrhokkaido.co.jp          the operator's own Sapporo↔Otaru page: an ¥800
 *     /global/english/travel/  fare, the Rapid Airport at about 33 minutes at
 *     airport_otaru            fastest and 33 to 41 minutes across the day, five
 *                              of six cars non-reserved, and Kitaca, Suica and
 *                              PASMO accepted. The page answered our automated
 *                              read with an error on this date, so it was read
 *                              through the jrhokkaido.co.jp search index; the
 *                              same figures were read off it directly on 30 Oct
 *                              2026 for sapporo-snow-festival-tours, including
 *                              the local train at about 46 minutes.
 *   jrhokkaido.co.jp          the English airport page: six Airport Trains an
 *     /global/english/travel/  hour between 09:00 and 16:00, and New Chitose to
 *     airport.html             Otaru at "73 mins to Otaru (fastest)".
 *   jrhokkaido.co.jp/airport/ the Japanese airport page: 札幌〜新千歳空港 1,230円,
 *                              特別快速最速36分・快速最速37分・区間快速最速43分, and
 *                              the uシート reserved seat at ¥1,000 or ¥800
 *                              ticketless.
 *   chuo-bus.co.jp            Hokkaido Chuo Bus's own 高速おたる号 pages: 札幌〜小樽
 *     /highway/                片道730円・往復1,360円, and about 1 hour by the
 *                              Maruyama routing, 1 hr 3 min via Hokudai and
 *                              1 hr 5 min via Boyodai.
 *   otaru.cc                  the canal cruise operator's own site: 大人（中学生
 *                              以上）￥1,800 day and ￥2,000 night, 小学生 ￥500 on
 *                              both, 40分, boarding at 小樽運河中央橋, arrive 15分前,
 *                              and sailings cancelled for weather.
 *   otaru.gr.jp/event/        the Otaru Tourism Association's own page for the
 *     yukiakari2027            2027 Snow Light Path: 「2月6日～13日」, with
 *                              「詳細は決まり次第お知らせいたします」 — the dates are
 *                              announced and nothing else is, so nothing else is
 *                              stated here.
 *   nikka.com/en/distilleries Nikka's own Yoichi pages: "Distillery tours are
 *     /yoichi/faq/ and         free of charge", "We request that you make
 *     /yoichi/access/          reservations in advance", the shop, Rita's Kitchen
 *                              and the Nikka Museum open to all guests with the
 *                              museum's tasting bar paid, closure 12月23日ー翌年
 *                              1月7日／6月11日, a 5-minute walk from JR Yoichi
 *                              Station, about 30 minutes from Otaru on the JR
 *                              Hakodate Main Line with the warning that "there
 *                              are few trains operating between Otaru Station and
 *                              Yoichi Station", and about 40 minutes by bus from
 *                              Otaru Station's bus terminal.
 *   jrhokkaido.co.jp          the pass prices: Hokkaido Rail Pass 5 days ¥22,000,
 *     /global/english/ticket/  7 days ¥28,000 and 10 days ¥37,000 pre-purchase
 *     railpass/                (¥1,000 more at a station), all consecutive-day;
 *                              the 4-day Sapporo–Noboribetsu Area Pass at
 *                              ¥10,000, which covers New Chitose, Sapporo, Otaru
 *                              and Noboribetsu.
 *   otaru.gr.jp/tourist/      the Tourism Association's own ropeway notices:
 *                              Tenguyama round trip ¥2,000 adult and ¥1,000 child
 *                              for the 2025–26 winter season (29 Nov–31 Mar), and
 *                              ¥1,800 adult for the 2026 summer season
 *                              (25 Apr–3 Nov).
 *
 * Carried from our own pages, with their original check dates: the 4–11 February
 * 2027 Snow Festival dates (committee announcement, 30 Oct 2026) and the JMA
 * 1991–2020 February normals for Sapporo (28 Oct 2026).
 *
 * Re-read on 6 November 2026 for the winter booking pass (task jtk-20261106-A21):
 *   otaru.gr.jp/event/         Snow Light Path 6–13 Feb 2027, details still to be
 *     yukiakari2027            announced. otaru-yukiakari.jp did not resolve.
 *   tenguyama.ckk.chuo-bus     the ropeway's own 2026-27 winter: 28 Nov 2026 to
 *     .co.jp/en/ropeway/       28 Mar 2027, round trip ¥2,000 adult and ¥1,000
 *                              child, standard hours 9:00 to 20:00, with an earlier
 *                              close on 31 Dec and 1–3 Jan.
 *   otaru.cc                   cruise fares unchanged, ¥500 for infants with one
 *                              free per adult, roofed boats in winter.
 *   nikka.com/en/distilleries  closure dates unchanged; reservations open up to 4
 *     /yoichi/faq/             weeks ahead, with no on-the-day waitlist.
 *   jrhokkaido.co.jp/airport/  ¥1,230 unchanged.
 *   jrhokkaido.co.jp/global/   pass prices unchanged.
 *     english/ticket/railpass/
 * The JR Sapporo↔Otaru page now returns "not found", so the ¥800 fare could not be
 * re-read there. A JR Hokkaido fare table shows Otaru moving from ¥750 to ¥800,
 * and the figure stands on the earlier reads.
 *
 * Nothing here is first-hand. Klook answers automated reads of its product pages
 * with HTTP 403, so the body carries no Klook price; the WinterBookingTop block
 * carries the indexed from-price, dated, and nothing else on the page does.
 *
 * Changed in that pass: `otaruYoichiDayTour` (181965) left the page. Its title
 * says Otaru and Yoichi but its indexed body describes an Otaru and Cape Kamui
 * small-group tour, so 181785 is now the Yoichi listing beside the 199716 coach.
 * `otaruShakotanKamuiDayTour` (85124) is a cherry-blossom listing and left the
 * picks.
 */

/** Figures read off the operators' own sites for this page. */
const OWN_ISO = "2026-11-01";
const OWN = checkedLabel(OWN_ISO);

/** The winter pass's re-reads of the official sites and of Klook's index. */
const SEASON_ISO = "2026-11-06";
const SEASON = checkedLabel(SEASON_ISO);

/** Carried from sapporo-snow-festival-tours and japan-winter-itinerary. */
const FESTIVAL_CHECKED = checkedLabel("2026-10-30");
const JMA_CHECKED = checkedLabel("2026-10-28");

const JR_FARE = "¥800";
const JR_FAST = "about 33 minutes";
const BUS_FARE = "¥730";
const BUS_RETURN = "¥1,360";
const CRUISE_DAY = "¥1,800";
const CRUISE_NIGHT = "¥2,000";
const CRUISE_CHILD = "¥500";
const AIRPORT_FARE = "¥1,230";
const FEB_MAX = "0.4°C";
const SNOW_LIGHT_PATH = "6 to 13 February 2027";

/** Getting there, on the two operators' own published figures. */
const transportRows = [
  {
    leg: "Sapporo → Otaru, Rapid Airport (快速エアポート)",
    time: `${JR_FAST} at fastest; 33 to 41 minutes depending on the service`,
    fare: `${JR_FARE} adult. Five of the six cars are non-reserved; the uシート reserved seat is ¥1,000 more, or ¥800 ticketless`,
    note: `The default answer. These are the same trains that run to New Chitose, so they come several times an hour and Kitaca, Suica and PASMO all work at the gate. Read ${OWN}.`,
  },
  {
    leg: "Sapporo → Otaru, local train (普通)",
    time: "About 46 minutes",
    fare: `${JR_FARE} adult — the same fare as the Rapid`,
    note: "Thirteen minutes slower for exactly the same money, so it is only the right train if it is the one standing at the platform. Figure read off the same JR Hokkaido page on 30 Oct 2026.",
  },
  {
    leg: "Sapporo → Otaru, highway bus (高速おたる号)",
    time: "About 1 hour via Maruyama, 1 hr 3 min via Hokudai, 1 hr 5 min via Boyodai",
    fare: `${BUS_FARE} one way, ${BUS_RETURN} return`,
    note: `${BUS_FARE} against ${JR_FARE} is the only reason to take it, and it costs you a quarter of an hour each way. Hokkaido Chuo Bus's own fares, read ${OWN}.`,
  },
  {
    leg: "New Chitose Airport → Otaru, direct",
    time: "73 minutes at fastest",
    fare: `${AIRPORT_FARE} covers Sapporo; Otaru is further, so buy to Otaru`,
    note: `JR Hokkaido's own figure. The Rapid Airport runs through Sapporo without a change, which makes Otaru a realistic arrival-day afternoon if your flight lands before lunch. Read ${OWN}.`,
  },
  {
    leg: "Otaru → Yoichi (for the Nikka distillery)",
    time: "About 30 minutes on the JR Hakodate Main Line, or about 40 minutes by bus from Otaru Station's bus terminal",
    fare: "Check at the gate — we publish no figure we could not read off an operator page",
    note: `Nikka's own access page carries the warning that matters here: "there are few trains operating between Otaru Station and Yoichi Station". The distillery is a 5-minute walk from Yoichi Station. Read ${OWN}.`,
  },
  {
    leg: "Guided day trip from Sapporo",
    time: "A full day, pick-up in Sapporo",
    fare: "Per seat, by date — Klook blocks automated price reads, so open the listing",
    note: "What you are buying is not the Otaru leg, which is trivial, but the parts of the day that are not: Yoichi, Cape Kamui, a ski hill or a snow park, each of which is awkward by train.",
  },
];

/** What a day in Otaru is actually made of, with the only two paid things on it. */
const stopRows = [
  {
    stop: "The canal (小樽運河)",
    where: "About a 10-minute walk from JR Otaru Station, downhill",
    allow: "30–45 minutes on foot",
    cost: "Free to walk; the cruise is separate",
    note: "The thing on every photograph is the stretch of warehouse frontage along the canal and the gas lamps on the walkway. It is one view, not an afternoon — which is why the honest version of this day pairs it with the cruise or with Sakaimachi rather than treating it as the destination.",
  },
  {
    stop: "Otaru canal cruise",
    where: "Ticket centre and dock at the Chuo-bashi bridge, a short walk from the station",
    allow: "40 minutes, plus the 15 minutes the operator asks you to arrive before",
    cost: `${CRUISE_DAY} adult day, ${CRUISE_NIGHT} adult night, ${CRUISE_CHILD} for a primary-school child on either`,
    note: `The operator's own fares and duration, read ${SEASON}. "Adult" starts at junior-high age. In winter the boats run with roofs on, and sailings are still cancelled for weather, which on this coast is not a formality. The night cruise is the one to take, because the canal is a lamp-lit view rather than a daylight one.`,
  },
  {
    stop: "Sakaimachi-dori (堺町通り)",
    where: "The main street of the old merchant quarter, running on from the canal",
    allow: "1–2 hours",
    cost: "Free; you will spend money in it",
    note: "Glass workshops, music boxes, confectioners and the steam clock, in converted banks and warehouses. This is where the time on an Otaru day actually goes, and it is the reason a two-hour visit feels short.",
  },
  {
    stop: "Sushi — Sushiya-dori and the street stalls",
    where: "A few blocks back from the canal, towards the station",
    allow: "1 hour for lunch",
    cost: "Restaurant prices; we quote none",
    note: "Otaru is a fishing port and the sushi is the one thing here people travel for rather than photograph. Worth booking at the better counters on a weekend, which is the only reservation this day really needs.",
  },
  {
    stop: "Tenguyama ropeway",
    where: "A bus ride inland from the station",
    allow: "1.5–2 hours including the ride up",
    cost: "¥2,000 adult and ¥1,000 child round trip in the 2026-27 winter season; ¥1,800 adult in the 2026 summer season",
    note: `The ropeway's own page, read ${SEASON}: this winter runs 28 November 2026 to 28 March 2027, 9:00 to 20:00 on standard days and closing earlier on 31 December and 1 to 3 January. The summer season ran 25 April to 3 November 2026, and the hill closes for maintenance between seasons.`,
  },
  {
    stop: "Nikka Whisky Yoichi Distillery",
    where: "One town further west, 5 minutes on foot from JR Yoichi Station",
    allow: "2–3 hours including the travel each way",
    cost: "Tours free; the museum's tasting bar is paid",
    note: `Nikka's own wording, read ${SEASON}: "Distillery tours are free of charge" and "We request that you make reservations in advance". Reservations open up to four weeks ahead, and there is no on-the-day waitlist. Without one you can still use the shop, Rita's Kitchen and the Nikka Museum, but not the production areas. Closed 23 December to 7 January and on 11 June.`,
  },
];

/** Half day, full day, long day — the decision the page is really about. */
const shapeRows = [
  {
    shape: "Half day (about 4 hours door to door)",
    covers: "The canal, Sakaimachi and the steam clock, plus lunch",
    verdict: "Enough to say you have seen Otaru, and the right choice if the rest of your day belongs to Sapporo",
    note: `Two ${JR_FARE} legs and about an hour and ten minutes of total train time. Leave Sapporo at 09:00 and you are back by 14:00 with the afternoon intact.`,
  },
  {
    shape: "Full day (about 8 hours)",
    covers: "The above plus the canal cruise and either Tenguyama or the Otaru Aquarium",
    verdict: "The version most people should take. The town rewards a slow afternoon more than a brisk morning",
    note: "The one argument for making it long: the canal is better after dark, and from mid-autumn to early spring in Hokkaido dark arrives early enough to catch without staying out late.",
  },
  {
    shape: "Long day with Yoichi (10 hours or more)",
    covers: "Otaru in the morning, the Nikka distillery in the afternoon",
    verdict: "Worth it for the distillery, and the one shape of this day where a guided booking genuinely beats going alone",
    note: `Nikka asks for a reservation and its own access page warns there are few trains between Otaru and Yoichi — two fixed points at opposite ends of a sparse timetable is exactly the problem a guided day removes. Read ${OWN}.`,
  },
  {
    shape: "Overnight in Otaru",
    covers: "The canal lit, a sushi dinner, and the morning before the coaches arrive",
    verdict: "The under-rated option, and almost free to choose — Otaru is one ¥800 train ride back",
    note: `Specifically worth it in the first fortnight of February, when the Snow Light Path runs here and Sapporo rooms are at their tightest for the Snow Festival.`,
  },
];

const faqItems = [
  {
    q: "How do I get from Sapporo to Otaru?",
    a: `Take the Rapid Airport (快速エアポート) from Sapporo Station: ${JR_FAST} at fastest and ${JR_FARE} for an adult, on JR Hokkaido's own figures read ${OWN}. The same page gives 33 to 41 minutes across the day depending on which service you catch, and notes that five of the six cars are non-reserved and that Kitaca, Suica and PASMO all work at the gate — so there is nothing to buy in advance and no seat to book. The uシート reserved car costs ¥1,000 more, or ¥800 reserved ticketless, and is only worth it with cases or ski bags. A local train is the same ${JR_FARE} and about 46 minutes, so take it only if it is the one standing at the platform. The alternative is Hokkaido Chuo Bus's 高速おたる号 at ${BUS_FARE} one way and ${BUS_RETURN} return, in about an hour to an hour and five minutes depending on the routing — cheaper by ¥70 and slower by a quarter of an hour each way, which is a bad trade unless you are starting from a stop the bus passes and the station does not.`,
  },
  {
    q: "Is Otaru worth a day trip?",
    a: `Yes, with one honest caveat about how long. It is the cheapest and shortest worthwhile day trip in Hokkaido — ${JR_FARE} and ${JR_FAST} each way on a train that runs several times an hour — and what is at the other end is a compact port town you walk rather than a sight you queue for: the canal and its gas lamps, the converted banks and warehouses of Sakaimachi-dori, the glass workshops and music-box shops, and the sushi of a working fishing port. The caveat is that the canal itself is a single view and about half an hour, so a reader who books an eight-hour coach day expecting the canal to fill it will be disappointed. Build the day round Sakaimachi and a meal, add the 40-minute canal cruise, and it is one of the better days of a Hokkaido week. Treat the canal as the destination and it is an hour.`,
  },
  {
    q: "How long do you need in Otaru?",
    a: `Three to four hours in the town covers it; five to six makes it a good day. A workable half day is the canal on foot (30 to 45 minutes), Sakaimachi (an hour or two) and lunch — about four hours door to door from Sapporo, which leaves the rest of the day for the city. A full day adds the ${CRUISE_DAY}-adult canal cruise, which the operator puts at 40 minutes and asks you to arrive 15 minutes before, plus either the Tenguyama ropeway or the aquarium. Ten hours or more is only justified if you are adding the Nikka distillery at Yoichi. And the one thing almost nobody plans for: the canal is better after dark than in daylight, so the best version of this day finishes later than a day trip normally does, or becomes a night.`,
  },
  {
    q: "Is Otaru better in winter?",
    a: `For the canal, yes — and there is a specific week. The Otaru Snow Light Path (小樽雪あかりの路) runs ${SNOW_LIGHT_PATH} on the Otaru Tourism Association's own page, re-read ${SEASON}; the association states the dates and adds 「詳細は決まり次第お知らせいたします」, so the dates are confirmed and nothing else about the 2027 edition is published yet, which is why no hours or venues appear here. Those dates overlap the Sapporo Snow Festival's 4 to 11 February 2027 almost exactly, which is both the reason the trains are full and the reason the two are worth doing in one trip. Two practical winter notes. The February daily maximum in this part of Hokkaido averages ${FEB_MAX} on the Japan Meteorological Agency's 1991–2020 normals for Sapporo (read ${JMA_CHECKED}), so the ground is hard-packed rather than wet and grip matters more than waterproofing. And the canal cruise is cancelled for weather on the operator's own warning — in winter that is a real possibility rather than a formality, so do not build the only evening of your trip on it.`,
  },
  {
    q: "Should I combine Otaru and Yoichi?",
    a: `If you care about whisky, yes — and this is the one part of the day where a tour beats the train. The Nikka Whisky Yoichi Distillery is a 5-minute walk from JR Yoichi Station and about 30 minutes from Otaru on the JR Hakodate Main Line, but Nikka's own access page carries the warning that decides it: "there are few trains operating between Otaru Station and Yoichi Station". Set that against the other fact from Nikka's own FAQ — "Distillery tours are free of charge" but "We request that you make reservations in advance" — and you have a fixed-time reservation at the far end of a sparse timetable, which is the classic case for a booked coach. Both read ${OWN}. If you go anyway without a reservation, the shop, Rita's Kitchen and the Nikka Museum are open to all guests and the museum's tasting bar is paid, but the production areas are not. The distillery is closed 23 December to 7 January and on 11 June.`,
  },
  {
    q: "How much is the Otaru canal cruise, and do I need to book it?",
    a: `${CRUISE_DAY} for an adult on a day cruise and ${CRUISE_NIGHT} at night, with a primary-school child ${CRUISE_CHILD} on either, for a 40-minute sailing — the operator's own figures, read ${OWN}. "Adult" starts at junior-high age. You board at the ticket centre and dock by the Chuo-bashi bridge, a short walk from the station, and the operator asks you to arrive 15 minutes before departure. Booking is the sensible rather than the required answer: this is a small boat on a fixed timetable in a town that receives coach parties, so a specific sailing on a February or August afternoon is worth holding, while a weekday in May is usually walk-up. The night cruise is the one worth planning around — the canal is lit rather than scenic, and the fare difference is ¥200. One warning that is the operator's own: sailings are cancelled for weather.`,
  },
  {
    q: "Is a rail pass worth it for an Otaru day trip?",
    a: `No, and it is not close. The return train is ${JR_FARE} each way, so ¥1,600 for the whole day against JR Hokkaido's own pass prices read ${OWN}: the Hokkaido Rail Pass is ¥22,000 for five consecutive days, ¥28,000 for seven and ¥37,000 for ten when bought before you arrive, ¥1,000 more at a station. Nothing about one day trip justifies that. Where a pass does start to make sense is a whole week — and even then the one to price first is not the island pass but the four-day Sapporo–Noboribetsu Area Pass at ¥10,000, which covers New Chitose, Sapporo, Otaru and Noboribetsu, or the Sapporo–Furano Area Pass at ¥11,000, which covers New Chitose, Sapporo, Otaru, Biei, Furano and Asahikawa. Our Hokkaido 7 day itinerary works the arithmetic against an actual route. For a single Otaru day, buy the ${JR_FARE} ticket or just tap an IC card.`,
  },
  {
    q: "Is Otaru a good day trip with children?",
    a: `Better than most of Hokkaido, for one reason: almost everything is walkable and most of it is free. The canal walk, the steam clock, the music-box shops and the glass workshops on Sakaimachi are all on foot and all at street level, and a primary-school child is ${CRUISE_CHILD} on the canal cruise against ${CRUISE_DAY} for an adult. The Otaru Aquarium is the indoor anchor for a wet or very cold afternoon, and in winter the snow-park day tours out of Sapporo pair Otaru with snow play rather than with another museum. Two cautions. The walk from the station to the canal is downhill, which means it is uphill coming back with tired legs. And the paving around the canal and Sakaimachi is cobbled and, from December to March, hard-packed with snow — a pushchair is harder work here than in central Sapporo.`,
  },
  {
    q: "What can you do in Otaru if it rains?",
    a: `Most of the town, as it happens — which is unusual for a day trip. Sakaimachi-dori is a street of indoor businesses: glass workshops where the activity is the point, music-box shops, confectioners and cafés in converted banks. The Otaru Aquarium is indoors and is the standard wet-day answer with children. The canal cruise is the one thing rain genuinely threatens, because the operator cancels sailings for weather, and the Tenguyama ropeway is pointless in low cloud since you are paying for the view. If the forecast is bad, invert the day: Sakaimachi and a long lunch first, cruise or ropeway only if it clears. All of which is also the argument for the guided versions that pair Otaru with an indoor stop such as Shiroi Koibito Park.`,
  },
  {
    q: "Can I do Otaru on the day I land at New Chitose?",
    a: `Yes, and it is one of the better uses of an arrival afternoon. JR Hokkaido's own airport page puts New Chitose to Otaru at 73 minutes at fastest, read ${OWN}, and the Rapid Airport runs through Sapporo without a change — so you do not have to drop bags first. Six Airport Trains an hour run between 09:00 and 16:00 on the same page's figures, and the Sapporo leg of that fare is ${AIRPORT_FARE}. Two conditions. You need to land before about midday for it to be a real afternoon rather than a train ride, and you need somewhere for your cases: coin lockers at Otaru Station fill on festival dates, which is the argument for either staying in Otaru that night or taking a booked transfer to your Sapporo hotel first. If the flight is later, a lit canal evening still works — the walk is free and the night cruise sails after dark.`,
  },
];

/** The same-trip block: the eSIM, the airport leg, the pass that fits, and the two extras. */
const otaruSameTrip: KlookTripPrepItem[] = [
  {
    label: klookEsim.name,
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
    why: "The two things that change an Otaru day are notices rather than tickets: the canal cruise is weather-dependent on the operator's own warning, and the Otaru–Yoichi train service is sparse enough that one missed connection rewrites the afternoon.",
  },
  {
    label: newChitoseAirportTransfers.title,
    ctaLabel: "Check New Chitose transfers →",
    url: newChitoseAirportTransfers.url,
    why: "For a night in Otaru with cases. The Rapid Airport runs through to Otaru without a change, 73 minutes at fastest, so most arrivals should take it; a booked car is for a late landing or a party with ski bags.",
  },
  {
    label: sapporoFuranoAreaPass.title,
    ctaLabel: "Price the area pass →",
    url: sapporoFuranoAreaPass.url,
    why: "Not for one Otaru day, which is ¥1,600 return. It is ¥11,000 for four days on JR Hokkaido's own page and covers Otaru, so it starts to pay only when Otaru sits inside a week that also reaches Asahikawa or Furano.",
  },
  {
    label: yoichiOtaruWalkingTour.title,
    ctaLabel: "Check the Yoichi & Otaru day →",
    url: yoichiOtaruWalkingTour.url,
    why: "The one part of this day that is genuinely easier booked: Nikka's distillery tour is a fixed-time reservation and its own access page warns there are few trains between Otaru and Yoichi. Remember the distillery is closed 23 December to 7 January.",
  },
  {
    label: "Hotels around Otaru Station",
    ctaLabel: "Check Otaru hotels on Klook →",
    url: sapporoSnowFestivalStayAreas[2].url,
    why: "For the reader who works out that the canal is better after dark than at lunchtime, and for 6 to 13 February 2027, when the Snow Light Path runs and the Snow Festival is filling Sapporo's own rooms.",
  },
];

const TITLE = "Otaru Day Trip from Sapporo (2027): ¥800, 33 Min by JR";
const DESCRIPTION =
  "Otaru day trip from Sapporo: ¥800 and about 33 minutes by JR. The canal, Sakaimachi, glass and sushi in half a day, plus Yoichi and Snow Light Path dates.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/otaru-day-trip-from-sapporo") },
});

export default function OtaruDayTripFromSapporoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/otaru-day-trip-from-sapporo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/otaru-day-trip-from-sapporo" />
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
              route: "/guides/attractions/otaru-day-trip-from-sapporo",
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
                  name: "Otaru Day Trip from Sapporo",
                  item: "https://www.japan-travel-kit.com/guides/attractions/otaru-day-trip-from-sapporo",
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
          <span className={styles.breadCurrent}>Otaru Day Trip from Sapporo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Otaru Day Trip from Sapporo:<br />the Fare, the Time and How Long to Stay
          </h1>
          <p className={styles.heroSubtitle}>
            {JR_FARE} and {JR_FAST} on a train that runs several times an hour. The canal is half an
            hour — the rest of the day is Sakaimachi, a sushi counter and, if you want it, a distillery.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Operator fares, dated", "2027 Snow Light Path dates", "Tour vs train, worked"].map((t) => (
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
          heading="Which Otaru Day Trip From Sapporo Should You Book This Winter?"
          checkedIso={SEASON_ISO}
          deadline={
            <>
              For the Snow Light Path on 6 to 13 February 2027, hold a tour or an Otaru room by 31 December.
              If you want the Nikka distillery, its reservations open four weeks ahead, so a Snow Light Path
              visit opens from about 9 January. It is closed 23 December to 7 January.
            </>
          }
          tours={[
            {
              title: otaruSnowParkDayTour.title,
              url: otaruSnowParkDayTour.url,
              price: "about US$65–76",
              duration: "Full day",
              departs: "Sapporo",
            },
            {
              title: sapporoKokusaiOtaruDayTour.title,
              url: sapporoKokusaiOtaruDayTour.url,
              price: null,
              duration: "10 hours",
              departs: "Sapporo",
            },
            {
              title: otaruAsarigawaSkiDayTour.title,
              url: otaruAsarigawaSkiDayTour.url,
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
                <p className={styles.verdictStatLabel}>Train time</p>
                <p className={styles.verdictStatValue}>{JR_FAST}, 33–41 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fare, one way</p>
                <p className={styles.verdictStatValue}>{JR_FARE} adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time to allow</p>
                <p className={styles.verdictStatValue}>Half a day; a full day is better</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Needs booking?</p>
                <p className={styles.verdictStatValue}>No — except Yoichi and the cruise</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              An <strong>Otaru day trip from Sapporo</strong> is{" "}
              <strong>{JR_FARE} and {JR_FAST}</strong> each way on the Rapid Airport train, on JR
              Hokkaido&apos;s own figures — <strong>33 to 41 minutes</strong> depending on the service,
              with trains several times an hour and IC cards accepted at the gate, so there is nothing to
              book. At the other end: the <strong>canal</strong> and its gas lamps, about a 10-minute walk
              downhill from the station and roughly <strong>half an hour</strong> to see;{" "}
              <strong>Sakaimachi-dori</strong>, the old merchant street of glass workshops, music-box shops
              and converted banks, which is where an hour or two actually goes; and the{" "}
              <strong>sushi</strong> of a working fishing port. The one paid headline is the{" "}
              <strong>canal cruise</strong> — <strong>{CRUISE_DAY}</strong> adult by day,{" "}
              <strong>{CRUISE_NIGHT}</strong> at night, <strong>{CRUISE_CHILD}</strong> for a primary-school
              child, <strong>40 minutes</strong> — and the night sailing is the better one, because this is
              a lamp-lit view rather than a daylight one. <strong>Half a day</strong> covers the town;{" "}
              <strong>a full day</strong> is the version most people should take; and only the{" "}
              <strong>Nikka distillery at Yoichi</strong> justifies ten hours. All fares read {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={yoichiOtaruWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                The Yoichi &amp; Otaru Day →
              </KlookLink>
              <KlookLink href={otaruCanalCruiseSealCarving.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Canal Cruise Options →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Same-trip block, moved up from above the FAQ on 6 Nov 2026. */}
        <KlookTripPrep
          label="Book on the same trip"
          heading="What an Otaru Day Actually Books"
          intro="The train is not on this list. The fare is ¥800 at the gate and the streets are free, so what is left is the data that carries the weather and timetable notices, the airport leg if you are sleeping here, a pass only if the week is longer than this day, the guided Yoichi half, and a room if the canal after dark is why you came."
          items={otaruSameTrip}
        />

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get From Sapporo to Otaru?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The <strong>Rapid Airport (快速エアポート)</strong> from Sapporo Station, in{" "}
            <strong>{JR_FAST}</strong> for <strong>{JR_FARE}</strong>. That is JR Hokkaido&apos;s own
            figure and it is the answer for almost everyone: these are the same trains that run to New
            Chitose, so they come several times an hour, five of the six cars are non-reserved, and Kitaca,
            Suica and PASMO all work at the gate. The table adds the alternatives and the one leg on this
            page that is genuinely awkward — Otaru to Yoichi.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Leg", "Time", "Fare", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transportRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            JR fares and times are JR Hokkaido&apos;s own, from its Sapporo↔Otaru and airport pages; the
            bus fares and routings are Hokkaido Chuo Bus&apos;s own. Both read {OWN}. The 46-minute local
            train figure comes off the same JR Hokkaido page, read on 30 October 2026 for our{" "}
            <Link href="/guides/attractions/sapporo-snow-festival-tours" style={{ color: "var(--text)", fontWeight: 600 }}>
              Sapporo Snow Festival guide
            </Link>
            .
          </p>
        </section>

        {/* What the day is made of */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What is there</span>
          <h2 className={styles.sectionTitle}>What Do You Actually Do in Otaru?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Walk one street and eat one meal, then decide whether to add a boat or a hill. Otaru is a port
            town laid out downhill from its station, and the useful thing to know before you plan the day
            is how little of it costs anything: of the six entries below, two carry a fare and the rest are
            free to walk into.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Where", "Time to allow", "Cost", "The thing to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stopRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.stop}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The &ldquo;time to allow&rdquo; column is our own planning allowance</strong>, not an
            operator figure. Everything in the cost column is the operator&apos;s or the tourism
            association&apos;s own published price, read {OWN}, except the restaurant line — we quote no
            meal prices. The canal cruise is the one booking worth holding in advance on a busy date, and
            it is also the one thing on the list that weather can take away: cancellation for weather is
            the operator&apos;s own stated policy.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={otaruCanalCruiseSealCarving.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Canal cruise + workshop →
            </KlookLink>
            <KlookLink href={capeKamuiOtaruCanalCruiseDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Cape Kamui &amp; canal cruise day (summer) →
            </KlookLink>
            <KlookLink href={yoichiOtaruWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Yoichi &amp; Otaru day →
            </KlookLink>
          </div>
        </section>

        {/* How long */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>How long</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need in Otaru?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Three to four hours in the town is enough; five or six makes it a good day.</strong>{" "}
            Because the train is so short and so cheap, the real question on this page is not how to get
            there but how much of your day to give it — and the answer changes completely once Yoichi or a
            lit canal enters the plan. Four shapes, and what each one buys.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Shape of day", "What it covers", "Verdict", "The thing to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shapeRows.map((row) => (
                    <tr key={row.shape}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.shape}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Winter */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Winter</span>
          <h2 className={styles.sectionTitle}>Is Otaru Better in Winter?</h2>
          <p className={styles.bodyText}>
            For the canal, yes — and there is one specific week. The{" "}
            <strong>Otaru Snow Light Path (小樽雪あかりの路)</strong> runs{" "}
            <strong>{SNOW_LIGHT_PATH}</strong> on the Otaru Tourism Association&apos;s own page, re-read{" "}
            {SEASON}. The association publishes the dates and then adds
            「詳細は決まり次第お知らせいたします」 — details to follow as they are confirmed — so the dates
            are the only part of the 2027 edition that is announced, and they are the only part stated here.
            We are not going to guess at hours or venues.
          </p>
          <p className={styles.bodyText}>
            Those dates sit almost exactly on top of the{" "}
            <strong>Sapporo Snow Festival&apos;s 4 to 11 February 2027</strong> (committee announcement,
            read {FESTIVAL_CHECKED}), which cuts both ways. It is why the Rapid Airport is full in that
            fortnight and why Otaru hotel rooms are a genuine fallback when Sapporo&apos;s are gone — and
            it is also why the two events are worth building one trip around rather than two. Our{" "}
            <Link href="/guides/attractions/sapporo-snow-festival-tours">Sapporo Snow Festival guide</Link>{" "}
            covers the festival end of that week in detail.
          </p>
          <p className={styles.bodyText}>
            Two practical things about a February Otaru day. The <strong>mean daily maximum</strong> in this
            part of Hokkaido in February is <strong>{FEB_MAX}</strong> on the Japan Meteorological
            Agency&apos;s 1991–2020 normals for Sapporo (read {JMA_CHECKED}), which means the snow underfoot
            is hard-packed rather than wet — grip matters more than waterproofing, and the cobbles around
            the canal and Sakaimachi are the slipperiest ground on the trip. And the{" "}
            <strong>canal cruise is cancelled for weather</strong> on the operator&apos;s own warning, so if
            a lit sailing is the reason you came, give yourself a second evening for it. What does not get
            cancelled is the walk: the canal, the lamps and Sakaimachi are a free, open-air hour whatever
            the boats are doing.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={otaruSnowParkDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Otaru &amp; snow park day →
            </KlookLink>
            <KlookLink href={sapporoKokusaiSkiOtaruAquariumDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Ski half day + Otaru →
            </KlookLink>
            <KlookLink href={otaruAsarigawaSkiDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Otaru Asarigawa ski day →
            </KlookLink>
          </div>
        </section>

        {/* Yoichi */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Otaru + Yoichi</span>
          <h2 className={styles.sectionTitle}>Should You Combine Otaru and Yoichi?</h2>
          <p className={styles.bodyText}>
            If whisky is any part of why you are in Hokkaido, yes — and this is the one leg of the day
            where a guided booking genuinely beats a train ticket of your own. The{" "}
            <strong>Nikka Whisky Yoichi Distillery</strong> is a <strong>5-minute walk</strong> from JR
            Yoichi Station and about <strong>30 minutes</strong> from Otaru on the JR Hakodate Main Line,
            or about <strong>40 minutes</strong> by bus from Otaru Station&apos;s bus terminal. Those are
            Nikka&apos;s own figures, read {OWN} — and so is the sentence that decides the question:{" "}
            <em>&ldquo;there are few trains operating between Otaru Station and Yoichi Station&rdquo;</em>.
          </p>
          <p className={styles.bodyText}>
            Set that against the other two facts from Nikka&apos;s own FAQ.{" "}
            <em>&ldquo;Distillery tours are free of charge&rdquo;</em> — there is no admission to budget
            for. But <em>&ldquo;We request that you make reservations in advance&rdquo;</em> — so the tour
            is a fixed time. A fixed-time reservation at the far end of a sparse timetable is exactly the
            situation a guided day exists for, which is why the two listings below are the honest
            recommendation on this section rather than a train ticket. If you go independently and without
            a reservation, the distillery shop, Rita&apos;s Kitchen and the Nikka Museum are open to all
            guests, and the museum&apos;s tasting bar is paid; the production areas are not open without a
            booked tour. The distillery is closed{" "}
            <strong>23 December to 7 January</strong> and on <strong>11 June</strong>, re-read {SEASON}, so
            neither listing can reach it over New Year. The first is a small-group day by train and bus with
            an English-speaking assistant. The second is a coach day whose title also names Cape Kamui, a
            coast road, so check the winter route on the listing before you book it for December to February.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={yoichiOtaruWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Yoichi &amp; Otaru walking day →
            </KlookLink>
            <KlookLink href={otaruShakotanYoichiCoachTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Cape Kamui + Yoichi coach day →
            </KlookLink>
          </div>
        </section>

        {/* Tour vs DIY */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Tour or train</span>
          <h2 className={styles.sectionTitle}>Is a Tour Worth It, or Should You Just Take the Train?</h2>
          <p className={styles.bodyText}>
            Take the train for Otaru. Book a coach for what you bolt onto Otaru. That is the whole answer,
            and it follows from the fares rather than from a preference.
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Take the train if Otaru is the whole plan</p>
              <p className={styles.whoForDesc}>
                {JR_FARE} and {JR_FAST}, several services an hour, no reservation and an IC card at the
                gate. The canal, Sakaimachi and a sushi lunch are all within walking distance of each
                other, so there is nothing a guide unlocks and nothing a coach saves you. A tour that
                spends the day on this alone is paying for a bus you do not need.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Book a guided day if Yoichi is in the day</p>
              <p className={styles.whoForDesc}>
                This is the real case. Nikka asks for an advance reservation and its own access page warns
                there are few trains between Otaru and Yoichi — a fixed time at the end of a thin timetable.
                A guided day takes both problems off your hands, and a coach day can add stops that are
                worse again by public transport.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Book a coach if the day includes snow</p>
              <p className={styles.whoForDesc}>
                A ski hill or a snow park is a lift ticket, a rental and a transfer, and the listings sell
                all three in one booking. For a traveller carrying no gear this is cheaper to organise than
                it is to assemble, and in February it is the thing that gives an outdoor Otaru afternoon an
                indoor or active morning.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Check the cancellation window either way</p>
              <p className={styles.whoForDesc}>
                Specific to this coast: the canal cruise is cancelled for weather on the operator&apos;s own
                policy, and a February road day in Hokkaido can go the same way. Before you book a coach,
                read what happens if the operator cancels and what happens if you do — the two are rarely
                the same, and nothing on this page can tell you, because it is per listing and per date.
              </p>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            One booking that is neither transport nor a tour: data. The canal cruise sails by weather, the
            Otaru–Yoichi trains are sparse, and the Snow Light Path details for 2027 were still unpublished
            when this page was written — all three are notices that reach you on your phone rather than at a
            counter.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it
            against the alternatives.
          </p>
        </section>

        {/* Passes */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Passes</span>
          <h2 className={styles.sectionTitle}>Is a Rail Pass Worth It for an Otaru Day Trip?</h2>
          <p className={styles.bodyText}>
            No — and the arithmetic is not close enough to need a calculator. The return is{" "}
            <strong>¥1,600</strong> of fares. Against that, JR Hokkaido&apos;s own pass prices read {OWN}:
            the <strong>Hokkaido Rail Pass</strong> is <strong>¥22,000</strong> for five consecutive days,{" "}
            <strong>¥28,000</strong> for seven and <strong>¥37,000</strong> for ten when you buy before
            arriving, and ¥1,000 more if you buy at a station. All three are consecutive-day passes; there
            is no flexible version.
          </p>
          <p className={styles.bodyText}>
            Where a pass starts to matter is a whole Hokkaido week, and even then the island pass is usually
            not the right one. JR Hokkaido&apos;s two four-day area passes both include Otaru: the{" "}
            <strong>Sapporo–Noboribetsu Area Pass</strong> at <strong>¥10,000</strong> covers New Chitose,
            Sapporo, Otaru and Noboribetsu, and the <strong>Sapporo–Furano Area Pass</strong> at{" "}
            <strong>¥11,000</strong> covers New Chitose, Sapporo, Otaru, Biei, Furano and Asahikawa. Those
            are the ones a Sapporo-based week should price first, because they are the ones a Sapporo-based
            week actually fills. Our{" "}
            <Link href="/guides/attractions/hokkaido-7-day-itinerary">Hokkaido 7 day itinerary</Link> works
            the sums against a real seven-night route, and our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> uses the same method for the
            national pass. For one Otaru day: buy the {JR_FARE} ticket, or just tap.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrHokkaidoRailPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Price the JR Hokkaido pass →
            </KlookLink>
          </div>
        </section>

        {/* The rest of the winter */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The rest of your winter</span>
          <h2 className={styles.sectionTitle}>What Should You Pair With a Winter Otaru Day?</h2>
          <p className={styles.bodyText}>
            Otaru is a day, so it works best inside something longer. If you are in Hokkaido for the snow,
            our <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours guide</Link> covers the
            resort side of the island, and Otaru makes the easy rest day between the airport and the
            mountain. Our{" "}
            <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link> shows how a
            Hokkaido leg joins a route through Honshu.
          </p>
          <p className={styles.bodyText}>
            If your trip starts in Tokyo and Hokkaido is a stretch, the mainland has its own snow days. The{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go tour</Link>{" "}
            gives you old streets under snow, and the{" "}
            <Link href="/guides/attractions/jigokudani-snow-monkey-tour">Jigokudani snow monkey tour</Link>{" "}
            is the other winter-only day out. A{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">GALA Yuzawa ski day from Tokyo</Link>{" "}
            does the job of the Sapporo ski days above, and if the lit canal is what drew you here, our guide
            to <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo illuminations</Link> covers the
            winter lights at the other end of the flight.
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
          heading="The Days That Pair Otaru With Something Else"
          intro="Four departures out of Sapporo, each one Otaru plus the thing that is genuinely hard to reach on the ¥800 train alone: the Yoichi distillery, a snow park or a ski hill. None of them is a substitute for that train if Otaru alone is the plan."
          tours={[yoichiOtaruWalkingTour, otaruShakotanYoichiCoachTour, sapporoKokusaiOtaruDayTour, otaruSnowParkDayTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 3 Nov 2026: the island pass, for an Otaru day inside a longer Hokkaido trip. */}
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
            <Link href="/guides/attractions/niseko-ski-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Niseko Ski Tours (2027): Transfers, Lessons &amp; 4 Areas</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <h2 className={styles.ctaBannerTitle}>{JR_FARE} each way, and one decision worth making</h2>
            <p className={styles.ctaBannerDesc}>
              The train needs nothing booked. What does is the half of the day that is not Otaru — the
              Yoichi distillery or a ski hill — and a canal cruise on a date that fills.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={yoichiOtaruWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                See the Yoichi &amp; Otaru Day →
              </KlookLink>
              <KlookLink href={otaruCanalCruiseSealCarving.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Canal Cruise Options →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
