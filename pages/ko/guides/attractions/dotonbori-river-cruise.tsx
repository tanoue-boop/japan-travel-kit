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
import {
  dotonboriCityCruise,
  dotonboriDaytimeFoodTour,
  dotonboriNaniwaSightseeingBoat,
  dotonboriTonboriRaveCruise,
  nambaBarHoppingNightTour,
  osakaAmazingPass,
  osakaCastleUmedaTonboriDayTour,
  osakaWonderCruise,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English guide (pages/guides/attractions/dotonbori-river-cruise.tsx) as of
// 1 November 2026, section for section and CTA for CTA. Every figure comes from that page,
// which read them off osaka-info.jp, the Osaka Amazing Pass operator's list and
// suito-osaka.jp. Re-checked 13 Nov 2026 (task-jtk-20261113-C01): osaka-info.jp Tombori spot page,
// the Osaka Amazing Pass free list and the Wonder Cruise spot/396 page — fares, schedule, 20 minutes
// and Tazaemonbashi Pier unchanged. The suito-osaka.jp no-roof line keeps its 1 Nov 2026 date.

const ROUTE = "/ko/guides/attractions/dotonbori-river-cruise";
const TITLE = "도톤보리 리버크루즈 2026: 가격・시간・다자에몬바시 선착장";
const DESC =
  "도톤보리 리버크루즈 가격 성인 ¥2,000, 약 20분, 11:00~21:00 30분 간격, 다자에몬바시 선착장. 주유패스 무료, 클룩 예약.";

const CHECKED_ISO = "2026-11-13";
const CHECKED = dateLabel(CHECKED_ISO, "ko");
const ROOF_CHECKED = dateLabel("2026-11-01", "ko");
const OSAKA_INFO_URL = "https://osaka-info.jp/en/spot/tombori-river-cruise/";
// The pass price is owned by lib/attraction-prices.ts, shared with the English pages.
const PASS_1_DAY = priceLabel(PRICES.osakaAmazingPass.adult, "ko");

const PASS_URL = klookFor(osakaAmazingPass.url, "ko");
const CITY_CRUISE_URL = klookFor(dotonboriCityCruise.url, "ko");
const NANIWA_URL = klookFor(dotonboriNaniwaSightseeingBoat.url, "ko");
const RAVE_URL = klookFor(dotonboriTonboriRaveCruise.url, "ko");
const WONDER_URL = klookFor(osakaWonderCruise.url, "ko");
const DAY_TOUR_URL = klookFor(osakaCastleUmedaTonboriDayTour.url, "ko");
const FOOD_TOUR_URL = klookFor(dotonboriDaytimeFoodTour.url, "ko");

const LINK_STYLE = { color: "var(--text)", fontWeight: 600 } as const;

const fareRows = [
  { tier: "성인", price: "¥2,000", what: "다자에몬바시 선착장 창구 요금이고, 패스의 가치를 재는 기준입니다" },
  { tier: "학생(중학생 이상)", price: "¥1,000", what: "성인의 절반 — 오사카에서 학생 요금을 따로 두는 드문 시설입니다" },
  { tier: "어린이(초등학생)", price: "¥500", what: "성인의 4분의 1" },
  { tier: "미취학 아동", price: "무료", what: "유료 성인 1명당 1명 무료, 두 번째 아이는 어린이 요금 ¥500" },
  { tier: "오사카 주유패스 소지자", price: "무료", what: "1회 포함 — 다만 먼저 접수 데스크에서 시간이 지정된 티켓으로 교환해야 합니다" },
  { tier: "오사카 e-패스 소지자", price: "무료", what: "오사카시 공식 e-패스 페이지에도 무료 시설로 올라 있습니다" },
];

const scheduleRows = [
  { what: "첫 출항", when: "11:00" },
  { what: "마지막 출항", when: "21:00" },
  { what: "간격", when: "30분마다 — 정시와 30분에 출항하므로 하루 21편" },
  { what: "실제 승선 시간", when: "약 20분" },
  { what: "승선 장소", when: "톤보리 리버워크(북쪽 강변)의 다자에몬바시 선착장, 에비스바시에서 1분" },
  { what: "접수", when: "선착장 바로 앞 돈키호테 도톤보리점 1층" },
  { what: "매표소 오픈", when: "그날 첫 출항 1시간 전 — 10:00" },
  { what: "온라인 예약 마감", when: "출항 10분 전(선결제)" },
  { what: "전화 예약", when: "받지 않습니다" },
  { what: "2026년 휴항일", when: "7월 13일・24일・25일" },
  { what: "운항 중단", when: "강 상황과 선박 정비에 따라 사전 공지 없이 변경될 수 있습니다" },
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
    run: "20분, 도톤보리 구간을 한 바퀴",
    fare: "성인 ¥1,000／어린이 ¥500",
    pass: "패스 시설로 올라 있지 않습니다",
    sold: "닛폰바시 선착장, 옆의 WONDER PUB 매장 매표 부스",
  },
  {
    boat: "원더 크루즈 — 오사카 크루즈 코스",
    run: "30~40분, 닛폰바시↔핫켄야하마 편도",
    fare: "성인 ¥1,800／어린이 ¥900",
    pass: "패스 시설로 올라 있지 않습니다",
    sold: "같은 부스 — 운항 편수가 적어 사전 예약을 권합니다",
  },
  {
    boat: "나니와 관광선",
    run: "30분(클룩 상품 설명 기준)",
    fare: "현재 요금은 상품 페이지에서 확인",
    pass: "패스 시설이 아닙니다",
    sold: "클룩 — 외국인도 해외 발급 카드로 예약 가능",
  },
  {
    boat: "도톤보리 시티 크루즈",
    run: "20분(클룩 상품 설명 기준)",
    fare: "현재 요금은 상품 페이지에서 확인",
    pass: "패스 시설이 아닙니다",
    sold: "클룩 — 라운지형 좌석, 음료 지참 가능, 반려동물 동반 가능",
  },
  {
    boat: "TONBORIRAVE 크루즈",
    run: "관광선이 아니라 DJ 보트",
    fare: "현재 요금은 상품 페이지에서 확인",
    pass: "패스 시설이 아닙니다",
    sold: "클룩 — 피카딜리 나이트클럽 무료 입장이 포함된 상품",
  },
];

const whoFor = [
  {
    title: "해가 진 뒤에 타는 경우",
    desc: "엽서에 실리는 모습을 원하는 경우입니다. 글리코 간판, 에비스바시 쪽 건물의 네온, 수면에 비치는 빛이 이 크루즈의 핵심이고, 14:00에는 그중 아무것도 없습니다. 마지막 출항이 21:00이라 오사카의 일몰이 19시를 넘기는 한여름에도 해가 진 뒤 야간 운항이 네 편 남습니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "낮에 타는 경우",
    desc: `패스를 쓰면서 하루 일정을 제대로 굴리고 싶거나 아이와 함께인 경우입니다. 낮 출항이 회차를 잡기 더 쉽습니다. 패스 운영사도 저녁 배가 먼저 차니 교환은 낮에 하라고 안내합니다. 13:00에 20분을 타면 패스 소지자에게는 비용이 들지 않고, 다른 두 일정 사이에 끼워 넣을 수 있습니다. 안내 확인일 ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "다른 배를 고르는 경우",
    desc: "더 싼 요금, 벤치가 아닌 좌석, 더 긴 운항, 또는 손에 든 음료를 원하는 경우입니다. 톤보리 배는 편수가 많고 패스로 탈 수 있는 배입니다. 원더 크루즈는 닛폰바시 선착장에서 같은 20분을 절반 가격에 운항하고, 다른 도톤보리 운항사들은 30분 코스, 음료 지참이 가능한 라운지 좌석 크루즈, 클럽 입장이 붙은 DJ 보트를 팝니다. 같은 강, 다른 저녁입니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17h18l-2 4H5z" />
        <path d="M5 17V9h14v8" />
        <path d="M12 3v6" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "무엇을 사기 전에 패스를 쓸지부터 정합니다",
    desc: `이 페이지에서 비용이 달라지는 선택은 이것 하나뿐입니다. 톤보리 리버크루즈는 오사카 주유패스의 무료 입장 시설이고 1일권이 ${PASS_1_DAY}입니다. 패스를 쓰는 날이 이미 일정에 있다면 크루즈 티켓은 아예 사지 않습니다. 그렇지 않다면 창구 요금은 성인 ¥2,000이고, 닛폰바시 선착장의 원더 크루즈는 20분 도톤보리 코스가 ¥1,000으로 이 강에서 더 싼 단일 티켓입니다.`,
  },
  {
    title: "패스를 쓴다면 이른 시간에 교환해 둡니다",
    desc: "패스만으로는 배에 오르지 못합니다. 접수 데스크에서 시간이 인쇄된 티켓으로 교환해야 하고, 운항사는 티켓에 적힌 시간에만 승선할 수 있다고 밝히고 있습니다. 패스 운영사의 안내도 저녁 크루즈가 먼저 차므로 낮에 교환하라고 말합니다. 다른 일정으로 가는 길에 선착장을 지나면서 회차를 그때 잡아 두세요.",
  },
  {
    title: "직접 결제한다면 창구나 온라인으로 — 전화는 안 됩니다",
    desc: "당일 티켓은 선착장 옆 매표소에서 팔고, 매표소는 그날 첫 출항 1시간 전에 엽니다. 전화 예약은 받지 않습니다. 온라인 예약은 출항 10분 전까지 가능하고 선결제이며, 금요일이나 토요일 저녁이라면 이쪽을 쓰는 편이 좋습니다.",
  },
  {
    title: "선착장은 주소로 보는 것보다 찾기 쉽습니다",
    desc: "다자에몬바시 선착장은 북쪽 강변의 톤보리 리버워크 산책로에 있고, 접수는 돈키호테 도톤보리점 1층입니다. 건물 측면에 관람차가 붙어 있는 그 건물입니다. 난바・신사이바시・닛폰바시역에서 걸어서 5~10분이지만 세 역 모두 반대쪽 강변에 내려주므로 에비스바시나 다자에몬바시에서 건너세요.",
  },
  {
    title: "20분이 아니라 오가는 시간까지 약 40분으로 잡습니다",
    desc: "크루즈는 20분입니다. 접수 데스크 줄, 승선장까지 내려가는 길, 스무 명 남짓 타는 배의 승선이 나머지 절반입니다. 저녁 식사 예약과 공연 사이에 끼워 넣는다면 40분짜리 일정으로 보세요.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도톤보리 리버크루즈 가격(요금)은 얼마인가요?",
    a: `성인 ¥2,000입니다. 다자에몬바시 선착장에서 출항하는 운항사의 배인 톤보리 리버크루즈는 성인 ¥2,000, 중학생 이상 학생 ¥1,000, 초등학생 어린이 ¥500이고, 유료 성인 1명당 미취학 아동 1명이 무료입니다. 오사카시 공식 관광 기관과 오사카 주유패스 운영사의 시설 목록이 같은 세 금액을 싣고 있습니다. 오사카 주유패스와 오사카 e-패스로는 무료이며, 두 경우 모두 접수 데스크에서 패스를 시간이 지정된 티켓으로 교환한 뒤입니다. 도톤보리의 다른 배들은 요금이 따로입니다. 닛폰바시 선착장의 원더 크루즈는 20분 도톤보리 코스가 ¥1,000이고, 클룩에서 파는 배들은 각 상품 페이지에 요금을 싣고 있습니다. 모두 확인일 ${CHECKED}.`,
  },
  {
    q: "도톤보리 리버크루즈 운항 시간은 몇 시부터 몇 시까지인가요?",
    a: `11:00부터 21:00까지 30분마다 출항합니다. 정시와 30분에 출항하므로 하루 21편이고, 2026년에는 7월 13일・24일・25일을 빼고 매일 운항합니다. 선착장 옆 매표소는 첫 출항 1시간 전인 10:00에 엽니다. 계획을 세울 때 중요한 숫자는 21:00 마지막 배입니다. 어느 계절이든 저녁 식사 뒤에 야간 크루즈가 들어갈 만큼 늦고, 그래서 낮이 아니라 저녁 회차가 희소해집니다. 운항 시간 확인일 ${CHECKED}. 강 상황과 선박 정비에 따라 변경될 수 있습니다.`,
  },
  {
    q: "다자에몬바시 선착장은 어디인가요? 도톤보리 리버크루즈 타는 곳",
    a: "도톤보리 수로 북쪽 강변의 톤보리 리버워크 산책로에 있는 다자에몬바시 선착장이고, 에비스바시에서 동쪽으로 1분 정도입니다. 접수 데스크는 선착장 바로 앞 돈키호테 도톤보리점 1층이라, 선착장보다 이 건물을 목표로 삼는 편이 낫습니다. 난바・신사이바시・닛폰바시역에서 걸어서 5~10분입니다. 세 역 모두 글리코 간판이 있는 남쪽에 내려주므로 에비스바시나 다자에몬바시에서 건너야 배에 닿습니다. 운항사가 다른 원더 크루즈는 닛폰바시 선착장에서 타므로, 승선장으로 걸어가기 전에 본인 티켓이 어느 배인지 확인하세요.",
  },
  {
    q: "도톤보리 리버크루즈는 얼마나 걸리나요?",
    a: `물 위에서 약 20분입니다. 미나미 한가운데를 지나는 도톤보리 수로를 따라 갔다 돌아옵니다. 크루즈치고는 짧지만 길이는 적당합니다. 이 배가 지나는 구간은 네온 간판이 늘어선 몇백 미터뿐이고, 더 길어져 봐야 같은 곳을 한 번 더 도는 것뿐입니다. 접수 데스크, 승선장까지 이동하는 시간, 승선까지 더하면 오가는 시간 포함 40분 가까이로 보세요. 소요 시간은 오사카시 공식 관광 사이트와 물의 도시 오사카(Aqua Metropolis Osaka) 크루즈 포털에 실린 값이고 확인일은 ${CHECKED}입니다.`,
  },
  {
    q: "잇폰마쓰 해운의 톤보리 리버크루즈와 도톤보리 리버크루즈는 같은 배인가요?",
    a: `네, 이름이 둘인 같은 배입니다. '톤보리 리버크루즈'(とんぼりリバークルーズ)가 잇폰마쓰 해운이 운항하는 공식 상품명이고, 티켓과 선착장과 오사카 주유패스 무료 시설 목록에 적히는 이름입니다. '도톤보리 리버크루즈'는 여행자 대부분이 검색하는 설명형 표현이고, 이 수로의 어느 배든 느슨하게 가리키는 데도 쓰입니다. 닛폰바시 선착장의 원더 크루즈, 클룩에서 파는 시티 크루즈, 나니와 관광선, TONBORIRAVE DJ 보트는 모두 다른 운항사이고 요금도 다릅니다. 패스 때문에 타는 거라면 그중 톤보리 배만 커버됩니다. 명칭과 운항사 확인일 ${CHECKED}.`,
  },
  {
    q: "도톤보리 리버크루즈 마지막 배는 몇 시인가요?",
    a: `운항하는 날은 모두 21:00입니다. 모든 출항이 같은 요금이므로 마지막 배는 불이 완전히 들어온 도톤보리를 보는 가장 저렴한 방법입니다. 다만 패스 운영사가 먼저 매진된다고 말하는 시간대 안에 있으므로, 그냥 가서 타기보다 미리 확보해 둘 만한 회차입니다. 패스를 쓴다면 낮에 20:30이나 21:00 티켓으로 교환하고, 직접 결제한다면 운항사 온라인 예약이 출항 10분 전까지 열려 있습니다. 마지막 출항 시간은 ${CHECKED}에 오사카시 공식 관광 사이트와 패스 운영사의 시설 목록에서 확인했고 두 곳이 일치합니다.`,
  },
  {
    q: "¥2,000짜리 톤보리 리버크루즈보다 싼 배가 있나요?",
    a: `패스를 쓰지 않는다면 있습니다. 오사카시 공식 관광 기관은 원더 크루즈 도톤보리 코스를 성인 ¥1,000, 어린이 ¥500, 같은 구간을 한 바퀴 도는 20분 운항으로 싣고 있습니다. 같은 길이에 톤보리 요금의 절반입니다. 승선은 닛폰바시 선착장이고 매표 부스는 옆의 WONDER PUB 매장에 있습니다. 더 긴 오사카 크루즈 코스는 닛폰바시와 핫켄야하마 사이 편도 30~40분으로 성인 ¥1,800, 어린이 ¥900입니다. 단점은 코스별 운항 편수가 적어 사전 예약을 권한다는 점, 그리고 오사카의 어떤 패스도 커버하지 않는다는 점입니다. 오사카 주유패스를 들고 있다면 톤보리 배가 무료이므로 비교할 일이 없습니다. 요금 확인일 ${CHECKED}.`,
  },
  {
    q: "오사카 주유패스로 도톤보리 리버크루즈가 무료인가요?",
    a: `무료입니다. 톤보리 리버크루즈는 오사카 주유패스의 무료 입장 시설 중 하나이고, 우메다 스카이빌딩 같은 시간 제한도 없습니다. 오사카 e-패스에서도 무료입니다. 조건은 금액이 아니라 절차입니다. 접수 데스크에서 패스를 출항 시간이 적힌 티켓으로 교환해야 하고, 운항사는 티켓에 적힌 시간에만 승선할 수 있다고 밝히고 있습니다. 패스 운영사도 저녁 크루즈가 빨리 매진되므로 낮에 교환할 것을 권합니다. 1일권이 ${PASS_1_DAY}이므로, ¥2,000 크루즈에 오사카성 천수각 ¥1,200만 더해도 지하철을 한 번도 타기 전에 본전에 거의 닿습니다. 조건 확인일 ${CHECKED}.`,
  },
  {
    q: "도톤보리 리버크루즈는 미리 예약해야 하나요?",
    a: "보통은 아니지만, 저녁은 오후와 다른 문제입니다. 당일 티켓은 선착장 옆 매표소에서 팔고 매표소는 첫 출항 1시간 전에 열기 때문에, 평일 오후라면 그냥 가도 됩니다. 전화 예약은 받지 않습니다. 금요일이나 토요일 밤 출항이라면 운항사 온라인 예약을 쓰세요. 출항 10분 전까지 열려 있고 선결제입니다. 패스를 쓴다면 이른 시간에 저녁 회차로 교환해 두세요. 운항사 자체 안내가 밤 배부터 찬다고 말하고 있습니다.",
  },
  {
    q: "도톤보리 리버크루즈는 밤이 좋나요, 낮이 좋나요?",
    a: "한 번만 탄다면 밤입니다. 돈을 내고 보는 것이 글리코 간판, 네온 건물, 수면의 빛이고 세 가지 모두 어둠이 필요합니다. 낮의 장점은 두 가지인데 둘 다 실무적입니다. 회차를 잡기 쉽고, 하루에 무료 입장 여러 곳을 넣으려는 패스 소지자에게는 13:00 출항이 19:30보다 일정에 맞추기 쉽습니다. 빛이 바뀌는 순간에 맞춰 회차를 고르고 싶다면, 우메다 스카이빌딩 가이드(영어)에 계절별 오사카 일몰 시각이 정리되어 있습니다.",
  },
  {
    q: "비가 와도 운항하나요?",
    a: `보통은 운항하지만 겉옷과 후드를 챙기세요. 이 배는 물의 도시 오사카 크루즈 포털에 지붕 없는 배로 올라 있고(확인일 ${ROOF_CHECKED}), 그래서 도톤보리의 낮은 다리 아래를 지날 수 있습니다. 공개된 운항 중단 사유는 비 자체가 아닙니다. 패스 운영사의 시설 목록은 강 상황이나 선박 정비로 운항이 중단될 수 있다고 적고 있습니다. 소나기보다 폭우와 불어난 강물을 위험으로 보고, 날씨가 애매하다면 같은 몇 블록 안에서 비를 피할 수 있는 대안은 배가 아니라 음식 투어입니다.`,
  },
  {
    q: "도톤보리의 크루즈 중 어느 것을 고를까요?",
    a: "오사카 패스를 들고 있거나 편수가 가장 많은 배를 원한다면 톤보리 리버크루즈입니다. ¥2,000, 20분, 30분 간격이고 패스가 커버하는 유일한 배입니다. 현금으로 결제하면서 같은 20분을 ¥1,000에 타고 싶고, 닛폰바시 선착장에서 타는 것과 운항 편수가 적어 미리 예약하는 것이 괜찮다면 원더 크루즈 도톤보리 코스입니다. 30분의 더 긴 운항을 원하면 나니와 관광선입니다. 라운지 좌석과 직접 가져온 음료를 원하면 도톤보리 시티 크루즈이고, 상품 설명에는 반려동물 동반도 가능하다고 적혀 있어 드문 경우입니다. 관광보다 밤 외출의 시작이라면 TONBORIRAVE 보트입니다. DJ 크루즈에 피카딜리 나이트클럽 무료 입장이 붙습니다. 같은 강, 전혀 다른 저녁입니다.",
  },
  {
    q: "아이와 함께 타도 괜찮나요?",
    a: "괜찮고, 요금 구조가 그렇게 말합니다. 성인 ¥2,000에 초등학생 어린이가 ¥500입니다. 20분은 어린아이의 집중이 유지되는 길이이고, 안내는 엄숙하기보다 활기차며, 전망대나 테마파크 놀이기구처럼 줄을 설 일도 없습니다. 계획에 넣어 둘 것은 지붕이 없는 배라는 점(8월의 햇볕과 1월의 바람), 그리고 시간이 지정된 티켓이므로 도착한 때가 아니라 적힌 시간 전에 와야 한다는 점입니다.",
  },
  {
    q: "크루즈 앞뒤로 도톤보리 주변에서 무엇을 할까요?",
    a: "크루즈는 약 20분으로 짧아 그것만으로 저녁 시간을 채우기는 어렵고, 선착장 양옆의 거리는 일본에서 음식점이 가장 밀집한 곳이니 전후로 도톤보리 관광을 함께 즐기기 좋습니다. 낮이라면 음식 투어입니다. 11:00~14:00로 올라 있는 다른 여행자와 함께하는 도톤보리 그룹 투어는 2~10명이 함께 쿠시카츠, 타코야키, 계절 점심 세트, 디저트를 다룹니다. 저녁이라면 도톤보리 중심가가 아니라 난바와 뒷골목을 도는 바 투어입니다. 둘 다 크루즈가 물 위에서 보여 주는 바로 그 몇백 미터의 거리입니다.",
  },
];

const tourPicks = [
  withKlookLocale(dotonboriDaytimeFoodTour, "ko", {
    title: "오사카 도톤보리 낮 음식 투어",
    desc: "11:00~14:00, 2~10명으로 올라 있는, 다른 여행자와 함께하는 3시간 그룹 워킹 투어로 쿠시카츠, 타코야키, 이자카야의 계절 점심 세트, 현지 디저트가 포함됩니다",
  }),
  withKlookLocale(nambaBarHoppingNightTour, "ko", {
    title: "오사카 난바 바 호핑 나이트 투어",
    desc: "영어 가이드와 함께하는 3시간 30분 그룹 저녁 투어로, 도톤보리 중심가가 아니라 난바와 텐마 주변의 바를 돕니다",
  }),
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
            도톤보리 리버크루즈 2026:<br />가격, 운항 시간, 다자에몬바시 선착장
          </h1>
          <p className={styles.heroSubtitle}>
            성인 ¥2,000, 약 20분, 11:00부터 21:00까지 다자에몬바시 선착장에서 30분마다 출항합니다. 저녁 배가
            차기 전에 교환해 두면 오사카 주유패스로 무료입니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 요금, 확인일 표기", "선택지 6가지 비교"].map((t) => (
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
                <p className={styles.verdictStatLabel}>실제 승선 시간</p>
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
              <strong>도톤보리 리버크루즈</strong>(공식 명칭 <strong>톤보리 리버크루즈</strong>,{" "}
              <strong>잇폰마쓰 해운</strong> 운항)의 가격은 성인 <strong>¥2,000</strong>, 학생{" "}
              <strong>¥1,000</strong>, 어린이 <strong>¥500</strong>이고 승선 시간은{" "}
              <strong>약 20분</strong>입니다. 배는 에비스바시에서 1분 거리인{" "}
              <strong>다자에몬바시 선착장</strong>에서 <strong>11:00부터 21:00까지 30분마다</strong>{" "}
              출항하고, 매표소는 10:00에 엽니다. 패스를 시간 지정 티켓으로 교환하면{" "}
              <strong>오사카 주유패스로 무료</strong>입니다.
            </p>
            <p className={styles.verdictText}>
              나머지 세부 사항: 학생 요금은 중학생 이상, 어린이 요금은 초등학생 대상이며, 유료 성인 1명당
              미취학 아동 1명 무료입니다. 접수는 선착장 바로 앞
              돈키호테 도톤보리점 1층입니다. <strong>오사카 e-패스</strong>도 커버하며 두 패스 모두 오후
              시간 제한이 없습니다. 다만 패스만으로는 승선이 되지 않습니다. 접수 데스크에서 출항 시간이
              인쇄된 티켓으로 교환해야 하고, 패스 운영사는 저녁 크루즈가 먼저 매진된다고 안내합니다. 당일
              티켓은 첫 출항 1시간 전(10:00)부터 선착장에서 팔고, 온라인 예약은 출항 10분 전에 닫히며
              전화 예약은 없습니다. 모두 확인일 {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                클룩에서 오사카 주유패스 보기 →
              </KlookLink>
              <KlookLink href={CITY_CRUISE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                도톤보리 크루즈를 한국어로 예약 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>도톤보리 리버크루즈란?</h2>
          <p className={styles.bodyText}>
            <strong>잇폰마쓰 해운</strong>이 <strong>다자에몬바시 선착장</strong>에서{" "}
            <strong>11:00부터 21:00까지</strong> 30분마다 운항하는 <strong>톤보리 리버크루즈</strong>는
            지붕이 없는 낮은 유람선을 타고 <strong>약 20분</strong> 동안 도톤보리강을 둘러보는 코스로, 요금은{" "}
            <strong>¥2,000</strong>이며 <strong>오사카 주유패스로 무료</strong>로 탈 수 있습니다. &lsquo;도톤보리 리버크루즈&rsquo;는 여행자가
            검색하는 말이고, 티켓과 선착장 안내판과 패스 운영사의 무료 시설 목록에 적힌 이름은{" "}
            <strong>톤보리 리버크루즈</strong>입니다. 현장에서 찾아야 하는 쪽은 후자입니다.
          </p>
          <p className={styles.bodyText}>
            배가 지나는 구간은 글리코 간판과 에비스바시의 인파, 거대한 움직이는 게 간판이 모두 마주보고 있는 몇백
            미터의 수로입니다. 배에는 가이드가 함께 타서 오사카 특유의 활기찬 말투로 주변을 안내합니다.
          </p>
          <p className={styles.bodyText}>
            20분을 쓸 이유는 시야입니다. 길에서 보는 도톤보리는 북새통이고, 에비스바시 위에서 어깨를
            맞댄 채 뒤로 물러설 수도 없는 간판을 찍게 됩니다. 수면에서는 인파보다 낮은 곳에서 건물 정면을
            막힘 없이 볼 수 있고, 다리가 머리 위로 바짝 지나가면서 이 배에 지붕이 없는 이유를 알려 줍니다.
          </p>
          <p className={styles.bodyText}>
            서둘러 예약해야 하는 시간 지정 티켓도, 티켓 오픈 날짜도, 평일 오후에 매진될 위험도 없습니다. 대신 있는
            것은 <strong>패스 소지자의 교환 규칙</strong>과, 낮보다 먼저 차는 저녁입니다. 대부분의 계획은
            이 두 가지에서 결정됩니다. 이 페이지의 나머지는 요금, 운항 시간, 선착장, 그리고 같은 구간을
            오가는 다른 배 네 종류입니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금</span>
          <h2 className={styles.sectionTitle}>도톤보리 리버크루즈 요금은 얼마인가</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>성인 ¥2,000, 학생 ¥1,000, 어린이 ¥500.</strong> 연령대마다 한 가지 요금이고 모든
            출항이 같습니다. 야간 출항에 할증이 없다는 점이 드물고, 이 배가 가성비 좋은 숨은 이유입니다.
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
            <strong>Last checked: {CHECKED_ISO}</strong> — 출처:{" "}
            <a href={OSAKA_INFO_URL} target="_blank" rel="noopener">
              오사카 관광국 공식 사이트, 톤보리 리버크루즈
            </a>
            . 요금은 {CHECKED}에 오사카시 공식 관광 사이트와 오사카 주유패스 운영사의 무료 입장 시설 목록에서
            확인했고, 두 곳이 같은 세 금액을 싣고 있습니다. 운항사 자체 사이트는 확인일에 정비로 접속되지
            않았으므로, 이 페이지의 모든 숫자는 그 두 곳이 출처입니다. 변경될 수 있으니 결제 전에 확인하세요.
            일본 각지의 다른 입장료를 확인일과 함께 정리한 표는{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={LINK_STYLE}>
              일본 명소 티켓 가격 표(영어)
            </Link>
            에 있습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>시간과 선착장</span>
          <h2 className={styles.sectionTitle}>도톤보리 리버크루즈는 몇 시에 운항하나</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>11:00부터 21:00까지 30분마다</strong> — 정시와 30분에 출항하고, 2026년에는 7월 13일・
            24일・25일을 빼고 매일 운항합니다. 선착장 옆 매표소는 첫 출항 1시간 전인{" "}
            <strong>10:00</strong>에 엽니다.
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {CHECKED_ISO}</strong> — 출처:{" "}
            <a href={OSAKA_INFO_URL} target="_blank" rel="noopener">
              osaka-info.jp, 톤보리 리버크루즈
            </a>{" "}
            (&ldquo;11:00-21:00 Departs every hour on the hour and half hour&rdquo;). 7월 휴항일은{" "}
            <a href="https://osaka-amazing-pass.com/en/service_free.html" target="_blank" rel="noopener">
              오사카 주유패스 무료 시설 목록
            </a>
            에서 확인했습니다.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            쓸모 있는 숫자는 하루 21편입니다. 저녁을 이 배에 맞춰 짜는 게 아니라 저녁 일정 사이에 끼워
            넣으면 된다는 뜻이고, <strong>21:00 마지막 배</strong>는 어느 계절이든 식사 뒤에도 탈 수 있을
            만큼 늦습니다. 운항 시간 확인일 {CHECKED}.
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            톤보리 리버크루즈는 얼마나 걸리나
          </h3>
          <p className={styles.bodyText}>
            <strong>물 위에서 약 20분입니다.</strong> 오사카시 공식 관광 사이트는 20분, 물의 도시 오사카 크루즈
            포털은 &ldquo;약 20분&rdquo;이라고 싣고 있고, 둘 다 확인일은 {CHECKED}입니다. 대신{" "}
            <strong>오가는 시간까지 약 40분</strong>으로 계획하세요. 접수 데스크, 승선장까지 내려가는 길,
            스무 명 남짓 타는 배의 승선이 나머지 절반입니다. 20분은 이 코스에 맞는 길이입니다. 구간이 네온
            간판이 늘어선 몇백 미터뿐이라, 더 길어져 봐야 같은 곳을 한 번 더 돌 뿐입니다.
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            도톤보리 리버크루즈는 어디서 타나
          </h3>
          <p className={styles.bodyText}>
            도톤보리 수로 <strong>북쪽 강변</strong>의 톤보리 리버워크 산책로에 있는{" "}
            <strong>다자에몬바시 선착장</strong>이고, 에비스바시에서 동쪽으로 1분 정도입니다. 선착장보다
            랜드마크를 목표로 삼으세요. 접수는 승선장 바로 앞 <strong>돈키호테 도톤보리점 1층</strong>,
            건물 측면에 관람차가 붙은 그 건물입니다. <strong>난바</strong>・<strong>신사이바시</strong>・
            <strong>닛폰바시</strong>역에서 걸어서 5~10분이지만, 세 역 모두 글리코 간판이 있는 남쪽 강변에
            내려주므로 에비스바시나 다자에몬바시에서 건너야 배에 닿습니다. 미도스지선이 난바와 우메다,
            덴노지를 어떻게 잇는지는{" "}
            <Link href="/guides/transport/osaka-transportation">오사카 시내 교통 가이드(영어)</Link>에
            있습니다. 위치와 도보 시간 확인일 {CHECKED}.
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            당일 구매와 사전 예약 — 그리고 배가 매진되는 시간대
          </h3>
          <p className={styles.bodyText}>
            두 방법은 같지 않고, 그 차이는 해가 진 뒤에만 의미가 있습니다. <strong>당일</strong>: 선착장
            옆 매표소가 10:00부터 자리가 남은 다음 회차를 팔지만, 한계에 대한 패스 운영사의 표현은
            단호합니다. &ldquo;좌석이 모두 차면 승선할 수 없습니다.&rdquo; <strong>사전</strong>: 운항사의
            웹 예약은 선결제이고 <strong>출항 10분 전</strong>까지 열려 있어, 금요일이나 토요일 저녁에 이용하기
            좋습니다. 전화 예약은 아예 받지 않습니다.
          </p>
          <p className={styles.bodyText}>
            어느 회차가 먼저 차는지에 대해 공개된 안내는 패스 운영사의 것뿐이고, 내용은 구체적입니다.{" "}
            <strong>저녁 크루즈가 빨리 매진되므로</strong> <strong>낮에</strong> 교환하라는 것입니다. 그대로
            읽으면 해가 진 뒤의 회차 — 19:00부터 21:00까지의 출항, 주말이라면 더더욱 — 가 희소하고, 평일
            오후는 그냥 가서 타는 시간대입니다. 그 이상의 공개된 탑승률 수치는 없으니, 더 정밀한 이야기는
            숫자가 아니라 추측으로 받아들이세요. 안내 확인일 {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              오사카 주유패스 — 크루즈 포함 →
            </KlookLink>
            <KlookLink href={CITY_CRUISE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도톤보리 크루즈 회차 미리 잡기 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>언제 타는가</span>
          <h2 className={styles.sectionTitle}>도톤보리 리버크루즈는 밤이 좋을까, 낮이 좋을까</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            <strong>한 번만 탄다면 밤</strong>입니다. 네온이 곧 상품이고 요금은 모든 출항이 같으므로 야경은
            덤입니다. 다만 패스가 답을 바꿉니다. 실제로 잡을 수 있는 회차가 원하는 회차와 늘 같지는 않기
            때문입니다.
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
            빛이 실제로 바뀌는 순간을 잡고 싶다면 날짜에 맞춰 회차를 고르세요.{" "}
            <Link href="/guides/attractions/umeda-sky-building-tickets">우메다 스카이빌딩 가이드(영어)</Link>에
            계절별로 공개된 오사카 일몰 시각이 있고, 1년 동안 약 2시간 30분 폭으로 움직입니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={RAVE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              밤 외출용 DJ 크루즈 →
            </KlookLink>
            <KlookLink href={NANIWA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              30분 관광선 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>도톤보리 크루즈, 어느 것을 고를까</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            이 구간에는 여러 운항사가 있고 서로 대체할 수 있는 관계가 아닙니다. 중요한 비대칭이 두 가지
            있습니다. 첫째, <strong>패스 시설은 톤보리 배뿐</strong>이고 클룩은 그 배를 단독 상품으로 팔지
            않습니다. 오사카 패스를 쓴다면 원하는 배는 휴대폰이 아니라 접수 데스크에서 잡아야 합니다. 둘째, 공식
            요금이 공개된 유일한 경쟁 상대인 닛폰바시 선착장의 <strong>원더 크루즈</strong>는{" "}
            <strong>20분 도톤보리 코스를 ¥1,000, 즉 톤보리 요금의 절반에 운항합니다</strong>. 현금으로
            결제하고 패스가 없다면 이쪽이 답입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["배", "운항 시간", "요금", "오사카 패스 포함?", "판매처"].map((h) => (
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
            같은 관광 기관의 WONDER CRUISE・PIRATES 안내에서 가져왔습니다. 마지막 세 줄은 각 클룩 상품
            페이지가 스스로 적고 있는 내용입니다. 모두 확인일 {CHECKED}. 클룩 가격은 날짜에 따라
            달라지므로 여기에 클룩 요금은 적지 않습니다. 현재 금액과 취소 기한은 상품 페이지에서 확인하세요.
            취소 기한은 운항사가 아니라 상품별로 정해집니다. 변경될 수 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={CITY_CRUISE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              라운지 좌석 시티 크루즈 →
            </KlookLink>
            <KlookLink href={WONDER_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              오사카 원더 크루즈 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>단계별 안내</span>
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 오사카 주유패스 보기 →
            </KlookLink>
            <KlookLink href={DAY_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              오사카성・우메다 전망대・크루즈를 하루에 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>패스 문제</span>
          <h2 className={styles.sectionTitle}>오사카 주유패스로 도톤보리 리버크루즈가 무료인가</h2>
          <p className={styles.bodyText}>
            <strong>네, 하루 종일 무료입니다.</strong> 톤보리 리버크루즈는 오사카 주유패스의 40곳이 넘는
            무료 입장 시설 중 하나이고 <strong>오후 시간 제한이 없습니다</strong>. 같은 패스의 우메다
            스카이빌딩은 15:00부터 무료가 아니게 되므로, 이 점은 분명히 말해 둘 만합니다. 오사카 e-패스에서도
            무료 시설입니다.
          </p>
          <p className={styles.bodyText}>
            걸림돌은 시계가 아니라 줄입니다. 패스만으로는 승선이 되지 않습니다. 접수 데스크에서 출항 시간이
            인쇄된 티켓으로 교환해야 하고, 운항사는 <strong>티켓에 적힌 시간에만 승선할 수 있다</strong>고
            밝히고 있습니다. 공개된 안내도 저녁 크루즈가 빨리 매진되므로 낮에 교환하라고 말합니다. 실제로는
            점심 먹으러 가는 길에 돈키호테를 지나며 19:30 회차를 받아 두라는 뜻입니다. 19:20에 가서 다음
            무료 배가 21:00이라는 걸 알게 되는 것보다 낫습니다.
          </p>
          <p className={styles.bodyText}>
            세 번째 시설이 있어야 남습니다. 1일권은 {PASS_1_DAY}(공식 가격, 2026년 11월 9일 확인)이고, 크루즈(¥2,000)에
            오사카성 천수각(¥1,200)을 더한 입장료 ¥3,200은 패스 가격에 조금 못 미칩니다. 15:00 전의 우메다 전망대를
            더하면 ¥5,200이 됩니다.
            포함 시설 전체 목록, 2일권 가격, 제외 항목은{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">오사카 주유패스 가이드(영어)</Link>에,
            오사카에서의 하루 중 패스가 내 주는 부분과 그렇지 않은 부분은{" "}
            <Link href="/guides/attractions/things-to-do-osaka">오사카 여행 가이드(영어)</Link>에 정리되어
            있습니다. 조건 확인일 {CHECKED}. 유니버설 스튜디오 재팬은 주유패스에 포함되지 않아 입장권을 따로
            사야 하며, 날짜 지정 티켓과 익스프레스 패스 선택은{" "}
            <Link href="/ko/guides/attractions/usj-tickets-express-pass">유니버설 스튜디오 재팬 익스프레스 패스 가이드</Link>에
            있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              오사카 주유패스 →
            </KlookLink>
            <KlookLink href={FOOD_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도톤보리 음식 투어, 11:00–14:00 →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="배를 타기 전과 후의 시간"
          intro="물 위의 20분이 끝나도 저녁은 많이 남고, 선착장 주변 거리는 일본에서 음식점이 가장 빽빽한 곳입니다. 첫 번째는 낮의 워킹 투어, 두 번째는 해가 진 뒤의 투어입니다. 클룩 가격은 날짜에 따라 달라지니 현재 요금과 집합 장소는 상품 페이지에서 확인하세요."
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/osaka-food-tour", title: "오사카 음식 투어(2026): 어떤 투어를 예약할까, 시간과 메뉴(영어)" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "오사카 2일 일정(2026): 날짜별 동선과 예약할 것(영어)" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "오사카 주유패스(2026): 1일 ¥3,500, 본전을 뽑을까(영어)" },
            { href: "/guides/attractions/things-to-do-osaka", title: "오사카에서 할 일(2026): 패스가 이득인 곳과 아닌 곳(영어)" },
            { href: "/guides/attractions/umeda-sky-building-tickets", title: "우메다 스카이빌딩 티켓(2026): 요금, 운영 시간, 추천 시간대(영어)" },
            { href: "/guides/attractions/osaka-castle-tickets", title: "오사카성 티켓(2026): 요금, 운영 시간, 패스 적용 범위(영어)" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "가이유칸 티켓(2026): 요금, 운영 시간, 입장 시간대(영어)" },
            { href: "/ko/guides/attractions/usj-tickets-express-pass", title: "유니버설 스튜디오 재팬 익스프레스 패스(2026): 티켓은 어떤 것을 살까" },
            { href: "/guides/attractions/tokyo-bay-cruise", title: "도쿄만 크루즈(2026): 야카타부네 vs 심포니, 시간과 요금(영어)" },
            { href: "/guides/transport/osaka-transportation", title: "오사카 시내 교통(2026): 지하철, 전철, IC 카드 정리(영어)" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "일본 명소 티켓 가격 2026: 공식 요금과 예약 규칙(영어)" },
            { href: "/guides/attractions", title: "일본에서 할 일 더 보기(영어) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>티켓이 아니라 회차를 먼저 잡으세요</h2>
            <p className={styles.ctaBannerDesc}>
              ¥2,000이라는 요금은 작은 부분입니다. 희소한 것은 저녁 출항이고, 이 배를 무료로 만들어 주는
              패스도 밤 배가 차기 전에 데스크에서 교환해야 합니다. 결제 전에 본인 예약에 표시된 취소 기한을
              확인하세요. 운항사가 아니라 상품별로 정해집니다.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                클룩에서 오사카 주유패스 보기 →
              </KlookLink>
              <KlookLink href={CITY_CRUISE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                도톤보리 크루즈 예약 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
