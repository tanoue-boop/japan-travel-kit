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

// ---------------------------------------------------------------------------
// Day 2, 28 Nov 2026. Activity ids again from the www.klook.com search index (product
// pages still answer automated reads with HTTP 403, so no Klook price is printed).
// Passes are Klook's 5% passes-and-transport band; the three tours below are the
// 6.5% tours band (dashboard, 19 Oct 2026).
// ---------------------------------------------------------------------------

/** JR West Hiroshima-Yamaguchi Area Pass — 5 days, Mihara to Hakata. */
export const jrHiroshimaYamaguchiAreaPass: KlookTour = {
  title: "JR Hiroshima-Yamaguchi Area Pass (5 days)",
  desc: "Five days of the Sanyo Shinkansen between Mihara and Hakata, JR West lines in Hiroshima and Yamaguchi and the Miyajima ferry",
  url: klookLink("https://www.klook.com/en-US/activity/2769-5-day-jr-hiroshima-yamaguchi-area-jr-pass/"),
};

/** JR West Okayama-Hiroshima-Yamaguchi Area Pass — 5 days, Okayama to Hakata. */
export const jrOkayamaHiroshimaYamaguchiAreaPass: KlookTour = {
  title: "JR Okayama-Hiroshima-Yamaguchi Area Pass (5 days)",
  desc: "Five days of the Sanyo Shinkansen between Okayama and Hakata, JR West lines, the Miyajima ferry and Chugoku JR buses",
  url: klookLink("https://www.klook.com/en-US/activity/5653-5-day-okayayama-hiroshima-yamaguchi-area-jr-pass/"),
};

/** JR Shikoku ALL SHIKOKU Rail Pass — QR ticket on Klook. */
export const allShikokuRailPass: KlookTour = {
  title: "ALL SHIKOKU Rail Pass",
  desc: "JR Shikoku and the island's private railways and trams on one pass, as a QR ticket you activate in the Klook app",
  url: klookLink("https://www.klook.com/en-US/activity/68089-7-day-jr-all-shikoku-rail-pass/"),
};

/** JR Central Ise-Kumano-Wakayama Area Tourist Pass — 5 days. */
export const iseKumanoWakayamaAreaPass: KlookTour = {
  title: "JR Ise-Kumano-Wakayama Area Tourist Pass (5 days)",
  desc: "Five days from Osaka or Nagoya round the Kii Peninsula: Ise, Kumano, Shirahama and Wakayama, with Nachi and Hongu buses",
  url: klookLink("https://www.klook.com/en-US/activity/2804-5-day-jr-ise-kumano-wakayama-area-pass-jr-pass/"),
};

/** JR Central Mt. Fuji-Shizuoka Area Tourist Pass Mini — 3 days. */
export const mtFujiShizuokaAreaPassMini: KlookTour = {
  title: "JR Mt. Fuji-Shizuoka Area Tourist Pass Mini (3 days)",
  desc: "Three days of JR lines from Atami to Toyohashi and up the Minobu Line, plus Izuhakone Railway, Fuji buses and the Shimizu ferry",
  url: klookLink("https://www.klook.com/en-US/activity/2816-3-day-mt-fuji-shizuoka-area-mini-jr-pass/"),
};

/** Odakyu Fuji Hakone Pass — 3 days, round trip from Shinjuku. */
export const fujiHakonePass: KlookTour = {
  title: "Fuji Hakone Pass (3 days, from Shinjuku)",
  desc: "Odakyu round trip from Shinjuku plus unlimited rides around Hakone and the Fuji Five Lakes for three days",
  url: klookLink("https://www.klook.com/en-US/activity/77858-fuji-hakone-transport-day-pass-tokyo/"),
};

/** Odakyu Hakone Kamakura Pass — 3 days. */
export const hakoneKamakuraPass: KlookTour = {
  title: "Hakone Kamakura Pass (3 days)",
  desc: "Three days of all Odakyu lines plus Hakone's trains, ropeway and cruise and the Enoden to Kamakura",
  url: klookLink("https://www.klook.com/en-US/activity/9985-hakone-kamakura-3-day-pass-japan/"),
};

/** Fujikyu Mt. Fuji Pass — 1, 2 or 3 days, buses and trains plus attractions. */
export const mtFujiMultiAttractionPass: KlookTour = {
  title: "Mt. Fuji Pass (1, 2 or 3 days)",
  desc: "Fujikyu's foreigner-only pass: buses and trains around Mt. Fuji with admission and discounts at the lake-side sights",
  url: klookLink("https://www.klook.com/en-US/activity/132532-mt-fuji-pass/"),
};

/** Nankai Koyasan World Heritage Digital Ticket — 2 days. */
export const koyasanWorldHeritageTicket: KlookTour = {
  title: "Koyasan World Heritage Digital Ticket",
  desc: "Nankai round trip from Osaka to Koyasan plus two days of Koyasan buses, including Okunoin",
  url: klookLink("https://www.klook.com/en-US/activity/118966-koyasan-round-trip-ticket/"),
};

/** Tobu NIKKO PASS — World Heritage area (2 days) or all area (4 days). */
export const nikkoPassTobu: KlookTour = {
  title: "NIKKO PASS (Tobu Railway)",
  desc: "Tobu's pass from Asakusa to Nikko with the local buses: the 2-day World Heritage area or the 4-day all-area version",
  url: klookLink("https://www.klook.com/en-US/activity/79476-nikko-pass-dynamic-voucher/"),
};

/** Koyasan & Okunoin small-group day tour from Osaka. */
export const koyasanOkunoinDayTour: KlookTour = {
  title: "Koyasan & Okunoin small-group day tour from Osaka",
  desc: "A guided day to Koyasan from Osaka with Okunoin and the Great Gate",
  url: klookLink("https://www.klook.com/en-US/activity/172430-koyasan-one-day-unesco-site-hidden-gems-tour/"),
};

/** Naoshima & Teshima private sightseeing tour from Takamatsu. */
export const naoshimaTeshimaPrivateTour: KlookTour = {
  title: "Naoshima & Teshima private tour from Takamatsu",
  desc: "A private guided trip from Takamatsu to the art islands of Naoshima and Teshima",
  url: klookLink("https://www.klook.com/en-US/activity/161424-naoshima-island-teshima-multi-day-private-sightseeing-tour/"),
};

/** Nikko World Heritage walking tour with Kanmangafuchi Abyss. */
export const nikkoHeritageWalkingTour: KlookTour = {
  title: "Nikko World Heritage walking tour",
  desc: "A join-in walking day round Nikko Toshogu Shrine and Kanmangafuchi Abyss",
  url: klookLink("https://www.klook.com/en-US/activity/100052-world-heritage-nikko-kanmangafuchi-abyss-nikko-toshogu-shrine-join-one-day-walking-tour/"),
};

// ---------------------------------------------------------------------------
// Day 3 (task jtk-20261129-A35, run 28 Nov 2026): theme-park and experience
// tickets with no page of their own. Activity ids from the www.klook.com search
// index that day (product pages still answer automated reads with 403, so no
// Klook price is printed). The yen figures on the pages are the operators' own.
// ---------------------------------------------------------------------------

/** Huis Ten Bosch (Sasebo, Nagasaki) — 1 DAY Passport and other park tickets. */
export const huisTenBoschTicket: KlookTour = {
  title: "Huis Ten Bosch ticket (1 DAY Passport)",
  desc: "Admission and the park's attractions for the day at Huis Ten Bosch in Nagasaki, scanned at the gate from your phone",
  url: klookLink("https://www.klook.com/en-US/activity/7254-huis-ten-bosch-ticket-fukuoka-kumamoto/"),
};

/** Edo Wonderland Nikko Edomura — one-day admission. */
export const edoWonderlandTicket: KlookTour = {
  title: "Edo Wonderland Nikko Edomura ticket",
  desc: "One-day admission to the Edo-period theme town in Nikko, with its theatres and ninja show",
  url: klookLink("https://www.klook.com/en-US/activity/13833-edo-wonderland-ticket-tokyo/"),
};

/** Yomiuriland (Inagi, Tokyo) — One-Day Pass. */
export const yomiurilandTicket: KlookTour = {
  title: "Yomiuriland ticket (One-Day Pass)",
  desc: "Admission and most rides for the day at Yomiuriland, 35 minutes from Shinjuku",
  url: klookLink("https://www.klook.com/en-US/activity/20251-yomiuriland-admission-ticket-tokyo/"),
};

/** Nagashima Spa Land (Kuwana, Mie) — admission with the unlimited-rides passport. */
export const nagashimaSpaLandTicket: KlookTour = {
  title: "Nagashima Spa Land passport (admission + unlimited rides)",
  desc: "The roller-coaster park near Nagoya: admission with the ride passport, for Steel Dragon 2000 and Hakugei",
  url: klookLink("https://www.klook.com/en-US/activity/32241-nagashima-spa-land-ticket-kuwana/"),
};

/** Yokohama Hakkeijima Sea Paradise — One-Day Pass. */
export const hakkeijimaSeaParadiseTicket: KlookTour = {
  title: "Yokohama Hakkeijima Sea Paradise ticket",
  desc: "The four aquariums and the island's rides on one day pass, in Yokohama",
  url: klookLink("https://www.klook.com/en-US/activity/7891-hakkeijima-sea-paradise-yokohama-tokyo/"),
};

/** Shima Spain Village PARQUE ESPANA (Ise-Shima, Mie) — 1-day Passport. */
export const parqueEspanaTicket: KlookTour = {
  title: "Shima Spain Village PARQUE ESPANA ticket",
  desc: "The Spanish-themed park in Ise-Shima: admission, rides and shows on one passport",
  url: klookLink("https://www.klook.com/en-US/activity/83388-shima-spain-village-parque-espana-admission-mie/"),
};

/** Nijigen no Mori (Awaji Island) — NARUTO & BORUTO Shinobi-Zato ticket. */
export const nijigenNarutoTicket: KlookTour = {
  title: "Nijigen no Mori NARUTO & BORUTO Shinobi-Zato ticket",
  desc: "The Naruto attraction on Awaji Island: the ninja village, the 3D maze and the mission rally",
  url: klookLink("https://www.klook.com/en-US/activity/49769-naruto-boruto-awajishima/"),
};

/** Nijigen no Mori — Godzilla Interception Operation ticket. */
export const nijigenGodzillaTicket: KlookTour = {
  title: "Nijigen no Mori Godzilla Interception Operation ticket",
  desc: "The Godzilla attraction on Awaji Island: the pre-show theatre, a zip line ride and the shooting game",
  url: klookLink("https://www.klook.com/en-US/activity/49995-nijigen-no-mori-godzilla/"),
};

/** Nijigen no Mori — Dragon Quest Island ticket. */
export const nijigenDragonQuestTicket: KlookTour = {
  title: "Nijigen no Mori Dragon Quest Island ticket",
  desc: "The walk-through Dragon Quest adventure in the same park on Awaji Island",
  url: klookLink("https://www.klook.com/en-US/activity/56549-nijigen-no-mori-dragon-quest-island/"),
};

/** UZUMASA KYOTO VILLAGE (Toei Kyoto Studio Park) — admission. */
export const toeiKyotoStudioParkTicket: KlookTour = {
  title: "Toei Kyoto Studio Park (UZUMASA KYOTO VILLAGE) ticket",
  desc: "Admission to the working period-drama film set in Uzumasa, Kyoto",
  url: klookLink("https://www.klook.com/en-US/activity/48327-toei-kyoto-studio-park/"),
};

/** Betty Smith jeans-making experience, Kojima (Kurashiki, Okayama). */
export const bettySmithJeansMaking: KlookTour = {
  title: "Jeans-making experience in Okayama (Betty Smith, Kojima)",
  desc: "Choose a pair, hammer in your own buttons and rivets and take the jeans home the same day, at Betty Smith in Kojima",
  url: klookLink("https://www.klook.com/en-US/activity/50987-jeans-making-experience-in-okayama/"),
};

/** Kojima tour bus day pass with the Betty Smith denim experience. */
export const kojimaBusDenimPass: KlookTour = {
  title: "Kojima tour bus day pass with a denim experience",
  desc: "A day on the Kojima sightseeing bus with a hand-made denim experience at the Betty Smith Jeans Museum",
  url: klookLink("https://www.klook.com/en-US/activity/26581-kojima-bus-day-pass-denim-handmade-experience/"),
};

/** Gunkanjima (Battleship Island) landing cruise from Nagasaki — Gunkanjima Concierge. */
export const gunkanjimaCruiseTour: KlookTour = {
  title: "Battleship Island (Gunkanjima) landing cruise, Nagasaki",
  desc: "The landing cruise from Tokiwa pier in Nagasaki, checking in at the Gunkanjima Digital Museum before you sail",
  url: klookLink("https://www.klook.com/en-US/activity/127726-battleship-island-cruise-experience-in-nagasaki/"),
};

/** Nabana no Sato illuminations and Jazz Dream Nagashima day tour from Nagoya. */
export const nabanaNoSatoNagashimaTour: KlookTour = {
  title: "Nabana no Sato light show & Nagashima outlet day tour",
  desc: "A day from Nagoya to the Nagashima resort: the outlet, an onsen and the Nabana no Sato illuminations after dark",
  url: klookLink("https://www.klook.com/en-US/activity/190620-nagoya-mitsui-outlet-park-nabana-no-sato-full-day-shopping-onsen-tour/"),
};
