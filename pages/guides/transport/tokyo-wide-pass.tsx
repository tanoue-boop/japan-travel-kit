import Head from "next/head";
import NextStepCards from "../../../components/NextStepCards";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import BookingEsimCard from "../../../components/BookingEsimCard";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  galaNaebaSkiDayTripTokyo,
  jrTokyoWidePass,
  karuizawaShinkansenDayTrip,
  kawaguchikoYamanakakoBusTour,
  klookEsim,
  naritaExpressRoundTripUrl,
  nikkoCulturalDayTourUrl,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * ---------------------------------------------------------------------------
 * /guides/transport/tokyo-wide-pass — written 30 Oct 2026
 *
 * Sourcing. Every yen figure on this page comes from the operator that sets it:
 *
 *   - JR East, for the pass itself (¥16,000 / ¥8,000), the three-consecutive-day
 *     validity, the valid area, the Tobu through-service rules, the eligibility
 *     wording, the pick-up methods, the N'EX fares and the one worked example JR
 *     East publishes for this pass (about ¥21,500 for the GALA Yuzawa and Nikko
 *     route in reserved seats). jreast.co.jp answers automated reads with HTTP
 *     403, so these were read through a jreast.co.jp-restricted search index of
 *     its own pages — the same fallback pages/guides/transport/tokyo-airport-transfer.tsx
 *     documents and uses. The pages behind each figure are /en/multi/pass/tokyowidepass.html,
 *     /en/multi/pass/tokyowidepass_terms.html, /en/multi/pass/eastpass.html,
 *     /en/multi/nex/tickets/ and the 28 January 2026 press release
 *     /e/press/pdf/0128_pass_en.pdf.
 *   - Fujikyu Railway, for the Fuji Excursion (Fuji Kaiyu) fare of ¥4,200
 *     Shinjuku–Kawaguchiko. Its site could be read directly.
 *   - japanrailpass.net, for the JAPAN RAIL PASS prices, read directly.
 *   - Tokyo Monorail, for the ¥520 / ¥260 Haneda fare — the figure
 *     tokyo-airport-transfer.tsx read off tokyo-monorail.co.jp on 25 Oct 2026,
 *     kept in agreement with it deliberately.
 *
 * What is deliberately absent. There is no fare printed for Tokyo–Nikko,
 * Tokyo–Karuizawa or Tokyo–Echigo-Yuzawa. JR East publishes no point-to-point
 * fare table in English that could be read, and a guessed shinkansen fare is
 * exactly the kind of number that makes a break-even table useless. The
 * arithmetic on this page is therefore built out of the fares that could be
 * sourced — the N'EX round trip, the Fuji Excursion, the monorail — plus JR
 * East's own ¥21,500 example, which is the comparison the operator itself makes.
 *
 * Klook: listing 49927 is the pass (5% band), new in lib/klook-links.ts. The
 * Kawaguchiko, Nikko and Karuizawa day tours and the N'EX round trip are links
 * other guides already use, reused rather than re-minted. No Klook price appears.
 *
 * Rank fix, 10 Nov 2026 (task-jtk-20261110-R01). Re-checked that day: the pass
 * price (¥16,000 / ¥8,000 since 14 March 2026, jreast.co.jp pass page and the
 * 28 Jan 2026 press release, through the same jreast.co.jp search index), JR
 * East's ¥21,500 model route, the N'EX round trip (¥5,200 / ¥2,600) and
 * Fujikyu's own Fuji Kaiyu page (¥2,580 + ¥1,620 = ¥4,200, 4 round trips a day,
 * fastest 1 hr 53 min). ¥15,000 survives only as the pre-revision price and
 * ¥13,600 is a sum of two fares, not a price. Tokyo–Nikko / –Karuizawa /
 * –Echigo-Yuzawa singles still could not be read off an official page, so the
 * two-stage table and the itinerary table leave them unpriced on purpose. The
 * Tobu NIKKO PASS ALL AREA figure is carried from nikko-day-trip.tsx (Tobu,
 * read 19 Oct 2026).
 *
 * Rank fix, 19 Nov 2026 (task-jtk-20261119-R01). Title and H1 now lead with the
 * exact phrase plus "2026", "Price" and "Map". The shinkansen round trips that
 * were deliberately unpriced on 10 Nov now have an official figure, read on
 * 19 Nov 2026 from JR East's own documents:
 *   - eki-net Shinkansen e-ticket tables (reserved ordinary seat, regular
 *     season) — www.eki-net.com/top/e-ticket/pdf_pr/joetsu_normal.pdf and
 *     /pdf/hokuriku_normal.pdf — give the limited express charge: ¥3,180
 *     Tokyo–Karuizawa and Tokyo–Echigo-Yuzawa, ¥3,280 Tokyo–GALA Yuzawa. Their
 *     basic-fare column still shows the pre-14-March-2026 fares.
 *   - JR East's 2026 fare-revision pamphlet (jreast.co.jp/2026unchin-kaitei/
 *     assets/pdf/pamphlet.pdf, trunk-line table) gives the revised basic fare by
 *     band: 141–160 km ¥2,640 → ¥2,750, 181–200 km ¥3,410 → ¥3,520, 201–220 km
 *     ¥3,740 → ¥3,850.
 *   - Two current eki-net discount tables confirm the sums exactly: the
 *     Tokudane 14 table (30% off, to 30 Sep 2026) prints Tokyo–Karuizawa
 *     ¥1,920 + ¥2,220, Tokyo–Echigo-Yuzawa ¥2,460 + ¥2,220 and Tokyo–GALA
 *     Yuzawa ¥2,690 + ¥2,290; the Tokudane Special 28 table (50% off,
 *     Oct–Dec 2026) prints Tokyo–Echigo-Yuzawa ¥1,760 + ¥1,590.
 *   So one way, e-ticket, reserved, regular season: Karuizawa ¥5,930, Echigo-
 *   Yuzawa ¥6,700, GALA Yuzawa ¥7,130 (±¥200 on the charge in peak/off-peak).
 * Tokyo–Nikko is still unpriced: the JR route needs a local-line fare on top of
 * the Utsunomiya shinkansen and the Tobu through route has no readable table, so
 * Nikko stays inside JR East's ¥21,500 GALA + Nikko example.
 * Pass price, validity and the Hayabusa / Komachi / Tokaido exclusions re-read
 * on 19 Nov 2026 through the jreast.co.jp search index (pass page and terms).
 * ---------------------------------------------------------------------------
 */

const CHECKED_ISO = "2026-10-30";
const CHECKED = checkedLabel(CHECKED_ISO);
/** Pass price, the ¥21,500 model route, the N'EX round trip and the Fuji Excursion fare — re-read 10 Nov 2026. */
const PRICE_CHECKED_ISO = "2026-11-10";
const PRICE_CHECKED = checkedLabel(PRICE_CHECKED_ISO);
/** The date tokyo-airport-transfer.tsx read the Tokyo Monorail fare. */
const MONORAIL_CHECKED = checkedLabel("2026-10-25");
/** The date nikko-day-trip.tsx read Tobu's NIKKO PASS ALL AREA price. */
const TOBU_CHECKED = checkedLabel("2026-10-19");

const ADULT = "¥16,000";
const CHILD = "¥8,000";
const MODEL_ROUTE = "¥21,500";
/** Shinkansen e-ticket fares and the pass price/terms — read 19 Nov 2026. */
const FARE_CHECKED_ISO = "2026-11-19";
const FARE_CHECKED = checkedLabel(FARE_CHECKED_ISO);

const TITLE = "JR Tokyo Wide Pass 2026: Price, Map & Is It Worth It?";
const DESCRIPTION =
  "JR Tokyo Wide Pass price 2026: ¥16,000 adult, ¥8,000 child for 3 days. Map of Fuji, Nikko, Karuizawa and GALA Yuzawa, and the round-trip fares it beats.";

/**
 * The map table: each named destination, its line, and the round trip it
 * replaces. Fares are official (see header); conclusion first.
 */
const destinationRows = [
  {
    dest: "Bottom line",
    line: "Any two of the four priced day-trip round trips below (Kawaguchiko, Karuizawa, Echigo-Yuzawa, GALA Yuzawa)",
    rt: "¥20,260 or more",
    vs: "✓ Beats ¥16,000",
    note: "The cheapest pair — Kawaguchiko ¥8,400 + Karuizawa ¥11,860 — is ¥4,260 over the pass. No single round trip on its own reaches ¥16,000; the dearest, GALA Yuzawa, is ¥14,260.",
  },
  {
    dest: "Kawaguchiko (Mt Fuji)",
    line: "Fuji Excursion, Shinjuku ⇄ Kawaguchiko (JR + Fujikyu)",
    rt: "¥8,400",
    vs: "53% of the pass",
    note: "¥4,200 each way on Fujikyu's fares, 1 hr 53 min at the fastest. No non-reserved car, so reserve first.",
  },
  {
    dest: "Karuizawa",
    line: "Hokuriku Shinkansen, Tokyo ⇄ Karuizawa",
    rt: "¥11,860",
    vs: "74% of the pass",
    note: "¥5,930 one way: ¥2,750 fare + ¥3,180 limited express charge, reserved seat, regular season.",
  },
  {
    dest: "Echigo-Yuzawa",
    line: "Joetsu Shinkansen, Tokyo ⇄ Echigo-Yuzawa",
    rt: "¥13,400",
    vs: "84% of the pass",
    note: "¥6,700 one way: ¥3,520 + ¥3,180. A year-round station, one stop short of GALA.",
  },
  {
    dest: "GALA Yuzawa (ski)",
    line: "Joetsu Shinkansen, Tokyo ⇄ GALA Yuzawa",
    rt: "¥14,260",
    vs: "89% of the pass",
    note: "¥7,130 one way: ¥3,850 + ¥3,280. GALA Yuzawa station opens in winter and spring only.",
  },
  {
    dest: "Nikko",
    line: "JR–Tobu through limited express, Shinjuku ⇄ Tobu-Nikko",
    rt: "Not printed",
    vs: `Inside JR East's ${MODEL_ROUTE} example`,
    note: "No single official fare could be read. JR East prices its GALA Yuzawa + Nikko pair, reserved, at about ¥21,500.",
  },
  {
    dest: "Narita Airport",
    line: "N'EX, Narita Airport ⇄ Tokyo",
    rt: "¥5,200",
    vs: "33% of the pass",
    note: "The N'EX round-trip ticket. As two singles it is ¥3,140 each way to Tokyo Station.",
  },
  {
    dest: "Haneda Airport",
    line: "Tokyo Monorail, Haneda ⇄ Hamamatsucho",
    rt: "¥1,040",
    vs: "7% of the pass",
    note: `¥520 each way, 13 minutes (Tokyo Monorail, read ${MONORAIL_CHECKED}).`,
  },
];

/** Table 1 — what you pay and who is allowed to buy it. Figures from JR East. */
const priceRows = [
  {
    item: "Adult (12 and over)",
    value: ADULT,
    note: `Raised from ¥15,000 on 14 March 2026. A page still quoting ¥15,000 is out of date. Checked ${PRICE_CHECKED}.`,
  },
  {
    item: "Child (6 to 11)",
    value: CHILD,
    note: "Raised from ¥7,500 on the same date — exactly half the adult price.",
  },
  {
    item: "Child (0 to 5)",
    value: "No ticket needed",
    note: "Klook's listing states under-sixes travel free provided they do not occupy a separate seat; a child pass is needed if they do.",
  },
  {
    item: "Validity",
    value: "3 consecutive days",
    note: "Three consecutive days from a start date you choose, and the pass is valid for the three days printed on it. A gap day is a day you have paid for.",
  },
  {
    item: "Who can buy it",
    value: "Non-Japanese passport holders",
    note: "JR East states the pass is valid only for visitors holding a non-Japanese passport, and does not impose a Temporary Visitor entry requirement the way the nationwide JAPAN RAIL PASS does.",
  },
  {
    item: "What you must show",
    value: "Your original passport",
    note: "Required to buy and to collect. JR East states a photocopy cannot be used, and the passport must be valid for the whole period you use the pass.",
  },
];

/** Table 2 — what is on the pass and what is not. All from JR East. */
const coverageRows = [
  {
    service: "Bottom line",
    allowed: "JR East + partner lines",
    note: "JR East trains inside the Kanto map, shinkansen included, plus Fujikyu, Izu Kyuko, Tokyo Monorail, Rinkai, Joshin Dentetsu, the New Shuttle and the JR–Tobu through expresses to Nikko. Not the Tokaido Shinkansen, not the Hayabusa or Komachi, not the subway.",
  },
  {
    service: "JR East lines inside the valid area",
    allowed: "✓ Reserved and non-reserved",
    note: "Local, rapid, express and limited express trains, including the shinkansen, in ordinary cars. Reserved seats cost nothing extra.",
  },
  {
    service: "Shinkansen to Karuizawa, GALA Yuzawa and the north edge of the area",
    allowed: "✓ Included",
    note: "JR East names the Hokuriku Shinkansen to Karuizawa and the Joetsu Shinkansen to GALA Yuzawa. GALA Yuzawa station only opens in winter and spring.",
  },
  {
    service: "Fujikyu Railway — all lines, so Kawaguchiko",
    allowed: "✓ Included",
    note: "The whole Fujikyu Railway is on the pass. Reserved seats on the Fujisan Express, Fujisan View Express and Fuji Tozan Densha carry an extra fee.",
  },
  {
    service: "Izu Kyuko, Tokyo Monorail, Rinkai Line, Joshin Dentetsu",
    allowed: "✓ Included",
    note: "All lines of each, plus the New Shuttle between Omiya and the Railway Museum. The monorail is why Haneda is on the pass.",
  },
  {
    service: "JR–Tobu through limited express to Tobu-Nikko",
    allowed: "✓ Reserved seats free",
    note: "The Nikko, Kinugawa and SPACIA Kinugawa through services. Between Kurihashi and Shimo-Imaichi only these through trains count; from Shimo-Imaichi you may also take Tobu regular and rapid trains to Tobu-Nikko and Kinugawa-Onsen.",
  },
  {
    service: "Limited expresses that start or end at a Tobu station",
    allowed: "✗ Not usable",
    note: "JR East is explicit: only the trains that run through from JR lines onto Tobu are covered. A Tobu-originating limited express is not.",
  },
  {
    service: "Tokaido Shinkansen",
    allowed: "✗ Never",
    note: "A different company operates it, so no JR East pass covers it. Tokyo to Kyoto or Osaka is a separate ticket on any day your pass is valid.",
  },
  {
    service: "Hayabusa and Komachi shinkansen",
    allowed: "✗ Not usable",
    note: "JR East's transportation conditions exclude these two Tohoku services; riding them needs the limited express charge paid separately. Take a Yamabiko or Nasuno instead.",
  },
  {
    service: "Green Car and GranClass",
    allowed: "✗ Extra charge",
    note: "The pass is an ordinary-car product. Upgrading needs a separate fee even on a train it otherwise covers.",
  },
  {
    service: "Tokyo Metro, Toei subway and city buses",
    allowed: "✗ Not covered",
    note: "This is a JR East product and it stops at JR gates. Inside Tokyo you still want an IC card or the Tokyo Subway Ticket on top.",
  },
];

/** Table 3 — the break-even arithmetic, built only from fares an operator publishes. */
const fareRows = [
  {
    journey: "Bottom line",
    fare: "¥13,600 for the two cheapest long trips",
    source: "Sum of the rows below",
    note: "The N'EX round trip plus one Fuji Excursion return falls ¥2,400 short of the pass. Swap the N'EX for a Karuizawa or GALA Yuzawa return and it clears ¥16,000.",
  },
  {
    journey: "Narita Airport ⇄ Tokyo Station, N'EX round-trip ticket",
    fare: "¥5,200 adult, ¥2,600 child",
    source: `JR East, checked ${PRICE_CHECKED}`,
    note: "Valid 14 days for one out and one back in a reserved ordinary-car seat. Two singles to Shinjuku would be ¥6,660.",
  },
  {
    journey: "Narita Airport → Tokyo, single on the N'EX",
    fare: "¥3,140",
    source: `JR East, checked ${CHECKED}`,
    note: "¥3,330 to Shinagawa, Shibuya or Shinjuku. Every ordinary-car seat on the N'EX can be reserved.",
  },
  {
    journey: "Shinjuku ⇄ Kawaguchiko, Fuji Excursion (Fuji Kaiyu)",
    fare: "¥4,200 each way, ¥8,400 return",
    source: `Fujikyu Railway, checked ${PRICE_CHECKED}`,
    note: "¥2,580 basic fare plus a ¥1,620 limited express ticket, 1 hr 53 min at the fastest. Four round trips a day, and the train has no non-reserved car.",
  },
  {
    journey: "Haneda Airport ⇄ Hamamatsucho, Tokyo Monorail",
    fare: "¥520 adult, ¥260 child each way",
    source: `Tokyo Monorail, read ${MONORAIL_CHECKED}`,
    note: "13 minutes, about every five minutes. Small money, but it is on the pass and most Tokyo trips use it twice.",
  },
  {
    journey: "JR East's own example: Tokyo → GALA Yuzawa → Omiya → Tobu-Nikko → Shinjuku, reserved seats",
    fare: `About ${MODEL_ROUTE}`,
    source: `JR East, checked ${PRICE_CHECKED}`,
    note: "The Joetsu Shinkansen both ways to GALA Yuzawa plus the Nikko limited express out and back. Against a ¥16,000 pass that is roughly ¥5,500 saved on two days of travel.",
  },
];

/** Table 4 — the three passes travellers confuse with each other. */
const passRows = [
  {
    pass: "JR Tokyo Wide Pass",
    price: `${ADULT} adult, ${CHILD} child`,
    valid: "3 consecutive days",
    covers:
      "JR East lines around Tokyo and the Kanto area, plus all Fujikyu, Izu Kyuko, Tokyo Monorail, Rinkai, Joshin Dentetsu and the JR–Tobu through limited expresses. No Tokaido Shinkansen.",
    pick: "A Tokyo base with two or three day trips — Kawaguchiko, Nikko, Karuizawa, Izu, GALA Yuzawa",
  },
  {
    pass: "JR EAST PASS",
    price: "¥35,000 for 5 days, ¥50,000 for 10 days (children half)",
    valid: "5 or 10 consecutive days",
    covers:
      "Every JR East line, not just Kanto, plus the Tokyo Monorail, Aoimori Railway, IGR Iwate Galaxy Railway, Sendai Airport Transit, Sanriku Railway and Hokuetsu Express.",
    pick: "Once Sendai, Aomori, Niigata or Nagano are in the plan — more than double the price, and far more than double the map",
  },
  {
    pass: "JR EAST PASS (Nagano, Niigata area)",
    price: "No longer sold",
    valid: "—",
    covers:
      "Withdrawn. JR East ended sales of both the Nagano/Niigata-area and Tohoku-area passes on 13 March 2026 and replaced them with the single JR EAST PASS above.",
    pick: "Nothing — if a page is still recommending it for 2026 travel, that page is out of date",
  },
  {
    pass: "JAPAN RAIL PASS (nationwide)",
    price: "¥50,000 online, ¥53,000 through an overseas agency (7-day, Ordinary)",
    valid: "7, 14 or 21 consecutive days",
    covers:
      "JR lines nationwide, including the Tokaido Shinkansen that no JR East pass touches — but not the Nozomi or Mizuho without a supplement.",
    pick: "Only when the trip leaves eastern Japan. For three days around Tokyo it is more than three times the price",
  },
];

/** Where the pass pays and where it does not — the judgement table. */
const worthRows = [
  {
    plan: "Three days with a Kawaguchiko day, a second day trip and a Narita airport run",
    verdict: "✓ Buy it",
    why: "The N'EX round trip is ¥5,200 and the Fuji Excursion return is ¥8,400 — ¥13,600 of the ¥16,000 in two journeys, before a single Yamanote ride. One more day trip clears it.",
  },
  {
    plan: "A GALA Yuzawa ski day plus a Nikko day",
    verdict: "✓ Buy it",
    why: `JR East's own worked example prices exactly this pair in reserved seats at about ${MODEL_ROUTE}, against ${ADULT} for the pass.`,
  },
  {
    plan: "You hold a Japanese passport",
    verdict: "✗ Not eligible",
    why: "JR East sells it only to holders of a non-Japanese passport, and the original has to be shown at purchase and at collection.",
  },
];

/**
 * Stage 2 of the break-even test — add the journeys up against the ¥16,000 pass.
 * Built only from the fares in fareRows; nothing here is estimated.
 */
const breakEvenRows = [
  {
    combo: "Bottom line: any two day-trip returns (Kawaguchiko, Karuizawa, Echigo-Yuzawa, GALA Yuzawa)",
    total: "¥20,260 or more",
    diff: "+¥4,260 or more",
    verdict: "✓ Buy the pass — one day-trip return alone never reaches ¥16,000",
  },
  {
    combo: "One Fuji Excursion return to Kawaguchiko",
    total: "¥8,400",
    diff: "−¥7,600",
    verdict: "✗ Buy the ticket",
  },
  {
    combo: "N'EX round trip only (Narita ⇄ Tokyo)",
    total: "¥5,200",
    diff: "−¥10,800",
    verdict: "✗ Buy the N'EX round trip",
  },
  {
    combo: "N'EX round trip + Fuji Excursion return",
    total: "¥13,600",
    diff: "−¥2,400",
    verdict: "Almost — one more long trip in the same 3 days tips it",
  },
  {
    combo: "Fuji Excursion return + Karuizawa shinkansen return",
    total: "¥20,260",
    diff: "+¥4,260",
    verdict: "✓ Buy the pass",
  },
  {
    combo: "Fuji Excursion return + GALA Yuzawa shinkansen return",
    total: "¥22,660",
    diff: "+¥6,660",
    verdict: "✓ Buy the pass",
  },
  {
    combo: "JR East's example: GALA Yuzawa + Nikko, reserved seats",
    total: `About ${MODEL_ROUTE}`,
    diff: "About +¥5,500",
    verdict: "✓ Buy the pass",
  },
  {
    combo: "JR East's example + a Fuji Excursion return (all 3 days used)",
    total: "About ¥29,900",
    diff: "About +¥13,900",
    verdict: "✓ Buy the pass",
  },
];

/**
 * Three-day patterns. Only the legs with an operator-published fare are priced;
 * the Nikko and Karuizawa returns are named but deliberately left unpriced.
 */
const itineraryRows = [
  {
    pattern: "Bottom line",
    day1: "One long trip out of Tokyo",
    day2: "A second long trip",
    day3: "A third trip, or the airport run",
    sum: "Two priced round trips already start at ¥20,260 — over the ¥16,000 pass by ¥4,260",
  },
  {
    pattern: "Karuizawa, Fuji and departure",
    day1: "Hokuriku Shinkansen to Karuizawa and back (¥11,860)",
    day2: "Fuji Excursion to Kawaguchiko and back (¥8,400)",
    day3: "Tokyo to Narita on the N'EX (¥3,140) and fly out",
    sum: "¥23,400 bought separately — the pass saves ¥7,400",
  },
  {
    pattern: "Fuji, Nikko and the airport",
    day1: "Land at Narita, N'EX into Tokyo (¥3,140)",
    day2: "Fuji Excursion to Kawaguchiko and back (¥8,400)",
    day3: "Nikko limited express through to Tobu-Nikko and back",
    sum: "¥11,540 on the priced legs; the Nikko return has to cover the other ¥4,460",
  },
  {
    pattern: "Snow and shrines (winter to spring)",
    day1: "Joetsu Shinkansen to GALA Yuzawa for a ski day",
    day2: "Nikko limited express to Tobu-Nikko and back",
    day3: "Fuji Excursion to Kawaguchiko and back (¥8,400)",
    sum: `About ¥29,900 with JR East's ${MODEL_ROUTE} GALA–Nikko example — about ¥13,900 ahead`,
  },
  {
    pattern: "One ski day, two Tokyo days",
    day1: "Joetsu Shinkansen to GALA Yuzawa and back (¥14,260)",
    day2: "A Tokyo day on the subway",
    day3: "A Tokyo day on the subway",
    sum: "¥14,260 — ¥1,740 short of the pass, so buy the shinkansen tickets",
  },
];

/** Plan B — the trips where the pass loses, and what to buy instead. */
const planBRows = [
  {
    trip: "One Kawaguchiko day and nothing else",
    instead: "Fuji Excursion tickets, ¥4,200 each way",
    why: `¥8,400 return against a ${ADULT} pass. Fujikyu, checked ${PRICE_CHECKED}. A coach tour is the other option if the day is about the view.`,
  },
  {
    trip: "The airport run is the only long journey",
    instead: "N'EX round-trip ticket, ¥5,200",
    why: `One out and one back within 14 days, reserved seat included. JR East, checked ${PRICE_CHECKED}.`,
  },
  {
    trip: "Nikko is the only day trip",
    instead: "Tobu's NIKKO PASS ALL AREA, ¥8,000 adult",
    why: `Tobu's own pass from Asakusa: four days, one Asakusa–Shimo-Imaichi round trip plus Tobu lines and Nikko buses, with the limited express seat charged on top. Tobu, read ${TOBU_CHECKED}.`,
  },
  {
    trip: "Most days are spent inside Tokyo",
    instead: "An IC card or the Tokyo Subway Ticket",
    why: "The pass opens no Tokyo Metro or Toei gate and no city bus, so it does nothing for Shibuya, Asakusa or Ginza days.",
  },
  {
    trip: "Kyoto or Osaka is on the trip",
    instead: "A separate Tokaido Shinkansen ticket, or the nationwide JR Pass",
    why: "The Tokaido Shinkansen is never on a JR East pass, and the valid area stops well short of Kansai.",
  },
  {
    trip: "Your day trips are not on consecutive days",
    instead: "Individual tickets for each trip",
    why: "The three days are consecutive and printed on the pass. A dead day in the middle is a day you have paid for.",
  },
];

const buySteps = [
  {
    title: "Book online before you fly, on JR East's site or a reseller",
    desc: `JR East sells the pass through its own JR-EAST Train Reservation site, and resellers including Klook sell a voucher version. Either way you are buying the right to collect a pass in Japan rather than something that arrives in the post. Checked ${CHECKED}.`,
  },
  {
    title: "Collect it in Japan, with your passport",
    desc: "JR East gives two methods: a Reserved Seat Ticket Vending Machine fitted with a passport reader — have the IC-chip page ready — or a JR EAST Travel Service Center, where staff check your eligibility and issue the pass. Klook's listing names Haneda and Narita as its redemption points, so check which counter yours uses before you land.",
  },
  {
    title: "Pick your three days, then live with them",
    desc: "The three days are consecutive and printed on the pass. If your Tokyo days are split either side of a Kyoto leg, the pass is the wrong shape for the trip — two day-trip tickets will cost less than a pass with a dead day in the middle.",
  },
  {
    title: "Reserve your seats before you board, not on the train",
    desc: "Reserved ordinary-car seats are included at no extra charge, but JR East requires the seat ticket to be issued first — at a Reserved Seat Ticket Vending Machine, a JR Ticket Office (Midori-no-Madoguchi) or a Travel Center. Do it for the shinkansen and the Fuji Excursion in particular; the Fuji Excursion has no non-reserved car at all.",
  },
  {
    title: "Budget for the subway separately",
    desc: "Nothing about this pass opens a Tokyo Metro or Toei gate. Keep an IC card topped up for the inner-city legs, and read the Tokyo transport guide for which of the two systems your hotel actually sits on.",
  },
];

/** The five questions the page is ranked for, in FAQPage. */
const faqItems = [
  {
    q: "How much is the JR Tokyo Wide Pass in 2026?",
    a: "¥16,000 for an adult aged 12 or over and ¥8,000 for a child aged 6 to 11, for three consecutive days. JR East has charged that since 14 March 2026, when the pass went up from ¥15,000 and ¥7,500, so a page quoting ¥15,000 for 2026 travel is out of date. Children aged 0 to 5 need no ticket unless they occupy a separate seat. The price was re-checked on JR East's pass page on 19 November 2026.",
  },
  {
    q: "Is the JR Tokyo Wide Pass worth it?",
    a: "Yes, if your three consecutive days hold two long day trips; no, if they hold one. On JR East's and Fujikyu's own fares, the round trips from Tokyo are ¥8,400 to Kawaguchiko on the Fuji Excursion, ¥11,860 to Karuizawa, ¥13,400 to Echigo-Yuzawa and ¥14,260 to GALA Yuzawa (shinkansen e-ticket, reserved seat, regular season). The cheapest pair, Kawaguchiko plus Karuizawa, is ¥20,260 — ¥4,260 more than the ¥16,000 pass — while no single round trip reaches ¥16,000. The pass covers no Tokyo Metro, Toei subway or city bus, so it does nothing for days spent inside Tokyo. Fares checked 19 November 2026.",
  },
  {
    q: "Does the Tokyo Wide Pass cover Mt Fuji / Kawaguchiko?",
    a: "Yes, as far as Kawaguchiko station. The whole Fujikyu Railway is on the pass, so the Fuji Excursion limited express from Shinjuku through to Kawaguchiko is covered in a reserved ordinary-car seat; bought separately it is ¥4,200 each way on Fujikyu's fares (¥2,580 basic fare plus ¥1,620 limited express ticket), fastest 1 hour 53 minutes. The Fuji Excursion has no non-reserved car, so get the seat ticket issued before boarding. The pass does not cover the buses up to the Fifth Station, and reserved seats on the Fujisan Express, Fujisan View Express and Fuji Tozan Densha carry an extra fee. Fujikyu fares checked 10 November 2026.",
  },
  {
    q: "Can I use it for Gala Yuzawa skiing?",
    a: "Yes, for the train. JR East names GALA Yuzawa among the pass's destinations, and the Joetsu Shinkansen from Tokyo to GALA Yuzawa is covered in a reserved ordinary-car seat — a journey that costs ¥7,130 each way, ¥14,260 return, as a shinkansen e-ticket in the regular season. GALA Yuzawa station opens only in winter and spring, and a single ski day still falls ¥1,740 short of the ¥16,000 pass, so it pays when the same three days include a second trip such as Kawaguchiko or Nikko. Lift tickets and rental are not part of the pass. Fares checked 19 November 2026.",
  },
  {
    q: "Where can I buy the JR Tokyo Wide Pass?",
    a: "Online from JR East's JR-EAST Train Reservation site, or as a voucher from a reseller such as Klook, then collect the physical pass in Japan. JR East lists two ways to collect: a Reserved Seat Ticket Vending Machine with a passport reader, or a JR EAST Travel Service Center. Klook's listing names Haneda and Narita as its redemption points. Either way you need your original passport — a non-Japanese one, valid for the whole period of use; JR East states a photocopy will not do. Klook's listing also excludes holders of Japanese permanent residency, which JR East's own wording does not.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/tokyo-wide-pass") } });

export default function TokyoWidePassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/tokyo-wide-pass" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/tokyo-wide-pass" />
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "JR Tokyo Wide Pass",
                  item: "https://www.japan-travel-kit.com/guides/transport/tokyo-wide-pass",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/transport/tokyo-wide-pass",
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
          <span className={styles.breadCurrent}>JR Tokyo Wide Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            JR Tokyo Wide Pass 2026: <br />Price, Map &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            Three consecutive days of JR East trains around Tokyo — Kawaguchiko, Nikko, Karuizawa and GALA Yuzawa
            included. Here is what JR East charges, where the pass goes, and the round trips that pay it back.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${FARE_CHECKED}`, "Official JR East fares", "Break-even arithmetic"].map((t) => (
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
                <p className={styles.verdictStatValue}>3 consecutive days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shinkansen</p>
                <p className={styles.verdictStatValue}>Yes — not Tokaido</p>
              </div>
            </div>
            {/* Answer-first: this is the article's first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>JR Tokyo Wide Pass</strong> costs <strong>{ADULT}</strong> for an adult and {CHILD} for a
              child aged 6 to 11 in 2026 (JR East, checked {FARE_CHECKED}), and it is valid for <strong>three
              consecutive days</strong>. It covers JR East trains around Tokyo, shinkansen included, out to
              <strong> Mt Fuji and Kawaguchiko</strong> (Fujikyu Railway), <strong>Nikko</strong>,{" "}
              <strong>Karuizawa</strong>, <strong>Echigo-Yuzawa and GALA Yuzawa</strong>, Izu, and both{" "}
              <strong>Narita and Haneda</strong> airports. It pays off on <strong>two day trips</strong>: the cheapest
              pair of round trips, Kawaguchiko (¥8,400) plus Karuizawa (¥11,860), already comes to{" "}
              <strong>¥20,260</strong>, while no single round trip reaches {ADULT}.
            </p>
            <p className={styles.verdictText}>
              It never covers the Tokaido Shinkansen, the Tokyo Metro or a city bus, and it is sold only to holders of a
              non-Japanese passport, collected in Japan on that passport. This page is the three-day Kanto pass; for
              Tohoku, Niigata, Nagano and five or ten days of long-distance travel, the{" "}
              <Link href="/guides/transport/jr-east-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
                JR East Pass
              </Link>{" "}
              is ¥35,000 for 5 consecutive days or ¥50,000 for 10 (JR East, checked 2026-11-17).
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink
                href={jrTokyoWidePass.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                JR Tokyo Wide Pass on Klook →
              </KlookLink>
              <KlookLink
                href={kawaguchikoYamanakakoBusTour.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Kawaguchiko Day Tour Instead →
              </KlookLink>
              <KlookLink
                href={nikkoCulturalDayTourUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Nikko Day Tour from Tokyo →
              </KlookLink>
              <KlookLink
                href={klookEsim.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                {klookEsim.ctaLabel}
              </KlookLink>
              <KlookLink
                href={naritaExpressRoundTripUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Just the N&apos;EX Round Trip Instead →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Map + fare vs pass — added 19 Nov 2026 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Map &amp; fares</span>
          <h2 className={styles.sectionTitle}>Where Does the JR Tokyo Wide Pass Go, and What Does Each Trip Cost Without It?</h2>
          <p className={styles.bodyText}>
            The pass map runs from Tokyo out to Kawaguchiko in the west, Nikko in the north, Karuizawa and GALA Yuzawa
            in the north-west, Izu in the south and both airports. Each row below is a destination JR East names for
            the pass, with the round trip you would otherwise pay for. Any two day-trip returns beat {ADULT}; any one
            on its own does not.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Destination", "Line from Tokyo", "Round trip without the pass", `vs the ${ADULT} pass`, "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {destinationRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.line}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.rt}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.vs}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {FARE_CHECKED_ISO}. Shinkansen fares are JR East&apos;s Shinkansen e-ticket price for a
            reserved ordinary seat in the regular season (the charge is ¥200 more in peak season and ¥200 less in the
            off-peak), using the basic fares in force since the 14 March 2026 fare revision — sources:{" "}
            <a href="https://www.eki-net.com/top/e-ticket/pdf_pr/joetsu_normal.pdf" target="_blank" rel="noopener noreferrer">
              eki-net Joetsu Shinkansen fare table
            </a>
            ,{" "}
            <a href="https://www.jreast.co.jp/2026unchin-kaitei/" target="_blank" rel="noopener noreferrer">
              JR East 2026 fare revision
            </a>{" "}
            and the{" "}
            <a href="https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html" target="_blank" rel="noopener noreferrer">
              JR East pass page and area map
            </a>
            . Fuji Excursion and N&apos;EX fares checked {PRICE_CHECKED}. For a Fuji, Karuizawa or ski day planned in
            detail, see the{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kawaguchiko day trip
            </Link>
            ,{" "}
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              Karuizawa day trip
            </Link>{" "}
            and{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              GALA Yuzawa ski day trip
            </Link>{" "}
            guides.
          </p>
        </section>

        {/* A29 (27 Nov 2026): the next step right under the answer — this page sent 0 affiliate_click
            in GA4 for 20–26 Nov. Cards per path in lib/next-step.ts. */}
        <NextStepCards />

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the JR Tokyo Wide Pass in 2026?</h2>
          <p className={styles.bodyText}>
            {ADULT} for an adult, {CHILD} for a child, three consecutive days. The reason you will see other numbers
            quoted is a price revision: JR East raised the pass on <strong>14 March 2026</strong>, in the same round of
            changes that created the new JR EAST PASS.
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
            Last checked: {FARE_CHECKED_ISO} —{" "}
            <a href="https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html" target="_blank" rel="noopener noreferrer">
              jreast.co.jp/en/multi/pass/tokyowidepass.html
            </a>
            . Prices re-checked on JR East&apos;s own pass page on {FARE_CHECKED}; validity and eligibility read on {CHECKED}; the ¥15,000 to{" "}
            {ADULT} change comes from its 28 January 2026 press release on new and revised passes. The under-six rule is
            as Klook&apos;s listing states it. For the nationwide pass, its October 2026 price rise and its break-even calculator, see our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass price
            </Link>{" "}
            guide
            .
          </p>
        </section>

        {/* Coverage */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it covers</span>
          <h2 className={styles.sectionTitle}>What Does the JR Tokyo Wide Pass Actually Cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            JR East&apos;s own wording is that the pass is valid for reserved and non-reserved seats in ordinary cars of
            local, rapid, express and limited express trains — shinkansen included — on JR East lines inside the area on
            its map, plus <strong>all</strong> Fujikyu Railway, Izu Kyuko, Tokyo Waterfront Area Rapid Transit (Rinkai),
            Tokyo Monorail and Joshin Dentetsu lines, and the Saitama New Urban Transit (New Shuttle) between Omiya and
            the Railway Museum. The exclusions decide this purchase more often than the inclusions, so read the bottom of
            the table first.
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
            Last checked: {FARE_CHECKED_ISO} —{" "}
            <a href="https://www.jreast.co.jp/en/multi/pass/tokyowidepass_terms.html" target="_blank" rel="noopener noreferrer">
              JR TOKYO Wide Pass transportation conditions
            </a>
            . Coverage and exclusions first read off JR East&apos;s pass page and its transportation conditions on {CHECKED}; the
            Hayabusa, Komachi and Tokaido exclusions re-read on {FARE_CHECKED}.
            The named destinations JR East itself attaches to the pass are Lake Kawaguchiko, Kusatsu, Nikko, Izu, GALA
            Yuzawa and Karuizawa; the precise boundary stations are on the official map, which is worth opening if your
            day trip sits near the edge. For the city layer the pass leaves out, see{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              getting around Tokyo
            </Link>{" "}
            and{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              IC cards in Japan
            </Link>
            .
          </p>
        </section>

        {/* Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the JR Tokyo Wide Pass Worth It?</h2>
          <p className={styles.bodyText}>
            Yes, when your three days hold two day trips: Kawaguchiko plus Karuizawa is ¥20,260 bought separately,
            ¥4,260 more than the pass. The way to check your own plan is to add up the journeys you would buy anyway.
            Every fare below is one the operator publishes; the shinkansen returns to Karuizawa and GALA Yuzawa are in the
            map table above. Tokyo–Nikko is the one route left unpriced, because no single official fare for it could be
            read — JR East&apos;s worked example, the last row, covers it instead. The test runs in two stages: price each
            journey, then add up your three days.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>
            Stage 1: What Does Each Journey Cost Without the Pass?
          </h3>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Journey", "Normal fare", "Source", "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.journey}>
                      <td className={styles.tdProvider}>{row.journey}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The arithmetic that settles it.</strong> Land at Narita, buy the N&apos;EX round trip at ¥5,200, and
            take one day out to Kawaguchiko on the Fuji Excursion at ¥8,400 return: that is <strong>¥13,600 of the{" "}
            {ADULT}</strong> in two journeys, before you have tapped through a single Yamanote gate. Add the Haneda
            monorail at ¥520 each way if you fly out of the other airport, and a second day trip finishes the job. The
            pass therefore wins on a three-day stay with two excursions in it, and loses on a three-day stay spent inside
            Tokyo — where it covers no subway line at all.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>
            Stage 2: Do Your Three Days Add Up to More Than {ADULT}?
          </h3>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Journeys in your 3 days", "Bought separately", `vs the ${ADULT} pass`, "What to do"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {breakEvenRows.map((row) => (
                    <tr key={row.combo}>
                      <td className={styles.tdProvider}>{row.combo}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.total}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.diff}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {FARE_CHECKED_ISO} —{" "}
            <a href="https://www.jreast.co.jp/en/multi/nex/tickets/" target="_blank" rel="noopener noreferrer">
              JR East N&apos;EX tickets
            </a>
            ,{" "}
            <a href="https://www.fujikyu-railway.jp/" target="_blank" rel="noopener noreferrer">
              Fujikyu Railway
            </a>{" "}
            and the eki-net shinkansen fare tables above. Adult fares from Stage 1: JR East and Fujikyu, checked {PRICE_CHECKED};
            Karuizawa and GALA Yuzawa returns from the map table, checked {FARE_CHECKED}. The GALA Yuzawa half of JR
            East&apos;s example is the ski day in our{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              Gala Yuzawa day trip from Tokyo
            </Link>
            {" "}guide, which runs the same pass arithmetic from the slope end.
          </p>
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two things to settle on the listing rather than here, because neither is a published fare: the{" "}
            <strong>cancellation and date-change terms</strong>, which matter because you nominate three consecutive days
            and ski-season dates sell out first, and <strong>which collection point</strong> your voucher names — the
            counters at Haneda and Narita keep different hours from the machines, and a late landing can mean collecting
            the pass the following morning rather than on arrival.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check the JR Tokyo Wide Pass →
            </KlookLink>
            <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Compare the N&apos;EX Round Trip →
            </KlookLink>
          </div>
        </section>

        {/* Itinerary patterns — added 10 Nov 2026 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Itineraries</span>
          <h2 className={styles.sectionTitle}>What Does a Good 3-Day JR Tokyo Wide Pass Itinerary Look Like?</h2>
          <p className={styles.bodyText}>
            One long trip a day, three days in a row, from a Tokyo base. Karuizawa, Fuji and an airport run adds up to
            ¥23,400 bought separately, so the pass saves ¥7,400. Only the Nikko return is named without a figure,
            because no single official fare for it could be read — check JR East&apos;s fare search for your date.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pattern", "Day 1", "Day 2", "Day 3", "Priced legs vs the pass"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itineraryRows.map((row) => (
                    <tr key={row.pattern}>
                      <td className={styles.tdProvider}>{row.pattern}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.day1}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.day2}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.day3}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.sum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {FARE_CHECKED_ISO} —{" "}
            <a href="https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html" target="_blank" rel="noopener noreferrer">
              JR East pass page
            </a>{" "}
            and{" "}
            <a href="https://www.eki-net.com/top/e-ticket/pdf/hokuriku_normal.pdf" target="_blank" rel="noopener noreferrer">
              eki-net Hokuriku Shinkansen fare table
            </a>
            . Fares: N&apos;EX single and Fuji Excursion return from JR East and Fujikyu, and JR East&apos;s {MODEL_ROUTE}{" "}
            example, all checked {PRICE_CHECKED}; Karuizawa and GALA Yuzawa returns checked {FARE_CHECKED}. For a
            seven-day plan that fits these three days in, see the{" "}
            <Link href="/guides/attractions/tokyo-7-day-itinerary" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo 7-day itinerary
            </Link>
            . GALA Yuzawa station opens only in winter and spring, and the Fuji
            Excursion has no non-reserved car, so reserve that seat before the day.
          </p>
        </section>

        {/* Plan B — added 10 Nov 2026 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Plan B</span>
          <h2 className={styles.sectionTitle}>When Is the JR Tokyo Wide Pass Not Worth It?</h2>
          <p className={styles.bodyText}>
            When the trip has fewer than two long journeys in three consecutive days, something cheaper does the same
            job. These are the cases, and what to buy instead.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Buy this instead", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planBRows.map((row) => (
                    <tr key={row.trip}>
                      <td className={styles.tdProvider}>{row.trip}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.instead}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {FARE_CHECKED_ISO} (pass price) and {PRICE_CHECKED_ISO} (N&apos;EX, Fujikyu) —{" "}
            <a href="https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html" target="_blank" rel="noopener noreferrer">
              JR East pass page
            </a>
            ; Tobu figure as read {TOBU_CHECKED}. For the alternatives in full: the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo Subway Ticket
            </Link>{" "}
            for city days, the{" "}
            <Link href="/guides/transport/tokyo-airport-transfer" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo airport transfer guide
            </Link>{" "}
            for the N&apos;EX and the other airport routes, and the rest of our{" "}
            <Link href="/guides/transport" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan transport guides
            </Link>{" "}
            for the other regional passes.
          </p>
        </section>

        {/* Mt Fuji / Kawaguchiko */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Mt Fuji</span>
          <h2 className={styles.sectionTitle}>Does the Tokyo Wide Pass Cover Mt Fuji / Kawaguchiko?</h2>
          <p className={styles.bodyText}>
            Yes, and it is the single best reason most people buy it. Because <strong>all</strong> Fujikyu Railway lines
            are on the pass, the <strong>Fuji Excursion</strong> — Fuji Kaiyu on Fujikyu&apos;s own signage — runs
            through from Shinjuku onto the Fujikyu line and into Kawaguchiko without you buying anything extra. Fujikyu
            prices that journey at <strong>¥4,200</strong> one way (¥2,580 basic fare plus a ¥1,620 limited express
            ticket) and puts the fastest run at <strong>1 hour 53 minutes</strong>. Read on {PRICE_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Two practical catches. The Fuji Excursion runs <strong>four round trips a day</strong>, with one more in
            some seasons, and the train has <strong>no non-reserved car at all</strong> — so a pass without a seat
            ticket is a pass you cannot board. Get the reservation issued at a machine or ticket office before you go to
            the platform. And reserved seats on the <strong>Fujisan Express, Fujisan View Express and Fuji Tozan
            Densha</strong> carry a fee on top of the pass.
          </p>
          <p className={styles.bodyText}>
            What the pass does not do is get you up the mountain. The buses from Kawaguchiko to the Subaru Line Fifth
            Station are not on it, and nor is any Fuji-area sightseeing bus. If the point of the day is the view rather
            than the train, a coach tour that collects you in Tokyo often works out simpler than a pass plus bus
            tickets — our{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kawaguchiko day trip guide
            </Link>{" "}
            and{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Mt Fuji day trip guide
            </Link>{" "}
            compare the two properly.
          </p>
          <KlookLink
            href={kawaguchikoYamanakakoBusTour.url}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored nofollow noopener"
            style={{ marginTop: "0.5rem", display: "inline-block" }}
          >
            Compare a Kawaguchiko day tour on Klook →
          </KlookLink>
        </section>

        {/* Shinkansen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shinkansen</span>
          <h2 className={styles.sectionTitle}>Does the Tokyo Wide Pass Cover the Shinkansen?</h2>
          <p className={styles.bodyText}>
            It covers the JR East shinkansen inside the valid area, in an ordinary car, with reserved seats included at
            no extra charge. That is what turns a three-day Tokyo stay into something wider: the Hokuriku Shinkansen
            takes you to <strong>Karuizawa</strong>, the Joetsu Shinkansen to <strong>GALA Yuzawa</strong> — a station
            JR East notes is open only in winter and spring — and the Tohoku Shinkansen runs north to the edge of the
            map.
          </p>
          <p className={styles.bodyText}>
            The line it never covers is the <strong>Tokaido Shinkansen</strong>, because JR East does not operate it. If
            your trip has Kyoto, Osaka or Nagoya in it, that leg is a separate ticket whatever pass is in your pocket —
            see{" "}
            <Link href="/guides/transport/tokyo-to-kyoto" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo to Kyoto
            </Link>{" "}
            for what it costs and{" "}
            <Link href="/guides/transport/shinkansen-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              our shinkansen guide
            </Link>{" "}
            for how the ticket types work. <strong>Green Car and GranClass</strong> seats also sit outside the pass and
            need a separate fee, even on a train it otherwise covers.
          </p>
          <p className={styles.bodyText}>
            For the Karuizawa end of the map specifically, the pass and a day tour answer different questions: the pass
            gives you the train and leaves the day to you, a tour books the day and the transport together. Our{" "}
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Karuizawa day trip guide
            </Link>{" "}
            works through both, and the{" "}
            <Link href="/guides/attractions/nikko-day-trip" style={{ color: "var(--red)", fontWeight: 600 }}>
              Nikko day trip guide
            </Link>{" "}
            does the same for the route JR East builds its own example around.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={karuizawaShinkansenDayTrip.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Karuizawa Shinkansen Day Trip →
            </KlookLink>
            <KlookLink href={nikkoCulturalDayTourUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Nikko Day Tour from Tokyo →
            </KlookLink>
          </div>
        </section>

        {/* GALA Yuzawa — added 19 Nov 2026 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Ski</span>
          <h2 className={styles.sectionTitle}>Can I Use the JR Tokyo Wide Pass for GALA Yuzawa Skiing?</h2>
          <p className={styles.bodyText}>
            Yes — the Joetsu Shinkansen from Tokyo to GALA Yuzawa is on the pass, and that round trip is{" "}
            <strong>¥14,260</strong> as a shinkansen e-ticket in the regular season (checked {FARE_CHECKED}). On its own
            that is ¥1,740 short of the {ADULT} pass, so the pass pays only when the same three days include a second
            trip — Kawaguchiko, Karuizawa or Nikko. GALA Yuzawa station opens in winter and spring only, and the lift
            ticket, rental and lessons are separate; the full resort day, with GALA&apos;s own 2026-27 prices, is in
            our{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              GALA Yuzawa ski day trip guide
            </Link>
            . In ski season, get the shinkansen seat ticket issued as soon as the pass is collected.
          </p>
          <KlookLink
            href={galaNaebaSkiDayTripTokyo.url}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored nofollow noopener"
            style={{ marginTop: "0.5rem", display: "inline-block" }}
          >
            Compare a GALA Yuzawa ski day trip on Klook →
          </KlookLink>
        </section>

        {/* Pass comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Should I Get the Tokyo Wide Pass, the JR EAST PASS or the JR Pass?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price (adult)", "Valid for", "What it covers", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.valid}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {FARE_CHECKED_ISO} (Tokyo Wide Pass) —{" "}
            <a href="https://www.jreast.co.jp/en/multi/pass/" target="_blank" rel="noopener noreferrer">
              JR East passes
            </a>{" "}
            and{" "}
            <a href="https://japanrailpass.net/en/" target="_blank" rel="noopener noreferrer">
              japanrailpass.net
            </a>
            . JR East figures read off its own pass pages and its 28 January 2026 press release on {CHECKED}; JAPAN RAIL
            PASS prices read off japanrailpass.net the same day, where the 7-day Ordinary pass is ¥50,000 bought online
            and ¥53,000 through an overseas agency (14-day ¥80,000 / ¥84,000, 21-day ¥100,000 / ¥105,000). The row that
            trips people up is the third: the <strong>JR EAST PASS (Nagano, Niigata area)</strong> and the Tohoku-area
            version both stopped being sold on 13 March 2026, so guides recommending them for this winter are
            describing a pass you cannot buy. Our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            has the nationwide break-even, and{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo to Kanazawa
            </Link>{" "}
            covers the Hokuriku route once you go past Karuizawa.
          </p>
        </section>

        {/* Buying */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Buying it</span>
          <h2 className={styles.sectionTitle}>Where Can I Buy the JR Tokyo Wide Pass?</h2>
          <p className={styles.bodyText}>
            On JR East&apos;s JR-EAST Train Reservation site or as a Klook voucher, then you collect the pass in Japan on
            your original non-Japanese passport. What a search answer cannot tell you is your voucher&apos;s collection
            point and its date-change terms — check both on the listing before you nominate your three days.
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            One eligibility detail is worth checking on the listing before you pay, because the two sellers word it
            differently. <strong>JR East</strong> asks only for a non-Japanese passport, with no Temporary Visitor entry
            requirement; <strong>Klook&apos;s listing</strong> states that holders of a Japanese passport or Japanese
            permanent residency are not eligible. If you live in Japan on a foreign passport, that difference decides
            whether to buy from the reseller or from JR East direct — the counter issuing the pass applies its own
            seller&apos;s rule. Checked {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              View the JR Tokyo Wide Pass →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            The eSIM is there for a practical reason rather than a padded one: seat reservations, the JR-EAST Train
            Reservation site and the voucher you have to show all want a working phone the moment you land. Our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              best eSIM for Japan
            </Link>{" "}
            comparison ranks the alternatives on verified prices.
          </p>
        </section>

        {/* Same-trip bookings — added 10 Nov 2026 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Same trip</span>
          <h2 className={styles.sectionTitle}>What Else Should I Book for the Same Trip?</h2>
          <p className={styles.bodyText}>
            The pass is the train. The days at the other end, and the airport leg if your three pass days do not
            cover it, are separate bookings — and on a Kawaguchiko or Nikko day a tour is sometimes simpler than the
            pass plus local buses. Check the listing for your date; prices change by season.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kawaguchikoYamanakakoBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Kawaguchiko Day Tour from Tokyo →
            </KlookLink>
            <KlookLink href={nikkoCulturalDayTourUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Nikko Day Tour from Tokyo →
            </KlookLink>
            <KlookLink href={galaNaebaSkiDayTripTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              GALA Yuzawa Ski Day Trip →
            </KlookLink>
            <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Narita Express (N&apos;EX) Round Trip →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="Seat reservations and your pass voucher both need data on arrival." />

        {/* Seat reservations */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservations</span>
          <h2 className={styles.sectionTitle}>Can I Reserve Seats With the Tokyo Wide Pass?</h2>
          <p className={styles.bodyText}>
            Yes — reserved ordinary-car seats are part of the pass, at no extra charge. The procedure is the bit to get
            right: JR East requires the <strong>seat ticket to be issued before you board</strong>, at a Reserved Seat
            Ticket Vending Machine, a JR Ticket Office (Midori-no-Madoguchi) or a Travel Center. There is no settling it
            with the conductor.
          </p>
          <p className={styles.bodyText}>
            Where it matters most: the <strong>Fuji Excursion</strong>, which has no non-reserved car, and the{" "}
            <strong>Joetsu Shinkansen in ski season</strong>, when the GALA Yuzawa trains fill with day-trippers
            carrying skis. The through limited expresses to Tobu-Nikko — <strong>Nikko, Kinugawa and SPACIA
            Kinugawa</strong> — are also reserved-seat services on this pass, and JR East is clear that only the trains
            running through from JR lines count: a limited express that starts at a Tobu station is not on the pass at
            all.
          </p>
        </section>

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>What Else Do Travellers Ask About the JR Tokyo Wide Pass?</h2>
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
          heading="The Day Trips This Pass Is Bought For"
          intro="The pass covers the train; these listings cover the day at the other end, which is where a coach tour sometimes beats a rail pass outright. Open a listing for the current price on your dates."
          tours={[jrTokyoWidePass, kawaguchikoYamanakakoBusTour, karuizawaShinkansenDayTrip]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 3 Nov 2026: the bigger JR East pass, once Sendai, Niigata or Nagano are on the plan. */}
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
            {/* Added 1 Nov 2026: the destination inside JR East's own worked example for this pass, in full. */}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Get to Gala Yuzawa from Tokyo: Shinkansen & JR Pass</p>
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
            <Link href="/guides/attractions/nikko-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V9l7-5 7 5v12" />
                  <path d="M10 21v-6h4v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nikko Day Trip From Tokyo (2026): Getting There, Costs and Whether to Take a Tour</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Karuizawa Day Trip From Tokyo (2026): Shinkansen Times, the Five Stops and Tour vs DIY</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
                  <path d="M4 11H2v5l2 2h16l2-2v-5H4Z" />
                  <circle cx="7.5" cy="16.5" r="1.5" />
                  <circle cx="16.5" cy="16.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l20-6-7 10-3-4z" />
                  <path d="M12 16l-1 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hakone-free-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h18v10H3z" />
                  <path d="M8 7v10M16 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Free Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Transport Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Three days, and the Kanto map opens up</h2>
            <p className={styles.ctaBannerDesc}>
              {ADULT} for three consecutive days of JR East trains, the Fuji Excursion to Kawaguchiko and the
              shinkansen to Karuizawa included. If one day trip is all you have planned, buy that journey instead.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the JR Tokyo Wide Pass →
              </KlookLink>
              <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View N&apos;EX Round Trip Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
