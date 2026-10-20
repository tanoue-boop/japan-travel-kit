/**
 * Klook links for the higher-commission Klook categories (eSIM, hotels, tours).
 *
 * The older ticket links on this site use the `affiliate.klook.com/redirect`
 * form with a per-link `aff_adid`; those stay as they are. Klook's affiliate
 * dashboard also accepts a plain Klook page URL with `?aid=` appended, which is
 * the only form available for pages that have no `aff_adid` (hotel search,
 * destination pages, tours we haven't created a tracking link for). Everything
 * here is built that way via `klookLink`.
 *
 * Commission bands from the Klook dashboard (checked 19 Oct 2026): eSIM 20%,
 * tours/activities/hotels 6.5%, passes/transport/WiFi 5%, special activities 2%.
 *
 * Every URL below was taken from a live, search-indexed Klook page — we do not
 * guess destination or city IDs. Prices are deliberately absent: Klook blocks
 * automated reads of its product pages (HTTP 403), so no figure here could be
 * verified, and the copy says "check the current price on Klook" instead.
 */

export const KLOOK_AID = "119070";

/** A Klook page URL with our affiliate id appended — the format Klook documents. */
export function klookLink(pageUrl: string): string {
  return `${pageUrl}${pageUrl.includes("?") ? "&" : "?"}aid=${KLOOK_AID}`;
}

// ---------------------------------------------------------------------------
// eSIM (20%)
// ---------------------------------------------------------------------------

/**
 * Klook's own Japan eSIM listing. `priceVerified: false` is load-bearing — the
 * eSIM comparison pages must not print a price or data allowance for it until
 * the product page can actually be read.
 */
export const klookEsim = {
  name: "Klook Japan eSIM",
  /** Title as the Klook listing itself is named. */
  listingTitle: "Japan eSIM: High-Speed Internet (QR Code Voucher)",
  url: klookLink("https://www.klook.com/en-US/activity/109393-japan-esim-high-speed-internet-qr-code-voucher/"),
  ctaLabel: "Check Klook eSIM prices →",
  /** Set true only once prices and data tiers have been read off the listing. */
  priceVerified: false,
  /** What the price/data columns show while `priceVerified` is false. */
  priceUnknownLabel: "Check on Klook",
  /** The date the listing was last attempted — shown next to the placeholder. */
  checkedAt: "19 Oct 2026",
  note:
    "Klook sells a Japan eSIM of its own, and it is worth a look if you are already booking tickets or transport there — one checkout, one account. We list it unranked: Klook's product page blocks automated price reads, so we have no verified price or data tier to rank it on. Open the listing for the current options.",
} as const;

// ---------------------------------------------------------------------------
// Hotels (6.5%, 7-day cookie)
// ---------------------------------------------------------------------------

export type KlookStayArea = {
  /** Area name, as the surrounding article names it. */
  area: string;
  /** Why the area is convenient — must follow from the routes on the same page. */
  why: string;
  url: string;
};

/** Getting Around Tokyo — areas on the lines that guide covers. */
export const tokyoStayAreas: KlookStayArea[] = [
  {
    area: "Shinjuku",
    why: "On the Yamanote loop and the terminus for the Chuo, Odakyu and Keio lines, so most of west Tokyo is a single ride away.",
    url: klookLink("https://www.klook.com/en-US/destination/p60269837-shinjuku-station/3-hotel/"),
  },
  {
    area: "Tokyo Station / Marunouchi",
    why: "A Yamanote stop and the start of the Tokaido and Tohoku shinkansen — the easiest base if you are taking day trips out of the city.",
    url: klookLink("https://www.klook.com/en-US/destination/p50006601-tokyo-railway-station/3-hotel/"),
  },
  {
    area: "Ueno / Asakusa",
    why: "Ueno is on the Yamanote loop and the Ginza Line runs from there to Asakusa, which puts Senso-ji and Akihabara within a few stops.",
    url: klookLink("https://www.klook.com/en-US/destination/p50214596-ueno/3-hotel/"),
  },
];

/** Getting Around Osaka — the three Midosuji Line hubs that guide names. */
export const osakaStayAreas: KlookStayArea[] = [
  {
    area: "Umeda",
    why: "The northern Midosuji Line hub, joined to Osaka Station; Namba is about 7 minutes and ¥230 down the same line.",
    url: klookLink("https://www.klook.com/en-US/destination/p50050002-umeda-station/3-hotel/"),
  },
  {
    area: "Namba",
    why: "Midosuji Line, plus the Nankai terminus for Kansai Airport, with Dotonbori and Kuromon Market on foot.",
    url: klookLink("https://www.klook.com/en-US/destination/p50043205-namba-station/3-hotel/"),
  },
  {
    area: "Tennoji",
    why: "The southern end of the useful stretch of the Midosuji Line, and a direct JR Haruka stop from Kansai Airport.",
    url: klookLink("https://www.klook.com/en-US/destination/p50039722-tennoji-station/3-hotel/"),
  },
];

/** Getting Around Kyoto — areas keyed to the buses and two subway lines. */
export const kyotoStayAreas: KlookStayArea[] = [
  {
    area: "Kyoto Station",
    why: "Where the 100 and 101 sightseeing bus routes start, on the Karasuma subway line, and the Haruka terminus from Kansai Airport.",
    url: klookLink("https://www.klook.com/en-US/destination/p50006110-kyoto-station/3-hotel/"),
  },
  {
    area: "Karasuma Oike / Shijo",
    why: "The one point where the Karasuma and Tozai subway lines cross, so both halves of the city are reachable without a bus.",
    url: klookLink("https://www.klook.com/en-US/destination/p50017847-karasuma-oike-station/3-hotel/"),
  },
  {
    area: "Gion / Higashiyama",
    why: "Served by the 100 bus from Kyoto Station and the Tozai Line at Sanjo Keihan and Higashiyama — walking distance to Kiyomizudera.",
    url: klookLink("https://www.klook.com/en-US/destination/p50294481-gion/3-hotel/"),
  },
];

/** Tokyo airport transfers — areas ranked by how directly the airport trains reach them. */
export const tokyoAirportStayAreas: KlookStayArea[] = [
  {
    area: "Tokyo Station / Marunouchi",
    why: "The N'EX runs here from Narita in about 60 minutes with no transfer.",
    url: klookLink("https://www.klook.com/en-US/destination/p50006601-tokyo-railway-station/3-hotel/"),
  },
  {
    area: "Shinjuku",
    why: "A direct N'EX stop (about 90 minutes from Narita) and a limousine bus stop; from Haneda it is roughly 37 minutes on the Keikyu Line with one change.",
    url: klookLink("https://www.klook.com/en-US/destination/p60269837-shinjuku-station/3-hotel/"),
  },
  {
    area: "Ueno / Asakusa",
    why: "The Keisei Skyliner reaches Nippori in 41 minutes and Keisei Ueno in about 44, which makes this the fastest-arriving side of the city from Narita.",
    url: klookLink("https://www.klook.com/en-US/destination/p50214596-ueno/3-hotel/"),
  },
];

/** Osaka airport transfers — areas keyed to the Rapi:t and Haruka. */
export const osakaAirportStayAreas: KlookStayArea[] = [
  {
    area: "Namba",
    why: "The Nankai Rapi:t runs here from Kansai Airport in about 40 minutes with no transfer.",
    url: klookLink("https://www.klook.com/en-US/destination/p50043205-namba-station/3-hotel/"),
  },
  {
    area: "Tennoji",
    why: "The first city stop on the JR Haruka, 30 minutes from Kansai Airport and free with a JR Pass.",
    url: klookLink("https://www.klook.com/en-US/destination/p50039722-tennoji-station/3-hotel/"),
  },
  {
    area: "Umeda / Osaka Station",
    why: "Reached on the Haruka via Tennoji or Shin-Osaka, or by limousine bus from either airport — the better base if you are connecting to the shinkansen.",
    url: klookLink("https://www.klook.com/en-US/destination/p50303319-osaka-station-city/3-hotel/"),
  },
];

// ---------------------------------------------------------------------------
// Tours and activities (6.5%)
// ---------------------------------------------------------------------------

export type KlookTour = {
  title: string;
  /** What the listing covers — nothing here claims first-hand experience. */
  desc: string;
  url: string;
};

export const fujiDayTour: KlookTour = {
  title: "Mt. Fuji day tour from Tokyo",
  desc: "A full-day coach run to the Fuji Fifth Station, Lake Kawaguchi and Oshino Hakkai, back in Tokyo the same evening",
  url: klookLink("https://www.klook.com/en-US/activity/10233-mt-fuji-lake-kawaguchi-oshino-hakkai-gotemba-trip-tokyo/"),
};

export const tokyoSightseeingBusTour: KlookTour = {
  title: "Tokyo sightseeing bus day tour",
  desc: "A guided loop of the Imperial Palace gardens, Asakusa and Tokyo Skytree with multilingual audio guidance",
  url: klookLink("https://www.klook.com/en-US/activity/5672-amazing-sightseeing-bus-day-tour-tokyo/"),
};

export const fujiHakoneDayTour: KlookTour = {
  title: "Mt. Fuji & Hakone day tour",
  desc: "The Fuji Fifth Station paired with the Hakone volcanic area and Lake Ashi, as one day trip out of Tokyo",
  url: klookLink("https://www.klook.com/en-US/activity/75806-fuji-hakone-day-tour/"),
};

// ---------------------------------------------------------------------------
// Day tours and tickets for the attractions guides added 19 Oct 2026
//
// Every URL below is a live en-US Klook listing. Klook answers automated
// requests to its product pages with HTTP 403, so each one was confirmed
// through the search index of www.klook.com rather than by reading the page
// directly — which is also why no listing here carries a price.
// ---------------------------------------------------------------------------

export const fujiSubaruLineHakoneBusTour: KlookTour = {
  title: "Fuji Subaru Line 5th Station, Lake Ashi & Hakone bus tour",
  desc: "A join-in coach day tour from Tokyo pairing the Subaru Line Fifth Station with the Lake Ashi cruise",
  url: klookLink("https://www.klook.com/en-US/activity/84103-fuji-subaru-line-5th-station-lake-ashi-hakone-join-one-day-bus-tour-tokyo/"),
};

export const fujiHakoneBulletTrainTour: KlookTour = {
  title: "Mt. Fuji & Hakone tour with bullet-train return",
  desc: "The same Fifth Station and Lake Ashi route, with the option to come back to Tokyo by shinkansen instead of coach",
  url: klookLink("https://www.klook.com/en-US/activity/21108-mt-fuji-lake-ashi-owakudani-tokyo/"),
};

export const hakoneFreepass: KlookTour = {
  title: "Hakone Freepass (2-day / 3-day)",
  desc: "Odakyu's own Hakone pass as a Klook QR voucher — eight transport modes plus discounts around the loop",
  url: klookLink("https://www.klook.com/en-US/activity/821-hakone-transport-day-pass-tokyo/"),
};

export const hakoneLoopBusTour: KlookTour = {
  title: "Hakone Owakudani, Lake Ashi & Hakone Shrine bus tour",
  desc: "A guided coach version of the Hakone loop out of Tokyo, with the ropeway and the pirate-ship cruise included",
  url: klookLink("https://www.klook.com/en-US/activity/87293-hakone-owakudani-lake-ashi-hakone-shrine-bus-tour-tokyo/"),
};

export const hakoneCruiseCableCarTour: KlookTour = {
  title: "Hakone cruise, cable car & Owakudani day tour",
  desc: "Lake Ashi by boat, the cable car over the volcanic valley and an onsen stop, booked as one day out of Tokyo",
  url: klookLink("https://www.klook.com/en-US/activity/38220-ontabi-hakone-da-tour/"),
};

export const skytreeTicket: KlookTour = {
  title: "TOKYO SKYTREE ticket",
  desc: "Timed-entry admission to Floor 350, with the Floor 450 combo available on the same listing",
  url: klookLink("https://www.klook.com/en-US/activity/41352-tokyo-skytree/"),
};

export const skytreeAquariumCombo: KlookTour = {
  title: "Tokyo Skytree + Sumida Aquarium combo ticket",
  desc: "The observation deck bundled with the aquarium in the same Solamachi complex at the tower's base",
  url: klookLink("https://www.klook.com/en-US/activity/59360-tokyo-skytree-sumida-aquarium-combo-ticket/"),
};

export const kyotoNaraArashiyamaTour: KlookTour = {
  title: "Kyoto & Nara day tour: Sagano railway, Nara Park & Fushimi Inari",
  desc: "Departs Osaka and covers Arashiyama, the Sagano scenic railway, Nara Park and the Fushimi Inari torii gates",
  url: klookLink("https://www.klook.com/en-US/activity/110001-kyoto-nara-deer-arashiyama-fushimi-inari-day-tour/"),
};

export const arashiyamaNaraTodaijiTour: KlookTour = {
  title: "Arashiyama, Kinkaku-ji & Nara Todai-ji day tour from Osaka",
  desc: "An English-guided coach day tour taking in Arashiyama, Kinkaku-ji and the Great Buddha Hall at Todai-ji",
  url: klookLink("https://www.klook.com/en-US/activity/3217-arashiyama-nara-todai-ji-day-tour-osaka/"),
};

export const kyotoNaraKiyomizuTour: KlookTour = {
  title: "Kyoto & Nara day trip: Kiyomizu-dera, Fushimi Inari & Nara Park",
  desc: "The temple-and-shrine version of the same day, departing from either Osaka or Kyoto",
  url: klookLink("https://www.klook.com/en-US/activity/87236-kyoto-tour-nara/"),
};

export const kyotoNaraUjiTour: KlookTour = {
  title: "Kyoto, Nara & Uji world-heritage day tour",
  desc: "Adds Uji and Byodo-in to the Nara Park and Fushimi Inari route — three cities in one day out of Osaka",
  url: klookLink("https://www.klook.com/en-US/activity/142440-kyoto-nara-uji-world-heritage-scenic-explore-one-day-tour/"),
};

export const warnerBrosStudioTourTokyo: KlookTour = {
  title: "Warner Bros. Studio Tour Tokyo — The Making of Harry Potter",
  desc: "Date- and time-specified admission to the Toshimaen studio tour, bookable in English on a foreign card",
  url: klookLink("https://www.klook.com/en-US/activity/84374-warner-bros-studio-tour-tokyo-making-harry-potter/"),
};

export const tokyoSubwayTicket: KlookTour = {
  title: "Tokyo Subway Ticket (24 / 48 / 72 hour)",
  desc: "Unlimited rides on all Tokyo Metro and Toei Subway lines, collected on arrival instead of queuing for it",
  url: klookLink("https://www.klook.com/en-US/activity/1552-subway-ticket-tokyo/"),
};

export const subwayCityViewCombo: KlookTour = {
  title: "Tokyo Subway 24-hour Ticket + TOKYO CITY VIEW admission",
  desc: "The 24-hour subway pass bundled with the Roppongi Hills observation deck",
  url: klookLink("https://www.klook.com/en-US/activity/185124-tokyo-subway-24-hour-ticket-tokyo-city-view-admission-ticket/"),
};

export const naritaBusSubwayCombo: KlookTour = {
  title: "Narita Airport bus + Hakone Freepass or Tokyo Subway 24-hour Ticket",
  desc: "An airport limousine bus transfer sold together with either the subway pass or the Hakone Freepass",
  url: klookLink("https://www.klook.com/en-US/activity/177493-narita-airport-limousine-tokyo-subway-pass-the-purpose-of-the-pass-include/"),
};

// ---------------------------------------------------------------------------
// Products for the sixteen attractions guides restored 19 Oct 2026
//
// Most of those pages came back with a working affiliate.klook.com/redirect
// link of their own and kept it. The entries below fill the gaps: the city
// round-ups had no Klook route at all, and mt-fuji-day-trip-tokyo was pointed
// at a Hakone tour, which is not what that page is about.
//
// Same rule as the block above — confirmed through the www.klook.com search
// index on 19 Oct 2026, no prices, because the product pages answer automated
// reads with HTTP 403.
// ---------------------------------------------------------------------------

export const tokyoMtFujiHighwayBus: KlookTour = {
  title: "Tokyo – Mt. Fuji highway bus",
  desc: "The direct coach from Tokyo to Kawaguchiko, Fuji-Q Highland and Fujisan Station, booked as a seat rather than a tour",
  url: klookLink("https://www.klook.com/en-US/activity/159339-tokyo-mtfuji-highway-bus/"),
};

export const mtFujiPass: KlookTour = {
  title: "Mt. Fuji Pass (1, 2 or 3 day)",
  desc: "Unlimited buses and trains around the Fuji Five Lakes, with the ropeway and lake cruise included — the independent traveller's version of a tour",
  url: klookLink("https://www.klook.com/en-US/activity/7719-mt-fuji-pass-tokyo/"),
};

export const fujiPhotographyDayTour: KlookTour = {
  title: "Mt. Fuji scenic photography day tour from Tokyo",
  desc: "Chureito Pagoda, Oishi Park on Lake Kawaguchi and Oshino Hakkai — the viewpoints rather than the Fifth Station",
  url: klookLink("https://www.klook.com/en-US/activity/100747-mount-fuji-arakurayama-park-oshino-hakkai-kawaguchiko-bus-tour-tokyo/"),
};

export const kyotoHighlightBusTour: KlookTour = {
  title: "Kyoto one-day highlight bus tour",
  desc: "Kiyomizu-dera, Kinkaku-ji, Fushimi Inari and the Arashiyama bamboo grove in a single guided day",
  url: klookLink("https://www.klook.com/en-US/activity/94748-arashiyama-kinkakuji-temple-fushimi-inari-taisha-join-one-day-bus-tour/"),
};

export const osakaAmazingPass: KlookTour = {
  title: "Osaka Amazing Pass (1-day / 2-day)",
  desc: "Unlimited Osaka Metro and city buses plus free admission to more than 40 facilities, as a digital pass",
  url: klookLink("https://www.klook.com/en-US/activity/82312-amazing-pass-osaka/"),
};

// ---------------------------------------------------------------------------
// Tickets for the three attractions guides added 20 Oct 2026
//
// Same rule as the blocks above: every URL is a live en-US Klook listing,
// confirmed through the www.klook.com search index on 20 Oct 2026 because Klook
// answers automated reads of its product pages with HTTP 403 — which is also
// why none of these carries a price.
//
// Commission matters for which one goes where. The Q Pack bundles a highway
// bus with the park pass, so it sits in the higher band than a bare admission
// ticket and is the headline CTA on the Fuji-Q page.
// ---------------------------------------------------------------------------

export const tokyoTowerTicket: KlookTour = {
  title: "Tokyo Tower Main Observatory ticket",
  desc: "Admission to the 150 m Main Deck, with the Top Deck Tour upgrade on the same listing",
  url: klookLink("https://www.klook.com/en-US/activity/4911-tokyo-tower-main-observatory-ticket-tokyo/"),
};

export const sanrioPurolandTicket: KlookTour = {
  title: "Sanrio Puroland ticket",
  desc: "A date-specified passport for the indoor Hello Kitty park at Tama Center, bookable in English",
  url: klookLink("https://www.klook.com/en-US/activity/2276-sanrio-puroland-tokyo/"),
};

/** The higher-commission Fuji-Q entry — a transport bundle, not a bare ticket. */
export const fujiQHighlandQPack: KlookTour = {
  title: "Fuji-Q Highland Q Pack — 1-Day Free Pass + highway bus",
  desc: "The unlimited-ride pass bundled with the round-trip highway bus from Shinjuku or Ueno, so the day needs one booking rather than three",
  url: klookLink("https://www.klook.com/en-US/activity/4958-fuji-q-highland-q-pack-tokyo/"),
};

export const fujiQHighlandPass: KlookTour = {
  title: "Fuji-Q Highland 1-Day Free Pass",
  desc: "The pass on its own, for anyone already travelling to Kawaguchiko under their own steam",
  url: klookLink("https://www.klook.com/en-US/activity/592-fuji-q-highland-tokyo/"),
};

export const fujiQHighlandAdmission: KlookTour = {
  title: "Fuji-Q Highland admission ticket",
  desc: "Park entry without the ride pass — the option if you are going for the Mt. Fuji views and the themed areas",
  url: klookLink("https://www.klook.com/en-US/activity/95879-fujiq-highland-admission-ticket/"),
};

// ---------------------------------------------------------------------------
// "Before your trip" slots for the money guides (added 19 Oct 2026)
//
// The money guides are the site's second- and third-most-read pages and had no
// Klook route at all. The two airport-train entries deliberately reuse the
// tracking URLs already on pages/guides/transport/tokyo-airport-transfer.tsx
// (aff_adid 1264853 and 1264854) instead of minting new ones.
//
// Each listing below was confirmed live through the www.klook.com search index
// on 19 Oct 2026; Klook answers automated reads of its product pages with HTTP
// 403, which is why no price appears in any `why` line.
// ---------------------------------------------------------------------------

export type KlookTripPrepItem = {
  /** Product name, as Klook names the listing. */
  label: string;
  /** Why it is relevant to the reader of this particular guide — one sentence. */
  why: string;
  ctaLabel: string;
  url: string;
};

/** N'EX round trip — the same tracking link the Tokyo airport-transfer guide uses. */
export const naritaExpressRoundTripUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264853&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F173165-narita-express-n-ex-round-trip-train-ticket-narita-airport-tokyo%2F";

/** Keisei Skyliner — likewise the existing tracking link, not a new one. */
export const keiseiSkylinerUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264854&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F1410-skyliner-tokyo%2F";

/** The product half of each slot; the `why` sentence is written per guide. */
const tripPrepProducts = {
  esim: {
    label: "Klook Japan eSIM",
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
  },
  naritaExpress: {
    label: "Narita Express (N'EX) round-trip ticket",
    ctaLabel: "Check the N'EX round trip →",
    url: naritaExpressRoundTripUrl,
  },
  skyliner: {
    label: "Keisei Skyliner ticket",
    ctaLabel: "Check the Skyliner ticket →",
    url: keiseiSkylinerUrl,
  },
  subway: {
    label: "Tokyo Subway Ticket (24 / 48 / 72 hour)",
    ctaLabel: "Check the subway ticket →",
    url: tokyoSubwayTicket.url,
  },
} as const;

/** Tax-Free Shopping — the reader is planning or mid-way through a shopping trip. */
export const taxFreeTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Checking whether a shop runs its own tax-free counter, and where in the building it is, is quicker on your own data than on department-store Wi-Fi.",
  },
  {
    ...tripPrepProducts.naritaExpress,
    why: "The N'EX runs from Narita to Tokyo Station, Shinjuku and Shibuya without a transfer, which covers the three busiest tax-free shopping districts.",
  },
  {
    ...tripPrepProducts.subway,
    why: "The large tax-free department stores sit on Tokyo Metro and Toei lines, so a 24, 48 or 72-hour subway ticket covers a day of shop-hopping in one purchase.",
  },
];

/** Currency Exchange — the reader is deciding where to change money. */
export const currencyExchangeTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Checking a counter's rate against the mid-market rate takes seconds online, so it helps to have data before you walk past the first exchange desk in the arrivals hall.",
  },
  {
    ...tripPrepProducts.skyliner,
    why: "If you only want to change a small float at the airport, book the train out in advance — the Skyliner reaches Nippori in 36 minutes and Keisei Ueno in about 41.",
  },
  {
    ...tripPrepProducts.subway,
    why: "A subway ticket bought before you fly is one fare you do not have to cover out of the yen you exchange on arrival.",
  },
];

/** Wise Card — the reader is setting up a card before the trip. */
export const wiseCardTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "A Wise card is managed entirely from the app, so activating a Japan eSIM before you fly keeps balances and freezes reachable the moment you land.",
  },
  {
    ...tripPrepProducts.naritaExpress,
    why: "Booking the Narita to Tokyo round trip ahead of time is one fare settled on the card before departure rather than at a ticket window on arrival.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Foreign contactless cards do not open Tokyo Metro or Toei gates, so a prepaid subway ticket is the simplest way to ride without carrying an IC card balance.",
  },
];

/** Cash vs Card — the reader wants to know what to carry. */
export const cashVsCardTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Most cash-or-card calls come down to checking a place before you go, and that needs data rather than a search for free Wi-Fi.",
  },
  {
    ...tripPrepProducts.naritaExpress,
    why: "Airport train tickets are among the few Japanese transport fares you can pay by card in advance instead of in yen at the counter.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Buying the 24, 48 or 72-hour subway ticket up front settles the transport cost that is hardest to put on a foreign card once you arrive.",
  },
];

/** ATMs in Japan — the reader is planning a first withdrawal. */
export const atmsTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Finding the nearest 7-Bank or Lawson machine is a map lookup, which is easier with your own data than with airport Wi-Fi.",
  },
  {
    ...tripPrepProducts.skyliner,
    why: "If you would rather withdraw in the city than in the terminal, book the train out first — the Skyliner is about 36 minutes to Nippori and 41 to Keisei Ueno.",
  },
  {
    ...tripPrepProducts.subway,
    why: "A prepaid subway ticket means your first withdrawal does not have to cover getting around as well.",
  },
];

/** Tokyo airport transfers — arrival-day add-ons next to the existing transfer links. */
export const tokyoAirportTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Train platforms, bus bays and hotel check-ins all go faster with data already working when you clear customs, rather than after queueing for a SIM counter.",
  },
  {
    ...tripPrepProducts.subway,
    why: "None of the airport tickets above cover travel once you are in the city; the subway ticket does, on all Tokyo Metro and Toei lines, for 24, 48 or 72 hours.",
  },
];
