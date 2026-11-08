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
  type EsimPlanRow,
  type EsimProviderId,
} from "../../../../lib/esim-prices";
import { klookEsim } from "../../../../lib/klook-links";
import { zhKlookEsim } from "../../../../lib/klook-links-zh-tw";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { KLOOK_ESIM_FACTS } from "../../../../lib/klook-esim-facts";
import { JSONLD_LANG, dateLabel } from "../../../../lib/i18n";

/**
 * Traditional Chinese edition of /guides/esim/best-esim-japan. Mirrors the English page
 * block by block as of 2026-11-05 — same sections, tables, CTAs and FAQ — and computes
 * every price from lib/esim-prices.ts with the same functions, so no figure is added
 * or copied by hand; only the words around them are localised.
 */

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/esim/best-esim-japan";
const TITLE = "日本網卡推薦（2026）：eSIM 方案比較與 Klook";
const DESC =
  "日本網卡推薦 2026：Klook 日本 eSIM，以及 Simbye、Airalo、Holafly、eSIM Go 等五家的價格比較，每天更新。";

const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "22 Oct 2026" (the English constants' format) -> "2026年10月22日". */
function enDate(s: string): string {
  const m = s.match(/^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/);
  const mi = m ? EN_MONTHS.indexOf(m[2]) + 1 : 0;
  return m && mi ? dateLabel(`${m[3]}-${mi}-${m[1]}`, LOCALE) : s;
}

/** The price job's ISO timestamp, as the same UTC calendar day formatDate() prints. */
function isoDate(iso: string | null): string {
  if (!iso) return "尚未查核";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "未知";
  return dateLabel(`${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`, LOCALE);
}

const pricesCheckedAt = isoDate(latestCheckedAt());
const SPECS_CHECKED = enDate("29 Oct 2026");
const KLOOK_SPECS_CHECKED = enDate(klookEsim.specsCheckedAt);
const KLOOK_CHECKED = enDate(klookEsim.checkedAt);
// Simbye joined after the others, so its rows have their own date (the English SIMBYE_SPECS_CHECKED_AT).
const SIMBYE_CHECKED = dateLabel("2026-11-05", LOCALE);

/** "10 GB / 30 days" -> "10 GB／30 天"; "Unlimited / 7 days" -> "吃到飽／7 天". Figures untouched. */
function planName(name: string): string {
  return name.replace(/^Unlimited/, "吃到飽").replace(/(\d+) days?$/, "$1 天").replace(" / ", "／");
}

/** The provider's network string from the price data, with its English connectives in Chinese. */
function networkLabel(s: string): string {
  return s.replace(/ ?\(\+2 others\)/g, "（另有 2 家）").replace(/\(Unlimited\)/g, "（吃到飽）").replace(/ or /g, " 或 ").replace(/\/day/g, "/天");
}

// The plan table is English-only, so links to it are labelled as English.
const PLANS_HREF = "/guides/esim/japan-esim-data-plans";

const HOLAFLY_ALT = {
  esimId: "airalo" as EsimProviderId,
  ctaLabel: "取得 Airalo 吃到飽 eSIM →",
  note: "Holafly 無法透過我們的連結購買——Airalo 是我們建議的替代選擇。",
};

/** Chinese copy of the default in components/SimbyeOffer.tsx. {plan} prints the feed's English plan name. */
const SIMBYE_OFFER = {
  label: "Simbye 折扣：",
  text: "折扣碼 {code} 可讓每個 eSIM 方案現省 {percent}%：{plan} 定價 {list}，使用折扣碼後 {price}。",
  cta: "取得 Simbye eSIM →",
};

type TopPick = {
  id: string;
  esimId: EsimProviderId;
  rank: number;
  name: string;
  bestFor: string;
  badgeCls: string;
  target: string;
  summary: string;
  pros: string[];
  cons: string[];
  ctaLabel: string;
  ctaAlt?: typeof HOLAFLY_ALT;
  /** One line of fact for why the pick sits where it does, with live prices in it. */
  why: () => string;
};

const tenGb = (id: EsimProviderId) => {
  const plan = cheapestAtLeastGb(id, 10);
  return plan ? formatUsd(plan.priceUsd) : "—";
};

// Summary / pros / cons are lib/sim-cards.ts in Chinese; rating, voice and SIM flags are read from it.
const topPicks: TopPick[] = [
  {
    id: "simbye-japan",
    esimId: "simbye",
    rank: 1,
    name: "Simbye 日本 eSIM",
    bestFor: "已確認方案中的最低價",
    badgeCls: styles.pickBadgeGreen,
    target: "只需要數據的大多數旅客，任何行程都適用。",
    summary: "純數據的日本 eSIM，走 NTT docomo、KDDI/au、SoftBank 與 Rakuten Mobile，固定流量方案從 1 GB 到 50 GB，吃到飽方案每天前 2 GB 全速。價格資料中的每個方案都允許分享網路。",
    pros: ["固定流量方案的定價是五家中最低", "四家日本電信，自動選擇", "每個日本方案都允許分享網路", "50 GB 方案效期 180 天"],
    cons: ["純數據（沒有日本號碼、通話或簡訊）", "吃到飽方案每天超過 2 GB 後降到 1 Mbps", "吃到飽方案無法加值"],
    ctaLabel: "取得 Simbye eSIM →",
    why: () =>
      `定價是五家中最低：10 GB 為 ${tenGb("simbye")}，eSIM Go 是 ${tenGb("esimgo")}、Airalo 是 ${tenGb("airalo")}；走四家日本電信，並允許分享網路。`,
  },
  {
    id: "airalo-japan",
    esimId: "airalo",
    rank: 2,
    name: "Airalo 日本 eSIM",
    bestFor: "App 與客服首選",
    badgeCls: styles.pickBadgeBlue,
    target: "想要 App、線上即時客服與不限量分享網路的旅客。",
    summary: "全球最大的 eSIM 平台，使用者超過 1,000 萬。落地前先安裝、抵達後立即啟用——不用排隊，也不用實體 SIM。",
    pros: ["全球最大的 eSIM 平台", "落地前就能完成啟用設定", "方案從 1 GB 到吃到飽、3 到 30 天", "超過 1,000 萬旅客使用"],
    cons: ["純數據（不含語音通話或簡訊）", "需要支援 eSIM 的手機"],
    ctaLabel: "取得 Airalo eSIM →",
    why: () =>
      `10 GB 要 ${tenGb("airalo")}，比較貴，但吃到飽方案每天前 3 GB 全速、分享網路沒有限制，還有 24 小時線上即時客服。`,
  },
  {
    id: "holafly-japan",
    esimId: "holafly",
    rank: 3,
    name: "Holafly 日本 eSIM",
    bestFor: "吃到飽首選",
    badgeCls: styles.pickBadgeOrange,
    target: "重度用量：遠端工作、直播、每天視訊通話的人。",
    summary: "吃到飽的 eSIM——不必盯著流量。很受需要隨時連線的歐美旅客歡迎。",
    pros: ["手機本身流量不限", "方案天數 1 到 90 天任選", "受美國與歐洲旅客歡迎", "QR Code 設定簡單"],
    cons: ["純數據（不含通話或簡訊）", "熱點每天上限 1 GB", "比有流量上限的方案貴"],
    ctaLabel: "取得 Holafly eSIM →",
    ctaAlt: HOLAFLY_ALT,
    why: () =>
      `只賣吃到飽，${formatUsd(cheapestUnlimited("holafly")?.priceUsd ?? 0)} 起，手機本身沒有每日降速門檻；排在 Airalo 之後，因為熱點每天上限 1 GB，而且我們沒有它的連結。`,
  },
  {
    id: "esim-go-japan",
    esimId: "esimgo",
    rank: 4,
    name: "eSIM Go 日本（Breeze）",
    bestFor: "流量最大",
    badgeCls: styles.pickBadgeBlue,
    target: "預算有限，或這趟要走亞洲多國的人。",
    summary: "涵蓋 190 多個國家、CP 值極高的 eSIM，透過 eSIM Go 的消費者品牌 Breeze 販售。適合預算有限，或一趟行程走好幾個國家的旅客。",
    pros: ["短天數吃到飽方案，1 天起", "190 多個國家可用", "QR Code 即時啟用", "很適合多國行程"],
    cons: ["純數據（不含語音或簡訊）", "品牌知名度不如 Airalo 或 Holafly", "需要支援 eSIM 的手機"],
    ctaLabel: "取得 eSIM Go →",
    why: () =>
      `10 GB 為 ${tenGb("esimgo")}，而且是這裡唯一有 100 GB、200 GB 方案與 1 天起吃到飽方案的業者。`,
  },
  {
    id: "sakura-mobile",
    esimId: "sakura",
    rank: 5,
    name: "Sakura Mobile 旅遊 eSIM",
    bestFor: "長期停留首選",
    badgeCls: styles.pickBadgeGreen,
    target: "停留一個月以上、需要語音通話與英文客服的人。",
    summary: "適合長期停留、想要英語客服的旅客的日本在地選擇。旅遊 eSIM 有每日 3 GB 或吃到飽；實體 SIM 方案可加語音。",
    pros: ["完整的英語客服", "提供可語音通話的 SIM 方案（實體 SIM）", "實體 SIM 或 eSIM 皆可", "最適合停留 1 個月以上"],
    cons: ["價格比純數據轉售商高", "初次設定稍慢"],
    ctaLabel: "取得 Sakura Mobile →",
    why: () =>
      "價格排最後，但它是五家裡唯一賣日本號碼（含通話與簡訊）的，也是唯一有實體 SIM 的。",
  },
];

/**
 * Cheapest plan that covers a trip of `days` days needing `gb` GB in total — the
 * English page's own rule: Holafly left out (no link to it), daily-capped plans
 * measured on cap × trip days.
 */
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

/** "$13.99（10 GB／30 天）", or "—". */
function planLabel(plan: { priceUsd: number; name: string } | null): string {
  return plan ? `${formatUsd(plan.priceUsd)}（${planName(plan.name)}）` : "—";
}

const itineraryPicks = [
  {
    trip: "10 天以內、一般觀光用量",
    pick: "Simbye 固定流量方案",
    detail: () =>
      `${planLabel(SHORT_TRIP_PLAN)}——10 GB 對十天的行程來說是每天 1 GB 還有剩。Simbye 的價格資料列出 NTT docomo、KDDI/au、SoftBank 與 Rakuten Mobile，日本頁面也寫明「你不需要手動選網路」。允許分享網路。`,
  },
  {
    trip: "2 到 4 週",
    pick: "要總流量選 Simbye，要每日額度選 Sakura Mobile",
    detail: () =>
      `${planLabel(LONG_TRIP_PLAN)} 以每天 1 GB 計可撐 20 天，同樣走這四家電信。如果你寧可每天早上都有一份新的流量，Sakura Mobile 的每日 3 GB 系列走 Docomo 5G——${planLabel(SAKURA_DAILY_LONG)}——只有在單日用超過 3 GB 後才會降到 200 kbps。`,
  },
  {
    trip: "日本鄉間、山區、離島",
    pick: "走 Docomo 的方案，或四家都走的方案",
    detail: () =>
      "Sakura Mobile 的每日 3 GB 方案走 Docomo 5G，Simbye 與 eSIM Go 則是多家電信自動選擇。Airalo 的日本頁面顯示 SoftBank 為主要網路，另有兩家頁面未列名稱（查核日 2026年11月1日）；Klook 的商品頁上，按天計的方案走 SoftBank 5G，總流量方案走 docomo 4G LTE。",
  },
  {
    trip: "吃到飽——遠端工作、看影音、筆電分享網路",
    pick: "看價格選 Simbye Unlimited；要更多全速流量選 eSIM Go Premium 或 Airalo Unlimited",
    detail: () =>
      `Simbye 的 ${planLabel(SIMBYE_UNLIMITED)} 是一週方案中定價最低的，每天前 2 GB 全速，之後 1 Mbps。eSIM Go 的 ${planLabel(ESIMGO_UNLIMITED)} 全速可用 5 天 30 GB、10 天 60 GB 或 15 天 90 GB，之後「速度會降低（但仍足以串流 720p 影片）」，而且「每個方案都能分享網路」。Airalo 的 ${planLabel(AIRALO_UNLIMITED)} 每天前 3 GB 全速，之後以 1 Mbps 使用到 24 小時重置，並寫明「分享網路與連線裝置數量沒有限制」。`,
  },
  {
    trip: "需要日本電話號碼",
    pick: "Sakura Mobile 語音＋數據 eSIM",
    detail: () =>
      "六家裡唯一附日本號碼、通話與簡訊的方案：au（KDDI）5G、每天 3 GB，1～10 天方案含 120 分鐘通話、11～60 天含 240 分鐘、61 天以上含 360 分鐘。它需要在日本當面核對身分證件，使用期間在核對之後才開始，而不是落地就開始。",
  },
  {
    trip: "同一趟行程走日本加南韓或台灣",
    pick: "改買亞洲區域 eSIM，而不是日本專用",
    detail: () =>
      "Airalo 的 Asia eSIM 涵蓋「18 個國家與網路」，名單中包括日本、南韓與台灣；Breeze 的 eSIM Asia 涵蓋「13 個國家與網路」，讀取的頁面上沒有國家名單。兩者都是獨立產品，和本頁標價的日本方案不同。",
  },
];

/** 0.5 GB / 1 GB a day planning figures — arithmetic, as on the English page. */
const dataNeedRows = [10, 14, 21].map((days) => ({
  days,
  light: days * 0.5,
  normal: days,
}));

const networkRows = [
  {
    provider: "Simbye",
    carriers: networkLabel(getProvider("simbye").network),
    how: "電信依 Simbye 價格資料所列；其日本頁面寫明「你不需要手動選網路」，並說明 50 GB 方案只走 NTT Docomo。允許分享網路。純數據。",
    checked: SIMBYE_CHECKED,
  },
  {
    provider: "Airalo（Moshi Moshi Japan）",
    carriers: "SoftBank（主要網路），另有 2 家頁面未列名稱",
    how: "日本產品頁把 SoftBank 列為主要網路，並顯示「+2 others」但未列出名稱。純數據。",
    checked: enDate("1 Nov 2026"),
  },
  {
    provider: "eSIM Go（Breeze）",
    carriers: "NTT Docomo、KDDI、Rakuten Mobile、SoftBank",
    how: "「你的裝置會自動連上訊號最強的網路。」純數據——「不含簡訊或語音通話。」",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile——每日 3 GB 方案",
    carriers: "Docomo 5G",
    how: "每日額度系列。可開熱點；沒有電話號碼、沒有語音、沒有簡訊。",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile——吃到飽與語音＋數據",
    carriers: "au（KDDI）5G",
    how: "吃到飽為純數據；語音＋數據附日本號碼，需要當面核對身分。",
    checked: SPECS_CHECKED,
  },
  {
    provider: zhKlookEsim.label,
    carriers: "SoftBank 5G（按天計方案）／IIJ（Docomo）4G LTE（總流量方案）",
    how: "沒有電話號碼——純數據。分享網路：支援。資料來自 Klook 自己的商品資料，而不是商品頁本身。",
    checked: KLOOK_SPECS_CHECKED,
  },
];

const unlimitedRows = [
  {
    plan: "Simbye Unlimited",
    full: "每天 2 GB",
    after: "依其價格資料，「之後以 1 Mbps 不限量」",
    hotspot: "「允許——可供筆電、平板或同行旅伴使用」",
    checked: SIMBYE_CHECKED,
  },
  {
    plan: "Airalo Unlimited（日本）",
    full: "每天 3 GB",
    after: "「當天剩餘時間」降為 1 Mbps；流量「每 24 小時重置，從你啟用 eSIM 的時間起算」",
    hotspot: "「分享網路與連線裝置數量沒有限制」",
    checked: SPECS_CHECKED,
  },
  {
    plan: "eSIM Go Premium Unlimited",
    full: "5 天 30 GB、10 天 60 GB、15 天 90 GB",
    after: "「速度會降低（但仍足以串流 720p 影片）」",
    hotspot: "「每個方案都能分享網路」，不另收費",
    checked: SPECS_CHECKED,
  },
  {
    plan: "Sakura Mobile Unlimited（au 5G）",
    full: "手機本身不限量",
    after: "讀取的頁面上未公布手機本身的降速門檻",
    hotspot: "依方案長度設上限——依方案天數為 2 GB 到 30 GB",
    checked: SPECS_CHECKED,
  },
  {
    plan: "Sakura Mobile 每日 3 GB（Docomo 5G）",
    full: "每天 3 GB",
    after: "「每天使用 3 GB 數據後，速度將限制在 200 Kbps」",
    hotspot: "可使用",
    checked: SPECS_CHECKED,
  },
  {
    plan: `${zhKlookEsim.label}——吃到飽方案`,
    full: "每天 10 GB",
    after: "依商品資料，每日 10 GB 後降為 128 kbps",
    hotspot: "支援",
    checked: KLOOK_SPECS_CHECKED,
  },
  {
    plan: "Holafly 吃到飽",
    full: "未公布每日門檻",
    after: "適用「Fair Usage Policy」，官方表示一次不超過一天，之後恢復原速",
    hotspot: "每天可分享 1 GB",
    checked: "2026年11月6日",
  },
];

const timingRows = [
  {
    provider: "Simbye",
    starts: "「方案只有在 eSIM 第一次於目的地連線時才開始計算。」",
    install: "可以——其日本頁面說出發前用 Wi-Fi 先安裝",
    refund: "從未安裝或啟用且未使用任何數據，於購買後 30 天內申請可全額退款；詳見其退款政策",
    checked: SIMBYE_CHECKED,
  },
  {
    provider: "Airalo",
    starts:
      "「eSIM 方案的有效期在以下任一情況發生時開始：當你在涵蓋範圍內連上支援的網路，或當你安裝 eSIM 時。」大多數方案從連上網路起算——以該方案自己的 Validity Policy（有效期政策）為準。",
    install: "大多數方案可以在家先安裝；請先看該方案的 Validity Policy",
    refund: "可以從 Airalo 帳戶提出退款申請；已過期或已用完的 eSIM 不符合資格",
    checked: SPECS_CHECKED,
  },
  {
    provider: "eSIM Go（Breeze）",
    starts: "「方案有效期從在日本第一次使用數據開始，不是從購買時開始。」",
    install: "「出發前先安裝。」",
    refund: "「如果你還沒使用任何數據，可以獲得全額退款——不問理由」，3 個工作天內處理",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile",
    starts:
      "吃到飽純數據：「抵達日本後開始計算使用期間」。每日 3 GB 數據：「安裝 eSIM 後開始計算使用期間」。語音＋數據：抵達並完成當面身分核對之後。",
    install: "每日 3 GB 方案請抵達後再安裝——在家安裝就會開始計時",
    refund: "讀取的頁面上沒有公布退款條款",
    checked: SPECS_CHECKED,
  },
  {
    provider: zhKlookEsim.label,
    starts: `以 QR Code 電子券販售（「${klookEsim.listingTitle}」）；現有的商品資料未說明何時開始計算`,
    install: "未說明——請查看商品頁",
    refund: "未說明——請查看商品頁",
    checked: KLOOK_SPECS_CHECKED,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "eSIM 是什麼？去日本需要嗎？",
    a: "eSIM 是內建在手機裡的數位 SIM——不需要實體卡片。你用 QR Code 下載設定檔，馬上就能用。去日本不一定要 eSIM，但它是目前最方便的選項：出發前買好並安裝，落地啟用。",
  },
  {
    q: "哪些手機在日本支援 eSIM？",
    a: "大多數近幾年的手機都支援 eSIM：iPhone XS 以後、Google Pixel 3 以後、Samsung Galaxy S20 以後，以及許多其他 Android 旗艦機。請到手機「設定」→「關於」確認。注意：部分被電信商鎖的手機可能不支援 eSIM。",
  },
  {
    q: "用日本 eSIM 的時候，原本的門號可以繼續開著嗎？",
    a: "可以——這是 eSIM 最大的優點之一。大多數雙 SIM 手機可以同時使用兩張 SIM。讓原本的門號繼續接電話與簡訊，由日本 eSIM 負責數據。",
  },
  {
    q: "日本要用 Airalo 還是 Holafly？",
    a: "對大多數人來說 Airalo 比較好——比較便宜、流量級距有彈性，而且依 Airalo 自己的日本頁面，主要網路是 SoftBank（查核日 2026年11月1日）。如果你真的需要吃到飽（遠端工作、大量看影片），而且這趟的預算撐得起它的價差，Holafly 才勝出。",
  },
  {
    q: "落地日本後 eSIM 不能用怎麼辦？",
    a: "先確認那個 eSIM 設定檔的「數據漫遊」有打開。還是沒訊號的話，把飛航模式開關一次，強制重新搜尋網路。這裡列的每一家都提供 24 小時真人線上客服——Airalo 與 Holafly 回應特別快。",
  },
  {
    q: "日本的 eSIM 和實體 SIM 卡差在哪？",
    a: "兩者都給你日本的行動數據，但 eSIM 設定更快（不必在機場排隊）、多數情況更便宜，而且出發前就能買好。實體 SIM 卡要在落地後到機場櫃台或販賣機等。實體 SIM 的主要優點是：在不支援 eSIM 的手機上也能用。",
  },
  {
    q: "可以在日本直接用原本電信的漫遊嗎？",
    a: "可以，但漫遊很貴。多數國際電信對日本漫遊收每天約 $10～15。10 天的行程光是數據就要 $100～150——而一整個日本 eSIM 方案是 $9～18。除非你的電信有涵蓋日本的平價旅遊加購包，專用的日本 eSIM 幾乎都更便宜。",
  },
  {
    q: "Airalo 在日本用哪家網路？",
    a: "以 Airalo 官方日本頁面上顯示的網路為準：SoftBank 是主要網路，另有「+2 others」，但頁面沒有列出名稱，所以本指南也不列名稱。查核日 2026年11月1日。如果某一家電信對你的行程很重要，購買前請先打開該頁面的網路清單確認。",
  },
  {
    q: "Sakura Mobile 是什麼？適合誰？",
    a: "Sakura Mobile 是日本本地的電信業者，專為旅客與長期停留者提供 SIM 卡與 eSIM。和 Airalo、Holafly 不同，Sakura Mobile 含語音通話功能、有英語客服，方案也適用到 90 天的停留。它走 Docomo（日本最大的電信）。它比便宜的 eSIM 貴，但對任何需要日本電話號碼或長期停留的人來說是最好的選擇。",
  },
  {
    q: "去日本需要多少流量？",
    a: "一般觀光用途——Google 地圖、訊息、輕度瀏覽、拍幾張照——每天 1 GB 是合理的估計。10 天的行程大約用 8～10 GB。如果你大量用導航開車、看影片，或遠端工作，請算每天 2 GB 以上。多數旅客覺得 3～5 GB 的方案足夠一週的日本行。",
  },
  {
    q: "日本網卡（eSIM）要多少錢？",
    a: `日本 eSIM 的價格依業者與流量級距而不同（查核時間 ${pricesCheckedAt}）。省錢選項：Simbye ${planLabel(cheapestPlan("simbye"))} 起、eSIM Go ${planLabel(cheapestPlan("esimgo"))} 起、Airalo ${planLabel(cheapestPlan("airalo"))} 起。中階：5 GB 方案 Simbye ${planLabel(cheapestAtLeastGb("simbye", 5))}，eSIM Go ${planLabel(cheapestAtLeastGb("esimgo", 5))}，Airalo ${planLabel(cheapestAtLeastGb("airalo", 5))}。吃到飽：Holafly ${planLabel(cheapestUnlimited("holafly"))} 起。日本本地、有英語電話客服：Sakura Mobile ${planLabel(cheapestPlan("sakura"))} 起。一般旅客一週的行程，預期在 $10～20。`,
  },
  {
    q: "日本行程買吃到飽值得嗎？",
    a: "對大多數觀光客：不值得。日本的飯店、便利商店與觀光區 Wi-Fi 覆蓋很好。3～5 GB 的方案就能撐過一般一週的導航、訊息與瀏覽。吃到飽方案（例如 Holafly）貴 2～3 倍，主要對大量看影片、頻繁視訊，或會去 Wi-Fi 不好的地區的重度使用者有意義。如果拿不定主意，先從 5 GB 開始，再考慮要不要加。",
  },
  {
    q: "到了日本可以加購流量嗎？",
    a: "可以——大多數業者支援在 App 內加值，不需要新的 QR Code。用 Airalo 的話，在 App 裡買一個新方案，它會自動加到你現有的 eSIM 設定檔上。eSIM Go 與 Sakura Mobile 有類似的加值流程。Holafly 的吃到飽方案是固定天數的，待更久就要買新方案。",
  },
  {
    q: "日本的 eSIM 方案含通話與簡訊嗎？",
    a: "大多數面向旅客的 eSIM 方案——包括 Simbye、Airalo、eSIM Go 與 Holafly——都是純數據，不含語音通話或簡訊。在日本要通話，可以用 WhatsApp、LINE 或 FaceTime 走數據。如果你真的需要一個可以通話的日本號碼，主要業者裡 Sakura Mobile 是最好的選擇。",
  },
  {
    q: "日本 eSIM 什麼時候啟用？",
    a: "出發前就先安裝（掃 QR Code）——這需要 2～5 分鐘和一個 Wi-Fi 連線。不過大多數方案的天數是從你在日本第一次連上網路開始算，不是從你安裝設定檔開始。所以飛機落地後再把數據切到日本的 eSIM，方案才會在你需要的時候開始跑。",
  },
  {
    q: "日本哪家網路覆蓋最好？",
    a: "Docomo 的鄉間覆蓋最完整，所以如果你的行程會離開主要城市，值得刻意挑它——Simbye、eSIM Go 與 Sakura Mobile 都走它。SoftBank 與 KDDI（Holafly 使用；SoftBank 也是 Airalo 日本頁面上的主要網路）在城市與觀光動線上表現很好。走標準的東京－京都－大阪－廣島路線，哪一家都夠用，你感覺不出差別。",
  },
  {
    q: "日本網卡什麼時候買？",
    a: "eSIM 出發前就買好，飛機落地立刻啟用——沒有等的理由，也不會賣完。實體 SIM 不一樣：機場櫃台與販賣機在旺季真的會缺熱門方案，而預訂 Sakura Mobile 的 SIM 卡到機場或飯店取件，既比落地現買便宜，也比碰運氣安全。",
  },
  {
    q: "用 eSIM 可以拿到日本電話號碼嗎？",
    a: `只有 Sakura Mobile 可以。它的語音＋數據 eSIM 走 au（KDDI）5G，每天 3 GB 高速數據，附日本號碼、語音通話與簡訊——1～10 天方案含 120 分鐘通話、11～60 天含 240 分鐘、61 天以上含 360 分鐘——但需要在日本當面核對身分，使用期間在核對之後才開始。Simbye、Airalo、eSIM Go 與 Klook 的商品，日本方案都是純數據：沒有日本號碼、沒有簡訊、沒有語音。如果你只是需要收驗證碼簡訊，把原本的 SIM 留在另一個卡槽開著，讓 eSIM 負責數據就好。查核時間 ${SPECS_CHECKED}。`,
  },
  {
    q: "吃到飽會降速嗎？",
    a: `會——每個日本「吃到飽」方案都有公布的門檻。Simbye 每天前 2 GB 全速，之後 1 Mbps。Airalo 超過 3 GB 後，當天剩餘時間降到 1 Mbps，流量「每 24 小時重置，從你啟用 eSIM 的時間起算」。eSIM Go 的 Premium Unlimited 全速可用 5 天 30 GB、10 天 60 GB 或 15 天 90 GB，之後「速度會降低（但仍足以串流 720p 影片）」。Sakura Mobile 的吃到飽方案手機本身不限量，但熱點依方案長度上限 2～30 GB；它的每日 3 GB 方案在單日用超過 3 GB 後降到 200 kbps。Klook 商品的吃到飽方案每天前 10 GB 全速，之後 128 kbps。Airalo 與 eSIM Go 的數據查核時間 ${SPECS_CHECKED}；Klook 的數據來自其 ${KLOOK_SPECS_CHECKED} 的商品資料。`,
  },
  {
    q: "日本 eSIM 完全沒用，可以退款嗎？",
    a: `要看業者。依 Simbye 的退款政策，從未安裝或啟用且未使用任何數據的 eSIM，於購買後 30 天內申請可全額退款。eSIM Go 寫明「如果你還沒使用任何數據，可以獲得全額退款——不問理由」，3 個工作天內處理。Airalo 可以從帳戶提出退款申請，並註明已過期或已用完的 eSIM 不符合資格。Sakura Mobile 的旅遊 eSIM 頁面沒有公布退款條款，Klook 商品的條款未列於此，請在商品頁確認。相關的陷阱在於時間而不是錢：eSIM Go 的有效期「從在日本第一次使用數據開始，不是從購買時開始」，但 Sakura Mobile 的每日 3 GB 方案「安裝 eSIM 後開始計算」——所以這些方案要抵達後再安裝，不要在家裝。查核時間 ${SPECS_CHECKED}。`,
  },
  {
    q: "為什麼我的日本 eSIM 速度很慢？",
    a: "幾個可能原因：你用掉了大部分流量（許多方案在門檻後降速）、你在覆蓋不好的地方（隧道、山區），或是在澀谷、京都車站這類擁擠觀光區遇到網路壅塞。先試著開關飛航模式。如果流量還沒用完、速度也沒改善，請聯絡業者客服。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "日本網卡推薦" },
];

/** One Klook eSIM slot, under the two tables where a reader has just made a decision. */
function KlookEsimSlot({ why }: { why: string }) {
  return (
    <div className={styles.pickTarget} style={{ marginTop: "1.25rem", flexWrap: "wrap", gap: "0.6rem" }}>
      <span className={styles.pickTargetLabel}>Klook 也有：</span>
      <span>
        {why}{" "}
        <KlookLink
          href={zhKlookEsim.url}
          target="_blank"
          rel={KLOOK_REL}
          style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
        >
          查看 Klook eSIM 價格 →
        </KlookLink>
      </span>
    </div>
  );
}

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhBestEsimJapanPage({ updated }: { updated: PageUpdated }) {
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
              inLanguage: JSONLD_LANG[LOCALE],
            }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>價格查核時間 {pricesCheckedAt}</p>
          <h1 className={styles.heroTitle}>
            日本網卡推薦 2026：<br />依價格與網路比較 eSIM
          </h1>
          <p className={styles.heroSubtitle}>
            主要的日本 eSIM 整理在一頁，每種行程各有一個推薦——並寫明每個方案實際走的是哪家電信。
          </p>
          <div className={styles.heroBadges}>
            {["價格每天查核", "6 款 eSIM 比較", "獨立評比"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <EsimUseCaseTable copy={esimPicksCopy["zh-tw"]} checkedLabel={pricesCheckedAt} formatPlan={planName} klookLocale="zh-tw" />

        {/* The answer, before the table — a pick per kind of trip, with the numbers in it. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>10 天以內</strong>、一般觀光用量的行程，首選是
            <strong>Simbye 的 {planLabel(SHORT_TRIP_PLAN)}</strong>——10 GB 等於每天 1 GB 還有剩，是本頁比較的方案中定價最低的，其價格資料列出
            NTT docomo、KDDI/au、SoftBank 與 Rakuten Mobile；<strong>二到四週</strong>的話，同一家的
            <strong>{planLabel(LONG_TRIP_PLAN)}</strong> 以同樣的用量可撐 20 天。如果你要的是<strong>吃到飽</strong>而不是固定流量，Simbye 的
            <strong>{planLabel(SIMBYE_UNLIMITED)}</strong> 是一週方案中最便宜的，但每天前 2 GB 全速，之後 1 Mbps；eSIM Go 的
            <strong>{planLabel(ESIMGO_UNLIMITED)}</strong> 全速可用 5 天 30 GB 或 10 天 60 GB，之後降到仍可看 720p 的速度；Airalo 的
            <strong>{planLabel(AIRALO_UNLIMITED)}</strong> 每天前 3 GB 全速，之後以 1 Mbps 使用到 24 小時重置，分享網路沒有上限。只有
            <strong>Sakura Mobile</strong> 提供<strong>日本電話號碼</strong>：它的語音＋數據 eSIM 走 au（KDDI）5G，每天 3 GB，依方案長度含
            120～360 分鐘通話，落地後需要當面核對身分。
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            價格由每天重新讀取的程式於 {pricesCheckedAt} 從各業者自己的網站讀取。網路、合理使用門檻、熱點上限、是否提供電話號碼與退款規定的讀取時間為
            {SPECS_CHECKED}（Simbye 為 {SIMBYE_CHECKED}，來自 simbye.com 與其價格資料）；Klook 的資料來自其 {KLOOK_SPECS_CHECKED} 的商品資料。
          </p>
        </section>

        {/* Quick Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>一覽</span>
          <h2 className={styles.sectionTitle}>快速比較</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["業者", "最適合", "最低價", "最便宜方案", "網路", "語音／簡訊", "實體SIM", "評分", ""].map((h) => (
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
                        <td className={styles.tdNetwork}>{networkLabel(getProvider(esimId).network)}</td>
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
                              rel={ctaAlt || esimId === "simbye" ? "sponsored noopener" : "noopener noreferrer nofollow"}
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
                  {/* Unranked extra: Klook's listing blocks automated price reads. */}
                  <tr>
                    <td className={styles.tdProvider}>{zhKlookEsim.label}</td>
                    <td className={styles.tdBestFor}>已經在 Klook 訂門票的人</td>
                    <td className={tools.tdMuted}>在 Klook 查看</td>
                    <td className={tools.tdMuted}>—</td>
                    <td className={tools.tdMuted}>商品頁未標示</td>
                    <td><span className={styles.no}>✗</span></td>
                    <td><span className={styles.no}>✗</span></td>
                    <td className={tools.tdMuted}>未排名</td>
                    <td>
                      <KlookLink href={zhKlookEsim.url} className={styles.tdLink} target="_blank" rel={KLOOK_REL}>
                        查看 Klook eSIM 價格 →
                      </KlookLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Klook 這一列刻意放在排名之外。上面五家是依每天從它們自己網站讀取的價格排名；Klook 的 eSIM 價格依日期而變（查核日 {KLOOK_CHECKED}），
            所以沒有價格或流量級距可以拿來和它們比較。請打開商品頁查看目前的方案。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            <span className={tools.liveBadge}><span className={tools.liveDot} /> 價格每天查核</span>
            <span>
              「最低價」是各業者最便宜的日本方案，時間點為 {pricesCheckedAt}。{" "}
              <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>看所有方案、依每 GB 單價排序（英文）→</Link>
            </span>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            只有 Sakura Mobile 賣語音方案與實體 SIM 卡——另外四家都是純數據的 eSIM。如果你需要一個日本電話號碼，或你的手機完全不能用 eSIM，
            在考慮價格之前選擇就只剩一個。請看{" "}
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" className={tools.inlineLink}>
              日本 SIM 卡 vs eSIM（英文）→
            </Link>
          </p>
        </section>

        {/* Q: What is the best eSIM for Japan? — the pick-by-itinerary table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>簡短回答</span>
          <h2 className={styles.sectionTitle}>日本網卡哪一家最好？</h2>
          <p className={styles.bodyText}>
            沒有單一的最佳選擇，因為這五家搶的不是同一種行程。Simbye 的固定流量方案定價最低；eSIM Go 的流量最大；要吃到飽又不限分享網路，選 Airalo；
            要日本電話號碼，只有 Sakura Mobile。找到你的那一列：
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>你的行程</th>
                    <th>該買什麼</th>
                    <th>原因——天數、GB、電信、價格</th>
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
            價格時間點為 {pricesCheckedAt}；電信名單、合理使用門檻與區域方案的國家數，於 {SPECS_CHECKED} 從各業者自己的網站讀取。
          </p>
          <KlookEsimSlot why="如果這趟行程的門票與交通已經放在 Klook 的購物車裡，它自己的日本 eSIM 可以一起結帳——按天計方案走 SoftBank 5G，總流量方案走 IIJ（Docomo）4G LTE，可分享熱點。這裡不列入排名，因為 US$1.05 起的起價未標明方案，請打開商品頁查看目前的方案。" />
        </section>

        {/* Q: Which eSIM is best for a 2-week trip? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>兩週</span>
          <h2 className={styles.sectionTitle}>日本兩週行程用哪個 eSIM 最好？</h2>
          <p className={styles.bodyText}>
            <strong>{tripPlanLabel(14, 14)}</strong> 是能以每天 1 GB 撐滿 14 天的最便宜方案；如果你的用途是地圖、訊息和拍幾張照，而不是看影片，
            <strong>{tripPlanLabel(14, 7)}</strong> 就夠了。兩者都是 30 天方案，所以兩週的行程卡的不是天數，而是流量。
          </p>
          <p className={styles.bodyText}>
            有兩個替代選擇值得多花錢，但都是因為特定理由，而不是一般情況。Sakura Mobile 的
            {planLabel(allEsimPlans.find((p) => p.id === "sakura-45-gb-15-days") ?? null)}
            每天早上給你 3 GB（Docomo 5G），不必省著用一整包流量，適合兩週裡會去山區或小島的行程。如果兩週的出差需要筆電分享網路，
            {planLabel(cheapestUnlimited("esimgo", 15))} 或 {planLabel(cheapestUnlimited("airalo", 15))}
            可以買到同樣天數的吃到飽——各自降速到多少，請看下面的降速表。
          </p>
        </section>

        {/* Q: How much data do I need in Japan? — the days-to-GB table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>估算流量</span>
          <h2 className={styles.sectionTitle}>去日本需要多少流量？</h2>
          <p className={styles.bodyText}>
            地圖、訊息、拍幾張照、偶爾查時刻表，抓<strong>每天 0.5 GB</strong>；加上視訊通話、社群影片或串流音樂，抓<strong>每天 1 GB</strong>。
            這樣算來 10 天的行程是 5～10 GB、兩週是 7～14 GB、三週是 10.5～21 GB——遠低於業者自己視為重度使用的量：Airalo 的合理使用門檻是單日 3 GB，
            Sakura Mobile 的每日上限是 3 GB，Klook 商品的吃到飽方案每天前 10 GB 全速。
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>行程天數</th>
                    <th>每天 0.5 GB</th>
                    <th>每天 1 GB</th>
                    <th>涵蓋每天 0.5 GB 的最便宜方案</th>
                    <th>涵蓋每天 1 GB 的最便宜方案</th>
                  </tr>
                </thead>
                <tbody>
                  {dataNeedRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider}>{row.days} 天</td>
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
            GB 欄是依上面的估算數字計算的；方案欄是能涵蓋該用量的最便宜在售方案，價格讀取於 {pricesCheckedAt}。Holafly 不列入這兩欄，因為本站沒有可以購買它的連結。
            每日上限型方案以「每日上限 × 行程天數」計算，而不是看標示的總量，這是和固定流量方案公平比較的唯一方法。{" "}
            <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>
              所有方案，依每 GB 單價排序（英文）→
            </Link>
          </p>
          <KlookEsimSlot why="Klook 自己的日本 eSIM 分級從 500 MB 到 50 GB，另有吃到飽選項，所以同樣涵蓋這些用量。US$1.05 是選擇天數與流量前的起價，因此這裡不列各方案價格。" />
        </section>

        {/* Q: Which network is best in Japan? — carrier table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>網路</span>
          <h2 className={styles.sectionTitle}>日本哪家網路最好：Docomo、au 還是 SoftBank？</h2>
          <p className={styles.bodyText}>
            在東京－京都－大阪－廣島路線上，實際上沒有差別——三家都涵蓋城市與新幹線沿線。差別在離開這些地方之後：日本在地業者的鄉間方案都建立在 Docomo 的網路上；
            而且這些業者在讀取的頁面上都沒有公布覆蓋率，所以老實的選法是看方案實際走哪家，而不是看宣傳。結帳頁上的品牌並不等於網路：
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>方案</th>
                    <th>在日本走的電信</th>
                    <th>業者的說明</th>
                    <th>查核日</th>
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
            如果你根本不想選電信，Simbye 與 eSIM Go 就是不用你選的：兩者都列出四家電信，並自動選擇其中一家。
          </p>
        </section>

        {/* "Unlimited", throttling and hotspot */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>細則</span>
          <h2 className={styles.sectionTitle}>「吃到飽」實際上是什麼意思，能不能分享網路</h2>
          <p className={styles.bodyText}>
            沒有任何日本吃到飽方案是無限全速的。每一家都公布了門檻與超過後的降速，而差最多的是熱點——一家完全不限制分享網路，另一家以 GB 設上限。
            如果你買吃到飽是為了讓筆電分享網路，決定的就是這一欄：
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>方案</th>
                    <th>全速上限</th>
                    <th>超過之後</th>
                    <th>熱點／分享網路</th>
                    <th>查核日</th>
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
            引號內是業者自己的說法（中譯），讀取日期見最後一欄。Holafly 是第六家賣吃到飽的業者，熱點每天上限 1 GB；它在上面的比較表中，但這裡沒有連結，
            因為它沒有本站能加入的聯盟方案。{" "}
            <Link href="/guides/esim/japan-esim-unlimited" className={tools.inlineLink}>
              日本吃到飽 eSIM 詳細說明（英文）→
            </Link>
          </p>
        </section>

        {/* Phone numbers, SMS and voice */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>通話與簡訊</span>
          <h2 className={styles.sectionTitle}>日本電話號碼、簡訊與語音</h2>
          <p className={styles.bodyText}>
            六家裡有五家是純數據——沒有日本號碼、沒有簡訊、沒有語音。eSIM Go 直接寫明（「不含簡訊或語音通話。純數據。」），Simbye 的日本頁面寫著「通話與簡訊：不含」，Airalo 的日本方案是純數據、沒有號碼，
            Klook 的商品資料則把服務類型標為沒有電話號碼、純數據。
          </p>
          <p className={styles.bodyText}>
            例外是 <strong>Sakura Mobile 的語音＋數據 eSIM</strong>：au（KDDI）5G、每天 3 GB 高速數據、附日本號碼可通話與收發簡訊，內含的通話分鐘數隨方案增加——
            1～10 天方案 120 分鐘、11～60 天 240 分鐘、61 天以上 360 分鐘。它有一個純數據方案沒有的條件：需要在日本當面核對身分，使用期間在核對之後才開始，
            而不是落地就開始。於 {SPECS_CHECKED} 讀取自 sakuramobile.jp。
          </p>
          <p className={styles.bodyText}>
            如果你真正需要的是收銀行驗證碼的簡訊，根本不需要日本號碼：讓原本的 SIM 和 eSIM 同時開著，由 eSIM 負責數據即可。通話的話，日本人自己用的是 LINE，
            WhatsApp 或 FaceTime 也都能走數據使用。{" "}
            <Link href="/guides/esim/japan-sim-card-long-term-stay" className={tools.inlineLink}>
              附號碼的長期停留方案（英文）→
            </Link>
          </p>
        </section>

        {/* Refunds and install timing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>時間點</span>
          <h2 className={styles.sectionTitle}>什麼時候開始計時，什麼時候還能退款</h2>
          <p className={styles.bodyText}>
            提早安裝在某一家是正確做法，在另一家卻是昂貴的錯誤，因為各業者對「什麼會啟動有效期」的規定不一樣。對短天數方案來說，差別可能是一兩天：
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>業者</th>
                    <th>什麼會開始計時</th>
                    <th>出發前可以先安裝嗎？</th>
                    <th>未使用可否退款</th>
                    <th>查核日</th>
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
          <span className={styles.sectionLabel}>購買之前</span>
          <h2 className={styles.sectionTitle}>去日本需要 eSIM 嗎？</h2>
          <p className={styles.bodyText}>
            不需要——入境日本沒有任何規定要你有 eSIM，而且飯店、便利商店、車站和大多數咖啡店都有 Wi-Fi。eSIM 買到的是這些地方之間的那一段：
            時刻表臨時變動的月台、需要看地圖的公車站、要掃 QR Code 看菜單的餐廳排隊隊伍。本頁最便宜的日本方案是 Simbye 的
            {planLabel(cheapestPlan("simbye"))}，比大多數電信一天的漫遊費還便宜。
          </p>
          <p className={styles.bodyText}>
            有兩項檢查比價格更重要。你的手機必須支援 eSIM 而且沒有被電信鎖；你的方案必須符合你的旅行方式，而不是只看你離開多久——
            一個 30 天、5 GB 的方案，對兩週都要視訊通話的行程來說就是買錯了。{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" className={tools.inlineLink}>
              你的手機在日本能用 eSIM 嗎？（英文）→
            </Link>
          </p>
        </section>

        {/* Q: iPhone and Android */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>依手機</span>
          <h2 className={styles.sectionTitle}>在日本，iPhone 和 Android 用哪個 eSIM 最好？</h2>
          <p className={styles.bodyText}>
            兩邊都是同樣幾家。這五家都沒有 iPhone 專用或 Android 專用的日本方案——它們都是標準的 eSIM 設定檔，用 QR Code 或啟用連結安裝，
            該選哪一家應該由上面的表格決定，而不是由你的手機決定。不同的是購買前要做的檢查，以及安裝時要進的選單。
          </p>
          <p className={styles.bodyText}>
            iPhone 需要 iPhone XS 以後的機型且未鎖電信，設定檔加在「設定」→「行動服務」；Android 則要檢查 EID，而且選單位置在 Samsung、Pixel、Xperia
            與 OnePlus 上各不相同。各有專門的教學：{" "}
            <Link href="/guides/esim/japan-esim-iphone" className={tools.inlineLink}>
              iPhone 用日本 eSIM（英文）→
            </Link>{" "}
            與{" "}
            <Link href="/guides/esim/japan-esim-android" className={tools.inlineLink}>
              Android 用日本 eSIM（英文）→
            </Link>
          </p>
        </section>

        {/* Top Picks */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>我們的推薦</span>
          <h2 className={styles.sectionTitle}>日本 eSIM 五強</h2>
          <div className={styles.picksList}>
            {topPicks.map(({ id, esimId, rank, name, bestFor, badgeCls, target, summary, pros, cons, ctaLabel, ctaAlt, why }) => {
              const sim = simCards.find((s) => s.id === id)!;
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
                        <span className={styles.pickName}>{name}</span>
                      </div>
                    </div>
                    <span className={styles.pickRating}>
                      {sim.rating !== null && <span style={{ color: "var(--accent)" }}>★</span>}
                      {sim.rating ?? "—"}
                    </span>
                  </div>
                  <div className={styles.pickCardBody}>
                    <p className={styles.pickSummary}>{summary}</p>
                    <div className={styles.pickTarget}>
                      <span className={styles.pickTargetLabel}>最適合：</span>
                      <span>{target}</span>
                    </div>
                    <div className={styles.pickTarget} style={{ marginTop: "0.6rem" }}>
                      <span className={styles.pickTargetLabel}>為什麼排第 {rank}：</span>
                      <span>{why()}</span>
                    </div>
                    <div className={styles.pickGrid}>
                      <div className={styles.pickPros}>
                        <p className={styles.pickListLabel}>優點</p>
                        <ul className={styles.pickList}>
                          {pros.map((p) => (
                            <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.pickCons}>
                        <p className={styles.pickListLabel}>缺點</p>
                        <ul className={styles.pickList}>
                          {cons.map((c) => (
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
                          rel={ctaAlt || esimId === "simbye" ? "sponsored noopener" : "noopener noreferrer nofollow"}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link href={PLANS_HREF} className={styles.pickCta}>
                          {label}
                        </Link>
                      )}
                      <Link href={PLANS_HREF} className={styles.pickCtaInternal}>
                        比較所有方案（英文）
                      </Link>
                    </div>
                    {esimId === "simbye" && <SimbyeOffer copy={SIMBYE_OFFER} />}
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
                  <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>另一個選擇</span>
                  <span className={styles.pickName}>{zhKlookEsim.label}</span>
                </div>
              </div>
            </div>
            <div className={styles.pickCardBody}>
              <p className={styles.pickSummary}>
                Klook 自己也賣日本 eSIM，如果你已經在那裡訂門票或交通，值得一看——一次結帳、一個帳號。它不列入排名：Klook 的價格依日期而變，
                所以沒有經過查核的價格可以拿來排名。請打開商品頁查看目前的方案。
              </p>
              <div className={styles.pickTarget}>
                <span className={styles.pickTargetLabel}>最適合：</span>
                <span>已經在 Klook 買日本門票或交通、想把 eSIM 放在同一個帳號的旅客。</span>
              </div>
              <div className={styles.pickCtaRow}>
                <KlookLink href={zhKlookEsim.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
                  查看 Klook eSIM 價格 →
                </KlookLink>
                <Link href={PLANS_HREF} className={styles.pickCtaInternal}>
                  比較所有方案（英文）
                </Link>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                在 Klook 上的商品名稱為「{klookEsim.listingTitle}」。{KLOOK_ESIM_FACTS["zh-tw"]}
              </p>
            </div>
          </article>
        </section>

        <EsimBuyGuide copy={esimPicksCopy["zh-tw"]} />

        <FaqList items={faqItems} />

        {/* Deep dives — every destination here is English-only, so each is labelled. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>深入了解</span>
          <h2 className={styles.sectionTitle}>如果你的情況比較特殊</h2>
          <p className={styles.bodyText}>
            本頁是以一般行程為五家排名。有幾種常見情況會改變答案，各有專門的指南：
          </p>
          <ul className={styles.pickList}>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
                eSIM 在日本到底能不能用？（英文）
              </Link>
              ——購買前要對手機做的三項檢查。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-sim-card-vs-esim-2026" style={{ color: "var(--accent)", fontWeight: 600 }}>
                SIM 卡 vs eSIM（英文）
              </Link>
              ——不論價格，只能用實體 SIM 的兩種情況。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-students" style={{ color: "var(--accent)", fontWeight: 600 }}>
                學生與長期留學（英文）
              </Link>
              ——以月計價，以及日本國內 MVNO 何時勝過所有旅遊 eSIM。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-family-group" style={{ color: "var(--accent)", fontWeight: 600 }}>
                家庭與團體（英文）
              </Link>
              ——幾個人以上，一台共用的 Pocket WiFi 會比每人一張 eSIM 划算。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-business" style={{ color: "var(--accent)", fontWeight: 600 }}>
                商務出差（英文）
              </Link>
              ——重點是熱點條款而不是價格，因為筆電分享網路會讓一天的用量變成三倍。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-android" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Android 手機（英文）
              </Link>
              ——EID 檢查，以及在 Samsung、Pixel、Xperia 與 OnePlus 上要打開的選單。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/simbye-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Simbye 詳細介紹（英文）
              </Link>
              ——我們的最低價推薦：所有日本方案、折扣碼，以及不適合哪些人。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/esim-go-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
                eSIM Go 詳細介紹（英文）
              </Link>
              ——單獨一家看：價格、網路與分享網路。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/best-esim-japan-reddit" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Reddit 推薦什麼（英文）
              </Link>
              ——r/JapanTravel 的常見建議，對照本月的價格檢查。
            </li>
          </ul>
        </section>

        <Related
          items={[
            { href: "/guides/esim/japan-esim-10-days", title: "日本 eSIM 10 天：需要多少流量？（英文）" },
            { href: "/guides/esim/japan-esim-data-plans", title: "日本 eSIM 流量方案 2026：需要多少流量？（英文）" },
            { href: "/guides/esim/japan-sim-card-long-term-stay", title: "日本長期停留 SIM 卡：90 天以上方案（英文）" },
            { href: "/guides/esim/cheapest-esim-japan", title: "日本最便宜的 eSIM 2026：省錢首選（英文）" },
            { href: "/guides/esim/airalo-japan-review", title: "Airalo 日本評測 2026：值得買嗎？（英文）" },
            { href: "/guides/esim/sakura-mobile-review", title: "Sakura Mobile 評測 2026：長期停留最好的 SIM？（英文）" },
            { href: "/guides/esim/japan-esim-unlimited", title: "日本吃到飽 eSIM 推薦（2026）：重度使用者首選（英文）" },
            { href: "/guides/esim/how-to-set-up-esim-japan", title: "在日本設定 eSIM 的方法（逐步教學）（英文）" },
            { href: "/guides/esim/japan-esim-iphone", title: "iPhone 用日本 eSIM 推薦（2026）：設定與推薦（英文）" },
            { href: "/guides/esim/airalo-vs-holafly-japan", title: "日本用 Airalo 還是 Holafly：哪個 eSIM 勝出？（英文）" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>準備好比較所有方案了嗎？</h2>
            <p className={styles.ctaBannerDesc}>
              五家業者的每一個日本 eSIM 方案，依每 GB 單價排序，每天更新。
            </p>
            <Link href={PLANS_HREF} className={styles.ctaBannerBtn}>
              依每 GB 單價查看所有方案（英文）→
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
