// Korean edition of /guides/attractions/teamlab-planets-tickets. Mirrors the English page as of
// 2026-11-06 block by block (same sections, tables, CTAs and Klook/GetYourGuide blocks); no
// figure here is new to the Korean edition — prices come from lib/attraction-prices.ts and the
// rest from the English page's own text.
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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import { GygCompareButton } from "../../../../components/GygCompare";
import { PlanetsAnswer, PlanetsSameDay } from "../../../../components/PlanetsBooking";
import {
  fujiDayTour,
  tokyoBaySunsetBoatCruise,
  tokyoJoypolisPassport,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  tsukijiCultureFoodTour,
} from "../../../../lib/klook-links";
import { koTeamlabPlanets } from "../../../../lib/klook-links-ko";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { gygTeamlabPlanets } from "../../../../lib/gyg-links";
import { PLANETS_FACTS, PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, attractionEventJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

const ROUTE = "/ko/guides/attractions/teamlab-planets-tickets";
const TITLE = "팀랩 플래닛 예약 2026: 티켓 가격, 운영 시간, 가는 법";
const DESC =
  "팀랩 플래닛 티켓은 날짜와 시간에 따라 ¥3,800부터. 운영 시간, 휴관일, 예약 방법, 신토요스역과 도요스역에서 가는 길을 정리했습니다.";

const PLANETS_URL = koTeamlabPlanets.url;
const GYG_SLUG = "ko-teamlab-planets-tickets";

const P = PRICES.teamlabPlanets;
// 가격, 운영 시간, 휴관일, 교통은 teamlab.art에서, 예약 규칙은 공식 티켓 스토어의 도움말
// 페이지에서 모두 같은 날(CHECKED) 읽었습니다. 팀랩은 붐비는 시간대와 체류 시간을 공개하지
// 않으므로 두 항목은 "공식 안내 없음"으로 적고, 체류 시간은 저희 기준임을 밝힙니다.
const CHECKED = dateLabel(P.checked, "ko");
const ADULT = priceLabel(P.adult, "ko");
const CHILD = priceLabel(P.child, "ko");

const priceRows = [
  {
    ticket: "성인(만 18세 이상)",
    price: ADULT,
    varies: "예 — 날짜와 입장 시간에 따라",
    note: "¥3,800은 최저 요금이며, 공식 스토어에서는 날짜와 회차에 따라 가격이 달라집니다",
  },
  { ticket: "중・고등학생", price: "¥2,800", varies: "아니요 — 고정", note: "학생증을 지참하세요" },
  { ticket: "어린이(만 4~12세)", price: CHILD, varies: "아니요 — 고정", note: "만 4세 미만은 티켓이 필요 없습니다" },
  {
    ticket: "만 3세 이하",
    price: priceLabel("Free", "ko"),
    varies: "아니요 — 무료",
    note: "여벌 옷을 챙기세요. 물 구간에서는 모두 젖습니다",
  },
  {
    ticket: "장애인 방문객",
    price: priceLabel("from ¥1,900", "ko"),
    varies: "예 — 성인 티켓과 같은 달력",
    note: "장애인 증명서를 지참하세요",
  },
  {
    ticket: "Premium Pass(만 4세 이상)",
    price: "¥12,000",
    varies: "아니요 — 고정",
    note: "입장 대기줄 없이 원하는 시간에 입장할 수 있지만, 관내 대기줄은 건너뛸 수 없습니다",
  },
];

const hoursRows = [
  { item: "운영 시간", detail: "08:00–22:00, 12월 31일(목)~1월 2일(토)은 08:00–20:00", source: `teamlab.art, ${CHECKED}` },
  { item: "마지막 입장", detail: "폐관 1시간 전", source: `teamlab.art, ${CHECKED}` },
  { item: "휴관일", detail: "2026년 12월 3일(목), 2027년 1월 14일(목)", source: `teamlab.art, ${CHECKED}` },
  { item: "운영 기간", detail: "2018년 7월 7일~2027년 말", source: `teamlab.art, ${CHECKED}` },
  {
    item: "입장 시간",
    detail: "티켓에 적힌 시간이 입장 시간이고, 지정 시간부터 30분이 입장 준비 시간입니다",
    source: `공식 티켓 스토어, ${CHECKED}`,
  },
  {
    item: "입장 대기",
    detail: "30~60분 기다릴 수 있습니다",
    source: `공식 티켓 스토어, ${CHECKED}`,
  },
  { item: "붐비는 시간대", detail: "공식 안내 없음", source: `teamlab.art와 공식 스토어 확인, ${CHECKED}` },
  {
    item: "회차에 늦었을 때",
    detail: "당일 운영 시간 안이라면 마지막 입장 전까지 입장할 수 있습니다",
    source: `공식 티켓 스토어, ${CHECKED}`,
  },
  {
    item: "소요 시간",
    detail: "공식 안내 없음. 저희는 보관함과 물기 닦는 시간까지 1.5~2시간으로 잡습니다",
    source: "저희의 일정 기준",
  },
  {
    item: "보관함",
    detail: "무료, 가로 23cm × 깊이 34cm × 높이 37cm. 그보다 큰 짐을 맡기는 곳은 없습니다",
    source: `공식 티켓 스토어, ${CHECKED}`,
  },
];

const ticketChoice = [
  {
    title: "Entrance Pass — 성인 ¥3,800부터",
    desc: `일반 티켓이고 거의 모든 사람에게 필요한 것은 이쪽입니다. 날짜와 입장 시간을 지정하며, 공식 스토어에서는 그 조합에 따라 가격이 달라지므로 판매처보다 고르는 날짜가 더 중요합니다. 확인일 ${CHECKED}.`,
  },
  {
    title: "Premium Pass — ¥12,000, 만 4세 이상",
    desc: `공식 스토어가 말하는 효과는 하나입니다. 입장 대기줄에 서지 않고 원하는 시간에 입장할 수 있으며, 대신 인포메이션 센터로 갑니다. 전시 안의 대기줄은 건너뛸 수 없다고 명시하고 있습니다. 입구의 30~60분 대기가 하루 일정을 망가뜨릴 때만 가치가 있고, 일반적인 업그레이드로 볼 것은 아닙니다. 확인일 ${CHECKED}.`,
  },
  {
    title: "환불은 안 되고, 변경은 됩니다",
    desc: `구매 후에는 어떤 티켓도 환불되지 않습니다. 대신 옮길 수 있습니다. 스토어 도움말 페이지 기준으로 Entrance Pass는 입장 시간 2시간 전까지, Premium Pass는 당일 08:30까지 변경할 수 있고, 어느 쪽이든 최대 3회이며 쿠폰으로 산 티켓은 변경할 수 없습니다. 확인일 ${CHECKED}.`,
  },
];

const steps = [
  {
    title: "날짜를 먼저 정하고, 그 날짜의 가격을 달력에서 읽습니다",
    desc: `성인 티켓은 ¥3,800부터이고 실제 금액은 고른 날짜와 입장 시간에 따라 달라집니다. 스토어 도움말 페이지도 날짜마다 요금이 다르다고 확인하고 있습니다. 하나로 정하기 전에 가능한 날짜를 하나씩 넘겨 보세요. 확인일 ${CHECKED}.`,
  },
  {
    title: "입장 시간을 고릅니다. 그것이 곧 예약입니다",
    desc: "티켓에 적힌 시간이 입장 시간이고, 지정 시간부터 30분이 입장 준비 시간입니다. 미술관에는 현장 매표소가 없으므로 고른 회차가 곧 방문 일정입니다. 당일이라면 달력이 이미 차 있을 수도 있습니다.",
  },
  {
    title: "Entrance Pass와 Premium Pass 중에서 고릅니다",
    desc: "요금 구분 네 가지에 ¥12,000 Premium Pass가 더해지며, 줄과 관련된 것은 그중 하나뿐입니다. 위의 티켓 표를 먼저 보세요. Premium Pass로 사는 것은 입구 대기줄 없이 들어가는 것뿐이므로, 대부분은 Entrance Pass로 더 이른 회차를 잡는 편이 낫습니다.",
  },
  {
    title: "공식 스토어나 스토어가 명시한 판매처에서 삽니다",
    desc: `공식 스토어 도움말 페이지는 현장 창구나 자동판매기에서 티켓을 팔지 않는다고 적고, 판매 경로로 공식 Ticket Store, Lawson Ticket, Seven Ticket, 클룩을 명시합니다. 클룩은 한국어 화면과 자국 통화로 결제할 수 있어 많은 여행자가 실제로 이쪽을 씁니다. 어느 쪽이든 티켓은 휴대폰의 QR 코드입니다. 확인일 ${CHECKED}.`,
  },
  {
    title: "물에 젖어도 괜찮은 옷을 입고, 지정된 입장 시간에 맞춰 도착하세요",
    desc: "반바지나 무릎 위까지 걷어 올릴 수 있는 바지를 입으세요. 일부 작품은 물속을 걸으며 체험하는 공간이고 수심이 성인 무릎까지 올라올 수 있습니다. 바닥 일부가 거울이라 치마나 통이 넓은 바지라면 XS~6L 무료 대여 반바지를 이용할 수 있습니다. 입구 대기가 30~60분까지 걸릴 수 있으니 회차가 열리는 시간에 도착하세요.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026년 팀랩 플래닛 티켓 가격은 얼마인가요?",
    a: `팀랩 플래닛 공식 티켓 스토어 기준(확인일 ${CHECKED}), 성인은 ¥3,800부터, 중・고등학생 ¥2,800, 만 4~12세 어린이 ${CHILD}, 만 3세 이하는 무료입니다. 장애인 방문객은 ¥1,900부터이고, 만 4세 이상 대상 Premium Pass가 ¥12,000에 판매됩니다. 성인 가격은 날짜와 회차에 따라 달라지므로 결제 전에 본인 회차의 금액을 확인하세요. 할인 티켓은 자격 증빙이 필요합니다. 학생증, 여권, 장애인 증명서를 챙기세요.`,
  },
  {
    q: "팀랩 플래닛은 미리 예약해야 하나요?",
    a: `네. 티켓은 날짜와 입장 시간을 지정해 사고, 공식 스토어가 현장 판매가 없다고 적고 있어 날짜가 차면 현장에서 해결할 수 없습니다. 팀랩은 매진 현황을 공개하지 않으므로 얼마나 일찍 차는지는 공식 안내가 없습니다. 날짜가 정해지면 바로 예약하세요. 확인일 ${CHECKED}.`,
  },
  {
    q: "팀랩 플래닛 티켓을 현장에서 살 수 있나요?",
    a: `아니요. 공식 티켓 스토어 도움말 페이지는 현장 매표 창구나 자동판매기에서 티켓을 구매할 수 없다고 적고, 판매 경로로 공식 Ticket Store, Lawson Ticket, Seven Ticket, 클룩을 명시합니다. 해당 날짜가 매진되면 현장 매표소도 없다는 점이 플래닛과 도쿄 대부분의 명소 사이의 가장 큰 차이입니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "팀랩 플래닛은 어느 회차가 가장 저렴한가요?",
    a: `본인 날짜의 공식 달력에서 가장 낮게 책정된 회차입니다. 팀랩은 회차별 가격표를 공개하지 않으므로 그것이 유일하게 정직한 답입니다. 공식 스토어가 확인해 주는 것은 성인 Entrance Pass가 ¥3,800부터이고 날짜마다 요금이 다르다는 점입니다. 도움말 페이지는 예약을 "요금이 다른 날짜로도" 옮길 수 있다고 적고 있습니다. 그러니 스토어 달력을 열어 여행 일정에 넣을 수 있는 날짜와 입장 시간을 넘겨 보고, 결제하기 전에 금액을 비교하세요. 확인일 ${CHECKED}.`,
  },
  {
    q: "팀랩 플래닛에 보관함이 있나요?",
    a: `네, 무료입니다. 공식 도움말 페이지 기준 크기는 가로 23cm, 깊이 34cm, 높이 37cm로, 작은 배낭은 들어가지만 캐리어는 들어가지 않습니다. 짐 맡기는 곳은 없어서, 더 큰 짐은 건물 밖 유모차 보관 공간에 직접 와이어 자물쇠로 고정해야 합니다. 신발, 양말, 스타킹도 보관함에서 벗습니다. 거기서부터는 맨발로 관람하기 때문입니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "팀랩 플래닛에 무엇을 입고 가야 하나요?",
    a: "반바지, 또는 무릎 위까지 걷어 올릴 수 있는 바지입니다. 일부 작품은 물속을 걸으며 체험하는 공간이고 수심이 성인 무릎까지 올라올 수 있으며, 관람하는 동안 계속 맨발로 이동합니다. 입장할 때 보관함 공간에서 신발, 양말, 스타킹을 벗습니다. 바닥 일부가 거울이라 치마나 통이 넓은 바지는 피하는 것이 좋고, XS~6L 무료 대여 반바지가 있습니다. 아이와 함께라면 여벌 옷을 챙기세요. 유모차는 들어갈 수 없습니다(유모차 보관 공간이 있고 아기띠는 괜찮습니다).",
  },
  {
    q: "팀랩 플래닛 QR 티켓은 언제 받나요?",
    a: `티켓은 QR 전자 티켓뿐입니다. 구매 확인 메일에 링크가 있고, 입장일 2일 전에 안내 메일이 오며, QR 코드는 입장일 00:00부터 표시됩니다. QR 하나로 구매 인원 전체가 입장하고, 휴대폰이나 태블릿으로 보여 주거나 인쇄해도 됩니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "팀랩 플래닛은 얼마나 걸리나요?",
    a: `소요 시간은 공식 안내가 없습니다. 저희는 보관함과 물기 닦는 시간까지 관내 1.5~2시간으로 잡습니다. 여기에 공식 스토어가 안내하는 30~60분 대기를 더하고, 끝난 직후에 빠듯한 일정을 넣지 마세요. 공식 스토어는 붐빌 때 오래 머문 관람객에게 이동을 요청할 수 있다고도 적고 있습니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "팀랩 플래닛 운영 시간과 휴관일은 어떻게 되나요?",
    a: `teamlab.art 기준 운영 시간은 08:00–22:00이고, 12월 31일부터 1월 2일까지는 08:00–20:00이며, 마지막 입장은 폐관 1시간 전입니다. 공지된 휴관일은 2026년 12월 3일(목)과 2027년 1월 14일(목)입니다. 확인일 ${CHECKED}. 예약 전에 본인 날짜를 공식 사이트에서 확인하세요.`,
  },
  {
    q: "예약한 팀랩 플래닛 회차를 놓치면 어떻게 되나요?",
    a: "그래도 들어갈 수 있습니다. 공식 도움말 페이지는 티켓에 적힌 시간이 기준이며, 늦게 도착해도 당일 운영 시간 안에는 입장할 수 있다고 적고 있습니다. 마지막 입장은 폐관 1시간 전입니다.",
  },
  {
    q: "팀랩 플래닛은 어디에 있고 어떻게 가나요?",
    a: `주소는 도쿄도 고토구 도요스 6-1-16입니다. teamlab.art 기준으로 유리카모메선 신토요스역 1A 출구에서 도보 3분, 시조마에역과 도요스 시장에서 도보 5분, 도쿄 메트로 유라쿠초선 도요스역 7번 출구에서 도보 10분입니다. 도쿄역에서 택시로 15분, 하네다 공항에서 고속도로로 15분입니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "팀랩 플래닛은 곧 문을 닫나요?",
    a: `teamlab.art는 운영 기간을 2018년 7월 7일부터 2027년 말까지로 적고 있습니다. 확인일 ${CHECKED}. 아자부다이힐스의 팀랩 보더리스는 별개의 미술관이고 티켓도 따로입니다.`,
  },
  {
    q: "팀랩 플래닛과 보더리스는 무엇이 다른가요?",
    a: "도요스의 플래닛은 맨발로 물속을 걷는 미술관이고, 아자부다이힐스의 보더리스는 작품이 방 사이를 옮겨 다니는, 정해진 관람 동선이 없는 미로 같은 공간입니다. 별개의 미술관이고 티켓도 따로입니다. 팀랩 플래닛 보더리스 비교 페이지에서 두 곳을 나란히 볼 수 있습니다.",
  },
];

// Same-day picks and day trips: the English page's products, on Klook's Korean path.
const sameDayTours = [
  withKlookLocale(tokyoJoypolisPassport, "ko", {
    title: "도쿄 조이폴리스 패스포트",
    desc: "오다이바 DECKS 실내 테마파크의 입장과 어트랙션 무제한 이용 패스포트. 모바일 QR 코드이며, 상품 페이지 기준 권장 시간은 2~4시간",
  }),
  withKlookLocale(tokyoBaySunsetBoatCruise, "ko", {
    title: "도쿄만 낮・선셋 보트 크루즈",
    desc: "시바우라에서 출발하는 가이드 동승 1시간 소형 보트 크루즈 — 저녁 식사가 포함되지 않은 도쿄만 크루즈",
  }),
  withKlookLocale(tsukijiCultureFoodTour, "ko", {
    title: "쓰키지 문화・음식 투어",
    desc: "쓰키지 장외시장을 가이드와 걸으며 시식하고 자리에 앉아 스시를 먹는 코스까지, 영어・중국어・스페인어 진행",
  }),
  withKlookLocale(tokyoSubwayTicket, "ko", {
    title: "도쿄 서브웨이 티켓(24 / 48 / 72시간)",
    desc: "도쿄메트로와 도에이 지하철 전 노선 무제한 승차. 줄 서서 사는 대신 도착해서 수령",
  }),
];

const dayTrips = [
  withKlookLocale(fujiDayTour, "ko", {
    title: "도쿄 출발 후지산 1일 투어",
    desc: "후지산 5합목, 가와구치호, 오시노핫카이를 도는 종일 버스 투어, 당일 저녁 도쿄 복귀",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "ko", {
    title: "도쿄 관광버스 1일 투어",
    desc: "황거 정원, 아사쿠사, 도쿄 스카이트리를 도는 가이드 투어, 다국어 오디오 안내 포함",
  }),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: attractionEventJsonLd({
              route: ROUTE,
              name: "teamLab Planets TOKYO",
              description: DESC,
              inLanguage: JSONLD_LANG.ko,
              facts: PLANETS_FACTS,
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel} 업데이트</p>
          <h1 className={styles.heroTitle}>
            팀랩 플래닛 예약(2026):<br />티켓 가격, 운영 시간, 예약 방법
          </h1>
          <p className={styles.heroSubtitle}>
            도요스 팀랩 플래닛의 입장권 가격과 운영 시간, 예약 방법, 신토요스역과 도요스역에서 가는 방법을
            정리했습니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 가격과 운영 시간", "teamlab.art 확인"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <PlanetsAnswer />

        <PlanetsSameDay />

        <p className={styles.bodyText}>
          도쿄의 두 미술관 중 어디로 갈지 고민이라면{" "}
          <Link href="/ko/guides/attractions/teamlab-tokyo-tickets">팀랩 플래닛 보더리스 비교</Link>에서 두 곳을
          나란히 볼 수 있습니다.
        </p>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>2026년 팀랩 플래닛 티켓 가격은 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            성인은 <strong>{ADULT}</strong>, 중・고등학생은 ¥2,800, 만 4~12세 어린이는 ¥1,500, 만 4세 미만은
            무료입니다. 날짜에 따라 달라지는 요금은 성인과 장애인 요금뿐입니다. 공식 스토어에서는 날짜와 입장 시간에 따라
            가격이 달라지므로 스토어의 금액에도 물결표(~)가 붙고, 가장 저렴한 티켓을 찾으려면 판매처보다 방문
            날짜와 시간대를 먼저 비교해야 합니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓", "가격(부터)", "날짜에 따라 변동?", "비고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.varies}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {CHECKED}에 팀랩 플래닛 공식 티켓 스토어의 영어판과 일본어판에서 읽었습니다. 할인 티켓은 자격 증빙이
            필요하니 학생증, 여권, 장애인 증명서를 챙기세요. 티켓은 휴대폰의 QR 코드로 발급됩니다.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>성인 가격이 얼마나 오르내리는지는 공개되지 않습니다.</strong> 팀랩은 최저 요금과 예약 달력만
            공개하고 날짜별 가격표는 공개하지 않으며, 도움말 페이지는 요금이 다르다는 사실만 확인해 줍니다. 예약은 &ldquo;요금이
            다른 날짜로도&rdquo; 옮길 수 있다고 적혀 있습니다. 그러니 ¥3,800을 최저 요금으로 보고, 여행 일정에 넣을
            수 있는 날짜의 스토어 달력을 열어 날짜마다 입장 시간을 비교한 뒤 결제하세요. 더 저렴한 판매처를
            찾기보다 방문일을 하루 옮기는 것이 실제로 효과가 있습니다. 가격을 정하는 것은 날짜입니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>예약 전에</span>
          <h2 className={styles.sectionTitle}>운영 시간, 입장 회차, 필요한 시간</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            티켓에 적힌 시간은 입장 시간이고, 공식 스토어는 30~60분 기다릴 수 있다고 안내합니다. 팀랩은 붐비는
            시간대도 소요 시간도 공개하지 않습니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "공식 정보", "출처와 확인일"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            플래닛은 일반적인 미술관보다 관람 전에 준비할 것이 많습니다. 맨발로 들어가고 경로의 일부가 물입니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>맨발:</strong> 신발, 양말, 스타킹은 보관함에서 벗습니다. 관람하는 동안 계속 맨발로 이동합니다.</li>
            <li><strong>물:</strong> 일부 작품은 물속을 걸으며 체험하는 공간이고 수심이 성인 무릎까지 올라올 수 있습니다. 반바지나 걷어 올릴 수 있는 바지를 입으세요.</li>
            <li><strong>거울 바닥:</strong> 치마나 통이 넓은 바지는 곤란합니다. 공식 FAQ는 속옷이 보일 수 있다고 적고 있습니다. XS~6L 무료 대여 반바지가 있습니다.</li>
            <li><strong>아이와 함께:</strong> 여벌 옷을 챙기세요. 유모차는 안으로 들어갈 수 없습니다. 밖에 유모차 보관 공간이 있고 아기띠는 괜찮습니다.</li>
            <li><strong>짐:</strong> 무료 보관함 크기는 23 × 34 × 37cm입니다. 짐 맡기는 곳이 없으므로 캐리어는 유모차 보관 공간에 직접 와이어 자물쇠로 고정해야 합니다.</li>
            <li><strong>물 위생:</strong> 공식 FAQ에 따르면 물은 상시 여과되고 염소 농도를 매시간 측정하며, 출구에는 소독한 수건이 있습니다.</li>
            <li><strong>휠체어:</strong> 이용할 수 있고 직원이 경로를 안내합니다. 일부 작품에는 갈 수 없고, 물 구간은 동반자와 함께 전용 휠체어로 옮겨 타야 합니다.</li>
          </ul>
          <p className={styles.bodyText}>
            예약 전에 본인 날짜를 공식 사이트에서 확인하세요. 위 내용은 소요 시간을 제외하면 모두 공식 정보이며,
            표에 적힌 날짜에 읽었습니다. 공식 스토어는 붐빌 때 오래 머문 관람객에게 이동을 요청할 수 있다고도
            적고 있습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>무엇을 사는가</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛은 정확히 무엇인가</h2>
          <p className={styles.bodyText}>
            팀랩은 작품을 바라보는 데 그치지 않고 작품 속을 직접 걸으며 체험하는 대규모 디지털 설치 미술로 알려진
            도쿄의 아트 그룹입니다. 도요스의 플래닛은 그중에서도 몸을 움직이며 작품을 체험하는 공간입니다. 맨발로 물을 건너고, 관람객의 존재에
            반응하는 작품들 사이를 지나갑니다. 거울로 된 무한 공간, 떠 있는 구체로 가득한 홀, 살아 있는 정원
            같은 것들입니다. 도쿄의 두 팀랩 미술관 중 아이와 즐기기 쉬운 곳이고, 이런 규모의 디지털 아트를 처음
            접한다면 두 곳 중 더 인상적으로 느껴질 곳입니다.
          </p>
          <p className={styles.bodyText}>
            teamlab.art는 운영 기간을 2018년 7월 7일부터 2027년 말까지로 적고 있으니, 그 이후의 여행이라면 다시
            확인하세요.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>판단</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛은 갈 만한가요?</h2>
          <p className={styles.bodyText}>
            도쿄를 처음 찾는 대부분의 여행자에게는 그렇습니다. 다만 1인 {ADULT}에 1.5~2시간짜리 명소이니, 반나절
            일정에 해당하는 비용이지만 관람 시간은 긴 점심 식사 정도입니다. 직접 비교할 수 있도록 계산 과정을 그대로
            정리했습니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>시간당 가격이 높습니다.</strong> 1.5~2시간에 ¥3,800부터는 ¥1,500인 도쿄타워 메인 데크의 두 배가 넘고 <Link href="/ko/guides/attractions/shibuya-sky-tickets">시부야 스카이 티켓</Link>의 낮 시간 웹 예매 {PRICES.shibuyaSky.adult.split(" / ")[0]}보다도 훨씬 비쌉니다. 두 곳 모두 오래 머물 수 있습니다. 길이가 아니라 다른 곳에서는 볼 수 없는 것에 돈을 내는 것입니다 — 금액은 <Link href="/guides/attractions/japan-attraction-ticket-prices">일본 명소 티켓 가격(영어)</Link> 표에서 비교해 보세요.</li>
            <li><strong>입장에는 돈뿐 아니라 시간도 듭니다.</strong> 공식 스토어는 입장까지 30~60분 기다릴 수 있다고 안내하고, 그 위에 맨발 준비가 더해집니다.</li>
            <li><strong>도쿄에서 몸을 가장 많이 움직이며 체험하는 미술관입니다.</strong> 관람 내내 맨발, 성인 무릎 높이의 물, 거울 바닥. 그게 체험이 아니라 고생처럼 들린다면, 물이 없는 같은 팀랩 작품을 보려면 아자부다이의 보더리스로 가세요.</li>
            <li><strong>날씨와 상관없고 아이에게 맞습니다.</strong> 실내이고, 만 4세 미만은 무료이며, 아이들이 여행에서 사찰보다 더 자주 기억하는 곳입니다.</li>
            <li><strong>당일 현장에서 해결할 수 없습니다.</strong> 현장 판매가 없으니 달력이 차면 끝입니다. 잘못되면 그날 오후 일정 전체를 잃는다는 것이, 이곳을 가장 먼저 예약해야 하는 진짜 이유입니다.</li>
          </ul>
          <p className={styles.bodyText}>
            도쿄 일정이 이미 빡빡하거나, 30분 고정 회차가 즉흥적으로 보내고 싶은 하루를 망치거나, 일행 중 바지를
            걷어 올리고 싶은 사람이 아무도 없다면 건너뛰세요. 티켓이 실망스러운 이유는 이 세 가지이고, 어느 것도
            작품 때문이 아닙니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>예약 가능 여부</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 티켓은 매진되나요?</h2>
          <p className={styles.bodyText}>
            개별 입장 시간은 매진되고, 해당 날짜가 매진되면 현장 매표소도 없습니다. 공식 스토어는 현장 매표 창구나
            자동판매기에서 티켓을 팔지 않는다고 분명히 적고 있습니다. 그래서 플래닛은 도쿄 일주일 일정에서
            마지막이 아니라 가장 먼저 예약할 곳입니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>얼마나 일찍:</strong> 공식 안내가 없고, 팀랩은 매진 현황을 공개하지 않습니다. 날짜가 정해지면 예약하세요.</li>
            <li><strong>현장 티켓 없음:</strong> 공식 정보이며 {CHECKED}에 확인했습니다. 공식 Ticket Store, Lawson Ticket, Seven Ticket, 클룩에서 온라인으로만 판매합니다.</li>
            <li><strong>한 번에 10장:</strong> 스토어는 1회 구매를 10장으로 제한하며 재고에 따라 더 적을 수 있습니다. 20명 이상 단체는 별도 단체 절차로 신청합니다.</li>
            <li><strong>회차를 잘못 예약했다면?</strong> 다시 사지 말고 변경하세요. Entrance Pass는 입장 시간 2시간 전까지 최대 3회, Premium Pass는 당일 08:30까지 변경할 수 있습니다. 환불은 안 되고, 쿠폰 티켓은 변경도 안 됩니다.</li>
            <li><strong>늦는 것은 괜찮지만 날짜를 놓치면 끝:</strong> 공식 FAQ는 당일 운영 시간 안에서 폐관 1시간 전 마지막 입장까지는 늦게 와도 들어갈 수 있다고 적고 있습니다.</li>
          </ul>
          <p className={styles.bodyText}>
            실제로는 날짜, 입장 시간, 판매처 순서로 고르면 됩니다. 이 중 날짜와 입장 시간이 입장 가능 여부를 정합니다.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>어떤 티켓</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛은 어떤 티켓을 사야 하나요?</h2>
          <p className={styles.bodyText}>
            한 가지 경우를 빼면 Entrance Pass입니다. 다른 선택지는 ¥12,000 Premium Pass 하나뿐이고, 공식 스토어가
            내세우는 효과는 입구 대기줄 없는 입장 하나입니다. 30~60분의 대기 시간을 줄이는 것이 중요하다면 고려할 만하지만,
            대기 시간이 크게 부담되지 않는다면 ¥8,000의 추가 비용을 낼 필요는 적습니다.
          </p>
          <div className={styles.stepsList}>
            {ticketChoice.map((item, i) => (
              <div key={item.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>입장 시간은:</strong> 어느 시간대가 가장 붐비는지는 공식 안내가 없고, 팀랩은 회차별 가격표도
            공개하지 않습니다. 시간별 금액은 아래 두 판매처 어디서든 한 번만 클릭하면 달력에서 볼 수 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              팀랩 플래닛 날짜와 회차 보기 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            클룩은 공식 스토어가 명시한 판매처 중 하나이고, GetYourGuide는 회차가 사라졌을 때 찾아볼 두 번째
            곳입니다. 두 곳 모두 날짜별로 가격이 매겨지니, 이 페이지의 금액을 포함해 대표 금액을 믿기보다 달력을
            여세요.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>단계별</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 도쿄는 어떻게 예약하나요?</h2>
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
            회차를 확정할 준비가 됐다면{" "}
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL}>
              클룩에서 플래닛 잔여 회차와 가격 보기 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>직접 구매</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 공식 티켓 사이트는 어디인가요?</h2>
          <p className={styles.bodyText}>
            미술관 자체 페이지는 <strong>teamlab.art/e/planets</strong>이고, 티켓은{" "}
            <strong>teamLab Planets TOKYO 공식 티켓 스토어</strong>(<strong>teamlabplanets.dmm.com</strong>)에서
            판매합니다. 검색 결과가 아니라 이 스토어가 공식 티켓 구매처입니다. 이 페이지의 모든 예약 규칙도 이
            스토어의 도움말 페이지에서 {CHECKED}에 읽은 것입니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>그 밖의 공식 판매처:</strong> 스토어는 자신과 함께 Lawson Ticket, Seven Ticket, 클룩을 명시합니다. 목록에 없는 곳은 굳이 쓸 이유가 없는 재판매처입니다.</li>
            <li><strong>스토어의 결제 수단:</strong> DMM을 통한 신용카드, PayPay, UnionPay. 카드가 거절되면 — 여행자가 다른 곳으로 가는 흔한 이유입니다 — 해외 결제가 되는 판매처에서 해결됩니다.</li>
            <li><strong>티켓 수령 방식:</strong> 입장 이틀 전에 QR 티켓 링크가 담긴 이메일이 오고, QR 코드 자체는 입장 당일 00:00부터 표시됩니다.</li>
            <li><strong>직접 구매로 얻지 못하는 것:</strong> 더 낮은 가격. 금액은 날짜와 입장 시간이 정하고, 어느 공식 경로를 쓰든 스토어는 같은 달력으로 가격을 매깁니다.</li>
          </ul>
          <p className={styles.bodyText}>
            정리하면, 카드가 통하고 일본어나 영어 스토어가 불편하지 않다면 직접 사세요. 자기 언어와 통화로 결제하고
            싶다면 명시된 판매처에서 사세요. 둘 다 공식이고, 어느 쪽도 편법이 아닙니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>아이와 함께</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛은 아이와 가기 좋은가요?</h2>
          <p className={styles.bodyText}>
            도쿄에서 아이에게 가장 잘 맞는 미술관이면서, 규칙도 가장 많은 미술관입니다. 만 4세 미만은 무료, 만 4~12세는
            ¥1,500이고, 곳곳의 물은 성인 무릎 높이 — 그러니 아이에게는 더 높이 — 까지 오며, 유모차는 아예 들어갈
            수 없습니다. 아래는 모두 공식 문구이며 {CHECKED}에 읽었습니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>나이와 가격:</strong> 만 3세 이하는 티켓 요금이 없고, 만 4~12세는 ¥1,500, 중・고등학생은 ¥2,800입니다. Premium Pass는 만 4세부터 판매합니다.</li>
            <li><strong>보호자:</strong> 어린이 3명당 성인 1명이 동반해야 합니다. 부모 한 명이 어린 아이 넷을 데려가는 예약은 스토어가 받아 주지 않습니다.</li>
            <li><strong>유모차:</strong> 관내 반입 불가. 건물 밖 유모차 보관 공간에 와이어 키로 직접 잠가 두고, 아기띠는 안에서 사용할 수 있습니다.</li>
            <li><strong>기저귀:</strong> 기저귀 교환대는 여자 화장실에 있습니다.</li>
            <li><strong>물:</strong> 성인 무릎 높이이고 경로 전체가 맨발입니다. 여벌 옷을 챙기고, 아이만이 아니라 모두가 젖는다고 생각하세요.</li>
            <li><strong>옷:</strong> 모두 반바지나 걷어 올릴 수 있는 바지를. 곳곳의 바닥이 거울입니다. 무료 대여 반바지는 XS~6L이라 원피스를 입고 온 아이도 문제없습니다.</li>
            <li><strong>짐 보관:</strong> 무료 보관함은 23 × 34 × 37cm — 기저귀 가방은 들어가지만 캐리어는 안 되고, 큰 짐은 유모차 보관 공간으로 갑니다.</li>
          </ul>
          <p className={styles.bodyText}>
            실제로는 이른 회차를 예약하고, 먼저 밥을 먹이고, 오후 일정은 느슨하게 두세요. 어린아이에게 힘든 것은
            작품이 아니라 30~60분의 입구 대기입니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>플래닛 또는 보더리스</span>
          <h2 className={styles.sectionTitle}>플래닛과 보더리스, 어디를 예약할까?</h2>
          <p className={styles.bodyText}>
            두 곳은 별개의 미술관이고 티켓도 따로입니다. 플래닛은 맨발로 물속을 걷는 곳이고, 보더리스는
            아자부다이힐스에 있는, 정해진 관람 동선이 없는 미로 같은 공간입니다.{" "}
            <Link href="/ko/guides/attractions/teamlab-tokyo-tickets">팀랩 플래닛 보더리스 비교</Link>에서 가격, 운영
            시간, 어울리는 사람을 볼 수 있고, 보더리스 예약은{" "}
            <Link href="/ko/guides/attractions/teamlab-borderless-tickets">팀랩 보더리스 티켓 가이드</Link>에서
            다룹니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>방문 전 확인</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛에는 무엇을 입고 무엇을 가져가야 하나요?</h2>
          <ul className={styles.bodyList}>
            <li><strong>복장:</strong> 무릎 위로 걷을 수 있는 반바지나 바지. 물이 성인 무릎 높이까지 올라오고 거울 바닥도 있어 미니스커트는 피하는 편이 좋습니다. 무료 대여 반바지는 XS~6L이며 나가기 전에 반납합니다.</li>
            <li><strong>티켓:</strong> 휴대폰이나 태블릿의 QR 전자 티켓, 또는 인쇄본. QR 하나로 구매 인원 전체가 입장합니다. 2일 전에 안내 메일이 오고, QR 코드는 당일 00:00부터 표시됩니다.</li>
            <li><strong>신분증:</strong> 중·고등학생 티켓은 학생증이나 공식 연령 증빙, 장애인 할인 티켓은 인정된 증명서가 필요합니다.</li>
            <li><strong>가방:</strong> 입장 게이트 안쪽에 무료 사물함(23 × 34 × 37 cm)이 있습니다. 더 큰 짐은 건물 밖 유모차 보관소에 와이어 자물쇠로 고정해 둡니다.</li>
            <li><strong>수건:</strong> 가져갈 필요 없습니다. 물 작품 출구에 수건이 준비되어 있습니다.</li>
            <li><strong>아이 동반:</strong> 무료 입장 어린이를 포함해 어린이 3명당 성인 1명 이상이 필요합니다. 갈아입을 옷을 챙기세요. 아기띠는 괜찮지만 유모차는 밖에 둡니다.</li>
            <li><strong>재입장:</strong> Premium Pass를 포함해 어떤 티켓으로도 불가합니다. 입장 후에는 환불되지 않습니다.</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            공식 티켓 스토어와 도움말 페이지, {CHECKED} 확인.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 가는 법: 도요스역과 신토요스역에서</h2>
          <p className={styles.bodyText}>
            주소는 도쿄도 고토구 도요스 6-1-16(東京都江東区豊洲6-1-16)입니다. teamlab.art의 교통 안내는 다음과
            같습니다. 확인일 {CHECKED}.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>신토요스역</strong>(유리카모메선): 1A 출구에서 도보 3분. 공식 스토어의 안내는 개찰구를 나와 오른쪽으로 가서 북쪽 출구로 나가는 것입니다.</li>
            <li><strong>도요스역</strong>(도쿄 메트로 유라쿠초선): 7번 출구에서 도보 10분. 유리카모메 고가를 따라 걸으면 오른쪽에 미술관이 있습니다.</li>
            <li><strong>시조마에역</strong>(유리카모메선)과 도요스 시장: 도보 5분.</li>
            <li><strong>택시:</strong> 긴자에서 10분, 도쿄역에서 15분, 하네다 공항에서 고속도로로 15분.</li>
            <li><strong>버스:</strong> teamlab.art는 도쿄역, 긴자, 쓰키지에서 오는 도에이 버스 To-05-2의 혼잡이 심하다고 경고하며 다른 교통수단을 권합니다. GINZA SIX와 미술관 사이에는 유료 셔틀버스가 있습니다.</li>
            <li><strong>주차장:</strong> 미술관에는 없습니다.</li>
          </ul>
          <p className={styles.bodyText}>
            <Link href="/guides/transport/ic-cards-japan">스이카(Suica)나 파스모(PASMO) 교통카드(영어 가이드)</Link>로 유라쿠초선과
            유리카모메선 구간 모두 탈 수 있고, 도요스가 처음이라면{" "}
            <Link href="/guides/transport/tokyo-transportation">도쿄 교통 가이드(영어)</Link>에서 노선을 설명합니다.
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="도요스・오다이바에서 같은 날 예약하기"
          intro="플래닛 관람은 도쿄 동부 일정 중 약 1시간 반을 차지하고, 입구까지 데려다주는 유리카모메선은 오다이바까지 이어집니다. 서브웨이 티켓은 도요스까지의 메트로 구간은 되지만 유리카모메선은 되지 않습니다. 나머지 세 가지는 모두 미술관에서 금방 갈 수 있습니다. 클룩 가격은 날짜에 따라 달라지니, 본인 날짜의 금액과 시간은 상품 페이지를 열어 확인하세요."
          tours={sameDayTours}
        />

        <KlookTourPicks
          heading="같은 도시에서 출발하는 1일 투어"
          intro="플래닛은 관내에서 약 한 시간 반이 걸려 보통 다른 일정과 하루를 나눕니다. 여행의 도쿄 일정에 아직 비어 있는 하루가 있다면, 이 두 투어는 도시를 떠났다가 그날 저녁에 돌아옵니다."
          tours={dayTrips}
        />

        <Related
          items={[
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 보더리스 비교 2026: 도쿄에서 어디로 갈까" },
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka 티켓 2026: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto 티켓: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab Botanical Garden Osaka 티켓: 가격과 운영 시간(영어)" },
            { href: "/ko/guides/attractions/tokyo-skytree-tickets", title: "도쿄 스카이트리 티켓(2026): 요금과 플로어 350·450 선택" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "워너 브라더스 스튜디오 투어 도쿄 티켓(2026): 가격과 예약(영어)" },
            { href: "/ko/guides/attractions/teamlab-borderless-tickets", title: "팀랩 보더리스 티켓(2026): 가격, 지정 시간 입장, 구매 경로" },
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 티켓 예약 2026: 가격·예약 오픈·일몰 시간" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 전철, 지하철, IC 카드(영어)" },
            { href: "/guides/transport/ic-cards-japan", title: "일본 IC 카드 2026: 스이카, 파스모 사용법(영어)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>팀랩 플래닛을 예약할 준비가 됐나요?</h2>
            <p className={styles.ctaBannerDesc}>
              티켓은 날짜와 입장 시간을 지정해 사고, 미술관에서는 팔지 않습니다. 클룩은 공식 스토어가 안내하는
              판매처 중 하나이고, 티켓은 휴대폰의 QR 코드로 받습니다.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                팀랩 플래닛 티켓 보기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
