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
import HotelStayBlock from "../../../../components/HotelStayBlock";

// Mirrors the English page (/guides/attractions/hakone-free-pass) section by section as of
// 2026-11-24 (task-jtk-20261124-TR01): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added.
// Title term: 箱根周游券 — the name on Hakone Navi's own Simplified Chinese page
// (hakonenavi.jp/international/cn/discount_passes/free_pass) and in Simplified-Chinese results.
// Body text is kept on one line per paragraph: a JSX line break inside Chinese text renders as a space.

// R17 (2026-11-27, task-jtk-20261127-R17): the ride-by-ride break-even table, the route table
// and the 1-day-or-2-day table mirror the English page with the same figures and sources.
const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/hakone-free-pass";
const TITLE = "箱根周游券 2026：新宿出发价格与是否划算";
const H1 = "箱根周游券 2026：新宿出发价格、路线与是否划算";
const DESC =
  "箱根周游券 2026：新宿出发2日券 ¥7,100，小田原 ¥6,000，8种交通工具不限次数乘坐。环线单程票合计 ¥8,322，当天往返也省 ¥1,222。";

const CHECKED_ISO = "2026-11-27";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const BUY_CHECKED_ISO = "2026-11-27";
const BUY_CHECKED = dateLabel(BUY_CHECKED_ISO, LOCALE);
const LOOP_URL = "https://www.hakonenavi.jp/international/en/article/4252";
const JR_URL = "https://odakyu-global.com/blog/2053/";
const LOOP_REGULAR = "¥8,322";
const LOOP_SAVING = "¥1,222";
const NAVI_URL = "https://www.hakonenavi.jp/international/en/discount_passes/free_pass";
const ODAKYU_URL = "https://www.odakyu.jp/english/passes/hakone/";
const FARE_NOTICE_URL = "https://www.hakonenavi.jp/international/en/wp-content/uploads/sites/2/2025/09/re_price202510.pdf";
const BREAKDOWN_URL = "https://www.hakonenavi.jp/feature/22866";
const LP_URL = "https://www.hakonenavi.jp/lp/hakone-freepass/";
const ROPEWAY_URL = "https://www.hakonenavi.jp/international/en/transportation/hakone-ropeway";
const CRUISE_URL = "https://www.hakonenavi.jp/international/en/transportation/hakone-kankosen";
const ITINERARY_URL = "https://hakonetrip.odakyu-global.com/feature/hakone-2-day-itinerary/";

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
  { pass: "大多数从东京出发的游客适用：新宿出发 2 日券", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "新宿出发（含小田急线往返）", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "小田原出发（仅限箱根地区）", d2a: PASS_2_DAY_ODAWARA, d2c: "¥1,500", d3a: PASS_3_DAY_ODAWARA, d3c: "¥1,750" },
  { pass: "町田出发", d2a: "¥6,820", d2c: "¥1,600", d3a: "¥7,220", d3c: "¥1,850" },
  { pass: "藤泽出发", d2a: "¥7,050", d2c: "¥1,600", d3a: "¥7,450", d3c: "¥1,850" },
];

const buyRows = [
  {
    where: "简单来说",
    ticket: "同行每个人都有智能手机，就在出发前在线购买",
    when: "如果同行儿童没有自己的手机，就在小田急线车站买纸质票",
    note: "电子票可保存在智能手机中（一起出行时，可通过 For Group 选项将最多 4 张电子票存入同一部手机）；纸质票则人人都能使用。",
  },
  {
    where: "EMot 在线购票（小田急官方网站）",
    ticket: "二维码电子票，仅限智能手机使用",
    when: "出发前在线购买",
    note: "一起出行时，可通过 For Group 选项将最多 4 张电子票存入同一部手机。通过 EMot 购买浪漫特快特急券，比在车站购买便宜 ¥50。仅在电子票页面显示退款按钮时才可退款。",
  },
  {
    where: "小田急线各站（售票机）与小田急旅游服务中心",
    ticket: "纸质票",
    when: "小田急线车站提前 1 个月开始售票；自动售票机仅发售当天起生效的周游券",
    note: "售票机可用现金、PASMO／Suica，以及 American Express、Diners Club、JCB、Mastercard、Visa 支付。",
  },
  {
    where: "7-ELEVEN 便利店（7-Ticket）",
    ticket: "通过店内多功能打印设备打印的纸质票",
    when: "出发前",
    note: "无需支付出票手续费。包含小田急线往返的周游券仅限新宿出发。",
  },
  {
    where: "在箱根当地：箱根登山电车售票机与箱根登山巴士服务处",
    ticket: "纸质票",
    when: "当天",
    note: "售票机设在箱根汤本、强罗、早云山等箱根登山电车及登山缆车车站；巴士服务处在小田原站、箱根汤本、元箱根、箱根町、仙石、桃源台与宫城野。",
  },
  {
    where: "Klook",
    ticket: "通过 Klook 购买同款小田急箱根周游券",
    when: "出发前在线购买",
    note: "支持中文的付款页面，支持使用日本境外发行的银行卡支付。兑换方式及取消政策，请以商品页面说明为准。",
  },
];

const coverageRows = [
  {
    mode: "小田急线（新宿 ⇄ 小田原）",
    included: "✓ 去程、返程各 1 次",
    note: "仅限新宿出发的周游券，途中可以下车。小田原出发的周游券不含这一段。",
  },
  { mode: "箱根登山电车（小田原／箱根汤本 ⇄ 强罗）", included: "✓ 不限次数", note: "通过之字形折返线路爬坡的登山铁路，是从箱根汤本出发游览箱根环线的第一段。" },
  { mode: "箱根登山缆车（强罗 ⇄ 早云山）", included: "✓ 不限次数", note: "沿山坡上行、连接空中缆车起点站的登山缆车。" },
  { mode: "箱根空中缆车（早云山 ⇄ 大涌谷 ⇄ 桃源台）", included: "✓ 不限次数", note: `这段线路途经大涌谷，单程 ${ROPEWAY}，是整条环线中单程票价最高的交通工具。` },
  { mode: "箱根海贼观光船（芦之湖）", included: "✓ 不限次数", note: `从桃源台到箱根町或元箱根，不使用周游券时，单程票价为 ${CRUISE}。特别船舱需额外付费。` },
  { mode: "箱根登山巴士（指定区间）", included: "✓ 不限次数", note: "游览完箱根环线后返回箱根汤本或小田原时乘坐。" },
  { mode: "景点巡回巴士（KANKO SHISETSU-MEGURI）", included: "✓ 不限次数", note: "由箱根登山巴士和小田急高速巴士运营，往返于各景点之间。" },
  { mode: "小田急高速巴士（指定区间）", included: "✓ 不限次数", note: "已预订车票的乘客优先上车，因此可能满座。" },
  { mode: "东海巴士（指定区间）", included: "✓ 不限次数", note: "只能在指定区间内使用。" },
  { mode: "特急浪漫特快", included: "✗ 不含", note: `需要另购特急券：新宿到箱根汤本成人 ${ROMANCECAR}，儿童 ¥600。` },
  { mode: "伊豆箱根巴士", included: "✗ 不含", note: "由其他公司运营，上车前请确认巴士的运营公司。" },
];

const fareRows: ReactNode[][] = [
  ["结论", "坐到箱根环线的第 7 段、也就是返回新宿的电车时，周游券就回本了", LOOP_REGULAR, `比 ${PASS_2_DAY_SHINJUKU} 的周游券多 ${LOOP_SAVING}`],
  ["1. 小田急线＋登山线", "新宿 → 箱根汤本", "¥1,261", "¥1,261"],
  ["2. 箱根登山电车", "箱根汤本 → 雕刻之森（强罗的前一站）", "¥460", "¥1,721"],
  ["3. 箱根登山缆车", "强罗 → 早云山", "¥430", "¥2,151"],
  ["4. 箱根空中缆车", "早云山 → 大涌谷 → 桃源台", ROPEWAY, "¥4,151"],
  ["5. 箱根海贼观光船", "桃源台 → 元箱根", CRUISE, "¥5,851"],
  ["6. 箱根登山巴士", "元箱根 → 箱根汤本", "¥1,210", "¥7,061——仍比周游券少 ¥39"],
  ["7. 小田急线＋登山线", "箱根汤本 → 新宿", "¥1,261", `${LOOP_REGULAR}——周游券已回本`],
  ["新宿出发 2 日券", "用周游券走同一条路线", PASS_2_DAY_SHINJUKU, `一天省 ${LOOP_SAVING}`],
  ["新宿出发 3 日券", "用周游券走同一条路线", PASS_3_DAY_SHINJUKU, "一天省 ¥822"],
  ["箱根Navi 的两天行程", "箱根环线加上前往美术馆和湿生花园的 4 段巴士", "¥10,622", `使用 ${PASS_2_DAY_SHINJUKU} 的周游券省 ¥3,522`],
  ["小田原出发周游券，只算第 2–6 段", "从箱根汤本绕一圈再回来", "¥5,800", `比 ${PASS_2_DAY_ODAWARA} 的周游券少 ¥200——加上小田原 ⇄ 箱根汤本的电车或第二天就回本`],
];

const routeRows: ReactNode[][] = [
  ["整条箱根环线", "箱根汤本 → 强罗 → 早云山 → 大涌谷 → 桃源台 → 元箱根 → 箱根汤本", "乘坐时间约 2.5–3 小时，另加换乘和游览时间", "✓ 每一段都可用"],
  ["1. 浪漫特快或小田急线", "新宿 → 箱根汤本", "浪漫特快直达约 80 分钟；普通列车通常在小田原换乘", `✓ 小田急线（新宿出发版，往返一次）· ✗ 浪漫特快特急券 +${ROMANCECAR}`],
  ["2. 箱根登山电车", "箱根汤本 → 强罗（之字形折返）", "到雕刻之森约 40 分钟，下一站就是强罗", "✓"],
  ["3. 箱根登山缆车", "强罗 → 早云山", "约 10 分钟", "✓"],
  ["4. 箱根空中缆车", "早云山 → 大涌谷 → 姥子 → 桃源台", "每段约 15 分钟，在大涌谷换乘", "✓"],
  ["5. 箱根海贼观光船", "桃源台 → 箱根町或元箱根", "约 25–35 分钟", "✓（特别船舱 +¥800）"],
  ["6. 箱根登山巴士", "元箱根 → 箱根汤本", "约 40 分钟（H 线）或 35 分钟（K 线）", "✓ · ✗ 伊豆箱根巴士"],
  ["7. 小田急线或浪漫特快", "箱根汤本 → 新宿", "同第 1 段", "✓ 小田急线 · ✗ 浪漫特快特急券"],
];

const passChoiceRows: ReactNode[][] = [
  ["结论：箱根周游券没有 1 日券", "游览完整条箱根环线的话，只玩一天也买 2 日券", `新宿出发 ${PASS_2_DAY_SHINJUKU}，比单独买票便宜 ${LOOP_SAVING}`],
  ["箱根周游券（2 日或 3 日）", "完整的箱根环线、在箱根住一晚，或两者都要", `新宿出发 ${PASS_2_DAY_SHINJUKU}／${PASS_3_DAY_SHINJUKU}，小田原出发 ${PASS_2_DAY_ODAWARA}／${PASS_3_DAY_ODAWARA}`],
  ["大涌谷 2 日券（Owakudani 2-Day Pass）", "只去大涌谷和坐空中缆车：登山电车、登山缆车和空中缆车全线，强罗公园免费入园——不含海贼观光船和巴士", "小田原出发成人 ¥5,000、儿童 ¥1,300"],
  ["观光船＆空中缆车周游券（1 日）", "自驾前往：只含空中缆车和芦之湖海贼观光船", "成人 ¥5,000、儿童 ¥1,400"],
  ["单程票", "只去箱根汤本泡温泉、吃午饭", "每段单独付费"],
];

const worthRows = [
  {
    plan: "箱根两天，在温泉旅馆住一晚",
    verdict: "✓ 买 2 日券",
    why: `这张周游券的定价针对的就是这类行程。新宿出发 ${PASS_2_DAY_SHINJUKU}，包含小田急线往返，两天内均可乘坐箱根环线各区间的交通工具。`,
  },
  {
    plan: "从东京当天往返，游览完整条箱根环线",
    verdict: "✓ 同样划算",
    why: `根据箱根Navi 的计算，从新宿出发游览完整条箱根环线，按 IC 卡普通票价计算为 ${LOOP_REGULAR}，因此 ${PASS_2_DAY_SHINJUKU} 的周游券即使只用第一天也能省 ${LOOP_SAVING}。小田急也表示当天往返同样划算。`,
  },
  {
    plan: "乘新干线到达小田原，或已经住在箱根",
    verdict: "✓ 买小田原出发的周游券",
    why: `无需为不使用的小田急线往返车程付费，所以是 ${PASS_2_DAY_ODAWARA}，而不是 ${PASS_2_DAY_SHINJUKU}。在箱根地区可乘坐的 8 种交通工具与新宿出发的周游券相同。`,
  },
  {
    plan: "只去箱根汤本泡温泉、吃午饭",
    verdict: "✗ 不用买",
    why: "不坐空中缆车和海贼观光船，交通费合计低于周游券票价。按实际乘坐的交通工具单独付费即可。",
  },
  {
    plan: "想游览箱根环线，但不想自己查时刻表",
    verdict: "✗ 改为参加一日游",
    why: "有导游随行的巴士一日游按固定时间出发，游览大涌谷和芦之湖，当天晚上回到东京。一日游与交通周游券是不同的商品。",
  },
];

const formatRows = [
  { item: "该选哪一种", digital: "同行每个人都有智能手机、想避开车站排队时选电子票", paper: "同行儿童使用儿童专用手机，或不想受手机电量限制时，建议选择纸质票" },
  { item: "购票渠道", digital: "通过 EMot 在线购票，仅限智能手机使用", paper: "小田急旅游服务中心或车站售票机" },
  { item: "支付方式", digital: "在线支付", paper: "售票机可用现金、PASMO／Suica，以及 American Express、Diners Club、JCB、Mastercard、Visa" },
  { item: "多人同行", digital: "使用 For Group 选项，每部手机最多可保存 4 张电子票；同行者必须一同乘车，通过检票闸机时，先扫描同行者的电子票，最后扫描自己的电子票", paper: "每人一张纸质票" },
  { item: "儿童", digital: "6–11 岁按儿童票价，未满 6 岁无需购票。电子票不支持日本的儿童专用手机", paper: "6–11 岁按儿童票价，未满 6 岁无需购票" },
  { item: "退款", digital: "仅在电子票页面显示退款按钮时才可退款；因天气原因导致部分区间停运时，可通过 EMot 客服办理退款", paper: "遇到停运时，可在最后乘坐的车站办理退款，仅退还未乘坐区间的交通费用" },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年箱根周游券多少钱？",
    a: `新宿出发 2 日券成人 ${PASS_2_DAY_SHINJUKU}、儿童（6–11 岁）¥1,600，3 日券为 ${PASS_3_DAY_SHINJUKU}／¥1,850。仅包含箱根地区交通的小田原出发周游券，2 日券 ${PASS_2_DAY_ODAWARA}／¥1,500，3 日券 ${PASS_3_DAY_ODAWARA}／¥1,750。以上票价自 2025 年 10 月 1 日起执行，并已于 ${CHECKED}通过 hakonenavi.jp 和 odakyu.jp 核实。`,
  },
  {
    q: "箱根周游券划算吗？",
    a: `游览完整条箱根环线就划算，只玩一天也一样。按箱根Navi 的单程票价，从新宿出发的箱根环线——小田急线单程 ¥1,261（往返各一次）、登山电车 ¥460、登山缆车 ¥430、空中缆车 ${ROPEWAY}、芦之湖海贼观光船 ${CRUISE}、返程巴士 ¥1,210——合计 ${LOOP_REGULAR}，2 日券是 ${PASS_2_DAY_SHINJUKU}，省 ${LOOP_SAVING}；箱根Navi 的两天行程则省 ¥3,522。周游券在第 7 段（返程电车）回本。只去箱根汤本的话并不划算。${CHECKED}核实。`,
  },
  {
    q: "箱根周游券在哪里买？",
    a: `可以在小田急的 EMot 在线购票（二维码电子票，仅限智能手机使用）、小田急线车站售票机和小田急旅游服务中心（纸质票）、7-ELEVEN 便利店的 7-Ticket、小田急旅行社门店，以及箱根当地的箱根登山电车售票机和箱根登山巴士服务处购买。小田急车站提前 1 个月开始售票；自动售票机仅发售当天起生效的周游券。Klook 也有销售，并支持在中文页面完成付款。${BUY_CHECKED}核实。`,
  },
  {
    q: "箱根周游券包含浪漫特快吗？",
    a: `不包含。新宿出发的周游券还包含一次小田急线往返，但特急浪漫特快需要另购特急券：新宿到箱根汤本单程成人 ${ROMANCECAR}、儿童 ¥600，从小田原出发则是 ¥200／¥100。直达约 80 分钟，通过 EMot 在线购买特急券便宜 ¥50。小田急官方提供的费用计算示例：周游券 ${PASS_2_DAY_SHINJUKU} + 浪漫特快往返 ¥2,400 = ¥9,500。${CHECKED}核实。`,
  },
  {
    q: "1 日还是 2 日：该买哪一种箱根周游券？",
    a: `箱根周游券没有 1 日券，只有 2 日券和 3 日券。游览完整条箱根环线的话，只玩一天也买 2 日券（新宿出发 ${PASS_2_DAY_SHINJUKU}），因为比单独买票便宜 ${LOOP_SAVING}。只去大涌谷、不去芦之湖时，大涌谷 2 日券（小田原出发 ¥5,000）包含登山电车、登山缆车和空中缆车；自驾前往的话，1 日有效的观光船＆空中缆车周游券是 ¥5,000。${CHECKED}根据小田急箱根票价公告和箱根Navi 核实。`,
  },
];

const tripPrepItems = [
  withKlookLocale(hakoneFreepassTripPrep[0], LOCALE, {
    label: "箱根大涌谷、芦之湖与箱根神社巴士一日游",
    ctaLabel: "查看箱根一日游 →",
    why: "周游券没有 1 日券。如果只从东京出发玩一天，参加有导游随行的巴士一日游，即可游览大涌谷和芦之湖。",
  }),
  withKlookLocale(hakoneFreepassTripPrep[1], LOCALE, {
    label: "箱根酒店一览",
    ctaLabel: "查看箱根酒店 →",
    why: "2 日券在第二天末班车结束前均可使用，在箱根住一晚，这样第二天也能充分利用周游券。",
  }),
  withKlookLocale(hakoneFreepassTripPrep[2], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "电子周游券以手机二维码的形式使用。查看空中缆车和海贼观光船运行情况最方便的方式，是在乘坐当天早上用手机查询。",
  }),
];

const tourPicks = [
  withKlookLocale(hakoneLoopBusTour, LOCALE, {
    title: "箱根大涌谷、芦之湖与箱根神社巴士一日游",
    desc: "从东京出发，参加由导游带领的箱根环线巴士一日游，含空中缆车和海贼观光船。",
  }),
  withKlookLocale(hakoneCruiseCableCarTour, LOCALE, {
    title: "箱根游船、缆车与大涌谷一日游",
    desc: "乘船游芦之湖、乘坐空中缆车越过火山谷，并安排温泉行程，一次预订即可安排从东京出发的全天行程。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "箱根周游券" }];

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
      最后核实：{iso}。来源：<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周游券）</a>、<a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp（箱根周游券）</a>
      {children}
    </p>
  );
}

export default function ZhCnHakoneFreePassPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG["zh-cn"] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "箱根周游券（Hakone Freepass）",
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
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            根据小田急官方票价，整理从新宿和小田原出发的箱根周游券价格、只用一天也划算的环游路线、可保存在手机中的电子周游券，以及需另购的浪漫特快特急券。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "小田急官方票价", "没有 1 日券"].map((t) => (
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
            <strong>箱根周游券（Hakone Freepass）</strong>2 日券成人票价为<strong>新宿出发 {PASS_2_DAY_SHINJUKU}、小田原出发 {PASS_2_DAY_ODAWARA}</strong>（3 日券 {PASS_3_DAY_SHINJUKU}／{PASS_3_DAY_ODAWARA}），箱根地区 8 种交通工具不限次数乘坐。从新宿出发游览一圈箱根环线（小田急线、登山电车、登山缆车、空中缆车、芦之湖海贼观光船和巴士），<strong>单程票合计 {LOOP_REGULAR}</strong>，所以<strong>当天往返也比单独买票便宜 {LOOP_SAVING}</strong>。浪漫特快特急券（新宿出发单程 {ROMANCECAR}）另计；以上票价已于 {CHECKED}通过小田急和箱根Navi 官方网页核实。
          </p>
          <p className={styles.bodyText}>
            本页介绍的是周游券本身：箱根周游券的价格、可乘坐的范围和购票渠道。一天之内每一站怎么安排，请看
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              东京出发箱根一日游（英文）
            </Link>
            ；在箱根住一晚、充分利用两日周游券的安排，请看
            <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>
              箱根两天行程（英文）
            </Link>
            。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>新宿出发 2 日券</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_SHINJUKU}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>小田原出发 2 日券</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_ODAWARA}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>可乘坐</p>
                <p className={styles.verdictStatValue}>8 种交通工具</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>浪漫特快</p>
                <p className={styles.verdictStatValue}>不包含，需另付 {ROMANCECAR}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              小田急官方使用的英文名称为 <strong>Freepass</strong>，Hakone Free Pass 也是常见的搜索用语，两者是同一张票。周游券没有 1 日券；在线购买（EMot 或 Klook）可以避开车站排队；如果你乘新干线到达小田原，请选择小田原出发的周游券。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                在 Klook 查看箱根周游券 →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                查看箱根一日游 →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="hakone" />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>价格</span>
          <h2 className={styles.sectionTitle}>2026 年箱根周游券多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            新宿出发 2 日券成人 {PASS_2_DAY_SHINJUKU}，是大多数从东京出发的游客适用的票券。票价因出发车站而异，3 日券只比 2 日券贵 ¥400。
          </p>
          <Table
            head={["出发车站", "2 日券 成人", "2 日券 儿童", "3 日券 成人", "3 日券 儿童"]}
            rows={priceRows.map((r) => [r.pass, r.d2a, r.d2c, r.d3a, r.d3c])}
          />
          <LastChecked>
            。儿童票适用 6–11 岁，未满 6 岁免费。以上价格自 2025 年 10 月 1 日起适用。前往箱根汤本的浪漫特快特急券需另购：从新宿出发 {ROMANCECAR}／¥600，从小田原出发 ¥200／¥100。
          </LastChecked>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            新宿出发还是小田原出发？两者的 ¥1,100 价差仅对应新宿 ⇄ 小田原的小田急线往返车费，两种周游券在箱根地区均可乘坐相同的 8 种交通工具。本站介绍的其他周游券及门票价格，可参阅
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景点门票价格总表（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看箱根周游券 →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              只有一天时间？比较由导游带领的箱根一日游 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="行程配套预订"
          heading="买了箱根周游券，还要预订什么？"
          headingLevel={3}
          intro="周游券仅包含交通，不包含一日游服务及住宿。如果只有一天、又不想查时刻表，预订由导游带领的箱根一日游，即可安排相同的环游路线；如果有两天，在箱根预订住宿，这样第二天也能充分利用周游券。使用电子票所需的手机上网套餐，也可通过同一个 Klook 账号购买。"
          items={tripPrepItems}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>购票渠道</span>
          <h2 className={styles.sectionTitle}>箱根周游券在哪里买？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可以通过小田急的 EMot 在线购票或 Klook 在线购买，也可以在小田急线各站、7-ELEVEN 或箱根当地买纸质票。购票渠道不同，票券形式及最早购票时间也不同。
          </p>
          <Table
            head={["购票渠道", "票券形式", "何时可以买", "注意事项"]}
            rows={buyRows.map((r) => [r.where, r.ticket, r.when, r.note])}
          />
          <LastChecked iso={BUY_CHECKED_ISO}>。Klook 的购票信息未引用小田急官方资料，最新条件以商品页为准。</LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>包含与不包含</span>
          <h2 className={styles.sectionTitle}>箱根周游券可以乘坐哪些交通工具？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            持券可在箱根地区不限次数乘坐 8 种交通工具，新宿出发的周游券还包含一次小田急线往返。周游券不包含浪漫特快特急券及伊豆箱根巴士车费。
          </p>
          <Table head={["交通工具", "是否包含在周游券内", "说明"]} rows={coverageRows.map((r) => [r.mode, r.included, r.note])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            。出示周游券还可在箱根约 70 处旅游设施享受优惠，但适用设施名单会变动，因此本页不列出具体优惠金额。
          </LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>划算吗？</span>
          <h2 className={styles.sectionTitle}>箱根周游券划算吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            游览完整条箱根环线就划算，只玩一天也一样：从新宿出发再回到新宿的 7 段单程票合计 {LOOP_REGULAR}，周游券是 {PASS_2_DAY_SHINJUKU}，省 {LOOP_SAVING}。累计金额在第 7 段、也就是返回新宿的电车时超过周游券票价。
          </p>
          <Table head={["区段（按环线顺序）", "区间", "成人单程票价", "累计"]} rows={fareRows} />
          <p className={styles.bodyText} style={noteStyle}>
            最后核实：{CHECKED_ISO}。来源：<a href={BREAKDOWN_URL} target="_blank" rel="noopener noreferrer">箱根Navi 各区间票价（日文）</a>、<a href={LOOP_URL} target="_blank" rel="noopener noreferrer">箱根Navi（箱根环线合计）</a>、<a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">小田急箱根票价公告（PDF）</a>、<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周游券）</a>。成人 IC 卡票价，不含浪漫特快。登山电车坐到强罗再加 ¥160。费用计算中没有各区间的儿童票价；空中缆车儿童单程 ¥700、海贼观光船 ¥850。持周游券可免费进入箱根强罗公园（¥650），海贼观光船特别船舱单程另付 ¥800。
          </p>
          <Table head={["你的行程", "建议", "原因"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            空中缆车和海贼观光船遇到恶劣天气都会停运，空中缆车在大涌谷也可能临时停止运行。如果因部分区间停运而未能乘坐，持纸质周游券可在最后乘坐的车站办理退款。各站有哪些景点、什么时候从东京出发，请看
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              东京出发箱根一日游（英文）
            </Link>
            ；本页只介绍周游券本身。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看箱根周游券 →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              比较箱根一日游 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>路线图</span>
          <h2 className={styles.sectionTitle}>箱根周游券路线图：按什么顺序乘坐？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            箱根环线共 7 段：乘小田急线到箱根汤本、登山电车上到强罗、登山缆车到早云山、空中缆车经大涌谷到桃源台、海贼观光船横渡芦之湖、巴士返回箱根汤本，再乘小田急线回去。每一段都能使用周游券，反方向游览也可以。
          </p>
          <Table head={["交通工具", "区间", "所需时间", "周游券可用？"]} rows={routeRows} />
          <p className={styles.bodyText} style={noteStyle}>
            最后核实：{CHECKED_ISO}。来源：<a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp（浪漫特快所需时间）</a>、<a href={ITINERARY_URL} target="_blank" rel="noopener noreferrer">Odakyu HAKONE TRIP（登山电车所需时间）</a>、<a href={LP_URL} target="_blank" rel="noopener noreferrer">箱根Navi 周游券页面（登山缆车，日文）</a>、<a href={ROPEWAY_URL} target="_blank" rel="noopener noreferrer">箱根空中缆车常见问题</a>、<a href={CRUISE_URL} target="_blank" rel="noopener noreferrer">箱根海贼观光船常见问题（船和巴士所需时间）</a>。乘坐时间合计为以上时间相加的结果。空中缆车和海贼观光船遇到强风或恶劣天气会停运，空中缆车每年也会停运进行定期检修，冬季停运日期请看<Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>箱根两天行程（英文）</Link>。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>选哪一种</span>
          <h2 className={styles.sectionTitle}>1 日还是 2 日：该买哪一种箱根周游券？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            游览完整条箱根环线的话，只玩一天也买 2 日券——箱根周游券没有 1 日券，而 2 日券仍比单独买票便宜 {LOOP_SAVING}。不去芦之湖或不坐空中缆车时，范围更小的周游券才划算。
          </p>
          <Table head={["周游券", "适合", "成人票价"]} rows={passChoiceRows} />
          <p className={styles.bodyText} style={noteStyle}>
            最后核实：{CHECKED_ISO}。来源：<a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">小田急箱根票价公告（PDF）</a>、<a href={LOOP_URL} target="_blank" rel="noopener noreferrer">箱根Navi 优惠票券</a>、<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周游券）</a>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通方式</span>
          <h2 className={styles.sectionTitle}>箱根周游券包含浪漫特快吗？</h2>
          <p className={styles.bodyText}>
            不包含。新宿出发的周游券还包含一次小田急线往返，但特急浪漫特快需要另购特急券：新宿到箱根汤本<strong>单程成人 {ROMANCECAR}、儿童 ¥600</strong>。<strong>直达约 80 分钟</strong>，全车指定席，通过 EMot 在线购买特急券，比在车站购买便宜 ¥50。小田急提供的从新宿出发的往返费用计算示例是周游券 {PASS_2_DAY_SHINJUKU} 加浪漫特快往返 ¥2,400，合计 ¥9,500。使用周游券乘坐小田急普通列车，所需时间更长，通常要在小田原换乘。
          </p>
          <p className={styles.bodyText}>
            箱根也常与富士五湖安排在同一趟旅行中，但富士五湖属于不同区域，适用的周游券也不同，请看
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>
              富士山一日游自助交通（英文）
            </Link>
            。如果计划在较长的旅行中安排一晚住在箱根，可以在
            <Link href="/guides/attractions/tokyo-7-day-itinerary" style={linkStyle}>
              东京 7 天行程（英文）
            </Link>
            、
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>
              东京 5 天行程（英文）
            </Link>
            和
            <Link href="/guides/attractions/japan-14-day-itinerary" style={linkStyle}>
              日本 14 天行程（英文）
            </Link>
            参考箱根安排在哪一天；
            <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>
              箱根设有私人温泉的旅馆（英文）
            </Link>
            则按地区整理从箱根汤本到芦之湖的 10 家旅馆，以及前往各家旅馆的巴士及电车交通方式。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>JR Pass 持有者</span>
          <h2 className={styles.sectionTitle}>箱根周游券可以和 JR Pass 一起用吗？</h2>
          <p className={styles.bodyText}>
            可以，但两者的用途不同。小田急表示，JR Pass 和 JR 东京广域周游券不能在箱根地区内使用，只能用于乘坐 JR 列车前往小田原。从小田原开始，<strong>小田原出发的箱根周游券（2 日券 {PASS_2_DAY_ODAWARA}，3 日券 {PASS_3_DAY_ODAWARA}）</strong>即可游览完整条箱根环线，无需为不使用的小田急线车程付费。回程如果乘浪漫特快到新宿，需要另付特急券和小田原至新宿的基础车费。JR Pass 在东京行程中是否划算，请看
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass 攻略（英文）
            </Link>
            和
            <Link href="/guides/transport/tokyo-wide-pass" style={linkStyle}>
              JR 东京广域周游券攻略（英文）
            </Link>
            。
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            最后核实：{CHECKED_ISO}。来源：<a href={JR_URL} target="_blank" rel="noopener noreferrer">小田急箱根周游券常见问题</a>、<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周游券）</a>。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票券形式</span>
          <h2 className={styles.sectionTitle}>电子票还是纸质票：该买哪一种箱根周游券？</h2>
          <Table head={["", "电子票（EMot）", "纸质票"]} rows={formatRows.map((r) => [r.item, r.digital, r.paper])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            。同行者一同乘车并可将电子票存入同一部手机时，选择电子票；同行儿童使用儿童专用手机，或不想受手机电量限制时，建议选择纸质票。有效期按自然日计算：2 日券在购买次日的末班车后失效，而不是 48 小时后。
          </LastChecked>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="箱根周游券常见问题" />

        <KlookTourPicks
          heading="如果只有一天"
          intro="想自由游览箱根环线，周游券是合适的选择。如果只想从东京出发玩一天、不想查时刻表，以下是游览相同环线的导游随行一日游：巴士按固定时间出发，当天晚上返回东京市区。请在商品页面查看所选出发日期的最新价格。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/hakone-ryokan-private-onsen", title: "箱根设有私人温泉的旅馆：按地区精选 10 家（2026）（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 价格 2026：新票价与是否划算（英文）" },
            { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "东京出发箱根一日游（2026）：周游券价格与一日游比较（英文）" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "东京出发富士山一日游（2026）：自助前往方式（英文）" },
            { href: "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日游（东京出发·2026）：行程怎么选、五合目看什么" },
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "东京出发河口湖一日游（2026）：路线、票价与一天能安排什么（英文）" },
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "东京 5 天行程（2026）：每日安排（英文）" },
            { href: "/guides/attractions/japan-14-day-itinerary", title: "日本 14 天行程（2026）：两周每日安排（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新干线攻略 2026：车票、周游券与首次乘坐须知（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景点门票价格 2026：官方票价与预约规则（英文）" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>一张周游券畅游箱根环线</h2>
            <p className={styles.ctaBannerDesc}>
              2 天或 3 天内可乘坐 8 种交通工具，Klook 支持使用日本境外发行的银行卡付款。如果只有一天、又不想查时刻表，游览相同环线的导游随行巴士一日游更适合你。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看箱根周游券 →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看箱根一日游 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
