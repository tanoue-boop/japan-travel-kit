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
  hanedaLimousineBus,
  jrPassWholeJapan,
  klookEsim,
  kyotoToTokyoArrivalStayAreas,
  kyotoToTokyoTripPrep,
  luggageDeliveryCards,
  naritaLimousineBus,
  shinkansenKyotoTokyo,
  tokyoPrivateAirportTransfer,
  tokyoSharedAirportTransfer,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/kyoto-to-tokyo-shinkansen) section by section as of
// 2026-11-27 (task jtk-20261127-TR01): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: 교토 도쿄 신칸센 — the phrase Korean results use for this route (ekitan.com/ko
// "교토에서 도쿄 신칸센 요금 및 티켓 예약 방법", shinkansen-ticket.com/ko "교토발 도쿄행").

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/transport/kyoto-to-tokyo-shinkansen";
const TITLE = "교토 도쿄 신칸센 2026: 가격, 소요 시간, 예매 방법";
const H1 = "교토 도쿄 신칸센 2026: 소요 시간, 가격, 예매 방법";
const DESC =
  "교토 도쿄 신칸센: 노조미 2시간 12분, 1시간 8~12편. 지정석 ¥13,970, 자유석 ¥13,320, JR 패스는 ¥4,960 추가.";

const OWN_ISO = "2026-10-29";
const OWN = dateLabel(OWN_ISO, LOCALE);
const NOW = dateLabel("2026-11-11", LOCALE);
const TODAY_ISO = "2026-11-27";
const TODAY = dateLabel(TODAY_ISO, LOCALE);

const FARE_SOURCES = [
  { label: "smartEX 요금(JR 도카이)", href: "https://smart-ex.jp/en/product/plan/service/" },
  { label: "JR 도카이 열차 운행 정보", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
  { label: "JR 도카이 요금 개정 보도자료", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
  { label: "JAPAN RAIL PASS 노조미·미즈호 티켓", href: "https://japanrailpass.net/en/use/special-ticket/" },
  { label: "JR 도카이 특대 수하물 안내", href: "https://global.jr-central.co.jp/en/info/oversized-baggage/" },
];

const STATION_NOZOMI = "¥14,170";
const NOZOMI_RESERVED = "¥13,970";
const HIKARI_RESERVED = "¥13,650";
const NON_RESERVED = "¥13,320";
const NOZOMI_TICKET = "¥4,960";
const JR_PASS_7 = "¥50,000";
const BAGGAGE_FEE = "¥1,000";

const SHINKANSEN_URL = klookFor(shinkansenKyotoTokyo.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);
const PRIVATE_TRANSFER_URL = klookFor(tokyoPrivateAirportTransfer.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

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

const trainTypeRows = [
  {
    train: "결론: 노조미 탑승",
    time: "대부분 2시간 12분, 환승 없음",
    count: "낮 시간대 1시간에 8~12편",
    reserved: `${NOZOMI_RESERVED}(역에서 사면 ${STATION_NOZOMI})`,
    nonReserved: NON_RESERVED,
    pass: `히카리는 추가 요금 없음. 노조미는 ${NOZOMI_TICKET} 티켓 추가`,
  },
  {
    train: "노조미",
    time: "2시간 7분~2시간 15분",
    count: "하루 151편, 07:00~21:00 1시간에 8~12편",
    reserved: NOZOMI_RESERVED,
    nonReserved: `${NON_RESERVED}(전석 지정석 성수기에는 없음)`,
    pass: `추가 요금: 탈 때마다 ${NOZOMI_TICKET}의 노조미·미즈호 티켓`,
  },
  {
    train: "히카리",
    time: "2시간 24분~2시간 51분",
    count: "하루 30편, 1시간에 2편",
    reserved: HIKARI_RESERVED,
    nonReserved: NON_RESERVED,
    pass: "이용 가능, 좌석 지정 무료",
  },
  {
    train: "고다마",
    time: "3시간 38분",
    count: "하루 12편, 1시간에 1편(08:10~19:10)",
    reserved: HIKARI_RESERVED,
    nonReserved: NON_RESERVED,
    pass: "이용 가능, 좌석 지정 무료. 모든 역에 정차",
  },
];

const stationRows = [
  {
    item: "도쿄행 신칸센 승강장",
    answer: "11번, 12번 선",
    detail:
      "JR 서일본의 2026년 11월 11일 교토역 시각표에서 도쿄행 열차는 모두 11번 또는 12번 선에서 출발합니다. 내 열차의 승강장은 전광판과 티켓에서 확인하세요. JR 서일본은 당일 승강장이 바뀔 수 있다고 안내합니다",
    source: `timetable.jr-odekake.net, ${NOW}`,
  },
  {
    item: "남쪽 거리에서 올 때",
    answer: "하치조 출구",
    detail:
      "신칸센 대합실은 하치조(남쪽) 쪽에 있습니다. '신칸센 중앙 출구'라는 개찰구는 하치조 출구로 이어지며, 재래선의 북쪽 '중앙 출구'가 아닙니다. 가장 많이 헷갈리는 부분입니다",
    source: `kyoto.travel(교토시 관광협회), ${NOW}`,
  },
  {
    item: "북쪽 거리에서 올 때",
    answer: "중앙 출구(교토 타워 쪽)",
    detail:
      "시내버스 터미널은 북쪽 중앙 출구 바로 앞, 교토 타워 아래에 있습니다. 이쪽에서 오면 캐리어를 끌고 역을 가로질러 신칸센 개찰구까지 몇 분은 걸린다고 생각하세요",
    source: `kyoto.travel, ${NOW}`,
  },
  {
    item: "JR 재래선(교토선, 고세이선, 나라선)에서 갈아탈 때",
    answer: "중앙 환승 개찰구",
    detail:
      "'JR선 환승(중앙 환승)' 개찰구는 개찰구 밖으로 나가지 않고 재래선 승강장에서 신칸센으로 이어지며, 개찰구 바로 바깥에 에스컬레이터, 엘리베이터, 다목적 화장실이 있습니다",
    source: `kyoto.travel, ${NOW}`,
  },
  {
    item: "지하철 가라스마선에서 올 때",
    answer: "지하철 남쪽 개찰구 → 하치조 쪽",
    detail:
      "신칸센 대합실 안쪽의 하치조 동쪽 출구를 포함해 하치조 쪽 통로는 지하로 가라스마선 남쪽 개찰구와 이어집니다",
    source: `kyoto.travel, ${NOW}`,
  },
];

const bookingRows = [
  {
    item: "지정석 예매 시작",
    answer: "승차일 1개월 전",
    detail:
      "JR 도카이의 수하물 안내에는 특대 수하물 공간이 딸린 좌석도 '다른 지정석과 마찬가지로' 1개월 전부터 예매할 수 있다고 적혀 있습니다. JAPAN RAIL PASS의 노조미·미즈호 티켓은 '승차일 1개월 전부터 승차 당일까지' 판매합니다",
    source: `global.jr-central.co.jp, japanrailpass.net, ${NOW}`,
  },
  {
    item: "2026~27년에 남은 노조미 전석 지정석 기간",
    answer: "2026년 12월 25일~2027년 1월 5일, 2027년 1월 9~11일, 2027년 3월 20~22일",
    detail:
      "이 기간에는 노조미에 자유석 차량이 없어 당일 자유석으로 노조미를 탈 수 없습니다. 히카리와 고다마는 자유석이 그대로 있지만 JR 도카이는 '혼잡할 수 있다'고 안내합니다",
    source: `railway.jr-central.co.jp/nozomi, global.jr-central.co.jp/en/nozomi, ${OWN}`,
  },
  {
    item: "세 변의 합이 160cm 이하인 짐",
    answer: "예매 불필요, 요금 없음",
    detail: "머리 위 선반, 발밑 또는 객실 출입구 쪽 수납 공간에 둡니다",
    source: `JR 도카이 수하물 안내, ${NOW}`,
  },
  {
    item: "161~250cm인 짐",
    answer: "특대 수하물 공간이 딸린 좌석 예매",
    detail: `요금은 보통차 지정석이나 그린차 좌석과 같습니다. 매표소, 지정석 발매기('특대 수하물 공간 딸린 좌석') 또는 온라인으로 예매합니다. 예매 없이 타면 수수료 ${BAGGAGE_FEE}(세금 포함)를 냅니다`,
    source: `JR 도카이 수하물 안내, ${NOW}`,
  },
  {
    item: "250cm를 넘는 짐",
    answer: "반입 불가",
    detail: "JR 도카이는 세 변의 합이 250cm를 넘는 짐은 '차내에 반입할 수 없다'고 안내합니다. 택배로 보내세요",
    source: `JR 도카이 수하물 안내, ${NOW}`,
  },
];

const routeRows = [
  {
    item: "교토 → 도쿄 최단 소요 시간",
    value: "2시간 7분, 노조미 대부분은 2시간 12분",
    detail:
      "JR 도카이의 2026년 11월 27일 열차 운행 정보에서 교토발 도쿄행 노조미는 모두 2시간 7분~2시간 15분이며 환승이 없습니다. 이날 가장 빠른 열차는 막차인 노조미 64호(21:38 → 23:45)였습니다",
    source: `traininfo.jr-central.co.jp, ${TODAY}`,
  },
  {
    item: "하루 교토발 도쿄행 열차 수",
    value: "193편: 노조미 151, 히카리 30, 고다마 12",
    detail:
      "JR 도카이의 2026년 11월 27일 목록에서 도쿄까지 가는 열차만 셌습니다. 07:00부터 21:00까지 매시간 노조미 8~12편, 히카리 1시간에 2편, 고다마 1시간에 1편입니다. 고다마는 모든 역에 서며 노조미보다 약 1시간 30분 더 걸립니다",
    source: `traininfo.jr-central.co.jp, ${TODAY}`,
  },
  {
    item: "도쿄행 첫차와 막차",
    value: "06:14, 21:38(23:45 도착)",
    detail:
      "도쿄행 첫차는 06:14 노조미 230호, 막차는 21:38 노조미 64호로 23:45에 도쿄에 도착합니다. 그 이후 동쪽으로 가는 열차는 나고야까지만 운행합니다",
    source: `traininfo.jr-central.co.jp, ${TODAY}; timetable.jr-odekake.net, ${NOW}`,
  },
  {
    item: "이 구간에서 판매하는 좌석 등급",
    value: "보통차 자유석, 보통차 지정석, 그린차 지정석",
    detail:
      "클룩의 교토발 도쿄행 노선 페이지에 나와 있는 세 가지 티켓입니다. 도카이도 신칸센에는 그랑클래스가 없으며, 그랑클래스는 도호쿠·호쿠리쿠 신칸센의 차량입니다. JR 도카이의 새 등급 슈프림 클래스가 그린차보다 위 등급으로 이 노선에 도입되지만, 노선 페이지에서는 아직 판매하지 않습니다",
    source: `klook.com 철도 페이지, ${OWN}`,
  },
  {
    item: "종착역 전의 도쿄 권역 정차역",
    value: "신요코하마, 시나가와, 도쿄 순",
    detail:
      "JR 도카이의 역 목록 기준 동쪽 방향 정차 순서는 교토, 마이바라, 기후하시마, 나고야, 미카와안조, 도요하시, 하마마쓰, 가케가와, 시즈오카, 신후지, 미시마, 아타미, 오다와라, 신요코하마, 시나가와, 도쿄입니다. 마지막 세 역 중 어디서 내릴지는 아래에서 정리합니다",
    source: `global.jr-central.co.jp 역 목록, ${OWN}`,
  },
  {
    item: "신오사카에서 출발하는 경우",
    value: "같은 열차가 반대 방향으로도 운행",
    detail:
      "노선 전체 기준으로 JR 도카이는 '도쿄역에서 신오사카까지 단 2시간 21분'이라고 안내합니다. 교토는 신오사카 바로 앞 역이므로 교토 출발은 오사카 출발보다 약 15분 짧습니다",
    source: `JR 도카이 Shinkansen Perfect Guide, ${OWN}`,
  },
];

const priceRows = [
  {
    item: "노조미 보통차 지정석",
    price: NOZOMI_RESERVED,
    covers:
      "JR 도카이 smartEX의 성인 1명, 편도, 통상기 요금입니다. smartEX의 시즌 규정에 따라 비수기에는 ¥200 저렴하고 성수기에는 더 비쌉니다",
    source: `smart-ex.jp 요금표 "As of April 1, 2025", ${TODAY}`,
  },
  {
    item: "노조미 보통차 지정석(역 구매)",
    price: STATION_NOZOMI,
    covers:
      "JR 도카이의 도쿄·시나가와–교토 노조미 통상기 기본 요금으로, 발매기나 JR 매표소에서 살 때의 가격입니다. JR 도카이와 JR 서일본은 2027년 7월 1일 이후 구매분부터 이 구간 노조미 지정석 요금을 ¥700 올린다고 발표했으며, 자유석 요금은 바뀌지 않습니다",
    source: `jr-central.co.jp 2023년 5월 30일, 2026년 10월 16일 보도자료, ${TODAY}`,
  },
  {
    item: "히카리·고다마 보통차 지정석",
    price: HIKARI_RESERVED,
    covers:
      "느린 열차의 같은 좌석으로, 노조미보다 ¥320 저렴합니다. JAPAN RAIL PASS로 추가 티켓 없이 탈 수 있는 열차입니다",
    source: `smart-ex.jp 요금표 "As of April 1, 2025", ${NOW}`,
  },
  {
    item: "보통차 자유석",
    price: NON_RESERVED,
    covers:
      "자유석 차량이 있는 노조미, 히카리, 고다마 어느 열차든 빈자리에 앉습니다. 아래에 정리한 성수기에는 노조미 전 차량이 지정석이므로 노조미 자유석은 이용할 수 없습니다",
    source: `smart-ex.jp 요금표 "As of April 1, 2025", ${NOW}`,
  },
  {
    item: "그린차 지정석",
    price: "보통차 지정석보다 비쌈, 별도 등급으로 판매",
    covers:
      "클룩의 교토발 도쿄행 노선 페이지에서는 이 구간의 세 등급을 모두 판매합니다. 그린차는 더 조용하고 넓은 차량이며, 후지산이 보이는 창가 좌석 알파벳도 달라집니다. JR 도카이는 그린차에서는 E석이 아니라 D석을 안내합니다",
    source: `klook.com 철도 페이지, JR 도카이 Shinkansen Perfect Guide, ${OWN}`,
  },
  {
    item: "JR 패스 소지자용 노조미·미즈호 티켓",
    price: `도쿄–교토 ${NOZOMI_TICKET}`,
    covers:
      "JAPAN RAIL PASS 소지자가 노조미를 탈 때마다 사야 하는 전용 티켓입니다. JR은 '그린차, 보통차 지정석, 보통차 자유석 모두 같은 가격'이라고 안내하며, '승차일 1개월 전부터 승차 당일까지' 판매합니다",
    source: `japanrailpass.net, ${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS 보통차",
    price: `7일 ${JR_PASS_7}, 14일 ¥80,000, 21일 ¥100,000(온라인)`,
    covers:
      "해외 여행사에서 사는 교환권은 ¥53,000, ¥84,000, ¥105,000입니다. 그린차용은 온라인 ¥70,000, ¥110,000, ¥140,000, 교환권 ¥74,000, ¥116,000, ¥147,000입니다",
    source: `japanrailpass.net 공식 요금 페이지, ${OWN}`,
  },
  {
    item: "특대 수하물, 좌석 예매 없이 탑승",
    price: `${BAGGAGE_FEE}(세금 포함)`,
    covers:
      "세 변의 합이 160cm를 넘는 짐을 들고 특대 수하물 공간이 딸린 지정석 없이 탔을 때 JR이 받는 수수료입니다. 좌석 자체는 추가 요금이 없습니다. 아래 수하물 항목을 참고하세요",
    source: `JR 도카이 수하물 안내, ${OWN}`,
  },
];

const compareRows = [
  {
    option: "보통차 지정석 1장, 미리 예매",
    cost: `노조미 ${NOZOMI_RESERVED}, 히카리 ${HIKARI_RESERVED}(smartEX)`,
    gets: "2시간 직행 열차의 내 좌석이 정해지고, 호텔을 나서기 전에 짐 문제도 해결됩니다.",
    pick: "기본 선택입니다. 특히 교토의 마지막 아침이라면 산 물건을 모두 들고 놓치면 안 되는 열차를 타게 되므로 더욱 그렇습니다.",
  },
  {
    option: "보통차 자유석, 당일 탑승",
    cost: `${NON_RESERVED}(smartEX)`,
    gets: "승강장에 도착한 시점에 자유석 차량이 있는 아무 열차나 탈 수 있습니다.",
    pick: "평일에 짐이 가볍다면 괜찮습니다. 아래 성수기에는 노조미에 자유석 차량이 아예 없으므로 맞지 않습니다.",
  },
  {
    option: "JAPAN RAIL PASS로 히카리·고다마 탑승",
    cost: `온라인 ${JR_PASS_7}, 교환권 ¥53,000`,
    gets: "추가 요금 없이 이 구간을 탈 수 있고, 도쿄에서 야마노테선과 나리타 익스프레스도 이용할 수 있습니다. 히카리(JR 도카이 11월 27일 목록 기준 2시간 24분~2시간 51분)나 고다마(3시간 38분) 모두 직행입니다.",
    pick: "같은 주에 히로시마, 가나자와, 도호쿠 일정이 이미 있을 때만 맞습니다. 교토–도쿄 편도와 도쿄–교토 편도를 합쳐도 ¥50,000에 한참 못 미칩니다.",
  },
  {
    option: "JAPAN RAIL PASS + 노조미 티켓",
    cost: `${JR_PASS_7} + 이 구간 ${NOZOMI_TICKET}`,
    gets: "패스에 빠른 열차까지 더해집니다. 히카리의 2시간 24분~2시간 51분 대신 약 2시간 12분입니다.",
    pick: "비행기를 타야 하거나 도쿄에 시간이 정해진 예약이 있는 구간이라면 추가할 만합니다. 그린차, 지정석, 자유석 어디에 앉든 JR이 정한 가격은 같습니다.",
  },
  {
    option: "야간버스",
    cost: "신칸센 요금의 일부, 약 7~8시간",
    gets: "두 도시 사이를 가장 싸게 이동하는 방법이며, 차내에서 1박을 합니다.",
    pick: "큰 캐리어를 들고 도쿄로 갈 때는 맞는 경우가 드뭅니다. 도쿄발 교토행 페이지에서 제대로 비교하므로 여기서는 표를 반복하지 않습니다.",
  },
];

const buyRows = [
  {
    way: "결론: 대부분의 여행자는 smartEX",
    price: `노조미 지정석 ${NOZOMI_RESERVED}, 역 가격 ${STATION_NOZOMI}보다 ¥200 저렴`,
    when: "미리 예매하고 좌석 배치도에서 자리를 고르며, 변경은 무료입니다. 출국 전에 결제를 끝내고 싶다면 클룩",
    board: "QR 티켓 또는 등록한 IC 카드",
  },
  {
    way: "smartEX(JR 도카이 공식 사이트와 앱, 영어 지원)",
    price: `노조미 ${NOZOMI_RESERVED}, 히카리·고다마 ${HIKARI_RESERVED}, 자유석 ${NON_RESERVED}`,
    when: "1년 전 오전 5:30부터(열차와 좌석은 1개월 전에 확정) 출발 4분 전까지. 출발 전 변경 무료, 환불 수수료 ¥320",
    board: "QR 티켓이나 IC 카드로 신칸센 개찰구를 바로 통과",
  },
  {
    way: "역 발매기 또는 JR 매표소",
    price: `노조미 지정석 ${STATION_NOZOMI}, 통상기`,
    when: "지정석은 승차일 1개월 전부터 예매할 수 있습니다. JR 패스 소지자가 좌석을 지정하고 노조미·미즈호 티켓을 사는 곳도 여기입니다",
    board: "종이 티켓으로 개찰구 통과",
  },
  {
    way: "클룩(교토발 도쿄행 노선 페이지)",
    price: "날짜별 가격은 상품 페이지에 표시(여기에는 적지 않음)",
    when: "출국 전에 예매합니다. 노선 페이지에서 자유석, 보통차 지정석, 그린차 지정석을 판매합니다",
    board: "상품 페이지의 수령·탑승 안내를 따르세요",
  },
];

const arrivalRows = [
  {
    station: "결론: 도쿄역",
    forWho: "대부분의 여행자. 하네다, 시부야, 오다이바로 간다면 시나가와",
    why: "종착역이라 내릴 역을 놓칠 걱정이 없습니다. 시나가와는 그 한 역 전입니다",
    transfer: "아래 두 행 참고",
    source: `JR 도카이 역 목록, ${OWN}`,
  },
  {
    station: "도쿄역",
    forWho: "마루노우치, 긴자, 니혼바시, 아사쿠사, 우에노, 그리고 나리타에서 출국하는 사람",
    why: "종착역이라 내릴 역을 신경 쓸 필요가 없습니다. 나리타 익스프레스와 마루노우치선, 야마노테선, 주오선, 게이요선이 모두 같은 역 건물에서 출발하고, 도카이도 신칸센 승강장도 역 안에 있습니다",
    transfer: "나리타 익스프레스, JR 야마노테선, 주오선, 게이요선, 도쿄 메트로 마루노우치선",
    source: `JR 도카이 역 목록, ${OWN}`,
  },
  {
    station: "시나가와",
    forWho: "시부야, 메구로, 오다이바, 요코하마, 그리고 하네다에서 출국하는 사람",
    why: "종착역 한 역 전이라 도쿄역까지의 마지막 구간과 도쿄역의 혼잡을 피할 수 있습니다. 하네다행 게이큐선이 같은 역에서 출발하고, 야마노테선으로 몇 정거장이면 시부야입니다",
    transfer: "JR 야마노테선, 하네다 공항행 게이큐선",
    source: `JR 도카이 역 목록, ${OWN}`,
  },
  {
    station: "신요코하마",
    forWho: "요코하마, 미나토미라이, 가마쿠라 등 남서쪽 지역",
    why: "도쿄 두 역 전입니다. 숙소가 도쿄가 아니라 요코하마라면 여기서 내려야 캐리어를 들고 1시간 가까이 되돌아오는 일이 없습니다",
    transfer: "요코하마 방면 재래선",
    source: `JR 도카이 역 목록, ${OWN}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "교토에서 도쿄까지 신칸센 소요 시간은 얼마나 걸리나요?",
    a: `가장 빠른 노조미로 환승 없이 약 2시간 12분입니다. JR 도카이의 2026년 11월 27일 교토 출발 목록에서 노조미는 모두 2시간 7분~2시간 15분이었습니다. 히카리는 2시간 24분~2시간 51분, 모든 역에 서는 고다마는 3시간 38분입니다. 낮 시간대에는 1시간에 노조미 8~12편과 히카리 2편, 고다마 1편이 있으며, 도쿄행 첫차는 06:14, 막차는 21:38(23:45 도착)입니다. ${TODAY} 확인했으며, 소요 시간은 열차와 날짜에 따라 조금씩 다릅니다.`,
  },
  {
    q: "교토 도쿄 신칸센 가격은 얼마인가요?",
    a: `JR 도카이 smartEX 기준 편도 노조미 지정석 ${NOZOMI_RESERVED}, 히카리·고다마 지정석 ${HIKARI_RESERVED}, 자유석 ${NON_RESERVED}입니다. 성인 1명, 통상기, smartEX 요금표("As of April 1, 2025") 기준이며 ${TODAY}에 확인했습니다. 역 발매기나 매표소에서는 노조미 지정석이 JR 도카이 기본 요금인 ${STATION_NOZOMI}입니다. 지정석은 비수기에 ¥200 저렴하고 성수기에는 ¥200~¥400 비쌉니다. JR 도카이는 2027년 7월 1일 이후 구매분부터 도쿄–교토 노조미 지정석 요금을 ¥700 올린다고 발표했으며, 자유석은 바뀌지 않습니다.`,
  },
  {
    q: "교토에서 노조미를 JR 패스로 탈 수 있나요?",
    a: `추가 요금을 내야 탈 수 있습니다. JAPAN RAIL PASS 소지자는 교토–도쿄 구간 노조미를 탈 때마다 ${NOZOMI_TICKET}의 노조미·미즈호 티켓을 사야 하고, 히카리와 고다마는 추가 요금 없이 좌석 지정도 무료입니다. 노조미 티켓은 승차일 1개월 전부터 판매하며 그린차, 지정석, 자유석 모두 같은 가격입니다(japanrailpass.net, ${TODAY} 확인). 이 한 구간만 보면 패스는 이득이 아닙니다. 7일 보통차 패스는 온라인 ${JR_PASS_7}, 교환권 ¥53,000이고 smartEX 편도 요금은 ${NOZOMI_RESERVED}입니다. 같은 주에 히로시마, 가나자와, 도호쿠 일정이 있을 때 이득이 되기 시작합니다.`,
  },
  {
    q: "교토 도쿄 신칸센은 미리 예매해야 하나요?",
    a: `성수기, 큰 짐이 있을 때, 비행기나 도쿄 숙소 예약이 기다리고 있을 때는 미리 예매하세요. 그 밖의 날에는 교토에서 노조미가 1시간에 8~12편 있으므로 ${NON_RESERVED}의 자유석으로도 충분합니다. JR 도카이가 정한 성수기에는 노조미 전 차량이 지정석이고(2026~27년 남은 기간: 2026년 12월 25일~2027년 1월 5일, 2027년 1월 9~11일, 2027년 3월 20~22일), 세 변의 합이 161~250cm인 짐은 특대 수하물 공간이 딸린 지정석이 필요합니다. 이 좌석은 티켓 요금에 포함되며, 예매 없이 타면 수수료 ${BAGGAGE_FEE}를 냅니다. 역에서는 승차일 1개월 전부터 지정석 예매가 시작되고, smartEX는 1년 전부터 신청할 수 있으며 출발 전 변경은 무료입니다. ${TODAY} 확인.`,
  },
  {
    q: "교토에서 도쿄로 갈 때 후지산은 어느 쪽 좌석에서 보이나요?",
    a: `진행 방향 왼쪽입니다. 보통차는 E석, 그린차는 D석을 예매하세요. JR 도카이의 Shinkansen Perfect Guide는 '후지산을 가장 잘 보려면 보통차는 E석, 그린차는 D석을 고르라'고 안내합니다. 좌석 알파벳은 차량에 고정되어 있으므로 교토에서 동쪽으로 갈 때는 그 창이 왼쪽에 옵니다. 이 방향에서는 후지산이 늦게, 전체 여정의 마지막 3분의 1인 시즈오카–신후지–미시마 구간에서 보이며, 구름에 가려 안 보이는 날도 많습니다. ${OWN} 확인.`,
  },
];

const tripPrepItems = [
  withKlookLocale(kyotoToTokyoTripPrep[0], LOCALE, {
    label: "도쿄 서브웨이 티켓(24 / 48 / 72시간)",
    ctaLabel: "서브웨이 티켓 보기 →",
    why: "신칸센 티켓은 개찰구에서 끝납니다. 이 티켓으로 도착 후 24, 48, 72시간 동안 도쿄 메트로와 도에이 지하철 전 노선을 탈 수 있습니다.",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[1], LOCALE, {
    label: "신주쿠 바 호핑 나이트 투어(도쿄)",
    ctaLabel: "신주쿠 저녁 투어 보기 →",
    why: "오후 중반까지 교토에서 노조미를 타면 해가 지기 전에 도쿄에 도착하고, 신주쿠는 도쿄역이나 시나가와에서 몇 정거장입니다. 음식과 음료가 포함된 3시간짜리 합류형 저녁 투어로 도착한 날을 도쿄의 첫날 밤으로 보낼 수 있습니다.",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[2], LOCALE, {
    label: "도쿄역·마루노우치 주변 호텔",
    ctaLabel: "클룩에서 호텔 가격 보기 →",
    why: "도카이도 신칸센은 도쿄역 안에서 끝나므로, 마루노우치의 호텔이라면 하루가 끝날 무렵 캐리어를 끌고 시내를 가로지르지 않고 승강장에서 걸어갈 수 있습니다.",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[3], LOCALE, {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "좌석은 휴대폰의 QR 코드나 예매 내역이고, 시나가와와 도쿄역 중 어디서 내릴지는 열차 안에서 정하게 됩니다. 둘 다 교토를 떠나기 전부터 모바일 데이터가 필요합니다.",
  }),
  withKlookLocale(luggageDeliveryCards.kyotoToTokyo, LOCALE, {
    label: "수하물 배송(도쿄 호텔 ⇔ 나리타 / 하네다)",
    ctaLabel: "호텔 ⇔ 공항 수하물 배송 보기 →",
    why: "교토에서 도쿄로 가는 여행은 대부분 하루이틀 뒤 나리타나 하네다에서 끝납니다. 짐 1개 단위로 예약하면 도쿄 호텔에서 공항으로 캐리어를 보내므로 마지막 관광일에 짐을 들고 다니지 않아도 됩니다.",
  }),
];

const stayAreas = [
  withKlookLocale(kyotoToTokyoArrivalStayAreas[0], LOCALE, {
    area: "도쿄역·마루노우치",
    why: "도카이도 신칸센이 역 건물 안에서 끝나므로 도착하면 위층으로 걸어 올라가기만 하면 됩니다. 귀국하는 날에는 나리타 익스프레스도 같은 역 지하에서 출발합니다.",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[1], LOCALE, {
    area: "긴자",
    why: "도쿄역에서 마루노우치선으로 한 정거장이고, 하네다에서 게이큐·도에이 직통 열차로 갈아타지 않고 히가시긴자까지 갈 수 있습니다. 교토발 열차가 여행의 마지막 바로 전 구간이라면 이곳입니다.",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[2], LOCALE, {
    area: "신주쿠",
    why: "신칸센 정차역은 아니지만 도쿄역에서 주오선으로 바로 가며, 주오선, 오다큐선, 게이오선의 기점입니다. 출국 전 하룻밤이 아니라 도쿄에 며칠 더 머문다면 이곳을 숙소로 고르세요.",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[3], LOCALE, {
    area: "시부야",
    why: "종착역 바로 전 도카이도 신칸센 역인 시나가와에서 야마노테선으로 두 정거장입니다. 시나가와에서 먼저 내리면 도쿄역에서 다시 되돌아올 필요가 없습니다.",
  }),
];

const tourPicks = [
  withKlookLocale(tokyoPrivateAirportTransfer, LOCALE, {
    title: "하네다·나리타 ⇄ 도쿄 단독 차량 픽업",
    desc: "역이 아니라 호텔 주소로 차량과 기사를 예약하는 서비스입니다. 두 공항 모두 이용할 수 있고 기사가 항공편을 확인하며, 24시간 운행하는 7인승과 10인승이 있습니다",
  }),
  withKlookLocale(tokyoSharedAirportTransfer, LOCALE, {
    title: "나리타·하네다 → 도쿄 합승 픽업",
    desc: "1~2명 여행자를 위해 차량 전체가 아니라 좌석 단위로 도쿄 중심부 주소까지 예약하는 방식입니다",
  }),
  withKlookLocale(naritaLimousineBus, LOCALE, {
    title: "나리타 공항 – 도쿄 리무진 버스",
    desc: "나리타 공항 3개 터미널과 도쿄의 호텔·역 정류장을 잇는 공항 리무진 버스로, 종이 티켓 대신 QR 코드로 탑승합니다",
  }),
  withKlookLocale(hanedaLimousineBus, LOCALE, {
    title: "하네다 공항 – 도쿄 리무진 버스",
    desc: "같은 회사의 하네다 공항 3개 터미널 출발 노선으로, 신주쿠, 이케부쿠로, 디즈니 리조트 등이 목적지에 포함되어 있습니다",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "교토 도쿄 신칸센" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function SourcesLine({ what }: { what: string }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      <strong>최종 확인: {TODAY_ISO}</strong>({what}). 공식 페이지:{" "}
      {FARE_SOURCES.map((s, i) => (
        <span key={s.href}>
          <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>{s.label}</a>
          {i < FARE_SOURCES.length - 1 ? ", " : "."}
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
                    style={{ fontSize: c === 0 ? "0.88rem" : c === row.length - 1 && head.length === 4 ? "0.82rem" : "0.85rem" }}
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

export default function KoKyotoToTokyoShinkansenPage({ updated }: { updated: PageUpdated }) {
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
            교토역에서 출발하는 노조미, 히카리, 고다마를 비교하고, smartEX와 역 창구, 클룩의 가격 차이와 도쿄에서 내릴
            역을 정리합니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "smartEX 요금(확인일 표기)", "교토역 11~12번 선", "도쿄, 시나가와, 신요코하마"].map((t) => (
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
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>교토 → 도쿄</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>최단 소요 시간</p>
                <p className={styles.verdictStatValue}>노조미 2시간 12분(최단 2시간 7분), 환승 없음</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>지정석(smartEX)</p>
                <p className={styles.verdictStatValue}>노조미 {NOZOMI_RESERVED}, 히카리 {HIKARI_RESERVED}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>도쿄행 막차</p>
                <p className={styles.verdictStatValue}>21:38, 23:45 도착</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR 패스 이용 시</p>
                <p className={styles.verdictStatValue}>히카리 무료, 노조미 {NOZOMI_TICKET}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>교토 도쿄 신칸센</strong>은 도카이도 신칸센 노조미로, JR 도카이의 {TODAY} 열차 운행 정보 기준 환승
              없이 <strong>약 2시간 12분</strong>(가장 빠른 열차는 2시간 7분) 걸립니다. 노조미 요금은 JR 도카이 smartEX 기준
              편도 <strong>지정석 {NOZOMI_RESERVED}</strong>, <strong>자유석 {NON_RESERVED}</strong>입니다(성인, 통상기. 역에서
              사면 지정석 {STATION_NOZOMI}). 교토에서는 07:00부터 21:00까지 <strong>1시간에 노조미 8~12편</strong>, 하루 151편이
              도쿄로 출발하며, 여기에 히카리 1시간 2편과 고다마 1시간 1편이 더해집니다.
            </p>
            <p className={styles.verdictText}>
              <strong>JAPAN RAIL PASS</strong>로는 히카리와 고다마를 추가 요금 없이 탈 수 있고, 노조미는 탈 때마다{" "}
              <strong>{NOZOMI_TICKET}</strong>의 노조미·미즈호 티켓이 필요합니다(japanrailpass.net, {TODAY}). 열차는 교토역
              하치조(남쪽) 쪽의 11번, 12번 선에서 출발하고, 도쿄행 막차는 21:38입니다. 이 페이지는 도쿄 방향 이동을 다룹니다.
              반대 방향은{" "}
              <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
                도쿄에서 교토 가는 법(영어)
              </Link>
              을 참고하세요.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                교토 → 도쿄 신칸센 티켓 보기 →
              </KlookLink>
              <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                JAPAN RAIL PASS 가격 보기 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="신칸센과 함께 예약"
          heading="같은 날 예약할 것: 지하철 티켓, 도쿄 저녁 투어, 호텔, eSIM"
          intro="열차는 도쿄역 안에서 끝납니다. 다음 날부터 쓸 지하철 티켓, 첫날 저녁 투어, 승강장 가까운 호텔, 이동 중 쓸 모바일 데이터, 공항 가는 날의 수하물 배송은 신칸센 티켓에 포함되지 않습니다."
          items={tripPrepItems}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>교토에서 도쿄로 가는 신칸센은 도쿄→교토와 무엇이 다른가요?</h2>
          <p className={styles.bodyText}>
            열차도 같고 노선도 같습니다. 달라지는 것은 그 주변입니다. 서쪽으로 갈 때는 대개 호텔 가까운 역에서 출발해
            종착역 한 곳에 도착하고, 출발 40분쯤 뒤 오른쪽에 후지산이 보입니다. 동쪽으로 갈 때는 교토 체류의 마지막
            아침에, 아주 큰 역의 반대편에 있는 승강장에서, 도착했을 때보다 많은 짐을 들고 출발합니다. 그리고 신칸센
            정차역이 세 곳인 도시에 도착하는데, 그중 나에게 맞는 역은 대개 한 곳뿐입니다.
          </p>
          <p className={styles.bodyText}>
            그래서 이 페이지는 이 방향에서만 생기는 네 가지 결정을 중심으로 정리했습니다.{" "}
            <strong>교토역의 어느 개찰구와 승강장을 이용할지</strong>, <strong>체크아웃 후 짐을 어떻게 할지</strong>,{" "}
            <strong>반대 방향으로 갈 때 후지산이 어느 쪽에 보이는지</strong>, 그리고{" "}
            <strong>도쿄, 시나가와, 신요코하마 중 어디서 내릴지</strong>입니다. 티켓 선택은 어느 방향이든 같으므로 아래에서
            다루고, 신칸센과 버스 비교는 도쿄→교토 페이지에 있으므로 같은 표를 다시 싣지 않고 링크만 걸었습니다.
          </p>
          <p className={styles.bodyText}>
            무엇보다 먼저 알아 둘 점이 있습니다. 도쿄행 열차는 생각보다 일찍 끝납니다. JR 서일본의 2026년 11월 11일
            교토역 시각표에서 도쿄행 막차는 <strong>21:38</strong>이고 23:45에 도쿄에 도착합니다. 이동하는 날 도쿄에서
            비행기를 타야 한다면, 요금보다 이 시각이 일정을 더 크게 좌우합니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>열차</span>
          <h2 className={styles.sectionTitle}>교토에서 도쿄까지 신칸센 소요 시간은?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            노조미 약 2시간 12분, 히카리 2시간 24분~2시간 51분, 고다마 3시간 38분이며 모두 환승 없는 직행입니다. 아래
            시간과 편수는 JR 도카이의 2026년 11월 27일 교토 출발 목록에 있는 도쿄행 열차 전체를 기준으로 했고, 요금은 JR
            도카이 smartEX의 성인 1명 통상기 가격입니다. 모두 {TODAY}에 확인했습니다.
          </p>
          <Table
            head={["열차", "교토 → 도쿄", "교토 출발 편수", "지정석(smartEX)", "자유석(smartEX)", "JR 패스 이용"]}
            rows={trainTypeRows.map((r) => [r.train, r.time, r.count, r.reserved, r.nonReserved, r.pass])}
          />
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
            <strong>큰 짐:</strong> 세 변의 합이 161~250cm인 캐리어는 &lsquo;특대 수하물 공간이 딸린 좌석&rsquo;을 티켓과 함께
            예매해야 하며 추가 요금은 없습니다. 예매 없이 타면 JR 도카이가 수수료 {BAGGAGE_FEE}(세금 포함)를 받습니다.
            160cm 이하는 예매가 필요 없고, 250cm를 넘는 짐은 반입할 수 없습니다.
          </p>
          <SourcesLine what="JR 도카이 교토 출발 목록의 소요 시간과 편수, smartEX 요금, JR 패스용 티켓, JR 도카이 수하물 규정" />
          <p className={styles.bodyText} style={{ margin: "1rem 0" }}>
            첫차와 막차, 도쿄 전 정차역 등 노선의 나머지 정보입니다.
          </p>
          <Table
            head={["항목", "내용", "의미", "출처와 확인일"]}
            rows={routeRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            두 부분으로 나뉜 요금 구조, 좌석 등급, 패스로 탈 수 있는 열차와 없는 열차 등 신칸센 티켓의 기본은{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              신칸센 가이드(영어)
            </Link>
            에 정리했고,{" "}
            <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
              도쿄에서 교토 가는 법(영어)
            </Link>
            은 이 여정의 반대 방향으로 야간버스와 열차 요금을 비교합니다. 오사카에서 출발한다면{" "}
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen" style={linkStyle}>
              도쿄–오사카 신칸센 가격과 시간 가이드(영어)
            </Link>
            에 신오사카 요금이 좌석 등급별로 나와 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              교토 → 도쿄 티켓 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>교토 도쿄 신칸센 가격은 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            편도 노조미 보통차 지정석 <strong>{NOZOMI_RESERVED}</strong>, 히카리·고다마 <strong>{HIKARI_RESERVED}</strong>,
            자유석 <strong>{NON_RESERVED}</strong>입니다. JR 도카이 smartEX의 성인 1명 통상기 가격으로, &ldquo;As of April 1,
            2025&rdquo;라고 적힌 요금표에서 가져와 {TODAY}에 다시 확인했습니다. 역 발매기나 매표소에서는 노조미 지정석이{" "}
            <strong>{STATION_NOZOMI}</strong>입니다. 패스 소지자용 항목은 japanrailpass.net의 공식 금액입니다.
          </p>
          <Table
            head={["티켓", "가격", "내용", "출처와 확인일"]}
            rows={priceRows.map((r) => [r.item, r.price, r.covers, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            가격은 바뀔 수 있으므로 구매 전에 확인하세요. smartEX 가격은 성인 1명 편도 기준이며, smartEX의 시즌 규정에 따라
            비수기 지정석은 ¥200 저렴하고 성수기에는 더 비쌉니다. 클룩 가격은 날짜에 따라 달라지므로 이 페이지에 적지
            않았습니다. 이용 날짜의 가격은 상품 페이지에서 확인하세요.
          </p>
          <SourcesLine what="smartEX 요금표, JR 도카이 요금 보도자료, japanrailpass.net" />
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>티켓</span>
          <h2 className={styles.sectionTitle}>교토 도쿄 신칸센 티켓은 어디서 예매하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            통상 요금이 가장 저렴한 곳은 JR 도카이의 smartEX입니다. 같은 노조미 좌석이 역에서는 {STATION_NOZOMI}, smartEX에서는{" "}
            {NOZOMI_RESERVED}입니다. 출국 전에 결제를 끝내고 싶다면 클룩을 이용하세요. JR 패스 소지자가 좌석을 지정하는 곳,
            그리고 누구나 당일 티켓을 살 수 있는 곳은 역 발매기와 매표소입니다.
          </p>
          <Table
            head={["구매처", "가격(성인, 통상기)", "예매 기간과 변경", "개찰구 통과 방법"]}
            rows={buyRows.map((r) => [r.way, r.price, r.when, r.board])}
          />
          <SourcesLine what="smartEX 예매 규정, 역 요금, JR 패스용 티켓. 클룩 좌석 등급은 2026년 10월 29일 철도 페이지 기준" />
          <p className={styles.bodyText}>
            짧은 답에서 빠진 내용도 있습니다. 아래 성수기에는 노조미 전 좌석이 지정석이므로 날짜가 정해지면 바로
            예매하세요. smartEX는 출발 전까지 변경이 무료이고 출발 전 환불에는 ¥320가 듭니다. 160cm를 넘는 짐은 특대 수하물
            공간이 딸린 좌석이 필요하며, JR 도카이는 이 좌석을 매표소, 지정석 발매기, 온라인에서 판매합니다. 티켓 종류별
            이용 방법은{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              신칸센 가이드(영어)
            </Link>
            를 참고하세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 교토 → 도쿄 좌석 보기 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>교토에서 노조미를 JR 패스로 탈 수 있나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            추가 요금을 내야 탈 수 있습니다. 패스 소지자는 도쿄행 노조미를 탈 때마다 <strong>{NOZOMI_TICKET}</strong>의
            노조미·미즈호 티켓을 사야 하고, 히카리와 고다마는 좌석 지정까지 무료입니다. 다만 이 구간 하나만을 위해 패스를
            사면 이득이 아닙니다. 7일 보통차 <strong>JAPAN RAIL PASS</strong>는 온라인 {JR_PASS_7}, 해외에서 사는 교환권
            ¥53,000이고, smartEX 노조미 편도 요금은 {NOZOMI_RESERVED}이므로 두 도시를 왕복해도 패스 가격에 미치지 못합니다.
            판단을 바꾸는 것은 그 주의 나머지 일정과 도쿄에서 JR을 얼마나 타는지입니다.
          </p>
          <Table
            head={["선택지", "비용", "얻는 것", "고르는 경우"]}
            rows={compareRows.map((r) => [r.option, r.cost, r.gets, r.pick])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            JR이 직접 밝힌 규정은 다음과 같습니다. 패스로 노조미나 미즈호를 타려면 JAPAN RAIL PASS 소지자에게만 발행하는
            전용 티켓이 필요하고, &ldquo;그린차, 보통차 지정석, 보통차 자유석 모두 같은 가격&rdquo;입니다. 도쿄–교토 구간은{" "}
            <strong>{NOZOMI_TICKET}</strong>이며, &ldquo;승차일 1개월 전부터 승차 당일까지&rdquo; 지정석 발매기, JR 매표소,
            여행 센터에서 판매합니다.{" "}
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR 패스 가격 가이드(영어)
            </Link>
            에서 2026년 10월 가격을 내 일정의 구간과 비교할 수 있고,{" "}
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" style={linkStyle}>
              도쿄·교토·오사카 7일 일정(영어)
            </Link>
            은 패스가 가장 자주 이득이 되는 여행 형태입니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS(7/14/21일) →
            </KlookLink>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              편도 티켓 가격 보기 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>차창 풍경</span>
          <h2 className={styles.sectionTitle}>교토에서 도쿄로 갈 때 후지산은 어느 쪽 좌석에서 보이나요?</h2>
          <p className={styles.bodyText}>
            진행 방향 <strong>왼쪽</strong>이며, 예매할 좌석 알파벳은 반대 방향과 같습니다. JR 도카이의 Shinkansen Perfect
            Guide는 조건 없이 이렇게 안내합니다. &ldquo;후지산을 가장 잘 보려면 보통차는 E석, 그린차는 D석을 고르세요.&rdquo;
            오른쪽인지 왼쪽인지는 적혀 있지 않고, 적을 필요도 없습니다. 좌석 알파벳은 열차가 향하는 방향이 아니라 차량에
            고정되어 있어서 E석과 D석 창문은 언제나 열차의 같은 쪽을 향합니다. 도쿄에서 서쪽으로 갈 때는 그쪽이 오른쪽,
            교토에서 동쪽으로 갈 때는 왼쪽입니다.
          </p>
          <p className={styles.bodyText}>
            보이는 시점도 반대가 됩니다. 서쪽으로 갈 때는 후지산이 일찍 보이고, 동쪽으로 갈 때는 늦게 보입니다. JR 도카이의
            정차 순서로 보면 후지산은 <strong>시즈오카–신후지–미시마</strong> 구간에 있고, 교토에서 출발하면 여정의 처음이
            아니라 마지막 3분의 1에 해당합니다. 잠을 잘 계획이라면 앞부분에 자 두세요.
          </p>
          <p className={styles.bodyText}>
            예매로 해결할 수 없는 점도 있습니다. 후지산은 안 보이는 날이 많습니다. 맑고 건조한 겨울 아침에 가장 잘 보이고,
            습한 여름 오후에 가장 안 보입니다. 창가 좌석은 예매할 만하지만, 날씨에 달린 풍경을 위해 그린차 요금을 더 낼
            필요는 없습니다. {OWN} 확인.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>교토역 출발</span>
          <h2 className={styles.sectionTitle}>교토역에서 도쿄행 신칸센은 몇 번 승강장에서 출발하나요?</h2>
          <p className={styles.bodyText}>
            <strong>11번 또는 12번 선입니다.</strong> JR 서일본의 2026년 11월 11일 교토역 시각표에서 도쿄행 열차는 모두 이
            두 승강장 중 하나에서 출발합니다. 이 승강장은 역의 <strong>하치조(남쪽)</strong> 쪽, 전용 신칸센 개찰구 안에
            있으며, 북쪽 중앙 출구와 시내버스 터미널, 교토 타워의 반대편입니다. 이용할 개찰구는 역까지 오는 방법에 따라
            다릅니다.
          </p>
          <Table
            head={["출발 위치", "이용할 곳", "알아 둘 점", "출처와 확인일"]}
            rows={stationRows.map((r) => [r.item, r.answer, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            이 내용을 표로 정리한 이유가 있습니다. 교토의 마지막 아침을 니시키 시장, 지하철 가라스마선, 대부분의 시내버스
            등 북쪽에서 마무리한다면, 개찰구에 닿기 전에 일본에서 가장 붐비는 대합실 중 하나를 몇 분 동안 걸어야 합니다.
            캐리어를 끌고 이동하는 날이라면 그 시간을 미리 계산에 넣으세요.
          </p>
          <p className={styles.bodyText}>
            짐을 처리하는 방법은 세 가지입니다. 체크아웃 후 호텔 수하물 보관소에 맡겼다가 역으로 가는 길에 찾는 방법, 교토역에
            가져가 코인 로커나 유인 보관 서비스를 이용하는 방법, 그리고 택배(다큐빈)로 도쿄 호텔에 보내는 방법입니다. 짐이
            손보다 많다면 택배가 일반적이고, 신칸센 특대 수하물 좌석 예매도 필요 없어집니다. 요금과 접수 마감 시간은 호텔과
            창구마다 달라서 여기에 적지 않았습니다. 전날 밤 프런트에 물어보고, 도쿄 호텔이 택배를 받아 주는지도 확인하세요.
          </p>
          <p className={styles.bodyText}>
            그날 아침 교토 안에서 어떤 버스와 지하철을 탈지, 반나절을 위해 1일권을 살 가치가 있는지는{" "}
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>
              교토 교통 가이드(영어)
            </Link>
            와{" "}
            <Link href="/guides/transport/kyoto-subway-bus-pass" style={linkStyle}>
              교토 지하철·버스 1일권 가이드(영어)
            </Link>
            를 참고하세요. 짧은 교토 여행의 마지막 열차라면{" "}
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>
              교토 3일 일정(영어)
            </Link>
            에서 그 전 일정을 짤 수 있습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>도착</span>
          <h2 className={styles.sectionTitle}>도쿄역, 시나가와, 신요코하마 중 어디서 내려야 하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            숙소나 공항에 가장 가까운 역에서 내리세요. JR 도카이의 역 목록에서 노선은{" "}
            <strong>신요코하마, 시나가와, 도쿄 순</strong>으로 이어집니다. 세 선택지 중 두 곳이 종착역보다 먼저 나오므로,
            일찍 내리는 편이 목적지까지 더 빠른 경우가 많습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["내릴 역", "이런 사람에게", "이유", "갈아탈 노선", "출처와 확인일"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {arrivalRows.map((row) => (
                    <tr key={row.station}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.station}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.forWho}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.transfer}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>최종 확인: {OWN_ISO}</strong>(도카이도 신칸센 정차 순서). 공식 페이지:{" "}
            <a href="https://global.jr-central.co.jp/en/" target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>
              JR 도카이(global.jr-central.co.jp)
            </a>
            .
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            위 내용과 별개로 알아 둘 점이 하나 있습니다. 종착역은 놓칠 수 없어서 가장 쉬운 선택입니다. 피곤하거나 짐이
            많거나 아이와 함께라면, 시나가와가 더 가깝더라도 도쿄역에서 내리는 것이 틀린 선택은 아닙니다. 지역 비교는{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo" style={linkStyle}>
              도쿄 숙소 지역 가이드(영어)
            </Link>
            에, 각 지역에서 나리타와 하네다로 가는 방법은{" "}
            <Link href="/guides/transport/tokyo-airport-transfer" style={linkStyle}>
              도쿄 공항 교통 가이드(영어)
            </Link>
            에 정리했습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>예매</span>
          <h2 className={styles.sectionTitle}>교토 도쿄 신칸센은 미리 예매해야 하나요?</h2>
          <p className={styles.bodyText}>
            아래 성수기, 160cm를 넘는 짐이 있을 때, 도쿄에서 비행기를 타야 할 때는 미리 예매하세요. 그 밖의 날에는 노조미가
            1시간에 8~12편 있으므로 {NON_RESERVED}의 자유석으로도 충분합니다. 역에서는 승차일 1개월 전부터 지정석 예매가
            시작되고, smartEX는 1년 전부터 신청할 수 있습니다.
          </p>
          <div style={{ margin: "1rem 0" }}>
            <Table
              head={["상황", "할 일", "자세한 내용", "출처와 확인일"]}
              rows={bookingRows.map((r) => [r.item, r.answer, r.detail, r.source])}
            />
          </div>
          <p className={styles.bodyText}>
            성수기가 아니라면 당일 탑승도 가능합니다. JR 도카이의 2026년 11월 27일 목록에서 교토발 도쿄행은{" "}
            <strong>하루 193편</strong>이므로, 자유석 티켓으로 다음 열차를 타는 것은 충분히 현실적인 계획입니다. 다만 1년 중
            여덟 기간에는 선택의 여지가 없습니다. JR 도카이는 성수기에 <strong>노조미 전 차량을 지정석</strong>으로 운행하므로
            그날은 도쿄행 빠른 열차에 자유석이 전혀 없습니다. {OWN}에 JR 도카이 공식 페이지에서 확인한 기간입니다.
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
            JR 도카이의 영어 안내에는 &ldquo;성수기에는 노조미에 자유석이 없다&rdquo;, &ldquo;히카리, 고다마, 미즈호, 사쿠라,
            쓰바메는 평소처럼 자유석이 있다&rdquo;고 적혀 있고, 성수기 히카리와 고다마 자유석은 &ldquo;혼잡할 수 있다&rdquo;는
            경고도 함께 있습니다. 골든위크에도 당일 탑승할 수 있는 열차는 있지만, 더 느리고 서서 가야 할 수도 있습니다.
          </p>
          <p className={styles.bodyText}>
            성수기가 아니어도 이 구간을 예매하는 편이 좋은 이유가 두 가지 있으며, 둘 다 이 방향에만 해당합니다. 교토 출발은
            대개 여행의 마지막 아침이고, 도쿄 숙소나 비행기가 기다리고 있어 실수를 만회할 다음 열차가 없습니다. 또 도착했을
            때보다 짐이 많으므로 내 좌석과 필요하다면 수하물 공간까지 확보하는 데 몇백 엔을 쓸 가치가 있습니다.{" "}
            <strong>JAPAN RAIL PASS</strong>가 있다면 좌석 지정 자체가 무료이므로 고민할 필요가 없습니다.
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

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>수하물</span>
          <h2 className={styles.sectionTitle}>신칸센에서 큰 짐은 어디에 두나요?</h2>
          <p className={styles.bodyText}>
            세 변의 합이 <strong>160cm 이하</strong>인 짐은 머리 위 선반이나 발밑에 두며, 예매도 요금도 필요 없습니다. 그보다
            크면 JR 도카이의 수하물 안내에 따라 특대 수하물 공간이 딸린 지정석이 필요합니다. 세 변의 합이{" "}
            <strong>161~250cm</strong>인 짐은 이 좌석 뒤의 수하물 공간에 두어야 합니다. 좌석에 추가 요금은 없으며, JR은 이
            티켓이 &ldquo;보통차와 그린차 지정석과 같은 가격&rdquo;이라고 안내합니다.
          </p>
          <p className={styles.bodyText}>
            큰 캐리어를 들고 예매 없이 타면 <strong>수수료 {BAGGAGE_FEE}(세금 포함)</strong>를 냅니다. 좌석은 매표소에서 특대
            수하물 공간이 딸린 좌석을 요청하거나, 지정석 발매기 또는 온라인으로 예매합니다. 이 규정은 도카이도, 산요, 규슈
            신칸센에 적용되며, 바로 이 구간이 해당합니다. {OWN} 확인.
          </p>
          <p className={styles.bodyText}>
            이 규정은 교토에 도착할 때보다 떠날 때 더 크게 다가옵니다. 항공 위탁 수하물용 캐리어는 대부분 160cm 이하지만,
            여행 중 산 물건, 접은 유모차, 스키 가방, 골프백은 그렇지 않습니다. 수하물 공간 좌석은 지정석 차량에만 있으므로
            자유석 티켓으로 이 규정을 피할 수는 없습니다. 크기가 애매하다면 개찰구에서 확인하기보다 큰 캐리어를 택배로 도쿄에
            보내는 편이 더 저렴합니다.
          </p>
        </section>

        <KlookTourPicks
          heading="교토 → 도쿄 이동일의 나머지 절반"
          intro="교토 출발은 대개 도쿄 호텔이나 공항에서 끝나는데, 그 두 번째 구간은 준비 없이 남겨 두기 쉽습니다. 도쿄역이나 시나가와에서 이용할 수 있는 예약 네 가지입니다. 짐을 모두 들고 도착한다면 단독 차량, 그렇지 않다면 합승 픽업, 출국하는 날에는 두 공항의 리무진 버스입니다. 날짜별 예약 가능 여부와 현재 가격은 상품 페이지에서 확인하세요."
          tours={tourPicks}
        />

        <KlookStayAreas
          heading="도쿄 도착 후 숙소 지역"
          intro="도쿄 여행 전체가 아니라 신칸센 도착 후 20분을 기준으로 순서를 정했기 때문에 일반적인 숙소 순위와는 다릅니다. 도카이도 신칸센 승강장이 역 건물 안에 있어 마루노우치가 첫 번째이고, 열차가 종착역 전에 시나가와에 서기 때문에 시부야도 목록에 있습니다."
          areas={stayAreas}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>탑승 전</span>
          <h2 className={styles.sectionTitle}>교토의 마지막 아침 전에 준비할 한 가지</h2>
          <p className={styles.bodyText}>
            모바일 데이터입니다. 이동하는 날은 확인할 것이 많습니다. 좌석은 QR 코드나 예매 내역으로 보여 줘야 하고, 교토역
            대합실에서는 짐작보다 지도가 필요하며, 도착 직전에는 열차 안에서 시나가와와 도쿄역 중 어디서 내릴지 정해야
            합니다. 출국 전에 eSIM을 개통해 두면 이 모든 것을 휴대폰으로 바로 확인할 수 있습니다.{" "}
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
            에서는 ICOCA로 도쿄의 야마노테선 개찰구를 통과할 수 있지만 신칸센에는 쓸 수 없는 이유를 설명합니다.
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/kyoto-day-trip-from-tokyo", title: "도쿄에서 교토 당일치기: 열차, 비용, 일정(2026, 영어)" },
            { href: "/guides/transport/tokyo-to-kyoto", title: "도쿄에서 교토 가는 법(2026): 가장 싸고 빠른 방법(영어)" },
            { href: "/guides/transport/shinkansen-guide", title: "신칸센 가이드 2026: 티켓, 패스, 처음 타는 사람을 위한 팁(영어)" },
            { href: "/guides/transport/jr-pass-guide", title: "JR 패스 가이드 2026: 가격, 이득인 경우, 구매 방법(영어)" },
            { href: "/guides/transport/tokyo-to-nagoya-shinkansen", title: "도쿄–나고야 신칸센: 소요 시간, 요금, JR 패스(영어)" },
            { href: "/guides/transport/tokyo-to-hiroshima-shinkansen", title: "도쿄–히로시마 신칸센: 소요 시간, 요금, JR 패스(영어)" },
            { href: "/guides/transport/kyoto-transportation", title: "교토 교통 가이드(2026): 버스, 열차, 택시(영어)" },
            { href: "/guides/attractions/where-to-stay-in-tokyo", title: "도쿄 숙소 지역 가이드(2026): 노선과 공항별 비교(영어)" },
            { href: "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary", title: "도쿄·교토·오사카 7일 일정(2026)(영어)" },
            { href: "/guides/transport/tokyo-airport-transfer", title: "도쿄 공항 교통 가이드(2026): 나리타·하네다에서 시내로(영어)" },
            { href: "/ko", title: "한국어 가이드 전체 보기 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>2시간 이동, 그 전에 정할 세 가지</h2>
            <p className={styles.ctaBannerDesc}>
              교토의 마지막 아침이 아니라 그 전에 좌석을 예매하세요. 내 좌석, 필요하다면 수하물 공간, 그리고 21:38 막차에
              기대지 않아도 되는 이른 열차를 확보하세요. 그다음 도쿄의 어느 역에서 내리고 그 뒤에 어떻게 이동할지 정하면
              됩니다.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                교토 → 도쿄 티켓 보기 →
              </KlookLink>
              <KlookLink href={PRIVATE_TRANSFER_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                도쿄 공항 픽업 보기 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
