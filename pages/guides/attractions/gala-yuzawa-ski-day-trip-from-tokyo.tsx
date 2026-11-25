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
  shinkansenTokyoGalaYuzawa,
  yuzawaIwapparaSkiDayTourTokyo,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../lib/klook-links";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import { hreflangLinks } from "../../../components/Hreflang";

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
 * Re-read 15 November 2026 for the ranking rewrite (task R04: "how to get to Gala
 * Yuzawa from Tokyo" was ranking 50–66, so the title, H1 and opening now lead with
 * the route rather than the lift price):
 *
 *   gala.co.jp/winter/hours-pricing/  dates and all lift prices unchanged; the daily
 *                              hours table is still commented out in the page source,
 *                              so hours stay "awaiting the announcement".
 *   gala.co.jp/winter/rental/  and /gelande/: unchanged (sled ¥2,500 also listed).
 *   gala.co.jp/winter/activities/  ゆきあそびパーク at the gondola top, entry with the
 *                              ゴンドラ&バルーシュ券, sled ¥2,500, 8:30–16:00; Barouche sky
 *                              lift to the 愛の鐘 viewpoint 10:00–16:00, about 30 min;
 *                              gondola about 8 min, preschool free.
 *   jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf  (pdfjs) GALA operates from 12
 *                              Dec, slopes from 19 Dec; regular Tanigawa trains are
 *                              extended to GALA Yuzawa from the start of operation and
 *                              extra trains run, e.g. Tanigawa 71 Tokyo 6:24 → GALA
 *                              Yuzawa 7:35, Tanigawa 86 GALA Yuzawa 17:04 → Tokyo 18:20,
 *                              and a night return, Tanigawa 198 GALA 20:19 → Tokyo 21:40
 *                              on 16 & 30 Jan and 13 & 27 Feb 2027.
 *   jreast.co.jp/en/multi/destinations/gala.html  71 minutes; also "approximately 1
 *                              hour 20 minutes ... Tanigawa".
 *   jreast.co.jp/en/multi/pass/  TOKYO Wide ¥16,000 / ¥8,000; JR EAST PASS 5 days
 *                              ¥35,000 / ¥17,500, 10 days ¥50,000 / ¥25,000.
 *   japanrailpass.net/en/      the pass covers all JR Group shinkansen except NOZOMI
 *                              and MIZUHO; Gran Class on the Joetsu line needs extra
 *                              fees. Ordinary 7-day ¥50,000 online, ¥53,000 at an agency.
 *   jre-travel.com/seasonal/ski/gala/  JR SKISKI still "Coming Soon", bookings from
 *                              mid-November; SPAガーラの湯 adult ¥1,500.
 *   Point-to-point fare: the eki-net e-ticket tables still carry pre-14-March-2026
 *   prices (Tokyo–Niigata ¥10,560, which JR East's own revision pamphlet raises to
 *   ¥10,780), so no Tokyo–GALA fare is printed; the reader sees it at checkout.
 *
 * Nothing here is first-hand. The top block shows the one from-price a klook.com
 * index result tied to its listing; the body has none, because Klook answers
 * automated reads of its product pages with HTTP 403.
 */

const OWN_ISO = "2026-11-15";
const OWN = checkedLabel(OWN_ISO);
/** The pass prices and JR East's worked example were re-read on this date. */
const PASS_CHECKED = checkedLabel("2026-11-15");
const JRP_7DAY = "¥50,000";
const EAST_PASS_5DAY = "¥35,000";
const SLED = "¥2,500";

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
    leg: "Best: Tokyo Station → GALA Yuzawa, direct Joetsu Shinkansen (Tanigawa)",
    time: `${FASTEST} at fastest — e.g. Tanigawa 71, Tokyo 6:24 → GALA Yuzawa 7:35; JR East's destination page also says about 1 h 20 min on the Tanigawa`,
    trains: "Seasonal: from 12 December 2026 JR East extends regular Tanigawa trains to GALA Yuzawa and adds extra trains; also calls at Ueno and Omiya",
    cost: `Covered by the JAPAN RAIL PASS, JR TOKYO Wide Pass (${PASS_ADULT}) and JR EAST PASS; otherwise a shinkansen ticket priced at checkout`,
    note: "GALA Yuzawa is a seasonal shinkansen station built into the ski centre, so you walk out of the ticket gate into the building where the lift tickets and the rental are sold. No bus, no transfer, no taxi. Not every Tanigawa runs through, so pick a train that shows GALA Yuzawa as its terminus.",
  },
  {
    leg: "Tokyo Station → Echigo-Yuzawa, then the free shuttle",
    time: "The shinkansen to Echigo-Yuzawa, then about 10 minutes on the resort's free shuttle",
    trains: "Echigo-Yuzawa is a year-round Joetsu Shinkansen station, one stop before GALA Yuzawa",
    cost: "Shuttle free; the rail leg is covered by the same three passes",
    note: "The fallback when the through train you want is full or not running that day, and the only way in outside GALA's season: Echigo-Yuzawa is a year-round station one stop away, while GALA Yuzawa station runs only in winter and spring on JR East's own note.",
  },
  {
    leg: "Booked coach day from Tokyo (ski bus tour)",
    time: "11 to 12.5 hours door to door, pick-up in Tokyo",
    trains: "Fixed departure dates on the listing",
    cost: "Per seat, by date — open the listing for your date",
    note: "A different product rather than a cheaper one: the coach days go to Iwappara, a neighbouring Yuzawa resort rather than GALA, with round-trip transport in one booking and rental or lessons as options. Slower than the shinkansen, and nothing left to assemble.",
  },
  {
    leg: "Chartered car to GALA or Naeba",
    time: "10-hour charter, door to door",
    trains: "Any date the operator accepts",
    cost: "Per vehicle, by date — open the listing",
    note: "The version for a family or a group with gear, or for a morning too early for the first train. The resort is picked at booking, so it covers a GALA day and a Naeba day on the same listing.",
  },
];

/** What a Gala Yuzawa day trip costs on GALA's own 2026-27 web prices. */
const costRows = [
  {
    item: "Gear-free adult ski or snowboard day (lift + set + wear, web prices)",
    price: "¥19,500 + the train",
    note: `The answer most day-trippers need: ${LIFT_WEB} lift pass + ${SKI_SET} ski or board set + ${WEAR} jacket and trousers. At the window the lift pass is ${LIFT_WINDOW}, so ¥20,000.`,
  },
  {
    item: "Shinkansen, Tokyo ⇄ GALA Yuzawa",
    price: `Pass, or a ticket priced at checkout`,
    note: `The JR TOKYO Wide Pass is ${PASS_ADULT} for 3 days; JR East's own example of a GALA return plus a Nikko return in reserved seats is ${JR_EXAMPLE}. JR East revised its fares on 14 March 2026, so check the one-way price for your date at checkout.`,
  },
  {
    item: "Gondola & lift pass, 1 day (adult)",
    price: `${LIFT_WEB} web / ${LIFT_WINDOW} window`,
    note: "Primary-school child ¥3,500 web / ¥4,000 window. Preschool children free, two per paying adult.",
  },
  {
    item: "Ski 3-piece or snowboard 2-piece set, 1 day",
    price: SKI_SET,
    note: "¥4,000 for primary school and under. Two days is exactly double.",
  },
  {
    item: "Snow wear (jacket and trousers), 1 day",
    price: WEAR,
    note: "¥3,000 for primary school and under.",
  },
  {
    item: "Goggles + helmet, 1 day",
    price: "¥1,800 + ¥2,300",
    note: "Rented as single items, outside the sets.",
  },
  {
    item: "Non-skier day: Gondola & Barouche pass + sled",
    price: `¥5,500 web + ${SLED}`,
    note: "The Gondola & Barouche pass (¥6,500 at the window) is what gets you into the snow play park at the gondola top and onto the Barouche sky lift; the sled is rented at the top station.",
  },
  {
    item: "SPA Gala no Yu (hot spring and pool), adult",
    price: "¥1,500",
    note: "In the station building — the way to fill the wait for the train home. Figure from JR East's own GALA travel page.",
  },
];

/** 2026-27 season dates, on GALA's and JR East's own announcements. */
const seasonRows = [
  { what: "Slopes open (skiing and snowboarding)", detail: `${SLOPES_OPEN} → ${SLOPES_CLOSE}` },
  { what: "Sightseeing-only week", detail: `${SIGHTSEEING_OPEN} → 18 December 2026: gondola and sightseeing lift only, no skiing whatever the snow` },
  { what: "Direct shinkansen to GALA Yuzawa", detail: "From 12 December 2026, when GALA starts operating: regular Tanigawa trains extended to GALA Yuzawa plus extra trains (JR East, 22 Oct 2026). JR East gives no end date in that notice; the station operates in winter and spring only" },
  { what: "Night-skiing return train", detail: "Tanigawa 198, GALA Yuzawa 20:19 → Tokyo 21:40, on 16 and 30 January and 13 and 27 February 2027" },
  { what: "JR SKISKI shinkansen + lift packages", detail: "Still \"Coming Soon\" on JR East's travel site, with bookings expected from mid-November 2026" },
  { what: "Daily hours", detail: "2026-27 daily hours awaiting the official announcement; dates and hours can change with snow and weather" },
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

/** Five questions, matching the question headings in the body (FAQPage). */
const faqItems = [
  {
    q: "How do I get to Gala Yuzawa from Tokyo?",
    a: `Take the Joetsu Shinkansen (Tanigawa) from Tokyo Station straight to GALA Yuzawa Station — ${FASTEST} on the fastest train, with no transfer, because the station is built into the ski centre and the gondola leaves from the same building. The direct trains are seasonal: JR East extends regular Tanigawa services to GALA Yuzawa from 12 December 2026, when the resort starts operating, and adds extra trains. If your train stops at Echigo-Yuzawa, or you travel outside the season, GALA's free shuttle covers the last stretch in about 10 minutes. The alternatives are a booked coach day from Tokyo (to Iwappara, a neighbouring Yuzawa resort) or a chartered car. Checked ${OWN}.`,
  },
  {
    q: "How long is the shinkansen from Tokyo to Gala Yuzawa?",
    a: `${FASTEST} on the fastest train, on the resort's own figure and JR East's. JR East's winter-train notice of 22 October 2026 gives the Tanigawa 71 as Tokyo 6:24 → GALA Yuzawa 7:35 and the Tanigawa 86 back as GALA Yuzawa 17:04 → Tokyo 18:20; JR East's destination page also says about 1 hour 20 minutes on the Tanigawa, so allow 71 to 80 minutes each way. On the four night-skiing evenings the Tanigawa 198 leaves GALA Yuzawa at 20:19 and reaches Tokyo at 21:40. Checked ${OWN}.`,
  },
  {
    q: "Can I use the JR Pass to Gala Yuzawa?",
    a: `Yes. The nationwide JAPAN RAIL PASS covers all JR Group shinkansen except NOZOMI and MIZUHO, so the Joetsu Shinkansen to GALA Yuzawa is included (Gran Class needs extra fees); the 7-day ordinary pass is ${JRP_7DAY} online. The JR TOKYO Wide Pass (${PASS_ADULT}, 3 consecutive days) and the JR EAST PASS (${EAST_PASS_5DAY}, 5 days) also cover it — JR East names GALA Yuzawa among the Wide Pass's destinations. One GALA day alone does not repay the Wide Pass: JR East's own example of a GALA return plus a Nikko return is ${JR_EXAMPLE}. Checked ${PASS_CHECKED}.`,
  },
  {
    q: "When does Gala Yuzawa open for the 2026-27 season?",
    a: `The slopes open on ${SLOPES_OPEN} and are scheduled to run until ${SLOPES_CLOSE}. From ${SIGHTSEEING_OPEN} to 18 December 2026 only the gondola and the sightseeing lift run, and no skiing is allowed whatever the snow. The direct shinkansen starts with the resort on 12 December. The 2026-27 daily hours are awaiting the official announcement, and GALA states that dates and hours can change with snow and weather. Checked ${OWN}.`,
  },
  {
    q: "Is Gala Yuzawa good for beginners or non-skiers?",
    a: `Yes for both. 35% of the runs are graded beginner, rental is in the station building, and lessons can be booked in English. Non-skiers can buy the Gondola & Barouche pass (¥5,500 web, ¥6,500 at the window) for the snow play park at the gondola top, sled rental at ${SLED}, and the Barouche sky lift to a viewpoint over the Tanigawa range. The caveat for 2026-27 is that the South Area is closed, so 12 of the 16 courses operate. Checked ${OWN}.`,
  },
];

/**
 * Three cards directly under the first Klook button (task-jtk-20261122-04): the train and
 * the pass a lift-ticket buyer still needs for the same day (5%), and the eSIM (20%).
 */
const GALA_SAME_DAY: KlookSameDayCard[] = [
  {
    kind: "Train",
    label: shinkansenTokyoGalaYuzawa.title,
    ctaLabel: "Check Tokyo → GALA trains →",
    url: shinkansenTokyoGalaYuzawa.url,
    why: "The lift ticket does not include the ride: the direct Tanigawa seats from Tokyo or Ueno, booked by date with a QR code.",
  },
  {
    kind: "Rail pass",
    label: jrTokyoWidePass.title,
    ctaLabel: "Check the TOKYO Wide Pass →",
    url: jrTokyoWidePass.url,
    why: "JR East says the pass covers the shinkansen to GALA Yuzawa; with one more day trip in the same three days it is the one to price.",
  },
  {
    kind: "eSIM",
    label: "Klook Japan eSIM",
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
    why: "GALA states its operating dates and hours change with snow and weather, and the Klook listing asks for the lift-ticket voucher on a phone with internet access.",
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
    label: shinkansenTokyoGalaYuzawa.title,
    ctaLabel: "Check Tokyo → GALA Yuzawa trains →",
    url: shinkansenTokyoGalaYuzawa.url,
    why: "For a GALA day with no pass: the direct Tanigawa seats from Tokyo or Ueno, booked by date with a QR code. JR East's extra early Tanigawa 71 (Tokyo 6:24) runs on selected January and February weekends and holidays only, so check your date before planning around it.",
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

const TITLE = "Tokyo to Gala Yuzawa 2026-27: Shinkansen Day Trip & JR Pass";
const DESCRIPTION =
  "How to get to Gala Yuzawa from Tokyo: 71 min by direct shinkansen, JR Pass valid. Gala Yuzawa day trip costs, 2026-27 dates and tickets to book.";

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
        {hreflangLinks("/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo")}
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
                  name: "Tokyo to Gala Yuzawa Day Trip",
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Tokyo to Gala Yuzawa Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo to Gala Yuzawa 2026-27: <br />Shinkansen Day Trip, JR Pass and How to Get There
          </h1>
          <p className={styles.heroSubtitle}>
            The one Japanese ski resort with a shinkansen station inside it. The slopes open{" "}
            {SLOPES_OPEN} — and the South Area does not open at all this season.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Direct shinkansen times, JR East", "JR Pass rules", "GALA's own 2026-27 prices"].map((t) => (
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
          heading="Which Gala Yuzawa Day Trip from Tokyo Can You Book Now?"
          checkedIso="2026-11-15"
          deadline={
            <>
              Book by 30 November for any date from 19 December through the New Year, when the slopes
              first open: 12–18 December is gondola-only, with no skiing. For January and February, book
              at least three weeks out. As of 15 November JR East&apos;s own JR SKISKI shinkansen-and-lift
              packages were still &ldquo;Coming Soon&rdquo; with bookings expected from mid-November, and
              GALA&apos;s PICK UP BOX rental booking opens a month before opening day.
            </>
          }
          tours={[
            // 22 Nov 2026 (task-jtk-20261122-04): the first row was the Iwappara coach day,
            // a different resort. GALA's own lift ticket (99585) leads now; Iwappara stays
            // in the Quick Answer buttons and the tour picks further down.
            {
              title: galaYuzawaLiftTicket.title,
              url: galaYuzawaLiftTicket.url,
              price: null,
              duration: "A lift day; the shinkansen is booked separately",
              departs: "GALA Yuzawa Station, inside the resort",
            },
            {
              title: galaNaebaSkiDayTripTokyo.title,
              url: galaNaebaSkiDayTripTokyo.url,
              price: null,
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
          primaryCta="Check GALA lift ticket dates & prices on Klook →"
          primaryNote={
            <>
              Pick your ski date on the listing to see the price and whether it is on sale: GALA&apos;s slopes
              open on {SLOPES_OPEN} and its 2026-27 daily hours are not published yet.
            </>
          }
        />

        <KlookSameDayCards heading="What to Book for the Same GALA Day" cards={GALA_SAME_DAY} />

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
                <p className={styles.verdictStatLabel}>JR Pass / Wide Pass / JR EAST PASS</p>
                <p className={styles.verdictStatValue}>All valid to GALA Yuzawa</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              To get to Gala Yuzawa from Tokyo, take the <strong>Joetsu Shinkansen from Tokyo Station
              straight to GALA Yuzawa Station in {FASTEST}</strong> on the fastest train (JR East&apos;s
              Tanigawa 71 leaves Tokyo at 6:24 and arrives at 7:35), and the station is inside the ski
              centre, but the direct trains run only in the winter season, from{" "}
              <strong>{SIGHTSEEING_OPEN}</strong>. GALA&apos;s <strong>slopes open on {SLOPES_OPEN}</strong>{" "}
              and run to {SLOPES_CLOSE}; 12–18 December is gondola sightseeing only. The{" "}
              <strong>JAPAN RAIL PASS</strong> (7 days {JRP_7DAY} online), the{" "}
              <strong>JR TOKYO Wide Pass</strong> ({PASS_ADULT}, 3 days) and the{" "}
              <strong>JR EAST PASS</strong> ({EAST_PASS_5DAY}, 5 days) all cover the train, and a
              gear-free Gala Yuzawa day trip adds <strong>¥19,500</strong> at GALA&apos;s web prices
              ({LIFT_WEB} lift pass + {SKI_SET} ski set + {WEAR} wear). Checked {OWN} on GALA&apos;s and
              JR East&apos;s own sites; 2026-27 daily hours are awaiting the official announcement.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={galaYuzawaLiftTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                GALA lift ticket →
              </KlookLink>
              <KlookLink href={yuzawaIwapparaSkiDayTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Ski day tour from Tokyo →
              </KlookLink>
              <KlookLink href={shinkansenTokyoGalaYuzawa.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Tokyo → GALA Yuzawa trains →
              </KlookLink>
              <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Price the TOKYO Wide Pass →
              </KlookLink>
              <KlookLink href={galaYuzawaSkiLesson.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
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

        <EsimCtaTop />

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Gala Yuzawa from Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Take the direct Joetsu Shinkansen (Tanigawa) from Tokyo Station to GALA Yuzawa</strong>{" "}
            — {FASTEST} on the fastest train, no transfer, and the ticket gate opens into the ski centre.
            The direct trains are seasonal and start on {SIGHTSEEING_OPEN}; the fallback is the shinkansen to
            Echigo-Yuzawa and GALA&apos;s free 10-minute shuttle, and the slower alternatives are a booked
            coach day or a chartered car.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Trains / season", "Cost", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.trains}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {OWN_ISO}. Sources: GALA Yuzawa (
            <a href="https://gala.co.jp/winter/access/" target="_blank" rel="noopener noreferrer">gala.co.jp/winter/access/</a>),
            JR East&apos;s winter-train notice of 22 October 2026 (
            <a href="https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf" target="_blank" rel="noopener noreferrer">jreast.co.jp</a>)
            and JR East&apos;s GALA page (
            <a href="https://www.jreast.co.jp/en/multi/destinations/gala.html" target="_blank" rel="noopener noreferrer">jreast.co.jp/en/multi/destinations/gala.html</a>).
            No one-way fare is printed: JR East revised its fares on 14 March 2026, and the price for
            your date shows at checkout. Coach and charter times are the Klook listings&apos; own.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What no AI answer can settle for you</strong> is whether the train you want runs
            through to GALA Yuzawa on your date: the extra early Tanigawa 71 runs only on selected January
            and February weekends and holidays. Book the seat by date, or price a pass in the{" "}
            <Link href="/guides/transport/tokyo-wide-pass">JR Tokyo Wide Pass</Link> guide if GALA is one of
            two day trips.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoGalaYuzawa.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo → GALA Yuzawa shinkansen →
            </KlookLink>
            <KlookLink href={yuzawaIwapparaSkiDayTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Ski bus day tour from Tokyo →
            </KlookLink>
            <KlookLink href={galaYuzawaLiftTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              GALA lift ticket →
            </KlookLink>
          </div>
        </section>

        {/* Journey time */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Journey time</span>
          <h2 className={styles.sectionTitle}>How Long Is the Shinkansen from Tokyo to Gala Yuzawa?</h2>
          <p className={styles.bodyText}>
            <strong>{FASTEST} on the fastest train, and about 71 to 80 minutes in practice.</strong> JR
            East&apos;s notice of 22 October 2026 gives the Tanigawa 71 as Tokyo 6:24 → GALA Yuzawa 7:35
            and the Tanigawa 86 home as GALA Yuzawa 17:04 → Tokyo 18:20, and its GALA page says about 1
            hour 20 minutes on the Tanigawa. For night skiing, the Tanigawa 198 leaves GALA Yuzawa at 20:19
            and reaches Tokyo at 21:40 on 16 and 30 January and 13 and 27 February 2027. Checked {OWN}.
          </p>
        </section>

        {/* Cost */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day cost</span>
          <h2 className={styles.sectionTitle}>How Much Does a Gala Yuzawa Day Trip Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>About ¥19,500 on the snow for a gear-free adult, plus the train</strong>, on
            GALA&apos;s own 2026-27 web prices. A non-skier&apos;s day in the snow play park is ¥8,000
            with a sled.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Price", "The thing to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {OWN_ISO}. Sources: GALA Yuzawa lift prices (
            <a href="https://gala.co.jp/winter/hours-pricing/" target="_blank" rel="noopener noreferrer">gala.co.jp/winter/hours-pricing/</a>),
            rental (
            <a href="https://gala.co.jp/winter/rental/" target="_blank" rel="noopener noreferrer">gala.co.jp/winter/rental/</a>),
            activities (
            <a href="https://gala.co.jp/winter/activities/" target="_blank" rel="noopener noreferrer">gala.co.jp/winter/activities/</a>),
            JR East pass prices (
            <a href="https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html" target="_blank" rel="noopener noreferrer">jreast.co.jp</a>)
            and SPA Gala no Yu on JR East&apos;s travel site (
            <a href="https://www.jre-travel.com/seasonal/ski/gala/" target="_blank" rel="noopener noreferrer">jre-travel.com</a>).
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={galaYuzawaLiftTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              GALA lift ticket →
            </KlookLink>
            <KlookLink href={jrEastPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              JR EAST PASS →
            </KlookLink>
          </div>
        </section>

        {/* Season dates */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Season</span>
          <h2 className={styles.sectionTitle}>When Does Gala Yuzawa Open for the 2026-27 Season?</h2>
          <p className={styles.bodyText}>
            <strong>The slopes open on {SLOPES_OPEN} and are scheduled to run to {SLOPES_CLOSE}.</strong>{" "}
            The week before, {SIGHTSEEING_OPEN} to 18 December 2026, is sightseeing operation only — the
            gondola and the sightseeing lift, with skiing and snowboarding not permitted whatever the
            snow — and the direct shinkansen starts with it on 12 December. GALA attaches its own caveat
            that operating periods and content may change with snow and weather. Book the week of 12–18
            December expecting to ski and you have booked a gondola ride.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["2026-27", "Dates"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {OWN_ISO}. Sources: GALA Yuzawa (
            <a href="https://gala.co.jp/winter/hours-pricing/" target="_blank" rel="noopener noreferrer">gala.co.jp/winter/hours-pricing/</a>),
            JR East (
            <a href="https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf" target="_blank" rel="noopener noreferrer">jreast.co.jp, 22 Oct 2026</a>)
            and JR East&apos;s travel site (
            <a href="https://www.jre-travel.com/seasonal/ski/gala/" target="_blank" rel="noopener noreferrer">jre-travel.com</a>).
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1.25rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["The mountain", `GALA Yuzawa, 2026-27 (read ${OWN})`].map((h) => (
                      <th key={h}>{h}</th>
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
            page (
            <a href="https://gala.co.jp/winter/gelande/" target="_blank" rel="noopener noreferrer">gala.co.jp/winter/gelande/</a>),
            read {OWN}. The <strong>South Area closure is specific to 2026-27</strong>{" "}
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
            <KlookLink href={galaYuzawaLiftTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              GALA lift ticket →
            </KlookLink>
            <KlookLink href={galaYuzawaSkiLesson.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
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
          <h2 className={styles.sectionTitle}>Is Gala Yuzawa Good for Beginners or Non-Skiers?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes for both — <strong>35% of the terrain is graded beginner</strong> and the gondola carries
            you out of the station building to the top of it, and non-skiers get a snow play park and a
            sled run at the gondola top on the cheaper Gondola &amp; Barouche pass. The caveat is this
            season specifically: the South Area is shut, so the mountain is smaller than older guides
            describe.
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>For non-skiers</p>
              <p className={styles.whoForDesc}>
                The Gondola &amp; Barouche pass (¥5,500 web, ¥6,500 at the window) covers the gondola, the
                snow play park at the top station and the Barouche sky lift to the 愛の鐘 viewpoint over the
                Tanigawa range (10:00–16:00, about 30 minutes). Sleds rent for {SLED} at the top station; the
                play area runs 8:30–16:00, weather permitting. Preschool children ride the gondola free.
                GALA&apos;s own activities page, read {OWN}. For sledding nearer Tokyo, see the{" "}
                <Link href="/guides/attractions/tokyo-snow-day-trip">Tokyo snow day trip guide</Link>.
              </p>
            </div>
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
            <KlookLink href={galaYuzawaSkiLesson.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              GALA 1-day coaching →
            </KlookLink>
            <KlookLink href={yuzawaIwapparaSkiDayTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Beginner coach day from Tokyo →
            </KlookLink>
          </div>
        </section>

        {/* Pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Passes</span>
          <h2 className={styles.sectionTitle}>Can I Use the JR Pass to Gala Yuzawa?</h2>
          <p className={styles.bodyText}>
            <strong>Yes — all three passes a visitor is likely to hold cover the shinkansen to GALA
            Yuzawa.</strong> The nationwide <strong>JAPAN RAIL PASS</strong> covers every JR Group
            shinkansen except the NOZOMI and MIZUHO, so the Joetsu Shinkansen is included (Gran Class needs
            extra fees); the 7-day ordinary pass is <strong>{JRP_7DAY}</strong> online or ¥53,000 at an
            overseas agency. The <strong>JR EAST PASS</strong> is <strong>{EAST_PASS_5DAY}</strong> for 5
            days and ¥50,000 for 10 and covers every JR East line. Checked {PASS_CHECKED} on
            japanrailpass.net and JR East.
          </p>
          <p className={styles.bodyText}>
            The <strong>JR TOKYO Wide Pass</strong> is the cheapest of the three for this trip: GALA Yuzawa
            is inside the valid area, JR East names it among the pass&apos;s own destinations, and the
            pass covers the Joetsu Shinkansen to it in a reserved or non-reserved ordinary-car seat. The
            pass is <strong>{PASS_ADULT}</strong> for an adult and{" "}
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
            <Link href="/guides/transport/tokyo-wide-pass">JR Tokyo Wide Pass</Link> guide works the
            break-even across every Kanto day trip, and the{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> does the same for the
            national pass.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Price the TOKYO Wide Pass →
            </KlookLink>
            <KlookLink href={jrEastPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
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
            <KlookLink href={yuzawaIwapparaSkiDayTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Yuzawa coach day from Tokyo →
            </KlookLink>
            <KlookLink href={galaNaebaSkiDayTripTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
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
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link> in Hokkaido — or,
            without a flight, a few nights in Nagano: our{" "}
            <Link href="/guides/attractions/hakuba-ski-tours">Hakuba ski tours</Link> guide covers the
            shinkansen-and-bus run from Tokyo, and our{" "}
            <Link href="/guides/attractions/nozawa-onsen-ski">Nozawa Onsen ski</Link> guide the
            hot-spring village resort off Iiyama Station. The{" "}
            <Link href="/guides/attractions/japan-ski-trip-itinerary">Japan ski trip itinerary</Link> lays
            out how many nights go where on a 7- or 10-day ski week. A
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
            <Link href="/guides/money/japan-ski-travel-insurance">Japan ski travel insurance</Link>{" "}
            guide sets out what the common exclusions actually say and what counts as off-piste.
          </p>
          <p className={styles.bodyText}>
            The other two things worth sorting before a GALA day. <strong>Data</strong>, because the resort
            states in its own notices that operating dates and hours change with snow and weather, and a
            seasonal station on a branch line is exactly where a closure notice reaches you by phone and
            nowhere else —{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              see Klook eSIM options →
            </KlookLink>{" "}
            and our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it
            against the alternatives. And <strong>a payment method</strong>: the resort&apos;s own booking
            flow is built for domestic cards, which is a large part of why resellers exist for this
            resort at all.
          </p>
        </section>

        <p className={styles.bodyText}>
          The shinkansen to GALA leaves from Tokyo Station, which is why our <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo</Link> guide suggests the Tokyo Station area for trips built around day trips.
        </p>

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
                <p className={styles.relatedTitle}>JR Tokyo Wide Pass 2026: Price, Map &amp; Is It Worth It?</p>
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
              <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Price the TOKYO Wide Pass →
              </KlookLink>
              <KlookLink href={galaYuzawaSkiLesson.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                See GALA Lessons →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
