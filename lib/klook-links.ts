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
