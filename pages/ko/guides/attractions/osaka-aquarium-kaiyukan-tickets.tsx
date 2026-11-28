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
import NextBookingBlock from "../../../../components/NextBookingBlock";
import {
  jrHarukaUrl,
  kaiyukanLegolandCombo,
  kaiyukanNifrelCombo,
  kaiyukanSameDayCards,
  kaiyukanSameDayPrep,
  osakaAmazingPassKaiyukanCombo,
  osakaAquariumKaiyukanTicket,
  osakaMetroDayPass,
  osakaPrivateWalkingTour,
  osakaSightsHighRatePrep,
  osakaSkyVistaHalfDayBusTour,
  santaMariaDayCruise,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/osaka-aquarium-kaiyukan-tickets) section by
// section as of 2026-11-28 (task-jtk-20261128-TR01): same sections, tables, FAQ and Klook CTAs in
// the same places. Every figure, date and source is the English page's (kaiyukan.com,
// suijo-bus.osaka and osaka-amazing-pass.com); nothing is added. Title term: 가이유칸 입장권 — the
// name livejapan.com/ko, trvlogue and enjoy-osaka-kyoto-kobe.com/ko use for the aquarium, with
// 입장권 as on the other Korean ticket pages. The pass is 오사카 주유패스, as on the other Korean
// Osaka pages.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/osaka-aquarium-kaiyukan-tickets";
const TITLE = "오사카 가이유칸 입장권 2026: 요금, 예매, 추천 시간";
const H1 = "오사카 가이유칸 입장권 2026: 요금과 방문하기 좋은 시간";
const DESC =
  "가이유칸 입장권 성인 ¥2,700~3,200(날짜별), 초·중학생 ¥1,400~1,650. 30일 전부터 시간 지정 예매, 재입장 불가.";

const CHECKED_ISO = "2026-11-19";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
/** The 15-minute entry unit and the 10:00 / 20:00 hours pattern: last read on this date. */
const SET_CHECKED = dateLabel("2026-10-22", LOCALE);
const BANDS_CHECKED_ISO = "2026-11-23";

const OFFICIAL = {
  bands: "https://www.kaiyukan.com/info/group/",
  ticket: "https://www.kaiyukan.com/info/ticket/",
  calendar: "https://www.kaiyukan.com/info/ticket/kaiyukan/",
  night: "https://www.kaiyukan.com/program/night/",
  harbor: "https://www.kaiyukan.com/thv/general/",
  captainLine: "https://www.kaiyukan.com/thv/captline/",
  santaMaria: "https://suijo-bus.osaka/intro/santamaria/",
  amazingPass: "https://osaka-amazing-pass.com/en/service_free.html",
};

const TICKET_URL = klookFor(osakaAquariumKaiyukanTicket.url, LOCALE);
const PASS_COMBO_URL = klookFor(osakaAmazingPassKaiyukanCombo.url, LOCALE);
const LEGO_COMBO_URL = klookFor(kaiyukanLegolandCombo.url, LOCALE);
const NIFREL_COMBO_URL = klookFor(kaiyukanNifrelCombo.url, LOCALE);
const SANTA_MARIA_URL = klookFor(santaMariaDayCruise.url, LOCALE);
const HARUKA_URL = klookFor(jrHarukaUrl, LOCALE);
const METRO_PASS_URL = klookFor(osakaMetroDayPass.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  {
    ticket: "추천: 입장 전자 티켓(날짜·시간 지정)",
    who: "성인 — 고등학생 또는 16세 이상",
    price: "¥2,700~¥3,200",
    what: "날짜마다 요금이 정해지며, 전자 티켓은 약 30일 전부터 판매합니다. 운영사 예약 안내에 따르면 ¥3,200인 날은 15:00 이후 입장분만 예약할 수 있고, ¥3,500인 날은 예약을 받지 않습니다",
  },
  {
    ticket: "입장권",
    who: "초·중학생(어린이)",
    price: "¥1,400~¥1,650",
    what: "요금 범위 전체에서 성인 요금의 약 절반입니다",
  },
  {
    ticket: "입장권",
    who: "유아 — 3세 이상",
    price: "¥700~¥800",
    what: "성인 요금의 4분의 1입니다",
  },
  {
    ticket: "입장권",
    who: "2세 이하",
    price: "무료",
    what: "입장권이 필요 없습니다",
  },
  {
    ticket: "입장권, 장애인 할인",
    who: "장애인 수첩 소지자와 보호자 1명",
    price: "위 요금의 절반",
    what: "수첩, 미라이로 ID 앱, 마이넘버 포털 모두 증빙으로 인정되며, 스크린숏은 인정되지 않습니다",
  },
  {
    ticket: "가이유칸 + 산타마리아호 낮 크루즈 세트",
    who: "성인 / 중학생 / 초등학생",
    price: "¥4,200 / ¥2,900 / ¥2,150부터",
    what: "가장 낮은 입장료 기준으로 따로 사면 ¥4,700 / ¥3,400 / ¥2,400입니다. 크루즈 운영사는 성수기에 세트 요금이 바뀔 수 있다고 안내합니다",
  },
];

const timingRows = [
  {
    when: "가장 좋은 선택",
    official: "입장료는 수요에 맞춰 날짜마다 정하는 변동 요금입니다",
    means: "요금 달력에서 낮은 요금인 날, 가능하면 방학이 아닌 평일을 고르고 입장 시간은 오후 중반 이후로 정하세요",
  },
  {
    when: "가장 붐비는(요금이 가장 높은) 날",
    official: "성인 ¥3,200인 날은 15:00 이후 입장분만 예약할 수 있고, ¥3,500인 날은 예약을 받지 않습니다",
    means: "달력의 요금이 높으면 붐빈다는 뜻입니다. 이런 날에는 오후에 방문하는 일정을 짜세요",
  },
  {
    when: "입장권 없이 방문",
    official: "매표소는 개관부터 입장 마감까지 당일 입장권만 판매하며, 원하는 시간에 입장하지 못하거나 기다려야 할 수 있습니다",
    means: "약 30일 전부터 판매하는 날짜·시간 지정 전자 티켓을 사세요",
  },
  {
    when: "17:00부터",
    official: "야간 프로그램은 17:00~20:00, 입장 마감 19:00이며 시간은 계절에 따라 바뀝니다",
    means: "같은 입장권으로 조명과 음악이 바뀐 수족관을 볼 수 있고, 대부분의 방문객이 고르지 않는 늦은 시간대입니다",
  },
  {
    when: "한 바퀴 관람",
    official: "일방통행 관람 경로를 한 바퀴 도는 데 90~120분이 걸리며, 재입장은 2026년 6월 15일에 종료되었습니다",
    means: "수족관 안에서 2시간을 잡고, 식사는 관람 중간이 아니라 입장 전이나 관람 후에 하세요",
  },
];

const nearbyRows = [
  {
    what: "가장 쉬운 조합: 산타마리아호 낮 크루즈",
    time: "약 45분, 낮 운항은 11:00~16:00 매시 정각 출항",
    price: "성인 ¥2,000, 초등학생 ¥1,000(성인 1명당 미취학 아동 1명 무료)",
    pass: "적용",
    note: "수족관 옆 가이유칸 니시하토바에서 탑니다. 12월 31일과 1월 12일~2월 5일 운항 중단, 날씨와 바다 상황에 따라 운항합니다",
  },
  {
    what: "덴포잔 대관람차(112.5m)",
    time: "바로 옆, 평일 10:00~21:00, 주말과 공휴일 10:00~22:00",
    price: "¥1,000(패스 목록에 적힌 일반 요금)",
    pass: "적용",
    note: "운영사가 달라서 가이유칸 + 대관람차 세트 입장권은 없습니다. 크루즈 운영사는 대관람차 + 산타마리아호 세트를 판매합니다",
  },
  {
    what: "유니버설 스튜디오 재팬으로 가는 캡틴 라인",
    time: "배로 약 10분, 9:30~20:00, 운항 시간표는 달마다 바뀝니다",
    price: "왕복 ¥1,700(패스 목록에 적힌 일반 요금)",
    pass: "적용",
    note: "유니버설 시티 포트는 JR 유메사키선 유니버설시티역에서 도보 약 5분입니다. 가이유칸은 캡틴 라인 세트 입장권을 판매합니다",
  },
  {
    what: "레고랜드 디스커버리 센터 오사카",
    time: "같은 시설 안, 평일 10:00~18:00(입장 마감 16:00), 주말 10:00~19:00(입장 마감 17:00)",
    price: "운영사 사이트 참고",
    pass: "지정된 날만, 사전 예약 필요",
    note: "성인끼리만, 또는 어린이끼리만은 입장할 수 없습니다. 가이유칸은 레고랜드 세트 입장권을 판매합니다",
  },
];

const factRows = [
  {
    item: "입장권 방식",
    value: "날짜·시간 지정 입장, 날짜별 변동 요금이며 전자 티켓은 원칙적으로 30일 전부터 판매",
    source: "kaiyukan.com/info/ticket/",
  },
  {
    item: "매표소",
    value: "개관부터 입장 마감까지 당일 입장권만 판매하며, 원하는 입장 시간이 매진되었을 수 있음",
    source: "kaiyukan.com/info/ticket/",
  },
  {
    item: "가장 붐비는 날의 규칙",
    value: "성인 ¥3,200인 날은 15:00 이후 입장분만 예약 가능, ¥3,500인 날은 예약 불가",
    source: "kaiyukan.com/info/group/",
  },
  {
    item: "야간 프로그램",
    value: "17:00~20:00, 입장 마감 19:00, 시간은 계절에 따라 바뀜",
    source: "kaiyukan.com/program/night/",
  },
  {
    item: "재입장",
    value: "2026년 6월 15일부터 종료, 입장권 1장으로 1회 입장",
    source: "kaiyukan.com/about/news/20564.html",
  },
  {
    item: "3세 미만",
    value: "2세 이하 무료",
    source: "kaiyukan.com/info/ticket/kaiyukan/",
  },
  {
    item: "아기",
    value: "기저귀 교환대와 분유용 온수기가 있는 베이비 케어 룸, 수유실",
    source: "kaiyukan.com/info/area/",
  },
  {
    item: "코인 로커와 휠체어",
    value: "입구 근처, 가이유칸 홀, 뮤지엄 숍 옆에 코인 로커가 있고, 휠체어는 안내 데스크에서 빌려줌",
    source: "kaiyukan.com/info/area/",
  },
  {
    item: "가는 방법",
    value: "오사카코역(주오선) 1번 출구에서 도보 약 5분, 주차 약 1,000대",
    source: "kaiyukan.com/info/access/",
  },
];

const whoFor = [
  {
    title: "날짜·시간 지정 전자 티켓을 사야 하는 경우",
    desc: `주말이나 연휴 기간에 간다면, 그리고 일정을 미리 정할 수 있다면 언제든 전자 티켓을 사세요. 운영사의 전자 티켓은 날짜와 입장 시간이 정해지며 방문일 약 30일 전부터 판매합니다. 운영사는 매표소에서 당일 입장권을 사면 원하는 시간에 입장하지 못할 수 있다고 안내합니다. ${CHECKED} 확인.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
        <circle cx="12" cy="15" r="2.5" />
      </svg>
    ),
  },
  {
    title: "늦은 시간에 가야 하는 경우",
    desc: `덜 붐비고 더 저렴하게 보고 싶다면 늦게 가세요. 17:00부터 야간 프로그램으로 조명과 음악이 바뀌고, 20:00에 문을 닫는 날은 입장 마감이 19:00입니다. 성인 요금이 가장 높은 ¥3,200인 날은 15:00 이후 입장분만 예약할 수 있으므로, 가장 붐비는 날에는 어차피 오후 시간대에 방문하게 됩니다. ${CHECKED} 확인.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "세트 입장권을 사야 하는 경우",
    desc: "수조만이 아니라 덴포잔 해안가 전체를 하루 일정으로 잡는다면 세트 입장권을 고르세요. 수족관의 공식 세트 입장권에는 산타마리아호 항만 크루즈, 유니버설 시티로 가는 캡틴 라인, 바로 옆 레고랜드가 있습니다. 이 목록에 없는 것도 확인하세요. 덴포잔 대관람차는 운영사가 달라서 수족관과 대관람차를 묶은 공식 입장권은 없습니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15h18l-2 5H5z" />
        <path d="M12 3v9M12 3l6 3-6 3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "가장 먼저 요금 달력에서 방문 날짜를 확인하세요",
    desc: `가이유칸은 변동 요금제(価格変動制)를 운영하므로 입장료는 수요에 맞춰 날짜마다 정해집니다. 하나로 정해진 요금은 없습니다. 성인 요금 범위는 ¥2,700~¥3,200이고, 운영사는 15:00 이후 입장분만 예약을 받는 ¥3,200 요금과 예약을 전혀 받지 않는 ¥3,500 요금도 안내합니다. 어느 요금이 적용되는지는 방문 날짜에 따라 달라집니다. ${CHECKED} 확인.`,
  },
  {
    title: "날짜만이 아니라 입장 시간도 고르세요",
    desc: `공식 전자 티켓은 날짜와 시간을 지정하는 입장권이고(${CHECKED} 확인), 입장 시간은 15분 단위로 정해집니다(${SET_CHECKED} 확인). 혼잡을 피하려면 입장 시간을 잘 골라야 합니다. 운영사는 입장 시간대별 방문객 수를 일정하게 유지하며, 가장 붐비는 날에는 15:00 이후 입장분만 예약을 받습니다.`,
  },
  {
    title: "약 30일 전부터 예매하세요",
    desc: `운영사는 전자 티켓을 원칙적으로 방문일 30일 전부터 판매하고, 매표소에서는 개관부터 입장 마감까지 당일 입장권만 판매한다고 안내합니다. 도쿄의 입장 시간 지정 전망대처럼 2주 전 자정에 예매 경쟁을 할 필요는 없지만, 예매 기간이 무제한인 것도 아닙니다. ${CHECKED} 확인.`,
  },
  {
    title: "한국어로 결제하거나 해외 발급 카드를 쓰려면 판매 대행 사이트를 이용하세요",
    desc: "공식 전자 티켓 시스템은 일본어 중심입니다. 클룩에서는 같은 입장권을 한국어 화면에서 해외 발급 카드로 결제하고 입장 시 스캔할 코드를 받을 수 있으며, 세트 입장권과 오사카 주유패스 묶음 상품도 한곳에서 살 수 있습니다. 취소 기한과 날짜 지정 여부는 상품마다 다르므로 결제 전에 확인하세요.",
  },
  {
    title: "재입장이 종료되었으니 안에서 관람을 마치는 일정으로 짜세요",
    desc: `다른 여행 가이드 상당수가 아직 반영하지 않은 규칙입니다. 가이유칸은 입장 시간대별 방문객 수를 일정하게 유지하기 위해 2026년 6월 15일에 재입장을 종료했다고 밝혔습니다. 덴포잔 마켓플레이스에서 점심을 먹고 다시 들어가 한 바퀴 더 보는 일정은 이제 불가능하며, 입장은 1회뿐입니다. ${CHECKED} 확인.`,
  },
];

/** The five questions in the FAQPage markup, as on the English page. */
const faqItems: FaqItem[] = [
  {
    q: "가이유칸 입장권은 얼마인가요?",
    a: `가이유칸 입장권은 성인(고등학생 또는 16세 이상) ¥2,700~¥3,200, 초·중학생 ¥1,400~¥1,650, 3세 이상 유아 ¥700~¥800이고 2세 이하는 무료입니다. 변동 요금제를 운영하므로 정확한 요금은 요금 달력에서 날짜마다 정해지며, 붐비는 날일수록 범위의 위쪽 요금이 됩니다. 장애인 수첩 소지자와 보호자 1명은 절반 요금입니다. 가이유칸 + 산타마리아호 크루즈 세트는 성인 ¥4,200부터입니다. kaiyukan.com과 suijo-bus.osaka에서 ${CHECKED}에 확인했습니다.`,
  },
  {
    q: "가이유칸 입장권은 미리 예매해야 하나요?",
    a: `필수는 아니지만 미리 예매하는 것이 좋습니다. 날짜와 시간을 지정해 입장하며, 매표소는 당일 입장권만 판매하고 원하는 시간에 입장하지 못하거나 기다려야 할 수 있다고 안내합니다. 공식 전자 티켓은 입장 시간이 확정되고 방문일 약 30일 전부터 판매합니다. 요금이 가장 높은 날에는 예약 규칙이 더 엄격해서, 성인 ¥3,200인 날은 15:00 이후 입장분만 예약할 수 있고 ¥3,500인 날은 예약을 받지 않습니다. ${CHECKED} 확인.`,
  },
  {
    q: "가이유칸 관람에는 시간이 얼마나 걸리나요?",
    a: `수족관은 일방통행 관람 경로를 한 바퀴 도는 데 90~120분이 걸린다고 안내합니다. 꼭대기 층으로 올라간 뒤 수조를 따라 나선형으로 내려오며, 고래상어가 있는 태평양 수조도 이 경로에 있으므로 한 번만 걸으면 됩니다. 2026년 6월 15일에 재입장이 종료되었으므로 관람을 한 번에 끝내는 일정으로 잡고, 산타마리아호 크루즈(약 45분)나 바로 옆 대관람차에 쓸 시간을 더하세요. ${CHECKED} 확인.`,
  },
  {
    q: "가이유칸은 언제 가는 것이 가장 좋나요?",
    a: `요금 달력에서 낮은 요금인 평일에, 오후 중반 이후 입장하는 것이 가장 좋습니다. 운영사는 혼잡 예보를 공개하지 않지만, 요금은 수요에 맞춰 정해지고, 요금이 가장 높은(¥3,200) 날은 15:00 이후 입장분만 예약을 받으며, 야간 프로그램은 17:00~20:00, 입장 마감 19:00입니다(시간은 계절에 따라 바뀝니다). ${CHECKED} 확인.`,
  },
  {
    q: "오사카 주유패스로 가이유칸에 입장할 수 있나요?",
    a: `아니요. ${CHECKED}에 확인한 오사카 주유패스 이용 시설 목록에 가이유칸은 없습니다. 패스(1일권 ¥3,500)는 바로 옆의 덴포잔 대관람차, 산타마리아호 낮 크루즈, 유니버설 시티 포트로 가는 캡틴 라인에 적용되므로, 이 시설들을 이용하는 덴포잔 일정이라면 여전히 이득일 수 있습니다. 클룩에서는 주유패스와 가이유칸 입장권을 한 번에 결제하는 묶음 상품도 판매합니다.`,
  },
];

/** Further questions shown on the page but kept out of the FAQPage markup. */
const moreFaqItems: FaqItem[] = [
  {
    q: "가이유칸 입장료는 왜 날짜마다 다른가요?",
    a: `수족관이 그렇게 정했기 때문입니다. 가이유칸은 수요에 맞는 ‘적정한 가격’을 정해 더 많은 방문객을 받기 위해 변동 요금제(価格変動制)를 도입했다고 밝혔습니다. 실제로는 2월의 한산한 화요일과 골든위크 토요일의 요금이 다르며, 다른 사이트에 적힌 하나의 요금이 두 날짜에 모두 맞을 수는 없습니다. 요금 자체가 혼잡도를 알려 주기도 합니다. 방문 날짜의 요금이 범위의 위쪽이라면 붐빌 것입니다. 도입 이유와 변동 요금 안내는 ${CHECKED}에 확인했습니다.`,
  },
  {
    q: "가이유칸 운영 시간은 어떻게 되나요?",
    a: `날짜마다 다릅니다. 운영사는 고정된 운영 시간표 대신 달력으로 운영 시간을 공개하고 방문 날짜를 직접 확인하라고 안내하므로, 이 안내를 그대로 따르세요. 일반적으로 10:00에 문을 열고 20:00에 닫으며 입장 마감은 폐관 1시간 전이고, 휴관일은 1월과 2월에 며칠 있습니다(${SET_CHECKED} 확인). 야간 프로그램 페이지에는 17:00~20:00, 입장 마감 19:00이며 시간은 계절에 따라 바뀐다고 적혀 있습니다(${CHECKED} 확인). 하루 일정을 짜기 전에 달력에서 방문 날짜를 확인하세요.`,
  },
  {
    q: "가이유칸에 코인 로커가 있나요?",
    a: `네, 세 곳에 있습니다. 수족관 입구 근처, 가이유칸 홀, 뮤지엄 숍 근처입니다. 가이유칸 홀과 뮤지엄 숍 옆의 코인 로커는 입장권 없이도 이용할 수 있고, 덴포잔 마켓플레이스와 대관람차 아래에도 코인 로커가 있습니다. 휠체어는 안내 데스크에서 빌려줍니다. kaiyukan.com/info/area/에서 ${CHECKED}에 확인했습니다.`,
  },
  {
    q: "연말연시에는 가이유칸 입장료가 더 비싼가요?",
    a: `방문 날짜의 요금을 달력에서 확인하세요. ${CHECKED}에 확인한 공식 페이지에는 11월부터 연말연시까지의 요금이 글로 적혀 있지 않고, 날짜별 요금은 요금 달력에만 표시됩니다. 운영사가 공개하는 것은 요금이 높은 날의 규칙입니다. 성인 ¥3,200인 날은 15:00 이후 입장분만 예약할 수 있고, 성인 ¥3,500인 날은 예약을 받지 않습니다. 방문 날짜가 연휴 기간이라면 약 30일 전 전자 티켓 예매가 시작되는 대로 확인하세요.`,
  },
  {
    q: "가이유칸까지 어떻게 가나요?",
    a: `주로 이용하는 경로는 오사카 메트로 주오선 오사카코역입니다. 공식 역명은 大阪港駅（海遊館前）로 ‘가이유칸 앞 오사카코역’이라는 뜻이며, 1번 출구에서 걸어서 약 5분입니다. 유니버설 스튜디오 쪽에서는 캡틴 라인 셔틀 배가 입구 바로 앞의 가이유칸 니시하토바에 도착합니다. 오사카 시내버스는 덴포잔 하버 빌리지 정류장, 난카이 버스는 가이유칸(덴포잔) 정류장에 서고, 주차 공간은 약 1,000대입니다. 모두 kaiyukan.com/info/access/에서 ${CHECKED}에 확인했습니다.`,
  },
  {
    q: "점심을 먹으러 나갔다가 가이유칸에 다시 들어갈 수 있나요?",
    a: `아니요, 이제는 안 됩니다. 대부분의 가이드가 아직 틀리게 안내하는 부분입니다. 가이유칸은 2026년 6월 15일부터 재입장을 종료한다고 발표했고, 그 이유로 입장 시간대별 방문객 수를 일정하게 유지해 방문객이 여유 있게 전시를 볼 수 있도록 하기 위해서라고 밝혔습니다. 식사는 입장 전이나 관람 후에 하세요. 대부분은 바로 옆 덴포잔 마켓플레이스에서 식사하며, 입장권은 그곳에서 할인 쿠폰으로도 쓸 수 있습니다. ${CHECKED} 확인.`,
  },
  {
    q: "가이유칸과 덴포잔 대관람차나 산타마리아호를 함께 이용할 수 있나요?",
    a: `일부는 가능하며, 살 때 이 구분이 중요합니다. 수족관은 세 가지 시설과 묶은 공식 세트 입장권을 판매합니다. 약 45분 동안 오사카항을 도는 범선 복원선 산타마리아호(성인 세트 ¥4,200부터), 배로 약 10분 걸리는 유니버설 시티 포트행 캡틴 라인, 같은 시설 안의 레고랜드 디스커버리 센터 오사카입니다. 같은 하버 빌리지에 있는 높이 112.5m의 덴포잔 대관람차는 이 목록에 없고 운영사도 달라서, 수족관과 대관람차를 묶은 공식 입장권은 없습니다. 대관람차는 당일에 사거나, 대관람차에 적용되는 오사카 주유패스를 이용하세요. 모두 ${CHECKED}에 확인했습니다.`,
  },
  {
    q: "어린아이와 함께 가이유칸에 가도 괜찮을까요?",
    a: `오사카의 주요 관광지 중에서 가족이 방문하기 쉬운 곳이며, 주의할 점은 즐길 거리보다 실용적인 부분입니다. 3세 미만은 무료이고 3세 이상은 ¥700~800이며, 관람 경로는 복잡하지 않은 일방통행 한 코스이고, 태평양 수조의 고래상어와 남극 펭귄처럼 대표 전시가 어린아이들이 실제로 보고 싶어 하는 것들입니다. 건물에는 기저귀 교환대와 분유용 온수기가 있는 베이비 케어 룸과 수유실이 있습니다. 일정에 반영할 점은 재입장 종료로 관람을 한 번에 끝내야 한다는 것과, 운영사가 안내하는 한 바퀴 90~120분입니다. 확인한 공식 페이지에는 유모차 규정이 없으므로, 미리 알아야 한다면 입구에서 문의하세요. 요금과 시설은 ${CHECKED}에 확인했습니다.`,
  },
  {
    q: "비 오는 날 오사카에서 가이유칸에 가도 괜찮을까요?",
    a: "가장 좋은 선택 중 하나이지만 아쉬운 점이 하나 있습니다. 수족관은 전부 실내이고 바로 옆 덴포잔 마켓플레이스에도 지붕이 있어서 비가 와도 안에서는 불편함이 없습니다. 다만 오사카코역 1번 출구에서 5분은 걸어야 하고, 함께 즐기기 좋은 산타마리아호 항만 크루즈와 대관람차는 비가 오면 제대로 즐기기 어렵습니다. 특히 산타마리아호는 날씨와 바다 상황에 따라 운항합니다. 일기 예보가 좋지 않다면 입장권만 사고 배와 대관람차는 다른 날로 미루세요.",
  },
];

/** Korean copy per English card, keyed by the card's kind (each kind appears once). */
const SAME_DAY_KO: Record<string, Partial<KlookSameDayCard>> = {
  Cruise: {
    kind: "크루즈",
    label: "산타마리아호 낮 크루즈",
    ctaLabel: "산타마리아호 크루즈 보기 →",
    why: "수족관 옆 선착장에서 출발해 약 45분 동안 오사카항을 돌며, 낮 운항은 매시 정각에 출항합니다.",
  },
  Hotel: {
    kind: "호텔",
    label: "유니버설 스튜디오 재팬 주변 호텔(유니버설 시티)",
    ctaLabel: "유니버설 시티 호텔 보기 →",
    why: "캡틴 라인 배를 타면 유니버설 시티 포트에서 수족관 입구까지 약 10분입니다.",
  },
  Pass: {
    kind: "패스",
    label: "오사카 주유패스(1일권 / 2일권)",
    ctaLabel: "오사카 주유패스 보기 →",
    why: "가이유칸에는 사용할 수 없지만, 바로 옆 덴포잔 대관람차, 산타마리아호, 캡틴 라인에는 적용됩니다.",
  },
  Activity: {
    kind: "액티비티",
    label: "덴포잔 대관람차",
    ctaLabel: "대관람차 보기 →",
    why: "높이 112.5m의 대관람차가 수족관과 같은 덴포잔 시설 안에 있어, 항구 일정의 나머지 절반이 됩니다.",
  },
  "Food tour": {
    kind: "푸드 투어",
    label: "도톤보리 낮 푸드 투어",
    ctaLabel: "푸드 투어 보기 →",
    why: "11:00~14:00로 등록된 투어여서, 주오선을 타고 가는 오후 수족관 입장 시간 전에 넣을 수 있습니다.",
  },
  eSIM: {
    kind: "eSIM",
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "수족관의 날짜·시간 지정 전자 티켓과 오사카코역까지 가는 길을 모두 휴대폰으로 확인하게 되므로, 공항에서부터 모바일 데이터가 있으면 편리합니다.",
  },
  "Airport train": {
    kind: "공항 열차",
    label: "난카이 특급 라피트 티켓",
    ctaLabel: "라피트 티켓 보기 →",
    why: "간사이 공항과 난바를 잇는 지정석 열차로, 오사카 여행의 도착일이나 출발일에 이용합니다.",
  },
};

const sameDayCards: KlookSameDayCard[] = kaiyukanSameDayCards.map((card) =>
  withKlookLocale(card, LOCALE, SAME_DAY_KO[card.kind] ?? {}),
);

// The same-day cards under the main CTA leave the lower blocks, as on the English page.
const notInTopCards = (item: { url: string }) => !kaiyukanSameDayCards.some((c) => c.url === item.url);

// On the English page every item of kaiyukanSameDayPrep is also a same-day card, so this block
// renders its heading and intro with no lines, exactly as the English one does.
const sameDayPrepItems: KlookTripPrepItem[] = kaiyukanSameDayPrep
  .filter(notInTopCards)
  .map((item) => withKlookLocale(item, LOCALE));

const HIGH_RATE_KO: Partial<KlookTripPrepItem>[] = [
  {
    label: "오사카성 천수각 입장권",
    ctaLabel: "오사카성 입장권 보기 →",
    why: "천수각 8개 층과 도요토미 이시가키관에 입장할 수 있고, 입구에서 코드를 스캔합니다. 오사카 주유패스가 있다면 오사카성이 이미 포함되어 있으니 사지 마세요.",
  },
  {
    label: "우메다 스카이빌딩 공중정원 전망대 입장권",
    ctaLabel: "우메다 스카이 입장권 보기 →",
    why: "두 타워 위에 있는 높이 173m의 원형 옥상 전망대로, 오사카역에서 걸어갈 수 있어 저녁에 들르기 좋습니다. 이곳도 주유패스로 이용할 수 있습니다.",
  },
  {
    label: "오사카성, 우메다 스카이빌딩, 톤보리 리버크루즈 당일 투어",
    ctaLabel: "오사카 당일 투어 보기 →",
    why: "오사카성, 우메다 전망대, 도톤보리의 톤보리 리버크루즈를 가이드와 함께 하루에 도는 투어로, 경로는 가이드가 정합니다.",
  },
];

const highRateItems: KlookTripPrepItem[] = osakaSightsHighRatePrep.map((item, i) =>
  withKlookLocale(item, LOCALE, HIGH_RATE_KO[i] ?? {}),
);

const tourPicks = [osakaSkyVistaHalfDayBusTour, osakaPrivateWalkingTour].filter(notInTopCards).map((tour) =>
  withKlookLocale(
    tour,
    LOCALE,
    tour.url === osakaSkyVistaHalfDayBusTour.url
      ? {
          title: "오사카 스카이 비스타 2층 버스 반일 투어",
          desc: "지붕 없는 2층 버스를 타고 오사카성, 도톤보리, 쓰텐카쿠를 지나는 반일 그룹 투어입니다",
        }
      : {
          title: "오사카 프라이빗 반일 / 종일 워킹 투어",
          desc: "영어 또는 일본어로 안내하는 전담 가이드와 난바, 신사이바시 일대를 원하는 코스로 둘러봅니다",
        },
  ),
);

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "가이유칸 입장권" }];

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

export default function KoOsakaAquariumKaiyukanTicketsPage({ updated }: { updated: PageUpdated }) {
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
            연령별 가이유칸 입장료, 붐비는 날을 알 수 있는 공식 안내, 한 바퀴 관람 시간, 그리고 덴포잔에서 함께 즐길
            대관람차, 산타마리아호 크루즈, 유니버설 스튜디오로 가는 배까지 정리했습니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 요금 범위와 확인일", "재입장 규칙 안내"].map((t) => (
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
            <strong>
              오사카 가이유칸 입장권은 성인 ¥2,700~¥3,200, 초·중학생 ¥1,400~¥1,650, 3세 이상 유아 ¥700~¥800이고 3세
              미만은 무료입니다
            </strong>
            . 수족관의 변동 요금제에 따라 날짜마다 요금이 정해지므로 붐비는 날일수록 범위의 위쪽 요금이 됩니다(kaiyukan.com,{" "}
            {CHECKED} 확인). 날짜와 시간을 지정해 입장하며, 예매가 필수는 아니지만 매표소는 당일 입장권만 판매하고 원하는
            시간이 남아 있지 않을 수 있으므로, 약 30일 전부터 판매하는 공식 전자 티켓을 사는 것이 안전합니다. 가이유칸은
            오사카 메트로 주오선 오사카코역 1번 출구에서 걸어서 약 5분이고, 수족관은 일방통행 관람 경로를 한 바퀴 도는 데
            90~120분이 걸린다고 안내합니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              클룩에서 원하는 날짜의 가이유칸 티켓 보기 →
            </KlookLink>
          </div>
          <NextBookingBlock region="osaka" locale="ko" />
        </section>

        <KlookSameDayCards
          heading="가이유칸에 가는 날 함께 예약할 것"
          cards={sameDayCards}
          footnote={
            <>
              오사카 주유패스로는 가이유칸에 입장할 수 없지만(osaka-amazing-pass.com 이용 시설 목록, 2026년 11월 23일 확인),
              덴포잔 대관람차와 산타마리아호는 패스에 포함됩니다. 간사이 공항에 도착하거나 출발하면서 교토, 신오사카, 덴노지를
              지난다면{" "}
              <KlookLink href={HARUKA_URL} adPlacement="same-day-cards" target="_blank" rel={KLOOK_REL}>
                클룩에서 JR 하루카 티켓 보기 →
              </KlookLink>{" "}
              유료 관광지보다 지하철을 더 많이 탄다면{" "}
              <KlookLink href={METRO_PASS_URL} adPlacement="same-day-cards" target="_blank" rel={KLOOK_REL}>
                클룩에서 오사카 메트로 1일권 / 2일권 보기 →
              </KlookLink>{" "}
              (역 발매기에서 파는 엔조이 에코 카드와의 비교는{" "}
              <Link href="/guides/transport/osaka-metro-pass" hrefLang="en">
                오사카 메트로 패스 가이드(영어)
              </Link>
              에 있습니다).
            </>
          }
        />

        <EsimCtaTop />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>성인 입장료</p>
                <p className={styles.verdictStatValue}>¥2,700~3,200, 날짜별</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>관람 소요 시간</p>
                <p className={styles.verdictStatValue}>90~120분, 일방통행 한 바퀴</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>가는 방법</p>
                <p className={styles.verdictStatValue}>오사카코역 1번 출구, 도보 5분</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>예매</p>
                <p className={styles.verdictStatValue}>날짜 지정 전자 티켓, 30일 전부터</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 오사카 가이유칸 입장권은 요금이 하나로 정해져 있지 않습니다. 변동 요금제를 운영하므로
              성인은 날짜에 따라 <strong>¥2,700~¥3,200</strong>, 초·중학생은 <strong>¥1,400~1,650</strong>, 3세 이상
              유아는 <strong>¥700~800</strong>을 내고, 3세 미만은 무료입니다. 입장 시간이 정해지고 방문일 약{" "}
              <strong>30일</strong> 전부터 판매하는 공식 날짜·시간 지정 전자 티켓을 사세요. 매표소는 당일 입장권만 판매하므로,
              전자 티켓이 매표소 대기 줄을 서지 않고 입장하는 방법이기도 합니다. 관람 시간은 <strong>90~120분</strong>(수족관이
              안내하는 한 바퀴 시간)을 잡고, <strong>2026년 6월 15일에 재입장이 종료</strong>되었으므로 관람을 한 번에 끝내는
              일정으로 짜세요. 주오선 오사카코역 1번 출구에서 걸어서 5분이며, 오사카 주유패스로는{" "}
              <strong>입장할 수 없습니다</strong>. 모두 kaiyukan.com에서 {CHECKED}에 확인했습니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                클룩에서 가이유칸 티켓 보기 →
              </KlookLink>
              <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                오사카 주유패스와 함께 →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>오사카 가이유칸은 어떤 곳인가요?</h2>
          <p className={styles.bodyText}>
            가이유칸은 오사카 미나토구 해안가의 덴포잔에 있는 수족관으로, 환태평양의 서식지를 따라 걷는 구성이며 그 중심에
            고래상어가 사는 거대한 태평양 수조가 있습니다. 운영사는 약 <strong>620종, 3만 마리</strong>의 생물을 보유하고
            있다고 안내하며, 대부분의 방문객이 관람 후 이야기하는 남극 펭귄도 여기에 포함됩니다.
          </p>
          <p className={styles.bodyText}>
            입장권을 바로 사기 전에 생각해 볼 점이 세 가지 있습니다. 요금이 날짜에 따라 달라지므로 같은 방문이라도 저렴한
            날과 비싼 날이 있습니다. 입장 시간은 예매할 때 정해지며, 혼잡을 피하려면 이 시간을 잘 골라야 합니다. 그리고
            2026년 6월부터는 나갔다가 다시 들어올 수 없으므로, 점심 시간으로 나누지 말고 관람을 한 번에 끝내는 일정으로 짜야
            합니다. 이 페이지에서는 이 세 가지 결정과 그 근거가 되는 숫자를 정리합니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금</span>
          <h2 className={styles.sectionTitle}>2026년 가이유칸 입장료는 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            가이유칸 입장료는 날짜에 따라 성인 ¥2,700~¥3,200, 어린이 ¥1,400~¥1,650입니다. 가이유칸은 입장료가 변동
            요금(入館料は変動価格)이라고 안내하며, 방문 날짜의 요금은 요금 달력에 표시됩니다. 연령별 입장권 종류는
            다음과 같습니다.
          </p>
          <Table
            head={["입장권", "대상", "요금(공식)", "참고"]}
            rows={priceRows.map((r) => [r.ticket, r.who, <span key="p" style={{ whiteSpace: "nowrap" }}>{r.price}</span>, r.what])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {BANDS_CHECKED_ISO} —{" "}
            <a href={OFFICIAL.bands} target="_blank" rel="noopener">kaiyukan.com/info/group/</a>(요금 범위와 예약 안내),{" "}
            {CHECKED_ISO} — <a href={OFFICIAL.calendar} target="_blank" rel="noopener">kaiyukan.com/info/ticket/kaiyukan/</a>
            (변동 요금, 요금 달력, 장애인 요금),{" "}
            <a href={OFFICIAL.santaMaria} target="_blank" rel="noopener">suijo-bus.osaka/intro/santamaria/</a>(세트 입장권).
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            요금 범위를 글로 적어 둔 곳은 단체 예약 페이지이고, 일반 입장권 페이지는 달력에서 날짜를 골라야 정확한 요금을
            보여 줍니다. 확인한 페이지에는 11월부터 연말연시까지의 요금이 글로 적혀 있지 않으므로, 연휴 날짜는 달력에서
            직접 확인하세요. 요금은 바뀔 수 있으니 구매 전에 방문 날짜의 요금을 확인하세요. 일본 각지의 입장료는 확인 날짜와
            함께{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              일본 관광지 입장권 가격표(영어)
            </Link>
            에 정리했습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              클룩에서 원하는 날짜의 가이유칸 티켓 보기 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            클룩 요금도 날짜에 따라 달라지므로, 결제 전에 방문 날짜의 상품 페이지와 취소 규정을 확인하세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>규칙과 시설</span>
          <h2 className={styles.sectionTitle}>가이유칸 입장 규칙, 운영 시간, 시설은 어떻게 되나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            날짜와 시간을 지정해 입장하고, 재입장은 종료되었으며, 저녁에는 20:00까지 운영하고 입장 마감은 19:00입니다. 아래
            각 항목은 표에 적힌 공식 페이지에서 가져왔으며, 확인 날짜를 함께 적었습니다.
          </p>
          <Table head={["항목", "공식 안내", "출처", "확인일"]} rows={factRows.map((r) => [r.item, r.value, r.source, CHECKED])} />
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>입장권 선택</span>
          <h2 className={styles.sectionTitle}>어떤 가이유칸 입장권을 사야 하나요?</h2>
          <div className={styles.whoForGrid}>
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
              클룩에서 가이유칸 입장권 보기 →
            </KlookLink>
            <KlookLink href={LEGO_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              바로 옆 레고랜드와 함께 →
            </KlookLink>
            <KlookLink href={NIFREL_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              엑스포시티의 니프렐과 함께 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem" }}>
            바로 옆 레고랜드는 실내 시설인 디스커버리 센터이며, 야외 테마파크가 아닙니다. 테마파크는 나고야의 레고랜드
            재팬으로, 요금, 운영 시간, 나고야역에서 가는 아오나미선은{" "}
            <Link href="/guides/attractions/legoland-japan-tickets" hrefLang="en" style={linkStyle}>
              레고랜드 재팬 입장권 가이드(영어)
            </Link>
            에 있습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>운영 시간과 혼잡도</span>
          <h2 className={styles.sectionTitle}>가이유칸은 언제 가는 것이 가장 좋나요?</h2>
          <p className={styles.bodyText}>
            <strong>요금 달력에서 낮은 요금인 평일에, 오후 중반 이후 입장하는 것이 가장 좋습니다.</strong> {CHECKED}에
            확인한 공식 페이지에는 혼잡 예보가 없지만, 예약 규칙을 보면 같은 결론이 나옵니다. 성인 요금이 가장 높은(¥3,200)
            날에는 15:00 이후 입장분만 예약을 받고, 야간 프로그램은 <strong>17:00~20:00, 입장 마감 19:00</strong>이며
            시간은 계절에 따라 바뀝니다.
          </p>
          <div style={{ margin: "1rem 0" }}>
            <Table head={["시기", "공식 페이지의 안내", "방문객에게 의미하는 것"]} rows={timingRows.map((r) => [r.when, r.official, r.means])} />
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            최종 확인: {CHECKED_ISO} — <a href={OFFICIAL.calendar} target="_blank" rel="noopener">kaiyukan.com/info/ticket/kaiyukan/</a>,{" "}
            <a href={OFFICIAL.bands} target="_blank" rel="noopener">kaiyukan.com/info/group/</a>(예약 안내와 한 바퀴 90~120분),{" "}
            <a href={OFFICIAL.ticket} target="_blank" rel="noopener">kaiyukan.com/info/ticket/</a>(매표소 판매),{" "}
            <a href={OFFICIAL.night} target="_blank" rel="noopener">kaiyukan.com/program/night/</a>.
          </p>
          <p className={styles.bodyText}>
            운영 시간은 요금과 같은 달력에 날짜별로 공개되며, 사이트는 방문 날짜를 직접 확인하라고 안내합니다. 일반적으로{" "}
            <strong>10:00에 문을 열고 20:00에 닫으며 입장 마감은 1시간 전</strong>이고, 휴관일은 1월과 2월에 며칠
            있습니다({SET_CHECKED} 확인). 17:00부터는 야간 프로그램으로 조명과 음악이 바뀝니다. 같은 입장권으로 같은 수조를
            보는 시간이며, 가장 붐비는 날에 요금 달력이 안내하는 오후 시간대입니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>관람 소요 시간</span>
          <h2 className={styles.sectionTitle}>가이유칸 관람에는 시간이 얼마나 걸리나요?</h2>
          <p className={styles.bodyText}>
            <strong>수족관이 안내하는 시간은 90~120분입니다.</strong> 가이유칸 단체 예약 페이지에 건물 한 바퀴 관람 시간으로
            적혀 있습니다({CHECKED} 확인). 꼭대기 층으로 올라간 뒤 수조를 따라 한 방향으로 내려오므로 한 번만 걸으면 됩니다.
            태평양 수조 앞에서 고래상어를 오래 보거나, 일본 해구 수조 뒤에 있고 일부 좌석이 수조를 향한 Cafe R.O.F에 들른다면
            시간을 더 잡으세요.
          </p>
          <p className={styles.bodyText}>
            그래도 하루의 대부분이 남습니다. 덴포잔은 만에 접해 있으므로, 해안가의 나머지 절반인 대관람차나 산타마리아호,
            또는 바다 건너 유니버설 스튜디오 재팬과 함께 일정을 짜는 것이 가장 간단합니다.{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" hrefLang="en" style={linkStyle}>
              오사카 2일 일정(영어)
            </Link>
            에서는 가이유칸을 이동 경로까지 정리한 하루 일정에 넣었고,{" "}
            <Link href="/guides/attractions/osaka-3-day-itinerary" hrefLang="en" style={linkStyle}>
              오사카 3일 일정(영어)
            </Link>
            에서는 바닷가 쪽 오후 일정으로,{" "}
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" hrefLang="en" style={linkStyle}>
              오사카·교토 3일 일정(영어)
            </Link>
            에서는 셋째 날 비 오는 날이나 아이 중심 일정의 대안으로 넣었습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>재입장</span>
          <h2 className={styles.sectionTitle}>가이유칸에 다시 들어갈 수 있나요?</h2>
          <p className={styles.bodyText}>
            <strong>아니요.</strong> 가이유칸은 <strong>2026년 6월 15일</strong>부터 재입장을 종료했습니다. 2026년 5월
            21일에 발표했으며, 방문객이 여유 있게 전시를 볼 수 있도록 입장 시간대별 방문객 수를 일정하게 유지하기 위한 조치
            중 하나라고 밝혔습니다(kaiyukan.com/about/news/20564.html, {CHECKED} 확인).
          </p>
          <p className={styles.bodyText}>
            식사는 입장 전이나 관람 후에 하세요. 음료 매장 SEA SAW는 입장 게이트 앞 구역에 있고, 덴포잔 마켓플레이스는 바로
            옆이며, 가이유칸 홀과 뮤지엄 숍 옆의 코인 로커는 입장권 없이 이용할 수 있어 입장 전에 짐을 맡기기 좋습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>아이와 함께</span>
          <h2 className={styles.sectionTitle}>아기나 어린아이와 함께 가이유칸에 가기 편한가요?</h2>
          <p className={styles.bodyText}>
            <strong>공식 시설 안내를 보면 편한 편입니다.</strong> 2세 이하는 무료이고, 건물에는 기저귀 교환대와 분유용
            온수기가 있는 <strong>베이비 케어 룸</strong>과 <strong>수유실</strong>이 있습니다. 휠체어는 안내 데스크에서
            빌려줍니다. 모두 kaiyukan.com에서 {CHECKED}에 확인했습니다. 확인한 공식 페이지에는 유모차 규정이 없으므로, 이
            부분이 일정에 중요하다면 입구에서 문의하세요.
          </p>
          <p className={styles.bodyText}>
            가족 여행도 다른 방문객과 같은 방법으로 준비하면 되며, 더 철저히 하면 됩니다. 어린아이가 당일 입장권 대기 줄에
            서지 않도록 입장 시간을 예매하고, 재입장이 종료되었으므로 낮잠이나 식사는 관람 중간이 아니라 입장 전이나 관람 후에
            하세요. 아이 중심의 여행이라면{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" hrefLang="en" style={linkStyle}>
              오사카 숙소 지역 가이드(영어)
            </Link>
            에서 수족관과 캡틴 라인으로 짧게 이어지는 유니버설 시티를 포함해 숙소 지역을 비교했습니다.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>단계별 안내</span>
          <h2 className={styles.sectionTitle}>가이유칸 입장권은 미리 예매해야 하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>필수는 아니지만 미리 예매하는 것이 좋습니다.</strong> 매표소는 당일 입장권만 판매하고 원하는 입장 시간에
            입장하지 못할 수 있다고 안내하며, 공식 날짜·시간 지정 전자 티켓은 약 30일 전부터 판매합니다
            (kaiyukan.com/info/ticket/, {CHECKED} 확인). 단계별 예매 방법은 다음과 같습니다.
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 가이유칸 티켓 보기 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="같은 날 함께 예약"
          heading="가이유칸에 가는 날 함께 예약할 만한 것은 무엇인가요?"
          intro="수족관에서 2~3시간을 보내도 하루의 나머지가 남고, 가이유칸이 포함되지 않는 패스도 다른 날에는 이득일 수 있습니다. 아래 상품은 입장권과 같은 클룩 계정으로 예약할 수 있습니다."
          items={sameDayPrepItems}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>세트와 주변 시설</span>
          <h2 className={styles.sectionTitle}>가이유칸 주변에서 함께 즐길 수 있는 것은 무엇인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>가장 쉬운 조합은 산타마리아호 항만 크루즈입니다.</strong> 수족관 옆 선착장에서 타며 약 45분이 걸립니다.
            수족관은 산타마리아호, 캡틴 라인, 레고랜드와 묶은 공식 세트 입장권을 판매하고, 오사카 주유패스는 대관람차, 크루즈,
            캡틴 라인에는 적용되지만 가이유칸에는 적용되지 않습니다.
          </p>
          <Table
            head={["시설", "시간", "요금(공식)", "주유패스", "알아 둘 점"]}
            rows={nearbyRows.map((r) => [r.what, r.time, r.price, r.pass, r.note])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {CHECKED_ISO} — <a href={OFFICIAL.santaMaria} target="_blank" rel="noopener">suijo-bus.osaka/intro/santamaria/</a>
            (크루즈 요금, 소요 시간, 선착장),{" "}
            <a href={OFFICIAL.amazingPass} target="_blank" rel="noopener">osaka-amazing-pass.com/en/service_free.html</a>
            (운영 시간, 휴무, 목록의 요금과 패스 적용 여부),{" "}
            <a href={OFFICIAL.captainLine} target="_blank" rel="noopener">kaiyukan.com/thv/captline/</a>,{" "}
            <a href={OFFICIAL.harbor} target="_blank" rel="noopener">kaiyukan.com/thv/general/</a>(배 소요 시간, 대관람차 높이).
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SANTA_MARIA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 산타마리아호 크루즈 보기 →
            </KlookLink>
            <KlookLink href={LEGO_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 가이유칸 + 레고랜드 보기 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            수족관의 세트 입장권 목록에 <strong>없는</strong> 것도 확인하세요. 수족관과 같은 하버 빌리지에 있는 높이
            112.5m의 <strong>덴포잔 대관람차</strong>는 세계 최대급 대관람차 중 하나이지만 운영사가 달라서, 수족관과
            대관람차를 묶은 공식 세트는 없습니다. 대관람차 탑승권은 당일에 사세요. 여행 일정에 유니버설 스튜디오 재팬이
            있다면 <strong>캡틴 라인</strong> 세트 입장권을 눈여겨보세요. 유니버설 시티 포트에서 수족관 입구까지 배로
            10분이어서, 바다 양쪽에 있는 두 관광지를 오후 한나절에 함께 볼 수 있습니다. 유니버설 스튜디오 재팬에서 예매해야
            할 것은{" "}
            <Link href="/ko/guides/attractions/usj-tickets-express-pass" style={linkStyle}>
              유니버설 스튜디오 재팬 입장권과 익스프레스 패스 가이드
            </Link>
            에, 배로 한 번 건너면 되는 유니버설 시티의 호텔 비교는{" "}
            <Link href="/guides/attractions/usj-hotels" hrefLang="en" style={linkStyle}>
              유니버설 스튜디오 재팬 호텔 가이드(영어)
            </Link>
            에 있습니다. 세트 입장권과 대관람차 높이 112.5m는 kaiyukan.com에서 {CHECKED}에 확인했습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>가이유칸까지 어떻게 가나요?</h2>
          <p className={styles.bodyText}>
            오사카 메트로 <strong>주오선 오사카코역</strong>을 이용하세요. 수족관은 이 역을 大阪港駅（海遊館前）, 즉 ‘가이유칸
            앞 오사카코역’이라고 부르며, <strong>1번 출구에서 걸어서 약 5분</strong>입니다. 거의 모든 방문객이 이 경로를
            이용합니다. 주오선은 시내 중심을 지나므로 혼마치역에서 환승 없이 갈 수 있고, 다른 중심부 역에서도 대부분 한 번만
            갈아타면 됩니다.{" "}
            <Link href="/guides/transport/osaka-transportation" hrefLang="en" style={linkStyle}>
              오사카 교통 가이드(영어)
            </Link>
            에서 주오선이 다른 노선과 어떻게 이어지는지 설명했고,{" "}
            <Link href="/guides/transport/osaka-metro-pass" hrefLang="en" style={linkStyle}>
              오사카 메트로 패스 가이드(영어)
            </Link>
            에서는 이런 날 1일권이 IC 카드보다 저렴한지 계산했습니다.
          </p>
          <p className={styles.bodyText}>
            운영사의 교통 안내 페이지에는 다른 방법도 세 가지 있습니다. 유니버설 시티 포트에서 출발해 입구 바로 앞의 가이유칸
            니시하토바에 도착하는 <strong>캡틴 라인</strong> 셔틀 배, 덴포잔 하버 빌리지 정류장에 서는 오사카 시내버스와
            가이유칸(덴포잔) 정류장에 서는 난카이 버스(모두 입구에서 몇 걸음 거리), 그리고 주차 공간 약 1,000대가 있는
            자동차입니다. 모두 {CHECKED}에 확인했습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>주유패스 적용 여부</span>
          <h2 className={styles.sectionTitle}>오사카 주유패스로 가이유칸에 입장할 수 있나요?</h2>
          <p className={styles.bodyText}>
            <strong>아니요.</strong> 가이유칸은 패스 이용 시설 목록에 없으며(osaka-amazing-pass.com, {CHECKED} 확인), 패스에서
            빠진 시설 중 가장 비쌉니다. 패스(1일권 ¥3,500, 2일권 ¥5,000)로는 오사카 메트로와 시내버스를 무제한으로 탈 수 있고
            약 40곳의 시설에 무료로 입장할 수 있습니다. 여기에는 오사카성, 우메다 스카이빌딩 전망대, 리버크루즈(패스 없이
            ¥2,000인{" "}
            <Link href="/ko/guides/attractions/dotonbori-river-cruise" style={linkStyle}>
              도톤보리 리버크루즈
            </Link>
            포함)가 있고, 수족관 바로 옆의 덴포잔 대관람차, 산타마리아호 낮 크루즈, 캡틴 라인도 있습니다. 유니버설 스튜디오
            재팬도 포함되지 않습니다. 포함 시설 전체 목록과 손익 계산은{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              오사카 주유패스 가이드(영어)
            </Link>
            에 정리했습니다.
          </p>
          <p className={styles.bodyText}>
            따라서 비용보다 일정을 어떻게 짜느냐가 중요합니다. 패스로 이용할 수 있는 시설을 서너 곳 도는 시내 관광일에는
            패스가 이득이지만, 가이유칸 중심의 하루는 그렇지 않으므로 이날을 위해 패스 이용일을 하루 더 사면 낸 요금의 대부분을
            쓰지 못합니다. 효율적인 일정은 시내 관광에 패스를 쓰는 하루와 패스 없이 대표 관광지를 보는 하루로 나누는 것이며,{" "}
            <Link href="/guides/attractions/things-to-do-osaka" hrefLang="en" style={linkStyle}>
              오사카에서 즐길 거리(영어)
            </Link>
            에서 2~3일 여행 일정에 맞춰 정리했습니다. 그래도 한 번에 결제하고 싶다면, 클룩에서 주유패스에 가이유칸 입장권을
            묶은 상품을 판매하며 이런 상품은 이것 하나뿐입니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 주유패스 + 가이유칸 보기 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              수족관 입장권만 →
            </KlookLink>
          </div>
        </section>

        <div data-placement="kaiyukan-highrate-faq">
          <KlookTripPrep
            label="같은 여행"
            heading="같은 여행에서 함께 예약할 수 있는 오사카 관광지는 어디인가요?"
            intro="가이유칸 관람은 2~3시간이면 끝나므로, 그날 저녁이나 다음 날 오사카성이나 우메다 전망대를 넣을 수 있습니다. 두 곳 모두 오사카 주유패스로 이용할 수 있으므로, 아래 상품은 패스 없이 여행할 때를 위한 것입니다."
            items={highRateItems}
            adPlacement="kaiyukan-highrate-faq"
          />
        </div>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            가이유칸의 자매 시설인{" "}
            <Link href="/guides/attractions/nifrel-osaka-tickets" hrefLang="en" style={linkStyle}>
              니프렐(NIFREL, 영어)
            </Link>
            은 스이타시 엑스포시티에 있으며, 성인 ¥2,400이고 2027년 1월 19~20일에 휴관합니다.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            시코쿠 가가와현의{" "}
            <Link href="/guides/attractions/shikoku-aquarium-tickets" hrefLang="en" style={linkStyle}>
              시코쿠 수족관(영어)
            </Link>
            은 성인 ¥2,600, 초·중학생 ¥1,400입니다.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            바로 옆 덴포잔 마켓플레이스의{" "}
            <Link href="/guides/attractions/legoland-discovery-center-osaka-tickets" hrefLang="en" style={linkStyle}>
              레고랜드 디스커버리 센터 오사카(영어)
            </Link>
            는 3세 이상 온라인 요금 ¥2,900~3,300입니다.
          </p>
        </section>
        <EsimCtaBottom />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="가이유칸 입장권 자주 묻는 질문" />

        <KlookTourPicks
          heading="오사카에서 보내는 하루의 나머지"
          intro="가이유칸 관람은 하루 중 2~3시간이면 끝나 나머지 절반이 남고, 덴포잔은 많은 사람이 보고 싶어 하는 오사카 중심부와 거리가 멉니다. 아래 투어는 오사카성, 도톤보리, 신세카이 쪽을 돕니다. 클룩 가격은 날짜에 따라 달라지므로 상품 페이지에서 현재 요금과 집합 장소를 확인하세요."
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "오키나와 추라우미 수족관 입장권 2026: 요금, 운영 시간, 가는 방법(영어)" },
            { href: "/ko/guides/attractions/osaka-castle-tickets", title: "오사카성 천수각 입장료 2026: 시간, 주유패스" },
            { href: "/ko/guides/attractions/umeda-sky-building-tickets", title: "우메다 스카이빌딩 입장료 2026: 공중정원 시간, 일몰" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "오사카 주유패스 2026: ¥3,500, 살 만할까? 1일 일정(영어)" },
            { href: "/ko/guides/attractions/usj-tickets-express-pass", title: "유니버설 스튜디오 재팬 입장권과 익스프레스 패스(2026)" },
            { href: "/guides/attractions/things-to-do-osaka", title: "오사카에서 즐길 거리(2026): 패스가 이득인 곳과 아닌 곳(영어)" },
            { href: "/guides/transport/osaka-transportation", title: "오사카 교통 가이드(2026): 지하철, 열차, 교통카드(영어)" },
            { href: "/guides/transport/osaka-metro-pass", title: "오사카 메트로 패스 2026: 1일권과 2일권 비교(영어)" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "일본 관광지 입장권 가격 2026: 공식 요금과 예약 규칙(영어)" },
            { href: "/guides/attractions", title: "일본에서 즐길 거리 더 보기(영어) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>날짜만이 아니라 입장 시간을 고르세요</h2>
            <p className={styles.ctaBannerDesc}>
              요금은 날짜에 따라, 혼잡도는 시간에 따라 달라지므로 입장 시간을 잘 정하는 것이 중요합니다. 미리 예매하면 한국어
              결제 화면에서 해외 발급 카드로 결제하고, 매표소 대기 줄 대신 코드를 스캔해 입장할 수 있습니다. 결제 전에 방문
              날짜의 취소 기한을 확인하세요.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                클룩에서 가이유칸 티켓 보기 →
              </KlookLink>
              <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                오사카 주유패스와 함께 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
