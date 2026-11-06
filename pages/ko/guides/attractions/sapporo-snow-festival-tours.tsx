import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  jozankeiHotSpringBusTrip,
  jrHokkaidoRailPass,
  klookEsim,
  lakeShikotsuIceFestivalHalfDayTour,
  lakeShikotsuIceFestivalShuttleBus,
  newChitoseAirportTransfers,
  noboribetsuToyaOtaruDayTour,
  otaruSnowParkDayTour,
  sapporoFuranoAreaPass,
  sapporoJozankeiBuddhaDayTour,
  sapporoSnowFestivalStayAreas,
  sapporoSnowParkHalfDayTour,
  sapporoTvTowerMoiwaSetTicket,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import {
  asahiyamaBieiHighlightsTour,
  lakeShikotsuTomamuIceVillageDayTour,
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

// Mirrors the English guide (pages/guides/attractions/sapporo-snow-festival-tours.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/sapporo-snow-festival-tours";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "삿포로 눈축제" }];

const OWN_ISO = "2026-10-30";
const OWN = dateLabel(OWN_ISO, LOCALE);

const SEASON_ISO = "2026-11-06";
const SEASON = dateLabel(SEASON_ISO, LOCALE);

const JMA_CHECKED = dateLabel("2026-10-28", LOCALE);

const FEB_MEAN = "−2.7°C";
const FEB_MAX = "0.4°C";
const FEB_MIN = "−6.2°C";
const FEB_SNOW = "116 cm";
const AIRPORT_FARE = "¥1,230";
const SUBWAY_FARE = "¥210";
const SUBWAY_DAY_PASS = "¥830";
const DONICHIKA = "¥520";
const SHUTTLE_FARE = "¥200";

const siteRows = [
  {
    site: "오도리 회장(大通会場)",
    where: "오도리 공원 니시 1초메~니시 11초메. 삿포로 TV 타워 아래에서 시작해 11블록이 일직선으로 이어집니다",
    when: "축제 기간 언제든 관람 가능, 조각 조명은 22:00까지",
    cost: "무료",
    what: "대형 눈 조각, 시민 조각 경연, 먹거리 노점. 눈축제라고 하면 보통 이 회장을 가리킵니다",
  },
  {
    site: "스스키노 회장(すすきの会場)",
    where: "에키마에도리 미나미 4조~미나미 6조. 유흥가를 가로지르는 큰길입니다",
    when: "언제든 관람 가능, 조명은 23:00까지(마지막 날 22:00까지)",
    cost: "무료",
    what: "눈이 아닌 얼음 조각이 바와 바 사이 거리에 늘어섭니다. 세 회장 중 가장 늦게까지 볼 수 있고, 오도리에서 조금 걷거나 지하철 한 정거장입니다",
  },
  {
    site: "쓰도무 회장(つどーむ会場)",
    where: "도호선 북동쪽 끝에 있는 삿포로시 스포츠 교류 시설 「つどーむ」",
    when: "10:00–16:00만 운영. 혼잡하면 체험 접수가 일찍 마감될 수 있음",
    cost: "입장 무료, 내부 일부 체험은 유료",
    what: "눈 미끄럼틀, 스노 래프팅 등 체험 위주의 가족용 회장으로, 조명 시간이 아니라 폐장 시간이 있는 유일한 회장입니다",
  },
];

const tourRows = [
  {
    tour: "오타루, 시로이 코이비토 파크, 스노 파크 당일 여행",
    adds: "쾌속 에어포트로 서쪽 33~41분 거리의 운하 마을과 증기 시계, 눈놀이를 하루 일정으로 예약합니다",
    fits: "하루 종일. 다른 당일 여행보다 축제 저녁과 묶으세요",
    note: "오타루는 2027년 2월 6~13일에 눈빛 거리 축제를 자체 개최합니다. 12월보다 축제 주간에 가는 편이 좋은 이유입니다",
  },
  {
    tour: "아사히야마 동물원, 비에이 청의 호수, 닝글 테라스 당일 여행",
    adds: "펭귄 산책을 볼 수 있는 계절의 아사히카와 동물원과 비에이. 겨울에는 스노모빌 옵션이 추가 요금으로 있습니다",
    fits: "하루 종일 걸리는 긴 일정으로, 이 중 삿포로에서 가장 멉니다",
    note: "펭귄 산책은 눈길 코스가 필요하고 2026-27 시작일은 미발표입니다. 다만 2월은 동물원이 안내하는 12월 하순~3월 중순 기간에 들어갑니다",
  },
  {
    tour: "시코쓰호 얼음 축제: 반나절 투어, 셔틀 좌석, 토마무 일일 투어",
    adds: "홋카이도 이쪽의 또 다른 2월 얼음 행사로, 2027년 1월 30일~2월 23일, 조명 16:30~20:00입니다",
    fits: "반나절 또는 저녁. 축제 날 오후가 비었을 때 딱 맞습니다",
    note: "가이드 반나절 투어, 왕복 버스 좌석, 토마무 아이스 빌리지를 묶은 10시간 투어의 세 가지로 판매됩니다. 입장료는 평일 ¥1,000, 주말·공휴일 ¥3,000이고 토마무 상품은 불포함이라고 밝히고 있으니 나머지도 확인하세요",
  },
  {
    tour: "조잔케이: 온천 당일 여행 또는 부처의 언덕 당일 여행",
    adds: "시내에서 남쪽으로 1시간이 안 되는 계곡 온천 마을, 또는 안도 다다오의 부처의 언덕과 시로이 코이비토 파크를 더한 일정입니다",
    fits: "상품에 따라 반나절 또는 하루 종일",
    note: "야외뿐인 축제 여행에 하루의 중간을 실내로 채워 주는 가장 좋은 답입니다",
  },
  {
    tour: "원더랜드 삿포로 스노 파크 반나절",
    adds: "호텔 픽업과 징기스칸 바비큐가 포함된 시외 스노 파크",
    fits: "반나절",
    note: "스키 장비가 없는 여행자를 위한 상품으로, 축제 여행자 대부분이 여기에 해당합니다",
  },
  {
    tour: "노보리베쓰, 도야호, 오타루 당일 여행",
    adds: "온천 계곡, 칼데라호, 운하 마을을 하루에 도는 남서쪽 파노라마 코스",
    fits: "하루 종일 걸리는 긴 일정으로, 하루 여유가 있을 때 맞습니다",
    note: "4일 이상 여행이라면 할 만합니다. 3일 여행이면 되돌릴 수 없는 축제 저녁을 하나 잃습니다",
  },
];

const transportRows = [
  {
    leg: "신치토세 공항 → 삿포로, 쾌속 에어포트",
    time: "특별쾌속 최단 33분, 쾌속 37분",
    fare: `성인 ${AIRPORT_FARE}. uシート 지정석은 ¥1,000 추가, 티켓리스는 ¥800`,
    note: `JR 홋카이도는 낮 시간대에 시간당 6편(특별쾌속 1, 쾌속 3, 구간쾌속 2)을 운행합니다. 확인일 ${OWN}.`,
  },
  {
    leg: "신치토세 공항 → 삿포로, 예약 차량",
    time: "도로 이동이라 2월에는 날씨의 영향을 받습니다",
    fare: "차량과 날짜별. 클룩이 자동 가격 조회를 막고 있어 페이지에서 확인하세요",
    note: "클룩의 신치토세 공항 이동 페이지로, 조건이 차량별로 정해져 있어 출국 전에 예약해야 합니다.",
  },
  {
    leg: "삿포로역 → 오도리",
    time: "지하철 한 정거장 또는 도보 약 10분, 대부분 지하로 이동",
    fare: `1구간 성인 ${SUBWAY_FARE}, 어린이 ¥110`,
    note: `두 역 사이의 지하 보행 공간 덕분에 2월에도 삿포로역 숙소가 편리합니다. 요금 확인일 ${OWN}.`,
  },
  {
    leg: "오도리 → 스스키노",
    time: "난보쿠선 한 정거장 또는 몇 블록 도보",
    fare: `성인 ${SUBWAY_FARE}`,
    note: "두 회장이 가까워 대부분 걸어갑니다. 스스키노 조명은 오도리보다 1시간 더 늦게까지 켜집니다.",
  },
  {
    leg: "삿포로 → 쓰도무 회장",
    time: "도호선으로 에이와마치까지 간 뒤 셔틀버스",
    fare: `2026년 셔틀은 성인 편도 ${SHUTTLE_FARE}, 현금만 가능. 초등학생 이하, 65세 이상, 장애인은 무료였습니다`,
    note: "위원회 공지에 따른 2026년 운영이며, 2027년 셔틀은 미발표입니다. 지하철 환승 할인은 없었고 회장은 16:00에 닫습니다.",
  },
  {
    leg: "지하철 1일권",
    time: "달력 기준 1일",
    fare: `평일 성인 ${SUBWAY_DAY_PASS}, 어린이 ¥420. 주말·공휴일과 12월 29일~1월 3일은 ${DONICHIKA}, ¥260`,
    note: `삿포로시 교통국 공식 요금, 확인일 ${OWN}. 1구간 ${SUBWAY_FARE} 기준 주말권은 3회, 평일권은 4회부터 이득입니다.`,
  },
];

const bookingWindow = [
  {
    title: "2027년 2월 여행이라면 지금 바로: 숙소",
    desc: "날짜는 위원회가 제76회 축제를 마감하는 공지에서 발표한 2026년 2월 11일부터 공개되어 있습니다. 한 도시의 8일 밤이 1년 전에 정해져 있으니 누구나 일찍 예약합니다. 객실 점유율 수치는 공개된 것이 없어 싣지 않지만, 축제 여행에서 대안이 없는 것은 이 부분뿐입니다.",
  },
  {
    title: "출국 전: 공항 구간과 홋카이도 패스",
    desc: "전철은 ¥1,230이고 예약이 필요 없습니다. 출국 전에 예약할 것은 도로 이동입니다. 철도 패스는 오타루, 아사히카와, 노보리베쓰로 나갈 때만 이득이며, 먼저 4일권 삿포로–후라노 에어리어 패스 ¥11,000을 개별 요금과 비교해 보세요.",
  },
  {
    title: "12월 31일까지: 계절 한정 당일 여행",
    desc: "시코쓰호 얼음 축제 반나절 투어와 스노 파크는 계절 상품이고, 아사히야마 동물원 일정은 펭귄 시즌에 달려 있습니다. 축제와 같은 주에 운영되므로 도착 전에 하나 잡아 두고, 변경할 수 있을 때 취소 조건을 확인하세요.",
  },
  {
    title: "예약할 것 없음: 축제 자체",
    desc: "위원회 FAQ에 따르면 세 회장 모두 무료입니다. 오도리와 스스키노는 언제든 걸어 들어갈 수 있는 공원과 거리이고, 쓰도무는 입장 무료에 내부 일부 체험만 유료입니다. 티켓도 시간 지정도 예약할 것도 없습니다.",
  },
];

const faqItems = [
  {
    q: "2027년 삿포로 눈축제는 언제인가요?",
    a: `2027년 2월 4일부터 11일까지 8일간입니다. 위원회 공식 공지에 「2027年2月4日（木）から11日（木・祝）の8日間」이라고 적혀 있어 추정이 아닌 확정 날짜이며 세 회장 모두 해당합니다. 연계 행사 さっぽろスノースポーツパーク2027이 2027년 2월 12~14일에 이어집니다. 쓰도무 회장은 조명 시간이 아니라 10:00~16:00의 폐장 시간이 있는 유일한 회장입니다. 확인일 ${OWN}. 위원회는 매회 폐막 공지에서 다음 해 날짜를 발표하며, 2027년 날짜는 2026년 2월 11일에 나왔습니다. 2028년을 찾는다면 그 공지를 먼저 보세요.`,
  },
  {
    q: "삿포로 눈축제는 무료인가요?",
    a: `네. 위원회 FAQ의 답은 「全会場無料です」(전 회장 무료)이고 티켓이 필요한 부분은 없습니다. ${OWN}에 확인한 실제 내용은 이렇습니다. 오도리 회장은 공원으로 8일 동안 언제든 볼 수 있고 조각 조명은 22:00까지입니다. 스스키노 회장은 거리로 언제든 볼 수 있고 조명은 23:00까지, 마지막 날은 22:00까지입니다. 쓰도무 회장은 입장 무료에 10:00~16:00 운영이며, 일부 체험은 별도 요금이고 혼잡하면 접수가 일찍 끝날 수 있습니다. 축제 여행의 비용은 축제가 아니라 숙소, 항공, 당일 여행에 들어갑니다.`,
  },
  {
    q: "삿포로 눈축제에 투어가 필요한가요?",
    a: `아니요. 눈축제 투어라고 파는 상품이 있다면 의심해 보세요. 세 회장 모두 무료이고 그냥 들어갈 수 있으며, 오도리와 스스키노는 몇 블록 거리의 공원과 거리, 쓰도무는 지하철과 짧은 셔틀입니다. 건너뛸 줄도 맡아 둘 티켓도 없습니다. 이 여행에서 투어가 실제로 유용한 것은 하루의 나머지 절반입니다. 회장은 모두 야외이고 2월 평균 일 최고기온은 ${FEB_MAX}이므로, 대부분은 낮에 실내나 시외로 갔다가 저녁에 조명이 켜진 오도리를 보고 싶어 합니다. 이 페이지의 상품이 바로 그것입니다. 오타루 운하, 아사히야마 동물원 겨울 일정, 시코쓰호 얼음 축제 저녁, 조잔케이 온천 반나절, 스노 파크입니다. 눈축제 투어는 하나도 없습니다. 존재하지도 않고 필요하지도 않기 때문입니다.`,
  },
  {
    q: "눈축제 때 어디에 묵어야 하나요?",
    a: `삿포로역이나 스스키노입니다. 차이는 저녁의 어느 쪽을 중시하느냐입니다. 삿포로역은 오도리에서 지하철 한 정거장이고 대부분 지하로 걸을 수 있어, 2월 평균 일 최고기온이 ${FEB_MAX}일 때 어떤 전망보다 중요합니다. 신치토세에서 오는 쾌속 에어포트도 이곳에 내려 줍니다. 스스키노는 숙소 앞 거리가 바로 얼음 조각 회장입니다. 회장은 미나미 4조~6조의 에키마에도리를 따라 23:00까지 조명이 켜져 있어, 늦은 시간도 막차 없이 걸어서 돌아옵니다. 삿포로가 만실이면 오타루가 현실적인 대안입니다. JR 홋카이도 기준 쾌속 에어포트로 33~41분, ¥800이며 같은 시기에 눈빛 거리 축제도 열립니다. 어디든 날짜가 2026년 2월부터 공개되어 있으니 가장 먼저 정해야 할 예약입니다.`,
  },
  {
    q: "2월 삿포로는 얼마나 춥고 무엇을 입어야 하나요?",
    a: `짐을 바꿔야 할 만큼 춥지만 탐험 수준은 아닙니다. 일본 기상청 1991~2020년 삿포로 평년값으로 2월 평균 기온은 ${FEB_MEAN}, 일 최고 평균 ${FEB_MAX}, 일 최저 평균 ${FEB_MIN}, 월 강설량은 ${FEB_SNOW}입니다. 확인일 ${JMA_CHECKED}. 세 가지가 따라옵니다. 일 최고기온이 영도 안팎이라 눈 조각이 녹지 않고 바닥도 젖지 않습니다. 대신 단단하게 다져져 미끄러우므로 접지력 있는 신발이 가장 중요합니다. 건물, 상점, 열차, 지하 통로는 난방이 강하므로 두꺼운 코트 하나보다 벗을 수 있는 겹옷이 낫습니다. 조각은 해가 진 뒤가 가장 좋은데 이때 기온은 평균이 아니라 최저에 가깝습니다. 오도리의 저녁 시간이 여행에서 가장 추운 시간이며, 장갑, 모자, 얼굴을 가릴 것은 필수입니다.`,
  },
  {
    q: "신치토세 공항에서 삿포로까지 어떻게 가나요?",
    a: `쾌속 에어포트로 33~37분, ${AIRPORT_FARE}입니다. ${OWN}에 확인한 JR 홋카이도 수치로 특별쾌속 최단 33분, 쾌속 37분이며, 낮 시간대에 시간당 6편(특별쾌속 1, 쾌속 3, 구간쾌속 2)입니다. 4호차는 uシート 지정석으로 요금에 ¥1,000 추가, 티켓리스 예약은 ¥800이며, 2월에는 일반 차량이 스키 가방으로 차기 때문에 값어치가 있습니다. 대안은 예약 차량으로, 눈 속의 역이 아니라 호텔 앞까지 간다는 장점이 있습니다. 출국 전에 예약하며 조건은 클룩 페이지에 차량별로 나와 있습니다.`,
  },
  {
    q: "세 회장 사이는 어떻게 이동하나요?",
    a: `오도리와 스스키노는 도보, 쓰도무는 지하철과 셔틀입니다. 오도리와 스스키노는 같은 거리의 몇 블록 차이이고 날씨가 나쁘면 난보쿠선 한 정거장입니다. 삿포로역은 반대 방향으로 한 정거장이며 대부분 지하 통로로 이어집니다. 지하철 1구간은 성인 ${SUBWAY_FARE}, 어린이 ¥110입니다. 쓰도무만 다릅니다. 도호선으로 에이와마치까지 가서 셔틀버스를 타며, 2026년에는 성인 편도 ${SHUTTLE_FARE}, 현금만 가능, 초등학생 이하, 65세 이상, 장애인은 무료였고 지하철 환승 할인은 없었습니다. 2027년 셔틀은 미발표입니다. 하루 3회 이상 지하철을 타면 교통국 1일권이 평일 ${SUBWAY_DAY_PASS}, 주말·공휴일 ${DONICHIKA}입니다. 2026년 공지인 셔틀을 제외한 모든 요금의 확인일은 ${OWN}입니다.`,
  },
  {
    q: "삿포로 눈축제에는 며칠이 필요한가요?",
    a: `최소 3박, 4박이면 더 좋습니다. 축제 자체는 반나절 두 번입니다. 낮에 오도리에서 조각의 세부를 보고, 저녁에 오도리와 스스키노에서 조명을 봅니다. 같은 조각이라도 전혀 다르게 보입니다. 쓰도무는 세 번째 반나절이며 16:00에 닫고 가장 멀어서 아이가 있을 때만 갈 만합니다. 나머지 날은 이 시기에만 판매되는 일정에 쓰세요. 오타루 운하, 아사히야마 동물원 겨울 출발, 시코쓰호 얼음 축제 저녁, 조잔케이 온천 오후입니다. 2박도 가능하지만 하루는 공항 이동에 쓰게 되고, 5박이면 조명 저녁을 포기하지 않고 노보리베쓰나 도야호를 더할 수 있습니다.`,
  },
  {
    q: "눈축제는 아이와 가기 좋은가요?",
    a: `쓰도무 회장이 아이들을 위한 곳이며 규칙이 있는 회장이기도 합니다. 입장 무료, 10:00~16:00 운영이고 눈 미끄럼틀과 스노 래프팅이 핵심입니다. 다만 일부 체험은 유료이고 위원회 FAQ는 혼잡하면 접수가 16:00 전에 마감될 수 있다고 경고하므로 오후보다 오전에 가세요. 오도리와 스스키노는 무료이고 언제든 볼 수 있어 아이와 다니기 괜찮지만, 가장 좋은 시간은 해가 진 뒤의 가장 추운 때입니다. 비용 참고: 2026년 쓰도무 셔틀은 초등학생 이하 무료였고, 어린이 지하철 1일권은 평일 ¥420, 주말 ¥260이며 1구간은 ¥110입니다.`,
  },
  {
    q: "축제 여행에 JR 홋카이도 레일 패스가 이득인가요?",
    a: `삿포로를 벗어날 때만 그렇습니다. 공항 구간은 JR 홋카이도 기준 편도 ${AIRPORT_FARE}, 왕복 약 ¥2,460으로 패스에 한참 못 미칩니다. 오타루, 아사히카와, 노보리베쓰도 버스 투어가 아니라 직접 다닐 때 패스가 이득이 되기 시작합니다. 시내에 머물며 가이드 투어를 이틀 예약하는 여행이라면 전혀 필요 없습니다. 가이드 투어에는 교통이 포함되어 있고, 시내에서는 교통국의 평일 ${SUBWAY_DAY_PASS}, 주말 ${DONICHIKA} 지하철 1일권이면 충분합니다. 사기 전에 내 구간으로 계산해 보세요. JR 패스 가이드가 전국 패스에 쓰는 방법과 같습니다.`,
  },
  {
    q: "축제 주간에 홋카이도에서 또 무엇이 열리나요?",
    a: `날짜가 공개된 세 가지가 있습니다. 위원회 공지에 따르면 さっぽろスノースポーツパーク2027이 축제 직후인 2027년 2월 12~14일 다이와하우스 프리미스트 돔에서 열립니다. 축제 후반에 도착하면 둘 다 볼 수 있습니다. 시코쓰호 얼음 축제는 주최 측 사이트 기준 2027년 1월 30일~2월 23일, 10:00~20:00 운영, 16:30부터 조명이며, 중학생 이상 평일 ¥1,000, 주말·공휴일 ¥3,000, 그 아래는 무료입니다. 공휴일인 2월 11일(목)은 ¥3,000입니다. 주최 측은 날씨에 따라 날짜가 바뀔 수 있다고 밝힙니다. 세 번째는 오타루 관광협회 페이지 기준 2027년 2월 6~13일의 오타루 눈빛 거리 축제로, 같은 33~41분 서쪽입니다. 시간과 장소는 공식 발표 대기 중입니다. 모두 ${SEASON}에 확인했습니다.`,
  },
];

const festivalSameTrip: KlookTripPrepItem[] = [
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩에서 eSIM 보기 →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "야외 회장 세 곳, 2027년 시간표가 아직 없는 쓰도무 셔틀, 일 최고기온 평균 0.4°C의 한 달입니다. 회장 공지와 날씨 변화는 모두 창구가 아니라 휴대폰으로 받게 됩니다.",
  },
  {
    label: "신치토세 공항 이동(전용차·합승)",
    ctaLabel: "신치토세 이동 보기 →",
    url: klookFor(newChitoseAirportTransfers.url, LOCALE),
    why: "2월에 짐이 있을 때 쾌속 에어포트 대신 쓸 수 있습니다. 눈 속의 역이 아니라 호텔 앞까지 가므로 늦은 도착이나 스스키노 호텔일 때 특히 유용합니다.",
  },
  {
    label: "홋카이도 삿포로–후라노 에어리어 패스(4일)",
    ctaLabel: "에어리어 패스 보기 →",
    url: klookFor(sapporoFuranoAreaPass.url, LOCALE),
    why: "열차로 시외에 나갈 때만 필요합니다. JR 홋카이도 기준 사전 구매 ¥11,000이고 신치토세, 오타루, 아사히카와를 포함하며, 공항 왕복만은 ¥2,460입니다. 삿포로에 머물며 가이드 투어를 예약한다면 필요 없습니다.",
  },
  {
    label: "삿포로역 주변 호텔",
    ctaLabel: "클룩에서 삿포로 호텔 보기 →",
    url: klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE),
    why: "날짜가 2026년 2월 11일부터 공개되어 있어 이 8일의 객실은 가장 먼저 정해야 할 예약이며, 이 페이지에서 가격을 적을 수 없는 항목입니다.",
  },
];

const TITLE = "삿포로 눈축제(2027): 2월 4~11일, 무료 회장";
const DESC =
  "삿포로 눈축제 투어와 준비: 제77회 축제는 2027년 2월 4~11일, 세 회장 모두 무료입니다. 예약할 것은 숙소와 주변 당일 여행입니다.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function SapporoSnowFestivalToursPage({ updated }: { updated: PageUpdated }) {
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
삿포로 눈축제 투어(2027):<br />날짜, 무료 회장, 예약할 것
</h1>
          <p className={styles.heroSubtitle}>
8일, 세 회장, 티켓 없음. 예약할 만한 투어는 축제 주변의 날이고, 대안이 없는 것은 숙소뿐입니다.
</p>
          <div className={styles.heroBadges}>
            {[`업데이트 ${monthLabel(updated.iso, LOCALE)}`, "위원회 발표 2027년 날짜", "세 회장 모두 무료", "요금과 시간, 확인일 표기"].map((t) => (
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
          heading={"2027년 2월 삿포로 눈축제 때 어떤 투어를 예약할까요?"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
숙소를 지금 예약하세요. 축제 8일은 2026년 2월 11일부터 정해져 있고, 이 여행에서 대안이 없는 유일한 부분입니다. 당일 투어는 12월 31일까지 잡아 두세요. 취소 조건을 확인하고 마음을 바꿀 수 있는 시기입니다.
</>
          }
          tours={[
            {
              title: "오타루, 시로이 코이비토 파크, 스노 파크 당일 투어",
              url: klookFor(otaruSnowParkDayTour.url, LOCALE),
              price: "약 US$65–76",
              duration: "하루 종일",
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
              title: "시코쓰호 얼음 축제와 토마무 아이스 빌리지 당일 투어",
              url: klookFor(lakeShikotsuTomamuIceVillageDayTour.url, LOCALE),
              price: "약 US$103부터",
              duration: "10시간",
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
언제
</p>
                <p className={styles.verdictStatValue}>
2027년 2월 4~11일, 8일간
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
어디서
</p>
                <p className={styles.verdictStatValue}>
오도리, 스스키노, 쓰도무
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
입장
</p>
                <p className={styles.verdictStatValue}>
세 회장 모두 무료
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
투어가 필요한가요?
</p>
                <p className={styles.verdictStatValue}>
아니요. 숙소와 당일 여행을 예약하세요
</p>
              </div>
            </div>
                        <p className={styles.verdictText}>
<strong>삿포로 눈축제 투어</strong>를 찾고 있다면 먼저 알아 둘 점은 투어가 필요 없다는 것입니다. <strong>제77회 삿포로 눈축제는 2027년 2월 4일부터 11일까지</strong> 8일간 세 회장에서 열립니다. <strong>오도리 공원 니시 1초메~11초메</strong>, <strong>스스키노 에키마에도리 미나미 4조~6조</strong>, 그리고 <strong>쓰도무</strong> 시 스포츠 시설이며, 위원회 FAQ에 따르면 모두 <strong>무료</strong>입니다. 오도리는 언제든 볼 수 있고 조각 조명은 <strong>22:00</strong>까지, 스스키노는 <strong>23:00</strong>까지(마지막 날 22:00), 쓰도무는 <strong>10:00–16:00</strong>이며 내부 일부 체험은 유료입니다. 티켓도 시간 지정도 건너뛸 줄도 없습니다. 예약할 만한 것은 축제 주변의 일주일입니다. 대안이 없는 숙소, 그리고 이 시기에만 운영되는 시외 당일 여행인 오타루, 아사히야마 동물원, 시코쓰호 얼음 축제, 조잔케이 온천입니다. 2월 삿포로의 일 최고기온 평균은 <strong>{FEB_MAX}</strong>이므로 축제 날에는 하루의 중간을 실내로 잡아야 합니다. 축제 정보 확인일 {OWN}, 기온 평년값 확인일 {JMA_CHECKED}.
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
해당 날짜의 삿포로 호텔 보기 →
</KlookLink>
              <KlookLink href={klookFor(otaruSnowParkDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
오타루 당일 여행 →
</KlookLink>
            </div>
          </div>
        </div>

                <KlookTripPrep
          label={"같은 여행에서 예약할 것"}
          heading={"축제 여행에서 출국 전에 예약할 것"}
          intro={"축제 8일 외에 네 가지를 예약합니다. 데이터, 플랫폼이 아니라 차량으로 가는 공항 구간, 내 경로로 계산해 볼 철도 패스, 그리고 1년 전에 날짜가 정해져 대안이 없는 숙소입니다."}
          items={festivalSameTrip}
        />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
날짜와 회장
</span>
          <h2 className={styles.sectionTitle}>
2027년 삿포로 눈축제는 언제, 어디서 열리나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
위원회 공지에 따르면 <strong>2027년 2월 4일부터 11일까지</strong> 8일간입니다(「2027年2月4日（木）から11日（木・祝）の8日間」). 과거 사례로 추정한 날짜가 아니라 확정 날짜이며, 같은 공지에 세 회장과 범위가 나와 있습니다. 연계 행사 삿포로 스노 스포츠 파크가 <strong>2027년 2월 12~14일</strong> 다이와하우스 프리미스트 돔에서 이어집니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["회장", "정확한 위치", "시간", "입장", "볼거리"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {siteRows.map((row) => (
                    <tr key={row.site}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.site}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
날짜와 회장 범위는 삿포로 눈축제 실행위원회의 제77회 공지, 시간과 입장 정보는 위원회 FAQ(「全会場無料です」) 기준입니다. 둘 다 {OWN}에 처음 확인하고 {SEASON}에 변동 없음을 다시 확인했습니다. 위원회는 2027년 정보가 확정되는 대로 갱신한다고 밝히므로 가까워지면 회장 범위를 다시 확인하세요. 스스키노 회장의 남쪽 끝은 2026년 미나미 7조에서 2027년 미나미 6조로 바뀌었습니다.
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
무료인가요?
</span>
          <h2 className={styles.sectionTitle}>
삿포로 눈축제는 무료인가요? 투어가 필요한가요?
</h2>
          <p className={styles.bodyText}>
무료이고, 투어는 필요 없습니다. 위원회 FAQ는 요금 질문에 한 줄로 답합니다. <strong>「全会場無料です」</strong>, 전 회장 무료이며 티켓이 필요한 부분은 없습니다. 오도리 회장은 8일 동안 언제든 들어갈 수 있는 공원이고, 스스키노 회장은 공공 도로입니다. 쓰도무 회장은 입장 무료이며 일부 체험은 별도 요금이고, 위원회 안내에 따르면 혼잡하면 접수가 16:00 전에 끝날 수 있습니다. 확인일 {OWN}.
</p>
          <p className={styles.bodyText}>
그래서 이 사이트의 행사 중에서도 특이합니다. 건너뛸 줄도 시간 지정 입장도 없으니 ‘줄 서지 않고 입장’ 상품도 성립하지 않습니다. 눈축제 자체를 파는 클룩 상품은 찾지 못했고, 있어서도 안 됩니다. 축제 여행에서 예약으로 얻는 것은 <strong>하루의 나머지 절반</strong>입니다. 회장은 모두 야외이고 기상청 평년값으로 일 최고기온 평균이 <strong>{FEB_MAX}</strong>이며 조각은 해가 진 뒤가 가장 좋습니다. 좋은 축제 날은 오전에 시외나 오후에 실내로 다녀온 뒤 저녁에 오도리와 스스키노의 조명을 보는 것입니다. 아래 상품이 바로 그 앞부분입니다.
</p>
          <p className={styles.bodyText}>
위치 때문에 언급할 티켓이 하나 있습니다. <strong>삿포로 TV 타워</strong> 전망대는 오도리 회장 11블록이 시작되는 니시 1초메에 있어, 조명이 켜진 회장 전체를 일직선으로 볼 수 있는 유일한 유료 시설입니다. <KlookLink href={klookFor(sapporoTvTowerMoiwaSetTicket.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>TV 타워와 모이와산 세트권 보기 →</KlookLink>
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
투어
</span>
          <h2 className={styles.sectionTitle}>
축제 주간에 예약할 만한 투어는?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
이 시기에만 판매되는 상품과, 야외 일정의 중간을 실내로 채워 주는 상품입니다. 아래 상품은 모두 {SEASON}에 클룩 검색 색인으로 다시 확인했습니다. 눈축제 투어는 하나도 없으며, 각 행마다 실제로 더해지는 것과 어울리는 일정을 적었습니다. 클룩이 상품 페이지의 자동 조회에 오류로 응답하므로 표에는 가격을 싣지 않습니다. 이 페이지 맨 위의 시작 가격은 색인에 표시된 값이며, 날짜별 가격은 상품 페이지에서 확인하세요.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["상품", "더해지는 것", "일정 형태", "알아 둘 점"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.adds}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fits}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
<strong>고르는 법.</strong> 3박이라면 하루 종일 일정 하나와 반나절 하나를 넣고, 저녁 이틀은 조명이 켜진 오도리와 스스키노에 남겨 두세요. 낮의 조각 세부와 밤의 조명은 같은 조각의 다른 경험이고, 하나를 놓치면 대부분 후회합니다. 4박 이상이면 긴 노보리베쓰·도야호 일정도 할 만합니다. 아이와 함께라면 오전에 쓰도무, 오후에 스노 파크가 맞습니다. 무엇을 예약하든 취소 조건을 확인하세요. 2월 홋카이도 출발이고, 눈 오는 날 가장 먼저 사라지는 것이 버스 투어입니다.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(otaruSnowParkDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
오타루와 스노 파크 →
</KlookLink>
            <KlookLink href={klookFor(asahiyamaBieiHighlightsTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
아사히야마 동물원 →
</KlookLink>
            <KlookLink href={klookFor(lakeShikotsuIceFestivalHalfDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
시코쓰호 얼음 축제 →
</KlookLink>
            <KlookLink href={klookFor(jozankeiHotSpringBusTrip.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
조잔케이 온천 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
숙소
</span>
          <h2 className={styles.sectionTitle}>
눈축제 때 어디에 묵어야 하나요?
</h2>
          <p className={styles.bodyText}>
<strong>삿포로역이나 스스키노</strong>입니다. 선택 기준은 저녁의 어느 쪽이 중요한가입니다. 삿포로역은 오도리에서 지하철 한 정거장이고 대부분 지하로 걸을 수 있으며 신치토세발 쾌속 에어포트가 내리는 곳입니다. 일 최고기온 평균 {FEB_MAX}의 야외 8일 동안 회장 사이에 실내로 돌아올 수 있는 것은 전망보다 가치가 있습니다. <strong>스스키노</strong>는 숙소 앞 거리가 얼음 조각 회장이고 23:00까지 조명이 켜져 있어 늦은 시간도 걸어서 돌아옵니다. JR 하코다테 본선 쾌속 에어포트로 서쪽 33~41분 거리의 <strong>오타루</strong>는 삿포로가 만실일 때의 대안이며 같은 시기에 눈빛 거리 축제가 열립니다.
</p>
          <p className={styles.bodyText}>
시기에 대해서는 확인된 것과 아닌 것을 분명히 하겠습니다. <strong>날짜는 2026년 2월 11일부터 공개</strong>되어 있습니다. 위원회가 제76회를 마감하는 공지에서 2027년 일정을 발표했으니, 한 도시의 8일 밤이 8개월 전부터 알려져 있는 셈이고 일찍 예약해야 할 가장 강한 근거입니다. 객실 점유율이나 매진 수치는 공개된 것이 없어 싣지 않습니다. 지어낼 생각도 없습니다. 숙소는 대안이 없는 예약으로, 나머지는 유연하게 생각하세요.
</p>
        </section>

        <KlookStayAreas
          heading={"위 세 거점의 호텔 검색"}
          intro={"남은 객실과 가격은 날짜별로 다르므로 각 거점에서 클룩 호텔 검색으로 연결했습니다. 축제 기간에 비교할 것은 1박 요금보다 난방된 건물까지의 거리이며, 각 항목의 설명이 그 내용입니다."}
          areas={sapporoSnowFestivalStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "오도리까지 지하철 한 정거장 또는 지붕 있는 길로 걸을 수 있고 신치토세발 쾌속 에어포트가 내리는 곳입니다. 2월의 8일 동안은 회장 사이에 실내로 돌아올 수 있어 어떤 전망보다 중요합니다.", area: "삿포로역" }, { why: "숙소 앞 거리가 얼음 조각 회장입니다. 스스키노 회장은 미나미 4조~6조의 에키마에도리를 따라 23:00까지 조명이 켜져 있어 늦은 시간도 막차 없이 걸어서 돌아옵니다.", area: "스스키노" }, { why: "삿포로가 만실일 때의 대안이자 그 자체로 여행지입니다. 오타루는 JR 하코다테 본선 쾌속 에어포트로 33~41분이며 같은 2월에 눈빛 거리 축제가 열립니다.", area: "오타루역" }] as Partial<typeof item>[])[i]))}
        />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
날씨와 옷차림
</span>
          <h2 className={styles.sectionTitle}>
2월 삿포로는 얼마나 춥고 무엇을 입어야 하나요?
</h2>
          <p className={styles.bodyText}>
일본 기상청 1991~2020년 삿포로 평년값으로 2월 평균 기온은 <strong>{FEB_MEAN}</strong>, <strong>일 최고 평균 {FEB_MAX}</strong>, <strong>일 최저 평균 {FEB_MIN}</strong>, 월 강설량은 <strong>{FEB_SNOW}</strong>입니다. 확인일 {JMA_CHECKED}.
</p>
          <p className={styles.bodyText}>
이 수치에서 나오는 실질적인 결론 세 가지입니다. 첫째, 일 최고기온이 영도 안팎이면 발밑의 눈은 젖어 있지 않고 단단하게 다져져 미끄럽습니다. 방수보다 접지력이 중요하며 가장 먼저 챙길 점입니다. 둘째, 삿포로의 건물, 열차, 지하 통로는 난방이 강해 두꺼운 코트 하나보다 벗을 수 있는 겹옷이 낫습니다. 삿포로역과 오도리 사이의 지하 통로가 바로 이런 이유로 있으며 축제 저녁 계획의 일부입니다. 셋째, 조각은 해가 진 뒤가 가장 좋은데 이때 기온은 평균이 아니라 최저에 가깝습니다. 밖에 있고 싶은 시간이 하루 중 가장 추운 시간이며 장갑, 모자, 얼굴 가리개는 선택이 아닙니다. <Link href="/guides/attractions/japan-winter-itinerary" hrefLang="en">일본 겨울 여행 일정(영어)</Link>에 도쿄, 교토, 오사카와 삿포로의 기상청 평년값을 나란히 실어 두었습니다. 홋카이도에 다른 옷이 필요한 이유를 알 수 있습니다.
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
가는 방법
</span>
          <h2 className={styles.sectionTitle}>
신치토세 공항에서 삿포로까지 어떻게 가나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>쾌속 에어포트로 33~37분, {AIRPORT_FARE}</strong>입니다. JR 홋카이도 수치이고 거의 모든 도착에 맞는 답입니다. 아래 표는 지정석 요금, 각 회장으로 가는 방법, 지하철 1일권 두 종류를 운영사 공식 요금과 함께 정리했습니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["구간", "시간", "요금", "비고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transportRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
직접 정해야 할 것이 두 가지 있습니다. 4호차 <strong>uシート 지정석</strong>은 요금에 ¥1,000 추가, 티켓리스 예약은 ¥800이며, 2월에는 일반 차량이 스키 가방으로 차기 때문에 값어치가 있습니다. <strong>JR 홋카이도 레일 패스</strong>는 시외로 나갈 때만 이득입니다. 공항 왕복은 약 ¥2,460이므로 패스는 공항이 아니라 오타루, 아사히카와, 노보리베쓰에 대한 판단입니다. 내 구간으로 계산해 보세요. 요금 확인일 {OWN}. <Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR 패스 가이드(영어)</Link>도 전국 패스에 같은 방법을 씁니다.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
신치토세 이동 →
</KlookLink>
            <KlookLink href={klookFor(jrHokkaidoRailPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
JR 홋카이도 레일 패스 →
</KlookLink>
            <KlookLink href={klookFor(lakeShikotsuIceFestivalShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
시코쓰호 셔틀 좌석 →
</KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
도착일에 예약할 것이 하나 더 있습니다. 데이터입니다. 야외 회장 세 곳, 2027년 시간표가 없는 셔틀, 당일 계획을 바꾸는 2월 날씨까지, 관련 공지는 모두 창구가 아니라 휴대폰으로 옵니다. <KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>클룩 eSIM 보기 →</KlookLink> <Link href="/ko/guides/esim/best-esim-japan">일본 eSIM 추천 가이드</Link>에서 다른 선택지와 비교할 수 있습니다.
</p>
        </section>

                <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>
예약 시기
</span>
          <h2 className={styles.sectionTitle}>
실제로 무엇을, 언제 예약해야 하나요?
</h2>
          <p className={styles.bodyText}>
네 가지를 이 순서로 정리합니다. 축제는 그중에 없습니다. 얼마나 미리 정해야 하는지 순서입니다.
</p>
          <div className={styles.whoForGrid}>
            {bookingWindow.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
이 여행에서는 취소 조건이 특히 중요합니다. 2월 홋카이도에서는 눈이 와도 축제는 닫지 않습니다. 회장은 야외이고 무료이며 조각은 그대로입니다. 하지만 시외 도로가 막히고 항공편이 묶일 수 있습니다. 버스 투어를 예약할 때 취소 조건을 확인하고, 마지막 날 아침에 출국한다면 신치토세 첫 편은 피하세요.
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
겨울 여행의 나머지
</span>
          <h2 className={styles.sectionTitle}>
눈축제와 무엇을 묶으면 좋을까요?
</h2>
          <p className={styles.bodyText}>
먼저 홋카이도 안에서 찾아보세요. <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">삿포로 출발 오타루 당일 여행(영어)</Link>은 눈빛 거리 축제가 눈축제 대부분과 겹쳐 쉽게 더할 수 있습니다. 일주일이 있다면 <Link href="/guides/attractions/hokkaido-7-day-itinerary" hrefLang="en">홋카이도 7일 여행(영어)</Link>이 아사히카와와 후라노까지 가는 경로 안에 축제를 넣어 줍니다. 오도리의 세 번째 저녁보다 스키가 중요하다면 <Link href="/guides/attractions/niseko-ski-tours" hrefLang="en">니세코 스키 투어 가이드(영어)</Link>에서 삿포로 출발 가이드 일정을 보세요.
</p>
          <p className={styles.bodyText}>
도쿄로 들어온다면 혼슈의 겨울을 한 곳 더 넣을 만합니다. <Link href="/ko/guides/attractions/jigokudani-snow-monkey-tour">지고쿠다니 원숭이 공원 투어</Link>와 <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">다카야마와 시라카와고 투어(영어)</Link>는 북쪽으로 비행하지 않고도 깊은 눈을 볼 수 있고, 스키를 하루만 타고 싶다면 <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">도쿄 출발 갈라 유자와 스키(영어)</Link>가 더 짧은 답입니다. 홋카이도 앞뒤의 저녁에는 <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">도쿄 일루미네이션(영어)</Link> 가이드에서 2월에도 하는 곳을 확인하세요.
</p>
        </section>

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"이 시기에만 운영되는 당일 여행"}
          intro={"축제 날 오도리에서 보내지 않는 절반을 위한 삿포로 출발 상품 네 가지입니다. 겨울 경로는 여름과 다르므로 당일 아침이 아니라 도착 전에 열어 보세요."}
          tours={[withKlookLocale(otaruSnowParkDayTour, LOCALE, { title: "오타루, 시로이 코이비토 파크, 스노 파크 당일 투어", desc: "오타루 운하와 증기 시계, 시로이 코이비토 파크, 눈놀이를 묶은 홋카이도 당일 여행" }), withKlookLocale(asahiyamaBieiHighlightsTour, LOCALE, { title: "삿포로 출발 아사히야마 동물원, 비에이 청의 호수, 닝글 테라스 당일 투어", desc: "삿포로에서 아사히카와 동물원, 비에이 청의 호수, 닝글 테라스를 도는 당일 버스로, 여러 경로로 판매되며 겨울에는 스노모빌 옵션이 추가 요금으로 있습니다" }), withKlookLocale(sapporoJozankeiBuddhaDayTour, LOCALE, { title: "삿포로, 조잔케이, 부처의 언덕 당일 투어", desc: "조잔케이 계곡, 안도 다다오의 부처의 언덕, 시로이 코이비토 파크, 맥주 박물관을 묶은 가이드 투어로, 축제 회장이 아닌 삿포로의 하루입니다" }), withKlookLocale(noboribetsuToyaOtaruDayTour, LOCALE, { title: "삿포로 출발 노보리베쓰, 도야호, 오타루 당일 투어", desc: "시내 남서쪽을 도는 합류형 당일 투어로, 축제 여행에 하루 여유가 있고 오도리의 네 번째 저녁을 원하지 않을 때 맞습니다" })]}
        />

                <Related items={[{ href: "/guides/transport/hokkaido-rail-pass", title: "홋카이도 레일 패스(2026): 가격과 이득 여부 (영어)" }, { href: "/guides/attractions/niseko-ski-tours", title: "니세코 스키 투어(2027): 셔틀, 강습, 4개 스키장 (영어)" }, { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "홋카이도 7일 여행: 날짜별 일정 (영어)" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "삿포로 출발 오타루 당일 여행(2027): ¥800, JR 33분 (영어)" }, { href: "/guides/attractions/japan-winter-itinerary", title: "일본 겨울 여행 12일 일정(2027): 날짜별 코스 (영어)" }, { href: "/guides/money/japan-ski-travel-insurance", title: "일본 스키 여행자 보험(2027): 무엇을 보장받아야 할까 (영어)" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "도쿄 일루미네이션: 일정, 무료 명소, 예약할 것 (영어)" }, { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "도쿄 출발 갈라 유자와 스키 당일 여행: 71분, 리프트 ¥8,000 (영어)" }, { href: "/ko/guides/attractions/jigokudani-snow-monkey-tour", title: "도쿄 출발 지고쿠다니 원숭이 공원 가이드(2027)" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "다카야마와 시라카와고 투어(2027): 어디서 출발할까 (영어)" }, { href: "/guides/transport/jr-pass-guide", title: "JR 패스 가이드(2026): 가격, 범위, 이득 여부 (영어)" }, { href: "/ko/guides/esim/best-esim-japan", title: "일본 eSIM 추천(2026): 업체, 가격, 선택법" }, { href: "/guides/attractions", title: "일본의 다른 볼거리 → (영어)" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
무료인 8일, 대안 없는 예약 하나
</h2>
            <p className={styles.ctaBannerDesc}>
축제는 돈도 예약도 필요 없습니다. 2027년 2월 4~11일의 숙소는 필요하며, 이 주에만 운영되는 시외 당일 여행도 마찬가지입니다.
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
삿포로 호텔 보기 →
</KlookLink>
              <KlookLink href={klookFor(sapporoSnowParkHalfDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
스노 파크 반나절 보기 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
