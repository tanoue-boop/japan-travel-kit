import Link from "next/link";
import LocaleHome, { localeHomeRoutes } from "../../components/LocaleHome";
import { pageUpdated } from "../../lib/page-dates";
import { monthLabel } from "../../lib/i18n";

/**
 * /zh-cn — the 简体中文 edition's entry page. See components/LocaleHome.tsx.
 *
 * The lead (task-jtk-20261122-C01) answers the question the 日本旅行指南 searcher is
 * asking — 去日本旅行要准备什么？ — in the first body paragraph, with in-text links to
 * the ticket hub, the eSIM, airport and winter guides, which the card list alone does not give.
 */
const LOCALE = "zh-cn" as const;

export const getStaticProps = () => ({
  props: {
    dates: Object.fromEntries(
      localeHomeRoutes(LOCALE).map((route) => [route, monthLabel(pageUpdated(route).iso, LOCALE)]),
    ),
  },
});

export default function ZhCnHomePage({ dates }: { dates: Record<string, string> }) {
  return (
    <LocaleHome
      locale={LOCALE}
      dates={dates}
      lead={{
        eyebrow: "行前准备",
        title: "去日本旅行要准备什么？",
        desc: "三样要在出发前办好：要指定日期的门票、日本 eSIM，以及从机场到住宿的交通。",
        body: (
          <>
            东京迪士尼和日本环球影城门口不卖票、约 2 个月前开售，SHIBUYA SKY 在入场日 2 周前的日本时间 0:00 开售，
            哪些要先订、官方票价多少，请看{" "}
            <Link href="/zh-cn/guides/attractions">日本景点门票总览</Link>；上网用的 eSIM 出发前装好，比较见{" "}
            <Link href="/zh-cn/guides/esim/best-esim-japan">日本eSIM推荐</Link>；从成田、羽田到市区怎么走，见{" "}
            <Link href="/zh-cn/guides/transport/tokyo-airport-transfer">东京机场交通攻略</Link>。
            12 月到 2 月出发，白川乡亮灯和札幌雪祭的日期是固定的，先看{" "}
            <Link href="/zh-cn/guides/attractions/japan-winter-itinerary">日本冬季行程 2026-27</Link>。
          </>
        ),
      }}
    />
  );
}
