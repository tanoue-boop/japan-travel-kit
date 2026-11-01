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
import { koTeamlabBorderless } from "../../../../lib/klook-links-ko";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/ko/guides/attractions/teamlab-borderless-tickets";
const TITLE = "팀랩 보더리스 티켓(2026): 가격과 예약";
const DESC =
  "팀랩 보더리스 티켓 2026: 아자부다이힐스 공식 가격 성인 ¥3,400부터, 지정 시간 입장, 현장 구매는 ¥200 더.";

// All figures come from lib/attraction-prices.ts and the English guide that read
// them off teamlab.art. Nothing was re-checked or added for this edition.
const P = PRICES.teamlabBorderless;
const CHECKED = dateLabel(P.checked, "ko");
// "from ¥3,400" -> "¥3,400부터": same figure, Korean qualifier. See lib/i18n.ts.
const ADULT = priceLabel(P.adult, "ko");
const CHILD = priceLabel(P.child, "ko");

const priceRows = [
  { ticket: "성인(만 18세 이상)", price: ADULT, note: "변동 요금제 — 고른 날짜와 시간대에 따라 더 비쌀 수 있습니다" },
  { ticket: "만 13~17세", price: "¥2,800", note: "고정 요금" },
  { ticket: "만 4~12세", price: CHILD, note: "고정 요금" },
  { ticket: "만 3세 이하", price: "무료", note: "티켓이 필요하지 않습니다" },
  { ticket: "장애인 할인", price: "¥1,700부터", note: "변동 요금제. 동반 1명도 같은 할인 요금" },
];

const buyingRows = [
  {
    factor: "요금",
    official: "기본 요금, 날짜와 시간대에 따라 변동",
    klook: "같은 티켓을 자국 통화로 표시",
    door: "성인 +¥200, 어린이・장애인 +¥100",
  },
  {
    factor: "결제 화면",
    official: "영어 사이트가 있습니다",
    klook: "한국어 화면, 전자 티켓 즉시 발급",
    door: "현장 미술관 창구",
  },
  {
    factor: "해외 발급 카드",
    official: "보통 되지만 보장되지는 않습니다",
    klook: "해외 카드와 모바일 결제를 전제로 설계",
    door: "현장 카드 결제 가능",
  },
  {
    factor: "날짜 변경",
    official: "공식 구매분은 최대 3회까지 날짜 변경",
    klook: "고른 옵션에 따라 다릅니다 — 결제 전에 확인하세요",
    door: "해당 없음",
  },
  {
    factor: "못 살 위험",
    official: "미리 예약하면 낮습니다",
    klook: "미리 예약하면 낮습니다",
    door: "높습니다 — 인기 시간대는 당일 전에 마감됩니다",
  },
];

const whoFor = [
  {
    title: "공식 사이트를 고른다면",
    desc: "가장 낮은 기본 요금과 가장 큰 날짜 유연성을 원하는 경우입니다. 팀랩에서 직접 산 티켓은 최대 3회까지 날짜를 바꿀 수 있어, 도쿄 일정이 아직 움직이고 있다면 쓸 만합니다.",
  },
  {
    title: "클룩을 고른다면",
    desc: "자국 통화와 읽을 수 있는 화면으로 결제하고, 일본 외 발행 카드로 지불하며, 전자 티켓을 다른 예약과 같은 앱에 두고 싶은 경우입니다. 클룩은 팀랩의 공식 티켓 판매 파트너이고, 티켓은 같은 티켓이며 창구만 다릅니다.",
  },
  {
    title: "현장 구매를 계획에 넣지 말아야 하는 경우",
    desc: "날짜가 주말이나 일본 공휴일이거나, 저녁 시간대를 원하는 경우입니다. 현장 티켓은 성인 ¥200(어린이・장애인 ¥100)이 더 붙고, 남은 자리가 있을 때만 팝니다. 하필 대부분이 원하는 시간대에 그 자리가 없습니다.",
  },
];

const steps = [
  {
    title: "날짜를 먼저 정하고 그 날짜의 가격을 봅니다",
    desc: "보더리스의 성인 티켓과 장애인 티켓은 변동 요금제입니다. 보이는 금액은 고른 날짜와 입장 시간대에 달려 있습니다. 평일 오전이 보통 가장 저렴하고 가장 한가합니다.",
  },
  {
    title: "입장 시간을 고르거나 Flexible Pass를 고릅니다",
    desc: "표준 Entrance Pass에는 지정 입장 시간이 있습니다. 팀랩은 날짜만 지정하고 입장 시간을 지정하지 않는 Flexible Pass도 따로 팝니다. 하루 일정을 통제하기 어려울 때 조금 더 내고 살 만합니다.",
  },
  {
    title: "주말과 저녁 회차는 2~3주 전에 예약합니다",
    desc: "보더리스의 연간 관람객은 100만 명을 크게 넘고, 인기 시간대가 가장 먼저 사라집니다. 미리 예약하는 차이는 '내가 시간대를 고르는지'와 '남은 시간대가 나를 고르는지'입니다.",
  },
  {
    title: "약 두 시간을 비우고 짐은 줄입니다",
    desc: "관내에 정해진 경로가 없고 작품이 방 사이를 옮겨 다니므로 대부분 두 시간 정도는 안에 있고 싶어집니다. 회차보다 조금 일찍 도착하고 가볍게 가세요. 가미야초역과 롯폰기잇초메역 모두 지하 통로로 직결되므로 지상으로 올라갈 필요가 없습니다.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026년 팀랩 보더리스 티켓 가격은 얼마인가요?",
    a: `팀랩 공식 사이트 기준, 확인일 ${CHECKED}: Entrance Pass 성인(만 18세 이상) ${ADULT}, 만 13~17세 ¥2,800, 만 4~12세 ${CHILD}, 만 3세 이하 무료입니다. 장애인 할인은 ¥1,700부터이고 동반 1명도 같은 할인 요금입니다. 성인 티켓과 장애인 티켓은 변동 요금제라 실제 금액은 고른 날짜와 시간대에 달려 있으니 결제 전에 본인 날짜의 가격을 확인하세요. 현장 구매는 성인이 ¥200, 어린이와 장애인 티켓이 ¥100 더 비쌉니다.`,
  },
  {
    q: "팀랩 보더리스는 시간 지정 입장인가요? 그냥 가도 되나요?",
    a: "표준 Entrance Pass는 날짜와 시간을 지정합니다. 예약할 때 입장 시간대를 고릅니다. 팀랩은 날짜만 지정하고 입장 시간을 지정하지 않는 Flexible Pass도 팝니다. 현장 판매도 있지만 성인은 ¥200이 더 붙고 남은 자리가 있을 때만 팝니다. 주말, 공휴일, 저녁 회차에는 자리가 없는 일이 잦습니다. 현장 구매는 계획이 아니라 대안으로 다루세요.",
  },
  {
    q: "팀랩 보더리스 운영 시간은 어떻게 되나요?",
    a: `운영 시간은 날짜에 따라 다릅니다. 공식 사이트 확인일 ${CHECKED} 기준으로 공지된 시간은 08:30–21:00이었고, 일부 날짜는 더 일찍 닫고(2026년 11월 17일은 17:00) 일부 날짜는 22:00까지 연장했습니다. 마지막 입장은 폐관 1시간 전입니다. 비정기적인 화요일 휴관도 있는데 2026년 10월 20일, 11월 24일, 12월 8일이 포함됩니다. 회차를 예약하기 전에 본인 날짜로 공식 달력을 꼭 확인하세요.`,
  },
  {
    q: "팀랩 보더리스는 얼마나 걸리나요?",
    a: "약 두 시간을 비워 두세요. 보더리스에는 지도도, 정해진 경로도 없습니다. 50점이 넘는 작품이 미로 같은 공간에 퍼져 있고 작품이 방 사이를 옮겨 다니며 하루 종일 변하므로, 얼마나 머무는지는 본인에게 달려 있습니다. 두 시간이면 주요 전시실을 서두르지 않고 볼 수 있고, 미술과 사진을 좋아하는 사람은 세 시간 가까이 머무는 일도 흔합니다.",
  },
  {
    q: "팀랩 보더리스는 어디에 있고 어떻게 가나요?",
    a: "도쿄 미나토구 도라노몬 5초메 일대의 아자부다이힐스 Garden Plaza B 지하 1층에 있습니다. 공식 교통 안내는 도쿄메트로 히비야선 가미야초역 5번 출구에서 도보 2분, 난보쿠선 롯폰기잇초메역 4번 출구에서 도보 6분입니다. 두 역 모두 지하 통로로 아자부다이힐스와 연결되어 있어 지상으로 올라가지 않고 안내판만 따라가면 됩니다. 비가 오거나 여름일 때 유용합니다. 참고로 이곳은 예전 오다이바의 보더리스가 아닙니다. 그 전시장은 끝났으니 해변으로 데려가는 경로 안내는 무시하세요.",
  },
  {
    q: "팀랩 보더리스는 공식 사이트와 클룩 중 어디서 사야 하나요?",
    a: "둘 다 정식 경로입니다. 클룩은 팀랩의 공식 티켓 판매 파트너이므로 어느 쪽에서 사도 같은 티켓입니다. 공식 사이트는 기본 요금을 주고 날짜를 최대 3회까지 바꿀 수 있습니다. 클룩은 자국 통화와 읽을 수 있는 결제 과정, 일본 외 발행 카드 승인율, 다른 예약과 함께 두는 전자 티켓을 줍니다. 날짜 유연성이 가장 중요하면 공식 사이트, 결제가 막히지 않는 쪽이 중요하면 클룩입니다.",
  },
  {
    q: "팀랩 보더리스와 팀랩 플래닛 중 어느 쪽을 예약할까요?",
    a: "같은 브랜드의 두 분점이 아니라 도쿄의 다른 구역에 있는 서로 다른 미술관입니다. 아자부다이힐스의 보더리스는 50점이 넘는 작품으로 이루어진 지도 없는 미로이고 천천히 둘러볼 가치가 있습니다. 도요스의 플래닛은 신발을 벗고 물에 들어가는 쪽이고 아이와 함께 가기에 더 맞습니다. 한 곳만 간다면 미술과 사진은 보더리스, 몸으로 느끼는 체험과 아이 동반은 플래닛입니다.",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "팀랩 보더리스 티켓" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoTeamLabBorderlessPage({ updated }: { updated: PageUpdated }) {
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
            팀랩 보더리스 티켓(2026):<br />가격, 지정 시간 입장, 구매 경로
          </h1>
          <p className={styles.heroSubtitle}>
            아자부다이힐스의 팀랩 보더리스는 한 장이 실제로 얼마인지, 지정 시간 입장은 어떻게 돌아가는지,
            그리고 공식 사이트와 클룩 중 어디서 살지.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 요금", "지정 시간 입장 설명"].map((t) => (
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
                <p className={styles.verdictStatLabel}>성인 티켓</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>입장 방식</p>
                <p className={styles.verdictStatValue}>날짜＋시간 지정</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>권장 소요</p>
                <p className={styles.verdictStatValue}>약 2시간</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>위치</p>
                <p className={styles.verdictStatValue}>미나토구・아자부다이힐스</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>결론:</strong> 성인 티켓 {ADULT}이고 변동 요금제라 최종 금액은 고른 날짜와
              시간대가 결정합니다. 티켓은 날짜와 시간을 지정하며, 현장 구매는 성인 ¥200이 더 붙고 남은
              자리가 있어야 합니다. 공지된 운영 시간은 약 08:30–21:00이고 마지막 입장은 폐관 1시간
              전입니다. 약 두 시간을 비워 두고, 가미야초역(히비야선, 도보 2분)이나
              롯폰기잇초메역(난보쿠선, 도보 6분)으로 가세요. 두 역 모두 지하 통로가 있습니다. 기본
              요금과 최대 3회 무료 날짜 변경을 원하면 공식 사이트, 읽을 수 있고 자국 통화로 결제되며
              해외 카드가 통하는 쪽을 원하면 클룩입니다.
            </p>
            <KlookLink href={koTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              팀랩 보더리스 티켓 보기 →
            </KlookLink>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              이 페이지의 가격, 운영 시간, 휴관일은 팀랩 공식 사이트에서 읽었고 확인일은 {CHECKED}입니다.
              보더리스는 변동 요금제이고 달력도 바뀌므로, 결제 시점에 본인 날짜로 두 가지를 모두
              확인하세요.
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 티켓 가격</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            보더리스가 파는 것은 입장 시간이 지정된 <strong>Entrance Pass</strong>입니다. 성인 티켓과
            장애인 티켓은 변동 요금제입니다. 아래 표는 공식 사이트의 기본 요금이고, 붐비는 토요일
            저녁은 한가한 화요일 오전보다 비쌉니다. 청소년과 어린이 티켓은 고정가입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓 종류", "가격(부터)", "비고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            팀랩 공식 사이트에서 읽었고 확인일은 {CHECKED}입니다. 현장 구매는 성인 ¥200, 어린이와
            장애인 티켓 ¥100이 더 붙습니다. 할인 티켓은 증빙이 필요하니 증명 서류를 지참하세요.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>예약 전에</span>
          <h2 className={styles.sectionTitle}>운영 시간, 입장 시간대, 휴관일</h2>
          <p className={styles.bodyText}>
            보더리스는 오래 열지만 달력이 자주 바뀝니다. 이 점이 가격보다 더 자주 사고를 냅니다. 아래는
            공식 사이트 확인일 {CHECKED} 기준입니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>운영 시간:</strong> 공지 08:30–21:00. 일부 날짜는 더 일찍 닫고(2026년 11월 17일은 17:00), 일부 날짜는 22:00까지 연장합니다.</li>
            <li><strong>마지막 입장:</strong> 폐관 1시간 전 — 21:00 폐관이면 20:00까지 들어가야 합니다.</li>
            <li><strong>휴관일:</strong> 비정기적인 화요일로, 2026년 10월 20일・11월 24일・12월 8일이 포함됩니다.</li>
            <li><strong>입장:</strong> Entrance Pass는 날짜와 입장 시간을 지정합니다. 날짜만 지정하는 <strong>Flexible Pass</strong>도 따로 있습니다.</li>
            <li><strong>날짜 변경:</strong> 팀랩에서 직접 산 티켓은 최대 3회까지 날짜를 바꿀 수 있습니다.</li>
          </ul>
          <p className={styles.bodyText}>
            운영 시간과 휴관일이 매달 바뀌므로 회차를 예약하기 전에 본인 여행 날짜로 공식 달력을
            확인하세요. 평일 오전이 가장 한가하고 보통 가장 저렴하며, 주말과 저녁 회차가 가장 먼저
            사라집니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>무엇을 사는가</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스는 정확히 무엇인가</h2>
          <p className={styles.bodyText}>
            보더리스는 지도가 없는 미술관입니다. 50점이 넘는 디지털 작품이 서로 통하는 방들에 퍼져 있고,
            작품 자체가 움직입니다. 한 공간에서 다른 공간으로 걸어가고, 방 안의 사람에게 반응하며, 하루
            종일 변합니다. 권장 경로도, 번호가 붙은 지점도 없어서 같은 티켓을 산 두 사람의 경험이 실제로
            다를 수 있습니다.
          </p>
          <p className={styles.bodyText}>
            바로 그 설계 때문에 이 티켓은 미리 계획할 가치가 있습니다. 한 시간을 서두르면 유명한 전시실
            몇 개만 보고, 두 시간쯤 되어야 돌아다니고 되돌아가며 기다려야 나타나는 작품까지 찾을 수
            있습니다. 그래서 보더리스는 도쿄의 두 팀랩 중 더 성인 쪽이고 사진에 더 맞는 쪽입니다. 신발을
            벗고 물에 들어가는 도요스 쪽을 찾는다면{" "}
            <Link href="/ko/guides/attractions/teamlab-tokyo-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              팀랩 플래닛 예약 가이드
            </Link>
            를 보세요. 플래닛과 보더리스의 전체 비교도 그 페이지에 있습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>어디서 사는가</span>
          <h2 className={styles.sectionTitle}>공식 사이트 vs 클룩 vs 현장</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            클룩은 팀랩의 공식 티켓 판매 파트너이므로 어느 창구를 거쳐도 입장 자격은 같습니다. 다른 것은
            결제 과정, 유연성, 그리고 당일까지 미뤘을 때의 가격입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "공식 사이트", "클룩", "당일 현장"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.official}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.klook}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            현장 추가 금액과 날짜 변경 횟수는 팀랩 공식 사이트 {CHECKED} 공지 기준입니다. 판매 플랫폼의
            취소와 변경 조건은 옵션마다 다르므로 결제 전에 주문 페이지에서 확인하세요.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>어디가 맞는가</span>
          <h2 className={styles.sectionTitle}>어떻게 살까?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>예약 절차</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 예약 방법</h2>
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
            <KlookLink href={koTeamlabBorderless.url} target="_blank" rel={KLOOK_REL}>
              클룩에서 보더리스 회차와 가격 보기 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>교통</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 위치</h2>
          <p className={styles.bodyText}>
            미술관은 미나토구 도라노몬 5초메 일대의 아자부다이힐스 Garden Plaza B 지하 1층에 있습니다.
            예전 오다이바의 보더리스가 아닙니다. 그 전시장은 이미 끝났으니 해변으로 데려가는 경로
            안내는 무시하세요.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>가미야초역</strong>(도쿄메트로 히비야선) — 5번 출구에서 도보 2분.</li>
            <li><strong>롯폰기잇초메역</strong>(도쿄메트로 난보쿠선) — 4번 출구에서 도보 6분.</li>
            <li>두 역 모두 지하 통로로 아자부다이힐스와 연결되어 있어, 지상으로 올라가지 않고 안내판만 따라가면 됩니다.</li>
          </ul>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 예약(2026): 티켓 가격, 입장 시간, 보더리스와 비교" },
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법" },
            { href: "/ko/guides/attractions/tokyo-skytree-tickets", title: "도쿄 스카이트리 티켓(2026): 요금과 플로어 350·450 선택" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드・씨 선택" },
            { href: "/ko/guides/esim/best-esim-japan", title: "일본 이심 추천(2026): eSIM 요금제 비교와 클룩 일본 eSIM" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>보더리스 회차를 먼저 잡아 두세요</h2>
            <p className={styles.ctaBannerDesc}>
              지정 시간 입장이라는 말은, 가장 가고 싶은 시간대가 가장 먼저 마감된다는 뜻입니다. 클룩은
              팀랩의 공식 티켓 판매 파트너로, 자국 통화로 결제하고 전자 티켓을 휴대폰에 바로 받습니다.
            </p>
            <KlookLink href={koTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              팀랩 보더리스 티켓 보기 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
