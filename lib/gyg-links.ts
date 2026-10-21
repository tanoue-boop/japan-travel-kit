/**
 * GetYourGuide affiliate links, in one place.
 *
 * The GetYourGuide partner programme was registered and approved on
 * 21 Oct 2026 (partner_id=EFTLTCP). Its floor commission rate is 8%, which is
 * why these links exist at all: Klook pays 2% on its "Special Activities" band
 * (SHIBUYA SKY, Tokyo Disney, shinkansen) and 0% on some tickets, notably the
 * USJ Express Pass. On those pages the same reader, having just been told which
 * ticket to buy, is worth four times as much through GetYourGuide — so we offer
 * both and let them compare.
 *
 * Link format, as GetYourGuide's own publisher docs give it: a plain
 * www.getyourguide.com URL with the tracking query appended.
 *   ?partner_id=EFTLTCP&utm_medium=online_publisher&cmp=<article slug>
 * `cmp` is the per-article reporting key, so the GetYourGuide dashboard
 * separates a Shibuya Sky click from a teamLab one.
 *
 * Nothing here carries a price. GetYourGuide answers automated reads of its
 * pages with HTTP 403 — exactly as Klook does — so no figure on this site could
 * be verified against the live listing, and GetYourGuide prices move with
 * currency and demand in any case. Every URL below was instead confirmed as a
 * live, search-indexed www.getyourguide.com page on 21 Oct 2026.
 *
 * The 403 also rules out one thing the copy might otherwise want to say: we
 * cannot read a GetYourGuide product page, so we make no claim about its
 * cancellation terms. The Klook cancellation facts already on these pages are
 * untouched, and the GetYourGuide side says only what it is — another place the
 * same experience is sold.
 */

/** Our GetYourGuide partner id. Lives here and nowhere else. */
export const GYG_PARTNER_ID = "EFTLTCP";

/** The medium GetYourGuide expects from a content publisher. */
const GYG_UTM_MEDIUM = "online_publisher";

/**
 * A tracked GetYourGuide link.
 *
 * @param url  A plain www.getyourguide.com URL — a location page, a category
 *             listing or a single product. Existing query strings are kept and
 *             the tracking parameters joined on with `&`.
 * @param slug Reporting key, normally the article slug, sent as `cmp`.
 */
export function gygLink(url: string, slug: string): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}partner_id=${GYG_PARTNER_ID}&utm_medium=${GYG_UTM_MEDIUM}&cmp=${slug}`;
}

/**
 * `rel` for every GetYourGuide link: `sponsored` because it is paid, `noopener`
 * because it opens in a new tab. No `noreferrer` — that would strip the
 * referrer GetYourGuide reads. Same rule as `WISE_REL`.
 *
 * GA4 `affiliate_click` needs nothing here: pages/_app.tsx captures every
 * outbound click at the document and resolves `getyourguide.com` to
 * `partner: "getyourguide"`, so these links are measured without being rewritten.
 */
export const GYG_REL = "sponsored noopener";

/** The date every URL in this file was confirmed live. */
export const GYG_CHECKED_AT = "21 Oct 2026";

/**
 * One thing the reader can open on GetYourGuide.
 *
 * `what` describes the page as the page describes itself — a listing of a
 * category, or a named product. It never claims first-hand experience, and it
 * never carries a price.
 */
export type GygListing = {
  /** The attraction or experience, as GetYourGuide names it. */
  title: string;
  /** What opening this link actually shows. One clause, no price. */
  what: string;
  /** Plain URL; wrap with `gygLink(url, slug)` at the point of use. */
  url: string;
};

// ---------------------------------------------------------------------------
// Entry tickets — the pages where Klook pays 2% or 0%
//
// These are the reason the programme exists. Each one points at the
// attraction's own GetYourGuide listing rather than a single product id: the
// listing page is the stable address, it shows everything currently on sale at
// that attraction, and a product id can be delisted without warning. That is
// also what makes "Compare on GetYourGuide" an honest label — it opens a list,
// not a checkout.
// ---------------------------------------------------------------------------

/** SHIBUYA SKY — Klook's band here is 2%. */
export const gygShibuyaSky: GygListing = {
  title: "SHIBUYA SKY",
  what: "GetYourGuide's Shibuya Sky entry tickets, including the guided walks that bundle the rooftop slot",
  url: "https://www.getyourguide.com/shibuya-sky-l167837/entry-tickets-tc123/",
};

/** Tokyo Disney Resort — the whole-resort listing, Land and Sea together. */
export const gygTokyoDisneyResort: GygListing = {
  title: "Tokyo Disney Resort",
  what: "Entry tickets for Tokyo Disneyland and DisneySea on one listing, including the 1-Day Park Hopper",
  url: "https://www.getyourguide.com/tokyo-disney-resort-l104703/entry-tickets-tc123/",
};

/** Tokyo DisneySea has a listing of its own, which the Disney guide splits out. */
export const gygTokyoDisneySea: GygListing = {
  title: "Tokyo DisneySea",
  what: "DisneySea entry tickets on their own listing, separate from Disneyland",
  url: "https://www.getyourguide.com/tokyo-disneysea-l4082/entry-tickets-tc123/",
};

/** USJ — the park admission listing. Klook pays 0% on some of these. */
export const gygUsj: GygListing = {
  title: "Universal Studios Japan",
  what: "USJ Studio Pass admission on GetYourGuide, with the transfer bundles on the same listing",
  url: "https://www.getyourguide.com/universal-studios-japan-l80971/entry-tickets-tc123/",
};

/**
 * The USJ Express Pass as a named product — the one ticket on this site Klook
 * pays nothing at all for, which makes it the single best reason to carry a
 * second seller.
 */
export const gygUsjExpressPass: GygListing = {
  title: "USJ Express Pass",
  what: "The Express Pass sold on its own, as GetYourGuide lists it — admission is a separate Studio Pass",
  url: "https://www.getyourguide.com/osaka-l1204/osaka-universal-studios-japan-express-pass-only-t883811/",
};

/** teamLab Planets TOKYO, Toyosu. */
export const gygTeamlabPlanets: GygListing = {
  title: "teamLab Planets TOKYO",
  what: "The Toyosu museum's GetYourGuide listing, with the timed entry slots and the premium pass",
  url: "https://www.getyourguide.com/teamlab-planets-tokyo-l112322/",
};

/** teamLab Borderless, Azabudai Hills. */
export const gygTeamlabBorderless: GygListing = {
  title: "teamLab Borderless",
  what: "Borderless entry tickets at Azabudai Hills, plus the Roppongi art tours that include admission",
  url: "https://www.getyourguide.com/teamlab-borderless-l104601/entry-tickets-tc123/",
};

/** TOKYO SKYTREE. */
export const gygTokyoSkytree: GygListing = {
  title: "TOKYO SKYTREE",
  what: "Skytree admission on GetYourGuide, with and without the 450 m Tembo Galleria",
  url: "https://www.getyourguide.com/tokyo-skytree-l4086/",
};

/** Tokyo Tower. */
export const gygTokyoTower: GygListing = {
  title: "Tokyo Tower",
  what: "Main Deck entry tickets and the Top Deck Tour upgrade, on Tokyo Tower's own listing",
  url: "https://www.getyourguide.com/tokyo-tower-l4084/entry-tickets-tc123/",
};

// ---------------------------------------------------------------------------
// Day trips
//
// Klook pays 6.5% on tours, so these pages are not a rate rescue — they are a
// stock question. A coach day trip sells out by date, and the reader who finds
// their date gone on one platform has nowhere to go. The second seller is the
// answer to that, which is how the copy on those pages frames it.
// ---------------------------------------------------------------------------

/** Mt. Fuji, as reached from Tokyo — the cross-location page for that pairing. */
export const gygFujiFromTokyo: GygListing = {
  title: "Mt. Fuji day trips from Tokyo",
  what: "GetYourGuide's Tokyo-to-Mt. Fuji day trips in one list, coach and private alike",
  url: "https://www.getyourguide.com/tokyo-l193/day-trips-tc360/mount-fuji-tl7924/",
};

/** The Fuji coach tours as a category, for the page that is about the coach. */
export const gygFujiBusTours: GygListing = {
  title: "Mt. Fuji bus and minivan tours",
  what: "The join-in coach and minivan runs around Mt. Fuji, listed together",
  url: "https://www.getyourguide.com/mount-fuji-l7924/bus-minivan-tours-tc4/",
};

/** Nara out of Osaka — the cross-location page. */
export const gygNaraFromOsaka: GygListing = {
  title: "Nara day trips from Osaka",
  what: "GetYourGuide's Osaka-to-Nara day trips, including the ones that add Kyoto or Uji",
  url: "https://www.getyourguide.com/osaka-l1204/day-trips-tc360/nara-tl1707/",
};

/** Nara's own tour listing, for the Nara guide. */
export const gygNara: GygListing = {
  title: "Nara tours and day trips",
  what: "Tours that start in or run to Nara — Todai-ji, Kasuga Taisha and the deer park",
  url: "https://www.getyourguide.com/nara-l1707/day-trips-tc172/",
};

/** Kyoto day trips, for the Kyoto-and-Nara page's Kyoto half. */
export const gygKyotoDayTrips: GygListing = {
  title: "Kyoto day trips",
  what: "Day trips out of Kyoto, including the Arashiyama and Fushimi Inari coach routes",
  url: "https://www.getyourguide.com/kyoto-l96826/day-trips-tc172/",
};

// ---------------------------------------------------------------------------
// Experiences — food, cooking, culture
//
// Also 6.5% on Klook, so the same stock argument applies: these are small-group
// experiences with a handful of seats per departure, and the two platforms do
// not carry the same operators.
// ---------------------------------------------------------------------------

export const gygTokyoFoodTours: GygListing = {
  title: "Tokyo local food tours",
  what: "GetYourGuide's guided Tokyo food walks — Shinjuku, Shibuya, Ginza and the back-alley izakaya routes",
  url: "https://www.getyourguide.com/tokyo-l193/local-food-tours-tc532/",
};

export const gygTokyoStreetFood: GygListing = {
  title: "Tokyo street food tours",
  what: "The street-food end of the same list: Ameyoko, Togoshi Ginza, Akihabara and the Tsukiji outer market",
  url: "https://www.getyourguide.com/tokyo-l193/street-food-tc248/",
};

export const gygTokyoCookingClasses: GygListing = {
  title: "Tokyo cooking classes",
  what: "Hands-on classes in Tokyo on GetYourGuide — sushi, ramen, and the home-kitchen formats",
  url: "https://www.getyourguide.com/tokyo-l193/cooking-classes-tc107/",
};

export const gygTokyoRamenClasses: GygListing = {
  title: "Tokyo ramen classes",
  what: "The ramen-specific listing, broth-and-noodles classes separated from the sushi ones",
  url: "https://www.getyourguide.com/tokyo-l193/ramen-tasting-cooking-classes-tc2088/",
};

export const gygTokyoSamuraiNinja: GygListing = {
  title: "Tokyo samurai and ninja experiences",
  what: "GetYourGuide's samurai and ninja listings for Tokyo, museum tours and hands-on training both",
  url: "https://www.getyourguide.com/tokyo-l193/samurai-and-ninja-experiences-tc2170/",
};

export const gygJapanTeaCeremonies: GygListing = {
  title: "Tea ceremonies in Japan",
  what: "Every tea ceremony GetYourGuide sells in Japan, on one list — useful if your city is not Kyoto or Tokyo",
  url: "https://www.getyourguide.com/japan-l169034/tea-ceremonies-tc1115/",
};

export const gygKyotoTeaCeremonies: GygListing = {
  title: "Kyoto tea ceremonies",
  what: "The Kyoto listing — Gion, the Kiyomizu-dera garden tea houses and the temple rooms",
  url: "https://www.getyourguide.com/kyoto-l96826/tea-ceremonies-tc1115/",
};

export const gygTokyoTeaCeremonies: GygListing = {
  title: "Tokyo tea ceremonies",
  what: "The Tokyo listing, weighted towards Asakusa, Shinjuku and Shibuya",
  url: "https://www.getyourguide.com/tokyo-l193/tea-ceremonies-tc1115/",
};

export const gygKyotoKimono: GygListing = {
  title: "Kyoto kimono experiences",
  what: "Kyoto kimono and yukata rentals on GetYourGuide, including the ones with hair styling",
  url: "https://www.getyourguide.com/kyoto-l96826/kimono-experiences-tc2239/",
};

export const gygTokyoKimono: GygListing = {
  title: "Tokyo kimono experiences",
  what: "The Tokyo equivalent, mostly Asakusa shops within walking distance of Senso-ji",
  url: "https://www.getyourguide.com/tokyo-l193/kimono-experiences-tc2239/",
};

// ---------------------------------------------------------------------------
// City listings — for the round-ups and the itinerary
//
// These pages recommend a day rather than a product, so they get the city's own
// GetYourGuide page: a second catalogue to search, not a second checkout.
// ---------------------------------------------------------------------------

export const gygTokyo: GygListing = {
  title: "Tokyo",
  what: "Everything GetYourGuide sells in Tokyo, searchable by date — a second catalogue when Klook is sold out",
  url: "https://www.getyourguide.com/tokyo-l193/",
};

export const gygKyoto: GygListing = {
  title: "Kyoto",
  what: "GetYourGuide's Kyoto catalogue — tours, tea ceremonies, kimono and the day trips out",
  url: "https://www.getyourguide.com/kyoto-l96826/",
};

export const gygOsaka: GygListing = {
  title: "Osaka",
  what: "GetYourGuide's Osaka catalogue, including USJ, the Dotonbori cruises and the Nara day trips",
  url: "https://www.getyourguide.com/osaka-l1204/",
};

export const gygTokyoEntryTickets: GygListing = {
  title: "Tokyo entry tickets",
  what: "The admissions-only slice of the Tokyo catalogue, for the attractions on this page",
  url: "https://www.getyourguide.com/tokyo-l193/entry-tickets-tc123/",
};
