import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import BookingEsimCard from "../../../components/BookingEsimCard";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  hokurikuArchPass,
  kanazawaHotels,
  klookEsim,
  shinkansenTokyoKanazawa,
  shirakawagoGokayamaKanazawaBusTour,
  shirakawagoTakayamaKanazawaDayTour,
  toyamaHotels,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * ---------------------------------------------------------------------------
 * /guides/transport/hokuriku-arch-pass — written 4 Nov 2026
 *
 * Sourcing, all read on 4 November 2026 unless a row carries its own date:
 *
 *   - westjr.co.jp/travel-information/en/tickets-passes/other/hokuriku-arch-pass/
 *     for the ¥35,000 / ¥17,500 price, validity, coverage, exclusions, eligibility,
 *     purchase and refund rules. Read directly.
 *   - jreast.co.jp answers automated reads with HTTP 403, so its pass page, its
 *     transportation conditions and its 28 January 2026 press release were read
 *     through a jreast.co.jp-restricted search index. That is the source for the
 *     Narita Express wording.
 *   - tickets.jr-odekake.net, JR West's e5489 Shinkansen e-Ticket page (purchases
 *     from 14 March 2026), for ¥14,400 Tokyo–Kanazawa and ¥8,970 Kanazawa–Nagano,
 *     normal season. Read directly.
 *   - westjr.co.jp HOKURIKU One-way Ticket and HARUKA One-way Ticket pages for
 *     ¥6,500 Kyoto–Kanazawa and ¥1,900 Kansai Airport–Osaka. Both are visitor
 *     discount tickets. The HARUKA page warns of a price change for tickets sold
 *     from 1 November 2026 without printing the new figure on the page read here.
 *
 * Carried from our own pages with their dates: the N'EX ¥3,140 / ¥5,200 and the
 * monorail ¥520 (tokyo-wide-pass), JR Pass prices (data/jr-fares.json), JR EAST
 * PASS prices (jr-east-pass) and the Tokaido fares (tokyo-to-osaka-shinkansen).
 *
 * Re-read on 15 November 2026 (Rank R06): the JR West pass page (prices, valid
 * trains, exclusions, channels, refunds unchanged), the HOKURIKU One-way Ticket
 * page (¥6,500 / ¥8,000 unchanged) and the HARUKA One-way Ticket page, which now
 * says the price changed for tickets sold from 1 November 2026 and prints ¥1,900
 * to Osaka and ¥2,700 to Kyoto. JR East's pass and transportation-conditions pages
 * were read through a jreast.co.jp-restricted search index (N'EX wording). JR
 * East's 1 October 2026 press release (jreast.co.jp/press/2026/20261001_ho02.pdf,
 * read directly) is the source for the Arch Pass holder benefits in Toyama,
 * Ishikawa and Fukui (1 Oct 2026 – 5 May 2027) and for the eki-net
 * "Tokuda-ne Special 28" ¥7,200 Tokyo–Kanazawa fare (weekdays 7–17 Dec 2026).
 *
 * Re-read on 22 November 2026 (Rank R02): the JR West pass page (¥35,000 / ¥17,500,
 * "current as of January 28, 2026"; seat-reservation and refund rules unchanged), JR
 * West's "Exchanging E-Tickets" guide (westjr.co.jp/global/en/howto/guide/emco/), the
 * HOKURIKU One-way (¥6,500 / ¥8,000) and HARUKA One-way (¥1,900 / ¥2,700) pages, all
 * read directly, and JR East's 28 January 2026 press release
 * (jreast.co.jp/e/press/pdf/0128_pass_en.pdf, read directly): ¥30,000 → ¥35,000 adult,
 * ¥15,000 → ¥17,500 child, sold from 14 March 2026, with the area expanded to the Tokyo
 * metropolitan area, the Chuo Line and the Oito Line. JR East's pass page was read
 * through a jreast.co.jp-restricted search index (same price).
 *
 * Deliberately absent: the regular Kanazawa–Kyoto fare, Kyoto–Osaka and the
 * peak-season Hokuriku prices, none of which could be read from an operator.
 * The page says so where the sums would otherwise include them. The rounded
 * reference values in data/jr-fares.json are not operator figures and are not
 * used here. No Klook price appears.
 * ---------------------------------------------------------------------------
 */

const CHECKED = checkedLabel("2026-11-04");
/** Re-check of the JR West pass, HOKURIKU and HARUKA pages and JR East's press release. */
const RECHECKED_ISO = "2026-11-22";
const RECHECKED = checkedLabel(RECHECKED_ISO);
const WEST_URL = "https://www.westjr.co.jp/travel-information/en/tickets-passes/other/hokuriku-arch-pass/";
const WEST_ETICKET_URL = "https://www.westjr.co.jp/global/en/howto/guide/emco/";
const EAST_JAN_PRESS_URL = "https://www.jreast.co.jp/e/press/pdf/0128_pass_en.pdf";
const EAST_URL = "https://www.jreast.co.jp/en/multi/pass/hokurikuarch.html";
const EAST_TERMS_URL = "https://www.jreast.co.jp/en/multi/pass/hokurikuarch_terms.html";
const EAST_PRESS_URL = "https://www.jreast.co.jp/press/2026/20261001_ho02.pdf";
const NEX_CHECKED = checkedLabel("2026-10-30");
const MONORAIL_CHECKED = checkedLabel("2026-10-25");
const JR_PASS_CHECKED = checkedLabel("2026-10-30");
const EAST_CHECKED = checkedLabel("2026-11-03");

const ROUTE = "/guides/transport/hokuriku-arch-pass";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const ADULT = "¥35,000";
const CHILD = "¥17,500";

const TITLE = "JR Hokuriku Arch Pass 2026: Price, Coverage, Is It Worth It?";
const DESCRIPTION =
  "Hokuriku Arch Pass price: ¥35,000 adult, ¥17,500 child for 7 days (up from ¥30,000 in March 2026). Tokyo–Kanazawa–Osaka coverage and when it pays.";

/** Table 1 — the price, by where you buy it, and who may hold it. Row 1 is the answer. */
const priceRows = [
  {
    item: "The answer",
    value: `${ADULT} / ${CHILD}`,
    note: "Adult / child, 7 days, the same price online, from an overseas agency or in Japan. Up from ¥30,000 / ¥15,000 for passes sold from 14 March 2026. JR West sets it by the date you buy, not the date you exchange or travel.",
  },
  {
    item: "Before 14 March 2026",
    value: "¥30,000 / ¥15,000",
    note: "The old adult / child price in JR East's 28 January 2026 press release. The same release widened the area to the Tokyo metropolitan area, the Chuo Line and the Oito Line.",
  },
  {
    item: "Overseas travel agency (exchange order or E-TICKET)",
    value: ADULT,
    note: "Listed by JR West and JR East. Exchange it within 3 months of issue, in Japan, with your passport. Klook sells this version.",
  },
  {
    item: "JR-WEST Online Train Reservation",
    value: ADULT,
    note: "Opens one month before boarding at 10:00 JST. Credit card only; virtual and numberless cards are refused.",
  },
  {
    item: "JR-EAST Train Reservation",
    value: ADULT,
    note: "JR East's own online channel. Pick-up in Japan with the original passport; a photocopy is not accepted.",
  },
  {
    item: "Travel agency in Japan",
    value: ADULT,
    note: "Listed by JR West, up to one month before your first day.",
  },
  {
    item: "Adult (12 and over)",
    value: ADULT,
    note: `Seven-day pass. JR West and JR East both print this figure. A page quoting ¥30,000 or ¥25,500 is out of date. Checked ${CHECKED}.`,
  },
  {
    item: "Child (6 to 11)",
    value: CHILD,
    note: "Exactly half. Age is taken on the day the exchange order is issued or the pass is bought.",
  },
  {
    item: "Children 1 to 5",
    value: "Free, up to two",
    note: "Per adult or child pass holder. A third child needs a child pass, and so does any child using a reserved seat alone or travelling alone.",
  },
  {
    item: "Validity",
    value: "7 consecutive days",
    note: "Calendar days, 00:00 on the first day to 24:00 on the last, Japan time. The only length sold. Delays do not extend it.",
  },
  {
    item: "Who can use it",
    value: "Temporary Visitors",
    note: "A foreign-government passport and Temporary Visitor entry status. Japanese nationals cannot use it, including those with permanent residence abroad.",
  },
];

/** Table 2 — coverage. */
const coverageRows = [
  {
    service: "The answer",
    allowed: "Tokyo → Kanazawa → Osaka",
    note: "Hokuriku Shinkansen to Tsuruga, Thunderbird to Kyoto and Osaka, Haruka to Kansai Airport, N'EX to Narita, Tokyo Monorail to Haneda. Not the Tokaido Shinkansen (Nozomi, Hikari, Kodama) or the Sanyo Shinkansen.",
  },
  {
    service: "JR East lines in the Tokyo area, the Chuo Line and the Oito Line",
    allowed: "✓ Added 14 Mar 2026",
    note: "JR East's 28 January 2026 release expanded the area to these lines for passes valid from 14 March 2026. The exact edges are on the JR West and JR East maps.",
  },
  {
    service: "Hokuriku Shinkansen, Tokyo ⇄ Tsuruga",
    allowed: "✓ Included",
    note: "The spine of the pass, through Karuizawa, Nagano, Toyama and Kanazawa. Book seats before boarding. The Kagayaki is all-reserved, so it has no non-reserved car.",
  },
  {
    service: "Limited Express Thunderbird",
    allowed: "✓ Included",
    note: "Named by JR West. It carries you from Tsuruga into Kyoto and Osaka, and reserved seats must be booked before boarding.",
  },
  {
    service: "Limited Express Haruka (Kansai Airport)",
    allowed: "✓ Included",
    note: "Also named by JR West. This is what makes Kansai Airport the natural exit from the pass.",
  },
  {
    service: "Narita Express",
    allowed: "✓ Included",
    note: "JR East's conditions address pass holders boarding the N'EX, and Klook's listing names it. JR West's page does not mention it. Without a reservation, take any empty seat.",
  },
  {
    service: "Tokyo Monorail",
    allowed: "✓ Included",
    note: "Named by JR West, and the pass's link to Haneda.",
  },
  {
    service: "JR West and JR East Special Rapid, Rapid and Local trains",
    allowed: "✓ Inside the map area",
    note: "JR West lists Toyama, Ishikawa, Fukui, Shiga, Kyoto and Nara as destinations, and the exact limits are on its map image. Check the map for anywhere else, including Kobe and Himeji.",
  },
  {
    service: "IR Ishikawa, Ainokaze Toyama and Hapi-Line Fukui",
    allowed: "◐ Named segments only",
    note: "Kanazawa–Tsubata (IR Ishikawa), Toyama–Takaoka (Ainokaze) and Echizen-Hanando–Fukui (Hapi-Line), end to end. Getting off anywhere else is not covered.",
  },
  {
    service: "Tokaido Shinkansen, Tokyo ⇄ Shin-Osaka",
    allowed: "✗ Never",
    note: "The exclusion that decides the pass. The obvious Tokyo–Osaka train is the one you cannot take.",
  },
  {
    service: "Sanyo Shinkansen, Shin-Osaka ⇄ Hakata",
    allowed: "✗ Never",
    note: "So Hiroshima and Fukuoka are out, and a pass from JR West's wider range or the JR Pass is the route there.",
  },
  {
    service: "Hayabusa and Komachi",
    allowed: "✗ Extra ticket",
    note: "On the Tohoku and Yamagata Shinkansen inside the area, a separate limited express ticket is required.",
  },
  {
    service: "Green Car, GranClass and sleepers",
    allowed: "✗ Extra charge",
    note: "Green and GranClass need separate tickets, and sleeper cars cannot be used at all.",
  },
];

/** Table 3 — only fares an operator prints, one adult, normal season. */
const fareRows = [
  {
    journey: "Narita Airport → Tokyo, N'EX",
    fare: "¥3,140",
    source: `JR East, read ${NEX_CHECKED}`,
    note: "¥5,200 for the N'EX round-trip ticket.",
  },
  {
    journey: "Haneda ⇄ Hamamatsucho, Tokyo Monorail",
    fare: "¥520",
    source: `Tokyo Monorail, read ${MONORAIL_CHECKED}`,
    note: "The cheaper way into the route.",
  },
  {
    journey: "Tokyo → Kanazawa, reserved Ordinary",
    fare: "¥14,400",
    source: `JR West e5489 Shinkansen e-Ticket, ${CHECKED}`,
    note: "Normal season, for purchases from 14 March 2026. JR West states that peak, busy and off-peak prices differ.",
  },
  {
    journey: "Kanazawa ⇄ Nagano, reserved Ordinary",
    fare: "¥8,970",
    source: `JR West e5489 Shinkansen e-Ticket, ${CHECKED}`,
    note: "Normal season. Used only in the side-trip row below.",
  },
  {
    journey: "Kanazawa → Kyoto, HOKURIKU One-way Ticket",
    fare: "¥6,500",
    source: `JR West, ${CHECKED}`,
    note: "A visitor discount ticket covering the shinkansen to Tsuruga and the Thunderbird. ¥8,000 to Osaka. JR West's page dates its prices to February 2025. The regular fare is not listed here.",
  },
  {
    journey: "Osaka → Kansai Airport, HARUKA One-way Ticket",
    fare: "¥1,900",
    source: `JR West, ${CHECKED}`,
    note: `A visitor discount ticket, ¥2,700 from Kyoto. JR West's page says the price changed for tickets sold from 1 November 2026 and prints this figure, re-read ${RECHECKED}.`,
  },
  {
    journey: "Kyoto → Osaka",
    fare: "Not counted",
    source: "No operator figure read",
    note: "Left out of the sums. It is a short local hop on either side of the calculation.",
  },
];

/** Table 4 — the break-even, against ¥35,000. */
const scenarioRows = [
  {
    plan: "The answer",
    sum: "A straight Tokyo → Kanazawa → Kyoto → Osaka → Kansai Airport run",
    total: "¥22,800–¥25,940",
    verdict: "✗ Buy single tickets",
  },
  {
    plan: "Tokyo → Kanazawa → Kyoto, Osaka → Kansai Airport (no Tokyo airport train)",
    sum: "¥14,400 + ¥6,500 + ¥1,900",
    total: "¥22,800",
    verdict: "✗ ¥12,200 short",
  },
  {
    plan: "Narita in, Tokyo → Kanazawa → Kyoto → Osaka, Kansai Airport out",
    sum: "¥3,140 + ¥14,400 + ¥6,500 + ¥1,900",
    total: "¥25,940",
    verdict: "✗ ¥9,060 short",
  },
  {
    plan: "The same route, Haneda in",
    sum: "¥520 + ¥14,400 + ¥6,500 + ¥1,900",
    total: "¥23,320",
    verdict: "✗ ¥11,680 short",
  },
  {
    plan: "Narita in, Tokyo → Kanazawa and back, Narita out",
    sum: "¥5,200 + ¥14,400 + ¥14,400",
    total: "¥34,000",
    verdict: "✗ ¥1,000 short",
  },
  {
    plan: "The Narita-to-Kansai route plus a Kanazawa ⇄ Nagano day",
    sum: "¥25,940 + ¥8,970 + ¥8,970",
    total: "¥43,880",
    verdict: "✓ ¥8,880 saved",
  },
];

/** The judgement, in plain terms. */
const worthRows = [
  {
    plan: "A straight run from Tokyo through Kanazawa to Kansai",
    verdict: "✗ Buy tickets",
    why: "On every fare confirmed with an operator, single tickets come to about ¥26,000 against ¥35,000. The missing Kyoto–Osaka hop and the regular Kanazawa–Kyoto fare do not plausibly bridge ¥9,060.",
  },
  {
    plan: "That run with side trips on the Hokuriku Shinkansen",
    verdict: "✓ Can pay",
    why: "Long extra legs are what close the gap. One Kanazawa ⇄ Nagano return turns a ¥9,060 shortfall into an ¥8,880 saving.",
  },
  {
    plan: "Tokyo ⇄ Kanazawa and back, arriving at Narita",
    verdict: "◐ Close",
    why: "¥34,000 at normal-season prices. One more ride would tip it, and so could a busier season, since JR West prices those dates differently. The peak figures are not listed here.",
  },
  {
    plan: "You want not to think about each leg",
    verdict: "◐ Your call",
    why: "The extra money buys one ticket for the week, seat reservations from a single pass, and freedom to change trains. That is a fair reason to pay, as long as you know it is the reason.",
  },
  {
    plan: "Tokyo to Osaka the quick way",
    verdict: "✗ Wrong pass",
    why: "The Tokaido Shinkansen is excluded. A single reserved Nozomi is ¥14,720 at the window, far below the pass.",
  },
  {
    plan: "You also want Hiroshima, Hakone or Fukuoka by JR",
    verdict: "✗ Too narrow",
    why: "The Sanyo Shinkansen is out, so anything west of Shin-Osaka by bullet train means a separate ticket or the nationwide pass.",
  },
];

/**
 * The "special offer": JR East's 1 October 2026 press release. Arch Pass holders
 * who show the pass get these at facilities in Toyama, Ishikawa and Fukui,
 * 1 Oct 2026 – 5 May 2027 unless the row says otherwise. A selection only.
 */
const benefitRows = [
  {
    place: "The offer",
    perk: "Show the pass for discounts and gifts",
    detail: "Dozens of museums, shops and sights in Toyama, Ishikawa and Fukui, 1 October 2026 to 5 May 2027. No extra ticket to buy. Periods can change by facility.",
  },
  {
    place: "Kurobe Gorge Railway (Toyama)",
    perk: "10% off the return fare",
    detail: "Unazuki–Kanetsuri or Unazuki–Keyakidaira return, until 30 November 2026 only, on same-day tickets (no advance booking).",
  },
  {
    place: "Kanazawa Yuwaku Edo-mura and Yumeji-kan (Kanazawa)",
    perk: "¥310 → ¥260",
    detail: "General admission at each.",
  },
  {
    place: "Notojima Aquarium (Ishikawa)",
    perk: "¥1,890 → ¥1,690",
    detail: "General admission.",
  },
  {
    place: "Ishikawa Zoo",
    perk: "¥840 → ¥740",
    detail: "Admission.",
  },
  {
    place: "Tsuruga Red Brick Warehouse diorama (Fukui)",
    perk: "20% off, ¥400 → ¥320",
    detail: "Plus a gift. One person per pass. Tsuruga is where you change to the Thunderbird.",
  },
  {
    place: "Tojinbo Tower (Fukui)",
    perk: "10% off",
    detail: "Observation deck, adult ¥500 before the discount.",
  },
  {
    place: "Toyama Prefectural Museum of Art",
    perk: "Group rate",
    detail: "Collection admission; exhibitions run by an outside committee are excluded.",
  },
];

/** Table 5 — against its neighbours. */
const passRows = [
  {
    pass: "Hokuriku Arch Pass",
    price: `${ADULT} (7 days)`,
    covers: "Tokyo–Tsuruga on the Hokuriku Shinkansen, Thunderbird, Haruka, N'EX, Tokyo Monorail and JR in the map area",
    missing: "Tokaido and Sanyo Shinkansen",
    pick: "Tokyo to Kansai the long way, with more riding than a single run",
  },
  {
    pass: "JAPAN RAIL PASS",
    price: "¥50,000 official site, ¥53,000 overseas agency (7 days)",
    covers: "JR nationwide, including the Hokuriku and Tokaido Shinkansen",
    missing: "Nozomi and Mizuho without a supplement",
    pick: "A week that also needs the Tokaido or Sanyo line",
  },
  {
    pass: "JR EAST PASS",
    price: "¥35,000 (5 days), ¥50,000 (10 days)",
    covers: "JR East lines, with the Hokuriku Shinkansen only as far as Joetsumyoko",
    missing: "Toyama, Kanazawa and all of Kansai",
    pick: "Tohoku, Niigata or Nagano rather than Kanazawa",
  },
];

const buySteps = [
  {
    title: "Pick a channel",
    desc: `JR West lists three: an overseas travel agency (an exchange order or E-TICKET), JR-WEST Online Train Reservation, and a travel agency in Japan. JR East sells through JR-EAST Train Reservation and agencies outside Japan. Klook sells the overseas version. Checked ${CHECKED}.`,
  },
  {
    title: "Mind the two booking windows",
    desc: "An exchange order must be exchanged within 3 months of issue. JR-WEST Online opens one month before boarding, at 10:00 Japan time on the same date of the previous month. It takes credit cards only, and virtual or numberless cards are refused. A travel agency in Japan sells up to one month before your first day.",
  },
  {
    title: "Collect the pass on arrival, with your original passport",
    desc: "Take an exchange order and your passport to an exchange location. For an online booking, use a ticket machine or ticket office with the reservation number, your 4-digit ID, the card you paid with and your passport. Machines need a passport with an IC chip. JR East's January press release lists Narita and Haneda among its tentative pick-up points, and its conditions warn that a photocopy of the passport is not accepted. Open the exchange-location list linked from JR West's page before you land.",
  },
  {
    title: "Choose the start day carefully",
    desc: "Once exchanged, the start date, length and pass type cannot be changed. Seven consecutive days means the first day should be your first long train, not your landing day, unless you land and ride.",
  },
  {
    title: "Reserve seats before each train",
    desc: "Use a ticket machine or a ticket office, or the website if you bought online. From the 7th booking, JR West sends pass holders to a ticket office. Do the Kagayaki first, since it has no non-reserved car at all.",
  },
  {
    title: "Know the refund rule before you pay",
    desc: "Before use, JR West refunds the sale price minus 10% (minimum ¥220 per pass). An unexchanged order goes back to the agency that sold it; an exchanged pass only at an exchange location in Japan. Nothing after the first day, nothing for delays, and a lost pass is not reissued. Klook's own cancellation terms are on its listing.",
  },
];

const faqItems = [
  {
    q: "How much is the Hokuriku Arch Pass?",
    a: `${ADULT} for an adult aged 12 or over and ${CHILD} for a child aged 6 to 11, for seven consecutive days, the only length sold. It rose from ¥30,000 and ¥15,000 for passes sold from 14 March 2026, when JR East also widened the area to the Tokyo metropolitan area, the Chuo Line and the Oito Line. The price is the same through an overseas agency, JR-WEST Online Train Reservation, JR-EAST Train Reservation or a travel agency in Japan, and JR West sets it by the date you buy. Up to two children aged 1 to 5 travel free with each pass holder. Re-read on westjr.co.jp on ${RECHECKED}.`,
  },
  {
    q: "What does the Hokuriku Arch Pass cover?",
    a: "Reserved seats on the Hokuriku Shinkansen between Tokyo and Tsuruga, the Thunderbird to Kyoto and Osaka, the Haruka to Kansai Airport, the Narita Express, the Tokyo Monorail to Haneda, and JR local and rapid trains in the map area, plus three short private-line segments around Kanazawa, Toyama and Fukui. The Tokaido Shinkansen (Tokyo–Shin-Osaka) and the Sanyo Shinkansen are excluded, and Green Car or GranClass seats need extra tickets.",
  },
  {
    q: "Is the Hokuriku Arch Pass worth it vs the JR Pass?",
    a: `Against the JR Pass, yes for a Tokyo–Kanazawa–Osaka week: ${ADULT} against ¥50,000 for a 7-day JR Pass online or ¥53,000 from an overseas agency, so ¥15,000 to ¥18,000 less. The JR Pass only earns the extra if the same week uses the Tokaido or Sanyo Shinkansen. Against single tickets, not for a straight run: Tokyo to Kanazawa (¥14,400), Kanazawa to Kyoto (¥6,500) and Osaka to Kansai Airport (¥1,900) total ¥22,800, or ¥25,940 with the N'EX from Narita. It pays with long side trips: one Kanazawa to Nagano return adds ¥17,940 and leaves you ¥8,880 ahead. Normal-season fares from JR West, read ${CHECKED}.`,
  },
  {
    q: "Can I book seats with the Hokuriku Arch Pass e-ticket?",
    a: `Yes, after you exchange it in Japan. The E-TICKET from an overseas agency is an exchange order: scan its QR code or enter the Exchange Order No. at a green ticket-vending machine at a pick-up station, with a passport that has an IC chip, and the pass is issued. Then reserve each seat at a ticket machine or ticket office before boarding. JR West offers online seat reservations only for passes bought through JR-WEST ONLINE TRAIN RESERVATION, and the start date cannot be changed once the pass is issued. Read on westjr.co.jp, ${RECHECKED}.`,
  },
  {
    q: "Where can I buy the Hokuriku Arch Pass?",
    a: "From an overseas travel agency (an exchange order or E-TICKET, which is what Klook sells), JR-WEST Online Train Reservation, JR-EAST Train Reservation or a travel agency in Japan. You always collect the pass in Japan with your original passport. JR-WEST Online opens one month before boarding, and an exchange order must be exchanged within 3 months of issue.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function HokurikuArchPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={URL} />
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Hokuriku Arch Pass", item: URL },
              ],
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
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
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
          <span className={styles.breadCurrent}>Hokuriku Arch Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            JR Hokuriku Arch Pass 2026: <br />Price, Coverage &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            Seven days of JR trains between Tokyo and Osaka by way of Kanazawa. Here is what it costs, which trains it
            covers, and the sums that show when it beats single tickets.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${RECHECKED}`, "Official JR West and JR East figures", "Break-even arithmetic"].map((t) => (
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

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Adult</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Child (6–11)</p>
                <p className={styles.verdictStatValue}>{CHILD}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Valid for</p>
                <p className={styles.verdictStatValue}>7 consecutive days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tokaido Shinkansen</p>
                <p className={styles.verdictStatValue}>Not covered</p>
              </div>
            </div>
            {/* Answer-first: this is the article's first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>JR Hokuriku Arch Pass</strong> costs <strong>{ADULT}</strong> for an adult and{" "}
              <strong>{CHILD}</strong> for a child aged 6 to 11 for <strong>7 consecutive days</strong>, the same
              price online, from an overseas agency or in Japan, up from ¥30,000 and ¥15,000 for passes sold from 14
              March 2026. It covers <strong>Tokyo → Kanazawa → Tsuruga</strong> on the Hokuriku Shinkansen and{" "}
              <strong>Tsuruga → Kyoto → Osaka</strong> on the Thunderbird, plus the Haruka, the Narita Express and
              the Tokyo Monorail, but not the Tokaido Shinkansen (Nozomi, Hikari, Kodama) or the Sanyo Shinkansen.
              On a straight Tokyo → Kanazawa → Kyoto → Osaka → Kansai Airport run, single tickets come to ¥22,800
              (¥25,940 from Narita), so the pass pays only with long side trips.
            </p>
            <p className={styles.verdictText}>
              It is ¥15,000 to ¥18,000 cheaper than a 7-day JR Pass (¥50,000 online or ¥53,000 from an agency; see
              the <Link href="/guides/transport/jr-pass-guide">JR Pass price</Link> guide for the October 2026
              rise), and until 5 May 2027 it also unlocks JR East&apos;s holder discounts at sights in Toyama,
              Ishikawa and Fukui. Read off JR West&apos;s and JR East&apos;s pages on {RECHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink
                href={hokurikuArchPass.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Hokuriku Arch Pass on Klook →
              </KlookLink>
              <KlookLink
                href={shinkansenTokyoKanazawa.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Just Tokyo–Kanazawa Tickets →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the Hokuriku Arch Pass in 2026?</h2>
          <p className={styles.bodyText}>
            {ADULT} for an adult and {CHILD} for a child, for seven consecutive days, wherever you buy it. That is
            ¥5,000 more than the ¥30,000 it cost before 14 March 2026, the date JR East&apos;s January release also gave
            for adding the Tokyo area, the Chuo Line and the Oito Line to the map. There is one length and one price. JR West&apos;s conditions say the price follows the date you buy, so it is worth
            buying once your dates are firm rather than expecting a cheaper rate at the station.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "Figure", "The condition attached"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {RECHECKED_ISO}. JR West:{" "}
            <a href={WEST_URL} target="_blank" rel="noopener noreferrer">{WEST_URL}</a> (its page dates the prices to
            28 January 2026). JR East:{" "}
            <a href={EAST_URL} target="_blank" rel="noopener noreferrer">{EAST_URL}</a>, whose{" "}
            <a href={EAST_JAN_PRESS_URL} target="_blank" rel="noopener noreferrer">28 January 2026 press release</a>{" "}
            gives the same ¥35,000 and ¥17,500 and the old ¥30,000 and ¥15,000.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Hokuriku Arch Pass on Klook (exchange order) →
            </KlookLink>
          </div>
        </section>

        {/* Coverage */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it covers</span>
          <h2 className={styles.sectionTitle}>What Does the Hokuriku Arch Pass Cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Tokyo to Osaka by way of Kanazawa, with the airport trains at both ends: the Hokuriku Shinkansen to Tsuruga,
            the Thunderbird on to Kyoto and Osaka, the Haruka to Kansai Airport, and the N&apos;EX or Tokyo Monorail in
            Tokyo. Think of it as an arch over the top of Honshu: Tokyo at one foot, Kanazawa at the crown, Osaka and Kansai
            Airport at the other foot. The Tokaido Shinkansen runs under the arch, and it is excluded.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Service", "On the pass?", "What that means"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverageRows.map((row) => (
                    <tr key={row.service}>
                      <td className={styles.tdProvider}>{row.service}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allowed}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {RECHECKED_ISO}. Coverage from JR West&apos;s pass page (
            <a href={WEST_URL} target="_blank" rel="noopener noreferrer">westjr.co.jp</a>), with the Narita Express row
            from JR East&apos;s transportation conditions (
            <a href={EAST_TERMS_URL} target="_blank" rel="noopener noreferrer">jreast.co.jp</a>) and the March 2026
            area expansion from JR East&apos;s{" "}
            <a href={EAST_JAN_PRESS_URL} target="_blank" rel="noopener noreferrer">28 January 2026 release</a>. The limits of the valid area are drawn on JR West&apos;s
            map image rather than listed in text, so open it if your plan sits near an edge.
          </p>
        </section>

        {/* Worth it */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the Hokuriku Arch Pass Worth It vs Single Tickets?</h2>
          <p className={styles.bodyText}>
            Only with more riding than a single run gives you: Tokyo → Kanazawa → Kyoto → Osaka → Kansai Airport is
            ¥22,800 on single tickets against {ADULT}. The table adds the fares for the classic route, using
            only figures an operator prints. Two of them are visitor discount tickets, because those are the published
            figures available, so a full-fare version of the sum would run a little higher. Kyoto to Osaka is left
            out, and so are peak-season shinkansen prices.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Journey (one adult, one way)", "Fare", "Source", "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.journey}>
                      <td className={styles.tdProvider}>{row.journey}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.tableWrap} style={{ marginTop: "1.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip", "The sum", "Single tickets", `Against ${ADULT}`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scenarioRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.sum}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.total}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.tableWrap} style={{ marginTop: "1.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Verdict", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {worthRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {RECHECKED_ISO} for the pass, HOKURIKU One-way and HARUKA One-way prices on westjr.co.jp;
            Tokyo–Kanazawa and Kanazawa–Nagano from JR West&apos;s e5489 e-ticket page, {CHECKED}. Pass:{" "}
            <a href={WEST_URL} target="_blank" rel="noopener noreferrer">{WEST_URL}</a> and{" "}
            <a href={EAST_URL} target="_blank" rel="noopener noreferrer">{EAST_URL}</a>.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Which to book:</strong> the pass if your week adds long shinkansen side trips, single tickets if it
            is one run through Kanazawa. Either way, the night in Kanazawa and the Shirakawa-go day are not on the
            pass, and both sell by date, so check prices, seats left and the cancellation terms on the listing once
            your dates are firm. For the four reservation-only light-up evenings in January 2027, see our{" "}
            <Link href="/guides/attractions/shirakawago-winter-light-up">Shirakawa-go light-up guide</Link> first.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Hokuriku Arch Pass on Klook →
            </KlookLink>
            <KlookLink href={kanazawaHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Kanazawa Hotels →
            </KlookLink>
            <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Shirakawa-go Day Tour From Kanazawa →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Before you pay for either option, settle two things. Check <strong>your travel dates against JR West&apos;s
            seasons</strong>, because the ¥14,400 is the normal-season price. And check <strong>the listing&apos;s
            cancellation terms</strong>, because the discount tickets and the pass have different refund rules, and the
            week you commit to is hard to change once the pass is exchanged.
          </p>
          <p className={styles.bodyText}>
            <strong>A December weekday makes singles cheaper still.</strong> JR East&apos;s 1 October 2026 press release
            lists an eki-net &quot;Tokuda-ne Special 28&quot; fare of ¥7,200 Tokyo–Kanazawa (half the ¥14,400 normal
            e-ticket) for weekday Kagayaki and Hakutaka rides from 7 to 17 December 2026, sold from one month to 28 days
            before travel, with limited seats and stricter change rules. Last checked: {RECHECKED_ISO},{" "}
            <a href={EAST_PRESS_URL} target="_blank" rel="noopener noreferrer">jreast.co.jp press release</a>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check the Hokuriku Arch Pass →
            </KlookLink>
            <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Price Tokyo–Kanazawa Tickets →
            </KlookLink>
          </div>
        </section>

        {/* vs JR Pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Is the Hokuriku Arch Pass Worth It vs the JR Pass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes for a Tokyo–Kanazawa–Osaka week: the Arch Pass is ¥15,000 cheaper than the official-site JR Pass and
            ¥18,000 cheaper than one from an overseas agency. The JR
            Pass earns the extra only if the week uses the Tokaido or Sanyo line. For the eastern side of the same map,
            the{" "}
            <Link href="/guides/transport/jr-east-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              JR East Pass
            </Link>{" "}
            covers Tohoku, Niigata and Nagano for ¥35,000 (5 days), but its Hokuriku Shinkansen coverage ends at
            Joetsumyoko, so it does not reach Kanazawa (JR East, checked 2026-11-17).
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price (adult)", "Covers", "Does not cover", "Pick it for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.missing}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Arch Pass read {CHECKED}. JAPAN RAIL PASS prices read off japanrailpass.net on {JR_PASS_CHECKED}. JR EAST
            PASS prices from our guide, read {EAST_CHECKED}. Our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            has a break-even calculator for the nationwide pass.
          </p>
        </section>

        {/* Airport trains and Thunderbird */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Airport trains</span>
          <h2 className={styles.sectionTitle}>Can I Use the Hokuriku Arch Pass on the Narita Express or Haruka?</h2>
          <p className={styles.bodyText}>
            Yes, both. JR West names the <strong>Haruka</strong> among the pass&apos;s reserved-seat limited expresses,
            so Kansai Airport to Kyoto, Shin-Osaka or Osaka is covered; JR East&apos;s transportation conditions cover
            the <strong>Narita Express</strong> between Narita Airport and Tokyo, where without a reservation you may
            take any empty seat. Haneda is on the Tokyo Monorail, which JR West also names. The Thunderbird is covered
            too: since the shinkansen now runs to Tsuruga, Kanazawa to Kyoto or Osaka means a change there. Reserve
            seats before you board, and expect extra tickets for Green Car seats. Last checked: {RECHECKED_ISO},{" "}
            <a href={WEST_URL} target="_blank" rel="noopener noreferrer">JR West</a> and{" "}
            <a href={EAST_TERMS_URL} target="_blank" rel="noopener noreferrer">JR East conditions</a>. For the airport
            legs in detail, see{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit" style={{ color: "var(--red)", fontWeight: 600 }}>
              Haruka vs Nankai Rapi:t
            </Link>{" "}
            and{" "}
            <Link href="/guides/transport/skyliner-vs-nex" style={{ color: "var(--red)", fontWeight: 600 }}>
              Skyliner vs N&apos;EX
            </Link>
            .
          </p>
        </section>

        {/* E-ticket and seats */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>E-ticket</span>
          <h2 className={styles.sectionTitle}>Can I Book Seats With the Hokuriku Arch Pass E-Ticket?</h2>
          <p className={styles.bodyText}>
            Yes, once the e-ticket has been exchanged for the pass in Japan. The E-TICKET sold by an overseas agency
            is an exchange order: at a green ticket-vending machine in a pick-up station, scan its QR code or enter
            the Exchange Order No., enter your start date and swipe a passport with an IC chip, and the pass is
            issued (without an IC chip, go to the ticket office). After that, reserve each seat at a ticket machine
            or ticket office before boarding.
          </p>
          <p className={styles.bodyText}>
            Three rules decide how this goes. JR West offers online seat reservations only for passes bought through
            JR-WEST ONLINE TRAIN RESERVATION. The start date cannot be changed after the pass is issued, and the
            e-ticket must be exchanged within 3 months of issue. And boarding with an unexchanged e-ticket means
            buying tickets again on the train at the full price. Last checked: {RECHECKED_ISO},{" "}
            <a href={WEST_ETICKET_URL} target="_blank" rel="noopener noreferrer">{WEST_ETICKET_URL}</a> and{" "}
            <a href={WEST_URL} target="_blank" rel="noopener noreferrer">JR West&apos;s pass page</a>.
          </p>
        </section>

        {/* Special offer */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Special offer</span>
          <h2 className={styles.sectionTitle}>Is There a Hokuriku Arch Pass Special Offer?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, a holder benefit rather than a cheaper pass. From 1 October 2026 to 5 May 2027, JR East&apos;s
            &quot;Ikitai Tabetai Nihonkai!&quot; campaign gives Hokuriku Arch Pass holders discounts or gifts at
            facilities in Toyama, Ishikawa and Fukui when they show the pass. The pass price itself stays {ADULT}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "With the pass", "Condition"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {benefitRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.perk}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {RECHECKED_ISO}. JR East press release of 1 October 2026,{" "}
            <a href={EAST_PRESS_URL} target="_blank" rel="noopener noreferrer">{EAST_PRESS_URL}</a>; the full list is
            linked from JR East&apos;s pass page. Facilities can change their benefit or opening hours, so check before
            you go.
          </p>
        </section>

        {/* Tokyo to Osaka */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Route</span>
          <h2 className={styles.sectionTitle}>Can I Use the Hokuriku Arch Pass From Tokyo to Osaka?</h2>
          <p className={styles.bodyText}>
            Yes, by the northern route only: the Hokuriku Shinkansen to Tsuruga, then the Thunderbird. The direct Tokaido
            Shinkansen is excluded. If getting between the cities is all you want, a single reserved seat on it is
            ¥14,720 by Nozomi or ¥14,400 by Hikari at the window, read {CHECKED} in our{" "}
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo to Osaka shinkansen guide
            </Link>
            . The arch only makes sense with Kanazawa in the middle. See{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo to Kanazawa shinkansen
            </Link>{" "}
            for the first half of that trip: Kagayaki against Hakutaka, and the single fare this pass has to beat.
          </p>
        </section>

        {/* Buying */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Buying it</span>
          <h2 className={styles.sectionTitle}>Where Can I Buy the Hokuriku Arch Pass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            From an overseas agency such as Klook (an exchange order), JR-WEST Online Train Reservation, JR-EAST Train
            Reservation or a travel agency in Japan, all at {ADULT}. Every route ends at a JR counter or machine in
            Japan with your original passport.
          </p>
          <div className={styles.stepsList}>
            {buySteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              View the Hokuriku Arch Pass →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            The eSIM is there because seat bookings and any change of plan happen on your phone. Our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              best eSIM for Japan
            </Link>{" "}
            comparison ranks the alternatives.
          </p>
        </section>

        {/* Where to stop */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The middle of the arch</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay and What Should I Book in Kanazawa?</h2>
          <p className={styles.bodyText}>
            The pass buys the trains but not the reason for the detour, so book the night and the day first. Kanazawa
            is the usual stop. Toyama is one shinkansen stop towards Tokyo. Shirakawa-go is not on the pass, which makes
            a guided day from Kanazawa the simple answer. Compare it with the alternatives in our{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" style={{ color: "var(--red)", fontWeight: 600 }}>
              Takayama and Shirakawa-go guide
            </Link>
            .
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kanazawaHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Hotels in Kanazawa →
            </KlookLink>
            <KlookLink href={toyamaHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Hotels in Toyama →
            </KlookLink>
            <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Shirakawa-go Day From Kanazawa →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Starting in Osaka rather than Tokyo? The <Link href="/guides/transport/kansai-hokuriku-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Kansai-Hokuriku Area Pass</Link> covers Kansai to Kanazawa and Toyama for seven days, the <Link href="/guides/transport/hokuriku-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>JR Hokuriku Area Pass</Link> covers four days inside Hokuriku only, the <Link href="/guides/transport/takayama-hokuriku-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Takayama-Hokuriku Area Pass</Link> adds the Shirakawa-go buses, and the <Link href="/guides/transport/jr-west-all-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>JR West All Area Pass</Link> adds Hiroshima and Hakata.
          </p>
        </section>
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

        <KlookTourPicks
          heading="What to Book on the Same Trip"
          intro="The pass covers the trains, not the day out. Shirakawa-go is not on the pass, so a guided day from Kanazawa is the usual add-on. Open a listing for the current price, seats left on your date and its cancellation terms."
          tours={[shirakawagoTakayamaKanazawaDayTour, shirakawagoGokayamaKanazawaBusTour, hokurikuArchPass]}
        />

        <BookingEsimCard lead="Seat reservations and platform changes happen on your phone. Get mobile data before you land." />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/transport/tokyo-to-kanazawa", title: "Tokyo to Kanazawa by Shinkansen" },
              { href: "/guides/attractions/kanazawa-2-day-itinerary", title: "Kanazawa 2 Day Itinerary: Kanazawa and Shirakawa-go" },
              { href: "/guides/transport/jr-east-pass", title: "JR East Pass (2026): Price, Coverage and Is It Worth It?" },
              { href: "/guides/transport/jr-pass-guide", title: "JR Pass Price 2026: New Prices From Oct 1 & Is It Worth It?" },
              { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama and Shirakawa-go Tours" },
              { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "Karuizawa Day Trip From Tokyo" },
              { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary" },
              { href: "/guides/transport/kintetsu-rail-pass", title: "Kintetsu Rail Pass 2026: Prices, Coverage & Is It Worth It?" },
              { href: "/guides/transport", title: "More Transport Guides →" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                    <path d="M12 7v10" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{item.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Add up your legs first, then decide</h2>
            <p className={styles.ctaBannerDesc}>
              {ADULT} for seven days wins when the week has long side trips in it. A single run through Kanazawa is
              cheaper on tickets.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Hokuriku Arch Pass →
              </KlookLink>
              <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Tokyo–Kanazawa Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
