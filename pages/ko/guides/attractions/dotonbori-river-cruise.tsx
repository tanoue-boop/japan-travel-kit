import Head from "next/head";
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
import {
  koDotonboriCityCruise,
  koDotonboriNaniwaBoat,
  koOsakaAmazingPass,
} from "../../../../lib/klook-links-ko";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

const ROUTE = "/ko/guides/attractions/dotonbori-river-cruise";
const TITLE = "도톤보리 리버크루즈(2026): 요금과 시간";
const DESC =
  "도톤보리 리버크루즈 요금과 시간: 성인 ¥2,000, 약 20분, 다자에몬바시 선착장에서 11:00~21:00 30분 간격.";

// Every figure comes from the English guide, which read the fares, the schedule and
// the pass conditions off osaka-info.jp (Osaka Convention & Tourism Bureau), the
// Osaka Amazing Pass operator's own free-admission list and suito-osaka.jp on
// 1 November 2026. Nothing was re-checked or added for this edition.
const CHECKED = dateLabel("2026-11-01", "ko");
// The pass price is owned by lib/attraction-prices.ts, shared with the English pages.
const PASS_1_DAY = PRICES.osakaAmazingPass.adult;

const fareRows = [
  { tier: "성인", price: "¥2,000", what: "다자에몬바시 선착장 창구 요금이고, 패스의 가치를 재는 기준입니다" },
  { tier: "학생(중학생 이상)", price: "¥1,000", what: "성인의 절반 — 오사카에서 학생 요금을 따로 두는 드문 경우입니다" },
  { tier: "어린이(초등학생)", price: "¥500", what: "성인의 4분의 1" },
  { tier: "미취학 아동", price: "무료", what: "유료 성인 1명당 1명 무료, 두 번째 아이는 어린이 요금 ¥500" },
  { tier: "오사카 주유패스 소지자", price: "무료", what: "1회 포함 — 다만 접수 데스크에서 시간이 지정된 티켓으로 교환해야 합니다" },
  { tier: "오사카 e-패스 소지자", price: "무료", what: "오사카시 공식 e-패스 페이지에도 무료 시설로 올라 있습니다" },
];

const scheduleRows = [
  { what: "첫 출항", when: "11:00" },
  { what: "마지막 출항", when: "21:00" },
  { what: "간격", when: "30분마다 — 정시와 30분에 출항하므로 하루 21편" },
  { what: "물 위에 있는 시간", when: "약 20분" },
  { what: "승선 장소", when: "톤보리 리버워크(북쪽 강변)의 다자에몬바시 선착장, 에비스바시에서 1분" },
  { what: "접수", when: "선착장 바로 앞 돈키호테 도톤보리점 1층" },
  { what: "매표소 오픈", when: "그날 첫 출항 1시간 전 — 10:00" },
  { what: "온라인 예약 마감", when: "출항 10분 전(선결제)" },
  { what: "전화 예약", when: "받지 않습니다" },
  { what: "2026년 휴항일", when: "7월 13일・24일・25일" },
  { what: "운항 중단", when: "강 상황과 선박 정비로 사전 공지 없이 변경될 수 있습니다" },
];

const boatRows = [
  {
    boat: "톤보리 리버크루즈(잇폰마쓰 해운)",
    run: "약 20분, 11:00–21:00 30분 간격",
    fare: "성인 ¥2,000／학생 ¥1,000／어린이 ¥500",
    pass: "오사카 주유패스・오사카 e-패스로 무료",
    sold: "다자에몬바시 선착장 창구, 또는 운항사 자체 온라인 예약",
  },
  {
    boat: "원더 크루즈 — 도톤보리 코스",
    run: "20분, 도톤보리 구간 왕복",
    fare: "성인 ¥1,000／어린이 ¥500",
    pass: "패스 시설이 아닙니다",
    sold: "닛폰바시 선착장, 옆의 WONDER PUB 매표 부스",
  },
  {
    boat: "원더 크루즈 — 오사카 크루즈 코스",
    run: "30~40분, 닛폰바시↔핫켄야하마 편도",
    fare: "성인 ¥1,800／어린이 ¥900",
    pass: "패스 시설이 아닙니다",
    sold: "같은 부스 — 운항 편수가 적어 사전 예약을 권합니다",
  },
  {
    boat: "나니와 관광선",
    run: "30분(클룩 상품 설명 기준)",
    fare: "현재 요금은 상품 페이지에서 확인",
    pass: "패스 시설이 아닙니다",
    sold: "클룩 — 한국어 화면, 해외 발급 카드",
  },
  {
    boat: "도톤보리 시티 크루즈",
    run: "20분(클룩 상품 설명 기준)",
    fare: "현재 요금은 상품 페이지에서 확인",
    pass: "패스 시설이 아닙니다",
    sold: "클룩 — 라운지형 좌석, 음료 지참 가능, 반려동물 동반 가능",
  },
];

const whoFor = [
  {
    title: "해가 진 뒤에 타는 경우",
    desc: "엽서에 실리는 쪽을 원하는 경우입니다. 글리코 간판, 에비스바시 쪽 건물의 네온, 수면에 비치는 빛이 이 크루즈의 핵심이고, 14:00에는 그중 아무것도 없습니다. 마지막 출항이 21:00이라 오사카의 일몰이 19시를 넘기는 한여름에도 빛이 사라진 뒤 네 편이 남습니다.",
  },
  {
    title: "낮에 타는 경우",
    desc: `패스를 쓰면서 하루를 효율적으로 돌리고 싶거나 아이와 함께인 경우입니다. 낮 출항은 회차를 잡기 쉬운 쪽입니다. 패스 운영사도 저녁 배가 먼저 차니 낮에 교환하라고 안내합니다. 13:00에 20분을 타면 패스 소지자에게는 비용이 들지 않고 다른 두 일정 사이에 끼워 넣을 수 있습니다. 안내 확인일 ${CHECKED}.`,
  },
  {
    title: "다른 배를 고르는 경우",
    desc: "더 싼 요금, 벤치가 아닌 좌석, 더 긴 운항, 또는 손에 든 음료를 원하는 경우입니다. 톤보리 배는 편수가 많고 패스가 커버하는 쪽입니다. 원더 크루즈는 닛폰바시 선착장에서 같은 20분을 절반 가격으로 운항하고, 다른 운항사들은 30분 코스, 음료 지참이 가능한 라운지 좌석 크루즈, 클럽 입장이 붙은 DJ 보트를 팝니다. 같은 강, 다른 저녁입니다.",
  },
];

const steps = [
  {
    title: "무엇보다 먼저 패스를 쓸지 정합니다",
    desc: `이 페이지에서 돈이 움직이는 결정은 이것뿐입니다. 톤보리 리버크루즈는 오사카 주유패스의 무료 입장 시설이고 1일권이 ${PASS_1_DAY}입니다. 패스를 쓰는 날이 이미 일정에 있다면 크루즈 티켓은 아예 사지 않습니다. 그렇지 않다면 창구 요금은 성인 ¥2,000이고, 닛폰바시 선착장의 원더 크루즈는 20분 도톤보리 코스가 ¥1,000으로 이 강에서 가장 싼 단일 티켓입니다.`,
  },
  {
    title: "패스를 쓴다면 이른 시간에 교환해 둡니다",
    desc: "패스만으로는 배에 오르지 못합니다. 접수 데스크에서 시간이 적힌 티켓으로 교환해야 하고, 운항사는 티켓에 적힌 시간에만 승선할 수 있다고 적고 있습니다. 패스 운영사의 안내도 저녁 크루즈가 먼저 차므로 낮에 교환하라고 말합니다. 다른 일정으로 가는 길에 선착장을 지나면서 회차를 먼저 잡아 두세요.",
  },
  {
    title: "직접 결제한다면 창구나 온라인으로 — 전화는 안 됩니다",
    desc: "당일 티켓은 선착장 옆 매표소에서 팔고, 매표소는 그날 첫 출항 1시간 전에 엽니다. 전화 예약은 받지 않습니다. 온라인 예약은 출항 10분 전까지 가능하고 선결제입니다. 금요일이나 토요일 저녁이라면 이쪽을 쓰는 편이 좋습니다.",
  },
  {
    title: "선착장은 주소보다 찾기 쉽습니다",
    desc: "다자에몬바시 선착장은 북쪽 강변의 톤보리 리버워크 산책로에 있고, 접수는 돈키호테 도톤보리점 1층입니다. 건물 측면에 관람차가 붙어 있는 그 건물입니다. 난바・신사이바시・닛폰바시역에서 걸어서 5~10분이지만 세 역 모두 반대쪽 강변에 내려주므로 에비스바시나 다자에몬바시에서 건너세요.",
  },
  {
    title: "20분이 아니라 왕복 약 40분으로 계산합니다",
    desc: "크루즈는 20분입니다. 접수 데스크 줄, 폰툰까지 내려가는 길, 수십 명이 타는 배의 승선이 나머지 절반입니다. 저녁 식사 예약과 공연 사이에 끼워 넣는다면 40분 블록으로 보세요.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도톤보리 리버크루즈 요금은 얼마인가요?",
    a: `성인 ¥2,000입니다. 다자에몬바시 선착장에서 출항하는 운항사의 배인 톤보리 리버크루즈는 성인 ¥2,000, 중학생 이상 학생 ¥1,000, 초등학생 어린이 ¥500이고, 유료 성인 1명당 미취학 아동 1명이 무료입니다. 오사카시 공식 관광 기관과 오사카 주유패스 운영사의 무료 시설 목록이 같은 세 금액을 싣고 있습니다. 오사카 주유패스와 오사카 e-패스로는 무료이며, 두 경우 모두 접수 데스크에서 시간이 지정된 티켓으로 교환한 뒤입니다. 이 강의 다른 배들은 요금이 따로입니다. 닛폰바시 선착장의 원더 크루즈는 20분 도톤보리 코스가 ¥1,000이고, 클룩에서 파는 배들은 각 상품 페이지에 요금이 적혀 있습니다. 모두 확인일 ${CHECKED}.`,
  },
  {
    q: "톤보리 리버크루즈는 얼마나 걸리나요?",
    a: `물 위에서 약 20분입니다. 미나미 중심을 지나는 도톤보리 수로를 따라 갔다 돌아옵니다. 크루즈치고는 짧지만 길이는 적당합니다. 이 배가 지나는 구간은 네온 간판이 늘어선 몇백 미터뿐이고, 더 길어지면 같은 곳을 한 번 더 도는 것뿐입니다. 접수 데스크, 폰툰까지 걷는 시간, 승선까지 더해 왕복 40분 정도로 보세요. 소요 시간은 오사카시 공식 관광 사이트와 수도 오사카 크루즈 포털에 실린 값이고 확인일은 ${CHECKED}입니다.`,
  },
  {
    q: "도톤보리 리버크루즈는 몇 시에 운항하나요?",
    a: `11:00부터 21:00까지 30분마다 — 정시와 30분에 출항하므로 하루 21편이고, 2026년에는 7월 13일・24일・25일만 휴항합니다. 선착장 옆 매표소는 첫 출항 1시간 전인 10:00에 엽니다. 계획을 세울 때 중요한 숫자는 21:00 마지막 배입니다. 어느 계절이든 저녁 식사 뒤에 야간 크루즈가 들어갈 만큼 늦고, 그 때문에 낮보다 저녁 회차가 희소해집니다. 운항 시간 확인일 ${CHECKED}. 강 상황과 선박 정비로 변경될 수 있습니다.`,
  },
  {
    q: "도톤보리 리버크루즈 마지막 배는 몇 시인가요?",
    a: "운항하는 날은 모두 21:00입니다. 모든 출항이 같은 요금이므로 마지막 배는 완전히 불이 들어온 도톤보리를 보는 가장 저렴한 방법입니다. 다만 패스 운영사가 먼저 마감된다고 말하는 시간대 안에 있으므로, 그냥 가서 타기보다 미리 확보해 둘 만한 유일한 회차이기도 합니다. 패스를 쓴다면 낮에 20:30이나 21:00 티켓으로 교환하고, 직접 결제한다면 운항사 온라인 예약이 출항 10분 전까지 열려 있습니다.",
  },
  {
    q: "도톤보리 리버크루즈는 어디서 타나요?",
    a: "도톤보리 수로 북쪽 강변의 톤보리 리버워크 산책로에 있는 다자에몬바시 선착장이고, 에비스바시에서 동쪽으로 1분 정도입니다. 접수 데스크는 선착장 바로 앞 돈키호테 도톤보리점 1층이라, 선착장보다 이 건물을 목표로 삼는 편이 낫습니다. 난바・신사이바시・닛폰바시역에서 걸어서 5~10분입니다. 세 역 모두 글리코 간판이 있는 남쪽에 내려주므로 에비스바시나 다자에몬바시에서 건너야 배에 닿습니다. 원더 크루즈는 운항사가 달라 닛폰바시 선착장에서 타므로, 폰툰까지 걸어가기 전에 본인 티켓이 어느 배인지 확인하세요.",
  },
  {
    q: "도톤보리 리버크루즈와 톤보리 리버크루즈는 다른 배인가요?",
    a: `이름이 둘인 같은 배입니다. '톤보리 리버크루즈'(とんぼりリバークルーズ)가 잇폰마쓰 해운이 운항하는 공식 상품명이고, 티켓과 선착장과 오사카 주유패스 무료 시설 목록에 적히는 이름입니다. '도톤보리 리버크루즈'는 여행자가 검색하는 설명형 표현이고, 이 수로의 어느 배든 느슨하게 가리키는 데 쓰입니다. 닛폰바시 선착장의 원더 크루즈, 클룩에서 파는 시티 크루즈, 나니와 관광선, TONBORIRAVE DJ 보트가 모두 다른 운항사이고 요금도 다릅니다. 패스 때문에 타는 거라면 그중 톤보리 배만 커버됩니다. 명칭과 운항사 확인일 ${CHECKED}.`,
  },
  {
    q: "¥2,000짜리 톤보리 리버크루즈보다 싼 배가 있나요?",
    a: `패스를 쓰지 않는다면 있습니다. 오사카시 공식 관광 기관은 원더 크루즈 도톤보리 코스를 성인 ¥1,000, 어린이 ¥500에 20분 운항으로 싣고 있습니다. 같은 구간을 같은 길이로 돌면서 톤보리 요금의 절반입니다. 승선은 닛폰바시 선착장이고 매표 부스는 옆의 WONDER PUB 매장에 있습니다. 더 긴 오사카 크루즈 코스는 닛폰바시와 핫켄야하마 사이 편도 30~40분으로 성인 ¥1,800, 어린이 ¥900입니다. 단점은 코스별 운항 편수가 적어 사전 예약을 권한다는 점, 그리고 오사카의 어떤 패스도 커버하지 않는다는 점입니다. 오사카 주유패스를 들고 있다면 톤보리 배가 무료이므로 비교할 일이 없습니다. 요금 확인일 ${CHECKED}.`,
  },
  {
    q: "오사카 주유패스로 도톤보리 리버크루즈가 무료인가요?",
    a: `무료입니다. 톤보리 리버크루즈는 오사카 주유패스의 무료 입장 시설 중 하나이고, 우메다 스카이빌딩처럼 오후 시간 제한이 붙지도 않습니다. 오사카 e-패스에서도 무료입니다. 조건은 금액이 아니라 절차입니다. 접수 데스크에서 패스를 출항 시간이 적힌 티켓으로 교환해야 하고, 운항사는 티켓에 적힌 시간에만 승선할 수 있다고 적고 있습니다. 패스 운영사도 저녁 크루즈가 빨리 마감되므로 낮에 교환할 것을 권합니다. 1일권이 ${PASS_1_DAY}이므로, ¥2,000 크루즈에 오사카성 천수각 ¥1,200만 더해도 지하철을 한 번도 타기 전에 거의 본전입니다. 조건 확인일 ${CHECKED}.`,
  },
  {
    q: "도톤보리 리버크루즈는 미리 예약해야 하나요?",
    a: "보통은 아니지만, 저녁은 오후와 다른 문제입니다. 당일 티켓은 선착장 옆 매표소에서 팔고 매표소는 첫 출항 1시간 전에 열기 때문에, 평일 오후라면 그냥 가도 됩니다. 전화 예약은 받지 않습니다. 금요일이나 토요일 밤 출항이라면 운항사 온라인 예약을 쓰세요. 출항 10분 전까지 열려 있고 선결제입니다. 패스를 쓴다면 낮에 저녁 회차로 교환해 두세요. 운항사 안내가 밤 배부터 마감된다고 말하고 있습니다.",
  },
  {
    q: "도톤보리 리버크루즈는 밤이 좋나요, 낮이 좋나요?",
    a: "한 번만 탄다면 밤입니다. 돈을 내는 대상이 글리코 간판, 네온 건물, 수면의 빛이고 세 가지 모두 어둠이 필요합니다. 낮의 장점은 둘 다 실무적입니다. 회차를 잡기 쉽고, 하루에 무료 입장 여러 곳을 넣으려는 패스 소지자에게는 13:00 출항이 19:30보다 끼워 넣기 쉽습니다.",
  },
  {
    q: "비가 와도 운항하나요?",
    a: `보통은 운항하지만 겉옷과 모자를 챙기세요. 이 배는 수도 오사카 크루즈 포털에 지붕 없는 배로 올라 있고(확인일 ${CHECKED}), 그래서 도톤보리의 낮은 다리 아래를 지날 수 있습니다. 공개된 운항 중단 사유는 비 자체가 아닙니다. 패스 운영사의 시설 목록은 강 상황이나 선박 정비로 운항이 중단될 수 있다고 적고 있습니다. 소나기보다 폭우와 증수를 위험으로 보는 편이 맞습니다.`,
  },
  {
    q: "도톤보리의 크루즈 중 어느 것을 고를까요?",
    a: "오사카 패스를 들고 있거나 편수가 가장 많은 배를 원한다면 톤보리 리버크루즈입니다. ¥2,000, 20분, 30분 간격이고 패스가 커버하는 유일한 배입니다. 현금으로 결제하면서 같은 20분을 ¥1,000에 타고 싶고 닛폰바시 선착장에서 타는 것, 운항 편수가 적어 미리 예약하는 것이 괜찮다면 원더 크루즈 도톤보리 코스입니다. 30분의 더 긴 운항을 원하면 나니와 관광선입니다. 라운지 좌석과 직접 가져온 음료를 원하면 도톤보리 시티 크루즈이고, 상품 설명에는 반려동물 동반도 가능하다고 적혀 있어 드문 경우입니다. 관광보다 밤 외출의 시작이라면 TONBORIRAVE 보트입니다. DJ가 타고 피카딜리 클럽 무료 입장이 붙습니다.",
  },
  {
    q: "아이와 함께 타도 괜찮나요?",
    a: "괜찮고, 요금 구조가 그렇게 말합니다. 성인 ¥2,000에 초등학생 어린이가 ¥500입니다. 20분은 어린아이의 집중이 유지되는 길이이고, 전망대나 테마파크 놀이기구처럼 줄을 설 일도 없습니다. 계획에 넣어 둘 것은 지붕이 없는 배라는 점(8월의 햇볕과 1월의 바람), 그리고 시간이 지정된 티켓이므로 도착은 적힌 시간 전이어야 한다는 점입니다.",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "도톤보리 리버크루즈" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoDotonboriRiverCruisePage({ updated }: { updated: PageUpdated }) {
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
          <h1 className={styles.heroTitle}>
            도톤보리 리버크루즈(2026):<br />요금, 운항 시간, 그리고 톤보리 배
          </h1>
          <p className={styles.heroSubtitle}>
            성인 ¥2,000, 약 20분, 11:00부터 21:00까지 다자에몬바시 선착장에서 30분마다 출항합니다. 저녁 배가
            차기 전에 교환해 두면 오사카 주유패스로 무료입니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 요금, 확인일 표기", "배 5종 비교"].map((t) => (
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
                <p className={styles.verdictStatLabel}>요금</p>
                <p className={styles.verdictStatValue}>성인 ¥2,000／어린이 ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>물 위에 있는 시간</p>
                <p className={styles.verdictStatValue}>약 20분</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>출항</p>
                <p className={styles.verdictStatValue}>11:00–21:00, 30분 간격</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>오사카 주유패스</p>
                <p className={styles.verdictStatValue}>하루 종일 무료</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>도톤보리 리버크루즈</strong>는 공식 명칭이 <strong>톤보리 리버크루즈</strong>이고
              잇폰마쓰 해운이 운항합니다. 성인 <strong>¥2,000</strong>, <strong>약 20분</strong>이며,
              에비스바시에서 1분 거리인 톤보리 리버워크의 <strong>다자에몬바시 선착장</strong>에서{" "}
              <strong>11:00부터 21:00까지 30분마다</strong> 출항합니다.{" "}
              <strong>오사카 주유패스로는 무료</strong>입니다.
            </p>
            <p className={styles.verdictText}>
              나머지 세부 사항: 중학생 이상 학생 <strong>¥1,000</strong>, 초등학생 어린이{" "}
              <strong>¥500</strong>, 유료 성인 1명당 미취학 아동 1명 무료입니다. 접수는 선착장 바로 앞
              돈키호테 도톤보리점 1층입니다. <strong>오사카 e-패스</strong>도 커버하며 두 패스 모두 오후
              시간 제한이 없습니다. 다만 패스만으로는 승선이 되지 않습니다. 접수 데스크에서 출항 시간이
              적힌 티켓으로 교환해야 하고, 패스 운영사는 저녁 크루즈가 먼저 마감된다고 안내합니다. 당일
              티켓은 첫 출항 1시간 전(10:00)부터 선착장에서 팔고, 온라인 예약은 출항 10분 전에 닫히며
              전화 예약은 없습니다. 모두 확인일 {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={koOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                클룩에서 오사카 주유패스 보기 →
              </KlookLink>
              <KlookLink href={koDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                도톤보리 크루즈를 한국어로 예약 →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>도톤보리 리버크루즈란 무엇인가</h2>
          <p className={styles.bodyText}>
            잇폰마쓰 해운이 <strong>다자에몬바시 선착장</strong>에서 <strong>11:00부터 21:00까지</strong>{" "}
            30분마다 운항하는 낮고 지붕 없는 배로, <strong>20분 ¥2,000</strong>이며{" "}
            <strong>오사카 주유패스로 무료</strong>입니다. &lsquo;도톤보리 리버크루즈&rsquo;는 여행자가
            검색하는 말이고, 티켓과 선착장 안내판과 패스 무료 시설 목록에 적히는 이름은{" "}
            <strong>톤보리 리버크루즈</strong>입니다. 현장에서 찾아야 하는 쪽은 후자입니다.
          </p>
          <p className={styles.bodyText}>
            배가 지나는 구간은 글리코 간판과 에비스바시의 인파, 거대한 기계 게가 모두 마주보고 있는 몇백
            미터의 수로입니다. 배에는 가이드가 타서 오사카 특유의 빠른 말투로 안내를 합니다.
          </p>
          <p className={styles.bodyText}>
            20분을 쓸 이유는 시야입니다. 길에서 보는 도톤보리는 혼잡 그 자체이고, 에비스바시 위에서 뒤로
            물러설 공간도 없이 간판을 찍게 됩니다. 수면에서는 인파 아래에서 건물 정면을 막힘 없이 볼 수
            있고, 다리가 머리 위로 가깝게 지나가면서 이 배에 지붕이 없는 이유를 설명해 줍니다.
          </p>
          <p className={styles.bodyText}>
            싸워야 할 시간 지정 예매 시스템도, 티켓 오픈 날짜도, 평일 오후에 매진될 위험도 없습니다. 대신
            있는 것은 <strong>패스 소지자의 교환 규칙</strong>과, 하루보다 먼저 차는 저녁입니다. 대부분의
            계획은 이 두 줄에서 결정됩니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금</span>
          <h2 className={styles.sectionTitle}>도톤보리 리버크루즈 요금</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>성인 ¥2,000, 학생 ¥1,000, 어린이 ¥500.</strong> 연령대마다 한 가지 요금이고 모든
            출항이 같습니다. 야간 출항에 할증이 없다는 점이 드물고, 이 배가 가성비가 좋은 조용한 이유입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["대상", "요금", "비고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.tier}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tier}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            오사카시 공식 관광 사이트와 오사카 주유패스 운영사의 무료 입장 시설 목록에서 읽었고 확인일은{" "}
            {CHECKED}입니다. 두 곳이 같은 세 금액을 싣고 있습니다. 운항사 자체 사이트는 확인일에 정비로
            접속되지 않았으므로, 이 페이지의 모든 숫자는 그 두 곳이 출처입니다. 변경될 수 있으니 결제
            전에 확인하세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>시간과 선착장</span>
          <h2 className={styles.sectionTitle}>운항 시간과 승선 장소</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>11:00부터 21:00까지 30분마다</strong> — 정시와 30분에 출항하고, 2026년에는 7월 13일・
            24일・25일만 휴항합니다. 선착장 옆 매표소는 첫 출항 1시간 전인 <strong>10:00</strong>에 엽니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "내용"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            하루 21편이라는 숫자가 실제로 도움이 됩니다. 저녁을 이 배 중심으로 짜는 게 아니라, 저녁 사이에
            끼워 넣을 수 있다는 뜻이고, <strong>21:00 마지막 배</strong>는 어느 계절이든 식사 뒤에도
            성립할 만큼 늦습니다. 운항 시간 확인일 {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            당일과 사전 예약은 같지 않고, 그 차이는 해가 진 뒤에만 의미가 있습니다.{" "}
            <strong>당일</strong>: 선착장 옆 매표소가 10:00부터 다음 출항 분을 팔지만, 패스 운영사의
            표현은 분명합니다. 좌석이 모두 차면 승선할 수 없습니다. <strong>사전</strong>: 운항사의 웹
            예약은 선결제이고 <strong>출항 10분 전</strong>까지 열려 있습니다. 금요일이나 토요일 저녁에
            쓸 만한 쪽입니다. 전화 예약은 아예 받지 않습니다.
          </p>
          <p className={styles.bodyText}>
            어느 회차가 먼저 차는지에 대해 공개된 안내는 패스 운영사의 것뿐이고, 내용은 구체적입니다.
            저녁 크루즈가 빨리 마감되므로 <strong>낮에</strong> 교환하라는 것입니다. 그대로 읽으면 해가
            진 뒤 — 19:00부터 21:00까지, 주말이라면 더 — 가 희소한 쪽이고, 평일 오후가 그냥 가서 타는
            시간대입니다. 그보다 정밀한 탑승률 수치는 공개되어 있지 않으니 숫자로 다루지 않는 편이 맞습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={koOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              오사카 주유패스 — 크루즈 포함 →
            </KlookLink>
            <KlookLink href={koDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도톤보리 크루즈 회차 미리 잡기 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>언제 타는가</span>
          <h2 className={styles.sectionTitle}>밤이 좋을까, 낮이 좋을까</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            <strong>한 번만 탄다면 밤</strong>입니다. 네온이 상품이고 요금은 모든 출항이 같으므로 전망은
            공짜입니다. 다만 패스가 답을 바꿉니다. 실제로 잡을 수 있는 회차가 원하는 회차와 늘 같지는
            않기 때문입니다.
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={koDotonboriNaniwaBoat.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              30분 관광선 →
            </KlookLink>
            <KlookLink href={koDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              라운지 좌석 시티 크루즈 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>도톤보리의 어느 크루즈를 고를까</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            이 수로에는 여러 운항사가 있고 서로 바꿔 쓸 수 있는 관계가 아닙니다. 비대칭이 두 가지
            있습니다. 첫째, <strong>패스 시설은 톤보리 배뿐</strong>이고 클룩은 그 배를 단독 상품으로
            팔지 않습니다. 오사카 패스를 쓴다면 원하는 배는 휴대폰이 아니라 데스크에서 잡는 쪽입니다.
            둘째, 공식 요금이 공개된 유일한 경쟁 상대인 닛폰바시 선착장의 <strong>원더 크루즈</strong>는{" "}
            <strong>같은 20분 도톤보리 코스를 ¥1,000, 즉 톤보리 요금의 절반에 운항합니다</strong>.
            현금으로 결제하고 패스가 없다면 이쪽이 답입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["배", "운항 시간", "요금", "오사카 패스", "판매처"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {boatRows.map((row) => (
                    <tr key={row.boat}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.boat}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.run}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            톤보리의 숫자는 오사카시 공식 관광 사이트와 패스 운영사의 시설 목록에서, 원더 크루즈 두 줄은
            같은 관광 기관의 WONDER CRUISE・PIRATES 안내에서 읽었습니다. 마지막 두 줄은 각 클룩 상품
            페이지가 적고 있는 내용입니다. 모두 확인일 {CHECKED}. 클룩은 가격 자동 조회를 막고 있어 여기에
            클룩 요금은 적지 않습니다. 현재 금액과 취소 조건은 상품 페이지에서 확인하세요. 조건은 운항사가
            아니라 상품별로 다릅니다.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>예약 절차</span>
          <h2 className={styles.sectionTitle}>도톤보리 리버크루즈 예약 방법</h2>
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
          <span className={styles.sectionLabel}>패스 문제</span>
          <h2 className={styles.sectionTitle}>오사카 주유패스로 무료인가</h2>
          <p className={styles.bodyText}>
            <strong>하루 종일 무료입니다.</strong> 톤보리 리버크루즈는 오사카 주유패스의 40개가 넘는 무료
            입장 시설 중 하나이고 <strong>오후 시간 제한이 없습니다</strong>. 같은 패스의 우메다
            스카이빌딩은 15:00 이후 무료가 아니기 때문에, 이 점은 분명히 말해 둘 만합니다. 오사카 e-패스에서도
            무료 시설입니다.
          </p>
          <p className={styles.bodyText}>
            걸림돌은 시계가 아니라 줄입니다. 패스만으로는 승선이 되지 않습니다. 접수 데스크에서 출항
            시간이 적힌 티켓으로 교환해야 하고, 운항사는 <strong>티켓에 적힌 시간에만 승선할 수 있다</strong>고
            적고 있습니다. 공개된 안내도 저녁 크루즈가 빨리 마감되므로 낮에 교환하라고 말합니다. 실제로는
            점심 가는 길에 돈키호테를 지나면서 19:30 회차를 받아 두는 것과, 19:20에 가서 다음 무료 배가
            21:00임을 알게 되는 것의 차이입니다.
          </p>
          <p className={styles.bodyText}>
            계산은 넉넉합니다. 1일권이 {PASS_1_DAY}이고, 크루즈(¥2,000)에 오사카성 천수각(¥1,200)을 더하면
            지하철을 한 번도 세기 전에 입장료만 ¥3,200입니다. 15:00 전의 우메다 전망대가 ¥2,000을 더
            얹습니다. 조건 확인일 {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={koOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              오사카 주유패스 →
            </KlookLink>
          </div>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법" },
            { href: "/ko/guides/attractions/tokyo-skytree-tickets", title: "도쿄 스카이트리 티켓(2026): 요금과 플로어 350·450 선택" },
            { href: "/ko/guides/attractions/usj-tickets-express-pass", title: "유니버설 스튜디오 재팬 익스프레스 패스(2026): 티켓은 어떤 것을 살까" },
            { href: "/ko/guides/attractions/teamlab-borderless-tickets", title: "팀랩 보더리스 티켓(2026): 가격, 지정 시간 입장, 구매 경로" },
            { href: "/ko/guides/esim/best-esim-japan", title: "일본 이심 추천(2026): eSIM 요금제 비교와 클룩 일본 eSIM" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>티켓이 아니라 회차를 먼저 잡으세요</h2>
            <p className={styles.ctaBannerDesc}>
              ¥2,000이라는 요금은 작은 쪽입니다. 희소한 것은 저녁 출항이고, 이 배를 무료로 만들어 주는
              패스도 밤 배가 차기 전에 데스크에서 교환해야 합니다. 결제 전에 본인 예약에 표시된 취소
              조건을 확인하세요. 운항사가 아니라 상품별로 정해집니다.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={koOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                클룩에서 오사카 주유패스 보기 →
              </KlookLink>
              <KlookLink href={koDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                도톤보리 크루즈 예약 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
