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
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  arashiyamaEarlyMorningWalk,
  arashiyamaHozukyoHalfDayTour,
  arashiyamaSaganoOptionalTour,
  hozugawaRiverBoatTicket,
  klookEsim,
  saganoArashiyamaKiyomizuTour,
  saganoHozugawaGuaranteedTour,
  saganoRomanticTrainTicket,
  whereToStayKyotoAreas,
  type KlookSameDayCard,
} from "../../../../lib/klook-links";
import { gygArashiyama, gygHozugawaKudari } from "../../../../lib/gyg-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/sagano-romantic-train-tickets) section by
// section as of 2026-11-24 (task-jtk-20261124-TR02): same sections, tables, FAQ and Klook /
// GetYourGuide CTAs in the same places. Every figure, date and source is the English page's;
// nothing is added. Title term: 사가노 토롯코 열차 — the name Korean guides and the operator's
// Korean page use.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/sagano-romantic-train-tickets";
const SLUG = "sagano-romantic-train-tickets";
const TITLE = "사가노 토롯코 열차 2026: 예매 시기, 좌석, 운행일";
const H1 = "사가노 토롯코 열차 2026: 예매 시기, 좌석, 운행일 정리";
const DESC =
  "사가노 토롯코 열차는 승차일 1개월 전 일본 시간 0시부터 예매할 수 있고 편도 ¥880입니다. 11~12월 운행일과 동절기 운행 중단 안내.";

const LAST_CHECKED = "2026-11-16";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);
const BOAT_CHECKED = dateLabel("2026-10-25", LOCALE);

const ADULT = "¥880";
const CHILD = "¥440";
const SEAT_FEE_ADULT = "¥620";
const SEAT_FEE_CHILD = "¥310";
const ADULT_2027 = "¥1,500";
const CHILD_2027 = "¥750";

const TOUR_URL = klookFor(saganoHozugawaGuaranteedTour.url, LOCALE);
const TICKET_URL = klookFor(saganoRomanticTrainTicket.url, LOCALE);
const BOAT_URL = klookFor(hozugawaRiverBoatTicket.url, LOCALE);
const WALK_URL = klookFor(arashiyamaEarlyMorningWalk.url, LOCALE);
const OPTIONAL_TOUR_URL = klookFor(arashiyamaSaganoOptionalTour.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);
const ARASHIYAMA_HOTELS_URL = klookFor(whereToStayKyotoAreas[3].url, LOCALE);
const KYOTO_STATION_HOTELS_URL = klookFor(whereToStayKyotoAreas[0].url, LOCALE);

const FAQ_URL = "https://www.sagano-kanko.co.jp/faq/";
const TICKET_PAGE_URL = "https://www.sagano-kanko.co.jp/ticket/";
const RELEASE_URL = "https://www.sagano-kanko.co.jp/news/5535/";
const LIGHTUP_URL = "https://www.sagano-kanko.co.jp/news/5197/";
const CALENDAR_URL = "https://www.sagano-kanko.co.jp/train-info/";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const srcStyle = { color: "var(--text)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const SAME_DAY: KlookSameDayCard[] = [
  {
    kind: "가이드 투어",
    label: "사가노 토롯코 열차, 호즈강 뱃놀이, 아라시야마 워킹 투어",
    ctaLabel: "열차와 뱃놀이 투어 보기 →",
    url: TOUR_URL,
    why: "토롯코 열차와 아라시야마로 내려오는 호즈강 뱃놀이를 한 번에 예약합니다. 두 상품을 따로 예약하는 번거로움을 피하고 싶은 분께 맞습니다.",
  },
  {
    kind: "워킹 투어",
    label: "아라시야마 대나무숲 이른 아침 워킹 투어",
    ctaLabel: "아침 산책 투어 보기 →",
    url: WALK_URL,
    why: "사가아라시야마역에서 출발해 한적한 길을 2.5시간 걷는 소규모 그룹 투어로, 말차 다도 체험으로 마무리합니다. 토롯코 열차를 타는 날 대나무숲 일정으로 이용하기 좋습니다.",
  },
  {
    kind: "eSIM",
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    url: ESIM_URL,
    why: "운영사는 운행 중단일이 추가되거나 바뀔 수 있다고 안내하므로, 승차 당일 스마트폰으로 운행 공지를 확인하는 것이 좋습니다.",
  },
];

const bookingRows = [
  {
    method: "대부분의 여행객에게 추천: 운영사 공식 사이트",
    opens: "승차일 1개월 전(전달의 같은 날) 일본 시간 0시. 2027년 3월 1일 이후 승차분은 30일 전",
    cost: `운임만 냅니다. 어른 ${ADULT}, 어린이 ${CHILD}. 전날 23:59까지 무료 취소, 좌석 변경은 3회까지 무료. 1회 최대 8장, 3D 시큐어(3D Secure)를 지원하는 신용카드 또는 체크카드`,
  },
  {
    method: "클룩(토롯코 열차 티켓)",
    opens: "예매 가능한 날짜는 상품 페이지에 표시됩니다",
    cost: "가격과 취소 규정은 상품 페이지에 있으니 결제 전에 확인하세요",
  },
  {
    method: "토롯코 열차 정차역 매표소(사가, 아라시야마, 가메오카)",
    opens: "당일만, 선착순. 토롯코 사가역 약 08:35, 토롯코 아라시야마역 08:50, 토롯코 가메오카역 09:10부터",
    cost: "운임만 냅니다. 현금, 신용카드, IC 카드(PiTaPa 제외). 지정석이 매진되면 입석권을 한정 판매. 토롯코 호즈쿄역에서는 판매하지 않음",
  },
  {
    method: "JR 매표소",
    opens: "판매처가 아닙니다",
    cost: "운영사 FAQ에 나온 판매처는 공식 사이트와 토롯코 열차 정차역 매표소뿐입니다. JR 패스와 청춘 18 킷푸(青春18きっぷ)는 사용할 수 없습니다",
  },
  {
    method: "15명 이상 단체",
    opens: "여행사를 통해 1년 전부터 1개월 전까지",
    cost: "어른 ¥800, 어린이 ¥400. 단체는 5호차를 이용할 수 없고, 당일 단체 할인은 없습니다",
  },
];

const calendarRows = [
  { dates: "2026년 11월 1일 ~ 12월 29일", runs: "12월 16일(수)을 제외하고 매일 운행", trains: "토롯코 사가역 출발 정기 열차 09:02 ~ 16:02", sale: "12월 16일까지의 승차권은 판매 중이며, 12월 17~29일 승차분은 11월 17~29일 일본 시간 0시에 판매 시작" },
  { dates: "11월 1~13일", runs: "운행", trains: "정기 열차 + 임시 열차 81호/82호(사가 17:10 출발)", sale: "판매 중" },
  { dates: "11월 14~30일", runs: "운행", trains: "정기 열차 + 81호/82호 + 91호/92호(사가 18:26 출발)", sale: "판매 중" },
  { dates: "12월 1~4일", runs: "운행", trains: "정기 열차 + 81호/82호", sale: "판매 중" },
  { dates: "12월 5~6일(토~일)", runs: "운행", trains: "정기 열차 + 81호/82호 + 91호/92호", sale: "판매 중" },
  { dates: "12월 7~13일", runs: "운행", trains: "정기 열차 + 81호/82호", sale: "판매 중" },
  { dates: "12월 14~15일", runs: "운행", trains: "정기 열차만", sale: "판매 중" },
  { dates: "12월 16일(수)", runs: "운행 중단", trains: "열차 없음", sale: "—" },
  { dates: "12월 17~25일", runs: "운행", trains: "정기 열차만", sale: "11월 17~25일 일본 시간 0시" },
  { dates: "12월 26~27일(토~일)", runs: "운행", trains: "정기 열차 + 81호/82호", sale: "11월 26~27일 일본 시간 0시" },
  { dates: "12월 28~29일", runs: "운행. 12월 29일은 기존 차량의 마지막 운행일", trains: "정기 열차만", sale: "11월 28~29일 일본 시간 0시" },
  { dates: "2026년 12월 30일 ~ 2027년 2월 28일", runs: "동절기 운행 중단", trains: "열차 없음", sale: "—" },
];

const directionRows = [
  {
    dir: "대부분의 여행객에게 추천하는 방향: 토롯코 사가 → 토롯코 가메오카(하행)",
    times: "토롯코 사가역에서 09:02 ~ 16:02 매시 출발. 아래 운행 일정표의 날짜에는 17:10과 18:26 임시 열차 운행",
    seats: "C와 D는 진행 방향을 바라보는 좌석, A와 D가 창가 좌석",
    fit: "가메오카에서 아라시야마로 내려오는 호즈강 뱃놀이와 이어집니다. 예매 화면에서 사가/아라시야마 → 가메오카 방향을 고르세요. 사가 출발 티켓으로 토롯코 아라시야마역에서도 탈 수 있습니다",
  },
  {
    dir: "토롯코 가메오카 → 토롯코 사가(상행)",
    times: "토롯코 가메오카역에서 09:30 ~ 16:30 매시 출발. 같은 날짜에 17:43과 18:59 임시 열차 운행",
    seats: "A와 B는 진행 방향을 바라보는 좌석, A와 D가 창가 좌석",
    fit: "아라시야마에 도착하므로 열차를 탄 뒤 대나무숲에 갈 수 있습니다. 가메오카까지는 JR로 우마호리역까지 간 뒤 걸어서 약 10분입니다. 운영사는 16:30 출발 열차부터 야간 조명을 볼 수 있다고 안내합니다. 토롯코 아라시야마역에서 내릴 수는 있지만 다시 탈 수는 없습니다",
  },
];

const fareRows = [
  { ticket: "어른, 편도", price: ADULT, note: "토롯코 사가 ~ 토롯코 가메오카 전 구간을 타도, 일부 구간만 타도 요금은 같습니다. 거리에 따라 달라지지 않습니다." },
  { ticket: "어린이, 편도(6~11세)", price: CHILD, note: "어른 요금의 정확히 절반입니다. 어린이 요금은 6세 이상 12세 미만에게 적용됩니다." },
  { ticket: "15명 이상 단체, 어른", price: "¥800", note: "어린이 ¥400. 운영사는 당일 승차권에는 단체 할인이 없다고 밝힙니다." },
  { ticket: "학생 단체, 어른", price: "¥710", note: "어린이 ¥360. 운영사의 학교·학생 단체 요금표 기준입니다." },
  { ticket: "반려동물(이동장 이용)", price: "¥260", note: "수하물 요금입니다. 이동장은 길이 70cm 이내, 세 변의 합 약 90cm, 무게 10kg 이내여야 합니다." },
];

const changeRows = [
  { item: "어른 편도 지정석", now: `${ADULT}, 좌석 포함`, next: `${ADULT_2027}: 운임 ${ADULT} + 좌석 요금 ${SEAT_FEE_ADULT}` },
  { item: "어린이 편도 지정석", now: `${CHILD}, 좌석 포함`, next: `${CHILD_2027}: 운임 ${CHILD} + 좌석 요금 ${SEAT_FEE_CHILD}` },
  { item: "입석 이용", now: "지정석이 매진된 뒤 당일 판매하는 한정 입석권", next: `각 차량 데크에서는 운임만 내고 이용 가능: 어른 ${ADULT}, 어린이 ${CHILD}` },
  { item: "프라이빗 객실", now: "없음", next: "4호차 프리미엄 캐빈 란쿄(Premium Cabin Rankyo): 1실 ¥9,000, 최대 6명, 승객별 운임 별도. 토롯코 사가역 또는 토롯코 가메오카역에서 승차" },
  { item: "온라인 판매 시작", now: "승차 1개월 전 일본 시간 0시", next: "승차 30일 전 일본 시간 0시. 2027년 3월 1일 승차분만 2027년 2월 1일 오전 10시경" },
  { item: "차량", now: "개방형 5호차 '더 리치'를 포함한 현재 차량. 2026년 12월 29일을 끝으로 운행 종료", next: "신형 5량 편성 열차: 기관차 1량과 객차 4량, 바닥 가까이까지 이어지는 측면 유리창과 높은 유리 천장" },
  { item: "운행 개시일 및 종료일", now: "마지막 운행 2026년 12월 29일", next: "첫 운행 2027년 3월 1일: 사가노 3호, 토롯코 사가역 10:02 출발" },
  { item: "동절기 운행 중단", now: "2026년 12월 30일 ~ 2027년 2월 28일", next: "2027년 12월 30일과 31일은 운행 중단. 2028년 1~2월 운행 일정은 아직 발표되지 않음" },
];

const seasonRows = [
  { period: "현재 ~ 2026년 12월 29일", status: "운행", note: "토롯코 사가역 정기 열차는 09:02 ~ 16:02에 출발하고, 토롯코 가메오카역 막차는 16:30에 출발합니다. 12월 29일(화)이 기존 차량의 마지막 운행일입니다." },
  { period: "2026년 12월 16일", status: "운행 중단", note: "운영사의 2026년 운행 일정표에서 시즌 종료 전에 남은 유일한 운행 중단일입니다. 운영사는 운행 중단일이 추가되거나 바뀔 수 있다고 안내합니다." },
  { period: "2026년 10월 24일 ~ 12월 29일", status: "야간 조명", note: "16:30부터 막차가 끝날 때까지 선로 주변을 조명으로 밝히며, 운영사는 토롯코 가메오카역 16:30 출발 사가노 16호부터 야간 조명을 볼 수 있다고 안내합니다. 임시 열차 81호/82호(토롯코 사가역 17:10 출발)는 10월 24일 ~ 12월 13일과 12월 26~27일, 임시 열차 91호/92호(18:26)는 11월 14~30일과 12월 5~6일에 운행합니다." },
  { period: "2026년 12월 30일 ~ 2027년 2월 28일", status: "운행 중단", note: "동절기 운행 중단 기간입니다. 운영사의 2026년 운행 일정표는 12월 30일과 31일을 동절기 운행 중단일로 표시하고, 2027년 운행 일정은 3월 1일부터 시작합니다." },
  { period: "2027년 3월 1일부터", status: "신형 열차", note: "신형 열차는 10:02에 출발하는 사가노 3호부터 운행하므로 그날은 09:02 열차가 없습니다. 정기 시간표는 토롯코 사가역 09:02 ~ 16:02로 그대로입니다. 2027년 운행 일정표에서는 성수기를 제외한 대부분의 수요일(예: 3월 10일, 4월 14일)이 운행 중단일이므로 날짜를 확인하세요." },
];

const carRows = [
  { car: "1~4호차, 일반 차량(2026년 12월 29일까지)", what: "지붕이 있고 창문을 여닫을 수 있는 차량으로, 마주 보는 4인 좌석, 나무 벤치, 백열전구가 있습니다. 화차를 개조한 차량이라 소리도 그만큼 큽니다.", pick: "기본적으로 추천하는 차량이며, 비 예보가 있다면 이 차량을 고르는 것이 좋습니다. 예매할 때 호차 번호와 A~D 좌석 기호를 고릅니다." },
  { car: "5호차, '더 리치'(2026년 12월 29일까지)", what: "창문에 유리가 없는 개방형 차량으로 유리 천장이 있고, 기관차와 가장 가까운 객차입니다. 운영사는 비가 오면 차 안이 젖을 수 있고, 차내 우산 사용은 금지이며, 비로 인한 환불은 없다고 안내합니다.", pick: "협곡 풍경을 보려면 이 차량을 예매하세요. 다만 폭우가 오면 후회할 수 있습니다. 우비를 챙기세요. 예매 화면에서 \"No. 5\"를 직접 골라야 하며, 자동으로 배정되지 않습니다." },
  { car: "1~4호차, 신형 열차(2027년 3월 1일부터)", what: "바닥 가까이까지 이어지는 측면 유리창, 높은 유리 천장, 목재 마감 좌석과 바닥, 각 차량 출입문 쪽에 있는 지붕 있는 반개방형 데크가 있습니다. 4호차에는 앞쪽 풍경을 볼 수 있는 다다미 스타일 벤치가 있는 란쿄 객실도 있습니다.", pick: `좌석은 어른 ${ADULT_2027}입니다. 데크는 ${ADULT}, 객실 이용료는 1실 ¥9,000이며 운임은 별도입니다. 보도자료에는 신형 차량의 좌석 배치도가 없습니다.` },
];

const combinationRows = [
  { option: "토롯코 열차 편도만", cost: `어른 ${ADULT}, 어린이 ${CHILD}. 2027년 3월 1일부터 좌석 이용 시 ${ADULT_2027}, ${CHILD_2027}`, time: "열차 약 25분", pick: "교토 하루 일정 중 아라시야마를 한 곳으로 들를 때 맞습니다. 사가에서 가메오카까지 탄 뒤 JR 우마호리역까지 10분 걸어 JR 사가노선으로 돌아옵니다. 돌아오는 구간에는 일반 열차 운임이 적용됩니다." },
  { option: "토롯코 열차 편도 + 돌아오는 호즈강 뱃놀이", cost: `어른 ${ADULT} + ¥6,000, 어린이 ${CHILD} + ¥4,500(열차 운임은 2026년 12월 29일까지 기준)`, time: "약 반나절. 열차로 25분, 뱃놀이로 돌아오는 데 약 2시간", pick: "가장 인기 있는 조합이며, 대부분의 사람이 이 열차를 타는 이유입니다. 뱃놀이가 아라시야마에서 끝나므로 돌아오는 열차 없이 출발한 곳에서 오전 일정을 마칩니다." },
  { option: "둘 다 포함된 가이드 투어", cost: "날짜별 가격은 상품 페이지에서 확인", time: "일정에 따라 반나절 또는 하루", pick: "가을에 여행하거나, 뱃놀이 운항 시기가 맞지 않거나, 한 시간 간격으로 예약해야 하는 두 상품을 따로 챙기고 싶지 않다면 맞습니다. 가이드 투어에는 걸어서 갈 수 없는 토롯코 가메오카역과 선착장 사이의 이동편도 포함됩니다." },
];

const steps = [
  { title: "먼저 운행 일정표에서 날짜를 확인하세요", desc: `열차가 운행하는 날인지 먼저 확인해야 나머지 일정을 준비할 수 있습니다. 2026년 12월 29일까지 운행하고, 12월 30일부터 2027년 2월 28일까지 운행을 중단한 뒤 2027년 3월 1일에 다시 운행합니다. 운영사는 운행 시즌 중에도 정해진 날 운행을 중단하며, 이 날짜는 연간 운행 일정표에 표시됩니다. ${CHECKED} 확인.` },
  { title: "일본 시간 0시에 예매가 시작되면 바로 온라인으로 예매하세요", desc: "2026년 승차분은 승차일 1개월 전 0시에 예매가 시작됩니다. 2027년 3월 1일 이후 승차분은 30일 전 0시에 시작하며, 3월 1일 승차분만 2027년 2월 1일 오전 10시경부터 판매합니다. 역 매표소에서는 승차권을 미리 판매하지 않습니다. 가을 단풍 시즌에는 인기 있는 날짜부터 먼저 매진됩니다." },
  { title: "날짜만이 아니라 호차와 좌석도 고르세요", desc: "예매 화면에서 호차 번호와 마주 보는 4인 좌석 안의 A~D 좌석 기호를 고릅니다. 운영사 FAQ에 따르면 A와 D가 창가 좌석이고, 가메오카행 열차에서는 C와 D, 사가행 열차에서는 A와 B 좌석이 진행 방향을 바라봅니다. 개방형 5호차 '더 리치'는 2026년 12월 29일까지 예매 화면에서 \"No. 5\"를 직접 골라야 합니다. 운영사는 1~4호차의 강 쪽과 산 쪽 좌석을 따로 안내하지 않으므로, 풍경이 목적이라면 좌석 기호보다 개방형 차량을 고르는 것이 좋습니다." },
  { title: "당일에는 QR 코드를 보여 주세요", desc: "운영사 FAQ에 따르면 승차용 QR 코드는 승차 당일에만 스마트폰이나 태블릿에 표시되며, 인쇄한 바우처만으로는 탈 수 없습니다. 전날 23:59까지 무료로 취소할 수 있고, 그때까지 같은 열차의 좌석을 3회까지 변경할 수 있습니다. 승차 당일에는 환불과 변경이 불가능합니다." },
  { title: "온라인 예매분이 매진됐다면 역에서 당일 승차권을 사세요", desc: "당일 승차권은 토롯코 호즈쿄역을 제외한 모든 토롯코 열차 정차역 매표소에서 선착순으로 판매합니다. 운영사가 안내하는 판매 시작 시간은 토롯코 사가역 약 08:35, 토롯코 아라시야마역 08:50, 토롯코 가메오카역 09:10이며, 지정석이 매진되면 입석권을 한정 판매합니다." },
  { title: "뱃놀이는 열차와 반대 방향으로 따로 예약하세요", desc: `호즈강 뱃놀이는 가메오카에서 아라시야마로 강을 따라 내려갑니다. 열차와 반대 방향이라 두 가지를 이어서 탈 수 있습니다. 가메오카시가 공시한 요금은 어른 ¥6,000, 4세~초등학생 ¥4,500이고 약 2시간 걸립니다. 주요 운항 기간은 3월 10일 ~ 11월 30일, 12월 중순 ~ 3월 9일에는 난방 유람선 운항, 12월 29일 ~ 1월 4일은 운항하지 않으며, 악천후나 수위가 높을 때는 운항을 중단합니다. ${BOAT_CHECKED} 확인.` },
];

const faqItems: FaqItem[] = [
  {
    q: "사가노 토롯코 열차는 언제 예매해야 하나요?",
    a: `승차일 1개월 전 일본 시간 0시에 운영사 공식 사이트에서 예매하세요. 승차권은 승차일 전달의 같은 날짜부터 판매되므로, 2026년 12월 29일 승차분은 11월 29일 0시부터 예매할 수 있습니다. 운영사가 안내하는 단풍 시즌인 11월 중순 ~ 12월 초에는 예매가 시작되는 시각에 바로 예매하세요. 전 좌석 지정석이고, 운영사는 날짜별 매진 시점을 공개하지 않습니다. 2027년 3월 1일 이후 승차분은 30일 전으로 바뀌고, 3월 1일 승차분은 2027년 2월 1일 오전 10시경부터 판매합니다. 전날 23:59까지 무료 취소할 수 있습니다. ${CHECKED} 확인.`,
  },
  {
    q: "사가노 토롯코 열차 티켓을 당일에 살 수 있나요?",
    a: `토롯코 사가역, 토롯코 아라시야마역, 토롯코 가메오카역 매표소에서 선착순으로 살 수 있고, 토롯코 호즈쿄역에서는 팔지 않습니다. 운영사가 안내하는 판매 시작 시간은 각각 약 08:35, 08:50, 09:10이며, 성수기에는 세 역 모두 08:35경에 판매를 시작합니다. 지정석이 매진되면 차량별로 입석권을 한정 판매하고, 입석권까지 매진되면 그 열차는 만석입니다. 매표소에서는 현금, 신용카드, PiTaPa를 제외한 IC 카드로 결제할 수 있습니다. ${CHECKED} 확인.`,
  },
  {
    q: "사가노 토롯코 열차는 어느 방향으로 타는 것이 좋나요?",
    a: `대부분의 여행객에게는 토롯코 사가 → 토롯코 가메오카 방향을 추천합니다. 호즈강 뱃놀이가 반대로 가메오카에서 아라시야마로 내려오므로 두 교통편을 이어서 출발 지점으로 돌아올 수 있습니다. 대나무숲에서 일정을 마치고 싶거나 야간 조명을 보고 싶다면 가메오카 → 사가 방향을 타세요. 운영사는 가메오카 16:30 출발 열차부터 야간 조명을 볼 수 있다고 안내합니다. 요금은 어느 방향이든 ${ADULT}으로 같습니다. 운영사 FAQ에 따르면 가메오카행 열차에서는 C와 D, 사가행 열차에서는 A와 B 좌석이 진행 방향을 바라봅니다. ${CHECKED} 확인.`,
  },
  {
    q: "2026~27년 겨울에도 사가노 토롯코 열차가 운행하나요?",
    a: `2026년 12월 29일까지만 운행합니다. 11월 1일부터 12월 29일까지 12월 16일(수)을 제외하고 매일 운행한 뒤, 2026년 12월 30일부터 2027년 2월 28일까지 운행을 중단하고 2027년 3월 1일 신형 열차로 운행을 재개합니다. 운영사의 2026년 운행 일정표는 12월 30일과 31일을 동절기 운행 중단일로 표시하고, 2027년 운행 일정은 3월 1일부터 시작합니다. ${CHECKED} 확인.`,
  },
  {
    q: "2027년 사가노 토롯코 신형 열차로 무엇이 바뀌나요?",
    a: `2027년 3월 1일부터 신형 5량 편성 열차가 현재 차량을 대신하며, 현재 차량은 2026년 12월 29일을 끝으로 운행을 종료합니다. 기존 운임 ${ADULT}에 좌석 요금 ${SEAT_FEE_ADULT}(어린이 ${SEAT_FEE_CHILD})이 더해져 어른 지정석 요금은 ${ADULT_2027}이 됩니다. 각 차량의 지붕 있는 데크는 운임만 내면 되고, 4호차 프리미엄 캐빈 란쿄는 최대 6명이 이용할 수 있으며 1실 ¥9,000, 운임은 별도입니다. 온라인 판매는 승차 30일 전으로 바뀝니다. 첫 열차는 3월 1일 10:02 사가노 3호입니다. ${CHECKED} 확인.`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "사가노 토롯코 열차 요금은 얼마인가요?",
    a: `2026년 12월 29일까지 편도 어른 ${ADULT}, 6~11세 어린이 ${CHILD}이며, 토롯코 사가역과 토롯코 가메오카역 사이 7.3km 전 구간에 적용됩니다. 거리와 관계없이 같은 요금입니다. 운영사 요금표 기준으로 15명 이상 단체는 ¥800과 ¥400, 학생 단체는 어른 ¥710, 어린이 ¥360이며, 당일 승차권에는 단체 할인이 없습니다. 이동장에 넣은 반려동물은 수하물 요금 ¥260입니다. ${CHECKED} 확인.`,
  },
  {
    q: "사가노 토롯코 열차는 얼마나 걸리고, 어디까지 가나요?",
    a: "토롯코 사가역에서 토롯코 아라시야마역과 토롯코 호즈쿄역을 지나 토롯코 가메오카역까지 호즈강 협곡을 따라 7.3km를 약 25분에 달립니다. 토롯코 사가역에서는 09:02부터 16:02까지 약 1시간 간격으로 열차가 출발하고, 성수기에는 임시 열차가 추가로 운행됩니다. 순환선이 아니라 편도 노선이므로, 예매 전에 어떻게 돌아올지 정해 두어야 합니다.",
  },
  {
    q: "사가노 토롯코 열차가 운행하지 않는 날은 언제인가요?",
    a: `운영사는 겨울뿐 아니라 운행 시즌 중에도 정해진 날 운행을 중단합니다. 2026년에 시즌 종료 전 남은 운행 중단일은 12월 16일뿐입니다. 2027년 운행 일정표에서는 성수기 주간을 제외한 수요일이 대부분 운행 중단일이며, 운행 중단일은 3월 10일과 4월 14일부터 시작되고, 11월에는 운행 중단일이 없습니다. 운영사는 운행 중단일이 바뀔 수 있다고 안내하므로, 여행 날짜를 운행 일정표에서 확인하세요. ${CHECKED} 확인.`,
  },
  {
    q: "'더 리치'를 탈 수 있는 마지막 날은 언제인가요?",
    a: `운행 일정이 바뀌지 않는다면 2026년 12월 29일(화)입니다. 운영사는 개방형 5호차를 포함한 현재 차량이 그날을 끝으로 운행을 종료할 예정이라고 밝혔고, 신형 열차 보도자료에서는 대형 유리창 차량과 지붕 있는 데크를 소개합니다. 단체 승객은 5호차를 이용할 수 없고, 마지막 며칠의 좌석은 1개월 전에 예매가 시작되므로 12월 29일 승차분은 11월 29일 일본 시간 0시부터 예매할 수 있습니다. ${CHECKED} 확인.`,
  },
  {
    q: "강을 보려면 어느 쪽에 앉아야 하나요?",
    a: "현재 열차에 대해 운영사는 좌석 배치도를 공개합니다. 1~4호차는 창문이 있는 마주 보는 4인 좌석이고 좌석은 A~D로 표시하며, FAQ에 따르면 A와 D가 창가 좌석이고 가메오카행은 C와 D, 사가행은 A와 B가 진행 방향을 바라보는 좌석입니다. 그러나 어느 쪽이 호즈강을 향하는지는 공개하지 않으므로, 왼쪽이나 오른쪽이라고 단정하는 정보는 철도회사의 공식 안내가 아닌 추측입니다. 운영사 자료로 양쪽 풍경을 모두 볼 수 있다고 확인되는 차량은 개방형 5호차 '더 리치(The Rich)'입니다. 창문에 유리가 없고 유리 천장이 있어 양쪽 협곡을 모두 볼 수 있으며, 예매할 때 직접 골라야 합니다.",
  },
  {
    q: "개방형 5호차 '더 리치'를 탈 만한가요?",
    a: "2026년 12월 29일까지는 같은 계곡을 지나는 일반 JR 열차 대신 이 노선을 타는 이유가 되는 차량이고, 어느 좌석에 앉아도 같은 풍경을 볼 수 있는 유일한 차량입니다. 단점도 공개되어 있습니다. 창문이 없어 비가 오면 차 안이 젖을 수 있고, 차내에서는 우산을 쓸 수 없으며, 운영사는 비로 인한 환불이 없다고 밝힙니다. 우비를 챙기고 전날 일기예보를 확인하세요. 예보가 나쁘면 1~4호차 좌석을 예매하는 것이 더 낫습니다.",
  },
  {
    q: "토롯코 사가역과 토롯코 가메오카역에는 어떻게 가나요?",
    a: "토롯코 사가역은 JR 사가노선 사가아라시야마역 바로 옆에 있으며 걸어서 약 5분이고, 게이후쿠 전철 아라시야마 본선 란덴사가역에서도 약 5분, 한큐 아라시야마역에서는 걸어서 20분입니다. 반대편 종착역인 토롯코 가메오카역은 JR 산인(사가노)선 우마호리역에서 걸어서 약 10분이라, 토롯코 열차로 가메오카까지 간 뒤 JR로 돌아오는 일정을 쉽게 짤 수 있습니다.",
  },
  {
    q: "호즈강 뱃놀이도 함께 해야 하나요?",
    a: `하루 일정의 나머지 절반을 보내기에 좋은 선택입니다. 배가 반대 방향인 가메오카에서 아라시야마로 강을 따라 내려오므로 출발한 곳에서 일정이 끝납니다. 가메오카시가 공시한 요금은 어른 ¥6,000, 4세~초등학생 ¥4,500이고 뱃놀이는 약 2시간이며, 주요 운항 기간은 3월 10일 ~ 11월 30일, 12월 중순 ~ 3월 9일은 지붕과 난방이 있는 배로 운항합니다. 12월 29일 ~ 1월 4일은 운항하지 않고, 악천후나 수위가 높을 때는 운항을 중단합니다. 환불되지 않는 상품을 예약하기 전에 확인하세요. ${BOAT_CHECKED} 확인.`,
  },
  {
    q: "아이와 함께 사가노 토롯코 열차를 탈 만한가요?",
    a: `탈 만하고 요금도 부담이 적습니다. 2026년 12월 29일까지 어린이 ${CHILD}, 어른 ${ADULT}(2027년 3월 1일부터 좌석 이용 시 ${CHILD_2027}, ${ADULT_2027})이고, 승차 시간이 25분이라 아이가 지루해하기 전에 도착합니다. 운영사가 안내하는 이용 정보 두 가지는 유모차를 차내에서 접어야 한다는 것과 열차에 휠체어 공간이 두 곳 있다는 것입니다. 안내견과 보조견은 탈 수 있고, 다른 반려동물은 이동장이 필요하며 요금은 ¥260입니다. 5호차는 아이들이 가장 타고 싶어 하는 차량이면서 창문이 없는 차량이므로, 아이들의 의견보다는 날씨를 보고 정하세요.`,
  },
];

const winterPicks = [
  withKlookLocale(saganoHozugawaGuaranteedTour, LOCALE, {
    title: "사가노 토롯코 열차, 호즈강 뱃놀이, 아라시야마 워킹 투어",
    desc: "2026년 12월 29일까지 또는 2027년 3월 1일 이후에 이용할 수 있습니다. 토롯코 열차 편도, 아라시야마로 내려오는 뱃놀이, 대나무숲 자유 시간이 포함됩니다.",
  }),
  withKlookLocale(arashiyamaEarlyMorningWalk, LOCALE, {
    title: "아라시야마 대나무숲 이른 아침 워킹 투어",
    desc: "사가아라시야마역에서 출발해 주요 경로를 벗어난 한적한 길을 2.5시간 걷는 소규모 그룹 투어로, 말차 다도 체험으로 마무리합니다.",
  }),
  { title: "아라시야마 호텔", desc: "대나무숲 근처에 묵으면 사람이 붐비기 전에 도착할 수 있습니다.", url: ARASHIYAMA_HOTELS_URL },
  { title: "교토역 근처 호텔", desc: "사가아라시야마역으로 가는 JR 사가노선 열차가 여기서 출발하며 쾌속으로 약 11분이 걸립니다.", url: KYOTO_STATION_HOTELS_URL },
  { title: "클룩 일본 eSIM", desc: "QR 코드 바우처로 받는 일본 eSIM으로, 휴대폰에서 지도와 예약 페이지를 볼 때 씁니다.", url: ESIM_URL },
  withKlookLocale(saganoRomanticTrainTicket, LOCALE, {
    title: "사가노 토롯코 열차 티켓",
    desc: "여행 날짜가 운행 중단 기간 전후라면 토롯코 열차 편도 승차권을 예약할 수 있습니다.",
  }),
];

const guidedPicks = [
  withKlookLocale(saganoHozugawaGuaranteedTour, LOCALE, {
    title: "사가노 토롯코 열차, 호즈강 뱃놀이, 아라시야마 워킹 투어",
    desc: "출발이 확정된 투어로, 토롯코 열차 편도, 아라시야마로 내려오는 호즈강 뱃놀이, 대나무숲 자유 시간이 포함됩니다.",
  }),
  withKlookLocale(arashiyamaHozukyoHalfDayTour, LOCALE, {
    title: "아라시야마와 호즈쿄 협곡 반나절 투어",
    desc: "사가노 토롯코 열차, 호즈강 뱃놀이, 아라시야마 명소를 한 번에 예약하는 반나절 투어입니다.",
  }),
  withKlookLocale(saganoArashiyamaKiyomizuTour, LOCALE, {
    title: "사가노 토롯코 열차, 아라시야마, 기요미즈데라 반나절 투어",
    desc: "토롯코 열차, 아라시야마, 기요미즈데라를 가이드와 함께 버스로 둘러보는 반나절 투어입니다.",
  }),
  withKlookLocale(arashiyamaSaganoOptionalTour, LOCALE, {
    title: "사가노 토롯코 열차 탑승 선택 가능 아라시야마 투어",
    desc: "대나무숲과 아라시야마 명소에 토롯코 열차를 선택 옵션으로 더하는 투어로, 겨울에 여행한다면 이 상품을 확인하세요.",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "사가노 토롯코 열차" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows, boldFirst = false }: { head: string[]; rows: ReactNode[][]; boldFirst?: boolean }) {
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
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (boldFirst && r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: boldFirst && r === 0 ? 700 : undefined }}
                  >
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
    <a href={href} target="_blank" rel="noopener noreferrer" style={srcStyle}>
      {children}
    </a>
  );
}

export default function KoSaganoRomanticTrainTicketsPage({ updated }: { updated: PageUpdated }) {
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
            교토 호즈강 협곡을 따라 달리는 관광열차입니다. 승차권 예매는 승차일 1개월 전부터 시작되며, 현재 차량은
            12월 29일을 끝으로 운행을 종료하고, 3월까지 운행을 중단한 뒤 2027년 3월 1일에 신형 열차가 운행을
            시작합니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "운영사 공식 요금", "2027년 3월 1일부터 신형 열차"].map((t) => (
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
            <strong>사가노 토롯코 열차 예매 시기</strong>는 <strong>승차일 1개월 전 일본 시간 0시</strong>입니다. 이때
            운영사 공식 사이트에서 예매가 시작되므로, 현재 열차의 마지막 운행일인 2026년 12월 29일 승차분은 11월 29일
            0시부터 예매할 수 있습니다. 운영사가 안내하는 단풍 시즌인 <strong>11월 중순 ~ 12월 초</strong>에는 예매가
            시작되는 0시에 바로 예매하세요. 운영사는 매진 시점을 공개하지 않으며, 온라인 예매분이 매진되면 역
            매표소에서 판매하는 당일 승차권과 한정 입석권만 구매할 수 있습니다. 요금은 편도 어른{" "}
            <strong>{ADULT}</strong>, 어린이 <strong>{CHILD}</strong>이고,{" "}
            <strong>2026년 12월 30일부터 2027년 2월 28일까지 운행을 중단</strong>합니다.{" "}
            <strong>2027년 3월 1일</strong>부터는 신형 열차 운행과 함께 좌석 요금 {SEAT_FEE_ADULT}이 더해져 지정석
            요금은 <strong>{ADULT_2027}</strong>이 되고, 예매는 승차일 <strong>30일 전</strong>부터 시작됩니다. 공식
            운임과 운행 일정은 {CHECKED}에 확인했습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>이 여행 예약하기</span>
          <h2 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>
            토롯코 열차 좌석과 하루 일정 예약
          </h2>
          <p className={styles.bodyText}>
            아라시야마 당일 일정 중 예매 시작일이 정해져 있는 것은 열차 승차권뿐입니다. 돌아오는 길의 뱃놀이, 가이드
            워킹 투어, 모바일 데이터는 한 번에 예약할 수 있습니다. 상품 페이지에서 여행 날짜의 예약 가능 여부와 현재 가격을
            확인하세요.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              클룩에서 사가노 토롯코 열차 날짜와 가격 보기 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
            상품 페이지에서 승차일을 고르면 가격과 남은 좌석을 볼 수 있습니다. 현재 열차의 마지막 운행일은 2026년 12월
            29일이고, 2026년 12월 30일부터 2027년 2월 28일까지는 운행하지 않습니다.
          </p>
        </section>

        <KlookSameDayCards heading="같은 날 아라시야마에서 함께 예약할 것" cards={SAME_DAY} />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>어른, 2026년 12월 29일까지</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>어른 좌석, 2027년 3월 1일부터</p>
                <p className={styles.verdictStatValue}>{ADULT_2027}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>동절기 운행 중단</p>
                <p className={styles.verdictStatValue}>12월 30일 ~ 2월 28일</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>예매 시작</p>
                <p className={styles.verdictStatValue}>1개월 전, 2027년 3월부터 30일 전</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              열차는 아라시야마의 <strong>토롯코 사가역</strong>과 <strong>토롯코 가메오카역</strong> 사이{" "}
              <strong>7.3km</strong>를 호즈강 협곡을 따라 달리며, 토롯코 사가역에서는 <strong>09:02 ~ 16:02</strong>{" "}
              사이에 약 1시간 간격으로 열차가 출발합니다. 어린이 요금은 6~11세에 적용됩니다. 당일 승차권은 토롯코
              호즈쿄역을 제외한 모든 토롯코 열차 정차역에서 선착순으로 판매합니다. 이 열차에서는{" "}
              <strong>JR 패스를 사용할 수 없습니다</strong>. 클룩에서는 열차 티켓과 열차가 포함된 가이드 투어를 판매합니다.
              요금과 날짜는 {CHECKED}에 운영사 공식 페이지에서 확인했습니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                열차 + 호즈강 뱃놀이 투어 →
              </KlookLink>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                토롯코 열차 승차권만 →
              </KlookLink>
              <GygCompareButton slug={SLUG} listing={gygArashiyama} />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>예매 시기</span>
          <h2 className={styles.sectionTitle}>사가노 토롯코 열차는 언제 예매해야 하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            승차일 전달의 같은 날짜, 일본 시간 0시에 운영사 공식 사이트에서 예매하세요. 2027년 3월 1일 이후 승차분은
            30일 전으로 바뀌므로 2027년 4월 1일 승차분은 3월 2일 0시부터 예매할 수 있습니다. 단, 2027년 3월 1일
            승차분만 예외로, 2027년 2월 1일 오전 10시경부터 판매합니다.
          </p>
          <Table head={["예매처", "판매 시작", "요금 및 변경·취소 규정"]} rows={bookingRows.map((r) => [r.method, r.opens, r.cost])} boldFirst />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {LAST_CHECKED}. 출처: 운영사의 <Src href={FAQ_URL}>FAQ</Src>,{" "}
            <Src href={TICKET_PAGE_URL}>요금과 티켓 페이지</Src>, <Src href={RELEASE_URL}>2026년 10월 23일 보도자료</Src>.
            온라인에서 날짜나 인원을 바꾸려면 취소한 뒤 다시 구매해야 합니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              클룩에서 토롯코 열차 날짜 확인 →
            </KlookLink>
            <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              가이드 동행 열차 + 뱃놀이 투어 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>운행일</span>
          <h2 className={styles.sectionTitle}>2026년 11월과 12월에 사가노 토롯코 열차가 운행하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            2026년 11월 1일부터 12월 29일까지 12월 16일(수)을 제외하고 매일 운행합니다. 가을에는 대부분의 날에 저녁
            임시 열차를 운행하며, 12월 30일부터 동절기 운행 중단에 들어갑니다.
          </p>
          <Table head={["날짜", "운행 여부", "열차", "판매 시작"]} rows={calendarRows.map((r) => [r.dates, r.runs, r.trains, r.sale])} />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {LAST_CHECKED}. 출처: 운영사의 <Src href={LIGHTUP_URL}>2026년 9월 18일 야간 조명 행사 보도자료</Src>와{" "}
            <Src href={CALENDAR_URL}>운행 일정표</Src>. 임시 열차 81호는 토롯코 사가역 17:10, 82호는 토롯코 가메오카역
            17:43, 91호는 사가역 18:26, 92호는 가메오카역 18:59에 출발합니다. 운영사는 운행 중단일과 임시 열차가
            추가되거나 바뀔 수 있으며, 예매한 열차의 운행이 중단되면 결제한 카드로 운임이 자동 환불된다고 안내합니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>방향</span>
          <h2 className={styles.sectionTitle}>사가 → 가메오카와 가메오카 → 사가 중 어느 방향이 좋나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            호즈강 뱃놀이로 아라시야마에 돌아올 수 있으므로 대부분의 여행객에게는 사가 → 가메오카 방향을 추천합니다.
            요금은 어느 방향이든 {ADULT}이고, 방향에 따라 출발 시간, 진행 방향을 바라보는 좌석, 도착역이 달라집니다.
          </p>
          <Table head={["방향", "출발 시간", "진행 방향을 바라보는 좌석", "추천 이유"]} rows={directionRows.map((r) => [r.dir, r.times, r.seats, r.fit])} boldFirst />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {LAST_CHECKED}. 출처: 운영사의 <Src href={FAQ_URL}>FAQ</Src>(좌석과 통과 승차)와{" "}
            <Src href={CALENDAR_URL}>시간표</Src>. 운영사는 방향별 혼잡도나 강 쪽 좌석을 공개하지 않으며, 2026년 12월
            29일까지는 개방형 5호차에서 양쪽을 모두 볼 수 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={BOAT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              아라시야마로 돌아오는 호즈강 뱃놀이 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygHozugawaKudari} />
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>사가노 토롯코 열차는 어떤 열차인가요?</h2>
          <p className={styles.bodyText}>
            옛 산인 본선을 따라 달리는 7.3km 관광 철도로, 사가아라시야마역 옆 <strong>토롯코 사가역</strong>에서{" "}
            <strong>토롯코 아라시야마역</strong>과 <strong>토롯코 호즈쿄역</strong>을 지나{" "}
            <strong>토롯코 가메오카역</strong>까지 갑니다. 차량은 화차를 개조한 것으로, 나무 벤치와 백열전구, 여닫을 수
            있는 창문이 있으며 주행 소음이 큽니다. 5호차 &quot;더 리치(The Rich)&quot;는 창문에 유리가 없는 개방형
            차량으로, 유리 천장이 있습니다. 이 열차는 2026년 12월 29일을 끝으로 운행을 종료합니다.
          </p>
          <p className={styles.bodyText}>
            관광 일정보다 승차권 예매가 먼저인 이유는 두 가지입니다. 첫째, 전 좌석 지정석이며 좌석 번호가 정해져 있고
            온라인 예매는 1개월 전에 시작되므로, 가을 여행이라면 도착 한 달 전에 승차일을 정해 예매해야 합니다. 둘째,
            순환하지 않는 <em>편도</em> 여정이며 계절에 따라 운행을 중단합니다. 좌석을 고르기 전에 돌아오는 방법과
            여행 날짜의 운행 여부부터 확인하세요.{" "}
            <Link href="/guides/attractions/kyoto-2-day-itinerary" style={linkStyle}>
              교토 2일 일정(영어)
            </Link>
            과{" "}
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>
              교토 3일 일정(영어)
            </Link>
            에서 교토 일정에 토롯코 열차를 어떻게 넣을지 확인할 수 있습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금</span>
          <h2 className={styles.sectionTitle}>사가노 토롯코 열차 요금은 얼마인가요?</h2>
          <Table head={["티켓", "요금", "내용"]} rows={fareRows.map((r) => [r.ticket, r.price, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            요금은 {CHECKED}에 운영사의 요금 페이지와 2026년 10월 23일 보도자료로 확인했습니다. 2026년 12월 29일까지의
            요금입니다. 표에 따로 적지 <em>않은</em> 요금도 확인하세요. 개방형 5호차에는 추가 요금이 없어 요금은 같은{" "}
            {ADULT}이므로 예매가 시작되면 가장 먼저 매진됩니다. 토롯코 열차와 함께 들르는 교토 관광지의 입장료는{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={srcStyle}>
              일본 관광지 입장권 가격표(영어)
            </Link>
            에 확인 날짜와 함께 정리했습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>2027년 변경</span>
          <h2 className={styles.sectionTitle}>2027년에 사가노 토롯코 열차는 무엇이 바뀌나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            2027년 3월 1일부터 신형 열차와 좌석 요금이 도입됩니다. 어른 운임 {ADULT}과 어린이 운임 {CHILD}은 그대로이고,
            어른 지정석 요금은 {ADULT}에서 {ADULT_2027}으로 오릅니다. 온라인 판매도 승차 30일 전으로 바뀝니다.
          </p>
          <Table head={["바뀌는 항목", "2026년(12월 29일까지)", "2027년(3월 1일부터)"]} rows={changeRows.map((r) => [r.item, r.now, r.next])} />
          <p className={styles.bodyText} style={noteStyle}>
            {CHECKED}에 운영사의 <Src href={RELEASE_URL}>2026년 10월 23일 보도자료</Src>와 2026년 운행 일정표로
            확인했습니다. 보도자료에는 데크 이용권을 어떻게 판매하는지, 입석권 판매가 계속되는지, 2027년 3월 이후 단체 요금이
            얼마인지가 나와 있지 않습니다. 운영사의 신형 열차 페이지는 추가 발표를 예고하고 있으니, 이 부분에 맞춰
            계획하기 전에 공식 사이트를 확인하세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>운행 기간</span>
          <h2 className={styles.sectionTitle}>사가노 토롯코 열차는 언제 운행하고, 언제 운행을 중단하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            여행 일정에 차질이 생기기 쉬운 부분입니다. 겨울에 두 달 동안 운행을 중단하고, 운행 시즌 중에도 운행하지
            않는 날이 있습니다. 2026년에는 야간 조명을 볼 수 있어 저녁 열차를 고를 만합니다.
          </p>
          <Table head={["기간", "운행 여부", "운영사 안내"]} rows={seasonRows.map((r) => [r.period, r.status, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            운행 기간과 운행 중단일은 {CHECKED}에 확인했습니다. 교토 여행 날짜가 1월이나 2월이라면 이번 여행에서는 토롯코
            열차를 탈 수 없습니다.{" "}
            <Link href="/guides/attractions/things-to-do-kyoto" style={srcStyle}>
              교토에서 즐길 거리(영어)
            </Link>
            에 예약 없이 갈 수 있는 곳을 정리했습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={OPTIONAL_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              여행 날짜의 예약 가능 여부 확인 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygArashiyama} />
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>겨울</span>
          <h2 className={styles.sectionTitle}>겨울에도 사가노 토롯코 열차가 운행하나요?</h2>
          <p className={styles.bodyText}>
            2026년 12월 29일까지 운행하고, <strong>2026년 12월 30일부터 2027년 2월 28일까지 운행을 중단</strong>합니다.
            운영사의 2026년 운행 일정표는 12월 30일과 31일을 동절기 운행 중단일로 표시하고, 2027년 운행 일정표에는 3월
            1일 이전 운행일이 없습니다. 2027년 1~2월에 대한 별도 공지는 없으므로, 이 기간은 두 운행 일정표를 근거로
            정리했습니다. {CHECKED} 확인.
          </p>
          <p className={styles.bodyText}>
            아라시야마는 겨울에도 가 볼 만합니다.{" "}
            <Link href="/guides/attractions/arashiyama-bamboo-forest-tour" style={linkStyle}>
              아라시야마 대나무숲(영어)
            </Link>
            은 연중 무료로 개방되며, 이른 아침 대나무숲 산책은{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental" style={linkStyle}>
              아라시야마 기모노 대여(영어)
            </Link>
            와 함께하기 좋습니다. 가메오카시는 12월 중순부터 3월 9일까지 난방 시설을 갖춘 호즈강 유람선을 운항하고, 12월 29일부터
            1월 4일까지는 운항하지 않는다고 안내합니다({BOAT_CHECKED} 확인). 대나무숲 가까이 묵고 싶다면{" "}
            <Link href="/guides/attractions/where-to-stay-in-kyoto" style={linkStyle}>
              교토 숙박 지역 가이드(영어)
            </Link>
            에서 아라시야마와 교토역 주변을 비교했습니다.
          </p>
        </section>

        <KlookTourPicks
          heading="열차 운행이 중단될 때 아라시야마에서 무엇을 예약할 수 있나요?"
          intro="날짜를 바꿀 수 있다면 열차와 뱃놀이 투어를 먼저 추천합니다. 클룩은 열차 운행이 중단되면 이 투어를 취소하고 전액 환불한다고 안내하므로, 지금부터 2026년 12월 29일까지 또는 2027년 3월 1일 이후에만 이용할 수 있습니다(2026년 11월 7일 상품 페이지 확인). 나머지 상품은 겨울에도 날짜에 관계없이 이용할 수 있습니다. 예약 가능 여부와 현재 가격은 상품 페이지에서 확인하세요."
          tours={winterPicks}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>매진</span>
          <h2 className={styles.sectionTitle}>사가노 토롯코 열차가 매진되면 어떻게 하나요?</h2>
          <p className={styles.bodyText}>
            공식 사이트에서 매진되어도 다른 방법이 있습니다. 운영사는 토롯코 사가역, 토롯코 아라시야마역, 토롯코
            가메오카역 매표소에서 <strong>당일 승차권</strong>을 판매하며, 토롯코 호즈쿄역에서는 팔지 않습니다. 판매 시작은 각각 약
            08:35, 08:50, 09:10이고, 성수기에는 세 역 모두 08:35경에 시작합니다. 지정석이 매진되면 차량별 정원이 찰
            때까지 <strong>입석권</strong>을 한정 수량으로 판매합니다. 운영사는 열차가 만석이면 탈 수 없을 수도 있다고 안내합니다.
          </p>
          <p className={styles.bodyText}>
            전날 23:59까지 무료로 취소할 수 있으므로, 그날 저녁에 공식 사이트를 다시 확인해 볼 만합니다. 줄을 서고 싶지
            않다면 열차와 뱃놀이를 한 번에 예약하는 가이드 투어가 있으니 여행 날짜에 예약할 수 있는지 확인하세요. 열차가 모두 매진되어도
            JR 사가노선으로 아라시야마에 갈 수 있지만, 토롯코 열차 자체에는 JR 패스를 사용할 수 없습니다. {CHECKED} 확인.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              열차 + 뱃놀이 투어 →
            </KlookLink>
            <KlookLink href={WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              아라시야마 워킹 투어 →
            </KlookLink>
            <KlookLink href={ARASHIYAMA_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              아라시야마 호텔 →
            </KlookLink>
            <KlookLink href={KYOTO_STATION_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              교토역 호텔 →
            </KlookLink>
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              클룩 eSIM →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              클룩에서 토롯코 열차 티켓 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygArashiyama} />
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>좌석</span>
          <h2 className={styles.sectionTitle}>몇 호차의 어떤 좌석을 예매하는 것이 좋나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            2027년 3월 1일에 열차가 바뀌므로 답은 여행 날짜에 따라 달라집니다.
          </p>
          <Table head={["호차", "차량 특징", "좌석 선택 팁"]} rows={carRows.map((r) => [r.car, r.what, r.pick])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>어느 쪽 좌석에서 강이 보이는지</strong>에 대해 운영사는 현재 열차 기준의 정보를 공개하지
            않습니다. 좌석 자료에는 차량 배치(마주 보는 4인 좌석, A~D 좌석 기호)와 5호차 규칙만 나와 있습니다. 그러니 왼쪽이나
            오른쪽을 권하는 정보는 추측으로 보고, 협곡 풍경이 목적이라면 개방형 차량을 고르세요. 같은 페이지의 이용
            편의 정보는 다음과 같습니다. 열차 내 휠체어 공간 두 곳, 안내견과 보조견 동반 승차 가능, 유모차는 접어서
            반입, 반려동물은 약 70cm, 10kg 이내 이동장에 넣어야 하며 요금은 ¥260입니다. {CHECKED} 확인.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>토롯코 사가역과 토롯코 가메오카역에는 어떻게 가나요?</h2>
          <p className={styles.bodyText}>
            <strong>토롯코 사가역</strong>은 JR 사가노선 <strong>사가아라시야마역</strong> 바로 옆에 있으며 걸어서 약
            5분입니다. 운영사는 게이후쿠 전철 아라시야마 본선 <strong>란덴사가역</strong>에서 약 5분,{" "}
            <strong>한큐 아라시야마역</strong>에서 걸어서 약 20분이라고 안내합니다. 교토역에서는 운행 편수가 많은 JR
            사가노선으로 가는 것이 가장 편합니다.
          </p>
          <p className={styles.bodyText}>
            반대편 종착역인 <strong>토롯코 가메오카역</strong>은 JR 산인(사가노)선 <strong>우마호리역</strong>에서{" "}
            <strong>걸어서 약 10분</strong>입니다. 그래서 교통비가 가장 적게 드는 일정을 짤 수 있습니다. 토롯코 열차를
            편도로 타고 우마호리역까지 걸어가 일반 JR 열차로 돌아오면 됩니다. 호즈강 뱃놀이를 예약했다면 선착장 위치에
            주의해야 합니다. 선착장은 토롯코 가메오카역이 아니라 가메오카에 있고, 두 곳은 걸어서 갈 수 있는 거리가 아닙니다.{" "}
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>
              교토 교통 가이드(영어)
            </Link>
            에서 JR, 지하철, 란덴, 버스를 정리했고, 같은 주에 간사이 지역의 여러 도시를 오간다면{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={linkStyle}>
              간사이 에어리어 패스(영어)
            </Link>
            로 JR 구간을 이용할 수 있습니다. 다만 JR이 아닌 토롯코 열차에는 사용할 수 없습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>열차만, 열차 + 뱃놀이, 가이드 투어 중 무엇을 고를까요?</h2>
          <Table head={["선택지", "비용", "시간", "고를 때"]} rows={combinationRows.map((r) => [r.option, r.cost, r.time, r.pick])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            여행 날짜에 따라 달라져 상품 페이지에서 직접 확인해야 할 것이 세 가지 있습니다. 그날 토롯코 열차가 운행하는지, 지정석이 매진되었는지, 수위가 높아 호즈강 뱃놀이가 중단되면 취소
            규정이 어떻게 되는지입니다. 위의 뱃놀이 요금은 가메오카시가 공시한 금액(어른 ¥6,000, 4세~초등학생 ¥4,500,
            약 2시간)으로 {BOAT_CHECKED}에 확인했지만, 이 정보만으로는 11월 18일의 예약 가능 여부를 알 수 없습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              가이드 동행 열차 + 뱃놀이 투어 →
            </KlookLink>
            <KlookLink href={BOAT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              호즈강 뱃놀이 티켓 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygHozugawaKudari} />
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>단계별 예매 방법</span>
          <h2 className={styles.sectionTitle}>사가노 토롯코 열차는 어떻게 예매하나요?</h2>
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
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="사가노 토롯코 열차 자주 묻는 질문" />

        <section className={styles.faqSection} style={{ paddingTop: 0 }}>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>추가 FAQ</h3>
          <div className={styles.faqList}>
            {moreFaqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{faqItems.length + i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <KlookTourPicks
          heading="토롯코 열차가 포함된 가이드 투어"
          intro="네 가지 투어 모두 토롯코 열차 좌석을 대신 예약해 주므로 1개월 전에 시작되는 예매를 직접 하지 않아도 됩니다. 첫 두 상품은 토롯코 열차와 호즈강 뱃놀이가 포함되어 있고, 세 번째 상품에는 기요미즈데라도 포함되며, 네 번째 상품은 토롯코 열차 탑승 여부를 선택할 수 있어 동절기 운행 중단 기간에 가까운 날짜라면 이 상품을 확인하세요. 여행 날짜의 예약 가능 여부와 현재 가격은 상품 페이지에서 확인하세요."
          tours={guidedPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/arashiyama-bamboo-forest-tour", title: "아라시야마 대나무숲 투어(2026): 추천 방문 시간, 투어, 교토에서 가는 방법(영어)" },
            { href: "/guides/attractions/things-to-do-kyoto", title: "교토에서 즐길 거리(2026): 사찰, 방문 시간대, 미리 예약할 것(영어)" },
            { href: "/guides/attractions/kyoto-kimono-rental", title: "교토 기모노 대여(2026): 지역, 포함 사항, 반납 시간(영어)" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "오사카 출발 교토·나라 당일 투어(2026): 어떤 일정을 예약할까(영어)" },
            { href: "/guides/attractions/arima-onsen-day-trip", title: "아리마 온천 당일치기(2026): 오사카·고베 출발과 온천 요금(영어)" },
            { href: "/guides/transport/kyoto-transportation", title: "교토 교통 가이드(2026): 버스, 열차, 택시(영어)" },
            { href: "/guides/attractions/kansai-area-pass", title: "간사이 에어리어 패스(2026): 요금, 이용 범위, 구매할 가치가 있을까(영어)" },
            { href: "/guides/attractions/nara-day-trip", title: "나라 당일치기(2026): 오사카·교토 출발과 도다이지 요금(영어)" },
            { href: "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary", title: "도쿄·교토·오사카 7일 일정(2026): 날짜별 코스(영어)" },
            { href: "/ko", title: "일본 여행 준비 가이드 더 보기 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>토롯코 열차로 가메오카까지, 뱃놀이로 아라시야마까지</h2>
            <p className={styles.ctaBannerDesc}>
              토롯코 열차 편도와 반대 방향의 호즈강 뱃놀이를 연계하면 출발한 곳에서 하루를 마칠 수 있습니다. 지정석은
              1개월 전에 예매가 시작되고 겨울에는 운행을 중단하므로, 당일 일정을 짜기 전에 운행 날짜부터 확인하세요.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                열차 + 뱃놀이 투어 보기 →
              </KlookLink>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                토롯코 열차 티켓 보기 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
