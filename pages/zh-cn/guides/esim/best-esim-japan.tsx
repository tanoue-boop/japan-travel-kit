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
import { cnKlookEsim } from "../../../../lib/klook-links-zh-cn";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { KLOOK_ESIM_FACTS } from "../../../../lib/klook-esim-facts";
import { JSONLD_LANG, dateLabel } from "../../../../lib/i18n";

/**
 * Simplified Chinese edition of /guides/esim/best-esim-japan. Mirrors the English page
 * block by block as of 2026-11-05 — same sections, tables, CTAs and FAQ — and computes
 * every price from lib/esim-prices.ts with the same functions, so no figure is added
 * or copied by hand; only the words around them are localised.
 */

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/esim/best-esim-japan";
const TITLE = "日本eSIM推荐（2026）：流量卡方案比较与 Klook";
const DESC =
  "日本eSIM推荐 2026：Klook 日本 eSIM，以及 Simbye、Airalo、Holafly、eSIM Go 等五家的价格比较，每天更新。";

const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "22 Oct 2026" (the English constants' format) -> "2026年10月22日". */
function enDate(s: string): string {
  const m = s.match(/^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/);
  const mi = m ? EN_MONTHS.indexOf(m[2]) + 1 : 0;
  return m && mi ? dateLabel(`${m[3]}-${mi}-${m[1]}`, LOCALE) : s;
}

/** The price job's ISO timestamp, as the same UTC calendar day formatDate() prints. */
function isoDate(iso: string | null): string {
  if (!iso) return "尚未核查";
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

/** "10 GB / 30 days" -> "10 GB／30 天"; "Unlimited / 7 days" -> "无限流量／7 天". Figures untouched. */
function planName(name: string): string {
  return name.replace(/^Unlimited/, "无限流量").replace(/(\d+) days?$/, "$1 天").replace(" / ", "／");
}

/** The provider's network string from the price data, with its English connectives in Chinese. */
function networkLabel(s: string): string {
  return s.replace(/ ?\(\+2 others\)/g, "（另有 2 家）").replace(/\(Unlimited\)/g, "（无限流量）").replace(/ or /g, " 或 ").replace(/\/day/g, "/天");
}

// The plan table is English-only, so links to it are labelled as English.
const PLANS_HREF = "/guides/esim/japan-esim-data-plans";

const HOLAFLY_ALT = {
  esimId: "airalo" as EsimProviderId,
  ctaLabel: "获取 Airalo 无限流量 eSIM →",
  note: "Holafly 无法通过我们的链接购买——Airalo 是我们推荐的替代选择。",
};

/** Chinese copy of the default in components/SimbyeOffer.tsx. {plan} prints the feed's English plan name. */
const SIMBYE_OFFER = {
  label: "Simbye 优惠：",
  text: "优惠码 {code} 可让每个 eSIM 套餐立减 {percent}%：{plan} 定价 {list}，使用优惠码后 {price}。",
  cta: "获取 Simbye eSIM →",
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
    bestFor: "最低价套餐",
    badgeCls: styles.pickBadgeGreen,
    target: "只需要数据的大多数旅客，任何行程都适用。",
    summary: "纯数据的日本 eSIM，使用 NTT docomo、KDDI/au、SoftBank 与 Rakuten Mobile 网络，固定流量套餐从 1 GB 到 50 GB，无限流量套餐每天前 2 GB 全速。价格数据中的每个套餐都允许开热点。",
    pros: ["固定流量套餐的定价是五家中最低", "四家日本运营商，自动选择", "每个日本套餐都允许开热点", "50 GB 套餐有效期 180 天"],
    cons: ["纯数据（没有日本号码、通话或短信）", "无限流量套餐每天超过 2 GB 后降到 1 Mbps", "无限流量套餐无法充值"],
    ctaLabel: "获取 Simbye eSIM →",
    why: () =>
      `定价是五家中最低：10 GB 为 ${tenGb("simbye")}，eSIM Go 是 ${tenGb("esimgo")}、Airalo 是 ${tenGb("airalo")}；使用四家日本运营商网络，并允许开热点。`,
  },
  {
    id: "airalo-japan",
    esimId: "airalo",
    rank: 2,
    name: "Airalo 日本 eSIM",
    bestFor: "App 与客服首选",
    badgeCls: styles.pickBadgeBlue,
    target: "注重 App 体验、在线即时客服及不限量热点共享的游客。",
    summary: "全球最大的 eSIM 平台，用户超过 1,000 万。出发前先安装，抵达日本后即可启用——不用排队，也不用实体 SIM。",
    pros: ["全球最大的 eSIM 平台", "出发前就能完成启用设置", "套餐从 1 GB 到无限流量、3 到 30 天", "超过 1,000 万旅客使用"],
    cons: ["纯数据（不含语音通话或短信）", "需要支持 eSIM 的手机"],
    ctaLabel: "获取 Airalo eSIM →",
    why: () =>
      `10 GB 要 ${tenGb("airalo")}，比较贵，但无限流量套餐每天前 3 GB 全速、热点共享没有限制，还有 24 小时在线即时客服。`,
  },
  {
    id: "holafly-japan",
    esimId: "holafly",
    rank: 3,
    name: "Holafly 日本 eSIM",
    bestFor: "无限流量首选",
    badgeCls: styles.pickBadgeOrange,
    target: "高流量需求用户：远程办公、直播或每天进行视频通话的人。",
    summary: "无限流量 eSIM，无需随时关注剩余流量。很受需要随时在线的欧美旅客欢迎。",
    pros: ["手机本身流量不限", "套餐天数 1 到 90 天任选", "受美国与欧洲旅客欢迎", "扫二维码即可设置"],
    cons: ["纯数据（不含通话或短信）", "热点每天上限 1 GB", "比有流量上限的套餐贵"],
    ctaLabel: "获取 Holafly eSIM →",
    ctaAlt: HOLAFLY_ALT,
    why: () =>
      `只卖无限流量，${formatUsd(cheapestUnlimited("holafly")?.priceUsd ?? 0)} 起，手机本身没有每日限速门槛；排在 Airalo 之后，因为热点每天上限 1 GB，而且我们没有它的链接。`,
  },
  {
    id: "esim-go-japan",
    esimId: "esimgo",
    rank: 4,
    name: "eSIM Go 日本（Breeze）",
    bestFor: "流量最大",
    badgeCls: styles.pickBadgeBlue,
    target: "预算有限，或计划在一次行程中游览多个亚洲国家的游客。",
    summary: "覆盖 190 多个国家、性价比极高的 eSIM，通过 eSIM Go 的消费者品牌 Breeze 销售。适合预算有限，或一次旅行前往多个国家的游客。",
    pros: ["短期无限流量套餐，1 天起", "190 多个国家可用", "扫二维码即时启用", "非常适合多国行程"],
    cons: ["纯数据（不含语音或短信）", "品牌知名度不如 Airalo 或 Holafly", "需要支持 eSIM 的手机"],
    ctaLabel: "获取 eSIM Go →",
    why: () =>
      `10 GB 为 ${tenGb("esimgo")}，而且是这里唯一有 100 GB、200 GB 套餐与 1 天起无限流量套餐的服务商。`,
  },
  {
    id: "sakura-mobile",
    esimId: "sakura",
    rank: 5,
    name: "Sakura Mobile 旅游 eSIM",
    bestFor: "长期停留首选",
    badgeCls: styles.pickBadgeGreen,
    target: "停留一个月以上、需要语音通话与英文客服的人。",
    summary: "适合长期停留、需要英语客服的游客的日本本地服务商。旅游 eSIM 有每日 3 GB 或无限流量；实体 SIM 套餐可加语音。",
    pros: ["完整的英语客服", "提供可语音通话的 SIM 套餐（实体 SIM）", "实体 SIM 或 eSIM 均可", "最适合停留 1 个月以上"],
    cons: ["价格比纯数据转售商高", "首次设置稍慢"],
    ctaLabel: "获取 Sakura Mobile →",
    why: () =>
      "价格在五家中最高，但它是五家里唯一卖日本号码（含通话与短信）的，也是唯一有实体 SIM 的。",
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
    trip: "10 天以内、一般观光用量",
    pick: "Simbye 固定流量套餐",
    detail: () =>
      `${planLabel(SHORT_TRIP_PLAN)}——10 GB 对十天的行程来说是每天 1 GB 还有富余。Simbye 的价格数据列出 NTT docomo、KDDI/au、SoftBank 与 Rakuten Mobile，日本页面也写明“你不需要手动选网络”。允许开热点。`,
  },
  {
    trip: "2 到 4 周",
    pick: "注重总流量选 Simbye，偏好每日固定额度选 Sakura Mobile",
    detail: () =>
      `${planLabel(LONG_TRIP_PLAN)} 按每天 1 GB 计可用 20 天，同样使用这四家运营商网络。如果你更希望每天重新获得一份高速流量额度，Sakura Mobile 的每日 3 GB 系列使用 Docomo 5G 网络——${planLabel(SAKURA_DAILY_LONG)}——只有在单日用超过 3 GB 后才会降到 200 kbps。`,
  },
  {
    trip: "日本乡村、山区、离岛",
    pick: "使用 Docomo 网络的套餐，或支持四家日本运营商网络的套餐",
    detail: () =>
      "Sakura Mobile 的每日 3 GB 套餐使用 Docomo 5G 网络，Simbye 与 eSIM Go 则是多家运营商自动选择。Airalo 的日本页面显示 SoftBank 为主要网络，另有两家页面未列名称（核查日期 2026年11月1日）；Klook 的商品页上，按天计的套餐使用 SoftBank 5G 网络，总流量套餐使用 docomo 4G LTE 网络。",
  },
  {
    trip: "无限流量——远程办公、看视频、笔记本电脑开热点",
    pick: "看价格选 Simbye Unlimited；要更多全速流量选 eSIM Go Premium 或 Airalo Unlimited",
    detail: () =>
      `Simbye 的 ${planLabel(SIMBYE_UNLIMITED)} 是一周套餐中定价最低的，每天前 2 GB 全速，之后 1 Mbps。eSIM Go 的 ${planLabel(ESIMGO_UNLIMITED)} 全速可用 5 天 30 GB、10 天 60 GB 或 15 天 90 GB，之后“速度会降低（但仍足以播放 720p 视频）”，而且“每个套餐都支持热点共享”。Airalo 的 ${planLabel(AIRALO_UNLIMITED)} 每天前 3 GB 全速，之后以 1 Mbps 使用到 24 小时重置，并写明“热点共享与连接设备数量没有限制”。`,
  },
  {
    trip: "需要日本电话号码",
    pick: "Sakura Mobile 语音＋数据 eSIM",
    detail: () =>
      "六家里唯一带日本号码、通话与短信的套餐：au（KDDI）5G、每天 3 GB，1～10 天套餐含 120 分钟通话、11～60 天含 240 分钟、61 天以上含 360 分钟。它需要在日本现场完成身份证件核验，使用期在核验之后才开始，而不是抵达日本就开始。",
  },
  {
    trip: "一次旅行同时前往日本和韩国或台湾",
    pick: "改买亚洲区域 eSIM，而不是日本专用",
    detail: () =>
      "Airalo 的 Asia eSIM 覆盖“18 个国家与网络”，名单中包括日本、韩国与台湾；Breeze 的 eSIM Asia 覆盖“13 个国家与网络”，所查阅的页面上没有国家名单。两者都是独立产品，和本页标价的日本套餐不同。",
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
    how: "运营商以 Simbye 价格数据所列为准；其日本页面写明“你不需要手动选网络”，并说明 50 GB 套餐只使用 NTT Docomo 网络。允许开热点。纯数据。",
    checked: SIMBYE_CHECKED,
  },
  {
    provider: "Airalo（Moshi Moshi Japan）",
    carriers: "SoftBank（主要网络），另有 2 家页面未列名称",
    how: "日本产品页把 SoftBank 列为主要网络，并显示“+2 others”但未列出名称。纯数据。",
    checked: enDate("1 Nov 2026"),
  },
  {
    provider: "eSIM Go（Breeze）",
    carriers: "NTT Docomo、KDDI、Rakuten Mobile、SoftBank",
    how: "“你的设备会自动连上信号最强的网络。”纯数据——“不含短信或语音通话。”",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile——每日 3 GB 套餐",
    carriers: "Docomo 5G",
    how: "每日额度系列。可开热点；没有电话号码、没有语音、没有短信。",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile——无限流量与语音＋数据",
    carriers: "au（KDDI）5G",
    how: "无限流量为纯数据；语音＋数据带日本号码，需要现场完成身份核验。",
    checked: SPECS_CHECKED,
  },
  {
    provider: cnKlookEsim.label,
    carriers: "SoftBank 5G（按天计套餐）／IIJ（Docomo）4G LTE（总流量套餐）",
    how: "没有电话号码——纯数据。热点共享：支持。资料来自 Klook 的商品数据，而不是商品页本身。",
    checked: KLOOK_SPECS_CHECKED,
  },
];

const unlimitedRows = [
  {
    plan: "Simbye Unlimited",
    full: "每天 2 GB",
    after: "根据其价格数据，“之后以 1 Mbps 不限量”",
    hotspot: "“允许——可供笔记本电脑、平板或同行旅伴使用”",
    checked: SIMBYE_CHECKED,
  },
  {
    plan: "Airalo Unlimited（日本）",
    full: "每天 3 GB",
    after: "“当天剩余时间”降为 1 Mbps；流量“每 24 小时重置，从你启用 eSIM 的时间起算”",
    hotspot: "“热点共享与连接设备数量没有限制”",
    checked: SPECS_CHECKED,
  },
  {
    plan: "eSIM Go Premium Unlimited",
    full: "5 天 30 GB、10 天 60 GB、15 天 90 GB",
    after: "“速度会降低（但仍足以播放 720p 视频）”",
    hotspot: "“每个套餐都支持热点共享”，不另收费",
    checked: SPECS_CHECKED,
  },
  {
    plan: "Sakura Mobile Unlimited（au 5G）",
    full: "手机本身不限量",
    after: "所查阅的页面上未公布手机本身的限速门槛",
    hotspot: "按套餐时长设上限——根据套餐天数为 2 GB 到 30 GB",
    checked: SPECS_CHECKED,
  },
  {
    plan: "Sakura Mobile 每日 3 GB（Docomo 5G）",
    full: "每天 3 GB",
    after: "“每天使用 3 GB 数据后，速度将限制在 200 Kbps”",
    hotspot: "可使用",
    checked: SPECS_CHECKED,
  },
  {
    plan: `${cnKlookEsim.label}——无限流量套餐`,
    full: "每天 10 GB",
    after: "根据商品数据，每日 10 GB 后降为 128 kbps",
    hotspot: "支持",
    checked: KLOOK_SPECS_CHECKED,
  },
  {
    plan: "Holafly 无限流量",
    full: "未公布每日门槛",
    after: "适用“Fair Usage Policy”，官方表示一次不超过一天，之后恢复原速",
    hotspot: "每天可共享 1 GB",
    checked: "2026年11月6日",
  },
];

const timingRows = [
  {
    provider: "Simbye",
    starts: "“套餐只有在 eSIM 首次在目的地连接时才开始计算。”",
    install: "可以——其日本页面说出发前用 Wi-Fi 先安装",
    refund: "从未安装或启用且未使用任何数据，在购买后 30 天内申请可全额退款；详见其退款政策",
    checked: SIMBYE_CHECKED,
  },
  {
    provider: "Airalo",
    starts:
      "“eSIM 套餐的有效期在以下任一情况发生时开始：当你在覆盖范围内连上支持的网络，或当你安装 eSIM 时。”大多数套餐从连上网络起算——以该套餐的 Validity Policy（有效期政策）为准。",
    install: "大多数套餐可以在家提前安装；请先看该套餐的 Validity Policy",
    refund: "可以从 Airalo 账户提交退款申请；已过期或已用完的 eSIM 不符合条件",
    checked: SPECS_CHECKED,
  },
  {
    provider: "eSIM Go（Breeze）",
    starts: "“套餐有效期从在日本首次使用数据开始，而不是从购买时开始。”",
    install: "“出发前先安装。”",
    refund: "“如果你还没有使用任何数据，可以获得全额退款——无需理由”，3 个工作日内处理",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile",
    starts:
      "无限流量纯数据：“抵达日本后开始计算使用期”。每日 3 GB 数据：“安装 eSIM 后开始计算使用期”。语音＋数据：抵达日本并完成现场身份核验之后。",
    install: "每日 3 GB 套餐请抵达日本后再安装——如果在出发前安装，套餐就会开始计时",
    refund: "所查阅的页面上没有公布退款条款",
    checked: SPECS_CHECKED,
  },
  {
    provider: cnKlookEsim.label,
    starts: `以二维码电子券销售（“${klookEsim.listingTitle}”）；现有的商品数据未说明何时开始计算`,
    install: "未说明——请查看商品页",
    refund: "未说明——请查看商品页",
    checked: KLOOK_SPECS_CHECKED,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "eSIM 是什么？去日本需要吗？",
    a: "eSIM 是内置在手机里的数字 SIM——不需要实体卡片。你用二维码下载配置文件，马上就能用。去日本不一定要 eSIM，但它是目前最方便的选项：出发前买好并安装，抵达日本后启用。",
  },
  {
    q: "哪些手机在日本支持 eSIM？",
    a: "大多数近几年的手机都支持 eSIM：iPhone XS 以后、Google Pixel 3 以后、Samsung Galaxy S20 以后，以及许多其他 Android 旗舰机。请到手机「设置」→「关于本机」确认。注意：部分被运营商锁定的手机可能不支持 eSIM。",
  },
  {
    q: "用日本 eSIM 的时候，原来的手机号码还能继续使用吗？",
    a: "可以——这是 eSIM 最大的优点之一。大多数双卡手机可以同时使用两张 SIM。让原来的号码继续接收电话和短信，由日本 eSIM 负责数据。",
  },
  {
    q: "日本要用 Airalo 还是 Holafly？",
    a: "对大多数人来说 Airalo 比较好——价格较低，流量套餐选择也更灵活，而且按 Airalo 官方日本页面，主要网络是 SoftBank（核查日期 2026年11月1日）。如果你真的需要无限流量（远程办公、大量看视频），并且旅行预算能够接受价格差异，Holafly 才是更好的选择。",
  },
  {
    q: "抵达日本后 eSIM 不能用怎么办？",
    a: "首先确认该 eSIM 线路已开启“数据漫游”。如果仍无法连接网络，可以开启飞行模式后再关闭，强制重新搜索网络。这里列的每一家都提供 24 小时在线人工客服——Airalo 与 Holafly 响应特别快。",
  },
  {
    q: "日本 eSIM 和实体 SIM 卡有什么区别？",
    a: "两者都给你日本的移动数据，但 eSIM 设置更快（不必在机场排队）、多数情况更便宜，而且出发前就能买好。实体 SIM 卡则要在抵达后到机场柜台或自助售卡机等处购买。实体 SIM 的主要优点是：在不支持 eSIM 的手机上也能用。",
  },
  {
    q: "可以在日本直接用原本运营商的漫游吗？",
    a: "可以，但漫游很贵。多数国际运营商对日本漫游收每天约 $10～15。10 天的行程仅移动数据费用就需要 $100～150，而一份日本 eSIM 套餐的价格为 $9～18。除非你的运营商有覆盖日本的平价出境加油包，专用的日本 eSIM 几乎都更便宜。",
  },
  {
    q: "Airalo 在日本用哪家网络？",
    a: "以 Airalo 官方日本页面上显示的网络为准：SoftBank 是主要网络，另有“+2 others”，但页面没有列出名称，所以本指南也不列名称。核查日期 2026年11月1日。如果某一家运营商对你的行程很重要，购买前请先打开该页面的网络列表确认。",
  },
  {
    q: "Sakura Mobile 是什么？适合谁？",
    a: "Sakura Mobile 是日本本地的运营商，专为旅客与长期停留者提供 SIM 卡与 eSIM。和 Airalo、Holafly 不同，Sakura Mobile 含语音通话功能、有英语客服，套餐也适用到 90 天的停留。它使用 Docomo（日本最大的运营商）网络。它比便宜的 eSIM 贵，但对任何需要日本电话号码或长期停留的人来说是最好的选择。",
  },
  {
    q: "去日本需要多少流量？",
    a: "一般观光用途——Google 地图、消息、轻度浏览、拍几张照——每天 1 GB 是合理的估计。10 天的行程大约用 8～10 GB。如果你大量用导航开车、看视频，或远程办公，请按每天 2 GB 以上估算。多数旅客觉得 3～5 GB 的套餐足够一周的日本行。",
  },
  {
    q: "日本流量卡（eSIM）要多少钱？",
    a: `日本 eSIM 的价格因服务商与流量档位而不同（核查时间 ${pricesCheckedAt}）。省钱选项：Simbye ${planLabel(cheapestPlan("simbye"))} 起、eSIM Go ${planLabel(cheapestPlan("esimgo"))} 起、Airalo ${planLabel(cheapestPlan("airalo"))} 起。中档：5 GB 套餐 Simbye ${planLabel(cheapestAtLeastGb("simbye", 5))}，eSIM Go ${planLabel(cheapestAtLeastGb("esimgo", 5))}，Airalo ${planLabel(cheapestAtLeastGb("airalo", 5))}。无限流量：Holafly ${planLabel(cheapestUnlimited("holafly"))} 起。日本本地、有英语电话客服：Sakura Mobile ${planLabel(cheapestPlan("sakura"))} 起。一般旅客一周的行程，预计在 $10～20。`,
  },
  {
    q: "日本行程买无限流量值得吗？",
    a: "对大多数游客：不值得。日本的酒店、便利店与景区 Wi-Fi 覆盖很好。3～5 GB 的套餐就能撑过一般一周的导航、消息与浏览。无限流量套餐（例如 Holafly）贵 2～3 倍，主要对大量看视频、频繁视频通话，或会去 Wi-Fi 不好的地区的重度用户有意义。如果拿不定主意，先从 5 GB 开始，再考虑要不要加。",
  },
  {
    q: "到了日本可以加购流量吗？",
    a: "可以——大多数服务商支持在 App 内充值，不需要新的二维码。用 Airalo 的话，在 App 里买一个新套餐，它会自动加到你现有的 eSIM 配置文件上。eSIM Go 与 Sakura Mobile 有类似的充值流程。Holafly 的无限流量套餐是固定天数的，停留时间更长则需要购买新的套餐。",
  },
  {
    q: "日本的 eSIM 套餐含通话与短信吗？",
    a: "大多数面向旅客的 eSIM 套餐——包括 Simbye、Airalo、eSIM Go 与 Holafly——都是纯数据，不含语音通话或短信。在日本要通话，可以通过移动数据使用 WhatsApp、LINE 或 FaceTime 通话。如果你真的需要一个可以通话的日本号码，主要服务商里 Sakura Mobile 是最好的选择。",
  },
  {
    q: "日本 eSIM 什么时候启用？",
    a: "出发前就先安装（扫二维码）——这需要 2～5 分钟和一个 Wi-Fi 连接。不过大多数套餐的天数是从你在日本第一次连上网络开始算，不是从你安装配置文件开始。所以抵达日本后再把移动数据切换到日本的 eSIM，套餐才会在你需要的时候开始计时。",
  },
  {
    q: "日本哪家网络覆盖最好？",
    a: "Docomo 的乡村覆盖最完整，所以如果你的行程会离开主要城市，值得特意选它——Simbye、eSIM Go 与 Sakura Mobile 都使用它的网络。SoftBank 与 KDDI（Holafly 使用；SoftBank 也是 Airalo 日本页面上的主要网络）在城市与热门旅游线路上表现很好。走经典的东京－京都－大阪－广岛路线，哪一家都够用，你感觉不出差别。",
  },
  {
    q: "日本流量卡什么时候买？",
    a: "eSIM 出发前就买好，抵达日本后立即启用——没有等的理由，也不会售罄。实体 SIM 不一样：机场柜台与售卖机在旺季真的会缺热门套餐，而预订 Sakura Mobile 的 SIM 卡到机场或酒店取件，既比抵达后现场购买便宜，也比碰运气稳妥。",
  },
  {
    q: "用 eSIM 可以拿到日本电话号码吗？",
    a: `只有 Sakura Mobile 可以。它的语音＋数据 eSIM 使用 au（KDDI）5G 网络，每天 3 GB 高速数据，带日本号码、语音通话与短信——1～10 天套餐含 120 分钟通话、11～60 天含 240 分钟、61 天以上含 360 分钟——但需要在日本现场完成身份核验，使用期在核验之后才开始。Simbye、Airalo、eSIM Go 与 Klook 的商品，日本套餐都是纯数据：没有日本号码、没有短信、没有语音。如果你只是需要接收验证码短信，把原本的 SIM 留在另一个卡槽开着，让 eSIM 负责数据就好。核查时间 ${SPECS_CHECKED}。`,
  },
  {
    q: "无限流量会限速吗？",
    a: `会——每个日本“无限流量”套餐都有公布的门槛。Simbye 每天前 2 GB 全速，之后 1 Mbps。Airalo 超过 3 GB 后，当天剩余时间降到 1 Mbps，流量“每 24 小时重置，从你启用 eSIM 的时间起算”。eSIM Go 的 Premium Unlimited 全速可用 5 天 30 GB、10 天 60 GB 或 15 天 90 GB，之后“速度会降低（但仍足以播放 720p 视频）”。Sakura Mobile 的无限流量套餐手机本身不限量，但热点根据套餐时长上限 2～30 GB；它的每日 3 GB 套餐在单日用超过 3 GB 后降到 200 kbps。Klook 商品的无限流量套餐每天前 10 GB 全速，之后 128 kbps。Airalo 与 eSIM Go 的数据核查时间 ${SPECS_CHECKED}；Klook 的数据来自其 ${KLOOK_SPECS_CHECKED} 的商品数据。`,
  },
  {
    q: "日本 eSIM 完全没有使用，可以退款吗？",
    a: `要看服务商。根据 Simbye 的退款政策，从未安装或启用且未使用任何数据的 eSIM，在购买后 30 天内申请可全额退款。eSIM Go 写明“如果你还没有使用任何数据，可以获得全额退款——无需理由”，3 个工作日内处理。Airalo 可以从账户提交退款申请，并注明已过期或已用完的 eSIM 不符合条件。Sakura Mobile 的旅游 eSIM 页面没有公布退款条款，Klook 商品的条款未列于此，请在商品页确认。另一个需要注意的是有效期的起算时间，而不是费用：eSIM Go 的有效期“从在日本首次使用数据开始，而不是从购买时开始”，但 Sakura Mobile 的每日 3 GB 套餐“安装 eSIM 后开始计算”——所以这些套餐要抵达日本后再安装，不要在出发前安装。核查时间 ${SPECS_CHECKED}。`,
  },
  {
    q: "为什么我的日本 eSIM 速度很慢？",
    a: "几个可能原因：你用掉了大部分流量（许多套餐在门槛后限速）、你在覆盖不好的地方（隧道、山区），或是在涩谷、京都站等人流密集的地方遇到网络拥堵。先试着开关飞行模式。如果流量还没用完、速度也没改善，请联系服务商客服。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "日本eSIM推荐" },
];

/** One Klook eSIM slot, under the two tables where a reader has just made a decision. */
function KlookEsimSlot({ why }: { why: string }) {
  return (
    <div className={styles.pickTarget} style={{ marginTop: "1.25rem", flexWrap: "wrap", gap: "0.6rem" }}>
      <span className={styles.pickTargetLabel}>Klook 也有：</span>
      <span>
        {why}{" "}
        <KlookLink
          href={cnKlookEsim.url}
          target="_blank"
          rel={KLOOK_REL}
          style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
        >
          查看 Klook eSIM 价格 →
        </KlookLink>
      </span>
    </div>
  );
}

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnBestEsimJapanPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>价格核查时间 {pricesCheckedAt}</p>
          <h1 className={styles.heroTitle}>
            日本eSIM推荐 2026：<br />按价格与网络比较流量卡
          </h1>
          <p className={styles.heroSubtitle}>
            一文汇总主流日本旅游 eSIM，根据不同旅行需求推荐合适的套餐，并说明各套餐实际使用的日本运营商网络。
          </p>
          <div className={styles.heroBadges}>
            {["价格每天核查", "6 款 eSIM 比较", "独立评测"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <EsimUseCaseTable copy={esimPicksCopy["zh-cn"]} checkedLabel={pricesCheckedAt} formatPlan={planName} klookLocale="zh-cn" />

        {/* The answer, before the table — a pick per kind of trip, with the numbers in it. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>10 天以内</strong>、一般观光用量的行程，首选是
            <strong>Simbye 的 {planLabel(SHORT_TRIP_PLAN)}</strong>——10 GB 等于每天 1 GB 还有富余，是本页比较的套餐中定价最低的，其价格数据列出
            NTT docomo、KDDI/au、SoftBank 与 Rakuten Mobile；<strong>两到四周</strong>的话，同一家的
            <strong>{planLabel(LONG_TRIP_PLAN)}</strong> 按同样的用量可用 20 天。如果你要的是<strong>无限流量</strong>而不是固定流量，Simbye 的
            <strong>{planLabel(SIMBYE_UNLIMITED)}</strong> 是一周套餐中最便宜的，但每天前 2 GB 全速，之后 1 Mbps；eSIM Go 的
            <strong>{planLabel(ESIMGO_UNLIMITED)}</strong> 全速可用 5 天 30 GB 或 10 天 60 GB，之后降到仍可看 720p 的速度；Airalo 的
            <strong>{planLabel(AIRALO_UNLIMITED)}</strong> 每天前 3 GB 全速，之后以 1 Mbps 使用到 24 小时重置，热点共享没有上限。只有
            <strong>Sakura Mobile</strong> 提供<strong>日本电话号码</strong>：它的语音＋数据 eSIM 使用 au（KDDI）5G 网络，每天 3 GB，根据套餐时长含
            120～360 分钟通话，抵达日本后需要现场完成身份核验。
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            价格由每天重新读取的程序于 {pricesCheckedAt} 从各服务商官网读取。网络、合理使用门槛、热点上限、是否提供电话号码与退款规定的读取时间为
            {SPECS_CHECKED}（Simbye 为 {SIMBYE_CHECKED}，来自 simbye.com 与其价格数据）；Klook 的资料来自其 {KLOOK_SPECS_CHECKED} 的商品数据。
          </p>
        </section>

        {/* Quick Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>一览<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>各服务商快速对比</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["服务商", "适用人群", "最低价", "最便宜套餐", "网络", "语音／短信", "实体SIM", "评分", ""].map((h) => (
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
                    <td className={styles.tdProvider}>{cnKlookEsim.label}</td>
                    <td className={styles.tdBestFor}>已经在 Klook 订门票的人</td>
                    <td className={tools.tdMuted}>在 Klook 查看</td>
                    <td className={tools.tdMuted}>—</td>
                    <td className={tools.tdMuted}>商品页未标示</td>
                    <td><span className={styles.no}>✗</span></td>
                    <td><span className={styles.no}>✗</span></td>
                    <td className={tools.tdMuted}>未排名</td>
                    <td>
                      <KlookLink href={cnKlookEsim.url} className={styles.tdLink} target="_blank" rel={KLOOK_REL}>
                        查看 Klook eSIM 价格 →
                      </KlookLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Klook 单独列出，不参与排名。上面五家是按每天从各自官网读取的价格排名；Klook 的 eSIM 价格随日期变化（核查日 {KLOOK_CHECKED}），
            所以没有价格或流量档位可以拿来和它们比较。请打开商品页查看当前的套餐。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            <span className={tools.liveBadge}><span className={tools.liveDot} /> 价格每天核查</span>
            <span>
              「最低价」是各服务商最便宜的日本套餐，时间点为 {pricesCheckedAt}。{" "}
              <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>查看所有套餐、按每 GB 单价排序（英文）→</Link>
            </span>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            只有 Sakura Mobile 卖语音套餐与实体 SIM 卡——另外四家都是纯数据的 eSIM。如果你需要一个日本电话号码，或你的手机完全不能用 eSIM，
            在考虑价格之前选择就只剩一个。请看{" "}
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" className={tools.inlineLink}>
              日本 SIM 卡 vs eSIM（英文）→
            </Link>
          </p>
        </section>

        {/* Q: What is the best eSIM for Japan? — the pick-by-itinerary table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>简短回答<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>日本 eSIM 哪一家最好？</h2>
          <p className={styles.bodyText}>
            没有单一的最佳选择，因为这五家服务商面向的旅行需求并不相同。Simbye 的固定流量套餐定价最低；eSIM Go 的流量最大；要无限流量又不限热点共享，选 Airalo；
            要日本电话号码，只有 Sakura Mobile。找到符合自己需求的选项：
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>你的行程</th>
                    <th>该买什么</th>
                    <th>原因——天数、GB、运营商、价格</th>
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
            价格时间点为 {pricesCheckedAt}；运营商名单、合理使用门槛与区域套餐的国家数，于 {SPECS_CHECKED} 从各服务商官网读取。
          </p>
          <KlookEsimSlot why="如果这趟行程的门票与交通已经放在 Klook 的购物车里，Klook 的日本 eSIM 可以一起结算——按天计套餐使用 SoftBank 5G 网络，总流量套餐使用 IIJ（Docomo）4G LTE 网络，支持热点共享。这里不列入排名，因为 Klook 未注明 US$1.05 起售价对应的具体套餐，请打开商品页查看当前的套餐。" />
        </section>

        {/* Q: Which eSIM is best for a 2-week trip? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>两周行程<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>两周日本旅行用哪款 eSIM 最好？</h2>
          <p className={styles.bodyText}>
            <strong>{tripPlanLabel(14, 14)}</strong> 是能按每天 1 GB 用满 14 天的最便宜套餐；如果你的用途是地图、消息和拍几张照，而不是看视频，
            <strong>{tripPlanLabel(14, 7)}</strong> 就够了。两者都是 30 天套餐，所以对于两周的行程，限制因素不是有效期，而是流量。
          </p>
          <p className={styles.bodyText}>
            有两个替代选择值得多花钱，但都是出于特定理由，而不是一般情况。Sakura Mobile 的
            {planLabel(allEsimPlans.find((p) => p.id === "sakura-45-gb-15-days") ?? null)}
            每天提供 3 GB 高速流量（Docomo 5G），不用一直担心总流量不够用，适合两周里会去山区或小岛的行程。如果两周的出差需要笔记本电脑开热点，
            {planLabel(cheapestUnlimited("esimgo", 15))} 或 {planLabel(cheapestUnlimited("airalo", 15))}
            可以买到同样天数的无限流量——各自限速到多少，请看下面的限速表。
          </p>
        </section>

        {/* Q: How much data do I need in Japan? — the days-to-GB table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>估算流量<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>去日本需要多少流量？</h2>
          <p className={styles.bodyText}>
            地图、消息、拍几张照、偶尔查时刻表，可按<strong>每天 0.5 GB</strong> 估算；如果还会使用视频通话、观看短视频或在线听音乐，可按<strong>每天 1 GB</strong> 估算。
            这样算来 10 天的行程是 5～10 GB、两周是 7～14 GB、三周是 10.5～21 GB——远低于服务商视为重度使用的量：Airalo 的合理使用门槛是单日 3 GB，
            Sakura Mobile 的每日上限是 3 GB，Klook 商品的无限流量套餐每天前 10 GB 全速。
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>行程天数</th>
                    <th>每天 0.5 GB</th>
                    <th>每天 1 GB</th>
                    <th>覆盖每天 0.5 GB 的最便宜套餐</th>
                    <th>覆盖每天 1 GB 的最便宜套餐</th>
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
            GB 列是按上面的估算数字计算的；套餐列是能覆盖该用量的最便宜在售套餐，价格读取于 {pricesCheckedAt}。Holafly 不列入这两列，因为本站没有可以购买它的链接。
            每日上限型套餐按“每日上限 × 行程天数”计算，而不是看标示的总量，这是和固定流量套餐公平比较的唯一方法。{" "}
            <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>
              所有套餐，按每 GB 单价排序（英文）→
            </Link>
          </p>
          <KlookEsimSlot why="Klook 的日本 eSIM 分档从 500 MB 到 50 GB，另有无限流量选项，所以同样覆盖这些用量。US$1.05 是选择套餐天数和流量前显示的起售价，因此这里不列各套餐价格。" />
        </section>

        {/* Q: Which network is best in Japan? — carrier table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>网络对比<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>日本哪家网络最好，Docomo、au 还是 SoftBank？</h2>
          <p className={styles.bodyText}>
            在东京－京都－大阪－广岛路线上，实际上没有差别——三家都覆盖城市与新干线沿线。差别在离开这些地方之后：日本本地服务商的乡村套餐都建立在 Docomo 的网络上；
            而且本次查阅的服务商页面均未公布覆盖率数据，因此，选择套餐时应看实际使用哪家运营商网络，而不是看宣传。销售品牌不等于实际提供网络的运营商：
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>套餐</th>
                    <th>在日本使用的运营商网络</th>
                    <th>服务商的说明</th>
                    <th>核查日</th>
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
            如果你根本不想选运营商，Simbye 与 eSIM Go 就是不用你选的：两者都列出四家运营商，并自动选择其中一家。
          </p>
        </section>

        {/* "Unlimited", throttling and hotspot */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>使用规则<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>“无限流量”具体指什么？能否开热点？</h2>
          <p className={styles.bodyText}>
            没有任何日本无限流量套餐是无限全速的。每一家都公布了门槛与超过后的限速，而差别最大的是热点——一家完全不限制热点共享，另一家按 GB 设上限。
            如果你买无限流量是为了给笔记本电脑开热点，决定的就是这一列：
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>套餐</th>
                    <th>全速上限</th>
                    <th>超过之后</th>
                    <th>热点／共享网络</th>
                    <th>核查日</th>
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
            引号中的内容为服务商原文的中文翻译，查阅日期见最后一列。Holafly 是第六家卖无限流量的服务商，热点每天上限 1 GB；它在上面的比较表中，但这里没有链接，
            因为本站目前没有可加入的 Holafly 推广联盟计划。{" "}
            <Link href="/guides/esim/japan-esim-unlimited" className={tools.inlineLink}>
              日本无限流量 eSIM 详细说明（英文）→
            </Link>
          </p>
        </section>

        {/* Phone numbers, SMS and voice */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>通话与短信<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>日本电话号码、短信及语音通话</h2>
          <p className={styles.bodyText}>
            六家里有五家是纯数据——没有日本号码、没有短信、没有语音。eSIM Go 直接写明（“不含短信或语音通话。纯数据。”），Simbye 的日本页面写着“通话与短信：不含”，Airalo 的日本套餐是纯数据、没有号码，
            Klook 的商品数据则把服务类型标为没有电话号码、纯数据。
          </p>
          <p className={styles.bodyText}>
            例外是 <strong>Sakura Mobile 的语音＋数据 eSIM</strong>：au（KDDI）5G、每天 3 GB 高速数据、带日本号码可通话与收发短信，所含通话分钟数随套餐增加——
            1～10 天套餐 120 分钟、11～60 天 240 分钟、61 天以上 360 分钟。它有一个纯数据套餐没有的条件：需要在日本现场完成身份核验，使用期在核验之后才开始，
            而不是抵达日本就开始。信息于 {SPECS_CHECKED} 查阅自 sakuramobile.jp。
          </p>
          <p className={styles.bodyText}>
            如果你真正需要的是接收银行验证码短信，根本不需要日本号码：让原本的 SIM 和 eSIM 同时开着，由 eSIM 负责数据即可。通话的话，日本人自己用的是 LINE，
            WhatsApp 或 FaceTime 也都可以通过移动数据使用。{" "}
            <Link href="/guides/esim/japan-sim-card-long-term-stay" className={tools.inlineLink}>
              带号码的长期停留套餐（英文）→
            </Link>
          </p>
        </section>

        {/* Refunds and install timing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>时间点<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>什么时候开始计时，什么时候还能退款</h2>
          <p className={styles.bodyText}>
            对某些服务商来说提前安装没有问题，对另一些服务商来说却会让套餐提前开始计时，因为各服务商对“什么会启动有效期”的规定不一样。对短天数套餐来说，差别可能是一两天：
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>服务商</th>
                    <th>什么会开始计时</th>
                    <th>出发前可以先安装吗？</th>
                    <th>未使用能否退款</th>
                    <th>核查日</th>
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
          <span className={styles.sectionLabel}>购买前须知<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>去日本需要 eSIM 吗？</h2>
          <p className={styles.bodyText}>
            不需要——入境日本没有任何规定要你有 eSIM，而且酒店、便利店、车站和大多数咖啡馆都有 Wi-Fi。eSIM 解决的是这些有 Wi-Fi 的地方之间的上网需求，
            例如在站台查询临时变更的时刻表、在公交站查看地图，或排队时扫码查看餐厅菜单。本页最便宜的日本套餐是 Simbye 的
            {planLabel(cheapestPlan("simbye"))}，比大多数运营商一天的漫游费还便宜。
          </p>
          <p className={styles.bodyText}>
            有两项检查比价格更重要。你的手机必须支持 eSIM 而且没有被运营商锁定；你的套餐必须符合你的出行方式，而不是只看你离开多久——
            一个 30 天、5 GB 的套餐，对两周都要视频通话的行程来说就是买错了。{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" className={tools.inlineLink}>
              你的手机在日本能用 eSIM 吗？（英文）→
            </Link>
          </p>
        </section>

        {/* Q: iPhone and Android */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>按手机<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>在日本，iPhone 和 Android 用哪个 eSIM 最好？</h2>
          <p className={styles.bodyText}>
            iPhone 和 Android 可选的服务商相同。这五家都没有 iPhone 专用或 Android 专用的日本套餐——它们都是标准的 eSIM 配置文件，用二维码或激活链接安装，
            该选哪一家应该由上面的表格决定，而不是由你的手机决定。不同的是购买前要做的检查，以及安装时要进的菜单。
          </p>
          <p className={styles.bodyText}>
            iPhone 需要 iPhone XS 以后的机型且未锁运营商，配置文件加在「设置」→「蜂窝网络」；Android 则要检查 EID，而且菜单位置在 Samsung、Pixel、Xperia
            与 OnePlus 上各不相同。各有专门的教程：{" "}
            <Link href="/guides/esim/japan-esim-iphone" className={tools.inlineLink}>
              iPhone 用日本 eSIM（英文）→
            </Link>{" "}
            与{" "}
            <Link href="/guides/esim/japan-esim-android" className={tools.inlineLink}>
              Android 用日本 eSIM（英文）→
            </Link>
          </p>
        </section>

        {/* Top Picks */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>日本 eSIM 推荐<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>五家服务商排名</h2>
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
                      <span className={styles.pickNumber}>{rank}<span className="sr-only">. </span></span>
                      <div className={styles.pickMeta}>
                        <span className={`${styles.pickBadge} ${badgeCls}`}>{bestFor}<span className="sr-only">：</span></span>
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
                      <span className={styles.pickTargetLabel}>适用人群：</span>
                      <span>{target}</span>
                    </div>
                    <div className={styles.pickTarget} style={{ marginTop: "0.6rem" }}>
                      <span className={styles.pickTargetLabel}>为什么排第 {rank}：</span>
                      <span>{why()}</span>
                    </div>
                    <div className={styles.pickGrid}>
                      <div className={styles.pickPros}>
                        <p className={styles.pickListLabel}>优点</p>
                        <ul className={styles.pickList}>
                          {pros.map((p) => (
                            <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.pickCons}>
                        <p className={styles.pickListLabel}>缺点</p>
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
                        比较所有套餐（英文）
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
                  <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>另一个选择<span className="sr-only">：</span></span>
                  <span className={styles.pickName}>{cnKlookEsim.label}</span>
                </div>
              </div>
            </div>
            <div className={styles.pickCardBody}>
              <p className={styles.pickSummary}>
                Klook 也销售日本 eSIM，如果你已经在 Klook 预订门票或交通，值得考虑：一次结算，同一个账号管理。它不列入排名：Klook 的价格随日期变化，
                所以没有经过核查的价格可以拿来排名。请打开商品页查看当前的套餐。
              </p>
              <div className={styles.pickTarget}>
                <span className={styles.pickTargetLabel}>适用人群：</span>
                <span>已经在 Klook 买日本门票或交通、想把 eSIM 放在同一个账号的旅客。</span>
              </div>
              <div className={styles.pickCtaRow}>
                <KlookLink href={cnKlookEsim.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
                  查看 Klook eSIM 价格 →
                </KlookLink>
                <Link href={PLANS_HREF} className={styles.pickCtaInternal}>
                  比较所有套餐（英文）
                </Link>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                在 Klook 上的商品名称为“{klookEsim.listingTitle}”。{KLOOK_ESIM_FACTS["zh-cn"]}
              </p>
            </div>
          </article>
        </section>

        <EsimBuyGuide copy={esimPicksCopy["zh-cn"]} />

        <FaqList items={faqItems} />

        {/* Deep dives — every destination here is English-only, so each is labelled. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>深入了解<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>如果你的情况比较特殊</h2>
          <p className={styles.bodyText}>
            本页是按一般行程为五家排名。有几种常见情况会改变答案，各有专门的攻略：
          </p>
          <ul className={styles.pickList}>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
                eSIM 在日本到底能不能用？（英文）
              </Link>
              ——购买前要对手机做的三项检查。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-sim-card-vs-esim-2026" style={{ color: "var(--accent)", fontWeight: 600 }}>
                SIM 卡 vs eSIM（英文）
              </Link>
              ——不论价格，只能用实体 SIM 的两种情况。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-students" style={{ color: "var(--accent)", fontWeight: 600 }}>
                学生与长期留学（英文）
              </Link>
              ——按月计价，以及日本国内 MVNO 何时胜过所有旅游 eSIM。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-family-group" style={{ color: "var(--accent)", fontWeight: 600 }}>
                家庭与团体（英文）
              </Link>
              ——几个人以上，一台共用的随身 Wi-Fi（Pocket WiFi）会比每人一张 eSIM 划算。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-business" style={{ color: "var(--accent)", fontWeight: 600 }}>
                商务出差（英文）
              </Link>
              ——重点是热点条款而不是价格，因为笔记本电脑开热点会让一天的用量变成三倍。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-android" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Android 手机（英文）
              </Link>
              ——EID 检查，以及在 Samsung、Pixel、Xperia 与 OnePlus 上要打开的菜单。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/simbye-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Simbye 详细介绍（英文）
              </Link>
              ——我们的最低价推荐：所有日本套餐、优惠码，以及不适合哪些人。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/esim-go-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
                eSIM Go 详细介绍（英文）
              </Link>
              ——单独一家看：价格、网络与热点共享。
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/best-esim-japan-reddit" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Reddit 推荐什么（英文）
              </Link>
              ——r/JapanTravel 的常见建议，对照本月的价格核查。
            </li>
          </ul>
        </section>

        <Related
          items={[
            { href: "/guides/esim/japan-esim-10-days", title: "日本 eSIM 10 天：需要多少流量？（英文）" },
            { href: "/guides/esim/japan-esim-data-plans", title: "日本 eSIM 流量套餐 2026：需要多少流量？（英文）" },
            { href: "/guides/esim/japan-sim-card-long-term-stay", title: "日本长期停留 SIM 卡：90 天以上套餐（英文）" },
            { href: "/guides/esim/cheapest-esim-japan", title: "日本最便宜的 eSIM 2026：省钱首选（英文）" },
            { href: "/guides/esim/airalo-japan-review", title: "Airalo 日本测评 2026：值得买吗？（英文）" },
            { href: "/guides/esim/sakura-mobile-review", title: "Sakura Mobile 测评 2026：长期停留最好的 SIM？（英文）" },
            { href: "/guides/esim/japan-esim-unlimited", title: "日本无限流量 eSIM 推荐（2026）：重度用户首选（英文）" },
            { href: "/guides/esim/how-to-set-up-esim-japan", title: "在日本设置 eSIM 的方法（分步教程）（英文）" },
            { href: "/guides/esim/japan-esim-iphone", title: "iPhone 用日本 eSIM 推荐（2026）：设置与推荐（英文）" },
            { href: "/guides/esim/airalo-vs-holafly-japan", title: "日本旅行选 Airalo 还是 Holafly：哪款 eSIM 更合适？（英文）" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>准备好比较所有套餐了吗？</h2>
            <p className={styles.ctaBannerDesc}>
              五家服务商的每一个日本 eSIM 套餐，按每 GB 单价排序，每天更新。
            </p>
            <Link href={PLANS_HREF} className={styles.ctaBannerBtn}>
              按每 GB 单价查看所有套餐（英文）→
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
