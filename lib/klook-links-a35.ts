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

// Day 8 (task jtk-20261204-A35, run 28 Nov 2026). Activity ids from the www.klook.com search index;
// prices on the pages are the operators' own, read 28 Nov 2026.

/** Sagamiko MORI MORI (Pleasure Forest) — admission, Illumillion season. */
export const sagamikoMoriMoriTicket: KlookTour = {
  title: "Sagamiko MORI MORI admission ticket",
  desc: "Entry to the hillside amusement park at Lake Sagami, home of the Sagamiko Illumillion light show",
  url: klookLink("https://www.klook.com/en-US/activity/38768-sagamiko-resort-pleasure-forest-ticket-tokyo/"),
};

/** Nabana no Sato (Kuwana, Mie) — winter illumination admission. */
export const nabanaNoSatoIlluminationTicket: KlookTour = {
  title: "Nabana no Sato illumination ticket",
  desc: "Entry to Nabana no Sato's winter illumination in Kuwana, with the park's ¥1,000 voucher and the Begonia Garden",
  url: klookLink("https://www.klook.com/en-US/activity/33097-nabana-no-sato-winter-illumination-ticket-kuwana/"),
};

/** Sanrio Harmonyland (Oita) — day passport. */
export const harmonylandTicket: KlookTour = {
  title: "Sanrio Harmonyland ticket",
  desc: "A day passport for Sanrio's character park in Oita Prefecture",
  url: klookLink("https://www.klook.com/en-US/activity/2610-sanrio-puroland-harmonyland-fukuoka/"),
};

/** Spa LaQua (Tokyo Dome City) — admission. */
export const spaLaquaTicket: KlookTour = {
  title: "Spa LaQua admission ticket",
  desc: "Entry to the natural hot-spring spa at Tokyo Dome City, with towels and loungewear included",
  url: klookLink("https://www.klook.com/en-US/activity/71618-spa-laqua-admission-tokyo/"),
};

/** Tokyo Toyosu Manyo Club (Senkyaku Banrai) — admission. */
export const manyoClubToyosuTicket: KlookTour = {
  title: "Toyosu Manyo Club onsen ticket",
  desc: "Entry to the onsen next to Toyosu Market, with yukata and towels included",
  url: klookLink("https://www.klook.com/en-US/activity/103671-toyosu-manyo-club-onsen-experience-tokyo/"),
};

/** Mother Farm (Futtsu, Chiba) — admission. */
export const motherFarmTicket: KlookTour = {
  title: "Mother Farm ticket",
  desc: "Entry to the farm park in Chiba, with animals and seasonal flowers",
  url: klookLink("https://www.klook.com/en-US/activity/5621-chiba-mother-farm-ticket-tokyo/"),
};

/** Toba Aquarium (Toba, Mie) — admission. */
export const tobaAquariumTicket: KlookTour = {
  title: "Toba Aquarium ticket",
  desc: "Entry to the aquarium near Toba Station on the Ise-Shima coast",
  url: klookLink("https://www.klook.com/en-US/activity/45815-toba-aquarium-admission-ticket/"),
};

/** Mt. Fuji Panoramic Ropeway (Kawaguchiko) — round trip. */
export const mtFujiPanoramicRopewayTicket: KlookTour = {
  title: "Mt. Fuji Panoramic Ropeway round trip",
  desc: "Return ride from Lake Kawaguchi to the Kachi Kachi Yama observation deck, with Mt. Fuji views",
  url: klookLink("https://www.klook.com/en-US/activity/89462-mt-fuji-panoramic-ropeway-round-trip-ticket-yamanashi/"),
};

/** Kawaguchiko Music Forest Museum — admission. */
export const kawaguchikoMusicForestTicket: KlookTour = {
  title: "Kawaguchiko Music Forest Museum ticket",
  desc: "Entry to the music-box museum and gardens on Lake Kawaguchi, with organ concerts in the hall",
  url: klookLink("https://www.klook.com/en-US/activity/85583-kawaguchiko-music-forest-museum-admission-admission-yamanashi/"),
};

/** Tokyo Dome City Attractions — ride passport. */
export const tokyoDomeCityAttractionsTicket: KlookTour = {
  title: "Tokyo Dome City Attractions ticket",
  desc: "Rides at the free-entry amusement park beside Tokyo Dome, including the Thunder Dolphin coaster",
  url: klookLink("https://www.klook.com/en-US/activity/17371-tokyo-dome-attractions-ticket-tokyo/"),
};

// Day 9 (task jtk-20261205-A35, run 28 Nov 2026). Activity ids from the www.klook.com search index;
// prices on the pages are the operators' own, read 28 Nov 2026.

/** Hirakata Park (Hirakata, Osaka) — admission. */
export const hirakataParkTicket: KlookTour = {
  title: "Hirakata Park ticket",
  desc: "Entry to the amusement park on the Keihan line between Osaka and Kyoto, with rides and the Winter Carnival in season",
  url: klookLink("https://www.klook.com/en-US/activity/49191-hirakata-park/"),
};

/** Moominvalley Park (Hanno, Saitama) — one-day pass. */
export const moominvalleyParkTicket: KlookTour = {
  title: "Moominvalley Park ticket",
  desc: "A one-day pass for the Moomin theme park by Lake Miyazawa in Hanno, Saitama",
  url: klookLink("https://www.klook.com/en-US/activity/36646-moominvalley-park-ticket-hanno/"),
};

/** Noboribetsu Bear Park (Noboribetsu Onsen) — admission with ropeway. */
export const noboribetsuBearParkTicket: KlookTour = {
  title: "Noboribetsu Bear Park ticket",
  desc: "Entry to the bear park above Noboribetsu Onsen, with the return ropeway ride included",
  url: klookLink("https://www.klook.com/en-US/activity/38936-noboribetsu-bear-park-ticket/"),
};

/** Hakone Glass Forest (Venetian Glass Museum, Sengokuhara) — admission. */
export const hakoneGlassMuseumTicket: KlookTour = {
  title: "Hakone Glass Forest ticket",
  desc: "Entry to the Venetian glass museum and garden in Sengokuhara, Hakone",
  url: klookLink("https://www.klook.com/en-US/activity/86036-hakone-venetian-glass-museum/"),
};

/** Mikimoto Pearl Island (Toba, Mie) — admission. */
export const mikimotoPearlIslandTicket: KlookTour = {
  title: "Mikimoto Pearl Island ticket",
  desc: "Entry to the Pearl Museum, the Memorial Hall and the ama diver demonstration in Toba",
  url: klookLink("https://www.klook.com/en-US/activity/38353-mikimoto-pearl-island-ticket/"),
};

/** Kids Plaza Osaka (Ogimachi) — admission. */
export const kidsPlazaOsakaTicket: KlookTour = {
  title: "Kids Plaza Osaka ticket",
  desc: "Entry to the hands-on children’s museum at Ogimachi in Osaka",
  url: klookLink("https://www.klook.com/en-US/activity/37845-kids-plaza-osaka-admission-ticket/"),
};

/** Shiroi Koibito Park (Sapporo) — paid-area admission. */
export const shiroiKoibitoParkTicket: KlookTour = {
  title: "Shiroi Koibito Park ticket",
  desc: "Entry to the paid area of the chocolate factory park in Sapporo, including the factory line",
  url: klookLink("https://www.klook.com/en-US/activity/204811-shiroi-koibito-park-admission-ticket/"),
};

/** Kyoto International Manga Museum (Karasuma-Oike) — admission. */
export const kyotoMangaMuseumTicket: KlookTour = {
  title: "Kyoto International Manga Museum ticket",
  desc: "Entry to the manga museum in a former school building at Karasuma-Oike, Kyoto",
  url: klookLink("https://www.klook.com/en-US/activity/67219-kyoto-international-manga-museum-ticket/"),
};

/** Tokyo National Museum (Ueno) — collection exhibitions. */
export const tokyoNationalMuseumTicket: KlookTour = {
  title: "Tokyo National Museum ticket",
  desc: "Entry to the collection exhibitions of the Tokyo National Museum in Ueno Park",
  url: klookLink("https://www.klook.com/en-US/activity/115796-tokyo-national-museum/"),
};

/** Ninja Museum of Igaryu (Iga, Mie) — admission. */
export const igaNinjaMuseumTicket: KlookTour = {
  title: "Ninja Museum of Igaryu ticket",
  desc: "Entry to the ninja house and museum in Ueno Park, Iga, with a guided tour of the trick house",
  url: klookLink("https://www.klook.com/en-US/activity/92163-ninja-museum-igaryu-admission-ticket-mie/"),
};

// Day 10 (task jtk-20261206-A35, run 28 Nov 2026). Activity ids from the www.klook.com search index;
// prices on the pages are the ski resorts' own, read 28 Nov 2026.

/** Rusutsu Resort — 1-day lift pass and round-trip bus from Sapporo. */
export const rusutsuLiftPassBusSapporo: KlookTour = {
  title: "Rusutsu 1-day lift pass & bus from Sapporo",
  desc: "A one-day Rusutsu lift pass with the round-trip ski bus from central Sapporo; the pass is valid only on the day of the bus",
  url: klookLink("https://www.klook.com/en-US/activity/98771-rusutsu-ski-resort-1-day-lift-pass-bus-package/"),
};

/** Sapporo Teine — round-trip bus and lift ticket from Sapporo. */
export const teineBusLiftTicket: KlookTour = {
  title: "Sapporo Teine bus & lift ticket",
  desc: "The round-trip bus from downtown Sapporo to Sapporo Teine with a lift ticket, collected at the resort counter with your booking reference",
  url: klookLink("https://www.klook.com/en-US/activity/36425-skiing-experience-sapporo-teine-ski-resort-bus-lift-ticket/"),
};

/** Furano Ski Resort — Hokkaido Ski Bus round trip from Sapporo with lift ticket. */
export const furanoSkiBusLiftTicket: KlookTour = {
  title: "Furano ski bus & lift ticket from Sapporo",
  desc: "The Hokkaido Ski Bus between Sapporo and Furano both ways, with the lift ticket handed out on board",
  url: klookLink("https://www.klook.com/en-US/activity/17974-shared-round-trip-bus-transfer-furano-ski-resort-lift-ticket/"),
};

/** Sapporo Kokusai Ski Resort (Jozankei) — lift ticket. */
export const sapporoKokusaiLiftTicket: KlookTour = {
  title: "Sapporo Kokusai Ski Resort lift ticket",
  desc: "A lift ticket for Sapporo Kokusai, the ski area above Jozankei in the south of Sapporo city",
  url: klookLink("https://www.klook.com/en-US/activity/189564-sapporo-kokusai-ski-resort-lift-ticket/"),
};

/** Hakuba Goryu & Hakuba47 — common lift ticket with ski or snowboard rental. */
export const hakubaGoryu47LiftRental: KlookTour = {
  title: "Hakuba Goryu & Hakuba47 lift ticket + rental",
  desc: "The common lift ticket for the linked Hakuba Goryu and Hakuba47 areas, with a ski or snowboard set",
  url: klookLink("https://www.klook.com/en-US/activity/239041-hakuba-goryu-hakuba47-lift-ticket-ski-snowboard-rental-hakuba-47/"),
};

/** Hakuba Tsugaike Kogen — 1-day lift ticket with optional gear and clothing rental. */
export const tsugaikeLiftTicketRental: KlookTour = {
  title: "Tsugaike Kogen lift ticket (rental optional)",
  desc: "A one-day Tsugaike Kogen lift ticket for the northern end of the Hakuba valley, with gear and ski-wear rental as options",
  url: klookLink("https://www.klook.com/en-US/activity/134928-tsugaike-kogen-ski-resort-lift-ticket-gear-clothing-rental/"),
};

/** Nozawa Onsen Ski Resort — 1-day lift ticket. */
export const nozawaOnsenLiftTicket: KlookTour = {
  title: "Nozawa Onsen 1-day lift ticket",
  desc: "A one-day lift ticket for Nozawa Onsen Ski Resort in northern Nagano",
  url: klookLink("https://www.klook.com/en-US/activity/136277-nozawa-onsen-ski-resort-lift-ticket/"),
};

// Day 11 (task jtk-20261207-A35, run 28 Nov 2026). Activity ids from the www.klook.com search index;
// prices on the pages are the operators' own, read 28 Nov 2026.

/** Naeba Ski Resort — 1-day lift ticket with a one-way direct bus from Narita Airport. */
export const naebaNaritaBusLiftTicket: KlookTour = {
  title: "Naeba lift ticket + bus from Narita Airport",
  desc: "A Naeba one-day lift ticket packaged with the direct bus from Narita Airport; the voucher is exchanged at the lift ticket counter in the Day Trip Ski Center",
  url: klookLink("https://www.klook.com/en-US/activity/97850-skiing-experience-while-enjoying-view-joetsu-border-dragondora-boasts-longest-lengths-world/"),
};

/** Karuizawa Prince Hotel Ski Resort — 1-day lift ticket (gear and bus options). */
export const karuizawaPrinceLiftTicket: KlookTour = {
  title: "Karuizawa Prince Hotel ski lift ticket",
  desc: "A one-day lift ticket for the Karuizawa Prince Hotel Ski Resort next to Karuizawa Station, shown on your phone to the staff on the day",
  url: klookLink("https://www.klook.com/en-US/activity/82221-1-day-join-skiing-nagano/"),
};

/** APPI Kogen Ski Resort (Iwate) — 1-day BLUE PASS lift ticket. */
export const appiKogenLiftTicket: KlookTour = {
  title: "APPI Kogen 1-day lift ticket (BLUE PASS)",
  desc: "A one-day BLUE PASS for APPI Kogen in Iwate, valid on every lift and the gondola; check the season named on the option",
  url: klookLink("https://www.klook.com/en-US/activity/102827-appi-kogen-ski-resort-1-day-lift-ticket-iwate/"),
};

/** Fujiten Snow Resort (Yamanashi) — lift ticket. */
export const fujitenLiftTicket: KlookTour = {
  title: "Fujiten Snow Resort lift ticket",
  desc: "A lift ticket for Fujiten, the ski area on the northern slope of Mt. Fuji near the Fuji Five Lakes",
  url: klookLink("https://www.klook.com/en-US/activity/142929-fujiten-snow-resort/"),
};

/** Myoko Suginohara Ski Resort (Niigata) — lift ticket. */
export const suginoharaLiftTicket: KlookTour = {
  title: "Myoko Suginohara lift ticket",
  desc: "A lift ticket for Myoko Suginohara, the Prince resort in Myoko, Niigata, scanned by the staff on the day",
  url: klookLink("https://www.klook.com/en-US/activity/82258-myoko-suginohara-ski-resort-lift-ticket-niigata/"),
};

/** Shizukuishi Ski Resort (Iwate) — 1-day lift ticket (listed as an early-bird ticket). */
export const shizukuishiLiftTicket: KlookTour = {
  title: "Shizukuishi Ski Resort 1-day lift ticket",
  desc: "A one-day lift ticket for Shizukuishi, the Prince resort below Mt. Iwate; Klook lists it as an early-bird ticket, so check the dates it covers",
  url: klookLink("https://www.klook.com/en-US/activity/100688-snow-resorts-northern-tohoku-view-majestic-mt-iwate/"),
};

/** Ishiuchi Maruyama Ski Resort (Niigata) — 1-day lift ticket. */
export const ishiuchiMaruyamaLiftTicket: KlookTour = {
  title: "Ishiuchi Maruyama 1-day lift ticket",
  desc: "A one-day lift ticket for Ishiuchi Maruyama, the large resort in Minami-Uonuma near Echigo-Yuzawa",
  url: klookLink("https://www.klook.com/en-US/activity/82610-1-day-join-skiing-ishiuchi-maruyama-ski-resort/"),
};

/** Kandatsu Snow Resort (Niigata) — 1-day lift ticket with gear and clothing rental. */
export const kandatsuLiftRental: KlookTour = {
  title: "Kandatsu 1-day lift ticket + rental",
  desc: "A one-day Kandatsu lift ticket with a ski or snowboard set and ski wear; unused tickets or rentals are not refunded",
  url: klookLink("https://www.klook.com/en-US/activity/134936-kandatsu-snow-resort-1-day-lift-ticket-with-gear-clothing-rental/"),
};

/** Maiko Snow Resort (Niigata) — 1-day lift ticket. */
export const maikoLiftTicket: KlookTour = {
  title: "Maiko Snow Resort 1-day lift ticket",
  desc: "A one-day Maiko lift ticket collected from the automatic machine with the QR code, so you can skip the counter",
  url: klookLink("https://www.klook.com/en-US/activity/98089-maiko-snow-resort/"),
};

/** Shin-Hotaka Ropeway (Gifu) — round trip on the No. 1 and No. 2 ropeways. */
export const shinhotakaRopewayTicket: KlookTour = {
  title: "Shin-Hotaka Ropeway round-trip ticket",
  desc: "The round trip from Shin-Hotaka Onsen to Nishi-Hotakaguchi on both ropeways; boarding from the middle station is not allowed",
  url: klookLink("https://www.klook.com/en-US/activity/134705-shin-hotaka-ropeway-round-trip-ticket/"),
};

// Day 12 (task jtk-20261208-A35, run 28 Nov 2026). Activity ids from the www.klook.com search index;
// prices on the pages are the operators' own, read 28 Nov 2026.

/** Solaniwa Onsen Osaka Bay Tower — admission ticket. */
export const solaniwaOnsenTicket: KlookTour = {
  title: "Solaniwa Onsen admission ticket",
  desc: "Entry to Solaniwa Onsen, the onsen theme park at Osaka Bay Tower in Bentencho, with yukata and towels included",
  url: klookLink("https://www.klook.com/en-US/activity/21381-solaniwa-onsen-admission-ticket-osaka/"),
};

/** Hells of Beppu (Beppu Jigoku Meguri) — common ticket for the seven hells. */
export const beppuJigokuTicket: KlookTour = {
  title: "Hells of Beppu ticket (all seven hells)",
  desc: "One ticket for the seven hot-spring hells of Beppu, exchanged at the first hell you visit",
  url: klookLink("https://www.klook.com/en-US/activity/29063-beppu-jigoku-onsen-ticket/"),
};

/** Suzuka Circuit Park (Mie) — park passport with unlimited rides, or admission only. */
export const suzukaCircuitParkTicket: KlookTour = {
  title: "Suzuka Circuit Park ticket",
  desc: "A dated Suzuka Circuit Park ticket: the park passport with unlimited rides, admission only, or a fast ride add-on",
  url: klookLink("https://www.klook.com/en-US/activity/38434-suzukacircuit-motopia-amusement-park-pass/"),
};

/** Yokohama Anpanman Children's Museum — dated admission ticket. */
export const yokohamaAnpanmanMuseumTicket: KlookTour = {
  title: "Yokohama Anpanman Children's Museum ticket",
  desc: "A dated ticket for the 2nd and 3rd floor museum in Minatomirai; valid only at the Yokohama museum",
  url: klookLink("https://www.klook.com/en-US/activity/181093-yokohama-anpanman-chidlren-museum/"),
};

/** Busena Marine Park (Okinawa) — underwater observatory and glass-bottom boat tickets. */
export const busenaMarineParkTicket: KlookTour = {
  title: "Busena Underwater Observatory + glass-bottom boat",
  desc: "Tickets for the Busena underwater observatory and the glass-bottom boat at Busena Marine Park in Nago",
  url: klookLink("https://www.klook.com/en-US/activity/45330-Busena-Underwater-Observatory-and-glass-bottom-boat-tickets-Okinawa/"),
};

/** Sendai Umino-Mori Aquarium — admission ticket. */
export const uminoMoriAquariumTicket: KlookTour = {
  title: "Sendai Umino-Mori Aquarium ticket",
  desc: "Admission to the Sendai Umino-Mori Aquarium; the voucher is exchanged for a ticket at the ticket office",
  url: klookLink("https://www.klook.com/en-US/activity/43404-uminomori-aquarium-sendai/"),
};

/** Aqua World Ibaraki Oarai Aquarium — admission ticket. */
export const aquaWorldOaraiTicket: KlookTour = {
  title: "Aqua World Oarai Aquarium ticket",
  desc: "An e-voucher for the Ibaraki Prefectural Oarai Aquarium, scanned by the staff at the entrance",
  url: klookLink("https://www.klook.com/en-US/activity/37909-aqua-world-ibaraki-oarai-aquarium-ticket/"),
};

/** Fujiko F Fujio Museum (Kawasaki) — timed admission ticket. */
export const fujikoMuseumTicket: KlookTour = {
  title: "Fujiko F Fujio Museum (Doraemon) ticket",
  desc: "A timed ticket for the Doraemon creator's museum in Kawasaki; the museum sells no tickets at the door",
  url: klookLink("https://www.klook.com/en-US/activity/5952-fujiko-f-fujio-museum-ticket-tokyo/"),
};

/** Izu Shaboten Zoo (Ito, Shizuoka) — web admission ticket. */
export const izuShabotenZooTicket: KlookTour = {
  title: "Izu Shaboten Zoo ticket",
  desc: "A web ticket for Izu Shaboten Zoo, home of the capybara hot bath; the voucher is scanned at the gate",
  url: klookLink("https://www.klook.com/en-US/activity/32135-izu-shaboten-zoo-ticket-nagoya/"),
};

/** Shikoku Aquarium (Utazu, Kagawa) — admission ticket. */
export const shikokuAquariumTicket: KlookTour = {
  title: "Shikoku Aquarium ticket",
  desc: "Admission to the Shikoku Aquarium on the Seto Inland Sea shore in Utazu, Kagawa",
  url: klookLink("https://www.klook.com/en-US/activity/74358-shikoku-aquarium/"),
};

/** iZoo reptile zoo (Kawazu, Izu) — admission ticket. */
export const izooTicket: KlookTour = {
  title: "iZoo reptile zoo ticket",
  desc: "Admission to iZoo, the reptile and amphibian zoo in Kawazu on the Izu Peninsula",
  url: klookLink("https://www.klook.com/en-US/activity/45323-izoo-izu/"),
};

/** Sendai day trip — Shiogama Shrine, a Matsushima Bay cruise and Chuson-ji. */
export const matsushimaChusonjiDayTour: KlookTour = {
  title: "Matsushima, Shiogama & Chuson-ji day trip from Sendai",
  desc: "A day tour from Sendai Station to Shiogama Shrine, Matsushima with a bay cruise, and Chuson-ji in Hiraizumi",
  url: klookLink("https://www.klook.com/en-US/activity/147070-one-day-tour-to-shiogama-shrine-matsushima-and-chusonji-temple/"),
};

/** Day tour from Tokyo — Oarai Isosaki Shrine, Hitachi Seaside Park and the Ashikaga illumination. */
export const hitachiAshikagaIlluminationTour: KlookTour = {
  title: "Hitachi Seaside Park & Ashikaga illumination day tour",
  desc: "A day tour from Tokyo to Isosaki Shrine on the Oarai coast, Hitachi Seaside Park and the Ashikaga Flower Fantasy illumination",
  url: klookLink("https://www.klook.com/en-US/activity/168925-hitachi-seaside-park-ashikaga-flower-park-illumination-day-tour/"),
};

/** Day trip from Tokyo — Ashikaga Flower Park, strawberry picking and Sano outlets. */
export const ashikagaStrawberryOutletTour: KlookTour = {
  title: "Ashikaga Flower Park, strawberries & Sano outlets day trip",
  desc: "A day trip from Tokyo with Ashikaga Flower Park, all-you-can-eat strawberries and Sano Premium Outlets",
  url: klookLink("https://www.klook.com/en-US/activity/83823-ashikaga-flower-park-bus-tour-tokyo/"),
};

/** Ryobi ferry Takamatsu – Shodoshima (Ikeda Port) round trip. */
export const shodoshimaFerryTakamatsu: KlookTour = {
  title: "Takamatsu – Shodoshima ferry round trip",
  desc: "A round-trip ferry ticket from Takamatsu to Ikeda Port on Shodoshima",
  url: klookLink("https://www.klook.com/en-US/activity/69511-ryobi-shodoshima-ferry-round-trip-ticket/"),
};

/** Kagawa private day tour by car from Takamatsu (Kotohira-gu, Takaya Shrine, Naruto, Shikoku Aquarium). */
export const takamatsuCharterCarTour: KlookTour = {
  title: "Kagawa private car day tour from Takamatsu",
  desc: "An 8-hour private car tour from Takamatsu that can include Kotohira-gu, Takaya Shrine, the Naruto whirlpools and the Shikoku Aquarium",
  url: klookLink("https://www.klook.com/en-US/activity/90937-takamatsu-departure-1-day-customize-charter-car-tour/"),
};

// Day 13 (task jtk-20261209-A35, run 28 Nov 2026). Activity ids from the www.klook.com search index;
// prices on the pages are the operators' own, read 28 Nov 2026.

/** Shin-Yokohama Ramen Museum — admission voucher. */
export const shinYokohamaRamenMuseumTicket: KlookTour = {
  title: "Shin-Yokohama Ramen Museum admission",
  desc: "Entry to the Shin-Yokohama Ramen Museum; the voucher is scanned at the entrance and exchanged for a printed ticket",
  url: klookLink("https://www.klook.com/en-US/activity/135117-shin-yokohama-ramen-museum/"),
};

/** The Railway Museum (Omiya, Saitama) — dated advance admission ticket. */
export const railwayMuseumSaitamaTicket: KlookTour = {
  title: "The Railway Museum (Saitama) admission ticket",
  desc: "A dated, timed advance ticket for JR East's Railway Museum in Omiya, entered by QR code",
  url: klookLink("https://www.klook.com/en-US/activity/95382-railway-museum-admission-ticket-saitama/"),
};

/** Kobe Suma Sea World — admission ticket. */
export const kobeSumaSeaworldTicket: KlookTour = {
  title: "Kobe Suma Sea World ticket",
  desc: "Admission to Kobe Suma Sea World, the orca aquarium on Suma beach in Kobe",
  url: klookLink("https://www.klook.com/en-US/activity/151011-kobe-suma-seaworld/"),
};

/** Kouri Ocean Tower (Nakijin, Okinawa) — observation deck ticket. */
export const kouriOceanTowerTicket: KlookTour = {
  title: "Kouri Ocean Tower observation deck ticket",
  desc: "Entry to the Kouri Ocean Tower on Kouri Island, with the observation deck and the shell museum",
  url: klookLink("https://www.klook.com/en-US/activity/29033-kouri-ocean-tower-observation-deck-ticket-okinawa/"),
};

/** Noboribetsu Marine Park Nixe (Hokkaido) — admission ticket. */
export const nixeMarineParkTicket: KlookTour = {
  title: "Noboribetsu Marine Park Nixe ticket",
  desc: "Admission to the aquarium castle at Noboribetsu, a few minutes on foot from JR Noboribetsu Station; the voucher is exchanged at the ticket office",
  url: klookLink("https://www.klook.com/en-US/activity/14723-noboribetsu-marine-park-nixe-admission-ticket-hokkaido/"),
};

/** Nasu Highland Park (Tochigi) — admission ticket. */
export const nasuHighlandParkTicket: KlookTour = {
  title: "Nasu Highland Park admission",
  desc: "Admission to Nasu Highland Park, the amusement park on the Nasu plateau",
  url: klookLink("https://www.klook.com/en-US/activity/88851-nasu-highland-park-admission-nasu-tochigi/"),
};

/** Atagawa Tropical & Alligator Garden (Higashi-Izu) — e-ticket. */
export const atagawaAlligatorGardenTicket: KlookTour = {
  title: "Atagawa Tropical & Alligator Garden ticket",
  desc: "An e-ticket for the alligator, tropical plant and fruit gardens by Izu-Atagawa Station, shown to the staff at the gate",
  url: klookLink("https://www.klook.com/en-US/activity/46218-atagawa-tropical-alligator-garden-shizuoka/"),
};

/** LEGOLAND Discovery Center Osaka (Tempozan) — dated ticket. */
export const legolandDiscoveryOsakaTicket: KlookTour = {
  title: "LEGOLAND Discovery Center Osaka ticket",
  desc: "A dated ticket for the indoor LEGO attraction in Tempozan Marketplace, Osaka Bay",
  url: klookLink("https://www.klook.com/en-US/activity/9612-legoland-discovery-center-ticket-osaka/"),
};

/** Nagoya Higashiyama Zoo and Botanical Gardens — admission, Sky Tower or both. */
export const higashiyamaZooTicket: KlookTour = {
  title: "Higashiyama Zoo and Botanical Gardens ticket",
  desc: "Admission to Nagoya's Higashiyama Zoo and Botanical Gardens, with options for the Sky Tower",
  url: klookLink("https://www.klook.com/en-US/activity/134600-nagoya-city-higashiyama-zoo-and-botanical-gardens/"),
};

/** Nasu Kogen Rindo Lake Family Ranch — 1-day admission (direct entry). */
export const rindoLakeFamilyRanchTicket: KlookTour = {
  title: "Rindo Lake Family Ranch admission",
  desc: "A one-day direct-entry admission to the lakeside ranch and amusement park in Nasu Kogen",
  url: klookLink("https://www.klook.com/en-US/activity/87214-1-day-nasu-kogen-rindo-lake-family-ranch-direct-entry-admission/"),
};
