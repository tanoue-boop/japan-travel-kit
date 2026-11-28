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
import BookingEsimCard from "../../../../components/BookingEsimCard";
import HotelStayBlock from "../../../../components/HotelStayBlock";
import {
  fujiHakoneDayTour,
  fujiQHighlandAdmission,
  fujiQHighlandPass,
  fujiQHighlandQPack,
  fujikawaguchikoHotels,
  kawaguchikoYamanakakoBusTour,
  mtFujiPass,
  naritaLimousineBus,
  tokyoMtFujiHighwayBus,
  tokyoStayAreas,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/fuji-q-highland-tickets) section by section as of
// 2026-11-28 (task-jtk-20261128-TR02): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (fujiq.jp and bus.fujikyu.co.jp,
// read 23 Nov 2026); nothing is added. Title terms: 후지큐 하이랜드 티켓 and 자유이용권 — the words
// Korean guides (livejapan.com/ko, jeepe.jp/ko) and resellers (WAUG, Headout ko) use for the park
// and its Free Pass. Ride names stay in English: no official Korean names were found.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/fuji-q-highland-tickets";
const TITLE = "후지큐 하이랜드 티켓 2026: 자유이용권 가격, 무료 입장";
const H1 = "후지큐 하이랜드 티켓 2026: 가격, 무료 입장, 자유이용권";
const DESC =
  "후지큐 하이랜드 입장은 무료, 1일 자유이용권 ¥6,000~¥7,900(날짜별), 코스터 1회 ¥2,000. 4개 이상 타면 더 저렴합니다.";

const LAST_CHECKED = "2026-11-23";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);

const OFFICIAL = {
  ticket: "https://www.fujiq.jp/en/ticket/",
  rides: "https://www.fujiq.jp/en/ticket/attraction.html",
  priority: "https://www.fujiq.jp/en/ticket/priority.html",
  tokuQ: "https://bus.fujikyu.co.jp/otoku/fujiq-beginner/",
  superTokuQ: "https://www.fujiq.jp/event/tokuQpack_2025.html",
  hours: "https://www.fujiq.jp/en/schedule/index.html",
  hotel: "https://www.fujiq.jp/en/relate/index.html",
  bus: "https://bus.fujikyu.co.jp/highway/detail/id/1",
};

const QPACK_URL = klookFor(fujiQHighlandQPack.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const textLink = { color: "var(--text)", fontWeight: 600 } as const;
const lastChecked = { marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

// Row 1 is the answer; the rest are adult prices as fujiq.jp lists them.
const priceRows = [
  ["어떤 입장권을 살까", "대형 코스터 4개 이상 → 1일 자유이용권", "1~2개 → 무료 입장 후 1회씩 결제, 도쿄에서 버스로 → Toku-Q Pack"],
  ["파크 입장(무료 입장권)", "무료(¥0)", "입장만 포함되며, 놀이기구는 모두 파크 안 발권기에서 결제합니다"],
  ["1일 자유이용권(프리패스)", "날짜에 따라 ¥6,000~¥7,900", "파크가 제외 대상으로 안내한 어트랙션을 빼고 하루 종일 무제한 탑승합니다"],
  ["오후 자유이용권", "날짜에 따라 ¥4,100~¥6,000", "13:00부터 무제한 탑승합니다"],
  ["Sunset★Night Pass", "¥3,700 / ¥4,000", "19:00 이후까지 운영하는 날 16:00부터 사용하며, 당일 파크에서만 판매합니다"],
  ["토마스랜드 패스", "날짜에 따라 ¥3,000~¥3,500", "토마스랜드 놀이기구 12개를 모두 이용하며, 토마스랜드 밖의 놀이기구는 따로 결제합니다"],
  ["우선 입장 1일 자유이용권", "월별 요금표", "온라인 전용입니다. 개장 전에 입장하며 그 시간에는 대형 코스터만 운행합니다. 2026년 12월 1일~2027년 2월 5일에는 판매하지 않습니다"],
  ["가상 대기 1일 자유이용권(분신군)", "1일 자유이용권 요금 + ¥2,000", "Q-chan 앱으로 지정 놀이기구의 대기 줄을 섭니다. 수량 한정이며 성인부터 초등학생까지만 구매할 수 있습니다"],
  ["대형 코스터 1회", "¥2,000", "Fujiyama, Takabisha, Eejanaika, ZOKKON, Attack on Titan THE RIDE"],
];

const ageRows = [
  ["성인(18~64세)", "¥6,000~¥7,900", "¥4,100~¥6,000"],
  ["중·고등학생", "¥5,500~¥7,400", "¥3,800~¥5,700"],
  ["초등학생(어린이)", "¥4,400~¥5,100", "¥3,500~¥4,200"],
  ["유아(1세 이상)", "¥2,100~¥2,600", "¥1,700~¥2,100"],
  ["시니어(65세 이상)", "¥2,100~¥2,600", "¥1,700~¥2,100"],
];

// Pay per ride, from fujiq.jp/en/ticket/attraction.html. Row 1 is the break-even.
const rideRows = [
  ["손익분기점", "대형 코스터 3개 = ¥6,000", "자유이용권이 가장 저렴한 날의 요금과 같습니다. 대형 코스터 4개(¥8,000)는 어느 날짜든 자유이용권보다 비쌉니다"],
  ["Fujiyama, Takabisha, Eejanaika, ZOKKON, Attack on Titan THE RIDE", "1회 ¥2,000", "대부분의 방문객이 타려고 오는 놀이기구입니다"],
  ["Tondemina, Tekkotsubanchou, Nagashimasuka, Fuji Airways, Panic Rock, Desperation Fortress, 3D Shooting Ride", "1회 ¥1,500", "Tentekomai(같은 ¥1,500)는 2027년 7월 하순까지 운영을 중단합니다"],
  ["Senritsu Meikyu(폐병원 호러 어트랙션)", "그룹당 ¥4,000 / ¥8,000", "최대 4명입니다. 1일 또는 오후 자유이용권이 있으면 ¥4,000, 없으면 ¥8,000이며 시간 지정권으로 판매합니다"],
  ["토마스랜드 놀이기구", "1회 ¥500", "또는 토마스랜드 패스 ¥3,000~¥3,500"],
];

// The Toku-Q Pack, the plain pass and the priority ticket side by side. Row 1 is the answer.
const compareRows = [
  ["어떤 것을 고를까", "—", "도쿄에서 버스로 간다면 Toku-Q Pack, 이미 호수 근처에 있거나 열차로 간다면 1일 자유이용권을 고르고, 붐비는 날에는 우선 탑승권을 추가하세요."],
  ["Super Toku-Q Pack(바스타 신주쿠 출발)", "성인 ¥11,100 / 중·고등학생 ¥10,700 / 초등학생 ¥7,100", "왕복 고속버스 + 1일 자유이용권 + 코스터 1개 우선 탑승 1회(9:00~10:00에 사용)"],
  ["Toku-Q Pack(그 밖의 출발지)", "출발지별 요금", "왕복 직행버스 + 1일 자유이용권. 도쿄와 시즈오카 주변 30곳 이상, 그리고 나고야, 교토, 오사카에서 출발합니다"],
  ["1일 자유이용권만", "날짜에 따라 ¥6,000~¥7,900", "무제한 탑승하며, 교통편은 포함되지 않습니다"],
  ["우선 탑승권(후지큐의 패스트 패스)", "놀이기구와 시간대별 요금, 전 연령 같은 요금", "놀이기구 1개의 대기 시간이 짧아집니다. 자유이용권이나 탑승권이 따로 필요합니다. 3일 전 18:00부터 온라인 판매"],
];

const hoursRows = [
  ["요약", "9:00 또는 10:00 개장, 17:00~20:00 폐장", "운영 시간은 날짜에 따라 달라지므로 가기 전에 월별 표를 확인하세요"],
  ["2026년 11월", "9:00~18:00 / 19:00 / 20:00", "11월 30일은 10:00~17:00이며, 11월에는 휴무일이 없습니다"],
  ["2026년 12월 평일(25일까지)", "10:00~17:00", "12월 10일(목)은 휴무입니다"],
  ["2026년 12월 주말", "9:00~18:00", "12월 5~6일, 12~13일, 19~20일"],
  ["2026년 12월 26~30일", "9:00~19:00", "12월 31일은 9:00부터 다음 날 1:00까지"],
  ["공사로 운영을 중단한 놀이기구", "—", "Tentekomai 2026년 10월 5일~2027년 7월 하순(예정), 대관람차 2026년 11월 9일~2027년 1월 31일, Red Tower는 당분간"],
];

// Under the price table: the bus bundle and bus seat, the lakes tour and a night at the lake.
const priceTableCards: KlookSameDayCard[] = [
  {
    label: "후지큐 하이랜드 Q Pack(1일 자유이용권 + 고속버스)",
    ctaLabel: "클룩에서 후지큐 Q Pack 확인 →",
    url: QPACK_URL,
    kind: "자유이용권 + 버스",
    why: "1일 자유이용권과 신주쿠 또는 우에노 출발 왕복 고속버스를 바우처 하나로 묶은 상품이며, 한국어 화면으로 결제할 수 있습니다.",
  },
  {
    label: "도쿄–후지산 고속버스",
    ctaLabel: "후지산 고속버스 확인 →",
    url: klookFor(tokyoMtFujiHighwayBus.url, LOCALE),
    kind: "버스",
    why: "좌석만 예약하는 상품으로, 놀이기구를 1회씩 결제하거나 자유이용권을 파크에서 살 때 맞습니다. 이 버스는 후지큐 하이랜드와 가와구치코에 정차합니다.",
  },
  {
    label: "가와구치코와 야마나카코 온천 당일 버스 투어(도쿄 출발)",
    ctaLabel: "가와구치코 버스 투어 확인 →",
    url: klookFor(kawaguchikoYamanakakoBusTour.url, LOCALE),
    kind: "투어",
    why: "일행 중 놀이기구보다 호수를 보고 싶은 사람을 위한 상품으로, 후지산의 같은 쪽을 가이드와 함께 버스로 도는 하루입니다.",
  },
  {
    label: "후지카와구치코 호텔",
    ctaLabel: "후지카와구치코 호텔 확인 →",
    url: klookFor(fujikawaguchikoHotels.url, LOCALE),
    kind: "호텔",
    why: "신주쿠 출발 버스는 파크 다음 정류장이 가와구치코역이므로, 호숫가에서 하룻밤 묵으면 파크 하루를 이틀 여행으로 늘릴 수 있습니다.",
  },
];

const whoFor = [
  {
    title: "Toku-Q Pack / Q Pack을 사야 하는 경우",
    desc: "차 없이 도쿄에서 출발할 때입니다. 두 상품 모두 1일 자유이용권과 왕복 고속버스를 묶어서 하루 일정을 세 번이 아니라 한 번에 예약할 수 있고, 버스는 다시 환승해야 하는 역이 아니라 파크 전용 터미널에 도착합니다.",
  },
  {
    title: "자유이용권만 사야 하는 경우",
    desc: "이미 후지고코 지역에 있거나 열차로 가고, 대형 코스터를 4개 이상 탈 때입니다. 1일 자유이용권은 성인 ¥6,000~¥7,900이고, 대형 코스터 4개를 1회 ¥2,000씩 타면 ¥8,000입니다.",
  },
  {
    title: "입장만 하는 경우",
    desc: "놀이기구가 목적이 아닐 때입니다. 후지큐는 입장이 무료이고, 파크 안 발권기에서 어트랙션별로 결제할 수 있습니다. 후지산 경치, NARUTO와 토마스 구역, 코스터 1~2개가 목적이라면 이 방법이 맞습니다.",
  },
];

const steps = [
  {
    title: "입장은 무료이고, 자유이용권은 놀이기구용이라는 점을 알아 두세요",
    desc: `후지큐 공식 요금 페이지에 따르면 파크는 무료로 입장할 수 있고, 탑승권은 파크 안 발권기에서 판매합니다. 그래서 정할 것은 입장권을 살지가 아니라 1일 자유이용권을 살지, 1회씩 결제할지입니다. ${CHECKED} 확인.`,
  },
  {
    title: "대표 요금이 아니라 방문 날짜의 요금을 확인하세요",
    desc: `요금은 날짜에 따라 달라집니다. 성인 1일 자유이용권은 ¥6,000~¥7,900, 13:00부터 쓰는 오후 자유이용권은 ¥4,100~¥6,000입니다. 후지큐는 월별 요금표를 공개하므로, 예산을 잡기 전에 실제로 갈 날짜의 요금을 확인하세요. ${CHECKED} 확인.`,
  },
  {
    title: "자유이용권을 사기 전에 가는 방법부터 정하세요",
    desc: "세트 상품과 자유이용권만 사는 경우는 이 점이 다릅니다. Toku-Q Pack과 클룩의 Q Pack에는 도쿄 출발 왕복 고속버스가 포함되고, 자유이용권만 사면 교통편은 포함되지 않습니다. 열차(JR로 오쓰키까지 간 뒤 후지큐코선으로 후지큐 하이랜드역)로 간다면 자유이용권만 사세요.",
  },
  {
    title: "방문 날짜의 운영 시간과 운영을 중단한 놀이기구를 확인하세요",
    desc: `운영 시간은 날짜에 따라 달라집니다. 12월 평일 대부분은 10:00~17:00, 12월 주말은 9:00~18:00이고, 월별 페이지에 날마다 운영하지 않는 놀이기구가 나와 있습니다. Tentekomai는 공사로 2027년 7월 하순까지 운영을 중단합니다. ${CHECKED} 확인.`,
  },
];

// The first five go into FAQPage, as on the English page.
const faqItems: FaqItem[] = [
  {
    q: "후지큐 하이랜드 티켓은 2026년에 얼마인가요?",
    a: `후지큐 하이랜드는 입장이 무료입니다. 돈이 드는 것은 놀이기구입니다. 1일 자유이용권은 18~64세 성인 ¥6,000~¥7,900, 중·고등학생 ¥5,500~¥7,400, 초등학생 ¥4,400~¥5,100, 1세 이상 유아와 65세 이상 시니어 ¥2,100~¥2,600입니다. 13:00부터 쓰는 오후 자유이용권은 성인 ¥4,100~¥6,000이고, 대형 코스터 1회는 ¥2,000입니다. ${CHECKED}에 fujiq.jp에서 확인한 요금입니다.`,
  },
  {
    q: "후지큐 하이랜드는 입장이 무료인가요?",
    a: `네. 공식 요금 페이지에 따르면 후지큐 하이랜드는 무료 입장이고(무료 입장권 ¥0), 방문객은 파크 안 발권기에서 탑승권을 삽니다. 일행 중 놀이기구를 타지 않는 사람은 돈을 내지 않고 들어가서 파크와 후지산 경치를 볼 수 있습니다. ${CHECKED} 확인.`,
  },
  {
    q: "후지큐 자유이용권을 사는 것이 나은가요, 1회씩 결제하는 것이 나은가요?",
    a: `대형 코스터 수를 세어 보세요. Fujiyama, Takabisha, Eejanaika, ZOKKON, Attack on Titan THE RIDE는 1회 ¥2,000이므로 3개는 1일 자유이용권의 최저 요금과 같은 ¥6,000이고, 4개는 어느 날짜의 자유이용권(¥6,000~¥7,900)보다도 비싼 ¥8,000입니다. 4개 이상 탄다면 자유이용권을, 1~2개라면 1회씩 결제하세요. ${CHECKED}에 fujiq.jp에서 확인한 탑승 요금입니다.`,
  },
  {
    q: "Toku-Q Pack은 무엇인가요?",
    a: `후지큐의 자체 세트권으로, 후지큐 하이랜드행 왕복 직행 고속버스와 1일 자유이용권이 포함됩니다. 도쿄와 시즈오카 주변 30곳 이상, 그리고 나고야, 교토, 오사카에서 출발하며 요금은 출발지에 따라 다릅니다. 바스타 신주쿠에서 출발하는 Super Toku-Q Pack에는 9:00~10:00에 코스터 1개를 우선 탑승할 수 있는 1회분이 추가되며, 성인 ¥11,100, 중·고등학생 ¥10,700, 초등학생 ¥7,100입니다. ${CHECKED}에 fujiq.jp와 bus.fujikyu.co.jp에서 확인했습니다.`,
  },
  {
    q: "후지큐 하이랜드에 패스트 패스가 있나요?",
    a: `네. 후지큐는 이를 우선 탑승권(Priority Ticket)이라고 부릅니다. 목록에 있는 인기 놀이기구 1개의 대기 시간을 줄여 주며, 요금은 놀이기구와 시간대에 따라 다르고 전 연령이 같습니다. 3일 전 18:00부터 이용 시간 60분 전까지 온라인으로 수량 한정 판매합니다. 1일 자유이용권이나 탑승권도 따로 필요합니다. 개장 전에 입장할 수 있는 우선 입장 1일 자유이용권은 별도 상품이며, 2026년 12월 1일부터 2027년 2월 5일까지는 판매하지 않습니다. ${CHECKED} 확인.`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "신주쿠에서 후지큐 하이랜드까지 어떻게 가나요?",
    a: `바스타 신주쿠에서 후지큐 고속버스를 타면 후지큐 하이랜드 정류장까지 약 1시간 40분이며, 성인 ¥2,200부터(온라인 예매 시 ¥2,000)입니다. 교통 상황에 따라 더 걸릴 수 있습니다. 후지큐 하이랜드는 가와구치코역 바로 전 정류장입니다. Toku-Q Pack과 클룩의 Q Pack은 모두 왕복 버스와 1일 자유이용권을 묶은 상품입니다. ${CHECKED}에 후지큐 버스 사이트에서 확인한 시간입니다.`,
  },
  {
    q: "후지큐 하이랜드 입장권은 어디에서 미리 살 수 있나요?",
    a: `후지큐 공식 온라인 티켓 사이트에서는 1일 자유이용권, 오후 자유이용권, 토마스랜드 패스, 온라인 전용 우선 입장 자유이용권을 판매하고, 클룩에서는 자유이용권과 버스가 포함된 Q Pack을 판매합니다. Toku-Q Pack은 후지큐 공식 온라인 사이트와 후지큐 콜센터에서 판매합니다. 공식 티켓은 구매 후 환불하거나 인원, 연령 구분을 바꿀 수 없습니다. ${CHECKED} 확인.`,
  },
  {
    q: "후지큐 하이랜드 운영 시간은 어떻게 되나요?",
    a: `날짜에 따라 다릅니다. 2026년 11월에는 9:00에 개장해 18:00~20:00에 폐장하고, 12월에는 평일 대부분이 10:00~17:00, 주말이 9:00~18:00이며 12월 10일은 휴무입니다. 후지큐는 월별 운영 시간표와 날짜별 운영 중단 놀이기구 목록을 공개합니다. ${CHECKED}에 fujiq.jp에서 확인했습니다.`,
  },
  {
    q: "후지큐 하이랜드의 대표 롤러코스터는 무엇인가요?",
    a: "'King of Coasters'로 소개되는 Fujiyama, 4차원 하이퍼코스터 Eejanaika, 가장 가파른 롤러코스터로 소개되는 Takabisha, 그리고 ZOKKON으로, 모두 1회 ¥2,000입니다. 스카이 롤러 Tentekomai는 새 놀이기구 공사로 2026년 10월 5일부터 2027년 7월 하순(예정)까지 운영을 중단합니다. NARUTO, 토마스와 친구들, 산엑스(San-X) 캐릭터를 테마로 한 구역도 있습니다.",
  },
  {
    q: "후지큐 하이랜드에서 후지산이 보이나요?",
    a: "파크는 가와구치코 근처 후지산 기슭에 있어, 맑은 날에는 파크 뒤로 후지산이 보입니다. 후지고코 어디서나 그렇듯 보이는지는 날씨에 따라 다르며, 한여름보다 서늘하고 건조한 계절에 볼 가능성이 높습니다. 후지산이 보인다고 보장할 수는 없으니 맑은 예보가 있는 날을 고르세요.",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "신주쿠 주변 호텔",
    ctaLabel: "클룩에서 신주쿠 호텔 확인 →",
    url: klookFor(tokyoStayAreas[0].url, LOCALE),
    why: "가와구치코행 고속버스는 신주쿠에서 출발하므로, 신주쿠에 묵으면 아침 일찍 파크로 가는 버스도 터미널까지 걸어가서 탈 수 있습니다.",
  },
  {
    label: "가와구치코와 야마나카코 온천 당일 버스 투어(도쿄 출발)",
    ctaLabel: "가와구치코 버스 투어 확인 →",
    url: klookFor(kawaguchikoYamanakakoBusTour.url, LOCALE),
    why: "같은 방면의 호수 쪽을 도쿄에서 가이드와 함께 하루에 도는 투어로, 코스터만큼 경치도 중요하다면 파크 전후 날에 넣으세요.",
  },
  {
    label: "도쿄 출발 후지산과 하코네 당일 투어",
    ctaLabel: "당일 투어 확인 →",
    url: klookFor(fujiHakoneDayTour.url, LOCALE),
    why: "도쿄에서 하루에 후지산을 보는 다른 방법으로, 같은 버스로 하코네까지 갑니다. 일행 중 놀이기구를 건너뛰고 싶은 사람에게 맞습니다.",
  },
  {
    label: "나리타 공항 리무진 버스",
    ctaLabel: "리무진 버스 확인 →",
    url: klookFor(naritaLimousineBus.url, LOCALE),
    why: "큰 짐을 싣고 도쿄 중심부 정류장까지 가는 공항버스로, 도착한 날 파크로 출발할 호텔까지 바로 갈 수 있습니다. 정류장 목록을 먼저 확인하세요.",
  },
];

const parkPicks = [
  withKlookLocale(fujiQHighlandQPack, LOCALE, {
    title: "후지큐 하이랜드 Q Pack(1일 자유이용권 + 고속버스)",
    desc: "무제한 탑승 자유이용권과 신주쿠 또는 우에노 출발 왕복 고속버스를 묶어, 하루 일정을 세 번이 아니라 한 번에 예약할 수 있습니다",
  }),
  withKlookLocale(fujiQHighlandPass, LOCALE, {
    title: "후지큐 하이랜드 1일 자유이용권",
    desc: "자유이용권만 사는 상품으로, 가와구치코까지 직접 이동하는 사람에게 맞습니다",
  }),
  withKlookLocale(fujiQHighlandAdmission, LOCALE, {
    title: "후지큐 하이랜드 입장 티켓",
    desc: "자유이용권 없이 입장만 하는 상품으로, 후지산 경치와 테마 구역이 목적일 때 고르세요",
  }),
];

const transportPicks = [
  withKlookLocale(tokyoMtFujiHighwayBus, LOCALE, {
    title: "도쿄–후지산 고속버스",
    desc: "도쿄에서 가와구치코, 후지큐 하이랜드, 후지산역까지 가는 직행버스로, 투어가 아니라 좌석으로 예약합니다",
  }),
  withKlookLocale(mtFujiPass, LOCALE, {
    title: "Mt. Fuji Pass(1일, 2일, 3일)",
    desc: "후지고코 주변 버스와 열차를 무제한 이용하고 로프웨이와 유람선도 포함되어, 투어 없이 직접 다니는 여행자에게 맞는 패스입니다",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "후지큐 하이랜드 티켓" }];

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
              <tr key={r} style={boldFirst && r === 0 ? { fontWeight: 700 } : undefined}>
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

const checkedLine = (...urls: string[]) => `최종 확인: ${LAST_CHECKED}. 출처: ${urls.join(", ")}`;

export default function KoFujiQHighlandTicketsPage({ updated }: { updated: PageUpdated }) {
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
            파크 입장은 무료이고, 돈을 내는 것은 놀이기구입니다. 1일 자유이용권, 자유이용권과 버스를 묶은 Toku-Q Pack, 코스터
            1회 ¥2,000 탑승권 중 어느 것이 더 저렴한지는 타고 싶은 놀이기구 수에 따라 달라집니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 요금", "파크 무료 입장"].map((t) => (
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
            <strong>후지큐 하이랜드는 입장이 무료이고, 1일 자유이용권(프리패스)은 날짜에 따라 성인 ¥6,000~¥7,900</strong>
            입니다. 대형 코스터인 Fujiyama, Takabisha, Eejanaika, ZOKKON은 1회 ¥2,000이므로{" "}
            <strong>4개 이상 탈 계획이라면 자유이용권을 사세요</strong>. 1~2개라면 1회씩 결제하면 됩니다. 바스타 신주쿠에서
            출발하는 Super Toku-Q Pack은 왕복 버스, 1일 자유이용권, 우선 탑승 1회를 성인 ¥11,100에 한 장으로 묶었습니다.{" "}
            {CHECKED}에 fujiq.jp에서 확인한 요금입니다.
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>파크 입장</p>
                <p className={styles.verdictStatValue}>무료</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1일 자유이용권(성인)</p>
                <p className={styles.verdictStatValue}>¥6,000~¥7,900</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>대형 코스터 1회</p>
                <p className={styles.verdictStatValue}>¥2,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>도쿄에서 출발</p>
                <p className={styles.verdictStatValue}>Toku-Q Pack / Q Pack(자유이용권 + 버스)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 입장은 무료이므로 입장권을 살 필요가 없습니다. 대형 코스터를 4개 이상 탄다면 1일
              자유이용권을, 점심 이후에 도착한다면 오후 자유이용권을 사고, 그렇지 않다면 아무것도 사지 않고 파크 안 발권기에서
              1회씩 결제하세요. 차 없이 도쿄에서 간다면 왕복 버스가 포함된 후지큐의 Toku-Q Pack이나 클룩의 Q Pack을 예매하세요.{" "}
              {CHECKED}에 fujiq.jp에서 확인한 요금입니다.
            </p>
            <KlookLink href={QPACK_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              클룩에서 후지큐 Q Pack 확인 →
            </KlookLink>
          </div>
        </div>

        <HotelStayBlock city="kawaguchiko" areas={["fujiQ", "kawaguchikoStation", "lakeKawaguchi"]} />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금</span>
          <h2 className={styles.sectionTitle}>후지큐 하이랜드 티켓은 얼마인가요?</h2>
          <p className={styles.bodyText}>
            입장은 무료이고, 1일 자유이용권은 날짜에 따라 성인 ¥6,000~¥7,900, 대형 코스터는 1회 ¥2,000입니다. 후지큐가
            판매하는 모든 입장권과 내용은 다음과 같습니다.
          </p>
          <Table head={["입장권", "성인 요금", "내용"]} rows={priceRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.ticket, OFFICIAL.rides)}
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            연령별 1일 자유이용권과 오후 자유이용권 요금
          </h3>
          <Table head={["연령 구분", "1일 자유이용권", "오후 자유이용권(13:00부터)"]} rows={ageRows} />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            파크는 날짜에 따라 요금을 정하고 월별 요금표를 공개하므로, 방문 날짜의 요금을 확인하세요. 유아는 온라인에서 QR
            티켓을 사거나 당일 매표소에서 삽니다.
          </p>
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.ticket)}
          </p>
        </section>

        <KlookSameDayCards
          heading="파크 하루 예약: 버스 포함 자유이용권, 버스만, 호수 투어, 호숫가 숙박"
          cards={priceTableCards}
          footnote={
            <>
              객실에서 후지산이 보이는 호숫가 료칸은{" "}
              <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" hrefLang="en">
                가와구치코 후지산 전망 료칸 가이드(영어)
              </Link>
              를 보세요.
            </>
          }
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>입장</span>
          <h2 className={styles.sectionTitle}>후지큐는 입장이 무료인가요?</h2>
          <p className={styles.bodyText}>
            네. 후지큐 하이랜드 공식 요금 페이지에 따르면 파크는 무료로 입장할 수 있습니다. 무료 입장권은 ¥0이고 매표소나
            온라인에서 신청하며, 놀이기구는 파크 안 발권기에서 산 탑승권으로 타거나 자유이용권으로 탑니다. 일본의 대형
            테마파크 중에서는 드문 방식이라, 일행의 취향이 서로 다를 때 쓸모가 있습니다. 놀이기구를 타지 않는 사람은 돈을 내지
            않고 들어와 후지산 경치와 NARUTO, 토마스랜드, 산엑스 구역을 볼 수 있습니다. {CHECKED} 확인.
          </p>
          <p className={styles.bodyText}>
            파크의 중심은 코스터입니다. &lsquo;King of Coasters&rsquo; Fujiyama, 4차원 코스터 Eejanaika, 급경사로 떨어지는
            Takabisha, 그리고 ZOKKON이 있습니다. 스카이 롤러 Tentekomai는 새 놀이기구 공사로 2026년 10월 5일부터 2027년 7월
            하순(예정)까지 운영을 중단합니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>자유이용권 또는 1회 결제</span>
          <h2 className={styles.sectionTitle}>후지큐 자유이용권과 1회 결제, 어느 쪽이 더 저렴한가요?</h2>
          <p className={styles.bodyText}>
            대형 코스터 4번째부터 자유이용권이 더 저렴합니다. 1회 ¥2,000짜리 4개는 ¥8,000으로 자유이용권 최고 요금
            ¥7,900보다 비싸고, 3개는 ¥6,000으로 최저 요금과 같습니다. 공식 어트랙션 요금표의 탑승 요금은 다음과 같습니다.
          </p>
          <Table head={["놀이기구", "1회 요금", "참고"]} rows={rideRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.rides)}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Toku-Q Pack</span>
          <h2 className={styles.sectionTitle}>Toku-Q Pack은 무엇인가요?</h2>
          <p className={styles.bodyText}>
            Toku-Q Pack은 후지큐 하이랜드행 왕복 직행 고속버스와 1일 자유이용권을 묶은 후지큐의 세트권으로, 요금은 출발지에
            따라 다릅니다. 바스타 신주쿠에서 출발하는 Super Toku-Q Pack에는 9:00~10:00에 코스터 1개를 우선 탑승할 수 있는
            1회분도 포함되며, 성인 ¥11,100입니다. 비교하면 신주쿠 버스를 온라인으로 예매하고(편도 ¥2,000) 자유이용권을 따로
            사면 날짜에 따라 ¥10,000~¥11,900입니다.
          </p>
          <Table head={["상품", "요금", "포함 내용"]} rows={compareRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.superTokuQ, OFFICIAL.tokuQ, OFFICIAL.priority, OFFICIAL.bus)}
          </p>
          <p className={styles.bodyText}>
            우선 탑승권은 파크의 패스트 패스입니다. 후지큐 목록에 있는 놀이기구(Fujiyama, ZOKKON, Takabisha, Eejanaika 등)
            1개의 대기 시간을 줄여 주며, 전 연령 같은 요금이고 수량 한정으로 판매합니다. 1회 구매에 최대 10장까지이며, 3일 전
            18:00부터 이용 시간 60분 전까지 온라인으로, 또는 당일 각 놀이기구 옆 발권기에서 살 수 있습니다. 자유이용권을
            대신하지는 않으므로 1일 자유이용권이나 탑승권이 따로 필요합니다. {CHECKED} 확인.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>입장권 선택</span>
          <h2 className={styles.sectionTitle}>Toku-Q Pack, 자유이용권, 아니면 아무것도 사지 않을까?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>미리 구매</span>
          <h2 className={styles.sectionTitle}>후지큐 입장권은 어디에서 미리 살 수 있나요?</h2>
          <p className={styles.bodyText}>
            후지큐 공식 온라인 티켓 사이트와 클룩 두 곳입니다. 공식 사이트에서는 날짜를 지정해 1일 자유이용권, 오후
            자유이용권, 토마스랜드 패스를 판매하고, 온라인 전용 우선 입장 1일 자유이용권과 가상 대기 자유이용권(전날까지)도
            판매합니다. Toku-Q Pack은 같은 공식 사이트나 후지큐 콜센터에서 판매합니다. 공식 티켓은 구매 후 환불하거나 인원,
            연령 구분을 바꿀 수 없습니다. Sunset★Night Pass는 당일 16:00부터 파크에서만 판매합니다. {CHECKED} 확인.
          </p>
          <p className={styles.bodyText}>
            클룩에서는 1일 자유이용권, 입장 티켓, 그리고 신주쿠 또는 우에노 출발 왕복 고속버스가 포함된 Q Pack을 한국어
            화면으로 결제할 수 있습니다. 도쿄 일주일 여행에도 하루 넣을 수 있습니다.{" "}
            <Link href="/guides/attractions/tokyo-7-day-itinerary" hrefLang="en">
              도쿄 7일 일정(영어)
            </Link>
            은 후지산 하루를 6일째에 넣었고,{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en">
              일본 관광지 입장료 표(영어)
            </Link>
            에서 후지큐를 다른 대형 테마파크와 비교할 수 있습니다.
          </p>
        </section>

        <KlookTourPicks
          heading="클룩의 후지큐 상품 3가지, 추천 순서"
          intro="세 상품 모두 같은 파크이고, 교통편과 놀이기구가 요금에 포함되는지가 다릅니다. 도쿄에서 출발한다면 Q Pack을, 열차로 간다면 자유이용권만, 코스터보다 경치와 테마 구역이 목적이라면 입장 티켓을 예매하세요."
          tours={parkPicks}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>숙박</span>
          <h2 className={styles.sectionTitle}>Highland Resort Hotel &amp; Spa는 묵을 만한가요?</h2>
          <p className={styles.bodyText}>
            당일 방문객이 오기 전에 코스터를 타고 싶다면 묵을 만합니다. Highland Resort Hotel &amp; Spa는 후지큐의 공식
            호텔로 파크와 바로 연결되고 앞에 후지산이 보입니다. 후지큐는 공식 호텔 투숙객 혜택으로 두 가지를 안내합니다. 파크
            우선 입장(그 시간에는 일부 어트랙션만 운영)과 숙박 기간 중 짐 보관입니다. 고속버스 터미널은 호텔 주차장 안에 있고,
            호텔에는 토마스와 NARUTO 캐릭터 룸이 있으며 11월 28일에는 스밋코구라시 룸이 문을 엽니다. {CHECKED} 확인.
          </p>
          <p className={styles.bodyText}>
            놀이기구를 일찍 타는 것보다 경치와 온천이 중요하다면 한 정류장 다음이 가와구치코입니다.{" "}
            <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" hrefLang="en">
              가와구치코 후지산 전망 료칸 가이드(영어)
            </Link>
            에서 그곳 료칸 6곳을 비교했습니다. 아이와 함께 여행한다면{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" hrefLang="en">
              아이와 함께하는 도쿄 일정(영어)
            </Link>
            에서 디즈니와 실내 일정 사이에 당일 나들이를 넣는 위치를 볼 수 있습니다.
          </p>
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.hotel)}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>운영 시간</span>
          <h2 className={styles.sectionTitle}>후지큐 하이랜드 운영 시간은 어떻게 되나요?</h2>
          <p className={styles.bodyText}>
            후지큐는 날짜에 따라 9:00 또는 10:00에 개장해 17:00~20:00에 폐장하며, 가끔 휴무일이 있습니다. 2026년에는 12월
            10일입니다.
          </p>
          <Table head={["시기", "운영 시간", "참고"]} rows={hoursRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.hours)}
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>단계별</span>
          <h2 className={styles.sectionTitle}>후지큐 하이랜드 티켓 예매 방법</h2>
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

        <BookingEsimCard lead="후지큐 예매를 마쳤다면, 출국 전에 모바일 데이터도 준비하세요." />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>도쿄에서 후지큐 하이랜드까지 어떻게 가나요?</h2>
          <p className={styles.bodyText}>
            바스타 신주쿠에서 후지큐 고속버스를 타면 후지큐 하이랜드 정류장까지 약 1시간 40분이며, 성인 ¥2,200부터(온라인
            예매 시 ¥2,000)이고 길이 막히면 더 걸립니다. 고속버스는 파크에 붙어 있는 Highland Resort Hotel &amp; Spa 주차장
            안의 버스 터미널에 도착합니다. 열차로는 JR로 오쓰키까지 간 뒤 후지큐코선으로 후지큐 하이랜드역까지 갑니다.{" "}
            {checkedLine(OFFICIAL.bus)}
          </p>
          <p className={styles.bodyText}>
            이 차이 때문에 버스 포함 상품이 있고, 당일치기라면 대개 버스 포함 상품이 더 낫습니다. 버스가 입구 앞에서 내려 주고
            다시 태워 오므로 오쓰키에서 열차 환승 시간을 맞출 필요가 없습니다. 일정을 자유롭게 짜고 싶다면{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" hrefLang="en" style={textLink}>
              후지산 당일치기 자유 여행 가이드(영어)
            </Link>
            에서 파크 입장권 없이 같은 방면을 정리했고,{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" hrefLang="en" style={textLink}>
              도쿄 출발 가와구치코 당일치기 가이드(영어)
            </Link>
            는 한 정류장 다음의 호수를,{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" hrefLang="en" style={textLink}>
              도쿄 출발 후지산 투어 비교(영어)
            </Link>
            는 일행 중 5합목으로 가는 사람을 위한 방법을 정리했습니다.
          </p>
        </section>

        <KlookTripPrep
          label="같은 날 함께 예약"
          heading="후지큐 하루에 함께 예약할 만한 것은?"
          intro="파크 입장권으로 그날 일정은 정해집니다. 출발할 숙소와 파크 양옆의 호수가 이 여행에 필요한 나머지 예약입니다."
          items={tripPrepItems}
        />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="후지큐 하이랜드 자주 묻는 질문" />

        <KlookTourPicks
          heading="Q Pack 없이 가는 방법"
          intro="이미 자유이용권이 있거나 코스터보다 후지고코가 목적이라면, 이 두 상품으로 이동을 해결할 수 있습니다. 고속버스는 후지큐 하이랜드와 가와구치코에 정차하고, 지역 패스는 도착한 뒤 현지 버스와 열차에 사용할 수 있습니다."
          tours={transportPicks}
        />

        <p className={styles.bodyText}>
          후지큐 버스가 출발하는 신주쿠는{" "}
          <Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en">
            도쿄 숙소 지역 가이드(영어)
          </Link>
          에서 처음 가는 여행자에게 추천하는 지역이기도 합니다.
        </p>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            파크 주변 호수를 더 둘러본다면, 후지큐의{" "}
            <Link href="/guides/transport/mt-fuji-pass" hrefLang="en" style={linkStyle}>
              Mt. Fuji Pass(영어)
            </Link>
            로 1~3일 동안 후지산 주변 버스와 열차를 이용할 수 있습니다.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            가까운 가와구치코 호숫가에는 왕복 ¥1,200인{" "}
            <Link href="/guides/attractions/mt-fuji-panoramic-ropeway-tickets" hrefLang="en" style={linkStyle}>
              후지산 파노라마 로프웨이(영어)
            </Link>
            와 평일 ¥1,800인{" "}
            <Link href="/guides/attractions/kawaguchiko-music-forest-museum-tickets" hrefLang="en" style={linkStyle}>
              가와구치코 오르골의 숲 미술관(영어)
            </Link>
            이 있습니다.
          </p>
        </section>
        <EsimCtaBottom />

        <Related
          items={[
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "도쿄 출발 가와구치코 당일치기(2026): 경로, 요금, 하루 일정 (영어)" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "도쿄 출발 후지산 당일치기(2026): 직접 가는 방법 (영어)" },
            { href: "/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "도쿄 출발 후지산 당일 투어(2026): 어떤 투어를 고를까 (영어)" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니 입장권: 가격과 예매 방법" },
            { href: "/ko/guides/attractions/usj-tickets-express-pass", title: "유니버설 스튜디오 재팬 입장권과 익스프레스 패스" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "산리오 퓨로랜드 입장권(2026): 가격, 변동 요금, 예매 (영어)" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "도쿄 타워 입장권(2026): 가격, 메인 데크와 톱 데크 (영어)" },
            { href: "/guides/attractions/things-to-do-tokyo", title: "도쿄에서 할 것(2026): 미리 예매할 곳과 그냥 갈 곳 (영어)" },
            { href: "/ko", title: "일본 여행 준비 가이드 전체 보기" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>하루 일정을 한 번에 예약하세요</h2>
            <p className={styles.ctaBannerDesc}>
              Q Pack은 1일 자유이용권과 신주쿠 또는 우에노 출발 왕복 고속버스를 바우처 하나로 묶은 상품이며, 한국어 화면으로
              결제할 수 있습니다. 버스와 자유이용권을 따로 준비하지 않아도 당일치기를 다녀올 수 있습니다.
            </p>
            <KlookLink href={QPACK_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              후지큐 Q Pack 보기 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
