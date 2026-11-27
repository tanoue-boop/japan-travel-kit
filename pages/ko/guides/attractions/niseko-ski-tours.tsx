import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import WinterSkiSameDayCards from "../../../../components/WinterSkiSameDayCards";
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
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import HotelStayBlock from "../../../../components/HotelStayBlock";

// Mirrors the English guide (pages/guides/attractions/niseko-ski-tours.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.
// Exception, 15 Nov 2026 (task-jtk-20261115-C01): the Sapporo ski bus (Hokkaido Chuo Bus "Niseko Ski
// Bus", Sapporo Niseko Line, teikan.chuo-bus.co.jp/en/course/18958): 12 Dec 2026 – 22 Mar 2027,
// reservation required, Sapporo Station → Niseko Hirafu Welcome Center 3 hr 06 min, adult ¥6,000 one
// way / ¥10,000 return. Season opening 28 Nov 2026 re-read on niseko.ne.jp/en/lift/ the same day.

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

// Season dates and every lift-pass price re-read on niseko.ne.jp/en/lift/ on 22 Nov 2026 (C01).
const REREAD_ISO = "2026-11-22";
const REREAD = dateLabel(REREAD_ISO, LOCALE);
const SAPPORO_BUS = "3시간 6분";
const SAPPORO_BUS_FARE = "¥6,000";
const SAPPORO_BUS_PERIOD = "2026년 12월 12일~2027년 3월 22일";

const answerRows = [
  { item: "4개 스키장 개장(2026-27 시즌)", value: SEASON_OPEN, source: "니세코 유나이티드" },
  { item: "삿포로역 → 니세코 히라후(스키 버스, 예약제)", value: `${SAPPORO_BUS}, 편도 ${SAPPORO_BUS_FARE}(왕복 ¥10,000), ${SAPPORO_BUS_PERIOD} 운행`, source: "홋카이도 중앙버스" },
  { item: "신치토세 공항 → 니세코(직행버스, 예약제)", value: `${AIRPORT_BUS}, ${AIRPORT_BUS_FARE}`, source: "니세코 유나이티드" },
  { item: "올 마운틴 리프트권 1일권(성인)", value: `성수기 ${PEAK_DAY}, 얼리 시즌 ${EARLY_DAY}`, source: "니세코 유나이티드" },
];

const accessRows = [
  {
    option: "신치토세 공항 직행버스",
    time: AIRPORT_BUS,
    cost: AIRPORT_BUS_FARE,
    booking: "예약 필수",
    note: `니세코를 처음 방문하는 여행자의 기본 선택이며, 스키 가방도 실을 수 있습니다. 니세코 유나이티드 공식 수치입니다. 예약이 필요하므로 출국 전에 예약해야 하며, 현장에서는 승차권을 살 수 없습니다. 확인일 ${OWN}.`,
  },
  {
    option: "전철 + 노선버스",
    time: AIRPORT_TRAIN,
    cost: AIRPORT_TRAIN_FARE,
    booking: "예약 불필요",
    note: "버스보다 30분 느리고 ¥200 비싸지만 예약 없이 갈 수 있는 유일한 방법입니다. 이 방법을 피하는 이유는 짐을 들고 환승해야 하기 때문입니다. 겨울 승강장에서 스키 가방을 들고 환승하는 일은 누구에게나 번거롭습니다.",
  },
  {
    option: "계절 스키 버스",
    time: "3~3.5시간",
    cost: AIRPORT_BUS_FARE,
    booking: "예약 필수, 12~3월만 운행",
    note: "직행버스와 요금은 같고 최대 1시간 더 걸립니다. 가는 도중 다른 리조트에도 정차하기 때문입니다. 숙소가 노선에 있을 때만 유용합니다.",
  },
  {
    option: "렌터카",
    time: "2시간",
    cost: "하루 ¥8,000부터",
    booking: "예약 필수",
    note: "안내된 이동 수단 중 가장 빠르지만 조건이 있습니다. 홋카이도 겨울 도로이므로 눈길과 빙판길 운전 경험이 없다면 2시간이라는 시간은 기대하기 어렵습니다.",
  },
  {
    option: "전용 차량",
    time: "2시간",
    cost: "¥25,000부터",
    booking: "예약 필수",
    note: "1인당이 아니라 차량당 요금이라 가족이나 4명 이상 일행에게 합리적입니다. 항공편 도착 시간에 맞춰 출발하는 유일한 방법이기도 합니다.",
  },
];

const seasonRows = [
  { what: "4개 스키장 모두 개장", detail: `${SEASON_OPEN}` },
  { what: "그랜드 히라후·안누푸리 폐장", detail: "2027년 5월 5일" },
  { what: "하나조노 폐장", detail: "2027년 4월 11일" },
  { what: "니세코 빌리지 폐장", detail: "2027년 4월 4일" },
  { what: "야간 스키", detail: "2026년 12월 12일~2027년 3월 22일" },
  { what: "얼리 시즌", detail: "2026년 11월 28일~12월 11일. 이 기간 패스는 온라인으로 판매되지 않습니다" },
  { what: "레귤러 시즌", detail: "2026년 12월 12~23일, 2027년 3월 1~22일" },
  { what: "성수기", detail: `${PEAK_FROM}~${PEAK_TO}` },
  { what: "스프링 시즌", detail: "2027년 3월 23일~4월 4일" },
  { what: "파이널 시즌", detail: "2027년 4월 5일~5월 5일" },
];

const passRows = [
  { period: "결론: 성인 1일권", adult: `${EARLY_DAY}~${PEAK_DAY}`, youth: "¥7,500~¥11,500", child: "¥5,300~¥8,100", senior: "¥7,500~¥11,500" },
  { period: "얼리 시즌(2026년 11/28~12/11)", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "레귤러 시즌(2026년 12/12~23, 2027년 3/1~22)", adult: REGULAR_DAY, youth: "¥10,700", child: "¥7,600", senior: "¥10,700" },
  { period: `성수기(${PEAK_FROM}~${PEAK_TO})`, adult: PEAK_DAY, youth: "¥11,500", child: "¥8,100", senior: "¥11,500" },
  { period: "스프링 시즌(2027년 3/23~4/4)", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "파이널 시즌(2027년 4/5~5/5)", adult: "¥6,300", youth: "¥5,400", child: "¥3,800", senior: "¥5,400" },
];

const areaRows = [
  {
    area: "그랜드 히라후",
    what: "4개 스키장 중 규모가 가장 크고 스키장 아래에 마을이 형성되어 있습니다. 식당, 바, 장비 대여점, 리조트 스키 스쿨이 있습니다",
    stay: "기본 숙소 지역이며, 저녁에 셔틀버스 없이 걸어서 식당·바에 갈 수 있는 유일한 곳입니다",
    note: "그랜드 히라후 공식 수치: 코스 22개(초급 9, 중급 6, 상급 7), 곤돌라 2기와 체어리프트 7기, 표고차 940 m(정상 1,200 m, 베이스 260 m), 최장 코스 5,300 m.",
  },
  {
    area: "하나조노",
    what: "산에서 가장 조용한 쪽으로, 리조트 직영 니세코 인터내셔널 스노스포츠 스쿨의 거점입니다",
    stay: "가족과 초보자에게 맞습니다. 초급 코스에 사람이 적고 강습이 여기서 시작됩니다",
    note: "강습 규정도 여기서 적용됩니다. 성수기에는 종일 강습만 사전 예약할 수 있습니다. 크리스마스에 반나절을 계획하기 전에 확인하세요.",
  },
  {
    area: "니세코 빌리지",
    what: "호텔 중심 스키장으로, 리프트가 도로 건너편이 아니라 숙소 바로 앞에 있습니다",
    stay: "숙소에서 바로 슬로프로 나가는 편리함을 원하고 저녁에 외출하지 않는 여행자에게 맞습니다",
    note: "네 곳 중 가장 먼저 폐장합니다. 2027년 4월 4일로 그랜드 히라후와 안누푸리보다 한 달 빠릅니다. 늦은 시즌 예약이라면 확인하세요.",
  },
  {
    area: "안누푸리",
    what: "네 곳 중 코스가 가장 넓고 완만하며, 연결된 스키장의 서쪽 끝에 있습니다",
    stay: "조용한 선택지로, 밤에 즐길 거리보다 여유로운 슬로프를 원하는 중급자에게 좋습니다",
    note: "그랜드 히라후와 함께 2027년 5월 5일까지 운영해 봄이나 골든위크 여행에 맞습니다.",
  },
];

const monthRows = [
  {
    month: "12월",
    snow: "최근 완료 시즌 그랜드 히라후 누적 386 cm",
    crowds: "연휴 전에는 리프트가 한산하고 성수기 전 숙박 요금",
    verdict: "니세코 유나이티드는 12월을 '현지인의 달'이라고 부릅니다. 얼리 시즌은 겨울 중 가장 저렴한 ¥8,800이지만 12월 12일 전에는 패스를 온라인으로 팔지 않고, 크리스마스이브부터 성수기 요금입니다.",
  },
  {
    month: "1월",
    snow: "누적 620 cm로 그 시즌에서 눈이 압도적으로 많이 내린 달",
    crowds: "붐빕니다. 리조트도 혼잡하다고 표현합니다",
    verdict: `"Japanuary"라고 불리며, 니세코 유나이티드는 "세계에서 강설이 가장 꾸준한 곳 중 하나"라고 소개합니다. 대신 한 달 내내 성수기 요금으로 하루 ${PEAK_DAY}입니다.`,
  },
  {
    month: "2월",
    snow: "누적 263 cm, 시즌 최대 정상 적설 400 cm",
    crowds: "붐비며 설 연휴 전후가 가장 혼잡합니다. 인기 식당은 자리가 찹니다",
    verdict: "파우더 스노가 이어지고, 눈에 덮인 마을이 가장 사진 찍기 좋은 시기입니다. 2월 28일까지 성수기 요금이며, 삿포로 눈축제로 삿포로도 붐비는 주입니다.",
  },
  {
    month: "3월",
    snow: "누적 75 cm이지만 정상에는 여전히 380 cm",
    crowds: "첫 주 이후 한산해집니다",
    verdict: "가성비가 좋은 달이며 리조트도 그렇게 말합니다. 맑은 날이 많고 포근하며, 강습과 렌털에 봄 할인이 있고 \"백컨트리에 가장 좋은 달\"입니다. 3월 22일까지 레귤러 시즌 요금, 이후 스프링 시즌 요금 ¥8,800입니다.",
  },
  {
    month: "4월~5월 초",
    snow: "리조트 표 기준 정상 적설 4월 315 cm, 5월 170 cm",
    crowds: "골든위크 외에는 한산합니다",
    verdict: "연중 가장 저렴한 패스로 봄 스키를 즐길 수 있습니다. 4월 5일부터 하루 ¥6,300입니다. 이 시기에는 그랜드 히라후와 안누푸리만 열려 있습니다. 니세코 빌리지는 4월 4일, 하나조노는 4월 11일에 닫습니다.",
  },
];

// The first five go into FAQPage; they follow the "니세코 스키 투어" search wording.
const faqItems = [
  {
    q: "삿포로에서 니세코 스키 당일치기가 가능한가요?",
    a: `네. 다만 즉흥적으로 가지 말고 예약한 일정으로 가세요. 홋카이도 중앙버스의 니세코 스키 버스는 삿포로역에서 니세코 히라후 웰컴센터까지 ${SAPPORO_BUS}, 편도 ${SAPPORO_BUS_FARE}(왕복 ¥10,000)이고 ${SAPPORO_BUS_PERIOD}에 예약제로 운행합니다(확인일 ${REREAD}). 왕복 6시간 이상이라 직접 짠 당일치기는 낮 시간 대부분이 이동입니다. 이를 해결하는 상품은 버스 이동과 정해진 스키 시간을 묶어 판매하며, 보통 그랜드 히라후 약 6시간에 리프트권이 포함되고 삿포로 시내 여러 곳에서 탑승합니다. 이틀을 원한다면 숙박이 포함된 2~3일 투어가 맞습니다. 바람으로 산이 닫히면(상부 리프트에서 특히 자주 있습니다) 같은 버스망을 쓰는 노보리베쓰·도야호 일정이 대안입니다.`,
  },
  {
    q: "니세코 스키 투어는 예약해야 하나요, 아니면 직접 갈 수 있나요?",
    a: `어디에 묵느냐에 따라 완전히 달라집니다. 니세코에 묵는다면 투어는 필요 없습니다. 공항 버스, 강습, 장비 대여, 리프트권만 예약하면 나머지는 따로 준비할 것이 거의 없습니다. 호텔과 식당이 많은 삿포로에 묵는다면 가이드 일정이 니세코에서 스키를 타는 가장 현실적인 방법입니다. 삿포로역에서 히라후까지 스키 버스로 ${SAPPORO_BUS}이라 당일치기를 직접 계획하면 낮 시간 대부분을 버스에서 보내기 때문입니다. 삿포로 출발 리프트권 + 버스 상품은 그랜드 히라후 6시간에 교통편과 리프트권을 한 번에 예약합니다. 세 번째는 일행 중 일부만 스키를 타는 경우로, 스키 타는 인원수가 아니라 차량당 요금을 내는 전용 차량이 맞습니다.`,
  },
  {
    q: "니세코 리프트권 가격은 얼마인가요?",
    a: `4개 스키장을 모두 탈 수 있는 올 마운틴 리프트권(올 마운틴 패스) 1일권은 성인 기준 성수기 ${PEAK_DAY}, 레귤러 시즌 ${REGULAR_DAY}, 얼리·스프링 시즌 ${EARLY_DAY}, 파이널 시즌 ¥6,300입니다. 니세코 유나이티드 공식 요금이며 확인일은 ${REREAD}입니다. 4~12세 어린이는 성수기 ¥8,100, 레귤러 시즌 ¥7,600, 얼리·스프링 시즌 ¥5,300, 파이널 시즌 ¥3,800입니다. 13~15세 청소년과 65세 이상 시니어는 서로 같은 요금이 적용되며 성수기 ¥11,500, 레귤러 시즌 ¥10,700, 얼리·스프링 시즌 ¥7,500, 파이널 시즌 ¥5,400입니다. 계획의 기준은 가격보다 기간입니다. 성수기는 ${PEAK_FROM}~${PEAK_TO}로 크리스마스, 연말연시, 1월 전체, 2월 전체가 들어갑니다. 2026년 11월 28일~12월 11일 얼리 시즌 리프트권은 온라인으로 팔지 않으므로, 겨울 중 가장 저렴한 기간의 리프트권은 매표소에서 사야 합니다.`,
  },
  {
    q: "신치토세 공항에서 니세코까지 어떻게 가나요?",
    a: `니세코 유나이티드는 다섯 가지 방법을 안내하며 기본은 직행버스입니다. ${OWN}에 확인한 교통 안내 기준 ${AIRPORT_BUS}, ${AIRPORT_BUS_FARE}이고 예약이 필수입니다. 다른 방법은 전철 + 노선버스 ${AIRPORT_TRAIN}, ${AIRPORT_TRAIN_FARE}(예약 불필요), 계절 스키 버스 3~3.5시간, ${AIRPORT_BUS_FARE}(12~3월만), 렌터카 2시간, 하루 ¥8,000부터, 전용 차량 2시간, ¥25,000부터입니다. 대부분은 두 가지로 결정됩니다. 첫째는 짐입니다. 버스 상품은 스키 장비와 1인당 가방 1개를 실을 수 있고, 1월 홋카이도 승강장에서 스키 가방을 들고 환승하는 일은 누구에게나 번거롭습니다. 둘째는 예약입니다. 전철과 버스 경로만 예약 없이 갈 수 있고 나머지는 모두 출국 전에 예약해야 합니다. 운전한다면 2시간은 눈길과 빙판에 익숙하다는 전제입니다.`,
  },
  {
    q: "니세코 스키 강습은 미리 예약해야 하나요?",
    a: `네. 단순한 권장 사항이 아니라 공식 규정이 있습니다. 리조트 직영 니세코 인터내셔널 스노스포츠 스쿨은 ${SEASON}에 확인한 페이지에서 "성수기에는 종일 강습만 사전 예약할 수 있다"고 밝히며, 스키 스쿨의 성수기는 ${LESSON_PEAK}입니다. 리프트권 성수기와는 다릅니다. 1월 하순의 반나절 강습은 미리 예약할 수 있지만, 12월 20일이나 2월 8일의 반나절은 현장에서 문의해야 합니다. 그 주에 반나절만 가능하다면 종일을 예약하고 일찍 끝내거나 날짜를 옮기세요. 스쿨은 잠정 일정으로 2026년 11월 28일~2027년 4월 11일 운영하며 그룹, 개인, 맞춤 프로그램이 있고 2026-27 예약이 열려 있습니다. 재판매 업체의 개인 강습은 별도 예약이며 해외 카드로 결제할 수 있어, 리조트 스쿨이 찬 날에 유용합니다.`,
  },
];

const nisekoSameTrip: KlookTripPrepItem[] = [
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩에서 eSIM 보기 →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "니세코에서는 날씨에 따라 하루 일정이 달라집니다. 상부 리프트는 바람으로 멈추고 폭풍이 오면 스키장 일부가 닫혔다 다시 열리며, 이런 운행 공지는 현장 게시판이 아니라 휴대폰으로 확인하게 됩니다.",
  },
  {
    label: "니세코 셔틀버스(신치토세 공항·삿포로)",
    ctaLabel: "니세코 셔틀 보기 →",
    url: klookFor(nisekoResortShuttleBus.url, LOCALE),
    why: "니세코 유나이티드 수치로 신치토세 직행버스는 2.5시간 ¥6,000, 전철과 버스는 3시간 ¥6,200입니다. 이 상품은 스키 장비와 1인당 가방 1개를 실을 수 있고, 국내선은 도착 후 45분, 국제선은 도착 후 90분의 여유를 두도록 요구하므로 항공편 도착 시간에 맞춰 예약하세요.",
  },
  {
    label: "JR 홋카이도 레일 패스",
    ctaLabel: "JR 홋카이도 레일 패스 보기 →",
    url: klookFor(jrHokkaidoRailPass.url, LOCALE),
    why: "홋카이도를 오래 여행하면서 니세코에 들를 때만 필요합니다. JR 홋카이도 기준 5일 ¥22,000부터이고 버스는 포함되지 않으므로, 공항과 리조트만 왕복한다면 건너뛰세요.",
  },
  {
    label: "니세코 그랜드 히라후 영어 스키·스노보드 강습(4시간 또는 6시간)",
    ctaLabel: "니세코 강습 보기 →",
    url: klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE),
    why: `공식 규정이 있는 예약입니다. 리조트 스쿨은 스키 스쿨 성수기인 ${LESSON_PEAK}에 종일 강습만 사전 예약을 받으므로, 그 주의 반나절은 재판매 업체나 현장 문의가 필요합니다.`,
  },
  {
    label: "니세코 스키·스노보드 렌털(Rhythm, 히라후)",
    ctaLabel: "니세코 렌털 보기 →",
    url: klookFor(nisekoSkiSnowboardRental.url, LOCALE),
    why: "출국 전에 장비를 예약하고 히라후 리프트 승강장 근처 대여점에서 받습니다. 첫날 아침을 스키를 타며 보낼지, 대여점 줄에서 보낼지가 달라집니다.",
  },
  {
    label: "니세코 호텔",
    ctaLabel: "클룩에서 니세코 호텔 보기 →",
    url: klookFor(japanWinterStayAreas[7].url, LOCALE),
    why: "다른 모든 일정을 좌우하는 숙소 예약입니다. 4개 스키장 중 어디서 자느냐에 따라 리프트까지 도보인지 셔틀인지가 정해지며, 니세코 유나이티드도 성수기 연휴는 일찍 매진된다고 밝힙니다.",
  },
];

// The H1 opens with the title's exact words, so the search result has one wording.
// 22 Nov 2026 (task-jtk-20261122-C01): the lift-pass number now sits in the title, and the
// three things the query asks about follow in search order (리프트권・렌탈・셔틀).
const TITLE = "니세코 스키 투어 2026-27: 리프트권 ¥13,500・렌탈";
const H1 = "니세코 스키 투어 2026-27: 리프트권 ¥13,500, 장비 대여, 삿포로·공항 셔틀버스";
const DESC =
  "니세코 스키 투어: 11월 28일 개장, 리프트권 1일 ¥8,800~¥13,500, 삿포로역 스키 셔틀버스 3시간 6분. 투어는 클룩 예약.";

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
{H1}
</h1>
          <p className={styles.heroSubtitle}>
하나의 패스로 이용할 수 있는 4개 스키장, 신치토세 공항에서 예약제 버스로 {AIRPORT_BUS}, 그리고 놓치기 쉬운 성수기 강습 사전 예약 규정(공식 안내).
</p>
          <div className={styles.heroBadges}>
            {[`업데이트 ${monthLabel(updated.iso, LOCALE)}`, "2026-27 시즌 공식 일정", "올 마운틴 리프트권 요금", "성수기 강습 예약 규정, 출처 표기"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
                <Disclosure />

        {/* Answer first: the first body paragraph, ahead of the booking box. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
<strong>니세코의 4개 스키장은 모두 {SEASON_OPEN}</strong>에 개장하며, 삿포로역에서 니세코 히라후까지는 예약제 스키 버스로 <strong>{SAPPORO_BUS}</strong>(편도 {SAPPORO_BUS_FARE}, {SAPPORO_BUS_PERIOD} 운행)이 걸립니다. 신치토세 공항에서는 예약제 직행버스로 {AIRPORT_BUS}이고, 올 마운틴 리프트권(올 마운틴 패스) 1일권은 성인 성수기 {PEAK_DAY}입니다. 삿포로에 숙박한다면 왕복 버스와 그랜드 히라후 6시간 리프트권이 포함된 당일 투어를, 니세코에 숙박한다면 공항 셔틀버스·장비 대여·강습을 각각 예약하는 편이 좋습니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["항목", "2026-27 수치", "출처"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {answerRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            최종 확인일: {REREAD_ISO} · https://www.niseko.ne.jp/en/lift/ · https://www.niseko.ne.jp/en/getting-to-niseko/ · https://teikan.chuo-bus.co.jp/en/course/18958
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
삿포로 출발 니세코 스키 투어 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiSnowboardRental.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
니세코 렌털 예약 →
</KlookLink>
          </div>
        </section>

        <WinterBookingTop
          heading={"2026-27 겨울 니세코 스키 여행에서는 무엇을 예약해야 할까요?"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
크리스마스나 연말연시에 방문한다면 리프트 운행이 시작되는 11월 28일까지 강습과 공항 버스를 예약하세요. 스키 스쿨의 성수기가 12월 14일에 시작되고 그 기간에는 종일 강습만 사전 예약할 수 있습니다. 1~2월에 간다면 스키 스쿨의 두 번째 성수기(2월 6~12일)에 대비해 12월 31일까지 예약하세요. 이 기간은 <Link href="/ko/guides/attractions/sapporo-snow-festival-tours">2027 삿포로 눈축제</Link>(2월 4~11일)와 겹치므로 삿포로에서 숙박할 예정이라면 숙소도 미리 예약해 두세요.
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
신치토세 공항에서
</p>
                <p className={styles.verdictStatValue}>
예약제 버스 {AIRPORT_BUS}
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
성수기 {PEAK_DAY} / 얼리 시즌 {EARLY_DAY}
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
<strong>니세코 스키 여행</strong>은 이동 방법부터 정해야 합니다. 이동에 가장 많은 시간이 걸리기 때문입니다. 니세코 유나이티드 교통 안내에 따르면 <strong>신치토세 공항에서 니세코까지 예약제 직행버스로 {AIRPORT_BUS}, {AIRPORT_BUS_FARE}</strong>, 예약이 필요 없는 전철과 노선버스로 {AIRPORT_TRAIN}, {AIRPORT_TRAIN_FARE}, 렌터카나 전용 차량으로 2시간입니다. 니세코에는 <strong>하나의 패스로 이용할 수 있는 4개 스키장</strong>이 있습니다. <strong>그랜드 히라후</strong>(규모가 가장 크고 스키장 아래에 마을이 형성되어 있음), <strong>하나조노</strong>(가장 조용하고 리조트 직영 스키 스쿨이 있음), <strong>니세코 빌리지</strong>(스키장과 바로 연결되는 호텔), <strong>안누푸리</strong>(가장 넓고 완만함)입니다. 네 곳 모두 <strong>{SEASON_OPEN}</strong>에 개장하고 그랜드 히라후와 안누푸리는 <strong>2027년 5월 5일</strong>까지 운영합니다. 올 마운틴 리프트권 1일권은 <strong>{PEAK_FROM}~{PEAK_TO}</strong> 성수기에 <strong>{PEAK_DAY}</strong>, 얼리·스프링 시즌에 <strong>{EARLY_DAY}</strong>입니다. 현장 구매에 기대지 말고 미리 예약해야 하는 것은 <strong>스키 강습</strong>입니다. 리조트 스쿨은 스키 스쿨 성수기인 {LESSON_PEAK}에 종일 강습만 사전 예약할 수 있다고 밝힙니다. 모든 수치는 운영사 공식이며 확인일은 {SEASON}입니다.
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
삿포로 출발 니세코 당일 →
</KlookLink>
              <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
니세코 공항 셔틀 →
</KlookLink>
            </div>
          </div>
        </div>

        {/* Same-day ski bookings under the main CTA (Nov 16 Act). */}
        <WinterSkiSameDayCards page="niseko" />

                <KlookTripPrep
          label={"이번 여행에 필요한 예약"}
          heading={"니세코 여행 전에 예약해야 할 것"}
          intro={"모바일 데이터와 공항버스를 먼저 준비하세요. 이 목록의 나머지는 당일 일정이 바뀌어도 크게 문제 되지 않습니다. 니세코 유나이티드 교통 안내가 그 차이를 보여 줍니다. 예약제 버스는 2.5시간, 예약 없는 전철과 버스는 3시간입니다."}
          items={nisekoSameTrip}
        />

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="niseko" />

        <EsimCtaTop />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
가는 방법
</span>
          <h2 className={styles.sectionTitle}>
신치토세 공항에서 니세코까지 어떻게 가나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
대부분에게 답은 <strong>예약제 직행버스 {AIRPORT_BUS}, {AIRPORT_BUS_FARE}</strong>이며 니세코 유나이티드 공식 수치입니다. 리조트는 다섯 가지 방법을 공개하는데, 차이는 이동 시간(2~3.5시간)보다 <strong>예약 없이 갈 수 있는가</strong>와 <strong>스키 가방을 어떻게 옮길 것인가</strong>에 있습니다.
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
표의 시간과 요금은 모두 니세코 유나이티드의 “Getting to Niseko” 페이지 기준이며 확인일은 {SEASON}입니다. 비고 열은 해설입니다. 표에는 없고 상품 페이지에서만 알 수 있는 것이 하나 있습니다. 해당 버스가 스키 장비와 1인당 짐을 얼마나 실을 수 있는가입니다. 리조트 셔틀 상품은 짐 1개와 장비를 명시하고 있고, 이 점이 전철과 다른 점입니다.
</p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            최종 확인일: {REREAD_ISO} · https://www.niseko.ne.jp/en/getting-to-niseko/
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
니세코 리조트 셔틀 →
</KlookLink>
            <KlookLink href={klookFor(hokkaidoPrivateCarCharterNiseko.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
니세코 전용 차량 →
</KlookLink>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
신치토세 이동 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
시즌
</span>
          <h2 className={styles.sectionTitle}>
2026-27 시즌 니세코 스키장 개장일과 폐장일은 언제인가요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
4개 스키장 모두 <strong>{SEASON_OPEN}</strong>에 개장하지만 폐장일은 서로 다릅니다. 또한 리프트권 예약 시에는 개장일보다 5개 <strong>요금 적용 기간</strong>이 더 중요합니다. 성수기 구간에 크리스마스, 연말연시, 1월 전체, 2월 전체가 들어가기 때문입니다.
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
모든 날짜는 니세코 유나이티드 공식이며 확인일은 {SEASON}입니다. 리조트는 폐장일을 예정일로 안내하며 홋카이도의 봄철 날씨에 따라 바뀔 수 있습니다. 늦은 시즌 예약 전에 다시 볼 부분은 <strong>니세코 빌리지 4월 4일, 하나조노 4월 11일 폐장</strong>이고 그랜드 히라후와 안누푸리는 5월 5일까지라는 점입니다.
</p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            최종 확인일: {REREAD_ISO} · https://www.niseko.ne.jp/en/lift/
          </p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
리프트권
</span>
          <h2 className={styles.sectionTitle}>
니세코 리프트권 가격은?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>2026-27 시즌 성인 1일권은 {EARLY_DAY}(얼리·스프링 시즌)~{PEAK_DAY}(성수기 {PEAK_FROM}~{PEAK_TO})입니다.</strong> 4개 스키장을 모두 포함하는 <strong>올 마운틴 리프트권</strong> 1일권은 시기에 따라 성인 <strong>{EARLY_DAY}</strong>부터 <strong>{PEAK_DAY}</strong>까지입니다. 13~15세 청소년과 65세 이상 시니어는 서로 같은 요금이 적용되며, 흔치 않은 요금 체계이니 청소년이나 시니어와 함께 여행한다면 알아 두세요.
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
<strong>계획에 영향을 주는 운영 규정이 하나 있습니다.</strong> 2026년 11월 28일~12월 11일 얼리 시즌 패스는 겨울 중 가장 저렴하지만 니세코 유나이티드 안내에 따르면 <strong>온라인으로 판매되지 않습니다</strong>. 이 기간의 최저가 리프트권은 도착 후 매표소에서 사야 하며, 집에서 미리 확보할 수 없습니다. 여러 날 쓸 수 있는 리프트권은 최대 7일권까지 있고 온라인 전용 50시간권도 있지만, 여기서는 1일권만 싣습니다. 모든 가격 확인일 {REREAD}.
</p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            최종 확인일: {REREAD_ISO} · https://www.niseko.ne.jp/en/lift/
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
히라후 리프트권 + 버스 일정 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiSnowboardRental.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
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
<strong>네. 단순한 권장 사항이 아니라 공식 규정이 있습니다.</strong> 리조트 직영 <strong>니세코 인터내셔널 스노스포츠 스쿨</strong>은 {SEASON}에 확인한 페이지에서 이렇게 밝힙니다. <em>“성수기에는 종일 강습만 사전 예약할 수 있습니다.”</em> 스키 스쿨의 성수기는 <strong>{LESSON_PEAK}</strong>로 리프트권 성수기({PEAK_FROM}~{PEAK_TO})와 다릅니다. 크리스마스와 연말연시가 포함된 주, 2월 6~12일 주의 반나절 강습은 예약이 아니라 현장 문의입니다.
</p>
          <p className={styles.bodyText}>
가족이나 초보자에게는 이 페이지에서 가장 중요한 문장입니다. 평소처럼 세운 계획이 뒤집히기 때문입니다. 그 주에 체력이나 아이들 사정으로 반나절 강습이 더 맞다면 세 가지 선택이 있습니다. 종일을 예약하고 점심에 끝내거나, 스키 스쿨의 일반 기간(12월 8~13일, 1월 4일~2월 5일, 2월 13~28일)로 옮기거나, 재판매 업체로 예약하세요. 재판매 업체 상품은 별도 예약이며, 요금은 본인 통화로 표시되고 영어로 내용을 확인할 수 있습니다. 스쿨은 잠정 일정으로 <strong>{SEASON_OPEN}~2027년 4월 11일</strong> 운영하며 그룹, 개인, 맞춤 프로그램이 있고 2026-27 예약이 열려 있습니다.
</p>
          <p className={styles.bodyText}>
스쿨의 개인 강습은 최대 6명 그룹당 요금이며 확인일은 {SEASON}입니다. 6시간 니세코 클래식은 성수기 <strong>¥120,000</strong>, 레귤러 시즌 ¥93,000, 얼리·스프링 시즌 ¥87,000입니다. 오전 강습은 ¥93,000, ¥71,000, ¥59,000, 오후 강습은 ¥55,000, ¥43,000, ¥43,000입니다. 그룹 강습은 별도 요금이고 11월 28일~12월 7일에는 운영하지 않습니다. 재판매 업체 가격은 상품 페이지에서 날짜별로 확인하세요.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
히라후 영어 강습 →
</KlookLink>
            <KlookLink href={klookFor(rhythmNisekoPrivateSkiLesson.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
Rhythm 개인 강습 →
</KlookLink>
            <KlookLink href={klookFor(nisekoRusutsuKiroroPrivateLesson.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
니세코 / 루스쓰 / 키로로 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
4개 스키장
</span>
          <h2 className={styles.sectionTitle}>
니세코에서는 어디에 묵어야 하나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>특별한 이유가 없다면 그랜드 히라후입니다.</strong> 하나로 연결된 4개 스키장 중 규모가 가장 크고 마을이 형성된 유일한 곳이라 저녁 식사하러 셔틀을 타지 않고 걸어갈 수 있습니다. 나머지 세 곳도 각각 장점이 뚜렷하며, 선택에 필요한 내용은 마지막 열에 있습니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["스키장", "특징", "추천 대상", "알아 둘 점"].map((h) => (
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
스키장 이름과 폐장일은 니세코 유나이티드, 그랜드 히라후 코스 수치는 그랜드 히라후 공식입니다. 코스 22개(초급 9, 중급 6, 상급 7), 곤돌라 2기와 체어리프트 7기, 표고차 940 m(정상 1,200 m, 베이스 260 m), 135 ha, 최장 코스 5,300 m, 최대 경사 40°입니다. 확인일은 둘 다 {OWN}입니다. 니세코 유나이티드는 인기 숙소와 성수기 연휴가 일찍 매진된다고 밝히지만 얼마나 일찍인지는 공개하지 않아 여기에도 싣지 않습니다.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(japanWinterStayAreas[7].url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
니세코 호텔 보기 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiHotSpringTourFromSapporo.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
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
<strong>눈이 가장 많은 달은 1월, 가성비는 3월, 한산한 달은 12월입니다.</strong> 강설량 열은 그랜드 히라후의 가장 최근 종료된 시즌 월별 누적치로 약 850 m의 시라카바 코스에서 측정했습니다. 혼잡도와 평가 열은 니세코 유나이티드의 월별 안내와 공개된 요금 기간을 따랐습니다.
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
강설량은 여러 해 평균이 아니라 한 시즌 수치이며, 리조트가 산의 한 지점에서 측정한 값입니다. 예보가 아니라 겨울 전체의 강설 경향을 보여 주는 자료로 보세요. 이 표의 확인일은 {OWN}입니다. <strong>야간 스키</strong>는 2026년 12월 12일~2027년 3월 22일이므로 개장 후 첫 2주와 요금이 저렴한 4월에는 없습니다.
</p>
        </section>

                <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>
투어 여부
</span>
          <h2 className={styles.sectionTitle}>
투어를 예약해야 하나요, 아니면 직접 갈 수 있나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
어디에 묵느냐에 따라 완전히 달라집니다. “니세코 스키 투어”를 찾는 사람이 실제로 고민하는 것도 이 문제입니다. 상황에 따라 필요한 예약이 네 가지로 나뉩니다.
</p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
니세코에 묵는다면 투어는 필요 없습니다
</p>
              <p className={styles.whoForDesc}>
공항 버스, 장비, 원하면 강습을 예약하고 패스를 사면 나머지는 따로 준비할 것이 거의 없습니다. 4개 스키장이 패스 하나로 연결되어 있습니다. 마감이 있는 예약은 교통편, 성수기 강습, 숙소뿐입니다.
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
삿포로에 묵는다면 투어를 예약하세요
</p>
              <p className={styles.whoForDesc}>
가이드 투어가 꼭 필요한 경우입니다. 니세코 유나이티드 수치로 편도 2~3.5시간이라 당일치기를 직접 계획하면 낮 시간 대부분을 버스에서 보내게 됩니다. 리프트권 + 버스 상품은 그랜드 히라후에서 정해진 시간 동안 탈 수 있도록 교통편과 리프트권을 한 가격에 판매합니다.
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
일행 중 일부만 스키를 타나요? 차량 단위로 예약하세요
</p>
              <p className={styles.whoForDesc}>
일행 중 일부만 스키를 타는 경우가 니세코에서 가장 준비하기 어렵고, 1인당 요금 상품은 맞지 않습니다. 전용 차량은 차량당 요금이라 4명 이상이면 합리적입니다.
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
어느 쪽이든 날씨에 따른 취소 규정을 확인하세요
</p>
              <p className={styles.whoForDesc}>
니세코의 특징입니다. 상부 리프트는 강풍으로 자주 멈추므로, 운이 나빠서 생기는 일이 아니라 처음부터 계획에 넣어 두어야 할 조건입니다. 예약 전에 운영사가 취소할 때와 내가 취소할 때 어떻게 되는지 읽으세요. 상품과 날짜마다 달라 이 페이지에서는 안내할 수 없습니다.
</p>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
위 어디에도 속하지 않는 준비물이 하나 있습니다. <strong>모바일 데이터</strong>입니다. 니세코에서는 일본의 어떤 스키 여행보다 날씨가 하루를 좌우합니다. 폭풍으로 리프트가 멈췄다 재개되고, 일부 스키장이 닫히고, 도로 이동이 늦어지며, 이런 운행 공지는 모두 현장 게시판이 아니라 휴대폰으로 확인하게 됩니다. <KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>클룩 eSIM 보기 →</KlookLink> <Link href="/ko/guides/esim/best-esim-japan">일본 eSIM 추천 가이드</Link>에서 다른 선택지와 비교하고, <Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en">일본 스키 여행자 보험 가이드(영어)</Link>에서 리프트권 전에 챙길 또 하나의 문제인 보험의 스노스포츠 보장 여부와 조건을 확인하세요.
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
2월 여행이라면 눈과 함께 도시도 볼 수 있습니다. <Link href="/ko/guides/attractions/sapporo-snow-festival-tours">삿포로 눈축제 가이드</Link>는 2027년 2월 4~11일의 8일을 다루고, <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">삿포로 출발 오타루 당일 여행(영어)</Link>은 공항으로 돌아가는 길에 넣기 가장 쉬운 하루 일정입니다. 일주일 여행에서 눈이 일부일 뿐이라면 <Link href="/ko/guides/attractions/hokkaido-7-day-itinerary">홋카이도 7일 여행 가이드</Link>에 하루를 스키로 바꾸는 방법이 있고, <Link href="/ko/guides/attractions/japan-winter-itinerary">일본 겨울 여행 일정</Link>은 홋카이도를 전국 여행의 한 구간으로 다룹니다.
</p>
          <p className={styles.bodyText}>
도쿄를 거치나요? 스키가 처음이라 홋카이도에 가기 전에 시험해 보고 싶다면 <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">도쿄 출발 갈라 유자와 스키(영어)</Link>로 부담 없이 체험할 수 있습니다. 일행 중 스키를 타지 않는 사람에게는 <Link href="/ko/guides/attractions/jigokudani-snow-monkey-tour">지고쿠다니 원숭이 공원 투어</Link>와 <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">다카야마와 시라카와고 투어(영어)</Link>가 스키를 타지 않는 눈 여행지가 되고, <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">도쿄 일루미네이션(영어)</Link> 가이드는 비행 전후의 저녁을 다룹니다.
</p>
        </section>

        <EsimCtaBottom />

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"실제 예약 가능한 니세코 상품"}
          intro={"같은 여행을 즐기는 네 가지 방식입니다. 패스가 포함된 삿포로 출발 그랜드 히라후 6시간 스키 투어, 숙박이 포함된 2~3박 투어, 일부만 스키를 타는 일행을 위한 전용 차량, 그리고 상부 리프트가 바람으로 멈춘 날 아침을 위한 스키 없는 홋카이도 일정입니다."}
          tours={[withKlookLocale(nisekoHirafuLiftPassBusTour, LOCALE, { title: "삿포로 출발 니세코 그랜드 히라후 스키 투어(6시간 리프트권 + 버스)", desc: "삿포로 시내 왕복 버스와 리프트권을 한 번에 예약하는 그랜드 히라후 6시간 상품으로, 시내 여러 곳에서 탑승합니다" }), withKlookLocale(nisekoSkiHotSpringTourFromSapporo, LOCALE, { title: "삿포로 출발 니세코 스키·온천 투어(1박 2일 / 2박 3일)", desc: "니세코 하루로는 부족하다고 느끼는 여행자를 위한 여러 날 일정으로, 소규모 그룹, 빌라 숙박, 삿포로 출발입니다" }), withKlookLocale(hokkaidoPrivateCarCharterNiseko, LOCALE, { title: "홋카이도 전용 차량(삿포로 / 신치토세 – 니세코)", desc: "삿포로나 공항과 니세코, 루스쓰, 도야호, 후라노를 잇는 기사 포함 7~14인승 차량으로, 시간표가 아니라 원하는 시간에 출발합니다" }), withKlookLocale(noboribetsuToyaNisekoDayTour, LOCALE, { title: "삿포로 출발 노보리베쓰, 도야호, 니세코 당일 여행", desc: "노보리베쓰 지옥계곡, 도야호, 니세코 일대를 하루에 둘러보는 가이드 투어로, 스키 여행 중 쉬는 날이나 강풍으로 리프트가 멈춘 날의 대안입니다" })]}
        />

                <Related items={[{ href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "도쿄 출발 갈라 유자와 스키 당일 여행: 71분, 리프트 ¥8,000 (영어)" }, { href: "/guides/money/best-travel-insurance-japan", title: "일본 여행자 보험 추천 2026: 누구에게 무엇이 필요한가 (영어)" }, { href: "/guides/money/japan-ski-travel-insurance", title: "일본 스키 여행자 보험: 일반 보험이 제외하는 것 (영어)" }, { href: "/ko/guides/attractions/hokkaido-7-day-itinerary", title: "홋카이도 7일 여행: 일자별 추천 일정" }, { href: "/ko/guides/attractions/sapporo-snow-festival-tours", title: "삿포로 눈축제 투어(2027): 2월 4~11일, 무료 행사장" }, { href: "/ko/guides/attractions/japan-winter-itinerary", title: "일본 겨울 여행 12일 일정(2027): 일자별 코스" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "삿포로 출발 오타루 당일 여행(2027): ¥800, JR 33분 (영어)" }, { href: "/ko/guides/attractions/jigokudani-snow-monkey-tour", title: "도쿄 출발 지고쿠다니 원숭이 공원 가이드(2027)" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "다카야마와 시라카와고 투어(2027): 어디서 출발할까 (영어)" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "도쿄 일루미네이션: 일정, 시간, 무료 명소 (영어)" }, { href: "/ko/guides/esim/best-esim-japan", title: "일본 eSIM 추천(2026): 업체, 가격, 선택법" }, { href: "/guides/attractions", title: "일본의 다른 볼거리 → (영어)" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
4개 스키장, 하나의 리프트권, 그리고 강습 사전 예약 규정
</h2>
            <p className={styles.ctaBannerDesc}>
리프트는 {SEASON_OPEN}에 운행을 시작하고 성수기 요금은 {PEAK_FROM}에 시작합니다. 교통편과 강습은 날짜를 정해 미리 예약해야 합니다. 12월 14일~1월 3일과 2월 6~12일에 리조트 스쿨은 종일 강습만 사전 예약을 받습니다.
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
니세코 스키 일정 보기 →
</KlookLink>
              <KlookLink href={klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
니세코 강습 예약 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
