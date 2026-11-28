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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  ghibliParkNagoyaBusTour,
  ghibliParkTicket,
  jrPassWholeJapan,
  klookEsim,
  legolandJapanHotelPackage,
  legolandJapanTicket,
  nagoyaArrivalShinkansenPrep,
  nagoyaParkStayAreas,
  shinkansenTokyoNagoya,
  shoryudoHighwayBusPass,
  takayamaShirakawagoNagoyaDayTrip,
  shirakawagoTakayamaOldTownDayTour,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import fares from "../../../../data/jr-fares.json";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/tokyo-to-nagoya-shinkansen) section by section as of
// 2026-11-28 (task jtk-20261127-TR03): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: 도쿄 나고야 신칸센 — the route as Korean results write it (ekitan.com/ko
// "도쿄에서 나고야 신칸센 요금 및 티켓 예약 방법", japan-bullettrain.com/ko).

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/transport/tokyo-to-nagoya-shinkansen";
const TITLE = "도쿄 나고야 신칸센 93분·¥11,100｜가격 2026";
const H1 = "도쿄 나고야 신칸센: 노조미 최단 93분, 지정석 ¥11,100";
const DESC =
  "도쿄 나고야 신칸센은 노조미로 최단 93분, 지정석 편도 ¥11,100(2026년 11월 확인). JR 패스는 히카리로 1시간 41분부터.";

const OWN_ISO = "2026-10-28";
const OWN = dateLabel(OWN_ISO, LOCALE);
const PARKS = dateLabel("2026-10-26", LOCALE);
const LAST_CHECKED = "2026-11-28";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);

const tokyoNagoya = fares.segments.find((s) => s.id === "tokyo-nagoya")!;
const WINDOW_FARE = `¥${tokyoNagoya.fareYen.toLocaleString("en-US")}`;
const FARE_AS_OF = monthLabel(`${fares.asOf}-01`, LOCALE);

const SMART_EX_NOZOMI = "¥11,100";
const SMART_EX_HIKARI = "¥10,890";
const NOZOMI_TICKET = "¥4,180";
const JR_PASS_7 = "¥50,000";
const KINTETSU_PASS_1 = "¥1,900";

const JRC_TRAININFO_URL = "https://traininfo.jr-central.co.jp/shinkansen/pc/en/ti04.html?station=1&bound=2";
const SMART_EX_PDF_URL = "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_reserved.pdf";
const NOZOMI_FASTEST = "1시간 33분";
const NOZOMI_RANGE = "1시간 33분~1시간 41분";
const HIKARI_RANGE = "1시간 41분~1시간 59분";
const KODAMA_RANGE = "2시간 36분~2시간 46분";
const NOZOMI_PER_DAY = 119;
const NOZOMI_FASTEST_MIN = "93분";

const SHINKANSEN_URL = klookFor(shinkansenTokyoNagoya.url, LOCALE);
const GHIBLI_TOUR_URL = klookFor(ghibliParkNagoyaBusTour.url, LOCALE);
const GHIBLI_TICKET_URL = klookFor(ghibliParkTicket.url, LOCALE);
const LEGOLAND_URL = klookFor(legolandJapanTicket.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const SHORYUDO_URL = klookFor(shoryudoHighwayBusPass.url, LOCALE);
const SHIRAKAWAGO_URL = klookFor(takayamaShirakawagoNagoyaDayTrip.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const answerRows = [
  {
    train: "노조미(가장 빠른 열차)",
    time: `${NOZOMI_RANGE}, 환승 없음`,
    fare: SMART_EX_NOZOMI,
    note: `도쿄에서 하루 ${NOZOMI_PER_DAY}편이 나고야에 정차하며 첫차는 06:00입니다. JR 패스로는 탈 수 없습니다`,
  },
  {
    train: "히카리",
    time: `${HIKARI_RANGE}, 환승 없음`,
    fare: SMART_EX_HIKARI,
    note: "도쿄에서 하루 30편. JAPAN RAIL PASS로 탈 수 있습니다",
  },
  {
    train: "고다마",
    time: `${KODAMA_RANGE}, 환승 없음`,
    fare: SMART_EX_HIKARI,
    note: "도쿄에서 하루 29편, 모든 역에 정차합니다",
  },
];

/** The eight 2026–27 periods JR Central lists, as the English page prints them. */
const nozomiAllReservedPeriods = [
  "2026년 4월 24일~5월 6일(골든위크)",
  "2026년 8월 7~16일(오봉)",
  "2026년 9월 18~23일",
  "2026년 10월 10~12일",
  "2026년 11월 21~23일",
  "2026년 12월 25일~2027년 1월 5일",
  "2027년 1월 9~11일",
  "2027년 3월 20~22일",
];

const routeRows = [
  {
    item: "도쿄 → 나고야 최단 소요 시간",
    value: `노조미 ${NOZOMI_FASTEST}`,
    detail: `환승 없음. 노조미 대부분은 1시간 35분~1시간 40분이며, 확인한 날의 전체 범위는 ${NOZOMI_RANGE}였습니다`,
    source: `JR 도카이 열차 운행 정보, ${CHECKED}`,
  },
  {
    item: "도쿄에서 출발해 나고야에 서는 노조미",
    value: `하루 ${NOZOMI_PER_DAY}편, 첫차 06:00`,
    detail: "모든 노조미가 나고야에 정차합니다. 대부분의 시간대에 몇 분 간격으로 열차가 있으므로, 시각표보다 내 티켓으로 어떤 열차를 탈 수 있는지를 기준으로 계획하면 됩니다",
    source: `JR 도카이 열차 운행 정보, ${CHECKED}`,
  },
  {
    item: "JR 패스로 타는 열차(히카리)",
    value: `${HIKARI_RANGE}, 환승 없음`,
    detail: "JAPAN RAIL PASS로는 노조미를 탈 수 없지만, 도쿄에서 나고야까지 바로 가는 히카리는 탈 수 있습니다(도쿄 출발 하루 30편). 늘어나는 시간은 1시간이 아니라 몇 분이므로, 도카이도 신칸센 구간 중 패스 소지자에게 가장 부담이 적은 구간입니다",
    source: `JR 도카이 열차 운행 정보, ${CHECKED}`,
  },
  {
    item: "고다마(모든 역 정차)",
    value: KODAMA_RANGE,
    detail: "도쿄 출발 하루 29편인 완행 열차입니다. 패스로 탈 수 있지만, 중간의 작은 역으로 갈 때만 탈 만합니다",
    source: `JR 도카이 열차 운행 정보, ${CHECKED}`,
  },
  {
    item: "이 구간에서 판매하는 좌석 등급",
    value: "보통차 자유석, 보통차 지정석, 그린차 지정석",
    detail: "클룩 노선 페이지에 나오는 세 가지 티켓입니다. 도카이도 신칸센에는 그랑 클래스가 없으며, 그랑 클래스는 도호쿠, 호쿠리쿠 신칸센의 차량입니다",
    source: `klook.com 철도 페이지, ${OWN}`,
  },
  {
    item: "시나가와에서 출발할 때",
    value: "같은 티켓, 같은 노조미 티켓 가격",
    detail: "도카이도 신칸센 노조미는 모두 도쿄역을 출발하고 몇 분 뒤 시나가와에 정차하며, JR은 패스 소지자용 노조미 티켓 가격을 \"도쿄/시나가와–나고야\" 하나로 정해 두었습니다. 도쿄의 남쪽이나 서쪽에 묵는다면 시나가와에서 타세요",
    source: `japanrailpass.net, ${OWN}`,
  },
];

const priceRows = [
  {
    item: "도쿄 → 나고야 편도, 보통차 지정석(노조미, 미즈호)",
    price: SMART_EX_NOZOMI,
    covers: "JR의 smartEX 온라인 가격(성인 1명, 통상기, 빠른 열차)입니다. 대부분의 승객이 내는 금액입니다",
    source: `smart-ex.jp smartEX 요금표, ${OWN}`,
  },
  {
    item: "히카리, 고다마, 사쿠라, 쓰바메의 같은 좌석",
    price: SMART_EX_HIKARI,
    covers: "같은 smartEX 요금표에서 ¥210 저렴하며, 노조미를 타지 않는 만큼의 할인입니다. 이 구간에서 느린 열차를 타면 약 15분이 더 걸립니다",
    source: `smart-ex.jp smartEX 요금표, ${OWN}`,
  },
  {
    item: "도쿄 → 나고야, 역 매표소",
    price: `약 ${WINDOW_FARE}`,
    covers: "기본 운임과 히카리 지정석 특급 요금의 합계입니다. 히카리는 JAPAN RAIL PASS로 추가 요금 없이 탈 수 있는 열차입니다",
    source: `이 사이트의 JR 요금 데이터, ${FARE_AS_OF} 기준. 운영사 요금표가 아닌 반올림한 참고값`,
  },
  {
    item: "패스 소지자용 노조미, 미즈호 티켓",
    price: `${NOZOMI_TICKET} 도쿄 또는 시나가와–나고야`,
    covers:
      "JAPAN RAIL PASS 소지자가 노조미를 탈 때마다 사는 전용 티켓입니다. JR은 \"그린차 티켓, 보통차 지정석 티켓, 보통차 자유석 티켓 모두 같은 가격\"이라고 안내합니다",
    source: `japanrailpass.net, ${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS 보통차",
    price: `온라인 7일 ${JR_PASS_7}, 14일 ¥80,000, 21일 ¥100,000`,
    covers: "해외 여행사의 교환권은 ¥53,000, ¥84,000, ¥105,000입니다. 그린차는 온라인 ¥70,000, ¥110,000, ¥140,000, 교환권 ¥74,000, ¥116,000, ¥147,000입니다",
    source: `JR 그룹 공식 가격표, ${OWN}`,
  },
  {
    item: "긴테쓰 레일 패스(이세 구간용)",
    price: `1일 ${KINTETSU_PASS_1}, 2일 ¥3,700, 5일 ¥4,900, 5일 플러스 ¥6,700`,
    covers: "긴테쓰의 외국인 여행자용 패스입니다. 긴테쓰 나고야에서 이세까지 가는 노선은 JR과 다른 철도 회사라 JR 패스로는 탈 수 없습니다",
    source: `kintetsu.co.jp 영어 패스 페이지, ${OWN}`,
  },
];

const compareRows = [
  {
    option: "편도마다 노조미 지정석 티켓",
    cost: `smartEX 편도 ${SMART_EX_NOZOMI}`,
    gets: `가장 빠른 직행 열차(최단 ${NOZOMI_FASTEST})이며, 환승도 없고 따로 사거나 계획할 것이 없습니다.`,
    pick: "기본 선택입니다. 편도 2장은 약 ¥22,200이고, 7일 패스는 공식 사이트 ¥50,000, 여행사 ¥53,000이므로 나고야 왕복만으로는 패스 가격에 한참 못 미칩니다.",
  },
  {
    option: "JAPAN RAIL PASS 7일 보통차로 히카리 이용",
    cost: `온라인 ${JR_PASS_7}`,
    gets: "전국의 JR 노선을 이용할 수 있고, 도쿄–나고야는 히카리로도 환승 없이 갑니다.",
    pick: "같은 주에 교토, 가나자와, 히로시마, 도호쿠도 간다면 고르세요. 나고야는 도카이도 신칸센 도시 중 패스로 가도 시간이 거의 늘지 않는 곳이라, 패스 일정의 중간 경유지로 가장 좋습니다.",
  },
  {
    option: "JAPAN RAIL PASS와 노조미 티켓",
    cost: `${JR_PASS_7}에 편도마다 ${NOZOMI_TICKET} 추가`,
    gets: "패스에 더해 가장 빠른 열차를 탈 수 있지만, 이 구간에서 히카리는 약 15분 느릴 뿐입니다.",
    pick: "이 구간에서는 거의 이득이 없습니다. ¥4,180을 내고 15분을 줄이는 셈입니다. 노조미 티켓은 차이가 1시간 15분인 도쿄–히로시마 구간에서 사세요.",
  },
  {
    option: "보통차 자유석",
    cost: "지정석보다 저렴하며, 차액은 지정석 요금만큼입니다",
    gets: "역에 가서 오는 열차를 바로 탈 수 있습니다. 단, 아래의 성수기 8개 기간에는 노조미 전 차량이 지정석입니다.",
    pick: `성수기가 아니고 짐이 가벼울 때. 도쿄 출발 노조미만 하루 ${NOZOMI_PER_DAY}편이므로 실제로 쓸 수 있는 방법이며, 하루 30편인 노선에서는 그렇지 않습니다.`,
  },
  {
    option: "쇼류도 고속버스 패스",
    cost: "이용 날짜의 상품 페이지에서 확인",
    gets: "나고야를 기점으로 주부 지역을 3일 또는 5일 동안 다니는 외국인 여행자용 고속버스 패스이며, 공항 연결 티켓이 포함됩니다.",
    pick: "도쿄 구간용이 아닙니다. 도착한 뒤 테마파크 한 곳만 다녀오는 일정이 아니라 다카야마, 시라카와고, 이세를 돌 계획일 때 쓰는 패스입니다.",
  },
  {
    option: "나고야 출발 가이드 투어",
    cost: "이용 날짜의 상품 페이지에서 확인",
    gets: "시라카와고와 다카야마 옛 거리, 또는 지브리 파크와 아이치 항공 박물관을 한 번의 예약으로 돕니다.",
    pick: "열차를 정한 뒤에 고르세요. 리니모 환승이나 예약제 산악 버스처럼 현지 연결이 번거로운 날에 맡기기 좋은 투어입니다.",
  },
];

const fromNagoyaRows = [
  {
    place: "지브리 파크(나가쿠테)",
    how: "나고야역 버스센터에서 메이테쓰 직행버스, 또는 히가시야마선으로 후지가오카까지 간 뒤 리니모",
    time: "직행버스로 40분",
    cost: "버스 성인 ¥1,200, 어린이 ¥600. 후지가오카에서 리니모 구간은 ¥400, ¥200",
    source: `메이테쓰 버스, 리니모 공식 사이트, ${PARKS}`,
  },
  {
    place: "레고랜드® 재팬(긴조후토)",
    how: "나고야역에서 아오나미선. 신칸센이 도착하는 같은 건물에서 출발합니다",
    time: "24분, 15.2km",
    cost: "성인 ¥360, 어린이 ¥180",
    source: `aonamiline.co.jp, ${PARKS}`,
  },
  {
    place: "다카야마와 시라카와고",
    how: "나고야역 메이테쓰 버스센터와 다카야마 노히 버스센터를 잇는 노히 버스, 또는 나고야역 출발 가이드 투어",
    time: "다카야마까지 2시간 45분. 가이드 투어는 왕복 약 11시간으로 안내되어 있습니다",
    cost: "버스는 예약제입니다. 투어 가격은 상품 페이지에서 확인하세요",
    source: `nouhibus.co.jp, ${OWN}`,
  },
  {
    place: "이세(이세 신궁)",
    how: "긴테쓰 나고야역에서 긴테쓰선. JR과 다른 철도 회사이며 JR 나고야역 옆에 있습니다",
    time: "약 1시간 15분. 긴테쓰의 시마카제 시각표는 긴테쓰 나고야 10:25 출발, 이세시 11:40, 우지야마다 11:42 도착입니다",
    cost: `JR 패스로는 탈 수 없습니다. 긴테쓰 레일 패스 1일권은 ${KINTETSU_PASS_1}입니다`,
    source: `kintetsu.co.jp, ${OWN}`,
  },
  {
    place: "교토, 오사카 등 도카이도 신칸센의 나머지 구간",
    how: "같은 승강장에서 서쪽으로 계속 갑니다",
    time: "나고야는 도쿄–신오사카 구간의 약 3분의 1 지점에 있습니다",
    cost: "이 페이지와 같은 티켓 규정이 적용됩니다",
    source: `이 가이드, ${OWN}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도쿄에서 나고야까지 신칸센은 몇 분 걸리나요?",
    a: `노조미로 최단 ${NOZOMI_FASTEST_MIN}(${NOZOMI_FASTEST})이며 환승은 없습니다. ${CHECKED}에 확인한 JR 도카이 열차 운행 정보에서 도쿄를 출발해 나고야에 서는 노조미 ${NOZOMI_PER_DAY}편은 ${NOZOMI_RANGE}이었습니다. JAPAN RAIL PASS로 탈 수 있는 히카리는 ${HIKARI_RANGE}로 역시 환승이 없고, 모든 역에 서는 고다마는 ${KODAMA_RANGE}입니다.`,
  },
  {
    q: "도쿄에서 나고야까지 신칸센 가격은 얼마인가요?",
    a: `JR의 smartEX 요금표 기준으로 노조미 보통차 지정석은 편도 ${SMART_EX_NOZOMI}입니다(성인 1명, ${CHECKED} 확인). 히카리나 고다마의 같은 좌석은 ${SMART_EX_HIKARI}로 ¥210 저렴합니다. 노조미 편도 2장은 ¥22,200이고, 7일 보통차 JAPAN RAIL PASS는 온라인 ${JR_PASS_7}입니다.`,
  },
  {
    q: "노조미, 히카리, 고다마 중 어떤 열차를 타야 하나요?",
    a: `티켓을 산다면 노조미, 패스가 있다면 히카리, 중간의 작은 역에 갈 때만 고다마입니다. 노조미는 ${NOZOMI_RANGE}, 지정석 ${SMART_EX_NOZOMI}이고, 히카리는 ${HIKARI_RANGE}, ${SMART_EX_HIKARI}이며 역시 환승 없이 갑니다. 고다마는 ${KODAMA_RANGE}입니다. JAPAN RAIL PASS로는 히카리와 고다마를 탈 수 있지만 노조미는 탈 수 없으며, 이 구간에서 패스 소지자가 잃는 시간은 몇 분뿐입니다.`,
  },
  {
    q: "도쿄–나고야에 JR 패스가 이득인가요?",
    a: `왕복만으로는 아니요. 다만 어차피 패스를 산다면 나고야는 가장 부담 없이 들를 수 있는 도시입니다. 7일 보통차 JAPAN RAIL PASS는 온라인 ${JR_PASS_7}, 해외 여행사의 교환권 ¥53,000이고, 나고야 왕복 지정석 2장은 JR의 smartEX 가격으로 약 ¥22,200이라 금액으로는 맞지 않습니다. 시간은 다릅니다. 히카리가 도쿄에서 나고야까지 환승 없이 가므로 패스 소지자가 잃는 시간은 몇 분뿐입니다(JR 도카이 시각표 기준 ${HIKARI_RANGE}, 노조미는 ${NOZOMI_RANGE}). 히로시마 구간에서는 1시간 15분 차이가 납니다. 그래서 교토, 가나자와, 히로시마용 패스가 이미 있다면 나고야를 추가하는 비용은 거의 없습니다. 장거리 구간에서는 살 만한 ${NOZOMI_TICKET}의 노조미 티켓도 이 구간에서는 사지 않아도 됩니다. 패스 가격은 모두 japanrailpass.net, ${OWN} 확인.`,
  },
  {
    q: "좌석을 미리 예매해야 하나요?",
    a: `대부분은 필요 없습니다. JR 도카이 시각표에서 도쿄 출발 노조미만 하루 ${NOZOMI_PER_DAY}편이라, 일본의 도시 간 노선 중 역에 가서 바로 타도 되는 노선입니다. 하지만 8개 기간에는 반드시 예매해야 합니다. JR 도카이 공식 페이지에 노조미 전 차량이 지정석이 되고 자유석이 없는 기간이 나와 있습니다: ${nozomiAllReservedPeriods.join(", ")}. 이 기간에도 JR 도카이는 노조미 외의 히카리, 고다마, 미즈호, 사쿠라, 쓰바메는 "평소처럼 자유석을 운영한다"고 안내하므로, 느린 열차가 당일에 바로 탈 수 있는 대안입니다. 지정석은 열차가 시발역을 출발하는 날의 1개월 전 10:00에 예매가 시작됩니다. 레일 패스가 있다면 좌석 지정 자체가 무료이므로 예매하지 않을 이유가 없습니다. ${OWN} 확인.`,
  },
];

const topPrep = [
  withKlookLocale(nagoyaArrivalShinkansenPrep[0], LOCALE, {
    label: "나고야역 주변 호텔",
    ctaLabel: "클룩에서 나고야 호텔 보기 →",
    why: "신칸센과 지하철이 모두 나고야역에서 출발하므로, 이곳에 묵으면 테마파크나 다카야마에 가는 날에도 시내를 가로질러 이동할 필요가 없습니다.",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[1], LOCALE, {
    label: "지브리 파크 입장권",
    ctaLabel: "지브리 파크 티켓 보기 →",
    why: "지브리 대창고의 입장 시간은 결제할 때 고르므로, 당일이 아니라 열차를 예매할 때 함께 정해 두세요.",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[2], LOCALE, {
    label: "레고랜드® 재팬 티켓",
    ctaLabel: "레고랜드 티켓 보기 →",
    why: "1일 패스는 모바일 QR 코드이며, 같은 상품 페이지에서 SEA LIFE 나고야 세트와 스킵 패스도 고를 수 있습니다.",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[3], LOCALE, {
    label: "나고야 출발 지브리 파크, 아이치 항공 박물관 버스 투어",
    ctaLabel: "나고야 출발 버스 투어 보기 →",
    why: "리니모 환승을 직접 계획하고 싶지 않다면 나고야에서 출발하는 합류형 버스 투어가 있습니다.",
  }),
];

const tourPicks = [
  withKlookLocale(ghibliParkNagoyaBusTour, LOCALE, {
    title: "나고야 출발 지브리 파크, 아이치 항공 박물관 버스 투어",
    desc: "지브리 파크와 아이치 항공 박물관을 묶은 나고야 출발 합류형 버스 투어로, 리니모 환승을 신경 쓰지 않아도 됩니다",
  }),
  withKlookLocale(takayamaShirakawagoNagoyaDayTrip, LOCALE, {
    title: "나고야 출발 다카야마, 시라카와고 일일 투어",
    desc: "나고야역 출발 왕복 약 11시간으로 안내되어 있으며, 시라카와고와 다카야마 옛 거리에서 각각 약 2시간을 보냅니다",
  }),
  withKlookLocale(shirakawagoTakayamaOldTownDayTour, LOCALE, {
    title: "시라카와고, 다카야마 옛 거리 일일 투어(히다규 점심 선택 가능)",
    desc: "같은 두 곳을 도는 또 하나의 나고야 출발 투어로, 히다규 점심은 포함이 아니라 추가 옵션입니다",
  }),
  withKlookLocale(legolandJapanHotelPackage, LOCALE, {
    title: "레고랜드 재팬 호텔 숙박",
    desc: "파크 입구 옆 리조트의 테마 객실에서 조식 포함 1박을 합니다. 10:00~17:00 운영하는 파크를 이틀 아침에 나눠 즐길 수 있는 예약입니다",
  }),
];

const stayAreas = [
  withKlookLocale(nagoyaParkStayAreas[0], LOCALE, {
    area: "나고야역",
    why: "두 테마파크로 가는 교통이 모두 여기서 출발합니다. 히가시야마선으로 후지가오카에 가서 리니모로 갈아타거나, 아오나미선으로 긴조후토까지 갑니다(아오나미선 안내 24분, ¥360). 도카이도 신칸센도 같은 건물에 도착합니다.",
  }),
  withKlookLocale(nagoyaParkStayAreas[1], LOCALE, {
    area: "지브리 파크 주변(나가쿠테, 세토)",
    why: "시내가 아니라 리니모 근처의 호텔입니다. 지브리 대창고 오전 9시 입장이라면 이쪽이 맞으며, 파크는 아이치큐하쿠키넨코엔역 2번 출구 바로 앞입니다.",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "도쿄 나고야 신칸센" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function LastChecked({ date, sources }: { date: string; sources: { label: string; href?: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      <strong>최종 확인: {date}</strong>.{" "}
      {sources.map((s, i) => (
        <span key={s.label}>
          {i > 0 ? ", " : ""}
          {s.href ? (
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ) : (
            s.label
          )}
        </span>
      ))}
    </p>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
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
                    className={c === 0 ? styles.tdProvider : c === 1 ? styles.tdPrice : undefined}
                    style={{ fontSize: c === 0 ? "0.88rem" : "0.85rem" }}
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

export default function KoTokyoToNagoyaShinkansenPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG[LOCALE] }),
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
            몇 분 간격으로 오는 환승 없는 노조미. 그리고 도카이도 신칸센에서 레일 패스로 가도 늘어나는 시간이 1시간 15분이
            아니라 몇 분뿐인 구간입니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "smartEX와 JR 그룹 공식 요금(확인일 표기)", "JR 패스 손익 분기점", "나고야에서 갈 수 있는 곳"].map((t) => (
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
                <p className={styles.verdictStatLabel}>최단 소요 시간</p>
                <p className={styles.verdictStatValue}>{NOZOMI_FASTEST}(노조미), 환승 없음</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>보통차 지정석</p>
                <p className={styles.verdictStatValue}>편도 {SMART_EX_NOZOMI}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR 패스(히카리)</p>
                <p className={styles.verdictStatValue}>이용 가능, {HIKARI_RANGE}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>도쿄 출발 노조미(하루)</p>
                <p className={styles.verdictStatValue}>{NOZOMI_PER_DAY}편, 첫차 06:00</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>도쿄 나고야 신칸센</strong>은 환승 없는 노조미로 최단{" "}
              <strong>{NOZOMI_FASTEST_MIN}({NOZOMI_FASTEST})</strong>이 걸리고, 보통차 지정석은 JR의 smartEX 가격으로 편도{" "}
              <strong>{SMART_EX_NOZOMI}</strong>입니다. JAPAN RAIL PASS로는 노조미를 탈 수 없지만, 패스로 탈 수 있는 히카리가
              환승 없이 <strong>{HIKARI_RANGE}</strong>에 가며 패스 없이 사면 {SMART_EX_HIKARI}입니다. JR 도카이와 smart-ex.jp에서{" "}
              {CHECKED}에 확인했습니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                클룩에서 도쿄 → 나고야 티켓 보기 →
              </KlookLink>
              <KlookLink href={GHIBLI_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                나고야 출발 지브리 파크 투어 →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>답</span>
          <h2 className={styles.sectionTitle}>도쿄에서 나고야까지 신칸센은 몇 분 걸리나요?</h2>
          <p className={styles.bodyText}>
            최단 {NOZOMI_FASTEST_MIN}({NOZOMI_FASTEST}), 거의 모든 노조미가 {NOZOMI_RANGE}이며 환승은 없습니다. JR 도카이 시각표에서 {CHECKED}에 도쿄를
            출발해 나고야에 서는 노조미는 {NOZOMI_PER_DAY}편이었고 첫차는 06:00였습니다. 히카리는 {HIKARI_RANGE}, 모든 역에 서는
            고다마는 {KODAMA_RANGE}입니다.
          </p>
          <h2 className={styles.sectionTitle}>도쿄에서 나고야까지 신칸센 가격은 얼마인가요?</h2>
          <p className={styles.bodyText}>
            노조미 보통차 지정석은 편도 {SMART_EX_NOZOMI}, 히카리나 고다마의 같은 좌석은 {SMART_EX_HIKARI}이며, JR의 smartEX
            성인 1명 가격입니다. 노조미 왕복은 ¥22,200으로 7일 JAPAN RAIL PASS({JR_PASS_7})의 절반이 안 됩니다.
          </p>
          <Table
            head={["열차", "도쿄 → 나고야 소요 시간", "지정석(smartEX)", "참고"]}
            rows={answerRows.map((r) => [r.train, r.time, r.fare, r.note])}
          />
          <LastChecked
            date={LAST_CHECKED}
            sources={[
              { label: "JR 도카이 열차 운행 정보(도쿄, 서쪽 방면)", href: JRC_TRAININFO_URL },
              { label: "smartEX 지정석 요금표(smart-ex.jp)", href: SMART_EX_PDF_URL },
            ]}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            나고야에서 묵는다면{" "}
            <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>
              나고야 2일 일정(영어)
            </Link>
            에서 도착 후 이틀을 짜고,{" "}
            <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>
              나고야성 입장권 가이드(영어)
            </Link>
            에서 시내에서 보내는 반나절을 확인할 수 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도쿄 → 나고야 좌석 예매 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          headingLevel={3}
          label="신칸센과 함께 예약"
          heading="좌석과 함께 예약할 나고야 일정"
          intro="열차는 나고야역까지 갑니다. 나머지는 역 근처 숙소와 날짜별로 판매되는 테마파크 지정 시간 입장권이므로, 열차를 예매할 때 함께 정해 두세요."
          items={topPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>나고야를 지나치기 쉬운 이유</h2>
          <p className={styles.bodyText}>
            많은 사람이 나고야를 교토행 열차가 지나가는 도시로만 생각하기 때문입니다. 시각표로 보면 나고야는 도카이도 신칸센 도쿄–신오사카
            구간의 약 3분의 1 지점에 있어, 일본에서 가장 쉬운 장거리 구간입니다. 노조미로 최단 <strong>{NOZOMI_FASTEST}</strong>,
            환승이 없고, 도쿄 출발 노조미만 하루 {NOZOMI_PER_DAY}편입니다.
          </p>
          <p className={styles.bodyText}>
            티켓 선택도 노선 전체에서 가장 간단하며, 그 이유를 짚어 둘 만합니다. 다른 도카이도, 산요 신칸센 구간에서는{" "}
            <strong>JAPAN RAIL PASS</strong>로 노조미를 탈 수 없어서 추가 티켓을 사거나 느린 열차를 타야 합니다. 도쿄–나고야는
            예외로, <strong>히카리</strong>가 환승 없이 바로 가므로 패스로 타도 직행이고 약 15분만 더 걸립니다. {NOZOMI_TICKET}의
            노조미 티켓은 이 구간에도 있지만, 이 구간에서는 살 이유가 거의 없습니다.
          </p>
          <p className={styles.bodyText}>
            정말 계획할 것은 도착한 뒤입니다. 나고야는 관광 도시라기보다 좋은 당일 여행지 네 곳으로 이어지는 환승역입니다.
            리니모로 가는 지브리 파크, 아오나미선으로 가는 레고랜드 재팬, 산길을 올라가는 시라카와고와 다카야마, 그리고 JR 패스로는
            탈 수 없는 철도로 가는 이세 신궁입니다. 네 곳 모두 운영사, 요금이 따로 있고, 그중 두 곳은 예약 규정도 따로 있습니다.
            미리 알아 두면 좋은 부분이 바로 여기이며, 이 페이지의 나머지 내용입니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>열차</span>
          <h2 className={styles.sectionTitle}>노조미, 히카리, 고다마 소요 시간 비교</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            최단 {NOZOMI_FASTEST}, 환승 없음. 아래 모든 수치에 출처와 확인일을 적었으며, 이 구간에서 패스 소지자의 이동이 다른
            사람과 거의 다르지 않은 이유도 함께 정리했습니다.
          </p>
          <Table
            head={["항목", "내용", "의미", "출처와 확인일"]}
            rows={routeRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            두 부분으로 된 요금, 좌석 등급, 패스로 탈 수 있는 열차 등 신칸센 티켓의 기본은{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              신칸센 가이드(영어)
            </Link>
            에 정리했습니다.{" "}
            <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
              도쿄에서 교토 가는 법(영어)
            </Link>
            은 같은 노선으로 40분 더 가는 구간이고,{" "}
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" style={linkStyle}>
              도쿄–히로시마 신칸센(영어)
            </Link>
            은 패스 제한이 실제로 불편한 구간입니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도쿄 → 나고야 티켓 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>도쿄–나고야 요금과 패스 가격 전체</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            노조미 보통차 지정석은 편도 {SMART_EX_NOZOMI}, 히카리나 고다마의 같은 좌석은 {SMART_EX_HIKARI}입니다. 둘 다 JR의
            온라인 가격으로, smart-ex.jp가 공개한 smartEX 요금표에서 {OWN}에 확인했습니다(성인 1명, 통상기). JR 도카이는 역
            매표소 요금을 고정된 표로 공개하지 않으므로, 아래 역 매표소 행은 이 사이트가 반올림한 참고값이며 그렇게 표시했습니다.
          </p>
          <Table
            head={["티켓", "가격", "내용", "출처와 확인일"]}
            rows={priceRows.map((r) => [r.item, r.price, r.covers, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            가격은 바뀔 수 있으므로 구매 전에 확인하세요. 역 매표소 요금은 JR 패스로 탈 수 있는 열차(도카이도, 산요 신칸센은 히카리,
            사쿠라, 고다마)의 통상기 편도 기본 운임과 지정석 특급 요금(보통차)을 더한 반올림 참고값입니다. smartEX 가격은 온라인
            가격으로 역 가격과 다르며, 성수기와 비수기에는 지정석 요금이 수백 엔 오르내립니다. 클룩 가격은 날짜에 따라 달라지므로
            이 페이지에 적지 않았습니다. 이용 날짜의 상품 페이지에서 확인하세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>도쿄–나고야에 JR 패스가 이득인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            이 구간만으로는 아닙니다. 지정석 편도 2장은 JR의 smartEX 가격으로 약 ¥22,200이고, 7일 보통차 패스는 온라인{" "}
            {JR_PASS_7}, 해외에서 사는 교환권은 ¥53,000입니다. 하지만 이미 필요한 패스에 <em>추가</em>하기에는 나고야가 노선에서
            가장 부담이 적은 도시입니다. 패스 소지자가 잃는 시간이 거의 없기 때문입니다.
          </p>
          <Table
            head={["선택지", "비용", "얻는 것", "고를 때"]}
            rows={compareRows.map((r) => [r.option, r.cost, r.gets, r.pick])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            JR이 직접 적어 둔 규정은 이렇습니다. 패스로 노조미나 미즈호를 타려면 JAPAN RAIL PASS 소지자에게만 판매하는 전용
            티켓이 필요하며, &ldquo;그린차 티켓, 보통차 지정석 티켓, 보통차 자유석 티켓 모두 같은 가격&rdquo;입니다. 도쿄 또는
            시나가와–나고야는 <strong>{NOZOMI_TICKET}</strong>로, JR이 가격을 정한 6개 구간 중 가장 저렴하며 가장 건너뛰어도 되는
            구간입니다.{" "}
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR 패스 가이드(영어)
            </Link>
            에서 내 일정 구간별 손익 분기점을 계산할 수 있고,{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" style={linkStyle}>
              도쿄–가나자와 가이드(영어)
            </Link>
            는 북쪽에서 시라카와고로 가는 또 하나의 주부 지역 경로를 다룹니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS(7/14/21일) →
            </KlookLink>
            <KlookLink href={SHORYUDO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              쇼류도 고속버스 패스 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>예매</span>
          <h2 className={styles.sectionTitle}>좌석을 미리 예매해야 하나요?</h2>
          <p className={styles.bodyText}>
            1년 중 대부분은 필요 없습니다. JR 도카이 시각표에서 도쿄 출발 노조미가 하루 {NOZOMI_PER_DAY}편이라, 일본의 도시 간 노선
            중 역에 가서 다음 열차를 타도 무리가 없는 노선입니다. 다만 8개 기간에는 선택의 여지가 없습니다. JR 도카이는 아래 성수기
            기간에 <strong>노조미 전 차량을 지정석으로</strong> 운행하므로, 그날 나고야행 빠른 열차에는 자유석이 전혀 없습니다. JR
            도카이 공식 페이지에서 {OWN}에 확인했습니다.
          </p>
          <ul className={styles.pickList}>
            {nozomiAllReservedPeriods.map((period) => (
              <li key={period}>
                <span className={styles.proIcon}>▸</span>
                <span><strong>{period}</strong></span>
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            이 구간에서는 히카리가 대안입니다. JR 도카이는 같은 기간에도 노조미 외의 열차, 즉 히카리, 고다마, 미즈호, 사쿠라,
            쓰바메는 &ldquo;평소처럼 자유석을 운영한다&rdquo;고 안내하며, 히카리는 도쿄에서 나고야까지 바로 갑니다. 그래서
            골든위크에도 예매 없이 탈 수 있는 열차가 있으며, 15분 정도 더 걸릴 뿐입니다.
          </p>
          <p className={styles.bodyText}>
            예매한다면 어느 열차든 시점은 같습니다. 지정석은 열차가 시발역을 출발하는 날의{" "}
            <strong>1개월 전 10:00</strong>에 예매가 시작되므로, 4월 1일 출발이라면 3월 1일 10:00부터입니다.{" "}
            <strong>JAPAN RAIL PASS</strong>가 있다면 좌석 지정 자체가 무료이므로, 이 구간에서는 비용이 전혀 들지 않습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              열차와 좌석 등급 고르기 →
            </KlookLink>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>나고야에서</span>
          <h2 className={styles.sectionTitle}>나고야에 들를 만한가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            숙박 지역으로는 그렇습니다. 이유는 도시 자체보다 아래 표에 있습니다. 도쿄에서는 가기 어렵거나 당일로 불가능한 네 곳이
            나고야역에서는 모두 쉽게 갈 수 있고, 그중 두 곳은 신칸센이 도착하는 같은 건물에서 출발합니다.
          </p>
          <Table
            head={["목적지", "가는 방법", "소요 시간", "비용", "출처와 확인일"]}
            rows={fromNagoyaRows.map((r) => [r.place, r.how, r.time, r.cost, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            이 중 두 곳은 열차보다 예매 규정이 더 중요합니다. 지브리 파크는 날짜와 시간을 지정하는 입장권을 2개월 전부터 판매하며,
            지브리 대창고에는 지정 입장 시간이 있습니다. 예매 일정표, 두 가지 입장권 종류, 공식 가격은{" "}
            <Link href="/guides/attractions/ghibli-park-tickets" style={linkStyle}>
              지브리 파크 입장권 가이드(영어)
            </Link>
            에 있습니다. 레고랜드 재팬은 가격이 날짜에 따라 달라지며{" "}
            <Link href="/guides/attractions/legoland-japan-tickets" style={linkStyle}>
              레고랜드 재팬 티켓 가이드(영어)
            </Link>
            에서 설명합니다. 북쪽 산간 지역 버스는 여러 편이 예약제이며{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" style={linkStyle}>
              다카야마, 시라카와고 가이드(영어)
            </Link>
            에서 출발편별로 정리했습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={GHIBLI_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              지브리 파크 티켓 →
            </KlookLink>
            <KlookLink href={LEGOLAND_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              레고랜드® 재팬 티켓 →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            도쿄에서 오사카로 가는 길에 나고야에 들를 수 있나요?
          </h3>
          <p className={styles.bodyText}>
            100km를 넘는 기본 운임 승차권이라면 가능합니다. JR 도카이는 출발역과 도착역 사이의 역에서 도중하차(개찰구를 나갔다가
            다시 들어오는 것)를 허용하며, 되돌아가는 것은 안 됩니다. 신칸센 특급권은 도중하차에 쓸 수 없으므로 도쿄 → 나고야와
            나고야 → 신오사카를 따로 사세요. smartEX에서는 도중하차가 불가능하며, 내리면 타지 않은 구간은 무효가 됩니다. JR
            도카이의{" "}
            <a href="https://global.jr-central.co.jp/en/tickets/type/stopovers.html" target="_blank" rel="noopener">
              도중하차 안내 페이지
            </a>
            와 smart-ex.jp에서 2026년 11월 13일에 확인한 규정입니다. 신오사카까지의 요금은{" "}
            <Link href="/ko/guides/transport/tokyo-to-osaka-shinkansen" style={linkStyle}>
              도쿄 오사카 신칸센 가이드
            </Link>
            에 있습니다. 반나절을 보낼 곳으로는{" "}
            <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>
              나고야성 입장권 가이드(영어)
            </Link>
            에서 성의 가격, 운영 시간, 입장할 수 없는 천수각에 대해 확인하세요.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>수하물</span>
          <h2 className={styles.sectionTitle}>특대 수하물 규정은?</h2>
          <p className={styles.bodyText}>
            세 변의 합이 <strong>160cm를 넘는</strong> 짐은 미리 예매해야 합니다. JR 도카이의 수하물 안내 페이지는 세 변의 합이{" "}
            <strong>161~250cm</strong>인 짐을 특대 수하물로 정하고, 특대 수하물 공간이 딸린 좌석 뒤의 공간에 두도록 합니다. 이 좌석에
            추가 요금은 없으며, JR은 &ldquo;보통차와 그린차 지정석과 같은 가격&rdquo;이라고 안내합니다.
          </p>
          <p className={styles.bodyText}>
            특대 수하물을 가지고 예약 없이 타면 <strong>¥1,000(세금 포함)의 수하물 요금</strong>이 붙습니다. {OWN} 확인. 역
            매표소, 지정석 발매기, 또는 온라인에서 수하물 공간이 딸린 좌석을 골라 예매합니다. 항공 위탁 수하물용 캐리어는 대부분
            160cm 이하이므로, 실제로는 스키 가방, 골프백 커버, 대형 캐리어, 커버를 씌운 유모차에 해당하는 규정입니다. 수하물
            공간 딸린 좌석은 지정석 차량에만 있으므로 자유석 티켓으로 이 규정을 피할 수는 없습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>당일 또는 1박</span>
          <h2 className={styles.sectionTitle}>도쿄에서 지브리 파크 당일치기가 가능한가요?</h2>
          <p className={styles.bodyText}>
            가능하지만 생각보다 빠듯합니다. 신칸센은 노조미로 편도 약 <strong>1시간 35분</strong>, 나고야역 버스센터에서 메이테쓰
            직행버스는 운영사 안내로 <strong>40분</strong>이므로, 파크에서 보내는 시간과 별도로 이동에만 4시간 30분을 훌쩍 넘게
            씁니다.
          </p>
          <p className={styles.bodyText}>
            진짜 제약은 거리가 아니라 입장권입니다.{" "}
            <Link href="/guides/attractions/ghibli-park-tickets" style={linkStyle}>
              지브리 파크 입장권(영어)
            </Link>
            은 날짜와 시간을 지정하는 입장권으로 지브리 대창고에 지정 입장 시간이 있으며, 오전 시간대부터 매진됩니다. 오전 9시
            대창고 입장에 맞춰 도쿄에서 열차를 타면 06:00 전에 출발해야 하고, 메이테쓰 직행버스는 화요일을 포함한 파크 휴원일에는
            운행하지 않습니다. 나고야나 리니모 근처 나가쿠테의 호텔에서 1박하면 새벽 출발이 보통 아침 일정이 됩니다.
          </p>
          <p className={styles.bodyText}>
            시라카와고는 더욱 그렇습니다. 나고야에서 다시 2시간 45분 걸리는 예약제 버스를 타야 하므로, 도쿄에서 당일 왕복으로는
            제대로 둘러볼 수 없습니다. 둘 중 하나가 여행의 목적이라면 1박을 예약하세요. 현지 구간을 직접 계획하고 싶지 않다면,
            나고야역 출발 가이드 투어는 바로 그 번거로운 연결 때문에 있는 상품입니다.
          </p>
        </section>

        <KlookTourPicks
          heading="나고야에서 가는 당일 여행"
          intro="네 가지 모두 나고야역이나 그 근처에서 시작합니다. 리니모 환승을 대신 처리해 주는 지브리 파크 가이드 투어, 입장권만, 그리고 버스 두 번을 갈아타는 산간 여행을 한 번의 예약으로 바꿔 주는 시라카와고, 다카야마 투어 두 가지입니다. 이용 날짜의 예약 가능 여부와 현재 가격은 상품 페이지에서 확인하세요."
          tours={tourPicks}
        />

        <KlookStayAreas
          heading="나고야에서 1박한다면 어디에 묵을까"
          intro="두 지역 중 어디를 고를지는 위의 표에서 바로 정해집니다. 나고야가 긴 철도 일정의 한 정거장이고 테마파크는 당일로 다녀온다면 역 주변, 지브리 대창고 오전 9시 입장이 여행의 목적이라면 리니모 근처입니다."
          areas={stayAreas}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>탑승 전</span>
          <h2 className={styles.sectionTitle}>탑승 전에 준비할 한 가지</h2>
          <p className={styles.bodyText}>
            모바일 데이터입니다. 나고야역에서 내린 뒤의 모든 결정은 휴대폰으로 합니다. 지브리 파크 입장권은 입장 시간이 적힌 QR
            코드이고, 메이테쓰 버스와 노히 버스는 실제 도착 시간과 시각표를 맞춰 봐야 하며, 후지가오카의 리니모 환승은 지도가 있으면
            간단하지만 없으면 번거롭습니다. 출국 전에 eSIM을 개통해 두면 모두 휴대폰으로 바로 확인할 수 있습니다.{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              클룩 eSIM 보기 →
            </KlookLink>{" "}
            <Link href="/ko/guides/esim/best-esim-japan" style={linkStyle}>
              일본 eSIM 추천 가이드
            </Link>
            에서 다른 선택지와 비교했고,{" "}
            <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>
              IC 카드 가이드(영어)
            </Link>
            에서 신칸센에서 내린 뒤 나고야 지하철, 아오나미선, 메이테쓰의 개찰구를 IC 카드로 통과하는 방법을 다룹니다.
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/nagoya-2-day-itinerary", title: "나고야 2일 일정(2026): 지브리 파크 또는 레고랜드(영어)" },
            { href: "/ko/guides/transport/tokyo-to-osaka-shinkansen", title: "도쿄 오사카 신칸센 2026: 가격, 소요 시간, 예매 방법" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "지브리 파크 입장권 2026: 구매 방법, 가격, 판매 시작일(영어)" },
            { href: "/guides/attractions/legoland-japan-tickets", title: "레고랜드 재팬 티켓(2026): 날짜별 가격(영어)" },
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "다카야마, 시라카와고 투어(2026): 출발편과 비용(영어)" },
            { href: "/guides/transport/shinkansen-guide", title: "신칸센 가이드 2026: 티켓, 패스, 처음 타는 사람을 위한 팁(영어)" },
            { href: "/guides/transport/jr-pass-guide", title: "JR 패스 가이드 2026: 가격, 이득인 경우, 구매 방법(영어)" },
            { href: "/ko/guides/transport/kyoto-to-tokyo-shinkansen", title: "교토 도쿄 신칸센 2026: 가격, 소요 시간, 예매 방법" },
            { href: "/guides/transport/tokyo-to-hiroshima-shinkansen", title: "도쿄–히로시마 신칸센: 소요 시간, 요금, JR 패스(영어)" },
            { href: "/guides/transport/tokyo-to-kanazawa", title: "도쿄–가나자와(2026): 가가야키 소요 시간, 좌석, 패스(영어)" },
            { href: "/ko", title: "한국어 가이드 전체 보기 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>열차는 1시간 30분, 그다음 일정을 정하세요</h2>
            <p className={styles.ctaBannerDesc}>
              티켓을 산다면 노조미, 패스가 있다면 히카리를 예매하세요. 이 구간에서 차이는 약 15분입니다. 그다음 나고야에 가는 목적인
              지브리 파크 입장 시간이나 북쪽으로 가는 버스 예약을 정하세요.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                도쿄 → 나고야 티켓 보기 →
              </KlookLink>
              <KlookLink href={SHIRAKAWAGO_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                시라카와고 일일 투어 보기 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
