import LocaleHome, { localeHomeRoutes } from "../../components/LocaleHome";
import { pageUpdated } from "../../lib/page-dates";
import { monthLabel } from "../../lib/i18n";

/** /th — the ไทย edition's entry page. See components/LocaleHome.tsx. */
const LOCALE = "th" as const;

export const getStaticProps = () => ({
  props: {
    dates: Object.fromEntries(
      localeHomeRoutes(LOCALE).map((route) => [route, monthLabel(pageUpdated(route).iso, LOCALE)]),
    ),
  },
});

export default function ThHomePage({ dates }: { dates: Record<string, string> }) {
  return <LocaleHome locale={LOCALE} dates={dates} />;
}
