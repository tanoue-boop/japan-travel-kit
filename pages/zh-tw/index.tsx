import LocaleHome, { localeHomeRoutes } from "../../components/LocaleHome";
import { pageUpdated } from "../../lib/page-dates";
import { monthLabel } from "../../lib/i18n";

/**
 * /zh-tw — the 繁體中文 edition's entry page. Everything about it, including its
 * <title> and its place in the hreflang cluster, lives in components/LocaleHome.tsx
 * and lib/i18n.ts; see the note at the top of that component for why these four
 * pages exist.
 *
 * The "Updated" month of each card is resolved here rather than in the component,
 * because lib/page-dates reads git history through node:fs — an import a page may
 * make (it is dropped with getStaticProps) and a client component may not.
 */
const LOCALE = "zh-tw" as const;

export const getStaticProps = () => ({
  props: {
    dates: Object.fromEntries(
      localeHomeRoutes(LOCALE).map((route) => [route, monthLabel(pageUpdated(route).iso, LOCALE)]),
    ),
  },
});

export default function ZhTwHomePage({ dates }: { dates: Record<string, string> }) {
  return <LocaleHome locale={LOCALE} dates={dates} />;
}
