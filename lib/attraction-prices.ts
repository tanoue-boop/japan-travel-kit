/**
 * Official admission prices for the attractions, parks, passes and sites this site
 * covers — one record per ticket, owned here and read by both the guide that verified
 * it and the summary table at /guides/attractions/japan-attraction-ticket-prices.
 *
 * Added 2026-10-20. The summary table is the reason this module exists: the figures
 * were already in the guides, and copying them into a second page would have created
 * two sets of prices to keep in step, which is exactly how a price table goes stale.
 * So the data moved here and the guides now read their own headline adult/child
 * figures, and their "checked" date, back out of it. Tiers that only the guide shows
 * (high-school rates, annual passports, combo tickets) stay in the guide — they are
 * not duplicated anywhere, so there is nothing to centralise.
 *
 * Rules for every record below:
 *
 * - `adult` and `child` are the operator's own published figures, written exactly as
 *   the guide's price table writes them (including "from", "~" and date ranges, which
 *   are load-bearing: several operators price by date).
 * - `child` is null where the operator publishes no child rate. It is not guessed.
 * - `checked` is the date the figures were read off `source`, carried over from the
 *   guide that read them. Changing a price means changing this date in the same edit.
 * - `klook` names the actual Klook product. Where the only Klook listing is a day tour
 *   rather than the ticket itself, the label says so — a tour is not an admission.
 */
import type { GuideCity } from "./guide-hub";
import {
  arashiyamaNaraTodaijiTour,
  fujiQHighlandQPack,
  hakoneFreepass,
  hiroshimaMiyajimaBusTourUrl,
  kamakuraEnoshimaDayTourUrl,
  mtFujiPass,
  osakaAmazingPassUrl,
  sanrioPurolandTicket,
  shibuyaSkyTicketUrl,
  skytreeTicket,
  teamlabBorderlessTicketUrl,
  teamlabPlanetsTicketUrl,
  tokyoSubwayTicket,
  tokyoTowerTicket,
  warnerBrosStudioTourTokyo,
} from "./klook-links";

/** Whether you have to book before you turn up. */
export type BookingRule = "Required" | "Advised" | "Not needed";

/** Row grouping on the summary table — the same split the Things to Do hub uses. */
export type PriceGroup = "tickets" | "parks" | "passes" | "daytrips";

export type AttractionPrice = {
  /** Venue, park, pass or site, as its operator names it. */
  name: string;
  /** Exactly what the adult and child figures below buy. */
  ticket: string;
  /** The guide on this site that verified these figures. */
  href: string;
  city: GuideCity;
  group: PriceGroup;
  /** Official adult price. */
  adult: string;
  /** Official child price, or null where the operator publishes none. */
  child: string | null;
  /** Who the child price covers — "ages 6–12", "under 5". Null when `child` is null. */
  childAges: string | null;
  /** Price at the door or window, where it differs from the advance price. */
  atDoor?: string;
  booking: BookingRule;
  /** What the booking rule means in practice — the thing that catches visitors out. */
  bookingNote: string;
  /** The operator site these figures were read off. */
  source: string;
  /** ISO date they were read off `source`. */
  checked: string;
  /** Klook listing for this ticket, where one exists. */
  klook: { label: string; url: string } | null;
};

const klook = (label: string, url: string) => ({ label, url });

export const PRICES = {
  // ── Tokyo attraction tickets ──────────────────────────────────────────────
  shibuyaSky: {
    name: "Shibuya Sky",
    ticket: "Rooftop deck, advance online — priced by entry time, before or from 15:00",
    href: "/guides/attractions/shibuya-sky-tickets",
    city: "tokyo",
    group: "tickets",
    // Two bands, one cell: the first figure is a 10:00–14:59 entry and the second a
    // 15:00–21:20 one. Written as a pair rather than a sentence because the four
    // translated editions read this same string through lib/i18n.ts's priceLabel,
    // which passes anything it does not recognise through verbatim.
    adult: "¥2,700 / ¥3,400",
    atDoor: "¥3,000 / ¥3,700",
    child: "¥1,200",
    childAges: "ages 6–12, counter only; preschool free",
    booking: "Advised",
    bookingNote:
      "Online is ¥300 cheaper than the counter and the only way to hold a sunset slot — those sell out, the rest of the day usually does not. A date opens at 00:00 JST two weeks ahead.",
    source: "Shibuya Scramble Square release, 27 Feb 2025",
    // Re-read 28 Oct 2026 and corrected. The flat ¥2,500 / ¥3,000 carried here since
    // 19 Oct 2026 was the pre-April-2025 price: Shibuya Scramble Square's own release of
    // 27 Feb 2025, "SHIBUYA SKY 入場チケットの改定について", put admission from 1 April 2025
    // on two time bands — ¥2,700 for a 10:00–14:59 entry and ¥3,400 for 15:00–21:20 on
    // the web, ¥3,000 and ¥3,700 at the 14th-floor counter — and moved the on-sale moment
    // to 00:00 two weeks before the admission date with free cancellation up to the day.
    // The child figure and the counter-only rule are off the operator's own ticket page.
    checked: "2026-10-28",
    klook: klook("Klook: Shibuya Sky ticket", shibuyaSkyTicketUrl),
  },
  tokyoSkytree: {
    name: "Tokyo Skytree",
    ticket: "Floor 350 observation deck",
    href: "/guides/attractions/tokyo-skytree-tickets",
    city: "tokyo",
    group: "tickets",
    adult: "from ¥1,800",
    child: "from ¥900",
    childAges: "ages 6–14; free under 6",
    booking: "Advised",
    bookingNote: "The same-day counter adds a ¥500 service fee per ticket, so booking ahead is simply cheaper.",
    source: "tokyo-skytree.jp",
    checked: "2026-10-19",
    klook: klook("Klook: TOKYO SKYTREE ticket", skytreeTicket.url),
  },
  tokyoTower: {
    name: "Tokyo Tower",
    ticket: "Main Deck (150 m)",
    href: "/guides/attractions/tokyo-tower-tickets",
    city: "tokyo",
    group: "tickets",
    adult: "¥1,500",
    child: "¥600",
    childAges: "ages 4 and over",
    booking: "Not needed",
    bookingNote:
      "The Main Deck costs the same at the door, and runs to 23:00. Only the ¥3,300 Top Deck Tour is cheaper online, and it is timed.",
    source: "tokyotower.co.jp",
    checked: "2026-10-20",
    klook: klook("Klook: Tokyo Tower Main Observatory ticket", tokyoTowerTicket.url),
  },
  tochoDeck: {
    name: "Tokyo Metropolitan Government Building",
    ticket: "45th-floor observation decks (202 m)",
    href: "/guides/attractions/tokyo-observation-decks",
    city: "tokyo",
    group: "tickets",
    adult: "Free",
    child: "Free",
    childAges: "all ages",
    booking: "Not needed",
    bookingNote: "No ticket of any kind. Hours and which of the two decks is open vary, so check the day before.",
    source: "metro.tokyo.lg.jp",
    checked: "2026-10-19",
    klook: null,
  },
  teamlabPlanets: {
    name: "teamLab Planets TOKYO",
    ticket: "Admission, Toyosu",
    href: "/guides/attractions/teamlab-tokyo-tickets",
    city: "tokyo",
    group: "tickets",
    adult: "from ¥3,800",
    child: "¥1,500",
    childAges: "ages 4–12; free under 4",
    booking: "Required",
    bookingNote:
      "Entry is a 30-minute slot, the official store states that nothing is sold on site, and the adult price moves with the date — so the slot is the booking.",
    source: "official teamLab Planets ticket store (teamlabplanets.dmm.com)",
    // Re-read off the official store's own price table, in both its English and
    // Japanese editions, on 25 October 2026: every tier below was unchanged.
    checked: "2026-10-25",
    klook: klook("Klook: teamLab Planets Toyosu ticket", teamlabPlanetsTicketUrl),
  },
  teamlabBorderless: {
    name: "teamLab Borderless",
    ticket: "Admission, Azabudai Hills",
    href: "/guides/attractions/teamlab-borderless-tickets",
    city: "tokyo",
    group: "tickets",
    adult: "from ¥3,400",
    child: "¥1,500",
    childAges: "ages 4–12; free under 4",
    booking: "Required",
    bookingNote: "Timed slot or a Flexible Pass, and buying on site costs ¥200 more per adult ticket.",
    source: "teamlab.art",
    checked: "2026-10-09",
    klook: klook("Klook: teamLab Borderless admission ticket", teamlabBorderlessTicketUrl),
  },

  // ── Theme parks ───────────────────────────────────────────────────────────
  sanrioPuroland: {
    name: "Sanrio Puroland",
    ticket: "Day Passport",
    href: "/guides/attractions/sanrio-puroland-tickets",
    city: "tokyo",
    group: "parks",
    adult: "¥3,900 – ¥6,900",
    child: "¥2,800 – ¥5,800",
    childAges: "ages 3–17 and seniors 65+; free under 3",
    booking: "Required",
    bookingNote:
      "Priced by date, and the park also wants a separate arrival reservation — two bookings, not one. Shifting the date saves more than shopping for a seller.",
    source: "puroland.jp",
    checked: "2026-10-20",
    klook: klook("Klook: Sanrio Puroland ticket", sanrioPurolandTicket.url),
  },
  fujiQHighland: {
    name: "Fuji-Q Highland",
    ticket: "1-Day Pass (unlimited rides)",
    href: "/guides/attractions/fuji-q-highland-tickets",
    city: "other",
    group: "parks",
    adult: "¥6,000 – ¥7,900",
    child: "¥4,400 – ¥5,100",
    childAges: "elementary school; ¥2,100–¥2,600 for toddlers and seniors",
    booking: "Not needed",
    bookingNote:
      "Park entry is free and ride tickets are sold inside, so the pass is a choice rather than a requirement. The Q Pack bundles it with the round-trip bus from Tokyo.",
    source: "fujiq.jp",
    checked: "2026-10-20",
    klook: klook("Klook: Fuji-Q Highland Q Pack (pass + highway bus)", fujiQHighlandQPack.url),
  },
  wbStudioTour: {
    name: "Warner Bros. Studio Tour Tokyo",
    ticket: "Standard entry",
    href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets",
    city: "tokyo",
    group: "parks",
    adult: "¥6,600~",
    child: "¥4,000~",
    childAges: "child rate; ¥5,500~ for junior",
    booking: "Required",
    bookingNote:
      "Date- and time-specified, and the tour takes about four hours — the time slot decides the rest of your day.",
    source: "wbstudiotour.jp",
    checked: "2026-10-19",
    klook: klook("Klook: Warner Bros. Studio Tour Tokyo ticket", warnerBrosStudioTourTokyo.url),
  },

  // ── Passes ────────────────────────────────────────────────────────────────
  tokyoSubwayTicket: {
    name: "Tokyo Subway Ticket",
    ticket: "24-hour pass (48 h ¥1,500 / 72 h ¥2,000)",
    href: "/guides/attractions/tokyo-subway-ticket",
    city: "tokyo",
    group: "passes",
    adult: "¥1,000",
    child: "¥500",
    childAges: "child rate, half the adult price at every length",
    booking: "Not needed",
    bookingNote:
      "Sold to visitors only, at airports and designated counters. It covers Tokyo Metro and Toei but not JR — including the Yamanote Line.",
    source: "tokyometro.jp",
    checked: "2026-10-19",
    klook: klook("Klook: Tokyo Subway Ticket (24 / 48 / 72 hour)", tokyoSubwayTicket.url),
  },
  osakaAmazingPass: {
    name: "Osaka Amazing Pass",
    ticket: "1-day pass (2-day ¥3,300)",
    href: "/guides/attractions/osaka-attractions-pass",
    city: "osaka",
    group: "passes",
    adult: "¥2,500",
    child: null,
    childAges: null,
    booking: "Not needed",
    bookingNote:
      "Unlimited Osaka Metro and city buses plus 40-plus free admissions. Universal Studios Japan and Kaiyukan are not on it.",
    source: "osp.osaka-info.jp/en",
    checked: "2026-10-19",
    klook: klook("Klook: Osaka Amazing Pass (1-day / 2-day)", osakaAmazingPassUrl),
  },
  hakoneFreepass: {
    name: "Hakone Freepass",
    ticket: "2-day from Shinjuku (3-day ¥7,500)",
    href: "/guides/attractions/hakone-day-trip-from-tokyo",
    city: "tokyo",
    group: "passes",
    adult: "¥7,100",
    child: "¥1,600",
    childAges: "child rate",
    booking: "Not needed",
    bookingNote:
      "Covers eight modes of transport around the loop but not the Romancecar surcharge, and there is no 1-day version.",
    source: "odakyu-global.com",
    checked: "2026-10-19",
    klook: klook("Klook: Hakone Freepass (2-day / 3-day)", hakoneFreepass.url),
  },
  mtFujiPass: {
    name: "Mt. Fuji Pass",
    ticket: "1 day (2 day ¥10,200 / 3 day ¥12,400)",
    href: "/guides/attractions/mt-fuji-day-trip-tokyo",
    city: "other",
    group: "passes",
    adult: "¥7,500",
    child: "¥3,750",
    childAges: "child rate, half the adult price at every length",
    booking: "Not needed",
    bookingNote:
      "Unlimited buses and trains around the Fuji Five Lakes once you are there, with the ropeway and lake cruise included. It does not cover getting out of Tokyo.",
    source: "bus.fujikyu.co.jp/mtpass/en",
    checked: "2026-10-19",
    klook: klook("Klook: Mt. Fuji Pass (1, 2 or 3 day)", mtFujiPass.url),
  },

  // ── Day-trip admissions ───────────────────────────────────────────────────
  todaiji: {
    name: "Todai-ji, Nara",
    ticket: "Daibutsuden (Great Buddha Hall)",
    href: "/guides/attractions/nara-day-trip",
    city: "osaka",
    group: "daytrips",
    adult: "¥800",
    child: "¥400",
    childAges: "ages 6–12",
    booking: "Not needed",
    bookingNote:
      "Walk up and pay at the gate. Nara Park and the deer are free; this is the fee that guided tours differ on including.",
    source: "todaiji.or.jp",
    checked: "2026-10-19",
    klook: klook("Klook: Arashiyama, Kinkaku-ji & Nara Todai-ji day tour", arashiyamaNaraTodaijiTour.url),
  },
  kotokuin: {
    name: "Kotoku-in, Kamakura",
    ticket: "Temple grounds (Great Buddha)",
    href: "/guides/attractions/kamakura-day-trip",
    city: "tokyo",
    group: "daytrips",
    adult: "¥300",
    child: "¥150",
    childAges: "ages 6–12; free under 6",
    booking: "Not needed",
    bookingNote: "Pay at the gate. Stepping inside the bronze statue itself is another ¥50.",
    source: "kotoku-in.jp",
    checked: "2026-10-19",
    klook: klook("Klook: Kamakura & Enoshima day tour", kamakuraEnoshimaDayTourUrl),
  },
  hasedera: {
    name: "Hase-dera, Kamakura",
    ticket: "Temple admission",
    href: "/guides/attractions/kamakura-day-trip",
    city: "tokyo",
    group: "daytrips",
    adult: "¥400",
    child: "¥200",
    childAges: "ages 6–11",
    booking: "Not needed",
    bookingNote: "Pay at the gate. Open 08:00–17:00, later April to June, with last entry 30 minutes before close.",
    source: "hasedera.jp",
    checked: "2026-10-19",
    klook: klook("Klook: Kamakura & Enoshima day tour", kamakuraEnoshimaDayTourUrl),
  },
  itsukushima: {
    name: "Itsukushima Shrine, Miyajima",
    ticket: "Shrine admission",
    href: "/guides/attractions/hiroshima-miyajima-day-trip",
    city: "osaka",
    group: "daytrips",
    adult: "¥300",
    child: "¥100",
    childAges: "elementary and middle school; ¥200 high school",
    booking: "Not needed",
    bookingNote:
      "Pay at the entrance. The famous floating torii is best at high tide, so the tide table matters more than the ticket.",
    source: "itsukushimajinja.jp",
    checked: "2026-10-19",
    klook: klook("Klook: Hiroshima & Miyajima bus tour", hiroshimaMiyajimaBusTourUrl),
  },
  miyajimaRopeway: {
    name: "Miyajima Ropeway",
    ticket: "Round trip to Mt. Misen",
    href: "/guides/attractions/hiroshima-miyajima-day-trip",
    city: "osaka",
    group: "daytrips",
    adult: "¥2,000",
    child: "¥1,000",
    childAges: "ages 6–11",
    booking: "Not needed",
    bookingNote: "Buy at the lower station. It is the single most expensive item on a Miyajima day, and optional.",
    source: "miyajima-ropeway.info",
    checked: "2026-10-19",
    klook: klook("Klook: Hiroshima & Miyajima bus tour", hiroshimaMiyajimaBusTourUrl),
  },
  peaceMuseum: {
    name: "Hiroshima Peace Memorial Museum",
    ticket: "Museum admission",
    href: "/guides/attractions/hiroshima-miyajima-day-trip",
    city: "osaka",
    group: "daytrips",
    adult: "¥200",
    child: "Free",
    childAges: "junior high and younger; ¥100 high school",
    booking: "Not needed",
    bookingNote: "Pay at the entrance. The surrounding Peace Memorial Park and the Dome cost nothing.",
    source: "hpmmuseum.jp",
    checked: "2026-10-19",
    klook: klook("Klook: Hiroshima & Miyajima bus tour", hiroshimaMiyajimaBusTourUrl),
  },
} satisfies Record<string, AttractionPrice>;

/** Every record, in declaration order (tickets, parks, passes, day trips). */
export const attractionPrices: AttractionPrice[] = Object.values(PRICES);

/** Route of the summary table, so llms.txt and the guides agree on one URL. */
export const PRICE_TABLE_ROUTE = "/guides/attractions/japan-attraction-ticket-prices";

/** "2026-10-20" -> "20 October 2026", the form the guides print. */
export function checkedLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
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
  tickets: {
    label: "Attraction tickets",
    desc: "Single-venue admissions in Tokyo — the observation decks and the two teamLab museums.",
  },
  parks: {
    label: "Theme parks and studio tours",
    desc: "Day passports and studio tours, where the price moves with the date you pick.",
  },
  passes: {
    label: "Transport and attraction passes",
    desc: "Multi-ride and multi-entry passes. Worth it only against what the single tickets would cost you.",
  },
  daytrips: {
    label: "Day-trip admissions",
    desc: "The temple, shrine and museum fees on the day trips out of Tokyo and Osaka. All walk-up.",
  },
};

/** Records for one group, in declaration order. */
export function pricesInGroup(group: PriceGroup): AttractionPrice[] {
  return attractionPrices.filter((p) => p.group === group);
}
