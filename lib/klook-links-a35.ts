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

// ---------------------------------------------------------------------------
// Day 4 (task jtk-20261130-A35, run 28 Nov 2026). Activity ids from the
// www.klook.com search index that day; every yen figure on the pages is the
// operator's own (Klook still answers automated reads with 403). The Hozugawa
// boat page uses hozugawaRiverBoatTicket (74947) from lib/klook-links.ts.
// ---------------------------------------------------------------------------

/** SUNQ PASS — Kyushu-wide bus and ferry pass. */
export const sunqPassKyushu: KlookTour = {
  title: "SUNQ PASS (Kyushu bus & ferry pass)",
  desc: "Unlimited expressway buses, local buses and some ferries across Kyushu and Shimonoseki: All, Northern or Southern Kyushu",
  url: klookLink("https://www.klook.com/en-US/activity/28320-kyushu-sunq-pass/"),
};

/** Adventure World, Shirahama (Wakayama) — admission. */
export const adventureWorldTicket: KlookTour = {
  title: "Adventure World admission ticket (Shirahama)",
  desc: "One-day entry to the zoo, aquarium and amusement park in Shirahama, Wakayama",
  url: klookLink("https://www.klook.com/en-US/activity/97834-adventure-world/"),
};

/** Hakone Kowakien Yunessun — hot-spring theme park, one-day ticket. */
export const yunessunTicket: KlookTour = {
  title: "Hakone Kowakien Yunessun ticket",
  desc: "The swimsuit spa park and the Mori no Yu onsen at Kowakien, Hakone",
  url: klookLink("https://www.klook.com/en-US/activity/13954-hakone-kowaki-en-yunessun-hot-spring-theme-park-one-day-ticket-tokyo/"),
};

/** Sumida Aquarium (Tokyo Skytree Town) — admission. Same activity as skytreeAquariumCombo. */
export const sumidaAquariumTicket: KlookTour = {
  title: "Sumida Aquarium ticket",
  desc: "Entry to the aquarium on the 5th and 6th floors of Tokyo Solamachi at the foot of the Skytree",
  url: klookLink("https://www.klook.com/en-US/activity/59360-tokyo-skytree-sumida-aquarium-combo-ticket/"),
};

/** SMALL WORLDS Tokyo (Ariake) — admission passport. */
export const smallWorldsTokyoTicket: KlookTour = {
  title: "SMALL WORLDS Tokyo ticket",
  desc: "The indoor 1/80-scale miniature museum in Ariake: Evangelion, Space Center and Kansai Airport areas",
  url: klookLink("https://www.klook.com/en-US/activity/66249-small-worlds-tokyo-admission-passport/"),
};

/** Kobe Animal Kingdom (Port Island) — admission. */
export const kobeAnimalKingdomTicket: KlookTour = {
  title: "Kobe Animal Kingdom ticket",
  desc: "The animal and flower park on Port Island, Kobe",
  url: klookLink("https://www.klook.com/en-US/activity/33264-kobe-animal-kingdom-ticket/"),
};

/** Sunshine Aquarium (Ikebukuro) — admission. */
export const sunshineAquariumTicket: KlookTour = {
  title: "Sunshine Aquarium ticket (Ikebukuro)",
  desc: "The aquarium in Sunshine City, Ikebukuro, with its outdoor Marine Garden",
  url: klookLink("https://www.klook.com/en-US/activity/14547-sunshine-aquarium-ticket-tokyo/"),
};

/** DMM Kariyushi Aquarium (Tomigusuku, Okinawa) — admission. */
export const dmmKariyushiAquariumTicket: KlookTour = {
  title: "DMM Kariyushi Aquarium ticket (Okinawa)",
  desc: "The aquarium in Tomigusuku, about 20 minutes by car from Naha Airport",
  url: klookLink("https://www.klook.com/en-US/activity/55241-dmm-kariyushi-aquarium-ticket-okinawa/"),
};

/** Okinawa World (Gyokusendo Cave), Nanjo — admission. */
export const okinawaWorldTicket: KlookTour = {
  title: "Okinawa World ticket (Gyokusendo Cave)",
  desc: "Entry to Okinawa World in Nanjo; the way in is through the Gyokusendo limestone cave",
  url: klookLink("https://www.klook.com/en-US/activity/37791-okinawa-world-ticket/"),
};

// ---------------------------------------------------------------------------
// Day 5 (task jtk-20261201-A35, run 28 Nov 2026): aquariums, museums and a ropeway
// with no page of their own. Activity ids from the www.klook.com search index that
// day (product pages still answer automated reads with 403, so no Klook price is
// printed). The Hakone Open-Air Museum page uses hakoneOpenAirMuseumTicket (22229)
// from lib/klook-links.ts. Every yen figure on the pages is the operator's own.
// ---------------------------------------------------------------------------

/** Kyoto Aquarium (Umekoji Park) — admission. */
export const kyotoAquariumTicket: KlookTour = {
  title: "Kyoto Aquarium admission ticket",
  desc: "Entry on the date you pick to the aquarium in Umekoji Park, about 15 minutes on foot from Kyoto Station",
  url: klookLink("https://www.klook.com/en-US/activity/15334-aquarium-admission-ticket-kyoto/"),
};

/** Kyoto Railway Museum (Umekoji) — admission. */
export const kyotoRailwayMuseumTicket: KlookTour = {
  title: "Kyoto Railway Museum ticket",
  desc: "Admission to JR West's railway museum in Umekoji Park, one stop from Kyoto Station",
  url: klookLink("https://www.klook.com/en-US/activity/27246-kyoto-railway-museum-ticket/"),
};

/** Kobe Nunobiki Herb Gardens & Ropeway — round-trip ropeway with garden entry. */
export const kobeNunobikiHerbGardensRopeway: KlookTour = {
  title: "Kobe Nunobiki Herb Gardens & Ropeway ticket",
  desc: "The round-trip ropeway from near Shin-Kobe Station up to the herb gardens and their observation deck",
  url: klookLink("https://www.klook.com/en-US/activity/37865-kobe-nunobiki-herb-gardens-ticket/"),
};

/** Noboribetsu Date Jidaimura (Edo-period theme village, Hokkaido) — admission. */
export const noboribetsuDateJidaimuraTicket: KlookTour = {
  title: "Noboribetsu Date Jidaimura ticket",
  desc: "Admission to the Edo-period village near Noboribetsu, with its ninja and samurai theatres",
  url: klookLink("https://www.klook.com/en-US/activity/25126-noboribetsu-date-jidaimura-ticket-hokkaido/"),
};

/** Kamogawa Sea World (Chiba) — admission. */
export const kamogawaSeaWorldTicket: KlookTour = {
  title: "Kamogawa Sea World ticket",
  desc: "Admission to the seaside aquarium in Kamogawa, Chiba, with its orca, beluga and dolphin performances",
  url: klookLink("https://www.klook.com/en-US/activity/33911-kamogawa-sea-world-ticket/"),
};

/** Enoshima Aquarium (Fujisawa) — admission. */
export const enoshimaAquariumTicket: KlookTour = {
  title: "Enoshima Aquarium ticket",
  desc: "Entry to the aquarium on Katase Beach facing Enoshima, with day-long re-entry",
  url: klookLink("https://www.klook.com/en-US/activity/41174-enoshima-aquarium/"),
};

/** Maxell Aqua Park Shinagawa — admission. */
export const maxellAquaParkShinagawaTicket: KlookTour = {
  title: "Maxell Aqua Park Shinagawa ticket",
  desc: "The aquarium inside the Shinagawa Prince Hotel, two minutes from Shinagawa Station, open into the evening",
  url: klookLink("https://www.klook.com/en-US/activity/5609-aqua-park-shinagawa-ticket-tokyo/"),
};

/** Port of Nagoya Public Aquarium — admission. */
export const portOfNagoyaAquariumTicket: KlookTour = {
  title: "Port of Nagoya Public Aquarium ticket",
  desc: "Admission to the aquarium at Nagoya Port's Garden Pier, with orcas, belugas and the dolphin performance",
  url: klookLink("https://www.klook.com/en-US/activity/1759-port-of-nagoya-public-aquarium-nagoya/"),
};

/** SCMAGLEV and Railway Park (JR Central, Kinjofuto) — admission. */
export const scmaglevRailwayParkTicket: KlookTour = {
  title: "SCMAGLEV and Railway Park ticket",
  desc: "Admission to JR Central's museum at Kinjofuto, Nagoya: 39 trains including the maglev and early shinkansen",
  url: klookLink("https://www.klook.com/en-US/activity/142201-scmaglev-and-railway-park-ticket/"),
};

// ---------------------------------------------------------------------------
// Day 6 (task jtk-20261202-A35, run 28 Nov 2026): theme parks, zoos and aquariums
// with no page of their own. Activity ids from the www.klook.com search index that
// day (product pages still answer automated reads with 403, so no Klook price is
// printed). LEGOLAND Discovery Center Tokyo uses legolandDiscoveryCenterTokyoTicket
// (5563) from lib/klook-links.ts and the Asahiyama Zoo page uses
// asahiyamaBieiHighlightsTour (161857) from lib/klook-links-winter-hokkaido.ts.
// Madame Tussauds Tokyo (13730) was dropped: its own site says it closed on
// 30 September 2026. Every yen figure on the pages is the operator's own.
// ---------------------------------------------------------------------------

/** JUNGLIA OKINAWA (northern Okinawa) — 1-day park ticket. */
export const jungliaOkinawaTicket: KlookTour = {
  title: "JUNGLIA OKINAWA ticket",
  desc: "Dated entry to the theme park in northern Okinawa, with Klook's options for the Premium Pass and the Churaumi combo",
  url: klookLink("https://www.klook.com/en-US/activity/141671-junglia-okinawa/"),
};

/** Nasu Safari Park (Tochigi) — admission. */
export const nasuSafariParkTicket: KlookTour = {
  title: "Nasu Safari Park ticket",
  desc: "Admission to the drive-through safari park in the Nasu highlands, Tochigi; the way you tour the safari zone (bus, rental car or your own car) costs extra",
  url: klookLink("https://www.klook.com/en-US/activity/45161-nasu-safar-park/"),
};

/** Tobu World Square (Kinugawa, Nikko) — admission. */
export const tobuWorldSquareTicket: KlookTour = {
  title: "Tobu World Square ticket",
  desc: "Admission to the park of miniature world landmarks in Kinugawa, exchanged for a paper ticket at the counter",
  url: klookLink("https://www.klook.com/en-US/activity/144433-tobu-world-square-admission-ticket-tochigi/"),
};

/** Tobu Zoo (Miyashiro, Saitama) — admission. */
export const tobuZooTicket: KlookTour = {
  title: "Tobu Zoo ticket",
  desc: "Admission to the zoo-and-amusement park ten minutes on foot from Tobu-Dobutsu-Koen Station",
  url: klookLink("https://www.klook.com/en-US/activity/6002-tobu-zoo-ticket-tokyo/"),
};

/** Meiji Mura (open-air architecture museum, Inuyama) — admission. */
export const meijiMuraTicket: KlookTour = {
  title: "Meiji Mura admission",
  desc: "Entry to the open-air museum of Meiji-era buildings near Inuyama, north of Nagoya",
  url: klookLink("https://www.klook.com/en-US/activity/83638-meiji-mura-admission/"),
};

/** Marine World Uminonakamichi (Fukuoka) — admission. */
export const marineWorldUminonakamichiTicket: KlookTour = {
  title: "Marine World Uminonakamichi ticket",
  desc: "Admission to Fukuoka's aquarium at Uminonakamichi, Higashi-ku, a QR voucher scanned at the gate",
  url: klookLink("https://www.klook.com/en-US/activity/28959-uminonakamichi-marine-world-ticket-fukuoka/"),
};

/** Otaru Aquarium (Shukutsu, Otaru) — admission. */
export const otaruAquariumTicket: KlookTour = {
  title: "Otaru Aquarium admission",
  desc: "Entry to the aquarium on the Shukutsu coast, a bus ride from JR Otaru Station",
  url: klookLink("https://www.klook.com/en-US/activity/141992-otaru-aquarium-admission/"),
};

/** Shinagawa Aquarium (Katsushima, Shinagawa) — admission. */
export const shinagawaAquariumTicket: KlookTour = {
  title: "Shinagawa Aquarium ticket",
  desc: "An e-ticket for the aquarium in Katsushima, Shinagawa (free bus from Oimachi Station), used any time within opening hours on the day",
  url: klookLink("https://www.klook.com/en-US/activity/45664-shinagawa-aquarium-tokyo/"),
};

// ---------------------------------------------------------------------------
// Day 7 (task jtk-20261203-A35, run 28 Nov 2026): onsen, parks and a museum with no
// page of their own. Activity ids from the www.klook.com search index that day
// (product pages still answer automated reads with 403, so no Klook price is printed).
// The Taiko no Yu, Fukuoka Tourist City Pass, Dazaifu & Yanagawa and Shirakawa-go bus
// pages use the existing constants in lib/klook-links.ts (1417, 94833, 152456, 149343).
// Dropped: Miyajima Aquarium (114213; its own site says it is closed 1 Dec 2026 –
// 31 Mar 2027), the Santa Maria cruise and the Mt. Fuji Panoramic Ropeway (their own
// sites could not be read that day). Every yen figure on the pages is the operator's own.
// ---------------------------------------------------------------------------

/** Spa World (Shinsekai, Osaka) — admission. */
export const spaWorldTicket: KlookTour = {
  title: "Spa World admission ticket",
  desc: "Entry to the 24-hour onsen complex by Shinsekai, with options for the pool and the stone saunas",
  url: klookLink("https://www.klook.com/en-US/activity/16107-spa-world-admission-ticket-osaka/"),
};

/** NIFREL (Expo '70 Commemorative Park, Suita) — e-ticket. */
export const nifrelTicket: KlookTour = {
  title: "NIFREL e-ticket",
  desc: "Entry to the Kaiyukan's 'living museum' of fish, birds and mammals at Expocity, a QR code scanned at the gate",
  url: klookLink("https://www.klook.com/en-US/activity/13116-nifrel-interactive-aquazoo-eticket-osaka/"),
};

/** Nago Pineapple Park (Nago, Okinawa) — admission. */
export const nagoPineappleParkTicket: KlookTour = {
  title: "Nago Pineapple Park ticket",
  desc: "Admission to the pineapple theme park in Nago, with the self-driving Pineapple Train ride, a QR code shown at the counter",
  url: klookLink("https://www.klook.com/en-US/activity/14671-nago-pineapple-park-ticket-okinawa-ishigaki/"),
};

/** Ryukyu Mura (Onna, Okinawa) — admission. */
export const ryukyuMuraTicket: KlookTour = {
  title: "Ryukyu Mura Village ticket",
  desc: "Entry to the Ryukyu village of old Okinawan houses in Onna, exchanged for a paper ticket at the gate",
  url: klookLink("https://www.klook.com/en-US/activity/13427-ryukyu-mura-churaumi-aquarium-ticket-okinawa/"),
};

/** Southeast Botanical Gardens (Okinawa City) — admission. */
export const southeastBotanicalGardensTicket: KlookTour = {
  title: "Southeast Botanical Gardens ticket",
  desc: "Day, night (illumination) or 1-day entry to the botanical gardens in Okinawa City, redeemed at the counter inside",
  url: klookLink("https://www.klook.com/en-US/activity/13582-southeast-botanical-gardens-e-ticket-okinawa/"),
};

/** Asakusa Hanayashiki (Asakusa, Tokyo) — admission / ride pass. */
export const hanayashikiTicket: KlookTour = {
  title: "Asakusa Hanayashiki ticket",
  desc: "Entry to the Asakusa amusement park that calls itself Japan's oldest, with a ride-pass option",
  url: klookLink("https://www.klook.com/en-US/activity/113292-asakusa-hanayashiki-attraction-experience/"),
};
