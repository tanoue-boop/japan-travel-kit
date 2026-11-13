// Korean edition of /guides/attractions/teamlab-tokyo-tickets. Mirrors the English comparison
// page as of 2026-11-06: same sections, tables and FAQ. Prices come from
// lib/attraction-prices.ts and the rest from the English page's own text. Planets tickets, hours
// and access live on /ko/guides/attractions/teamlab-planets-tickets, so they are not repeated here.
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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import { fujiDayTour, tokyoSightseeingBusTour, tokyoSubwayTicket } from "../../../../lib/klook-links";
import { koTeamlabBorderless, koTeamlabPlanets } from "../../../../lib/klook-links-ko";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

const ROUTE = "/ko/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "팀랩 플래닛 보더리스 비교 2026: 도쿄에서 어디로 갈까";
const DESC =
  "도쿄의 팀랩 미술관은 두 곳이고 티켓도 따로입니다. 플래닛과 보더리스를 가격, 운영 시간, 위치로 비교하고 맞는 곳을 예약하세요.";

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const PLANETS_CHECKED = dateLabel(P.checked, "ko");
const BORDERLESS_CHECKED = dateLabel(B.checked, "ko");
const P_ADULT = priceLabel(P.adult, "ko");
const B_ADULT = priceLabel(B.adult, "ko");
const P_CHILD = priceLabel(P.child, "ko");
const B_CHILD = priceLabel(B.child, "ko");
const CHILD_AGES = "만 4~12세, 만 4세 미만 무료";

const compareRows = [
  { factor: "위치", planets: "도요스(고토구)", borderless: "아자부다이힐스(미나토구)" },
  { factor: "어떤 곳", planets: "맨발로 물속을 걷습니다", borderless: "지도 없는 미로 속 50점 이상의 작품" },
  { factor: "어울리는 사람", planets: "가족, 첫 방문, 몸으로 느끼는 체험", borderless: "미술 애호가, 천천히 둘러보기, 사진" },
  { factor: "성인 티켓", planets: P_ADULT, borderless: B_ADULT },
  { factor: "어린이 티켓", planets: `${P_CHILD}(${CHILD_AGES})`, borderless: `${B_CHILD}(${CHILD_AGES})` },
  { factor: "운영 시간", planets: "08:00–22:00(12/31~1/2는 08:00–20:00)", borderless: "공지 08:30–21:00, 날짜에 따라 변동" },
  { factor: "입장", planets: "날짜와 입장 시간 지정", borderless: "지정 회차 또는 시간 미지정 Flexible Pass" },
  { factor: "현장 티켓", planets: "현장 판매 없음", borderless: "현장 구매 시 ¥200 더 비쌉니다" },
  { factor: "운영 기간", planets: "2027년 말까지", borderless: "상설" },
];

const whoFor = [
  {
    title: "플래닛을 고른다면",
    desc: "아이와 함께이거나, 몸을 쓰는 체험을 원하고 발이 젖어도 괜찮은 경우입니다. 성인 무릎 높이까지 오는 물속을 맨발로 걷습니다.",
  },
  {
    title: "보더리스를 고른다면",
    desc: "물속을 걷기보다 작품을 보고 싶은 경우입니다. 정해진 경로가 없고, 작품이 방 사이를 옮겨 다니며, 자기 속도로 돌아다닙니다.",
  },
  {
    title: "둘 다 간다면",
    desc: "비어 있는 반나절이 두 번 있고 팀랩을 좋아하는 경우입니다. 도시의 서로 다른 구역에 있고 시간 지정 티켓도 따로 필요하니 날짜를 나누세요.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도쿄 팀랩은 플래닛과 보더리스 중 어디가 더 좋은가요?",
    a: "어느 한쪽이 더 낫다고 할 수는 없습니다. 플래닛은 몸으로 체험하고 싶은 가족과 첫 방문객에게 맞고, 맨발로 물속을 걷습니다. 보더리스는 지도도 정해진 경로도 없이 천천히 둘러보고 싶은 미술 애호가에게 맞습니다. 한 곳만 갈 수 있고 아이와 함께라면 플래닛을 고르세요.",
  },
  {
    q: "팀랩 플래닛과 보더리스는 같은 티켓인가요?",
    a: "아니요. 도쿄의 서로 다른 구역에 있는 별개의 미술관이고 티켓도 따로입니다. 플래닛 티켓으로 보더리스에 들어갈 수 없고, 반대도 마찬가지입니다.",
  },
  {
    q: "도쿄 팀랩 티켓은 얼마인가요?",
    a: `플래닛 성인 티켓은 ${P_ADULT}입니다(${PLANETS_CHECKED} 확인). 보더리스 성인 티켓은 ${B_ADULT}입니다(${BORDERLESS_CHECKED} 확인). 두 곳 모두 날짜와 시간에 따라 금액이 달라지므로 본인 날짜의 금액을 확인하세요.`,
  },
  {
    q: "플래닛과 보더리스를 같은 날 갈 수 있나요?",
    a: "티켓이 각각 날짜와 시간을 지정하므로 갈 수는 있습니다. 다만 두 곳은 도시의 다른 구역에 있고 각각 시간이 꽤 걸리니, 반나절씩 나누는 편이 수월합니다.",
  },
  {
    q: "아이와 가기에는 어느 팀랩이 좋은가요?",
    a: "플래닛입니다. 만 4세 미만은 두 곳 모두 무료지만, 플래닛은 짧고 몸을 쓰는 체험이라 아이가 따라가기 쉽습니다. 물 구간에서는 모두 젖으니 여벌 옷을 챙기고, 유모차는 안으로 들어갈 수 없다는 점을 기억하세요.",
  },
];

// 영어판과 같은 상품을 클룩 한국어 경로로 연결합니다.
const tours = [
  withKlookLocale(tokyoSubwayTicket, "ko", {
    title: "도쿄 서브웨이 티켓(24 / 48 / 72시간)",
    desc: "도쿄메트로와 도에이 지하철 전 노선 무제한 승차. 줄 서서 사는 대신 도착해서 수령",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "ko", {
    title: "도쿄 관광버스 1일 투어",
    desc: "황거 정원, 아사쿠사, 도쿄 스카이트리를 도는 가이드 투어, 다국어 오디오 안내 포함",
  }),
  withKlookLocale(fujiDayTour, "ko", {
    title: "도쿄 출발 후지산 1일 투어",
    desc: "후지산 5합목, 가와구치호, 오시노핫카이를 도는 종일 버스 투어, 당일 저녁 도쿄 복귀",
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
            팀랩 플래닛 보더리스 비교(2026):<br />도쿄에서 어디를 예약할까
          </h1>
          <p className={styles.heroSubtitle}>
            도쿄에는 팀랩 미술관이 두 곳 있고 티켓도 각각입니다. 두 곳이 어떻게 다른지, 어디를 예약하면 좋은지
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
              도쿄 팀랩은 두 미술관 중 하나를 고르는 일입니다. 아이와 함께이거나 물속을 걷고 싶다면{" "}
              <strong>플래닛</strong>, 천천히 작품을 둘러보고 싶다면 <strong>보더리스</strong>를 예약하세요.
              티켓은 각각이고 성인 기준 플래닛은 {P_ADULT}, 보더리스는 {B_ADULT}입니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={koTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                플래닛 티켓 보기 →
              </KlookLink>
              <KlookLink href={koTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                보더리스 티켓 보기 →
              </KlookLink>
            </div>
          </div>
        </div>

        <p className={styles.bodyText}>
          이미 정했다면 운영 시간, 예약, 가는 법은{" "}
          <Link href="/ko/guides/attractions/teamlab-planets-tickets">팀랩 플래닛 예약 가이드</Link>에서, 보더리스는{" "}
          <Link href="/ko/guides/attractions/teamlab-borderless-tickets">팀랩 보더리스 티켓 가이드</Link>에서 확인하세요.
        </p>

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>나란히 비교</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛과 보더리스, 어디를 예약할까?</h2>
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
            플래닛은 {PLANETS_CHECKED}에 teamlab.art와 공식 티켓 스토어에서, 보더리스는 {BORDERLESS_CHECKED}에
            teamlab.art에서 읽었습니다. 두 곳 모두 성인 티켓 금액이 날짜와 시간에 따라 달라지므로 본인 날짜로
            확인하세요.
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

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="같은 여행에 함께 예약하기"
          intro="두 미술관 모두 도쿄 하루의 일부를 차지합니다. 지하철, 가이드 동반 시내 관광, 당일 여행을 준비했습니다. 클룩 가격은 날짜에 따라 달라지니, 본인 날짜의 금액은 상품 페이지를 열어 확인하세요."
          tours={tours}
        />

        <Related
          items={[
            { href: "/ko/guides/attractions/teamlab-planets-tickets", title: "팀랩 플래닛 예약 2026: 티켓 가격, 운영 시간, 가는 법" },
            { href: "/ko/guides/attractions/teamlab-borderless-tickets", title: "팀랩 보더리스 티켓(2026): 가격, 지정 시간 입장, 구매 경로" },
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 티켓 예약 2026: 가격·예약 오픈·일몰 시간" },
            { href: "/ko/guides/attractions/tokyo-skytree-tickets", title: "도쿄 스카이트리 티켓(2026): 요금과 플로어 350·450 선택" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드·씨 선택" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto 티켓: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka 티켓 2026: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 전철, 지하철, IC 카드(영어)" },
          ]}
        />
      </div>
    </>
  );
}
