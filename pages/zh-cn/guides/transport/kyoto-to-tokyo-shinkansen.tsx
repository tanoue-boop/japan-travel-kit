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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  hanedaLimousineBus,
  jrPassWholeJapan,
  klookEsim,
  kyotoToTokyoArrivalStayAreas,
  kyotoToTokyoTripPrep,
  luggageDeliveryCards,
  naritaLimousineBus,
  shinkansenKyotoTokyo,
  tokyoPrivateAirportTransfer,
  tokyoSharedAirportTransfer,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/kyoto-to-tokyo-shinkansen) section by section as of
// 2026-11-27 (task jtk-20261127-TR01): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: 京都到东京新干线 — the phrase Simplified Chinese results use for this route
// (ekitan.com/zh-cn "从京都到东京的新干线票价和订票方式", railmonsters, shinkansen-ticket.com/zh-hans).

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/transport/kyoto-to-tokyo-shinkansen";
const TITLE = "京都到东京新干线 2026：票价、车程时间与购票方式";
const H1 = "京都到东京新干线 2026：车程时间、票价与购票方式";
const DESC =
  "京都到东京新干线：希望号 2 小时 12 分、每小时 8–12 班，指定席 ¥13,970、自由席 ¥13,320，JR Pass 另付 ¥4,960。";

const OWN_ISO = "2026-10-29";
const OWN = dateLabel(OWN_ISO, LOCALE);
const NOW = dateLabel("2026-11-11", LOCALE);
const TODAY_ISO = "2026-11-27";
const TODAY = dateLabel(TODAY_ISO, LOCALE);

const FARE_SOURCES = [
  { label: "smartEX 票价（JR东海）", href: "https://smart-ex.jp/en/product/plan/service/" },
  { label: "JR东海列车运行信息", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
  { label: "JR东海票价调整公告", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
  { label: "JAPAN RAIL PASS 希望号与瑞穗号专用车票", href: "https://japanrailpass.net/en/use/special-ticket/" },
  { label: "JR东海超大行李说明", href: "https://global.jr-central.co.jp/en/info/oversized-baggage/" },
];

const STATION_NOZOMI = "¥14,170";
const NOZOMI_RESERVED = "¥13,970";
const HIKARI_RESERVED = "¥13,650";
const NON_RESERVED = "¥13,320";
const NOZOMI_TICKET = "¥4,960";
const JR_PASS_7 = "¥50,000";
const BAGGAGE_FEE = "¥1,000";

const SHINKANSEN_URL = klookFor(shinkansenKyotoTokyo.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);
const PRIVATE_TRANSFER_URL = klookFor(tokyoPrivateAirportTransfer.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const nozomiAllReservedPeriods = [
  "2026 年 4 月 24 日至 5 月 6 日（黄金周）",
  "2026 年 8 月 7 日至 16 日（盂兰盆节）",
  "2026 年 9 月 18 日至 23 日",
  "2026 年 10 月 10 日至 12 日",
  "2026 年 11 月 21 日至 23 日",
  "2026 年 12 月 25 日至 2027 年 1 月 5 日",
  "2027 年 1 月 9 日至 11 日",
  "2027 年 3 月 20 日至 22 日",
];

const trainTypeRows = [
  {
    train: "结论：乘坐希望号",
    time: "大多数车次 2 小时 12 分，不用换乘",
    count: "白天每小时 8–12 班",
    reserved: `${NOZOMI_RESERVED}（车站购票 ${STATION_NOZOMI}）`,
    nonReserved: NON_RESERVED,
    pass: `光号无需另付费用；希望号另购 ${NOZOMI_TICKET} 专用车票`,
  },
  {
    train: "希望号",
    time: "2 小时 7 分至 2 小时 15 分",
    count: "每天 151 班；07:00–21:00 每小时 8–12 班",
    reserved: NOZOMI_RESERVED,
    nonReserved: `${NON_RESERVED}（全车指定席的高峰期没有自由席）`,
    pass: `需另付费：每次乘坐购买 ${NOZOMI_TICKET} 的希望号与瑞穗号专用车票`,
  },
  {
    train: "光号",
    time: "2 小时 24 分至 2 小时 51 分",
    count: "每天 30 班；每小时 2 班",
    reserved: HIKARI_RESERVED,
    nonReserved: NON_RESERVED,
    pass: "可以使用，指定座位免费",
  },
  {
    train: "回声号",
    time: "3 小时 38 分",
    count: "每天 12 班；每小时 1 班（08:10–19:10）",
    reserved: HIKARI_RESERVED,
    nonReserved: NON_RESERVED,
    pass: "可以使用，指定座位免费；每站都停",
  },
];

const stationRows = [
  {
    item: "开往东京的新干线站台",
    answer: "11 号与 12 号站台",
    detail:
      "在 JR 西日本 2026 年 11 月 11 日的京都站时刻表上，开往东京的列车全部在 11 号或 12 号站台发车。你乘坐的车次在哪个站台，以电子显示屏和车票为准；JR 西日本说明站台可能在当天变更",
    source: `timetable.jr-odekake.net，${NOW}`,
  },
  {
    item: "从车站南侧街道进站",
    answer: "八条口",
    detail:
      "新干线候车大厅位于八条（南）侧。名为“新干线中央口”的检票口通往八条口，并不是在来线北侧的“中央口”，这是最常走错的地方",
    source: `kyoto.travel（京都市观光协会），${NOW}`,
  },
  {
    item: "从车站北侧街道进站",
    answer: "中央口（京都塔一侧）",
    detail:
      "市巴士总站就在北侧中央口前、京都塔脚下。从这里出发，拖着行李穿过车站走到新干线检票口，需要预留几分钟",
    source: `kyoto.travel，${NOW}`,
  },
  {
    item: "从 JR 在来线（京都线、湖西线、奈良线）换乘",
    answer: "中央换乘检票口",
    detail:
      "“JR 线换乘（中央换乘）”检票口不用出站即可从在来线站台走到新干线，检票口外就有手扶梯、电梯和多功能卫生间",
    source: `kyoto.travel，${NOW}`,
  },
  {
    item: "从地铁乌丸线过来",
    answer: "地铁南检票口 → 八条一侧",
    detail:
      "新干线候车大厅的八条一侧通道，包括大厅里侧的八条东口，都经地下通往乌丸线的南检票口",
    source: `kyoto.travel，${NOW}`,
  },
];

const bookingRows = [
  {
    item: "指定席车票开售时间",
    answer: "乘车日前 1 个月",
    detail:
      "JR东海的行李说明写明，附超大行李放置区的座位与“其他指定席一样”提前 1 个月开售；JAPAN RAIL PASS 的希望号与瑞穗号专用车票“从乘车日前 1 个月起至乘车当天”发售",
    source: `global.jr-central.co.jp 与 japanrailpass.net，${NOW}`,
  },
  {
    item: "2026–27 年剩余的希望号全车指定席日期",
    answer: "2026 年 12 月 25 日至 2027 年 1 月 5 日；2027 年 1 月 9 日至 11 日；2027 年 3 月 20 日至 22 日",
    detail:
      "这些日期希望号完全没有自由席车厢，无法当天买自由席车票乘坐希望号。光号与回声号照常设有自由席，但 JR东海提醒“可能非常拥挤”",
    source: `railway.jr-central.co.jp/nozomi 与 global.jr-central.co.jp/en/nozomi，${OWN}`,
  },
  {
    item: "三边之和 160 cm 以内的行李",
    answer: "无需预约，不收费",
    detail: "放在头顶行李架、脚边或车厢连接处的行李放置区",
    source: `JR东海行李说明，${NOW}`,
  },
  {
    item: "161–250 cm 的行李",
    answer: "预订附超大行李放置区的座位",
    detail: `价格与普通车厢指定席或绿色车厢座位相同；可在售票处、指定席售票机（“附超大行李放置区的座位”）或网上预订。没有预订就上车，需付含税 ${BAGGAGE_FEE} 的费用`,
    source: `JR东海行李说明，${NOW}`,
  },
  {
    item: "超过 250 cm 的行李",
    answer: "不能带上车",
    detail: "JR东海规定三边之和超过 250 cm 的行李“不能带入车厢”，请改用快递寄送",
    source: `JR东海行李说明，${NOW}`,
  },
];

const routeRows = [
  {
    item: "京都 → 东京最短车程",
    value: "2 小时 7 分；大多数希望号 2 小时 12 分",
    detail:
      "在 JR东海 2026 年 11 月 27 日的列车运行信息中，京都开往东京的希望号全部需要 2 小时 7 分至 2 小时 15 分，不用换乘；当天最快的是末班车希望号 64 号，21:38 → 23:45",
    source: `traininfo.jr-central.co.jp，${TODAY}`,
  },
  {
    item: "每天从京都开往东京的车次",
    value: "193 班：希望号 151、光号 30、回声号 12",
    detail:
      "JR东海 2026 年 11 月 27 日的列表，只计算直达东京的车次。即 07:00 至 21:00 每小时 8–12 班希望号、每小时 2 班光号与 1 班回声号；回声号每站都停，比希望号慢约 1 个半小时",
    source: `traininfo.jr-central.co.jp，${TODAY}`,
  },
  {
    item: "开往东京的首班车与末班车",
    value: "06:14 与 21:38（23:45 到达）",
    detail:
      "开往东京的首班车是 06:14 的希望号 230 号，末班车是 21:38 的希望号 64 号，23:45 到达东京。当晚更晚的东行列车只开到名古屋",
    source: `traininfo.jr-central.co.jp，${TODAY}；timetable.jr-odekake.net，${NOW}`,
  },
  {
    item: "这条线路出售的座位等级",
    value: "普通车厢自由席、普通车厢指定席、绿色车厢指定席",
    detail:
      "Klook 京都到东京线路页面列出的三种车票。东海道新干线没有 Gran Class，那是东北与北陆新干线的车厢。JR东海的新等级 Supreme Class 将在这条线路上推出，等级高于绿色车厢，但线路页面目前还没有出售",
    source: `klook.com 铁路页面，${OWN}`,
  },
  {
    item: "终点站之前的东京地区车站",
    value: "依次为新横滨、品川、东京",
    detail:
      "根据 JR东海的车站列表，东行的停靠顺序为：京都、米原、岐阜羽岛、名古屋、三河安城、丰桥、滨松、挂川、静冈、新富士、三岛、热海、小田原、新横滨、品川、东京。最后三站在哪里下车需要认真选择，详见下文",
    source: `global.jr-central.co.jp 车站列表，${OWN}`,
  },
  {
    item: "改从新大阪出发",
    value: "同样的列车也往反方向行驶",
    detail:
      "以整条线路来看，JR东海表示“从东京站到新大阪只需 2 小时 21 分”。京都是新大阪的前一站，所以从京都出发只比从大阪出发短约 15 分钟",
    source: `JR东海 Shinkansen Perfect Guide，${OWN}`,
  },
];

const priceRows = [
  {
    item: "希望号普通车厢指定席",
    price: NOZOMI_RESERVED,
    covers:
      "JR东海 smartEX 成人 1 名、单程、平常期的价格。按 smartEX 的季节规则，淡季便宜 ¥200，旺季更贵",
    source: `smart-ex.jp 票价表 "As of April 1, 2025"，${TODAY}`,
  },
  {
    item: "希望号普通车厢指定席（车站购票）",
    price: STATION_NOZOMI,
    covers:
      "JR东海东京、品川至京都希望号平常期的标准票价，在售票机或 JR 售票处购买。JR东海与 JR 西日本已宣布，从 2027 年 7 月 1 日起购买的车票，这一区间希望号指定席费用上调 ¥700；自由席费用不变",
    source: `jr-central.co.jp 2023 年 5 月 30 日与 2026 年 10 月 16 日公告，${TODAY}`,
  },
  {
    item: "光号或回声号普通车厢指定席",
    price: HIKARI_RESERVED,
    covers:
      "较慢车次的同等座位，比希望号便宜 ¥320。JAPAN RAIL PASS 不用另购车票即可乘坐的就是这些车次",
    source: `smart-ex.jp 票价表 "As of April 1, 2025"，${NOW}`,
  },
  {
    item: "普通车厢自由席",
    price: NON_RESERVED,
    covers:
      "可乘坐任何设有自由席车厢的希望号、光号或回声号，有空位就坐。在本页下方列出的高峰期，希望号全车指定席，无法选择自由席",
    source: `smart-ex.jp 票价表 "As of April 1, 2025"，${NOW}`,
  },
  {
    item: "绿色车厢指定席",
    price: "高于普通车厢指定席；作为单独等级出售",
    covers:
      "Klook 京都到东京线路页面出售这条线路的全部三个等级。绿色车厢更安静、更宽敞；看富士山的靠窗座位字母也会不同，JR东海在绿色车厢推荐的是 D 座而不是 E 座",
    source: `klook.com 铁路页面与 JR东海 Shinkansen Perfect Guide，${OWN}`,
  },
  {
    item: "JR Pass 持有人专用的希望号与瑞穗号车票",
    price: `东京至京都 ${NOZOMI_TICKET}`,
    covers:
      "JAPAN RAIL PASS 持有人每次乘坐希望号都必须购买的专用车票。JR 说明“绿色车厢、普通车厢指定席与普通车厢自由席价格相同”，并且“从乘车日前 1 个月起至乘车当天”发售",
    source: `japanrailpass.net，${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS 普通车厢",
    price: `7 天 ${JR_PASS_7}、14 天 ¥80,000、21 天 ¥100,000（网上购买）`,
    covers:
      "通过海外旅行社购买兑换券则为 ¥53,000、¥84,000、¥105,000。绿色车厢网上购买为 ¥70,000、¥110,000、¥140,000，兑换券为 ¥74,000、¥116,000、¥147,000",
    source: `japanrailpass.net 官方价格页面，${OWN}`,
  },
  {
    item: "超大行李，未预订座位",
    price: `含税 ${BAGGAGE_FEE}`,
    covers:
      "携带三边之和超过 160 cm 的行李、却没有预订附行李放置区的指定席上车时，JR 收取的费用。座位本身不另收费，详见下文行李部分",
    source: `JR东海行李说明，${OWN}`,
  },
];

const compareRows = [
  {
    option: "提前购买一张普通车厢指定席",
    cost: `希望号 ${NOZOMI_RESERVED}，光号 ${HIKARI_RESERVED}（smartEX）`,
    gets: "2 小时直达列车上有自己的座位，离开酒店前就把行李问题安排好。",
    pick: "默认选择，京都的最后一个早上更是如此：你带着整趟旅程买的东西，要坐一班不能错过的列车。",
  },
  {
    option: "普通车厢自由席，当天直接乘车",
    cost: `${NON_RESERVED}（smartEX）`,
    gets: "到站台时，任何设有自由席车厢的车次都可以乘坐。",
    pick: "平日只带随身行李时可以这样做。下方的高峰期就不适合，因为希望号完全没有自由席车厢。",
  },
  {
    option: "用 JAPAN RAIL PASS 乘光号或回声号",
    cost: `网上购买 ${JR_PASS_7}，兑换券 ¥53,000`,
    gets: "这一程无需另付费用，到了东京还能乘山手线和成田特快。光号（JR东海 11 月 27 日列表为 2 小时 24 分至 2 小时 51 分）与回声号（3 小时 38 分）都是直达。",
    pick: "只适合同一周已经安排了广岛、金泽或东北的行程。京都到东京单程加上东京到京都单程，远远不到 ¥50,000。",
  },
  {
    option: "JAPAN RAIL PASS 加希望号专用车票",
    cost: `${JR_PASS_7} 加这一程的 ${NOZOMI_TICKET}`,
    gets: "既有周游券，也能坐快车：约 2 小时 12 分，而光号要 2 小时 24 分至 2 小时 51 分。",
    pick: "如果这一程之后要赶飞机，或在东京有定时预约，值得加购。无论坐绿色车厢、指定席还是自由席，JR 定的价格都一样。",
  },
  {
    option: "夜间巴士",
    cost: "只需新干线票价的一小部分，约 7 到 8 小时",
    gets: "两座城市之间最便宜的交通方式，在车上过夜。",
    pick: "带着满满的行李箱前往东京时很少适合。东京到京都的页面有完整比较，这里不再重复那张表。",
  },
];

const buyRows = [
  {
    way: "结论：大多数游客选 smartEX",
    price: `希望号指定席 ${NOZOMI_RESERVED}，比车站价 ${STATION_NOZOMI} 便宜 ¥200`,
    when: "提前购票，在座位图上选座，改签免费；想在出发前付款，可以选 Klook",
    board: "QR 车票或已绑定的 IC 卡",
  },
  {
    way: "smartEX（JR东海官方网站与应用程序，有英文）",
    price: `希望号 ${NOZOMI_RESERVED}；光号或回声号 ${HIKARI_RESERVED}；自由席 ${NON_RESERVED}`,
    when: "从 1 年前早上 5:30 起（1 个月前确定车次与座位）至发车前 4 分钟。发车前改签免费；退票手续费 ¥320",
    board: "用 QR 车票或 IC 卡直接通过新干线检票口",
  },
  {
    way: "车站售票机或 JR 售票处",
    price: `希望号指定席 ${STATION_NOZOMI}，平常期`,
    when: "指定席车票在乘车日前 1 个月开售；JR Pass 持有人也在这里预订座位、购买希望号与瑞穗号专用车票",
    board: "纸质车票通过检票口",
  },
  {
    way: "Klook（京都到东京线路页面）",
    price: "所选日期的价格以商品页面为准（本页不列出）",
    when: "出发前用中文购票；线路页面出售自由席、普通车厢指定席与绿色车厢指定席",
    board: "按照商品页面上的取票或乘车说明",
  },
];

const arrivalRows = [
  {
    station: "结论：东京站",
    forWho: "大多数游客；如果要去羽田、涩谷或台场，改在品川下车",
    why: "终点站，不用担心坐过站；品川是前一站",
    transfer: "见下面两行",
    source: `JR东海车站列表，${OWN}`,
  },
  {
    station: "东京站",
    forWho: "丸之内、银座、日本桥、浅草、上野，以及从成田出境的人",
    why: "终点站，谁都不用留意下车站。成田特快和丸之内线、山手线、中央线、京叶线都在同一座车站建筑里发车，东海道新干线站台也在站内",
    transfer: "成田特快；JR 山手线、中央线、京叶线；东京地铁丸之内线",
    source: `JR东海车站列表，${OWN}`,
  },
  {
    station: "品川",
    forWho: "涩谷、目黑、台场、横滨，以及从羽田出境的人",
    why: "终点站前一站，可以省去进东京站的最后一段和站内人潮。前往羽田的京急线从同一个车站发车，乘山手线几站就到涩谷",
    transfer: "JR 山手线；京急线往羽田机场",
    source: `JR东海车站列表，${OWN}`,
  },
  {
    station: "新横滨",
    forWho: "横滨、港未来、镰仓等东京西南方向的区域",
    why: "东京前两站。如果当晚住横滨而不是东京，在这里下车就不用带着行李折返将近一小时",
    transfer: "前往横滨市区的在来线",
    source: `JR东海车站列表，${OWN}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "京都到东京新干线要坐多久？",
    a: `乘最快的希望号约 2 小时 12 分，不用换乘；在 JR东海 2026 年 11 月 27 日的京都发车列表中，所有希望号都需要 2 小时 7 分至 2 小时 15 分。光号需要 2 小时 24 分至 2 小时 51 分，每站都停的回声号需要 3 小时 38 分。白天每小时有 8–12 班希望号，另有 2 班光号与 1 班回声号；开往东京的首班车 06:14 发车，末班车 21:38 发车、23:45 到达。核对于 ${TODAY}；车程因车次与日期略有不同。`,
  },
  {
    q: "京都到东京新干线票价多少？",
    a: `在 JR东海 smartEX 上，单程希望号指定席 ${NOZOMI_RESERVED}，光号或回声号指定席 ${HIKARI_RESERVED}，自由席 ${NON_RESERVED}；以上为成人 1 名、平常期，来自 smartEX 的票价表（"As of April 1, 2025"），核对于 ${TODAY}。在车站售票机或售票处购买，希望号指定席为 JR东海的标准票价 ${STATION_NOZOMI}。指定席淡季便宜 ¥200，旺季贵 ¥200–¥400。JR东海已宣布，从 2027 年 7 月 1 日起购买的车票，东京至京都希望号指定席费用上调 ¥700；自由席不变。`,
  },
  {
    q: "从京都乘希望号可以用 JR Pass 吗？",
    a: `需要另付费用：JAPAN RAIL PASS 持有人在京都与东京之间每乘一次希望号，都要购买 ${NOZOMI_TICKET} 的希望号与瑞穗号专用车票；光号与回声号无需另付费用，指定座位也免费。希望号专用车票从乘车日前 1 个月开售，绿色车厢、指定席、自由席价格相同（japanrailpass.net，核对于 ${TODAY}）。只看这一程，买周游券并不划算：7 天普通车厢周游券网上购买 ${JR_PASS_7}，兑换券 ¥53,000，而 smartEX 单程票价是 ${NOZOMI_RESERVED}。同一周还要去广岛、金泽或东北时，才开始划算。`,
  },
  {
    q: "京都到东京新干线需要提前购票吗？",
    a: `在高峰期、带着大件行李，或在东京要赶飞机、已订好住宿时，需要提前购票；其他日子买 ${NON_RESERVED} 的自由席也可以，京都每小时有 8–12 班希望号。JR东海规定的高峰期希望号全车指定席（2026–27 年剩余日期：2026 年 12 月 25 日至 2027 年 1 月 5 日；2027 年 1 月 9 日至 11 日；2027 年 3 月 20 日至 22 日）；161–250 cm 的行李需要预订附超大行李放置区的指定席，这个座位包含在车票里，未预订就上车要付 ${BAGGAGE_FEE}。车站的指定席车票在乘车日前 1 个月开售；smartEX 最早可提前 1 年申请，发车前改签免费。核对于 ${TODAY}。`,
  },
  {
    q: "从京都到东京，坐哪一侧能看到富士山？",
    a: `行进方向的左侧：普通车厢订 E 座，绿色车厢订 D 座。JR东海的 Shinkansen Perfect Guide 写道“想看富士山的最佳景色，普通车厢选 E 座，绿色车厢选 D 座”；座位字母固定在车厢上，所以从京都往东走时，这一侧的窗户在你左边。这个方向富士山出现得晚，在静冈、新富士、三岛一带，也就是全程的最后三分之一，而且常常被云遮住。核对于 ${OWN}。`,
  },
];

const tripPrepItems = [
  withKlookLocale(kyotoToTokyoTripPrep[0], LOCALE, {
    label: "东京地铁通票（24／48／72 小时）",
    ctaLabel: "查看地铁通票 →",
    why: "新干线车票到检票口就结束了。这张通票可在抵达后的 24、48 或 72 小时内乘坐东京地铁与都营地铁全线。",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[1], LOCALE, {
    label: "东京新宿居酒屋串吧夜间团",
    ctaLabel: "查看新宿夜间行程 →",
    why: "下午三四点前从京都上希望号，天黑前就到东京；新宿离东京站或品川只有几站。3 小时的拼团夜间行程含餐饮，抵达当天就能安排东京的第一个晚上。",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[2], LOCALE, {
    label: "东京站、丸之内周边酒店",
    ctaLabel: "在 Klook 查看酒店价格 →",
    why: "东海道新干线在东京站内到站，住丸之内的酒店，下车后步行就能到，不用在一天结束时带着行李穿过半个城市。",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[3], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM 方案 →",
    why: "你的座位是手机上的 QR 码或订票记录，在品川还是东京站下车也要在车上决定，两件事都需要在离开京都前就能上网。",
  }),
  withKlookLocale(luggageDeliveryCards.kyotoToTokyo, LOCALE, {
    label: "行李配送（东京酒店 ⇔ 成田／羽田）",
    ctaLabel: "查看酒店 ⇔ 机场行李配送 →",
    why: "多数京都到东京的行程会在一两天后从成田或羽田离开。按件预订，行李从东京酒店送到机场，最后一天观光就不用带着行李走。",
  }),
];

const stayAreas = [
  withKlookLocale(kyotoToTokyoArrivalStayAreas[0], LOCALE, {
    area: "东京站、丸之内",
    why: "东海道新干线在车站建筑内到站，下车后上楼即可，不用带着行李穿过城市；回国当天，成田特快也从同一车站的地下发车。",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[1], LOCALE, {
    area: "银座",
    why: "离东京站只有一站丸之内线，从羽田乘京急与都营直通列车不用换乘就能到东银座；如果京都这一程是整趟旅行的倒数第二段，就选这里。",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[2], LOCALE, {
    area: "新宿",
    why: "不是新干线停靠站，但从东京站乘中央线直达，也是中央线、小田急线、京王线的起点；如果还要在东京住几天，而不是只住一晚就赶飞机，适合住这里。",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[3], LOCALE, {
    area: "涩谷",
    why: "从终点站前一站的品川乘山手线两站就到，在品川提前下车，就不用从东京站再折返。",
  }),
];

const tourPicks = [
  withKlookLocale(tokyoPrivateAirportTransfer, LOCALE, {
    title: "羽田、成田 ⇄ 东京包车接送",
    desc: "按酒店地址而不是车站预订车辆与司机，两个机场都可以，司机会跟踪航班；列明 24 小时服务，有 7 座与 10 座车型",
  }),
  withKlookLocale(tokyoSharedAirportTransfer, LOCALE, {
    title: "成田、羽田 → 东京拼车接送",
    desc: "适合一两位旅客的按座位预订方式，送到东京市中心的地址，不用包下整辆车",
  }),
  withKlookLocale(naritaLimousineBus, LOCALE, {
    title: "成田机场 – 东京利木津巴士",
    desc: "往返成田机场三个航站楼与东京酒店、车站各站点的机场利木津巴士，凭 QR 码上车，无需纸质车票",
  }),
  withKlookLocale(hanedaLimousineBus, LOCALE, {
    title: "羽田机场 – 东京利木津巴士",
    desc: "同一家公司从羽田三个航站楼发车的路线，目的地包括新宿、池袋与迪士尼度假区",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "京都到东京新干线" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function SourcesLine({ what }: { what: string }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      <strong>最后核对：{TODAY_ISO}</strong>（{what}）。官方页面：
      {FARE_SOURCES.map((s, i) => (
        <span key={s.href}>
          <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>{s.label}</a>
          {i < FARE_SOURCES.length - 1 ? "、" : "。"}
        </span>
      ))}
    </p>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : c === 1 ? styles.tdPrice : undefined}
                    style={{ fontSize: c === 0 ? "0.88rem" : c === row.length - 1 && head.length === 4 ? "0.82rem" : "0.85rem" }}
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

export default function ZhCnKyotoToTokyoShinkansenPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG[LOCALE] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            从京都站出发：比较希望号、光号与回声号，比较 smartEX、车站与 Klook 的价格，以及在东京哪一站下车。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "smartEX 票价（注明核对日期）", "京都站 11–12 号站台", "东京、品川或新横滨"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>京都 → 东京</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最短车程</p>
                <p className={styles.verdictStatValue}>希望号 2 小时 12 分（最快 2 小时 7 分），不用换乘</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>指定席（smartEX）</p>
                <p className={styles.verdictStatValue}>希望号 {NOZOMI_RESERVED}，光号 {HIKARI_RESERVED}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>开往东京的末班车</p>
                <p className={styles.verdictStatValue}>21:38，23:45 到达</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>持 JR Pass</p>
                <p className={styles.verdictStatValue}>光号免费，希望号 {NOZOMI_TICKET}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>京都到东京新干线</strong>乘的是东海道新干线希望号（Nozomi），按 JR东海 {TODAY} 的列车运行信息，
              不用换乘<strong>约 2 小时 12 分</strong>（最快 2 小时 7 分）。在 JR东海的 smartEX 上，希望号单程
              <strong>指定席 {NOZOMI_RESERVED}</strong>、<strong>自由席 {NON_RESERVED}</strong>（成人、平常期；车站购票指定席
              {STATION_NOZOMI}）。京都 07:00 至 21:00 <strong>每小时有 8–12 班希望号开往东京</strong>，每天 151 班，另有每小时
              2 班光号（Hikari）与 1 班回声号（Kodama）。
            </p>
            <p className={styles.verdictText}>
              持 <strong>JAPAN RAIL PASS</strong> 乘光号与回声号无需另付费用，希望号每次乘坐需要一张
              <strong>{NOZOMI_TICKET}</strong> 的希望号与瑞穗号专用车票（japanrailpass.net，{TODAY}）。列车从京都站八条（南）侧的
              11 号与 12 号站台发车，开往东京的末班车是 21:38。本页讲的是往东京方向；反方向请看
              <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
                东京到京都交通（英文）
              </Link>
              。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看京都 → 东京新干线车票 →
              </KlookLink>
              <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 JAPAN RAIL PASS 价格 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="与新干线一起预订"
          heading="同一天要订的：地铁通票、东京夜间行程、酒店、eSIM"
          intro="列车在东京站内到站。之后几天用的地铁通票、第一晚的行程、离站台近的酒店、途中上网用的 eSIM，以及去机场那天的行李配送，都不包含在新干线车票里。"
          items={tripPrepItems}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概览</span>
          <h2 className={styles.sectionTitle}>京都到东京的新干线，和东京到京都有什么不同？</h2>
          <p className={styles.bodyText}>
            列车一样，线路也一样，不同的是周边的一切。往西走时，你通常从酒店附近的车站出发，到达唯一的终点站，开车约 40
            分钟后富士山出现在右侧。往东走时，你是在京都住宿的最后一个早上出发，站台在一座很大的车站的另一侧，行李比来时更多；
            到达的城市有三个新干线车站，而通常只有一个最适合你。
          </p>
          <p className={styles.bodyText}>
            所以本页围绕只在这个方向才会遇到的四个决定来写：<strong>京都站走哪个检票口、哪个站台</strong>、
            <strong>退房后行李怎么处理</strong>、<strong>反方向时富士山在哪一侧</strong>，以及
            <strong>在东京、品川还是新横滨下车</strong>。买哪种车票两个方向都一样，下文会说明；新干线与巴士的比较放在往西的页面，
            这里只放链接，不重复那张表。
          </p>
          <p className={styles.bodyText}>
            最先需要知道的一点：往东京的列车结束得比很多人想的早。JR 西日本 2026 年 11 月 11 日的京都站时刻表显示，开往东京的
            末班车 <strong>21:38</strong> 发车，23:45 到达东京。如果出发当天在东京还要赶飞机，这个时间比票价更能决定你的安排。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>列车</span>
          <h2 className={styles.sectionTitle}>京都到东京新干线要坐多久？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            希望号约 2 小时 12 分，光号 2 小时 24 分至 2 小时 51 分，回声号 3 小时 38 分，全部直达，不用换乘。下表的车程与
            班次涵盖 JR东海 2026 年 11 月 27 日京都发车列表中所有开往东京的列车，票价是 JR东海 smartEX 成人 1 名平常期的价格，
            均核对于 {TODAY}。
          </p>
          <Table
            head={["车次", "京都 → 东京", "京都发车班次", "指定席（smartEX）", "自由席（smartEX）", "持 JR Pass"]}
            rows={trainTypeRows.map((r) => [r.train, r.time, r.count, r.reserved, r.nonReserved, r.pass])}
          />
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
            <strong>大件行李：</strong>三边之和 161–250 cm 的行李箱，需要随车票预订“附超大行李放置区的座位”，不另收费；没有
            预订就上车，JR东海收取含税 {BAGGAGE_FEE}。160 cm 以内无需预订，超过 250 cm 不能带上车。
          </p>
          <SourcesLine what="JR东海京都发车列表的车程与班次、smartEX 票价、JR Pass 专用车票与 JR东海行李规定" />
          <p className={styles.bodyText} style={{ margin: "1rem 0" }}>
            线路的其他信息，包括首末班车与东京之前的停靠站：
          </p>
          <Table
            head={["项目", "内容", "说明", "来源与核对日期"]}
            rows={routeRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            新干线车票的基本规则，包括由两部分组成的票价、座位等级、周游券能坐和不能坐的车次，请看
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              新干线攻略（英文）
            </Link>
            ；
            <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
              东京到京都交通（英文）
            </Link>
            是这段行程的反方向，并比较了夜间巴士与列车的价格。如果从大阪出发，
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen" style={linkStyle}>
              东京到大阪新干线票价与时间攻略（英文）
            </Link>
            列出了新大阪各座位等级的票价。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              京都 → 东京车票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>京都到东京新干线票价多少？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            单程希望号普通车厢指定席 <strong>{NOZOMI_RESERVED}</strong>，光号或回声号 <strong>{HIKARI_RESERVED}</strong>，
            自由席 <strong>{NON_RESERVED}</strong>。这是 JR东海 smartEX 成人 1 名平常期的价格，来自标注
            &ldquo;As of April 1, 2025&rdquo; 的票价表，并于 {TODAY} 再次核对。在车站售票机或售票处，希望号指定席为
            <strong>{STATION_NOZOMI}</strong>。周游券持有人的各行金额是 japanrailpass.net 的官方价格。
          </p>
          <Table
            head={["车票", "价格", "说明", "来源与核对日期"]}
            rows={priceRows.map((r) => [r.item, r.price, r.covers, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            价格可能调整，购票前请再确认。smartEX 价格为成人 1 名单程；按 smartEX 的季节规则，淡季指定席便宜 ¥200，旺季更贵。
            本页不列 Klook 价格：Klook 的价格因日期而异，请在商品页面查看你出发日期的价格。
          </p>
          <SourcesLine what="smartEX 票价表、JR东海票价公告与 japanrailpass.net" />
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>购票</span>
          <h2 className={styles.sectionTitle}>京都到东京新干线车票在哪里买？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            平常票价最低的是 JR东海的 smartEX：同一个希望号座位，smartEX {NOZOMI_RESERVED}，车站 {STATION_NOZOMI}。想在出发前
            付好款，可以通过 Klook 购买。车站售票机与售票处是 JR Pass 持有人预订座位的地方，也是任何人当天购票的地方。
          </p>
          <Table
            head={["购票渠道", "价格（成人、平常期）", "购票时间与改签", "进站方式"]}
            rows={buyRows.map((r) => [r.way, r.price, r.when, r.board])}
          />
          <SourcesLine what="smartEX 购票规则、车站票价与 JR Pass 专用车票；Klook 座位等级来自其铁路页面，2026 年 10 月 29 日" />
          <p className={styles.bodyText}>
            简短回答没有提到的几点：在下文的高峰期，希望号全车指定席，日期一确定就应购票；smartEX 发车前改签免费，发车前退票
            收 ¥320；超过 160 cm 的行李需要附超大行李放置区的座位，JR东海在售票处、指定席售票机与网上出售。各类车票的用法请看
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              新干线攻略（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看京都 → 东京座位 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比较</span>
          <h2 className={styles.sectionTitle}>从京都乘希望号可以用 JR Pass 吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            需要另付费用：周游券持有人每次乘希望号去东京，都要购买 <strong>{NOZOMI_TICKET}</strong> 的希望号与瑞穗号专用车票；
            光号与回声号可以使用，指定座位也免费。不过只为这一程买周游券并不划算。7 天普通车厢
            <strong>JAPAN RAIL PASS</strong> 网上购买 {JR_PASS_7}，在海外买兑换券 ¥53,000，而 smartEX 希望号单程票价是
            {NOZOMI_RESERVED}，就算两座城市往返也不够。决定是否划算的，是这一周的其他行程，以及你在东京乘 JR 的次数。
          </p>
          <Table
            head={["选择", "费用", "能得到什么", "适合的情况"]}
            rows={compareRows.map((r) => [r.option, r.cost, r.gets, r.pick])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            JR 自己写明的规定是：持周游券乘坐希望号或瑞穗号，需要一张只发给 JAPAN RAIL PASS 持有人的专用车票，并且
            &ldquo;绿色车厢、普通车厢指定席与普通车厢自由席价格相同&rdquo;。东京至京都这张车票为 <strong>{NOZOMI_TICKET}</strong>，
            &ldquo;从乘车日前 1 个月起至乘车当天&rdquo;在指定席售票机、JR 售票处与旅游服务中心发售。
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass 价格攻略（英文）
            </Link>
            用 2026 年 10 月的价格对照你自己的行程；
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" style={linkStyle}>
              东京、京都、大阪 7 天行程（英文）
            </Link>
            是周游券最常划算的行程安排。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS（7／14／21 天）→
            </KlookLink>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              改看单程车票价格 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>车窗风景</span>
          <h2 className={styles.sectionTitle}>从京都到东京，坐哪一侧能看到富士山？</h2>
          <p className={styles.bodyText}>
            行进方向的<strong>左侧</strong>，要订的座位字母和反方向一样。JR东海的 Shinkansen Perfect Guide 说得很直接：
            &ldquo;想看富士山的最佳景色，普通车厢选 E 座，绿色车厢选 D 座。&rdquo;它没有说左边还是右边，也不需要说。座位字母
            固定在车厢上，与列车朝哪个方向开无关，所以 E 座和 D 座的窗户每一趟都朝向列车的同一侧。从东京往西，那一侧在你右边；
            从京都往东，就在你左边。
          </p>
          <p className={styles.bodyText}>
            出现的时间也正好相反。往西走，富士山出现得早；往东走，出现得晚。按 JR东海的停靠顺序，富士山在
            <strong>静冈、新富士、三岛</strong>一带，从京都出发是在全程的最后三分之一，而不是开头。想睡觉的话，早点睡。
          </p>
          <p className={styles.bodyText}>
            还有一点是订座无法解决的：富士山经常看不到。晴朗干燥的冬季早晨机会最大，闷热有雾的夏季下午机会最小。靠窗座位值得订，
            但不值得为了要看天气的景色多付绿色车厢的钱。核对于 {OWN}。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>离开京都</span>
          <h2 className={styles.sectionTitle}>京都站开往东京的新干线在几号站台？</h2>
          <p className={styles.bodyText}>
            <strong>11 号或 12 号站台。</strong>在 JR 西日本 2026 年 11 月 11 日的京都站时刻表上，开往东京的列车全部在这两个
            站台之一发车。站台位于车站<strong>八条（南）侧</strong>的新干线专用检票口内，与北侧中央口、市巴士总站和京都塔在相反
            一侧。走哪个检票口，取决于你怎么到车站：
          </p>
          <Table
            head={["你从哪里来", "走这里", "需要知道的", "来源与核对日期"]}
            rows={stationRows.map((r) => [r.item, r.answer, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            为什么值得列一张表而不是一句备注：如果你在京都的最后一个早上是在北侧结束的，比如锦市场、地铁乌丸线或大多数市巴士，
            那么在到达检票口之前，你要穿过日本最繁忙的候车大厅之一，走上好几分钟。带着行李、又是出发当天，请把这段时间算进去。
          </p>
          <p className={styles.bodyText}>
            行李本身有三种处理方法：退房后寄存在酒店行李房，去车站途中再取；带到京都站，使用投币储物柜或人工寄存服务；或者用
            宅急便快递寄到东京的酒店。行李多到双手拿不下的人通常选快递，也完全不用预订新干线的超大行李座位。费用与截止时间因
            酒店和柜台而异，所以本页不列出；请在前一晚问酒店前台，并确认东京的酒店可以代收。
          </p>
          <p className={styles.bodyText}>
            那天早上在京都市内搭哪路巴士、哪条地铁，以及只用半天是否值得买一日券，请看
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>
              京都交通攻略（英文）
            </Link>
            与
            <Link href="/guides/transport/kyoto-subway-bus-pass" style={linkStyle}>
              京都地铁与巴士一日券攻略（英文）
            </Link>
            ；如果这班车结束的是短暂的京都之行，
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>
              京都 3 天行程（英文）
            </Link>
            可以帮你安排之前几天。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>到达</span>
          <h2 className={styles.sectionTitle}>该在东京站、品川还是新横滨下车？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            离你的住宿或机场最近的那一站。按 JR东海的车站列表，线路依次经过<strong>新横滨、品川、东京</strong>，三个选择中有两个
            在终点站之前，所以提前下车往往离目的地更近。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["下车站", "适合谁", "原因", "换乘线路", "来源与核对日期"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {arrivalRows.map((row) => (
                    <tr key={row.station}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.station}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.forWho}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.transfer}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最后核对：{OWN_ISO}</strong>（东海道新干线停靠顺序）。官方页面：
            <a href="https://global.jr-central.co.jp/en/" target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>
              JR东海（global.jr-central.co.jp）
            </a>
            。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            另外还有一点要考虑：终点站最省心，正是因为不会坐过站。如果你很累、行李很多或带着孩子，即使品川更近，在东京站下车也
            没有错。各区域的比较请看
            <Link href="/guides/attractions/where-to-stay-in-tokyo" style={linkStyle}>
              东京住宿区域攻略（英文）
            </Link>
            ，从各区域去成田与羽田的方法请看
            <Link href="/zh-cn/guides/transport/tokyo-airport-transfer" style={linkStyle}>
              成田机场到东京市区交通攻略
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>购票时机</span>
          <h2 className={styles.sectionTitle}>京都到东京新干线需要提前购票吗？</h2>
          <p className={styles.bodyText}>
            在下文的高峰期、行李超过 160 cm，或在东京要赶飞机时，请提前购票；其他日子买 {NON_RESERVED} 的自由席也可以，
            希望号每小时有 8–12 班。车站的指定席车票在乘车日前 1 个月开售，smartEX 最早可提前 1 年申请。
          </p>
          <div style={{ margin: "1rem 0" }}>
            <Table
              head={["情况", "怎么做", "详细说明", "来源与核对日期"]}
              rows={bookingRows.map((r) => [r.item, r.answer, r.detail, r.source])}
            />
          </div>
          <p className={styles.bodyText}>
            高峰期以外，当天直接乘车也可以。JR东海 2026 年 11 月 27 日的列表显示，京都开往东京<strong>每天 193 班</strong>，
            买自由席车票坐下一班车是可行的安排。但有八段日期没有选择余地：JR东海在高峰期把<strong>希望号全车改为指定席</strong>，
            那几天开往东京的快车完全没有自由席。以下是 {OWN} 在 JR东海官方页面核对的日期：
          </p>
          <ul className={styles.pickList}>
            {nozomiAllReservedPeriods.map((period) => (
              <li key={period}>
                <span className={styles.proIcon}>▸</span>
                <span><strong>{period}</strong></span>
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            JR东海的英文说明是：&ldquo;高峰期希望号不设自由席&rdquo;，&ldquo;光号、回声号、瑞穗号、樱花号与燕子号照常设有自由席&rdquo;，
            并提醒高峰期光号与回声号的自由席&ldquo;可能非常拥挤&rdquo;。所以黄金周也有当天可以乘坐的列车，只是更慢，而且可能要站着。
          </p>
          <p className={styles.bodyText}>
            即使不在这些日期，这一程也有两个理由值得订座，都是这个方向特有的。从京都出发通常是旅程的最后一个早上，另一头有订好的
            东京住宿或航班，没有更晚的列车可以弥补失误。而且你的行李比来时多，确保有自己的座位，需要的话再加上行李放置区，多花几百
            日元是值得的。持有 <strong>JAPAN RAIL PASS</strong> 的话，指定座位本身就免费，更不用犹豫。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              选择车次与座位等级 →
            </KlookLink>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>行李</span>
          <h2 className={styles.sectionTitle}>新干线上的大件行李放哪里？</h2>
          <p className={styles.bodyText}>
            三边之和<strong>不超过 160 cm</strong> 的行李放在头顶行李架或脚边，无需预订，也不收费。超过这个尺寸，按 JR东海的
            行李说明，需要预订附超大行李放置区的指定席：三边之和<strong>在 161 至 250 cm 之间</strong>的行李，必须放在这类座位
            后方的行李空间。座位不另收费，JR 说明这些车票&ldquo;与普通车厢和绿色车厢的指定席价格相同&rdquo;。
          </p>
          <p className={styles.bodyText}>
            带着超大行李却没有预订就上车，要付<strong>含税 {BAGGAGE_FEE} 的行李费</strong>。可以在售票处说明要附超大行李放置区的
            座位，也可以在指定席售票机或网上预订。这项规定适用于东海道、山阳与九州新干线，正好涵盖这段行程。核对于 {OWN}。
          </p>
          <p className={styles.bodyText}>
            离开京都时这条规定比到达时更容易碰到。大多数托运用的行李箱在 160 cm 以内，但整趟旅程买的东西、装袋的婴儿车、滑雪袋
            或高尔夫球包就未必了；而且行李放置区座位只在指定席车厢，买自由席也绕不开这条规定。尺寸接近上限时，用快递把大行李箱
            寄到东京，比到检票口才发现问题更省钱。
          </p>
        </section>

        <KlookTourPicks
          heading="京都 → 东京出行日的后半程"
          intro="从京都出发，通常会在东京的酒店或机场结束，而第二段往往没有提前安排。以下四项都在东京站或品川可以用上：带着全部行李到达时选包车，行李不多就选拼车，出境当天则是两个机场的利木津巴士。请在商品页面查看你出发日期的空位与当前价格。"
          tours={tourPicks}
        />

        <KlookStayAreas
          heading="东京这一端住哪里"
          intro="排序依据是新干线到站后的二十分钟，而不是整趟东京之旅，所以和一般的住宿排名不同。丸之内排第一，因为东海道新干线站台就在车站建筑里；涩谷也在名单上，是因为列车在终点站前会停品川。"
          areas={stayAreas}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>上车前</span>
          <h2 className={styles.sectionTitle}>京都最后一个早上之前要准备的一件事</h2>
          <p className={styles.bodyText}>
            上网，因为出行当天要查的东西很多。你的座位是要出示的 QR 码或订票记录，在京都站候车大厅里你需要的是地图而不是猜测，
            到了另一端还要在车上决定在品川还是东京站下车。出发前开通 eSIM，这些都能在手机上一眼查到。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              在 Klook 查看 eSIM 方案 →
            </KlookLink>{" "}
            <Link href="/zh-cn/guides/esim/best-esim-japan" style={linkStyle}>
              日本 eSIM 推荐
            </Link>
            比较了其他选择；
            <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>
              IC 卡攻略（英文）
            </Link>
            说明了为什么 ICOCA 可以在东京刷卡进出山手线，却不能用来乘新干线。
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/kyoto-day-trip-from-tokyo", title: "东京出发京都一日游：交通、费用与行程（2026，英文）" },
            { href: "/guides/transport/tokyo-to-kyoto", title: "东京到京都（2026）：最便宜与最快的交通方式（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新干线攻略 2026：车票、周游券与新手须知（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略 2026：价格、是否划算与购买方式（英文）" },
            { href: "/guides/transport/tokyo-to-nagoya-shinkansen", title: "东京到名古屋新干线：车程、票价与 JR Pass（英文）" },
            { href: "/guides/transport/tokyo-to-hiroshima-shinkansen", title: "东京到广岛新干线：车程、票价与 JR Pass（英文）" },
            { href: "/guides/transport/kyoto-transportation", title: "京都交通攻略（2026）：巴士、电车与出租车（英文）" },
            { href: "/guides/attractions/where-to-stay-in-tokyo", title: "东京住宿区域攻略（2026）：按线路与机场比较（英文）" },
            { href: "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary", title: "东京、京都、大阪 7 天行程（2026，英文）" },
            { href: "/zh-cn/guides/transport/tokyo-airport-transfer", title: "成田机场到东京市区交通（2026）：Skyliner、N'EX 与利木津巴士比较" },
            { href: "/zh-cn", title: "简体中文版所有攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>两小时车程，先定好三件事</h2>
            <p className={styles.ctaBannerDesc}>
              在京都最后一个早上之前就把座位订好：有自己的座位，需要的话加上行李放置区，再选一班够早的列车，不用把 21:38 的末班车
              当作退路。然后决定在东京哪一站下车，以及下车后怎么走。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看京都 → 东京车票 →
              </KlookLink>
              <KlookLink href={PRIVATE_TRANSFER_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看东京机场接送 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
