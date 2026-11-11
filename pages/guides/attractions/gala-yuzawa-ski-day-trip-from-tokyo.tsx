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
  galaNaebaSkiDayTripTokyo,
  galaYuzawaLiftTicket,
  galaYuzawaSkiLesson,
  hakubaSkiResortDayTourTokyo,
  hanedaLimousineBus,
  jrEastPass,
  jrTokyoWidePass,
  klookEsim,
  naritaExpressRoundTripUrl,
  yuzawaIwapparaSkiDayTourTokyo,
  type KlookTripPrepItem,
} from "../../../lib/klook-links";

/**
 * GALA Yuzawa as a day out of Tokyo, written for the reader searching "Gala
 * Yuzawa Ski Day Trip from Tokyo". Added 1 Nov 2026 — deliberately six weeks
 * before the slopes open, because a ski page published in December is published
 * after the trip has been booked.
 *
 * The shape of the page follows from one fact that is unique in Japan: the
 * shinkansen station is inside the ski resort. There is no bus, no transfer and
 * no overnight, which means the question "can you ski from Tokyo in a day?" has
 * a one-word answer here and the rest of the page is about what the day costs
 * and which of GALA's three separate purchases you actually need.
 *
 * How it differs from the two neighbours already on this site.
 * japan-ski-travel-insurance is about cover and what voids it;
 * tokyo-wide-pass works the pass arithmetic across every Kanto day trip and
 * uses GALA as one worked example. This page is the resort day itself, with
 * GALA's own 2026-27 prices and the one thing every other guide to it gets
 * wrong — that the South Area is shut for this season.
 *
 * Sources, all read 1 November 2026.
 *
 *   gala.co.jp/winter/         the resort's own season page: 観光営業 (gondola and
 *     hours-pricing/           sightseeing lift only, no skiing) 2026年12月12日(土)
 *                              〜12月18日(金), ゲレンデ営業 2026年12月19日(土)〜
 *                              2027年5月5日(水祝); ゴンドラ＆リフト券 ¥8,000 大人 /
 *                              ¥4,000 小学生 with WEB at ¥7,500 / ¥3,500;
 *                              ゴンドラ＆バルーシュ券 ¥6,500 / ¥3,400, WEB ¥5,500 /
 *                              ¥2,900; 4時間券 ¥7,500 / ¥3,500, WEB ¥7,000 /
 *                              ¥3,000; 未就学児 free, two per paying adult, a third
 *                              child pays the 小学生 rate.
 *   gala.co.jp/winter/rental/  the rental list: スキー3点セット and スノーボード2点
 *                              セット both ¥6,500 for one day at 13歳以上 and
 *                              ¥4,000 at 12歳以下 (¥13,000 / ¥8,000 for two days);
 *                              ウェア上下 ¥5,500 / ¥3,000 one day, ¥11,000 /
 *                              ¥6,000 two; goggles ¥1,800–¥3,600 and helmets
 *                              ¥2,300–¥4,600; PICK UP BOX +¥1,000 per person,
 *                              web-booked a month ahead.
 *   gala.co.jp/winter/gelande/ the trail map page: 16 courses — 5 in the Central
 *                              Area, 6 in the North Area, the Falcon descent
 *                              course, and 南エリアの営業を休止いたします for this
 *                              season; 35% beginner, 45% intermediate, 20%
 *                              advanced; 11 lifts; 2,500 m longest run (Falcon);
 *                              1,181 m top, 358 m base; 70 ha; 33° steepest.
 *   gala.co.jp                 the hours, read through a gala.co.jp-restricted
 *                              search index of the resort's own FAQ: ゲレンデ
 *                              8:00–16:30, ゴンドラ 8:30–16:30, 観光リフト
 *                              8:40–16:00, ticket counter Kawabanga 7:30–17:30,
 *                              with the resort's own caveat that dates and hours
 *                              change with snow and weather. The homepage also
 *                              carries 東京駅から新幹線で最速71分 and a free
 *                              shuttle of about 10 minutes from Echigo-Yuzawa.
 *   jre-travel.com/seasonal/   JR East's own travel arm: the same 東京駅から最速
 *     ski/gala/                71分, and — the fact that decides how this page
 *                              treats booking — the 2026-27 JR SKISKI shinkansen
 *                              packages were still marked "Coming Soon!!" with
 *                              reservations expected "11月中旬頃" (mid-November
 *                              2026).
 *   jreast.co.jp               read through a jreast.co.jp-restricted search
 *                              index of its own pages, because the site answers
 *                              automated reads with HTTP 403 — the same fallback
 *                              pages/guides/transport/tokyo-wide-pass.tsx
 *                              documents. GALA Yuzawa is "75 minutes from Tokyo
 *                              on the Joetsu Shinkansen" on one JR East page and
 *                              71 on another; the station opened in 1990, is
 *                              directly connected to the resort, and is seasonal.
 *
 * Carried from pages/guides/transport/tokyo-wide-pass.tsx with its own check
 * date (30 Oct 2026): the JR TOKYO Wide Pass at ¥16,000 adult and ¥8,000 child
 * for three consecutive days, raised from ¥15,000 on 14 March 2026; JR East's
 * own worked example of about ¥21,500 for a GALA return plus a Nikko return in
 * reserved seats; and JR East's note that GALA Yuzawa station operates only in
 * winter and spring.
 *
 * What is deliberately absent: a Tokyo–GALA point-to-point shinkansen fare. JR
 * East publishes no English fare table that could be read, and tokyo-wide-pass
 * made the same call for the same reason — a guessed shinkansen fare is exactly
 * the figure that makes a break-even table worthless. The arithmetic here is
 * built out of JR East's own ¥21,500 example instead.
 *
 * Re-read 6 November 2026, with what changed:
 *
 *   gala.co.jp/winter/         dates and all three passes unchanged. The page has
 *     hours-pricing/           an hours heading but no daily hours, and the
 *                              8:30–16:30 gondola line on the older charges page
 *                              sits with spring 2026 operation. So the 2026-27
 *                              hours are written as awaiting the announcement.
 *   gala.co.jp/winter/rental/  goggles are ¥1,800 for one day and ¥3,600 for two,
 *                              helmets ¥2,300 and ¥4,600: earlier copy read these
 *                              as ranges. Bands are 中学生以上 / 小学生以下. PICK UP
 *                              BOX booking opens a month before opening day and
 *                              closes at noon two days before use; 7:30–12:00.
 *   gala.co.jp/winter/gelande/ North 6, Central 5, South 4, descent 1. The 16 includes
 *                              the shut South Area, so 12 courses operate.
 *   gala.co.jp/winter/         超早割 lift ticket, ¥4,300, 1,000 tickets, on sale
 *     information/liftticket   5 Oct 2026, marked sold out.
 *     earlysale20261015/
 *   jre-travel.com/seasonal/   JR SKISKI still "Coming Soon", mid-November.
 *     ski/gala/
 *   jreast.co.jp               through its restricted index: TOKYO Wide Pass
 *                              ¥16,000 / ¥8,000 and N'EX reserved seats included
 *                              (0128_pass_en.pdf); the regional Nagano/Niigata JR
 *                              EAST PASS stopped selling on 13 March 2026, replaced
 *                              by the one JR EAST PASS, so this page links that.
 *
 * Nothing here is first-hand. The top block shows the one from-price a klook.com
 * index result tied to its listing; the body has none, because Klook answers
 * automated reads of its product pages with HTTP 403.
 */

const OWN_ISO = "2026-11-06";
const OWN = checkedLabel(OWN_ISO);
/** The pass price was re-read on this date; JR East's worked example is carried from 30 Oct. */
const PASS_CHECKED = checkedLabel("2026-11-06");

const FASTEST = "71 minutes";
const SLOPES_OPEN = "19 December 2026";
const SLOPES_CLOSE = "5 May 2027";
const SIGHTSEEING_OPEN = "12 December 2026";
const LIFT_WINDOW = "¥8,000";
const LIFT_WEB = "¥7,500";
const SKI_SET = "¥6,500";
const WEAR = "¥5,500";
const PASS_ADULT = "¥16,000";
const JR_EXAMPLE = "about ¥21,500";

/** Getting there, on the two operators' own published figures. */
const accessRows = [
  {
    leg: "Tokyo Station → GALA Yuzawa, Joetsu Shinkansen",
    time: `${FASTEST} at fastest; JR East also publishes 75 minutes on another of its own pages`,
    cost: "No English fare quoted here — see the note below the table",
    note: `The reason this day trip exists. GALA Yuzawa is a seasonal shinkansen station built into the ski centre, so you walk out of the ticket gate into the building where the lift tickets and the rental are sold. No bus, no transfer, no taxi. Read ${OWN}.`,
  },
  {
    leg: "Tokyo Station → Echigo-Yuzawa → GALA Yuzawa, by shuttle",
    time: "The shinkansen to Echigo-Yuzawa, then about 10 minutes on the resort's free shuttle",
    cost: "Shuttle free; the rail leg is a normal shinkansen ticket",
    note: `The fallback, and the one that works outside GALA's own season: Echigo-Yuzawa is a year-round station one stop away, while GALA Yuzawa station runs only in winter and spring on JR East's own note. The shuttle is the resort's own, read ${OWN}.`,
  },
  {
    leg: "Tokyo → the Yuzawa basin by coach, as a booked day",
    time: "A full day, pick-up in Tokyo",
    cost: "Per seat, by date — Klook prices change by date, so open the listing",
    note: "A different product rather than a cheaper one: the coach days go to Iwappara and the other Yuzawa resorts, with round-trip transport in one booking and rental or lessons as options on the listing. Slower than the shinkansen, and less to assemble.",
  },
  {
    leg: "Tokyo → GALA or Naeba by chartered car",
    time: "A full day, door to door",
    cost: "Per vehicle, by date — open the listing",
    note: "The version for a family or a group with gear, or for a morning too early for the first Tanigawa. The resort is picked at booking, so it covers a GALA day and a Naeba day on the same listing.",
  },
];

/** GALA's own 2026-27 lift prices. Every figure is the resort's own. */
const liftRows = [
  {
    ticket: "Gondola & lift pass, 1 day — adult",
    window: LIFT_WINDOW,
    web: LIFT_WEB,
    note: "The default. Covers every gondola and chairlift in the two areas operating this season.",
  },
  {
    ticket: "Gondola & lift pass, 1 day — primary-school child",
    window: "¥4,000",
    web: "¥3,500",
    note: "Half the adult rate at the window, and ¥500 less again online.",
  },
  {
    ticket: "Gondola & Barouche pass — adult",
    window: "¥6,500",
    web: "¥5,500",
    note: "The cheaper pass, limited to the gondola and the Barouche quad. Worth it for a first day, a snow-play day or a short afternoon; not for covering the mountain.",
  },
  {
    ticket: "Gondola & Barouche pass — primary-school child",
    window: "¥3,400",
    web: "¥2,900",
    note: "The cheapest way to put a child on the snow here with a lift ticket in their pocket.",
  },
  {
    ticket: "4-hour pass — adult",
    window: "¥7,500",
    web: "¥7,000",
    note: "Only ¥500 under the full day at the window, so it pays off a late start rather than a budget.",
  },
  {
    ticket: "4-hour pass — primary-school child",
    window: "¥3,500",
    web: "¥3,000",
    note: "Same logic — four hours is most of what a younger child will ski anyway.",
  },
  {
    ticket: "Preschool children",
    window: "Free",
    web: "Free",
    note: "Two free children per paying adult; a third pays the primary-school rate. The resort's own rule.",
  },
];

/** The rental counter, which is the other half of a gear-free day trip. */
const rentalRows = [
  {
    item: "Ski 3-piece set (skis, boots, poles)",
    adult: `${SKI_SET} for one day`,
    child: "¥4,000 for one day (primary school and under)",
    note: "Two days is ¥13,000 for an adult and ¥8,000 for a child — exactly double, so there is no multi-day discount to wait for.",
  },
  {
    item: "Snowboard 2-piece set (board, boots)",
    adult: `${SKI_SET} for one day`,
    child: "¥4,000 for one day (primary school and under)",
    note: "Priced identically to the ski set, at both ages and both durations.",
  },
  {
    item: "Wear (jacket and trousers)",
    adult: `${WEAR} for one day`,
    child: "¥3,000 for one day (primary school and under)",
    note: "The line most day-trippers from Tokyo need and do not budget for — you are not going to ski in the coat you flew in.",
  },
  {
    item: "Goggles and helmet",
    adult: "Goggles ¥1,800, helmet ¥2,300 for one day",
    child: "Same prices",
    note: "Two days is ¥3,600 and ¥4,600. Rented as small items rather than inside the sets, which is the detail that makes a 'full kit' day cost more than the two headline lines.",
  },
  {
    item: "PICK UP BOX",
    adult: "+¥1,000 per person",
    child: "+¥1,000 per person",
    note: "The resort's own queue-skip for rental collection, 7:30–12:00. Web booking opens a month before opening day and closes at noon two days before you use it; card prepayment only, limited numbers, and a 100% fee after that noon deadline. The rental period is 19 December to 31 March.",
  },
];

/** What the mountain actually is this season — including the part that is shut. */
const mountainRows = [
  { what: "Courses operating", detail: "12 of the resort's 16: 5 in the Central Area, 6 in the North Area, plus the Falcon descent course" },
  { what: "South Area", detail: "Its 4 courses are closed for the 2026-27 season — 南エリアの営業を休止いたします on the resort's own trail-map page" },
  { what: "Grading", detail: "35% beginner, 45% intermediate, 20% advanced, as the resort publishes it for the whole mountain" },
  { what: "Lifts", detail: "11, including the 8-person Diligence gondola out of the station building" },
  { what: "Longest run", detail: "2,500 m — the Falcon descent course" },
  { what: "Elevation", detail: "1,181 m at the top, 358 m at the base; 70 hectares; 33° at the steepest" },
  { what: "Hours", detail: "2026-27 daily hours: awaiting the official announcement. Rental opens 7:30 from 19 December" },
];

/** Tour versus the shinkansen, which is the decision the page is really about. */
const shapeRows = [
  {
    shape: "Shinkansen, independent",
    covers: "Train to GALA Yuzawa, lift ticket and rental bought at the resort or online",
    verdict: "The right answer for most people, and the one with the most hours on snow",
    note: `${FASTEST} at fastest and the station is inside the building. The cost is that you are assembling four purchases — seat, lift ticket, gear, wear — and GALA charges at least ¥500 more at the window than online on every pass.`,
  },
  {
    shape: "Shinkansen + a JR East pass",
    covers: "The rail legs covered by the TOKYO Wide Pass or the JR EAST PASS",
    verdict: "Worth pricing only if GALA is one of two or three day trips, not if it is the only one",
    note: `The pass is ${PASS_ADULT} for three consecutive days, and JR East's own worked example — a GALA return plus a Nikko return in reserved seats — is ${JR_EXAMPLE}. One GALA day on its own does not get there.`,
  },
  {
    shape: "Booked coach day from Tokyo",
    covers: "Round-trip transport in one booking to Iwappara, with snow play, rental or lessons as listing options; meals not included",
    verdict: "The pick for a first-ever ski day, or for anyone who would rather buy one thing than four",
    note: "Slower each way than the shinkansen and it is not GALA — these go to the neighbouring resorts in the same basin. What you are buying is that nothing is left to arrange on the morning.",
  },
  {
    shape: "Chartered car",
    covers: "Door-to-door to GALA or Naeba, resort chosen at booking",
    verdict: "For a group, a family with small children, or a start earlier than the first train",
    note: "Per vehicle rather than per seat, so it stops being extravagant at four people — and it is the only version where the gear travels in the boot rather than on your shoulder through Tokyo Station.",
  },
];

const faqItems = [
  {
    q: "How do I get to Gala Yuzawa from Tokyo?",
    a: `Take the Joetsu Shinkansen from Tokyo Station straight to GALA Yuzawa — ${FASTEST} at fastest on the resort's own figure and on JR East's own travel site, both read ${OWN}, with another JR East page putting it at 75 minutes. What makes this the easiest ski day in Japan is not the time but the station: GALA Yuzawa is a seasonal shinkansen station built into the ski centre itself, so you walk off the train and into the building where the lift tickets, the rental counter and the gondola are. There is no connecting bus and no taxi. Two things to know. The station operates only in winter and spring on JR East's own note, so outside GALA's season you travel to Echigo-Yuzawa, one stop away and open all year, and take the resort's free shuttle for about 10 minutes. And not every Joetsu service calls there — the GALA trains are the ones to check when you pick a departure.`,
  },
  {
    q: "Can you do a ski day trip from Tokyo?",
    a: `Yes, and GALA Yuzawa is the clearest case in the country. ${FASTEST} on the shinkansen to a station inside the resort means a morning train out and a train home the same evening. GALA's daily hours for 2026-27 are awaiting the official announcement as of ${OWN}, so check them before you pick trains. The honest version of the answer includes what it costs, because the travel is the cheap part of a day trip and the resort is not: a gondola-and-lift day is ${LIFT_WINDOW} at the window or ${LIFT_WEB} online, a ski or snowboard set is ${SKI_SET}, and wear is another ${WEAR} if you are not carrying any — so a gear-free adult day on the snow is ¥19,500 to ¥20,000 before the train. The alternative shape is a booked coach day out of Tokyo to Iwappara, a neighbouring Yuzawa resort rather than GALA, with rental or lessons as options on the listing and a longer ride each way.`,
  },
  {
    q: "When does Gala Yuzawa open for the 2026-27 season?",
    a: `The resort publishes two dates and they are not the same thing. Sightseeing operation — the gondola and the sightseeing lift only, with no skiing or snowboarding permitted — runs from ${SIGHTSEEING_OPEN} to 18 December 2026. Slope operation, meaning you can actually ski, starts ${SLOPES_OPEN} and is scheduled through to ${SLOPES_CLOSE}, which takes it to the end of Golden Week. Both are GALA's own published dates, read ${OWN}, and the resort attaches its own caveat that operating periods and content may change with snow conditions and weather. If you are booking the week of 12–18 December for a ski day, you are booking a gondola ride.`,
  },
  {
    q: "How much are Gala Yuzawa lift tickets for 2026-27?",
    a: `A one-day gondola-and-lift pass is ${LIFT_WINDOW} for an adult at the window and ${LIFT_WEB} online, with a primary-school child ¥4,000 and ¥3,500 — the resort's own prices, read ${OWN}. There are two cheaper options and both are real choices rather than traps. The gondola-and-Barouche pass is ¥6,500 at the window and ¥5,500 online for an adult (¥3,400 and ¥2,900 for a child) and limits you to the gondola and the Barouche quad, which is enough for a first day or a snow-play day. The four-hour pass is ¥7,500 and ¥7,000, only ¥500 under the full day, so it buys a late start rather than a saving. Preschool children are free, two per paying adult, with a third paying the primary-school rate. Buying online rather than at the window is worth at least ¥500 on every adult pass, which is the single easiest saving on this day. GALA's ¥4,300 super-early ticket, 1,000 of them from 5 October, has sold out.`,
  },
  {
    q: "Can I rent ski gear at Gala Yuzawa?",
    a: `Yes — and this is the resort that makes a gear-free day trip practical, because the rental counter is in the same building as the station. GALA's own prices, read ${OWN}: a ski three-piece set and a snowboard two-piece set are both ${SKI_SET} for one day from junior-high age up and ¥4,000 at primary-school age and under, and two days is exactly double at ¥13,000 and ¥8,000, so there is no multi-day discount. Wear — jacket and trousers — is a separate ${WEAR} for an adult and ¥3,000 for a child. Goggles (¥1,800 one day, ¥3,600 two) and helmets (¥2,300 and ¥4,600) are rented as small items rather than inside the sets, which is why a full kit costs more than the two headline lines suggest. The one thing worth booking ahead is the PICK UP BOX: ¥1,000 extra per person, limited in number, with web booking opening a month before opening day and closing at noon two days before you use it. It replaces the wait at the rental counter.`,
  },
  {
    q: "Is Gala Yuzawa good for beginners?",
    a: `Yes, with one caveat specific to this season. On the resort's own trail-map figures read ${OWN}, 35% of the terrain is graded beginner, 45% intermediate and 20% advanced, with 11 lifts, and the gondola lifts you out of the station building to the top of the beginner terrain rather than making you ride a chair from the bottom. For a first-ever day that is close to ideal. The caveat: the South Area is closed for 2026-27 — 南エリアの営業を休止いたします on GALA's own page — so the 16 courses older guides describe are 12 this season: the Central Area's five, the North Area's six and the Falcon descent run. The other thing beginners get wrong here is the shopping list: GALA sells the lift ticket, the rental set and the lessons as three separate purchases, so a day booked with a pass and gear but no instruction leaves you on 35% beginner terrain with nobody to show you how to use it.`,
  },
  {
    q: "Does the JR Tokyo Wide Pass cover Gala Yuzawa?",
    a: `Yes. GALA Yuzawa is inside the valid area and the pass covers the Joetsu Shinkansen to it in a reserved or non-reserved ordinary-car seat — JR East names GALA Yuzawa among the pass's own destinations. The pass is ${PASS_ADULT} for an adult and ¥8,000 for a child for three consecutive days, prices in force since 14 March 2026 when they rose from ¥15,000 and ¥7,500, checked ${PASS_CHECKED}. Whether it pays is a separate question, and JR East answers it with its own worked example: a GALA Yuzawa return plus the Nikko limited express out and back, all in reserved seats, is ${JR_EXAMPLE} bought separately. That is one GALA day plus one more day trip — so the pass clears its cost on two day trips, not on one. One seasonal catch worth knowing: GALA Yuzawa station itself operates only in winter and spring, so in summer the pass takes you to Echigo-Yuzawa instead. Our full break-even is in the TOKYO Wide Pass guide.`,
  },
  {
    q: "What time does Gala Yuzawa open, and how long is a day there?",
    a: `GALA's daily hours for 2026-27 are awaiting the official announcement: its hours-and-prices page, read ${OWN}, gives the operating dates and prices but no times, and the gondola times on its older page belong to earlier operation, so they are not repeated here as this season's. What is published is that rental collection runs from 7:30 from 19 December and the PICK UP BOX from 7:30 to 12:00, and that dates and hours can change with snow and weather. An early shinkansen out of Tokyo is what makes the day trip work. The two things that eat into the day are the rental queue on a weekend morning, which the ¥1,000 PICK UP BOX exists to remove, and buying your pass at the window rather than online — at least ¥500 more and a line to stand in.`,
  },
  {
    q: "Do I need to book a Gala Yuzawa day in advance?",
    a: `The lift ticket and rental, no — but booking them is worth at least ¥500 a head on the pass and the rental queue on the gear. What genuinely needs a decision in advance is the shape of the day. If you want JR East's own shinkansen-plus-lift-ticket package, note that as of ${OWN} the 2026-27 JR SKISKI GALA packages were still marked "Coming Soon" on JR East's own travel site, with reservations expected around mid-November 2026 — so a reader planning in early November cannot book that version yet and should check back. A reseller's lift ticket and lesson listings are on sale now and take a foreign card. Lessons are the one thing to book rather than buy on the day, because instruction is capacity-limited in a way a lift ticket is not. And if you are going by coach or chartered car, that is a seat or a vehicle on a fixed date — the earliest deadline on the page.`,
  },
  {
    q: "What should I wear for a day at Gala Yuzawa?",
    a: `Assume you are renting the outer layers, because almost nobody flies to Tokyo with ski clothing. GALA rents a jacket-and-trousers set at ${WEAR} for an adult and ¥3,000 for a child for the day, plus goggles at ¥1,800 and a helmet at ¥2,300 for the day as separate items — its own prices, read ${OWN}. What the resort does not rent is the layer against your skin, so bring thermal base layers, ski socks (not cotton), and gloves if you own them. The context: the top of the mountain is 1,181 m and the base 358 m, so the weather at the gondola top is a different proposition from the station platform, and the resort's own notice is that dates and hours change with snow and weather. A ski day is also the one day of a Japan trip where travel insurance wording matters: on-piste skiing is covered by some policies and needs an add-on on others, and off-piste often sits outside the wording.`,
  },
];

/** The same-trip block: the pass and transfer first, then what GALA sells separately. */
const sameTripItems: KlookTripPrepItem[] = [
  {
    label: "Klook Japan eSIM",
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
    why: "GALA states that its operating dates and hours change with snow and weather, and its 2026-27 daily hours are still to come. A closure notice or a held shinkansen reaches you on your phone at a seasonal station, and nowhere else.",
  },
  {
    label: "Narita Express (N'EX) round-trip ticket",
    ctaLabel: "Check the N'EX round trip →",
    url: naritaExpressRoundTripUrl,
    why: "It reaches Tokyo Station, where the Joetsu Shinkansen to GALA leaves. Skip it if your TOKYO Wide Pass days start on arrival: JR East says the pass includes reserved N'EX seats.",
  },
  {
    label: hanedaLimousineBus.title,
    ctaLabel: "Check the limousine bus →",
    url: hanedaLimousineBus.url,
    why: "The Haneda version, boarded with a QR code. Worth having if you land with ski bags, because you still need to get them to your Tokyo hotel before the train north.",
  },
  {
    label: jrTokyoWidePass.title,
    ctaLabel: "Check the TOKYO Wide Pass →",
    url: jrTokyoWidePass.url,
    why: "The one booking with real arithmetic behind it. JR East's own example is a GALA return plus a Nikko return in reserved seats at about ¥21,500, against ¥16,000 for three consecutive days, so a GALA day plus one more day trip is roughly where it starts paying.",
  },
  {
    label: galaYuzawaLiftTicket.title,
    ctaLabel: "Check the GALA lift ticket →",
    url: galaYuzawaLiftTicket.url,
    why: "GALA's window price for a gondola-and-lift day is ¥8,000 adult and its web price ¥7,500, so buying ahead is worth ¥500. A reseller checkout also takes a foreign card and reads in English.",
  },
  {
    label: galaYuzawaSkiLesson.title,
    ctaLabel: "Check GALA lessons →",
    url: galaYuzawaSkiLesson.url,
    why: "The purchase a first-timer forgets. Lift ticket, rental and instruction are separate items at GALA, and the listing states you still need a lift ticket on top of the lesson.",
  },
];

const TITLE = "Gala Yuzawa Ski Day Trip from Tokyo: 71 Min, ¥8,000 Lifts";
const DESCRIPTION =
  "Gala Yuzawa ski day trip from Tokyo: 71 minutes on the Joetsu Shinkansen to a station inside the resort. 2026-27 dates, ¥8,000 lift tickets and rental.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo") },
});

export default function GalaYuzawaSkiDayTripFromTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" />
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
              route: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo",
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
                  name: "Gala Yuzawa Ski Day Trip from Tokyo",
                  item: "https://www.japan-travel-kit.com/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo",
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
          <span className={styles.breadCurrent}>Gala Yuzawa Ski Day Trip from Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Gala Yuzawa Ski Day Trip from Tokyo:<br />{FASTEST}, and What the Day Costs
          </h1>
          <p className={styles.heroSubtitle}>
            The one Japanese ski resort with a shinkansen station inside it. The slopes open{" "}
            {SLOPES_OPEN} — and the South Area does not open at all this season.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "2026-27 dates, official", "GALA's own lift & rental prices", "Wide Pass break-even"].map((t) => (
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
          heading="Which Gala Yuzawa Ski Day Trip from Tokyo Can You Book Now?"
          checkedIso="2026-11-06"
          deadline={
            <>
              Book by 30 November for any date from 19 December through the New Year, when the slopes
              first open: 12–18 December is gondola-only, with no skiing. For January and February, book
              at least three weeks out. JR East&apos;s own JR SKISKI packages are expected around
              mid-November, and GALA&apos;s PICK UP BOX rental booking opens a month before opening day.
            </>
          }
          tours={[
            {
              title: yuzawaIwapparaSkiDayTourTokyo.title,
              url: yuzawaIwapparaSkiDayTourTokyo.url,
              price: null,
              duration: "11 to 12.5 hours",
              departs: "Tokyo",
            },
            {
              title: galaNaebaSkiDayTripTokyo.title,
              url: galaNaebaSkiDayTripTokyo.url,
              price: "about US$475–546 per vehicle",
              duration: "10-hour charter",
              departs: "Your hotel in Tokyo's 23 wards",
            },
            {
              title: galaYuzawaSkiLesson.title,
              url: galaYuzawaSkiLesson.url,
              price: null,
              duration: "3 to 6 hours",
              departs: "Meets at GALA Yuzawa",
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
                <p className={styles.verdictStatLabel}>From Tokyo Station</p>
                <p className={styles.verdictStatValue}>{FASTEST}, no transfer</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Slopes open</p>
                <p className={styles.verdictStatValue}>19 Dec 2026 – 5 May 2027</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Lift pass, 1 day</p>
                <p className={styles.verdictStatValue}>{LIFT_WINDOW} window / {LIFT_WEB} web</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Gear, 1 day</p>
                <p className={styles.verdictStatValue}>{SKI_SET} set + {WEAR} wear</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Gala Yuzawa ski day trip from Tokyo</strong> is{" "}
              <strong>{FASTEST}</strong> on the Joetsu Shinkansen from Tokyo Station — and the reason it
              is the easiest ski day in Japan is that <strong>GALA Yuzawa is a shinkansen station built
              inside the ski centre</strong>, so you walk off the train into the building where the lift
              tickets and the rental counter are. No bus, no transfer, no overnight. For{" "}
              <strong>2026-27</strong> the resort opens its gondola for sightseeing only from{" "}
              <strong>{SIGHTSEEING_OPEN}</strong> and its <strong>slopes from {SLOPES_OPEN}</strong>{" "}
              through to <strong>{SLOPES_CLOSE}</strong>, with the <strong>South Area closed</strong> for
              the whole season — so the mountain is 12 courses in the Central and North Areas and the
              Falcon descent, not the 16 older guides list. What the day costs is three separate purchases, not one: a one-day
              gondola-and-lift pass is <strong>{LIFT_WINDOW}</strong> at the window or{" "}
              <strong>{LIFT_WEB}</strong> online, a ski or snowboard set is <strong>{SKI_SET}</strong>,
              and jacket-and-trousers is another <strong>{WEAR}</strong>. Daily hours for 2026-27 are
              awaiting the official announcement. Every figure is GALA&apos;s own, read {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Price the TOKYO Wide Pass →
              </KlookLink>
              <KlookLink href={galaYuzawaSkiLesson.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                GALA Lessons &amp; Coaching →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Same trip */}
        <KlookTripPrep
          label="Book on the same trip"
          heading="What a Gala Yuzawa Day Actually Books"
          intro="Connectivity and the airport first, then the pass, then what GALA sells as separate purchases: the lift ticket and the instruction are the two a first ski day trip tends to under-book. Klook prices change by date, so open a listing for the figure on your own dates."
          items={sameTripItems}
        />

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Gala Yuzawa from Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The <strong>Joetsu Shinkansen from Tokyo Station, straight to GALA Yuzawa</strong>, in{" "}
            <strong>{FASTEST}</strong> at fastest. GALA&apos;s own site and JR East&apos;s own travel arm
            both publish that figure; another JR East page says 75 minutes. Either way the time is not
            what makes this trip unusual — the station is. <strong>GALA Yuzawa is a seasonal shinkansen
            station built into the ski centre</strong>, opened in 1990 and directly connected to the
            resort, so the walk from the ticket gate to the lift-ticket counter is indoors and takes a
            minute. Two practical notes: not every Joetsu service calls at GALA Yuzawa, and the station
            runs only in winter and spring, so outside the season you use Echigo-Yuzawa one stop away and
            the resort&apos;s free shuttle.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Cost", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Why there is no shinkansen fare in that table.</strong> JR East&apos;s
            point-to-point English fare for this route is not quoted here, and a guessed shinkansen
            fare is exactly the figure that makes a break-even calculation worthless — the same call our{" "}
            <Link href="/guides/transport/tokyo-wide-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              TOKYO Wide Pass guide
            </Link>{" "}
            makes and documents. What JR East does publish is a worked example for the pass, and that is
            the arithmetic used further down this page. Times and the shuttle are GALA&apos;s own and JR
            East&apos;s own, read {OWN}.
          </p>
        </section>

        {/* Season dates */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Season</span>
          <h2 className={styles.sectionTitle}>When Does Gala Yuzawa Open for the 2026-27 Season?</h2>
          <p className={styles.bodyText}>
            The resort publishes <strong>two dates, and they are not the same thing</strong>.{" "}
            <strong>Sightseeing operation</strong> — the gondola and the sightseeing lift only, with
            skiing and snowboarding not permitted — runs <strong>{SIGHTSEEING_OPEN} to 18 December
            2026</strong>. <strong>Slope operation</strong>, the part where you can actually ski, starts{" "}
            <strong>{SLOPES_OPEN}</strong> and is scheduled to {SLOPES_CLOSE}, which carries it through
            Golden Week. Both are GALA&apos;s own published dates, read {OWN}, and the resort attaches its
            own caveat that operating periods and content may change with snow and weather. Book the week
            of 12–18 December expecting to ski and you have booked a gondola ride.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `GALA Yuzawa, 2026-27 (read ${OWN})`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mountainRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Courses, grading, lifts, elevation and the South Area closure are GALA&apos;s own trail-map
            page, read {OWN}. The resort&apos;s hours page has no 2026-27 daily times yet, so none are
            given here rather than last season&apos;s. The <strong>South Area closure is specific to 2026-27</strong>{" "}
            and is the one thing older guides to this resort will not tell you.
          </p>
        </section>

        {/* Lift tickets */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Lift tickets</span>
          <h2 className={styles.sectionTitle}>How Much Are Gala Yuzawa Lift Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>{LIFT_WINDOW} for an adult day at the window, {LIFT_WEB} online</strong> — and a gap
            of at least ¥500 applies to every pass GALA sells, which makes buying ahead the easiest saving
            on this whole day. There are two genuinely cheaper options rather than one, and the four-hour pass is
            not really one of them.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "At the window", "Web price", "The thing to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {liftRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.window}</td>
                      <td className={styles.tdPrice}>{row.web}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every figure is GALA Yuzawa&apos;s own 2026-27 price list, read {OWN}. &ldquo;Primary-school
            child&rdquo; is the resort&apos;s 小学生 band. Confirm at your own checkout. GALA&apos;s ¥4,300
            super-early ticket, 1,000 of them on sale from 5 October 2026, is marked sold out, so the web
            price above is the one on the table.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={galaYuzawaLiftTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              GALA lift ticket →
            </KlookLink>
            <KlookLink href={galaYuzawaSkiLesson.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              GALA ski &amp; snowboard coaching →
            </KlookLink>
          </div>
        </section>

        {/* Rental */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Rental</span>
          <h2 className={styles.sectionTitle}>Can I Rent Ski Gear at Gala Yuzawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, and the counter is in the same building as the station — which is the whole reason a
            gear-free day trip from Tokyo works here. What it is worth knowing before you add it up is
            that GALA prices the <strong>gear and the clothing separately</strong>, and sells goggles and
            helmets as small items on top of both.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Junior high and over", "Primary school and under", "The thing to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rentalRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.adult}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Add it up once before you book.</strong> A gear-free adult on a one-day gondola-and-lift
            pass bought online is {LIFT_WEB} plus {SKI_SET} for the set plus {WEAR} for wear — before
            goggles, a helmet, the shinkansen or lunch. That total is why the Klook listings on this page
            are worth comparing against buying each piece at the counter, and why the PICK UP BOX at ¥1,000
            is the one upsell here that buys you something concrete: no wait at the rental counter.
            All prices GALA&apos;s own, read {OWN}.
          </p>
        </section>

        {/* Beginners */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Beginners</span>
          <h2 className={styles.sectionTitle}>Is Gala Yuzawa Good for Beginners?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes — <strong>35% of the terrain is graded beginner</strong> and the gondola carries you out of
            the station building to the top of it, so you never ride a chair cold. The caveat is this
            season specifically: the South Area is shut, so the mountain is smaller than older guides
            describe.
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>What is in your favour</p>
              <p className={styles.whoForDesc}>
                A mountain graded 35% beginner, 45% intermediate and 20% advanced on the resort&apos;s
                own figures, eleven lifts, and a station-to-slope walk measured in minutes. For a
                first-ever day on snow that beats every other resort reachable from Tokyo in a day,
                because nothing about the logistics can go wrong before you start.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>What is against it this season</p>
              <p className={styles.whoForDesc}>
                The South Area does not operate in 2026-27 — the resort&apos;s own wording is
                南エリアの営業を休止いたします. You have 12 courses: the Central Area&apos;s five, the
                North Area&apos;s six and the Falcon descent run. Enough for a beginner day; thin for a
                second visit, and a reason to look at the Hakuba and Naeba day trips instead.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>The purchase beginners miss</p>
              <p className={styles.whoForDesc}>
                Instruction. GALA&apos;s price list sells lift tickets and rental sets; lessons are a
                separate booking, and the Klook listing states outright that you still need a lift ticket
                on top of the lesson. A day with a pass and gear but no coach is 35% beginner terrain and
                nobody to show you how to use it.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>The cheapest first-day shape</p>
              <p className={styles.whoForDesc}>
                The gondola-and-Barouche pass at ¥6,500 window or ¥5,500 web, rather than the full
                ¥8,000 pass. A first-timer is not going to leave the gondola and Barouche terrain, so the
                full-mountain pass is ¥2,500 of lifts you will not ride. Resort&apos;s own prices, read {OWN}.
              </p>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={galaYuzawaSkiLesson.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              GALA 1-day coaching →
            </KlookLink>
            <KlookLink href={yuzawaIwapparaSkiDayTourTokyo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Beginner coach day from Tokyo →
            </KlookLink>
          </div>
        </section>

        {/* Pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Passes</span>
          <h2 className={styles.sectionTitle}>Does the JR Tokyo Wide Pass Cover Gala Yuzawa?</h2>
          <p className={styles.bodyText}>
            <strong>Yes.</strong> GALA Yuzawa is inside the valid area, JR East names it among the
            pass&apos;s own destinations, and the pass covers the Joetsu Shinkansen to it in a reserved or
            non-reserved ordinary-car seat. The pass is <strong>{PASS_ADULT}</strong> for an adult and{" "}
            <strong>¥8,000</strong> for a child aged 6–11, for <strong>three consecutive days</strong> —
            prices in force since <strong>14 March 2026</strong>, when they rose from ¥15,000 and ¥7,500.
            Checked {PASS_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Whether it <em>pays</em> is the question worth answering, and JR East answers it with its own
            worked example rather than ours: a <strong>GALA Yuzawa return plus the Nikko limited express
            out and back</strong>, all in reserved seats, comes to <strong>{JR_EXAMPLE}</strong> bought
            separately against {PASS_ADULT} for the pass. Read that carefully — the example is{" "}
            <strong>two</strong> day trips. One GALA day on its own does not clear a {PASS_ADULT} pass, so
            the honest rule is: buy the pass if GALA is one of two or three real day trips out of Tokyo,
            and buy a point-to-point ticket if it is the only one. The seasonal catch: GALA Yuzawa station
            operates only in winter and spring, so outside the season the same pass takes you to
            Echigo-Yuzawa instead. Our{" "}
            <Link href="/guides/transport/tokyo-wide-pass">TOKYO Wide Pass guide</Link> works the
            break-even across every Kanto day trip, and the{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> does the same for the
            national pass.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Price the TOKYO Wide Pass →
            </KlookLink>
            <KlookLink href={jrEastPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR EAST PASS (5 or 10 days) →
            </KlookLink>
          </div>
        </section>

        {/* Tour vs DIY */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour or train</span>
          <h2 className={styles.sectionTitle}>Should You Book a Tour or Just Take the Shinkansen?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Take the shinkansen if you want the most snow time; book a coach day if you want the fewest
            decisions. The thing to be clear about is that these are not the same resort — GALA is where
            the train goes, and the Tokyo coach days go to Iwappara and the neighbouring Yuzawa hills.
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>One booking detail no AI answer can finish for you</strong>, and it is live right now.
            As of {OWN}, JR East&apos;s own travel site still listed its 2026-27 <em>JR SKISKI</em> GALA
            shinkansen-and-lift packages as &ldquo;Coming Soon&rdquo;, with reservations expected around
            mid-November 2026. So the official bundled version is not bookable yet for this season, while
            the reseller listings below are on sale, take a foreign card and read in English. If the
            package is what you want, diary mid-November; if you want the date held now, book the pieces.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={yuzawaIwapparaSkiDayTourTokyo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Yuzawa coach day from Tokyo →
            </KlookLink>
            <KlookLink href={galaNaebaSkiDayTripTokyo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              GALA / Naeba chartered day →
            </KlookLink>
          </div>
        </section>

        {/* The rest of the winter */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The rest of your winter</span>
          <h2 className={styles.sectionTitle}>What Pairs Well With a GALA Day?</h2>
          <p className={styles.bodyText}>
            GALA is one day out of a Tokyo base, so plan it around the rest of the trip. Our{" "}
            <Link href="/guides/attractions/japan-winter-itinerary">12-day Japan winter itinerary</Link>{" "}
            shows how a Tokyo stay fits with snow country further north and west. The other winter day
            trip worth pricing alongside it is the{" "}
            <Link href="/guides/attractions/jigokudani-snow-monkey-tour">snow monkey tour to Jigokudani</Link>:
            GALA on the Joetsu Shinkansen and Nagano on the Hokuriku Shinkansen are both on the JR EAST
            PASS, which changes the sums if you do both. After a ski day, get back to the city in time for
            one of the{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo winter illuminations</Link>,
            which only need an evening.
          </p>
          <p className={styles.bodyText}>
            If you are in Japan in January, settle the{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go light-up tour</Link>{" "}
            first and fit GALA around it, because the light-up runs on four fixed evenings and GALA runs
            all season. If a first day leaves you wanting a proper ski week, the next step up is{" "}
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link> in Hokkaido. A
            February trip north can be built around the{" "}
            <Link href="/guides/attractions/sapporo-snow-festival-tours">Sapporo Snow Festival tours</Link>{" "}
            on 4–11 February 2027, with an{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo">Otaru day trip from Sapporo</Link>{" "}
            added on, or stretched into a full{" "}
            <Link href="/guides/attractions/hokkaido-7-day-itinerary">7-day Hokkaido itinerary</Link>.
          </p>
        </section>

        {/* Insurance */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you ski</span>
          <h2 className={styles.sectionTitle}>Does Your Travel Insurance Cover a Ski Day?</h2>
          <p className={styles.bodyText}>
            Check before you buy the lift ticket, not after. Whether a policy covers snowsports depends on
            the policy: SafetyWing, for example, covers on-piste skiing and snowboarding if you wear a
            helmet, while off-piste is outside that wording, and other policies may need an add-on. A single
            day on snow is the day of a Japan trip most likely to produce a hospital bill, which is why this is the one thing on the page that matters more
            than the ¥500 you save buying the pass online. Our{" "}
            <Link href="/guides/money/japan-ski-travel-insurance">best travel insurance for skiing in Japan</Link>{" "}
            sets out what the common exclusions actually say and what counts as off-piste.
          </p>
          <p className={styles.bodyText}>
            The other two things worth sorting before a GALA day. <strong>Data</strong>, because the resort
            states in its own notices that operating dates and hours change with snow and weather, and a
            seasonal station on a branch line is exactly where a closure notice reaches you by phone and
            nowhere else —{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              see Klook eSIM options →
            </KlookLink>{" "}
            and our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it
            against the alternatives. And <strong>a payment method</strong>: the resort&apos;s own booking
            flow is built for domestic cards, which is a large part of why resellers exist for this
            resort at all.
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
          heading="The Other Ski Days Within Reach of Tokyo"
          intro="GALA is the fastest, not the only one. These are the alternatives when the Yuzawa basin is thin on snow, when the South Area closure makes 12 courses feel small, or when you would rather buy one booking than four."
          tours={[yuzawaIwapparaSkiDayTourTokyo, galaNaebaSkiDayTripTokyo, hakubaSkiResortDayTourTokyo, galaYuzawaSkiLesson]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 3 Nov 2026: the other winter day out of Tokyo — the snow monkeys near Nagano. */}
            <Link href="/guides/attractions/jigokudani-snow-monkey-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Snow Monkey Tour from Tokyo: Jigokudani Park Guide 2027</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 3 Nov 2026: the 5- and 10-day JR East pass that also covers the Joetsu Shinkansen. */}
            <Link href="/guides/transport/jr-east-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR East Pass (2026): Price, Coverage and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-wide-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Tokyo Wide Pass (2026): ¥16,000 for 3 Days — Worth It?</p>
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
                  <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Ski Travel Insurance: What Standard Policies Exclude</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/niseko-ski-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Niseko Ski Tours (2027): Airport Transfers, Lessons &amp; the Four Areas</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-winter-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Winter Itinerary: 12 Days, Day by Day (2027)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 6 Nov 2026: the rest of the nine winter guides. */}
            {[
              { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama and Shirakawa-go Tour (2027): Which Departure" },
              { href: "/guides/attractions/sapporo-snow-festival-tours", title: "Sapporo Snow Festival Tours (2027)" },
              { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo (2027)" },
              { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7 Day Itinerary: 7 Days in Hokkaido, Day by Day" },
              { href: "/guides/attractions/tokyo-illumination-tours", title: "Tokyo Illuminations: Dates, Hours and the Free Ones" },
              { href: "/guides/attractions/tokyo-snow-day-trip", title: "Tokyo Snow Day Trip (2026–27): Yeti, Fujiten or Gala" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V8l5-3 5 3v13" />
                  <path d="M13 21V11l5-3 3 2v11" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Karuizawa Day Trip from Tokyo (2026): Shinkansen, Outlets &amp; Snow</p>
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
            <h2 className={styles.ctaBannerTitle}>{FASTEST} from Tokyo, and three things to buy</h2>
            <p className={styles.ctaBannerDesc}>
              The slopes open {SLOPES_OPEN}. The lift ticket is {LIFT_WINDOW} at the window and{" "}
              {LIFT_WEB} online, the gear is separate, and the instruction is separate again — which is
              why the honest order is pass first, then lesson.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Price the TOKYO Wide Pass →
              </KlookLink>
              <KlookLink href={galaYuzawaSkiLesson.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                See GALA Lessons →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
