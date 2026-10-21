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
import { koUsjExpressPass, koUsjStudioPass } from "../../../../lib/klook-links-ko";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, monthLabel } from "../../../../lib/i18n";

const ROUTE = "/ko/guides/attractions/usj-tickets-express-pass";
const TITLE = "유니버설 스튜디오 재팬 익스프레스 패스(2026): 티켓은 어떤 것을 살까";
const DESC =
  "USJ는 이제 온라인 판매만 하고, 슈퍼 닌텐도 월드는 시간 지정 입장이 필요합니다. 스튜디오 패스의 날짜별 가격 " +
  "체계, 익스프레스 패스가 값을 하는지, 2026년에 무엇을 사야 하는지. 내용은 영어판과 같은 사실입니다.";

// Same facts as the English guide: USJ prices by date tier and we deliberately
// quote no figure, because none could be verified for a given date.
const ticketRows = [
  { ticket: "1일 스튜디오 패스", what: "하루 입장 자격. 일반 어트랙션은 일반 줄", price: "날짜별 등급 — 예약 시 확인" },
  { ticket: "2일 스튜디오 패스", what: "연속 2일 입장, 하루 평균 금액은 보통 더 저렴", price: "날짜별 등급 — 예약 시 확인" },
  { ticket: "익스프레스 패스(추가 구매)", what: "지정 어트랙션 줄 건너뛰기＋슈퍼 닌텐도 월드 시간 지정 입장", price: "변동, 추가 금액이 작지 않습니다 — 예약 시 확인" },
];

const expressRows = [
  { pass: "익스프레스 패스 4", rides: "지정 어트랙션 약 4개", snw: "보통 슈퍼 닌텐도 월드 시간 지정 입장 포함(회차에 따라 다름)", bestFor: "일정이 짧고 핵심 어트랙션만 노리는 경우" },
  { pass: "익스프레스 패스 7", rides: "지정 어트랙션 약 7개", snw: "보통 슈퍼 닌텐도 월드 시간 지정 입장 포함", bestFor: "가장 인기 — 붐비는 주말과 연휴" },
  { pass: "익스프레스 패스 8・프리미엄", rides: "포함 범위가 가장 넓습니다", snw: "슈퍼 닌텐도 월드 시간 지정 입장 포함", bestFor: "가장 붐비는 날과 25주년 기간" },
];

const whoFor = [
  {
    title: "비수기 평일에 가는 사람",
    desc: "한가한 평일을 고르고 일정에 여유가 있다면 스튜디오 패스만으로 충분할 수 있습니다. 슈퍼 닌텐도 월드는 공식 USJ 앱으로 무료 지역 정리권을 받고, 나머지 어트랙션은 일반 줄로 탑니다.",
  },
  {
    title: "주말・연휴에 가는 사람",
    desc: "주말, 연휴, 그리고 2026년 내내 이어지는 25주년 기간에는 인기 어트랙션 일반 대기가 180~240분까지 갈 수 있습니다. 스튜디오 패스에 익스프레스 패스 7을 더하는 쪽이 핵심 어트랙션을 실제로 타고 슈퍼 닌텐도 월드 입장을 확보하는 방법입니다.",
  },
  {
    title: "하루만 있고 전부 보고 싶은 사람",
    desc: "하루밖에 없는데 대형 어트랙션과 슈퍼 닌텐도 월드까지 훑고 싶다면 익스프레스 패스 7이나 8이 그 차액을 할 만합니다. 사실상 줄에서 쓸 시간을 돈으로 되사는 것입니다.",
  },
];

const steps = [
  {
    title: "출발 전에 스튜디오 패스를 온라인으로 삽니다",
    desc: "2025년 5월부터 USJ는 게이트에서 당일권을 팔지 않으므로 온라인 구매가 사실상 필수입니다. 클룩은 USJ의 공식 파트너로 화면이 한국어이고 해외 발행 신용카드도 지원합니다.",
  },
  {
    title: "익스프레스 패스가 정말 필요한지 판단합니다",
    desc: "입장 날짜를 예상 혼잡도와 맞춰 보세요. 주말, 연휴, 기념 기간에는 익스프레스 패스 추가를 권하고, 한가한 평일에는 없어도 될 수 있습니다.",
  },
  {
    title: "슈퍼 닌텐도 월드 입장 방법을 정리합니다",
    desc: "붐비는 날 슈퍼 닌텐도 월드는 시간 지정 입장으로 운영됩니다. 슈퍼 닌텐도 월드 시간 지정 입장이 포함된 익스프레스 패스는 입장을 확보해 줍니다. 그게 아니면 입장 후에 공식 USJ 앱으로 무료 지역 정리권을 받으세요.",
  },
  {
    title: "개장 전에 도착합니다",
    desc: "붐비는 날에는 공지보다 일찍 문을 열 수 있습니다. 30~60분 일찍 도착하면 슈퍼 닌텐도 월드 시간 지정권을 받기 쉽고 일반 줄도 한 바퀴 먼저 돌 수 있습니다.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "USJ 티켓은 꼭 미리 사야 하나요?",
    a: "그렇습니다. 2025년 5월부터 유니버설 스튜디오 재팬은 게이트에서 당일권 판매를 중단했으므로 출발 전에 온라인으로 구매해야 합니다. 클룩 같은 공식 파트너를 통해 예약하면 화면이 한국어이고 해외 발행 신용카드를 받으며, 입장할 때 스캔하는 전자 티켓을 발송합니다.",
  },
  {
    q: "2026년 USJ 익스프레스 패스는 살 만한가요?",
    a: "붐비는 날이라면 그렇습니다. 2026년은 USJ의 25주년 기간이고 최고 인기 어트랙션의 일반 대기가 180~240분에 이를 수 있습니다. 익스프레스 패스는 그 몇 시간의 대기를 우선 입장으로 바꾸고, 대부분의 버전은 슈퍼 닌텐도 월드 시간 지정 입장까지 확보해 줍니다. 한가한 비수기 평일에는 덜 필요하지만, 주말과 연휴, 기념 기간 인파에서 핵심 어트랙션을 타고 싶다면 거의 필수입니다.",
  },
  {
    q: "익스프레스 패스 4, 7, 8은 무엇이 다른가요?",
    a: "숫자는 줄을 건너뛸 수 있는 지정 어트랙션 수에 대략 대응합니다. 익스프레스 패스 4는 약 네 개, 7은 약 일곱 개이고 8・프리미엄 등급이 가장 넓게 포함합니다. 대부분의 버전에는 슈퍼 닌텐도 월드 시간 지정 입장권도 한 장 들어 있습니다. 포함 범위와 가격의 균형에서 가장 인기 있는 선택은 익스프레스 패스 7이고, 8・프리미엄은 가장 붐비는 날에 맞습니다. 실제 포함 어트랙션은 날짜에 따라 다르므로 구매 전에 본인 날짜의 내용을 확인하세요.",
  },
  {
    q: "슈퍼 닌텐도 월드는 어떻게 들어가나요?",
    a: "붐비는 날 슈퍼 닌텐도 월드는 시간 지정 입장으로 운영됩니다. 확실한 방법은 두 가지입니다. 슈퍼 닌텐도 월드 시간 지정 입장권이 포함된 익스프레스 패스를 사거나, 입장 후에 공식 USJ 앱으로 무료 지역 정리권을 받는 것입니다. 한가한 날에는 그냥 걸어 들어갈 수도 있지만 주말과 연휴, 기념 기간에는 기대하지 마세요.",
  },
  {
    q: "USJ 티켓은 얼마인가요?",
    a: "USJ는 날짜별 등급 가격 체계여서 같은 티켓이 인기 날짜에는 한가한 날짜보다 비쌉니다. 가격이 날짜와 수요에 따라 움직이므로 저희는 고정 금액을 적지 않습니다. 예약 시점에 본인 날짜의 실시간 가격을 확인하세요. 익스프레스 패스는 스튜디오 패스와 별도의 추가 구매 항목이고 금액 차이가 날짜에 따라 큽니다.",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "USJ 티켓과 익스프레스 패스" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoUsjTicketsPage({ updated }: { updated: PageUpdated }) {
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
            유니버설 스튜디오 재팬<br />익스프레스 패스(2026): 무엇을 살까
          </h1>
          <p className={styles.heroSubtitle}>
            이제 온라인 판매만 하고, 슈퍼 닌텐도 월드는 시간 지정 입장이 필요하며, 2026년은 25주년 인파까지
            겹칩니다. 이번 여행에 정확히 무엇을 사야 하는지 정리합니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "스튜디오 패스＋익스프레스 패스", "슈퍼 닌텐도 월드"].map((t) => (
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
                <p className={styles.verdictStatLabel}>모두에게 필요한 것</p>
                <p className={styles.verdictStatValue}>스튜디오 패스(온라인)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>익스프레스 패스 추가 시점</p>
                <p className={styles.verdictStatValue}>주말・연휴・기념 기간</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>슈퍼 닌텐도 월드</p>
                <p className={styles.verdictStatValue}>붐빌 때는 시간 지정 입장</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>현장 구매?</p>
                <p className={styles.verdictStatValue}>불가 — 2025년부터 온라인만</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>결론:</strong> 입장권으로 스튜디오 패스를 온라인에서 사세요. 붐비는 날 — 2026년은 대체로
              붐빕니다 — 에는 익스프레스 패스를 더해 몇 시간의 줄을 줄이고 슈퍼 닌텐도 월드 입장을 확보하세요.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={koUsjStudioPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 티켓(스튜디오 패스) →
              </a>
              <a href={koUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 익스프레스 패스 →
              </a>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>2026년 USJ 티켓은 어떻게 돌아가나</h2>
          <p className={styles.bodyText}>
            사기 전에 두 가지를 알아야 합니다. 첫째, <strong>스튜디오 패스</strong>가 입장권입니다. 모두 한 장씩
            필요하고, 2025년 5월부터는 당일에 게이트에서 살 수 없습니다. 온라인 전용이며 날짜별 등급 가격
            체계라 인기 날짜가 더 비쌉니다.
          </p>
          <p className={styles.bodyText}>
            둘째, <strong>익스프레스 패스</strong>는 선택적인 추가 상품으로 지정 어트랙션의 일반 줄을 건너뛰게
            해 주고, 대부분의 버전에는 <strong>슈퍼 닌텐도 월드</strong> 시간 지정 입장권이 한 장 들어 있습니다.
            그 자체가 입장권은 아니므로 스튜디오 패스와 별도로 사야 합니다. 2026년은 USJ의 25주년 기간이라
            인파가 두꺼워서, 익스프레스 패스의 가치가 평년보다 훨씬 큽니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>티켓 종류</span>
          <h2 className={styles.sectionTitle}>USJ 티켓 한눈에</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓 종류", "내용", "가격"].map((h) => (
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
            USJ는 날짜별 등급 가격 체계입니다. 같은 티켓이 인기 날짜에 더 비쌉니다. 저희는 고정 금액을 적지
            않습니다. 예약 시점에 본인 날짜의 실시간 가격을 확인하세요(2026년, 변동, 결제 시 확인).
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>익스프레스 패스 등급</span>
          <h2 className={styles.sectionTitle}>익스프레스 패스 4 vs 7 vs 8</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["익스프레스 패스", "줄 건너뛰기 어트랙션", "슈퍼 닌텐도 월드", "어울리는 경우"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {expressRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rides}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            실제로 어떤 어트랙션이 포함되는지, 슈퍼 닌텐도 월드 시간 지정 입장이 들어 있는지는 버전과 날짜에
            따라 다릅니다. 구매 전에 본인 날짜의 구성을 반드시 확인하세요.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>누가 무엇을 살까</span>
          <h2 className={styles.sectionTitle}>당신은 무엇을 사야 할까?</h2>
          <div className={styles.stepsList}>
            {whoFor.map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>절차</span>
          <h2 className={styles.sectionTitle}>예약 방법과 하루 짜기</h2>
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
          <span className={styles.sectionLabel}>교통</span>
          <h2 className={styles.sectionTitle}>오사카와 간사이 공항에서 USJ 가는 길</h2>
          <p className={styles.bodyText}>
            USJ는 오사카 서쪽 고노하나구에 있고, JR 유메사키선(사쿠라지마선) 유니버설시티역에서 걸어서
            가깝습니다. 보통 니시쿠조에서 환승합니다. 간사이 공항에서 시내로는 하루카나 난카이 노선을 쓸 수
            있고, 시내에 들어온 다음 전철 한 구간이면 도착합니다.
          </p>
          <p className={styles.bodyText}>
            오사카 교통과 공항 구간은 아직 한국어판이 없습니다. 영어판은{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              오사카 공항 교통 가이드(영어)
            </Link>
            {" "}와{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              오사카 시내 교통 가이드(영어)
            </Link>
            를 보세요.
          </p>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드・씨 선택" },
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법" },
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 예약(2026): 티켓 가격, 입장 시간, 보더리스와 비교" },
            { href: "/ko/guides/esim/best-esim-japan", title: "일본 이심 추천(2026): eSIM 요금제 비교와 클룩 일본 eSIM" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "오사카 주유패스 — 무엇이 포함되고 값을 하는지(영어)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>USJ에서 줄을 줄이세요</h2>
            <p className={styles.ctaBannerDesc}>
              스튜디오 패스를 온라인으로 사고(2025년부터 필수) 익스프레스 패스를 더해 25주년 인파를 피하고
              슈퍼 닌텐도 월드 입장을 확보하세요.
            </p>
            <a href={koUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              USJ 티켓과 익스프레스 패스 보기 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
