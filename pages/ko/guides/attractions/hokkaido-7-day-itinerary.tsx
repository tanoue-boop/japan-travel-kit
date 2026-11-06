import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  bieiFuranoLavenderDayTour,
  furanoBieiBluePondDayTour,
  hokkaidoSevenDayStayAreas,
  jozankeiHotSpringBusTrip,
  jrHokkaidoRailPass,
  klookEsim,
  lakeShikotsuIceFestivalHalfDayTour,
  newChitoseAirportTransfers,
  nisekoResortShuttleBus,
  noboribetsuToyaNisekoDayTour,
  noboribetsuToyaOtaruDayTour,
  otaruCanalCruiseSealCarving,
  otaruShakotanYoichiCoachTour,
  otaruSnowParkDayTour,
  sapporoFuranoAreaPass,
  sapporoFuranoBieiLavenderBusTour,
  sapporoJozankeiBuddhaDayTour,
  sapporoSnowParkHalfDayTour,
  sapporoTvTowerMoiwaSetTicket,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import {
  asahiyamaBieiHighlightsTour,
  furanoBieiWinterIlluminationTour,
  yoichiOtaruWalkingTour,
} from "../../../../lib/klook-links-winter-hokkaido";
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

// Mirrors the English guide (pages/guides/attractions/hokkaido-7-day-itinerary.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/hokkaido-7-day-itinerary";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "홋카이도 7일 여행" }];

const OWN_ISO = "2026-11-01";
const OWN = dateLabel(OWN_ISO, LOCALE);

const SEASON_ISO = "2026-11-06";
const SEASON = dateLabel(SEASON_ISO, LOCALE);

const FESTIVAL_CHECKED = dateLabel("2026-10-30", LOCALE);
const JMA_CHECKED = dateLabel("2026-10-28", LOCALE);

const AIRPORT_FARE = "¥1,230";
const OTARU_FARE = "¥800";
const ASAHIKAWA_RT = "¥10,880";
const ASAHIKAWA_OW = "¥5,440";
const FURANO_RT = "¥12,560";
const FURANO_OW = "¥6,280";
const FURANO_LOCAL = "¥1,380";
const FURANO_WINTER = "¥6,820";
const TOTAL_SUMMER = "¥17,160";
const TOTAL_WINTER = "¥17,700";
const PASS_7 = "¥28,000";
const PASS_5 = "¥22,000";
const PASS_10 = "¥37,000";
const AREA_FURANO = "¥11,000";
const AREA_NOBORIBETSU = "¥10,000";
const ZOO_ADULT = "¥1,000";
const CRUISE_DAY = "¥1,800";
const SUBWAY_DAY_PASS = "¥830";
const DONICHIKA = "¥520";
const FEB_MAX = "0.4°C";
const FEB_MIN = "−6.2°C";
const FEB_SNOW = "116 cm";
const HND_FLIGHT = "1시간 30분";

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

const baseRows = [
  {
    base: "삿포로역",
    nights: "6박 중 4박",
    why: "1, 2, 3, 6일째 밤. 이 경로의 모든 구간이 이 건물 아래에서 시작합니다. 신치토세발 쾌속 에어포트, 아사히카와행 라일락과 카무이, 여름의 후라노 라벤더 익스프레스가 있고 오도리는 지하철 한 정거장이나 지붕 있는 길로 걸어갑니다. 숙박은 한 번에 예약해도 두 번으로 나눠도 되며 보통 가격이 결정합니다.",
  },
  {
    base: "후라노",
    nights: "6박 중 2박",
    why: "4, 5일째 밤. 왕복하지 않고 내륙에서 자는 이유가 있습니다. 삿포로에서 비에이와 후라노를 당일로 가면 10시간 버스 일정이지만, 후라노 숙소에서 이틀 아침을 보내면 어느 계절이든 일주일 중 가장 좋은 시간이 됩니다.",
  },
  {
    base: "오타루역(변경)",
    nights: "1박, 삿포로 대신",
    why: "저녁 운하가 목적이라면 3일째 밤을 여기로 바꾸세요. 특히 2월 첫 2주의 눈빛 거리 축제 기간에 좋습니다. 삿포로까지 ¥800, 약 33분이라 바꿔도 비용이 거의 들지 않습니다.",
  },
  {
    base: "니세코(스키 버전만)",
    nights: "2박, 후라노 대신",
    why: "정말로 스키 주간일 때만입니다. 공항 버스가 신치토세에서 니세코로 직행하고 스키 가방을 실을 수 있어, 이 버전은 도착일에 삿포로를 거치지 않습니다.",
  },
];

const seasonRows = [
  {
    day: "1일차",
    winter: "비행기로 도착, 쾌속 에어포트로 삿포로, 해가 진 뒤 오도리와 스스키노. 12월에는 오후 4시경부터 어두워집니다",
    summer: "비행기로 도착, 쾌속 에어포트로 삿포로, 여름 비어 가든이 열리는 오도리 공원에서 긴 저녁",
  },
  {
    day: "2일차",
    winter: "삿포로: 2월 첫 2주에는 눈축제 회장, 그 외에는 조잔케이 온천 반나절과 실내 오후",
    summer: "삿포로: 해 질 녘 모이와산, 부처의 언덕, 시로이 코이비토 파크. 모두 발밑에 얼음이 없을 때 더 좋습니다",
  },
  {
    day: "3일차",
    winter: "오타루, 해가 진 뒤 운하 가스등까지. 2027년 2월 6~13일에는 눈빛 거리 축제",
    summer: "오타루와 요이치 증류소, 또는 여름에만 갈 만한 샤코탄 반도와 카무이 곶",
  },
  {
    day: "4일차",
    winter: "펭귄이 걷는 계절의 아사히카와와 아사히야마 동물원, 그다음 보통열차로 후라노까지",
    summer: "여름 운영 시간의 아사히카와와 아사히야마 동물원, 그다음 비에이를 거쳐 보통열차로 후라노까지",
  },
  {
    day: "5일차",
    winter: "눈 덮인 비에이와 후라노: 줄무늬 대신 하얀 언덕, 후라노 스키장에서 스키나 눈놀이 반나절",
    summer: "팜 도미타와 비에이 언덕. 라벤더 주간이 이날을 홋카이도에서 가장 많이 예약되는 날로 만듭니다",
  },
  {
    day: "6일차",
    winter: "라벤더 익스프레스는 여름 열차이므로 보통열차로 아사히카와까지 가서 라일락이나 카무이로 삿포로 복귀, 그 뒤 스노 파크 반나절 또는 2027년 1월 30일~2월 23일의 시코쓰호 얼음 축제",
    summer: "삿포로 복귀, 그 뒤 남쪽 노보리베쓰와 도야호의 긴 하루, 또는 시내에서 느긋한 마지막 오후",
  },
  {
    day: "7일차",
    winter: "삿포로에서 신치토세로 이동해 출국. 2월에는 항공편이 지연되므로 첫 편은 피하세요",
    summer: "삿포로에서 신치토세로 이동해 출국. 공항 자체가 볼거리이므로 시간을 남겨 두세요",
  },
];

const passRows = [
  {
    leg: "신치토세 공항 → 삿포로(1일차)",
    fare: AIRPORT_FARE,
    note: "쾌속 에어포트, 열차 종류에 따라 36~43분. 예약 불필요, uシート 지정석은 ¥1,000 추가.",
  },
  {
    leg: "삿포로 ↔ 오타루 왕복(3일차)",
    fare: "¥1,600",
    note: `편도 ${OTARU_FARE}, 최단 약 33분. 이 경로에서 가장 저렴한 구간입니다.`,
  },
  {
    leg: "삿포로 → 아사히카와, 특급 지정석(4일차)",
    fare: ASAHIKAWA_OW,
    note: `JR 홋카이도의 라일락·카무이 왕복 요금 ${ASAHIKAWA_RT}의 절반, 1시간 25분.`,
  },
  {
    leg: "아사히카와 → 비에이 → 후라노, 보통열차(4일차)",
    fare: FURANO_LOCAL,
    note: `JR 홋카이도의 2026년 노선 공지에 나온 아사히카와–후라노 요금입니다. 같은 공지에 아사히카와–후라노 사이는 IC 카드를 쓸 수 없다고 나와 있으니 표를 사세요. 확인일 ${SEASON}.`,
  },
  {
    leg: "후라노 → 삿포로, 라벤더 익스프레스 지정석(6일차, 여름)",
    fare: FURANO_OW,
    note: `JR 홋카이도 왕복 요금 ${FURANO_RT}의 절반. 2시간, 환승 없음. JR 홋카이도가 공개한 6~9월 날짜에 운행하며 2027년 날짜는 발표 대기 중입니다.`,
  },
  {
    leg: "후라노 → 아사히카와 → 삿포로, 보통열차와 라일락·카무이(6일차, 겨울)",
    fare: FURANO_WINTER,
    note: `${FURANO_LOCAL} + ${ASAHIKAWA_OW}. JR 홋카이도가 라벤더 익스프레스 미운행 시 안내하는 경로입니다. 오전을 통째로 잡고 보통열차 연결은 시간표로 확인하세요.`,
  },
  {
    leg: "삿포로 → 신치토세 공항(7일차)",
    fare: AIRPORT_FARE,
    note: "같은 쾌속 에어포트 반대 방향입니다.",
  },
  {
    leg: "합계, 여름 버전",
    fare: TOTAL_SUMMER,
    note: "겨울 복귀를 뺀 위의 모든 구간.",
  },
  {
    leg: "합계, 겨울 버전",
    fare: TOTAL_WINTER,
    note: "라벤더 익스프레스를 뺀 위의 모든 구간. 어느 쪽이든 ¥18,000 미만입니다.",
  },
];

const days: Day[] = [
  {
    n: 1,
    label: "1일차",
    heading: "1일차: 도착, 그리고 신치토세에서 삿포로까지 36분",
    intro:
      "홋카이도는 역이 아니라 공항에서 시작하며, 1일차에 제대로 해야 할 것은 이것뿐입니다. 신치토세에서 삿포로까지는 낮에 시간당 6편, 열차에 따라 36~43분, ¥1,230이므로 예약할 이동도 챙길 표도 없습니다. 도착 전에 정할 것은 짐과 함께 앉아 갈지, 터미널을 나설 때 휴대폰이 터질지입니다.",
    stops: [
      {
        time: "도착 후",
        place: "입국 심사, 수하물, 인터넷 연결",
        allow: "45분~1시간 30분",
        getting: "n/a",
        booking: "출국 전에 eSIM 활성화, 창구에서 받을 것 없음",
      },
      {
        time: "1시간 안에",
        place: "신치토세 공항역 → 쾌속 에어포트로 삿포로",
        allow: "36~43분",
        getting: `JR, 성인 ${AIRPORT_FARE}. 09:00~16:00 시간당 6편`,
        booking: "아니요. uシート 지정석을 원할 때만(¥1,000 추가, 티켓리스 ¥800)",
      },
      {
        time: "늦은 오후",
        place: "삿포로역 근처 체크인, 짐 맡기기",
        allow: "45분",
        getting: "도보, 거점을 잘 골랐다면 대부분 지하",
        booking: "네. 6박 중 4박이 여기입니다",
      },
      {
        time: "저녁",
        place: "오도리 공원, 삿포로 TV 타워 전망대, 스스키노",
        allow: "2~3시간",
        getting: "삿포로역에서 지하철 한 정거장 또는 도보 약 10분",
        booking: "공원과 거리는 불필요, 전망대는 현장 구매",
      },
    ],
    book: (
      <>
데이터, 숙소, 그리고 2월에 위탁 수하물이 있다면 플랫폼이 아니라 좌석입니다. 전철은 예약이 필요 없다는 것이 이 도착의 장점이고, 예약 차량은 짐이 크거나 호텔이 역 옆이 아닐 때의 대안으로 출국 전에 정해야 합니다. 교통 외에 1일차에 정할 것이 하나 있습니다. 정오 전에 도착한다면 신치토세에서 오타루까지 환승 없이 최단 73분이므로 도착일 오후를 제대로 쓸 수 있습니다. <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">오타루 당일 여행 가이드(영어)</Link>에서 일주일이 어떻게 달라지는지 보세요.
</>
    ),
    picks: [
      { label: "신치토세 이동 →", url: klookFor(newChitoseAirportTransfers.url, LOCALE) },
      { label: "클룩 eSIM 보기 →", url: klookFor(klookEsim.url, LOCALE) },
      { label: "JR 홋카이도 패스 보기 →", url: klookFor(jrHokkaidoRailPass.url, LOCALE) },
      { label: "TV 타워 + 모이와산 세트권 →", url: klookFor(sapporoTvTowerMoiwaSetTicket.url, LOCALE) },
    ],
  },
  {
    n: 2,
    label: "2일차",
    heading: "2일차: 삿포로, 그리고 시내를 벗어나는 반나절",
    intro:
      "삿포로는 인구 약 200만의 바둑판 도시로, 그 자체로 이틀을 쓸 볼거리는 아닙니다. 거점으로 뛰어나며, 가장 좋은 2일차는 반나절은 시내, 반나절은 교외입니다. 2월 첫 2주에는 그 나머지가 이미 정해져 있습니다. 눈축제가 2027년 2월 4~11일 세 곳의 무료 회장에서 열리고, 조명이 켜진 오도리 조각을 보는 저녁은 이 일정에서 가성비가 가장 좋습니다. 그 외 날짜에는 남쪽으로 1시간이 안 걸리는 조잔케이가 2월 삿포로의 하루에 필요한 실내 시간을 채워 줍니다.",
    stops: [
      {
        time: "오전",
        place: "오도리 공원, 홋카이도 구청사, 니조 시장",
        allow: "2~3시간",
        getting: "도보와 지하철 한두 정거장",
        booking: "아니요",
      },
      {
        time: "점심",
        place: "라멘이나 수프 카레 점심, 그다음 삿포로 맥주 박물관",
        allow: "2시간",
        getting: "도호선 또는 팩토리 순환버스",
        booking: "박물관은 불필요, 시음은 당일 유료",
      },
      {
        time: "오후",
        place: "조잔케이 온천이나 부처의 언덕, 또는 2027년 2월 4~11일에는 쓰도무 회장",
        allow: "반나절",
        getting: "조테쓰 버스 또는 예약 버스. 쓰도무는 도호선으로 에이와마치까지 간 뒤 셔틀",
        booking: "가이드 반나절은 예약 권장, 축제 회장은 무료라 불필요",
      },
      {
        time: "저녁",
        place: "해 질 녘 모이와산 로프웨이, 또는 축제 주간에는 조명이 켜진 오도리와 스스키노",
        allow: "2~3시간",
        getting: "노면전차 후 로프웨이, 또는 오도리까지 지하철 한 정거장",
        booking: "로프웨이는 현장 구매, 축제는 아무것도 필요 없음",
      },
    ],
    book: (
      <>
교외 반나절뿐입니다. 위원회 FAQ에 따르면 눈축제 세 회장은 모두 무료(「全会場無料です」, 확인일 {FESTIVAL_CHECKED})이므로 축제 주간에는 티켓이 아니라 숙소와 당일 여행에 돈이 듭니다. 자세한 내용은 <Link href="/ko/guides/attractions/sapporo-snow-festival-tours">삿포로 눈축제 가이드</Link>에 있습니다. 그 외 날짜에는 조잔케이 상품을 보세요. 하나는 조테쓰 버스 티켓이 포함된 온천 일정이고, 다른 하나는 계곡과 안도 다다오의 부처의 언덕, 시로이 코이비토 파크를 묶습니다. 시내에서 쓸모 있는 패스는 교통국 지하철 1일권뿐입니다. 평일 {SUBWAY_DAY_PASS}, 주말·공휴일 {DONICHIKA}이고 1구간 ¥210이라 3~4회부터 이득입니다.
</>
    ),
    picks: [
      { label: "조잔케이와 부처의 언덕 일정 →", url: klookFor(sapporoJozankeiBuddhaDayTour.url, LOCALE) },
      { label: "버스 포함 조잔케이 온천 일정 →", url: klookFor(jozankeiHotSpringBusTrip.url, LOCALE) },
      { label: "TV 타워 + 모이와산 세트권 →", url: klookFor(sapporoTvTowerMoiwaSetTicket.url, LOCALE) },
      { label: "삿포로 호텔 보기 →", url: klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE) },
    ],
  },
  {
    n: 3,
    label: "3일차",
    heading: "3일차: 오타루, 그리고 요이치를 넣을지",
    intro:
      "일주일 중 가장 저렴하고 좋은 날입니다. 쾌속 에어포트로 편도 ¥800, 약 33분이면 줄 서지 않고 걸어 다니는 항구 도시에 닿습니다. 운하와 가스등은 30분 정도, 사카이마치 거리는 유리 공방과 옛 은행 건물로 1~2시간, 초밥은 이곳을 찾는 이유입니다. 이날 정할 것은 두 가지입니다. 운하는 낮보다 가스등 풍경이므로 해가 진 뒤까지 있을지, 그리고 예약 버스가 전철표보다 나은 유일한 구간인 요이치 닛카 증류소를 넣을지입니다.",
    stops: [
      {
        time: "오전",
        place: "삿포로 → 오타루, 운하까지 도보",
        allow: "전철 40분, 운하 30~45분",
        getting: `JR 쾌속 에어포트, 성인 ${OTARU_FARE}. 운하는 역에서 내리막으로 약 10분`,
        booking: "아니요. 개찰구에서 IC 카드 사용 가능",
      },
      {
        time: "점심",
        place: "사카이마치 거리, 증기 시계, 유리 공방, 그리고 초밥 점심",
        allow: "2~3시간",
        getting: "운하에서 도보",
        booking: "주말에는 초밥집 예약 권장, 그 외 불필요",
      },
      {
        time: "오후",
        place: "요이치 증류소, 덴구야마, 또는 오타루 수족관",
        allow: "2~3시간",
        getting: "JR로 요이치까지 간 뒤 도보 5분. 다만 닛카는 열차가 적다고 경고합니다. 나머지는 버스나 예약 버스",
        booking: "닛카 투어는 예약 필요. 무료이지만 사전 예약을 요청합니다",
      },
      {
        time: "해 질 녘",
        place: `저녁 운하 크루즈, 또는 2027년 2월 6~13일의 눈빛 거리 축제`,
        allow: "수상 40분에 운영사가 요청하는 15분 전 도착",
        getting: "주오바시 다리에서 승선, 역에서 조금 걸으면 됩니다",
        booking: `붐비는 날에는 예약 권장. 성인 낮 ${CRUISE_DAY}, 밤 ¥2,000, 초등학생 ¥500`,
      },
    ],
    book: (
      <>
전철이 아니라 오타루가 아닌 나머지 반나절입니다. 닛카 FAQ에 따르면 증류소 투어는 무료이지만 사전 예약을 요청하고, 교통 안내는 <em>“오타루역과 요이치역 사이는 열차가 적습니다”</em>라고 경고합니다. 열차가 드문 곳 끝에서 시간이 정해진 예약은 가이드 일정이 해결하는 문제이므로 요이치 상품을 앞에 두었습니다. 증류소는 12월 23일~1월 7일 휴무입니다. 운하 크루즈도 잡아 둘 만합니다. 운영사 요금은 성인 낮 {CRUISE_DAY}, 밤 ¥2,000, 40분이며 날씨에 따라 결항합니다. <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">삿포로 출발 오타루 당일 여행(영어)</Link> 가이드에 이날의 전체 내용과 오타루에서 묵는 경우를 정리했습니다.
</>
    ),
    picks: [
      { label: "요이치·오타루 도보 일정 →", url: klookFor(yoichiOtaruWalkingTour.url, LOCALE) },
      { label: "카무이 곶 + 요이치 버스 일정 →", url: klookFor(otaruShakotanYoichiCoachTour.url, LOCALE) },
      { label: "운하 크루즈 + 공방 →", url: klookFor(otaruCanalCruiseSealCarving.url, LOCALE) },
      { label: "오타루와 스노 파크 →", url: klookFor(otaruSnowParkDayTour.url, LOCALE) },
    ],
  },
  {
    n: 4,
    label: "4일차",
    heading: "4일차: 내륙으로, 아사히카와, 동물원, 후라노행 열차",
    intro:
      "일정이 도시 여행에서 벗어나는 날입니다. 삿포로에서 아사히카와까지 특급 라일락이나 카무이로 1시간 25분이고, 거의 모두가 찾는 아사히야마 동물원은 삿포로 밖에서 가장 많이 방문하는 곳입니다. 그다음 돌아가지 않고 보통열차로 비에이를 거쳐 후라노까지 남쪽으로 가며, 그곳에서 자는 덕분에 5일차가 버스 일정이 아니라 여유로운 아침이 됩니다. 꼭 고려할 사실이 두 가지입니다. 동물원은 12월 30일~1월 1일 휴원합니다. 겨울에는 15:30에 닫고 입장 마감은 15:00로 생각보다 이릅니다.",
    stops: [
      {
        time: "이른 아침",
        place: "삿포로 → 아사히카와",
        allow: "1시간 25분",
        getting: `특급 라일락 또는 카무이, 전석 지정. JR 홋카이도 왕복 요금 기준 편도 ${ASAHIKAWA_OW}`,
        booking: "네. 전석 지정 열차입니다",
      },
      {
        time: "오전~오후 중반",
        place: "아사히야마 동물원",
        allow: "3~4시간",
        getting: "아사히카와역 앞에서 아사히카와 전기궤도 버스",
        booking: `아니요. 성인 ${ZOO_ADULT}, 중학생 이하 무료`,
      },
      {
        time: "오후 중반",
        place: "아사히카와로 돌아가 남쪽행 보통열차",
        allow: "시간표 확인: JR 홋카이도는 비에이–후라노 40분만 공개하고 아사히카와 구간은 공개하지 않습니다",
        getting: `JR 보통열차, 아사히카와–후라노 ${FURANO_LOCAL}. 이 노선은 IC 카드 불가`,
        booking: "아니요",
      },
      {
        time: "저녁",
        place: "후라노 체크인, 농장 근처에서 식사",
        allow: "남은 시간",
        getting: "역에서 도보 또는 짧은 택시",
        booking: "네. 2박이고 후라노는 삿포로보다 객실이 훨씬 적습니다",
      },
    ],
    book: (
      <>
지정석과 후라노 숙소, 이 순서입니다. 라일락과 카무이는 전석 지정이라 아사히카와 구간은 현장이 아니라 예약이며, 패스 판단을 결정하는 구간이기도 합니다. 이 구간, 6일차 후라노 복귀, 오타루 왕복만으로 4일권 삿포로–후라노 에어리어 패스 가격을 넘습니다. 동물원은 현장 {ZOO_ADULT}(2027년 4월 29일부터 ¥1,400)이고 예약은 필요 없지만 시간이 중요합니다. {SEASON}에 확인한 아사히야마 공식 안내로 겨울 시즌은 <strong>2026년 11월 11일~2027년 4월 7일</strong>, <strong>10:30–15:30, 입장 마감 15:00</strong>이며 <strong>12월 30일~1월 1일 휴원</strong>입니다. 겨울에 오는 진짜 이유인 펭귄 산책은 코스를 만들 눈이 쌓여야 시작하며, 동물원은 12월 하순~3월 중순, 11:00과 14:30(3월은 11:00만)으로 안내합니다. 2026-27 시작일은 동물원 공식 SNS 발표 대기 중입니다.
</>
    ),
    picks: [
      { label: "삿포로 출발 아사히야마 동물원 일정 →", url: klookFor(asahiyamaBieiHighlightsTour.url, LOCALE) },
      { label: "후라노와 비에이 청의 호수 일정 →", url: klookFor(furanoBieiBluePondDayTour.url, LOCALE) },
      { label: "후라노 호텔 보기 →", url: klookFor(hokkaidoSevenDayStayAreas[2].url, LOCALE) },
      { label: "JR 홋카이도 패스 보기 →", url: klookFor(jrHokkaidoRailPass.url, LOCALE) },
    ],
  },
  {
    n: 5,
    label: "5일차",
    heading: "5일차: 비에이와 후라노, 계절이 결정하는 날",
    intro:
      "7일 중 2월과 7월이 완전히 다른 날이고, 내륙 2박의 이유가 되는 날입니다. 여름에는 시키사이노오카의 줄무늬 언덕, 팜 도미타의 라벤더, 시로가네 청의 호수가 있는 풍경의 날로, 7월에 홋카이도를 찾는 이유입니다. 겨울에는 같은 언덕이 눈에 덮여 조용하고 텅 비어 있으며 생각보다 좋고, 계곡 끝의 후라노 스키장도 있습니다. 어느 쪽이든 실용적인 점은 같습니다. 이 지역은 자동차 기준이고 버스가 드물며, 후라노를 거점으로 하면 버스 일정의 한가운데가 아니라 아침을 얻습니다.",
    stops: [
      {
        time: "오전",
        place: "팜 도미타와 후라노 꽃 농장(여름), 또는 후라노 스키장(겨울)",
        allow: "2~3시간",
        getting: "여름에는 보통열차로 나카후라노, 겨울에는 리조트 셔틀",
        booking: "농장은 불필요, 리프트권과 렌털은 필요",
      },
      {
        time: "점심",
        place: "후라노 오므카레 또는 농장 식당 점심",
        allow: "1시간",
        getting: "도보",
        booking: "아니요",
      },
      {
        time: "오후",
        place: "비에이: 시키사이노오카, 패치워크 언덕, 시로가네 청의 호수",
        allow: "3~4시간",
        getting: "보통열차로 비에이 후 노선버스, 관광버스, 택시 코스, 또는 예약 버스",
        booking: "어떤 형태로든 강력 권장. 대중교통이 가장 약한 구간입니다",
      },
      {
        time: "저녁",
        place: "후라노로 복귀, 겨울에는 아주 어두운 밤하늘",
        allow: "남은 시간",
        getting: "보통열차 또는 투어 하차",
        booking: "아니요",
      },
    ],
    book: (
      <>
이 일정에서 유일하게 정말 어려운 교통 문제인 비에이 이동 방법입니다. 팜 도미타는 9:30~16:30이고 “영업시간 외에는 입장할 수 없습니다”라고 공개합니다(확인일 {OWN}). 농장 자체가 문제가 아니라 차 없이 농장, 언덕, 청의 호수 사이를 오가는 것이 문제입니다. 현실적인 방법은 관광버스, 택시 코스, 또는 전부 도는 대신 이른 아침 빛을 포기하는 삿포로 출발 가이드 일정입니다. 라벤더 주간이라면 어떤 형태로든 일찍 예약하세요. 홋카이도에서 가장 많이 예약되는 날이고, 상품마다 중요한 내용이 다릅니다. 청의 호수, 팜 도미타, 점심 포함 여부를 확인하세요. 개화 시기는 팜 도미타 페이지에 없어 싣지 않습니다.
</>
    ),
    picks: [
      { label: "후라노와 비에이 겨울 일정 →", url: klookFor(furanoBieiWinterIlluminationTour.url, LOCALE) },
      { label: "비에이와 후라노 라벤더 일정(여름) →", url: klookFor(bieiFuranoLavenderDayTour.url, LOCALE) },
      { label: "후라노, 청의 호수, 시키사이노오카 →", url: klookFor(furanoBieiBluePondDayTour.url, LOCALE) },
      { label: "후라노와 비에이 합류 버스(여름) →", url: klookFor(sapporoFuranoBieiLavenderBusTour.url, LOCALE) },
      { label: "후라노 호텔 보기 →", url: klookFor(hokkaidoSevenDayStayAreas[2].url, LOCALE) },
    ],
  },
  {
    n: 6,
    label: "6일차",
    heading: "6일차: 삿포로 복귀, 마지막 큰 일정",
    intro:
      "돌아가는 방법은 계절에 달려 있습니다. 여름에는 후라노 라벤더 익스프레스가 환승 없이 2시간이라 6일차를 이동 오전으로 쓰고도 하루가 남습니다. 계절 열차이므로 12~2월에는 보통열차로 아사히카와까지 가서 라일락이나 카무이로 갈아타며 오전이 끝납니다. 오후도 계절로 나뉩니다. 겨울에는 삿포로 근처가 답입니다. 스노 파크 반나절, 또는 2027년 1월 30일~2월 23일의 시코쓰호 얼음 축제로, 16:30부터 조명이 켜지고 가이드 반나절과 버스 좌석으로 판매됩니다. 여름에는 남쪽 노보리베쓰와 도야호로 가는 긴 일정입니다. 온천 계곡과 칼데라호를 도는 하루 버스가 길지만 두 번째 거점 없이 볼 수 있는 유일한 방법입니다.",
    stops: [
      {
        time: "오전",
        place: "후라노 → 삿포로: 여름은 라벤더 익스프레스, 겨울은 보통열차와 라일락·카무이",
        allow: "2시간",
        getting: `여름: 특급 지정석, JR 홋카이도 왕복 요금 기준 편도 ${FURANO_OW}. 겨울: 아사히카와 경유 ${FURANO_WINTER}`,
        booking: "네",
      },
      {
        time: "오후",
        place: "스키나 눈놀이(겨울), 또는 노보리베쓰와 도야호(여름)",
        allow: "반나절~하루",
        getting: "삿포로에서 리조트 셔틀 또는 합류형 버스",
        booking: "네. 둘 다 정해진 픽업이 있는 예약 출발입니다",
      },
      {
        time: "저녁",
        place: "스스키노에서 마지막 저녁, 또는 2월에는 조명이 켜진 시코쓰호 얼음 축제",
        allow: "2~3시간",
        getting: "지하철 한 정거장, 또는 호수행 왕복 버스 좌석",
        booking: "스스키노는 불필요, 호수 버스는 필요",
      },
      {
        time: "늦은 시간",
        place: "짐 싸기, 내일 항공편 확인",
        allow: "1시간",
        getting: "n/a",
        booking: "n/a",
      },
    ],
    book: (
      <>
고른 오후 일정, 그리고 여름이라면 돌아오는 라벤더 익스프레스 좌석입니다. 스키를 타고 싶다면 <Link href="/ko/guides/attractions/niseko-ski-tours">니세코 스키 투어 가이드</Link>에서 삿포로 출발 당일 리프트권 + 버스 상품을 보세요. 2027년 1월 30일~2월 23일에는 시코쓰호 얼음 축제가 좋은 대안이며, 아래 반나절 투어로 쉽게 갈 수 있습니다. 무엇을 예약하든 취소 조건을 읽으세요. 홋카이도에서 눈이 앗아 가는 날이 바로 이날입니다. 무료 축제 회장은 닫지 않지만 시외 도로는 닫힙니다.
</>
    ),
    picks: [
      { label: "노보리베쓰, 도야호, 오타루 일정 →", url: klookFor(noboribetsuToyaOtaruDayTour.url, LOCALE) },
      { label: "시코쓰호 얼음 축제 →", url: klookFor(lakeShikotsuIceFestivalHalfDayTour.url, LOCALE) },
      { label: "삿포로 스노 파크 반나절 →", url: klookFor(sapporoSnowParkHalfDayTour.url, LOCALE) },
      { label: "노보리베쓰, 도야호, 니세코 일정 →", url: klookFor(noboribetsuToyaNisekoDayTour.url, LOCALE) },
    ],
  },
  {
    n: 7,
    label: "7일차",
    heading: "7일차: 신치토세, 그리고 하지 말아야 할 한 가지",
    intro:
      "홋카이도 출국일에는 함정이 하나 있고, 바로 날씨입니다. 쾌속 에어포트는 36~43분, ¥1,230, 낮에 시간당 6편이라 이동 자체는 쉽지만, 2월에는 신치토세의 도로와 항공이 이 여행에서 가장 차질이 나기 쉬운 부분입니다. 첫 편을 예약하지 말아야 할 이유입니다. 또 신치토세는 일찍 가기 좋은 공항입니다. 국내선 터미널은 영화관과 온천까지 있는 쇼핑 거리라 1시간 더 있어도 아깝지 않습니다.",
    stops: [
      {
        time: "오전",
        place: "삿포로역과 오도리 주변 마지막 쇼핑",
        allow: "1~2시간",
        getting: "도보, 지하",
        booking: "아니요",
      },
      {
        time: "출발 3시간 전",
        place: "삿포로 → 신치토세 공항",
        allow: "36~43분, 여유 시간 별도",
        getting: `쾌속 에어포트, 성인 ${AIRPORT_FARE}. uシート 지정석은 ¥1,000 추가`,
        booking: "아니요. 다만 위탁 수하물이 있으면 좌석 예약 권장",
      },
      {
        time: "공항에서",
        place: "국내선 터미널 쇼핑층과 푸드 스트리트",
        allow: "1~2시간",
        getting: "터미널 아래 역에서 도보",
        booking: "아니요",
      },
      {
        time: "출발",
        place: "도쿄, 오사카 또는 다음 목적지로 비행",
        allow: `JAL 기준 하네다까지 ${HND_FLIGHT}`,
        getting: "n/a",
        booking: "이미 예약 완료. 다만 겨울에는 첫 편을 피하세요",
      },
    ],
    book: (
      <>
새로 살 것은 없습니다. 잘 짠 마지막 날은 그래야 합니다. 사는 대신 확인할 것이 두 가지입니다. 첫째, 출국일에도 eSIM이나 데이터가 살아 있어야 합니다. 2월의 항공편 변경 공지는 창구가 아니라 휴대폰으로 옵니다. 둘째, 도쿄나 오사카에서 연결한다면 홋카이도 구간에 신칸센보다 더 많은 여유를 두세요. JAL 노선표 기준 하네다–삿포로는 {HND_FLIGHT}, 하루 16편이라 오전 편을 놓쳐도 회복할 수 있지만 국제선 연결은 그렇지 않습니다.
</>
    ),
    picks: [
      { label: "신치토세 이동 →", url: klookFor(newChitoseAirportTransfers.url, LOCALE) },
      { label: "클룩 eSIM 보기 →", url: klookFor(klookEsim.url, LOCALE) },
    ],
  },
];

const hokkaidoSameTrip: KlookTripPrepItem[] = [
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩에서 eSIM 보기 →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "2월의 일주일은 공지로 움직입니다. 열차 지연, 도로 폐쇄, 항공편 변경이 모두 휴대폰으로 먼저 오고, 아사히카와와 후라노 구간은 실시간 시간표가 필요합니다.",
  },
  {
    label: "신치토세 공항 이동(전용차·합승)",
    ctaLabel: "신치토세 이동 보기 →",
    url: klookFor(newChitoseAirportTransfers.url, LOCALE),
    why: `대부분은 ${AIRPORT_FARE}의 쾌속 에어포트가 맞습니다. 예약 차량은 늦은 도착, 역에서 먼 호텔, 스키 가방이 있는 일행에 맞습니다.`,
  },
  {
    label: "홋카이도 삿포로–후라노 에어리어 패스(4일)",
    ctaLabel: "에어리어 패스 보기 →",
    url: klookFor(sapporoFuranoAreaPass.url, LOCALE),
    why: `이 경로에서 이득이 되는 패스입니다. JR 홋카이도 기준 연속 4일 ${AREA_FURANO}, 3~6일차에 씁니다.`,
  },
  {
    label: "삿포로역 주변 호텔",
    ctaLabel: "클룩에서 삿포로 호텔 보기 →",
    url: klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE),
    why: "6박 중 4박이 여기이고, 일주일의 모든 철도 구간이 이 건물에서 시작합니다.",
  },
];

const faqItems = [
  {
    q: "홋카이도 7일이면 충분한가요?",
    a: `섬의 절반이라면 넉넉합니다. 6박 7일이면 삿포로, 오타루, 아사히카와, 비에이, 후라노를 서두르지 않고 돌 수 있고, 이 페이지의 경로가 그것입니다. 삿포로 4박, 후라노 2박입니다. 7일로 섬 전체는 볼 수 없습니다. 홋카이도는 오스트리아만 한 크기이고 동쪽의 시레토코, 구시로, 아칸호는 아사히카와에서 4~5시간 더 가야 하며 남쪽의 하코다테는 또 다른 방향입니다. 둘 중 하나라도 넣으면 일주일이 열차로 끝납니다. 2~3박에 거점 하나가 기준입니다. 거점 둘이면 서쪽을 제대로 보고, 셋이면 서둘러 보고, 넷이면 휴가가 아니라 이동 일정이 됩니다.`,
  },
  {
    q: "홋카이도에 차가 필요한가요?",
    a: `이 경로에는 필요 없고, 예외가 하나 있습니다. 삿포로, 오타루, 아사히카와, 후라노는 모두 JR 노선이며 특급이나 시간당 여러 편의 쾌속으로 이어집니다. ${OWN}에 확인한 JR 홋카이도 수치로 삿포로–오타루 ${OTARU_FARE}, 약 33분, 삿포로–아사히카와 1시간 25분, 삿포로–후라노는 여름 계절 열차 라벤더 익스프레스로 2시간입니다. 겨울에는 이 열차가 없으므로 보통열차로 아사히카와까지 가서 라일락이나 카무이를 탑니다. 삿포로 시내는 지하철로 충분합니다. 예외는 5일차입니다. 비에이의 패치워크 언덕, 시키사이노오카, 시로가네 청의 호수는 농지에 흩어져 있고 버스가 드물어 차가 없으면 정말 불편합니다. 차 없이 가능한 방법은 관광버스, 비에이역 택시 코스, 가이드 일정 세 가지이며, 그래서 이날의 상품이 이 페이지에서 가장 유용합니다. 운전에 대한 주의가 두 가지 있습니다. 홋카이도 겨울 도로는 단순한 불편이 아니라 실제 위험이고, 도시에 있는 4일 동안 차는 돈만 듭니다.`,
  },
  {
    q: "7일 여행에 홋카이도 레일 패스가 이득인가요?",
    a: `이 경로에서는 아닙니다. 계산을 직접 보세요. ${OWN}에 확인한 JR 홋카이도 요금으로 홋카이도 레일 패스는 사전 구매 기준 연속 5일 ${PASS_5}, 7일 ${PASS_7}, 10일 ${PASS_10}이고, 역 구매는 ¥1,000 더 비싸며 플렉시블권은 없습니다. 구간을 보겠습니다. 공항 편도 ${AIRPORT_FARE}, 오타루 왕복 ¥1,600, 삿포로–아사히카와 지정석 편도 ${ASAHIKAWA_OW}(왕복 ${ASAHIKAWA_RT}의 절반), 아사히카와–후라노 보통열차 ${FURANO_LOCAL}입니다. 후라노–삿포로는 여름 라벤더 익스프레스 ${FURANO_OW}(왕복 ${FURANO_RT}의 절반), 겨울은 보통열차와 라일락·카무이로 ${FURANO_WINTER}입니다. 합계는 여름 ${TOTAL_SUMMER}, 겨울 ${TOTAL_WINTER}로 어느 쪽이든 ¥18,000 미만입니다. ${PASS_7}과 비교하면 7일권은 약 ¥10,000 손해입니다. 이득이 되는 것은 4일권 삿포로–후라노 에어리어 패스 ${AREA_FURANO}입니다. 아사히카와와 후라노 특급 구간만 ¥11,720이고 신치토세, 삿포로, 오타루, 비에이도 포함되어 3~6일차에 쓰면 오타루 왕복까지 더해 본전을 넘습니다. 삿포로–노보리베쓰 에어리어 패스 ${AREA_NOBORIBETSU}는 내륙 대신 남쪽으로 가는 경로에 해당합니다. 2026년 10월 1일 개정 후 7일 ¥53,000인 전국 JR 패스는 홋카이도만 도는 여행에는 전혀 맞지 않습니다.`,
  },
  {
    q: "홋카이도에서는 어디에 묵어야 하나요?",
    a: `7일에 거점 둘, 삿포로 4박과 후라노 2박입니다. 삿포로역은 전망이 아니라 경로를 위한 거점입니다. 신치토세발 쾌속 에어포트, 아사히카와행 라일락과 카무이, 여름의 후라노 라벤더 익스프레스가 모두 이 건물에서 출발하고 오도리는 지하철 한 정거장이나 지붕 있는 길입니다. 일 최고기온 평균 ${FEB_MAX}인 달에는 이것이 무엇보다 중요합니다. 많은 사람이 건너뛰지만 건너뛰면 안 되는 것이 4, 5일째 밤의 후라노입니다. 삿포로에서 비에이와 후라노를 당일로 가면 10시간 버스이고, 후라노 숙소에서 이틀 아침을 보내면 일주일 중 가장 좋은 시간이 됩니다. 바꿀 만한 곳이 둘 있습니다. 조명이 켜진 운하가 목적이라면 3일째 밤을 오타루로, 특히 2월 첫 2주 눈빛 거리 축제 때 바꾸세요. ${OTARU_FARE}, 약 33분이라 비용이 거의 들지 않습니다. 정말 스키 주간이라면 후라노를 니세코로 바꾸세요. 공항 버스가 신치토세에서 직행하고 스키 가방을 실을 수 있습니다.`,
  },
  {
    q: "홋카이도 여행은 언제가 가장 좋나요?",
    a: `정답이 둘이고 서로 다른 여행입니다. 겨울은 2월로 날짜가 정해진 행사가 있습니다. 위원회 공지에 따라 삿포로 눈축제가 2027년 2월 4~11일 세 곳의 무료 회장에서 열리고(확인일 ${FESTIVAL_CHECKED}), 오타루 관광협회 페이지에 따라 오타루 눈빛 거리 축제가 2027년 2월 6~13일이며(확인일 ${OWN}), 아사히야마 동물원의 펭귄 산책은 눈길 코스가 필요하고 시작일은 동물원 공식 SNS로 발표됩니다. 대가는 날씨입니다. 일본 기상청 1991~2020년 삿포로 평년값으로 2월은 일 최고 ${FEB_MAX}, 최저 ${FEB_MIN}, 강설량 ${FEB_SNOW}입니다(확인일 ${JMA_CHECKED}). 여름은 7월로 정반대입니다. 후라노 라벤더, 비에이 언덕, 긴 낮, 그리고 일본 다른 곳이 견디기 어려운 달에 홋카이도만 쾌적합니다. 그 사이에는 늦은 벚꽃과 샤코탄 해안의 5월, 다이세쓰잔 단풍의 9월 하순~10월이 있습니다. 다시 생각할 달은 11월입니다. 계절 사이라 시설이 교체 휴무를 하며 아사히야마 동물원도 11월 4~10일 닫습니다. 4월은 진창입니다.`,
  },
  {
    q: "신치토세 공항에서 삿포로까지 어떻게 가나요?",
    a: `쾌속 에어포트로 ${AIRPORT_FARE}입니다. ${OWN}에 확인한 JR 홋카이도 수치로 09:00~16:00에 시간당 6편(특별쾌속 1, 쾌속 3, 구간쾌속 2)이며, 일본어 페이지는 열차별 최단 36, 37, 43분, 영어 페이지는 특별쾌속 33분으로 안내합니다. 역은 국내선 터미널 아래에 있고 예약이 필요 없으며 Kitaca, Suica, PASMO를 개찰구에서 쓸 수 있습니다. 4호차는 uシート 지정석으로 요금에 ¥1,000 추가, 티켓리스 ¥800이며, 겨울에는 일반 차량이 스키 가방으로 차서 값어치가 있습니다. 의외의 점이 두 가지 있습니다. 오타루까지 환승 없이 최단 73분(JR 홋카이도 수치)이라 일찍 도착하면 바로 갈 수 있습니다. 대안인 예약 차량은 눈 속의 역이 아니라 호텔 앞까지 간다는 실질적인 장점이 있습니다. 출국 전에 예약하고 상품 페이지의 픽업 조건을 확인하세요.`,
  },
  {
    q: "도쿄나 오사카에서 홋카이도까지 비행 시간은 얼마나 되나요?",
    a: `${OWN}에 확인한 JAL 노선표 기준 하네다–신치토세는 ${HND_FLIGHT}, 하루 16편입니다. 세계에서 가장 바쁜 노선 중 하나로, 변경 가능한 요금이라면 사실상 가서 타면 됩니다. 오사카는 수치를 싣지 않습니다. 확인일에 이타미나 간사이–신치토세 소요 시간을 공개한 항공사 페이지를 읽지 못했고 집계 사이트 수치는 운항사 공식이 아니므로 항공사 시간표를 확인하세요. 계획상 중요한 점은 같습니다. 비행시간에 신치토세–삿포로 ${AIRPORT_FARE}, 36~43분을 더하고, 2월 출국은 신칸센보다 여유를 두고, 마지막 날 첫 편은 피하세요. 열차도 있습니다. 홋카이도 신칸센은 삿포로가 아니라 신하코다테호쿠토까지 가며, 7일 여행에서는 편도마다 하루를 씁니다.`,
  },
  {
    q: "홋카이도 7일 여행의 교통비는 얼마인가요?",
    a: `위 경로의 철도 요금은 1인 ¥18,000 미만이며, 많은 사람이 이 수치를 높게도 낮게도 잘못 잡습니다. ${OWN}에 확인한 JR 홋카이도 수치로 나누면 신치토세 도착 ${AIRPORT_FARE}, 오타루 왕복 ¥1,600, 아사히카와행 특급 지정석 ${ASAHIKAWA_OW}, 아사히카와–후라노 보통열차 ${FURANO_LOCAL}, 후라노 복귀는 여름 라벤더 익스프레스 ${FURANO_OW} 또는 겨울 아사히카와 경유 ${FURANO_WINTER}, 공항행 ${AIRPORT_FARE}로 여름 ${TOTAL_SUMMER}, 겨울 ${TOTAL_WINTER}입니다. 삿포로 시내 지하철은 1구간 ¥210이고 교통국 1일권은 평일 ${SUBWAY_DAY_PASS}, 주말·공휴일 ${DONICHIKA}로 3~4회부터 이득입니다. 이 금액에 없고 실제 예산을 정하는 것은 왕복 항공, 6박 숙박, 대중교통이 정말 나쁜 비에이와 요이치의 가이드 일정입니다. 비교할 가치가 있는 세 가지이며 모두 날짜별로 달라 이 페이지에 가격을 싣지 않았습니다.`,
  },
  {
    q: "이 일정을 거꾸로 하거나 신치토세에서 바깥으로 갈 수 있나요?",
    a: `네, 거꾸로 하는 방법 중 하나는 원래보다 낫습니다. 스키 주간이라면 도착해서 리조트 버스로 니세코나 루스쓰로 바로 가세요. 신치토세에서 직행하고 스키 장비와 1인당 짐 하나를 실을 수 있어 쾌속 에어포트와 오타루 환승으로는 안 되는 일이 됩니다. 거기서 2~3박 후 삿포로를 거쳐 도시 쪽 일정을 보냅니다. 내륙을 먼저, 도시를 나중에 하는 역순은 평범한 이유로 덜 좋습니다. 아사히카와와 후라노 특급은 전석 지정이고 공항 쾌속보다 적어서, 항공편이 늦을 수 있는 도착일에 넣으면 일주일의 유일한 일정 위험이 됩니다. 그래도 내륙부터 간다면 비싼 구간이 앞에 있으므로 4일권 패스를 여행 앞쪽에 쓰세요.`,
  },
  {
    q: "5일밖에 없거나 10일이라면요?",
    a: `5일이면 6일차와 삿포로 1박을 빼세요. 도착, 삿포로 하루, 오타루, 아사히카와와 후라노, 출국입니다. 사람들이 찾아오는 두 가지는 남기고 선택 일정만 뺍니다. 이 경우 5일권 ${PASS_5}은 7일권보다 더 손해이고 4일권 에어리어 패스는 여전히 본전을 넘습니다. 10일이면 서쪽에 네 번째 거점을 넣지 말고 동쪽을 더하세요. 10일쯤 되어야 시레토코나 아칸호가 긴 열차 이동이 아니라 여행의 일부가 되고, 동쪽 구간이 길고 비싸서 10일권 ${PASS_10}도 계산할 만해집니다. 일본 14일 일정은 전국 경로로 같은 논리를 다루고, 일본 겨울 여행 일정은 홋카이도를 2월 전국 여행의 한 구간으로 다룹니다.`,
  },
];

const TITLE = "홋카이도 7일 여행(2027): 날짜별 일정과 패스 계산";
const DESC =
  "홋카이도 7일 여행 일정: 삿포로, 오타루, 아사히카와, 비에이, 후라노의 날짜별 표와 숙소 거점, 항공, 철도 패스 계산.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function Hokkaido7DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
홋카이도 7일 여행:<br />날짜별 7일 일정
</h1>
          <p className={styles.heroSubtitle}>
거점 둘, 6박, 날마다 표 하나. JR 홋카이도 요금으로 계산한 철도 패스, 2월과 7월 버전 비교까지.
</p>
          <div className={styles.heroBadges}>
            {[`업데이트 ${monthLabel(updated.iso, LOCALE)}`, "날마다 표", "운영사 요금, 확인일 표기", "겨울과 여름 버전"].map((t) => (
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
          heading={"홋카이도 7일 여행에서 어떤 투어를 예약할까요?"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
2027년 2월 4~11일 삿포로 눈축제나 2월 6~13일 오타루 눈빛 거리 축제에 걸린다면 숙소부터 예약하세요. 당일 투어는 12월 31일까지 잡아 두고, 닛카 증류소는 4주 전에 예약이 열릴 때까지 기다리세요.
</>
          }
          tours={[
            {
              title: "후라노와 비에이 당일 투어, 겨울 일루미네이션 코스",
              url: klookFor(furanoBieiWinterIlluminationTour.url, LOCALE),
              price: null,
              duration: "약 10시간",
              departs: "삿포로",
            },
            {
              title: "삿포로 출발 아사히야마 동물원, 비에이 청의 호수, 닝글 테라스 당일 투어",
              url: klookFor(asahiyamaBieiHighlightsTour.url, LOCALE),
              price: "약 US$55부터",
              duration: "하루 종일",
              departs: "삿포로",
            },
            {
              title: "삿포로 출발 요이치와 오타루 도보 당일 투어",
              url: klookFor(yoichiOtaruWalkingTour.url, LOCALE),
              price: null,
              duration: "상품 페이지 참고",
              departs: "삿포로",
            },
          ]}
        />

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
경로
</p>
                <p className={styles.verdictStatValue}>
삿포로 · 오타루 · 아사히카와 · 비에이 · 후라노
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
거점
</p>
                <p className={styles.verdictStatValue}>
삿포로 4박, 후라노 2박
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
일주일 철도 요금
</p>
                <p className={styles.verdictStatValue}>
1인 ¥18,000 미만
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
7일 전역 패스?
</p>
                <p className={styles.verdictStatValue}>
아니요. 4일 에어리어 패스가 이득
</p>
              </div>
            </div>
                        <p className={styles.verdictText}>
이 <strong>홋카이도 7일 여행</strong>은 <strong>거점 둘, 6박</strong>으로 <strong>삿포로 4박</strong>, <strong>후라노 2박</strong>이며 <strong>삿포로 → 오타루 → 아사히카와 → 비에이와 후라노 → 삿포로</strong>로 돕니다. 거리가 짧아 전부 열차로 갈 수 있습니다. JR 홋카이도 수치로 신치토세–삿포로 <strong>{AIRPORT_FARE}</strong>, <strong>36~43분</strong>, 삿포로–오타루 <strong>{OTARU_FARE}</strong>, <strong>약 33분</strong>, 삿포로–아사히카와는 지정석 라일락이나 카무이로 <strong>1시간 25분</strong>, 후라노–삿포로는 여름 라벤더 익스프레스로 <strong>2시간</strong>, 겨울에는 보통열차와 라일락이나 카무이입니다. 합치면 일주일 철도 요금이 1인 <strong>¥18,000 미만</strong>이므로 <strong>7일권 홋카이도 레일 패스 {PASS_7}은 이 경로에서 이득이 아니고</strong>, 4일권 <strong>삿포로–후라노 에어리어 패스 {AREA_FURANO}</strong>가 이득입니다. 대중교통으로 잘 다닐 수 없는 하루는 <strong>비에이</strong>이고, <strong>2월</strong>과 <strong>7월</strong>이 완전히 다른 여행이 되는 하루는 <strong>후라노</strong>입니다. 요금과 패스 가격 확인일 {OWN}.
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
삿포로 호텔 보기 →
</KlookLink>
              <KlookLink href={klookFor(jrHokkaidoRailPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
JR 홋카이도 패스 보기 →
</KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label={"같은 여행에서 예약할 것"}
          heading={"홋카이도 일주일에 함께 예약할 것"}
          intro={"7일 일정 외에 세 가지가 있습니다. 날씨와 시간표 공지를 받을 데이터, 공항 구간, 이 경로에서 이득인 철도 패스입니다. 클룩이 자동 가격 조회를 막고 있으니 날짜별 가격은 상품 페이지에서 확인하세요."}
          items={hokkaidoSameTrip}
        />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
일주일의 구성
</span>
          <h2 className={styles.sectionTitle}>
홋카이도 7일, 어디에 묵어야 하나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>거점은 넷이 아니라 둘입니다.</strong> 홋카이도 일주일에서 가장 흔한 실수는 혼슈처럼 이틀마다 호텔을 바꾸는 것이고, 이 크기의 섬에서는 일주일을 열차에서 보내게 됩니다. 삿포로 4박과 후라노 2박이면 아래 내용을 서두르지 않고 모두 볼 수 있으며, 바꿀 만한 곳은 표의 두 곳뿐입니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["거점", "숙박", "이유"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {baseRows.map((row) => (
                    <tr key={row.base}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.base}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.nights}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
겨울 또는 여름
</span>
          <h2 className={styles.sectionTitle}>
홋카이도 여행은 언제가 가장 좋나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>2월과 7월이며 서로 다른 여행입니다.</strong> 일주일의 뼈대는 같지만 7일 중 4일의 내용이 달라 따로 정리했습니다. 2월에는 날짜가 정해진 행사가 있습니다. <strong>삿포로 눈축제 2027년 2월 4~11일</strong>, <strong>오타루 눈빛 거리 축제 2027년 2월 6~13일</strong>입니다. 대가는 기상청 1991~2020년 삿포로 평년값으로 일 최고 평균 <strong>{FEB_MAX}</strong>, 월 강설량 <strong>{FEB_SNOW}</strong>입니다. 7월에는 후라노 라벤더와 긴 낮이 있고 일본 다른 곳과 달리 쾌적한 유일한 달입니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["날짜", "겨울 버전(12~3월)", "여름 버전(6~8월)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.day}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.day}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.winter}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.summer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
눈축제 날짜는 위원회 공지 기준으로 <Link href="/ko/guides/attractions/sapporo-snow-festival-tours" style={{ color: "var(--text)", fontWeight: 600 }}>삿포로 눈축제 가이드</Link>를 위해 {FESTIVAL_CHECKED}에 확인했습니다. 오타루 눈빛 거리 축제는 오타루 관광협회 2027년 페이지 기준({OWN} 확인)으로, 날짜를 밝히고 세부 사항은 확정되는 대로 안내한다고 합니다. 기온과 강설 평년값은 일본 기상청({JMA_CHECKED} 확인) 기준입니다. 다시 생각할 달은 시설이 계절 교체로 닫는 11월(아사히야마 동물원도 11월 4~10일 휴원)과 4월입니다.
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
패스 계산
</span>
          <h2 className={styles.sectionTitle}>
7일 여행에 홋카이도 레일 패스가 이득인가요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>이 경로에서는 아니고, 4일 에어리어 패스가 이득입니다.</strong> 이 페이지에서 가장 유용한 숫자이므로 결론만이 아니라 계산 전체를 보여 드립니다. 아래 요금은 모두 JR 홋카이도 공식이며 확인일은 {OWN} 또는 {SEASON}입니다. 특급 두 구간은 운영사가 모델 코스 페이지에 공개한 왕복 요금의 절반입니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["구간", "성인 요금", "비고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
<strong>그래서 어떤 패스인가.</strong> <strong>홋카이도 레일 패스</strong>는 사전 구매 기준 연속 5일 {PASS_5}, 7일 <strong>{PASS_7}</strong>, 10일 {PASS_10}이고 역 구매는 ¥1,000 더 비싸며 어린이는 절반, 플렉시블권은 없습니다. ¥18,000 미만의 요금과 비교하면 7일권은 약 ¥10,000 손해입니다. 연속 4일 <strong>{AREA_FURANO}</strong>의 <strong>삿포로–후라노 에어리어 패스</strong>가 이득입니다. 아사히카와와 후라노 특급 구간만 ¥11,720이고 신치토세, 삿포로, 오타루, 비에이도 포함되어 3~6일차에 쓰면 오타루 왕복까지 더해 본전을 넘습니다(토마무는 포함되지 않습니다). <strong>삿포로–노보리베쓰 에어리어 패스</strong> {AREA_NOBORIBETSU}는 내륙 대신 남쪽 경로용으로 신치토세, 삿포로, 오타루, 노보리베쓰를 포함하고 도야는 포함하지 않습니다. 2026년 10월 1일 개정 후 7일 ¥53,000, 14일 ¥84,000, 21일 ¥105,000인 전국 <strong>JR 패스</strong>는 홋카이도만 도는 여행에 맞지 않습니다. 언제 맞는지는 <Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR 패스 가이드(영어)</Link>를 보세요.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jrHokkaidoRailPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
JR 홋카이도 패스 보기 →
</KlookLink>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
신치토세 이동 →
</KlookLink>
            <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
니세코 리조트 셔틀 →
</KlookLink>
          </div>
        </section>

        <p className={styles.bodyText} style={{ marginBottom: "2.5rem" }}>
아래 7일에는 날마다 표가 있습니다. 시간대, 장소, 소요 시간, 이동 방법, 예약 필요 여부를 담았고 그 아래에 그날의 상품이 있습니다. 여행 형태가 다르다면 <Link href="/guides/attractions/japan-winter-itinerary" hrefLang="en">일본 겨울 여행 일정(영어)</Link>은 2월 홋카이도 버전이 있는 12일 전국 경로이고, <Link href="/guides/attractions/japan-10-day-itinerary" hrefLang="en">일본 10일 일정(영어)</Link>과 <Link href="/guides/attractions/japan-14-day-itinerary" hrefLang="en">일본 14일 일정(영어)</Link>은 도쿄–교토–오사카 구간을 다루며, <Link href="/ko/guides/attractions/sapporo-snow-festival-tours">삿포로 눈축제 가이드</Link>는 2월 날짜를 중심으로 짠 일주일입니다. 도쿄를 거쳐 돌아간다면 겨울 일정을 더할 수 있습니다. <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">도쿄 출발 갈라 유자와 스키(영어)</Link>, 온천에 들어간 원숭이를 보는 <Link href="/ko/guides/attractions/jigokudani-snow-monkey-tour">지고쿠다니 원숭이 공원 투어</Link>, 저녁의 <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">도쿄 일루미네이션(영어)</Link>입니다. 혼슈의 눈 덮인 마을은 <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">다카야마와 시라카와고 투어(영어)</Link>에 있습니다.
</p>

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
일곱 표의 “소요 시간”은 운영사 수치가 아니라 저희 계획 기준입니다. 이동 시간과 요금은 모두 운영사 공식입니다. 공항, 오타루, 아사히카와, 후라노 구간은 JR 홋카이도, 아사히야마 동물원 입장료 {ZOO_ADULT}과 겨울 시간은 아사히카와시, 운하 크루즈 요금은 운영사, 팜 도미타 시간은 팜 도미타, 요이치 증류소는 닛카 페이지 기준이며 모두 {OWN}에 확인했습니다. 눈축제 날짜와 삿포로 지하철 1일권은 <Link href="/ko/guides/attractions/sapporo-snow-festival-tours" style={{ color: "var(--text)", fontWeight: 600 }}>삿포로 눈축제 가이드</Link>에서 가져왔고 확인일은 {FESTIVAL_CHECKED}입니다.
</p>

                <KlookStayAreas
          heading={"위 거점의 호텔 검색"}
          intro={"거점 둘의 일주일에 쓸 검색 네 가지입니다(변경 두 곳 포함). 2월에 수요가 몰리는 섬에서 남은 객실과 가격은 날짜별로 다르므로 각 거점에서 클룩 호텔 검색으로 연결했고, 각 설명은 전망이 아니라 위 표의 교통 근거입니다."}
          areas={hokkaidoSevenDayStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "7일 중 3~4박입니다. 이 경로의 내륙과 해안 일정이 모두 여기서 시작합니다. 신치토세발 쾌속 에어포트, 아사히카와행 라일락과 카무이, 여름의 후라노 라벤더 익스프레스가 이 건물에서 출발하고 오도리는 지하철 한 정거장이나 지붕 있는 길입니다.", area: "삿포로역" }, { why: "조명이 켜진 운하와, 당일 여행객이 돌아간 뒤의 눈빛 거리 축제를 보고 싶다면 당일 여행보다 1박이 낫습니다. JR 홋카이도 기준 삿포로까지 ¥800, 약 33분이라 옮겨도 비용이 거의 들지 않습니다.", area: "오타루역" }, { why: "내륙 구간을 10시간 버스 일정에서 여유로운 이틀로 바꾸는 거점입니다. 팜 도미타와 비에이 언덕을 당일 여행의 끝이 아니라 아침 빛으로 볼 수 있고, 여름에는 라벤더 익스프레스로 삿포로까지 2시간입니다.", area: "후라노" }, { why: "눈이 목적인 일주일에만 맞습니다. 리프트가 숙소 앞에 있고 스키 가방을 싣는 버스가 신치토세에서 직행하므로, 이 경로의 스키 버전은 도착일에 삿포로를 거치지 않습니다.", area: "니세코" }] as Partial<typeof item>[])[i]))}
        />

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3rem" }}>
네 곳 모두에 해당하는 시기 참고입니다. 이 섬이 가장 붐비는 2월 주는 1년 전에 발표되는 고정 날짜입니다. 눈축제 위원회는 2026년 2월 11일에 2027년 날짜를 공개했습니다. 그래서 2월 첫 2주의 객실은 대안이 없는 예약이고, 삿포로가 차면 오타루가 일반적인 답입니다. 객실 점유율 수치는 공개된 것이 없어 싣지 않습니다.
</p>

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"이 경로에서 실제로 예약하는 4일"}
          intro={"7일 중 4일은 예약 없이 가능하고 3일은 그렇지 않습니다. 예약 없이는 정말 어려운 3일(비에이와 후라노, 오타루와 요이치, 아사히카와 동물원)에 여유가 있는 주를 위한 남쪽 긴 일정을 더했습니다."}
          tours={[withKlookLocale(furanoBieiBluePondDayTour, LOCALE, { title: "삿포로 출발 후라노, 비에이 청의 호수, 시키사이노오카 당일 여행", desc: "시로가네 청의 호수와 시키사이노오카 꽃 언덕을 포함한 내륙 일정으로, 트랙터 승차와 라벤더 베개 만들기가 포함됩니다" }), withKlookLocale(yoichiOtaruWalkingTour, LOCALE, { title: "삿포로 출발 요이치와 오타루 도보 당일 투어", desc: "영어 가능 어시스턴트가 동행하는 소규모 전철·버스 일정으로, 닛카 요이치 증류소, 사케 양조장, 오타루 운하 크루즈를 약 4 km 걸으며 돕니다" }), withKlookLocale(asahiyamaBieiHighlightsTour, LOCALE, { title: "삿포로 출발 아사히야마 동물원, 비에이 청의 호수, 닝글 테라스 당일 투어", desc: "삿포로에서 아사히카와 동물원, 비에이 청의 호수, 닝글 테라스를 도는 당일 버스로, 여러 경로로 판매되며 겨울에는 스노모빌 옵션이 추가 요금으로 있습니다" }), withKlookLocale(noboribetsuToyaOtaruDayTour, LOCALE, { title: "삿포로 출발 노보리베쓰, 도야호, 오타루 당일 투어", desc: "시내 남서쪽을 도는 합류형 당일 투어로, 축제 여행에 하루 여유가 있고 오도리의 네 번째 저녁을 원하지 않을 때 맞습니다" })]}
        />

                <Related items={[{ href: "/guides/transport/hokkaido-rail-pass", title: "홋카이도 레일 패스(2026): 가격과 이득 여부 (영어)" }, { href: "/ko/guides/attractions/niseko-ski-tours", title: "니세코 스키 투어(2027): 셔틀, 강습, 4개 스키장" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "삿포로 출발 오타루 당일 여행(2027): ¥800, JR 33분 (영어)" }, { href: "/ko/guides/attractions/sapporo-snow-festival-tours", title: "삿포로 눈축제(2027): 2월 4~11일, 무료 회장" }, { href: "/guides/attractions/japan-winter-itinerary", title: "일본 겨울 여행 12일 일정(2027): 날짜별 코스 (영어)" }, { href: "/guides/money/best-travel-insurance-japan", title: "일본 여행자 보험 추천 2026: 누구에게 무엇이 필요한가 (영어)" }, { href: "/guides/money/japan-ski-travel-insurance", title: "일본 스키 여행자 보험(2027): 무엇을 보장받아야 할까 (영어)" }, { href: "/guides/transport/jr-pass-guide", title: "JR 패스 가이드(2026): 가격, 범위, 이득 여부 (영어)" }, { href: "/ko/guides/esim/best-esim-japan", title: "일본 eSIM 추천(2026): 업체, 가격, 선택법" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
거점 둘, 6박, 철도 ¥18,000 미만
</h2>
            <p className={styles.ctaBannerDesc}>
철도 구간은 거의 예약이 필요 없습니다. 숙소와 가이드 일정 3일은 필요하고, 2월 첫 2주에는 숙소가 이 일주일에서 대안이 없는 유일한 부분입니다.
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
삿포로 호텔 보기 →
</KlookLink>
              <KlookLink href={klookFor(hokkaidoSevenDayStayAreas[2].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
후라노 호텔 보기 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
