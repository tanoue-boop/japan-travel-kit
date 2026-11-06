import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import {
  type KlookTripPrepItem,
    dotonboriCityCruise,
  galaNaebaSkiDayTripTokyo,
  galaYuzawaLiftTicket,
  hakubaHapponeBusLiftRental,
  hakubaSkiResortDayTourTokyo,
  hanedaLimousineBus,
  hokurikuArchPass,
  japanWinterStayAreas,
  jrEastSouthHokkaidoPass,
  jrHarukaUrl,
  kanazawaGeishaKenrokuenCastleDayTour,
  kanazawaKenrokuenHigashiChayaDayTour,
  klookEsim,
  kyotoHighlightBusTour,
  kyotoKimonoYumeyakata,
  kyotoNaraKiyomizuTour,
  lakeShikotsuIceFestivalHalfDayTour,
  nankaiRapitUrl,
  naritaExpressRoundTripUrl,
  naritaLimousineBus,
  newChitoseSapporoSharedTransfer,
  nisekoResortShuttleBus,
  nisekoSkiSnowboardRental,
  osakaAmazingPass,
  otaruSnowParkDayTour,
  rusutsuResortShuttleBus,
  sapporoSnowParkHalfDayTour,
  shibuyaSkyTicketUrl,
  shinkansenTokyoKanazawa,
  shinkansenTokyoKyoto,
  shirakawagoLightUpTakayamaDayTour,
  shirakawagoLineBusTicket,
  shirakawagoTakayamaKanazawaDayTour,
  takayamaShirakawagoGokayamaUnescoTour,
  teamlabBotanicalGardenOsakaTicket,
  teamlabPlanetsTicketUrl,
  tokyoMegaIllumiTicket,
  tokyoNightTourAkihabaraShibuya,
  tokyoOpenTopBusSightseeing,
  tokyoSubwayTicket,
  yomiurilandTicket,
} from "../../../../lib/klook-links";
import { asahiyamaBieiHighlightsTour } from "../../../../lib/klook-links-winter-hokkaido";
import { jrPassWholeJapanCurrent, shirakawagoLightUp2027NagoyaTour } from "../../../../lib/klook-links-winter-hub";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { seoTags } from "../../../../components/IntlSeo";
import {
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
} from "../../../../components/IntlChrome";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

// Mirrors the English guide (pages/guides/attractions/japan-winter-itinerary.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/japan-winter-itinerary";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "일본 겨울 여행" }];

const CHECKED = dateLabel("2026-10-28", LOCALE);
const REREAD = dateLabel("2026-11-06", LOCALE);

const sameTripItems: KlookTripPrepItem[] = [
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩에서 eSIM 보기 →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "겨울은 당일에 계획이 바뀌는 계절입니다. 눈으로 멈춘 열차, 바람으로 닫힌 로프웨이 같은 공지는 모두 창구가 아니라 휴대폰으로 옵니다.",
  },
  {
    label: "나리타 공항 리무진 버스",
    ctaLabel: "나리타 버스 보기 →",
    url: klookFor(naritaLimousineBus.url, LOCALE),
    why: "이 경로는 간사이에서 귀국하므로 편도입니다. 짐이 크거나 겨울 짐이 많고 호텔이 역 옆이 아닐 때 고를 도착 방법입니다.",
  },
  {
    label: "하네다 공항 리무진 버스",
    ctaLabel: "하네다 버스 보기 →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "하네다에서 같은 편도 방식으로, 신주쿠와 이케부쿠로가 정차지에 있습니다. 오후 4시 반이면 어두워지는 1일차에 유용합니다.",
  },
  {
    label: "JR 호쿠리쿠 아치 패스(7일)",
    ctaLabel: "호쿠리쿠 아치 패스 보기 →",
    url: klookFor(hokurikuArchPass.url, LOCALE),
    why: "이 일정에 실제로 맞는 패스입니다. 연속 7일 동안 도쿄발 호쿠리쿠 신칸센과 끝쪽의 간사이 지역을 커버합니다. 도카이도 신칸센은 포함되지 않아 갈 때와 다른 길로 돌아올 때만 쓸 수 있습니다.",
  },
  {
    label: "JAPAN RAIL PASS(7일, 14일, 21일)",
    ctaLabel: "클룩에서 JR 패스 보기 →",
    url: klookFor(jrPassWholeJapanCurrent.url, LOCALE),
    why: "사기 전에 이 경로로 계산해 보세요. 도쿄 → 가나자와 → 다카야마 → 교토 → 오사카 12일 여행은 장거리 2구간과 특급 하나를 쓰며, 패스 가격을 확실히 넘는다고 보기 어렵습니다. JR 패스 가이드에서 내 구간을 계산할 수 있습니다.",
  },
  {
    label: "도쿄 서브웨이 티켓(24 / 48 / 72시간)",
    ctaLabel: "서브웨이 티켓 보기 →",
    url: klookFor(tokyoSubwayTicket.url, LOCALE),
    why: "앞쪽 도쿄 일정은 메트로와 도에이 노선을 쓰는 날이고, 일루미네이션 구간인 마루노우치, 롯폰기, 에비스도 야마노테선이 아니라 이 노선에 있습니다. JR과 야마노테선은 포함되지 않으며 많이들 잘못 아는 부분입니다.",
  },
];

type Stop = {
  time: string;
  place: string;
    allow: string;
  getting: string;
  booking: string;
};

type Pick = { label: string; url: string };

type Day = {
  n: number;
  label: string;
  heading: string;
  intro: string;
  stops: Stop[];
  book: ReactNode;
  picks: Pick[];
};

const days: Day[] = [
  {
    n: 1,
    label: "1일차",
    heading: "1일차: 도쿄, 어둠 속 공항 이동",
    intro:
      "겨울에는 이날이 한 가지로 달라집니다. 오후 4시 반쯤 어두워지므로 대부분의 일정이 넣는 도착일 관광을 할 수 없습니다. 이동, 체크인, 조명이 켜진 동네 한 곳을 걷는 것으로 계획하세요. 타협이 아닙니다. 도쿄의 일루미네이션 시즌은 11월 초에 이미 시작하고, 조명은 도착하는 바로 그 시간에 가장 좋습니다.",
    stops: [
      {
        time: "도착 후",
        place: "입국 심사, 수하물, 휴대폰 연결",
        allow: "1~1.5시간",
        getting: "n/a",
        booking: "출국 전에 eSIM 활성화. 받을 것도, 추운 터미널의 창구 줄도 없습니다",
      },
      {
        time: "오후 또는 저녁",
        place: "공항에서 도쿄 숙소로",
        allow: "공항과 숙소에 따라 40분~1.5시간",
        getting: "나리타 익스프레스, 게이세이 스카이라이너, 리무진 버스. 하네다는 게이큐나 모노레일",
        booking: "예약할 만합니다. 짐 공간이 있는 따뜻한 지정석입니다",
      },
      {
        time: "늦은 오후",
        place: "체크인, 짐 맡기기",
        allow: "1시간",
        getting: "거점을 잘 골랐다면 역에서 도보",
        booking: "도쿄 4박, 사전 예약",
      },
      {
        time: "저녁",
        place: "숙소 동네의 밤: 신주쿠 오모이데요코초, 아사쿠사 나카미세, 도쿄역이라면 마루노우치 조명",
        allow: "2~3시간",
        getting: "도보",
        booking: "아니요. 거리 조명은 무료입니다",
      },
    ],
    book: (
      <>
공항 구간, 데이터, 이어지는 도쿄 3일의 서브웨이 티켓입니다. 나리타 경로는 도시의 어느 쪽에서 자느냐에 달려 있으며 <Link href="/guides/transport/tokyo-airport-transfer" hrefLang="en">도쿄 공항 이동 가이드(영어)</Link>에서 모두 다룹니다. 리무진 버스는 짐이 크거나 호텔이 역 옆이 아닐 때 고르고, N&apos;EX 왕복은 도쿄에서 귀국하는 버전에서만 돌아오는 표가 쓸모 있습니다. 겨울 특유의 서브웨이 티켓 이야기도 있습니다. 일루미네이션 구간인 마루노우치, 롯폰기, 에비스가 야마노테선이 아니라 메트로와 도에이 노선에 있어 12월에 특히 잘 맞습니다. JR과 야마노테선은 포함되지 않습니다.
</>
    ),
    picks: [
      { label: "나리타 익스프레스 왕복 →", url: klookFor(naritaExpressRoundTripUrl, LOCALE) },
      { label: "나리타 리무진 버스 →", url: klookFor(naritaLimousineBus.url, LOCALE) },
      { label: "하네다 리무진 버스 →", url: klookFor(hanedaLimousineBus.url, LOCALE) },
      { label: "도쿄 서브웨이 티켓 →", url: klookFor(tokyoSubwayTicket.url, LOCALE) },
      { label: "클룩 eSIM 보기 →", url: klookFor(klookEsim.url, LOCALE) },
    ],
  },
  {
    n: 2,
    label: "2일차",
    heading: "2일차: 낮에는 도쿄 동쪽, 밤에는 일루미네이션",
    intro:
      "도쿄의 겨울 하루가 여름보다 나은 것은 저녁이므로 저녁부터 거꾸로 짜세요. 맑고 건조한 공기 속에서 센소지, 나카미세, 스미다강 쪽을 돌고, 해가 진 뒤 조명 한 곳을 봅니다. 무료 거리 조명이 가장 기억에 남고, 입장료가 있는 두 곳은 미리 정해야 합니다.",
    stops: [
      {
        time: "오전",
        place: "아사쿠사 센소지와 나카미세",
        allow: "2시간",
        getting: "긴자선 또는 아사쿠사선으로 아사쿠사, 둘 다 서브웨이 티켓 적용",
        booking: "아니요",
      },
      {
        time: "이른 오후",
        place: "도쿄 스카이트리, 또는 스미다강변과 기요스미",
        allow: "2시간",
        getting: "아사쿠사선으로 오시아게까지 두 정거장",
        booking: "전망대는 시간 예약 권장, 강변은 예약 없이 가능",
      },
      {
        time: "해 질 녘, 16:30경부터",
        place: "무료 거리 조명: 마루노우치(2월 14일까지), 롯폰기 게야키자카(12월 25일까지), 에비스 가든 플레이스(2월 28일까지)",
        allow: "1.5~2시간",
        getting: "메트로. 마루노우치는 도쿄역에서 도보",
        booking: "아니요. 무료이고 티켓이 필요 없습니다",
      },
      {
        time: "저녁",
        place: "걷기보다 한 곳을 보고 싶다면 유료 조명: 오이 경마장의 도쿄 메가 일루미, 또는 요미우리랜드 주얼루미네이션",
        allow: "2~3시간",
        getting: "도쿄 모노레일로 오이케이바조마에, 요미우리랜드는 게이오선과 버스",
        booking: "권장. 거리가 아니라 입장권입니다",
      },
    ],
    book: (
      <>
이 저녁의 무료 부분은 티켓이 필요 없고, <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">도쿄 일루미네이션 가이드(영어)</Link>에 곳별 날짜, 시간, 입장료와 출처를 정리했습니다. 예약할 만한 것은 넓게 도는 방법입니다. 가이드 야간 도보 투어나, 일루미네이션 구간을 끝까지 달리는 오픈탑 버스입니다. 큰 유료 조명 한 곳을 원한다면 도쿄 메가 일루미와 요미우리랜드 모두 미리 판매합니다. 메가 일루미는 경마장 재건축으로 쉬기 전 마지막 시즌이며, 홈페이지 기준 12월 24일~1월 1일 휴무, 마지막 날은 2027년 1월 10일입니다. 1월 하순 여행이라면 요미우리랜드입니다.
</>
    ),
    picks: [
      { label: "도쿄 야간 도보 투어 →", url: klookFor(tokyoNightTourAkihabaraShibuya.url, LOCALE) },
      { label: "오픈탑 관광버스 →", url: klookFor(tokyoOpenTopBusSightseeing.url, LOCALE) },
      { label: "도쿄 메가 일루미 티켓 →", url: klookFor(tokyoMegaIllumiTicket.url, LOCALE) },
      { label: "요미우리랜드 입장권 →", url: klookFor(yomiurilandTicket.url, LOCALE) },
    ],
  },
  {
    n: 3,
    label: "3일차",
    heading: "3일차: 눈의 날, 갈라 유자와 또는 하쿠바 왕복",
    intro:
      "겨울에만 있는 날입니다. 3일차에 둔 이유는 날씨 위험이 있기 때문입니다. 앞에 두면 취소되어도 옮길 날이 3일 남습니다. 일본의 특이한 점은 스키 휴가가 아니어도 스키 하루가 가능하다는 것입니다. 갈라 유자와는 도쿄역에서 조에쓰 신칸센으로 환승 없이 가고, 역과 리프트 승강장이 같은 건물입니다.",
    stops: [
      {
        time: "이른 아침",
        place: "도쿄역에서 눈으로",
        allow: "편도 1.5~2시간",
        getting: "갈라 유자와와 나에바는 조에쓰 신칸센, 하쿠바는 버스 또는 호쿠리쿠 노선",
        booking: "투어나 패키지는 필수, 어느 쪽이든 좌석 권장",
      },
      {
        time: "늦은 오전~오후 중반",
        place: "슬로프에서, 또는 구경만 해도 좋습니다",
        allow: "4~5시간",
        getting: "갈라는 역 건물에서 리프트, 하쿠바는 마을에서 셔틀",
        booking: "렌털과 리프트권은 열차보다 빨리 소진됩니다",
      },
      {
        time: "오후 중반",
        place: "베이스의 온천, 사람들이 계획을 잊는 부분입니다",
        allow: "1시간",
        getting: "도보",
        booking: "아니요",
      },
      {
        time: "저녁",
        place: "저녁 식사 전 도쿄 복귀",
        allow: "2시간",
        getting: "신칸센 또는 버스",
        booking: "시즌 일요일 저녁은 지정석 권장",
      },
    ],
    book: (
      <>
먼저 스키를 탈지 눈을 볼지 정하세요. 예약이 다릅니다. 스키를 탄다면 버스, 리프트권, 장비를 묶은 패키지가 값어치가 있습니다. 그렇지 않으면 읽을 수 없는 언어로 세 번 줄을 서야 합니다. 스키를 타지 않거나 일행이라면 전용 차량 일정이 갈라 유자와, 나에바, 하쿠바를 좌석이 아니라 차량당 요금으로 커버하고, 갈라 리프트권만 사면 썰매 반나절과 긴 점심이 됩니다. 갈라 공식 일정은 2026년 12월 19일~2027년 5월 5일 슬로프 운영, 12월 12~18일은 관광 운행만, 남쪽 지역은 시즌 내내 휴무입니다. 열차와 리프트 요금은 <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">갈라 유자와 스키 당일 여행 가이드(영어)</Link>에 있습니다. 스키보다 눈을 보고 싶다면 같은 자리에 넣을 수 있는 나가노 쪽 겨울 일정이 <Link href="/ko/guides/attractions/jigokudani-snow-monkey-tour">지고쿠다니 원숭이 공원 투어 가이드</Link>에 있습니다. 가기 전에 정할 것이 하나 있습니다. 여행자 보험은 온피스트와 오프피스트를 완전히 다르게 취급하며, <Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en">스키 여행자 보험 비교(영어)</Link>에서 공개된 약관으로 살펴봅니다.
</>
    ),
    picks: [
      { label: "갈라 유자와 / 나에바 전용 차량 →", url: klookFor(galaNaebaSkiDayTripTokyo.url, LOCALE) },
      { label: "도쿄 출발 하쿠바 당일 여행 →", url: klookFor(hakubaSkiResortDayTourTokyo.url, LOCALE) },
      { label: "핫포오네 버스 + 리프트 + 렌털 →", url: klookFor(hakubaHapponeBusLiftRental.url, LOCALE) },
      { label: "갈라 유자와 리프트권 →", url: klookFor(galaYuzawaLiftTicket.url, LOCALE) },
    ],
  },
  {
    n: 4,
    label: "4일차",
    heading: "4일차: 도쿄 서쪽, 메이지 신궁, 시부야, 일 년 중 가장 맑은 일몰",
    intro:
      "겨울은 도쿄 전망대가 값어치를 하는 계절입니다. 차고 건조한 공기 덕분에 후지산이 보이기 때문입니다. 일몰이 일러 하루의 끝이 아니라 하루 안에 편하게 들어갑니다. 12월에는 해가 4시 반 전에 지므로 일몰과 저녁 식사 중 하나를 고를 필요가 없습니다.",
    stops: [
      {
        time: "오전",
        place: "메이지 신궁과 하라주쿠 쪽",
        allow: "2시간",
        getting: "야마노테선으로 하라주쿠",
        booking: "아니요. 신궁 경내는 무료입니다",
      },
      {
        time: "이른 오후",
        place: "도요스의 teamLab Planets, 또는 오모테산도와 시부야 도보",
        allow: "2~3시간",
        getting: "teamLab은 유리카모메로 신토요스, 그 외에는 도보",
        booking: "teamLab은 필수. 30분 단위 입장이고 현장 판매가 없습니다",
      },
      {
        time: "일몰",
        place: "SHIBUYA SKY",
        allow: "1~1.5시간",
        getting: "역 위 시부야 스크램블 스퀘어 안",
        booking: "사실상 필수. 일몰 시간대가 먼저 나갑니다",
      },
      {
        time: "저녁",
        place: "시부야나 신주쿠에서 저녁, 그다음 복귀",
        allow: "2~3시간",
        getting: "도보와 야마노테선 한 정거장",
        booking: "아니요",
      },
    ],
    book: (
      <>
시간 지정 티켓 두 장이고 전망대가 마감이 있습니다. SHIBUYA SKY는 일본 시간 0시 정각에 2주 뒤 날짜가 판매되며, 인기 있는 겨울 날짜의 일몰 시간대가 가장 먼저 나갑니다. <Link href="/guides/attractions/shibuya-sky-tickets" hrefLang="en">시부야 스카이 티켓 가이드(영어)</Link>에 두 가격대와 예약 시기를 정리했습니다. teamLab Planets는 현장 판매 없는 30분 단위 입장이며 <Link href="/ko/guides/attractions/teamlab-planets-tickets">teamLab Planets 가이드</Link>에서 다룹니다. 둘 다 실내이거나 지붕이 있어, 3일차가 눈으로 막히면 옮기기 좋은 날입니다.
</>
    ),
    picks: [
      { label: "SHIBUYA SKY 티켓 →", url: klookFor(shibuyaSkyTicketUrl, LOCALE) },
      { label: "teamLab Planets 티켓 →", url: klookFor(teamlabPlanetsTicketUrl, LOCALE) },
      { label: "도쿄 서브웨이 티켓 →", url: klookFor(tokyoSubwayTicket.url, LOCALE) },
    ],
  },
  {
    n: 5,
    label: "5일차",
    heading: "5일차: 호쿠리쿠 신칸센으로 도쿄에서 가나자와로",
    intro:
      "이 일정을 평범한 일정이 아니라 겨울 일정으로 만드는 이동입니다. 호쿠리쿠 신칸센은 약 2시간 반 만에 태평양 쪽에서 동해 쪽으로 넘어가고 날씨도 함께 바뀝니다. 가나자와와 그 뒤의 산에는 도쿄에 거의 없는 눈이 옵니다. 소나무 가지를 줄로 받친 눈 속의 겐로쿠엔이 이 경로의 중심 장면입니다.",
    stops: [
      {
        time: "오전",
        place: "도쿄역에서 가나자와로",
        allow: "승강장 이동 포함 2.5~3시간",
        getting: "호쿠리쿠 신칸센. JR 서일본 수치로 2시간 28분, 환승 없음",
        booking: "가가야키는 필수. 전석 지정이라 예약 없이 탈 수 없습니다",
      },
      {
        time: "이른 오후",
        place: "짐을 맡기고 오미초 시장에서 점심",
        allow: "1.5시간",
        getting: "역에서 버스 또는 짧은 택시",
        booking: "아니요",
      },
      {
        time: "오후",
        place: "겐로쿠엔과 가나자와성 공원",
        allow: "2~3시간",
        getting: "역 앞에서 가나자와 주유버스",
        booking: "아니요. 현장 입장",
      },
      {
        time: "저녁",
        place: "해가 진 뒤 히가시 차야 거리",
        allow: "2시간",
        getting: "시장에서 버스 또는 도보 25분",
        booking: "아니요",
      },
    ],
    book: (
      <>
열차와 그 끝의 2박입니다. 타야 할 열차는 <strong>가가야키</strong>이고, 전석 지정이라는 특이한 규칙이 있어 당일 아침으로 미룰 수 없습니다. <Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en">도쿄–가나자와 가이드(영어)</Link>에 시간, 좌석 등급, 자유석이 있는 하쿠타카를 정리했습니다. 패스에 대해 말하면 전국 JR 패스는 이런 여행에 맞는 경우가 드뭅니다. 계산은 <Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR 패스 가이드(영어)</Link>에 있습니다. 반면 호쿠리쿠 아치 패스는 자주 맞습니다. 도쿄 → 가나자와 → 간사이를 정확히 커버하고 돌아오는 도카이도 신칸센은 일부러 제외하기 때문입니다.
</>
    ),
    picks: [
      { label: "도쿄 → 가나자와 신칸센 →", url: klookFor(shinkansenTokyoKanazawa.url, LOCALE) },
      { label: "호쿠리쿠 아치 패스 →", url: klookFor(hokurikuArchPass.url, LOCALE) },
      { label: "JR 패스 보기 →", url: klookFor(jrPassWholeJapanCurrent.url, LOCALE) },
    ],
  },
  {
    n: 6,
    label: "6일차",
    heading: "6일차: 가나자와, 정원, 찻집 거리, 시장",
    intro:
      "작은 도시 하나에 하루를 다 쓰는 여유입니다. 2박이 이미 잡혀 있어 가능합니다. 가나자와는 작고 대부분 현장 입장이라 예약이 가장 적은 날이고, 다른 곳에서 눈으로 잃은 하루를 흡수하기에도 좋습니다.",
    stops: [
      {
        time: "오전",
        place: "이른 시간의 겐로쿠엔, 또는 21세기 미술관",
        allow: "2~3시간",
        getting: "주유버스",
        booking: "미술관 유료 전시는 예약 권장, 정원은 현장 입장",
      },
      {
        time: "점심",
        place: "오미초 시장 해산물 점심. 겨울이 이 시장으로 유명한 계절입니다",
        allow: "1.5시간",
        getting: "도보",
        booking: "아니요. 다만 카운터 자리는 찹니다",
      },
      {
        time: "오후",
        place: "나가마치 무사 거리와 히가시 차야",
        allow: "2~3시간",
        getting: "도보와 버스 한 번",
        booking: "아니요",
      },
      {
        time: "저녁",
        place: "가나자와, 일찍 취침. 내일은 예약 버스로 시작합니다",
        allow: "2시간",
        getting: "도보",
        booking: "아직 안 했다면 내일 버스 좌석",
      },
    ],
    book: (
      <>
두 가지뿐이고 그중 하나는 내일 것입니다. 가나자와 가이드 일정은 겐로쿠엔, 히가시 차야, 오미초 시장을 한 번의 예약으로 묶어, 버스 세 구간을 대신해 짧은 겨울 오후에 값어치가 있습니다. 중요한 예약은 내일 도시를 나가는 버스입니다. 호쿠리쿠 철도는 가나자와–시라카와고 노선이 지정석이고 승차 전 예약이 필요하다고 밝히며, 가나자와역 서쪽 출구에서 1시간 15분, 좌석은 승차일 1개월 전에 열립니다. 같은 노선을 운행하는 노히 버스는 성인 요금을 2026년 11월 30일까지 ¥2,800, 12월 1일부터 ¥2,900으로 안내하고, 호쿠리쿠 철도 페이지는 {REREAD}에 확인했을 때 ¥2,800이었습니다. 이쪽에는 현장 승차 대안이 없으며, 자세한 내용은 <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">다카야마와 시라카와고 가이드(영어)</Link>에 있습니다.
</>
    ),
    picks: [
      { label: "가나자와 가이드 일정(겐로쿠엔, 히가시 차야) →", url: klookFor(kanazawaKenrokuenHigashiChayaDayTour.url, LOCALE) },
      { label: "가나자와 도보 당일 투어 →", url: klookFor(kanazawaGeishaKenrokuenCastleDayTour.url, LOCALE) },
    ],
  },
  {
    n: 7,
    label: "7일차",
    heading: "7일차: 가나자와에서 시라카와고를 거쳐 다카야마로",
    intro:
      "일정이 산으로 들어가는 날이고 열차가 없는 날입니다. 시라카와고에는 철도역이 없으며, 이 사실이 지역의 모든 계획을 결정합니다. 눈 덮인 마을이 4월이 아니라 1, 2월에 찾아오는 이유이고, 초가집은 세트가 아니라 실제로 사람이 사는 집입니다.",
    stops: [
      {
        time: "오전",
        place: "가나자와역 서쪽 출구에서 시라카와고로",
        allow: "1.5시간",
        getting: "호쿠리쿠 철도 고속버스, 1시간 15분, 2026년 12월 1일부터 성인 ¥2,900",
        booking: "필수. 지정석이고 승차 전 예약이 필요합니다",
      },
      {
        time: "늦은 오전~오후 중반",
        place: "오기마치: 초가집, 갓쇼즈쿠리 민가원, 위쪽 시로야마 전망대",
        allow: "2~3시간",
        getting: "도보, 전망대는 오르막",
        booking: "마을은 불필요, 전망대는 겨울에 별도 방식이 있습니다",
      },
      {
        time: "오후 중반",
        place: "시라카와고에서 다카야마로",
        allow: "1시간",
        getting: "노히 버스 시라카와고선, 약 50분, 2026년 12월 1일부터 성인 ¥2,900",
        booking: "일부 편은 예약 필수로 표시됩니다. 하루가 걸려 있다면 어느 쪽이든 예약하세요",
      },
      {
        time: "저녁",
        place: "다카야마 산마치 거리와 히다규 저녁",
        allow: "2~3시간",
        getting: "역에서 도보",
        booking: "시즌에는 저녁 예약 권장",
      },
    ],
    book: (
      <>
이동을 모두 맡기는 가이드 일정 하나, 또는 버스 좌석 두 개입니다. 가나자와 출발 상품은 돌아오지 않고 다카야마에 내려 주는 유일한 상품으로, 이 구간에 딱 맞으며 8~10시간, 영어 가능 공인 가이드입니다. 직접 간다면 위 요금은 운영사 공식이고 2026년 12월 1일에 오릅니다. 가나자와 → 시라카와고 ¥2,900, 다카야마까지 약 50분 ¥2,900으로 각각 ¥2,800에서 인상됩니다. 둘 다 JR이 아닌 민영 고속버스라 어떤 JR 패스도 적용되지 않습니다.
</>
    ),
    picks: [
      { label: "가나자와 출발 시라카와고·다카야마 일정 →", url: klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE) },
      { label: "시라카와고선 버스표 →", url: klookFor(shirakawagoLineBusTicket.url, LOCALE) },
    ],
  },
  {
    n: 8,
    label: "8일차",
    heading: "8일차: 다카야마, 그리고 네 날 중 하나라면 시라카와고 라이트업",
    intro:
      "이 일정에서 즉흥으로 할 수 없는 유일한 저녁입니다. 시라카와고 겨울 라이트업은 2027년 1월 11, 17, 24, 31일 네 저녁, 17:30~19:30에만 열리고, 시라카와고 관광협회가 완전 사전 예약과 입장권 방식으로 운영합니다. 공지는 분명합니다. 당일 판매는 없고 티켓 없이 가면 들어갈 수 없습니다. 네 날에 해당하지 않으면 이날은 다카야마의 날이며 그것도 좋습니다.",
    stops: [
      {
        time: "오전",
        place: "미야가와 아침 시장과 산마치 거리",
        allow: "2~3시간",
        getting: "도보",
        booking: "아니요",
      },
      {
        time: "점심",
        place: "히다 민속촌(히다노사토), 버스 이동 없이 보는 눈 지붕 마을",
        allow: "2시간",
        getting: "역에서 노선버스",
        booking: "아니요",
      },
      {
        time: "오후",
        place: "고카야마와 시라카와고 가이드 일정, 또는 시내에서 느긋한 오후",
        allow: "가이드 일정은 최대 7시간 20분",
        getting: "역 옆 터미널에서 노히 버스",
        booking: "권장",
      },
      {
        time: "17:30~19:30, 2027년 1월 11, 17, 24, 31일만",
        place: "시라카와고 라이트업",
        allow: "노히 버스 2027년 시간표로 코스별 4시간 40분~5시간 35분",
        getting: "다카야마에서 14:40~15:40 출발 예약 버스. 이 행사는 예약 없이 갈 방법이 없습니다",
        booking: "필수, 사전 예약, 당일 티켓 없음",
      },
    ],
    book: (
      <>
날짜가 네 날 중 하나라면 여행의 다른 무엇보다 먼저 예약하세요. 협회는 참가 방법 다섯 가지를 공개하며, {REREAD} 기준 두 가지는 거의 끝났습니다. 마을 숙박 추첨은 10월 31일에 마감되었고 주차장 1차는 매진되었으며, 2차는 12월 1일 13:00에 최대 5명 ¥7,000으로 열립니다. 여행사 투어는 12월 2일 13:00에 나옵니다. 차도 마을 숙소도 필요 없는 방법은 다카야마발 노히 버스 라이트업 버스입니다. 11월 2일부터 네 저녁 모두 판매 중이며 야외 박물관 코스 ¥13,000, 온천 코스 ¥14,000, 전망대에 가는 유일한 코스 ¥16,000이고 일본어 웹 시스템으로만 예약합니다. 클룩의 다카야마 출발 라이트업 일정은 5~5.5시간에 같은 박물관·전망대 선택이 있지만 색인에 2027년 저녁이 아직 없으므로 상품 페이지에서 날짜를 확인하세요. 네 날이 아니라면 아이노쿠라와 민가원을 더하는 고카야마 일정을 고르세요. <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">다카야마와 시라카와고 가이드(영어)</Link>에 출발지별로 정리했습니다.
</>
    ),
    picks: [
      { label: "다카야마 출발 시라카와고 라이트업 일정 →", url: klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE) },
      { label: "시라카와고·고카야마 세계유산 일정 →", url: klookFor(takayamaShirakawagoGokayamaUnescoTour.url, LOCALE) },
    ],
  },
  {
    n: 9,
    label: "9일차",
    heading: "9일차: 다카야마에서 교토로, 긴 내리막",
    intro:
      "이동일이고 이 경로에서 하루 대부분을 쓰는 유일한 날입니다. 다카야마 본선 특급이 강 협곡을 따라 나고야로 내려가고, 거기서 도카이도 신칸센으로 갈아탑니다. 눈 속에서는 아름답고 어떤 날씨든 느립니다. 교토에 도착해 절 세 곳을 보려 하지 말고 조명이 켜진 절 한 곳에 맞추세요.",
    stops: [
      {
        time: "오전",
        place: "다카야마에서 히다 계곡을 따라 특급으로 나고야까지",
        allow: "오전 대부분",
        getting: "다카야마 본선 특급, 강 쪽 좌석 예약",
        booking: "권장. 단선 노선이고 편수가 적습니다",
      },
      {
        time: "점심",
        place: "나고야에서 교토로",
        allow: "열차로 40분~1시간",
        getting: "도카이도 신칸센. 히카리는 패스 적용, 노조미는 적용 안 됨",
        booking: "시즌에는 권장",
      },
      {
        time: "오후 중반",
        place: "교토역 근처 체크인, 그다음 히가시혼간지나 도지 도보",
        allow: "2시간",
        getting: "도보",
        booking: "아니요",
      },
      {
        time: "저녁",
        place: "겨울밤 일루미네이션 한 곳. 교토는 추운 달에 일부 절을 밝힙니다",
        allow: "2시간",
        getting: "시내버스 또는 지하철",
        booking: "절 자체 날짜 확인, 대부분 현장 판매",
      },
    ],
    book: (
      <>
이날은 저희를 통해 살 것이 없으며, 그 점을 알려 드리려고 씁니다. 철도가 하루의 전부입니다. 패스가 있다면 히다 특급과 도카이도 신칸센 히카리는 적용되고 노조미는 안 됩니다. 교토까지 약 30분 차이이며 <Link href="/guides/transport/tokyo-to-kyoto" hrefLang="en">도쿄–교토 가이드(영어)</Link>에 같은 노선으로 정리했습니다. 할 만한 일은 히다 좌석 예약입니다. 단선에 편수가 적고, 2시간을 통로에 서 있는 것은 일정 최고의 풍경을 낭비하는 일입니다.
</>
    ),
    picks: [
      { label: "이 구간 JR 패스 보기 →", url: klookFor(jrPassWholeJapanCurrent.url, LOCALE) },
      { label: "도쿄 ⇄ 교토 신칸센 티켓 →", url: klookFor(shinkansenTokyoKyoto.url, LOCALE) },
    ],
  },
  {
    n: 10,
    label: "10일차",
    heading: "10일차: 교토, 추위 속 금각사, 후시미이나리, 아라시야마",
    intro:
      "교토는 겨울이 가장 많은 것을 주는 도시이고 이유는 평범합니다. 새해 주간과 매화 사이에 인파가 가장 적고 유명한 곳 대부분이 현장 입장입니다. 지붕에 눈이 쌓인 금각사는 모두가 원하지만 아무도 계획할 수 없습니다. 교토 1월 평균 기온은 4.8°C로, 코트가 맞지 않으면 괴로울 만큼 춥지만 눈을 보장할 만큼은 아닙니다.",
    stops: [
      {
        time: "이른 아침",
        place: "버스 단체 전의 후시미이나리",
        allow: "2시간",
        getting: "JR 나라선, 교토역에서 두 정거장",
        booking: "아니요. 항상 열려 있고 무료이며 어느 계절이든 07:00이 가장 좋습니다",
      },
      {
        time: "늦은 오전",
        place: "금각사",
        allow: "1시간",
        getting: "교토역에서 시내버스 101번 또는 205번",
        booking: "아니요. 현장 입장",
      },
      {
        time: "오후",
        place: "아라시야마: 대나무 숲, 덴류지, 가쓰라강변",
        allow: "3시간",
        getting: "JR 사가노선으로 사가아라시야마",
        booking: "대나무 숲은 불필요. 사가노 로맨틱 열차는 한겨울에 운행하지 않으니 이에 맞춰 짜지 마세요",
      },
      {
        time: "저녁",
        place: "해가 진 뒤 기온과 폰토초",
        allow: "2~3시간",
        getting: "버스 또는 게이한선",
        booking: "저녁 식사 예약 권장",
      },
    ],
    book: (
      <>
교토는 예약할 것이 거의 없고, 도시 가이드에서도 그렇게 말합니다. 예약으로 얻는 것은 버스 문제의 해결입니다. 가이드 일정 하나로 금각사, 후시미이나리, 아라시야마를 시내버스 세 구간 없이 잇고, 짧은 겨울 오후에는 세 곳과 두 곳의 차이가 됩니다. 기모노 렌털도 현장보다 예약이 좋고 겨울 세트에는 하오리가 있습니다. 무엇을 예약하느냐보다 어디서 자느냐가 중요합니다. <Link href="/guides/attractions/where-to-stay-in-kyoto" hrefLang="en">교토 숙소 가이드(영어)</Link>에서 역, 중심부, 아라시야마를 분위기가 아니라 이동 시간으로 비교합니다.
</>
    ),
    picks: [
      { label: "교토 하이라이트 버스 투어 →", url: klookFor(kyotoHighlightBusTour.url, LOCALE) },
      { label: "교토·나라 가이드 일정 →", url: klookFor(kyotoNaraKiyomizuTour.url, LOCALE) },
      { label: "교토 기모노 렌털 →", url: klookFor(kyotoKimonoYumeyakata.url, LOCALE) },
    ],
  },
  {
    n: 11,
    label: "11일차",
    heading: "11일차: 교토에서 오사카로, 그리고 해가 진 뒤의 정원",
    intro:
      "JR 신쾌속으로 30분이면 여행의 분위기가 바뀝니다. 겨울 오사카는 실내와 밤의 도시로 계절에 맞습니다. 일정에 꼭 넣을 것은 teamLab 식물원 오사카입니다. 야간 전용 야외 시설이고 이 기간 입장 마감이 20:30이라, 끼워 넣는 것이 아니라 맞춰서 계획할 저녁입니다.",
    stops: [
      {
        time: "오전",
        place: "교토에서 오사카로, 호텔에 짐 맡기기",
        allow: "이동 포함 1.5시간",
        getting: "JR 신쾌속 또는 한큐선, 어느 쪽이든 약 30분",
        booking: "아니요",
      },
      {
        time: "점심",
        place: "오사카성 또는 구로몬 시장 점심",
        allow: "2~3시간",
        getting: "미도스지선과 주오선",
        booking: "아니요. 둘 다 현장 입장",
      },
      {
        time: "오후",
        place: "도톤보리와 신사이바시, 또는 리버 크루즈",
        allow: "2시간",
        getting: "난바에서 도보",
        booking: "크루즈는 권장",
      },
      {
        time: "18:00부터",
        place: "teamLab 식물원 오사카, 나가이",
        allow: "이동 외 1.5~2시간",
        getting: "미도스지선 나가이(M26), 3번 출구에서 도보 약 10분",
        booking: "권장. 성인 기준 현장보다 ¥200 저렴하고 현장은 매진될 수 있습니다",
      },
    ],
    book: (
      <>
두 가지이고, 패스 하나가 첫 번째의 필요 여부를 정합니다. 오사카 주유패스는 40곳 이상의 시설과 그 사이 메트로를 포함해 오사카의 빡빡한 하루에 매우 유리합니다. teamLab 정원은 포함되지 않으며 별도 티켓입니다. teamLab 공식 요금은 성인 ¥1,800, 6~15세 ¥500이고 현장은 ¥2,000, ¥600입니다. <Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets" hrefLang="en">teamLab 식물원 오사카 가이드(영어)</Link>에 날짜별 시간, 우천 규칙, 공식 티켓의 날짜 변경 3회를 정리했습니다. 숙소는 미도스지선이 좋습니다. 나가이에서 21:00에 끝나도 열차 한 번이면 돌아옵니다. 비교는 <Link href="/guides/attractions/where-to-stay-in-osaka" hrefLang="en">오사카 숙소 가이드(영어)</Link>에 있습니다.
</>
    ),
    picks: [
      { label: "teamLab 식물원 오사카 →", url: klookFor(teamlabBotanicalGardenOsakaTicket.url, LOCALE) },
      { label: "오사카 주유패스 →", url: klookFor(osakaAmazingPass.url, LOCALE) },
      { label: "도톤보리 리버 크루즈 →", url: klookFor(dotonboriCityCruise.url, LOCALE) },
    ],
  },
  {
    n: 12,
    label: "12일차",
    heading: "12일차: 간사이 출국",
    intro:
      "겨울 특유의 경고가 하나 있는 출국일입니다. 200 km 떨어진 곳의 눈이 이날 아침까지 영향을 줄 수 있습니다. 도카이도와 호쿠리쿠 노선이 간사이 철도망으로 이어지기 때문입니다. 시간표보다 1시간 여유를 두고, 공항 이동은 플랫폼에서 찾지 말고 미리 예약하세요.",
    stops: [
      {
        time: "오전",
        place: "호텔에서 한 정거장 안의 남은 볼거리",
        allow: "1~2시간",
        getting: "도보",
        booking: "아니요",
      },
      {
        time: "점심",
        place: "오사카에서 간사이 국제공항으로",
        allow: "문에서 게이트까지 1.5~2시간",
        getting: "덴노지나 신오사카에서 JR 하루카, 또는 난바에서 난카이 라피트",
        booking: "권장. 겨울 일요일에 짐 공간이 있는 지정석은 몇백 엔의 값어치가 있습니다",
      },
      {
        time: "공항에서",
        place: "쇼핑했다면 면세 환급 창구",
        allow: "30~45분",
        getting: "터미널 안내",
        booking: "아니요",
      },
    ],
    book: (
      <>
공항 구간뿐입니다. 어느 쪽이 맞는지는 어디서 잤느냐에 달려 있습니다. 하루카는 덴노지와 신오사카, 라피트는 난바에서 출발하며 <Link href="/guides/transport/haruka-vs-nankai-rapit" hrefLang="en">하루카와 난카이 라피트 비교(영어)</Link>에서 시간과 가격을 나란히 볼 수 있습니다. 버스와 이타미 쪽은 <Link href="/guides/transport/osaka-airport-transfer" hrefLang="en">오사카 공항 이동 가이드(영어)</Link>에 있습니다.
</>
    ),
    picks: [
      { label: "JR 하루카 티켓 →", url: klookFor(jrHarukaUrl, LOCALE) },
      { label: "난카이 라피트 티켓 →", url: klookFor(nankaiRapitUrl, LOCALE) },
    ],
  },
];

const baseRows = [
  { base: "도쿄", nights: "4", why: "도시 이틀, 눈 당일 왕복 하루, 일루미네이션 저녁. 여름보다 나은 이 계절의 진짜 장점입니다" },
  { base: "가나자와", nights: "2", why: "눈 속의 겐로쿠엔, 그리고 이쪽에서 시라카와고 예약 버스가 출발하는 유일한 거점" },
  { base: "다카야마", nights: "2", why: "옛 시가지, 그리고 1월 네 저녁 노히 버스 라이트업 버스의 거점으로 차도 마을 숙소도 필요 없습니다" },
  { base: "교토", nights: "2", why: "현장 입장 명소의 인파가 연중 가장 적고 예약이 거의 필요 없습니다" },
  { base: "오사카", nights: "1", why: "실내와 밤의 도시, 야간 전용 teamLab 정원, 호텔 아래서 시작하는 간사이 공항 이동" },
];

const tempRows = [
  { city: "도쿄", dec: "7.7°C (12.0 / 3.8)", jan: "5.4°C (9.8 / 1.2)", feb: "6.1°C (10.9 / 2.1)" },
  { city: "교토", dec: "7.2°C", jan: "4.8°C", feb: "5.4°C" },
  { city: "오사카", dec: "8.7°C (12.3 / 5.3)", jan: "6.2°C (9.7 / 3.0)", feb: "6.6°C (10.5 / 3.2)" },
  { city: "삿포로", dec: "−0.9°C (2.0 / −4.0)", jan: "−3.2°C (−0.4 / −6.4)", feb: "−2.7°C (0.4 / −6.2)" },
];

const datedRows = [
  {
    event: "시라카와고 겨울 라이트업(제41회)",
    when: "2027년 1월 11, 17, 24, 31일, 각 17:30~19:30",
    rule: "입장권이 있는 완전 사전 예약제입니다. 협회는 당일 판매가 없고 예약 없이 가면 들어갈 수 없다고 분명히 밝히며, 참가 방법 다섯 가지를 공개합니다. 마을 숙박 추첨은 10월 31일 마감, 주차장 2차는 12월 1일 13:00 오픈, 노히 버스 다카야마 라이트업 버스는 네 저녁 모두 판매 중입니다",
    source: "시라카와고 관광협회, 노히 버스",
  },
  {
    event: "삿포로 눈축제(제77회)",
    when: "2027년 2월 4~11일, 8일간",
    rule: "무료 입장이며 오도리 회장(니시 1~11초메)과 스스키노 회장(에키마에도리 미나미 4~6조)에 티켓이 없습니다. 매진되는 것은 도시입니다. 삿포로 숙소와 신치토세 항공편은 몇 달 전에 차며, 이 행사에 실제로 필요한 예약입니다",
    source: "삿포로 눈축제 실행위원회",
  },
  {
    event: "오타루 눈빛 거리 축제(제29회)",
    when: "2027년 2월 6~13일, 삿포로 눈축제와 겹침",
    rule: "날짜는 확정되었고 오타루 관광협회는 세부 사항을 추후 안내한다고 밝혀, 시간과 장소는 공식 발표 대기 중입니다",
    source: "오타루 관광협회, 홋카이도 공식 관광 사이트",
  },
  {
    event: "시코쓰호 얼음 축제",
    when: "2027년 1월 30일~2월 23일, 매일 10:00~20:00, 조명 16:30~20:00",
    rule: "입장료가 있고 초등학생 이하는 무료입니다. 홋카이도 공식 관광 사이트에 성인 금액이 없어 저희도 싣지 않습니다",
    source: "홋카이도 공식 관광 사이트",
  },
  {
    event: "스키와 렌털",
    when: "니세코 2026년 11월 28일 예정, 갈라 유자와 슬로프 2026년 12월 19일부터, 하쿠바 개장일은 공식 발표 대기 중",
    rule: "버스 + 리프트 + 장비 패키지는 날짜별로 판매됩니다. 렌털은 일찍 정할 만합니다. 아침에 내 신발 사이즈가 떨어진 가게에는 대안이 없습니다. 다만 클룩의 핫포오네 패키지는 당일 리조트 숍에서 장비를 받습니다",
    source: "니세코 유나이티드, 갈라 유자와, 하쿠바 밸리, 클룩 상품",
  },
  {
    event: "teamLab 식물원 오사카",
    when: "야간 전용, 2027년 1월 31일까지 입장 마감 20:30",
    rule: "현장 당일권은 있지만 성인 ¥200 더 비싸고 매진될 수 있습니다. 공식 사이트 티켓은 입장일 21:00까지 날짜를 3회 변경할 수 있습니다",
    source: "teamLab",
  },
];

const snowRows = [
  {
    place: "유자와와 나에바(니가타)",
    getting: "도쿄역에서 조에쓰 신칸센, 환승 없음. 갈라 유자와의 역과 리프트 승강장은 같은 건물입니다",
    season: "갈라 공식 일정으로 슬로프 2026년 12월 19일~2027년 5월 5일, 12월 12~18일은 관광 운행만",
    forWhom: "추가 숙박 없이 도쿄 여행 안에 넣는 눈의 하루",
  },
  {
    place: "하쿠바(나가노)",
    getting: "도쿄에서 버스, 또는 호쿠리쿠 신칸센으로 나가노 후 버스",
    season: "하쿠바 밸리 시즌권 기준 2026년 12월~2027년 5월 초 예정, 스키장별 개장일은 공식 발표 대기 중",
    forWhom: "제대로 된 스키, 계곡 패스 하나에 네 리조트",
  },
  {
    place: "시라카와고와 다카야마(기후)",
    getting: "가나자와나 다카야마에서 예약 고속버스, 시라카와고에는 철도역이 없음",
    season: "1월과 2월이 깊은 눈의 달입니다",
    forWhom: "눈 덮인 마을 사진, 스키가 아님",
  },
  {
    place: "니세코와 루스쓰(홋카이도)",
    getting: "신치토세 공항에서 직행 버스, 스키 가방을 실을 수 있음",
    season: "니세코 유나이티드는 2026년 11월 28일 4개 지역 개장 예정, 지역별로 2027년 4월 4일~5월 5일 폐장",
    forWhom: "도시가 아니라 눈이 목적인 여행",
  },
  {
    place: "삿포로와 오타루(홋카이도)",
    getting: "신치토세로 비행 후 전철 또는 예약 차량",
    season: "12, 1, 2월에 눈이 쌓여 있습니다. 기상청 평년값으로 1월 강설량만 137 cm",
    forWhom: "도시 경험으로서의 눈, 2월 축제까지",
  },
];

const packRows = [
  { item: "두꺼운 스웨터가 아니라 제대로 된 코트", why: "기상청 평년값으로 1월 일 최저 평균은 도쿄 1.2°C, 삿포로 −6.4°C입니다. 들어가는 건물과 열차마다 난방이 강해 두꺼운 옷 한 벌보다 방풍 겉옷 안의 겹옷이 낫습니다" },
  { item: "접지력 있는 신발과 여분 양말", why: "다카야마 보도나 절 경내의 다져진 눈이 이 일정의 유일한 위험이고, 시라카와고 전망대는 오르막입니다" },
  { item: "장갑과 귀를 덮을 것", why: "이 계획의 야외 일정은 모두 해가 진 뒤입니다. 일루미네이션, 라이트업, teamLab 정원 모두 기온이 평균이 아니라 최저일 때입니다" },
  { item: "생각보다 적은 옷과 코인 세탁 계획", why: "겨울옷은 부피가 크고 이 경로는 지정석 짐 제한 속에 거점을 다섯 번 옮깁니다. 일본 호텔 대부분에 코인 세탁기가 있습니다" },
  { item: "립밤과 핸드크림", why: "태평양 쪽 겨울은 춥고 건조합니다. 도쿄 전망대에서 후지산이 보이는 이유이자 4일차에 손이 트는 이유입니다" },
  { item: "눈 자체를 위한 짐은 없음", why: "스키를 탄다면 리조트에서 빌리세요. 장비 렌털은 출국 전에 예약할 수 있고 부츠를 직접 가져가는 것은 수하물 요금만큼의 값어치가 드뭅니다" },
];

const hokkaidoRows = [
  { leg: "1~4일차", plan: "위와 똑같은 도쿄, 일루미네이션 저녁과 눈의 날은 그대로" },
  { leg: "5일차", plan: "하네다에서 신치토세로 비행하거나, JR 동일본–남홋카이도 패스가 있다면 도호쿠·홋카이도 신칸센. 예약 차량으로 삿포로" },
  { leg: "6~7일차", plan: "눈축제 회장: 오도리 니시 1~11초메, 스스키노 에키마에도리, 쓰도무 회장. 모두 무료 입장, 모두 야외, 일 최고 평균 0.4°C" },
  { leg: "8일차", plan: "당일 여행: 오타루와 스노 파크(눈빛 거리 축제 2027년 2월 6~13일), 펭귄이 걷는 계절의 아사히야마 동물원, 또는 시코쓰호 얼음 축제 반나절(2027년 1월 30일~2월 23일)" },
  { leg: "9~11일차", plan: "스키 가방을 싣는 공항 버스로 니세코나 루스쓰, 또는 둘 다 원하면 도쿄로 돌아가 본 경로의 가나자와 쪽으로" },
  { leg: "12일차", plan: "신치토세에서 출국하거나 도쿄로 복귀. 이 버전의 위험은 2월 눈으로 공항이 닫히는 것이니 마지막 편은 예약하지 마세요" },
];

const faqItems = [
  {
    q: "일본은 겨울에 가볼 만한가요?",
    a: `네, 다른 계절에는 없는 세 가지 이유가 있습니다. 교토 대부분과 나라 공원처럼 현장 입장인 곳의 인파가 새해 주간과 매화 사이에 가장 적습니다. 태평양 쪽 공기가 건조하고 맑아 도쿄 전망대에서 후지산이 안정적으로 보이는 유일한 시기입니다. 또 여름에는 부차적인 동해 쪽이 주인공이 됩니다. 가나자와 겐로쿠엔과 시라카와고 마을은 눈 속에서 더 좋습니다. 대가는 일조 시간입니다. 12월에는 4시 반쯤 어두워져 관광 시간이 줄어들고, 그래서 이 일정은 도쿄의 모든 날에 저녁 볼거리를 넣었습니다.`,
  },
  {
    q: "겨울 일본에 무엇을 챙겨야 하나요?",
    a: `방풍 겉옷 안의 겹옷, 접지력 있는 신발, 장갑, 그리고 생각보다 훨씬 적은 짐입니다. 중요한 수치는 일본 기상청 1991~2020년 평년값입니다(확인일 ${CHECKED}). 1월 일 최저 평균 도쿄 1.2°C, 월평균 교토 4.8°C, 오사카 6.2°C, 일 최저 평균 삿포로 −6.4°C입니다. 혼슈는 코트 날씨이고 홋카이도는 정말 다릅니다. 실용적인 점이 세 가지 있습니다. 열차, 상점, 식당은 난방이 강해 벗을 수 없는 두꺼운 옷 한 벌보다 얇은 세 벌이 낫습니다. 겨울 여행의 야외 일정은 대부분 해가 진 뒤이고 기온이 최저일 때입니다. 스키를 탄다면 리조트에서 빌리세요. 출국 전에 예약할 수 있습니다.`,
  },
  {
    q: "12월, 1월, 2월 일본은 얼마나 춥나요?",
    a: `일본 기상청 1991~2020년 평년값으로 도쿄는 12월 7.7°C, 1월 5.4°C, 2월 6.1°C이고 1월 일 최고 평균 9.8°C, 최저 1.2°C입니다. 교토는 세 달 내내 도쿄보다 1도 안팎 낮아 7.2°C, 4.8°C, 5.4°C이고, 오사카는 1도 안팎 높아 8.7°C, 6.2°C, 6.6°C입니다. 삿포로는 전혀 다른 나라로 −0.9°C, −3.2°C, −2.7°C이며 1월 일 최고 평균도 영하인 −0.4°C, 1월 강설량만 137 cm입니다. 이 목록 어디서나 1월이 가장 춥고 2월은 1월보다 약간 포근합니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "일본 어디서 눈을 볼 수 있나요?",
    a: `보통 도쿄, 교토, 오사카는 아닙니다. 세 도시는 태평양 쪽이라 눈이 계절이 아니라 사건입니다. 눈은 동해 쪽과 산에 있고, 도쿄에서 가장 가까운 확실한 곳은 니가타 유자와입니다. 갈라 유자와는 도쿄역에서 조에쓰 신칸센으로 환승 없이 가고 역과 리프트 승강장이 같은 건물이라, 스키 휴가 없이 스키 하루가 가능합니다. 나가노 하쿠바도 당일 여행이 가능하고 스키는 더 좋습니다. 스포츠가 아니라 풍경으로서의 눈이라면 1, 2월의 시라카와고와 다카야마가 이 일정의 중심입니다. 홋카이도는 눈이 당연합니다. 삿포로 1월 강설량 평년값은 137 cm입니다.`,
  },
  {
    q: "겨울 투어는 미리 예약해야 하나요?",
    a: `이 일정에서 두 가지는 반드시 그렇고, 나머지는 생각보다 덜합니다. 시라카와고 라이트업은 2027년 네 저녁(1월 11, 17, 24, 31일, 각 17:30~19:30)만 완전 사전 예약제로 열리며 협회 공지는 입장권을 당일 판매하지 않는다고 밝힙니다. 가나자와–시라카와고 고속버스는 지정석이고 호쿠리쿠 철도가 승차 전 예약을 요구하며 현장 승차 대안이 없습니다. 그 외에 호쿠리쿠 신칸센 가가야키는 자유석이 전혀 없고, 스키 렌털은 내 사이즈가 먼저 떨어지며, SHIBUYA SKY 일몰 시간대는 2주 전 날짜가 열리는 순간 나갑니다. 교토의 절, 겐로쿠엔, 도쿄 무료 일루미네이션, 눈축제 회장 등 나머지는 거의 현장 입장입니다.`,
  },
  {
    q: "겨울 일본 여행은 며칠이 필요한가요?",
    a: "이 페이지 경로로 최소 10일, 서두르지 않으려면 12일, 호쿠리쿠 쪽과 홋카이도를 모두 원하면 14일입니다. 겨울은 짧은 여행에 특히 불리합니다. 낮이 짧아 같은 하루가 5월보다 적게 담기고, 날씨 위험이 실제라 여유 없는 계획은 눈으로 막힌 날을 옮길 곳이 없습니다. 일주일뿐이라면 도쿄가 아니라 다카야마와 가나자와 구간을 빼고 도쿄, 교토, 오사카 일주일에 저녁 일루미네이션을 더하세요. 10일이라면 10일 일정이 같은 구간이고 겨울 계획을 넉넉히 담습니다.",
  },
  {
    q: "신칸센은 눈이 와도 달리나요?",
    a: `네, 2월 일본 여행에서 가장 안심되는 점 중 하나입니다. 조에쓰와 도호쿠 노선은 선진국에서 손꼽히는 폭설 지역을 일상적으로 달리며 살수 설비와 스노 셰드를 갖추고 있습니다. 실제로 생기는 것은 취소보다 지연이고 번져 나갑니다. 니가타나 기후의 눈이 몇 시간 떨어진 도카이도 노선을 잡아 둘 수 있습니다. 실용 규칙은 항공편이 있는 날에는 1시간 여유를 두고, 간사이나 신치토세의 마지막 편을 예약하지 말고, 휴대폰을 온라인으로 유지하는 것입니다. 지연과 대체 운행 공지는 모두 휴대폰으로 옵니다.`,
  },
  {
    q: "연말연시는 피해야 하나요?",
    a: `겨울에서 일정 안에 넣기보다 피해서 짜는 유일한 주입니다. 12월 29일경부터 1월 3일까지 박물관과 많은 식당이 닫고, 열차와 신칸센은 연중 가장 붐비며, 이 일정의 모든 도시에서 숙박비가 최고입니다. 예외이자 그래도 가는 이유는 신사입니다. 새해 첫 참배인 하쓰모데는 메이지 신궁과 후시미이나리에서 볼 만하고 둘 다 무료입니다. 날짜가 이 주로 정해져 있다면 예약이 열리는 30일 전에 철도 좌석을 잡고, 현장 입장 명소도 예약제처럼 붐빈다고 생각하세요.`,
  },
  {
    q: "이 겨울 경로에 JR 패스가 이득인가요?",
    a: `전국권은 아마 아니고 호쿠리쿠 아치 패스는 충분히 그렇습니다. 전국권은 장거리가 많아야 본전인데 이 경로는 도쿄–가나자와와 다카야마–교토 둘뿐입니다. 호쿠리쿠 아치 패스는 연속 7일 도쿄–쓰루가 호쿠리쿠 신칸센과 간사이 지역을 포함하고 도카이도 신칸센은 일부러 제외합니다. 가나자와로 나가 교토와 오사카로 돌아오는 여행에 딱 맞는 형태입니다. 시라카와고 고속버스는 JR이 아니라 민영이라 어느 패스도 안 되므로 따로 예산을 잡으세요. JR 패스 가이드에서 내 구간의 손익을 계산할 수 있습니다.`,
  },
  {
    q: "겨울에 아이와 이 일정을 할 수 있나요?",
    a: `대부분 가능하고 두 가지만 조정하면 됩니다. 첫째는 저녁입니다. 일루미네이션, 시라카와고 라이트업, teamLab 정원은 모두 해가 진 뒤 추위 속 외출이고, 노히 버스 라이트업 버스는 빨라도 20:20에 다카야마로 돌아와 어린아이에게 늦습니다. 둘째는 9일차 이동일로 열차 두 번에 하루 대부분을 씁니다. 아이가 어리다면 나누거나 빼세요. 잘 맞는 것은 눈의 날입니다. 눈놀이는 기술도 리프트권도 필요 없고, 홋카이도 스노 파크 반나절이 바로 그런 일정입니다. teamLab 식물원 오사카는 6~15세 ¥500, 미취학 무료로 경로 전체에서 가장 저렴한 가족 티켓이지만 상품 설명은 깜빡이는 조명과 큰 소리를 경고합니다.`,
  },
];

const TITLE = "일본 겨울 여행 12일 일정(2027): 날짜별 코스";
const DESC =
  "일본 겨울 여행 12일: 도쿄, 가나자와, 시라카와고, 다카야마, 교토, 오사카. 날마다 표, 겨울 행사 날짜, 예약할 것.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function JapanWinterItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG[LOCALE] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

            <Breadcrumb trail={trail} />

            <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
업데이트 {monthLabel(updated.iso, LOCALE)}
</p>
          <h1 className={styles.heroTitle}>
일본 겨울 여행:<br />12일 날짜별 일정
</h1>
          <p className={styles.heroSubtitle}>
도쿄, 가나자와, 시라카와고, 다카야마, 교토, 오사카. 날짜가 정해진 겨울 행사 두 가지와 현장에서 아무것도 팔지 않는 행사 하나까지.
</p>
          <div className={styles.heroBadges}>
            {[`업데이트 ${monthLabel(updated.iso, LOCALE)}`, "12일 날마다 표", "2027년 겨울 행사 날짜", "공식 기온"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
                <Disclosure />

                <WinterBookingTop
          heading={"일본 겨울 여행에서 무엇을 먼저 예약해야 할까요?"}
          checkedIso="2026-11-06"
          deadline={
            <>
1월 라이트업이 먼저입니다. 노히 버스 다카야마 버스는 네 저녁 모두 판매 중이고 당일 판매는 없으며 주차장 다음 회차는 12월 1일에 열리므로 <strong>11월 30일</strong>까지 좌석을 잡으세요. 2월 4~11일 눈축제에 맞춘다면 숙소와 항공도 같은 날까지 정하세요.
</>
          }
          tours={[
            {
              title: "가나자와 출발 시라카와고·다카야마 당일 투어",
              url: klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE),
              price: null,
              duration: "8~10시간",
              departs: "가나자와, 왕복 또는 다카야마 편도",
            },
            {
              title: "나고야 출발 시라카와고 라이트업 투어, 2027년 저녁",
              url: klookFor(shirakawagoLightUp2027NagoyaTour.url, LOCALE),
              price: null,
              duration: "10~12시간",
              departs: "나고야, 호텔 픽업 선택 가능",
            },
            {
              title: "하쿠바 스키 당일 여행, 4개 리조트 중 선택",
              url: klookFor(hakubaSkiResortDayTourTokyo.url, LOCALE),
              price: null,
              duration: "약 11시간 20분",
              departs: "도쿄, 전용 차량",
            },
          ]}
        />

                <section className={styles.bodySection}>
          <p className={styles.bodyText}>
이 <strong>일본 겨울 여행</strong>은 <strong>12일, 거점 다섯</strong>(도쿄 4박, 가나자와 2박, 다카야마 2박, 교토 2박, 오사카 1박)이며 명소 목록이 아니라 겨울이 바꾸는 세 가지를 중심으로 짰습니다. 뼈대는 JR 서일본 수치로 <strong>2시간 28분</strong>의 호쿠리쿠 신칸센 도쿄–가나자와, 산으로 들어가는 예약 고속버스, 간사이로 내려가는 도카이도 노선입니다. 날짜는 두 가지가 고정입니다. <strong>시라카와고 겨울 라이트업은 2027년 1월 11, 17, 24, 31일 네 저녁, 각 17:30~19:30만 열리고 당일 티켓을 전혀 판매하지 않습니다</strong>. <strong>제77회 삿포로 눈축제는 2027년 2월 4~11일</strong>이고 무료 입장입니다. 낮은 짧아 12월에는 4시 반쯤 어두워지고, 일본 기상청 1991~2020년 평년값으로 1월 평균은 도쿄 5.4°C, 삿포로 −3.2°C입니다. 아래 행사 날짜, 기온, 요금에는 모두 출처가 있습니다. 행사 날짜와 버스 요금은 {REREAD}, 기후 평년값은 {CHECKED}에 확인했습니다.
</p>
        </section>

                <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>
결론부터
</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
기간
</p>
                <p className={styles.verdictStatValue}>
12일, 거점 5곳
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
먼저 예약
</p>
                <p className={styles.verdictStatValue}>
시라카와고 라이트업
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
최장 구간
</p>
                <p className={styles.verdictStatValue}>
도쿄 → 가나자와, 2시간 28분
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
1월 평균
</p>
                <p className={styles.verdictStatValue}>
도쿄 5.4°C, 삿포로 −3.2°C
</p>
              </div>
            </div>
            <p className={styles.verdictText}>
<strong>요약:</strong> 날짜가 정해진 것부터 잡으세요. 라이트업 저녁, 가나자와 예약 버스, 전석 지정 가가야키, 숙소입니다. 교토는 성수기에도 거의 현장 입장이라 예약 없이 두어도 됩니다.
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink
                href={klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE)}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
              >
시라카와고 라이트업 일정 보기 →
</KlookLink>
              <KlookLink
                href={klookFor(hokurikuArchPass.url, LOCALE)}
                target="_blank"
                rel="sponsored noopener"
                className={styles.pickCta}
              >
호쿠리쿠 아치 패스 보기 →
</KlookLink>
            </div>
          </div>
        </div>

                <KlookTripPrep
          label={"같은 여행에서 예약할 것"}
          heading={"출국 전에 무엇을 예약해야 하나요?"}
          intro={"겨울 여행에서 중요한 순서로 여섯 가지입니다. 날씨 공지를 받을 데이터, 도쿄 공항 어느 쪽이든 편도 공항 이동, 이 경로에 실제로 맞는 패스, 패스 계산, 일루미네이션 구간이 있는 도쿄 서브웨이 티켓입니다."}
          items={sameTripItems}
        />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
구성
</span>
          <h2 className={styles.sectionTitle}>
겨울 일본 12일을 어떻게 나눠야 하나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
거점은 여덟이 아니라 다섯입니다. 겨울은 낮이 짧고 1월의 이동일은 5월보다 비쌉니다. 특이한 선택은 다카야마 2박이고 이 계획을 가능하게 하는 부분입니다. 노히 버스가 1월 네 저녁에 그곳에서 직접 버스를 운행해 차도 마을 숙소도 필요 없습니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["거점", "숙박", "넣은 이유"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {baseRows.map((row) => (
                    <tr key={row.base}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.base}</td>
                      <td className={styles.tdPrice}>{row.nights}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
여행 길이나 계절이 다르다면 <Link href="/guides/attractions/japan-10-day-itinerary" hrefLang="en">일본 10일 일정(영어)</Link>과 <Link href="/guides/attractions/japan-14-day-itinerary" hrefLang="en">일본 14일 일정(영어)</Link>은 호쿠리쿠 없이 도쿄–교토–오사카를 돌고, <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" hrefLang="en">도쿄·교토·오사카 7일 일정(영어)</Link>은 일주일 버전입니다. 아래 12일에는 날마다 표가 있습니다. 시간대, 장소, 소요 시간, 이동 방법, 예약 필요 여부를 담았고 그 아래에 그날의 상품이 있습니다.
</p>
        </section>

                {days.map((day) => (
          <section key={day.n} className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>{day.label}</span>
            <h2 className={styles.sectionTitle}>{day.heading}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{day.intro}</p>
            <div className={styles.tableWrap}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {["시간대", "장소", "소요 시간", "이동 방법", "예약 필요?"].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {day.stops.map((row) => (
                      <tr key={row.place}>
                        <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
              <strong>
{day.n}일차에 예약할 것.
</strong> {day.book}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              {day.picks.map((pick) => (
                <KlookLink
                  key={pick.url}
                  href={pick.url}
                  target="_blank"
                  rel="sponsored noopener"
                  className={styles.pickCta}
                >
                  {pick.label}
                </KlookLink>
              ))}
            </div>
          </section>
        ))}

        <p
          className={styles.bodyText}
          style={{ marginTop: "-1.5rem", marginBottom: "3.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}
        >
열두 표의 “소요 시간”은 운영사 수치가 아니라 저희 계획 기준입니다. 이동 시간과 요금은 운영사 공식입니다. 호쿠리쿠 신칸센 2시간 28분은 JR 서일본 수치로 <Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>도쿄–가나자와 가이드(영어)</Link>에서 가져왔고, 시라카와고 버스 요금과 소요 시간은 노히 버스와 호쿠리쿠 철도 기준으로 {REREAD}에 다시 확인했습니다. 전체 내용은 <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>다카야마와 시라카와고 가이드(영어)</Link>에 있습니다.
</p>

                <KlookStayAreas
          heading={"겨울 일본 여행에서는 어디에 묵어야 하나요?"}
          intro={"12일에 거점 다섯이고, 겨울에는 기준이 하나 더 있습니다. 어두운 길을 짐을 끌고 역에서 얼마나 걷는가입니다. 각 항목은 해당 지역의 클룩 호텔 검색이고 계획이 실제로 쓰는 노선이나 버스 터미널 기준으로 골랐습니다. 숙소 가이드에서 도쿄, 교토, 오사카 지역을 더 자세히 비교합니다."}
          areas={japanWinterStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "눈의 날 비용이 가장 적은 겨울 거점입니다. 스키 버스와 하코네행 오다큐선이 이 역 아래에서 출발하고, 일루미네이션 저녁에는 야마노테선이 문 앞에 있습니다.", area: "도쿄 신주쿠" }, { why: "도쿄를 신칸센으로 두 번 떠나는 계획의 거점입니다. 갈라 유자와행 조에쓰선과 가나자와행 호쿠리쿠선이 모두 이 아래에서 출발하고, 건물을 나서면 마루노우치 조명입니다.", area: "도쿄 도쿄역·마루노우치" }, { why: "호쿠리쿠 신칸센 종점 2박입니다. 겐로쿠엔 버스와 예약제 시라카와고 버스가 모두 역 앞에서 출발하며, 이 여행에서 가장 여유가 없는 구간입니다.", area: "가나자와" }, { why: "이 경로가 산에서 묵는 곳이고 1월 시라카와고 라이트업 버스의 거점입니다. 노히 버스 터미널이 역 옆이라 19:30에 끝나도 환승 없이 걸어서 돌아옵니다.", area: "다카야마역" }, { why: "히다와 도카이도 열차가 내려 주는 곳이고 100번, 101번 관광버스가 출발하는 곳이며, 어두운 출국 아침 공항 하루카가 출발하는 승강장입니다.", area: "교토역" }, { why: "미도스지선, 도보로 도톤보리와 구로몬 시장, 바로 아래 간사이 공항행 난카이 터미널, 그리고 18:00 이후에만 여는 teamLab 정원이 있는 나가이까지 곧장 남쪽으로 갑니다.", area: "오사카 난바" }, { why: "2월 변경의 도시 거점입니다. 오도리 공원까지 지하철 한 정거장이나 짧은 도보이고, 눈축제 회장이 야외이며 2월 일 최고 평균이 0.4°C일 때 필요한 조건입니다.", area: "삿포로역" }, { why: "도시가 아니라 눈이 목적인 여행에서만 별도 거점으로 삼을 만합니다. 리프트가 문 앞에 있고 스키 가방을 싣는 공항 버스가 신치토세에서 직행합니다.", area: "니세코" }] as Partial<typeof item>[])[i]))}
        />

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3rem" }}>
도시별 가이드는 검색보다 더 자세합니다. <Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en" style={{ color: "var(--red)", fontWeight: 600 }}>도쿄 숙소 가이드(영어)</Link>는 지역을 노선과 공항으로, <Link href="/guides/attractions/where-to-stay-in-kyoto" hrefLang="en" style={{ color: "var(--red)", fontWeight: 600 }}>교토 숙소 가이드(영어)</Link>는 절까지의 시간으로, <Link href="/guides/attractions/where-to-stay-in-osaka" hrefLang="en" style={{ color: "var(--red)", fontWeight: 600 }}>오사카 숙소 가이드(영어)</Link>는 호텔 아래서 시작하는 공항 이동으로 비교합니다. 이 경로에서 가나자와와 다카야마는 역 앞 숙소에 돈을 쓸 만합니다. 두 예약 버스가 모두 역 옆에서, 그것도 일찍 출발하기 때문입니다.
</p>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
거점 사이 이동
</span>
          <h2 className={styles.sectionTitle}>
거점 사이는 어떻게 이동하고, 패스는 이득인가요?
</h2>
          <p className={styles.bodyText}>
장거리 철도 2구간, 예약 고속버스 2구간, 이동일 하루입니다. 어려운 것은 길이가 아니라 예약입니다. 어느 구간도 약 3시간을 넘지 않지만, 호쿠리쿠 빠른 열차에는 자유석이 없고 가나자와 쪽 시라카와고 버스는 예약 없이 탈 수 없습니다.
</p>
          <ul className={styles.pickList}>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>도쿄 → 가나자와, 2시간 28분.</strong> JR 서일본 수치의 호쿠리쿠 신칸센으로 환승이 없습니다. <strong>가가야키</strong>가 빠른 열차이고 전석 지정이며(JR 서일본 표기는 全車指定席) 이 구간은 예약해야 합니다. 하쿠타카는 더 느리고 자유석이 있습니다. 자세한 내용은 <Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en">도쿄–가나자와 가이드(영어)</Link>에 있습니다.
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>가나자와 → 시라카와고, 1시간 15분, 2026년 12월 1일부터 성인 ¥2,900.</strong> 노히 버스 요금표로 11월 30일까지 ¥2,800이고 가나자와역 서쪽 출구에서 출발합니다. 지정석이고 좌석은 1개월 전에 열리며, 호쿠리쿠 철도는 승차 전 예약이 필요하다고 밝힙니다. 이쪽에는 현장 승차 대안이 없습니다.
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>시라카와고 → 다카야마, 약 50분, 2026년 12월 1일부터 성인 ¥2,900.</strong> 노히 버스 시라카와고선으로 11월 30일까지 ¥2,800입니다. 시간표에 일부 편은 예약 필수, 나머지는 자유석으로 표시되어 현장 좌석이 있지만 수량이 한정되어 있고, 시라카와고에 철도역이 없어 열차 대안은 없습니다.
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>다카야마 → 교토, 하루 대부분.</strong> 다카야마 본선 특급으로 나고야, 그다음 도카이도 신칸센입니다. 히카리는 패스 적용, 노조미는 안 되며 도쿄–교토 기준 2시간 45분과 2시간 15분의 차이입니다. 계산은 <Link href="/guides/transport/tokyo-to-kyoto" hrefLang="en">도쿄–교토 가이드(영어)</Link>에 있습니다.
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>교토 → 오사카, 약 30분.</strong> JR 신쾌속 또는 한큐선입니다. 이 일정에서 계획이 필요 없는 유일한 구간입니다.
</span>
            </li>
          </ul>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
패스에 대해 말하면 전국 JR 패스는 장거리로 본전을 뽑아야 하는데 이 경로는 둘뿐이므로 짐작하지 말고 계산하세요. <strong>호쿠리쿠 아치 패스</strong>가 이 여행의 형태에 맞습니다. 연속 7일 도쿄–쓰루가 호쿠리쿠 신칸센과 간사이 지역을 포함하고 도카이도 신칸센은 일부러 제외하므로, 갈 때와 다른 길로 돌아올 때만 쓸 수 있습니다. 둘 다 민영인 시라카와고 버스는 포함되지 않습니다. <Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR 패스 가이드(영어)</Link>에 내 구간의 손익 계산이 있고, <Link href="/guides/transport/shinkansen-guide" hrefLang="en">신칸센 가이드(영어)</Link>에 좌석 등급과 예약이 있습니다.
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={klookFor(hokurikuArchPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
호쿠리쿠 아치 패스 보기 →
</KlookLink>
            <KlookLink href={klookFor(jrPassWholeJapanCurrent.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
JAPAN RAIL PASS 보기 →
</KlookLink>
            <KlookLink href={klookFor(shinkansenTokyoKanazawa.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
도쿄 → 가나자와 티켓 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
날씨
</span>
          <h2 className={styles.sectionTitle}>
12월, 1월, 2월 일본은 얼마나 춥나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
혼슈는 코트 날씨이고 홋카이도는 정말 춥습니다. 1월이 어디서나 가장 춥고 2월은 더 나빠지지 않고 약간 포근합니다. 아래는 일본 기상청 1991~2020년 평년값으로, 월평균을 먼저 쓰고 짐에 영향이 있는 곳에 일 최고와 최저 평균을 괄호로 넣었습니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["도시", "12월", "1월", "2월"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tempRows.map((row) => (
                    <tr key={row.city}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.city}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.dec}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.jan}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.feb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
월평균 기온, 괄호 안은 일 최고와 최저 평균이며 도쿄, 교토, 오사카, 삿포로의 일본 기상청 1991~2020년 평년값입니다. 확인일 {CHECKED}. 같은 표의 삿포로 월 강설량은 12월 113 cm, 1월 137 cm, 2월 116 cm입니다. 이 숫자가 보여 주지 않는 것이 두 가지 있습니다. 혼슈 동해 쪽인 가나자와, 다카야마, 시라카와고는 기온보다 눈이 훨씬 많고, 이 일정에서 밖에 있는 시간은 대부분 해가 진 뒤라 평균보다 최저에 가깝습니다.
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
눈
</span>
          <h2 className={styles.sectionTitle}>
일본 어디서 눈을 볼 수 있나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
대체로 도쿄, 교토, 오사카는 아닙니다. 세 도시는 태평양 쪽이라 눈이 계절이 아니라 뉴스입니다. 눈은 산과 동해 쪽에 있으며, 중요한 질문은 어디가 가장 깊은가가 아니라 어떤 눈이 내 여행에 맞는가입니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["장소", "이동 방법", "시즌", "추천 대상"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {snowRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.season}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.forWhom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
추가 숙박이 필요 없는 곳은 유자와 쪽이고, 그래서 이 계획의 3일차입니다. 구경이 아니라 스키라면 가장 먼저 예약할 것은 리프트권이 아니라 장비입니다. 보험도 가기 전에 정하세요. 온피스트와 오프피스트는 약관에서 완전히 다르게 취급되며 <Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en">스키 여행자 보험 비교(영어)</Link>에 정리했습니다. 눈이 여행의 전부라면 도시를 빼고 <Link href="/ko/guides/attractions/niseko-ski-tours">니세코 스키 투어 가이드</Link>를 보세요. 이동, 강습, 4개 지역을 다루며, 니세코 유나이티드 표로 2026년 12월 24일~2027년 2월 28일 성인 올 마운틴 1일권은 ¥13,500입니다.
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={klookFor(galaNaebaSkiDayTripTokyo.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
갈라 유자와 / 나에바 전용 차량 →
</KlookLink>
            <KlookLink href={klookFor(hakubaHapponeBusLiftRental.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
하쿠바 버스 + 리프트 + 렌털 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiSnowboardRental.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
니세코 스키·스노보드 렌털 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
예약
</span>
          <h2 className={styles.sectionTitle}>
겨울 투어는 미리 예약해야 하나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
이 일정에서 한 가지는 “권장”이 아니라 “그렇지 않으면 갈 수 없음”입니다. 시라카와고 라이트업은 연간 네 저녁 완전 사전 예약제로 열리고 협회 공지는 입장권을 당일 판매하지 않는다고 분명히 밝힙니다. 나머지는 정도의 문제입니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["항목", "시기", "주최 측이 실제로 요구하는 것", "출처"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datedRows.map((row) => (
                    <tr key={row.event}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.event}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rule}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
라이트업 날짜와 당일 티켓 없음 규칙은 시라카와고 관광협회의 제41회 공지, 라이트업 버스는 노히 버스 페이지, 눈축제 날짜와 회장은 삿포로 눈축제의 제77회 공지, 오타루 날짜는 오타루 관광협회와 시코쓰호 축제도 싣는 홋카이도 공식 관광 사이트, 스키 날짜는 니세코 유나이티드, 갈라 유자와, 하쿠바 밸리, teamLab 수치는 teamLab 전시 페이지 기준입니다. 모두 {REREAD}에 확인했습니다. 각 주최 측이 공개한 날짜 외에는 아무것도 가정하지 않습니다. 여행이 그 기간 밖이라면 해당 행은 대략 적용이 아니라 적용되지 않는다고 보세요.
</p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
처음부터 시작한다면 예약 순서는 이렇습니다. 날짜가 맞으면 라이트업 저녁, 그다음 숙소, 가가야키 좌석, 가나자와 버스, 스키 렌털, 2주 전 SHIBUYA SKY, 나머지는 마지막 2주입니다.
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink
              href={klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
시라카와고 라이트업 일정 →
</KlookLink>
            <KlookLink
              href={klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
가나자와 출발 시라카와고 일정 →
</KlookLink>
            <KlookLink
              href={klookFor(teamlabBotanicalGardenOsakaTicket.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
teamLab 식물원 오사카 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
또 다른 겨울 경로
</span>
          <h2 className={styles.sectionTitle}>
눈축제를 위해 홋카이도로 가는 것이 나을까요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
여행이 2월 상반기라면 진지하게 고려해 보세요. <strong>제77회 삿포로 눈축제는 2027년 2월 4~11일</strong> 세 회장(오도리 니시 1~11초메, 스스키노 에키마에도리 미나미 4~6조, 쓰도무 회장)에서 열리고 모두 무료 입장으로, 시라카와고 라이트업과 정반대입니다. 대신 필요한 것은 숙소와 항공편이고 둘 다 몇 달 전에 찹니다. <Link href="/ko/guides/attractions/sapporo-snow-festival-tours">삿포로 눈축제 투어 가이드</Link>에 회장과 투어가 있습니다. 이 버전은 도쿄 일정을 유지하고 호쿠리쿠 구간을 바꿉니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["날짜", "대신 할 일"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hokkaidoRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
축제 날짜와 회장 범위는 삿포로 눈축제 실행위원회의 제77회 공지 기준이며 {REREAD}에 확인했습니다. 같은 공지는 2027년 2월 12~14일 삿포로 스노 스포츠 파크를 연계 행사로 추가합니다. 삿포로 2월 일 최고 평균 0.4°C와 1월 강설량 137 cm는 위의 기상청 수치입니다. 한 가지 주의가 있습니다. 홋카이도까지 철도는 길어서 대부분 비행기를 타며, JR 동일본–남홋카이도 패스는 어차피 JR 동일본을 많이 탈 때만 값어치가 있습니다.
</p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
8일차 당일 여행으로는 오타루 눈빛 거리 축제가 2027년 2월 6~13일이라 눈축제 여행에서 둘 다 볼 수 있습니다. 열차와 운하 마을은 <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">삿포로 출발 오타루 당일 여행 가이드(영어)</Link>에 있습니다. 전체를 홋카이도에 쓰고 싶다면 섬에 머무는 <Link href="/ko/guides/attractions/hokkaido-7-day-itinerary">홋카이도 7일 여행</Link>을 보세요.
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={klookFor(newChitoseSapporoSharedTransfer.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
신치토세 → 삿포로 이동 →
</KlookLink>
            <KlookLink href={klookFor(sapporoSnowParkHalfDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
삿포로 스노 파크 반나절 →
</KlookLink>
            <KlookLink href={klookFor(jrEastSouthHokkaidoPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
JR 동일본–남홋카이도 패스 →
</KlookLink>
            <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
니세코 공항 셔틀 →
</KlookLink>
            <KlookLink href={klookFor(rusutsuResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
루스쓰 공항 셔틀 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
짐
</span>
          <h2 className={styles.sectionTitle}>
겨울 일본에 무엇을 챙겨야 하나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
생각보다 적게, 두껍게가 아니라 겹겹이 챙기세요. 이유는 바깥 기온이 아니라 실내 기온입니다. 이 일정의 열차, 상점, 식당은 난방이 강해 벗을 수 없는 두꺼운 옷 한 벌보다 벗을 수 있는 얇은 세 벌이 낫습니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["항목", "이 경로에서 필요한 이유"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {packRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"홋카이도를 더한다면 겨울 당일 여행"}
          intro={"이 여행의 2월 버전을 위한 삿포로 출발 겨울 상품 네 가지입니다. 모두 연중 상품이 아니라 계절 상품이라 당일이 아니라 일찍 열어 볼 가치가 있습니다."}
          tours={[withKlookLocale(otaruSnowParkDayTour, LOCALE, { title: "오타루, 시로이 코이비토 파크, 스노 파크 당일 투어", desc: "오타루 운하와 증기 시계, 시로이 코이비토 파크, 눈놀이를 묶은 홋카이도 당일 여행" }), withKlookLocale(asahiyamaBieiHighlightsTour, LOCALE, { title: "삿포로 출발 아사히야마 동물원, 비에이 청의 호수, 닝글 테라스 당일 투어", desc: "삿포로에서 아사히카와 동물원, 비에이 청의 호수, 닝글 테라스를 도는 당일 버스로, 여러 경로로 판매되며 겨울에는 스노모빌 옵션이 추가 요금으로 있습니다" }), withKlookLocale(lakeShikotsuIceFestivalHalfDayTour, LOCALE, { title: "삿포로 출발 시코쓰호 얼음 축제 반나절 투어", desc: "겨울 한정 시코쓰호 얼음 축제를 삿포로에서 가이드 반나절로 가는 상품으로, 홋카이도 이쪽의 또 다른 2월 행사입니다" }), withKlookLocale(sapporoSnowParkHalfDayTour, LOCALE, { title: "원더랜드 삿포로 스노 파크 반나절 투어", desc: "호텔 픽업과 징기스칸 바비큐가 포함된 시외 스노 파크 반나절로, 스키 장비가 없는 여행자용 상품입니다" })]}
        />

                <Related items={[{ href: "/guides/attractions/okinawa-day-tours", title: "나하 출발 오키나와 당일 투어: 북부와 남부 비교(2026) (영어)" }, { href: "/ko/guides/attractions/jigokudani-snow-monkey-tour", title: "도쿄 출발 지고쿠다니 원숭이 공원 가이드(2027)" }, { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "도쿄 출발 갈라 유자와 스키 당일 여행: 71분, 리프트 ¥8,000 (영어)" }, { href: "/ko/guides/attractions/niseko-ski-tours", title: "니세코 스키 투어(2027): 셔틀, 강습, 4개 스키장" }, { href: "/ko/guides/attractions/hokkaido-7-day-itinerary", title: "홋카이도 7일 여행: 날짜별 일정" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "삿포로 출발 오타루 당일 여행(2027): ¥800, JR 33분 (영어)" }, { href: "/ko/guides/attractions/sapporo-snow-festival-tours", title: "삿포로 눈축제(2027): 2월 4~11일, 무료 회장" }, { href: "/guides/attractions/japan-10-day-itinerary", title: "일본 10일 일정(2026): 날짜별 코스 (영어)" }, { href: "/guides/attractions/japan-14-day-itinerary", title: "일본 14일 일정(2026): 날짜별 코스 (영어)" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "다카야마와 시라카와고 투어(2027): 어디서 출발할까 (영어)" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "도쿄 일루미네이션 2026-27: 일정, 시간, 무료 명소 (영어)" }, { href: "/guides/transport/tokyo-to-kanazawa", title: "도쿄–가나자와(2026): 가가야키 시간, 좌석, 패스 (영어)" }, { href: "/guides/transport/jr-pass-guide", title: "JR 패스 가이드(2026): 가격, 범위, 이득 여부 (영어)" }, { href: "/guides/money/japan-ski-travel-insurance", title: "스키 여행자 보험 비교: 오프피스트, 구조 비용, 보장 범위 (영어)" }, { href: "/guides/attractions/where-to-stay-in-tokyo", title: "도쿄 숙소 가이드(2026): 노선과 공항으로 비교 (영어)" }, { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab 식물원 오사카 티켓: 가격과 시간 (영어)" }, { href: "/guides/attractions", title: "일본의 다른 볼거리 → (영어)" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
날짜가 정해진 것부터
</h2>
            <p className={styles.ctaBannerDesc}>
시라카와고 라이트업은 2027년 1월 네 저녁뿐이고 현장에서 아무것도 팔지 않습니다. 가나자와 버스는 예약 없이 탈 수 없고 가가야키에는 자유석이 없습니다. 나머지는 기다려도 됩니다.
</p>
            <div className={styles.pickCtaRow}>
              <KlookLink
                href={klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE)}
                target="_blank"
                rel="sponsored noopener"
                className={styles.ctaBannerBtn}
              >
시라카와고 라이트업 일정 보기 →
</KlookLink>
              <KlookLink href={klookFor(hokurikuArchPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
호쿠리쿠 아치 패스 보기 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
