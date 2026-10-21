import LocaleHome, { localeHomeRoutes } from "../../components/LocaleHome";
import { pageUpdated } from "../../lib/page-dates";
import { monthLabel } from "../../lib/i18n";

/** /ko — the 한국어 edition's entry page. See components/LocaleHome.tsx. */
const LOCALE = "ko" as const;

export const getStaticProps = () => ({
  props: {
    dates: Object.fromEntries(
      localeHomeRoutes(LOCALE).map((route) => [route, monthLabel(pageUpdated(route).iso, LOCALE)]),
    ),
  },
});

export default function KoHomePage({ dates }: { dates: Record<string, string> }) {
  return <LocaleHome locale={LOCALE} dates={dates} />;
}
