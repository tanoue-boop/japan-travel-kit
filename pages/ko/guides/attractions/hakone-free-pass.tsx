import type { ReactNode } from "react";
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
import KlookTripPrep from "../../../../components/KlookTripPrep";
import {
  hakoneCruiseCableCarTour,
  hakoneFreepass,
  hakoneFreepassTripPrep,
  hakoneLoopBusTour,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/hakone-free-pass) section by section as of
// 2026-11-24 (task-jtk-20261124-TR01): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added.
// Title term: 하코네 프리패스 — the name on Hakone Navi's own Korean page
// (hakonenavi.jp/international/kr/discount_passes/free_pass) and in Korean results.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/hakone-free-pass";
const TITLE = "하코네 프리패스 2026: 신주쿠 출발 가격, 살 만할까?";
const H1 = "하코네 프리패스 2026: 신주쿠 출발 가격, 이용 구간, 살 만할까?";
const DESC =
  "하코네 프리패스 2026: 신주쿠 출발 2일권 ¥7,100, 오다와라 ¥6,000. 패스 없이 일주하면 ¥8,322라 하루만 써도 이득입니다.";

const CHECKED_ISO = "2026-11-20";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const BUY_CHECKED_ISO = "2026-11-13";
const BUY_CHECKED = dateLabel(BUY_CHECKED_ISO, LOCALE);
const LOOP_URL = "https://www.hakonenavi.jp/international/en/article/4252";
const JR_URL = "https://odakyu-global.com/blog/2053/";
const LOOP_REGULAR = "¥8,322";
const LOOP_SAVING = "¥1,222";
const NAVI_URL = "https://www.hakonenavi.jp/international/en/discount_passes/free_pass";
const ODAKYU_URL = "https://www.odakyu.jp/english/passes/hakone/";
const FARE_NOTICE_URL = "https://www.hakonenavi.jp/international/en/wp-content/uploads/sites/2/2025/09/re_price202510.pdf";

const PASS_2_DAY_SHINJUKU = "¥7,100";
const PASS_3_DAY_SHINJUKU = "¥7,500";
const PASS_2_DAY_ODAWARA = "¥6,000";
const PASS_3_DAY_ODAWARA = "¥6,400";
const ROMANCECAR = "¥1,200";
const ROPEWAY = "¥2,000";
const CRUISE = "¥1,700";

const HAKONE_PASS_URL = klookFor(hakoneFreepass.url, LOCALE);
const HAKONE_TOUR_URL = klookFor(hakoneLoopBusTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  { pass: "도쿄 방문객 대부분: 신주쿠 출발 2일권", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "신주쿠 출발(오다큐선 왕복 포함)", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "오다와라 출발(하코네 지역만)", d2a: PASS_2_DAY_ODAWARA, d2c: "¥1,500", d3a: PASS_3_DAY_ODAWARA, d3c: "¥1,750" },
  { pass: "마치다 출발", d2a: "¥6,820", d2c: "¥1,600", d3a: "¥7,220", d3c: "¥1,850" },
  { pass: "후지사와 출발", d2a: "¥7,050", d2c: "¥1,600", d3a: "¥7,450", d3c: "¥1,850" },
];

const buyRows = [
  {
    where: "추천",
    ticket: "일행 모두 스마트폰이 있다면 출발 전에 온라인으로 구매",
    when: "자기 휴대폰이 없는 어린이가 있다면 오다큐 역에서 종이 티켓",
    note: "디지털 패스는 스마트폰으로 이용할 수 있습니다(함께 다니는 일행이라면 For Group 옵션으로 휴대폰 1대에 최대 4장). 종이 패스는 누구나 쓸 수 있습니다.",
  },
  {
    where: "EMot 온라인 티켓(오다큐 공식 사이트)",
    ticket: "디지털 QR 코드, 스마트폰 전용",
    when: "출발 전 온라인",
    note: "함께 다니는 일행이라면 For Group 옵션으로 휴대폰 1대에 최대 4장까지 담을 수 있습니다. EMot에서 예약한 로망스카 좌석은 역에서 사는 것보다 ¥50 저렴합니다. 환불은 티켓에 환불 버튼이 표시된 경우에만 가능합니다.",
  },
  {
    where: "오다큐선 각 역(승차권 발매기)과 오다큐 관광 서비스 센터",
    ticket: "종이 티켓",
    when: "오다큐선 역에서는 1개월 전부터 판매합니다. 발매기는 당일부터 유효한 패스만 판매합니다",
    note: "발매기에서는 현금, PASMO/Suica, American Express, Diners Club, JCB, Mastercard, Visa로 결제할 수 있습니다.",
  },
  {
    where: "세븐일레븐(7-Ticket)",
    ticket: "매장 내 멀티 복합기에서 발권하는 종이 티켓",
    when: "출발 전",
    note: "발권 수수료는 없습니다. 오다큐선 왕복이 포함된 패스는 신주쿠 출발만 판매합니다.",
  },
  {
    where: "하코네 현지: 하코네 등산철도 발매기와 하코네 등산버스 안내소",
    ticket: "종이 티켓",
    when: "당일",
    note: "발매기는 하코네유모토, 고라, 소운잔 등 등산철도 각 역에 있고, 버스 안내소는 오다와라역, 하코네유모토, 모토하코네, 하코네마치, 센고쿠, 도겐다이, 미야기노에 있습니다.",
  },
  {
    where: "클룩",
    ticket: "같은 오다큐 패스를 클룩에서 예약",
    when: "출발 전 온라인",
    note: "한국어 결제 화면에서 해외 발급 카드로 결제할 수 있습니다. 바우처 사용 방법과 취소 규정은 상품 페이지에서 확인하세요.",
  },
];

const coverageRows = [
  {
    mode: "오다큐선(신주쿠 ⇄ 오다와라)",
    included: "✓ 왕복 1회",
    note: "신주쿠 출발 패스에만 포함되며, 이동 중 중간역에서 내렸다가 다시 탈 수 있습니다. 오다와라 출발 패스에는 포함되지 않습니다.",
  },
  { mode: "하코네 등산전차(오다와라 / 하코네유모토 ⇄ 고라)", included: "✓ 무제한", note: "스위치백 방식으로 산을 오르는 산악 철도로, 하코네유모토에서 시작하는 일주 코스의 첫 구간입니다." },
  { mode: "하코네 등산 케이블카(고라 ⇄ 소운잔)", included: "✓ 무제한", note: "로프웨이 승차역까지 올라가는 케이블카(강삭철도)입니다." },
  { mode: "하코네 로프웨이(소운잔 ⇄ 오와쿠다니 ⇄ 도겐다이)", included: "✓ 무제한", note: `오와쿠다니를 지나는 구간으로, 편도 ${ROPEWAY}으로 일주 코스에서 요금이 가장 비싼 구간입니다.` },
  { mode: "하코네 유람선(아시노코 해적선)", included: "✓ 무제한", note: `도겐다이에서 하코네마치 또는 모토하코네까지, 패스가 없으면 편도 ${CRUISE}입니다. 특별 선실을 이용하려면 추가 요금을 내야 합니다.` },
  { mode: "하코네 등산버스(지정 구간)", included: "✓ 무제한", note: "하코네유모토나 오다와라로 돌아와 일주를 마칠 때 이용합니다." },
  { mode: "관광시설 순환 버스(KANKO SHISETSU-MEGURI)", included: "✓ 무제한", note: "하코네 등산버스와 오다큐 하이웨이 버스가 관광지 사이를 운행합니다." },
  { mode: "오다큐 하이웨이 버스(지정 구간)", included: "✓ 무제한", note: "사전 예약 승객이 먼저 타므로 만석일 수 있습니다." },
  { mode: "도카이 버스(지정 구간)", included: "✓ 무제한", note: "지정 구간 안에서만 이용할 수 있습니다." },
  { mode: "특급 로망스카", included: "✗ 포함 안 됨", note: `별도 특급권이 필요합니다. 신주쿠 → 하코네유모토 어른 ${ROMANCECAR}, 어린이 ¥600입니다.` },
  { mode: "이즈하코네 버스", included: "✗ 포함 안 됨", note: "다른 버스 회사가 운행하는 노선입니다. 타기 전에 버스 회사를 확인하세요." },
];

const legRows = [
  {
    leg: `신주쿠 출발 일주 코스를 하루에: 패스 없이 ${LOOP_REGULAR}, 패스로 ${PASS_2_DAY_SHINJUKU}`,
    adult: `${LOOP_SAVING} 절약`,
    child: "—",
    source: "하코네 나비(오다큐 하코네), IC 카드 운임, 로망스카 제외",
  },
  {
    leg: "패스 없이 일주: 오다큐선 왕복, 등산전차, 케이블카, 로프웨이, 유람선, 버스",
    adult: LOOP_REGULAR,
    child: "—",
    source: "하코네 나비 합계(IC 카드 운임)",
  },
  { leg: "하코네 프리패스 신주쿠 출발 2일권", adult: PASS_2_DAY_SHINJUKU, child: "¥1,600", source: "odakyu-global.com / hakonenavi.jp" },
  { leg: "합계에 포함된 구간: 하코네 로프웨이 소운잔 → 도겐다이(편도)", adult: ROPEWAY, child: "¥700", source: "오다큐 하코네 운임 안내, 2025년 10월 1일부터" },
  { leg: "합계에 포함된 구간: 아시노코 유람선 도겐다이 → 하코네마치 / 모토하코네(편도)", adult: CRUISE, child: "¥850", source: "오다큐 하코네 운임 안내, 2025년 10월 1일부터" },
  { leg: "오다큐선 신주쿠 ⇄ 오다와라(일반 운임, 편도)", adult: "¥910", child: "—", source: "odakyu.jp" },
  { leg: "로망스카를 왕복으로 이용할 때", adult: `${PASS_2_DAY_SHINJUKU} + ¥2,400 = ¥9,500`, child: "—", source: "odakyu.jp 계산 예시" },
];

const worthRows = [
  {
    plan: "하코네 2일, 온천 료칸 1박",
    verdict: "✓ 2일권 구매",
    why: `이런 일정에 맞는 요금의 패스입니다. 신주쿠 출발 ${PASS_2_DAY_SHINJUKU}으로 오다큐선 왕복과 이틀 동안 일주 코스의 모든 구간을 이용할 수 있습니다.`,
  },
  {
    plan: "도쿄에서 당일치기로 일주 코스 전체 이용",
    verdict: "✓ 당일치기도 이득",
    why: `하코네 나비 기준으로 신주쿠 출발 일주 코스는 IC 카드 일반 운임 ${LOOP_REGULAR}이므로, ${PASS_2_DAY_SHINJUKU} 패스를 첫날만 써도 ${LOOP_SAVING}를 절약합니다. 오다큐도 당일치기에도 이득이라고 안내합니다.`,
  },
  {
    plan: "신칸센으로 오다와라에 도착하거나 이미 하코네에 숙박",
    verdict: "✓ 오다와라 출발 패스 구매",
    why: `이용하지 않는 오다큐선 왕복 운임이 빠지므로 ${PASS_2_DAY_SHINJUKU} 대신 ${PASS_2_DAY_ODAWARA}입니다. 하코네 안에서 이용할 수 있는 교통수단 8종은 같습니다.`,
  },
  {
    plan: "하코네유모토에서 온천과 점심만",
    verdict: "✗ 구매하지 않음",
    why: "로프웨이와 유람선을 타지 않으면 총운임이 패스 가격보다 저렴합니다. 교통편을 이용할 때마다 요금을 내세요.",
  },
  {
    plan: "시간표를 신경 쓰지 않고 일주하고 싶은 경우",
    verdict: "✗ 당일 투어 선택",
    why: "가이드 동행 버스 투어는 정해진 시간에 출발해 오와쿠다니와 아시노코를 둘러보고 당일 저녁 도쿄로 돌아옵니다. 교통 패스와는 다른 상품입니다.",
  },
];

const formatRows = [
  { item: "어느 쪽을 살까", digital: "일행 모두 스마트폰이 있고 역 매표소 줄을 피하고 싶다면 디지털", paper: "어린이가 키즈폰을 쓰거나 스마트폰 배터리가 걱정된다면 종이 패스" },
  { item: "구매처", digital: "EMot 온라인 티켓, 스마트폰 전용", paper: "오다큐 관광 서비스 센터 또는 역 발매기" },
  { item: "결제", digital: "온라인", paper: "발매기에서 현금, PASMO/Suica, American Express, Diners Club, JCB, Mastercard, Visa" },
  { item: "일행", digital: "For Group 옵션으로 휴대폰 1대에 최대 4장. 함께 이동해야 하며, 개찰구에서는 동행자의 QR 코드를 먼저 스캔하고 본인의 QR 코드를 마지막에 스캔합니다", paper: "1인 1장" },
  { item: "어린이", digital: "6~11세는 어린이 요금, 6세 미만은 티켓이 필요 없습니다. 일본 키즈폰은 이용할 수 없습니다", paper: "6~11세는 어린이 요금, 6세 미만은 티켓이 필요 없습니다" },
  { item: "환불", digital: "티켓에 환불 버튼이 표시된 경우에만 가능합니다. 날씨 때문에 운행 중단된 구간은 EMot 고객 지원 창구에서 환불합니다", paper: "운행 중단이 생기면 마지막으로 이용한 역에서 이용하지 못한 교통편만 환불받을 수 있습니다" },
];

const faqItems: FaqItem[] = [
  {
    q: "2026년 하코네 프리패스 가격은 얼마인가요?",
    a: `신주쿠 출발 2일권은 어른 ${PASS_2_DAY_SHINJUKU}, 어린이(6~11세) ¥1,600이고, 3일권은 ${PASS_3_DAY_SHINJUKU} / ¥1,850입니다. 하코네 지역만 이용하는 오다와라 출발 패스는 2일권 ${PASS_2_DAY_ODAWARA} / ¥1,500, 3일권 ${PASS_3_DAY_ODAWARA} / ¥1,750입니다. 2025년 10월 1일부터 적용된 요금이며, hakonenavi.jp와 odakyu.jp에서 ${CHECKED}에 확인했습니다.`,
  },
  {
    q: "하코네 프리패스는 하루만 써도 이득인가요?",
    a: `일주 코스의 교통편을 모두 이용한다면 교통비를 절약할 수 있습니다. 1일권은 없지만, 오다큐 하코네의 공식 사이트인 하코네 나비는 신주쿠 출발 일주 코스(오다큐선 왕복, 등산전차, 케이블카, 로프웨이, 아시노코 유람선, 버스)를 IC 카드 일반 운임으로 ${LOOP_REGULAR}로 계산합니다. 2일권 ${PASS_2_DAY_SHINJUKU}과 비교하면 하루에 ${LOOP_SAVING}를 절약합니다. 차액의 대부분은 로프웨이(편도 ${ROPEWAY})와 유람선(${CRUISE}) 요금에서 나옵니다. 하코네유모토만 방문한다면 교통비를 절약할 수 없습니다. ${CHECKED} 확인.`,
  },
  {
    q: "하코네 프리패스는 어디서 사나요?",
    a: `오다큐의 EMot 온라인 티켓(스마트폰 전용 디지털 QR 패스), 오다큐선 역 발매기와 오다큐 관광 서비스 센터(종이), 세븐일레븐의 7-Ticket, 오다큐 여행 영업점, 그리고 하코네 현지의 하코네 등산철도 발매기와 하코네 등산버스 안내소에서 살 수 있습니다. 오다큐 역에서는 1개월 전부터 판매하고, 발매기는 당일부터 유효한 패스만 판매합니다. 클룩에서도 한국어 결제 화면으로 살 수 있습니다. ${BUY_CHECKED} 확인.`,
  },
  {
    q: "하코네 프리패스에 로망스카가 포함되나요?",
    a: `포함되지 않습니다. 신주쿠 출발 패스에는 오다큐선 왕복 1회가 포함되지만, 특급 로망스카는 별도 특급권이 필요합니다. 신주쿠 ⇄ 하코네유모토 편도 어른 ${ROMANCECAR}, 어린이 ¥600이고, 오다와라에서는 ¥200 / ¥100입니다. 환승 없이 약 80분이 걸리며, EMot 온라인 티켓으로 좌석을 예약하면 ¥50 저렴합니다. 오다큐의 계산 예시는 패스 ${PASS_2_DAY_SHINJUKU} + 로망스카 왕복 ¥2,400 = ¥9,500입니다. ${CHECKED} 확인.`,
  },
  {
    q: "JR 패스와 하코네 프리패스를 함께 쓸 수 있나요?",
    a: `함께 쓸 수 있지만 서로를 대신하지는 않습니다. 오다큐에 따르면 JR 패스와 JR 도쿄 와이드 패스는 하코네 지역 안에서 쓸 수 없고, JR 노선으로 오다와라까지 가는 데 쓸 수 있습니다. 오다와라부터는 하코네 지역만 포함하고 이용하지 않는 오다큐선 운임이 빠진 오다와라 출발 하코네 프리패스(2일권 ${PASS_2_DAY_ODAWARA}, 3일권 ${PASS_3_DAY_ODAWARA})를 사세요. ${CHECKED} 확인.`,
  },
];

const tripPrepItems = [
  withKlookLocale(hakoneFreepassTripPrep[0], LOCALE, {
    label: "하코네 오와쿠다니·아시노코·하코네 신사 버스 투어",
    ctaLabel: "하코네 당일 투어 보기 →",
    why: "패스에는 1일권이 없습니다. 도쿄에서 하루만 다녀온다면 가이드가 동행하는 버스 투어로 오와쿠다니와 아시노코를 티켓 한 장으로 돌아볼 수 있습니다.",
  }),
  withKlookLocale(hakoneFreepassTripPrep[1], LOCALE, {
    label: "하코네 호텔 전체",
    ctaLabel: "하코네 호텔 보기 →",
    why: "2일권은 둘째 날 막차까지 유효하므로, 하코네에서 1박하면 이미 결제한 둘째 날도 쓸 수 있습니다.",
  }),
  withKlookLocale(hakoneFreepassTripPrep[2], LOCALE, {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "디지털 프리패스는 휴대폰에 표시하는 QR 코드이고, 로프웨이와 유람선 운행 상황은 타는 날 아침에 휴대폰으로 확인하는 것이 가장 쉽습니다.",
  }),
];

const tourPicks = [
  withKlookLocale(hakoneLoopBusTour, LOCALE, {
    title: "하코네 오와쿠다니·아시노코·하코네 신사 버스 투어",
    desc: "하코네 일주 코스를 가이드가 동행하는 버스 투어로 도는 도쿄 출발 상품으로, 로프웨이와 하코네 해적선이 포함됩니다.",
  }),
  withKlookLocale(hakoneCruiseCableCarTour, LOCALE, {
    title: "하코네 유람선·케이블카·오와쿠다니 당일 투어",
    desc: "아시노코 유람선, 화산 계곡 위를 지나는 로프웨이, 온천 들르기를 도쿄 출발 하루 일정으로 한 번에 예약합니다.",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "하코네 프리패스" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h || `blank-${i}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: r === 0 ? 700 : undefined }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LastChecked({ children, iso = CHECKED_ISO }: { children?: ReactNode; iso?: string }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      최종 확인: {iso} —{" "}
      <a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp(하코네 프리패스)</a>,{" "}
      <a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp(하코네 프리패스)</a>
      {children}
    </p>
  );
}

export default function KoHakoneFreePassPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG.ko }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "하코네 프리패스(Hakone Freepass)",
              description: DESC,
              brand: "Odakyu",
              currency: "JPY",
              lowPrice: 6000,
              highPrice: 7500,
              offerCount: 4,
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel} 업데이트</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            오다큐 공식 요금으로 본 신주쿠·오다와라 출발 하코네 프리패스 가격, 하루만 이용해도 교통비를 아낄 수 있는 일주 코스,
            스마트폰으로 이용하는 디지털 패스, 그리고 패스에 포함되지 않는 로망스카 좌석 요금을 정리합니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "오다큐 공식 요금", "1일권 없음"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>하코네 프리패스</strong>는 <strong>신주쿠 출발 2일권 {PASS_2_DAY_SHINJUKU}, 3일권{" "}
            {PASS_3_DAY_SHINJUKU}</strong>(어른)이고, 오다와라 출발은 {PASS_2_DAY_ODAWARA}과 {PASS_3_DAY_ODAWARA}
            입니다. 오다큐 공식 페이지에서 {CHECKED}에 확인했습니다. 하코네 등산전차, 케이블카, 하코네 로프웨이,
            아시노코 해적선, 하코네의 버스를 이용할 수 있고, 신주쿠 출발 패스에는 오다큐선 왕복 1회가 포함됩니다.
            하코네 나비의 계산으로는 하루 동안 이 일주 코스를 모두 이용하면 <strong>패스 없이 {LOOP_REGULAR}</strong>
            이므로, 신주쿠 출발 패스로 <strong>하루에 {LOOP_SAVING}를 절약</strong>합니다. 어느 패스를 사든 로망스카
            좌석 요금(편도 {ROMANCECAR})은 별도입니다.
          </p>
          <p className={styles.bodyText}>
            이 페이지에서는 하코네 프리패스의 요금, 이용 범위, 구매처를 안내합니다. 정거장별로 하루를
            어떻게 보낼지는{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              도쿄에서 하코네 당일치기(영어)
            </Link>{" "}
            가이드에, 1박을 하며 패스를 이틀 모두 쓰는 방법은{" "}
            <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>
              하코네 2일 일정(영어)
            </Link>
            에 정리했습니다.
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>신주쿠 출발 2일권</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_SHINJUKU}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>오다와라 출발 2일권</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_ODAWARA}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>이용 범위</p>
                <p className={styles.verdictStatValue}>교통수단 8종</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>로망스카</p>
                <p className={styles.verdictStatValue}>+{ROMANCECAR}, 포함 안 됨</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              오다큐의 공식 표기는 <strong>Freepass</strong>이고, 검색할 때는 Hakone Free Pass로 찾는 사람이
              많습니다. 같은 티켓입니다. 1일권은 없고, 온라인(EMot 또는 클룩)으로 사면 역 매표소 줄을 피할 수
              있으며, 신칸센으로 오다와라에 도착한다면 오다와라 출발 패스를 사세요.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                클룩에서 하코네 프리패스 보기 →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                하코네 당일 투어도 비교하기 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>2026년 하코네 프리패스 가격은 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            신주쿠 출발 2일권 어른 {PASS_2_DAY_SHINJUKU}이며, 도쿄를 방문하는 여행객 대부분에게 맞는 패스입니다.
            요금은 출발역에 따라 다르며, 3일권은 2일권보다 ¥400만 더 비쌉니다.
          </p>
          <Table
            head={["출발역", "2일권 어른", "2일권 어린이", "3일권 어른", "3일권 어린이"]}
            rows={priceRows.map((r) => [r.pass, r.d2a, r.d2c, r.d3a, r.d3c])}
          />
          <LastChecked>
            . 어린이 요금은 6~11세(초등학생)이며 6세 미만은 무료입니다. 2025년 10월 1일부터 적용된 요금입니다.
            로망스카 좌석은 별도이며, 하코네유모토까지 신주쿠에서 {ROMANCECAR} / ¥600, 오다와라에서 ¥200 / ¥100입니다.
          </LastChecked>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            신주쿠 출발과 오다와라 출발 중 어느 쪽을 살까요? ¥1,100의 차이는 신주쿠 ⇄ 오다와라 간 오다큐선 왕복 운임에 해당하며,
            두 패스 모두 하코네 안의 교통수단 8종을 똑같이 이용할 수 있습니다. 이 사이트에서 다루는 다른 패스와
            입장권은{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              일본 관광지 입장권 가격표(영어)
            </Link>
            에 함께 정리했습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              클룩에서 하코네 프리패스 확인 →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              하루 일정이라면 가이드가 동행하는 하코네 당일 투어와 비교 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="함께 예약하면 좋은 상품"
          heading="하코네 프리패스와 함께 무엇을 예약할까요?"
          headingLevel={3}
          intro="패스에는 교통편만 포함되며, 관광 일정이나 숙박은 포함되지 않습니다. 하루뿐이고 시간표를 신경 쓰고 싶지 않다면 가이드가 동행하는 하코네 당일 투어로 같은 일주 코스를 한 번에 예약할 수 있고, 이틀이라면 하코네에 숙소를 잡아 이미 결제한 둘째 날까지 쓸 수 있습니다. 디지털 티켓에 필요한 모바일 데이터도 같은 클룩 계정으로 예약할 수 있습니다."
          items={tripPrepItems}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>구매처</span>
          <h2 className={styles.sectionTitle}>하코네 프리패스는 어디서 사나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            오다큐의 EMot 온라인 티켓이나 클룩에서 온라인으로 사거나, 오다큐선 각 역, 세븐일레븐, 하코네 현지에서
            종이 티켓으로 살 수 있습니다. 구매처에 따라 티켓 형태와 살 수 있는 시점이 다릅니다.
          </p>
          <Table
            head={["구매처", "티켓 형태", "구매 시점", "알아 둘 점"]}
            rows={buyRows.map((r) => [r.where, r.ticket, r.when, r.note])}
          />
          <LastChecked iso={BUY_CHECKED_ISO}>. 클룩 관련 항목은 공식 출처가 없으므로 최신 조건은 상품 페이지에서 확인하세요.</LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>이용 가능한 교통수단</span>
          <h2 className={styles.sectionTitle}>하코네 프리패스로 무엇을 탈 수 있나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            하코네 안의 교통수단 8종을 무제한으로 이용할 수 있고, 신주쿠 출발 패스에는 오다큐선 왕복 1회가
            포함됩니다. 로망스카 좌석과 이즈하코네 버스는 포함되지 않습니다.
          </p>
          <Table head={["교통수단", "패스 포함 여부", "내용"]} rows={coverageRows.map((r) => [r.mode, r.included, r.note])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            . 패스가 있으면 하코네의 약 70개 시설에서 할인도 받을 수 있지만, 목록이 바뀌므로 여기에는 금액을 적지
            않았습니다.
          </LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>살 만할까?</span>
          <h2 className={styles.sectionTitle}>하코네 프리패스는 하루만 써도 이득인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            일주 코스의 교통편을 모두 이용한다면 교통비를 절약할 수 있습니다. 오다큐 하코네의 공식 사이트인 하코네 나비는 신주쿠 출발 대표 코스를
            IC 카드 일반 운임 {LOOP_REGULAR}로 계산하므로, {PASS_2_DAY_SHINJUKU} 패스로 당일 저녁에 돌아와도{" "}
            {LOOP_SAVING}를 절약합니다.
          </p>
          <Table head={["구간(어른, 로망스카 제외)", "어른", "어린이", "출처"]} rows={legRows.map((r) => [r.leg, r.adult, r.child, r.source])} />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {CHECKED_ISO} —{" "}
            <a href={LOOP_URL} target="_blank" rel="noopener noreferrer">하코네 나비(일주 합계)</a>,{" "}
            <a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">오다큐 하코네 운임 안내(PDF)</a>,{" "}
            <a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp</a>. 하코네 나비가 총운임 {LOOP_REGULAR}의
            구간별 요금을 공개하지 않아, 등산전차, 케이블카, 버스는 이 표에 개별 운임을 적지 않았습니다. 유람선 특별 선실은
            편도 ¥800 / ¥400이 추가됩니다.
          </p>
          <Table head={["일정", "판단", "이유"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            로프웨이와 유람선은 모두 악천후에 운행 중단되며, 로프웨이는 오와쿠다니에서 갑자기 운행을 멈출 수 있습니다.
            운행 중단으로 이용하지 못한 구간이 있으면 종이 패스는 마지막으로 이용한 역에서 해당 구간을 환불받을 수
            있습니다. 정거장별로 무엇을 보고
            언제 도쿄를 출발할지는{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              도쿄에서 하코네 당일치기(영어)
            </Link>{" "}
            가이드에 정리했고, 이 페이지는 패스 자체를 다룹니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              하코네 프리패스 확인 →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              하코네 당일 투어 비교 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>하코네 프리패스에 로망스카가 포함되나요?</h2>
          <p className={styles.bodyText}>
            포함되지 않습니다. 신주쿠 출발 패스에는 오다큐선 왕복 1회가 포함되지만, 특급 로망스카는 별도 특급권이
            필요합니다. 신주쿠 → 하코네유모토 <strong>편도 어른 {ROMANCECAR}, 어린이 ¥600</strong>입니다.{" "}
            <strong>환승 없이 약 80분</strong>이 걸리며 전 좌석 지정석이고, EMot 온라인 티켓으로 좌석을 예약하면 역에서
            사는 것보다 ¥50 저렴합니다. 오다큐가 제시한 신주쿠 출발 왕복 계산 예시는 패스 {PASS_2_DAY_SHINJUKU}에
            로망스카 왕복 ¥2,400을 더해 모두 ¥9,500입니다. 패스로 탈 수 있는 일반 오다큐 열차는 시간이 더 걸리고,
            대개 오다와라에서 갈아타야 합니다.
          </p>
          <p className={styles.bodyText}>
            하코네와 함께 후지 5호(후지산 주변의 다섯 호수)를 가는 경우도 많지만, 지역도 다르고 이용하는 패스도 다릅니다.{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>
              후지산 당일치기 가이드(영어)
            </Link>
            에서 다룹니다. 긴 여행 중 하코네에서 1박한다면{" "}
            <Link href="/guides/attractions/tokyo-7-day-itinerary" style={linkStyle}>
              도쿄 7일 일정(영어)
            </Link>
            ,{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>
              도쿄 5일 일정(영어)
            </Link>
            ,{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary" style={linkStyle}>
              일본 14일 일정(영어)
            </Link>
            에서 전체 일정에 하코네를 어떻게 넣을지 확인할 수 있고,{" "}
            <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>
              프라이빗 온천이 있는 하코네 료칸(영어)
            </Link>{" "}
            가이드는 하코네유모토부터 아시노코까지 지역별 료칸 10곳과 각 료칸으로 가는 버스나 열차를 정리했습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>JR 패스 이용자</span>
          <h2 className={styles.sectionTitle}>JR 패스와 하코네 프리패스를 함께 쓸 수 있나요?</h2>
          <p className={styles.bodyText}>
            함께 쓸 수 있지만 역할이 다릅니다. 오다큐에 따르면 JR 패스와 JR 도쿄 와이드 패스는 하코네 지역 안에서
            쓸 수 없고, JR 노선으로 오다와라까지 가는 데만 쓸 수 있습니다. 오다와라부터는{" "}
            <strong>오다와라 출발 하코네 프리패스(2일권 {PASS_2_DAY_ODAWARA}, 3일권 {PASS_3_DAY_ODAWARA})</strong>로
            일주 코스 전체를 이용할 수 있고, 이용하지 않는 오다큐선 운임은 제외됩니다. 돌아갈 때 로망스카로 신주쿠까지
            간다면 특급권과 오다와라 ⇄ 신주쿠 기본 운임이 추가로 필요합니다. 도쿄 여행에서 JR 패스가 이득인지는{" "}
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR 패스 가이드(영어)
            </Link>
            와{" "}
            <Link href="/guides/transport/tokyo-wide-pass" style={linkStyle}>
              JR 도쿄 와이드 패스 가이드(영어)
            </Link>
            에서 확인하세요.
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {CHECKED_ISO} —{" "}
            <a href={JR_URL} target="_blank" rel="noopener noreferrer">오다큐 하코네 프리패스 FAQ</a>,{" "}
            <a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp(하코네 프리패스)</a>.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>티켓 형태</span>
          <h2 className={styles.sectionTitle}>디지털 패스와 종이 패스 중 어떤 것을 사야 할까요?</h2>
          <Table head={["", "디지털(EMot)", "종이"]} rows={formatRows.map((r) => [r.item, r.digital, r.paper])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            . 일행이 함께 다니며 휴대폰 1대에 담는다면 디지털, 어린이가 키즈폰을 쓰거나 스마트폰 배터리가
            걱정된다면 종이 패스를 고르세요. 유효 기간은 시간이 아니라 날짜 단위로 계산됩니다. 2일권은 48시간 뒤가 아니라 구매 다음 날 막차까지
            유효합니다.
          </LastChecked>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="하코네 프리패스 자주 묻는 질문" />

        <KlookTourPicks
          heading="하루뿐이라면"
          intro="직접 일주 코스를 돈다면 프리패스가 맞습니다. 시간표를 신경 쓰지 않고 도쿄에서 하루만 다녀오려면, 같은 일주 코스를 가이드가 동행하는 버스 투어로 도는 아래 상품이 있습니다. 버스 한 대로 정해진 시간에 출발해 당일 저녁 도쿄로 돌아옵니다. 날짜별 현재 가격은 상품 페이지에서 확인하세요."
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/hakone-ryokan-private-onsen", title: "프라이빗 온천이 있는 하코네 료칸: 지역별 10곳(2026)(영어)" },
            { href: "/guides/transport/jr-pass-guide", title: "JR 패스 가격 2026: 최신 요금과 구매할 가치가 있는지(영어)" },
            { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "도쿄에서 하코네 당일치기(2026): 프리패스와 당일 투어 비교(영어)" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "도쿄에서 후지산 당일치기(2026): 직접 가는 방법(영어)" },
            { href: "/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "도쿄 출발 후지산 당일 투어(2026): 투어별 관광 명소(영어)" },
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "도쿄에서 가와구치코 당일치기(2026): 경로, 요금, 하루 일정(영어)" },
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "도쿄 5일 일정(2026): 날짜별 코스(영어)" },
            { href: "/guides/attractions/japan-14-day-itinerary", title: "일본 14일 일정(2026): 2주 일자별 코스(영어)" },
            { href: "/guides/transport/shinkansen-guide", title: "신칸센 가이드 2026: 티켓, 패스, 처음 타는 사람을 위한 팁(영어)" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "일본 관광지 입장권 가격 2026: 공식 요금과 예약 규칙(영어)" },
            { href: "/guides/attractions", title: "일본에서 즐길 거리 더 보기(영어) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>티켓 한 장으로 하코네 일주 코스 전체 이용</h2>
            <p className={styles.ctaBannerDesc}>
              교통수단 8종을 2일 또는 3일 동안 이용할 수 있고, 클룩에서는 해외 발급 카드로 결제할 수 있습니다.
              하루뿐이고 시간표를 신경 쓰고 싶지 않다면, 같은 일주 코스를 도는, 가이드가 동행하는 버스 투어가 더 낫습니다.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                하코네 프리패스 보기 →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                하코네 당일 투어 보기 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
