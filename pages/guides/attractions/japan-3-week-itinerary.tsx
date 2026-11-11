import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { priceById, checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  hakoneFreepass,
  hiroshimaMiyajimaJoinDayTour,
  japanThreeWeekStayAreas,
  japanThreeWeekTripPrep,
  jrKansaiHiroshimaAreaPass,
  jrPassWholeJapan,
  kanazawaKenrokuenHigashiChayaDayTour,
  kyotoHighlightBusTour,
  kyotoNaraKiyomizuTour,
  naritaExpressRoundTripUrl,
  nikkoCulturalDayTourUrl,
  osakaAmazingPass,
  shibuyaSkyTicketUrl,
  shinkansenOsakaHiroshima,
  shinkansenTokyoHiroshima,
  shinkansenTokyoKanazawa,
  shirakawagoTakayamaKanazawaDayTour,
  takayamaHotelsUrl,
  takayamaShirakawagoOneDayBusTour,
  teamlabPlanetsTicketUrl,
  usjStudioPassUrl,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Three weeks in Japan, added 11 Nov 2026 (task-jtk-20261111-01).
 *
 * How it differs from its neighbours:
 *  - japan-14-day-itinerary keeps to four bases on the Tokyo–Kansai line;
 *  - this page uses the extra week for the Japan Alps side (Kanazawa, Shirakawa-go,
 *    Takayama) and for Hiroshima, which is what makes the JR Pass question real.
 *
 * Sources and dates:
 *  - JAPAN RAIL PASS prices, both channels, read on japanrailpass.net/en/purchase/price/
 *    on 11 Nov 2026: Exchange Order (overseas agency) Ordinary ¥53,000 / ¥84,000 /
 *    ¥105,000; official website Ordinary ¥50,000 / ¥80,000 / ¥100,000. The Exchange
 *    Order figures are the post-1-October-2026 prices (JR Group announcement of
 *    9 Apr 2026); the page leads with them, as the queue doc asks;
 *  - the NOZOMI/MIZUHO special ticket (¥6,500 Tokyo–Hiroshima, ¥4,960 Tokyo–Kyoto)
 *    read on japanrailpass.net/en/use/special-ticket/ on 11 Nov 2026;
 *  - Tokyo–Kanazawa ¥14,400 reserved (JR West e5489, read 11 Nov 2026 for the
 *    tokyo-to-kanazawa guide); Shin-Osaka→Hiroshima ¥10,750 and Tokyo→Hiroshima
 *    ¥19,560 reserved (JR West Smart EX page, read 28 Oct 2026 for the Hiroshima
 *    shinkansen guides); the Kansai-Hiroshima Area Pass ¥17,000 (JR West, 28 Oct 2026);
 *  - Nohi Bus / Hokutetsu fares from the Takayama and Shirakawa-go guide (6 Nov 2026);
 *  - admissions from lib/attraction-prices.ts with their own dates, Toshogu from the
 *    Nikko guide (19 Oct 2026), Kinkaku-ji from the 14-day guide (22 Oct 2026).
 *
 * Legs with no operator fare read for this site (Takayama → Kyoto, Tokyo ⇄ Nikko, the
 * airport trains, Kyoto → Osaka, the Miyajima ferry) are marked "not priced here" in
 * the break-even table rather than estimated. No Klook price appears.
 */

const PASS_ISO = "2026-11-11";
const PASS_CHECKED = checkedLabel(PASS_ISO);
const KANAZAWA_CHECKED = checkedLabel("2026-11-11");
const SANYO_CHECKED = checkedLabel("2026-10-28");
const BUS_CHECKED = checkedLabel("2026-11-06");
const TOSHOGU_CHECKED = checkedLabel("2026-10-19");
const KINKAKUJI_CHECKED = checkedLabel("2026-10-22");

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;

const PASS_21 = 105000;
const PASS_21_ONLINE = 100000;
const PASS_14 = 84000;
const PASS_14_ONLINE = 80000;
const PASS_7 = 53000;
const PASS_7_ONLINE = 50000;
const NOZOMI_TOKYO_HIROSHIMA = 6500;

const FARE_TOKYO_KANAZAWA = 14400;
const FARE_OSAKA_HIROSHIMA = 10750;
const FARE_HIROSHIMA_TOKYO = 19560;
const PRICED_TOTAL = FARE_TOKYO_KANAZAWA + FARE_OSAKA_HIROSHIMA + FARE_HIROSHIMA_TOKYO; // ¥44,710
const GAP_21 = PASS_21 - PRICED_TOTAL; // ¥60,290
const KANSAI_HIROSHIMA_PASS = 17000;

const BUS_KANAZAWA_SHIRAKAWAGO = "¥2,900";
const BUS_SHIRAKAWAGO_TAKAYAMA = "¥2,900";
/** Official adult price, from data/attraction-prices.json (nikkoToshogu). */
const TOSHOGU_ADULT = priceById("nikkoToshogu").adult;
/** Official adult price, from data/attraction-prices.json (kinkakuji). */
const KINKAKUJI_ADULT = priceById("kinkakuji").adult;

const ROUTE = "/guides/attractions/japan-3-week-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

type Day = {
  day: string;
  base: string;
  sights: string;
  move: string;
  book: string;
};

const days: Day[] = [
  { day: "Day 1", base: "Tokyo", sights: "Arrive; Shinjuku in the evening", move: "Narita Express or Skyliner into the city", book: "Airport train, eSIM, Tokyo hotel" },
  { day: "Day 2", base: "Tokyo", sights: "Asakusa and Senso-ji, Ueno, Tokyo Skytree", move: "Subway", book: "Skytree (cheaper ahead)" },
  { day: "Day 3", base: "Tokyo", sights: "Meiji Jingu, Harajuku, Shibuya Sky at sunset", move: "Yamanote Line", book: "Shibuya Sky sunset slot" },
  { day: "Day 4", base: "Tokyo", sights: "teamLab Planets, Tsukiji Outer Market, Ginza", move: "Subway and Yurikamome", book: "teamLab Planets time slot" },
  { day: "Day 5", base: "Tokyo", sights: "A free day, or a Mt Fuji or Kamakura day tour", move: "Tour coach or train", book: "Day tour, if you take one" },
  { day: "Day 6", base: "Nikko or Hakone (1 night)", sights: "Nikko: Toshogu, Kegon Falls. Hakone: the ropeway and Lake Ashi loop", move: "Nikko: JR via Utsunomiya, or Tobu from Asakusa. Hakone: Odakyu from Shinjuku", book: "Ryokan; Hakone Freepass or a Nikko tour" },
  { day: "Day 7", base: "Kanazawa", sights: "Higashi Chaya in the evening", move: "Back through Tokyo, then the Hokuriku Shinkansen (Kagayaki, about 2.5 hours)", book: "Shinkansen seat, Kanazawa hotel" },
  { day: "Day 8", base: "Kanazawa", sights: "Kenroku-en, Kanazawa Castle Park, Omicho Market, Nagamachi", move: "On foot and city bus", book: "Kanazawa day tour (optional)" },
  { day: "Day 9", base: "Takayama", sights: "Shirakawa-go on the way", move: "Bus to Shirakawa-go (1 h 15 min, reserved seats only), then on to Takayama (about 50 min) — or a tour with a Takayama drop-off", book: "Bus seat or the one-way tour; Takayama hotel" },
  { day: "Day 10", base: "Takayama", sights: "Morning markets, the Sanmachi old town, Hida Folk Village", move: "On foot", book: "Nothing" },
  { day: "Day 11", base: "Kyoto", sights: "Gion in the evening", move: "Limited Express Hida to Nagoya, then the Tokaido Shinkansen", book: "Reserved seats, Kyoto hotel" },
  { day: "Day 12", base: "Kyoto", sights: "Fushimi Inari early, Kiyomizu-dera, Higashiyama", move: "JR Nara Line, then on foot", book: "Nothing" },
  { day: "Day 13", base: "Kyoto", sights: "Kinkaku-ji, Arashiyama bamboo grove", move: "City bus and JR Sagano Line", book: "Kyoto bus tour (optional)" },
  { day: "Day 14", base: "Kyoto", sights: "Nara: the deer park, Todai-ji, Kasuga Taisha", move: "JR Nara Line from Kyoto Station", book: "Nothing, or a Nara day tour" },
  { day: "Day 15", base: "Osaka", sights: "Dotonbori and Kuromon Market", move: "Short JR, Hankyu or Keihan ride", book: "Osaka hotel" },
  { day: "Day 16", base: "Osaka", sights: "Universal Studios Japan", move: "JR to Universal City", book: "USJ Studio Pass (date-specified)" },
  { day: "Day 17", base: "Osaka", sights: "Osaka Castle and the Tombori cruise on the Amazing Pass", move: "Osaka Metro (on the pass)", book: "Osaka Amazing Pass" },
  { day: "Day 18", base: "Hiroshima", sights: "Peace Memorial Park and Museum, the Atomic Bomb Dome", move: "Sanyo Shinkansen from Shin-Osaka (fastest about 1 h 20 min)", book: "Shinkansen seat, Hiroshima hotel" },
  { day: "Day 19", base: "Hiroshima", sights: "Miyajima: Itsukushima Shrine and the ropeway", move: "JR to Miyajimaguchi, then the JR ferry", book: "Hiroshima & Miyajima tour (optional)" },
  { day: "Day 20", base: "Tokyo (1 night)", sights: "A last evening in Tokyo", move: "Shinkansen Hiroshima → Tokyo (fastest about 3 h 40 min)", book: "Shinkansen seat, Tokyo Station hotel" },
  { day: "Day 21", base: "—", sights: "Fly home", move: "Narita Express or Skyliner", book: "Return half of the airport train" },
];

type Leg = { day: string; leg: string; fare: string; jr: string; source: string };

const legs: Leg[] = [
  { day: "Day 1 / 21", leg: "Narita Airport ⇄ Tokyo (Narita Express)", fare: "Not priced here", jr: "Yes", source: "—" },
  { day: "Day 6–7", leg: "Tokyo ⇄ Nikko by JR (Hakone instead: Odakyu)", fare: "Not priced here", jr: "Nikko by JR: yes. Tobu and Odakyu: no", source: "—" },
  { day: "Day 7", leg: "Tokyo → Kanazawa, Hokuriku Shinkansen", fare: yen(FARE_TOKYO_KANAZAWA), jr: "Yes", source: `JR West e5489, reserved Ordinary, regular season, ${KANAZAWA_CHECKED}` },
  { day: "Day 9", leg: "Kanazawa → Shirakawa-go → Takayama, highway bus", fare: `${BUS_KANAZAWA_SHIRAKAWAGO} + ${BUS_SHIRAKAWAGO_TAKAYAMA} from 1 Dec 2026 (¥2,800 each until 30 Nov)`, jr: "No — not a JR bus", source: `Nohi Bus fare table, ${BUS_CHECKED}` },
  { day: "Day 11", leg: "Takayama → Nagoya → Kyoto (Hida + Tokaido Shinkansen)", fare: "Not priced here", jr: "Yes (Hikari or Kodama from Nagoya)", source: "—" },
  { day: "Day 15", leg: "Kyoto → Osaka, JR", fare: "Not priced here", jr: "Yes", source: "—" },
  { day: "Day 18", leg: "Shin-Osaka → Hiroshima, Sanyo Shinkansen", fare: yen(FARE_OSAKA_HIROSHIMA), jr: "Yes, except Nozomi and Mizuho", source: `JR West Smart EX, reserved Ordinary, ${SANYO_CHECKED}` },
  { day: "Day 19", leg: "Miyajimaguchi ⇄ Miyajima, JR ferry", fare: "Not priced here", jr: "Yes", source: "—" },
  { day: "Day 20", leg: "Hiroshima → Tokyo, Sanyo + Tokaido Shinkansen", fare: yen(FARE_HIROSHIMA_TOKYO), jr: `Yes, except Nozomi — with a pass, a Nozomi needs a ${yen(NOZOMI_TOKYO_HIROSHIMA)} special ticket`, source: `JR West Smart EX (Tokyo–Hiroshima), ${SANYO_CHECKED}; special ticket japanrailpass.net, ${PASS_CHECKED}` },
];

const priceRows = [
  {
    item: "JAPAN RAIL PASS, Ordinary, 21 days",
    price: `${yen(PASS_21)} as an Exchange Order from an overseas agency (child ¥53,000); ${yen(PASS_21_ONLINE)} bought on the official website`,
    note: "Revised 1 October 2026. Covers most shinkansen, but not the Nozomi or Mizuho without a special ticket",
    source: `japanrailpass.net, ${PASS_CHECKED}`,
  },
  {
    item: "JAPAN RAIL PASS, Ordinary, 14 and 7 days",
    price: `${yen(PASS_14)} / ${yen(PASS_7)} Exchange Order; ${yen(PASS_14_ONLINE)} / ${yen(PASS_7_ONLINE)} official website`,
    note: "Consecutive days from the first day of use",
    source: `japanrailpass.net, ${PASS_CHECKED}`,
  },
  {
    item: "NOZOMI/MIZUHO special ticket (pass holders)",
    price: `${yen(NOZOMI_TOKYO_HIROSHIMA)} Tokyo–Hiroshima, ¥4,960 Tokyo–Kyoto or Shin-Osaka`,
    note: "Sold only to pass holders, one per ride, same price in any car",
    source: `japanrailpass.net, ${PASS_CHECKED}`,
  },
  {
    item: "JR Kansai-Hiroshima Area Pass, 5 days",
    price: yen(KANSAI_HIROSHIMA_PASS),
    note: "Reserved Sanyo Shinkansen seats Shin-Osaka–Hiroshima, JR around Kansai, the JR Miyajima ferry",
    source: `westjr.co.jp, ${SANYO_CHECKED}`,
  },
  {
    item: "Nikko Toshogu (Day 6, Nikko option)",
    price: `${TOSHOGU_ADULT} adult`,
    note: "9:00–16:00 from November to March, 17:00 April to October",
    source: `toshogu.jp, ${TOSHOGU_CHECKED}`,
  },
  {
    item: "Hakone Freepass (Day 6, Hakone option)",
    price: `${PRICES.hakoneFreepass.adult} adult, 2 days`,
    note: "Odakyu's pass for the Hakone loop; not a JR product",
    source: `${PRICES.hakoneFreepass.source}, ${checkedLabel(PRICES.hakoneFreepass.checked)}`,
  },
  {
    item: "Shibuya Sky (Day 3)",
    price: `${PRICES.shibuyaSky.adult} online, entry before / from 15:00`,
    note: "Dates open at 00:00 two weeks ahead; the sunset slots go first",
    source: `Shibuya Scramble Square, ${checkedLabel(PRICES.shibuyaSky.checked)}`,
  },
  {
    item: "teamLab Planets (Day 4)",
    price: `${PRICES.teamlabPlanets.adult} adult, by date`,
    note: "30-minute entry slots; nothing sold on site",
    source: `official ticket store, ${checkedLabel(PRICES.teamlabPlanets.checked)}`,
  },
  {
    item: "Kinkaku-ji (Day 13)",
    price: `${KINKAKUJI_ADULT} adult`,
    note: "9:00–17:00 every day",
    source: `shokoku-ji.jp, ${KINKAKUJI_CHECKED}`,
  },
  {
    item: "Todai-ji Great Buddha Hall (Day 14)",
    price: `${PRICES.todaiji.adult} adult`,
    note: "Nara Park and the deer are free",
    source: `todaiji.or.jp, ${checkedLabel(PRICES.todaiji.checked)}`,
  },
  {
    item: "Osaka Amazing Pass, 1 day (Day 17)",
    price: PRICES.osakaAmazingPass.adult,
    note: "Osaka Metro plus free entry to the castle tower and the Tombori cruise",
    source: `osaka-amazing-pass.com, ${checkedLabel(PRICES.osakaAmazingPass.checked)}`,
  },
  {
    item: "Universal Studios Japan (Day 16)",
    price: "Changes by date — check the official date-by-date price",
    note: "Date-specified, sold online",
    source: "usj.co.jp",
  },
  {
    item: "Hiroshima Peace Memorial Museum (Day 18)",
    price: `${PRICES.peaceMuseum.adult} adult`,
    note: "The park and the Atomic Bomb Dome are free",
    source: `${PRICES.peaceMuseum.source}, ${checkedLabel(PRICES.peaceMuseum.checked)}`,
  },
  {
    item: "Itsukushima Shrine and Miyajima Ropeway (Day 19)",
    price: `${PRICES.itsukushima.adult} shrine, ${PRICES.miyajimaRopeway.adult} ropeway round trip`,
    note: "The JR ferry is covered by the JR Pass",
    source: `operators' own sites, ${checkedLabel(PRICES.itsukushima.checked)}`,
  },
];

const stayRows = [
  { base: "Tokyo (5 nights, then 1)", area: "Tokyo Station / Marunouchi, or Shinjuku", why: "Tokyo Station is where the Day 7 shinkansen leaves and the Day 20 one arrives", guide: "/guides/attractions/where-to-stay-in-tokyo", guideLabel: "Where to stay in Tokyo" },
  { base: "Nikko or Hakone (1 night)", area: "A ryokan near Tobu-Nikko / JR Nikko, or on the Hakone loop", why: "One night with an onsen breaks the long rail days either side", guide: "/guides/attractions/nikko-day-trip", guideLabel: "Nikko guide" },
  { base: "Kanazawa (2 nights)", area: "Kanazawa Station", why: "The Day 9 buses and tours leave from the station", guide: "/guides/transport/tokyo-to-kanazawa", guideLabel: "Tokyo to Kanazawa" },
  { base: "Takayama (2 nights)", area: "Near Takayama Station", why: "The Hida trains and the Nohi buses both start there; the old town is a walk", guide: "/guides/attractions/takayama-shirakawago-tour", guideLabel: "Takayama & Shirakawa-go" },
  { base: "Kyoto (4 nights)", area: "Kyoto Station, or Karasuma / Gion", why: "Kyoto Station for the Nara day and the trains; Gion for evenings", guide: "/guides/attractions/where-to-stay-in-kyoto", guideLabel: "Where to stay in Kyoto" },
  { base: "Osaka (3 nights)", area: "Umeda, or Namba", why: "Umeda for USJ and Shin-Osaka on Day 18; Namba for Dotonbori", guide: "/guides/attractions/where-to-stay-in-osaka", guideLabel: "Where to stay in Osaka" },
  { base: "Hiroshima (2 nights)", area: "Hiroshima Station", why: "Shinkansen in and out, and the local train to Miyajimaguchi", guide: "/guides/attractions/hiroshima-2-day-itinerary", guideLabel: "Hiroshima 2 day itinerary" },
];

const bookRows = [
  { what: "Hotels, all seven bases", when: "As soon as the dates are fixed", why: "Kyoto and Takayama are the small, busy ones. Check the cancellation policy on each listing before you pay" },
  { what: "Shinkansen reserved seats (Days 7, 11, 18, 20)", when: "From 10:00, one month before the day of travel", why: "JR's sale rule. Holiday-period Nozomi trains run all-reserved, and seats with an oversized-baggage area are limited" },
  { what: "Shibuya Sky sunset slot (Day 3)", when: "00:00 JST, two weeks ahead", why: "Sunset slots sell out first; the rest of the day usually does not" },
  { what: "teamLab Planets (Day 4)", when: "As soon as the date is fixed", why: "Timed 30-minute entry, price moves with the date, nothing sold at the door" },
  { what: "USJ Studio Pass (Day 16)", when: "Before you fly", why: "Date-specified and online only; Express Passes are limited per day" },
  { what: "Kanazawa → Shirakawa-go bus (Day 9)", when: "Before Day 9", why: "Reserved seats only on that bus — or book the tour with a Takayama drop-off instead" },
  { what: "JR Pass, if you buy one", when: "Before you fly", why: "On this route single tickets cost less — see the break-even table" },
];

const faqItems = [
  {
    q: "How should I spend 3 weeks in Japan?",
    a: "Tokyo for 5 nights, one night in Nikko or Hakone, Kanazawa for 2, Takayama (with Shirakawa-go on the way in) for 2, Kyoto for 4 with a Nara day, Osaka for 3 with Universal Studios Japan, Hiroshima and Miyajima for 2, then one last night in Tokyo before you fly. That is seven bases in twenty nights, and no single day has more than one long train ride.",
  },
  {
    q: "Is the JR Pass worth it for 3 weeks in Japan?",
    a: `Not on this route. The 21-day Ordinary pass is ${yen(PASS_21)} as an Exchange Order from an overseas agency (${yen(PASS_21_ONLINE)} on the official website), read on japanrailpass.net on ${PASS_CHECKED}. The three long JR rides that have an operator fare — Tokyo to Kanazawa ${yen(FARE_TOKYO_KANAZAWA)}, Shin-Osaka to Hiroshima ${yen(FARE_OSAKA_HIROSHIMA)} and Hiroshima to Tokyo ${yen(FARE_HIROSHIMA_TOKYO)} — add up to ${yen(PRICED_TOTAL)}. The rest of the JR travel would have to add another ${yen(GAP_21)}, more than four Tokyo–Kanazawa tickets, and it does not. Buy single tickets, or add Kyushu, Tohoku or Hokkaido legs if you want the pass to pay.`,
  },
  {
    q: "Does the JR Pass cover the Nozomi?",
    a: `No. A pass holder needs a NOZOMI/MIZUHO special ticket for each ride — ${yen(NOZOMI_TOKYO_HIROSHIMA)} between Tokyo and Hiroshima and ¥4,960 between Tokyo and Kyoto or Shin-Osaka (japanrailpass.net, ${PASS_CHECKED}). Without it, the pass covers the Hikari, Sakura and Kodama.`,
  },
  {
    q: "How do I get from Kanazawa to Takayama via Shirakawa-go?",
    a: `By highway bus: Kanazawa Station to Shirakawa-go takes 1 hour 15 minutes and is reserved-seat only, then Shirakawa-go to Takayama takes about 50 minutes. Each leg is ${BUS_KANAZAWA_SHIRAKAWAGO} from 1 December 2026 (¥2,800 until 30 November) on Nohi Bus's table, read ${BUS_CHECKED}. The JR Pass does not cover these buses. A Klook join-in tour from Kanazawa offers a one-way drop-off in Takayama, which turns the move and the village into one booking.`,
  },
  {
    q: "Which days should I book tours in advance?",
    a: "The timed tickets first: Shibuya Sky (Day 3) opens two weeks ahead at 00:00 JST, teamLab Planets (Day 4) sells 30-minute slots with nothing at the door, and the USJ Studio Pass (Day 16) is date-specified. Then the Day 9 Kanazawa–Shirakawa-go–Takayama bus or tour, and any guided day you want for Nikko, Kanazawa, Kyoto or Miyajima. Check each listing's cancellation policy and what happens in bad weather before you pay.",
  },
  {
    q: "Where should I stay for 3 weeks in Japan?",
    a: "Near the station in every base except Kyoto and Osaka, where the choice depends on your evenings. Tokyo Station / Marunouchi in Tokyo, Kanazawa Station, near Takayama Station, Kyoto Station (or Gion for evenings), Umeda in Osaka (Namba for Dotonbori) and Hiroshima Station. With seven bases, being next to the train matters more than the room.",
  },
  {
    q: "How much does 3 weeks in Japan cost?",
    a: `Rail on this route: ${yen(PRICED_TOTAL)} for the three long shinkansen rides at the operators' fares, plus the Takayama, Nikko, airport and short Kansai legs. The Day 9 buses add ${BUS_KANAZAWA_SHIRAKAWAGO} twice. Hotels, food and admissions depend on the dates and your style; the Japan travel budget and Tokyo trip cost guides break those down per day from official prices.`,
  },
  {
    q: "What is the best time for 3 weeks in Japan?",
    a: "Spring (late March to May) and autumn (October to November) for walking days. Avoid Golden Week at the end of April and early May, the mid-August Obon week and the New Year holidays if you can: those are the periods when JR Central runs every Nozomi car as reserved and hotels in Kyoto and Takayama fill first. Winter works too — Shirakawa-go under snow is the reason many people go — but the Day 9 buses and tours fill early.",
  },
];

const TITLE = "Japan 3 Week Itinerary (2026): 21 Days, JR Pass & Bookings";
const DESCRIPTION =
  "Japan 3 week itinerary: 3 weeks in Japan via Kanazawa, Takayama, Kyoto, Osaka, Hiroshima. A Japan itinerary 21 days long, with JR Pass maths and bookings.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const related = [
  { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day" },
  { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan Itinerary 10 Days (2026): 10 Days in Japan, Day by Day" },
  { href: "/guides/attractions/japan-first-time-itinerary", title: "Japan First-Time Itinerary" },
  { href: "/guides/transport/jr-pass-guide", title: "JR Pass Guide: Prices After October 2026 and the Break-Even" },
  { href: "/guides/transport/tokyo-to-kanazawa", title: "Tokyo to Kanazawa Shinkansen" },
  { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama and Shirakawa-go Tours and Buses" },
  { href: "/guides/attractions/kyoto-3-day-itinerary", title: "Kyoto 3 Day Itinerary" },
  { href: "/guides/attractions/osaka-3-day-itinerary", title: "Osaka 3 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/hiroshima-2-day-itinerary", title: "Hiroshima 2 Day Itinerary" },
  { href: "/guides/transport/osaka-to-hiroshima-shinkansen", title: "Osaka to Hiroshima Shinkansen" },
  { href: "/guides/transport/tokyo-to-hiroshima-shinkansen", title: "Tokyo to Hiroshima Shinkansen" },
  { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip from Tokyo" },
  { href: "/guides/money/japan-travel-budget", title: "Japan Travel Budget 2026: Cost per Day, Rail and the JR Pass" },
  { href: "/guides/attractions", title: "More Things to Do in Japan →" },
];

function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map((c, j) => (
                  <td key={j} className={j === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Japan3WeekItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESCRIPTION, updated }),
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
                { "@type": "ListItem", position: 4, name: "Japan 3 Week Itinerary", item: URL },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          {crumbSep}
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          {crumbSep}
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          {crumbSep}
          <span className={styles.breadCurrent}>Japan 3 Week Itinerary</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan 3 Week Itinerary (2026):<br />21 Days from Tokyo to Hiroshima
          </h1>
          <p className={styles.heroSubtitle}>
            Seven bases, one long train ride at a time — with a table for all twenty-one days, the JR
            Pass worked against the real fares, and the bookings that have a date on them.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "JR Pass prices after 1 Oct 2026", "Official fares, dated"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Week 1</p>
                <p className={styles.verdictStatValue}>Tokyo 5 nights, Nikko or Hakone 1</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Week 2</p>
                <p className={styles.verdictStatValue}>Kanazawa 2, Takayama 2, Kyoto 4</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Week 3</p>
                <p className={styles.verdictStatValue}>Osaka 3, Hiroshima 2, Tokyo 1</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              For a <strong>Japan 3 week itinerary</strong>, spend 5 nights in <strong>Tokyo</strong>, 1 in{" "}
              <strong>Nikko or Hakone</strong>, 2 in <strong>Kanazawa</strong>, 2 in{" "}
              <strong>Takayama</strong> (seeing Shirakawa-go on the way), 4 in <strong>Kyoto</strong> with a
              Nara day, 3 in <strong>Osaka</strong> and 2 in <strong>Hiroshima</strong> for Miyajima, then
              take the shinkansen back to Tokyo for the last night. The <strong>21-day JR Pass</strong> is{" "}
              {yen(PASS_21)} (Ordinary, Exchange Order, official price checked {PASS_CHECKED}), but the three
              long rides on this route — Tokyo → Kanazawa, Osaka → Hiroshima and Hiroshima → Tokyo — come to{" "}
              {yen(PRICED_TOTAL)} at the operators&apos; fares, so <strong>single tickets are cheaper</strong>.
              Book the hotels and the timed tickets first.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Only two weeks? See the{" "}
              <Link href="/guides/attractions/japan-14-day-itinerary">Japan 14-day itinerary</Link>. Ten days?
              See the <Link href="/guides/attractions/japan-10-day-itinerary">Japan 10-day itinerary</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={japanThreeWeekStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Hotels at Tokyo Station →
              </KlookLink>
              <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Shirakawa-go tour with a Takayama drop-off →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Should I Spend 3 Weeks in Japan?</h2>
          <p className={styles.bodyText}>
            Three weeks in Japan is enough for the Tokyo–Kyoto–Osaka line plus two things a shorter trip
            has to drop: the Japan Alps side (Kanazawa, Shirakawa-go and Takayama) and Hiroshima. The route
            below goes clockwise — north-west from Tokyo to the Sea of Japan coast, south through the
            mountains to Kyoto, west to Hiroshima, and back to Tokyo by shinkansen in one ride.
          </p>
          <p className={styles.bodyText}>
            The rule that shapes it: one long move per travel day, and at least two nights everywhere except
            the Nikko or Hakone stop. Seven hotel bills in twenty nights is already a lot of packing; the
            luggage-forwarding (takkyubin) services make the Day 9 bus and the Day 11 train easier.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day by day</span>
          <h2 className={styles.sectionTitle}>Japan Itinerary 21 Days: What Happens Each Day?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Each row is one day: where you sleep, what you see, how you move, and what — if anything —
            needs booking before you go.
          </p>
          <SimpleTable
            head={["Day", "Base", "Main sights", "Getting around", "What to book"]}
            rows={days.map((d) => [d.day, d.base, d.sights, d.move, d.book])}
          />
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Journey times: Kagayaki from JR West, the Day 9 buses from Nohi Bus and Hokuriku Railroad, the
            Osaka–Hiroshima and Hiroshima–Tokyo shortest times from Klook&apos;s rail pages, each read for the
            route guides linked below. Prices are in the dated table further down.
          </p>
        </section>

        <KlookTripPrep
          label="Book these on the same visit"
          heading="Book These With Your Flights"
          intro="The first and last Tokyo nights, the Day 9 tour that moves you to Takayama, the Takayama hotel, the Hakone pass if you go that way, the airport train and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={japanThreeWeekTripPrep}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Week 1</span>
          <h2 className={styles.sectionTitle}>What Should I Do in Tokyo, Nikko and Hakone (Days 1–6)?</h2>
          <p className={styles.bodyText}>
            Four full Tokyo days give each side of the city its own day: the old east (Asakusa, Ueno,
            Skytree) on Day 2, the west (Meiji Jingu, Harajuku, Shibuya Sky) on Day 3, the bay (teamLab
            Planets, Tsukiji, Ginza) on Day 4, and Day 5 free or on a tour. The two timed tickets are Shibuya
            Sky ({PRICES.shibuyaSky.adult} online, before / from 15:00) and teamLab Planets (
            {PRICES.teamlabPlanets.adult}). For the full Tokyo days, see the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">Tokyo 5 day itinerary</Link>.
          </p>
          <p className={styles.bodyText}>
            <strong>Day 6 — Nikko or Hakone?</strong> Nikko for Toshogu ({TOSHOGU_ADULT}, toshogu.jp,{" "}
            {TOSHOGU_CHECKED}) and Kegon Falls; it is on JR via Utsunomiya, so a JR Pass would cover it, or
            about two hours by Tobu from Asakusa. Hakone for the ropeway, Lake Ashi and an onsen night; it is
            Odakyu&apos;s territory, and the Hakone Freepass ({PRICES.hakoneFreepass.adult} for two days) is the
            ticket. Either way you come back through Tokyo on Day 7 for the Kanazawa train.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shibuya Sky ticket →
            </KlookLink>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Planets ticket →
            </KlookLink>
            <KlookLink href={nikkoCulturalDayTourUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nikko day tour from Tokyo →
            </KlookLink>
            <KlookLink href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hakone Freepass →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Week 2</span>
          <h2 className={styles.sectionTitle}>How Do I Fit In Kanazawa, Shirakawa-go and Takayama (Days 7–11)?</h2>
          <p className={styles.bodyText}>
            <strong>Day 7:</strong> Tokyo → Kanazawa on the Hokuriku Shinkansen. The Kagayaki takes about
            two and a half hours, and a reserved Ordinary seat is {yen(FARE_TOKYO_KANAZAWA)} in regular
            season (JR West, {KANAZAWA_CHECKED}). <strong>Day 8:</strong> Kenroku-en, the castle park,
            Omicho Market and the Higashi Chaya teahouse street — all walkable or a short bus ride.
          </p>
          <p className={styles.bodyText}>
            <strong>Day 9:</strong> the bus to Shirakawa-go leaves Kanazawa Station, takes 1 hour 15 minutes
            and is reserved-seat only; after the village, a second bus reaches Takayama in about 50 minutes.
            Each leg is {BUS_KANAZAWA_SHIRAKAWAGO} from 1 December 2026 (¥2,800 until 30 November), Nohi Bus,{" "}
            {BUS_CHECKED}. The simpler option is a join-in tour from Kanazawa that ends with a one-way
            drop-off in Takayama. <strong>Day 10:</strong> Takayama&apos;s morning markets, the Sanmachi old
            town and the Hida Folk Village. <strong>Day 11:</strong> the Limited Express Hida to Nagoya, then
            the Tokaido Shinkansen to Kyoto. Full details are in the{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa">Tokyo to Kanazawa guide</Link> and the{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shirakawa-go &amp; Takayama tour from Kanazawa →
            </KlookLink>
            <KlookLink href={kanazawaKenrokuenHigashiChayaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kanazawa day tour →
            </KlookLink>
            <KlookLink href={takayamaHotelsUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hotels in Takayama →
            </KlookLink>
            <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kanazawa shinkansen →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Weeks 2–3</span>
          <h2 className={styles.sectionTitle}>What About Kyoto, Osaka and Hiroshima (Days 12–20)?</h2>
          <p className={styles.bodyText}>
            <strong>Kyoto, Days 12–14:</strong> Fushimi Inari early and Kiyomizu-dera on Day 12, Kinkaku-ji
            ({KINKAKUJI_ADULT}, shokoku-ji.jp, {KINKAKUJI_CHECKED}) and Arashiyama on Day 13, and Nara on Day 14
            (Todai-ji {PRICES.todaiji.adult}). The <Link href="/guides/attractions/kyoto-3-day-itinerary">Kyoto
            3 day itinerary</Link> has these days hour by hour.
          </p>
          <p className={styles.bodyText}>
            <strong>Osaka, Days 15–17:</strong> Dotonbori on arrival, Universal Studios Japan on Day 16, and
            the castle and Tombori cruise on Day 17 on the {PRICES.osakaAmazingPass.adult} Amazing Pass — see
            the <Link href="/guides/attractions/osaka-3-day-itinerary">Osaka 3 day itinerary</Link>.
          </p>
          <p className={styles.bodyText}>
            <strong>Hiroshima, Days 18–19:</strong> Shin-Osaka → Hiroshima is {yen(FARE_OSAKA_HIROSHIMA)} reserved
            (JR West Smart EX, {SANYO_CHECKED}), about 1 hour 20 minutes on the fastest train. Peace Memorial
            Park and Museum ({PRICES.peaceMuseum.adult}) on Day 18, Miyajima on Day 19 — see the{" "}
            <Link href="/guides/attractions/hiroshima-2-day-itinerary">Hiroshima 2 day itinerary</Link> and the{" "}
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen">Osaka to Hiroshima shinkansen guide</Link>.{" "}
            <strong>Day 20:</strong> Hiroshima → Tokyo in one ride, {yen(FARE_HIROSHIMA_TOKYO)} reserved — see{" "}
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen">Tokyo to Hiroshima by shinkansen</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoHighlightBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kyoto highlights bus tour →
            </KlookLink>
            <KlookLink href={usjStudioPassUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              USJ Studio Pass →
            </KlookLink>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
            <KlookLink href={hiroshimaMiyajimaJoinDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hiroshima &amp; Miyajima day tour →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for 3 Weeks?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Not on this route. Since 1 October 2026 the 21-day Ordinary pass is {yen(PASS_21)} as an Exchange
            Order from an overseas agency, and {yen(PASS_21_ONLINE)} on the official website (japanrailpass.net,{" "}
            {PASS_CHECKED}). Here is every JR and bus leg on the plan, with the fares that have an operator
            source; the others are left blank rather than guessed.
          </p>
          <SimpleTable
            head={["Day", "Leg", "Fare (adult, one way)", "On the JR Pass?", "Source & date checked"]}
            rows={legs.map((l) => [l.day, l.leg, l.fare, l.jr, l.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The arithmetic.</strong> The three priced JR legs add up to {yen(FARE_TOKYO_KANAZAWA)} +{" "}
            {yen(FARE_OSAKA_HIROSHIMA)} + {yen(FARE_HIROSHIMA_TOKYO)} = <strong>{yen(PRICED_TOTAL)}</strong>. To
            reach {yen(PASS_21)}, the unpriced JR legs — the airport trains, Nikko, Takayama to Kyoto, Kyoto to
            Osaka and the Miyajima ferry — would have to add another <strong>{yen(GAP_21)}</strong>, which is
            more than four Tokyo → Kanazawa tickets. They come nowhere near it. The 14-day pass (
            {yen(PASS_14)}) fails the same test, and a 7-day pass ({yen(PASS_7)}) cannot span both the Day 7
            and the Day 20 rides. The Smart EX fares above are Nozomi prices; with a pass you would ride the
            Hikari or Sakura, or pay {yen(NOZOMI_TOKYO_HIROSHIMA)} extra for a Nozomi between Hiroshima and Tokyo.
          </p>
          <p className={styles.bodyText}>
            <strong>When the 21-day pass does pay:</strong> add long legs this route does not have — Kyushu,
            Tohoku or Hokkaido — or out-and-back shinkansen day trips. The{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works through those routes. In the
            west, the 5-day Kansai-Hiroshima Area Pass ({yen(KANSAI_HIROSHIMA_PASS)}, JR West, {SANYO_CHECKED})
            covers Shin-Osaka–Hiroshima, JR around Kansai and the Miyajima ferry; Shin-Osaka → Hiroshima alone
            is {yen(FARE_OSAKA_HIROSHIMA)}, so it pays only if you also come back east through Shin-Osaka or
            add JR day trips inside its five days.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hiroshima → Tokyo shinkansen →
            </KlookLink>
            <KlookLink href={shinkansenOsakaHiroshima.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka → Hiroshima shinkansen →
            </KlookLink>
            <KlookLink href={jrKansaiHiroshimaAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kansai-Hiroshima Area Pass →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS on Klook →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>What Do the Passes and Tickets Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Official prices only, each with its source and the date it was checked.
          </p>
          <SimpleTable
            head={["Ticket", "Official price", "Notes", "Source & date checked"]}
            rows={priceRows.map((r) => [r.item, r.price, r.note, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm at booking. Klook prices change by date and are not listed here. More
            figures are in the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Which Days Should I Book Tours in Advance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Days 3, 4, 9 and 16 have a time or a seat fixed in them; book those before you fly. The rest of the
            trip is walk-up.
          </p>
          <SimpleTable
            head={["What", "When to book", "Why"]}
            rows={bookRows.map((r) => [r.what, r.when, r.why])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Before paying for any tour, read its cancellation policy and what it says about bad weather —
            the Shirakawa-go and Miyajima days are the two most exposed to snow, typhoons and ferry
            suspensions. Shinkansen sale rule from JR Central (checked {SANYO_CHECKED}); Shibuya Sky and
            teamLab rules from their operators (dates in the price table).
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay for 3 Weeks in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Beside the station in every base where you arrive and leave by train; Kyoto and Osaka are the two
            where the evening matters more.
          </p>
          <SimpleTable
            head={["Base", "Area", "Why", "More detail"]}
            rows={stayRows.map((r) => [
              r.base,
              r.area,
              r.why,
              <Link key={r.guide} href={r.guide}>{r.guideLabel}</Link>,
            ])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Room rates change by hotel and date, so none are listed.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for Each Base"
          intro="Availability and price are per date, so each base links to Klook's hotel search for that area."
          areas={japanThreeWeekStayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Budget</span>
          <h2 className={styles.sectionTitle}>How Much Does 3 Weeks in Japan Cost?</h2>
          <p className={styles.bodyText}>
            The fixed part on this route is rail: {yen(PRICED_TOTAL)} for the three long shinkansen rides at
            the operators&apos; fares, plus the Day 9 buses ({BUS_KANAZAWA_SHIRAKAWAGO} each from 1 December)
            and the shorter JR legs. The admissions in the price table are mostly a few hundred to a few
            thousand yen each; USJ is the one large, date-priced ticket. For hotels and food per day, the{" "}
            <Link href="/guides/money/japan-travel-budget">Japan travel budget guide</Link> works from official
            chain prices, and the <Link href="/guides/money/tokyo-trip-cost">Tokyo trip cost guide</Link> puts
            a Tokyo day at about ¥19,500–¥21,400 per person.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>Is 3 weeks in Japan too long for one route?</h3>
          <p className={styles.bodyText}>
            No — it is the length at which the Japan Alps and Hiroshima stop being day trips. If it feels long,
            drop the Nikko or Hakone night and give Tokyo six, or swap Hiroshima for two more Kyoto days.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>Does this work with kids?</h3>
          <p className={styles.bodyText}>
            Yes. Tokyo, USJ and Miyajima are the strongest days for children; the Day 9 bus day is the hardest,
            and the tour with a Takayama drop-off is easier with small children than two public buses. Child
            JR fares and passes are about half the adult price.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>When to go</span>
          <h2 className={styles.sectionTitle}>What Is the Best Time for 3 Weeks in Japan?</h2>
          <p className={styles.bodyText}>
            Late March to May and October to November, for the walking days. Avoid Golden Week (late April to
            early May), the mid-August Obon week and the New Year holidays if you can: JR Central runs every
            Nozomi car as reserved in those periods, and the small towns on this route — Takayama and
            Shirakawa-go — fill first. Winter is the season for Shirakawa-go under snow; book the Day 9 bus or
            tour as soon as your dates are set, and pack shoes with grip.
          </p>
        </section>

        <BookingEsimCard lead="Twenty-one days, seven bases and a QR code for every ticket — get mobile data before you land." />

        <KlookTourPicks
          heading="If You Would Rather Have a Guide for a Day"
          intro="Guided versions of the Nikko, Kanazawa, Takayama, Kyoto, Nara and Miyajima days. Klook prices change by date, so open a listing for the figure on your dates."
          tours={[
            shirakawagoTakayamaKanazawaDayTour,
            takayamaShirakawagoOneDayBusTour,
            kanazawaKenrokuenHigashiChayaDayTour,
            kyotoNaraKiyomizuTour,
            hiroshimaMiyajimaJoinDayTour,
          ]}
        />

        <EsimCtaBottom />

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

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Three weeks, seven bases, single tickets</h2>
            <p className={styles.ctaBannerDesc}>
              Book the hotels and the Day 9 move first, then the timed tickets for Days 3, 4 and 16.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={japanThreeWeekStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Tokyo Station hotels →
              </KlookLink>
              <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Narita Express round trip →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
