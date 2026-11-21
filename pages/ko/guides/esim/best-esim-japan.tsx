import Head from "next/head";
import Link from "next/link";
import EsimUseCaseTable from "../../../../components/EsimUseCaseTable";
import EsimBuyGuide from "../../../../components/EsimBuyGuide";
import { esimPicksCopy } from "../../../../lib/esim-picks-copy";
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
import KlookLink from "../../../../components/KlookLink";
import SimbyeOffer from "../../../../components/SimbyeOffer";
import { simCards } from "../../../../lib/sim-cards";
import {
  allEsimPlans,
  cheapestAtLeastGb,
  cheapestPlan,
  cheapestUnlimited,
  formatUsd,
  getProvider,
  latestCheckedAt,
  priceAtLeastLabel,
  priceFromLabel,
  unlimitedFromLabel,
  type EsimPlanRow,
  type EsimProviderId,
} from "../../../../lib/esim-prices";
import { klookEsim } from "../../../../lib/klook-links";
import { koKlookEsim } from "../../../../lib/klook-links-ko";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { KLOOK_ESIM_FACTS } from "../../../../lib/klook-esim-facts";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaTop } from "../../../../components/EsimCta";

/**
 * Korean edition of /guides/esim/best-esim-japan. Mirrors the English page block by
 * block as of 2026-11-05 — same sections, tables, FAQ and Klook CTAs in the same
 * places — and reads every price from lib/esim-prices.ts exactly as the English page
 * does. No figure here that the English page (or its data) does not carry.
 */

const ROUTE = "/ko/guides/esim/best-esim-japan";
// Retitled 13 Nov 2026 (task jtk-20261113-C01). On 10 Nov Google showed this page as
// "가격 확인 <date>｜…", the date line that sat directly under a two-line H1, so the H1 is
// now one line equal to the title and the date line moved into the first body paragraph.
// Retitled again 21 Nov 2026 (task jtk-20261121-C01): 0.9% CTR at position 8.5, with "일본 이심
// 추천" (98 impressions, 0%) and "일본 esim 추천" (67) as the two landing queries. The title now
// opens on both spellings, "eSIM·이심", and carries the 1st pick's 10 GB price from the daily feed.
// TITLE and DESC are built after tenGb below, so the figure is always the one on sale.

const LOCALE = "ko" as const;

const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "19 Oct 2026" (the English constants' format) -> "2026-10-19", so dateLabel can read it. */
function isoOfEnDate(s: string): string {
  const [d, mon, y] = s.split(" ");
  const m = EN_MONTHS.indexOf(mon) + 1;
  return `${y}-${String(m).padStart(2, "0")}-${String(Number(d)).padStart(2, "0")}`;
}

const latest = latestCheckedAt();
const pricesCheckedAt = latest ? dateLabel(latest.slice(0, 10), LOCALE) : "확인 전";
// The day every provider term on the English page was read (its SPECS_CHECKED, 29 Oct 2026).
const SPECS_CHECKED = dateLabel("2026-10-29", LOCALE);
const KLOOK_CHECKED = dateLabel(isoOfEnDate(klookEsim.checkedAt), LOCALE);
const KLOOK_SPECS_CHECKED = dateLabel(isoOfEnDate(klookEsim.specsCheckedAt), LOCALE);
// Simbye joined after the others, so its rows have their own date (the English SIMBYE_SPECS_CHECKED_AT).
const SIMBYE_CHECKED = dateLabel("2026-11-05", LOCALE);

// English-only for now, so every link to it says so.
const PLANS_HREF = "/guides/esim/japan-esim-data-plans";

/** "Unlimited / 7 days" -> "무제한 / 7일". The figures are untouched. */
function planName(name: string): string {
  return name.replace(/^Unlimited/, "무제한").replace(/(\d+) days?$/, "$1일");
}

const HOLAFLY_ALT = {
  esimId: "airalo" as EsimProviderId,
  ctaLabel: "Airalo 무제한 eSIM 보기 →",
  note: "Holafly는 저희 링크로 구매할 수 없습니다. 대안으로 Airalo를 권합니다.",
};

/** Korean copy of the default in components/SimbyeOffer.tsx. {plan} goes through planName, so it reads 30일 rather than the feed's "30 days". */
const SIMBYE_OFFER = {
  label: "Simbye 할인:",
  text: "코드 {code}을 입력하면 모든 eSIM 요금제가 {percent}% 할인됩니다. {plan} 요금제는 정가 {list}, 코드 적용 시 {price}입니다.",
  cta: "Simbye eSIM 보기 →",
};

type TopPick = {
  id: string;
  esimId: EsimProviderId;
  rank: number;
  bestFor: string;
  badgeCls: string;
  target: string;
  ctaLabel: string;
  ctaExternal: boolean;
  ctaAlt?: typeof HOLAFLY_ALT;
  /** One line of fact for why the pick sits where it does, with live prices in it. */
  why: () => string;
};

const tenGb = (id: EsimProviderId) => {
  const plan = cheapestAtLeastGb(id, 10);
  return plan ? formatUsd(plan.priceUsd) : "—";
};

// check:i18n requires the contiguous "일본 이심", so eSIM goes in brackets rather than first.
const TITLE = `일본 이심(eSIM) 추천 2026: 10GB ${tenGb("simbye")}부터`;
// The H1 starts with the title's exact words and adds the provider count.
const H1 = `${TITLE}, 6곳 비교`;
const DESC =
  `일본 이심 추천 1순위 Simbye(10GB ${tenGb("simbye")}, 도코모·KDDI·소프트뱅크). eSIM 6곳 가격·통신망 비교와 설정법.`;

const topPicks: TopPick[] = [
  {
    id: "simbye-japan",
    esimId: "simbye",
    rank: 1,
    bestFor: "확인된 요금제 중 최저가",
    badgeCls: styles.pickBadgeGreen,
    target: "일정과 관계없이 데이터만 필요한 대부분의 여행자",
    ctaLabel: "Simbye eSIM 보기 →",
    ctaExternal: true,
    why: () =>
      `다섯 곳 중 정가가 가장 낮습니다. 10 GB가 Simbye ${tenGb("simbye")}, eSIM Go ${tenGb("esimgo")}, Airalo ${tenGb("airalo")}이고, 일본 통신사 네 곳을 쓰며 테더링도 허용됩니다.`,
  },
  {
    id: "airalo-japan",
    esimId: "airalo",
    rank: 2,
    bestFor: "앱 편의성·고객 지원 1순위",
    badgeCls: styles.pickBadgeBlue,
    target: "앱, 실시간 채팅, 제한 없는 테더링을 원하는 여행자.",
    ctaLabel: "Airalo eSIM 보기 →",
    ctaExternal: false,
    why: () =>
      `10 GB가 ${tenGb("airalo")}로 더 비싸지만, 무제한 요금제는 하루 3 GB까지 최고 속도에 테더링 제한이 없고 24시간 실시간 채팅도 제공합니다.`,
  },
  {
    id: "holafly-japan",
    esimId: "holafly",
    rank: 3,
    bestFor: "무제한 1순위",
    badgeCls: styles.pickBadgeOrange,
    target: "데이터를 많이 쓰는 사람: 원격 근무, 스트리밍, 매일 영상 통화.",
    ctaLabel: "Holafly eSIM 보기 →",
    ctaExternal: false,
    ctaAlt: HOLAFLY_ALT,
    why: () =>
      `무제한 전용으로 ${formatUsd(cheapestUnlimited("holafly")?.priceUsd ?? 0)}부터이며 휴대폰에서 쓰는 데이터에는 하루 속도 제한 기준이 없습니다. 다만 핫스팟이 하루 1 GB로 제한되고 저희 링크로 살 수 없어 Airalo 다음입니다.`,
  },
  {
    id: "esim-go-japan",
    esimId: "esimgo",
    rank: 4,
    bestFor: "최대 용량",
    badgeCls: styles.pickBadgeBlue,
    target: "예산을 아끼는 여행자, 또는 아시아 여러 나라를 도는 여행자.",
    ctaLabel: "eSIM Go 보기 →",
    ctaExternal: true,
    why: () =>
      `10 GB가 ${tenGb("esimgo")}이고, 100 GB와 200 GB 요금제, 1일부터 시작하는 무제한 요금제를 파는 곳은 여기서 eSIM Go뿐입니다.`,
  },
  {
    id: "sakura-mobile",
    esimId: "sakura",
    rank: 5,
    bestFor: "장기 체류 1순위",
    badgeCls: styles.pickBadgeGreen,
    target: "한 달 이상 머물며 음성 통화와 영어 고객 지원이 필요한 사람.",
    ctaLabel: "Sakura Mobile 보기 →",
    ctaExternal: false,
    why: () =>
      "가격은 다섯 곳 중 가장 비싸지만, 통화와 문자가 되는 일본 번호를 파는 유일한 곳이자 물리 SIM이 있는 유일한 곳입니다.",
  },
];

/** Korean copy of the qualitative profile in lib/sim-cards.ts — translated, nothing added. */
const SIM_COPY: Record<string, { name: string; summary: string; pros: string[]; cons: string[] }> = {
  "simbye-japan": {
    name: "Simbye 일본 eSIM",
    summary:
      "NTT docomo, KDDI/au, SoftBank, Rakuten Mobile을 쓰는 데이터 전용 일본 eSIM. 용량제는 1 GB부터 50 GB까지이고, 무제한 요금제는 하루 2 GB까지 최고 속도입니다. 가격 정보에 있는 모든 요금제에서 테더링을 사용할 수 있습니다.",
    pros: ["용량제 정가가 다섯 곳 중 가장 낮음", "일본 4개 통신망 중 이용 가능한 망에 자동으로 연결", "모든 일본 요금제에서 테더링 허용", "유효기간 180일의 50 GB 요금제"],
    cons: ["데이터 전용(일본 번호, 통화, 문자 없음)", "무제한 요금제는 하루 2 GB 이후 1 Mbps로 감속", "무제한 요금제는 충전 불가"],
  },
  "airalo-japan": {
    name: "Airalo 일본 eSIM",
    summary:
      "이용자 1,000만 명 이상의 세계 최대 eSIM 마켓플레이스. 출국 전에 설치해 두었다가 일본에 도착한 뒤 활성화할 수 있습니다 — 줄을 설 필요도, 유심을 바꿀 필요도 없습니다.",
    pros: ["세계 최대 eSIM 마켓플레이스", "출국 전에 설치하고 일본 도착 후 활성화", "1 GB부터 무제한까지, 3~30일 요금제", "여행자 1,000만 명 이상이 이용"],
    cons: ["데이터 전용(음성 통화·문자 없음)", "eSIM 지원 기기 필요"],
  },
  "holafly-japan": {
    name: "Holafly 일본 eSIM",
    summary:
      "무제한 데이터 eSIM — 남은 용량을 신경 쓸 필요가 없습니다. 항상 인터넷 연결이 필요한 유럽·미국 여행자에게 인기가 높습니다.",
    pros: ["휴대폰에서 직접 쓰는 데이터는 무제한", "1~90일 중 원하는 기간", "미국·유럽 여행자에게 인기", "QR 코드로 간단한 설정"],
    cons: ["데이터 전용(통화·문자 없음)", "핫스팟은 하루 1 GB까지", "용량제 요금제보다 비쌈"],
  },
  "esim-go-japan": {
    name: "eSIM Go 일본(Breeze)",
    summary:
      "190개국 이상에서 쓸 수 있는 가성비 좋은 eSIM으로, eSIM Go의 소비자 브랜드 Breeze를 통해 판매됩니다. 예산을 아끼는 여행자나 한 번에 여러 나라를 도는 여행자에게 알맞습니다.",
    pros: ["1일부터 쓰는 단기 무제한 요금제", "190개국 이상에서 사용 가능", "QR 코드로 즉시 활성화", "여러 나라를 도는 여행에 적합"],
    cons: ["데이터 전용(음성·문자 없음)", "Airalo나 Holafly보다 작은 브랜드", "eSIM 지원 기기 필요"],
  },
  "sakura-mobile": {
    name: "Sakura Mobile 여행용 eSIM",
    summary:
      "장기 체류자와 영어 지원을 원하는 여행자를 위한 일본 현지 업체. 여행용 eSIM은 하루 3 GB 또는 무제한, 물리 SIM 요금제에는 음성 옵션이 있습니다.",
    pros: ["완전한 영어 고객 지원", "음성 통화 SIM 요금제 있음(물리 SIM)", "물리 SIM 또는 eSIM 선택 가능", "한 달 이상 체류하는 여행자에게 적합"],
    cons: ["데이터 전용 재판매 업체보다 비쌈", "초기 설정이 약간 더 걸림"],
  },
};

/** Cheapest plan covering `days` days at `gb` GB in total — same rule as the English page. */
function cheapestForTrip(days: number, gb: number): EsimPlanRow | null {
  const rows = allEsimPlans
    .filter((p) => {
      if (p.providerId === "holafly") return false;
      if (p.days < days) return false;
      if (p.unlimited) return true;
      if (p.dailyCapGb) return p.dailyCapGb * days >= gb;
      return (p.gb ?? 0) >= gb;
    })
    .sort((a, b) => a.priceUsd - b.priceUsd || a.days - b.days);
  return rows[0] ?? null;
}

function tripPlanLabel(days: number, gb: number): string {
  const p = cheapestForTrip(days, gb);
  return p ? `${p.provider} ${planName(p.name)} — ${formatUsd(p.priceUsd)}` : "—";
}

const SHORT_TRIP_PLAN = cheapestAtLeastGb("simbye", 10);
const LONG_TRIP_PLAN = cheapestAtLeastGb("simbye", 20);
const SIMBYE_UNLIMITED = cheapestUnlimited("simbye", 7);
const ESIMGO_UNLIMITED = cheapestUnlimited("esimgo", 7);
const AIRALO_UNLIMITED = cheapestUnlimited("airalo", 7);
const SAKURA_DAILY_LONG = allEsimPlans.find((p) => p.id === "sakura-90-gb-30-days") ?? null;

function planLabel(plan: { priceUsd: number; name: string } | null): string {
  return plan ? `${formatUsd(plan.priceUsd)}(${planName(plan.name)})` : "—";
}

const itineraryPicks = [
  {
    trip: "10일 이하, 일반적인 관광",
    pick: "Simbye 용량제",
    detail: () =>
      `${planLabel(SHORT_TRIP_PLAN)} — 10일 동안 하루 1 GB씩 쓸 수 있는 10 GB입니다. Simbye의 가격 정보에는 NTT docomo, KDDI/au, SoftBank, Rakuten Mobile이 올라 있고, 일본 페이지는 “네트워크를 직접 고를 일이 없습니다”라고 밝힙니다. 테더링도 허용됩니다.`,
  },
  {
    trip: "2~4주",
    pick: "용량제는 Simbye, 일일 한도형은 Sakura Mobile",
    detail: () =>
      `${planLabel(LONG_TRIP_PLAN)}이면 같은 네 통신사 망을 쓰며, 하루 1 GB씩 20일 동안 쓸 수 있습니다. 매일 데이터 용량이 초기화되는 요금제를 원한다면 Sakura Mobile의 하루 3 GB 요금제가 Docomo 5G로 돌아가며 — ${planLabel(SAKURA_DAILY_LONG)} — 하루 3 GB를 넘으면 200 kbps로 제한됩니다.`,
  },
  {
    trip: "일본 지방, 산간 지역, 섬",
    pick: "Docomo를 쓰는 요금제, 또는 네 통신사를 모두 쓰는 요금제",
    detail: () =>
      "Sakura Mobile의 하루 3 GB 요금제는 Docomo 5G이고, Simbye와 eSIM Go는 자동 선택되는 다중 통신사입니다. Airalo의 일본 페이지는 SoftBank를 주 통신망으로, 그 밖에 이름을 밝히지 않은 통신망 두 곳을 표시하며(2026년 11월 1일 확인), 클룩 상품은 1일 단위 요금제가 SoftBank 5G, 총량형 요금제가 docomo 4G LTE입니다.",
  },
  {
    trip: "무제한 데이터 — 원격 근무, 스트리밍, 노트북 테더링",
    pick: "가격은 Simbye Unlimited, 최고 속도 데이터가 더 필요하면 eSIM Go Premium 또는 Airalo Unlimited",
    detail: () =>
      `Simbye의 ${planLabel(SIMBYE_UNLIMITED)}는 일주일 기준 정가가 가장 낮고, 하루 2 GB까지 최고 속도, 그 뒤 1 Mbps입니다. eSIM Go의 ${planLabel(ESIMGO_UNLIMITED)}는 5일 30 GB, 10일 60 GB, 15일 90 GB까지 최고 속도이고, 그 뒤에는 “속도가 낮아지지만 720p 영상 스트리밍에는 여전히 충분”하며 “모든 요금제에서 테더링”이 됩니다. Airalo의 ${planLabel(AIRALO_UNLIMITED)}는 하루 3 GB까지 최고 속도, 그 뒤 24시간 초기화 때까지 1 Mbps이고 “테더링이나 연결 기기 수에 제한이 없다”고 밝힙니다.`,
  },
  {
    trip: "일본 전화번호가 필요하다",
    pick: "Sakura Mobile 음성+데이터 eSIM",
    detail: () =>
      "여섯 곳 중 일본 번호, 통화, 문자가 되는 유일한 요금제: au(KDDI) 5G, 하루 3 GB, 통화 시간은 1~10일 요금제 120분, 11~30일 240분, 31~60일 360분, 61~90일 480분. 일본에서 대면 신분 확인이 필요하고, 이용 기간은 도착 시점이 아니라 신원 확인이 끝난 뒤부터 시작됩니다.",
  },
  {
    trip: "한 번의 여행에서 일본과 한국 또는 대만을 방문할 때",
    pick: "일본 전용 대신 아시아 지역 eSIM",
    detail: () =>
      "Airalo의 아시아 eSIM은 “18개 국가와 네트워크”에서 쓸 수 있으며 그중에 일본, 한국, 대만이 있습니다. Breeze의 eSIM Asia는 “13개 국가와 네트워크”에서 쓸 수 있지만, 확인한 페이지에 국가 목록은 없었습니다. 둘 다 이 페이지에서 가격을 매긴 일본 요금제와는 별개 상품입니다.",
  },
];

const dataNeedRows = [10, 14, 21].map((days) => ({
  days,
  light: days * 0.5,
  normal: days,
}));

const networkRows = [
  {
    provider: "Simbye",
    carriers: getProvider("simbye").network,
    how: "Simbye 가격 정보에 표시된 통신사입니다. 일본 페이지는 “네트워크를 직접 고를 일이 없습니다”라고 밝히고, 50 GB 요금제는 NTT Docomo만 쓴다고 안내합니다. 테더링 허용. 데이터 전용.",
    checked: SIMBYE_CHECKED,
  },
  {
    provider: "Airalo(Moshi Moshi Japan)",
    carriers: "SoftBank(주 통신망), 그 밖에 페이지에 이름이 없는 2곳",
    how: "일본 상품 페이지는 SoftBank를 주 통신망으로 명시하고 “+2 others”를 표시하지만 그 이름은 밝히지 않습니다. 데이터 전용.",
    checked: dateLabel("2026-11-01", LOCALE),
  },
  {
    provider: "eSIM Go(Breeze)",
    carriers: "NTT Docomo, KDDI, Rakuten Mobile, SoftBank",
    how: "“기기가 가장 강한 신호에 자동으로 연결됩니다.” 데이터 전용 — “문자나 음성 통화는 포함되지 않습니다.”",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile — 하루 3 GB 요금제",
    carriers: "Docomo 5G",
    how: "일일 한도형 요금제. 핫스팟 가능, 전화번호·음성·문자 없음.",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile — 무제한, 음성+데이터",
    carriers: "au(KDDI) 5G",
    how: "무제한은 데이터 전용, 음성+데이터는 일본 번호가 추가되며 대면 신분 확인이 필요합니다.",
    checked: SPECS_CHECKED,
  },
  {
    provider: koKlookEsim.label,
    carriers: "SoftBank 5G(1일 단위 요금제) / IIJ(Docomo) 4G LTE(총량형 요금제)",
    how: "전화번호 없음 — 데이터 전용. 테더링: 지원. 상품 페이지 자체가 아니라 클룩 자체 상품 데이터 기준입니다.",
    checked: KLOOK_SPECS_CHECKED,
  },
];

const unlimitedRows = [
  {
    plan: "Simbye Unlimited",
    full: "하루 2 GB",
    after: "가격 정보 기준 “이후 1 Mbps로 무제한”",
    hotspot: "“허용 — 노트북, 태블릿, 동행자용”",
    checked: SIMBYE_CHECKED,
  },
  {
    plan: "Airalo Unlimited(일본)",
    full: "하루 3 GB",
    after: "“그날 남은 시간 동안” 1 Mbps. 용량은 “eSIM을 활성화한 시각부터 계산해 24시간마다 초기화”",
    hotspot: "“테더링이나 연결 기기 수에 제한 없음”",
    checked: SPECS_CHECKED,
  },
  {
    plan: "eSIM Go Premium Unlimited",
    full: "5일 30 GB, 10일 60 GB, 15일 90 GB",
    after: "“속도가 낮아지지만 720p 영상 스트리밍에는 여전히 충분”",
    hotspot: "“모든 요금제에서 테더링”, 추가 요금 없음",
    checked: SPECS_CHECKED,
  },
  {
    plan: "Sakura Mobile Unlimited(au 5G)",
    full: "휴대폰에서 직접 쓰는 데이터는 무제한",
    after: "확인한 페이지에 기기 사용량 기준 미공개",
    hotspot: "요금제 기간에 따라 2 GB~30 GB 한도",
    checked: SPECS_CHECKED,
  },
  {
    plan: "Sakura Mobile 하루 3 GB(Docomo 5G)",
    full: "하루 3 GB",
    after: "“하루 3 GB를 쓴 뒤에는 속도가 200 Kbps로 제한됩니다”",
    hotspot: "가능",
    checked: SPECS_CHECKED,
  },
  {
    plan: `${koKlookEsim.label} — 무제한 요금제`,
    full: "하루 10 GB",
    after: "상품 정보 기준, 하루 10 GB 이후 128 kbps",
    hotspot: "지원",
    checked: KLOOK_SPECS_CHECKED,
  },
  {
    plan: "Holafly 무제한",
    full: "일일 기준 공개 없음",
    after: "“Fair Usage Policy”를 적용하며, 속도 제한은 한 번에 하루를 넘지 않고 이후 원래 속도로 돌아간다고 안내합니다",
    hotspot: "하루 1 GB 공유",
    checked: "2026년 11월 6일",
  },
];

const timingRows = [
  {
    provider: "Simbye",
    starts: "“요금제는 eSIM이 목적지에서 처음 연결될 때부터 계산됩니다.”",
    install: "가능 — 일본 페이지는 출국 전에 와이파이로 설치하라고 안내합니다",
    refund: "설치·활성화하지 않았고 데이터를 쓰지 않았다면 구매 후 30일 이내 요청 시 전액 환불. 환불 정책 참고",
    checked: SIMBYE_CHECKED,
  },
  {
    provider: "Airalo",
    starts:
      "“eSIM 패키지의 유효 기간은 다음 중 하나가 일어날 때 시작됩니다: 커버리지 지역의 지원 네트워크에 연결할 때, 또는 eSIM을 설치할 때.” 대부분의 패키지는 네트워크 연결 시점에 시작하며, 어느 쪽인지는 각 패키지의 유효 기간 정책에 적혀 있습니다.",
    install: "대부분의 요금제는 출국 전에 설치해도 문제없음 — 먼저 패키지의 유효 기간 정책을 확인",
    refund: "Airalo 계정에서 환불 요청 가능. 만료되었거나 다 쓴 eSIM은 대상 아님",
    checked: SPECS_CHECKED,
  },
  {
    provider: "eSIM Go(Breeze)",
    starts: "“요금제 유효 기간은 구매 시점이 아니라 일본에서 처음 데이터를 쓸 때 시작됩니다.”",
    install: "“출발 전에 설치하세요.”",
    refund: "“데이터를 전혀 쓰지 않았다면 이유를 묻지 않고 전액 환불됩니다”, 영업일 기준 3일 안에 처리",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile",
    starts:
      "무제한 데이터 전용: “일본에 도착하면 이용 기간이 시작”. 하루 3 GB 데이터: “eSIM을 설치하면 이용 기간이 시작”. 음성+데이터: 도착 후 대면 신분 확인을 마친 뒤.",
    install: "하루 3 GB 요금제는 도착해서 설치 — 집에서 설치하면 기간이 시작됩니다",
    refund: "확인한 페이지에 환불 조건 미공개",
    checked: SPECS_CHECKED,
  },
  {
    provider: koKlookEsim.label,
    starts: `QR 코드가 담긴 바우처로 판매(“${klookEsim.listingTitle}”). 확인할 수 있는 상품 데이터에 시작 규칙 미기재`,
    install: "미기재 — 상품 페이지에서 확인",
    refund: "미기재 — 상품 페이지에서 확인",
    checked: KLOOK_SPECS_CHECKED,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "일본 이심 추천: 어떤 걸 사야 하나요?",
    a: `데이터만 필요하다면 1순위는 Simbye입니다. 10 GB가 ${tenGb("simbye")}로 정가를 비교한 5개 업체 중 가장 저렴하고, NTT docomo·KDDI/au·SoftBank·Rakuten Mobile 망을 쓰며 테더링도 됩니다. 일본 전화번호가 필요하면 음성+데이터 eSIM을 파는 Sakura Mobile, 대용량은 eSIM Go, 테더링 제한 없는 무제한은 Airalo가 맞습니다. 가격 확인일 ${pricesCheckedAt}.`,
  },
  {
    q: "일본 eSIM 통신사(도코모·소프트뱅크·KDDI) 차이는?",
    a: `도쿄–교토–오사카 같은 도시와 신칸센 구간에서는 체감 차이가 거의 없고, 지방과 산간에서는 도코모(Docomo) 커버리지가 가장 넓습니다. 각 사 가격 정보 기준으로 Simbye는 NTT docomo·KDDI/au·SoftBank·Rakuten Mobile, eSIM Go는 Docomo·SoftBank, Airalo는 SoftBank가 주 통신망, Holafly는 SoftBank·KDDI입니다(${pricesCheckedAt} 확인). 일정이 주요 도시를 벗어난다면 도코모를 쓰는 요금제를 고르세요.`,
  },
  {
    q: "eSIM이란 무엇이고 일본에서 꼭 필요한가요?",
    a: "eSIM은 휴대폰에 내장된 디지털 SIM입니다. 물리 카드가 필요 없습니다. QR 코드로 프로필을 내려받으면 바로 쓸 수 있습니다. 일본 여행에 eSIM이 반드시 필요한 것은 아니지만 단연 가장 편한 선택입니다. 출발 전에 사서 설치하고, 착륙하면 활성화하면 됩니다.",
  },
  {
    q: "어떤 휴대폰이 일본에서 eSIM을 지원하나요?",
    a: "최신 휴대폰은 대부분 지원합니다. iPhone XS 이후, 구글 픽셀 3 이후, 삼성 갤럭시 S20 이후, 그 밖의 많은 안드로이드 플래그십이 해당됩니다. 설정 → 정보에서 확인하세요. 주의: 통신사 잠금이 걸린 일부 기기는 eSIM을 지원하지 않을 수 있습니다.",
  },
  {
    q: "일본 eSIM을 쓰는 동안 한국 SIM을 계속 켜 둘 수 있나요?",
    a: "가능합니다. eSIM의 가장 큰 장점 중 하나입니다. 듀얼 SIM 기기는 대부분 두 개의 SIM을 동시에 쓸 수 있습니다. 기존 SIM으로 전화와 문자를 계속 받고, 데이터는 일본 eSIM이 담당하게 하면 됩니다.",
  },
  {
    q: "일본 이심 추천: Airalo와 Holafly 중 어느 쪽이 나을까요?",
    a: "대부분에게는 Airalo가 낫습니다. 더 저렴하고 용량 선택이 유연하며, Airalo의 일본 요금제는 SoftBank를 주 통신망으로 씁니다(2026년 11월 1일 확인). 정말로 무제한이 필요하고(원격 근무, 영상 시청이 많음) 이번 여행에서 더 높은 요금을 낼 만한 이유가 있다면 Holafly가 앞섭니다.",
  },
  {
    q: "일본에 도착한 뒤 eSIM이 작동하지 않으면 어떻게 하나요?",
    a: "먼저 그 eSIM 프로필의 데이터 로밍이 켜져 있는지 확인하세요. 그래도 신호가 없으면 비행기 모드를 한 번 켜고 끄면 네트워크를 다시 검색합니다. 여기 실린 모든 사업자는 24시간 실시간 채팅 상담을 제공하며, Airalo와 Holafly가 특히 응답이 빠릅니다.",
  },
  {
    q: "일본 eSIM과 물리 SIM 카드는 무엇이 다른가요?",
    a: "둘 다 일본 모바일 데이터를 제공하지만, eSIM이 설정이 더 빠르고(공항 줄이 없습니다) 대체로 더 저렴하며 출발 전에 미리 살 수 있습니다. 물리 SIM 카드는 도착한 뒤 공항 카운터나 자판기에서 기다려야 합니다. 물리 SIM의 주요 장점은 eSIM을 지원하지 않는 기기에서도 쓸 수 있다는 것입니다.",
  },
  {
    q: "eSIM을 사지 않고 통신사 로밍을 그냥 쓰면 안 될까요?",
    a: "쓸 수 있지만 비쌉니다. 해외 통신사 대부분이 일본 로밍에 하루 $10~15를 받습니다. 10일 일정이면 데이터만 $100~150인데, 일본 eSIM 요금제 하나는 $9~18입니다. 통신사에 일본에서 쓸 수 있는 정액 로밍 상품이 없다면, 전용 일본 eSIM이 거의 항상 더 저렴합니다.",
  },
  {
    q: "Airalo는 일본에서 어느 통신망을 쓰나요?",
    a: "Airalo의 공식 일본 페이지에 표시되는 통신망입니다. SoftBank가 주 통신망이고, 그 밖에 “+2 others”가 있지만 페이지에 이름이 나오지 않아 이 가이드도 이름을 적지 않습니다. 2026년 11월 1일 확인. 특정 통신사가 일정에 중요하다면 구매 전에 그 페이지의 통신망 목록을 열어 보세요.",
  },
  {
    q: "Sakura Mobile은 무엇이고 누구에게 맞나요?",
    a: "Sakura Mobile은 관광객과 장기 체류자를 위한 SIM 카드와 eSIM을 모두 제공하는 일본 현지 사업자입니다. Airalo나 Holafly와 달리 음성 통화 기능, 영어 고객 지원, 최대 90일 체류에 맞는 요금제가 있습니다. Docomo(일본 최대 통신사)의 통신망을 씁니다. 저렴한 eSIM보다 비싸지만 일본 전화번호가 필요하거나 장기 체류를 계획하는 사람에게는 최선의 선택입니다.",
  },
  {
    q: "일본 여행에 데이터는 얼마나 필요한가요?",
    a: "일반적인 관광 — 구글 지도, 메신저, 가벼운 웹 서핑, 사진 몇 장 — 이라면 하루 1 GB가 합리적인 추정치입니다. 10일 일정이면 약 8~10 GB를 씁니다. 운전 중 지도를 자주 쓰거나 영상을 시청하거나 원격 근무를 한다면 하루 2 GB 이상으로 잡으세요. 대부분의 여행자는 일주일 일본 여행에 3~5 GB 요금제면 충분하다고 느낍니다.",
  },
  {
    q: "일본 eSIM 가격 비교: 얼마부터 시작하나요?",
    a: `일본 eSIM 가격은 사업자와 요금제 용량에 따라 다릅니다(확인일 ${pricesCheckedAt}). 절약형: Simbye ${priceFromLabel("simbye")}부터, eSIM Go ${priceFromLabel("esimgo")}부터, Airalo ${priceFromLabel("airalo")}부터. 중간: 5 GB 요금제가 Simbye ${priceAtLeastLabel("simbye", 5)}, eSIM Go ${priceAtLeastLabel("esimgo", 5)}, Airalo ${priceAtLeastLabel("airalo", 5)}. 무제한: Holafly ${unlimitedFromLabel("holafly")}부터. 영어 전화 지원이 되는 일본 현지 사업자: Sakura Mobile ${priceFromLabel("sakura")}부터. 일반적인 일주일 관광이라면 $10~20을 예상하세요.`,
  },
  {
    q: "일본 여행에서 무제한 데이터는 그만한 값어치가 있을까요?",
    a: "대부분의 관광객에게는 아닙니다. 일본은 호텔, 편의점, 관광지의 와이파이 커버리지가 뛰어납니다. 3~5 GB 요금제면 일반적인 일주일 동안의 지도, 메신저, 웹 사용을 감당합니다. 무제한 요금제(Holafly 등)는 2~3배 비싸고, 주로 영상을 많이 보거나 영상 통화가 잦거나 와이파이가 약한 지역에 가는 헤비 유저에게 의미가 있습니다. 확신이 없다면 5 GB 요금제로 시작하고 더 필요한지 판단하세요.",
  },
  {
    q: "일본에 도착한 뒤에 eSIM을 충전할 수 있나요?",
    a: "가능합니다. 대부분의 사업자는 새 QR 코드 없이 앱에서 데이터를 추가 구매할 수 있습니다. Airalo는 앱에서 추가 요금제를 사면 기존 eSIM 프로필에 자동으로 충전됩니다. eSIM Go와 Sakura Mobile도 비슷한 방법으로 데이터를 추가할 수 있습니다. Holafly의 무제한 요금제는 기간이 정해져 있어 더 오래 머물면 새 요금제를 사야 합니다.",
  },
  {
    q: "일본 eSIM 요금제에 통화와 문자가 포함되나요?",
    a: "Simbye, Airalo, eSIM Go, Holafly를 포함한 여행자용 eSIM 요금제는 대부분 데이터 전용이라 음성 통화나 문자가 없습니다. 일본에서 통화는 왓츠앱, 라인, 페이스타임을 데이터로 쓰면 됩니다. 음성 통화가 되는 일본 전화번호가 정말 필요하다면 주요 사업자 중에서는 Sakura Mobile이 최선입니다.",
  },
  {
    q: "일본 eSIM은 언제 활성화해야 하나요?",
    a: "eSIM 설치(QR 코드 스캔)는 집을 나서기 전에 하세요. 2~5분이 걸리고 와이파이 연결이 필요합니다. 다만 대부분의 요금제는 프로필을 설치한 시점이 아니라 일본에서 처음 네트워크에 연결한 시점부터 일수를 셉니다. 일본에 도착하면 모바일 데이터 회선을 일본 eSIM으로 전환해, 필요한 시점부터 요금제가 시작되게 하세요.",
  },
  {
    q: "일본 eSIM 통신사 추천: 커버리지가 가장 넓은 곳은?",
    a: "Docomo가 지방 커버리지가 가장 넓습니다. 그래서 일정이 주요 도시를 벗어난다면 통신망을 확인하고 고를 만하며, Simbye, eSIM Go, Sakura Mobile이 모두 Docomo를 씁니다. SoftBank와 KDDI(Holafly가 사용하며, SoftBank는 Airalo 일본 페이지의 주 통신망이기도 함)는 도시와 주요 관광 경로에서 안정적입니다. 일반적인 도쿄–교토–오사카–히로시마 여행 경로라면 어느 곳이든 잘 터져서 차이를 느끼지 못할 것입니다.",
  },
  {
    q: "일본 SIM이나 eSIM은 언제 사는 게 좋나요?",
    a: "eSIM은 출발 전에 사 두고 일본에 도착한 뒤 활성화하면 됩니다. 기다릴 이유가 없고 매진되지도 않습니다. 반면 유심(물리 SIM)은 사정이 다릅니다. 공항 카운터와 자판기는 성수기에 인기 상품이 실제로 동나고, Sakura Mobile SIM을 공항이나 호텔에서 받도록 미리 주문하면 도착해서 사는 것보다 저렴하고 현지 재고를 걱정하지 않아도 됩니다.",
  },
  {
    q: "eSIM으로 일본 전화번호를 받을 수 있나요?",
    a: `Sakura Mobile에서만 가능합니다. 음성+데이터 eSIM은 au(KDDI) 5G에 하루 3 GB 고속 데이터, 일본 번호, 음성 통화와 문자를 포함합니다 — 통화 시간은 1~10일 요금제 120분, 11~30일 240분, 31~60일 360분, 61~90일 480분 — 다만 일본에서 대면 신분 확인이 필요하고, 이용 기간은 신원 확인이 끝난 뒤부터 시작됩니다. Simbye, Airalo, eSIM Go, 클룩 상품은 일본 요금제가 모두 데이터 전용입니다: 일본 번호, 문자, 음성 모두 없습니다. 인증번호 문자만 받으면 된다면 다른 슬롯의 한국 SIM을 켜 두고 데이터는 eSIM에 맡기세요. 확인일 ${SPECS_CHECKED}.`,
  },
  {
    q: "무제한 데이터도 속도가 느려지나요?",
    a: `네. 일본의 모든 “무제한” 요금제에는 공개된 기준이 있습니다. Simbye는 하루 2 GB까지 최고 속도, 그 뒤 1 Mbps입니다. Airalo는 3 GB를 넘기면 그날 남은 시간 동안 1 Mbps로 느려지고, 용량은 “eSIM을 활성화한 시각부터 계산해 24시간마다 초기화”됩니다. eSIM Go의 Premium Unlimited는 5일 30 GB, 10일 60 GB, 15일 90 GB까지 최고 속도이고, 그 뒤에는 “속도가 낮아지지만 720p 영상 스트리밍에는 여전히 충분”합니다. Sakura Mobile의 무제한 요금제는 휴대폰에서 직접 쓰는 데이터는 무제한이지만 핫스팟은 요금제 기간에 따라 2~30 GB로 제한되고, 하루 3 GB 요금제는 하루 3 GB를 넘기면 200 kbps로 떨어집니다. 클룩 상품의 무제한 요금제는 하루 10 GB까지 최고 속도, 그 뒤 128 kbps입니다. Airalo와 eSIM Go 수치는 ${SPECS_CHECKED} 확인, 클룩 수치는 ${KLOOK_SPECS_CHECKED} 상품 데이터 기준입니다.`,
  },
  {
    q: "일본 eSIM을 한 번도 안 쓰면 환불받을 수 있나요?",
    a: `사업자에 따라 다릅니다. Simbye의 환불 정책은 설치하거나 활성화한 적이 없고 데이터를 쓰지 않은 eSIM에 대해, 구매 후 30일 이내에 요청하면 전액 환불해 줍니다. eSIM Go는 “데이터를 전혀 쓰지 않았다면 이유를 묻지 않고 전액 환불”된다고 밝히며, 영업일 기준 3일 안에 처리됩니다. Airalo는 계정에서 환불을 요청할 수 있고, 만료되었거나 다 쓴 eSIM은 대상이 아니라고 안내합니다. Sakura Mobile은 여행용 eSIM 페이지에 환불 조건을 공개하지 않았고, 클룩 상품의 조건은 상품 페이지에서 확인하세요. 여기서 주의할 점은 비용보다 이용 기간이 시작되는 시점입니다: eSIM Go의 유효 기간은 “구매 시점이 아니라 일본에서 처음 데이터를 쓸 때 시작”되지만, Sakura Mobile의 하루 3 GB 요금제는 “eSIM을 설치하면” 시작됩니다 — 그러니 이 요금제는 집이 아니라 도착해서 설치하세요. 확인일 ${SPECS_CHECKED}.`,
  },
  {
    q: "일본 eSIM 속도가 느린 이유는 무엇인가요?",
    a: "몇 가지 가능성이 있습니다. 데이터 용량을 거의 다 썼거나(많은 요금제가 기준을 넘으면 속도를 낮춥니다), 커버리지가 약한 곳(터널, 산간)에 있거나, 시부야나 교토역처럼 붐비는 관광지에서 네트워크가 혼잡한 경우입니다. 비행기 모드를 한 번 켜고 꺼 보세요. 데이터 한도가 남아 있는데도 속도가 나아지지 않으면 사업자 지원에 문의하세요.",
  },
];

/** One Klook eSIM slot, for the two places on the page where a reader has just picked a plan. */
function KlookEsimSlot({ why }: { why: string }) {
  return (
    <div className={styles.pickTarget} style={{ marginTop: "1.25rem", flexWrap: "wrap", gap: "0.6rem" }}>
      <span className={styles.pickTargetLabel}>클룩에서도:</span>
      <span>
        {why}{" "}
        <KlookLink
          href={koKlookEsim.url}
          target="_blank"
          rel={KLOOK_REL}
          style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
        >
          클룩 eSIM 가격 보기 →
        </KlookLink>
      </span>
    </div>
  );
}

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "일본 이심 추천" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoBestEsimJapanPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems.slice(0, 5)) }} />
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

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            가장 추천하는 서비스는 Simbye입니다. 10 GB가 {tenGb("simbye")}로 이 페이지에서 비교한 업체 중 정가가 가장 저렴하고, NTT
            docomo, KDDI/au, SoftBank, Rakuten Mobile 네 통신망을 쓰며 테더링도 됩니다.
          </p>
          <div className={styles.heroBadges}>
            {["가격 매일 확인", "eSIM 6곳 비교", "독립 평가"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* The answer in two sentences, before any table. The price date lives here rather than in the hero. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>
              일본 이심 추천 1순위는 Simbye로, 10 GB 요금제가 {tenGb("simbye")}이며 정가를 비교한 5개 업체 중 가장
              저렴합니다.
            </strong>{" "}
            Simbye는 NTT docomo, KDDI/au, SoftBank, Rakuten Mobile 4개 통신망 중 이용 가능한 망에 자동으로
            연결되고 테더링도 허용됩니다. 일본 전화번호가 필요하다면 6곳 중 음성+데이터 eSIM을 파는 곳은 Sakura
            Mobile뿐입니다. 가격 확인일 {pricesCheckedAt}, 페이지 업데이트 {updatedLabel}.
          </p>
        </section>

        <EsimUseCaseTable copy={esimPicksCopy["ko"]} checkedLabel={pricesCheckedAt} formatPlan={planName} klookLocale="ko" />

        {/* The answer, before the table — a pick per kind of trip, with the numbers in it. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            일반적인 관광 목적으로 <strong>10일 이하</strong> 머문다면{" "}
            <strong>Simbye의 {planLabel(SHORT_TRIP_PLAN)}</strong>를 추천합니다 — 10 GB면 10일 동안 하루 1 GB씩 쓸 수 있고,
            이 페이지에서 비교한 요금 중 정가가 가장 낮으며, 가격 정보에는 NTT docomo, KDDI/au, SoftBank, Rakuten Mobile이
            올라 있습니다.{" "}
            <strong>2~4주</strong>라면 같은 사업자의 <strong>{planLabel(LONG_TRIP_PLAN)}</strong>로 같은 속도의 데이터를
            20일 동안 사용할 수 있습니다. 용량이 정해진 요금제가 아니라 <strong>무제한</strong>을 원한다면 Simbye의{" "}
            <strong>{planLabel(SIMBYE_UNLIMITED)}</strong>가 일주일 기준 가장 싸지만 하루 2 GB까지 최고 속도, 그 뒤
            1 Mbps입니다. eSIM Go의{" "}
            <strong>{planLabel(ESIMGO_UNLIMITED)}</strong>는 5일 30 GB 또는 10일 60 GB까지 최고 속도이고 그 뒤에는
            720p 영상을 볼 수 있는 수준으로 속도가 내려가며, Airalo의 <strong>{planLabel(AIRALO_UNLIMITED)}</strong>는 하루
            3 GB까지 최고 속도, 그 뒤 24시간 초기화 때까지 1 Mbps이고 테더링 제한이 없습니다.{" "}
            <strong>일본 전화번호</strong>가 포함된 요금제를 파는 곳은 <strong>Sakura Mobile</strong>뿐입니다: au(KDDI) 5G의
            음성+데이터 eSIM으로 하루 3 GB, 요금제 기간에 따라 통화 120~480분, 그리고 도착 후 대면 신분 확인이
            필요합니다.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            각 사업자 공식 사이트에서 가격을 매일 자동으로 확인하며, 표시된 금액은 {pricesCheckedAt}에 확인한 값입니다.
            통신망, 공정 사용 기준, 핫스팟 한도, 전화번호 제공 여부, 환불 규정은 {SPECS_CHECKED}에 확인했습니다(Simbye는 {SIMBYE_CHECKED}, simbye.com과 가격 정보 기준).
            클룩 항목은 {KLOOK_SPECS_CHECKED} 클룩 자체 상품 데이터 기준입니다.
          </p>
        </section>

        <EsimCtaTop />

        {/* Quick Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>한눈에</span>
          <h2 className={styles.sectionTitle}>빠른 비교</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["사업자", "어울리는 경우", "최저가", "가장 저렴한 요금제", "통신망", "음성 통화·문자", "유심(물리 SIM)", "평점", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topPicks.map(({ id, esimId, bestFor, ctaLabel, ctaAlt }) => {
                    const sim = simCards.find((s) => s.id === id)!;
                    const cheapest = cheapestPlan(esimId);
                    const affiliateUrl = getProvider(ctaAlt?.esimId ?? esimId).affiliateUrl;
                    const url = affiliateUrl === "#" ? PLANS_HREF : affiliateUrl;
                    const isExternal = affiliateUrl !== "#";
                    const label = ctaAlt?.ctaLabel ?? ctaLabel;
                    return (
                      <tr key={id}>
                        <td className={styles.tdProvider}>{sim.provider}</td>
                        <td className={styles.tdBestFor}>{bestFor}</td>
                        <td className={styles.tdPrice}>{cheapest ? formatUsd(cheapest.priceUsd) : "—"}</td>
                        <td className={styles.tdNetwork}>{cheapest ? planName(cheapest.name) : "—"}</td>
                        <td className={styles.tdNetwork}>{getProvider(esimId).network}</td>
                        <td>{sim.voiceCall ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>{sim.physicalSim ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>
                          <span className={styles.tdRating}>
                            {sim.rating !== null && <span style={{ color: "var(--accent)" }}>★</span>}
                            {sim.rating ?? "—"}
                          </span>
                        </td>
                        <td>
                          {isExternal ? (
                            <a
                              href={url}
                              className={styles.tdLink}
                              target="_blank"
                              rel={ctaAlt || esimId === "simbye" ? "sponsored nofollow noopener" : "noopener noreferrer nofollow"}
                            >
                              {label}
                            </a>
                          ) : (
                            <Link href={PLANS_HREF} className={styles.tdLink}>
                              {label}
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Unranked extra — Klook's product page blocks automated price reads. */}
                  <tr>
                    <td className={styles.tdProvider}>{koKlookEsim.label}</td>
                    <td className={styles.tdBestFor}>이미 클룩에서 티켓을 예약하는 사람</td>
                    <td className={tools.tdMuted}>클룩에서 확인</td>
                    <td className={tools.tdMuted}>—</td>
                    <td className={tools.tdMuted}>상품 페이지에 미기재</td>
                    <td><span className={styles.no}>✗</span></td>
                    <td><span className={styles.no}>✗</span></td>
                    <td className={tools.tdMuted}>순위 외</td>
                    <td>
                      <KlookLink href={koKlookEsim.url} className={styles.tdLink} target="_blank" rel={KLOOK_REL}>
                        클룩 eSIM 가격 보기 →
                      </KlookLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.6rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            마지막 확인: {latest ? latest.slice(0, 10) : "—"}. 공식 요금 페이지: simbye.com/products/esim-japan,
            www.airalo.com/japan-esim, esim.holafly.com/esim-japan/, breezesim.com/products/esim-japan,
            www.sakuramobile.jp/travel/esim/
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            클룩 행은 일부러 순위 밖에 두었습니다. 위의 다섯 곳은 매일 각 사 사이트에서 읽어 오는 가격으로 순위를
            매기는데, 클룩의 eSIM 가격은 날짜에 따라 달라지기 때문에({KLOOK_CHECKED} 확인) 다른 업체와
            같은 조건으로 비교할 가격이나 용량 구분이 없습니다. 상품 페이지를 열어 현재 요금제를 확인하세요.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            <span className={tools.liveBadge}><span className={tools.liveDot} /> 가격 매일 확인</span>
            <span>
              ‘최저가’는 {pricesCheckedAt} 기준 각 사업자의 가장 싼 일본 요금제입니다.{" "}
              <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>모든 요금제를 GB당 단가로 정렬해 보기(영어) →</Link>
            </span>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            음성 통화 요금제나 유심(물리 SIM)을 파는 곳은 Sakura Mobile뿐이고, 나머지 네 곳은 데이터 전용 eSIM입니다. 일본
            전화번호가 필요하거나 기기가 eSIM을 아예 쓸 수 없다면, 가격을 비교하기도 전에 선택할 수 있는 업체가 하나로 좁혀집니다.
            참고:{" "}
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" className={tools.inlineLink}>
              일본 SIM 카드 vs eSIM(영어) →
            </Link>
          </p>
        </section>

        {/* Q: What is the best eSIM for Japan? — the pick-by-itinerary table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>짧은 답</span>
          <h2 className={styles.sectionTitle}>일본 eSIM 추천: 어떤 요금제를 골라야 하나요?</h2>
          <p className={styles.bodyText}>
            <strong>
              데이터만 필요하면 Simbye(10 GB {tenGb("simbye")}), 일본 전화번호가 필요하면 Sakura Mobile을 선택하세요.
            </strong>{" "}
            용량이 아주 많이 필요하면 eSIM Go, 테더링 제한 없는 무제한을 원하면 Airalo입니다. 가격 확인일 {pricesCheckedAt}.
            여행 기간별로 고르려면{" "}
            <Link href="/guides/esim/japan-esim-10-days" className={tools.inlineLink}>10일 eSIM(영어)</Link>과{" "}
            <Link href="/guides/esim/japan-esim-2-weeks" className={tools.inlineLink}>14일 eSIM(영어)</Link> 가이드를 참고하세요.
          </p>
          <p className={styles.bodyText}>
            하나로 정해진 정답은 없습니다. 여행 기간과 데이터 사용량에 따라 적합한 통신사가 다르기 때문입니다. Simbye는 용량제
            정가가 가장 낮고, eSIM Go는 용량이 가장 크며, Airalo는 테더링 제한이 없는 무제한 요금제를 원할 때
            고를 만하며, Sakura Mobile은 일본 전화번호를 얻는 유일한 방법입니다. 여행 일정에 맞는 요금제를 선택하세요.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>내 여행</th>
                    <th>살 것</th>
                    <th>이유 — 일수, GB, 통신사, 가격</th>
                  </tr>
                </thead>
                <tbody>
                  {itineraryPicks.map((row) => (
                    <tr key={row.trip}>
                      <td className={styles.tdProvider} style={{ minWidth: "170px" }}>{row.trip}</td>
                      <td className={styles.tdBestFor} style={{ minWidth: "180px" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "300px" }}>{row.detail()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            가격은 {pricesCheckedAt} 기준. 통신사 목록, 공정 사용 기준, 지역 eSIM의 국가 수는 {SPECS_CHECKED}에
            각 사업자 공식 사이트에서 확인했습니다.
          </p>
          <KlookEsimSlot why="이번 여행의 티켓과 교통편이 이미 클룩 장바구니에 있다면, 클룩 자체 일본 eSIM도 같은 장바구니에 담아 한 번에 결제할 수 있습니다 — 1일 단위 요금제는 SoftBank 5G, 총량형 요금제는 IIJ(Docomo) 4G LTE, 테더링 가능. US$1.05부터라는 시작 가격에 요금제가 표시되지 않아 여기서는 순위에 넣지 않았으니, 열어서 현재 요금제를 확인하세요." />
        </section>

        {/* Q: Which eSIM is best for a 2-week trip? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>2주 여행</span>
          <h2 className={styles.sectionTitle}>일본 2주 여행에는 어떤 eSIM이 좋을까?</h2>
          <p className={styles.bodyText}>
            <strong>{tripPlanLabel(14, 14)}</strong>이 하루 1 GB씩 14일 동안 쓸 수 있는 판매 중인 가장 저렴한 요금제이고,
            영상보다는 지도, 메신저, 사진 몇 장 정도라면 <strong>{tripPlanLabel(14, 7)}</strong>로 충분합니다. 둘
            다 30일 요금제라 2주 여행에서 제약은 유효 기간이 아니라 용량입니다.
          </p>
          <p className={styles.bodyText}>
            두 가지 대안은 누구에게나가 아니라, 특정한 이유가 있을 때만 추가 비용을 들일 만합니다. Sakura Mobile의{" "}
            {planLabel(allEsimPlans.find((p) => p.id === "sakura-45-gb-15-days") ?? null)}는 아껴 써야 하는 총용량
            방식 대신 Docomo 5G로 매일 아침 3 GB를 주므로, 산간이나 작은 섬이 포함된 2주에 잘 맞습니다. 그리고
            2주 출장에 노트북 테더링이 필요하다면 {planLabel(cheapestUnlimited("esimgo", 15))} 또는{" "}
            {planLabel(cheapestUnlimited("airalo", 15))}로 같은 기간 무제한을 살 수 있습니다 — 각각 어디까지
            느려지는지는 아래 속도 제한 표를 보세요.
          </p>
        </section>

        {/* Q: How much data do I need in Japan? — the days-to-GB table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>용량 정하기</span>
          <h2 className={styles.sectionTitle}>일본에서 데이터는 얼마나 필요할까?</h2>
          <p className={styles.bodyText}>
            지도, 메신저, 사진 몇 장, 가끔 시간표 검색이라면 <strong>하루 0.5 GB</strong>, 영상 통화, SNS 영상,
            음악 스트리밍이 섞이면 <strong>하루 1 GB</strong>로 잡으세요. 그러면 10일 여행은 5~10 GB, 2주는
            7~14 GB, 3주는 10.5~21 GB입니다. 사업자들이 헤비 유저로 분류하는 기준보다 여유 있게 적은 양입니다.
            Airalo의 공정 사용 기준은 하루 3 GB, Sakura Mobile의 일일 한도는 3 GB, 클룩 상품의 무제한 요금제는
            하루 10 GB까지 최고 속도입니다.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>여행 기간</th>
                    <th>하루 0.5 GB 기준</th>
                    <th>하루 1 GB 기준</th>
                    <th>하루 0.5 GB를 충족하는 가장 저렴한 요금제</th>
                    <th>하루 1 GB를 충족하는 가장 저렴한 요금제</th>
                  </tr>
                </thead>
                <tbody>
                  {dataNeedRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider}>{row.days}일</td>
                      <td className={styles.tdPrice}>{row.light} GB</td>
                      <td className={styles.tdPrice}>{row.normal} GB</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>
                        {tripPlanLabel(row.days, row.light)}
                      </td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>
                        {tripPlanLabel(row.days, row.normal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            GB 열은 위 계획 수치로 계산한 값이고, 요금제 열은 {pricesCheckedAt}에 읽은 가격 중 그 용량을 충족하는
            판매 중인 가장 저렴한 요금제입니다. 이 사이트에는 Holafly 구매 링크가 없어 표의 이 두 열에서는
            제외했습니다. 일일 한도형 요금제는 표시된 총량이 아니라 한도 × 여행 일수로 계산했는데, 그래야 고정
            용량 요금제와 공정하게 나란히 놓을 수 있습니다.{" "}
            <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>
              모든 요금제를 GB당 단가로 정렬해 보기(영어) →
            </Link>
          </p>
          <KlookEsimSlot why="클룩 자체 일본 eSIM은 500 MB부터 50 GB까지의 단계와 무제한 옵션으로 판매되어 같은 용량대를 모두 갖추고 있습니다 — US$1.05는 일수와 데이터를 고르기 전의 시작 가격이라 여기서는 요금제별 가격을 싣지 않습니다." />
        </section>

        {/* Q: Which network is best in Japan? — carrier table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>통신망</span>
          <h2 className={styles.sectionTitle}>일본 eSIM 통신사(도코모·소프트뱅크·KDDI) 차이는?</h2>
          <p className={styles.bodyText}>
            <strong>도시에서는 차이가 거의 없고, 지방에서는 도코모(Docomo) 통신망이 가장 넓습니다.</strong> Simbye는 도코모·KDDI/au·SoftBank·Rakuten
            중 잡히는 망에 자동 연결되고, eSIM Go는 Docomo·SoftBank, Airalo는 SoftBank가 주 통신망, Holafly는 SoftBank·KDDI입니다
            (각 사 가격 정보 기준, {pricesCheckedAt} 확인).
          </p>
          <p className={styles.bodyText}>
            도쿄–교토–오사카–히로시마 경로에서는 실질적인 차이가 없습니다 — 세 통신망 모두 도시와 신칸센 구간을
            지원합니다. 차이는 도시와 신칸센 구간 밖에서 나타나며, 일본 현지 사업자들이 지방용 요금제에 쓰는 통신망이
            Docomo입니다. 그리고 확인한 페이지 어디에도 커버리지 비율을 공개한 사업자가 없으므로, 제대로 고르려면
            홍보 문구가 아니라 요금제가 실제로 사용하는 통신망을 확인해야 합니다. 결제 페이지에 표시된 브랜드와
            실제로 쓰는 통신망은 다릅니다.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>요금제</th>
                    <th>일본 내 통신사</th>
                    <th>사업자가 밝힌 내용</th>
                    <th>확인일</th>
                  </tr>
                </thead>
                <tbody>
                  {networkRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider} style={{ minWidth: "180px" }}>{row.provider}</td>
                      <td className={styles.tdNetwork} style={{ minWidth: "180px" }}>{row.carriers}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "280px" }}>{row.how}</td>
                      <td className={tools.tdMuted} style={{ whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            통신망을 직접 고르고 싶지 않다면 Simbye와 eSIM Go가 그 고민을 덜어 줍니다. 둘 다 통신사 네 곳을
            명시하고 자동으로 하나를 고릅니다.
          </p>
        </section>

        {/* "Unlimited", throttling and hotspot */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>약관 세부</span>
          <h2 className={styles.sectionTitle}>‘무제한’의 실제 이용 조건과 테더링 가능 여부</h2>
          <p className={styles.bodyText}>
            일본 무제한 요금제 중 최고 속도로 제한 없이 쓸 수 있는 상품은 없습니다. 모두 기준과 그 뒤의 감속 속도를 공개하며,
            가장 큰 차이는 핫스팟 사용 조건입니다 — 한 업체는 테더링에 제한이 없고, 다른 업체는 GB 단위로 제한합니다.
            노트북 테더링 때문에 무제한을 사는 것이라면, 이 항목이 선택을 좌우합니다.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>요금제</th>
                    <th>최고 속도 한도</th>
                    <th>그 이후</th>
                    <th>핫스팟 / 테더링</th>
                    <th>확인일</th>
                  </tr>
                </thead>
                <tbody>
                  {unlimitedRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider} style={{ minWidth: "170px" }}>{row.plan}</td>
                      <td className={styles.tdPrice} style={{ minWidth: "150px", whiteSpace: "normal" }}>{row.full}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "240px" }}>{row.after}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>{row.hotspot}</td>
                      <td className={tools.tdMuted} style={{ whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            따옴표 안의 문구는 마지막 열의 날짜에 확인한 사업자 자신의 표현을 옮긴 것입니다. Holafly는 여섯 번째
            무제한 판매처로 핫스팟으로 공유할 수 있는 데이터를 하루 1 GB로 제한합니다. 위 비교표에는 있지만, 이 사이트가 가입할 수 있는 제휴
            프로그램이 없어 여기서는 링크가 없습니다.{" "}
            <Link href="/guides/esim/japan-esim-unlimited" className={tools.inlineLink}>
              일본 무제한 eSIM 자세히(영어) →
            </Link>
          </p>
        </section>

        {/* Phone numbers, SMS and voice */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>통화와 문자</span>
          <h2 className={styles.sectionTitle}>일본 전화번호, 문자, 음성 통화</h2>
          <p className={styles.bodyText}>
            여섯 곳 중 다섯 곳은 데이터 전용입니다 — 일본 전화번호도 없고 문자·음성 통화도 지원하지 않습니다. eSIM Go는 이를
            분명히 밝히고(“문자나 음성 통화는 포함되지 않습니다. 데이터 전용.”), Simbye의 일본 페이지는 “통화와 문자: 포함되지 않음”이라고 적고 있으며, Airalo의 일본 패키지도 번호 없는
            데이터 전용이며, 클룩 상품은 서비스 유형을 ‘전화번호 없음 — 데이터 전용’으로 설명합니다.
          </p>
          <p className={styles.bodyText}>
            예외는 <strong>Sakura Mobile의 음성+데이터 eSIM</strong>입니다: au(KDDI) 5G, 하루 3 GB 고속 데이터,
            통화와 문자가 되는 일본 번호, 요금제 기간에 따라 늘어나는 통화 시간 — 1~10일 요금제 120분, 11~30일
            240분, 31~60일 360분, 61~90일 480분(2026-11-14 확인). 데이터 전용 요금제에는 없는 조건이 하나 있는데, 일본에서 대면 신분 확인을
            받아야 하고 이용 기간은 착륙 시점이 아니라 신원 확인이 끝난 뒤부터 시작된다는 점입니다. {SPECS_CHECKED}{" "}
            sakuramobile.jp에서 확인했습니다.
          </p>
          <p className={styles.bodyText}>
            은행 인증번호를 문자로 받는 것이 목적이라면 일본 전화번호는 전혀 필요 없습니다. 한국 SIM을 eSIM과 함께
            켜 두고 데이터는 eSIM에 맡기면 됩니다. 통화는 일본에서도 널리 쓰는 라인(LINE)이나 왓츠앱,
            페이스타임으로 하면 됩니다.{" "}
            <Link href="/guides/esim/japan-sim-card-long-term-stay" className={tools.inlineLink}>
              번호가 있는 장기 체류 요금제(영어) →
            </Link>
          </p>
        </section>

        {/* Refunds and install timing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>타이밍</span>
          <h2 className={styles.sectionTitle}>기간은 언제 시작되고, 환불은 언제까지 가능할까</h2>
          <p className={styles.bodyText}>
            미리 설치하는 것이 어떤 사업자에서는 맞는 선택이지만, 다른 사업자에서는 손해가 됩니다. 무엇이 유효
            기간을 시작시키는지 사업자마다 다르기 때문입니다. 이용 기간이 짧은 요금제라면 그 차이로 이용 기간이 하루이틀 줄어들 수 있습니다.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>사업자</th>
                    <th>기간이 시작되는 시점</th>
                    <th>출발 전에 설치해도 될까?</th>
                    <th>미사용 시 환불</th>
                    <th>확인일</th>
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider} style={{ minWidth: "140px" }}>{row.provider}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "300px" }}>{row.starts}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>{row.install}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "220px" }}>{row.refund}</td>
                      <td className={tools.tdMuted} style={{ whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Q: Do I need an eSIM for Japan? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>사기 전에</span>
          <h2 className={styles.sectionTitle}>일본 여행에 eSIM이 꼭 필요할까?</h2>
          <p className={styles.bodyText}>
            아닙니다 — 일본 입국에 eSIM이 필요한 것은 아니고, 호텔, 편의점, 역, 대부분의 카페에서 와이파이를
            쓸 수 있습니다. eSIM이 필요한 때는 와이파이가 없는 이동 중이나 외출 중입니다: 열차 시간표가 바뀐 역 승강장, 지도가 필요한 버스
            정류장, QR 메뉴를 요구하는 식당 대기 줄, 그리고 휴대폰으로 예약 내역을 보여 줘야 하는 입장 — 날짜 지정 티켓만 파는{" "}
            <Link href="/ko/guides/attractions/tokyo-disney-tickets" className={tools.inlineLink}>
              도쿄 디즈니랜드 티켓
            </Link>
            이나 지정 시간에 입장하는{" "}
            <Link href="/ko/guides/attractions/teamlab-tokyo-tickets" className={tools.inlineLink}>
              팀랩 플래닛·보더리스
            </Link>
            , 20분 단위 입장 시간이 적힌 전자 티켓을 보여 주는{" "}
            <Link href="/ko/guides/attractions/shibuya-sky-tickets" className={tools.inlineLink}>
              시부야 스카이 예약
            </Link>
            처럼 미리 예약해 두는 날이 그렇습니다. 이 페이지에서 가장 싼 일본 요금제는 Simbye의{" "}
            {planLabel(cheapestPlan("simbye"))}로, 대부분의 통신사가 받는 로밍 하루 요금보다 쌉니다.
          </p>
          <p className={styles.bodyText}>
            가격을 비교하기 전에 두 가지를 먼저 확인해야 합니다. 기기가 eSIM을 지원하고 통신사 잠금이 풀려 있어야 하며, 요금제는
            여행 기간보다 여행 방식에 맞춰 골라야 합니다 — 5 GB짜리 30일 요금제는 영상 통화가 잦은 2주 여행에는
            잘못된 선택입니다.{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" className={tools.inlineLink}>
              내 휴대폰으로 일본에서 eSIM이 될까?(영어) →
            </Link>
          </p>
        </section>

        {/* Q: iPhone and Android */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>기기별</span>
          <h2 className={styles.sectionTitle}>일본에서 아이폰과 안드로이드에 가장 잘 맞는 eSIM은?</h2>
          <p className={styles.bodyText}>
            둘 다 같습니다. 다섯 사업자 중 아이폰 전용이나 안드로이드 전용 일본 요금제를 파는 곳은 없습니다 — QR
            코드나 활성화 링크로 설치하는 표준 eSIM 프로필이며, 사업자는 휴대폰 기종이 아니라 위 비교표를 기준으로 고르면 됩니다.
            달라지는 것은 사기 전에 확인할 사항과 설치하는 메뉴입니다.
          </p>
          <p className={styles.bodyText}>
            아이폰은 iPhone XS 이후 기종에 잠금 해제된 기기여야 하고, 프로필은 설정 → 셀룰러 메뉴에서 추가합니다.
            안드로이드는 EID 확인이 필요하고, 메뉴 위치가 삼성, 픽셀, 엑스페리아, 원플러스마다 다릅니다. 각각
            가이드가 있습니다:{" "}
            <Link href="/guides/esim/japan-esim-iphone" className={tools.inlineLink}>
              아이폰용 일본 eSIM(영어) →
            </Link>{" "}
            그리고{" "}
            <Link href="/guides/esim/japan-esim-android" className={tools.inlineLink}>
              안드로이드용 일본 eSIM(영어) →
            </Link>
          </p>
        </section>

        {/* Top Picks */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>저희 추천</span>
          <h2 className={styles.sectionTitle}>일본 eSIM 추천 5곳</h2>
          <div className={styles.picksList}>
            {topPicks.map(({ id, esimId, rank, bestFor, badgeCls, target, ctaLabel, ctaAlt, why }) => {
              const sim = simCards.find((s) => s.id === id)!;
              const copy = SIM_COPY[id];
              const affiliateUrl = getProvider(ctaAlt?.esimId ?? esimId).affiliateUrl;
              const url = affiliateUrl === "#" ? PLANS_HREF : affiliateUrl;
              const isExternal = affiliateUrl !== "#";
              const label = ctaAlt?.ctaLabel ?? ctaLabel;
              return (
                <article key={id} id={id} className={styles.pickCard}>
                  <div className={styles.pickCardHeader}>
                    <div className={styles.pickRank}>
                      <span className={styles.pickNumber}>{rank}</span>
                      <div className={styles.pickMeta}>
                        <span className={`${styles.pickBadge} ${badgeCls}`}>{bestFor}</span>
                        <span className={styles.pickName}>{copy.name}</span>
                      </div>
                    </div>
                    <span className={styles.pickRating}>
                      {sim.rating !== null && <span style={{ color: "var(--accent)" }}>★</span>}
                      {sim.rating ?? "—"}
                    </span>
                  </div>
                  <div className={styles.pickCardBody}>
                    <p className={styles.pickSummary}>{copy.summary}</p>
                    <div className={styles.pickTarget}>
                      <span className={styles.pickTargetLabel}>추천 대상:</span>{" "}
                      <span>{target}</span>
                    </div>
                    <div className={styles.pickTarget} style={{ marginTop: "0.6rem" }}>
                      <span className={styles.pickTargetLabel}>{rank}위인 이유:</span>
                      <span>{why()}</span>
                    </div>
                    <div className={styles.pickGrid}>
                      <div className={styles.pickPros}>
                        <p className={styles.pickListLabel}>장점</p>
                        <ul className={styles.pickList}>
                          {copy.pros.map((p) => (
                            <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.pickCons}>
                        <p className={styles.pickListLabel}>단점</p>
                        <ul className={styles.pickList}>
                          {copy.cons.map((c) => (
                            <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={styles.pickCtaRow}>
                      {isExternal ? (
                        <a
                          href={url}
                          className={styles.pickCta}
                          target="_blank"
                          rel={ctaAlt || esimId === "simbye" ? "sponsored nofollow noopener" : "noopener noreferrer nofollow"}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link href={PLANS_HREF} className={styles.pickCta}>
                          {label}
                        </Link>
                      )}
                      <Link href={PLANS_HREF} className={styles.pickCtaInternal}>
                        모든 요금제 비교(영어)
                      </Link>
                    </div>
                    {esimId === "simbye" && <SimbyeOffer copy={SIMBYE_OFFER} formatPlan={planName} />}
                    {ctaAlt && (
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                        {ctaAlt.note}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Fifth slot, deliberately unranked — see the note under the comparison table. */}
          <article id="klook-japan-esim" className={styles.pickCard} style={{ marginTop: "1.5rem" }}>
            <div className={styles.pickCardHeader}>
              <div className={styles.pickRank}>
                <div className={styles.pickMeta}>
                  <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>추가 선택지</span>
                  <span className={styles.pickName}>{koKlookEsim.label}</span>
                </div>
              </div>
            </div>
            <div className={styles.pickCardBody}>
              <p className={styles.pickSummary}>
                클룩도 자체 일본 eSIM을 판매합니다. 이미 클룩에서 티켓이나 교통편을 예약하고 있다면 살펴볼 만합니다
                — 하나의 계정에서 한 번에 결제할 수 있습니다. 순위에는 넣지 않았습니다: 클룩 가격은 날짜에 따라 달라져, 순위를
                매길 수 있는 확인된 가격 정보가 없기 때문입니다. 현재 요금제는 상품 페이지에서 확인하세요.
              </p>
              <div className={styles.pickTarget}>
                <span className={styles.pickTargetLabel}>추천 대상:</span>{" "}
                <span>이미 클룩에서 일본 티켓이나 교통편을 사면서, eSIM도 같은 계정으로 받고 싶은 여행자.</span>
              </div>
              <div className={styles.pickCtaRow}>
                <KlookLink href={koKlookEsim.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
                  클룩 eSIM 가격 보기 →
                </KlookLink>
                <Link href={PLANS_HREF} className={styles.pickCtaInternal}>
                  모든 요금제 비교(영어)
                </Link>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                클룩에서의 상품명은 “{klookEsim.listingTitle}”입니다. {KLOOK_ESIM_FACTS["ko"]}
              </p>
            </div>
          </article>
        </section>

        <EsimBuyGuide copy={esimPicksCopy["ko"]} />

        <FaqList items={faqItems} />

        {/* Deep dives — these answer questions this comparison deliberately keeps short. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>더 깊이</span>
          <h2 className={styles.sectionTitle}>상황이 더 구체적이라면</h2>
          <p className={styles.bodyText}>
            이 페이지는 일반적인 여행을 기준으로 다섯 사업자의 순위를 매깁니다. 흔한 몇몇 상황에서는 답이 달라지며,
            각각 별도 가이드가 있습니다(모두 영어).
          </p>
          <ul className={styles.pickList}>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
                일본에서 eSIM을 쓸 수 있을까?(영어)
              </Link>{" "}
              — 구매 전에 휴대폰에서 확인할 세 가지.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-sim-card-vs-esim-2026" style={{ color: "var(--accent)", fontWeight: 600 }}>
                SIM 카드 vs eSIM(영어)
              </Link>{" "}
              — 가격과 상관없이 물리 SIM을 골라야 하는 두 가지 상황.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-students" style={{ color: "var(--accent)", fontWeight: 600 }}>
                학생과 장기 유학(영어)
              </Link>{" "}
              — 월 단위 가격, 그리고 일본 국내 알뜰폰(MVNO)이 모든 여행자용 eSIM보다 나은 경우.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-family-group" style={{ color: "var(--accent)", fontWeight: 600 }}>
                가족과 단체(영어)
              </Link>{" "}
              — 각자 eSIM을 쓰는 것보다 포켓 와이파이 하나를 함께 쓰는 편이 유리해지는 인원수.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-business" style={{ color: "var(--accent)", fontWeight: 600 }}>
                출장(영어)
              </Link>{" "}
              — 가격보다 핫스팟 조항. 노트북 테더링은 하루 사용량을 세 배로 늘리기 때문입니다.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-android" style={{ color: "var(--accent)", fontWeight: 600 }}>
                안드로이드에서(영어)
              </Link>{" "}
              — EID 확인, 그리고 삼성, 픽셀, 엑스페리아, 원플러스에서 열어야 할 메뉴.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/simbye-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Simbye 자세히(영어)
              </Link>{" "}
              — 최저가 추천: 모든 일본 요금제, 할인 코드, 어울리지 않는 사람.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/esim-go-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
                eSIM Go 자세히(영어)
              </Link>{" "}
              — 사업자별 가격, 통신망, 테더링.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/best-esim-japan-reddit" style={{ color: "var(--accent)", fontWeight: 600 }}>
                레딧 이용자들의 추천(영어)
              </Link>{" "}
              — r/JapanTravel의 단골 조언을 이번 달 가격과 대조.
            </li>
          </ul>
        </section>

        <Related
          items={[
            { href: "/guides/esim/japan-esim-10-days", title: "일본 eSIM 10일: 데이터는 얼마나 필요할까?(영어)" },
            { href: "/guides/esim/japan-esim-data-plans", title: "일본 eSIM 데이터 요금제 2026: 데이터는 얼마나 필요할까?(영어)" },
            { href: "/guides/esim/japan-sim-card-long-term-stay", title: "일본 장기 체류용 SIM 카드: 90일 이상 요금제(영어)" },
            { href: "/guides/esim/cheapest-esim-japan", title: "일본에서 가장 싼 eSIM 2026: 저예산 추천(영어)" },
            { href: "/guides/esim/airalo-japan-review", title: "Airalo 일본 리뷰 2026: 살 만할까?(영어)" },
            { href: "/guides/esim/sakura-mobile-review", title: "Sakura Mobile 리뷰 2026: 장기 체류에 최고의 SIM?(영어)" },
            { href: "/guides/esim/japan-esim-unlimited", title: "일본 무제한 eSIM 추천(2026): 헤비 유저를 위한 선택(영어)" },
            { href: "/guides/esim/how-to-set-up-esim-japan", title: "일본에서 eSIM 설정하는 법(단계별)(영어)" },
            { href: "/guides/esim/japan-esim-iphone", title: "아이폰용 일본 eSIM 추천(2026): 설정과 추천(영어)" },
            { href: "/guides/esim/airalo-vs-holafly-japan", title: "일본에서 Airalo vs Holafly: 어느 eSIM이 더 나을까?(영어)" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>모든 요금제 비교하기</h2>
            <p className={styles.ctaBannerDesc}>
              다섯 사업자의 모든 일본 eSIM 요금제를 GB당 단가로 정렬하고 매일 업데이트합니다.
            </p>
            <Link href={PLANS_HREF} className={styles.ctaBannerBtn}>
              GB당 단가로 모든 요금제 보기(영어) →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
