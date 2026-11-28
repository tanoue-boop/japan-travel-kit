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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  jrHokkaidoRailPass,
  newChitoseAirportTransfers,
  newChitoseSapporoStayAreas,
  newChitoseSapporoTripPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/new-chitose-airport-to-sapporo) section by section as
// of 2026-11-28 (task jtk-20261128-TR03): same sections, table, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: 신치토세 공항 삿포로 가는 법 — the phrase Korean results use for this trip
// (sapporo.travel/ko "삿포로에 가기", jeepe.jp/ko, hokkaido-airports.com/ko), with 쾌속 에어포트
// as JR Hokkaido's Korean page and cotaru.co/ko name the train.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/transport/new-chitose-airport-to-sapporo";
const TITLE = "신치토세 공항 삿포로 가는 법 2026: 쾌속 에어포트";
const H1 = "신치토세 공항 삿포로 가는 법 2026: 열차와 버스, 요금, 시간";
const DESC =
  "신치토세 공항에서 삿포로까지 JR 쾌속 에어포트 37분 ¥1,230, 막차 23:21. 공항버스는 약 70분 ¥1,500입니다.";

const CHECKED = dateLabel("2026-11-28", LOCALE);
const JRP_CHECKED = dateLabel("2026-11-03", LOCALE);

const JR_AIRPORT_URL = "https://www.jrhokkaido.co.jp/airport/";
const JR_EN_URL = "https://www.jrhokkaido.co.jp/global/english/travel/airport.html";
const JR_FARE_URL = "https://www.jrhokkaido.co.jp/global/english/ticket/regular/";
const BUS_URL = "https://www.chuo-bus.co.jp/feature/airport";
const HOKUTO_URL = "https://www.hokto.co.jp/sapporo-chitose/";
const RENEWAL_URL = "https://www.hokto.co.jp/information/49138/";
const TAXI_URL = "https://www.hokto.co.jp/hire-chitose/";
const CTS_BUS_URL = "https://www.hokkaido-airports.com/en/new-chitose/access/bus/";

const TRANSFERS_URL = klookFor(newChitoseAirportTransfers.url, LOCALE);
const RAIL_PASS_URL = klookFor(jrHokkaidoRailPass.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>{label}</a>
);

type ModeRow = { mode: string; time: string; fare: string; service: string; snow: string; bags: string };

const modeRows: ModeRow[] = [
  {
    mode: "대부분에게 추천: JR 쾌속 에어포트",
    time: "삿포로까지 37분(특별쾌속은 최단 33분)",
    fare: "¥1,230, 지정석 U시트 차량은 ¥2,230",
    service: "9:00~16:00 1시간에 6편, 공항 출발 첫차 6:38, 막차 23:21",
    snow: "도로를 달리지 않아 교통 체증이 없습니다. JR이 운행을 중단하면 JR 홋카이도 공항 페이지에 운행 중단 시 안내가 나옵니다",
    bags: "최대 2개, 1개당 세 변의 합 250cm, 30kg까지. 직접 들어서 싣습니다",
  },
  {
    mode: "공항버스(호쿠토 교통, 홋카이도 주오버스)",
    time: "삿포로역 앞까지 약 70분, 도중에 스스키노와 오도리 정차",
    fare: "¥1,500(어린이 ¥750)",
    service: "국내선 터미널 출발 8:40~22:55, 약 10~20분 간격. 2026년 12월 11일부터 하루 83편",
    snow: "자동차와 같은 도로를 달립니다. 운영사는 소요 시간이 기준일 뿐이며 교통 체증으로 늦어질 수 있다고 안내합니다",
    bags: "캐리어는 트렁크에 싣습니다. 예약은 받지 않습니다",
  },
  {
    mode: "택시 승차장의 택시",
    time: "문 앞까지, 버스처럼 도로로 이동",
    fare: "미터 요금: 처음 1.4km ¥740, 이후 293m마다 ¥100. 겨울 20% 할증, 심야 20% 할증, 통행료 별도",
    service: "두 터미널 모두 승차장이 있고 시간과 관계없이 이용 가능",
    snow: "같은 도로를 달리며, 겨울 할증은 12월 10일~3월 26일에 적용됩니다",
    bags: "트렁크에 싣습니다. 왜건과 9인승 밴은 요청 시 이용",
  },
  {
    mode: "예약제 단독 차량(클룩)",
    time: "문 앞까지",
    fare: "차량 단위 요금. 이용 날짜의 가격은 상품 페이지에서 확인",
    service: "출국 전에 예약하면 기사가 항공편에 맞춰 마중",
    snow: "버스와 같은 도로를 달립니다",
    bags: "스키 가방이 있다면 차량 크기를 골라 예약",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "신치토세 공항에서 삿포로까지 어떻게 가나요?",
    a: `국내선 터미널 아래 역에서 JR 쾌속 에어포트를 타세요. 삿포로역까지 37분, ¥1,230이며 낮 시간대에는 1시간에 6편, 막차는 23:21입니다. 공항버스는 약 70분, ¥1,500이며 스스키노, 오도리, 삿포로역에 정차합니다. ${CHECKED} 확인.`,
  },
  {
    q: "신치토세 공항에서는 열차와 버스 중 무엇이 더 나은가요?",
    a: "빠르게 가고 싶거나 눈이 온다면 열차가 낫습니다. 버스보다 약 30분 빠르고 ¥270 저렴하며 도로 정체의 영향을 받지 않습니다. 호텔이 스스키노나 오도리의 버스 정류장 근처이거나, 캐리어가 무거워 들어 올리기 어렵다면 버스가 낫습니다. 버스는 캐리어를 트렁크에 싣습니다.",
  },
  {
    q: "삿포로까지 JR 패스나 홋카이도 레일패스를 쓸 수 있나요?",
    a: "네. 두 패스 모두 JR 홋카이도의 쾌속 에어포트에 사용할 수 있습니다. 홋카이도 레일패스는 미리 구매하면 5일 ¥22,000부터이므로, 같은 여행에서 오타루, 아사히카와, 하코다테 또는 니세코 방면으로도 JR을 탈 때만 이득입니다. 공항 구간만 타면 ¥1,230입니다. 공항버스는 민간 회사가 운행하므로 두 패스 모두 사용할 수 없습니다.",
  },
  {
    q: "신치토세 공항에서 삿포로로 가는 막차는 몇 시인가요?",
    a: `23:21 특별쾌속 에어포트입니다. JR 홋카이도가 늦은 항공편을 위해 운행하는 열차로, 항공편이 늦어져도 정시에 출발합니다. 국내선 터미널 출발 공항버스 막차는 22:55입니다. 그 이후에는 미터 요금 택시나 미리 예약한 차량을 이용해야 합니다. ${CHECKED} 확인.`,
  },
  {
    q: "신치토세 공항에서 삿포로까지 택시 요금은 얼마인가요?",
    a: "정액 요금을 공개한 택시 회사는 없습니다. 지토세 지역 택시는 미터 요금으로 처음 1.4km ¥740, 이후 293m마다 ¥100이며, 12월 10일~3월 26일에는 20%, 22:00~5:00에는 다시 20%가 추가되고 통행료는 별도입니다. 클룩에서 예약하는 차량은 출국 전에 차량 단위 요금이 정해집니다.",
  },
];

const tripPrepItems = [
  withKlookLocale(newChitoseSapporoTripPrep[0], LOCALE, {
    label: "삿포로역 주변 호텔",
    ctaLabel: "삿포로역 호텔 보기 →",
    why: "대부분의 쾌속 에어포트가 끝나는 역이자 공항버스 정류장이 있는 곳으로, 어느 쪽을 타도 눈길에서 캐리어를 끌고 걷는 거리가 가장 짧습니다.",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[1], LOCALE, {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "열차 시각, 버스 승강장 번호, 호텔까지 가는 길 모두 신치토세 공항 도착 로비를 나서는 순간부터 모바일 데이터가 필요합니다.",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[2], LOCALE, {
    label: "신치토세 공항 픽업(단독 차량, 합승)",
    ctaLabel: "신치토세 공항 픽업 보기 →",
    why: "차량 단위 요금으로 호텔 문 앞까지 갑니다. 스키 가방이 있거나 가족 여행이거나 23:21 막차 이후에 도착할 때 이용하세요.",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[3], LOCALE, {
    label: "JR 홋카이도 레일패스",
    ctaLabel: "JR 홋카이도 패스 가격 보기 →",
    why: "쾌속 에어포트에도 사용할 수 있지만 1회 ¥1,230이므로, 같은 여행에 오타루, 아사히카와, 하코다테 또는 니세코행 열차 일정이 있을 때만 이득입니다.",
  }),
];

const stayAreas = [
  withKlookLocale(newChitoseSapporoStayAreas[0], LOCALE, {
    area: "삿포로역",
    why: "쾌속 에어포트가 이 역에서 끝나고 공항버스도 삿포로역 앞에 정차하므로, 역 근처 숙소라면 캐리어를 들고 다시 이동할 필요가 없습니다.",
  }),
  withKlookLocale(newChitoseSapporoStayAreas[1], LOCALE, {
    area: "스스키노",
    why: "공항버스는 오도리와 삿포로역보다 먼저 미나미 3조 스스키노에 정차합니다. 2026년 12월 11일부터는 돌아가는 길에 스스키노에서 공항까지 약 62분 걸리는 직행 버스도 생깁니다.",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "신치토세 공항 삿포로 가는 법" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
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
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map((c, j) => (
                  <td key={j} className={j === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {c}
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

const note = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function KoNewChitoseAirportToSapporoPage({ updated }: { updated: PageUpdated }) {
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
            신치토세 공항에서 삿포로 시내까지 JR 쾌속 에어포트, 공항버스, 택시, 예약제 차량을 비교합니다. 요금, 첫차와 막차, 눈 오는 날에 무엇을 타야 하는지까지 정리했습니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "JR 홋카이도와 버스 회사의 공식 요금", "클룩 가격은 날짜별로 확인"].map((t) => (
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
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>가장 빠른 방법</p>
                <p className={styles.verdictStatValue}>JR, 37분, ¥1,230</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>캐리어를 트렁크에</p>
                <p className={styles.verdictStatValue}>버스, 약 70분, ¥1,500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>막차</p>
                <p className={styles.verdictStatValue}>열차 23:21(버스 22:55)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>신치토세 공항에서 삿포로</strong>까지는 <strong>JR 쾌속 에어포트</strong>로 삿포로역까지 <strong>37분</strong>, 요금은 <strong>¥1,230</strong>입니다. 낮 시간대에는 1시간에 6편이 운행하고 막차는 <strong>23:21</strong>입니다. <strong>공항버스</strong>는 삿포로역 앞까지 약 <strong>70분</strong>, <strong>¥1,500</strong>이며 스스키노와 오도리에 정차하고 캐리어는 트렁크에 싣습니다. 택시는 미터 요금으로 처음 1.4km가 ¥740이고 12월 10일~3월 26일에는 20%가 더해지므로, 호텔 문 앞까지 정해진 요금으로 가고 싶다면 출국 전에 단독 차량을 예약하세요. JR 홋카이도, 호쿠토 교통, 홋카이도 주오버스 기준이며 {CHECKED}에 확인했습니다.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              스키장으로 바로 간다면{" "}
              <Link href="/guides/transport/sapporo-to-niseko-transfer" style={linkStyle}>
                겨울철 삿포로에서 니세코 가는 법(영어)
              </Link>
              에서 공항 출발 스키 버스를 확인하세요.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                신치토세 공항 픽업 보기 →
              </KlookLink>
              <KlookLink href={RAIL_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                JR 홋카이도 레일패스 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>모든 방법</span>
          <h2 className={styles.sectionTitle}>신치토세 공항에서 삿포로까지 어떻게 가나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            대부분은 JR 쾌속 에어포트를 타면 됩니다. 국내선 터미널 바로 아래 역에서 출발해 37분, ¥1,230입니다. 교통수단별로 한 행씩 성인 편도 요금으로 정리했으며, 첫 행이 추천 방법입니다.
          </p>
          <SimpleTable
            head={["교통수단", "소요 시간", "성인 요금", "운행", "눈 오는 날", "수하물"]}
            rows={modeRows.map((r) => [r.mode, r.time, r.fare, r.service, r.snow, r.bags])}
          />
          <p className={styles.bodyText} style={note}>
            최종 확인: 2026-11-28. 출처: {ext(JR_AIRPORT_URL, "JR 홋카이도 쾌속 에어포트")}, {ext(JR_EN_URL, "JR 홋카이도 공항 이동 안내(영어)")}, {ext(JR_FARE_URL, "JR 홋카이도 운임")}, {ext(BUS_URL, "홋카이도 주오버스 공항버스 시각표")}, {ext(HOKUTO_URL, "호쿠토 교통 삿포로 도심선")}, {ext(TAXI_URL, "호쿠토 교통 지토세 택시 요금")}, {ext(CTS_BUS_URL, "신치토세 공항 버스 승강장")}. 버스 시각은 국내선 터미널(ANA 쪽) 기준이며, 국제선 터미널 정류장은 약 6분 뒤입니다. 6~11세 어린이는 JR을 반액으로 탑니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>열차와 버스</span>
          <h2 className={styles.sectionTitle}>신치토세 공항에서는 열차와 버스 중 무엇이 더 나은가요?</h2>
          <p className={styles.bodyText}>
            캐리어 때문에 버스를 타야 하는 경우가 아니라면 열차가 낫습니다. 쾌속 에어포트는 버스보다 약 30분 빠르고 ¥270 저렴하며, 고속도로가 아니라 선로를 달리기 때문에 눈 오는 저녁에도 도로 정체의 영향을 받지 않습니다. 6량 중 5량은 티켓 없이 IC 카드로 개찰구를 통과해 탈 수 있고, 4호차는 지정석 U시트(추가 ¥1,000, 티켓리스 ¥800)로 큰 캐리어를 둘 공간이 있습니다. JR 홋카이도는 1개당 세 변의 합 250cm, 30kg 이하의 짐을 2개까지 차내에 반입할 수 있다고 안내합니다. 캐리어를 들어 올리기 어렵다면 트렁크에 싣는 버스가 낫고, 호텔이 스스키노나 오도리 공원 근처라면 삿포로역 앞보다 먼저 정차하는 버스가 편합니다. 두 버스 회사 모두 시각표의 소요 시간은 기준일 뿐 교통 상황에 따라 늘어날 수 있다고 안내하며, 호쿠토 교통은 2026년 11월 22일 차량 정비를 강화하는 동안 일부 편이 운행 중단될 수 있다고 공지했습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              단독 차량 보기 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>12월 11일부터</span>
          <h2 className={styles.sectionTitle}>이번 겨울 공항버스는 무엇이 달라지나요?</h2>
          <p className={styles.bodyText}>
            운행 편수가 늘고 노선이 단순해지며, 요금은 그대로입니다. 2026년 12월 11일부터 호쿠토 교통과 주오버스는 삿포로 도심선을 두 노선으로 나눕니다. 공항 출발 하루 72편의 <strong>삿포로역 앞·스스키노</strong> 노선과 하루 11편의 <strong>도심 호텔 순환</strong> 노선입니다. 호텔 순환 노선은 공항에서 대략 12:30~19:30에 출발하며 게이오 플라자, 그랜드 메르큐르 등의 호텔과 나카지마 공원에 정차합니다. 공항 방면에는 삿포로 미나미 IC를 경유해 약 1시간 2분 걸리는 <strong>스스키노 직행</strong>이 새로 생깁니다. 겨울에 스스키노에서 버스가 만석이 되어 뒤쪽 정류장의 승객이 타지 못하던 날을 위한 노선입니다. 성인 요금은 ¥1,500 그대로이며(기요타 지역 정류장은 ¥1,400), 현금, 비접촉식 결제 신용카드, PayPay로 낼 수 있습니다. 예약은 받지 않습니다.
          </p>
          <p className={styles.bodyText} style={note}>
            최종 확인: 2026-11-28. 출처: {ext(RENEWAL_URL, "호쿠토 교통 보도자료(2026년 10월 21일)")}, {ext(BUS_URL, "홋카이도 주오버스 시각표")}.
          </p>
        </section>

        <KlookTripPrep
          label="도착 전에 예약"
          heading="신치토세 공항으로 떠나기 전에 무엇을 예약해야 하나요?"
          intro="삿포로역 근처 숙소, 모바일 데이터, 그리고 스키 가방이 있거나 늦게 도착한다면 차량입니다. 클룩 가격은 날짜에 따라 달라지므로 상품 페이지에서 이용 날짜의 가격을 확인하세요."
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>철도 패스</span>
          <h2 className={styles.sectionTitle}>삿포로까지 JR 패스나 홋카이도 레일패스를 쓸 수 있나요?</h2>
          <p className={styles.bodyText}>
            네. 쾌속 에어포트는 JR 홋카이도 열차이므로 두 패스 모두 사용할 수 있지만, 민간 회사가 운행하는 공항버스에는 쓸 수 없습니다. 패스가 이득인지는 따로 따져 봐야 합니다.{" "}
            <Link href="/guides/transport/hokkaido-rail-pass" style={linkStyle}>
              홋카이도 레일패스(영어)
            </Link>
            는 미리 구매하면 5일 ¥22,000(JR 홋카이도, {CHECKED})이고 공항 구간은 편도 ¥1,230이므로, 오타루, 아사히카와, 하코다테, 또는 오타루를 거쳐 니세코 방면으로 가는 열차처럼 JR을 오래 타는 날이 있어야 이득입니다. 전국 JAPAN RAIL PASS는 7일 ¥53,000({JRP_CHECKED})으로, 같은 주에 혼슈에서 신칸센을 탈 때만 의미가 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={RAIL_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR 홋카이도 레일패스 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>늦은 도착과 눈 오는 날</span>
          <h2 className={styles.sectionTitle}>늦게 도착하거나 눈이 오면 어떻게 하나요?</h2>
          <p className={styles.bodyText}>
            두 시각을 기준으로 계획하세요. 국내선 터미널 출발 공항버스 막차는 <strong>22:55</strong>, 열차 막차인 특별쾌속 에어포트는 <strong>23:21</strong>입니다. JR 홋카이도는 늦은 항공편을 위해 이 열차를 운행하지만, 항공편이 지연되어도 시각표대로 출발한다고 안내합니다. 눈이 올 때는 도로를 달리지 않는 열차가 더 안전하며, JR이 운행을 중단하면 공항 페이지에서 다른 이동 방법을 안내합니다. 막차 이후에는 승차장에서 미터 요금 택시를 타거나(12월 10일부터 겨울 할증 20%, 22:00~5:00에는 20% 추가, 통행료 별도) 미리 예약한 차량을 이용해야 합니다.{" "}
            <Link href="/ko/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>
              삿포로 눈축제
            </Link>
            로 도시가 붐비는 2월에는 숙소부터 예약하세요. 스키 가방을 들고 스키장까지 바로 간다면{" "}
            <Link href="/guides/transport/sapporo-to-niseko-transfer" style={linkStyle}>
              니세코 이동편(영어)
            </Link>
            도 같은 공항에서 출발합니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              신치토세 공항 차량 예약 →
            </KlookLink>
          </div>
        </section>

        <KlookStayAreas
          heading="삿포로 도착 후 어디에 묵어야 하나요?"
          intro="열차는 삿포로역에서 끝나고 버스는 스스키노, 오도리, 삿포로역에 정차합니다. 예약 가능 여부와 가격은 날짜에 따라 달라지므로 지역마다 클룩 호텔 검색으로 연결했습니다."
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>다음 일정</span>
          <h2 className={styles.sectionTitle}>공항 다음 일정은 어떻게 짜나요?</h2>
          <p className={styles.bodyText}>
            도시에서 보내는 3일은{" "}
            <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>
              삿포로 3일 일정(영어)
            </Link>
            , 섬을 도는 1주일은{" "}
            <Link href="/ko/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>
              홋카이도 7일 일정
            </Link>
            에 정리했습니다. 삿포로 호텔에서 출발하는 스키 당일치기는{" "}
            <Link href="/guides/attractions/sapporo-ski-day-trip" style={linkStyle}>
              삿포로 스키 당일치기(영어)
            </Link>
            , 캐리어를 들고 다니지 않고 먼저 보내려면{" "}
            <Link href="/guides/transport/japan-luggage-delivery" style={linkStyle}>
              일본 수하물 배송(영어)
            </Link>
            을 참고하세요.
          </p>
        </section>

        <BookingEsimCard lead="열차 시각, 버스 승강장, 호텔 지도까지. 신치토세 공항에 도착하기 전에 모바일 데이터를 준비하세요." />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/transport/sapporo-to-niseko-transfer", title: "겨울철 삿포로에서 니세코 가는 법: 스키 버스, 열차, 픽업(영어)" },
            { href: "/guides/attractions/sapporo-3-day-itinerary", title: "삿포로 3일 일정(영어)" },
            { href: "/guides/transport/hokkaido-rail-pass", title: "홋카이도 레일패스(2026): 가격과 이득인 경우(영어)" },
            { href: "/ko/guides/attractions/sapporo-snow-festival-tours", title: "삿포로 눈축제 투어" },
            { href: "/ko/guides/attractions/hokkaido-7-day-itinerary", title: "홋카이도 7일 일정" },
            { href: "/guides/attractions/sapporo-ski-day-trip", title: "삿포로 스키 당일치기(영어)" },
            { href: "/guides/transport/japan-luggage-delivery", title: "일본 수하물 배송(영어)" },
            { href: "/ko", title: "한국어 가이드 전체 보기 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>신치토세 공항에서 삿포로까지 한 번에</h2>
            <p className={styles.ctaBannerDesc}>
              쾌속 에어포트를 타거나, 스키 가방이 있거나 늦게 도착한다면 차량을 예약하세요. 첫날 밤 숙소는 삿포로역 근처로 정해 두세요.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                신치토세 공항 픽업 보기 →
              </KlookLink>
              <KlookLink href={stayAreas[0].url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                삿포로역 호텔 보기 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
