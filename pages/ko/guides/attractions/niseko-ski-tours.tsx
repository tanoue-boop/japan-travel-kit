import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  hokkaidoPrivateCarCharterNiseko,
  japanWinterStayAreas,
  jrHokkaidoRailPass,
  klookEsim,
  newChitoseAirportTransfers,
  nisekoHirafuEnglishSkiLesson,
  nisekoHirafuLiftPassBusTour,
  nisekoResortShuttleBus,
  nisekoRusutsuKiroroPrivateLesson,
  nisekoSkiHotSpringTourFromSapporo,
  nisekoSkiSnowboardRental,
  noboribetsuToyaNisekoDayTour,
  rhythmNisekoPrivateSkiLesson,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
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

// Mirrors the English guide (pages/guides/attractions/niseko-ski-tours.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/niseko-ski-tours";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "니세코 스키 투어" }];

const OWN_ISO = "2026-11-01";
const OWN = dateLabel(OWN_ISO, LOCALE);

const SEASON_ISO = "2026-11-06";
const SEASON = dateLabel(SEASON_ISO, LOCALE);

const LESSON_PEAK = "2026년 12월 14일~2027년 1월 3일, 2027년 2월 6~12일";

const AIRPORT_BUS = "2.5시간";
const AIRPORT_BUS_FARE = "¥6,000";
const AIRPORT_TRAIN = "3시간";
const AIRPORT_TRAIN_FARE = "¥6,200";
const SEASON_OPEN = "2026년 11월 28일";
const PEAK_FROM = "2026년 12월 24일";
const PEAK_TO = "2027년 2월 28일";
const PEAK_DAY = "¥13,500";
const REGULAR_DAY = "¥12,600";
const EARLY_DAY = "¥8,800";

const accessRows = [
  {
    option: "신치토세 공항 직행버스",
    time: AIRPORT_BUS,
    cost: AIRPORT_BUS_FARE,
    booking: "예약 필수",
    note: `처음 가는 여행의 기본이자 스키 가방을 실을 수 있는 방법입니다. 니세코 유나이티드 공식 수치입니다. 예약이 필요하므로 출국 전에 정해야 하며, 현장 구매 방식은 없습니다. 확인일 ${OWN}.`,
  },
  {
    option: "전철 + 노선버스",
    time: AIRPORT_TRAIN,
    cost: AIRPORT_TRAIN_FARE,
    booking: "예약 불필요",
    note: "버스보다 30분 느리고 ¥200 비싸지만 예약 없이 갈 수 있는 유일한 방법입니다. 피해야 할 이유는 짐입니다. 겨울 플랫폼에서 스키 가방을 들고 갈아타는 일은 아무도 계획하지 않습니다.",
  },
  {
    option: "계절 스키 버스",
    time: "3~3.5시간",
    cost: AIRPORT_BUS_FARE,
    booking: "예약 필수, 12~3월만 운행",
    note: "직행버스와 요금은 같고 최대 1시간 더 걸립니다. 중간 리조트에 정차하기 때문입니다. 숙소가 노선에 있을 때만 유용합니다.",
  },
  {
    option: "렌터카",
    time: "2시간",
    cost: "하루 ¥8,000부터",
    booking: "예약 필수",
    note: "공개된 수치 중 가장 빠르지만 조건이 있습니다. 홋카이도 겨울 도로이므로 눈길과 빙판 운전 경험이 없다면 2시간은 의미 없는 숫자입니다.",
  },
  {
    option: "전용 차량",
    time: "2시간",
    cost: "¥25,000부터",
    booking: "예약 필수",
    note: "1인당이 아니라 차량당 요금이라 가족이나 4명 이상 일행에게 합리적입니다. 항공편 도착에 맞춰 출발하는 유일한 방법이기도 합니다.",
  },
];

const seasonRows = [
  { what: "4개 지역 모두 개장", detail: `${SEASON_OPEN}` },
  { what: "그랜드 히라후·안누푸리 폐장", detail: "2027년 5월 5일" },
  { what: "하나조노 폐장", detail: "2027년 4월 11일" },
  { what: "니세코 빌리지 폐장", detail: "2027년 4월 4일" },
  { what: "야간 스키", detail: "2026년 12월 12일~2027년 3월 22일" },
  { what: "얼리 시즌", detail: "2026년 11월 28일~12월 11일. 이 기간 패스는 온라인으로 판매되지 않습니다" },
  { what: "레귤러 시즌", detail: "2026년 12월 12~23일, 2027년 3월 1~22일" },
  { what: "피크 시즌", detail: `${PEAK_FROM}~${PEAK_TO}` },
  { what: "스프링 시즌", detail: "2027년 3월 23일~4월 4일" },
  { what: "파이널 시즌", detail: "2027년 4월 5일~5월 5일" },
];

const passRows = [
  { period: "얼리(2026년 11/28~12/11)", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "레귤러(2026년 12/12~23, 2027년 3/1~22)", adult: REGULAR_DAY, youth: "¥10,700", child: "¥7,600", senior: "¥10,700" },
  { period: `피크(${PEAK_FROM}~${PEAK_TO})`, adult: PEAK_DAY, youth: "¥11,500", child: "¥8,100", senior: "¥11,500" },
  { period: "스프링(2027년 3/23~4/4)", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "파이널(2027년 4/5~5/5)", adult: "¥6,300", youth: "¥5,400", child: "¥3,800", senior: "¥5,400" },
];

const areaRows = [
  {
    area: "그랜드 히라후",
    what: "네 곳 중 가장 크고 마을이 붙어 있습니다. 식당, 바, 렌털 숍, 리조트 스키 스쿨이 있습니다",
    stay: "기본 숙소 지역이며, 저녁 외출이 셔틀이 아니라 도보로 가능한 유일한 곳입니다",
    note: "그랜드 히라후 공식 수치: 코스 22개(초급 9, 중급 6, 상급 7), 곤돌라 2기와 체어리프트 7기, 표고차 940 m(정상 1,200 m, 베이스 260 m), 최장 코스 5,300 m.",
  },
  {
    area: "하나조노",
    what: "산에서 가장 조용한 쪽으로, 리조트 직영 니세코 인터내셔널 스노스포츠 스쿨의 거점입니다",
    stay: "가족과 초보자에게 맞습니다. 초급 코스에 사람이 적고 강습이 여기서 시작됩니다",
    note: "강습 규칙도 여기서 적용됩니다. 피크 시즌에는 종일 강습만 사전 예약할 수 있습니다. 크리스마스에 반나절을 계획하기 전에 확인하세요.",
  },
  {
    area: "니세코 빌리지",
    what: "호텔 중심 지역으로, 리프트가 길 건너가 아니라 숙소 바로 앞에 있습니다",
    stay: "스키 인, 스키 아웃의 편리함을 원하고 저녁에 외출하지 않는 여행에 맞습니다",
    note: "네 곳 중 가장 먼저 폐장합니다. 2027년 4월 4일로 그랜드 히라후와 안누푸리보다 한 달 빠릅니다. 늦은 시즌 예약이라면 확인하세요.",
  },
  {
    area: "안누푸리",
    what: "네 곳 중 코스가 가장 넓고 완만하며, 연결 지역의 서쪽 끝에 있습니다",
    stay: "조용한 선택지로, 밤 문화보다 여유로운 공간을 원하는 중급자에게 좋습니다",
    note: "그랜드 히라후와 함께 2027년 5월 5일까지 운영해 봄이나 골든위크 여행에 맞습니다.",
  },
];

const monthRows = [
  {
    month: "12월",
    snow: "최근 완료 시즌 그랜드 히라후 누적 386 cm",
    crowds: "연휴 전에는 리프트가 한산하고 피크 전 숙박 요금",
    verdict: "니세코 유나이티드는 이달을 현지인의 달이라고 부릅니다. 얼리 시즌은 겨울 중 가장 저렴한 ¥8,800이지만 12월 12일 전에는 패스를 온라인으로 팔지 않고, 크리스마스이브부터 피크 요금입니다.",
  },
  {
    month: "1월",
    snow: "누적 620 cm로 그 시즌에서 압도적으로 눈이 많은 달",
    crowds: "붐빕니다. 리조트도 혼잡하다고 표현합니다",
    verdict: `"Japanuary"라고 불리며, 니세코 유나이티드는 "세계에서 강설이 가장 꾸준한 곳 중 하나"라고 소개합니다. 대신 한 달 내내 피크 요금으로 하루 ${PEAK_DAY}입니다.`,
  },
  {
    month: "2월",
    snow: "누적 263 cm, 시즌 최대 정상 적설 400 cm",
    crowds: "붐비며 설 연휴 전후가 가장 혼잡합니다. 인기 식당은 자리가 찹니다",
    verdict: "파우더가 계속되고 눈에 묻힌 마을이 가장 사진 찍기 좋습니다. 2월 28일까지 피크 요금이며, 삿포로 눈축제로 삿포로도 차는 주입니다.",
  },
  {
    month: "3월",
    snow: "누적 75 cm이지만 정상에는 여전히 380 cm",
    crowds: "첫 주 이후 한산해집니다",
    verdict: "가성비의 달이며 리조트도 그렇게 말합니다. 맑은 날이 많고 포근하며, 강습과 렌털에 봄 할인이 있고 \"백컨트리에 가장 좋은 달\"입니다. 3월 22일까지 레귤러 요금, 이후 스프링 요금 ¥8,800입니다.",
  },
  {
    month: "4월~5월 초",
    snow: "리조트 표 기준 정상 적설 4월 315 cm, 5월 170 cm",
    crowds: "골든위크 외에는 한산합니다",
    verdict: "연중 가장 저렴한 패스로 봄 스키를 즐길 수 있습니다. 4월 5일부터 하루 ¥6,300입니다. 이 시기에는 그랜드 히라후와 안누푸리만 열려 있습니다. 니세코 빌리지는 4월 4일, 하나조노는 4월 11일에 닫습니다.",
  },
];

const faqItems = [
  {
    q: "신치토세 공항에서 니세코까지 어떻게 가나요?",
    a: `니세코 유나이티드는 다섯 가지 방법을 안내하며 기본은 직행버스입니다. ${OWN}에 확인한 교통 안내 기준 ${AIRPORT_BUS}, ${AIRPORT_BUS_FARE}이고 예약이 필수입니다. 다른 방법은 전철 + 노선버스 ${AIRPORT_TRAIN}, ${AIRPORT_TRAIN_FARE}(예약 불필요), 계절 스키 버스 3~3.5시간, ${AIRPORT_BUS_FARE}(12~3월만), 렌터카 2시간, 하루 ¥8,000부터, 전용 차량 2시간, ¥25,000부터입니다. 대부분은 두 가지로 결정됩니다. 첫째는 짐입니다. 버스 상품은 스키 장비와 1인당 가방 하나를 실을 수 있고, 1월 홋카이도 플랫폼에서 스키 가방을 들고 갈아타는 일은 아무도 계획하지 않습니다. 둘째는 예약입니다. 전철과 버스 경로만 예약 없이 갈 수 있고 나머지는 모두 출국 전에 정해야 합니다. 운전한다면 2시간은 눈길과 빙판에 익숙하다는 전제입니다.`,
  },
  {
    q: "니세코 스키는 언제가 가장 좋나요?",
    a: `눈은 1월, 가성비는 3월, 한산한 산은 12월입니다. 약 850 m의 시라카바 코스에서 측정한 최근 완료 시즌 그랜드 히라후 누적 강설량(확인일 ${OWN})은 12월 386 cm, 1월 620 cm, 2월 263 cm, 3월 75 cm로 1월이 압도적이며, 니세코 유나이티드는 "세계에서 강설이 가장 꾸준한 곳 중 하나"라고 설명합니다. 대가는 혼잡과 피크 요금입니다. 1월 전체가 ${PEAK_FROM}~${PEAK_TO} 피크 구간으로 하루 ${PEAK_DAY}입니다. 2월은 파우더가 이어지고 설 연휴 인파가 더해지며 정상 적설은 시즌 최대 400 cm입니다. 3월은 리조트가 가성비로 내세우는 달입니다. 맑고 포근하며 강습과 렌털에 봄 할인이 있고 "백컨트리에 가장 좋은 달"이라고 합니다. 정상에 380 cm가 남아 있고 3월 23일부터 패스가 ${EARLY_DAY}로 내려갑니다. 연휴 전 12월은 현지인의 선택입니다. 리프트가 한산하고 피크 전 요금이며 패스는 겨울 최저가 ${EARLY_DAY}입니다.`,
  },
  {
    q: "니세코 스키 강습은 미리 예약해야 하나요?",
    a: `네, 조언이 아니라 공개된 규칙이 있습니다. 리조트 직영 니세코 인터내셔널 스노스포츠 스쿨은 ${SEASON}에 확인한 페이지에서 "피크 시즌에는 종일 강습만 사전 예약할 수 있다"고 밝히며, 스쿨의 피크는 ${LESSON_PEAK}입니다. 리프트권 피크와는 다릅니다. 1월 하순의 반나절 강습은 미리 예약할 수 있지만, 12월 20일이나 2월 8일의 반나절은 현장에서 문의해야 합니다. 그 주에 반나절만 가능하다면 종일을 예약하고 일찍 끝내거나 날짜를 옮기세요. 스쿨은 잠정 일정으로 2026년 11월 28일~2027년 4월 11일 운영하며 그룹, 개인, 맞춤 프로그램이 있고 2026-27 예약이 열려 있습니다. 재판매 업체의 개인 강습은 별도 예약분이고 해외 카드로 결제할 수 있어, 리조트 스쿨이 찬 날에 유용합니다.`,
  },
  {
    q: "니세코는 초보자에게 괜찮나요?",
    a: `네, 파우더 명성보다 훨씬 좋습니다. ${OWN}에 확인한 그랜드 히라후 수치로 코스 22개 중 9개가 초급(중급 6, 상급 7)이고, 연결된 네 지역 중 가장 넓고 완만한 코스는 서쪽 안누푸리에 있습니다. 초보자에게 유리한 점이 두 가지입니다. 올 마운틴 패스로 실력이 늘어도 한 언덕에 갇히지 않고, 리조트 스키 스쿨이 가장 조용한 하나조노에 있어 배우는 슬로프에 빠른 스키어가 적습니다. 불리한 점도 두 가지입니다. 위의 예약 규칙이 실제 문제입니다. 스쿨 피크인 ${LESSON_PEAK}에는 종일 강습만 예약할 수 있어, 조심스럽게 반나절만 원하는 초보자에게 불편합니다. 또한 피크 1일권은 성인 ${PEAK_DAY}이라 1월 초보자는 초급 코스 9개에 전문가가 산 전체에 내는 것과 같은 금액을 냅니다. 12월이나 3월을 권하는 이유입니다.`,
  },
  {
    q: "니세코에서는 어디에 묵어야 하나요?",
    a: `특별한 이유가 없다면 그랜드 히라후입니다. 네 지역 중 가장 크고 마을이 붙어 있는 유일한 곳이라 식당, 바, 렌털 숍, 저녁 외출이 셔틀이 아니라 도보입니다. 공식 수치는 코스 22개, 곤돌라 2기와 체어리프트 7기, 표고차 940 m(정상 1,200 m, 베이스 260 m), 최장 코스 5,300 m입니다. 나머지 세 곳은 각각 얻는 것이 분명합니다. 하나조노는 가장 조용하고 리조트 스키 스쿨이 있어 가족과 초보자에게 맞습니다. 니세코 빌리지는 호텔 중심의 스키 인, 스키 아웃으로 저녁에 나가지 않는 여행에 맞습니다. 안누푸리는 코스가 가장 넓고 완만하며 사람이 적습니다. 놓치기 쉬운 날짜가 있습니다. 네 지역은 함께 닫지 않습니다. 니세코 빌리지는 2027년 4월 4일, 하나조노는 4월 11일에 닫고 그랜드 히라후와 안누푸리는 5월 5일까지 운영하므로, 늦은 시즌이나 골든위크에는 두 곳만 열려 있습니다. 모든 날짜는 니세코 유나이티드 공식이며 확인일은 ${OWN}입니다.`,
  },
  {
    q: "니세코 리프트권은 얼마인가요?",
    a: `네 지역을 모두 탈 수 있는 올 마운틴 패스 1일권은 성인 기준 피크 ${PEAK_DAY}, 레귤러 ${REGULAR_DAY}, 얼리·스프링 ${EARLY_DAY}, 파이널 ¥6,300입니다. 니세코 유나이티드 공식 요금이며 확인일은 ${OWN}입니다. 4~12세 어린이는 피크 ¥8,100, 레귤러 ¥7,600, 얼리·스프링 ¥5,300, 파이널 ¥3,800입니다. 13~15세 청소년과 65세 이상은 같은 요금으로 피크 ¥11,500, 레귤러 ¥10,700, 얼리·스프링 ¥7,500, 파이널 ¥5,400입니다. 계획의 기준은 가격보다 기간입니다. 피크는 ${PEAK_FROM}~${PEAK_TO}로 크리스마스, 연말연시, 1월 전체, 2월 전체가 들어갑니다. 2026년 11월 28일~12월 11일 얼리 시즌 패스는 온라인으로 팔지 않으므로, 겨울 중 가장 저렴한 주는 창구에서 사야 합니다.`,
  },
  {
    q: "니세코에 투어가 필요한가요, 직접 갈 수 있나요?",
    a: `어디서 자느냐에 전적으로 달려 있으며, 이 검색어가 감추고 있는 질문입니다. 니세코에 묵는다면 투어는 필요 없습니다. 공항 버스, 강습, 장비, 패스만 예약하면 나머지는 저절로 됩니다. 호텔과 식당이 많은 삿포로에 묵는다면 가이드 일정이 니세코를 타는 유일하게 합리적인 방법입니다. 니세코 유나이티드 수치로 공항 쪽에서 편도 2~3.5시간이고, 직접 짠 하루는 낮 시간 대부분을 버스에서 보내기 때문입니다. 삿포로 출발 리프트권 + 버스 상품이 그래서 있습니다. 그랜드 히라후 6시간에 교통과 패스가 한 번에 예약됩니다. 세 번째는 일행 중 일부만 스키를 타는 경우로, 스키어 수가 아니라 차량당 요금인 전용 차량이 맞습니다.`,
  },
  {
    q: "삿포로에서 니세코 당일치기가 가능한가요?",
    a: `네, 즉흥이 아니라 예약한 일정으로요. 제약은 거리입니다. 니세코 유나이티드 교통 안내는 신치토세에서 니세코까지 예약 버스 ${AIRPORT_BUS}, 전철 + 노선버스 ${AIRPORT_TRAIN}으로 안내하고, 삿포로도 같은 쪽에 있습니다. 직접 짠 당일 여행은 낮 시간 대부분이 이동입니다. 이를 해결하는 상품은 버스가 포함된 고정 활주 시간을 판매하며, 보통 그랜드 히라후 약 6시간에 리프트권이 포함되고 삿포로 시내 여러 곳에서 탑승합니다. 시내에 머물며 제대로 된 스키 하루를 원할 때 맞습니다. 이틀을 원한다면 계산이 달라져 숙박이 포함된 2~3일 투어가 사치가 아니게 됩니다. 바람으로 산이 닫히면(상부 리프트에서 특히 자주 있습니다) 같은 버스망을 쓰는 노보리베쓰·도야호 일정이 대안입니다.`,
  },
  {
    q: "니세코에 야간 스키가 있나요?",
    a: `네, 니세코 유나이티드 일정으로 2026년 12월 12일~2027년 3월 22일입니다(확인일 ${OWN}). 혼슈 리조트보다 니세코를 고를 실질적인 이유 중 하나입니다. 낮이 가장 짧은 위도에서 조명 코스가 짧은 겨울 하루를 늘려 주고, 눈이 가장 많은 주에 가장 좋습니다. 주의할 점이 두 가지 있습니다. 시즌 전체가 아닙니다. ${SEASON_OPEN} 개장 후 첫 2주와 3월 22일 이후 스프링·파이널 기간에는 없으므로, 저렴한 4월 주를 골랐다면 중요합니다. 또한 야간 운영도 날씨에 달려 있습니다. 상부 리프트는 바람으로 멈추고 폭풍이 오는 밤에는 조명이 꺼집니다. 이 글을 포함한 가이드가 아니라 리조트의 당일 운행 정보를 확인하세요.`,
  },
  {
    q: "니세코 여행은 며칠이 적당한가요?",
    a: `눈을 보러 간다면 최소 3박이며, 이유는 산이 아니라 교통입니다. 니세코 유나이티드 수치로 공항 왕복이 편도 ${AIRPORT_BUS}라 2박이면 상당한 시간을 차에서 보내고, 1박은 이동할 가치가 없습니다. 3박이면 온전한 이틀에 도착일 오후나 출발일 오전이 더해집니다. 니세코가 값어치를 하기 시작하는 것은 5~7박입니다. 니세코의 명성인 꾸준하고 반복되는 파우더는 하루가 아니라 통계의 문제이고, 그랜드 히라후의 1월 620 cm는 수많은 아침을 뜻합니다. 반대로 여행 대부분이 도시이고 스키는 하루만 원한다면 숙소를 니세코로 옮기지 마세요. 삿포로 출발 가이드 일정을 예약하고 도시 호텔을 유지하세요.`,
  },
];

const nisekoSameTrip: KlookTripPrepItem[] = [
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩에서 eSIM 보기 →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "니세코의 하루는 날씨가 결정합니다. 상부 리프트는 바람으로 멈추고 폭풍 중에 지역이 닫혔다 열리며, 이런 공지는 산 아래 게시판이 아니라 휴대폰으로 옵니다.",
  },
  {
    label: "니세코 셔틀버스(신치토세 공항·삿포로)",
    ctaLabel: "니세코 셔틀 보기 →",
    url: klookFor(nisekoResortShuttleBus.url, LOCALE),
    why: "니세코 유나이티드 수치로 신치토세 직행버스는 2.5시간 ¥6,000, 전철과 버스는 3시간 ¥6,200입니다. 이 상품은 스키 장비와 1인당 가방 하나를 실을 수 있고, 국내선 도착 후 45분, 국제선 도착 후 90분을 요구하므로 항공편에 맞추세요.",
  },
  {
    label: "JR 홋카이도 레일 패스",
    ctaLabel: "JR 홋카이도 패스 보기 →",
    url: klookFor(jrHokkaidoRailPass.url, LOCALE),
    why: "니세코가 긴 섬 여행의 한 곳일 때만 필요합니다. JR 홋카이도 기준 5일 ¥22,000부터이고 버스는 포함되지 않으므로, 공항과 리조트만 왕복한다면 건너뛰세요.",
  },
  {
    label: "니세코 그랜드 히라후 영어 스키·스노보드 강습(4시간 또는 6시간)",
    ctaLabel: "니세코 강습 보기 →",
    url: klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE),
    why: `공개된 규칙이 있는 예약입니다. 리조트 스쿨은 스쿨 피크인 ${LESSON_PEAK}에 종일 강습만 사전 예약을 받으므로, 그 주의 반나절은 재판매 업체나 현장 문의가 필요합니다.`,
  },
  {
    label: "니세코 스키·스노보드 렌털(Rhythm, 히라후)",
    ctaLabel: "니세코 렌털 보기 →",
    url: klookFor(nisekoSkiSnowboardRental.url, LOCALE),
    why: "출국 전에 장비를 예약하고 리프트 아래 히라후에서 받습니다. 첫날 아침을 스키로 보내느냐 줄 서기로 보내느냐의 차이입니다.",
  },
  {
    label: "니세코 호텔",
    ctaLabel: "클룩에서 니세코 호텔 보기 →",
    url: klookFor(japanWinterStayAreas[7].url, LOCALE),
    why: "다른 모든 것을 정해 주는 예약입니다. 네 지역 중 어디서 자느냐에 따라 리프트까지 도보인지 셔틀인지가 정해지며, 니세코 유나이티드도 성수기 연휴는 일찍 매진된다고 밝힙니다.",
  },
];

const TITLE = "니세코 스키 투어(2027): 셔틀, 강습, 4개 스키장";
const DESC =
  "니세코 스키 투어와 이동: 신치토세에서 예약 버스 2.5시간, 연결된 4개 스키장, 성수기 리프트권 ¥13,500. 2026-27 일정.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function NisekoSkiToursPage({ updated }: { updated: PageUpdated }) {
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
니세코 스키 투어:<br />가는 방법, 강습, 4개 지역
</h1>
          <p className={styles.heroSubtitle}>
연결된 4개 스키장, 신치토세에서 예약 버스 {AIRPORT_BUS}, 그리고 많은 사람이 놓치는 공개된 마감 규칙인 피크 시즌 강습 규정.
</p>
          <div className={styles.heroBadges}>
            {[`업데이트 ${monthLabel(updated.iso, LOCALE)}`, "2026-27 공식 일정", "올 마운틴 패스 요금", "피크 강습 규칙, 출처 표기"].map((t) => (
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
          heading={"2026-27 겨울 니세코 스키 투어는 어떤 것을 예약할까요?"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
크리스마스나 연말연시라면 리프트가 여는 11월 28일까지 강습과 공항 버스를 예약하세요. 스쿨의 강습 피크가 12월 14일에 시작되고 그 기간에는 종일만 사전 예약할 수 있습니다. 1~2월이라면 스쿨의 두 번째 피크인 2월 6~12일 전, 12월 31일까지 예약하세요.
</>
          }
          tours={[
            {
              title: "삿포로 출발 니세코 그랜드 히라후 스키 투어(6시간 리프트권 + 버스)",
              url: klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE),
              price: null,
              duration: "당일 왕복, 6시간 리프트권",
              departs: "삿포로 시내 10개 승차 지점",
            },
            {
              title: "니세코 그랜드 히라후 영어 스키·스노보드 강습(4시간 또는 6시간)",
              url: klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE),
              price: null,
              duration: "4시간 또는 6시간",
              departs: "니세코 도큐 그랜드 히라후",
            },
            {
              title: "삿포로 출발 노보리베쓰, 도야호, 니세코 당일 여행",
              url: klookFor(noboribetsuToyaNisekoDayTour.url, LOCALE),
              price: null,
              duration: "약 10시간",
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
신치토세에서
</p>
                <p className={styles.verdictStatValue}>
예약 버스 {AIRPORT_BUS}
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
시즌
</p>
                <p className={styles.verdictStatValue}>
2026년 11/28 – 2027년 5/5
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
리프트권 1일
</p>
                <p className={styles.verdictStatValue}>
피크 {PEAK_DAY} / 얼리 {EARLY_DAY}
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
미리 예약?
</p>
                <p className={styles.verdictStatValue}>
강습과 이동은 예약 필요
</p>
              </div>
            </div>
                        <p className={styles.verdictText}>
<strong>니세코 스키 투어</strong>는 이동부터 생각해야 합니다. 가장 긴 부분이기 때문입니다. 니세코 유나이티드 교통 안내에 따르면 <strong>신치토세 공항에서 니세코까지 예약 직행버스로 {AIRPORT_BUS}, {AIRPORT_BUS_FARE}</strong>, 예약 없는 전철 + 노선버스로 {AIRPORT_TRAIN}, {AIRPORT_TRAIN_FARE}, 렌터카나 전용 차량으로 2시간입니다. 도착하면 <strong>패스 하나로 연결된 4개 스키장</strong>이 있습니다. <strong>그랜드 히라후</strong>(가장 크고 마을이 있음), <strong>하나조노</strong>(가장 조용하고 리조트 스키 스쿨이 있음), <strong>니세코 빌리지</strong>(스키 인, 스키 아웃 호텔), <strong>안누푸리</strong>(가장 넓고 완만함)입니다. 네 곳 모두 <strong>{SEASON_OPEN}</strong>에 열고 그랜드 히라후와 안누푸리는 <strong>2027년 5월 5일</strong>까지 운영합니다. 올 마운틴 패스 1일권은 <strong>{PEAK_FROM}~{PEAK_TO}</strong> 피크에 <strong>{PEAK_DAY}</strong>, 얼리·스프링에 <strong>{EARLY_DAY}</strong>입니다. 현장 구매가 아니라 예약해야 할 것은 <strong>강습</strong>입니다. 리조트 스쿨은 스쿨 피크인 {LESSON_PEAK}에 종일 강습만 사전 예약할 수 있다고 밝힙니다. 모든 수치는 운영사 공식이며 {SEASON}에 다시 확인했습니다.
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
삿포로 출발 니세코 당일 →
</KlookLink>
              <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
니세코 공항 셔틀 →
</KlookLink>
            </div>
          </div>
        </div>

                <KlookTripPrep
          label={"같은 여행에서 예약할 것"}
          heading={"니세코 여행에서 실제로 예약할 것"}
          intro={"데이터와 공항 버스가 먼저입니다. 이 목록의 나머지는 당일에 잘못돼도 큰일이 아닙니다. 니세코 유나이티드 교통 안내가 그 차이를 보여 줍니다. 예약 버스는 2.5시간, 예약 없는 전철과 버스는 3시간입니다."}
          items={nisekoSameTrip}
        />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
가는 방법
</span>
          <h2 className={styles.sectionTitle}>
신치토세 공항에서 니세코까지 어떻게 가나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
대부분에게 답은 <strong>예약 직행버스 {AIRPORT_BUS}, {AIRPORT_BUS_FARE}</strong>이며 니세코 유나이티드 공식 수치입니다. 리조트는 다섯 가지 방법을 공개하는데, 차이는 속도(2~3.5시간)보다 <strong>예약 없이 갈 수 있는가</strong>와 <strong>스키 가방을 어떻게 하는가</strong>에 있습니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["방법", "시간", "비용", "예약", "비고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.booking}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
표의 시간과 요금은 모두 니세코 유나이티드의 “Getting to Niseko” 페이지 기준이며 {SEASON}에 다시 확인했습니다. 비고는 저희가 썼습니다. 표로 알 수 없고 상품 페이지에서 알 수 있는 것이 하나 있습니다. 해당 버스가 스키 장비와 1인당 짐을 얼마나 실을 수 있는가입니다. 리조트 셔틀 상품은 짐 1개와 장비를 명시하고 있고, 이 점이 전철과 다른 상품인 이유입니다.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
니세코 리조트 셔틀 →
</KlookLink>
            <KlookLink href={klookFor(hokkaidoPrivateCarCharterNiseko.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
니세코 전용 차량 →
</KlookLink>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
신치토세 이동 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
시즌
</span>
          <h2 className={styles.sectionTitle}>
2026-27 니세코 개장과 폐장은 언제인가요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
네 지역 모두 <strong>{SEASON_OPEN}</strong>에 열지만 함께 닫지 않습니다. 또한 예약에는 개장일보다 다섯 개 <strong>요금 기간</strong>이 더 중요합니다. 피크 구간에 크리스마스, 연말연시, 1월 전체, 2월 전체가 들어가기 때문입니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `니세코 유나이티드, 2026-27(확인일 ${SEASON})`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
모든 날짜는 니세코 유나이티드 공식이며 확인일은 {SEASON}입니다. 리조트는 폐장일을 예정으로 설명하며 홋카이도의 봄에 따라 바뀔 수 있습니다. 늦은 시즌 예약 전에 다시 볼 부분은 <strong>니세코 빌리지 4월 4일, 하나조노 4월 11일 폐장</strong>이고 그랜드 히라후와 안누푸리는 5월 5일까지라는 점입니다.
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
리프트권
</span>
          <h2 className={styles.sectionTitle}>
니세코 리프트권은 얼마인가요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
네 지역을 모두 포함하는 <strong>올 마운틴 패스</strong> 1일권은 시기에 따라 성인 <strong>{EARLY_DAY}</strong>부터 <strong>{PEAK_DAY}</strong>까지입니다. 13~15세 청소년과 65세 이상은 같은 요금을 내며, 드문 경우이니 함께 여행한다면 알아 두세요.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["기간", "성인", "청소년 13–15세", "어린이 4–12세", "시니어 65세+"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.period}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.period}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td className={styles.tdPrice}>{row.youth}</td>
                      <td className={styles.tdPrice}>{row.child}</td>
                      <td className={styles.tdPrice}>{row.senior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
<strong>계획을 바꾸는 운영 정보 하나.</strong> 2026년 11월 28일~12월 11일 얼리 시즌 패스는 겨울 중 가장 저렴하지만 니세코 유나이티드 안내에 따르면 <strong>온라인으로 판매되지 않습니다</strong>. 시즌 최저가는 도착 후 창구에서 사야 하며, 집에서 미리 확보할 수 없습니다. 다일권은 7일까지 있고 온라인 전용 50시간권도 있지만, 여기서는 리조트 표에서 전부 읽을 수 있었던 1일권만 싣습니다. 모든 가격 확인일 {SEASON}.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
히라후 리프트권 + 버스 일정 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiSnowboardRental.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
니세코 렌털 예약 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
강습
</span>
          <h2 className={styles.sectionTitle}>
니세코 스키 강습은 미리 예약해야 하나요?
</h2>
          <p className={styles.bodyText}>
<strong>네, 조언이 아니라 공개된 규칙이 있습니다.</strong> 리조트 직영 <strong>니세코 인터내셔널 스노스포츠 스쿨</strong>은 {SEASON}에 확인한 페이지에서 이렇게 밝힙니다. <em>“피크 시즌에는 종일 강습만 사전 예약할 수 있습니다.”</em> 스쿨의 피크는 <strong>{LESSON_PEAK}</strong>로 리프트권 피크({PEAK_FROM}~{PEAK_TO})와 다릅니다. 크리스마스와 연말연시 주, 2월 6~12일 주의 반나절 강습은 예약이 아니라 현장 문의입니다.
</p>
          <p className={styles.bodyText}>
가족이나 초보자에게 이 페이지에서 가장 중요한 문장입니다. 평소 계획이 뒤집히기 때문입니다. 그 주에 체력이나 아이들 상황상 반나절이 맞다면 세 가지 선택이 있습니다. 종일을 예약하고 점심에 끝내거나, 스쿨의 일반 주(12월 8~13일, 1월 4일~2월 5일, 2월 13~28일)로 옮기거나, 재판매 업체로 예약하세요. 재판매 업체는 별도 예약분이고 내 통화로 표시되며 영어로 읽을 수 있습니다. 스쿨은 잠정 일정으로 <strong>{SEASON_OPEN}~2027년 4월 11일</strong> 운영하며 그룹, 개인, 맞춤 프로그램이 있고 2026-27 예약이 열려 있습니다.
</p>
          <p className={styles.bodyText}>
스쿨의 개인 강습은 최대 6명 그룹당 요금이며 {SEASON}에 확인했습니다. 6시간 니세코 클래식은 피크 <strong>¥120,000</strong>, 레귤러 ¥93,000, 얼리·스프링 ¥87,000입니다. 오전 강습은 ¥93,000, ¥71,000, ¥59,000, 오후 강습은 ¥55,000, ¥43,000, ¥43,000입니다. 그룹 강습은 별도 요금이고 11월 28일~12월 7일에는 운영하지 않습니다. 재판매 업체 가격은 상품 페이지에서 날짜별로 확인하세요.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
히라후 영어 강습 →
</KlookLink>
            <KlookLink href={klookFor(rhythmNisekoPrivateSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
Rhythm 개인 강습 →
</KlookLink>
            <KlookLink href={klookFor(nisekoRusutsuKiroroPrivateLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
니세코 / 루스쓰 / 키로로 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
4개 지역
</span>
          <h2 className={styles.sectionTitle}>
니세코에서는 어디에 묵어야 하나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>특별한 이유가 없다면 그랜드 히라후입니다.</strong> 연결된 네 지역 중 가장 크고 마을이 붙어 있는 유일한 곳이라 저녁 식사가 셔틀이 아니라 도보입니다. 나머지 세 곳은 각각 얻는 것이 분명하며, 실제 판단은 마지막 열에 있습니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["지역", "특징", "추천 대상", "알아 둘 점"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.stay}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
지역 이름과 폐장일은 니세코 유나이티드, 그랜드 히라후 코스 수치는 그랜드 히라후 공식입니다. 코스 22개(초급 9, 중급 6, 상급 7), 곤돌라 2기와 체어리프트 7기, 표고차 940 m(정상 1,200 m, 베이스 260 m), 135 ha, 최장 코스 5,300 m, 최대 경사 40°입니다. 둘 다 {OWN}에 확인했습니다. 니세코 유나이티드는 인기 숙소와 성수기 연휴가 일찍 매진된다고 밝히지만 얼마나 일찍인지는 공개하지 않아 저희도 싣지 않습니다.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(japanWinterStayAreas[7].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
니세코 호텔 보기 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiHotSpringTourFromSapporo.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
2박 또는 3박 한 번에 예약 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
시기
</span>
          <h2 className={styles.sectionTitle}>
니세코 스키는 언제가 가장 좋나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>눈은 1월, 가성비는 3월, 한산한 산은 12월입니다.</strong> 강설량 열은 그랜드 히라후의 최근 완료 시즌 월별 누적치로 약 850 m의 시라카바 코스에서 측정했습니다. 혼잡도와 평가 열은 니세코 유나이티드의 월별 안내와 공개된 요금 기간을 따랐습니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["월", "강설량(지난 시즌)", "혼잡도", "평가"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthRows.map((row) => (
                    <tr key={row.month}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.month}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.snow}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.crowds}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
강설량은 평균이 아니라 한 시즌 수치이고 산의 한 지점에서 측정한 리조트 자체 값입니다. 예보가 아니라 겨울의 흐름으로 보세요. 이 표의 모든 내용은 {OWN}에 확인했습니다. <strong>야간 스키</strong>는 2026년 12월 12일~2027년 3월 22일이므로 개장 후 첫 2주와 저렴한 4월 주에는 없습니다.
</p>
        </section>

                <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>
투어 여부
</span>
          <h2 className={styles.sectionTitle}>
투어가 필요한가요, 직접 갈 수 있나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
어디서 자느냐에 전적으로 달려 있으며, “니세코 스키 투어”라는 말이 실제로 감추고 있는 질문입니다. 네 가지 경우에 네 가지 예약이 필요합니다.
</p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
니세코에 묵나요? 투어 불필요
</p>
              <p className={styles.whoForDesc}>
공항 버스, 장비, 원하면 강습을 예약하고 패스를 사면 나머지는 저절로 됩니다. 네 지역이 패스 하나로 연결되어 있습니다. 마감이 있는 예약은 이동, 피크 강습, 숙소뿐입니다.
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
삿포로에 묵나요? 일정을 예약하세요
</p>
              <p className={styles.whoForDesc}>
가이드 일정이 필요한 진짜 경우입니다. 니세코 유나이티드 수치로 편도 2~3.5시간이라 직접 짠 당일 여행은 낮을 버스에서 보냅니다. 리프트권 + 버스 상품은 그랜드 히라후의 고정 시간에 교통과 패스를 한 가격으로 판매합니다.
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
일부만 스키를 타나요? 차량 단위로 예약하세요
</p>
              <p className={styles.whoForDesc}>
일부만 스키를 타는 경우가 니세코에서 가장 준비하기 어렵고 좌석당 요금이 맞지 않습니다. 전용 차량은 차량당 요금이라 4명 이상이면 합리적입니다.
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
어느 쪽이든 날씨 조항을 확인하세요
</p>
              <p className={styles.whoForDesc}>
이 산의 특징입니다. 상부 리프트는 바람으로 자주 멈추므로 불운이 아니라 계획의 전제로 삼아야 합니다. 예약 전에 운영사가 취소할 때와 내가 취소할 때 어떻게 되는지 읽으세요. 상품과 날짜마다 달라 이 페이지로는 알 수 없습니다.
</p>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
위 어디에도 속하지 않는 예약이 하나 있습니다. <strong>데이터</strong>입니다. 니세코의 하루는 일본의 어떤 스키 여행보다 날씨가 결정합니다. 리프트가 폭풍 중에 멈췄다 다시 열리고, 지역이 닫히고, 도로 이동이 늦어지며, 이런 공지는 모두 산 아래 게시판이 아니라 휴대폰으로 옵니다. <KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>클룩 eSIM 보기 →</KlookLink> <Link href="/ko/guides/esim/best-esim-japan">일본 eSIM 추천 가이드</Link>에서 다른 선택지와 비교하고, <Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en">일본 스키 여행자 보험 가이드(영어)</Link>에서 리프트권 전에 챙길 또 하나의 문제인 보험의 스노스포츠 보장 여부와 조건을 확인하세요.
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
겨울 여행의 나머지
</span>
          <h2 className={styles.sectionTitle}>
니세코 여행과 무엇을 묶으면 좋을까요?
</h2>
          <p className={styles.bodyText}>
2월 여행이라면 눈과 함께 도시도 볼 수 있습니다. <Link href="/ko/guides/attractions/sapporo-snow-festival-tours">삿포로 눈축제 가이드</Link>는 2027년 2월 4~11일의 8일을 다루고, <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">삿포로 출발 오타루 당일 여행(영어)</Link>은 공항으로 돌아가는 길의 가장 쉬운 휴식일입니다. 눈이 일주일의 일부일 뿐이라면 <Link href="/guides/attractions/hokkaido-7-day-itinerary" hrefLang="en">홋카이도 7일 여행(영어)</Link>에 스키로 바꾸는 방법이 있고, <Link href="/guides/attractions/japan-winter-itinerary" hrefLang="en">일본 겨울 여행 일정(영어)</Link>은 홋카이도를 전국 여행의 한 구간으로 다룹니다.
</p>
          <p className={styles.bodyText}>
도쿄를 거치나요? 스키가 처음이라 홋카이도에 가기 전에 시험해 보고 싶다면 <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">도쿄 출발 갈라 유자와 스키(영어)</Link>가 부담 없는 방법입니다. 일행 중 스키를 타지 않는 사람에게는 <Link href="/ko/guides/attractions/jigokudani-snow-monkey-tour">지고쿠다니 원숭이 공원 투어</Link>와 <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">다카야마와 시라카와고 투어(영어)</Link>가 스키 없는 눈 여행이 되고, <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">도쿄 일루미네이션(영어)</Link> 가이드는 비행 전후의 저녁을 다룹니다.
</p>
        </section>

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"실제로 예약할 수 있는 니세코 일정"}
          intro={"같은 여행의 네 가지 형태입니다. 패스가 포함된 삿포로 출발 그랜드 히라후 6시간, 숙박이 포함된 2~3박, 일부만 스키를 타는 일행을 위한 전용 차량, 그리고 상부 리프트가 바람으로 멈춘 날 아침을 위한 스키 없는 홋카이도 일정입니다."}
          tours={[withKlookLocale(nisekoHirafuLiftPassBusTour, LOCALE, { title: "삿포로 출발 니세코 그랜드 히라후 스키 투어(6시간 리프트권 + 버스)", desc: "삿포로 시내 왕복 버스와 리프트권을 한 번에 예약하는 그랜드 히라후 6시간 상품으로, 시내 여러 곳에서 탑승합니다" }), withKlookLocale(nisekoSkiHotSpringTourFromSapporo, LOCALE, { title: "삿포로 출발 니세코 스키·온천 투어(1박 2일 / 2박 3일)", desc: "여행 중에 니세코 하루로는 부족하다고 느낀 여행자를 위한 다일 일정으로, 소규모 그룹, 빌라 숙박, 삿포로 출발입니다" }), withKlookLocale(hokkaidoPrivateCarCharterNiseko, LOCALE, { title: "홋카이도 전용 차량(삿포로 / 신치토세 – 니세코)", desc: "삿포로나 공항과 니세코, 루스쓰, 도야호, 후라노를 잇는 기사 포함 7~14인승 차량으로, 시간표가 아니라 원하는 시간에 출발합니다" }), withKlookLocale(noboribetsuToyaNisekoDayTour, LOCALE, { title: "삿포로 출발 노보리베쓰, 도야호, 니세코 당일 여행", desc: "지옥 계곡, 도야호, 니세코 쪽을 하루에 도는 가이드 투어로, 스키 주간의 휴식일이자 바람으로 산이 닫힌 날의 대안입니다" })]}
        />

                <Related items={[{ href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "도쿄 출발 갈라 유자와 스키 당일 여행: 71분, 리프트 ¥8,000 (영어)" }, { href: "/guides/money/best-travel-insurance-japan", title: "일본 여행자 보험 추천 2026: 누구에게 무엇이 필요한가 (영어)" }, { href: "/guides/money/japan-ski-travel-insurance", title: "일본 스키 여행자 보험: 일반 보험이 제외하는 것 (영어)" }, { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "홋카이도 7일 여행: 날짜별 일정 (영어)" }, { href: "/ko/guides/attractions/sapporo-snow-festival-tours", title: "삿포로 눈축제 투어(2027): 2월 4~11일, 무료 회장" }, { href: "/guides/attractions/japan-winter-itinerary", title: "일본 겨울 여행 12일 일정(2027): 날짜별 코스 (영어)" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "삿포로 출발 오타루 당일 여행(2027): ¥800, JR 33분 (영어)" }, { href: "/ko/guides/attractions/jigokudani-snow-monkey-tour", title: "도쿄 출발 지고쿠다니 원숭이 공원 가이드(2027)" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "다카야마와 시라카와고 투어(2027): 어디서 출발할까 (영어)" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "도쿄 일루미네이션: 일정, 시간, 무료 명소 (영어)" }, { href: "/ko/guides/esim/best-esim-japan", title: "일본 eSIM 추천(2026): 업체, 가격, 선택법" }, { href: "/guides/attractions", title: "일본의 다른 볼거리 → (영어)" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
4개 지역, 패스 하나, 마감 하나
</h2>
            <p className={styles.ctaBannerDesc}>
리프트는 {SEASON_OPEN}에 열고 피크 요금은 {PEAK_FROM}에 시작합니다. 이동과 강습은 날짜가 걸린 예약입니다. 12월 14일~1월 3일과 2월 6~12일에 리조트 스쿨은 종일 강습만 사전 예약을 받습니다.
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
니세코 스키 일정 보기 →
</KlookLink>
              <KlookLink href={klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
니세코 강습 예약 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
