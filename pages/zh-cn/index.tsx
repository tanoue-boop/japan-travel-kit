import LocaleHome, { localeHomeRoutes } from "../../components/LocaleHome";
import { pageUpdated } from "../../lib/page-dates";
import { monthLabel } from "../../lib/i18n";

/** /zh-cn — the 简体中文 edition's entry page. See components/LocaleHome.tsx. */
const LOCALE = "zh-cn" as const;

export const getStaticProps = () => ({
  props: {
    dates: Object.fromEntries(
      localeHomeRoutes(LOCALE).map((route) => [route, monthLabel(pageUpdated(route).iso, LOCALE)]),
    ),
  },
});

export default function ZhCnHomePage({ dates }: { dates: Record<string, string> }) {
  return <LocaleHome locale={LOCALE} dates={dates} />;
}
