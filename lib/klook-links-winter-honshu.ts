import { klookLink, type KlookTour } from "./klook-links";

/**
 * The Honshu winter pages' replacement products (task jtk-20261106-A21). Each URL
 * came out of a klook.com search result on 6 Nov 2026, because Klook's product
 * pages answer automated reads with HTTP 403. They stand in for listings that could
 * not be shown to run this winter: 33453 and 2032 on the snow monkey page, and
 * 133193 on the Shirakawa-go page.
 */

/** Tokyo coach day, 08:00–20:00 from Shinjuku; Klook's index showed dates from 12 Dec 2026. */
export const snowMonkeySukiyakiTourTokyo: KlookTour = {
  title: "Snow Monkey Tour from Tokyo with Beef Sukiyaki Lunch",
  desc: "A 12-hour coach day from Shinjuku with the park's admission and a beef sukiyaki lunch in the booking. The Kamakura no Sato snow-hut stop runs only from about late January to late February",
  url: klookLink("https://www.klook.com/en-US/activity/28811-snow-monkey-tour-tokyo/"),
};

/** For a reader already on the shinkansen: starts at Nagano Station rather than Tokyo. */
export const snowMonkeysZenkojiSakeNaganoTour: KlookTour = {
  title: "Snow Monkeys, Zenko-ji Temple & Sake in Nagano day tour",
  desc: "A guided day from Nagano Station, for anyone taking the shinkansen up on a JR pass: the monkeys, Zenko-ji and a sake stop without the private-railway and bus connections",
  url: klookLink("https://www.klook.com/en-US/activity/21103-snow-monkey-park-zenkoji-nagoya/"),
};

/** Klook lists this one for 2027; the page showed availability from 11 Jan 2027. */
export const shirakawagoIllumination2027NagoyaTour: KlookTour = {
  title: "2027 Shirakawa-go Winter Illumination & Hida Takayama Tour (from Nagoya)",
  desc: "A light-up day out of Nagoya on Klook's 2027 listing, 09:00 to 22:30, with gifts and snacks. Refunds are limited: 100% only up to 60 days before the date",
  url: klookLink("https://www.klook.com/en-US/activity/233458-nagoya-shirakawa-go-winter-illumination-day-tour/"),
};

/** The second 2027 Nagoya listing. It states the observation deck is not included. */
export const shirakawagoFairytale2027NagoyaTour: KlookTour = {
  title: "2027 Shirakawa-go Winter Illumination Fairytale Tour (from Nagoya)",
  desc: "A second Nagoya light-up listing naming the four 2027 dates. It stays in the village and does not include the observation deck",
  url: klookLink("https://www.klook.com/en-US/activity/79800-2026-shirakawa-go-light-up-event-tour-from-nagoya/"),
};
