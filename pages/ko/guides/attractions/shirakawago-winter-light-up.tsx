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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import {
  japanWinterStayAreas,
  klookEsim,
  shirakawagoLightUpTripPrep,
  shirakawagoTakayamaKanazawaDayTour,
  shirakawagoWinterLightUpTakayamaNagoyaBusTour,
  takayamaShirakawagoNagoyaDayTrip,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { shirakawagoLightUp2027NagoyaTour } from "../../../../lib/klook-links-winter-hub";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/shirakawago-winter-light-up) section by section as
// of 2026-11-26 (task-jtk-20261126-TR03): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (shirakawa-go.gr.jp, nouhibus.co.jp
// and hokutetsu.co.jp, read 16 Nov 2026); nothing is added. Title term: 시라카와고 라이트업 — the
// event's name on gltjp.com/ko, trvlogue and haveagood-holiday's Korean pages. In the body the
// lights are 야간 조명, per the Korean style sheet; 노히 버스 and 호쿠리쿠 철도 as on the Korean
// winter itinerary.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/shirakawago-winter-light-up";
const TITLE = "시라카와고 라이트업 2027: 날짜, 예약, 투어";
const H1 = "시라카와고 라이트업 2027: 날짜, 예약 방법, 야간 조명 투어";
const DESC =
  "시라카와고 라이트업 2027은 1월 11, 17, 24, 31일 4일뿐이며 사전 예약제입니다. 나고야 출발 투어와 버스를 비교합니다.";

const OWN = dateLabel("2026-11-16", LOCALE);
const NOHI_FARE_READ = dateLabel("2026-11-06", LOCALE);

const COACH_URL = klookFor(shirakawagoWinterLightUpTakayamaNagoyaBusTour.url, LOCALE);
const SMALL_GROUP_URL = klookFor(shirakawagoLightUp2027NagoyaTour.url, LOCALE);
const KANAZAWA_DAY_URL = klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE);
const NAGOYA_DAY_URL = klookFor(takayamaShirakawagoNagoyaDayTrip.url, LOCALE);
const TAKAYAMA_HOTELS_URL = klookFor(japanWinterStayAreas[3].url, LOCALE);
const KANAZAWA_HOTELS_URL = klookFor(japanWinterStayAreas[2].url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

/** Table 1: dates and the five ways in. First row is the answer. */
const wayRows = [
  {
    way: "지금 가장 쉬운 방법: 야간 조명 버스 투어(노선버스 회사 또는 여행사)",
    deck: "노선버스 회사 투어: 포함된 상품과 포함되지 않은 상품이 있음. 여행사 투어: 불포함",
    status: "노선버스 회사 투어는 2026년 10월 13일~11월 2일에 날짜별로 판매 시작. 여행사 상품은 2026년 12월 2일 13:00에 링크 게시",
    book: "관광협회가 아니라 버스 회사나 여행사",
  },
  {
    way: "마을에서 숙박",
    deck: "포함",
    status: "추첨은 10월 31일 마감, 11월 10일 당첨 통보. 당첨자가 포기한 객실은 2026년 11월 26일 13:00부터 선착순 재판매",
    book: "관광협회 웹사이트",
  },
  {
    way: "자가용, 주차장 예약(미다시마 주차장)",
    deck: "불포함",
    status: "1차 판매 매진. 2차 판매는 2026년 12월 1일 13:00 시작: 차량 1대 ¥7,000(1~5명), ¥10,000(6~10명)",
    book: "관광협회 웹사이트, 신용카드 결제, 환불 불가",
  },
  {
    way: "택시, 예약한 주차 공간 이용",
    deck: "불포함",
    status: "자가용과 같은 주차장 판매. 행사일에는 마을의 택시 회사가 운행하지 않음",
    book: "주차장을 먼저 예약한 뒤 택시 예약",
  },
  {
    way: "당일 현장 방문",
    deck: "—",
    status: "불가: 당일에는 입장권을 판매하지 않고, 15:30부터 게이트에서 입장권이 없는 사람의 마을 출입을 막음",
    book: "—",
  },
];

/** Table 2: ways to get there, on each operator's own figures. */
const routeRows = [
  {
    option: "클룩 나고야 출발 야간 조명 버스(가는 길에 히다 다카야마 관광)",
    time: "상품 페이지 기준 12시간 25분, 메이테쓰 버스센터 출발",
    cost: "날짜별 요금은 상품 페이지에서 확인",
    book: "클룩에서 예약. 영어 가능 스태프 동행, 상품 페이지에 4일 모두 출발 확정으로 표시",
  },
  {
    option: "클룩 나고야 출발 소규모 야간 조명 투어",
    time: "하루 종일 걸리는 일정. 마을만 관람하며 전망대는 불포함",
    cost: "날짜별 요금은 상품 페이지에서 확인",
    book: "클룩에서 예약. 약 9명, 사카에 또는 나고야역 호텔 픽업",
  },
  {
    option: "노히 버스 다카야마 출발 야간 조명 버스",
    time: "14:40~15:40 출발, 20:20~20:45 복귀",
    cost: "¥13,000(합장 민가원 + 젠자이), ¥14,000(온천 이용권), ¥16,000(전망대)",
    book: "노히 버스 웹사이트에서만 예약, 1회 최대 6명, 대기 접수 없음",
  },
  {
    option: "호쿠리쿠 철도 가나자와 출발 야간 조명 버스",
    time: "가나자와 14:30 → 마을 16:30~19:50 → 가나자와 21:50",
    cost: "성인 ¥18,500, 어린이 ¥16,500, 전망대 입장권 포함",
    book: "호쿠리쿠 철도 웹사이트 또는 전화, 1회 최대 4명",
  },
  {
    option: "노선 고속버스(낮 시간만)",
    time: "가나자와 1시간 15분, 다카야마 약 50분",
    cost: `가나자와 성인 ¥2,800(호쿠리쿠 철도), 다카야마 12월 1일부터 ¥2,900(노히 버스, ${NOHI_FARE_READ} 확인)`,
    book: "지정석. 다만 마을을 떠나는 마지막 버스가 17:30이라 야간 조명이 끝나기 전에 출발",
  },
];

/** Table 3: where to sleep. */
const stayRows = [
  {
    base: "다카야마",
    why: "노히 버스의 야간 조명 버스가 JR 다카야마역 옆 버스센터에서 출발해 같은 곳으로 돌아오며, 20:45까지 도착",
    watch: "야간 조명이 끝난 뒤 다카야마로 돌아가는 노선버스가 없으므로, 돌아오는 방법은 노히 버스의 야간 조명 버스입니다",
  },
  {
    base: "가나자와",
    why: "호쿠리쿠 철도의 야간 조명 버스가 가나자와역 서쪽 출구에서 출발해 21:50에 돌아오며, 호쿠리쿠 신칸센이 다니는 도시",
    watch: "21:50에 돌아오므로 그날 밤은 늦은 열차로 이동하지 말고 가나자와에서 묵으세요",
  },
  {
    base: "시라카와고의 합장 민가 민박(민슈쿠)",
    why: "전망대 입장권이 포함되고, 버스가 떠난 뒤의 마을에 머물 수 있는 유일한 숙박",
    watch: "야간 조명 날의 숙박은 추첨제(마감). 취소된 객실은 2026년 11월 26일 13:00부터 선착순 재판매",
  },
  {
    base: "나고야",
    why: "클룩 야간 조명 버스가 출발하는 곳이며, 도카이도 신칸센이 다니는 도시",
    watch: "거점 4곳 중 하루가 가장 깁니다",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2027년 시라카와고 야간 조명 행사는 언제인가요?",
    a: `1월 11일(월요일, 공휴일), 17일, 24일, 31일 4일 저녁이며, 2027년에 각각 17:30부터 19:30까지 오기마치 마을에서 열립니다. 시라카와고 관광협회가 발표한 제41회 행사입니다(${OWN} 확인). 전국적인 한파로 교통에 큰 지장이 예상되면 협회가 행사를 취소할 수 있습니다.`,
  },
  {
    q: "시라카와고 야간 조명 행사는 예약해야 하나요?",
    a: `네. 입장권을 목에 거는 완전 사전 예약제로 운영되며, 당일에는 입장권을 판매하지 않고 15:30부터 게이트에서 입장권이 없는 사람의 마을 출입을 막습니다. 들어가는 방법은 마을 숙박, 자가용 또는 택시용 주차장 예약, 노선버스 회사의 야간 조명 투어, 여행사의 버스 투어 다섯 가지입니다(${OWN} 확인).`,
  },
  {
    q: "야간 조명을 보려면 투어가 가장 좋은 방법인가요?",
    a: "대부분의 방문객에게는 그렇습니다. 마을을 떠나는 마지막 노선버스는 17:30으로 야간 조명이 끝나기 전에 출발하고, 마을 숙박은 추첨으로 마감되었으며, 주차장을 이용하려면 눈길에서 스터드리스 타이어를 장착한 차가 필요합니다. 나고야, 다카야마, 가나자와에서 출발하는 야간 조명 버스는 입장 자리를 확보해 주고 같은 날 밤에 돌아옵니다.",
  },
  {
    q: "전망대에서 야간 조명을 볼 수 있나요?",
    a: "전망대 입장권이 있어야 하며, 이 입장권은 따로 판매하지 않습니다. 전망대 플랜으로 예약한 마을 숙박이나, 다카야마 출발 노히 버스의 ¥16,000 코스, 가나자와 출발 호쿠리쿠 철도의 ¥18,500 버스처럼 노선버스 회사의 전망대 투어에 포함됩니다. 자가용, 택시, 여행사 투어로 가는 방문객은 마을 안에서 야간 조명을 봅니다.",
  },
  {
    q: "1월 밤의 시라카와고는 얼마나 추운가요?",
    a: `관광협회는 야간 조명 시간대 기온을 −10°C~0°C로 안내하며, 도로가 얼어 있습니다. 발밑이 어두우므로 따뜻한 외투, 방수 방한 부츠, 신발용 아이젠, 손전등을 권장합니다(${OWN} 확인).`,
  },
  {
    q: "야간 조명 행사일에 낮에 시라카와고를 방문할 수 있나요?",
    a: "네, 제한이 있습니다. 자가용은 예약이 필요 없지만 15:00까지 들어와 17:00까지 나가야 하고, 관광버스는 주차장 예약이 필요하며 14:00까지 들어와 16:00까지 나가야 합니다. 노선버스로 간다면 15:20까지 마을에 도착하는 버스를 타야 합니다. 전망대로 가는 산책로는 15:45, 전망대는 16:10에 닫습니다.",
  },
  {
    q: "야간 조명 예약을 취소하거나 변경할 수 있나요?",
    a: "주차장 예약은 실행위원회가 행사를 취소하는 경우를 제외하고 변경이나 환불이 되지 않습니다. 노히 버스는 출발 전 취소에 ¥100의 수수료를 받고, 결제 후에는 변경할 수 없습니다. 클룩 투어는 결제 전에 상품 페이지의 취소 규정을 확인하세요.",
  },
  {
    q: "도쿄 출발 시라카와고 야간 조명 투어가 있나요?",
    a: "당일 일정으로는 없습니다. 전날 신칸센으로 나고야나 가나자와에 가서 그곳에서 출발하는 야간 조명 버스를 타세요. 가나자와 경로는 도쿄에서 가나자와 가는 방법 가이드(영어)에 있습니다.",
  },
];

const TRIP_PREP_KO: Partial<KlookTripPrepItem>[] = [
  {
    label: "시라카와고 겨울 야간 조명과 히다 다카야마 당일 버스 투어(나고야 출발)",
    ctaLabel: "나고야 출발 야간 조명 버스 보기 →",
    why: "입장은 사전 예약제이고 야간 조명이 끝난 뒤 마을을 떠나는 노선버스가 없으므로, 입장 자리가 확보된 버스 하나를 예약하면 계획 전체가 해결됩니다.",
  },
  {
    label: "다카야마역 주변 호텔",
    ctaLabel: "클룩에서 다카야마 호텔 보기 →",
    why: "노히 버스의 야간 조명 버스는 다카야마역 옆 버스센터에서 출발해 20:20~20:45에 같은 곳으로 돌아오므로, 그날 밤은 숙소까지 조금만 걸으면 됩니다.",
  },
  {
    label: "가나자와 호텔",
    ctaLabel: "클룩에서 가나자와 호텔 보기 →",
    why: "호쿠리쿠 철도의 야간 조명 버스는 가나자와역 서쪽 출구에서 14:30에 출발해 21:50에 돌아오므로, 이 경로로 간다면 역 근처 객실을 거점으로 잡으세요.",
  },
  {
    label: "호쿠리쿠 아치 패스",
    ctaLabel: "호쿠리쿠 아치 패스 보기 →",
    why: "도쿄 → 가나자와 → 간사이를 열차로 이동한다면 신칸센 구간에 패스를 사용할 수 있습니다. 시라카와고행 버스에는 어떤 JR 패스도 적용되지 않습니다.",
  },
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "한파로 인한 야간 조명 취소, 눈길의 버스 지연, 입장 안내가 모두 온라인으로 오고, 마을에는 물어볼 역이 없습니다.",
  },
];

const tripPrepItems: KlookTripPrepItem[] = shirakawagoLightUpTripPrep.map((item, i) =>
  withKlookLocale(item, LOCALE, TRIP_PREP_KO[i] ?? {}),
);

const stayAreas = [
  withKlookLocale(japanWinterStayAreas[3], LOCALE, {
    area: "다카야마역",
    why: "이 경로에서 산속에 묵는 곳이자 1월 시라카와고 야간 조명 버스의 거점입니다. 노히 버스 터미널이 역 옆에 있어 19:30에 끝나도 환승 없이 걸어서 돌아옵니다.",
  }),
  withKlookLocale(japanWinterStayAreas[2], LOCALE, {
    area: "가나자와",
    why: "호쿠리쿠 신칸센 종점에서 2박하는 곳입니다. 겐로쿠엔 버스와 예약제 시라카와고 버스가 모두 역 앞에서 출발하며, 이 여행에서 일정에 여유가 가장 적은 구간입니다.",
  }),
];

const tourPicks = [
  withKlookLocale(shirakawagoWinterLightUpTakayamaNagoyaBusTour, LOCALE, {
    title: "시라카와고 겨울 야간 조명과 히다 다카야마 당일 버스 투어(나고야 출발)",
    desc: "1월 야간 조명 행사 4일 저녁에 나고야 메이테쓰 버스센터에서 출발하는 12시간 25분 버스 일정으로, 영어 가능 스태프가 동행하고 가는 길에 다카야마 옛 시가지에 들릅니다",
  }),
  withKlookLocale(shirakawagoLightUp2027NagoyaTour, LOCALE, {
    title: "시라카와고 야간 조명 투어, 2027년 4일 저녁(나고야 출발)",
    desc: "2027년 1월 야간 조명 행사 4일 저녁에 나고야에서 출발하는 10~12시간 일정으로, 마을 안만 관람하며 호텔 픽업을 선택할 수 있습니다",
  }),
  withKlookLocale(shirakawagoTakayamaKanazawaDayTour, LOCALE, {
    title: "가나자와 출발 시라카와고·다카야마 당일 버스 투어",
    desc: "영어 가능 공인 가이드가 동행하는 8~10시간 그룹 투어로, 가나자와 왕복 또는 다카야마 하차 중에서 고를 수 있습니다",
  }),
  withKlookLocale(takayamaShirakawagoNagoyaDayTrip, LOCALE, {
    title: "나고야 출발 다카야마·시라카와고 당일 투어",
    desc: "나고야역에서 왕복하는 약 11시간 일정으로, 시라카와고와 다카야마 옛 시가지에서 각각 약 2시간을 보냅니다",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "시라카와고 라이트업" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
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
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.86rem" }}>
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

export default function KoShirakawagoWinterLightUpPage({ updated }: { updated: PageUpdated }) {
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
            1월의 4일 저녁뿐이고, 사전 예약제입니다. 들어가는 방법 전부와 같은 날 밤에 돌아오는 버스, 묵을 곳을
            정리했습니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "관광협회 규정, 확인일 표시", "노히 버스·호쿠리쿠 철도 요금", "나고야, 다카야마, 가나자와"].map((t) => (
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
                <p className={styles.verdictStatLabel}>2027년 날짜</p>
                <p className={styles.verdictStatValue}>1월 11, 17, 24, 31일</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>점등 시간</p>
                <p className={styles.verdictStatValue}>17:30~19:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>예약</p>
                <p className={styles.verdictStatValue}>필수, 당일 입장권 없음</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>가장 좋은 방법</p>
                <p className={styles.verdictStatValue}>야간 조명 버스 투어</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>시라카와고 겨울 라이트업</strong>(야간 조명 행사)은 <strong>2027년 1월 11, 17, 24, 31일 4일
              저녁, 17:30부터 19:30까지</strong> 열리며, 사전 예약으로만 입장할 수 있고 당일에는 입장권을 판매하지
              않습니다. 자가용은 주차장 예약이 필요하고(2차 판매는 <strong>2026년 12월 1일 13:00</strong> 시작), 마을을
              떠나는 마지막 노선버스는 17:30으로 야간 조명이 끝나기 전에 출발합니다.{" "}
              <strong>나고야, 다카야마, 가나자와</strong>에서 출발하는 야간 조명 버스 투어가 가장 확실하게 들어가고
              돌아오는 방법입니다. 규정은 {OWN}에 시라카와고 관광협회 사이트에서 확인했습니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                나고야 출발 야간 조명 투어 →
              </KlookLink>
              <KlookLink href={TAKAYAMA_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                다카야마 호텔 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>날짜와 예약</span>
          <h2 className={styles.sectionTitle}>2027년 시라카와고 야간 조명 행사는 언제인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>2027년 1월 11일(월요일, 공휴일), 17일, 24일, 31일</strong>, 매일 저녁 17:30부터 19:30까지
            오기마치 마을에서 열립니다. 제41회 행사의 날짜는 이 4일뿐이며, 전국적인 한파로 교통에 큰 지장이 예상되면
            협회가 해당 날짜의 행사를 취소할 수 있습니다. 어떤 방법으로 들어가는지에 따라 전망대에 올라갈 수 있는지가
            정해집니다.
          </p>
          <Table
            head={["들어가는 방법", "전망대", "현황(2026년 11월 16일)", "예약처"]}
            rows={wayRows.map((r) => [r.way, r.deck, r.status, r.book])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {OWN} —{" "}
            <a href="https://shirakawa-go.gr.jp/events/441/" target="_blank" rel="noopener">
              시라카와고 관광협회, 2027년 야간 조명 행사 개요
            </a>
            ,{" "}
            <a href="https://shirakawa-go.gr.jp/events/459/" target="_blank" rel="noopener">
              숙박 추첨 안내
            </a>
            . 입장권은 해당 날짜에만 유효하며, 마을 안에서는 목에 걸고 다녀야 합니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>예약</span>
          <h2 className={styles.sectionTitle}>시라카와고 야간 조명 행사는 예약해야 하나요?</h2>
          <p className={styles.bodyText}>
            네, 반드시 해야 합니다. 협회는 <strong>입장권을 발급하는 완전 사전 예약제</strong>로 운영합니다. 입장권
            없이 가면 들어갈 수 없고, <strong>당일에는 입장권을 판매하지 않습니다</strong>. 15:30부터 마을 입구에
            게이트가 설치됩니다. 전망대 입장권은 따로 판매하지 않으며, 실행위원회가 행사를 취소하는 경우를 제외하고
            예약은 변경이나 환불이 되지 않습니다({OWN} 확인).
          </p>
          <p className={styles.bodyText}>
            <strong>먼저 마감되는 예약:</strong> 마을 숙박(추첨, 마감)이 가장 먼저이고, 그다음이 1차 주차장
            판매(판매 시작 당일 매진)입니다. 2차 주차장 판매는 <strong>2026년 12월 1일 13:00</strong>에 시작하고,
            여행사 상품은 <strong>2026년 12월 2일 13:00</strong>에 협회 사이트에 링크가 게시됩니다. 클룩의 나고야 출발
            야간 조명 상품에는 이미 1월 날짜가 표시되어 있으니, 원하는 날짜를 상품 페이지에서 확인하세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              나고야 출발 야간 조명 + 다카야마 →
            </KlookLink>
            <KlookLink href={SMALL_GROUP_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              소규모 야간 조명 투어 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>야간 조명을 보려면 투어가 가장 좋은 방법인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            대부분의 방문객에게는 그렇습니다. 노선버스는 17:30에 끝나 야간 조명이 끝나기 전에 떠납니다. 야간 조명
            버스나 <strong>시라카와고 야간 조명 투어</strong>는 입장 자리를 확보해 주고 같은 날 밤에 데려다줍니다. 묵는
            도시에서 출발하는 것을 고르세요.
          </p>
          <Table
            head={["방법", "시간", "요금", "예약"]}
            rows={routeRows.map((r) => [r.option, r.time, r.cost, r.book])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {OWN} —{" "}
            <a href="https://www.nouhibus.co.jp/shirakawa_lightup_2027/" target="_blank" rel="noopener">
              노히 버스 야간 조명 버스
            </a>
            ,{" "}
            <a href="https://www.hokutetsu.co.jp/news/shirakawago-lightup2027/" target="_blank" rel="noopener">
              호쿠리쿠 철도 야간 조명 버스
            </a>
            ,{" "}
            <a href="https://www.hokutetsu.co.jp/highway-bus/takayama/" target="_blank" rel="noopener">
              호쿠리쿠 철도 시라카와고–다카야마선
            </a>
            . 노히 버스의 12월 1일부터 다카야마 요금 ¥2,900은 {NOHI_FARE_READ}에 확인했습니다. 노히 버스와 호쿠리쿠
            철도는 10월 13일부터 11월 2일 사이에 날짜별로 야간 조명 버스 좌석 예매를 시작했습니다. 노히 버스는 대기
            접수를 받지 않으며, 취소로 생긴 좌석은 예약 페이지에 다시 나옵니다. 클룩 투어의 내용은 상품 페이지 설명을
            따릅니다.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            어떤 야간 조명 버스를 골라야 하나요?
          </h3>
          <p className={styles.bodyText}>
            <strong>다카야마에 묵는다면:</strong> 전망대에 가고 싶으면 노히 버스 B 코스(¥16,000)를 고르세요. 눈길을
            편도 약 20분 걸어 올라가야 합니다. 마을과 합장 민가원만 본다면 A 코스(¥13,000)입니다.{" "}
            <strong>가나자와에 묵는다면:</strong> 호쿠리쿠 철도 버스(¥18,500, 전망대 포함)로, 마을에서 약 3시간 20분을
            보냅니다. <strong>나고야에 묵거나 일본어 예약 사이트가 어렵다면:</strong> 영어로 예약할 수 있는 클룩
            버스를 고르세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              나고야 출발 야간 조명 버스(영어 스태프) →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>낮 방문</span>
          <h2 className={styles.sectionTitle}>야간 조명 행사일에 낮에 시라카와고를 방문할 수 있나요?</h2>
          <p className={styles.bodyText}>
            네, 다만 일찍 떠나야 합니다. 행사일 4일 동안 자가용은 예약 없이 주차할 수 있지만{" "}
            <strong>15:00까지 들어와 17:00까지 나가야</strong> 합니다. 관광버스는 주차장 예약이 필요하며 14:00까지
            들어와 16:00까지 나가야 합니다. 노선버스로 간다면 <strong>15:20까지 마을에 도착하는</strong> 버스를
            타세요. 전망대로 가는 산책로는 15:45, 전망대는 16:10에 닫습니다. 협회는 마을 관람에 2~3시간, 주차는
            12:00까지를 권장합니다({OWN} 확인).
          </p>
          <p className={styles.bodyText}>
            다른 날 낮에 방문한다면 출발편과 버스 요금을{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={linkStyle}>
              다카야마와 시라카와고 투어 가이드(영어)
            </Link>
            에서 비교했습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANAZAWA_DAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              가나자와 출발 낮 투어 →
            </KlookLink>
            <KlookLink href={NAGOYA_DAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              나고야 출발 낮 투어 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="같은 여행에서 함께 예약"
          heading="시라카와고 야간 조명에 가기 전에 예약할 것"
          intro="야간 조명 버스, 버스가 출발하는 도시의 숙소, 이득이 된다면 철도 패스, 그리고 모바일 데이터입니다. 클룩 가격은 날짜에 따라 달라지므로, 여행 날짜의 요금은 상품 페이지에서 확인하세요."
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>날씨</span>
          <h2 className={styles.sectionTitle}>1월 밤의 시라카와고는 얼마나 추운가요?</h2>
          <p className={styles.bodyText}>
            관광협회 자체 수치로 야간 조명 시간대에 <strong>−10°C~0°C</strong>이며, 도로가 얼어 있습니다. 따뜻한
            외투, 방수 방한 부츠, 신발용 아이젠, 손전등을 챙기세요. 집과 집 사이의 길은 어둡습니다. 전망대에서는
            삼각대를 사용할 수 없고, 마을 전체에서 드론 비행이 금지되어 있습니다.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            아이와 함께 가도 괜찮을까요?
          </h3>
          <p className={styles.bodyText}>
            방한 준비를 하면 괜찮습니다. 노히 버스는 성인과 초등학생(어린이) 요금이 같고, 6세 미만은 좌석을 쓰지
            않으면 무료입니다. 호쿠리쿠 철도의 어린이 요금은 ¥16,500입니다. 전망대까지는 눈길을 올라가야 합니다.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            눈 때문에 취소되면 어떻게 되나요?
          </h3>
          <p className={styles.bodyText}>
            주차장 요금은 실행위원회가 행사를 취소한 경우에만 환불됩니다. 노히 버스는 눈 때문에 버스가 늦어지고
            마을에 머무는 시간이 짧아질 수 있다고 안내합니다. 클룩 투어의 날씨와 환불 규정은 상품 페이지에 있습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>숙소</span>
          <h2 className={styles.sectionTitle}>야간 조명을 보러 갈 때 어디에 묵어야 하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            야간 조명 버스가 출발하는 곳에 묵으세요. 노히 버스는 다카야마, 호쿠리쿠 철도는 가나자와, 클룩 버스는
            나고야입니다.
          </p>
          <Table head={["거점", "이유", "주의할 점"]} rows={stayRows.map((r) => [r.base, r.why, r.watch])} />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {OWN} —{" "}
            <a href="https://shirakawa-go.gr.jp/events/441/" target="_blank" rel="noopener">
              shirakawa-go.gr.jp
            </a>
            ,{" "}
            <a href="https://www.nouhibus.co.jp/shirakawa_lightup_2027/" target="_blank" rel="noopener">
              nouhibus.co.jp
            </a>
            ,{" "}
            <a href="https://www.hokutetsu.co.jp/news/shirakawago-lightup2027/" target="_blank" rel="noopener">
              hokutetsu.co.jp
            </a>
            . 시라카와고를 포함한 가나자와 이틀 일정은{" "}
            <Link href="/guides/attractions/kanazawa-2-day-itinerary" hrefLang="en" style={linkStyle}>
              가나자와 2일 일정(영어)
            </Link>
            에, 야간 조명 행사를 중심으로 짠 1월 여행 경로는{" "}
            <Link href="/ko/guides/attractions/japan-winter-itinerary" style={linkStyle}>
              일본 겨울 여행 일정
            </Link>
            에 정리했습니다.
          </p>
        </section>

        <KlookStayAreas
          heading="야간 조명 여행의 호텔 검색"
          intro="객실 요금과 예약 가능 여부는 날짜에 따라 달라지므로, 거점마다 해당 지역의 클룩 호텔 검색으로 연결했습니다."
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            입장 안내, 버스 픽업 메시지, 한파로 인한 취소 공지는 모두 온라인으로 옵니다.{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              클룩 eSIM 보기 →
            </KlookLink>{" "}
            도쿄에서 출발하나요? 신칸센 구간은{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en" style={linkStyle}>
              도쿄에서 가나자와 가는 방법 가이드(영어)
            </Link>
            에 있고,{" "}
            <Link href="/guides/transport/hokuriku-arch-pass" hrefLang="en" style={linkStyle}>
              호쿠리쿠 아치 패스 가이드(영어)
            </Link>
            에서는 도쿄와 오사카 사이에 가나자와를 넣을 때 7일 패스가 개별 승차권보다 저렴한지 계산했습니다.
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="자주 묻는 질문" />

        <KlookTourPicks
          heading="클룩의 시라카와고 투어"
          intro="나고야 출발 야간 조명 버스 2개와, 행사일이 아닌 날을 위한 낮 투어 2개입니다. 소요 시간, 픽업, 포함 사항은 각 상품 페이지에 있습니다."
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "다카야마와 시라카와고 투어: 어디서 출발할까(영어)" },
            { href: "/guides/attractions/kanazawa-2-day-itinerary", title: "가나자와 2일 일정: 가나자와와 시라카와고(영어)" },
            { href: "/ko/guides/attractions/japan-winter-itinerary", title: "일본 겨울 여행 12일 일정(2027): 일자별 코스" },
            { href: "/guides/transport/tokyo-to-kanazawa", title: "도쿄에서 가나자와까지 신칸센(영어)" },
            { href: "/guides/transport/hokuriku-arch-pass", title: "호쿠리쿠 아치 패스(영어)" },
            { href: "/guides/attractions/hokkaido-winter-tours", title: "삿포로 출발 홋카이도 겨울 투어(영어)" },
            { href: "/guides/attractions", title: "일본에서 즐길 거리 더 보기(영어) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>4일 저녁뿐, 당일 입장권은 없습니다</h2>
            <p className={styles.ctaBannerDesc}>
              날짜를 고르고, 묵는 도시에서 출발하는 야간 조명 버스를 예약하고, −10°C에 맞춰 옷을 준비하세요.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                야간 조명 투어 보기 →
              </KlookLink>
              <KlookLink href={KANAZAWA_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                가나자와 호텔 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
