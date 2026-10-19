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
