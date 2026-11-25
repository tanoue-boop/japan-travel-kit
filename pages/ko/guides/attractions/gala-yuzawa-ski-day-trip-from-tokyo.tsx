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
import KlookTripPrep from "../../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import {
  galaNaebaSkiDayTripTokyo,
  galaYuzawaLiftTicket,
  galaYuzawaSkiLesson,
  hakubaSkiResortDayTourTokyo,
  hanedaLimousineBus,
  jrEastPass,
  jrTokyoWidePass,
  klookEsim,
  naritaExpressRoundTripUrl,
  shinkansenTokyoGalaYuzawa,
  yuzawaIwapparaSkiDayTourTokyo,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo) section by
// section as of 2026-11-25 (task-jtk-20261125-TR03): same sections, tables, FAQ and Klook CTAs in
// the same places. Every figure, date and source is the English page's (read 15 Nov 2026); nothing
// is added. Title term: 갈라유자와 스키장 — the form Korean results and guides write (JR East's own
// Korean page writes "GALA 유자와").

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo";
const TITLE = "갈라유자와 스키장 2026-27: 도쿄 당일치기, JR 패스";
const H1 = "갈라유자와 스키장 2026-27: 도쿄에서 신칸센 당일치기, JR 패스, 가는 방법";
const DESC =
  "도쿄에서 갈라유자와 스키장까지 신칸센 직행 71분, JR 패스 사용 가능. 리프트권 ¥8,000, 12월 19일 개장, 당일치기 비용 정리.";

const OWN_ISO = "2026-11-15";
const OWN = dateLabel(OWN_ISO, LOCALE);
const JRP_7DAY = "¥50,000";
const EAST_PASS_5DAY = "¥35,000";
const SLED = "¥2,500";
const FASTEST = "71분";
const SLOPES_OPEN = "2026년 12월 19일";
const SLOPES_CLOSE = "2027년 5월 5일";
const SIGHTSEEING_OPEN = "2026년 12월 12일";
const LIFT_WINDOW = "¥8,000";
const LIFT_WEB = "¥7,500";
const SKI_SET = "¥6,500";
const WEAR = "¥5,500";
const PASS_ADULT = "¥16,000";
const JR_EXAMPLE = "약 ¥21,500";

const LIFT_URL = klookFor(galaYuzawaLiftTicket.url, LOCALE);
const LESSON_URL = klookFor(galaYuzawaSkiLesson.url, LOCALE);
const TRAIN_URL = klookFor(shinkansenTokyoGalaYuzawa.url, LOCALE);
const WIDE_URL = klookFor(jrTokyoWidePass.url, LOCALE);
const EAST_URL = klookFor(jrEastPass.url, LOCALE);
const IWAPPARA_URL = klookFor(yuzawaIwapparaSkiDayTourTokyo.url, LOCALE);
const CHARTER_URL = klookFor(galaNaebaSkiDayTripTokyo.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const accessRows = [
  {
    leg: "추천: 도쿄역 → 갈라유자와역, 조에쓰 신칸센 직행(다니가와)",
    time: `가장 빠른 열차로 ${FASTEST}. 예: 다니가와 71호, 도쿄 6:24 → 갈라유자와 7:35. JR 동일본 안내 페이지에는 다니가와로 약 1시간 20분이라고도 적혀 있습니다`,
    trains: "시즌 한정: 2026년 12월 12일부터 JR 동일본이 일반 다니가와 열차를 갈라유자와까지 연장하고 임시 열차를 추가합니다. 우에노와 오미야에도 정차합니다",
    cost: `JAPAN RAIL PASS, JR 도쿄 와이드 패스(${PASS_ADULT}), JR EAST PASS로 이용할 수 있습니다. 패스가 없으면 결제 화면에 표시되는 신칸센 요금`,
    note: "갈라유자와역은 스키장 건물 안에 만든 시즌 한정 신칸센역이라, 개찰구를 나오면 리프트권과 장비 대여를 판매하는 건물입니다. 버스, 환승, 택시가 필요 없습니다. 모든 다니가와 열차가 갈라유자와까지 가지는 않으므로 종착역이 갈라유자와로 표시된 열차를 고르세요.",
  },
  {
    leg: "도쿄역 → 에치고유자와역, 이후 무료 셔틀버스",
    time: "에치고유자와까지 신칸센, 이후 스키장 무료 셔틀버스로 약 10분",
    trains: "에치고유자와는 갈라유자와 바로 앞의 연중 운영 조에쓰 신칸센역입니다",
    cost: "셔틀버스는 무료이고, 열차 구간은 같은 세 가지 패스로 이용할 수 있습니다",
    note: "원하는 직행 열차가 만석이거나 그날 운행하지 않을 때의 대안이며, 갈라유자와의 시즌 밖에는 유일한 방법입니다. JR 동일본 안내에 따르면 갈라유자와역은 겨울과 봄에만 운영하고, 에치고유자와는 한 정거장 앞의 연중 운영역입니다.",
  },
  {
    leg: "도쿄 출발 스키 버스 투어(당일)",
    time: "도쿄 승차부터 하차까지 11~12.5시간",
    trains: "상품 페이지에 표시된 출발일",
    cost: "1인 요금, 날짜에 따라 달라집니다. 원하는 날짜로 상품 페이지에서 확인하세요",
    note: "더 저렴한 방법이 아니라 다른 상품입니다. 버스 투어는 갈라유자와가 아니라 같은 유자와 지역의 이와파라 스키장으로 가며, 왕복 교통이 한 번에 예약되고 장비 대여와 강습은 옵션입니다. 신칸센보다 시간이 걸리지만 따로 준비할 것이 없습니다.",
  },
  {
    leg: "갈라유자와 또는 나에바 전용 차량",
    time: "10시간 차량 대절, 숙소 앞에서 출발해 숙소 앞까지",
    trains: "운영사가 받는 날짜라면 언제든",
    cost: "차량 1대 요금, 날짜에 따라 달라집니다. 상품 페이지에서 확인하세요",
    note: "장비를 가진 가족이나 일행, 또는 첫차보다 이른 출발에 맞는 방법입니다. 예약할 때 스키장을 고르므로 같은 상품으로 갈라유자와와 나에바 중 하나를 선택할 수 있습니다.",
  },
];

const costRows = [
  {
    item: "장비 없이 가는 어른의 스키·스노보드 하루(리프트권 + 장비 세트 + 스키복, 온라인 요금)",
    price: "¥19,500 + 열차 요금",
    note: `당일치기 여행자 대부분에게 해당하는 금액입니다. 리프트권 ${LIFT_WEB} + 스키·보드 세트 ${SKI_SET} + 스키복 상하의 ${WEAR}. 매표소에서 리프트권을 사면 ${LIFT_WINDOW}이므로 ¥20,000입니다.`,
  },
  {
    item: "신칸센, 도쿄 ⇄ 갈라유자와",
    price: "패스, 또는 결제 화면에 표시되는 요금",
    note: `JR 도쿄 와이드 패스는 3일 ${PASS_ADULT}입니다. JR 동일본이 제시한 예시는 갈라유자와 왕복과 닛코 왕복을 지정석으로 이용하면 ${JR_EXAMPLE}입니다. JR 동일본이 2026년 3월 14일에 운임을 개정했으므로 편도 요금은 날짜를 정해 결제 화면에서 확인하세요.`,
  },
  {
    item: "곤돌라·리프트권 1일(어른)",
    price: `온라인 ${LIFT_WEB} / 매표소 ${LIFT_WINDOW}`,
    note: "초등학생(어린이)은 온라인 ¥3,500 / 매표소 ¥4,000입니다. 미취학 아동은 요금을 내는 어른 1명당 2명까지 무료입니다.",
  },
  {
    item: "스키 3종 세트 또는 스노보드 2종 세트, 1일",
    price: SKI_SET,
    note: "초등학생 이하는 ¥4,000입니다. 2일 요금은 정확히 2배입니다.",
  },
  {
    item: "스키복(상의와 하의), 1일",
    price: WEAR,
    note: "초등학생 이하는 ¥3,000입니다.",
  },
  {
    item: "고글 + 헬멧, 1일",
    price: "¥1,800 + ¥2,300",
    note: "세트와 별도로 단품으로 대여합니다.",
  },
  {
    item: "스키를 타지 않는 하루: 곤돌라·바루슈권 + 썰매",
    price: `온라인 ¥5,500 + ${SLED}`,
    note: "곤돌라·바루슈권(매표소 ¥6,500)으로 곤돌라 정상의 눈놀이 공원과 바루슈 스카이 리프트를 이용할 수 있습니다. 썰매는 곤돌라 정상역에서 대여합니다.",
  },
  {
    item: "SPA 갈라노유(온천과 수영장), 어른",
    price: "¥1,500",
    note: "역 건물 안에 있어 돌아가는 열차를 기다리는 동안 이용하기 좋습니다. 금액은 JR 동일본의 갈라유자와 여행 페이지 기준입니다.",
  },
];

const seasonRows = [
  { what: "슬로프 영업(스키와 스노보드)", detail: `${SLOPES_OPEN} → ${SLOPES_CLOSE}` },
  { what: "관광 영업 기간", detail: `${SIGHTSEEING_OPEN} → 2026년 12월 18일: 곤돌라와 관광 리프트만 운행하며, 눈이 쌓여 있어도 스키는 탈 수 없습니다` },
  { what: "갈라유자와행 신칸센 직행", detail: "갈라유자와가 영업을 시작하는 2026년 12월 12일부터 일반 다니가와 열차를 갈라유자와까지 연장하고 임시 열차를 추가합니다(JR 동일본, 2026년 10월 22일). 이 안내에 종료일은 없으며, 역은 겨울과 봄에만 운영합니다" },
  { what: "야간 스키 후 돌아가는 열차", detail: "다니가와 198호, 갈라유자와 20:19 → 도쿄 21:40, 2027년 1월 16일·30일과 2월 13일·27일" },
  { what: "JR SKISKI 신칸센 + 리프트권 패키지", detail: "JR 동일본 여행 사이트에는 아직 \"Coming Soon\"으로 표시되어 있고, 2026년 11월 중순부터 예약 접수 예정입니다" },
  { what: "일일 영업시간", detail: "2026-27 시즌 일일 영업시간은 공식 발표 전입니다. 적설과 날씨에 따라 영업 기간과 시간이 바뀔 수 있습니다" },
];

const liftRows = [
  { ticket: "곤돌라·리프트권 1일, 어른", window: LIFT_WINDOW, web: LIFT_WEB, note: "기본 리프트권입니다. 이번 시즌 영업하는 두 에어리어의 모든 곤돌라와 리프트에 사용할 수 있습니다." },
  { ticket: "곤돌라·리프트권 1일, 초등학생(어린이)", window: "¥4,000", web: "¥3,500", note: "매표소에서는 어른 요금의 절반이고, 온라인은 ¥500 더 저렴합니다." },
  { ticket: "곤돌라·바루슈권, 어른", window: "¥6,500", web: "¥5,500", note: "곤돌라와 바루슈 4인승 리프트만 탈 수 있는 저렴한 리프트권입니다. 첫 스키 날, 눈놀이, 짧은 오후에 맞고, 산 전체를 타기에는 맞지 않습니다." },
  { ticket: "곤돌라·바루슈권, 초등학생(어린이)", window: "¥3,400", web: "¥2,900", note: "이 스키장에서 어린이가 리프트권을 가지고 설원에 나가는 가장 저렴한 방법입니다." },
  { ticket: "4시간권, 어른", window: "¥7,500", web: "¥7,000", note: "매표소에서 1일권보다 ¥500 저렴할 뿐이므로, 예산을 줄이는 용도가 아니라 늦게 도착하는 날에 맞습니다." },
  { ticket: "4시간권, 초등학생(어린이)", window: "¥3,500", web: "¥3,000", note: "어린 아이가 하루에 타는 시간은 대개 4시간 안쪽이므로 같은 판단이 적용됩니다." },
  { ticket: "미취학 아동", window: "무료", web: "무료", note: "요금을 내는 어른 1명당 2명까지 무료이고, 세 번째 아이는 초등학생 요금입니다. 스키장 자체 규정입니다." },
];

const rentalRows = [
  { item: "스키 3종 세트(스키, 부츠, 폴)", adult: `1일 ${SKI_SET}`, child: "1일 ¥4,000(초등학생 이하)", note: "2일은 어른 ¥13,000, 어린이 ¥8,000으로 정확히 2배이므로, 여러 날 할인은 없습니다." },
  { item: "스노보드 2종 세트(보드, 부츠)", adult: `1일 ${SKI_SET}`, child: "1일 ¥4,000(초등학생 이하)", note: "연령과 기간 모두 스키 세트와 같은 요금입니다." },
  { item: "스키복(상의와 하의)", adult: `1일 ${WEAR}`, child: "1일 ¥3,000(초등학생 이하)", note: "도쿄에서 당일치기하는 여행자 대부분에게 필요하지만 예산에서 빠지기 쉬운 항목입니다. 비행기에서 입고 온 코트로 스키를 탈 수는 없습니다." },
  { item: "고글과 헬멧", adult: "1일 고글 ¥1,800, 헬멧 ¥2,300", child: "같은 요금", note: "2일은 ¥3,600과 ¥4,600입니다. 세트에 포함되지 않고 단품으로 대여하므로, 장비를 모두 갖추면 위 두 항목보다 비용이 더 듭니다." },
  { item: "PICK UP BOX", adult: "1인 +¥1,000", child: "1인 +¥1,000", note: "장비 대여점에서 줄을 서지 않고 장비를 받는 스키장 자체 서비스로, 7:30~12:00에 이용합니다. 온라인 예약은 개장 1개월 전에 열리고 이용 2일 전 정오에 마감합니다. 카드 사전 결제만 가능하고 수량이 한정되며, 정오 마감 이후 취소하면 100% 수수료가 붙습니다. 대여 기간은 12월 19일~3월 31일입니다." },
];

const mountainRows = [
  { what: "영업 코스", detail: "전체 16개 중 12개: 센트럴 에어리어 5개, 노스 에어리어 6개, 그리고 팔콘 다운힐 코스" },
  { what: "남부 에어리어(South Area)", detail: "4개 코스가 2026-27 시즌 휴업합니다. 스키장 코스 지도 페이지에 '南エリアの営業を休止いたします(남부 에어리어 영업을 휴지합니다)'라고 적혀 있습니다" },
  { what: "난이도", detail: "초급 35%, 중급 45%, 상급 20%(스키장 전체 기준, 스키장 발표)" },
  { what: "리프트", detail: "11기. 역 건물에서 출발하는 8인승 딜리전스 곤돌라 포함" },
  { what: "최장 활주 거리", detail: "2,500m, 팔콘 다운힐 코스" },
  { what: "표고", detail: "정상 1,181m, 기슭 358m, 면적 70ha, 최대 경사 33°" },
  { what: "영업시간", detail: "2026-27 시즌 일일 영업시간은 공식 발표 전입니다. 장비 대여점은 12월 19일부터 7:30에 엽니다" },
];

const shapeRows = [
  {
    shape: "신칸센으로 직접",
    covers: "갈라유자와까지 열차, 리프트권과 장비 대여는 스키장이나 온라인에서 구매",
    verdict: "대부분의 사람에게 맞고, 설원에 있는 시간이 가장 깁니다",
    note: `가장 빠른 열차로 ${FASTEST}이고 역이 건물 안에 있습니다. 대신 좌석, 리프트권, 장비, 스키복 네 가지를 직접 사야 하고, 갈라유자와는 모든 리프트권을 매표소에서 온라인보다 ¥500 이상 비싸게 판매합니다.`,
  },
  {
    shape: "신칸센 + JR 동일본 패스",
    covers: "열차 구간을 도쿄 와이드 패스나 JR EAST PASS로 이용",
    verdict: "갈라유자와가 당일치기 2~3곳 중 하나일 때만 계산해 볼 가치가 있고, 갈라유자와 하나뿐이라면 맞지 않습니다",
    note: `패스는 연속 3일 ${PASS_ADULT}이고, JR 동일본의 계산 예시(갈라유자와 왕복 + 닛코 왕복, 지정석)는 ${JR_EXAMPLE}입니다. 갈라유자와 하루만으로는 패스 가격에 미치지 않습니다.`,
  },
  {
    shape: "도쿄 출발 버스 투어(당일)",
    covers: "이와파라까지 왕복 교통을 한 번에 예약하고 눈놀이, 장비 대여, 강습은 옵션. 식사는 포함되지 않습니다",
    verdict: "처음 스키를 타는 날이거나, 네 가지를 따로 사지 않고 한 번에 예약하고 싶은 사람에게 맞습니다",
    note: "편도 시간이 신칸센보다 길고, 갈라유자와가 아니라 같은 지역의 이웃 스키장으로 갑니다. 당일 아침에 따로 준비할 것이 없다는 점이 이 상품의 장점입니다.",
  },
  {
    shape: "전용 차량",
    covers: "숙소에서 갈라유자와 또는 나에바까지, 스키장은 예약할 때 선택",
    verdict: "일행, 어린 아이가 있는 가족, 첫차보다 이른 출발에 맞습니다",
    note: "1인이 아니라 차량 1대 요금이라 4명이면 부담이 크지 않습니다. 장비를 메고 도쿄역을 지나지 않고 트렁크에 싣고 갈 수 있는 유일한 방법입니다.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도쿄에서 갈라유자와 스키장까지 어떻게 가나요?",
    a: `도쿄역에서 조에쓰 신칸센(다니가와)을 타고 갈라유자와역까지 바로 갑니다. 가장 빠른 열차로 ${FASTEST}이고 환승이 없습니다. 역이 스키장 건물 안에 있고 곤돌라도 같은 건물에서 출발합니다. 직행 열차는 시즌 한정으로, 스키장이 영업을 시작하는 2026년 12월 12일부터 JR 동일본이 일반 다니가와 열차를 갈라유자와까지 연장하고 임시 열차를 추가합니다. 열차가 에치고유자와에서 끝나거나 시즌 밖에 간다면 스키장 무료 셔틀버스로 약 10분이면 됩니다. 다른 방법은 도쿄 출발 버스 투어(같은 유자와 지역의 이와파라 스키장행)와 전용 차량입니다. ${OWN} 확인.`,
  },
  {
    q: "도쿄에서 갈라유자와까지 신칸센으로 얼마나 걸리나요?",
    a: `가장 빠른 열차로 ${FASTEST}이며, 스키장과 JR 동일본 모두 같은 시간을 안내합니다. JR 동일본의 2026년 10월 22일 겨울 열차 안내에 따르면 다니가와 71호는 도쿄 6:24 → 갈라유자와 7:35, 돌아오는 다니가와 86호는 갈라유자와 17:04 → 도쿄 18:20입니다. JR 동일본 안내 페이지에는 다니가와로 약 1시간 20분이라고도 적혀 있으므로 편도 71~80분으로 계획하세요. 야간 스키를 운영하는 4일 저녁에는 다니가와 198호가 갈라유자와를 20:19에 출발해 도쿄에 21:40에 도착합니다. ${OWN} 확인.`,
  },
  {
    q: "JR 패스로 갈라유자와까지 갈 수 있나요?",
    a: `네. 전국용 JAPAN RAIL PASS는 노조미와 미즈호를 제외한 JR 그룹의 모든 신칸센에 사용할 수 있으므로 갈라유자와행 조에쓰 신칸센도 이용할 수 있습니다(그란 클래스는 추가 요금). 7일 보통차권은 온라인 ${JRP_7DAY}입니다. JR 도쿄 와이드 패스(${PASS_ADULT}, 연속 3일)와 JR EAST PASS(${EAST_PASS_5DAY}, 5일)도 사용할 수 있으며, JR 동일본은 갈라유자와를 와이드 패스의 목적지로 소개합니다. 갈라유자와 하루만으로는 와이드 패스가 이득이 아닙니다. JR 동일본의 예시인 갈라유자와 왕복 + 닛코 왕복이 ${JR_EXAMPLE}입니다. ${OWN} 확인.`,
  },
  {
    q: "갈라유자와 2026-27 시즌은 언제 개장하나요?",
    a: `슬로프는 ${SLOPES_OPEN}에 개장하고 ${SLOPES_CLOSE}까지 영업할 예정입니다. ${SIGHTSEEING_OPEN}부터 2026년 12월 18일까지는 곤돌라와 관광 리프트만 운행하며, 눈이 쌓여 있어도 스키는 탈 수 없습니다. 신칸센 직행은 스키장과 같은 12월 12일에 시작합니다. 2026-27 시즌 일일 영업시간은 공식 발표 전이며, 갈라유자와는 적설과 날씨에 따라 영업 기간과 시간이 바뀔 수 있다고 안내합니다. ${OWN} 확인.`,
  },
  {
    q: "갈라유자와는 초보자나 스키를 타지 않는 사람에게도 괜찮나요?",
    a: `둘 다 괜찮습니다. 코스의 35%가 초급이고, 장비 대여점이 역 건물 안에 있으며, 영어 스키 강습도 예약할 수 있습니다. 스키를 타지 않는 사람은 곤돌라·바루슈권(온라인 ¥5,500, 매표소 ¥6,500)으로 곤돌라 정상의 눈놀이 공원, 썰매 대여(${SLED}), 다니가와 연봉이 보이는 전망대까지 가는 바루슈 스카이 리프트를 이용할 수 있습니다. 2026-27 시즌에는 남부 에어리어가 휴업하므로 16개 코스 중 12개가 영업합니다. ${OWN} 확인.`,
  },
];

const sameDayCards: KlookSameDayCard[] = [
  {
    kind: "열차",
    label: "도쿄 → 갈라유자와 신칸센 티켓",
    ctaLabel: "도쿄 → 갈라유자와 열차 확인 →",
    url: TRAIN_URL,
    why: "리프트권에는 열차가 포함되지 않습니다. 도쿄나 우에노에서 출발하는 다니가와 직행 좌석을 날짜별로 예약하고 QR 코드로 탑승합니다.",
  },
  {
    kind: "철도 패스",
    label: "JR 도쿄 와이드 패스(연속 3일)",
    ctaLabel: "도쿄 와이드 패스 확인 →",
    url: WIDE_URL,
    why: "JR 동일본에 따르면 갈라유자와까지 신칸센에 이 패스를 사용할 수 있습니다. 같은 3일 안에 당일치기를 하나 더 한다면 가격을 비교해 볼 만합니다.",
  },
  {
    kind: "eSIM",
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    url: ESIM_URL,
    why: "갈라유자와는 적설과 날씨에 따라 영업일과 시간이 바뀐다고 안내하고, 클룩 상품 페이지는 인터넷에 연결된 휴대폰으로 리프트권 바우처를 보여 달라고 안내합니다.",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    url: ESIM_URL,
    why: "갈라유자와는 적설과 날씨에 따라 영업일과 시간이 바뀐다고 안내하고, 2026-27 시즌 일일 영업시간은 아직 발표 전입니다. 시즌 한정 역에서 휴업 공지나 신칸센 지연 소식은 휴대폰으로만 확인할 수 있습니다.",
  },
  {
    label: "나리타 익스프레스(N'EX) 왕복 티켓",
    ctaLabel: "N'EX 왕복 확인 →",
    url: klookFor(naritaExpressRoundTripUrl, LOCALE),
    why: "갈라유자와행 조에쓰 신칸센이 출발하는 도쿄역까지 갑니다. 도착한 날부터 도쿄 와이드 패스를 쓴다면 필요 없습니다. JR 동일본에 따르면 이 패스로 N'EX 지정석을 이용할 수 있습니다.",
  },
  {
    label: "하네다 공항 – 도쿄 리무진 버스",
    ctaLabel: "리무진 버스 확인 →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "하네다 공항 버전으로, QR 코드로 탑승합니다. 스키 가방을 가지고 도착한다면 북쪽으로 가는 열차 전에 도쿄 숙소까지 짐을 옮겨야 하므로 쓸모가 있습니다.",
  },
  {
    label: "JR 도쿄 와이드 패스(연속 3일)",
    ctaLabel: "도쿄 와이드 패스 확인 →",
    url: WIDE_URL,
    why: "실제로 계산해 볼 만한 예약입니다. JR 동일본의 예시는 갈라유자와 왕복 + 닛코 왕복(지정석)이 약 ¥21,500이고, 패스는 연속 3일 ¥16,000입니다. 갈라유자와 하루에 당일치기 하나를 더하면 대체로 이득이 나기 시작합니다.",
  },
  {
    label: "도쿄 → 갈라유자와 신칸센 티켓",
    ctaLabel: "도쿄 → 갈라유자와 열차 확인 →",
    url: TRAIN_URL,
    why: "패스 없이 갈라유자와에 가는 날을 위한 상품으로, 도쿄나 우에노에서 출발하는 다니가와 직행 좌석을 날짜별로 예약하고 QR 코드로 탑승합니다. JR 동일본의 이른 임시 열차 다니가와 71호(도쿄 6:24)는 1~2월의 일부 주말과 공휴일에만 운행하므로, 이 열차에 맞춰 계획하기 전에 날짜를 확인하세요.",
  },
  {
    label: "갈라유자와 스키장 리프트권",
    ctaLabel: "갈라유자와 리프트권 확인 →",
    url: LIFT_URL,
    why: "갈라유자와의 곤돌라·리프트 1일권은 매표소에서 어른 ¥8,000, 온라인 ¥7,500이므로 미리 사면 ¥500 저렴합니다. 판매 대행 사이트는 해외 발급 카드로 결제할 수 있고 화면도 한국어로 표시됩니다.",
  },
  {
    label: "갈라유자와 스키장 1일 스키 강습",
    ctaLabel: "갈라유자와 스키 강습 확인 →",
    url: LESSON_URL,
    why: "처음 스키를 타는 사람이 빠뜨리기 쉬운 예약입니다. 갈라유자와에서는 리프트권, 장비 대여, 강습을 따로 사야 하고, 상품 페이지에도 강습과 별도로 리프트권이 필요하다고 적혀 있습니다.",
  },
];

const tourPicks = [
  withKlookLocale(yuzawaIwapparaSkiDayTourTokyo, LOCALE, {
    title: "도쿄 출발 유자와 이와파라 스키장 눈놀이·스키 당일 투어",
    desc: "도쿄에서 에치고유자와 지역의 이와파라까지 왕복 버스로 가는 당일 투어로, 눈놀이, 스키, 장비 대여, 강습을 한 번의 예약 안에서 고를 수 있습니다",
  }),
  withKlookLocale(galaNaebaSkiDayTripTokyo, LOCALE, {
    title: "도쿄 출발 갈라유자와 / 나에바 스키장 당일 여행",
    desc: "도쿄에서 유자와 지역 스키장까지 전용 차량으로 가는 겨울 시즌 당일 여행으로, 스키장은 예약할 때 선택합니다",
  }),
  withKlookLocale(hakubaSkiResortDayTourTokyo, LOCALE, {
    title: "도쿄 출발 나가노 하쿠바 스키장 당일 투어",
    desc: "도쿄에서 하쿠바 밸리로 가는 당일 투어로, 스키장 4곳 중 하나를 고르고 리프트권과 장비 대여가 예약에 포함됩니다",
  }),
  withKlookLocale(galaYuzawaSkiLesson, LOCALE, {
    title: "갈라유자와 스키장 1일 스키 강습",
    desc: "갈라유자와에서 중국어 또는 영어 강사에게 3~6시간 스키나 스노보드를 배우는 강습으로, 리프트권과 별도로 예약하며 상품 페이지에도 리프트권이 따로 필요하다고 적혀 있습니다",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "갈라유자와 스키장 당일치기" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h || `blank-${i}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
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

function Sources({ children }: { children: ReactNode }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      최종 확인: {OWN_ISO} — {children}
    </p>
  );
}

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {label}
  </a>
);

export default function KoGalaYuzawaSkiDayTripPage({ updated }: { updated: PageUpdated }) {
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
            일본에서 유일하게 스키장 안에 신칸센역이 있는 곳입니다. 슬로프는 {SLOPES_OPEN}에 개장하고, 남부 에어리어는
            이번 시즌 영업하지 않습니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "JR 동일본 신칸센 직행 시간", "JR 패스 이용 조건", "갈라유자와 공식 2026-27 요금"].map((t) => (
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
          heading="지금 예약할 수 있는 도쿄 출발 갈라유자와 당일치기는?"
          checkedIso={OWN_ISO}
          tours={[
            {
              title: "갈라유자와 스키장 리프트권",
              url: LIFT_URL,
              price: null,
              duration: "리프트 1일, 신칸센은 별도 예약",
              departs: "스키장 안의 갈라유자와역",
            },
            {
              title: "도쿄 출발 갈라유자와 / 나에바 스키장 당일 여행",
              url: CHARTER_URL,
              price: null,
              duration: "10시간 차량 대절",
              departs: "도쿄 23구 안의 숙소",
            },
            {
              title: "갈라유자와 스키장 1일 스키 강습",
              url: LESSON_URL,
              price: null,
              duration: "3~6시간",
              departs: "갈라유자와에서 집합",
            },
          ]}
          deadline={
            <>
              슬로프가 처음 열리는 12월 19일부터 연말연시까지의 날짜는 11월 30일까지 예약하세요. 12월 12~18일은 곤돌라만
              운행하고 스키는 탈 수 없습니다. 1~2월이라면 최소 3주 전에 예약하세요. 11월 15일 기준 JR 동일본의 JR SKISKI
              신칸센·리프트권 패키지는 아직 &ldquo;Coming Soon&rdquo;이었고 11월 중순부터 예약 접수 예정이었으며, 갈라유자와의
              PICK UP BOX 대여 예약은 개장 1개월 전에 열립니다.
            </>
          }
          primaryCta="클룩에서 갈라유자와 리프트권 날짜와 가격 확인 →"
          primaryNote={
            <>
              상품 페이지에서 스키 날짜를 고르면 가격과 판매 여부가 표시됩니다. 갈라유자와의 슬로프는 {SLOPES_OPEN}에
              개장하며, 2026-27 시즌 일일 영업시간은 아직 발표 전입니다.
            </>
          }
        />

        <KlookSameDayCards heading="같은 날 갈라유자와 여행에 함께 예약할 것" cards={sameDayCards} />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>도쿄역에서</p>
                <p className={styles.verdictStatValue}>{FASTEST}, 환승 없음</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>슬로프 영업</p>
                <p className={styles.verdictStatValue}>2026년 12/19 – 2027년 5/5</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>리프트권 1일</p>
                <p className={styles.verdictStatValue}>매표소 {LIFT_WINDOW} / 온라인 {LIFT_WEB}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR 패스 / 와이드 패스 / JR EAST PASS</p>
                <p className={styles.verdictStatValue}>모두 갈라유자와까지 사용 가능</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              도쿄에서 갈라유자와 스키장까지는 <strong>도쿄역에서 조에쓰 신칸센을 타고 갈라유자와역까지 가장 빠른 열차로{" "}
              {FASTEST}</strong>이며(JR 동일본의 다니가와 71호는 도쿄 6:24 출발, 7:35 도착), 역이 스키장 건물 안에 있습니다.
              다만 직행 열차는 겨울 시즌에만 운행하며 <strong>{SIGHTSEEING_OPEN}</strong>부터입니다. 갈라유자와의{" "}
              <strong>슬로프는 {SLOPES_OPEN}에 개장</strong>해 {SLOPES_CLOSE}까지 영업하고, 12월 12~18일은 곤돌라 관광
              영업만 합니다. <strong>JAPAN RAIL PASS</strong>(7일 온라인 {JRP_7DAY}), <strong>JR 도쿄 와이드 패스</strong>(
              {PASS_ADULT}, 3일), <strong>JR EAST PASS</strong>({EAST_PASS_5DAY}, 5일) 모두 열차에 사용할 수 있고, 장비 없이
              가는 당일치기는 갈라유자와 온라인 요금으로 <strong>¥19,500</strong>이 추가됩니다(리프트권 {LIFT_WEB} + 스키 세트{" "}
              {SKI_SET} + 스키복 {WEAR}). 갈라유자와와 JR 동일본 공식 사이트에서 {OWN}에 확인했으며, 2026-27 시즌 일일
              영업시간은 공식 발표 전입니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                갈라유자와 리프트권 →
              </KlookLink>
              <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                도쿄 출발 스키 당일 투어 →
              </KlookLink>
              <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                도쿄 → 갈라유자와 열차 →
              </KlookLink>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                도쿄 와이드 패스 가격 확인 →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                갈라유자와 스키 강습 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="같은 여행에 함께 예약"
          heading="갈라유자와 당일치기에 실제로 예약하는 것"
          intro="모바일 데이터와 공항 교통을 먼저, 그다음 패스, 마지막으로 갈라유자와에서 따로 사야 하는 것입니다. 처음 스키 당일치기를 하는 사람이 빠뜨리기 쉬운 것은 리프트권과 스키 강습입니다. 클룩 가격은 날짜에 따라 달라지므로 여행 날짜로 상품 페이지에서 확인하세요."
          items={tripPrepItems}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>도쿄에서 갈라유자와 스키장까지 어떻게 가나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>도쿄역에서 갈라유자와까지 조에쓰 신칸센 직행(다니가와)을 타세요.</strong> 가장 빠른 열차로 {FASTEST},
            환승이 없고 개찰구를 나오면 바로 스키장 건물입니다. 직행 열차는 시즌 한정으로 {SIGHTSEEING_OPEN}에 시작합니다.
            대안은 에치고유자와까지 신칸센을 타고 갈라유자와의 무료 셔틀버스로 10분 가는 방법이고, 시간이 더 걸리는 방법으로
            도쿄 출발 버스 투어와 전용 차량이 있습니다.
          </p>
          <Table
            head={["경로", "소요 시간", "열차 / 운행 기간", "비용", "알아 둘 점"]}
            rows={accessRows.map((r) => [r.leg, r.time, r.trains, r.cost, r.note])}
          />
          <Sources>
            {ext("https://gala.co.jp/winter/access/", "gala.co.jp/winter/access/")},{" "}
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR 동일본 겨울 열차 안내(2026년 10월 22일)")},{" "}
            {ext("https://www.jreast.co.jp/en/multi/destinations/gala.html", "JR 동일본 갈라유자와 안내")}. 편도 운임은 적지
            않았습니다. JR 동일본이 2026년 3월 14일에 운임을 개정했으므로 날짜별 요금은 결제 화면에서 확인하세요. 버스 투어와
            전용 차량의 소요 시간은 클룩 상품 페이지 기준입니다.
          </Sources>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>날짜별로 직접 확인해야 할 점</strong>은 원하는 열차가 여행 날짜에 갈라유자와까지 가는지입니다. 이른
            임시 열차 다니가와 71호는 1~2월의 일부 주말과 공휴일에만 운행합니다. 좌석은 날짜를 정해 예약하고, 갈라유자와가
            당일치기 2곳 중 하나라면{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              JR 도쿄 와이드 패스 가이드(영어)
            </Link>
            에서 패스 가격을 비교하세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도쿄 → 갈라유자와 신칸센 →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도쿄 출발 스키 버스 당일 투어 →
            </KlookLink>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              갈라유자와 리프트권 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>소요 시간</span>
          <h2 className={styles.sectionTitle}>도쿄에서 갈라유자와까지 신칸센으로 얼마나 걸리나요?</h2>
          <p className={styles.bodyText}>
            <strong>가장 빠른 열차로 {FASTEST}, 실제로는 약 71~80분입니다.</strong> JR 동일본의 2026년 10월 22일 안내에
            따르면 다니가와 71호는 도쿄 6:24 → 갈라유자와 7:35, 돌아오는 다니가와 86호는 갈라유자와 17:04 → 도쿄
            18:20이며, JR 동일본의 갈라유자와 안내 페이지에는 다니가와로 약 1시간 20분이라고 적혀 있습니다. 야간 스키를 탄다면
            2027년 1월 16일·30일과 2월 13일·27일에 다니가와 198호가 갈라유자와를 20:19에 출발해 도쿄에 21:40에 도착합니다.{" "}
            {OWN} 확인.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>하루 비용</span>
          <h2 className={styles.sectionTitle}>갈라유자와 당일치기 비용은 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>장비 없이 가는 어른은 스키장에서 약 ¥19,500, 여기에 열차 요금이 추가됩니다.</strong> 갈라유자와 공식
            2026-27 온라인 요금 기준입니다. 스키를 타지 않고 눈놀이 공원에서 썰매를 타는 하루는 ¥8,000입니다.
          </p>
          <Table head={["항목", "가격", "알아 둘 점"]} rows={costRows.map((r) => [r.item, r.price, r.note])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "갈라유자와 리프트권 요금")},{" "}
            {ext("https://gala.co.jp/winter/rental/", "장비 대여")},{" "}
            {ext("https://gala.co.jp/winter/activities/", "액티비티")},{" "}
            {ext("https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html", "JR 동일본 패스 가격")},{" "}
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "JR 동일본 여행 사이트(SPA 갈라노유)")}.
          </Sources>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              갈라유자와 리프트권 →
            </KlookLink>
            <KlookLink href={EAST_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR EAST PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>시즌</span>
          <h2 className={styles.sectionTitle}>갈라유자와 2026-27 시즌은 언제 개장하나요?</h2>
          <p className={styles.bodyText}>
            <strong>슬로프는 {SLOPES_OPEN}에 개장하고 {SLOPES_CLOSE}까지 영업할 예정입니다.</strong> 그 전 주인{" "}
            {SIGHTSEEING_OPEN}~2026년 12월 18일은 관광 영업만 하며, 곤돌라와 관광 리프트는 운행하지만 눈이 쌓여 있어도 스키와
            스노보드는 탈 수 없습니다. 신칸센 직행도 같은 12월 12일에 시작합니다. 갈라유자와는 적설과 날씨에 따라 영업 기간과
            내용이 바뀔 수 있다고 안내합니다. 12월 12~18일에 스키를 타려고 예약하면 곤돌라만 타게 됩니다.
          </p>
          <Table head={["2026-27", "날짜"]} rows={seasonRows.map((r) => [r.what, r.detail])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "gala.co.jp/winter/hours-pricing/")},{" "}
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR 동일본(2026년 10월 22일)")},{" "}
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "JR 동일본 여행 사이트")}.
          </Sources>
          <div style={{ marginTop: "1.25rem" }}>
            <Table head={["스키장", `갈라유자와 2026-27(${OWN} 확인)`]} rows={mountainRows.map((r) => [r.what, r.detail])} />
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            코스, 난이도, 리프트, 표고, 남부 에어리어 휴업은 갈라유자와 공식 코스 지도 페이지(
            {ext("https://gala.co.jp/winter/gelande/", "gala.co.jp/winter/gelande/")})에서 {OWN}에 확인했습니다.{" "}
            <strong>남부 에어리어 휴업은 2026-27 시즌에 해당하는 내용</strong>으로, 이전에 작성된 안내에는 나오지 않습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>리프트권</span>
          <h2 className={styles.sectionTitle}>갈라유자와 리프트권은 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>어른 1일권은 매표소 {LIFT_WINDOW}, 온라인 {LIFT_WEB}입니다.</strong> 갈라유자와가 판매하는 모든 리프트권에
            ¥500 이상의 차이가 있어, 미리 사는 것이 이 하루에서 가장 쉽게 아끼는 방법입니다. 실제로 더 저렴한 선택지는 두
            가지이고, 4시간권은 그중에 들어가지 않습니다.
          </p>
          <Table head={["리프트권", "매표소", "온라인", "알아 둘 점"]} rows={liftRows.map((r) => [r.ticket, r.window, r.web, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            모든 금액은 갈라유자와 공식 2026-27 요금표이며 {OWN}에 확인했습니다. &ldquo;초등학생(어린이)&rdquo;은 스키장의
            小学生 요금입니다. 결제 화면에서 다시 확인하세요. 2026년 10월 5일부터 1,000장 판매한 ¥4,300 초특가 리프트권은
            매진으로 표시되어 있어, 실제로 살 수 있는 가격은 위의 온라인 요금입니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              갈라유자와 리프트권 →
            </KlookLink>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              갈라유자와 스키·스노보드 강습 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>장비 대여</span>
          <h2 className={styles.sectionTitle}>갈라유자와에서 스키 장비를 빌릴 수 있나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            네. 장비 대여점이 역과 같은 건물에 있어, 도쿄에서 장비 없이 당일치기를 할 수 있습니다. 비용을 계산하기 전에 알아
            둘 점은 갈라유자와가 <strong>장비와 스키복을 따로</strong> 판매하고, 고글과 헬멧도 단품으로 따로 대여한다는
            것입니다.
          </p>
          <Table
            head={["항목", "중학생 이상", "초등학생 이하", "알아 둘 점"]}
            rows={rentalRows.map((r) => [r.item, r.adult, r.child, r.note])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>예약 전에 한 번 합계를 내 보세요.</strong> 장비 없이 가는 어른이 곤돌라·리프트 1일권을 온라인으로 사면{" "}
            {LIFT_WEB}, 세트 {SKI_SET}, 스키복 {WEAR}이고, 여기에 고글, 헬멧, 신칸센, 점심은 포함되지 않습니다. 그래서 이
            페이지의 클룩 상품을 현장에서 하나씩 사는 것과 비교해 볼 만하고, ¥1,000짜리 PICK UP BOX는 장비 대여점에서 기다리지
            않는다는 구체적인 효과가 있는 유일한 추가 옵션입니다. 모든 가격은 갈라유자와 공식 요금이며 {OWN}에 확인했습니다.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>초보자</span>
          <h2 className={styles.sectionTitle}>갈라유자와는 초보자나 스키를 타지 않는 사람에게도 괜찮나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            둘 다 괜찮습니다. <strong>코스의 35%가 초급</strong>이고 곤돌라가 역 건물에서 초급 코스 위쪽까지 올라가며,
            스키를 타지 않는 사람은 더 저렴한 곤돌라·바루슈권으로 곤돌라 정상의 눈놀이 공원과 썰매장을 이용할 수 있습니다.
            주의할 점은 이번 시즌에 한정됩니다. 남부 에어리어가 휴업하므로 이전 안내보다 스키장이 작습니다.
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>스키를 타지 않는 사람</p>
              <p className={styles.whoForDesc}>
                곤돌라·바루슈권(온라인 ¥5,500, 매표소 ¥6,500)으로 곤돌라, 정상역의 눈놀이 공원, 그리고 다니가와 연봉이 보이는
                &lsquo;사랑의 종&rsquo; 전망대까지 가는 바루슈 스카이 리프트(10:00~16:00, 약 30분)를 이용할 수 있습니다. 썰매는
                정상역에서 {SLED}에 대여하고, 눈놀이 공원은 날씨가 허락하면 8:30~16:00에 운영합니다. 미취학 아동은 곤돌라가
                무료입니다. 갈라유자와 공식 액티비티 페이지, {OWN} 확인. 도쿄에서 더 가까운 곳에서 썰매를 타려면{" "}
                <Link href="/guides/attractions/tokyo-snow-day-trip" hrefLang="en" style={linkStyle}>
                  도쿄 근교 눈 여행 가이드(영어)
                </Link>
                를 보세요.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>유리한 점</p>
              <p className={styles.whoForDesc}>
                스키장 발표 기준 초급 35%, 중급 45%, 상급 20%의 코스, 리프트 11기, 그리고 역에서 슬로프까지 몇 분이면 되는
                거리입니다. 처음 눈 위에 서는 날이라면 도쿄에서 당일치기로 갈 수 있는 다른 어떤 스키장보다 낫습니다. 출발 전에
                이동에서 문제가 생길 일이 없기 때문입니다.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>이번 시즌의 불리한 점</p>
              <p className={styles.whoForDesc}>
                남부 에어리어는 2026-27 시즌 영업하지 않습니다. 스키장 공식 표현은 &lsquo;南エリアの営業を休止いたします&rsquo;입니다.
                이용할 수 있는 코스는 센트럴 에어리어 5개, 노스 에어리어 6개, 팔콘 다운힐 코스로 모두 12개입니다. 초보자의 하루로는
                충분하지만 두 번째 방문에는 부족하므로, 하쿠바나 나에바 당일치기도 함께 살펴볼 만합니다.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>초보자가 빠뜨리는 예약</p>
              <p className={styles.whoForDesc}>
                스키 강습입니다. 갈라유자와의 요금표는 리프트권과 대여 세트를 판매하고, 강습은 따로 예약해야 합니다. 클룩 상품
                페이지에도 강습과 별도로 리프트권이 필요하다고 분명히 적혀 있습니다. 리프트권과 장비만 있고 강사가 없으면 초급
                코스가 35%여도 타는 방법을 알려 줄 사람이 없습니다.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>첫날을 가장 저렴하게 보내는 방법</p>
              <p className={styles.whoForDesc}>
                ¥8,000 1일권 대신 곤돌라·바루슈권(매표소 ¥6,500, 온라인 ¥5,500)을 사는 것입니다. 처음 타는 사람은 곤돌라와
                바루슈 구역을 벗어나지 않으므로, 산 전체 리프트권은 타지 않을 리프트에 ¥2,500을 더 내는 셈입니다. 스키장 공식
                요금, {OWN} 확인.
              </p>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              갈라유자와 1일 스키 강습 →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도쿄 출발 초보자 버스 투어 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>패스</span>
          <h2 className={styles.sectionTitle}>JR 패스로 갈라유자와까지 갈 수 있나요?</h2>
          <p className={styles.bodyText}>
            <strong>네. 여행자가 가지고 있을 만한 세 가지 패스 모두 갈라유자와까지 신칸센에 사용할 수 있습니다.</strong>{" "}
            전국용 <strong>JAPAN RAIL PASS</strong>는 노조미와 미즈호를 제외한 JR 그룹의 모든 신칸센에 사용할 수 있으므로
            조에쓰 신칸센도 이용할 수 있습니다(그란 클래스는 추가 요금). 7일 보통차권은 온라인 <strong>{JRP_7DAY}</strong>,
            해외 판매점에서 ¥53,000입니다. <strong>JR EAST PASS</strong>는 5일 <strong>{EAST_PASS_5DAY}</strong>, 10일
            ¥50,000이며 JR 동일본의 모든 노선에 사용할 수 있습니다. japanrailpass.net과 JR 동일본에서 {OWN}에 확인했습니다.
          </p>
          <p className={styles.bodyText}>
            이 여행에서 세 패스 중 가장 저렴한 것은 <strong>JR 도쿄 와이드 패스</strong>입니다. 갈라유자와는 이용 구역 안에
            있고, JR 동일본도 패스의 목적지로 소개하며, 갈라유자와까지 조에쓰 신칸센 보통차 지정석이나 자유석을 이용할 수
            있습니다. 가격은 어른 <strong>{PASS_ADULT}</strong>, 6~11세 어린이 <strong>¥8,000</strong>이고{" "}
            <strong>연속 3일</strong> 사용합니다. <strong>2026년 3월 14일</strong>에 ¥15,000과 ¥7,500에서 오른 가격입니다.{" "}
            {OWN} 확인.
          </p>
          <p className={styles.bodyText}>
            따져 봐야 할 것은 패스가 <em>이득인지</em>이고, JR 동일본이 직접 계산 예시를 제시합니다.{" "}
            <strong>갈라유자와 왕복과 닛코 특급 왕복</strong>을 모두 지정석으로 따로 사면 <strong>{JR_EXAMPLE}</strong>이고,
            패스는 {PASS_ADULT}입니다. 이 예시는 당일치기 <strong>두 번</strong>입니다. 갈라유자와 하루만으로는 {PASS_ADULT}{" "}
            패스 가격에 미치지 않으므로, 갈라유자와가 도쿄에서 가는 당일치기 2~3곳 중 하나라면 패스를, 하나뿐이라면 구간
            티켓을 사세요. 시즌 조건도 있습니다. 갈라유자와역은 겨울과 봄에만 운영하므로, 시즌 밖에는 같은 패스로 에치고유자와까지
            갑니다.{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              JR 도쿄 와이드 패스 가이드(영어)
            </Link>
            에서 간토 지역 당일치기별로 이득이 나는 지점을,{" "}
            <Link href="/guides/transport/jr-pass-guide" hrefLang="en" style={linkStyle}>
              JR 패스 가이드(영어)
            </Link>
            에서 전국 패스를 같은 방식으로 정리했습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도쿄 와이드 패스 가격 확인 →
            </KlookLink>
            <KlookLink href={EAST_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR EAST PASS(5일 또는 10일) →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>투어 또는 열차</span>
          <h2 className={styles.sectionTitle}>투어를 예약할까요, 신칸센으로 직접 갈까요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            설원에 있는 시간을 늘리고 싶다면 신칸센을, 정할 것을 줄이고 싶다면 버스 투어를 고르세요. 분명히 알아 둘 점은 둘이
            같은 스키장이 아니라는 것입니다. 열차는 갈라유자와로 가고, 도쿄 출발 버스 투어는 이와파라 등 이웃한 유자와 지역
            스키장으로 갑니다.
          </p>
          <Table head={["하루 일정", "포함 내용", "판단", "알아 둘 점"]} rows={shapeRows.map((r) => [r.shape, r.covers, r.verdict, r.note])} />
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>지금 확인해야 할 예약 정보가 하나 있습니다.</strong> {OWN} 기준 JR 동일본 여행 사이트에는 2026-27 시즌{" "}
            <em>JR SKISKI</em> 갈라유자와 신칸센·리프트권 패키지가 아직 &ldquo;Coming Soon&rdquo;으로 표시되어 있었고, 예약
            접수는 2026년 11월 중순부터 예정이었습니다. 따라서 이번 시즌 공식 패키지는 아직 예약할 수 없고, 아래 판매 대행
            상품은 판매 중이며 해외 발급 카드로 결제할 수 있고 화면도 한국어로 표시됩니다. 패키지를 원한다면 11월 중순을 기다리고,
            날짜를 지금 확보하고 싶다면 하나씩 예약하세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도쿄 출발 유자와 버스 투어 →
            </KlookLink>
            <KlookLink href={CHARTER_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              갈라유자와 / 나에바 전용 차량 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>겨울 여행의 나머지</span>
          <h2 className={styles.sectionTitle}>갈라유자와 하루와 함께 묶기 좋은 일정은?</h2>
          <p className={styles.bodyText}>
            갈라유자와는 도쿄에 숙박하면서 다녀오는 하루이므로 나머지 일정에 맞춰 계획하세요.{" "}
            <Link href="/ko/guides/attractions/japan-winter-itinerary" style={linkStyle}>
              일본 겨울 여행 12일 일정
            </Link>
            에서 도쿄 체류와 더 북쪽과 서쪽의 설국을 어떻게 묶는지 볼 수 있습니다. 함께 가격을 비교해 볼 만한 겨울 당일치기는{" "}
            <Link href="/ko/guides/attractions/jigokudani-snow-monkey-tour" style={linkStyle}>
              지고쿠다니 원숭이 공원 투어
            </Link>
            입니다. 조에쓰 신칸센의 갈라유자와와 호쿠리쿠 신칸센의 나가노는 모두 JR EAST PASS로 갈 수 있어, 둘 다 간다면 계산이
            달라집니다. 스키를 탄 날에는 저녁에 도쿄로 돌아와{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en" style={linkStyle}>
              도쿄 겨울 일루미네이션(영어)
            </Link>
            을 볼 수 있습니다.
          </p>
          <p className={styles.bodyText}>
            1월에 일본에 있다면{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={linkStyle}>
              다카야마·시라카와고 라이트업 투어(영어)
            </Link>
            를 먼저 정하고 갈라유자와를 그에 맞춰 넣으세요. 라이트업은 정해진 4일 저녁에만 열리고 갈라유자와는 시즌 내내
            영업하기 때문입니다. 첫날을 보내고 일주일 스키 여행을 하고 싶어졌다면 다음 단계는 홋카이도의{" "}
            <Link href="/ko/guides/attractions/niseko-ski-tours" style={linkStyle}>
              니세코 스키 투어
            </Link>
            이고, 비행기 없이 간다면 나가노에서 며칠 묵는 방법이 있습니다.{" "}
            <Link href="/guides/attractions/hakuba-ski-tours" hrefLang="en" style={linkStyle}>
              하쿠바 스키 투어 가이드(영어)
            </Link>
            는 도쿄에서 신칸센과 버스로 가는 방법을,{" "}
            <Link href="/guides/attractions/nozawa-onsen-ski" hrefLang="en" style={linkStyle}>
              노자와 온천 스키 가이드(영어)
            </Link>
            는 이이야마역에서 가는 온천 마을 스키장을 다룹니다.{" "}
            <Link href="/guides/attractions/japan-ski-trip-itinerary" hrefLang="en" style={linkStyle}>
              일본 스키 여행 일정(영어)
            </Link>
            은 7일 또는 10일 스키 여행에서 어디에 몇 박을 할지 정리했습니다. 2월에 북쪽으로 간다면 2027년 2월 4~11일의{" "}
            <Link href="/ko/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>
              삿포로 눈축제 투어
            </Link>
            를 중심으로{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en" style={linkStyle}>
              삿포로 출발 오타루 당일 여행(영어)
            </Link>
            을 더하거나,{" "}
            <Link href="/ko/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>
              홋카이도 7일 여행
            </Link>
            으로 늘릴 수 있습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>스키 전에</span>
          <h2 className={styles.sectionTitle}>여행자 보험이 스키 하루에도 적용되나요?</h2>
          <p className={styles.bodyText}>
            리프트권을 사기 전에 확인하세요. 스노스포츠가 보장되는지는 보험마다 다릅니다. 예를 들어 SafetyWing은 헬멧을 쓰면
            정규 코스 안의 스키와 스노보드를 보장하지만 코스 밖은 그 조건에 포함되지 않고, 다른 보험은 추가 특약이 필요할 수
            있습니다. 눈 위에서 보내는 하루는 일본 여행 중 병원비가 나올 가능성이 가장 높은 날이므로, 온라인으로 리프트권을 사서
            아끼는 ¥500보다 이쪽이 더 중요합니다.{" "}
            <Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en" style={linkStyle}>
              일본 스키 여행자 보험 가이드(영어)
            </Link>
            에서 흔한 면책 조항의 실제 내용과 코스 밖으로 보는 범위를 정리했습니다.
          </p>
          <p className={styles.bodyText}>
            갈라유자와에 가기 전에 준비할 것이 두 가지 더 있습니다. 하나는 <strong>모바일 데이터</strong>입니다. 스키장은
            적설과 날씨에 따라 영업일과 시간이 바뀐다고 공지하고, 지선의 시즌 한정 역에서는 휴업 공지를 휴대폰으로만 받을 수
            있습니다.{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              클룩 eSIM 보기 →
            </KlookLink>{" "}
            <Link href="/ko/guides/esim/best-esim-japan" style={linkStyle}>
              일본 eSIM 추천 가이드
            </Link>
            에서 다른 선택지와 비교할 수 있습니다. 다른 하나는 <strong>결제 수단</strong>입니다. 스키장 자체 예약 화면은 일본
            국내 카드를 전제로 만들어져 있고, 이 스키장에 판매 대행 사이트가 있는 큰 이유도 그 때문입니다.
          </p>
        </section>

        <p className={styles.bodyText}>
          갈라유자와행 신칸센은 도쿄역에서 출발하므로,{" "}
          <Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en" style={linkStyle}>
            도쿄 숙소 지역 가이드(영어)
          </Link>
          는 당일치기가 많은 여행에 도쿄역 주변을 추천합니다.
        </p>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="갈라유자와 스키장 자주 묻는 질문" />

        <KlookTourPicks
          heading="도쿄에서 갈 수 있는 다른 스키 당일치기"
          intro="갈라유자와는 가장 빠른 곳이지만 유일한 곳은 아닙니다. 유자와 지역에 눈이 적을 때, 남부 에어리어 휴업으로 12개 코스가 작게 느껴질 때, 또는 네 가지를 따로 사지 않고 한 번에 예약하고 싶을 때의 대안입니다."
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/ko/guides/attractions/jigokudani-snow-monkey-tour", title: "도쿄 출발 지고쿠다니 원숭이 공원 가이드(2027)" },
            { href: "/guides/transport/jr-east-pass", title: "JR EAST PASS(2026): 가격, 적용 범위, 이득일까? (영어)" },
            { href: "/guides/transport/tokyo-wide-pass", title: "JR 도쿄 와이드 패스 2026: 가격, 노선도, 이득일까? (영어)" },
            { href: "/guides/money/best-travel-insurance-japan", title: "일본 여행자 보험 추천 2026: 누구에게 무엇이 필요한가 (영어)" },
            { href: "/guides/money/japan-ski-travel-insurance", title: "일본 스키 여행자 보험: 일반 보험이 제외하는 것 (영어)" },
            { href: "/ko/guides/attractions/niseko-ski-tours", title: "니세코 스키 투어 2026-27: 리프트권, 렌털, 셔틀버스" },
            { href: "/ko/guides/attractions/japan-winter-itinerary", title: "일본 겨울 여행 12일 일정(2027): 일자별 코스" },
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "다카야마와 시라카와고 투어(2027): 어디서 출발할까 (영어)" },
            { href: "/ko/guides/attractions/sapporo-snow-festival-tours", title: "삿포로 눈축제 투어(2027): 2월 4~11일, 무료 행사장" },
            { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "삿포로 출발 오타루 당일 여행(2027) (영어)" },
            { href: "/ko/guides/attractions/hokkaido-7-day-itinerary", title: "홋카이도 7일 여행: 일자별 추천 일정" },
            { href: "/guides/attractions/tokyo-illumination-tours", title: "도쿄 일루미네이션: 일정, 시간, 무료 명소 (영어)" },
            { href: "/guides/attractions/tokyo-snow-day-trip", title: "도쿄 근교 눈 여행(2026-27) (영어)" },
            { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "도쿄에서 가루이자와 당일치기(2026): 신칸센, 아웃렛, 눈 (영어)" },
            { href: "/ko/guides/esim/best-esim-japan", title: "일본 eSIM 추천(2026): 업체, 가격, 선택법" },
            { href: "/guides/attractions", title: "일본에서 즐길 거리 더 보기(영어) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>도쿄에서 {FASTEST}, 그리고 사야 할 세 가지</h2>
            <p className={styles.ctaBannerDesc}>
              슬로프는 {SLOPES_OPEN}에 개장합니다. 리프트권은 매표소 {LIFT_WINDOW}, 온라인 {LIFT_WEB}이고, 장비는 별도,
              스키 강습도 별도입니다. 그래서 패스를 먼저, 그다음 강습을 예약하는 순서를 권합니다.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                도쿄 와이드 패스 가격 확인 →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                갈라유자와 스키 강습 보기 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
