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
import GygCompare, { GygCompareButton } from "../../../../components/GygCompare";
import { fujiDayTour, tokyoDisneyTripPrep, tokyoSightseeingBusTour } from "../../../../lib/klook-links";
import { koTokyoDisney } from "../../../../lib/klook-links-ko";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { gygTokyoDisneyResort, gygTokyoDisneySea } from "../../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import HotelStayBlock from "../../../../components/HotelStayBlock";

const ROUTE = "/ko/guides/attractions/tokyo-disney-tickets";
// 21 Nov 2026 (R06): title for the Korean queries on both parks (티켓·입장권·가격·예약), structure
// aligned with the English page's 18 Nov 2026 R04 rewrite. Prices re-read on 21 Nov 2026 on the
// resort's own ticket page and price calendar (/en/ticket/index.html, /en/ticket/index/202612/,
// /202701/, /202702/, "As of 10:50 a.m., November 21, 2026"): published minimums unchanged; adult
// 1-Day Passport 8,900 (6–8 Jan 2027) to 12,400 for 21 Nov 2026 – 28 Feb 2027, Disneyland and
// DisneySea identical. Change rules re-read the same day on /en/ticket/change/howto.html.
const TITLE = "도쿄 디즈니랜드·디즈니씨 티켓 2026: 가격·예약 방법";
const DESC =
  "도쿄 디즈니랜드·디즈니씨 입장권 성인 ¥8,900~12,400. 현장 판매 없이 2개월 전 14시 예약 시작. 공식 앱·클룩 예약 방법 비교.";
// 11 Nov 2026 (R08): mirrors the English page's where-to-buy, validity, Premier Access and Happy Entry
// additions — same official FAQ sources and check dates; no figure added beyond the English page.
const LAST_CHECKED_PRICES = "2026-11-21";
const LAST_CHECKED_RULES = "2026-11-11";
const LAST_CHECKED_CHANGES = "2026-11-21";
const PRICE_MIN = "¥8,900";
const PRICE_MAX = "¥12,400";
const CALENDAR_SPAN = "2026년 11월 21일~2027년 2월 28일";

// Mirrors the English page (/guides/attractions/tokyo-disney-tickets) block by block as of
// 2026-11-01: same sections, tables, Klook and GetYourGuide CTAs. Every rule and figure is
// the English page's (Tokyo Disney Resort's own, read 28 Oct 2026); no figure is added.
const CHECKED = dateLabel("2026-10-28", "ko");
const PRICE_CHECKED = dateLabel(LAST_CHECKED_PRICES, "ko");
const GYG_SLUG = "ko-tokyo-disney-tickets";

/**
 * Ticket type × age band. First row is the answer. Adult 1-Day Passport is the range on the
 * official calendar; every other figure is the resort's published minimum ("부터").
 */
const priceRows = [
  { ticket: "1데이 패스포트(개장 시간부터 종일) — 가장 일반적인 티켓", adult: `${PRICE_MIN}~${PRICE_MAX}`, junior: "¥7,400부터", child: "¥5,300부터" },
  { ticket: "애프터 3 패스포트(주말·공휴일 15:00부터)", adult: "¥7,900부터", junior: "¥6,600부터", child: "¥4,400부터" },
  { ticket: "애프터 5 패스포트(평일 17:00부터)", adult: "¥5,400부터", junior: "¥4,600부터", child: "¥3,600부터" },
  { ticket: "1데이 패스포트(장애가 있는 분)", adult: "¥7,100부터", junior: "¥5,900부터", child: "¥4,200부터" },
  { ticket: "캠퍼스 데이 패스포트(기간 한정, 학생)", adult: "¥7,900부터", junior: "¥6,600부터", child: "—" },
  { ticket: "2일권·멀티데이 패스포트", adult: "판매하지 않음", junior: "판매하지 않음", child: "판매하지 않음" },
  { ticket: "3세 이하", adult: "—", junior: "—", child: "무료" },
];

/** Date changes — first row is the answer. /en/ticket/change/howto.html, read 21 Nov 2026. */
const changeRows = [
  {
    q: "날짜를 바꿀 수 있나요?",
    a: "공식 웹사이트·앱에서 산 티켓이라면 가능합니다. 유효 기간 안에서 온라인으로, 수수료 없이, 원래 날짜가 지난 뒤에도 바꿀 수 있습니다. 환불은 되지 않습니다.",
  },
  {
    q: "바꿀 수 있는 것",
    a: "입장 날짜와 연령 구분(예: 어린이 → 청소년)입니다. 둘 다 바꾸려면 하나씩 변경합니다.",
  },
  {
    q: "바꿀 수 없는 것",
    a: "파크(디즈니랜드 ↔ 디즈니씨), 티켓 종류, 유효 기간입니다. 매진된 날짜로도 바꿀 수 없습니다.",
  },
  {
    q: "가격 차이는 어떻게 되나요?",
    a: "변경할 티켓 금액을 전액 결제하면 기존 티켓 금액은 전액 환불되므로, 더 싼 날짜든 비싼 날짜든 자동으로 정산됩니다.",
  },
  {
    q: "클룩 등 다른 곳에서 산 티켓은?",
    a: "리조트의 온라인 변경은 공식 웹사이트에서 산 티켓만 대상입니다. 다른 판매처에서 산 티켓은 그 판매처를 통해 변경합니다.",
  },
  {
    q: "취소·환불",
    a: "고객 사정에 의한 취소·환불은 받지 않습니다.",
  },
];

/** Which passports exist, and when each one lets you through the gate. */
const ticketRows = [
  {
    ticket: "1데이 패스포트",
    entry: "개장 시간부터",
    dates: "모든 날짜",
    note: "한 파크를 하루 동안 이용하며, 날짜와 파크는 구매할 때 정해집니다. 가장 일반적인 티켓입니다.",
  },
  {
    ticket: "애프터 3 패스포트(휴일 한정)",
    entry: "15:00부터",
    dates: "휴일",
    note: "판매되는 날짜에 한해, 저녁 시간에 한 파크를 더 저렴하게 들어가는 방법입니다.",
  },
  {
    ticket: "애프터 5 패스포트(평일 한정)",
    entry: "17:00부터",
    dates: "평일",
    note: "이용 시간이 가장 짧고 요금도 가장 저렴한 티켓입니다. 평일 저녁 방문용입니다.",
  },
  {
    ticket: "1데이 파크 호퍼 패스포트(기간 한정)",
    entry: "—",
    dates: "현재 판매하지 않음",
    note: "리조트 FAQ에 현재 판매하지 않는다고 명시되어 있습니다. 한 여행에서 두 파크를 모두 가려면 파크마다 티켓을 한 장씩 사야 합니다.",
  },
  {
    ticket: "멀티데이 패스포트",
    entry: "—",
    dates: "판매하지 않음",
    note: "티켓 종류에 관한 FAQ에 따르면 2일 이상 연속으로 이용하는 패스포트는 판매하지 않습니다.",
  },
];

/** Operating hours — set per date, not a standing figure. */
const hoursRows = [
  {
    what: "개장·폐장 시간",
    detail:
      "날짜마다 정해집니다. 리조트는 고정된 운영 시간이 아니라 자체 운영 캘린더에 날짜별로 공개하며, 티켓 구매 화면에서도 선택한 날짜의 운영 시간이 표시됩니다.",
  },
  {
    what: "운영 시간은 언제 공개되나",
    detail: "약 5개월 전입니다. FAQ에 따르면 운영 시간은 대략 5개월 전에 공식 웹사이트에서 안내됩니다.",
  },
  {
    what: "티켓에 어떤 의미인가",
    detail:
      "방문 날짜의 티켓은 약 2개월 전에 판매가 시작되는데, 그 시점이면 운영 시간은 이미 몇 달 전에 공개되어 있습니다. 그러니 사고 나서가 아니라 사기 전에 캘린더를 확인하세요. 20:00에 폐장하는 날 애프터 5 패스포트를 이용하면 체류 시간은 3시간입니다.",
  },
  {
    what: "조기 입장(해피 엔트리)",
    detail:
      "디즈니 호텔 투숙객 전용입니다. 도쿄 디즈니랜드는 일반 고객보다 15분 먼저 입장이 시작되고, 도쿄 디즈니씨는 판타지 스프링스 호텔과 미라코스타 투숙객에 한해 5~15분 먼저입니다. 체크아웃일을 포함한 숙박 기간 매일 이용할 수 있지만 체크인 당일은 제외되며, 1인당 파크 티켓과 전용 입장권(Special Entrance Pass)이 필요합니다.",
  },
];

/** Where to buy — first row is the recommendation. Validity from the resort's FAQ. */
const sellerRows = [
  {
    where: "추천: 공식 웹사이트·앱(tokyodisneyresort.jp)",
    best: "공식 사이트에서 카드 결제가 가능한 분",
    change: "유효 기간 안에서 온라인으로 무료 변경(날짜·연령 구분만, 파크·티켓 종류는 불가)",
    validity: "구매일로부터 1년 후 같은 날짜",
    note: "한국어 페이지가 있습니다. 일부 해외 발급 카드는 결제가 거절됩니다. 고객 사정에 의한 환불은 없습니다.",
  },
  {
    where: "공식 승인 해외 온라인 여행사(예: 클룩)",
    best: "공식 사이트에서 해외 카드가 거절되는 분",
    change: "리조트의 온라인 변경 대상이 아님 — 유효 기간 안에 판매처에 문의",
    validity: "입장일로부터 1개월 뒤 같은 날",
    note: "해외 카드 결제, 한국어 결제 화면, 공식 앱에 등록할 수 있는 QR. 취소 조건은 판매처가 정하므로 결제 전에 상품 약관을 확인하세요.",
  },
  {
    where: "일본 국내 여행사·편의점",
    best: "일본 거주자, 이미 일본에 있는 여행자",
    change: "유효 기간 안에 발권처에 문의",
    validity: "입장일로부터 1개월 뒤 같은 날",
    note: "예약 교환권으로 판매됩니다.",
  },
  {
    where: "파크 게이트",
    best: "해당 없음 — 판매하지 않음",
    change: "—",
    validity: "—",
    note: "도쿄 디즈니랜드와 도쿄 디즈니씨에서는 파크 티켓을 판매하지 않습니다. 디즈니 호텔 투숙객만 호텔에서 당일 티켓을 살 수 있습니다.",
  },
];

/** In-park app services — first row is the recommendation. */
const accessRows = [
  {
    service: "추천: 무료 스탠바이 패스와 엔트리 리퀘스트",
    cost: "무료",
    what: "스탠바이 패스는 필요한 시설의 이용 시간을 받는 서비스이고, 엔트리 리퀘스트는 지정된 퍼레이드·쇼·캐릭터 그리팅에 시설별로 하루 한 번 신청할 수 있습니다. 돈을 쓰기 전에 두 가지를 먼저 이용하세요.",
  },
  {
    service: "디즈니 프리미어 액세스",
    cost: "유료, 1회당 요금, 파크 티켓과 별도",
    what: "대상 어트랙션의 이용 시간(대기 단축)이나 대상 퍼레이드·쇼를 관람할 구역을 예약합니다. 입장 후 공식 앱에서 구매하며, 수량이 한정되어 매진될 수 있습니다.",
  },
  {
    service: "일반 대기 줄",
    cost: "티켓에 포함",
    what: "모든 어트랙션은 줄을 서서 이용할 수 있습니다.",
  },
  {
    service: "40주년 프라이어리티 패스",
    cost: "—",
    what: "무료 패스는 2026년 8월 31일에 종료되었습니다.",
  },
];

/** The buying window, the sell-outs and what you can and cannot undo. */
const buyingRows = [
  {
    q: "방문 날짜의 티켓은 언제 판매가 시작되나요?",
    a: "2개월 뒤 같은 날짜의 티켓이 매일 일본 시간 14:00부터 판매됩니다. 즉 3월 1일 방문분은 1월 1일 14:00에 판매가 시작됩니다. 해당 월에 같은 날짜가 없으면 다음 달 1일 14:00에 판매가 시작됩니다.",
  },
  {
    q: "한 번에 몇 장까지 살 수 있나요?",
    a: "한 번의 주문에 최대 10장까지이며, 그날의 판매 수량에 도달하면 해당 날짜의 판매가 예고 없이 중단될 수 있습니다.",
  },
  {
    q: "현장(게이트) 판매가 있나요?",
    a: "없습니다. FAQ에 도쿄 디즈니랜드와 도쿄 디즈니씨에서는 파크 티켓을 판매하지 않는다고 분명히 적혀 있습니다. 당일 구매는 재고가 남아 있는 동안 공식 웹사이트나 앱에서만 가능하고, 티켓이 매진되면 입장할 수 없습니다.",
  },
  {
    q: "예외는 없나요?",
    a: "디즈니 호텔 투숙객은 호텔에서 당일 티켓을 살 수 있습니다. 그 외에는 웹사이트와 앱이 당일 구매의 유일한 경로이며, 미리 사는 티켓은 일부 여행사와 편의점에서도 판매합니다.",
  },
  {
    q: "방문 날짜가 매진됐어요. 이걸로 끝인가요?",
    a: "꼭 그렇지는 않습니다. FAQ에 따르면 매진된 티켓 종류가 예고 없이 재판매될 수 있고, 다른 고객이 티켓 날짜를 변경하면 그만큼의 수량이 다시 판매되어 다시 온라인으로 판매됩니다. 다시 확인해 보는 것이 생각보다 효과가 있습니다.",
  },
];

const parkRows = [
  {
    park: "도쿄 디즈니랜드",
    style: "디즈니의 상징인 성을 중심으로 한 파크: 퍼레이드, 불꽃놀이, 가족이 함께 즐기는 어트랙션",
    suits: "첫 방문자, 어린 아이를 동반한 가족, 클래식 디즈니 팬",
    note: "다른 디즈니 파크를 방문한 적이 있다면 익숙하게 느껴질 구성입니다",
  },
  {
    park: "도쿄 디즈니씨",
    style: "항해·바다를 테마로 한 파크. 도쿄만의 개성이 강하고 성인 방문객도 즐기기 좋은 분위기이며 주류를 판매합니다",
    suits: "성인, 커플, 색다른 것을 원하는 재방문자",
    note: "25주년 기념 기간(2026년 4월~2027년 3월)",
  },
];

const whoFor = [
  {
    title: "도쿄 디즈니랜드를 고른다면",
    desc: "어린 아이와 함께 가거나, 어느 나라든 디즈니 파크가 처음인 경우입니다. 디즈니의 상징인 성을 중심으로 구성되어 있으며, 낮 퍼레이드가 있고 가족이 함께 즐길 수 있는 어트랙션이 많아 가족과 함께 편안하게 즐기기 좋습니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V11l4-3 5 4 5-4 4 3v10z" />
        <path d="M12 21v-5" />
        <path d="M7 11V6l2-2 2 2v2" />
      </svg>
    ),
  },
  {
    title: "도쿄 디즈니씨를 고른다면",
    desc: "다른 디즈니 리조트에서는 경험할 수 없는 것을 원하고, 성인이거나 어린 아이 없이 여행하는 경우입니다. 디즈니씨는 성인 방문객도 즐기기 좋은 분위기이며 테마별로 꾸며진 항구는 도쿄 디즈니씨에서만 볼 수 있으며, 디즈니랜드와 달리 주류를 판매합니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M5 12V7a7 7 0 0 1 14 0v5" />
        <path d="M4 16c2 1.5 4-1.5 8 0s6-1.5 8 0" />
      </svg>
    ),
  },
  {
    title: "2026년에 간다면 25주년을 확인하세요",
    desc: "도쿄 디즈니씨는 2026년 4월부터 2027년 3월까지 25주년을 기념합니다. 기념 시즌에는 인기 날짜에 사람이 더 몰리고, 변동 가격제라 그런 날짜는 가격도 비쌉니다. 그러니 2개월 전 방문 날짜의 판매가 시작되는 순간 예약하세요.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 5.4 5.6.5-4.2 3.8 1.3 5.7L12 14.8 6.9 17.4l1.3-5.7L4 7.9l5.6-.5z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "무엇보다 먼저 날짜와 파크를 정합니다",
    desc: "도쿄 디즈니의 모든 티켓은 날짜와 파크가 지정되며, 하루에 두 파크를 모두 갈 수 있던 1데이 파크 호퍼 패스포트는 현재 판매하지 않습니다. 두 파크를 가려면 이틀에 걸쳐 티켓 두 장이 필요합니다.",
  },
  {
    title: "그 날짜의 운영 시간을 운영 캘린더에서 확인합니다",
    desc: "운영 시간은 날짜마다 정해지고 약 5개월 전에 공개됩니다. 애프터 5 패스포트가 저녁 한나절이 될지 아주 짧은 시간이 될지, 불꽃놀이가 방문 시간 안에 들어오는지가 여기서 결정됩니다.",
  },
  {
    title: "방문일 2개월 전 일본 시간 14:00에 맞춰 예매를 준비하세요",
    desc: "해당 방문일의 티켓 판매가 시작되는 시간입니다. 한국은 일본과 시차가 없으니 한국 시간으로도 오후 2시입니다. 그날의 판매 수량에는 상한이 있고 예고 없이 판매가 멈출 수 있으니 캘린더에 넣어 두세요.",
  },
  {
    title: "해외 카드가 문제라면 클룩을 이용합니다",
    desc: "도쿄 디즈니 리조트 공식 사이트는 해외 발급 신용카드로 결제할 때 승인이 거절되는 경우가 많습니다. 클룩은 공식 승인 판매처로 해외 카드를 받고 결제 화면이 한국어로 되어 있어, 많은 해외 방문객이 이용합니다.",
  },
  {
    title: "전자 티켓 QR을 공식 앱에 연동합니다",
    desc: "구매 후 전자 티켓 QR 코드를 받으며, 이를 도쿄 디즈니 리조트 공식 앱에 등록할 수 있습니다. 당일 파크 내 기능도 이 앱에서 관리하니 도착 전에 설정해 두세요.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도쿄 디즈니랜드 티켓 가격은 얼마인가요?",
    a: `성인 1데이 패스포트는 날짜에 따라 ${PRICE_MIN}~${PRICE_MAX}입니다. 도쿄 디즈니 리조트 공식 가격 캘린더(${CALENDAR_SPAN})의 최저가와 최고가이며, 도쿄 디즈니씨도 같은 날 같은 가격입니다. 청소년(12~17세)은 ¥7,400부터, 어린이(4~11세)는 ¥5,300부터, 3세 이하는 무료이고, 평일 저녁용 애프터 5 패스포트는 성인 ¥5,400부터입니다. 최종 확인: ${LAST_CHECKED_PRICES}.`,
  },
  {
    q: "디즈니씨 티켓은 어디서 예약하나요?",
    a: `도쿄 디즈니씨와 도쿄 디즈니랜드 티켓은 같은 곳에서 예약합니다. 공식 결제에서 카드가 승인된다면 도쿄 디즈니 리조트 공식 웹사이트나 앱이 가장 좋습니다. 구매일로부터 1년 후 같은 날짜까지 유효하고, 온라인에서 수수료 없이 날짜를 바꿀 수 있습니다. 해외 카드가 거절되면 클룩 같은 공식 승인 판매처에서 같은 날짜 지정 1데이 패스포트를 살 수 있지만, 유효 기간은 입장일로부터 1개월 뒤 같은 날까지이고 날짜 변경은 판매처를 통해 합니다. 최종 확인: ${LAST_CHECKED_CHANGES}.`,
  },
  {
    q: "당일 티켓도 구매할 수 있나요?",
    a: `재고가 남아 있다면 공식 웹사이트나 앱에서 당일 티켓을 살 수 있습니다. 다만 도쿄 디즈니랜드와 도쿄 디즈니씨의 게이트에서는 파크 티켓을 판매하지 않고, 그날이 매진이면 입장할 수 없습니다. 예외는 디즈니 호텔 투숙객으로, 호텔에서 당일 티켓을 살 수 있습니다. 매진된 티켓은 예고 없이 다시 판매될 수 있으니 다시 확인해 볼 만합니다. 최종 확인: ${LAST_CHECKED_RULES}.`,
  },
  {
    q: "디즈니랜드와 디즈니씨 중 어디가 좋을까요?",
    a: "티켓 한 장으로 한 파크만 들어갈 수 있고 하루에 두 파크를 오가는 파크 호퍼는 현재 판매하지 않으므로, 하루라면 한 곳을 골라야 합니다. 아이와 함께이거나 디즈니 파크가 처음이라면 성과 퍼레이드, 가족이 함께 즐기는 어트랙션이 중심인 도쿄 디즈니랜드가 맞습니다. 성인끼리이거나 도쿄에만 있는 파크를 원한다면 항해를 테마로 하고 주류도 판매하는 도쿄 디즈니씨가 맞으며, 디즈니씨는 2026년 4월부터 2027년 3월까지 25주년을 기념합니다.",
  },
  {
    q: "티켓 날짜 변경이 가능한가요?",
    a: `공식 웹사이트나 앱에서 산 티켓은 가능합니다. 유효 기간 안이라면 원래 날짜가 지난 뒤에도 온라인에서 수수료 없이 입장 날짜와 연령 구분을 바꿀 수 있습니다. 파크와 티켓 종류는 바꿀 수 없고, 매진된 날짜로도 옮길 수 없으며, 새 티켓 금액을 전액 결제하고 원래 티켓 금액은 전액 환불되는 방식으로 정산됩니다. 고객 사정에 의한 취소·환불은 없고, 클룩 등 다른 판매처에서 산 티켓은 그 판매처를 통해 변경합니다. 최종 확인: ${LAST_CHECKED_CHANGES}.`,
  },
];

/** The English page's tokyoDisneyTripPrep, in Korean, on Klook's ko path. */
const KO_TRIP_PREP_COPY = [
  {
    label: "마이하마 주변 호텔",
    ctaLabel: "클룩에서 마이하마 호텔 보기 →",
    why: "두 파크가 함께 쓰는 역으로, 도쿄역에서 JR 게이요선으로 약 15~20분 걸립니다. 디즈니 리조트 라인 모노레일의 출발점이기도 해서, 일찍 입장하거나 늦게 끝나는 퍼레이드를 보기에도 편리합니다.",
  },
  {
    label: "우라야스·신우라야스 호텔",
    ctaLabel: "클룩에서 우라야스 호텔 보기 →",
    why: "한 정거장 더 가야 하지만 리조트 인근 숙소보다 대체로 저렴하며, 이 지역 호텔 다수가 게이트까지 무료 셔틀을 운행합니다. 대신 모노레일 대신 셔틀 시간표에 맞춰야 합니다.",
  },
  {
    label: "하네다 공항 리무진 버스",
    ctaLabel: "하네다 버스 보기 →",
    why: "하네다 상품의 목적지에 도쿄 디즈니 리조트가 포함되어 있어, 도심의 역을 거치지 않고 리조트에서 내릴 수 있는 공항 교통편입니다. 짐을 들고 다시 갈아탈 필요가 없습니다.",
  },
  {
    label: "나리타 공항 리무진 버스",
    ctaLabel: "리무진 버스 보기 →",
    why: "나리타에서 들어온다면 같은 공항 리무진 운영사가 위탁 수하물과 함께 도쿄 도심의 호텔·역 정류장까지 운행합니다. 노선마다 목적지가 다르니 예약 전에 이용 날짜의 정류장 목록을 확인하세요.",
  },
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩에서 eSIM 옵션 보기 →",
    why: "패스포트는 도쿄 디즈니 리조트 공식 앱에 연동된 QR 코드이고, 당일 파크 내 기능도 앱에서 관리합니다. 호텔 와이파이에만 의존하면 파크 안에서 이런 기능을 쓸 수 없습니다.",
  },
];
const koTripPrep = tokyoDisneyTripPrep.map((item, i) => withKlookLocale(item, "ko", KO_TRIP_PREP_COPY[i]));

const koTours = [
  withKlookLocale(fujiDayTour, "ko", {
    title: "도쿄 출발 후지산 1일 투어",
    desc: "후지산 5합목, 가와구치코, 오시노핫카이를 버스로 하루에 돌고 당일 저녁 도쿄로 돌아오는 투어",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "ko", {
    title: "도쿄 시내 관광 버스 1일 투어",
    desc: "황궁 정원, 아사쿠사, 도쿄 스카이트리를 다국어 오디오 가이드와 함께 도는 가이드 투어",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "도쿄 디즈니랜드·디즈니씨 티켓" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoTokyoDisneyTicketsPage({ updated }: { updated: PageUpdated }) {
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

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel} 업데이트</p>
          <h1 className={styles.heroTitle}>{TITLE}</h1>
          <p className={styles.heroSubtitle}>
            날짜 지정 티켓, 변동 가격제, 현장 판매 없음, 환불 불가. 랜드·씨 입장권 가격, 예약 방법, 판매 시작 시점,
            날짜 변경 규정, 어느 파크를 고를지 정리했습니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 가격 캘린더 기준", "2개월 전 판매 시작", "해외 발급 카드는 클룩에서"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Lead paragraph */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            2026년 <strong>도쿄 디즈니랜드·디즈니씨 티켓</strong>(1데이 패스포트) 가격은 날짜에 따라 성인{" "}
            <strong>{PRICE_MIN}~{PRICE_MAX}</strong>, 청소년(12~17세) <strong>¥7,400</strong>부터, 어린이(4~11세){" "}
            <strong>¥5,300</strong>부터이며 3세 이하는 무료입니다(도쿄 디즈니 리조트 공식 가격 캘린더,{" "}
            {CALENDAR_SPAN} 입장분, {PRICE_CHECKED} 확인). 입장권은 방문일 <strong>2개월 전 같은 날짜 일본 시간 14:00</strong>
            (한국 시간도 오후 2시)에 공식 웹사이트·앱에서 예약이 시작되고, 두 파크 모두 게이트에서는 팔지 않습니다.
            디즈니랜드와 디즈니씨는 같은 날 같은 가격이며, 티켓 한 장으로 한 파크만 들어갈 수 있습니다.
          </p>
          <p className={styles.bodyText}>
            매진된 날짜에는 입장할 수 없고, 고객 사정에 의한 환불은 되지 않으며, 공식 사이트에서 산 티켓은 유효 기간
            안에서 수수료 없이 날짜를 바꿀 수 있습니다. 공식 사이트에서 해외 발급 카드로 결제할 수 없다면 클룩 같은 공식 승인 판매처를
            이용합니다. 도쿄의 다른 일정도 짜고 있다면{" "}
            <Link href="/ko/guides/attractions/teamlab-tokyo-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>
              도쿄 팀랩 티켓 비교
            </Link>
            와{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              도쿄 즐길 거리 가이드(영문)
            </Link>
            도 참고하세요.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1데이 패스포트</p>
                <p className={styles.verdictStatValue}>성인 {PRICE_MIN}~{PRICE_MAX}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>가격</p>
                <p className={styles.verdictStatValue}>방문일에 따라 변동</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>판매 시작</p>
                <p className={styles.verdictStatValue}>2개월 전 일본 시간 14:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>현장·게이트 판매</p>
                <p className={styles.verdictStatValue}>두 파크 모두 없음</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 파크와 날짜를 고르고, 그 날짜의 운영 시간을 운영 캘린더에서 확인한 뒤,
              2개월 전 판매가 시작되면 바로 사세요. 환불은 없지만 온라인 티켓의 날짜는 몇 번이든 바꿀 수
              있습니다. 공식 사이트가 해외 카드를 거부하면, 클룩은 해외 카드를 받고 공식 앱용 QR을 발급하는
              공식 승인 판매처입니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={koTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                도쿄 디즈니 티켓 확인하기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
            </div>
          </div>
        </div>

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="tokyo-disney" />

        <EsimCtaTop />

        {/* Q1 — price. 21 Nov 2026 (R06): ticket type × age table from the official calendar. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>도쿄 디즈니랜드 티켓 가격은 얼마인가요?</h2>
          <p className={styles.bodyText}>
            성인 1데이 패스포트는 날짜에 따라 {PRICE_MIN}~{PRICE_MAX}이고, 도쿄 디즈니씨도 같은 날 같은 가격입니다.
            {CALENDAR_SPAN} 입장분의 공식 가격 캘린더에서 가장 싼 날은 2027년 1월 6~8일({PRICE_MIN}), 가장 비싼 날은
            11~12월의 일부 주말과 12월 25~26일 등({PRICE_MAX})이며, 2027년 1~2월 평일은 대부분 ¥9,900입니다. 다른 티켓 종류와
            청소년·어린이 요금은 리조트가 공개한 최저 가격으로, 표에는 ‘부터’로 표시했습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓 종류(랜드·씨 공통)", "성인(18세 이상)", "청소년(12~17세)", "어린이(4~11세)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.junior}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {LAST_CHECKED_PRICES}</strong> · 출처: https://www.tokyodisneyresort.jp/en/ticket/index.html
            (티켓 종류별 최저가·가격 캘린더). 성인 1데이 패스포트의 범위는 공식 가격 캘린더({CALENDAR_SPAN} 입장분,
            디즈니랜드·디즈니씨)의 값이고, 가격은 예고 없이 바뀔 수 있습니다. 판매가 아직 시작되지 않은 날짜의 다른 티켓
            가격은 캘린더에서 같은 금액의 날짜를 누르면 표시됩니다. 도쿄의 다른 날짜 지정 티켓은 확인일과 함께{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              일본 관광지 티켓 가격표(영어)
            </Link>
            에 정리되어 있습니다.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={koTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 디즈니랜드·디즈니씨 티켓 보기 →
            </KlookLink>
          </div>
        </section>

        {/* Same-day bookings, right after the price table: Maihama/Urayasu hotels (6.5%),
            airport limousine bus (5%), Klook eSIM (20%). Moved up from below the steps (R06). */}
        <KlookTripPrep
          label="티켓과 함께 예약할 것"
          heading="도쿄 디즈니 리조트 근처에 숙박하는 게 좋을까요?"
          intro="주말이나 기념 기간의 날짜라면 그렇습니다. 리조트는 도쿄역에서 JR 게이요선으로 15~20분 거리라서, 개장 전과 야간 퍼레이드가 끝난 후에 각각 이동해야 합니다. 마이하마나 한 정거장 떨어진 곳에 묵으면 아침과 밤의 이동 시간을 줄일 수 있고, 공항 리무진 버스와 eSIM도 티켓 날짜가 정해지면 같이 준비해 두면 됩니다."
          items={koTripPrep}
        />
        <p className={styles.bodyText}>
          호텔 자체를 고르고 있다면{" "}
          <Link href="/guides/attractions/tokyo-disney-hotels" style={{ color: "var(--red)", fontWeight: 600 }}>
            도쿄 디즈니 호텔 가이드(영어)
          </Link>
          에서 디즈니 호텔, 오피셜 호텔, 파트너 호텔을 파크까지 가는 방법, 해피 엔트리, 예약 시작 시기(디즈니 호텔은 4개월 전)로 비교합니다.
        </p>

        {/* Q2 — which ticket */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>티켓 종류</span>
          <h2 className={styles.sectionTitle}>도쿄 디즈니 티켓은 어떤 것을 사야 하나요?</h2>
          <p className={styles.bodyText}>
            하루 종일 즐기려면 1데이 패스포트, 저녁에만 방문하려면 저녁 시간대 패스포트를 선택하면 됩니다. 두 파크를 모두 방문하려면 티켓 두
            장이 필요합니다. 하루에 두 파크를 이용할 수 있던 1데이 파크 호퍼 패스포트는 현재 판매하지 않고,
            멀티데이 패스포트는 아예 판매하지 않습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓", "입장 가능 시간", "판매 날짜", "어떤 티켓인가"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.entry}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.dates}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            티켓 종류, 입장 시간, 파크 호퍼의 현재 상태는 리조트 FAQ의 답변입니다({CHECKED} 확인). 내
            날짜에 어떤 패스포트가 판매되는지는 날짜별로 다릅니다. 기간 한정 티켓은 리조트 이벤트에 따라
            판매 여부가 달라지므로, 위 목록은 고정된 티켓 목록이 아니라 현재 판매되는 티켓 종류의 개요입니다.
          </p>
        </section>

        {/* Q3 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>운영 시간</span>
          <h2 className={styles.sectionTitle}>도쿄 디즈니의 운영 시간은 어떻게 되나요?</h2>
          <p className={styles.bodyText}>
            고정된 운영 시간은 없습니다. 리조트가 날짜마다 정해 약 5개월 전에 자체 운영 캘린더에 공개합니다.
            티켓 판매보다 이르다는 점이 유용한데, 방문 날짜의 판매가 시작될 무렵에는 해당 날짜의 파크 운영 시간을
            미리 확인할 수 있습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `리조트 공개 내용(${CHECKED} 확인)`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>최종 확인: {LAST_CHECKED_RULES}</strong> · 출처: https://faq-en.tokyodisneyresort.jp/(운영 시간),
            https://www.tokyodisneyresort.jp/en/hotel/topics/info/happy_entry.html(해피 엔트리). 해피 엔트리가 파크에서
            15분을 더 보장하지는 않습니다. 붐비는 날에는 호텔 전용 입구의 입장에 시간이 걸릴 수 있다고 리조트가 안내합니다.
          </p>
        </section>

        {/* Where to buy — 21 Nov 2026 (R06): 예약 방법 비교, columns aligned with the English R04 table. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>예약 방법</span>
          <h2 className={styles.sectionTitle}>디즈니씨·디즈니랜드 티켓은 어디서 예약하나요?</h2>
          <p className={styles.bodyText}>
            카드가 승인된다면 도쿄 디즈니 리조트 공식 웹사이트·앱이 가장 좋습니다. 구매일로부터 1년간 유효하고 온라인에서
            무료로 날짜를 바꿀 수 있습니다. 해외 카드가 거절되면 클룩 같은 공식 승인 판매처에서 같은 날짜 지정 티켓을 살 수
            있지만, 유효 기간은 입장일로부터 1개월 뒤까지이고 날짜 변경은 판매처를 통해 합니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["예약처", "이런 분께", "날짜 변경", "유효 기간", "참고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sellerRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.best}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.change}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.validity}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {LAST_CHECKED_CHANGES}</strong> · 출처:
            https://www.tokyodisneyresort.jp/en/ticket/change/howto.html(날짜 변경·환불),
            https://faq-en.tokyodisneyresort.jp/answer/680ba03d01fdf7431bafb1d5/(유효 기간, {LAST_CHECKED_RULES}) 및 파크 티켓에 관한
            리조트 FAQ(현장 판매 없음, 당일 구매, 디즈니 호텔 예외).
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={koTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              공식 사이트에서 카드가 거절됐다면? 클룩에서 확인 →
            </KlookLink>
          </div>
        </section>

        {/* Date changes — 21 Nov 2026 (R06), from /en/ticket/change/howto.html. First row is the answer. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>날짜 변경</span>
          <h2 className={styles.sectionTitle}>티켓 날짜 변경이 가능한가요?</h2>
          <p className={styles.bodyText}>
            공식 웹사이트·앱에서 산 티켓이라면 가능합니다. 유효 기간 안에서 수수료 없이 입장 날짜를 바꿀 수 있지만, 파크와
            티켓 종류는 바꿀 수 없고 고객 사정에 의한 환불도 없습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["질문", "리조트 규정"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {changeRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {LAST_CHECKED_CHANGES}</strong> · 출처: https://www.tokyodisneyresort.jp/en/ticket/change/howto.html.
            변경은 공식 앱의 도움말 → 예약·구매 내역, 또는 공식 웹사이트의 예약·구매 페이지에서 합니다.
          </p>
        </section>

        {/* Q4 — the booking window, sell-outs and refunds, then the CTA stack. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>판매 일정</span>
          <h2 className={styles.sectionTitle}>당일 티켓도 구매할 수 있나요?</h2>
          <p className={styles.bodyText}>
            재고가 남아 있을 때 공식 웹사이트·앱에서만 가능합니다. 도쿄 디즈니랜드와 도쿄 디즈니씨의 게이트에서는
            파크 티켓을 전혀 판매하지 않으므로, 사실상 미리 예약해야 합니다. 방문 날짜의 티켓은 <strong>2개월 전, 매일 일본 시간 14:00</strong>에
            판매가 시작되며, 한국과 일본은 시차가 없으니 한국 시간으로도 오후 2시입니다. 하루 판매 수량에는
            상한이 있어 다 팔리면 예고 없이 판매가 멈출 수 있습니다. 주말, 일본 공휴일, 디즈니씨 25주년
            기간의 날짜라면 판매가 시작되는 순간 바로 예약해야 합니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["질문", `리조트 공개 내용(${CHECKED} 확인)`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            판매 수량은 날짜별일 뿐 아니라 판매처별로도 나뉘므로, 한 경로에서 매진된 날짜도 다른 경로에서
            확인해 볼 가치가 있습니다. 공식 결제 화면이 해외 카드를 거부할 때의 해결책도 승인 판매처입니다.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={koTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 도쿄 디즈니 티켓 확인하기 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
          </div>
        </section>

        {/* Q5 — which park */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>디즈니랜드 vs 디즈니씨</span>
          <h2 className={styles.sectionTitle}>디즈니랜드와 디즈니씨 중 어디가 좋을까요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            티켓 한 장에 파크 하나입니다. 파크 호퍼가 판매되지 않으므로 방문 순서가 아니라 어느 파크에 갈지를 정해야 합니다.
            디즈니의 상징인 성이 있는 파크와 어린 아이라면 디즈니랜드, 다른 곳에서는 경험할 수 없는 파크와 25주년 기념 시즌을 즐기고 싶다면
            디즈니씨를 추천합니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["파크", "전체적인 성격", "잘 맞는 사람", "비고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parkRows.map((row) => (
                    <tr key={row.park}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.park}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.style}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.suits}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            결정을 돕기 위한 개괄이며, 두 파크 모두 넓어서 각각 하루 일정입니다. 파크에 가는 날은 도시 여행에서
            하루를 통째로 쓰기 때문에 일정 초반에 넣는 경우가 많습니다. 저희{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={{ color: "var(--text)", fontWeight: 600 }}>
              도쿄 5일 일정(영어)
            </Link>
            에서는 4일째에 들어가 있습니다.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>어디가 맞는가</span>
          <h2 className={styles.sectionTitle}>어느 파크가 나에게 맞을까?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            어느 파크를 고르든 이동 경로를 미리 계획하세요. 리조트는 도쿄 도심에서 전철을 타고 가야 합니다.
            그곳까지 이용할 전철, 지하철, 교통카드는{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              도쿄 교통 가이드(영어)
            </Link>
            에서 다룹니다.
          </p>
        </section>

        {/* Premier Access — added 11 Nov 2026 (R08). First row is the recommendation. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>대기 시간 줄이기</span>
          <h2 className={styles.sectionTitle}>디즈니 프리미어 액세스가 필요할까요?</h2>
          <p className={styles.bodyText}>
            필요하지 않습니다. 디즈니 프리미어 액세스는 파크에 입장한 뒤 공식 앱에서 사는 유료 서비스이고, 모든
            어트랙션은 줄을 서서 이용할 수 있습니다. 무료 40주년 프라이어리티 패스는 2026년 8월 31일에 종료되었고,
            무료 스탠바이 패스와 엔트리 리퀘스트는 그대로 있습니다. 오사카의 유니버설 스튜디오 재팬은 방식이 달라,
            유료 대기 단축권을 방문 전에 날짜 지정으로 사야 하며 하루 수량이 한정되어 있습니다. 종류와 구매 시기는{" "}
            <Link href="/ko/guides/attractions/usj-tickets-express-pass">유니버셜 스튜디오 재팬 익스프레스 패스 가이드</Link>
            를 보세요.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["서비스", "비용", "내용"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.service}>
                      <td className={styles.tdProvider}>{row.service}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>최종 확인: {LAST_CHECKED_RULES}</strong> · 출처:
            https://faq-en.tokyodisneyresort.jp/answer/680ba05101fdf7431bafb6b0/,
            https://faq-en.tokyodisneyresort.jp/answer/680ba05101fdf7431bafb6b8/. 프리미어 액세스 가격은 어트랙션·쇼마다
            정해져 앱에 표시됩니다.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>구매 절차</span>
          <h2 className={styles.sectionTitle}>도쿄 디즈니 티켓은 어떻게 사나요?</h2>
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

        {/* Foreign card / Klook explainer */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>해외 카드</span>
          <h2 className={styles.sectionTitle}>해외 카드로 도쿄 디즈니 티켓을 살 수 있나요?</h2>
          <p className={styles.bodyText}>
            공식 사이트에서는 안 되는 경우가 많습니다. 도쿄 디즈니 리조트 공식 웹사이트가 기본 구매처이지만,
            해외 발급 신용카드로 결제할 때 승인이 거절되는 경우가 많습니다. 해외 여행객들이 자주 겪는 문제이며,
            사려는 티켓이 2개월 전 한순간에만 판매가 시작된다면 더욱 곤란합니다.
          </p>
          <p className={styles.bodyText}>
            <strong>클룩은 도쿄 디즈니 리조트의 공식 승인 티켓 판매처입니다.</strong> 해외 카드를 받고, 결제
            화면이 한국어이며, 도쿄 디즈니 리조트 공식 앱에 등록할 수 있는 전자 티켓 QR 코드를 발급합니다. 해외
            발급 카드로 결제할 수 있고 공식 앱에 QR 코드를 등록할 수 있어 해외 방문객의 표준적인 해결책이 되었습니다. 도쿄의
            다른 일정과 함께 계획하고 있다면, 저희{" "}
            <Link href="/ko/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              시부야 스카이 예약
            </Link>
            {" "}가이드에서 판매처를 통하는 편이 더 쉬운 또 하나의 날짜 지정 예약을 다룹니다.
          </p>
        </section>

        <EsimCtaBottom />

        {/* FAQ */}
        <FaqList items={faqItems} />

        {/* Klook tours in the same city. */}
        <KlookTourPicks
          heading="도쿄에서 출발하는 당일 투어"
          intro="파크를 방문하면 하루 일정이 필요하므로, 대부분은 도쿄 여행 일정 중 하루를 디즈니에 할애합니다. 아래 두 투어는 파크에 가지 않는 하루를 채워 주고, 티켓과 같은 클룩 계정에서 결제할 수 있습니다."
          tours={koTours}
        />

        {/* A second authorized-reseller route. */}
        <GygCompare
          slug={GYG_SLUG}
          heading="GetYourGuide에서 판매하는 동일한 패스포트"
          intro="도쿄 디즈니에는 현장 판매가 없고 매진된 날짜에는 입장할 수 없으므로, 한 판매처에서 매진된 날짜로는 사실상 방문할 수 없습니다. 겟유어가이드도 디즈니랜드와 디즈니씨 모두의 1데이 패스포트를 판매하니, 날짜를 확정하기 전에 다른 판매처도 함께 확인해 볼 만합니다."
          listings={[gygTokyoDisneyResort, gygTokyoDisneySea]}
        />

        {/* Related articles */}
        <Related
          items={[
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "도쿄 5일 여행 일정(2026): 하루씩 정리한 5일(영어)" },
            { href: "/guides/attractions/legoland-japan-tickets", title: "레고랜드 재팬 티켓(2026): 가격, 운영 시간, 가 볼 만한가(영어)" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "지브리 파크 티켓(2026): 가격, 판매 시작 시점, 해외에서 사는 방법(영어)" },
            { href: "/guides/transport/tokyo-airport-limousine-bus", title: "도쿄 공항 리무진 버스(2026): 나리타·하네다 요금, 시간, 정류장(영어)" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "산리오 퓨로랜드 티켓(2026): 가격, 변동 가격제, 예약 방법(영어)" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "후지큐 하이랜드 티켓(2026): 프리패스 가격, Q 팩, 가는 방법(영어)" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "워너 브라더스 스튜디오 투어 도쿄 티켓(2026): 가격과 예약 방법(영어)" },
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약 2026: 티켓 가격·오픈 시간·선셋 팁" },
            { href: "/ko/guides/attractions/teamlab-planets-tickets", title: "팀랩 플래닛 예약 2026: 티켓 가격, 운영 시간, 가는 법" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 전철, 지하철, 교통카드 정리(영어)" },
            { href: "/guides/attractions", title: "일본에서 할 것 더 보기(영어) →" },
            { href: "/ko/guides/attractions/usj-tickets-express-pass", title: "유니버설 스튜디오 재팬 익스프레스 패스(2026): 티켓은 어떤 것을 살까" },
            { href: "/ko/guides/attractions/dotonbori-river-cruise", title: "톤보리 리버크루즈 가격 ¥2,000・20분: 도톤보리 리버크루즈 가이드" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "도쿄에서 스모 보기(2026): 본대회 티켓 vs 아침 연습(영어)" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>도쿄 디즈니 입장권을 미리 예매하세요</h2>
            <p className={styles.ctaBannerDesc}>
              현장 판매가 없고, 매진된 날짜에는 입장할 수 없으며, 방문 날짜의 티켓은 2개월 전 일본 시간 14:00에 판매가
              시작됩니다. 클룩은 해외 카드를 받고 공식 앱에 등록할 수 있는 QR을 발급하는 공식 승인 판매처입니다.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={koTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                도쿄 디즈니 티켓 보기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
