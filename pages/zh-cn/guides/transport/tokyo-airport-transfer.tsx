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
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import {
  hanedaLimousineBus,
  keiseiSkylinerUrl,
  naritaBusSubwayCombo,
  naritaExpressRoundTripUrl,
  naritaLimousineBus,
  tokyoAirportStayAreas,
  tokyoAirportTripPrep,
  tokyoPrivateAirportTransfer,
  tokyoSharedAirportTransfer,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

/**
 * 东京机场交通（简体中文版）— mirrors pages/guides/transport/tokyo-airport-transfer.tsx
 * section by section as of 2026-11-01: same sections, tables, Klook CTAs and
 * components in the same order. Every fare, time and date is the English page's;
 * no figure was added in translation.
 */

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/transport/tokyo-airport-transfer";
const TITLE = "成田机场到东京交通（2026）：Skyliner、N'EX 与巴士";
const DESC =
  "成田机场到东京怎么走，羽田机场也一起比较：电车、巴士与出租车的价格、时间与方便度，附 2026 年票价。与英文版同一组数字。";

/** The day the operators' fares, times and frequencies were read. */
const CHECKED = dateLabel("2026-10-25", LOCALE);
/** The day the taxi flat fares and the Skyliner first/last departures were read. */
const CHECKED_TAXI = dateLabel("2026-10-28", LOCALE);

// Klook — the same products as the English page, on the zh-CN locale path.
const skylinerUrl = klookFor(keiseiSkylinerUrl, LOCALE);
const nexRoundTripUrl = klookFor(naritaExpressRoundTripUrl, LOCALE);
const naritaBusUrl = klookFor(naritaLimousineBus.url, LOCALE);
const hanedaBusUrl = klookFor(hanedaLimousineBus.url, LOCALE);
const privateTransferUrl = klookFor(tokyoPrivateAirportTransfer.url, LOCALE);
const sharedTransferUrl = klookFor(tokyoSharedAirportTransfer.url, LOCALE);
const busSubwayComboUrl = klookFor(naritaBusSubwayCombo.url, LOCALE);

const stayAreas = [
  withKlookLocale(tokyoAirportStayAreas[0], LOCALE, {
    area: "东京站／丸之内",
    why: "N'EX 从成田约 60 分钟直达这里，不用换乘。",
  }),
  withKlookLocale(tokyoAirportStayAreas[1], LOCALE, {
    area: "新宿",
    why: "N'EX 直达停靠站（从成田约 90 分钟），也是利木津巴士的停靠站；从羽田坐京急线换乘一次大约 37 分钟。",
  }),
  withKlookLocale(tokyoAirportStayAreas[2], LOCALE, {
    area: "上野／浅草",
    why: "京成 Skyliner 41 分钟到日暮里、约 44 分钟到京成上野，是从成田抵达最快的一侧。",
  }),
];

const tripPrep = [
  withKlookLocale(tokyoAirportTripPrep[0], LOCALE, {
    label: "Klook 日本 eSIM",
    why: "站台、巴士乘车处和酒店入住，如果过海关时网络就已经能用，都会顺畅很多，不必先去排 SIM 卡柜台。",
    ctaLabel: "在 Klook 查看 eSIM 套餐 →",
  }),
  withKlookLocale(tokyoAirportTripPrep[1], LOCALE, {
    label: "东京地铁通票（24／48／72 小时）",
    why: "上面任何一张机场票都不包括进城之后的出行；地铁通票包括，东京地铁与都营全线、24、48 或 72 小时。",
    ctaLabel: "查看地铁通票 →",
  }),
];

// ---------------------------------------------------------------------------
// The two master tables: every option, with the figure and the operator.
// ---------------------------------------------------------------------------

const naritaMasterRows = [
  {
    option: "京成 Skyliner",
    time: "到京成上野 41 分钟",
    fare: "¥2,580（IC ¥2,567）",
    often: "每小时 3 班",
    lands: "日暮里、京成上野",
    source: "京成",
  },
  {
    option: "成田特快 N'EX",
    time: "到东京站最快 53 分钟",
    fare: "东京 ¥3,140；品川／涩谷／新宿 ¥3,330；横滨 ¥4,480",
    often: "每 30 分钟",
    lands: "东京、品川、涩谷、新宿、横滨",
    source: "JR 东日本",
  },
  {
    option: "京成 Access 特急",
    time: "到浅草 50 分钟",
    fare: "到日暮里／京成上野 ¥1,280（IC ¥1,267）",
    often: "未公布具体数字",
    lands: "日暮里、上野、押上、浅草、日本桥、品川",
    source: "京成",
  },
  {
    option: "京成本线特急",
    time: "未公布具体数字",
    fare: "到京成上野 ¥1,060（IC ¥1,052）",
    often: "未公布具体数字",
    lands: "船桥、日暮里、京成上野",
    source: "京成",
  },
  {
    option: "机场利木津巴士",
    time: "公布的东京站时刻表为 1 小时 50 分",
    fare: "东京站／T-CAT ¥3,100；新宿或涩谷 ¥3,600；迪士尼度假区 ¥2,900",
    often: "按线路而定——见巴士攻略",
    lands: "酒店与车站停靠点，不用换乘",
    source: "利木津巴士",
  },
  {
    option: "定额出租车",
    time: "视路况而定，未公布数字",
    fare: "按区域 ¥23,500～¥38,500，高速费另计",
    often: "随叫随走",
    lands: "你的酒店地址",
    source: "成田机场",
  },
];

const hanedaMasterRows = [
  {
    option: "京急机场线",
    time: "3 号航站楼到品川 11 分钟（1·2 号航站楼 14 分钟）",
    fare: "到品川 ¥330（IC ¥327）",
    often: "随到随坐",
    lands: "品川，并直通新桥、银座、浅草",
    source: "京急",
  },
  {
    option: "东京单轨电车",
    time: "到滨松町 13 分钟",
    fare: "成人 ¥520、儿童 ¥260",
    often: "约每 5 分钟",
    lands: "滨松町，可换乘山手线",
    source: "东京单轨电车",
  },
  {
    option: "机场利木津巴士",
    time: "视路况而定，按线路",
    fare: "东京站 ¥1,200；涩谷 ¥1,300；新宿／中野 ¥1,400",
    often: "按线路而定——见巴士攻略",
    lands: "酒店与车站停靠点，不用换乘",
    source: "利木津巴士",
  },
  {
    option: "深夜／清晨接驳巴士",
    time: "视路况而定，按线路",
    fare: "新宿／池袋 ¥2,800；东京／银座／浅草／秋叶原 ¥1,900",
    often: "机场发车 00:00～02:00",
    lands: "只停少数指定的市区站点",
    source: "利木津巴士",
  },
  {
    option: "定额出租车",
    time: "视路况而定，未公布数字",
    fare: "机场确认有定额制度，但未公布金额",
    often: "随叫随走",
    lands: "你的酒店地址",
    source: "羽田机场",
  },
];

/** Keikyu's own estimated travel times from Haneda. */
const keikyuTimeRows = [
  { dest: "品川", t3: "11 分钟", t12: "14 分钟" },
  { dest: "东京", t3: "20 分钟", t12: "23 分钟" },
  { dest: "新桥", t3: "21 分钟", t12: "24 分钟" },
  { dest: "东银座", t3: "23 分钟", t12: "26 分钟" },
  { dest: "涩谷", t3: "23 分钟", t12: "26 分钟" },
  { dest: "横滨", t3: "23 分钟", t12: "28 分钟" },
  { dest: "新宿", t3: "30 分钟", t12: "33 分钟" },
  { dest: "浅草", t3: "34 分钟", t12: "37 分钟" },
  { dest: "池袋", t3: "38 分钟", t12: "41 分钟" },
];

/** What is actually worth buying before you fly, and what it costs if you do. */
const prebuyRows = [
  {
    item: "Skyliner 优惠票",
    price: "单程 ¥2,310、往返 ¥4,500（原价 ¥2,580／¥5,160）",
    collect: "电子票，或在 1 号航站楼与 2·3 号航站楼的 Skyliner 柜台兑换",
    worth: "值得——同一班车，每趟便宜 ¥270",
  },
  {
    item: "京成 Skyliner ＋东京地铁通票",
    price: "单程搭配 24／48／72 小时地铁通票 ¥2,840／¥3,240／¥3,540；往返 ¥4,780／¥5,180／¥5,480",
    collect: "成田机场柜台，或 Skyliner 电子票网站",
    worth: "值得，如果你在东京的日子主要靠地铁出行",
  },
  {
    item: "N'EX 东京往返车票",
    price: "成人 ¥5,200、儿童 ¥2,600，有效期 14 天",
    collect: "只能在成田机场 1 号航站楼或 2·3 号航站楼站出示护照领取",
    worth: "值得，如果返程也从成田飞——到新宿两张单程要 ¥6,660",
  },
  {
    item: "单轨电车＆山手线优惠票",
    price: "成人 ¥590、儿童 ¥290（原价 ¥680～¥870）",
    collect: "羽田三个单轨电车站的售票机",
    worth: "只限发售日——周六、周日、节假日与指定期间",
  },
  {
    item: "利木津巴士＋东京地铁通票",
    price: "成田 ¥4,200（1 次＋24 小时）到 ¥8,000（2 次＋72 小时）；羽田 ¥2,300 到 ¥4,600",
    collect: "二维码或兑换券，在巴士柜台兑换",
    worth: "值得，如果有托运行李、行程又以地铁为主",
  },
  {
    item: "京急羽得票（Hanetoku）＆东京地铁通票",
    price: "搭配 24／48／72 小时通票 ¥1,600／¥2,100／¥2,600",
    collect: "羽田机场不发售——要通过 ANA、JAL MaaS 或晴空塔套票购买",
    worth: "只有出发前就能买到时才划算；覆盖 1·2 号航站楼到泉岳寺",
  },
];

/** The late-arrival and pre-dawn-departure figures, which is where plans break. */
const nightRows = [
  {
    item: "京急末班车，羽田 3 号航站楼 → 品川",
    detail: "00:08 发车、00:20 到达，工作日与周末相同",
    source: "京急",
    checked: CHECKED,
  },
  {
    item: "京急首班车，羽田 3 号航站楼 → 品川",
    detail: "05:26 发车、05:46 到达",
    source: "京急",
    checked: CHECKED,
  },
  {
    item: "从品川回羽田的末班车",
    detail: "工作日 23:59（00:23 到达）；周末 23:45，需在京急蒲田换乘",
    source: "京急",
    checked: CHECKED,
  },
  {
    item: "羽田深夜接驳巴士",
    detail: "00:00 到 02:00 之间从机场发车；新宿或池袋 ¥2,800，东京、银座、浅草或秋叶原 ¥1,900",
    source: "利木津巴士",
    checked: CHECKED,
  },
  {
    item: "羽田清晨接驳巴士",
    detail: "约 04:00 起从市区开往 3 号航站楼——池袋 03:35 发车、东新宿 03:50、新宿高速巴士总站（Busta 新宿）04:00",
    source: "利木津巴士",
    checked: CHECKED,
  },
  {
    item: "成田 Skyliner 末班车，工作日",
    detail: "Skyliner 188 次 23:00 从成田机场站、23:03 从 2·3 号航站楼站发车，23:43 到日暮里、23:48 到京成上野",
    source: "京成",
    checked: CHECKED_TAXI,
  },
  {
    item: "成田 Skyliner 末班车，周末与节假日",
    detail: "Skyliner 186 次 22:40 从成田机场站、22:43 从 2·3 号航站楼站发车，23:23 到日暮里、23:28 到京成上野",
    source: "京成",
    checked: CHECKED_TAXI,
  },
  {
    item: "成田 Skyliner 首班车",
    detail: "Skyliner 2 次 07:23 从成田机场站、07:27 从 2·3 号航站楼站发车，08:23 到日暮里、08:29 到京成上野",
    source: "京成",
    checked: CHECKED_TAXI,
  },
];

/** Every option from both airports in one table. */
const allOptionRows = [
  { airport: "成田", option: "京成 Access 特急", time: "到浅草 50 分钟", fare: "到日暮里／京成上野 ¥1,280", source: "京成", taxi: false },
  { airport: "成田", option: "京成本线特急", time: "未公布具体数字", fare: "到京成上野 ¥1,060", source: "京成", taxi: false },
  { airport: "成田", option: "京成 Skyliner", time: "到京成上野 41 分钟", fare: "¥2,580（IC ¥2,567）", source: "京成", taxi: false },
  { airport: "成田", option: "机场利木津巴士", time: "到东京站 1 小时 50 分", fare: "东京站 ¥3,100；新宿或涩谷 ¥3,600", source: "利木津巴士", taxi: false },
  { airport: "成田", option: "成田特快 N'EX", time: "到东京站最快 53 分钟", fare: "东京 ¥3,140；品川／涩谷／新宿 ¥3,330", source: "JR 东日本", taxi: false },
  { airport: "成田", option: "定额出租车", time: "视路况而定，未公布数字", fare: "按区域 ¥23,500～¥38,500，高速费另计", source: "成田机场", taxi: true },
  { airport: "羽田", option: "京急机场线", time: "到品川 11 分钟（3 号航站楼）", fare: "到品川 ¥330（IC ¥327）", source: "京急", taxi: false },
  { airport: "羽田", option: "东京单轨电车", time: "到滨松町 13 分钟", fare: "成人 ¥520、儿童 ¥260", source: "东京单轨电车", taxi: false },
  { airport: "羽田", option: "机场利木津巴士", time: "视路况而定，按线路", fare: "东京站 ¥1,200；新宿 ¥1,400", source: "利木津巴士", taxi: false },
  { airport: "羽田", option: "深夜接驳巴士", time: "机场发车 00:00～02:00", fare: "东京／银座／浅草 ¥1,900；新宿／池袋 ¥2,800", source: "利木津巴士", taxi: false },
  { airport: "羽田", option: "定额出租车", time: "视路况而定，未公布数字", fare: "确认有定额制度，未公布金额", source: "羽田机场", taxi: true },
];

/** Hotel area against airport — fastest, cheapest, and whether anything arrives without a transfer. */
const areaRows = [
  {
    area: "新宿",
    naritaFast: "N'EX 直达，¥3,330",
    naritaCheap: "Access 特急到日暮里 ¥1,280，再换乘山手线",
    hanedaFast: "京急，3 号航站楼 30 分钟（1·2 号航站楼 33 分钟），换乘一次",
    direct: "成田坐 N'EX；两座机场都有利木津巴士（¥3,600／¥1,400）",
  },
  {
    area: "涩谷",
    naritaFast: "N'EX 直达，¥3,330",
    naritaCheap: "Access 特急到日暮里 ¥1,280，再换乘山手线",
    hanedaFast: "京急，3 号航站楼 23 分钟（1·2 号航站楼 26 分钟）",
    direct: "成田坐 N'EX；两座机场都有利木津巴士（¥3,600／¥1,300）",
  },
  {
    area: "东京站／丸之内",
    naritaFast: "N'EX，最快 53 分钟，¥3,140",
    naritaCheap: "Access 特急到日暮里 ¥1,280，再换乘山手线",
    hanedaFast: "京急，3 号航站楼 20 分钟；或单轨电车 ¥520、13 分钟到滨松町",
    direct: "成田坐 N'EX；两座机场都有利木津巴士（¥3,100／¥1,200）",
  },
  {
    area: "上野／浅草",
    naritaFast: "Skyliner，41 分钟到京成上野，¥2,580",
    naritaCheap: "京成本线特急到京成上野 ¥1,060",
    hanedaFast: "京急，3 号航站楼到浅草 34 分钟，不用换乘",
    direct: "两边都可以——成田坐 Skyliner 或 Access 特急，羽田坐京急直通浅草",
  },
  {
    area: "银座",
    naritaFast: "N'EX 到东京站 ¥3,140，再坐一站地铁",
    naritaCheap: "Access 特急直通东银座，不用换乘",
    hanedaFast: "京急，3 号航站楼到东银座 23 分钟",
    direct: "成田坐 Access 特急；羽田坐京急",
  },
];

/** Narita Airport's own six-zone flat taxi fare. Tolls are charged on top of every figure. */
const naritaTaxiRows = [
  { zone: "A", wards: "江户川区、葛饰区、足立区", keiyo: "¥23,500", bay: "¥26,500" },
  { zone: "B", wards: "江东区、墨田区、港区（台场）、品川区（东八潮）", keiyo: "¥28,000", bay: "¥28,000" },
  { zone: "C", wards: "中央区、千代田区、台东区、文京区、荒川区", keiyo: "¥29,000", bay: "¥31,000" },
  { zone: "D", wards: "新宿区、丰岛区、中野区、涩谷区、目黑区、港区、品川区、大田区", keiyo: "¥31,500", bay: "¥32,500" },
  { zone: "E", wards: "板桥区、北区、练马区", keiyo: "¥34,000", bay: "¥36,000" },
  { zone: "F", wards: "世田谷区、杉并区、三鹰市、武藏野市", keiyo: "¥35,500", bay: "¥38,500" },
];

/** The per-person arithmetic — published one-way fares multiplied out, nothing new. */
const familyRows = [
  {
    option: "京成 Access 特急＋山手线",
    route: "成田 → 日暮里 → 新宿",
    four: "¥5,120，另加山手线那一段",
    each: "¥1,280",
    kids: "该线路未公布儿童票价",
  },
  {
    option: "京成 Skyliner＋山手线",
    route: "成田 → 日暮里 → 新宿",
    four: "¥10,320，另加山手线那一段",
    each: "¥2,580",
    kids: "儿童 ¥1,290，所以两大两小是 ¥7,740",
  },
  {
    option: "成田特快 N'EX",
    route: "成田 → 新宿，直达",
    four: "¥13,320",
    each: "¥3,330",
    kids: "往返车票儿童 ¥2,600、成人 ¥5,200",
  },
  {
    option: "机场利木津巴士",
    route: "成田 → 新宿，直达，行李放车底",
    four: "¥14,400",
    each: "¥3,600",
    kids: "成田线路未公布儿童票价",
  },
  {
    option: "定额出租车，D 区",
    route: "成田 → 新宿，门到门",
    four: "¥31,500～¥32,500＋高速费",
    each: "¥7,875～¥8,125＋高速费",
    kids: "同一个价——按车计价，不按座位",
  },
  {
    option: "京急机场线",
    route: "羽田 → 品川，再换乘一次",
    four: "机场这一段 ¥1,320",
    each: "¥330",
    kids: "所查页面未公布儿童票价",
  },
  {
    option: "机场利木津巴士",
    route: "羽田 → 新宿，直达",
    four: "¥5,600",
    each: "¥1,400",
    kids: "儿童 ¥700，所以两大两小是 ¥4,200",
  },
  {
    option: "东京单轨电车",
    route: "羽田 → 滨松町，再换乘山手线",
    four: "机场这一段 ¥2,080",
    each: "¥520",
    kids: "儿童 ¥260，所以两大两小是 ¥1,560",
  },
];

const nexGuidePoints = [
  {
    title: "JR Pass 可以坐",
    desc: "N'EX 是 JR 的列车，所以持 JR Pass 免费乘坐，指定席也包括在内。如果你持有 7 日或 14 日周游券，这就是从成田出发第一天最明显的选择。请在机场的 JR 售票处（绿色窗口）订座。",
  },
  {
    title: "直达主要车站",
    desc: "N'EX 不用换乘就能直达东京、品川、涩谷、新宿、池袋与横滨。住在东京西侧、又拖着行李的人，方便程度很难被超越。",
  },
  {
    title: "持外国护照者的往返车票",
    desc: `JR 东日本发售 N'EX 东京往返车票，成人 ¥5,200、儿童 ¥2,600，有效期 14 天，可乘坐去程与返程各一次普通车厢指定席。到新宿两张单程要 ¥6,660，所以能省 ¥1,460。只能在成田机场 1 号航站楼或 2·3 号航站楼站，出示非日本护照领取。查询于 ${CHECKED}。`,
  },
  {
    title: "每 30 分钟一班，票价随季节浮动",
    desc: `JR 东日本表示，开往东京、新宿与横滨的列车一天中大部分时段每 30 分钟一班；票价中的指定席部分淡季便宜 ¥200、旺季贵 ¥200。所以 ¥3,140 与 ¥3,330 是平季的数字。查询于 ${CHECKED}。`,
  },
];

const skylinerPoints = [
  {
    title: "京成进城最快的列车",
    desc: `京成公布 Skyliner 从成田机场 2·3 号航站楼到上野 41 分钟，并称到东京市中心「最快只要 36 分钟」。从日暮里再换一小段 JR 或地铁，就能到东京大部分区域。查询于 ${CHECKED}。`,
  },
  {
    title: "¥2,580，分成两部分",
    desc: `票价是 ¥1,280 的乘车券加 ¥1,300 的 Liner 券——合计 ¥2,580；乘车券部分用 IC 卡支付的话是 ¥2,567。儿童 ¥1,290。京成的英文票价表仍写着旧的 ¥2,470；它的日文车票页和官方 FAQ 都写 ¥2,580，本页采用后者。查询于 ${CHECKED}。`,
  },
  {
    title: "JR Pass 不能坐",
    desc: "Skyliner 属于京成电铁这家民营铁路，不是 JR。持 JR Pass 不能坐。京成另有 Skyliner ＋东京地铁 24／48／72 小时的组合票，如果你打算靠地铁逛东京，这个更划算。",
  },
  {
    title: "每小时 3 班，提前买还更便宜",
    desc: `京成表示 Skyliner 每小时 3 班。它自家的优惠票单程 ¥2,310、往返 ¥4,500，柜台原价则是 ¥2,580 与 ¥5,160；可以买电子票，或在机场 Skyliner 柜台兑换。查询于 ${CHECKED}。`,
  },
  {
    title: "最适合前往东京东侧或北侧的旅客",
    desc: "如果你的酒店在浅草、上野、秋叶原，或任何东京地铁／都营线到得了的地方，Skyliner 加地铁的组合常常比 N'EX 更快也更便宜。",
  },
];

const skylinerVsNexRows = [
  { feature: "运营公司", skyliner: "京成（民营铁路）", nex: "JR 东日本" },
  { feature: "单程票价", skyliner: "¥2,580（IC ¥2,567）", nex: "到东京 ¥3,140、到新宿 ¥3,330" },
  { feature: "公布时间", skyliner: "到京成上野 41 分钟", nex: "到东京站最快 53 分钟" },
  { feature: "JR Pass 可用", skyliner: "不可", nex: "可——免费，含指定席" },
  { feature: "IC 卡付车费", skyliner: "仅限乘车券部分，Liner 券不行", nex: "可" },
  { feature: "直达停靠", skyliner: "日暮里、京成上野", nex: "东京、品川、涩谷、新宿、池袋、横滨" },
  { feature: "班次", skyliner: "每小时 3 班", nex: "每 30 分钟" },
  { feature: "最便宜的买法", skyliner: "优惠票单程 ¥2,310、往返 ¥4,500", nex: "往返车票 ¥5,200，有效期 14 天" },
];

const destinationRows = [
  { dest: "日暮里", pick: "Skyliner", note: "到东京市中心最快的铁路，并可同站台换乘山手线。" },
  { dest: "京成上野", pick: "Skyliner", note: "Skyliner 终点站，按京成自家数字从 2·3 号航站楼 41 分钟。" },
  { dest: "浅草／秋叶原", pick: "Skyliner 或 Access 特急", note: "坐 Skyliner 到上野／日暮里再换一小段，或坐 Access 特急 50 分钟直通浅草。" },
  { dest: "东京站", pick: "N'EX", note: "最快 53 分钟直达，不用换乘，¥3,140。" },
  { dest: "涩谷", pick: "N'EX", note: "同一班车直达，¥3,330。" },
  { dest: "新宿", pick: "N'EX", note: "直达——不用拖着行李换乘——¥3,330。" },
  { dest: "横滨", pick: "N'EX", note: "直达 ¥4,480，去东京以南的明显选择。" },
];

const busFareRows = [
  { airport: "成田（NRT）", time: "公布的东京站时刻表为 1 小时 50 分", price: "¥2,900～3,600", note: "按线路：迪士尼 ¥2,900、东京站 ¥3,100、新宿 ¥3,600" },
  { airport: "羽田（HND）", time: "视路况而定，短得多", price: "¥1,000～1,400", note: "东京站 ¥1,200、涩谷 ¥1,300、新宿 ¥1,400" },
];

const busPoints = [
  {
    title: "行李很重或很大时最理想",
    desc: "机场利木津巴士把行李放进车底行李舱——你不必把包拖过车厢、扛上扶梯。带家人、带滑雪装备，或拉大型行李箱的人特别有用。",
  },
  {
    title: "直达主要酒店",
    desc: "很多利木津巴士线路直接停在主要酒店区：新宿、涩谷、东京站、赤坂、池袋，部分线路停在个别酒店。线路请查 T-CAT（东京城市航空总站）的时刻表。",
  },
  {
    title: "零换乘——而且收车更晚",
    desc: "许多线路直达主要酒店与区域，所以你上一次车、下车就在门口附近——带小小孩、长辈或大量装备时很理想。机场巴士的运营时间也比大多数机场电车更晚，所以如果你在电车末班之后才落地，巴士通常是打车之前最便宜的选项。请确认你那条线路的末班时间。",
  },
  {
    title: "会受路况影响",
    desc: "东京高速公路在高峰时段（早上 7～9 点、傍晚 5～8 点）可能严重拥堵。如果你在高峰时段出行，请多留时间，或考虑坐电车、把重行李用宅急便（行李寄送）送到酒店。",
  },
  {
    title: "旺季请提前订",
    desc: "旺季提前订可以在热门线路上确保座位、锁定票价，也省掉长途飞行后在机场柜台排队。",
  },
];

const transferTips = [
  {
    title: "落地前先把 IC 卡准备好",
    desc: "通过 Suica App 开好的 IC 卡（Suica 或 PASMO）让你一抵达就能直接刷闸机，不用在售票机前排队。如果你没有，成田与羽田的 IC 卡机器都有英文界面。京成提醒一点：IC 卡只能支付 Skyliner 的 ¥1,280 乘车券部分，¥1,300 的 Liner 券要另外购买。",
  },
  {
    title: "深夜抵达的选项有限",
    desc: `从羽田出发，开往品川的京急末班车 00:08 从 3 号航站楼发车；之后的选择只剩深夜接驳巴士（00:00 到 02:00 之间从机场发车，新宿或池袋 ¥2,800，东京、银座、浅草或秋叶原 ¥1,900）或用车。从成田出发，Skyliner 末班车工作日 23:00、周末与节假日 22:40 从机场发车。羽田完全没有公布出租车价格，成田的定额价格不含高速费就从 ¥23,500 起，所以与其靠猜，不如把预约接送列入预算。时间与巴士票价查询于 ${CHECKED}；Skyliner 发车时间与出租车价格查询于 ${CHECKED_TAXI}。`,
  },
  {
    title: "持 JR Pass 的人：上车前先完成激活",
    desc: "如果你带着 JR Pass 兑换券抵达成田，请先在到达大厅的 JR 东日本旅行服务中心换成正式的周游券，再去坐 N'EX。光有兑换券进不了闸机。",
  },
  {
    title: "考虑行李寄送（宅急便）",
    desc: "日本的宅急便服务（最常见的是大和运输的黑猫宅急便）可以把行李从机场送到你的酒店，通常第二天送达。这让你可以轻装坐电车，不用把重箱子拖过车站。价格由快递公司制定，而不是上述任何一家交通运营商，所以请到到达大厅的柜台按你的行李尺寸确认。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "成田机场到东京最便宜的方式是什么？",
    a: `最便宜的电车是京成本线特急，到京成上野 ¥1,060（IC ¥1,052）——经京成成田的普通列车，虽然叫「特急」，但不收特急费。走较快的成田 Sky Access 线的 Access 特急，到日暮里或京成上野 ¥1,280（IC ¥1,267），到浅草 50 分钟。两者都不用订座。如果你持有 JR Pass，成田特快已经包括在内，是更好的选择。票价查询自京成，${CHECKED}。`,
  },
  {
    q: "成田特快和 Skyliner 哪个快？",
    a: `按运营商自家数字，去东京东侧 Skyliner 更快，去东京西侧 N'EX 更快。京成公布 Skyliner 从 2·3 号航站楼到京成上野 41 分钟；JR 东日本公布 N'EX 到东京站「最快 53 分钟」。不过 Skyliner 只停日暮里与京成上野，所以如果你的酒店在新宿、涩谷或横滨，N'EX 整体通常胜出，因为它不用换乘就到。Skyliner 票价 ¥2,580，N'EX 到东京 ¥3,140；买京成自家优惠票的话 Skyliner 只要 ¥2,310。查询于 ${CHECKED}。`,
  },
  {
    q: "羽田机场到新宿怎么走？",
    a: `三种方式。京急机场线最快——京急自家估计从 3 号航站楼到新宿 30 分钟、1·2 号航站楼 33 分钟，换乘一次；机场到品川这段 ¥330。东京单轨电车 13 分钟到滨松町、¥520，再坐山手线绕到新宿。机场利木津巴士直达新宿与中野站点 ¥1,400（儿童 ¥700），行李放车底。每人一个行李箱就坐电车；三个就坐巴士。查询于 ${CHECKED}。`,
  },
  {
    q: "机场交通需要提前预订吗？",
    a: `电车方面，提前预订是为了价格而不是座位：Skyliner 优惠票单程 ¥2,310 而不是 ¥2,580，N'EX 东京往返车票 ¥5,200，而到新宿买两张单程要 ¥6,660，Skyliner ＋东京地铁通票组合从 ¥2,840 起。这些都要在机场领取，所以还是要预留柜台的时间。真正需要预订的是车辆固定的选项：旺季的利木津巴士指定线路，以及任何专车或拼车接送，尤其是末班车之后才落地的航班。查询于 ${CHECKED}。`,
  },
  {
    q: "末班车之后才落地怎么办？",
    a: `从羽田出发，京急末班车 00:08 从 3 号航站楼开往品川，00:20 到达。之后官方的选项是深夜接驳巴士，00:00 到 02:00 之间从机场发车，新宿或池袋 ¥2,800，东京、银座、浅草或秋叶原 ¥1,900——而且只停这些指定站点。从成田出发，Skyliner 末班车工作日 23:00、周末 22:40 从机场发车，分别在 23:48 与 23:28 到达京成上野。在这些之后，只有预约的车能到任意地址——这是唯一一种花钱买接送而不是买车票明显划算的情况。电车时间查询于 ${CHECKED}，Skyliner 发车时间查询于 ${CHECKED_TAXI}。`,
  },
  {
    q: "羽田机场到东京市中心要多久？",
    a: `羽田比成田离市区近得多。按京急自家估计，3 号航站楼到品川 11 分钟、东京 20 分钟、涩谷 23 分钟、横滨 23 分钟、新宿 30 分钟、浅草 34 分钟、池袋 38 分钟；从 1·2 号航站楼出发约加 3 分钟。东京单轨电车 13 分钟到滨松町，大约每 5 分钟一班。查询于 ${CHECKED}。`,
  },
  {
    q: "成田机场可以用 IC 卡吗？",
    a: "可以——IC 卡（Suica 与 PASMO）在成田的京成列车与 N'EX 上都能用。坐 Skyliner 时，IC 卡只能支付 ¥1,280 的乘车券部分（IC ¥1,267）；¥1,300 的 Liner 券要另外购买。在羽田，京急线与东京单轨电车都可以用 IC 卡。在机场到达大厅任何一台售票机都能充值。",
  },
  {
    q: "成田特快 N'EX 值得坐吗？",
    a: `如果你有 JR Pass，绝对值得——它免费、含指定席，也是最舒服的选项。没有周游券的话，到东京站 ¥3,140、到品川、涩谷或新宿 ¥3,330，换来的是不用换乘的直达；如果返程也从成田飞，¥5,200 的往返车票又更划算。票价中的指定席部分淡季便宜 ¥200、旺季贵 ¥200。查询于 ${CHECKED}。`,
  },
  {
    q: "成田机场到新宿怎么走？",
    a: `最简单的是成田特快 N'EX，直达新宿 ¥3,330（持 JR Pass 免费），不用换乘。另一个选择是京成 Skyliner 到日暮里——按京成数字到京成上野 41 分钟——再换乘 JR 山手线，比较便宜（¥2,580），但你和酒店之间会多一次换乘和一段楼梯。利木津巴士到新宿站点 ¥3,600，行李放车底。查询于 ${CHECKED}。`,
  },
  {
    q: "Skyliner 可以用 JR Pass 吗？",
    a: "不行。Skyliner 属于京成电铁这家民营铁路，日本铁路周游券不覆盖。持 JR Pass 的人应该坐 N'EX，它是 JR 东日本的列车，持周游券免费，含指定席。如果你没有 JR Pass，Skyliner 对去东京东侧来说是很强的选项。",
  },
  {
    q: "在东京，机场利木津巴士比电车好吗？",
    a: "看你在意什么。行李很重、想要不换乘直达酒店、深夜落地，或住的地方就在巴士站旁边时，巴士胜出。电车在速度与可预测性上胜出，尤其在高峰路况下。对大多数行李不多、住在车站旁酒店的旅客来说，电车比较快；对所有拉着大行李箱的人来说，巴士比较轻松。",
  },
  {
    q: "成田的末班车几点？",
    a: `Skyliner 方面，京成自家时刻表显示工作日从成田机场站发出的末班车是 23:00——Skyliner 188 次，23:03 停 2·3 号航站楼、23:43 到日暮里、23:48 到京成上野；周末与节假日是 22:40 的 Skyliner 186 次，23:23 到日暮里、23:28 到京成上野。首班车是 07:23 的 Skyliner 2 次，08:29 到达京成上野。京成普通列车比 Skyliner 末班稍晚，但 Skyliner 时刻表上没有给出统一的时间，请查你出发当天的时刻。查询于 ${CHECKED_TAXI}。`,
  },
  {
    q: "从成田或羽田打车到东京要多少钱？",
    a: `成田有机场制定的六区定额价格：江户川区、葛饰区、足立区 ¥23,500～¥26,500；江东区、墨田区、台场、东八潮 ¥28,000；中央区、千代田区、台东区、文京区、荒川区 ¥29,000～¥31,000；新宿区、丰岛区、中野区、涩谷区、目黑区、港区、品川区、大田区 ¥31,500～¥32,500；板桥区、北区、练马区 ¥34,000～¥36,000；世田谷区、杉并区、三鹰市、武藏野市 ¥35,500～¥38,500。每个区间的两个数字对应两条高速公路路线，高速费另计，22:00 到 05:00 之间另有加价。羽田方面，机场确认有覆盖东京都与神奈川县的定额制度、高速费另计，但没有公布金额，所以本页不列数字。查询于 ${CHECKED_TAXI}。`,
  },
  {
    q: "4 个人包车接送值得吗？",
    a: `单看价格不值得。把成田到新宿的公布票价乘以四位成人：利木津巴士 ¥14,400，每人 ¥3,600，行李放车底；N'EX ¥13,320，每人 ¥3,330；定额出租车 ¥31,500～¥32,500 加高速费，每人 ¥7,875～¥8,125。从羽田差距更大，因为京急到品川这段每人只要 ¥330。包车值得的时候，问题不在价格——末班车之后才落地（羽田 00:08、成田 23:00 或 22:40）、酒店没有任何巴士线路停靠、行李比手还多，或是 5 人以上同行，这时 7 座或 10 座车是按车计价而不是按座位。票价查询于 ${CHECKED}，出租车分区查询于 ${CHECKED_TAXI}。`,
  },
  {
    q: "成田与羽田的利木津巴士多少钱？",
    a: `每座机场没有统一票价——运营商按线路定价。从成田到迪士尼度假区 ¥2,900、东京站与 T-CAT ¥3,100、新宿或涩谷 ¥3,600；公布的东京站时刻表车程约 1 小时 50 分。从羽田到东京站 ¥1,200、涩谷 ¥1,300、新宿或中野 ¥1,400。查询于 ${CHECKED}。`,
  },
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "成田机场到东京交通" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnTokyoAirportTransferPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

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
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            东京机场交通 2026：<br />成田与羽田到东京市区，N&apos;EX vs Skyliner
          </h1>
          <p className={styles.heroSubtitle}>
            以下每一项票价与车程都来自各运营商的官方网站，查询于 {CHECKED}；出租车定额价格与 Skyliner
            首末班车查询于 {CHECKED_TAXI}。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "成田与羽田", "N'EX vs Skyliner"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* The answer first. */}
        <p className={styles.bodyText}>
          从<strong>成田</strong>出发，最快的<strong>东京机场交通</strong>是<strong>京成 Skyliner</strong>——
          <strong>41 分钟</strong>到京成上野、<strong>¥2,580</strong>；最便宜的是
          <strong>京成本线特急，¥1,060</strong>。去<strong>东京站</strong>的话，
          <strong>成田特快 N&apos;EX</strong> 是 <strong>¥3,140</strong>、<strong>最快 53 分钟</strong>，持 JR Pass
          免费。从<strong>羽田</strong>出发，最快和最便宜是同一班车：<strong>京急机场线</strong>
          <strong>11 分钟到品川、¥330</strong>，<strong>东京单轨电车</strong>则是
          <strong>13 分钟到滨松町、¥520</strong>。以上是成人单程票价，于 {CHECKED} 查询自 JR 东日本、京成、京急、
          东京单轨电车与利木津巴士；成田的定额出租车按区域为 <strong>¥23,500～¥38,500</strong>，高速费另计，
          于 {CHECKED_TAXI} 查询自成田机场。
        </p>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成田最便宜</p>
                <p className={styles.verdictStatValue}>京成本线特急（¥1,060）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成田最快</p>
                <p className={styles.verdictStatValue}>京成 Skyliner（41 分钟）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>羽田最便宜</p>
                <p className={styles.verdictStatValue}>京急到品川（¥330）</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>原则：</strong>持 JR Pass，或要去东京西侧（新宿、涩谷、横滨），坐
              <strong>成田特快 N&apos;EX</strong>。要去上野或东京东侧，坐<strong>京成 Skyliner</strong>。
              从<strong>羽田</strong>出发就坐京急线——快、便宜、好懂。
            </p>
          </div>
        </div>

        {/* Hotel area against airport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>按酒店区域</span>
          <h2 className={styles.sectionTitle}>我的酒店区域适合哪一种东京机场交通？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            如果你已经知道要住哪里，这是你唯一需要的一张表。找到你的区域往右看：最快的选项、最便宜的选项，
            以及有没有不必拖着行李箱换乘就能到的方式。从成田出发，东京西侧是 N&apos;EX 的地盘，东侧属于京成；
            从羽田出发，京急线五个区域都到得了。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["酒店区域", "成田最快", "成田最便宜", "羽田最快", "不用换乘直达"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.area}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.naritaFast}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.naritaCheap}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hanedaFast}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.direct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            票价与成田车程于 {CHECKED} 查询自 JR 东日本、京成与利木津巴士；羽田的时间是京急自家的估计值，
            不含换乘本身的时间。还在挑房间？我们的{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo">东京住宿区域攻略（英文）</Link>按线路与机场
            比较同样这些区域，{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">东京 5 天行程（英文）</Link>则告诉你较长的行程
            实际上多半在山手线的哪一侧度过。
          </p>
        </section>

        {/* Every option, one table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>价格与时间</span>
          <h2 className={styles.sectionTitle}>东京机场交通要多少钱、要多久？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            两座机场共十一个选项，成人单程票价对照运营商自家公布的车程，各机场内由便宜到贵排列。差距本身就说明了
            一切：从成田出发，价格范围是 <strong>¥1,060 到 ¥38,500</strong>；从羽田出发，最便宜的进城方式只要{" "}
            <strong>¥330</strong>。运营商没有公布数字的地方，表格会直接注明。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["机场", "选项", "公布车程", "成人单程票价", "资料来源"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allOptionRows.map((row) => (
                    <tr key={`${row.airport}-${row.option}`}>
                      <td style={{ fontSize: "0.85rem" }}>{row.airport}</td>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        {row.source}，{row.taxi ? CHECKED_TAXI : CHECKED}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={skylinerUrl} className={styles.verdictBtn} target="_blank" rel={KLOOK_REL}>
              在 Klook 订 Skyliner 车票 →
            </KlookLink>
            <KlookLink href={nexRoundTripUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              在 Klook 订 N&apos;EX 往返车票 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook 页面会在新标签页打开。本页不列 Klook 价格：Klook 会屏蔽自动读取商品页，所以这里无法验证任何数字。
            上面的铁路票价是柜台价——两家运营商都有卖更便宜的旅客票，请见下方的{" "}
            <a href="#prebuy" style={{ color: "var(--text)", fontWeight: 600 }}>预购票一览表</a>。
          </p>
        </section>

        {/* Narita master table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>成田机场（NRT）</span>
          <h2 className={styles.sectionTitle}>成田机场到东京市中心怎么走？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            共有六种方式，老实说该按你住哪里来排名，而不是按速度。成田在东京市区以东约 60～70 公里，所以每个选项
            都不是小事：最快的电车 41 分钟，最便宜的 ¥1,060。票价为成人单程；运营商没有公布数字的地方，表格直接注明，
            不做猜测。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["选项", "公布车程", "成人单程票价", "班次", "下车地点"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {naritaMasterRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.often}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.lands}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            查询于 {CHECKED}：Skyliner 与京成票价来自京成的日文 Skyliner 车票页与英文 FAQ（¥1,280 乘车券＋¥1,300
            Liner 券），车程来自京成的英文线路页；N&apos;EX 票价与每 30 分钟一班的班次来自 JR 东日本；巴士票价与东京站
            时刻表来自利木津巴士。京成的英文票价表仍是 2025 年前的 Skyliner 票价 ¥2,470——本页采用现行的 ¥2,580。
            这些运营商都没有公布出租车价格，出租车的数字来自成田机场本身（见下方出租车一节）。
          </p>
        </section>

        {/* Haneda master table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>羽田机场（HND）</span>
          <h2 className={styles.sectionTitle}>羽田机场到东京市中心怎么走？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            羽田距离东京市中心 15～20 公里，进城只是一趟市内出行，不是长途跋涉：¥330、11 分钟就到山手线上的品川。
            在羽田，问题几乎从来不是速度——而是行李，以及你的航班几点落地。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["选项", "公布车程", "成人单程票价", "班次", "下车地点"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hanedaMasterRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.often}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.lands}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            查询于 {CHECKED}：京急票价与预估车程来自京急的机场交通网站；单轨电车票价与 13 分钟、约每 5 分钟一班的
            数字来自东京单轨电车；巴士与接驳巴士票价来自利木津巴士。京急的 ¥330 是 3 号航站楼到品川的票价（IC ¥327）
            ——品川以后的票价按换乘线路而定。
          </p>
        </section>

        {/* Cheapest */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>最便宜</span>
          <h2 className={styles.sectionTitle}>成田机场到东京最便宜的方式是什么？</h2>
          <p className={styles.bodyText}>
            <strong>京成本线特急，¥1,060</strong> 到京成上野（IC ¥1,052）。它是普通通勤用的特急，不是高级列车，
            所以虽然叫「特急」，却不收特急费、也不用订座——直接上车。京成没有公布它的统一车程，这是你除了行李空间之外
            唯一放弃的东西。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>¥1,060——京成本线特急</strong>到京成上野，经京成成田与船桥。从机场出发最便宜的电车，没有之一。</li>
            <li><strong>¥1,280——京成 Access 特急</strong>到日暮里或京成上野（IC ¥1,267），走较快的成田 Sky Access 线。京成公布直通浅草 50 分钟，并且不用换乘继续开往日本桥、新桥与品川。</li>
            <li><strong>¥2,580——京成 Skyliner</strong>，用京成自家优惠票是 ¥2,310。你多付的 ¥1,300 Liner 券买到的是指定席、行李架与 41 分钟。</li>
            <li><strong>¥0——持 JR Pass 坐 N&apos;EX。</strong>指定席也包括在内，对持周游券的人来说，这是遥遥领先的最便宜舒适选项。</li>
          </ul>
          <p className={styles.bodyText}>
            整个阶梯就是这样：¥1,060 买到最慢的车，¥2,580 买到最快的车，而如果你在乎钱、不在乎指定席，¥1,280 的
            Access 特急是大多数人该坐的那一班。票价于 {CHECKED} 查询自京成；本线的数字是京成车站票价表上印的数字。
          </p>
        </section>

        {/* Which airport is closer */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>成田 vs 羽田</span>
          <h2 className={styles.sectionTitle}>东京哪一座机场离市区更近？</h2>
          <p className={styles.bodyText}>
            <strong>羽田</strong>，而且差距很大，运营商自家的数字就看得出有多大。京急公布
            <strong>羽田 3 号航站楼到品川 11 分钟、¥330</strong>；<strong>成田</strong>公布最快的电车是 Skyliner，
            <strong>到京成上野 41 分钟、¥2,580</strong>，到东京站最快的是 N&apos;EX，
            <strong>「最快 53 分钟」、¥3,140</strong>。所以在羽田落地，还没离开机场就大约省下半小时、每人约
            <strong>¥2,250</strong>。成田在市区以东约 60～70 公里；羽田在市区以南 15～20 公里——所以一个是长途出行，
            另一个只是市内坐电车。
          </p>
          <p className={styles.bodyText}>
            这在你还在选机票时很重要。如果成田的机票每人比羽田便宜不到约 ¥2,500，交通费就把省下的钱抵消了——返程那天
            也是同样的算法，因为从成田出发的清晨航班，比 Skyliner 首班车还早。数字查询于 {CHECKED}。
          </p>
        </section>

        {/* N'EX Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>成田特快</span>
          <h2 className={styles.sectionTitle}>成田特快 N&apos;EX 怎么坐？</h2>
          <p className={styles.bodyText}>
            它是 JR 东日本的全车指定席特急，从成田两个航站楼开往东京、品川、涩谷、新宿、池袋与横滨——一班车、不用换乘，
            一天中大部分时段每 30 分钟一班。你需要乘车券与特急券两张，下面的单一票价数字就是两者合计。
          </p>
          <div className={styles.stepsList}>
            {nexGuidePoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={nexRoundTripUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看 N&apos;EX 往返车票 →
            </KlookLink>
          </div>
        </section>

        {/* Skyliner Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>京成 Skyliner</span>
          <h2 className={styles.sectionTitle}>京成 Skyliner 怎么坐？</h2>
          <p className={styles.bodyText}>
            它是京成沿成田 Sky Access 线开往日暮里与京成上野的指定席特急——成田出发最快的电车，每小时 3 班，
            而且 JR Pass 不能坐。
          </p>
          <div className={styles.stepsList}>
            {skylinerPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={skylinerUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看 Skyliner 车票 →
            </KlookLink>
          </div>
        </section>

        {/* Skyliner vs N'EX */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>正面对决</span>
          <h2 className={styles.sectionTitle}>成田特快和 Skyliner 哪个快？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Skyliner</strong> 车更快、票也更便宜——按京成自家数字，<strong>41 分钟</strong>到京成上野、
            <strong>¥2,580</strong>，N&apos;EX 则是 <strong>¥3,140</strong>、到东京站<strong>「最快 53 分钟」</strong>。
            但它只到两个车站。如果你的酒店在新宿、涩谷、品川或横滨，<strong>N&apos;EX</strong> <em>到酒店</em>反而更快，
            因为它不用换乘就到——而且持 JR Pass 免费，对持周游券的人来说直接定案。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "京成 Skyliner", "成田特快 N'EX"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {skylinerVsNexRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.skyliner}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.nex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>还有一个没人比较的第三选项：</strong>两种列车从机场出发走的是不同线路，而两条线路上的便宜列车也
            不一样。成田 Sky Access 线跑的是 Skyliner 与 Access 特急；京成本线跑的是普通特急。同一家运营商、同一座机场，
            乘车券差 ¥220——Access 特急到日暮里 ¥1,280，本线特急到京成上野 ¥1,060。如果你在比的是 Sky Access 线对本线，
            而不是 Skyliner 对 N&apos;EX，差别就只有这样：多付 ¥220 换更快的线路，两者都没有指定席。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            票价与车程于 {CHECKED} 查询自 JR 东日本与京成。Skyliner 的时间是京成公布的 2·3 号航站楼到京成上野；N&apos;EX
            的时间是 JR 东日本公布的最快班次到东京站。两家运营商都会调整票价——请在柜台或结账时确认。
          </p>
        </section>

        {/* By destination */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>按目的地</span>
          <h2 className={styles.sectionTitle}>你的酒店该坐哪一班？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            选和你酒店相符的那一行，而不是最快的那班车。拖着两个行李箱换乘一次，花掉的时间比 Skyliner 与 N&apos;EX
            之间的 12 分钟还多。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["目的地", "我们的选择", "原因"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {destinationRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            还没订酒店？那这张表就反过来用：最轻松的抵达方式，是在订房之前就选好的那一种——进城后各条线路怎么衔接，
            请看{" "}
            <Link href="/guides/transport/tokyo-transportation">东京交通攻略（英文）</Link>；短天数的行程实际上多半在
            山手线的哪一侧，请看{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">东京 3 天行程（英文）</Link>。
          </p>
        </section>

        {/* Haneda to Shinjuku */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>羽田</span>
          <h2 className={styles.sectionTitle}>羽田机场到新宿怎么走？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            京急自家估计<strong>从 3 号航站楼 30 分钟</strong>、1·2 号航站楼 33 分钟，换乘一次；其中机场到品川这段 ¥330。
            不用换乘的选择是<strong>利木津巴士到新宿与中野站点，¥1,400</strong>（儿童 ¥700），行李放车底。单轨电车线路
            ——13 分钟到滨松町、¥520，再换乘山手线——适合目的地是滨松町、新桥或东京站，而不是新宿的人。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["目的地", "从 3 号航站楼", "从 1·2 号航站楼"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {keikyuTimeRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td className={styles.tdPrice}>{row.t3}</td>
                      <td>{row.t12}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            京急的预估车程，查询于 {CHECKED}。不含换乘时间，其中几个目的地需要换乘一次。¥330（IC ¥327）是 3 号航站楼到
            品川的票价；之后的票价按换乘线路而定，用{" "}
            <Link href="/guides/transport/ic-cards-japan">IC 卡（英文攻略）</Link>就能全部搞定，不必用售票机。
          </p>
        </section>

        {/* Limousine Bus */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>机场巴士</span>
          <h2 className={styles.sectionTitle}>机场利木津巴士比电车好吗？</h2>
          <p className={styles.bodyText}>
            当问题是行李而不是分钟数时，巴士更好。每人两件托运行李放进车底，直到你下车前都不用再碰，而且很多线路
            的终点是酒店门口，而不是车站大厅。高峰时段它更差，因为巴士和大家堵在同一条高速公路上。每座机场没有统一
            票价——运营商按线路定价。
          </p>
          <div className={styles.tableWrap} style={{ marginBottom: "1.25rem", marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["机场", "车程", "单程票价", "备注"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {busFareRows.map((row) => (
                    <tr key={row.airport}>
                      <td className={styles.tdProvider}>{row.airport}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.stepsList}>
            {busPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            每条线路的票价、行李限制与预约规则，都在我们的{" "}
            <Link href="/guides/transport/tokyo-airport-limousine-bus">东京机场利木津巴士攻略（英文）</Link>里，
            读的是同一批运营商页面。上方巴士票价查询于 {CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={naritaBusUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              成田利木津巴士（Klook）→
            </KlookLink>
            <KlookLink href={hanedaBusUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              羽田利木津巴士（Klook）→
            </KlookLink>
          </div>
        </section>

        {/* Taxi */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>出租车</span>
          <h2 className={styles.sectionTitle}>从成田或羽田打车到东京要多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>成田</strong>有公布的答案，而且是定额而不是打表：成田机场定了
            <strong>六个区域，¥23,500 到 ¥38,500</strong>，<strong>高速费另计</strong>，
            <strong>22:00～05:00 另有加价</strong>。东京市中心——中央区、千代田区、台东区、文京区、荒川区——是 C 区，
            按司机走哪条高速公路为 <strong>¥29,000 或 ¥31,000</strong>；新宿与涩谷是 D 区，
            <strong>¥31,500 或 ¥32,500</strong>。<strong>羽田</strong>则没有公布的答案：机场确认有覆盖东京都与神奈川县的
            定额制度、高速费另计，但表示乘客应向出租车公司询问金额，而东京出租车协会自己的价格页面在查询时无法访问，
            所以本页不列羽田的数字。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["区域", "行政区与城市", "经京叶道路", "经湾岸线"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {naritaTaxiRows.map((row) => (
                    <tr key={row.zone}>
                      <td className={styles.tdProvider}>{row.zone}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.wards}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.keiyo}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.bay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            成田机场自家公布的出租车定额价格，查询于 {CHECKED_TAXI}。两栏是机场分开定价的两条高速公路路线；机场表示，
            上表每个数字之外，<em>「乘客须支付高速公路通行费」</em>，且 22:00 到 05:00 之间有深夜清晨加价，但没有写明金额。
            这是在候车点打车的价格——提前预约的车由运营商自行报价，不适用这张表。
          </p>
        </section>

        {/* Families */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>家庭与团体</span>
          <h2 className={styles.sectionTitle}>家庭出游最适合哪一种东京机场交通？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            四个人的老实答案是<strong>成田坐利木津巴士</strong>、<strong>羽田坐电车</strong>——而不是包车，虽然大多数网页
            都在暗示包车。把公布票价乘出来，四人从成田坐定额出租车到新宿是
            <strong>每人 ¥7,875～¥8,125 加高速费</strong>，坐巴士则是<strong>每人 ¥3,600</strong>、行李放车底；从羽田坐电车
            那一段是 <strong>¥330</strong>。四个人时，包车每人并不会比巴士便宜；它只是比出租车便宜，那是另一回事。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["选项", "计价线路", "四位成人合计", "每人", "有小孩时"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {familyRows.map((row) => (
                    <tr key={`${row.option}-${row.route}`}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.option}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.four}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.each}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.kids}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            每个数字都是上方各表的公布单程票价乘出来的——京成、JR 东日本、京急、东京单轨电车与利木津巴士，查询于{" "}
            {CHECKED}；D 区出租车价格来自成田机场，查询于 {CHECKED_TAXI}，高速费还要另加。运营商没有公布儿童票价的地方，
            表格直接注明，而不是把成人票价砍半。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>那门到门的接送车什么时候真的胜出？</strong>按公布的数字，有四种情况，而且关键在「门口」而不是价格：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>你在末班车之后落地。</strong>羽田是 00:08 之后；成田的 Skyliner 末班车工作日 23:00、周末 22:40 从机场发车。在那之后，只有车能把你送到地址，而不是站点。</li>
            <li><strong>你的酒店不在巴士线路上。</strong>巴士每人 ¥3,600 的前提是它停在你门口附近；否则你付的是巴士加出租车。</li>
            <li><strong>行李比手还多。</strong>两大两小、四个行李箱加一辆婴儿车，在日暮里根本换乘不了，而 ¥1,280 的 Access 特急省下的钱，在第一次有人扛着行李箱爬楼梯时就没了。</li>
            <li><strong>你们有 5 人以上。</strong>巴士与电车按座位计价、人数一多就线性增加；7 座或 10 座车按车计价，所以每人分摊的金额会持续下降，车票则不会。</li>
          </ul>
          <p className={styles.bodyText}>
            要在出发前订，而不是到候车点才叫：预约接送的重点是司机会跟踪你的航班号，这在到达大厅是安排不了的。请拿你们
            人数的报价和上表的「每人」栏比较——如果没有比巴士便宜，就坐巴士。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={privateTransferUrl} className={styles.verdictBtn} target="_blank" rel={KLOOK_REL}>
              全员同车的专车接送 →
            </KlookLink>
            <KlookLink href={sharedTransferUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              拼车接送，按座位计价 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
            两个商品都会在新标签页打开 Klook，并于 {CHECKED} 确认仍在销售。本页不列 Klook 价格——专车接送按区域与车型报价，
            就算 Klook 的商品页能被自动读取，单一数字对大多数订单来说也是错的。
          </p>
        </section>

        {/* Booking */}
        <section className={styles.comparisonSection} id="prebuy">
          <span className={styles.sectionLabel}>预订</span>
          <h2 className={styles.sectionTitle}>机场交通需要提前预订吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            电车方面，提前预订买到的是更低的价格，而不是一个否则会被抢光的座位：两家运营商都卖比柜台价便宜的旅客票，
            而且两者都还是要到机场领取。真正需要预订的是车辆固定的选项——旺季的巴士指定线路，或是电车收车后才落地的
            航班要用的车。以下是每一种的价格，以及实际上怎么拿到手。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["值得预购吗？", "价格", "领取方式", "我们的看法"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prebuyRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.collect}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.worth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            价格查询于 {CHECKED}，来自京成（Skyliner 优惠票与 Skyliner ＋东京地铁通票组合）、JR 东日本（N&apos;EX 东京
            往返车票）、东京单轨电车（山手线优惠票及其发售日）、利木津巴士（巴士＋地铁通票组合）与京急（羽得票组合，
            运营商表示羽田机场不发售）。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>付款前先确认三件事。</strong>第一，是电子票还是要兑换的凭证：Skyliner 与巴士都可以是直接扫描的
            二维码，而 N&apos;EX 往返车票必须带护照到机场车站领取，长途飞行后还要再排一次队。第二，取消期限——在分销平台上
            是按各商品而定，不是铁路公司定的，请确认你那天日期显示的规定。第三，你几点落地：23:40 抵达羽田，离末班车只剩
            28 分钟（3 号航站楼 00:08 发车，依京急深夜时段信息页，核查日期 2026年11月1日），提前买什么都改变不了这一点，除了一辆车。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={skylinerUrl} className={styles.verdictBtn} target="_blank" rel={KLOOK_REL}>
              在 Klook 订 Skyliner 车票 →
            </KlookLink>
            <KlookLink href={nexRoundTripUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              在 Klook 订 N&apos;EX 往返车票 →
            </KlookLink>
            <KlookLink href={naritaBusUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              成田利木津巴士 →
            </KlookLink>
            <KlookLink href={hanedaBusUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              羽田利木津巴士 →
            </KlookLink>
            <KlookLink href={privateTransferUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              机场专车接送 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook 页面会在新标签页打开。本页不列 Klook 价格：Klook 会屏蔽自动读取商品页，所以这里无法验证任何数字——
            请在结账时确认你那天的现价与取消规定。如果你在市区的日子以地铁为主，可以看看{" "}
            <KlookLink href={busSubwayComboUrl} target="_blank" rel={KLOOK_REL} style={{ color: "var(--text)", fontWeight: 600 }}>
              巴士＋东京地铁通票组合
            </KlookLink>
            ；通票本身值不值得，请看我们的{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">东京地铁通票攻略（英文）</Link>。
          </p>
        </section>

        {/* Late night and pre-dawn */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>深夜与清晨</span>
          <h2 className={styles.sectionTitle}>深夜落地或清晨起飞怎么办？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            这是值得在出发前就决定的事，因为它有一条硬边界。羽田的末班车 <strong>00:08</strong> 从 3 号航站楼发车、首班车
            <strong>05:26</strong>；在两者之间，唯一有固定班次的公共交通是深夜接驳巴士，只停少数指定站点。成田的 Skyliner
            末班车工作日 <strong>23:00</strong>、周末 <strong>22:40</strong> 从机场发车，首班车 <strong>07:23</strong>。
            06:40 起飞的航班，意味着你得在首班车都还没开之前就到航站楼。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "运营商公布的内容", "资料来源"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nightRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}，{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ul className={styles.bodyList} style={{ marginTop: "1.25rem" }}>
            <li><strong>午夜前在羽田落地：</strong>坐电车。¥330 到品川，胜过本页其他所有选项。</li>
            <li><strong>00:10 到大约 02:00 之间在羽田落地：</strong>如果接驳巴士有站点靠近你的酒店就坐它——东京、银座、浅草或秋叶原 ¥1,900，新宿或池袋 ¥2,800。否则就用车。</li>
            <li><strong>02:00 到 05:26 之间在羽田落地：</strong>预约的车，或待在航站楼。羽田的隔离区是开着的，电车则没有。</li>
            <li><strong>工作日 23:00 以后、或周末 22:40 以后在成田落地：</strong>当天的 Skyliner 已经收车。先查你那条线路的巴士，如果酒店不在线路上就订车——定额出租车不含高速费就从 ¥23,500 起。</li>
            <li><strong>07:00 前起飞：</strong>羽田从 05:26 往回推、市区首班巴士约 04:00 往回推，或住在机场附近。清晨接驳巴士 03:35 从池袋、04:00 从新宿高速巴士总站（Busta 新宿）发车。</li>
          </ul>
          <p className={styles.bodyText}>
            这些选项中只有车能送你到地址而不是站点，这正是为什么它在凌晨 1 点值得花钱、在下午 2 点则是浪费。请在出发前
            预订——司机会跟踪你的航班号才是重点，这在到达大厅是安排不了的。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={privateTransferUrl} className={styles.verdictBtn} target="_blank" rel={KLOOK_REL}>
              专车接送，羽田或成田 →
            </KlookLink>
            <KlookLink href={sharedTransferUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              一两个人适合的拼车接送 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
            两个商品都于 {CHECKED} 在 Klook 确认仍在销售。价格按区域与车型而定，请在结账时确认——也请确认取消期限，
            因为按航班号预约的车，是本页唯一一个当晚无法改订的东西。
          </p>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>小贴士</span>
          <h2 className={styles.sectionTitle}>落地前还该知道什么？</h2>
          <div className={styles.stepsList}>
            {transferTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where to stay for easy airport access */}
        <KlookStayAreas
          heading="住在哪里，机场往返最轻松"
          intro="哪一种交通最好，与其说取决于机场，不如说取决于你住哪里，因为只有少数区域有直达机场的电车。如果你还没订酒店，先从这几个区域挑一家，抵达与离开都会简单很多——坐清晨航班离开时尤其重要。"
          areas={stayAreas}
        />

        {/* Klook: two things the transfer ticket does not cover */}
        <KlookTripPrep
          heading="机场票不包括的两件事"
          intro="机场票只送你到第一个车站。这两项负责它的前后："
          items={tripPrep}
        />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/where-to-stay-in-tokyo", title: "东京住宿区域攻略（2026）：按线路与机场比较最佳区域（英文）" },
            { href: "/guides/transport/tokyo-airport-limousine-bus", title: "东京机场利木津巴士（2026）：成田与羽田的票价、时间与站点（英文）" },
            { href: "/guides/transport/tokyo-transportation", title: "东京交通攻略 2026：电车、地铁与 IC 卡（英文）" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "东京地铁通票（2026）：24、48 或 72 小时，值得买吗？（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略 2026：日本行值得买吗？（英文）" },
            { href: "/guides/transport/ic-cards-japan", title: "日本 IC 卡 2026：Suica、PASMO 与使用方法（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "东京 3 天行程（2026）：要订什么、按什么顺序（英文）" },
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "东京 5 天行程（2026）：五天行程与每天要订的票（英文）" },
            { href: "/guides/transport/osaka-airport-transfer", title: "大阪机场交通（2026）：关西与伊丹机场到市区比较（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新干线攻略 2026：车票、周游券与新手须知（英文）" },
            { href: "/guides/transport", title: "所有日本交通攻略（英文）→" },
          ]}
        />
      </div>
    </>
  );
}
