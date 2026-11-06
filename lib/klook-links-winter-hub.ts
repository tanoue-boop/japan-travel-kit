import { klookLink, type KlookTour } from "./klook-links";

/**
 * Klook listings for the winter hub page (task jtk-20261106-A21). Both read off
 * the www.klook.com search index on 6 Nov 2026, because Klook answers automated
 * reads of its product pages with HTTP 403.
 */

/**
 * The whole-Japan pass as it is on sale now. Activity 83341, which
 * `jrPassWholeJapan` in klook-links.ts points at, showed "Currently unavailable" on
 * its en-GB listing; 1420 showed bookable options.
 */
export const jrPassWholeJapanCurrent: KlookTour = {
  title: "JAPAN RAIL PASS (7, 14 or 21 day)",
  desc: "The JR Group's whole-country pass on Klook's current listing — the version to price against your own route before you commit",
  url: klookLink("https://www.klook.com/en-US/activity/1420-7-day-whole-japan-rail-pass-jr-pass/"),
};

/**
 * The one light-up listing whose index entry carries the 2027 evenings (11, 17, 24
 * and 31 January). Listed at 10 to 12 hours with optional hotel pick-up, inside the
 * village only: this tour does not go to the observation deck.
 */
export const shirakawagoLightUp2027NagoyaTour: KlookTour = {
  title: "Shirakawa-go light-up tour, 2027 evenings (from Nagoya)",
  desc: "A 10 to 12 hour day out of Nagoya on the four January 2027 light-up evenings, inside the village only, with optional hotel pick-up",
  url: klookLink("https://www.klook.com/en-US/activity/79800-2026-shirakawa-go-light-up-event-tour-from-nagoya/"),
};
