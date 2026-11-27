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
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import {
  jrHarukaUrl,
  jrKansaiAreaPass3276,
  jrKansaiMiniPass,
  kansaiAreaPassSameDayCards,
  kansaiAreaPassSameDayPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/kansai-area-pass) section by section as of
// 2026-11-25 (task-jtk-20261125-TR02): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added.
// Title term: JR 간사이 패스 — JR West's own Korean name for the pass ("WEST QR간사이 패스" on
// westjr.co.jp/global/kr/ticket/westqr/kansaiarea/) and the name Korean results use.
// 2026-11-27 (task-jtk-20261127-R18): aligned with the English R18 rewrite — itinerary and
// ordinary-fare tables, coverage H2 (Shinkansen / Haruka / subway), KANSAI ONE PASS FAQ,
// same-day cards under the main CTA, Klook pass listing 1107 → 3276. Same numbers as English.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/kansai-area-pass";
const TITLE = "JR 간사이 패스 2026: 가격, 하루카, 와이드 패스 비교";
const H1 = "JR 간사이 패스 2026: 가격과 간사이 와이드 패스 비교";
const DESC =
  "JR 간사이 패스 2026: 1일 ¥2,700~4일 ¥6,700. 간사이 공항→교토+나라는 편도 합계 ¥4,140. 하루카 포함, 신칸센 제외.";

const CHECKED_ISO = "2026-11-27";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const R04_CHECKED = dateLabel("2026-11-13", LOCALE);
const PREV_CHECKED = dateLabel("2026-11-03", LOCALE);
const OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/";
const HARUKA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/haruka/";
const WIDE_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/pass/kansai_wide/";
const ICOCA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/howto/icoca/";
const FARE_PDF_URL = "https://www.westjr.co.jp/press/article/items/240515_00_press_keihanshin_unchin.pdf";
const HIMEJI_FARE_URL = "https://www.westjr.co.jp/press/article/items/260225_00_press_JRWESTQR2daypass_1.pdf";
const KOP_NOTICE_URL = "https://www.hanshin.co.jp/press/docs/20241223-toshikotsu-wanpasssyuryo2.pdf";

const KANSAI_PASS_URL = klookFor(jrKansaiAreaPass3276.url, LOCALE);
const HARUKA_URL = klookFor(jrHarukaUrl, LOCALE);

const QR_1_DAY = "¥2,700";
const QR_4_DAY = "¥6,700";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const vsWideRows = [
  {
    option: "결론",
    area: "JR로 교토, 오사카, 나라, 고베, 히메지, 간사이 공항 → 간사이 패스",
    shinkansen: "오카야마까지 신칸센, 또는 기노사키 온천, 아마노하시다테, 시라하마 → 와이드 패스",
    price: "한 도시 안에서 지하철로 이동 → ICOCA",
    who: "",
  },
  {
    option: "JR 서일본 간사이 패스(WEST QR)",
    area: "교토, 오사카, 나라, 고베, 히메지, 와카야마, 오쓰, 쓰루가, 이가우에노 일대의 JR 서일본 일반 열차. 하루카 자유석 무제한, 지정석 2회",
    shinkansen: "✗ 신칸센 불가. 하루카 외 특급 불가",
    price: "¥2,700(1일), ¥4,700(2일), ¥5,500(3일), ¥6,700(4일), 성인",
    who: "간사이 공항에서 시작하거나 끝나는 1~4일 간사이 여행",
  },
  {
    option: "JR 서일본 간사이 와이드 패스",
    area: "간사이 패스의 범위에 오카야마, 다카마쓰, 기노사키 온천, 아마노하시다테, 돗토리, 시라하마 추가. 하루카, 구로시오, 고노토리, 슈퍼 하쿠토 등 지정석",
    shinkansen: "✓ 산요 신칸센 지정석, 신오사카 ⇔ 오카야마만(도쿄행 도카이도 신칸센 불가)",
    price: "연속 5일 ¥12,000, 성인(어린이 ¥6,000)",
    who: "히메지보다 먼 곳으로 당일치기를 1회 이상 하는 5일 일정",
  },
  {
    option: "ICOCA(JR 서일본 IC 카드)",
    area: "일본 전국 IC 카드 이용 구역의 철도와 버스(JR, 지하철, 사철, 버스)에서 탈 때마다 결제",
    shinkansen: "패스가 아님: 운임을 잔액에서 차감",
    price: "방문객 디자인 ICOCA ¥2,000(보증금 ¥500 포함, 간사이공항역 JR 매표소)",
    who: "한 도시 체류, 지하철과 사철 이용일, 패스와 함께 쓸 잔액",
  },
];

const priceRows = [
  { days: "1일", qrAdult: QR_1_DAY, qrChild: "¥1,350", perDay: "¥2,700", oldAdult: "¥2,800" },
  { days: "2일", qrAdult: "¥4,700", qrChild: "¥2,350", perDay: "¥2,350", oldAdult: "¥4,800" },
  { days: "3일", qrAdult: "¥5,500", qrChild: "¥2,750", perDay: "¥1,833", oldAdult: "¥5,800" },
  { days: "4일", qrAdult: QR_4_DAY, qrChild: "¥3,350", perDay: "¥1,675", oldAdult: "¥7,000" },
];

const breakEvenRows = [
  { trip: "간사이 공항 → 교토, 1일", singles: "¥2,700", pass: `${QR_1_DAY}(1일권)`, result: "같은 가격이며, 그날 다른 JR 이용은 모두 추가 요금 없음" },
  { trip: "간사이 공항 → 고베, 1일", singles: "¥2,300", pass: `${QR_1_DAY}(1일권)`, result: "그날 다른 JR을 ¥400어치 더 타야 이득" },
  { trip: "간사이 공항 → 나라, 1일", singles: "¥2,200", pass: `${QR_1_DAY}(1일권)`, result: "그날 다른 JR을 ¥500어치 더 타야 이득" },
  { trip: "간사이 공항 → 오사카 / 신오사카, 1일", singles: "¥1,900", pass: `${QR_1_DAY}(1일권)`, result: "그날 다른 JR을 ¥800어치 더 타야 이득" },
  { trip: "간사이 공항 → 덴노지만", singles: "¥1,600", pass: `${QR_1_DAY}(1일권)`, result: "편도 티켓이 ¥1,100 저렴하므로 패스는 사지 않음" },
  { trip: "교토 도착, 교토 출발, 2일 체류", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: "¥4,700(2일권)", result: "다른 열차를 타지 않아도 패스가 ¥700 저렴" },
  { trip: "교토 도착, 오사카 출발, 3일", singles: "¥2,700 + ¥1,900 = ¥4,600", pass: "¥5,500(3일권)", result: "3일 동안 다른 JR을 ¥900어치 더 타야 이득" },
  { trip: "교토 도착, 교토 출발, 4일", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: `${QR_4_DAY}(4일권)`, result: "4일 동안 다른 JR을 ¥1,300어치 더 타야 이득" },
];

// R18: JR West ordinary adult fares (sources as in the English page header).
const fareRows = [
  { route: "간사이 공항 → 교토(하루카 편도 티켓)", fare: "¥2,700", onPass: "✓ 하루카 자유석 또는 지정석 2회 중 1회" },
  { route: "간사이 공항 → 오사카 / 신오사카(하루카 편도 티켓)", fare: "¥1,900", onPass: "✓ 하루카(신오사카) 또는 간사이 공항 쾌속" },
  { route: "오사카 ↔ 교토(JR 교토선 신쾌속)", fare: "¥580", onPass: "✓ 신쾌속, ✗ 신오사카–교토 신칸센" },
  { route: "교토 ↔ 나라(JR 나라선)", fare: "¥720", onPass: "✓" },
  { route: "덴노지 ↔ 나라(JR 야마토지선)", fare: "¥510", onPass: "✓" },
  { route: "오사카 ↔ 산노미야, 고베(JR 고베선)", fare: "¥420", onPass: "✓" },
  { route: "오사카 ↔ 히메지(JR 고베선 신쾌속)", fare: "¥1,460", onPass: "✓ 신쾌속, ✗ 신오사카–히메지 신칸센" },
];

// R18: itineraries priced as singles vs the pass (lead row = verdict).
const itineraryRows = [
  { plan: "1일차: 간사이 공항 → 교토, 교토 ↔ 나라 왕복", singles: "¥2,700 + ¥720 + ¥720 = ¥4,140", pass: "¥2,700(1일권)", result: "✓ 패스가 ¥1,440 저렴" },
  { plan: "오사카 ↔ 히메지 당일치기", singles: "¥1,460 × 2 = ¥2,920", pass: "¥2,700(1일권)", result: "✓ 패스가 ¥220 저렴" },
  { plan: "오사카 ↔ 교토 당일치기만", singles: "¥580 × 2 = ¥1,160", pass: "¥2,700(1일권)", result: "✗ 편도가 ¥1,540 저렴" },
  { plan: "덴노지 ↔ 나라 당일치기만", singles: "¥510 × 2 = ¥1,020", pass: "¥2,700(1일권)", result: "✗ 편도가 ¥1,680 저렴" },
  { plan: "3일: 간사이 공항 → 교토, 교토 ↔ 나라, 교토 → 오사카 → 간사이 공항", singles: "¥2,700 + ¥1,440 + ¥580 + ¥1,900 = ¥6,620", pass: "¥5,500(3일권)", result: "✓ 패스가 ¥1,120 저렴" },
  { plan: "4일: 위 3일 일정 + 3일차에 오사카 ↔ 히메지", singles: "¥6,620 + ¥2,920 = ¥9,540", pass: `${QR_4_DAY}(4일권)`, result: "✓ 패스가 ¥2,840 저렴" },
  { plan: "2일, 오사카만: 간사이 공항 → 오사카, 오사카 → 간사이 공항", singles: "¥1,900 × 2 = ¥3,800", pass: "¥4,700(2일권)", result: "✗ 편도가 ¥900 저렴" },
];

const LINE_LEAD = "JR 서일본 일반 열차와 하루카만 이용 가능. 신칸센, 다른 특급, 지하철, 버스, 사철은 불가.";

const lineRows = [
  {
    service: "JR 교토선 / 고베선 신쾌속",
    allowed: "✓ 무제한",
    note: "교토–오사카–산노미야–히메지를 잇는 빠른 JR 열차의 일반 좌석입니다. 유료 A-Seat 차량은 추가 요금이 필요합니다.",
  },
  {
    service: "JR 나라선, 야마토지선",
    allowed: "✓ 무제한",
    note: "나라선은 교토–이나리(후시미 이나리)–나라, 야마토지선은 덴노지 / JR 난바–나라 구간입니다.",
  },
  {
    service: "간사이 공항선 쾌속",
    allowed: "✓ 무제한",
    note: "덴노지를 거쳐 오사카까지 가는 느린 JR 공항 열차입니다. 하루카 시간이 맞지 않을 때의 선택지입니다.",
  },
  {
    service: "간사이 공항 특급 하루카, 자유석",
    allowed: "✓ 무제한",
    note: "간사이 공항에서 덴노지, 신오사카, 교토까지 가는 공항 열차입니다. 이 패스를 사는 가장 큰 이유입니다.",
  },
  {
    service: "간사이 공항 특급 하루카, 보통차 지정석",
    allowed: "✓ 2회",
    note: "지정석 2회가 추가 요금 없이 포함됩니다. 승차 30일 전부터 WEST-QR 웹사이트에서 예약합니다. JR 서일본은 열차 안, 발매기, 매표소에서는 예약할 수 없다고 안내합니다.",
  },
  {
    service: "하루카 그린차(1등석)",
    allowed: "✗ 포함 안 됨",
    note: "별도 티켓이 필요합니다. 패스로는 보통차만 이용할 수 있습니다.",
  },
  {
    service: "JR 서일본 신쾌속, 쾌속, 보통 열차",
    allowed: "✓ 무제한",
    note: "이용 구역 안의 일반 노선망입니다. 오사카–교토, 오사카–고베, 오사카–나라, 오사카–히메지 등입니다.",
  },
  {
    service: "신칸센(도카이도, 산요)",
    allowed: "✗ 불가",
    note: "구간에 관계없이 이용할 수 없습니다. 신오사카에서 교토까지 신칸센을 타려면 패스 유효일에도 별도 티켓이 필요합니다.",
  },
  {
    service: "그 밖의 특급 열차",
    allowed: "✗ 포함 안 됨",
    note: "패스로 탈 수 있는 특급은 하루카뿐입니다. 썬더버드, 구로시오 등은 별도 티켓이 필요합니다.",
  },
  {
    service: "사철: 한큐, 게이한, 긴테쓰, 난카이",
    allowed: "✗ 포함 안 됨",
    note: "JR 서일본의 티켓이므로 사철에는 쓸 수 없습니다. JR 서일본의 구 패스 페이지도 게이한과 한큐 이용권을 별도 바우처로만 판매합니다. 교토와 오사카에서 관광하기 편한 노선은 JR이 아니라 이런 사철인 경우가 많습니다.",
  },
  {
    service: "오사카 메트로, 교토 지하철, 시내버스",
    allowed: "✗ 포함 안 됨",
    note: "지하철과 시내버스는 이용할 수 없습니다. 두 도시 안에서는 IC 카드나 도시 패스가 따로 필요합니다.",
  },
  {
    service: "JR 열차의 유료 좌석(A-Seat), 보통 열차 그린차",
    allowed: "✗ 추가 요금",
    note: "신쾌속, 쾌속, 보통 열차의 일반 좌석은 이용할 수 있지만, 유료 A-Seat와 그린차는 추가 요금이 필요합니다.",
  },
];

const compareRows = [
  {
    option: "결론",
    price: "—",
    covers: "JR과 하루카를 쓰는 간사이 여행 → 간사이 패스. 긴테쓰로 나라 → 긴테쓰 레일 패스. 같은 여행에 히로시마 → 간사이 히로시마 패스",
    pick: "KANSAI ONE PASS는 IC 카드이며 패스를 대신하지 않습니다",
  },
  {
    option: "WEST QR 간사이 패스",
    price: `${QR_1_DAY}(1일)~${QR_4_DAY}(4일), 성인`,
    covers: "오사카, 교토, 고베, 나라, 히메지, 와카야마, 오쓰, 쓰루가, 이가우에노 일대의 JR 서일본 일반 열차, 하루카 자유석 무제한과 지정석 2회",
    pick: "간사이 공항에서 시작하거나 끝나는 간사이 여행의 기본 선택",
  },
  {
    option: "간사이 미니 패스",
    price: "연속 3일 ¥3,000, 성인(어린이 ¥1,500)",
    covers: "JR 서일본 쾌속, 보통 열차와 간사이 공항 쾌속. 하루카는 별도 특급권 필요",
    pick: "공항 구간을 하루카 대신 느린 쾌속으로 간다면 가장 저렴",
  },
  {
    option: "하루카 편도 티켓(HARUKA One-way Ticket)",
    price: "간사이 공항에서 덴노지 ¥1,600, 오사카 / 신오사카 ¥1,900, 고베 ¥2,300, 나라 ¥2,200, 교토 ¥2,700",
    covers: "공항 구간 1회만. 이후 도시 간 이동은 포함 안 됨",
    pick: "여행 전체에서 JR을 공항 구간에만 탄다면",
  },
  {
    option: "긴테쓰 레일 패스(KINTETSU RAIL PASS)",
    price: "¥1,900(1일), ¥3,700(2일), ¥4,900(5일), ¥6,700(5일 플러스)",
    covers: "긴테쓰 노선만. 오사카난바에서 긴테쓰나라, 교토까지, 5일권은 이세시마와 나고야까지. JR과 하루카는 불가",
    pick: "나라 공원이 주요 당일치기이고 숙소가 난바 근처라면(난바에서 나라까지는 JR이 아니라 긴테쓰가 운행)",
  },
  {
    option: "간사이 히로시마 패스",
    price: "연속 5일 ¥17,000, 성인(어린이 ¥8,500)",
    covers: "간사이의 JR 서일본, 산요 신칸센 지정석 신오사카 ⇄ 히로시마, 하루카를 포함한 특급, JR 미야지마 페리",
    pick: "같은 여행에 히로시마와 미야지마가 있다면. 간사이 패스로는 신칸센을 전혀 탈 수 없습니다",
  },
  {
    option: "KANSAI ONE PASS",
    price: "패스 가격이 아님. 탈 때마다 결제하는 충전식 IC 카드",
    covers: "JR, 사철, 지하철, 버스에서 탈 때마다 결제. 2027년 3월까지 판매 종료 예정",
    pick: "철도 패스를 대신하지 않습니다. 탈 때마다 결제한다면 ICOCA 등 어떤 IC 카드든 같은 역할을 합니다",
  },
  {
    option: "간사이 와이드 패스",
    price: "연속 5일 ¥12,000, 성인(어린이 ¥6,000)",
    covers: "위 범위에 산요 신칸센 지정석 신오사카 ⇄ 오카야마, 다카마쓰, 기노사키 온천, 아마노하시다테, 돗토리, 시라하마 추가",
    pick: "히메지보다 멀리 간다면. 간사이 밖으로 당일치기를 하면 답이 달라집니다",
  },
  {
    option: "오사카 주유패스(OSAKA AMAZING PASS)",
    price: `1일권 ¥3,500, 2일권 ¥5,000(${PREV_CHECKED} 확인)`,
    covers: "오사카 노선도 안의 버스와 열차 무료 탑승, 지정 관광지 입장. 지역 철도 패스가 아니라 도시 패스",
    pick: "오사카 안에서 보내는 하루용. 간사이 패스의 공항 구간이나 교토, 나라 이동을 대신하지 않습니다",
  },
  {
    option: "JR 패스(전국, 2026년 10월 1일 개정 후)",
    price: `7일, 보통차: 공식 웹사이트 ¥50,000, 해외 여행사 교환권 ¥53,000(${PREV_CHECKED} 확인)`,
    covers: "대부분의 신칸센을 포함한 전국 JR. 간사이보다 훨씬 넓고, 가격은 간사이 패스 4일권의 7배 이상",
    pick: "도쿄가 일정에 들어갈 때만. 손익분기는 JR 패스 가이드에서 확인하세요",
  },
];

const worthRows = [
  {
    plan: "간사이 공항에 도착해 바로 교토로 이동",
    verdict: "✓ 1일권 구매",
    why: "2026년 11월 1일 이후 판매분의 하루카 편도 티켓(교토)은 ¥2,700으로 1일권과 같은 가격입니다. 패스에 추가 비용이 들지 않고, 같은 날 타는 다른 JR도 모두 추가 요금이 없습니다.",
  },
  {
    plan: "오사카, 교토, 나라, 고베를 JR로 오가는 3~4일",
    verdict: "✓ 3일권 또는 4일권 구매",
    why: `4일 동안 ${QR_4_DAY}로 공항 왕복과 도시 간 이동을 모두 이용할 수 있습니다. 하루카 편도로 교토 도착 ¥2,700, 오사카 출발 ¥1,900만 해도 ¥6,700 중 ¥4,600이므로, 나머지 ¥2,100만 더 타면 됩니다.`,
  },
  {
    plan: "한 도시에 머물며 도보, 지하철, 버스로 관광",
    verdict: "✗ 구매하지 않음",
    why: "오사카 메트로, 교토 지하철, 시내버스는 모두 이용할 수 없습니다. 한 도시 안에서 지낸다면 IC 카드와 도시 패스를 함께 쓰는 편이 저렴하고, 패스는 공항 구간만 겹칩니다.",
  },
  {
    plan: "한큐, 게이한, 긴테쓰로 교토 사찰 순례",
    verdict: "✗ 맞지 않는 패스",
    why: "후시미 이나리, 아라시야마, 나라는 JR과 사철이 모두 다니며, 패스로 탈 수 있는 것은 JR역(이나리, 사가아라시야마, JR 나라)뿐입니다. JR 상품을 사기 전에 가려는 역이 어느 회사 노선인지 확인하세요.",
  },
  {
    plan: "같은 여행에 도쿄 또는 신칸센 구간",
    verdict: "✗ 이 패스는 아님",
    why: "신칸센은 구간에 관계없이 이용할 수 없고, 이용 구역은 도쿄에 한참 못 미칩니다. 전국 JR 패스의 가격을 확인하거나, 신칸센 구간을 따로 사고 간사이에 있는 날에만 간사이 패스를 쓰세요.",
  },
  {
    plan: "일본 여권 소지자 또는 일본 거주자",
    verdict: "✗ 구매 대상 아님",
    why: "JR 서일본은 외국 정부가 발급한 여권으로 '단기 체재' 자격으로 입국하는 사람에게만 판매합니다. 일본 국적자는 이용할 수 없고, 일본 영주권이 있는 외국인도 이용할 수 없습니다.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "JR 간사이 패스는 얼마인가요?",
    a: `성인 기준 연속 1일 ${QR_1_DAY}, 2일 ¥4,700, 3일 ¥5,500, 4일 ${QR_4_DAY}이고, 6~11세 어린이는 절반(¥1,350 / ¥2,350 / ¥2,750 / ¥3,350)입니다. 현재 판매 중인 JR 서일본 WEST QR 간사이 패스의 가격입니다. 종이로 된 구 간사이 패스(¥2,800 / ¥4,800 / ¥5,800 / ¥7,000)는 2026년 9월 30일에 판매가 끝났습니다. westjr.co.jp에서 ${CHECKED}에 확인했습니다.`,
  },
  {
    q: "간사이 패스와 간사이 와이드 패스 중 어느 쪽이 좋나요?",
    a: `처음 가는 간사이 여행이라면 대부분 간사이 패스가 맞고, 히메지보다 멀리 갈 때만 간사이 와이드 패스가 맞습니다. 간사이 패스는 1~4일 ${QR_1_DAY}~${QR_4_DAY}이며 신칸센은 이용할 수 없습니다. 와이드 패스는 연속 5일 ¥12,000이며, 신오사카와 오카야마 사이의 산요 신칸센 지정석과 기노사키 온천, 아마노하시다테, 돗토리, 시라하마, 다카마쓰가 추가됩니다. 교토, 오사카, 나라, 고베, 히메지만 간다면 간사이 패스 4일권(${QR_4_DAY})이 ¥5,300 저렴합니다. 두 패스 모두 westjr.co.jp에서 ${CHECKED}에 확인했습니다.`,
  },
  {
    q: "KANSAI ONE PASS는 판매가 끝났나요?",
    a: `네. 철도 패스가 아니라 충전식 IC 카드인 KANSAI ONE PASS는 2025년 11월 1일부터 재고가 떨어진 회사부터 차례로 판매가 끝났고, 2026 회계연도 말(2027년 3월)까지 모든 판매가 종료될 예정입니다. JR 서일본 등 10개 회사·국의 2024년 12월 23일 공동 공지에 따른 내용입니다. 이미 산 카드는 IC 카드로 계속 쓸 수 있고, 상점과 관광지 혜택은 2026 회계연도로 끝납니다. 공지에 후속 카드는 나와 있지 않습니다. ${CHECKED} 확인.`,
  },
  {
    q: "교토와 오사카 여행에 간사이 패스를 사는 게 이득인가요?",
    a: `간사이 공항에 도착해 도시 사이를 JR로 이동한다면 이득이고, 오사카–교토 왕복 하나뿐이라면 이득이 없습니다. JR 서일본 운임으로 간사이 공항–교토 하루카 편도(¥2,700)와 교토–나라 왕복(¥1,440)을 더하면 ¥4,140이고 1일권은 ¥2,700입니다. 간사이 공항 → 교토 → 나라 → 오사카 → 간사이 공항 3일 일정은 편도 합계 ¥6,620, 3일권은 ¥5,500입니다. 오사카–교토 왕복은 ¥1,160(편도 ¥580)이므로 그것만으로는 ¥2,700의 1일권을 살 이유가 없습니다. 오사카 메트로, 교토 지하철, 시내버스, 긴테쓰, 한큐, 게이한, 난카이 노선에는 쓸 수 없습니다. 운임은 westjr.co.jp에서 ${CHECKED}에 확인했습니다.`,
  },
  {
    q: "간사이 패스로 신칸센, 하루카, 지하철을 탈 수 있나요?",
    a: `하루카는 탈 수 있지만 신칸센과 지하철은 탈 수 없습니다. JR 서일본은 WEST QR 간사이 패스로 하루카 자유석을 무제한, 지정석을 2회 이용할 수 있고, "추가 요금을 내더라도 신칸센에는 이용할 수 없다"고 안내합니다. 오사카 메트로, 교토 지하철, 시내버스, 사철은 JR 서일본이 아니므로 이용할 수 없습니다. 신칸센 구간이 포함된 간사이 패스로는 간사이 와이드 패스(¥12,000, 5일)에 산요 신칸센 지정석 신오사카 ⇔ 오카야마가, 간사이 히로시마 패스(¥17,000, 5일)에 신오사카 ⇔ 히로시마가 포함됩니다. ${CHECKED} 확인(간사이 히로시마 패스는 ${R04_CHECKED}).`,
  },
];

const tripPrepItems = [
  withKlookLocale(kansaiAreaPassSameDayPrep[0], LOCALE, {
    label: "교토·나라 당일 투어(기요미즈데라, 후시미 이나리, 나라 공원)",
    ctaLabel: "교토·나라 당일 투어 보기 →",
    why: "패스로 교토와 나라까지 JR은 탈 수 있지만, 게이한이나 긴테쓰는 탈 수 없습니다. 버스 투어 하나로 세 곳을 모두 예약할 수 있습니다.",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[1], LOCALE, {
    label: "오사카 출발 히메지성 그룹 버스 투어",
    ctaLabel: "히메지 당일 투어 보기 →",
    why: "히메지는 JR로 패스 이용 구역 안에 있지만, 히메지성 일정을 직접 짜고 싶지 않다면 오사카 출발 그룹 버스 투어가 대안입니다.",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[2], LOCALE, {
    label: "JR 하루카 공항 특급 티켓(간사이 공항)",
    ctaLabel: "하루카 티켓 보기 →",
    why: "공항 구간이 패스 유효일 밖이거나 JR을 공항 구간에만 탄다면, 패스와 비교할 간사이 공항 티켓은 하루카 편도입니다.",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[3], LOCALE, {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "WEST QR 패스는 휴대폰에 표시하는 QR 코드입니다. 'Use ticket(티켓 사용)' 버튼을 누르는 것과 하루카 지정석 2회 예약 모두 온라인으로 하므로, 도착한 순간부터 모바일 데이터가 필요합니다.",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[4], LOCALE, {
    label: "우메다 / 오사카역 주변 호텔",
    ctaLabel: "오사카역 주변 호텔 보기 →",
    why: "오사카역은 교토, 고베, 히메지로 가는 신쾌속의 JR 서일본 거점입니다. 여러 날 패스는 이런 도시 간 이동을 많이 할수록 이득입니다.",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[5], LOCALE, {
    label: "교토역 주변 호텔",
    ctaLabel: "교토역 주변 호텔 보기 →",
    why: "교토역은 간사이 공항에서 오는 하루카의 종착역이므로, 이곳에 묵으면 패스로 타는 공항 구간을 갈아타지 않고 이동할 수 있습니다.",
  }),
];

// R18: three same-day cards under the main CTA (6.5% tour, 6.5% hotel, 20% eSIM).
const sameDayCards = [
  withKlookLocale(kansaiAreaPassSameDayCards[0], LOCALE, {
    kind: "당일 투어",
    label: "교토·나라 당일 투어(기요미즈데라, 후시미 이나리, 나라 공원)",
    ctaLabel: "교토·나라 당일 투어 보기 →",
    why: "가이드 동행 버스 투어로 교토와 나라 공원을 한 번에 예약할 수 있고, JR 패스로 해결되지 않는 관광지 사이의 버스·도보 구간도 포함됩니다.",
  }),
  withKlookLocale(kansaiAreaPassSameDayCards[1], LOCALE, {
    kind: "호텔",
    label: "교토역 주변 호텔",
    ctaLabel: "교토역 주변 호텔 보기 →",
    why: "교토역은 하루카의 종착역이자 JR 나라선의 출발역이므로, 패스로 가장 많이 타는 두 구간이 숙소 앞에서 시작됩니다.",
  }),
  withKlookLocale(kansaiAreaPassSameDayCards[2], LOCALE, {
    kind: "eSIM",
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "WEST QR 패스는 휴대폰의 QR 코드입니다. 'Use ticket(티켓 사용)'과 하루카 지정석 2회 예약 모두 도착 직후부터 데이터가 필요합니다.",
  }),
];
// The lower trip-prep block drops the three cards above so nothing is listed twice.
const lowerPrep = tripPrepItems.filter((p) => !sameDayCards.some((c) => c.url === p.url));

const tourPicks = [
  withKlookLocale(jrKansaiAreaPass3276, LOCALE, {
    title: "JR 서일본 간사이 패스(1~4일)",
    desc: "클룩에서 판매하는 간사이 패스입니다. 오사카, 교토, 고베, 나라, 히메지 일대의 JR 서일본 보통, 쾌속, 신쾌속 열차와 간사이 공항 하루카를 이용할 수 있습니다.",
  }),
  withKlookLocale(jrKansaiMiniPass, LOCALE, {
    title: "JR 간사이 미니 패스(3일)",
    desc: "하루카를 타지 않는 여행자를 위한 더 저렴한 3일권입니다. JR 서일본 쾌속, 보통 열차와 간사이 공항 쾌속만 이용할 수 있습니다.",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "JR 간사이 패스" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows, lead }: { head: string[]; rows: ReactNode[][]; lead?: { label: string; text: ReactNode } }) {
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
            {lead && (
              <tr>
                <td className={styles.tdProvider} style={{ fontWeight: 700 }}>{lead.label}</td>
                <td className={styles.tdPrice} colSpan={head.length - 1} style={{ fontSize: "0.88rem" }}>{lead.text}</td>
              </tr>
            )}
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? undefined : { fontSize: "0.88rem" }}
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

export default function KoKansaiAreaPassPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);
  const [vsLead, ...vsRest] = vsWideRows;
  const [cmpLead, ...cmpRest] = compareRows;

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
              name: "WEST QR 간사이 패스(Kansai Area Pass)",
              description: DESC,
              brand: "JR West",
              currency: "JPY",
              lowPrice: 2700,
              highPrice: 6700,
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
            1일권과 3일권 가격, 간사이 공항 하루카 이용 범위, 그리고 간사이 와이드 패스나 ICOCA가 더 나은 경우를
            정리합니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "JR 서일본 공식 요금", "간사이 와이드 패스 비교"].map((t) => (
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
            <strong>JR 서일본 간사이 패스</strong>는 성인 기준 <strong>1일 {QR_1_DAY}, 2일 ¥4,700, 3일 ¥5,500, 4일{" "}
            {QR_4_DAY}</strong>이고 6~11세 어린이는 절반입니다. JR 서일본의 공식 WEST QR 페이지에서 {CHECKED}에
            확인했으며, 해외 여행사에서만 판매하므로 일본 국내 가격은 따로 없습니다. 1일권은 간사이 공항–교토 하루카
            편도 티켓과 같은 {QR_1_DAY}이고, 같은 날 교토–나라 왕복(편도 ¥720)을 더하면 편도 티켓보다 ¥1,440
            저렴합니다. <strong>교토, 오사카, 나라, 고베, 간사이 공항</strong> 사이의 JR 서일본 열차를 탈 수 있고,
            공항 특급 <strong>하루카</strong> 자유석도 무제한이지만, 신칸센과 긴테쓰, 한큐, 게이한, 난카이 노선은
            이용할 수 없습니다. 히메지를 넘어 오카야마, 기노사키 온천, 아마노하시다테까지 갈 때만{" "}
            <strong>간사이 와이드 패스</strong>(5일 ¥12,000)를, 한 도시 안에서 지하철로만 다닌다면 두 패스 대신{" "}
            <strong>ICOCA</strong> 카드를 고르세요.
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1일권</p>
                <p className={styles.verdictStatValue}>{QR_1_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>4일권</p>
                <p className={styles.verdictStatValue}>{QR_4_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>하루카</p>
                <p className={styles.verdictStatValue}>포함(지정석 2회)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>신칸센</p>
                <p className={styles.verdictStatValue}>포함 안 됨</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>JR 서일본 간사이 패스</strong>는 성인 <strong>1일 {QR_1_DAY}</strong>, 2일 ¥4,700, 3일 ¥5,500,{" "}
              <strong>4일 {QR_4_DAY}</strong>입니다(6~11세 어린이는 절반. JR 서일본 WEST QR 간사이 패스, westjr.co.jp에서{" "}
              {CHECKED} 확인). <strong>간사이 공항과 덴노지, 신오사카, 교토 사이의 하루카</strong> 자유석(지정석 2회
              포함)과 오사카, 교토, 고베, 나라, 히메지 일대의 JR 서일본 신쾌속, 쾌속, 보통 열차를 무제한으로 탈 수
              있습니다. 신칸센, 그 밖의 특급, 오사카 메트로와 교토 지하철, 시내버스, 사철(한큐, 게이한, 긴테쓰,
              난카이)은 <strong>이용할 수 없습니다</strong>. <strong>간사이 공항에 도착해 교토로 가는 날</strong>에
              가장 이득입니다. 교토행 하루카 편도도 ¥2,700이므로 1일권 가격이 같고, 그날 다른 JR은 모두 추가 요금이
              없습니다. 종이 패스는 2026년 9월 30일에 판매가 끝났습니다. 산노미야까지는 패스로 갈 수 있어{" "}
              <Link href="/guides/attractions/arima-onsen-day-trip" style={linkStyle}>
                아리마 온천 당일치기(영어)
              </Link>
              에도 쓸 수 있지만, 산노미야에서 온천까지 가는 버스나 고베 지하철은 이용할 수 없습니다.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                클룩에서 간사이 패스 보기 →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                대신 하루카 편도 티켓 보기 →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* R18: the 6.5% tour and hotel and the 20% eSIM, directly under the main pass CTA. */}
        <KlookSameDayCards heading="간사이 패스와 같은 날 예약할 것" cards={sameDayCards} locale={LOCALE} />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>패스와 편도 비교</span>
          <h2 className={styles.sectionTitle}>내 일정에서 간사이 패스가 이득인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            하루카로 교토에 도착하는 날이나 히메지까지 가는 날은 이득이고, 오사카–교토나 오사카–나라 왕복만 하는 날은
            이득이 아닙니다. JR 서일본 운임으로 간사이 공항 → 교토 → 나라 → 오사카 → 간사이 공항 3일 일정은 편도 합계
            ¥6,620, 3일권은 ¥5,500입니다.
          </p>
          <Table
            head={["일정", "편도 티켓 합계(성인)", "패스", "결과"]}
            lead={{
              label: "결론",
              text: "교토 도착, 히메지 당일치기, 도시 사이를 오가는 3~4일이라면 사고, 오사카–교토나 오사카–나라 왕복 하나뿐이라면 사지 마세요",
            }}
            rows={itineraryRows.map((r) => [r.plan, r.singles, r.pass, r.result])}
          />
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>
            JR 편도 티켓은 얼마인가요?
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            JR 서일본 일반 열차의 성인 운임은 오사카–교토 ¥580, 교토–나라 ¥720, 오사카–히메지 ¥1,460이고, 간사이
            공항–교토 하루카 편도는 ¥2,700입니다.
          </p>
          <Table
            head={["구간", "성인 편도", "간사이 패스 이용"]}
            lead={{ label: "결론", text: "아래 구간은 모두 JR 일반 열차나 하루카로 패스를 쓸 수 있습니다. 신칸센은 불가입니다" }}
            rows={fareRows.map((r) => [r.route, r.fare, r.onPass])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {CHECKED_ISO} — 공식 출처:{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 서일본, WEST QR 간사이 패스</a>,{" "}
            <a href={HARUKA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 서일본, WEST QR HARUKA One-way Ticket</a>
            (2026년 11월 1일 이후 판매분),{" "}
            <a href={FARE_PDF_URL} target="_blank" rel="noopener noreferrer">JR 서일본, 게이한신 운임표(특정 운임, 2025년 4월 1일부터)</a>,{" "}
            <a href={HIMEJI_FARE_URL} target="_blank" rel="noopener noreferrer">JR 서일본 보도자료, 2026년 2월 25일(오사카–히메지 ¥1,460)</a>.
            오사카역–나라는 특정 운임 목록에 없어 나라 구간은 덴노지 기준으로 적었습니다. 운임은 성인 일반 승차권
            기준이며 어린이는 절반입니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              클룩에서 간사이 패스 보기 →
            </KlookLink>
          </div>
        </section>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>간사이 패스는 어떤 패스인가요?</h2>
          <p className={styles.bodyText}>
            JR 서일본의 지역 패스 중 가장 범위가 좁고 저렴한 패스이며, 간사이를 처음 여행하는 사람 대부분에게 필요한
            패스입니다. 연속 1~4일 동안 JR 서일본의 일반 열차(보통, 쾌속, 신쾌속)를 무제한으로 탈 수 있고, JR 서일본은
            이용 구역을 <strong>오사카, 교토, 고베, 나라, 히메지, 와카야마, 오쓰, 쓰루가, 이가우에노</strong> 일대로
            안내합니다. 여기에 일반 IC 카드로는 얻을 수 없는 혜택이 하나 더 있습니다. 간사이 공항 특급 하루카의
            자유석을 무제한으로, 보통차 지정석을 2회 이용할 수 있습니다.
          </p>
          <p className={styles.bodyText}>
            2026년에는 가격보다 중요한 변화가 있습니다. JR 서일본의 페이지에는 간사이 패스의 판매가{" "}
            <strong>2026년 9월 30일로 종료</strong>되었고, 그 전에 산 패스는 유효 기간 동안 계속 쓸 수 있다고
            나와 있습니다. 상품이 없어진 것은 아니고, <strong>WEST QR 간사이 패스</strong>로 바뀌었습니다. 이용 범위는
            같은 1~4일이며, 온라인으로 등록하고 개찰구에서 스캔하는 QR 코드로 판매되고 가격은 조금 낮아졌습니다. 예전
            가이드에서 1일 ¥2,800이라고 적혀 있다면 지금은 쓰이지 않는 가격입니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>JR 간사이 패스는 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            성인 기준 연속 1일 {QR_1_DAY}, 2일 ¥4,700, 3일 ¥5,500, 4일 {QR_4_DAY}이고, 6~11세 어린이는 정확히
            절반입니다. JR 서일본은 WEST QR 패스의 가격표를 하나만 공개하며, 판매처별 가격은 따로 정하지 않습니다.
          </p>
          <Table
            head={["기간", "성인(WEST QR)", "어린이 6~11세", "성인 1일당", "구 종이 패스, 성인"]}
            lead={{
              label: "결론",
              text: `1일권(${QR_1_DAY})은 교토행 하루카 편도와 같은 가격이고, 4일권(${QR_4_DAY})은 1일당 ¥1,675로 가장 저렴합니다`,
            }}
            rows={priceRows.map((r) => [r.days, r.qrAdult, r.qrChild, r.perDay, r.oldAdult])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {CHECKED_ISO} — 공식 출처:{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 서일본, WEST QR 간사이 패스</a>. 구
            패스 열(JR 서일본: &quot;2026년 9월 30일 판매 종료&quot;)은 예전 가격을 알아볼 수 있도록 남겨 두었습니다.
            1일당 금액은 성인 가격을 일수로 나눈 값입니다. 패스는 일본 시간으로 시작일 04:00부터 마지막 날 24:00까지,
            연속된 날짜에 유효합니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              클룩에서 간사이 패스 보기 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            구매하기 전에 운임표로는 알 수 없는 두 가지를 상품 페이지에서 확인하세요. 바우처의 교환 가능 기간이 항공편
            날짜와 맞는지, 그리고 판매처의 환불 조건입니다. &quot;Use ticket(티켓 사용)&quot; 버튼을 누른 뒤에는 JR 서일본이 환불하지
            않습니다.
          </p>
          <KlookTripPrep
            label="같은 여행에 함께 예약"
            heading="간사이 패스와 함께 무엇을 예약할까요?"
            intro="패스는 도시 사이의 이동을 해결합니다. 나머지는 패스로 탈 수 있는 JR 노선 가까이의 숙소, 나라나 히메지로 가는 가이드 동행 하루, 그리고 QR 코드에 필요한 모바일 데이터입니다. 가격은 적지 않았으니 각 상품 페이지에서 현재 가격을 확인하세요."
            items={lowerPrep}
          />
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>간사이 패스, 와이드 패스, ICOCA</span>
          <h2 className={styles.sectionTitle}>간사이 패스와 간사이 와이드 패스 중 어느 쪽이 좋나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            교토, 오사카, 나라, 고베, 히메지 사이에서만 다닌다면 간사이 패스입니다. 4일권({QR_4_DAY})이 5일
            간사이 와이드 패스(¥12,000)보다 ¥5,300 저렴합니다. 와이드 패스는 오카야마까지 산요 신칸센을 타거나,
            지정석 특급으로 기노사키 온천, 아마노하시다테, 시라하마까지 가는 긴 하루가 있어야 가격만큼 쓸 수
            있습니다. ICOCA는 패스가 아니라 탈 때마다 운임을 내는 카드이므로, 한 도시에 머무는 여행에 맞습니다.
          </p>
          <Table
            head={["", "이용 구역", "신칸센", "가격(성인)", "추천 대상"]}
            lead={{ label: vsLead.option, text: `${vsLead.area} / ${vsLead.shinkansen} / ${vsLead.price}` }}
            rows={vsRest.map((r) => [r.option, r.area, r.shinkansen, r.price, r.who])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {CHECKED_ISO} — 공식 출처:{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 서일본, WEST QR 간사이 패스</a>,{" "}
            <a href={WIDE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 서일본, 간사이 와이드 패스</a>,{" "}
            <a href={ICOCA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 서일본, ICOCA 안내</a>. 구매
            방법은 각각 다릅니다. 간사이 패스는 해외 여행사에서만 판매하는 WEST QR 바우처이며 교환 절차가 없습니다.
            와이드 패스는 해외 여행사의 교환권을 사거나, JR-WEST ONLINE TRAIN RESERVATION으로 예약한 뒤 JR 서일본
            역에서 여권을 보여 주고 받습니다. 방문객 디자인 ICOCA는 간사이공항역 JR 매표소에서 삽니다. 와이드 패스는
            첫날 00:00부터, 간사이 패스는 04:00부터 유효합니다. 두 패스 모두 도쿄행 도카이도 신칸센은 이용할 수
            없습니다.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            어느 패스를 고르든 패스 가격만큼 이용하는 날은 당일치기입니다.{" "}
            <Link href="/guides/attractions/himeji-castle-day-trip" style={linkStyle}>
              히메지성 당일치기(영어)
            </Link>
            는 간사이 패스 이용 구역의 끝에 있고,{" "}
            <Link href="/guides/attractions/amanohashidate-ine-day-trip" style={linkStyle}>
              아마노하시다테 당일치기(영어)
            </Link>
            에는 와이드 패스가 필요합니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>포함 여부</span>
          <h2 className={styles.sectionTitle}>간사이 패스로 신칸센, 하루카, 지하철을 탈 수 있나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            하루카(자유석 무제한, 지정석 2회)는 탈 수 있지만 신칸센과 지하철은 탈 수 없습니다. 하루카 외에는 JR 교토선,
            고베선, 나라선, 야마토지선, 간사이 공항선의 JR 서일본 일반 열차(신쾌속, 쾌속, 보통)만 이용할 수 있고, 다른
            특급, 버스, 사철은 제외입니다. 이 패스를 살지 말지는 포함되는 것보다 제외되는 것으로 정해지는 경우가
            많습니다.
          </p>
          <Table
            head={["교통편", "패스 이용", "의미"]}
            lead={{ label: "결론", text: LINE_LEAD }}
            rows={lineRows.map((r) => [r.service, r.allowed, r.note])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {CHECKED_ISO} — 공식 출처:{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 서일본, WEST QR 간사이 패스</a>
            (이용 가능 열차 표). 패스로 이용할 수 없는 도시 안 교통은{" "}
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>
              오사카 교통 가이드(영어)
            </Link>
            와{" "}
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>
              교토 교통 가이드(영어)
            </Link>
            를 보세요. 두 가이드 모두 패스와 함께 필요한 지하철, 버스,{" "}
            <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>
              IC 카드(영어)
            </Link>{" "}
            선택지를 정리했습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>공항에서</span>
          <h2 className={styles.sectionTitle}>간사이 공항에서 간사이 패스로 하루카를 어떻게 타나요?</h2>
          <p className={styles.bodyText}>
            JR 개찰구에서 QR 코드를 스캔하고 하루카에 타면 됩니다. 간사이 공항과 덴노지, 신오사카, 교토 사이의 하루카
            자유석은 무제한이고, 보통차 지정석도 2회 포함됩니다(그린차는 추가 요금).
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>간사이 패스로 신칸센을 탈 수 있나요?</h3>
          <p className={styles.bodyText}>
            탈 수 없습니다. JR 서일본은 이 패스가 &quot;추가 요금을 내더라도 신칸센에는 이용할 수 없다&quot;고
            안내합니다. 신칸센이 포함된 간사이의 패스는 간사이 와이드 패스이며, 신오사카와 오카야마 사이의 산요 신칸센
            지정석을 이용할 수 있습니다.
          </p>
          <p className={styles.bodyText}>
            도착하는 날 04:00 이후 &quot;Use ticket(티켓 사용)&quot; 버튼을 누르고, 간사이 공항의 JR 개찰구에서 QR 코드를 스캔한
            뒤 <strong>덴노지</strong>, <strong>신오사카</strong>, <strong>교토</strong>행 하루카를 타세요. 패스
            유효일이라도 신오사카에서 교토까지 신칸센을 타려면 별도 티켓이 필요합니다. 히로시마까지 신칸센 구간이
            있다면{" "}
            <Link href="/guides/transport/kansai-hiroshima-area-pass" style={linkStyle}>
              간사이 히로시마 패스(영어)
            </Link>
            가 신칸센을 포함하는 패스입니다. 두 패스를 가르는 기준은 히로시마입니다.
          </p>
          <p className={styles.bodyText}>
            지정석 2회는 짐 가방을 들고 이동하는 날에 쓰세요. JR 서일본에 따르면 지정석은 승차 30일 전부터 WEST-QR
            웹사이트에서 예약하며, 열차 안, 발매기, 매표소에서는 예약할 수 없습니다. 출발 전에 예약해 두세요.{" "}
            {CHECKED} 확인.
          </p>
          <p className={styles.bodyText}>
            난바와 도톤보리 쪽으로 간다면 하루카는 도움이 되지 않습니다. 그쪽은 패스로 탈 수 없는 난카이 노선입니다.{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit" style={linkStyle}>
              하루카와 난카이 라피트 비교(영어)
            </Link>
            는 두 노선을 운임이 아니라 목적지 기준으로 비교하고,{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={linkStyle}>
              오사카 공항 이동 가이드(영어)
            </Link>
            는 이타미 공항까지 다룹니다. 이 패스가 공항 티켓으로 맞는지는 숙소 위치로 정해집니다. 난바에 묵는다면
            저녁에는{" "}
            <Link href="/ko/guides/attractions/dotonbori-river-cruise" style={linkStyle}>
              도톤보리 리버크루즈
            </Link>
            (성인 ¥2,000, 약 20분)도 걸어서 갈 수 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              하루카가 포함된 간사이 패스 보기 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              하루카 편도 티켓 보기 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>비교</span>
          <h2 className={styles.sectionTitle}>간사이 패스 대신 쓸 수 있는 다른 간사이 패스가 있나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            JR과 하루카를 이용하는 간사이 여행이라면 간사이 패스를 사세요. 긴테쓰 레일 패스는 긴테쓰로 가는 나라용,
            간사이 히로시마 패스는 서쪽으로 신칸센을 타는 여행용이며, KANSAI ONE PASS는 패스가 아니라 IC
            카드입니다.
          </p>
          <Table
            head={["선택지", "가격(성인)", "이용 범위", "이럴 때 선택"]}
            lead={{ label: cmpLead.option, text: `${cmpLead.covers}. ${cmpLead.pick}` }}
            rows={cmpRest.map((r) => [r.option, r.price, r.covers, r.pick])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: JR 서일본의 간사이 패스, 하루카 편도, 간사이 미니 패스, 간사이 와이드 패스 페이지(westjr.co.jp)와
            KANSAI ONE PASS 공지는 {CHECKED_ISO}, 간사이 히로시마 패스 페이지와 긴테쓰(kintetsu.co.jp/foreign/english/ticket/)는{" "}
            {R04_CHECKED}, 전국 JR 패스(japanrailpass.net)와 오사카 주유패스 공식 사이트는 {PREV_CHECKED}. 나라가 주요 일정이라면{" "}
            <Link href="/guides/transport/kintetsu-rail-pass" style={linkStyle}>
              긴테쓰 레일 패스 가이드(영어)
            </Link>
            에서 긴테쓰 패스가 편도 티켓보다 나은 경우를 계산했고, 오사카 안에서 보내는 하루라면{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              오사카 주유패스 가이드(영어)
            </Link>
            가 간사이 패스로 대신할 수 없는 도시 패스를 다룹니다. 어떤 JR 패스도 유니버설 스튜디오 재팬 입장권은
            포함하지 않으며, 파크 당일에 필요한 스튜디오 패스와 익스프레스 패스 4·7의 차이는{" "}
            <Link href="/ko/guides/attractions/usj-tickets-express-pass" style={linkStyle}>
              USJ 익스프레스 패스 가격·종류 가이드
            </Link>
            에 정리했습니다. 기노사키 온천은 간사이 패스로 특급 고노토리를 탈 수
            없고, 와이드 패스에는 고노토리 지정석이 포함됩니다.{" "}
            <Link href="/guides/attractions/kinosaki-onsen-day-trip" style={linkStyle}>
              기노사키 온천 당일치기 가이드(영어)
            </Link>
            에 오사카에서 출발하는 고노토리 시간을 정리했습니다. 하루카 편도 티켓은 단기 체재로 입국하는 외국 여권
            소지자를 위한 할인 편도이며, 위 운임은 JR 서일본이 운임을 올린 2026년 11월 1일 이후 판매분에 적용됩니다.
            이제 교토행 편도와 1일권 가격이 같습니다. 전국 패스의 손익분기는{" "}
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR 패스 가이드(영어)
            </Link>
            에서 확인하세요. 도쿄에서 출발해 가나자와를 거쳐 간사이로 오는 여행이라면 7일{" "}
            <Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>
              호쿠리쿠 아치 패스(영어)
            </Link>
            로 호쿠리쿠 신칸센과 썬더버드, 하루카를 모두 탈 수 있습니다. 어떤 간사이 패스로도 갈 수 없는 히로시마는{" "}
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={linkStyle}>
              오사카–히로시마 신칸센 가이드(영어)
            </Link>
            에서 JR 서일본 간사이 히로시마 패스와 편도 티켓을 비교합니다. ICOCA &amp; HARUKA는 확인일에 JR 서일본의
            현재 영어 페이지에 가격이 없어 제외했습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>살 만할까?</span>
          <h2 className={styles.sectionTitle}>교토와 오사카 여행에 간사이 패스를 사는 게 이득인가요?</h2>
          <p className={styles.bodyText}>
            간사이 공항으로 들어와 교토와 오사카 사이를 JR로 이동한다면 이득이고, 한 도시에서 지하철로만 다닌다면
            이득이 없습니다. 1일 예시(간사이 공항에서 교토)에서는 하루카 편도가 ¥2,700으로 1일권과 같습니다. 3일
            예시(교토 도착, 오사카 출발)에서는 편도 두 장이 ¥4,600, 3일권이 ¥5,500이므로 그 사이에 JR을 ¥900어치 더
            타면 이득입니다.
          </p>
          <div style={{ marginBottom: "1rem" }}>
            <Table
              head={["일정", "하루카 편도 합계", "같은 기간 패스", "결과"]}
              lead={{
                label: "결론",
                text: "교토로 도착하거나 공항 왕복이 모두 유효 기간 안에 들어가면 패스를 사고, JR을 덴노지나 오사카까지 공항 구간에만 탄다면 사지 마세요",
              }}
              rows={breakEvenRows.map((r) => [r.trip, r.singles, r.pass, r.result])}
            />
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            최종 확인: {CHECKED_ISO} — 공식 출처:{" "}
            <a href={HARUKA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 서일본, WEST QR HARUKA One-way Ticket</a>
            (2026년 11월 1일 이후 판매분 성인 운임),{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">WEST QR 간사이 패스</a>. 편도 티켓이므로
            왕복은 두 장이고, 공항 왕복이 모두 연속된 유효 기간 안에 들어갈 때만 패스로 돌아올 수 있습니다. 나머지를
            채우는 교토–오사카, 오사카–나라, 오사카–히메지 이동의 운임은 여기에 적지 않았으니, JR 서일본의 운임
            검색에서 이용할 역으로 확인하세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              패스가 이득이라면 간사이 패스 확인 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              편도가 더 낫다면 하루카 티켓 확인 →
            </KlookLink>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Table head={["일정", "판단", "이유"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            운임표에 나오지 않는 두 가지는 이 페이지가 아니라 상품 페이지에서 확인하세요. 여행 날짜에 판매되는 패스가
            QR 코드인지 일본에서 교환하는 교환권인지, 그리고 취소 조건입니다. 패스는 직접 정한 연속 날짜에만 쓸 수
            있으므로 취소 조건이 중요합니다. 바우처는 날짜가 정해진 것이 아니라 교환 가능 기간을 두고 판매되는 경우가
            많으니, 그 기간이 항공편과 맞는지 구매 전에 확인하세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              간사이 패스 확인 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              하루카 편도 티켓과 비교 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>손익분기</span>
          <h2 className={styles.sectionTitle}>어떤 일정이면 패스 가격만큼 쓸 수 있나요?</h2>
          <p className={styles.bodyText}>
            방문객이 비교해야 할 대상은 일반 운임이 아니라 할인된 <strong>하루카 편도 티켓</strong>입니다. JR
            서일본이 외국 여권 소지자에게 판매하는 정식 공항 편도 중 가장 저렴한 티켓입니다.{" "}
            <strong>2026년 11월 1일</strong> 이후 판매분은 덴노지 ¥1,600, 오사카 / 신오사카 ¥1,900, 교토 ¥2,700,
            고베 ¥2,300, 나라 ¥2,200입니다. 패스는 이 금액보다 저렴해야 합니다.
          </p>
          <p className={styles.bodyText}>
            <strong>교토 도착, 1일권({QR_1_DAY}).</strong> 교토행 편도가 ¥2,700으로 패스 가격과 같습니다. 공항 구간에
            추가로 내는 금액이 없고, 그날 교토–나라나 교토–오사카 이동을 포함한 모든 JR이 추가 요금 없이 이용됩니다.
          </p>
          <p className={styles.bodyText}>
            <strong>간사이 4일, 4일권({QR_4_DAY}).</strong> 간사이로 들어와 간사이에서 나가는 일정입니다. 교토 도착
            ¥2,700과 오사카 출발 ¥1,900, 공항 구간만으로 {QR_4_DAY} 중 ¥4,600입니다. 나머지 ¥2,100은 4일 동안의 도시 간
            이동(교토–나라, 오사카–고베, 오사카–히메지)으로 채워야 하며, 이 구간을 JR로 다닌다면 충분히 넘습니다. 그
            날들을 한 도시 안에서 지하철로 보낸다면 <em>채울 수 없습니다</em>. 패스로 탈 수 없기 때문입니다. 오사카만
            다니는 날에는{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={linkStyle}>
              오사카 메트로 패스(엔조이 에코 카드)(영어)
            </Link>
            로 하루 동안 지하철과 시내버스를 이용할 수 있습니다. 오사카에서 하루를 보내는 5일 여행이라면 마지막 3일에
            3일권을 쓰는 편이 4일권보다 저렴합니다. 날짜별 계산은{" "}
            <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>
              간사이 5일 일정(영어)
            </Link>
            에 있습니다.
          </p>
          <p className={styles.bodyText}>
            <strong>이득이 없는 경우.</strong> 패스 기간 중간에 쓰지 않는 날이 있는 여행, 나라는 긴테쓰로, 아라시야마는
            한큐로 가는 여행, 도쿄까지 신칸센 구간이 있는 여행입니다. 세 경우 모두 처음부터 계산이 맞지 않습니다.
            운임은 {CHECKED}에 확인했습니다. 하루만 다녀온다면{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" style={linkStyle}>
              오사카 출발 교토·나라 당일 투어(영어)
            </Link>
            에 버스가 포함되어 있어 그날은 철도 패스가 필요 없습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>다른 상품</span>
          <h2 className={styles.sectionTitle}>KANSAI ONE PASS는 판매가 끝났나요?</h2>
          <p className={styles.bodyText}>
            판매 종료가 진행 중이며, 처음부터 JR 철도 패스가 아니었습니다. KANSAI ONE PASS는 방문객용 충전식 교통 IC
            카드입니다. 2024년 12월 23일 공동 공지에서 JR 서일본, 한큐, 긴테쓰, 게이한, 난카이, 한신, 오사카 메트로,
            오사카 시티 버스, 교토시와 고베시 교통국은 2025년 11월 1일부터 각 회사의 재고가 떨어지는 대로 판매를
            종료하고, 2026 회계연도 말(2027년 3월)까지 모든 판매를 끝낸다고 밝혔습니다.
          </p>
          <p className={styles.bodyText}>
            같은 공지에 따르면 이미 산 카드는 충전식 IC 카드로 계속 쓸 수 있고, 상점과 관광지 혜택은 2026 회계연도로
            끝납니다. 공지에 후속 카드는 나와 있지 않으며, 판매 종료 이유로 방문객용 KANSAI MaaS 전자 티켓의 보급을
            들고 있습니다. 이 카드는 처음부터 간사이 패스를 대신하는 상품이 아니었습니다. IC 카드는 탈 때마다 운임을
            내고, 패스는 그 운임을 대신합니다. 탈 때마다 결제하려면 ICOCA로도 같은 역할을 할 수 있습니다.
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {CHECKED_ISO} — 공식 출처:{" "}
            <a href={KOP_NOTICE_URL} target="_blank" rel="noopener noreferrer">
              2024년 12월 23일 공동 공지(JR 서일본, 한큐, 긴테쓰, 게이한, 난카이, 한신, 오사카 메트로 등), hanshin.co.jp
            </a>
            .
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>구매 방법</span>
          <h2 className={styles.sectionTitle}>간사이 패스는 어디서 사고 교환하나요?</h2>
          <p className={styles.bodyText}>
            출발 전에 해외 여행사에서 WEST-QR 바우처로 사며, 일본에서 교환할 것은 없습니다. JR 서일본은 이 패스를 일본
            국내 여행사나 JR-WEST ONLINE TRAIN RESERVATION에서 살 수 없다고 안내하고, 역 판매도 없습니다.
          </p>
          <ol className={styles.bodyText} style={{ paddingLeft: "1.25rem" }}>
            <li>해외 여행사에서 바우처를 삽니다(클룩도 그중 하나입니다).</li>
            <li>바우처에 적힌 WEST-QR 이용 웹사이트에 바우처 정보를 등록합니다.</li>
            <li>같은 사이트에서 승차 30일 전부터 하루카 지정석 2회를 예약합니다.</li>
            <li>첫날 04:00 이후 &quot;Use ticket(티켓 사용)&quot; 버튼을 누르고 개찰구에서 QR 코드를 스캔합니다.</li>
          </ol>
          <p className={styles.bodyText}>
            &quot;Use ticket&quot;을 누르기 전의 변경과 환불은 구매한 여행사를 통해 하며, 여행사가 자체 수수료를 받을 수
            있습니다. &quot;Use ticket&quot;을 누른 뒤에는 지연이나 운휴가 있어도 JR 서일본이 환불하지 않습니다.
            인터넷에 연결된 스마트폰이 필요합니다(동행자의 휴대폰으로 표시해도 됩니다). 외국 정부가 발급한 여권과 단기
            체재 입국 자격이 있어야 하며, 일본 국적자는 이용할 수 없습니다. 2026년 9월 30일까지 판매된 구 종이 패스는
            JR 서일본 역에서 교환권을 바꾸는 방식이었습니다.{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">westjr.co.jp</a>에서 {CHECKED}에
            확인했습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              간사이 패스 바우처 구매 →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="JR 간사이 패스 자주 묻는 질문" />

        <KlookTourPicks
          heading="간사이 철도 패스 두 가지 비교"
          intro="두 상품 모두 위에서 설명한 JR 서일본 패스이며, 클룩에서 한국어 결제 화면으로 살 수 있습니다. 간사이 패스에는 하루카가 포함되고, 미니 패스는 더 저렴하지만 하루카가 포함되지 않습니다. 날짜별 현재 가격은 상품 페이지에서 확인하세요."
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/kinosaki-onsen-day-trip", title: "기노사키 온천 당일치기(2026): 오사카 출발, 온천 패스, 료칸(영어)" },
            { href: "/guides/attractions/kumano-kodo-tour", title: "구마노 고도 투어(2026): 당일 투어, 나카헤치, 걷는 거리(영어)" },
            { href: "/guides/attractions/amanohashidate-ine-day-trip", title: "아마노하시다테 당일치기(2026): 이네 후나야, 투어, 교토 출발 열차(영어)" },
            { href: "/guides/attractions/hiroshima-peace-memorial-tours", title: "히로시마 평화기념공원 투어: 가이드, 자료관, 티켓(영어)" },
            { href: "/guides/transport/kintetsu-rail-pass", title: "긴테쓰 레일 패스(2026): 가격과 살 만한지(영어)" },
            { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "오사카 교토 3일 일정(2026): 날짜별 코스와 예약(영어)" },
            { href: "/guides/attractions/himeji-castle-day-trip", title: "히메지성 당일치기(2026): 입장료 ¥2,500과 시간(영어)" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "오사카 출발 교토·나라 당일 투어(2026): 어떤 투어를 예약할까(영어)" },
            { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "오사카에서 고베 당일치기(2026): 경로, 고베 소고기, 하루 일정(영어)" },
            { href: "/guides/transport/haruka-vs-nankai-rapit", title: "하루카와 난카이 라피트 비교(2026): 간사이 공항에서 가장 좋은 열차(영어)" },
            { href: "/guides/transport/osaka-airport-transfer", title: "오사카 공항 이동 가이드(2026): 간사이 공항과 이타미에서 시내까지(영어)" },
            { href: "/guides/transport/kyoto-transportation", title: "교토 교통 가이드(2026): 버스, 열차, 택시(영어)" },
            { href: "/guides/transport/osaka-transportation", title: "오사카 교통 가이드(2026): 지하철, 열차, IC 카드(영어)" },
            { href: "/guides/transport/jr-pass-guide", title: "JR 패스 가이드 2026: 가격, 살 만한지, 구매 방법(영어)" },
            { href: "/guides/transport/osaka-metro-pass", title: "오사카 메트로 패스와 엔조이 에코 카드(2026): 어느 쪽을 살까(영어)" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "오사카 주유패스 2026: ¥3,500, 살 만할까, 1일 코스(영어)" },
            { href: "/guides/attractions/nara-day-trip", title: "나라 당일치기(2026): 오사카, 교토 출발과 도다이지 입장료(영어)" },
            { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "히로시마·미야지마 당일치기(2026): 하루면 충분할까(영어)" },
            { href: "/guides/attractions/things-to-do-osaka", title: "오사카에서 즐길 거리(2026): 주유패스가 이득인 곳과 아닌 곳(영어)" },
            { href: "/guides/attractions", title: "일본에서 즐길 거리 더 보기(영어) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>공항 구간에 간사이 전역 이동까지 더하기</h2>
            <p className={styles.ctaBannerDesc}>
              오사카, 교토, 고베, 나라, 히메지 일대의 JR 서일본 열차를 1~4일 동안 이용할 수 있고, 간사이 공항 하루카도
              포함됩니다. JR을 공항 구간에만 탄다면 편도 티켓을 사세요.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                간사이 패스 보기 →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                하루카 티켓 보기 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
