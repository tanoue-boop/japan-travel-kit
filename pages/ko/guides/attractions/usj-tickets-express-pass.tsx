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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import GygCompare, { GygCompareButton } from "../../../../components/GygCompare";
import { gygUsj, gygUsjExpressPass } from "../../../../lib/gyg-links";
import {
  jrHarukaUrl,
  jrKansaiMiniPass,
  klookEsim,
  nankaiRapitUrl,
  usjSameDayPrep,
  usjStayAreas,
  usjTripPrep,
  type KlookStayArea,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { koUsjExpressPass, koUsjStudioPass } from "../../../../lib/klook-links-ko";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

// Mirrors the English page (/guides/attractions/usj-tickets-express-pass) section by
// section as of 2026-11-01: same sections, tables, FAQ and Klook/GetYourGuide CTAs in
// the same places. Every fact and figure is the English page's; nothing is added.

const ROUTE = "/ko/guides/attractions/usj-tickets-express-pass";
const TITLE = "유니버설 스튜디오 재팬 익스프레스 패스(2026) 구매";
const DESC =
  "USJ는 온라인 판매만, 슈퍼 닌텐도 월드는 시간 지정 입장. 스튜디오 패스 날짜별 가격과 2026 익스프레스 패스 선택 기준.";

const LOCALE = "ko" as const;
const GYG_SLUG = "ko-usj-tickets-express-pass";
const CHECKED = dateLabel("2026-10-26", LOCALE);
const CHECKED_USJ = dateLabel("2026-10-27", LOCALE);

const ticketRows = [
  { ticket: "1일 스튜디오 패스", what: "하루 파크 입장. 일반 어트랙션은 일반 대기 줄로 이용", price: "날짜별로 정해짐 — 그날 가격은 결제 화면에 표시" },
  { ticket: "2일 스튜디오 패스", what: "연속 2일 입장. 하루당으로 따지면 더 저렴한 경우가 많음", price: "날짜별로 정해짐 — 그날 가격은 결제 화면에 표시" },
  { ticket: "익스프레스 패스(추가 상품)", what: "정해진 어트랙션에서 더 짧은 별도 줄을 이용. 파크 입장권이 아니므로 스튜디오 패스나 연간 패스가 함께 필요", price: "날짜별로 정해짐 — USJ가 2018년 익스프레스 패스에 도입한 가격 체계" },
];

const variantRows = [
  {
    pass: "익스프레스 패스 4",
    covers: "우선 탑승 혜택이 적용되는 어트랙션 4개. USJ는 꼭 타야 할 어트랙션을 위한 패스로 설명하며, 어떤 네 개인지는 버전과 날짜별로 정해집니다.",
    snw: "그렇다고 명시된 버전에만 포함",
    bestFor: "짧은 하루, 재방문, 또는 인기 어트랙션만 타면 되는 한가한 날짜",
  },
  {
    pass: "익스프레스 패스 7",
    covers: "우선 탑승 혜택이 적용되는 어트랙션 7개. 첫 방문객 대부분이 고르는 두 가지 중 범위가 넓은 패스이며, 어트랙션 목록이 버전별로 정해지는 점은 같습니다.",
    snw: "그렇다고 명시된 버전에만 포함",
    bestFor: "하루 일정, 첫 방문, 붐비는 날짜",
  },
  {
    pass: "그 밖의 개수·테마 버전",
    covers: "USJ는 어트랙션 하나나 시즌 구성에 맞춘 익스프레스 패스도 팔며, 각각 고유의 목록이 있습니다. 파크 이벤트에 따라 생겼다 없어집니다.",
    snw: "버전에 따라 다름",
    bestFor: "폭넓은 구성보다 꼭 타야 하는 특정 어트랙션이 있는 경우",
  },
  {
    pass: "입장 확약권이 포함된 버전",
    covers: "일부 익스프레스 패스에는 슈퍼 닌텐도 월드 입장 확약권(エリア入場確約券)이 들어 있어, 도착하기 전에 슈퍼 닌텐도 월드 입장 시간을 확보할 수 있습니다.",
    snw: "포함 — 추가 금액이 바로 이 부분입니다",
    bestFor: "슈퍼 닌텐도 월드가 여행의 이유인 사람",
  },
];

const PRICING_RELEASE = "“Pricing for Studio Passes to Change”(스튜디오 패스 가격 변경 안내), 2026년 6월 30일, usj.co.jp";
const EXPRESS_PAGE = "유니버설 익스프레스 패스 페이지, usj.co.jp";
const PERIOD_RELEASE = "구매 기간 안내, 2025년 4월 21일, usj.co.jp";

const pricingRows = [
  {
    what: "익스프레스 패스 가격",
    usj: "유효한 익스프레스 패스의 종류와 가격은 날짜에 따라 다릅니다.",
    source: EXPRESS_PAGE,
  },
  {
    what: "이 방식이 언제부터인지",
    usj: "익스프레스 패스는 2018년부터 비슷한 수요 기반 가격 체계로 정해져 왔으며, 변경할 계획은 없습니다.",
    source: PRICING_RELEASE,
  },
  {
    what: "스튜디오 패스 가격(함께 필요한 입장권)",
    usj: "2026년 7월 1일 판매분부터, 2026년 9월 1일 이후 입장에 대해 날짜별 가격을 수요에 따라 다시 정합니다. 어린이·시니어 가격도 바뀌며, 연간 패스는 제외됩니다.",
    source: PRICING_RELEASE,
  },
  {
    what: "USJ의 조언",
    usj: "가격이 오를 수 있으니 가능한 한 일찍 구매하세요.",
    source: PRICING_RELEASE,
  },
];

const windowRows = [
  {
    q: "얼마나 미리 살 수 있나요?",
    a: "방문일 약 2개월 전부터, 공식 WEB 티켓 스토어와 로손 티켓(웹사이트, 로손 매장의 Loppi 단말기)에서 살 수 있습니다.",
    source: PERIOD_RELEASE,
  },
  {
    q: "판매 기간이 더 길었던 적이 있나요?",
    a: "있습니다. 오사카 엑스포 기간에는 2025년 10월 13일까지의 방문일에 대해 3개월로 늘었고, USJ는 그 뒤 약 2개월로 되돌린다고 밝혔습니다.",
    source: PERIOD_RELEASE,
  },
  {
    q: "하루에 몇 장 팔리나요?",
    a: "매일 한정 수량입니다. USJ 공식 페이지는 미리 매진되는 경우가 많다고 적고 있습니다.",
    source: EXPRESS_PAGE,
  },
  {
    q: "다른 날짜로 바꿀 수 있나요?",
    a: "안 됩니다. 미리 산 익스프레스 패스는 적힌 날짜에만 유효하고, 시간 지정 어트랙션에 늦게 도착하면 환불도 다른 시간으로의 변경도 되지 않습니다.",
    source: EXPRESS_PAGE,
  },
];

const needRows = [
  {
    date: "일본 학교 방학이 아닌 한가한 평일",
    verdict: "대개 생략",
    why: "일반 대기 줄이 가장 짧고, 공식 앱을 통한 무료 정리권도 입장했을 때 아직 남아 있을 가능성이 가장 높습니다.",
  },
  {
    date: "토요일 또는 일요일",
    verdict: "구매",
    why: "날짜별 가격이 반영하는 것이 바로 주말 수요입니다. 익스프레스 패스가 필요한 전형적인 경우이며, 저렴한 버전부터 먼저 팔립니다.",
  },
  {
    date: "일본 공휴일 또는 연휴",
    verdict: "구매, 그것도 일찍",
    why: "방문객 수요 위에 일본 국내 수요가 겹치고, 하루 판매 수량은 정해져 있습니다. 이런 날에는 원하는 버전이 가장 먼저 사라집니다.",
  },
  {
    date: "25주년 및 겨울 방학 날짜",
    verdict: "날짜가 열리는 즉시 구매",
    why: `2026년은 USJ 25주년이고, USJ 공식 뉴스룸은 2026년 9월 14일 전국 어린이를 이번 겨울 무료로 초대하는 Holiday Kids Free Pass 판매를 시작했습니다. 같은 날짜에 가족 방문객이 더 늘어난다는 뜻입니다. ${CHECKED_USJ} 확인.`,
  },
  {
    date: "슈퍼 닌텐도 월드가 가는 이유인 경우",
    verdict: "입장 확약권이 포함된 버전 구매",
    why: "도착 전에 슈퍼 닌텐도 월드 입장 시간을 확보하는 유일한 방법입니다. 무료 방법도 있지만, 당일 파크 안에서 선착순입니다.",
  },
];

const buyRows = [
  {
    where: "USJ WEB 티켓 스토어(공식)",
    what: "본인 날짜에 판매 중인 모든 버전을 그날 가격으로",
    note: "약 2개월 전에 열립니다. 인기 날짜의 판매 개시일에는 대기열 시스템을 각오하세요.",
  },
  {
    where: "로손 티켓 — 웹사이트와 Loppi 단말기",
    what: "USJ가 명시한 또 하나의 공식 판매처",
    note: "USJ의 2025년 4월 21일 구매 기간 안내에서 WEB 티켓 스토어와 함께 언급됩니다.",
  },
  {
    where: "클룩",
    what: "익스프레스 패스 단독 상품. 영어 결제 화면, 해외 카드 결제, 전자 티켓",
    note: "USJ 공식 시간 지정 입장 페이지는 일부 여행사를 통해서도 슈퍼 닌텐도 월드 입장을 미리 확보할 수 있다고 밝힙니다.",
  },
  {
    where: "GetYourGuide",
    what: "익스프레스 패스 단독 판매, 두 번째 판매처",
    note: "첫 번째 판매처에서 날짜가 매진됐을 때 볼 만합니다. 판매 수량은 날짜별이자 판매처별로 배정됩니다.",
  },
];

const steps = [
  {
    title: "먼저 날짜를 정하고, 스튜디오 패스를 삽니다",
    desc: "이 페이지의 모든 내용은 날짜에 달려 있습니다. USJ는 이제 당일 게이트에서 티켓을 팔지 않으므로 스튜디오 패스는 온라인으로 사야 하며, 이것이 익스프레스 패스에 포함되지 않는 입장권입니다.",
  },
  {
    title: "그 날짜에 익스프레스 패스가 필요한지 정합니다",
    desc: "위의 살까 말까 표를 참고하세요. 한가한 평일에는 필요 없는 경우가 많고, 주말이나 일본 공휴일, 기념일 날짜에는 필요합니다.",
  },
  {
    title: "그 버전에 슈퍼 닌텐도 월드가 포함되는지 확인합니다",
    desc: "슈퍼 닌텐도 월드 입장 확약권은 모든 익스프레스 패스에 포함되는 것이 아니므로 별도로 확인해야 합니다. 슈퍼 닌텐도 월드가 방문 목적이라면 입장 확약권이 포함된다고 명시된 버전을 사세요.",
  },
  {
    title: "출발 전에 USJ 공식 앱을 설치합니다",
    desc: `USJ 공식 시간 지정 입장 페이지에 따르면 2026년 1월 5일부터 정리권(Area Timed Entry Ticket)과 스탠바이 입장권(Standby Entry Ticket)을 받으려면 공식 앱이 필요하며, 먼저 앱에 입장권을 등록해야 합니다. ${CHECKED_USJ} 확인.`,
  },
  {
    title: "개장 전에 도착합니다",
    desc: "붐비는 날에는 공지된 시간보다 일찍 문을 열 수 있습니다. 입장 확약권이 포함된 버전을 사지 않았다면, 일찍 도착하는 것이 무료 정리권을 현실적으로 받는 방법입니다.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "USJ 티켓은 꼭 미리 사야 하나요?",
    a: "그렇습니다. 유니버설 스튜디오 재팬은 게이트에서 당일권 판매를 중단했으므로 가기 전에 온라인으로 사야 합니다. 클룩 같은 판매처를 통해 예약하면 영어 결제 화면을 쓸 수 있고, 해외 카드를 받으며, 입장할 때 스캔하는 전자 티켓을 보내 줍니다.",
  },
  {
    q: "2026년 USJ 익스프레스 패스는 살 만한가요?",
    a: `붐비는 날이라면 그렇습니다. 2026년은 USJ 25주년이고(파크 공식 뉴스룸에 2026년 9월 14일과 28일 기념 보도자료가 올라왔습니다, ${CHECKED_USJ} 확인), 주말이나 공휴일에는 익스프레스 패스로 일반 대기줄 대신 우선 탑승 전용 대기줄을 이용할 수 있어 몇 시간씩 걸리는 대기 시간을 줄여 주며, 입장 확약권이 포함된 버전이라면 슈퍼 닌텐도 월드 입장도 해결됩니다. 한가한 비수기 평일에는 훨씬 덜 필요합니다. 일반 대기 줄이 가장 짧고, 앱을 통한 무료 정리권도 남아 있을 가능성이 가장 높기 때문입니다.`,
  },
  {
    q: "익스프레스 패스 4와 익스프레스 패스 7은 무엇이 다른가요?",
    a: "숫자는 우선 탑승 혜택이 적용되는 어트랙션 이용 횟수, 즉 4개 또는 7개를 뜻합니다. USJ는 익스프레스 패스 4를 꼭 타야 할 어트랙션을 위한 패스로 설명하고, 익스프레스 패스 7은 둘 중 범위가 넓은 패스입니다. 실제 어트랙션 목록은 버전과 날짜별로 정해지고, 슈퍼 닌텐도 월드 입장 확약권은 그렇다고 명시된 버전에만 있으므로 사기 전에 본인 날짜의 포함 내용을 확인하세요.",
  },
  {
    q: "스튜디오 패스 없이 USJ 익스프레스 패스만으로 들어갈 수 있나요?",
    a: `없습니다. USJ 공식 익스프레스 패스 페이지는 파크 입장에 스튜디오 패스(또는 연간 패스)가 필요하며, 익스프레스 패스와 별도로 테마파크 입장권이 필요하다고 밝힙니다. 익스프레스 패스는 입장한 뒤 줄을 줄여 줄 뿐입니다. ${CHECKED_USJ} 확인.`,
  },
  {
    q: "유니버설 스튜디오 재팬 익스프레스 패스는 얼마나 미리 살 수 있나요?",
    a: `방문일 약 2개월 전입니다. USJ의 2025년 4월 21일 구매 기간 안내에 따르면 스튜디오 패스, 익스프레스 등의 티켓은 공식 WEB 티켓 스토어와 로손 티켓에서 약 2개월 전에 판매가 시작되고, 오사카 엑스포 기간에는 2025년 10월 13일까지의 방문일에 대해 3개월로 늘었다가 그 뒤 약 2개월로 돌아간다고 했습니다. ${CHECKED_USJ} 확인.`,
  },
  {
    q: "USJ 익스프레스 패스의 날짜를 바꾸거나 환불받을 수 있나요?",
    a: `바꿀 수 없다고 생각하세요. USJ 공식 익스프레스 패스 페이지는 미리 산 패스는 적힌 날짜에만 유효하고, 시간 지정 어트랙션에 늦게 도착하면 환불도 다른 시간대로의 변경도 없다고 밝힙니다. ${CHECKED_USJ} 확인.`,
  },
  {
    q: "슈퍼 닌텐도 월드는 어떻게 들어가나요?",
    a: `USJ가 직접 밝힌 방법은 두 가지입니다. 입장 확약권이 포함된 익스프레스 패스 버전으로 미리 확보하거나, 파크에 입장한 뒤 USJ 공식 앱으로 받는 것입니다. USJ 시간 지정 입장 페이지에 따르면 2026년 1월 5일부터 정리권과 스탠바이 입장권을 받으려면 공식 앱이 필요하고, 먼저 앱에 입장권을 등록해야 합니다. ${CHECKED_USJ} 확인. 한가한 날에는 그냥 들어갈 수도 있지만, 그것을 전제로 여행을 짜서는 안 됩니다.`,
  },
  {
    q: "유니버설 스튜디오 재팬 익스프레스 패스는 얼마인가요?",
    a: `USJ는 고정 금액을 공개하지 않습니다. 공식 익스프레스 패스 페이지는 유효한 익스프레스 패스의 종류와 가격이 날짜에 따라 다르다고 하고, 2026년 6월 30일 스튜디오 패스 가격 안내는 익스프레스 패스가 2018년부터 수요 기반 체계로 가격이 정해져 왔으며 변경 계획이 없다고 밝힙니다. 그날 가격은 결제 화면에 나오므로 여기에는 엔화 금액을 적지 않습니다. ${CHECKED_USJ} 확인.`,
  },
  {
    q: "유니버설 스튜디오 재팬에 가려면 어디에 묵어야 하나요?",
    a: `개장 시간에 게이트에 있고 싶다면 유니버설시티, 그렇지 않다면 우메다나 오사카역입니다. 파크 게이트는 JR 유메사키선 유니버설시티역에서 걸어서 약 5분이고, 파크는 오사카역에서 약 20분입니다. 두 수치 모두 오사카 관광국(Osaka Convention & Tourism Bureau)의 것으로 ${CHECKED} 확인했습니다. JR 서일본의 목적지 페이지는 유니버설시티역을 파크의 가장 가까운 역으로 꼽고 파크가 역 ‘바로 옆’에 있다고 설명합니다. 고려할 점은 여행의 나머지입니다. 우메다와 오사카역은 JR 주요 노선 위에 있고, 유니버설시티 호텔은 몇 곳이 모여 있을 뿐이라 붐비는 날짜에는 가장 먼저 객실이 찹니다.`,
  },
  {
    q: "간사이 공항이나 오사카역에서 USJ까지 어떻게 가나요?",
    a: `역은 JR 유메사키선(사쿠라지마선) 유니버설시티역이고, 보통 니시쿠조에서 갈아탑니다. 오사카 관광국은 파크까지 오사카역에서 약 20분으로 봅니다. 간사이 공항에서는 직통 열차가 없습니다. JR 서일본의 하루카는 덴노지, 오사카, 신오사카, 교토까지 환승 없이 가며, 단기 체류로 입국한 외국 여권 소지자용 할인 편도는 2026년 10월 31일까지 덴노지 ¥1,300, 오사카·신오사카 ¥1,800이고 2026년 11월 1일부터 ¥1,600과 ¥1,900으로 오릅니다. 또는 난카이 라피트가 운임과 별도로 어른 ¥700의 특급권으로 난바까지 최소 34분에 갑니다. 어느 쪽이든 환상선으로 니시쿠조까지 간 뒤 유메사키선으로 갈아탑니다. 모든 수치는 ${CHECKED} 확인.`,
  },
  {
    q: "오사카나 간사이 패스로 USJ가 커버되나요?",
    a: `파크 자체는 오사카 주유패스에 포함되지 않고, 유니버설시티까지의 JR 구간을 커버하는 오사카 메트로 패스도 없습니다. 철도 쪽에서는 JR 서일본의 간사이 에어리어 패스 페이지가 WEST QR 간사이 미니 패스를 “Kyoto, Universal Studios Japan, Osaka, Namba, Kobe and Nara 3-Day Unlimited Rides”라고 소개합니다. 연속 3일 동안 보통·쾌속·신쾌속 열차를 탈 수 있고 어른 ¥3,000, 어린이 ¥1,500이며, 하루카를 포함한 특급 열차에는 쓸 수 없습니다. WEST QR 간사이 에어리어 패스는 하루카를 커버하며(자유석 무제한, 지정석 2회), 1일권 ¥2,700부터 4일권 ¥6,700까지입니다. ${CHECKED} 확인. 어느 패스에도 파크 입장은 포함되지 않습니다. 입장은 언제나 별도의 스튜디오 패스입니다.`,
  },
];

// Klook blocks: the English page's own lists, moved onto Klook's /ko/ path with the
// text translated from the English entries.
const sameDayPrep: KlookTripPrepItem[] = [
  withKlookLocale(usjSameDayPrep[0], LOCALE, {
    label: "유니버설 스튜디오 재팬 주변 호텔(유니버설시티)",
    ctaLabel: "클룩에서 유니버설시티 호텔 보기 →",
    why: "오사카 숙소 가이드와 같은 클룩 호텔 검색입니다. 파크 게이트는 유니버설시티역에서 걸어서 약 5분이라, 개장 시간에 맞춰 일찍 방문하려는 여행자에게 편리합니다.",
  }),
  withKlookLocale(usjSameDayPrep[1], LOCALE, {
    label: "오사카 주유패스(1일권/2일권)",
    ctaLabel: "오사카 패스 보기 →",
    why: "파크 당일이 아니라 그 앞뒤의 오사카 일정용입니다. 오사카 메트로와 시내버스, 40곳 이상의 입장이 포함되지만, 유니버설 스튜디오 재팬과 유니버설시티로 가는 JR 노선은 포함되지 않습니다.",
  }),
  withKlookLocale(usjSameDayPrep[2], LOCALE, {
    label: "JR 하루카 공항 특급 티켓",
    ctaLabel: "하루카 티켓 보기 →",
    why: "간사이 공항에서 USJ 여행이 시작되는 덴노지, 오사카, 신오사카까지 바로 갑니다. 클룩 상품 페이지에는 ‘단기 체류(Temporary Visitor)’ 도장이 있는 일본 외 여권 소지자에게만 판매한다고 적혀 있습니다.",
  }),
  withKlookLocale(usjSameDayPrep[3], LOCALE, {
    label: "Absolute 오사카 푸드 투어",
    ctaLabel: "오사카 푸드 투어 보기 →",
    why: "파크에 가지 않는 날의 저녁입니다. 도톤보리 큰길에서 벗어나 걷는 3시간 조인 투어로, 쿠시카츠, 타코야키, 숨은 이자카야, 현지 디저트가 들어 있습니다.",
  }),
  withKlookLocale(usjSameDayPrep[4], LOCALE, {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "USJ는 슈퍼 닌텐도 월드 정리권을 당일 파크 안에서 쓰는 공식 앱으로 배포하고, 스튜디오 패스도 전자 티켓입니다. 둘 다 호텔 와이파이가 아니라 줄을 선 자리에서 데이터가 필요합니다.",
  }),
];

const stayAreas: KlookStayArea[] = [
  withKlookLocale(usjStayAreas[0], LOCALE, {
    area: "유니버설시티",
    why: "오사카 관광국 수치로 파크 게이트는 유니버설시티역에서 걸어서 약 5분입니다. 개장 전에 게이트에 있고 싶은 날이라면 이 지역을 고르는 이유는 그것 하나로 충분합니다.",
  }),
  withKlookLocale(usjStayAreas[1], LOCALE, {
    area: "우메다 / 오사카역",
    why: "유메사키선 직통 열차가 출발하는 곳입니다. 관광국은 파크까지 오사카역에서 약 20분으로 보며, 여행 내내 JR 주요 노선(교토선·고베선, 환상선, 신오사카의 신칸센)을 쓸 수 있습니다.",
  }),
  withKlookLocale(usjStayAreas[2], LOCALE, {
    area: "덴노지",
    why: "JR 쪽의 더 저렴한 거점이자 간사이 공항발 하루카가 처음 서는 시내 역입니다. 환상선으로 시내 중심을 지나지 않고 니시쿠조까지 가서 유메사키선으로 갈아탈 수 있습니다.",
  }),
  withKlookLocale(usjStayAreas[3], LOCALE, {
    area: "난바",
    why: "파크가 더 넓은 오사카 여행의 하루일 뿐이라면 이곳입니다. 도톤보리와 구로몬 시장이 걸어서 가깝고, 난카이 종착역이 있어 귀국하는 날 라피트로 간사이 공항까지 최소 34분(난카이 기준)입니다.",
  }),
];

const tripPrep: KlookTripPrepItem[] = [
  withKlookLocale(usjTripPrep[0], LOCALE, {
    label: "오사카 주유패스(1일권/2일권)",
    ctaLabel: "오사카 패스 보기 →",
    why: "꼼꼼히 읽어 주세요. 이 패스는 유니버설 스튜디오 재팬을 포함하지 않고, 유니버설시티까지의 JR 구간도 포함하지 않습니다. 포함되는 것은 오사카 여행의 다른 모든 날, 즉 오사카 메트로와 시내버스 무제한에 40곳 이상의 입장입니다.",
  }),
  withKlookLocale(usjTripPrep[1], LOCALE, {
    label: "교토·나라 당일 투어(기요미즈데라, 후시미 이나리, 나라 공원)",
    ctaLabel: "교토·나라 당일 투어 보기 →",
    why: "테마파크 때문에 오사카에 온 사람에게 가장 자연스러운 둘째 날입니다. 기요미즈데라, 후시미 이나리, 나라 공원을 오사카 출발 예약 한 번으로 다녀오며, 동선을 직접 짤 필요가 없습니다.",
  }),
  withKlookLocale(usjTripPrep[2], LOCALE, {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "USJ는 날짜 지정 스튜디오 패스를 전자 티켓으로 팔고, 슈퍼 닌텐도 월드 정리권을 당일 파크 안에서 쓰는 자체 앱으로 배포합니다. 데이터가 없다는 걸 줄 서서 알게 되면 곤란합니다.",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "USJ 티켓과 익스프레스 패스" }];

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoUsjTicketsPage({ updated }: { updated: PageUpdated }) {
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

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel} 업데이트</p>
          <h1 className={styles.heroTitle}>
            유니버설 스튜디오 재팬 익스프레스 패스 2026:<br />종류와 가격 비교, 꼭 구매해야 할까?
          </h1>
          <p className={styles.heroSubtitle}>
            익스프레스 패스 4와 익스프레스 패스 7이 각각 무엇을 포함하는지, 날짜에 따라 가격이 바뀌는 이유,
            그리고 스튜디오 패스만으로도 충분히 즐길 수 있는 날짜를 정리합니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "익스프레스 패스 4 vs 7", "슈퍼 닌텐도 월드", "살까 말까"].map((t) => (
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
            <strong>유니버설 스튜디오 재팬 익스프레스 패스</strong>는 정해진 어트랙션에서 더 짧은 별도 줄을
            이용하게 해 주는 유료 추가 상품입니다. 파크 입장권이 아니므로 같은 날짜의 스튜디오 패스(또는 연간
            패스)가 따로 필요합니다. 번호가 붙은 버전으로 팔리며, 방문객 대부분이 고르는 것은{" "}
            <strong>익스프레스 패스 4</strong>와 <strong>익스프레스 패스 7</strong>이고, 그 밖에 테마별 구성과
            슈퍼 닌텐도 월드 입장 확약권이 포함된 버전도 있습니다. 모두 하나의 날짜에 묶여 있고, 버전마다 어트랙션
            목록이 다르며, 가격은 날짜별로 정해집니다. USJ 공식 페이지는 유효한 익스프레스 패스의 종류와 가격이
            날짜에 따라 다르고, 하루 판매 수량이 한정되어 미리 매진되는 경우가 많다고 밝힙니다. 그러니 필요하냐는
            질문의 짧은 답은 날짜입니다. 주말, 일본 공휴일, 25주년 기념 날짜라면 익스프레스 패스가 필요한 날이고,
            한가한 평일이라면 대개 필요 없습니다. 모두 {CHECKED_USJ} 확인.
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>모두에게 필요한 것</p>
                <p className={styles.verdictStatValue}>스튜디오 패스(온라인)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>익스프레스 패스를 더할 때</p>
                <p className={styles.verdictStatValue}>주말 / 공휴일 / 기념일</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>가격</p>
                <p className={styles.verdictStatValue}>날짜별 변동 — 고정 금액 없음</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>판매 시작</p>
                <p className={styles.verdictStatValue}>약 2개월 전, 하루 수량 한정</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 입장용으로 스튜디오 패스를 사고, 익스프레스 패스는 날짜를 보고 정하세요.
              붐비는 날 하루이고 인기 어트랙션을 타고 싶다면 익스프레스 패스 7, 비교적 한가한 날이거나 상위 몇
              개만 원한다면 익스프레스 패스 4, 슈퍼 닌텐도 월드가 여행의 목적이라면 입장 확약권이 포함된 버전입니다.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={koUsjStudioPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 스튜디오 패스 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="같은 날 예약할 것"
          heading="USJ 스튜디오 패스와 함께 예약할 것"
          intro="스튜디오 패스는 입장권입니다. USJ 방문을 계획할 때는 입장권 외에도 숙소와 교통편, 모바일 데이터 등을 함께 준비하면 편리합니다. 아래 다섯 가지는 티켓과 같은 클룩 계정으로 예약할 수 있습니다."
          items={sameDayPrep}
        />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>익스프레스 패스</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              익스프레스 패스는 입장권이 아닌 추가 상품입니다. 같은 날짜의 스튜디오 패스가 필요하고, 하루 판매
              수량이 정해져 있습니다. 아래 내용을 보고 날짜에 맞춰 정하세요.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={koUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 익스프레스 패스 →
              </KlookLink>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} label="익스프레스 패스를 GetYourGuide에서 비교 →" />
            </div>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>패스 자체</span>
          <h2 className={styles.sectionTitle}>유니버설 스튜디오 재팬 익스프레스 패스란?</h2>
          <p className={styles.bodyText}>
            특정 날짜에 쓰는 추가 상품으로, 정해진 어트랙션에서 일반 대기 줄 대신 더 짧은 익스프레스 패스 전용
            줄을 이용하게 해 줍니다. 파크 입장권은 <strong>아닙니다</strong>. USJ 공식 익스프레스 패스 페이지에
            따르면 테마파크 입장권이 별도로 필요하므로, 같은 날짜를 커버하는 스튜디오 패스나 연간 패스가 있어야
            합니다. {CHECKED_USJ} 확인.
          </p>
          <p className={styles.bodyText}>
            버전을 비교하기 전에 알아 둘 점이 두 가지 더 있습니다. 패스에 포함된 어트랙션 중에는 이용 시간이
            지정된 것과 그렇지 않은 것이 있는데, 지정되지 않은 어트랙션은 운영 시간 중 언제든 이용할 수 있다고
            USJ는 설명합니다. 이용할 때는 어트랙션의 익스프레스 패스 입구에서 QR 코드를 보여 줍니다. 그리고
            패스는 거기에 적힌 어트랙션만 커버합니다. 그래서 패스 이름의 숫자보다 어떤 버전을 사느냐가 더
            중요합니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓", "내용", "가격 결정 방식"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            USJ 가격 규칙은 usj.co.jp에서 {CHECKED_USJ} 확인. USJ가 고정 금액을 공개하지 않기 때문에 이 표에는
            엔화 금액이 없습니다. 아래 가격 항목을 보세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>유니버설 스튜디오 재팬 익스프레스 패스는 얼마인가요?</h2>
          <p className={styles.bodyText}>
            한 가지 답은 없고, 이는 얼버무리는 것이 아니라 USJ 자신의 입장입니다. 익스프레스 패스 페이지는 유효한
            익스프레스 패스의 종류와 가격이 날짜에 따라 다르다고 하고, 2026년 6월 30일 스튜디오 패스 가격
            안내는 익스프레스 패스가 2018년부터 수요 기반 가격 체계로 정해져 왔으며 변경 계획이 없다고 밝힙니다.
            계획에 쓸 수 있는 것은 규칙이므로, 이 표에는 그 규칙을 정리했습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["항목", "USJ가 밝힌 내용", `출처(${CHECKED_USJ} 확인)`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.usj}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            가격대를 적지 않는 이유: 가격을 보여 줄 두 곳을 읽을 수 없기 때문입니다. USJ 회원 티켓 페이지는{" "}
            {CHECKED_USJ}에 자동 확인 요청에 HTTP 503으로 응답했고, 공식 WEB 티켓 스토어는 가상 대기실 뒤에
            있습니다. 제3자 페이지의 금액을 옮겨 적는 대신, 이 가이드는 USJ의 가격 규칙을 싣고 그날 결제 화면의
            가격을 확인하도록 안내합니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>패스 종류 비교</span>
          <h2 className={styles.sectionTitle}>익스프레스 패스 4와 7, 무엇을 살까?</h2>
          <p className={styles.bodyText}>
            붐비는 날짜에 첫 방문이라면 익스프레스 패스 7, 비교적 한가한 날짜나 짧은 하루, 또는 상위 몇 개
            어트랙션만 원하는 재방문이라면 익스프레스 패스 4입니다. 숫자는 우선 탑승 혜택이 적용되는 어트랙션 이용 횟수를 뜻하며,
            어트랙션 목록 자체는 버전과 날짜별로 정해져 있습니다. 패스 이름의 숫자보다 방문 날짜에 이용 가능한
            어트랙션을 확인하세요.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["버전", "포함 내용", "슈퍼 닌텐도 월드", "어울리는 경우"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {variantRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            버전 이름과 슈퍼 닌텐도 월드 입장 규칙은 usj.co.jp에서 {CHECKED_USJ} 확인. 특정 날짜에 어떤 버전이 있는지는 날짜별
            문제입니다. 구성이 파크 이벤트에 따라 바뀌므로, 위 표는 고정된 상품 목록이 아니라 구성의 형태를
            보여 줍니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>살까 말까</span>
          <h2 className={styles.sectionTitle}>유니버설 스튜디오 재팬에 익스프레스 패스가 필요할까?</h2>
          <p className={styles.bodyText}>
            거의 전적으로 여러분이 아니라 날짜에 달려 있습니다. 한가한 평일에는 대개 스튜디오 패스만으로
            충분하고, 주말이나 일본 공휴일, 25주년 기념 날짜에는 익스프레스 패스가 인기 어트랙션을 타느냐 줄만
            서느냐를 가릅니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["방문 날짜", "익스프레스 패스?", "이유"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {needRows.map((row) => (
                    <tr key={row.date}>
                      <td className={styles.tdProvider}>{row.date}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 600 }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={koUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 익스프레스 패스 보기 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} label="익스프레스 패스를 GetYourGuide에서 비교 →" />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            그리고 날짜가 정해지면 세 가지 예약이 뒤따릅니다. 게이트 옆 숙소, 간사이 공항에서 들어오는 교통,
            그리고 당일 파크 공식 앱에 필요한 데이터입니다.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={klookFor(usjStayAreas[0].url, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 유니버설시티 호텔 보기 →
            </KlookLink>
            <KlookLink href={klookFor(jrHarukaUrl, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 하루카 티켓 보기 →
            </KlookLink>
            <KlookLink href={klookFor(jrKansaiMiniPass.url, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 간사이 미니 패스 보기 →
            </KlookLink>
            <KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩 eSIM 옵션 보기 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>매진</span>
          <h2 className={styles.sectionTitle}>USJ 익스프레스 패스는 언제 매진되나요?</h2>
          <p className={styles.bodyText}>
            그날 판매 수량이 다 팔리는 순간입니다. USJ 공식 페이지는 매일 한정 수량이 판매되며 미리 매진되는
            경우가 많다고 하므로, 안전한 시점은 없고 더 이른 시점만 있습니다. 구매할 수 있는 기간은 약 2개월이며,
            이것이 알아 둘 가장 유용한 사실입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["질문", "USJ가 공개한 내용", `출처(${CHECKED_USJ} 확인)`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {windowRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            실제로는 익스프레스 패스를 항공권과 숙소 다음으로 가장 먼저 예약해야 한다는 뜻이지, 마지막에 챙길
            것이 아닙니다. 두 번째 판매처도 있으면 좋은 정도가 아니라 확인할 가치가 있습니다. 판매 수량은
            날짜별이자 판매처별로 배정되므로, 한 사이트에서 매진된 날짜가 모든 곳에서 매진된 것은 아닙니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>구매 방법</span>
          <h2 className={styles.sectionTitle}>유니버설 스튜디오 재팬 익스프레스 패스는 어떻게 사나요?</h2>
          <p className={styles.bodyText}>
            온라인에서 특정 날짜로, USJ에서 직접 또는 판매처를 통해 삽니다. USJ의 구매 기간 안내는 공식 WEB
            티켓 스토어와 로손 티켓을 판매처로 명시하고 판매 기간을 방문일 약 2개월 전부터로 정하고 있으며,
            판매처들은 같은 날짜 지정 상품을 영어 결제 화면으로 팝니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["판매처", "살 수 있는 것", "알아 둘 점"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            판매처와 판매 기간은 USJ의 2025년 4월 21일 구매 기간 안내에서, 여행사를 통한 슈퍼 닌텐도 월드 입장은
            USJ 시간 지정 입장 페이지에서 확인했습니다. 둘 다 {CHECKED_USJ} 확인. 어느 판매처를 쓰든 패스는 날짜
            지정이고 변경과 환불이 제한됩니다. 날짜를 확정하기 전에 아래 FAQ의 취소 관련 항목을 보세요.
          </p>
          <div className={styles.stepsList} style={{ marginTop: "1.5rem" }}>
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
          <span className={styles.sectionLabel}>슈퍼 닌텐도 월드</span>
          <h2 className={styles.sectionTitle}>익스프레스 패스에 슈퍼 닌텐도 월드가 포함되나요?</h2>
          <p className={styles.bodyText}>
            그렇다고 명시된 버전에만 포함됩니다. 슈퍼 닌텐도 월드 입장 확약권(エリア入場確約券)은 모든 익스프레스
            패스에 포함되는 것이 아니므로 별도로 확인해야 합니다. USJ 공식 시간 지정 입장 페이지는 슈퍼 닌텐도 월드에 들어가는 두 가지 방법을 설명합니다. 일부
            유니버설 익스프레스 패스나 일부 여행사를 통해 미리 확보하는 방법, 그리고 파크에 입장한 뒤 USJ 공식
            앱으로 받는 방법입니다.
          </p>
          <p className={styles.bodyText}>
            앱을 쓰는 방법은 무료이지만, 조건이 더 엄격해졌습니다. USJ에 따르면 2026년 1월 5일부터 정리권(整理券,
            Area Timed Entry Ticket)과 스탠바이 입장권을 받으려면 공식 앱이 필요합니다. 앱에 파크 입장권을 등록한 뒤 에리어,
            인원, 시간을 고르고, 에리어 입구에서 QR 코드를 보여 줍니다. {CHECKED_USJ} 확인. 당일 선착순이기
            때문에, 출발 전에 슈퍼 닌텐도 월드 입장 시간을 확보하는 유일한 방법은 입장 확약권이 포함된 익스프레스
            패스 버전입니다. 앱 설치와 티켓 등록은 비행기에 타기 전에 끝내 두세요. 데이터 없는 휴대폰으로 줄에서
            처리하는 것은 충분히 피할 수 있는 문제입니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>어디에 묵을까</span>
          <h2 className={styles.sectionTitle}>유니버설 스튜디오 재팬에 가려면 어디에 묵어야 할까?</h2>
          <p className={styles.bodyText}>
            <strong>개장 시간에 게이트에 있고 싶다면 유니버설시티, 그렇지 않다면 우메다나 오사카역입니다.</strong>{" "}
            파크 게이트는 JR 유메사키선 유니버설시티역에서 걸어서 약 5분이고, 파크는 오사카역에서 약 20분입니다.
            두 수치 모두 오사카 관광국(Osaka Convention &amp; Tourism Bureau)의 것으로 {CHECKED} 확인했습니다.
            JR 서일본의 파크 목적지 페이지는 유니버설시티역을 가장 가까운 역으로 꼽고 파크가 역 &ldquo;바로
            옆&rdquo;에 있다고 설명합니다(같은 날 확인).
          </p>
          <p className={styles.bodyText}>
            그 도보 거리가 핵심입니다. 익스프레스 패스를 쓰는 날에는 일찍 개찰구를 통과하고 싶고, 이동을 5분
            도보로 바꿔 주는 지역은 유니버설시티뿐입니다. 반대 논리는 여행의 나머지입니다. 우메다와 오사카역은
            JR 주요 노선 위에 있고, 유니버설시티 호텔은 몇 곳이 모여 있을 뿐이라 붐비는 날짜에는 가장 먼저 객실이
            찹니다.{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>
              오사카 숙소 가이드(영어)
            </Link>
            는 네 지역을 노선과 공항 접근으로 비교하고,{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>
              오사카 2일 일정(영어)
            </Link>
            은 파크에 가는 하루가 나머지 시내 일정과 어떻게 맞물리는지 보여 줍니다.
          </p>
        </section>

        <KlookStayAreas
          heading="USJ 호텔 검색, 지역별로"
          intro="어떤 객실이 남아 있고 얼마인지는 날짜별 문제이므로, 각 지역은 클룩의 해당 지역 호텔 검색으로 바로 연결됩니다. 스튜디오 패스의 날짜를 넣고 유니버설시티와 JR 쪽 거점 한 곳을 비교해 보세요. 한가한 평일에는 보통 가격 차이이고, 기념일 주말에는 보통 객실이 있느냐의 차이입니다."
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>간사이 공항이나 오사카역에서 USJ까지 어떻게 갈까?</h2>
          <p className={styles.bodyText}>
            USJ는 오사카 서쪽 고노하나구에 있고, 역은 JR 유메사키선(사쿠라지마선) 유니버설시티역입니다. 보통
            니시쿠조에서 갈아탑니다. JR 서일본은 유니버설시티역을 파크의 가장 가까운 역으로 꼽고, 오사카 관광국은
            게이트까지 역에서 걸어서 약 5분, 파크까지 오사카역에서 약 20분으로 봅니다. 둘 다 {CHECKED} 확인. JR
            서일본은 영어 사이트에 유메사키선 구간의 전체 소요 시간을 공개하지 않으므로, 여기에도 적지 않습니다.
          </p>
          <p className={styles.bodyText}>
            <strong>간사이 공항</strong>에서 시내로 들어가는 합리적인 방법은 두 가지이고, 둘 다 파크까지 바로
            가지는 않습니다. JR 서일본의 하루카는 공항에서 덴노지, 오사카, 신오사카, 교토까지 환승 없이 갑니다.
            할인 편도 티켓은 단기 체류로 입국한 외국 여권 소지자에게만 판매되며, 2026년 10월 31일까지 덴노지
            ¥1,300, 오사카·신오사카 ¥1,800이고 2026년 11월 1일부터 ¥1,600과 ¥1,900으로 오르며, 어린이는 반액입니다.
            난카이 라피트는 환승 없이 난바까지 최소 34분이며, 보통 운임에 더해 어른 ¥700, 어린이 ¥350의 특급권이
            필요합니다. 차내에서 사면 ¥300 더 비싸고, 티켓리스로 사면 ¥150 저렴합니다. JR 서일본과 난카이 수치,
            둘 다 {CHECKED} 확인. 어느 쪽이든 그다음 환상선으로 니시쿠조까지 가서 유메사키선으로 갈아탑니다.
          </p>
          <p className={styles.bodyText}>
            알아 둘 만한 패스가 하나 있습니다. JR 서일본의 간사이 에어리어 패스 페이지는{" "}
            <strong>WEST QR 간사이 미니 패스</strong>를 &ldquo;Kyoto, Universal Studios Japan, Osaka, Namba,
            Kobe and Nara 3-Day Unlimited Rides&rdquo;라고 소개하며, 패스 자체는 연속 3일 동안 보통 열차(신쾌속·쾌속
            포함)를 탈 수 있고 어른 ¥3,000, 어린이 ¥1,500입니다. 하루카를 포함한 특급 열차에는 쓸 수 없고, JR
            서일본은 별도 티켓이 필요하다고 밝힙니다. 하루카를 커버하는 것은 <strong>WEST QR 간사이 에어리어
            패스</strong>로(자유석 무제한, 지정석 2회), 1일권 ¥2,700부터 4일권 ¥6,700까지입니다. 모두 {CHECKED}{" "}
            확인. 두 패스 모두 오사카 메트로는 포함하지 않고, 유니버설시티까지 가는 오사카 메트로 패스도 없습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jrHarukaUrl, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 하루카 티켓 보기 →
            </KlookLink>
            <KlookLink href={klookFor(nankaiRapitUrl, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 난카이 라피트 보기 →
            </KlookLink>
            <KlookLink href={klookFor(jrKansaiMiniPass.url, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 간사이 미니 패스 보기 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            경로는{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={linkStyle}>
              오사카 공항 교통 가이드(영어)
            </Link>
            (하루카와 난카이 라피트 비교 포함)와 1일권 정보가 있는{" "}
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>
              오사카 시내 교통 가이드(영어)
            </Link>
            , 위의 JR 패스를 자세히 다룬{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={linkStyle}>
              간사이 에어리어 패스 가이드(영어)
            </Link>
            에서 확인하세요.
          </p>
        </section>

        <KlookTripPrep
          label="함께 예약할 것"
          heading="오사카 여행에 그 밖에 무엇을 예약할까?"
          intro="파크는 하루입니다. 아래 세 가지는 같은 여행에서 보통 그 앞뒤로 필요한 것들이고, 첫 번째는 잘못된 이유로 사지 않도록 목록에 넣었습니다."
          items={tripPrep}
        />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/where-to-stay-in-osaka", title: "오사카 숙소 추천 지역(2026): 노선과 공항 접근으로 비교(영어)" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "오사카 해유관 티켓(2026): 가격, 운영 시간, 입장 시간대(영어)" },
            { href: "/guides/attractions/things-to-do-osaka", title: "오사카 가볼 만한 곳(2026): 패스가 이득인 곳과 아닌 곳(영어)" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "오사카 주유패스(2026): 하루 ¥2,500, 살 만할까(영어)" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "오사카 출발 교토·나라 당일 투어(2026): 어떤 일정을 예약할까(영어)" },
            { href: "/guides/transport/osaka-airport-transfer", title: "오사카 공항 교통 가이드(2026): 간사이·이타미 공항에서 시내로(영어)" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "오사카 2일 일정(2026): 날짜별 동선과 예약할 것(영어)" },
            { href: "/guides/transport/osaka-transportation", title: "오사카 시내 교통(2026): 지하철, 전철, IC 카드 정리(영어)" },
            { href: "/guides/attractions", title: "일본에서 할 것 더 보기(영어)" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드·씨 선택" },
            { href: "/guides/transport/osaka-metro-pass", title: "오사카 메트로 패스 vs 엔조이 에코 카드(2026): 관광객은 무엇을 살까(영어)" },
          ]}
        />

        <GygCompare
          slug={GYG_SLUG}
          heading="GetYourGuide의 USJ 티켓과 익스프레스 패스"
          intro="익스프레스 패스는 하루 수량이 정해져 있고 적힌 날짜에 묶여 있어서, 원하는 패스가 이미 매진된 경우가 많습니다. GetYourGuide는 익스프레스 패스를 단독으로 팔고(다른 곳과 마찬가지로 파크 입장권은 포함되지 않습니다), 스튜디오 패스는 따로 팝니다. 위에서 날짜가 매진됐다면 여행 날짜를 바꾸기 전에 여기를 확인해 보세요."
          listings={[gygUsjExpressPass, gygUsj]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>USJ에서 줄을 줄이세요</h2>
            <p className={styles.ctaBannerDesc}>
              입장용 스튜디오 패스를 온라인으로 사고, 날짜에 필요한 익스프레스 패스 버전을 더하세요. 하루 판매
              수량은 정해져 있고, 슈퍼 닌텐도 월드 입장 확약권이 포함된 버전이 가장 먼저 팔립니다.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={koUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                USJ 티켓과 패스 보기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
