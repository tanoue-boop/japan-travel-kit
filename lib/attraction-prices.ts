/**
 * Official admission prices for Japanese attractions, parks, passes and sites — read
 * from data/attraction-prices.json, the single source for the summary table at
 * /guides/attractions/japan-attraction-ticket-prices, the home page count, the CSV at
 * public/data/japan-attraction-prices.csv and every guide that quotes one of these
 * figures (they read PRICES.<id> rather than keeping a copy).
 *
 * History: added 2026-10-20 as a TypeScript table of 19 records. Moved to JSON on
 * 2026-11-11 (task D02) and widened to every ticketed sight the guides cover, so the
 * monthly re-check edits one data file and nothing else. The row logic (summary
 * numbers, change detection, CSV) lives in lib/attraction-prices-core.js so the
 * prebuild CSV writer and the page cannot disagree.
 *
 * Rules for every record in the JSON:
 *
 * - `adult` and `child` are the operator's own published figures, written as the
 *   operator states them (including "from", "~" and ranges, which are load-bearing:
 *   several operators price by date). `adultMinYen` / `adultMaxYen` are the same
 *   figures as numbers, for the summary; null where not published.
 * - Anything the operator does not publish, or that could not be read on its official
 *   page, is null. It is not guessed.
 * - `checked` is the date the figures were read off `sourceUrl`. A record whose page
 *   could not be re-read keeps its last official reading and says so in `note`.
 * - `history` holds earlier readings; `revised` is a fee change the operator itself
 *   announces.
 * - `klook.ref` names an export of lib/klook-links.ts. Where the only Klook listing is a
 *   tour rather than the ticket itself, the label says so — a tour is not an admission.
 */
import type { GuideCity } from "./guide-hub";
import raw from "../data/attraction-prices.json";
import { buildRows, summarize, type PriceRow } from "./attraction-prices-core";
import {
  arashiyamaNaraTodaijiTour,
  asahiyamaZooWinterDayTour,
  churaumiAquariumTicket,
  fujiQHighlandQPack,
  ghibliParkTicket,
  hakoneFreepass,
  hakoneLoopBusTour,
  himejiCastleOsakaBusTour,
  hiroshimaMiyajimaBusTourUrl,
  jigokudaniZenkojiSukiyakiTour,
  kamakuraEnoshimaDayTourUrl,
  kanazawaKenrokuenHigashiChayaDayTour,
  kumamotoCastleTakachihoTour,
  kyotoFushimiInariWalkingTour,
  kyotoHighlightBusTour,
  kyotoNaraUjiTour,
  legolandJapanTicket,
  mtFujiPass,
  naraDayTourUrl,
  nikkoCulturalDayTourUrl,
  osakaAmazingPassUrl,
  osakaAquariumKaiyukanTicket,
  osakaCastleTicket,
  sanrioPurolandTicket,
  sapporoTvTowerMoiwaSetTicket,
  shibuyaSkyTicketUrl,
  shuriCastlePeaceWalkingTour,
  skytreeAquariumCombo,
  skytreeTicket,
  subwayCityViewCombo,
  teamlabBiovortexKyotoTicket,
  teamlabBorderlessTicketUrl,
  teamlabBotanicalGardenOsakaTicket,
  teamlabForestFukuokaTicket,
  teamlabPlanetsTicketUrl,
  tokyoDisneyOneDayPassport,
  tokyoJoypolisPassport,
  tokyoSubwayTicket,
  tokyoTowerTicket,
  umedaSkyBuildingTicket,
  warnerBrosStudioTourTokyo,
} from "./klook-links";

/** Whether you have to book before you turn up. */
export type BookingRule = "Required" | "Advised" | "Not needed";

/** Row grouping on the summary table. */
export type PriceGroup = "views" | "museums" | "parks" | "heritage" | "passes";

type RawRecord = {
  id: string;
  name: string;
  ticket: string;
  area: string;
  city: GuideCity | null;
  group: PriceGroup;
  href: string | null;
  adult: string;
  adultMinYen: number | null;
  adultMaxYen: number | null;
  child: string | null;
  childAges: string | null;
  atDoor: string | null;
  pricing: "fixed" | "variable" | "free";
  booking: BookingRule;
  bookingNote: string;
  sameDay: "Yes" | "No" | "Limited" | null;
  hours: string | null;
  revised: { date: string; note: string } | null;
  source: string;
  sourceUrl: string;
  checked: string;
  note?: string;
  klook: { label: string; ref: string } | null;
  history: { checked: string; adult: string; child?: string | null }[];
};

export type AttractionPrice = Omit<RawRecord, "klook" | "atDoor"> & {
  /** Price at the door or window, where it differs from the advance price. */
  atDoor?: string;
  /** Klook listing for this ticket, where one exists. */
  klook: { label: string; url: string } | null;
};

/** A record that has its own guide on this site — every record the guides quote. */
export type GuidedPrice = AttractionPrice & { href: string };

export type UnpricedAttraction = {
  id: string;
  name: string;
  area: string;
  href: string | null;
  status: "closed" | "unreadable";
  reason: string;
  sourceUrl: string;
  checked: string;
};

type PriceData = { updatePolicy: string; attractions: RawRecord[]; unpriced: UnpricedAttraction[] };
const data = raw as unknown as PriceData;

/** `klook.ref` in the JSON -> the affiliate URL. */
const KLOOK: Record<string, string> = {
  arashiyamaNaraTodaijiTour: arashiyamaNaraTodaijiTour.url,
  asahiyamaZooWinterDayTour: asahiyamaZooWinterDayTour.url,
  churaumiAquariumTicket: churaumiAquariumTicket.url,
  fujiQHighlandQPack: fujiQHighlandQPack.url,
  ghibliParkTicket: ghibliParkTicket.url,
  hakoneFreepass: hakoneFreepass.url,
  hakoneLoopBusTour: hakoneLoopBusTour.url,
  himejiCastleOsakaBusTour: himejiCastleOsakaBusTour.url,
  hiroshimaMiyajimaBusTourUrl,
  jigokudaniZenkojiSukiyakiTour: jigokudaniZenkojiSukiyakiTour.url,
  kamakuraEnoshimaDayTourUrl,
  kanazawaKenrokuenHigashiChayaDayTour: kanazawaKenrokuenHigashiChayaDayTour.url,
  kumamotoCastleTakachihoTour: kumamotoCastleTakachihoTour.url,
  kyotoFushimiInariWalkingTour: kyotoFushimiInariWalkingTour.url,
  kyotoHighlightBusTour: kyotoHighlightBusTour.url,
  kyotoNaraUjiTour: kyotoNaraUjiTour.url,
  legolandJapanTicket: legolandJapanTicket.url,
  mtFujiPass: mtFujiPass.url,
  naraDayTourUrl,
  nikkoCulturalDayTourUrl,
  osakaAmazingPassUrl,
  osakaAquariumKaiyukanTicket: osakaAquariumKaiyukanTicket.url,
  osakaCastleTicket: osakaCastleTicket.url,
  sanrioPurolandTicket: sanrioPurolandTicket.url,
  sapporoTvTowerMoiwaSetTicket: sapporoTvTowerMoiwaSetTicket.url,
  shibuyaSkyTicketUrl,
  shuriCastlePeaceWalkingTour: shuriCastlePeaceWalkingTour.url,
  skytreeAquariumCombo: skytreeAquariumCombo.url,
  skytreeTicket: skytreeTicket.url,
  subwayCityViewCombo: subwayCityViewCombo.url,
  teamlabBiovortexKyotoTicket: teamlabBiovortexKyotoTicket.url,
  teamlabBorderlessTicketUrl,
  teamlabBotanicalGardenOsakaTicket: teamlabBotanicalGardenOsakaTicket.url,
  teamlabForestFukuokaTicket: teamlabForestFukuokaTicket.url,
  teamlabPlanetsTicketUrl,
  tokyoDisneyOneDayPassport: tokyoDisneyOneDayPassport.url,
  tokyoJoypolisPassport: tokyoJoypolisPassport.url,
  tokyoSubwayTicket: tokyoSubwayTicket.url,
  tokyoTowerTicket: tokyoTowerTicket.url,
  umedaSkyBuildingTicket: umedaSkyBuildingTicket.url,
  warnerBrosStudioTourTokyo: warnerBrosStudioTourTokyo.url,
};

function toPrice(r: RawRecord): AttractionPrice {
  const { klook, atDoor, ...rest } = r;
  let link: AttractionPrice["klook"] = null;
  if (klook) {
    const url = KLOOK[klook.ref];
    if (!url) throw new Error(`attraction-prices: unknown klook ref "${klook.ref}" on ${r.id}`);
    link = { label: klook.label, url };
  }
  return { ...rest, ...(atDoor ? { atDoor } : {}), klook: link };
}

/** Every priced record, in file order (grouped by type). */
export const attractionPrices: AttractionPrice[] = data.attractions.map(toPrice);

const BY_ID: Record<string, AttractionPrice> = Object.fromEntries(attractionPrices.map((p) => [p.id, p]));

/** One record by id; throws if the JSON lost it, so a guide can never print undefined. */
export function priceById(id: string): AttractionPrice {
  const p = BY_ID[id];
  if (!p) throw new Error(`attraction-prices: no record "${id}" in data/attraction-prices.json`);
  return p;
}

/** Fields a guide prints without a fallback; asserted non-null at build time. */
type NeededField = "child" | "childAges" | "atDoor";
type With<T, K extends NeededField> = T & { [P in K]-?: NonNullable<AttractionPrice[P]> };

function assertFields(p: AttractionPrice, keys: NeededField[]) {
  for (const k of keys) {
    if (p[k] == null) throw new Error(`attraction-prices: "${p.id}" lost its ${k}, which a guide prints — fix the guide or the JSON`);
  }
}

function guided<K extends NeededField = never>(id: string, ...keys: K[]): With<GuidedPrice, K> {
  const p = priceById(id);
  if (!p.href) throw new Error(`attraction-prices: "${id}" is quoted by a guide but has no href`);
  assertFields(p, keys);
  return p as With<GuidedPrice, K>;
}

/** A guided record that also has a Klook listing — the guides render `klook.url` directly. */
export type SoldPrice = GuidedPrice & { klook: { label: string; url: string } };

function sold<K extends NeededField = never>(id: string, ...keys: K[]): With<SoldPrice, K> {
  const p = guided(id, ...keys);
  if (!p.klook) throw new Error(`attraction-prices: "${id}" is quoted with a Klook link but has none`);
  return p as With<SoldPrice, K>;
}

/** The records the guides quote by name. Every one has its own guide (`href`). */
export const PRICES = {
  shibuyaSky: sold("shibuyaSky", "child", "childAges", "atDoor"),
  tokyoSkytree: sold("tokyoSkytree", "child", "childAges"),
  tokyoTower: sold("tokyoTower", "child", "childAges"),
  tochoDeck: guided("tochoDeck", "child", "childAges"),
  teamlabPlanets: sold("teamlabPlanets", "child", "childAges"),
  teamlabBorderless: sold("teamlabBorderless", "child", "childAges"),
  sanrioPuroland: sold("sanrioPuroland", "child", "childAges"),
  fujiQHighland: sold("fujiQHighland", "child", "childAges"),
  wbStudioTour: sold("wbStudioTour", "child", "childAges"),
  tokyoSubwayTicket: sold("tokyoSubwayTicket", "child", "childAges"),
  osakaAmazingPass: sold("osakaAmazingPass"),
  hakoneFreepass: sold("hakoneFreepass", "child", "childAges"),
  mtFujiPass: sold("mtFujiPass", "child", "childAges"),
  todaiji: sold("todaiji", "child", "childAges"),
  kotokuin: sold("kotokuin", "child", "childAges"),
  hasedera: sold("hasedera", "child", "childAges"),
  itsukushima: sold("itsukushima", "child", "childAges"),
  miyajimaRopeway: sold("miyajimaRopeway", "child", "childAges"),
  peaceMuseum: sold("peaceMuseum", "child", "childAges"),
  tokyoDisney: sold("tokyoDisney", "child", "childAges"),
  tokyoJoypolis: sold("tokyoJoypolis", "child", "childAges"),
};

/**
 * Tokyo prices for the table on things-to-do-tokyo in every edition. Disney and
 * Joypolis now come from the JSON like everything else; the go-kart range is a spread
 * across Street Kart's own price tables and stays owned by pages/guides/attractions/tokyo-go-kart.tsx.
 */
export const TOKYO_GUIDE_PRICES = {
  tokyoDisney: { adult: PRICES.tokyoDisney.adult, checked: PRICES.tokyoDisney.checked },
  tokyoJoypolis: { adult: PRICES.tokyoJoypolis.adult, checked: PRICES.tokyoJoypolis.checked },
  /** Range across Street Kart's own price tables: pages/guides/attractions/tokyo-go-kart.tsx. */
  tokyoGoKart: { adult: "¥5,000 – ¥25,000", checked: "2026-11-07" },
};

/** Attractions checked on their official site but with no price to record — closed, or unreadable. */
export const unpricedAttractions: UnpricedAttraction[] = data.unpriced;

/** The re-check policy, as the page and the CSV notes print it. */
export const PRICE_UPDATE_POLICY: string = data.updatePolicy;

/** Flat rows and summary numbers (median, counts, changes), from lib/attraction-prices-core.js. */
export const priceRows: PriceRow[] = buildRows(raw);
export const priceSummary = summarize(priceRows);

/** Route of the summary table, so llms.txt and the guides agree on one URL. */
export const PRICE_TABLE_ROUTE = "/guides/attractions/japan-attraction-ticket-prices";

/** Download path of the CSV written in prebuild. */
export const PRICE_CSV_PATH = "/data/japan-attraction-prices.csv";

/** "2026-10-20" -> "20 October 2026", the form the guides print. "2025-04" -> "April 2025". */
export function checkedLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d || 1)).toLocaleDateString("en-GB", {
    ...(d ? { day: "numeric" } : {}),
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The most recent check date across every record — the table's own "as of". */
export function latestChecked(): string {
  return attractionPrices.reduce((latest, p) => (p.checked > latest ? p.checked : latest), "0000-00-00");
}

export const PRICE_GROUP_LABELS: Record<PriceGroup, { label: string; desc: string }> = {
  views: {
    label: "Observation decks and towers",
    desc: "Tokyo's decks, plus the towers of Osaka, Kobe, Kyoto and Sapporo. Several now price by time of day.",
  },
  museums: {
    label: "Museums, aquariums, zoos and teamLab",
    desc: "Single-venue admissions, from national museums to the timed-entry teamLab buildings.",
  },
  parks: {
    label: "Theme parks and studio tours",
    desc: "Day passports and studio tours, where the price usually moves with the date you pick.",
  },
  heritage: {
    label: "Temples, shrines, castles and gardens",
    desc: "Walk-up gate fees — the category where most of the 2026 increases landed.",
  },
  passes: {
    label: "Passes and ropeways",
    desc: "Multi-ride passes and the mountain ropeways. Worth it only against what the single tickets would cost you.",
  },
};

/** Records for one group, in file order. */
export function pricesInGroup(group: PriceGroup): AttractionPrice[] {
  return attractionPrices.filter((p) => p.group === group);
}

/**
 * teamLab Planets, as read on teamlab.art/e/planets on 6 Nov 2026. Read by the answer block
 * in every edition and by the JSON-LD, so the table and the markup cannot disagree.
 */
export const PLANETS_FACTS = {
  adultYen: 3800,
  lowYen: 1500,
  highYen: 12000,
  offerCount: 5,
  startDate: "2018-07-07",
  endDate: "2027-12-31",
  opens: "08:00",
  closes: "22:00",
  streetAddress: "6-1-16 Toyosu, Koto-ku",
  postalCode: "135-0061",
} as const;
