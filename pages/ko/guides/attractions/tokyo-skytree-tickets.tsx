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
import { koFujiHakoneDayTour, koSkytreeTicket } from "../../../../lib/klook-links-ko";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/ko/guides/attractions/tokyo-skytree-tickets";
const TITLE = "도쿄 스카이트리 티켓(2026): 요금과 예약";
const DESC =
  "도쿄 스카이트리 티켓 2026: 플로어 350 ¥1,800부터, 350+450 콤보 ¥3,000부터, 당일 구매는 1장당 ¥500 추가.";

// Every figure comes from lib/attraction-prices.ts and the English guide that read
// it off tokyo-skytree.jp. Nothing was re-checked or added for this edition.
const P = PRICES.tokyoSkytree;
const CHECKED = dateLabel(P.checked, "ko");
// "from ¥1,800" -> "¥1,800부터": same figure, Korean qualifier. See lib/i18n.ts.
const ADULT = priceLabel(P.adult, "ko");
const CHILD = priceLabel(P.child, "ko");

const priceRows = [
  { ticket: "플로어 350 — 성인(만 15세 이상)", advance: ADULT, sameDay: "서비스 수수료 ¥500 추가" },
  { ticket: "플로어 350 — 어린이(만 6~14세)", advance: CHILD, sameDay: "서비스 수수료 ¥500 추가" },
  { ticket: "350+450 콤보 — 성인", advance: "¥3,000부터", sameDay: "서비스 수수료 ¥500 추가" },
  { ticket: "350+450 콤보 — 어린이", advance: "¥1,500부터", sameDay: "서비스 수수료 ¥500 추가" },
  { ticket: "현장에서 플로어 450 추가 — 성인", advance: "온라인 판매 없음", sameDay: "¥1,400" },
  { ticket: "현장에서 플로어 450 추가 — 어린이", advance: "온라인 판매 없음", sameDay: "¥700" },
  { ticket: "만 5세 이하", advance: "무료", sameDay: "무료" },
];

const deckRows = [
  {
    deck: "도쿄 스카이트리",
    height: "플로어 350・플로어 450",
    price: `플로어 350 ${ADULT}・콤보 ¥3,000부터`,
    highlight: "도쿄에서 가장 높은 전망대이고, 유리 스카이워크는 여기뿐입니다",
    area: "오시아게／도쿄 스카이트리역",
  },
  {
    deck: "시부야 스카이",
    height: "약 229m 루프톱",
    price: "온라인 사전 ¥2,500",
    highlight: "스크램블 교차로 위의 야외 루프톱 — 높이보다 사진",
    area: "시부야역",
  },
  {
    deck: "도쿄 타워",
    height: "약 150m・약 250m 전망대",
    price: "약 ¥3,300(톱 데크 투어)",
    highlight: "1958년의 랜드마크, 그리고 스카이트리가 보이는 전망",
    area: "시바공원／아카바네바시",
  },
  {
    deck: "도쿄도청 전망대",
    height: "약 202m",
    price: "무료",
    highlight: "티켓이 아예 없습니다 — 도쿄에서 가성비가 가장 좋은 파노라마",
    area: "신주쿠",
  },
];

const whoFor = [
  {
    title: "플로어 350만으로 충분한 경우",
    desc: `전망만 보면 되는 경우입니다. 플로어 350은 3층 구조의 메인 전망대이고, 여기만으로도 간토 평야가 전부 보입니다. 성인 ${ADULT}로, 도쿄의 주요 유료 전망대 중 높이당 가격이 가장 저렴합니다.`,
  },
  {
    title: "플로어 450을 추가할 경우",
    desc: "높이 자체가 목적인 경우입니다. 플로어 450은 덴보 갤러리아로, 타워에서 올라갈 수 있는 가장 높은 지점까지 비스듬히 올라가는 유리 스카이워크입니다. 온라인 콤보는 ¥3,000부터이고, 현장에서 추가하면 플로어 350 티켓 위에 ¥1,400이 더 붙습니다.",
  },
  {
    title: "늦은 시간대를 고를 경우",
    desc: `지평선보다 야경을 원하는 경우입니다. 공식 사이트 확인일 ${CHECKED} 기준으로 전망대는 22:00까지 운영하고 마지막 입장은 21:00이었습니다. 낮 시간대가 마감된 뒤에도 남아 있는 쪽은 늦은 회차입니다.`,
  },
];

const steps = [
  {
    title: "예약 전에 플로어 350인지 콤보인지 정합니다",
    desc: "플로어 450은 온라인 콤보(성인 ¥3,000부터)로 사는 쪽이, 당일 플로어 350 티켓 위에 얹는 쪽(¥1,400 추가)보다 저렴합니다. 스카이워크에 올라갈 가능성이 조금이라도 있으면 처음부터 콤보로 사세요.",
  },
  {
    title: "날짜 지정 티켓을 온라인으로 예약합니다",
    desc: `공식 사이트는 위의 '부터' 가격으로 날짜 지정 티켓을 팔고, 실제 날짜의 금액은 더 높을 수 있습니다. 당일 4층 창구나 편의점에서 사면 티켓 1장당 ¥500의 서비스 수수료가 붙습니다. 미리 예약해야 하는 이유 중 가장 분명한 것입니다. 확인일 ${CHECKED}.`,
  },
  {
    title: "해외 발급 카드라면 판매 파트너를 씁니다",
    desc: "클룩은 같은 시간 지정 입장권을 한국어 화면과 전자 티켓으로 팝니다. 일본 공식 예매 사이트에서 카드와 언어 때문에 막히는 경우를 피할 수 있고, 같은 상품 페이지에 플로어 450 콤보도 있습니다.",
  },
  {
    title: "일반 운영 시간이 아니라 본인 날짜의 시간을 확인합니다",
    desc: `스카이트리는 날짜별 달력을 공개하고 '운영 시간은 사전 공지 없이 변경될 수 있다'고 분명히 적고 있습니다. 마지막 입장은 폐관 1시간 전입니다. 확인일 ${CHECKED} 기준으로 전망대는 10:00–22:00, 마지막 입장은 21:00이었습니다.`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도쿄 스카이트리 티켓은 얼마인가요?",
    a: `공식 사이트의 날짜 지정 티켓은 메인 전망대인 플로어 350이 성인(만 15세 이상) ${ADULT}, 만 6~14세 어린이 ${CHILD}입니다. 플로어 350과 450을 함께 쓰는 콤보 티켓은 성인 ¥3,000부터, 어린이 ¥1,500부터입니다. 만 5세 이하는 무료입니다. 모두 '부터' 가격이라 특정 날짜의 금액은 더 높을 수 있습니다. 공식 사이트 확인일 ${CHECKED}.`,
  },
  {
    q: "도쿄 스카이트리 티켓은 미리 사는 게 더 싼가요?",
    a: `더 쌉니다. 그리고 수요에 따라 변하는 문제가 아니라 공개된 금액 차이입니다. 당일 4층 매표 창구나 편의점에서 사면 입장료 위에 티켓 1장당 ¥500의 서비스 수수료가 붙습니다. 4인 가족이면 ¥2,000을 피할 수 있는 비용으로 내는 셈입니다. 공식 사이트든 판매 파트너든 날짜 지정 티켓을 온라인으로 예약하면 수수료와 창구 줄을 모두 건너뜁니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "플로어 350과 플로어 450의 차이는 무엇인가요?",
    a: "플로어 350은 덴보 데크로, 3층 구조의 메인 전망층이고 모든 티켓에 포함됩니다. 플로어 450은 덴보 갤러리아로, 타워에서 올라갈 수 있는 가장 높은 지점까지 비스듬히 올라가는 유리벽 스카이워크입니다. 플로어 450만 따로 볼 수는 없습니다. 먼저 플로어 350 티켓이 있어야 하고, 온라인 콤보로 묶거나 현장 발매기에서 성인 ¥1,400을 추가해야 합니다.",
  },
  {
    q: "플로어 450 티켓을 온라인으로 살 수 있나요?",
    a: `단독 티켓으로는 살 수 없습니다. 공식 사이트는 플로어 450을 콤보 티켓으로만 팝니다. 플로어 350 티켓으로 도착한 뒤 마음이 바뀌면 현장 발매기에서 성인 ¥1,400, 만 6~14세 어린이 ¥700으로 추가합니다. 온라인 콤보가 더 싼 경로입니다. 성인 기준 ¥3,000부터인 반면, 두 단계로 나눠 사면 ¥1,800에 ¥1,400을 더하게 됩니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "도쿄 스카이트리 운영 시간은 어떻게 되나요?",
    a: `스카이트리는 고정 시간표가 아니라 날짜별 달력으로 운영하고, 공식 사이트도 '운영 시간은 사전 공지 없이 변경될 수 있다'와 마지막 입장이 폐관 1시간 전이라는 점을 적어 두었습니다. 확인일 ${CHECKED} 기준으로 전망대는 10:00–22:00, 마지막 입장은 21:00이었습니다. 저녁 일정을 여기에 맞춰 짜기 전에 본인 날짜로 달력을 확인하세요.`,
  },
  {
    q: "도쿄 스카이트리와 시부야 스카이 중 어디가 좋나요?",
    a: "서로 다른 질문에 답하는 곳입니다. 스카이트리는 높이와 시야입니다. 플로어 350과 450은 도쿄에서 가장 높은 전망대이고, 간토 평야 전체가 보이며 맑은 날에는 후지산도 들어옵니다. 시부야 스카이는 사진입니다. 스크램블 교차로 바로 위 약 229m의 야외 루프톱으로, 일몰이 가장 좋고 높이보다 분위기입니다. 하나만 고른다면 파노라마는 스카이트리, 누구나 아는 그 한 장은 시부야 스카이입니다.",
  },
  {
    q: "도쿄 스카이트리에서 후지산이 보이나요?",
    a: "맑은 날에는 보입니다. 높이 덕분에 도쿄의 어느 전망대보다 확률이 높습니다. 다만 전적으로 날씨에 달려 있고, 서늘하고 건조한 달과 이른 시간대가 더 유리한 편입니다. 특정 날짜에 보인다는 보장은 없으니, 후지산 전망만을 위해 콤보 요금을 낼 생각이라면 기억해 두세요.",
  },
  {
    q: "도쿄 스카이트리에 어떻게 가나요?",
    a: "타워는 도부 스카이트리라인의 도쿄 스카이트리역과, 도쿄메트로 한조몬선・도에이 아사쿠사선・게이세이 오시아게선이 지나는 오시아게역 위에 있습니다. 오시아게는 도쿄 서브웨이 티켓 범위에 들어가므로 그 패스를 이미 쓰고 있다면 이동에 추가 비용이 없습니다. 아사쿠사는 아사쿠사선으로 두 정거장이라 오후 한 번에 묶기 쉽습니다.",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "도쿄 스카이트리 티켓" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoTokyoSkytreePage({ updated }: { updated: PageUpdated }) {
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
            도쿄 스카이트리 티켓(2026):<br />요금, 플로어 350과 450, 예약 방법
          </h1>
          <p className={styles.heroSubtitle}>
            도쿄에서 가장 높은 전망대이고, 당일 구매에 공개된 벌금이 붙는 거의 유일한 명소입니다. 공식 요금,
            플로어 450이 실제로 더해 주는 것, 그리고 해외에서 예약하는 방법.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 요금", "플로어 350 vs 450"].map((t) => (
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
                <p className={styles.verdictStatLabel}>플로어 350(성인)</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>350+450 콤보</p>
                <p className={styles.verdictStatValue}>¥3,000부터</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>당일 구매</p>
                <p className={styles.verdictStatValue}>1장당 ¥500 추가</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>만 5세 이하</p>
                <p className={styles.verdictStatValue}>무료</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>결론:</strong> 날짜 지정 티켓을 온라인으로 예약하세요. 스카이트리는 당일 창구에서
              티켓 1장당 ¥500의 서비스 수수료를 받으므로, 사전 예약이 운이 아니라 공개된 금액만큼 더
              저렴합니다. 플로어 450 스카이워크에 올라갈 가능성이 있으면 처음부터 콤보로 사세요. 나중에
              현장에서 추가하면 ¥1,400이 더 듭니다. 가격은 공식 사이트에서 읽었고 확인일은 {CHECKED}입니다.
            </p>
            <KlookLink href={koSkytreeTicket.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              도쿄 스카이트리 티켓 보기 →
            </KlookLink>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>무엇을 사는가</span>
          <h2 className={styles.sectionTitle}>티켓이 포함하는 범위</h2>
          <p className={styles.bodyText}>
            도쿄 스카이트리는 서로 다른 두 층의 입장권을 팝니다. <strong>플로어 350</strong>은 덴보 데크로,
            3층 구조의 전망층이고 모든 티켓에 포함됩니다. <strong>플로어 450</strong>은 덴보 갤러리아로,
            타워에서 올라갈 수 있는 가장 높은 지점까지 비스듬히 올라가는 유리벽 스카이워크이며, 단독으로는
            갈 수 없습니다.
          </p>
          <p className={styles.bodyText}>
            혼란은 대부분 이 두 층 구조에서 나옵니다. 두 층을 온라인에서 함께 사는지, 당일 따로 사는지에
            따라 가격이 달라지기 때문입니다. 아래 표가 두 경로를 나란히 둡니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금</span>
          <h2 className={styles.sectionTitle}>도쿄 스카이트리 티켓 가격</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓", "온라인 날짜 지정", "당일"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.advance}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            도쿄 스카이트리 공식 사이트에서 읽었고 확인일은 {CHECKED}입니다. 공식 페이지는 이 금액들을
            &lsquo;부터&rsquo; 가격으로 표기하므로 특정 날짜의 금액은 더 높을 수 있습니다. 결제 시점에
            확인하세요. ¥500 당일 서비스 수수료는 4층 창구와 편의점에서 티켓 1장마다 붙습니다.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>어느 티켓</span>
          <h2 className={styles.sectionTitle}>플로어 350, 콤보, 아니면 늦은 회차?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>나란히 비교</span>
          <h2 className={styles.sectionTitle}>스카이트리 vs 도쿄의 다른 전망대</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            스카이트리는 높이를 고르는 선택입니다. 원하는 것이 스크램블 교차로 사진이라면{" "}
            <Link href="/ko/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              시부야 스카이
            </Link>
            가 더 맞고, 돈을 전혀 쓰지 않고 도시 파노라마만 보고 싶다면 신주쿠의 도쿄도청 전망대는 무료입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["전망대", "높이", "요금(대략)", "특징", "지역"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            스카이트리와 시부야 스카이의 숫자는 운영사 공식 사이트 기준입니다. 도쿄 타워와 도쿄도청은
            대략값이고 변경될 수 있습니다. 결제 시점에 확인하세요.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>예약 절차</span>
          <h2 className={styles.sectionTitle}>도쿄 스카이트리 티켓 예약 방법</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            예약을 결정했다면{" "}
            <KlookLink href={koSkytreeTicket.url} target="_blank" rel={KLOOK_REL}>
              클룩에서 스카이트리 회차와 가격 보기 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>교통</span>
          <h2 className={styles.sectionTitle}>도쿄 스카이트리 위치</h2>
          <p className={styles.bodyText}>
            가는 길은 쉬운 쪽입니다. 타워가 역 위에 그대로 서 있습니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>도쿄 스카이트리역</strong>(도부 스카이트리라인) — 타워 바로 아래입니다.</li>
            <li><strong>오시아게역</strong> — 도쿄메트로 한조몬선, 도에이 아사쿠사선, 게이세이 오시아게선.</li>
            <li>오시아게는 지하철역이라 도쿄 서브웨이 티켓 범위에 들어갑니다. 그 패스를 쓰고 있다면 추가 비용이 없습니다.</li>
            <li>아사쿠사는 아사쿠사선으로 두 정거장입니다. 오후 한 번에 두 곳을 묶기 쉽습니다.</li>
          </ul>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>남은 하루</span>
          <h2 className={styles.sectionTitle}>전망대는 한두 시간, 나머지는?</h2>
          <p className={styles.bodyText}>
            스카이트리 회차는 한두 시간이라 보통 다른 일정과 하루를 공유합니다. 도쿄 일정에 아직 비어 있는
            하루가 있다면, 후지산과 하코네 1일 투어는 도쿄에서 출발해 그날 저녁에 돌아오고 티켓과 같은 클룩
            계정에서 결제됩니다.
          </p>
          <KlookLink href={koFujiHakoneDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta} style={{ marginTop: "0.5rem", display: "inline-block" }}>
            {koFujiHakoneDayTour.label} 보기 →
          </KlookLink>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법" },
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 예약(2026): 티켓 가격, 입장 시간, 보더리스와 비교" },
            { href: "/ko/guides/attractions/teamlab-borderless-tickets", title: "팀랩 보더리스 티켓(2026): 가격, 지정 시간 입장, 구매 경로" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드・씨 선택" },
            { href: "/ko/guides/esim/best-esim-japan", title: "일본 이심 추천(2026): eSIM 요금제 비교와 클룩 일본 eSIM" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>창구에서 더 받기 전에 예약하세요</h2>
            <p className={styles.ctaBannerDesc}>
              당일 티켓에는 1인당 ¥500의 서비스 수수료가 붙습니다. 온라인으로 예약한 날짜 지정 티켓은
              수수료와 줄을 모두 건너뜁니다. 클룩은 한국어 화면으로 결제하고 전자 티켓을 휴대폰에 바로 받습니다.
            </p>
            <KlookLink href={koSkytreeTicket.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              도쿄 스카이트리 티켓 보기 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
