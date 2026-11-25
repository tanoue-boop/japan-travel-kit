import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import { seoTags } from "../../../../components/IntlSeo";
import {
  KLOOK_REL,
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import {
  akihabaraGoKartTour,
  asakusaGoKartTour,
  asakusaSensojiWalkingTour,
  klookEsim,
  shibuyaAnnexGoKartTour,
  shinjukuNightFoodWalkingTour,
  tokyoBayGoKartTour,
  tokyoGoKartingListUrl,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/tokyo-go-kart) section by section as of
// 2026-11-24 (task-jtk-20261124-TR03): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added. Title term:
// 도쿄 고카트 — the name Korean guides and Klook's Korean listings use for the street kart tour.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/tokyo-go-kart";
const TITLE = "도쿄 고카트 2026: 가격, 국제운전면허증, 코스";
const H1 = "도쿄 고카트 2026: 가격, 국제운전면허증, 코스 정리";
const DESC =
  "도쿄 고카트는 공식 요금표 기준 1인 ¥5,000~¥25,000입니다. 1949년 제네바 협약 국제운전면허증, 자국 운전면허증, 여권이 필요합니다.";

const LAST_CHECKED = "2026-11-15";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);
const NPA_CHECKED = dateLabel("2026-11-07", LOCALE);

// The English page's Akiba Kart Shibuya listing (its GOKART_URL), on Klook's ko path.
const GOKART_URL = klookFor(
  "https://www.klook.com/en-US/activity/116875-shibuya-go-karting-experience-by-akiba-kart-shibuya/",
  LOCALE,
);
const ANNEX_URL = klookFor(shibuyaAnnexGoKartTour.url, LOCALE);
const AKIHABARA_URL = klookFor(akihabaraGoKartTour.url, LOCALE);
const BAY_URL = klookFor(tokyoBayGoKartTour.url, LOCALE);
const ASAKUSA_URL = klookFor(asakusaGoKartTour.url, LOCALE);
const LIST_URL = klookFor(tokyoGoKartingListUrl, LOCALE);
const BUS_URL = klookFor(tokyoSightseeingBusTour.url, LOCALE);
const FOOD_WALK_URL = klookFor(shinjukuNightFoodWalkingTour.url, LOCALE);
const ASAKUSA_WALK_URL = klookFor(asakusaSensojiWalkingTour.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const srcStyle = { color: "var(--text-muted)" } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  { shop: "코스 선택이 고민이라면: 시부야 아넥스점(H2-S)", route: "도겐자카, 시부야 스크램블 교차로, 오모테산도, 하라주쿠", time: "약 1시간", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: ANNEX_URL, bookLabel: "클룩 시부야 아넥스점" },
  { shop: "시부야점(H-S)", route: "시부야 스크램블 교차로, 하라주쿠, 오모테산도", time: "약 1시간", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: GOKART_URL, bookLabel: "클룩 시부야점" },
  { shop: "아키하바라 1호점(A1-S)", route: "아키하바라 중심가", time: "약 1시간", day: "¥9,000", evening: "¥12,000", regular: "¥15,000", book: AKIHABARA_URL, bookLabel: "클룩 아키하바라점" },
  { shop: "아키하바라 2호점(A2-S)", route: "아키하바라, 도쿄역, 긴자", time: "약 1시간", day: "¥9,000", evening: "표시 없음", regular: "¥15,000", book: AKIHABARA_URL, bookLabel: "클룩 아키하바라점" },
  { shop: "아키하바라 2호점(A2-M)", route: "고쿄(황궁) 주변, 하라주쿠, 시부야 스크램블 교차로", time: "1.5~2시간", day: "¥12,000", evening: "¥17,500", regular: "¥20,000", book: AKIHABARA_URL, bookLabel: "클룩 아키하바라점" },
  { shop: "도쿄 베이점(K-M)", route: "레인보우 브리지, 도쿄 타워", time: "1.5~2시간", day: "¥14,000", evening: "¥22,000", regular: "¥25,000", book: BAY_URL, bookLabel: "클룩 도쿄 베이점" },
  { shop: "시나가와점(S-S)", route: "시나가와에서 도쿄 타워까지", time: "약 1시간", day: "¥14,000", evening: "¥16,000", regular: "¥20,000", book: LIST_URL, bookLabel: "클룩 도쿄 고카트 목록" },
  { shop: "아사쿠사점(Samurai-S)", route: "아사쿠사 일대", time: "45분~1시간", day: "¥5,000", evening: "¥6,000", regular: "¥12,000", book: ASAKUSA_URL, bookLabel: "클룩 아사쿠사점" },
];

const licenceRows = [
  { doc: "대부분의 여행자에게 해당: 1949년 제네바 협약 책자형 국제운전면허증 + 자국 운전면허증 + 여권", drive: "가능", note: "여행 전 본국에서 발급받은 책자형만 인정됩니다. 카드형, 디지털형, 낱장형 국제운전면허증과 사본은 인정되지 않습니다" },
  { doc: "1968년 비엔나 협약에 따라 발급된 국제운전면허증만 있는 경우", drive: "불가", note: "JAF에 따르면 일본에서는 1949년 제네바 협약 국제운전면허증만 유효합니다. 표지에 1968이라고 적혀 있다면 스트리트 카트는 먼저 연락해 달라고 안내합니다" },
  { doc: "일본 운전면허증", drive: "가능", note: "스트리트 카트의 면허 안내 페이지에 가장 먼저 적혀 있습니다. 원동기장치자전거 및 이륜차 면허는 해당하지 않습니다" },
  { doc: "스위스, 독일, 프랑스, 대만, 벨기에, 모나코 면허증 + 공인 일본어 번역문", drive: "가능", note: "국제운전면허증 대신 공인 일본어 번역문을 사용합니다. JAF는 일본 국내에서만 온라인 신청을 받습니다" },
  { doc: "SOFA 운전면허증(주일 미군용)", drive: "가능", note: "스트리트 카트 면허 안내 페이지에 나와 있습니다" },
  { doc: "면허증이 없거나, 1949년 제네바 협약 대상이 아닌 국가의 면허증", drive: "불가", note: "동승석이 없고, 매장에서 당일 어떤 서류도 발급할 수 없습니다" },
];

const includedRows = [
  { item: "인솔 가이드와 카트", status: "포함", note: "먼저 안전 교육을 받고, 가이드 1명이 운전자를 최대 6명까지 인솔합니다" },
  { item: "연료", status: "포함", note: "참가자가 직접 주유할 필요는 없습니다" },
  { item: "기본 보험", status: "포함", note: "보상 한도: 대인 배상 ¥80,000,000, 대물 배상 ¥20,000,000, 운전자 상해 ¥5,000,000" },
  { item: "카트 파손 자기부담금", status: "불포함", note: "카트 1대당 ¥50,000이며, 카트가 파손되면 투어 직후 청구됩니다" },
  { item: "종합 보장 보험", status: "선택 사항", note: "대인 배상, 대물 배상, 카트 손해의 보상 한도가 없어지며, 운전자 상해 보상이 ¥30,000,000으로 늘어납니다" },
  { item: "코스튬 의상", status: "예약 내용 확인", note: "체크인할 때 의상을 고를 수 있으며, 유료 대여·구매용 의상도 있습니다" },
  { item: "액션 카메라", status: "선택 사항", note: "매장에서 대여하거나 직접 가져올 수 있습니다" },
  { item: "국제운전면허증 또는 번역문", status: "불포함", note: "직접 준비해야 하며, 매장에서는 둘 다 발급할 수 없습니다" },
];

const fitRows = [
  { rule: "최소 나이", value: "18세", source: "클룩 아키하바라 상품 페이지와 클룩 고카트 가이드" },
  { rule: "키", value: "클룩 아키하바라 상품은 150~185cm, 아키바 카트 시부야 상품은 150~190cm", source: "클룩 상품 페이지" },
  { rule: "몸무게", value: "100kg 미만", source: "클룩 아키하바라 상품 페이지" },
  { rule: "운전 실력", value: "자동 변속 카트이며, 일반 도로를 달릴 수 있는 운전 실력이 있어야 합니다", source: "스트리트 카트 FAQ와 이용 약관" },
  { rule: "복장", value: "하이힐, 샌들, 긴 치마는 안 됩니다", source: "스트리트 카트 매장 페이지" },
];

const startRows = [
  { shop: "아키하바라 1호점", address: "지요다구 소토칸다 4-12-9", access: "스에히로초역 1번 출구에서 3분, JR 아키하바라역에서 7분" },
  { shop: "아키하바라 2호점", address: "지요다구 간다사쿠마초 4-16-7", access: "JR 아키하바라역(쇼와도리 출구)에서 8분" },
  { shop: "시부야점", address: "시부야구 마루야마초 15-3", access: "게이오 이노카시라선 신센역에서 3분, JR 시부야역에서 15분" },
  { shop: "시부야 아넥스점", address: "마루야마초 10-11 더 시티 시부야 2층", access: "게이오 이노카시라선 신센역에서 5분, JR 시부야역에서 15분" },
  { shop: "시나가와점", address: "시나가와구 기타시나가와 1-23-15", access: "게이큐 기타시나가와역에서 5분, JR 시나가와역에서 15분" },
  { shop: "아사쿠사점", address: "다이토구 니시아사쿠사 3-25-31", access: "도쿄 메트로 아사쿠사역에서 8분" },
  { shop: "도쿄 베이점", address: "고토구 신키바 2-10-8", access: "신키바역에서 10~13분" },
];

const whoFor = [
  {
    title: "정식 면허가 있고 운전에 자신 있는 분",
    desc: "자국에서 발급받은 유효한 정식 운전면허증이 있고, 실제 도로 운전에 익숙하며, 출국 전에 국제운전면허증을 준비한 분께 맞습니다. 놀이기구가 아니라 운전면허증이 있는 성인을 위한 투어입니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h2l1-3h12l1 3h2" />
        <path d="M5 12v5h14v-5" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    title: "색다른 시선으로 도쿄를 보고 싶은 분",
    desc: "도쿄 타워, 오다이바, 레인보우 브리지 일대 같은 명소 주변을 지붕 없는 카트로 달리며 낮은 시선에서 바람을 맞으며 도심 풍경을 보고 싶은 분께 맞습니다. 인기 코스는 경치가 좋고 가이드가 이끌기 때문에 앞에서 인솔하는 가이드를 따라가면 됩니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "일본에서 운전할 수 없는 분은 이용할 수 없습니다",
    desc: "18세 미만이거나, 면허증이 없거나, 일본에서 인정하지 않는 국가의 운전면허증이라면 이 카트를 합법적으로 운전할 수 없습니다. 투어 당일 매장에서 서류 문제를 해결할 방법이 없으므로 예약 전에 서류를 준비하세요.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "출국 전에 본국에서 국제운전면허증을 발급받으세요",
    desc: "1949년 제네바 협약 국제운전면허증은 본국에서만 발급되며, 일본에서는 발급받을 수 없습니다. 반드시 종이 책자형이어야 하고, 카드형, 디지털형, 낱장형 국제운전면허증은 인정되지 않으며, 온라인에서는 위조 국제운전면허증을 파는 업체도 있습니다. 스위스, 독일, 프랑스, 대만, 벨기에, 모나코 면허증이라면 대신 공인 일본어 번역문이 필요합니다. JAF는 일본 국내에서만 온라인 신청을 받고 발급까지 평균 2~3영업일이 걸리므로, 여행 초반에 그 시간을 확보하거나 일본에 있는 자국 대사관이나 영사관에 문의하세요.",
  },
  {
    title: "국제운전면허증, 자국 운전면허증, 여권 원본 세 가지를 챙기세요",
    desc: "당일에는 자국에서 발급받은 실물 운전면허증, 국제운전면허증(또는 JAF나 대사관 번역문), 여권을 모두 원본으로 가져가야 합니다. 사본, 휴대폰 사진, 디지털 면허증은 인정되지 않으며, 원본 없이 도착하면 투어에 참가할 수 없고 환불도 받을 수 없습니다.",
  },
  {
    title: "참가 조건을 충족하는지 확인하세요",
    desc: `클룩 상품 페이지에 적힌 최소 연령은 18세이며, 면허증은 일본에서 유효한 운전면허증이어야 합니다(1949년 제네바 협약 국제운전면허증, 또는 해당 국가의 번역문). 원동기장치자전거 및 이륜차 면허는 해당하지 않습니다. 스트리트 카트는 예약 후 서류 사진을 보내면 미리 확인해 준다고 안내합니다. 카트는 1인승이라 동승할 수 없습니다. 스트리트 카트 규정은 ${CHECKED}, 클룩 나이 제한은 ${NPA_CHECKED}에 확인했습니다.`,
  },
  {
    title: "미리 예약하고, 안전 교육 시간에 맞춰 일찍 도착하세요",
    desc: `온라인으로 시간대를 예약하고 코스를 고르세요. 스트리트 카트는 서류 확인과 안전 교육을 위해 예약 시간 30분 전까지 매장에 도착하라고 안내하며, 늦게 오면 참가할 수 없습니다. 일본은 좌측통행입니다. 투어는 처음부터 끝까지 앞에서 인솔하는 가이드를 따라 진행됩니다. ${CHECKED} 기준 안내입니다.`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도쿄 고카트를 타려면 면허증이 필요한가요?",
    a: "필요합니다. 도쿄의 스트리트 카트는 일반 도로를 달리므로 일본 운전면허증, 또는 자국 운전면허증과 1949년 제네바 협약 책자형 국제운전면허증, 여권이 모두 원본으로 필요합니다. 스위스, 독일, 프랑스, 대만, 벨기에, 모나코 면허증은 국제운전면허증 대신 공인 일본어 번역문이 필요합니다. 국제운전면허증은 여행 전 본국에서만 발급받을 수 있습니다.",
  },
  {
    q: "도쿄 고카트 가격은 얼마인가요?",
    a: `스트리트 카트의 2026년 11월 공식 요금표 기준 최저 요금은 1인당 아사쿠사 45분~1시간 코스 ¥5,000, 아키하바라 ¥9,000, 시부야 ¥16,000이고, 1.5~2시간인 아키하바라와 도쿄 베이 코스는 ¥12,000~¥14,000입니다. 정가는 최대 ¥25,000입니다. ${CHECKED} 확인.`,
  },
  {
    q: "1968년 비엔나 협약 국제운전면허증을 일본에서 쓸 수 있나요?",
    a: "쓸 수 없습니다. JAF는 일본에서 유효한 것은 1949년 제네바 협약 국제운전면허증뿐이며, 1968년 비엔나 협약 등 다른 협약의 국제운전면허증은 유효하지 않다고 밝힙니다. 스트리트 카트는 유효한 국제운전면허증은 대부분 표지에 1949가 적혀 있다고 덧붙이며, 1968이라고 적혀 있다면 먼저 연락해 달라고 안내합니다.",
  },
  {
    q: "비 오는 날이나 겨울에도 도쿄 고카트를 탈 수 있나요?",
    a: "원칙적으로 탈 수 있습니다. 스트리트 카트는 보통 날씨와 관계없이 투어를 진행하며, 진행 여부가 확실하지 않으면 매장에 문의하라고 안내합니다. 도쿄의 모든 매장 요금표에 12월~2월을 포함한 12개월 내내 예약 가능한 시간대가 있습니다. 다만 이용 약관상 투어를 중단, 취소, 변경할 수 있습니다.",
  },
  {
    q: "도쿄 스트리트 카트는 안전하고 합법인가요?",
    a: "일본에서 유효한 면허증이 있다면 합법입니다. 스트리트 카트의 카트는 일본 일반 도로용으로 만들어졌고, 유효한 서류가 없는 운전자는 참가할 수 없습니다. 좌측통행의 실제 도로를 달리며, 가이드 1명이 최대 6명을 인솔하고, 기본 보험이 포함되며, 코스에는 고속도로 구간이 없습니다.",
  },
];

const picks = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "도쿄 관광버스 1일 투어",
    desc: "고쿄(황궁) 정원, 아사쿠사, 도쿄 스카이트리를 도는 가이드 동행 투어로, 다국어 오디오 안내가 있습니다.",
  }),
  withKlookLocale(shinjukuNightFoodWalkingTour, LOCALE, {
    title: "신주쿠 야간 푸드 투어: 오모이데요코초, 가부키초, 골든가이",
    desc: "해가 진 뒤 오모이데요코초, 가부키초, 골든가이를 3시간 동안 걷는 그룹 투어로, 현지 음식점 세 곳에서의 시식과 골든가이 이자카야 음료 한 잔이 포함됩니다.",
  }),
  { title: "클룩 일본 eSIM", desc: "QR 코드 바우처로 받는 일본 eSIM으로, 여행 내내 지도 앱과 메신저를 쓸 수 있습니다.", url: ESIM_URL },
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "도쿄 서브웨이 티켓(24/48/72시간)",
    desc: "도쿄 메트로와 도에이 지하철 전 노선을 횟수 제한 없이 탈 수 있으며, 현장에서 줄을 서서 살 필요 없이 도착 후 받을 수 있습니다.",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "도쿄 고카트" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.88rem" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" style={srcStyle}>
      {children}
    </a>
  );
}

export default function KoTokyoGoKartPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG.ko }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel} 업데이트</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            일반 도로를 달릴 수 있는 고카트를 직접 운전해 도쿄 타워, 레인보우 브리지 일대 등 도쿄의 명소를 지나는 투어입니다.
            주의할 점은 운전에 필요한 서류입니다. 국제운전면허증은 출국 전에 본국에서만 발급받을 수 있습니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "국제운전면허증 필수", "18세 이상"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            도쿄에서 고카트를 운전하려면 일본 운전면허증, 또는 자국 운전면허증과 <strong>1949년 제네바 협약</strong>에 따라 발급된
            책자형 국제운전면허증, 여권이 필요합니다. 1968년 비엔나 협약에 따라 발급된 국제운전면허증만으로는 인정되지 않습니다. 스트리트
            카트의 2026년 11월 공식 요금표 기준 1시간 코스의 최저 요금은 1인당 <strong>¥5,000</strong>(아사쿠사),{" "}
            <strong>¥9,000</strong>(아키하바라), <strong>¥16,000</strong>(시부야)이고, 1.5~2시간 코스는{" "}
            <strong>¥12,000</strong>(아키하바라), <strong>¥14,000</strong>(레인보우 브리지를 건너는 도쿄 베이)부터이며,
            정가는 최대 ¥25,000입니다. 투어는 시부야, 아키하바라, 아사쿠사, 시나가와, 도쿄 베이(신키바) 매장에서 출발하고,
            서류 원본이 없는 운전자는 참가할 수 없으며 환불도 받을 수 없습니다. {CHECKED} 확인.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 시부야 고카트 보기 →
            </KlookLink>
          </div>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>핵심 정보</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1인 가격</p>
                <p className={styles.verdictStatValue}>약 ¥5,000~¥25,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>투어 시간</p>
                <p className={styles.verdictStatValue}>45분~2시간, 가이드 동행</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>운전에 필요한 서류</p>
                <p className={styles.verdictStatValue}>국제운전면허증 + 자국 운전면허증 + 여권</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>국제운전면허증 발급</p>
                <p className={styles.verdictStatValue}>출국 전 본국에서</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약하면</strong> 예약은 쉽고, 대부분의 여행자가 어려움을 겪는 부분은 서류 준비입니다. 국제운전면허증은 출국 전
              본국에서<em>만</em> 발급받을 수 있고, 일본에서 받을 방법이 없으며, 투어 당일 매장에서 서류 문제를 해결할 방법도 없습니다.
              서류만 준비해 두면 나머지 절차는 어렵지 않습니다.
            </p>
            <KlookLink href={GOKART_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              도쿄 스트리트 고카트 보기 →
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>일본의 스트리트 카트란 무엇이고, 도쿄 고카트 투어는 어떻게 진행되나요?</h2>
          <p className={styles.bodyText}>
            도쿄 스트리트 고카트 투어는 일반 도로를 달릴 수 있는 작은 카트를 직접 운전해 가이드의 인솔에 따라 줄지어 도심
            도로를 달리는 투어입니다. 인기 코스는 레인보우 브리지, 도쿄 타워, 오다이바, 시부야 일대 같은 주요 관광 명소를
            지나기 때문에, 열차나 버스에서는 볼 수 없는 지붕 없는 카트에서 도로와 가까운 낮은 시선으로 도시 풍경을 볼 수 있습니다. 투어 중에 입을 수 있는
            일반 코스튬 의상도 보통 준비되어 있습니다.
          </p>
          <p className={styles.bodyText}>
            먼저 알아 둘 점이 있습니다. 이 투어는 특정 브랜드와 관련 없는 <strong>일반 스트리트 고카트 체험</strong>입니다.{" "}
            <strong>어떤 비디오 게임, 캐릭터, 엔터테인먼트 브랜드와도 제휴, 후원, 공식 인증 관계가 없으며</strong>, 제공되는
            코스튬 의상도 특정 캐릭터와 관계없는 일반 의상입니다. 이 투어의 매력은 운전 그 자체이고, 그래서 서류가 그만큼 중요합니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>도쿄 고카트 가격은 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            스트리트 카트의 2026년 11월 요금표 기준 도쿄 고카트는 1인당 약 ¥5,000~¥25,000이고, 가격은 출발 매장, 코스,
            시간대에 따라 달라집니다. 어떤 코스를 고를지 고민이라면 시부야 아넥스점의 1시간 코스를 예약하세요. 시부야 스크램블 교차로,
            오모테산도, 하라주쿠를 지나는 1시간 코스입니다. 아래 표에서 낮과 저녁 요금이 모두 표시된 매장은 저녁 요금이
            더 비쌉니다.
          </p>
          <Table
            head={["출발 매장과 코스", "코스의 주요 명소", "코스 시간", "낮 최저 요금", "저녁 최저 요금", "정가 최저 요금", "예약"]}
            rows={priceRows.map((row) => [
              row.shop,
              row.route,
              row.time,
              row.day,
              row.evening,
              row.regular,
              <KlookLink key="b" href={row.book} target="_blank" rel={KLOOK_REL} style={{ color: "var(--red)", fontWeight: 600 }}>
                {row.bookLabel} →
              </KlookLink>,
            ])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            각 매장 공식 요금표의 2026년 11월 탭에 표시된 1인당 최저 요금이며, {CHECKED}에 확인했습니다. 가격은 이용하는 달과
            시간대에 따라 달라지며, 여행 날짜의 금액은 운영사 예약 페이지에서 날짜별로 확인할 수 있습니다. 낮과 저녁 열의 금액은
            온라인 예약 시 자동으로 적용되는 리뷰 할인 요금입니다. 운영사 약관상 리뷰 작성 여부와 관계없이 적용되며, 정가는 방문
            사실을 공개하지 않으려는 고객에게 적용되는 요금입니다. 예약 열은 해당 출발 매장의 클룩 상품 페이지로 연결되며,
            클룩에는 별도의 판매 요금이 적용됩니다. 시나가와점은 단독 상품이 없어 클룩의 도쿄 고카트 목록으로 연결됩니다.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            최종 확인: {LAST_CHECKED}. 공식 출처: <Src href="https://akiba-kart.com/en/shibuya2.html">시부야 아넥스점</Src>,{" "}
            <Src href="https://akiba-kart.com/en/shibuya.html">시부야점</Src>,{" "}
            <Src href="https://streetkart.tokyo/en/akihabara.html">아키하바라 1호점</Src>,{" "}
            <Src href="https://streetkart.tokyo/en/akihabara2.html">아키하바라 2호점</Src>,{" "}
            <Src href="https://streetkart.com/en/tokyobay.html">도쿄 베이점</Src>,{" "}
            <Src href="https://streetkart.com/en/shinagawa.html">시나가와점</Src>,{" "}
            <Src href="https://streetkart.com/en/asakusa.html">아사쿠사점</Src>.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            클룩으로 예약하면 클룩의 가격이 적용되므로 상품 페이지에서 여행 날짜의 금액을 확인하세요. 비교하자면 스트리트
            카트 오사카점은 같은 달 약 1시간 코스가 ¥7,000부터이고, 오키나와에도 매장이 있습니다. 오사카에서도 같은
            서류로 운전할 수 있으며,{" "}
            <Link href="/guides/attractions/osaka-go-kart" style={linkStyle}>
              오사카 고카트 가이드(영어)
            </Link>
            에서 도톤보리와 난바를 지나는 코스를 비교했습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금 포함 사항</span>
          <h2 className={styles.sectionTitle}>도쿄 고카트 투어에는 무엇이 포함되나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            투어 요금에는 카트, 가이드, 기본 보험이 포함되지만, 카트가 파손되면 자기부담금 ¥50,000을 내야 합니다.
            국제운전면허증이나 번역문 비용은 언제나 본인 부담입니다.
          </p>
          <Table head={["항목", "포함 여부", "내용"]} rows={includedRows.map((r) => [r.item, r.status, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            스트리트 카트의 FAQ, 매장 페이지, 이용 약관 기준이며 {CHECKED}에 확인했습니다. 클룩에서 예약하면 해당 상품 페이지에 적힌
            포함 사항이 적용됩니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>코스 선택</span>
          <h2 className={styles.sectionTitle}>도쿄 고카트는 어느 코스가 좋나요(시부야, 아키하바라, 도쿄 베이)?</h2>
          <p className={styles.bodyText}>
            시부야 스크램블 교차로를 달리는 것이 목적이라면 시부야, 비용을 줄이고 싶다면 아키하바라, 레인보우 브리지를
            건너고 싶고 1.5~2시간 여유가 있다면 도쿄 베이를 예약하세요. 11월 요금표에서 시부야 코스는 ¥16,000부터이고,
            아키하바라 1시간 코스는 ¥9,000부터입니다. 아키하바라 2호점의 1시간 코스는 도쿄역과 긴자도 지납니다.
          </p>
          <p className={styles.bodyText}>
            다른 코스는 보고 싶은 명소에 따라 고르면 됩니다. 시나가와 코스는 도쿄 타워로 향하고, 레인보우 브리지를 건너는 것은
            도쿄 베이 코스이며, 아키하바라 2호점의 장시간 A2-M 코스는 고쿄(황궁) 주변과 하라주쿠를 거쳐 시부야 스크램블
            교차로까지 갑니다. 아키하바라 전자상가 근처에 묵는다면{" "}
            <Link href="/guides/attractions/akihabara-anime-tour" style={linkStyle}>
              아키하바라 애니메이션 투어 가이드(영어)
            </Link>
            와 함께 일정을 짜 보세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              시부야 아넥스점 투어 보기 →
            </KlookLink>
            <KlookLink href={AKIHABARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              아키하바라 투어 보기 →
            </KlookLink>
            <KlookLink href={BAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도쿄 베이 투어 보기 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>참가 조건</span>
          <h2 className={styles.sectionTitle}>도쿄 고카트를 타려면 면허증이 필요한가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            필요합니다. 일본의 스트리트 카트는 일반 도로를 달리므로 일본에서 유효한 운전면허증이 있어야 하고,
            면허가 없는 사람이 탈 수 있는 동승석도 없습니다. 가장 중요한 규칙은 1949년 제네바 협약 국제운전면허증을{" "}
            <strong>여행 전 본국에서 발급받아야 한다</strong>는 것입니다. 일본에서는 발급받을 수 없습니다. 아래 표에서
            본인의 경우를 찾아보세요.
          </p>
          <Table head={["가지고 있는 서류", "운전할 수 있나요?", "내용"]} rows={licenceRows.map((r) => [r.doc, r.drive, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {LAST_CHECKED}(스트리트 카트 면허 안내 페이지와 JAF). 국제운전면허증이나 외국 면허증은 일본 입국일로부터
            1년이 되는 날과 면허증 만료일 중 더 이른 날까지 일본에서 유효하고, 국제운전면허증 자체는 발급일로부터 1년간 유효합니다(경찰청,{" "}
            {NPA_CHECKED} 확인). 공식 출처:{" "}
            <Src href="https://akiba-kart.com/en/license_shibuya.html">스트리트 카트 면허 안내 페이지</Src>,{" "}
            <Src href="https://english.jaf.or.jp/driving-in-japan/drive-in-japan/switch-to-japanese-license">JAF</Src>. 규정은
            바뀔 수 있으므로 예약 전에 본인의 국적이 해당되는지 운영사에 확인하세요. 모든 서류는 당일 원본으로 가져가야 합니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>국제운전면허증이 없다면</span>
          <h2 className={styles.sectionTitle}>국제운전면허증 없이 도쿄에서 고카트를 탈 수 있나요?</h2>
          <p className={styles.bodyText}>
            일본에서 운전할 수 있는 다른 서류가 있을 때만 가능합니다. 일본 운전면허증, SOFA 운전면허증, 또는 위 6개 국가와 지역의
            면허증과 공인 일본어 번역문입니다. 이 중 하나가 없으면 운전할 수 없고, 매장에서 당일 해결할 수 없으며, 환불도
            받을 수 없습니다.
          </p>
          <p className={styles.bodyText}>
            많은 사람이 놓치는 것은 번역문입니다. JAF는 일본 밖에서 신청을 받지 않습니다. 일본 국내에서 온라인으로 신청을
            받고, 요금은 ¥6,000에 인쇄비 1쪽당 ¥20이며, 이 6개 국가와 지역의 면허증은 발급까지 평균 2~3영업일이 걸립니다.
            JAF를 이용한다면 투어 전날 도착해서는 시간이 부족하므로 카트 투어는 여행 후반 일정으로 예약하세요.
          </p>
          <div className={styles.verdictBox} style={{ marginTop: "1.25rem" }}>
            <div className={styles.verdictBody}>
              <p className={styles.verdictText}>
                <strong>국제운전면허증이 없다면 다음 투어를 예약하세요.</strong> 면허 없이도 같은 거리를 볼 수 있습니다.
                고쿄(황궁) 정원, 아사쿠사, 도쿄 스카이트리를 도는 가이드 동행 버스 투어, 저녁에 신주쿠를 3시간 동안 걸으며
                즐기는 그룹 푸드 투어, 가이드와 함께 센소지 주변을 둘러보는 반나절 도보 투어가 있습니다.
              </p>
              <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
                <KlookLink href={BUS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  도쿄 버스 1일 투어 보기 →
                </KlookLink>
                <KlookLink href={FOOD_WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  신주쿠 야간 푸드 투어 보기 →
                </KlookLink>
                <KlookLink href={ASAKUSA_WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  아사쿠사 워킹 투어 보기 →
                </KlookLink>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>제한</span>
          <h2 className={styles.sectionTitle}>도쿄 고카트는 연령과 키 제한이 있나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            있습니다. 클룩 상품 페이지에 적힌 최소 연령은 18세이며, 키 기준은 150cm 이상입니다. 스트리트 카트 자체 페이지에는
            나이나 키가 나와 있지 않으므로 예약하는 상품 페이지를 확인하세요.
          </p>
          <Table head={["규정", "내용", "출처"]} rows={fitRows.map((r) => [r.rule, r.value, r.source])} />
          <p className={styles.bodyText} style={noteStyle}>
            {NPA_CHECKED} 확인. 클룩 관련 내용은 검색 엔진에 등록된 상품 페이지를 기준으로 했습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>날씨</span>
          <h2 className={styles.sectionTitle}>비 오는 날이나 겨울에도 도쿄 고카트를 탈 수 있나요?</h2>
          <p className={styles.bodyText}>
            대개 탈 수 있습니다. 스트리트 카트는 보통 날씨와 관계없이 진행하며, 진행 여부가 확실하지 않으면 매장에 문의하라고
            안내하지만, 이용 약관상 투어를 중단, 취소, 변경할 수도 있습니다. 겨울도 비수기가 아닙니다. 도쿄의 모든 매장
            요금표에 12월~2월을 포함한 12개월 내내 예약 가능한 시간대가 있으므로, 지붕 없는 카트를 타는 만큼 날씨에 맞게 옷을 준비하세요.
          </p>
          <p className={styles.bodyText}>
            운영사에서 직접 예약한 경우 일본 시간 기준 이용일 7일 전까지 무료로 취소할 수 있습니다. 이용일 전 6일 동안은 운영사의 취소 규정이
            적용되므로 결제 전에 읽어 보세요. 변경은 예약 가능 여부에 따라 달라집니다. 클룩 예약은 클룩 상품 페이지의
            규정을 따릅니다. {CHECKED} 확인.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>안전</span>
          <h2 className={styles.sectionTitle}>도쿄 스트리트 카트는 안전하고 합법인가요?</h2>
          <p className={styles.bodyText}>
            모든 운전자가 일본에서 유효한 면허증을 가지고 있다면 합법입니다. 스트리트 카트는 자사 카트를 일본 일반 도로용으로
            제작했다고 설명하며, 유효한 서류 원본이 없는 사람은 참가할 수 없습니다. 다만 좌측통행인 실제 도로를 달리므로 놀이기구가
            아니라 실제 운전이라는 점을 기억하세요.
          </p>
          <p className={styles.bodyText}>
            투어는 매장에서 안전 교육을 받은 뒤 가이드 1명이 운전자를 최대 6명까지 이끌고 진행합니다. 코스에는 고속도로 구간이
            없으며, 기본 보험은 요금에 포함되며, 카트는 1인승이라 동승할 수 없습니다. 종합 보장 옵션을 추가하지 않으면 카트
            파손 시 자기부담금 ¥50,000을 냅니다. {CHECKED} 확인.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>추천 대상</span>
          <h2 className={styles.sectionTitle}>스트리트 고카트 투어가 나에게 맞을까요?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            1시간 코스는 체크인 30분을 포함해 약 90분이 걸리므로{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={linkStyle}>
              도쿄 3일 일정(영어)
            </Link>
            이나{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>
              도쿄에서 즐길 거리(영어)
            </Link>
            에 쉽게 넣을 수 있습니다. 어린이는 운전할 수 없고 카트는 1인승이므로, 가족 여행이라면 18세 미만 동행자의 일정을
            따로 정해야 합니다.{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>
              아이와 함께하는 도쿄 일정(영어)
            </Link>
            에 가족 모두가 즐길 수 있는 일자별 일정이 있습니다. 저녁에 걸어서 둘러보고 싶다면{" "}
            <Link href="/guides/attractions/tokyo-night-food-tour" style={linkStyle}>
              도쿄 야간 푸드 투어(영어)
            </Link>
            는 면허가 전혀 필요 없고,{" "}
            <Link href="/guides/attractions/tokyo-bike-tour" style={linkStyle}>
              도쿄 자전거 투어 가이드(영어)
            </Link>
            의 전기자전거 투어도 마찬가지입니다. 여행 기간이 길다면 도쿄 베이 코스는{" "}
            <Link href="/guides/attractions/tokyo-4-day-itinerary" style={linkStyle}>
              도쿄 4일 일정(영어)
            </Link>
            중 도쿄만을 둘러보는 날에 넣기 좋습니다.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>단계별 안내</span>
          <h2 className={styles.sectionTitle}>도쿄 고카트 투어는 어떻게 예약하나요?</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>필요한 서류를 모두 준비한 뒤 예약하세요.</strong> 서류가 없으면 매장에서 환불해 주지 않으므로 그 전에는
            예약하지 않는 것이 좋습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 시부야 아넥스점 투어 예약 →
            </KlookLink>
            <KlookLink href={AKIHABARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 아키하바라 투어 예약 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>하루 계획</span>
          <h2 className={styles.sectionTitle}>도쿄 고카트 투어는 어디서 출발하나요?</h2>
          <p className={styles.bodyText}>
            스트리트 카트 투어는 예약한 매장에서 출발하며, 매장마다 코스가 다릅니다. 정확한 집결 장소는 예약 확인서에서
            확인하고, 안전 교육 전에 도착할 수 있도록 시간을 넉넉히 잡으세요.
          </p>
          <Table head={["매장", "주소", "가까운 역(도보)"]} rows={startRows.map((r) => [r.shop, r.address, r.access])} />
          <p className={styles.bodyText} style={noteStyle}>
            스트리트 카트 매장 페이지 기준이며 {CHECKED}에 확인했습니다.
          </p>
          <p className={styles.bodyText}>
            매장에는 주차장이 없고, 운영사는 교통 체증으로 늦을 수 있어 자가용이나 우버 이용을 권하지 않습니다. 늦게 오면 참가할
            수 없습니다.{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo" style={linkStyle}>
              도쿄 숙소 지역 가이드(영어)
            </Link>
            에서 묵을 지역을 비교했고, 도쿄 대중교통이 아직 익숙하지 않다면{" "}
            <Link href="/guides/transport/tokyo-transportation" style={linkStyle}>
              도쿄 교통 가이드(영어)
            </Link>
            에서 열차, 지하철, IC 카드의 기본을 설명합니다.
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="도쿄 고카트 자주 묻는 질문" />

        <KlookTourPicks
          heading="서류 때문에 운전할 수 없다면"
          intro="운전 서류 없이 예약만 하면 되는 도쿄 투어 두 가지와, 여행 내내 유용한 eSIM과 지하철 티켓입니다. 상품 페이지에서 여행 날짜의 현재 가격을 확인하세요."
          tours={picks}
        />

        <Related
          items={[
            { href: "/guides/attractions/akihabara-anime-tour", title: "아키하바라 애니메이션 투어(2026): 가이드 투어, 상점 영업시간, 가는 방법(영어)" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 열차, 지하철, IC 카드(영어)" },
            { href: "/guides/attractions/things-to-do-tokyo", title: "도쿄에서 즐길 거리(2026): 미리 예약할 곳과 바로 갈 수 있는 곳(영어)" },
            { href: "/guides/attractions/samurai-ninja-experience-tokyo", title: "도쿄 사무라이·닌자 체험(2026): 어떤 체험을 예약할까(영어)" },
            { href: "/guides/attractions/tokyo-food-tour", title: "도쿄 푸드 투어(2026): 추천 지역과 투어 내용(영어)" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "도쿄 서브웨이 티켓(2026): 24, 48, 72시간권은 얼마나 이득일까(영어)" },
            { href: "/ko", title: "일본 여행 준비 가이드 더 보기 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>도쿄를 직접 운전해 볼까요?</h2>
            <p className={styles.ctaBannerDesc}>
              스트리트 고카트 투어를 미리 예약하고, 당일에는 국제운전면허증, 자국 운전면허증, 여권을 가져가세요. 국제운전면허증은
              출국 전 본국에서 준비해야 합니다.
            </p>
            <KlookLink href={GOKART_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              도쿄 스트리트 고카트 보기 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
