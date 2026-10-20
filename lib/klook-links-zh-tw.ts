/**
 * Klook links for the 繁體中文 pages.
 *
 * Every entry is the *same Klook product* the English page links to, pointed at
 * Klook's own zh-TW locale path and tracked with `?aid=119070` — the plain
 * page-URL form documented in the Klook affiliate dashboard, which is also the
 * form lib/klook-links.ts uses for everything added since October 2026.
 *
 * Where the English page still uses the older `affiliate.klook.com/redirect?…
 * &aff_adid=…&k_site=<escaped en-US url>` form (Shibuya Sky, the two teamLab
 * museums, Tokyo Disney, the two USJ passes, the airport trains and buses), the
 * Chinese page uses the zh-TW page URL of that same product with `?aid=` instead.
 * A redirect link carries a hard-coded en-US `k_site`, so reusing one would land a
 * Taiwanese reader on an English checkout — which is the whole thing this edition
 * exists to avoid. The English links themselves are untouched.
 *
 * The product ids (the number at the front of each slug) are Klook's and are
 * locale-independent: /en-US/activity/70672-… and /zh-TW/activity/70672-… are the
 * same listing. No price appears here, for the same reason as in the English
 * module: Klook answers automated reads of its product pages with HTTP 403, so
 * there is no figure that could have been verified.
 */
import { KLOOK_AID } from "./klook-links";

/** A Klook zh-TW page URL with our affiliate id appended. */
export function klookZhTw(path: string): string {
  const url = `https://www.klook.com/zh-TW/${path}`;
  return `${url}${url.includes("?") ? "&" : "?"}aid=${KLOOK_AID}`;
}

export type ZhKlookProduct = {
  /** Product name as the Chinese page refers to it. */
  label: string;
  url: string;
};

const product = (label: string, path: string): ZhKlookProduct => ({ label, url: klookZhTw(path) });

// ── Attraction tickets ──────────────────────────────────────────────────────
// en-US counterpart: shibuyaSkyTicketUrl (aff_adid 1299140)
export const zhShibuyaSky = product("澀谷SKY 門票", "activity/70672-shibuya-sky-tokyo/");

// en-US counterpart: teamlabPlanetsTicketUrl (aff_adid 1299131)
export const zhTeamlabPlanets = product(
  "teamLab Planets TOKYO 豐洲 門票",
  "activity/25300-teamlab-planets-toyosu-tokyo-ticket/",
);

// en-US counterpart: teamlabBorderlessTicketUrl (aff_adid 1299135)
export const zhTeamlabBorderless = product(
  "teamLab 無界 麻布台之丘 門票",
  "activity/20707-teamlab-borderless-admission-ticket-tokyo/",
);

// en-US counterpart: the DISNEY_TICKET_URL redirect (aff_adid 1304885)
export const zhTokyoDisney = product("東京迪士尼一日護照", "activity/695-tokyo-disney-resort-1-day-pass-tokyo/");

// en-US counterpart: the STUDIO_PASS_URL redirect (aff_adid 1299137)
export const zhUsjStudioPass = product(
  "日本環球影城門票（Studio Pass）",
  "activity/46604-universal-studios-japan-e-ticket-osaka-qr-code-direct-entry/",
);

// en-US counterpart: the EXPRESS_PASS_URL redirect (aff_adid 1299138)
export const zhUsjExpressPass = product(
  "日本環球影城快速通關（Express Pass）",
  "activity/3407-universal-studios-japan-express-pass-osaka/",
);

export const zhSkytreeTicket = product("東京晴空塔門票", "activity/41352-tokyo-skytree/");

// ── Mt. Fuji day tours ──────────────────────────────────────────────────────
export const zhFujiHakoneDayTour = product("富士山＋箱根一日遊", "activity/75806-fuji-hakone-day-tour/");

export const zhFujiDayTour = product(
  "富士山五合目、河口湖、忍野八海＋御殿場一日遊",
  "activity/10233-mt-fuji-lake-kawaguchi-oshino-hakkai-gotemba-trip-tokyo/",
);

export const zhFujiSubaruLineHakoneBusTour = product(
  "富士山Subaru Line五合目、蘆之湖＋箱根拼團巴士一日遊",
  "activity/84103-fuji-subaru-line-5th-station-lake-ashi-hakone-join-one-day-bus-tour-tokyo/",
);

export const zhFujiHakoneBulletTrainTour = product(
  "富士山＋箱根一日遊（可選新幹線回程）",
  "activity/21108-mt-fuji-lake-ashi-owakudani-tokyo/",
);

export const zhTokyoSightseeingBusTour = product(
  "東京市區觀光巴士一日遊",
  "activity/5672-amazing-sightseeing-bus-day-tour-tokyo/",
);

// ── Airport transfers and city transport ────────────────────────────────────
// en-GB counterpart: naritaExpressRoundTripUrl (aff_adid 1264853)
export const zhNaritaExpress = product(
  "成田特快 N'EX 來回車票",
  "activity/173165-narita-express-n-ex-round-trip-train-ticket-narita-airport-tokyo/",
);

// en-GB counterpart: keiseiSkylinerUrl (aff_adid 1264854)
export const zhKeiseiSkyliner = product("京成 Skyliner 車票", "activity/1410-skyliner-tokyo/");

// en-GB counterpart: the Narita limousine bus redirect (aff_adid 1264852)
export const zhNaritaLimousineBus = product(
  "成田機場利木津巴士",
  "activity/2274-narita-airport-limousine-bus-tokyo/",
);

// en-GB counterpart: the Haneda limousine bus redirect (aff_adid 1264856)
export const zhHanedaLimousineBus = product(
  "羽田機場利木津巴士",
  "activity/150434-haneda-airport-limousine-bus-tokyo/",
);

export const zhTokyoSubwayTicket = product("東京地鐵通票（24／48／72小時）", "activity/1552-subway-ticket-tokyo/");

// ── eSIM (the 20% commission band) ──────────────────────────────────────────
export const zhKlookEsim = product(
  "Klook 日本 eSIM 網卡",
  "activity/109393-japan-esim-high-speed-internet-qr-code-voucher/",
);
