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
  dotonboriDaytimeFoodTour,
  jrPassWholeJapan,
  kantoKansaiLuggageDelivery,
  klookEsim,
  luggageDeliveryCards,
  osakaAmazingPass,
  osakaArrivalShinkansenPrep,
  shinkansenTokyoOsaka,
  tokyoOsakaArrivalPrep,
  tokyoOsakaArrivalStayAreas,
  tokyoOsakaFareTablePrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { PRICES } from "../../../../lib/attraction-prices";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/tokyo-to-osaka-shinkansen) section by section as of
// 2026-11-27 (task jtk-20261127-TR02): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: 도쿄 오사카 신칸센 — the phrase Korean results use for this route (ekitan.com/ko
// "도쿄에서 오사카 신칸센 요금 및 티켓 예약 방법", shinkansentickets.net/kr "도쿄-오사카 신칸센").

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/transport/tokyo-to-osaka-shinkansen";
const TITLE = "도쿄 오사카 신칸센 2026: 가격, 소요 시간, 예매 방법";
const H1 = "도쿄 오사카 신칸센 2026: 가격, 소요 시간, 예매 방법";
const DESC =
  "도쿄 오사카 신칸센 가격: 노조미 지정석 ¥14,720, 자유석 ¥13,870, 최단 2시간 21분. smartEX, 클룩 예매 비교.";

const OWN_ISO = "2026-11-21";
const OWN = dateLabel(OWN_ISO, LOCALE);
const EARLIER = dateLabel("2026-11-04", LOCALE);

const WINDOW_NOZOMI = "¥14,720";
const WINDOW_HIKARI = "¥14,400";
const SMART_NOZOMI = "¥14,520";
const SMART_HIKARI = "¥14,200";
const NON_RESERVED = "¥13,870";
const NOZOMI_TICKET = "¥4,960";
const JR_PASS_ONLINE = "¥50,000";
const JR_PASS_ORDER = "¥53,000";

const SHINKANSEN_URL = klookFor(shinkansenTokyoOsaka.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);
const LUGGAGE_URL = klookFor(kantoKansaiLuggageDelivery.url, LOCALE);
const AMAZING_PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const FOOD_TOUR_URL = klookFor(dotonboriDaytimeFoodTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

/** Only the periods still ahead on the date this page was checked. */
const nozomiAllReservedPeriods = [
  "2026년 11월 21~23일",
  "2026년 12월 25일~2027년 1월 5일",
  "2027년 1월 9~11일",
  "2027년 3월 20~22일",
];

const fareRows = [
  {
    train: "노조미: 가장 빠른 열차, 예매할 열차",
    time: "최단 2시간 21분, 보통 2시간 27분",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_NOZOMI}(smartEX ${SMART_NOZOMI})`,
    green: "¥19,590(smartEX ¥19,390)",
    pass: `불가, ${NOZOMI_TICKET} 티켓 필요`,
  },
  {
    train: "히카리: JR 패스로 타는 열차",
    time: "2시간 48분~3시간 6분",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI}(smartEX ${SMART_HIKARI})`,
    green: "¥19,270(smartEX ¥19,070)",
    pass: "가능",
  },
  {
    train: "고다마(모든 역 정차)",
    time: "3시간 42분~3시간 54분",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI}(smartEX ${SMART_HIKARI})`,
    green: "¥19,270(smartEX ¥19,070)",
    pass: "가능",
  },
];

const frequencyRows = [
  {
    item: "노조미, 도쿄 → 신오사카",
    value: "160편, 2시간 21분~2시간 30분",
    detail: "2026년 11월 21일 도쿄에서 출발해 신오사카까지 간 노조미 전체입니다. 보통(중앙값) 2시간 27분이며 환승은 없습니다",
    source: "JR 도카이 시각표 데이터",
  },
  {
    item: "노조미 첫차와 막차",
    value: "06:00, 21:24",
    detail: "2026년 11월 21일 도쿄 출발 기준입니다. 휴일 시각표에서는 막차 시각이 달라지므로 이용 날짜의 시각표를 확인하세요",
    source: "JR 도카이 시각표 데이터",
  },
  {
    item: "히카리와 고다마",
    value: "28편, 11편",
    detail: "같은 날 히카리 2시간 48분~3시간 6분, 고다마 3시간 42분~3시간 54분이며, JR 패스로 탈 수 있는 열차입니다",
    source: "JR 도카이 시각표 데이터",
  },
  {
    item: "노선 전체 운행 간격",
    value: "1시간에 최대 18편",
    detail: "열차를 놓쳐도 오래 기다리는 경우는 드뭅니다",
    source: "global.jr-central.co.jp",
  },
];

const passRows = [
  {
    item: "도쿄–오사카 왕복 1회",
    answer: "패스가 아니라 티켓을 사세요",
    cost: `smartEX 노조미 지정석 2장 ¥29,040, 가장 저렴한 7일 패스는 ${JR_PASS_ONLINE}`,
  },
  {
    item: "7일 보통차 JR 패스",
    answer: "2026년 10월 1일부터의 가격",
    cost: `공식 사이트 ${JR_PASS_ONLINE}, 해외 여행사의 교환권 ${JR_PASS_ORDER}`,
  },
  {
    item: "히카리와 고다마",
    answer: "패스로 이용 가능",
    cost: "보통차 지정석과 자유석 모두 추가 요금 없음",
  },
  {
    item: "노조미",
    answer: "패스만으로는 이용 불가",
    cost: `도쿄–신오사카 1회 탈 때마다 ${NOZOMI_TICKET}, 지정석, 자유석, 그린차 모두 같은 가격(그린차는 그린 패스 소지자만)`,
  },
  {
    item: "패스가 이득이 되는 경우",
    answer: "7일 안에 장거리 구간 4회 이상",
    cost: "smartEX 가격으로 노조미 편도 4회를 타야 ¥50,000을 넘으므로 히로시마, 가나자와, 도호쿠 일정을 더해야 합니다",
  },
];

const bookingRows = [
  {
    route: "smartEX(JR 공식 사이트와 앱): 기본 선택",
    price: `노조미 지정석 ${SMART_NOZOMI}, 모든 지정석 ¥200 할인`,
    when: "승차 1년 전 5:30부터 출발 4분 전까지. 좌석은 1개월 전 8:00 이후에 확정됩니다",
    cancel: "구매 후 3개월 이내, 출발 4분 전까지 몇 번이든 무료 변경. 환불 수수료 ¥320",
  },
  {
    route: "클룩 도쿄 → 오사카 철도 페이지",
    price: "결제 화면에 날짜별로 표시",
    when: "날짜, 열차, 좌석 등급(자유석, 지정석, 그린차)을 고릅니다",
    cancel: "결제 전에 표시되는 클룩 자체 규정",
  },
  {
    route: "역 발매기 또는 매표소",
    price: `역 가격: 노조미 ${WINDOW_NOZOMI}, 히카리 지정석 ${WINDOW_HIKARI}`,
    when: "도쿄역에서 당일 구매, 또는 열차가 시발역을 출발하기 1개월 전 10:00부터 지정석 예매",
    cancel: `매표소에 문의하세요. JR 패스 소지자가 ${NOZOMI_TICKET}의 노조미 티켓을 사는 곳도 여기입니다`,
  },
  {
    route: "JR 패스(7일 보통차)",
    price: `온라인 ${JR_PASS_ONLINE}, 해외 여행사 ${JR_PASS_ORDER}. 노조미는 탈 때마다 ${NOZOMI_TICKET} 추가`,
    when: "히카리와 고다마는 패스로 좌석 지정이 무료입니다. 노조미 티켓은 승차 1개월 전부터 일본의 JR 역에서 판매합니다",
    cancel: "같은 7일 안에 히로시마, 가나자와, 도호쿠 일정이 있을 때만 이득입니다. 위의 JR 패스 표를 참고하세요",
  },
];

const altRows = [
  {
    option: "신칸센 자유석",
    time: "열차에 따라 2시간 21분~3시간 54분",
    cost: `${NON_RESERVED}, 1년 내내 같은 가격`,
    verdict: "가장 저렴한 신칸센 좌석입니다. 좌석을 고를 수 없고 특대 수하물 좌석이 없으며, 성수기에는 노조미 자유석 차량이 없습니다.",
    source: `smart-ex.jp 요금표, ${OWN}`,
  },
  {
    option: "smartEX 신칸센 지정석",
    time: "최단 2시간 21분",
    cost: `히카리 ${SMART_HIKARI}, 노조미 ${SMART_NOZOMI}`,
    verdict: "모든 지정석이 역 가격보다 ¥200 저렴합니다. smartEX는 좌석 수가 한정된 조기 예매 요금도 판매하며, 가격은 smart-ex.jp에 나와 있습니다.",
    source: `smart-ex.jp, JR 도카이, ${OWN}`,
  },
  {
    option: "야간 고속버스",
    time: "약 8~9시간",
    cost: "날짜, 운행 회사, 좌석에 따라 다르므로 상품 페이지에서 확인",
    verdict: "요금이 가장 낮고, 버스에서 잘 수 있다면 호텔 1박을 아낄 수 있습니다. 큰 캐리어와는 맞지 않습니다.",
    source: `kosokubus.com(운행 회사가 아닌 예약 사이트), ${EARLIER}`,
  },
  {
    option: "비행기, 하네다 → 이타미 또는 간사이",
    time: "적지 않음",
    cost: "날짜와 항공사에 따라 다름",
    verdict: "ANA와 JAL 공식 페이지에 비행시간이 나와 있지 않아 적지 않았습니다. 비교할 때는 양쪽 공항까지의 이동도 더하세요.",
    source: `ana.co.jp, jal.co.jp, ${EARLIER}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도쿄에서 오사카까지 신칸센 가격은 얼마인가요?",
    a: `노조미 보통차 지정석은 역에서 편도 ${WINDOW_NOZOMI}, JR의 smartEX에서는 ${SMART_NOZOMI}입니다. 히카리와 고다마 지정석은 ${WINDOW_HIKARI}(smartEX ${SMART_HIKARI})이고, 어느 열차든 자유석은 ${NON_RESERVED}입니다. 성인 1명, 통상기 기준이며, 지정석은 성수기에 ¥200, 최성수기에 ¥400 비싸고 비수기에는 ¥200 저렴합니다. 노조미 그린차는 ¥19,590(smartEX ¥19,390)입니다. JR 도카이와 smartEX 공식 페이지에서 ${OWN}에 확인했습니다.`,
  },
  {
    q: "도쿄에서 오사카까지 신칸센 소요 시간은 얼마나 걸리나요?",
    a: `도쿄역에서 신오사카까지 노조미로 최단 2시간 21분, 보통 2시간 27분이며 환승은 없습니다. JR 도카이 시각표 데이터에서 2026년 11월 21일에 노조미 160편이 이 구간을 운행했고, 첫차는 06:00, 막차는 21:24였습니다. 히카리는 2시간 48분~3시간 6분, 모든 역에 서는 고다마는 3시간 42분~3시간 54분입니다. ${OWN} 확인.`,
  },
  {
    q: "도쿄 오사카 신칸센은 미리 예매해야 하나요?",
    a: `평소에는 필요 없지만 날짜에 따라 필요합니다. 보통 날에는 1시간에 최대 18편이 운행하므로 자유석 티켓(${NON_RESERVED})으로 충분합니다. 다음 기간에는 노조미 전 차량이 지정석입니다: ${nozomiAllReservedPeriods.join(", ")}. 이 기간에도 히카리와 고다마에는 자유석 차량이 있지만, JR은 매우 혼잡할 수 있다고 안내합니다. 세 변의 합이 161~250cm인 짐(특대 수하물 공간 딸린 좌석 없이 타면 ¥1,000), 정해진 환승 일정, 후지산 쪽 좌석이 필요할 때는 항상 예매하세요. JR 도카이 사이트에서 ${OWN}에 확인했습니다.`,
  },
  {
    q: "도쿄–오사카만 간다면 JR 패스가 이득인가요?",
    a: `아니요. smartEX 노조미 지정석 2장은 ¥29,040이고, 7일 보통차 패스는 온라인 ${JR_PASS_ONLINE}, 해외 여행사 ${JR_PASS_ORDER}입니다(2026년 10월 1일부터의 가격). 또 패스로 노조미를 타려면 탈 때마다 ${NOZOMI_TICKET}의 티켓이 필요하며, 이 티켓은 일본의 JR 역에서만 판매합니다. 같은 주에 히로시마, 가나자와, 도호쿠까지 간다면 이득이 되기 시작합니다. japanrailpass.net에서 ${OWN}에 확인했습니다.`,
  },
  {
    q: "도쿄에서 오사카로 갈 때 후지산은 어느 쪽 좌석에서 보이나요?",
    a: "서쪽으로 갈 때 진행 방향 오른쪽입니다. 보통차는 E석, 그린차는 D석으로, JR 도카이의 안내서가 직접 꼽는 좌석입니다. 자유석에서는 어느 쪽도 보장되지 않으므로 좌석을 예매하세요. JR 도카이는 날씨에 따라 후지산이 보이지 않을 수 있다고 안내합니다. global.jr-central.co.jp에서 2026년 11월 21일에 확인했습니다.",
  },
];

const topPrep = [
  withKlookLocale(osakaArrivalShinkansenPrep[0], LOCALE, {
    label: "우메다·오사카역 주변 호텔",
    ctaLabel: "클룩에서 오사카역 주변 호텔 보기 →",
    why: "우메다는 신오사카에서 미도스지선으로 두 정거장이라 승강장에서 호텔까지 금방입니다.",
  }),
  withKlookLocale(osakaArrivalShinkansenPrep[1], LOCALE, {
    label: "오사카 주유패스(1일 / 2일)",
    ctaLabel: "오사카 주유패스 보기 →",
    why: "신오사카를 나서는 순간부터 오사카 메트로와 시내버스를 탈 수 있고, 같은 날 오사카성과 리버 크루즈에도 사용할 수 있습니다.",
  }),
  withKlookLocale(osakaArrivalShinkansenPrep[2], LOCALE, {
    label: "유니버설 스튜디오 재팬 전자 티켓",
    ctaLabel: "USJ 티켓 보기 →",
    why: "오사카에 가는 이유가 USJ라면, QR 코드로 바로 입장하는 날짜 지정 전자 티켓이라 입구에서 티켓 줄을 서지 않습니다.",
  }),
];

const fareTablePrep = [
  withKlookLocale(tokyoOsakaFareTablePrep[0], LOCALE, {
    label: "오사카성, 우메다 스카이 빌딩, 톤보리 리버 크루즈 일일 투어",
    ctaLabel: "오사카 일일 투어 보기 →",
    why: "오사카성, 우메다 전망대, 톤보리 리버 크루즈를 하나의 가이드 투어로 돕니다. 도착 다음 날 아침이나, 도쿄에서 이른 노조미를 탄 날에 맞습니다.",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[1], LOCALE, {
    label: "오사카 주유패스(1일 / 2일)",
    ctaLabel: "오사카 주유패스 보기 →",
    why: "신오사카를 나서는 순간부터 오사카 메트로와 시내버스를 탈 수 있고, 같은 날 오사카성과 리버 크루즈에도 사용할 수 있습니다.",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[2], LOCALE, {
    label: "유니버설 스튜디오 재팬 주변 호텔(유니버설 시티)",
    ctaLabel: "클룩에서 유니버설 시티 호텔 보기 →",
    why: "오사카에 가는 이유가 USJ라면 파크 입구는 유니버설시티역에서 걸어서 약 5분입니다. 좌석과 같은 날 밤의 객실을 함께 예약하세요.",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[3], LOCALE, {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "smartEX 변경, QR 티켓, 지연 안내는 모두 휴대폰으로 오므로 도쿄역에 도착하기 전에 모바일 데이터가 필요합니다.",
  }),
];

const arrivalPrep = [
  withKlookLocale(tokyoOsakaArrivalPrep[0], LOCALE, {
    label: "도톤보리 낮 시간 음식 투어",
    ctaLabel: "음식 투어 보기 →",
    why: "11:00~14:00로 안내되어 있어, 도쿄에서 08:00쯤까지 열차를 타면 투어에 맞춰 도착하고 오후 시간도 남습니다.",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[1], LOCALE, {
    label: "오사카 주유패스(1일 / 2일)",
    ctaLabel: "오사카 주유패스 보기 →",
    why: "신오사카를 나서는 순간부터 오사카 메트로와 시내버스를 탈 수 있고, 같은 날 오사카성과 리버 크루즈에도 사용할 수 있습니다.",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[2], LOCALE, {
    label: "우메다·오사카역 주변 호텔",
    ctaLabel: "클룩에서 오사카역 주변 호텔 보기 →",
    why: "좌석과 함께 객실을 예약하면 탈 열차와 도착하는 날 밤의 숙소가 한 번에 정해집니다.",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[3], LOCALE, {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "smartEX 좌석 변경이나 지연 안내 확인은 휴대폰으로 하므로 도쿄역에 도착하기 전에 모바일 데이터가 필요합니다.",
  }),
  withKlookLocale(luggageDeliveryCards.tokyoToOsakaFlyHome, LOCALE, {
    label: "수하물 배송(오사카·교토 호텔 ⇔ 간사이 공항)",
    ctaLabel: "호텔 → 간사이 공항 배송 보기 →",
    why: "간사이에서 귀국한다면 마지막 아침도 이동하는 날과 같은 방식입니다. 캐리어가 오사카나 교토 호텔을 먼저 떠나 간사이 공항에서 기다립니다.",
    guide: { href: "/guides/transport/japan-luggage-delivery", label: "수하물 배송 이용 방법(영어)" },
  }),
];

const stayAreas = [
  withKlookLocale(tokyoOsakaArrivalStayAreas[0], LOCALE, {
    area: "오사카 우메다",
    why: "신오사카에서 미도스지선으로 두 정거장이고 오사카역과 이어져 있어, 돌아갈 때도 열차를 탄다면 더 편한 숙박 지역입니다.",
  }),
  withKlookLocale(tokyoOsakaArrivalStayAreas[1], LOCALE, {
    area: "오사카 난바",
    why: "신오사카에서 같은 미도스지선 열차를 그대로 타고 가며, 도톤보리는 걸어서 갈 수 있고 간사이 공항행 난카이선의 시발역이 있습니다.",
  }),
  withKlookLocale(tokyoOsakaArrivalStayAreas[2], LOCALE, {
    area: "오사카 덴노지",
    why: "미도스지선에서 쓸모 있는 구간의 끝이며, 간사이 공항에서 출국한다면 JR 하루카가 바로 서는 역입니다.",
  }),
];

const tourPicks = [
  withKlookLocale(dotonboriDaytimeFoodTour, LOCALE, {
    title: "오사카 도톤보리 낮 시간 음식 투어",
    desc: "11:00~14:00로 안내된 2~10명 합류형 3시간 도보 투어로, 쿠시카쓰, 다코야키, 이자카야의 계절 점심 세트, 지역 디저트가 포함됩니다",
  }),
  withKlookLocale(osakaAmazingPass, LOCALE, {
    title: "오사카 주유패스(1일 / 2일)",
    desc: "오사카 메트로와 시내버스를 무제한으로 타고 40곳 이상의 시설에 무료로 입장하는 디지털 패스입니다",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "도쿄 오사카 신칸센" }];

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

export default function KoTokyoToOsakaShinkansenPage({ updated }: { updated: PageUpdated }) {
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
            노조미, 히카리, 고다마의 좌석별 가격, 신칸센 소요 시간, JR 패스가 이득인지, 그리고 어디서 예매할지를 정리합니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "JR 공식 요금(확인일 표기)", "JR 패스 손익 분기점", "예매 방법 비교"].map((t) => (
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
            가장 빠른 <strong>도쿄 오사카 신칸센</strong>인 노조미는 도쿄역에서 신오사카까지 <strong>2시간 21분</strong>(보통
            2시간 27분) 걸리며, 2026년 11월 21일에는 노조미 160편이 이 구간을 운행했습니다. 노조미 지정석은 역에서 편도{" "}
            <strong>{WINDOW_NOZOMI}</strong>, JR의 smartEX에서는 {SMART_NOZOMI}이고, 어느 열차든 자유석은{" "}
            <strong>{NON_RESERVED}</strong>입니다. JR 패스로는 히카리(지정석 {WINDOW_HIKARI}, 약 3시간)를 탈 수 있지만 노조미는{" "}
            {NOZOMI_TICKET} 티켓 없이 탈 수 없으므로, 왕복 1회라면 편도 티켓 2장이 더 저렴합니다. 요금과 소요 시간은 JR 도카이와
            smartEX 공식 페이지에서 {OWN}에 확인했습니다.
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>노조미 지정석 가격</p>
                <p className={styles.verdictStatValue}>{WINDOW_NOZOMI}, smartEX {SMART_NOZOMI}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>최단 소요 시간</p>
                <p className={styles.verdictStatValue}>2시간 21분, 환승 없음</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>가장 저렴한 좌석</p>
                <p className={styles.verdictStatValue}>자유석 {NON_RESERVED}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR 패스로 노조미 탑승</p>
                <p className={styles.verdictStatValue}>{NOZOMI_TICKET} 티켓 필요</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 같은 주에 히로시마, 가나자와, 도호쿠 일정이 없다면 편도마다 노조미 지정석을 예매하세요.
              smartEX 편도 2장은 ¥29,040이고, 가장 저렴한 7일 패스는 {JR_PASS_ONLINE}입니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                클룩에서 도쿄 → 오사카 티켓 보기 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="신칸센과 함께 예약"
          heading="좌석과 함께 예약할 오사카 일정"
          intro="노조미는 신오사카에서 끝납니다. 숙소, 시내 패스, 테마파크 입장권은 열차 예매 화면을 연 김에 함께 정해 두기 쉬운 부분입니다."
          items={topPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>도쿄에서 오사카까지 신칸센 가격은 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            노조미 지정석은 편도 {WINDOW_NOZOMI}, smartEX에서는 {SMART_NOZOMI}입니다(성인 1명, 통상기). 자유석은 세 열차 모두{" "}
            {NON_RESERVED}이며 시즌에 따라 바뀌지 않습니다. 지정석은 성수기에 ¥200, 최성수기에 ¥400 비싸고 비수기에는 ¥200
            저렴합니다.
          </p>
          <Table
            head={["열차", "도쿄 → 신오사카", "자유석", "지정석(역 / smartEX)", "그린차", "JR 패스 이용"]}
            rows={fareRows.map((r) => [r.train, r.time, r.nonReserved, r.reserved, r.green, r.pass])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "JR 도카이·JR 서일본 보도자료, 2026년 10월 16일(역 요금)", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
              { label: "smartEX 지정석 요금(PDF)", href: "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_reserved.pdf" },
              { label: "smartEX 서비스", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "JR 도카이 열차 운행 정보", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            소요 시간은 JR 도카이 시각표 데이터에서 2026년 11월 21일 도쿄발 신오사카행 열차의 최단, 최장 기록입니다. 히카리와
            그린차의 역 가격은 JR 도카이 보도자료의 요금표로 계산했으며, 각각 smartEX 가격보다 ¥200 비쌉니다. 클룩 가격은
            날짜에 따라 달라지므로 여기에 적지 않았습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩 도쿄 → 오사카 티켓 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          headingLevel={3}
          label="오사카 도착일"
          heading="오사카에 도착하는 날 예약할 것"
          intro="좌석은 그날의 2시간을 차지할 뿐입니다. 도쿄를 떠나기 전에 나머지를 정해 두는 네 가지입니다. 가이드와 함께하는 첫날, 시내 패스, 테마파크가 목적이라면 USJ 입구 옆 객실, 그리고 휴대폰의 모바일 데이터입니다."
          items={fareTablePrep}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>소요 시간</span>
          <h2 className={styles.sectionTitle}>도쿄에서 오사카까지 신칸센 소요 시간은?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            가장 빠른 노조미는 2시간 21분, 보통 노조미는 2시간 27분이며 환승은 없습니다. 히카리는 2시간 48분~3시간 6분, 고다마는
            3시간 42분~3시간 54분으로 정차역이 더 많기 때문이며, 신오사카행 노조미는 도쿄에서 06:00부터 21:24까지 출발합니다.
          </p>
          <Table
            head={["항목", "내용", "의미", "출처"]}
            rows={frequencyRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "JR 도카이 열차 운행 정보(2026년 11월 21일 시각표)", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
              { label: "JR 도카이 도카이도 신칸센", href: "https://global.jr-central.co.jp/en/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            편수는 토요일 하루 기준이며, 평일과 휴일 시각표는 다릅니다. 후지산이 보이는 쪽, 수하물 규정, 신칸센 전반은{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              처음 타는 사람을 위한 신칸센 가이드(영어)
            </Link>
            에 정리했습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>JR 패스</span>
          <h2 className={styles.sectionTitle}>도쿄–오사카만 간다면 JR 패스가 이득인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            왕복 1회라면 이득이 아닙니다. smartEX 노조미 지정석 2장은 ¥29,040이고, 가장 저렴한 7일 패스는 {JR_PASS_ONLINE}입니다.
            패스로 히카리와 고다마는 탈 수 있지만, 노조미는 탈 때마다 {NOZOMI_TICKET}의 별도 티켓이 필요하며 이 티켓은 승차 1개월
            전부터 일본의 JR 역에서만 판매합니다.
          </p>
          <Table
            head={["질문", "답", "비용"]}
            rows={passRows.map((r) => [r.item, r.answer, r.cost])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "japanrailpass.net 가격", href: "https://japanrailpass.net/en/purchase/price/" },
              { label: "japanrailpass.net 노조미·미즈호 티켓", href: "https://japanrailpass.net/en/use/special-ticket/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            14일, 21일 보통차 패스는 온라인 ¥80,000, ¥100,000, 여행사 ¥84,000, ¥105,000입니다.{" "}
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR 패스 가격 가이드(영어)
            </Link>
            에서 2026년 10월 가격 인상과 내 일정 구간별 손익 분기점을 확인할 수 있습니다. 가나자와를 거쳐 돌아서 간다면{" "}
            <Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>
              호쿠리쿠 아치 패스(영어)
            </Link>
            로 7일 동안 호쿠리쿠 신칸센과 선더버드를 이용해 도쿄에서 오사카까지 갈 수 있지만, 도카이도 신칸센에는 사용할 수
            없습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS(7/14/21일) →
            </KlookLink>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 편도 티켓 보기 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>저렴한 방법</span>
          <h2 className={styles.sectionTitle}>도쿄에서 오사카까지 더 저렴한 방법이 있나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            신칸센에서는 {NON_RESERVED}의 자유석이 가장 저렴한 정규 요금이고, smartEX는 모든 지정석을 ¥200 할인합니다. 그보다
            저렴한 방법은 약 8~9시간 걸리는 야간 고속버스입니다.
          </p>
          <Table
            head={["선택지", "소요 시간", "비용", "평가", "출처와 확인일"]}
            rows={altRows.map((r) => [r.option, r.time, r.cost, r.verdict, r.source])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "smartEX 자유석 요금(PDF)", href: "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_non_reserved.pdf" },
              { label: "smartEX 서비스", href: "https://smart-ex.jp/en/product/plan/service/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            가는 길에 교토에 들른다면{" "}
            <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
              도쿄에서 교토 가는 법(영어)
            </Link>
            에서 그 구간의 버스와 열차를 비교하고,{" "}
            <Link href="/ko/guides/transport/kyoto-to-tokyo-shinkansen" style={linkStyle}>
              교토 도쿄 신칸센 가이드
            </Link>
            에서 돌아오는 길을 다룹니다. 다른 구간은{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              신칸센 티켓 구매 방법(영어)
            </Link>
            표에서 smartEX, 역, 클룩, JR 패스를 큰 짐 좌석 규정과 함께 비교합니다.
          </p>

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
            와 smart-ex.jp에서 2026년 11월 13일에 확인한 규정입니다. 나고야에서 보낼 하루는{" "}
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen" style={linkStyle}>
              도쿄–나고야 신칸센 가이드(영어)
            </Link>
            에 정리했습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>티켓</span>
          <h2 className={styles.sectionTitle}>도쿄 오사카 신칸센은 어떻게 예매하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            가장 저렴한 지정석 가격과 무료 변경을 원하면 smartEX, 여행의 다른 예약과 함께 한 번에 열차와 좌석 등급을 고르고
            싶다면 클룩, 이미 일본에 있고 당일 이동한다면 역, 같은 주에 오사카보다 훨씬 멀리 간다면 JR 패스를 이용하세요.
          </p>
          <Table
            head={["구매처", "가격", "예매 가능 시기", "변경과 환불"]}
            rows={bookingRows.map((r) => [r.route, r.price, r.when, r.cancel])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "smartEX 서비스", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "JR 도카이·JR 서일본 보도자료(역 요금)", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
              { label: "japanrailpass.net 노조미·미즈호 티켓", href: "https://japanrailpass.net/en/use/special-ticket/" },
              { label: "클룩 규정은 결제 화면에 표시" },
            ]}
          />
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 열차와 좌석 등급 고르기 →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            도쿄 오사카 신칸센은 미리 예매해야 하나요?
          </h3>
          <p className={styles.bodyText}>
            보통 날에는 필요 없지만 다음 날짜에는 필요합니다. 이 기간에는 노조미 전 차량이 지정석이므로 당일 노조미 자유석
            티켓이 없고, 아침 열차 좌석부터 매진됩니다. 히카리와 고다마에는 자유석 차량이 있지만, JR은 매우 혼잡할 수 있다고
            안내합니다. JR 도카이 사이트에서 {OWN}에 확인했습니다.
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
            그 밖의 날에 미리 예매할 이유는 세 가지뿐입니다. 세 변의 합이 161~250cm인 짐은 특대 수하물 공간이 딸린 지정석이
            필요하며(없이 타면 ¥1,000, 250cm를 넘는 짐은 반입 불가), 정해진 환승 일정이 있을 때, 그리고 후지산을 보고 싶을
            때입니다. 자유석 차량에는 두 좌석 모두 없습니다. JR 도카이의{" "}
            <a href="https://global.jr-central.co.jp/en/info/oversized-baggage/" target="_blank" rel="noopener noreferrer">
              특대 수하물 안내 페이지
            </a>
            에서 {OWN}에 확인한 규정입니다.
          </p>
          <p className={styles.bodyText}>
            좌석보다 캐리어가 문제라면 짐을 따로 보낼 수 있습니다. 클룩의 LuggAgent 당일 배송은 도쿄 권역 호텔에서 오사카 권역
            호텔로 짐을 옮깁니다. 예약 전에 두 호텔이 모두 대상인지, 아침 맡기는 마감 시간은 언제인지 상품 페이지에서
            확인하세요. 더 느리고 저렴한 방법은 야마토 운수의 다큐빈(TA-Q-BIN)이며, 크기별 요금은{" "}
            <Link href="/guides/transport/japan-luggage-delivery" style={linkStyle}>
              일본 수하물 배송 가이드(영어)
            </Link>
            에 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <KlookLink href={LUGGAGE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도쿄 → 오사카 당일 수하물 배송 →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            도쿄에서 오사카로 갈 때 후지산은 어느 쪽 좌석에서 보이나요?
          </h3>
          <p className={styles.bodyText}>
            서쪽으로 갈 때 진행 방향 오른쪽입니다. 보통차는 <strong>E석</strong>, 그린차는 <strong>D석</strong>으로, JR 도카이의
            안내서가 직접 꼽는 좌석입니다. smartEX 좌석 배치도에서 고르거나 매표소에서 요청하세요. 보이는지는 날씨에 달려
            있으며, JR 도카이는 후지산이 보이지 않을 수 있다고 안내합니다.{" "}
            <a href="https://global.jr-central.co.jp/en/goldenroute/shinkansen/" target="_blank" rel="noopener noreferrer">
              JR 도카이 Shinkansen Perfect Guide
            </a>
            에서 {OWN}에 확인했습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>요금 인상</span>
          <h2 className={styles.sectionTitle}>도쿄 오사카 신칸센 가격이 오르나요?</h2>
          <p className={styles.bodyText}>
            2027년부터 오릅니다. JR 도카이와 JR 서일본은 2026년 10월 16일, <strong>2027년 7월 1일 이후 구매하는 티켓</strong>부터
            노조미 지정석 요금을 올려 도쿄–신오사카가 {WINDOW_NOZOMI}에서 <strong>¥15,420</strong>이 된다고 발표했습니다. 그린차는
            2027년 12월 15일 이후 승차분부터 ¥19,590에서 <strong>¥23,290</strong>이 됩니다. 자유석 요금은 바뀌지 않으며, 그 전에
            예매한 여행은 영향을 받지 않습니다. 보도자료에는 역 가격만 있고 smartEX 가격은 없습니다. {OWN} 확인.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>도착</span>
          <h2 className={styles.sectionTitle}>신칸센으로 도착한 뒤 오사카 어디에 묵어야 하나요?</h2>
          <p className={styles.bodyText}>
            신오사카에서 미도스지선으로 가는 우메다나 난바입니다. 신칸센은 오사카역까지 가지 않으므로 마지막 지하철 구간은 어느
            여행에나 포함됩니다. 우메다는 두 정거장, 난바는 같은 열차로 몇 정거장 더 가면 됩니다. 지역 비교는{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>
              오사카 숙소 지역 가이드(영어)
            </Link>
            에 자세히 정리했습니다. 오전 중에 도착한다면 1일 {PRICES.osakaAmazingPass.adult}의 오사카 주유패스로 지하철과 관광지를
            이용할 수 있습니다(운영사 가격, {dateLabel(PRICES.osakaAmazingPass.checked, LOCALE)} 확인).{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              오사카 주유패스 손익 분기점 표(영어)
            </Link>
            에서 계산을 확인하고,{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>
              오사카 2일 일정(영어)
            </Link>
            으로 그다음 일정을 짤 수 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={AMAZING_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              오사카 주유패스 →
            </KlookLink>
            <KlookLink href={FOOD_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도톤보리 음식 투어 →
            </KlookLink>
          </div>
        </section>

        <KlookStayAreas
          heading="미도스지선 근처 오사카 호텔"
          intro="세 지역 모두 신오사카에서 미도스지선으로 이어지므로, 가는 방법보다 그다음 일정에 맞춰 고르면 됩니다."
          areas={stayAreas}
        />

        <KlookTripPrep
          label="신칸센과 함께 예약"
          heading="도착하는 날 예약할 것"
          intro="이날 열차는 JR이 이미 해결해 둔 부분입니다. 나머지에 필요한 것은 도착지의 점심, 시내 이동 수단, 숙소, 휴대폰의 모바일 데이터, 그리고 간사이에서 귀국한다면 마지막 아침의 수하물 배송입니다."
          items={arrivalPrep}
        />

        <KlookTourPicks
          heading="도착한 날 오후에 예약할 것"
          intro="점심때쯤 도착한다면 이 두 가지로 하루를 채울 수 있습니다. 날짜별 예약 가능 여부와 현재 가격은 상품 페이지에서 확인하세요."
          tours={tourPicks}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>탑승 전</span>
          <h2 className={styles.sectionTitle}>탑승 전에 준비할 한 가지</h2>
          <p className={styles.bodyText}>
            모바일 데이터입니다. smartEX 변경, QR 티켓, 지연 안내는 모두 휴대폰으로 확인하고, 신오사카에서 내리는 순간 지도가
            필요합니다.{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              클룩 eSIM 보기 →
            </KlookLink>{" "}
            <Link href="/ko/guides/esim/best-esim-japan" style={linkStyle}>
              일본 eSIM 추천 가이드
            </Link>
            에서 다른 선택지와 비교했습니다.
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/japan-first-time-itinerary", title: "일본 첫 여행 일정(2026): 9일 일정(영어)" },
            { href: "/guides/transport/shinkansen-guide", title: "신칸센 가이드 2026: 티켓, 패스, 처음 타는 사람을 위한 팁(영어)" },
            { href: "/guides/transport/tokyo-to-kyoto", title: "도쿄에서 교토 가는 법(2026): 가장 싸고 빠른 방법(영어)" },
            { href: "/ko/guides/transport/kyoto-to-tokyo-shinkansen", title: "교토 도쿄 신칸센 2026: 가격, 소요 시간, 예매 방법" },
            { href: "/guides/transport/tokyo-to-nagoya-shinkansen", title: "도쿄–나고야 신칸센: 소요 시간, 요금, JR 패스(영어)" },
            { href: "/guides/transport/jr-pass-guide", title: "JR 패스 가격 2026: 10월 1일 새 가격과 이득인 경우(영어)" },
            { href: "/ko", title: "한국어 가이드 전체 보기 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>좌석을 예매하고, 오사카 일정을 정하세요</h2>
            <p className={styles.ctaBannerDesc}>
              후지산을 보려면 E석, 큰 짐이 있다면 지정석 차량, JR 패스가 있다면 히카리를 고르세요.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                도쿄 → 오사카 티켓 보기 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
