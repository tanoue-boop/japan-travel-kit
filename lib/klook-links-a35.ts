import { klookLink, type KlookTour } from "./klook-links";

// ---------------------------------------------------------------------------
// One-product pages, task jtk-20261127-A35 (day 1, 27 Nov 2026).
//
// Each constant is the main product of one new page, and that page's Klook button.
// Activity ids were taken from the www.klook.com search index on 27 Nov 2026
// (Klook answers automated reads of product pages with HTTP 403, so no Klook price
// is printed anywhere; every yen figure on the pages is the operator's own).
// Bands: rail passes are Klook's 5% passes-and-transport band (dashboard, 19 Oct
// 2026); the Ghibli Museum ticket is listed among the 5% products in the A35 task.
// The JR passes already linked elsewhere (2729, 3277, 71864) keep their constants
// in lib/klook-links.ts; these are re-exported under page names for clarity.
// ---------------------------------------------------------------------------

/** JR-WEST All Area Pass — 7 days, Kansai to Hakata and Hokuriku. */
export const jrWestAllAreaPass: KlookTour = {
  title: "JR-WEST All Area Pass (7 days)",
  desc: "The one JR West pass that covers the Sanyo Shinkansen to Hakata and the Hokuriku Shinkansen to Joetsu-Myoko in the same week",
  url: klookLink("https://www.klook.com/en-US/activity/70766-jr-rail-ticket-west-all-area/"),
};

/** JR West Kansai-Hokuriku Area Pass — 7 days, Kansai to Kanazawa and Toyama. */
export const jrKansaiHokurikuAreaPass: KlookTour = {
  title: "JR Kansai-Hokuriku Area Pass (7 days)",
  desc: "Seven days from Kansai Airport, Osaka and Kyoto to Fukui, Kanazawa and Toyama, with the Thunderbird and the Hokuriku Shinkansen from Tsuruga",
  url: klookLink("https://www.klook.com/en-US/activity/2771-7-day-jr-kansai-hokuriku-area-pass-jr-pass/"),
};

/** JR West Hokuriku Area Pass — 4 days inside Fukui, Ishikawa and Toyama. */
export const jrHokurikuAreaPass: KlookTour = {
  title: "JR Hokuriku Area Pass (4 days)",
  desc: "Four days of non-reserved seats on the Hokuriku Shinkansen between Tsuruga and Kurobe-Unazukionsen and JR lines in Fukui, Ishikawa and Toyama",
  url: klookLink("https://www.klook.com/en-US/activity/2773-4-day-jr-hokuriku-area-pass-jr-pass/"),
};

/** JR Central / JR West Takayama-Hokuriku Area Tourist Pass — 5 days. */
export const jrTakayamaHokurikuAreaPass: KlookTour = {
  title: "JR Takayama-Hokuriku Area Tourist Pass (5 days)",
  desc: "Five days from Osaka or Nagoya to Takayama, Shirakawa-go, Kanazawa and Toyama, with the Nohi and World Heritage buses through Shirakawa-go",
  url: klookLink("https://www.klook.com/en-US/activity/2969-5-day-jr-takayama-hokuriku-area-tourist-pass-jr-pass/"),
};

/** JR West Kansai-San'in Area Pass — 7 days, Kansai to Tottori and Matsue. */
export const jrKansaiSaninAreaPass: KlookTour = {
  title: "JR Kansai-San'in Area Pass (7 days)",
  desc: "Seven days from Kansai to Okayama and the San'in coast (Tottori, Shimane, Hagi), with reserved seats on the SUPER HAKUTO, YAKUMO and KONOTORI",
  url: klookLink("https://www.klook.com/en-US/activity/111946-jr-west-kansai-sanin-area-pass/"),
};

/** JR Hokkaido Sapporo-Noboribetsu Area Pass — 4 days. */
export const sapporoNoboribetsuAreaPass: KlookTour = {
  title: "Hokkaido Sapporo-Noboribetsu Area Pass (4 days)",
  desc: "Four days between New Chitose Airport, Sapporo, Otaru and Noboribetsu, reserved seats on JR Hokkaido limited expresses included",
  url: klookLink("https://www.klook.com/en-US/activity/71871-hokkaido-sapporo-noboribetsu-area-pass-4-day/"),
};

/** Ghibli Museum, Mitaka — date-and-time admission sold through Klook. */
export const ghibliMuseumTicket: KlookTour = {
  title: "Ghibli Museum, Mitaka ticket",
  desc: "A dated entry to the Ghibli Museum in Mitaka, bought through Klook instead of LAWSON TICKET",
  url: klookLink("https://www.klook.com/en-US/activity/2843-ghibli-museum-tokyo/"),
};
