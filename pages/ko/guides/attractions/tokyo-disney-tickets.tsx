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
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/ko/guides/attractions/tokyo-disney-tickets";
const TITLE = "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 선택";
const DESC =
  "도쿄 디즈니랜드 티켓 2026: 모든 티켓이 날짜 지정, 현장 판매 0건. 해외 카드 대안과 랜드·씨 선택 기준을 정리했습니다.";

// Mirrors the English page (/guides/attractions/tokyo-disney-tickets) block by block as of
// 2026-11-01: same sections, tables, Klook and GetYourGuide CTAs. Every rule and figure is
// the English page's (Tokyo Disney Resort's own, read 28 Oct 2026); no figure is added.
const CHECKED = dateLabel("2026-10-28", "ko");
const GYG_SLUG = "ko-tokyo-disney-tickets";

/** The published minimums, by the resort's own age bands. */
const priceRows = [
  { band: "성인(大人)", who: "18세 이상", price: priceLabel("From ¥8,900", "ko") },
  { band: "청소년(中人)", who: "12~17세 — 중학생·고등학생 연령", price: priceLabel("From ¥7,400", "ko") },
  { band: "어린이(小人)", who: "4~11세 — 미취학 아동·초등학생 연령", price: priceLabel("From ¥5,300", "ko") },
  { band: "유아", who: "3세 이하", price: priceLabel("Free", "ko") },
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
    note: "가장 짧고 가장 저렴한 입장. 평일 저녁 방문용입니다.",
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
      "내 날짜의 티켓은 약 2개월 전에 판매가 시작되는데, 그 시점이면 운영 시간은 이미 몇 달 전에 공개되어 있습니다. 그러니 사고 나서가 아니라 사기 전에 캘린더를 확인하세요. 20:00에 폐장하는 날의 애프터 5 패스포트는 3시간짜리 방문입니다.",
  },
];

/** The buying window, the sell-outs and what you can and cannot undo. */
const buyingRows = [
  {
    q: "내 날짜는 언제 판매가 시작되나요?",
    a: "2개월 뒤 같은 날짜의 티켓이 매일 일본 시간 14:00부터 판매됩니다. 즉 3월 1일 방문분은 1월 1일 14:00에 열립니다. 해당 월에 같은 날짜가 없으면 다음 달 1일 14:00에 판매가 시작됩니다.",
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
    q: "취소하고 환불받을 수 있나요?",
    a: "안 됩니다. 고객 사정에 의한 취소·환불은 불가하며, 악천후나 지진 등 지정일에 방문하지 못하는 경우를 다룬 FAQ도 같은 규칙을 안내합니다.",
  },
  {
    q: "대신 날짜를 바꿀 수는 있나요?",
    a: "가능합니다. 이것이 유일하게 존재하는 유연성입니다. 온라인 티켓은 유효 기간 안에서 지정 입장일 전이든 후든 날짜를 변경할 수 있고, 변경 횟수에도 제한이 없습니다. 변경할 때마다 새 날짜의 가격으로 정산됩니다. 변경은 파크가 아니라 웹사이트나 앱에서 합니다.",
  },
  {
    q: "내 날짜가 매진됐어요. 이걸로 끝인가요?",
    a: "꼭 그렇지는 않습니다. FAQ에 따르면 매진된 티켓 종류가 예고 없이 재판매될 수 있고, 다른 고객이 티켓을 다른 날짜로 옮기면 비게 된 자리가 판매분으로 돌아가 다시 온라인으로 판매됩니다. 다시 확인해 보는 것이 생각보다 효과가 있습니다.",
  },
];

const parkRows = [
  {
    park: "도쿄 디즈니랜드",
    style: "디즈니의 상징인 성을 중심으로 한 파크: 퍼레이드, 불꽃놀이, 가족이 함께 즐기는 어트랙션",
    suits: "첫 방문자, 어린 아이를 동반한 가족, 클래식 디즈니 팬",
    note: "다른 디즈니 파크에 가 봤다면 익숙한 배치입니다",
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
    desc: "다른 디즈니 리조트에서는 경험할 수 없는 것을 원하고, 성인이거나 어린 아이 없이 여행하는 경우입니다. 디즈니씨는 성인 방문객도 즐기기 좋은 분위기이며 테마별 항구는 도쿄에만 있으며, 디즈니랜드와 달리 주류를 판매합니다.",
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
    desc: "도쿄 디즈니씨는 2026년 4월부터 2027년 3월까지 25주년을 기념합니다. 기념 시즌에는 인기 날짜에 사람이 더 몰리고, 변동 가격제라 그런 날짜는 가격도 비쌉니다. 그러니 2개월 전 내 날짜가 열리는 순간 예약하세요.",
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
    desc: "그때가 내 날짜의 판매 시작 시점입니다. 한국은 일본과 시차가 없으니 한국 시간으로도 오후 2시입니다. 그날의 판매 수량에는 상한이 있고 예고 없이 판매가 멈출 수 있으니 캘린더에 넣어 두세요.",
  },
  {
    title: "해외 카드가 문제라면 클룩을 이용합니다",
    desc: "도쿄 디즈니 리조트 공식 사이트는 해외에서 발급된 신용카드를 거부하거나 막는 일이 잦습니다. 클룩은 공식 승인 판매처로 해외 카드를 받고 결제 화면이 한국어로 되어 있어, 많은 해외 방문객이 이용합니다.",
  },
  {
    title: "전자 티켓 QR을 공식 앱에 연동합니다",
    desc: "구매 후 전자 티켓 QR 코드를 받으며, 이를 도쿄 디즈니 리조트 공식 앱에 등록할 수 있습니다. 당일 파크 내 기능도 이 앱에서 관리하니 도착 전에 설정해 두세요.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026년 도쿄 디즈니랜드 티켓은 얼마인가요?",
    a: `정해진 단일 가격은 없습니다. 도쿄 디즈니 리조트는 파크 티켓 가격이 방문일에 따라 달라진다고 분명히 밝히고 있습니다. 공개된 것은 1데이 패스포트의 최저가로, 성인(18세 이상) ¥8,900부터, 청소년(12~17세) ¥7,400부터, 어린이(4~11세) ¥5,300부터, 3세 이하 무료이며, 내 날짜의 실제 금액은 날짜를 선택하면 표시됩니다. ${CHECKED} 확인. 성수기 날짜, 특히 디즈니씨 25주년 기간의 날짜는 최저가보다 한참 높습니다.`,
  },
  {
    q: "도쿄 디즈니 티켓은 미리 사야 하나요?",
    a: `사실상 그렇습니다. 리조트 FAQ에 도쿄 디즈니랜드와 도쿄 디즈니씨에서는 파크 티켓을 판매하지 않는다고 적혀 있어, 게이트에서 살 수 있는 곳이 없습니다. 당일 구매는 그 날짜에 재고가 남아 있는 동안에만 공식 웹사이트나 앱에서 가능하며, FAQ는 그 결과도 분명히 밝힙니다. 티켓이 매진되면 입장할 수 없습니다. ${CHECKED} 확인.`,
  },
  {
    q: "도쿄 디즈니 티켓은 언제 판매가 시작되나요?",
    a: `2개월 뒤 같은 날짜의 티켓이 매일 일본 시간 14:00부터 판매됩니다. 3월 1일 방문분은 1월 1일 14:00에 열리고, 해당 월에 같은 날짜가 없으면 다음 달 1일 14:00에 판매가 시작됩니다. 한 번의 주문에 최대 10장까지 살 수 있으며, 그날의 수량에 도달하면 해당 날짜의 판매가 예고 없이 중단될 수 있습니다. ${CHECKED} 확인.`,
  },
  {
    q: "도쿄 디즈니 티켓은 어떤 것을 사야 하나요?",
    a: "한 파크에서 하루 종일 즐기려면 1데이 패스포트, 저렴하게 평일 저녁만 원하면 애프터 5 패스포트, 휴일 15:00부터의 저녁이라면 애프터 3 패스포트입니다. 두 파크를 모두 가려면 파크마다 티켓을 따로 사야 합니다. 1데이 파크 호퍼 패스포트는 현재 판매하지 않습니다. 멀티데이 패스포트도 판매하지 않으므로, 두 파크 여행은 날짜가 지정된 티켓 두 장입니다.",
  },
  {
    q: "도쿄 디즈니 파크의 운영 시간은 어떻게 되나요?",
    a: `고정된 운영 시간이 아니라 날짜마다 정해지며, 리조트는 약 5개월 전에 공식 웹사이트에서 안내합니다. 티켓 구매 화면에서도 선택한 날짜의 운영 시간이 표시됩니다. 사기 전에 내 날짜의 운영 캘린더를 확인하세요. 저녁 패스포트로 아끼는 금액이 그만한 가치가 있는지가 여기서 결정됩니다. ${CHECKED} 확인.`,
  },
  {
    q: "도쿄 디즈니 티켓은 날짜를 바꾸거나 환불받을 수 있나요?",
    a: `환불은 안 되지만 날짜 변경은 됩니다. 고객 사정에 의한 취소·환불은 불가하며, 악천후나 지진 등 지정일에 가지 못하는 경우를 다룬 FAQ도 같은 규칙을 안내합니다. 온라인 티켓은 유효 기간 안에서 지정일 전이든 후든 변경할 수 있고 횟수 제한도 없으며, 변경할 때마다 새 날짜의 가격으로 정산됩니다. 변경은 파크가 아니라 공식 웹사이트나 앱에서 합니다. ${CHECKED} 확인.`,
  },
  {
    q: "내 날짜가 매진됐는데, 그래도 들어갈 수 있나요?",
    a: `가능성은 있습니다. 리조트 FAQ에 따르면 매진된 티켓 종류가 예고 없이 재판매될 수 있고, 다른 고객이 티켓을 다른 날짜로 변경하면 비게 된 자리가 원래 판매분으로 돌아가 다시 온라인으로 판매됩니다. 그러니 공식 사이트와 앱을 다시 확인해 볼 만하고, 판매 수량은 날짜별일 뿐 아니라 판매처별로도 나뉘므로 다른 판매처를 확인하는 것도 방법입니다. ${CHECKED} 확인.`,
  },
  {
    q: "해외 신용카드로 도쿄 디즈니 티켓을 살 수 있나요?",
    a: "도쿄 디즈니 리조트 공식 웹사이트에서는 안 되는 경우가 많습니다. 해외에서 발급된 카드를 거부하거나 막는 일이 잦아 해외 방문객에게 오랫동안 골칫거리였습니다. 일반적인 해결책은 클룩입니다. 공식 승인 판매처로 해외 카드를 받고, 결제 화면이 한국어이며, 도쿄 디즈니 리조트 공식 앱에 등록할 수 있는 전자 티켓 QR을 발급합니다.",
  },
  {
    q: "도쿄 디즈니랜드와 도쿄 디즈니씨 중 어디를 골라야 하나요?",
    a: "1데이 패스포트는 한 파크만 포함하므로 하나를 골라야 합니다. 도쿄 디즈니랜드는 디즈니의 상징인 성을 중심으로 한 파크로, 퍼레이드와 가족이 함께 즐길 수 있는 어트랙션이 있어 첫 방문자와 어린 아이를 동반한 가족에게 맞습니다. 도쿄 디즈니씨는 항해를 테마로 한 파크로 도쿄만의 개성이 강하고 성인 방문객도 즐기기 좋은 분위기이며 주류를 판매하고, 2026년 4월부터 2027년 3월까지 25주년을 기념합니다. 아이와 첫 방문이라면 디즈니랜드, 특별한 곳을 원하면 디즈니씨입니다.",
  },
  {
    q: "도쿄 디즈니 리조트는 어떻게 가나요?",
    a: "JR 게이요선 마이하마역까지 도쿄역에서 15~20분이며, 거기서 디즈니 리조트 라인 모노레일을 타거나 디즈니랜드 게이트까지 조금 걸으면 됩니다. 개장 전에 한 번, 밤 쇼가 끝난 뒤 또 한 번 오가야 하는 거리라서, 주말이나 기념 기간의 날짜라면 마이하마나 한 정거장 떨어진 곳에 숙박할 이유가 됩니다.",
  },
];

/** The English page's tokyoDisneyTripPrep, in Korean, on Klook's ko path. */
const KO_TRIP_PREP_COPY = [
  {
    label: "마이하마 주변 호텔",
    ctaLabel: "클룩에서 마이하마 호텔 보기 →",
    why: "두 파크가 함께 쓰는 역으로, 도쿄역에서 JR 게이요선으로 약 15~20분 걸립니다. 디즈니 리조트 라인 모노레일의 출발점이기도 해서, 이른 입장이나 늦은 퍼레이드를 현실적으로 만들어 줍니다.",
  },
  {
    label: "우라야스·신우라야스 호텔",
    ctaLabel: "클룩에서 우라야스 호텔 보기 →",
    why: "한 정거장 더 떨어져 있고 리조트 쪽 객실보다 대체로 저렴하며, 이 지역 호텔 다수가 게이트까지 무료 셔틀을 운행합니다. 대신 모노레일 대신 셔틀 시간표에 맞춰야 합니다.",
  },
  {
    label: "하네다 공항 리무진 버스",
    ctaLabel: "하네다 버스 보기 →",
    why: "하네다 상품의 목적지에 도쿄 디즈니 리조트가 포함되어 있어, 도심의 역이 아니라 리조트에서 내리는 공항 이동입니다. 짐을 들고 다시 갈아탈 필요가 없습니다.",
  },
  {
    label: "나리타 공항 리무진 버스",
    ctaLabel: "리무진 버스 보기 →",
    why: "나리타에서 들어온다면 같은 공항 리무진 운영사가 위탁 수하물과 함께 도쿄 도심의 호텔·역 정류장까지 운행합니다. 노선마다 목적지가 다르니 예약 전에 내 날짜의 정류장 목록을 확인하세요.",
  },
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩에서 eSIM 옵션 보기 →",
    why: "패스포트는 도쿄 디즈니 리조트 공식 앱에 연동된 QR 코드이고, 당일 파크 내 기능도 앱에서 관리합니다. 호텔 와이파이를 기다리는 휴대폰으로는 어느 것도 되지 않습니다.",
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

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "도쿄 디즈니랜드 티켓" }];

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
          <h1 className={styles.heroTitle}>
            도쿄 디즈니랜드 티켓(2026):<br />가격, 디즈니씨, 구매 방법
          </h1>
          <p className={styles.heroSubtitle}>
            날짜 지정 티켓, 변동 가격제, 현장 판매 없음, 환불 불가. 패스포트 가격, 내 날짜의 판매 시작 시점,
            어떤 티켓을 사야 하는지 정리했습니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 가격과 규정", "2개월 전 판매 시작", "해외 카드는 클룩"].map((t) => (
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
            2026년 <strong>도쿄 디즈니랜드 티켓</strong>은 지정된 하루에 한 파크를 이용하는 1데이 패스포트이며,
            성인 <strong>¥8,900</strong>, 12~17세 청소년 <strong>¥7,400</strong>, 4~11세 어린이{" "}
            <strong>¥5,300</strong>부터이고 3세 이하는 무료입니다. 이는 공개된 최저가입니다. 리조트가 모든
            티켓의 가격을 방문일에 따라 정하고, 날짜를 고르면 그날의 금액을 보여 주기 때문입니다. 구매는 도쿄
            디즈니 리조트 공식 웹사이트나 앱, 또는 클룩 같은 공식 승인 판매처에서 합니다.{" "}
            <strong>두 파크 모두 현장 판매가 없고</strong>, 내 날짜는 <strong>2개월 전, 매일 일본 시간
            14:00</strong>에 판매가 시작됩니다. 그러니 중요한 마감은 여행 주간이 아니라 바로 그 순간이며,
            매진된 날짜에는 입장할 수 없습니다. 고객 사정에 의한 취소는 불가하지만 날짜 변경은 가능합니다. 모든
            규정과 수치는 리조트 자체 정보이며 {CHECKED}에 확인했습니다.
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
                <p className={styles.verdictStatValue}>성인 ¥8,900부터</p>
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
              2개월 전 판매가 열리면 바로 사세요. 환불은 없지만 온라인 티켓의 날짜는 몇 번이든 바꿀 수
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

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>2026년 도쿄 디즈니랜드 티켓은 얼마인가요?</h2>
          <p className={styles.bodyText}>
            성인 ¥8,900부터입니다. 여기서 중요한 것은 ‘부터’라는 표현입니다. 도쿄 디즈니 리조트는 파크
            티켓이 변동 가격제이며 방문일에 따라 요금이 다르다고 밝히고 있어, 안내된 금액은 최저 요금이며,
            방문 날짜에 따라 실제 가격이 달라집니다. 그날의 실제 금액은 공식 티켓 페이지에서 날짜를 선택하면 표시됩니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["연령 구분", "대상", "1데이 패스포트(1개 파크)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.band}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            공개 최저가와 연령 구분은 공식 파크 티켓 페이지에서 {CHECKED}에 확인했고, 변동 가격제 규정은
            리조트 FAQ의 표현 그대로입니다. 리조트가 상한가를 고정 수치로 공개하지 않으므로 여기서도 상한은
            적지 않습니다. 주말이나 디즈니씨 25주년 기간의 날짜는 최저가보다 상당히 비쌉니다. 도쿄의 다른
            날짜 지정 티켓은 확인일과 함께{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              일본 관광지 티켓 가격표(영어)
            </Link>
            에 정리되어 있습니다.
          </p>
        </section>

        {/* Q2 — which ticket */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>티켓 종류</span>
          <h2 className={styles.sectionTitle}>도쿄 디즈니 티켓은 어떤 것을 사야 하나요?</h2>
          <p className={styles.bodyText}>
            하루 종일이라면 1데이 패스포트, 밤 시간만 원하면 저녁 패스포트, 두 파크를 모두 가려면 티켓 두
            장입니다. 하루에 두 파크를 이용할 수 있던 1데이 파크 호퍼 패스포트는 현재 판매하지 않고,
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
            티켓 종류, 입장 시간, 파크 호퍼의 현재 상태는 리조트 FAQ의 답변이며 {CHECKED}에 확인했습니다. 내
            날짜에 어떤 패스포트가 판매되는지는 날짜별로 다릅니다. 기간 한정 티켓은 리조트 이벤트에 따라
            생겼다 사라지므로, 위 목록은 고정된 카탈로그가 아니라 전체 구성의 윤곽입니다.
          </p>
        </section>

        {/* Q3 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>운영 시간</span>
          <h2 className={styles.sectionTitle}>도쿄 디즈니의 운영 시간은 어떻게 되나요?</h2>
          <p className={styles.bodyText}>
            고정된 운영 시간은 없습니다. 리조트가 날짜마다 정해 약 5개월 전에 자체 운영 캘린더에 공개합니다.
            티켓 판매보다 이르다는 점이 유용한데, 내 날짜의 판매가 시작될 무렵에는 그날 파크가 몇 시간
            운영하는지 이미 알 수 있습니다.
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
        </section>

        {/* Q4 — the booking window, sell-outs and refunds, then the CTA stack. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>판매 일정</span>
          <h2 className={styles.sectionTitle}>도쿄 디즈니 티켓은 미리 예약해야 하나요?</h2>
          <p className={styles.bodyText}>
            그렇습니다. 그리고 리조트가 다른 선택지를 없애 두었습니다. 도쿄 디즈니랜드와 도쿄 디즈니씨에서는
            파크 티켓을 전혀 판매하지 않습니다. 내 날짜는 <strong>2개월 전, 매일 일본 시간 14:00</strong>에
            판매가 시작되며, 한국과 일본은 시차가 없으니 한국 시간으로도 오후 2시입니다. 하루 판매 수량에는
            상한이 있어 다 팔리면 예고 없이 판매가 멈출 수 있습니다. 주말, 일본 공휴일, 디즈니씨 25주년
            기간의 날짜라면 그 순간이 전부입니다.
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
          <h2 className={styles.sectionTitle}>디즈니랜드와 디즈니씨, 어느 파크를 고를까?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            티켓 한 장에 파크 하나입니다. 파크 호퍼가 판매되지 않으니 순서의 문제가 아니라 진짜 선택입니다.
            디즈니의 상징인 성이 있는 파크와 어린 아이라면 디즈니랜드, 다른 어디에도 없는 파크와 25주년의 해를 원한다면
            디즈니씨입니다.
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

        {/* Klook: the stay and the days either side. */}
        <KlookTripPrep
          label="파크 가는 날 전후"
          heading="도쿄 디즈니 리조트 근처에 묵어야 할까?"
          intro="주말이나 기념 기간의 날짜라면 그렇습니다. 리조트는 도쿄역에서 JR 게이요선으로 15~20분 거리라서, 게이트가 열리기 전에 한 번, 밤 퍼레이드가 끝난 뒤 또 한 번 오가야 합니다. 마이하마나 한 정거장 떨어진 곳에 묵으면 하루의 시작과 끝을 모두 되찾을 수 있습니다."
          items={koTripPrep}
        />

        {/* Foreign card / Klook explainer */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>해외 카드</span>
          <h2 className={styles.sectionTitle}>해외 카드로 도쿄 디즈니 티켓을 살 수 있나요?</h2>
          <p className={styles.bodyText}>
            공식 사이트에서는 안 되는 경우가 많습니다. 도쿄 디즈니 리조트 공식 웹사이트가 기본 구매처이지만,
            해외에서 발급된 신용카드를 거부하거나 막는 일이 잦습니다. 해외 여행자에게 반복되는 골칫거리이고,
            사려는 티켓이 2개월 전 한순간에만 판매가 시작된다면 더욱 곤란합니다.
          </p>
          <p className={styles.bodyText}>
            <strong>클룩은 도쿄 디즈니 리조트의 공식 승인 티켓 판매처입니다.</strong> 해외 카드를 받고, 결제
            화면이 한국어이며, 도쿄 디즈니 리조트 공식 앱에 등록할 수 있는 전자 티켓 QR 코드를 발급합니다. 해외
            카드 지원과 앱에 연동되는 QR, 이 조합 덕분에 해외 방문객의 표준적인 해결책이 되었습니다. 도쿄의
            다른 일정과 함께 계획하고 있다면, 저희{" "}
            <Link href="/ko/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              시부야 스카이 티켓 가이드
            </Link>
            에서 판매처를 통하는 편이 더 쉬운 또 하나의 날짜 지정 예약을 다룹니다.
          </p>
        </section>

        {/* FAQ */}
        <FaqList items={faqItems} />

        {/* Klook tours in the same city. */}
        <KlookTourPicks
          heading="같은 도시에서 떠나는 1일 투어"
          intro="파크에 가면 하루가 통째로 들어가므로, 대부분은 디즈니 안에 도쿄 일주일을 넣는 게 아니라 도쿄 일주일 안에 디즈니를 넣습니다. 아래 두 투어는 파크에 가지 않는 하루를 채워 주고, 티켓과 같은 클룩 계정에서 결제할 수 있습니다."
          tours={koTours}
        />

        {/* A second authorized-reseller route. */}
        <GygCompare
          slug={GYG_SLUG}
          heading="겟유어가이드의 같은 패스포트"
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
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법" },
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 예약(2026): 티켓 가격, 입장 시간, 보더리스와 비교" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 전철, 지하철, 교통카드 정리(영어)" },
            { href: "/guides/attractions", title: "일본에서 할 것 더 보기(영어) →" },
            { href: "/ko/guides/attractions/usj-tickets-express-pass", title: "유니버설 스튜디오 재팬 익스프레스 패스(2026): 티켓은 어떤 것을 살까" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "도쿄에서 스모 보기(2026): 본대회 티켓 vs 아침 연습(영어)" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>도쿄 디즈니 날짜를 확보하세요</h2>
            <p className={styles.ctaBannerDesc}>
              현장 판매가 없고, 매진된 날짜에는 입장할 수 없으며, 내 날짜는 2개월 전 일본 시간 14:00에 판매가
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
