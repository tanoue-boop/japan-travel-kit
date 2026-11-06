import { klookLink, type KlookTour } from "./klook-links";

/**
 * Winter 2026-27 Hokkaido products, added 6 Nov 2026 (task jtk-20261106-A21).
 *
 * Klook answers automated reads of /activity/ pages with HTTP 403, so each of
 * these was found through the klook.com search index on that date, in its en-US
 * form. They replace listings on the Hokkaido pages that the same read showed to
 * be dated, out of season or not what our copy said they were; each const below
 * gives its reason. No price lives here: a page quotes a from-price only in its
 * WinterBookingTop row, where it is dated.
 */

/**
 * Replaces `asahiyamaZooWinterDayTour` (164281), whose indexed page still gives
 * only the 1 Dec 2025 to 15 Mar 2026 run. This one is sold on several routes and
 * names the winter snowmobile option in its title.
 */
export const asahiyamaBieiHighlightsTour: KlookTour = {
  title: "Asahiyama Zoo, Biei Blue Pond & Ningle Terrace day tour from Sapporo",
  desc: "A one-day coach out of Sapporo to Asahikawa's zoo, the Biei Blue Pond and Ningle Terrace, sold on several routes with a snowmobile option in winter at extra cost",
  url: klookLink("https://www.klook.com/en-US/activity/161857-asahiyama-zoo-day-tour-from-sapporo-penguin-parade-winter-hill/"),
};

/** Furano and Biei in their winter version: the listing's own title splits the seasons. */
export const furanoBieiWinterIlluminationTour: KlookTour = {
  title: "Furano & Biei one-day tour, winter illumination route",
  desc: "About ten hours out of Sapporo. In winter the route runs to the illuminations, which the listing warns can be adjusted or cancelled for weather or equipment",
  url: klookLink("https://www.klook.com/en-US/activity/178974-furano-winter-reverie-christmas-tree-blue-pond-ningle-terrace/"),
};

/** The one Lake Shikotsu listing whose indexed text gives the 2027 festival dates. */
export const lakeShikotsuTomamuIceVillageDayTour: KlookTour = {
  title: "Lake Shikotsu Ice Festival & Tomamu Ice Village day tour",
  desc: "Ten hours from Sapporo pairing the ice festival with the Ice Village at Hoshino Resorts Tomamu. Festival admission is not in the price",
  url: klookLink("https://www.klook.com/en-US/activity/99898-lake-shikotsu-ice-festival-hoshino-resorts-tomamu-ice-village-bus-tour-sapporo/"),
};

/** Otaru sightseeing and a Sapporo Kokusai ski or snow-play day, in one booking. */
export const sapporoKokusaiOtaruDayTour: KlookTour = {
  title: "Sapporo Kokusai ski or snow-play day with Otaru sightseeing",
  desc: "A ten-hour day with round-trip transport from Sapporo, sold in several packages for beginners and for intermediate to advanced skiers",
  url: klookLink("https://www.klook.com/en-US/activity/135641-sapporo-kokusai-ski-resort-tour-from-sapporo/"),
};

/**
 * Replaces `otaruYoichiDayTour` (181965) as this site's Yoichi listing. That page
 * is titled "Otaru & Yoichi" but its indexed body describes an Otaru and Cape Kamui
 * small-group tour, so we can no longer say it reaches the distillery. This one
 * names the Nikka distillery and the canal cruise, and travels by train and bus
 * with an English-speaking assistant.
 */
export const yoichiOtaruWalkingTour: KlookTour = {
  title: "1-Day Yoichi & Otaru walking tour from Sapporo",
  desc: "A small-group day by train and bus with an English-speaking assistant: the Nikka Yoichi distillery, a sake brewery and an Otaru canal cruise, on about 4 km of walking",
  url: klookLink("https://www.klook.com/en-US/activity/181785-1-day-yoichi-otaru-walking-tour/"),
};
