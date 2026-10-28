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
import { koShibuyaSky } from "../../../../lib/klook-links-ko";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/ko/guides/attractions/shibuya-sky-tickets";
const TITLE = "시부야 스카이 예약(2026): 티켓 가격과 예약 방법";
const DESC =
  "시부야 스카이 예약 2026: 공식 가격 온라인 성인 15시 전 ¥2,700, 15시 후 ¥3,400. 현장은 각 ¥300 비쌉니다.";

// Every figure on this page comes from lib/attraction-prices.ts — the same record
// the English guide and the ticket price table read. Nothing is re-checked for the
// Korean edition and nothing new is added: same numbers, same source, same date.
const P = PRICES.shibuyaSky;
const CHECKED = dateLabel(P.checked, "ko");
// priceLabel moves the English qualifier in these records ("from …", "Free") into
// Korean without touching the figure — see lib/i18n.ts.
const ADULT = priceLabel(P.adult, "ko");
const AT_DOOR = priceLabel(P.atDoor, "ko");

const priceRows = [
  { ticket: "성인(온라인 사전 구매, 15시 전／15시 후)", price: ADULT },
  { ticket: "성인(현장 구매, 15시 전／15시 후)", price: AT_DOOR },
  { ticket: "어린이(만 6~12세, 14층 창구에서만 판매)", price: priceLabel(P.child, "ko") },
  { ticket: "미취학 아동", price: priceLabel("Free", "ko") },
];

const deckRows = [
  {
    deck: "시부야 스카이(SHIBUYA SKY)",
    height: "약 229 m(루프톱)",
    highlight: "시부야 스크램블 교차로 바로 위의 야외 루프톱. 도쿄에서 가장 상징적인 사진 한 장",
    price: "¥2,700／¥3,400(성인 온라인, 입장 시간대별)",
    area: "시부야역",
  },
  {
    deck: "도쿄 스카이트리",
    height: "350 m・450 m 전망대(타워 높이 634 m)",
    highlight: "도쿄에서 가장 높은 시야와 유리 바닥 구간. 맑은 날에는 후지산도 보입니다",
    price: "약 ¥1,800(350 m), 세트권 약 ¥3,100",
    area: "오시아게, 아사쿠사 옆",
  },
  {
    deck: "도쿄 타워",
    height: "약 150 m・250 m 전망대(타워 높이 332 m)",
    highlight: "1958년에 세워진 레트로 랜드마크. 더 높은 층은 Top Deck Tour가 따로 필요",
    price: "약 ¥3,300(Top Deck Tour)",
    area: "시바공원・아카바네바시",
  },
  {
    deck: "도쿄도청 전망대",
    height: "약 202 m",
    highlight: "입장 무료. 티켓 없이 도심 전경을 볼 수 있습니다",
    price: "무료",
    area: "신주쿠",
  },
];

const whoFor = [
  {
    title: "일몰 사진이 목적이라면",
    desc: "일몰 회차가 가장 아름답고 가장 경쟁이 심해서 보통 제일 먼저 마감됩니다. 일몰 30~60분 전 입장을 고르면 낮, 골든아워, 야경을 한 번에 볼 수 있습니다.",
  },
  {
    title: "일정이 아직 유동적이라면 낮",
    desc: "낮 회차는 예약이 비교적 수월하고 날짜가 가까워져도 자리가 남아 있는 경우가 많습니다. 맑은 날에는 후지산까지 보이고, 일정이 바뀔 수 있다면 가장 유연한 선택입니다.",
  },
  {
    title: "야경만 보고 싶다면 밤",
    desc: "야간 회차는 지평선 대신 네온 불빛의 바다를 봅니다. 가장 늦게까지 자리가 남는 시간대여서, 일몰 회차가 마감됐을 때의 대안이기도 합니다.",
  },
];

const steps = [
  {
    title: "먼저 시간대를 정합니다. 핵심은 일몰",
    desc: "일몰 회차 한 번에 낮, 골든아워, 야경이 모두 들어오므로 가장 먼저 사라집니다. 일몰을 원한다면 예약을 '기한이 있는 일'로 다루세요.",
  },
  {
    title: "약 2주 전, 일본 시간 자정에 풀립니다",
    desc: "티켓은 입장일 기준 약 2주 전에 공개되고, 새 날짜는 보통 일본 시간 00:00에 판매가 시작됩니다. 일몰 회차를 노린다면 본인 날짜가 열리는 시각에 로그인해 두세요.",
  },
  {
    title: "해외 발행 카드라면 예약 플랫폼이 안전합니다",
    desc: "2024년 7월부터 시부야 스카이 공식 사이트는 해외에서 발행된 카드를 상당수 거부합니다. 클룩은 해외 카드로 결제할 수 있고 화면이 한국어이며, 입장 24시간 전까지 무료 취소를 제공합니다. 도쿄 날씨가 바뀌기 쉬운 만큼 이 조건이 유용합니다.",
  },
  {
    title: "일몰 회차는 30~60분 일찍 도착하세요",
    desc: "입구 통과, 소지품 보관(루프톱은 야외라 바람이 강합니다), 빛이 바뀌기 전 자리 잡기까지 시간이 필요합니다.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "시부야 스카이 티켓 가격은 얼마인가요?",
    a: `입장 시간대에 따라 두 가격입니다. 온라인 사전 구매 성인은 15시 전 입장 ¥2,700, 15시 이후 ¥3,400이고, 당일 14층 창구는 ¥3,000과 ¥3,700이라 온라인이 각각 ¥300 저렴합니다. 만 6~12세 어린이는 ¥1,200이며 14층 창구에서만 판매하고, 미취학 아동은 무료입니다. 이 가격은 2025년 4월 1일 입장분부터 적용되며 시부야 스크램블 스퀘어가 2025년 2월 27일에 낸 입장권 개정 공지에 따른 것입니다. 확인일은 ${CHECKED}입니다.`,
  },
  {
    q: "시부야 스카이는 언제 가는 게 가장 좋나요?",
    a: "일몰 회차가 가장 인기 있고 가장 예쁩니다. 낮, 골든아워, 야경을 한 번에 볼 수 있기 때문입니다. 바로 그래서 가장 먼저 마감되기도 합니다. 일몰 30~60분 전 입장을 권합니다. 일몰이 매진이라면, 맑은 낮 회차에서는 후지산이 보이고 야간 회차는 불빛의 바다를 보며 가장 늦게까지 자리가 남습니다.",
  },
  {
    q: "시부야 스카이는 며칠 전에 예약해야 하나요?",
    a: "티켓은 보통 입장일 약 2주 전에 공개되고, 새 날짜는 일본 시간 00:00(자정)에 열립니다. 일몰 회차는 본인 날짜가 열리는 즉시 결제하세요. 성수기에는 몇 분 안에 사라집니다. 낮과 야간 회차는 여유가 있지만 그래도 미리 예약하는 편이 좋습니다.",
  },
  {
    q: "해외 발행 신용카드로 시부야 스카이 티켓을 살 수 있나요?",
    a: "시부야 스카이 공식 사이트에서는 안 되는 경우가 많습니다. 2024년 7월부터 공식 사이트가 해외 발행 카드를 상당수 거부하고 있습니다. 확실한 방법은 클룩 같은 예약 플랫폼을 쓰는 것입니다. 해외 카드로 결제해 전자 티켓을 받고, 입장 24시간 전까지 무료로 취소할 수 있습니다.",
  },
  {
    q: "시부야 스카이는 얼마나 높고, 무엇이 보이나요?",
    a: "시부야 스카이는 시부야 위 약 229 m 높이의 루프톱 전망대이며, 야외 루프톱과 실내 구역으로 나뉩니다. 위에서는 시부야 스크램블 교차로와 도쿄 스카이라인을 360도로 볼 수 있고, 공기가 맑은 날에는 후지산까지 보입니다. 핵심은 야외 루프톱이므로 바람을 막아 주는 옷을 입고, 출발 전에 날씨를 확인하세요.",
  },
  {
    q: "시부야 스카이와 스카이트리 중 어디를 가야 할까요?",
    a: "시부야 스카이가 파는 것은 경험과 사진입니다. 시부야 스크램블 교차로 바로 위 약 229 m의 야외 루프톱이고, 일몰에 가장 아름다우며 도쿄에서 가장 알아보기 쉬운 시야입니다. 도쿄 스카이트리가 파는 것은 높이와 시야 거리입니다. 350 m와 450 m 두 개의 전망대, 유리 바닥 구간이 있고 맑은 날에는 후지산까지 멀리 보입니다. 교차로 사진과 분위기를 원하면 시부야 스카이, 가장 높고 넓은 파노라마를 원하면 스카이트리입니다.",
  },
  {
    q: "도쿄에 무료 전망대가 있나요?",
    a: "있습니다. 신주쿠의 도쿄도청 건물은 약 202 m 지점에 전망실을 두고 있고 입장은 무료입니다. 도쿄에서 가장 가치 있는 공짜 도심 전경이고, 예산을 시부야 스카이나 다른 체험에 쓰고 싶다면 똑똑한 선택입니다. 운영 시간과 어느 전망실이 열리는지는 바뀌므로 가기 전에 확인하세요.",
  },
  {
    q: "시부야 스카이에서 후지산이 보이나요?",
    a: "맑은 날에는 보입니다. 공기가 투명한 날이면 시부야 스카이에서도 후지산이 보이지만, 확률이 가장 높은 곳은 더 높은 도쿄 스카이트리입니다. 가시거리는 날씨에 달려 있고 보통 서늘하고 건조한 달과 이른 아침이 가장 좋습니다. 어느 날에도 보장되지는 않습니다.",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "시부야 스카이 예약" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoShibuyaSkyTicketsPage({ updated }: { updated: PageUpdated }) {
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
            시부야 스카이 예약(2026):<br />티켓 가격, 추천 시간대, 예약 방법
          </h1>
          <p className={styles.heroSubtitle}>
            도쿄에서 가장 좋은 루프톱 시야 — 시부야 스크램블 교차로 위 229 m. 티켓은 얼마인지, 언제 가야 하는지,
            그리고 일몰 회차가 마감되기 전에 예약하는 방법.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "일몰 회차 예약 요령", "스카이트리・도쿄타워 비교"].map((t) => (
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
                <p className={styles.verdictStatLabel}>티켓(온라인)</p>
                <p className={styles.verdictStatValue}>성인 {ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>추천 시간대</p>
                <p className={styles.verdictStatValue}>일몰 회차(가장 먼저 마감)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>예약 시점</p>
                <p className={styles.verdictStatValue}>약 2주 전, 일본 시간 자정</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>해외 발행 카드?</p>
                <p className={styles.verdictStatValue}>예약 플랫폼 권장</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>결론:</strong> 온라인으로 사고({ADULT}, 현장보다 저렴) 가능하면 일몰 회차를 잡으세요. 가장 먼저
              마감되는 시간대입니다. 카드가 해외 발행이라면 클룩이 안전합니다. 해외 카드로 결제되고, 입장 24시간
              전까지 무료 취소도 됩니다.
            </p>
            <KlookLink href={koShibuyaSky.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              시부야 스카이 티켓 보기 →
            </KlookLink>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>시부야 스카이란?</h2>
          <p className={styles.bodyText}>
            시부야 스카이는 시부야 스크램블 스퀘어 최상층의 전망대로, 세계에서 가장 붐비는 교차로 중 하나의 위
            약 229 m 지점에 있습니다. 야외 루프톱과 실내 구역으로 이루어져 있고, 시부야 스크램블 교차로와 도쿄
            스카이라인을 360도로 볼 수 있으며 날씨가 좋은 날에는 후지산도 보입니다.
          </p>
          <p className={styles.bodyText}>
            이미 도쿄에서 가장 많이 촬영되는 장소 중 하나입니다. 그게 장점이자 번거로움입니다. 좋은 시간대는
            마감되고, 예약 시스템에는 해외 여행자를 걸고 넘어지게 하는 지점이 몇 개 있습니다. 이 두 가지만
            처리하면 도쿄에서 가성비가 가장 좋은 체험 중 하나입니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>시부야 스카이 티켓 가격</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓 종류", "가격"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            위 가격은 시부야 스카이 공식 사이트에서 읽었고 확인일은 {CHECKED}입니다. 가격은 조정될 수 있으니
            결제 전에 다시 확인하세요. 온라인 사전 구매({ADULT})는 현장({AT_DOOR})보다 저렴하면서, 일몰 회차를
            확보할 수 있는 유일한 방법입니다. 같은 공식 가격을 저희가 확인한 다른 일본 명소와 함께 정리한 표는{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              일본 명소 티켓 가격 표(영어)
            </Link>
            에 있으며, 모든 행에 확인 날짜가 붙어 있습니다.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>추천 시간대</span>
          <h2 className={styles.sectionTitle}>어느 회차를 고를까?</h2>
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
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>시부야 스카이와 도쿄의 다른 전망대</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            시부야 스카이는 그 교차로 사진으로 이기지만, 도쿄에서 가장 높지도 가장 싸지도 않습니다. 주요 선택지는
            네 곳입니다. 높이와 후지산 시야는 스카이트리, 레트로 랜드마크는 도쿄 타워, 무료 전경은 도쿄도청입니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["전망대", "높이", "특징", "가격(약)", "지역・가까운 역"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            높이와 가격은 2026년 기준 개략값이며 조정될 수 있으니 결제 전에 확인하세요. 스카이트리는 350 m
            전망대가 약 ¥1,800, 450 m 전망 회랑을 추가하면 약 ¥1,400이 더 들어 세트권이 약 ¥3,100입니다.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>예약 절차</span>
          <h2 className={styles.sectionTitle}>시부야 스카이 예약 방법</h2>
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

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 예약(2026): 티켓 가격, 입장 시간, 보더리스와 비교" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드・씨 선택" },
            { href: "/ko/guides/attractions/usj-tickets-express-pass", title: "유니버설 스튜디오 재팬 익스프레스 패스(2026): 티켓은 어떤 것을 살까" },
            { href: "/ko/guides/esim/best-esim-japan", title: "일본 이심 추천(2026): eSIM 요금제 비교와 클룩 일본 eSIM" },
            { href: "/guides/attractions/things-to-do-tokyo", title: "도쿄에서 무엇을 할까 — 예약이 필요한 것과 그냥 가도 되는 것(영어)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>시부야의 일몰을 먼저 잡아 두세요</h2>
            <p className={styles.ctaBannerDesc}>
              온라인이 현장보다 저렴하고, 일몰 회차를 확보할 수 있는 유일한 방법입니다. 클룩은 해외 발행 카드로
              결제할 수 있고 입장 24시간 전까지 무료 취소가 됩니다. 도쿄 날씨가 바뀌어도 손해가 없습니다.
            </p>
            <KlookLink href={koShibuyaSky.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              시부야 스카이 티켓 보기 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
