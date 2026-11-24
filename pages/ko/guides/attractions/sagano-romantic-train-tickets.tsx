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
  "사가노 토롯코 열차는 승차일 1개월 전 일본 시간 0시에 예매가 열리고 편도 ¥880입니다. 11~12월 운행일과 겨울 운휴 안내.";

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
    label: "사가노 토롯코 열차, 호즈강 뱃놀이, 아라시야마 산책",
    ctaLabel: "열차와 뱃놀이 투어 보기 →",
    url: TOUR_URL,
    why: "토롯코 열차와 아라시야마로 내려오는 호즈강 뱃놀이를 한 번에 예약합니다. 판매 창구 두 곳을 따로 챙기고 싶지 않은 분께 맞습니다.",
  },
  {
    kind: "워킹 투어",
    label: "아라시야마 대나무숲 이른 아침 워킹 투어",
    ctaLabel: "아침 산책 투어 보기 →",
    url: WALK_URL,
    why: "사가아라시야마역에서 출발해 한적한 길을 2.5시간 걷는 소규모 그룹 투어로, 말차 다도 체험으로 마무리합니다. 토롯코 열차를 타는 날의 대나무숲 일정에 해당합니다.",
  },
  {
    kind: "eSIM",
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    url: ESIM_URL,
    why: "운영사는 운휴일이 추가되거나 바뀔 수 있다고 안내하므로, 타는 날 휴대폰으로 공지를 확인하는 것이 좋습니다.",
  },
];

const bookingRows = [
  {
    method: "대부분에게 맞는 곳: 운영사 공식 사이트",
    opens: "승차일 1개월 전(전달의 같은 날) 일본 시간 0시. 2027년 3월 1일 이후 승차분은 30일 전",
    cost: `운임만 냅니다. 어른 ${ADULT}, 어린이 ${CHILD}. 전날 23:59까지 무료 취소, 좌석 변경은 3회까지 무료. 1회 최대 8장, 3-D 시큐어를 지원하는 신용카드 또는 체크카드`,
  },
  {
    method: "클룩(토롯코 열차 티켓)",
    opens: "예매 가능한 날짜는 상품 페이지에 표시됩니다",
    cost: "가격과 취소 규정은 상품 페이지에 있으니 결제 전에 확인하세요",
  },
  {
    method: "토롯코역 매표소(사가, 아라시야마, 가메오카)",
    opens: "당일만, 선착순. 토롯코 사가역 약 08:35, 토롯코 아라시야마역 08:50, 토롯코 가메오카역 09:10부터",
    cost: "운임만 냅니다. 현금, 신용카드, IC 카드(PiTaPa 제외). 지정석이 매진되면 입석권을 한정 판매. 토롯코 호즈쿄역은 판매하지 않음",
  },
  {
    method: "JR 매표소",
    opens: "판매처가 아닙니다",
    cost: "운영사 FAQ가 판매처로 안내하는 곳은 공식 사이트와 토롯코역 매표소뿐입니다. JR 패스와 청춘 18 티켓은 사용할 수 없습니다",
  },
  {
    method: "15명 이상 단체",
    opens: "여행사를 통해 1년 전부터 1개월 전까지",
    cost: "어른 ¥800, 어린이 ¥400. 단체는 5호차를 이용할 수 없고, 당일 단체 할인은 없습니다",
  },
];

const calendarRows = [
  { dates: "2026년 11월 1일 ~ 12월 29일", runs: "12월 16일(수)을 제외하고 매일 운행", trains: "토롯코 사가역 출발 정기 열차 09:02 ~ 16:02", sale: "12월 16일까지 승차분은 판매 중이고, 12월 17~29일 승차분은 11월 17~29일 일본 시간 0시에 판매 시작" },
  { dates: "11월 1~13일", runs: "운행", trains: "정기 열차 + 임시 열차 81/82(사가 17:10 출발)", sale: "판매 중" },
  { dates: "11월 14~30일", runs: "운행", trains: "정기 열차 + 81/82 + 91/92(사가 18:26 출발)", sale: "판매 중" },
  { dates: "12월 1~4일", runs: "운행", trains: "정기 열차 + 81/82", sale: "판매 중" },
  { dates: "12월 5~6일(토~일)", runs: "운행", trains: "정기 열차 + 81/82 + 91/92", sale: "판매 중" },
  { dates: "12월 7~13일", runs: "운행", trains: "정기 열차 + 81/82", sale: "판매 중" },
  { dates: "12월 14~15일", runs: "운행", trains: "정기 열차만", sale: "판매 중" },
  { dates: "12월 16일(수)", runs: "운휴", trains: "열차 없음", sale: "—" },
  { dates: "12월 17~25일", runs: "운행", trains: "정기 열차만", sale: "11월 17~25일 일본 시간 0시" },
  { dates: "12월 26~27일(토~일)", runs: "운행", trains: "정기 열차 + 81/82", sale: "11월 26~27일 일본 시간 0시" },
  { dates: "12월 28~29일", runs: "운행. 12월 29일은 현재 차량의 마지막 운행일", trains: "정기 열차만", sale: "11월 28~29일 일본 시간 0시" },
  { dates: "2026년 12월 30일 ~ 2027년 2월 28일", runs: "겨울 운휴", trains: "열차 없음", sale: "—" },
];

const directionRows = [
  {
    dir: "대부분에게 맞는 방향: 토롯코 사가 → 토롯코 가메오카(하행)",
    times: "토롯코 사가역에서 09:02 ~ 16:02 매시 출발. 아래 달력의 날짜에는 17:10과 18:26 임시 열차 운행",
    seats: "C와 D가 진행 방향, A와 D가 창가 좌석",
    fit: "가메오카에서 아라시야마로 내려오는 호즈강 뱃놀이와 이어집니다. 예매 화면에서 사가/아라시야마 → 가메오카 방향을 고르세요. 사가 출발 티켓으로 토롯코 아라시야마역에서도 탈 수 있습니다",
  },
  {
    dir: "토롯코 가메오카 → 토롯코 사가(상행)",
    times: "토롯코 가메오카역에서 09:30 ~ 16:30 매시 출발. 같은 날짜에 17:43과 18:59 임시 열차 운행",
    seats: "A와 B가 진행 방향, A와 D가 창가 좌석",
    fit: "아라시야마에서 끝나므로 열차를 탄 뒤 대나무숲에 갈 수 있습니다. 가메오카까지는 JR로 우마호리역에 가서 걸어서 약 10분입니다. 운영사는 16:30 출발 열차부터 라이트업을 볼 수 있다고 안내합니다. 토롯코 아라시야마역에서 내릴 수는 있지만 다시 탈 수는 없습니다",
  },
];

const fareRows = [
  { ticket: "어른, 편도", price: ADULT, note: "토롯코 사가 ~ 토롯코 가메오카 전 구간이든 더 짧은 구간이든 같은 요금입니다. 거리에 따라 달라지지 않습니다." },
  { ticket: "어린이, 편도(6~11세)", price: CHILD, note: "어른 요금의 정확히 절반입니다. 운영사는 어린이를 6세 이상 12세 미만으로 정합니다." },
  { ticket: "15명 이상 단체, 어른", price: "¥800", note: "어린이 ¥400. 운영사는 당일 티켓에는 단체 할인이 없다고 밝힙니다." },
  { ticket: "학생 단체, 어른", price: "¥710", note: "어린이 ¥360. 운영사의 학교·학생 단체 요금표 기준입니다." },
  { ticket: "반려동물(케이지 이용)", price: "¥260", note: "수하물 요금입니다. 케이지는 길이 70cm 이내, 세 변의 합 약 90cm, 무게 10kg 이내여야 합니다." },
];

const changeRows = [
  { item: "어른, 편도, 좌석 이용", now: `${ADULT}, 좌석 포함`, next: `${ADULT_2027}: 운임 ${ADULT} + 좌석 요금 ${SEAT_FEE_ADULT}` },
  { item: "어린이, 편도, 좌석 이용", now: `${CHILD}, 좌석 포함`, next: `${CHILD_2027}: 운임 ${CHILD} + 좌석 요금 ${SEAT_FEE_CHILD}` },
  { item: "좌석 없이 승차", now: "지정석이 매진된 뒤 당일 판매하는 한정 입석권", next: `각 차량의 데크에서 운임만으로 승차: 어른 ${ADULT}, 어린이 ${CHILD}` },
  { item: "개별실", now: "없음", next: "4호차 프리미엄 캐빈 란쿄(Premium Cabin Rankyo): 1실 ¥9,000, 최대 6명, 승객별 운임 별도. 토롯코 사가역 또는 토롯코 가메오카역에서 승차" },
  { item: "온라인 판매 시작", now: "승차 1개월 전 일본 시간 0시", next: "승차 30일 전 일본 시간 0시. 2027년 3월 1일 승차분만 2027년 2월 1일 오전 10시경" },
  { item: "차량", now: "개방형 5호차 '리치호'를 포함한 현재 차량. 2026년 12월 29일에 은퇴", next: "새 5량 편성 열차: 기관차 1량과 객차 4량, 발밑까지 내려오는 옆 유리창과 높은 유리 천장" },
  { item: "첫 운행과 마지막 운행", now: "마지막 운행 2026년 12월 29일", next: "첫 운행 2027년 3월 1일: 사가노 3호, 토롯코 사가역 10:02 출발" },
  { item: "겨울 운휴", now: "2026년 12월 30일 ~ 2027년 2월 28일", next: "2027년 12월 30일과 31일은 운휴. 2028년 1~2월은 아직 발표되지 않음" },
];

const seasonRows = [
  { period: "현재 ~ 2026년 12월 29일", status: "운행", note: "토롯코 사가역 정기 열차는 09:02 ~ 16:02에 출발하고, 토롯코 가메오카역 막차는 16:30에 출발합니다. 12월 29일(화)이 현재 차량의 마지막 운행일입니다." },
  { period: "2026년 12월 16일", status: "운휴", note: "운영사의 2026년 달력에서 시즌 종료 전에 남은 유일한 운휴일입니다. 운영사는 운휴일이 추가되거나 바뀔 수 있다고 안내합니다." },
  { period: "2026년 10월 24일 ~ 12월 29일", status: "라이트업", note: "16:30부터 막차까지 선로 주변에 조명을 켜며, 운영사는 토롯코 가메오카역 16:30 출발 사가노 16호부터 라이트업을 볼 수 있다고 안내합니다. 임시 열차 81/82(토롯코 사가역 17:10 출발)는 10월 24일 ~ 12월 13일과 12월 26~27일, 임시 열차 91/92(18:26)는 11월 14~30일과 12월 5~6일에 운행합니다." },
  { period: "2026년 12월 30일 ~ 2027년 2월 28일", status: "운휴", note: "겨울 운휴 기간입니다. 운영사의 2026년 달력은 12월 30일과 31일을 겨울 운휴일로 표시하고, 2027년 운행 일정은 3월 1일부터 시작합니다." },
  { period: "2027년 3월 1일부터", status: "신형 열차", note: "신형 열차는 10:02 사가노 3호부터 운행하므로 그날은 09:02 열차가 없습니다. 정기 시간표는 토롯코 사가역 09:02 ~ 16:02로 그대로입니다. 2027년 달력은 성수기 주간을 제외한 대부분의 수요일(예: 3월 10일, 4월 14일)이 운휴이므로 날짜를 확인하세요." },
];

const carRows = [
  { car: "1~4호차, 일반 차량(2026년 12월 29일까지)", what: "창문을 열 수 있는 지붕 있는 차량으로, 4인 박스석, 나무 벤치, 백열전구가 있습니다. 화물차를 개조한 차량이라 소리도 그만큼 큽니다.", pick: "기본 선택이며, 비 예보가 있다면 이 차량을 고르는 것이 맞습니다. 좌석은 호차 번호와 A~D 좌석 기호로 판매합니다." },
  { car: "5호차, 리치호(2026년 12월 29일까지)", what: "창문이 전혀 없는 개방형 차량으로 유리 천장이 있고, 기관차에 가장 가까운 칸입니다. 운영사는 비가 오면 차 안이 젖을 수 있고, 차내 우산 사용은 금지이며, 비로 인한 환불은 없다고 안내합니다.", pick: "협곡 풍경을 보려면 이 차량을 예매하고, 폭우가 오면 후회할 수 있는 차량입니다. 우비를 챙기세요. 예매 화면에서 \"No. 5\"를 직접 골라야 하며, 자동으로 배정되지 않습니다." },
  { car: "1~4호차, 신형 열차(2027년 3월 1일부터)", what: "발밑까지 내려오는 옆 유리창, 높은 유리 천장, 목재 마감 좌석과 바닥, 각 차량 출입문 쪽의 지붕 있는 반야외 데크가 있습니다. 4호차에는 앞쪽 풍경을 볼 수 있는 다다미풍 벤치의 란쿄 객실도 있습니다.", pick: `좌석은 어른 ${ADULT_2027}입니다. 데크는 ${ADULT}, 객실은 1실 ¥9,000에 운임 별도입니다. 보도자료에는 신형 차량의 좌석 배치도가 없습니다.` },
];

const combinationRows = [
  { option: "토롯코 열차 편도만", cost: `어른 ${ADULT}, 어린이 ${CHILD}. 2027년 3월 1일부터 좌석 이용 시 ${ADULT_2027}, ${CHILD_2027}`, time: "열차 약 25분", pick: "아라시야마가 교토 하루 일정 중 한 곳일 때 맞습니다. 사가에서 가메오카까지 탄 뒤 JR 우마호리역까지 10분 걸어 JR 사가노선으로 돌아옵니다. 돌아오는 구간은 일반 열차 운임입니다." },
  { option: "토롯코 열차 편도 + 돌아오는 호즈강 뱃놀이", cost: `어른 ${ADULT} + ¥6,000, 어린이 ${CHILD} + ¥4,500(열차 운임은 2026년 12월 29일까지 기준)`, time: "약 반나절. 올라가는 데 25분, 내려오는 데 약 2시간", pick: "가장 많이 하는 조합이고, 대부분의 사람이 이 열차를 타는 이유입니다. 배가 아라시야마에서 끝나므로 돌아오는 열차 없이 출발한 곳에서 오전 일정을 마칩니다." },
  { option: "둘 다 포함된 가이드 투어", cost: "날짜별 가격은 상품 페이지에서 확인", time: "일정에 따라 반나절 또는 하루", pick: "가을 날짜이거나, 뱃놀이 운항 시기가 맞지 않거나, 한 시간 간격의 예약 두 건을 따로 관리하고 싶지 않다면 맞습니다. 가이드 투어는 걸어서 갈 수 없는 토롯코 가메오카역과 선착장 사이의 이동도 해결합니다." },
];

const steps = [
  { title: "먼저 운행 달력에서 날짜를 확인하세요", desc: `열차가 운행하지 않으면 다른 준비는 의미가 없습니다. 2026년 12월 29일까지 운행하고, 12월 30일부터 2027년 2월 28일까지 운휴한 뒤 2027년 3월 1일에 다시 운행합니다. 운영사는 시즌 중에도 정해진 날 운휴하며, 이 날짜는 연간 달력에 표시됩니다. ${CHECKED} 확인.` },
  { title: "일본 시간 0시에 예매가 열리면 바로 온라인으로 예매하세요", desc: "2026년 승차분은 승차일 1개월 전 0시에 판매가 시작됩니다. 2027년 3월 1일 이후 승차분은 30일 전 0시에 시작하며, 3월 1일 승차분만 2027년 2월 1일 오전 10시경에 판매합니다. 역에서는 사전 티켓을 판매하지 않습니다. 가을 단풍 기간에는 원하는 날짜부터 먼저 매진됩니다." },
  { title: "날짜만이 아니라 호차와 좌석도 고르세요", desc: "예매 화면에서 호차 번호와 4인 박스석 안의 A~D 좌석 기호를 고릅니다. 운영사 FAQ에 따르면 A와 D가 창가 좌석이고, 가메오카행 열차는 C와 D, 사가행 열차는 A와 B가 진행 방향입니다. 개방형 5호차 리치호는 2026년 12월 29일까지 예매 화면에서 \"No. 5\"를 직접 골라야 합니다. 운영사는 1~4호차의 강 쪽과 산 쪽 좌석을 따로 안내하지 않으므로, 풍경이 목적이라면 좌석 기호보다 개방형 차량을 고르는 것이 맞습니다." },
  { title: "당일에는 QR 코드를 보여 주세요", desc: "운영사 FAQ에 따르면 QR 코드는 승차 당일에만 스마트폰이나 태블릿에 표시되며, 인쇄한 바우처만으로는 탈 수 없습니다. 전날 23:59까지 무료로 취소할 수 있고, 그때까지 같은 열차 안에서 좌석을 3회까지 바꿀 수 있습니다. 당일에는 환불과 변경이 되지 않습니다." },
  { title: "매진이라면 당일 티켓을 사러 가세요", desc: "당일 티켓은 토롯코 호즈쿄역을 제외한 모든 역 매표소에서 선착순으로 판매합니다. 운영사가 안내하는 판매 시작 시간은 토롯코 사가역 약 08:35, 토롯코 아라시야마역 08:50, 토롯코 가메오카역 09:10이며, 지정석이 매진되면 입석권을 한정 판매합니다." },
  { title: "뱃놀이는 따로, 올바른 방향으로 예약하세요", desc: `호즈강 뱃놀이는 가메오카에서 아라시야마로 강을 따라 내려갑니다. 열차와 반대 방향이라 두 가지를 이어서 탈 수 있습니다. 가메오카시가 공시한 요금은 어른 ¥6,000, 4세~초등학생 ¥4,500이고 약 2시간 걸립니다. 주요 운항 기간은 3월 10일 ~ 11월 30일, 12월 중순 ~ 3월 9일은 난방 배, 12월 29일 ~ 1월 4일은 운항하지 않으며, 악천후나 수위가 높을 때는 운항을 중단합니다. ${BOAT_CHECKED} 확인.` },
];

const faqItems: FaqItem[] = [
  {
    q: "사가노 토롯코 열차는 언제 예매해야 하나요?",
    a: `승차일 1개월 전 일본 시간 0시에 운영사 공식 사이트에서 예매하세요. 승차일 티켓은 전달의 같은 날에 판매를 시작하므로, 2026년 12월 29일 승차분은 11월 29일 0시에 열립니다. 운영사가 11월 중순 ~ 12월 초로 안내하는 단풍 시기에는 판매가 열리는 그 시각에 예매하세요. 전 좌석 지정석이고, 운영사는 날짜별 매진 시점을 공개하지 않습니다. 2027년 3월 1일 이후 승차분은 30일 전으로 바뀌고, 3월 1일 승차분은 2027년 2월 1일 오전 10시경에 판매합니다. 전날 23:59까지 무료 취소할 수 있습니다. ${CHECKED} 확인.`,
  },
  {
    q: "사가노 토롯코 열차 티켓을 당일에 살 수 있나요?",
    a: `토롯코 사가역, 토롯코 아라시야마역, 토롯코 가메오카역 매표소에서 선착순으로 살 수 있고, 토롯코 호즈쿄역에서는 팔지 않습니다. 운영사가 안내하는 판매 시작 시간은 각각 약 08:35, 08:50, 09:10이며, 성수기에는 세 역 모두 08:35경에 판매를 시작합니다. 지정석이 매진되면 차량별로 입석권을 한정 판매하고, 입석권까지 매진되면 그 열차는 만석입니다. 매표소에서는 현금, 신용카드, PiTaPa를 제외한 IC 카드로 결제할 수 있습니다. ${CHECKED} 확인.`,
  },
  {
    q: "사가노 토롯코 열차는 어느 방향으로 타는 것이 좋나요?",
    a: `대부분은 토롯코 사가 → 토롯코 가메오카 방향이 좋습니다. 호즈강 뱃놀이가 반대로 가메오카에서 아라시야마로 내려오므로 두 가지를 이어서 한 바퀴를 돌 수 있습니다. 대나무숲에서 일정을 마치고 싶거나 라이트업을 보고 싶다면 가메오카 → 사가 방향을 타세요. 운영사는 가메오카 16:30 출발 열차부터 라이트업을 볼 수 있다고 안내합니다. 요금은 어느 방향이든 ${ADULT}로 같습니다. 운영사 FAQ에 따르면 가메오카행 열차는 C와 D, 사가행 열차는 A와 B 좌석이 진행 방향입니다. ${CHECKED} 확인.`,
  },
  {
    q: "2026~27년 겨울에도 사가노 토롯코 열차가 운행하나요?",
    a: `2026년 12월 29일까지만 운행합니다. 11월 1일부터 12월 29일까지 12월 16일(수)을 제외하고 매일 운행한 뒤, 2026년 12월 30일부터 2027년 2월 28일까지 운휴하고 2027년 3월 1일 신형 열차로 운행을 재개합니다. 운영사의 2026년 달력은 12월 30일과 31일을 겨울 운휴일로 표시하고, 2027년 운행 일정은 3월 1일부터 시작합니다. ${CHECKED} 확인.`,
  },
  {
    q: "2027년 사가노 토롯코 신형 열차로 무엇이 바뀌나요?",
    a: `2027년 3월 1일부터 새 5량 편성 열차가 현재 차량을 대신하며, 현재 차량은 2026년 12월 29일에 은퇴합니다. 그대로인 운임 ${ADULT}에 좌석 요금 ${SEAT_FEE_ADULT}(어린이 ${SEAT_FEE_CHILD})가 더해져 어른 좌석은 ${ADULT_2027}이 됩니다. 각 차량의 지붕 있는 데크는 운임만 내면 되고, 4호차 프리미엄 캐빈 란쿄는 최대 6명이 이용하는 1실 ¥9,000에 운임이 별도입니다. 온라인 판매는 승차 30일 전으로 바뀝니다. 첫 열차는 3월 1일 10:02 사가노 3호입니다. ${CHECKED} 확인.`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "사가노 토롯코 열차 요금은 얼마인가요?",
    a: `2026년 12월 29일까지 편도 어른 ${ADULT}, 6~11세 어린이 ${CHILD}이며, 토롯코 사가역과 토롯코 가메오카역 사이 7.3km 전 구간에 적용됩니다. 거리와 관계없이 같은 요금입니다. 운영사 요금표 기준으로 15명 이상 단체는 ¥800과 ¥400, 학생 단체는 ¥710과 ¥360이며, 당일 티켓에는 단체 할인이 없습니다. 케이지에 넣은 반려동물은 수하물 요금 ¥260입니다. ${CHECKED} 확인.`,
  },
  {
    q: "사가노 토롯코 열차는 얼마나 걸리고, 어디까지 가나요?",
    a: "토롯코 사가역에서 토롯코 아라시야마역과 토롯코 호즈쿄역을 지나 토롯코 가메오카역까지 호즈강 협곡을 따라 7.3km를 약 25분에 달립니다. 토롯코 사가역 출발은 09:02부터 16:02까지 대략 1시간 간격이고, 성수기에는 임시 열차가 더해집니다. 순환선이 아니라 편도 노선이므로, 예매 전에 어떻게 돌아올지 정해 두어야 합니다.",
  },
  {
    q: "사가노 토롯코 열차가 운행하지 않는 날은 언제인가요?",
    a: `운영사는 겨울뿐 아니라 시즌 중에도 정해진 날 운휴합니다. 2026년에 시즌 종료 전 남은 운휴일은 12월 16일뿐입니다. 2027년 달력에서는 성수기 주간을 제외한 수요일이 대부분 운휴이며 3월 10일과 4월 14일부터 시작하고, 11월에는 운휴일이 없습니다. 운영사는 운휴일이 바뀔 수 있다고 안내하므로, 여행 날짜를 달력에서 확인하세요. ${CHECKED} 확인.`,
  },
  {
    q: "리치호를 탈 수 있는 마지막 날은 언제인가요?",
    a: `날짜가 바뀌지 않는다면 2026년 12월 29일(화)입니다. 운영사는 개방형 5호차를 포함한 현재 차량이 그날 운행을 끝으로 은퇴할 예정이라고 밝혔고, 신형 열차 보도자료는 대신 유리 벽 차량과 지붕 있는 데크를 소개합니다. 단체 예매는 5호차를 이용할 수 없고, 마지막 며칠의 좌석은 1개월 전에 판매가 시작되므로 12월 29일 승차분은 11월 29일 일본 시간 0시에 열립니다. ${CHECKED} 확인.`,
  },
  {
    q: "강을 보려면 어느 쪽에 앉아야 하나요?",
    a: "현재 열차에 대해 운영사는 좌석 배치도를 공개합니다. 1~4호차는 창문이 있는 4인 박스석이고 좌석은 A~D로 표시하며, FAQ에 따르면 A와 D가 창가 좌석이고 가메오카행은 C와 D, 사가행은 A와 B가 진행 방향입니다. 그러나 어느 쪽이 호즈강을 향하는지는 공개하지 않으므로, 왼쪽이나 오른쪽이라고 단정하는 정보는 철도회사가 아닌 누군가의 추측입니다. 운영사 자료로 확인할 수 있는 답은 개방형 5호차 리치호입니다. 창문이 없고 유리 천장이 있어 양쪽 협곡을 모두 볼 수 있으며, 예매할 때 직접 골라야 합니다.",
  },
  {
    q: "개방형 5호차 리치호를 탈 만한가요?",
    a: "2026년 12월 29일까지는 같은 계곡을 지나는 일반 JR 열차 대신 이 노선을 타는 이유가 되는 차량이고, 어느 좌석을 배정받든 풍경이 같은 유일한 차량입니다. 단점도 공개되어 있습니다. 창문이 없어 비가 오면 차 안이 젖을 수 있고, 차내에서는 우산을 쓸 수 없으며, 운영사는 비로 인한 환불이 없다고 밝힙니다. 우비를 챙기고 전날 일기예보를 확인하세요. 예보가 나쁘면 1~4호차 좌석을 예매하는 것이 더 낫습니다.",
  },
  {
    q: "토롯코 사가역과 토롯코 가메오카역은 어떻게 가나요?",
    a: "토롯코 사가역은 JR 사가노선 사가아라시야마역 바로 옆으로 걸어서 약 5분이고, 게이후쿠 아라시야마선 란덴 사가역에서도 약 5분, 한큐 아라시야마역에서는 걸어서 20분입니다. 반대편 끝의 토롯코 가메오카역은 JR 산인(사가노)선 우마호리역에서 걸어서 약 10분이라, 토롯코 열차로 올라가고 JR로 돌아오는 일정을 쉽게 짤 수 있습니다.",
  },
  {
    q: "호즈강 뱃놀이도 함께 해야 하나요?",
    a: `하루의 나머지 절반으로 자연스러운 선택입니다. 배가 반대 방향인 가메오카에서 아라시야마로 강을 따라 내려오므로 출발한 곳에서 일정이 끝납니다. 가메오카시가 공시한 요금은 어른 ¥6,000, 4세~초등학생 ¥4,500이고 물 위에서 약 2시간이며, 주요 운항 기간은 3월 10일 ~ 11월 30일, 12월 중순 ~ 3월 9일은 지붕과 난방이 있는 배로 운항합니다. 12월 29일 ~ 1월 4일은 운항하지 않고, 악천후나 수위가 높을 때는 운항을 중단합니다. 환불되지 않는 일정을 짜기 전에 알아 두세요. ${BOAT_CHECKED} 확인.`,
  },
  {
    q: "아이와 함께 사가노 토롯코 열차를 탈 만한가요?",
    a: `탈 만하고 요금도 부담이 적습니다. 2026년 12월 29일까지 어린이 ${CHILD}, 어른 ${ADULT}(2027년 3월 1일부터 좌석 이용 시 ${CHILD_2027}, ${ADULT_2027})이고, 25분 승차라 아이가 지루해하기 전에 끝납니다. 운영사 자료에 나온 실용 정보 두 가지는 유모차를 차내에서 접어야 한다는 것과 열차에 휠체어 공간이 두 곳 있다는 것입니다. 안내견과 보조견은 탈 수 있고, 다른 반려동물은 케이지와 ¥260 요금이 필요합니다. 5호차는 아이들이 가장 타고 싶어 하는 차량이면서 창문이 없는 차량이므로, 다수결보다 날씨를 보고 정하세요.`,
  },
];

const winterPicks = [
  withKlookLocale(saganoHozugawaGuaranteedTour, LOCALE, {
    title: "사가노 토롯코 열차, 호즈강 뱃놀이, 아라시야마 산책",
    desc: "2026년 12월 29일까지 또는 2027년 3월 1일 이후 날짜용입니다. 토롯코 열차 편도, 아라시야마로 내려오는 뱃놀이, 대나무숲 자유 시간이 포함됩니다.",
  }),
  withKlookLocale(arashiyamaEarlyMorningWalk, LOCALE, {
    title: "아라시야마 대나무숲 이른 아침 워킹 투어",
    desc: "사가아라시야마역에서 출발해 주요 경로를 벗어난 한적한 길을 2.5시간 걷는 소규모 그룹 투어로, 말차 다도 체험으로 마무리합니다.",
  }),
  { title: "아라시야마 호텔", desc: "대나무숲 근처에 묵고 사람이 붐비기 전에 도착하세요.", url: ARASHIYAMA_HOTELS_URL },
  { title: "교토역 근처 호텔", desc: "사가아라시야마로 가는 JR 사가노선이 여기서 출발하며, 쾌속으로 약 11분입니다.", url: KYOTO_STATION_HOTELS_URL },
  { title: "클룩 일본 eSIM", desc: "QR 코드 바우처로 받는 일본 eSIM으로, 휴대폰에서 지도와 예약 페이지를 볼 때 씁니다.", url: ESIM_URL },
  withKlookLocale(saganoRomanticTrainTicket, LOCALE, {
    title: "사가노 토롯코 열차 티켓",
    desc: "여행 날짜가 운휴 기간 전후라면 토롯코 열차 편도 좌석입니다.",
  }),
];

const guidedPicks = [
  withKlookLocale(saganoHozugawaGuaranteedTour, LOCALE, {
    title: "사가노 토롯코 열차, 호즈강 뱃놀이, 아라시야마 산책",
    desc: "출발이 확정된 투어로, 토롯코 열차 편도, 아라시야마로 내려오는 호즈강 뱃놀이, 대나무숲 자유 시간이 포함됩니다.",
  }),
  withKlookLocale(arashiyamaHozukyoHalfDayTour, LOCALE, {
    title: "아라시야마와 호즈쿄 협곡 반일 투어",
    desc: "사가노 토롯코 열차, 호즈강 뱃놀이, 아라시야마 명소를 한 번에 예약하는 반나절 투어입니다.",
  }),
  withKlookLocale(saganoArashiyamaKiyomizuTour, LOCALE, {
    title: "사가노 토롯코 열차, 아라시야마, 기요미즈데라 반일 투어",
    desc: "토롯코 열차, 아라시야마, 기요미즈데라를 버스 일정 하나로 도는 가이드 동행 반나절 투어입니다.",
  }),
  withKlookLocale(arashiyamaSaganoOptionalTour, LOCALE, {
    title: "사가노 토롯코 열차 선택형 아라시야마 투어",
    desc: "대나무숲과 아라시야마 명소에 토롯코 열차를 선택 옵션으로 더하는 투어로, 겨울 날짜라면 이 상품을 확인하세요.",
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
            호즈강 협곡을 따라 달리는 교토의 토롯코 열차입니다. 좌석은 1개월 전에 판매가 열리고, 현재 차량은 12월
            29일에 은퇴하며, 3월까지 운휴한 뒤 2027년 3월 1일에 신형 열차가 운행을 시작합니다.
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
            운영사 공식 사이트에서 판매가 시작되므로, 현재 열차의 마지막 운행일인 2026년 12월 29일 승차분은 11월 29일
            0시에 열립니다. 운영사가 <strong>11월 중순 ~ 12월 초</strong>로 안내하는 단풍 시기에는 판매가 열리는 0시에
            예매하세요. 운영사는 매진 시점을 공개하지 않으며, 온라인 좌석이 매진되면 역 매표소에서 파는 당일 좌석과
            한정 입석권만 남습니다. 요금은 편도 어른 <strong>{ADULT}</strong>, 어린이 <strong>{CHILD}</strong>이고,{" "}
            <strong>2026년 12월 30일부터 2027년 2월 28일까지 운휴</strong>합니다. <strong>2027년 3월 1일</strong>부터는
            좌석 요금 {SEAT_FEE_ADULT}이 붙는 신형 열차가 운행해 좌석은 <strong>{ADULT_2027}</strong>이 되고, 판매는{" "}
            <strong>30일 전</strong>부터 시작합니다. 공식 수치는 {CHECKED}에 확인했습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>이 여행 예약하기</span>
          <h2 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>
            토롯코 열차 좌석과 하루 일정 예약
          </h2>
          <p className={styles.bodyText}>
            아라시야마 하루 일정 중 판매 기간이 엄격하게 정해진 것은 열차 좌석뿐입니다. 돌아오는 뱃놀이, 가이드 동행
            산책, 모바일 데이터는 한 번에 예약할 수 있습니다. 상품 페이지에서 여행 날짜의 예약 가능 여부와 현재 가격을
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
                <p className={styles.verdictStatLabel}>겨울 운휴</p>
                <p className={styles.verdictStatValue}>12월 30일 ~ 2월 28일</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>예매 시작</p>
                <p className={styles.verdictStatValue}>1개월 전, 2027년 3월부터 30일 전</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              전 구간 <strong>7.3km</strong>는 아라시야마의 <strong>토롯코 사가역</strong>과{" "}
              <strong>토롯코 가메오카역</strong> 사이를 호즈강 협곡을 따라 달리며, 토롯코 사가역 출발은{" "}
              <strong>09:02 ~ 16:02</strong>에 대략 1시간 간격입니다. 어린이 요금은 6~11세에 적용됩니다. 당일 티켓은
              호즈쿄역을 제외한 모든 토롯코역에서 선착순으로 판매합니다. 이 열차에서는{" "}
              <strong>JR 패스를 사용할 수 없습니다</strong>. 클룩에서는 열차 티켓과 열차가 포함된 가이드 투어를 판매합니다.
              요금과 날짜는 {CHECKED}에 운영사 공식 페이지에서 확인했습니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                열차 + 호즈강 뱃놀이 투어 →
              </KlookLink>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                토롯코 열차 티켓만 →
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
            승차일 1개월 전 같은 날 일본 시간 0시에 운영사 공식 사이트에서 예매하세요. 2027년 3월 1일 이후 승차분은
            30일 전으로 바뀌므로 2027년 4월 1일 승차분은 3월 2일 0시에 열립니다. 예외는 2027년 3월 1일 승차분 하나로,
            2027년 2월 1일 오전 10시경부터 판매합니다.
          </p>
          <Table head={["예매처", "판매 시작", "요금과 변경"]} rows={bookingRows.map((r) => [r.method, r.opens, r.cost])} boldFirst />
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
            2026년 11월 1일부터 12월 29일까지 12월 16일(수)을 제외하고 매일 운행합니다. 가을에는 대부분의 날짜에 저녁
            임시 열차가 있고, 12월 30일부터 겨울 운휴에 들어갑니다.
          </p>
          <Table head={["날짜", "운행 여부", "열차", "판매 시작"]} rows={calendarRows.map((r) => [r.dates, r.runs, r.trains, r.sale])} />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {LAST_CHECKED}. 출처: 운영사의 <Src href={LIGHTUP_URL}>2026년 9월 18일 라이트업 보도자료</Src>와{" "}
            <Src href={CALENDAR_URL}>운행 달력</Src>. 임시 열차 81은 토롯코 사가역 17:10, 82는 토롯코 가메오카역 17:43,
            91은 사가역 18:26, 92는 가메오카역 18:59에 출발합니다. 운영사는 운휴일과 임시 열차가 추가되거나 바뀔 수
            있으며, 예매한 열차가 운휴하면 운임이 카드로 자동 환불된다고 안내합니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>방향</span>
          <h2 className={styles.sectionTitle}>사가 → 가메오카와 가메오카 → 사가, 어느 방향이 좋나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            호즈강 뱃놀이로 아라시야마에 돌아올 수 있으므로 대부분은 사가 → 가메오카 방향이 좋습니다. 요금은 어느
            방향이든 {ADULT}이고, 달라지는 것은 출발 시간, 진행 방향 좌석, 도착하는 곳입니다.
          </p>
          <Table head={["방향", "출발 시간", "진행 방향 좌석", "고르는 이유"]} rows={directionRows.map((r) => [r.dir, r.times, r.seats, r.fit])} boldFirst />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {LAST_CHECKED}. 출처: 운영사의 <Src href={FAQ_URL}>FAQ</Src>(좌석과 통과 승차)와{" "}
            <Src href={CALENDAR_URL}>시간표</Src>. 운영사는 방향별 혼잡도나 강을 향한 쪽을 공개하지 않으며, 2026년 12월
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
            <strong>토롯코 가메오카역</strong>까지 갑니다. 차량은 화물차를 개조한 것으로, 나무 벤치, 백열전구, 열 수
            있는 창문이 있고 소리가 큽니다. 5호차 &quot;리치호&quot;는 창문이 전혀 없고 유리 천장이 있습니다. 이
            열차는 2026년 12월 29일에 은퇴합니다.
          </p>
          <p className={styles.bodyText}>
            관광보다 예매가 먼저인 이유는 두 가지입니다. 첫째, 전 좌석이 번호가 붙은 지정석이고 온라인 판매는 1개월
            전에 열리므로 가을 날짜는 도착하기 한 달 전에 정해집니다. 둘째, 계절 운휴가 있는 <em>편도</em> 노선입니다.
            어떻게 돌아올지, 그리고 여행 날짜에 열차가 운행하는지가 어느 좌석을 고를지보다 중요합니다.{" "}
            <Link href="/guides/attractions/kyoto-2-day-itinerary" style={linkStyle}>
              교토 2일 일정(영어)
            </Link>
            과{" "}
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>
              교토 3일 일정(영어)
            </Link>
            에서 교토 여행 중 이 열차가 들어가는 위치를 볼 수 있습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금</span>
          <h2 className={styles.sectionTitle}>사가노 토롯코 열차 요금은 얼마인가요?</h2>
          <Table head={["티켓", "요금", "내용"]} rows={fareRows.map((r) => [r.ticket, r.price, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            요금은 {CHECKED}에 운영사의 요금 페이지와 2026년 10월 23일 보도자료로 확인했습니다. 2026년 12월 29일까지의
            요금입니다. 이 표에 <em>없는</em> 것도 눈여겨보세요. 개방형 5호차에는 추가 요금이 없어 같은 {ADULT}이고,
            그래서 날짜가 열리면 가장 먼저 매진됩니다. 토롯코 열차와 함께 들르는 교토 관광지의 입장료는{" "}
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
            2027년 3월 1일부터 신형 열차와 좌석 요금이 도입됩니다. 운임은 {ADULT}과 {CHILD} 그대로라서 어른 좌석은{" "}
            {ADULT}에서 {ADULT_2027}으로 오릅니다. 온라인 판매도 승차 30일 전으로 바뀝니다.
          </p>
          <Table head={["바뀌는 항목", "2026년(12월 29일까지)", "2027년(3월 1일부터)"]} rows={changeRows.map((r) => [r.item, r.now, r.next])} />
          <p className={styles.bodyText} style={noteStyle}>
            {CHECKED}에 운영사의 <Src href={RELEASE_URL}>2026년 10월 23일 보도자료</Src>와 2026년 달력으로
            확인했습니다. 보도자료에는 데크 자리를 어떻게 판매하는지, 입석권이 계속되는지, 2027년 3월 이후 단체 요금이
            얼마인지가 나와 있지 않습니다. 운영사의 신형 열차 페이지는 추가 발표를 예고하고 있으니, 이 부분에 맞춰
            계획하기 전에 공식 사이트를 확인하세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>운행 기간</span>
          <h2 className={styles.sectionTitle}>사가노 토롯코 열차는 언제 운행하고, 언제 운휴하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            여행 계획을 가장 많이 틀어지게 하는 부분입니다. 겨울에 두 달 동안 운휴하고, 시즌 중에도 운휴일이 있습니다.
            2026년 저녁에는 라이트업 때문에 늦은 열차를 고를 만합니다.
          </p>
          <Table head={["기간", "운행 여부", "운영사 안내"]} rows={seasonRows.map((r) => [r.period, r.status, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            운행 기간과 운휴일은 {CHECKED}에 확인했습니다. 교토 여행 날짜가 1월이나 2월이라면 이번 여행에서는 토롯코
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
            2026년 12월 29일까지 운행하고, <strong>2026년 12월 30일부터 2027년 2월 28일까지 운휴</strong>합니다. 운영사의
            2026년 달력은 12월 30일과 31일을 겨울 운휴일로 표시하고, 2027년 운행 일정에는 3월 1일 전의 날짜가 없습니다.
            2027년 1~2월에 대한 별도 공지는 없으므로, 이 기간은 두 달력을 근거로 정리했습니다. {CHECKED} 확인.
          </p>
          <p className={styles.bodyText}>
            겨울에도 아라시야마는 갈 만합니다.{" "}
            <Link href="/guides/attractions/arashiyama-bamboo-forest-tour" style={linkStyle}>
              아라시야마 대나무숲(영어)
            </Link>
            은 1년 내내 무료로 개방하며, 이른 아침 대나무숲 산책은{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental" style={linkStyle}>
              아라시야마 기모노 대여(영어)
            </Link>
            와 함께하기 좋습니다. 가메오카시는 12월 중순부터 3월 9일까지 난방이 있는 호즈강 배를 운항하고, 12월 29일부터
            1월 4일까지는 운항하지 않는다고 안내합니다({BOAT_CHECKED} 확인). 대나무숲 가까이 묵고 싶다면{" "}
            <Link href="/guides/attractions/where-to-stay-in-kyoto" style={linkStyle}>
              교토 숙소 지역 가이드(영어)
            </Link>
            에서 아라시야마와 교토역 주변을 비교했습니다.
          </p>
        </section>

        <KlookTourPicks
          heading="열차가 운휴할 때 아라시야마에서 무엇을 예약할 수 있나요?"
          intro="날짜를 옮길 수 있다면 열차와 뱃놀이 투어가 먼저입니다. 클룩은 열차가 운휴하면 이 투어를 취소하고 전액 환불한다고 안내하므로, 지금부터 2026년 12월 29일까지 또는 2027년 3월 1일 이후에만 이용할 수 있습니다(2026년 11월 7일 상품 페이지 확인). 나머지는 겨울 어느 날짜에도 이용할 수 있습니다. 예약 가능 여부와 현재 가격은 상품 페이지에서 확인하세요."
          tours={winterPicks}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>매진</span>
          <h2 className={styles.sectionTitle}>사가노 토롯코 열차가 매진되면 어떻게 하나요?</h2>
          <p className={styles.bodyText}>
            공식 사이트에서 매진되어도 방법이 있습니다. 운영사는 토롯코 사가역, 토롯코 아라시야마역, 토롯코 가메오카역
            매표소에서 <strong>당일 티켓</strong>을 판매하며, 토롯코 호즈쿄역에서는 팔지 않습니다. 판매 시작은 각각 약
            08:35, 08:50, 09:10이고, 성수기에는 세 역 모두 08:35경에 시작합니다. 지정석이 매진되면 차량별로 정원이 찰
            때까지 <strong>입석권</strong>을 한정 판매합니다. 운영사는 열차가 만석이면 탈 수 없을 수도 있다고 안내합니다.
          </p>
          <p className={styles.bodyText}>
            전날 23:59까지 무료로 취소할 수 있으므로, 그날 저녁에 공식 사이트를 다시 확인해 볼 만합니다. 줄을 서고 싶지
            않다면 열차와 뱃놀이를 한 번에 예약하는 가이드 투어가 있으니 여행 날짜로 확인하세요. 열차가 모두 매진되어도
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
          <h2 className={styles.sectionTitle}>어느 호차, 어느 좌석을 예매해야 하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            2027년 3월 1일에 열차가 바뀌므로 답은 여행 날짜에 따라 달라집니다.
          </p>
          <Table head={["호차", "어떤 차량인가", "고를 때"]} rows={carRows.map((r) => [r.car, r.what, r.pick])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            누구나 묻는 <strong>어느 쪽이 강을 향하는지</strong>에 대해 운영사는 현재 열차 기준의 답을 공개하지
            않습니다. 좌석 자료에는 차량 배치(4인 박스석, A~D 좌석 기호)와 5호차 규칙만 나와 있습니다. 그러니 왼쪽이나
            오른쪽을 권하는 정보는 추측으로 보고, 협곡 풍경이 목적이라면 개방형 차량을 고르세요. 같은 페이지의 이용
            편의 정보는 다음과 같습니다. 열차에 휠체어 공간 두 곳, 안내견과 보조견 탑승 가능, 유모차는 접어서 탑승,
            반려동물은 약 70cm, 10kg 이내 케이지에 넣어 ¥260 요금. {CHECKED} 확인.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>토롯코 사가역과 토롯코 가메오카역은 어떻게 가나요?</h2>
          <p className={styles.bodyText}>
            <strong>토롯코 사가역</strong>은 JR 사가노선 <strong>사가아라시야마역</strong> 바로 옆으로 걸어서 약
            5분입니다. 운영사는 게이후쿠 아라시야마선 <strong>란덴 사가역</strong>에서 약 5분,{" "}
            <strong>한큐 아라시야마역</strong>에서 걸어서 약 20분이라고 안내합니다. 교토역에서는 운행 편수가 많은 JR
            사가노선으로 가는 것이 가장 편합니다.
          </p>
          <p className={styles.bodyText}>
            반대편 끝의 <strong>토롯코 가메오카역</strong>은 JR 산인(사가노)선 <strong>우마호리역</strong>에서{" "}
            <strong>걸어서 약 10분</strong>입니다. 그래서 가장 저렴한 일정이 가능합니다. 토롯코 열차를 편도로 타고
            우마호리역까지 걸어가 일반 JR 열차로 돌아오면 됩니다. 호즈강 뱃놀이를 예약했다면 주의할 점도 여기에
            있습니다. 선착장은 토롯코 가메오카역이 아니라 가메오카에 있고, 두 곳은 걸어서 갈 수 있는 거리가 아닙니다.{" "}
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>
              교토 교통 가이드(영어)
            </Link>
            에서 JR, 지하철, 란덴, 버스를 정리했고, 같은 주에 간사이 도시를 오간다면{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={linkStyle}>
              간사이 에어리어 패스(영어)
            </Link>
            로 JR 구간을 이용할 수 있습니다. 다만 사철인 토롯코 열차에는 적용되지 않습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>열차만, 열차 + 뱃놀이, 가이드 투어 중 무엇을 고를까요?</h2>
          <Table head={["선택지", "비용", "시간", "고를 때"]} rows={combinationRows.map((r) => [r.option, r.cost, r.time, r.pick])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            어떤 요약 정보로도 여행 날짜에 대해 답할 수 없는 것이 세 가지 있고, 그래서 상품 페이지를 직접 열어 봐야
            합니다. 그날 토롯코 열차가 운행하는지, 지정석이 매진되었는지, 수위가 높아 호즈강 뱃놀이가 중단되면 취소
            규정이 어떻게 되는지입니다. 위의 뱃놀이 요금은 가메오카시가 공시한 금액(어른 ¥6,000, 4세~초등학생 ¥4,500,
            약 2시간)으로 {BOAT_CHECKED}에 확인했지만, 11월 18일의 예약 가능 여부는 알려 주지 않습니다.
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
          <span className={styles.sectionLabel}>단계별 안내</span>
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
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>더 많은 질문</h3>
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
          intro="네 가지 모두 토롯코 열차 좌석을 대신 확보해 주므로, 1개월 전에 열리는 예매를 직접 챙기지 않아도 됩니다. 처음 두 개는 열차와 호즈강 뱃놀이를 묶었고, 세 번째는 기요미즈데라를 더했으며, 네 번째는 열차를 선택 옵션으로 고를 수 있어 겨울 운휴 기간에 가까운 날짜라면 이 상품을 확인하세요. 여행 날짜의 예약 가능 여부와 현재 가격은 상품 페이지에서 확인하세요."
          tours={guidedPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/arashiyama-bamboo-forest-tour", title: "아라시야마 대나무숲 투어(2026): 추천 시간, 투어, 교토에서 가는 길(영어)" },
            { href: "/guides/attractions/things-to-do-kyoto", title: "교토에서 즐길 거리(2026): 사찰, 시간대, 예약할 것(영어)" },
            { href: "/guides/attractions/kyoto-kimono-rental", title: "교토 기모노 대여(2026): 지역, 포함 사항, 반납 시간(영어)" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "오사카 출발 교토·나라 당일 투어(2026): 어떤 일정을 예약할까(영어)" },
            { href: "/guides/attractions/arima-onsen-day-trip", title: "아리마 온천 당일치기(2026): 오사카·고베 출발과 온천 요금(영어)" },
            { href: "/guides/transport/kyoto-transportation", title: "교토 교통 가이드(2026): 버스, 열차, 택시(영어)" },
            { href: "/guides/attractions/kansai-area-pass", title: "간사이 에어리어 패스(2026): 가격, 이용 범위, 살 만할까(영어)" },
            { href: "/guides/attractions/nara-day-trip", title: "나라 당일치기(2026): 오사카·교토 출발과 도다이지 요금(영어)" },
            { href: "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary", title: "도쿄·교토·오사카 7일 일정(2026): 날짜별 코스(영어)" },
            { href: "/ko", title: "일본 여행 준비 가이드 더 보기 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>열차로 올라가고, 배로 내려오기</h2>
            <p className={styles.ctaBannerDesc}>
              토롯코 열차 편도와 반대 방향의 호즈강 뱃놀이를 이으면 출발한 곳에서 하루를 마칠 수 있습니다. 지정석은
              1개월 전에 판매가 열리고 겨울에는 운휴하므로, 하루 일정을 짜기 전에 여행 날짜부터 확인하세요.
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
