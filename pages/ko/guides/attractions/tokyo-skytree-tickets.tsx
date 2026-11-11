import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../../components/BookingEsimCard";
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
import KlookTripPrep from "../../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../../components/GygCompare";
import { gygTokyoSkytree } from "../../../../lib/gyg-links";
import {
  skytreeTicket,
  skytreeAquariumCombo,
  fujiHakoneDayTour,
  tokyoSightseeingBusTour,
  skytreeTripPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English guide (/guides/attractions/tokyo-skytree-tickets) block for block as of
// 2026-11-01, re-synced 2026-11-10 (answer-first opening, question headings, hours and
// cancellation table, three FAQs). Every figure comes from that page or lib/attraction-prices.ts.

const ROUTE = "/ko/guides/attractions/tokyo-skytree-tickets";
// H1 renders this same string: Google had replaced the old title with the breadcrumb
// run-on "일본 여행 준비 가이드도쿄 스카이트리 티켓".
const TITLE = "도쿄 스카이트리 티켓 가격 2026: 350m와 450m 비교";
const DESC =
  "도쿄 스카이트리 입장권 가격(2026년 11월 공식 확인): 350m ¥1,800부터, 450m 콤보 ¥3,000부터, 현장 ¥500 추가.";

const P = PRICES.tokyoSkytree;
const CHECKED = dateLabel(P.checked, "ko");
const ADULT = priceLabel(P.adult, "ko");
const CHILD = priceLabel(P.child, "ko");

const TICKET_URL = klookFor(skytreeTicket.url, "ko");
const GYG_SLUG = "ko-tokyo-skytree-tickets";

const tripPrepItems = [
  withKlookLocale(skytreeTripPrep[0], "ko", {
    label: "우에노와 아사쿠사 주변 호텔",
    ctaLabel: "클룩에서 우에노와 아사쿠사 호텔 보기 →",
    why: "타워와 같은 쪽 강변입니다. 우에노는 야마노테선 위에 있고, 거기서 긴자선이 아사쿠사까지 가며, 오시아게는 아사쿠사선으로 두 정거장 더 가면 됩니다. 늦게 전망대 관람을 마쳐도 시내를 가로질러 호텔로 돌아갈 필요가 없습니다.",
  }),
  withKlookLocale(skytreeTripPrep[1], "ko", {
    label: "기모노 야에 대여(아사쿠사)",
    ctaLabel: "아사쿠사 기모노 대여 보기 →",
    why: "같은 날 낮 일정으로 좋으며, 두 정거장 거리입니다. 가게는 가미나리몬 옆에 있고 상품 페이지는 의상을 17:30까지 반납하도록 안내합니다. 그래서 저녁 스카이트리 입장 시간 전에 겹치지 않게 넣을 수 있습니다.",
  }),
  withKlookLocale(skytreeTripPrep[2], "ko", {
    label: "도쿄 자유 승하차 관광버스(홉온 홉오프 버스, 스카이 홉 버스)",
    ctaLabel: "오픈탑 버스 티켓 보기 →",
    why: "코스에 아사쿠사가 들어 있는 오픈탑 자유 승하차 관광버스 티켓입니다. 하루에 센소지와 타워를 모두 넣는다면, 한 곳만 들르면서 구간마다 지하철 요금을 내는 대신 고를 수 있는 상품입니다.",
  }),
  withKlookLocale(skytreeTripPrep[3], "ko", {
    label: "도쿄 서브웨이 티켓(Tokyo Subway Ticket, 24/48/72시간)",
    ctaLabel: "서브웨이 티켓 보기 →",
    why: "오시아게는 한조몬선과 도에이 아사쿠사선의 지하철역이라, 24/48/72시간 도쿄메트로·도에이 티켓이면 타워까지 가는 지하철도 이미 이용 범위에 포함되고, 그 뒤 센소지까지 두 정거장도 마찬가지입니다.",
  }),
];

const tourPicks = [
  withKlookLocale(skytreeAquariumCombo, "ko", {
    title: "도쿄 스카이트리＋스미다 수족관 콤보 티켓",
    desc: "전망대와, 타워 아래 도쿄 소라마치 안에 있는 수족관을 묶은 티켓",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "ko", {
    title: "도쿄 관광버스 1일 투어",
    desc: "고쿄 정원, 아사쿠사, 도쿄 스카이트리를 다국어 오디오 가이드로 둘러보는 투어",
  }),
  withKlookLocale(fujiHakoneDayTour, "ko", {
    title: "후지산＋하코네 1일 투어",
    desc: "후지산 5합목과 하코네 화산 지대, 아시노호를 도쿄 출발 당일치기로 묶은 투어",
  }),
];

const priceRows = [
  { ticket: "플로어 350 — 성인(만 15세 이상)", advance: ADULT, sameDay: "서비스 수수료 ¥500 추가" },
  { ticket: "플로어 350 — 어린이(만 6~14세)", advance: CHILD, sameDay: "서비스 수수료 ¥500 추가" },
  { ticket: "350+450 콤보 — 성인", advance: "¥3,000부터", sameDay: "서비스 수수료 ¥500 추가" },
  { ticket: "350+450 콤보 — 어린이", advance: "¥1,500부터", sameDay: "서비스 수수료 ¥500 추가" },
  { ticket: "현장에서 플로어 450 추가 구매 — 성인", advance: "단독 판매 없음", sameDay: "¥1,400(수수료 없음)" },
  { ticket: "현장에서 플로어 450 추가 구매 — 어린이", advance: "단독 판매 없음", sameDay: "¥700(수수료 없음)" },
  { ticket: "만 5세 이하", advance: "무료", sameDay: "무료" },
];

// Same rows as the English guide's visitRows, read off en.tokyo-skytree.jp on 10 Nov 2026.
const visitRows = [
  { item: "운영 시간(2026년 11월 10일)", detail: "10:00–22:00, 마지막 입장 21:00. 운영 시간은 날짜별로 정해지며 사전 공지 없이 변경될 수 있고, 마지막 입장은 항상 폐관 1시간 전입니다." },
  { item: "날짜와 시간 변경", detail: "불가합니다. 취소 후 다시 구매해야 하며, 콤보와 덴보 데크 입장권 사이의 변경도 같습니다." },
  { item: "취소 수수료(공식 온라인 입장권)", detail: "방문 31일 전까지 0%, 30일 전부터 입장 시각까지 20%, 입장 시각 이후 100%. 구매 후 59분 이내 취소는 수수료 없음." },
  { item: "당일 현장 구매", detail: "4층 창구와 발권기, 1장당 ¥500 추가. 구매 가능한 시간대는 날마다 다르고 줄이 있을 수 있습니다." },
  { item: "덴보 회랑(450m)", detail: "445–450m, 최고 지점 451.2m(소라카라 포인트). 플로어 350에서 덴보 셔틀로 이동. 당일 추가 판매는 혼잡 시 중단될 수 있습니다." },
  { item: "비교적 한산한 시간", detail: "평일 오후, 아침 개장 직후, 폐관 전 늦은 시간(공식 혼잡 예측 페이지 기준)." },
  { item: "가까운 역", detail: "도쿄 스카이트리역(도부 스카이트리라인), 오시아게역(한조몬선 등). 아사쿠사에서 약 5분, 도쿄역에서 약 20분." },
];

const whoFor = [
  {
    title: "플로어 350만으로 충분한 경우",
    desc: `추가 요금보다 기본 전망을 원하는 경우입니다. 플로어 350은 3개 층으로 이루어진 메인 전망대이고, 여기만으로도 간토 평야 전체가 내려다보입니다. 성인 ${ADULT}로, 도쿄의 주요 유료 전망대 중 높이 1m당 가격이 가장 저렴합니다.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h-6l3-7z" />
        <line x1="12" y1="9" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "플로어 450을 추가할 경우",
    desc: "더 높은 곳에 오르는 것 자체가 여행의 목적인 경우입니다. 플로어 450은 덴보 회랑으로, 타워에서 올라갈 수 있는 가장 높은 지점까지 나선형으로 이어지는 유리 전망 회랑입니다. 온라인 콤보는 ¥3,000부터이고, 당일 추가하면 플로어 350 입장권에 ¥1,400이 더 붙습니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "늦은 시간대를 고를 경우",
    desc: "먼 지평선보다 야경을 보고 싶은 경우입니다. 확인한 날짜 기준으로 전망대는 22:00까지 운영했고 마지막 입장은 21:00이었습니다. 낮 시간대가 마감된 뒤에도 자리가 남아 있는 것은 늦은 시간대입니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const deckRows = [
  {
    deck: "도쿄 스카이트리",
    height: "플로어 350, 플로어 450",
    price: "¥1,800부터(플로어 350), 콤보 ¥3,000부터",
    highlight: "도쿄에서 가장 높은 전망대이고, 유리 전망 회랑은 여기뿐입니다",
    area: "오시아게／도쿄 스카이트리역",
  },
  {
    deck: "시부야 스카이",
    height: "약 229m 루프톱",
    price: "온라인 ¥2,700(15시 전), ¥3,400(15시 이후)",
    highlight: "스크램블 교차로 위의 야외 루프톱 — 높이보다 사진",
    area: "시부야역",
  },
  {
    deck: "도쿄 타워",
    height: "약 150m, 약 250m 전망대",
    price: "약 ¥3,300(톱 데크 투어)",
    highlight: "1958년에 세워진 랜드마크, 그리고 스카이트리가 보이는 전망",
    area: "시바공원／아카바네바시",
  },
  {
    deck: "도쿄도청 전망대",
    height: "약 202m",
    price: "무료",
    highlight: "입장권이 아예 필요 없습니다 — 도쿄에서 가성비가 가장 좋은 도시 파노라마",
    area: "신주쿠",
  },
];

const steps = [
  {
    title: "예매 전에 플로어 350 단독권과 콤보권 중 선택합니다",
    desc: "플로어 450은 온라인 콤보(성인 ¥3,000부터)로 사는 방법이, 당일 플로어 350 입장권에 추가로 사는 방법(¥1,400 추가)보다 저렴합니다. 유리 회랑에 올라갈 가능성이 조금이라도 있으면 처음부터 콤보로 사세요.",
  },
  {
    title: "날짜 지정 입장권을 온라인으로 예매합니다",
    desc: `공식 사이트는 위의 '부터' 가격으로 날짜 지정 입장권을 팔고, 실제 날짜의 금액은 더 높을 수 있습니다. 당일 4층 매표소나 발권기에서 사면 1장당 ¥500의 서비스 수수료가 붙습니다. 미리 예매해야 하는 가장 분명한 이유입니다. 확인일 ${CHECKED}.`,
  },
  {
    title: "해외 발급 카드라면 판매 파트너를 이용합니다",
    desc: "클룩은 같은 시간 지정 입장권을 한국어 결제 화면과 전자 티켓으로 판매합니다. 일본 명소 공식 사이트에서 많은 방문객이 겪는 카드와 언어 문제를 피할 수 있고, 같은 상품 페이지에 플로어 450 콤보도 있습니다.",
  },
  {
    title: "일반 운영 시간이 아니라 방문 날짜의 운영 시간을 확인합니다",
    desc: "스카이트리는 날짜별 달력을 공개하고 '운영 시간은 사전 공지 없이 변경될 수 있다'고 분명히 적고 있으며, 마지막 입장은 폐관 1시간 전입니다. 확인한 날짜 기준으로 전망대는 10:00–22:00, 마지막 입장은 21:00이었습니다.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도쿄 스카이트리 입장권은 얼마인가요?",
    a: `공식 사이트의 날짜 지정 입장권은 메인 전망대인 플로어 350이 성인(만 15세 이상) ¥1,800부터, 만 6~14세 어린이 ¥900부터입니다. 플로어 350과 450을 함께 이용하는 콤보 티켓은 성인 ¥3,000부터, 어린이 ¥1,500부터입니다. 만 5세 이하는 무료입니다. 모두 '부터' 가격이라 특정 날짜의 금액은 더 높을 수 있습니다. 공식 사이트 확인일 ${CHECKED}.`,
  },
  {
    q: "도쿄 스카이트리 입장권은 미리 사는 게 더 싼가요?",
    a: `네. 수요에 따라 오르내리는 차이가 아니라 정해진 금액만큼 차이가 납니다. 당일 4층 매표소나 발권기에서 사면 입장료에 더해 1장당 ¥500의 서비스 수수료가 붙습니다. 4인 가족이 온라인으로 미리 예매하면 수수료 ¥2,000을 아낄 수 있습니다. 공식 사이트든 판매 파트너든 날짜 지정 입장권을 온라인으로 예매하면 수수료도 내지 않고 매표소 줄도 서지 않습니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "플로어 350과 플로어 450의 차이는 무엇인가요?",
    a: "플로어 350은 덴보 데크로, 3개 층으로 이루어진 메인 전망 공간이고 모든 입장권에 포함됩니다. 플로어 450은 덴보 회랑으로, 타워에서 올라갈 수 있는 가장 높은 지점까지 나선형으로 이어지는 유리벽 전망 회랑입니다. 플로어 450만 따로 방문할 수는 없습니다. 먼저 플로어 350 입장권이 있어야 하고, 온라인 콤보로 묶거나 현장 발권기에서 추가(성인 ¥1,400)해야 합니다.",
  },
  {
    q: "플로어 450 입장권을 온라인으로 살 수 있나요?",
    a: `단독 입장권으로는 살 수 없습니다. 공식 사이트는 플로어 450을 콤보 티켓으로만 판매합니다. 플로어 350 입장권으로 도착한 뒤 마음이 바뀌면 현장 발권기에서 성인 ¥1,400, 만 6~14세 어린이 ¥700에 플로어 450을 추가합니다. 온라인 콤보가 더 싼 경로입니다. 성인 기준 ¥3,000부터인 반면, 두 단계로 나눠 사면 ¥1,800에 ¥1,400을 더하게 됩니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "도쿄 스카이트리 운영 시간은 어떻게 되나요?",
    a: `스카이트리 운영 시간은 고정되어 있지 않고 날짜별로 정해지며, 공식 사이트는 '운영 시간은 사전 공지 없이 변경될 수 있다'는 점과 마지막 입장이 폐관 1시간 전이라는 점을 적어 두었습니다. 확인한 날짜 기준으로 전망대는 10:00–22:00, 마지막 입장은 21:00이었습니다. 저녁 일정을 여기에 맞춰 짜기 전에 방문 날짜의 운영 시간을 달력에서 확인하세요. 확인일 ${CHECKED}.`,
  },
  {
    q: "도쿄 스카이트리와 시부야 스카이 중 어디가 좋나요?",
    a: "두 곳은 매력이 서로 다릅니다. 스카이트리는 높은 전망대와 먼 곳까지 보이는 시야가 강점입니다. 플로어 350과 450은 도쿄에서 가장 높은 전망대이고, 간토 평야 전체가 보이며 맑은 날에는 후지산도 들어옵니다. 시부야 스카이는 사진 촬영이 매력입니다. 스크램블 교차로를 내려다보는 약 229m 높이의 야외 루프톱으로, 일몰 때가 가장 좋고 높이보다 분위기를 즐기는 곳입니다. 한 곳만 고른다면 탁 트인 전경은 스카이트리, 누구나 아는 시부야 대표 사진을 원한다면 시부야 스카이가 좋습니다.",
  },
  {
    q: "도쿄 스카이트리에서 후지산이 보이나요?",
    a: "맑은 날에는 보입니다. 높이 덕분에 도쿄의 어느 전망대보다 확률이 높습니다. 다만 시야는 전적으로 날씨에 달려 있고, 서늘하고 건조한 달과 이른 시간대가 더 유리한 편입니다. 특정 날짜에 보인다는 보장은 없으니, 후지산 전망만을 위해 콤보 티켓을 살 생각이라면 이 점을 참고하세요.",
  },
  {
    q: "도쿄 스카이트리에 어떻게 가나요?",
    a: "타워는 도부 스카이트리라인의 도쿄 스카이트리역과, 도쿄메트로 한조몬선, 도에이 아사쿠사선, 게이세이 오시아게선이 지나는 오시아게역 위에 있습니다. 오시아게역은 도쿄 서브웨이 티켓 이용 구간에 포함되므로 이미 그 패스를 갖고 있다면 이동에 추가 비용이 없습니다. 아사쿠사는 아사쿠사선으로 두 정거장이라 오후 한나절에 두 곳을 묶기 쉽습니다.",
  },
  {
    q: "도쿄 스카이트리 입장권의 날짜나 시간을 바꿀 수 있나요?",
    a: `바꿀 수 없습니다. 공식 사이트는 구매한 입장권은 변경할 수 없다고 안내하므로, 날짜, 시간, 입장권 종류를 바꾸려면 취소 후 다시 사야 합니다. 공식 온라인 입장권은 방문 31일 전까지 취소 수수료가 없고, 30일 전부터 입장 시각까지는 20%, 입장 시각 이후에는 취소할 수 없습니다. 구매 후 59분 이내 취소는 수수료가 없습니다. 여행사나 판매 파트너에서 산 입장권은 그 판매처의 규정을 따릅니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "도쿄 스카이트리는 몇 살까지 어린이 요금인가요?",
    a: `어린이 요금은 만 6~14세(중학생 이하)에 적용됩니다. 만 15세부터는 고등학생을 포함해 성인 요금이고, 만 5세 이하는 무료입니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "덴보 회랑(450m)은 당일 매진될 수 있나요?",
    a: `판매가 중단될 수 있습니다. 덴보 회랑 추가권은 당일 덴보 데크 안의 발권기에서 팔며, 공식 사이트는 수용 인원 제한 때문에 판매를 중단할 수 있다고 안내합니다. 온라인 콤보 티켓은 예매한 입장 시간대에 450m 입장이 포함됩니다. 확인일 ${CHECKED}.`,
  },
];

// Last crumb kept short and unlike the title (see TITLE above).
const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "스카이트리" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoTokyoSkytreePage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, "ko");

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: ROUTE,
              headline: TITLE,
              description: DESC,
              updated,
              inLanguage: JSONLD_LANG.ko,
            }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel} 업데이트</p>
          <h1 className={styles.heroTitle}>{TITLE}</h1>
          <p className={styles.heroSubtitle}>
            도쿄 스카이트리 입장권은 덴보 데크(天望デッキ, 350m)가 성인 ¥1,800부터, 덴보 회랑(天望回廊,
            450m)과의 콤보가 ¥3,000부터입니다(공식 사이트 {CHECKED} 확인, 날짜별 가격이라 더 높을 수 있음).
            온라인으로 날짜와 시간을 지정해 예매하면 현장 매표소·발권기의 1장당 ¥500 수수료를 내지 않아도
            되고, 현장에서 살 수 있는 시간대는 날마다 다르므로 원하는 시간대, 특히 저녁 시간대는 미리
            예매하세요.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 요금", "350m와 450m 비교"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>핵심 요약</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>플로어 350(성인)</p>
                <p className={styles.verdictStatValue}>¥1,800부터</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>350+450 콤보</p>
                <p className={styles.verdictStatValue}>¥3,000부터</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>당일 현장 구매</p>
                <p className={styles.verdictStatValue}>1장당 ¥500 추가</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>만 5세 이하</p>
                <p className={styles.verdictStatValue}>무료</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 날짜 지정 입장권을 온라인으로 예매하세요. 스카이트리는 당일 매표소에서
              1장당 ¥500의 서비스 수수료를 받으므로, 사전 예매하면 정해진 수수료만큼 확실히 저렴합니다.
              플로어 450의 유리 회랑까지 올라갈 생각이라면 처음부터 콤보로 사세요. 나중에 현장에서 추가하면
              ¥1,400이 더 듭니다. 가격은 공식 사이트 기준이며 확인일은 {CHECKED}입니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                클룩에서 도쿄 스카이트리 티켓 확인 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>도쿄 스카이트리 입장권에는 무엇이 포함되나요?</h2>
          <p className={styles.bodyText}>
            이 페이지에서는 도쿄 스카이트리 입장권의 종류와 요금, 예매 방법을 안내합니다. 어느 전망대에 오를지
            아직 정하지 못했다면{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">도쿄 전망대 비교(영어)</Link>에서 시부야
            스카이, 도쿄 타워, 무료 도청 전망대와 나란히 비교합니다. 도쿄 스카이트리는 전망대 높이에 따라 두 가지 입장권을 판매합니다. <strong>플로어 350</strong>은 덴보
            데크(天望デッキ)로, 3개 층으로 이루어진 전망 공간이며 모든 입장권에 포함됩니다. <strong>플로어 450</strong>은 덴보
            회랑(天望回廊)으로, 타워에서 올라갈 수 있는 가장 높은 지점까지 나선형으로 이어지는 유리벽 전망
            회랑이며, 단독으로는 방문할 수 없습니다.
          </p>
          <p className={styles.bodyText}>
            헷갈리는 이유는 대부분 전망 공간이 두 단계로 나뉘어 있기 때문입니다. 두 곳을 온라인에서 함께 사는지,
            당일 따로 사는지에 따라 가격이 달라집니다. 아래에서 두 가지 구매 방법을 비교합니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금</span>
          <h2 className={styles.sectionTitle}>2026년 도쿄 스카이트리 입장권 가격은 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            성인은 덴보 데크(350m) ¥1,800부터, 덴보 회랑(450m)을 더한 콤보 ¥3,000부터이고, 만 6~14세
            어린이는 각각 ¥900부터, ¥1,500부터입니다. 현장에서 사면 1장당 ¥500이 더 붙습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.5rem" }}>
                  공식 요금(en.tokyo-skytree.jp/ticket), 확인일 {CHECKED}.
                </caption>
                <thead>
                  <tr>
                    {["입장권", "온라인 날짜 지정", "당일"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.advance}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            도쿄 스카이트리 공식 사이트 기준이며 확인일은 {CHECKED}입니다. 공식 페이지는 이 금액들을
            &lsquo;부터&rsquo; 가격으로 표기하므로 특정 날짜의 금액은 더 높을 수 있습니다. 예매 시
            확인하세요. 확인한 공식 자료에는 평일과 주말을 나눈 별도 요금표가 없으며, 결제 화면에 나오는 날짜별 금액이
            적용됩니다. ¥500 현장 서비스 수수료는 4층 매표소와 발권기에서 1장마다 붙고, 덴보 회랑 추가권에는
            붙지 않습니다.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>입장권 선택</span>
          <h2 className={styles.sectionTitle}>450m 덴보 회랑은 350m 전망대보다 돈을 더 낼 가치가 있나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            더 높은 곳에 오르는 것 자체가 목적일 때만 그렇습니다. 콤보는 성인 기준 덴보 데크 단독보다 ¥1,200 비싸고(¥3,000부터
            vs ¥1,800부터), 350m에서 445–450m의 유리 회랑으로 올라가며 최고 지점은 451.2m입니다. 망설여진다면
            온라인 콤보를 사세요. 당일 450m를 추가하면 ¥1,400이고, 공식 사이트는 혼잡 시 판매를 중단할 수
            있다고 안내합니다.
          </p>
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

        <div className={styles.verdictBox}>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>입장권을 정했다면</strong> 클룩의 TOKYO SKYTREE 상품에서 시간 지정 입장권과 350m＋450m 콤보를
              함께 볼 수 있습니다. 한국어 결제 화면과 전자 티켓입니다. 날짜별 금액과 입장 시간대는 상품 페이지에서
              확인하세요.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                클룩에서 TOKYO SKYTREE 티켓 보기 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="타워 주변"
          heading="오시아게 쪽 하루에 함께 예약할 것들"
          intro="전망대 관람은 한두 시간이면 끝나고, 시간을 맞춰야 하는 것은 위의 입장권뿐입니다. 아래는 그날 남은 오후 일정에 필요한 예약으로, 모두 타워와 같은 쪽 강변에 있고 입장권과 같은 계정에서 예약할 수 있습니다."
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>당일</span>
          <h2 className={styles.sectionTitle}>도쿄 스카이트리 입장권을 현장에서 살 수 있나요?</h2>
          <p className={styles.bodyText}>
            네, 4층 매표소와 발권기에서 살 수 있지만 온라인보다 1장당 ¥500 비싸고, 공식 사이트에 따르면 당일 살 수
            있는 시간대는 날마다 다르며 구매 줄이 있을 수 있습니다. 덴보 회랑 추가권은 덴보 데크 안의 발권기에서
            수수료 없이 팔지만, 혼잡 시 판매가 중단될 수 있습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>시간대</span>
          <h2 className={styles.sectionTitle}>도쿄 스카이트리는 언제 가는 게 가장 좋나요?</h2>
          <p className={styles.bodyText}>
            한산한 전망대를 원하면 평일 오후나 아침 첫 시간대, 야경을 원하면 폐관 전 한두 시간이 좋습니다. 공식
            혼잡도 예측 페이지에서 안내하는 세 시간대이며, 연말연시, 골든위크, 봄방학은 더 붐빈다고 안내합니다.
            일몰 시각은 계절마다 달라지므로 저녁 입장 시간대는 방문일의 일몰 시각에 맞추세요. 짧은 일정이라면{" "}
            <Link href="/guides/attractions/tokyo-2-day-itinerary">도쿄 2일 일정(영어)</Link>이 같은 날 아사쿠사와
            묶는 동선을 보여 줍니다.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.5rem" }}>
                  도쿄 스카이트리 공식 사이트(운영 시간, 취소, 혼잡도 예측, 교통, 층 안내 페이지), 확인일 {CHECKED}.
                </caption>
                <thead>
                  <tr>
                    {["항목", "공식 안내"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visitRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>스카이트리는 도쿄의 다른 전망대와 어떻게 다른가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            높은 곳에서 도쿄 전경을 감상하고 싶다면 스카이트리가 좋은 선택입니다. 스크램블 교차로 사진을 찍고 싶다면{" "}
            <Link href="/ko/guides/attractions/shibuya-sky-tickets">시부야 스카이</Link>가 더 나은 선택이고,
            돈을 전혀 쓰지 않고 도시 파노라마를 보고 싶다면 신주쿠의 도쿄도청 전망대는 무료입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["전망대", "높이", "요금(대략)", "특징", "지역"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            스카이트리와 시부야 스카이의 수치는 각 운영사 공식 사이트 기준입니다. 도쿄 타워와 도쿄도청은
            대략값이며 변경될 수 있습니다. 예매 시 확인하세요.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>단계별 안내</span>
          <h2 className={styles.sectionTitle}>도쿄 스카이트리 입장권은 어떻게 예매하나요?</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            가는 길은 쉬운 편입니다. 타워는 도쿄 스카이트리역과 오시아게역 바로 위에 있고, 오시아게는
            지하철역이라{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">도쿄 서브웨이 티켓(영어)</Link>을 갖고 있다면
            그대로 쓸 수 있습니다. 도쿄메트로와 도에이 노선이 어떻게 연결되는지는{" "}
            <Link href="/guides/transport/tokyo-transportation">도쿄 교통 가이드(영어)</Link>에서 다룹니다.
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="남은 하루도 함께 예약하기"
          intro="스카이트리 관람은 한두 시간이면 끝납니다. 아래 상품은 입장권과 같은 클룩 계정에 있어, 남은 일정도 같은 계정에서 예약할 수 있습니다."
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-bay-cruise", title: "도쿄만 크루즈(2026): 야카타부네 vs 심포니, 시간과 요금(영어)" },
            { href: "/guides/attractions/asakusa-kimono-rental", title: "아사쿠사 기모노 대여(2026): 반납 시간, 헤어 세트, 촬영 장소(영어)" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "도쿄 3일 일정(2026): 무엇을 어떤 순서로 예약할까(영어)" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "도쿄 타워 티켓(2026): 요금, 메인 데크 vs 톱 데크, 예약 방법(영어)" },
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "도쿄 서브웨이 티켓(2026): 24/48/72시간, 살 만한가(영어)" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "워너 브라더스 스튜디오 투어 도쿄 티켓(2026): 요금과 예약 방법(영어)" },
            { href: "/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "도쿄 출발 후지산 1일 투어(2026): 어떤 투어로, 실제로 무엇을 보나(영어)" },
            { href: "/ko/guides/attractions/teamlab-planets-tickets", title: "팀랩 플래닛 예약 2026: 티켓 가격, 운영 시간, 가는 법" },
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 보더리스 비교 2026: 도쿄에서 어디로 갈까" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드·씨 선택" },
            { href: "/guides/attractions", title: "일본에서 즐길 거리 더 보기(영어) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>현장 구매보다 저렴한 온라인 사전 예매를 이용하세요</h2>
            <p className={styles.ctaBannerDesc}>
              당일 입장권에는 1인당 ¥500의 서비스 수수료가 붙습니다. 온라인으로 예매한 날짜 지정 입장권은
              추가 요금 없이 미리 구매할 수 있고 창구 줄도 설 필요가 없으며, 클룩은 해외 카드로 한국어 화면에서 결제할 수 있습니다.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                클룩에서 도쿄 스카이트리 티켓 보기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
