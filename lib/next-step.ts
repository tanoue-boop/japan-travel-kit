/**
 * The "next step" cards placed directly under a page's opening answer (task
 * jtk-20261127-A29, 27 Nov 2026).
 *
 * Why: in GA4 for 20–26 Nov 2026, 18 of the most-viewed pages sent no
 * affiliate_click at all. Most of them had their paid links either below a long
 * answer section or as small in-text links, so the reader who had just got the
 * answer saw nothing to do next. These sets put one block of 3–4 tappable cards
 * there, chosen for what that page's reader does next:
 *
 *   - money pages: what to have before landing — Simbye eSIM first, Klook eSIM,
 *     then the airport train (Klook passes-and-transport band, 5%);
 *   - transport and airport pages: the ticket for that leg (5%) and a hotel in the
 *     city it arrives in (6.5%, the HotelStayBlock areas in lib/hotel-stay.ts);
 *   - ticket and sightseeing pages: tours, admissions and hotels in the 6.5% band
 *     that go with the same day — not only the 0–2% park tickets;
 *   - eSIM pages: Simbye first;
 *   - home and hubs: one entry per purpose (eSIM, airport, popular ticket, hotel).
 *
 * Every URL is an existing constant from lib/klook-links.ts, lib/hotel-stay.ts or
 * lib/simbye.ts — no new Klook listing was added, and the Kansai Area Pass
 * listings (Freebie bundle, 0%) and listing 1107 (apparently withdrawn) are left
 * out. No prices: Klook answers automated reads of its product pages with 403, and
 * the Simbye line only repeats the discount lib/simbye.ts documents.
 *
 * Clicks: Klook cards go through components/KlookLink.tsx (page ad id); the
 * Simbye card uses simbyeTrackedUrl. pages/_app.tsx sends affiliate_click for both
 * hosts, with placement="next-step" from the block's data-placement, and
 * product_type esim / hotel / klook from the URL.
 */
import { HOTEL_AREAS, hotelAreaUrl, type HotelAreaKey } from "./hotel-stay";
import {
  arimaHimejiRokkoDayTour,
  arimaKinGinBusPackage,
  fujiHakoneDayTour,
  hanedaLimousineBus,
  jrHarukaUrl,
  jrTokyoWidePass,
  kansaiAirportLimousineBus,
  keiseiSkylinerUrl,
  klookEsim,
  naritaExpressRoundTripUrl,
  nankaiRapitUrl,
  skytreeTicket,
  tokyoDisneyResortHotels,
  tokyoPrivateAirportTransfer,
  tokyoSubwayTicket,
} from "./klook-links";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, simbyeTrackedUrl } from "./simbye";

export type NextStepCard = {
  /** Small line above the title: what kind of thing this is. */
  kind: string;
  title: string;
  /** One line on why this reader needs it next. */
  why: string;
  cta: string;
  href: string;
  /** Pill label for the compact variant (home hero). */
  short?: string;
};

export type NextStepSet = {
  heading: string;
  intro?: string;
  cards: NextStepCard[];
};

/** The placement name in GA4 (data-placement) and in Simbye's utm_campaign. */
export const NEXT_STEP_PLACEMENT = "next-step";

// ---------------------------------------------------------------------------
// Card builders
// ---------------------------------------------------------------------------

const simbye = (pageTag: string, why?: string): NextStepCard => ({
  kind: `eSIM · ${SIMBYE_DISCOUNT_PERCENT}% off with code ${SIMBYE_DISCOUNT_CODE}`,
  title: "Simbye Japan eSIM",
  why:
    why ??
    `Install it at home so maps, train apps and hotel check-in work as you clear customs. The link applies the ${SIMBYE_DISCOUNT_PERCENT}% code to every plan.`,
  cta: "Get Simbye eSIM →",
  href: simbyeTrackedUrl(NEXT_STEP_PLACEMENT, pageTag),
});

const klookEsimCard = (why?: string): NextStepCard => ({
  kind: "eSIM",
  title: "Klook Japan eSIM",
  why: why ?? "SoftBank 5G or IIJ (Docomo) data, booked in the same Klook checkout as your tickets and transfers.",
  cta: "See Klook eSIM plans →",
  href: klookEsim.url,
});

const skyliner = (why?: string): NextStepCard => ({
  kind: "Narita Airport → Tokyo",
  title: "Keisei Skyliner ticket",
  why: why ?? "The fastest train from Narita to Nippori and Ueno, booked before you fly so you go straight to the platform.",
  cta: "Check the Skyliner →",
  href: keiseiSkylinerUrl,
});

const nex = (why?: string): NextStepCard => ({
  kind: "Narita Airport ⇄ Tokyo",
  title: "Narita Express (N'EX) round trip",
  why: why ?? "JR's airport express to Tokyo, Shinjuku and Shibuya, with the ride back to Narita on the same ticket.",
  cta: "Check the N'EX round trip →",
  href: naritaExpressRoundTripUrl,
});

const hanedaBus = (why?: string): NextStepCard => ({
  kind: "Haneda Airport → Tokyo",
  title: "Haneda limousine bus",
  why: why ?? "A coach from Haneda's terminals to Shinjuku, Ikebukuro, the Disney resort and other hotel stops — no train changes with luggage.",
  cta: "Check the Haneda bus →",
  href: hanedaLimousineBus.url,
});

const haruka = (why?: string): NextStepCard => ({
  kind: "Kansai Airport → Osaka / Kyoto",
  title: "JR Haruka airport express",
  why: why ?? "Kansai Airport to Tennoji, Shin-Osaka and Kyoto on one train, as a ticket you book before landing.",
  cta: "Check the Haruka ticket →",
  href: jrHarukaUrl,
});

const rapit = (why?: string): NextStepCard => ({
  kind: "Kansai Airport → Namba",
  title: "Nankai Rapi:t ticket",
  why: why ?? "The limited express from Kansai Airport to Namba, for a hotel in Namba or Shinsaibashi.",
  cta: "Check the Rapi:t ticket →",
  href: nankaiRapitUrl,
});

const hotel = (key: HotelAreaKey, kind: string, why?: string): NextStepCard => {
  const area = HOTEL_AREAS[key];
  return {
    kind,
    title: `Hotels in ${area.name.en}`,
    why: why ?? area.feature.en,
    cta: "See hotels on Klook →",
    href: hotelAreaUrl(area, "en"),
  };
};

const fujiTour = (why?: string): NextStepCard => ({
  kind: "Day tour from Tokyo",
  title: fujiHakoneDayTour.title,
  why: why ?? "Fuji's Fifth Station, Hakone and Lake Ashi in one coach day — it sells by date, so check yours first.",
  cta: "Check the day tour →",
  href: fujiHakoneDayTour.url,
});

const skytree = (why?: string): NextStepCard => ({
  kind: "Tokyo ticket",
  title: skytreeTicket.title,
  why: why ?? skytreeTicket.desc,
  cta: "Check Skytree tickets →",
  href: skytreeTicket.url,
});

/** The money pages share one set: what to have ready before the flight lands. */
const moneySet = (pageTag: string, intro: string): NextStepSet => ({
  heading: "Before you land: data and the airport train",
  intro,
  cards: [
    simbye(pageTag),
    klookEsimCard(),
    skyliner(),
    haruka(),
  ],
});

// ---------------------------------------------------------------------------
// Sets per page path
// ---------------------------------------------------------------------------

export const NEXT_STEP_SETS: Record<string, NextStepSet> = {
  // Home and hubs: one entry per purpose
  "/": {
    heading: "Book first",
    cards: [
      { ...simbye("home"), short: `eSIM: Simbye ${SIMBYE_DISCOUNT_PERCENT}% off →` },
      { ...skyliner(), short: "Airport: Narita Skyliner →" },
      { ...fujiTour(), short: "Ticket: Mt. Fuji day tour →" },
      { ...hotel("shinjuku", "Tokyo hotels"), short: "Hotels: Tokyo (Shinjuku) →" },
    ],
  },
  "/guides": {
    heading: "Book first: data, airport, a day out and a bed",
    cards: [
      simbye("guides"),
      skyliner(),
      fujiTour(),
      hotel("shinjuku", "Tokyo hotels"),
    ],
  },
  "/guides/attractions": {
    heading: "Worth booking before the trip",
    cards: [
      fujiTour(),
      skytree(),
      hotel("shinjuku", "Tokyo hotels"),
      simbye("guides-attractions"),
    ],
  },
  "/guides/transport": {
    heading: "Your first ride, booked from home",
    cards: [
      skyliner(),
      haruka(),
      hotel("shinjuku", "Tokyo hotels"),
      simbye("guides-transport"),
    ],
  },

  // Money pages
  "/guides/money/wise-vs-revolut-japan": moneySet(
    "wise-vs-revolut-japan",
    "Both cards run from an app, so the phone has to be online when you land. These are the two things to sort before the flight.",
  ),
  "/guides/money/contactless-payment-japan": moneySet(
    "contactless-payment-japan",
    "Tapping a phone to pay, and topping up a mobile Suica, need data from the arrivals hall. Then the first fare of the trip is the airport train, which can be booked in advance.",
  ),
  "/guides/money/best-travel-card-japan": moneySet(
    "best-travel-card-japan",
    "Card apps, fraud alerts and 3-D Secure codes all need the phone online in Japan. Sort data and the airport train before you fly.",
  ),
  "/guides/money/atms-in-japan": moneySet(
    "atms-in-japan",
    "You can skip the airport ATM queue if the first ride is already paid and the phone already has data for the map to the nearest 7-Eleven.",
  ),
  "/guides/money/japan-travel-budget": moneySet(
    "japan-travel-budget",
    "Two costs you can lock in before the trip, in your own currency: mobile data and the airport train.",
  ),
  "/guides/money/cash-vs-card-japan": moneySet(
    "cash-vs-card-japan",
    "The less you pay at the airport in cash, the less yen you need on day one. Data and the airport train can both be paid by card before you fly.",
  ),

  // Transport and airport pages
  "/guides/transport/ic-cards-japan": {
    heading: "Before your first tap: the airport leg and the subway",
    intro: "An IC card pays as you go. These are the rides worth buying as tickets instead, plus a base on the lines you will tap most.",
    cards: [
      skyliner("Narita to Ueno on a reserved seat, booked before you fly; the IC card then covers the rides in the city."),
      {
        kind: "Tokyo subway pass",
        title: tokyoSubwayTicket.title,
        why: "Unlimited Tokyo Metro and Toei rides for 24, 48 or 72 hours — cheaper than tapping an IC card if you ride more than a few times a day.",
        cta: "Check the subway ticket →",
        href: tokyoSubwayTicket.url,
      },
      hanedaBus(),
      hotel("shinjuku", "Where to stay in Tokyo"),
    ],
  },
  "/guides/transport/osaka-airport-transfer": {
    heading: "Book the ride and the room for the end of it",
    cards: [
      haruka("Kansai Airport to Tennoji, Shin-Osaka and Kyoto — the pick for Umeda, Shin-Osaka or a Kyoto base."),
      rapit("Kansai Airport to Namba in one ride — the pick for a Namba or Shinsaibashi hotel."),
      {
        kind: "Kansai Airport → hotel stops",
        title: kansaiAirportLimousineBus.title,
        why: "Seat on the coach to Osaka Station, Namba, Kyoto and Universal Studios Japan — no train changes with luggage.",
        cta: "Check the limousine bus →",
        href: kansaiAirportLimousineBus.url,
      },
      hotel("namba", "Where to stay in Osaka"),
    ],
  },
  "/guides/transport/tokyo-wide-pass": {
    heading: "Book the pass, the airport train it covers, and a base",
    cards: [
      {
        kind: "Rail pass",
        title: jrTokyoWidePass.title,
        why: "Three consecutive days of JR East and partner lines around Kanto; exchange it at Narita or Haneda on your passport.",
        cta: "Check the Tokyo Wide Pass →",
        href: jrTokyoWidePass.url,
      },
      nex("If the pass days do not start on arrival day, the N'EX round trip is the separate ticket for the airport legs."),
      fujiTour("If you only want one Fuji day, a coach tour may beat three pass days — compare before you buy."),
      hotel("tokyoStation", "Where to stay in Tokyo", "Tokyo Station is where the shinkansen and most pass trips start, so a room here saves a transfer each pass day."),
    ],
  },

  // Ticket and sightseeing pages
  "/guides/attractions/japan-attraction-ticket-prices": {
    heading: "Book the same trip: tours, tickets and a bed",
    intro: "The table answers what each ticket costs. These are the bookings that usually go with them on the same trip.",
    cards: [
      fujiTour(),
      skytree(),
      hotel("shinjuku", "Tokyo hotels"),
      hotel("namba", "Osaka hotels", "For USJ and the Osaka passes: the Midosuji Line hub, with the Rapi:t from Kansai Airport ending here."),
    ],
  },
  "/guides/attractions/arima-onsen-day-trip": {
    heading: "Book the day: a tour, the bath-and-bus pack, or a night in Arima",
    cards: [
      {
        kind: "Day tour from Osaka",
        title: arimaHimejiRokkoDayTour.title,
        why: "Arima, Himeji Castle and the Mt. Rokko deck in one coach day, so no bus or ropeway timetables to work out.",
        cta: "Check the day tour →",
        href: arimaHimejiRokkoDayTour.url,
      },
      {
        kind: "Bath + bus from Kobe",
        title: arimaKinGinBusPackage.title,
        why: "Both city bathhouses with the non-stop coach from Kobe, valid for three days from the boarding date.",
        cta: "Check the bath and bus pack →",
        href: arimaKinGinBusPackage.url,
      },
      hotel("arima", "Stay overnight", "A ryokan night turns the day trip into dinner and a late soak after the day visitors leave."),
    ],
  },
  "/guides/attractions/tokyo-disney-tickets": {
    heading: "For park day: a bed near the gates and the ride to Maihama",
    intro: "Once the date is fixed, a hotel near the gates and the airport coach are the bookings that save the most time on park day.",
    cards: [
      {
        kind: "Hotels at the resort",
        title: tokyoDisneyResortHotels.title,
        why: "Walk or take the monorail to the gates for opening time instead of riding the JR Keiyo Line in the morning rush.",
        cta: "See resort hotels on Klook →",
        href: tokyoDisneyResortHotels.url,
      },
      hotel("maihama", "Hotels at Maihama Station"),
      hanedaBus("The Haneda limousine bus lists the Disney resort among its destinations — straight from arrivals, no train changes."),
      tokyoPrivateCard(),
    ],
  },

  // eSIM pages
  "/guides/esim/airalo-japan-review": {
    heading: "Before you buy Airalo: the two eSIMs to check",
    cards: [
      simbye(
        "airalo-japan-review",
        `Simbye's Japan plans with ${SIMBYE_DISCOUNT_PERCENT}% off through this link — see the table below for how they compare with Airalo by GB.`,
      ),
      klookEsimCard(),
    ],
  },
  "/guides/esim/japan-esim-iphone": {
    heading: "Get the eSIM you will install",
    cards: [
      simbye(
        "japan-esim-iphone",
        `Scan the QR code or use the iPhone install link at home, then switch it on when you land. The link applies the ${SIMBYE_DISCOUNT_PERCENT}% code.`,
      ),
      klookEsimCard("A QR voucher from Klook, on SoftBank 5G or IIJ (Docomo); install it the same way as the steps below."),
    ],
  },
};

function tokyoPrivateCard(): NextStepCard {
  return {
    kind: "Door to door",
    title: tokyoPrivateAirportTransfer.title,
    why: "A car to your hotel from Haneda or Narita — for a late landing, a family or a lot of luggage.",
    cta: "Check the private transfer →",
    href: tokyoPrivateAirportTransfer.url,
  };
}
