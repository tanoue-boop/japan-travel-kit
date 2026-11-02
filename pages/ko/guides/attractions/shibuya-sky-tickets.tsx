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

// Korean edition of /guides/attractions/shibuya-sky-tickets. Mirrors the English page as
// of 2026-11-01 block by block — same sections, tables, FAQ, Klook and GetYourGuide CTAs —
// with every figure taken from the English page or lib/attraction-prices.ts; nothing added.

const ROUTE = "/ko/guides/attractions/shibuya-sky-tickets";
const TITLE = "시부야 스카이 예약(2026): 티켓 가격과 예약 방법";
const DESC =
  "시부야 스카이 예약 2026: 공식 가격 온라인 성인 15시 전 ¥2,700, 15시 후 ¥3,400. 현장은 각 ¥300 비쌉니다.";

const LOCALE = "ko" as const;
const P = PRICES.shibuyaSky;
const CHECKED = dateLabel(P.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const AT_DOOR = priceLabel(P.atDoor, LOCALE);

// The same Klook listing as the English CTA, on Klook's Korean locale path.
const SHIBUYA_SKY_URL = klookFor(shibuyaSkyTicketUrl, LOCALE);
const GYG_SLUG = "ko-shibuya-sky-tickets";

/** What each ticket costs, by entry time and by where you buy it. */
const priceRows = [
  { ticket: "성인, 10:00~14:59 입장", online: "¥2,700", counter: "¥3,000" },
  { ticket: "성인, 15:00~21:20 입장", online: "¥3,400", counter: "¥3,700" },
  {
    ticket: "어린이, 만 6~12세(초등학생인 12세 포함)",
    online: "온라인 판매 없음",
    counter: "¥1,200",
  },
  { ticket: "미취학 아동(초등학교 입학 전)", online: "무료", counter: "무료" },
];

/** Hours, last admission and closures — the part that decides which band you pay. */
const hoursRows = [
  { what: "운영 시간", detail: "10:00~22:30" },
  { what: "마지막 입장", detail: "21:20" },
  { what: "저렴한 시간대", detail: "10:00~14:59 입장" },
  { what: "비싼 시간대", detail: "15:00~21:20 입장 — 일몰 회차는 모두 이 시간대에 들어갑니다" },
  {
    what: "휴무",
    detail: "1월 1일(설날). 그 밖의 날에도 임시 휴무나 단축 운영이 있을 수 있습니다",
  },
];

/** The booking window, the counter and the cancellation terms. */
const bookingRows = [
  {
    q: "판매는 언제 시작되나요?",
    a: "입장일 2주 전, 일본 시간 00:00입니다. 2025년 2월 27일 공지가 판매 시작 시점을 일부러 이 시각으로 옮겨, 언제 열리는지 예측할 수 있게 했습니다.",
  },
  {
    q: "취소할 수 있나요?",
    a: "같은 공지로 웹 티켓은 입장일까지 무료 취소가 도입됐습니다. 다만 본인 결제 화면에 표시되는 조건을 확인하세요. 예약 플랫폼은 자체 조건을 두며, 클룩 상품 페이지에는 24시간 전까지 무료 취소라고 적혀 있습니다.",
  },
  {
    q: "현장에서도 티켓을 살 수 있나요?",
    a: "네. 14층 창구에서 15시 전 입장은 ¥3,000, 15시부터는 ¥3,700에 판매합니다. 다만 창구에서는 회차를 미리 잡아 둘 수 없으므로, 계획이 아니라 대안으로 생각하세요.",
  },
  {
    q: "창구에서만 파는 것은?",
    a: "어린이 티켓입니다. 만 6~12세는 ¥1,200이고 온라인이 아니라 당일 14층 창구에서 판매합니다. 그래서 가족 여행이라면 온라인으로 성인 티켓을 사고, 아이 티켓은 도착해서 결제합니다.",
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
    desc: "그 상징적인 사진을 원하고 미리 계획할 수 있다면. 일몰은 몇 월에 가든 ¥3,400 시간대에 들어가므로, 따져야 할 것은 가격이 아니라 자리입니다 — 그리고 가장 먼저 사라지는 회차가 바로 이것입니다. 일몰 30~60분 전에 입장하면 낮, 골든아워, 도시에 불이 켜지는 순간을 한 번에 볼 수 있습니다.",
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
    desc: "네온 야경이 목적이거나 일몰 회차가 이미 없다면. 늦은 회차는 일몰과 같은 ¥3,400 시간대지만 보통 가장 늦게까지 남아 있고, 마지막 입장 21:20에 운영은 22:30까지입니다. 2주 전에 날짜가 열렸는데 일몰 시간대가 이미 매진됐을 때 좋은 대안입니다.",
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
    desc: "날짜는 정확히 2주 전 일본 시간 00:00에 판매가 시작됩니다. 한국과 일본은 시차가 없으니 한국 시간으로도 00:00입니다. 다른 무엇보다 먼저 그 시각을 캘린더에 넣어 두세요. 일몰 회차를 잡을 수 있느냐는 이것 하나로 정해집니다.",
  },
  {
    title: "예약 가능한 시간을 확인하기 전에 원하는 시간대와 요금을 정하세요",
    desc: "15시 전 입장은 ¥2,700, 15시부터는 ¥3,400입니다. 일몰과 야경은 모두 비싼 쪽 시간대에 있으니 저렴한 일몰은 없습니다. 낮 풍경, 일몰, 야경 중 원하는 전망을 먼저 정한 뒤 입장 시간을 선택하세요.",
  },
  {
    title: "창구보다 온라인으로 예약하세요",
    desc: "온라인은 두 시간대 모두 14층 창구보다 ¥300 저렴하고, 회차를 미리 확보하는 유일한 방법입니다. 예외는 어린이 티켓으로, 만 6~12세는 당일 창구에서 판매합니다.",
  },
  {
    title: "해외 발급 카드라면 예약 플랫폼을 이용하세요",
    desc: "2024년 7월부터 시부야 스카이 공식 사이트는 해외에서 발급된 카드를 상당수 거부하고 있습니다. 클룩은 해외 카드로 결제할 수 있고, 입장 24시간 전까지 무료 취소라고 명시하고 있습니다. 변덕스러운 도쿄 날씨에 대비하는 좋은 보험입니다.",
  },
  {
    title: "일몰 회차라면 30~60분 일찍 도착하세요",
    desc: "입구 통과, 사물함에 소지품 보관(루프톱은 야외라 바람이 강합니다), 빛이 바뀌기 전에 자리 잡기까지 시간이 필요합니다.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026년 시부야 스카이 티켓 가격은 얼마인가요?",
    a: `성인 웹 티켓은 10:00~14:59 입장이 ¥2,700, 15:00~21:20 입장이 ¥3,400입니다. 같은 티켓을 14층 창구에서 사면 ¥3,000과 ¥3,700이라, 온라인 예약이 어느 쪽이든 ¥300 저렴합니다. 만 6~12세 어린이는 창구에서만 ¥1,200에 판매하고, 미취학 아동은 무료입니다. 이 가격은 시부야 스크램블 스퀘어의 입장권 개정에 따라 2025년 4월 1일 입장분부터 적용되고 있으며, 확인일은 ${CHECKED}입니다.`,
  },
  {
    q: "시부야 스카이 운영 시간과 마지막 입장 시간은?",
    a: `${CHECKED}에 확인한 도쿄도 공식 관광 사이트 기준으로 10:00~22:30 운영, 마지막 입장 21:20입니다. 1월 1일은 휴무이고, 그 밖의 날에도 임시 휴무나 단축 운영이 있을 수 있습니다. 운영 시간은 일정뿐 아니라 가격도 좌우합니다. ¥2,700 시간대는 14:59에 끝나고, 15:00부터 마감 21:20까지는 모두 ¥3,400입니다.`,
  },
  {
    q: "시부야 스카이는 미리 예약해야 하나요?",
    a: "일몰이라면 네 — 사실상 그것이 전부입니다. 낮이나 늦은 회차는 보통 꼭 그렇지는 않지만, 예약하면 창구보다 1인당 ¥300 아끼고 원하는 시간이 사라질 위험도 없앨 수 있습니다. 14층 창구는 당일 판매를 하므로 예약 없이도 올라갈 수는 있습니다. 당일에 할 수 없는 것은 언제 올라갈지를 고르는 일입니다.",
  },
  {
    q: "시부야 스카이 티켓은 며칠 전부터 판매하나요?",
    a: `2주 전입니다. 각 날짜는 정확히 14일 전 일본 시간 00:00에 열리며, 운영사가 2025년 2월 27일 공지에서 예측할 수 있도록 일부러 정한 시각입니다. 인기 있는 날짜의 일몰이라면 그날 늦게가 아니라 열리는 그 순간에 예약하세요. 확인일 ${CHECKED}.`,
  },
  {
    q: "시부야 스카이에서 가장 먼저 매진되는 회차는?",
    a: "단연 일몰입니다. 낮, 골든아워, 야경을 한 번에 볼 수 있는 유일한 회차이고, 도쿄의 일몰은 12월 16:30 무렵부터 6월 19:00 이후까지 움직이므로 인기 회차도 달마다 바뀝니다. 낮 시간대가 가장 여유롭습니다. 늦은 저녁이 흔히 쓰는 대안입니다. 같은 ¥3,400 시간대에 경쟁은 훨씬 적고, 지평선 대신 불 켜진 도시를 봅니다.",
  },
  {
    q: "시부야 스카이 티켓을 취소하거나 변경할 수 있나요?",
    a: `현재 가격을 도입한 2025년 2월 27일 공지는 운영사에서 산 웹 티켓에 입장일까지 무료 취소도 함께 도입했습니다. 예약 플랫폼은 자체 조건을 둡니다 — 클룩 상품 페이지에는 회차 24시간 전까지 무료 취소라고 적혀 있습니다 — 그러니 본인 결제 화면의 조건을 확인하세요. 확인일 ${CHECKED}.`,
  },
  {
    q: "해외 발급 신용카드로 시부야 스카이 티켓을 살 수 있나요?",
    a: "시부야 스카이 공식 사이트에서는 안 되는 경우가 많습니다. 2024년 7월부터 해외 발급 카드를 상당수 거부하고 있기 때문입니다. 확실한 방법은 클룩 같은 예약 플랫폼입니다. 해외 카드로 결제할 수 있고 전자 티켓을 받으며, 회차 24시간 전까지 무료 취소라고 명시하고 있습니다.",
  },
  {
    q: "시부야 스카이는 얼마나 높고, 무엇이 보이나요?",
    a: "시부야 스카이는 시부야 위 약 229 m의 루프톱 전망대로, 야외 구역과 실내 구역이 있습니다. 위에서는 시부야 스크램블 교차로와 도쿄 스카이라인을 360도로 볼 수 있고, 맑은 날에는 후지산까지 보입니다. 핵심은 야외 루프톱이니 바람에 대비한 옷을 입고 출발 전에 날씨를 확인하세요.",
  },
  {
    q: "시부야 스카이와 스카이트리, 어디를 고를까요?",
    a: `시부야 스카이는 탁 트인 야외 전망과 사진 촬영이 매력입니다. 스크램블 교차로를 내려다보는 약 229 m 높이의 야외 루프톱으로 일몰에 가장 좋고, 15시 전 ¥2,700, 이후 ¥3,400입니다. 도쿄 스카이트리는 높은 전망대와 먼 곳까지 보이는 시야가 강점입니다. 350 m와 450 m 전망대, 유리 바닥 구간, 먼 곳까지 보이는 전망이 있고 플로어 350은 ${priceLabel(PRICES.tokyoSkytree.adult, LOCALE)}입니다. 교차로 사진과 분위기라면 시부야 스카이, 더 높은 곳에서 탁 트인 도쿄 전경을 보고 싶다면 스카이트리가 좋습니다.`,
  },
  {
    q: "도쿄에 무료 전망대가 있나요?",
    a: "있습니다. 신주쿠의 도쿄도청 건물에는 약 202 m 높이에 무료 전망대가 있습니다. 도쿄에서 돈 들이지 않고 볼 수 있는 가장 좋은 도시 전경이고, 일몰에 ¥3,400을 쓰고 싶지 않다면 합리적인 대안입니다. 운영 시간과 개방하는 전망실은 바뀔 수 있으니 가기 전에 확인하세요.",
  },
  {
    q: "시부야 스카이에서 후지산이 보이나요?",
    a: "맑은 날에는 보입니다. 다만 높이 덕분에 도쿄 스카이트리 쪽이 확률이 더 높습니다. 가시거리는 날씨에 달려 있고, 보통 서늘하고 건조한 달과 이른 시간에 가장 좋습니다. 후지산이 목적이라면 ¥2,700 낮 시간대를 고를 이유가 됩니다. 어느 날이든 보장은 없습니다.",
  },
];

// The English page's Klook blocks, item for item, on the Korean locale path.
const sameDayCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "신주쿠 야간 푸드 투어(오모이데요코초・가부키초・골든가이)",
    ctaLabel: "신주쿠 야간 투어 보기 →",
    why: "일몰 회차 뒤의 저녁입니다. 시부야에서 야마노테선으로 금방인 신주쿠에서 오모이데요코초・가부키초・골든가이를 걷는 3시간 조인 투어로, 골든가이 이자카야에서 한 잔으로 끝납니다.",
  },
  {
    label: "도쿄 시내 관광 버스 1일 투어",
    ctaLabel: "도쿄 1일 투어 보기 →",
    why: "회차가 저녁이라면 낮에는 도쿄의 다른 곳을 볼 수 있습니다. 고쿄 정원・아사쿠사・도쿄 스카이트리를 다국어 오디오 가이드와 함께 도는 가이드 1일 투어입니다.",
  },
  {
    label: "도쿄 서브웨이 티켓(24・48・72시간)",
    ctaLabel: "서브웨이 티켓 보기 →",
    why: "시부야역에는 한조몬선・긴자선・후쿠토신선이 지나므로 24・48・72시간 티켓으로 전망대 왕복을 해결할 수 있습니다. 야마노테선 같은 JR 노선은 포함되지 않습니다.",
  },
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "클룩 티켓은 휴대폰의 전자 티켓으로 받고, 회차는 시간이 정해져 있습니다. 공항에서부터 데이터가 있으면 당일 바우처・지도・날씨를 바로 확인할 수 있습니다.",
  },
  {
    label: "나리타・하네다 공항 ⇄ 도쿄 단독 차량 픽업・샌딩",
    ctaLabel: "공항 픽업・샌딩 보기 →",
    why: "역이 아니라 호텔 주소로 예약하고, 나리타・하네다 어느 공항이든 기사가 항공편을 확인합니다. 도착한 날 늦은 회차를 잡았다면 유용합니다.",
  },
];
const sameDayPrep: KlookTripPrepItem[] = shibuyaSkySameDayPrep.map((item, i) =>
  withKlookLocale(item, LOCALE, sameDayCopy[i]),
);

const dayTripCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "시부야 주변 호텔",
    ctaLabel: "클룩에서 시부야 호텔 보기 →",
    why: "일몰 회차는 해가 진 뒤, 야마노테선이 가장 붐빌 때 끝납니다. 시부야에 묵으면 귀갓길이 걸어서 몇 분이 되고, 아침 고속버스가 출발하는 역 바로 앞에 있게 됩니다.",
  },
  {
    label: "시부야 바 호핑 투어(3시간)",
    ctaLabel: "시부야 바 투어 보기 →",
    why: "일몰 회차 뒤 몇 시간을 쓰는 가장 자연스러운 방법이자, 루프톱에서는 보이지 않는 시부야의 한 면입니다. 가이드가 대신 주문해 주는 바 두 곳을 들릅니다.",
  },
  {
    label: "도쿄 나이트 바 호핑 투어(신주쿠・시부야)",
    ctaLabel: "나이트 투어 보기 →",
    why: "신주쿠까지 건너가는 버전으로, 야간 회차와 잘 맞습니다. 전망대는 늦은 시간이 가장 예약하기 쉽고, 그 뒤에도 저녁을 이어 갈 곳이 남습니다.",
  },
  {
    label: "시부야 푸드・컬처 반나절 워킹 투어",
    ctaLabel: "푸드 워킹 투어 보기 →",
    why: "낮 회차이거나 일행에 20세 미만이 있다면 모든 연령이 함께할 수 있는 낮의 선택지입니다. 바 투어가 아니라 시부야 109, 논베이요코초, 미야시타 파크를 도는 반나절 산책입니다.",
  },
  {
    label: "도쿄 서브웨이 티켓(24・48・72시간)",
    ctaLabel: "서브웨이 티켓 보기 →",
    why: "시부야역에는 한조몬선・긴자선・후쿠토신선이 지나므로 24・48・72시간 티켓으로 회차 전후의 이동을 해결할 수 있습니다. 해외 발급 컨택리스 카드로는 이 개찰구를 통과할 수 없습니다.",
  },
];
const dayTripPrep: KlookTripPrepItem[] = shibuyaSkyDayTripPrep.map((item, i) =>
  withKlookLocale(item, LOCALE, dayTripCopy[i]),
);

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

      <Breadcrumb trail={trail} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel} 업데이트</p>
          <h1 className={styles.heroTitle}>
            시부야 스카이 예약(2026):<br />티켓 가격, 운영 시간, 일몰 회차
          </h1>
          <p className={styles.heroSubtitle}>
            도쿄의 탁 트인 전망을 즐길 수 있는 루프톱 전망대 — 시부야 스크램블 교차로를 내려다보는 229 m 높이. 두 개의 가격대, 2주 전에 열리는 예약,
            그리고 정말로 매진되는 회차 하나.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 가격 확인", "일몰 회차 예약 시점", "스카이트리・도쿄 타워 비교"].map((t) => (
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
            <strong>시부야 스카이 티켓</strong>은 올라가는 시간에 따라 가격이 정해집니다. 성인 웹 티켓은
            10:00~14:59 입장이 <strong>¥2,700</strong>, 15:00~21:20 입장이 <strong>¥3,400</strong>이고, 같은 두
            티켓을 14층 창구에서 사면 ¥3,000과 ¥3,700입니다. 어느 시간대든 온라인 예약이 ¥300 저렴하며, 만
            6~12세 어린이는 창구에서만 ¥1,200에 판매합니다. 운영사 공식 사이트나 클룩 같은 예약 플랫폼에서
            살 수 있고, 일찍 사는 것이 중요합니다. 각 날짜는 <strong>정확히 2주 전 일본 시간 00:00</strong>에
            판매가 시작되고 매진되는 것은 일몰 회차이므로, 실제 마감은 여행 주간이 아니라 그 날짜가 열리는
            순간입니다. 운영 시간은 10:00~22:30, 마지막 입장은 21:20입니다. 모든 수치는 {CHECKED}에 확인했습니다
            — 가격은 시부야 스크램블 스퀘어가 2025년 2월 27일에 발표한 입장권 개정, 운영 시간은 도쿄도의 관광
            사이트 기준입니다.
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
                <p className={styles.verdictStatLabel}>판매 시작</p>
                <p className={styles.verdictStatValue}>2주 전 일본 시간 00:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>먼저 매진</p>
                <p className={styles.verdictStatValue}>일몰 회차</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 온라인으로 예약하고(두 시간대 모두 창구보다 ¥300 저렴), 일몰을 원한다면 2주
              전 날짜가 열리는 그 순간에 잡으세요. 카드가 해외 발급이라면 클룩으로 예약하세요. 해외 카드로
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

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>2026년 시부야 스카이 티켓 가격은 얼마인가요?</h2>
          <p className={styles.bodyText}>
            15시 전에 입장하는 성인은 ¥2,700, 15시부터는 ¥3,400 — 그리고 온라인 대신 창구에서 사면 각각 ¥300이
            더 붙습니다. 많은 가이드가 아직도 틀리는 부분이 바로 이 두 가격대 구조입니다. 시부야 스크램블
            스퀘어가 입장 시간별로 가격을 나눈 2025년 4월 1일 이후, 시부야 스카이의 단일 가격은 없습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓", "웹(사전 구매)", "14층 창구"].map((h) => (
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
            적용됩니다. 어린이 가격과 창구 전용 규정은 운영사 티켓 페이지 기준입니다. 결제 전에 다시 확인하세요
            — 이 수치는 저희가 확인한 다른 모든 명소와 함께{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              일본 명소 티켓 가격 표(영어)
            </Link>
            에 정리되어 있으며, 항목마다 확인 날짜가 붙어 있습니다.
          </p>
        </section>

        {/* Klook, directly under the price table */}
        <KlookTripPrep
          label="같은 날 예약할 것"
          heading="시부야 스카이 티켓과 함께 예약할 것"
          intro="시부야 스카이 회차는 하루 중 약 한 시간입니다. 같은 날에는 보통 이 다섯 가지도 필요합니다 — 전망대 다음의 저녁, 그 전의 낮, 그 사이의 이동, 휴대폰 데이터, 그리고 공항에서 시내까지."
          items={sameDayPrep}
        />

        {/* Q2 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>운영 시간</span>
          <h2 className={styles.sectionTitle}>시부야 스카이 운영 시간과 마지막 입장 시간은?</h2>
          <p className={styles.bodyText}>
            10:00~22:30, 마지막 입장은 21:20입니다. 운영 시간이 곧 가격이기도 합니다. ¥2,700 시간대의 마지막
            입장은 14:59이고, 15:00부터 마감까지는 모두 ¥3,400입니다. 그래서 &ldquo;몇 시에 갈까?&rdquo;는 빛의
            문제이기 전에 ¥700의 문제입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `시부야 스카이(${CHECKED} 확인)`].map((h) => (
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
            운영 시간, 마지막 입장, 1월 1일 휴무는 도쿄도가 gotokyo.org에 게재한 SHIBUYA SKY 정보 기준이며, 영어와
            일본어 페이지 내용이 같습니다. 확인일은 {CHECKED}입니다. 루프톱은 야외이므로 강풍, 낙뢰, 폭우가 있는
            날에는 당일에 닫힐 수 있고, 그때도 실내 층은 운영합니다.
          </p>
        </section>

        {/* Q3 — booking window, then the CTA stack */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>예약 시점</span>
          <h2 className={styles.sectionTitle}>시부야 스카이는 미리 예약해야 하나요?</h2>
          <p className={styles.bodyText}>
            일몰이라면 네 — 그리고 마감은 생각보다 이릅니다. 각 날짜는
            <strong> 정확히 2주 전 일본 시간 00:00</strong>에 판매가 시작되며, 한국과 일본은 시차가 없으니 한국
            시간으로도 같은 자정입니다. 인기 날짜에 사라지는 것은 일몰 회차이므로, 실전 규칙은 여행 주간이 아니라
            본인 날짜가 열리는 순간에 결제 화면 앞에 있는 것입니다. 낮이나 늦은 회차는 훨씬 여유가 있지만, 그래도
            온라인이 1인당 ¥300 저렴합니다.
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
            판매처를 두 곳 소개합니다. 한쪽에서 회차가 사라졌다고 다른 쪽에서도 사라졌다는 보장은 없고, 공식
            사이트는 2024년 7월부터 해외 발급 카드를 상당수 거부하고 있기 때문입니다.
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
          <span className={styles.sectionLabel}>추천 회차</span>
          <h2 className={styles.sectionTitle}>시부야 스카이는 어느 회차를 예약해야 할까?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            잡을 수 있다면 일몰, 가격이 우선이라면 15시 전, 일몰이 이미 없다면 늦은 저녁입니다. 도쿄의 일몰은
            12월 16:30 무렵부터 6월 19:00 이후까지 움직이므로 인기 회차는 1년 내내 같은 시간이 아닙니다 — 하지만
            언제나 ¥3,400 시간대 안에 있습니다.
          </p>
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
            전망대 관람에는 약 한 시간이 걸리므로, 회차는 보통 하루의 나머지 일정에 맞춰 고르게 됩니다.
            저희 가이드에서는{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={redLinkStyle}>
              도쿄 3일 일정(영어)
            </Link>{" "}
            안에 들어 있고,{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={redLinkStyle}>
              도쿄에서 할 일(영어)
            </Link>
            의 추천 목록에도 올라 있습니다.
          </p>
        </section>

        {/* Klook: the evening the slot sits inside */}
        <KlookTripPrep
          label="하루의 나머지"
          heading="시부야 스카이 가는 날, 또 무엇을 예약할까?"
          intro="전망대 자체는 한 시간 정도라, 위에서 어느 회차를 골랐든 그 앞뒤로 하루나 저녁의 대부분이 남습니다. 그 회차에서 이어지는 예약들입니다 — 같은 동네의 숙소, 전망대 다음에 갈 곳, 그 사이의 이동을 해결하는 패스."
          items={dayTripPrep}
        />

        {/* Q5 — vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>시부야 스카이 vs 스카이트리 vs 도쿄 타워 — 어느 전망대?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            교차로 사진에서는 시부야 스카이가 이기지만, 도쿄에서 가장 높지도 가장 싸지도 않습니다 — 2025년 4월
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
            에서 가져왔고 항목마다 확인 날짜가 있습니다. 네 곳을 회차별로 자세히 비교한 글은{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>
              도쿄 전망대 가이드(영어)
            </Link>
            입니다.
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

        <FaqList items={faqItems} />

        {/* Klook tours in the same city */}
        <KlookTourPicks
          heading="같은 도시에서 떠나는 1일 투어"
          intro="시부야 스카이 회차는 저녁의 한 시간을 채우고, 하루의 나머지는 비어 있습니다. 아직 계획이 없는 도쿄의 하루가 있다면, 두 투어 모두 티켓과 같은 클룩 계정으로 예약할 수 있습니다."
          tours={tours}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-observation-decks", title: "도쿄 전망대(2026): 시부야 스카이 vs 스카이트리 vs 도쿄 타워(영어)" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "도쿄 3일 일정(2026): 무엇을, 어떤 순서로 예약할까(영어)" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "도쿄 타워 티켓(2026): 가격, 메인 덱 vs Top Deck, 예약 방법(영어)" },
            { href: "/ko/guides/attractions/tokyo-skytree-tickets", title: "도쿄 스카이트리 티켓(2026): 요금과 플로어 350·450 선택" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "도쿄 서브웨이 티켓(2026): 24・48・72시간, 살 만한가?(영어)" },
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 예약(2026): 티켓 가격, 입장 시간, 보더리스와 비교" },
            { href: "/ko/guides/attractions/teamlab-borderless-tickets", title: "팀랩 보더리스 티켓(2026): 가격, 지정 시간 입장, 구매 경로" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 전철, 지하철, IC 카드(영어)" },
            { href: "/guides/attractions", title: "일본에서 할 것 더 보기(영어) →" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드·씨 선택" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "도쿄 스모(2026): 대회 티켓 vs 아침 연습 견학(영어)" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>시부야의 일몰을 잡으세요</h2>
            <p className={styles.ctaBannerDesc}>
              온라인은 두 시간대 모두 창구보다 ¥300 저렴하고, 각 날짜는 2주 전 일본 시간 자정에 열립니다. 클룩은
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
