import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  asakusaKimonoYae,
  hakoneFreepass,
  hanedaLimousineBus,
  kamakuraEnoshimaDayTourUrl,
  kawaguchikoYamanakakoBusTour,
  klookEsim,
  mtFujiPass,
  naritaLimousineBus,
  shibuyaSkyTicketUrl,
  shinkansenTokyoKyoto,
  skytreeTicket,
  teamlabPlanetsTicketUrl,
  tokyoBaySunsetBoatCruise,
  tokyoFiveDayStayAreas,
  tokyoMtFujiHighwayBus,
  tokyoSubwayTicket,
  tokyoTowerTicket,
  tsukijiCultureFoodTour,
} from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygFujiFromTokyo, gygShibuyaSky, gygTeamlabPlanets, gygTokyo } from "../../../lib/gyg-links";

/**
 * A five-day Tokyo itinerary: three city days plus two day trips, written as a
 * booking plan rather than a list of sights.
 *
 * Deliberately not a longer tokyo-3-day-itinerary. That page splits the city into
 * west / east / centre and stops there; this one spends the extra room on the
 * districts three days has to drop (Nakameguro, Ueno and Yanaka, Odaiba and the
 * bay) and on the two day trips a three-day trip cannot afford — Kawaguchiko and
 * Kamakura. Neither page repeats the other's tables.
 *
 * Every price, opening hour and journey time below is either read out of
 * lib/attraction-prices.ts — which carries the operator and the date each figure
 * was checked — or verified against the operator's own site on 23 Oct 2026 and
 * dated in the tables:
 *
 *   bus.fujikyu.co.jp      Shinjuku–Kawaguchiko highway bus, time and fares
 *   timetables.jreast.co.jp JR Yokosuka Line, Kamakura 07:02 → Tokyo 08:01
 *   odakyu-global.com      Romancecar time, Freepass prices, the LEX surcharge
 *   global.jr-central.co.jp Tokaido Shinkansen Tokyo–Kyoto, "about 130 minutes"
 *   tnm.jp                 Tokyo National Museum admission, hours, closed days
 *   tokyo-park.or.jp       Hama-rikyu Gardens admission and hours
 *
 * The "time to allow" column is our own planning allowance and is labelled as
 * such; it is not an operator figure. No Klook price appears anywhere: Klook
 * answers automated reads of its product pages with HTTP 403.
 */

/** The date the figures not already dated in lib/attraction-prices.ts were read. */
const CHECKED_ISO = "2026-10-23";
const CHECKED = checkedLabel(CHECKED_ISO);

/** Senso-ji's published hours, carried over from the 21 Oct 2026 read on senso-ji.jp. */
const SENSOJI_CHECKED = checkedLabel("2026-10-21");

/** Kawaguchiko's local bus pass, from the 21 Oct 2026 read on the Fujikyu bus site. */
const FUJIKYU_LOCAL_CHECKED = checkedLabel("2026-10-21");

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
    time: "Morning, from opening",
    place: "Meiji Jingu and the Harajuku approach",
    allow: "1–1.5 hours",
    getting: "JR Yamanote Line to Harajuku; the shrine entrance is beside the station",
    booking: "No ticket — free, and open sunrise to sunset",
  },
  {
    time: "Late morning",
    place: "Omotesando and Cat Street, walking south",
    allow: "1.5 hours",
    getting: "On foot from the shrine",
    booking: "No",
  },
  {
    time: "Early afternoon",
    place: "Daikanyama and the Meguro River at Nakameguro",
    allow: "2 hours",
    getting: "Tokyu Toyoko Line, one or two stops from Shibuya",
    booking: "No",
  },
  {
    time: "Mid-afternoon",
    place: "Shibuya Scramble Crossing, Hachiko and the backstreets",
    allow: "1.5 hours",
    getting: "Toyoko Line back up to Shibuya",
    booking: "No",
  },
  {
    time: "Late afternoon / sunset",
    place: "SHIBUYA SKY, on top of Shibuya Scramble Square",
    allow: "1–1.5 hours",
    getting: "The entrance is inside the station building",
    booking: "Yes — a timed slot, and sunset is the one that sells out",
  },
  {
    time: "Evening",
    place: "Shinjuku — Omoide Yokocho and the Kabukicho izakaya streets",
    allow: "2–3 hours",
    getting: "Yamanote Line from Shibuya",
    booking: "No, unless you want a guided crawl",
  },
];

const day2: Stop[] = [
  {
    time: "Early morning",
    place: "Senso-ji and Nakamise-dori, Asakusa",
    allow: "1.5 hours",
    getting: "Ginza Line or Toei Asakusa Line to Asakusa",
    booking: "No ticket — the main hall opens 06:00 (06:30 October–March)",
  },
  {
    time: "Mid-morning",
    place: "Kimono or yukata rental, then the temple lanes and the Sumida riverside",
    allow: "3–4 hours, including the dressing appointment",
    getting: "The shops are a few minutes on foot from Kaminarimon",
    booking: "Yes — the shop takes a slot, and the outfit is due back the same day",
  },
  {
    time: "Early afternoon",
    place: "TOKYO SKYTREE and Solamachi (optional — skip it if you would rather have the time)",
    allow: "2 hours",
    getting: "One stop on the Tobu Skytree Line from Asakusa, or about 20 minutes on foot",
    booking: "Advised — the same-day counter adds a service fee per ticket",
  },
  {
    time: "Mid-afternoon",
    place: "Ueno Park and the Tokyo National Museum",
    allow: "2–2.5 hours",
    getting: "Ginza Line from Asakusa to Ueno, about 5 minutes",
    booking: "Not needed — but the museum closes on Mondays",
  },
  {
    time: "Late afternoon",
    place: "Yanaka Ginza and the lanes around it",
    allow: "1.5 hours",
    getting: "JR Yamanote Line to Nippori, then on foot",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Ameyoko, under the tracks at Ueno",
    allow: "2 hours",
    getting: "One Yamanote stop back from Nippori",
    booking: "No",
  },
];

const day3: Stop[] = [
  {
    time: "Early morning",
    place: "Tsukiji Outer Market, on a guided food walk",
    allow: "2–3 hours",
    getting: "Hibiya Line to Tsukiji or Oedo Line to Tsukijishijo",
    booking: "Yes — small groups on fixed departure times",
  },
  {
    time: "Late morning",
    place: "Hama-rikyu Gardens, on the water between the market and the bay",
    allow: "1–1.5 hours",
    getting: "About 15 minutes on foot from the outer market",
    booking: "No — pay at the gate; it opens 9:00 and last entry is 16:30",
  },
  {
    time: "Early afternoon",
    place: "teamLab Planets TOKYO, Toyosu",
    allow: "2 hours, including the entry queue",
    getting: "Yurikamome to Shin-Toyosu, or Yurakucho Line to Toyosu",
    booking: "Required — a 30-minute entry slot, with no walk-up counter",
  },
  {
    time: "Mid-afternoon",
    place: "Odaiba: the seaside park, DECKS and the Rainbow Bridge view",
    allow: "2 hours",
    getting: "Yurikamome from Toyosu to Odaiba-Kaihinkoen",
    booking: "No, unless you want the Joypolis passport inside DECKS",
  },
  {
    time: "Sunset",
    place: "Tokyo Bay boat cruise",
    allow: "1 hour",
    getting: "The small-boat listing we link boards at Shibaura, near Tamachi",
    booking: "Yes — a fixed sailing time, and sunset sailings go first",
  },
  {
    time: "Evening",
    place: "Tokyo Tower Main Deck",
    allow: "1 hour",
    getting: "Oedo Line to Akabanebashi, or Hibiya Line to Kamiyacho",
    booking: "Not needed — last admission is 22:30",
  },
];

const day4: Stop[] = [
  {
    time: "Early morning",
    place: "Highway bus, Busta Shinjuku to Kawaguchiko Station",
    allow: "Listed at approximately 1 hr 45 min",
    getting: "Busta Shinjuku; the same route also runs from Tokyo Station, Shibuya and Ikebukuro",
    booking: "Yes — a reserved seat, and ¥200 cheaper booked online",
  },
  {
    time: "Late morning",
    place: "Oishi Park on the north shore, for the across-the-lake view of Fuji",
    allow: "1–1.5 hours",
    getting: "Kawaguchiko sightseeing bus, Red Line, from the station",
    booking: "No",
  },
  {
    time: "Early afternoon",
    place: "Mt. Fuji Panoramic Ropeway above the lake",
    allow: "1 hour",
    getting: "Red Line back towards the station",
    booking: "No — but check the operator's notice, it closes for annual inspection",
  },
  {
    time: "Mid-afternoon",
    place: "The Lake Kawaguchi boat, or the Itchiku Kubota Art Museum",
    allow: "1 hour",
    getting: "Red Line; the boat pier is beside the ropeway",
    booking: "No",
  },
  {
    time: "Late afternoon",
    place: "Highway bus back to Shinjuku",
    allow: "Listed at approximately 1 hr 45 min",
    getting: "Kawaguchiko Station bus terminal",
    booking: "Yes — fix the return seat before you leave Tokyo",
  },
  {
    time: "Evening",
    place: "Shinjuku, which is where the bus puts you down",
    allow: "2 hours",
    getting: "On foot from Busta Shinjuku",
    booking: "No",
  },
];

const day5: Stop[] = [
  {
    time: "Early morning",
    place: "JR Yokosuka Line, Tokyo Station to Kamakura",
    allow: "59 minutes on the weekday service we read",
    getting: "Direct, no change — the same trains run through from Chiba and Narita",
    booking: "No — an IC card opens the gate, and a JR pass covers it",
  },
  {
    time: "Morning",
    place: "Kotoku-in and the open-air Great Buddha",
    allow: "45 minutes",
    getting: "Enoden tram from Kamakura to Hase, then about 7 minutes on foot",
    booking: "No — pay at the gate",
  },
  {
    time: "Late morning",
    place: "Hase-dera, on the hillside above the sea",
    allow: "1 hour",
    getting: "5 to 7 minutes on foot from Kotoku-in",
    booking: "No — pay at the gate",
  },
  {
    time: "Early afternoon",
    place: "The Enoden along the coast towards Enoshima",
    allow: "1–2 hours",
    getting: "Enoden, roughly every 12–15 minutes",
    booking: "No",
  },
  {
    time: "Mid-afternoon",
    place: "Tsurugaoka Hachimangu and the food stalls of Komachi-dori",
    allow: "1.5 hours",
    getting: "On foot from Kamakura Station",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Back in Tokyo — Marunouchi, Ginza, or wherever you are staying",
    allow: "2–3 hours",
    getting: "Yokosuka Line back into Tokyo Station",
    booking: "No",
  },
];

/** Every ticketed or paid item across the five days, each with its own source and date. */
const ticketRows = [
  {
    stop: "SHIBUYA SKY (Day 1)",
    price: `${PRICES.shibuyaSky.adult} adult online, ${PRICES.shibuyaSky.atDoor} at the door`,
    hours: "Per-date calendar — open the official page for your own date",
    booking: PRICES.shibuyaSky.booking,
    note: PRICES.shibuyaSky.bookingNote,
    checked: PRICES.shibuyaSky.checked,
    source: PRICES.shibuyaSky.source,
  },
  {
    stop: "Senso-ji, Asakusa (Day 2)",
    price: "No admission charge published for the main hall",
    hours: "Main hall 06:00–17:00, opening 06:30 from October to March",
    booking: "Not needed",
    note: "Walk in. It opens hours before anything else in this itinerary, which is why Day 2 starts here.",
    checked: "2026-10-21",
    source: "senso-ji.jp",
  },
  {
    stop: "TOKYO SKYTREE, Floor 350 (Day 2, optional)",
    price: `${PRICES.tokyoSkytree.adult} adult, ${PRICES.tokyoSkytree.child} child`,
    hours: "10:00–22:00 with last admission 21:00 on the date we checked; the calendar varies by day",
    booking: PRICES.tokyoSkytree.booking,
    note: PRICES.tokyoSkytree.bookingNote,
    checked: PRICES.tokyoSkytree.checked,
    source: PRICES.tokyoSkytree.source,
  },
  {
    stop: "Tokyo National Museum, Ueno (Day 2)",
    price: "¥1,000 adult, ¥500 university student",
    hours: "9:30–17:00, and 9:30–20:00 on Fridays and Saturdays; closed Mondays",
    booking: "Not needed",
    note:
      "General admission, walk-up. The Monday closure is the one that catches people out — if your Day 2 is a Monday, swap it with Day 3.",
    checked: CHECKED_ISO,
    source: "tnm.jp",
  },
  {
    stop: "Hama-rikyu Gardens (Day 3)",
    price: "¥300 adult, ¥150 for 65 and over",
    hours: "9:00–17:00 with entry until 16:30; closed 29 December to 1 January",
    booking: "Not needed",
    note: "Pay at the gate. It is the one green stop on the bay day, between the market and Toyosu.",
    checked: CHECKED_ISO,
    source: "tokyo-park.or.jp",
  },
  {
    stop: "teamLab Planets TOKYO (Day 3)",
    price: `${PRICES.teamlabPlanets.adult} adult, ${PRICES.teamlabPlanets.child} child`,
    hours: "Listed 08:00–22:00 and varying by date, with last admission an hour before closing",
    booking: PRICES.teamlabPlanets.booking,
    note: PRICES.teamlabPlanets.bookingNote,
    checked: PRICES.teamlabPlanets.checked,
    source: PRICES.teamlabPlanets.source,
  },
  {
    stop: "Tokyo Tower, Main Deck (Day 3)",
    price: `${PRICES.tokyoTower.adult} adult, ${PRICES.tokyoTower.child} child`,
    hours: "9:00–23:00 with last admission 22:30",
    booking: PRICES.tokyoTower.booking,
    note: PRICES.tokyoTower.bookingNote,
    checked: PRICES.tokyoTower.checked,
    source: PRICES.tokyoTower.source,
  },
  {
    stop: "Shinjuku ⇄ Kawaguchiko highway bus (Day 4)",
    price: "¥2,200 adult one way, ¥2,000 booked online; child ¥1,100 / ¥1,000",
    hours: "Listed at approximately 1 hour 45 minutes each way",
    booking: "Advised",
    note:
      "A reserved seat, so the return is the booking that matters — the last useful departure decides how long you get at the lake.",
    checked: CHECKED_ISO,
    source: "bus.fujikyu.co.jp",
  },
  {
    stop: "Kawaguchiko sightseeing bus, 1-day pass (Day 4)",
    price: "¥1,500 adult, ¥750 child",
    hours: "Red, Green and Blue Lines around the lakes",
    booking: "Not needed",
    note: "Three or more hops pays for the pass; two does not, because single rides start at ¥180.",
    checked: "2026-10-21",
    source: "bus.fujikyu.co.jp",
  },
  {
    stop: "Mt. Fuji Pass, 1 day (Day 4 alternative)",
    price: `${PRICES.mtFujiPass.adult} adult, ${PRICES.mtFujiPass.child} child`,
    hours: "n/a",
    booking: PRICES.mtFujiPass.booking,
    note: PRICES.mtFujiPass.bookingNote,
    checked: PRICES.mtFujiPass.checked,
    source: PRICES.mtFujiPass.source,
  },
  {
    stop: "Kotoku-in, Kamakura (Day 5)",
    price: `${PRICES.kotokuin.adult} adult, ${PRICES.kotokuin.child} child`,
    hours: "Published on the temple's own site; the statue's interior closes earlier than the grounds",
    booking: PRICES.kotokuin.booking,
    note: PRICES.kotokuin.bookingNote,
    checked: PRICES.kotokuin.checked,
    source: PRICES.kotokuin.source,
  },
  {
    stop: "Hase-dera, Kamakura (Day 5)",
    price: `${PRICES.hasedera.adult} adult, ${PRICES.hasedera.child} child`,
    hours: "Opens 08:00, closing 17:00 and later April to June, last entry 30 minutes before close",
    booking: PRICES.hasedera.booking,
    note: PRICES.hasedera.bookingNote,
    checked: PRICES.hasedera.checked,
    source: PRICES.hasedera.source,
  },
  {
    stop: "Tokyo Subway Ticket (the three city days)",
    price: `${PRICES.tokyoSubwayTicket.adult} / ¥1,500 / ¥2,000 adult for 24 / 48 / 72 hours`,
    hours: "n/a",
    booking: PRICES.tokyoSubwayTicket.booking,
    note: PRICES.tokyoSubwayTicket.bookingNote,
    checked: PRICES.tokyoSubwayTicket.checked,
    source: PRICES.tokyoSubwayTicket.source,
  },
  {
    stop: "Hakone Freepass (if you swap a day trip)",
    price: "¥7,100 adult / ¥1,600 child for 2 days; ¥7,500 / ¥1,850 for 3 days, from Shinjuku",
    hours: "n/a",
    booking: "Not needed",
    note:
      "It does not include the Romancecar limited express ticket, which is a further ¥1,200 adult and ¥600 child to Hakone-Yumoto — and there is no 1-day version of the pass.",
    checked: CHECKED_ISO,
    source: "odakyu-global.com",
  },
];

/** Published journey times for the legs that leave the city. */
const longDistance = [
  {
    leg: "Shinjuku → Kawaguchiko (Day 4)",
    how: "Fujikyu highway bus, direct from Busta Shinjuku",
    time: "Approximately 1 hr 45 min",
    cost: "¥2,200 adult one way, ¥2,000 online; child ¥1,100 / ¥1,000",
    source: "bus.fujikyu.co.jp",
    checked: CHECKED_ISO,
  },
  {
    leg: "Tokyo → Kamakura (Day 5)",
    how: "JR Yokosuka Line, direct, no change",
    time: "59 minutes — the 07:02 from Kamakura reaches Tokyo at 08:01 on the weekday timetable",
    cost: "Ordinary JR fare; a JR pass covers it and there is no limited-express surcharge",
    source: "timetables.jreast.co.jp",
    checked: CHECKED_ISO,
  },
  {
    leg: "Shinjuku → Hakone-Yumoto (day-trip swap)",
    how: "Odakyu Romancecar, direct",
    time: "Approx. 80 min",
    cost: "Limited express surcharge ¥1,200 adult, ¥600 child, on top of the fare — not in the Freepass",
    source: "odakyu-global.com",
    checked: CHECKED_ISO,
  },
  {
    leg: "Tokyo → Kyoto (if the five days are the first leg)",
    how: "Tokaido Shinkansen from Tokyo Station",
    time: "About 130 minutes",
    cost: "Fare and seat class vary by train type and season",
    source: "global.jr-central.co.jp",
    checked: CHECKED_ISO,
  },
];

const bookingWindow = [
  {
    title: "Book before you fly",
    desc: "teamLab Planets, because entry is a 30-minute slot with no walk-up counter and the popular windows go weeks out. The SHIBUYA SKY sunset slot, for the same reason. The Kawaguchiko highway bus in both directions, because the seat is reserved and a day at the lake is decided by the return. And the airport bus or train for your arrival.",
  },
  {
    title: "Book a few days out",
    desc: "The Tsukiji food walk and the bay cruise, which are small-group departures rather than open tickets; the Asakusa kimono appointment, which has a fixed dressing time and a fixed return time; and Tokyo Skytree, where booking ahead is simply cheaper than the same-day counter.",
  },
  {
    title: "Do not bother booking",
    desc: "Senso-ji, Meiji Jingu, the Scramble Crossing, Nakameguro, Yanaka, Ameyoko, Odaiba, the Tokyo Tower Main Deck, Kotoku-in, Hase-dera, Tsurugaoka Hachimangu and the Enoden. None of them sells a timed ticket, and queuing for a slot you do not need is the fastest way to lose an afternoon of a five-day trip.",
  },
];

const faqItems = [
  {
    q: "Is 5 days in Tokyo enough?",
    a: "Five days is more than enough for the city and exactly right for the city plus two days out of it. Three days covers Tokyo's three big clusters — west around Harajuku and Shibuya, east around Asakusa and Ueno, and the bay and centre — and the fourth and fifth days are where a day trip finally fits without costing you a third of Tokyo. That is the whole argument for five over three: not more sights, but Mt. Fuji and Kamakura without a trade.",
  },
  {
    q: "How should you split a Tokyo 5-day itinerary?",
    a: "Three city days and two day trips, in that order. Day 1 west (Harajuku, Nakameguro, Shibuya, finishing on the SHIBUYA SKY sunset slot), Day 2 old Tokyo (Asakusa, Ueno, Yanaka), Day 3 the bay (Tsukiji, Hama-rikyu, teamLab Planets, Odaiba, Tokyo Tower), Day 4 Kawaguchiko for Mt. Fuji, Day 5 Kamakura. Keeping the day trips at the end means a wet forecast can be swapped for a city day you have already planned, rather than wasted.",
  },
  {
    q: "What needs booking in advance on a 5 day Tokyo trip?",
    a: `Five things, and only five. teamLab Planets TOKYO requires a date- and time-specified ticket with no walk-up counter. SHIBUYA SKY needs a slot if you want sunset. The Kawaguchiko highway bus is a reserved seat in both directions — it was ¥2,200 one way, or ¥2,000 booked online, on ${CHECKED}. The Tsukiji food walk and the bay cruise are fixed departures with a handful of places each. The Asakusa kimono appointment is the fifth, because the dressing slot and the return deadline both sit in the shop's calendar rather than yours.`,
  },
  {
    q: "Do you need a JR Pass for 5 days in Tokyo?",
    a: "Almost certainly not. Across these five days the only JR legs are the Yamanote hops and the Yokosuka Line to Kamakura; the subway is Tokyo Metro and Toei, the Fuji day is a highway bus, the Enoden is a private tram and the Hakone alternative is Odakyu. A nationwide pass would be covering a single hour-long train. Our JR Pass guide works the break-even properly, and the short version is that it starts to pay only once you are crossing the country.",
  },
  {
    q: "Which day trips are worth it from Tokyo in 5 days?",
    a: `Kawaguchiko and Kamakura, in that order of effort. Kawaguchiko is the Mt. Fuji day: the Fujikyu bus from Shinjuku is listed at approximately 1 hour 45 minutes each way, which makes it a whole day rather than an excursion. Kamakura is the easy one — the JR Yokosuka Line runs direct from Tokyo Station and the 07:02 from Kamakura reaches Tokyo at 08:01, so you can be back in the city for dinner. Hakone (about 80 minutes on the Romancecar) and Nikko are the two obvious swaps. Times checked ${CHECKED}.`,
  },
  {
    q: "What does a 5 day Tokyo itinerary cost in tickets?",
    a: "Less than most people expect, because most of these five days are free to walk into. The paid items are the three observation and art tickets, two temple admissions in Kamakura of ¥300 and ¥400, a ¥1,000 museum, a ¥300 garden, the subway pass and the Fuji bus. Every figure, with the operator's site and the date it was read, is in the table above — we do not publish hotel or food estimates, because those are guesses rather than prices.",
  },
  {
    q: "Where should you stay for 5 days in Tokyo?",
    a: "On the Yamanote loop, at a station that is also a subway interchange — Shinjuku, Tokyo Station / Marunouchi, Ueno and Asakusa, or Shibuya. Five days makes the choice easier rather than harder, because you are not optimising for one district: the thing that costs you time over five days is a base that needs two changes to reach anything, and all four of those areas need none. Shinjuku has one extra advantage on this particular plan — the Kawaguchiko bus leaves from it.",
  },
  {
    q: "What do you do in Tokyo when it rains?",
    a: "Swap a day, not a plan. The three city days each hold an indoor anchor — the Tokyo National Museum on Day 2, teamLab Planets on Day 3, and Tokyo Skytree or Solamachi as the wet-weather version of an outdoor afternoon. A rainy Day 4 is the one to actually move: Kawaguchiko in cloud means no Mt. Fuji at all, and the bus seat can usually be re-dated more easily than a timed museum slot.",
  },
  {
    q: "Is a 5 day Tokyo itinerary doable with kids?",
    a: "Yes, with one change: cut the stops per day rather than the days, and move one day trip into a park day. Tokyo Disney, Sanrio Puroland at Tama Center and Joypolis in Odaiba are all a straight swap for Day 4 or Day 5, and Puroland and Joypolis are indoors, which matters in July and in February. The ticketed stops in this itinerary publish child rates, and they are in the dated table above.",
  },
  {
    q: "Can you add Kyoto or Osaka to five days in Tokyo?",
    a: "You can, but it is a different trip. The Tokaido Shinkansen reaches Kyoto in about 130 minutes, so adding Kyoto to a five-day trip means giving up both day trips and one city day — which is how a five-day plan quietly turns into a rushed seven. If you have the nights, our 14-day itinerary shows what the full version looks like; if you do not, keep the five days in and around Tokyo and come back for Kansai.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-5-day-itinerary") } });

const TITLE = "Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day";
const DESC =
  "A Tokyo 5-day itinerary built around the bookings: three city days plus Kawaguchiko and Kamakura, a table for each of the 5 days in Tokyo, official ticket prices and journey times with the date each was checked, and where to stay.";

export default function Tokyo5DayItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-5-day-itinerary" />
        {hreflangLinks("/guides/attractions/tokyo-5-day-itinerary")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-5-day-itinerary" />
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
              route: "/guides/attractions/tokyo-5-day-itinerary",
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
                { "@type": "ListItem", position: 4, name: "Tokyo 5-Day Itinerary", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-5-day-itinerary" },
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
          <span className={styles.breadCurrent}>Tokyo 5-Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo 5-Day Itinerary (2026):<br />5 Days in Tokyo, Day by Day
          </h1>
          <p className={styles.heroSubtitle}>
            Three city days and two days out of the city, arranged so the only five bookings that
            matter are settled before you fly.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "A table for each of the five days", "Official prices and times, dated"].map((t) => (
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
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 1</p>
                <p className={styles.verdictStatValue}>Harajuku, Nakameguro, Shibuya</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Asakusa, Ueno, Yanaka</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 3</p>
                <p className={styles.verdictStatValue}>Tsukiji, Toyosu, Odaiba, Tokyo Tower</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 4</p>
                <p className={styles.verdictStatValue}>Kawaguchiko, for Mt. Fuji</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 5</p>
                <p className={styles.verdictStatValue}>Kamakura, back for the evening</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Must book ahead</p>
                <p className={styles.verdictStatValue}>teamLab Planets, Shibuya Sky sunset, the Fuji bus</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> a Tokyo 5-day itinerary works best as three city days plus two
              day trips — west Tokyo on Day 1, old Tokyo on Day 2, the bay on Day 3, Kawaguchiko for
              Mt. Fuji on Day 4 and Kamakura on Day 5. The two days out of the city are what five days
              buys you over three: the Fujikyu bus from Shinjuku to Kawaguchiko is listed at
              approximately 1 hour 45 minutes each way, and the JR Yokosuka Line runs Tokyo to Kamakura
              in 59 minutes with no change. Only five things in the whole plan need booking — teamLab
              Planets, the SHIBUYA SKY sunset slot, the Fuji bus in both directions, the Tsukiji food
              walk and the Asakusa kimono appointment. Admission for the ticketed stops ran{" "}
              {PRICES.shibuyaSky.adult} (Shibuya Sky online), {PRICES.teamlabPlanets.adult} (teamLab
              Planets), {PRICES.tokyoTower.adult} (Tokyo Tower Main Deck), ¥1,000 (Tokyo National
              Museum) and {PRICES.kotokuin.adult} and {PRICES.hasedera.adult} for the two Kamakura
              temples on the dates in the table below.
            </p>
            <a
              href={tokyoSubwayTicket.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check the Tokyo Subway Ticket on Klook →
            </a>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Should You Split 5 Days in Tokyo?</h2>
          <p className={styles.bodyText}>
            Three days in the city, two days out of it. Tokyo is not one centre with suburbs around it;
            it is a string of centres along a loop line, and three of those clusters are a full day
            each. Add a fourth and a fifth day and the question changes completely — you are no longer
            choosing which part of Tokyo to drop, you are choosing which day trip to add. That is the
            one structural difference between this plan and our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link>, which
            has to leave Mt. Fuji out altogether.
          </p>
          <p className={styles.bodyText}>
            The five days below are also not the three-day plan with two days bolted on. With the extra
            room, each city day takes in a district three days cannot reach — Daikanyama and Nakameguro
            on Day 1, Ueno Park and Yanaka on Day 2, Hama-rikyu and Odaiba on Day 3 — and the pace drops
            to something you can actually keep for five consecutive days.
          </p>
          <p className={styles.bodyText}>
            What this guide does differently is treat the five days as a booking problem. Most of Tokyo
            is walk-in, and the handful of things that are not will quietly decide your schedule if you
            let them. So each day below carries its own table — time of day, where, how long to allow,
            how you get there, and whether it needs booking — with that day&apos;s bookings directly
            underneath it.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>Day 1 — West Tokyo: Harajuku, Nakameguro and Shibuya</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            One side of the Yamanote loop, finishing on a rooftop. Day 1 goes first because it holds the
            slot most likely to be sold out — the SHIBUYA SKY sunset window — and a failed booking on
            Day 1 still has four days to move into.
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
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 1.</strong> The subway ticket for the city days, and the
            Shibuya Sky slot if you want sunset. Shibuya Sky is also the one stop here where the booking
            route matters as much as the ticket — the official site has rejected many foreign-issued
            cards since July 2024, which our{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets">Shibuya Sky tickets guide</Link>{" "}
            covers in full. If the sunset slot has gone, the free Metropolitan Government Building decks
            in Shinjuku are twenty minutes away on the same line; our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">Tokyo observation decks comparison</Link>{" "}
            puts the four side by side.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Tokyo Subway Ticket →
            </a>
            <a href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Shibuya Sky tickets →
            </a>
            <GygCompareButton slug="tokyo-5-day-itinerary" listing={gygShibuyaSky} />
          </div>
        </section>

        {/* Day 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>Day 2 — Old Tokyo: Asakusa, Ueno and Yanaka</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The low-rise, pre-war side of the city, and the day where five days earns its keep: Ueno
            Park and the Yanaka lanes are the first things a three-day plan has to drop. Senso-ji&apos;s
            main hall opens at 06:00 — 06:30 from October to March — so an early start here costs less
            in crowds than anywhere else in the itinerary.
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
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 2.</strong> The kimono appointment, and Skytree if you are
            doing it. The rental is the thing that sets the shape of this day rather than the thing that
            decorates it: the Klook listing for Kimono Yae, by Kaminarimon, asks for the outfit back by
            17:30 the same day, and the dressing itself takes most of an hour before you step outside —
            so plan the return before Ueno, not after it. Our{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental">Asakusa kimono rental guide</Link>{" "}
            sets out the return deadlines shop by shop. Skytree is worth booking for a different reason:
            the same-day counter adds a service fee per ticket, so buying ahead is cheaper rather than
            safer — the detail is in our{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets">Tokyo Skytree tickets guide</Link>.
            The Tokyo National Museum takes no reservation at all, but it closes on Mondays; if your
            Day 2 falls on one, swap it with Day 3.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={asakusaKimonoYae.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Asakusa kimono rental →
            </a>
            <a href={skytreeTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check TOKYO SKYTREE tickets →
            </a>
          </div>
        </section>

        {/* Day 3 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 3</span>
          <h2 className={styles.sectionTitle}>Day 3 — The Bay: Tsukiji, Toyosu, Odaiba and Tokyo Tower</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            A day that runs along the water from the fish market to the Rainbow Bridge, and the only one
            with two fixed departure times in it. Tokyo Tower closes at 23:00 with last admission at
            22:30 — later than any other major deck in the city — so a slow afternoon on the bay does not
            cost you the view.
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
                  {day3.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 3.</strong> teamLab Planets, without exception — the entry
            window is 30 minutes, there is no counter at the museum, and the popular slots go weeks
            ahead; our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets tickets guide</Link>{" "}
            also covers what to wear, because parts of it are walked barefoot through water. Then the two
            fixed departures: the Tsukiji food walk, which runs in small groups while the outer market is
            still trading, and the sunset boat, which is an hour rather than a dinner cruise. Our{" "}
            <Link href="/guides/attractions/tsukiji-market-food-tour">Tsukiji market food tour guide</Link>{" "}
            explains why the morning slot is the one that matters, and our{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise">Tokyo Bay cruise guide</Link> sets the
            small boat against the yakatabune and the Symphony.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={tsukijiCultureFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Tsukiji food tour →
            </a>
            <a href={tokyoBaySunsetBoatCruise.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Tokyo Bay sunset cruise →
            </a>
            <a href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check teamLab Planets tickets →
            </a>
          </div>
        </section>

        {/* Day 4 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 4</span>
          <h2 className={styles.sectionTitle}>Day 4 — Day Trip: Kawaguchiko and the Mt. Fuji North Shore</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The reason to spend five days rather than three. The Fujikyu highway bus from Busta Shinjuku
            to Kawaguchiko Station is listed at approximately 1 hour 45 minutes, at ¥2,200 for an adult
            or ¥2,000 booked online, with child fares of ¥1,100 and ¥1,000 — read off the Fujikyu bus
            site on {CHECKED}. Three and a half hours of that day are travel, so plan two or three stops
            around the lake, not five.
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
                  {day4.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 4.</strong> The bus seat in both directions, or a coach day that
            replaces both. The independent version is cheaper and more flexible, and our{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo">Kawaguchiko day trip guide</Link>{" "}
            has the local fares; our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo">Mt. Fuji day trip guide</Link>{" "}
            covers the train route via Otsuki if you want the Chureito Pagoda instead of the lake. A
            join-in coach is the version to pick if you would rather not watch a return timetable all
            afternoon, and our{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo">Mt. Fuji day tour comparison</Link>{" "}
            sets out what each one actually stops at. Once you are at the lake, a day of three or more
            bus hops pays for the ¥1,500 one-day pass; two does not. Local pass price read off the
            Fujikyu bus site on {FUJIKYU_LOCAL_CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={kawaguchikoYamanakakoBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Kawaguchiko day tour →
            </a>
            <a href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Tokyo – Mt. Fuji bus →
            </a>
            <a href={mtFujiPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Mt. Fuji Pass →
            </a>
          </div>
        </section>

        {/* Day 5 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 5</span>
          <h2 className={styles.sectionTitle}>Day 5 — Day Trip: Kamakura, and a Last Tokyo Evening</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The easy one, and the right day trip to put last because it comes back early. The JR
            Yokosuka Line runs direct from Tokyo Station with no change — on the weekday timetable we
            read, the 07:02 out of Kamakura reaches Tokyo at 08:01, which is 59 minutes. Checked on
            JR East&apos;s own timetable site, {CHECKED}. That means a full morning and afternoon in
            Kamakura and still an evening in the city.
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
                  {day5.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 5.</strong> Nothing, strictly — Kamakura is the one day in this
            itinerary you can decide on the morning of. Kotoku-in and Hase-dera both take cash at the
            gate, the Enoden runs every twelve to fifteen minutes, and no train on the route is
            reserved. The only reason to book is to hand the day to somebody else: the Klook day tour
            that pairs Kamakura with Enoshima is one booking instead of a morning of connections, which
            is worth it if Day 5 is also the day before you fly. Our{" "}
            <Link href="/guides/attractions/kamakura-day-trip">Kamakura day trip guide</Link> has the
            official temple admissions and the route in detail.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={kamakuraEnoshimaDayTourUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Kamakura &amp; Enoshima day tour →
            </a>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The &ldquo;time to allow&rdquo; column in all five tables is our own planning allowance, not
            an operator figure. Prices, opening hours and journey times are in the two dated tables
            below, each against the operator&apos;s own site.
          </p>
        </section>

        <KlookTourPicks
          heading="If You Would Rather Swap a Day Trip"
          intro="Hakone instead of Kawaguchiko, a coach day instead of a bus timetable, or the Fuji-area pass if you are staying out there longer. Klook blocks automated price reads, so open a listing for the figure on your date."
          tours={[hakoneFreepass, kawaguchikoYamanakakoBusTour, mtFujiPass]}
        />

        {/* The two bookings this itinerary can break on are teamLab Planets and the
            Shibuya Sky sunset slot; the Fuji coach day is the third, because a join-in
            departure sells out by date rather than by slot. Every Klook link and every
            dated figure above is unchanged. */}
        <GygCompare
          slug="tokyo-5-day-itinerary"
          heading="If a Timed Slot or a Departure Has Already Gone"
          intro="Five days survives most things, but not a sold-out teamLab Planets slot, a Shibuya Sky sunset that went weeks ago, or a Fuji coach with no seats on your date — reordering the days does not conjure a ticket. All three are sold on GetYourGuide as well, and the full Tokyo catalogue is there if you are rebuilding a day from scratch."
          listings={[gygTeamlabPlanets, gygShibuyaSky, gygFujiFromTokyo, gygTokyo]}
        />

        {/* Prices and hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; hours</span>
          <h2 className={styles.sectionTitle}>What Do 5 Days in Tokyo Cost in Tickets and Passes?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Less than most people expect, because most of these five days are free to walk into. Every
            figure below is the operator&apos;s own published price, with the site it was read off and
            the date it was read — not an estimate, and not a Klook price. There are no hotel or food
            numbers here on purpose: those are guesses rather than prices, and a guess dated to the day
            is still a guess.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Official price", "Hours / duration", "Booking", "Source & date checked"].map((h) => (
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
                      <td style={{ fontSize: "0.82rem" }}>
                        {row.source}, {checkedLabel(row.checked)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm at booking. The Senso-ji row carries the date of our own read on
            senso-ji.jp ({SENSOJI_CHECKED}); the museum, garden, bus and Hakone rows were read on{" "}
            {CHECKED}; every other row carries the date from our own guide for that ticket. The ticketed
            attractions also appear, with the same figures and dates, in the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        {/* Long-distance legs */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting out of the city</span>
          <h2 className={styles.sectionTitle}>How Long Does Each Day Trip Take From Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Between one and two hours each way, and the operator publishes every one of these figures.
            This is the part of a five-day plan worth checking before you commit to a day, because the
            travel time sets how many stops the day can hold.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Leg", "How", "Published journey time", "Fare / surcharge", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {longDistance.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.how}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.82rem" }}>
                        {row.source}, {checkedLabel(row.checked)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>Do you need a JR Pass for five days in Tokyo?</strong> No, and this itinerary is a
            clean illustration of why. The only JR legs in it are the Yamanote hops and the hour to
            Kamakura. The subway is Tokyo Metro and Toei, the Fuji day is a highway bus, the Enoden is a
            private tram, and the Hakone alternative is Odakyu — a nationwide pass would be covering one
            train. Our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works the break-even
            properly, and our{" "}
            <Link href="/guides/transport/tokyo-transportation">Getting Around Tokyo guide</Link>{" "}
            explains how IC cards and the subway lines fit together for the three city days.
          </p>
          <p className={styles.bodyText}>
            <strong>And if you want to add Kyoto or Osaka.</strong> The Tokaido Shinkansen reaches Kyoto
            from Tokyo Station in about 130 minutes, which sounds like an easy add-on and is not: at
            five days, it costs you both day trips and a city day. If the nights are there, our{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link> compares the train
            types and fares, and our{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">Japan 14-day itinerary</Link> shows
            what the unhurried version of Tokyo-plus-Kansai actually looks like.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kyoto shinkansen tickets →
            </a>
            <a href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Hakone Freepass →
            </a>
          </div>
        </section>

        {/* Where to stay */}
        <KlookStayAreas
          heading="Where Should You Stay for 5 Days in Tokyo?"
          intro="On the Yamanote loop, at a station that is also a subway interchange. Over five days the thing that costs you most is a base that needs two changes to reach anything, and these four need none — Shinjuku for the west side and the Kawaguchiko bus, Tokyo Station for the shinkansen and the Kamakura line, Ueno and Asakusa for the whole of Day 2, and Shibuya for the sunset deck and the evenings around it."
          areas={tokyoFiveDayStayAreas}
        />

        {/* Booking window */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>What Needs Booking in Advance, and How Far Ahead?</h2>
          <p className={styles.bodyText}>
            Five things out of roughly thirty stops, which is the single most useful fact to hold before
            you start planning. Here is the whole itinerary sorted by how far ahead each thing has to be
            bought.
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
            Cancellation is the other half of this, and it matters more at five days than at three,
            because two of your days depend on weather. A rooftop in rain and a Fuji viewpoint in cloud
            are both worth being able to move, which is the practical argument for buying the decks, the
            museum slot and the coach through a route that lets you re-date or cancel — and that also
            takes foreign cards the official sites sometimes reject. Our{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo guide</Link> lists
            the same book-ahead split across the whole city rather than just this itinerary.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Planets on Klook →
            </a>
            <a href={kawaguchikoYamanakakoBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kawaguchiko day tour on Klook →
            </a>
            <GygCompareButton slug="tokyo-5-day-itinerary" listing={gygTeamlabPlanets} />
          </div>
        </section>

        {/* Rain */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rainy day</span>
          <h2 className={styles.sectionTitle}>What Do You Do on a Rainy Day in Tokyo?</h2>
          <p className={styles.bodyText}>
            Swap a day, not a plan — which is a luxury five days gives you and three does not. Day 4 is
            the one to move first: Kawaguchiko in cloud means no Mt. Fuji at all, and a reserved bus seat
            is usually easier to re-date than a timed museum entry. Move it to the back of the week and
            pull a city day forward.
          </p>
          <p className={styles.bodyText}>
            If the rain lands on a city day instead, each of the three already contains its own indoor
            anchor. Day 2 has the Tokyo National Museum in Ueno Park, ¥1,000 for an adult and open
            9:30–17:00 with later Friday and Saturday hours — closed Mondays — read off tnm.jp on{" "}
            {CHECKED}. Day 3 has{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets</Link>, which is
            indoors throughout, and{" "}
            <Link href="/guides/attractions/tokyo-joypolis-tickets">Tokyo Joypolis</Link> inside the
            DECKS building a few minutes away in Odaiba. Day 1&apos;s rooftop is the one stop that rain
            genuinely ruins: an observation deck in low cloud shows you cloud, so move the SHIBUYA SKY
            slot rather than sitting it out —{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">our deck comparison</Link> covers
            which of the four is worth the gamble on a marginal day. Covered shopping streets are the
            other default; Nakamise-dori in Asakusa and Ameyoko at Ueno are both roofed for most of their
            length.
          </p>
        </section>

        {/* Kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>With children</span>
          <h2 className={styles.sectionTitle}>Does This 5 Day Tokyo Itinerary Work With Kids?</h2>
          <p className={styles.bodyText}>
            Yes, with one structural change: turn one of the two day trips into a park day. Kawaguchiko
            is three and a half hours of coach for a view, which is a hard sell under about ten; Kamakura
            survives contact with children better, because the Enoden and the Great Buddha are short,
            concrete and outdoors.
          </p>
          <p className={styles.bodyText}>
            The three obvious swaps are all a straight substitution for Day 4 or Day 5.{" "}
            <Link href="/guides/attractions/tokyo-disney-tickets">Tokyo Disneyland and DisneySea</Link>{" "}
            sell date-specified tickets with no gate sales, so that one has to be decided before you
            fly.{" "}
            <Link href="/guides/attractions/sanrio-puroland-tickets">Sanrio Puroland</Link> at Tama
            Center is indoors and prices by date, which means choosing the day saves more than choosing
            the seller.{" "}
            <Link href="/guides/attractions/tokyo-joypolis-tickets">Tokyo Joypolis</Link> in Odaiba is
            the half-day version and slots into Day 3 without moving anything, though several of its
            rides have a minimum height.
          </p>
          <p className={styles.bodyText}>
            Within the five days as written, the other change worth making is fewer stops rather than
            fewer days — four a day instead of six, with the timed ticket in the morning while everyone
            is fresh. Every ticketed stop in the table above publishes a child rate, and the two Kamakura
            temples come to {PRICES.kotokuin.child} and {PRICES.hasedera.child} for a child between them.
          </p>
        </section>

        {/* Arrival and data */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Arrival &amp; data</span>
          <h2 className={styles.sectionTitle}>How Do You Get In From the Airport, and What Else Should You Book?</h2>
          <p className={styles.bodyText}>
            Five days in Tokyo has an airport day at each end, and both are worth settling before you
            fly — they are the two parts of the trip where a queue costs hours rather than minutes.
          </p>
          <p className={styles.bodyText}>
            <strong>From Narita.</strong> The Narita Express runs to Tokyo Station, Shinjuku and Shibuya
            without a transfer, which covers three of the four bases above, and the Keisei Skyliner is
            the fast option for the Ueno and Asakusa side. The limousine bus is the one to pick with
            large luggage or a hotel that is not beside a station. Journey times and the full
            route-by-route comparison are in our{" "}
            <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link>,
            and the bus specifically in our{" "}
            <Link href="/guides/transport/tokyo-airport-limousine-bus">Tokyo airport limousine bus guide</Link>.
          </p>
          <p className={styles.bodyText}>
            <strong>From Haneda.</strong> Close enough to central Tokyo that the choice matters much
            less — the Keikyu Line and the Tokyo Monorail both reach the Yamanote loop quickly, and the
            same limousine operator runs from all three Haneda terminals.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={naritaLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Narita limousine bus →
            </a>
            <a href={hanedaLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Haneda limousine bus →
            </a>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            One more arrival-day booking that is not transport: data. Every timed ticket on this
            itinerary is a QR code in an inbox, the Kawaguchiko return is a timetable you will check from
            a bus stop, and every &ldquo;getting there&rdquo; column above assumes you can open a map. An
            eSIM activated before departure means none of that depends on finding airport Wi-Fi.{" "}
            <a href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </a>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it
            against the alternatives.
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/hakone-free-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Free Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
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
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
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
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kamakura-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V9l8-5 8 5v11" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kamakura Day Trip From Tokyo (2026): Great Buddha, Hase-dera and the Fares</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Day Trip From Tokyo (2026): Freepass Prices vs a Day Tour</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V8l8-5 8 5v12" />
                  <path d="M4 14h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Prices, How to Book &amp; Planets vs Borderless</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tsukiji-market-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c4-5 14-5 18 0-4 5-14 5-18 0z" />
                  <circle cx="8" cy="12" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tsukiji Market Food Tour (2026): Hours, What to Eat and Which Tour to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/asakusa-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M6 21V9l6-2 6 2v12z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
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
            <h2 className={styles.ctaBannerTitle}>Settle the five bookings first</h2>
            <p className={styles.ctaBannerDesc}>
              teamLab Planets, the Shibuya Sky sunset slot, the Kawaguchiko bus in both directions, the
              Tsukiji food walk and the Asakusa kimono appointment are the only things in these five days
              that can be sold out when you want them. Klook checks out in English, takes foreign cards
              the official sites sometimes reject, and keeps all five days on one account.
            </p>
            <div className={styles.pickCtaRow}>
              <a href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Book the timed tickets on Klook →
              </a>
              <GygCompareButton slug="tokyo-5-day-itinerary" listing={gygTokyo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
