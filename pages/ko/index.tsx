import Link from "next/link";
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
  return (
    <LocaleHome
      locale={LOCALE}
      dates={dates}
      lead={{
        eyebrow: "도쿄에서 먼저 예약할 것",
        title: "팀랩과 도쿄 디즈니랜드, 어떻게 예약할까?",
        desc: "도쿄 일정에서 날짜가 먼저 마감되는 두 가지입니다.",
        body: (
          <>
            팀랩은 플래닛(도요스)과 보더리스(아자부다이힐스)가 서로 다른 티켓입니다. 아이와 함께라면 플래닛,
            작품 감상이 목적이면 보더리스 — 차이는{" "}
            <Link href="/ko/guides/attractions/teamlab-tokyo-tickets">팀랩 플래닛 보더리스 비교</Link>에
            정리했습니다. 도쿄 디즈니랜드·디즈니씨는 모든 티켓이 날짜 지정이고 현장 판매가 없으며 방문 2개월 전
            14시에 예약이 시작되므로, 가격과 예약 방법, 랜드·씨 선택 기준은{" "}
            <Link href="/ko/guides/attractions/tokyo-disney-tickets">도쿄 디즈니 티켓</Link> 가이드에서
            먼저 확인하세요. 2월에 홋카이도로 간다면 먼저 예약할 것은 숙소입니다. 행사장 3곳이 모두 무료인 2027년
            2월 4~11일의 일정과 축제 전후의 당일 투어는{" "}
            <Link href="/ko/guides/attractions/sapporo-snow-festival-tours">삿포로 눈축제 투어</Link> 가이드에
            정리했습니다.
          </>
        ),
      }}
    />
  );
}
