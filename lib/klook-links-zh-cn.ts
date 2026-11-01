/**
 * Klook links for the 简体中文 pages.
 *
 * Every entry is the *same Klook product* the English and 繁體中文 pages link to,
 * pointed at Klook's own zh-CN locale path and tracked with `?aid=119070` — the
 * plain page-URL form documented in the Klook affiliate dashboard, which is also
 * what lib/klook-links.ts uses for everything added since October 2026 and what
 * lib/klook-links-zh-tw.ts uses for all of its entries.
 *
 * Why not reuse the zh-TW URLs: a Klook locale path decides the language *and* the
 * default currency of the checkout. A reader in Singapore or Malaysia sent to
 * /zh-TW/ lands on Traditional Chinese priced in TWD, which is the same mistake as
 * sending a Taiwanese reader to an en-US checkout — the thing these editions exist
 * to avoid. The product ids (the number at the front of each slug) are Klook's and
 * are locale-independent: /en-US/activity/70672-…, /zh-TW/activity/70672-… and
 * /zh-CN/activity/70672-… are the same listing.
 *
 * The labels are not conversions of the zh-TW ones. They use the vocabulary these
 * readers use: 流量卡 rather than 網卡, 一日游 rather than 一日遊, 快速通行证 rather
 * than 快速通關, 往返 rather than 來回.
 *
 * No price appears here, for the same reason as in the other two modules: Klook
 * answers automated reads of its product pages with HTTP 403, so there is no figure
 * that could have been verified.
 */
import { KLOOK_AID } from "./klook-links";

/** A Klook zh-CN page URL with our affiliate id appended. */
export function klookZhCn(path: string): string {
  const url = `https://www.klook.com/zh-CN/${path}`;
  return `${url}${url.includes("?") ? "&" : "?"}aid=${KLOOK_AID}`;
}

export type ZhCnKlookProduct = {
  /** Product name as the 简体中文 page refers to it. */
  label: string;
  url: string;
};

const product = (label: string, path: string): ZhCnKlookProduct => ({ label, url: klookZhCn(path) });

// ── Attraction tickets ──────────────────────────────────────────────────────
// en-US counterpart: shibuyaSkyTicketUrl (aff_adid 1299140); zh-TW: zhShibuyaSky
export const cnShibuyaSky = product("涩谷SKY 门票", "activity/70672-shibuya-sky-tokyo/");

// en-US counterpart: teamlabPlanetsTicketUrl (aff_adid 1299131); zh-TW: zhTeamlabPlanets
export const cnTeamlabPlanets = product(
  "teamLab Planets TOKYO 丰洲 门票",
  "activity/25300-teamlab-planets-toyosu-tokyo-ticket/",
);

// en-US counterpart: teamlabBorderlessTicketUrl (aff_adid 1299135); zh-TW: zhTeamlabBorderless
export const cnTeamlabBorderless = product(
  "teamLab 无界 麻布台之丘 门票",
  "activity/20707-teamlab-borderless-admission-ticket-tokyo/",
);

// en-US counterpart: the DISNEY_TICKET_URL redirect (aff_adid 1304885)
export const cnTokyoDisney = product("东京迪士尼一日票", "activity/695-tokyo-disney-resort-1-day-pass-tokyo/");

// en-US counterpart: the STUDIO_PASS_URL redirect (aff_adid 1299137)
export const cnUsjStudioPass = product(
  "日本环球影城门票（Studio Pass）",
  "activity/46604-universal-studios-japan-e-ticket-osaka-qr-code-direct-entry/",
);

// en-US counterpart: the EXPRESS_PASS_URL redirect (aff_adid 1299138)
export const cnUsjExpressPass = product(
  "日本环球影城快速通行证（Express Pass）",
  "activity/3407-universal-studios-japan-express-pass-osaka/",
);

export const cnSkytreeTicket = product("东京晴空塔门票", "activity/41352-tokyo-skytree/");

// ── 大阪：道顿堀的游船，以及包含其中一艘的通票 ──────────────────────────────
// en-US counterparts: osakaAmazingPass, dotonboriCityCruise,
// dotonboriNaniwaSightseeingBoat。Klook 任何语系都没有运营方自营的「とんぼりリバー
// クルーズ」单独商品页，所以简体中文页照英文页的写法直接说明，而不把这几艘当成那一艘。
export const cnOsakaAmazingPass = product("大阪周游卡（1日／2日）", "activity/82312-amazing-pass-osaka/");

export const cnDotonboriCityCruise = product(
  "道顿堀 City Cruise 游船",
  "activity/65390-city-cruise-experience-osaka/",
);

export const cnDotonboriNaniwaBoat = product(
  "大阪道顿堀 浪花观光游船",
  "activity/176566-osaka-dotonbori-river-cruise/",
);

// ── Mt. Fuji day tours ──────────────────────────────────────────────────────
export const cnFujiHakoneDayTour = product("富士山＋箱根一日游", "activity/75806-fuji-hakone-day-tour/");

export const cnFujiDayTour = product(
  "富士山五合目、河口湖、忍野八海＋御殿场一日游",
  "activity/10233-mt-fuji-lake-kawaguchi-oshino-hakkai-gotemba-trip-tokyo/",
);

export const cnFujiSubaruLineHakoneBusTour = product(
  "富士山Subaru Line五合目、芦之湖＋箱根拼团巴士一日游",
  "activity/84103-fuji-subaru-line-5th-station-lake-ashi-hakone-join-one-day-bus-tour-tokyo/",
);

export const cnFujiHakoneBulletTrainTour = product(
  "富士山＋箱根一日游（可选新干线返程）",
  "activity/21108-mt-fuji-lake-ashi-owakudani-tokyo/",
);

export const cnTokyoSightseeingBusTour = product(
  "东京市区观光巴士一日游",
  "activity/5672-amazing-sightseeing-bus-day-tour-tokyo/",
);

// ── Airport transfers and city transport ────────────────────────────────────
// en-GB counterpart: naritaExpressRoundTripUrl (aff_adid 1264853)
export const cnNaritaExpress = product(
  "成田特快 N'EX 往返车票",
  "activity/173165-narita-express-n-ex-round-trip-train-ticket-narita-airport-tokyo/",
);

// en-GB counterpart: keiseiSkylinerUrl (aff_adid 1264854)
export const cnKeiseiSkyliner = product("京成 Skyliner 车票", "activity/1410-skyliner-tokyo/");

// en-GB counterpart: the Narita limousine bus redirect (aff_adid 1264852)
export const cnNaritaLimousineBus = product(
  "成田机场利木津巴士",
  "activity/2274-narita-airport-limousine-bus-tokyo/",
);

// en-GB counterpart: the Haneda limousine bus redirect (aff_adid 1264856)
export const cnHanedaLimousineBus = product(
  "羽田机场利木津巴士",
  "activity/150434-haneda-airport-limousine-bus-tokyo/",
);

export const cnTokyoSubwayTicket = product("东京地铁通票（24／48／72小时）", "activity/1552-subway-ticket-tokyo/");

// ── eSIM (the 20% commission band) ──────────────────────────────────────────
export const cnKlookEsim = product(
  "Klook 日本 eSIM 流量卡",
  "activity/109393-japan-esim-high-speed-internet-qr-code-voucher/",
);

// ── "Book for the same day" (added 1 Nov 2026) ──────────────────────────────
// For the Shibuya Sky and USJ pages. en-US counterparts, in order:
// shinjukuNightFoodWalkingTour, tokyoPrivateAirportTransfer, the Universal City
// hotel search in usjStayAreas[0], jrHarukaUrl and absoluteOsakaFoodTour. Same
// product ids on Klook's zh-CN path; each listing was confirmed live on
// www.klook.com on 1 Nov 2026.
export const cnShinjukuNightFoodTour = product(
  "新宿夜间美食导览（回忆横丁・歌舞伎町・黄金街）",
  "activity/102521-shinjuku-food-tour-tokyo-join-3-hr-walking-tour-omoide-yokocho-kabukicho-golden-gai/",
);

export const cnTokyoPrivateAirportTransfer = product(
  "成田・羽田机场 ⇄ 东京 专车接送",
  "activity/23053-private-haneda-narita-airport-transfers-tokyo/",
);

export const cnUsjHotels = product("日本环球影城周边酒店", "destination/p50014852-universal-studios-japan/3-hotel/");

export const cnJrHaruka = product("JR HARUKA 关西机场特急车票", "activity/18400-jr-haruka-airport-express-train-tickets-osaka/");

export const cnOsakaFoodTour = product("大阪美食导览（道顿堀小巷）", "activity/86986-osaka-join-half-day-food-tour/");
