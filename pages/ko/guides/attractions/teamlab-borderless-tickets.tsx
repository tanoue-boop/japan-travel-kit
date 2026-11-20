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
import KlookTripPrep from "../../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../../components/GygCompare";
import { koTeamlabBorderless } from "../../../../lib/klook-links-ko";
import {
  klookEsim,
  roppongiHotels,
  tokyoNightTourAkihabaraShibuya,
  tokyoSubwayTicket,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor } from "../../../../lib/klook-locale";
import { gygTeamlabBorderless } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (pages/guides/attractions/teamlab-borderless-tickets.tsx) section
// by section as of 2026-11-20 (task-jtk-20261120-R02). The adult and child figures come from
// lib/attraction-prices.ts. On 20 November 2026 the ticket segments and purchase notes were
// re-read off the __NEXT_DATA__ of teamlab.art/e/borderless-azabudai/, and the sale window,
// same-day sales, payment, ticket delivery, queueing and stay rules off teamlab.art/faq/Tokyo/
// — so prices, booking steps, the slot table and the FAQ carry that date. The hours /
// closed-day rows were not re-read and keep 13 Nov 2026.

const ROUTE = "/ko/guides/attractions/teamlab-borderless-tickets";
// Korean searchers type "팀랩 보더리스 예약" / "팀랩 보더리스 티켓", so both lead the title,
// the H1 and the description, followed by "시간 지정" for the timed-entry query (R02).
// "Planets or Borderless?" belongs to teamlab-tokyo-tickets.
const TITLE = "팀랩 보더리스 티켓 예약 2026: 시간 지정 입장·가격";
const H1 = "팀랩 보더리스 티켓 예약 2026: 시간 지정 입장 방법과 가격";
const DESC =
  "팀랩 보더리스 티켓 예약: 공식 사이트·클룩에서 시간 지정 입장권 구매. 성인 ¥3,400부터, 2개월 전 1일경 판매 시작.";

const BORDERLESS_URL = koTeamlabBorderless.url;
const GYG_SLUG = "ko-teamlab-borderless-tickets";

const P = PRICES.teamlabBorderless;
const CHECKED_ISO = "2026-11-20";
const CHECKED = dateLabel(CHECKED_ISO, "ko");
const HOURS_CHECKED_ISO = "2026-11-13";
const HOURS_CHECKED = dateLabel(HOURS_CHECKED_ISO, "ko");
const OFFICIAL_URL = "https://www.teamlab.art/e/tokyo/";
const FAQ_URL = "https://www.teamlab.art/faq/tokyo/";
// "from ¥3,400" -> "¥3,400부터": same figure, Korean qualifier. See lib/i18n.ts.
const ADULT = priceLabel(P.adult, "ko");
const CHILD = priceLabel(P.child, "ko");

const PLANETS = PRICES.teamlabPlanets;
const PLANETS_CHECKED = dateLabel(PLANETS.checked, "ko");

// The date the official ticket address was confirmed, and the date the GetYourGuide
// listing was confirmed live (GYG_CHECKED_AT in lib/gyg-links.ts, 21 Oct 2026).
const ADDRESS_CHECKED = dateLabel("2026-10-26", "ko");
const GYG_CHECKED = dateLabel("2026-10-21", "ko");

const priceRows = [
  {
    ticket: "성인(만 18세 이상)",
    price: ADULT,
    varies: "예 — 날짜와 입장 시간대에 따라",
    note: "¥3,400은 최저 요금이며, 실제 요금은 방문 날짜에 따라 달라집니다. 결제 전에 본인 날짜의 금액을 확인하세요",
  },
  { ticket: "만 13~17세", price: "¥2,800", varies: "아니요 — 고정", note: "연령 확인이 필요할 수 있으니 신분증을 지참하세요" },
  { ticket: "만 4~12세", price: CHILD, varies: "아니요 — 고정", note: "어느 날짜를 골라도 같습니다" },
  { ticket: "만 3세 이하", price: "무료", varies: "아니요 — 무료", note: "티켓이 필요하지 않습니다" },
  {
    ticket: "장애인 할인",
    price: "¥1,700부터",
    varies: "예 — 성인 티켓과 같은 달력",
    note: "동반 1명도 같은 할인 요금. 증빙 서류를 지참하세요",
  },
  {
    ticket: "Flexible Pass(입장 시간 지정 없음)",
    price: "¥12,000",
    varies: "성인・어린이 단일 요금으로 공지",
    note: "고른 날짜에 마지막 입장 시간까지 언제든 입장 가능",
  },
  {
    ticket: "현장 구매",
    price: "성인 +¥200",
    varies: "—",
    note: "남은 자리가 있을 때만. 공식 페이지는 현장 판매 요금을 따로 공지합니다",
  },
];

// The sale window and what happens after you buy — every row is teamLab's own wording,
// read off the official FAQ, except the worked example, which is that rule applied.
const saleRows = [
  {
    item: "판매 시작",
    detail: "입장일 2개월 전, 매월 1일경",
    source: "teamlab.art FAQ",
  },
  {
    item: "예시",
    detail: "2027년 1월 방문 → 2026년 11월 1일경 판매 시작, 2027년 2월 방문 → 2026년 12월 1일경",
    source: "FAQ 규칙을 적용한 예",
  },
  {
    item: "매진되나요?",
    detail: "네 — 팀랩은 매진될 수 있다며 일정이 정해지는 대로 바로 구매할 것을 권합니다",
    source: "teamlab.art FAQ",
  },
  {
    item: "당일 티켓",
    detail: "매진되지 않았다면 공식 티켓 사이트에서 구매 가능. 현장에서도 팔지만 요금이 다릅니다",
    source: "teamlab.art FAQ",
  },
  {
    item: "취소",
    detail: "원칙적으로 구매 후에는 취소할 수 없습니다",
    source: "teamlab.art FAQ",
  },
  {
    item: "날짜 변경",
    detail: "공식 티켓만 최대 3회, 예약한 입장 시간 2시간 전까지(Flexible Pass는 마지막 입장 2시간 전까지)",
    source: "teamlab.art FAQ",
  },
  {
    item: "클룩 등에서 산 경우",
    detail: "판매처 자체 조건이 적용됩니다 — 팀랩도 해당 조건을 확인하라고 안내합니다",
    source: "teamlab.art FAQ",
  },
];

const hoursRows = [
  {
    item: "권장 소요 시간",
    detail: "약 1.5~2시간 — 팀랩은 평균 약 1시간 30분, 그리고 \"약 2시간\"이라고 안내합니다. 시간 제한은 없고 재입장은 불가",
    source: `teamlab.art FAQ, ${CHECKED}`,
  },
  { item: "운영 시간", detail: "공지 08:30–21:00, 날짜에 따라 다름", source: `teamlab.art, ${HOURS_CHECKED}` },
  { item: "마지막 입장", detail: "폐관 1시간 전 — 21:00 폐관이면 20:00까지 입장", source: `teamlab.art, ${HOURS_CHECKED}` },
  {
    item: "단축・연장 운영일",
    detail: "2026년 12월 26~30일은 22:00 폐관, 2027년 1월 26일은 17:00 폐관",
    source: `teamlab.art, ${HOURS_CHECKED}`,
  },
  {
    item: "휴관일",
    detail: "2026년 11월 24일(화), 12월 8일(화), 2027년 1월 13일(수), 1월 19일(화)",
    source: `teamlab.art, ${HOURS_CHECKED}`,
  },
  {
    item: "Entrance Pass",
    detail: "날짜와 입장 시간을 모두 지정. 시간대가 곧 예약입니다",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Flexible Pass",
    detail: "고른 날짜에 유효하고 입장 시간 지정 없음, 추가 요금 있음",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "날짜 변경",
    detail: "팀랩에서 직접 산 티켓은 최대 3회",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "현장 구매",
    detail: "남은 자리가 있을 때만 미술관에서 판매, 성인 +¥200",
    source: `teamlab.art, ${CHECKED}`,
  },
];

const vsPlanetsRows = [
  {
    factor: "위치",
    borderless: "미나토구 아자부다이힐스 — 가미야초역에서 2분",
    planets: "도요스 — 신토요스역 1A 출구에서 도보 3분",
  },
  { factor: "성인 티켓", borderless: `${ADULT}, 날짜・시간대별`, planets: `${priceLabel(PLANETS.adult, "ko")}, 날짜・시간대별` },
  { factor: "만 4~12세", borderless: CHILD, planets: priceLabel(PLANETS.child, "ko") },
  {
    factor: "무엇을 하나",
    borderless: "지도 없는 미로 속 약 70점의 작품을 신발을 신은 채 걷기",
    planets: "맨발로, 성인 무릎 높이까지 오는 물속을 걷기",
  },
  {
    factor: "복장",
    borderless: "자유. 팀랩은 사진용으로 흰색이나 밝은 단색 옷을 추천",
    planets: "무릎 위까지 걷어 올릴 수 있는 바지 — 물이 무릎 깊이",
  },
  {
    factor: "입장",
    borderless: "날짜＋입장 시간, 또는 시간 지정 없는 Flexible Pass",
    planets: "날짜＋입장 시간만",
  },
  {
    factor: "현장 구매",
    borderless: "남은 자리가 있으면 판매, 성인 +¥200",
    planets: "현장 판매 전혀 없음 — 온라인 사전 구매뿐",
  },
  { factor: "권장 소요 시간", borderless: "약 1.5~2시간(공식 FAQ)", planets: "약 1.5~2시간" },
  {
    factor: "이런 사람에게",
    borderless: "미술, 사진, 성인, 도쿄 도심의 비 오는 오후",
    planets: "아이 동반, 첫 방문에서 가장 강렬한 체험을 원하는 사람",
  },
];

const buyingRows = [
  {
    factor: "요금",
    official: "기본 요금, 날짜와 시간대에 따라 변동",
    klook: "같은 티켓을 자국 통화로 표시",
    gyg: "옵션마다 다름. 상품 페이지에서 확인",
    door: "성인 +¥200. 그 밖의 현장 요금도 온라인과 다름",
  },
  {
    factor: "결제 화면 언어",
    official: "영어 사이트가 있습니다",
    klook: "한국어 화면, 전자 티켓 즉시 발급",
    gyg: "영어 상품 페이지",
    door: "현장 미술관 창구",
  },
  {
    factor: "해외 발급 카드",
    official: "보통 되지만 보장되지는 않습니다",
    klook: "해외 카드와 모바일 결제를 전제로 설계",
    gyg: "확인되지 않음 — 결제 시 확인",
    door: "현장 카드 결제 가능",
  },
  {
    factor: "날짜 변경",
    official: "최대 3회까지 날짜 변경 가능",
    klook: "고른 클룩 옵션에 따라 다릅니다 — 결제 전에 확인하세요",
    gyg: "확인되지 않음 — 옵션마다 다르니 결제 전에 읽으세요",
    door: "해당 없음",
  },
  {
    factor: "못 살 위험",
    official: "미리 예약하면 낮습니다",
    klook: "미리 예약하면 낮습니다",
    gyg: "다른 곳에서 원하는 시간대가 사라졌을 때 시도해 볼 두 번째 구매 경로",
    door: "더 높습니다 — 당일 남은 자리가 있을 때만 판매",
  },
];

const whoFor = [
  {
    title: "공식 사이트를 고른다면",
    desc: "가장 낮은 기본 요금으로 구매하고 날짜를 최대한 자유롭게 변경하고 싶은 경우입니다. 팀랩에서 직접 산 티켓은 최대 3회까지 날짜를 바꿀 수 있어, 도쿄 일정이 아직 움직이고 있다면 쓸 만합니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: "클룩을 고른다면",
    desc: "자국 통화로 결제할 수 있는 이해하기 쉬운 예약 화면을 원하고, 일본 외 발급 카드로 지불하며, 전자 티켓을 다른 예약과 같은 앱에 두고 싶은 경우입니다. 클룩은 팀랩의 공식 티켓 판매 파트너이므로 같은 입장권이고, 구매 경로만 다릅니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M14 6v12" strokeDasharray="2 2" />
        <path d="M6 10h4M6 14h4" />
      </svg>
    ),
  },
  {
    title: "현장 구매를 계획에 넣지 말아야 하는 경우",
    desc: "팀랩 보더리스에 갈 수 있는 날이 하루뿐인 경우입니다. 현장 티켓은 성인 기준 ¥200이 더 붙고 남은 자리가 있을 때만 팔며, 팀랩도 티켓이 매진될 수 있다고 안내합니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
];

// How to book, side by side for the two official sales sites (teamLab names only its own
// ticket site and Klook). Row one is the verdict. Mirrors bookingRows on the English page.
const bookingRows = [
  {
    step: "어디서 구매할까",
    official: "기본 요금과 최대 3회 날짜 변경 — 카드 결제가 된다면 이쪽",
    klook: "같은 입장권을 자국 통화로 결제하고 앱에서 관리할 수 있습니다. 옵션별 변경 조건이 적용됩니다",
  },
  {
    step: "1. 달력 열기",
    official: "teamlab.art/e/tokyo → 티켓 달력. 입장일 2개월 전 매월 1일경에 날짜가 열립니다",
    klook: "클룩의 팀랩 보더리스 상품 페이지를 엽니다(표 아래 버튼)",
  },
  {
    step: "2. 날짜와 티켓 고르기",
    official: "그날의 성인 요금을 확인하고 Entrance Pass(시간 지정) 또는 Flexible Pass(¥12,000, 시간 지정 없음)를 고릅니다",
    klook: "상품 페이지에 나오는 날짜와 티켓 옵션을 고릅니다",
  },
  {
    step: "3. 시간 고르고 결제",
    official: "입장 시간을 고르고 신용카드나 PayPay로 결제합니다",
    klook: "옵션이 요구하면 시간을 고르고, 변경・취소 조건을 읽은 뒤 결제합니다",
  },
  {
    step: "4. 입장",
    official: "확인 메일의 URL로 티켓을 열어 입구에서 보여 줍니다. 인쇄 버튼은 24시간 전에 나타납니다",
    klook: "예약 내역은 클룩 계정에서 확인할 수 있습니다. 바우처의 입장 안내를 따르세요",
  },
];

// Time slots, queues and selling out — only what teamLab itself says. Mirrors slotRows.
const slotRows = [
  {
    item: "결론",
    detail: "어느 날짜・회차든 매진될 수 있습니다 — 팀랩은 일정이 정해지는 대로 구매하라고 권합니다",
    source: "티켓 안내＋FAQ",
  },
  {
    item: "당일 구매",
    detail: "매진되지 않았다면 공식 티켓 사이트에서, 현장에서는 남은 자리가 있을 때만 다른 요금으로(성인 +¥200)",
    source: "FAQ＋티켓 안내",
  },
  {
    item: "회차 시간에 도착",
    detail: "티켓에 적힌 시간에 오세요. 시간 지정 티켓이라 대부분 줄 없이 들어가지만, 붐비는 시기에는 밖에서 기다릴 수 있습니다",
    source: "FAQ",
  },
  {
    item: "회차의 길이",
    detail: "입장 후 시간 제한이 없고 다음 회차가 시작돼도 나갈 필요가 없습니다. 재입장은 불가",
    source: "FAQ",
  },
  {
    item: "저녁",
    detail: "보통 21:00까지 운영, 마지막 입장 20:00(날짜에 따라 다름). 팀랩은 도쿄의 저녁 일정으로 고르는 경우가 많다고 안내합니다",
    source: "FAQ",
  },
  {
    item: "Flexible Pass",
    detail: "입장 시간 지정 없음: 마지막 입장 전까지 아무 때나 와서 입장 줄에 섭니다",
    source: "티켓 안내",
  },
  {
    item: "관내 혼잡",
    detail: "혼잡이나 점검으로 일부 작품을 체험하지 못할 수 있습니다",
    source: "티켓 안내",
  },
  {
    item: "공개되지 않은 것",
    detail: "가장 붐비는 시간대, 특정 회차가 며칠 전에 마감되는지",
    source: "—",
  },
];

// The Klook items to book alongside a Borderless slot, in Korean. Same four products, links
// and order as the English teamlabBorderlessTripPrep(); the `why` lines are written for this page.
const tripPrep: KlookTripPrepItem[] = [
  {
    label: "도쿄 나이트 투어: 우에노・아키하바라・시부야",
    ctaLabel: "클룩에서 도쿄 나이트 투어 보기 →",
    url: klookFor(tokyoNightTourAkihabaraShibuya.url, "ko"),
    why: "우에노에서 아키하바라를 거쳐 시부야 교차로까지 가는 가이드 동행 저녁 투어입니다. 팀랩 보더리스 입장 시간이 낮이라면 같은 날 저녁 일정으로 넣을 수 있습니다. 티켓처럼 날짜별로 판매됩니다.",
  },
  {
    label: "도쿄 서브웨이 티켓(24・48・72시간)",
    ctaLabel: "클룩에서 서브웨이 티켓 보기 →",
    url: klookFor(tokyoSubwayTicket.url, "ko"),
    why: "가까운 두 역, 히비야선 가미야초역과 난보쿠선 롯폰기잇초메역이 모두 도쿄메트로라서 24・48・72시간권 하나로 왕복 이동은 물론 그날의 다른 지하철 이동에도 이용할 수 있습니다.",
  },
  {
    label: "일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    url: klookFor(klookEsim.url, "ko"),
    why: "공식 티켓은 확인 메일의 링크를 열어 입구에서 화면을 보여 주는 방식이고, 날짜 변경도 입장 시간 2시간 전까지 온라인으로 해야 합니다. 호텔 와이파이만이 아니라 밖에서도 데이터가 필요합니다.",
  },
  {
    label: "롯폰기역 주변 호텔",
    ctaLabel: "클룩에서 롯폰기 호텔 보기 →",
    url: klookFor(roppongiHotels.url, "ko"),
    why: "롯폰기잇초메역은 미술관과 지하로 이어져 있어, 이 일대에 묵으면 08:30 첫 회차나 20:00 마지막 입장도 도쿄 시내를 가로질러 이동할 필요 없이 걸어서 갈 수 있는 거리입니다.",
  },
];

// The five questions mirror the English page (Search Console queries, 28 days to 18 Nov
// 2026). Time needed and children are answered in the body.
const faqItems: FaqItem[] = [
  {
    q: "팀랩 보더리스 시간 지정 티켓은 어떻게 예약하나요?",
    a: `공식 티켓 달력(teamlab.art/e/tokyo)이나, 팀랩이 또 하나의 공식 판매처로 안내하는 클룩에서 날짜를 고르고 그날의 성인 요금을 확인한 다음, Entrance Pass라면 입장 시간을 고르세요. 입장 시간 지정이 없는 Flexible Pass(¥12,000)도 있습니다. 결제는 카드로 하고(공식 사이트는 PayPay도 가능), 티켓은 확인 메일의 링크로 받아 입구에서 휴대폰으로 보여 주면 됩니다. 요금과 규정은 ${CHECKED} 공식 사이트 기준입니다.`,
  },
  {
    q: "팀랩 보더리스 티켓은 언제부터 예매할 수 있나요?",
    a: `입장일 2개월 전, 매월 1일경에 판매가 시작됩니다. 2027년 1월 방문이라면 2026년 11월 1일경입니다. ${CHECKED}에 확인한 팀랩 FAQ는 티켓이 매진될 수 있으니 일정이 정해지는 대로 구매하라고 권합니다. 당일 티켓은 남아 있을 때만 온라인이나 현장에서 살 수 있습니다.`,
  },
  {
    q: "팀랩 보더리스 티켓은 온라인으로 얼마인가요?",
    a: `${CHECKED}에 확인한 공식 티켓 사이트 기준으로 성인(만 18세 이상) ¥3,400부터, 만 13~17세 ¥2,800, 만 4~12세 ¥1,500, 만 3세 이하 무료, 장애인 ¥1,700부터(동반 1명 같은 요금)입니다. 성인과 장애인 요금은 날짜와 시간대에 따라 바뀌므로 ¥3,400은 최저 금액입니다. Flexible Pass는 ¥12,000이고, 현장에서 사면 성인은 ¥200이 더 붙습니다.`,
  },
  {
    q: "팀랩 보더리스 티켓을 당일에도 살 수 있나요?",
    a: `남아 있다면 살 수 있습니다. ${CHECKED}에 확인한 팀랩 FAQ에 따르면 당일 티켓은 매진되지 않았을 때 공식 티켓 사이트에서 팔고, 현장에서도 남은 자리가 있을 때 다른 요금(성인 ¥200 추가)으로 팝니다. 티켓은 매진될 수 있으므로 당일 구매는 계획이 아니라 대안입니다.`,
  },
  {
    q: "팀랩 보더리스는 클룩과 공식 사이트 중 어디서 사는 게 좋나요?",
    a: `어디서 사든 같은 입장권입니다. 팀랩은 자체 티켓 사이트와 클룩을 공식 판매처로 안내합니다(${CHECKED}). 기본 요금으로 구매하고 날짜를 최대 3회(입장 시간 2시간 전까지) 변경하려면 공식 사이트, 자국 통화 결제와 다른 예약과 같은 앱 관리를 원하면 클룩입니다. 클룩에서 사면 해당 옵션의 변경・취소 조건이 대신 적용됩니다.`,
  },
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "팀랩 보더리스 티켓" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoTeamLabBorderlessPage({ updated }: { updated: PageUpdated }) {
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

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel} 업데이트</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            아자부다이힐스의 팀랩 보더리스(teamLab Borderless) 티켓이 얼마인지, 매달 티켓이 언제 풀리는지,
            지정 시간 입장권은 어떻게 이용하는지, 그리고 공식 사이트와 클룩 중 어디에서 구매할지 알아봅니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 요금", "지정 시간 입장 설명"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <p className={styles.bodyText}>
          <strong>팀랩 보더리스 티켓</strong>은 공식 티켓 사이트(teamlab.art)와 클룩, 두 곳의 공식 판매처에서 날짜와{" "}
          <strong>입장 시간(시간 지정 입장)</strong>을 골라 예약합니다. 판매는{" "}
          <strong>입장일 2개월 전, 매월 1일경</strong>에 시작되므로 2027년 1월 방문이라면 2026년 11월 1일경에
          열립니다. 성인은 <strong>¥3,400부터</strong>(공식 사이트, {CHECKED} 확인), 만 13~17세 ¥2,800, 만 4~12세
          ¥1,500이고 만 4세 미만은 무료이며, 성인 요금은 날짜와 회차에 따라 달라집니다. 당일 티켓은 잔여분이 있을 때만
          온라인에서 구매할 수 있으며, 현장 구매 시 성인 요금에 ¥200이 추가됩니다. 입장 후에는 시간 제한이 없어, 예약한
          시간대는 입장 시간만 정할 뿐 관람 시간을 제한하지 않습니다.
        </p>
        <p className={styles.bodyText}>
          모든 수치는 {CHECKED}에 팀랩 공식 사이트와 FAQ에서 확인했습니다. 어느 미술관으로 갈지 아직
          고민 중이라면{" "}
          <Link href="/ko/guides/attractions/teamlab-tokyo-tickets">팀랩 플래닛 vs 보더리스 비교</Link>를
          먼저 보세요. 이 페이지는 팀랩 보더리스 예약 자체를 다룹니다.
        </p>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>성인 티켓</p>
                <p className={styles.verdictStatValue}>¥3,400부터</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>입장 방식</p>
                <p className={styles.verdictStatValue}>날짜＋시간대 지정</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>권장 소요</p>
                <p className={styles.verdictStatValue}>약 1.5~2시간</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>판매 시작</p>
                <p className={styles.verdictStatValue}>2개월 전 매월 1일경</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 성인 입장료는 ¥3,400부터이고 변동 요금제라 최종 금액은 고른 날짜와
              시간대가 결정합니다. 티켓은 날짜와 시간을 지정하며, 취소가 안 되고 매진될 수도 있습니다. 현장
              구매는 성인 ¥200이 더 붙고 남은 자리가 있어야 합니다. 운영 시간은 대략 08:30–21:00이고 마지막
              입장은 폐관 1시간 전입니다. 1.5~2시간을 비워 두고, 가미야초역(히비야선, 도보 2분)이나 롯폰기잇초메역(난보쿠선, 도보
              6분)으로 가세요. 두 역 모두 아자부다이힐스와 지하 통로로 연결되어 있습니다. 기본 요금으로 구매하고 날짜를 최대 3회 무료로
              변경하려면 공식 사이트, 해외 카드로 자국 통화 결제를 할 수 있는 이해하기 쉬운 예약 화면을 원하면 클룩입니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                팀랩 보더리스 티켓 예약하기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              이 페이지의 가격과 예약 규정은 {CHECKED}, 운영 시간과 휴관일은 {HOURS_CHECKED}에 팀랩 공식 사이트에서
              확인했습니다. 팀랩 보더리스는 변동 요금제이고 달력도 바뀌므로, 결제 시점에 본인 날짜로 두 가지를 모두 확인하세요.
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>예약 절차</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 시간 지정 티켓은 어떻게 예약하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            날짜를 먼저 고르고, 그 날짜의 성인 요금을 확인하고, Entrance Pass의 입장 시간을 고른(또는 시간 지정이
            없는 ¥12,000 Flexible Pass를 고른) 다음 결제합니다. 구매처는 공식 사이트, 또는 팀랩이 또 하나의 공식
            판매처로 안내하는 클룩입니다. 어느 쪽이든 네 단계이고, 결제 금액은 날짜와 입장 시간대에 따라서만 달라집니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "공식 사이트(teamlab.art)", "클룩"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.step}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.step}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.official}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.klook}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            최종 확인: {CHECKED_ISO} —{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">teamlab.art/e/tokyo</a>(티켓 종류,
            결제, 공식 판매처)와{" "}
            <a href={FAQ_URL} target="_blank" rel="noopener noreferrer">teamlab.art/faq/tokyo</a>(판매 시작,
            티켓 수령, 인쇄). 팀랩은 회차의 길이를 공개하지 않습니다. 정해진 시간에 입장해 원하는 만큼 머물 수 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              클룩에서 팀랩 보더리스 시간 지정 티켓 예약 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="같은 날 예약할 것"
          heading="팀랩 보더리스 가는 날, 그 밖에 무엇을 예약할까?"
          headingLevel={3}
          intro="시간 지정 티켓을 예약하면 정해진 시간에 미술관에 도착해야 합니다. 아래는 티켓과 같은 클룩 계정으로 예약할 수 있습니다. 낮 회차 뒤의 저녁 투어, 아자부다이힐스의 두 역(가미야초・롯폰기잇초메)을 모두 이용할 수 있는 지하철 패스, 전자 티켓을 확인하는 데 필요한 모바일 데이터, 그리고 롯폰기 주변 숙소입니다."
          items={tripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 티켓은 온라인으로 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            온라인에서 성인은 <strong>¥3,400부터</strong>, 만 13~17세는 ¥2,800, 만 4~12세는 ¥1,500이고 만 4세
            미만은 무료이며, Flexible Pass는 ¥12,000입니다. 날짜에 따라 달라지는 요금은 성인과 장애인 요금뿐입니다. 팀랩 보더리스는 이 두 가지 요금을 날짜와 입장
            시간대에 따라 책정하기 때문에 공식 금액에 &ldquo;부터&rdquo;가 붙고, 여행 중 가장 저렴한 티켓을 찾으려면
            판매처보다 방문 날짜를 비교해야 합니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓 종류", "가격(부터)", "날짜에 따라 변동?", "비고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.varies}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            최종 확인: {CHECKED_ISO} —{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">teamlab.art/e/tokyo</a>. 현장 구매는
            성인 ¥200이 더 붙습니다. 할인 티켓은 증빙이 필요하니 신분증을 지참하세요.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.2rem", marginTop: "2rem" }}>
            만 4세 미만 아이도 티켓이 필요한가요?
          </h3>
          <p className={styles.bodyText}>
            아니요. 만 3세 이하는 무료이고 최소 연령 제한도 없지만, 초등학생 이하 어린이는 반드시 만 18세 이상
            보호자와 함께해야 합니다. 보호자 1명당 어린이 5명까지(무료인 만 3세 이하 포함)이며, 유모차는 안으로
            가지고 들어갈 수 없어 짐 보관 공간에 맡깁니다(공식 FAQ, {CHECKED}).
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>성인 요금의 변동 폭은 공개되지 않습니다.</strong> 팀랩이 내놓는 것은 가격표가
            아니라 시작 금액과 달력이므로, 정직한 가이드라면 팀랩 보더리스의 토요일 저녁이 얼마인지 말할 수
            없습니다. 그 가격 범위를 제시하는 페이지가 있다면 근거 없이 지어낸 수치입니다. ¥3,400을 최저 요금으로 보고, 여행에
            넣을 수 있는 모든 날짜로 공식 달력을 열어 금액을 비교한 뒤 결제하세요. 가격을 낮추려면 더 저렴한
            판매처를 찾기보다 방문 날짜를 하루 옮겨 보세요. 가격을 정하는 것은 날짜와
            시간대이기 때문입니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>예약 전에</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 관람 시간은 얼마나 걸리나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            약 1.5~2시간입니다. 팀랩이 안내하는 평균 관람 시간은 약 1시간 30분이고, 시간 제한이 없어 다음
            회차가 시작돼도 나갈 필요가 없습니다. 다만 재입장은 안 됩니다. 관람 시간보다 휴관일과 운영 시간 변경에 더
            주의해야 합니다. 비정기 휴관일이 있고 일찍 또는 늦게 닫는 날도 있으니, 회차를 고르기 전에 아래 표를
            확인하세요.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "공식 사이트 내용", "출처와 확인일"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            최종 확인: {HOURS_CHECKED_ISO}(운영 시간, 휴관일)와 {CHECKED_ISO}(패스, 소요 시간) —{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">teamlab.art/e/tokyo</a>,{" "}
            <a href={FAQ_URL} target="_blank" rel="noopener noreferrer">teamlab.art/faq/tokyo</a>.
            운영 시간과 휴관일은 달마다 바뀌므로, 회차를 예약하기 전에 본인 날짜로 공식 달력을 열어 보세요.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>무엇을 사는가</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스는 정확히 무엇인가</h2>
          <p className={styles.bodyText}>
            팀랩 보더리스는 지도가 없는 미술관입니다. 약 70점의 작품이 서로 연결된 여러 전시 공간에 펼쳐져 있고,
            작품 자체가 움직입니다. 한 공간에서 다른 공간으로 옮겨 가고, 방 안의 사람에게 반응하며, 하루
            동안 변합니다. 정해진 관람 동선도, 번호가 매겨진 관람 지점도 없어서 같은 티켓을 산 두 사람의 관람이 실제로
            다를 수 있습니다.
          </p>
          <p className={styles.bodyText}>
            이런 전시 방식 때문에 관람 시간을 미리 계획해 둘 가치가 있습니다. 한 시간을 서두르면 유명한 전시실만
            보고 끝나고, 1.5~2시간은 되어야 돌아다니고 되돌아가며 기다려야 나타나는 작품까지 찾을 수 있습니다.
            그래서 팀랩 보더리스는 도쿄의 두 팀랩 미술관 중 성인 관람객과 사진 촬영에 더 잘 맞는 곳입니다. 도요스에서
            맨발로 물속을 걷는 팀랩 플래닛과, 그쪽을 고를 이유는{" "}
            <Link href="/ko/guides/attractions/teamlab-planets-tickets">팀랩 플래닛 티켓 가이드</Link>
            를 보세요.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>판단</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스는 갈 만한가요?</h2>
          <p className={styles.bodyText}>
            미술, 사진, 혹은 다른 어디에서도 볼 수 없는 공간을 좋아한다면 그렇습니다. 다만 1인 ¥3,400부터인
            1.5~2시간짜리 명소라, 요금은 반나절 일정만큼 들지만 실제 관람 시간은 여유 있는 점심 식사 정도입니다.
            결론 대신 판단에 필요한 숫자를 먼저 보여 드리겠습니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>시간당 비용은 높습니다.</strong> 1.5~2시간에 ¥3,400은 ¥1,500인 도쿄타워 메인 데크의 두 배가 넘고 <Link href="/ko/guides/attractions/shibuya-sky-tickets">시부야 스카이 티켓</Link>의 낮 시간 웹 예매 {PRICES.shibuyaSky.adult.split(" / ")[0]}보다도 비쌉니다. 두 곳 모두 오래 머물 수 있는 곳입니다. 금액 비교는 <Link href="/guides/attractions/japan-attraction-ticket-prices">일본 관광지 티켓 가격표(영어)</Link>에서 볼 수 있습니다. 관람 시간이 아니라 다른 곳에서 볼 수 없는 경험에 비용을 내는 셈입니다.</li>
            <li><strong>지도 없는 설계는 가치이자 위험입니다.</strong> 경로도 번호도 없는 약 70점의 작품이란, 서두른 한 시간으로는 유명한 전시실만 보고 끝난다는 뜻입니다. 한 시간밖에 없다면 좋은 경험을 짧게 즐기는 것이 아니라 티켓값이 아까운 관람이 됩니다.</li>
            <li><strong>두 곳 중 몸을 덜 쓰는 곳입니다.</strong> 신발을 신은 채이고, 물을 건널 일도 갈아입을 옷을 챙길 일도 없습니다. 플래닛의 맨발 체험이 부담스럽게 느껴진다면, 보더리스에서는 그런 부담 없이 팀랩 작품을 즐길 수 있습니다.</li>
            <li><strong>날씨에 강하고 도심에 있습니다.</strong> 아자부다이힐스는 가미야초역에서 지하로 2분이라, 비 오는 오후에도 비를 맞으며 이동할 일이 없습니다. 도쿄의 비 오는 날 계획 대부분은 그렇지 못합니다.</li>
            <li><strong>예약을 놓쳐도 대안이 있습니다.</strong> 플래닛과 달리 팀랩 보더리스는 남은 자리가 있으면 현장에서도 팔기 때문에, 예약을 놓쳐도 ¥200 추가 요금을 내고 원하지 않는 시간대를 고를 수는 있어도 오후 일정 전체를 포기할 필요는 없습니다.</li>
          </ul>
          <p className={styles.bodyText}>
            도쿄 일정이 이미 빠듯하거나, 한 시간밖에 낼 수 없거나, 어린아이와 함께라서 팀랩을 한 곳만 갈 수
            있다면 건너뛰세요. 아이와 함께라면 플래닛이 더 쉽습니다. 이 티켓이 실망스러운 이유는 이 세
            가지이고, 어느 것도 작품 때문이 아닙니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>잔여석</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 티켓은 언제부터 예매할 수 있나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            입장일 2개월 전, 매월 1일경에 판매가 시작됩니다. 2027년 1월 날짜라면 2026년 11월 1일경에 열립니다.
            팀랩은 티켓이 매진될 수 있으니 일정이 정해지는 대로 구매하라고 안내하며, 공식 티켓은 취소가 안 되고
            다른 날짜로 변경만 할 수 있습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "팀랩 공식 안내", "출처"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {saleRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            최종 확인: {CHECKED_ISO} —{" "}
            <a href={FAQ_URL} target="_blank" rel="noopener noreferrer">teamlab.art/faq/tokyo</a>. 특정 회차가
            며칠 전에 마감되는지는 팀랩이 공개하지 않으므로 여기서도 적지 않았습니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>방문만이 아니라 구매 날짜도 계획하세요:</strong> 아직 일정을 고민하는 사이에 여행하는 달의 티켓 판매가 시작된다면, 그 판매 시작일을 달력에 적어 두세요.</li>
            <li><strong>당일 구매는 대안일 뿐입니다:</strong> 남아 있을 때만 온라인이나 현장에서 살 수 있고, 현장 성인 요금은 ¥200 더 비쌉니다.</li>
            <li><strong>날짜가 바뀌면 다시 사지 말고 변경하세요:</strong> 공식 티켓은 예약한 입장 시간 2시간 전까지 최대 3회 변경할 수 있습니다. 새 날짜가 더 비싸면 새 요금을 내고 기존 요금은 환불됩니다.</li>
            <li><strong>판매 플랫폼 조건은 따로입니다:</strong> 클룩과 GetYourGuide의 변경・취소 기한은 옵션마다 정해지므로, 팀랩의 3회 변경이 그대로 적용된다고 가정하지 말고 결제 전에 예약 페이지에서 조건을 읽으세요.</li>
          </ul>
          <p className={styles.bodyText}>
            그러니 실제 순서는 날짜를 고르고, 그 날짜의 가격을 읽고, 그다음 판매처를 고르는 것입니다. 내는
            금액을 바꾸는 것은 앞의 두 가지뿐입니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              팀랩 보더리스 날짜와 시간대 보기 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            클룩은 팀랩의 공식 티켓 판매 파트너이고, GetYourGuide는 원하던 시간대가 사라졌을 때 한 번 더
            찾아볼 곳입니다. 이 페이지에는 둘 다 가격을 적지 않았습니다. 둘 다 날짜별로 가격이 매겨지므로,
            이 페이지의 금액을 포함해 대표 금액을 믿지 말고 달력을 여세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>회차</span>
          <h2 className={styles.sectionTitle}>당일에도 팀랩 보더리스 티켓을 살 수 있나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            남아 있다면 살 수 있습니다. 당일 티켓은 매진되지 않은 회차에 한해 공식 티켓 사이트에서 팔고, 현장에서도
            남은 자리가 있을 때 다른 요금(성인 +¥200)으로 팝니다. 팀랩은 어느 시간대가 먼저 매진되는지는 밝히지 않고
            어느 날짜・회차든 매진될 수 있다고만 안내하므로, 아래 표가 회차・대기・혼잡에 대해 팀랩이 밝힌 전부입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "팀랩 공식 안내", "출처"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slotRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            최종 확인: {CHECKED_ISO} —{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">teamlab.art/e/tokyo</a>(티켓 안내)와{" "}
            <a href={FAQ_URL} target="_blank" rel="noopener noreferrer">teamlab.art/faq/tokyo</a>. 원하는 회차가 한
            공식 판매처에서 사라졌다면, 현장에 기대기 전에 다른 공식 판매처도 확인하세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>어디서 사는가</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스는 클룩과 공식 사이트 중 어디가 더 좋나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            어느 쪽도 원래 더 싸지 않습니다. 같은 입장권이고 같은 날짜・회차 달력으로 가격이 정해집니다. 유연성(최대
            3회 날짜 변경)은 공식 사이트, 결제 편의(자국 통화, 해외 카드, 앱 하나로 관리)는 클룩이 낫습니다. 클룩은 팀랩의 공식 티켓 판매 파트너이므로 어느 구매 경로를 거쳐도 입장권은 같습니다. 차이가 나는 것은
            결제 절차, 날짜 변경 조건, 당일까지 미뤘을 때의 가격입니다. GetYourGuide에서도 팀랩 보더리스를 팔지만 아래
            열은 일부러 비워 두었습니다. 무엇이 확인되었고 무엇이 확인되지 않았는지는 표 아래 주석을 보세요.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "공식 사이트", "클룩", "GetYourGuide", "당일 현장"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.official}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.klook}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.gyg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            현장 추가 요금과 날짜 변경 횟수는 팀랩 공식 사이트 {CHECKED} 공지 기준입니다. 판매 플랫폼의 취소・변경
            조건은 옵션마다 다르므로 결제 전에 예약 페이지에서 확인하세요. GetYourGuide 열은 일부러 짧게
            두었습니다. 팀랩 보더리스 상품 페이지가 있다는 것은 {GYG_CHECKED}에 확인했지만, 가격, 카드 처리,
            변경 조건은 여기서 확인된 내용이 아니니 상품 페이지에서 확인하세요. 해당 칸에는 추측 대신
            그렇게 적었습니다.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>어디가 맞는가</span>
          <h2 className={styles.sectionTitle}>어떻게 살까?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <p className={styles.bodyText}>
          시간대를 잡을 준비가 되었다면{" "}
          <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL}>
            클룩에서 팀랩 보더리스 잔여석과 가격 보기 →
          </KlookLink>
        </p>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>공식 구매</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 공식 티켓 사이트는 어디인가요?</h2>
          <p className={styles.bodyText}>
            미술관 자체 페이지는 <strong>teamlab.art/e/tokyo</strong>입니다(영어판, 일본어판은
            teamlab.art/jp/e/tokyo). 티켓 달력과 결제도 여기서 열립니다. 예전 링크를 저장해 두었다면,{" "}
            <strong>borderless.teamlab.art</strong>는 더 이상 별도 스토어가 아닙니다. 영어와 일본어 주소 모두
            위의 teamlab.art 페이지로 연결되며, {ADDRESS_CHECKED}에 확인했습니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>여기서 공식 사이트가 중요한 이유:</strong> 기본 요금은 팀랩 자체 달력에 있고, 3회 무료 날짜 변경은 직접 산 티켓에만 있습니다. 판매 플랫폼은 같은 입장권을 자체 조건으로 팝니다.</li>
            <li><strong>그 밖의 정식 경로:</strong> 클룩은 팀랩의 공식 티켓 판매 파트너이므로, 클룩 티켓은 다른 구매 경로에서 산 같은 입장권입니다. 비공식 경로도 아니고 정가에 웃돈을 붙여 파는 것도 아닙니다.</li>
            <li><strong>직접 사도 얻지 못하는 것:</strong> 할인입니다. 성인 금액은 날짜와 시간대가 정하고, 그 달력은 모든 공식 판매처 뒤에 있는 같은 달력입니다.</li>
            <li><strong>직접 구매할 때 생길 수 있는 문제:</strong> 카드 결제 거절입니다. 일본식 결제 화면은 방문객이 판매 플랫폼으로 가는 흔한 이유이고, 해외 카드로 결제할 수 있는 판매처를 쓰는 것은 실수가 아니라 합리적인 해결책입니다.</li>
          </ul>
          <p className={styles.bodyText}>
            정리하면, 카드가 통하고 날짜 유연성을 원하면 직접 사고, 자국 언어와 통화로 결제하고 전자 티켓을
            다른 예약과 함께 두고 싶다면 클룩에서 사세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>나란히 비교</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 vs 플래닛: 어느 쪽을 예약할까?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>작품을 보고 싶다면 팀랩 보더리스, 작품 속을 걷고 싶거나 아이와 함께라면 플래닛입니다.</strong>{" "}
            도쿄에는 팀랩 미술관이 두 곳 있고, 두 미술관을 혼동해 다른 곳을 예약하는 경우가 많습니다. 도시의 다른 구역에
            있는 별개의 미술관이고 티켓도 따로이며, 결정을 내려 주는 숫자는 아래와 같습니다. 맨발 규칙, 사물함,
            어린이 관련 규정 등 플래닛 쪽의 전체 내용은{" "}
            <Link href="/ko/guides/attractions/teamlab-planets-tickets">팀랩 플래닛 티켓 가이드</Link>를 보세요.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "팀랩 보더리스", "팀랩 플래닛"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsPlanetsRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            팀랩 보더리스 수치는 팀랩 공식 사이트에서 {CHECKED}에, 플래닛 수치는 플래닛 공식 티켓 스토어에서{" "}
            {PLANETS_CHECKED}에 읽었습니다. 두 미술관 모두 성인 요금을 날짜와 시간대별로 매기고 달력도 바뀌므로
            본인 날짜로 확인하세요. 팀랩 보더리스의 권장 소요 시간은 공식 FAQ 기준이고, 플래닛 쪽은 이
            가이드의 계획용 기준입니다.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            두 곳 모두 갈 시간이 있다면 다른 날로 나누세요. 오후 한나절에 디지털 아트를 네 시간 보면 어느
            것도 눈에 들어오지 않게 되고, 두 곳은 도시 반대편에 30분 거리로 떨어져 있습니다. 한 곳만 고른다면
            어울리는 동행, 입장 방식, 운영 기간을 나란히 정리한{" "}
            <Link href="/ko/guides/attractions/teamlab-tokyo-tickets">팀랩 플래닛 보더리스 비교</Link>를 보세요.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>교통</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 위치</h2>
          <p className={styles.bodyText}>
            미술관은 미나토구 도라노몬 5초메 일대의 아자부다이힐스 Garden Plaza B 지하 1층에 있습니다. 예전
            오다이바의 팀랩 보더리스가 아닙니다. 그곳은 문을 닫았으니 해변으로 안내하는 경로는 무시하세요.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>가미야초역</strong>(도쿄메트로 히비야선) — 5번 출구에서 도보 2분.</li>
            <li><strong>롯폰기잇초메역</strong>(도쿄메트로 난보쿠선) — 4번 출구에서 도보 6분.</li>
            <li>두 역 모두 지하 통로로 아자부다이힐스와 연결되어 있어, 지상으로 올라가지 않고 안내판만 따라가면 됩니다.</li>
          </ul>
          <p className={styles.bodyText}>
            <Link href="/guides/transport/ic-cards-japan">스이카나 파스모 같은 IC 카드(영어)</Link>로 개찰구를
            통과하면 두 역 모두 별도로 준비할 것이 없습니다. 노선에 대한 자세한 내용은{" "}
            <Link href="/guides/transport/tokyo-transportation">도쿄 교통 가이드(영어)</Link>에 있습니다.
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "팀랩 후쿠오카 티켓 2026: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "팀랩 교토 티켓: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "팀랩 보태니컬 가든 오사카 티켓: 가격과 운영 시간(영어)" },
            { href: "/guides/attractions/tokyo-joypolis-tickets", title: "도쿄 조이폴리스 티켓(2026): 패스포트 가격, 운영 시간, 키 제한(영어)" },
            { href: "/ko/guides/attractions/teamlab-planets-tickets", title: "팀랩 플래닛 예약 2026: 티켓 가격, 운영 시간, 가는 법" },
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 보더리스 비교 2026: 도쿄에서 어디로 갈까" },
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 티켓 예약 2026: 가격·예약 오픈·일몰 시간" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 전철, 지하철, IC 카드(영어)" },
            { href: "/guides/attractions", title: "일본의 더 많은 즐길 거리(영어) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>팀랩 보더리스 시간대를 예약하세요</h2>
            <p className={styles.ctaBannerDesc}>
              시간 지정 입장이라는 것은, 원하는 시간대가 매진될 수 있다는 뜻입니다. 클룩은 팀랩의
              공식 티켓 판매 파트너로, 자국 통화로 결제하고 전자 티켓을 휴대폰으로 받습니다.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                팀랩 보더리스 티켓 보기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
