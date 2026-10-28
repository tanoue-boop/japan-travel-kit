import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  hanedaLimousineBus,
  keiseiSkylinerUrl,
  naritaBusSubwayCombo,
  naritaExpressRoundTripUrl,
  naritaLimousineBus,
  tokyoAirportStayAreas,
  tokyoAirportTripPrep,
  tokyoPrivateAirportTransfer,
  tokyoSharedAirportTransfer,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";

/**
 * Tokyo Airport Transfer — answer-first rebuild, 25 Oct 2026.
 *
 * Why: this page answers the easy half of its own search term. Search Console
 * shows it taking impressions on the comparison queries — "nex vs skyliner"
 * (6 impressions, average position 7.8), "skyliner vs nex" (3 at 16.7),
 * "nex vs keisei skyliner" (3 at 9.7), "skyaccess vs xo" (4 at 16) — and the old
 * draft had no section that answered them under a heading an AI answer could lift.
 * It also printed fares that were two Japanese fare revisions out of date.
 *
 * Every fare, journey time and frequency on the page was re-read on 25 October
 * 2026 from the five operators' own sites. Where an operator publishes two
 * figures, this page takes the newer one, and says which page it came from:
 *
 *   - Keisei's ENGLISH fare tables (us/traffic/*_fares.php, us/directions/*) are
 *     stale: they still print the pre-April-2025 Skyliner fare of ¥2,470 and a
 *     ¥1,240 section fare. Keisei's own Japanese Skyliner ticket page
 *     (jp/skyliner/ticket.php) and its English FAQ both give the current ¥2,580
 *     (¥1,280 section fare + ¥1,300 Liner ticket; IC ¥2,567). The fares here are
 *     the ¥2,580 set; the journey times come from the English direction pages,
 *     which were never revised downward and are the only place Keisei states a
 *     time at all.
 *   - JR East answers automated reads with HTTP 403, so the N'EX fares come from
 *     its own pages through a jreast.co.jp-restricted search index. Same split
 *     problem: /e/nex/tickets.html still shows ¥3,070 / ¥3,250, while
 *     /en/multi/nex/tickets/ shows the post-14-March-2026 ¥3,140 / ¥3,330 and the
 *     round trip at ¥5,200 rather than ¥5,000. The newer set is used.
 *   - limousinebus.co.jp is also 403; its fares come from the same indexed route
 *     pages that pages/guides/transport/tokyo-airport-limousine-bus.tsx reads, and
 *     the two pages are kept in agreement deliberately.
 *   - Keikyu and Tokyo Monorail were read directly, and are the only two operators
 *     whose pages could be parsed in full.
 *
 * Nothing is printed for a taxi. None of the five operators publishes a fare for
 * one, so the old draft's "¥20,000+" and "¥6,000–¥8,000" had no source and are
 * gone; the row now says what is actually true, which is that the number depends
 * on the destination, the tolls and the hour.
 *
 * Klook: the existing affiliate.klook.com/redirect links (aff_adid 1264852/3/4/6)
 * are kept — Klook no longer issues new aff_adid values — and are now read from
 * lib/klook-links.ts where a constant already exists for the same URL. The two new
 * listings are the private and shared door-to-door transfers, which are what the
 * late-landing and early-departure sections actually need. No Klook price appears.
 *
 * ---------------------------------------------------------------------------
 * Rank pass, 28 Oct 2026 — written for Bing rather than for Google.
 *
 * Bing had this page at average position 6.96 over 19–25 October on 95
 * impressions and zero clicks: inside the first page, and not earning the click.
 * The three things a zero-CTR top-ten result is usually missing are a title that
 * fits, a description that names a number, and an answer in the first paragraph
 * rather than in the fourth section. All three are changed here, and four things
 * the ranking pages have and this one did not are added:
 *
 *   1. a hotel-area × airport table — fastest, cheapest, and whether it arrives
 *      without a transfer, which is the question a reader with a booking has;
 *   2. the per-person arithmetic for four people and for two adults with two
 *      children, which is what decides a car against a bus;
 *   3. one table carrying every option's one-way fare and published time,
 *      including a taxi, which replaces the old duplicate "at a glance" pair;
 *   4. the taxi figure itself. The 25 October draft said no operator published
 *      one, which was true of the five railway and bus operators. Narita
 *      International Airport Corporation does: its own access pages carry the
 *      six-zone flat fare, ¥23,500–¥38,500 with expressway tolls charged on top
 *      and a 22:00–05:00 surcharge. Read on 28 October 2026. Haneda's official
 *      site confirms a flat-fare scheme between the airport, Tokyo and Kanagawa
 *      with tolls extra but publishes no figure and refers readers to the
 *      operators, and the Tokyo Hire-Taxi Association's own fare pages were
 *      offline on 28 October — so no Haneda taxi number appears, and the page
 *      says why rather than estimating one.
 *
 * Also corrected: the last Skyliner. The old draft said "to at least 22:30 from
 * Terminal 1", which was the last departure it could confirm rather than the last
 * one that runs. Keisei's own Skyliner timetable gives #188 at 23:00 from Narita
 * Airport on weekdays (Nippori 23:43, Keisei-Ueno 23:48) and #186 at 22:40 at
 * weekends and on holidays (Nippori 23:23, Keisei-Ueno 23:28), with the first
 * service, #2, at 07:23. Read on 28 October 2026.
 */

/** The day the operators' fares, times and frequencies were read. */
const CHECKED_ISO = "2026-10-25";
const CHECKED = checkedLabel(CHECKED_ISO);

/**
 * The day the taxi flat fares and the Skyliner first/last departures were read.
 * A second date rather than a blanket re-stamp of the first: only these figures
 * were re-read on the 28th, and a row should not claim a check it did not get.
 */
const CHECKED_TAXI_ISO = "2026-10-28";
const CHECKED_TAXI = checkedLabel(CHECKED_TAXI_ISO);

// ---------------------------------------------------------------------------
// The two master tables: every option, with the figure and the operator that
// publishes it. These are the tables an AI answer can lift whole, so each row
// carries its own source rather than relying on one footnote.
// ---------------------------------------------------------------------------

const naritaMasterRows = [
  {
    option: "Keisei Skyliner",
    time: "41 min to Keisei-Ueno",
    fare: "¥2,580 (IC ¥2,567)",
    often: "3 an hour",
    lands: "Nippori, Keisei-Ueno",
    source: "Keisei",
  },
  {
    option: "Narita Express (N'EX)",
    time: "From 53 min to Tokyo Station",
    fare: "¥3,140 Tokyo; ¥3,330 Shinagawa / Shibuya / Shinjuku; ¥4,480 Yokohama",
    often: "Every 30 min",
    lands: "Tokyo, Shinagawa, Shibuya, Shinjuku, Yokohama",
    source: "JR East",
  },
  {
    option: "Keisei Access Express",
    time: "50 min to Asakusa",
    fare: "¥1,280 to Nippori / Keisei-Ueno (IC ¥1,267)",
    often: "Not published as a figure",
    lands: "Nippori, Ueno, Oshiage, Asakusa, Nihombashi, Shinagawa",
    source: "Keisei",
  },
  {
    option: "Keisei Main Line Limited Express",
    time: "Not published as a figure",
    fare: "¥1,060 to Keisei-Ueno (IC ¥1,052)",
    often: "Not published as a figure",
    lands: "Funabashi, Nippori, Keisei-Ueno",
    source: "Keisei",
  },
  {
    option: "Airport Limousine Bus",
    time: "1 h 50 min on the published Tokyo Station timetable",
    fare: "¥3,100 Tokyo Station / T-CAT; ¥3,600 Shinjuku or Shibuya; ¥2,900 Disney resort",
    often: "By route — see the bus guide",
    lands: "Hotel and station stops, no transfer",
    source: "Airport Limousine",
  },
  {
    option: "Flat-fare taxi",
    time: "Traffic-dependent, no published figure",
    fare: "¥23,500–¥38,500 by zone, expressway tolls extra",
    often: "On demand",
    lands: "Your hotel address",
    source: "Narita Airport",
  },
];

const hanedaMasterRows = [
  {
    option: "Keikyu Airport Line",
    time: "11 min to Shinagawa from Terminal 3 (14 min from Terminal 1·2)",
    fare: "¥330 to Shinagawa (IC ¥327)",
    often: "Turn-up-and-go",
    lands: "Shinagawa, and through to Shimbashi, Ginza, Asakusa",
    source: "Keikyu",
  },
  {
    option: "Tokyo Monorail",
    time: "13 min to Hamamatsucho",
    fare: "¥520 adult, ¥260 child",
    often: "About every 5 min",
    lands: "Hamamatsucho, for the Yamanote loop",
    source: "Tokyo Monorail",
  },
  {
    option: "Airport Limousine Bus",
    time: "Traffic-dependent, by route",
    fare: "¥1,200 Tokyo Station; ¥1,300 Shibuya; ¥1,400 Shinjuku / Nakano",
    often: "By route — see the bus guide",
    lands: "Hotel and station stops, no transfer",
    source: "Airport Limousine",
  },
  {
    option: "Late-night / early-morning access bus",
    time: "Traffic-dependent, by route",
    fare: "¥2,800 Shinjuku / Ikebukuro; ¥1,900 Tokyo / Ginza / Asakusa / Akihabara",
    often: "Airport departures 00:00–02:00",
    lands: "A handful of named city stops only",
    source: "Airport Limousine",
  },
  {
    option: "Flat-fare taxi",
    time: "Traffic-dependent, no published figure",
    fare: "Flat-fare scheme confirmed by the airport, no fare published",
    often: "On demand",
    lands: "Your hotel address",
    source: "Haneda Airport",
  },
];

/** Keikyu's own estimated travel times from Haneda, which is the Haneda question. */
const keikyuTimeRows = [
  { dest: "Shinagawa",  t3: "11 min", t12: "14 min" },
  { dest: "Tokyo",      t3: "20 min", t12: "23 min" },
  { dest: "Shimbashi",  t3: "21 min", t12: "24 min" },
  { dest: "Higashi-ginza", t3: "23 min", t12: "26 min" },
  { dest: "Shibuya",    t3: "23 min", t12: "26 min" },
  { dest: "Yokohama",   t3: "23 min", t12: "28 min" },
  { dest: "Shinjuku",   t3: "30 min", t12: "33 min" },
  { dest: "Asakusa",    t3: "34 min", t12: "37 min" },
  { dest: "Ikebukuro",  t3: "38 min", t12: "41 min" },
];

/** What is actually worth buying before you fly, and what it costs if you do. */
const prebuyRows = [
  {
    item: "Skyliner discount ticket",
    price: "¥2,310 one-way, ¥4,500 round trip (normally ¥2,580 / ¥5,160)",
    collect: "e-ticket, or exchanged at the Skyliner counters in Terminals 1 and 2·3",
    worth: "Yes — it is the same train for ¥270 less each way",
  },
  {
    item: "Keisei Skyliner & Tokyo Subway Ticket",
    price: "One-way ¥2,840 / ¥3,240 / ¥3,540 with the 24 / 48 / 72-hour subway pass; round trip ¥4,780 / ¥5,180 / ¥5,480",
    collect: "Airport counters at Narita, or the Skyliner e-ticket site",
    worth: "Yes, if your days in Tokyo are subway days",
  },
  {
    item: "N'EX TOKYO Round Trip Ticket",
    price: "¥5,200 adult, ¥2,600 child, valid 14 days",
    collect: "Picked up only at Narita Airport Terminal 1 or Terminal 2·3 station, passport shown",
    worth: "Yes if you fly out of Narita too — two singles to Shinjuku are ¥6,660",
  },
  {
    item: "Monorail & Yamanote Line Discount Ticket",
    price: "¥590 adult, ¥290 child (normal fares ¥680–¥870)",
    collect: "Ticket machines at the three Haneda monorail stations",
    worth: "Only on the days it is sold — Saturdays, Sundays, holidays and set date ranges",
  },
  {
    item: "Limousine bus + Tokyo Subway Ticket",
    price: "Narita ¥4,200 (1 ride + 24 h) to ¥8,000 (2 rides + 72 h); Haneda ¥2,300 to ¥4,600",
    collect: "QR code or voucher, exchanged at the bus counter",
    worth: "Yes with hold luggage and a subway-heavy itinerary",
  },
  {
    item: "KEIKYU Hanetoku Ticket & Tokyo Subway Ticket",
    price: "¥1,600 / ¥2,100 / ¥2,600 with the 24 / 48 / 72-hour pass",
    collect: "Not sold at Haneda Airport — bought through ANA, JAL MaaS or the Skytree pack",
    worth: "Only if you can buy it before you fly; it covers Terminal 1·2 to Sengakuji",
  },
];

/** The late-arrival and pre-dawn-departure figures, which is where plans break. */
const nightRows = [
  {
    item: "Last Keikyu train, Haneda Terminal 3 → Shinagawa",
    detail: "Departs 00:08, arrives 00:20, weekdays and weekends alike",
    source: "Keikyu",
    checked: CHECKED,
  },
  {
    item: "First Keikyu train, Haneda Terminal 3 → Shinagawa",
    detail: "Departs 05:26, arrives 05:46",
    source: "Keikyu",
    checked: CHECKED,
  },
  {
    item: "Last train back to Haneda from Shinagawa",
    detail: "23:59 weekdays (arrives 00:23); at weekends 23:45 with a change at Keikyu Kamata",
    source: "Keikyu",
    checked: CHECKED,
  },
  {
    item: "Haneda late-night access bus",
    detail: "Leaves the airport between 00:00 and 02:00; ¥2,800 to Shinjuku or Ikebukuro, ¥1,900 to Tokyo, Ginza, Asakusa or Akihabara",
    source: "Airport Limousine",
    checked: CHECKED,
  },
  {
    item: "Haneda early-morning access bus",
    detail: "Leaves the city from about 04:00 for Terminal 3 — the Ikebukuro departure is 03:35, Higashi-shinjuku 03:50, Busta Shinjuku 04:00",
    source: "Airport Limousine",
    checked: CHECKED,
  },
  {
    item: "Last Skyliner from Narita, weekdays",
    detail: "Skyliner 188 departs Narita Airport 23:00 and Terminal 2·3 23:03, reaching Nippori at 23:43 and Keisei-Ueno at 23:48",
    source: "Keisei",
    checked: CHECKED_TAXI,
  },
  {
    item: "Last Skyliner from Narita, weekends and holidays",
    detail: "Skyliner 186 departs Narita Airport 22:40 and Terminal 2·3 22:43, reaching Nippori at 23:23 and Keisei-Ueno at 23:28",
    source: "Keisei",
    checked: CHECKED_TAXI,
  },
  {
    item: "First Skyliner from Narita",
    detail: "Skyliner 2 departs Narita Airport 07:23 and Terminal 2·3 07:27, reaching Nippori at 08:23 and Keisei-Ueno at 08:29",
    source: "Keisei",
    checked: CHECKED_TAXI,
  },
];

/**
 * Every option from both airports in one table, with the one-way fare and the
 * published time side by side — the table that replaced the two near-identical
 * "at a glance" tables the page used to carry, and the one a reader comparing a
 * price against a clock actually wants.
 */
const allOptionRows = [
  { airport: "Narita", option: "Keisei Access Express",            time: "50 min to Asakusa",                fare: "¥1,280 to Nippori / Keisei-Ueno", source: "Keisei" },
  { airport: "Narita", option: "Keisei Main Line Limited Express", time: "Not published as a figure",         fare: "¥1,060 to Keisei-Ueno",           source: "Keisei" },
  { airport: "Narita", option: "Keisei Skyliner",                  time: "41 min to Keisei-Ueno",             fare: "¥2,580 (IC ¥2,567)",              source: "Keisei" },
  { airport: "Narita", option: "Airport Limousine Bus",            time: "1 h 50 min to Tokyo Station",       fare: "¥3,100 Tokyo Station; ¥3,600 Shinjuku or Shibuya", source: "Airport Limousine" },
  { airport: "Narita", option: "Narita Express (N'EX)",            time: "From 53 min to Tokyo Station",      fare: "¥3,140 Tokyo; ¥3,330 Shinagawa / Shibuya / Shinjuku", source: "JR East" },
  { airport: "Narita", option: "Flat-fare taxi",                   time: "Traffic-dependent, no published figure", fare: "¥23,500–¥38,500 by zone, expressway tolls extra", source: "Narita Airport" },
  { airport: "Haneda", option: "Keikyu Airport Line",              time: "11 min to Shinagawa (T3)",          fare: "¥330 to Shinagawa (IC ¥327)",     source: "Keikyu" },
  { airport: "Haneda", option: "Tokyo Monorail",                   time: "13 min to Hamamatsucho",            fare: "¥520 adult, ¥260 child",          source: "Tokyo Monorail" },
  { airport: "Haneda", option: "Airport Limousine Bus",            time: "Traffic-dependent, by route",       fare: "¥1,200 Tokyo Station; ¥1,400 Shinjuku", source: "Airport Limousine" },
  { airport: "Haneda", option: "Late-night access bus",            time: "Airport departures 00:00–02:00",    fare: "¥1,900 Tokyo / Ginza / Asakusa; ¥2,800 Shinjuku / Ikebukuro", source: "Airport Limousine" },
  { airport: "Haneda", option: "Flat-fare taxi",                   time: "Traffic-dependent, no published figure", fare: "Flat-fare scheme confirmed, no fare published", source: "Haneda Airport" },
];

/**
 * Hotel area against airport — fastest, cheapest, and whether anything arrives
 * without a transfer. Every figure in here already appears above with its
 * operator; nothing new is asserted, it is only sorted by the question a reader
 * with a confirmed booking is actually asking.
 */
const areaRows = [
  {
    area: "Shinjuku",
    naritaFast: "N'EX, direct, ¥3,330",
    naritaCheap: "Access Express to Nippori ¥1,280, then the Yamanote loop",
    hanedaFast: "Keikyu, 30 min from Terminal 3 (33 from Terminal 1·2), one change",
    direct: "N'EX from Narita; limousine bus both ways (¥3,600 / ¥1,400)",
  },
  {
    area: "Shibuya",
    naritaFast: "N'EX, direct, ¥3,330",
    naritaCheap: "Access Express to Nippori ¥1,280, then the Yamanote loop",
    hanedaFast: "Keikyu, 23 min from Terminal 3 (26 from Terminal 1·2)",
    direct: "N'EX from Narita; limousine bus both ways (¥3,600 / ¥1,300)",
  },
  {
    area: "Tokyo Station / Marunouchi",
    naritaFast: "N'EX, from 53 min, ¥3,140",
    naritaCheap: "Access Express to Nippori ¥1,280, then the Yamanote loop",
    hanedaFast: "Keikyu, 20 min from Terminal 3; or monorail ¥520 to Hamamatsucho in 13 min",
    direct: "N'EX from Narita; limousine bus both ways (¥3,100 / ¥1,200)",
  },
  {
    area: "Ueno / Asakusa",
    naritaFast: "Skyliner, 41 min to Keisei-Ueno, ¥2,580",
    naritaCheap: "Keisei Main Line Limited Express ¥1,060 to Keisei-Ueno",
    hanedaFast: "Keikyu, 34 min to Asakusa from Terminal 3, no change",
    direct: "Yes from both — Skyliner or Access Express from Narita, Keikyu through to Asakusa from Haneda",
  },
  {
    area: "Ginza",
    naritaFast: "N'EX to Tokyo Station ¥3,140, then one subway stop",
    naritaCheap: "Access Express straight through to Higashi-ginza, no change",
    hanedaFast: "Keikyu, 23 min to Higashi-ginza from Terminal 3",
    direct: "Access Express from Narita; Keikyu from Haneda",
  },
];

/**
 * Narita International Airport Corporation's own six-zone flat taxi fare, read
 * on 28 Oct 2026. Two columns because the airport prices the two expressway
 * routings separately. Tolls are charged on top of every figure here.
 */
const naritaTaxiRows = [
  { zone: "A", wards: "Edogawa, Katsushika, Adachi",                                        keiyo: "¥23,500", bay: "¥26,500" },
  { zone: "B", wards: "Koto, Sumida, Minato (Odaiba), Shinagawa (Higashi-yashio)",          keiyo: "¥28,000", bay: "¥28,000" },
  { zone: "C", wards: "Chuo, Chiyoda, Taito, Bunkyo, Arakawa",                              keiyo: "¥29,000", bay: "¥31,000" },
  { zone: "D", wards: "Shinjuku, Toshima, Nakano, Shibuya, Meguro, Minato, Shinagawa, Ota", keiyo: "¥31,500", bay: "¥32,500" },
  { zone: "E", wards: "Itabashi, Kita, Nerima",                                             keiyo: "¥34,000", bay: "¥36,000" },
  { zone: "F", wards: "Setagaya, Suginami, Mitaka, Musashino",                              keiyo: "¥35,500", bay: "¥38,500" },
];

/**
 * The per-person arithmetic, which is the whole family question and the one thing
 * none of the ranking pages does. Every figure is the published one-way fare above
 * multiplied out — no new fare is introduced, and where an operator publishes no
 * child fare the cell says so instead of halving the adult one.
 */
const familyRows = [
  {
    option: "Keisei Access Express + Yamanote",
    route: "Narita → Nippori → Shinjuku",
    four: "¥5,120, plus the Yamanote hop",
    each: "¥1,280",
    kids: "Child fare not published for this routing",
  },
  {
    option: "Keisei Skyliner + Yamanote",
    route: "Narita → Nippori → Shinjuku",
    four: "¥10,320, plus the Yamanote hop",
    each: "¥2,580",
    kids: "¥1,290 a child, so two adults and two children are ¥7,740",
  },
  {
    option: "Narita Express (N'EX)",
    route: "Narita → Shinjuku, direct",
    four: "¥13,320",
    each: "¥3,330",
    kids: "Round-trip ticket ¥2,600 a child, ¥5,200 an adult",
  },
  {
    option: "Airport Limousine Bus",
    route: "Narita → Shinjuku, direct, bags in the hold",
    four: "¥14,400",
    each: "¥3,600",
    kids: "Child fare not published for the Narita routes",
  },
  {
    option: "Flat-fare taxi, zone D",
    route: "Narita → Shinjuku, to the door",
    four: "¥31,500–¥32,500 plus tolls",
    each: "¥7,875–¥8,125 plus tolls",
    kids: "Same fare — the vehicle is priced, not the seat",
  },
  {
    option: "Keikyu Airport Line",
    route: "Haneda → Shinagawa, then one change",
    four: "¥1,320 for the airport leg",
    each: "¥330",
    kids: "Child fare not published on the pages read",
  },
  {
    option: "Airport Limousine Bus",
    route: "Haneda → Shinjuku, direct",
    four: "¥5,600",
    each: "¥1,400",
    kids: "¥700 a child, so two adults and two children are ¥4,200",
  },
  {
    option: "Tokyo Monorail",
    route: "Haneda → Hamamatsucho, then the Yamanote loop",
    four: "¥2,080 for the airport leg",
    each: "¥520",
    kids: "¥260 a child, so two adults and two children are ¥1,560",
  },
];

const nexGuidePoints = [
  {
    title: "Covered by the JR Pass",
    desc: "The N'EX is a JR service, so JR Pass holders travel free, reserved seat included. If you have a 7-day or 14-day pass, this is the obvious first-day option from Narita. Reserve a seat at the airport's JR ticket counter (Midori no Madoguchi).",
  },
  {
    title: "Direct connections to major stations",
    desc: "The N'EX runs to Tokyo, Shinagawa, Shibuya, Shinjuku, Ikebukuro and Yokohama without changing trains. For travellers staying in west Tokyo, that is hard to beat for convenience with luggage.",
  },
  {
    title: "A round-trip ticket for foreign passport holders",
    desc: `JR East sells the N'EX TOKYO Round Trip Ticket at ¥5,200 for adults and ¥2,600 for children, valid 14 days for one outbound and one return journey in a reserved ordinary-car seat. Two singles to Shinjuku are ¥6,660, so it saves ¥1,460. It is picked up only at Narita Airport Terminal 1 or Terminal 2·3 station, on presentation of a non-Japanese passport. Read on ${CHECKED}.`,
  },
  {
    title: "Every 30 minutes, and the fare moves with the season",
    desc: `JR East states that trains run to Tokyo, Shinjuku and Yokohama every 30 minutes for most of the day, and that the reserved-seat portion of the fare is ¥200 lower in the off-season and ¥200 higher in the busy season. So the ¥3,140 and ¥3,330 figures are the regular-season ones. Read on ${CHECKED}.`,
  },
];

const skylinerPoints = [
  {
    title: "Keisei's fastest train into town",
    desc: `Keisei puts the Skyliner at 41 minutes from Narita Airport Terminal 2·3 to Ueno, and describes the run into the heart of Tokyo as "as little as 36 minutes". From Nippori it is a short JR or subway ride to most Tokyo neighbourhoods. Read on ${CHECKED}.`,
  },
  {
    title: "¥2,580, in two parts",
    desc: `The fare is a ¥1,280 section fare plus a ¥1,300 Liner ticket — ¥2,580 in total, or ¥2,567 if you tap an IC card for the fare half. Children are ¥1,290. Keisei's English fare tables still show the older ¥2,470; its Japanese ticket page and its own FAQ both give ¥2,580, which is the figure used here. Read on ${CHECKED}.`,
  },
  {
    title: "Not covered by the JR Pass",
    desc: "The Skyliner runs on the Keisei private railway, not JR. JR Pass holders cannot use it. Keisei does sell a combined Skyliner + Tokyo Subway 24/48/72-hour ticket, which is the better deal if you plan to explore Tokyo by metro.",
  },
  {
    title: "Three an hour, and a cheaper ticket if you book it",
    desc: `Keisei states the Skyliner runs three services an hour. Its own discount ticket is ¥2,310 one-way and ¥4,500 return against ¥2,580 and ¥5,160 at the counter, bought as an e-ticket or exchanged at the airport Skyliner counters. Read on ${CHECKED}.`,
  },
  {
    title: "Best for travellers heading to east or north Tokyo",
    desc: "If your hotel is in Asakusa, Ueno, Akihabara, or anywhere served by the Tokyo Metro/Toei lines, the Skyliner + subway combination is often faster and cheaper than the N'EX.",
  },
];

const skylinerVsNexRows = [
  { feature: "Operator",        skyliner: "Keisei (private rail)",   nex: "JR East" },
  { feature: "One-way fare",    skyliner: "¥2,580 (IC ¥2,567)",      nex: "¥3,140 to Tokyo, ¥3,330 to Shinjuku" },
  { feature: "Published time",  skyliner: "41 min to Keisei-Ueno",   nex: "From 53 min to Tokyo Station" },
  { feature: "Covered by JR Pass", skyliner: "No",                   nex: "Yes — free, reserved seat included" },
  { feature: "IC card on fare", skyliner: "Fare half only, not the Liner ticket", nex: "Yes" },
  { feature: "Direct stops",    skyliner: "Nippori, Keisei-Ueno",    nex: "Tokyo, Shinagawa, Shibuya, Shinjuku, Ikebukuro, Yokohama" },
  { feature: "Frequency",       skyliner: "3 an hour",               nex: "Every 30 min" },
  { feature: "Cheapest way to buy", skyliner: "Discount ticket ¥2,310 one-way, ¥4,500 return", nex: "Round Trip Ticket ¥5,200 for 14 days" },
];

const destinationRows = [
  { dest: "Nippori",              pick: "Skyliner", note: "The fastest train link to central Tokyo, and a cross-platform change to the Yamanote loop." },
  { dest: "Keisei Ueno",          pick: "Skyliner", note: "Skyliner terminus, 41 minutes from Terminal 2·3 on Keisei's own figure." },
  { dest: "Asakusa / Akihabara",  pick: "Skyliner or Access Express", note: "Skyliner to Ueno/Nippori then a short hop, or the Access Express straight through to Asakusa in 50 minutes." },
  { dest: "Tokyo Station",        pick: "N'EX",     note: "From 53 minutes direct, no transfer, ¥3,140." },
  { dest: "Shibuya",              pick: "N'EX",     note: "Direct on the same train, ¥3,330." },
  { dest: "Shinjuku",             pick: "N'EX",     note: "Direct — no dragging bags through transfers — ¥3,330." },
  { dest: "Yokohama",             pick: "N'EX",     note: "Direct at ¥4,480, the obvious choice south of Tokyo." },
];

const busFareRows = [
  { airport: "Narita (NRT)", time: "1 h 50 min on the published Tokyo Station timetable", price: "¥2,900–3,600",  note: "By route: ¥2,900 Disney, ¥3,100 Tokyo Station, ¥3,600 Shinjuku" },
  { airport: "Haneda (HND)", time: "Traffic-dependent, much shorter",  price: "¥1,000–1,400",  note: "¥1,200 Tokyo Station, ¥1,300 Shibuya, ¥1,400 Shinjuku" },
];

const busPoints = [
  {
    title: "Ideal for heavy or oversized luggage",
    desc: "The Airport Limousine Bus loads luggage into the cargo hold — you don't have to wrestle bags through train carriages and up escalators. Particularly useful for families, those with ski gear, or travellers with large suitcases.",
  },
  {
    title: "Direct routes to major hotels",
    desc: "Many limousine bus services stop directly at major hotel areas: Shinjuku, Shibuya, Tokyo Station, Akasaka, Ikebukuro. Some routes stop at individual hotels. Check the TCAT (Tokyo City Air Terminal) schedule for routes.",
  },
  {
    title: "Zero transfers — and later running hours",
    desc: "Many routes run directly to major hotels and districts, so you board once and get off near your door — ideal with young children, elderly travellers, or a lot of gear. Airport buses also run later into the evening than most airport trains, so if you land after the trains wind down the bus is often the cheapest option left before a taxi. Confirm the last departure for your route.",
  },
  {
    title: "Subject to traffic delays",
    desc: "Tokyo traffic on the expressway can be severe during peak hours (7–9am, 5–8pm). Budget extra time if travelling during rush hour, or consider taking the train and sending heavy luggage via takkyubin (luggage delivery service) to your hotel.",
  },
  {
    title: "Book ahead in busy periods",
    desc: "Pre-booking guarantees a seat on popular routes during peak travel seasons, locks in your fare, and saves queuing at the airport counter after a long flight.",
  },
];

const transferTips = [
  {
    title: "Set up your IC card before you land",
    desc: "An IC card (Suica or Pasmo) loaded via the Suica app lets you tap through train gates the moment you arrive. No queueing at ticket machines. If you don't have one, IC card machines at Narita and Haneda have English interfaces. One caveat from Keisei: an IC card covers the Skyliner's ¥1,280 fare half, not the ¥1,300 Liner ticket, which is bought separately.",
  },
  {
    title: "Late-night arrivals have limited options",
    desc: `From Haneda the last Keikyu train to Shinagawa leaves Terminal 3 at 00:08, and after that the choice is the late-night access bus (airport departures between 00:00 and 02:00, ¥2,800 to Shinjuku or Ikebukuro, ¥1,900 to Tokyo, Ginza, Asakusa or Akihabara) or a car. From Narita the last Skyliner leaves the airport at 23:00 on weekdays and 22:40 at weekends and on holidays. Haneda publishes no taxi fare at all, and Narita's flat fare starts at ¥23,500 before tolls, so budget for a booked transfer instead of guessing. Times and bus fares read on ${CHECKED}; the Skyliner departures and the taxi fares on ${CHECKED_TAXI}.`,
  },
  {
    title: "JR Pass users: validate the pass before boarding",
    desc: "If you arrive at Narita with a JR Pass exchange order, validate it at the JR East Travel Service Center in the arrivals hall before attempting to board the N'EX. The exchange order alone does not get you through the gate.",
  },
  {
    title: "Consider luggage forwarding (takkyubin)",
    desc: "Japan's takkyubin courier services (Yamato Transport is the most common) ship your luggage from the airport to your hotel, usually arriving the next day. This lets you travel light by train and frees you from dragging heavy cases through stations. Prices are set by the courier rather than by any of the operators above, so check the counter in the arrivals hall for your own bag size.",
  },
];

const faqItems = [
  {
    q: "What is the cheapest way from Narita to Tokyo?",
    a: `The cheapest train is the Keisei Main Line Limited Express at ¥1,060 to Keisei-Ueno (IC ¥1,052) — the ordinary service via Keisei-Narita, with no limited-express surcharge despite the name. The Access Express, which runs the faster Narita Sky Access route, is ¥1,280 to Nippori or Keisei-Ueno (IC ¥1,267) and reaches Asakusa in 50 minutes. Neither needs a reservation. If you hold a JR Pass, the Narita Express is already paid for and is the better ride. Fares read from Keisei on ${CHECKED}.`,
  },
  {
    q: "Narita Express or Skyliner: which is faster?",
    a: `On the operators' own figures the Skyliner is faster to east Tokyo and the N'EX is faster to west Tokyo. Keisei puts the Skyliner at 41 minutes from Terminal 2·3 to Keisei-Ueno; JR East puts the N'EX at "as fast as 53 minutes" to Tokyo Station. But the Skyliner only serves Nippori and Keisei-Ueno, so if your hotel is in Shinjuku, Shibuya or Yokohama the N'EX usually wins overall because it goes there without a transfer. The Skyliner is also ¥2,580 against ¥3,140 to Tokyo, and ¥2,310 if you buy Keisei's own discount ticket. Read on ${CHECKED}.`,
  },
  {
    q: "How do I get from Haneda to Shinjuku?",
    a: `Three ways. The Keikyu Airport Line is the quickest — Keikyu's own estimate is 30 minutes from Terminal 3 to Shinjuku, 33 from Terminal 1·2, with one change; the airport-to-Shinagawa leg alone is ¥330. The Tokyo Monorail reaches Hamamatsucho in 13 minutes for ¥520, then the Yamanote loop round to Shinjuku. The Airport Limousine Bus runs straight to the Shinjuku and Nakano stops for ¥1,400 (¥700 child) with your bags in the hold. With one suitcase each, take the train; with three, take the bus. Read on ${CHECKED}.`,
  },
  {
    q: "Should I book an airport transfer in advance?",
    a: `For the trains, booking ahead is about price rather than availability: the Skyliner discount ticket is ¥2,310 one-way instead of ¥2,580, the N'EX TOKYO Round Trip Ticket is ¥5,200 instead of ¥6,660 in singles to Shinjuku, and the Skyliner + Tokyo Subway combination starts at ¥2,840. All of them are collected at the airport, so you still need to allow for the counter. The things that genuinely need booking are the ones with a fixed vehicle: reserved limousine bus routes in peak season, and any private or shared car transfer, especially for a flight landing after the last train. Read on ${CHECKED}.`,
  },
  {
    q: "What happens if I land after the last train?",
    a: `From Haneda the last Keikyu train leaves Terminal 3 for Shinagawa at 00:08 and arrives at 00:20. After that the official option is the late-night access bus, which leaves the airport between 00:00 and 02:00 at ¥2,800 for Shinjuku or Ikebukuro and ¥1,900 for Tokyo, Ginza, Asakusa or Akihabara — and it serves only those named stops. From Narita the last Skyliner leaves the airport at 23:00 on a weekday and 22:40 at a weekend, reaching Keisei-Ueno at 23:48 and 23:28. Beyond those, a booked car is the only thing that reaches an arbitrary address, which is the one case where paying for a transfer rather than a ticket is the obvious call. Train times read on ${CHECKED}, the Skyliner departures on ${CHECKED_TAXI}.`,
  },
  {
    q: "How long does it take from Haneda to central Tokyo?",
    a: `Haneda is much closer to the city than Narita. On Keikyu's own estimates, Terminal 3 to Shinagawa is 11 minutes, Tokyo 20, Shibuya 23, Yokohama 23, Shinjuku 30, Asakusa 34 and Ikebukuro 38; from Terminal 1·2 add about three minutes. The Tokyo Monorail reaches Hamamatsucho in 13 minutes and runs about every five minutes. Read on ${CHECKED}.`,
  },
  {
    q: "Can I use my IC card from Narita Airport?",
    a: "Yes — IC cards (Suica and Pasmo) work on the Keisei trains and on the N'EX from Narita. On the Skyliner the IC card covers the ¥1,280 fare portion only (¥1,267 by IC); the ¥1,300 Liner ticket is bought separately. At Haneda, IC cards work on both the Keikyu Line and Tokyo Monorail. Load your IC card at any ticket machine in the airport arrivals hall.",
  },
  {
    q: "Is the Narita Express worth it?",
    a: `If you have a JR Pass, absolutely — it is free, including the reserved seat, and the most comfortable option. Without a pass it is ¥3,140 to Tokyo Station and ¥3,330 to Shinagawa, Shibuya or Shinjuku, which buys a direct ride with no transfer; the ¥5,200 round-trip ticket makes it better value again if you fly home from Narita. The reserved-seat part of the fare is ¥200 lower off-season and ¥200 higher in the busy season. Read on ${CHECKED}.`,
  },
  {
    q: "How do I get from Narita to Shinjuku?",
    a: `The simplest option is the Narita Express, which runs directly to Shinjuku for ¥3,330 (free with a JR Pass) with no change of train. The alternative is the Keisei Skyliner to Nippori — 41 minutes to Keisei-Ueno on Keisei's figure — followed by the JR Yamanote Line, which is cheaper at ¥2,580 but puts a transfer and a flight of stairs between you and your hotel. The limousine bus runs to the Shinjuku stops for ¥3,600 with your bags in the hold. Read on ${CHECKED}.`,
  },
  {
    q: "Can I use the Skyliner with a JR Pass?",
    a: "No. The Skyliner runs on the Keisei private railway, which the Japan Rail Pass does not cover. JR Pass holders should take the N'EX, which is a JR East service and free with the pass, reserved seat included. If you don't have a JR Pass, the Skyliner is a strong option for east Tokyo.",
  },
  {
    q: "Is the airport limousine bus better than the train in Tokyo?",
    a: "It depends on your priorities. The bus wins when you have heavy luggage, want a transfer-free ride to your hotel, land late at night, or are staying right by a bus stop. The train wins on speed and predictability, especially in rush-hour traffic. For most light-luggage travellers heading to a station-side hotel, the train is faster; for everyone hauling big suitcases, the bus is easier.",
  },
  {
    q: "What time does the last train leave Narita?",
    a: `For the Skyliner, Keisei's own timetable gives the last departure from Narita Airport station as 23:00 on weekdays — Skyliner 188, calling at Terminal 2·3 at 23:03, Nippori at 23:43 and Keisei-Ueno at 23:48 — and 22:40 at weekends and on holidays, which is Skyliner 186, reaching Nippori at 23:23 and Keisei-Ueno at 23:28. The first service of the day is Skyliner 2 at 07:23, arriving Keisei-Ueno at 08:29. Ordinary Keisei services run a little later than the last Skyliner, but Keisei does not publish a single figure for them on the Skyliner timetable, so check your own date. Read on ${CHECKED_TAXI}.`,
  },
  {
    q: "How much is a taxi from Narita or Haneda to Tokyo?",
    a: `From Narita there is a published flat fare in six zones, set by the airport: ¥23,500–¥26,500 for Edogawa, Katsushika and Adachi; ¥28,000 for Koto, Sumida, Odaiba and Higashi-yashio; ¥29,000–¥31,000 for Chuo, Chiyoda, Taito, Bunkyo and Arakawa; ¥31,500–¥32,500 for Shinjuku, Toshima, Nakano, Shibuya, Meguro, Minato, Shinagawa and Ota; ¥34,000–¥36,000 for Itabashi, Kita and Nerima; and ¥35,500–¥38,500 for Setagaya, Suginami, Mitaka and Musashino. The two figures in each range are the two expressway routings, expressway tolls are charged on top, and a surcharge applies between 22:00 and 05:00. From Haneda the airport confirms a flat-fare scheme covering Tokyo and Kanagawa with tolls extra but publishes no amount, so we do not print one. Read on ${CHECKED_TAXI}.`,
  },
  {
    q: "Is a private transfer worth it for 4 people?",
    a: `Not on price alone. Multiply the published fares out for four adults from Narita to Shinjuku and the limousine bus is ¥14,400, or ¥3,600 each, with the bags in the hold; the N'EX is ¥13,320, or ¥3,330 each; and the flat-fare taxi is ¥31,500–¥32,500 plus tolls, which is ¥7,875–¥8,125 each. From Haneda the gap is wider still, because the Keikyu leg to Shinagawa is ¥330 a head. A car is worth it when the problem is not the fare — a landing after the last train (00:08 at Haneda, 23:00 or 22:40 at Narita), a hotel that no bus route stops at, more cases than hands, or a party of five or more, where a 7- or 10-seater is priced per vehicle rather than per seat. Fares read on ${CHECKED}, the taxi zones on ${CHECKED_TAXI}.`,
  },
  {
    q: "How much is the limousine bus from Narita and Haneda?",
    a: `There is no single fare per airport — the operator prices each route. From Narita it runs ¥2,900 to the Disney resort, ¥3,100 to Tokyo Station and T-CAT, and ¥3,600 to Shinjuku or Shibuya; the published Tokyo Station timetable shows a run of about 1 hour 50 minutes. From Haneda it is ¥1,200 to Tokyo Station, ¥1,300 to Shibuya and ¥1,400 to Shinjuku or Nakano. Read on ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/tokyo-airport-transfer") } });

// The search terms stay verbatim in the title, the H1 and the description:
// "Tokyo airport transfer" is the page's own term and leads both the title and
// the H1 as an exact phrase, and "Narita to Tokyo", "Haneda to Tokyo" and
// "N'EX vs Skyliner" are the three things readers type.
//
// 53 characters, well inside the 60 the en budget allows, because Bing truncates
// earlier than Google and this page was taking 95 impressions a week there at
// position 6.96 for no clicks. The description carries the four words that
// Bing bolds against this query — cheapest, fastest, prices, times — and three
// numbers, because a top-ten result with no number in its snippet is what a
// zero-CTR result looks like.
const TITLE = "Tokyo Airport Transfer 2026: Narita & Haneda to Tokyo";
const DESC =
  "Tokyo airport transfer prices and times, checked at source: the cheapest Narita to Tokyo is ¥1,060, the fastest 41 min; Haneda is ¥330 in 11 min.";

export default function TokyoAirportTransferPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/tokyo-airport-transfer" />
        {hreflangLinks("/guides/transport/tokyo-airport-transfer")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/tokyo-airport-transfer" />
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
              route: "/guides/transport/tokyo-airport-transfer",
              headline: TITLE,
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
                { "@type": "ListItem", position: 1, name: "Home",                    item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",                  item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport & Getting Around", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Tokyo Airport Transfer",  item: "https://www.japan-travel-kit.com/guides/transport/tokyo-airport-transfer" },
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
          <span className={styles.breadCurrent}>Tokyo Airport Transfer</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Airport Transfer 2026:<br />Narita &amp; Haneda to Tokyo, N&apos;EX vs Skyliner
          </h1>
          <p className={styles.heroSubtitle}>
            Every fare and journey time below comes from the operators&apos; own sites, read on {CHECKED}; the taxi
            flat fares and the first and last Skyliner on {CHECKED_TAXI}.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Narita & Haneda", "N'EX vs Skyliner"].map((t) => (
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

        {/* The answer, in three sentences, before anything else in the body — the
            hero subtitle above is a note on sourcing, not an answer to the question.
            Fastest and cheapest for both airports, each with its time and its fare,
            because that is the pair of words the query is built out of. */}
        <p className={styles.bodyText}>
          From <strong>Narita</strong>, the fastest <strong>Tokyo airport transfer</strong> is the{" "}
          <strong>Keisei Skyliner</strong> — <strong>41 minutes</strong> to Keisei-Ueno for{" "}
          <strong>¥2,580</strong> — and the cheapest is the{" "}
          <strong>Keisei Main Line Limited Express at ¥1,060</strong>; for <strong>Tokyo Station</strong> the{" "}
          <strong>Narita Express (N&apos;EX)</strong> is <strong>¥3,140</strong> in{" "}
          <strong>as little as 53 minutes</strong>, and free with a JR Pass. From <strong>Haneda</strong> the
          fastest and the cheapest are the same train: the <strong>Keikyu Airport Line</strong> reaches{" "}
          <strong>Shinagawa in 11 minutes for ¥330</strong>, and the <strong>Tokyo Monorail</strong> reaches{" "}
          <strong>Hamamatsucho in 13 minutes for ¥520</strong>. Those are one-way adult fares read from JR East,
          Keisei, Keikyu, Tokyo Monorail and Airport Limousine on {CHECKED}; a flat-fare taxi from Narita is{" "}
          <strong>¥23,500–¥38,500</strong> by zone with tolls on top, read from Narita Airport on {CHECKED_TAXI}.
        </p>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest from Narita</p>
                <p className={styles.verdictStatValue}>Keisei Main Line LE (¥1,060)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fastest from Narita</p>
                <p className={styles.verdictStatValue}>Keisei Skyliner (41 min)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest from Haneda</p>
                <p className={styles.verdictStatValue}>Keikyu to Shinagawa (¥330)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Rule of thumb:</strong> Use the <strong>Narita Express (N&apos;EX)</strong> if you have a JR Pass or are heading to west Tokyo (Shinjuku, Shibuya, Yokohama).
              Use the <strong>Keisei Skyliner</strong> if you&apos;re heading to Ueno or east Tokyo. From <strong>Haneda</strong>, take the Keikyu Line — it&apos;s fast, cheap, and easy.
            </p>
          </div>
        </div>

        {/* Hotel area against airport — the question a reader with a booking has,
            and the one thing every page ranking above this one leaves out. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By hotel area</span>
          <h2 className={styles.sectionTitle}>Which Tokyo airport transfer is best for my hotel area?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            If you already know where you are sleeping, this is the only table you need. Read your area across:
            the fastest option, the cheapest option, and whether anything gets you there without putting a
            suitcase on a transfer. West Tokyo is N&apos;EX country from Narita; the east side belongs to Keisei;
            from Haneda the Keikyu Line reaches all five.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Hotel area", "Fastest from Narita", "Cheapest from Narita", "Fastest from Haneda", "Arrives without a transfer"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.area}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.naritaFast}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.naritaCheap}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hanedaFast}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.direct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fares and Narita times read on {CHECKED} from JR East, Keisei and Airport Limousine; the Haneda times
            are Keikyu&apos;s own estimates, which exclude the transfer itself. Still choosing the room? Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo</Link> guide ranks the
            same areas by line and airport, and the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">5-day Tokyo itinerary</Link> shows which side of
            the loop a longer trip actually spends its days on.
          </p>
        </section>

        {/* Every option, one table — this replaced the two near-identical "at a
            glance" tables the page used to carry, and is where the Klook ticket
            CTA sits because it is the point where a reader has picked a train. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price and time</span>
          <h2 className={styles.sectionTitle}>How much is a Tokyo airport transfer, and how long does it take?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Eleven options, both airports, one-way adult fare against the operator&apos;s own published journey
            time, cheapest first within each airport. The spread is the story: from Narita the range is{" "}
            <strong>¥1,060 to ¥38,500</strong>, and from Haneda the cheapest ride into the city costs{" "}
            <strong>¥330</strong>. Where an operator publishes no figure, the cell says so.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Airport", "Option", "Published journey time", "One-way adult fare", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allOptionRows.map((row) => (
                    <tr key={`${row.airport}-${row.option}`}>
                      <td style={{ fontSize: "0.85rem" }}>{row.airport}</td>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        {row.source}, {row.option === "Flat-fare taxi" ? CHECKED_TAXI : CHECKED}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={keiseiSkylinerUrl} className={styles.verdictBtn} target="_blank" rel="sponsored noopener">
              Skyliner tickets on Klook →
            </KlookLink>
            <KlookLink href={naritaExpressRoundTripUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              N&apos;EX round-trip tickets on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook listings open in a new tab, and we print no Klook price: Klook blocks automated reads of its
            product pages, so no figure here could be verified. The railway fares above are the counter fares —
            both operators sell a cheaper visitor ticket, which is the{" "}
            <a href="#prebuy" style={{ color: "var(--text)", fontWeight: 600 }}>pre-buy table</a> further down.
          </p>
        </section>

        {/* Narita master table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Narita Airport (NRT)</span>
          <h2 className={styles.sectionTitle}>How do I get from Narita Airport to central Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Six ways, and the honest ranking is by where you are sleeping rather than by speed. Narita is roughly
            60–70 km east of the city, so every option is a commitment: the fastest train is 41 minutes and the
            cheapest is ¥1,060. Fares are one-way adult figures; where an operator publishes no number, the cell
            says so rather than guessing.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Published journey time", "One-way adult fare", "How often", "Where it drops you"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {naritaMasterRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.often}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.lands}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read on {CHECKED}: Skyliner and Keisei fares from Keisei&apos;s Japanese Skyliner ticket page and its English
            FAQ (¥1,280 section fare + ¥1,300 Liner ticket), journey times from Keisei&apos;s English route pages; N&apos;EX
            fares and the 30-minute frequency from JR East; bus fares and the Tokyo Station timetable from Airport
            Limousine. Keisei&apos;s English fare tables still show the pre-2025 ¥2,470 Skyliner fare — the current ¥2,580
            is used here. No taxi fare appears because none of these operators publishes one.
          </p>
        </section>

        {/* Haneda master table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Haneda Airport (HND)</span>
          <h2 className={styles.sectionTitle}>How do I get from Haneda Airport to central Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Haneda is 15–20 km from central Tokyo and the transfer is a city journey rather than an expedition:
            ¥330 and 11 minutes puts you at Shinagawa on the Yamanote loop. The question at Haneda is almost never
            speed — it is luggage, and the hour your flight lands.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Published journey time", "One-way adult fare", "How often", "Where it drops you"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hanedaMasterRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.often}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.lands}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read on {CHECKED}: Keikyu fares and estimated travel times from the Keikyu airport-access site; monorail
            fares and the 13-minute, five-minute-interval figures from Tokyo Monorail; bus and access-bus fares from
            Airport Limousine. The ¥330 Keikyu figure is the Terminal 3 to Shinagawa fare (IC ¥327) — fares beyond
            Shinagawa depend on the connecting line.
          </p>
        </section>

        {/* Cheapest — the query, answered under the query. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Cheapest</span>
          <h2 className={styles.sectionTitle}>What is the cheapest way from Narita to Tokyo?</h2>
          <p className={styles.bodyText}>
            The <strong>Keisei Main Line Limited Express at ¥1,060</strong> to Keisei-Ueno (IC ¥1,052). It is an
            ordinary commuter limited express, not a premium train, so despite the name there is no surcharge and no
            reservation — you walk on. Keisei does not publish a single journey time for it, which is the one thing
            you are giving up along with the luggage space.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>¥1,060 — Keisei Main Line Limited Express</strong> to Keisei-Ueno, via Keisei-Narita and Funabashi. The cheapest train from the airport, full stop.</li>
            <li><strong>¥1,280 — Keisei Access Express</strong> to Nippori or Keisei-Ueno (IC ¥1,267), on the faster Narita Sky Access route. Keisei puts it at 50 minutes through to Asakusa, and it runs on into Nihombashi, Shimbashi and Shinagawa without a change.</li>
            <li><strong>¥2,580 — Keisei Skyliner</strong>, or ¥2,310 with Keisei&apos;s own discount ticket. You are paying the ¥1,300 Liner ticket for a reserved seat, a luggage rack and 41 minutes.</li>
            <li><strong>¥0 — the N&apos;EX, if you hold a JR Pass.</strong> The reserved seat is included, which makes it the cheapest comfortable option for pass holders by a wide margin.</li>
          </ul>
          <p className={styles.bodyText}>
            That is the whole ladder: ¥1,060 buys the slowest ride, ¥2,580 buys the fastest, and the ¥1,280 Access
            Express is the one most people should take if money matters and a reserved seat does not. Fares read from
            Keisei on {CHECKED}; the Main Line figure is the one printed on Keisei&apos;s own station fare tables.
          </p>
        </section>

        {/* Which airport is closer — the old "at a glance" pair of tables lived here
            and said nothing the two master tables above had not already said. The
            one fact in its footnote was the comparison between the airports, which
            is a question people type, so it is now a section with its own heading. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Narita vs Haneda</span>
          <h2 className={styles.sectionTitle}>Which Tokyo airport is closer to the city?</h2>
          <p className={styles.bodyText}>
            <strong>Haneda</strong>, by a wide margin, and the operators&apos; own numbers show how wide. Keikyu
            puts <strong>Haneda Terminal 3 to Shinagawa at 11 minutes for ¥330</strong>; the fastest published
            train out of <strong>Narita</strong> is the Skyliner at <strong>41 minutes to Keisei-Ueno for
            ¥2,580</strong>, and the fastest to Tokyo Station is the N&apos;EX at{" "}
            <strong>&ldquo;as fast as 53 minutes&rdquo; for ¥3,140</strong>. So arriving at Haneda saves roughly
            half an hour and about <strong>¥2,250</strong> a head before you have left the airport. Narita is
            around 60–70 km east of the city; Haneda is 15–20 km south of it, which is why one journey is a
            commitment and the other is a city train ride.
          </p>
          <p className={styles.bodyText}>
            That matters when you are still choosing flights. If the Narita fare is more than about ¥2,500 cheaper
            per person than the Haneda one, the transfer cancels the saving out — and the same arithmetic runs the
            other way on the day you leave, because a pre-dawn departure from Narita starts before the Skyliner
            does. Figures read on {CHECKED}.
          </p>
        </section>

        {/* N'EX Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Narita Express</span>
          <h2 className={styles.sectionTitle}>How does the Narita Express (N&apos;EX) work?</h2>
          <p className={styles.bodyText}>
            It is JR East&apos;s all-reserved limited express from both Narita terminals into Tokyo, Shinagawa, Shibuya,
            Shinjuku, Ikebukuro and Yokohama — one train, no transfer, every 30 minutes for most of the day. You need
            both a fare ticket and a limited express ticket, which is what the single figures below cover.
          </p>
          <div className={styles.stepsList}>
            {nexGuidePoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={naritaExpressRoundTripUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Check N&apos;EX round-trip tickets on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Skyliner Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Keisei Skyliner</span>
          <h2 className={styles.sectionTitle}>How does the Keisei Skyliner work?</h2>
          <p className={styles.bodyText}>
            It is Keisei&apos;s reserved-seat express along the Narita Sky Access line to Nippori and Keisei-Ueno — the
            fastest train out of Narita, three an hour, and the one that is not covered by the JR Pass.
          </p>
          <div className={styles.stepsList}>
            {skylinerPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={keiseiSkylinerUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Check Skyliner tickets on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Skyliner vs N'EX — the comparison the search queries ask for. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head-to-head</span>
          <h2 className={styles.sectionTitle}>Narita Express or Skyliner: which is faster?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The <strong>Skyliner</strong> is the faster train and the cheaper ticket — <strong>41 minutes</strong> to
            Keisei-Ueno at <strong>¥2,580</strong> on Keisei&apos;s own figures, against the N&apos;EX at{" "}
            <strong>¥3,140</strong> and <strong>&ldquo;as fast as 53 minutes&rdquo;</strong> to Tokyo Station. But it
            only goes to two stations. The <strong>N&apos;EX</strong> is faster <em>to your hotel</em> if that hotel is
            in Shinjuku, Shibuya, Shinagawa or Yokohama, because it gets there without a transfer — and it is free
            with a JR Pass, which settles the question outright for pass holders.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Keisei Skyliner", "Narita Express (N'EX)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {skylinerVsNexRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.skyliner}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.nex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>And the third option nobody compares:</strong> the two trains run on different routes out of the
            airport, and the cheap services on each are not equivalent either. The Narita Sky Access line carries the
            Skyliner and the Access Express; the Keisei Main Line carries the ordinary Limited Express. Same operator,
            same airport, ¥220 apart on the section fare — the Access Express is ¥1,280 to Nippori and the Main Line
            Limited Express ¥1,060 to Keisei-Ueno. If you are weighing Sky Access against the Main Line rather than
            Skyliner against N&apos;EX, that is the whole difference: a faster alignment for ¥220, with no reserved
            seat either way.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fares and times read on {CHECKED} from JR East and Keisei. The Skyliner time is Keisei&apos;s figure for
            Terminal 2·3 to Keisei-Ueno; the N&apos;EX time is JR East&apos;s fastest-service figure to Tokyo Station.
            Both operators revise fares — confirm yours at the counter or at checkout.
          </p>
        </section>

        {/* By destination */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By destination</span>
          <h2 className={styles.sectionTitle}>Which train should I take for my hotel?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Pick the row that matches your hotel, not the fastest train. A transfer with two suitcases costs more
            time than the twelve minutes between the Skyliner and the N&apos;EX.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Destination", "Our pick", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {destinationRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Not booked a hotel yet? Then this table runs the other way round, and the easiest arrival is the one you
            choose before you book the room — see{" "}
            <Link href="/guides/transport/tokyo-transportation">getting around Tokyo</Link> for how the lines connect
            once you are in the city, and{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">our 3-day Tokyo itinerary</Link> for which side of
            the loop a short trip actually spends its time on.
          </p>
        </section>

        {/* Haneda to Shinjuku — its own question. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Haneda</span>
          <h2 className={styles.sectionTitle}>How do I get from Haneda to Shinjuku?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Keikyu&apos;s own estimate is <strong>30 minutes from Terminal 3</strong> and 33 from Terminal 1·2, with one
            change; the airport-to-Shinagawa leg of that is ¥330. The alternative without a change is the{" "}
            <strong>limousine bus to the Shinjuku and Nakano stops at ¥1,400</strong> (¥700 child), with your bags in
            the hold. The monorail route — 13 minutes to Hamamatsucho for ¥520, then the Yamanote loop — is the one to
            take if you are going to Hamamatsucho, Shimbashi or Tokyo Station rather than Shinjuku.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Destination", "From Terminal 3", "From Terminal 1·2"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {keikyuTimeRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td className={styles.tdPrice}>{row.t3}</td>
                      <td>{row.t12}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Keikyu&apos;s estimated travel times, read on {CHECKED}. They exclude transfer time, and several of these
            destinations need one change. The ¥330 (IC ¥327) fare covers Terminal 3 to Shinagawa; onward fares depend
            on the connecting line, and an{" "}
            <Link href="/guides/transport/ic-cards-japan">IC card</Link> settles all of them without a ticket machine.
          </p>
        </section>

        {/* Limousine Bus */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Airport bus</span>
          <h2 className={styles.sectionTitle}>Is the airport limousine bus better than the train?</h2>
          <p className={styles.bodyText}>
            It is better when the problem is bags rather than minutes. Two checked pieces per person go in the hold
            and you do not touch them again until your stop, and many routes end at a hotel door rather than a
            concourse. It is worse in rush hour, when the bus sits in the same expressway traffic as everyone else.
            There is no single fare per airport — the operator prices each route.
          </p>
          <div className={styles.tableWrap} style={{ marginBottom: "1.25rem", marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Airport", "Journey time", "One-way fare", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {busFareRows.map((row) => (
                    <tr key={row.airport}>
                      <td className={styles.tdProvider}>{row.airport}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.stepsList}>
            {busPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Every route fare, the baggage allowance and the reservation rules are in our{" "}
            <Link href="/guides/transport/tokyo-airport-limousine-bus">Tokyo airport limousine bus guide</Link>, which
            reads the same operator pages. Bus fares above read on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264852&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F2274-narita-airport-limousine-bus-tokyo%2F"
              className={styles.pickCta}
              target="_blank"
              rel="sponsored noopener"
            >
              Narita Limousine Bus on Klook →
            </KlookLink>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264856&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F150434-haneda-airport-limousine-bus-tokyo%2F"
              className={styles.pickCta}
              target="_blank"
              rel="sponsored noopener"
            >
              Haneda Limousine Bus on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Taxi — new on 28 Oct 2026. The 25 Oct draft said no operator published a
            fare, which was true of the five railway and bus operators but not of the
            airport itself. Narita publishes a six-zone flat fare; Haneda does not. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Taxi</span>
          <h2 className={styles.sectionTitle}>How much is a taxi from Narita or Haneda to Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            From <strong>Narita</strong> there is a published answer, and it is a flat fare rather than a meter:
            Narita Airport sets <strong>six zones from ¥23,500 to ¥38,500</strong>, with{" "}
            <strong>expressway tolls charged on top</strong> and a <strong>22:00–05:00 surcharge</strong> on top of
            that. Central Tokyo — Chuo, Chiyoda, Taito, Bunkyo, Arakawa — is zone C at{" "}
            <strong>¥29,000 or ¥31,000</strong> depending on which expressway the driver takes, and Shinjuku and
            Shibuya are zone D at <strong>¥31,500 or ¥32,500</strong>. From <strong>Haneda</strong> there is no
            published answer: the airport confirms a flat-fare scheme covering Tokyo and Kanagawa with tolls extra,
            but states that passengers should ask the taxi company for the figure, and the Tokyo Hire-Taxi
            Association&apos;s own fare pages were offline when we checked, so no Haneda number appears here.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Zone", "Wards and cities", "Via the Keiyo Road", "Via the Bay Shore Line"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {naritaTaxiRows.map((row) => (
                    <tr key={row.zone}>
                      <td className={styles.tdProvider}>{row.zone}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.wards}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.keiyo}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.bay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Narita Airport&apos;s own flat taxi fares, read on {CHECKED_TAXI}. The two columns are the two
            expressway routings the airport prices separately; the airport states that{" "}
            <em>&ldquo;passengers are required to pay highway tolls&rdquo;</em> in addition to every figure above,
            and that a late-night and early-morning surcharge applies between 22:00 and 05:00 without naming the
            amount. These are the fares for a taxi taken from the rank — a car booked in advance is priced by the
            operator, not by this table.
          </p>
        </section>

        {/* Families, luggage and a late landing — the per-person arithmetic, with the
            door-to-door CTA immediately after it, which is where the reader who has
            just read the per-head numbers is deciding. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Families and groups</span>
          <h2 className={styles.sectionTitle}>What is the best Tokyo airport transfer for families?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For four people the honest answer is <strong>the limousine bus from Narita</strong> and{" "}
            <strong>the train from Haneda</strong> — not a car, which is the thing most pages imply. Multiply the
            published fares out and a flat-fare taxi from Narita to Shinjuku is{" "}
            <strong>¥7,875–¥8,125 a head plus tolls</strong> for a party of four, against{" "}
            <strong>¥3,600 a head</strong> on the bus with the bags in the hold, and from Haneda the train leg is{" "}
            <strong>¥330</strong>. A car does not get cheaper per person than a bus at four; it gets cheaper
            relative to a taxi, which is a different claim.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Route priced", "Four adults pay", "Per person", "With children"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {familyRows.map((row) => (
                    <tr key={`${row.option}-${row.route}`}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.option}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.four}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.each}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.kids}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every figure is a published one-way fare from the tables above multiplied out — Keisei, JR East,
            Keikyu, Tokyo Monorail and Airport Limousine, read on {CHECKED}; the zone D taxi fare from Narita
            Airport, read on {CHECKED_TAXI}, with tolls still to add. Where an operator publishes no child fare
            the cell says so rather than halving the adult one.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>So when does a door-to-door car actually win?</strong> On the published numbers, in four
            situations, and they are about the door rather than the price:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>You land after the last train.</strong> From Haneda that is after 00:08; from Narita the last Skyliner leaves the airport at 23:00 on a weekday and 22:40 at a weekend. After that a car is the only thing that reaches an address rather than a stop.</li>
            <li><strong>Your hotel is not on a bus route.</strong> The bus is only ¥3,600 a head if it stops near your door; otherwise you are paying for a bus and then a taxi.</li>
            <li><strong>The bags outnumber the hands.</strong> Two adults with two children, four cases and a pushchair cannot work a Nippori transfer, and the ¥1,280 Access Express saving disappears the first time someone carries a case up a flight of stairs.</li>
            <li><strong>You are five or more.</strong> The bus and train fares are per seat and scale linearly; a 7- or 10-seater is priced per vehicle, so the per-head figure keeps falling where the ticket ones do not.</li>
          </ul>
          <p className={styles.bodyText}>
            Book it before you fly rather than at the rank: the point of a booked car is a driver tracking your
            flight number, and that cannot be arranged in the arrivals hall. Check the quote for your own party
            size against the per-head column above — if it is not under the bus, take the bus.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={tokyoPrivateAirportTransfer.url} className={styles.verdictBtn} target="_blank" rel="sponsored noopener">
              Private transfer for the whole party →
            </KlookLink>
            <KlookLink href={tokyoSharedAirportTransfer.url} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Shared transfer, priced per seat →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Both listings open on Klook in a new tab and were confirmed live and on sale on {CHECKED}. We print no
            Klook price — the private transfer is quoted per area and per vehicle size, so one figure would be
            wrong for most bookings even if Klook&apos;s product pages could be read automatically.
          </p>
        </section>

        {/* Booking — the part an AI answer does not finish, with the CTA beside it. */}
        <section className={styles.comparisonSection} id="prebuy">
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Should I book an airport transfer in advance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For the trains, booking ahead buys a lower price, not a seat that would otherwise be gone: both operators
            sell a visitor ticket that is cheaper than the counter fare, and both are still collected at the airport.
            What genuinely needs booking is anything with a fixed vehicle — a reserved bus route in peak season, or a
            car for a flight that lands after the trains stop. Here is what each one costs and how you actually get
            hold of it.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Worth pre-buying?", "Price", "How you collect it", "Our read"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prebuyRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.collect}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.worth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Prices read on {CHECKED} from Keisei (Skyliner discount ticket and the Skyliner + Tokyo Subway
            combinations), JR East (the N&apos;EX TOKYO Round Trip Ticket), Tokyo Monorail (the Yamanote discount
            ticket and the days it is sold), Airport Limousine (the bus + subway sets) and Keikyu (the Hanetoku
            combination, which the operator states cannot be bought at Haneda Airport).
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>Three things to settle before you pay.</strong> First, whether the ticket is an e-ticket or a
            voucher to exchange: the Skyliner and the bus can both be a QR code you scan, while the N&apos;EX
            round-trip ticket has to be picked up at the airport station with your passport, which is a queue after a
            long flight. Second, the cancellation window, which on a reseller is set per listing rather than by the
            railway — check the one shown for your own date. Third, the hour you land: a 23:40 arrival at Haneda is
            32 minutes from the last train, and nothing you buy in advance changes that except a car.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={keiseiSkylinerUrl} className={styles.verdictBtn} target="_blank" rel="sponsored noopener">
              Skyliner tickets on Klook →
            </KlookLink>
            <KlookLink href={naritaExpressRoundTripUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              N&apos;EX round trip on Klook →
            </KlookLink>
            <KlookLink href={naritaLimousineBus.url} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Narita limousine bus →
            </KlookLink>
            <KlookLink href={hanedaLimousineBus.url} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Haneda limousine bus →
            </KlookLink>
            <KlookLink href={tokyoPrivateAirportTransfer.url} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Private airport transfer →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook listings open in a new tab. We do not print Klook prices: Klook blocks automated reads of its
            product pages, so no figure here could be verified — check the current price and the cancellation terms
            for your own date at checkout. The{" "}
            <KlookLink href={naritaBusSubwayCombo.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--text)", fontWeight: 600 }}>
              bus + Tokyo Subway Ticket combination
            </KlookLink>{" "}
            is the one to look at if your days in the city are subway days — see our{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket guide</Link> for whether the pass
            itself is worth it.
          </p>
        </section>

        {/* Late night and pre-dawn — the other thing an AI answer leaves open. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Late and early</span>
          <h2 className={styles.sectionTitle}>What if I land late at night or fly out before dawn?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            This is the decision that is worth making before you fly, because it is the one with a hard edge. From
            Haneda the last train leaves Terminal 3 at <strong>00:08</strong> and the first at <strong>05:26</strong>;
            in between, the only scheduled public option is the late-night access bus, which serves a handful of named
            stops and nothing else. From Narita the last Skyliner leaves the airport at <strong>23:00</strong> on a
            weekday and <strong>22:40</strong> at a weekend, and the first is <strong>07:23</strong>. A 06:40
            departure means being at the terminal before the first train exists.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "What the operator publishes", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nightRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}, {row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ul className={styles.bodyList} style={{ marginTop: "1.25rem" }}>
            <li><strong>Landing at Haneda before midnight:</strong> take the train. ¥330 to Shinagawa beats everything else on the page.</li>
            <li><strong>Landing at Haneda between 00:10 and about 02:00:</strong> the access bus, if one of its stops is near your hotel — ¥1,900 for Tokyo, Ginza, Asakusa or Akihabara, ¥2,800 for Shinjuku or Ikebukuro. Otherwise a car.</li>
            <li><strong>Landing at Haneda between 02:00 and 05:26:</strong> a booked car, or the terminal. Haneda&apos;s airside is open; the trains are not.</li>
            <li><strong>Landing at Narita after 23:00 on a weekday, or after 22:40 at a weekend:</strong> the Skyliner is finished for the day. Check the bus for your route first, and book a car if your hotel is not on it — the flat-fare taxi starts at ¥23,500 before tolls.</li>
            <li><strong>Flying out before 07:00:</strong> work backwards from 05:26 at Haneda and from the first bus from the city at about 04:00, or sleep near the airport. The early-morning access bus leaves Ikebukuro at 03:35 and Busta Shinjuku at 04:00.</li>
          </ul>
          <p className={styles.bodyText}>
            A car is the only one of these that goes to an address rather than a stop, which is exactly why it is
            worth the money at 01:00 and a waste of it at 14:00. Book it before you fly — a driver who is tracking
            your flight number is the point, and that cannot be arranged in the arrivals hall.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={tokyoPrivateAirportTransfer.url} className={styles.verdictBtn} target="_blank" rel="sponsored noopener">
              Private transfer, Haneda or Narita →
            </KlookLink>
            <KlookLink href={tokyoSharedAirportTransfer.url} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Shared transfer for one or two →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Both listings were confirmed live and on sale on Klook on {CHECKED}. Prices are set per area and per
            vehicle size, so check yours at checkout — and check the cancellation window, because a car booked
            against a flight number is the one thing on this page you cannot rebook on the night.
          </p>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Tips</span>
          <h2 className={styles.sectionTitle}>What else should I know before I land?</h2>
          <div className={styles.stepsList}>
            {transferTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where to stay for easy airport access */}
        <KlookStayAreas
          heading="Where to Stay So the Airport Run Is Easy"
          intro="Which transfer is best depends less on the airport than on where you sleep, because only a handful of areas have a direct airport train. If you have not booked a hotel yet, picking one of these first makes the arrival and the departure straightforward — and matters most on an early-morning flight out."
          areas={tokyoAirportStayAreas}
        />

        {/* Klook: two things the transfer ticket does not cover */}
        <KlookTripPrep
          heading="Two Things the Transfer Ticket Does Not Cover"
          intro="The airport ticket gets you as far as your first station. These two cover what happens either side of it:"
          items={tokyoAirportTripPrep}
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/where-to-stay-in-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-limousine-bus" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="12" rx="2" />
                  <path d="M2 11h20" />
                  <circle cx="7" cy="19" r="1.5" />
                  <circle cx="17" cy="19" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Limousine Bus (2026): Narita &amp; Haneda Fares, Times and Stops</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a14 14 0 0 0 0 18M12 3a14 14 0 0 1 0 18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo 2026: Trains, Subway &amp; IC Cards</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="10" rx="2" />
                  <path d="M6 7V5h12v2" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <line x1="9" y1="3" x2="9" y2="10" />
                  <line x1="15" y1="3" x2="15" y2="10" />
                  <circle cx="8.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <circle cx="15.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <path d="M7 21l2-4" />
                  <path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 10h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 10h18M8 2v4M16 2v4" />
                  <path d="M8 14h2M14 14h2M8 18h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5 Day Itinerary (2026): Five Days, and What to Book for Each</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l20-6-4-3-7 2-5-5-2 1 3 5-5 1.5z" />
                  <path d="M4 20h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer (2026): Kansai &amp; Itami to the City, Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="8" width="20" height="10" rx="2" />
                  <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                  <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
                  <circle cx="17" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Transport Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
