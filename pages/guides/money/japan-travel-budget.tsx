import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { PRICES, checkedLabel, type AttractionPrice } from "../../../lib/attraction-prices";
import { findPlansForTrip, formatUsd, pricesCheckedLabel } from "../../../lib/esim-prices";
import fares from "../../../data/jr-fares.json";
import {
  budgetDataPrep,
  budgetSightseeingPrep,
  budgetStayAreas,
  budgetTransportPrep,
  klookEsim,
} from "../../../lib/klook-links";

/**
 * Japan travel budget. Rewritten 27 October 2026 to answer "trip to Tokyo Japan
 * cost" and "how much do things cost in Japan" — two Bing queries this page was
 * ranking inside the top ten for and taking no clicks on.
 *
 * The rule the rewrite is built on: every yen figure below is either a published
 * price read off the operator's own site, a figure this site already verified and
 * dated in lib/attraction-prices.ts, a government statistic with its survey
 * period attached, or arithmetic on those — shown, not asserted. Nothing is a
 * "typical" or "average" price we made up, which is what the pages ranking above
 * this one are mostly made of.
 *
 * What was read on 27 October 2026, and where:
 *  - Tokyo Metro adult fares (¥180 ticket / ¥178 IC for 1–6 km, child ¥90 / ¥89),
 *    the ¥700 Tokyo Metro 24-hour Ticket, the ¥1,100 Metro + Toei one-day ticket
 *    and the ¥1,720 Tokyo Combination Ticket, from tokyometro.jp;
 *  - the Tokyo Subway Ticket at ¥1,000 / ¥1,500 / ¥2,000 adult and half that for
 *    a child, from tokyometro.jp;
 *  - 7-Eleven onigiri at ¥145.80 to ¥378 including tax, from sej.co.jp;
 *  - Hidakaya 中華そば at ¥420 including tax, from hidakaya.hiday.co.jp;
 *  - Kourakuen 中華そば at ¥490 including tax, from stores.kourakuen.co.jp;
 *  - Yoshinoya beef bowl (regular) at ¥498 eat-in and ¥489 takeaway including
 *    tax, from yoshinoya.com;
 *  - Kura Sushi's four per-plate store tiers, from ¥110, ¥115, ¥125 and ¥145,
 *    from kurasushi.co.jp;
 *  - Imperial Hotel Tokyo's Nadaman courses — lunch ¥9,000 to ¥15,500, dinner
 *    from ¥28,000, service charge and consumption tax included — from
 *    imperialhotel.co.jp;
 *  - the Tokyo lodging-tax bands and the 3% rate due on 1 April 2027, from
 *    tax.metro.tokyo.lg.jp;
 *  - the Kyoto City lodging-tax bands in force since 1 March 2026, from
 *    city.kyoto.lg.jp;
 *  - the Osaka Prefecture lodging-tax bands in force since 1 September 2026,
 *    from pref.osaka.lg.jp;
 *  - the Japan Tourism Agency's inbound consumption survey for July–September
 *    2026 (1st preliminary): ¥2,207.6 billion in total and ¥234,000 of travel
 *    expenditure per visitor, from mlit.go.jp.
 *
 * Admission prices come from lib/attraction-prices.ts, each carrying the date the
 * operator's own site was read. Shinkansen and airport-train fares come from
 * data/jr-fares.json and are labelled as rounded reference values with their own
 * "as of" — JR East revised its fares on 14 March 2026 and neither JR East nor
 * JR Central publishes a static long-distance fare table. JR Pass prices are the
 * ones our JR Pass guide read off japanrailpass.net on 26 October 2026.
 *
 * Two figures are deliberately absent. No hotel room rate appears anywhere: the
 * only Tokyo, Kyoto and Osaka room prices that exist are live search results, and
 * Klook answers automated reads of its pages with HTTP 403 — so the room is
 * described by the brackets the three local governments themselves draw, and the
 * reader is sent to Klook's own search for the number. And no Klook price appears,
 * for the same reason.
 */

const OWN_ISO = "2026-10-27";
/** The date every operator and government figure on this page was read. */
const OWN = checkedLabel(OWN_ISO);
/** The date our JR Pass guide read the pass prices quoted here. */
const PASS_CHECKED = checkedLabel("2026-10-26");

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;

/** "2026-09" -> "September 2026", for the two reference fares. */
const FARE_AS_OF = new Date(`${fares.asOf}-01T00:00:00Z`).toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const tokyoKyoto = fares.segments.find((s) => s.id === "tokyo-kyoto")!;
const kyotoHiroshima = fares.segments.find((s) => s.id === "kyoto-hiroshima")!;
const tokyoHiroshima = fares.segments.find((s) => s.id === "tokyo-hiroshima")!;
const naritaTokyo = fares.segments.find((s) => s.id === "narita-tokyo")!;

/** Tokyo–Kyoto–Hiroshima–Tokyo on pass-eligible trains: the loop the pass has to beat. */
const GOLDEN_LOOP = tokyoKyoto.fareYen + kyotoHiroshima.fareYen + tokyoHiroshima.fareYen;
const JR_PASS_7_ONLINE = 50000;
const JR_PASS_7_AGENCY = 53000;

/**
 * The cheapest plan on this site that covers a week on 5 GB — read live out of
 * data/esim-prices.json, which scripts/fetch-esim-prices.mjs refreshes daily, so
 * the figure in the table cannot go stale behind the page.
 */
const esimWeek = findPlansForTrip(7, 5)[0] ?? null;
const ESIM_WEEK = esimWeek ? `${formatUsd(esimWeek.priceUsd)} (${esimWeek.provider}, ${esimWeek.name})` : "—";
const ESIM_DAY = esimWeek ? formatUsd(Math.round((esimWeek.priceUsd / 7) * 100) / 100) : "—";

// ---------------------------------------------------------------------------
// Unit prices. Everything below is a published figure; the arithmetic that turns
// them into a daily budget is spelled out in the tables so it can be checked.
// ---------------------------------------------------------------------------

const METRO_TICKET = 180;
const METRO_IC = 178;
const METRO_24H = 700;
const METRO_TOEI_1DAY = 1100;
const TOKYO_COMBINATION = 1720;
const SUBWAY_TICKET_24 = 1000;
const SUBWAY_TICKET_48 = 1500;
const SUBWAY_TICKET_72 = 2000;

const ONIGIRI_LOW = 145.8;
const ONIGIRI_HANDROLLED = 196.56;
const HIDAKAYA_RAMEN = 420;
const KOURAKUEN_RAMEN = 490;
const GYUDON_IN = 498;
const GYUDON_OUT = 489;
const KURA_PLATE_LOW = 110;
const KURA_PLATE_HIGH = 145;
const NADAMAN_LUNCH_LOW = 9000;
const NADAMAN_LUNCH_HIGH = 15500;
const NADAMAN_DINNER = 28000;

/** Food per day, by tier — the components, then the sum. */
const FOOD_SAVE_LOW = ONIGIRI_LOW * 2 + HIDAKAYA_RAMEN + GYUDON_IN; // 1,209.60
const FOOD_SAVE_HIGH = ONIGIRI_HANDROLLED * 2 + HIDAKAYA_RAMEN + GYUDON_IN; // 1,311.12
const FOOD_MID_LOW = ONIGIRI_HANDROLLED * 2 + KOURAKUEN_RAMEN + KURA_PLATE_LOW * 8; // 1,763.12
const FOOD_MID_HIGH = ONIGIRI_HANDROLLED * 2 + KOURAKUEN_RAMEN + KURA_PLATE_HIGH * 8; // 2,043.12
const FOOD_TREAT_LOW = ONIGIRI_HANDROLLED * 2 + NADAMAN_LUNCH_LOW; // 9,393.12
const FOOD_TREAT_HIGH = ONIGIRI_HANDROLLED * 2 + KOURAKUEN_RAMEN + NADAMAN_DINNER; // 28,883.12

/** City transport per day, by tier. */
const TRANSPORT_SAVE_LOW = METRO_IC * 2; // 356
const TRANSPORT_SAVE_HIGH = METRO_IC * 3; // 534
const TRANSPORT_MID_LOW = Math.round(SUBWAY_TICKET_72 / 3); // 667
const TRANSPORT_MID_HIGH = METRO_24H; // 700
const TRANSPORT_TREAT = TOKYO_COMBINATION; // 1,720

/** One paid sight per day, by tier — all three figures are official admissions. */
const SIGHT_SAVE = 0; // the Tokyo Metropolitan Government Building decks are free
const SIGHT_MID_LOW = 1500; // Tokyo Tower Main Deck
const SIGHT_MID_HIGH = 2500; // Shibuya Sky, online
const SIGHT_TREAT = 3800; // teamLab Planets, from

/** Daily totals before the room. */
const DAY_SAVE_LOW = FOOD_SAVE_LOW + TRANSPORT_SAVE_LOW + SIGHT_SAVE;
const DAY_SAVE_HIGH = FOOD_SAVE_HIGH + TRANSPORT_SAVE_HIGH + SIGHT_SAVE;
const DAY_MID_LOW = FOOD_MID_LOW + TRANSPORT_MID_LOW + SIGHT_MID_LOW;
const DAY_MID_HIGH = FOOD_MID_HIGH + TRANSPORT_MID_HIGH + SIGHT_MID_HIGH;
const DAY_TREAT_LOW = FOOD_TREAT_LOW + TRANSPORT_TREAT + SIGHT_TREAT;
const DAY_TREAT_HIGH = FOOD_TREAT_HIGH + TRANSPORT_TREAT + SIGHT_TREAT;

/** Tokyo lodging-tax bands, which are the only official brackets for a room rate. */
const TOKYO_FREE_BAND = 10000;
const TOKYO_MID_BAND_LOW = 10100; // ¥10,000 room + ¥100 tax
const TOKYO_MID_BAND_HIGH = 15100; // just under the next band, + ¥100 tax
const TOKYO_TOP_BAND = 15200; // ¥15,000 room + ¥200 tax

/** Daily figures round to ¥10 and multi-day totals to ¥100 — the sums stay checkable. */
const round10 = (n: number) => Math.round(n / 10) * 10;
const round100 = (n: number) => Math.round(n / 100) * 100;

type TierRow = {
  item: string;
  save: string;
  mid: string;
  treat: string;
  /** Where the figures in this row come from. */
  source: string;
};

/** Requirements (1) and (3): the per-category daily breakdown, three tiers. */
const dailyBreakdown: TierRow[] = [
  {
    item: "Food, three meals",
    save: `${yen(round10(FOOD_SAVE_LOW))}–${yen(round10(FOOD_SAVE_HIGH))} — two onigiri (¥145.80–¥196.56 each), a ¥420 bowl of chuka soba at Hidakaya, a ¥498 Yoshinoya beef bowl`,
    mid: `${yen(round10(FOOD_MID_LOW))}–${yen(round10(FOOD_MID_HIGH))} — ¥393 of onigiri, a ¥490 Kourakuen chuka soba, eight Kura Sushi plates at ¥110–¥145`,
    treat: `${yen(round10(FOOD_TREAT_LOW))}–${yen(round10(FOOD_TREAT_HIGH))} — the same breakfast plus one Imperial Hotel Nadaman course: ¥9,000 at lunch, ¥28,000 at dinner`,
    source: `sej.co.jp, hidakaya.hiday.co.jp, yoshinoya.com, stores.kourakuen.co.jp, kurasushi.co.jp, imperialhotel.co.jp — all read ${OWN}`,
  },
  {
    item: "City transport (Tokyo)",
    save: `${yen(TRANSPORT_SAVE_LOW)}–${yen(TRANSPORT_SAVE_HIGH)} — two or three rides at the ¥178 IC minimum fare`,
    mid: `${yen(TRANSPORT_MID_LOW)}–${yen(TRANSPORT_MID_HIGH)} — a ¥2,000 Tokyo Subway Ticket spread over 72 hours, or the ¥700 Tokyo Metro 24-hour Ticket`,
    treat: `${yen(TRANSPORT_TREAT)} — the Tokyo Combination Ticket, which adds JR, the buses and the trams inside the wards`,
    source: `tokyometro.jp, read ${OWN}`,
  },
  {
    item: "One paid sight",
    save: "¥0 — the Tokyo Metropolitan Government Building observation decks charge nothing and need no ticket",
    mid: `${yen(SIGHT_MID_LOW)}–${yen(SIGHT_MID_HIGH)} — the Tokyo Tower Main Deck at ¥1,500, or Shibuya Sky at ¥2,500 booked online`,
    treat: `${yen(SIGHT_TREAT)}+ — teamLab Planets TOKYO, from ¥3,800 by date`,
    source: `operator sites via our ticket-price table — metro.tokyo.lg.jp ${checkedLabel(PRICES.tochoDeck.checked)}, tokyotower.co.jp ${checkedLabel(PRICES.tokyoTower.checked)}, Shibuya Sky ${checkedLabel(PRICES.shibuyaSky.checked)}, teamLab Planets ${checkedLabel(PRICES.teamlabPlanets.checked)}`,
  },
  {
    item: "Data and connectivity",
    save: `${ESIM_DAY} a day — a 7-day eSIM at ${ESIM_WEEK}, bought in your own currency before you fly`,
    mid: `${ESIM_DAY} a day — the same plan; data is the one line that does not move between tiers`,
    treat: `${ESIM_DAY} a day, plus whatever an airport counter charges if you leave it until you land`,
    source: `our daily eSIM price check, last run ${pricesCheckedLabel()}`,
  },
  {
    item: "The room, per night",
    save: `Under ${yen(TOKYO_FREE_BAND)} — the Tokyo band that pays no lodging tax at all`,
    mid: `${yen(TOKYO_FREE_BAND)}–${yen(15000)} — Tokyo adds ¥100 a night of lodging tax in this band`,
    treat: `${yen(15000)} and over — Tokyo adds ¥200 a night`,
    source: `tax.metro.tokyo.lg.jp, read ${OWN}. We do not quote room rates: the only prices that exist are live search results`,
  },
  {
    item: "Total per day, before the room",
    save: `${yen(round10(DAY_SAVE_LOW))}–${yen(round10(DAY_SAVE_HIGH))}`,
    mid: `${yen(round10(DAY_MID_LOW))}–${yen(round10(DAY_MID_HIGH))}`,
    treat: `${yen(round10(DAY_TREAT_LOW))}–${yen(round10(DAY_TREAT_HIGH))}`,
    source: "The sum of the rows above, excluding the room",
  },
  {
    item: "Total per day, room in its band",
    save: `Under about ${yen(round10(DAY_SAVE_HIGH + TOKYO_FREE_BAND))}`,
    mid: `About ${yen(round10(DAY_MID_LOW + TOKYO_MID_BAND_LOW))}–${yen(round10(DAY_MID_HIGH + TOKYO_MID_BAND_HIGH))}`,
    treat: `From about ${yen(round10(DAY_TREAT_LOW + TOKYO_TOP_BAND))}`,
    source: "The rows above plus a room at the bottom of each Tokyo lodging-tax band, tax included",
  },
];

type TripRow = {
  length: string;
  save: string;
  mid: string;
  treat: string;
  room: string;
};

/** Requirement (2): 3, 7, 10 and 14-day totals. */
const tripTotals: TripRow[] = [3, 7, 10, 14].map((n) => ({
  length: `${n} days / ${n} nights`,
  save: `${yen(round100(DAY_SAVE_LOW * n))}–${yen(round100(DAY_SAVE_HIGH * n))}`,
  mid: `${yen(round100(DAY_MID_LOW * n))}–${yen(round100(DAY_MID_HIGH * n))}`,
  treat: `${yen(round100(DAY_TREAT_LOW * n))}–${yen(round100(DAY_TREAT_HIGH * n))}`,
  room: `Untaxed band: under ${yen(TOKYO_FREE_BAND * n)} · ¥100 band: ${yen(TOKYO_MID_BAND_LOW * n)}–${yen(TOKYO_MID_BAND_HIGH * n)} · ¥200 band: from ${yen(TOKYO_TOP_BAND * n)}`,
}));

/** The headline a search result is asking for: seven nights in Tokyo, all in. */
const WEEK_MID_LOW = round100(DAY_MID_LOW * 7 + TOKYO_MID_BAND_LOW * 7);
const WEEK_MID_HIGH = round100(DAY_MID_HIGH * 7 + TOKYO_MID_BAND_HIGH * 7);
const WEEK_SAVE_CEILING = round100(DAY_SAVE_HIGH * 7 + TOKYO_FREE_BAND * 7);

/** Requirement (4): the quick-reference table. One published price per row. */
const quickPrices = [
  {
    item: "Tokyo subway, shortest ride (1–6 km)",
    price: `${yen(METRO_TICKET)} paper ticket, ${yen(METRO_IC)} on an IC card (child ¥90 / ¥89)`,
    source: `tokyometro.jp, ${OWN}`,
  },
  {
    item: "Tokyo Metro 24-hour Ticket",
    price: yen(METRO_24H),
    source: `tokyometro.jp, ${OWN}`,
  },
  {
    item: "Tokyo Metro + Toei Subway one-day ticket",
    price: `${yen(METRO_TOEI_1DAY)} (child ¥550)`,
    source: `tokyometro.jp, ${OWN}`,
  },
  {
    item: "Tokyo Subway Ticket, 24 / 48 / 72 hour (visitors)",
    price: `${yen(SUBWAY_TICKET_24)} / ${yen(SUBWAY_TICKET_48)} / ${yen(SUBWAY_TICKET_72)}, child half price`,
    source: `tokyometro.jp, ${OWN}`,
  },
  {
    item: "Tokyo Combination Ticket (Metro, Toei, JR, buses, trams)",
    price: `${yen(TOKYO_COMBINATION)} (child ¥860)`,
    source: `tokyometro.jp, ${OWN}`,
  },
  {
    item: "Convenience-store onigiri (7-Eleven)",
    price: "¥145.80 to ¥378 including tax, by filling",
    source: `sej.co.jp, ${OWN}`,
  },
  {
    item: "Ramen at a chain — chuka soba, Hidakaya",
    price: `${yen(HIDAKAYA_RAMEN)} including tax`,
    source: `hidakaya.hiday.co.jp, ${OWN}`,
  },
  {
    item: "Ramen at a chain — chuka soba, Kourakuen",
    price: `${yen(KOURAKUEN_RAMEN)} including tax`,
    source: `stores.kourakuen.co.jp, ${OWN}`,
  },
  {
    item: "Beef bowl (gyudon), Yoshinoya, regular size",
    price: `${yen(GYUDON_IN)} eat-in, ${yen(GYUDON_OUT)} takeaway, including tax`,
    source: `yoshinoya.com, ${OWN}`,
  },
  {
    item: "Conveyor-belt sushi, Kura Sushi",
    price: "From ¥110, ¥115, ¥125 or ¥145 a plate depending on which store tier you are in",
    source: `kurasushi.co.jp, ${OWN}`,
  },
  {
    item: "Hotel restaurant course (Imperial Hotel Tokyo, Nadaman)",
    price: `Lunch ${yen(NADAMAN_LUNCH_LOW)}–${yen(NADAMAN_LUNCH_HIGH)}, dinner from ${yen(NADAMAN_DINNER)}, service charge and tax included`,
    source: `imperialhotel.co.jp, ${OWN}`,
  },
  {
    item: "Tokyo Metropolitan Government Building observation decks",
    price: "Free, and no ticket of any kind",
    source: `${PRICES.tochoDeck.source}, ${checkedLabel(PRICES.tochoDeck.checked)}`,
  },
  {
    item: "Tokyo Tower, Main Deck (150 m)",
    price: `${PRICES.tokyoTower.adult} (child ${PRICES.tokyoTower.child})`,
    source: `${PRICES.tokyoTower.source}, ${checkedLabel(PRICES.tokyoTower.checked)}`,
  },
  {
    item: "Tokyo Skytree, Floor 350",
    price: PRICES.tokyoSkytree.adult,
    source: `${PRICES.tokyoSkytree.source}, ${checkedLabel(PRICES.tokyoSkytree.checked)}`,
  },
  {
    item: "Shibuya Sky",
    price: `${PRICES.shibuyaSky.adult} online, ${PRICES.shibuyaSky.atDoor} at the door`,
    source: `${PRICES.shibuyaSky.source}, ${checkedLabel(PRICES.shibuyaSky.checked)}`,
  },
  {
    item: "teamLab Planets TOKYO",
    price: `${PRICES.teamlabPlanets.adult} (child ${PRICES.teamlabPlanets.child})`,
    source: `${PRICES.teamlabPlanets.source}, ${checkedLabel(PRICES.teamlabPlanets.checked)}`,
  },
  {
    item: "Todai-ji Great Buddha Hall, Nara",
    price: `${PRICES.todaiji.adult} (child ${PRICES.todaiji.child})`,
    source: `${PRICES.todaiji.source}, ${checkedLabel(PRICES.todaiji.checked)}`,
  },
  {
    item: `Shinkansen, Tokyo → Kyoto (${tokyoKyoto.train})`,
    price: `${yen(tokyoKyoto.fareYen)} one way, reserved Ordinary — a rounded reference value`,
    source: `data/jr-fares.json, as of ${FARE_AS_OF}`,
  },
  {
    item: "Narita Express, Narita Airport → Tokyo",
    price: `${yen(naritaTokyo.fareYen)} — a rounded reference value`,
    source: `data/jr-fares.json, as of ${FARE_AS_OF}`,
  },
  {
    item: "Lodging tax, Tokyo, per person per night",
    price: "¥0 under ¥10,000, ¥100 from ¥10,000 to under ¥15,000, ¥200 at ¥15,000 and over",
    source: `tax.metro.tokyo.lg.jp, ${OWN}`,
  },
];

/** Requirement (5): what a pass actually does to the transport line. */
const passMath = [
  {
    pass: "Tokyo Subway Ticket, 72 hour",
    price: yen(SUBWAY_TICKET_72),
    without: `${yen(METRO_IC)} per ride at the IC minimum fare, so ¥2,000 is 11 rides and change`,
    verdict: "Pays for itself on the twelfth ride, and a foreign contactless card will not open a Metro or Toei gate at all. Covers Tokyo Metro and Toei — not JR, so not the Yamanote Line.",
  },
  {
    pass: "Tokyo Metro 24-hour Ticket",
    price: yen(METRO_24H),
    without: `${yen(METRO_IC)} per ride, so ¥700 is three rides and change`,
    verdict: "Pays off on the fourth ride, but only on Tokyo Metro — a Toei line mid-day breaks it.",
  },
  {
    pass: "Tokyo Metro + Toei one-day ticket",
    price: yen(METRO_TOEI_1DAY),
    without: `${yen(METRO_IC)} per ride, so ¥1,100 is six rides and change`,
    verdict: "Pays off on the seventh ride and removes the question of which company runs which line.",
  },
  {
    pass: "Tokyo Combination Ticket",
    price: yen(TOKYO_COMBINATION),
    without: "Both subway operators plus JR inside the wards, the Toei buses and the Arakawa tram, bought separately",
    verdict: "The only one of the four that includes JR, so the only one that covers the Yamanote Line.",
  },
  {
    pass: PRICES.osakaAmazingPass.name,
    price: `${PRICES.osakaAmazingPass.adult} for one day, ¥3,300 for two`,
    without: "Osaka Metro and city-bus fares, plus every admission separately",
    verdict: PRICES.osakaAmazingPass.bookingNote,
  },
  {
    pass: "JAPAN RAIL PASS, 7-day Ordinary",
    price: `${yen(JR_PASS_7_ONLINE)} bought online, ${yen(JR_PASS_7_AGENCY)} as an Exchange Order from an overseas agency`,
    without: `${yen(tokyoKyoto.fareYen)} Tokyo–Kyoto, ${yen(kyotoHiroshima.fareYen)} Kyoto–Hiroshima and ${yen(tokyoHiroshima.fareYen)} Hiroshima–Tokyo add up to ${yen(GOLDEN_LOOP)}`,
    verdict: `Even the full Tokyo–Kyoto–Hiroshima–Tokyo loop on pass-eligible trains comes to ${yen(GOLDEN_LOOP)} — ${yen(JR_PASS_7_ONLINE - GOLDEN_LOOP)} short of the pass. It pays off on itineraries busier than that, not on the Golden Route.`,
  },
];

/** The admission prices worth booking before you go, and what the door costs. */
const bookAhead: AttractionPrice[] = [
  PRICES.shibuyaSky,
  PRICES.tokyoSkytree,
  PRICES.teamlabBorderless,
  PRICES.teamlabPlanets,
  PRICES.tokyoTower,
];

/** Requirement (6): the prepay list, each line with a figure behind it. */
const savingTips = [
  {
    title: "Buy the admission online rather than at the window",
    desc: `This is the one saving with a published number on both sides of it. Shibuya Sky is ${PRICES.shibuyaSky.adult} online against ${PRICES.shibuyaSky.atDoor} at the door; Tokyo Skytree's same-day counter adds a ¥500 service fee per ticket; teamLab Borderless costs ¥200 more per adult bought on site. Figures from the operators' own sites, dates in the table below.`,
  },
  {
    title: "Price the rail pass against your own legs before you buy it",
    desc: `A 7-day Ordinary JR Pass is ${yen(JR_PASS_7_ONLINE)} online and ${yen(JR_PASS_7_AGENCY)} as an Exchange Order from an overseas agency — the same pass, ¥3,000 apart. Then add up what you would actually ride: Tokyo–Kyoto–Hiroshima–Tokyo on pass-eligible trains is ${yen(GOLDEN_LOOP)}, which is less than the pass. Pass prices read on japanrailpass.net on ${PASS_CHECKED}.`,
  },
  {
    title: "Put the city days on one pass, not on single fares",
    desc: `At the ¥178 IC minimum fare, a ¥2,000 72-hour Tokyo Subway Ticket is already ahead on the twelfth ride, and three days of sightseeing rarely stops at eleven. In Osaka the sum is different: the ${PRICES.osakaAmazingPass.adult} Amazing Pass is paid for by the admissions bundled with it rather than by the rides.`,
  },
  {
    title: "Choose the room's tax band, not just the room",
    desc: "Tokyo charges no lodging tax at all below ¥10,000 a night, ¥100 from ¥10,000 to ¥15,000 and ¥200 above it — and from 1 April 2027 it switches to a flat 3% with stays under ¥13,000 untaxed. Osaka exempts anything under ¥5,000. Kyoto taxes every stay, from ¥200. On a two-week trip the gap between the Tokyo and Kyoto bands is real money.",
  },
  {
    title: "Eat where the prices are published",
    desc: `Japan's chains print their prices online, which is why this page can quote them: ¥420 for a bowl of chuka soba at Hidakaya, ¥498 for a Yoshinoya beef bowl, onigiri from ¥145.80 at 7-Eleven, Kura Sushi from ¥110 a plate. Three meals at those prices is ${yen(round10(FOOD_SAVE_LOW))}–${yen(round10(FOOD_SAVE_HIGH))} a day. All read ${OWN}.`,
  },
  {
    title: "Buy the data before you fly, not at the airport",
    desc: `A week of data on 5 GB is ${ESIM_WEEK} on the prices we re-read daily — about ${ESIM_DAY} a day, in your own currency, settled before you land. An arrivals-hall counter prices the same thing in yen at whatever it likes.`,
  },
];

/** Costs that are real, published, and missing from most budgets. */
const hiddenCosts = [
  {
    cost: "Lodging tax, Tokyo",
    detail:
      "Nothing under ¥10,000 per person per night, ¥100 from ¥10,000 to under ¥15,000, ¥200 at ¥15,000 and over. From 1 April 2027 it becomes a flat 3% of the room rate, with stays under ¥13,000 untaxed and minpaku brought into scope.",
    source: `tax.metro.tokyo.lg.jp, ${OWN}`,
  },
  {
    cost: "Lodging tax, Kyoto City",
    detail:
      "Charged on every stay, with no untaxed band: ¥200 under ¥6,000, ¥400 from ¥6,000 to under ¥20,000, ¥1,000 from ¥20,000 to under ¥50,000, ¥4,000 from ¥50,000 to under ¥100,000 and ¥10,000 above that. These rates took effect on 1 March 2026, and the city defines the room rate as the room-only charge before meals and consumption tax.",
    source: `city.kyoto.lg.jp, ${OWN}`,
  },
  {
    cost: "Lodging tax, Osaka Prefecture",
    detail:
      "Nothing under ¥5,000 per person per night, then ¥200 to under ¥15,000, ¥400 to under ¥20,000 and ¥500 at ¥20,000 and over. In force since 1 September 2026; the previous exemption line was ¥7,000.",
    source: `pref.osaka.lg.jp, ${OWN}`,
  },
  {
    cost: "The ATM's own fee on a foreign card",
    detail:
      "Separate from anything your own card charges. Japan Post Bank states that an ATM usage fee of ¥220 including tax per use may apply to certain cards issued abroad; Seven Bank publishes no figure and says only that fees vary by card brand. Few, large withdrawals therefore cost less than many small ones.",
    source: "jp-bank.japanpost.jp and sevenbank.co.jp, read 26 October 2026",
  },
  {
    cost: "Buying the ticket at the venue instead of online",
    detail:
      "Not a tax, but it behaves like one. Shibuya Sky is ¥500 more at the door, Tokyo Skytree's same-day counter adds a ¥500 service fee per ticket, and teamLab Borderless is ¥200 more per adult bought on site.",
    source: "Operator sites, dates in the booking table above",
  },
  {
    cost: "Tipping",
    detail:
      "Not customary in Japan and not expected at restaurants, taxis or hotels. There is no figure to budget for, which is one of the few ways Japan is cheaper than it looks on paper.",
    source: "—",
  },
];

const faqItems = [
  {
    q: "Is the JR Pass worth it for my budget?",
    a: `Only on an itinerary busier than the Golden Route. A 7-day Ordinary JAPAN RAIL PASS is ¥50,000 bought online and ¥53,000 as an Exchange Order from an overseas agency, on the JR Group's own price table read on ${PASS_CHECKED}. Against that, the pass-eligible fares on this page — ¥13,970 Tokyo–Kyoto, ¥11,400 Kyoto–Hiroshima, ¥19,080 Hiroshima–Tokyo — come to ¥44,450 for the whole Tokyo–Kyoto–Hiroshima–Tokyo loop, which is ¥5,550 less than the pass. If your trip is Tokyo plus one or two intercity hops, individual tickets are cheaper; if it adds Kanazawa, Tohoku or Hokkaido, the pass starts to win. Fares are rounded reference values from our own data as of ${FARE_AS_OF}.`,
  },
  {
    q: "Can I save by booking tickets before I go?",
    a: `Yes, and the savings are published rather than estimated. Shibuya Sky is ${PRICES.shibuyaSky.adult} online against ${PRICES.shibuyaSky.atDoor} at the door. Tokyo Skytree's same-day counter adds a ¥500 service fee per ticket, so booking ahead is simply cheaper. teamLab Borderless costs ¥200 more per adult bought on site. A ¥2,000 Tokyo Subway Ticket bought before you fly beats single ¥178 IC fares from the twelfth ride onwards — and foreign contactless cards do not open Tokyo Metro or Toei gates, so it also removes a problem. Dates for each figure are in the tables on this page.`,
  },
  {
    q: "How much is a hotel in Tokyo per night?",
    a: "We will not put a number on it, because the only Tokyo room prices that exist are live search results that change by the date and the district — anyone quoting you a fixed figure has made it up. What is official is where the Tokyo government draws its brackets: no lodging tax at all below ¥10,000 per person per night, ¥100 from ¥10,000 to under ¥15,000, and ¥200 at ¥15,000 and over, read on tax.metro.tokyo.lg.jp on 27 October 2026. Those three bands are the honest way to budget a room — pick the band, then open a hotel search for the area you want and see what it costs on your dates.",
  },
  {
    q: "How much does a trip to Tokyo, Japan cost per day?",
    a: `On published prices, ${yen(round10(DAY_SAVE_LOW))}–${yen(round10(DAY_SAVE_HIGH))} a day before the room at the saving end, ${yen(round10(DAY_MID_LOW))}–${yen(round10(DAY_MID_HIGH))} at a standard level, and ${yen(round10(DAY_TREAT_LOW))}–${yen(round10(DAY_TREAT_HIGH))} if one meal a day is a hotel restaurant course. Those are sums of figures you can check: ¥178 an IC subway ride, ¥420 a bowl of chuka soba, ¥498 a beef bowl, ¥1,500 the Tokyo Tower Main Deck, ¥2,500 Shibuya Sky online. Add the room at its Tokyo lodging-tax band and a standard day is about ${yen(round10(DAY_MID_LOW + TOKYO_MID_BAND_LOW))}–${yen(round10(DAY_MID_HIGH + TOKYO_MID_BAND_HIGH))}.`,
  },
  {
    q: "How much money should I bring to Japan for two weeks?",
    a: `Fourteen days before the room is ${yen(round100(DAY_SAVE_LOW * 14))}–${yen(round100(DAY_SAVE_HIGH * 14))} at the saving tier and ${yen(round100(DAY_MID_LOW * 14))}–${yen(round100(DAY_MID_HIGH * 14))} at a standard one, on the published prices in the tables above. Add fourteen nights of accommodation at the band you choose — under ¥140,000 in Tokyo's untaxed band, ¥141,400–¥211,400 in its ¥100 band — and add long-distance rail separately, because a ¥13,970 Tokyo–Kyoto leg is not a daily cost. For context, the Japan Tourism Agency's own survey put travel expenditure at ¥234,000 per visitor for July–September 2026, which covers a trip of any length rather than a fortnight.`,
  },
  {
    q: "How much does food cost per day in Japan?",
    a: `Three meals at prices the chains publish is ${yen(round10(FOOD_SAVE_LOW))}–${yen(round10(FOOD_SAVE_HIGH))} a day: two 7-Eleven onigiri at ¥145.80–¥196.56 each, a ¥420 bowl of chuka soba at Hidakaya and a ¥498 Yoshinoya beef bowl. Step up a tier and it is ${yen(round10(FOOD_MID_LOW))}–${yen(round10(FOOD_MID_HIGH))} — a ¥490 Kourakuen chuka soba and eight Kura Sushi plates at ¥110–¥145 each. One meal at a hotel restaurant changes the arithmetic entirely: Imperial Hotel Tokyo's Nadaman lists lunch from ¥9,000 and dinner courses at ¥28,000, service and tax included. All read ${OWN}.`,
  },
  {
    q: "Do I have to pay a tourist tax in Japan?",
    a: "There is no national tourist tax on a stay, but Tokyo, Kyoto and Osaka each levy a lodging tax per person per night, and they draw the lines in different places. Tokyo: nothing under ¥10,000, ¥100 to ¥15,000, ¥200 above, switching to a flat 3% on 1 April 2027 with stays under ¥13,000 untaxed. Kyoto City: every stay is taxed, from ¥200 under ¥6,000 up to ¥10,000 at ¥100,000 and over, on rates effective 1 March 2026. Osaka Prefecture: nothing under ¥5,000, then ¥200, ¥400 and ¥500 by band, in force since 1 September 2026. All three read on their own government sites on 27 October 2026. Separately, a ¥1,000 International Tourist Tax is included in the price of your ticket when you leave Japan.",
  },
];

const TITLE = "Japan Travel Budget 2026: Trip to Tokyo Japan Cost & How Much Things Cost";
const META =
  "Japan Travel Budget 2026: trip to Tokyo Japan cost, and how much do things cost in Japan — official subway, ramen, pass and admission prices, with 3 to 14-day totals.";
const ROUTE = "/guides/money/japan-travel-budget";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function JapanTravelBudgetPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={META} />
        <link rel="canonical" href={`https://www.japan-travel-kit.com${ROUTE}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${TITLE} | Japan Travel Kit`} />
        <meta property="og:url" content={`https://www.japan-travel-kit.com${ROUTE}`} />
        <meta property="og:description" content={META} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${TITLE} | Japan Travel Kit`} />
        <meta name="twitter:description" content={META} />
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
              route: ROUTE,
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
                { "@type": "ListItem", position: 1, name: "Home",              item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",            item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money & Payment",   item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Japan Travel Budget", item: `https://www.japan-travel-kit.com${ROUTE}` },
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Japan Travel Budget</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Japan Travel Budget 2026:<br />Trip to Tokyo Japan Cost &amp; How Much Do Things Cost in Japan
          </h1>
          <p className={styles.heroSubtitle}>
            Every yen figure on this page is a published price — an operator&apos;s own fare, an
            official admission, a government tax band — or arithmetic on those, shown rather than
            asserted. Prices read {OWN}.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices only", `Checked ${OWN}`].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Answer first — the paragraph the search result is asking for, before anything else. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>
              On published prices, a day in Tokyo costs {yen(round10(DAY_SAVE_LOW))}–{yen(round10(DAY_SAVE_HIGH))} before
              the room if you eat at the chains and ride the subway on an IC card, about{" "}
              {yen(round10(DAY_MID_LOW))}–{yen(round10(DAY_MID_HIGH))} at a standard level, and{" "}
              {yen(round10(DAY_TREAT_LOW))}–{yen(round10(DAY_TREAT_HIGH))} if one meal a day is a hotel restaurant
              course.
            </strong>{" "}
            Those are sums of figures you can check for yourself: ¥178 an IC subway ride, ¥420 for a bowl of chuka
            soba at Hidakaya, ¥498 for a Yoshinoya beef bowl, ¥1,500 for the Tokyo Tower Main Deck, ¥2,500 for
            Shibuya Sky booked online. The room is the one line we will not put a number on — the only prices that
            exist are live search results — so instead we use the brackets the Tokyo government draws itself: no
            lodging tax at all under ¥10,000 per person per night, ¥100 from ¥10,000 to ¥15,000, ¥200 above it.
          </p>
          <p className={styles.bodyText}>
            Put the two together and <strong>seven nights in Tokyo is roughly {yen(WEEK_MID_LOW)}–{yen(WEEK_MID_HIGH)} all
            in at the standard tier</strong>, or under about {yen(WEEK_SAVE_CEILING)} if the room stays inside the
            untaxed band — before international flights and before any long-distance rail, which is a separate line
            rather than a daily one. For a reality check on all of it: the Japan Tourism Agency&apos;s own inbound
            consumption survey put travel expenditure at <strong>¥234,000 per visitor</strong> for July–September
            2026 (1st preliminary), across a total of ¥2,207.6 billion. Read on mlit.go.jp, {OWN}.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Saving, per day before the room</p>
                <p className={styles.verdictStatValue}>{yen(round10(DAY_SAVE_LOW))}–{yen(round10(DAY_SAVE_HIGH))}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Standard, per day before the room</p>
                <p className={styles.verdictStatValue}>{yen(round10(DAY_MID_LOW))}–{yen(round10(DAY_MID_HIGH))}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tokyo, 7 nights, all in</p>
                <p className={styles.verdictStatValue}>{yen(WEEK_MID_LOW)}–{yen(WEEK_MID_HIGH)}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>The two lines that decide your budget:</strong> the room, and long-distance rail. Everything
              else in Japan is cheaper than its reputation — a subway ride is ¥178, a bowl of ramen at a chain is
              ¥420, and one of Tokyo&apos;s best observation decks costs nothing at all.
            </p>
          </div>
        </div>

        {/* Q1 — "trip to tokyo japan cost", with the trip-length totals. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Trip totals</span>
          <h2 className={styles.sectionTitle}>How much does a trip to Tokyo, Japan cost?</h2>
          <p className={styles.bodyText}>
            Three nights is {yen(round100(DAY_MID_LOW * 3))}–{yen(round100(DAY_MID_HIGH * 3))} before the room at a
            standard level and seven nights is {yen(round100(DAY_MID_LOW * 7))}–{yen(round100(DAY_MID_HIGH * 7))}, on
            the published prices in the next table. The room is added separately, at whichever of Tokyo&apos;s three
            lodging-tax bands you decide to book in — which is the only part of a Japan budget nobody can quote you
            honestly in advance.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip length", "Saving", "Standard", "Treating yourself", "The room, added at its Tokyo tax band"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tripTotals.map((row) => (
                    <tr key={row.length}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.length}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.save}</td>
                      <td style={{ fontWeight: 600, color: "var(--sumi)", whiteSpace: "nowrap" }}>{row.mid}</td>
                      <td style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>{row.treat}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Per person, one night counted per day, and excluding international flights and long-distance rail. The
            three tier columns are the sums of the per-category table below; the room column is the bottom of each
            Tokyo lodging-tax band with the tax added. Every input is a published price read on {OWN} or carried
            from our own dated price records — the sources are in each table.
          </p>
        </section>

        {/* Q2 — "how much should I budget per day", and the per-category breakdown. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Per day, by category</span>
          <h2 className={styles.sectionTitle}>How much should I budget per day in Japan?</h2>
          <p className={styles.bodyText}>
            {yen(round10(DAY_SAVE_LOW))}–{yen(round10(DAY_SAVE_HIGH))} before the room at the saving end and{" "}
            {yen(round10(DAY_MID_LOW))}–{yen(round10(DAY_MID_HIGH))} at a standard one. Here is where each yen of
            that goes, with the component prices in the cell so you can swap any of them for your own plan.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Saving", "Standard", "Treating yourself"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dailyBreakdown.map((row) => (
                    <tr
                      key={row.item}
                      style={row.item.startsWith("Total") ? { fontWeight: 700, background: "var(--paper)" } : {}}
                    >
                      <td className={styles.tdProvider} style={{ minWidth: "160px" }}>
                        {row.item}
                        <span className={styles.tdBestFor} style={{ display: "block", fontWeight: 400 }}>{row.source}</span>
                        {/* The connectivity line is the one row with a product attached to it. */}
                        {row.item.startsWith("Data") && (
                          <a
                            href={klookEsim.url}
                            target="_blank"
                            rel="sponsored noopener"
                            style={{ display: "block", marginTop: "0.35rem", color: "var(--accent)", fontWeight: 600, fontSize: "0.8rem" }}
                          >
                            {klookEsim.ctaLabel}
                          </a>
                        )}
                      </td>
                      <td style={{ fontSize: "0.84rem" }}>{row.save}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.mid}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.treat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Long-distance rail is deliberately not in this table. A {yen(tokyoKyoto.fareYen)} Tokyo–Kyoto leg is a
            one-off, not a daily cost, and spreading it across the days is how budgets end up wrong in both
            directions — see the pass arithmetic further down. The one link in the table goes to Klook&apos;s own
            Japan eSIM listing; no Klook price appears anywhere on this page, because its product pages block
            automated checks.
          </p>
        </section>

        {/* Q3 — "how much do things cost in japan": the quick-reference table. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Quick reference</span>
          <h2 className={styles.sectionTitle}>How much do things cost in Japan?</h2>
          <p className={styles.bodyText}>
            The short version: a subway ride ¥178, a bowl of chuka soba ¥420, a beef bowl ¥498, a convenience-store
            onigiri from ¥145.80, an observation deck ¥1,500–¥2,500 and a shinkansen to Kyoto {yen(tokyoKyoto.fareYen)}.
            Every row below names the site the figure was read off and the date.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "What it costs", "Read off"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {quickPrices.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Chain prices are the national menu prices those companies publish and can change; the two rail fares are
            rounded reference values from our own data, because neither JR East nor JR Central publishes a static
            long-distance fare table and JR East revised its fares on 14 March 2026. For the full admission list see
            our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan attraction ticket prices
            </Link>{" "}
            table.
          </p>
        </section>

        {/* Accommodation — the breakdown, then the 6.5% Klook hotel route. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Accommodation</span>
          <h2 className={styles.sectionTitle}>Accommodation: budget by tax band, not by guesswork</h2>
          <p className={styles.bodyText}>
            The room is the largest line in a Japan budget and the one every other guide invents a figure for. We
            will not: a Tokyo room price is a live search result, and it moves with the date, the district and the
            week. What does not move is where the three local governments draw their own brackets — and because
            those brackets are set at the rates travellers actually pay, they are a better planning tool than an
            invented average.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["City", "Untaxed", "The bands above it", "Read off"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Tokyo</td>
                    <td className={styles.tdPrice}>Under ¥10,000</td>
                    <td style={{ fontSize: "0.86rem" }}>
                      ¥100 from ¥10,000 to under ¥15,000; ¥200 at ¥15,000 and over. From 1 April 2027 a flat 3% of
                      the room rate, with stays under ¥13,000 untaxed and minpaku brought into scope.
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>tax.metro.tokyo.lg.jp, {OWN}</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Kyoto City</td>
                    <td className={styles.tdPrice}>Nothing — every stay is taxed</td>
                    <td style={{ fontSize: "0.86rem" }}>
                      ¥200 under ¥6,000; ¥400 to under ¥20,000; ¥1,000 to under ¥50,000; ¥4,000 to under ¥100,000;
                      ¥10,000 above. Effective 1 March 2026, on the room-only charge before meals and consumption tax.
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>city.kyoto.lg.jp, {OWN}</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Osaka Prefecture</td>
                    <td className={styles.tdPrice}>Under ¥5,000</td>
                    <td style={{ fontSize: "0.86rem" }}>
                      ¥200 to under ¥15,000; ¥400 to under ¥20,000; ¥500 at ¥20,000 and over. In force since
                      1 September 2026 — the previous exemption line was ¥7,000.
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>pref.osaka.lg.jp, {OWN}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Read that table as a planning instruction. In Tokyo, holding the room under ¥10,000 a night removes the
            tax entirely and keeps seven nights under ¥70,000. In Kyoto there is no untaxed option, so the decision
            is only which band — and the jump from ¥400 to ¥1,000 happens at ¥20,000. In Osaka the exemption line
            sits at ¥5,000, which is low enough that most visitor rooms are taxed at ¥200 or more. For the areas
            worth comparing in each city, see{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              where to stay in Tokyo
            </Link>.
          </p>
        </section>

        {/* Klook, 6.5% band — the room line, immediately after the room breakdown. */}
        <KlookStayAreas
          heading="Where to Put the Room So the Rest of the Budget Gets Cheaper"
          intro="A base is a transport decision as much as a room rate: the right station turns a day of fares into a walk, and the wrong one adds two rides to every morning. These are the areas whose position does the most work on a budget trip — the price is whatever Klook's search says on your dates, which is exactly why we do not quote it."
          areas={budgetStayAreas}
        />

        {/* Transport — the breakdown and the pass arithmetic, then the 5% Klook route. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Transport</span>
          <h2 className={styles.sectionTitle}>Transport: what a pass does to the bill</h2>
          <p className={styles.bodyText}>
            City transport in Japan is cheap and long-distance transport is not, which is why they belong in
            different lines of a budget. A Tokyo subway ride starts at ¥180 on a paper ticket and ¥178 on an IC card
            for 1–6 km; a shinkansen to Kyoto is around {yen(tokyoKyoto.fareYen)}. The question worth answering is
            when a pass beats single fares, and that is arithmetic rather than opinion.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price", "The same journeys without it", "When it pays"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passMath.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.without}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Tokyo Metro and Toei ticket prices read on tokyometro.jp, {OWN}. The Osaka Amazing Pass price is from
            {" "}{PRICES.osakaAmazingPass.source}, {checkedLabel(PRICES.osakaAmazingPass.checked)}. JAPAN RAIL PASS
            prices are from the JR Group&apos;s own price table on japanrailpass.net, read {PASS_CHECKED}; the
            shinkansen fares are rounded reference values from our own data as of {FARE_AS_OF}. Work your own route
            through the{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            and its calculator, or read the city pass in detail in the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo Subway Ticket guide
            </Link>.
          </p>
        </section>

        {/* Klook, 5% band — passes, immediately after the transport breakdown. */}
        <KlookTripPrep
          label="Prepay the transport"
          heading="The Transport You Can Settle Before You Fly"
          intro="Three passes, in the order this page argues about them rather than the order anyone wants to sell them. Price each against the fares in the table above: a pass is a saving only when your own route says so."
          items={budgetTransportPrep}
        />

        {/* Food — the breakdown. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Food</span>
          <h2 className={styles.sectionTitle}>Food: the line Japan is cheapest on</h2>
          <p className={styles.bodyText}>
            Japanese chains publish their national prices, which makes food the one part of a Japan budget that can
            be built out of real numbers instead of estimates. Three meals a day at the prices below is{" "}
            {yen(round10(FOOD_SAVE_LOW))}–{yen(round10(FOOD_SAVE_HIGH))} at the bottom and{" "}
            {yen(round10(FOOD_MID_LOW))}–{yen(round10(FOOD_MID_HIGH))} one step up. The ceiling is set by one
            meal, not by all three.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "What", "Published price", "Read off"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>7-Eleven</td>
                    <td style={{ fontSize: "0.86rem" }}>Onigiri and omusubi, by filling</td>
                    <td className={styles.tdPrice}>¥145.80–¥378 incl. tax</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>sej.co.jp, {OWN}</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Hidakaya</td>
                    <td style={{ fontSize: "0.86rem" }}>Chuka soba — the plain bowl of ramen</td>
                    <td className={styles.tdPrice}>{yen(HIDAKAYA_RAMEN)} incl. tax</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>hidakaya.hiday.co.jp, {OWN}</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Kourakuen</td>
                    <td style={{ fontSize: "0.86rem" }}>Chuka soba</td>
                    <td className={styles.tdPrice}>{yen(KOURAKUEN_RAMEN)} incl. tax</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>stores.kourakuen.co.jp, {OWN}</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Yoshinoya</td>
                    <td style={{ fontSize: "0.86rem" }}>Beef bowl, regular size</td>
                    <td className={styles.tdPrice}>{yen(GYUDON_IN)} eat-in / {yen(GYUDON_OUT)} takeaway</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>yoshinoya.com, {OWN}</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Kura Sushi</td>
                    <td style={{ fontSize: "0.86rem" }}>Conveyor-belt sushi, per plate</td>
                    <td className={styles.tdPrice}>From ¥110 / ¥115 / ¥125 / ¥145 by store tier</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>kurasushi.co.jp, {OWN}</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Imperial Hotel Tokyo — Nadaman</td>
                    <td style={{ fontSize: "0.86rem" }}>Japanese courses, service and tax included</td>
                    <td className={styles.tdPrice}>
                      Lunch {yen(NADAMAN_LUNCH_LOW)}–{yen(NADAMAN_LUNCH_HIGH)}; dinner from {yen(NADAMAN_DINNER)}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>imperialhotel.co.jp, {OWN}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The shape of that table is the real answer to &ldquo;is food expensive in Japan&rdquo;. The gap between
            the cheapest bowl of ramen and the most expensive one is about ¥70. The gap between a chain dinner and
            one hotel course is nearly ¥28,000. Japan does not charge you much for eating well; it charges you for
            eating formally — so budget one or two formal meals for the trip and eat the rest at published prices.
          </p>
        </section>

        {/* Sightseeing — the breakdown, then the 6.5% Klook tour route. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Sightseeing</span>
          <h2 className={styles.sectionTitle}>Sightseeing: what the door costs that the website does not</h2>
          <p className={styles.bodyText}>
            Paid attractions are a smaller line than most people expect — Tokyo&apos;s best-value observation deck is
            free, and the paid ones sit between ¥1,500 and ¥3,800. What does cost you is turning up without a
            ticket: three of the five venues below are cheaper, or only available, booked in advance.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Venue", "Adult", "At the door", "Booking", "Read off"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookAhead.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider}>
                        {row.name}
                        <span className={styles.tdBestFor} style={{ display: "block", fontWeight: 400 }}>{row.ticket}</span>
                      </td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.atDoor ?? "Same price"}</td>
                      <td style={{ fontSize: "0.84rem" }}>
                        <strong>{row.booking}.</strong> {row.bookingNote}
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {row.source}, {checkedLabel(row.checked)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The free option is worth saying twice: the Tokyo Metropolitan Government Building&apos;s 45th-floor decks
            are {PRICES.tochoDeck.adult.toLowerCase()} and need no ticket of any kind, 202 m up in Shinjuku. If one
            paid deck is enough for your trip, that is ¥2,500 back in the budget. More on the choice in our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo observation decks guide
            </Link>.
          </p>
        </section>

        {/* Klook, 6.5% band — day trips, immediately after the sightseeing breakdown. */}
        <KlookTripPrep
          label="Prepay the day trips"
          heading="The Days a Budget Cannot Rebuild From Admission Prices"
          intro="A guided day out is the one sightseeing cost you cannot work out from a ticket price, because the coach, the guide and the entries are a single figure with no walk-up equivalent. These three are the days this site's own itineraries lean on."
          items={budgetSightseeingPrep}
        />

        {/* Connectivity — the smallest line, and the one with the 20% Klook route. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Data</span>
          <h2 className={styles.sectionTitle}>Connectivity: the cheapest line, if you buy it first</h2>
          <p className={styles.bodyText}>
            A week of data on 5 GB is {ESIM_WEEK} on the prices we re-read every day — about {ESIM_DAY} a day, which
            makes it the smallest line in this whole budget. It is also the easiest one to overpay for, because the
            alternative is an arrivals-hall counter pricing the same thing in yen after a long flight. Compare the
            plans in our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              best Japan eSIM guide
            </Link>{" "}
            or the{" "}
            <Link href="/guides/esim/cheapest-esim-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              cheapest Japan eSIM
            </Link>{" "}
            round-up. Prices last checked {pricesCheckedLabel()}.
          </p>
        </section>

        <KlookTripPrep
          label="Prepay the data"
          heading="Buy the Data Before You Land"
          intro="One line, highest commission band on this page, and the only product here whose price we genuinely cannot read — Klook blocks automated checks on its own product pages, so open the listing for the current options."
          items={budgetDataPrep}
        />

        {/* Q4 — "how much does a week in Japan cost". */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>A week</span>
          <h2 className={styles.sectionTitle}>How much does a week in Japan cost?</h2>
          <p className={styles.bodyText}>
            Seven nights in Tokyo is roughly <strong>{yen(WEEK_MID_LOW)}–{yen(WEEK_MID_HIGH)}</strong> all in at a
            standard level, and under about <strong>{yen(WEEK_SAVE_CEILING)}</strong> if you stay inside Tokyo&apos;s
            untaxed room band and eat at the chains. Both figures exclude international flights and long-distance
            rail.
          </p>
          <p className={styles.bodyText}>
            Add rail only for the legs you will actually ride. A Tokyo–Kyoto–Osaka week means one{" "}
            {yen(tokyoKyoto.fareYen)} shinkansen leg and one more to get home or to the airport, which is well under
            the {yen(JR_PASS_7_ONLINE)} a 7-day JR Pass costs — the pass is for a busier week than that. If you are
            planning one of those weeks, our{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              5-day Tokyo itinerary
            </Link>{" "}
            and{" "}
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              7-day Tokyo–Kyoto–Osaka itinerary
            </Link>{" "}
            list the bookings each day needs, which is the other half of this arithmetic.
          </p>
        </section>

        {/* Q5 — "is japan expensive for tourists". */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reputation vs prices</span>
          <h2 className={styles.sectionTitle}>Is Japan expensive for tourists in 2026?</h2>
          <p className={styles.bodyText}>
            No, on everything except rooms and long-distance rail — and the published prices on this page are the
            argument. A subway ride is ¥178. A bowl of ramen at a chain is ¥420. A beef bowl is ¥498. One of
            Tokyo&apos;s highest observation decks costs nothing and does not even issue a ticket. Nothing is
            expected as a tip, anywhere.
          </p>
          <p className={styles.bodyText}>
            Where Japan does get expensive, it gets expensive quickly: a formal hotel dinner course is ¥28,000, a
            7-day rail pass is {yen(JR_PASS_7_ONLINE)}, and a central Tokyo room in the top lodging-tax band starts
            at ¥15,000 a night before the ¥200 tax. That is why the budget tiers on this page diverge so sharply at
            the top — the gap between tiers is almost entirely the room and one meal.
          </p>
          <p className={styles.bodyText}>
            For a figure that is nobody&apos;s estimate: the Japan Tourism Agency&apos;s inbound consumption survey
            put travel expenditure at ¥234,000 per visitor for July–September 2026, up 6.1% on the same quarter a
            year earlier, out of ¥2,207.6 billion in total. That is a whole trip of any length, flights excluded —
            and it sits between the standard and treating-yourself columns of the 10-day row above. Read on
            mlit.go.jp, {OWN}.
          </p>
        </section>

        {/* Q6 — "how much yen to bring to japan". */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Cash</span>
          <h2 className={styles.sectionTitle}>How much yen should I bring to Japan?</h2>
          <p className={styles.bodyText}>
            Less than you think, and in fewer withdrawals than you think. The costs on this page split cleanly:
            transport passes, admissions, data and hotels can all be bought online in your own currency before you
            fly, which leaves cash for the chains, the smaller restaurants, the temples and the vending machines —
            the {yen(round10(FOOD_SAVE_LOW))}–{yen(round10(FOOD_MID_HIGH))} food line, in other words, plus a
            margin.
          </p>
          <p className={styles.bodyText}>
            The reason to take cash out rarely and in large amounts is that the Japanese machine&apos;s fee is per
            transaction: Japan Post Bank publishes ¥220 including tax per use, and Seven Bank publishes no figure at
            all. Our{" "}
            <Link href="/guides/money/currency-exchange-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              currency exchange guide
            </Link>{" "}
            covers how much yen to bring and where to change it,{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              ATMs in Japan
            </Link>{" "}
            covers which machines take a foreign card and what they charge, and{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              cash vs card
            </Link>{" "}
            covers where a card still will not work.
          </p>
        </section>

        {/* How to Save — requirement (6), the prepay list. */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Budget tips</span>
          <h2 className={styles.sectionTitle}>How to Spend Less: Six Savings With a Number Behind Them</h2>
          <div className={styles.stepsList}>
            {savingTips.map((tip, i) => (
              <div key={tip.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hidden Costs */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Watch out</span>
          <h2 className={styles.sectionTitle}>Costs Most Japan Budgets Leave Out</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Cost", "What it actually is", "Read off"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hiddenCosts.map((row) => (
                    <tr key={row.cost}>
                      <td className={styles.tdProvider} style={{ minWidth: "160px" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/money/currency-exchange-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h13l-3-3M20 17H7l3 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Currency Exchange in Japan (2026): How Much Yen to Bring &amp; Where to Change It</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="3" width="14" height="13" rx="3" />
                  <line x1="5" y1="10" x2="19" y2="10" />
                  <path d="M8 21l2-4M16 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide (2026): Prices, Coverage and Whether It Pays Off</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V9l9-6 9 6v12" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Tokyo (2026): The Areas Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): Day by Day, With the Bookings</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-10-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 10-Day Itinerary (2026): Tokyo, Kyoto, Osaka and One More City</p>
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
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): Where Cards Work and Where You Need Yen</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                  <line x1="14" y1="15" x2="17" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Card for Japan (2026): Fees and ATM Limits Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/atms-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="7" x2="16" y2="7" />
                  <line x1="8" y1="11" x2="16" y2="11" />
                  <line x1="8" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>ATMs in Japan (2026): Which Accept Foreign Cards &amp; What the Fees Are</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-ski-travel-insurance" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Insurance for Skiing in Japan (2026): Off-Piste, Rescue Costs and What Is Covered</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Money &amp; Payment Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
