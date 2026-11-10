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
import { GygCompareButton } from "../../../../components/GygCompare";
import { koTeamlabBorderless } from "../../../../lib/klook-links-ko";
import { gygTeamlabBorderless } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

// Mirrors the English page (pages/guides/attractions/teamlab-borderless-tickets.tsx) section
// by section as of 2026-11-01. Figures come from lib/attraction-prices.ts and the English
// page; nothing was re-checked or added for this edition.

const ROUTE = "/ko/guides/attractions/teamlab-borderless-tickets";
const TITLE = "팀랩 보더리스 티켓 2026: 성인 ¥3,400부터";
const DESC =
  "팀랩 보더리스 티켓 2026: 성인 ¥3,400부터 날짜·시간대별 변동, 약 2시간 관람, 현장 구매는 ¥200 더. 비교 후 예약하세요.";

const BORDERLESS_URL = koTeamlabBorderless.url;
const GYG_SLUG = "ko-teamlab-borderless-tickets";

const P = PRICES.teamlabBorderless;
const CHECKED = dateLabel(P.checked, "ko");
// "from ¥3,400" -> "¥3,400부터": same figure, Korean qualifier. See lib/i18n.ts.
const ADULT = priceLabel(P.adult, "ko");
const CHILD = priceLabel(P.child, "ko");

const PLANETS = PRICES.teamlabPlanets;
const PLANETS_CHECKED = dateLabel(PLANETS.checked, "ko");

// The date the official ticket address was confirmed, and the date the GetYourGuide
// listing was confirmed live (GYG_CHECKED_AT in lib/gyg-links.ts, 21 Oct 2026).
const ADDRESS_CHECKED = dateLabel("2026-10-26", "ko");
const GYG_CHECKED = dateLabel("2026-10-21", "ko");

const priceRows = [
  {
    ticket: "성인(만 18세 이상)",
    price: ADULT,
    varies: "예 — 날짜와 입장 시간대에 따라",
    note: "¥3,400은 최저 요금이며, 실제 요금은 방문 날짜에 따라 달라집니다. 결제 전에 본인 날짜의 금액을 확인하세요",
  },
  { ticket: "만 13~17세", price: "¥2,800", varies: "아니요 — 고정", note: "연령 확인이 필요할 수 있으니 신분증을 지참하세요" },
  { ticket: "만 4~12세", price: CHILD, varies: "아니요 — 고정", note: "어느 날짜를 골라도 같습니다" },
  { ticket: "만 3세 이하", price: "무료", varies: "아니요 — 무료", note: "티켓이 필요하지 않습니다" },
  {
    ticket: "장애인 할인",
    price: "¥1,700부터",
    varies: "예 — 성인 티켓과 같은 달력",
    note: "동반 1명도 같은 할인 요금. 증빙 서류를 지참하세요",
  },
];

const hoursRows = [
  { item: "운영 시간", detail: "공지 08:30–21:00, 날짜에 따라 다름", source: `teamlab.art, ${CHECKED}` },
  { item: "마지막 입장", detail: "폐관 1시간 전 — 21:00 폐관이면 20:00까지 입장", source: `teamlab.art, ${CHECKED}` },
  {
    item: "단축・연장 운영일",
    detail: "일찍 닫는 날(2026년 11월 17일은 17:00)과 늦게 닫는 날(일부 날짜 22:00)이 있음",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "휴관일",
    detail: "비정기적인 화요일 — 2026년 10월 20일, 11월 24일, 12월 8일 등",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Entrance Pass",
    detail: "날짜와 입장 시간을 모두 지정. 시간대가 곧 예약입니다",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Flexible Pass",
    detail: "고른 날짜에 유효하고 입장 시간 지정 없음, 추가 요금 있음",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "날짜 변경",
    detail: "팀랩에서 직접 산 티켓은 최대 3회",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "현장 구매",
    detail: "남은 자리가 있을 때만 미술관에서 판매, 성인 +¥200, 어린이・장애인 +¥100",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "권장 소요 시간",
    detail: "약 2시간 — 사진을 찍으면 더 길어지고, 서둘러 지나갈 정해진 경로도 없음",
    source: "이 가이드의 계획용 수치 — 팀랩은 공표하지 않음",
  },
];

const vsPlanetsRows = [
  {
    factor: "위치",
    borderless: "미나토구 아자부다이힐스 — 가미야초역에서 2분",
    planets: "도요스 — 신토요스역 1A 출구에서 도보 3분",
  },
  { factor: "성인 티켓", borderless: `${ADULT}, 날짜・시간대별`, planets: `${priceLabel(PLANETS.adult, "ko")}, 날짜・시간대별` },
  { factor: "만 4~12세", borderless: CHILD, planets: priceLabel(PLANETS.child, "ko") },
  {
    factor: "무엇을 하나",
    borderless: "지도 없는 미로 속 50점 이상의 작품을 신발을 신은 채 걷기",
    planets: "맨발로, 성인 무릎 높이까지 오는 물속을 걷기",
  },
  {
    factor: "입장",
    borderless: "날짜＋입장 시간, 또는 시간 지정 없는 Flexible Pass",
    planets: "날짜＋입장 시간만",
  },
  {
    factor: "현장 구매",
    borderless: "남은 자리가 있으면 판매, 성인 +¥200",
    planets: "현장 판매 전혀 없음 — 온라인 사전 구매뿐",
  },
  { factor: "권장 소요 시간", borderless: "약 2시간", planets: "약 1.5~2시간" },
  {
    factor: "이런 사람에게",
    borderless: "미술, 사진, 성인, 도쿄 도심의 비 오는 오후",
    planets: "아이 동반, 첫 방문에서 가장 강렬한 인상",
  },
];

const buyingRows = [
  {
    factor: "요금",
    official: "기본 요금, 날짜와 시간대에 따라 변동",
    klook: "같은 티켓을 자국 통화로 표시",
    gyg: "옵션마다 다름. 상품 페이지에서 확인",
    door: "성인 +¥200, 어린이・장애인 +¥100",
  },
  {
    factor: "결제 화면 언어",
    official: "영어 사이트가 있습니다",
    klook: "한국어 화면, 전자 티켓 즉시 발급",
    gyg: "영어 상품 페이지",
    door: "현장 미술관 창구",
  },
  {
    factor: "해외 발급 카드",
    official: "보통 되지만 보장되지는 않습니다",
    klook: "해외 카드와 모바일 결제를 전제로 설계",
    gyg: "확인되지 않음 — 결제 시 확인",
    door: "현장 카드 결제 가능",
  },
  {
    factor: "날짜 변경",
    official: "최대 3회까지 날짜 변경 가능",
    klook: "고른 클룩 옵션에 따라 다릅니다 — 결제 전에 확인하세요",
    gyg: "확인되지 않음 — 옵션마다 다르니 결제 전에 읽으세요",
    door: "해당 없음",
  },
  {
    factor: "못 살 위험",
    official: "미리 예약하면 낮습니다",
    klook: "미리 예약하면 낮습니다",
    gyg: "다른 곳에서 원하는 시간대가 사라졌을 때 시도해 볼 두 번째 창구",
    door: "높습니다 — 인기 시간대는 당일 전에 마감됩니다",
  },
];

const whoFor = [
  {
    title: "공식 사이트를 고른다면",
    desc: "가장 낮은 기본 요금과 가장 큰 날짜 유연성을 원하는 경우입니다. 팀랩에서 직접 산 티켓은 최대 3회까지 날짜를 바꿀 수 있어, 도쿄 일정이 아직 움직이고 있다면 쓸 만합니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: "클룩을 고른다면",
    desc: "자국 통화로 결제할 수 있는 이해하기 쉬운 예약 화면을 원하고, 일본 외 발급 카드로 지불하며, 전자 티켓을 다른 예약과 같은 앱에 두고 싶은 경우입니다. 클룩은 팀랩의 공식 티켓 판매 파트너이므로 같은 입장권이고, 창구만 다릅니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M14 6v12" strokeDasharray="2 2" />
        <path d="M6 10h4M6 14h4" />
      </svg>
    ),
  },
  {
    title: "현장 구매를 계획에 넣지 말아야 하는 경우",
    desc: "주말, 공휴일, 저녁 시간대에 가는 경우입니다. 현장 티켓은 성인 ¥200(어린이・장애인 ¥100)이 더 붙고 남은 자리가 있을 때만 팝니다. 그런데 대부분의 방문객이 원하는 시간대에는 그 자리가 없는 경우가 많습니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "날짜를 먼저 정하고 그 날짜의 가격을 봅니다",
    desc: "팀랩 보더리스의 성인 티켓과 장애인 티켓은 변동 요금제입니다. 보이는 금액은 고른 날짜와 입장 시간대에 달려 있습니다. 평일 오전이 보통 가장 저렴하고 가장 한가합니다.",
  },
  {
    title: "입장 시간을 고르거나 Flexible Pass를 고릅니다",
    desc: "표준 Entrance Pass에는 지정 입장 시간이 있습니다. 팀랩은 날짜만 지정하고 입장 시간을 지정하지 않는 Flexible Pass도 팝니다. 하루 일정을 예측하기 어렵다면 추가 요금을 낼 만합니다.",
  },
  {
    title: "주말과 저녁 회차는 2~3주 전에 예약합니다",
    desc: "팀랩 보더리스의 연간 관람객은 100만 명을 크게 넘고, 인기 시간대가 가장 먼저 사라집니다. 미리 예약하느냐에 따라 원하는 시간을 고르느냐, 남은 시간을 받아들이느냐가 갈립니다.",
  },
  {
    title: "약 두 시간을 비우고 짐은 줄입니다",
    desc: "정해진 경로가 없고 작품이 방 사이를 옮겨 다니므로 대부분 두 시간 정도는 안에 머물고 싶어집니다. 회차보다 조금 일찍 도착하고 가볍게 가세요. 가미야초역과 롯폰기잇초메역 모두 지하로 연결되어 있어 지상으로 올라가지 않고도 갈 수 있습니다.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026년 팀랩 보더리스 티켓 가격은 얼마인가요?",
    a: `팀랩 공식 사이트 기준(확인일 ${CHECKED}) Entrance Pass는 성인(만 18세 이상) ¥3,400부터, 만 13~17세 ¥2,800, 만 4~12세 ¥1,500이고 만 3세 이하는 무료입니다. 장애인 할인은 ¥1,700부터이고 동반 1명도 같은 할인 요금입니다. 성인 티켓과 장애인 티켓은 변동 요금제라 실제 금액은 고른 날짜와 시간대에 달려 있으니, 결제 전에 본인 날짜의 가격을 확인하세요. 현장 구매는 성인이 ¥200, 어린이와 장애인 티켓이 ¥100 더 비쌉니다.`,
  },
  {
    q: "팀랩 보더리스 티켓은 현장에서 살 수 있나요?",
    a: `네, 하지만 남은 자리가 있을 때만, 그리고 추가 요금이 붙습니다. ${CHECKED} 확인 당시 공식 사이트는 현장 티켓을 성인 ¥200, 어린이와 장애인 티켓 ¥100 더 비싸게 공지하고 있었습니다. 그래서 현장 구매는 계획이 아니라 대안입니다. 주말, 공휴일, 저녁 회차에는 대부분이 원하는 시간대가 당일 전에 사라지고, 매진된 달력은 창구에서 되살릴 수 없습니다. 도요스의 팀랩 플래닛과 가장 뚜렷하게 다른 점이기도 합니다. 플래닛은 공식 스토어가 현장 판매를 전혀 하지 않는다고 밝히고 있습니다.`,
  },
  {
    q: "팀랩 보더리스 티켓의 날짜를 바꿀 수 있나요?",
    a: `팀랩에서 직접 산 티켓은 날짜를 최대 3회까지 바꿀 수 있습니다(공식 사이트, 확인일 ${CHECKED}). 도쿄 일정이 아직 움직이고 있다면 판매 플랫폼이 아니라 공식 사이트에서 사는 가장 실질적인 이유입니다. 판매 플랫폼은 옵션마다 자체 변경・취소 조건을 정하고 그 조건이 제각각이므로, 공식 사이트의 변경 허용 횟수가 그대로 적용된다고 가정하지 말고 결제 전에 예약 페이지에서 읽어 보세요.`,
  },
  {
    q: "Entrance Pass와 Flexible Pass는 무엇이 다른가요?",
    a: `Entrance Pass는 날짜와 입장 시간을 지정합니다. 결제할 때 시간대를 고르고 그 시간대가 곧 예약입니다. Flexible Pass는 특정 날짜에 유효하고 입장 시간 지정이 없어 도착하는 대로 들어가면 되며, 그 자유만큼 추가 요금이 붙습니다. 두 가지 모두 ${CHECKED} 공식 사이트에 공지되어 있었습니다. 아자부다이힐스 주변의 하루 일정이 예측하기 어렵다면 Flexible Pass가 시간 지정이 앗아 가는 것을 되찾아 주고, 일정이 정해져 있다면 Entrance Pass가 더 저렴합니다.`,
  },
  {
    q: "팀랩 보더리스는 시간 지정 입장인가요? 그냥 가도 되나요?",
    a: "표준 Entrance Pass는 날짜와 시간을 지정합니다. 예약할 때 입장 시간대를 고릅니다. 팀랩은 날짜만 지정하고 입장 시간을 지정하지 않는 Flexible Pass도 팝니다. 현장 판매도 있지만 성인은 ¥200이 더 붙고 남은 자리가 있을 때만 팝니다. 주말, 공휴일, 저녁 회차에는 자리가 없는 일이 잦습니다. 현장 구매는 계획이 아니라 대안으로 생각하세요.",
  },
  {
    q: "팀랩 보더리스 운영 시간은 어떻게 되나요?",
    a: `운영 시간은 날짜에 따라 다릅니다. 공식 사이트 확인일 ${CHECKED} 기준으로 공지된 시간은 08:30–21:00이었고, 일부 날짜는 더 일찍 닫고(2026년 11월 17일은 17:00) 일부 날짜는 더 늦게(일부 날짜 22:00) 닫았습니다. 마지막 입장은 폐관 1시간 전입니다. 비정기적인 화요일 휴관도 있는데 2026년 10월 20일, 11월 24일, 12월 8일이 포함됩니다. 회차를 예약하기 전에 본인 날짜로 공식 달력을 꼭 확인하세요.`,
  },
  {
    q: "팀랩 보더리스는 얼마나 걸리나요?",
    a: "약 두 시간을 비워 두세요. 팀랩 보더리스에는 지도도, 정해진 경로도 없습니다. 50점이 넘는 작품이 미로 같은 공간에 퍼져 있고 작품이 방 사이를 넘나들며 하루 동안 변하므로, 얼마나 머무는지는 정말로 본인에게 달려 있습니다. 두 시간이면 주요 전시실을 서두르지 않고 볼 수 있고, 미술과 사진을 좋아하는 사람은 세 시간 가까이 머무는 일도 흔합니다.",
  },
  {
    q: "팀랩 보더리스는 어디에 있고 어떻게 가나요?",
    a: "도쿄 미나토구 도라노몬 5초메 일대의 아자부다이힐스 Garden Plaza B 지하 1층에 있습니다. 공식 교통 안내는 도쿄메트로 히비야선 가미야초역 5번 출구에서 도보 2분, 난보쿠선 롯폰기잇초메역 4번 출구에서 도보 6분입니다. 두 역 모두 지하 통로로 아자부다이힐스와 연결되어 있어 지상으로 올라가지 않고 안내판만 따라가면 됩니다. 비 오는 날이나 한여름 더위에 유용합니다.",
  },
  {
    q: "팀랩 보더리스는 공식 사이트와 클룩 중 어디서 사야 하나요?",
    a: "둘 다 정식 경로입니다. 클룩은 팀랩의 공식 티켓 판매 파트너이므로 어느 쪽에서 사도 같은 입장권입니다. 공식 사이트는 기본 요금을 주고 날짜를 최대 3회까지 바꿀 수 있습니다. 클룩은 자국 통화로 결제할 수 있는 이해하기 쉬운 예약 화면, 해외 발급 카드의 안정적인 승인, 다른 예약과 함께 두는 전자 티켓을 줍니다. 날짜 유연성이 가장 중요하면 공식 사이트, 해외 카드로 간편하게 결제하고 싶다면 클룩이 좋습니다.",
  },
  {
    q: "팀랩 보더리스와 팀랩 플래닛 중 어느 쪽을 예약할까요?",
    a: "같은 시설의 분관이 아니라 도쿄의 다른 구역에 있는 서로 다른 미술관입니다. 아자부다이힐스의 팀랩 보더리스는 50점이 넘는 작품으로 이루어진 미로를 헤매는 곳으로, 시간을 들여 천천히 둘러볼수록 더 많은 작품을 발견할 수 있습니다. 도요스의 플래닛은 맨발로 무릎 깊이의 물속을 걷는 곳이고 아이와 함께라면 더 쉬운 선택입니다. 한 곳만 갈 시간이 있다면 미술과 사진은 팀랩 보더리스, 아이와 함께하는 몸으로 느끼는 체험은 플래닛입니다.",
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
            팀랩 보더리스 티켓(2026):<br />가격, 예약 방법, 입장 시간대
          </h1>
          <p className={styles.heroSubtitle}>
            아자부다이힐스의 팀랩 보더리스(teamLab Borderless) 티켓이 실제로 얼마인지, 지정 시간 입장권은 어떻게 이용하는지,
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

        <p className={styles.bodyText}>
          아자부다이힐스의 <strong>팀랩 보더리스</strong> 성인 티켓은 팀랩 공식 사이트에서{" "}
          <strong>¥3,400부터</strong>입니다. 성인 입장권은 날짜와 시간대에 따라 가격이 달라지므로
          ¥3,400은 최저 요금이며, 실제 요금은 방문 날짜에 따라 달라집니다. 입장은 <strong>날짜와 시간 지정</strong>입니다. 표준 Entrance Pass는 입장
          시간대를 정하고, Flexible Pass는 날짜만 정합니다. 정해진 관람 동선이 없는
          미술관이므로 <strong>약 두 시간</strong>을 비워 두세요. 이 페이지의 가격, 운영 시간, 휴관일은 팀랩
          공식 사이트(teamlab.art)에서 {CHECKED}에 읽은 것입니다. 성인 요금은 달력에 따라 움직이므로 결제
          전에 본인 날짜의 금액을 확인하세요.
        </p>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>성인 티켓</p>
                <p className={styles.verdictStatValue}>¥3,400부터</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>입장 방식</p>
                <p className={styles.verdictStatValue}>날짜＋시간대 지정</p>
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
              <strong>요약:</strong> 성인 입장료는 ¥3,400부터이고 변동 요금제라 최종 금액은 고른 날짜와
              시간대가 결정합니다. 티켓은 날짜와 시간을 지정하며, 현장 구매는 성인 ¥200이 더 붙고 남은
              자리가 있어야 합니다. 운영 시간은 대략 08:30–21:00이고 마지막 입장은 폐관 1시간 전입니다.
              약 두 시간을 비워 두고, 가미야초역(히비야선, 도보 2분)이나 롯폰기잇초메역(난보쿠선, 도보
              6분)으로 가세요. 두 역 모두 지하로 연결됩니다. 기본 요금과 최대 3회 무료 날짜 변경을 원하면
              공식 사이트, 해외 카드로 자국 통화 결제를 할 수 있는 이해하기 쉬운 예약 화면을 원하면 클룩입니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                팀랩 보더리스 티켓 예약하기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              이 페이지의 가격, 운영 시간, 휴관일은 팀랩 공식 사이트에서 {CHECKED}에 읽었습니다. 팀랩 보더리스는
              변동 요금제이고 달력도 바뀌므로, 결제 시점에 본인 날짜로 두 가지를 모두 확인하세요.
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>2026년 팀랩 보더리스 티켓 가격은 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            성인은 <strong>¥3,400부터</strong>, 만 13~17세는 ¥2,800, 만 4~12세는 ¥1,500이고 만 4세 미만은
            무료입니다. 날짜에 따라 달라지는 요금은 성인과 장애인 요금뿐입니다. 팀랩 보더리스는 이 두 가지를 날짜와 입장
            시간대별로 매기기 때문에 공식 금액에 &ldquo;부터&rdquo;가 붙고, 여행 중 가장 싼 티켓은 판매처가
            아니라 달력의 문제가 됩니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓 종류", "가격(부터)", "날짜에 따라 변동?", "비고"].map((h) => (
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
            팀랩 공식 사이트에서 {CHECKED}에 읽었습니다. 현장 구매는 성인 ¥200, 어린이와 장애인 티켓 ¥100이
            더 붙습니다. 할인 티켓은 증빙이 필요하니 신분증을 지참하세요.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>성인 요금이 얼마나 움직이는지는 공표되지 않습니다.</strong> 팀랩이 내놓는 것은 가격표가
            아니라 시작 금액과 달력이므로, 정직한 가이드라면 팀랩 보더리스의 토요일 저녁이 얼마인지 말할 수
            없습니다. 그 범위를 알려 주는 페이지가 있다면 지어낸 것입니다. ¥3,400을 최저 요금으로 보고, 여행에
            넣을 수 있는 모든 날짜로 공식 달력을 열어 금액을 비교한 뒤 결제하세요. 여기서 쓸 수 있는 지렛대는
            방문을 하루 옮기는 것이지 더 싼 판매처를 찾는 것이 아닙니다. 가격을 정하는 것은 날짜와
            시간대이기 때문입니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>예약 전에</span>
          <h2 className={styles.sectionTitle}>운영 시간, 입장 시간대, 휴관일, 소요 시간</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            팀랩 보더리스는 오래 열지만 달력이 자주 바뀌고, 이 점이 가격보다 더 자주 사람들의 발목을 잡습니다.
            비정기적인 화요일에 휴관하고 17:00에 닫는 날도 있습니다. 안에서 약 두 시간을 보내게 되니 바로
            뒤에 빠듯한 일정을 잡지 마세요.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "공식 사이트 내용", "출처와 확인일"].map((h) => (
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
            운영 시간과 휴관일이 달마다 바뀌므로, 먼저 본인 여행 날짜로 공식 달력을 연 다음 회차를 예약하세요.
            평일 오전이 가장 한가하고 보통 가장 저렴하며, 주말과 저녁 회차가 가장 먼저 사라집니다. 위 표에서
            팀랩 자체 문구가 아닌 것은 권장 소요 시간 한 줄뿐이고, 표에도 그렇게 적었습니다. 경로를 관람객이
            고르는 미술관이라 팀랩은 관람 시간을 공표하지 않습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>무엇을 사는가</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스는 정확히 무엇인가</h2>
          <p className={styles.bodyText}>
            팀랩 보더리스는 지도가 없는 미술관입니다. 50점이 넘는 디지털 작품이 서로 이어진 방들에 퍼져 있고,
            작품 자체가 움직입니다. 한 공간에서 다른 공간으로 옮겨 가고, 방 안의 사람에게 반응하며, 하루
            동안 변합니다. 권장 경로도, 번호가 붙은 지점도 없어서 같은 티켓을 산 두 사람의 관람이 실제로
            다를 수 있습니다.
          </p>
          <p className={styles.bodyText}>
            바로 그 설계 때문에 이 티켓은 계획을 세울 가치가 있습니다. 한 시간을 서두르면 유명한 전시실만
            보고 끝나고, 두 시간쯤 되어야 돌아다니고 되돌아가며 기다려야 나타나는 작품까지 찾을 수 있습니다.
            그래서 팀랩 보더리스는 도쿄의 두 팀랩 미술관 중 더 어른스럽고 사진 촬영에 더 잘 맞는 곳입니다. 도요스에서
            맨발로 물속을 걷는 쪽, 그리고 플래닛 쪽에서 본 선택은{" "}
            <Link href="/ko/guides/attractions/teamlab-planets-tickets">팀랩 플래닛 티켓 가이드</Link>
            를 보세요.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>판단</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스는 갈 만한가요?</h2>
          <p className={styles.bodyText}>
            미술, 사진, 혹은 다른 어디에서도 볼 수 없는 공간을 좋아한다면 그렇습니다. 다만 1인 ¥3,400부터인
            약 두 시간짜리 명소라, 가격은 오후 한나절인데 소비하는 시간은 긴 점심 정도입니다. 결론을 던지는
            대신 판단할 숫자를 앞에 놓겠습니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>시간당 비용은 높습니다.</strong> 약 두 시간에 ¥3,400은 ¥1,500인 도쿄타워 메인 데크의 두 배가 넘고 시부야 스카이의 낮 시간 온라인 티켓 {PRICES.shibuyaSky.adult.split(" / ")[0]}보다도 비쌉니다. 두 곳 모두 오래 머물 수 있는 곳입니다. 금액 비교는 <Link href="/guides/attractions/japan-attraction-ticket-prices">일본 관광지 티켓 가격표(영어)</Link>에서 볼 수 있습니다. 길이가 아니라 다른 곳에서 볼 수 없는 것에 돈을 내는 셈입니다.</li>
            <li><strong>지도 없는 설계는 가치이자 위험입니다.</strong> 경로도 번호도 없는 50점 이상의 작품이란, 서두른 한 시간으로는 유명한 전시실만 보고 끝난다는 뜻입니다. 한 시간밖에 없다면 이 티켓은 줄어든 좋은 경험이 아니라 손해 보는 경험입니다.</li>
            <li><strong>두 곳 중 몸을 덜 쓰는 곳입니다.</strong> 신발을 신은 채이고, 물을 건널 일도 갈아입을 옷을 챙길 일도 없습니다. 플래닛 방식이 체험이 아니라 고생처럼 들린다면, 이곳은 그것을 뺀 같은 팀랩입니다.</li>
            <li><strong>날씨에 강하고 도심에 있습니다.</strong> 아자부다이힐스는 가미야초역에서 지하로 2분이라, 비 오는 오후에도 이동에서 잃는 것이 없습니다. 도쿄의 비 오는 날 계획 대부분은 그렇지 못합니다.</li>
            <li><strong>실수해도 만회할 수 있습니다.</strong> 플래닛과 달리 팀랩 보더리스는 남은 자리가 있으면 현장에서도 팔기 때문에, 예약을 놓쳐도 ¥200 추가 요금과 덜 좋은 시간대로 끝나지 오후 전체를 잃지는 않습니다.</li>
          </ul>
          <p className={styles.bodyText}>
            도쿄 일정이 이미 빠듯하거나, 한 시간밖에 낼 수 없거나, 어린아이와 함께라서 팀랩을 한 곳만 갈 수
            있다면 건너뛰세요. 아이와 함께라면 플래닛이 더 쉽습니다. 이 티켓이 실망스러운 이유는 이 세
            가지이고, 어느 것도 작품 때문이 아닙니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>잔여석</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 티켓은 매진되나요?</h2>
          <p className={styles.bodyText}>
            개별 시간대는 매진되고, 인기 있는 시간대가 먼저 사라집니다. 팀랩 보더리스의 연간 관람객은 100만 명을
            크게 넘고, 주말과 저녁 회차가 가장 먼저 없어집니다. 다만 완전히 막히지는 않습니다. 남은 자리가
            있는 동안은 미술관에서도 티켓을 팔기 때문에, 팀랩 보더리스는 도쿄의 다른 시간 지정 명소 대부분보다
            관대합니다. 대가는 치러야 하지만요.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>이 가이드가 권하는 예약 시점:</strong> 주말, 공휴일, 저녁 회차는 2~3주 전, 평일 오전은 보통 며칠 전이면 충분합니다. 달력의 움직임에서 나온 계획용 기준이지 공식 수치가 아닙니다. 팀랩은 매진 데이터를 공개하지 않습니다.</li>
            <li><strong>당일・현장 구매:</strong> 남은 자리가 있을 때만, 성인 ¥200, 어린이・장애인 ¥100 더 비쌉니다. 공식 정보, {CHECKED} 확인. 계획이 아니라 대안으로 생각하세요. 대부분이 원하는 날짜에는 대부분이 원하는 시간대가 이미 사라졌습니다.</li>
            <li><strong>날짜가 바뀌면 다시 사지 말고 변경하세요:</strong> 팀랩에서 직접 산 티켓은 날짜를 최대 3회까지 바꿀 수 있습니다. 공식 정보, {CHECKED} 확인.</li>
            <li><strong>판매 플랫폼 조건은 따로입니다:</strong> 클룩과 GetYourGuide의 변경・취소 기한은 옵션마다 정해지고 서로 다르므로, 팀랩의 3회 변경이 그대로 적용된다고 가정하지 말고 결제 전에 예약 페이지에서 조건을 읽으세요.</li>
            <li><strong>가장 싼 시간대는 달력의 문제입니다:</strong> 평일 오전이 가장 한가하고 보통 가장 저렴하지만, 팀랩은 시간대별 가격표를 공개하지 않으므로 본인 날짜의 금액은 달력에만 있습니다.</li>
          </ul>
          <p className={styles.bodyText}>
            그러니 실제 순서는 날짜를 고르고, 그 날짜의 가격을 읽고, 그다음 판매처를 고르는 것입니다. 내는
            금액을 바꾸는 것은 앞의 두 가지뿐입니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              팀랩 보더리스 날짜와 시간대 보기 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            클룩은 팀랩의 공식 티켓 판매 파트너이고, GetYourGuide는 원하던 시간대가 사라졌을 때 한 번 더
            찾아볼 곳입니다. 이 페이지에는 둘 다 가격을 적지 않았습니다. 둘 다 날짜별로 가격이 매겨지므로,
            이 페이지의 금액을 포함해 대표 금액을 믿지 말고 달력을 여세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>어디서 사는가</span>
          <h2 className={styles.sectionTitle}>공식 사이트 vs 클룩 vs GetYourGuide vs 현장</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            클룩은 팀랩의 공식 티켓 판매 파트너이므로 어느 창구를 거쳐도 입장권은 같습니다. 다른 것은 결제
            과정, 유연성, 그리고 당일까지 미뤘을 때의 가격입니다. GetYourGuide에서도 팀랩 보더리스를 팔지만 아래
            열은 일부러 비워 두었습니다. 무엇이 확인되었고 무엇이 확인되지 않았는지는 표 아래 주석을 보세요.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "공식 사이트", "클룩", "GetYourGuide", "당일 현장"].map((h) => (
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
                      <td style={{ fontSize: "0.88rem" }}>{row.gyg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            현장 추가 요금과 날짜 변경 횟수는 팀랩 공식 사이트 {CHECKED} 공지 기준입니다. 판매 플랫폼의 취소・변경
            조건은 옵션마다 다르므로 결제 전에 예약 페이지에서 확인하세요. GetYourGuide 열은 일부러 짧게
            두었습니다. 팀랩 보더리스 상품 페이지가 있다는 것은 {GYG_CHECKED}에 확인했지만, 가격, 카드 처리,
            변경 조건은 여기서 확인된 내용이 아니니 상품 페이지에서 확인하세요. 해당 칸에는 추측 대신
            그렇게 적었습니다.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>어디가 맞는가</span>
          <h2 className={styles.sectionTitle}>어떻게 살까?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>예약 절차</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스는 어떻게 예약하나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            날짜를 먼저 고르고, 그 날짜의 가격을 읽고, 시간 지정 Entrance Pass와 Flexible Pass 중에서 고른
            다음 구매합니다. 공식 사이트에서 사거나, 자국 통화로 결제하고 싶다면 클룩에서 사면 됩니다. 네
            단계이고, 내는 금액을 바꾸는 것은 첫 단계뿐입니다.
          </p>
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
            시간대를 잡을 준비가 되었다면{" "}
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL}>
              클룩에서 팀랩 보더리스 잔여석과 가격 보기 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>공식 구매</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 공식 티켓 사이트는 어디인가요?</h2>
          <p className={styles.bodyText}>
            미술관 자체 페이지는 <strong>teamlab.art/e/tokyo</strong>입니다(영어판, 일본어판은
            teamlab.art/jp/e/tokyo). 티켓 달력과 결제도 여기서 열립니다. 예전 링크를 저장해 두었다면,{" "}
            <strong>borderless.teamlab.art</strong>는 더 이상 별도 스토어가 아닙니다. 영어와 일본어 주소 모두
            위의 teamlab.art 페이지로 연결되며, {ADDRESS_CHECKED}에 확인했습니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>여기서 &ldquo;공식&rdquo;이 중요한 이유:</strong> 기본 요금은 팀랩 자체 달력에 있고, 3회 무료 날짜 변경은 직접 산 티켓에만 있습니다. 판매 플랫폼은 같은 입장권을 자체 조건으로 팝니다.</li>
            <li><strong>그 밖의 정식 경로:</strong> 클룩은 팀랩의 공식 티켓 판매 파트너이므로, 클룩 티켓은 다른 창구에서 산 같은 입장권입니다. 편법도 아니고 정가에 웃돈을 얹은 것도 아닙니다.</li>
            <li><strong>직접 사도 얻지 못하는 것:</strong> 할인입니다. 성인 금액은 날짜와 시간대가 정하고, 그 달력은 모든 공식 판매처 뒤에 있는 같은 달력입니다.</li>
            <li><strong>직접 사서 잃을 수 있는 것:</strong> 카드 결제 거절입니다. 일본식 결제 화면은 방문객이 판매 플랫폼으로 가는 흔한 이유이고, 해외용 결제는 실수가 아니라 그에 대한 합리적인 해법입니다.</li>
          </ul>
          <p className={styles.bodyText}>
            정리하면, 카드가 통하고 날짜 유연성을 원하면 직접 사고, 자국 언어와 통화로 결제하고 전자 티켓을
            다른 예약과 함께 두고 싶다면 클룩에서 사세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>나란히 비교</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 vs 플래닛: 어느 쪽을 예약할까?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>작품을 보고 싶다면 팀랩 보더리스, 작품 속을 걷고 싶거나 아이와 함께라면 플래닛입니다.</strong>{" "}
            도쿄에는 팀랩 미술관이 두 곳 있고, 방문객이 엉뚱한 쪽을 예약하는 일이 흔합니다. 도시의 다른 구역에
            있는 별개의 미술관이고 티켓도 따로이며, 결정을 내려 주는 숫자는 아래와 같습니다. 맨발 규칙, 사물함,
            어린이 관련 규정 등 플래닛 쪽의 전체 내용은{" "}
            <Link href="/ko/guides/attractions/teamlab-planets-tickets">팀랩 플래닛 티켓 가이드</Link>를 보세요.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "팀랩 보더리스", "팀랩 플래닛"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsPlanetsRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            팀랩 보더리스 수치는 팀랩 공식 사이트에서 {CHECKED}에, 플래닛 수치는 플래닛 공식 티켓 스토어에서{" "}
            {PLANETS_CHECKED}에 읽었습니다. 두 미술관 모두 성인 요금을 날짜와 시간대별로 매기고 달력도 바뀌므로
            본인 날짜로 확인하세요. 각 권장 소요 시간은 이 가이드의 계획용 기준이지 공식 수치가 아닙니다.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            두 곳 모두 갈 시간이 있다면 다른 날로 나누세요. 오후 한나절에 디지털 아트를 네 시간 보면 어느
            것도 눈에 들어오지 않게 되고, 두 곳은 도시 반대편에 30분 거리로 떨어져 있습니다. 한 곳만 고른다면
            어울리는 동행, 입장 방식, 운영 기간을 나란히 정리한{" "}
            <Link href="/ko/guides/attractions/teamlab-tokyo-tickets">팀랩 플래닛 보더리스 비교</Link>를 보세요.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>교통</span>
          <h2 className={styles.sectionTitle}>팀랩 보더리스 위치</h2>
          <p className={styles.bodyText}>
            미술관은 미나토구 도라노몬 5초메 일대의 아자부다이힐스 Garden Plaza B 지하 1층에 있습니다. 예전
            오다이바의 팀랩 보더리스가 아닙니다. 그곳은 문을 닫았으니 해변으로 안내하는 경로는 무시하세요.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>가미야초역</strong>(도쿄메트로 히비야선) — 5번 출구에서 도보 2분.</li>
            <li><strong>롯폰기잇초메역</strong>(도쿄메트로 난보쿠선) — 4번 출구에서 도보 6분.</li>
            <li>두 역 모두 지하 통로로 아자부다이힐스와 연결되어 있어, 지상으로 올라가지 않고 안내판만 따라가면 됩니다.</li>
          </ul>
          <p className={styles.bodyText}>
            <Link href="/guides/transport/ic-cards-japan">스이카나 파스모 같은 IC 카드(영어)</Link>로 찍고
            타면 두 역 모두 따로 준비할 것이 없습니다. 노선에 대한 자세한 내용은{" "}
            <Link href="/guides/transport/tokyo-transportation">도쿄 교통 가이드(영어)</Link>에 있습니다.
          </p>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "팀랩 후쿠오카 티켓 2026: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "팀랩 교토 티켓: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "팀랩 보태니컬 가든 오사카 티켓: 가격과 운영 시간(영어)" },
            { href: "/guides/attractions/tokyo-joypolis-tickets", title: "도쿄 조이폴리스 티켓(2026): 패스포트 가격, 운영 시간, 키 제한(영어)" },
            { href: "/ko/guides/attractions/teamlab-planets-tickets", title: "팀랩 플래닛 예약 2026: 티켓 가격, 운영 시간, 가는 법" },
            { href: "/ko/guides/attractions/teamlab-tokyo-tickets", title: "팀랩 플래닛 보더리스 비교 2026: 도쿄에서 어디로 갈까" },
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 전철, 지하철, IC 카드(영어)" },
            { href: "/guides/attractions", title: "일본의 더 많은 즐길 거리(영어) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>팀랩 보더리스 시간대를 예약하세요</h2>
            <p className={styles.ctaBannerDesc}>
              시간 지정 입장이라는 것은, 가장 원하는 시간대가 가장 먼저 매진된다는 뜻입니다. 클룩은 팀랩의
              공식 티켓 판매 파트너로, 자국 통화로 결제하고 전자 티켓을 휴대폰으로 받습니다.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                팀랩 보더리스 티켓 보기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
