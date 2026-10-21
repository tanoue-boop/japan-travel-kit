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
import { koFujiDayTour, koTokyoDisney, koTokyoSightseeingBusTour } from "../../../../lib/klook-links-ko";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, monthLabel } from "../../../../lib/i18n";

const ROUTE = "/ko/guides/attractions/tokyo-disney-tickets";
const TITLE = "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드・씨 선택";
const DESC =
  "도쿄 디즈니랜드 티켓 2026: 모든 티켓이 날짜 지정이고 현장 판매가 없습니다. 해외 발행 카드가 막힐 때 사는 방법, " +
  "그리고 디즈니랜드와 디즈니씨 중 어디를 고를지. 내용은 영어판과 같은 사실입니다.";

// Facts and figures are the English guide's, unchanged. Tokyo Disney publishes no
// fixed yen price — the passport is variable, date-based — so this page quotes the
// same indicative "from about $55" the English page does and nothing more.
const ticketRows = [
  {
    ticket: "1데이 패스포트(현재 판매 중)",
    what: "날짜 지정, 두 파크 중 한 곳 입장(랜드 또는 씨)",
    price: "약 $55부터, 날짜에 따라 변동 — 예약 시 확인",
  },
  {
    ticket: "멀티데이 및 기타 패스포트",
    what: "집필 시점에는 일반 판매되지 않았습니다 — 판매 상황은 바뀝니다",
    price: "예약 시 실시간 재고 확인",
  },
  {
    ticket: "현장・게이트 판매",
    what: "없습니다 — 모든 티켓이 날짜 지정이며 사전 구매가 필요합니다",
    price: "해당 없음",
  },
];

const parkRows = [
  {
    park: "도쿄 디즈니랜드",
    style: "클래식한 캐슬 파크: 퍼레이드, 불꽃, 온 가족용 어트랙션",
    suits: "첫 방문, 어린 아이 동반, 클래식 디즈니 팬",
    note: "다른 디즈니를 가 봤다면 동선이 익숙합니다",
  },
  {
    park: "도쿄 디즈니씨",
    style: "항해와 물을 주제로 한 파크. 전 세계에서 도쿄에만 있고 성인 취향이며 파크 내에서 주류를 판매합니다",
    suits: "성인, 커플, 색다른 체험을 원하는 재방문자",
    note: "25주년 기념 기간(2026년 4월~2027년 3월)",
  },
];

const whoFor = [
  {
    title: "도쿄 디즈니랜드를 고른다면",
    desc: "어린 아이와 함께이거나, 어느 디즈니든 처음 가는 경우입니다. 클래식한 캐슬 파크 배치에 낮 퍼레이드가 있고 온 가족용 어트랙션에 무게가 실립니다. 편하고 익숙한 하루입니다.",
  },
  {
    title: "도쿄 디즈니씨를 고른다면",
    desc: "다른 디즈니 리조트에서는 얻을 수 없는 것을 원하고, 성인이거나 아주 어린 아이가 없는 경우입니다. 디즈니씨는 더 성인 취향이고 테마 항구는 도쿄에만 있으며, 랜드와 달리 파크 내에서 주류를 판매합니다.",
  },
  {
    title: "2026년에 간다면 기념 기간 주의",
    desc: "도쿄 디즈니씨는 2026년 4월부터 2027년 3월까지 25주년을 기념합니다. 기념 기간은 보통 더 붐비고 인기 날짜가 더 빨리 마감되므로, 날짜 지정 티켓을 되도록 일찍 예약하세요.",
  },
];

const steps = [
  {
    title: "파크와 정확한 날짜를 먼저 정합니다",
    desc: "도쿄 디즈니의 모든 티켓은 날짜 지정입니다. 갈 날짜와 들어갈 파크를 고르고, 그 티켓은 그날만 유효합니다. 1데이 패스포트는 두 파크가 아니라 한 파크만 포함하므로 구매 전에 랜드인지 씨인지 결정하세요.",
  },
  {
    title: "일찍 예약하세요. 현장 판매가 없습니다",
    desc: "게이트에서 티켓을 팔지 않고 모든 티켓이 특정 날짜에 묶여 있으므로, 인기 날짜는 몇 주에서 몇 달 전에 마감될 수 있습니다. 예약을 출발 전에 끝내야 하는 일로 다루세요.",
  },
  {
    title: "해외 발행 카드가 막히면 클룩을 씁니다",
    desc: "도쿄 디즈니 리조트 공식 사이트는 해외에서 발행된 신용카드를 거부하거나 막는 일이 잦습니다. 클룩은 공식 승인 판매 채널로, 해외 카드를 받고 화면이 한국어입니다. 많은 해외 여행자가 이 경로를 쓰는 이유입니다.",
  },
  {
    title: "전자 티켓 QR을 공식 앱에 등록합니다",
    desc: "구매하면 전자 티켓 QR 코드를 받습니다. 그 QR을 도쿄 디즈니 리조트 공식 앱에 등록할 수 있고, 당일 파크 내 기능도 거기서 씁니다. 출발 전에 설정해 두면 입장할 때 시간이 절약됩니다.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도쿄 디즈니랜드 티켓은 꼭 미리 사야 하나요?",
    a: "그렇습니다. 도쿄 디즈니 리조트는 게이트에서 티켓을 판매하지 않습니다. 모든 티켓이 날짜 지정이고, 구매 시점에 날짜와 파크를 골라야 합니다. 인기 날짜는 몇 주에서 몇 달 전에 마감될 수 있어 사전 예약은 선택이 아니라 사실상 필수입니다.",
  },
  {
    q: "해외 발행 신용카드로 도쿄 디즈니 티켓을 살 수 있나요?",
    a: "도쿄 디즈니 리조트 공식 사이트에서는 안 되는 경우가 많습니다. 공식 사이트가 해외에서 발행된 카드를 거부하거나 막는 일이 잦고, 해외 여행자에게 흔한 문제입니다. 일반적인 해법은 클룩입니다. 공식 승인 판매 채널이고 해외 카드를 받으며 화면이 한국어이고, 도쿄 디즈니 리조트 공식 앱에 등록할 수 있는 전자 티켓 QR 코드를 발송합니다.",
  },
  {
    q: "도쿄 디즈니랜드와 디즈니씨 중 어디를 가야 할까요?",
    a: "1데이 패스포트는 한 파크만 포함하므로 보통 한쪽을 골라야 합니다. 도쿄 디즈니랜드는 클래식한 캐슬 파크로 퍼레이드와 온 가족용 어트랙션이 중심이며, 첫 방문자와 어린 아이가 있는 가족에게 맞습니다. 도쿄 디즈니씨는 항해를 주제로 한 파크로 전 세계에서 도쿄에만 있고, 더 성인 취향이며 파크 내에서 주류를 판매합니다. 2026년 4월부터 2027년 3월까지 25주년도 기념합니다. 아이와 처음 간다면 랜드가 안전한 선택이고, 색다른 것을 원하면 씨입니다.",
  },
  {
    q: "지금은 어떤 티켓이 판매되나요?",
    a: "집필 시점에 일반 판매되는 것은 보통 1데이 패스포트입니다. 날짜에 따라 변동하는 가격 체계이고 대략 약 $55부터이지만, 금액은 날짜와 수요에 따라 달라지므로 예약 시점에 본인 날짜의 실시간 가격을 확인하세요. 다른 패스포트 종류의 판매 여부는 기간에 따라 다르니 그때의 재고를 확인하세요.",
  },
  {
    q: "도쿄 디즈니 1데이 패스포트는 얼마인가요?",
    a: "가격은 날짜에 따라 변동하므로 같은 패스포트가 인기 날짜에는 한가한 날짜보다 비쌉니다. 대략 약 $55부터이지만 어디까지나 '부터' 참고값으로만 보세요. 2026년 가격은 조정될 수 있으니 예약 시점에 본인 날짜의 실제 금액을 확인하세요.",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "도쿄 디즈니랜드 티켓" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoTokyoDisneyTicketsPage({ updated }: { updated: PageUpdated }) {
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
            도쿄 디즈니랜드 티켓(2026):<br />날짜 지정 예매와 랜드・씨 선택
          </h1>
          <p className={styles.heroSubtitle}>
            모든 티켓이 날짜 지정이고 현장 판매는 아예 없는데, 공식 사이트는 해외 발행 카드를 자주 거부합니다.
            이 페이지는 사는 방법과 두 파크 중 무엇을 고를지 정리합니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "날짜 지정 티켓", "해외 카드는 클룩"].map((t) => (
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
                <p className={styles.verdictStatLabel}>현재 판매</p>
                <p className={styles.verdictStatValue}>1데이 패스포트</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>가격(참고)</p>
                <p className={styles.verdictStatValue}>약 $55부터, 변동</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>현장 판매</p>
                <p className={styles.verdictStatValue}>없음 — 날짜 지정뿐</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>해외 발행 카드?</p>
                <p className={styles.verdictStatValue}>클룩(공식 승인 채널)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>결론:</strong> 파크와 날짜를 먼저 고르고 1데이 패스포트를 미리 예약하세요. 현장 판매가
              없고 인기 날짜는 마감됩니다. 공식 사이트가 해외 발행 카드를 거부하면 클룩이 공식 승인 판매
              채널이고, 해외 카드를 받고 공식 앱에 등록할 수 있는 QR 코드를 보냅니다.
            </p>
            <a href={koTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              도쿄 디즈니 티켓 보기 →
            </a>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>2026년 도쿄 디즈니 티켓은 어떻게 돌아가나</h2>
          <p className={styles.bodyText}>
            도쿄 디즈니 리조트는 도쿄 동쪽 우라야스에 있고 두 개의 독립된 파크로 이루어져 있습니다.
            <strong>도쿄 디즈니랜드</strong>와 <strong>도쿄 디즈니씨</strong>입니다. 티켓을 사기 전에 가장
            중요한 사실은 티켓이 <strong>날짜 지정</strong>이라는 점입니다. 정확한 날짜와 들어갈 파크를 고르고,
            그 티켓은 그날만 유효합니다.
          </p>
          <p className={styles.bodyText}>
            그리고 <strong>게이트에서는 티켓을 아예 팔지 않습니다</strong>. 당일에 현장에 가서 살 수 없다는
            뜻이고, 모든 티켓이 날짜에 묶여 있으니 인기 날짜는 몇 주에서 몇 달 전에 마감될 수 있습니다. 현재
            일반 판매되는 것은 보통 1데이 패스포트이며, 날짜에 따라 변동하는 가격 체계라 같은 패스포트가 인기
            날짜에는 더 비쌉니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>티켓 종류</span>
          <h2 className={styles.sectionTitle}>도쿄 디즈니 티켓 한눈에</h2>
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
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            가격은 변동하며 날짜에 따라 달라집니다(2026년, 조정될 수 있으니 예약 시 확인). 1데이 패스포트 ‘약
            $55부터’는 참고값일 뿐입니다. 결제 화면에서 본인 날짜와 파크의 실시간 가격을 확인하세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>랜드 vs 씨</span>
          <h2 className={styles.sectionTitle}>어느 파크를 고를까?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["파크", "전체 성격", "어울리는 사람", "비고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parkRows.map((row) => (
                    <tr key={row.park}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.park}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.style}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.suits}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            1데이 패스포트는 한 파크만 포함하므로 대부분 한쪽을 고릅니다. 위 내용은 결정을 돕기 위한 개괄이며,
            두 파크 모두 넓어서 각각 하루 일정입니다.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>어디가 맞는가</span>
          <h2 className={styles.sectionTitle}>어느 파크가 당신에게 맞나?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            어느 쪽을 고르더라도 이동 경로를 먼저 계획하세요. 리조트는 도쿄 도심에서 전철로 한 구간 떨어져
            있습니다. 도착 당일의 공항 이동은{" "}
            <Link href="/guides/transport/tokyo-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              나리타・하네다에서 도쿄 시내로 가는 가이드(영어)
            </Link>
            를 참고하세요.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>구매 절차</span>
          <h2 className={styles.sectionTitle}>도쿄 디즈니 티켓 사는 방법</h2>
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
          <span className={styles.sectionLabel}>해외 발행 카드</span>
          <h2 className={styles.sectionTitle}>왜 많은 여행자가 클룩으로 돌아서는가</h2>
          <p className={styles.bodyText}>
            도쿄 디즈니 리조트 공식 사이트가 기본 구매 경로이지만, 해외에서 발행된 신용카드를 거부하거나 막는
            일이 잦습니다. 해외 여행자에게는 오래된 골칫거리입니다. 이 경우 간단한 대안이 있습니다.
          </p>
          <p className={styles.bodyText}>
            <strong>클룩은 도쿄 디즈니 리조트의 공식 승인 판매 채널입니다.</strong> 해외 카드를 받고 화면이
            한국어이며, 도쿄 디즈니 리조트 공식 앱에 등록할 수 있는 전자 티켓 QR 코드를 발송합니다. 해외 카드
            지원과 앱에 등록되는 QR, 이 조합이 해외 여행자의 일반적인 방법이 된 이유입니다. 도쿄의 다른 일정을
            같이 짜고 있다면, 저희{" "}
            <Link href="/ko/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              시부야 스카이 예약 가이드
            </Link>
            도 예약 플랫폼이 더 수월한 또 하나의 사례를 다룹니다.
          </p>
        </section>

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>같은 도시의 1일 투어</span>
          <h2 className={styles.sectionTitle}>파크에 가지 않는 하루는 어떻게 쓸까</h2>
          <p className={styles.bodyText}>
            파크에 가면 하루가 다 들어갑니다. 그래서 대부분은 도쿄 일주일 안에 디즈니를 넣는 것이고, 디즈니
            안에 일주일을 넣는 게 아닙니다. 아래 두 일정은 파크에 가지 않는 하루를 채울 수 있고, 티켓과 같은
            클룩 계정에서 결제됩니다.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <a href={koFujiDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              {koFujiDayTour.label} 보기 →
            </a>
            <a href={koTokyoSightseeingBusTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              {koTokyoSightseeingBusTour.label} 보기 →
            </a>
          </div>
        </section>

        <Related
          items={[
            { href: "/ko/guides/attractions/usj-tickets-express-pass", title: "유니버설 스튜디오 재팬 익스프레스 패스(2026): 티켓은 어떤 것을 살까" },
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법" },
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 예약(2026): 티켓 가격, 입장 시간, 보더리스와 비교" },
            { href: "/ko/guides/esim/best-esim-japan", title: "일본 이심 추천(2026): eSIM 요금제 비교와 클룩 일본 eSIM" },
            { href: "/guides/attractions/things-to-do-tokyo", title: "도쿄에서 무엇을 할까 — 예약이 필요한 것과 그냥 가도 되는 것(영어)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>도쿄 디즈니 날짜를 먼저 확보하세요</h2>
            <p className={styles.ctaBannerDesc}>
              현장 판매가 없고 인기 날짜는 마감되므로 미리 예약하세요. 클룩은 공식 승인 판매 채널로 해외 발행
              신용카드를 받고, 공식 앱에 등록할 수 있는 QR 코드를 보냅니다.
            </p>
            <a href={koTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              도쿄 디즈니 티켓 보기 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
