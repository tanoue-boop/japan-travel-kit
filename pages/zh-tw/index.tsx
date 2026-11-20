import Link from "next/link";
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
 *
 * The lead (task-jtk-20261120-I01) mirrors the /ko one: an in-text link to each
 * teamLab page, which the card list alone does not give.
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
  return (
    <LocaleHome
      locale={LOCALE}
      dates={dates}
      lead={{
        eyebrow: "東京先訂這兩個",
        title: "teamLab 門票怎麼買？",
        desc: "東京兩間 teamLab 都要指定入場時段，最好先訂。",
        body: (
          <>
            豐洲的 Planets 與麻布台之丘的無界是兩張不同的門票。Planets 要赤腳涉水、現場不售票，成人 ¥3,800 起，
            價格、入場時段與從新豐洲站怎麼走，請看{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-planets-tickets">teamLab Planets 門票</Link>攻略；
            還在兩館之間猶豫，請看{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 與無界比較</Link>。
          </>
        ),
      }}
    />
  );
}
