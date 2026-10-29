import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  jrKansaiAreaPass,
  klookEsim,
  kyotoFushimiInariWalkingTour,
  kyotoGionNightWalkingTour,
  kyotoHighlightBusTour,
  kyotoKimonoAiwafukuKiyomizu,
  kyotoKimonoOokiniArashiyama,
  kyotoKimonoYumeyakata,
  kyotoTwoDayStayAreas,
  kyotoTwoDayTripPrep,
  saganoHozugawaGuaranteedTour,
  saganoRomanticTrainTicket,
  shinkansenTokyoKyoto,
} from "../../../lib/klook-links";

/**
 * Two days in Kyoto, written as a routing-and-booking plan rather than a list of
 * temples. Added 29 Oct 2026.
 *
 * Why it exists next to the three Kyoto pages it sits beside:
 *  - things-to-do-kyoto answers "what is there", city-wide and un-sequenced;
 *  - where-to-stay-in-kyoto answers "which area", on lines and travel time;
 *  - kyoto-transportation answers "which ticket covers the buses";
 *  - this page answers "in what order, on which day, and what has to be booked",
 *    so its unit is the half-day.
 *
 * Kyoto's problem is the opposite of Tokyo's. Almost nothing here has a timed
 * entry, so the plan is not a booking queue — it is a geography problem, because
 * the four headline sights sit on four different sides of the city. Every journey
 * figure below is therefore an official one rather than an estimate, and sourced
 * per claim. Read on 29 October 2026 except where a date is given:
 *
 *   kyoto.travel (Kyoto City       Kyoto Station to Fushimi Inari 10 min,
 *   Tourism Association)           Saga/Arashiyama 25 min, Higashiyama
 *                                  (Kiyomizu-dera) 35 min, Kinkaku-ji/Kinugasa
 *                                  40 min; JR Nara Line "about 9 minutes" to JR
 *                                  Inari, with all Miyakoji Rapid, Regional
 *                                  Rapid and local trains stopping; its own
 *                                  advice against City Bus South No. 5 (timing
 *                                  variation over 24 minutes) and against the bus
 *                                  to Arashiyama; JR Sagano Line "about 11
 *                                  minutes" by Rapid to Saga-Arashiyama, board
 *                                  from the back of the platform, 8 minutes on
 *                                  foot to Togetsukyo; Kinkaku-ji via the
 *                                  Karasuma subway to Kitaoji, about 15 minutes,
 *                                  then City Bus 204 or 205; the EX100 and EX101
 *                                  limited express buses at ¥500 a ride on
 *                                  weekends and holidays; the Okoshi Bus
 *                                  "Kiyomizu-dera Line", 1 July 2026 to
 *                                  29 January 2027 (scheduled), weekdays only,
 *                                  ¥1,500 adult and ¥1,000 child with
 *                                  Kiyomizu-dera admission included and advance
 *                                  prepayment required
 *   kiyomizudera.or.jp             6:00 open, 18:00 close (18:30 in July and
 *                                  August), 21:00 reception cut-off during the
 *                                  special night viewings; ¥500 adult and ¥200
 *                                  elementary and junior-high admission; City
 *                                  Bus 100 or 206 to Gojozaka then about ten
 *                                  minutes on foot
 *   nijo-jocastle.city.kyoto.lg.jp 8:45–16:00 with a 17:00 close; ¥800 castle
 *                                  only, ¥1,300 with Ninomaru-goten, ¥400
 *                                  junior/senior high, ¥300 elementary, free
 *                                  below; ¥700 castle admission with a one-day
 *                                  subway ticket; Honmaru-goten ¥1,000 by advance
 *                                  web reservation; closed 29–31 December and
 *                                  Ninomaru-goten closed every Tuesday in
 *                                  January, July, August and December
 *   shokoku-ji.jp                  Kinkaku-ji 9:00–17:00; Ginkaku-ji's own
 *                                  revision notice — adult ¥500 to ¥1,000 and
 *                                  elementary/junior-high ¥300 to ¥500 from
 *                                  1 April 2026, preschool free
 *   city.kyoto.lg.jp               the flat ¥230 city-bus fare and the ¥1,100 /
 *   (Transportation Bureau)        ¥550 Subway & Bus 1-Day Pass and ¥800 / ¥400
 *                                  Subway 1-Day Pass — carried from our Kyoto
 *                                  guides, read 26 Oct 2026
 *   randen.keifuku.co.jp           the Randen flat ¥220 / ¥110 fare — same, read
 *                                  26 Oct 2026
 *   sagano-kanko.co.jp             the torokko's ¥880 adult / ¥440 child one-way
 *                                  fare — carried from our Sagano guide
 *
 * Deliberately absent: a Kinkaku-ji admission figure. The temple has a revision
 * notice posted on its own site and the amount on it is an image an automated
 * read cannot resolve, so no figure here would be reliable — the table says so
 * rather than guessing. Fushimi Inari carries no price because it charges none.
 *
 * The "time to allow" column is our own planning allowance and is labelled as
 * such. Nothing here is first-hand, and no Klook price appears anywhere: Klook
 * answers automated reads of its product pages with HTTP 403.
 */

/** Figures read off the official sites for this page. */
const OWN_ISO = "2026-10-29";
const OWN = checkedLabel(OWN_ISO);

/** Dates carried over from our own Kyoto guides. */
const KYOTO_CITY_CHECKED = checkedLabel("2026-10-26");
const SAGANO_CHECKED = checkedLabel("2026-10-25");

const KIYOMIZU_ADULT = "¥500";
const NIJO_ADULT = "¥1,300";
const GINKAKU_ADULT = "¥1,000";
const PASS_ADULT = "¥1,100";
const BUS_FARE = "¥230";

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
    time: "First light, before 7:00",
    place: "Fushimi Inari Taisha and the Senbon Torii gate paths",
    allow: "1 hour for the lower gates, 2–3 hours to the summit",
    getting: "JR Nara Line to JR Inari — about 9 minutes from Kyoto Station, and every rapid and local train stops",
    booking: "Nothing to book, and no admission — this is the one stop where the hour beats the plan",
  },
  {
    time: "Mid-morning",
    place: "Kiyomizu-dera, then the Sannenzaka and Ninenzaka lanes down from the gate",
    allow: "1 hour at the temple, 1 hour on the lanes",
    getting: "City Bus 100 or 206 to Gojozaka, then about 10 minutes on foot — the temple's own directions",
    booking: "No. Open from 6:00, so an early arrival is free and legal",
  },
  {
    time: "Lunch",
    place: "Nishiki Market, or the Gion end of Shijo",
    allow: "1–1.5 hours",
    getting: "Bus or the Keihan Line back west — Karasuma subway at Shijo if your base is central",
    booking: "No",
  },
  {
    time: "Early afternoon",
    place: "Nijo Castle and the Ninomaru-goten Palace",
    allow: "1.5–2 hours",
    getting: "Tozai subway line to Nijojo-mae, directly outside the gate",
    booking: "No, unless you want Honmaru-goten — that one is advance web reservation only",
  },
  {
    time: "Late afternoon",
    place: "Yasaka Shrine, Maruyama Park and the walk into Gion",
    allow: "1–1.5 hours",
    getting: "Tozai line east to Higashiyama, or the 100 bus back along the same route as the morning",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Hanamikoji and the Shirakawa lanes in Gion, then dinner in Pontocho",
    allow: "2–3 hours",
    getting: "On foot from Yasaka Shrine",
    booking: "Only if you want a guide — and the photography rules on the private lanes are worth knowing first",
  },
];

const day2: Stop[] = [
  {
    time: "From opening",
    place: "Arashiyama bamboo grove and Tenryu-ji, before the coaches",
    allow: "1.5–2 hours",
    getting: "JR Sagano Line Rapid to Saga-Arashiyama, about 11 minutes; board from the back of the platform",
    booking: "No, and no admission for the grove itself",
  },
  {
    time: "Late morning",
    place: "Togetsukyo bridge and the Katsura riverbank",
    allow: "45 minutes–1 hour",
    getting: "About 8 minutes on foot from Saga-Arashiyama, on the city's own figure",
    booking: "No",
  },
  {
    time: "Late morning or early afternoon",
    place: "Sagano Romantic Train through the Hozugawa gorge, and the boat back if you want the pairing",
    allow: "25 minutes on the torokko, half a day with the boat",
    getting: "Torokko Saga station is beside JR Saga-Arashiyama",
    booking: "Yes — a reserved car and seat, and the only reserved ride in these two days",
  },
  {
    time: "Lunch",
    place: "Arashiyama main street, or back east on the Randen",
    allow: "1 hour",
    getting: "Keifuku Randen from Arashiyama — a flat fare the whole line",
    booking: "No",
  },
  {
    time: "Mid-afternoon",
    place: "Kinkaku-ji, the Golden Pavilion",
    allow: "45 minutes–1 hour, and it is a one-way circuit",
    getting: "Karasuma subway to Kitaoji, about 15 minutes, then City Bus 204 or 205 — the city's own less-crowded route",
    booking: "No, but it closes at 17:00, which is the hard edge of Day 2",
  },
  {
    time: "Late afternoon",
    place: "Ginkaku-ji and the Philosopher's Path, or Ryoan-ji next door to Kinkaku-ji",
    allow: "1.5 hours including the walk",
    getting: "Bus across the north of the city, or back to the Karasuma line",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Kyoto Station's own architecture and the light show, or back to Pontocho",
    allow: "1.5–2 hours",
    getting: "Karasuma subway south, or JR if you are coming from Arashiyama",
    booking: "No",
  },
];

/** Admissions and hours, each against the operator's own site with the date read. */
const ticketRows = [
  {
    stop: "Fushimi Inari Taisha (Day 1)",
    price: "No admission charge",
    hours: "The gate paths are open and unstaffed outside shrine-office hours, which is why the dawn slot works",
    booking: "Not needed",
    note: "The one stop in two days where timing is the entire decision — the Senbon Torii fills from mid-morning and empties again after dark",
    source: `Kyoto City's own access page, ${OWN}`,
  },
  {
    stop: "Kiyomizu-dera (Day 1)",
    price: `${KIYOMIZU_ADULT} adult, ¥200 elementary and junior high`,
    hours: "6:00 open, 18:00 close (18:30 in July and August); 21:00 reception cut-off during the spring, summer and autumn night viewings",
    booking: "Not needed",
    note: "A 6:00 opening is the earliest of any major Kyoto temple, and the reason this itinerary's second stop is not its first",
    source: `kiyomizudera.or.jp, ${OWN}`,
  },
  {
    stop: "Nijo Castle (Day 1)",
    price: `¥800 castle only, ${NIJO_ADULT} with Ninomaru-goten Palace; ¥400 junior and senior high, ¥300 elementary, free below`,
    hours: "8:45–16:00, closing 17:00; closed 29–31 December, and Ninomaru-goten closed every Tuesday in January, July, August and December",
    booking: "Only for Honmaru-goten",
    note: "Castle admission drops to ¥700 if you hold a one-day subway ticket, and Honmaru-goten is ¥1,000 by advance web reservation only",
    source: `nijo-jocastle.city.kyoto.lg.jp, ${OWN}`,
  },
  {
    stop: "Arashiyama bamboo grove and Togetsukyo (Day 2)",
    price: "No admission charge for either",
    hours: "Open paths; Tenryu-ji beside the grove charges its own separate admission",
    booking: "Not needed",
    note: "The grove is a public path, which is exactly why it is unbearable at 11:00 and quiet at 8:00",
    source: `Kyoto City's own access page, ${OWN}`,
  },
  {
    stop: "Sagano Romantic Train (Day 2)",
    price: "¥880 adult, ¥440 child one way",
    hours: "A 7.3 km, 25-minute run; the line does not operate all year",
    booking: "Reserved car and seat",
    note: "The only reserved-seat ride in these two days. Our Sagano guide covers the season, the four car types and what happens when the train is not running",
    source: `the operator's own fare, ${SAGANO_CHECKED}`,
  },
  {
    stop: "Kinkaku-ji (Day 2)",
    price: "Published on the temple's own site; we do not quote a figure — see the note",
    hours: "9:00–17:00",
    booking: "Not needed",
    note: "The temple has an admission revision notice posted on shokoku-ji.jp and the amount on it is an image, so no figure we could publish would be verified. Confirm at the gate",
    source: `shokoku-ji.jp, ${OWN}`,
  },
  {
    stop: "Ginkaku-ji (Day 2 alternative)",
    price: `${GINKAKU_ADULT} adult from 1 April 2026, ¥500 elementary and junior high, preschool free`,
    hours: "Published on the temple's own site",
    booking: "Not needed",
    note: "The one Kyoto admission that doubled this year — the temple's own revision notice took the adult rate from ¥500 to ¥1,000 on 1 April 2026",
    source: `shokoku-ji.jp revision notice, ${OWN}`,
  },
  {
    stop: "Subway & Bus 1-Day Pass",
    price: `${PASS_ADULT} adult, ¥550 child (Subway 1-Day Pass ¥800 and ¥400)`,
    hours: "One calendar day",
    booking: "Not needed",
    note: `Flat city-bus fare is ${BUS_FARE} a ride, so about five rides break even — and the pass also knocks ¥100 off Nijo Castle admission`,
    source: `Kyoto City Transportation Bureau, ${KYOTO_CITY_CHECKED}`,
  },
  {
    stop: "Okoshi Bus “Kiyomizu-dera Line” (Day 1 alternative)",
    price: "¥1,500 adult, ¥1,000 child — one ride with a guide, Kiyomizu-dera admission included",
    hours: "1 July 2026 to 29 January 2027 (scheduled), weekdays only; not on weekends, public holidays, 13–14 August, 29–31 December or 4 January",
    booking: "Advance reservation and prepayment required",
    note: "Keihan Bus runs it between Kyoto Station, Keihan Shichijo-mae, Gojo-zaka and Nishi Hongwan-ji-mae — the one direct route from the station to the temple gate on a weekday",
    source: `kyoto.travel, ${OWN}`,
  },
  {
    stop: "Limited express bus EX100 / EX101 (Day 1 alternative)",
    price: "¥500 a ride",
    hours: "Weekends and public holidays",
    booking: "Not needed",
    note: `The weekend counterpart to the Okoshi route, and more than twice the flat ${BUS_FARE} fare — worth it precisely on the days the ordinary 100 and 206 buses are full`,
    source: `kyoto.travel, ${OWN}`,
  },
];

/** Where to stay for two days, with the condition each area carries. */
const stayRows = [
  {
    area: "Kyoto Station",
    door: "Tokaido Shinkansen, every Haruka from Kansai Airport, the Karasuma subway line, the JR Nara and Sagano lines, and the terminus of the 100 and 101 sightseeing buses",
    sights: "Fushimi Inari 10 min, Saga/Arashiyama 25 min, Higashiyama 35 min, Kinkaku-ji 40 min — the base all four are measured from",
    snag: "The evenings are the weakest of the four: Pontocho and Gion are a ride away rather than a walk",
    pick: "The default for two days. Both mornings start on a train rather than a bus, and the arrival and departure cost you nothing.",
  },
  {
    area: "Karasuma Oike / Shijo",
    door: "The one crossing of the Karasuma and Tozai subway lines, plus Hankyu Kyoto-Kawaramachi and Keihan Sanjo for Osaka",
    sights: "Both subway lines from the door, so neither the Nijo Castle afternoon nor the Higashiyama walk starts with a trip back to Kyoto Station",
    snag: "Not on the JR network, so Arashiyama and Fushimi Inari both need a change",
    pick: "If you want the Gion and Pontocho evening on foot — which on a two-day trip is most people.",
  },
  {
    area: "Gion / Higashiyama",
    door: "The 100 bus from Kyoto Station, the Tozai line at Higashiyama and Sanjo-Keihan, and Keihan at Gion-Shijo",
    sights: "Kiyomizu-dera from its 6:00 opening on foot, and the Sannenzaka lanes before any coach arrives",
    snag: "The furthest of the four from the shinkansen platforms, with a bus or two changes at each end",
    pick: "If an empty Kiyomizu-dera at dawn is the picture you came for. Nothing else buys that.",
  },
  {
    area: "Arashiyama",
    door: "JR Sagano Line and the Keifuku Randen — neither the city buses nor the two subway lines reach it",
    sights: "The bamboo grove and Togetsukyo on foot, before the day-trippers; everything else is a journey",
    snag: "Kyoto City puts Saga/Arashiyama 25 minutes from Kyoto Station, which is a long way to carry cases for two nights",
    pick: "Three nights or more. On two, it costs you more in crossings than the empty grove is worth.",
  },
];

/** Long-distance and airport access, operators' and official bodies' own figures. */
const accessRows = [
  {
    route: "Tokyo → Kyoto, Tokaido Shinkansen",
    time: "Approx. 130 min on Nozomi, 170 min on Hikari",
    fare: "By date and seat class — non-reserved, reserved and Green Car",
    note: `The official Kyoto travel guide's own figures, read ${OWN}. Nozomi is not covered by the nationwide JR Pass, which is the single fact that decides whether a pass helps you here.`,
  },
  {
    route: "Osaka Station → Kyoto Station, JR Special Rapid",
    time: "Approx. 30 min",
    fare: "Ordinary fare, nothing reserved",
    note: `kyoto.travel's own figure, read ${OWN}. The cheapest way in from an Osaka base, with nothing to book and no reason to buy a pass for the hop alone.`,
  },
  {
    route: "Osaka-umeda → Kyoto-Kawaramachi, Hankyu",
    time: "Approx. 45 min",
    fare: "Ordinary fare",
    note: `Also kyoto.travel, read ${OWN}. Lands you at Shijo rather than at Kyoto Station, which is the better end of the city if your base is central.`,
  },
  {
    route: "Kansai Airport → Kyoto, JR Haruka",
    time: "Direct, no transfer",
    fare: "JR West's discounted one-way for foreign passport holders entering as temporary visitors goes ¥2,200 → ¥2,700 from 1 November 2026",
    note: "JR West's own published increase, read 27 October 2026 for our Osaka itinerary. If your trip straddles that date, the inbound and outbound tickets are not the same price.",
  },
  {
    route: "Kyoto Station → JR Inari (Fushimi Inari)",
    time: "About 9 minutes",
    fare: "Ordinary JR fare",
    note: `All Miyakoji Rapid, Regional Rapid and local trains stop at JR Inari. Kyoto City's own guide advises against City Bus South No. 5 for this trip — it records timing variations of more than 24 minutes. Read ${OWN}.`,
  },
  {
    route: "Kyoto Station → Saga-Arashiyama, JR Sagano Line",
    time: "About 11 minutes by Rapid",
    fare: "Ordinary JR fare",
    note: `Both Rapid and local trains stop. The city's advice: the Sagano platform is a walk from the main concourse, the front cars fill first so board from the back, and it is about 8 minutes on foot from the station to Togetsukyo. Read ${OWN}.`,
  },
];

const bookingWindow = [
  {
    title: "Weeks ahead — the Sagano Romantic Train, if Day 2 includes it",
    desc: "The only reserved-seat ride in these two days: a specific car and seat on a line that does not run all year. It is also the one thing a rained-off morning cannot be moved around, so check the season before you build the day on it.",
  },
  {
    title: "A week or two ahead — a kimono dressing slot and a tea ceremony",
    desc: "These are appointments, not tickets. Kyoto's kimono shops take a dressing time and hand the outfit back on a deadline — the Yumeyakata listing asks for a same-day return by 17:30 — which means the kimono day has to be the day with no evening train in it.",
  },
  {
    title: "The night before — the Okoshi Bus Kiyomizu-dera Line, on a weekday",
    desc: "Keihan Bus's direct Kyoto Station to Gojo-zaka route needs advance reservation and prepayment, and it does not run at weekends or on public holidays. On a weekend the ¥500 EX100 and EX101 limited express buses need nothing at all.",
  },
  {
    title: "Nothing at all — Fushimi Inari, Kiyomizu-dera, Nijo Castle, Arashiyama, Kinkaku-ji",
    desc: "Five of the six headline stops in these two days are walk-up, and one of them charges nothing. That is the real difference between planning Kyoto and planning Tokyo: here the scarce resource is the early hour, not the ticket.",
  },
];

const faqItems = [
  {
    q: "Is 2 days enough for Kyoto?",
    a: `Enough for the four sights most people come for, and not enough for a fifth side of the city. Kyoto's headline stops sit on four different compass points — Fushimi Inari to the south, Kiyomizu-dera and Gion east, Arashiyama west, Kinkaku-ji north-west — and Kyoto City's own figures from Kyoto Station are 10, 35, 25 and 40 minutes respectively. Two days absorbs that if, and only if, each day takes one side and its neighbour: south-and-east on Day 1, west-and-north on Day 2. What two days will not hold is Nara as well, or Uji, or a second temple district like Ohara. Those are a third day, not an afternoon. Journey times read on ${OWN}.`,
  },
  {
    q: "What should I do on my first day in Kyoto?",
    a: `Start at Fushimi Inari before 7:00, then work north-east. The order matters because exactly one stop in two days is ruined by arriving at a sensible hour: the Senbon Torii gate paths are free, unticketed and open, and they fill from mid-morning. From JR Inari — about 9 minutes from Kyoto Station on the Nara Line — go on to Kiyomizu-dera, which opens at 6:00 and costs ${KIYOMIZU_ADULT} for an adult, and walk down the Sannenzaka and Ninenzaka lanes. Lunch at Nishiki Market, Nijo Castle in the early afternoon (${NIJO_ADULT} with the Ninomaru-goten Palace, last entry 16:00), then Yasaka Shrine and Gion for the evening. All figures off the operators' own sites, read ${OWN}.`,
  },
  {
    q: "Where should I stay in Kyoto for 2 days?",
    a: `Kyoto Station or Karasuma Oike, and the choice between them is about evenings. Kyoto Station is where the shinkansen and every airport Haruka arrive, where the 100 and 101 sightseeing buses start, and the only base from which all four sights are reachable without crossing the city first — but the evening in Pontocho and Gion is a ride away. Karasuma Oike and Shijo sit on the one crossing of the two subway lines with Nishiki Market and Pontocho on foot, which is worth more on a two-day trip than ten minutes off a morning. Gion earns its place only if an empty Kiyomizu-dera at 6:00 is the reason you came. Arashiyama is 25 minutes out on the city's own figure — a three-night base, not a two-night one.`,
  },
  {
    q: "How do I get around Kyoto in 2 days?",
    a: `Trains where they exist, buses only where they do not. This is the opposite of the usual advice and it comes from Kyoto City's own guidance: it names JR for Fushimi Inari (about 9 minutes, all rapids stop at JR Inari) and for Arashiyama (about 11 minutes by Sagano Line Rapid), the Karasuma subway plus City Bus 204 or 205 for Kinkaku-ji, and it explicitly advises against City Bus South No. 5 to Fushimi Inari — it records timing variations of more than 24 minutes — and against the bus to Arashiyama. Where buses are unavoidable, the flat fare is ${BUS_FARE} and the Subway & Bus 1-Day Pass is ${PASS_ADULT} adult and ¥550 child, so roughly five rides break even; it also takes ¥100 off Nijo Castle. Transport figures read ${KYOTO_CITY_CHECKED}, routing advice ${OWN}.`,
  },
  {
    q: "When is Fushimi Inari least crowded?",
    a: `First light and after dark, and this is the single most useful sentence in any Kyoto itinerary. The shrine charges no admission and the mountain paths are not gated, so there is no opening time to wait for — which means the crowd, not the clock, is the constraint. The Senbon Torii fills from mid-morning and stays full through the afternoon; the same gates at 6:30 are effectively empty, and the hike up Mount Inari sheds most of the remaining visitors within twenty minutes of climbing. Get there on the JR Nara Line rather than the bus: Kyoto City's own guide puts JR Inari about 9 minutes from Kyoto Station with every rapid stopping, and warns off City Bus South No. 5.`,
  },
  {
    q: "Should I book tours in Kyoto in advance?",
    a: `Only three things in two Kyoto days need booking, and none of them is a temple. The Sagano Romantic Train is a reserved car and seat on a line that does not run all year — ¥880 adult and ¥440 child one way. A kimono dressing slot is an appointment, and the shop's return deadline (17:30 on the Yumeyakata listing) is what decides which day it goes on. And the Okoshi Bus "Kiyomizu-dera Line", which is the one direct Kyoto Station to Gojo-zaka route, needs advance reservation and prepayment and runs weekdays only, 1 July 2026 to 29 January 2027 as scheduled, at ¥1,500 adult with Kiyomizu-dera admission included. A guided day is the other thing worth buying, and it is bought for a reason specific to Kyoto: it does the four-compass-points routing instead of your legs.`,
  },
  {
    q: "What does a 2 day Kyoto itinerary cost in admissions?",
    a: `Less than almost any other Japanese city of this size, because two of the six headline stops are free. Day 1 is ${KIYOMIZU_ADULT} for Kiyomizu-dera and ${NIJO_ADULT} for Nijo Castle with the Ninomaru-goten Palace, so ¥1,800 for an adult, and Fushimi Inari charges nothing. Day 2 is the torokko at ¥880 one way if you take it, Kinkaku-ji's own admission (the temple has a revision notice posted and the amount on it is an image we cannot read, so we quote no figure), and nothing for the bamboo grove or Togetsukyo. Add the ${PASS_ADULT} Subway & Bus 1-Day Pass if your day is bus-heavy. Sources and the date each figure was read are in the table above.`,
  },
  {
    q: "Which day should the kimono day be?",
    a: `Day 1, in Gion or Higashiyama — and the reason is the return deadline rather than the photographs. Kyoto's rental shops hand the outfit back on a clock: the Yumeyakata listing asks for a same-day return by 17:30, with next-day and postal returns available for a fee. That rules out Day 2 in this itinerary, which ends in Arashiyama or north Kyoto with a train in it. Day 1's afternoon is a loop through Higashiyama and Gion that comes back past the same few streets, which is exactly the shape a 17:30 deadline wants. If the kimono day has to be an Arashiyama day, book a shop in Arashiyama rather than one in Gion — our Kyoto kimono rental guide splits the shops by area for that reason.`,
  },
  {
    q: "Can you add Nara or Osaka to a 2 day Kyoto trip?",
    a: `Not without giving up one of the two days, and that is the honest trade. Nara is about 45 minutes from Kyoto on the JR Nara Line or the Kintetsu limited express, and Osaka Station is approximately 30 minutes on the JR Special Rapid on kyoto.travel's own figure — so both are easy, and both are a whole day once you are there. Dropping Day 2 for Nara costs you Arashiyama and Kinkaku-ji, which is most of what two days in Kyoto is for. With three or four days the arithmetic flips completely and a day trip becomes the best thing you can add. Our seven and ten-day itineraries build Kyoto in as a two-night leg with Nara beside it.`,
  },
  {
    q: "Is Kyoto walkable, or do you need a pass?",
    a: `Each district is walkable; the gaps between them are the whole problem. Day 1's Kiyomizu-dera to Gion stretch is one continuous walk through Sannenzaka, Ninenzaka and Maruyama Park, and Day 2's bamboo grove to Togetsukyo is about 8 minutes on the city's own figure. What needs transport is the four or five hops between districts — and because Kyoto City itself steers visitors onto trains for three of them, a bus pass is less automatic here than people expect. The ${PASS_ADULT} Subway & Bus 1-Day Pass breaks even at about five ${BUS_FARE} rides and discounts Nijo Castle by ¥100; a day that uses JR for Fushimi Inari and Arashiyama may not reach five bus rides at all. Our Kyoto Subway & Bus Pass guide works the break-even through properly.`,
  },
  {
    q: "Does this itinerary work in the rain, or with children?",
    a: `Both, with one swap each way. For rain, Day 1 holds up better than Day 2: Nijo Castle's Ninomaru-goten Palace is indoors, Nishiki Market is a covered arcade, and Kiyomizu-dera's veranda and the Sannenzaka lanes are atmospheric wet. What rain takes away is the Fushimi Inari dawn — the mountain paths are steep, stepped and slippery — and the open deck of the Sagano torokko. For children, the lower Fushimi Inari gates are a short, flat, free walk; the torokko is a 25-minute train ride at ¥440 for a child; and the child fare on the Subway & Bus 1-Day Pass is ¥550 against a ${BUS_FARE} flat ride. Nijo Castle is free below elementary school age and ¥300 for elementary pupils.`,
  },
  {
    q: "What is the best order for two days in Kyoto?",
    a: `South-and-east first, west-and-north second — and not the other way round. Three reasons. Fushimi Inari has to be at dawn, and dawn on your first morning is the one you will actually be awake for after a shinkansen. Kiyomizu-dera opens at 6:00, earlier than any other major temple here, so it absorbs the rest of the early morning that Fushimi Inari does not use. And Day 2's hard edge is Kinkaku-ji's 17:00 close, which a day that starts in Arashiyama can meet comfortably — whereas a Day 2 that starts in Higashiyama and ends in the north-west cannot. The order is the itinerary; the list of sights is the easy part.`,
  },
];

const TITLE = "Kyoto 2 Day Itinerary (2026): Day by Day, and Bookings";
const DESCRIPTION =
  "A Kyoto 2 day itinerary routed by the city's own travel times: Fushimi Inari at dawn and Kiyomizu-dera ¥500 on Day 1, Arashiyama and Kinkaku-ji on Day 2.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/kyoto-2-day-itinerary") },
});

export default function Kyoto2DayItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kyoto-2-day-itinerary" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kyoto-2-day-itinerary" />
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
              route: "/guides/attractions/kyoto-2-day-itinerary",
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
                  name: "Kyoto 2 Day Itinerary",
                  item: "https://www.japan-travel-kit.com/guides/attractions/kyoto-2-day-itinerary",
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
          <span className={styles.breadCurrent}>Kyoto 2 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kyoto 2 Day Itinerary (2026):<br />Day by Day, and What to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Four famous sights on four sides of one city. Almost nothing needs a ticket — which means the
            order, and one early morning, are the whole plan.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices & hours, dated", "A table for each day", "Routed on the city's own times"].map((t) => (
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
                <p className={styles.verdictStatValue}>Fushimi Inari, Kiyomizu-dera, Nijo, Gion</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Arashiyama, the torokko, Kinkaku-ji</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 1 admissions</p>
                <p className={styles.verdictStatValue}>¥1,800 adult; Fushimi Inari free</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Must book ahead</p>
                <p className={styles.verdictStatValue}>Only the Sagano torokko seat</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              A workable <strong>Kyoto 2 day itinerary</strong> gives each day one half of the compass.{" "}
              <strong>Day 1</strong> runs south then east: <strong>Fushimi Inari Taisha before 7:00</strong>{" "}
              (free, ungated, and about <strong>9 minutes</strong> from Kyoto Station on the JR Nara Line),
              then <strong>Kiyomizu-dera</strong> — open from <strong>6:00</strong>, <strong>{KIYOMIZU_ADULT}</strong>{" "}
              for an adult — and the Sannenzaka lanes, lunch at Nishiki Market,{" "}
              <strong>Nijo Castle</strong> ({NIJO_ADULT} with the Ninomaru-goten Palace, last entry 16:00), and
              Gion in the evening. <strong>Day 2</strong> runs west then north: the{" "}
              <strong>Arashiyama bamboo grove</strong> at opening (<strong>11 minutes</strong> by JR Sagano
              Line Rapid), Togetsukyo, the <strong>Sagano Romantic Train</strong> at ¥880 one way, then{" "}
              <strong>Kinkaku-ji</strong>, which closes at <strong>17:00</strong> and is the hard edge of the
              day. Kyoto City&apos;s own travel times from Kyoto Station are 10, 35, 25 and 40 minutes to
              those four sights — which is why the order, not the list, is the plan. Exactly one thing needs
              booking: the torokko seat. Figures read off the official sites on {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kyotoHighlightBusTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Both Days as One Guided Day →
              </KlookLink>
              <KlookLink href={saganoHozugawaGuaranteedTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Sagano Train &amp; River Boat →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Should You Split Two Days in Kyoto?</h2>
          <p className={styles.bodyText}>
            Into a south-and-east day and a west-and-north day. Kyoto&apos;s famous sights are not clustered
            the way Osaka&apos;s are — they sit on four different compass points, and the Kyoto City Tourism
            Association&apos;s own travel times from Kyoto Station say so plainly:{" "}
            <strong>Fushimi Inari 10 minutes</strong> to the south, <strong>Higashiyama 35</strong> for
            Kiyomizu-dera in the east, <strong>Saga/Arashiyama 25</strong> in the west and{" "}
            <strong>Kinkaku-ji 40</strong> in the north-west. Any plan that mixes them crosses the city four
            times; a plan that pairs neighbours crosses it twice.
          </p>
          <p className={styles.bodyText}>
            This guide is about that order and the few bookings inside it, which is what separates it from the
            other Kyoto pages here. Our{" "}
            <Link href="/guides/attractions/things-to-do-kyoto">things to do in Kyoto guide</Link> is the
            city-wide list of what exists, our{" "}
            <Link href="/guides/attractions/where-to-stay-in-kyoto">where to stay in Kyoto guide</Link>{" "}
            compares the areas on the lines under them, and our{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto guide</Link> explains the
            buses and the two subway lines. Here, each day carries its own table — time of day, where, how
            long to allow, how you get there, and whether it needs booking — with the Klook listings for that
            day&apos;s bookings directly underneath it.
          </p>
          <p className={styles.bodyText}>
            One thing decides the quality of the whole itinerary, so settle it first:{" "}
            <strong>are you willing to be at Fushimi Inari before 7:00?</strong> It is the only stop in two
            days where the hour, not the ticket, is the scarce resource — the gate paths are free and
            ungated, and they are full from mid-morning until dark. If the answer is no, put Fushimi Inari
            after sunset instead and accept that you will not photograph the gates in daylight without
            company.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>Day 1 — Fushimi Inari, Kiyomizu-dera, Nijo Castle and Gion</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            South at dawn, then a long arc north-east and back west. Day 1 goes first because it contains both
            of Kyoto&apos;s early-morning opportunities and neither of its reserved seats: Fushimi Inari has
            no gate to open and Kiyomizu-dera opens at <strong>6:00</strong>, earlier than any other major
            temple in the city. Get both before 10:00 and the rest of the day is unhurried.
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
            <strong>What to book for Day 1.</strong> Almost nothing, and that is the point — but three things
            are worth holding. A <strong>kimono dressing slot</strong>, if you want one, because Day 1&apos;s
            Higashiyama-and-Gion loop is the only day in this itinerary that comes back past the same streets
            before the shop&apos;s return deadline. The <strong>Gion evening</strong>, if you would rather be
            walked through it: the private lanes around Hanamikoji now carry photography restrictions, and a
            guide is the cheapest way to not be the reason for them. And the{" "}
            <strong>Fushimi Inari walk</strong>, if a 6:30 start is more likely to happen with someone
            expecting you. Our{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental">Kyoto kimono rental guide</Link> splits the
            shops by area and return deadline.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoFushimiInariWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Fushimi Inari walking tour →
            </KlookLink>
            <KlookLink href={kyotoGionNightWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Gion night walk →
            </KlookLink>
            <KlookLink href={kyotoKimonoAiwafukuKiyomizu.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kiyomizu kimono rental →
            </KlookLink>
          </div>
        </section>

        {/* Day 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>Day 2 — Arashiyama, the Sagano Train and Kinkaku-ji</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            West at opening, north-west by mid-afternoon. Day 2 has a hard edge that Day 1 does not:{" "}
            <strong>Kinkaku-ji closes at 17:00</strong>, and it is 40 minutes from Kyoto Station on the
            city&apos;s own figure. Everything before it is therefore paced backwards from that — which is
            also why the bamboo grove has to be the first thing you do rather than the thing you fit in.
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
            <strong>What to book for Day 2.</strong> The <strong>Sagano Romantic Train</strong>, and only
            that. It is a reserved car and seat at ¥880 adult and ¥440 child one way, on a line that does not
            run all year — so it is both the one scarce thing in two Kyoto days and the one thing a wet
            morning cannot be rearranged around. If you want the classic pairing, the torokko one way and the
            Hozugawa river boat back down to Arashiyama is sold as a single guaranteed-departure day. Kinkaku-ji,
            the grove and Togetsukyo need nothing at all. Details in our{" "}
            <Link href="/guides/attractions/sagano-romantic-train-tickets">Sagano Romantic Train guide</Link>,
            which covers the season, the four car types and what to do when the train is not running.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={saganoHozugawaGuaranteedTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Sagano train &amp; river boat day →
            </KlookLink>
            <KlookLink href={saganoRomanticTrainTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Torokko ticket only →
            </KlookLink>
            <KlookLink href={kyotoKimonoOokiniArashiyama.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Arashiyama kimono rental →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The &ldquo;time to allow&rdquo; column in both tables is our own planning allowance, not an
            operator figure. Opening hours and admissions are in the dated table below, each against the
            operator&apos;s own site.
          </p>
        </section>

        {/* Prices and hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; hours</span>
          <h2 className={styles.sectionTitle}>What Does a Kyoto 2 Day Itinerary Cost in Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ¥1,800 of admissions on Day 1 for one adult, and two of the six headline stops charge nothing at
            all. That is the real difference between Kyoto and the other two big cities on this site: the
            money goes on transport rather than on gates. Every figure below is the operator&apos;s own
            published price, with the site it came from and the date it was read.
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
            Subject to change — confirm at the gate. The Kiyomizu-dera, Nijo Castle, Kinkaku-ji, Ginkaku-ji
            and bus rows were read off kiyomizudera.or.jp, nijo-jocastle.city.kyoto.lg.jp, shokoku-ji.jp and
            kyoto.travel on {OWN}; the city-bus fare, the two day passes and the torokko fare carry the dates
            from our own Kyoto guides. The same temple and pass figures appear with the same dates in the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>{" "}
            where that table carries them. No Klook price appears anywhere on this page: Klook answers
            automated reads of its product pages with an error, so no figure from it could be verified.
          </p>
        </section>

        {/* Booking window */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>Should You Book Tours in Kyoto in Advance?</h2>
          <p className={styles.bodyText}>
            Three things, and none of them is a temple. Here is the whole itinerary sorted by how far ahead
            each thing has to be bought — which, after planning Tokyo, is a surprisingly short list.
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
            Cancellation matters more on two days than on a week, because there is no spare day to move a
            rained-off torokko or a missed dressing slot into. Check the cancellation window on whichever
            route you book the Sagano train and the kimono appointment, since those are the two with a date
            and a time locked into them — and note that the Okoshi Bus route is prepaid. Everything else here
            is walk-up and carries no risk at all.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={saganoHozugawaGuaranteedTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Sagano day on Klook →
            </KlookLink>
            <KlookLink href={kyotoKimonoYumeyakata.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kimono dressing slot →
            </KlookLink>
            <KlookLink href={kyotoHighlightBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Guided four-sight day →
            </KlookLink>
          </div>
        </section>

        {/* Getting around */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>How Do You Get Around Kyoto in 2 Days?</h2>
          <p className={styles.bodyText}>
            On trains where they exist, and on buses only where they do not. This runs against the usual
            advice, and it comes from Kyoto City&apos;s own guidance rather than from us. Its access pages
            name <strong>JR for Fushimi Inari</strong> — the Nara Line, about 9 minutes to JR Inari, with
            every Miyakoji Rapid, Regional Rapid and local train stopping — and{" "}
            <strong>JR for Arashiyama</strong>, about 11 minutes by Sagano Line Rapid to Saga-Arashiyama. For
            Kinkaku-ji it names the <strong>Karasuma subway to Kitaoji</strong>, about 15 minutes, then City
            Bus 204 or 205, and calls that the less-crowded route.
          </p>
          <p className={styles.bodyText}>
            More useful still is what it tells you to avoid. The city&apos;s Fushimi page advises against{" "}
            <strong>City Bus South No. 5</strong>, noting timing variations of more than 24 minutes, and its
            Arashiyama page discourages the bus from Kyoto Station altogether as crowded and time-consuming.
            It also offers two paid shortcuts to the Kiyomizu-dera end of town that most itineraries miss:
            the <strong>EX100 and EX101 limited express buses</strong> at ¥500 a ride on weekends and public
            holidays, and Keihan Bus&apos;s <strong>Okoshi Bus &ldquo;Kiyomizu-dera Line&rdquo;</strong>,
            running weekdays only from 1 July 2026 to 29 January 2027 as scheduled, at ¥1,500 for an adult
            with the temple admission included and advance prepayment required.
          </p>
          <p className={styles.bodyText}>
            That changes the pass arithmetic. The Kyoto City Transportation Bureau&apos;s{" "}
            <strong>Subway &amp; Bus 1-Day Pass is {PASS_ADULT}</strong> for an adult and ¥550 for a child,
            with a Subway 1-Day Pass at ¥800 and ¥400, against a flat city-bus fare of{" "}
            <strong>{BUS_FARE}</strong> — so roughly five rides break even, and the pass also takes ¥100 off
            Nijo Castle admission. But a day that uses JR for Fushimi Inari and JR for Arashiyama may never
            reach five bus rides, and neither pass covers JR or the Keifuku Randen, which is a flat ¥220 adult
            and ¥110 child for the whole line. Pass and fare figures read {KYOTO_CITY_CHECKED}; routing advice
            read {OWN}. Our{" "}
            <Link href="/guides/transport/kyoto-subway-bus-pass">Kyoto Subway &amp; Bus Pass guide</Link>{" "}
            works the break-even through ride by ride.
          </p>
        </section>

        {/* Where to stay */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay in Kyoto for 2 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            On two days the base is a time question, not a comfort one: every crossing you make with luggage
            comes out of the sightseeing, and Kyoto makes you cross more than Osaka or Tokyo would. These are
            the four areas this itinerary actually touches, with what is at the door and what each one costs
            you.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Lines at the door", "What it does for the four sights", "The catch", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stayRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sights}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snag}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            We publish no room rates, because none can be verified — availability and price are per-hotel and
            per-date. The travel times are the Kyoto City Tourism Association&apos;s own, read on {OWN}. One
            thing to budget for that is not the room: Kyoto&apos;s lodging tax has been banded since{" "}
            <strong>1 March 2026</strong>, from ¥200 a person a night under ¥6,000 to ¥10,000 at ¥100,000 and
            over. Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-kyoto" style={{ color: "var(--text)", fontWeight: 600 }}>
              where to stay in Kyoto guide
            </Link>{" "}
            carries the full band table and compares the same four areas on the airport routes.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for the Four Areas Above"
          intro="Which rooms are left and at what price is a per-date question, so each area links into Klook's own hotel search for it. On two days the thing to compare is not the nightly rate but how many city crossings the location saves you — which is what the why line on each one is about."
          areas={kyotoTwoDayStayAreas}
        />

        {/* Getting to Kyoto */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Kyoto From Tokyo, Osaka or Kansai Airport?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Two days in Kyoto is almost always two days inside a longer trip, so the arrival is usually a
            shinkansen from Tokyo, a half-hour hop from Osaka, or the Haruka from Kansai. Every figure below
            is the operator&apos;s or the official tourism body&apos;s own published number.
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
            Two things on this table are date-sensitive rather than fixed. The <strong>Haruka</strong>{" "}
            discounted one-way to Kyoto rises from ¥2,200 to ¥2,700 on{" "}
            <strong>1 November 2026</strong> on JR West&apos;s own announcement, so a trip straddling that
            date pays two different prices for the same journey. And the nationwide{" "}
            <strong>JR Pass does not cover Nozomi</strong>, which is the fast Tokyo–Kyoto service — on a
            two-day Kyoto stop inside a wider trip, that is usually the fact that decides whether a pass is
            worth it at all. Our{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link> compares the trains and
            the fares, and our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> runs the break-even against
            point-to-point tickets.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kyoto shinkansen →
            </KlookLink>
            <KlookLink href={jrKansaiAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR-West Kansai Rail Pass →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            One more arrival-day booking that is not transport: data. Kyoto&apos;s buses are flat-fare and
            pay-on-exit, the city itself tells you to avoid two specific routes, and every &ldquo;getting
            there&rdquo; column above assumes you can open a map and a timetable.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it against
            the alternatives.
          </p>
        </section>

        {/* Trip prep: the bookings outside the two days */}
        <KlookTripPrep
          label="Before you go"
          heading="What Should You Book Before a Two-Day Kyoto Stop?"
          intro="Five bookings sit outside the two days themselves: how you arrive, the regional pass to price against your route, the one experience that is an appointment rather than a ticket, the reserved-seat ride on Day 2, and data. Klook blocks automated price reads, so open a listing for the figure on your dates."
          items={kyotoTwoDayTripPrep}
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

        {/* Klook tours in the same city */}
        <KlookTourPicks
          heading="If You Would Rather Not Route Either Day Yourself"
          intro="The first listing is the closest thing to this whole guide in one booking — Kiyomizu-dera, Kinkaku-ji, Fushimi Inari and the Arashiyama bamboo grove in a single guided day, which is exactly the four-compass-points problem solved by a coach. The other three are the hours this itinerary singles out: the dawn gates, the Gion evening, and the torokko with the river boat."
          tours={[kyotoHighlightBusTour, kyotoFushimiInariWalkingTour, kyotoGionNightWalkingTour, saganoHozugawaGuaranteedTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
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
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Subway and the Day Passes</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sagano-romantic-train-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sagano Romantic Train Tickets (2026): ¥880, the Season and How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 3 4-3 2 5-3 2v11H9V10L6 8z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Kimono Rental (2026): Shops by Area, Prices and Return Deadlines</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-kyoto-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r="1.5" />
                  <circle cx="17.5" cy="10.5" r="1.5" />
                  <circle cx="8.5" cy="7.5" r="1.5" />
                  <circle cx="6.5" cy="12.5" r="1.5" />
                  <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Kyoto Tickets: Prices, Hours &amp; Booking</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/transport/tokyo-to-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kyoto (2026): Shinkansen Times, Fares and Which Train</p>
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
            <h2 className={styles.ctaBannerTitle}>Two days, four compass points, one early alarm</h2>
            <p className={styles.ctaBannerDesc}>
              Book the torokko seat, set the alarm for Fushimi Inari, and leave everything else walk-up. If
              you would rather hand the routing to a guide, Kiyomizu-dera, Kinkaku-ji, Fushimi Inari and the
              bamboo grove are sold as one day.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kyotoHighlightBusTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Guided Kyoto Day →
              </KlookLink>
              <KlookLink href={saganoHozugawaGuaranteedTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Sagano Train Day →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
