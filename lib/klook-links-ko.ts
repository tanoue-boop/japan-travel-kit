/**
 * Klook links for the 한국어 pages.
 *
 * Every entry is the *same Klook product* the English and Chinese pages link to,
 * pointed at Klook's own `ko` locale path and tracked with `?aid=119070` — the plain
 * page-URL form documented in the Klook affiliate dashboard, which is also what
 * lib/klook-links.ts uses for everything added since October 2026 and what the two
 * Chinese modules use for all of their entries.
 *
 * Why the locale path matters: it decides the language *and* the default currency of
 * the checkout. A Korean reader sent to /en-US/ lands on an English page priced in
 * USD; /ko/ gives them Korean and KRW, which is the whole reason this edition
 * exists. The product ids (the number at the front of each slug) are Klook's and are
 * locale-independent, and the slug after the id is Klook's own English slug in every
 * locale: /en-US/activity/70672-shibuya-sky-tokyo/ and
 * /ko/activity/70672-shibuya-sky-tokyo/ are the same listing. Klook's own Korean
 * magazine links the same ids (klook.com/ko/blog/70672-shibuya-sky-tokyo-kr/,
 * .../695-tokyo-disney-resort-1-day-pass-tokyo-kr/), which is how the pairing was
 * checked — Klook answers automated reads of its product pages with HTTP 403, so no
 * price or availability could be verified here, and none is quoted.
 */
import { KLOOK_AID } from "./klook-links";

/** A Klook ko page URL with our affiliate id appended. */
export function klookKo(path: string): string {
  const url = `https://www.klook.com/ko/${path}`;
  return `${url}${url.includes("?") ? "&" : "?"}aid=${KLOOK_AID}`;
}

export type KoKlookProduct = {
  /** Product name as the Korean page refers to it. */
  label: string;
  url: string;
};

const product = (label: string, path: string): KoKlookProduct => ({ label, url: klookKo(path) });

// ── Attraction tickets ──────────────────────────────────────────────────────
// en-US counterpart: shibuyaSkyTicketUrl (aff_adid 1299140)
export const koShibuyaSky = product("시부야 스카이 입장권", "activity/70672-shibuya-sky-tokyo/");

// en-US counterpart: teamlabPlanetsTicketUrl (aff_adid 1299131)
export const koTeamlabPlanets = product(
  "팀랩 플래닛 도쿄(도요스) 입장권",
  "activity/25300-teamlab-planets-toyosu-tokyo-ticket/",
);

// en-US counterpart: the DISNEY_TICKET_URL redirect (aff_adid 1304885)
export const koTokyoDisney = product("도쿄 디즈니 리조트 1데이 패스포트", "activity/695-tokyo-disney-resort-1-day-pass-tokyo/");

// en-US counterpart: the STUDIO_PASS_URL redirect (aff_adid 1299137)
export const koUsjStudioPass = product(
  "유니버설 스튜디오 재팬 스튜디오 패스",
  "activity/46604-universal-studios-japan-e-ticket-osaka-qr-code-direct-entry/",
);

// en-US counterpart: the EXPRESS_PASS_URL redirect (aff_adid 1299138)
export const koUsjExpressPass = product(
  "유니버설 스튜디오 재팬 익스프레스 패스",
  "activity/3407-universal-studios-japan-express-pass-osaka/",
);

// ── Day tours, for the "what to do with the rest of the day" blocks ─────────
export const koFujiHakoneDayTour = product("후지산＋하코네 1일 투어", "activity/75806-fuji-hakone-day-tour/");

export const koFujiDayTour = product(
  "후지산 5합목·가와구치코·오시노핫카이＋고텐바 1일 투어",
  "activity/10233-mt-fuji-lake-kawaguchi-oshino-hakkai-gotemba-trip-tokyo/",
);

export const koTokyoSightseeingBusTour = product(
  "도쿄 시내 관광 버스 1일 투어",
  "activity/5672-amazing-sightseeing-bus-day-tour-tokyo/",
);

// ── eSIM (the 20% commission band) ──────────────────────────────────────────
export const koKlookEsim = product(
  "클룩 일본 eSIM",
  "activity/109393-japan-esim-high-speed-internet-qr-code-voucher/",
);
