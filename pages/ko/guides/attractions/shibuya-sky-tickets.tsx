import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../../components/BookingEsimCard";
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
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  fujiHakoneDayTour,
  shibuyaSkyDayTripPrep,
  shibuyaSkySameDayPrep,
  shibuyaSkyTicketUrl,
  tokyoSightseeingBusTour,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { gygShibuyaSky } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Korean edition of /guides/attractions/shibuya-sky-tickets. Mirrors the English page as
// of 2026-11-01 block by block — same sections, tables, FAQ, Klook and GetYourGuide CTAs —
// with every figure taken from the English page or lib/attraction-prices.ts; nothing added.
// 2026-11-11 (R09): synced with English — answer-first lead, Last checked lines, stay rule, sunset table.
// 2026-11-13 (R02): Korean exact-match title for "시부야 스카이 티켓 / 예약 / 가격". Google was
// showing the old breadcrumb label ("일본 티켓 가이드(영어)") glued to the last crumb as the
// title, so the breadcrumb now sits below the hero and nothing precedes the H1. Re-read that day:
//   gotokyo.org/jp/spot/1749   web ¥2,700(~14:59)|¥3,400(15:00~), counter ¥3,000|¥3,700,
//                              "大人の入場チケットはWEBで完売の場合、窓口も完売",
//                              "小人の入場チケットは当日窓口でのみ販売、5歳以下無料",
//                              10:00~22:30 (最終入場 21:20), 日没の30分前頃がおすすめ
//   operator release 20250227scsq.pdf (search index; direct read timed out): 大人 = 12歳以上,
//                              小人 6~11歳 counter only, sales open 2週間前 0時, 20分毎の日時指定券

const ROUTE = "/ko/guides/attractions/shibuya-sky-tickets";
const TITLE = "시부야 스카이 티켓 예약 2026: 가격·예약 오픈·일몰 시간";
const DESC =
  "시부야 스카이 티켓 가격: 웹 예약 성인 ¥2,700·¥3,400(15시~), 현장 +¥300. 예약은 2주 전 0시 오픈, 일몰부터 매진.";

const LOCALE = "ko" as const;
const P = PRICES.shibuyaSky;
const CHECKED = dateLabel(P.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const AT_DOOR = priceLabel(P.atDoor, LOCALE);
const LAST_CHECKED = dateLabel("2026-11-11", LOCALE);
const TODAY_CHECKED = dateLabel("2026-11-13", LOCALE);
const GOTOKYO_JP_URL = "https://www.gotokyo.org/jp/spot/1749/index.html";
const RELEASE_URL = "https://www.shibuya-scramble-square.com/assets/pdf/about/20250227scsq.pdf";
const OFFICIAL_URL = "https://www.shibuya-scramble-square.com/sky/ticket/";
const GOTOKYO_URL = "https://www.gotokyo.org/en/spot/1749/index.html";
const NAOJ_URL = "https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s1311.html";

/** Tokyo sunset on the 15th of each month, 2026 (NAOJ). Every one falls in the ¥3,400 band. */
const sunsetRows = [
  { month: "1월", sunset: "16:50" },
  { month: "2월", sunset: "17:22" },
  { month: "3월", sunset: "17:48" },
  { month: "4월", sunset: "18:14" },
  { month: "5월", sunset: "18:39" },
  { month: "6월", sunset: "18:58" },
  { month: "7월", sunset: "18:57" },
  { month: "8월", sunset: "18:31" },
  { month: "9월", sunset: "17:49" },
  { month: "10월", sunset: "17:06" },
  { month: "11월", sunset: "16:35" },
  { month: "12월", sunset: "16:29" },
];

// The same Klook listing as the English CTA, on Klook's Korean locale path.
const SHIBUYA_SKY_URL = klookFor(shibuyaSkyTicketUrl, LOCALE);
const GYG_SLUG = "ko-shibuya-sky-tickets";

/** What each ticket costs, by entry time and by where you buy it. */
const priceRows = [
  { ticket: "결론: 성인은 웹 예매가 가장 저렴 — 15시 전 입장", online: "¥2,700", counter: "¥3,000" },
  { ticket: "성인, 15:00~21:20 입장 — 일몰 시간대 전부", online: "¥3,400", counter: "¥3,700" },
  { ticket: "중학생・고등학생", online: "성인 요금(위 두 줄)", counter: "성인 요금(위 두 줄)" },
  {
    ticket: "초등학생(어린이)",
    online: "웹 판매 없음",
    counter: "¥1,200(당일 창구만)",
  },
  { ticket: "유아(만 5세 이하)", online: "무료", counter: "무료" },
];

/** When a date opens, in Korean time (no time difference with Japan). */
const openRows = [
  { what: "결론: 예약 오픈 시간", detail: "입장일 2주 전 0:00(일본 시간 = 한국 시간)" },
  { what: "예: 12월 1일 입장", detail: "11월 17일 0:00 오픈" },
  { what: "예: 12월 24일 입장", detail: "12월 10일 0:00 오픈" },
  { what: "예: 1월 2일 입장", detail: "12월 19일 0:00 오픈(1월 1일은 휴무)" },
  { what: "티켓 형태", detail: "입장 날짜와 20분 단위 입장 시간을 지정하는 일시 지정권" },
  { what: "웹에서 매진되면", detail: "성인 현장 티켓도 매진 — 현장 구매는 웹 잔여분이 있을 때만" },
];

/** Hours, last admission and closures — the part that decides which band you pay. */
const hoursRows = [
  { what: "운영 시간", detail: "10:00~22:30" },
  { what: "마지막 입장", detail: "21:20" },
  { what: "체류 시간 제한", detail: "없음 — 원하는 만큼 머물 수 있고, 대부분은 약 90분 머뭅니다" },
  { what: "가는 법", detail: "시부야역과 바로 연결" },
  { what: "저렴한 시간대", detail: "10:00~14:59 입장" },
  { what: "비싼 시간대", detail: "15:00~21:20 입장 — 일몰 입장은 모두 이 시간대에 들어갑니다" },
  {
    what: "휴무",
    detail: "1월 1일(설날). 그 밖의 날에도 임시 휴무나 단축 운영이 있을 수 있습니다",
  },
];

/** The booking window, the counter and the cancellation terms. */
const bookingRows = [
  {
    q: "판매는 언제 시작되나요?",
    a: "입장일 2주 전, 일본 시간 00:00입니다. 2025년 2월 27일 공지가 판매 시작 시점을 일부러 이 시각으로 옮겨, 언제 판매가 시작되는지 예측할 수 있게 했습니다.",
  },
  {
    q: "취소할 수 있나요?",
    a: "같은 공지로 웹 티켓은 입장일까지 무료 취소가 도입됐습니다. 다만 본인 결제 화면에 표시되는 조건을 확인하세요. 예약 플랫폼은 자체 조건을 두며, 클룩 상품 페이지에는 24시간 전까지 무료 취소라고 적혀 있습니다.",
  },
  {
    q: "현장에서도 티켓을 살 수 있나요?",
    a: "네. 14층 창구에서 15시 전 입장은 ¥3,000, 15시부터는 ¥3,700에 판매합니다. 다만 성인 티켓이 웹에서 매진되면 창구도 매진이고, 창구에서는 시간대를 미리 예약할 수 없으므로 계획이 아니라 대안으로 생각하세요.",
  },
  {
    q: "창구에서만 파는 것은?",
    a: "초등학생(어린이) 티켓입니다. ¥1,200이고 온라인이 아니라 당일 14층 창구에서 판매합니다. 중학생부터는 성인 요금입니다. 그래서 가족 여행이라면 온라인으로 성인 티켓을 사고, 초등학생 티켓은 도착해서 결제합니다.",
  },
];

const deckRows = [
  {
    deck: "시부야 스카이",
    height: "약 229 m(루프톱)",
    highlight: "스크램블 교차로 바로 위의 야외 루프톱 — 도쿄를 대표하는 그 사진",
    price: `온라인 ${ADULT}(창구 ${AT_DOOR})`,
    area: "시부야역",
  },
  {
    deck: "도쿄 스카이트리",
    height: "350 m・450 m 전망대(타워 634 m)",
    highlight: "가장 높은 시야와 유리 바닥 구간. 맑은 날에는 후지산도 보입니다",
    price: `${priceLabel(PRICES.tokyoSkytree.adult, LOCALE)}(플로어 350)`,
    area: "오시아게, 아사쿠사 근처",
  },
  {
    deck: "도쿄 타워",
    height: "약 150 m・약 250 m 전망대(타워 332 m)",
    highlight: "1958년의 레트로 랜드마크. 더 높은 층은 Top Deck 투어로",
    price: `${priceLabel(PRICES.tokyoTower.adult, LOCALE)} 메인 덱`,
    area: "시바코엔・아카바네바시",
  },
  {
    deck: "도쿄도청 전망대",
    height: "약 202 m",
    highlight: "입장 무료. 티켓 없이 보는 가성비 최고의 도시 전경",
    price: priceLabel(PRICES.tochoDeck.adult, LOCALE),
    area: "신주쿠",
  },
];

const whoFor = [
  {
    title: "일몰에 가야 하는 경우",
    desc: "그 상징적인 사진을 원하고 미리 계획할 수 있다면. 일몰은 몇 월에 가든 ¥3,400 시간대에 들어가므로, 신경 써야 할 것은 가격보다 예약 가능 여부입니다 — 그리고 가장 먼저 매진되는 시간대가 바로 이것입니다. 일몰 30~60분 전에 입장하면 낮, 골든아워, 도시에 불이 켜지는 순간을 한 번에 볼 수 있습니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="4.2" y1="10.2" x2="5.6" y2="11.6" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.4" y1="11.6" x2="19.8" y2="10.2" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "15시 전에 가야 하는 경우",
    desc: "빛보다 가격이 중요하다면. 10:00~14:59 입장은 ¥2,700으로 ¥3,400보다 ¥700 저렴하고 — 루프톱은 똑같습니다 — 이른 시간대는 임박해서도 가장 잡기 쉽습니다. 맑고 건조한 날에는 낮 시야가 가장 멀리까지 닿아 후지산도 보입니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "늦게 가야 하는 경우",
    desc: "네온 야경이 목적이거나 일몰 시간대가 이미 없다면. 늦은 시간대는 일몰과 같은 ¥3,400 요금이지만 보통 가장 늦게까지 남아 있고, 마지막 입장 21:20에 운영은 22:30까지입니다. 2주 전에 판매가 시작됐는데 일몰 시간대가 이미 매진됐을 때 좋은 대안입니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "방문 예정일의 2주 전 날짜를 확인하세요",
    desc: "날짜는 정확히 2주 전 일본 시간 00:00에 판매가 시작됩니다. 한국과 일본은 시차가 없으니 한국 시간으로도 00:00입니다. 다른 무엇보다 먼저 그 시각을 캘린더에 넣어 두세요. 일몰 시간대를 예약할 수 있느냐는 이것 하나로 정해집니다.",
  },
  {
    title: "예약 가능한 시간을 확인하기 전에 원하는 시간대와 요금을 정하세요",
    desc: "15시 전 입장은 ¥2,700, 15시부터는 ¥3,400입니다. 일몰과 야경은 모두 비싼 쪽 시간대에 있으니 일몰 시간대에는 저렴한 요금이 적용되지 않습니다. 낮 풍경, 일몰, 야경 중 원하는 전망을 먼저 정한 뒤 입장 시간을 선택하세요.",
  },
  {
    title: "창구보다 온라인으로 예약하세요",
    desc: "온라인은 두 시간대 모두 14층 창구보다 ¥300 저렴하고, 시간대를 미리 확보하는 유일한 방법입니다. 예외는 어린이 티켓으로, 만 6~12세는 당일 창구에서 판매합니다.",
  },
  {
    title: "해외 발급 카드라면 예약 플랫폼을 이용하세요",
    desc: "2024년 7월부터 시부야 스카이 공식 사이트에서는 해외에서 발급된 카드 결제가 거절되는 경우가 많습니다. 클룩은 해외 카드로 결제할 수 있고, 입장 24시간 전까지 무료 취소라고 명시하고 있습니다. 변덕스러운 도쿄 날씨에 대비할 수 있는 좋은 방법입니다.",
  },
  {
    title: "일몰 시간대라면 30~60분 일찍 도착하세요",
    desc: "입장 수속, 사물함에 소지품 보관(루프톱은 야외라 바람이 강합니다), 빛이 바뀌기 전에 자리 잡기까지 시간이 필요합니다.",
  },
];

// FAQ cut to the five questions Korean searchers actually type (GSC 10/14~11/10), same as FAQPage.
const faqItems: FaqItem[] = [
  {
    q: "시부야 스카이 예약은 언제 열리나요?",
    a: `입장일 2주 전 0시(일본 시간)에 열립니다. 한국과 일본은 시차가 없으므로 한국 시간으로도 0시입니다. 예를 들어 12월 1일 입장분은 11월 17일 0시에 판매가 시작됩니다. 티켓은 날짜와 20분 단위 입장 시간을 지정하는 방식이고, 일몰 시간대가 가장 먼저 매진되므로 일몰이 목적이라면 오픈 직후에 예약하세요. 운영사 2025년 2월 27일 공지 기준, ${TODAY_CHECKED} 확인.`,
  },
  {
    q: "시부야 스카이 가격은 얼마인가요?",
    a: `성인(중학생 이상) 웹 예매는 10:00~14:59 입장이 ¥2,700, 15:00~21:20 입장이 ¥3,400입니다. 현장(14층 창구) 구매는 각각 ¥3,000, ¥3,700으로 ¥300 비쌉니다. 초등학생은 당일 창구에서만 ¥1,200에 판매하고, 만 5세 이하는 무료입니다. 2025년 4월 1일 입장분부터 적용된 가격이며, ${TODAY_CHECKED}에 도쿄도 공식 관광 사이트에서 다시 확인했습니다.`,
  },
  {
    q: "시부야 스카이 티켓은 현장 구매가 가능한가요?",
    a: "가능합니다. 14층 창구에서 당일 판매하지만 웹보다 ¥300 비싸고, 성인 티켓이 웹에서 매진되면 창구도 매진입니다. 즉 일몰처럼 인기 있는 시간대는 현장에서 살 수 없는 경우가 많으므로, 원하는 시간이 정해져 있다면 웹이나 클룩으로 미리 예약하세요. 초등학생 티켓만은 반대로 창구에서만 판매합니다.",
  },
  {
    q: "일몰 시간에 가려면 몇 시 티켓을 사야 하나요?",
    a: "일몰 30~60분 전 입장 티켓을 사세요. 2026년 도쿄 일몰(각 월 15일, 일본 국립천문대)은 11월 16:35, 12월 16:29, 1월 16:50, 2월 17:22이므로, 11월은 15:35~16:05, 12월은 15:29~15:59, 1월은 15:50~16:20, 2월은 16:22~16:52 사이의 입장 시간이 기준입니다. 모두 ¥3,400 시간대이고, 체류 시간 제한이 없어 그대로 야경까지 볼 수 있습니다.",
  },
  {
    q: "해외 발급 카드로 시부야 스카이 티켓을 예약할 수 있나요?",
    a: "시부야 스카이 공식 사이트에서는 안 되는 경우가 많습니다. 2024년 7월부터 해외 발급 카드 결제가 거절되는 경우가 많기 때문입니다. 확실한 방법은 클룩 같은 예약 플랫폼입니다. 해외 카드로 결제할 수 있고 전자 티켓을 받으며, 입장 24시간 전까지 무료 취소라고 명시하고 있습니다.",
  },
];

// The English page's Klook blocks, item for item, on the Korean locale path.
const sameDayCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "신주쿠 야간 푸드 투어(오모이데요코초・가부키초・골든가이)",
    ctaLabel: "신주쿠 야간 투어 보기 →",
    why: "일몰 시간대 뒤의 저녁입니다. 시부야에서 야마노테선으로 금방인 신주쿠에서 오모이데요코초・가부키초・골든가이를 걷는 3시간 그룹 투어로, 골든가이 이자카야에서 한 잔으로 끝납니다.",
  },
  {
    label: "도쿄 시내 관광 버스 1일 투어",
    ctaLabel: "도쿄 1일 투어 보기 →",
    why: "예약한 시간대가 저녁이라면 낮에는 도쿄의 다른 곳을 볼 수 있습니다. 고쿄 정원・아사쿠사・도쿄 스카이트리를 다국어 오디오 가이드와 함께 도는 가이드 1일 투어입니다.",
  },
  {
    label: "도쿄 서브웨이 티켓(24・48・72시간)",
    ctaLabel: "서브웨이 티켓 보기 →",
    why: "시부야역에는 한조몬선・긴자선・후쿠토신선이 지나므로 24・48・72시간 티켓으로 전망대 왕복을 해결할 수 있습니다. 야마노테선 같은 JR 노선은 포함되지 않습니다.",
  },
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "클룩 티켓은 휴대폰의 전자 티켓으로 받고, 입장 시간이 정해져 있습니다. 공항에서부터 데이터가 있으면 당일 바우처・지도・날씨를 바로 확인할 수 있습니다.",
  },
  {
    label: "나리타・하네다 공항 ⇄ 도쿄 단독 차량 픽업・샌딩",
    ctaLabel: "공항 픽업・샌딩 보기 →",
    why: "역이 아니라 호텔 주소로 예약하고, 나리타・하네다 어느 공항이든 기사가 항공편을 확인합니다. 도착한 날 늦은 시간대를 예약했다면 유용합니다.",
  },
];
const sameDayPrepAll: KlookTripPrepItem[] = shibuyaSkySameDayPrep.map((item, i) =>
  withKlookLocale(item, LOCALE, sameDayCopy[i]),
);

const dayTripCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "시부야 주변 호텔",
    ctaLabel: "클룩에서 시부야 호텔 보기 →",
    why: "일몰 시간대 관람은 해가 진 뒤, 야마노테선이 가장 붐빌 때 끝납니다. 시부야에 묵으면 귀갓길이 걸어서 몇 분이 되고, 아침 고속버스가 출발하는 역 바로 앞에 있게 됩니다.",
  },
  {
    label: "시부야 바 호핑 투어(3시간)",
    ctaLabel: "시부야 바 투어 보기 →",
    why: "일몰 시간대 관람 뒤 몇 시간을 쓰는 가장 자연스러운 방법이자, 루프톱에서는 보이지 않는 시부야의 한 면입니다. 가이드가 대신 주문해 주는 바 두 곳을 들릅니다.",
  },
  {
    label: "도쿄 나이트 바 호핑 투어(신주쿠・시부야)",
    ctaLabel: "나이트 투어 보기 →",
    why: "신주쿠까지 건너가는 버전으로, 야간 시간대와 잘 맞습니다. 전망대는 늦은 시간이 가장 예약하기 쉽고, 그 뒤에도 저녁을 이어 갈 곳이 남습니다.",
  },
  {
    label: "시부야 푸드・컬처 반나절 워킹 투어",
    ctaLabel: "푸드 워킹 투어 보기 →",
    why: "낮 시간대이거나 일행에 20세 미만이 있다면 모든 연령이 함께할 수 있는 낮의 선택지입니다. 바 투어가 아니라 시부야 109, 논베이요코초, 미야시타 파크를 도는 반나절 산책입니다.",
  },
  {
    label: "도쿄 서브웨이 티켓(24・48・72시간)",
    ctaLabel: "서브웨이 티켓 보기 →",
    why: "시부야역에는 한조몬선・긴자선・후쿠토신선이 지나므로 24・48・72시간 티켓으로 관람 전후의 이동을 해결할 수 있습니다. 해외에서 발급된 비접촉식 결제 카드로는 이 개찰구를 통과할 수 없습니다.",
  },
];
const dayTripPrepAll: KlookTripPrepItem[] = shibuyaSkyDayTripPrep.map((item, i) =>
  withKlookLocale(item, LOCALE, dayTripCopy[i]),
);

// R02: the three highest-rate items (Shibuya hotels 6.5%, Tokyo Subway Ticket 5%, Klook eSIM 20%)
// sit directly under the main Shibuya Sky CTA; the later blocks keep the rest so nothing repeats.
const bookFirstPrep: KlookTripPrepItem[] = [dayTripPrepAll[0], sameDayPrepAll[2], sameDayPrepAll[3]];
const sameDayPrep = sameDayPrepAll.filter((_, i) => i !== 2 && i !== 3);
const dayTripPrep = dayTripPrepAll.filter((_, i) => i !== 0 && i !== 4);

const tours = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "도쿄 시내 관광 버스 1일 투어",
    desc: "고쿄 정원・아사쿠사・도쿄 스카이트리를 다국어 오디오 가이드와 함께 도는 가이드 투어",
  }),
  withKlookLocale(fujiHakoneDayTour, LOCALE, {
    title: "후지산＋하코네 1일 투어",
    desc: "후지산 5합목과 하코네 화산 지대・아시노코를 묶어 도쿄에서 다녀오는 1일 투어",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "시부야 스카이 예약" }];

const linkStyle = { color: "var(--text)", fontWeight: 600 };
const redLinkStyle = { color: "var(--red)", fontWeight: 600 };

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoShibuyaSkyTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

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

      {/* Hero — the H1 is the first text on the page. The breadcrumb (whose old label Google
          glued onto the title) and the badges now sit below it. */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>시부야 스카이 티켓 예약 2026: 가격, 예약 오픈 시간, 일몰 시간</h1>
          <p className={styles.heroSubtitle}>
            시부야 스크램블 교차로를 내려다보는 229 m 높이의 루프톱 전망대. 웹 예매와 현장 구매 가격, 입장 2주 전 0시에
            열리는 예약, 그리고 가장 먼저 매진되는 일몰 시간대.
          </p>
          <p className={styles.eyebrow} style={{ marginTop: "0.75rem", marginBottom: 0 }}>{updatedLabel} 업데이트</p>
        </div>
      </section>

      <Breadcrumb trail={trail} />

      <div className={styles.content}>
        <Disclosure />

        {/* Lead paragraph */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>시부야 스카이 티켓 가격은 웹 예매 기준 성인(중・고등학생 포함) 15시 전 입장 ¥2,700, 15시부터
            ¥3,400이고, 현장 구매는 각각 ¥3,000・¥3,700입니다</strong>. 초등학생은 당일 창구에서만 ¥1,200,
            만 5세 이하 유아는 무료입니다. 시부야 스카이 예약은 <strong>입장일 2주 전 0시(한국 시간과 같음)</strong>에
            열리고, 일몰 시간대가 가장 먼저 매진되며 성인 티켓이 웹에서 매진되면 현장 창구도 매진입니다.
          </p>
          <p className={styles.bodyText}>
            시부야 스카이는 10:00~22:30 운영(마지막 입장 21:20)이며, 입장 후 체류 시간 제한이 없고 대부분의
            방문객은 약 90분 머뭅니다. 운영사 공식 사이트나
            클룩 같은 예약 플랫폼에서 살 수 있습니다 — 공식 사이트에서는 2024년 7월부터 해외 발급 카드 결제가
            거절되는 경우가 많습니다. 가격은 시부야 스크램블 스퀘어가 2025년 2월 27일에 발표한 입장권 개정 기준이며
            ({CHECKED} 확인), 가격・현장 판매 규정・운영 시간은 {TODAY_CHECKED}에 도쿄도 공식 관광 사이트에서
            다시 확인했습니다.
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
                <p className={styles.verdictStatLabel}>가격(온라인)</p>
                <p className={styles.verdictStatValue}>성인 ¥2,700 / ¥3,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>운영 시간</p>
                <p className={styles.verdictStatValue}>10:00~22:30, 마지막 입장 21:20</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>예약 오픈</p>
                <p className={styles.verdictStatValue}>입장 2주 전 0:00(한국 시간 동일)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>먼저 매진</p>
                <p className={styles.verdictStatValue}>일몰 시간대</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 온라인으로 예약하고(두 시간대 모두 창구보다 ¥300 저렴), 일몰을 원한다면 2주
              전 판매가 시작되는 순간 예약하세요. 카드가 해외 발급이라면 클룩으로 예약하세요. 해외 카드로
              결제되고, 24시간 전까지 무료 취소라고 명시하고 있습니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                시부야 스카이 티켓 보기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
            </div>
          </div>
        </div>

        {/* Directly under the main CTA: the three bookings that pay best and are needed the same day */}
        <KlookTripPrep
          label="같은 날 예약"
          heading="같은 날 예약해 두면 좋은 것"
          intro="시부야 스카이 티켓을 잡았다면 같은 날 필요한 것은 세 가지입니다. 일몰 뒤 붐비는 전철을 피할 시부야 숙소, 전망대 왕복용 지하철 패스, 휴대폰 전자 티켓을 여는 데이터."
          items={bookFirstPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>시부야 스카이 가격은 얼마인가요?</h2>
          <p className={styles.bodyText}>
            성인(중학생 이상) 웹 예매는 15시 전 입장 ¥2,700, 15시부터 ¥3,400이고, 현장 구매는 각각 ¥300이 더
            붙습니다. 초등학생은 창구에서만 ¥1,200, 만 5세 이하는 무료입니다. 많은 가이드가 아직도 틀리는 부분이 바로 이 두 가격대 구조입니다. 시부야 스크램블
            스퀘어가 입장 시간별로 가격을 나눈 2025년 4월 1일 이후, 시부야 스카이의 단일 가격은 없습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["구분", "웹 예매", "현장 구매(14층 창구)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.online}</td>
                      <td className={styles.tdPrice}>{row.counter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            가격은 {CHECKED}에 확인했으며, 시부야 스크램블 스퀘어가 2025년 2월 27일에 낸 공지 &ldquo;SHIBUYA SKY
            입장 티켓 개정에 대하여(SHIBUYA SKY 入場チケットの改定について)&rdquo;에 따라 2025년 4월 1일 입장분부터
            적용됩니다. 중학생 이상이 성인 요금이라는 연령 구분은 같은 공지 기준이고, 초등학생 창구 전용 판매와
            만 5세 이하 무료는 도쿄도 공식 관광 사이트 기준입니다. 결제 전에 다시 확인하세요
            — 이 수치는 이 가이드에서 다루는 다른 모든 명소와 함께{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              일본 명소 티켓 가격 표(영어)
            </Link>
            에 정리되어 있으며, 항목마다 확인 날짜가 붙어 있습니다.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: 2026-11-13</strong> · 출처:{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener" style={linkStyle}>shibuya-scramble-square.com/sky/ticket/</a>
            {" "}(운영사),{" "}
            <a href={GOTOKYO_JP_URL} target="_blank" rel="noopener" style={linkStyle}>gotokyo.org</a>
            {" "}(도쿄도 — 같은 가격 게재, {TODAY_CHECKED} 확인).
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            시부야 스카이 티켓은 현장 구매가 가능한가요?
          </h3>
          <p className={styles.bodyText}>
            가능하지만 웹보다 ¥300 비싸고, 성인 티켓이 웹에서 매진되면 14층 창구도 매진입니다. 그래서 일몰처럼
            인기 있는 시간대는 현장에서 살 수 없는 경우가 많습니다. 반대로 초등학생 티켓은 창구에서만 팝니다 —
            가족이라면 성인은 웹으로 예약하고, 초등학생은 당일 창구에서 결제하세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              시부야 스카이 티켓 시간대 보기 →
            </KlookLink>
          </div>
        </section>

        {/* Klook, directly under the price table */}
        <KlookTripPrep
          label="같은 날 예약할 것"
          heading="시부야 스카이 전후로 예약할 것"
          intro="시부야 스카이 관람에는 약 한 시간이 걸립니다. 같은 날에는 이런 것도 함께 정해 두면 편합니다 — 전망대 다음의 저녁, 그 전의 낮, 그리고 공항에서 시내까지."
          items={sameDayPrep}
        />

        {/* Q2 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>운영 시간</span>
          <h2 className={styles.sectionTitle}>시부야 스카이 운영 시간과 마지막 입장 시간은?</h2>
          <p className={styles.bodyText}>
            10:00~22:30, 마지막 입장은 21:20입니다. 입장 시간에 따라 요금도 달라집니다. ¥2,700 시간대의 마지막
            입장은 14:59이고, 15:00부터 마감까지는 모두 ¥3,400입니다. 따라서 입장 시간은 풍경보다 먼저 ¥700의
            요금 차이를 고려해 정해야 합니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "시부야 스카이"].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
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
            <strong>Last checked: 2026-11-13</strong> · 운영 시간과 마지막 입장:{" "}
            <a href="https://www.shibuya-scramble-square.com/en/" target="_blank" rel="noopener" style={linkStyle}>shibuya-scramble-square.com</a>
            {" "}(운영사). 체류 시간 제한, 평균 체류 시간, 가는 법, 1월 1일 휴무:{" "}
            <a href={GOTOKYO_URL} target="_blank" rel="noopener" style={linkStyle}>gotokyo.org</a>
            {" "}(도쿄도). 루프톱은 야외이므로 강풍, 낙뢰, 폭우가 있는 날에는 당일에 닫힐 수 있고, 그때도 실내
            층은 운영합니다.
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            시부야 스카이에서는 얼마나 머물면 될까?
          </h3>
          <p className={styles.bodyText}>
            약 90분을 잡으세요. 시부야 스카이는 입장 후 체류 시간 제한이 없고, 도쿄도 관광 사이트에 따르면
            대부분의 방문객이 그 정도 머뭅니다. 티켓이 정하는 것은 입장 시간뿐이므로, 일몰 30~60분 전에
            입장하면 22:30 폐장 전까지 그대로 남아 야경까지 볼 수 있습니다. 입장 후에는 환불되지 않습니다.
          </p>
        </section>

        {/* Q3 — booking window, then the CTA stack */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>예약 시점</span>
          <h2 className={styles.sectionTitle}>시부야 스카이 예약은 언제 열리나요?</h2>
          <p className={styles.bodyText}>
            입장일 <strong>정확히 2주 전 0시(일본 시간)</strong>에 열리며, 한국과 일본은 시차가 없으니 한국 시간으로도
            같은 자정입니다. 인기 날짜에 가장 먼저 매진되는 것은 일몰 시간대이므로, 여행 주간까지 기다리지 말고 방문
            날짜의 예약이 열리는 순간 바로 결제할 준비를 해야 합니다. 낮이나 늦은 시간대는 훨씬 여유가 있지만, 그래도
            온라인이 1인당 ¥300 저렴합니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["예약 오픈 일정", "내용"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {openRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: "1.25rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: 2026-11-13</strong> · 출처:{" "}
            <a href={RELEASE_URL} target="_blank" rel="noopener" style={linkStyle}>운영사 공지(2025년 2월 27일, PDF)</a>
            {" "}— 2주 전 0시 판매 시작, 20분 단위 일시 지정권.{" "}
            <a href={GOTOKYO_JP_URL} target="_blank" rel="noopener" style={linkStyle}>gotokyo.org</a>
            {" "}— 웹 매진 시 창구도 매진. 날짜 예시는 이 규정으로 계산한 것입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["질문", `운영사 공지 내용(${CHECKED} 확인)`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
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
            판매처를 두 곳 소개합니다. 한 판매처에서 원하는 시간대가 매진됐다고 해서 다른 판매처에서도 매진된 것은 아니며, 공식
            사이트에서는 2024년 7월부터 해외 발급 카드 결제가 거절되는 경우가 많기 때문입니다.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 시부야 스카이 티켓 보기 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
          </div>
        </section>

        {/* Q4 — which slot */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>추천 시간대</span>
          <h2 className={styles.sectionTitle}>시부야 스카이는 어느 시간대를 예약해야 할까?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            예약할 수 있다면 일몰, 가격이 우선이라면 15시 전, 일몰이 이미 없다면 늦은 저녁입니다. 도쿄의 일몰은
            12월 중순 16:29부터 6월 중순 18:58까지 움직이므로 인기 시간대는 1년 내내 같은 시간이 아닙니다 — 하지만
            언제나 ¥3,400 시간대 안에 있습니다.
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.25rem", marginBottom: "0.6rem" }}>
            일몰 시간에 가려면 몇 시 티켓을 사야 하나요?
          </h3>
          <p className={styles.bodyText}>
            아래 일몰 시각보다 30~60분 이른 입장을 예약하세요. 11~2월이라면 대략 15:30~16:50 사이 입장이고(11월
            일몰 16:35, 12월 16:29, 1월 16:50, 2월 17:22), 도쿄도 관광 사이트도 일몰 30분 전쯤을 추천합니다. 그 시간대가 가장 먼저 매진되므로, 2주 전 일본 시간
            00:00에 판매가 시작되면 바로 예약하세요.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["월(15일 기준)", "도쿄 일몰", "추천 입장 시간"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sunsetRows.map((row) => {
                    const [h, m] = row.sunset.split(":").map(Number);
                    const start = h * 60 + m - 60;
                    const end = h * 60 + m - 30;
                    const fmt = (t: number) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
                    return (
                      <tr key={row.month}>
                        <td className={styles.tdProvider}>{row.month}</td>
                        <td className={styles.tdPrice}>{row.sunset}</td>
                        <td style={{ fontSize: "0.88rem" }}>{fmt(start)}~{fmt(end)}(¥3,400 시간대)</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: 2026-11-11</strong> · 출처: 2026년 도쿄 일몰 시각,{" "}
            <a href={NAOJ_URL} target="_blank" rel="noopener" style={linkStyle}>일본 국립천문대</a>
            . 다른 해는 1~2분 차이가 납니다. &ldquo;추천 입장 시간&rdquo;은 일몰 30~60분 전으로, 운영사 규정이
            아니라 이 가이드의 제안입니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              방문 날짜의 일몰 시간대 보기 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
          </div>
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
            전망대 관람에는 약 한 시간이 걸리므로, 시간대는 보통 하루의 나머지 일정에 맞춰 고르게 됩니다.
            저희 가이드에서는{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={redLinkStyle}>
              도쿄 3일 일정(영어)
            </Link>{" "}
            안에 들어 있고,{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={redLinkStyle}>
              도쿄에서 할 일(영어)
            </Link>
            의 추천 목록에도 올라 있습니다. 같은 도쿄 일정에서 날짜가 먼저 마감되는 예약은 두 가지가 더 있습니다.
            팀랩은 플래닛과 보더리스가 별개의 티켓이라{" "}
            <Link href="/ko/guides/attractions/teamlab-tokyo-tickets" style={redLinkStyle}>
              팀랩 플래닛 보더리스 비교
            </Link>
            에서 어느 쪽을 예약할지 먼저 정하고, 도쿄 디즈니랜드는 모든 티켓이 날짜 지정이고 현장 판매가 없으므로{" "}
            <Link href="/ko/guides/attractions/tokyo-disney-tickets" style={redLinkStyle}>
              도쿄 디즈니랜드 티켓 가이드
            </Link>
            에서 구매처를 확인하세요.
          </p>
        </section>

        {/* Klook: the evening the slot sits inside */}
        <KlookTripPrep
          label="하루의 나머지"
          heading="시부야 스카이 가는 날, 또 무엇을 예약할까?"
          intro="전망대 자체는 한 시간 정도라, 위에서 어느 시간대를 골랐든 그 앞뒤로 하루나 저녁의 대부분이 남습니다. 그 시간대에서 이어지는 예약들입니다 — 전망대 다음에 갈 곳을 정해 두면 저녁이 끊기지 않습니다."
          items={dayTripPrep}
        />

        {/* Q5 — vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>시부야 스카이 vs 스카이트리 vs 도쿄 타워 — 어느 전망대?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            스크램블 교차로 사진은 시부야 스카이가 가장 좋지만, 도쿄에서 가장 높지도 가장 싸지도 않습니다 — 2025년 4월
            개정 이후로는 15시 입장이 도쿄 타워 Top Deck 투어보다 비쌉니다. 압도적인 높이와 후지산 시야는
            스카이트리, 레트로 랜드마크는 도쿄 타워, 공짜 파노라마는 신주쿠의 도쿄도청입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["전망대", "높이", "특징", "성인 가격", "지역・가까운 역"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            높이는 개략값이며, 가격은 모두 각 운영사의 공식 가격을{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              저희 티켓 가격 표(영어)
            </Link>
            에서 가져왔고 항목마다 확인 날짜가 있습니다. 네 곳을 시간대별로 자세히 비교한 글은{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>
              도쿄 전망대 가이드(영어)
            </Link>
            입니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>옥상 규정</span>
          <h2 className={styles.sectionTitle}>시부야 스카이 옥상에는 무엇을 가지고 올라갈 수 있나요?</h2>
          <ul className={styles.bodyList}>
            <li><strong>옥상 반입 금지:</strong> 가방, 배낭, 우산, 셀카봉. 올라가기 전에 46층 사물함에 보관합니다.</li>
            <li><strong>반입 가능:</strong> 휴대폰과 주머니에 들어가는 카메라.</li>
            <li><strong>삼각대·일각대:</strong> 46층 실내에서만 사용할 수 있고, 혼잡할 때는 직원이 중단을 요청할 수 있습니다. 옥상과 다른 층에서는 금지입니다.</li>
            <li><strong>악천후:</strong> 날씨가 나빠지면 옥상은 예고 없이 닫힐 수 있고 실내 층은 계속 운영됩니다. 예약 전에 본인 티켓의 조건을 확인하세요.</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            운영사 티켓 FAQ의 검색 색인 기준, 2026년 11월 6일 확인. 규정은 바뀔 수 있으니 당일 실제 페이지에서 다시 확인하세요.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>예약 절차</span>
          <h2 className={styles.sectionTitle}>시부야 스카이 예약 방법</h2>
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

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            겨울 일몰 시간대를 노린다면 여행 전체 동선도 함께 정하세요.{" "}
            <Link href="/ko/guides/attractions/japan-winter-itinerary">일본 겨울 여행 일정</Link>에서 도쿄 일루미네이션, 시라카와고,
            홋카이도 눈축제를 넣은 12~14일 코스를 볼 수 있습니다.
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        {/* Klook tours in the same city */}
        <KlookTourPicks
          heading="같은 도시에서 떠나는 1일 투어"
          intro="시부야 스카이 관람은 저녁의 한 시간을 채우고, 하루의 나머지는 비어 있습니다. 아직 계획이 없는 도쿄의 하루가 있다면, 두 투어 모두 티켓과 같은 클룩 계정으로 예약할 수 있습니다."
          tours={tours}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-observation-decks", title: "도쿄 전망대(2026): 시부야 스카이 vs 스카이트리 vs 도쿄 타워(영어)" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "도쿄 3일 일정(2026): 무엇을, 어떤 순서로 예약할까(영어)" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "도쿄 타워 티켓(2026): 가격, 메인 덱 vs Top Deck, 예약 방법(영어)" },
            { href: "/ko/guides/attractions/tokyo-skytree-tickets", title: "도쿄 스카이트리 티켓(2026): 요금과 플로어 350·450 선택" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "도쿄 서브웨이 티켓(2026): 24・48・72시간, 살 만한가?(영어)" },
            { href: "/ko/guides/attractions/teamlab-planets-tickets", title: "팀랩 플래닛 예약 2026: 티켓 가격, 운영 시간, 가는 법" },
            { href: "/ko/guides/attractions/teamlab-borderless-tickets", title: "팀랩 보더리스 티켓(2026): 가격, 지정 시간 입장, 구매 경로" },
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 보더리스 비교 2026: 도쿄에서 어디로 갈까" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 전철, 지하철, IC 카드(영어)" },
            { href: "/guides/attractions", title: "일본에서 할 것 더 보기(영어) →" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드·씨 선택" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "도쿄 스모(2026): 대회 티켓 vs 아침 연습 견학(영어)" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>시부야의 일몰 시간대를 예약하세요</h2>
            <p className={styles.ctaBannerDesc}>
              온라인은 두 시간대 모두 창구보다 ¥300 저렴하고, 각 날짜는 2주 전 일본 시간 자정에 판매가 시작됩니다. 클룩은
              해외 카드로 결제되고 24시간 전까지 무료 취소라고 명시하고 있어, 도쿄 날씨가 바뀌어도 걱정이 덜합니다.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                시부야 스카이 티켓 보기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
