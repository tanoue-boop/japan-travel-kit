/**
 * Klook links for the ไทย pages.
 *
 * Every entry is the *same Klook product* the English, Chinese and Korean pages link
 * to, pointed at Klook's own `th` locale path and tracked with `?aid=119070` — the
 * plain page-URL form documented in the Klook affiliate dashboard, which is also
 * what lib/klook-links.ts uses for everything added since October 2026 and what the
 * other localised modules use for all of their entries.
 *
 * Why the locale path matters: it decides the language *and* the default currency of
 * the checkout. A Thai reader sent to /en-US/ lands on an English page priced in USD;
 * /th/ gives them Thai and THB, which is the whole reason this edition exists. The
 * product ids (the number at the front of each slug) are Klook's and are
 * locale-independent, and the slug after the id is Klook's own English slug in every
 * locale: /en-US/activity/70672-shibuya-sky-tokyo/ and
 * /th/activity/70672-shibuya-sky-tokyo/ are the same listing. The /th/ storefront
 * itself was checked through Klook's own indexed Thai pages
 * (klook.com/th/blog/how-to-buy-japan-train-tickets-online/); Klook answers
 * automated reads of its product pages with HTTP 403, so no price or availability
 * could be verified here, and none is quoted.
 */
import { KLOOK_AID } from "./klook-links";

/** A Klook th page URL with our affiliate id appended. */
export function klookTh(path: string): string {
  const url = `https://www.klook.com/th/${path}`;
  return `${url}${url.includes("?") ? "&" : "?"}aid=${KLOOK_AID}`;
}

export type ThKlookProduct = {
  /** Product name as the Thai page refers to it. */
  label: string;
  url: string;
};

const product = (label: string, path: string): ThKlookProduct => ({ label, url: klookTh(path) });

// ── Attraction tickets ──────────────────────────────────────────────────────
// en-US counterpart: shibuyaSkyTicketUrl (aff_adid 1299140)
export const thShibuyaSky = product("ตั๋ว Shibuya Sky", "activity/70672-shibuya-sky-tokyo/");

// en-US counterpart: teamlabPlanetsTicketUrl (aff_adid 1299131)
export const thTeamlabPlanets = product(
  "ตั๋ว teamLab Planets TOKYO (โทโยสุ)",
  "activity/25300-teamlab-planets-toyosu-tokyo-ticket/",
);

// en-US counterpart: the DISNEY_TICKET_URL redirect (aff_adid 1304885)
export const thTokyoDisney = product("บัตร 1-Day Passport โตเกียวดิสนีย์รีสอร์ท", "activity/695-tokyo-disney-resort-1-day-pass-tokyo/");

// en-US counterpart: the STUDIO_PASS_URL redirect (aff_adid 1299137)
export const thUsjStudioPass = product(
  "Studio Pass ยูนิเวอร์แซล สตูดิโอ เจแปน",
  "activity/46604-universal-studios-japan-e-ticket-osaka-qr-code-direct-entry/",
);

// en-US counterpart: the EXPRESS_PASS_URL redirect (aff_adid 1299138)
export const thUsjExpressPass = product(
  "Express Pass ยูนิเวอร์แซล สตูดิโอ เจแปน",
  "activity/3407-universal-studios-japan-express-pass-osaka/",
);

// ── Day tours, for the "what to do with the rest of the day" blocks ─────────
export const thFujiHakoneDayTour = product("ทัวร์ 1 วัน ภูเขาไฟฟูจิ＋ฮาโกเน่", "activity/75806-fuji-hakone-day-tour/");

export const thFujiDayTour = product(
  "ทัวร์ 1 วัน ฟูจิชั้น 5・ทะเลสาบคาวากูจิโกะ・โอชิโนะฮักไก＋โกเทมบะ",
  "activity/10233-mt-fuji-lake-kawaguchi-oshino-hakkai-gotemba-trip-tokyo/",
);

export const thTokyoSightseeingBusTour = product(
  "ทัวร์รถบัสชมเมืองโตเกียว 1 วัน",
  "activity/5672-amazing-sightseeing-bus-day-tour-tokyo/",
);

// ── eSIM (the 20% commission band) ──────────────────────────────────────────
export const thKlookEsim = product(
  "eSIM ญี่ปุ่นจาก Klook",
  "activity/109393-japan-esim-high-speed-internet-qr-code-voucher/",
);
