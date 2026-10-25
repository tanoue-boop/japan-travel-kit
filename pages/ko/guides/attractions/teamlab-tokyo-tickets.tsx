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
import { koFujiHakoneDayTour, koTeamlabPlanets } from "../../../../lib/klook-links-ko";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/ko/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "팀랩 플래닛 예약(2026): 티켓 가격, 입장 시간, 보더리스와 비교";
const DESC =
  "팀랩 플래닛 예약 2026: 도요스 공식 티켓 가격(성인 ¥3,800부터), 30분 단위 입장 시간이 어떻게 돌아가는지, " +
  "맨발로 물을 걷는 구간에 무엇을 입어야 하는지, 그리고 플래닛과 아자부다이힐스 보더리스의 차이. 숫자는 영어판과 같은 데이터, 같은 확인일입니다.";

// Same records the English guide and the ticket price table read, from
// lib/attraction-prices.ts. No figure here is new to the Korean edition.
const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const CHECKED = dateLabel(P.checked, "ko");
// 가격은 공식 티켓 사이트에서 다시 확인한 날짜(CHECKED), 운영 시간과 휴관일은
// teamlab.art를 읽은 날짜입니다. teamlab.art는 클라이언트 렌더링이라 다시 읽지 못해
// 더 최근 날짜를 빌리지 않고 자기 날짜를 유지합니다. 영어판과 같은 처리입니다.
const HOURS_CHECKED = dateLabel("2026-10-09", "ko");
// "from ¥3,800" -> "¥3,800부터": same figure, Korean qualifier. See lib/i18n.ts.
const ADULT = priceLabel(P.adult, "ko");
const CHILD = priceLabel(P.child, "ko");
const B_ADULT = priceLabel(B.adult, "ko");

const priceRows = [
  { ticket: "성인", price: ADULT, note: "날짜와 회차에 따라 변동" },
  { ticket: "중・고등학생", price: "¥2,800", note: "학생증을 지참하세요" },
  { ticket: "어린이(만 4~12세)", price: CHILD, note: "만 4세 미만은 티켓 불필요" },
  { ticket: "만 3세 이하", price: "무료", note: "여벌 옷을 준비하세요. 물 구간에서는 모두 젖습니다" },
  { ticket: "장애인 할인", price: "¥1,900부터", note: "증명 서류를 지참하세요" },
  { ticket: "Premium Pass", price: "¥12,000", note: "우선 입장, 만 4세 이상" },
];

const compareRows = [
  { factor: "위치", planets: "도요스(고토구)", borderless: "아자부다이힐스(미나토구)" },
  { factor: "콘셉트", planets: "몰입형, 맨발, 물속을 걷습니다", borderless: "지도 없는 미로, 50점 이상의 작품" },
  { factor: "어울리는 사람", planets: "아이 동반, 첫 방문, 몸으로 느끼고 싶은 사람", borderless: "미술 애호가, 천천히 둘러보기, 사진" },
  { factor: "필요한 시간", planets: "맨발 준비까지 약 1.5~2시간", borderless: "약 2시간, 더 머물면 더 길게" },
  { factor: "성인 티켓(부터)", planets: ADULT, borderless: B_ADULT },
  { factor: "운영 시간", planets: "공지 08:00–22:00, 날짜에 따라 변동", borderless: "공지 08:30–21:00, 날짜에 따라 변동" },
  { factor: "입장", planets: "30분 단위 입장 회차", borderless: "지정 회차 또는 시간 미지정 Flexible Pass" },
  {
    factor: "알아 둘 점",
    planets: "2027년 말까지 운영 예정, 맨발과 물 구간",
    borderless: "현장 구매는 성인 1인당 ¥200 더 비쌉니다",
  },
];

const whoFor = [
  {
    title: "플래닛을 고른다면",
    desc: "아이와 함께이거나, 손발을 쓰는 신체적인 체험을 원하고 발이 젖는 걸 꺼리지 않는 경우입니다. 성인 무릎 높이까지 오는 물 구간을 맨발로 걷습니다. 두 곳 중 더 즐겁고 직관적인 쪽이며, 아이가 즐기기 쉬운 쪽입니다.",
  },
  {
    title: "보더리스를 고른다면",
    desc: "작품을 지나가는 게 아니라 작품 안으로 가라앉고 싶은 경우입니다. 아자부다이힐스의 보더리스에는 정해진 경로가 없습니다. 작품이 방과 방 사이를 옮겨 다니고, 50개가 넘는 공간을 자유롭게 돌아다닙니다. 시간과 인내심에 보답하는 쪽이고 성인에게는 사진도 더 잘 나옵니다.",
  },
  {
    title: "둘 다 가도 좋은 경우",
    desc: "비어 있는 반나절이 두 번 있고 팀랩을 제대로 보고 싶다면 좋습니다. 도시의 다른 구역에 있는 서로 다른 체험이라 겹치지 않습니다. 날짜를 나누고 각각 지정 회차를 미리 예약하세요.",
  },
];

const steps = [
  {
    title: "날짜를 먼저 정하고 그 날짜의 가격을 봅니다",
    desc: "플래닛 성인 티켓은 ¥3,800부터지만 실제 금액은 고른 날짜와 회차에 따라 달라집니다. 평일 오전이 가장 저렴하고 가장 한가합니다.",
  },
  {
    title: "30분 단위 입장 회차를 2~3주 전에 예약합니다",
    desc: "티켓은 10:00–10:30처럼 30분 입장 구간에 대응합니다. 인기 회차는 2~3주 전에 마감되는 일이 많고, 미술관 현장에는 매표 창구가 없습니다. 그래서 사전 예약이 대안이 아니라 계획 자체입니다.",
  },
  {
    title: "팀랩 공식 또는 공식 판매 파트너에서 구매합니다",
    desc: "플래닛 공식 티켓 사이트가 전자 티켓을 직접 판매합니다. 클룩은 팀랩의 공식 티켓 판매 파트너로, 자국 통화와 한국어 화면으로 결제할 수 있고 일본 외 발행 카드 승인율이 높습니다. 어느 쪽이든 휴대폰 QR 코드입니다.",
  },
  {
    title: "옷을 맞춰 입고 회차 안에 도착합니다",
    desc: "반바지나 무릎 위까지 걷어 올릴 수 있는 바지를 입으세요. 일부 작품은 물 공간이고 수심이 성인 무릎까지 옵니다. 치마나 통이 넓은 바지라면 현장에 XS~6L 무료 대여 반바지가 있습니다. 바닥 일부가 거울이기 때문입니다. 붐비는 시간대에는 입장 준비에 30~60분이 걸릴 수 있어 회차 시작에 맞춰 도착하세요.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026년 팀랩 플래닛 티켓 가격은 얼마인가요?",
    a: `팀랩 플래닛 공식 티켓 사이트 기준, 확인일 ${CHECKED}: 성인 ${ADULT}, 중・고등학생 ¥2,800, 만 4~12세 어린이 ${CHILD}, 만 3세 이하 무료입니다. 장애인 할인은 ¥1,900부터이고, 만 4세 이상이 쓸 수 있는 ¥12,000 Premium Pass가 따로 있습니다. 성인 티켓은 날짜와 회차에 따라 변동하므로 결제 전에 본인 회차의 금액을 확인하세요. 할인 티켓은 증빙이 필요합니다. 학생증, 여권, 장애인 증명서를 챙기세요.`,
  },
  {
    q: "팀랩 플래닛은 예약이 필요한가요?",
    a: "필요합니다. 도쿄의 다른 명소보다 더 그렇습니다. 플래닛은 30분 단위 입장 회차로 운영되고 인기 시간은 2~3주 전에 마감되며 주말과 연휴에는 특히 심합니다. 공식 안내 페이지도 분명히 적고 있습니다. 미술관 현장에서 티켓을 살 수 있다고 기대하지 마세요. 티켓은 온라인 사전 판매이고 창구 판매가 아닙니다. 출발 전에 날짜와 회차를 확정해 두세요.",
  },
  {
    q: "팀랩 플래닛에 갈 때 무엇을 입어야 하나요?",
    a: "반바지, 또는 무릎 위까지 걷어 올릴 수 있는 바지입니다. 일부 작품은 물 공간이고 수심이 성인 무릎까지 오며, 미술관 전체가 맨발 체험입니다. 신발, 양말, 스타킹은 입구 보관함에서 벗습니다. 바닥 일부가 거울이라 치마와 통이 넓은 바지는 좋은 선택이 아닙니다. 현장에 XS~6L 무료 대여 반바지가 있습니다. 아이와 함께라면 여벌 옷을 준비하고, 유모차는 들어갈 수 없습니다(유모차 보관 공간이 있고 아기띠는 가능합니다).",
  },
  {
    q: "팀랩 플래닛은 얼마나 걸리나요?",
    a: "전체적으로 약 1.5~2시간을 비워 두세요. 작품 자체는 서두르지 않는 속도로 한 시간에서 한 시간 반 정도지만, 보관함과 맨발 준비, 끝난 뒤 물기를 닦는 시간까지 더해야 합니다. 붐비는 시간대에는 입장 준비만으로 30~60분이 걸릴 수 있습니다. 끝난 직후에 다른 일정을 붙이지 마세요.",
  },
  {
    q: "팀랩 플래닛 운영 시간과 휴관일은 어떻게 되나요?",
    a: `운영 시간은 날짜에 따라 다릅니다. 저희가 ${HOURS_CHECKED}에 공식 사이트를 확인했을 때 플래닛의 공지 시간은 08:00–22:00이었고, 마지막 입장은 폐관 1시간 전이었습니다. 2026년 말 휴관일에는 11월 5일(목)과 12월 3일(목)이 포함됩니다. 달력은 매달 바뀌므로 회차를 예약하기 전에 본인 날짜로 공식 달력을 확인하세요.`,
  },
  {
    q: "예약한 회차를 놓치면 어떻게 되나요?",
    a: "반드시 못 들어가는 것은 아닙니다. 공식 안내 페이지는 티켓에 적힌 시간이 기준 시각이며, 늦어도 당일 운영 시간 안에는 입장할 수 있다고 적고 있습니다. 단, 폐관 1시간 전 마지막 입장은 넘길 수 없습니다. 다만 해당 회차 티켓 소지자보다 더 기다릴 수 있으니, 회차는 계획으로 다루는 편이 좋습니다.",
  },
  {
    q: "팀랩 플래닛은 어디에 있고 어떻게 가나요?",
    a: "도쿄 동쪽 수변의 도요스에 있습니다. 공식 교통 안내 기준으로 유리카모메선 신토요스역에서 도보 1분, 시장앞역과 도요스 시장에서 도보 5분, 도쿄메트로 유라쿠초선 도요스역에서 도보 10분입니다. 도쿄역에서 택시로 약 15분, 하네다 공항에서 고속도로로 약 15분입니다. 전철 구간은 스이카나 파스모 같은 IC 카드로 충분합니다.",
  },
  {
    q: "팀랩 플래닛은 곧 문을 닫나요?",
    a: "도요스의 팀랩 플래닛은 2027년 말까지 운영될 예정이며, 팀랩은 작품 10점 이상을 추가하는 확장 계획도 발표했습니다. 일정은 바뀔 수 있으니 이곳을 위해 일정을 따로 잡는다면 공식 사이트를 먼저 확인하세요. 아자부다이힐스의 팀랩 보더리스는 별도로 계속 운영되는 다른 미술관이고 티켓도 따로입니다.",
  },
  {
    q: "팀랩 플래닛과 보더리스의 차이는 무엇인가요?",
    a: "도요스의 플래닛은 몰입형 맨발 체험으로, 물과 대형 설치 작품 안으로 걸어 들어갑니다. 두 곳 중 더 신체적이고 아이와 함께 가기 좋은 쪽입니다. 아자부다이힐스의 보더리스는 50점이 넘는 작품으로 이루어진 지도 없는 미로이고, 정해진 경로 없이 작품이 공간을 옮겨 다니며 관람객은 자유롭게 돌아다닙니다. 플래닛은 아이 동반과 첫 방문에, 보더리스는 천천히 탐색하고 싶은 미술 애호가에게 맞습니다. 도쿄의 다른 구역에 있는 두 미술관이고 티켓은 각각 따로입니다.",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "팀랩 플래닛 예약" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoTeamLabPlanetsPage({ updated }: { updated: PageUpdated }) {
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
            팀랩 플래닛 예약(2026):<br />티켓 가격, 입장 시간, 보더리스와 비교
          </h1>
          <p className={styles.heroSubtitle}>
            도요스 팀랩 플래닛 티켓은 얼마인지, 30분 단위 입장 회차는 어떻게 돌아가는지, 물 구간에 무엇을 입어야
            하는지 — 그리고 플래닛과 아자부다이힐스 보더리스의 차이.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 티켓 가격", "플래닛 vs 보더리스"].map((t) => (
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
                <p className={styles.verdictStatValue}>30분 회차, 사전 예약</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>권장 소요</p>
                <p className={styles.verdictStatValue}>약 1.5~2시간</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>복장</p>
                <p className={styles.verdictStatValue}>반바지 — 맨발, 무릎 깊이 물</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>결론:</strong> 팀랩 플래닛 성인 {ADULT}, 중・고등학생 ¥2,800, 만 4~12세 {CHILD}입니다.
              티켓은 30분 입장 구간에 대응하고 현장 매표 창구가 없으므로 주말이라면 2~3주 전에 예약하세요.
              맨발로 입장하고 일부 작품은 수심이 성인 무릎까지 오는 물 공간입니다. 반바지나 걷어 올릴 수 있는
              바지를 입으세요(현장에 XS~6L 무료 대여 반바지가 있습니다). 1.5~2시간을 비워 두면 되고, 신토요스역에서
              도보 1분입니다.
            </p>
            <a href={koTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              팀랩 플래닛 티켓 보기 →
            </a>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              이 페이지의 가격은 팀랩 플래닛 공식 티켓 사이트에서 읽었고 확인일은 {CHECKED}, 운영 시간과
              휴관일은 teamlab.art에서 읽었고 확인일은 {HOURS_CHECKED}입니다. 플래닛
              가격은 날짜와 회차에 따라 변동하고 달력도 바뀌므로, 결제 시점에 본인 날짜로 두 가지를 모두
              확인하세요.
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 티켓 가격</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            움직이는 쪽은 성인 티켓입니다. {ADULT}이고, 보이는 금액은 고른 날짜와 회차에 달려 있습니다. 학생과
            어린이 티켓은 고정가이며, 만 4세 미만은 티켓이 전혀 필요하지 않습니다.
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
            팀랩 플래닛 공식 티켓 사이트에서 읽었고 확인일은 {CHECKED}입니다. 할인 티켓은 증빙이 필요하니
            학생증, 여권, 장애인 증명서를 챙기세요. 티켓은 휴대폰 QR 코드로 발급됩니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>예약 전에</span>
          <h2 className={styles.sectionTitle}>운영 시간, 입장 회차, 복장</h2>
          <p className={styles.bodyText}>
            플래닛은 일반적인 미술관보다 요구하는 게 많습니다. 맨발로 들어가고, 경로의 일부가 물입니다. 아래는
            공식 티켓 사이트를 {CHECKED}에 확인한 내용이며, 운영 시간과 휴관일은 {HOURS_CHECKED} 확인분입니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>운영 시간:</strong> 공지 08:00–22:00, 날짜에 따라 변동하며 마지막 입장은 폐관 1시간 전입니다.</li>
            <li><strong>휴관일:</strong> 비정기적이며 2026년 11월 5일(목)과 12월 3일(목)이 포함됩니다.</li>
            <li><strong>입장:</strong> 티켓은 10:00–10:30 같은 30분 입장 구간에 대응합니다. 붐비는 시간에는 입장 준비에 30~60분이 걸릴 수 있습니다.</li>
            <li><strong>늦었다면?</strong> 공식 안내 페이지는 티켓 시간이 기준 시각이고 당일 운영 시간 안에는 입장할 수 있다고 적고 있습니다. 단, 마지막 입장 시간은 넘길 수 없습니다.</li>
            <li><strong>맨발:</strong> 신발, 양말, 스타킹은 보관함에서 벗고 전 구간을 맨발로 체험합니다.</li>
            <li><strong>물:</strong> 일부 작품은 물 공간이고 수심이 성인 무릎까지 옵니다. 반바지나 걷어 올릴 수 있는 바지를 입으세요.</li>
            <li><strong>거울 바닥:</strong> 치마와 통이 넓은 바지는 문제가 됩니다. 현장에 XS~6L 무료 대여 반바지가 있습니다.</li>
            <li><strong>아이와 함께:</strong> 여벌 옷을 준비하세요. 유모차는 들어갈 수 없고(보관 공간이 있습니다) 아기띠는 가능합니다.</li>
            <li><strong>짐:</strong> 약 23 × 34 × 37 cm를 넘는 가방은 보관함이 아니라 지정 위탁 공간에 맡깁니다.</li>
          </ul>
          <p className={styles.bodyText}>
            운영 시간과 휴관일은 매달 바뀌므로 회차를 정하기 전에 본인 여행 날짜로 공식 달력을 확인하세요. 평일
            오전이 가장 저렴하고 가장 한가합니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>무엇을 사는가</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛은 정확히 무엇인가</h2>
          <p className={styles.bodyText}>
            팀랩은 ‘보는’ 것이 아니라 ‘들어가는’ 대형 디지털 설치 작품으로 알려진 도쿄의 아트 컬렉티브입니다.
            도요스의 플래닛은 그중 가장 신체적인 쪽입니다. 맨발로 물을 걸으며, 관람객의 존재에 반응하는 작품들
            사이를 지나갑니다. 거울로 된 무한 공간, 떠 있는 빛의 구체로 가득한 홀, 살아 있는 정원 같은 것들입니다.
            도쿄의 두 팀랩 중 아이가 즐기기 쉬운 쪽이고, 이런 규모의 디지털 아트를 처음 본다면 충격이 가장 큰
            쪽입니다.
          </p>
          <p className={styles.bodyText}>
            동시에 붐빕니다. 팀랩은 2025년 관람객이 250만 명을 넘었다고 발표했습니다. 미술관은 2027년 말까지
            운영될 예정이고 작품 10점 이상을 추가하는 확장 계획도 공개됐습니다. 이미 가 본 사람이라도 다음에
            같은 방문이 되지는 않습니다.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>예약 절차</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 예약 방법</h2>
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
            <a href={koTeamlabPlanets.url} target="_blank" rel={KLOOK_REL}>
              클룩에서 플래닛 회차와 가격 보기 →
            </a>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>나란히 비교</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 vs 보더리스</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            도쿄에는 팀랩 미술관이 두 곳 있고 여행자가 자주 잘못 예약합니다. 서로 다른 구역의 독립된 장소이고
            티켓도 따로입니다. 도요스의 <strong>플래닛</strong>이 맨발로 물속을 걷는 쪽, 아자부다이힐스의
            {" "}<strong>보더리스</strong>가 50점 넘는 작품이 방 사이를 옮겨 다니는 지도 없는 미로입니다.
            보더리스는 가격, 시간, 예약 규칙이 따로이고 한국어판 가이드는 아직 없습니다. 영어판은{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              teamLab Borderless 티켓 가이드(영어)
            </Link>
            에 있습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "팀랩 플래닛", "팀랩 보더리스"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            플래닛 가격은 공식 티켓 사이트 {CHECKED} 확인분이고, 보더리스 가격과 두 곳의 운영 시간은
            teamlab.art {HOURS_CHECKED} 확인분입니다. 두 곳 모두 성인 티켓이
            날짜와 회차에 따라 책정되고 달력도 바뀌므로 본인 날짜를 확인하세요. ‘필요한 시간’은 저희의 일정
            제안이며 공식 수치가 아닙니다.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>어디가 맞는가</span>
          <h2 className={styles.sectionTitle}>어느 팀랩을 고를까?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>교통</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 위치</h2>
          <p className={styles.bodyText}>
            플래닛은 도쿄 동쪽 수변의 도요스, 도요스 시장 바로 옆에 있습니다. 공식 교통 안내는 다음과 같습니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>신토요스역</strong>(유리카모메선) — 도보 1분, 가장 편한 경로입니다.</li>
            <li><strong>시장앞역</strong>・도요스 시장 — 도보 5분.</li>
            <li><strong>도요스역</strong>(도쿄메트로 유라쿠초선) — 도보 10분, 라라포트 도요스도 같습니다.</li>
            <li>도쿄역에서 택시 약 15분, 하네다 공항에서 고속도로로 약 15분.</li>
          </ul>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>같은 날의 나머지</span>
          <h2 className={styles.sectionTitle}>플래닛은 한 시간, 남은 반나절은?</h2>
          <p className={styles.bodyText}>
            플래닛은 관내에서 대략 한 시간이라 보통 다른 일정과 하루를 공유합니다. 도쿄 일정에 아직 비어 있는
            하루가 있다면, 후지산과 하코네 1일 투어는 도쿄에서 출발해 그날 저녁에 돌아오고 티켓과 같은 클룩
            계정에서 결제됩니다.
          </p>
          <a href={koFujiHakoneDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta} style={{ marginTop: "0.5rem", display: "inline-block" }}>
            {koFujiHakoneDayTour.label} 보기 →
          </a>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드・씨 선택" },
            { href: "/ko/guides/attractions/usj-tickets-express-pass", title: "유니버설 스튜디오 재팬 익스프레스 패스(2026): 티켓은 어떤 것을 살까" },
            { href: "/ko/guides/esim/best-esim-japan", title: "일본 이심 추천(2026): eSIM 요금제 비교와 클룩 일본 eSIM" },
            { href: "/guides/attractions/teamlab-borderless-tickets", title: "teamLab Borderless 티켓 — 가격, 회차, 구매 경로(영어)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>팀랩 플래닛을 예약할 준비가 됐나요?</h2>
            <p className={styles.ctaBannerDesc}>
              입장은 30분 단위이고 좋은 회차는 2~3주 전에 사라집니다. 클룩은 팀랩의 공식 티켓 판매 파트너로,
              자국 통화로 결제하고 전자 티켓을 휴대폰에 바로 받습니다.
            </p>
            <a href={koTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              팀랩 플래닛 티켓 보기 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
