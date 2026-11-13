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

/**
 * A Klook page URL with our affiliate id appended — the format Klook documents.
 *
 * This is no longer the URL a reader clicks. Since 27 Oct 2026 every Klook
 * anchor goes through components/KlookLink.tsx, which rebuilds whatever is in
 * this file into an `affiliate.klook.com/redirect` URL carrying the ad id of
 * the page the link sits on — the only way Klook's report can say which article
 * made a booking. See lib/klook-adids.ts. The `?aid=` form survives as the
 * product URL these constants hold, and as the fallback for a page that has no
 * ad id yet; the `aid` is stripped before the URL goes into `k_site`.
 */
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
 *
 * Re-read in a browser on 6 Nov 2026. The listing's from-price, rating and network
 * are in lib/klook-esim-facts.ts. The from-price names no plan, so `priceVerified`
 * stays false: there is still no per-plan price to rank.
 */
export const klookEsim = {
  name: "Klook Japan eSIM",
  /** Title as the Klook listing itself is named. */
  listingTitle: "eSIM Japan | Softbank 5G / IIJ (Docomo) 4G LTE",
  url: klookLink("https://www.klook.com/en-US/activity/109393-japan-esim-high-speed-internet-qr-code-voucher/"),
  ctaLabel: "Check Klook eSIM prices →",
  /** Set true only once prices and data tiers have been read off the listing. */
  priceVerified: false,
  /** What the price/data columns show while `priceVerified` is false. */
  priceUnknownLabel: "Check on Klook",
  /** The date the listing was last attempted — shown next to the placeholder. */
  checkedAt: "19 Oct 2026",
  /** The date the `spec*` fields below were confirmed in Klook's search index. */
  specsCheckedAt: "6 Nov 2026",
  /** Carriers the listing names, and which plan family rides which. */
  specNetwork: "SoftBank 5G (per-day plans) / IIJ (Docomo) 4G LTE (total-data plans)",
  /** Allowance tiers the listing names. No price attaches to any of them here. */
  specData: "500 MB to 50 GB, plus per-day and unlimited plans (unlimited: 10 GB/day at high speed, then 128 kbps)",
  /** The listing states hotspot and tethering are supported. */
  specTethering: "Supported",
  /** The listing states the service type is data only. */
  specPhoneNumber: "No — data only",
  note:
    "Klook sells a Japan eSIM of its own, rated 4.6 (50K+ reviews) with 2M+ booked, on SoftBank 5G and IIJ (Docomo). Tethering is allowed, and unlimited plans run at high speed up to 10 GB a day. It is worth a look if you are already booking tickets or transport there: one checkout, one account. Klook shows from US$1.05 before you choose days and data, and does not say which plan that is, so we list it unranked. Listing read 6 Nov 2026.",
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

/**
 * Where to stay in Tokyo, added 26 Oct 2026 for where-to-stay-in-tokyo.
 *
 * The first four entries are `tokyoFiveDayStayAreas` verbatim — Shinjuku, Tokyo
 * Station, Ueno/Asakusa and Shibuya — so there is one source of truth per Klook
 * destination id and this page cannot drift away from the itineraries.
 *
 * Ginza is the fifth and the only new destination id here. It earns its place on
 * an area-comparison page in a way it does not on a three- or five-day plan: it
 * is the one central area that is a subway base rather than a JR one (Ginza,
 * Marunouchi and Hibiya lines), and the Keikyu–Toei through service puts
 * Higashi-ginza 23 minutes from Haneda Terminal 3 without a change. The hotel
 * search p50061911-ginza was confirmed as a live en-US page — "Best hotels near
 * Ginza, Japan 2026" — through the www.klook.com search index on 26 Oct 2026.
 *
 * Shinagawa was considered and dropped: Klook has a `shinagawa-station`
 * destination page but its `/3-hotel/` variant could not be confirmed in the
 * en-US search index, and an unconfirmed id is worse than a shorter list.
 */
export const whereToStayTokyoAreas: KlookStayArea[] = [
  ...tokyoFiveDayStayAreas,
  {
    area: "Ginza",
    why: "Three subway lines (Ginza, Marunouchi, Hibiya) and one stop from Tokyo Station on the Marunouchi Line, with the Keikyu–Toei through train reaching Higashi-ginza from Haneda without a change.",
    url: klookLink("https://www.klook.com/en-US/destination/p50061911-ginza/3-hotel/"),
  },
];

/**
 * Where to stay in Osaka, added 26 Oct 2026 for where-to-stay-in-osaka.
 *
 * The first three are `osakaStayAreas` verbatim — Umeda, Namba and Tennoji, the
 * three Midosuji Line hubs — so the destination ids stay in one place.
 *
 * Universal City is the fourth and the only new id. A "where to stay" page has to
 * answer the USJ question, and it is the one Osaka area whose argument has nothing
 * to do with the Midosuji Line: the park is a five-minute walk from Universal City
 * Station on the JR Yumesaki Line, which no Osaka Metro pass covers. Klook's hotel
 * search for the park, p50014852-universal-studios-japan, was confirmed as a live
 * en-US page — "Best hotels near Universal Studios Japan, Japan 2026" — through the
 * www.klook.com search index on 26 Oct 2026.
 */
export const whereToStayOsakaAreas: KlookStayArea[] = [
  ...osakaStayAreas,
  {
    area: "Universal City",
    why: "Walking distance to the Universal Studios Japan gates, which is the one thing no Osaka Metro pass or Midosuji base can buy you — the park is reached on the JR Yumesaki Line, not the subway.",
    url: klookLink("https://www.klook.com/en-US/destination/p50014852-universal-studios-japan/3-hotel/"),
  },
];

/**
 * Where to stay for a Universal Studios Japan day, added 26 Oct 2026 for
 * usj-tickets-express-pass.
 *
 * No new URLs: Universal City is `whereToStayOsakaAreas[3]` and the three Midosuji
 * hubs are `osakaStayAreas` verbatim, so every destination id still has one home.
 *
 * What is new is the order and the argument. The city transport guides rank these
 * areas by the Midosuji Line, which is the wrong axis for this page — the park is on
 * the JR Yumesaki Line and no Osaka Metro pass reaches it. So Universal City leads,
 * then the two JR-side bases, then Namba for anyone flying out of Kansai. The walk
 * and the Osaka Station figure in the `why` lines are the Osaka Convention & Tourism
 * Bureau's own, read on discover.osaka-info.jp on 26 Oct 2026; the Rapi:t minimum is
 * Nankai's, read on nankai.co.jp the same day.
 */
export const usjStayAreas: KlookStayArea[] = [
  {
    area: "Universal City",
    why: "The park gates are approximately five minutes on foot from Universal City Station, on the Osaka Convention & Tourism Bureau's own figure — which is the whole point of this area on a day you want to be at the gates before opening.",
    url: whereToStayOsakaAreas[3].url,
  },
  {
    area: "Umeda / Osaka Station",
    why: "Where the Yumesaki through services leave from: the Bureau puts the park at about 20 minutes from Osaka Station, and you stay on the main JR network — the Kyoto and Kobe lines, the Loop Line and the shinkansen at Shin-Osaka — for the rest of the trip.",
    url: osakaStayAreas[0].url,
  },
  {
    area: "Tennoji",
    why: "The cheaper JR-side base and the first city stop on the HARUKA from Kansai Airport; the Loop Line gets you to Nishikujo for the Yumesaki change without crossing the city centre.",
    url: osakaStayAreas[2].url,
  },
  {
    area: "Namba",
    why: "The pick if the park is one day of a wider Osaka trip: Dotonbori and Kuromon Market on foot, and the Nankai terminus — Nankai puts the Rapi:t at a minimum of 34 minutes out to Kansai Airport on the day you fly home.",
    url: osakaStayAreas[1].url,
  },
];

/**
 * Where to stay in Kyoto, added 26 Oct 2026 for where-to-stay-in-kyoto.
 *
 * The first three are `kyotoStayAreas` verbatim — Kyoto Station, Karasuma
 * Oike/Shijo and Gion/Higashiyama — so the destination ids stay in one place and
 * this page cannot drift away from the Kyoto transport guide.
 *
 * Arashiyama is the fourth and the only new id. It earns a place on an
 * area-comparison page that it does not earn on a two- or three-night itinerary:
 * it is the one Kyoto base that is not reached by city bus or municipal subway at
 * all — the JR Sagano Line and the Keifuku Randen serve it, and the official Kyoto
 * travel guide puts Kyoto Station to Saga-Arashiyama at about 11 minutes by JR.
 * Klook's hotel search p50199665-arashiyama was confirmed as a live en-US page —
 * "Best hotels near Arashiyama, Japan 2026" — through the www.klook.com search
 * index on 26 Oct 2026.
 *
 * Considered and dropped: Kawaramachi and Kiyomizu as separate ids. Klook's
 * Karasuma Oike and Gion searches already cover those two walks, and a second id
 * for the same few streets would split the same inventory across two links.
 */
export const whereToStayKyotoAreas: KlookStayArea[] = [
  ...kyotoStayAreas,
  {
    area: "Arashiyama",
    why: "The one Kyoto base the city buses and the two subway lines do not reach — it is the JR Sagano Line and the Keifuku Randen instead, which puts the bamboo grove and Togetsukyo on foot before the day-trip crowds arrive.",
    url: klookLink("https://www.klook.com/en-US/destination/p50199665-arashiyama/3-hotel/"),
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

/**
 * Street Kart's two named Tokyo go-kart listings, added 7 Nov 2026 for the booking
 * CTAs on /guides/attractions/tokyo-go-kart. Both URLs were confirmed in the
 * www.klook.com search index that day. 133849 is the Shibuya Annex tour that has
 * been converting; the shop's own page (course H2-S) is the source of the route.
 */
export const shibuyaAnnexGoKartTour: KlookTour = {
  title: "Street Kart go-kart tour in Shibuya Annex",
  desc: "About an hour on public roads from the Shibuya Annex shop, through Shibuya Crossing, Omotesando and Harajuku",
  url: klookLink("https://www.klook.com/en-US/activity/133849-street-kart-go-kart-tour-in-shibuya-annex/"),
};

export const akihabaraGoKartTour: KlookTour = {
  title: "Street go-kart experience in Akihabara",
  desc: "About an hour from Akihabara, on a route through Tokyo Station and Ginza",
  url: klookLink("https://www.klook.com/en-US/activity/98308-street-go-kart-experience-akihabara/"),
};

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

/**
 * Tokyo Tower — added 8 Nov 2026 (task-jtk-20261108-R04). The admission is a
 * ticket, so it cannot be assumed to pay more than the 2% ticket band; the
 * evening around it is where the 6.5% tours (bay sunset cruise, night tour,
 * day bus tour), the 5% subway ticket and the 20% eSIM sit. Every url reads
 * out of a constant declared elsewhere in this file — no new Klook ids. The
 * bay cruise and night tour were confirmed in the www.klook.com search index
 * in en-US form on 26 Oct 2026; the bus tour and subway ticket already render
 * on the Tokyo Tower page.
 */
export const tokyoTowerTripPrep = (): KlookTripPrepItem[] => [
  {
    label: tokyoBaySunsetCruise.title,
    ctaLabel: "Check the bay sunset cruise →",
    url: tokyoBaySunsetCruise.url,
    why: "The listing routes the sailing past Rainbow Bridge and Tokyo Tower at the hour the city lights come on — the view of the tower from the water, before or after the view from it.",
  },
  {
    label: tokyoNightTourAkihabaraShibuya.title,
    ctaLabel: "Check the Tokyo night tour →",
    url: tokyoNightTourAkihabaraShibuya.url,
    why: "A guided evening from Ueno through Akihabara to the Shibuya crossing — the other half of a night out if your deck visit is a daytime one.",
  },
  {
    label: tokyoSightseeingBusTour.title,
    ctaLabel: "Check the Tokyo bus day tour →",
    url: tokyoSightseeingBusTour.url,
    why: "A guided daytime loop of the Imperial Palace gardens, Asakusa and Tokyo Skytree, which leaves the evening free for the tower's late hours.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Akabanebashi, Onarimon, Kamiyacho, Shibakoen and Daimon — five of the six stations on Tokyo Tower's own access page — are Toei or Metro stops, so a 24, 48 or 72-hour ticket covers the trip there.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Top Deck Tour tickets are sold online for a set date and time, and a booked slot cannot be changed afterwards — data from the day you land lets you check the weather and book from the street rather than the hotel Wi-Fi.",
  },
];

/**
 * Hotels around Roppongi Station (6.5%) — added 13 Nov 2026 (task-jtk-20261113-R01)
 * for the teamLab Borderless "book the same day" slot. Klook has no Azabudai Hills
 * hotel destination page; the Roppongi Station one (p50048776) was confirmed as a
 * live en-US page through the www.klook.com search index on 13 Nov 2026.
 * Roppongi-itchome, one of the museum's two connected stations, is next door.
 */
export const roppongiHotels: KlookTour = {
  title: "Hotels near Roppongi Station",
  desc: "Klook's hotel search around Roppongi, the district next to Azabudai Hills",
  url: klookLink("https://www.klook.com/en-US/destination/p50048776-roppongi/3-hotel/"),
};

/**
 * teamLab Borderless — the three things to book alongside a timed slot: a bed
 * near Azabudai Hills (6.5%), the subway pass for Kamiyacho / Roppongi-itchome
 * (5%) and the eSIM (20%). The ticket constant itself stays where it is.
 * The `why` lines are English; translated pages pass their own.
 */
export const teamlabBorderlessTripPrep = (): KlookTripPrepItem[] => [
  {
    label: roppongiHotels.title,
    ctaLabel: "Check Roppongi hotels on Klook →",
    url: roppongiHotels.url,
    why: "Roppongi-itchome connects to the museum underground, so a room in this district turns an 08:30 first slot or a 20:00 last entry into a short walk rather than a cross-city ride.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Both access stations — Kamiyacho on the Hibiya line and Roppongi-itchome on the Namboku line — are Tokyo Metro stops, so a 24, 48 or 72-hour ticket covers the trip there and the rest of the day.",
  },
  {
    ...tripPrepProducts.esim,
    why: "An official ticket is a screen you open from the link in the confirmation email and show at the entrance, and a date change has to be made online at least 2 hours before your slot — both need data on the street, not only hotel Wi-Fi.",
  },
];

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
 * Nikko cultural day tour — moved here on 28 Oct 2026 from
 * pages/guides/attractions/nikko-day-trip.tsx for the same reason as the block
 * above: the ticket price table's day-tour section needed the link that guide
 * already used rather than a second one to the same product. URL unchanged,
 * `aff_adid` included; listing 20405 was confirmed live on 19 Oct 2026.
 */
export const nikkoCulturalDayTourUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1309223&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F20405-nikko-cultural-day-tour-tokyo%2F";

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
// Ghibli Park and LEGOLAND Japan, added 26 Oct 2026 — the first two Nagoya-area
// guides on this site.
//
// Klook answers automated reads of its /activity/ and /destination/ pages with
// HTTP 403, so every URL below was confirmed live, on sale and in its en-US form
// through the www.klook.com search index on 26 Oct 2026. No price appears on any
// of them, for that reason — and because both parks price by date in any case
// (Ghibli Park by weekday/weekend, LEGOLAND by calendar date), so the guides
// print the operators' own published figures instead.
//
// Commission decides which link is the headline CTA on each page. A bare park
// ticket cannot be assumed to pay the 6.5% tours-and-activities band, so:
//   - Ghibli Park leads with the Nagoya bus tour (98263) and the ticket-plus-hotel
//     package (91217), both of which are in the tours/hotels band, with the bare
//     ticket (132673) alongside them rather than above them.
//   - LEGOLAND leads with the LEGOLAND Japan Hotel package (26048), a hotel, with
//     the 1-Day Pass (44688) beside it.
// GetYourGuide sits next to the bare tickets on both pages — see lib/gyg-links.ts,
// `gygGhibliPark`, `gygLegolandJapan` and `gygNagoyaEntryTickets`.
// ---------------------------------------------------------------------------

/** The guided Nagoya day that includes Ghibli Park — a tour, so the 6.5% band. */
export const ghibliParkNagoyaBusTour: KlookTour = {
  title: "Ghibli Park & Aichi Museum of Flight bus tour from Nagoya",
  desc: "A join-in coach day out of Nagoya that pairs Ghibli Park with the Aichi Museum of Flight, so the Linimo connection is somebody else's problem",
  url: klookLink("https://www.klook.com/en-US/activity/98263-ghibli-park-aichi-museum-flight-join-one-day-bus-tour-nagoya/"),
};

/** Ticket plus a night at Hotel Keihan Nagoya — an accommodation package, 6.5%. */
export const ghibliParkTicketHotelPackage: KlookTour = {
  title: "Ghibli Park ticket + Hotel Keihan Nagoya, 1 night / 2 days",
  desc: "The park ticket sold together with a night at Hotel Keihan Nagoya by the station — the version to book if a 9 a.m. Grand Warehouse slot means an early start",
  url: klookLink("https://www.klook.com/en-US/activity/91217-1n2d-ghibli-park-nagakute-tour-from-nagoya/"),
};

/**
 * The bare Ghibli Park ticket. Klook is one of only two sellers the park's own
 * English ticket page names for overseas buyers, which is why it is on this page
 * at all — but it is a park admission, so it is not the headline CTA.
 */
export const ghibliParkTicket: KlookTour = {
  title: "Ghibli Park ticket",
  desc: "The O-Sanpo Day Pass itself, with the Ghibli's Grand Warehouse entry time chosen at checkout — one of the two sellers the park's own English ticket page names for overseas buyers",
  url: klookLink("https://www.klook.com/en-US/activity/132673-ghibli-park-ticket/"),
};

/** LEGOLAND Japan Hotel with the park — a hotel package, so the headline CTA. */
export const legolandJapanHotelPackage: KlookTour = {
  title: "LEGOLAND Japan Hotel stay",
  desc: "An overnight in one of the hotel's themed rooms with breakfast, at the resort beside the park gates — the booking that turns a 10:00–17:00 park into two mornings",
  url: klookLink("https://www.klook.com/en-US/activity/26048-legoland-japan-hotel/"),
};

/** The 1-Day Pass, with the SEA LIFE combo and the Skip Pass bundles on the same listing. */
export const legolandJapanTicket: KlookTour = {
  title: "LEGOLAND® Japan ticket",
  desc: "The 1-Day Pass, with the SEA LIFE Nagoya combo and the Skip Pass bundles selectable on the same listing, entered on a mobile QR code",
  url: klookLink("https://www.klook.com/en-US/activity/44688-legoland-japan-nagoya/"),
};

/** The Skip Pass on its own, for a queue on a school-holiday date. */
export const legolandJapanSkipPass: KlookTour = {
  title: "LEGOLAND® Japan Skip Pass",
  desc: "The queue-skip pass sold separately from admission, in a three-ride pack or unlimited — the thing to add to a date in a Japanese school holiday",
  url: klookLink("https://www.klook.com/en-US/activity/12343-legoland-japan-skip-pass-nagoya/"),
};

/**
 * Where to stay for a Nagoya-area park day. Two ids, and they answer different
 * questions: the Ghibli Park search returns the Nagakute and Seto hotels out by
 * the Linimo, and the Nagoya city search returns the ones at the station the
 * subway and the shinkansen both leave from.
 *
 * Both were confirmed as live en-US pages through the www.klook.com search index
 * on 26 Oct 2026 — "Best hotels near Ghibli Park, Japan 2026" and "Hotels in
 * Nagoya, Japan".
 */
export const nagoyaParkStayAreas: KlookStayArea[] = [
  {
    area: "Nagoya Station",
    why: "Where both park runs start: the Higashiyama subway line to Fujigaoka for the Linimo, and the Aonami Line to Kinjofuto, which Aonami puts at 24 minutes and ¥360 — and the Tokaido Shinkansen arrives in the same building.",
    url: klookLink("https://www.klook.com/en-US/destination/c71-nagoya/3-hotel/"),
  },
  {
    area: "Around Ghibli Park (Nagakute / Seto)",
    why: "The hotels out by the Linimo rather than in the city, which is the choice worth making for a 9 a.m. Ghibli's Grand Warehouse entry time — the park is outside Exit 2 of Ai-Chikyuhaku Kinen Koen station.",
    url: klookLink("https://www.klook.com/en-US/destination/p50189091-ghibli-park/3-hotel/"),
  },
];

/**
 * Shoryudo Highway Bus Pass — the 5% passes-and-transport band, and the one Klook
 * transport product that covers the region both of these parks sit in. Confirmed
 * as a live en-US listing through the www.klook.com search index on 26 Oct 2026.
 */
export const shoryudoHighwayBusPass: KlookTour = {
  title: "Shoryudo Highway Bus Pass (3 or 5 day)",
  desc: "The foreign-visitor highway bus pass for the Chubu region out of Nagoya, with airport access tickets included — the 5% band alternative to buying each leg",
  url: klookLink("https://www.klook.com/en-US/activity/820-shoryudo-highway-bus-pass-nagoya/"),
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
  // Added 26 Oct 2026 for where-to-stay-in-kyoto and the two Nagoya park guides.
  kyotoNaraTour: {
    label: "Kyoto & Nara day trip (Kiyomizu-dera, Fushimi Inari & Nara Park)",
    ctaLabel: "Check the Kyoto–Nara day →",
    url: kyotoNaraKiyomizuTour.url,
  },
  kyotoHighlightTour: {
    label: "Kyoto one-day highlight bus tour",
    ctaLabel: "Check the Kyoto bus day →",
    url: kyotoHighlightBusTour.url,
  },
  hotelKyotoStation: {
    label: "Hotels around Kyoto Station",
    ctaLabel: "Check Kyoto Station hotels on Klook →",
    url: kyotoStayAreas[0].url,
  },
  hotelArashiyama: {
    label: "Hotels in Arashiyama",
    ctaLabel: "Check Arashiyama hotels on Klook →",
    url: whereToStayKyotoAreas[3].url,
  },
  hotelNagoya: {
    label: "Hotels around Nagoya Station",
    ctaLabel: "Check Nagoya hotels on Klook →",
    url: nagoyaParkStayAreas[0].url,
  },
  hotelGhibliPark: {
    label: "Hotels near Ghibli Park",
    ctaLabel: "Check Ghibli Park hotels on Klook →",
    url: nagoyaParkStayAreas[1].url,
  },
  ghibliBusTour: {
    label: "Ghibli Park & Aichi Museum of Flight bus tour from Nagoya",
    ctaLabel: "Check the Nagoya bus day →",
    url: ghibliParkNagoyaBusTour.url,
  },
  legolandHotel: {
    label: "LEGOLAND Japan Hotel stay",
    ctaLabel: "Check the hotel package →",
    url: legolandJapanHotelPackage.url,
  },
  shoryudoBusPass: {
    label: "Shoryudo Highway Bus Pass (3 or 5 day)",
    ctaLabel: "Check the Shoryudo pass →",
    url: shoryudoHighwayBusPass.url,
  },
  // Added 26 Oct 2026 for jr-pass-guide. Not a new URL: it reads the Umeda
  // destination page out of `tokyoKyotoOsakaStayAreas`, index 6, which is the
  // Osaka entry of the three-city stay list — the same id `osakaStayAreas[0]`
  // carries, so the JR Pass page and the city guides cannot drift apart.
  hotelOsakaUmeda: {
    label: "Hotels around Umeda / Osaka Station",
    ctaLabel: "Check Osaka Station hotels on Klook →",
    url: tokyoKyotoOsakaStayAreas[6].url,
  },
  // Added 27 Oct 2026 for japan-travel-budget — the first page on this site that
  // sells the pass as a line in a budget rather than as a rail decision, which is
  // why it needs the product here and not only on jr-pass-guide.
  jrPass: {
    label: "JAPAN RAIL PASS (7, 14 or 21 day)",
    ctaLabel: "Price the JR Pass on Klook →",
    url: jrPassWholeJapan.url,
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
  {
    ...tripPrepProducts.hanedaLimousine,
    why: "The Haneda side: a limousine bus with the cases in the hold rather than on your lap. Check that the listing's direction and stops match your hotel and flight before booking.",
  },
  {
    ...tripPrepProducts.esim,
    why: "At Narita, Haneda, Kansai and four other airports the customs confirmation can be done online through Visit Japan Web instead of at a terminal, which needs a working connection on your phone in the departure lobby.",
  },
];

/**
 * Currency Exchange — the reader is deciding where to change money, so each line is
 * a cost that can be settled in their own currency instead of out of the yen they
 * exchange on arrival. Hotels were added 22 Oct 2026: the room is the largest line
 * item of the trip and the one most clearly removable from the exchange question.
 */
export const currencyExchangeTripPrep: KlookTripPrepItem[] = [
  // Reordered 10 Nov 2026: the eSIM now sits above this list as the BookingEsimCard,
  // so the order runs airport access (5%) → passes (5%) → tour (6.5%) → hotel.
  {
    ...tripPrepProducts.naritaExpress,
    why: "The airport train is the first thing most people would otherwise pay for out of an arrival-hall exchange; a round trip booked ahead takes it off the yen you need on landing.",
  },
  {
    ...tripPrepProducts.skyliner,
    why: "If you only want to change a small float at the airport, book the train out in advance — the Skyliner reaches Nippori in 36 minutes and Keisei Ueno in about 41.",
  },
  {
    ...tripPrepProducts.naritaLimousine,
    why: "The coach alternative to the train, which drops at central Tokyo hotels and stations; paid ahead, it is another fare that does not come out of the cash you change.",
  },
  {
    ...tripPrepProducts.rapit,
    why: "The Kansai Airport version: a reserved seat from KIX to Namba, booked in your own currency instead of at the ticket counter after the exchange desk.",
  },
  {
    ...tripPrepProducts.subway,
    why: "A subway ticket bought before you fly is one fare you do not have to cover out of the yen you exchange on arrival.",
  },
  {
    ...tripPrepProducts.osakaPass,
    why: "The Osaka counterpart: the pass covers the city's subway lines and a set of admissions, all paid before you land rather than in cash at each gate.",
  },
  {
    ...tripPrepProducts.fujiHakoneTour,
    why: "A day tour is one of the larger single spends of a Tokyo trip, and booking it ahead keeps it on a card rather than in the cash budget.",
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
//
// Reworked 12 Nov 2026 (task F): the block moved up to sit under the page's first
// table, and gained the Haneda bus and Kansai Airport's Rapi:t so all three main
// airports are covered (5%), plus Shibuya Sky next to Skytree (6.5%). The eSIM
// line left this list because the page now renders BookingEsimCard (20%) directly
// under the block. No new Klook URL: every entry reuses an existing constant.
export const contactlessTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.skyliner,
    why: "Narita: Keisei's Skyliner is a reserved-seat limited express, and the seat is a separate purchase from the fare — a tap at the gate cannot book it for you.",
  },
  {
    ...tripPrepProducts.naritaLimousine,
    why: "Narita, by coach: the limousine bus runs to central hotels and stations with your luggage in the hold, and a seat booked ahead is one less thing to sort out in the arrivals hall.",
  },
  {
    ...tripPrepProducts.hanedaLimousine,
    why: "Haneda: the same coach service from all three terminals, for a first ride that does not involve a transfer with suitcases.",
  },
  {
    ...tripPrepProducts.rapit,
    why: "Kansai Airport: the Rapi:t to Namba is a reserved-seat limited express, so like the Skyliner it is a ticket to buy, not a fare to tap.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Tokyo Metro and Toei both take a contactless card now, but they charge you per journey; the 24, 48 or 72-hour ticket is the version that stops counting.",
  },
  {
    ...tripPrepProducts.osakaPass,
    why: "Osaka Metro has taken contactless cards at every station since October 2024, so the reason to buy this pass is the admissions bundled with the rides — not the rides.",
  },
  {
    label: "SHIBUYA SKY ticket",
    ctaLabel: "Check the Shibuya Sky ticket →",
    url: shibuyaSkyTicketUrl,
    why: "Timed entry: the sunset slots are the scarce thing, not the payment — a card terminal at the door cannot sell you a slot that has already gone.",
  },
  {
    ...tripPrepProducts.skytree,
    why: "Popular attractions sell timed entry, and the slot is the scarce thing rather than the payment — an observation deck can be sold out while its card terminal works perfectly.",
  },
  {
    ...tripPrepProducts.fujiHakoneTour,
    why: "A day out to Fuji or Hakone is the one trip no ticket gate can sell you: it is a coach seat on a fixed departure, booked before you are in Japan.",
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
 * How Much Yen to Bring — added 29 Oct 2026 with the restored page. The question
 * the slug is asked ("how much cash do I carry?") has an answer nobody writing it
 * ever states: the float shrinks by whatever you have already paid for. So this
 * slot is not a shopping list — every line is a yen cost that is normally settled
 * out of the cash float and can be taken out of it before departure instead.
 *
 * No new URLs: all seven read out of `tripPrepProducts`, which the money and
 * transport guides already render. Spread across the bands deliberately — airport
 * trains and the two passes at 5%, the day tour and the Skytree ticket at 6.5%,
 * the eSIM at 20% — so the page is not one product repeated.
 */
export const howMuchYenTripPrep: KlookTripPrepItem[] = [
  // 11 Nov 2026: airport access, city transit and data first — the three yen costs
  // that land on the first day — then the larger prepaid items.
  {
    ...tripPrepProducts.naritaExpress,
    why: "The first fare of the trip, and the one most often paid out of the notes you just exchanged at the airport — book the Narita round trip before you fly and the arrival-day float does not have to cover it.",
  },
  {
    ...tripPrepProducts.skyliner,
    why: "The Ueno and Asakusa side of the same decision: a reserved seat bought in your own currency instead of ¥2,000-odd out of your opening cash.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Short subway hops are the fares a foreign card cannot always pay at the gate, and the IC top-up machine wants notes and coins — a 24, 48 or 72-hour ticket bought before you fly takes Tokyo's city rides off the float altogether.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Working data is what stops the float being guesswork — checking whether a restaurant takes cards, or finding the nearest 7-Eleven ATM, is a map lookup rather than a hunt for station Wi-Fi.",
  },
  {
    ...tripPrepProducts.jrPass,
    why: "Long-distance rail is the largest single line in most Japan budgets; buy the pass before you land and the cash you carry is for days, not for intercity travel.",
  },
  {
    ...tripPrepProducts.osakaPass,
    why: "Kansai's version — unlimited Osaka Metro and city buses plus the admissions bundled with them, which is a day of small cash payments turned into one card charge.",
  },
  {
    ...tripPrepProducts.fujiHakoneTour,
    why: "A day trip is the costliest thing a cash float ever has to absorb, and a coach seat on a fixed departure cannot be bought at the gate anyway — it is booked before you are in Japan.",
  },
  {
    ...tripPrepProducts.skytree,
    why: "Observation decks and museums are the admissions you can prepay; temple and shrine gates are not, which is why the float below is sized around the gates rather than the towers.",
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
 * Revolut in Japan — added 4 Nov 2026. The page had no Klook route, and "does
 * Revolut work in Japan" is answered in full by an AI summary. What a summary does
 * not do is move a charge off the weekend or out of the ATM allowance, so each line
 * here is tied to one of those two limits. Spread across eSIM 20%, airport access
 * and the passes 5%, and the Tokyo hotel 6.5%. No new URLs.
 */
export const revolutCardTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Revolut runs from its app: spend alerts, the card freeze and the plan screen that shows your allowance all need data from the moment you land.",
  },
  {
    ...tripPrepProducts.naritaExpress,
    why: "Land on a Saturday and a ticket bought on the day falls in Revolut's weekend window. Book the Narita round trip on a weekday before you fly and it does not.",
  },
  {
    ...tripPrepProducts.hanedaLimousine,
    why: "The Haneda side of the same decision: one fare settled ahead, so your first ATM withdrawal is not going on the ride into town.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "For Kansai arrivals: with the airport train already paid for, more of your free ATM allowance is left for the places that only take cash.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Tokyo Metro and Toei gates do not take a foreign contactless card, so this is one card payment in place of a run of yen fares.",
  },
  {
    ...tripPrepProducts.jrPass,
    why: "A single large charge, so check your plan's exchange limit first, and on Standard buy it on a weekday to stay clear of the 1% weekend fee.",
  },
  {
    ...tripPrepProducts.hotelTokyoStation,
    why: "Another large payment that is better made on a weekday than at a front desk on a Saturday night, when Standard's weekend fee applies to any exchange.",
  },
];

/**
 * Wise vs Revolut — added 5 Nov 2026. The page had no Klook route, and which card
 * wins is the part an AI summary answers in full. Each line is a payment the reader
 * can make on either card before the trip, tied to the weekend window or the ATM
 * allowance. Spread across eSIM 20%, airport access and the passes 5%, and the Tokyo
 * hotel 6.5%. No new URLs.
 */
export const wiseVsRevolutTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Both cards run from an app: your Wise balance and the Revolut plan screen that shows your allowance need data from the moment you land.",
  },
  {
    ...tripPrepProducts.naritaExpress,
    why: "Land at Narita on a Saturday and a ticket bought on the day falls in Revolut's weekend window. Book the round trip on a weekday before you fly and the question does not come up on either card.",
  },
  {
    ...tripPrepProducts.hanedaLimousine,
    why: "The Haneda side of the same decision: one fare settled ahead, so neither card's free ATM allowance goes on the ride into town.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "For Kansai arrivals: with the airport train already paid for, more of your free ATM allowance is left for the places that only take cash.",
  },
  {
    ...tripPrepProducts.subway,
    why: "One card payment in place of a run of yen fares, so on Revolut Standard there is one exchange to time rather than many.",
  },
  {
    ...tripPrepProducts.jrPass,
    why: "A single large charge. On Wise it is one conversion; on Revolut Standard, buy it on a weekday and check your plan's exchange limit first.",
  },
  {
    ...tripPrepProducts.hotelTokyoStation,
    why: "Often the largest bill of the trip, and on Revolut Standard better paid on a weekday than at a front desk on a Saturday night. Wise's terms are the same on either day.",
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
    why: "The base that costs you least on the Day 5 move if you skip Hakone: the Tokaido Shinkansen to Kyoto leaves from beneath it, so the morning you change cities is a lift rather than a cross-town journey with the cases.",
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

// ---------------------------------------------------------------------------
// Where to stay — the two supporting blocks, added 26 Oct 2026.
//
// No new URLs: both read out of `tripPrepProducts`, so the airport tickets and
// the eSIM on these pages are the same links the transport guides already use.
// The hotel searches are the main CTA on both pages and live in
// `whereToStayTokyoAreas` / `whereToStayOsakaAreas` above, rendered by
// KlookStayAreas — nothing is duplicated here.
// ---------------------------------------------------------------------------

/** Where to Stay in Tokyo — the two airport runs the area choice is made against. */
export const whereToStayTokyoTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.naritaExpress,
    why: "The Narita Express is the reason Tokyo Station, Shibuya and Shinjuku are all equally viable arrival bases — one train, no transfer, and the round-trip ticket is cheaper than two singles.",
  },
  {
    ...tripPrepProducts.skyliner,
    why: "If you picked Ueno or Asakusa, this is the train that makes the choice pay: Keisei puts the Skyliner at 41 minutes between Narita Terminal 2·3 and Keisei-Ueno.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Ginza is a subway base rather than a JR one, and so is half of Asakusa — on either, a 24, 48 or 72-hour Metro and Toei pass does more work than an IC card.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Hotel check-in, the last train home and finding which of Shinjuku Station's exits you want all run off your phone — worth having working before you leave the terminal.",
  },
];

/**
 * Where to Stay in Kyoto — added 26 Oct 2026. The airport train and the two
 * guided days the area choice is made against, plus the eSIM.
 *
 * The hotel searches are the page's main CTA and live in `whereToStayKyotoAreas`,
 * rendered by KlookStayAreas, so nothing is duplicated here. The Haruka is in the
 * 5% passes-and-transport band and the two Kyoto day tours in the 6.5% band.
 */
export const whereToStayKyotoTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.haruka,
    why: "The Haruka is the whole argument for a Kyoto Station base: it runs direct from Kansai Airport to Kyoto, so the arrival and the departure both start on the platforms under the hotel — and the discounted one-way is sold to foreign passport holders only.",
  },
  {
    ...tripPrepProducts.kyotoHighlightTour,
    why: "The honest answer to Kyoto's geography problem. Kinkaku-ji is in the north-west, Fushimi Inari in the south and Arashiyama in the west, and no single base is close to all three — a guided day does the routing instead of your legs.",
  },
  {
    ...tripPrepProducts.kyotoNaraTour,
    why: "Kiyomizu-dera, Fushimi Inari and Nara Park in one booking, which is the version to take if you have two nights rather than four and would rather not spend one of them on bus timetables.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Kyoto's city buses are flat-fare and pay-on-exit, and the sights they reach are spread across four sides of the city — a live route lookup is worth more here than in any other Japanese city.",
  },
];

/**
 * Ghibli Park — added 26 Oct 2026. The park ticket is a park ticket, so the
 * commission-bearing bookings around it are the ones in this block: the guided
 * Nagoya day and the two hotel searches at 6.5%, the Shoryudo bus pass at 5%,
 * the eSIM at 20%.
 */
export const ghibliParkTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.ghibliBusTour,
    why: "The version of the day with no Linimo connection in it: a coach out of Nagoya that pairs the park with the Aichi Museum of Flight, which matters because the direct Meitetsu bus runs only on days the park is open.",
  },
  {
    ...tripPrepProducts.hotelGhibliPark,
    why: "Ghibli's Grand Warehouse entry times start at 9 a.m. on 9 a.m. opening days, and you have to be inside within an hour of your slot — the Nagakute and Seto hotels out by the Linimo are the version of that morning that does not start in the city.",
  },
  {
    ...tripPrepProducts.hotelNagoya,
    why: "The alternative base, and the better one if the park is one day of a longer trip: both park runs and the Tokaido Shinkansen leave from Nagoya Station itself.",
  },
  {
    ...tripPrepProducts.shoryudoBusPass,
    why: "If Ghibli Park is the reason you are in Chubu at all, this is the regional pass that also reaches Takayama, Shirakawa-go and Kanazawa from the same station — bought once rather than leg by leg.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The park's own ticket rules put your name on the pass and allow a random ID check at entry, and both sellers deliver the ticket to a screen — this is not a day to land without working data.",
  },
];

/**
 * LEGOLAND Japan — added 26 Oct 2026, same reasoning. The 1-Day Pass is a park
 * admission; the hotel package, the Nagoya hotel search and the regional bus pass
 * are the bookings around it that sit in the higher bands.
 */
export const legolandJapanTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.legolandHotel,
    why: "LEGOLAND Japan runs 10:00–17:00, which is a short day for a family that has travelled to get there — the themed rooms at the resort are what turn one 10:00 opening into two.",
  },
  {
    ...tripPrepProducts.hotelNagoya,
    why: "The cheaper base, and the one to pick if the park is a single day: Aonami's own figures put Nagoya Station to Kinjofuto at 24 minutes and ¥360, and the station is where the shinkansen leaves from too.",
  },
  {
    ...tripPrepProducts.shoryudoBusPass,
    why: "The 5% band alternative to buying transport by the leg, for a Chubu trip that puts LEGOLAND on one day and Takayama or Shirakawa-go on another.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The operator publishes ride closures and date-specific hours on its own site and app rather than at the gate, so the things most likely to change your day are only readable with data.",
  },
];

/** Where to Stay in Osaka — the airport trains, and the pass a city base rides on. */
export const whereToStayOsakaTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.rapit,
    why: "The Nankai Rapi:t is the whole argument for a Namba base: Nankai puts it at a minimum of 34 minutes between Kansai Airport and Namba, with no transfer.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "And the Haruka is the argument for Tennoji or Umeda — it runs direct to Tennoji, Osaka, Shin-Osaka and Kyoto, and the discounted one-way ticket is sold to foreign passport holders only.",
  },
  {
    ...tripPrepProducts.osakaPass,
    why: "If your base is Umeda, Namba or Tennoji, the Osaka Amazing Pass covers the Midosuji rides between them plus more than 40 admissions — it does not cover the JR run to Universal City.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Osaka's two hubs are 20 minutes apart and the hotel you want may be at either end of the Midosuji Line — data from the moment you land makes that a decision rather than a gamble.",
  },
];

/**
 * Osaka Metro Pass, added 4 Nov 2026 — what a day on the pass still needs booking.
 * No new URLs: food tour 6.5%, the Namba and Umeda hotel searches 6.5%, the airport
 * trains 5%, the eSIM 20%. Neither airport train is on any Osaka Metro pass.
 */
export const osakaMetroPassTripPrep: KlookTripPrepItem[] = [
  {
    label: "Dotonbori daytime food tour",
    why: "Listed at 11:00 to 14:00, so it sits in the middle of a pass day with the afternoon still to ride.",
    ctaLabel: "Check the food tour →",
    url: dotonboriDaytimeFoodTour.url,
  },
  {
    label: "Hotels in Namba",
    why: "The southern hub of the Midosuji Line, so most subway days on the pass start and end with one straight ride.",
    ctaLabel: "Check Namba hotels on Klook →",
    url: osakaStayAreas[1].url,
  },
  {
    ...tripPrepProducts.hotelOsakaUmeda,
    why: "The northern Midosuji hub, a 2-ku ride from Namba, and the better base if you are connecting to the shinkansen.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "No Osaka Metro pass reaches Kansai Airport, and the Haruka runs direct to Tennoji, Osaka and Shin-Osaka.",
  },
  {
    ...tripPrepProducts.rapit,
    why: "The Namba alternative: Nankai puts it at a minimum of 34 minutes from Kansai Airport, with no transfer.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Live route and fare searches need data, and Osaka Metro's own fare search runs in the browser.",
  },
];

/**
 * Osaka Amazing Pass, added 9 Nov 2026 — what the same Osaka trip still needs booking
 * once the pass day is planned. No new URLs: the food tour, the Kyoto and Nara day tour
 * and the Namba hotel search (6.5%), and the two airport trains (5%). The eSIM sits
 * below this block as the page's BookingEsimCard.
 */
export const osakaAmazingPassTripPrep: KlookTripPrepItem[] = [
  {
    label: dotonboriDaytimeFoodTour.title,
    why: "Listed at 11:00 to 14:00 in Dotonbori, a short walk from the Tombori River Cruise pier, so it fits between the castle morning and the boat.",
    ctaLabel: "Check the food tour →",
    url: dotonboriDaytimeFoodTour.url,
  },
  {
    label: kyotoNaraArashiyamaTour.title,
    why: "The pass stops at the edge of Osaka city, so the Kyoto and Nara day is a separate booking — this one departs from Osaka.",
    ctaLabel: "Check the Kyoto & Nara tour →",
    url: kyotoNaraArashiyamaTour.url,
  },
  {
    label: "Hotels in Namba",
    why: "On the Midosuji Line, on foot from Dotonbori, and the Nankai terminus for Kansai Airport — so a pass day can start and end at the door.",
    ctaLabel: "Check Namba hotels on Klook →",
    url: osakaStayAreas[1].url,
  },
  {
    ...tripPrepProducts.rapit,
    why: "The standard pass does not reach Kansai Airport. The Rapi:t runs from the airport to Namba, and its reserved seat is extra even on the airport version of the pass.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "The JR route from Kansai Airport to Tennoji, Osaka and Shin-Osaka. JR is not on the pass's list of participating lines.",
  },
];

// ---------------------------------------------------------------------------
// USJ and the JR Pass, added 26 Oct 2026 — the two highest-traffic pages on this
// site whose only Klook links were in the bands that pay least.
//
// usj-tickets-express-pass sold the Studio Pass (excluded, 0%) and the Express
// Pass (0%); jr-pass-guide sold the JR Pass alone, which is a 2% special
// activity. Neither page gains or loses a ticket link here. What both gain is the
// set of things the same reader books around that ticket: hotels and tours at
// 6.5%, passes and airport trains at 5%, the eSIM at 20%.
//
// No new URLs in either block — every entry reads out of `tripPrepProducts`, so
// the hotel searches, the Osaka pass, the Kyoto–Nara day and the eSIM are the
// same links the city guides already render.
// ---------------------------------------------------------------------------

/**
 * USJ — what else an Osaka trip built around the park needs booking.
 *
 * Deliberately none of it a park ticket: the Osaka Amazing Pass is in the 5%
 * passes band, the Kyoto–Nara day in the 6.5% tours band, the eSIM at 20%. The
 * pass line has to lead with what it does *not* cover, because the guide's own
 * reader is the person most likely to assume it covers the park.
 */
export const usjTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.osakaPass,
    why: "Read this one carefully: the pass does not cover Universal Studios Japan, and it does not cover the JR run out to Universal City either. What it covers is every other day of an Osaka trip — unlimited Osaka Metro and city buses plus more than 40 admissions.",
  },
  {
    ...tripPrepProducts.kyotoNaraTour,
    why: "The obvious second day for anyone who has flown to Osaka for a theme park: Kiyomizu-dera, Fushimi Inari and Nara Park in one booking, departing from Osaka, with none of the routing left to you.",
  },
  {
    ...tripPrepProducts.esim,
    why: "USJ sells date-specified Studio Passes as e-tickets and runs Super Nintendo World area timed entry through its own app, which you use inside the park on the day — a queue is a bad place to discover you have no data.",
  },
];

/**
 * JR Pass — what the pass does not buy.
 *
 * The three hotel searches are the shinkansen stations a pass itinerary actually
 * stops at, read out of `tokyoKyotoOsakaStayAreas` via `tripPrepProducts`, and the
 * eSIM is on it because seat reservations and delay information are both online.
 * Nothing here competes with the pass itself: a room and a data plan are not rail
 * products, which is the point — the pass covers the trains and nothing else.
 */
export const jrPassTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelTokyoStation,
    why: "A pass itinerary is a series of shinkansen departures, and on the Tokaido and Tohoku lines they start under Tokyo Station — so a Marunouchi room turns a travel morning into a lift ride rather than a cross-city journey with the cases.",
  },
  {
    ...tripPrepProducts.hotelKyotoStation,
    why: "The same argument at the other end of the Tokaido line, with the 100 and 101 sightseeing buses starting from the same forecourt and the airport HARUKA leaving from the same platforms.",
  },
  {
    ...tripPrepProducts.hotelOsakaUmeda,
    why: "Osaka Station is the JR hub — the Loop Line, the Kyoto and Kobe lines and the Yumesaki through services — with Shin-Osaka two stops up the Midosuji Line for the shinkansen your pass covers.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Everything the pass does not do is online: reserving the Hikari seat it entitles you to, checking whether the train you planned is a Nozomi, and reading JR's delay notices when a typhoon stops the Tokaido line.",
  },
];

// ---------------------------------------------------------------------------
// Two days in Osaka and a Kobe day trip, added 27 Oct 2026 for
// osaka-2-day-itinerary and kobe-day-trip-from-osaka.
//
// Same verification rule as every block above: Klook answers automated reads of
// its /activity/ pages with HTTP 403, so each listing below was confirmed live,
// on sale and in its en-US URL form through the www.klook.com search index on
// 27 Oct 2026. None carries a price.
//
// Band discipline for the two host pages. The Osaka itinerary already had the
// castle, the Kaiyukan, the Umeda deck and the Dotonbori boats declared further
// up, so the only new Osaka entries here are a 6.5% food walk per day and the
// 5% Tokyo–Osaka rail page. Kobe had no Klook route at all: everything new for
// it is a 6.5% tour or a Kobe beef restaurant booking, with the 5%
// `rokkosanTouristPass` (declared in the Arima block) as the pass CTA.
// ---------------------------------------------------------------------------

/**
 * Klook's Tokyo → Osaka rail page. A route page rather than an /activity/ id, for
 * the same reason as `shinkansenTokyoKyoto` and `shinkansenTokyoKaruizawa`: the
 * Tokaido Shinkansen is sold by date and seat class, and the route page is the
 * address that keeps working when a train number does not. Unlike the /activity/
 * pages this one answers automated reads, and on 27 Oct 2026 it listed the three
 * seat classes below and stated zero transfers on the route.
 */
export const shinkansenTokyoOsaka: KlookTour = {
  title: "Tokyo → Osaka shinkansen tickets",
  desc: "Klook's Tokaido Shinkansen booking page for the route, with non-reserved, reserved and Green Car seats and no transfer between Tokyo and Shin-Osaka",
  url: klookLink("https://www.klook.com/en-US/japan-rail/shinkansen/28-tokyo/29-osaka/"),
};

/** Kuromon Market food walk — the half-day join-in, for the Day 1 lunch hours. */
export const kuromonMarketFoodTour: KlookTour = {
  title: "Kuromon Market food walking tour, Osaka",
  desc: "A join-in walk of the Kuromon Ichiba covered market with takoyaki and the market stalls, listed as a small-group half day",
  url: klookLink("https://www.klook.com/en-US/activity/92805-kuromon-market-join-half-day-food-tour-osaka/"),
};

/** The three-hour city walk with the food stops attached — the Day 2 version. */
export const osakaWalkingFoodTour: KlookTour = {
  title: "Osaka 3-hour join-in walking and food tour",
  desc: "Three hours on foot through the city with the eating built in, as a join-in departure rather than a private guide",
  url: klookLink("https://www.klook.com/en-US/activity/102998-osaka-join-3-hr-walking-tour-osaka-food-tour/"),
};

/**
 * Where to stay for two days in Osaka.
 *
 * No new URLs: every entry reads its destination page out of
 * `whereToStayOsakaAreas`, so there is still one source of truth per Klook
 * destination id and this page cannot drift away from the area comparison.
 *
 * What is new is the order and the argument. A two-day plan is decided by how
 * many times you cross the city with luggage and whether USJ is one of the two
 * days — which is a different axis from the "best area" question, so Namba leads
 * here and Universal City is last with its condition stated.
 */
export const osakaTwoDayStayAreas: KlookStayArea[] = [
  {
    area: "Namba",
    why: "The default for two days: Dotonbori, Kuromon Market and the Shinsaibashi arcade are the Day 1 evening and they are all on foot, the Midosuji Line runs north to the castle and the Umeda deck, and the Nankai terminus is under you for the airport.",
    url: whereToStayOsakaAreas[1].url,
  },
  {
    area: "Umeda / Osaka Station",
    why: "The pick if the two days arrive or leave by JR — the Kyoto and Kobe lines, the Loop Line and the Yumesaki through services to Universal City all start here, and Shin-Osaka for the shinkansen is two stops up the Midosuji Line.",
    url: whereToStayOsakaAreas[0].url,
  },
  {
    area: "Tennoji",
    why: "The cheaper southern end of the same Midosuji stretch, and the first city stop on the HARUKA from Kansai Airport — useful on a two-day trip precisely because it shortens the airport leg at both ends.",
    url: whereToStayOsakaAreas[2].url,
  },
  {
    area: "Universal City",
    why: "Only worth it if one of your two days is Universal Studios Japan: the gates are a short walk from Universal City Station on the JR Yumesaki Line, but you are 20 minutes of JR from everything else in this itinerary and no Osaka Metro pass reaches you.",
    url: whereToStayOsakaAreas[3].url,
  },
];

/**
 * Where to stay for three days in Osaka, added 10 Nov 2026 for osaka-3-day-itinerary.
 *
 * No new URLs: Namba, Umeda and Universal City read their destination pages out of
 * `whereToStayOsakaAreas` (indices 1, 0 and 3). A three-day plan has a USJ day in
 * the middle and a day trip or the bay at the end, so the order and the whys
 * differ from the two-day list.
 */
export const osakaThreeDayStayAreas: KlookStayArea[] = [
  {
    area: "Namba",
    why: "The default for three days: Dotonbori and Kuromon Market are on foot for the Day 1 evening, Kintetsu leaves Osaka-Namba for Nara and Hanshin for Kobe on Day 3, and Nankai's Rapi:t runs from here to Kansai Airport.",
    url: whereToStayOsakaAreas[1].url,
  },
  {
    area: "Umeda / Osaka Station",
    why: "The pick if you arrive or leave by shinkansen, or if Day 3 is Kobe by JR or Hankyu — and the JR ride out to Universal City for the USJ day starts here.",
    url: whereToStayOsakaAreas[0].url,
  },
  {
    area: "Universal City",
    why: "Only for a trip built around the park: the gates are a short walk from the hotel, but every other day of this plan starts with a JR ride and a change.",
    url: whereToStayOsakaAreas[3].url,
  },
];

/**
 * Osaka 3-day itinerary, added 10 Nov 2026 — what to book on the same day as the USJ
 * ticket (0% / 2%). No new URLs: the Amazing Pass and the airport trains (5%), the
 * Kyoto and Nara day tour and the Namba hotel search (6.5%), the eSIM (20%).
 */
export const osakaThreeDayTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.osakaPass,
    why: "For Day 1, not the USJ day: the castle, the Nishinomaru Garden and the Tombori cruise are all free on it, while the park and the JR ride to Universal City are not covered.",
  },
  {
    label: "Hotels in Namba",
    why: "On foot from Dotonbori, on the Kintetsu line to Nara and the Hanshin line to Kobe for Day 3, and the Nankai terminus for the airport.",
    ctaLabel: "Check Namba hotels on Klook →",
    url: whereToStayOsakaAreas[1].url,
  },
  {
    ...tripPrepProducts.kyotoNaraTour,
    why: "If Day 3 is a day trip and you would rather not route it yourself: Nara Park, Kiyomizu-dera and Fushimi Inari in one booking, departing from Osaka.",
  },
  {
    ...tripPrepProducts.rapit,
    why: "Kansai Airport to Namba with no transfer — Nankai gives a minimum of 34 minutes.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "Kansai Airport to Tennoji, Osaka and Shin-Osaka direct, if your hotel is at the Umeda end.",
  },
  {
    ...tripPrepProducts.esim,
    why: "USJ's Super Nintendo World area timed entry runs through the park's own app on the day, and the Kaiyukan ticket is a QR code — both need data.",
  },
];

/** The Kobe day that matches this guide's three stops — harbour, Kitano, the mountain. */
export const kobeFerrisKitanoArimaRokkoDayTour: KlookTour = {
  title: "Kobe day trip from Osaka: Mosaic Ferris wheel, Kitano Ijinkan, Arima Onsen & the Mt. Rokko night view",
  desc: "A round-trip day out of Osaka that strings the harbour Ferris wheel, the Kitano foreign-residence street, the Arima hot-spring town and the Rokko night view into one booking",
  url: klookLink("https://www.klook.com/en-US/activity/182781-kobe-night-view-ferris-wheel-arima-onsen-day-tour/"),
};

/** The same circuit with the Kobe beef meal inside the booking rather than beside it. */
export const kobeBeefHarbourKitanoDayTour: KlookTour = {
  title: "Kobe day trip with Kobe beef: harbour Ferris wheel, Kitano, Arima Onsen & Mt. Rokko",
  desc: "The version of the Kobe circuit that has the Kobe beef meal in the price, so the one thing you would otherwise have to reserve separately is already booked",
  url: klookLink("https://www.klook.com/en-US/activity/108986-kobe-port-mosaic-ferris-wheel-kobe-cattle/"),
};

/** Kobe plus Himeji in a private day — the pick when the castle is also on the list. */
export const kobeHimejiPrivateTourBeefLunch: KlookTour = {
  title: "Kobe & Himeji Castle full-day private tour with optional Kobe beef lunch",
  desc: "A private car and English-speaking driver covering Himeji Castle and the Kobe stops, with a Kobe beef lunch offered as an upgrade on the same booking",
  url: klookLink("https://www.klook.com/en-US/activity/187409-kobe-himeji-castle-full-day-private-tour-with-kobe-beef-lunch/"),
};

/** The outlet-and-onsen version, with the sukiyaki lunch named on the listing. */
export const kobeSandaOutletArimaBeefLunchTour: KlookTour = {
  title: "Kobe Sanda Premium Outlets & Arima Onsen day tour from Osaka with lunch",
  desc: "A coach day out of Osaka pairing the Sanda outlet mall with the Arima Onsen town, listed with a Kobe beef and matsutake sukiyaki set lunch",
  url: klookLink("https://www.klook.com/en-US/activity/91734-kobe-sanda-premium-outlets-arima-onsen-town-one-day-tour-kobe-beef-matsutake-sukiyaki-lunch-osaka/"),
};

/** A guide for the city itself, for anyone taking the train over on their own. */
export const kobePrivateHalfDayWalkingTour: KlookTour = {
  title: "Kobe private half-day walking tour",
  desc: "A private local guide for a half day in the city — the version for travellers who get themselves to Sannomiya by train and want the streets explained",
  url: klookLink("https://www.klook.com/en-US/activity/45511-half-day-kobe-a-local/"),
};

/** Kobe beef teppanyaki in Kobe itself — a reserved table rather than a queue. */
export const kobeBeefSakuraTeppanyaki: KlookTour = {
  title: "Kobe Beef Steak SAKURA teppanyaki, Kobe",
  desc: "A teppanyaki restaurant in central Kobe booked as a course with a reserved table, in lunch and dinner slots — the answer to the one thing a day trip can genuinely run out of",
  url: klookLink("https://www.klook.com/en-US/activity/125545-kobe-beef-steak-sakura-teppanyaki-in-kobe/"),
};

/** The second restaurant booking, for a date the first one has no table on. */
export const kisshokichiKobeBeefCourse: KlookTour = {
  title: "Kisshokichi Honten Kobe beef course",
  desc: "A second bookable Kobe beef course listing, worth opening when the first restaurant has no table left on your date",
  url: klookLink("https://www.klook.com/en-US/activity/10857-kisshokichi-honten-kobe-osaka/"),
};

// ---------------------------------------------------------------------------
// Food tours, added 27 Oct 2026 for osaka-food-tour and tokyo-night-food-tour.
//
// Every listing below is in the 6.5% tours-and-activities band, which is why both
// host pages lead with a tour rather than a ticket or a pass.
//
// Same verification rule as every block above: Klook answers automated reads of
// its /activity/ pages with HTTP 403 (confirmed again on 27 Oct 2026 for 89990
// and 102521), so each URL was confirmed live, on sale and in its en-US form
// through the www.klook.com search index on 27 Oct 2026. The duration, start
// time, group size and inclusions in each `desc` are what that index returns for
// the listing — nothing here is first-hand and no price appears, because what a
// food tour includes (how many dishes, how many drinks) moves the figure more
// than the date does.
//
// Deliberately left out: a Yurakucho gado-shita izakaya tour. The Tokyo page
// wanted one for the under-the-tracks block, but Klook has no en-US listing for
// Yurakucho that could be confirmed — only a destination page — so the page
// names the area without pretending there is a tour to book there.
//
// Also left out: listing 87502 (a 2-hour Osaka takoyaki and okonomiyaki class).
// It is live, but only in en-AU and locale-less URL forms in the index, and an
// unconfirmed en-US address is worse than a shorter list — 5295 and 45131 below
// cover the same "make it yourself" slot and both resolve in en-US.
// ---------------------------------------------------------------------------

/** Shinsekai after dark — the one listing that publishes both its clock and its dish count. */
export const shinsekaiNightFoodTour: KlookTour = {
  title: "Osaka Shinsekai night food tour with a local guide",
  desc: "A three-hour join-in evening listed at 17:30–20:30 for 2 to 9 people, through five Shinsekai eateries with 15 dishes and 3 drinks — kushikatsu, doteyaki, takoyaki, oden, yakitori, gyoza and a taiyaki dessert — led in English",
  url: klookLink("https://www.klook.com/en-US/activity/89990-osaka-city-backstreets-shinsekai-half-day-walking-tour-10-dishes-5-hidden-eateries/"),
};

/** The Dotonbori back-alley evening — the classic Minami crawl. */
export const absoluteOsakaFoodTour: KlookTour = {
  title: "Absolute Osaka food tour",
  desc: "A three-hour join-in walk the listing routes off the main Dotonbori strip through a secret alley, with kushikatsu, Michelin-rated takoyaki, a seasonal spread at a hidden izakaya and a local dessert",
  url: klookLink("https://www.klook.com/en-US/activity/86986-osaka-join-half-day-food-tour/"),
};

/** The second Shinsekai departure, for a date the first one is full on. */
export const shinsekaiHalfDayFoodTour: KlookTour = {
  title: "Osaka Shinsekai half-day join-in food tour",
  desc: "Klook's second Shinsekai walk, sold as a join-in half day — the one to open when the 17:30 departure has no places left on your date",
  url: klookLink("https://www.klook.com/en-US/activity/86990-osaka-shinsekai-join-half-day-food-tour/"),
};

/** Tako no Tetsu, Umeda — the cook-it-yourself takoyaki slot, with a published clock. */
export const osakaTakoyakiCookingClass: KlookTour = {
  title: "Takoyaki cooking class in Osaka — Tako no Tetsu, Umeda",
  desc: "A 19:50–21:30 class at B2F Osaka Marubiru, 1-9-20 Umeda, about 10 minutes on foot from JR Osaka Station, where you cook your own takoyaki from English instructions and then try okonomiyaki and a local dessert",
  url: klookLink("https://www.klook.com/en-US/activity/5295-tako-no-tetsu-umeda-osaka/"),
};

/** The okonomiyaki half day — private, so it is the one that bends to a timetable. */
export const osakaOkonomiyakiPrivateTour: KlookTour = {
  title: "Okonomiyaki tasting private half-day tour, Osaka",
  desc: "A three-hour private half day built around okonomiyaki, with the option on the listing to cook your own version rather than only eat it",
  url: klookLink("https://www.klook.com/en-US/activity/45131-okonomiyaki-private-half-day-tour-osaka/"),
};

/** The one Osaka food experience whose listing is vegetarian by design. */
export const osakaVegetarianSushiClass: KlookTour = {
  title: "Osaka modern vegetarian sushi cooking class",
  desc: "The answer to the question a kushikatsu crawl cannot answer: a sushi class Klook lists as vegetarian from the start, rather than a tour with one swapped skewer",
  url: klookLink("https://www.klook.com/en-US/activity/139703-osaka-modern-vegetarian-sushi-cooking-class/"),
};

/** The ramen-from-scratch class — the indoor option for a wet Osaka evening. */
export const osakaRamenNoodleClass: KlookTour = {
  title: "Homemade noodle making in Osaka (2.5 hours)",
  desc: "A two-and-a-half-hour join-in class making ramen noodles from scratch — entirely indoors, which is what a food walk is not",
  url: klookLink("https://www.klook.com/en-US/activity/102690-2-half-hr-join-osaka-class-ramen-cooking/"),
};

/**
 * Shinjuku after dark — the food-led walk rather than the bar crawl. The three
 * alleys this listing names are the three the Tokyo page is about.
 */
export const shinjukuNightFoodWalkingTour: KlookTour = {
  title: "Shinjuku night food tour: Omoide Yokocho, Kabukicho & Golden Gai",
  desc: "A three-hour join-in walk through Omoide Yokocho, Kabukicho and Golden Gai after dark, with tastings at three local food spots and a drink at a Golden Gai izakaya",
  url: klookLink("https://www.klook.com/en-US/activity/102521-shinjuku-food-tour-tokyo-join-3-hr-walking-tour-omoide-yokocho-kabukicho-golden-gai/"),
};

/**
 * The drink-led version, and the listing that states the age rule in its own
 * words: Klook's page for 90253 says the legal drinking age in Japan is 20 and
 * asks for a valid ID as proof of age. That is the one place the 20+ line on
 * tokyo-night-food-tour comes from, rather than from us asserting it.
 */
export const shinjukuBarHoppingNightTour: KlookTour = {
  title: "Tokyo bar hopping night tour in Shinjuku",
  desc: "A three-hour join-in evening across three bars — the first in the Omoide Yokocho alley, then two more in Kabukicho and Golden Gai — with all food and drinks included; the listing states Japan's drinking age of 20 and asks for ID",
  url: klookLink("https://www.klook.com/en-US/activity/90253-join-shinjuku-bar-hopping-tour/"),
};

/** The sit-down version: two proper meals rather than a string of small plates. */
export const shinjukuNightFoodieTourWagyuSushi: KlookTour = {
  title: "Tokyo night foodie tour in Shinjuku (wagyu beef, sushi)",
  desc: "Three hours in English and Japanese built around a hidden Shinjuku sushi restaurant and wagyu beef, finishing on a Japanese dessert or a drink",
  url: klookLink("https://www.klook.com/en-US/activity/94392-shinjuku-join-half-day-food-tour-wagyu-beef-sushi/"),
};

/** Golden Gai specifically, with the food weighted ahead of the bars. */
export const goldenGaiFoodTastingExperience: KlookTour = {
  title: "Shinjuku Golden Gai local food tasting experience",
  desc: "A three-hour guided evening the listing builds around yakitori and a bowl of ramen, ending on a drink inside Golden Gai itself",
  url: klookLink("https://www.klook.com/en-US/activity/154384-tokyo-city-shinjuku-golden-gai-local-food-tasting-experience/"),
};

/** The bars-only Golden Gai listing — for an evening that has already eaten. */
export const goldenGaiBarHoppingExperience: KlookTour = {
  title: "Shinjuku Golden Gai bar-hopping experience",
  desc: "Klook's Golden Gai crawl without the meal attached, which is the one to book when dinner is already arranged and the alley is the whole point",
  url: klookLink("https://www.klook.com/en-US/activity/86817-shinjuku-golden-gai-bar-hopping-experience-tokyo/"),
};

/** The private Shinjuku evening — the version that sets its own pace and start time. */
export const shinjukuPrivateNightFoodTour: KlookTour = {
  title: "Shinjuku private night food and bar tour with a guide",
  desc: "A private half-day evening across Omoide Yokocho, Kabukicho and Golden Gai — the version for a group that wants its own guide rather than a join-in departure",
  url: klookLink("https://www.klook.com/en-US/activity/93203-omoide-yokocho-kabukicho-district-shinjuku-golden-gai-private-half-day-food-tour/"),
};

// ---------------------------------------------------------------------------
// Shirakawa-go, Takayama and Kanazawa, added 27 Oct 2026 for
// takayama-shirakawago-tour and tokyo-to-kanazawa.
//
// Two bands on one trip. The guided days are the 6.5% tours-and-activities
// band and are the headline CTA on both pages; the Nohi bus seat, the
// Hokuriku Arch Pass and the Tokyo–Kanazawa rail page are the 5%
// passes-and-transport band and sit inside the body.
//
// Same verification rule as every block above: Klook answers automated reads
// of its /activity/ pages with HTTP 403, so each listing below was confirmed
// as a live en-US page through the www.klook.com search index on 27 Oct 2026.
// The one exception is `shinkansenTokyoKanazawa` — like the Tokyo–Kyoto and
// Tokyo–Karuizawa rail pages, it answered a read on the same date and names
// the Kagayaki and Hakutaka with four seat classes, a fastest time of 2h 20m
// and "0 transfer(s)".
//
// No price appears on any of them, for the usual reason.
// ---------------------------------------------------------------------------

/** The Nagoya departure that gives roughly two hours at each of the two stops. */
export const takayamaShirakawagoNagoyaDayTrip: KlookTour = {
  title: "Takayama & Shirakawa-go day trip from Nagoya",
  desc: "A round trip out of Nagoya Station listed at about 11 hours, with roughly two hours in Shirakawa-go and two in the Takayama old town",
  url: klookLink("https://www.klook.com/en-US/activity/15800-takayama-shirakawa-go-day-trip-nagoya/"),
};

/** The second Nagoya listing — the one with the Hida beef lunch as an option. */
export const shirakawagoTakayamaOldTownDayTour: KlookTour = {
  title: "Shirakawa-go & Takayama old town day tour (optional Hida beef lunch)",
  desc: "The other Nagoya departure for the same two stops, with a Hida beef lunch offered as an add-on rather than included",
  url: klookLink("https://www.klook.com/en-US/activity/14117-takayama-shirakawa-go-day-trip-nagoya/"),
};

/**
 * The Kanazawa departure, and the only listing here that will drop you in
 * Takayama instead of bringing you back — which is what makes it useful on a
 * Tokyo → Kanazawa → Takayama → Nagoya run rather than only as a day out.
 */
export const shirakawagoTakayamaKanazawaDayTour: KlookTour = {
  title: "Shirakawa-go & Takayama one-day bus tour from Kanazawa",
  desc: "A join-in day listed at 8 to 10 hours with an English-speaking licensed guide, offered either as a round trip to Kanazawa or as a one-way drop-off in Takayama",
  url: klookLink("https://www.klook.com/en-US/activity/101875-shirakawago-takayama-join-one-day-bus-tour-kanazawa/"),
};

/** The Kanazawa day that adds Gokayama to Shirakawa-go. */
export const shirakawagoGokayamaKanazawaBusTour: KlookTour = {
  title: "Shirakawa-go, Gokayama & Hida Takayama bus tour from Kanazawa",
  desc: "The Kanazawa departure that takes in the Gokayama villages as well as Shirakawa-go and the Takayama old town",
  url: klookLink("https://www.klook.com/en-US/activity/94040-shirakawago-takayama-hida-takayama-bus-tour-kanazawa/"),
};

/**
 * The Takayama departure. Listed at 7 hours 20 minutes and guided by a
 * Japanese-speaking assistant rather than an English guide, which is the one
 * thing to know before booking it — and the reason the Kanazawa listing above
 * is the English-guided alternative.
 */
export const takayamaShirakawagoGokayamaUnescoTour: KlookTour = {
  title: "Takayama: Shirakawa-go & Gokayama full-day UNESCO tour",
  desc: "A Nohi Bus day out of Takayama listed at 7 hours 20 minutes, covering Ainokura in Gokayama, the Gassho-zukuri Minkaen open-air museum and the Shiroyama Tenshukaku observation deck, with a Japanese-speaking assistant",
  url: klookLink("https://www.klook.com/en-US/activity/90970-historic-villages-shirakawa-go-gokayama-join-bus-trip-takayama/"),
};

/** The shorter Takayama departure — the village and the old town, nothing else. */
export const takayamaShirakawagoOneDayBusTour: KlookTour = {
  title: "Takayama & Shirakawa-go one-day bus tour from Takayama",
  desc: "Klook's second Takayama departure, for a day that wants the village and the old town without the Gokayama detour",
  url: klookLink("https://www.klook.com/en-US/activity/91141-takayama-shirakawa-go-one-day-bus-tour-takayama/"),
};

/** The observation-deck listing — the deck is ticketed separately on the day. */
export const shirakawagoObservationDeckDayTour: KlookTour = {
  title: "Shirakawa-go day tour with optional observation-deck access",
  desc: "A guided day that sells the Ogimachi observation-deck access as an option rather than assuming you can walk up to it",
  url: klookLink("https://www.klook.com/en-US/activity/200465-shirakawa-go-day-tour-optional-access-to-the-observation-deck/"),
};

/**
 * The winter light-up day out of Takayama. Kept separate from the tours above
 * because the event itself is reservation-only — see the dates and the rules
 * on the Shirakawa-go Tourist Association's own page, which the guide quotes.
 */
export const shirakawagoLightUpTakayamaDayTour: KlookTour = {
  title: "Shirakawa-go light-up one-day bus tour from Takayama",
  desc: "The winter illumination day, listed at 5 to 5.5 hours, with the choice of entering the open-air museum or the Ogimachi Castle Ruins observation deck",
  url: klookLink("https://www.klook.com/en-US/activity/133193-shirakawago-light-up-1-day-bus-tour-from-takayama/"),
};

/** The 5% band option: a Nohi bus seat rather than a tour. */
export const shirakawagoLineBusTicket: KlookTour = {
  title: "Shirakawa-go Line bus ticket (Takayama ⇄ Shirakawa-go)",
  desc: "Nohi Bus's Shirakawa-go Line as a non-reserved seat, one way or round trip — the version for a day you want to plan yourself",
  url: klookLink("https://www.klook.com/en-US/activity/149343-shirakawa-go-line-bus-ticket/"),
};

/**
 * Klook's Tokyo → Kanazawa rail page. A route page rather than a product id,
 * for the same reason as `shinkansenTokyoKyoto` and `shinkansenTokyoKaruizawa`:
 * the Hokuriku Shinkansen is sold by date and seat class, and the route page is
 * the address that keeps working when a train number does not.
 */
export const shinkansenTokyoKanazawa: KlookTour = {
  title: "Tokyo → Kanazawa shinkansen tickets",
  desc: "Klook's Hokuriku Shinkansen booking page for the route, naming the Kagayaki and Hakutaka in reserved Ordinary, Green Car, Gran Class and non-reserved Ordinary seats, with no transfers",
  url: klookLink("https://www.klook.com/en-US/japan-rail/shinkansen/28-tokyo/kanazawa-station/"),
};

/** The Hokuriku Arch Pass — the 5% band pass that actually fits this route. */
export const hokurikuArchPass: KlookTour = {
  title: "JR Hokuriku Arch Pass (7 day)",
  desc: "The Tokyo–Kanazawa–Kansai pass as Klook sells it: seven consecutive days covering the Hokuriku Shinkansen between Tokyo and Tsuruga, but not the Tokaido Shinkansen",
  url: klookLink("https://www.klook.com/en-US/activity/2781-7-day-jr-hokuriku-arch-pass-jr-pass/"),
};

// ---------------------------------------------------------------------------
// Added 4 Nov 2026 for /guides/transport/hokuriku-arch-pass and
// /guides/transport/kintetsu-rail-pass.
//
// Klook answers automated reads with HTTP 403, so each page below was confirmed
// as a live en-US URL through the www.klook.com search index on 4 Nov 2026. The
// pass is the 5% band; the Ise days are tours (6.5%); the hotel searches are
// Klook Hotels (6.5%). No price appears on any of them.
// ---------------------------------------------------------------------------

/** Listing 15984 is the one the index shows in en-US form; 5540 only appeared without a locale. */
export const kintetsuRailPass: KlookTour = {
  title: "Kintetsu Rail Pass (1 Day / 2 Days / 5 Days / Plus)",
  desc: "The digital pass as Klook sells it, for Kintetsu trains around Osaka, Nara, Kyoto, Nagoya and Mie. Limited express seats stay a separate ticket",
  url: klookLink("https://www.klook.com/en-US/activity/15984-kintetsu-rail-pass-osaka/"),
};

export const iseShrineOkageGuidedTour: KlookTour = {
  title: "Ise Grand Shrine & Okage Yokocho guided tour",
  desc: "A guided visit to the shrine and the Okage Yokocho street once you are in Ise — the rail pass gets you there, and this covers the day",
  url: klookLink("https://www.klook.com/en-US/activity/134489-ise-ise-grand-shrine-and-okage-yokocho-guided-tour/"),
};

/** Listed as a Japanese-language tour that needs 20 participants, so check both before booking. */
export const iseFutamiBusTourOsaka: KlookTour = {
  title: "Ise Grand Shrine & Futami bus tour from Osaka (lobster lunch)",
  desc: "A coach day out of Osaka instead of the train, listed in Japanese with a translator device and a 20-person minimum, so check the language and the departure first",
  url: klookLink("https://www.klook.com/en-US/activity/87921-futami-okitama-shrine-ise-grand-shrine-one-day-bus-tour-spiny-lobster-lunch-osaka/"),
};

export const kanazawaHotels: KlookTour = {
  title: "Hotels in Kanazawa",
  desc: "Klook's Kanazawa hotel search, for the night that splits the Tokyo and Kansai halves of the trip",
  url: klookLink("https://www.klook.com/en-US/destination/c445-kanazawa/3-hotel/"),
};

export const toyamaHotels: KlookTour = {
  title: "Hotels in Toyama",
  desc: "Klook's Toyama hotel search, for a night one stop before Kanazawa on the same shinkansen",
  url: klookLink("https://www.klook.com/en-US/destination/c21926-toyama/3-hotel/"),
};

export const naraHotels: KlookTour = {
  title: "Hotels in Nara",
  desc: "Klook's Nara hotel search, for staying over rather than coming back from a day trip",
  url: klookLink("https://www.klook.com/en-US/hotels/city/12999-nara-hotels/"),
};

/** Kanazawa itself — the garden, the geisha district and the castle in a day. */
export const kanazawaKenrokuenHigashiChayaDayTour: KlookTour = {
  title: "Kanazawa: Kenroku-en & Higashi Chaya day tour with temarizushi making",
  desc: "A join-in bus day pairing Kenroku-en, the Higashi Chaya teahouse district and Omicho Market with a temarizushi-making session",
  url: klookLink("https://www.klook.com/en-US/activity/101935-kenrokuen-higashi-chaya-district-omicho-market-join-one-day-bus-tour-temarizushi-making/"),
};

/** The guided walking version of the same three places. */
export const kanazawaGeishaKenrokuenCastleDayTour: KlookTour = {
  title: "Kanazawa day tour: geisha district, Kenroku-en & the castle",
  desc: "An English-guided day through the Higashi Chaya geisha district, Kenroku-en and the Kanazawa Castle grounds",
  url: klookLink("https://www.klook.com/en-US/activity/146759-kanazawa-day-tour-geisha-district-kenrokuen-garden-and-the-castle/"),
};

/** Kanazawa and Shirakawa-go as one guided day, with the shinkansen optional. */
export const shirakawagoKanazawaDayTour: KlookTour = {
  title: "Shirakawa-go & Kanazawa day tour (optional bullet train)",
  desc: "Both halves of the Hokuriku day in one booking, with a bullet-train leg offered as an option on the listing",
  url: klookLink("https://www.klook.com/en-US/activity/181355-shirakawago-and-kanazawa-day-tour/"),
};

// ---------------------------------------------------------------------------
// Matcha, added 27 Oct 2026 for japan-matcha-experiences.
//
// All 6.5% tours-and-activities. The split this page is built on is Uji and
// Wazuka — where the tea is actually grown and ground — against the Kyoto and
// Tokyo tea rooms, which tea-ceremony-japan already covers. Every listing was
// confirmed as a live en-US page through the www.klook.com search index on
// 27 Oct 2026, and none carries a price.
//
// `kyotoTraditionalTeaCeremonyUrl` is the exception to the klookLink() rule:
// it is the affiliate.klook.com/redirect link that
// pages/guides/attractions/tea-ceremony-japan.tsx already uses for listing
// 160630, copied rather than re-minted, so the two pages send the same listing
// through the same tracking link.
// ---------------------------------------------------------------------------

/** Uji's tea museum plus the stone mill — the "grind it yourself" listing. */
export const ujiChazunaStoneMillMatcha: KlookTour = {
  title: "Uji: Chazuna museum & matcha making from a stone mill",
  desc: "Grinding tencha leaves on a stone mill at Chazuna in Uji, with the museum ticket included — the listing's three steps are grinding, whisking and drinking",
  url: klookLink("https://www.klook.com/en-US/activity/227682-uji-grinding-matcha-experience-with-tea-museum-ticket/"),
};

/** The Wazuka plantation day — the only listing here that picks leaves. */
export const wazukaMatchaPickingTasting: KlookTour = {
  title: "Matcha picking and tasting in Wazuka, Kyoto",
  desc: "Picking leaves on a Wazuka plantation and tasting matcha with tea-flavoured dango, with a cooking lesson using your own leaves as an option",
  url: klookLink("https://www.klook.com/en-US/activity/141151-matcha-picking-and-tasting-in-kyoto/"),
};

/** A ceremony taught in Wazuka, the main production area of Uji tea. */
export const ujiTeaCeremonyExperience: KlookTour = {
  title: "Tea ceremony experience in Uji, Kyoto",
  desc: "Matcha preparation and etiquette taught by a professional matcha teacher in Wazuka, which the listing names as the main production area of Uji tea",
  url: klookLink("https://www.klook.com/en-US/activity/134729-tea-ceremony-experience-in-uji-tea-s-main-production-area-kyoto/"),
};

/** The small-group Uji walk — three hours, tea shops and a ceremony. */
export const ujiSmallGroupMatchaTour: KlookTour = {
  title: "Uji half-day small-group matcha & tea ceremony tour",
  desc: "A three-hour small-group walk through Uji built around the tea shops and a tea ceremony rather than the temples",
  url: klookLink("https://www.klook.com/en-US/activity/102484-uji-join-3-hr-walking-tour-matcha-green-tea/"),
};

/** The Uji half day that includes a lunch set and the Byodo-in outer grounds. */
export const ujiMatchaGreenTeaHalfDayTour: KlookTour = {
  title: "Uji half-day matcha green tea tour with lunch",
  desc: "Three hours in Uji with an English-speaking guide, a lunch set, matcha and wagashi tastings and the outer grounds of Byodo-in",
  url: klookLink("https://www.klook.com/en-US/activity/86978-kyoto-uji-join-half-day-food-tour-matcha-green-tea/"),
};

/** The walk that ends at Taihoan, Uji's municipal tea house. */
export const ujiTaihoanWalkingTour: KlookTour = {
  title: "Uji half-day walking tour with a tea ceremony at Taihoan",
  desc: "The Uji Bridge, Nakanoshima Park and a tea ceremony at Taihoan — the town's own tea house — in one half-day join-in walk",
  url: klookLink("https://www.klook.com/en-US/activity/93576-uji-bridge-nakanoshima-park-taihoan-join-half-day-walking-tour/"),
};

/** Uji on a day tour out of Osaka, for a trip that is not based in Kyoto. */
export const ujiTeaCeremonyKyotoDayTourFromOsaka: KlookTour = {
  title: "Uji tea ceremony & Kyoto highlights day tour from Osaka",
  desc: "A day out of Osaka that puts a Uji tea ceremony alongside the Arashiyama bamboo grove, Maruyama Park, Yasaka Shrine and Nishiki Market",
  url: klookLink("https://www.klook.com/en-US/activity/15017-uji-tea-ceremony-experience-bamboo-forest-maruyama-park-yasaka-shrine-nishiki-market-day-tour-kyoto/"),
};

/** The Arashiyama day with a matcha session attached. */
export const kyotoArashiyamaMatchaDayTour: KlookTour = {
  title: "Kyoto & Arashiyama day tour with a matcha experience",
  desc: "The western-Kyoto sightseeing day — the bamboo grove and the Tenryu-ji gardens — with matcha and traditional sweets built into it",
  url: klookLink("https://www.klook.com/en-US/activity/129721-kyoto-city-western-kyoto-arashiyama-tour-matcha-experience/"),
};

/** The Kyoto tea room that teaches tasting as well as whisking. */
export const kyotoTeaCeremonyTastingMaking: KlookTour = {
  title: "Kyoto: tea ceremony, tasting and making experience",
  desc: "A Kyoto session that adds a tasting to the usual whisk-your-own format, so you can tell one grade of matcha from another",
  url: klookLink("https://www.klook.com/en-US/activity/134710-tea-ceremony-tasting-and-making-experience-in-kyoto/"),
};

/** Kyoto, with the matcha-making taught rather than demonstrated. */
export const kyotoTeaCeremonyMatchaMaking: KlookTour = {
  title: "Kyoto: tea ceremony and matcha making experience",
  desc: "The hands-on Kyoto version — you are shown the ritual and then make your own bowl rather than being served one",
  url: klookLink("https://www.klook.com/en-US/activity/77761-tea-ceremony-and-matcha-making-experience-in-kyoto/"),
};

/**
 * The Kyoto ceremony pages/guides/attractions/tea-ceremony-japan.tsx already
 * links, kept on its existing affiliate.klook.com/redirect link rather than a
 * new one. Listing 160630, a 45-minute-to-an-hour session near Kinkaku-ji with
 * a second-degree Urasenke instructor.
 */
export const kyotoTraditionalTeaCeremonyUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1307860&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F160630-traditional-japanese-tea-ceremony-experience-in-kyoto%2F";

/** Tokyo, Toyosu — the Urasenke instructor and the Uji matcha, next to teamLab. */
export const tokyoMatchaTeaCeremonyExpert: KlookTour = {
  title: "Tokyo: making matcha & a tea ceremony with an expert",
  desc: "A private-room session in Toyosu led by a licensed Urasenke instructor, using matcha the listing says is mainly from Uji, with sweets by named confectioners",
  url: klookLink("https://www.klook.com/en-US/activity/135602-tokyo-making-matcha-experience-a-tea-ceremony-with-an-expert/"),
};

/** The Tokyo session with a kimono included — 1 hour 30 on the listing. */
export const tokyoMatchaKimonoTeaCeremony: KlookTour = {
  title: "Tokyo: matcha & kimono tea ceremony experience",
  desc: "Listed at 1 hour 30 minutes, with an easy-to-wear kimono before the lecture and a hands-on matcha preparation after it",
  url: klookLink("https://www.klook.com/en-US/activity/112076-matcha-kimono-experience-in-tokyo/"),
};

/** The 45-minute Tokyo option — the one that fits into an afternoon. */
export const tokyoCasualTeaCeremony: KlookTour = {
  title: "Tokyo: a casual tea ceremony at a hidden-gem shop",
  desc: "A 45-minute session with an English-speaking host trained in the Omotesenke school — the shortest matcha stop on this page",
  url: klookLink("https://www.klook.com/en-US/activity/143390-a-casual-tea-ceremony-at-a-hidden-gem-shop-in-tokyo/"),
};

/** One hour, private, with wagashi — the Tokyo version for a small group. */
export const tokyoPrivateTeaCeremonyWagashi: KlookTour = {
  title: "Tokyo: 1-hour private tea ceremony class with wagashi",
  desc: "A private one-hour class with a traditional sweet, for anyone who would rather not share the room with a join-in group",
  url: klookLink("https://www.klook.com/en-US/activity/103494-1-hour-private-tokyo-class-tea-ceremony-wagashi/"),
};

// Four named ceremonies added 7 Nov 2026 for the booking CTAs on tea-ceremony-japan.
// All four en-US URLs were confirmed in the www.klook.com search index that day, and
// each desc repeats only what the indexed listing states. No prices, as elsewhere.

/** Gion, kimono and hair included: the Kyoto listing for the kimono CTA. */
export const kyotoGionKimonoTeaCeremony: KlookTour = {
  title: "Kyoto: kimono tea ceremony at Orizuruya, Gion",
  desc: "1.5 to 2 hours in a small group of up to 10, with kimono dressing and hair styling before the ceremony",
  url: klookLink("https://www.klook.com/en-US/activity/233020-kimono-tea-ceremony-experience-at-kyoto-orizuruya-gion/"),
};

/** Gion, seated on chairs throughout: the answer for anyone who cannot kneel. */
export const kyotoGionChairTeaCeremony: KlookTour = {
  title: "Kyoto: traditional tea ceremony with matcha and sweets",
  desc: "A one-hour Gion session held on chairs, with a demonstration, a bowl you whisk yourself and Kyoto sweets",
  url: klookLink("https://www.klook.com/en-US/activity/177406-kyoto-traditional-tea-ceremony-with-matcha-and-sweets/"),
};

/** Maikoya's Asakusa branch, not Kyoto: the listing says so itself. */
export const asakusaKimonoTeaCeremony: KlookTour = {
  title: "Tokyo: tea ceremony with kimono in Asakusa",
  desc: "1 hour 30 minutes at the Asakusa branch, with a maximum of 14 guests",
  url: klookLink("https://www.klook.com/en-US/activity/137057-tea-ceremony-with-kimono-experience-in-tokyo/"),
};

/** Asakusa at tables and chairs, about ten minutes on foot from Senso-ji. */
export const asakusaTableKimonoTeaCeremony: KlookTour = {
  title: "Tokyo: table-style kimono tea ceremony near Senso-ji",
  desc: "About 90 minutes at tables and chairs with a kimono included, two bowls of matcha and seasonal sweets",
  url: klookLink("https://www.klook.com/en-US/activity/139616-table-style-tea-ceremony-experience-near-senso-ji-and-skytree/"),
};

// ---------------------------------------------------------------------------
// The budget guide, added 27 Oct 2026 for japan-travel-budget.
//
// No new URLs at all: every entry below reads its destination page or its
// listing out of an array declared further up, or out of `tripPrepProducts`.
// That is deliberate — a budget page is the one page that must agree with every
// other page on this site about what a thing costs, so it cannot be allowed its
// own copies of the ids.
//
// What is new is where the blocks sit and what they argue. The page is a
// per-category breakdown (room, transport, food, sights, data), and each block
// is the thing that category can be bought for in advance, in its own band:
// the room at 6.5%, the passes at 5%, the day tours at 6.5%, the eSIM at 20%.
// ---------------------------------------------------------------------------

/**
 * The room line of the budget, one Klook search per city.
 *
 * Three cities rather than one because the page's accommodation section is built
 * on the three lodging taxes — Tokyo, Kyoto and Osaka each draw their brackets in
 * a different place — and the reader picking a band wants the search for the city
 * whose band they are reading about. Tokyo and Kyoto take two areas each because
 * both have a station base and a centre base that price differently; Osaka takes
 * the two Midosuji ends.
 *
 * Every `url` is read out of `tokyoStayAreas`, `kyotoStayAreas` or
 * `osakaStayAreas`, so there is still one source of truth per destination id.
 */
export const budgetStayAreas: KlookStayArea[] = [
  {
    area: "Tokyo Station / Marunouchi",
    why: "The base that costs you least in transport rather than in room rate: the Yamanote loop and the Tokaido and Tohoku shinkansen all leave from under it, so day trips start without a cross-city ride first.",
    url: tokyoStayAreas[1].url,
  },
  {
    area: "Ueno / Asakusa, Tokyo",
    why: "The side of Tokyo where the room rate is usually lowest for the same Yamanote access — Ueno is on the loop, the Ginza Line runs to Asakusa, and the Keisei Skyliner from Narita arrives here faster than anywhere else.",
    url: tokyoStayAreas[2].url,
  },
  {
    area: "Kyoto Station",
    why: "Kyoto taxes every stay, with no untaxed band at all, so the thing to buy with the room is position: the 100 and 101 sightseeing buses start on this forecourt and the airport HARUKA leaves from the same platforms.",
    url: kyotoStayAreas[0].url,
  },
  {
    area: "Karasuma Oike / Shijo, Kyoto",
    why: "The one point the Karasuma and Tozai subway lines cross — the base that lets a Kyoto day skip the buses, which is the only Kyoto transport cost a pass does not fix.",
    url: kyotoStayAreas[1].url,
  },
  {
    area: "Umeda, Osaka",
    why: "Osaka exempts rooms under ¥5,000 a night from its lodging tax, and Umeda is where the JR network starts — the Kyoto and Kobe lines, the Loop Line and Shin-Osaka two stops up the Midosuji Line.",
    url: osakaStayAreas[0].url,
  },
  {
    area: "Namba, Osaka",
    why: "Dotonbori and Kuromon Market on foot, so the evenings cost no fares at all, and the Nankai terminus under you for the run out to Kansai Airport.",
    url: osakaStayAreas[1].url,
  },
];

/**
 * The transport line of the budget — the 5% passes-and-transport band, and the
 * three passes the page has just priced against single fares.
 *
 * The order follows the page's own arithmetic rather than the commission: the JR
 * Pass is first because it is the one the page argues against for most readers,
 * and a reader who has just been shown that a Tokyo–Kyoto–Hiroshima–Tokyo run
 * comes to less than the pass should be able to check the pass price themselves.
 */
export const budgetTransportPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.jrPass,
    why: "Price it against your own legs before you buy: JR's own table puts the 7-day Ordinary pass at ¥50,000 online, and the Hikari fares on this page add up to ¥44,450 for Tokyo–Kyoto–Hiroshima–Tokyo — so the pass is a saving only on an itinerary busier than that.",
  },
  {
    ...tripPrepProducts.subway,
    why: "The cheapest line in a Tokyo budget to fix in advance: ¥2,000 for 72 hours against ¥178 an IC ride means the twelfth ride onwards is free, and a foreign contactless card will not open a Metro or Toei gate in any case.",
  },
  {
    ...tripPrepProducts.osakaPass,
    why: "The Osaka version of the same sum, except that it is the admissions rather than the rides that pay for it — more than 40 of them, which is why it beats a metro-only pass on a sightseeing day. It does not cover Universal Studios Japan or the Kaiyukan.",
  },
];

/**
 * The sights line of the budget — the 6.5% tours-and-activities band.
 *
 * Day trips rather than tickets, because the page's admissions table already
 * covers tickets at their official prices and a coach seat is the one sightseeing
 * cost a budget cannot reconstruct from an admission price: the transport, the
 * guide and the entry are one figure, and there is no walk-up equivalent.
 */
export const budgetSightseeingPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.fujiHakoneTour,
    why: "The day out of Tokyo that is cheaper as one booking than as its parts — the Fifth Station and Lake Ashi involve a highway bus, a ropeway and a boat, each of which you would otherwise buy separately on the day.",
  },
  {
    ...tripPrepProducts.kyotoNaraTour,
    why: "Kiyomizu-dera, Fushimi Inari and Nara Park in one day, departing Osaka or Kyoto. Worth pricing against the ¥800 Todai-ji admission plus the fares, which is what the same day costs you unguided.",
  },
  {
    ...tripPrepProducts.kyotoHighlightTour,
    why: "The Kyoto answer to the bus problem: a single guided day covering Kinkaku-ji, Fushimi Inari and the Arashiyama grove, rather than a string of city-bus fares and a timetable between each of them.",
  },
];

/** The data line of the budget — 20%, the highest band on the Klook dashboard. */
export const budgetDataPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "The one line of a Japan budget that is cheaper than travellers expect and easiest to overpay for on arrival: an airport counter sells you data in yen at its own price, where an eSIM is bought in your own currency before you fly.",
  },
];

/**
 * The top-of-page booking list for japan-travel-budget (12 Nov 2026, task-jtk-20261112-P01):
 * the four lines a reader who has set a budget can pay for first — the room (6.5%), the
 * subway pass and the airport leg (5%) and data (20%). Every figure is one the page
 * already shows; no Klook price.
 */
export const budgetTopPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelTokyoStation,
    why: "The room is the one line of the budget that moves with the date, so price it first, on your own dates. Tokyo Station puts the Yamanote loop and the shinkansen under the hotel.",
  },
  {
    ...tripPrepProducts.subway,
    why: "¥2,000 for 72 hours against ¥178 an IC ride: from the twelfth ride the rest are free, and a foreign contactless card does not open Metro or Toei gates.",
  },
  {
    ...tripPrepProducts.naritaExpress,
    why: "Landing at Narita, the airport train is a fixed cost you can settle before you fly rather than at a ticket machine after the flight.",
  },
  {
    ...tripPrepProducts.hanedaLimousine,
    why: "Landing at Haneda, the limousine bus to Tokyo Station or Shinjuku is a fixed fare that drops you on the hotel side of the city.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The smallest line in the budget and the easiest to overpay for: an arrivals-hall counter prices data in yen at its own rate.",
  },
];

// ---------------------------------------------------------------------------
// The Oshiage side of a Skytree afternoon, added 27 Oct 2026 for
// tokyo-skytree-tickets.
//
// Why it exists: that page's only Klook route was the Skytree admission itself,
// and an observation-deck ticket sits in the band Klook calls Special
// Activities — 2%, where tours and hotels are 6.5% and passes 5%. The entries
// below are the rest of the same afternoon in the bands that pay: the
// Ueno/Asakusa hotel search and the two Asakusa listings at 6.5%, the Tokyo
// Subway Ticket at 5%. The ticket CTAs on the page are untouched.
//
// No new URLs. The hotel search reads `tokyoStayAreas[2]`, the kimono rental is
// `asakusaKimonoYae` and the open-top bus `skyhopHopOnHopOffBus` — which is why
// this array is declared here at the foot of the file rather than through
// `tripPrepProducts`: the bus is declared after that object, so referring to it
// from inside it would be a use before declaration.
//
// Every `why` line below follows something the host page already states — that
// Oshiage is a subway stop covered by the Tokyo Subway Ticket, and that Asakusa
// is two stops away on the Asakusa Line. Nothing here is first-hand and no
// price appears, for the usual reason.
// ---------------------------------------------------------------------------

export const skytreeTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels around Ueno / Asakusa",
    ctaLabel: "Check Ueno & Asakusa hotels on Klook →",
    url: tokyoStayAreas[2].url,
    why: "The tower's own side of the river: Ueno is on the Yamanote loop, the Ginza Line runs from there to Asakusa and Oshiage is two stops further on the Asakusa Line — so a late deck slot does not end in a cross-city ride back to the hotel.",
  },
  {
    label: asakusaKimonoYae.title,
    ctaLabel: "Check the Asakusa kimono rental →",
    url: asakusaKimonoYae.url,
    why: "The daytime half of the same trip, two stops away: the shop sits by Kaminarimon, and the listing asks for the outfit back by 17:30 — which puts it in front of an evening Skytree slot rather than against it.",
  },
  {
    label: skyhopHopOnHopOffBus.title,
    ctaLabel: "Check the open-top bus ticket →",
    url: skyhopHopOnHopOffBus.url,
    why: "An open-top hop-on hop-off ticket whose courses include Asakusa — the version to buy if the day has Senso-ji and the tower in it rather than one stop and a subway fare for each leg.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Oshiage is a subway station on the Hanzomon and Toei Asakusa lines, so a 24, 48 or 72-hour Metro and Toei ticket already covers the trip to the tower — and the two stops to Senso-ji afterwards.",
  },
];

// ---------------------------------------------------------------------------
// teamLab Botanical Garden Osaka, added 28 Oct 2026 for
// teamlab-botanical-garden-osaka-tickets.
//
// The admission is a ticket, so it cannot be assumed to pay the 6.5%
// tours-and-activities band — which is why the Osaka Amazing Pass (5%), the
// Namba hotel search (6.5%) and an Osaka half-day tour (6.5%) sit beside it on
// the page rather than underneath it. No new URLs for those three: they read
// out of the Osaka arrays already declared above.
//
// Verified the usual way. Klook answers automated reads of its /activity/ pages
// with HTTP 403, so listing 73632 was confirmed live, on sale and in its en-US
// URL form through the www.klook.com search index on 28 Oct 2026 ("teamLab
// Botanical Garden Osaka Ticket"), which also names the admission-only package
// and an admission-plus-HARUKA package. No price appears on the page, for the
// usual reason — and because teamLab prices this venue dynamically by date, so
// a figure quoted here would be wrong by the time anyone read it.
// ---------------------------------------------------------------------------

/** The admission itself — the page's headline CTA. */
export const teamlabBotanicalGardenOsakaTicket: KlookTour = {
  title: "teamLab Botanical Garden Osaka ticket",
  desc: "Klook's listing for the night-only outdoor exhibition inside Nagai Botanical Garden, sold as admission alone or bundled with a one-way JR HARUKA leg from Kansai Airport",
  url: klookLink("https://www.klook.com/en-US/activity/73632-teamlab-botanical-garden-osaka/"),
};

/**
 * The rest of an Osaka day that ends at Nagai after dark. Every url reads out of
 * an array or a constant declared above, so there is one source of truth per id.
 */
export const teamlabBotanicalTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.osakaPass,
    why: "The garden is a night venue and its own ticket, so it is the hours before it that are unplanned — and the Osaka Amazing Pass covers more than 40 city admissions plus the Metro rides between them, including the Midosuji Line you take out to Nagai.",
  },
  {
    label: "Hotels around Namba",
    ctaLabel: "Check Namba hotels on Klook →",
    url: osakaStayAreas[1].url,
    why: "Nagai is a straight run down the Midosuji Line, so a Namba base makes the trip back at 21:00 or later one train with no change — and Dotonbori and Kuromon Market are on foot for the afternoon beforehand.",
  },
  {
    label: osakaSkyVistaHalfDayBusTour.title,
    ctaLabel: "Check the Osaka bus tour →",
    url: osakaSkyVistaHalfDayBusTour.url,
    why: "An open-top half day that finishes well before the 18:00 opening — the daytime half of a day whose evening is already committed to a 6 pm entry slot.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Entry is a QR code read at a gate in a park after dark, ten minutes on foot from the station — easier with data already working than with the hotel wifi left behind.",
  },
];

// ---------------------------------------------------------------------------
// Winter in Japan, added 28 Oct 2026 for japan-winter-itinerary.
//
// This is the first page on this site whose spine is a season rather than a
// city, so it reaches into almost every block above: the Tokyo illuminations,
// the ski days, the Hokuriku rail page, the Shirakawa-go light-up day and the
// Kyoto and Osaka tours are all already here and are reused unchanged.
//
// What is new is Hokkaido, which no page on this site covered before. Klook
// answers automated reads of its /activity/ and /destination/ pages with HTTP
// 403, so every listing and every hotel search below was confirmed live and in
// its en-US URL form through the www.klook.com search index on 28 Oct 2026.
//
// Bands, in the order the page sells them: the guided days and every hotel
// search are 6.5%, the rail pass and the airport and resort shuttles are 5%,
// the eSIM 20%. No price appears anywhere, for the usual reason.
// ---------------------------------------------------------------------------

/**
 * The Hokkaido pass that fits a Tokyo-in, Hokkaido-out winter trip: JR East's
 * network plus the southern Hokkaido section, which is the Tohoku and Hokkaido
 * Shinkansen as far as Shin-Hakodate-Hokuto. The whole-island JR Hokkaido Rail
 * Pass is a different product and is deliberately not linked — the en-US form
 * of its listing could not be confirmed on 28 Oct 2026, and an unconfirmed URL
 * is worse than none.
 */
export const jrEastSouthHokkaidoPass: KlookTour = {
  title: "JR East–South Hokkaido Rail Pass (flexible 6 days)",
  desc: "Six travel days inside fourteen across JR East and southern Hokkaido — the pass shaped like a Tokyo-in, Hokkaido-out winter trip rather than an island-only one",
  url: klookLink("https://www.klook.com/en-US/activity/2792-flexible-6-day-jr-east-south-hokkaido-rail-pass-jr-pass/"),
};

/** New Chitose to the city, as a seat booked before you fly. */
export const newChitoseSapporoSharedTransfer: KlookTour = {
  title: "New Chitose Airport shared transfer (Sapporo & Hoshino Resorts)",
  desc: "A shared airport transfer between New Chitose and Sapporo or the Hoshino resorts, which the listing requires 45 minutes after a domestic arrival and 90 after an international one",
  url: klookLink("https://www.klook.com/en-US/activity/12479-shared-new-chitose-airport-transfers-between-sapporo-hoshino-resorts/"),
};

/** The Niseko run — the transfer that takes ski bags, rather than a JR change. */
export const nisekoResortShuttleBus: KlookTour = {
  title: "Niseko shuttle bus (New Chitose Airport & Sapporo)",
  desc: "A direct coach between Niseko and either New Chitose Airport or Sapporo, with ski equipment and one piece of luggage per person in the booking",
  url: klookLink("https://www.klook.com/en-US/activity/82391-niseko-ski-resort-shuttle-bus/"),
};

/** Rusutsu, the other side of the same shuttle network. */
export const rusutsuResortShuttleBus: KlookTour = {
  title: "Rusutsu shuttle bus (New Chitose Airport & Sapporo)",
  desc: "The Rusutsu version of the same airport coach, for a trip basing at the resort rather than in the city",
  url: klookLink("https://www.klook.com/en-US/activity/82518-rusutsu-ski-resort-shuttle-bus/"),
};

/** The half day that is snow play rather than skiing — the one that fits a city base. */
export const sapporoSnowParkHalfDayTour: KlookTour = {
  title: "Wonderland Sapporo snow park half-day tour",
  desc: "A half day at a snow park outside the city with hotel pick-up and a Genghis Khan barbecue, listed as the version for travellers who are not carrying ski gear",
  url: klookLink("https://www.klook.com/en-US/activity/97175-sapporo-city-wonderland-sapporo-half-day-bus-tour-genghis-khan-bbq-buffet/"),
};

/** Lake Shikotsu's ice festival — a February evening, as a half day out of Sapporo. */
export const lakeShikotsuIceFestivalHalfDayTour: KlookTour = {
  title: "Lake Shikotsu ice festival half-day tour from Sapporo",
  desc: "The winter-only ice festival on Lake Shikotsu as a guided half day out of Sapporo — the other February event on this side of Hokkaido",
  url: klookLink("https://www.klook.com/en-US/activity/136930-lake-shikotsu-illumination-and-ice-festival-half-day-from-sapporo/"),
};

/** Otaru and a snow park in a day — the canal town, in the one season it is lit. */
export const otaruSnowParkDayTour: KlookTour = {
  title: "Otaru, Shiroi Koibito Park & snow park day tour",
  desc: "A Hokkaido day pairing the Otaru canal and its steam clock with Shiroi Koibito Park and a snow-play stop",
  url: klookLink("https://www.klook.com/en-US/activity/98528-otaru-shiroi-koibito-park-snow-park-day-tour-hokkaido/"),
};

/** Asahiyama Zoo in the one season the penguins walk — a winter-only departure. */
export const asahiyamaZooWinterDayTour: KlookTour = {
  title: "Asahiyama Zoo winter day trip from Sapporo",
  desc: "A winter-season day out of Sapporo to Asahikawa's zoo and the Biei hills, with a snowmobile stop at Shikisai-no-Oka offered inside the booking",
  url: klookLink("https://www.klook.com/en-US/activity/164281-winter-asahiyama-zoo-day-trip-with-snowmobile-from-sapporo/"),
};

/**
 * Where a twelve-day winter trip actually sleeps, one Klook search per base.
 *
 * Four of the eight read their destination id out of an array already declared
 * above — Shinjuku and Tokyo Station from `tokyoStayAreas`, Kyoto Station from
 * `kyotoStayAreas`, Namba from `osakaStayAreas` — so the winter page cannot
 * drift away from the city guides. The four new ones are the bases no page on
 * this site had before: Kanazawa and Takayama on the main route, Sapporo and
 * Niseko for the February swap.
 */
export const japanWinterStayAreas: KlookStayArea[] = [
  {
    area: "Shinjuku, Tokyo",
    why: "The winter base that costs least on the snow day: the ski coaches and the Odakyu line to Hakone leave from under this station, and the Yamanote loop is at the door for the illumination evenings.",
    url: tokyoStayAreas[0].url,
  },
  {
    area: "Tokyo Station / Marunouchi, Tokyo",
    why: "The base for a plan that leaves Tokyo by shinkansen twice — the Joetsu line to GALA Yuzawa and the Hokuriku line to Kanazawa both start beneath it, and the Marunouchi lights are the walk out of the building.",
    url: tokyoStayAreas[1].url,
  },
  {
    area: "Kanazawa",
    why: "Two nights at the Hokuriku Shinkansen terminus, with the Kenroku-en buses and the reservation-only Shirakawa-go coach both leaving from the station forecourt — the leg of this trip with the least slack in it.",
    url: klookLink("https://www.klook.com/en-US/destination/c445-kanazawa/3-hotel/"),
  },
  {
    area: "Takayama Station",
    why: "The one night this route spends in the mountains, and the base the January Shirakawa-go light-up buses run from — the Nohi Bus terminal is beside the station, so a 19:30 finish ends in a walk rather than a transfer.",
    url: klookLink("https://www.klook.com/en-US/destination/p50003173-takayama-station/3-hotel/"),
  },
  {
    area: "Kyoto Station",
    why: "Where the Hida and the Tokaido trains put you down and where the 100 and 101 sightseeing buses start — and the platform the airport HARUKA leaves from on a departure morning in the dark.",
    url: kyotoStayAreas[0].url,
  },
  {
    area: "Namba, Osaka",
    why: "Midosuji Line, Dotonbori and Kuromon Market on foot, the Nankai terminus underneath for Kansai Airport — and a straight run south to Nagai for the teamLab garden, which only opens after 18:00.",
    url: osakaStayAreas[1].url,
  },
  {
    area: "Sapporo Station",
    why: "The February swap's city base: Odori Park is one subway stop or a short walk, which is what you want when the snow festival sites are outdoors and the mean February daily maximum is 0.4°C.",
    url: klookLink("https://www.klook.com/en-US/destination/p50006996-sapporo-station/3-hotel/"),
  },
  {
    area: "Niseko",
    why: "Worth a base of its own only if the trip is about the snow rather than the cities — the lifts are at the door, and the airport coach that takes ski bags runs to it directly from New Chitose.",
    url: klookLink("https://www.klook.com/en-US/destination/p50340243-niseko/3-hotel/"),
  },
];

/** What a winter trip buys before it flies, in band order. */
export const japanWinterTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Winter is the season a Japan plan changes on the day — a light-up cancelled for weather, a ropeway shut in wind, a train held by snow — and every one of those notices arrives on your phone rather than at a counter.",
  },
  {
    ...tripPrepProducts.jrPass,
    why: "Price it against this route before you buy. A twelve-day winter trip going Tokyo → Kanazawa → Takayama → Kyoto → Osaka uses two long legs and a limited express, which is not obviously more than the pass costs; our JR Pass guide has the calculator for your own legs.",
  },
  {
    label: hokurikuArchPass.title,
    ctaLabel: "Check the Hokuriku Arch Pass →",
    url: hokurikuArchPass.url,
    why: "The pass actually shaped like this itinerary — seven consecutive days covering the Hokuriku Shinkansen out of Tokyo and the Kansai area at the far end. It does not cover the Tokaido Shinkansen, so it only works going out one way and back the other.",
  },
  {
    ...tripPrepProducts.subway,
    why: "The Tokyo days at the start are Metro and Toei days, and the illumination corridor — Marunouchi, Roppongi, Ebisu — is on those lines rather than the Yamanote. It covers neither JR nor the Yamanote Line, which is the thing people get wrong about it.",
  },
];

// ---------------------------------------------------------------------------
// Hiroshima and Miyajima, added 28 Oct 2026 for tokyo-to-hiroshima-shinkansen
// and osaka-to-hiroshima-shinkansen.
//
// Two bands again. The guided Hiroshima/Miyajima days and the Hiroshima hotel
// searches are the 6.5% tours-and-hotels band; the two rail route pages and the
// three passes are the 5% passes-and-transport band, which is why the body CTAs
// on both pages pair a rail link with a tour rather than selling only the train.
//
// Verification, all on 28 Oct 2026. Klook answers automated reads of its
// /activity/ and /destination/ pages with HTTP 403, so every listing below was
// confirmed as a live en-US page through the www.klook.com search index. The two
// exceptions are the rail route pages: both answered a read on that date, and
// what they state is quoted on the articles with the date attached —
// Tokyo–Hiroshima "3h 39m" shortest, "3h 49m" average, "0 transfer(s)", "127
// trains scheduled", earliest 06:00; Osaka–Hiroshima "1h 20m" shortest, "2h 15m"
// average, "0 transfer(s)", "181 trains scheduled", earliest 06:00.
//
// No price appears on any of them, for the usual reason.
// ---------------------------------------------------------------------------

/**
 * Klook's Tokyo → Hiroshima rail page. A route page rather than a product id,
 * for the same reason as `shinkansenTokyoKyoto` and `shinkansenTokyoKanazawa`:
 * the Tokaido–Sanyo run is sold by date and seat class, and the route page is
 * the address that keeps working when a train number does not.
 */
export const shinkansenTokyoHiroshima: KlookTour = {
  title: "Tokyo → Hiroshima shinkansen tickets",
  desc: "Klook's Tokaido–Sanyo Shinkansen booking page for the route, in non-reserved Ordinary, reserved Ordinary and reserved Green Car, with no transfer",
  url: klookLink("https://www.klook.com/en-US/japan-rail/shinkansen/28-tokyo/24323-hiroshima/"),
};

/** The same page for the Sanyo leg on its own. */
export const shinkansenOsakaHiroshima: KlookTour = {
  title: "Osaka → Hiroshima shinkansen tickets",
  desc: "Klook's Sanyo Shinkansen booking page for the route, naming the Mizuho, Hikari, Sakura and Kodama in reserved Ordinary, non-reserved Ordinary and Green Car seats",
  url: klookLink("https://www.klook.com/en-US/japan-rail/shinkansen/29-osaka/24323-hiroshima/"),
};

/**
 * JR West's 5-day Kansai-Hiroshima Area Pass. The 5% band, and the pass whose
 * shape matches an Osaka-based trip: JR West's own page puts the covered
 * Shinkansen section at Shin-Osaka ⇔ Hiroshima and stops it there.
 */
export const jrKansaiHiroshimaAreaPass: KlookTour = {
  title: "JR Kansai-Hiroshima Area Pass (5 day)",
  desc: "JR West's Kansai-and-Hiroshima pass as Klook sells it — reserved Sanyo Shinkansen seats between Shin-Osaka and Hiroshima, plus the JR Miyajima ferry",
  url: klookLink("https://www.klook.com/en-US/activity/3278-5-day-jr-kansai-hiroshima-area-pass-jr-pass/"),
};

/** The wider JR West pass, for a week that carries on past Hiroshima. */
export const jrSanyoSaninAreaPass: KlookTour = {
  title: "JR Sanyo-San'in Area Pass (7 day)",
  desc: "The seven-day JR West pass that runs the Sanyo Shinkansen all the way to Hakata, with the San'in coast and the JR Miyajima ferry included",
  url: klookLink("https://www.klook.com/en-US/activity/2729-7-day-jr-sanyo-san-in-area-pass-jr-pass/"),
};

/** The join-in guided day that covers both UNESCO sites, out of Hiroshima. */
export const hiroshimaMiyajimaJoinDayTour: KlookTour = {
  title: "Hiroshima & Miyajima join-in day tour: Itsukushima Shrine, Peace Memorial Museum & the Atomic Bomb Dome",
  desc: "An English-guided join-in day listing both UNESCO sites — the floating torii at Itsukushima and the Peace Memorial Park — starting in Hiroshima",
  url: klookLink("https://www.klook.com/en-US/activity/88659-itsukushima-shrine-hiroshima-peace-memorial-museum-atomic-bomb-dome-join-day-guided-tour-hiroshima/"),
};

/** The ferry-included day, for a first visit that does not want to plan the crossing. */
export const hiroshimaMiyajimaFerryDayTour: KlookTour = {
  title: "Hiroshima & Miyajima day trip with the ferry ride",
  desc: "The guided day that puts the Miyajima crossing inside the booking rather than leaving it to you at Miyajimaguchi",
  url: klookLink("https://www.klook.com/en-US/activity/140942-day-trip-to-hiroshima-and-miyajima-with-ferry-ride/"),
};

/** The private version, for a group that wants its own pace and start time. */
export const hiroshimaMiyajimaPrivateDayTour: KlookTour = {
  title: "Hiroshima & Miyajima private day tour from Hiroshima",
  desc: "The private alternative to a join-in coach — the same two UNESCO sites with your own guide and your own start time",
  url: klookLink("https://www.klook.com/en-US/activity/76431-hiroshima-miyajima-day-tour/"),
};

/** The listing sold out of three cities at once — useful on either article. */
export const hiroshimaMiyajimaMultiCityDayTour: KlookTour = {
  title: "Hiroshima & Miyajima day tour from Hiroshima, Kyoto or Osaka",
  desc: "One listing with three departure cities, which is the one to open if you have not yet decided whether to sleep in Hiroshima or come back the same night",
  url: klookLink("https://www.klook.com/en-US/activity/19772-miyajima-tour-hiroshima-okayama-shikoku/"),
};

/** The Osaka departure with the shinkansen leg inside the booking. */
export const osakaHiroshimaMiyajimaBulletTrainDayTrip: KlookTour = {
  title: "Osaka to Hiroshima & Miyajima day trip with the bullet train",
  desc: "A long guided day out of Shin-Osaka with the Shinkansen leg included, taking in the Peace Memorial Park, the Atomic Bomb Dome and Itsukushima Shrine",
  url: klookLink("https://www.klook.com/en-US/activity/151437-day-trip-from-osaka-to-hiroshima-miyajima-with-bullet-train/"),
};

/** The private Osaka departure, for a day built around Mt Misen rather than the park. */
export const osakaHiroshimaMiyajimaPrivateDayTour: KlookTour = {
  title: "Miyajima & Mt. Misen private island-hopping day from Osaka",
  desc: "The private Osaka departure, listed around Itsukushima Shrine and the Mt. Misen climb rather than the Peace Memorial Park",
  url: klookLink("https://www.klook.com/en-US/activity/90960-miyajima-itsukushima-shrine-mt-misen-private-one-day-island-hopping-tour-osaka/"),
};

/**
 * Where to sleep if Hiroshima turns into a night rather than a day. The 6.5%
 * hotels band, and the two areas the articles actually argue between: the
 * Shinkansen station, and the Peace Memorial Park end of the city.
 */
export const hiroshimaStayAreas: KlookStayArea[] = [
  {
    area: "Hiroshima Station",
    why: "Where the Sanyo Shinkansen puts you down, and where the Miyajimaguchi local trains and the airport coaches leave from — the base to pick if Hiroshima is one night inside a longer rail itinerary.",
    url: klookLink("https://www.klook.com/en-US/destination/p50039899-hiroshima-station/3-hotel/"),
  },
  {
    area: "Peace Memorial Park",
    why: "The other end of the tram line and the quieter half of the city: the museum, the Dome and the park are on the doorstep, which is what you want if the reason you came is the one you can walk to before the coaches arrive.",
    url: klookLink("https://www.klook.com/en-US/destination/p50056982-hiroshima-peace-memorial-museum/3-hotel/"),
  },
];

// ---------------------------------------------------------------------------
// Tokyo → Nagoya, teamLab Biovortex Kyoto and the long-stay SIM page, added
// 28 Oct 2026.
//
// Three bands on three pages, and the band decides which link is the headline
// CTA on each:
//   - Tokyo → Nagoya is a rail page (5% passes-and-transport), so the tours it
//     feeds — Ghibli Park's Nagoya bus day and the Takayama/Shirakawa-go days,
//     both already declared above — are the 6.5% CTAs beside it.
//   - teamLab Biovortex Kyoto is a museum admission, so the Kyoto walking tour
//     that ends inside it and the Kyoto hotel searches (both 6.5%) sit next to
//     the ticket rather than under it, with GetYourGuide beside the bare ticket.
//   - the long-stay SIM page leads with Sakura Mobile (its own programme, not
//     Klook), and Klook's eSIM is the 20% band entry for the first few days.
//
// Verified the usual way, on 28 Oct 2026. Klook answers automated reads of its
// /activity/ pages with HTTP 403, so 167098 ("teamLab Biovortex Kyoto ticket")
// and 184396 ("Kyoto & TeamLab Biovortex Experience Walking Tour") were both
// confirmed live and on sale through the www.klook.com search index. The
// Tokyo–Nagoya rail page is the exception, as the Tokyo–Kyoto, Tokyo–Karuizawa
// and Tokyo–Kanazawa rail pages are: it answered a read on the same date and
// states "1h 26m" shortest, "2h 26m" average, "0 transfer(s)", "451 trains
// scheduled on Nov. 03, 2026", a 06:00 first and 22:10 last departure, and the
// three seat classes.
//
// No price appears on any of them, for the usual reason.
// ---------------------------------------------------------------------------

/**
 * Klook's Tokyo → Nagoya rail page. A route page rather than a product id, for
 * the same reason as `shinkansenTokyoKyoto` and `shinkansenTokyoKanazawa`: the
 * Tokaido Shinkansen is sold by date and seat class, and the route page is the
 * address that keeps working when a train number does not.
 */
export const shinkansenTokyoNagoya: KlookTour = {
  title: "Tokyo → Nagoya shinkansen tickets",
  desc: "Klook's Tokaido Shinkansen booking page for the route, with non-reserved Ordinary, reserved Ordinary and reserved Green Car seats, QR boarding and no transfers",
  url: klookLink("https://www.klook.com/en-US/japan-rail/shinkansen/28-tokyo/71-nagoya/"),
};

/** The teamLab Biovortex Kyoto admission — a museum ticket, so not the headline band. */
export const teamlabBiovortexKyotoTicket: KlookTour = {
  title: "teamLab Biovortex Kyoto ticket",
  desc: "Klook's listing for teamLab's largest museum in Japan, a seven-minute walk from Kyoto Station, with a suggested duration of 1 to 2 hours on the listing",
  url: klookLink("https://www.klook.com/en-US/activity/167098-teamlab-kyoto/"),
};

/** The guided Kyoto half-day that finishes inside the museum — the 6.5% band. */
export const kyotoTeamlabBiovortexWalkingTour: KlookTour = {
  title: "Kyoto & teamLab Biovortex experience walking tour",
  desc: "A group walking tour of Nishi Hongan-ji and the Kyoto Station light show that ends inside teamLab Biovortex — the version that puts the museum at the end of a guided afternoon",
  url: klookLink("https://www.klook.com/en-US/activity/184396-kyoto-teamlab-biovortex-experience-walking-tour/"),
};

/**
 * The rest of a Kyoto day built around a teamLab slot. Every url but the
 * walking tour's reads out of a constant or array declared above, so there is
 * one source of truth per Klook id.
 */
export const teamlabKyotoTripPrep: KlookTripPrepItem[] = [
  {
    label: kyotoTeamlabBiovortexWalkingTour.title,
    ctaLabel: "Check the Kyoto walking tour →",
    url: kyotoTeamlabBiovortexWalkingTour.url,
    why: "The museum is a ticket rather than a day, and this is the listing that builds the hours in front of it — Nishi Hongan-ji and the Kyoto Station light show, both within the same few blocks, finishing inside teamLab.",
  },
  {
    label: "Hotels around Kyoto Station",
    ctaLabel: "Check Kyoto Station hotels on Klook →",
    url: kyotoStayAreas[0].url,
    why: "Last entry is 19:30 and the museum closes at 21:00, so a late slot ends on foot rather than on a bus — and the museum is seven minutes from the station's Hachijo East Gate.",
  },
  {
    label: kyotoHighlightBusTour.title,
    ctaLabel: "Check the Kyoto highlight tour →",
    url: kyotoHighlightBusTour.url,
    why: "The daytime half of a day that ends after dark: Kiyomizu-dera, Kinkaku-ji, Fushimi Inari and Arashiyama in one guided run, back in the city centre in time for an evening admission slot.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Entry is a timed QR code and the ticket store is where a date change happens — both easier with data already working than on the station wifi.",
  },
];

/**
 * The two Klook products a long-stay reader actually has a use for, and only
 * those two. Sakura Mobile's own programme carries the monthly plans, so Klook
 * is here for the gap it genuinely fills: the days before a residence card and
 * a Japanese address exist.
 *
 * The WiFi url is `pocketWifis[0].affiliateUrl` in lib/pocket-wifi.ts, which is
 * the airport-counter rental the eSIM guides already link — copied as a plain
 * product URL here would have created a second source of truth for it, so the
 * page imports it from there instead and this array carries only the eSIM.
 */
export const longStaySimPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "A monthly plan needs a residence card registered to a Japanese address, which you do not have on the day you land — a travel eSIM covers the week between arrival and the ward office with no contract to cancel afterwards.",
  },
];

// ---------------------------------------------------------------------------
// Kyoto in two days, and teamLab Forest Fukuoka — added 29 Oct 2026 for
// kyoto-2-day-itinerary and teamlab-fukuoka-tickets.
//
// Verified the usual way: Klook answers automated reads of its /activity/ and
// /destination/ pages with HTTP 403, so every URL below was confirmed as a live,
// on-sale en-US page through the www.klook.com search index on 29 Oct 2026 —
// which is also why none of them carries a price.
//
// Band decides which link leads on each page:
//   - kyoto-2-day-itinerary is an itinerary, so the 6.5% tours, experiences and
//     hotel searches are the headline CTAs on each day, and the 5% rail links
//     (the Tokaido Shinkansen route page and the Kansai Area Pass, both already
//     declared above) sit in the "getting there" section where they belong.
//   - teamlab-fukuoka-tickets is a museum admission, so the bare ticket is not
//     assumed to pay the tours band: the Fukuoka bus day that *includes* the
//     museum (104095), the two Dazaifu/Yanagawa days and the three Fukuoka hotel
//     searches are the 6.5% links, with the city passes at 5% beside them.
// ---------------------------------------------------------------------------

/** Fushimi Inari on foot with a guide — the Day 1 dawn stop, done as a tour. */
export const kyotoFushimiInariWalkingTour: KlookTour = {
  title: "Kyoto Fushimi Inari Taisha small-group walking tour",
  desc: "A small-group guided walk of the Senbon Torii gates with the option of carrying on up the Mount Inari trails, listed at three hours",
  url: klookLink("https://www.klook.com/en-US/activity/88010-kyoto-fushimi-inari-taisha-small-group-tour-walking-tour/"),
};

/** The Gion evening — the one Kyoto hour a self-guided plan reliably wastes. */
export const kyotoGionNightWalkingTour: KlookTour = {
  title: "Kyoto Gion night guided walking tour (3 hours)",
  desc: "A small-group evening through the Gion backstreets and Hanamikoji, with the offbeat shrines and the etiquette that stops you becoming the reason the lanes are now patrolled",
  url: klookLink("https://www.klook.com/en-US/activity/87999-kyoto-gion-night-walk-small-group-guided-tour-walking-tour/"),
};

/**
 * Where to stay for two days in Kyoto. No new destination ids: every url reads
 * out of `whereToStayKyotoAreas`, so the Klook ids stay in one place.
 *
 * The order and the `why` lines are written for a two-day plan rather than for
 * the area-comparison page, where the argument is different. On two days the
 * base is a time question — Kyoto Station and Karasuma Oike are the two that cost
 * you nothing in crossings, Gion earns its place only because an early
 * Kiyomizu-dera is the one thing it buys that no bus can, and Arashiyama is
 * deliberately last: it is 25 minutes from the station on the city's own figure,
 * which is a long way to carry cases for two nights.
 */
export const kyotoTwoDayStayAreas: KlookStayArea[] = [
  {
    area: "Kyoto Station",
    why: "The default for two days: the Tokaido Shinkansen and every Haruka arrive under it, the 100 and 101 sightseeing buses start at it, and the JR Nara and Sagano lines put Fushimi Inari and Arashiyama 9 and 11 minutes away without a bus at all.",
    url: whereToStayKyotoAreas[0].url,
  },
  {
    area: "Karasuma Oike / Shijo",
    why: "The one point the Karasuma and Tozai subway lines cross, with Nishiki Market and Pontocho on foot — so the Gion evening on Day 1 ends in a walk rather than a last bus.",
    url: whereToStayKyotoAreas[1].url,
  },
  {
    area: "Gion / Higashiyama",
    why: "Buys you one thing nothing else can on a two-day trip: Kiyomizu-dera from its 6:00 opening on foot, before the first coach has left Kyoto Station.",
    url: whereToStayKyotoAreas[2].url,
  },
  {
    area: "Arashiyama",
    why: "The bamboo grove and Togetsukyo before the day-trippers arrive — but Kyoto City puts Saga/Arashiyama 25 minutes from Kyoto Station, so this is the base for three nights rather than two.",
    url: whereToStayKyotoAreas[3].url,
  },
];

/**
 * The bookings a two-day Kyoto trip makes outside the two days themselves: how
 * you arrive, the pass that covers the region, the one experience that needs an
 * appointment rather than a ticket, and data.
 *
 * Every url reads out of a constant declared above — `shinkansenTokyoKyoto`,
 * `jrKansaiAreaPass`, `kyotoKimonoYumeyakata`, `saganoHozugawaGuaranteedTour`
 * and `klookEsim` — so nothing here is a second source of truth for a Klook id.
 */
export const kyotoTwoDayTripPrep: KlookTripPrepItem[] = [
  {
    label: shinkansenTokyoKyoto.title,
    ctaLabel: "Check Tokyo → Kyoto tickets →",
    url: shinkansenTokyoKyoto.url,
    why: "Two days in Kyoto is almost always two days inside a longer trip, and the Tokaido Shinkansen is how it starts — Klook sells the route by date and seat class, so a reserved seat on a Friday is the one thing worth settling before the temples.",
  },
  {
    label: jrKansaiAreaPass.title,
    ctaLabel: "Check the Kansai Area Pass →",
    url: jrKansaiAreaPass.url,
    why: "The pass to price if Kyoto is reached from Kansai Airport or paired with Osaka, Nara or Himeji: it covers the Haruka and the JR Nara and Sagano lines, which are the two trains this itinerary actually uses inside Kyoto.",
  },
  {
    label: kyotoKimonoYumeyakata.title,
    ctaLabel: "Check Kyoto kimono rental →",
    url: kyotoKimonoYumeyakata.url,
    why: "The one thing in two Kyoto days that is an appointment rather than a ticket — a dressing slot has to be booked, and the listing's own return deadline of 17:30 is what decides whether the kimono day is Day 1 or Day 2.",
  },
  {
    label: saganoHozugawaGuaranteedTour.title,
    ctaLabel: "Check the Sagano train & boat day →",
    url: saganoHozugawaGuaranteedTour.url,
    why: "If Day 2 is Arashiyama, this is the version with the torokko seat and the river boat already held — the torokko is the only reserved-seat ride in the itinerary and it does not run every month.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Kyoto city buses are flat-fare and pay-on-exit, Kyoto City's own guide tells visitors to avoid two specific bus routes, and the better alternatives are all trains — none of which you can route without data.",
  },
];

/**
 * Kyoto transportation — added 5 Nov 2026 under the pass decision on
 * kyoto-transportation. Guided days and hotels are the 6.5% band, the shinkansen
 * route page 5%, the eSIM 20%. Every url reads out of an existing constant.
 */
export const kyotoTransportTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.kyotoHighlightTour,
    why: "Kinkaku-ji, Fushimi Inari and Arashiyama sit on three different sides of the city, so this is the alternative to working out each transfer yourself.",
  },
  {
    label: kyotoFushimiInariWalkingTour.title,
    ctaLabel: "Check the Fushimi Inari walk →",
    url: kyotoFushimiInariWalkingTour.url,
    why: "Fushimi Inari is about 5 minutes from Kyoto Station on JR, which makes this easy to fit around a morning train. The listing runs three hours.",
  },
  {
    label: arashiyamaSaganoOptionalTour.title,
    ctaLabel: "Check the Arashiyama tour →",
    url: arashiyamaSaganoOptionalTour.url,
    why: "Neither Kyoto day pass covers the JR ride to Arashiyama, so a guided half of the day is worth pricing against the fares and the planning.",
  },
  {
    ...tripPrepProducts.hotelKyotoStation,
    why: "The JR Nara and Sagano lines, the Karasuma subway and the EX buses all start here, so most of the routes on this page begin at your hotel door.",
  },
  {
    label: "Hotels around Karasuma Oike / Shijo",
    ctaLabel: "Check Karasuma Oike hotels on Klook →",
    url: kyotoStayAreas[1].url,
    why: "The one point where the Karasuma and Tozai lines cross, so both subway lines are a short walk away on a day-pass day.",
  },
  {
    label: "Kyoto ↔ Tokyo shinkansen tickets",
    ctaLabel: "Check Tokyo ↔ Kyoto tickets →",
    url: shinkansenTokyoKyoto.url,
    why: "An IC card does not cover the shinkansen, and Klook sells the route by date and seat class.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Pocket Loca plus+ and the operators' fare searches all need data at the bus stop, which is when you will want them.",
  },
];

/** teamLab Forest Fukuoka — the admission itself, on the 5th floor of BOSS E・ZO. */
export const teamlabForestFukuokaTicket: KlookTour = {
  title: "teamLab Forest Fukuoka ticket",
  desc: "Klook's listing for the permanent teamLab museum on the 5th floor of BOSS E・ZO FUKUOKA, with a mobile QR entry and a suggested 1 to 2 hours on the listing",
  url: klookLink("https://www.klook.com/en-US/activity/51227-teamlab-forest-fukuoka/"),
};

/** The one Klook day tour that has the museum inside it — the 6.5% band. */
export const fukuokaTeamlabBusTour: KlookTour = {
  title: "Fukuoka day bus tour with teamLab, strawberry picking & shopping",
  desc: "A join-in coach day out of Fukuoka that puts the teamLab visit inside a wider itinerary rather than leaving it as an hour to fill",
  url: klookLink("https://www.klook.com/en-US/activity/104095-strawberry-shopping-teamlab-fukuoka-join-day-bus-tour/"),
};

/** Dazaifu and the Yanagawa canals — the standard Fukuoka day out. */
export const dazaifuYanagawaDayTour: KlookTour = {
  title: "Dazaifu, Yanagawa river cruise & Itoshima day trip from Fukuoka",
  desc: "A round-trip coach from the Chikushi exit of Hakata Station taking in Dazaifu Tenmangu, the Yanagawa donko boat ride and the Itoshima coast",
  url: klookLink("https://www.klook.com/en-US/activity/121441-dazaifu-yanagawa-river-cruising-one-day-tour-from-fukuoka/"),
};

/** The ten-hour Itoshima version of the same day. */
export const yanagawaItoshimaDayTour: KlookTour = {
  title: "Itoshima & Yanagawa scenic day tour from Fukuoka",
  desc: "Listed as a full day covering Itoshima's Meoto Iwa, Shiraito Falls, Dazaifu and the Yanagawa river cruise in one coach run",
  url: klookLink("https://www.klook.com/en-US/activity/160366-yanagawa-and-itoshima-scenic-day-tour/"),
};

/** The transport pass — 5% band, and the one that includes an airport pick-up. */
export const fukuokaTouristCityPass: KlookTour = {
  title: "Fukuoka Tourist City Pass",
  desc: "Unlimited Nishitetsu and Showa buses, JR, Nishitetsu trains, the city subway and the municipal ferry, collected at the Fukuoka Airport international terminal — the listing states it is not sold to Japanese passport holders",
  url: klookLink("https://www.klook.com/en-US/activity/94833-fukuoka-tourist-city-pass/"),
};

/** The attraction bundle, for a reader whose teamLab hour is one of several. */
export const klookPassFukuoka: KlookTour = {
  title: "Klook Pass Fukuoka",
  desc: "Klook's own multi-attraction pass for the city — the version to price if the teamLab slot is one of three or four paid stops rather than the whole reason you are in Fukuoka",
  url: klookLink("https://www.klook.com/en-US/activity/108593-klook-pass-fukuoka/"),
};

/** Added 7 Nov 2026 for things-to-do-tokyo; live en-US listing in the www.klook.com search index. */
export const klookPassGreaterTokyo: KlookTour = {
  title: "Klook Pass Greater Tokyo",
  desc: "Klook's own multi-attraction pass: pick 2 to 7 attractions from the listing. Worth pricing once three or four paid stops are fixed",
  url: klookLink("https://www.klook.com/en-US/activity/74574-klook-pass-greater-tokyo/"),
};

/**
 * Where to stay around a teamLab Forest slot. Three new destination ids, all
 * confirmed as live en-US hotel searches through the www.klook.com search index
 * on 29 Oct 2026 — p60271497 ("Best hotels near Momochi Seaside Park, Japan
 * 2026"), p50007409 ("Best hotels near Hakata Station, Japan 2026") and
 * p60271225 ("Best hotels near Tenjin Ward, Japan 2026").
 *
 * Momochi leads because it is the only one of the three that is the same
 * waterfront as the museum: BOSS E・ZO is at 2-2-6 Jigyohama in Chuo-ku, and the
 * city subway does not reach it — Fukuoka City's own access page puts the complex
 * 15 minutes on foot from exit 3 of Tojinmachi Station.
 */
export const fukuokaStayAreas: KlookStayArea[] = [
  {
    area: "Momochi / Jigyohama",
    why: "The same stretch of waterfront as the museum — which matters here more than anywhere, because no subway station is at the door: the venue's own access page gives 15 minutes on foot from Tojinmachi exit 3.",
    url: klookLink("https://www.klook.com/en-US/destination/p60271497-momochi-seaside-park/3-hotel/"),
  },
  {
    area: "Hakata Station",
    why: "The Kyushu Shinkansen terminus and the subway Airport Line in one building, so a teamLab slot is a 15-minute ride plus a bus and the trip in or out of the city needs no transfer at all.",
    url: klookLink("https://www.klook.com/en-US/destination/p50007409-hakata-station/3-hotel/"),
  },
  {
    area: "Tenjin",
    why: "The central base and the midpoint of the subway Airport Line between Hakata and Tojinmachi — the pick if the museum is one evening of a Fukuoka trip rather than its reason.",
    url: klookLink("https://www.klook.com/en-US/destination/p60271225-tenjin-ward/3-hotel/"),
  },
];

/**
 * The rest of a Fukuoka day built around a teamLab Forest slot. The museum hour
 * is short — the official listing's own suggested duration is 1 to 2 hours — so
 * every slot here is about what the other seven hours hold.
 *
 * Every url but the ticket's reads out of a constant or array declared above.
 */
export const teamlabFukuokaTripPrep: KlookTripPrepItem[] = [
  {
    label: fukuokaTeamlabBusTour.title,
    ctaLabel: "Check the Fukuoka bus day →",
    url: fukuokaTeamlabBusTour.url,
    why: "The listing that solves the real problem with this museum: an hour inside it is not a day, and this is the one Klook product that builds the rest of the day around the same visit.",
  },
  {
    label: dazaifuYanagawaDayTour.title,
    ctaLabel: "Check the Dazaifu & Yanagawa day →",
    url: dazaifuYanagawaDayTour.url,
    why: "The standard Fukuoka day out, and it pairs neatly with a museum slot: the coach leaves and returns to Hakata Station, which is 15 minutes by subway and a bus from the venue.",
  },
  {
    label: "Hotels around Momochi / Jigyohama",
    ctaLabel: "Check Momochi hotels on Klook →",
    url: fukuokaStayAreas[0].url,
    why: "A 19:00 close and a last entry 30 minutes before it means a late slot ends after dark on a waterfront with no station on it — the one night of a Fukuoka trip where being at the dome rather than at Hakata is worth something.",
  },
  {
    label: fukuokaTouristCityPass.title,
    ctaLabel: "Check the Fukuoka city pass →",
    url: fukuokaTouristCityPass.url,
    why: "The venue is reached by subway plus a bus or a 15-minute walk, and the pass covers the city subway, the Nishitetsu and Showa buses and JR on one ticket — collected at the airport international terminal on arrival.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The Catching and Collecting Forest is played through teamLab's own app on your phone, and the ticket is a QR code — this is not a venue to arrive at waiting for hotel Wi-Fi.",
  },
];

// ---------------------------------------------------------------------------
// Kyoto → Tokyo, added 29 Oct 2026 for kyoto-to-tokyo-shinkansen.
//
// The reverse of the leg this site has covered since tokyo-to-kyoto, and a
// different search: the questions an eastbound traveller asks — which Kyoto
// Station platform, which Tokyo station to get off at, which side Mt Fuji is on
// when you are heading east — are not the ones the westbound guide answers.
//
// One new rail page and one new stay array, no new Klook /activity/ ids. The
// rail page is the usual exception to the HTTP 403 rule: like the Tokyo–Kyoto,
// Tokyo–Nagoya, Tokyo–Karuizawa, Tokyo–Kanazawa and Tokyo–Hiroshima route
// pages it answered an automated read, on 29 Oct 2026, and states "2h"
// shortest, "4h 1m" average, "0 transfer(s)", "352 trains scheduled on Nov. 04,
// 2026", a 06:03 first and 21:38 last departure, and the three seat classes.
//
// Bands: the rail page and the Tokyo airport transfers are the 5% passes-and-
// transport band, the Tokyo hotel searches are 6.5%, and the eSIM is 20%. No
// price appears on any of them, for the usual reason.
// ---------------------------------------------------------------------------

/**
 * Klook's Kyoto → Tokyo rail page. A route page rather than a product id, for
 * the same reason as `shinkansenTokyoKyoto`: the Tokaido Shinkansen is sold by
 * date and seat class, and the route page is the address that keeps working
 * when a train number does not. The station ids are the reverse pair of
 * `shinkansenTokyoKyoto` — Klook sells each direction as its own page.
 */
export const shinkansenKyotoTokyo: KlookTour = {
  title: "Kyoto → Tokyo shinkansen tickets",
  desc: "Klook's Tokaido Shinkansen booking page for the eastbound route, with non-reserved Ordinary, reserved Ordinary and reserved Green Car seats, QR boarding and no transfers",
  url: klookLink("https://www.klook.com/en-US/japan-rail/shinkansen/30-kyoto/28-tokyo/"),
};

/**
 * Where to stay at the Tokyo end of a Kyoto → Tokyo run.
 *
 * No new Klook ids: every url reads out of `whereToStayTokyoAreas`, which is
 * itself built on `tokyoStayAreas`, so each destination id still has one home.
 * What is new is the order and the argument. The where-to-stay page ranks these
 * areas for a whole Tokyo trip; this page ranks them for the twenty minutes
 * after a shinkansen arrives, which puts Marunouchi first — the Tokaido
 * platforms are inside that building — and Shibuya on the list at all, because
 * a Kyoto train calls at Shinagawa before it reaches the terminus.
 *
 * Ueno is deliberately absent: it is the fastest side of the city from Narita,
 * which is the argument the airport pages make, and it is the slowest of the
 * four from a Tokaido platform.
 */
export const kyotoToTokyoArrivalStayAreas: KlookStayArea[] = [
  {
    area: "Tokyo Station / Marunouchi",
    why: "The Tokaido Shinkansen terminates inside the building, so arriving is a walk upstairs rather than a cross-city ride with the cases — and the Narita Express leaves from the same basement on the day you fly home.",
    url: whereToStayTokyoAreas[1].url,
  },
  {
    area: "Ginza",
    why: "One Marunouchi Line stop from Tokyo Station, and the Keikyu–Toei through train reaches Higashi-ginza from Haneda without a change — the pick if the Kyoto train is the second-to-last leg of the trip.",
    url: whereToStayTokyoAreas[4].url,
  },
  {
    area: "Shinjuku",
    why: "Not a shinkansen stop, but a straight Chuo Line run from Tokyo Station and the terminus for the Chuo, Odakyu and Keio lines — the base if Tokyo is several more days rather than one night before a flight.",
    url: whereToStayTokyoAreas[0].url,
  },
  {
    area: "Shibuya",
    why: "Two Yamanote stops from Shinagawa, which is the Tokaido station before the terminus — so getting off early puts you at the door instead of crossing back out of Tokyo Station.",
    url: whereToStayTokyoAreas[3].url,
  },
];

/**
 * The Tokyo end of a Kyoto → Tokyo travel day (added 11 Nov 2026, task R03):
 * hotel 6.5% → subway ticket 5% → eSIM 20%, placed next to the booking-timing
 * table on kyoto-to-tokyo-shinkansen. No new Klook ids — all three products are
 * the shared `tripPrepProducts` entries.
 */
export const kyotoToTokyoTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelTokyoStation,
    why: "The Tokaido Shinkansen terminates inside Tokyo Station, so a Marunouchi room is a short walk from the platform rather than a cross-city ride with the cases at the end of the day.",
  },
  {
    ...tripPrepProducts.subway,
    why: "The shinkansen ticket ends at the gate. This one covers every Tokyo Metro and Toei Subway line for 24, 48 or 72 hours, for the days after you arrive.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Your seat is a QR code or a reservation on your phone, and choosing between Shinagawa and Tokyo Station happens while the train is moving — both need data before you leave Kyoto.",
  },
];

// ---------------------------------------------------------------------------
// The working-holiday arrival and the foreigner's home line — added 29 Oct 2026
// for japan-sim-card-working-holiday and japan-home-internet-for-foreigners.
//
// No new Klook ids at all. Both readers buy their actual connection from Sakura
// Mobile's own programme, so Klook is here for the two gaps that programme
// cannot fill: the days between landing and a registered address (the eSIM,
// 20%), the arrival itself with a year's luggage (the two Tokyo airport
// transfers, 5%, already declared above for tokyo-airport-transfer), and the
// weeks between ordering a fibre line and an engineer turning up (the monthly
// pocket WiFi rentals, which live in lib/pocket-wifi.ts with their own two check
// dates and are read from there by the page rather than copied here).
//
// Prices are absent for the usual reason: Klook answers automated reads of its
// product pages with HTTP 403.
// ---------------------------------------------------------------------------

/**
 * The arrival week on a working-holiday visa. Ordered by when you need it: data
 * on the day you land, then the ride into the city, then the seat version of the
 * same ride for one person with one case.
 */
export const workingHolidayArrivalPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "A Japanese number needs a residence card registered to an address, and the Immigration Services Agency gives you 14 days from deciding on that address to register it — so your first fortnight online is a travel product whatever plan you eventually sign.",
  },
  {
    label: tokyoPrivateAirportTransfer.title,
    ctaLabel: "Check a private airport transfer →",
    url: tokyoPrivateAirportTransfer.url,
    why: "A working holiday arrives with a year of luggage rather than a cabin bag, and the Narita Express has no space for two hold cases at rush hour — this is booked to a street address, which is what you have on day one instead of a station name.",
  },
  {
    label: tokyoSharedAirportTransfer.title,
    ctaLabel: "Check a shared airport transfer →",
    url: tokyoSharedAirportTransfer.url,
    why: "The seat-price version for one person: still door-to-door to a central Tokyo address, which matters on the day your sharehouse check-in is a time slot rather than a 24-hour desk.",
  },
];

/**
 * What covers a flat while a fibre order is in the system. The eSIM is the only
 * Klook product here — the two monthly pocket WiFi rentals come from
 * lib/pocket-wifi.ts, where their specs and rates each carry a check date, and
 * the page renders them from there rather than from a second copy in this file.
 */
export const homeInternetGapPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Sakura Mobile puts a fibre installation at one week to one month, and a Japanese tenancy almost never starts with a live line — a travel eSIM is the no-contract way to have the flat online on the night you get the keys.",
  },
];

// ---------------------------------------------------------------------------
// Three days across Osaka and Kyoto — added 30 Oct 2026 for
// osaka-kyoto-3-day-itinerary.
//
// No new Klook ids at all, which is the point: every product this itinerary
// sells already has a home in this file, verified on the date its own block
// records. The airport trains (`jrHarukaUrl`, `nankaiRapitUrl`), USJ
// (`usjStudioPassUrl`), the Kyoto–Nara and Arashiyama–Fushimi Inari coach days,
// the Dotonbori boat, the Kansai Area Pass, the Osaka Amazing Pass, the two
// Tokaido route pages and the eSIM are all reused unchanged.
//
// Bands, in the order the page sells them: the guided days, the food walks and
// every hotel search are 6.5%; the two rail passes, the two airport trains and
// the shinkansen route pages are 5%; the eSIM is 20%. The USJ Studio Pass is
// the one headline product on this page Klook pays little or nothing for, which
// is why GetYourGuide sits beside it (see lib/gyg-links.ts) rather than
// replacing it.
// ---------------------------------------------------------------------------

/**
 * Where three days split between the two cities actually sleep.
 *
 * No new destination ids: the Osaka entries read out of `whereToStayOsakaAreas`
 * (via `osakaTwoDayStayAreas`'s sources) and the Kyoto ones out of
 * `whereToStayKyotoAreas`, so each Klook id still has exactly one home and this
 * page cannot drift away from the two area guides.
 *
 * The order is the argument. On three days the question is not "which area" but
 * "how many times do I move the luggage", so the two single-base options lead
 * and the split-stay areas follow with the condition each one carries.
 */
export const osakaKyotoThreeDayStayAreas: KlookStayArea[] = [
  {
    area: "Namba, Osaka (three nights, one base)",
    why: "The default: Dotonbori, Kuromon Market and the Shinsaibashi arcade are the evening and they are on foot, the Nankai terminus for Kansai Airport is underneath, and Kyoto is about 30 minutes away on the city's own figure once you walk or ride to Umeda.",
    url: whereToStayOsakaAreas[1].url,
  },
  {
    area: "Umeda / Osaka Station, Osaka (three nights, one base)",
    why: "The pick if two of the three days are in Kyoto or Nara: the JR Kyoto Line special rapids leave from here, so the Kyoto day starts on a platform rather than on a subway to a platform, and Shin-Osaka is two Midosuji stops for the shinkansen.",
    url: whereToStayOsakaAreas[0].url,
  },
  {
    area: "Kyoto Station (two nights, split stay)",
    why: "The Kyoto half of a split stay. Every Haruka from Kansai Airport and every Tokaido train arrive under it, the 100 and 101 sightseeing buses start at it, and the JR Nara and Sagano lines put Fushimi Inari and Arashiyama 9 and 11 minutes out without a bus.",
    url: whereToStayKyotoAreas[0].url,
  },
  {
    area: "Karasuma Oike / Shijo, Kyoto (two nights, split stay)",
    why: "The one crossing of Kyoto's two subway lines, with Nishiki Market and Pontocho on foot — the split-stay option if the point of moving hotels is to get a Kyoto evening rather than to shorten a morning.",
    url: whereToStayKyotoAreas[1].url,
  },
  {
    area: "Universal City, Osaka (only if USJ is one of the three days)",
    why: "A short walk from the gates on the JR Yumesaki Line, and worth it only on the night before a park day: you are 20 minutes of JR from everything else here on the Osaka Convention & Tourism Bureau's own figure, and no Osaka Metro pass reaches you.",
    url: whereToStayOsakaAreas[3].url,
  },
];

/**
 * The bookings a three-day Kansai trip makes before it flies, in band order.
 *
 * Every url reads out of a constant declared above, so nothing here is a second
 * source of truth for a Klook id.
 */
export const osakaKyotoThreeDayTripPrep: KlookTripPrepItem[] = [
  {
    label: jrKansaiAreaPass.title,
    ctaLabel: "Check the Kansai Area Pass →",
    url: jrKansaiAreaPass.url,
    why: "The one pass shaped like this trip: it covers the Haruka from Kansai Airport, the Osaka–Kyoto special rapids and the JR Nara and Sagano lines inside Kyoto. Price the three-day version against two airport singles plus two city hops before you buy — our Kansai Area Pass guide does the arithmetic.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "If the pass does not pay, this is the airport leg on its own — and the discounted one-way for foreign passport holders entering as temporary visitors went up on 1 November 2026, so a trip straddling that date pays two different prices for the same ride.",
  },
  {
    ...tripPrepProducts.rapit,
    why: "The Namba version of the same arrival. Nankai's Rapi:t reaches Namba in a minimum of 34 minutes, which is the reason a Namba base can be reached without a change at all.",
  },
  {
    ...tripPrepProducts.osakaPass,
    why: "Worth it only on a day that is genuinely Osaka: the castle, the Umeda deck and the Dotonbori boat are all on it, and on three days that day is Day 1. It does not cover JR, so it does nothing for the Kyoto day.",
  },
  {
    label: kyotoNaraKiyomizuTour.title,
    ctaLabel: "Check the Kyoto–Nara day →",
    url: kyotoNaraKiyomizuTour.url,
    why: "The listing to open if Day 2 or Day 3 should be handed to a coach rather than routed by you — Kyoto's headline sights sit on four different sides of the city, which is the single thing a guided day actually solves.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Three days across two cities is four or five rail decisions a day on three operators' networks — JR, Hankyu and Keihan all run the Osaka–Kyoto hop — and every timetable, platform and delay notice arrives on your phone.",
  },
];

// ---------------------------------------------------------------------------
// The Sapporo Snow Festival — added 30 Oct 2026 for sapporo-snow-festival-tours.
//
// The winter block above (28 Oct 2026) already carried the Hokkaido products a
// twelve-day winter route needed: the New Chitose transfer, the two resort
// shuttles, the Wonderland snow park half day, the Lake Shikotsu ice festival
// half day, the Otaru snow-park day, the Asahiyama Zoo winter day and the
// Sapporo Station hotel search. Those are reused here unchanged.
//
// What is new is everything a reader whose whole trip is the festival needs and
// that block did not have: the whole-island rail pass, the Lake Shikotsu shuttle
// as a seat rather than a tour, two Jozankei days, the Noboribetsu–Toya–Otaru
// day, the deck that looks down the Odori site, and two more hotel searches.
//
// One honest limitation, stated on the page as well as here: on 30 Oct 2026 no
// Klook listing sold the Sapporo Snow Festival itself, and none should — all
// three sites are free to walk into on the organiser's own FAQ ("全会場無料で
// す"). What Klook sells is the week around it, which is what these listings
// are and what the page says they are.
//
// Verification, all on 30 Oct 2026. Klook answers automated reads of its
// /activity/ and /destination/ pages with HTTP 403, so every URL below was
// confirmed live, on sale and in its en-US form through the www.klook.com search
// index. The whole-island JR Hokkaido Rail Pass is the one the winter block
// deliberately left out on 28 Oct because its en-US form could not be confirmed
// then; it was confirmed on this date and is included.
//
// Bands: the guided days and the three hotel searches are 6.5%, the rail pass
// and the airport and festival shuttles are 5%, the eSIM 20%. The TV Tower and
// Moiwa set ticket is an admission rather than a tour, so it is never a headline
// CTA on the page. No price appears anywhere, for the usual reason.
// ---------------------------------------------------------------------------

/**
 * The whole-island pass, as distinct from `jrEastSouthHokkaidoPass`: this one is
 * JR Hokkaido's own network — Sapporo, Furano, Noboribetsu and the rest — and is
 * the pass a trip that flies into New Chitose and stays in Hokkaido should price.
 * The JR East–South Hokkaido pass above is for a Tokyo-in, Hokkaido-out route.
 */
export const jrHokkaidoRailPass: KlookTour = {
  title: "JR Hokkaido Rail Pass",
  desc: "JR Hokkaido's own island pass in its consecutive-day and flexible versions — the one to price for a trip that flies into New Chitose and travels inside Hokkaido rather than down to Honshu",
  url: klookLink("https://www.klook.com/en-US/activity/3067-jr-hokkaido-rail-pass-jr-pass/"),
};

/** The Lake Shikotsu ice festival as a coach seat rather than a guided day. */
export const lakeShikotsuIceFestivalShuttleBus: KlookTour = {
  title: "Sapporo – Chitose Lake Shikotsu Ice Festival shuttle bus",
  desc: "A round-trip coach seat from Sapporo to the Lake Shikotsu ice festival, for travellers who want the February evening without a guide attached to it",
  url: klookLink("https://www.klook.com/en-US/activity/103596-sapporo-lake-shikotsu-shuttle-bus/"),
};

/** Jozankei and the Hill of the Buddha — the city-highlights day. */
export const sapporoJozankeiBuddhaDayTour: KlookTour = {
  title: "Sapporo, Jozankei & Hill of the Buddha day tour",
  desc: "A full day pairing the Jozankei gorge with Tadao Ando's Hill of the Buddha, Shiroi Koibito Park and the beer museum — the guided version of a Sapporo day that is not the festival sites",
  url: klookLink("https://www.klook.com/en-US/activity/156263-jozankei-hill-of-the-buddha-beer-museum-hokkaido-day-tour/"),
};

/** Jozankei as a hot-spring day with the bus ticket inside the booking. */
export const jozankeiHotSpringBusTrip: KlookTour = {
  title: "Jozankei hot-spring day trip with bus ticket",
  desc: "A Jozankei onsen day sold with the Jotetsu bus ticket in it, which is the half-day to put opposite an evening at the Odori and Susukino sites",
  url: klookLink("https://www.klook.com/en-US/activity/86391-hokkaido-join-bus-trip-jozankei-hot-spring/"),
};

/** Noboribetsu, Lake Toya and Otaru — the long day out of Sapporo. */
export const noboribetsuToyaOtaruDayTour: KlookTour = {
  title: "Noboribetsu, Lake Toya & Otaru day tour from Sapporo",
  desc: "A panoramic join-in day south and west of the city, for a festival trip with a spare day that should not be a fourth evening at Odori",
  url: klookLink("https://www.klook.com/en-US/activity/97495-noboribetsu-touyako-otaru-one-day-bus-tour-join-one-day-bus-tour-sapporo/"),
};

/**
 * The deck that looks straight down the Odori site, sold with the Moiwa ropeway.
 *
 * An admission, not a tour, so it never leads a CTA row on the page — it is here
 * because the Odori snow sculptures run eleven blocks in a straight line from the
 * foot of this tower, which is the one thing a deck ticket buys at this festival
 * that a guided day does not.
 */
export const sapporoTvTowerMoiwaSetTicket: KlookTour = {
  title: "Sapporo TV Tower observation deck + Mt. Moiwa ropeway set ticket",
  desc: "The Odori-end observation deck bundled with the Mt. Moiwa ropeway — the deck stands at West 1, which is where the Odori site's eleven blocks of sculptures begin",
  url: klookLink("https://www.klook.com/en-US/activity/22630-sapporro-tv-tower-moiwa-ropeway-hokkaido/"),
};

/**
 * Where a festival trip sleeps. Three searches, ordered by what each one buys on
 * eight outdoor days at a mean daily maximum of 0.4°C.
 *
 * Sapporo Station reads its id out of `japanWinterStayAreas`, where it was
 * confirmed on 28 Oct 2026; Susukino and Otaru Station are new destination pages,
 * both confirmed in en-US form on 30 Oct 2026.
 */
export const sapporoSnowFestivalStayAreas: KlookStayArea[] = [
  {
    area: "Sapporo Station",
    why: "One subway stop or a covered walk from Odori, and where the Rapid Airport from New Chitose puts you down — which on eight February days matters more than any view, because it is the base that lets you go back indoors between sites.",
    url: japanWinterStayAreas[6].url,
  },
  {
    area: "Susukino",
    why: "The ice-sculpture site is the street outside: the Susukino site runs along Ekimae-dori between South 4 and South 6, lit until 23:00, so the late half of the festival is a walk home rather than a last subway.",
    url: klookLink("https://www.klook.com/en-US/destination/p50291802-susukino/3-hotel/"),
  },
  {
    area: "Otaru Station",
    why: "The fallback when Sapporo is full, and a destination in its own right — Otaru is 33 to 41 minutes out on the JR Hakodate Line by Rapid Airport and runs its own Snow Light Path in the same stretch of February.",
    url: klookLink("https://www.klook.com/en-US/destination/p50045503-otaru-station/3-hotel/"),
  },
];

/**
 * What a festival trip books before it flies. The eSIM leads because the one
 * thing an eight-day outdoor event in Hokkaido generates is same-day change —
 * weather, shuttle queues, a site closing early.
 */
export const sapporoSnowFestivalTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Three sites, one of them a 25-minute subway-and-shuttle ride away, in a month when the daily maximum averages 0.4°C — the shuttle timings, the site notices and the weather all arrive on your phone rather than at a counter.",
  },
  {
    label: jrHokkaidoRailPass.title,
    ctaLabel: "Price the JR Hokkaido pass →",
    url: jrHokkaidoRailPass.url,
    why: "Worth pricing only if the trip leaves the city: the airport run is ¥1,230 each way on JR Hokkaido's own figure, so a pass pays when Otaru, Asahikawa or Noboribetsu are also on the plan rather than when Sapporo alone is.",
  },
  {
    label: newChitoseSapporoSharedTransfer.title,
    ctaLabel: "Check the airport transfer →",
    url: newChitoseSapporoSharedTransfer.url,
    why: "The alternative to the train with cases in February: a booked seat, which the listing requires 45 minutes after a domestic arrival and 90 after an international one — so it is bought before you fly, not on the day.",
  },
  {
    label: "Hotels around Sapporo Station",
    ctaLabel: "Check Sapporo hotels on Klook →",
    url: japanWinterStayAreas[6].url,
    why: "The dates have been public since 11 February 2026, when the organising committee announced them in the same notice that closed the 76th festival — which is why rooms for these eight nights are the booking to settle first and the one this page cannot quote a price for.",
  },
];

// ---------------------------------------------------------------------------
// The two long-stay telecom entry pages added 30 Oct 2026 —
// japan-sim-card-for-students and japan-phone-number-for-foreigners.
//
// No new Klook ids: both blocks read products already declared in this file.
// The eSIM is `tripPrepProducts.esim` (listing 109393, 20%) and the two Tokyo
// airport transfers are `tokyoPrivateAirportTransfer` and
// `tokyoSharedAirportTransfer` (listings 23053 and 136963, 5%), each first
// confirmed on the date its own block above records. All three were re-confirmed
// live and on sale as en-US listings through the www.klook.com search index on
// 30 Oct 2026, which is the usual route — Klook answers automated reads of its
// product pages with HTTP 403, and that is also why no price appears here.
//
// Sakura Mobile's own programme carries the monthly plans on both pages, so Klook
// is here only for the thing a monthly plan cannot do: cover the fortnight
// between landing and a residence card that shows a Japanese address.
// ---------------------------------------------------------------------------

/**
 * The arrival weeks of a student visa. The eSIM leads because it is the only item
 * a reader can finish before leaving home; the two transfers follow because a
 * study year arrives with hold luggage and a dormitory check-in slot.
 */
export const studentSimArrivalPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "A monthly student plan verifies against a residence card registered to your current address, and the Immigration Services Agency gives you 14 days from deciding on that address to register it — so the first fortnight online is a travel product whatever you sign afterwards.",
  },
  {
    label: tokyoSharedAirportTransfer.title,
    ctaLabel: "Check a shared airport transfer →",
    url: tokyoSharedAirportTransfer.url,
    why: "The seat-price version of a door-to-door ride, booked to a street address rather than a station — which is what a dormitory or sharehouse check-in gives you on day one, usually inside a fixed time slot.",
  },
  {
    label: tokyoPrivateAirportTransfer.title,
    ctaLabel: "Check a private airport transfer →",
    url: tokyoPrivateAirportTransfer.url,
    why: "A study year travels with more than a cabin bag, and the airport trains have no room for two hold cases at rush hour; the listing is a 24-hour service in 7- and 10-seater sizes, which also covers a late landing.",
  },
];

/**
 * The one Klook product a reader hunting a Japanese phone number has a use for —
 * and the honest framing for it, since the listing is data only and therefore
 * cannot answer the question the page is named after.
 */
export const phoneNumberDataPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "It carries no Japanese number at all — the listing states data only — so it is here for the opposite reader: the one who came looking for a number, worked out that maps, messaging and email are all they actually need, and wants the cheap no-contract way to have them working on landing.",
  },
];

// ---------------------------------------------------------------------------
// JR TOKYO Wide Pass, added 30 Oct 2026 for /guides/transport/tokyo-wide-pass
//
// JR East's own three-day Kanto pass, in Klook's 5% passes-and-transport band —
// which is why it is the headline CTA on that guide and the Kawaguchiko, Nikko
// and Karuizawa day tours already declared above (6.5%) sit in the body.
//
// Klook answers automated reads of its /activity/ pages with HTTP 403, so
// listing 49927 was confirmed live and on sale as an en-US listing through the
// www.klook.com search index on 30 Oct 2026 ("JR Tokyo Wide Pass"), along with
// its redemption at Haneda and Narita on a voucher plus passport. No price
// appears here, for the usual reason — and because JR East's own figure
// (¥16,000 adult from 14 March 2026) is the one the guide quotes instead.
// ---------------------------------------------------------------------------

export const jrTokyoWidePass: KlookTour = {
  title: "JR TOKYO Wide Pass (3 consecutive days)",
  desc: "JR East's own Kanto pass as Klook sells it — the listing names Mt Fuji, Karuizawa, Izu and GALA Yuzawa as what it reaches, and redeems at Haneda or Narita on your passport",
  url: klookLink("https://www.klook.com/en-US/activity/49927-jr-east-tokyo-tokyowidepass/"),
};

// ---------------------------------------------------------------------------
// Hokkaido as a whole trip, and Otaru as a day — added 1 Nov 2026 for
// hokkaido-7-day-itinerary and otaru-day-trip-from-sapporo.
//
// The two Hokkaido blocks above cover the city week: the 28 Oct 2026 winter
// block (New Chitose transfer, the Niseko and Rusutsu resort shuttles, the
// Wonderland snow park half day, the Lake Shikotsu ice festival, the Otaru
// snow-park day, the Asahiyama Zoo winter day, the Sapporo Station hotel
// search) and the 30 Oct 2026 Snow Festival block (the whole-island rail pass,
// the Lake Shikotsu shuttle seat, two Jozankei days, the Noboribetsu–Toya–Otaru
// day, the TV Tower deck, and the Susukino and Otaru Station hotel searches).
// Both are reused here unchanged rather than re-declared.
//
// What is new is the half of Hokkaido those pages had no reason to carry. A
// seven-day island route is not a city week: it goes inland to Asahikawa, Biei
// and Furano, which is a summer season as much as a winter one, and it sleeps
// in up to four places rather than one. And a day in Otaru is not the Otaru
// stop inside a coach day: what a reader actually books there is a canal
// cruise, a whisky distillery one stop further west, or a ski half-day — so
// those are the listings added, plus the Furano hotel search.
//
// Verification, all on 1 Nov 2026. Klook answers automated reads of its
// /activity/ and /destination/ pages with HTTP 403, so every URL below was
// confirmed live, on sale and in its en-US form through the www.klook.com
// search index. Three listings were found only in other storefronts on that
// date and are therefore deliberately absent: /activity/17912 (Otaru Canal and
// Yoichi Distillery, en-AU only), /activity/153314 (Sapporo and Otaru
// Highlights, en-AU only) and /activity/96776 (Otaru sightseeing and skiing,
// no locale prefix). en-US listings covering the same ground are used instead.
//
// Bands: every guided day, the canal cruise and all four hotel searches are
// 6.5%; the rail pass and the airport and resort transfers are 5%; the eSIM is
// 20%. No price appears anywhere, for the usual reason — and because on these
// two pages the fares that matter (¥800 Sapporo–Otaru, ¥1,230 to the airport,
// ¥28,000 for the seven-day island pass) are the operators' own.
// ---------------------------------------------------------------------------

/**
 * Otaru and Yoichi in one booked day, with a guide who works in English.
 *
 * The listing that answers the one real problem with doing Yoichi yourself:
 * Nikka's own access page warns that "there are few trains operating between
 * Otaru Station and Yoichi Station", and a distillery tour is a fixed-time
 * reservation at the far end of that gap.
 */
export const otaruYoichiDayTour: KlookTour = {
  title: "Otaru & Yoichi day trip from Sapporo",
  desc: "The canal town and the Yoichi distillery in one booked day with a Chinese- and English-speaking guide — the version that takes the sparse Otaru–Yoichi train service out of the plan",
  url: klookLink("https://www.klook.com/en-US/activity/181965-hokkaido-otaru-yoichi-one-day-tour-chinese-english-tour-guide/"),
};

/** The longer west-coast version: Otaru, Cape Kamui, Shimamui and Yoichi. */
export const otaruShakotanYoichiCoachTour: KlookTour = {
  title: "Otaru, Cape Kamui, Shimamui Coast & Yoichi distillery coach day",
  desc: "A full day down the Shakotan peninsula with the Yoichi distillery attached — the itinerary to take when Otaru on its own is not enough for the day",
  url: klookLink("https://www.klook.com/en-US/activity/199716-otaru-cape-kamui-shimamui-coast-yoichi-distillery-coach-tour/"),
};

/**
 * The canal cruise itself, sold with a seal-carving workshop.
 *
 * Worth being clear what this is and is not: the operator's own fares are
 * published (¥1,800 day, ¥2,000 night, 40 minutes) and both articles quote
 * them, so this listing is here for the reader who wants the cruise with an
 * indoor half-hour attached — not as a cheaper way to buy the boat.
 */
export const otaruCanalCruiseSealCarving: KlookTour = {
  title: "Otaru canal cruise + seal-carving workshop",
  desc: "The 40-minute canal cruise bundled with a hanko seal-carving workshop — the indoor half of an Otaru afternoon, which in February is the half that decides the day",
  url: klookLink("https://www.klook.com/en-US/activity/157929-otaru-canal-cruise-and-hanko-making-experience-in-hokkaido/"),
};

/** Cape Kamui, the canal cruise and Shiroi Koibito Park as one summer day. */
export const capeKamuiOtaruCanalCruiseDayTour: KlookTour = {
  title: "Cape Kamui, Otaru canal cruise & Shiroi Koibito Park day tour",
  desc: "A summer-weighted day out of Sapporo with the canal cruise ticket inside the booking and free time in Otaru, rather than a photo stop at the canal",
  url: klookLink("https://www.klook.com/en-US/activity/150100-cape-kamui-otaru-otaru-canal-cruise-shiroi-koibito-park-day-tour/"),
};

/** The spring version of the same west-coast run. */
export const otaruShakotanKamuiDayTour: KlookTour = {
  title: "Otaru & Shakotan Peninsula Cape Kamui day tour from Sapporo",
  desc: "The Shakotan coast road and Otaru in a single join-in day — the listing to open for a trip in the weeks the Hokkaido cherry blossom runs, which is May rather than April",
  url: klookLink("https://www.klook.com/en-US/activity/85124-hokkaido-otaru-join-one-day-tour-cheery-blossom/"),
};

/**
 * Furano and Biei as a day out of Sapporo. Three listings rather than one
 * because they differ on the thing that actually decides a summer day there:
 * whether the Blue Pond is in the itinerary, whether Farm Tomita is, and
 * whether lunch and a craft stop are inside the price.
 */
export const furanoBieiBluePondDayTour: KlookTour = {
  title: "Furano, Biei Blue Pond & Shikisai-no-oka day trip from Sapporo",
  desc: "The inland day that includes the Shirogane Blue Pond and the Shikisai-no-oka flower hills, with a tractor ride and a lavender-pillow workshop inside the booking",
  url: klookLink("https://www.klook.com/en-US/activity/88593-furano-biei-blue-pond-shikisai-no-oka-day-tour-bus-tour-sapporo/"),
};

/** The lavender-first version of the inland day. */
export const bieiFuranoLavenderDayTour: KlookTour = {
  title: "Biei & Furano lavender day tour from Sapporo",
  desc: "The lavender version of the inland day, built around Farm Tomita in the weeks it is actually in flower rather than around the hills themselves",
  url: klookLink("https://www.klook.com/en-US/activity/89729-hokkaido-biei-furano-day-tour-sapporo/"),
};

/** The join-in coach version, with a Furano lunch named in the listing. */
export const sapporoFuranoBieiLavenderBusTour: KlookTour = {
  title: "Sapporo, Furano & Biei join-in bus tour with lavender",
  desc: "The plain join-in coach down the same route with a Furano lunch in it — the cheapest shape of a Furano day for a traveller who is not hiring a car",
  url: klookLink("https://www.klook.com/en-US/activity/86149-sapporo-furano-biei-join-one-day-bus-tour-lavender/"),
};

/**
 * The two Otaru-side ski days. Both are the no-gear version — lift ticket,
 * rental and the coach from Sapporo in one booking — which is what a seven-day
 * island route or an Otaru day needs, as distinct from the Niseko rental in the
 * ski block above, which assumes you are already standing in Hirafu.
 */
export const sapporoKokusaiSkiOtaruAquariumDayTour: KlookTour = {
  title: "Sapporo Kokusai ski resort & Otaru Aquarium day tour",
  desc: "Half a day on the snow at Sapporo Kokusai and half in Otaru, with the coach from the city in the booking — the listing for a trip carrying no ski gear",
  url: klookLink("https://www.klook.com/en-US/activity/97999-sapporo-kokusai-ski-resort-otaru-aquarium-day-tour-hokkaido/"),
};

/** Otaru's own ski hill, a short run inland from the canal. */
export const otaruAsarigawaSkiDayTour: KlookTour = {
  title: "Otaru Asarigawa Onsen ski resort day trip from Sapporo",
  desc: "Lift ticket, equipment rental and instruction at Otaru's own ski area with round-trip transport from Sapporo — the shortest ski day on this side of Hokkaido",
  url: klookLink("https://www.klook.com/en-US/activity/171758-hokkaido-otaru-asarigawa-ski-resort-tour-from-sapporo/"),
};

/**
 * Where a seven-day Hokkaido route sleeps. Four bases, in route order.
 *
 * Sapporo Station, Otaru Station and Niseko read their ids out of the two
 * blocks above — `japanWinterStayAreas` (28 Oct 2026) and
 * `sapporoSnowFestivalStayAreas` (30 Oct 2026) — so the island pages cannot
 * drift apart. Furano is the one new destination page, confirmed in en-US form
 * on 1 Nov 2026.
 */
export const hokkaidoSevenDayStayAreas: KlookStayArea[] = [
  {
    area: "Sapporo Station",
    why: "Three or four of the seven nights, because every inland and coastal day on this route starts here: the Rapid Airport from New Chitose, the Lilac and Kamui to Asahikawa and, in summer, the Furano Lavender Express all leave from this building, and Odori is one subway stop or a covered walk.",
    url: japanWinterStayAreas[6].url,
  },
  {
    area: "Otaru Station",
    why: "Worth one night rather than a day trip if you want the canal lit and the Snow Light Path after the day-trippers have gone — it is ¥800 and about 33 minutes back to Sapporo on JR Hokkaido's own figures, so moving here costs almost nothing.",
    url: sapporoSnowFestivalStayAreas[2].url,
  },
  {
    area: "Furano",
    why: "The base that turns the inland leg from a ten-hour coach day into two unhurried ones — Farm Tomita and the Biei hills in the morning light instead of at the back of a day trip, and in summer the Furano Lavender Express is two hours back to Sapporo.",
    url: klookLink("https://www.klook.com/en-US/destination/c85051-furano/3-hotel/"),
  },
  {
    area: "Niseko",
    why: "Only if the week is about the snow: the lifts are at the door and the coach that takes ski bags runs there directly from New Chitose, which is why the ski version of this route skips Sapporo on the arrival day.",
    url: japanWinterStayAreas[7].url,
  },
];

/**
 * What a seven-day Hokkaido trip books before it flies. The pass is second
 * rather than first because on the route this page actually lays out it does
 * not pay — which is the honest headline, and the reason the item is here at
 * all is so a reader can price their own legs against it.
 */
export const hokkaidoSevenDayTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Seven days across up to four bases on an island where a February road can close and a July country bus runs a handful of times a day — every timetable, closure notice and tour pick-up point on this route arrives on your phone rather than at a counter.",
  },
  {
    label: jrHokkaidoRailPass.title,
    ctaLabel: "Price the JR Hokkaido pass →",
    url: jrHokkaidoRailPass.url,
    why: "Price it, do not assume it. The seven-day pass is ¥28,000 on JR Hokkaido's own figure while the rail legs this route uses come to roughly ¥17,000 — so it pays only if you add a second long inland or coastal run, and the four-day Sapporo–Furano Area Pass at ¥11,000 is the one that clears its own cost on this itinerary.",
  },
  {
    label: newChitoseSapporoSharedTransfer.title,
    ctaLabel: "Check the airport transfer →",
    url: newChitoseSapporoSharedTransfer.url,
    why: "The alternative to the Rapid Airport with hold cases: a booked seat to the hotel door, which the listing requires 45 minutes after a domestic arrival and 90 after an international one — so it is a before-you-fly decision rather than an on-the-day one.",
  },
  {
    label: "Hotels around Sapporo Station",
    ctaLabel: "Check Sapporo hotels on Klook →",
    url: japanWinterStayAreas[6].url,
    why: "The booking with the least slack in it on this route: three or four of the seven nights sit here, and the February week the island is busiest is a set of fixed dates announced a year ahead by the Snow Festival committee.",
  },
  {
    label: nisekoResortShuttleBus.title,
    ctaLabel: "Check the Niseko shuttle →",
    url: nisekoResortShuttleBus.url,
    why: "Only for the ski version of this week, and then it is the whole arrival plan: the listing carries ski equipment and one piece of luggage per person, which a Rapid Airport seat and a JR change at Otaru do not.",
  },
];

/**
 * What an Otaru day books, in the order the day uses them. Short on purpose:
 * the train needs nothing booked and the streets are free, so there are only
 * three honest items — the data, the guided version of the Yoichi half, and a
 * room if the canal after dark is the reason you came.
 */
export const otaruDayTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "The two things that change an Otaru day are notices rather than tickets: the canal cruise is weather-dependent on the operator's own warning, and the Otaru–Yoichi train service is sparse enough that one missed connection rewrites the afternoon.",
  },
  {
    label: otaruYoichiDayTour.title,
    ctaLabel: "Check the Otaru & Yoichi day →",
    url: otaruYoichiDayTour.url,
    why: "The one part of this day that is genuinely easier booked: Nikka's distillery tour is a fixed-time reservation and its own access page warns there are few trains between Otaru and Yoichi, so a coach removes the only real timing risk in the plan.",
  },
  {
    label: "Hotels around Otaru Station",
    ctaLabel: "Check Otaru hotels on Klook →",
    url: sapporoSnowFestivalStayAreas[2].url,
    why: "For the reader who works out mid-page that the canal is better after dark than at lunchtime — and for the first fortnight of February, when the Snow Light Path runs and Sapporo's own rooms are at their tightest.",
  },
];

// ---------------------------------------------------------------------------
// Ski entry pages, added 1 Nov 2026 for gala-yuzawa-ski-day-trip-from-tokyo
// and niseko-ski-tours.
//
// Published now rather than in December because both pages sell a season that
// starts on a date the operators have already announced: GALA Yuzawa opens its
// slopes 19 Dec 2026 and the four Niseko United areas open 28 Nov 2026. A ski
// page that lands in December lands after the search it answers has begun.
//
// Most of what these two pages need is already in this file and is reused
// rather than re-declared: the 25 Oct 2026 ski block (the GALA/Naeba chartered
// day, the bare GALA lift ticket, the Niseko Hirafu rental) and the 28 Oct 2026
// winter block (the Niseko and Rusutsu resort shuttles, the New Chitose shared
// transfer, the Niseko hotel search inside `japanWinterStayAreas`), plus the
// JR TOKYO Wide Pass from 30 Oct 2026 and the Nagano/Niigata JR EAST PASS.
//
// What is new is the half neither page could borrow. GALA had no lesson listing
// and no Tokyo-departing coach day — the chartered car in the ski block is a
// different product at a different price point. Niseko had rental, a shuttle
// and a hotel search but nothing you actually *do*: no lift-pass-plus-bus day,
// no lesson, no multi-day tour, no private driver.
//
// Verification, all on 1 Nov 2026. Klook answers automated reads of its
// /activity/ and /destination/ pages with HTTP 403, so every URL below was
// confirmed live, on sale and in its en-US form through the www.klook.com
// search index. Deliberately absent, each found only in another storefront on
// that date: /activity/19078 (GALA Yuzawa 2/4-hour lesson, en-PH only),
// /activity/181173 (Tokyo-departure Iwappara day, no locale prefix),
// /activity/54176 (en-MY, and its indexed title names Mt. Fuji rather than
// Yuzawa), /activity/101880 (Echigo-Yuzawa resort ticket, en-SG only) and
// /activity/17870 (Rusutsu/Hirafu ski bus with lift ticket, en-PH only).
// /activity/8768 stays out for the reason the 25 Oct block records — its slug
// carries a trailing space Klook serves URL-encoded.
//
// Bands: every lesson, coach day, multi-day tour, private charter and the
// Niseko hotel search are 6.5%; the two rail passes and the airport and resort
// shuttles are 5%; the eSIM is 20%. The bare GALA lift ticket is a ticket, so
// it stays a secondary link rather than a CTA. No price appears anywhere — for
// the usual 403 reason, and because on these two pages the figures that matter
// (¥8,000 at the GALA window, ¥13,500 for a peak Niseko day, ¥6,000 on the
// airport coach) are the operators' own.
// ---------------------------------------------------------------------------

/**
 * GALA Yuzawa's own ski and snowboard coaching, 3 to 6 hours.
 *
 * The listing that matters most on a beginner's first day out of Tokyo, and the
 * reason it is a separate booking: GALA's own price list sells a lift ticket and
 * a rental set, not instruction. The indexed listing names Chinese- and
 * English-speaking instructors and states plainly that a "Cable Car Lift Ticket"
 * must be bought as well by anyone who wants to ski — which is the single thing
 * readers get wrong about buying a lesson here.
 */
export const galaYuzawaSkiLesson: KlookTour = {
  title: "GALA Yuzawa ski resort 1-day coaching course",
  desc: "Three to six hours of ski or snowboard coaching at GALA with a Chinese- or English-speaking instructor — a separate booking from the lift ticket, which the listing says you still need",
  url: klookLink("https://www.klook.com/en-US/activity/137253-gala-yuzawa-ski-resort-1-day-ski-lessons-in-niigata/"),
};

/**
 * The coach alternative to the shinkansen: Tokyo to Iwappara and back in a day.
 *
 * Not GALA — one valley over in the same Echigo-Yuzawa basin — and that is the
 * point of including it. It is the listing for a reader who wants a ski day
 * booked as one line item with the transport inside it, rather than a shinkansen
 * ticket plus a lift ticket plus a rental reservation assembled separately.
 */
export const yuzawaIwapparaSkiDayTourTokyo: KlookTour = {
  title: "Yuzawa Iwappara ski resort snow-play & ski day trip from Tokyo",
  desc: "A round-trip coach day from Tokyo to Iwappara in the Echigo-Yuzawa basin, with snow play, skiing, rental and lessons each selectable inside the one booking",
  url: klookLink("https://www.klook.com/en-US/activity/178055-iwappara-ski-resort-ski-snow-play-day-trip-from-tokyo/"),
};

/**
 * The Niseko day for a traveller based in Sapporo: lift pass and coach in one.
 *
 * The headline listing on niseko-ski-tours, because it answers the question the
 * page is named for. Niseko United's own access figures make the airport run
 * 2 to 3.5 hours each way, so a reader who has already booked a city hotel is
 * not going to move — and a six-hour window on Grand Hirafu with the bus inside
 * the price is what that reader actually wants.
 */
export const nisekoHirafuLiftPassBusTour: KlookTour = {
  title: "Niseko Grand Hirafu ski tour from Sapporo (6-hour lift pass + bus)",
  desc: "Six hours on Grand Hirafu with the round-trip coach from central Sapporo and the lift pass in one booking, picking up at several city stops",
  url: klookLink("https://www.klook.com/en-US/activity/98450-6-hour-niseko-hirafu-lift-pass-bus-package-hokkaido/"),
};

/** Two or three days at Niseko out of Sapporo, with the beds inside the booking. */
export const nisekoSkiHotSpringTourFromSapporo: KlookTour = {
  title: "Niseko ski & hot spring tour from Sapporo (2D1N / 3D2N)",
  desc: "The multi-day version for a traveller who decides mid-trip that one Niseko day is not enough — small group, villa accommodation, departing Sapporo",
  url: klookLink("https://www.klook.com/en-US/activity/96813-sapporo-niseko-skiing-2-3-days-tour-sapporo/"),
};

/** A private day at Niseko — the one that is not a ski day at all. */
export const nisekoPrivateOneDayTour: KlookTour = {
  title: "Niseko private one-day tour",
  desc: "A private, driver-led day around Niseko for the half of a ski party that is not skiing, and for a trip where Mt Yotei and the villages are the point",
  url: klookLink("https://www.klook.com/en-US/activity/90084-niseko-private-one-day-tour/"),
};

/**
 * An English lesson on Grand Hirafu, 4 or 6 hours.
 *
 * On this page a lesson listing is not an upsell, it is the answer to a timing
 * problem. Hanazono's own ski-school page states that "during peak season, only
 * full-day lessons are available for advance booking", and Niseko United's peak
 * period runs 24 Dec 2026 to 28 Feb 2027 — so a half day over Christmas is a
 * thing you turn up and hope for rather than a thing you book.
 */
export const nisekoHirafuEnglishSkiLesson: KlookTour = {
  title: "Niseko Grand Hirafu English ski & snowboard lesson (4 or 6 hours)",
  desc: "A private lesson on Grand Hirafu in English or Chinese at either length — the booking to make early, because the resort school limits peak-season advance bookings to full days",
  url: klookLink("https://www.klook.com/en-US/activity/116117-private-ski-and-snowboard-lessons-4-6-hours-in-niseko/"),
};

/** Rhythm's own lessons — the same Hirafu shop as the rental listing above. */
export const rhythmNisekoPrivateSkiLesson: KlookTour = {
  title: "Rhythm Japan Niseko private ski lesson",
  desc: "Private instruction from the Hirafu shop that also rents the gear, which makes it one pick-up point rather than two on a first morning",
  url: klookLink("https://www.klook.com/en-US/activity/129392-rhythm-japan-niseko-private-ski-lesson/"),
};

/** One lesson booking across three resorts — useful before the beds are fixed. */
export const nisekoRusutsuKiroroPrivateLesson: KlookTour = {
  title: "Private ski or snowboard lesson at Niseko, Rusutsu or Kiroro",
  desc: "The listing to open when the resort is still undecided: the same private lesson sold for any of the three Hokkaido mountains within reach of New Chitose",
  url: klookLink("https://www.klook.com/en-US/activity/29306-private-ski-snowboard-lesson-niseko-rusutsu-kiroro-resort-hokkaido/"),
};

/** The non-ski Hokkaido day that passes through Niseko — for a thaw or a rest day. */
export const noboribetsuToyaNisekoDayTour: KlookTour = {
  title: "Noboribetsu, Lake Toya & Niseko day trip from Sapporo",
  desc: "Hell Valley, Lake Toya and the Niseko side in one guided day — the rest-day option on a ski week, and the one that works when the mountain is closed for wind",
  url: klookLink("https://www.klook.com/en-US/activity/125019-hokkaido-noboribetsu-lake-toya-niseko-one-day-tour/"),
};

/**
 * A private car with a driver, Sapporo or the airport to Niseko.
 *
 * The 6.5% answer to the same journey the 5% resort shuttle covers, and they are
 * genuinely different products: the shuttle is a fixed timetable with ski bags
 * allowed, this is a 7- to 14-seater that goes when your party goes. Worth the
 * difference only with children, early flights or a group splitting the fare.
 */
export const hokkaidoPrivateCarCharterNiseko: KlookTour = {
  title: "Hokkaido private car charter (Sapporo / New Chitose to Niseko)",
  desc: "A 7- to 14-seater with a driver between Sapporo or the airport and Niseko, Rusutsu, Lake Toya or Furano, on your own departure time rather than a timetable",
  url: klookLink("https://www.klook.com/en-US/activity/147120-niseko/"),
};

/**
 * What a GALA Yuzawa day books, in the order the day uses them.
 *
 * The pass is first and it is the only item here with arithmetic behind it: JR
 * East's own worked example for the TOKYO Wide Pass is a GALA return plus a
 * Nikko return at about ¥21,500 against a ¥16,000 pass. Everything after it is
 * the ski day itself, which GALA sells as three separate purchases — lift
 * ticket, rental, instruction — and which is the thing readers under-book.
 */
export const galaYuzawaDayTripPrep: KlookTripPrepItem[] = [
  {
    label: jrTokyoWidePass.title,
    ctaLabel: "Check the TOKYO Wide Pass →",
    url: jrTokyoWidePass.url,
    why: "The one booking with real arithmetic behind it. JR East's own published example for this pass is a GALA Yuzawa return plus a Nikko return in reserved seats at about ¥21,500, against ¥16,000 for three consecutive days — so a GALA day plus one more day trip is roughly where it starts paying.",
  },
  {
    label: galaYuzawaLiftTicket.title,
    ctaLabel: "Check the GALA lift ticket →",
    url: galaYuzawaLiftTicket.url,
    why: "GALA's own window price for a gondola-and-lift day is ¥8,000 adult and its own web price ¥7,500, so buying ahead is worth ¥500 wherever you buy it — and a reseller checkout takes a foreign card and reads in English.",
  },
  {
    label: galaYuzawaSkiLesson.title,
    ctaLabel: "Check GALA lessons →",
    url: galaYuzawaSkiLesson.url,
    why: "The purchase a first-timer forgets, because GALA's price list does not bundle it: the lift ticket and the rental set are separate items from instruction, and 35% of the sixteen courses are graded beginner — which is a lot of easy terrain and no one to show you how to use it.",
  },
  {
    ...tripPrepProducts.esim,
    why: "GALA is a seasonal station on a branch line and the resort states outright that its operating dates and hours change with snow and weather — a closure notice, a shuttle change or a held shinkansen reaches you on your phone and nowhere else.",
  },
];

/**
 * What a Niseko trip books before it flies, in the order the trip needs them.
 *
 * Deliberately airport-first. Nothing else on this list fails if you get it
 * wrong on the day, and Niseko United's own access page prices the gap: a
 * booked coach is 2.5 hours and a train-plus-bus you can just turn up for is 3.
 */
export const nisekoSkiTripPrep: KlookTripPrepItem[] = [
  {
    label: nisekoResortShuttleBus.title,
    ctaLabel: "Check the Niseko shuttle →",
    url: nisekoResortShuttleBus.url,
    why: "Niseko United's own figures put the direct coach from New Chitose at 2.5 hours and ¥6,000 against 3 hours and ¥6,200 on the train-and-bus route, and this listing is the one that carries ski equipment plus a piece of luggage per person — which the JR change does not.",
  },
  {
    label: nisekoHirafuEnglishSkiLesson.title,
    ctaLabel: "Check Niseko lessons →",
    url: nisekoHirafuEnglishSkiLesson.url,
    why: "The booking with a published deadline behind it: the resort-run school states that in peak season only full-day lessons can be booked in advance, and peak season is 24 December 2026 to 28 February 2027 — so a half day in that window is turn-up-and-hope.",
  },
  {
    label: nisekoSkiSnowboardRental.title,
    ctaLabel: "Check Niseko rental →",
    url: nisekoSkiSnowboardRental.url,
    why: "Gear reserved before you fly and collected in Hirafu at the foot of the lifts, which is the difference between skiing on your first morning and queueing through it — and it is the same shop as the private-lesson listing, so one pick-up rather than two.",
  },
  {
    label: "Hotels in Niseko",
    ctaLabel: "Check Niseko hotels on Klook →",
    url: japanWinterStayAreas[7].url,
    why: "The booking that fixes everything else. Which of the four areas you sleep in decides whether the lifts are a walk or a shuttle ride, and the Christmas and New Year weeks inside Niseko's 24 December to 28 February peak are the ones that go first.",
  },
  {
    ...tripPrepProducts.esim,
    why: "A Niseko day is decided by weather more than any other ski trip in Japan — upper lifts hold for wind, areas close and reopen through a storm, and those notices reach a phone rather than a noticeboard at the bottom of the hill.",
  },
];

// ---------------------------------------------------------------------------
// Akihabara anime tours — added 1 Nov 2026 for akihabara-anime-tour
//
// Klook still answers automated reads of its /activity/ pages with HTTP 403, so
// every listing below was confirmed live, on sale and in its en-US URL form
// through the www.klook.com search index on 1 November 2026. The durations and
// departure times in the `desc` lines are the ones that index carries for each
// listing; anything it does not carry is absent rather than guessed, and no
// price appears on any of them.
//
// All six are guided tours and activities, which is the 6.5% band — the right
// headline CTA for this page. GetYourGuide is deliberately not here: the entry-
// article queue brings it in only when Klook has nothing above 2% for the
// subject, and Akihabara is the opposite case.
// ---------------------------------------------------------------------------

/**
 * The headline CTA. The best-reviewed and most-booked of the Akihabara walks in
 * the index on 1 Nov 2026 (4.7/5, 200+ bookings), and the only one whose index
 * entry names its departure times — 14:00 and 18:00 — which is what makes it
 * usable for a reader deciding where a tour fits in a Tokyo day.
 */
export const akihabaraAnimeMangaMaidCafeTour: KlookTour = {
  title: "Akihabara anime, manga, video games & maid café tour",
  desc: "Departures listed at 14:00 and 18:00 for groups of 1 to 10 with an English- or Japanese-speaking guide, anime, figure and classic-game shops, and a maid café with seating guaranteed",
  url: klookLink("https://www.klook.com/en-US/activity/150558-tokyo-akihabara-anime-manga-video-games-maid-cafe-tour/"),
};

/** The three-hour join-in walk — the shortest of the guided options. */
export const akihabaraElectricTownWalk: KlookTour = {
  title: "Akihabara Electric & Anime Town walk (3 hours)",
  desc: "Listed at 3 hours: how the district grew out of a post-war radio market, a retro arcade and Super Potato, figure shops and a guided maid-café visit",
  url: klookLink("https://www.klook.com/en-US/activity/94433-tokyo-city-akihabara-anime-gaming-adventure-half-day-walking-tour/"),
};

/** The five-hour version, for a reader who wants the whole afternoon in one place. */
export const akihabaraOtakuFiveHourTour: KlookTour = {
  title: "Tokyo otaku tour: Akihabara anime & game culture (5 hours)",
  desc: "Listed at 5 hours as a private group meeting in Akihabara Electric Town — the long version, for a day built around Akihabara rather than one that passes through it",
  url: klookLink("https://www.klook.com/en-US/activity/96769-tokyo-city-akihabara-games-anime-manga-otaku-half-day-walking-tour/"),
};

/** Private, and the one that pairs the maid café with Kanda Myojin shrine. */
export const akihabaraPrivateAnimeLoverTour: KlookTour = {
  title: "Akihabara private half-day walk with an anime-lover guide",
  desc: "A private half day routed through a maid café and Kanda Myojin shrine, which is the pairing to pick if the group has one anime fan in it and four people along for the ride",
  url: klookLink("https://www.klook.com/en-US/activity/91351-akihabara-maid-cafe-kanda-myoujin-shrine-private-half-day-walking-tour/"),
};

/** The other private half day — no fixed group to keep up with. */
export const akihabaraAnimeMangaPrivateTour: KlookTour = {
  title: "Akihabara anime & manga private half-day walking tour",
  desc: "A private half-day walk through the manga, figure and game shops at your own pace, which is the format that lets you stop in one shop for an hour",
  url: klookLink("https://www.klook.com/en-US/activity/91799-akihabara-anime-manga-private-half-day-walking-tour/"),
};

/** A fourth shape of the same afternoon, kept for the comparison block. */
export const akihabaraOtakuUniverseTour: KlookTour = {
  title: "Akihabara Otaku Universe tour",
  desc: "Another guided run at the same district, listed separately — worth opening alongside the others because the shops each tour actually enters are not the same",
  url: klookLink("https://www.klook.com/en-US/activity/111055-akihabara-otaku-universe-tour-tokyo/"),
};

/**
 * What an Akihabara day books, in the order it needs them.
 *
 * Subway ticket first on purpose. Akihabara is the one Tokyo district where the
 * pass advice flips: the station is a JR station (Yamanote, Keihin-Tohoku and
 * Chuo-Sobu), so the Tokyo Subway Ticket does not reach it on JR at all — it
 * reaches it on the Hibiya Line. That is a thing to know before buying rather
 * than after, which is why the line is written the way it is.
 */
export const akihabaraTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.subway,
    why: "Worth reading the small print for this district specifically. Akihabara is a JR station on the Yamanote, Keihin-Tohoku and Chuo-Sobu lines, none of which this pass covers; it gets you there on the Tokyo Metro Hibiya Line instead, and it is the Hibiya Line platform you want if the rest of your day is Ginza, Roppongi or Ueno.",
  },
  {
    label: akihabaraAnimeMangaMaidCafeTour.title,
    ctaLabel: "Check Akihabara tour times →",
    url: akihabaraAnimeMangaMaidCafeTour.url,
    why: "The one booking on this page with a clock on it. Its listed departures are 14:00 and 18:00, so the tour decides the shape of your day rather than slotting into it — and a maid café with seating guaranteed is the part that is genuinely awkward to arrange on your own.",
  },
  {
    label: "Hotels around Ueno and Asakusa",
    ctaLabel: "Check hotel prices on Klook →",
    url: tokyoStayAreas[2].url,
    why: "Ueno is two Yamanote stops from Akihabara and one on the Hibiya Line, which puts a late evening in the arcades within a ten-minute ride of your room without paying Ginza prices for the privilege.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Akihabara is the district where you will actually use the data: shop floors stack six storeys deep with little English signage, much of the figure and retro-game stock is only findable by searching a Japanese title, and a maid café's own reservation page is in Japanese too.",
  },
];

// ---------------------------------------------------------------------------
// "Book for the same day" blocks, added 1 Nov 2026 for shibuya-sky-tickets and
// usj-tickets-express-pass — the two pages Klook's report shows taking the most
// clicks, and both selling a ticket in the bands that pay least (SHIBUYA SKY is a
// 2% special activity, the USJ Express Pass 0%). The ticket links stay; these sit
// directly under the price / booking section so the higher bands are on screen
// before the reader leaves for the ticket: tours and hotels 6.5%, passes, airport
// transfers and trains 5%, the Klook eSIM 20%.
//
// Every product below was confirmed live on www.klook.com through a search
// restricted to that domain on 1 Nov 2026 (listings 102521, 5672, 1552, 109393,
// 23053, the p50014852 hotel search, 82312, 18400 and 86986). No price is quoted
// for the usual reason: Klook answers automated reads of its product pages with
// HTTP 403. Defined at the foot of the module because the tours they reuse are
// declared after `tripPrepProducts`.
// ---------------------------------------------------------------------------

export const shibuyaSkySameDayPrep: KlookTripPrepItem[] = [
  {
    label: shinjukuNightFoodWalkingTour.title,
    ctaLabel: "Check the Shinjuku night tour →",
    url: shinjukuNightFoodWalkingTour.url,
    why: "The evening after a sunset slot, a short Yamanote ride from Shibuya: a three-hour join-in walk through Omoide Yokocho, Kabukicho and Golden Gai, ending with a drink at a Golden Gai izakaya.",
  },
  {
    label: tokyoSightseeingBusTour.title,
    ctaLabel: "Check the Tokyo day tour →",
    url: tokyoSightseeingBusTour.url,
    why: "If the slot is in the evening, the daytime can still be the rest of Tokyo: a guided day of the Imperial Palace gardens, Asakusa and Tokyo Skytree with multilingual audio guidance.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Shibuya Station is on the Hanzomon, Ginza and Fukutoshin lines, so a 24, 48 or 72-hour ticket covers the rides to and from the deck — the ticket does not cover JR lines such as the Yamanote.",
  },
  {
    ...tripPrepProducts.esim,
    why: "A Klook ticket arrives as an e-ticket on your phone, and the slot is fixed to a time — data from the airport onwards means the voucher, the map and the weather check are all there on the day.",
  },
  {
    label: tokyoPrivateAirportTransfer.title,
    ctaLabel: "Check the airport transfer →",
    url: tokyoPrivateAirportTransfer.url,
    why: "Booked to your hotel address rather than a station, from either Narita or Haneda, with the driver tracking your flight — useful when you land the same day as a late slot.",
  },
];

/**
 * Same block for tokyo-observation-decks, added 6 Nov 2026 for the same reason: the
 * decks are the low bands (SHIBUYA SKY 2%, the others 2-5%). Reuses the products above
 * and adds no URL. Tours and hotels 6.5%, passes and transfers 5%, the eSIM 20%.
 */
export const observationDecksSameDayPrep: KlookTripPrepItem[] = [
  {
    label: tokyoSightseeingBusTour.title,
    ctaLabel: "Check the Tokyo day tour →",
    url: tokyoSightseeingBusTour.url,
    why: "A deck is one to two hours of one day, so the rest of it can be the city at street level: a guided day of the Imperial Palace gardens, Asakusa and Tokyo Skytree with multilingual audio guidance.",
  },
  {
    label: shinjukuNightFoodWalkingTour.title,
    ctaLabel: "Check the Shinjuku night tour →",
    url: shinjukuNightFoodWalkingTour.url,
    why: "The evening after a sunset deck: a three-hour join-in walk through Omoide Yokocho, Kabukicho and Golden Gai, ending with a drink at a Golden Gai izakaya.",
  },
  {
    ...tripPrepProducts.hotelShibuya,
    why: "A sunset slot ends after dark, so staying near the deck makes the trip back a short one. Our Tokyo stay guide, linked below, compares the other areas.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Shibuya, Oshiage, Akabanebashi and Tochomae are all subway stations, so a 24, 48 or 72-hour ticket covers two decks in a day. It does not cover JR lines such as the Yamanote.",
  },
  {
    label: tokyoPrivateAirportTransfer.title,
    ctaLabel: "Check the airport transfer →",
    url: tokyoPrivateAirportTransfer.url,
    why: "Booked to your hotel address rather than a station, from either Narita or Haneda, with the driver tracking your flight — useful when you land the same day as a late slot.",
  },
  {
    ...tripPrepProducts.esim,
    why: "A Klook ticket arrives as an e-ticket on your phone, and every deck here depends on the weather — data from the airport onwards means the voucher, the map and the forecast are all there on the day.",
  },
];

export const usjSameDayPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels near Universal Studios Japan (Universal City)",
    ctaLabel: "Check Universal City hotels on Klook →",
    url: usjStayAreas[0].url,
    why: "The same Klook hotel search the Osaka where-to-stay guide uses. The park gates are about five minutes on foot from Universal City Station, which is what you want on a morning you mean to be there before opening.",
  },
  {
    ...tripPrepProducts.osakaPass,
    why: "For the Osaka days either side of the park, not the park day itself: it covers Osaka Metro and city buses plus more than 40 admissions, but not Universal Studios Japan and not the JR line out to Universal City.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "From Kansai Airport straight to Tennoji, Osaka or Shin-Osaka, the stations a USJ trip starts from; Klook's listing states it is sold only to non-Japanese passport holders with a Temporary Visitor stamp.",
  },
  {
    label: absoluteOsakaFoodTour.title,
    ctaLabel: "Check the Osaka food tour →",
    url: absoluteOsakaFoodTour.url,
    why: "An evening for a non-park day: a three-hour join-in walk off the Dotonbori strip with kushikatsu, takoyaki, a hidden izakaya and a local dessert.",
  },
  {
    ...tripPrepProducts.esim,
    why: "USJ runs Super Nintendo World area timed entry through its own app, used inside the park on the day, and the Studio Pass is an e-ticket — both need data in the queue, not only on hotel Wi-Fi.",
  },
];

// ---------------------------------------------------------------------------
// Umeda Sky Building, added 3 Nov 2026 (task jtk-20261103-04). The observatory
// ticket is assumed to sit in Klook's low special-activity band, like SHIBUYA SKY,
// so a same-day block follows the ticket / pass decision: hotels and tours 6.5%,
// the Haruka 5%, the eSIM 20%. Every entry reuses an existing constant; no price.
// ---------------------------------------------------------------------------

export const umedaSkySameDayPrep: KlookTripPrepItem[] = [
  {
    label: absoluteOsakaFoodTour.title,
    ctaLabel: "Check the Osaka food tour →",
    url: absoluteOsakaFoodTour.url,
    why: "The evening after the deck: the Midosuji Line runs from Umeda to Namba, and this is a three-hour join-in walk off the Dotonbori strip with kushikatsu, takoyaki, a hidden izakaya and a local dessert.",
  },
  {
    ...tripPrepProducts.hotelOsakaUmeda,
    why: "The deck closes at 22:30, and a bed around Osaka Station keeps the walk back to a few minutes after a late visit.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "From Kansai Airport straight to Osaka Station, the stop the deck is walked from; Klook's listing states it is sold only to non-Japanese passport holders with a Temporary Visitor stamp.",
  },
  {
    ...tripPrepProducts.esim,
    why: "A Klook ticket arrives as an e-ticket on your phone, and the walk from Osaka Station goes through an underpass where a map on data helps.",
  },
];

// ---------------------------------------------------------------------------
// Tokyo itinerary with kids, added 3 Nov 2026 for tokyo-itinerary-with-kids.
//
// Klook answers automated reads of /activity/ pages with HTTP 403, so the two
// new listings below were confirmed live, on sale and in their en-US form through
// the www.klook.com search index on 3 Nov 2026: "Tokyo Disney Resort - Tokyo
// Disneyland & Tokyo DisneySea Park Tickets" (695) and "LEGOLAND Discovery
// Center Tokyo Ticket" (5563). Everything else on that page reuses a constant
// already in this file. No price appears for either listing.
//
// Commission: the Disney passport is a 2% special activity and a bare indoor-
// attraction ticket cannot be assumed to pay more, so the page carries a
// "book the same day" block (hotels 6.5%, transfers 5%, eSIM 20%) next to them.
// ---------------------------------------------------------------------------

/** Tokyo Disney Resort 1-Day Passport, as a plain product URL (the Disney guide keeps its own redirect). */
export const tokyoDisneyOneDayPassport: KlookTour = {
  title: "Tokyo Disney Resort 1-Day Passport (Disneyland or DisneySea)",
  desc: "A date- and park-specified e-ticket for one of the two parks, shown on a smartphone at the gate",
  url: klookLink("https://www.klook.com/en-US/activity/695-tokyo-disney-resort-1-day-pass-tokyo/"),
};

/** LEGOLAND Discovery Center Tokyo, Odaiba — an indoor attraction adults may only enter with a child. */
export const legolandDiscoveryCenterTokyoTicket: KlookTour = {
  title: "LEGOLAND Discovery Center Tokyo ticket",
  desc: "Admission to the indoor LEGO centre in DECKS Tokyo Beach, Odaiba — the listing suggests 2 to 3 hours",
  url: klookLink("https://www.klook.com/en-US/activity/5563-legoland-discovery-center-tokyo/"),
};

/**
 * Where a family bases itself for the kids itinerary. Every URL is an existing
 * destination id already in this file — Tokyo Station, Shinjuku, Maihama and
 * Urayasu — so the page cannot drift from the guides that introduced them.
 */
export const tokyoKidsStayAreas: KlookStayArea[] = [
  {
    area: "Tokyo Station / Marunouchi",
    why: "The N'EX from Narita and the limousine buses from both airports stop here, the JR Keiyo Line runs to Maihama for the Disney day, and the JR Yokosuka Line runs direct to Kamakura — the base with the fewest changes for this route.",
    url: tokyoAirportStayAreas[0].url,
  },
  {
    area: "Maihama",
    why: "The station the two Disney parks share. Worth one or two nights around the park day if your children are young enough that an early start and a late finish both need a short trip back to the room.",
    url: tokyoDisneyStayAreas[0].url,
  },
  {
    area: "Urayasu / Shin-Urayasu",
    why: "One stop further out on the Keiyo Line and generally cheaper than the resort-side rooms; many of these hotels run their own free shuttle to the parks.",
    url: tokyoDisneyStayAreas[1].url,
  },
  {
    area: "Shinjuku",
    why: "The Odakyu and Keio lines start here — Odakyu to Hakone and Tama Center, Keio to Tama Center for Sanrio Puroland — so the west-side day out and the Hakone option both begin at your own station.",
    url: tokyoAirportStayAreas[1].url,
  },
];

/** The same-day block under the Disney day (2% ticket → 6.5 / 5 / 20% neighbours). */
export const tokyoKidsDisneyDayPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelMaihama,
    why: "A room at the station the parks share turns a 15-to-20-minute Keiyo Line ride from Tokyo Station into a short walk or a monorail stop — what makes a nap break, or staying for the evening, realistic with small children.",
  },
  {
    ...tripPrepProducts.hotelUrayasu,
    why: "The cheaper side of the same idea: one stop further out, and many of these hotels run their own free shuttle to the gates.",
  },
  {
    ...tripPrepProducts.hanedaLimousine,
    why: "The Haneda listing names Tokyo Disney Resort among its destinations — the airport run that ends at the resort, with the luggage under the bus rather than on a train beside a stroller.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The passport is a QR code on each guest's own smartphone, and the official app is where in-park features are managed — none of which works on a phone waiting for hotel Wi-Fi.",
  },
];

/** The same-day block under the Odaiba / Sanrio days. */
export const tokyoKidsCityDayPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.subway,
    why: "Covers Tokyo Metro and Toei between the base and the day's starting point — but not JR, not the Yurikamome to Odaiba and not the Keio or Odakyu lines to Tama Center, so on those two days it covers the city half only.",
  },
  {
    label: tokyoSightseeingBusTour.title,
    ctaLabel: "Check the sightseeing bus tour →",
    url: tokyoSightseeingBusTour.url,
    why: "A seated, guided loop of the Imperial Palace gardens, Asakusa and Skytree — the low-walking version of a sightseeing day, and the listing sells a child rate.",
  },
  {
    label: tokyoPrivateAirportTransfer.title,
    ctaLabel: "Check the airport transfer →",
    url: tokyoPrivateAirportTransfer.url,
    why: "A car to your hotel address from Narita or Haneda, in 7- and 10-seater sizes — the arrival that avoids carrying children, cases and a stroller through two stations.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Every ticket on this route is an e-ticket or a timed reservation on a phone, and so are the maps between them.",
  },
];

// ---------------------------------------------------------------------------
// Okinawa Churaumi Aquarium, added 3 Nov 2026 for
// okinawa-churaumi-aquarium-tickets — the first Okinawa page on this site.
//
// Each listing was confirmed live and in its en-US form through the www.klook.com
// search index on 3 Nov 2026 (the /activity/ pages still answer automated reads
// with HTTP 403): "Okinawa Churaumi Aquarium Ticket" (1421); "Northern Okinawa:
// Churaumi Aquarium & Kouri Island & Cape Manza & American Village Day Tour
// (Departing from Naha & Chatan)" (134350); "Shared Naha Airport Limousine Bus
// Transfer for Okinawa" (33381); the Naha Airport car-rental search; the Naha
// hotel search (c13641) and the hotels-near-the-aquarium search (p50046533).
// Not used: 19157, whose en-US title states a Chinese-speaking guide, and 179447,
// which surfaced only without a locale. No price appears for any of them.
//
// The aquarium ticket is a bare attraction admission, so it is not the only CTA:
// the northern day tour (6.5%) sits beside it with a GetYourGuide compare, and
// hotels / car rental / airport bus / eSIM are in the same-day block.
// ---------------------------------------------------------------------------

export const churaumiAquariumTicket: KlookTour = {
  title: "Okinawa Churaumi Aquarium ticket",
  desc: "The straight admission as an e-ticket, scanned at the gate",
  url: klookLink("https://www.klook.com/en-US/activity/1421-churaumi-aquarium-okinawa/"),
};

export const churaumiKouriNorthernDayTour: KlookTour = {
  title: "Northern Okinawa day tour: Churaumi Aquarium, Kouri Island, Cape Manzamo & American Village",
  desc: "A join-in coach day from Naha or Chatan that strings the aquarium together with the north's other headline stops",
  url: klookLink("https://www.klook.com/en-US/activity/134350-churaumi-aquarium-kouri-island-american-village-one-day-tour/"),
};

export const nahaAirportLimousineBus: KlookTour = {
  title: "Shared Naha Airport limousine bus transfer",
  desc: "The airport coach to hotel zones from Naha out to the west-coast resort areas, with the bus and time chosen at checkout",
  url: klookLink("https://www.klook.com/en-US/activity/33381-shared-naha-airport-limousine-bus-transfer-okinawa/"),
};

export const nahaAirportCarRental: KlookTour = {
  title: "Car rental at Naha Airport",
  desc: "Klook's car-rental search for pick-up at Naha Airport; the page states non-residents need a passport, their own licence and an international driving permit, and a credit card",
  url: klookLink("https://www.klook.com/en-US/car-rentals/poi/50036544-naha-airport-car-rentals/"),
};

export const okinawaChuraumiStayAreas: KlookStayArea[] = [
  {
    area: "Naha",
    why: "Where the airport, the monorail, the day tours' pick-up points and the airport limousine bus all are — the base if the aquarium is one day of a longer Okinawa trip.",
    url: klookLink("https://www.klook.com/en-US/destination/c13641-naha/3-hotel/"),
  },
  {
    area: "Motobu / near the aquarium",
    why: "Klook's search for hotels near the aquarium, on the Motobu Peninsula. A night here turns a four-hour round trip into a short drive, and puts the 8:30 opening, Kouri Island and Bise within easy reach.",
    url: klookLink("https://www.klook.com/en-US/destination/p50046533-okinawa-churaumi-aquarium/3-hotel/"),
  },
];

export const churaumiSameDayPrep: KlookTripPrepItem[] = [
  {
    label: churaumiKouriNorthernDayTour.title,
    ctaLabel: "Check the northern day tour →",
    url: churaumiKouriNorthernDayTour.url,
    why: "If nobody in your group is driving, this is the day in one booking: the coach from Naha or Chatan, the aquarium and Kouri Island. Check whether the option you pick includes the aquarium ticket and which language the guide speaks.",
  },
  {
    label: nahaAirportCarRental.title,
    ctaLabel: "Check Naha Airport car rentals →",
    url: nahaAirportCarRental.url,
    why: "The aquarium's own access page puts it about two hours from Naha Airport by car on the Okinawa Expressway, against about three by express bus — and a car is what makes Kouri Island and Bise the same afternoon.",
  },
  {
    label: "Hotels near Okinawa Churaumi Aquarium",
    ctaLabel: "Check hotels near the aquarium →",
    url: okinawaChuraumiStayAreas[1].url,
    why: "One night on the Motobu Peninsula means being at the gate for the 8:30 opening, before the coaches from Naha arrive.",
  },
  {
    label: nahaAirportLimousineBus.title,
    ctaLabel: "Check the airport bus →",
    url: nahaAirportLimousineBus.url,
    why: "For a family that is not driving, the coach from the airport to the hotel zones — choose the bus number and time at checkout.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Your ticket, the bus times and the parking map are all on your phone, and the drive north is the part of the day with no hotel Wi-Fi.",
  },
];

// ---------------------------------------------------------------------------
// Hokkaido Rail Pass and JR EAST PASS entry guides — added 3 Nov 2026 for
// /guides/transport/hokkaido-rail-pass and /guides/transport/jr-east-pass.
//
// Reused unchanged: jrHokkaidoRailPass (3067), furanoBieiBluePondDayTour (88593),
// otaruSnowParkDayTour (98528), the Sapporo Station hotel search
// (p50006996), jrTokyoWidePass (49927), galaNaebaSkiDayTripTokyo (140645),
// karuizawaShinkansenDayTrip (90953) and klookEsim (109393). Each was
// re-confirmed live as an en-US listing through the www.klook.com search index
// on 3 Nov 2026, because Klook answers automated reads with HTTP 403.
//
// New below, all confirmed the same way on 3 Nov 2026:
//   - /activity/1418-jr-east-pass — the single JR EAST PASS (5 or 10 consecutive
//     days) that replaced the Tohoku-area and Nagano/Niigata-area passes on
//     14 March 2026. `jrEastPassNaganoNiigata` (1419) above is the withdrawn
//     product and is deliberately not used on the new guide.
//   - /activity/71864 — the Sapporo–Furano Area Pass, the comparison the
//     Hokkaido guide has to make.
//   - Klook's New Chitose airport-transfer page. The older shared-transfer
//     listing (12479) now indexes as a Tomamu resort coach, so the airport
//     page is the transfer CTA on the Hokkaido guide instead.
//
// Bands: the three passes and the airport transfer are 5%, the day tours and
// hotel search 6.5%, the eSIM 20%. No Klook price appears on either page.
// ---------------------------------------------------------------------------

/** The one JR EAST PASS sold since 14 March 2026 — 5 or 10 consecutive days. */
export const jrEastPass: KlookTour = {
  title: "JR EAST PASS (5 or 10 consecutive days)",
  desc: "JR East's single regional pass as Klook sells it — every JR East line including the Tohoku, Joetsu, Akita, Yamagata and Hokuriku (to Joetsumyoko) shinkansen, collected at a major JR East station",
  url: klookLink("https://www.klook.com/en-US/activity/1418-jr-east-pass/"),
};

/** JR Hokkaido's four-day Sapporo–Furano Area Pass. */
export const sapporoFuranoAreaPass: KlookTour = {
  title: "Hokkaido Sapporo–Furano Area Pass (4 days)",
  desc: "Four consecutive days between New Chitose Airport, Sapporo, Otaru, Asahikawa, Biei and Furano — the smaller pass that beats the island pass when the trip stays on that line",
  url: klookLink("https://www.klook.com/en-US/activity/71864-hokkaido-sapporo-furano-area-pass-4-day/"),
};

/** Klook's New Chitose Airport transfer page — private car and shared options. */
export const newChitoseAirportTransfers: KlookTour = {
  title: "New Chitose Airport transfers (private car & shared)",
  desc: "Klook's airport-transfer page for New Chitose, for arrivals with ski bags or a hotel outside Sapporo that the Rapid Airport train does not reach",
  url: klookLink("https://www.klook.com/en-US/airport-transfers/service/cts-new-chitose-airport/"),
};

// ---------------------------------------------------------------------------
// Jigokudani snow monkey guide — added 3 Nov 2026 for
// /guides/attractions/jigokudani-snow-monkey-tour.
//
// Klook answers automated reads of /activity/ and /hotels/ pages with HTTP 403,
// so every URL below was confirmed live and in its en-US form through the
// www.klook.com search index on 3 Nov 2026. No Klook price appears on the page.
//
// Reused unchanged: jrEastPass (1418) and klookEsim (109393).
// Bands: the day tours and hotel pages 6.5%, the JR EAST PASS 5%, the eSIM 20%.
// Not used: /activity/7290, whose en-US and default-locale index titles disagree
// (a Nagano day tour on one, a two-day Shirakawa-go tour on the other).
// ---------------------------------------------------------------------------

/** The coach day — the park and Zenko-ji with a sukiyaki lunch. The headline CTA. */
export const jigokudaniZenkojiSukiyakiTour: KlookTour = {
  title: "Jigokudani Snow Monkey Park & Zenko-ji day tour (beef sukiyaki lunch)",
  desc: "A guided day pairing the snow monkey park with Zenko-ji, the national-treasure temple in Nagano, with a beef sukiyaki lunch in the booking",
  url: klookLink("https://www.klook.com/en-US/activity/171615-jigokudani-snow-monkey-park-zenkoji-temple-tour-with-beef-sukiyaki/"),
};

/** The shinkansen version — the guide meets you at Tokyo Station. */
export const snowMonkeysShinkansenDayTourTokyo: KlookTour = {
  title: "Meet Snow Monkeys day tour from Tokyo (by shinkansen)",
  desc: "The bullet-train version of the day: an English-speaking guide meets you at Tokyo Station, with Zenko-ji's approach street for lunch",
  url: klookLink("https://www.klook.com/en-US/activity/2032-snow-monkeys-private-day-tour-tokyo/"),
};

/** A second Tokyo-departure listing, for date availability. */
export const naganoSnowMonkeyDayTourTokyo: KlookTour = {
  title: "Nagano Snow Monkey day tour from Tokyo",
  desc: "A Tokyo-departure day to Jigokudani — a second listing to check when the first is full on your date",
  url: klookLink("https://www.klook.com/en-US/activity/33453-nagano-snow-monkey-day-tour-tokyo/"),
};

/** Private vehicle, the park and Zenko-ji. */
export const jigokudaniZenkojiPrivateDayTrip: KlookTour = {
  title: "Jigokudani Monkey Park & Zenko-ji private day trip",
  desc: "The same two stops in a private vehicle for your own group — the version for families or anyone who wants to set the pace on the trail",
  url: klookLink("https://www.klook.com/en-US/activity/143326-jigokudani-monkey-park-zenkoji-temple-private-day-trip/"),
};

/** Ski-trip version: the monkeys as a day off from Nozawa Onsen. */
export const nozawaSnowMonkeyZenkojiTour: KlookTour = {
  title: "Winter tour from Nozawa Onsen: snow monkeys, Zenko-ji & sake tasting",
  desc: "A winter-only day out of Nozawa Onsen for skiers already in Nagano, with Zenko-ji and a sake tasting on the same run",
  url: klookLink("https://www.klook.com/en-US/activity/121803-winter-only-1-day-tour-from-nozawa-onsen-snow-monkeys-zenko-ji-t/"),
};

/** Where to stay for a snow monkey morning — one Klook hotel link per base. */
export const jigokudaniStayAreas: KlookStayArea[] = [
  {
    area: "Kanbayashi Onsen (Kanbayashi Hotel Senjukaku)",
    why: "The hot-spring village at the trailhead: the park's free car park and the 2 km Yumichi trail start here, so you can be on the path before the day-trip crowd arrives.",
    url: klookLink("https://www.klook.com/en-US/hotels/detail/442488-kanbayashi-hotel-senjukaku/"),
  },
  {
    area: "Shibu Onsen (Wafu No Yado MASUYA)",
    why: "The old ryokan street just below the park, for a night between the monkeys and the train back to Nagano.",
    url: klookLink("https://www.klook.com/en-US/hotels/detail/394283-wafu-no-yado-masuya/"),
  },
  {
    area: "Yudanaka (Hotel Tsubakino)",
    why: "At the end of the Nagano Electric Railway, where the 15-minute local bus to the Snow Monkey Park stop begins.",
    url: klookLink("https://www.klook.com/en-US/hotels/detail/50279-hotel-tsubakino/"),
  },
  {
    area: "Nagano Station",
    why: "The base that keeps every option open: the shinkansen from Tokyo, the Nagaden line to Yudanaka, the express bus to the park and Zenko-ji all start here.",
    url: klookLink("https://www.klook.com/en-US/destination/c26277-nagano/3-hotel/"),
  },
];

// ---------------------------------------------------------------------------
// Skyliner vs N'EX, restored 3 Nov 2026 (task jtk-20261103-05). The two train
// tickets are Klook's 5% transfer band, so the page puts a "book the same day"
// block under each decision point: a hotel at either end of the two lines (6.5%),
// the subway ticket for the days after (5%) and the eSIM (20%). Every entry reuses
// an existing constant; no price is quoted for any listing.
// ---------------------------------------------------------------------------

export const skylinerVsNexSameDayPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelTokyoStation,
    why: "If the N'EX is your train, this is where it stops first: JR East puts the fastest run from Narita Airport to Tokyo Station at 53 minutes, with no change.",
  },
  {
    label: "Hotels around Ueno / Asakusa",
    ctaLabel: "Check Ueno hotel prices →",
    url: tokyoAirportStayAreas[2].url,
    why: "If the Skyliner is your train, this is the side of the city it serves: Keisei puts Ueno 41 minutes from Narita Airport Terminal 2·3.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Neither airport ticket covers the Tokyo Metro or Toei subway lines; this one does, for 24, 48 or 72 hours.",
  },
  {
    ...tripPrepProducts.esim,
    why: "If your flight is late, the seat you booked has to be changed from the arrivals hall, and doing that online needs data before you reach the train.",
  },
];

// ---------------------------------------------------------------------------
// Kansai Area Pass, rank fix 3 Nov 2026 (task jtk-20261103-06). The pass and the
// Haruka are Klook's 5% transfer band; the block under the break-even CTA lists the
// bookings made for the same days: a Kyoto–Nara day tour (6.5%), a hotel at either
// end of the Haruka (6.5%) and the eSIM (20%). Every entry reuses an existing
// constant; no price is quoted for any listing.
// 13 Nov 2026 (R04): reordered hotels first, and a Himeji day tour added — it reuses
// the existing `himejiCastleOsakaBusTour` constant (6.5%), so no new Klook URL.
// ---------------------------------------------------------------------------

export const kansaiAreaPassSameDayPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelOsakaUmeda,
    why: "Osaka Station is a JR West hub for the special rapids to Kyoto, Kobe and Himeji — the intercity hops the multi-day pass is paid back on.",
  },
  {
    ...tripPrepProducts.hotelKyotoStation,
    why: "Kyoto Station is the Haruka's terminus from Kansai Airport, so a hotel here turns the pass's airport run into a door-to-door ride with no change.",
  },
  {
    ...tripPrepProducts.kyotoNaraTour,
    why: "The pass covers JR to Kyoto and Nara but not the Keihan to Fushimi Inari or the Kintetsu into Nara Park; a coach day covers all three stops in one booking.",
  },
  {
    label: himejiCastleOsakaBusTour.title,
    ctaLabel: "Check the Himeji day tour →",
    url: himejiCastleOsakaBusTour.url,
    why: "Himeji is inside the pass area by JR, but a join-in coach day from Osaka is the alternative if you would rather not plan the castle day yourself.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The WEST QR pass is a QR code on your phone: you press \"Use ticket\" and book the two Haruka reserved seats online, and both need data from the moment you land.",
  },
];

// ---------------------------------------------------------------------------
// First-time Japan itinerary and the Tokyo to Osaka shinkansen, added 4 Nov 2026
// (task jtk-20261104-01). One new URL, `kyotoCityFushimiArashiyamaTour`, because
// activity 94748 (`kyotoHighlightBusTour`) could not be found in the www.klook.com
// search index on 4 Nov 2026. Every other listing the two pages use was confirmed in
// that index the same day, through a sibling locale where en-US did not surface, and
// the JR Pass through Klook's rail-pass page. The two rail route pages answered a
// direct read. The itinerary carries SHIBUYA SKY and teamLab, Klook's low bands, so
// its block leads with the 6.5% hotels and tours, then 5% rail and the 20% eSIM.
// No prices.
// ---------------------------------------------------------------------------

/** Kyoto Station departure, for Day 5 of the first-time itinerary. */
export const kyotoCityFushimiArashiyamaTour: KlookTour = {
  title: "Kyoto day tour: Fushimi Inari, Arashiyama and Kiyomizu-dera",
  desc: "A one-day guided tour of the city's main sights, listed as leaving from the Hachijo side of Kyoto Station",
  url: klookLink("https://www.klook.com/en-US/activity/82323-temples-shurines-day-tour-from-kyoto/"),
};

/** Three bases for nine days: two areas per city, chosen around the moving days. */
export const firstTimeItineraryStayAreas: KlookStayArea[] = [
  {
    area: "Tokyo Station / Marunouchi, Tokyo (3 nights)",
    why: "The Tokaido Shinkansen leaves from under it on Day 4 and the Narita Express runs here direct on Day 1, so neither moving day starts with a cross-city ride with the cases.",
    url: tokyoStayAreas[1].url,
  },
  {
    area: "Shinjuku, Tokyo (3 nights)",
    why: "The better pick if Hakone is your Day 3: the Romancecar leaves from Shinjuku, and the Yamanote reaches Harajuku and Shibuya in minutes for the Day 2 sunset slot.",
    url: tokyoStayAreas[0].url,
  },
  {
    area: "Kyoto Station, Kyoto (3 nights)",
    why: "Where the shinkansen puts you down, where the 100 and 101 sightseeing buses start, and where the Day 6 Kintetsu and JR trains to Nara leave from.",
    url: kyotoStayAreas[0].url,
  },
  {
    area: "Gion / Higashiyama, Kyoto (3 nights)",
    why: "Further from the station but on foot from Kiyomizu-dera and the Gion lanes, which is what three nights in Kyoto buys you room for.",
    url: kyotoStayAreas[2].url,
  },
  {
    area: "Namba, Osaka (2 nights)",
    why: "Dotonbori on foot and the Nankai terminus under the hotel, so the Day 9 run to Kansai Airport starts without a change.",
    url: osakaStayAreas[1].url,
  },
  {
    area: "Umeda, Osaka (2 nights)",
    why: "Joined to Osaka Station, so the pick if you arrive by JR Special Rapid on Day 7, and two stops from Shin-Osaka if your flight home leaves from Haneda.",
    url: osakaStayAreas[0].url,
  },
];

/** The checklist block: what a first trip needs before the plane leaves. */
export const firstTimeBeforeYouFlyPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelTokyoStation,
    why: "Three nights booked first, because every other booking on this list depends on which side of Tokyo you wake up on.",
  },
  {
    ...tripPrepProducts.hotelKyotoStation,
    why: "Three of your eight nights, in the city where blossom and autumn-colour dates are the first to tighten.",
  },
  {
    ...tripPrepProducts.hotelOsakaUmeda,
    why: "The last two nights, and the one hotel you choose by your flight home: Umeda for the shinkansen, Namba for the Rapi:t.",
  },
  {
    ...tripPrepProducts.fujiHakoneTour,
    why: "The Day 3 option if you would rather not plan the Hakone loop yourself: one coach, one guide, back in Tokyo the same night.",
  },
  {
    ...tripPrepProducts.kyotoNaraTour,
    why: "The Day 6 option: Kiyomizu-dera, Fushimi Inari and Nara Park as one departure instead of two railways.",
  },
  {
    ...tripPrepProducts.naritaExpress,
    why: "The first thing you need on landing at Narita, and the last thing you want to be working out in an arrivals hall.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Covers Tokyo Metro and Toei on Days 1 and 2 and the Day 4 morning in Asakusa, but not JR or the Yamanote Line.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Every timed ticket on this page reaches you as a QR code, so data has to work before you reach immigration.",
  },
];

/** The Osaka end of the train, for the shinkansen guide. */
export const tokyoOsakaArrivalStayAreas: KlookStayArea[] = [
  {
    area: "Umeda, Osaka",
    why: "Two stops down the Midosuji Line from Shin-Osaka, joined to Osaka Station, and the easier base if you are taking the train back.",
    url: osakaStayAreas[0].url,
  },
  {
    area: "Namba, Osaka",
    why: "Stay on the same Midosuji Line train from Shin-Osaka, with Dotonbori on foot and the Nankai terminus for Kansai Airport.",
    url: osakaStayAreas[1].url,
  },
  {
    area: "Tennoji, Osaka",
    why: "The far end of the useful stretch of the Midosuji Line, and a direct JR Haruka stop if you fly out of Kansai.",
    url: osakaStayAreas[2].url,
  },
];

/**
 * Osaka airport transfer, added 6 Nov 2026 (task jtk-20261106-05) — what to settle
 * before landing at KIX or Itami, directly under the "which train" decision. No new
 * URLs and no prices. eSIM 20%; passes 5%; hotels and tours 6.5%. The USJ line is the
 * Universal City hotel search because the Studio Pass itself is excluded from
 * commission. The pocket WiFi (5%) reads from lib/pocket-wifi.ts in the page, per the
 * single-source rule that file sets.
 */
export const osakaAirportArrivalPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Bus stands, platform changes and your hotel map all sit on your phone, so install it at home and it is working when you clear customs.",
  },
  {
    ...tripPrepProducts.osakaPass,
    why: "For the city once you are in it: Osaka Metro, city buses and more than 40 admissions. It does not cover either airport train or Universal Studios Japan.",
  },
  {
    label: "JR Kansai Area Pass",
    ctaLabel: "Check the Kansai Area Pass →",
    url: jrKansaiAreaPass.url,
    why: "Worth pricing if you are also riding JR to Kyoto, Nara or Himeji, because JR West's pass covers the Haruka's non-reserved seats.",
  },
  {
    ...tripPrepProducts.hotelOsakaUmeda,
    why: "The Haruka stops at Osaka Station, so an Umeda room is one direct ride from Kansai Airport, and the Itami limousine bus serves the same area.",
  },
  {
    label: "Hotels in Namba",
    ctaLabel: "Check Namba hotels on Klook →",
    url: osakaStayAreas[1].url,
    why: "The Rapi:t ends here, so a Namba room means no change of train after a long flight.",
  },
  {
    label: "Hotels near Universal Studios Japan (Universal City)",
    ctaLabel: "Check Universal City hotels on Klook →",
    url: usjStayAreas[0].url,
    why: "If the park is the reason for the trip. The park gates are about five minutes on foot from Universal City Station.",
  },
  {
    label: absoluteOsakaFoodTour.title,
    ctaLabel: "Check the Osaka food tour →",
    url: absoluteOsakaFoodTour.url,
    why: "A first-evening plan off the Dotonbori strip that needs no routing of your own.",
  },
  {
    ...tripPrepProducts.kyotoNaraTour,
    why: "A guided day out of Osaka, with Kiyomizu-dera, Fushimi Inari and Nara Park in one booking.",
  },
];

export const tokyoOsakaArrivalPrep: KlookTripPrepItem[] = [
  {
    label: "Dotonbori daytime food tour",
    why: "Listed at 11:00 to 14:00, so a train out of Tokyo by about 08:00 puts you there for it with the afternoon still to come.",
    ctaLabel: "Check the food tour →",
    url: dotonboriDaytimeFoodTour.url,
  },
  {
    ...tripPrepProducts.osakaPass,
    why: "Osaka Metro and city buses from the moment you leave Shin-Osaka, plus the castle and the river cruises on the same day.",
  },
  {
    ...tripPrepProducts.hotelOsakaUmeda,
    why: "Book the room with the seat, so the train you choose and the night you arrive are settled in one sitting.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Changing a smartEX seat or reading a delay notice happens on your phone, so it needs data before you reach Tokyo Station.",
  },
];

// ---------------------------------------------------------------------------
// Gion night walking tour guide — added 4 Nov 2026 for
// /guides/attractions/gion-night-walking-tour.
//
// Klook answers automated reads of /activity/ pages with HTTP 403, so listings were
// read through the www.klook.com search index on 4 Nov 2026. 186308, 102519 and 88827
// appear there in en-US form. 45723 and 210008 appear only under other locale paths
// (default-locale, en-AU, en-CA) with the same activity id; the en-US path is the same
// activity. No Klook price appears on the page.
//
// Reused unchanged: kyotoGionNightWalkingTour (87999), kyotoStayAreas,
// kyotoKimonoAiwafukuGion, klookEsim. Bands: tours and hotels 6.5%, eSIM 20%.
// ---------------------------------------------------------------------------

/** Hanamikoji after dark and the alleys off it; the listing notes the walk may be shared. */
export const kyotoGionHiddenGemsNightTour: KlookTour = {
  title: "Kyoto Gion night tour: the geisha district and hidden gems",
  desc: "A night walk along Hanamikoji Street with teahouse architecture and quiet alleys and temples off the main road",
  url: klookLink("https://www.klook.com/en-US/activity/186308-kyoto-gion-night-tour-discover-geisha-district-and-hidden-gems/"),
};

/** The one Gion night tour with dinner in the booking. */
export const kyotoGionKaisekiNightTour: KlookTour = {
  title: "Kyoto Gion night tour with kaiseki dinner",
  desc: "Listed 17:00–20:00 for a small group of 2–10 with an English-speaking guide and a kaiseki dinner in the booking",
  url: klookLink("https://www.klook.com/en-US/activity/102519-gion-tour-night-kyoto-join-3-hr-walking-tour-kaiseki-meal/"),
};

/** Your own party, with a choice of three evening departures. */
export const kyotoGionPrivateWalkingTour: KlookTour = {
  title: "Private Kyoto Gion highlights & hidden gems tour",
  desc: "A 3-hour private walk with a local guide, leaving at 16:00, 17:00 or 18:00; meals and admissions are not included",
  url: klookLink("https://www.klook.com/en-US/activity/45723-kyoto-gion-memoirs-geisha-private-walking-tour-guided-tour/"),
};

/** The latest departures of the set, capped at six. */
export const kyotoGionStudentNightWalk: KlookTour = {
  title: "Kyoto Gion small-group night walk with local students",
  desc: "A walk for up to six, run by Kyoto with Locals in English, with departures listed from 18:00",
  url: klookLink("https://www.klook.com/en-US/activity/210008-kyoto-gion-night-small-group-walk-with-sweets/"),
};

/** The evening as a food tour rather than a walk. */
export const kyotoGionFoodieNightTour: KlookTour = {
  title: "Kyoto premium night foodie tour in Gion",
  desc: "A night food tour of Gion with nine-plus dishes and three sake tastings listed",
  url: klookLink("https://www.klook.com/en-US/activity/88827-gion-join-half-day-food-tour/"),
};

/** Two bases a walk from the tour, so the end of the night needs no bus. */
export const gionNightStayAreas: KlookStayArea[] = [
  {
    area: "Gion / Higashiyama",
    why: "You are already there when the tour ends, and the Tozai Line at Higashiyama is close by for the morning.",
    url: kyotoStayAreas[2].url,
  },
  {
    area: "Shijo-Kawaramachi / Karasuma",
    why: "Kyoto's tourism association puts Shijo Kawaramachi about 13 minutes on foot from Yasaka Shrine, with Karasuma's two subway lines beyond it for the next day.",
    url: kyotoStayAreas[1].url,
  },
];

export const gionNightSameDayPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels in Gion",
    ctaLabel: "Check Gion hotel prices →",
    url: kyotoStayAreas[2].url,
    why: "A 3-hour evening tour ends after dark, and a bed in Gion means the walk back is the end of the tour.",
  },
  {
    label: "Gion kimono rental with hair styling",
    ctaLabel: "Check the kimono rental →",
    url: kyotoKimonoAiwafukuGion.url,
    why: "The listing puts the Gion Shijo store two minutes from Hanamikoji and Shirakawa, but check its return time against your tour.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Your booking names a meeting point in a district of narrow lanes, and you will want a working map to reach it on time.",
  },
];

/** The rest of a Kyoto tea ceremony day, for tea-ceremony-japan. No new listing. */
export const teaCeremonySameDayPrep: KlookTripPrepItem[] = [
  {
    label: "Gion kimono rental with hair styling",
    ctaLabel: "Check the kimono rental →",
    url: kyotoKimonoAiwafukuGion.url,
    why: "For a tea room with no kimono of its own, but check the return time against your slot first.",
  },
  {
    label: "Gion night walking tour",
    ctaLabel: "Check the Gion night tour →",
    url: kyotoGionNightWalkingTour.url,
    why: "A late-afternoon ceremony leaves the evening free, and this is the same district after dark.",
  },
  {
    label: "Hotels in Gion",
    ctaLabel: "Check Gion hotel prices →",
    url: kyotoStayAreas[2].url,
    why: "A bed near the tea rooms means no cross-city ride before a morning slot.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Your booking names an address in a district of narrow lanes, and you will want a working map to reach it on time.",
  },
];

// ---------------------------------------------------------------------------
// Japan 5 Day Itinerary, added 5 Nov 2026 for japan-5-day-itinerary. No new Klook
// listing: every product is one this file already holds, chosen for a Tokyo-in,
// Kansai-out route. The areas are the five the two-city plan actually turns on.
// ---------------------------------------------------------------------------

export const japanFiveDayStayAreas: KlookStayArea[] = [
  {
    area: "Tokyo Station / Marunouchi, Tokyo (3 nights)",
    why: "The Day 4 shinkansen leaves from under your hotel, so the one long move of the trip starts with a lift rather than a cross-city ride with the cases.",
    url: tokyoStayAreas[1].url,
  },
  {
    area: "Shinjuku, Tokyo (3 nights)",
    why: "The pick if your evenings matter most: a direct Narita Express stop, the limousine bus, and Omoide Yokocho on foot for the Day 2 night.",
    url: tokyoStayAreas[0].url,
  },
  {
    area: "Ueno / Asakusa, Tokyo (3 nights)",
    why: "Puts you beside Senso-ji for the Day 3 early start, and the Keisei Skyliner from Narita arrives at Ueno.",
    url: tokyoStayAreas[2].url,
  },
  {
    area: "Kyoto Station, Kyoto (1 night)",
    why: "With one Kyoto night there is no second chance to move bags. The shinkansen arrives here, the Day 5 train to Fushimi Inari leaves from here, and so does the Haruka to Kansai Airport.",
    url: kyotoStayAreas[0].url,
  },
  {
    area: "Shijo-Kawaramachi / Karasuma, Kyoto (2 nights on the 2+2 split)",
    why: "Worth it only if you take the two-night Kyoto version below: on foot to Pontocho, Gion and Nishiki Market, at the cost of a transfer back to Kyoto Station with the cases.",
    url: kyotoStayAreas[1].url,
  },
];

/** The checklist's bookings, from the 20% band down. Goes under the checklist table. */
export const japanFiveDayPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.esim,
    why: "Every ticket on this route is a QR code on your phone, so install it at home on Wi-Fi and it is working when you land.",
  },
  {
    label: "Hotels for your Tokyo nights",
    ctaLabel: "Check Tokyo hotels on Klook →",
    url: japanFiveDayStayAreas[0].url,
    why: "Three nights at one address is the point of this plan, so pick the base from the table below and book it first.",
  },
  {
    label: "Hotels around Kyoto Station",
    ctaLabel: "Check Kyoto hotels on Klook →",
    url: japanFiveDayStayAreas[3].url,
    why: "A single Kyoto night has no slack in it: if the Station area is full in cherry-blossom or autumn-leaf season, the whole of Day 5 starts with a transfer.",
  },
  {
    label: shinkansenTokyoKyoto.title,
    ctaLabel: "Check Tokyo → Kyoto shinkansen →",
    url: shinkansenTokyoKyoto.url,
    why: "The one reserved seat of the trip, on the morning of Day 4. Klook's page sells it by date and seat class, with QR boarding.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Days 2 and 3 are Tokyo Metro days; the 72-hour version covers both and the Day 1 evening. It does not cover JR.",
  },
  {
    ...tripPrepProducts.naritaLimousine,
    why: "The door-to-hotel option if you land at Narita with large cases and a hotel that is not beside a station.",
  },
];

// ---------------------------------------------------------------------------
// Okinawa day tours, added 5 Nov 2026 for okinawa-day-tours.
//
// Each listing below was confirmed live in its en-US form through the www.klook.com
// search index on 5 Nov 2026 (the /activity/ pages still answer automated reads with
// HTTP 403), and the durations, stops and terms quoted on the page come from the same
// index: 91094, 28134, 6489, 142932, 2405 and 160735, plus the two en-US Klook tour
// lists. 134350 is the existing churaumiKouriNorthernDayTour.
//
// Not used as links: 19157 and 143435 (Chinese-speaking guide in the title); 28223, the
// half-day southern bus with Sefa-Utaki, and 168838, which surfaced only without an
// en-US locale; "Okinawa regular sightseeing bus: Shuri Castle / Okinawa World course",
// which appears on en-US Klook destination pages but whose own activity URL could not
// be found, so the Naha tour list stands in for it. No price appears for any of them.
// ---------------------------------------------------------------------------

export const okinawaManzamoKouriChuraumiTour: KlookTour = {
  title: "Cape Manzamo, Kouri Island & Churaumi Aquarium day tour from Naha",
  desc: "The three northern headline stops from Naha, listed at 9 hours 35 minutes to 11 hours 30 minutes",
  url: klookLink("https://www.klook.com/en-US/activity/91094-cape-manzamo-kouri-island-churaumi-aquarium-one-day-tour-naha/"),
};

export const okinawaChuraumiKouriFullDayTour: KlookTour = {
  title: "Okinawa Churaumi Aquarium & Kouri Island full-day tour",
  desc: "A northern coach day with named hotel pick-ups and free cancellation up to 24 hours before",
  url: klookLink("https://www.klook.com/en-US/activity/28134-okinawa-churaumi-aquarium-cape-manzamo-kouri-island-bus-day-tour/"),
};

export const okinawaChurashimaBusDayTour: KlookTour = {
  title: "Churashima Okinawa bus day tour (Naha or Chatan departure)",
  desc: "The longest of the coach days, listed at 11 hours, with an English option among its languages",
  url: klookLink("https://www.klook.com/en-US/activity/6489-churashima-bus-day-tour-okinawa/"),
};

export const okinawaNorthSouthBusTour: KlookTour = {
  title: "Okinawa sightseeing bus, north and south routes",
  desc: "A bus-only day on either route: no guide, tickets or meals, about 3 hours at the aquarium on the north route",
  url: klookLink("https://www.klook.com/en-US/activity/142932-okinawa-south-north-1-day-bus-tour-churaumi-dmm-autoguiding/"),
};

export const southernOkinawaDayTrip: KlookTour = {
  title: "Southern Okinawa day trip from Naha",
  desc: "About 8 hours from a 9:30 departure, with Cape Chinen and the Nirai Kanai Bridge; a Japanese-speaking driver and no guide",
  url: klookLink("https://www.klook.com/en-US/activity/2405-southern-okinawa-day-trip/"),
};

export const shuriCastlePeaceWalkingTour: KlookTour = {
  title: "Okinawa Shuri Castle peace walking tour",
  desc: "About 4 hours on foot with a local guide around Shurijo Castle and Tamaudun, both World Heritage sites",
  url: klookLink("https://www.klook.com/en-US/activity/160735-okinawa-shuri-castle-peace-walking-tour/"),
};

/** Klook's own list, for the Shuri Castle bus course that has no confirmed activity URL. */
export const nahaToursListUrl = klookLink("https://www.klook.com/en-US/experiences/list/naha-tours/c13641-cate9/");

export const okinawaToursListUrl = klookLink("https://www.klook.com/en-US/destination/c6484-okinawa/1001-tours/");

/** The Churaumi ticket is a low-band product, so the 5 / 6.5 / 20% bands sit beside it. */
export const okinawaDayToursPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels in Naha",
    ctaLabel: "Check Naha hotels on Klook →",
    url: okinawaChuraumiStayAreas[0].url,
    why: "Tour pick-ups cluster here, so a hotel near the monorail keeps the early start simple and the 10-hour day from getting longer.",
  },
  {
    label: nahaAirportLimousineBus.title,
    ctaLabel: "Check the airport bus →",
    url: nahaAirportLimousineBus.url,
    why: "The coach from the airport to the hotel zones, if you are staying on the west coast and joining a tour at Chatan rather than Naha.",
  },
  {
    label: nahaAirportCarRental.title,
    ctaLabel: "Check Naha Airport car rentals →",
    url: nahaAirportCarRental.url,
    why: "For the days a tour does not cover. Klook's page states non-residents need a passport, their own licence, an international driving permit and a credit card.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Operators send the meeting point, coach number and any weather cancellation by message the day before, so you need data from the moment you land.",
  },
];

// ---------------------------------------------------------------------------
// Kyoto day trip from Tokyo and Hiroshima Peace Memorial tours, added 5 Nov 2026.
//
// Each listing below was confirmed live in its en-US form through the www.klook.com
// search index on 5 Nov 2026; the /activity/ pages still answer automated reads with
// HTTP 403. Klook has no Kyoto day tour sold out of Tokyo with the train included,
// so the Kyoto page pairs `shinkansenTokyoKyoto` (5%) with tours that start in Kyoto.
// Two Hiroshima listings are deliberately not linked by id: the 2-hour historical
// tour (no address in the index) and activity 190558, the 3-hour tour, seen only
// without an en-US locale. Both are reached through `hiroshimaPeaceToursListUrl`.
// ---------------------------------------------------------------------------

/** The whole of the eastern side on foot, listed at 8 hours from Kyoto Station. */
export const kyotoEasternWalkingTour: KlookTour = {
  title: "Walking tour of eastern Kyoto: Fushimi Inari, Kiyomizu & Gion",
  desc: "An 8-hour group day from Kyoto Station covering the three sights a day trip from Tokyo is usually built around",
  url: klookLink("https://www.klook.com/en-US/activity/108981-walking-tour-of-eastern-kyoto-fushimi-inari-shrine-kiyomizu-gion/"),
};

/** A two-hour guided block for the afternoon of a self-planned day. */
export const kyotoGionHigashiyamaWalkingTour: KlookTour = {
  title: "Kyoto: Gion and Higashiyama walking tour",
  desc: "A 2-hour guided walk, listed in English or Thai, that fits inside a self-planned day",
  url: klookLink("https://www.klook.com/en-US/activity/162998-kyoto-gion-and-higashiyama-walking-tour/"),
};

/** Klook's list of tours around the museum, including the 2- and 3-hour listings. */
export const hiroshimaPeaceToursListUrl = klookLink(
  "https://www.klook.com/en-US/destination/p50056982-hiroshima-peace-memorial-museum/5-tour/",
);

/** The English-and-Japanese group walk: museum, Dome and park, listed at 5 hours. */
export const hiroshimaPeaceHalfDayTour: KlookTour = {
  title: "Hiroshima City, Peace Memorial Museum & Atomic Bomb Dome half-day tour",
  desc: "A 5-hour group tour in English and Japanese, meeting a guide with a Magical Trip Tour sign",
  url: klookLink("https://www.klook.com/en-US/activity/93034-hiroshima-city-peace-memorial-museum-atomic-bomb-dome-half-day-tour/"),
};

/** The private city version, which adds the castle and the garden. */
export const hiroshimaPrivateWalkingTour: KlookTour = {
  title: "4-hour private Hiroshima city walking tour",
  desc: "A private walk taking in the Atomic Bomb Dome, Hiroshima Castle and Shukkeien Garden",
  url: klookLink("https://www.klook.com/en-US/activity/118442-4-hour-private-hiroshima-city-walking-tour/"),
};

/** The park and museum in the morning, Miyajima in the afternoon, by coach. */
export const hiroshimaPeaceMiyajimaBusTour: KlookTour = {
  title: "Hiroshima Peace Memorial Museum & Miyajima one-day bus tour",
  desc: "The museum and Itsukushima Shrine in one coach day, with a full refund up to 24 hours before on the listing",
  url: klookLink("https://www.klook.com/en-US/activity/160219-hiroshima-peace-memorial-museum-miyajima-itsukushima-shrine-one-day-bus-tour/"),
};

/** The museum's own permanent-exhibition admission, sold as a QR ticket. */
export const hiroshimaPeaceMuseumTicket: KlookTour = {
  title: "Hiroshima Peace Memorial Museum ticket",
  desc: "Permanent-exhibition admission on Klook, with instant confirmation",
  url: klookLink("https://www.klook.com/en-US/activity/106604-hiroshima-peace-memorial-museum-permanent-exhibitions-admission/"),
};

/** Under the plan table: the train first, because that is what closes first. */
export const kyotoDayTripPrep: KlookTripPrepItem[] = [
  {
    label: shinkansenTokyoKyoto.title,
    ctaLabel: "Check Tokyo → Kyoto shinkansen →",
    url: shinkansenTokyoKyoto.url,
    why: "The return leg decides the length of your day. Klook sells it by date and seat class, with QR boarding, so fix the way back at the same time.",
  },
  {
    label: kyotoCityFushimiArashiyamaTour.title,
    ctaLabel: "Check the Kyoto day tour →",
    url: kyotoCityFushimiArashiyamaTour.url,
    why: "The way to see the most in one day without planning buses. It meets at JR Kyoto Station, where your shinkansen arrives.",
  },
  {
    ...tripPrepProducts.esim,
    why: "A self-planned Kyoto day runs on bus routes and maps, so have data working before you leave Tokyo.",
  },
  {
    label: "Hotels around Kyoto Station",
    ctaLabel: "Check Kyoto Station hotels on Klook →",
    url: kyotoStayAreas[0].url,
    why: "If the plan outgrows one day, a night here keeps you beside the morning train back and turns the return into a choice rather than a deadline.",
  },
];

/** The museum ticket is a low-band product, so the 5 / 6.5 / 20% bands sit beside it. */
export const hiroshimaPeaceSameDayPrep: KlookTripPrepItem[] = [
  {
    label: shinkansenTokyoHiroshima.title,
    ctaLabel: "Check Tokyo → Hiroshima shinkansen →",
    url: shinkansenTokyoHiroshima.url,
    why: "A morning arrival is what puts you in the park before the museum's busiest hours.",
  },
  {
    label: "Hotels near the Peace Memorial Park",
    ctaLabel: "Check nearby hotels on Klook →",
    url: hiroshimaStayAreas[1].url,
    why: "A night within walking distance lets you use the reserved early slot from 7:30, which a same-day arrival cannot reach.",
  },
  {
    label: hiroshimaMiyajimaFerryDayTour.title,
    ctaLabel: "Check the Miyajima day →",
    url: hiroshimaMiyajimaFerryDayTour.url,
    why: "For the day after, or for a day that starts earlier: the ferry crossing is inside the booking.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The museum's web ticket arrives by email as a barcode, and its live queue cameras are online, so data is useful before you reach the door.",
  },
];

// ---------------------------------------------------------------------------
// Fushimi Inari tours, added 5 Nov 2026 for fushimi-inari-tour.
//
// Each listing below was confirmed in its en-US form through the www.klook.com search
// index on 5 Nov 2026; the /activity/ pages still answer automated reads with HTTP 403.
// Activity 158589 (2-hour walk) was seen only without an en-US locale, and the Kyoto
// Early Morning Tour was seen only as a card on regional destination pages with no
// activity URL, so neither is linked by id. `fushimiInariToursListUrl` reaches both.
// ---------------------------------------------------------------------------

/** Klook's Fushimi Inari Taisha destination page, which lists every tour of the shrine. */
export const fushimiInariToursListUrl = klookLink(
  "https://www.klook.com/en-US/destination/p50001443-fushimi-inari-taisha/",
);

/** The short version: the shrine's story, listed at 1 to 1 hour 15. */
export const fushimiInariShortWalkingTour: KlookTour = {
  title: "Fushimi Inari Shrine walking tour",
  desc: "A walk of 1 hour to 1 hour 15 on the shrine's history, its foxes and the meaning of the red gates",
  url: klookLink("https://www.klook.com/en-US/activity/59975-fushimi-inari-shrine-walking-tour/"),
};

/** The 90-minute walk that meets at the JR Inari ticket gate. */
export const fushimiInari90MinuteTour: KlookTour = {
  title: "90-minute Fushimi Inari Taisha walking guided tour",
  desc: "Meets in front of the JR Inari Station ticket gate, and the listing takes children from age 1",
  url: klookLink("https://www.klook.com/en-US/activity/87446-kyoto-join-half-day-tour-kyoto/"),
};

/** The 2 hours 30 walk that goes up into the Mount Inari scenery. */
export const fushimiInariGuidedWalk: KlookTour = {
  title: "Fushimi Inari Shrine walking guided tour",
  desc: "A guided walk listed at 2 hours 30, taking in the natural scenery of Mount Inari",
  url: klookLink("https://www.klook.com/en-US/activity/87418-kyoto-tour-kyoto/"),
};

/** The back-trail hike: about 7 km, away from the main gate paths. */
export const fushimiInariHiddenHikingTour: KlookTour = {
  title: "Fushimi Inari hidden hiking tour",
  desc: "A 3-hour hike of about 7 km on quieter trails, with shoes with good grip advised on the listing",
  url: klookLink("https://www.klook.com/en-US/activity/90628-fushimi-inari-hidden-hiking-tour-hiking-tour/"),
};

/** The shrine plus a sake museum tasting, listed at 3 hours 40. */
export const fushimiInariSakeTour: KlookTour = {
  title: "Fushimi Inari half-day walking tour with sake tasting",
  desc: "The shrine and the Gekkeikan Okura Sake Museum with a licensed English-speaking guide, listed at 3 hours 40",
  url: klookLink("https://www.klook.com/en-US/activity/94022-fushimiinari-shrine-gekkeikan-okura-sake-museum-join-half-day-walking-tour-sake-tasting/"),
};

/** The rest of the day around a Fushimi Inari morning. */
export const fushimiInariSameDayPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelKyotoStation,
    why: "An early start is the whole plan here, and JR Inari is two stations down the Nara Line from Kyoto Station, so a bed by the station keeps the dawn train short.",
  },
  {
    label: "Kyoto Station kimono rental with hair set",
    ctaLabel: "Check the kimono rental →",
    url: kyotoKimonoAiwafukuStation.url,
    why: "The shop lists itself five minutes from Kyoto Station, so the lower gates fit in by train. Keep to the lower gates rather than the mountain path, and check the return time.",
  },
  {
    label: jrKansaiAreaPass.title,
    ctaLabel: "Check the Kansai Area Pass →",
    url: jrKansaiAreaPass.url,
    why: "The JR Nara Line to Inari is the recommended route, so the pass is worth a look if the same days also take you to Osaka, Nara or the airport.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Tour meeting points here are a station gate, a street address and a convenience store, and you will want a working map and Kyoto's crowd forecast on the day.",
  },
];

// ---------------------------------------------------------------------------
// Amanohashidate and Ine, added 6 Nov 2026. Klook answers automated reads of its
// product pages with HTTP 403, so every listing below was confirmed through the
// www.klook.com search index on that date. The first is the listing whose name
// matches the tour booked on 5 Nov ("Kyoto Amanohashidate & Ine Funaya"). No
// price is carried from any of them.
// ---------------------------------------------------------------------------

/** The full-day coach tour, with a choice of departure time at checkout. */
export const amanohashidateIneFullDayTour: KlookTour = {
  title: "Kyoto Amanohashidate & Ine Funaya full-day tour",
  desc: "A shared coach day with Chion-ji, the Amanohashidate cable car and free time around the Ine boathouses, listed 07:30–18:30 with the Ine boat as an add-on",
  url: klookLink("https://www.klook.com/en-US/activity/218014-kyoto-amanohashidate-ine-funaya-full-day-sightseeing-experience/"),
};

/** The one you can board in one city and leave in the other. */
export const amanohashidateIneBayScenicTour: KlookTour = {
  title: "Amanohashidate, Ine Funaya & Ine Bay scenic day tour",
  desc: "Departs Osaka or Kyoto and lets you board in one and leave in the other, with a package that adds the cable car and Ine Bay boat tickets",
  url: klookLink("https://www.klook.com/en-US/activity/154563-japan-s-three-most-scenic-spots-amanohashidate-ine-funaya-and-ine/"),
};

/** Adds Chion-ji, an optional Tango Sea Train leg and a meal on some plans. */
export const amanohashidateIneChionjiTour: KlookTour = {
  title: "Sea of Kyoto day trip: Amanohashidate, Ine and Chion-ji",
  desc: "A 10.5-hour day from Osaka or Kyoto with the Ine Bay boat and Chion-ji, an optional Tango Sea Train ride, and a local specialty meal on some plans",
  url: klookLink("https://www.klook.com/en-US/activity/166970-amanohashidate-ine-tour-w-abalone-lunch-from-osaka-kyoto/"),
};

/** The Miyama thatched-village version, from Osaka or Kyoto. */
export const amanohashidateIneMiyamaTour: KlookTour = {
  title: "Amanohashidate, Ine no Funaya & Miyama thatched village day trip",
  desc: "Three stops in nine to ten hours: the sandbar, the boathouses and the Miyama thatched village, departing Osaka or Kyoto",
  url: klookLink("https://www.klook.com/en-US/activity/198928-amanohashidate-ine-funaya-miyama-thatch-village-day-tour/"),
};

/** The Miyama version sold out of Kyoto. */
export const amanohashidateIneMiyamaKyotoTour: KlookTour = {
  title: "Ine boathouses, Amanohashidate & Miyama day trip from Kyoto",
  desc: "A 10-hour join-in day listed from Kyoto, covering the same three stops as a single coach route",
  url: klookLink("https://www.klook.com/en-US/activity/110091-amanohashidate-ine-no-funaya-miyama-kayabuki-no-sato-day-trip/"),
};

/** For the reader who goes by train: boats, the viewpoints and local buses. */
export const amanohashidateIneTwoDayPass: KlookTour = {
  title: "Kyoto Amanohashidate Ine sightseeing 2-day pass",
  desc: "Two days of the Amanohashidate sightseeing boat, the Kasamatsu Park and Viewland viewpoints, the Ine Bay cruise and local buses; the train from Kyoto does not appear to be in it",
  url: klookLink("https://www.klook.com/en-US/activity/76788-kyoto-amanohashidate-ine-sightseeing-2-day-pass/"),
};

/** A join-in day that covers both of the Day 3 options on the Kyoto itinerary. */
export const kyotoUjiNaraDayTour: KlookTour = {
  title: "1-day Kyoto, Uji & Nara tour",
  desc: "A join-in day through Nara Park, Todai-ji and Kasuga Taisha with Uji on the same route, for a third day with no trains to work out",
  url: klookLink("https://www.klook.com/en-US/activity/101883-todai-ji-temple-kasuga-taisha-shrine-nara-park-join-one-day-walking-tour/"),
};

/**
 * Three nights in Kyoto. No new destination ids: each url reads out of
 * whereToStayKyotoAreas. Klook has no Shijo-Kawaramachi search of its own that we
 * could confirm, so that area uses the Karasuma Oike search, one station west.
 */
export const kyotoThreeDayStayAreas: KlookStayArea[] = [
  {
    area: "Kyoto Station (3 nights)",
    why: "The default: the shinkansen and the Haruka arrive under it, and Fushimi Inari, Arashiyama, Nara and Uji are all on JR lines from it, so the two trickiest mornings start at your own station.",
    url: whereToStayKyotoAreas[0].url,
  },
  {
    area: "Shijo-Kawaramachi / Karasuma (3 nights)",
    why: "The evening base: Pontocho and Nishiki Market on foot and Gion across the river, at the cost of an extra change on the JR mornings.",
    url: whereToStayKyotoAreas[1].url,
  },
  {
    area: "Gion / Higashiyama (2 nights, then Kyoto Station)",
    why: "The split stay: Kiyomizu-dera on foot at its 6:00 opening on Day 1, then a move to Kyoto Station for the Day 3 train and the journey out.",
    url: whereToStayKyotoAreas[2].url,
  },
];

/** The bookings around a three-night Kyoto stay. Every url is declared above. */
export const kyotoThreeDayTripPrep: KlookTripPrepItem[] = [
  {
    label: shinkansenTokyoKyoto.title,
    ctaLabel: "Check Tokyo → Kyoto tickets →",
    url: shinkansenTokyoKyoto.url,
    why: "Three full days means arriving the evening before Day 1, so this is the seat that sets the whole plan; Klook sells it by date and seat class.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "The direct train if you land at Kansai Airport instead, with no change on the way to Kyoto Station.",
  },
  {
    label: kyotoKimonoYumeyakata.title,
    ctaLabel: "Check Kyoto kimono rental →",
    url: kyotoKimonoYumeyakata.url,
    why: "A dressing slot is an appointment, and the listing's 17:30 same-day return is why the kimono belongs on Day 1 in Higashiyama.",
  },
  {
    label: kyotoGionNightWalkingTour.title,
    ctaLabel: "Check the Gion night walk →",
    url: kyotoGionNightWalkingTour.url,
    why: "The Day 1 evening, with a guide who knows which private lanes now carry photography rules.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Three days means several rail lines and a day trip out of the city, and each leg depends on an open map and a live timetable.",
  },
];

/** Around an Amanohashidate day. The early start makes the hotel the first booking. */
export const amanohashidateTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels near Kyoto Station",
    ctaLabel: "Check Kyoto Station hotels →",
    url: whereToStayKyotoAreas[0].url,
    why: "The listed tours leave at about 7:30 and the train and highway bus start here too, so the night before decides how early your alarm is.",
  },
  {
    label: shinkansenTokyoKyoto.title,
    ctaLabel: "Check Tokyo → Kyoto tickets →",
    url: shinkansenTokyoKyoto.url,
    why: "A tour day starts early and ends back in the city around 17:30 to 18:30, so an arrival from Tokyo has to be the day before.",
  },
  {
    ...tripPrepProducts.haruka,
    why: "From Kansai Airport, the direct way to the Kyoto Station area the night before a tour.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Meeting points are easy to miss at 7:30, and on your own the bus to Ine is a timetable you will want open on your phone.",
  },
];

// ---------------------------------------------------------------------------
// Arashiyama and Yufuin/Beppu entry pages, added 6 Nov 2026
// (task jtk-20261106-02). Klook answers automated reads of its product pages
// with HTTP 403, so each listing below was read in the www.klook.com search
// index on that date. `jrKyushuRailPass` is the one exception to en-US: the
// index showed id 2371 without a locale and under en-HK, so the en-US URL is
// built from the same id and slug. Tours and hotels 6.5%, rail passes 5%,
// eSIM 20%. No prices.
// ---------------------------------------------------------------------------

/** The early-start walk: the reason to book a guide for the grove at all. */
export const arashiyamaEarlyMorningWalk: KlookTour = {
  title: "Arashiyama Bamboo Grove early morning walking tour",
  desc: "A 2.5-hour small-group walk from Saga-Arashiyama Station, using quieter paths beyond the main route and ending with a matcha tea ceremony",
  url: klookLink("https://www.klook.com/en-US/activity/191374-arashiyama-bamboo-grove-early-morning-walking-tour-small-group/"),
};

/** Starts at Kyoto Station, so the train is part of the tour. */
export const arashiyamaTenryujiWalkingTour: KlookTour = {
  title: "Kyoto Arashiyama walking tour: Sagano bamboo grove & Tenryu-ji",
  desc: "A 4 to 5 hour walk with a licensed English-speaking guide from Kyoto AVANTI, by public transport, with Tenryu-ji and Togetsukyo Bridge",
  url: klookLink("https://www.klook.com/en-US/activity/91757-kyoto-city-jojakkoji-arashiyama-bamboo-grove-tenryuji-one-day-walking-tour/"),
};

/** The longest walk: two gardens and a temple lunch. */
export const arashiyamaGardenLunchWalkingTour: KlookTour = {
  title: "Arashiyama bamboo forest & garden half-day walking tour",
  desc: "Five hours through the grove, Tenryu-ji and Okochi Sanso, with a vegetarian lunch inside Tenryu-ji",
  url: klookLink("https://www.klook.com/en-US/activity/92976-arashiyama-bamboo-forest-tenryu-ji-temple-okochi-sanso-garden-join-half-day-walking-tour/"),
};

/** Arashiyama and Sagano on foot, with Daikaku-ji named on the listing. */
export const arashiyamaSaganoHalfDayWalk: KlookTour = {
  title: "Kyoto City, Arashiyama and Sagano half-day walking tour",
  desc: "A 3 hour 45 minute guided walk through Arashiyama and Sagano; the listing names Daikaku-ji as one of its locations",
  url: klookLink("https://www.klook.com/en-US/activity/91572-kyoto-city-arashiyama-sagano-half-day-walking-tour/"),
};

/** Ebisuya's rickshaw, for a shorter visit or less walking. */
export const arashiyamaRickshawTour: KlookTour = {
  title: "Kyoto Arashiyama rickshaw tour",
  desc: "A private Ebisuya rickshaw for your own group, from 30 minutes to 2 hours, with part of the route through the bamboo",
  url: klookLink("https://www.klook.com/en-US/activity/1031-arashiyama-rickshaw-tour-kyoto/"),
};

/** The whole-city answer: Arashiyama as one stop among several. */
export const kyotoPanoramicDayTour: KlookTour = {
  title: "Kyoto panoramic day trip: Kinkaku-ji, Arashiyama, Nijo Castle & Fushimi Inari",
  desc: "A 10 to 11 hour shared day from Osaka or Kyoto that gives Arashiyama one slot alongside three other major stops",
  url: klookLink("https://www.klook.com/en-US/activity/144196-kyoto-panoramic-day-tour-kinkakuji-temple-arashiyama-nijo-castle/"),
};

/** Around a morning in Arashiyama. Every url is declared above. */
export const arashiyamaTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels in Arashiyama",
    ctaLabel: "Check Arashiyama hotels →",
    url: whereToStayKyotoAreas[3].url,
    why: "Sleeping nearby is the surest way to be in the grove before 8:00.",
  },
  {
    label: "Hotels near Kyoto Station",
    ctaLabel: "Check Kyoto Station hotels →",
    url: whereToStayKyotoAreas[0].url,
    why: "The 11-minute JR ride to Saga-Arashiyama starts here, and so does the Kyoto AVANTI walking tour.",
  },
  {
    label: kyotoKimonoOokiniArashiyama.title,
    ctaLabel: "Check kimono in Arashiyama →",
    url: kyotoKimonoOokiniArashiyama.url,
    why: "A store in Arashiyama means no train ride in kimono, and a dressing slot is an appointment to book ahead.",
  },
  {
    label: saganoHozugawaGuaranteedTour.title,
    ctaLabel: "Check the train and boat day →",
    url: saganoHozugawaGuaranteedTour.url,
    why: "For a full day here, this holds the torokko seat and the river boat in one booking.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The walks start at stations and the free grove has no ticket office to ask, so an open map does the work.",
  },
];

/** Yufuin no Mori, Nyoirin-ji, Dazaifu and the hells: the lead listing for this route. */
export const yufuinBeppuNoMoriTour: KlookTour = {
  title: "Kyushu one-day tour: Yufuin no Mori train, Yufuin, Nyoirin-ji, Dazaifu & the Beppu hells",
  desc: "A shared 10.5-hour day from Fukuoka. One route has Umi Jigoku and the Yufuin no Mori train, the other Umi Jigoku and Kamado Jigoku tickets",
  url: klookLink("https://www.klook.com/en-US/activity/95611-beppu-onsen-yufuin-one-day-tour-fukuoka/"),
};

/** The ropeway version. */
export const yufuinBeppuRopewayTour: KlookTour = {
  title: "Dazaifu, Yufuin, Beppu Ropeway & Kamado Jigoku day tour",
  desc: "A 10-hour coach day from Fukuoka with a complimentary onsen egg and lemon soda; seats are taken in order of arrival",
  url: klookLink("https://www.klook.com/en-US/activity/129252-dazaifu-yufuin-beppu-ropeway-kamado-jigoku-one-day-tour/"),
};

/** The listing that names Kinrin Lake. */
export const yufuinKinrinNyoirinjiTour: KlookTour = {
  title: "Kyushu one-day tour: Nyoirin-ji, Mt. Yufu, Yufuin, Kinrin Lake & the hells",
  desc: "A 10-hour day from Fukuoka in Chinese, English and Cantonese; the listing shows a minimum of 4 people",
  url: klookLink("https://www.klook.com/en-US/activity/153188-nyoirinji-temple-beppu-hell-yufuin-tour-chinese-and-english-guide/"),
};

/** The one listing here with an onsen facility on the route. */
export const yufuinHyotanOnsenTour: KlookTour = {
  title: "Kyushu onsen day tour: Hyotan Onsen, Yufuin, Dazaifu & Umi Jigoku",
  desc: "About 10 hours from Fukuoka with Hyotan Onsen on the route; check what your package covers, and bring or rent a towel",
  url: klookLink("https://www.klook.com/en-US/activity/181573-hyoutan-onsen-yufuin-floral-village-dazaifu-tenmangu-sea-hell/"),
};

/** Hita's old town on the same day. */
export const yufuinBeppuHitaTour: KlookTour = {
  title: "One-day trip to Oita: Yufuin, Beppu & Hita old town",
  desc: "A 10-hour day from Fukuoka that adds Hita's old town to Yufuin and Beppu",
  url: klookLink("https://www.klook.com/en-US/activity/186820-kyushu-oita-day-trip-yufuin-beppu-hita-old-town-itinerary/"),
};

/** Dazaifu and Bungo-Mori, with a Japanese-English guide. */
export const yufuinBeppuBungoMoriTour: KlookTour = {
  title: "Dazaifu, Bungo-Mori, Beppu & Yufuin 1-day bus tour",
  desc: "A 10.5-hour shared bus day from Fukuoka with a Japanese-English guide; the bus has no toilet, and a date short of its minimum is cancelled 3 days ahead with a full refund",
  url: klookLink("https://www.klook.com/en-US/activity/117277-dazaifu-bungo-mori-beppu-yufuin-1-day-bus-tour-from-fukuoka/"),
};

/** A car and driver, for a route the coaches do not run. */
export const fukuokaPrivateCharter: KlookTour = {
  title: "Customized chartered car from Fukuoka",
  desc: "A private car with a driver for 8 or 10 hours on your own route, with attraction admission not included",
  url: klookLink("https://www.klook.com/en-US/activity/9118-beppu-eight-hot-springs-yufuin-spa-town-one-day-private-tour/"),
};

/** For a stay in Yufuin or Beppu rather than a day. */
export const jrKyushuRailPass: KlookTour = {
  title: "JR Kyushu Rail Pass (North, South or All Kyushu)",
  desc: "Three, five or seven days depending on the area, for non-Japanese passport holders on a Temporary Visitor stamp; Klook's guide lists Hakata, Yufuin and Beppu inside the North pass",
  url: klookLink("https://www.klook.com/en-US/activity/2371-jr-kyushu-jr-pass/"),
};

/** Around a Fukuoka coach day. The hotel comes first because the day starts early. */
export const yufuinBeppuTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels at Hakata Station",
    ctaLabel: "Check Hakata hotels →",
    url: fukuokaStayAreas[1].url,
    why: "One listing shows an 08:30 departure and tours do not wait for latecomers, so the night before decides the day.",
  },
  {
    label: jrKyushuRailPass.title,
    ctaLabel: "Check the JR Kyushu pass →",
    url: jrKyushuRailPass.url,
    why: "If you would rather stay a night in Yufuin or Beppu, this is the pass to price against single fares.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Meeting points, free time in Yufuin and the walk back to the coach all depend on a working map.",
  },
  {
    label: fukuokaPrivateCharter.title,
    ctaLabel: "Check the private car →",
    url: fukuokaPrivateCharter.url,
    why: "For a family or a group, a car and driver gives you your own stops and breaks.",
  },
];

// ---------------------------------------------------------------------------
// Kumano Kodo, added 6 Nov 2026 for kumano-kodo-tour.
//
// Confirmed through the www.klook.com search index, because Klook answers automated
// reads with HTTP 403. 158473, 172638, 160250, 89727, 80054, 76602, the Wakayama hotel
// page, the Kuroshio rail page and 416909 were seen in en-US form. 169963 and 138713
// were seen on sale in other locales, so their en-US URLs keep the same id and slug.
// No Klook luggage, transfer, Kyoto departure or Shirahama departure listing was found.
// Bands: tours and hotels 6.5%, rail 5%, eSIM 20%.
// ---------------------------------------------------------------------------

/** All three grand shrines in a day: the lead listing for this route. */
export const kumanoSanzanExpressTour: KlookTour = {
  title: "Kumano Sanzan one-day tour from Osaka (choose the Kumano Kodo route)",
  desc: "About 10 hours from Shinsaibashi to Hongu, Hayatama and Nachi with a light hike on the old road. One tour with three routes, so pick Kumano; tickets and meals are extra",
  url: klookLink("https://www.klook.com/en-US/activity/158473-a/"),
};

/** The second Osaka listing, with departure times chosen at checkout. */
export const kumanoSanzanPilgrimageTour: KlookTour = {
  title: "Kumano Kodo & Kumano Sanzan full-day pilgrimage tour",
  desc: "A day from Osaka in a window of about 07:00 to 19:50, with several departure times on the same itinerary",
  url: klookLink("https://www.klook.com/en-US/activity/172638-one-day-pilgrimage-trekking-tour/"),
};

/** For the falls more than the walk. */
export const kumanoNachiHayatamaTour: KlookTour = {
  title: "Kumano Nachi Taisha, Nachi Falls & Hayatama Taisha day tour from Osaka",
  desc: "A 12 hour 45 minute bus day, 07:30 to 20:15, with a boxed lunch; many stone steps, so wear comfortable shoes. It needs a minimum group size",
  url: klookLink("https://www.klook.com/en-US/activity/169963-kumano-nachi-taisha-nachi-falls-day-tour-by-luxury-bus-from-osaka/"),
};

/** The Nagoya departure. */
export const kumanoNachiNagoyaTour: KlookTour = {
  title: "Kumano Kodo walking trail & Nachi Falls day tour from Nagoya",
  desc: "An 11-hour bus day from downtown Nagoya with about four hours exploring the Kumano trails",
  url: klookLink("https://www.klook.com/en-US/activity/80054-kumano-kodo-nachi-falls-hiking-tour-nagoya/"),
};

/** A guide on the trail, for walkers already in the Kumano area. */
export const kumanoKodoPrivateWalk: KlookTour = {
  title: "World Heritage Kumano Kodo private walking tour",
  desc: "A private guide in English or Japanese for 6 hours to 2 days. Options include Hosshinmon-oji to Hongu and a Nachi route from Kii-Katsuura Station; no suitcases",
  url: klookLink("https://www.klook.com/en-US/activity/76602-kumanokodo-walking-tour-japan/"),
};

/** Koyasan and Kumano with a hotel night. */
export const kumanoKoyaTwoDayTour: KlookTour = {
  title: "2-day Mt. Koya, Kumano Kodo & Nachi Falls tour from Osaka",
  desc: "One night by coach with Toretore Market lunch and hotel meals; read the trail time on the listing",
  url: klookLink("https://www.klook.com/en-US/activity/89727-2d1n-koyasan-kumano-kodo-nachi-falls-tour-bus-tour-osaka/"),
};

/** Shirahama's coast with Daimon-zaka and Nachi. */
export const kumanoShirahamaTwoDayTour: KlookTour = {
  title: "2-day Wakayama tour: Shirahama, Sandanbeki, Daimon-zaka & Nachi Taisha",
  desc: "Two days from Osaka along the coast to Nachi; rates assume two people to a room",
  url: klookLink("https://www.klook.com/en-US/activity/138713-wakayama-kuroshio-market-shirahama-engetsu-island-senjojiki-sa/"),
};

/** Seen by title only: the page tells readers so. */
export const kumanoMultiDayPilgrimage: KlookTour = {
  title: "Osaka Kumano Hongu Taisha & Nachi Falls multi-day pilgrimage tour",
  desc: "A multi-day tour from Osaka; read the listing for the itinerary",
  url: klookLink("https://www.klook.com/en-US/activity/160250-kumano-hongu-taisha-nachi-falls-multi-day-unesco-site-pilgrimage-tour/"),
};

/** Klook's Wakayama hotel page. No Tanabe or Shirahama area page was found. */
export const kumanoWakayamaHotels: KlookTour = {
  title: "Hotels in Wakayama on Klook",
  desc: "Klook's hotel search for Wakayama; check the map for Tanabe, Shirahama or Hongu",
  url: klookLink("https://www.klook.com/en-US/destination/c25492-wakayama/3-hotel/"),
};

/** One bookable bed at the end of the Nakahechi. */
export const kumanoYunomineGuesthouse: KlookTour = {
  title: "J-Hoppers Kumano Yunomine Guesthouse",
  desc: "A hostel at Yunomine Onsen, about 36 km from Kii-Tanabe Station and a 5-minute walk from the pilgrimage route",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/416909-jhoppers-kumano-yunomine-guesthouse--hostel/"),
};

/** Reserved seats on the train to Kii-Tanabe and Shirahama. */
export const kumanoKuroshioTickets: KlookTour = {
  title: "Limited express Kuroshio tickets",
  desc: "Reserved ordinary and Green seats on the Kuroshio toward Shirahama",
  url: klookLink("https://www.klook.com/en-US/japan-rail/kuroshio/"),
};

/** Around a Kumano day or a night on the trail. Every url is declared above or earlier. */
export const kumanoKodoTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels in Namba",
    ctaLabel: "Check Namba hotels →",
    url: osakaStayAreas[1].url,
    why: "The Kumano Sanzan tour meets at Shinsaibashi, on the same Midosuji Line, so a Namba bed makes an early start simple.",
  },
  {
    label: "Hotels in Wakayama",
    ctaLabel: "Check Wakayama hotels →",
    url: kumanoWakayamaHotels.url,
    why: "For a walk, the night before in Tanabe or Shirahama puts you close to the first bus.",
  },
  {
    label: kumanoYunomineGuesthouse.title,
    ctaLabel: "Check the Yunomine guesthouse →",
    url: kumanoYunomineGuesthouse.url,
    why: "Yunomine Onsen is one of the three hot spring areas near Hongu, where the two-day walk ends.",
  },
  {
    label: kumanoKuroshioTickets.title,
    ctaLabel: "Check Kuroshio tickets →",
    url: kumanoKuroshioTickets.url,
    why: "Shin-Osaka to Kii-Tanabe takes about 2 hours to 2 hours 20 minutes, and your bus connection depends on it.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Bus times and trail maps are easier with data, and the bureau says to carry a phone on the walk.",
  },
];

// ---------------------------------------------------------------------------
// Kyushu 5-day itinerary, added 7 Nov 2026 (task jtk-20261107-01).
//
// Klook answers automated reads with HTTP 403, so each listing was read in the
// www.klook.com search index on that date. 119927, 174646, 159280, 191563, 96308,
// the Kumamoto Castle hotel page and ONE STATION HOTEL were seen in en-US form.
// 129725 was seen without a locale and under en-AU, so its en-US URL keeps the same
// id and slug. 119927 and 129725 show different stops by locale and the page says so.
// Reused: yufuinBeppuNoMoriTour, jrKyushuRailPass, dazaifuYanagawaDayTour,
// fukuokaStayAreas, klookEsim. Tours and hotels 6.5%, rail 5%, eSIM 20%. No prices.
// ---------------------------------------------------------------------------

/** The Kumamoto departure: the tour for a night in Kumamoto on Day 3. */
export const kumamotoTakachihoRailwayTour: KlookTour = {
  title: "Kumamoto Takachiho Gorge & Minamiaso Railway full-day tour",
  desc: "A 9.5-hour day from 08:00 to 17:30 from Kumamoto, with the order adjusted around train and boat times; Minami Aso Railway fares are extra",
  url: klookLink("https://www.klook.com/en-US/activity/174646-takachiho-railway-takachiho-gorge-mt-aso-kusasenri-day-tour/"),
};

/** Fukuoka departure with Kusasenri standing in for the closed crater. */
export const asoTakachihoFukuokaTour: KlookTour = {
  title: "Mt. Aso & Takachiho Gorge guided day tour",
  desc: "A 10.2-hour day from Fukuoka, 07:50 to 18:00, with no meals included and Kusasenri replacing the crater while it is closed",
  url: klookLink("https://www.klook.com/en-US/activity/129725-kumamoto-castle-aso-volcano-kamishikimi-kumanoimasu-shrine-tour/"),
};

/** Fukuoka departure with the lunch included. */
export const takachihoAsoBeefLunchTour: KlookTour = {
  title: "Takachiho Gorge, Mt. Aso & Kusasenri day trip with beef lunch",
  desc: "About 9.5 to 10.5 hours from Fukuoka with a Takachiho beef lunch and an optional boat ride; read the package for what your date includes",
  url: klookLink("https://www.klook.com/en-US/activity/159280-takachiho-gorge-mt-aso-kusasenri-one-day-tour/"),
};

/** Fukuoka departure; the title names Kumamoto Castle, so read the stops. */
export const kumamotoCastleTakachihoTour: KlookTour = {
  title: "Kumamoto Castle, Josaien & Takachiho Gorge day trip from Fukuoka",
  desc: "A 10.5-hour day from Fukuoka with a Chinese and English guide; other Klook sites name the Takachiho Railway and Amano Iwato Shrine, so confirm the stops",
  url: klookLink("https://www.klook.com/en-US/activity/119927-kumamoto-castle-takachiho-gorge-footpath-one-day-tour-from-fukuoka/"),
};

/** Nagasaki from Hakata Station, for Day 5 without planning the trains. */
export const nagasakiSmallGroupDayTour: KlookTour = {
  title: "Nagasaki small-group day trip from Fukuoka",
  desc: "Starts at 8:00 at Hakata Station and returns around 18:00, with the Atomic Bomb Museum, Peace Park, the Hamamachi shopping street and Glover Garden",
  url: klookLink("https://www.klook.com/en-US/activity/191563-nagasaki-day-trip-small-group-tour/"),
};

/** The night-view version, with a late return. */
export const nagasakiInasayamaDayTour: KlookTour = {
  title: "Yutoku Inari Shrine, Nagasaki Atomic Bomb Museum & Mt. Inasa day tour",
  desc: "A coach day from Fukuoka that ends with the night view from Inasayama Park; the listing warns of a late return",
  url: klookLink("https://www.klook.com/en-US/activity/96308-yutoku-inari-shrine-nagasaki-atomic-bomb-museum-mt-inasa-bus-tour-fukuoka/"),
};

/** Klook has no Kumamoto Station hotel page in the index, so this one is the castle's. */
export const kumamotoCastleHotels: KlookTour = {
  title: "Hotels near Kumamoto Castle",
  desc: "Klook's hotel page for the castle area, for a night in the city centre",
  url: klookLink("https://www.klook.com/en-US/destination/p50001572-kumamoto-castle/3-hotel/"),
};

/** Next to Kumamoto Station, for a morning tour pickup or a train out. */
export const oneStationHotelKumamoto: KlookTour = {
  title: "ONE STATION HOTEL KUMAMOTO",
  desc: "Listed as adjacent to Kumamoto Station, with JR, trams, buses and the airport shuttle nearby",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/248219-one-station-hotel-kumamoto/"),
};

/** Everything a five-day Kyushu trip books once. The two hotels come first. */
export const kyushuItineraryTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels at Hakata Station",
    ctaLabel: "Check Hakata hotels →",
    url: fukuokaStayAreas[1].url,
    why: "Three of the four nights are here, and the shinkansen, the Sonic and the Yufuin no Mori all leave from this station.",
  },
  {
    label: oneStationHotelKumamoto.title,
    ctaLabel: "Check the Kumamoto Station hotel →",
    url: oneStationHotelKumamoto.url,
    why: "The Day 4 tour starts at 08:00, so a night beside the station is the easy way to make it.",
  },
  {
    label: kumamotoTakachihoRailwayTour.title,
    ctaLabel: "Check the Takachiho tour →",
    url: kumamotoTakachihoRailwayTour.url,
    why: "Takachiho's own access page lists one bus a day from Kumamoto Station, about 3 hours each way, so this is the day to book first.",
  },
  {
    label: jrKyushuRailPass.title,
    ctaLabel: "Check the JR Kyushu pass →",
    url: jrKyushuRailPass.url,
    why: "Worth it if you take the train to Yufuin and Kumamoto. Work out your version in the rail pass table first.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Tour meeting points, tram stops and yatai all depend on a working map on every day of the trip.",
  },
];

// ---------------------------------------------------------------------------
// furano-biei-tour and hakone-ryokan-private-onsen, added 7 Nov 2026.
//
// Tours: Klook answers automated reads with HTTP 403, so each en-US URL was confirmed
// in the www.klook.com search index that day. 130175 is left out because only en-AU,
// en-PH and no-locale forms appeared. No Klook price appears.
// ---------------------------------------------------------------------------

/** The light-up version: Ningle Terrace, the Blue Pond and Shirahige Falls. */
export const furanoBieiIlluminationTour: KlookTour = {
  title: "Illumination tour: Ningle Terrace, Blue Pond & Shirahige Falls",
  desc: "10 hours 10 minutes from Sapporo, join-in or private. Lunch is not included: you pick Biei Station's front area or snow play at Shikisai-no-oka",
  url: klookLink("https://www.klook.com/en-US/activity/100735-ningle-terrace-biei-blue-pond-shirahige-waterfall-join-one-day-bus-tour-sapporo/"),
};

/** The longest winter day, with a late return. */
export const bieiWinterBluePondShirahigeTour: KlookTour = {
  title: "Biei winter Blue Pond & Shirahige Falls light-up day tour",
  desc: "About 11.6 hours, 08:55 to around 20:30, with the Blue Pond light-up, Shirahige Falls and a Furano stop. Minimum 12 people",
  url: klookLink("https://www.klook.com/en-US/activity/98680-winter-biei-blue-pond-shirahige-waterfall-light-up-day-tour/"),
};

/** The snow-play winter day. The indexed stops do not name the Blue Pond. */
export const furanoBieiWinterDayTour: KlookTour = {
  title: "Furano & Biei winter day tour from Sapporo",
  desc: "About 10 hours to the Biei Christmas Tree, Shikisai-no-oka, Shirahige Falls and Ningle Terrace, with paid snow activities on site",
  url: klookLink("https://www.klook.com/en-US/activity/178365-biei-hokkaido-shikisai-no-oka-ningle-terrace-day-tour-form-sapporo/"),
};

/** Two routes under one listing, so the choice is made at booking. */
export const sapporoBluePondOrZooRouteTour: KlookTour = {
  title: "Sapporo day tour: Blue Pond light-up route or Asahiyama Zoo route",
  desc: "A late-departure Blue Pond and Ningle Terrace light-up route, or Asahiyama Zoo and Ningle Terrace. Pick the route when you book",
  url: klookLink("https://www.klook.com/en-US/activity/4160-sapporo-flower-farm-blue-pond-tour-hokkaido/"),
};

/** What a Furano and Biei day books around the tour. */
export const furanoBieiTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels around Sapporo Station",
    ctaLabel: "Check Sapporo hotels →",
    url: japanWinterStayAreas[6].url,
    why: "Every tour here starts in Sapporo, and the winter light-up tours can run to around 20:30.",
  },
  {
    label: "Hotels in Furano",
    ctaLabel: "Check Furano hotels →",
    url: hokkaidoSevenDayStayAreas[2].url,
    why: "A night inland removes the drive of about 2.5 hours each way and leaves you close to Ningle Terrace after dark.",
  },
  {
    label: sapporoFuranoAreaPass.title,
    ctaLabel: "Check the Furano area pass →",
    url: sapporoFuranoAreaPass.url,
    why: "If you go by train, the ¥11,000 4-day pass beats a ¥12,240 return from Sapporo to Biei on JR Hokkaido's fares.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Snow can change a tour's route or return time, and the Biei bus and train times are easiest to check on your phone.",
  },
];

/**
 * The four inns on hakone-ryokan-private-onsen. Each room-bath claim on that page comes
 * from the inn's own site. Hotels pay the 6.5% band.
 */
export const hakoneYoshiikeRyokan: KlookTour = {
  title: "Yoshiike Ryokan",
  desc: "About 7 minutes on foot from Hakone-Yumoto Station, with two room types that have an open-air bath",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/915458-yoshiike-ryokan/"),
};

export const hakoneKowakienMikawaya: KlookTour = {
  title: "Hakone Kowakien Mikawaya Ryokan",
  desc: "Kowakudani, with 10 of its 25 rooms listed with an open-air bath, plus a free semi-open-air family bath",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/318964-hakone-kowakien-mikawaya-ryokan/"),
};

export const hakoneRyokanKyuan: KlookTour = {
  title: "Hakone Ryouriyado Ryokan Kyuan",
  desc: "Ninotaira, 10 rooms and no public bath: every room has an open-air or semi-open-air bath of its own",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/586522-hakone-ryouriyado-ryokan-kyuan/"),
};

export const hakoneGoraKadan: KlookTour = {
  title: "Gora Kadan",
  desc: "Gora, about 5 minutes on foot from the station, with several room types that have an open-air bath",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/499174-gora-kadan/"),
};

/**
 * Two more Klook listings. Neither inn's own site could be found, so the page makes no
 * claim about their room baths and quotes only the listing's own name.
 */
export const hakoneYuyuListing: KlookTour = {
  title: "YuYu Hakone",
  desc: "Klook's listing name adds \"Private Open Air Onsen Usage Guaranteed\". Read the room type before you book",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/1422853-yuyu-hakone--private-open-air-onsen-usage-guaranteed/"),
};

export const hakoneChisujiListing: KlookTour = {
  title: "Chisuji Ryokan",
  desc: "A small inn on Klook. Read the room type for its bath before you book",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/1263742-chisuji-ryokan/"),
};

/** Klook's Hakone hotel page, for readers who want other inns or dates. */
export const hakoneHotels: KlookTour = {
  title: "All hotels in Hakone",
  desc: "Klook's hotel page for Hakone, to compare other inns on your dates",
  url: klookLink("https://www.klook.com/en-US/destination/c441-hakone/3-hotel/"),
};

/** What a night in Hakone books around the room. */
export const hakoneRyokanTripPrep: KlookTripPrepItem[] = [
  {
    label: hakoneHotels.title,
    ctaLabel: "Check Hakone hotels →",
    url: hakoneHotels.url,
    why: "If the inns here are full on your dates, this is the quickest way to compare others. Check the room type for its bath.",
  },
  {
    label: hakoneFreepass.title,
    ctaLabel: "Check the Hakone Freepass →",
    url: hakoneFreepass.url,
    why: "It has no 1-day version, so it suits a night here. The 2-day pass from Shinjuku is ¥7,100 on Odakyu's figures.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Gora Kadan's shuttle starts with a phone call from the station, and bus times are easiest to check on your phone.",
  },
];

// ---------------------------------------------------------------------------
// Tokyo to Kyoto — added 7 Nov 2026 (task-jtk-20261107-03).
//
// The route page is the 5% rail band, the hotels and guided days 6.5%, the eSIM
// 20%. Every url reads out of an existing constant, so nothing here is a second
// source of truth for a Klook id. It sits at the end of the file because
// `arashiyamaEarlyMorningWalk` is declared late. Fushimi Inari and Arashiyama are
// the main CTAs of fushimi-inari-tour and arashiyama-bamboo-forest-tour.
// ---------------------------------------------------------------------------
export const tokyoToKyotoTripPrep: KlookTripPrepItem[] = [
  {
    label: shinkansenTokyoKyoto.title,
    ctaLabel: "Check Tokyo → Kyoto tickets →",
    url: shinkansenTokyoKyoto.url,
    why: "Sold by date and seat class, so you can pick the train and settle the E seat for Mt. Fuji before you travel.",
  },
  {
    ...tripPrepProducts.hotelKyotoStation,
    why: "The shinkansen stops here and the night buses set down here, so your bags are off your hands within minutes.",
  },
  {
    label: "Hotels around Shijo-Kawaramachi",
    ctaLabel: "Check Shijo-Kawaramachi hotels on Klook →",
    url: kyotoStayAreas[1].url,
    why: "The better base if your evenings are for restaurants and Gion rather than an early train out.",
  },
  {
    label: kyotoFushimiInariWalkingTour.title,
    ctaLabel: "Check the Fushimi Inari walk →",
    url: kyotoFushimiInariWalkingTour.url,
    why: "A short JR ride from Kyoto Station, which makes it the easiest guided half-day to fit around your arrival.",
  },
  {
    label: arashiyamaEarlyMorningWalk.title,
    ctaLabel: "Check the Arashiyama walk →",
    url: arashiyamaEarlyMorningWalk.url,
    why: "It starts early, so book it for your first full morning rather than the day your train gets in.",
  },
  {
    ...tripPrepProducts.kyotoHighlightTour,
    why: "Kinkaku-ji, Fushimi Inari and Arashiyama sit on different sides of the city, so a guided day saves working out each transfer.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Live maps and your QR tickets all need data from the moment you step off at Kyoto Station.",
  },
];

/**
 * Same-day block for warner-bros-studio-tour-tokyo-tickets, added 8 Nov 2026 (task
 * jtk-20261108-R02). The studio tour ticket is an attraction ticket, treated here as
 * Klook's 2% special-activity band, so the rest of the day carries the higher bands:
 * tours 6.5%, the Tokyo Subway Ticket 5%, the Klook eSIM 20%. Reuses existing
 * products only — no new URL or ad id. The studio tour's own FAQ recommends three
 * to four hours (wbstudiotour.jp/en/faqs/facilities, read 8 Nov 2026).
 */
export const warnerBrosStudioTourSameDayPrep: KlookTripPrepItem[] = [
  {
    label: shinjukuNightFoodWalkingTour.title,
    ctaLabel: "Check the Shinjuku night tour →",
    url: shinjukuNightFoodWalkingTour.url,
    why: "A morning or early-afternoon slot leaves the evening free, and the Toei Oedo Line runs straight back from Toshimaen to Shinjuku: a three-hour join-in walk through Omoide Yokocho, Kabukicho and Golden Gai.",
  },
  {
    label: tokyoSightseeingBusTour.title,
    ctaLabel: "Check the Tokyo day tour →",
    url: tokyoSightseeingBusTour.url,
    why: "For the day either side of the studio tour: a guided day of the Imperial Palace gardens, Asakusa and Tokyo Skytree with multilingual audio guidance.",
  },
  {
    ...tripPrepProducts.subway,
    why: "The Shinjuku route to Toshimaen is the Toei Oedo Line, a subway line, so a 24, 48 or 72-hour ticket covers the ride there and back. The Seibu Ikebukuro Line from Ikebukuro is a private railway and is not covered.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Entry has to be within 30 minutes of your slot, and a Klook ticket arrives as an e-ticket on your phone — data from the airport onwards keeps the voucher and the route to Toshimaen on hand.",
  },
];

// ---------------------------------------------------------------------------
// Kaiyukan same-day block, added 8 Nov 2026 (task-jtk-20261108-R03)
//
// No new URLs: every slot reuses an existing constant. The Kaiyukan admission is
// in the 6.5% band; these are the things booked around it — the Osaka pass at 5%,
// a food tour and a Universal City hotel search at 6.5%, the eSIM at 20%.
// ---------------------------------------------------------------------------

export const kaiyukanSameDayPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.osakaPass,
    why: "Kaiyukan is not on the pass, so the pass belongs to the other day of the trip: Osaka Castle, the Umeda Sky Building and the river cruises, with unlimited Osaka Metro rides on top.",
  },
  {
    label: dotonboriDaytimeFoodTour.title,
    ctaLabel: "Check the food tour →",
    url: dotonboriDaytimeFoodTour.url,
    why: "Listed at 11:00 to 14:00, so it fits before a late-afternoon aquarium slot, which is the half of the day the price calendar steers you towards on its busiest dates.",
  },
  {
    label: "Hotels near Universal Studios Japan (Universal City)",
    ctaLabel: "Check Universal City hotels on Klook →",
    url: usjStayAreas[0].url,
    why: "The Captain Line shuttle boat crosses from Universal City Port to the aquarium's door, so a Universal City room puts the park and Kaiyukan either side of one short crossing.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The date-and-time e-ticket and the price calendar both live on your phone, so data from the airport onwards keeps the voucher and the route to Osakako on hand.",
  },
];

// ---------------------------------------------------------------------------
// Hiroshima 2 day itinerary, added 8 Nov 2026 (task-jtk-20261108-01).
//
// Two new tour ids and one new hotel search; everything else on the page reuses the
// Hiroshima constants above. Each listing was confirmed live in its en-US form through
// the www.klook.com search index on 8 Nov 2026 (the /activity/ pages answer automated
// reads with HTTP 403): 2084 "Hiroshima and Miyajima Private Day Tour", 118461
// "Hiroshima / Miyajima Full-day Private Tour" (8 hours, hotel pick-up, guides in
// Chinese, English or Japanese), and destination p50001702 "Best hotels near Miyajima
// Itsukushima Shrine". No price appears on the page.
// ---------------------------------------------------------------------------

/** The private walking day: the Peace Park, the ferry and the shrine with one guide. */
export const hiroshimaMiyajimaPrivateWalkingDay: KlookTour = {
  title: "Hiroshima & Miyajima private day tour (walking)",
  desc: "A private guided day on foot and by public transport: the Peace Memorial Park, the ferry across and Itsukushima Shrine, with the listing itself pointing you to the tide table",
  url: klookLink("https://www.klook.com/en-US/activity/2084-hiroshima-miyajima-private-day-tour-hiroshima/"),
};

/** The 8-hour private day with hotel pick-up, for a group that wants a driver. */
export const hiroshimaMiyajimaFullDayPrivateTour: KlookTour = {
  title: "Hiroshima / Miyajima full-day private tour",
  desc: "Listed at 8 hours with hotel pick-up, a guide in English, Chinese or Japanese, and a route you can adjust",
  url: klookLink("https://www.klook.com/en-US/activity/118461-hiroshima-miyajima-full-day-private-tour/"),
};

/** The three places to sleep for two days: the station, the Peace Park end, or the island. */
export const hiroshimaTwoDayStayAreas: KlookStayArea[] = [
  {
    area: "Hiroshima Station",
    why: "The shinkansen arrives and leaves here, and the JR local to Miyajimaguchi starts here too, so both the arrival on Day 1 and the onward train on Day 2 are a short walk.",
    url: hiroshimaStayAreas[0].url,
  },
  {
    area: "Peace Memorial Park",
    why: "Day 1 is on foot from the door, the museum opens at 7:30, and the World Heritage Sea Route boat to Miyajima leaves from the pier beside the park on Day 2.",
    url: hiroshimaStayAreas[1].url,
  },
  {
    area: "Miyajima (one night on the island)",
    why: "The shrine opens at 6:30 and the day visitors arrive later by ferry, so a night on the island buys the early and late hours.",
    url: klookLink("https://www.klook.com/en-US/destination/p50001702-miyajima-itsukushima-shrine/3-hotel/"),
  },
];

/** Before-you-go block: the train, the pass, the Miyajima day, the island night, data. */
export const hiroshimaTwoDayTripPrep: KlookTripPrepItem[] = [
  {
    label: shinkansenTokyoHiroshima.title,
    ctaLabel: "Check Tokyo → Hiroshima shinkansen →",
    url: shinkansenTokyoHiroshima.url,
    why: "A morning arrival is what makes Day 1 a full day in the Peace Park, and a reserved seat is the part to fix first in the busy periods.",
  },
  {
    label: jrKansaiHiroshimaAreaPass.title,
    ctaLabel: "Check the Kansai-Hiroshima pass →",
    url: jrKansaiHiroshimaAreaPass.url,
    why: "Coming from Osaka or Kyoto, this pass covers reserved Sanyo Shinkansen seats to Hiroshima, the local train to Miyajimaguchi and the JR ferry. The ¥100 visitor tax is still paid on top.",
  },
  {
    label: hiroshimaMiyajimaPrivateDayTour.title,
    ctaLabel: "Check the private Miyajima day →",
    url: hiroshimaMiyajimaPrivateDayTour.url,
    why: "Day 2 with someone else handling the ferry, the tide and the order of the island. Pick-up is listed for hotels near JR Hiroshima Station.",
  },
  {
    label: "Hotels near Itsukushima Shrine on Miyajima",
    ctaLabel: "Check Miyajima hotels on Klook →",
    url: hiroshimaTwoDayStayAreas[2].url,
    why: "The island has far fewer rooms than the city, so if you want the night on Miyajima, book it first.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The ferry timetable, the tide table and the museum's web ticket all live on your phone on these two days.",
  },
];

// ---------------------------------------------------------------------------
// Kyoto maiko dinner and Kyoto cooking class entry pages, added 8 Nov 2026
// (task jtk-20261108-02). Klook answers automated reads of its product pages
// with HTTP 403, so each listing below was confirmed as an en-US URL in the
// www.klook.com search index on that date. Tours and experiences 6.5%, the
// Kyoto subway and bus ticket 5%, eSIM 20%. No prices.
// ---------------------------------------------------------------------------

/** AN KYOTO: the short format, a lunch or dinner course with a maiko at the table. */
export const kyotoMaikoLunchDinnerAnKyoto: KlookTour = {
  title: "Lunch and Dinner with Maiko in Kyoto (AN KYOTO)",
  desc: "A 1.5-hour seated lunch or dinner course with a maiko at the table, with time to photograph her up close",
  url: klookLink("https://www.klook.com/en-US/activity/45256-lunch-dinner-maiko/"),
};

/** Gion walk, then a Kyoto-cuisine dinner with maiko games, for adults (15+). */
export const kyotoMaikoDinnerGionRestaurant: KlookTour = {
  title: "Dinner with Maiko in a traditional Kyoto style restaurant",
  desc: "A 3.5-hour evening that starts with a guided Gion walk and ends at a Kyoto-cuisine dinner with maiko dance and ozashiki games",
  url: klookLink("https://www.klook.com/en-US/activity/108519-dinner-with-maiko-in-a-traditional-kyoto-style-restaurant-tour/"),
};

/** Yasaka-dori Enraku, a few minutes from Gion: games and a dance during the meal. */
export const kyotoMaikoInteractiveDinner: KlookTour = {
  title: "Interactive Dinner with Maiko in Kyoto",
  desc: "Dinner at Yasaka-dori Enraku near Gion, with a maiko dance during the meal and ozashiki-asobi games at the table",
  url: klookLink("https://www.klook.com/en-US/activity/21268-interactive-dinner-maiko-kyoto/"),
};

/** The walk-plus-dinner format with pick-up and a 24-hour free cancellation. */
export const kyotoGeishaDinnerGionWalk: KlookTour = {
  title: "Kyoto: Geisha Dinner & Gion Cultural Walk",
  desc: "A 3-hour evening of a Gion walk and a dinner with a geiko or maiko, with dance, music and time to talk",
  url: klookLink("https://www.klook.com/en-US/activity/185037-kyoto-geisha-dinner-gion-cultural-walk/"),
};

/** Walk and a 50-minute geisha meeting, with dining as an option. */
export const kyotoGionWalkGeishaPerformance: KlookTour = {
  title: "Kyoto: Gion Cultural Walk & Geisha Performance",
  desc: "A 3 to 3.5-hour evening: a 1.5 to 2-hour walk of the geisha district and a 50-minute meeting with a geisha, with a dining option",
  url: klookLink("https://www.klook.com/en-US/activity/170028-kyoto-gion-cultural-walk-geisha-performance/"),
};

/** Private, all-day: kimono and sightseeing first, then a tatami dinner with maiko dance. */
export const kyotoKimonoMaikoDinnerPrivate: KlookTour = {
  title: "[Private Tour] Kimono Experience and Maiko Dinner Show in Kyoto",
  desc: "A 7-hour private day: kimono and sightseeing in Kyoto, then a tatami-room dinner where maiko perform Kyomai, for two or more",
  url: klookLink("https://www.klook.com/en-US/activity/76247-kyoto-maiko-geisha-dinner-show/"),
};

/** The daytime alternative: a maiko show with a set lunch. */
export const kyotoMaikoShowLunch: KlookTour = {
  title: "Kyoto Maiko Show Viewing Tour with Lunch",
  desc: "A 1 hour 40 minute daytime format: a maiko show and a Japanese set lunch, with an English-speaking guide",
  url: klookLink("https://www.klook.com/en-US/activity/94997-1-hour-maiko-show-viewing-qr-code-direct-entry-admission-lunch-kyoto/"),
};

/** Kyoto Ramen & Gyoza: 2.5 hours, lunch included, ages 6+. */
export const kyotoRamenGyozaClass: KlookTour = {
  title: "Kyoto Ramen & Gyoza Cooking Class with Professional Chefs",
  desc: "A 2.5-hour English-guided class making ramen, gyoza and fried rice, eaten as lunch afterwards",
  url: klookLink("https://www.klook.com/en-US/activity/149660-kyoto-ramen-gyoza-cooking-class-with-professional-chefs/"),
};

/** Ramen noodles by hand near Kyoto-Kawaramachi; vegetarian and vegan tasting on request. */
export const kyotoRamenNoodleMaking: KlookTour = {
  title: "Kyoto Ramen Noodle Making",
  desc: "Hand-made ramen noodles in 1 to 1.5 hours, about 5 minutes on foot from Kyoto-Kawaramachi Station, with vegetarian and vegan tasting options",
  url: klookLink("https://www.klook.com/en-US/activity/114661-kyoto-ramen-noodle-making/"),
};

/** Wagashi by Fushimi Inari, six to a class, in English. */
export const kyotoFushimiInariWagashiClass: KlookTour = {
  title: "Fushimiinari Wagashi (Japanese sweets) Cooking Class in Kyoto",
  desc: "A 2-hour class of up to six by Fushimi Inari: three kinds of Japanese sweets, then matcha, taught in English",
  url: klookLink("https://www.klook.com/en-US/activity/111279-fushimiinari-wagashi-japanese-sweets-cooking-class-in-kyoto/"),
};

/** The 1-hour sushi class: the chef preps rice and fish, you shape eleven pieces. */
export const kyotoSushiOneHourClass: KlookTour = {
  title: "1 Hour Join In Kyoto Cooking Class by Sushi Making",
  desc: "A 1-hour group class shaping six nigiri, three temari, one gunkan and one inari, with tea and miso soup",
  url: klookLink("https://www.klook.com/en-US/activity/92420-1-hour-join-kyoto-cooking-class-sushi-making/"),
};

/** Kawaramachi sushi, 90 minutes, the clearest child rules. */
export const kyotoSushiKawaramachiClass: KlookTour = {
  title: "Sushi making in Kawaramachi, Kyoto",
  desc: "A 90-minute sushi class in Kawaramachi where you eat what you make; children 12 and under join with an adult",
  url: klookLink("https://www.klook.com/en-US/activity/148642-let-s-experience-making-sushi-in-kawaramachi-popular-place-in-kyoto/"),
};

/** Roujiya's Kyoto-style sushi: 2.5 hours, rice washing to plating, plus dashi. */
export const kyotoStyleSushiRoujiya: KlookTour = {
  title: "Kyoto Style Sushi Making Class (Roujiya)",
  desc: "A 2.5-hour English-guided class in Nakagyo covering sushi from rice washing to plating, plus dashi",
  url: klookLink("https://www.klook.com/en-US/activity/103266-2-half-hr-join-kyoto-class-kyoto-style-sushi-making/"),
};

/** The morning bento course: 4–5 dishes, 72-hour free cancellation. */
export const kyotoBentoCookingClass: KlookTour = {
  title: "Kyoto Bento Cooking Class",
  desc: "A morning class preparing 4 to 5 dishes for a bento lunch, with dashi and seasonings explained, eaten together afterwards",
  url: klookLink("https://www.klook.com/en-US/activity/792-morning-bento-cooking-course-kyoto/"),
};

/** Klook's own list of Kyoto cooking classes, for dates the picks above do not cover. */
export const kyotoCookingClassesListUrl = klookLink(
  "https://www.klook.com/en-US/destination/c30-kyoto/1042-cooking-classes/",
);

/** Kyoto City Subway and Bus 1-day ticket (5%). Voucher collected at KIX Terminal 1. */
export const kyotoSubwayBusTicket: KlookTour = {
  title: "Kyoto City Subway and Bus Ticket (1 day)",
  desc: "Unlimited Kyoto City Bus and subway rides for one day; the voucher is collected at the Kansai Airport Terminal 1 desk",
  url: klookLink("https://www.klook.com/en-US/activity/118071-kyoto-city-subway-and-bus-ticket/"),
};

/** Same-day bookings for a maiko dinner evening. */
export const kyotoMaikoDinnerTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.kyotoHighlightTour,
    why: "A maiko dinner fills an evening, and this coach day covers Kinkaku-ji, Fushimi Inari and Arashiyama, so the two make a full Kyoto day between them. Check the tour's return time against your dinner.",
  },
  {
    label: kyotoSubwayBusTicket.title,
    ctaLabel: "Check the subway & bus ticket →",
    url: kyotoSubwayBusTicket.url,
    why: "Gion is on the city buses and a short walk from the Tozai line, so one day ticket covers the sightseeing and the ride to dinner. Collect it at Kansai Airport when you land.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Meeting points such as the Izumo no Okuni statue by Gion-Shijo are easy to miss after dark, and late arrivals are not refunded.",
  },
];

/** Same-day bookings around a Kyoto cooking class. */
export const kyotoCookingClassTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.kyotoHighlightTour,
    why: "Most classes run 1 to 3 hours, so a class fits on the day before or after this coach day, which covers Kinkaku-ji, Fushimi Inari and Arashiyama for you.",
  },
  {
    label: kyotoSubwayBusTicket.title,
    ctaLabel: "Check the subway & bus ticket →",
    url: kyotoSubwayBusTicket.url,
    why: "Kawaramachi, Nakagyo and Fushimi Inari classes are spread across the city, and one day ticket covers the bus and subway legs between them. Collect it at Kansai Airport.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Several classes give a street address rather than a station exit, so a map on your phone is how you find the door on time.",
  },
];

// ---------------------------------------------------------------------------
// "Book for the same day" blocks for five 2% ticket pages, added 8 Nov 2026:
// sanrio-puroland-tickets, osaka-castle-tickets, tokyo-joypolis-tickets,
// fuji-q-highland-tickets and sumo-tokyo-tickets.
//
// Each page's headline Klook product is a park or venue admission, which books
// in the 2% band. These lists send the same reader to the 6.5% tours and hotels
// and the 5% passes around that day. The page ticket CTAs are untouched.
//
// No new URLs: every entry reads a constant or a stay-area id already declared
// above, each confirmed through the www.klook.com search index when it was first
// added. No price appears, for the usual reason.
// ---------------------------------------------------------------------------

/** Sanrio Puroland — a 3-to-5-hour indoor day at Tama Center, reached from Shinjuku. */
export const sanrioPurolandTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels around Shinjuku",
    ctaLabel: "Check Shinjuku hotels on Klook →",
    url: tokyoStayAreas[0].url,
    why: "The Keio and Odakyu lines both start at Shinjuku and both run to Tama Center, so a Shinjuku base puts the Puroland train at your own station.",
  },
  {
    ...tripPrepProducts.shibuyaFoodTour,
    why: "A Day Passport visit runs 3 to 5 hours by the listing's own estimate, which leaves the other half of the day free for a guided half day in central Tokyo.",
  },
  {
    label: tokyoBaySunsetCruise.title,
    ctaLabel: "Check the bay sunset cruise →",
    url: tokyoBaySunsetCruise.url,
    why: "An evening sailing past Rainbow Bridge and Tokyo Tower, timed for the hour the lights come on: the after-dark half of a morning spent at Puroland.",
  },
  {
    ...tripPrepProducts.naritaLimousine,
    why: "The airport coach with hold luggage to central Tokyo stops, for the arrival day before a park day; check the stop list for your hotel before you book.",
  },
];

/** Osaka Castle — an admission that takes about half a day, between Umeda and Namba. */
export const osakaCastleTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelOsakaUmeda,
    why: "Umeda is the northern hub of the Midosuji Line and joined to Osaka Station, so the castle, the Umeda deck and the trains out of the city are all a short ride from the door.",
  },
  {
    label: "Hotels around Namba",
    ctaLabel: "Check Namba hotels on Klook →",
    url: osakaStayAreas[1].url,
    why: "The southern half of the same day: Dotonbori and Kuromon Market are on foot from Namba, and the Nankai line to Kansai Airport starts there.",
  },
  {
    label: dotonboriCityCruise.title,
    ctaLabel: "Check the Dotonbori cruise →",
    url: dotonboriCityCruise.url,
    why: "A 20-minute boat from Tazaemonbashi Pier past the Glico sign: the evening end of a day that starts at the castle.",
  },
  {
    label: osakaNaniWonderNightBusTour.title,
    ctaLabel: "Check the night bus tour →",
    url: osakaNaniWonderNightBusTour.url,
    why: "An open-top night run from the Osaka Station bus terminal down Midosuji to Shinsekai, for the hours after the keep closes.",
  },
  {
    ...tripPrepProducts.osakaPass,
    why: "The pass covers the castle keep among its city admissions, plus the Metro rides between them, so it is worth pricing against the single ticket before you buy either.",
  },
];

/** Tokyo Joypolis — 2 to 4 hours indoors in Odaiba, with an evening on the water. */
export const tokyoJoypolisTripPrep: KlookTripPrepItem[] = [
  {
    label: tokyoBaySunsetCruise.title,
    ctaLabel: "Check the bay sunset cruise →",
    url: tokyoBaySunsetCruise.url,
    why: "A sailing timed for sunset past Rainbow Bridge and the Odaiba waterfront, which lines up with an Evening Passport afternoon at Joypolis.",
  },
  {
    label: tokyoBayDinnerCruiseSymphony.title,
    ctaLabel: "Check the Symphony dinner cruise →",
    url: tokyoBayDinnerCruiseSymphony.url,
    why: "The dinner version of the same evening: a 2 hour 30 minute full-course cruise from Hinode Pier on the Rainbow Bridge loop.",
  },
  {
    label: skyhopHopOnHopOffBus.title,
    ctaLabel: "Check the open-top bus ticket →",
    url: skyhopHopOnHopOffBus.url,
    why: "Its courses include Odaiba as well as Asakusa and Roppongi–Shibuya, so it covers the ride out to the island and the rest of the day around it.",
  },
  {
    ...tripPrepProducts.hotelTokyoStation,
    why: "The limousine buses from both airports and the N'EX from Narita stop here, which makes it the simplest base for an Odaiba day early in the trip.",
  },
];

/** Fuji-Q Highland — a full park day at the foot of Mt. Fuji, mostly reached by highway bus. */
export const fujiQHighlandTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels around Shinjuku",
    ctaLabel: "Check Shinjuku hotels on Klook →",
    url: tokyoStayAreas[0].url,
    why: "The Kawaguchiko highway buses board at Shinjuku, so a Shinjuku base turns an early coach to the park into a walk to the terminal.",
  },
  {
    label: kawaguchikoYamanakakoBusTour.title,
    ctaLabel: "Check the Kawaguchiko bus tour →",
    url: kawaguchikoYamanakakoBusTour.url,
    why: "The lakes side of the same corridor as a guided day from Tokyo, for the travel day either side of the park if the views matter as much as the coasters.",
  },
  {
    ...tripPrepProducts.fujiHakoneTour,
    why: "The other way to see Mt. Fuji from Tokyo in a day, with Hakone on the same coach: the option for travellers in the group who would rather skip the rides.",
  },
  {
    ...tripPrepProducts.naritaLimousine,
    why: "The airport coach with hold luggage to central Tokyo stops, so the arrival day ends at the hotel you will leave from for the park; check the stop list first.",
  },
];

/** Sumo in Tokyo — Ryogoku Kokugikan or a morning practice, on the east side of the city. */
export const sumoTokyoTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels around Ueno / Asakusa",
    ctaLabel: "Check Ueno & Asakusa hotels on Klook →",
    url: tokyoStayAreas[2].url,
    why: "The east side of Tokyo, a short ride from Ryogoku: a nearby base helps when same-day tickets are sold early in the morning and practice tours start before the city is busy.",
  },
  {
    label: tsukijiCultureFoodTour.title,
    ctaLabel: "Check the Tsukiji food tour →",
    url: tsukijiCultureFoodTour.url,
    why: "Ryogoku is on the Toei Oedo Line, which also runs to Tsukiji, so a market walk with a sit-down sushi stop fits the hours after a morning practice.",
  },
  {
    label: asakusaKimonoYae.title,
    ctaLabel: "Check the Asakusa kimono rental →",
    url: asakusaKimonoYae.url,
    why: "A shop by Kaminarimon, across the river from Ryogoku, for the other half of an east-Tokyo day; the listing asks for the outfit back by 17:30.",
  },
  {
    ...tripPrepProducts.subway,
    why: "Ryogoku's subway station is on the Toei Oedo Line, so a 24, 48 or 72-hour Metro and Toei ticket covers the arena trip and the rest of the day.",
  },
];

// ---------------------------------------------------------------------------
// Tokyo 2 day itinerary, added 9 Nov 2026 (task-jtk-20261109-01).
//
// No new Klook listing: every product reuses a constant above. On 9 Nov 2026 the
// www.klook.com search index showed each en-US listing live (the /activity/ pages
// answer automated reads with HTTP 403): 1552 Tokyo Subway Ticket, 5672 Tokyo Amazing
// Sightseeing Bus Day Tour, 102521 Shinjuku food join-in walking tour, 70672 SHIBUYA
// SKY, 25300 teamLab Planets TOKYO and 41352 TOKYO SKYTREE. No price appears on the page.
// ---------------------------------------------------------------------------

/** Three bases for two nights: the west side, the centre, the east side. */
export const tokyoTwoDayStayAreas: KlookStayArea[] = [
  {
    area: "Shinjuku or Shibuya",
    why: "Day 1 starts and ends here, and the Fukutoshin Line joins Shibuya, Meiji-jingumae and Shinjuku-sanchome, so the whole west-side day runs on one subway line.",
    url: tokyoStayAreas[0].url,
  },
  {
    area: "Tokyo Station / Ginza",
    why: "Halfway between the two days, with the Marunouchi, Ginza and Hibiya lines and direct trains to both airports. The easiest base if you arrive or leave by shinkansen.",
    url: tokyoStayAreas[1].url,
  },
  {
    area: "Ueno / Asakusa",
    why: "Day 2 starts at the door, the Ginza Line runs from here to Shibuya for Day 1, and the Keisei Skyliner from Narita ends at Keisei-Ueno.",
    url: tokyoStayAreas[2].url,
  },
];

/** Before-you-go block: the pass, the airport leg, two guided slots, a hotel, data. */
export const tokyoTwoDayTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.subway,
    label: "Tokyo Subway Ticket (48 hours)",
    why: "Both days in this plan are routed on Tokyo Metro and Toei lines, so one 48-hour ticket covers every leg except the JR Yamanote Line.",
  },
  {
    ...tripPrepProducts.skyliner,
    why: "Landing at Narita with two days, the Skyliner to Keisei-Ueno puts you on the Day 2 side of the city on arrival.",
  },
  {
    label: tokyoSightseeingBusTour.title,
    ctaLabel: "Check the Tokyo day tour →",
    url: tokyoSightseeingBusTour.url,
    why: "The east side (the Imperial Palace gardens, Asakusa and Skytree) in one guided loop, if you would rather not route Day 2 yourself.",
  },
  {
    label: shinjukuNightFoodWalkingTour.title,
    ctaLabel: "Check the Shinjuku food tour →",
    url: shinjukuNightFoodWalkingTour.url,
    why: "The Day 1 evening with a guide through Omoide Yokocho, Kabukicho and Golden Gai. Listed at three hours.",
  },
  {
    label: "Hotels around Shinjuku Station",
    ctaLabel: "Check Shinjuku hotels on Klook →",
    url: tokyoTwoDayStayAreas[0].url,
    why: "Two nights leave no room for a long ride back each evening, so the hotel is the first thing to fix once the dates are set.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The SHIBUYA SKY QR code, the subway route between stations and a long-layover train time all live on your phone.",
  },
];

// ---------------------------------------------------------------------------
// Tokyo trip cost, added 9 Nov 2026 (task-jtk-20261109-02).
//
// No new Klook listing: every product reuses a constant above (hotel searches from
// whereToStayTokyoAreas, the Tokyo Subway Ticket, the Skyliner, N'EX, the Haneda
// limousine bus, the Tokyo sightseeing bus day tour and the eSIM), each already
// confirmed live in en-US through the www.klook.com search index. No price appears.
// ---------------------------------------------------------------------------

/** The fixed costs a Tokyo trip pays before the first day starts, in booking order. */
export const tokyoTripCostPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels around Tokyo Station / Marunouchi",
    ctaLabel: "Check Tokyo hotel prices on Klook →",
    url: whereToStayTokyoAreas[1].url,
    why: "The room is the largest line in a Tokyo budget and the only one that moves with the date, so price it first, on your own dates.",
  },
  {
    ...tripPrepProducts.subway,
    why: "A 72-hour ticket is ¥2,000, or ¥667 a day, for every Tokyo Metro and Toei line. It is the cheapest way to fix the transport line in advance.",
  },
  {
    ...tripPrepProducts.skyliner,
    why: "Landing at Narita, the airport leg is a fixed cost you can pay before you fly: ¥2,580 one way on Keisei's own fare table.",
  },
  {
    ...tripPrepProducts.hanedaLimousine,
    why: "From Haneda, the limousine bus to Tokyo Station or Shinjuku is a fixed fare and drops you at the hotel side of the city.",
  },
  {
    label: tokyoSightseeingBusTour.title,
    ctaLabel: "Check the Tokyo day tour →",
    url: tokyoSightseeingBusTour.url,
    why: "One guided day around the Imperial Palace gardens, Asakusa and Skytree, paid in advance, so one day of the budget is already fixed.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Data is the one line that costs the same at every budget level, and it is cheaper bought before you land than at an airport counter.",
  },
];

/**
 * The same list above the first H2 (12 Nov 2026, task-jtk-20261112-P01): the room, the
 * subway pass, the airport leg and data, without the guided day.
 */
export const tokyoTripCostTopPrep: KlookTripPrepItem[] = tokyoTripCostPrep.filter(
  (item) => item.url !== tokyoSightseeingBusTour.url,
);

// ---------------------------------------------------------------------------
// Zao snow monsters tour, added 9 Nov 2026 (task-jtk-20261109-02).
//
// Klook answers automated reads of /activity/ pages with HTTP 403, so each listing
// below was confirmed as a live en-US page through the www.klook.com search index on
// 9 Nov 2026:
//   178500  [Tohoku One-Day Tour] Ginzan Onsen & Zao Snow Monsters & Special Lunch,
//           from Sendai. The listing states that if the ropeway is suspended, the plan
//           changes to a footbath at Zao Onsen and the ¥3,000 ropeway fee is refunded,
//           and that the Zao Chuo Ropeway is used if the Zao Ropeway cannot be booked.
//   184587  Zao Snow Monster Trees Illumination Tour from Sendai Station (6 hours,
//           round-trip transfer, Nightcruiser snow vehicle; no English-speaking guide).
//   167311  Ginzan Onsen & Zao Snow Monsters & Zao Fox Village 2-Day Tour (stay at an
//           onsen hotel, breakfast and dinner included).
//   227766  2-Day Authentic Japan Tour from Tokyo: Ginzan Onsen, Zao Snow Monsters,
//           Yamadera & Fox Village (operator LION TRAVEL JAPAN).
//   p60271215-mount-zao  the Mount Zao destination page.
// Considered and dropped: 128152 and 128385 (Sendai day tours) appeared in the index
// only as en-SG / en-HK / en-AU / en-IN pages, not en-US; 131427 only without a locale.
// All tours are the 6.5% band. No price appears on the page.
// ---------------------------------------------------------------------------

export const zaoGinzanDayTourFromSendai: KlookTour = {
  title: "Ginzan Onsen & Zao Snow Monsters day tour from Sendai",
  desc: "A one-day coach tour from Sendai: the Zao Ropeway to the snow monsters, then the old hot-spring street of Ginzan Onsen, with a lunch named in the title",
  url: klookLink("https://www.klook.com/en-US/activity/178500-ginzan-onsen-zao-ropeway-snow-monsters-day-tour-from-sendai/"),
};

export const zaoSnowMonsterIlluminationTour: KlookTour = {
  title: "Zao snow monster illumination tour from Sendai Station",
  desc: "An evening trip from Sendai Station with the round-trip transfer included, riding the heated Nightcruiser snow vehicle among the lit-up snow monsters. Listed at 6 hours",
  url: klookLink("https://www.klook.com/en-US/activity/184587-zao-snow-monster-nightcruiser-tour-with-private-transfer-from-sendai/"),
};

export const zaoGinzanTwoDayOnsenTour: KlookTour = {
  title: "Ginzan Onsen, Zao Snow Monsters & Fox Village 2-day tour (onsen hotel)",
  desc: "Two days with a night at an onsen hotel, breakfast and dinner included: the snow monsters, Ginzan Onsen and the Zao Fox Village",
  url: klookLink("https://www.klook.com/en-US/activity/167311-2d1n-ginzan-onsen-zao-snow-monsters-miyagi-zao-fox-village-tour/"),
};

export const zaoTwoDayTourFromTokyo: KlookTour = {
  title: "2-day tour from Tokyo: Ginzan Onsen, Zao Snow Monsters, Yamadera & Fox Village",
  desc: "A two-day tour departing from Tokyo, adding the Yamadera mountain temple and the Zao Fox Village to the snow monsters and Ginzan Onsen",
  url: klookLink("https://www.klook.com/en-US/activity/227766-tohoku-2-day-ginzan-onsen-zao-ropeway-tour/"),
};

/** Klook's Mount Zao destination page: every Zao tour and ticket on one list. */
export const mountZaoDestinationUrl = klookLink("https://www.klook.com/en-US/destination/p60271215-mount-zao/");

/** Before-you-go block for the Zao page: the tour, the pass for doing it yourself, a Tokyo bed, data. */
export const zaoSnowMonstersTripPrep: KlookTripPrepItem[] = [
  {
    label: zaoTwoDayTourFromTokyo.title,
    ctaLabel: "Check the 2-day tour from Tokyo →",
    url: zaoTwoDayTourFromTokyo.url,
    why: "From Tokyo, a day trip leaves too little time at the ropeway, so the two-day tour with Ginzan Onsen is the version that fits.",
  },
  {
    label: jrEastPass.title,
    ctaLabel: "Check the JR EAST PASS →",
    url: jrEastPass.url,
    why: "Doing it yourself, the Yamagata Shinkansen from Tokyo and the Tohoku Shinkansen to Sendai are both JR East lines.",
  },
  {
    label: "Hotels around Tokyo Station / Marunouchi",
    ctaLabel: "Check Tokyo Station hotels on Klook →",
    url: whereToStayTokyoAreas[1].url,
    why: "Both shinkansen to Yamagata and Sendai leave from Tokyo Station, so the night before an early train is easiest here.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The ropeway runs or stops on the day's wind, and the tour operator's messages, the ropeway status page and the bus times are all on your phone.",
  },
];

/**
 * "Before you land" block for tokyo-airport-limousine-bus (task-jtk-20261109-03).
 *
 * No new Klook id. The two buses are `naritaLimousineBus` (2274) and
 * `hanedaLimousineBus` (150434), re-confirmed as en-US listings through the
 * www.klook.com search index on 9 Nov 2026; the subway ticket, the hotel search
 * (`whereToStayTokyoAreas[0]`, the Shinjuku search on where-to-stay-in-tokyo) and
 * the eSIM read out of constants declared above.
 */
export const limousineBusTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.naritaLimousine,
    why: "A seat on a named departure, bought in English before you fly and boarded with a QR code instead of a queue at the arrivals counter.",
  },
  {
    ...tripPrepProducts.hanedaLimousine,
    why: "The same operator from Haneda's three terminals, for Shinjuku, Tokyo Station or the Disney resort without a change.",
  },
  {
    ...tripPrepProducts.subway,
    why: "The bus gets you to the hotel; after that most of Tokyo is on the Metro and Toei lines, which a 24, 48 or 72-hour ticket covers.",
  },
  {
    label: `Hotels around ${whereToStayTokyoAreas[0].area}`,
    ctaLabel: "Check Tokyo hotels on Klook →",
    url: whereToStayTokyoAreas[0].url,
    why: "The Shinjuku line stops at individual hotels, so a hotel on the route is the one that puts the bus at your door.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Departure times, your stop and the QR code are all on your phone, and data that works at the kerb is the one thing the bus cannot give you.",
  },
];

// ---------------------------------------------------------------------------
// Ginzan Onsen tour, added 10 Nov 2026 (task-jtk-20261110-02).
//
// Confirmed as live en-US listings through the www.klook.com search index on
// 10 Nov 2026:
//   80347   From Sendai: Ginzan Onsen & Zao Frost-Covered Trees & Fox Village Tour
//           (one day; the listing says the Ginzan shuttle bus and the Zao Ropeway
//           are paid on the day, and the Chuo Ropeway replaces the Zao Ropeway
//           when it is unavailable).
//   127781  One-day trip to Tateishiji (Risshakuji / Yamadera) Temple & Ginzan Hot
//           Spring from Sendai (8 h 50 min, shared, minimum two people).
//   131427  2-Day Ginzan Onsen Tour: Yamagata Winery, Ginzan Onsen, Fox Village and
//           Zao Snow Monsters, hot-spring hotel with breakfast and dinner, from Tokyo.
//   131990  Ginzan Onsen, Zao Juhyo Ropeway, Nikko Toshogu and Ouchijuku 2-Day Tour
//           from Shinjuku.
//   hotels/detail/1263365  Ginzan Onsen Ryokan Matsumoto (a Klook hotel listing in
//           the onsen street, the 6.5% hotel slot).
//   p50303618-ginzan-onsen  the Ginzan Onsen destination page.
// Reused: 178500, 167311 and 227766 from the Zao block above, and jrEastPass.
// Dropped: 128152 (no en-US page in the index), 161668 (en-GB only), 184850 (no
// locale only). All tours and the ryokan are 6.5%. No price appears on the page.
// ---------------------------------------------------------------------------

export const ginzanZaoFoxVillageTourFromSendai: KlookTour = {
  title: "Ginzan Onsen, Zao frost-covered trees & Fox Village tour from Sendai",
  desc: "A one-day coach tour from Sendai with the Zao Ropeway, the Zao Fox Village and time in Ginzan Onsen. The listing says the Ginzan shuttle and the ropeway are paid on the day",
  url: klookLink("https://www.klook.com/en-US/activity/80347-2-day-ginzan-onsen-zaos-frost-covered-trees-bus-tour/"),
};

export const yamaderaGinzanDayTourFromSendai: KlookTour = {
  title: "Yamadera (Risshakuji) & Ginzan Onsen day trip from Sendai",
  desc: "The mountain temple of Yamadera and the Ginzan Onsen street in one shared day from Sendai, listed at 8 hours 50 minutes, with lunch on your own",
  url: klookLink("https://www.klook.com/en-US/activity/127781-rissyakuji-temple-ginzan-onsen-one-day-tour-from-sendai/"),
};

export const ginzanWineryTwoDayTourFromTokyo: KlookTour = {
  title: "2-day Ginzan Onsen tour from Tokyo with Zao, a winery & Fox Village",
  desc: "Two days from Tokyo with a night at a hot-spring hotel, breakfast and dinner included: Ginzan Onsen, the Zao snow monsters, a Yamagata winery and the Fox Village",
  url: klookLink("https://www.klook.com/en-US/activity/131427-yamagata-2-day-tour-winery-ginzan-onsen-tokyo-departure/"),
};

export const ginzanNikkoTwoDayTourFromShinjuku: KlookTour = {
  title: "Ginzan Onsen, Zao, Nikko & Ouchijuku 2-day tour from Shinjuku",
  desc: "Two days from Shinjuku that pair Ginzan Onsen and the Zao ropeway with Nikko Toshogu and the thatched post town of Ouchijuku",
  url: klookLink("https://www.klook.com/en-US/activity/131990-2-day-tour-ginzan-onsen-nikko-toshogu-temple-from-shinjuku/"),
};

/** A ryokan in the onsen street itself — the way to be there after the day visitors leave. */
export const ginzanOnsenRyokanMatsumoto = {
  title: "Ginzan Onsen Ryokan Matsumoto",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/1263365-ginzan-onsen-ryokan-matsumoto/"),
};

/** Klook's Ginzan Onsen destination page: every Ginzan tour on one list. */
export const ginzanOnsenDestinationUrl = klookLink("https://www.klook.com/en-US/destination/p50303618-ginzan-onsen/");

export const ginzanOnsenTripPrep: KlookTripPrepItem[] = [
  {
    label: "A ryokan in Ginzan Onsen (Ryokan Matsumoto)",
    ctaLabel: "Check the ryokan on Klook →",
    url: ginzanOnsenRyokanMatsumoto.url,
    why: "A winter night in Ginzan itself is the one booking that keeps you under the gas lamps after the last shuttle back at 19:30, without the evening queue for a time slot.",
  },
  {
    label: jrEastPass.title,
    ctaLabel: "Check the JR EAST PASS →",
    url: jrEastPass.url,
    why: "Going on your own, the Yamagata Shinkansen to Oishida is a JR East line; the bus from Oishida to the onsen is not covered.",
  },
  {
    label: "Hotels around Tokyo Station / Marunouchi",
    ctaLabel: "Check Tokyo Station hotels on Klook →",
    url: whereToStayTokyoAreas[1].url,
    why: "The Yamagata Shinkansen leaves from Tokyo Station, so the night before an early train is easiest here.",
  },
  {
    ...tripPrepProducts.esim,
    why: "The winter shuttle runs on timed tickets with a priority return slot printed on the ticket, and the booking, the bus status and the train times are all on your phone.",
  },
];

// ---------------------------------------------------------------------------
// Sapporo ski day trip, added 10 Nov 2026 (task-jtk-20261110-02).
//
// Confirmed as live en-US listings through the www.klook.com search index on
// 10 Nov 2026:
//   127051  Sapporo Teine Ski Resort all-inclusive ski/snowboard day trip from
//           Sapporo (ski wear, gear, lift, transfer; the most-reviewed Teine day).
//   127286  Teine night skiing tour from Sapporo (rental and lift ticket included).
//   81509   Sapporo Teine all-inclusive private ski lesson with transfer.
//   94587   Sapporo Teine private ski lessons (Teine, Moiwa or Bankei; rental is
//           arranged separately, accident insurance required before the lesson).
//   103774  Kiroro 6-hour lift pass & round-trip shuttle from Sapporo.
//   16909   Shared one-way bus between Sapporo and Sapporo Teine.
//   p50239480-sapporo-teine-ski-resort  the Teine destination page.
//   experiences/list/sapporo-ski-snowboard/c133938-cate18  the Sapporo ski list.
//   133006  Sapporo Teine one-day ski/snowboard tour with a Chinese-speaking
//           instructor, shuttle and equipment (en-US page found on a second search).
// Dropped: 98771 Rusutsu lift + bus (en-AU only), 187374 (en-PH only).
// Reused: otaruAsarigawaSkiDayTour,
// sapporoKokusaiSkiOtaruAquariumDayTour, nisekoHirafuLiftPassBusTour,
// rusutsuResortShuttleBus and the Sapporo Station hotel search.
// ---------------------------------------------------------------------------

export const teineAllInclusiveSkiDayTrip: KlookTour = {
  title: "Sapporo Teine all-inclusive ski or snowboard day trip",
  desc: "The hands-free Teine day from Sapporo: transfer, lift ticket, ski or board, boots and ski wear in one booking, sold as beginner-friendly",
  url: klookLink("https://www.klook.com/en-US/activity/127051-hokkaido-sapporo-teine-ski-resort-all-inclusive-one-day-tour/"),
};

export const teineNightSkiingTour: KlookTour = {
  title: "Sapporo Teine night skiing tour from Sapporo",
  desc: "An evening at Teine with the transfer, rental and lift ticket included, for a day spent in the city first",
  url: klookLink("https://www.klook.com/en-US/activity/127286-hokkaido-sapporo-teine-ski-resort-night-skiing-day-tour/"),
};

export const teinePrivateSkiDayWithTransfer: KlookTour = {
  title: "Sapporo Teine private ski day with transfer",
  desc: "A private instructor for the day at Teine with the transfer from Sapporo, for a first day on skis or a family",
  url: klookLink("https://www.klook.com/en-US/activity/81509-1-day-private-skiing-sapporo/"),
};

export const teinePrivateSkiLessons: KlookTour = {
  title: "Sapporo Teine private ski lessons (Chinese or English)",
  desc: "A private lesson with a registered ski school at Teine, Mt Moiwa or Bankei. You get there yourself and arrange rental separately",
  url: klookLink("https://www.klook.com/en-US/activity/94587-hokkaido-sapporo-teine-private-ski-lessons/"),
};

export const teineChineseLessonDayTour: KlookTour = {
  title: "Sapporo Teine one-day ski tour with a Chinese-speaking instructor",
  desc: "Shuttle, ski equipment, lift ticket and a group lesson in Chinese at Teine, in one booking",
  url: klookLink("https://www.klook.com/en-US/activity/133006-sapporo-teine-ski-one-day-tour-chinese-instruction-shuttle-included/"),
};

export const kiroroLiftPassShuttleFromSapporo: KlookTour = {
  title: "Kiroro 6-hour lift pass & round-trip shuttle from Sapporo",
  desc: "The Kiroro powder day out of Sapporo: the ski bus both ways and a 6-hour lift pass in one booking",
  url: klookLink("https://www.klook.com/en-US/activity/103774-6-hour-join-kiroro-ski-resort-lift-pass-round-trip-shuttle-sapporo-hokkaido/"),
};

export const teineSharedBusTransfer: KlookTour = {
  title: "Shared bus between Sapporo and Sapporo Teine (one way)",
  desc: "A seat on the ski bus only, for a skier with their own gear and lift plan",
  url: klookLink("https://www.klook.com/en-US/activity/16909-shared-one-way-bus-transfer-sapporo-teine-ski-resort/"),
};

/** Klook's Sapporo Teine destination page. */
export const sapporoTeineDestinationUrl = klookLink("https://www.klook.com/en-US/destination/p50239480-sapporo-teine-ski-resort/");

/** Klook's list of every ski and snowboard product out of Sapporo. */
export const sapporoSkiSnowboardListUrl = klookLink("https://www.klook.com/en-US/experiences/list/sapporo-ski-snowboard/c133938-cate18/");

export const sapporoSkiDayTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels around Sapporo Station",
    ctaLabel: "Check Sapporo hotels on Klook →",
    url: japanWinterStayAreas[6].url,
    why: "Every ski tour and bus on this page starts in central Sapporo in the early morning, so a bed near the pick-up is the one that makes a 7:00 or 8:00 departure easy.",
  },
  {
    label: newChitoseSapporoSharedTransfer.title,
    ctaLabel: "Check the airport transfer →",
    url: newChitoseSapporoSharedTransfer.url,
    why: "A booked seat from New Chitose to the city with luggage, bought before you fly rather than at the arrivals hall.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Lifts stop for wind and buses run late in snow; the tour operator's messages and the resort's lift status reach your phone, not a noticeboard.",
  },
];

// ---------------------------------------------------------------------------
// Japan 3 week itinerary (added 11 Nov 2026, task-jtk-20261111-01).
// ---------------------------------------------------------------------------

/**
 * Takayama hotel search (6.5%). The only new Klook URL for the page: the c9316
 * Takayama destination hotel page was confirmed as a live en-US page through the
 * www.klook.com search index on 11 Nov 2026. Every other entry below reads a URL
 * out of an existing constant, so the destination ids have one source of truth.
 */
export const takayamaHotelsUrl = klookLink("https://www.klook.com/en-US/destination/c9316-takayama/3-hotel/");

/** One hotel search per base on the 21-day route, in the order the route reaches them. */
export const japanThreeWeekStayAreas: KlookStayArea[] = [
  {
    area: "Tokyo Station / Marunouchi (Days 1–5 and Day 20)",
    why: "The Hokuriku Shinkansen to Kanazawa leaves from here on Day 7 and the train back from Hiroshima ends here on Day 20, so the first and last Tokyo nights both start at the station you need.",
    url: tokyoStayAreas[1].url,
  },
  {
    area: "Kanazawa (Days 7–8)",
    why: "The Shirakawa-go buses and the join-in tours on Day 9 leave from Kanazawa Station, so a hotel near the station saves the morning.",
    url: kanazawaHotels.url,
  },
  {
    area: "Takayama (Days 9–10)",
    why: "The Hida limited express towards Nagoya on Day 11 and the Nohi buses to Shirakawa-go both start beside Takayama Station, and the old town is a walk away.",
    url: takayamaHotelsUrl,
  },
  {
    area: "Kyoto Station (Days 11–14)",
    why: "The shinkansen from Nagoya arrives under it on Day 11, and the JR lines to Fushimi Inari and Nara leave from it on Days 12 and 14.",
    url: kyotoStayAreas[0].url,
  },
  {
    area: "Umeda (Days 15–17)",
    why: "Shin-Osaka, where the Day 18 shinkansen to Hiroshima leaves, is a short Midosuji Line ride away, and JR to Universal City starts at Osaka Station next door.",
    url: osakaStayAreas[0].url,
  },
  {
    area: "Hiroshima Station (Days 18–19)",
    why: "The shinkansen arrives and leaves here, and the JR local to Miyajimaguchi for Day 19 starts here too.",
    url: hiroshimaStayAreas[0].url,
  },
];

/** "Book these on the same visit" for the 21-day route: 6.5% hotels and tours, 5% passes, 20% eSIM. */
export const japanThreeWeekTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.hotelTokyoStation,
    why: "The base for the first five nights and the last one, beside the Hokuriku Shinkansen on Day 7 and the train in from Hiroshima on Day 20.",
  },
  {
    label: shirakawagoTakayamaKanazawaDayTour.title,
    ctaLabel: "Check the Kanazawa → Takayama tour →",
    url: shirakawagoTakayamaKanazawaDayTour.url,
    why: "Day 9 as one booking: the listing offers a one-way drop-off in Takayama, so Shirakawa-go and the move to your next hotel happen on the same bus.",
  },
  {
    label: "Hotels in Takayama",
    ctaLabel: "Check Takayama hotels on Klook →",
    url: takayamaHotelsUrl,
    why: "Takayama is a small town with two nights on this route; book it with the rest of the hotels rather than last.",
  },
  {
    label: hakoneFreepass.title,
    ctaLabel: "Check the Hakone Freepass →",
    url: hakoneFreepass.url,
    why: "For the Day 6 night if you choose Hakone over Nikko: the Odakyu side of the trip, which a JR Pass does not cover.",
  },
  {
    ...tripPrepProducts.naritaExpress,
    why: "Day 1 into Tokyo and Day 21 back to Narita on one round-trip ticket.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Twenty-one days of maps, QR tickets and seat reservations across seven bases.",
  },
];

// ---------------------------------------------------------------------------
// Tokyo snow day trip, added 11 Nov 2026 (task-jtk-20261111-02).
//
// Confirmed as live en-US listings through the www.klook.com search index on
// 11 Nov 2026:
//   181777  With Mt. Fuji View: Snow Fun at Fujiten & Oishi Park Sightseeing Tour
//           (11 hours from Tokyo; Oishi Park, then snow play at Fujiten).
//   138801  Mt. Fuji - Fujiyama Snow Ski Resort Yeti Day Trip from Tokyo (11 hours,
//           Tokyo Station and Shinjuku; ski, snowboard, sledding or shuttle-only
//           packages; the listing says it is not cancelled for rain).
//   16298   Fujiyama Snow Resort Yeti Day Trip from Tokyo (beginner lesson & snow
//           fun; transport, rental and instructor, lift ticket not in the beginner
//           package; helmets and goggles not included).
//   166076  Fuji Snow Resort Yeti & Onsen Full-Day Tour (07:30–18:30, ages 3 to
//           under 70, Konohana no Yu hot spring, free cancellation 24 h ahead).
//   101175  Mt. Fuji 2nd Station Yeti Snow Resort Day Ski Trip (lift ticket, gear,
//           group ski lessons only).
//   p50054824-fujiyama-snow-resort-yeti  the Yeti destination page.
// Dropped: 34708 (en-SG only in the index), 129291 (no-locale page only).
// All tours are 6.5%. No Klook price appears on the page.
// ---------------------------------------------------------------------------

export const fujitenSnowFunOishiParkTour: KlookTour = {
  title: "Snow fun at Fujiten & Oishi Park with a Mt. Fuji view",
  desc: "An 11-hour day from Tokyo: the Mt. Fuji view over Lake Kawaguchiko from Oishi Park, then snow play at Fujiten Snow Resort",
  url: klookLink("https://www.klook.com/en-US/activity/181777-with-mt-fuji-view-snow-fun-at-fujiten-oishi-park-sightseeing-tou/"),
};

export const yetiSnowDayTripFromTokyo: KlookTour = {
  title: "Fujiyama Snow Resort Yeti day trip from Tokyo",
  desc: "An 11-hour coach day from Tokyo Station or Shinjuku, sold as a ski, snowboard, sledding or shuttle-only package",
  url: klookLink("https://www.klook.com/en-US/activity/138801-mt-fuji-fujiyama-snow-ski-resort-yeti-day-trip-from-tokyo/"),
};

export const yetiBeginnerLessonSnowFunTour: KlookTour = {
  title: "Yeti beginner lesson & snow fun from Tokyo",
  desc: "Transport, ski or board rental with a jacket and pants, and an instructor for a first day on snow; the beginner package leaves out the lift ticket",
  url: klookLink("https://www.klook.com/en-US/activity/16298-fujiyama-resort-yeti-tour-tokyo/"),
};

export const yetiOnsenFullDayTour: KlookTour = {
  title: "Fuji Snow Resort Yeti & onsen full-day tour",
  desc: "Snow play or skiing at Yeti, then the Konohana no Yu hot spring, 07:30 to 18:30 from Tokyo, for ages 3 to 69",
  url: klookLink("https://www.klook.com/en-US/activity/166076-fujiyama-snow-resort-yeti-ski-snow-play-onsen-one-day-tour/"),
};

export const yetiSkiDayTrip: KlookTour = {
  title: "Mt. Fuji 2nd Station Yeti ski day trip",
  desc: "Lift ticket, ski gear and the coach from Tokyo in one booking, with group ski lessons (no snowboard lessons)",
  url: klookLink("https://www.klook.com/en-US/activity/101175-fujiyama-snow-resort-yeti-skiing-day-tour-tokyo/"),
};

/** Klook's Fujiyama Snow Resort Yeti destination page: every Yeti product on one list. */
export const yetiDestinationUrl = klookLink("https://www.klook.com/en-US/destination/p50054824-fujiyama-snow-resort-yeti/");

/**
 * Tokyo snow day trip — what to book on the same day: a Shinjuku hotel (6.5%,
 * the Yeti coaches and the liner bus leave from Shinjuku), the Haneda bus (5%)
 * and the eSIM (20%). No new URLs.
 */
export const tokyoSnowDayTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels around Shinjuku",
    ctaLabel: "Check Shinjuku hotels on Klook →",
    url: tokyoStayAreas[0].url,
    why: "Snow tours and Yeti's own liner bus leave from Shinjuku in the morning, so a bed near the station is the one that makes an early departure easy with children.",
  },
  {
    ...tripPrepProducts.hanedaLimousine,
    why: "Shinjuku is among the destinations on the Haneda limousine bus listing, so the arrival day ends at the same station the snow coach leaves from.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Mountain roads close for snow, and a delay message from the tour or a change to the resort's hours reaches your phone, not a noticeboard.",
  },
];

// ---------------------------------------------------------------------------
// Osaka go-kart, added 11 Nov 2026 (task-jtk-20261111-02).
//
// Confirmed as live en-US listings through the www.klook.com search index on
// 11 Nov 2026:
//   8590    Osaka Go Karting Experience by Akiba Kart (Japanese licence, SOFA
//           licence or IDP; 4.8 from about 2.3K reviews; free cancellation shown).
//   91213   Osaka Kart by Akiba Kart Shinsekai.
//   119916  Go Kart Experience in Osaka by JAPANKART (1–2 hours, lead car and a
//           second car behind, licence valid in Japan required).
//   163321  Osaka Go Kart Adventure in Costume (Monkey Kart; private group, 1 hour,
//           paper 1949 Geneva IDP, Japanese translation or SOFA licence).
//   152539  Osaka: Electric Go-Kart by Future Kart (EV karts, Bluetooth speakers,
//           free costumes, custom routes on request).
//   experiences/list/osaka-go-karting/c29-cate178  the Osaka go-karting list.
// Dropped: 112246 (Street Kart Osaka; only en-HK, en-GB and no-locale pages in the
// index). Experiences are 6.5%. No Klook price appears on the page.
// ---------------------------------------------------------------------------

export const akibaKartOsakaGoKart: KlookTour = {
  title: "Osaka go karting by Akiba Kart",
  desc: "The most-reviewed Osaka street kart on Klook: a guided drive in costume past Dotonbori, Namba and Osaka Castle, on a Japanese licence, SOFA licence or IDP",
  url: klookLink("https://www.klook.com/en-US/activity/8590-osaka-go-karting-experience-akiba-kart-nipponbashi/"),
};

export const akibaKartShinsekaiGoKart: KlookTour = {
  title: "Osaka kart by Akiba Kart Shinsekai",
  desc: "The Shinsekai shop's own listing, for starting the drive at the Tsutenkaku end of the city",
  url: klookLink("https://www.klook.com/en-US/activity/91213-osaka-kart-akiba-kart-shinsekai/"),
};

export const japanKartOsakaGoKart: KlookTour = {
  title: "Go kart experience in Osaka by JAPANKART",
  desc: "A 1 to 2 hour guided drive through central Osaka with a lead car in front and a second car behind; a licence valid in Japan is required",
  url: klookLink("https://www.klook.com/en-US/activity/119916-go-kart-experience-in-osaka-by-japankart/"),
};

export const monkeyKartOsakaCostumeTour: KlookTour = {
  title: "Osaka go kart adventure in costume (private group)",
  desc: "A one-hour private-group drive past Dotonbori, Shinsaibashi and Tsutenkaku, with costumes as an add-on",
  url: klookLink("https://www.klook.com/en-US/activity/163321-osaka-go-kart-adventure-drive-past-famous-landmarks-in-costume/"),
};

export const futureKartOsakaElectricGoKart: KlookTour = {
  title: "Osaka electric go-kart by Future Kart",
  desc: "EV karts with Bluetooth speakers, free costumes and custom routes on request",
  url: klookLink("https://www.klook.com/en-US/activity/152539-osaka-electric-go-kart-by-future-kart/"),
};

/** Klook's list of every Osaka go-karting product. */
export const osakaGoKartingListUrl = klookLink("https://www.klook.com/en-US/experiences/list/osaka-go-karting/c29-cate178/");

/**
 * Osaka go-kart — what to book on the same day. No new URLs: the Amazing Pass (5%),
 * the Dotonbori daytime food walk and the Namba hotel search (6.5%), the eSIM (20%).
 */
export const osakaGoKartTripPrep: KlookTripPrepItem[] = [
  {
    ...tripPrepProducts.osakaPass,
    why: "The kart is an hour; the pass is the rest of the day — the castle and the Tombori river cruise on one ticket, neither of which needs a licence.",
  },
  {
    label: dotonboriDaytimeFoodTour.title,
    ctaLabel: "Check the food walk →",
    url: dotonboriDaytimeFoodTour.url,
    why: "Listed at 11:00–14:00 in the same streets the karts drive through, so it fits before an afternoon or evening slot.",
  },
  {
    label: "Hotels in Namba",
    ctaLabel: "Check Namba hotels on Klook →",
    url: whereToStayOsakaAreas[1].url,
    why: "The Osaka kart routes run through Namba, Dotonbori and Shinsaibashi, and an evening slot ends after dark — a bed in Namba is a short walk back.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Kart shops ask you to arrive early and a late arrival can lose the slot without a refund; live maps to a side-street shop are what stop that.",
  },
];

// ---------------------------------------------------------------------------
// Tokyo 7 day itinerary, added 12 Nov 2026 (task-jtk-20261112-01).
//
// Confirmed as live en-US listings through the www.klook.com search index on
// 12 Nov 2026:
//   5618    Nikko World Heritage Day Tour from Tokyo (group tour, about 12 hours,
//           meets at the Keio Plaza Hotel in Shinjuku; Toshogu and Kegon Falls).
//   44580   Nikko Customized Private One Day Tour from Tokyo (10 hours, private,
//           with a guide; Toshogu, Taiyu-in, Rinno-ji, Kegon Falls).
//   44652   Hakone Customized Private One Day Tour from Tokyo (10 hours, private,
//           with a guide; Romancecar, Lake Ashi, the ropeway, the pirate ship).
//   124861  Kamakura & Hakone One-Day Customized Private Tour (10-hour chartered
//           car with hotel pickup in central Tokyo; the driver may not speak English).
// Dropped: 207258 (Nikko private, no-locale page only in the index) and the Tokyo
// day-trips list c28-tokyo/1002-day-trips (no-locale and other-locale pages only —
// no en-US form found).
// All tours are 6.5%. No Klook price appears on the page.
// ---------------------------------------------------------------------------

export const nikkoWorldHeritageDayTour: KlookTour = {
  title: "Nikko World Heritage day tour from Tokyo",
  desc: "A guided group day from Shinjuku to Toshogu Shrine and Kegon Falls, listed at about 12 hours",
  url: klookLink("https://www.klook.com/en-US/activity/5618-nikko-world-heritage-day-tour-tokyo/"),
};

export const nikkoPrivateDayTour: KlookTour = {
  title: "Nikko customised private day tour from Tokyo",
  desc: "A private, guided 10-hour day: Toshogu, Taiyu-in, Rinno-ji and Kegon Falls at your own pace",
  url: klookLink("https://www.klook.com/en-US/activity/44580-nikko-private-day-tour-tokyo/"),
};

export const hakonePrivateDayTour: KlookTour = {
  title: "Hakone customised private day tour from Tokyo",
  desc: "A private, guided 10-hour day with the Romancecar, the Hakone Ropeway and the Lake Ashi boat",
  url: klookLink("https://www.klook.com/en-US/activity/44652-hakone-private-day-tour-tokyo/"),
};

export const kamakuraHakonePrivateCarTour: KlookTour = {
  title: "Kamakura & Hakone private chartered-car day tour",
  desc: "A 10-hour car and driver from a central Tokyo hotel, with the route set by you — Kamakura's Great Buddha and Hakone in one day",
  url: klookLink("https://www.klook.com/en-US/activity/124861-kamakura-hakone-one-day-tour-customized-chartered-car/"),
};

/** Hotels for a week based in Tokyo: the existing Shinjuku / Tokyo Station / Ueno searches, no new ids. */
export const tokyoSevenDayStayAreas: KlookStayArea[] = [
  {
    area: "Shinjuku",
    why: "The Romancecar to Hakone and the highway bus to Kawaguchiko both leave from Shinjuku, and the Nikko group tour meets there too — most of the day trips start a short walk away.",
    url: tokyoStayAreas[0].url,
  },
  {
    area: "Tokyo Station / Marunouchi",
    why: "The JR Yokosuka Line runs direct to Kamakura, the shinkansen towards Utsunomiya for Nikko leaves from here, and the Narita Express stops underneath.",
    url: tokyoStayAreas[1].url,
  },
  {
    area: "Ueno / Asakusa",
    why: "Tobu trains to Nikko leave from Asakusa, and Ueno has the Keisei Skyliner to Narita — the east-side base for the Nikko day.",
    url: tokyoStayAreas[2].url,
  },
];

/** "Book these on the same visit" for a week in Tokyo: 6.5% hotels and tours, 5% passes, 20% eSIM. */
export const tokyoSevenDayTripPrep: KlookTripPrepItem[] = [
  {
    label: "Hotels around Shinjuku",
    ctaLabel: "Check Shinjuku hotels on Klook →",
    url: tokyoStayAreas[0].url,
    why: "Six nights in one hotel: Shinjuku is where the Hakone train and the Kawaguchiko bus start, so the early day-trip mornings begin on foot.",
  },
  {
    label: nikkoWorldHeritageDayTour.title,
    ctaLabel: "Check the Nikko day tour →",
    url: nikkoWorldHeritageDayTour.url,
    why: "The Nikko day as one booking: the listing meets in Shinjuku and covers Toshogu and Kegon Falls, which are a bus ride apart if you go on your own.",
  },
  {
    ...tripPrepProducts.subway,
    why: "For the city days: Asakusa, Ueno, Toyosu and Ginza are all on Tokyo Metro or Toei lines, which the ticket covers. It does not cover JR or the Yurikamome.",
  },
  {
    label: hakoneFreepass.title,
    ctaLabel: "Check the Hakone Freepass →",
    url: hakoneFreepass.url,
    why: "The Hakone day's Odakyu train from Shinjuku plus the ropeway, the Lake Ashi boat and the buses around the loop on one pass.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Seven days of maps, timed QR tickets and day-trip meeting points — the tour pickups are the mornings when live data matters most.",
  },
];

// ---------------------------------------------------------------------------
// Tokyo Disney hotels — added 12 Nov 2026 (task-jtk-20261112-02).
//
// Every hotel and hotel-search page below was confirmed in its en-US form through
// the www.klook.com search index on 12 Nov 2026. Hotels pay the 6.5% band. The
// category each hotel belongs to (Disney Hotel / Official Hotel) and what that
// category gives comes from tokyodisneyresort.jp, not from Klook. The Toy Story
// Hotel and Fantasy Springs Hotel are left out: no en-US Klook form was indexed.
// No prices: Klook's rates move by date.
// ---------------------------------------------------------------------------

export const tokyoDisneylandHotelKlook: KlookTour = {
  title: "Tokyo Disneyland Hotel",
  desc: "A Disney Hotel, the closest hotel to the Tokyo Disneyland entrance on the resort's own site",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/284084-tokyo-disneyland-hotel/"),
};

export const tokyoDisneySeaMiraCostaKlook: KlookTour = {
  title: "Tokyo DisneySea Hotel MiraCosta",
  desc: "A Disney Hotel built inside Tokyo DisneySea, with Happy Entry to DisneySea as well as Disneyland",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/911192-tokyo-disneysea-hotel-miracosta/"),
};

export const disneyAmbassadorHotelKlook: KlookTour = {
  title: "Disney Ambassador Hotel",
  desc: "A Disney Hotel with a free non-stop Disney Resort Cruiser shuttle to both parks",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/275567-disney-ambassador-hotel/"),
};

export const tokyoDisneyCelebrationHotelKlook: KlookTour = {
  title: "Tokyo Disney Celebration Hotel",
  desc: "The Value type Disney Hotel in Shin-Urayasu, about 20 minutes to the parks by free shuttle bus",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/252721-tokyo-disney-celebration-hotel/"),
};

export const hiltonTokyoBayKlook: KlookTour = {
  title: "Hilton Tokyo Bay",
  desc: "One of the six Official Hotels inside the resort, on the free shuttle to Bayside Station",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/287260-hilton-tokyo-bay/"),
};

export const sheratonGrandeTokyoBayKlook: KlookTour = {
  title: "Sheraton Grande Tokyo Bay Hotel",
  desc: "One of the six Official Hotels inside the resort, on the free shuttle to Bayside Station",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/395747-sheraton-grande-tokyo-bay-hotel/"),
};

/** Klook's hotel search around Tokyo Disney Resort. */
export const tokyoDisneyResortHotels: KlookTour = {
  title: "Hotels near Tokyo Disney Resort",
  desc: "Klook's hotel page for the resort area, to compare every hotel on your dates",
  url: klookLink("https://www.klook.com/en-US/destination/p50014798-tokyo-disney-resort/3-hotel/"),
};

/** Klook's hotel search around Tokyo DisneySea. */
export const tokyoDisneySeaHotels: KlookTour = {
  title: "Hotels near Tokyo DisneySea",
  desc: "Klook's hotel page centred on DisneySea, for a stay built around that park",
  url: klookLink("https://www.klook.com/en-US/destination/p50062012-tokyo-disneysea/3-hotel/"),
};

/** What a Disney stay books around the room: ticket (2%) next to 6.5 / 5 / 20%. */
export const tokyoDisneyHotelsTripPrep: KlookTripPrepItem[] = [
  {
    label: tokyoDisneyResortHotels.title,
    ctaLabel: "Check Disney-area hotels →",
    url: tokyoDisneyResortHotels.url,
    why: "If the hotels above are full on your dates, this lists the rest of the resort area, Official and Partner Hotels included.",
  },
  {
    label: tokyoDisneyOneDayPassport.title,
    ctaLabel: "Check the 1-Day Passport →",
    url: tokyoDisneyOneDayPassport.url,
    why: "A room does not include a park ticket, and every ticket is for one park on one date, so book it as soon as your date opens.",
  },
  {
    ...tripPrepProducts.hanedaLimousine,
    why: "The Haneda listing names Tokyo Disney Resort among its destinations, so the luggage goes under the bus straight to the resort.",
  },
  {
    ...tripPrepProducts.naritaLimousine,
    why: "From Narita, the same operator runs with hold luggage. Check the stop list for your date, because destinations differ by route.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Your ticket QR code, Disney Premier Access and the shuttle times are all on your phone in the official app, so data matters from the first morning.",
  },
];

// ---------------------------------------------------------------------------
// Kawaguchiko ryokan with a Mt Fuji view — added 12 Nov 2026 (task-jtk-20261112-02).
//
// Each hotel below was confirmed as a live en-US Klook page through the www.klook.com
// search index on 12 Nov 2026. Hotels pay the 6.5% band. View, bath and shuttle
// claims on the page come from each inn's own site (Fufu: its operator's booking
// page), not from Klook. Fuji Lake Hotel (340544) is left out: only the no-locale
// and en-HK/en-AU forms were indexed. No prices.
// ---------------------------------------------------------------------------

export const kawaguchikoAsafuji: KlookTour = {
  title: "Fujikawaguchiko Onsen Hotel Asafuji",
  desc: "A 13-room hot spring inn whose own site says every room looks out on Mt Fuji and Lake Kawaguchi",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/338018-fujikawaguchiko-onsen-hotel-asafuji/"),
};

export const kawaguchikoMifujien: KlookTour = {
  title: "Hotel Mifujien",
  desc: "Every room type lists a Mt Fuji and lake view, with a natural hot spring bath on the 7th floor",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/248006-hotel-mifujien/"),
};

export const kawaguchikoFufu: KlookTour = {
  title: "Fufu Kawaguchiko",
  desc: "All-suite inn: every room has a Mt Fuji view and its own open-air hot spring bath",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/840799-fufu-kawaguchiko/"),
};

export const kawaguchikoLaVista: KlookTour = {
  title: "La Vista Fujikawaguchiko",
  desc: "Mt Fuji and lake views from all but one room type, plus four private baths that are free when open",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/563607-la-vista-fujikawaguchiko/"),
};

export const kawaguchikoRoyalHotel: KlookTour = {
  title: "Royal Hotel Kawaguchiko",
  desc: "On the lakeshore by Oike Park, with indoor and outdoor hot spring baths. Some rooms have no Fuji view",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/434358-royal-hotel-kawaguchiko/"),
};

export const kawaguchikoHotel: KlookTour = {
  title: "Kawaguchiko Hotel",
  desc: "A lakeside inn in Funatsu with a large observation bath that looks out on Mt Fuji",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/231048-kawaguchiko-hotel/"),
};

export const fujikawaguchikoResortHotel: KlookTour = {
  title: "Fujikawaguchiko Resort Hotel",
  desc: "A 120-room hotel about 11 minutes on foot from Kawaguchiko Station, as its Klook listing describes it",
  url: klookLink("https://www.klook.com/en-US/hotels/detail/361704-fujikawaguchiko-resort-hotel/"),
};

/** Klook's Fujikawaguchiko hotel page, for other inns or dates. */
export const fujikawaguchikoHotels: KlookTour = {
  title: "All hotels in Fujikawaguchiko",
  desc: "Klook's hotel page for Fujikawaguchiko, to compare other inns on your dates",
  url: klookLink("https://www.klook.com/en-US/destination/p50274308-fujikawaguchiko/3-hotel/"),
};

/** What a night at Lake Kawaguchi books around the room. */
export const kawaguchikoRyokanTripPrep: KlookTripPrepItem[] = [
  {
    label: fujikawaguchikoHotels.title,
    ctaLabel: "Check Fujikawaguchiko hotels →",
    url: fujikawaguchikoHotels.url,
    why: "If the inns here are full on your dates, this is the quickest way to compare others. Check the room type for its view.",
  },
  {
    label: tokyoMtFujiHighwayBus.title,
    ctaLabel: "Check the Fuji highway bus →",
    url: tokyoMtFujiHighwayBus.url,
    why: "The direct coach to Kawaguchiko Station, where the inns' shuttles start. Every seat is reserved, so book it with the room.",
  },
  {
    label: mtFujiPass.title,
    ctaLabel: "Check the Mt. Fuji Pass →",
    url: mtFujiPass.url,
    why: "Buses and trains around the lakes for the day after your night, when you are already there.",
  },
  {
    ...tripPrepProducts.esim,
    why: "Most inns ask you to phone or book the shuttle from the station, and the morning weather decides where you go for the view.",
  },
];
