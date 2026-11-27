// Korean edition of /guides/attractions/teamlab-tokyo-tickets. Mirrors the English comparison
// page: since 20 Nov 2026 (task jtk-20261120-R01) the same order — a numbers-first answer, one
// comparison table with the verdict in row one, the Klook buttons and same-day block under it,
// short Planets-only / Borderless-only sections that hand over to their own guides, and the
// same five FAQ questions. Official figures were re-read on teamlab.art on 20 Nov 2026.
import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../../components/BookingEsimCard";
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
import NextBookingBlock from "../../../../components/NextBookingBlock";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import { fujiDayTour, klookEsim, tokyoSightseeingBusTour, tokyoSubwayTicket } from "../../../../lib/klook-links";
import { koTeamlabBorderless, koTeamlabPlanets } from "../../../../lib/klook-links-ko";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import KlookAddOnLine from "../../../../components/KlookAddOnLine";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import HotelStayBlock from "../../../../components/HotelStayBlock";
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import { teamlabSameDayCards } from "../../../../lib/teamlab-same-day-cards";

// Same-day cards under the comparison table (task-jtk-20261115-P01, moved 20 Nov 2026).
const SAME_DAY = teamlabSameDayCards("tokyo", "ko");

const ROUTE = "/ko/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "팀랩 플래닛 보더리스 비교 2026: 가격·어디로 갈까";
const DESC =
  "도쿄 팀랩 티켓은 두 곳 따로. 성인 플래닛 ¥3,800~, 보더리스 ¥3,400~. 아이와 함께면 플래닛, 성인 첫 방문은 보더리스.";

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const CHECKED_ISO = "2026-11-20";
const CHECKED = dateLabel(CHECKED_ISO, "ko");
const P_ADULT = priceLabel(P.adult, "ko");
const B_ADULT = priceLabel(B.adult, "ko");
const P_CHILD = priceLabel(P.child, "ko");
const B_CHILD = priceLabel(B.child, "ko");

// 1행이 결론입니다.
const compareRows = [
  { factor: "이런 분께", planets: "아이와 함께, 또는 맨발로 물속을 걷고 싶은 분", borderless: "아이 없이 처음 가는 분, 신발을 신은 채 천천히 작품을 보고 싶은 분" },
  { factor: "성인(18세 이상)", planets: `${P_ADULT}, 붐비는 날짜·시간대는 더 비쌈`, borderless: `${B_ADULT}, 붐비는 날짜·시간대는 더 비쌈` },
  { factor: "13~17세", planets: "¥2,800", borderless: "¥2,800" },
  { factor: "어린이(4~12세)", planets: `${P_CHILD}, 3세 이하 무료`, borderless: `${B_CHILD}, 3세 이하 무료` },
  { factor: "물에 들어가나요", planets: "예. 맨발, 성인 무릎 높이까지", borderless: "아니요. 신발을 신고 관람" },
  { factor: "관람 시간", planets: "공식 안내 없음. 1.5~2시간 잡으세요", borderless: "약 1.5~2시간(공식 FAQ), 관람 시간 제한 없음" },
  { factor: "매진되나요", planets: "시간 지정제이며 현장 판매가 없으므로 온라인으로 미리 예약", borderless: "공식 사이트에서 매진될 수 있다고 안내. 방문 2개월 전 1일 무렵 판매 시작" },
  { factor: "현장 구매", planets: "현장 판매 없음", borderless: "남은 회차가 있으면 현장 구매 가능(¥200 추가)" },
  { factor: "가까운 역", planets: "신토요스역(유리카모메) 1A 출구 도보 3분", borderless: "가미야초역(히비야선) 5번 출구 도보 2분" },
  { factor: "운영 시간", planets: "08:00–22:00(12/31~1/2는 08:00–20:00)", borderless: "08:30–21:00, 날짜에 따라 다름" },
  { factor: "운영 기간", planets: "2027년 말까지", borderless: "상설" },
];

const whoFor = [
  {
    title: "플래닛을 고른다면",
    desc: "아이와 함께이거나, 몸을 쓰는 체험을 원하고 발이 젖어도 괜찮은 경우입니다. 성인 무릎 높이까지 차오르는 물속을 맨발로 걷습니다.",
  },
  {
    title: "보더리스를 고른다면",
    desc: "물속을 걷기보다 작품을 보고 싶은 경우입니다. 정해진 경로가 없고, 작품이 방 사이를 옮겨 다니며, 자신의 속도에 맞춰 자유롭게 관람합니다.",
  },
  {
    title: "둘 다 간다면",
    desc: "반나절씩 두 번 시간을 낼 수 있고 팀랩을 좋아하는 경우입니다. 도쿄의 서로 다른 지역에 있고 시간 지정 티켓도 따로 필요하니 방문 날짜를 나누세요.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "팀랩 플래닛과 보더리스 중 어디가 더 좋나요?",
    a: "어느 한쪽이 더 낫다고 할 수는 없습니다. 플래닛은 성인 무릎 높이까지 오는 물속을 맨발로 걷는 체험형이라 아이와 함께 가기에 맞고, 보더리스는 지도도 정해진 경로도 없이 신발을 신은 채 천천히 작품을 보는 곳입니다. 아이와 함께라면 플래닛, 아이 없이 처음 간다면 보더리스를 고르세요.",
  },
  {
    q: "2026년 도쿄 팀랩 티켓 가격은 얼마인가요?",
    a: `성인 티켓은 플래닛 ${P_ADULT}, 보더리스 ${B_ADULT}이며 붐비는 날짜와 시간대에는 더 비쌉니다(${CHECKED} teamlab.art 확인). 13~17세는 ¥2,800, 4~12세는 두 곳 모두 ${P_CHILD}, 3세 이하는 무료입니다. 두 곳 모두 가면 성인 1인 ¥7,200부터입니다.`,
  },
  {
    q: "팀랩 티켓은 매진되나요?",
    a: "매진될 수 있습니다. 보더리스 공식 사이트는 티켓이 날짜·시간 지정이라 매진될 수 있다며 일정이 정해지면 바로 구매하라고 안내하고, 티켓은 방문 2개월 전 1일 무렵 판매를 시작합니다. 플래닛은 현장에서 티켓을 팔지 않으므로 반드시 온라인으로 미리 예약해야 합니다.",
  },
  {
    q: "플래닛과 보더리스를 같은 날 갈 수 있나요?",
    a: "티켓이 각각 날짜와 시간을 지정하므로 갈 수는 있습니다. 다만 두 곳은 도요스와 아자부다이힐스로 떨어져 있고, 보더리스 관람에 약 1.5~2시간이 걸린다고 teamLab이 안내합니다. 두 입장 시간 사이에 관람 시간과 이동 시간을 충분히 비워 두거나, 반나절씩 나누세요.",
  },
  {
    q: "팀랩 티켓은 어디서 사는 게 가장 싼가요?",
    a: "기본 가격은 공식 티켓 사이트가 정하며, teamLab은 보더리스의 공식 판매처로 클룩을 함께 안내합니다. 가격 차이는 주로 방문 날짜에서 생깁니다. 두 곳 모두 붐비는 날짜·시간대에 성인 가격이 오르니 여러 날짜의 가격을 비교한 뒤 결제하세요. 보더리스는 현장 구매가 온라인보다 ¥200 비쌉니다.",
  },
];

// 영어판과 같은 상품을 클룩 한국어 경로로 연결합니다.
const subwayTour = withKlookLocale(tokyoSubwayTicket, "ko", {
  title: "도쿄 서브웨이 티켓(24 / 48 / 72시간)",
  desc: "도쿄메트로와 도에이 지하철 전 노선 무제한 승차. 현장에서 줄 서서 구매할 필요 없이 도착 후 수령",
});
const tours = [
  withKlookLocale(tokyoSightseeingBusTour, "ko", {
    title: "도쿄 관광버스 1일 투어",
    desc: "고쿄 정원, 아사쿠사, 도쿄 스카이트리를 둘러보는 가이드 투어, 다국어 오디오 안내가 포함됩니다",
  }),
  withKlookLocale(fujiDayTour, "ko", {
    title: "도쿄 출발 후지산 당일 투어",
    desc: "후지산 5합목, 가와구치호, 오시노핫카이를 둘러보는 종일 버스 투어로, 당일 저녁 도쿄로 돌아옵니다",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "팀랩 플래닛 보더리스 비교" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoTeamLabTokyoPage({ updated }: { updated: PageUpdated }) {
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
            팀랩 플래닛 보더리스 비교 2026: <br />가격·어디로 갈까
          </h1>
          <p className={styles.heroSubtitle}>
            도쿄에는 팀랩 미술관이 두 곳 있으며, 티켓은 각각 따로 구매해야 합니다. 두 곳이 어떻게 다른지, 어디를 예약하면 좋은지
            정리했습니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 가격", "나란히 비교"].map((t) => (
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
            <p className={styles.verdictText}>
              <strong>도쿄의 두 팀랩 미술관</strong>은 티켓을 각각 따로 판매합니다. 성인 기준 도요스의 <strong>팀랩 플래닛은 {P_ADULT}</strong>,
              아자부다이힐스의 <strong>팀랩 보더리스는 {B_ADULT}</strong>이고, 4~12세는 두 곳 모두 {P_CHILD}입니다({CHECKED}{" "}
              공식 사이트 확인). 보더리스 관람은 약 1.5~2시간이라고 teamLab이 안내하며, 플래닛은 공식 관람 시간 안내가 없으므로
              마찬가지로 1.5~2시간을 예상하세요. 아이와 함께라면 무릎 높이 물속을 맨발로 걷는 <strong>플래닛</strong>, 아이 없이 처음
              간다면 신발을 신은 채 관람하는 <strong>보더리스</strong>를 예약하세요.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={koTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                플래닛 티켓 보기 →
              </KlookLink>
              <KlookLink href={koTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                보더리스 티켓 보기 →
              </KlookLink>
            </div>
            {/* A32 (27 Nov 2026): one line of 5% / 20% under the 2% ticket buttons. */}
            <KlookAddOnLine
              lead="같은 날 함께:"
              items={[
                { label: "도쿄 서브웨이 티켓(24·48·72시간)", url: klookFor(tokyoSubwayTicket.url, "ko") },
                { label: "클룩 일본 eSIM", url: klookFor(klookEsim.url, "ko") },
              ]}
            />
            {/* A34 (27 Nov 2026): the next booking of the same trip (high-EPC guides) — lib/next-booking.ts. */}
            <NextBookingBlock region="tokyo" locale="ko" />
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>나란히 비교</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛과 보더리스, 어디를 예약할까?</h2>
          <p className={styles.bodyText}>
            아이와 함께라면 플래닛, 성인끼리 처음이라면 보더리스입니다. 이유는 아래 표에 항목별로 정리했습니다.
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
            최종 확인: {CHECKED_ISO}. 출처:{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>,{" "}
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>,
            보더리스 FAQ{" "}
            <a href="https://www.teamlab.art/faq/Tokyo/" target="_blank" rel="noopener noreferrer">teamlab.art/faq/Tokyo</a>.
            두 곳 모두 성인 요금이 날짜와 시간대에 따라 달라지고 최저 요금만 공개하므로 본인 날짜의 금액을 확인하세요. 플래닛 관람
            시간은 계획용 기준이며 teamLab의 공식 안내는 없습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={koTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              내 날짜의 플래닛 티켓 보기 →
            </KlookLink>
            <KlookLink href={koTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              내 날짜의 보더리스 티켓 보기 →
            </KlookLink>
          </div>
        </section>

        <KlookSameDayCards heading={SAME_DAY.heading} cards={SAME_DAY.cards} />

        <KlookTourPicks
          heading="도요스와 아자부다이힐스 사이 이동"
          intro="보더리스에서 가까운 가미야초역은 도쿄메트로 히비야선 역이고, 서브웨이 티켓으로 도쿄메트로와 도에이 지하철 전 노선을 24·48·72시간 동안 이용할 수 있습니다. 플래닛에서 가까운 신토요스역은 유리카모메 역이라 이 티켓으로 이용할 수 없으니, 유라쿠초선 도요스역을 이용하세요."
          tours={[subwayTour]}
        />

        <BookingEsimCard />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>플래닛만 간다면</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛에 가기로 정했나요?</h2>
          <p className={styles.bodyText}>
            도요스의 팀랩 플래닛은 성인 {P_ADULT}의 시간 지정 티켓만 팔고 현장 판매는 없으므로, 온라인에서 날짜와 입장 시간을
            선택해 예약해야 합니다. 날짜별 가격, 프리미엄 패스, 물에 들어갈 때의 복장, 신토요스역·도요스역에서 가는 길은
            플래닛 가이드에 정리했습니다. 같은 도쿄 일정에 일몰 시간대의 전망대 방문을 넣는다면{" "}
            <Link href="/ko/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              시부야 스카이 예약
            </Link>
            도 입장 2주 전 0시에 열리는 시간 지정권이라 팀랩과 함께 미리 잡아 두는 편이 좋습니다. 디즈니랜드·디즈니씨도
            날짜 지정이고 현장 판매가 없으며 방문 2개월 전에 예약이 시작되므로, 같은 여행이라면{" "}
            <Link href="/ko/guides/attractions/tokyo-disney-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              도쿄 디즈니 티켓
            </Link>{" "}
            가이드에서 가격과 예약 방법을 먼저 확인하세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <Link href="/ko/guides/attractions/teamlab-planets-tickets" className={styles.verdictBtn}>
              팀랩 플래닛 예약 가이드 전체 보기 →
            </Link>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>보더리스만 간다면</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스에 가기로 정했나요?</h2>
          <p className={styles.bodyText}>
            아자부다이힐스의 팀랩 보더리스는 성인 {B_ADULT}의 시간 지정 티켓과 입장 시간을 정하지 않는 Flexible Pass를 팔며,
            방문 2개월 전 1일 무렵 판매를 시작합니다. 판매 시작일, Flexible Pass, 폐관 시간 변경, 현장 구매는 보더리스
            가이드에서 확인하세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <Link href="/ko/guides/attractions/teamlab-borderless-tickets" className={styles.verdictBtn}>
              팀랩 보더리스 티켓 가이드 전체 보기 →
            </Link>
          </div>
        </section>

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="tokyo" areas={["ginza", "odaiba", "roppongi", "tokyoStation"]} />

        <EsimCtaTop />

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>어디가 나에게 맞을까</span>
          <h2 className={styles.sectionTitle}>두 팀랩 미술관 중 어디를 고를까?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="도쿄 여행에서 함께 예약하기"
          intro="두 미술관 모두 관람에 하루를 다 쓰지는 않습니다. 가이드 동반 시내 관광과 당일치기 여행을 준비했습니다. 클룩 가격은 날짜에 따라 달라지니, 본인 날짜의 금액은 상품 페이지를 열어 확인하세요."
          tours={tours}
        />

        <Related
          items={[
            { href: "/ko/guides/attractions/teamlab-planets-tickets", title: "팀랩 플래닛 예약 2026: 티켓 가격, 운영 시간, 가는 법" },
            { href: "/ko/guides/attractions/teamlab-borderless-tickets", title: "팀랩 보더리스 티켓(2026): 가격, 지정 시간 입장, 구매 경로" },
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약 2026: 티켓 가격·오픈 시간·선셋 팁" },
            { href: "/ko/guides/attractions/tokyo-skytree-tickets", title: "도쿄 스카이트리 티켓(2026): 요금과 350m·450m 전망대 선택" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드·디즈니씨 티켓 2026: 가격·예약 방법" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto 티켓: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka 티켓 2026: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 전철, 지하철, IC 카드(영어)" },
          ]}
        />
      </div>
    </>
  );
}
