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
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  arashiyamaEarlyMorningWalk,
  arashiyamaHozukyoHalfDayTour,
  arashiyamaSaganoOptionalTour,
  hozugawaRiverBoatTicket,
  klookEsim,
  saganoArashiyamaKiyomizuTour,
  saganoHozugawaGuaranteedTour,
  saganoRomanticTrainTicket,
  whereToStayKyotoAreas,
  type KlookSameDayCard,
} from "../../../../lib/klook-links";
import { gygArashiyama, gygHozugawaKudari } from "../../../../lib/gyg-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/sagano-romantic-train-tickets) section by
// section as of 2026-11-24 (task-jtk-20261124-TR02): same sections, tables, FAQ and Klook /
// GetYourGuide CTAs in the same places. Every figure, date and source is the English page's;
// nothing is added. Title term: 嵯峨野小火车 — the name Simplified Chinese guides use, with
// 岚山小火车 as the other common name in the H1.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/sagano-romantic-train-tickets";
const SLUG = "sagano-romantic-train-tickets";
const TITLE = "嵯峨野小火车 2026：购票时间、座位选择与运营日期";
const H1 = "嵯峨野小火车（岚山小火车）2026：购票时间、座位选择与运营日期";
const DESC =
  "嵯峨野小火车在乘车日 1 个月前的日本时间 00:00 开放网上购票，单程 ¥880。整理 2026 年 11、12 月运营日期、冬季停运与 2027 年新列车。";

const LAST_CHECKED = "2026-11-16";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);
const BOAT_CHECKED = dateLabel("2026-10-25", LOCALE);

const ADULT = "¥880";
const CHILD = "¥440";
const SEAT_FEE_ADULT = "¥620";
const SEAT_FEE_CHILD = "¥310";
const ADULT_2027 = "¥1,500";
const CHILD_2027 = "¥750";

const TOUR_URL = klookFor(saganoHozugawaGuaranteedTour.url, LOCALE);
const TICKET_URL = klookFor(saganoRomanticTrainTicket.url, LOCALE);
const BOAT_URL = klookFor(hozugawaRiverBoatTicket.url, LOCALE);
const WALK_URL = klookFor(arashiyamaEarlyMorningWalk.url, LOCALE);
const OPTIONAL_TOUR_URL = klookFor(arashiyamaSaganoOptionalTour.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);
const ARASHIYAMA_HOTELS_URL = klookFor(whereToStayKyotoAreas[3].url, LOCALE);
const KYOTO_STATION_HOTELS_URL = klookFor(whereToStayKyotoAreas[0].url, LOCALE);

const FAQ_URL = "https://www.sagano-kanko.co.jp/faq/";
const TICKET_PAGE_URL = "https://www.sagano-kanko.co.jp/ticket/";
const RELEASE_URL = "https://www.sagano-kanko.co.jp/news/5535/";
const LIGHTUP_URL = "https://www.sagano-kanko.co.jp/news/5197/";
const CALENDAR_URL = "https://www.sagano-kanko.co.jp/train-info/";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const srcStyle = { color: "var(--text)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const SAME_DAY: KlookSameDayCard[] = [
  {
    kind: "导览行程",
    label: "嵯峨野小火车、保津川游船与岚山散步",
    ctaLabel: "查看小火车与游船行程 →",
    url: TOUR_URL,
    why: "小火车和顺流而下回到岚山的保津川游船一次预订，适合不想分别处理两个售票渠道的你。",
  },
  {
    kind: "徒步导览",
    label: "岚山竹林清晨徒步导览",
    ctaLabel: "查看清晨徒步导览 →",
    url: WALK_URL,
    why: "从嵯峨岚山站出发、走较安静小路的 2.5 小时小团徒步，最后以抹茶茶道体验结束，正好是坐小火车那天的竹林行程。",
  },
  {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "运营方表示停运日可能增加或变更，乘车当天用手机查看公告更方便。",
  },
];

const bookingRows = [
  {
    method: "大多数游客适用：运营方官网",
    opens: "乘车日 1 个月前（上个月的同一天）日本时间 00:00。2027 年 3 月 1 日起的乘车日改为 30 天前",
    cost: `只需支付车费：成人 ${ADULT}、儿童 ${CHILD}。前一天 23:59 前免费取消，座位可免费更改最多 3 次。每次最多 8 张，需使用支持 3D Secure 验证的信用卡或借记卡`,
  },
  {
    method: "Klook（小火车车票）",
    opens: "可预订的日期显示在商品页面",
    cost: "价格和取消规定在商品页面上，付款前请先确认",
  },
  {
    method: "小火车车站售票处（嵯峨、岚山、龟冈）",
    opens: "仅限当天，先到先得：小火车嵯峨站约 08:35、小火车岚山站 08:50、小火车龟冈站 09:10 开始售票",
    cost: "只需支付车费。可用现金、信用卡或 IC 卡（PiTaPa 除外）。指定席售罄后，将限量发售站票。小火车保津峡站不售票",
  },
  {
    method: "JR 售票处",
    opens: "不出售",
    cost: "运营方的常见问题仅将官网和小火车车站售票处列为购票渠道。JR Pass 和青春 18 车票不能使用",
  },
  {
    method: "15 人以上团体",
    opens: "通过旅行社，乘车日 1 年前至 1 个月前",
    cost: "成人 ¥800、儿童 ¥400。团体乘客不能乘坐 5 号车厢，当天购票没有团体折扣",
  },
];

const calendarRows = [
  { dates: "2026 年 11 月 1 日～12 月 29 日", runs: "除 12 月 16 日（周三）外每天运行", trains: "小火车嵯峨站发车的常规班次 09:02～16:02", sale: "12 月 16 日以前的车票已开售；12 月 17～29 日的车票分别于 11 月 17～29 日日本时间 00:00 开售" },
  { dates: "11 月 1～13 日", runs: "运行", trains: "常规班次＋加开 81/82 号列车（嵯峨 17:10 发车）", sale: "已开售" },
  { dates: "11 月 14～30 日", runs: "运行", trains: "常规班次＋81/82＋91/92（嵯峨 18:26 发车）", sale: "已开售" },
  { dates: "12 月 1～4 日", runs: "运行", trains: "常规班次＋81/82", sale: "已开售" },
  { dates: "12 月 5～6 日（周六～周日）", runs: "运行", trains: "常规班次＋81/82＋91/92", sale: "已开售" },
  { dates: "12 月 7～13 日", runs: "运行", trains: "常规班次＋81/82", sale: "已开售" },
  { dates: "12 月 14～15 日", runs: "运行", trains: "只有常规班次", sale: "已开售" },
  { dates: "12 月 16 日（周三）", runs: "停运", trains: "无班次", sale: "—" },
  { dates: "12 月 17～25 日", runs: "运行", trains: "只有常规班次", sale: "11 月 17～25 日日本时间 00:00" },
  { dates: "12 月 26～27 日（周六～周日）", runs: "运行", trains: "常规班次＋81/82", sale: "11 月 26～27 日日本时间 00:00" },
  { dates: "12 月 28～29 日", runs: "运行；12 月 29 日是现有车厢的最后一个运营日", trains: "只有常规班次", sale: "11 月 28～29 日日本时间 00:00" },
  { dates: "2026 年 12 月 30 日～2027 年 2 月 28 日", runs: "冬季停运", trains: "无班次", sale: "—" },
];

const directionRows = [
  {
    dir: "大多数游客适用：小火车嵯峨 → 小火车龟冈（下行）",
    times: "小火车嵯峨站 09:02～16:02 每小时发车。下方日历所列日期另有 17:10 和 18:26 加开班次",
    seats: "C、D 面向前进方向；A、D 为靠窗座位",
    fit: "可以接上从龟冈顺流回到岚山的保津川游船。购票时请选择嵯峨／岚山 → 龟冈方向。嵯峨出发的车票也能在小火车岚山站上车",
  },
  {
    dir: "小火车龟冈 → 小火车嵯峨（上行）",
    times: "小火车龟冈站 09:30～16:30 每小时发车。同样日期另有 17:43 和 18:59 加开班次",
    seats: "A、B 面向前进方向；A、D 为靠窗座位",
    fit: "终点在岚山，坐完车再去竹林。前往龟冈可乘 JR 到马堀站，再步行约 10 分钟。运营方表示从 16:30 发车的班次起可以看到夜间亮灯。可在小火车岚山站下车，但不能再上车",
  },
];

const fareRows = [
  { ticket: "成人单程", price: ADULT, note: "小火车嵯峨到小火车龟冈之间，无论乘坐全程还是其中一段，票价均相同，不按距离计价。" },
  { ticket: "儿童单程（6～11 岁）", price: CHILD, note: "正好是成人票价的一半。儿童票适用于 6 岁以上、未满 12 岁的乘客。" },
  { ticket: "15 人以上团体（成人）", price: "¥800", note: "儿童 ¥400。运营方说明当天购票没有团体折扣。" },
  { ticket: "学生团体（成人）", price: "¥710", note: "儿童 ¥360，按运营方的学校和学生团体票价表。" },
  { ticket: "宠物（须放入宠物携带箱）", price: "¥260", note: "按随身行李收费。宠物携带箱长度须在 70 厘米以内、三边合计约 90 厘米以内、重量 10 公斤以内。" },
];

const changeRows = [
  { item: "成人单程座位票", now: `${ADULT}，含座位`, next: `${ADULT_2027}：车费 ${ADULT}＋座位费 ${SEAT_FEE_ADULT}` },
  { item: "儿童单程座位票", now: `${CHILD}，含座位`, next: `${CHILD_2027}：车费 ${CHILD}＋座位费 ${SEAT_FEE_CHILD}` },
  { item: "不坐座位乘车", now: "指定席售罄后，当天限量出售的站票", next: `只付车费即可在各车厢的露台区乘车：成人 ${ADULT}、儿童 ${CHILD}` },
  { item: "包厢", now: "无", next: "4 号车 Premium Cabin Rankyo：每间 ¥9,000，最多 6 人，每位乘客另付车费。从小火车嵯峨站或小火车龟冈站上车" },
  { item: "网上开售时间", now: "乘车日 1 个月前日本时间 00:00", next: "乘车日 30 天前日本时间 00:00。仅 2027 年 3 月 1 日的乘车日在 2027 年 2 月 1 日 10:00 左右开售" },
  { item: "列车", now: "现有车厢，包括开放式的 5 号车厢「Rich 号」。2026 年 12 月 29 日退役", next: "新的五节编组列车：一节机车加四节客车，侧面玻璃一直延伸到脚边，并有挑高的玻璃天花板" },
  { item: "首班和末班", now: "末班 2026 年 12 月 29 日", next: "首班 2027 年 3 月 1 日：嵯峨野 3 号，10:02 从小火车嵯峨站发车" },
  { item: "冬季停运", now: "2026 年 12 月 30 日～2027 年 2 月 28 日", next: "2027 年 12 月 30、31 日停运。2028 年 1、2 月尚未公布" },
];

const seasonRows = [
  { period: "现在～2026 年 12 月 29 日", status: "运行", note: "小火车嵯峨站的常规班次 09:02～16:02 发车，小火车龟冈站的末班回程 16:30 发车。12 月 29 日（周二）是现有车厢的最后一个运营日。" },
  { period: "2026 年 12 月 16 日", status: "停运", note: "运营方 2026 年日历上，本季结束前剩下的唯一停运日。运营方表示停运日可能增加或变更。" },
  { period: "2026 年 10 月 24 日～12 月 29 日", status: "夜间亮灯", note: "16:30 至末班车之间沿线夜间亮灯，运营方表示从小火车龟冈站 16:30 发车的嵯峨野 16 号起就能看到。加开 81/82 号列车（小火车嵯峨站 17:10 发车）运行于 10 月 24 日～12 月 13 日和 12 月 26～27 日；加开 91/92 号列车（18:26）运行于 11 月 14～30 日和 12 月 5～6 日。" },
  { period: "2026 年 12 月 30 日～2027 年 2 月 28 日", status: "停运", note: "冬季停运。运营方 2026 年日历把 12 月 30、31 日标为冬季停运日，2027 年的时刻表从 3 月 1 日开始。" },
  { period: "2027 年 3 月 1 日起", status: "新列车", note: "新列车从 10:02 发车的嵯峨野 3 号开始运营，当天没有 09:02 班次。定期时刻表不变，小火车嵯峨站 09:02～16:02 发车。根据 2027 年运营日历，旺季以外的大多数周三停运，例如 3 月 10 日和 4 月 14 日，请确认计划乘车当天的运营情况。" },
];

const carRows = [
  { car: "1～4 号车：普通车厢（至 2026 年 12 月 29 日）", what: "有顶车厢，窗户可以拉开，四人座包厢式座位、木制长椅和灯泡照明。由货车改装而成，行驶时声音也相当大。", pick: "默认选择；预报有雨时，选这种车厢最合理。座位按车厢号码和 A～D 座位代号出售。" },
  { car: "5 号车厢：Rich 号（至 2026 年 12 月 29 日）", what: "完全没有窗户的开放式车厢，有玻璃天花板，位置最靠近机车。运营方表示下雨时车内可能淋湿，车内禁止撑伞，也不因下雨退款。", pick: "想看峡谷就订这节，但遇到大雨可能会后悔。请带雨衣。购票时必须自己选择「No. 5」，系统不会自动分配。" },
  { car: "1～4 号车：新列车（2027 年 3 月 1 日起）", what: "侧面玻璃延伸到脚边、挑高玻璃天花板、木质座椅和地板，每节车厢门边有带顶棚的半户外露台区。4 号车另有 Rankyo 包厢，设有榻榻米风长椅，可以看到前方景色。", pick: `成人座位 ${ADULT_2027}。露台区 ${ADULT}，包厢每间 ¥9,000 另加车费。新闻稿没有附上新车厢的座位图。` },
];

const combinationRows = [
  { option: "只坐小火车单程", cost: `成人 ${ADULT}、儿童 ${CHILD}；2027 年 3 月 1 日起，含座位的成人和儿童票价分别为 ${ADULT_2027} 和 ${CHILD_2027}`, time: "乘车约 25 分钟", pick: "适合把岚山作为京都一日游其中一站的游客。从嵯峨坐到龟冈，步行 10 分钟到 JR 马堀站，再乘 JR 嵯峨野线回来，回程只需支付普通列车车费。" },
  { option: "小火车单程＋保津川游船回程", cost: `成人 ${ADULT}＋¥6,000；儿童 ${CHILD}＋¥4,500（小火车车费为 2026 年 12 月 29 日前的价格）`, time: "大约半天：小火车约 25 分钟，乘船顺流而下约 2 小时", pick: "最经典的组合，也是大多数游客乘坐这趟小火车的原因。游船终点在岚山，不用坐回程列车，即可回到出发地，结束上午的行程。" },
  { option: "包含小火车和游船的导览行程", cost: "请在商品页面确认所选日期的价格", time: "按行程为半天或一整天", pick: "日期在秋季、游船的运营期间对不上，或不想分别处理相隔一小时的两笔预订时适用。导览行程也会解决小火车龟冈站到游船乘船处之间的交通，两地之间无法步行。" },
];

const steps = [
  { title: "先在运营日历上确认日期", desc: `列车不运行，其他准备都没有意义。本线运行到 2026 年 12 月 29 日，12 月 30 日至 2027 年 2 月 28 日停运，2027 年 3 月 1 日恢复运行。运营方在每季之中也有固定停运日，标注在年度日历上。${CHECKED}核实。` },
  { title: "日本时间 00:00 开售时立刻网上购票", desc: "2026 年的乘车日在乘车日 1 个月前的 00:00 开售。2027 年 3 月 1 日起的乘车日改为 30 天前的 00:00 开售，只有 3 月 1 日当天的车票在 2027 年 2 月 1 日 10:00 左右开售。车站不出售预售票。秋季红叶期间，热门日期会最先售罄。" },
  { title: "除了日期，也要选车厢和座位", desc: "购票页面会要求选择车厢号码，以及四人座包厢中的 A～D 座位代号。运营方的常见问题说明 A、D 是靠窗座位，开往龟冈的班次 C、D 面向前进方向，开往嵯峨的班次则是 A、B。开放式的 5 号车厢 Rich 号必须自己选择，购票时请选「No. 5」，到 2026 年 12 月 29 日为止。运营方没有公布 1～4 号车哪一侧靠河、哪一侧靠山，如果你是为了风景，选开放式车厢比挑座位代号更可靠。" },
  { title: "当天出示二维码", desc: "运营方的常见问题说明，二维码只会在乘车当天显示在智能手机或平板上，仅凭打印的凭证无法乘车。前一天 23:59 前可以免费取消，在此之前，同一班次的座位最多可更改三次。乘车当天不可退票或改签。" },
  { title: "如果网上车票售罄，可在乘车当天到车站购票", desc: "除小火车保津峡站外，各站售票处均先到先得发售当日车票。运营方公布的开始出售时间为小火车嵯峨站约 08:35、小火车岚山站 08:50、小火车龟冈站 09:10，指定席售罄后会限量出售站票。" },
  { title: "另行预订游船，并注意方向", desc: `保津川游船（保津川下り）从龟冈顺流而下到岚山，方向与小火车相反，因此两者可以衔接。龟冈市公布的票价为成人 ¥6,000、4 岁至小学生 ¥4,500，约 2 小时；主要运营期为 3 月 10 日～11 月 30 日，12 月中旬～3 月 9 日为配备暖气的游船，12 月 29 日～1 月 4 日停航，天气恶劣或水位过高时停航。${BOAT_CHECKED}核实。` },
];

const faqItems: FaqItem[] = [
  {
    q: "嵯峨野小火车应该什么时候购票？",
    a: `在乘车日 1 个月前的日本时间 00:00，在运营方官网购票。每个乘车日的车票在上个月的同一天开售，所以 2026 年 12 月 29 日的车票在 11 月 29 日 00:00 开售。据运营方介绍，红叶观赏期约为 11 月中旬至 12 月上旬，如果在这段时间乘车，请在开售时立刻购票：全车均为指定席，运营方也未公布车票通常在开售后多久售罄。2027 年 3 月 1 日起的乘车日改为 30 天前开售，3 月 1 日当天的车票在 2027 年 2 月 1 日 10:00 左右开售。前一天 23:59 前可以免费取消。${CHECKED}核实。`,
  },
  {
    q: "嵯峨野小火车可以当天买票吗？",
    a: `可以，在小火车嵯峨站、小火车岚山站和小火车龟冈站的售票处先到先得购票，小火车保津峡站不出售。运营方公布的开始出售时间分别约为 08:35、08:50 和 09:10，旺季时三站都在 08:35 左右开始；指定席售罄后，每节车厢会限量出售站票，站票也售罄时该班列车即满员。售票处可以使用现金、信用卡，以及 PiTaPa 以外的 IC 卡。${CHECKED}核实。`,
  },
  {
    q: "嵯峨野小火车坐哪个方向比较好？",
    a: `大多数游客适合小火车嵯峨 → 小火车龟冈，因为保津川游船是反方向从龟冈顺流而下到岚山，两者可以连成一圈。如果想在竹林结束行程，或想看夜间亮灯，请改坐龟冈 → 嵯峨；运营方表示从龟冈 16:30 发车的班次起可以看到夜间亮灯。两个方向都是 ${ADULT}。运营方的常见问题说明，开往龟冈的班次 C、D 座位面向前进方向，开往嵯峨的班次则是 A、B。${CHECKED}核实。`,
  },
  {
    q: "2026～27 年冬天嵯峨野小火车运行吗？",
    a: `只运行到 2026 年 12 月 29 日。11 月 1 日至 12 月 29 日除 12 月 16 日（周三）外每天运行，之后在 2026 年 12 月 30 日至 2027 年 2 月 28 日停运，2027 年 3 月 1 日由新列车恢复运行。运营方 2026 年日历把 12 月 30、31 日标为冬季停运，2027 年的时刻表从 3 月 1 日开始。${CHECKED}核实。`,
  },
  {
    q: "2027 年嵯峨野小火车新列车有什么变化？",
    a: `2027 年 3 月 1 日起，新的五节编组列车取代现有车厢，现有车厢在 2026 年 12 月 29 日退役。车费维持 ${ADULT}，另加座位费 ${SEAT_FEE_ADULT}（儿童 ${SEAT_FEE_CHILD}），因此成人座位票为 ${ADULT_2027}；各车厢带顶棚的露台区只需付车费；4 号车的 Premium Cabin Rankyo 每间 ¥9,000，最多 6 人，另加车费。网上开售改为乘车日 30 天前。首班为 3 月 1 日 10:02 的嵯峨野 3 号。${CHECKED}核实。`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "嵯峨野小火车票价多少？",
    a: `2026 年 12 月 29 日以前，单程成人 ${ADULT}、6～11 岁儿童 ${CHILD}，适用于小火车嵯峨站至小火车龟冈站之间 7.3 公里的全线，不按距离计价。按运营方的票价表，15 人以上团体为 ¥800 和 ¥400，学生团体为 ¥710 和 ¥360；当天购票没有团体折扣。放入宠物携带箱的宠物按随身行李收费 ¥260。${CHECKED}核实。`,
  },
  {
    q: "嵯峨野小火车要坐多久、到哪里？",
    a: "从小火车嵯峨站经小火车岚山站、小火车保津峡站到小火车龟冈站，沿保津川峡谷行驶 7.3 公里，约 25 分钟。小火车嵯峨站大约每小时一班，09:02 至 16:02 发车，旺季另有加开班次。这是单程线路而不是环线，购票前就要先决定怎么回来。",
  },
  {
    q: "嵯峨野小火车哪些日子不运行？",
    a: `除了冬季，运营方在每季之中也有固定停运日。2026 年本季结束前剩下的停运日只有 12 月 16 日。2027 年日历上，大多数停运日是旺季以外的周三，从 3 月 10 日和 4 月 14 日开始，11 月则完全不停运。运营方表示停运日可能变更，请在日历上确认计划乘车日期。${CHECKED}核实。`,
  },
  {
    q: "能坐 Rich 号的最后一个运营日是哪天？",
    a: `如果日期不变，是 2026 年 12 月 29 日（周二）。运营方表示，包括开放式 5 号车厢在内的现有车厢预定在当天运行后退役，新列车的新闻稿介绍的则是玻璃侧面的车厢和带顶棚的露台区。团体购票不能乘坐 5 号车厢，最后几天的车票也是 1 个月前开售，所以 12 月 29 日的车票在 11 月 29 日日本时间 00:00 开售。${CHECKED}核实。`,
  },
  {
    q: "想看河景要坐哪一侧？",
    a: "现有列车方面，运营方公布了座位图：1～4 号车是有窗户的四人座包厢，座位代号为 A～D；常见问题说明 A、D 是靠窗座位，开往龟冈的班次 C、D 面向前进方向，开往嵯峨的班次则是 A、B。但运营方没有公布哪一侧面向保津川，所以任何断言左侧或右侧的说法，都是别人的推测，而不是铁路公司的信息。运营方资料中真正能找到的答案是开放式的 5 号车厢「Rich 号」：没有窗户、有玻璃天花板，两侧峡谷都看得到。购票时必须自己选择。",
  },
  {
    q: "开放式的 5 号车厢 Rich 号值得选吗？",
    a: "在 2026 年 12 月 29 日以前，这节车厢正是游客不坐经过同一峡谷的普通 JR 列车、而选择小火车的理由，也是唯一一节无论坐在哪个座位，景色都相同的车厢。运营方也公开了它的缺点：没有窗户，下雨时车内可能淋湿；车内不能撑伞；运营方也说明不因下雨退款。请带雨衣，并在前一天查看天气预报。如果预报不好，选 1～4 号车的座位更合适。",
  },
  {
    q: "怎么去小火车嵯峨站和小火车龟冈站？",
    a: "小火车嵯峨站就在 JR 嵯峨野线嵯峨岚山站旁边，步行约五分钟；从京福电铁岚山本线的岚电嵯峨站也约五分钟，从阪急岚山站步行约二十分钟。线路另一端的小火车龟冈站，距 JR 山阴（嵯峨野）线马堀站步行约十分钟，所以“乘小火车前往龟冈，再乘 JR 返回”的行程很容易安排。",
  },
  {
    q: "要不要加上保津川游船？",
    a: `游船是当天后半段的理想搭配，因为方向相反：从龟冈顺流而下到岚山，所以会在出发的地方结束。龟冈市公布的票价为成人 ¥6,000、4 岁至小学生 ¥4,500，乘船约两小时；主要运营期为 3 月 10 日～11 月 30 日，12 月中旬至 3 月 9 日为配备顶棚和暖气的游船。12 月 29 日至 1 月 4 日停航，天气恶劣或水位过高时也会停航；在预订不可退款的行程前，最好先了解这一点。${BOAT_CHECKED}核实。`,
  },
  {
    q: "带孩子坐嵯峨野小火车值得吗？",
    a: `值得，票价也很实惠：2026 年 12 月 29 日以前儿童 ${CHILD}、成人 ${ADULT}（2027 年 3 月 1 日起，含座位的儿童和成人票价分别为 ${CHILD_2027} 和 ${ADULT_2027}），车程仅 25 分钟，孩子失去耐心前就会到达。运营方资料中有两项实用信息：婴儿车须折叠后带上车，列车上有两个轮椅专用位置。允许携带导盲犬和辅助犬乘车，携带其他宠物须使用宠物携带箱，并支付 ¥260。5 号车厢是孩子最想坐的车厢，也是没有窗户的车厢，请根据天气而不是孩子们的投票来决定。`,
  },
];

const winterPicks = [
  withKlookLocale(saganoHozugawaGuaranteedTour, LOCALE, {
    title: "嵯峨野小火车、保津川游船与岚山散步",
    desc: "适用于 2026 年 12 月 29 日以前或 2027 年 3 月 1 日以后的日期：小火车单程、顺流回到岚山的游船，以及竹林自由活动时间",
  }),
  withKlookLocale(arashiyamaEarlyMorningWalk, LOCALE, {
    title: "岚山竹林清晨徒步导览",
    desc: "从嵯峨岚山站出发、避开主要游览路线、沿清静小路进行的 2.5 小时小团徒步，最后以抹茶茶道体验结束",
  }),
  { title: "岚山酒店", desc: "住在竹林附近，赶在人多之前到达", url: ARASHIYAMA_HOTELS_URL },
  { title: "京都站周边酒店", desc: "前往嵯峨岚山的 JR 嵯峨野线列车从这里出发，乘快速列车约 11 分钟", url: KYOTO_STATION_HOTELS_URL },
  { title: "Klook 日本 eSIM", desc: "通过二维码凭证提供的日本 eSIM，用手机查地图和预订页面", url: ESIM_URL },
  withKlookLocale(saganoRomanticTrainTicket, LOCALE, {
    title: "嵯峨野小火车车票",
    desc: "如果计划乘车日期在停运期间前后，这是小火车单程座位",
  }),
];

const guidedPicks = [
  withKlookLocale(saganoHozugawaGuaranteedTour, LOCALE, {
    title: "嵯峨野小火车、保津川游船与岚山散步",
    desc: "保证成团的经典组合行程：小火车单程、顺流回到岚山的保津川游船，以及竹林自由活动时间",
  }),
  withKlookLocale(arashiyamaHozukyoHalfDayTour, LOCALE, {
    title: "岚山与保津峡半日游",
    desc: "一次预订即可体验嵯峨野小火车、保津川游船和岚山景点的半日游",
  }),
  withKlookLocale(saganoArashiyamaKiyomizuTour, LOCALE, {
    title: "嵯峨野小火车、岚山与清水寺半日游",
    desc: "乘坐大巴、由导游带领游览小火车、岚山和清水寺的半日游",
  }),
  withKlookLocale(arashiyamaSaganoOptionalTour, LOCALE, {
    title: "岚山一日游（可加选嵯峨野小火车）",
    desc: "游览竹林和岚山景点，可加选小火车；日期在冬季停运期间时请看这一项",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "嵯峨野小火车" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows, boldFirst = false }: { head: string[]; rows: ReactNode[][]; boldFirst?: boolean }) {
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
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (boldFirst && r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: boldFirst && r === 0 ? 700 : undefined }}
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

function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={srcStyle}>
      {children}
    </a>
  );
}

export default function ZhCnSaganoRomanticTrainTicketsPage({ updated }: { updated: PageUpdated }) {
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
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            沿保津川峡谷行驶的京都观光小火车。车票 1 个月前开售，现有车厢在 12 月 29 日退役，随后停运，2027 年 3 月 1 日起启用新列车。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "运营方公布的官方票价", "2027 年 3 月 1 日起启用新列车"].map((t) => (
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
            <strong>嵯峨野小火车（嵯峨野观光小火车／Sagano Romantic Train）的购票时间：</strong>运营方嵯峨野观光铁道的官网在<strong>乘车日 1 个月前的日本时间 00:00</strong> 开售，所以现有列车最后一个运营日 2026 年 12 月 29 日的车票，在 11 月 29 日 00:00 开售。据运营方介绍，红叶观赏期约为<strong>11 月中旬至 12 月上旬</strong>，如果在这段时间乘车，请在开售当天 00:00 购票：运营方未公布车票通常在开售后多久售罄，网上车票售罄后，只能在车站售票处购买当日座位票或限量站票。票价为单程成人 <strong>{ADULT}</strong>、儿童 <strong>{CHILD}</strong>，<strong>2026 年 12 月 30 日至 2027 年 2 月 28 日停运</strong>；<strong>2027 年 3 月 1 日</strong>起改由新列车运营，加收 {SEAT_FEE_ADULT} 座位费，成人座位票为 <strong>{ADULT_2027}</strong>，并改为 <strong>30 天前</strong>开售。以上官方票价及日期已于 {CHECKED}核实。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>预订这趟行程</span>
          <h2 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>
            预订小火车车票及当天的其他项目
          </h2>
          <p className={styles.bodyText}>
            岚山一日行程中，只有小火车车票有严格的开售时间。回程游船、徒步导览和手机上网套餐都可以一次订好。请打开商品页面，查看所选日期的可预订名额和当前价格。
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看嵯峨野小火车可预订日期及票价 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
            在商品页面选择乘车日，就能看到价格和剩余座位。现有列车的最后一个运营日是 2026 年 12 月 29 日，2026 年 12 月 30 日至 2027 年 2 月 28 日不运行。
          </p>
        </section>

        <KlookSameDayCards heading="同一天在岚山可以一起预订的项目" cards={SAME_DAY} />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人，至 2026 年 12 月 29 日</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人座位，2027 年 3 月 1 日起</p>
                <p className={styles.verdictStatValue}>{ADULT_2027}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>冬季停运</p>
                <p className={styles.verdictStatValue}>12 月 30 日～2 月 28 日</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>开售时间</p>
                <p className={styles.verdictStatValue}>1 个月前；2027 年 3 月起 30 天前</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              全程 <strong>7.3 公里</strong>，往返于岚山的<strong>小火车嵯峨站</strong>（トロッコ嵯峨）和<strong>小火车龟冈站</strong>（トロッコ亀岡）之间，沿保津川峡谷行驶；小火车嵯峨站大约每小时一班，<strong>09:02～16:02</strong> 发车。儿童票适用于 6～11 岁。当天车票在保津峡以外的各小火车站先到先得出售。这趟列车<strong>不能使用 JR Pass</strong>。Klook 出售车票，以及包含小火车的导览行程。票价和日期来自运营方官网，在 {CHECKED}核实。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                小火车＋保津川游船行程 →
              </KlookLink>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                只买小火车车票 →
              </KlookLink>
              <GygCompareButton slug={SLUG} listing={gygArashiyama} />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>开售时间</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火车应该什么时候购票？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            在乘车日上个月的同一天、日本时间 00:00，在运营方官网购票。2027 年 3 月 1 日起的乘车日改为 30 天前，所以 2027 年 4 月 1 日的车票在 3 月 2 日 00:00 开售；唯一的例外是 2027 年 3 月 1 日，在 2027 年 2 月 1 日 10:00 左右开售。
          </p>
          <Table head={["购票渠道", "开售时间", "费用及退改规定"]} rows={bookingRows.map((r) => [r.method, r.opens, r.cost])} boldFirst />
          <p className={styles.bodyText} style={noteStyle}>
            最后核实：{LAST_CHECKED}。资料来源：运营方的<Src href={FAQ_URL}>常见问题</Src>、<Src href={TICKET_PAGE_URL}>票价及车票信息页面</Src>和<Src href={RELEASE_URL}>2026 年 10 月 23 日新闻稿</Src>。网上购票后如需更改乘车日期或人数，须先取消原订单再重新购票。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看小火车日期 →
            </KlookLink>
            <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              小火车＋游船导览行程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>运营日期</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火车 2026 年 11 月和 12 月运营吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            运营，2026 年 11 月 1 日至 12 月 29 日除 12 月 16 日（周三）外每天运行。秋季大部分日期都会在傍晚加开班次，12 月 30 日起进入冬季停运。
          </p>
          <Table head={["日期", "运行情况", "班次", "开售时间"]} rows={calendarRows.map((r) => [r.dates, r.runs, r.trains, r.sale])} />
          <p className={styles.bodyText} style={noteStyle}>
            最后核实：{LAST_CHECKED}。资料来源：运营方的<Src href={LIGHTUP_URL}>2026 年 9 月 18 日夜间亮灯新闻稿</Src>和<Src href={CALENDAR_URL}>运营日历表</Src>。加开班次：81 号列车于 17:10 从小火车嵯峨站发车、82 号列车于 17:43 从小火车龟冈站发车；91 号列车于 18:26 从嵯峨发车、92 号列车于 18:59 从龟冈发车。运营方表示停运日和加开班次可能增加或变更，如果已购票的班次停运，票款将自动退回付款信用卡。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>方向</span>
          <h2 className={styles.sectionTitle}>嵯峨到龟冈，还是龟冈到嵯峨更好？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            多数行程适合嵯峨到龟冈，因为保津川游船会把你带回岚山。两个方向都是 {ADULT}，不同的是发车时间、哪些座位面向前进方向，以及终点在哪里。
          </p>
          <Table head={["方向", "发车时间", "面向前进方向的座位", "选择理由"]} rows={directionRows.map((r) => [r.dir, r.times, r.seats, r.fit])} boldFirst />
          <p className={styles.bodyText} style={noteStyle}>
            最后核实：{LAST_CHECKED}。资料来源：运营方的<Src href={FAQ_URL}>常见问题</Src>（座位和跨站乘车）和<Src href={CALENDAR_URL}>时刻表</Src>。运营方没有公布各方向的拥挤程度，也没有公布哪一侧面向河流；2026 年 12 月 29 日以前，开放式的 5 号车厢两侧都看得到。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={BOAT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              乘保津川游船回到岚山 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygHozugawaKudari} />
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>简介</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火车是什么？</h2>
          <p className={styles.bodyText}>
            这是一条沿旧山阴本线行驶、全长 7.3 公里的观光铁路，从嵯峨岚山站旁边的<strong>小火车嵯峨站</strong>出发，经过<strong>小火车岚山站</strong>和<strong>小火车保津峡站</strong>，到达<strong>小火车龟冈站</strong>。车厢由货车改装：木制长椅、灯泡照明、可以拉开的窗户，声音也很大。5 号车厢「Rich 号」完全没有窗户，并有玻璃天花板。这款列车将在 2026 年 12 月 29 日退役。
          </p>
          <p className={styles.bodyText}>
            这趟小火车需要先处理购票，原因有两个。第一，全车均为指定席，网上在 1 个月前开售，因此秋季出行需要在抵达前一个月就确定乘车日期。第二，这是一条非环形的<em>单程</em>线路，并有季节性停运。如何返回、计划乘车当天是否运营，比选哪个座位更重要。
            <Link href="/guides/attractions/kyoto-2-day-itinerary" style={linkStyle}>
              京都两天行程（英文）
            </Link>
            和
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>
              京都三天行程（英文）
            </Link>
            介绍了如何把这段小火车行程安排进京都之旅。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火车票价多少？</h2>
          <Table head={["票种", "票价", "说明"]} rows={fareRows.map((r) => [r.ticket, r.price, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            票价在 {CHECKED}对照运营方的票价页面和 2026 年 10 月 23 日新闻稿核实，为 2026 年 12 月 29 日以前的票价。还有一项<em>未在</em>表中列出的费用：开放式的 5 号车厢不加价，同样是 {ADULT}，因此每个乘车日开售后，5 号车厢的车票最先售罄。小火车行程常会搭配的京都景点门票，请看
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={srcStyle}>
              日本景点门票价格表（英文）
            </Link>
            ，每一项都附有核实日期。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>2027 年变化</span>
          <h2 className={styles.sectionTitle}>2027 年嵯峨野小火车有什么变化？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            2027 年 3 月 1 日起将启用新列车，并加收座位费。成人和儿童车费分别维持 {ADULT} 和 {CHILD}，因此成人座位票从 {ADULT} 变为 {ADULT_2027}。网上售票时间也改为乘车日前 30 天。
          </p>
          <Table head={["变化项目", "2026 年（至 12 月 29 日）", "2027 年（3 月 1 日起）"]} rows={changeRows.map((r) => [r.item, r.now, r.next])} />
          <p className={styles.bodyText} style={noteStyle}>
            在 {CHECKED}对照运营方的<Src href={RELEASE_URL}>2026 年 10 月 23 日新闻稿</Src>和 2026 年日历核实。新闻稿没有说明露台区的位置如何出售、站票是否继续出售，以及 2027 年 3 月以后的团体票价。运营方的新列车页面预告之后还会发布消息，安排这些部分前，请先查看官网。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>运行期间</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火车什么时候运行、什么时候停运？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            这是最容易打乱行程的部分。本线冬季停运两个月，每季之中也有停运日。2026 年的傍晚，夜间亮灯是选择晚班车的理由。
          </p>
          <Table head={["期间", "运行情况", "运营方的说明"]} rows={seasonRows.map((r) => [r.period, r.status, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            运行期间和停运日在 {CHECKED}核实。如果你的京都行程在 1 月或 2 月，这次旅行就无法乘坐小火车。
            <Link href="/guides/attractions/things-to-do-kyoto" style={srcStyle}>
              京都必体验项目（英文）
            </Link>
            汇总了无需预约即可游览的其他景点。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={OPTIONAL_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看所选日期的可预订名额 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygArashiyama} />
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>冬季</span>
          <h2 className={styles.sectionTitle}>冬天嵯峨野小火车运行吗？</h2>
          <p className={styles.bodyText}>
            运行到 2026 年 12 月 29 日，之后<strong>2026 年 12 月 30 日至 2027 年 2 月 28 日停运</strong>。运营方 2026 年日历把 12 月 30、31 日标为冬季停运日，2027 年的运营日历未列出 3 月 1 日以前的日期。运营方没有另外公告 2027 年 1、2 月的情况，因此以上停运期间根据两份运营日历整理。{CHECKED}核实。
          </p>
          <p className={styles.bodyText}>
            冬天的岚山依然值得一去。
            <Link href="/guides/attractions/arashiyama-bamboo-forest-tour" style={linkStyle}>
              岚山竹林（英文）
            </Link>
            全年免费开放，清晨走一趟竹林，很适合搭配
            <Link href="/guides/attractions/kyoto-kimono-rental" style={linkStyle}>
              岚山和服租赁（英文）
            </Link>
            。龟冈市也公布，12 月中旬至 3 月 9 日运营配备暖气的保津川游船，12 月 29 日至 1 月 4 日停航（{BOAT_CHECKED}核实）。想住在竹林附近，
            <Link href="/guides/attractions/where-to-stay-in-kyoto" style={linkStyle}>
              京都住宿区域指南（英文）
            </Link>
            比较了岚山和京都站周边。
          </p>
        </section>

        <KlookTourPicks
          heading="小火车停运时，在岚山可以预订什么？"
          intro="如果可以调整出行日期，建议优先考虑小火车加游船的行程。Klook 说明小火车停运时这个行程会取消并全额退款，所以只适用于现在到 2026 年 12 月 29 日，或 2027 年 3 月 1 日以后（2026 年 11 月 7 日查看商品页面）。其他项目在冬季任何日期都可以使用。请打开商品页面查看可预订名额和当前价格。"
          tours={winterPicks}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>售罄</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火车售罄怎么办？</h2>
          <p className={styles.bodyText}>
            官网售罄不代表只能取消计划。运营方表示，小火车嵯峨站、小火车岚山站和小火车龟冈站的售票处仍会出售<strong>当天车票</strong>，小火车保津峡站则不出售。开始出售时间分别约为 08:35、08:50 和 09:10，旺季时三站都在 08:35 左右开始。指定席售罄后，每节车厢会限量出售<strong>站票</strong>，直到满员为止。运营方也提醒，列车满员时可能无法上车。
          </p>
          <p className={styles.bodyText}>
            因为前一天 23:59 前可以免费取消，当天晚上再查一次官网也值得。如果不想排队，导览行程会把小火车和游船一次订好，请按计划乘车日期查看。即使整趟列车都售罄，JR 嵯峨野线仍能带你到岚山，不过小火车本身不能使用 JR Pass。{CHECKED}核实。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              小火车＋游船行程 →
            </KlookLink>
            <KlookLink href={WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              岚山徒步导览 →
            </KlookLink>
            <KlookLink href={ARASHIYAMA_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              岚山酒店 →
            </KlookLink>
            <KlookLink href={KYOTO_STATION_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              京都站酒店 →
            </KlookLink>
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              Klook eSIM →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              通过 Klook 购买小火车车票 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygArashiyama} />
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>座位</span>
          <h2 className={styles.sectionTitle}>应该订哪一节车厢、哪个座位？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            答案取决于计划乘车日期，因为列车在 2027 年 3 月 1 日更换。
          </p>
          <Table head={["车厢", "车厢特点", "适合选择的情况"]} rows={carRows.map((r) => [r.car, r.what, r.pick])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            大家最常问的<strong>哪一侧面向河流</strong>，运营方并没有针对现有列车公布答案。座位资料只说明车厢配置（四人座包厢，座位代号 A～D）和 5 号车厢的规定。因此建议坐左侧或右侧的说法，均应视为推测；如果乘车主要是为了欣赏峡谷景色，就选开放式车厢。同一份资料的无障碍信息：列车上有两个轮椅专用位置，允许携带导盲犬和辅助犬乘车，婴儿车须折叠后带上车，携带宠物须使用约 70 厘米、10 公斤以内的宠物携带箱，并支付 ¥260。{CHECKED}核实。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>怎么去小火车嵯峨站和小火车龟冈站？</h2>
          <p className={styles.bodyText}>
            <strong>小火车嵯峨站</strong>就在 JR 嵯峨野线<strong>嵯峨岚山站</strong>旁边，步行约五分钟。运营方也说明，从京福电铁岚山本线的<strong>岚电嵯峨站</strong>约五分钟，从<strong>阪急岚山站</strong>步行约二十分钟。从京都站出发，乘坐班次较多的 JR 嵯峨野线列车是最直接的方式。
          </p>
          <p className={styles.bodyText}>
            线路另一端的<strong>小火车龟冈站</strong>，距 JR 山阴（嵯峨野）线<strong>马堀站</strong><strong>步行约十分钟</strong>。这样就能安排最省钱的行程：小火车坐单程，步行到马堀站，再乘普通 JR 列车回来。如果你已经订了保津川游船，也要注意这一点：游船乘船处在龟冈，不在小火车龟冈站，两地之间无法步行。
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>
              京都交通指南（英文）
            </Link>
            整理了 JR、地铁、岚电和公交；如果计划同一周内往返关西各城市，
            <Link href="/guides/attractions/kansai-area-pass" style={linkStyle}>
              关西广域铁路周游券（英文）
            </Link>
            可用于 JR 路段，但小火车不属于 JR，因此不能使用。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比较</span>
          <h2 className={styles.sectionTitle}>只坐小火车、加上游船，还是参加导览行程？</h2>
          <Table head={["选项", "费用", "时间", "适合选择的情况"]} rows={combinationRows.map((r) => [r.option, r.cost, r.time, r.pick])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            有三件事任何汇总都无法针对所选日期回答，所以需要直接打开商品页面：那天小火车是否运行、指定席是否已售罄，以及保津川游船因水位过高停航时的取消规定。上方的游船票价是龟冈市公布的金额（成人 ¥6,000、4 岁至小学生 ¥4,500，约两小时），在 {BOAT_CHECKED}核实；但这些数字无法告诉你 11 月 18 日的可预订名额。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              小火车＋游船导览行程 →
            </KlookLink>
            <KlookLink href={BOAT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              保津川游船船票 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygHozugawaKudari} />
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>购票步骤</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火车怎么购票？</h2>
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
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="嵯峨野小火车常见问题" />

        <section className={styles.faqSection} style={{ paddingTop: 0 }}>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>更多问题</h3>
          <div className={styles.faqList}>
            {moreFaqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{faqItems.length + i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <KlookTourPicks
          heading="包含小火车的导览行程"
          intro="这四个行程都会代为预订小火车座位，省去提前 1 个月自行购票的麻烦。前两个行程包含小火车和保津川游船，第三个还包含清水寺，第四个可选择是否乘坐小火车，日期接近冬季停运期间时请看这一项。请打开商品页面查看所选日期的可预订名额和当前价格。"
          tours={guidedPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/arashiyama-bamboo-forest-tour", title: "岚山竹林导览（2026）：最佳时段、行程和从京都出发的路线（英文）" },
            { href: "/guides/attractions/things-to-do-kyoto", title: "京都必体验项目（2026）：寺院、时段和要预订的项目（英文）" },
            { href: "/guides/attractions/kyoto-kimono-rental", title: "京都和服租赁（2026）：哪一区、包含什么、何时归还（英文）" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "大阪出发京都奈良一日游（2026）：该订哪一种行程（英文）" },
            { href: "/guides/attractions/arima-onsen-day-trip", title: "有马温泉一日游（2026）：从大阪或神户出发与泡汤费用（英文）" },
            { href: "/guides/transport/kyoto-transportation", title: "京都交通指南（2026）：公交、电车和出租车（英文）" },
            { href: "/guides/attractions/kansai-area-pass", title: "关西广域铁路周游券（2026）：价格、适用范围和是否划算（英文）" },
            { href: "/guides/attractions/nara-day-trip", title: "奈良一日游（2026）：从大阪或京都出发与东大寺门票（英文）" },
            { href: "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary", title: "东京京都大阪 7 天行程（2026）：逐日安排（英文）" },
            { href: "/zh-cn/guides/attractions", title: "更多日本景点门票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>坐小火车上行，乘游船顺流而下</h2>
            <p className={styles.ctaBannerDesc}>
              小火车单程加上反方向的保津川游船，是这一天唯一能回到出发地的安排。指定席 1 个月前开售，冬季停运，所以请先确认日期，再安排当天的其他行程。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看小火车＋游船行程 →
              </KlookLink>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看小火车车票 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
