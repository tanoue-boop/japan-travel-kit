import { useRouter } from "next/router";
import { localeOf, type Locale } from "../lib/i18n";

/**
 * The language a shared block renders its own fixed words in.
 *
 * Added 2026-11-01 (task jtk-20261101-A15). KlookTourPicks, KlookTripPrep,
 * KlookStayAreas, GygCompare and CityGuideIndex were written for the English pages
 * and carried their eyebrows, button labels and disclosure lines in English, which is
 * why the translated editions left them out — and with them the links that pay. Each
 * now takes an optional `locale`; without one it reads the route, the way
 * components/IntlChrome.tsx does, so a block on /ko/… renders Korean and a block on an
 * English page renders exactly what it rendered before.
 */
export function useComponentLocale(locale?: Locale): Locale {
  const router = useRouter();
  return locale ?? localeOf(router.pathname);
}
