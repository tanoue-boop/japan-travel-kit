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
import {
  osakaAmazingPass,
  osakaCastleUmedaTonboriDayTour,
  osakaNaniWonderNightBusTour,
  osakaPrivateWalkingTour,
  umedaSkyBuildingTicket,
  umedaSkySameDayPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/umeda-sky-building-tickets) section by section
// as of 2026-11-25 (task-jtk-20261125-TR01): same sections, tables, FAQ and Klook CTAs in the
// same places. Every figure, date and source is the English page's; nothing is added.
// Title term: 우메다 스카이빌딩 — the name Korean guides and Klook ko use, with 공중정원
// (osaka-info.jp/ko: 우메다 스카이 빌딩(공중정원 전망대)). The pass is 오사카 주유패스, as on the
// Korean Dotonbori page.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/umeda-sky-building-tickets";
const TITLE = "우메다 스카이빌딩 입장료 2026: 공중정원 시간, 일몰";
const H1 = "우메다 스카이빌딩 입장료 2026: 공중정원 전망대 요금, 운영 시간, 일몰 시간";
const DESC =
  "우메다 스카이빌딩 입장료 성인 ¥2,000, 4~12세 ¥500. 9:30~22:30, 입장 마감 22:00. 주유패스 무료는 15시 전만.";

const LAST_CHECKED_ISO = "2026-11-19";
const LAST_CHECKED = dateLabel(LAST_CHECKED_ISO, LOCALE);
const CHECKED_ISO = "2026-11-03";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const OFFICIAL_URL = "https://www.skybldg.co.jp/en/observatory/";
const HARUKAS_URL = "https://www.abenoharukas-300.jp/observatory/ticket/";
const NAOJ_URL = "https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s2811.html";
// The pass price is owned by lib/attraction-prices.ts, shared with the English page.
const PASS_1_DAY = priceLabel(PRICES.osakaAmazingPass.adult, LOCALE);

const TICKET_URL = klookFor(umedaSkyBuildingTicket.url, LOCALE);
const PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const NIGHT_BUS_URL = klookFor(osakaNaniWonderNightBusTour.url, LOCALE);
const DAY_TOUR_URL = klookFor(osakaCastleUmedaTonboriDayTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  {
    tier: "성인",
    price: "¥2,000",
    what: "39층 매표소 요금이며 현금이나 신용카드로 결제할 수 있습니다. 운영사 일본어 사이트에서는 asoview를 통해 날짜를 지정하는 더 저렴한 웹 입장권도 판매하지만, 금액은 표시하지 않습니다",
  },
  { tier: "4~12세 어린이", price: "¥500", what: "성인 요금의 4분의 1로, 오사카 전망대 중에서는 드물게 저렴합니다" },
  { tier: "4세 미만", price: "무료", what: "입장권이 필요 없습니다" },
  { tier: "장애인 수첩 소지자", price: "¥1,000 / ¥250", what: "성인 / 4~12세, 전망대 매표소에서 수첩을 제시하고 구매합니다" },
  { tier: "10명 이상 단체", price: "¥1,800 / ¥450", what: "성인 / 4~12세, 39층 매표소에서 접수합니다" },
  {
    tier: "오사카 주유패스 소지자, 15:00 전 입장",
    price: "무료",
    what: "1회 입장이 패스에 포함됩니다. 패스를 사서 이득인지는 이 시간대에 입장하는지에 따라 정해집니다",
  },
  {
    tier: "오사카 주유패스 소지자, 15:00부터 입장",
    price: "10% 할인",
    what: "성인은 약 ¥1,800입니다. 일몰이나 야경을 보러 가는 경우에는 패스로 무료 입장할 수 없습니다",
  },
];

const floorRows = [
  { floor: "RF(옥상)", what: "360도 야외 전망 층입니다. 일본어 사이트에는 루미 스카이 워크(Lumi Sky Walk)도 이 층에 적혀 있습니다", ticket: "필요 — 폭우 시 폐쇄될 수 있음" },
  { floor: "40F", what: "카페 SKY 40과 창가 카운터석이 있는 실내 층", ticket: "필요" },
  { floor: "39F", what: "매표소, 기념품 숍, 중식당 Sangu, 스카이 라운지 스타더스트", ticket: "매표소와 숍이 있는 층" },
  { floor: "35F~39F", what: "두 타워 사이의 빈 공간을 지나 전망대로 올라가는 길", ticket: "사무실용 엘리베이터가 아니라 전망대 전용 입구로 올라갑니다" },
  { floor: "B1F~1F", what: "다키미코지 — 음식점과 상점이 모인 쇼와 레트로 거리로, ATM과 우체국도 있습니다", ticket: "불필요" },
];

const hoursRows = [
  { what: "전망대 운영", when: "9:30 ~ 22:30" },
  { what: "입장 마감", when: "22:00" },
  { what: "휴무일", when: "운영사 사이트에 정기 휴무일은 적혀 있지 않습니다. 요도가와 불꽃놀이 같은 특별 영업일은 특별 입장권과 별도 시간으로 운영합니다" },
  { what: "악천후", when: "폭우 시 야외 옥상은 폐쇄될 수 있습니다. 39층과 40층은 실내입니다" },
  { what: "오사카 주유패스 무료 입장", when: "9:30 ~ 15:00만 해당, 15:00부터 22:00까지는 10% 할인" },
  { what: "관람 소요 시간", when: "1~2시간(클룩 상품 페이지 기준)" },
];

const sunsetRows = [
  { date: "11월~2월", sunset: "16:47 ~ 17:53", note: "겨울에는 날짜에 따라 약 16:00~17:15 사이에 입장하세요. 날짜별 시간은 아래 표를 참고하세요" },
  { date: "11월 1일", sunset: "17:05", note: "16:30쯤까지 입장" },
  { date: "11월 15일", sunset: "16:54", note: "16:15쯤까지 입장" },
  { date: "11월 30일", sunset: "16:47", note: "1년 중 일몰이 가장 이른 날이 이 무렵, 11월 말과 12월 초에 걸쳐 있습니다" },
  { date: "12월 1일", sunset: "16:47", note: "골든아워가 오후 중반에 시작되므로 주유패스 무료 입장 시간(15:00 전) 안에 들어갑니다" },
  { date: "12월 15일", sunset: "16:49", note: "16:10쯤까지 입장" },
  { date: "12월 31일", sunset: "16:57", note: "17:30쯤 어두워지고, 폐관까지 야경을 볼 수 있는 시간이 5시간 남습니다" },
  { date: "1월 1일", sunset: "16:58", note: "16:15쯤까지 입장(2026년 표 기준)" },
  { date: "1월 15일", sunset: "17:10", note: "16:30쯤까지 입장(2026년 표 기준)" },
  { date: "2월 1일", sunset: "17:27", note: "16:45쯤까지 입장(2026년 표 기준)" },
  { date: "2월 15일", sunset: "17:41", note: "17:00쯤까지 입장(2026년 표 기준)" },
  { date: "2월 28일", sunset: "17:53", note: "17:10쯤까지 입장(2026년 표 기준)" },
  { date: "3월 31일", sunset: "18:18", note: "벚꽃 시즌으로, 오사카에서 1년 중 가장 붐비는 2주입니다" },
  { date: "7월 1일", sunset: "19:15", note: "1년 중 일몰이 가장 늦습니다. 18:30까지 입장하세요" },
  { date: "9월 1일", sunset: "18:25", note: "옥상이 따뜻하고 해 질 녘이 길어 일몰 일정을 잡기 가장 쉽습니다" },
  { date: "9월 30일", sunset: "17:44", note: "일몰이 이미 18:00 전으로 당겨졌고, 빠르게 더 이르게 됩니다" },
];

const choiceRows = [
  {
    situation: "낮에 방문하고, 같은 날 다른 유료 관광지를 2곳 이상 이용",
    pick: "오사카 주유패스로 15:00 전에 전망대 입장",
    why: "전망대(¥2,000), 오사카성(¥1,200), HEP FIVE 대관람차(¥1,000)를 더하면 패스 가격보다 많습니다. 15:00 이후에는 이 전망대에서 패스가 10% 할인만 됩니다",
  },
  {
    situation: "일몰이나 야경이 목적이고, 그날 다른 유료 관광지는 없음",
    pick: "전망대 입장권 1장 — 매표소 또는 온라인",
    why: "입장 시간 지정이 없고 매진되지도 않으므로, 온라인 예매로 얻는 것은 입장 시간 확보가 아니라 한국어 결제 화면과 해외 발급 카드 결제입니다",
  },
  {
    situation: "오사카 첫날, 경로를 직접 짜지 않고 오사카성, 전망대, 도톤보리를 보고 싶음",
    pick: "우메다가 포함된 가이드 동행 당일 투어",
    why: "집합 장소도 예약도 한 번이면 됩니다. 결제 전에 상품 페이지에서 방문지와 취소 기한을 확인하세요",
  },
];

const deckRows = [
  {
    deck: "우메다 스카이빌딩(공중정원)",
    height: "173m — 39층, 40층, 야외 옥상",
    price: "성인 ¥2,000 / 4~12세 ¥500",
    hours: "9:30 ~ 22:30(입장 마감 22:00)",
    area: "우메다 — JR 오사카역에서 도보 7분",
    pass: "15:00 전에는 주유패스로 무료, 이후에는 10% 할인",
  },
  {
    deck: "하루카스 300(아베노 하루카스)",
    height: "운영사가 일본에서 가장 높은 빌딩이라고 소개하는 건물의 최상층으로, 58층에 지붕 없는 전망 공간이 있습니다",
    price: "매표소 성인 ¥2,200 / 어린이 ¥900, 웹 사전 구매 ¥1,980 / ¥810",
    hours: "9:00 ~ 22:00(입장 마감 21:30)",
    area: "덴노지 — 긴테쓰 오사카아베노바시역 바로 위",
    pass: "주유패스 이용 시설 목록에 없습니다",
  },
  {
    deck: "쓰텐카쿠",
    height: "신세카이를 대표하는 전망 타워",
    price: "성인(15세 이상) ¥1,500(12월 30일~1월 3일은 ¥1,800)",
    hours: "9:00 ~ 21:45(입장 마감 21:15)",
    area: "신세카이 — 에비스초 / 도부쓰엔마에",
    pass: "주유패스로 무료지만, 시설에서 입장 시간을 예약해야 합니다",
  },
];

const whoFor = [
  {
    title: "15:00 전에 가야 하는 경우",
    desc: `오사카 주유패스가 있다면 15:00 전에 가세요. 패스 무료 입장은 15:00에 끝나고, 그 뒤로는 10% 할인이므로 무료 대신 약 ¥1,800을 내게 됩니다. 패스로 이 전망대를 무료로 이용하려면 오전이나 이른 오후에 방문해야 합니다. ${CHECKED} 확인.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "일몰 시간에 가야 하는 경우",
    desc: "오사카의 다른 전망대에는 없는 지붕 없는 360도 야외 옥상에서 도시의 불빛이 켜지는 모습을 보고 싶다면 일몰 시간에 가세요. 일몰 30~45분 전에 입장하면 입장권 1장으로 낮 풍경, 골든아워, 야경을 모두 볼 수 있습니다. 오사카의 일몰 시간은 1년 동안 2시간 30분 가까이 달라지므로 아래 일몰 표를 확인하세요.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "늦은 시간에 가야 하는 경우",
    desc: `한산한 전망대를 원한다면 늦게 가세요. 22:30까지 운영하고 입장 마감은 22:00으로, 하루카스 300과 쓰텐카쿠보다 늦고 한여름에도 일몰 후 2시간 넘게 남습니다. 21:00에 입장하면 같은 풍경을 훨씬 적은 인파 속에서 볼 수 있고, 그 시간에도 매표소에서 입장권을 살 수 있습니다. 운영 시간은 ${CHECKED}에 확인했습니다.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "입장권보다 방문 시간을 먼저 정하세요",
    desc: "이 페이지에서 가장 중요한 결정입니다. 15:00 전에는 주유패스로 무료 입장할 수 있지만, 일몰 시간에는 무료 입장이 안 됩니다. 일몰 시간 방문이 더 만족스럽고 패스를 쓰면 더 저렴한데, 두 가지를 동시에 할 수는 없습니다. 어느 쪽을 우선할지 먼저 정하세요.",
  },
  {
    title: "방문 날짜의 일몰 시간을 확인하세요",
    desc: "오사카의 일몰은 12월 초 16:47부터 7월 초 19:15까지 2시간 30분 가까이 차이가 납니다. 골든아워가 오후 중반이 되느냐 19:00 무렵이 되느냐가 여기서 갈립니다. 아래 표에 1년의 기준이 되는 날짜의 공식 일몰 시간을 정리했습니다.",
  },
  {
    title: "한국어 결제 화면이나 해외 발급 카드가 필요하면 미리 예매하세요",
    desc: "입장 시간 지정이 없고 39층 매표소에서 현금이나 신용카드로 입장권을 살 수 있으므로, 사전 예매는 입장 보장이 아니라 편의를 위한 것입니다. 운영사 일본어 사이트에서는 asoview를 통해 날짜를 지정하는 더 저렴한 웹 입장권을 판매하고, 클룩에서는 같은 입장권을 해외 발급 카드로 결제하고 스캔용 코드를 받을 수 있습니다. 취소 규정은 상품마다 다르므로 결제 전에 예약 화면에서 확인하세요.",
  },
  {
    title: "에스컬레이터 구간에 15분을 더 잡으세요",
    desc: "매표소는 39층에 있고, 35층에서 두 타워 사이의 빈 공간을 가로지르는 투명 에스컬레이터를 타고 올라갑니다. 이 에스컬레이터는 그 자체로 사진 명소이자 이 빌딩이 엽서에 실리는 이유이므로, 이동 시간도 관람의 일부로 생각하세요.",
  },
  {
    title: "실내가 아니라 옥상에 맞는 옷차림을 하세요",
    desc: "최상층은 높이 173m의 360도 야외 옥상이고 머리 위를 가리는 것이 없습니다. 1년 내내 거리보다 바람이 강하고 춥고, 이 층에는 비바람을 막을 곳이 없습니다. 아래의 40층은 실내이며, 창가를 따라 35m 길이의 유리 카운터가 있습니다. 겨울에는 겉옷을 한 겹 더 챙기고, 바람에 머리가 흐트러질 것을 각오하세요.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "우메다 스카이빌딩 입장료는 얼마인가요?",
    a: `우메다 스카이빌딩 입장료는 성인 ¥2,000, 4~12세 어린이 ¥500이고 4세 미만은 무료입니다. 장애인 수첩 소지자는 ¥1,000 / ¥250, 10명 이상 단체는 ¥1,800 / ¥450입니다. 오사카 주유패스가 있으면 9:30부터 15:00까지 무료이고, 15:00부터 22:00까지는 10% 할인됩니다. skybldg.co.jp 공식 요금이며 ${LAST_CHECKED}에 확인했습니다.`,
  },
  {
    q: "우메다 스카이빌딩 운영 시간과 관람 소요 시간은 어떻게 되나요?",
    a: `공중정원 전망대는 9:30부터 22:30까지 운영하고 입장 마감은 22:00이며, 운영사 사이트에 정기 휴무일은 적혀 있지 않습니다. 관람에는 1~2시간을 잡으세요(클룩 상품 페이지 기준). 요도가와 불꽃놀이 같은 특별 영업일은 특별 입장권과 별도 시간으로 운영하고, 폭우 시 야외 옥상은 폐쇄될 수 있습니다. 운영 시간은 ${LAST_CHECKED}에 확인했습니다.`,
  },
  {
    q: "우메다 스카이빌딩 입장권은 언제 판매를 시작하나요?",
    a: `판매 시작일은 따로 없습니다. 전망대에는 입장 시간 지정이 없고, 39층 매표소에서 9:30부터 입장 마감 22:00까지 당일 입장권을 판매합니다. 요금은 성인 ¥2,000, 4~12세 ¥500입니다. 요도가와 불꽃놀이 같은 특별 영업일에만 정해진 시간의 특별 입장권이 필요합니다. 공식 사이트 ${LAST_CHECKED_ISO} 확인.`,
  },
  {
    q: "우메다 스카이빌딩은 미리 예매해야 하나요?",
    a: "필요 없습니다. 입장 시간 지정이 없고 39층 매표소에서 당일 입장권을 판매합니다. 사전 예매는 편의를 위한 것으로, 운영사 영어 사이트가 연결하는 클룩에서 한국어 결제 화면으로 해외 발급 카드 결제를 할 수 있습니다. 붐비는 시간은 일몰 전 1시간과 주유패스 무료 입장이 끝나는 15:00 직전이고, 가장 한산한 시간은 오전 중반과 21:00 이후입니다. 오사카 주유패스가 있고 15:00 전에 도착한다면 입장권을 따로 살 필요가 없습니다.",
  },
  {
    q: "우메다 스카이빌딩의 일몰 시간은 언제인가요?",
    a: "일본 국립천문대의 2026년 오사카 표에 따르면 11월부터 2월까지 오사카의 일몰은 16:47~17:53입니다. 11월 1일 17:05, 11월 15일 16:54, 11월 30일과 12월 1일 16:47, 12월 31일 16:57, 1월 15일 17:10, 2월 15일 17:41입니다. 여름에는 7월 1일 19:15로 가장 늦습니다. 일몰 30~45분 전에 입장하면 입장권 1장으로 낮 풍경, 골든아워, 야경을 모두 볼 수 있습니다.",
  },
];

const tripPrepItems = [
  withKlookLocale(umedaSkySameDayPrep[0], LOCALE, {
    label: "오사카 푸드 투어",
    ctaLabel: "오사카 푸드 투어 보기 →",
    why: "전망대를 본 뒤의 저녁 일정입니다. 미도스지선으로 우메다에서 난바까지 이동할 수 있고, 도톤보리 중심가 뒷골목을 3시간 동안 걸으며 구시카쓰, 다코야키, 숨은 이자카야, 현지 디저트를 맛보는 그룹 투어입니다.",
  }),
  withKlookLocale(umedaSkySameDayPrep[1], LOCALE, {
    label: "오사카 우메다 호텔",
    ctaLabel: "우메다 호텔 보기 →",
    why: "전망대는 22:30까지 운영하므로, 오사카역 주변에 숙소를 잡으면 늦게 관람해도 몇 분만 걸어서 돌아갈 수 있습니다.",
  }),
  withKlookLocale(umedaSkySameDayPrep[2], LOCALE, {
    label: "하루카 특급(간사이 공항 ⇄ 오사카)",
    ctaLabel: "하루카 티켓 보기 →",
    why: "간사이 공항에서 전망대까지 걸어가는 오사카역까지 바로 갑니다. 클룩 상품 페이지에 따르면 단기 체류 도장이 있는 외국 여권 소지자만 구매할 수 있습니다.",
  }),
  withKlookLocale(umedaSkySameDayPrep[3], LOCALE, {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "클룩 입장권은 휴대폰으로 받는 전자 티켓이고, 오사카역에서 걸어가는 길에는 지하도가 있어 모바일 데이터로 지도를 보면 도움이 됩니다.",
  }),
];

const tourPicks = [
  withKlookLocale(osakaCastleUmedaTonboriDayTour, LOCALE, {
    title: "오사카성, 우메다 스카이빌딩, 톤보리 리버크루즈 당일 투어",
    desc: "오사카성, 우메다 전망대, 도톤보리 리버크루즈를 가이드와 함께 하루에 도는 투어로, 경로는 가이드가 정합니다.",
  }),
  withKlookLocale(osakaPrivateWalkingTour, LOCALE, {
    title: "오사카 프라이빗 반일 / 종일 워킹 투어",
    desc: "영어나 일본어를 하는 전용 가이드와 난바, 신사이바시 일대를 원하는 경로로 걷습니다.",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "우메다 스카이빌딩" }];

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
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.86rem" }}>
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

function LastChecked({ url, label }: { url: string; label: string }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      최종 확인: {LAST_CHECKED_ISO} — 출처:{" "}
      <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
    </p>
  );
}

export default function KoUmedaSkyBuildingTicketsPage({ updated }: { updated: PageUpdated }) {
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
            오사카역에서 걸어서 7분, 우메다 상공 173m에 있는 야외 원형 옥상 전망대입니다. 입장권은 한 종류이고 입장 시간
            지정도 없습니다. 다만 주유패스 무료 입장이 15:00에 끝나므로, 패스를 살지는 이 시간을 기준으로 정하세요.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 요금과 확인 날짜", "계절별 오사카 일몰 시간"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>입장료</p>
                <p className={styles.verdictStatValue}>성인 ¥2,000 / 어린이 ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>운영 시간</p>
                <p className={styles.verdictStatValue}>9:30~22:30, 입장 마감 22:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>가는 방법</p>
                <p className={styles.verdictStatValue}>JR 오사카역에서 도보 7분</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>오사카 주유패스</p>
                <p className={styles.verdictStatValue}>15:00 전에만 무료</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              우메다 스카이빌딩 입장료는 <strong>성인 ¥2,000</strong>, <strong>4~12세 어린이 ¥500</strong>이고, 공중정원
              전망대는 <strong>9:30부터 22:30까지, 입장 마감 22:00</strong>입니다(공식 사이트 skybldg.co.jp,{" "}
              {LAST_CHECKED_ISO} 확인). 입장권은 판매 시작일도 입장 시간 지정도 없으며, 39층 매표소에서 당일에 현금이나
              신용카드로 살 수 있습니다. 관람에는 <strong>1~2시간</strong>이 걸립니다. <strong>오사카 주유패스 무료 입장은
              9:30부터 15:00까지만</strong>이며, 11월 오사카의 일몰은 16:47~17:05입니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                클룩에서 우메다 스카이빌딩 티켓 보기 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                오사카 주유패스 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>우메다 스카이빌딩 입장권: 요금, 운영 시간, 구매 방법</h2>
          <p className={styles.bodyText}>
            우메다 스카이빌딩 입장권은 <strong>성인 ¥2,000, 4~12세 어린이 ¥500</strong>이고 4세 미만은 무료입니다.
            전망대는 <strong>9:30부터 22:30까지 운영하고 입장 마감은 22:00</strong>이며, 세 층을 모두 둘러보는 데 1~2시간이면
            충분합니다. 겨울(11월~2월) 오사카의 일몰은 <strong>16:47~17:53</strong>이므로, 일몰을 보려면 약 16:00~17:15
            사이에 입장하세요.
          </p>
          <p className={styles.bodyText}>
            입장권은 <strong>당일 39층 매표소</strong>에서 사거나 <strong>온라인으로 미리 예매</strong>할 수 있습니다.
            온라인은 운영사 영어 사이트가 연결하는 클룩(한국어), 또는 asoview의 날짜 지정 웹 입장권(일본어)이
            있습니다({CHECKED} 확인). <strong>오사카 주유패스로는 9:30부터 15:00까지 무료</strong>이고 15:00부터
            22:00까지는 10% 할인이므로, 낮 방문에는 쓸 수 있지만 일몰 방문에는 쓸 수 없습니다. 패스가 이득인 조건은{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              오사카 주유패스 손익 계산표(영어)
            </Link>
            에서 확인하세요. 요금과 운영 시간은 {LAST_CHECKED}에 운영사 사이트에서 확인했습니다.
          </p>
          <p className={styles.bodyText}>
            높이 173m의 40층 타워 두 동을 꼭대기에서 원형 구조물이 잇고 있습니다. 이 독특한 모양 때문에 오사카 엽서에
            빠지지 않고 등장합니다. 유료 구역은 &apos;공중에 뜬 정원&apos;이라는 뜻의 <strong>공중정원 전망대</strong>로, 세
            층으로 이루어져 있습니다. 입장권을 사고 스캔하는 <strong>39층</strong>, 창가를 따라 35m 길이의 유리 카운터가
            있는 실내 <strong>40층</strong>, 그리고 그 위에 머리 위를 가리는 것 없이 360도를 한 바퀴 도는{" "}
            <strong>야외 옥상</strong>입니다.
          </p>
          <p className={styles.bodyText}>
            올라가는 길도 볼거리입니다. 35층에서 39층까지 두 타워 사이의 빈 공간을 가로지르는 투명 에스컬레이터가 있는데,
            이 빌딩에서 가장 유명한 사진 장소이자 매표소가 1층이 아니라 위층에 있는 이유입니다. 층 구성과 교통편은{" "}
            {CHECKED}에 오사카 공식 관광 사이트에서 확인했습니다.
          </p>
          <p className={styles.bodyText}>
            입장 시간을 지정하는 도쿄의 전망대와 달리 여기에는 미리 정할 것이 없습니다. 15분 단위 입장 시간도, 판매 시작일도,
            일몰 시간대 경쟁도 없습니다. 대신 <strong>주유패스 무료 입장이 15:00에 끝난다</strong>는 조건이 있고, 대부분의
            방문객은 이 조건에 맞춰 일정을 정하게 됩니다. 이 페이지에서는 요금, 운영 시간, 일몰 시간 계산, 그리고 이 한
            가지 결정을 정리합니다.
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            층별 안내 — 옥상부터 지하까지
          </h3>
          <Table head={["층", "있는 시설", "입장권 필요 여부"]} rows={floorRows.map((r) => [r.floor, r.what, r.ticket])} />
          <p className={styles.bodyText} style={noteStyle}>
            층별 정보는 운영사의 영어와 일본어 전망대 페이지에서 {CHECKED}에 확인했습니다. 일본어 페이지는 옥상 층에 루미
            스카이 워크라는 이름만 적고 설명을 싣지 않으므로, 이 페이지에서도 설명하지 않습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>판매 시작일</span>
          <h2 className={styles.sectionTitle}>우메다 스카이빌딩 입장권은 언제 판매를 시작하나요?</h2>
          <p className={styles.bodyText}>
            <strong>우메다 스카이빌딩 입장권은 판매 시작일이 따로 없습니다.</strong> 입장 시간 지정이 없고, 39층 매표소에서
            9:30부터 입장 마감 22:00까지 당일 입장권을 성인 ¥2,000, 4~12세 ¥500에 판매합니다. 예외는 요도가와 불꽃놀이 같은
            특별 영업일뿐이며, 이때는 정해진 시간의 특별 입장권이 필요하다고 운영사가 안내합니다(skybldg.co.jp,{" "}
            {LAST_CHECKED_ISO} 확인).
          </p>
          <p className={styles.bodyText}>
            온라인에서는 운영사 일본어 사이트가 asoview를 통해 날짜 지정 웹 입장권을 판매하고, 클룩에서는 같은 입장권을 영어
            결제 화면에서 해외 발급 카드로 살 수 있습니다. 판매 시작을 기다릴 필요가 없으니 오사카 일정이 정해지면 원하는
            곳에서 예매하세요. 간사이 여행의 한 일정으로 들른다면{" "}
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" style={linkStyle}>
              오사카·교토 3일 일정(영어)
            </Link>
            에서 오사카 날에 전망대를 넣었고,{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              일본 관광지 입장권 가격표(영어)
            </Link>
            에서는 미리 매진되는 다른 관광지를 확인할 수 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 원하는 날짜의 우메다 스카이빌딩 티켓 보기 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금</span>
          <h2 className={styles.sectionTitle}>우메다 스카이빌딩 입장료는 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            입장료는 운영사의 공식 매표소 요금으로 <strong>성인 ¥2,000</strong>, <strong>4~12세 어린이 ¥500</strong>입니다.
            나이별로 요금이 하나씩이고 시간대별 할증도 없습니다. 달라지는 것은 패스뿐이며, 패스 무료 입장에는 시간 제한이
            있습니다.
          </p>
          <Table head={["대상 / 시간", "요금", "참고"]} rows={priceRows.map((r) => [r.tier, r.price, r.what])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/(공식)" />
          <p className={styles.bodyText} style={noteStyle}>
            패스 관련 행은 {CHECKED}에 확인한 오사카 주유패스 운영사의 이용 시설 목록과 같습니다. 요금은 바뀔 수 있으니 구매
            전에 확인하세요. 이 사이트에서 다루는 일본 각지의 입장권은 확인 날짜와 함께{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              일본 관광지 입장권 가격표(영어)
            </Link>
            에 정리했습니다.
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            우메다 스카이빌딩 어린이 입장료는 얼마인가요?
          </h3>
          <p className={styles.bodyText}>
            <strong>4~12세는 ¥500이고 4세 미만은 무료</strong>로, 성인 요금의 4분의 1입니다. 13세부터는 성인 입장권
            ¥2,000이 적용됩니다. 장애인 수첩이 있는 어린이는 ¥250, 10명 이상 단체의 어린이는 ¥450입니다. 전망대를 넣은 가족
            일정은{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>
              오사카 2일 일정(영어)
            </Link>
            에서 둘째 날, 수족관 다음이자 주유패스 무료 입장이 끝나는 15:00 전에 넣었습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>운영 시간</span>
          <h2 className={styles.sectionTitle}>우메다 스카이빌딩 운영 시간은 어떻게 되나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            전망대는 <strong>9:30부터 22:30까지 운영하고 입장 마감은 22:00</strong>이며, 운영사가 정기 휴무일을 따로 적지
            않았습니다. 관람에는 1~2시간을 잡으세요.
          </p>
          <Table head={["", "시간"]} rows={hoursRows.map((r) => [r.what, r.when])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/(공식)" />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>22:30 폐관</strong>은 이 전망대의 숨은 장점입니다. 하루카스 300(22:00)과 쓰텐카쿠 일반 전망대(21:45)보다
            늦고, 오사카의 일몰이 19:15까지 늦어지는 한여름에도 일몰 후 3시간이 남습니다. 하루 일정이 이미 꽉 찼다면
            저녁 식사 후에 들를 수 있는 관광지입니다. 특별 영업일은 별도 입장권으로 운영하므로, 요도가와 불꽃놀이처럼 큰
            행사가 있는 날에는 미리 사이트를 확인하세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>추천 시간대</span>
          <h2 className={styles.sectionTitle}>우메다 스카이빌딩의 일몰 시간은 언제인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            11월부터 2월까지 오사카의 일몰은 <strong>16:47~17:53</strong>이고, 7월 초에는 19:15까지 늦어집니다.{" "}
            <strong>일몰 30~45분 전에 입장</strong>하면 입장권 1장으로 야외 옥상에서 낮 풍경, 골든아워, 야경을 모두 볼 수
            있습니다. 아래는 일본 국립천문대가 발표한 2026년 오사카 일몰 시간입니다. 2027년 날짜는 같은 국립천문대 페이지의
            해당 연도 표를 확인하세요.
          </p>
          <Table head={["날짜", "오사카 일몰", "옥상 관람 기준"]} rows={sunsetRows.map((r) => [r.date, r.sunset, r.note])} />
          <LastChecked url={NAOJ_URL} label="일본 국립천문대 오사카 일출·일몰 표(공식)" />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            여기서 알 수 있는 점이 두 가지 있습니다. 첫째, <strong>겨울에는 일몰이 패스 무료 입장 시간 안에 들어오지만 여름에는
            그렇지 않습니다</strong>. 12월 1일에는 15:00 전에 골든아워가 시작되므로 패스 소지자도 무료 입장과 노을을 함께 볼 수
            있지만, 7월 1일에는 일몰이 패스 무료 입장 마감 4시간 뒤입니다. 둘째, 전망대는 계절과 관계없이 해가 진 뒤에도 오래
            운영하므로 노을을 놓쳐도 관람을 놓친 것은 아닙니다. 옥상에서 보는 야경도 입장료에 포함된 볼거리이고, 노을보다 보기
            쉽습니다.
          </p>
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 우메다 스카이빌딩 티켓 보기 →
            </KlookLink>
            <KlookLink href={NIGHT_BUS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              오사카역 출발 야경 버스 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>혼잡도</span>
          <h2 className={styles.sectionTitle}>얼마나 붐비고, 언제 가장 한산한가요?</h2>
          <p className={styles.bodyText}>
            이곳에는 예약 시스템이 없습니다. 그래서 매진되지 않는 대신 옥상에 올라가는 인원도 제한되지 않습니다. 붐비는
            시간은 추측이 아니라 입장 방식을 보면 예상할 수 있습니다. <strong>일몰 전 1시간</strong>은 모두가 서쪽 난간 20m
            정도에 몰리기 때문에 가장 붐빕니다. <strong>15:00 직전</strong>도 덜 알려진 혼잡 시간으로, 오사카 주유패스와 오사카
            e-패스의 무료 입장이 모두 이때 끝나기 때문입니다.
          </p>
          <p className={styles.bodyText}>
            가장 한산한 유료 시간대는 그 앞뒤입니다. 9:30 이후 오전 중반, 그리고 저녁 21:00쯤부터는 풍경은 같고 입장 마감까지
            아직 1시간이 남습니다. 벚꽃 시즌(3월 말~4월 중순)과 여름방학에는 오사카 전체가 붐비며, 위 표의 3월 31일이 바로 이
            기간입니다. 전망대 방문과 하루 일정을 함께 짜려면{" "}
            <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>
              오사카에서 즐길 거리(영어)
            </Link>
            를 참고하세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>우메다 스카이빌딩과 아베노 하루카스, 어디가 더 나을까요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>야외 옥상, 늦은 폐관 시간, 오사카역과 가까운 위치를 원한다면 우메다 스카이빌딩이 더 낫습니다.</strong>{" "}
            우메다는 ¥2,000이고 하루카스 300은 매표소 ¥2,200(웹 사전 구매 ¥1,980)이며, 우메다가 30분 늦게까지 운영합니다.
            야외보다 높이가 중요하다면 아베노 하루카스를 고르세요. 오사카의 유료 전망대 세 곳은 성격이 뚜렷이 다릅니다. 한 곳은
            가장 높고, 한 곳은 하늘이 트여 있고, 한 곳은 가장 저렴하며 옛 신세카이 지역에 있습니다. 다른 비교 글에서 잘 다루지
            않는 패스 열이 실제 비용을 가장 크게 좌우합니다.
          </p>
          <Table
            head={["전망대", "높이 / 구성", "성인 요금", "운영 시간", "지역", "오사카 주유패스"]}
            rows={deckRows.map((r) => [r.deck, r.height, r.price, r.hours, r.area, r.pass])}
          />
          <LastChecked url={HARUKAS_URL} label="abenoharukas-300.jp(공식), 우메다는 skybldg.co.jp" />
          <p className={styles.bodyText} style={noteStyle}>
            우메다와 하루카스 300 행은 {LAST_CHECKED}에 다시 확인했고, 쓰텐카쿠 행(tsutenkaku.co.jp)과 패스 열(오사카
            주유패스 운영사의 이용 시설 목록)은 {CHECKED}에 확인했습니다. 우메다의 높이 173m는 오사카 공식 관광 사이트
            기준입니다. 두 가지 차이에 주의하세요. <strong>하루카스 300은 주유패스 이용 시설 목록에 없으므로</strong> 패스를
            쓰는 날에도 요금을 내야 하고, <strong>쓰텐카쿠는 패스가 있어도 시설에서 입장 시간을 예약해야</strong> 합니다. 다른
            두 곳은 그렇지 않습니다. 내용은 바뀔 수 있으니 여행 전에 확인하세요.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>오사카역에서 우메다 스카이빌딩까지 어떻게 가나요?</h2>
          <p className={styles.bodyText}>
            걸어서 갑니다. <strong>JR 오사카역에서 도보 7분</strong>, <strong>한큐 오사카우메다역이나 오사카 메트로
            우메다역에서 약 9분</strong>이며, 신우메다시티 구역을 지나 북서쪽으로 걸어갑니다(오사카 공식 관광 사이트 기준, 같은
            사이트의 다른 페이지에는 약 10분으로 적혀 있습니다). 7분보다 길게 느껴지는 이유는 선로 때문입니다. 운영사가 안내하는
            각 역에서의 경로에는 선로 아래를 지나는 40m 지하도가 있어서, 걷는 동안 잠시 빌딩이 보이지 않습니다. 그대로 계속 가면
            다시 보입니다. 건물 안에서는 사무실용 엘리베이터가 아니라 전망대 전용 입구를 이용하세요.
          </p>
          <p className={styles.bodyText}>
            우메다는 미도스지선의 북쪽 거점이라, 오사카 시내 어디에서든 오사카역까지 가기는 쉽습니다.{" "}
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>
              오사카 교통 가이드(영어)
            </Link>
            에서 미도스지선이 우메다, 난바, 덴노지를 어떻게 잇는지 설명했고,{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={linkStyle}>
              오사카 메트로 패스 가이드(영어)
            </Link>
            에서는 여러 곳을 들르는 날에 1일권이 교통카드보다 저렴한지 계산했습니다. 숙소 지역으로 우메다와 난바를 비교한{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>
              오사카 숙소 지역 가이드(영어)
            </Link>
            도 있습니다. 도보 시간은 {CHECKED}에 확인했습니다. 우메다·오사카역은 유니버설 스튜디오 재팬으로 가는 JR
            유메사키선을 이용하기 좋은 거점이기도 하며, 파크 날짜에 필요한 익스프레스 패스는{" "}
            <Link href="/ko/guides/attractions/usj-tickets-express-pass" style={linkStyle}>
              유니버설 재팬 익스프레스 패스 가이드
            </Link>
            에서 4·7 차이와 매진 시기를 확인하세요.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>단계별 안내</span>
          <h2 className={styles.sectionTitle}>우메다 스카이빌딩은 미리 예매해야 하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>필요 없습니다.</strong> 입장 시간 지정이 없고, 39층 매표소에서 당일에 현금이나 신용카드로 입장권을 살 수
            있습니다. 미리 예매하는 것은 편의를 위해서입니다. 한국어 결제 화면에서 해외 발급 카드로 결제하려면 클룩, 일본어를 읽을
            수 있다면 운영사의 더 저렴한 날짜 지정 웹 입장권(asoview)을 이용하세요. 오사카 주유패스가 있고 15:00 전에 도착한다면
            아무것도 살 필요가 없습니다.
          </p>
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
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            어떤 우메다 스카이빌딩 입장권을 고를까요?
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>방문 시간에 맞춰 고르세요.</strong> 당일 입장권은 매표소에서 팔고 매진되지 않지만, 일몰 전 1시간과 15:00
            직전은 붐빕니다. 온라인 예매는 상품마다 취소 규정이 다르므로 결제 전에 상품 페이지에서 확인하세요.
          </p>
          <Table head={["방문 유형", "추천", "이유"]} rows={choiceRows.map((r) => [r.situation, r.pick, r.why])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/(공식)" />
          <p className={styles.bodyText} style={{ marginTop: "0.5rem" }}>
            패스로 이용할 수 있는 시설 전체와 1일권, 2일권 계산은{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              오사카 주유패스 가이드(영어)
            </Link>
            에서 확인하세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 우메다 스카이빌딩 티켓 보기 →
            </KlookLink>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              낮에 간다면 오사카 주유패스 →
            </KlookLink>
            <KlookLink href={DAY_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              오사카성, 리버크루즈와 함께 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="같은 날 함께 예약"
          heading="우메다 스카이빌딩 입장권과 함께 무엇을 예약할까요?"
          intro="전망대 관람은 1~2시간이면 끝나지만, 하루에는 저녁 식사, 우메다 근처 숙소, 간사이 공항에서 오는 교통편, 휴대폰 모바일 데이터가 더 필요합니다. 아래 네 가지는 입장권과 같은 클룩 계정으로 예약할 수 있습니다. 가격은 적지 않았으니 상품 페이지에서 현재 요금을 확인하세요."
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>패스 문제</span>
          <h2 className={styles.sectionTitle}>오사카 주유패스로 우메다 스카이빌딩에 무료로 들어갈 수 있나요?</h2>
          <p className={styles.bodyText}>
            <strong>들어갈 수 있지만, 9:30부터 15:00까지만입니다.</strong> 우메다 스카이빌딩은 오사카 주유패스(와 오사카
            e-패스)로 무료 입장할 수 있는 40곳 이상의 시설 중 하나입니다. 하지만 빌딩 사이트와 패스 운영사의 이용 시설 목록 모두
            패스 입장을 <strong>15:00 전</strong>으로 제한합니다. 15:00부터는 <strong>10% 할인</strong>만 되므로, 저녁에 가면
            이미 낸 패스 요금 {PASS_1_DAY}에 더해 약 ¥1,800을 내야 합니다. 오사카 패스를 쓰는 날 가장 많은 돈을 잃는 오해인데,
            이 전망대를 다룬 글에서는 거의 언급하지 않습니다.
          </p>
          <p className={styles.bodyText}>
            패스 1일권 {PASS_1_DAY}(공식 요금, 2026년 11월 9일 확인)로 계산해 보면 다음과 같습니다.{" "}
            <strong>15:00 전 이 전망대(¥2,000)</strong>와 <strong>오사카성 천수각(¥1,200)</strong>을 더하면 입장료 ¥3,200으로
            패스 가격보다 조금 적으므로, 그날 지하철 요금까지 더해야 이득입니다. 우메다에서 5분 거리의{" "}
            <strong>HEP FIVE 대관람차(¥1,000)</strong>를 더하면 ¥4,200이 되어, 교통비를 빼고도 패스 가격을 넘습니다. 반대로
            저녁에 이 빌딩 한 곳만 가려고 패스를 사면 그대로 손해입니다. 포함 시설 전체 목록, 2일권 가격, 제외 시설은{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              오사카 주유패스 가격과 손익 계산표(영어)
            </Link>
            에 정리했고,{" "}
            <Link href="/guides/attractions/osaka-castle-tickets" style={linkStyle}>
              오사카성 입장권 가이드(영어)
            </Link>
            에서는 성벽 안에 유료 시설 세 곳이 있는 오사카성 쪽에서 같은 계산을 했습니다. 시설 이용 조건은 {CHECKED}에
            확인했습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 오사카 주유패스 보기 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              전망대 입장권만 →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="우메다 스카이빌딩 자주 묻는 질문" />

        <KlookTourPicks
          heading="오사카에서 보내는 나머지 하루"
          intro="옥상에서 1~2시간을 보내도 하루는 대부분 남고, 우메다는 도톤보리나 오사카성에서 보면 시내 북쪽 끝입니다. 첫 번째 투어는 오사카성과 전망대를 함께 돌고, 두 번째는 걸어서 도는 투어입니다. 클룩 가격은 날짜에 따라 달라지므로 상품 페이지에서 현재 요금과 집합 장소를 확인하세요."
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/ko/guides/attractions/dotonbori-river-cruise", title: "도톤보리 리버크루즈(2026): 요금, 운항 시간, 선착장" },
            { href: "/guides/attractions/osaka-castle-tickets", title: "오사카성 입장권(2026): 요금, 운영 시간, 패스 적용 범위(영어)" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "오사카 주유패스 2026: 가격, 살 만할까, 1일 일정(영어)" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "가이유칸 입장권(2026): 요금, 운영 시간, 입장 시간대(영어)" },
            { href: "/guides/attractions/things-to-do-osaka", title: "오사카에서 즐길 거리(2026): 패스가 이득인 곳과 아닌 곳(영어)" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "오사카 2일 일정(2026): 날짜별 코스와 예약(영어)" },
            { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "오사카·교토 3일 일정(2026): 날짜별 코스와 예약(영어)" },
            { href: "/guides/attractions/osaka-food-tour", title: "오사카 푸드 투어(2026): 어떤 투어로 무엇을 먹나(영어)" },
            { href: "/guides/attractions/where-to-stay-in-osaka", title: "오사카 숙소 지역 2026: 난바, 우메다, USJ 비교(영어)" },
            { href: "/guides/transport/osaka-transportation", title: "오사카 교통 가이드(2026): 지하철, 열차, 교통카드(영어)" },
            { href: "/guides/transport/osaka-metro-pass", title: "오사카 메트로 패스 2026: 1일권과 2일권 비교(영어)" },
            { href: "/guides/attractions/tokyo-observation-decks", title: "도쿄 전망대 비교(2026): 돈을 낼 만한 전망은 어디인가(영어)" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "일본 관광지 입장권 가격 2026: 공식 요금과 예약 규칙(영어)" },
            { href: "/guides/attractions", title: "일본에서 즐길 거리 더 보기(영어) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>방문 시간을 정한 다음 입장권을 고르세요</h2>
            <p className={styles.ctaBannerDesc}>
              이곳은 매진되지 않으므로 비용을 좌우하는 것은 방문 시간뿐입니다. 15:00 전에는 주유패스로 무료, 그 이후에는
              입장권 1장으로 더 좋은 빛과 야경을 볼 수 있습니다. 한국어 결제 화면에서 해외 발급 카드로 결제하려면 미리 예매하고,
              결제 전에 예약 화면의 취소 규정을 확인하세요.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                클룩에서 우메다 스카이빌딩 티켓 보기 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                오사카 주유패스 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
