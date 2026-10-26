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
 * eSIM comparison pages must not print a price for it until the product page can
 * actually be read, and they must not rank it against the four providers in
 * data/esim-prices.json, whose prices are re-read daily.
 *
 * The `spec*` fields below were added 22 Oct 2026. Klook still answers automated
 * reads of /activity/109393 with HTTP 403, so they come from the www.klook.com
 * search index for that listing rather than from the page itself — which is why
 * they carry their own `specsCheckedAt` and why none of them is a price. Anything
 * not in that index stays off the comparison pages.
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
  /** The date the `spec*` fields below were confirmed in Klook's search index. */
  specsCheckedAt: "22 Oct 2026",
  /** Carriers the listing names, and which plan family rides which. */
  specNetwork: "SoftBank 5G (per-day plans) / docomo 4G LTE (total-data plans)",
  /** Allowance tiers the listing names. No price attaches to any of them here. */
  specData: "500 MB to 50 GB, plus unlimited (10 GB/day at full speed, then 128 kbps)",
  /** The listing states hotspot and tethering are supported. */
  specTethering: "Supported",
  /** The listing states the service type is data only. */
  specPhoneNumber: "No — data only",
  note:
    "Klook sells a Japan eSIM of its own, and it is worth a look if you are already booking tickets or transport there — one checkout, one account. We list it unranked: Klook's product page blocks automated price reads, so we have no verified price to rank it on. Open the listing for the current options.",
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

/**
 * Where to stay for a five-day Tokyo trip — added 23 Oct 2026 for
 * tokyo-5-day-itinerary.
 *
 * The first three are `tokyoStayAreas` verbatim, so there is one source of truth
 * for those destination ids. Shibuya is the fourth because a five-day plan ends two
 * of its evenings on that side of the loop (the SHIBUYA SKY sunset slot, and the
 * Kawaguchiko highway bus that boards at Shinjuku next door) — and because the
 * three-day plan has no room for a Shibuya base at all. The Shibuya Scramble
 * Crossing hotel search (p50205584) was confirmed as a live en-US page through the
 * www.klook.com search index on 23 Oct 2026; Klook has no `shibuya-station`
 * destination page, which is why the landmark id is the one used.
 */
export const tokyoFiveDayStayAreas: KlookStayArea[] = [
  ...tokyoStayAreas,
  {
    area: "Shibuya",
    why: "On the Yamanote loop one stop from Harajuku and two from Shinjuku, so the sunset deck slot and the early highway bus to Kawaguchiko both start within a few minutes of the door.",
    url: klookLink("https://www.klook.com/en-US/destination/p50205584-shibuya-scramble-crossing/3-hotel/"),
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

/**
 * Where to stay on a Tokyo–Kyoto–Osaka trip, added 25 Oct 2026 for
 * tokyo-kyoto-osaka-7-day-itinerary.
 *
 * No new URLs: every entry reads the destination page out of the three city
 * arrays above (`tokyoStayAreas`, `kyotoStayAreas`, `osakaStayAreas`), so there is
 * still one source of truth per Klook destination id. What is new is the `why`
 * line — on a seven-day trip the base is chosen around the two moving days and the
 * flight out of Kansai, which is a different argument from the one the city
 * transport guides make, so the text is written for this plan rather than reused.
 *
 * Gion is deliberately absent and Tennoji too: two Kyoto nights put a premium on
 * being at the shinkansen end of the city, and one Osaka night on being at the
 * Nankai terminus or the shinkansen hub.
 */
export const tokyoKyotoOsakaStayAreas: KlookStayArea[] = [
  {
    area: "Shinjuku, Tokyo",
    why: "The Yamanote stop that is also the Chuo, Odakyu and Keio terminus, a direct Narita Express stop and a limousine bus stop — so the arrival day and the west-Tokyo day both start at the door.",
    url: tokyoStayAreas[0].url,
  },
  {
    area: "Tokyo Station / Marunouchi, Tokyo",
    why: "The base that costs you least on a seven-day trip: the Tokaido Shinkansen to Kyoto leaves from under it, so the Day 4 move is a lift rather than a cross-city journey with luggage.",
    url: tokyoStayAreas[1].url,
  },
  {
    area: "Ueno / Asakusa, Tokyo",
    why: "Ueno is on the Yamanote loop with the Ginza Line running to Asakusa, which is the whole of the east-Tokyo day — and the Keisei Skyliner from Narita arrives here faster than anywhere else in the city.",
    url: tokyoStayAreas[2].url,
  },
  {
    area: "Kyoto Station, Kyoto",
    why: "Where the shinkansen puts you down on Day 4 and where the 100 and 101 sightseeing buses start, so neither Kyoto morning begins with a transfer — and the airport Haruka leaves from the same platforms.",
    url: kyotoStayAreas[0].url,
  },
  {
    area: "Shijo-Kawaramachi / Karasuma, Kyoto",
    why: "The one point the Karasuma and Tozai subway lines cross, with Pontocho, Nishiki Market and the Hankyu and Keihan lines to Osaka all on foot — the better base if you want the evenings as well as the temples.",
    url: kyotoStayAreas[1].url,
  },
  {
    area: "Namba, Osaka",
    why: "Midosuji Line, Dotonbori and Kuromon Market on foot, and the Nankai terminus — which means the Day 7 run to Kansai Airport starts under your hotel rather than after a change with the cases.",
    url: osakaStayAreas[1].url,
  },
  {
    area: "Umeda, Osaka",
    why: "The northern Midosuji hub, joined to Osaka Station: the stop to pick if you arrive from Kyoto by JR or Hankyu, or if you are connecting back to the shinkansen rather than flying out of Kansai.",
    url: osakaStayAreas[0].url,
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
// Kawaguchiko day-trip tours added 21 Oct 2026
//
// For the Kawaguchiko-specific day trip guide. Klook answers automated reads of
// its product pages with HTTP 403, so both were confirmed live and on sale
// through the www.klook.com search index on 21 Oct 2026 — and that, again, is
// why neither carries a price.
//
// `fujiPhotographyDayTour` (listing 100747) is the third tour that guide uses
// and is declared further up, because mt-fuji-day-trip-tokyo already links it.
// ---------------------------------------------------------------------------

export const kawaguchikoYamanakakoBusTour: KlookTour = {
  title: "Lake Kawaguchi & Lake Yamanaka onsen day bus tour from Tokyo",
  desc: "A join-in coach day listed at 9.5–11 hours, pairing Arakurayama Sengen Park and Oishi Park with a Yamanakako cruise or hot spring",
  url: klookLink("https://www.klook.com/en-US/activity/86922-kawaguchiko-yamanakako-hot-spring-join-one-day-bus-tour-tokyo/"),
};

export const kawaguchikoPrivateDayTour: KlookTour = {
  title: "Lake Kawaguchi customised private day tour from Tokyo",
  desc: "A private, English-guided day on the north shore built around what you pick — the version for anyone who wants Kawaguchiko without a coach timetable",
  url: klookLink("https://www.klook.com/en-US/activity/44596-kawaguchiko-private-day-tour-tokyo/"),
};

// ---------------------------------------------------------------------------
// Tokyo experiences added 21 Oct 2026 — bay cruises, Tsukiji food tours and
// Asakusa kimono rental
//
// Three entry guides, all in the 6.5% tours-and-activities band. Klook answers
// automated reads of its product pages with HTTP 403, so every listing below was
// confirmed live and on sale through the www.klook.com search index on
// 21 Oct 2026 — and that is why none of them carries a price.
//
// The `desc` lines repeat only what the listing itself states (duration,
// boarding point, what is included). Nothing here is first-hand.
// ---------------------------------------------------------------------------

/** The Symphony — the large cruising restaurant out of Hinode Pier. */
export const tokyoBayDinnerCruiseSymphony: KlookTour = {
  title: "Tokyo Bay dinner cruise aboard the Symphony",
  desc: "The large cruising restaurant from Hinode Pier, listed at 2 hours 30 minutes with a full-course meal and the Rainbow Bridge loop",
  url: klookLink("https://www.klook.com/en-US/activity/616-tokyo-dinner-cruise/"),
};

/** Yakatabune with a dinner show — the shorter of the two houseboat listings. */
export const tokyoBayYakatabuneDinnerShow: KlookTour = {
  title: "Tokyo Bay yakatabune dinner cruise with a show",
  desc: "A traditional low-slung houseboat listed at 1 hour 30 minutes, with sukiyaki, free-flowing soft drinks and an open deck off Odaiba",
  url: klookLink("https://www.klook.com/en-US/activity/106435-yakatabune-house-boat-night-tour-tokyo-bay-dinner-show/"),
};

/** The longer yakatabune evening — the one with the full dinner-and-drinks format. */
export const tokyoBayYakatabuneDinnerCruise: KlookTour = {
  title: "Tokyo Bay yakatabune dinner cruise",
  desc: "The full houseboat evening, listed at 2 hours 30 minutes, with dinner options, free-flowing drinks and views of Rainbow Bridge and Tokyo Tower",
  url: klookLink("https://www.klook.com/en-US/activity/38414-tokyo-bay-yakatabune-dinner-cruise/"),
};

/** The small-boat daytime and sunset option — no meal, one hour. */
export const tokyoBaySunsetBoatCruise: KlookTour = {
  title: "Tokyo Bay daytime and sunset boat cruise",
  desc: "A one-hour small-boat cruise from Shibaura with a guide on board — the no-dinner version of a bay cruise",
  url: klookLink("https://www.klook.com/en-US/activity/156402-tokyo-day-time-and-sunset-boat-cruise/"),
};

/** Tsukiji Outer Market food and culture tour, with a sit-down sushi stop. */
export const tsukijiCultureFoodTour: KlookTour = {
  title: "Tsukiji culture and food tour",
  desc: "A guided walk of the Tsukiji Outer Market with tastings and a sit-down sushi stop, led in English, Chinese or Spanish",
  url: klookLink("https://www.klook.com/en-US/activity/95949-tsukiji-culture-food-tour-tokyo-tokyo/"),
};

/** The short street-food version — two hours, meets at Tsukiji Hongwanji. */
export const tsukijiStreetFoodTour: KlookTour = {
  title: "Tsukiji fish market street food tour",
  desc: "A two-hour small-group walk from Tsukiji Hongwanji temple into the outer market, tasting skewers, tamagoyaki, sushi and wagyu",
  url: klookLink("https://www.klook.com/en-US/activity/188797-tokyo-tsukiji-fish-market-street-food-tour/"),
};

/** Three hours with a morning or late-morning departure. */
export const tsukijiFoodCultureWalkingTour: KlookTour = {
  title: "Tsukiji fish market food and culture walking tour",
  desc: "Listed at three hours with 08:30 and 11:00 departures from Tsukiji Hongan-ji, in a small English-guided group",
  url: klookLink("https://www.klook.com/en-US/activity/158354-tokyo-tsukiji-fish-market-food-and-culture-walking-tour/"),
};

/** The half-day food-and-drink format, with five tastings. */
export const tsukijiFoodDrinkHalfDayTour: KlookTour = {
  title: "Tsukiji fish market food and drink half-day tour",
  desc: "The half-day version, listed with five tastings — wagyu, sushi, tamagoyaki and fruit — and a local guide on the market's history",
  url: klookLink("https://www.klook.com/en-US/activity/9077-tsukiji-fish-market-food-drink-half-day-tour/"),
};

/** Kimono Yae, by Kaminarimon — the listing that states a 17:30 return. */
export const asakusaKimonoYae: KlookTour = {
  title: "Kimono Yae rental, Asakusa",
  desc: "A shop by Kaminarimon with over 500 kimono and yukata and English, Chinese and Korean-speaking staff; the listing asks for the outfit back by 17:30 the same day",
  url: klookLink("https://www.klook.com/en-US/activity/13746-kimono-rental-experience-asakusa/"),
};

/** Aiwafuku's main Asakusa store — six-hour rental with hair styling. */
export const asakusaKimonoAiwafukuNo1: KlookTour = {
  title: "Kimono rental with hair styling — Aiwafuku Asakusa No. 1 store",
  desc: "A six-hour rental at 1-11-1 Hanakawado, Taito-ku, with hair styling included and English and Chinese-speaking staff on every day",
  url: klookLink("https://www.klook.com/en-US/activity/2125-kimono-experience-tokyo/"),
};

/** Aiwafuku's second Asakusa store — the one that lists 3L/4L sizes at the same price. */
export const asakusaKimonoAiwafukuNo2: KlookTour = {
  title: "Kimono rental with hair set — Aiwafuku Asakusa No. 2 store",
  desc: "Over 600 kimono on a six-hour rental, with a free hair set, free storage for large cases and 3L and 4L sizes at the same price",
  url: klookLink("https://www.klook.com/en-US/activity/24284-kimono-rental-experience-aiwafuku-tokyo/"),
};

/** The Kaminarimon shop with the earliest return deadline of the four — 17:00. */
export const asakusaKimonoKaminarimon: KlookTour = {
  title: "Asakusa kimono experience by Kaminarimon",
  desc: "A shop 20 seconds from Asakusa Station exit 4 and 220 m from Senso-ji, open 09:00–17:00, with over 1,000 kimono and a same-day return before 17:00",
  url: klookLink("https://www.klook.com/en-US/activity/87187-traditional-kimono-rental-experience-rental-tokyo/"),
};

// ---------------------------------------------------------------------------
// Tax-free shopping day — tours and hotels added 21 Oct 2026
//
// The tax-free guide is one of the site's most-read pages and its reader is, by
// definition, planning a day of shopping and carrying more home than they came
// with. Both slots below are in the 6.5% tours-and-hotels band rather than the 5%
// transport band the airport block on the same page sells into.
//
// Same verification rule as every block above: Klook answers automated reads of
// its product pages with HTTP 403, so each URL was confirmed as a live en-US
// listing through the www.klook.com search index on 21 Oct 2026 — which is why
// none of them carries a price.
// ---------------------------------------------------------------------------

export const tokyoPrivateShoppingTour: KlookTour = {
  title: "Tokyo private one-day shopping tour",
  desc: "A chartered vehicle and four stops you choose from a list that includes Isetan Shinjuku, Takashimaya and LAOX, with or without a guide",
  url: klookLink("https://www.klook.com/en-US/activity/90076-tokyo-private-one-day-shopping-tour/"),
};

export const osakaSkyVistaHalfDayBusTour: KlookTour = {
  title: "Osaka Sky Vista double-decker half-day bus trip",
  desc: "A join-in half day on an open-top double-decker past Osaka Castle, Dotonbori and Tsutenkaku — the sitting-down half of a shopping day",
  url: klookLink("https://www.klook.com/en-US/activity/83744-sky-vista-double-decker-osaka-join-half-day-bus-trip/"),
};

export const osakaPrivateWalkingTour: KlookTour = {
  title: "Osaka private half-day or full-day walking tour",
  desc: "A private English or Japanese-speaking guide for the Namba and Shinsaibashi end of the city, on a route you set",
  url: klookLink("https://www.klook.com/en-US/activity/25706-private-osaka-half-full-day-walking-tour/"),
};

/**
 * Where to stay if the trip is built around shopping — the four districts this
 * guide names. Shinjuku and Namba reuse the destination pages already used by the
 * city transport guides; Ginza (p50061911) and Shinsaibashi Station (p50039917)
 * are new, both confirmed as live en-US hotel searches on 21 Oct 2026.
 */
export const shoppingDistrictStayAreas: KlookStayArea[] = [
  {
    area: "Ginza, Tokyo",
    why: "The department-store district — Mitsukoshi, Matsuya and Ginza Six within a few blocks of each other, which is the one layout where the ¥5,000-per-store minimum is easy to clear in an afternoon.",
    url: klookLink("https://www.klook.com/en-US/destination/p50061911-ginza/3-hotel/"),
  },
  {
    area: "Shinjuku, Tokyo",
    why: "Isetan and the big electronics floors on one side of the station and the drugstores on the other, with the Metro and Toei lines a subway ticket covers running underneath.",
    url: klookLink("https://www.klook.com/en-US/destination/p60269837-shinjuku-station/3-hotel/"),
  },
  {
    area: "Shinsaibashi, Osaka",
    why: "A covered arcade that runs for most of a kilometre into Dotonbori, so a wet afternoon of shopping does not need a train at all.",
    url: klookLink("https://www.klook.com/en-US/destination/p50039917-shinsaibashi-station/3-hotel/"),
  },
  {
    area: "Namba, Osaka",
    why: "Walking distance from the south end of the Shinsaibashi arcade, and the Nankai terminus — which is where the Rapi:t to Kansai Airport leaves from on the day you fly out.",
    url: klookLink("https://www.klook.com/en-US/destination/p50043205-namba-station/3-hotel/"),
  },
];

// ---------------------------------------------------------------------------
// Long-distance rail and the Kansai park, added 22 Oct 2026 for the 14-day
// itinerary — the first page on this site whose spine is a 450 km train ride
// rather than a city.
//
// Both rail entries sit in Klook's 5% passes-and-transport band. The JR Pass
// listing answers automated reads with HTTP 403 like every other Klook product
// page, so it was confirmed as a live en-US listing through the www.klook.com
// search index on 22 Oct 2026 ("Buy Whole 7, 14 & 21 Days Japan Rail Pass
// Online"). The Tokyo–Kyoto rail page is the exception: it answered a read on
// the same date and lists the Tokaido services with their ticket classes, which
// is why it is the shinkansen link rather than an /activity/ id.
//
// No price appears on either, for the usual reason, and because a shinkansen
// fare moves with the train type and the season in any case.
// ---------------------------------------------------------------------------

export const jrPassWholeJapan: KlookTour = {
  title: "JAPAN RAIL PASS (7, 14 or 21 day)",
  desc: "The JR Group's whole-country pass as Klook sells it, in Ordinary and Green car — the version to price against your own route before you commit",
  url: klookLink("https://www.klook.com/en-US/activity/83341-7-day-whole-japan-rail-pass-jr-pass/"),
};

/**
 * Klook's Tokyo → Kyoto rail page. A route page rather than a product id on
 * purpose: Klook sells the Tokaido Shinkansen by date and seat class, and the
 * route page is the address that keeps working when a train number does not.
 */
export const shinkansenTokyoKyoto: KlookTour = {
  title: "Tokyo → Kyoto shinkansen tickets",
  desc: "Klook's Tokaido Shinkansen booking page for the route, with non-reserved, reserved and Green Car seats and QR boarding between Tokyo and Shin-Osaka",
  url: klookLink("https://www.klook.com/en-US/japan-rail/shinkansen/28-tokyo/30-kyoto/"),
};

/**
 * Universal Studios Japan, for the Osaka leg.
 *
 * These two URLs are the ones pages/guides/attractions/usj-tickets-express-pass.tsx
 * already uses, `aff_adid` included — copied here rather than moved, because that
 * page's own affiliate links are not ours to rewrite. The Express Pass is the one
 * ticket on this site Klook pays nothing for, which is why the itinerary offers
 * GetYourGuide beside it.
 */
export const usjStudioPassUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299137&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F46604-universal-studios-japan-e-ticket-osaka-qr-code-direct-entry%2F";

/** USJ Express Pass — the 0% listing. */
export const usjExpressPassUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299138&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F3407-universal-studios-japan-express-pass-osaka%2F";

// ---------------------------------------------------------------------------
// Odaiba and Karuizawa, added 22 Oct 2026
//
// Two entry guides: tokyo-joypolis-tickets and karuizawa-day-trip-from-tokyo.
// The Joypolis pair and the four Karuizawa day tours sit in the 6.5%
// tours-and-activities band; the JR East pass and the Tokyo–Karuizawa rail page
// are in the 5% passes-and-transport band, which is why a tour is the headline
// CTA on both pages and the rail links sit inside the body.
//
// Klook answers automated reads of its /activity/ pages with HTTP 403, so every
// listing below was confirmed live and on sale through the www.klook.com search
// index on 22 Oct 2026. The one exception is `shinkansenTokyoKaruizawa`: like the
// Tokyo–Kyoto rail page above, it answered a read on the same date and lists the
// Asama and Hakutaka services with their four seat classes.
//
// No price appears on any of them, for the usual reason.
//
// One listing was deliberately left out. Klook 17058 bundles a Joypolis passport
// with Madame Tussauds Tokyo in the same DECKS building, which would have been
// the obvious combo link — but madametussauds.com states that the Tokyo branch
// ceased operations on 30 September 2026, and the listing is no longer bookable.
// ---------------------------------------------------------------------------

/** The all-ride Joypolis passport — the ticket the guide recommends. */
export const tokyoJoypolisPassport: KlookTour = {
  title: "Tokyo Joypolis Passport",
  desc: "The admission-plus-unlimited-rides passport for the DECKS indoor park in Odaiba, with a mobile QR code and a suggested 2 to 4 hours on the listing",
  url: klookLink("https://www.klook.com/en-US/activity/4621-joypolis-passport-tokyo/"),
};

/** The second Joypolis listing — the one to open if you only want to get in. */
export const tokyoJoypolisTicket: KlookTour = {
  title: "Tokyo Joypolis ticket",
  desc: "Klook's second Joypolis listing, for anyone who wants entry and a couple of rides rather than the all-day passport",
  url: klookLink("https://www.klook.com/en-US/activity/41323-tokyo-joypolis/"),
};

/** The Karuizawa coach day that matches this guide's three stops exactly. */
export const karuizawaShinjukuDayTour: KlookTour = {
  title: "Karuizawa day tour: Shiraito Falls, Kumoba Pond, Kyu-Karuizawa Ginza & the outlet",
  desc: "A join-in coach day out of Shinjuku covering the three stops a public-transport day has to pick between, plus the Prince Shopping Plaza",
  url: klookLink("https://www.klook.com/en-US/activity/164690-karuizawa-day-tour-shiraito-falls-kumoba-pond-outlet-from-shinju/"),
};

/** The same route sold as a Tokyo departure. */
export const karuizawaShiraitoOutletDayTour: KlookTour = {
  title: "Karuizawa day trip: Shiraito Falls, Kumoba Pond & outlet shopping",
  desc: "The Tokyo-departure version of the waterfall-and-outlet day, listed with Shiraito Falls, Kumoba Pond and Old Karuizawa Ginza",
  url: klookLink("https://www.klook.com/en-US/activity/132005-shiraito-waterfall-old-karuizawa-ginza-one-day-tour-from-tokyo/"),
};

/** The shinkansen-based day — transport booked, itinerary left to you. */
export const karuizawaShinkansenDayTrip: KlookTour = {
  title: "Karuizawa one-day trip from Tokyo by shinkansen",
  desc: "The self-guided version: the Hokuriku Shinkansen there and back, with the Prince Shopping Plaza, Kyu-Karuizawa Ginza, Karuizawa Taliesin and Kumoba Pond suggested on the listing",
  url: klookLink("https://www.klook.com/en-US/activity/90953-karuizawa-one-day-trip-shinkansen-tokyo/"),
};

/** The winter listing — the Prince ski area opens earlier than anywhere near Tokyo. */
export const karuizawaSkiSnowDayTour: KlookTour = {
  title: "Karuizawa ski and snow day tour from Tokyo",
  desc: "A round-trip coach to the Karuizawa ski area with roughly five hours on the snow, for the season the Prince slopes open from late October",
  url: klookLink("https://www.klook.com/en-US/activity/130492-karuizawa-ski-and-snow-playing-day-tour-from-tokyo/"),
};

/** JR EAST PASS, Nagano/Niigata area — the 5% band, and it reaches Karuizawa. */
export const jrEastPassNaganoNiigata: KlookTour = {
  title: "JR EAST PASS (Nagano / Niigata area)",
  desc: "JR East's own regional pass as Klook sells it — the listing names Karuizawa, Nagano, Matsumoto, Hakuba and Niigata as what it reaches from Tokyo",
  url: klookLink("https://www.klook.com/en-US/activity/1419-jr-east-nagano-niigata-area-jr-pass/"),
};

/**
 * Klook's Tokyo → Karuizawa rail page. A route page rather than a product id, for
 * the same reason as `shinkansenTokyoKyoto`: the Hokuriku Shinkansen is sold by
 * date and seat class, and the route page is the address that keeps working when a
 * train number does not.
 */
export const shinkansenTokyoKaruizawa: KlookTour = {
  title: "Tokyo → Karuizawa shinkansen tickets",
  desc: "Klook's Hokuriku Shinkansen booking page for the route, listing the Asama and Hakutaka services in non-reserved, reserved, Green Car and Gran Class seats",
  url: klookLink("https://www.klook.com/en-US/japan-rail/shinkansen/28-tokyo/karuizawa-station/"),
};

// ---------------------------------------------------------------------------
// Airport limousine bus and the Osaka Kaiyukan, added 22 Oct 2026
//
// Two entry guides: the restored tokyo-airport-limousine-bus (transport, so the
// 5% passes-and-transport band) and osaka-aquarium-kaiyukan-tickets (an
// admission, so the 6.5% tours-and-activities band).
//
// Klook answers automated reads of its /activity/ pages with HTTP 403, so each
// listing below was confirmed live and on sale through the www.klook.com search
// index on 22 Oct 2026, along with the en-US form of its URL.
//
// Note on the Kaiyukan: there is already an `affiliate.klook.com/redirect` link
// to activity 598 inside osaka-attractions-pass.tsx, with its own `aff_adid`.
// That one is untouched. Klook no longer issues new `aff_adid` values, so the new
// guide uses the documented `?aid=` form of the same product page.
//
// No price appears on any of them, for the usual reason — and in the Kaiyukan's
// case because the aquarium itself prices by date (価格変動制), so a single
// figure would be wrong on most days of the year.
// ---------------------------------------------------------------------------

/** Narita ⇄ central Tokyo limousine bus — the headline CTA on the bus guide. */
export const naritaLimousineBus: KlookTour = {
  title: "Narita Airport – Tokyo limousine bus",
  desc: "The Airport Limousine run between the three Narita terminals and the Tokyo hotel and station stops, boarded with a QR code rather than a paper ticket",
  url: klookLink("https://www.klook.com/en-US/activity/2274-narita-airport-limousine-bus-tokyo/"),
};

/** Haneda ⇄ central Tokyo limousine bus — the much shorter, much cheaper ride. */
export const hanedaLimousineBus: KlookTour = {
  title: "Haneda Airport – Tokyo limousine bus",
  desc: "The same operator from Haneda's three terminals, with Shinjuku, Ikebukuro and the Disney resort among the destinations on the listing",
  url: klookLink("https://www.klook.com/en-US/activity/150434-haneda-airport-limousine-bus-tokyo/"),
};

/** The inter-airport coach — for an itinerary that lands at one and leaves from the other. */
export const naritaHanedaLimousineBus: KlookTour = {
  title: "Limousine bus between Haneda and Narita",
  desc: "The direct airport-to-airport coach, for a trip that arrives at one Tokyo airport and departs from the other",
  url: klookLink("https://www.klook.com/en-US/activity/167353-limousine-bus-between-haneda-airport-and-narita-airport/"),
};

// ---------------------------------------------------------------------------
// Door-to-door airport transfers, added 25 Oct 2026 for the answer-first rebuild
// of pages/guides/transport/tokyo-airport-transfer.tsx.
//
// The trains and the limousine bus already had links; what the guide had no route
// for was the reader whose question is "what do I do with a 23:40 landing or a
// 06:00 departure", where the answer is a car rather than a timetable. Both
// listings below sit in the 5% passes-and-transport band.
//
// Klook answers automated reads of /activity/ pages with HTTP 403, so each was
// confirmed live and on sale through the www.klook.com search index on
// 25 Oct 2026, together with the en-US form of its URL. No price appears for
// either: the private transfer is priced per area and per vehicle size, so a
// single figure would be wrong for most bookings even if we could read one.
// ---------------------------------------------------------------------------

/** Private car from either Tokyo airport — the late-landing, heavy-luggage answer. */
export const tokyoPrivateAirportTransfer: KlookTour = {
  title: "Private transfer, Haneda or Narita ⇄ Tokyo",
  desc: "A car and driver booked to your hotel address rather than to a station, from either airport, with the driver tracking your flight — listed as a 24-hour service in 7- and 10-seater sizes",
  url: klookLink("https://www.klook.com/en-US/activity/23053-private-haneda-narita-airport-transfers-tokyo/"),
};

/** The shared-van version — the same door-to-door idea at a seat price. */
export const tokyoSharedAirportTransfer: KlookTour = {
  title: "Shared transfer, Narita or Haneda → Tokyo",
  desc: "The seat-by-seat version of the same thing for one or two travellers, booked to a central Tokyo address instead of a whole vehicle",
  url: klookLink("https://www.klook.com/en-US/activity/136963-shared-transfer-narita-or-haneda-airport-to-tokyo/"),
};

/** Osaka Aquarium Kaiyukan admission — the headline CTA on the Kaiyukan guide. */
export const osakaAquariumKaiyukanTicket: KlookTour = {
  title: "Osaka Aquarium Kaiyukan ticket",
  desc: "The straight admission to the Tempozan aquarium, in English and on a foreign card, scanned at the gate",
  url: klookLink("https://www.klook.com/en-US/activity/598-osaka-aquarium-kaiyukan-japan/"),
};

/**
 * Osaka Amazing Pass bundled with a Kaiyukan ticket. Worth its own constant
 * because the Amazing Pass does *not* include the Kaiyukan — this listing is the
 * only way to buy the two in one checkout.
 */
export const osakaAmazingPassKaiyukanCombo: KlookTour = {
  title: "Osaka Amazing Pass + Kaiyukan combo",
  desc: "The city pass and the aquarium in one booking — the Amazing Pass does not cover the Kaiyukan on its own, so this is the only single checkout that gets you both",
  url: klookLink("https://www.klook.com/en-US/activity/30889-osaka-amazing-pass-aquarium-kaiyukan-e-ticket/"),
};

/** Kaiyukan with NIFREL out at Expo City — the two-aquarium day. */
export const kaiyukanNifrelCombo: KlookTour = {
  title: "NIFREL + Kaiyukan combo ticket",
  desc: "The Tempozan aquarium paired with NIFREL, the Expocity 'living museum' on the opposite side of the city",
  url: klookLink("https://www.klook.com/en-US/activity/18460-nifrel-aquazoo-aquarium-kaiyukan-osaka/"),
};

/** Kaiyukan with LEGOLAND Discovery Center, which is in the same Tempozan complex. */
export const kaiyukanLegolandCombo: KlookTour = {
  title: "LEGOLAND Discovery Center Osaka + Kaiyukan combo",
  desc: "Both venues sit in Tempozan Harbor Village, a few minutes apart — the aquarium's own site sells the same pairing as a set ticket",
  url: klookLink("https://www.klook.com/en-US/activity/31500-legoland-discovery-center-osaka-aquarium-kaiyukan-ticket-combo-package/"),
};

// ---------------------------------------------------------------------------
// Umeda Sky Building and Osaka Castle, added 23 Oct 2026
//
// Two more Osaka entry guides: umeda-sky-building-tickets and
// osaka-castle-tickets. Both are admissions, so the 6.5% tours-and-activities
// band, with the 5% Osaka Amazing Pass (`osakaAmazingPass`, above) as the
// secondary CTA on each — the pass covers both venues, with a 15:00 cut-off at
// the Umeda deck that decides whether it is worth buying.
//
// Klook still answers automated reads of its /activity/ pages with HTTP 403, so
// each listing below was confirmed live, on sale, and in its en-US URL form
// through the www.klook.com search index on 23 Oct 2026.
//
// No Gozabune constant: Klook's index has no standalone Osaka Castle Gozabune
// listing, only the castle tickets and the guided walks. The boat is bought at
// the kiosk by the Gokurakubashi bridge or free with the Amazing Pass, and the
// castle guide says so rather than pointing at a product that does not exist.
//
// No price appears on any of them, for the usual reason.
// ---------------------------------------------------------------------------

/** Umeda Sky Building / Kuchu Teien Observatory admission — headline CTA on the Umeda guide. */
export const umedaSkyBuildingTicket: KlookTour = {
  title: "Umeda Sky Building & Kuchu Teien Observatory ticket",
  desc: "The straight admission to the 173 m rooftop ring above the twin towers, in English and on a foreign card",
  url: klookLink("https://www.klook.com/en-US/activity/35861-umeda-sky-building-kuchu-teien-observatory-ticket/"),
};

/** Osaka Castle main tower admission — headline CTA on the castle guide. */
export const osakaCastleTicket: KlookTour = {
  title: "Osaka Castle ticket",
  desc: "Admission to the eight floors of the main tower and the Toyotomi Stone Wall Museum, scanned at the gate",
  url: klookLink("https://www.klook.com/en-US/activity/30110-osaka-castle-ticket/"),
};

/**
 * The one tour that covers both of these guides' venues in a day — which is why
 * it is the 6.5% CTA on each of them rather than two separate tours.
 */
export const osakaCastleUmedaTonboriDayTour: KlookTour = {
  title: "Osaka Castle, Umeda Sky Building & Tombori river cruise day tour",
  desc: "A guided day that takes in the castle, the Umeda deck and the Dotonbori river cruise — the two admissions on this page plus the boat, with someone else doing the routing",
  url: klookLink("https://www.klook.com/en-US/activity/91767-osaka-castle-umeda-sky-building-tonbori-river-cruise-join-private-one-day-walking-tour/"),
};

/** Castle plus the Nishinomaru Garden, which is the separately-ticketed half of the grounds. */
export const osakaCastleNishinomaruWalkingTour: KlookTour = {
  title: "Osaka Castle & Nishinomaru Garden half-day walking tour",
  desc: "A join-in half day over the castle grounds and the Nishinomaru Garden, the paid lawn with the postcard view of the tower and about 300 cherry trees",
  url: klookLink("https://www.klook.com/en-US/activity/84795-osaka-castle-nishinomaru-garden-join-half-day-walking-tour/"),
};

/** Open-top night bus out of Osaka Station — the Umeda-departing evening alternative. */
export const osakaNaniWonderNightBusTour: KlookTour = {
  title: "Osaka “Nani Wonder” open-top double-decker night tour",
  desc: "Departs the Osaka Station JR express bus terminal in Umeda and runs the night lights down Midosuji to Nipponbashi and Shinsekai",
  url: klookLink("https://www.klook.com/en-US/activity/142111-osaka-sightseeing-bus-nani-wonder-double-decker-open-top-bus-night-view-tour/"),
};

// ---------------------------------------------------------------------------
// Dotonbori river cruises and Kyoto kimono rental, added 23 Oct 2026
//
// Two more Kansai entry guides: dotonbori-river-cruise and kyoto-kimono-rental.
// Everything below is in the 6.5% tours-and-activities band, with the 5% Osaka
// Amazing Pass (`osakaAmazingPass`, above) as the secondary CTA on the cruise
// page — the pass operator's own facility list carries the Tombori River Cruise
// as a free admission, which is the whole of the cruise page's money question.
//
// Klook still answers automated reads of its /activity/ pages with HTTP 403, so
// each listing below was confirmed live, on sale, and in its en-US URL form
// through the www.klook.com search index on 23 Oct 2026. No price appears on any
// of them, for the usual reason — and on the kimono page that rule is doubled:
// rental pricing moves by plan and season, so the guide quotes only what the
// shops' own operators publish.
//
// Note on the cruise block: Klook does not sell the operator's own Tombori River
// Cruise as a standalone en-US listing. What it sells is the other Dotonbori
// boats — the lounge-seat City Cruise and the Naniwa sightseeing boat, both from
// the same stretch of river — plus the pass that includes the Tombori boat free.
// The guide says exactly that rather than implying the pages are the same thing.
// ---------------------------------------------------------------------------

/** 20-minute Dotonbori cruise from Tazaemonbashi Pier — lounge seating, BYO drinks. */
export const dotonboriCityCruise: KlookTour = {
  title: "Dotonbori city cruise, Osaka",
  desc: "A 20-minute cruise from Tazaemonbashi Pier past the Glico sign, listed with lounge-style seating, your own drinks allowed on board and pets welcome",
  url: klookLink("https://www.klook.com/en-US/activity/65390-city-cruise-experience-osaka/"),
};

/** The 30-minute Naniwa sightseeing boat — the longer of the two Dotonbori rides. */
export const dotonboriNaniwaSightseeingBoat: KlookTour = {
  title: "Osaka Dotonbori Naniwa sightseeing boat",
  desc: "The 30-minute version of the same river, listed with background music and the Glico sign, neon and riverside landmarks from the water",
  url: klookLink("https://www.klook.com/en-US/activity/176566-osaka-dotonbori-river-cruise/"),
};

/** Osaka Wonder Cruise — the third Dotonbori operator Klook sells in en-US. */
export const osakaWonderCruise: KlookTour = {
  title: "Osaka Wonder Cruise",
  desc: "A short Dotonbori river ride past the Minami landmarks, sold separately from the Tombori and Naniwa boats",
  url: klookLink("https://www.klook.com/en-US/activity/84029-osaka-river-cruise/"),
};

/** The DJ-boat version of the Dotonbori cruise, with club entry attached. */
export const dotonboriTonboriRaveCruise: KlookTour = {
  title: "Dotonbori TONBORIRAVE cruise with a DJ",
  desc: "The night-out version of a Dotonbori cruise — a DJ on board and free admission to the Piccadilly nightclub included with the ticket",
  url: klookLink("https://www.klook.com/en-US/activity/196953-osaka-dotonbori-tonborirave-cruise-dj-bonus-club-piccadilly-entry/"),
};

/** Daytime Dotonbori food walk — the 11:00–14:00 join-in, for the hours either side of a cruise. */
export const dotonboriDaytimeFoodTour: KlookTour = {
  title: "Dotonbori daytime food tour, Osaka",
  desc: "A three-hour join-in walk listed at 11:00–14:00 for 2 to 10 people, with kushikatsu, takoyaki, a seasonal lunch set at an izakaya and a local dessert",
  url: klookLink("https://www.klook.com/en-US/activity/103864-osaka-join-180-min-food-tour-daytime-dotonbori/"),
};

/** The evening Namba bar crawl — the after-dark half of the same few streets. */
export const nambaBarHoppingNightTour: KlookTour = {
  title: "Osaka bar hopping night tour in Namba",
  desc: "A three-and-a-half-hour join-in evening with an English-speaking guide, through the bars around Namba and Tenma rather than the Dotonbori strip",
  url: klookLink("https://www.klook.com/en-US/activity/87969-namba-join-half-day-food-tour/"),
};

/**
 * Kyoto kimono rental. Six shops across the three areas the guide splits by —
 * Gion and Kiyomizu, Arashiyama, and Kyoto Station — because which area you book
 * is the decision the reader is actually making, and a single "Kyoto" link hides it.
 */

/** Yumeyakata — the listing that publishes all three return options in full. */
export const kyotoKimonoYumeyakata: KlookTour = {
  title: "Kyoto kimono rental — Yumeyakata",
  desc: "Over 500 designs, and the listing that spells out all three return routes: back to the shop by 17:30 the same day, 9:00–17:00 the next day for a fee, or by post for a fee",
  url: klookLink("https://www.klook.com/en-US/activity/1079-one-day-kimono-rental-kyoto/"),
};

/** Aiwafuku's Gion Shijo store — free hair set, and returnable at any of their six Kyoto shops. */
export const kyotoKimonoAiwafukuGion: KlookTour = {
  title: "Gion kimono rental with free hair styling — Aiwafuku Gion Shijo",
  desc: "Over 600 kimono with a hair set by a qualified stylist included, two minutes from Hanamikoji and Shirakawa, and returnable at any of the operator's six Kyoto stores",
  url: klookLink("https://www.klook.com/en-US/activity/107086-kimono-rental-gionshijyo-kyoto-aiwafuki/"),
};

/** The Yasaka Pagoda store — one minute from the pagoda itself, which is the shot people come for. */
export const kyotoKimonoAiwafukuKiyomizu: KlookTour = {
  title: "Kiyomizu kimono rental with hair set — Aiwafuku Kiyomizu / Yasaka Pagoda",
  desc: "A minute's walk from the Yasaka Pagoda and Yasaka Koshindo with Kiyomizu-dera uphill from it, over 600 kimono, hair set by a licensed stylist, English and Chinese-speaking staff daily",
  url: klookLink("https://www.klook.com/en-US/activity/122163-kimono-rental-with-hair-set-kyoto-aiwafuku-shimizu-yasaka-tower-sto/"),
};

/** Misaki, by Gion-Shijo — the Gion option with the photo shoot built in. */
export const kyotoKimonoMisakiGion: KlookTour = {
  title: "Kimono and yukata rental with a photo shoot — Misaki, Gion-Shijo",
  desc: "Over 400 kimono and yukata from a shop set up for Gion, Yasaka Shrine and Kiyomizu-dera, with a photo shoot on the same booking",
  url: klookLink("https://www.klook.com/en-US/activity/127739-kimono-rental-gion-kyoto-gion-shijo-yasaka-shrine-misaki-store/"),
};

/** Arashiyama — the bamboo-grove end of the city, which is a different day from Gion. */
export const kyotoKimonoOokiniArashiyama: KlookTour = {
  title: "Arashiyama kimono rental — Ookini Arashiyama store",
  desc: "Three minutes from the bamboo grove and Togetsukyo bridge, with over 1,000 kimono and optional Japanese-style makeup and a photo shoot",
  url: klookLink("https://www.klook.com/en-US/activity/110642-kimono-rental-japanese-makeup-photoshoot-by-ookini-arashiyama/"),
};

/** Kyoto Station — the shop you use when the kimono day starts off a shinkansen. */
export const kyotoKimonoAiwafukuStation: KlookTour = {
  title: "Kyoto Station kimono rental with hair set — Aiwafuku Kyoto Ekimae",
  desc: "Five minutes from Kyoto Station, so the kimono day can start the moment the shinkansen does: over 600 kimono, a hair set by a qualified stylist, and a 30-minute photo and 15-minute makeup plan",
  url: klookLink("https://www.klook.com/en-US/activity/103338-kimono-rental-with-hair-set-kyoto-aiwafuku-kyoto-ekimae-store/"),
};

/** The Hachijo-exit option, for anyone arriving with cases — the listing states luggage storage. */
export const kyotoKimonoMimosaStation: KlookTour = {
  title: "Kyoto Station kimono rental with luggage storage — mimosa MK Taxi",
  desc: "About a minute from the Kyoto Station Hachijo exit with luggage storage and a hair set included — the one to pick if you are changing before you have checked in",
  url: klookLink("https://www.klook.com/en-US/activity/103034-kimono-rental-experience-mk-mimosa-kyoto/"),
};

// ---------------------------------------------------------------------------
// Ticket and tour redirects moved here on 20 Oct 2026
//
// Each of these was a `const …_URL` inside the guide that uses it. They moved so
// lib/attraction-prices.ts — which feeds both the guides and the ticket price
// table — can reference the same link the guide already used, rather than a
// second link to the same product. The URLs themselves are unchanged, including
// their per-link `aff_adid`.
// ---------------------------------------------------------------------------

/** Shibuya Sky rooftop deck. */
export const shibuyaSkyTicketUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299140&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F70672-shibuya-sky-tokyo%2F";

/** teamLab Planets TOKYO, Toyosu. */
export const teamlabPlanetsTicketUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299131&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F25300-teamlab-planets-toyosu-tokyo-ticket%2F";

/** teamLab Borderless, Azabudai Hills. */
export const teamlabBorderlessTicketUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299135&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F20707-teamlab-borderless-admission-ticket-tokyo%2F";

/** Osaka Amazing Pass — the redirect form the pass guide uses. */
export const osakaAmazingPassUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304898&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F82312-amazing-pass-osaka%2F";

/** Kamakura and Enoshima day tour — the Klook route for the Kamakura admissions. */
export const kamakuraEnoshimaDayTourUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1307855&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F25457-kamakura-enoshima-day-tour-tokyo%2F";

/** Hiroshima and Miyajima bus tour — the Klook route for the Miyajima admissions. */
export const hiroshimaMiyajimaBusTourUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1307052&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F76852-hiroshima-miyajima-bus-tour%2F";

/** Kyoto and Nara day trip — the Klook route on the Nara guide. */
export const naraDayTourUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1307051&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F87236-kyoto-tour-nara%2F";

/**
 * JR Haruka — moved here on 21 Oct 2026 from pages/guides/transport/haruka-vs-nankai-rapit.tsx
 * so the tax-free guide's departure-day block can reuse the link that page already
 * uses rather than minting a second one for the same product. URL unchanged,
 * `aff_adid` included. Listing 18400 confirmed live on www.klook.com, 21 Oct 2026.
 */
export const jrHarukaUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1265372&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F18400-jr-haruka-airport-express-train-tickets-osaka%2F";

/** Nankai Rapi:t — likewise moved, not re-minted. Listing 599, confirmed 21 Oct 2026. */
export const nankaiRapitUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1265374&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F599-kansai-airport-namba-train-ticket-osaka%2F";

// ---------------------------------------------------------------------------
// Shibuya evenings and the Tokyo Disney stay, added 25 Oct 2026
//
// Both host guides sell a 2% "special activity" ticket as their headline product
// (SHIBUYA SKY, the Disney 1-Day Passport) and had no route into any other band.
// Nothing below replaces those tickets — these are the things booked around them:
// tours and hotels at 6.5%, the airport coach at 5%, the eSIM at 20%.
//
// Klook answers automated reads of its /activity/ and /destination/ pages with
// HTTP 403, so every URL here was confirmed live, on sale and in its en-US form
// through the www.klook.com search index on 25 Oct 2026. No price appears on any
// of them, for that same reason — and for the bar tours because what is included
// (how many venues, how many drinks) moves the figure more than the date does.
// ---------------------------------------------------------------------------

/** Shibuya bar crawl — the Shibuya-side counterpart to the Shinjuku tour on tokyo-food-tour. */
export const shibuyaBarHoppingTour: KlookTour = {
  title: "Shibuya bar hopping tour (3 hours)",
  desc: "A join-in evening crawl of two local bars and izakaya with an English-speaking guide, which is the part of Shibuya a rooftop slot does not show you",
  url: klookLink("https://www.klook.com/en-US/activity/86814-3-hour-join-bar-hopping-shibuya/"),
};

/** The listing that covers both sides of the loop, for an evening that starts in Shibuya. */
export const shinjukuShibuyaNightBarTour: KlookTour = {
  title: "Tokyo night bar hopping tour (Shinjuku / Shibuya)",
  desc: "The same idea run across both districts, so a Shibuya evening can carry on two Yamanote stops up the line in Shinjuku",
  url: klookLink("https://www.klook.com/en-US/activity/97057-tokyo-night-bar-hopping-tour-shinjuku-shibuya-tokyo-shinjuku-shibuya/"),
};

/**
 * The daytime, all-ages alternative to the two bar crawls — the same reason
 * tokyo-food-tour.tsx pairs its Shinjuku izakaya crawl with a Tsukiji market walk.
 */
export const shibuyaFoodCultureWalkingTour: KlookTour = {
  title: "Shibuya food and culture half-day walking tour",
  desc: "A half-day walk through Shibuya 109, Nonbei Yokocho and Miyashita Park with four dishes and two drinks included, as the listing describes it",
  url: klookLink("https://www.klook.com/en-US/activity/94372-shibuya109-shibuya-nonbei-yokocho-miyashita-park-join-half-day-food-tour/"),
};

/**
 * Where to stay for a Tokyo Disney day. Klook has no `shin-urayasu-station`
 * hotel search — the station has a destination page but no `/3-hotel/` form in
 * the index — so the Urayasu city listing is the second entry; it is the one
 * that returns the Shin-Urayasu free-shuttle hotels.
 */
export const tokyoDisneyStayAreas: KlookStayArea[] = [
  {
    area: "Maihama",
    why: "The station the parks share, on the JR Keiyo Line from Tokyo Station and the start of the Disney Resort Line monorail that loops between the two gates.",
    url: klookLink("https://www.klook.com/en-US/destination/p50231652-maihama/3-hotel/"),
  },
  {
    area: "Urayasu / Shin-Urayasu",
    why: "One stop further out on the Keiyo Line and generally cheaper than the resort-side rooms; many of these hotels run their own free shuttle to the two parks.",
    url: klookLink("https://www.klook.com/en-US/hotels/city/19368-urayasu-hotels/"),
  },
];

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

/**
 * Hotel search for the trip-prep slots (6.5%). Not a new link: it reads the URL out
 * of `tokyoAirportStayAreas`, which the Tokyo airport-transfer guide already renders,
 * so there is one source of truth for the Tokyo Station destination id. Index 0 is
 * Tokyo Station / Marunouchi — the arrival-day base that block is ordered around.
 */
const tokyoStationHotelsUrl = tokyoAirportStayAreas[0].url;

/**
 * Shibuya hotel search (6.5%) for the Shibuya Sky slot. Also not a new link: it
 * reads the URL out of `tokyoFiveDayStayAreas`, where the Shibuya Scramble
 * Crossing destination id already lives, so the two pages cannot drift apart.
 * Index 3 is Shibuya — the first three entries are `tokyoStayAreas` verbatim.
 */
const shibuyaHotelsUrl = tokyoFiveDayStayAreas[3].url;

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
  naritaBusSubway: {
    label: "Narita limousine bus + Tokyo Subway Ticket",
    ctaLabel: "Check the bus and pass combo →",
    url: naritaBusSubwayCombo.url,
  },
  haruka: {
    label: "JR Haruka airport express ticket",
    ctaLabel: "Check the Haruka ticket →",
    url: jrHarukaUrl,
  },
  rapit: {
    label: "Nankai Limited Express Rapi:t ticket",
    ctaLabel: "Check the Rapi:t ticket →",
    url: nankaiRapitUrl,
  },
  hotelTokyoStation: {
    label: "Hotels around Tokyo Station / Marunouchi",
    ctaLabel: "Check hotel prices on Klook →",
    url: tokyoStationHotelsUrl,
  },
  naritaLimousine: {
    label: "Narita Airport limousine bus",
    ctaLabel: "Check the limousine bus →",
    url: naritaLimousineBus.url,
  },
  osakaPass: {
    label: "Osaka Amazing Pass (1-day / 2-day)",
    ctaLabel: "Check the Osaka pass →",
    url: osakaAmazingPass.url,
  },
  fujiHakoneTour: {
    label: "Mt. Fuji & Hakone day tour from Tokyo",
    ctaLabel: "Check the day tour →",
    url: fujiHakoneDayTour.url,
  },
  skytree: {
    label: "TOKYO SKYTREE ticket",
    ctaLabel: "Check the Skytree ticket →",
    url: skytreeTicket.url,
  },
  hotelShibuya: {
    label: "Hotels around Shibuya",
    ctaLabel: "Check Shibuya hotels on Klook →",
    url: shibuyaHotelsUrl,
  },
  hotelMaihama: {
    label: "Hotels around Maihama",
    ctaLabel: "Check Maihama hotels on Klook →",
    url: tokyoDisneyStayAreas[0].url,
  },
  hotelUrayasu: {
    label: "Hotels in Urayasu / Shin-Urayasu",
    ctaLabel: "Check Urayasu hotels on Klook →",
    url: tokyoDisneyStayAreas[1].url,
  },
  hanedaLimousine: {
    label: "Haneda Airport limousine bus",
    ctaLabel: "Check the Haneda bus →",
    url: hanedaLimousineBus.url,
  },
  shibuyaBarTour: {
    label: "Shibuya bar hopping tour (3 hours)",
    ctaLabel: "Check the Shibuya crawl →",
    url: shibuyaBarHoppingTour.url,
  },
  shinjukuShibuyaNightTour: {
    label: "Tokyo night bar hopping tour (Shinjuku / Shibuya)",
    ctaLabel: "Check the night tour →",
    url: shinjukuShibuyaNightBarTour.url,
  },
  shibuyaFoodTour: {
    label: "Shibuya food and culture half-day walking tour",
    ctaLabel: "Check the food walk →",
    url: shibuyaFoodCultureWalkingTour.url,
  },
} as const;

/**
 * Tax-Free Shopping — the reader is planning a day of shopping, so this slot sits
 * next to the shopping-day section rather than at the foot of the page. The airport
 * trains moved to `taxFreeAirportRunPrep`, which sits by the departure-day section.
 */
export const taxFreeTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Every step of the refund runs off your phone — finding a shop's tax-free desk, and, at the seven airports that allow it, doing the customs confirmation through Visit Japan Web instead of queueing at a terminal.",
  },
  {
    ...tripPrepProducts.subway,
    why: "The ¥5,000 minimum is per store, so a tax-free day means moving between stores; the large department stores and electronics chains sit on Tokyo Metro and Toei lines a 24, 48 or 72-hour ticket already covers.",
  },
];

/**
 * Tax-Free Shopping, departure day — the bags are heavier than they were on arrival
 * and the refund has to be done before baggage check-in, which makes a booked seat
 * to the airport worth more on this page than a cheaper connection.
 */
export const taxFreeAirportRunPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.naritaBusSubway,
    why: "The limousine bus takes hold luggage into the hold and runs from central Tokyo hotels to the Narita terminals, and this listing sells the ride together with the subway pass you want for the shopping days before it.",
  },
  {
    ...tripPrepProducts.skyliner,
    why: "The faster way out to Narita if you are staying on the Ueno and Asakusa side — a reserved seat with luggage space, rather than a rush-hour local with four shopping bags.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "For Kansai Airport out of Kyoto, Shin-Osaka or Tennoji, with a reserved seat; Klook's listing states it is sold only to non-Japanese passport holders with a Temporary Visitor stamp.",
  },
  {
    ...tripPrepProducts.rapit,
    why: "The Namba and Shinsaibashi version of the same thing — a reserved seat from Namba out to Kansai Airport, which matters more on the way out than it did on the way in.",
  },
];

/**
 * Currency Exchange — the reader is deciding where to change money, so each line is
 * a cost that can be settled in their own currency instead of out of the yen they
 * exchange on arrival. Hotels were added 22 Oct 2026: the room is the largest line
 * item of the trip and the one most clearly removable from the exchange question.
 */
export const currencyExchangeTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.skyliner,
    why: "If you only want to change a small float at the airport, book the train out in advance — the Skyliner reaches Nippori in 36 minutes and Keisei Ueno in about 41.",
  },
  {
    ...tripPrepProducts.subway,
    why: "A subway ticket bought before you fly is one fare you do not have to cover out of the yen you exchange on arrival.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Checking a counter's rate against the mid-market rate takes seconds online, so it helps to have data before you walk past the first exchange desk in the arrivals hall.",
  },
  {
    ...tripPrepProducts.hotelTokyoStation,
    why: "The room is usually the biggest single bill of the trip; prepaying it in your own currency takes it out of the exchange-rate question entirely, and this is the arrival-day base the Narita trains reach without a transfer.",
  },
];

/**
 * Contactless Payment — added 23 Oct 2026. The reader's question ("can I tap?") now
 * has a mostly-yes answer on the private railways and subways, so this slot is not
 * about paying at all: it is about the things a tap at a gate or a counter cannot
 * get you, which is a booked seat, a timed entry, or a pass that beats per-ride fares.
 *
 * Deliberately spread across the bands the page's own prepay table lists: transport
 * at 5% (limousine bus, Skyliner, subway ticket, Osaka pass), tours and tickets at
 * 6.5% (Fuji–Hakone day tour, Skytree), eSIM at 20%, hotels at 6.5%.
 */
export const contactlessTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.naritaLimousine,
    why: "Tap-to-ride is a railway service, so it does nothing for the airport coach — and the limousine bus takes hold luggage, which a rush-hour train does not.",
  },
  {
    ...tripPrepProducts.skyliner,
    why: "Keisei's Skyliner is a reserved-seat limited express: the seat is a separate purchase from the fare, so there is no gate to tap your way onto it.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Tokyo Metro and Toei both take a contactless card now, but they charge you per journey; the 24, 48 or 72-hour ticket is the version that stops counting.",
  },
  {
    ...tripPrepProducts.osakaPass,
    why: "Osaka Metro has taken contactless cards at every station since October 2024, so the reason to buy this pass is the 40-plus admissions bundled with the rides — not the rides.",
  },
  {
    ...tripPrepProducts.fujiHakoneTour,
    why: "A day out to Fuji or Hakone is the one trip no ticket gate can sell you: it is a coach seat on a fixed departure, booked before you are in Japan.",
  },
  {
    ...tripPrepProducts.skytree,
    why: "Popular attractions sell timed entry, and the slot is the scarce thing rather than the payment — an observation deck can be sold out while its card terminal works perfectly.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Tap-to-ride only tells you the fare was charged, not what it was: the history lives on a web page, which needs working data rather than a hunt for station Wi-Fi.",
  },
  {
    ...tripPrepProducts.hotelTokyoStation,
    why: "The room is the biggest bill of the trip and the one most worth settling in your own currency before you fly, rather than tapping a card at a front desk at a rate you do not see.",
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

/**
 * Best Travel Card — added 25 Oct 2026. The page had no Klook route at all, which
 * is odd for a guide whose whole argument is that a foreign transaction fee and a
 * marked-up exchange rate are charged per transaction in Japan. The answer that
 * follows from that argument is to move transactions off the trip: each line below
 * is a yen cost the reader can settle in their own currency before they fly.
 *
 * Deliberately spread across three bands rather than one: eSIM 20%, subway ticket
 * and airport train 5%, day tour 6.5%.
 */
export const bestTravelCardTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "The cheapest data on the trip is the data you do not buy at an airport counter in yen — and a working phone is what lets you check a terminal's rate, or refuse a dynamic-currency-conversion prompt, before you tap.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Tokyo Metro and Toei gates do not take a foreign contactless card, so this is a fare that otherwise comes out of cash you withdrew at an ATM — and the 24, 48 or 72-hour ticket stops counting per journey.",
  },
  {
    ...tripPrepProducts.naritaExpress,
    why: "Airport trains are one of the few Japanese transport fares you can buy on a card before departure rather than at a ticket window on arrival, which takes the first and largest transport charge of the trip out of the exchange question.",
  },
  {
    ...tripPrepProducts.fujiHakoneTour,
    why: "A day out to Fuji or Hakone is a single large charge rather than a day of small ones; put it on the card before you fly and the whole day costs one conversion instead of a dozen.",
  },
];

/**
 * Shibuya Sky — added 25 Oct 2026, and the reason is the commission band. The
 * SHIBUYA SKY ticket itself is a 2% "special activity" on Klook, so the site's
 * most-read page had no route into any other band. This block sits after the
 * sunset-versus-daytime decision because that decision is what makes the rest of
 * the day plannable: a rooftop slot is one hour, and the evening around it is not.
 *
 * Nothing here replaces the ticket CTAs on the page. Hotels and tours are 6.5%,
 * the subway ticket 5%.
 */
export const shibuyaSkyDayTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelShibuya,
    why: "A sunset slot ends after dark with the Yamanote loop at its busiest; staying in Shibuya turns the trip home into a walk, and puts you at the station the morning highway buses leave from.",
  },
  {
    ...tripPrepProducts.shibuyaBarTour,
    why: "The obvious thing to do with the hours after a sunset slot, and the one part of Shibuya a rooftop does not show you — two bars with a guide who orders for you.",
  },
  {
    ...tripPrepProducts.shinjukuShibuyaNightTour,
    why: "The version that crosses to Shinjuku as well, which suits a night slot: the deck is easiest to book late, and the evening still has somewhere to go afterwards.",
  },
  {
    ...tripPrepProducts.shibuyaFoodTour,
    why: "The daytime, all-ages answer if your slot is a daytime one or the group includes under-20s — a half-day walk around Shibuya 109, Nonbei Yokocho and Miyashita Park rather than a bar crawl.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Shibuya Station is on the Hanzomon, Ginza and Fukutoshin lines, so a 24, 48 or 72-hour ticket covers the rest of the day around the slot — and a foreign contactless card will not open those gates.",
  },
];

/**
 * Tokyo Disney — added 25 Oct 2026, same reason as the Shibuya block: the Klook
 * 1-Day Passport is a 2% special activity, so the only Klook route on the page
 * paid the lowest band on the dashboard.
 *
 * A park day is also the one Tokyo day where the accommodation question is
 * genuinely open — the resort is 15 to 20 minutes out of Tokyo Station, and the
 * gates open before a commute from central Tokyo comfortably gets you there.
 * Hotels are 6.5%, the airport coaches 5%, the eSIM 20%.
 */
export const tokyoDisneyTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelMaihama,
    why: "The station the two parks share, reached from Tokyo Station on the JR Keiyo Line in about 15 to 20 minutes — and the start of the Disney Resort Line monorail, which is what makes an early entry or a late parade workable.",
  },
  {
    ...tripPrepProducts.hotelUrayasu,
    why: "One stop further out and generally cheaper than the resort-side rooms, with many of these hotels running their own free shuttle to the gates — the trade is a shuttle timetable instead of a monorail.",
  },
  {
    ...tripPrepProducts.hanedaLimousine,
    why: "The Haneda listing names Tokyo Disney Resort among its destinations, so it is the airport run that ends at the resort rather than at a city station you then have to leave again with the luggage.",
  },
  {
    ...tripPrepProducts.naritaLimousine,
    why: "Coming in from Narita, the same Airport Limousine operator runs to the central Tokyo hotel and station stops with hold luggage; check the stop list for your date before you book, because the destinations differ by route.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Your passport is a QR code linked into the official Tokyo Disney Resort app, and the app is also where in-park features are managed on the day — none of which works on a phone waiting for hotel Wi-Fi.",
  },
];

// ---------------------------------------------------------------------------
// Kansai rail passes, added 25 Oct 2026 for the kansai-area-pass entry guide.
//
// Both sit in Klook's 5% passes-and-transport band. Klook answers automated reads
// of /activity/ pages with HTTP 403, so both were confirmed as live en-US listings
// through the www.klook.com search index on 25 Oct 2026 ("JR-West Kansai Rail Pass
// - Klook US" and "JR Kansai Mini Pass - Klook"). No price appears on either: the
// guide prints JR West's own published fares instead, which is also the only place
// the 1 October 2026 switch from the paper pass to the WEST QR version is visible.
// ---------------------------------------------------------------------------

export const jrKansaiAreaPass: KlookTour = {
  title: "JR-West Kansai Rail Pass (1–4 day)",
  desc: "The Kansai Area Pass as Klook sells it — unlimited JR West local, rapid and special rapid trains around Osaka, Kyoto, Kobe, Nara and Himeji, plus the Haruka from Kansai Airport",
  url: klookLink("https://www.klook.com/en-US/activity/1107-jr-west-kansai-rail-pass-osaka/"),
};

export const jrKansaiMiniPass: KlookTour = {
  title: "JR Kansai Mini Pass (3 day)",
  desc: "The cheaper three-day version for travellers who will not use the Haruka — rapid and local JR West trains only, with the Kansai-Airport Rapid Service",
  url: klookLink("https://www.klook.com/en-US/activity/18356-jr-kansai-mini-pass/"),
};

// ---------------------------------------------------------------------------
// Sagano Romantic Train and the Hozugawa boat, added 25 Oct 2026 for
// sagano-romantic-train-tickets.
//
// Klook answers automated reads of /activity/ pages with HTTP 403, so every
// listing below was confirmed live, on sale and in its en-US URL form through
// the www.klook.com search index on 25 Oct 2026. No price appears on any of
// them; the guide prints the operator's own ¥880 / ¥440 fare and the Kameoka
// City figures for the boat instead.
//
// Commission decides which of these is the headline CTA. A bare torokko seat is
// a rail ticket, not a tour, so it cannot be assumed to pay the 6.5%
// tours-and-activities band — which is why the page leads with the guided
// Sagano-plus-Hozugawa day (112332) and offers GetYourGuide beside the bare
// ticket. See lib/gyg-links.ts, `gygArashiyama` and `gygHozugawaKudari`.
// ---------------------------------------------------------------------------

/** The bare one-way torokko seat. Not the headline CTA — see the block comment. */
export const saganoRomanticTrainTicket: KlookTour = {
  title: "Sagano Romantic Train ticket",
  desc: "The one-way torokko seat itself, Torokko Saga to Torokko Kameoka, with the car and seat number chosen at checkout",
  url: klookLink("https://www.klook.com/en-US/activity/17066-sagano-romantic-train-ticket-kyoto/"),
};

/** The guaranteed-departure train-and-boat day — the headline CTA on that guide. */
export const saganoHozugawaGuaranteedTour: KlookTour = {
  title: "Sagano train, Hozugawa boat & Arashiyama walk",
  desc: "The guaranteed-departure version of the classic pairing — the torokko one way, the river boat back down to Arashiyama, and free time in the bamboo grove",
  url: klookLink("https://www.klook.com/en-US/activity/112332-kyoto-city-sagano-romantic-train-hozugawa-river-boat-ride-tour/"),
};

/** The half-day version of the same route, out of the Hozukyo gorge. */
export const arashiyamaHozukyoHalfDayTour: KlookTour = {
  title: "Arashiyama & Hozukyo gorge half-day tour",
  desc: "A half day pairing the Sagano Romantic Train with the Hozugawa-kudari boat and the Arashiyama landmarks, as one booking",
  url: klookLink("https://www.klook.com/en-US/activity/92794-arashiyama-hozukyo-gorge-half-day-landmark-tour-sagano-romantic-train-hozugawakudari-river-boat-ride/"),
};

/** Arashiyama with the torokko as an option — for a date the train may not run. */
export const arashiyamaSaganoOptionalTour: KlookTour = {
  title: "Arashiyama tour with optional Sagano Romantic Train ride",
  desc: "The bamboo grove and the Arashiyama stops with the torokko ride as a selectable add-on, which is the listing to open for a winter date",
  url: klookLink("https://www.klook.com/en-US/activity/131254-arashiyama-tour-with-optional-sagano-romantic-train-ride/"),
};

/** The coach half-day that adds Kiyomizu-dera to the torokko. */
export const saganoArashiyamaKiyomizuTour: KlookTour = {
  title: "Sagano Romantic Train, Arashiyama & Kiyomizu-dera half-day tour",
  desc: "A guided half day that puts the torokko ride, Arashiyama and Kiyomizu-dera in one coach itinerary",
  url: klookLink("https://www.klook.com/en-US/activity/74654-shinkibus-sagano-kyoto/"),
};

/** The Hozugawa boat on its own — the other half of the classic day. */
export const hozugawaRiverBoatTicket: KlookTour = {
  title: "Hozugawa River boat ride e-ticket",
  desc: "The two-hour boat down the gorge from Kameoka to Arashiyama, bought as a dated e-ticket rather than at the Kameoka pier window",
  url: klookLink("https://www.klook.com/en-US/activity/74947-kyoto-arashiyama-hozugawa-river-boat-ride/"),
};

// ---------------------------------------------------------------------------
// Arima Onsen, added 25 Oct 2026 for arima-onsen-day-trip.
//
// Same verification rule as every block above: Klook answers automated reads of
// its /activity/ pages with HTTP 403, so each listing was confirmed live, on sale
// and in its en-US URL form through the www.klook.com search index on
// 25 Oct 2026. None carries a price — the guide prints Kin no Yu's, Gin no Yu's
// and Taiko no Yu's own published admissions and the West JR Bus fares instead.
//
// The day tours are in the 6.5% tours band and the Rokkosan Tourist Pass in the
// 5% passes-and-transport band, which is why a tour is the headline CTA. The
// Kin no Yu / Gin no Yu bus package (176847) is listed because it is the only
// Klook product that actually bundles the two city bathhouses with the coach.
// ---------------------------------------------------------------------------

/** Himeji, Arima and the Rokko deck in one day out of Osaka — the headline CTA. */
export const arimaHimejiRokkoDayTour: KlookTour = {
  title: "Himeji Castle, Arima Onsen & Mt. Rokko day tour from Osaka",
  desc: "A join-in coach day out of Osaka taking in Himeji Castle, the Arima Onsen town and the Mt. Rokko observation deck",
  url: klookLink("https://www.klook.com/en-US/activity/94348-himeji-castle-arima-onse-mt-rokko-day-tour-osaka/"),
};

/** The evening version — outlet, onsen town, then the Rokko night view. */
export const arimaRokkoNightViewDayTour: KlookTour = {
  title: "Sanda outlets, Arima Onsen & Mt. Rokko night view day trip",
  desc: "The late-finishing version from Osaka, listed with a Chinese, English and Japanese-speaking guide and a guaranteed departure from two people",
  url: klookLink("https://www.klook.com/en-US/activity/141670-kobe-outlet-arima-onsen-mt-rokko-night-view-day-tour-from-osaka/"),
};

/** The bus day built around the Rokko ropeway and the onsen town itself. */
export const arimaRokkoOutletBusTour: KlookTour = {
  title: "Mt. Rokko view, Arima Onsen town & Premium Outlets 1-day bus tour",
  desc: "A coach day that puts the Rokko cable car and ropeway, the Arima Onsen streets and the outlet mall into one booking",
  url: klookLink("https://www.klook.com/en-US/activity/146094-mt-rokko-view-arima-onsen-town-premium-outlets-1day-bus-tour/"),
};

/** Walk over the mountain, bathe at the bottom — the one tour that includes a bath. */
export const rokkoHikingArimaBathingTour: KlookTour = {
  title: "Mt. Rokko forest hike & Arima Onsen bathing experience",
  desc: "A guided day from Osaka that walks the Rokko forest to the summit viewpoint over Osaka Bay and finishes in the Arima hot springs",
  url: klookLink("https://www.klook.com/en-US/activity/17680-mount-rokko-hiking-arima-onsen-bathing-osaka/"),
};

/** Taiko no Yu — the big day-spa, and the one with a published tattoo rule. */
export const arimaTaikoNoYuSpa: KlookTour = {
  title: "Arima Onsen Taiko no Yu day spa ticket",
  desc: "Admission to Arima's largest day-use bathing complex, with the gold and silver springs, the outdoor baths and the stone saunas on one ticket",
  url: klookLink("https://www.klook.com/en-US/activity/1417-arima-onsen-taikou-no-yu-spa-osaka/"),
};

/**
 * The only Klook product that bundles the two municipal bathhouses with the
 * coach. Worth its own constant because Kin no Yu and Gin no Yu are otherwise
 * cash-at-the-counter: there is no advance ticket for either on its own.
 */
export const arimaKinGinBusPackage: KlookTour = {
  title: "Arima Onsen Kin no Yu & Gin no Yu + round-trip express bus from Kobe",
  desc: "The two city bathhouses sold together with the non-stop round-trip coach from Kobe, valid for three days including the boarding date",
  url: klookLink("https://www.klook.com/en-US/activity/176847-arima-onsen-kin-no-yu-gin-no-yu-non-stop-expressway-bus-package-adult-round-trip-ticket-from-kobe/"),
};

/** Rokkosan Tourist Pass — the 5% band, and the independent traveller's route in. */
export const rokkosanTouristPass: KlookTour = {
  title: "Rokkosan Tourist Pass",
  desc: "The foreign-visitor pass for getting to and around Mt. Rokko — the cable car, the Rokko Sanjo buses and the attraction discounts on the mountain above Arima",
  url: klookLink("https://www.klook.com/en-US/activity/5631-rokkosan-tourist-pass-osaka/"),
};

// ---------------------------------------------------------------------------
// Himeji Castle, added 25 Oct 2026 for himeji-castle-day-trip.
//
// Same verification rule as the blocks above: Klook answers automated reads of
// its /activity/ pages with HTTP 403, so each listing below was confirmed live,
// on sale and in its en-US URL form through the www.klook.com search index on
// 25 Oct 2026. No price appears on any of them — the guide prints Himeji City's
// own ¥2,500 / ¥2,600 admissions instead.
//
// One finding worth recording here rather than only in the article: Klook has no
// standalone Himeji Castle admission ticket. Every Himeji listing is a tour, and
// Klook's own Himeji Castle destination page states that the castle's entrance
// fee is paid on site. The advance route for admission is Himeji City's own
// time-slot digital ticket, which the guide links instead. That is also why the
// headline CTA here is a 6.5% tour and the secondary CTA a 5% rail pass.
// ---------------------------------------------------------------------------

/** The plainest Himeji day out of Osaka — castle-first, no onsen detour. */
export const himejiCastleOsakaBusTour: KlookTour = {
  title: "Himeji & Himeji Castle join-in one-day bus tour from Osaka",
  desc: "A join-in coach day from Osaka built around Himeji Castle itself rather than around a wider Hyogo circuit",
  url: klookLink("https://www.klook.com/en-US/activity/82959-himeji-himeji-castle-join-one-day-bus-tour-osaka/"),
};

/** Castle, garden and the mountain temple — the full Himeji day. */
export const himejiEngyojiKokoenDayTour: KlookTour = {
  title: "Himeji Castle, Engyoji Temple & Koko-en one-day landmark trip",
  desc: "The castle, the Koko-en garden next door and the mountain-top Engyoji complex above the city in one private day",
  url: klookLink("https://www.klook.com/en-US/activity/87869-himeji-castle-engyoji-temple-koko-en-1-day-landmark-trip/"),
};

/** A guide for the keep and the garden, for people arriving under their own steam. */
export const himejiCastleKokoenGuidedTour: KlookTour = {
  title: "Himeji Castle & Koko-en Garden 3.5-hour guided tour",
  desc: "A guided walk of the castle and the garden starting in Himeji — the version for travellers who get themselves there by train",
  url: klookLink("https://www.klook.com/en-US/activity/190808-himeji-himeji-castle-kokoen-garden-3-5-hour-guided-tour/"),
};

/** The castle town rather than the keep — a half day on a bike. */
export const himejiCastleTownBikeTour: KlookTour = {
  title: "Himeji castle-town join-in day bike tour",
  desc: "The streets, moats and samurai quarters around the castle by bicycle, for a second visit or an afternoon after the keep",
  url: klookLink("https://www.klook.com/en-US/activity/106463-himeji-castle-town-join-day-bike-tour/"),
};

/**
 * The 5% band alternative to a tour, and the only pass that covers the Sanyo
 * Shinkansen leg into Himeji (Shin-Osaka–Okayama). The Kansai Area Pass above
 * covers the special rapid but not the bullet train.
 */
export const jrKansaiWideAreaPass: KlookTour = {
  title: "JR West Kansai WIDE Area Pass (5 day)",
  desc: "The wider JR West pass as Klook sells it — the one that includes Sanyo Shinkansen seats between Shin-Osaka and Okayama, which is the fast way into Himeji",
  url: klookLink("https://www.klook.com/en-US/activity/3277-5-day-kansai-wide-area-jr-pass/"),
};

// ---------------------------------------------------------------------------
// Ski days and ski rental, added 25 Oct 2026 for japan-ski-travel-insurance.
//
// Confirmed the same way: live, on sale and in en-US URL form through the
// www.klook.com search index on 25 Oct 2026. The day trips and the rental
// packages both sit in the 6.5% tours-and-activities band; the bare GALA lift
// ticket is a ticket, so it is listed as a secondary link rather than a CTA.
//
// Deliberately not used: /activity/8768 (GALA Yuzawa Snow Resort Day Tour). Its
// indexed slug carries a trailing space that Klook itself serves URL-encoded, so
// the plain en-US form cannot be written reliably. 140645 covers the same day.
// ---------------------------------------------------------------------------

/** A Tokyo-based ski day on the Joetsu shinkansen side — the easiest first day. */
export const galaNaebaSkiDayTripTokyo: KlookTour = {
  title: "GALA Yuzawa / Naeba ski resort day trip from Tokyo",
  desc: "A winter-season day trip from Tokyo to the Yuzawa resorts by chartered car, with the resort chosen at booking",
  url: klookLink("https://www.klook.com/en-US/activity/140645-galayuzawa-naeba-day-tour-by-chartered-car/"),
};

/** Hakuba in a day from Tokyo, with the resort selectable. */
export const hakubaSkiResortDayTourTokyo: KlookTour = {
  title: "Nagano Hakuba ski resort day trip from Tokyo",
  desc: "A one-day Hakuba Valley trip out of Tokyo with a choice of four resorts, lift ticket and equipment rental in the booking",
  url: klookLink("https://www.klook.com/en-US/activity/138485-nagano-hakuba-ski-resort-4-ski-resorts-available-tour-from-tokyo/"),
};

/** The Happo-one package — coach, gondola pass and gear in one checkout. */
export const hakubaHapponeBusLiftRental: KlookTour = {
  title: "Hakuba Happo-one: round-trip bus from Tokyo + lift ticket + rental",
  desc: "Happo-one's common gondola and lift ticket bundled with the round-trip coach from Tokyo and a ski or snowboard set",
  url: klookLink("https://www.klook.com/en-US/activity/176696-hakuba-happo-one-snow-resort-common-lift-ticket-equipment-rental/"),
};

/** Niseko rental — the Hirafu shop, for the Hokkaido half of a ski trip. */
export const nisekoSkiSnowboardRental: KlookTour = {
  title: "Niseko ski & snowboard rental (Rhythm, Hirafu)",
  desc: "Ski or snowboard, boots and outerwear reserved before you fly, collected in Hirafu at the foot of the Niseko lifts",
  url: klookLink("https://www.klook.com/en-US/activity/126937-niseko-rental-ski-or-snowboard-rental-ski-wear/"),
};

/** Hakuba rental by the day, one to seven days. */
export const hakubaSkiSnowboardRental: KlookTour = {
  title: "Hakuba ski & snowboard rental, 1–7 day package",
  desc: "A Hakuba Village rental package priced by the number of days, booked ahead rather than queued for on the morning",
  url: klookLink("https://www.klook.com/en-US/activity/116262-hakuba-ski-snowboard-rentals-1-7-days-package/"),
};

/** The Spicy shops — five branches across the Hakuba valley. */
export const spicyHakubaSkiRental: KlookTour = {
  title: "Spicy ski & snowboard set rental (Hakuba, Nagano)",
  desc: "Ski and snowboard sets from the Spicy shops in Happo, Iwatake, Tsugaike, Echoland and Wadano, reserved in advance",
  url: klookLink("https://www.klook.com/en-US/activity/103260-spicy-ski-set-snowboard-set-rental-nagano-hakuba/"),
};

/** The bare GALA Yuzawa lift ticket — a ticket, so a secondary link, not a CTA. */
export const galaYuzawaLiftTicket: KlookTour = {
  title: "GALA Yuzawa ski resort lift ticket",
  desc: "The lift ticket on its own for the resort you can reach from Tokyo Station on the Joetsu shinkansen without a transfer",
  url: klookLink("https://www.klook.com/en-US/activity/99585-everyone-beginners-experts-adults-children-enjoy-playing-snow/"),
};

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

// ---------------------------------------------------------------------------
// Ten days in Japan, added 26 Oct 2026 for japan-10-day-itinerary.
//
// No new URLs at all. Every entry below reads its destination page out of
// `tokyoStayAreas`, `kyotoStayAreas` or `osakaStayAreas`, so there is still one
// source of truth per Klook destination id and the ten-day page cannot drift
// away from the city transport guides.
//
// What is new is the `why` line. A ten-day trip is four Tokyo nights, three
// Kyoto nights and two Osaka nights, with one mountain day wedged between the
// first two — which is a different argument from the seven-day plan's three
// bases. Three Kyoto nights are what earn Gion a place here: at two nights the
// premium is on being at the shinkansen end of the city, and at three it is not.
// ---------------------------------------------------------------------------

export const japanTenDayStayAreas: KlookStayArea[] = [
  {
    area: "Shinjuku, Tokyo",
    why: "Four Tokyo nights can afford a base chosen for the day out rather than for the airport: the Kawaguchiko and Fuji highway buses and the Odakyu line to Hakone all leave from under this station, and the Yamanote loop is at the door.",
    url: tokyoStayAreas[0].url,
  },
  {
    area: "Tokyo Station / Marunouchi, Tokyo",
    why: "The base that costs you least on the Day 6 move: the Tokaido Shinkansen to Kyoto leaves from beneath it, so the morning you change cities is a lift rather than a cross-town journey with the cases.",
    url: tokyoStayAreas[1].url,
  },
  {
    area: "Ueno / Asakusa, Tokyo",
    why: "Ueno is on the Yamanote loop with the Ginza Line running to Asakusa, which is a whole day of this plan — and the Keisei Skyliner from Narita arrives on this side of the city faster than anywhere else.",
    url: tokyoStayAreas[2].url,
  },
  {
    area: "Kyoto Station, Kyoto",
    why: "Where the shinkansen puts you down and where the 100 and 101 sightseeing buses start — and the station the Nara trains and the airport Haruka leave from, which is two of the three Kyoto days.",
    url: kyotoStayAreas[0].url,
  },
  {
    area: "Shijo-Kawaramachi / Karasuma, Kyoto",
    why: "The one point the Karasuma and Tozai subway lines cross, with Pontocho, Nishiki Market and the Hankyu and Keihan lines to Osaka on foot — the better base if you want the evenings as well as the temples.",
    url: kyotoStayAreas[1].url,
  },
  {
    area: "Gion / Higashiyama, Kyoto",
    why: "Only worth it at three nights, and then it is the best of the three: the 100 bus from Kyoto Station and the Tozai Line both reach it, and Kiyomizu-dera is a walk rather than a bus ride at six in the morning.",
    url: kyotoStayAreas[2].url,
  },
  {
    area: "Namba, Osaka",
    why: "Midosuji Line, Dotonbori and Kuromon Market on foot, and the Nankai terminus — so the last morning's run to Kansai Airport starts under your hotel instead of after a change with the luggage.",
    url: osakaStayAreas[1].url,
  },
  {
    area: "Umeda, Osaka",
    why: "The northern Midosuji hub, joined to Osaka Station: the stop to pick if you come down from Kyoto by JR or Hankyu, or if a Himeji or Kobe day is going on the end of the Osaka leg.",
    url: osakaStayAreas[0].url,
  },
];

// ---------------------------------------------------------------------------
// Tokyo winter illuminations and the night tours around them, added
// 26 Oct 2026 for tokyo-illumination-tours.
//
// Klook answers automated reads of its /activity/ pages with HTTP 403, so every
// listing below was confirmed live, on sale and in its en-US URL form through
// the www.klook.com search index on 26 Oct 2026. No price appears on any of
// them; the guide prints the venues' own published admissions instead.
//
// Commission decides the order. The night tours and the bay cruises are in the
// 6.5% tours-and-activities band and are the headline CTAs. The two paid
// illumination admissions (Tokyo Mega Illumi, Yomiuriland) are tickets, so they
// cannot be assumed to pay that band — which is why GetYourGuide's Tokyo
// entry-ticket listing sits beside them on the page. See lib/gyg-links.ts,
// `gygTokyoEntryTickets`.
//
// Deliberately not used: Klook has no standalone listing for any of the free
// street displays — Marunouchi, Keyakizaka, Midtown, Yebisu Garden Place — which
// is the right answer, because none of them sells a ticket. The guide says so.
// ---------------------------------------------------------------------------

/** The evening join-in walk — the headline 6.5% CTA on the illumination guide. */
export const tokyoNightTourAkihabaraShibuya: KlookTour = {
  title: "Tokyo night tour: Ueno, Akihabara, Shibuya & karaoke",
  desc: "A guided evening listed at 4 hours 50 minutes from Ueno Station through Akihabara to the Shibuya crossing, with train fares between the stops included",
  url: klookLink("https://www.klook.com/en-US/activity/140853-tokyo-night-tour-akihabara-shibuya-karaoke-city-lights/"),
};

/** The open-top bus loop — the route is the illumination corridor, end to end. */
export const tokyoOpenTopBusSightseeing: KlookTour = {
  title: "Tokyo open-top sightseeing bus (70 minutes)",
  desc: "A 70-minute open-top loop the listing routes past Tokyo Station, Marunouchi, Akasaka, Meiji Jingu Gaien, Roppongi, Tokyo Tower and Ginza, with recorded guidance in six languages",
  url: klookLink("https://www.klook.com/en-US/activity/89277-tokyo-city-open-top-bus-sightseeing-bus-trip/"),
};

/** Hop-on hop-off, for an evening that visits three districts rather than one. */
export const skyhopHopOnHopOffBus: KlookTour = {
  title: "Hop-on hop-off Tokyo bus (Skyhop Bus)",
  desc: "An open-top hop-on hop-off ticket across the Asakusa, Odaiba and Roppongi–Shibuya courses, which is the version to buy if the evening has more than one stop in it",
  url: klookLink("https://www.klook.com/en-US/activity/87165-sky-hop-on-hop-off-bus-tokyo/"),
};

/** Tokyo Mega Illumi at Oi Racecourse — the one ticketed display Klook sells. */
export const tokyoMegaIllumiTicket: KlookTour = {
  title: "Tokyo Mega Illumi ticket (Oi Racecourse)",
  desc: "Admission to the winter-only display on the Oi Racecourse infield, which the listing describes with a fountain show, an aurora area and a 100-metre light tunnel",
  url: klookLink("https://www.klook.com/en-US/activity/77518-tokyo-mega-illumi/"),
};

/** Yomiuriland — the Jewellumination is inside the park, so this is the ticket. */
export const yomiurilandTicket: KlookTour = {
  title: "Yomiuriland admission ticket",
  desc: "The Inagi amusement park's own admission, which is what the Jewellumination is seen on — the display is inside the park rather than beside it",
  url: klookLink("https://www.klook.com/en-US/activity/20251-yomiuriland-admission-ticket-tokyo/"),
};

/** The plain bay sunset sailing — no meal, and it ends after the lights come on. */
export const tokyoBaySunsetCruise: KlookTour = {
  title: "Tokyo Bay sunset cruise",
  desc: "A bay sailing the listing times for the hour the city changes over, past Rainbow Bridge, Tokyo Tower and the Odaiba waterfront",
  url: klookLink("https://www.klook.com/en-US/activity/8948-tokyo-bay-sunset-cruise-tokyo/"),
};
