import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import tools from "../../../../styles/Tools.module.css";
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
import { koKlookEsim } from "../../../../lib/klook-links-ko";
import { klookEsim } from "../../../../lib/klook-links";
import {
  cheapestPlan,
  formatDate,
  formatUsd,
  getProvider,
  latestCheckedAt,
  priceAtLeastLabel,
  priceFromLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, monthLabel } from "../../../../lib/i18n";

const ROUTE = "/ko/guides/esim/best-esim-japan";
const TITLE = "일본 이심 추천(2026): eSIM 요금제 비교와 클룩 일본 eSIM";
const DESC =
  "일본 이심 추천 2026: 클룩 일본 eSIM과 함께 Airalo, Holafly, eSIM Go, Sakura Mobile 네 곳의 가격, 통신망, " +
  "통화 지원을 비교합니다. 가격은 매일 각 사 공식 사이트에서 수집하며, 영어판과 같은 데이터·같은 확인 시각입니다.";

// Prices come from data/esim-prices.json via lib/esim-prices.ts — the same file
// scripts/fetch-esim-prices.mjs refreshes daily and the English page reads. The
// Korean edition quotes no figure the English one does not.
const pricesCheckedAt = formatDate(latestCheckedAt());

// The eSIM hub and the full plan table are English-only for now, so the "see every
// plan" links are labelled as English rather than silently switching language.
const PLANS_HREF = "/guides/esim/japan-esim-data-plans";

type KoPick = {
  esimId: EsimProviderId;
  rank: number;
  name: string;
  bestFor: string;
  target: string;
  voice: boolean;
  physicalSim: boolean;
  /** Set where we cannot link the provider itself — see HOLAFLY_NOTE. */
  altOf?: EsimProviderId;
  altNote?: string;
};

// Holafly runs no affiliate programme we can join, which is why the English page
// points its CTA at Airalo's unlimited plans. Same decision, stated the same way.
const HOLAFLY_NOTE =
  "Holafly는 저희가 가입할 수 있는 제휴 프로그램을 운영하지 않습니다. 그래서 이 링크는 저희가 권하는 대안인 Airalo의 무제한 요금제로 연결됩니다.";

const picks: KoPick[] = [
  {
    esimId: "airalo",
    rank: 1,
    name: "Airalo",
    bestFor: "종합 1순위",
    target: "대부분의 여행자 — 안정적이고 저렴하며 설정이 아주 간단합니다.",
    voice: false,
    physicalSim: false,
  },
  {
    esimId: "holafly",
    rank: 2,
    name: "Holafly",
    bestFor: "무제한 1순위",
    target: "데이터를 많이 쓰는 사람: 원격 근무, 라이브 방송, 매일 영상 통화.",
    voice: false,
    physicalSim: false,
    altOf: "airalo",
    altNote: HOLAFLY_NOTE,
  },
  {
    esimId: "esimgo",
    rank: 3,
    name: "eSIM Go",
    bestFor: "가성비",
    target: "예산이 빡빡하거나 이번 여행에서 아시아 여러 나라를 도는 사람.",
    voice: false,
    physicalSim: false,
  },
  {
    esimId: "sakura",
    rank: 4,
    name: "Sakura Mobile",
    bestFor: "장기 체류 1순위",
    target: "한 달 이상 머물고 음성 통화와 영어 고객 지원이 필요한 사람.",
    voice: true,
    physicalSim: true,
  },
];

const installSteps = [
  {
    title: "구매하고 QR 코드를 받습니다",
    desc: "출발 전에 온라인으로 사 두세요. 몇 분 안에 이메일로 QR 코드가 도착합니다.",
  },
  {
    title: "설정에서 QR 코드를 스캔합니다",
    desc: "설정 → 셀룰러(모바일 데이터) → eSIM 추가 → QR 코드 스캔. 2분이 안 걸리고, 짐을 싸기 전에 집에서 끝낼 수 있습니다.",
  },
  {
    title: "도착하면 활성화합니다",
    desc: "비행기가 착륙하면 모바일 데이터를 일본 eSIM으로 전환하세요. 수하물 수취대에 가기 전에 이미 연결됩니다. 공항에서 심카드 자판기를 찾을 필요가 없습니다.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "eSIM이란 무엇이고 일본에서 꼭 필요한가요?",
    a: "eSIM은 휴대폰에 내장된 디지털 심입니다. 물리 카드가 필요 없습니다. QR 코드로 프로필을 내려받으면 바로 쓸 수 있습니다. 일본 여행에 eSIM이 반드시 필요한 것은 아니지만 현재 가장 편한 선택입니다. 출발 전에 사서 설치하고 도착해서 활성화하면 끝입니다.",
  },
  {
    q: "어떤 휴대폰이 일본에서 eSIM을 지원하나요?",
    a: "최근 몇 년 내의 기기는 대부분 지원합니다. iPhone XS 이후, 구글 픽셀 3 이후, 삼성 갤럭시 S20 이후, 그 밖의 많은 안드로이드 플래그십이 해당됩니다. 설정 → 정보에서 확인하세요. 주의할 점은 통신사 잠금이 걸린 일부 기기는 eSIM을 쓸 수 없다는 것입니다.",
  },
  {
    q: "일본 eSIM을 쓰는 동안 한국 번호를 살려 둘 수 있나요?",
    a: "가능합니다. eSIM의 가장 큰 장점 중 하나입니다. 듀얼심 기기는 대부분 두 개의 심을 동시에 쓸 수 있습니다. 기존 번호로 전화와 문자(예: 카드 결제 알림)를 계속 받고, 데이터는 일본 eSIM이 담당하게 하면 됩니다.",
  },
  {
    q: "일본에서는 Airalo와 Holafly 중 어느 쪽이 나을까요?",
    a: "대부분에게는 Airalo가 낫습니다. 더 저렴하고 용량 단계가 유연하며 Docomo와 SoftBank를 함께 씁니다. 정말로 무제한이 필요하고(원격 근무, 영상 시청이 많음) 이번 여행 예산이 그 차액을 감당할 수 있다면 Holafly가 앞섭니다.",
  },
  {
    q: "일본에 도착했는데 eSIM이 안 되면 어떻게 하나요?",
    a: "먼저 그 eSIM 프로필의 데이터 로밍이 켜져 있는지 확인하세요. 그래도 신호가 없으면 비행기 모드를 한 번 켜고 끄면 네트워크를 다시 검색합니다. 여기 실린 모든 사업자는 24시간 실시간 채팅 지원을 제공하며, Airalo와 Holafly가 특히 응답이 빠릅니다.",
  },
  {
    q: "일본 eSIM과 물리 심카드는 무엇이 다른가요?",
    a: "둘 다 일본 모바일 데이터를 제공하지만, eSIM이 설정이 더 빠르고(공항 줄이 없습니다) 대체로 더 저렴하며 출발 전에 미리 살 수 있습니다. 물리 심카드는 도착한 뒤 공항 카운터나 자판기에서 받아야 합니다. 물리 심의 주요 장점은 eSIM을 지원하지 않는 기기에서도 쓸 수 있다는 것입니다.",
  },
  {
    q: "일본에서 통신사 로밍을 그냥 쓰면 안 될까요?",
    a: "쓸 수 있지만 비쌉니다. 많은 통신사가 일본 로밍에 하루 약 $10~15를 받습니다. 10일 일정이면 데이터만 $100~150인데, 일본 eSIM 요금제 하나는 $9~18 수준입니다. 통신사에 일본을 포함한 저렴한 여행 부가 상품이 없다면, 전용 일본 eSIM이 거의 항상 더 저렴합니다.",
  },
  {
    q: "Airalo는 일본에서 어느 통신망을 쓰나요?",
    a: "Airalo의 일본 eSIM 요금제는 Docomo와 SoftBank를 씁니다. Docomo는 일본에서 커버리지가 가장 넓어 시골, 산간, 섬까지 들어갑니다. SoftBank는 도시와 근교에서 강합니다. 실제로는 관광지에서 대부분의 여행자가 둘의 차이를 느끼지 못합니다.",
  },
  {
    q: "Sakura Mobile은 무엇이고 누구에게 맞나요?",
    a: "Sakura Mobile은 여행자와 장기 체류자를 위한 심카드와 eSIM을 제공하는 일본 현지 사업자입니다. Airalo나 Holafly와 달리 음성 통화 기능이 있고 영어 고객 지원이 되며, 90일까지의 체류에 맞는 요금제가 있습니다. Docomo(일본 최대 통신사)를 씁니다. 저렴한 eSIM보다 비싸지만 일본 전화번호가 필요하거나 장기 체류하는 사람에게는 최선의 선택입니다.",
  },
  {
    q: "일본 여행에 데이터는 얼마나 필요한가요?",
    a: "일반적인 관광 — 구글 지도, 메신저, 가벼운 웹, 사진 몇 장 — 이라면 하루 1 GB가 합리적인 추정치입니다. 10일 일정이면 약 8~10 GB를 씁니다. 내비게이션을 오래 쓰거나 영상을 많이 보거나 원격 근무를 한다면 하루 2 GB 이상으로 계산하세요. 대부분의 여행자는 일주일 일본 여행에 3~5 GB 요금제면 충분하다고 느낍니다.",
  },
  {
    q: "일본 이심은 가격이 얼마나 하나요?",
    a: `일본 eSIM 가격은 사업자와 용량 단계에 따라 다릅니다(확인 시각 ${pricesCheckedAt}). 절약형: eSIM Go ${priceFromLabel("esimgo")}부터, Airalo ${priceFromLabel("airalo")}부터. 중간: 5 GB 요금제가 eSIM Go ${priceAtLeastLabel("esimgo", 5)}, Airalo ${priceAtLeastLabel("airalo", 5)}. 무제한: Holafly ${unlimitedFromLabel("holafly")}부터. 일본 현지, 영어 전화 지원: Sakura Mobile ${priceFromLabel("sakura")}부터. 일반적인 일주일 일정이라면 $10~20을 예상하세요.`,
  },
  {
    q: "일본 여행에 무제한 요금제가 값을 할까요?",
    a: "대부분의 관광객에게는 아닙니다. 일본은 호텔, 편의점, 관광지의 와이파이 커버리지가 좋습니다. 3~5 GB 요금제면 일반적인 일주일 동안의 내비게이션, 메신저, 웹 사용을 버팁니다. 무제한 요금제(예: Holafly)는 2~3배 비싸고, 주로 영상을 많이 보거나 영상 통화가 잦거나 와이파이가 약한 지역에 가는 헤비 유저에게 의미가 있습니다. 결정이 어렵다면 5 GB로 시작하고 추가를 고려하세요.",
  },
  {
    q: "일본에 도착한 뒤에 데이터를 추가할 수 있나요?",
    a: "가능합니다. 대부분의 사업자가 앱 내 충전을 지원하고 새 QR 코드가 필요하지 않습니다. Airalo라면 앱에서 새 요금제를 사면 기존 eSIM 프로필에 자동으로 붙습니다. eSIM Go와 Sakura Mobile에도 비슷한 충전 절차가 있습니다. Holafly의 무제한 요금제는 일수가 정해져 있어 더 머물면 새 요금제를 사야 합니다.",
  },
  {
    q: "일본 eSIM 요금제에 통화와 문자가 포함되나요?",
    a: "여행자용 eSIM 요금제는 대부분 — Airalo, eSIM Go, Holafly 포함 — 데이터 전용이고 음성 통화나 문자가 없습니다. 일본에서 통화는 왓츠앱, 라인, 페이스타임처럼 데이터를 쓰는 방법으로 하면 됩니다. 통화가 되는 일본 번호가 정말 필요하다면 주요 사업자 중에서는 Sakura Mobile이 최선입니다.",
  },
  {
    q: "일본 eSIM은 언제 활성화되나요?",
    a: "설치(QR 스캔)는 출발 전에 해 두세요. 2~5분과 와이파이 연결이 필요합니다. 다만 대부분의 요금제는 프로필을 설치한 시점이 아니라 일본에서 처음 네트워크에 연결한 시점부터 일수가 시작됩니다. 그래서 착륙한 다음에 데이터를 일본 eSIM으로 전환하면, 필요한 시점부터 요금제가 돌아갑니다.",
  },
  {
    q: "일본에서 커버리지가 가장 좋은 통신망은 어디인가요?",
    a: "Docomo가 시골 커버리지가 가장 촘촘합니다. 주요 도시를 벗어나는 일정이라면 의식적으로 고를 가치가 있고, eSIM Go와 Sakura Mobile이 Docomo를 씁니다. SoftBank와 KDDI(Airalo와 Holafly가 사용)는 도시와 관광 동선에서 좋은 성능을 냅니다. 표준적인 도쿄–교토–오사카–히로시마 경로라면 네 곳 모두 충분해서 차이를 느끼기 어렵습니다.",
  },
  {
    q: "일본 이심은 언제 사는 게 좋나요?",
    a: "eSIM은 출발 전에 사고 착륙하자마자 활성화하면 됩니다. 기다릴 이유가 없고 매진되지도 않습니다. 물리 심은 다릅니다. 공항 카운터와 자판기는 성수기에 인기 요금제가 실제로 품절되고, Sakura Mobile 심카드를 공항이나 호텔 수취로 예약해 두는 편이 현지 구매보다 저렴하고 운에 맡기는 것보다 안전합니다.",
  },
  {
    q: "일본 eSIM 속도가 느린 이유는 무엇인가요?",
    a: "몇 가지 가능성이 있습니다. 데이터를 거의 다 썼거나(많은 요금제가 기준을 넘으면 속도를 낮춥니다), 커버리지가 약한 곳(터널, 산간)이거나, 시부야나 교토역처럼 사람이 몰리는 관광지에서 네트워크가 혼잡한 경우입니다. 먼저 비행기 모드를 한 번 켜고 꺼 보세요. 데이터가 남아 있는데도 개선되지 않으면 사업자 지원에 문의하세요.",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "일본 이심 추천" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoBestEsimJapanPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>가격 확인 {pricesCheckedAt}｜{updatedLabel} 업데이트</p>
          <h1 className={styles.heroTitle}>
            일본 이심 추천(2026):<br />eSIM 요금제 비교와 클룩 일본 eSIM
          </h1>
          <p className={styles.heroSubtitle}>
            주요 일본 eSIM을 한 페이지에 모아 가격, 데이터, 통신망을 비교합니다. 이미 클룩에서 티켓을 예약한
            사람에게는 더 손이 덜 가는 선택이 하나 더 있습니다.
          </p>
          <div className={styles.heroBadges}>
            {["가격 매일 확인", "eSIM 4곳 비교", "독립 평가"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Klook's Japan eSIM leads this edition for the same reason it leads the
            Chinese ones: a Korean reader is very likely already holding a Klook
            account for the tickets, and one checkout is a real convenience rather
            than a sales line. It still carries no price, because Klook's product
            page blocks automated reads — the same constraint the English page states. */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>이미 클룩을 쓰고 있나요?</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>클룩 일본 eSIM:</strong> 티켓이나 1일 투어, 공항 철도를 이미 클룩에서 예약했다면, 클룩도
              일본 eSIM을 직접 판매합니다. 같은 계정, 같은 결제, QR 코드 한 장의 전자 바우처입니다. 이미 그
              플랫폼에 있는 사람에게는 가장 손이 덜 가는 방법입니다.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.86rem" }}>
              아래 순위에 넣지 않은 이유는 단순합니다. 클룩의 상품 페이지는 자동 수집을 차단하며(마지막 시도는{" "}
              {klookEsim.checkedAt}), 그래서 다른 네 곳과 비교할 수 있는 확인된 가격이나 용량 단계가 저희에게
              없습니다. 상품 페이지를 열어 현재 요금제를 확인하세요. 아래 네 곳의 가격은 각 사 공식 사이트에서
              매일 읽어 옵니다.
            </p>
            <a href={koKlookEsim.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              클룩 일본 eSIM 요금제 보기 →
            </a>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>한눈에</span>
          <h2 className={styles.sectionTitle}>빠른 비교</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["사업자", "어울리는 경우", "최저가", "가장 싼 요금제", "통신망", "통화・문자", "물리 심", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {picks.map(({ esimId, name, bestFor, voice, physicalSim, altOf }) => {
                    const cheapest = cheapestPlan(esimId);
                    const affiliateUrl = getProvider(altOf ?? esimId).affiliateUrl;
                    const isExternal = affiliateUrl !== "#";
                    const label = altOf ? "Airalo 무제한 eSIM 보기 →" : `${name} 보기 →`;
                    return (
                      <tr key={esimId}>
                        <td className={styles.tdProvider}>{name}</td>
                        <td className={styles.tdBestFor}>{bestFor}</td>
                        <td className={styles.tdPrice}>{cheapest ? formatUsd(cheapest.priceUsd) : "—"}</td>
                        <td className={styles.tdNetwork}>{cheapest ? cheapest.name : "—"}</td>
                        <td className={styles.tdNetwork}>{getProvider(esimId).network}</td>
                        <td>{voice ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>{physicalSim ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>
                          {isExternal ? (
                            <a href={affiliateUrl} className={styles.tdLink} target="_blank" rel="sponsored noopener">
                              {label}
                            </a>
                          ) : (
                            <Link href={PLANS_HREF} className={styles.tdLink}>
                              모든 요금제 보기(영어)
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Klook, unranked for the reason stated in the box above. */}
                  <tr>
                    <td className={styles.tdProvider}>{koKlookEsim.label}</td>
                    <td className={styles.tdBestFor}>이미 클룩에서 티켓을 예약한 사람</td>
                    <td className={tools.tdMuted}>클룩에서 확인</td>
                    <td className={tools.tdMuted}>—</td>
                    <td className={tools.tdMuted}>상품 페이지에 미표기</td>
                    <td><span className={styles.no}>✗</span></td>
                    <td><span className={styles.no}>✗</span></td>
                    <td>
                      <a href={koKlookEsim.url} className={styles.tdLink} target="_blank" rel={KLOOK_REL}>
                        클룩 eSIM 가격 보기 →
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            <span className={tools.liveBadge}><span className={tools.liveDot} /> 가격 매일 확인</span>
            <span>
              ‘최저가’는 각 사업자의 가장 싼 일본 요금제이며 기준 시각은 {pricesCheckedAt}입니다.{" "}
              <Link href={PLANS_HREF} className={tools.inlineLink}>모든 요금제를 GB당 단가로 정렬해 보기(영어) →</Link>
            </span>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            음성 요금제와 물리 심카드를 파는 곳은 Sakura Mobile뿐이고, 나머지 세 곳은 데이터 전용 eSIM입니다.
            일본 전화번호가 필요하거나 기기가 eSIM을 전혀 쓸 수 없다면, 가격을 따지기 전에 선택지가 하나로
            줄어듭니다.
          </p>
        </section>

        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>저희 순위</span>
          <h2 className={styles.sectionTitle}>일본 eSIM 4강</h2>
          <div className={styles.picksList}>
            {picks.map(({ esimId, rank, name, bestFor, target, altOf, altNote }) => {
              const provider = getProvider(esimId);
              const cheapest = cheapestPlan(esimId);
              const affiliateUrl = getProvider(altOf ?? esimId).affiliateUrl;
              const isExternal = affiliateUrl !== "#";
              const label = altOf ? "Airalo 무제한 eSIM 보기 →" : `${name} 보기 →`;
              return (
                <article key={esimId} id={esimId} className={styles.pickCard}>
                  <div className={styles.pickCardHeader}>
                    <div className={styles.pickRank}>
                      <span className={styles.pickNumber}>{rank}</span>
                      <div className={styles.pickMeta}>
                        <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>{bestFor}</span>
                        <span className={styles.pickName}>{name}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.pickCardBody}>
                    <p className={styles.pickSummary}>
                      통신망: {provider.network}.
                      {cheapest ? ` 가장 싼 일본 요금제는 ${formatUsd(cheapest.priceUsd)}(${cheapest.name}), 가격 확인 시각 ${pricesCheckedAt}.` : ""}
                    </p>
                    <div className={styles.pickTarget}>
                      <span className={styles.pickTargetLabel}>어울리는 경우:</span>
                      <span>{target}</span>
                    </div>
                    <div className={styles.pickCtaRow}>
                      {isExternal ? (
                        <a href={affiliateUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
                          {label}
                        </a>
                      ) : (
                        <Link href={PLANS_HREF} className={styles.pickCta}>
                          모든 요금제 보기(영어)
                        </Link>
                      )}
                    </div>
                    {altNote && (
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                        {altNote}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>설치 방법</span>
          <h2 className={styles.sectionTitle}>일본 eSIM 설치하기</h2>
          <div className={styles.stepsList}>
            {installSteps.map((step, i) => (
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
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법" },
            { href: "/ko/guides/attractions/tokyo-disney-tickets", title: "도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 랜드・씨 선택" },
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 예약(2026): 티켓 가격, 입장 시간, 보더리스와 비교" },
            { href: "/guides/transport/tokyo-airport-transfer", title: "나리타・하네다에서 도쿄 시내로 — 요금과 소요 시간 비교(영어)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>티켓을 클룩에서 샀다면 eSIM도 같이</h2>
            <p className={styles.ctaBannerDesc}>
              같은 계정, 같은 결제, QR 코드 한 장의 전자 바우처. 상품 페이지에서 현재 요금제와 가격을 확인하세요.
            </p>
            <a href={koKlookEsim.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              클룩 일본 eSIM 보기 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
