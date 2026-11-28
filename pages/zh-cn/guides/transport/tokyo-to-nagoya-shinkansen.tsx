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
  ghibliParkNagoyaBusTour,
  ghibliParkTicket,
  jrPassWholeJapan,
  klookEsim,
  legolandJapanHotelPackage,
  legolandJapanTicket,
  nagoyaArrivalShinkansenPrep,
  nagoyaParkStayAreas,
  shinkansenTokyoNagoya,
  shoryudoHighwayBusPass,
  takayamaShirakawagoNagoyaDayTrip,
  shirakawagoTakayamaOldTownDayTour,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import fares from "../../../../data/jr-fares.json";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/tokyo-to-nagoya-shinkansen) section by section as of
// 2026-11-28 (task jtk-20261127-TR03): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: 东京到名古屋新干线 — the route as Simplified Chinese results write it (ekitan.com/zh-cn
// "从东京到名古屋的新干线票价和订票方式").

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/transport/tokyo-to-nagoya-shinkansen";
const TITLE = "东京到名古屋新干线：最快93分钟、¥11,100（2026）";
const H1 = "东京到名古屋新干线：希望号最快 93 分钟、指定席 ¥11,100";
const DESC =
  "东京到名古屋新干线乘希望号最快 93 分钟直达，指定席单程 ¥11,100（2026 年 11 月核对）。JR Pass 可乘光号，1 小时 41 分起。";

const OWN_ISO = "2026-10-28";
const OWN = dateLabel(OWN_ISO, LOCALE);
const PARKS = dateLabel("2026-10-26", LOCALE);
const LAST_CHECKED = "2026-11-28";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);

const tokyoNagoya = fares.segments.find((s) => s.id === "tokyo-nagoya")!;
const WINDOW_FARE = `¥${tokyoNagoya.fareYen.toLocaleString("en-US")}`;
const FARE_AS_OF = monthLabel(`${fares.asOf}-01`, LOCALE);

const SMART_EX_NOZOMI = "¥11,100";
const SMART_EX_HIKARI = "¥10,890";
const NOZOMI_TICKET = "¥4,180";
const JR_PASS_7 = "¥50,000";
const KINTETSU_PASS_1 = "¥1,900";

const JRC_TRAININFO_URL = "https://traininfo.jr-central.co.jp/shinkansen/pc/en/ti04.html?station=1&bound=2";
const SMART_EX_PDF_URL = "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_reserved.pdf";
const NOZOMI_FASTEST = "1 小时 33 分";
const NOZOMI_RANGE = "1 小时 33 分至 1 小时 41 分";
const HIKARI_RANGE = "1 小时 41 分至 1 小时 59 分";
const KODAMA_RANGE = "2 小时 36 分至 2 小时 46 分";
const NOZOMI_PER_DAY = 119;
const NOZOMI_FASTEST_MIN = "93 分钟";

const SHINKANSEN_URL = klookFor(shinkansenTokyoNagoya.url, LOCALE);
const GHIBLI_TOUR_URL = klookFor(ghibliParkNagoyaBusTour.url, LOCALE);
const GHIBLI_TICKET_URL = klookFor(ghibliParkTicket.url, LOCALE);
const LEGOLAND_URL = klookFor(legolandJapanTicket.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const SHORYUDO_URL = klookFor(shoryudoHighwayBusPass.url, LOCALE);
const SHIRAKAWAGO_URL = klookFor(takayamaShirakawagoNagoyaDayTrip.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const answerRows = [
  {
    train: "希望号 NOZOMI（最快）",
    time: `${NOZOMI_RANGE}，直达`,
    fare: SMART_EX_NOZOMI,
    note: `每天从东京出发、停靠名古屋的有 ${NOZOMI_PER_DAY} 班，首班车 06:00。JR Pass 不能乘坐`,
  },
  {
    train: "光号 HIKARI",
    time: `${HIKARI_RANGE}，直达`,
    fare: SMART_EX_HIKARI,
    note: "每天从东京出发 30 班。JAPAN RAIL PASS 可以乘坐",
  },
  {
    train: "回声号 KODAMA",
    time: `${KODAMA_RANGE}，直达`,
    fare: SMART_EX_HIKARI,
    note: "每天从东京出发 29 班，每站都停",
  },
];

/** The eight 2026–27 periods JR Central lists, as the English page prints them. */
const nozomiAllReservedPeriods = [
  "2026 年 4 月 24 日–5 月 6 日（黄金周）",
  "2026 年 8 月 7–16 日（盂兰盆节）",
  "2026 年 9 月 18–23 日",
  "2026 年 10 月 10–12 日",
  "2026 年 11 月 21–23 日",
  "2026 年 12 月 25 日–2027 年 1 月 5 日",
  "2027 年 1 月 9–11 日",
  "2027 年 3 月 20–22 日",
];

const routeRows = [
  {
    item: "东京 → 名古屋最快车程",
    value: `希望号 ${NOZOMI_FASTEST}`,
    detail: `直达，不用换乘。大部分希望号需 1 小时 35 分至 1 小时 40 分，核对当天的完整范围是 ${NOZOMI_RANGE}`,
    source: `JR东海列车信息，${CHECKED}`,
  },
  {
    item: "从东京出发、停靠名古屋的希望号",
    value: `每天 ${NOZOMI_PER_DAY} 班，首班车 06:00`,
    detail: "每班希望号都停靠名古屋。大部分时段每隔几分钟就有一班，所以规划时要看的是你的车票能乘坐哪一班，而不是时刻表",
    source: `JR东海列车信息，${CHECKED}`,
  },
  {
    item: "JR Pass 可乘坐的列车（光号）",
    value: `${HIKARI_RANGE}，不用换乘`,
    detail: "JAPAN RAIL PASS 不能乘坐希望号，但可以乘坐从东京直达名古屋的光号，每天从东京出发 30 班。多花的是几分钟而不是一小时，因此这是东海道新干线上对周游券持有人最友好的区间",
    source: `JR东海列车信息，${CHECKED}`,
  },
  {
    item: "回声号（每站都停）",
    value: KODAMA_RANGE,
    detail: "每站都停的列车，每天从东京出发 29 班。周游券可以乘坐，但只有去途中的小站时才值得乘坐",
    source: `JR东海列车信息，${CHECKED}`,
  },
  {
    item: "这个区间销售的座位等级",
    value: "普通车自由席、普通车指定席、绿色车厢指定席",
    detail: "Klook 线路页面列出的三种车票。东海道新干线没有 Gran Class，Gran Class 是东北新干线与北陆新干线的车厢",
    source: `klook.com 铁路页面，${OWN}`,
  },
  {
    item: "改从品川出发",
    value: "同样的车票，同样的希望号车票价格",
    detail: "东海道新干线的希望号都会在离开东京站几分钟后停靠品川，JR 也把周游券持有人的希望号车票定为“东京／品川–名古屋”同一价格。住在东京南部或西部的话，从品川上车即可",
    source: `japanrailpass.net，${OWN}`,
  },
];

const priceRows = [
  {
    item: "东京 → 名古屋单程，普通车指定席（希望号、瑞穗号）",
    price: SMART_EX_NOZOMI,
    covers: "JR 的 smartEX 在线价格，成人 1 位、平常期、最快的列车。大多数乘客付的就是这个价格",
    source: `smart-ex.jp smartEX 票价表，${OWN}`,
  },
  {
    item: "光号、回声号、樱花号、燕子号的同等座位",
    price: SMART_EX_HIKARI,
    covers: "同一张 smartEX 票价表上便宜 ¥210，是不乘坐希望号的折扣。这个区间乘坐较慢的列车大约多花 15 分钟",
    source: `smart-ex.jp smartEX 票价表，${OWN}`,
  },
  {
    item: "东京 → 名古屋，车站售票处",
    price: `约 ${WINDOW_FARE}`,
    covers: "基本票价加上光号指定席特急费用。光号是 JAPAN RAIL PASS 不必另付费用就能乘坐的列车",
    source: `本站 JR 票价数据，${FARE_AS_OF}时点。是四舍五入的参考值，不是运营方的票价表`,
  },
  {
    item: "周游券持有人专用的希望号、瑞穗号车票",
    price: `${NOZOMI_TICKET}，东京或品川–名古屋`,
    covers:
      "JAPAN RAIL PASS 持有人每次乘坐希望号都要购买的专用车票。JR 说明“绿色车厢车票、普通车指定席车票与普通车自由席车票价格相同”",
    source: `japanrailpass.net，${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS 普通车",
    price: `在线购买 7 日 ${JR_PASS_7}、14 日 ¥80,000、21 日 ¥100,000`,
    covers: "向海外旅行社购买的兑换券为 ¥53,000、¥84,000、¥105,000。绿色车厢在线购买 ¥70,000、¥110,000、¥140,000，兑换券 ¥74,000、¥116,000、¥147,000",
    source: `JR 集团官方价格表，${OWN}`,
  },
  {
    item: "近铁周游券 KINTETSU RAIL PASS（伊势区间）",
    price: `1 日 ${KINTETSU_PASS_1}、2 日 ¥3,700、5 日 ¥4,900、5 日 Plus ¥6,700`,
    covers: "近铁自己的外国游客周游券。从近铁名古屋到伊势的是近铁线路，和 JR 是不同的铁路公司，JR 的周游券都不能使用",
    source: `kintetsu.co.jp 英文周游券页面，${OWN}`,
  },
];

const compareRows = [
  {
    option: "每程购买希望号指定席单程票",
    cost: `smartEX 单程 ${SMART_EX_NOZOMI}`,
    gets: `最快的直达列车（最快 ${NOZOMI_FASTEST}），不用换乘，也不必另外购买或规划其他东西。`,
    pick: "首选。单程两张约 ¥22,200，7 日周游券官方网站 ¥50,000、旅行社 ¥53,000，只往返名古屋远远不划算。",
  },
  {
    option: "JAPAN RAIL PASS 7 日普通车，乘坐光号",
    cost: `在线购买 ${JR_PASS_7}`,
    gets: "可乘坐全国 JR 线路，东京–名古屋乘坐光号同样直达，不用换乘。",
    pick: "同一周还要去京都、金泽、广岛或东北时才选。名古屋是东海道新干线沿线用周游券几乎不多花时间的城市，最适合作为周游券行程的中途停留站。",
  },
  {
    option: "JAPAN RAIL PASS 加希望号车票",
    cost: `${JR_PASS_7}，每程另付 ${NOZOMI_TICKET}`,
    gets: "周游券加上最快的列车，但这个区间光号只慢约 15 分钟。",
    pick: "这个区间很少值得。相当于花 ¥4,180 换 15 分钟。希望号车票留给车程相差 1 小时 15 分的东京–广岛使用。",
  },
  {
    option: "普通车自由席",
    cost: "比指定席便宜，差额就是指定席费用",
    gets: "到车站直接乘坐来的那一班。但在下方 8 个旺季期间，希望号全车都是指定席。",
    pick: `非旺季、行李不多时。仅东京出发的希望号每天就有 ${NOZOMI_PER_DAY} 班，这个方法实际可行；每天只有 30 班的线路就不行。`,
  },
  {
    option: "升龙道高速巴士周游券",
    cost: "请在商品页查看你的日期",
    gets: "以名古屋为起点，3 天或 5 天乘坐中部地区外国游客专用高速巴士，含机场交通车票。",
    pick: "不是用在东京这一程。抵达后如果不是只去一个乐园，而是要去高山、白川乡和伊势，这才是要买的周游券。",
  },
  {
    option: "名古屋出发的一日游",
    cost: "请在商品页查看你的日期",
    gets: "白川乡与高山老街，或吉卜力公园与爱知航空博物馆，一次预订。",
    pick: "先定好火车再选。Linimo 换乘、需预约的山区巴士这类麻烦的当地交通，交给一日游最省事。",
  },
];

const fromNagoyaRows = [
  {
    place: "吉卜力公园（长久手）",
    how: "从名古屋站的巴士中心乘坐名铁直达巴士，或乘坐东山线到藤丘再换乘 Linimo",
    time: "直达巴士 40 分钟",
    cost: "巴士成人 ¥1,200、儿童 ¥600；从藤丘乘坐 Linimo 为 ¥400、¥200",
    source: `名铁巴士与 Linimo 官方网站，${PARKS}`,
  },
  {
    place: "LEGOLAND® Japan 乐高乐园（金城埠头）",
    how: "从名古屋站乘坐青波线（Aonami Line），与新干线抵达的是同一栋建筑",
    time: "24 分钟，15.2 公里",
    cost: "成人 ¥360、儿童 ¥180",
    source: `aonamiline.co.jp，${PARKS}`,
  },
  {
    place: "高山与白川乡",
    how: "名古屋站名铁巴士中心与高山浓飞巴士中心之间的浓飞巴士，或名古屋站出发的一日游",
    time: "到高山 2 小时 45 分；一日游标注为往返约 11 小时",
    cost: "巴士需预约。一日游价格请看商品页",
    source: `nouhibus.co.jp，${OWN}`,
  },
  {
    place: "伊势（伊势神宫）",
    how: "从近铁名古屋乘坐近铁，和 JR 是不同的铁路公司，车站就在 JR 名古屋站旁",
    time: "约 1 小时 15 分。近铁的岛风号时刻表为近铁名古屋 10:25 发车，伊势市 11:40、宇治山田 11:42 到达",
    cost: `JR 的周游券都不能使用。近铁周游券 1 日券 ${KINTETSU_PASS_1}`,
    source: `kintetsu.co.jp，${OWN}`,
  },
  {
    place: "京都、大阪与东海道新干线其他区间",
    how: "在同一个站台继续往西",
    time: "名古屋大约位于东京–新大阪的三分之一处",
    cost: "适用与本页相同的车票规则",
    source: `本指南，${OWN}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "东京到名古屋新干线要多久？",
    a: `乘坐希望号最快 ${NOZOMI_FASTEST_MIN}（${NOZOMI_FASTEST}），直达不用换乘。根据 ${CHECKED} 核对的 JR东海列车信息，每天从东京出发前往名古屋的 ${NOZOMI_PER_DAY} 班希望号车程为 ${NOZOMI_RANGE}。JAPAN RAIL PASS 可以乘坐的光号需 ${HIKARI_RANGE}，同样不用换乘；每站都停的回声号需 ${KODAMA_RANGE}。`,
  },
  {
    q: "东京到名古屋新干线票价多少？",
    a: `根据 JR 的 smartEX 票价表，希望号普通车指定席单程 ${SMART_EX_NOZOMI}（成人 1 位，${CHECKED} 核对）。光号或回声号的同等座位为 ${SMART_EX_HIKARI}，便宜 ¥210。希望号单程两张合计 ¥22,200，7 日普通车 JAPAN RAIL PASS 在线购买为 ${JR_PASS_7}。`,
  },
  {
    q: "希望号、光号、回声号该乘坐哪一种？",
    a: `买单程票就乘坐希望号，持周游券就乘坐光号，只有去途中小站时才乘坐回声号。希望号 ${NOZOMI_RANGE}，指定席 ${SMART_EX_NOZOMI}；光号 ${HIKARI_RANGE}，${SMART_EX_HIKARI}，同样直达不用换乘；回声号 ${KODAMA_RANGE}。JAPAN RAIL PASS 可以乘坐光号与回声号，不能乘坐希望号，而在这个区间，这个限制只让周游券持有人多花几分钟。`,
  },
  {
    q: "东京到名古屋买 JR Pass 划算吗？",
    a: `只往返一次不划算，但如果你本来就要买周游券，名古屋是最划算的停留站。7 日普通车 JAPAN RAIL PASS 在线购买 ${JR_PASS_7}，向海外旅行社购买的兑换券 ¥53,000；往返名古屋的指定席两张按 JR 的 smartEX 价格计算约 ¥22,200，金额上完全不划算。时间上则不同：光号从东京直达名古屋，周游券持有人只多花几分钟（JR东海时刻表上光号 ${HIKARI_RANGE}，希望号 ${NOZOMI_RANGE}），而广岛区间要多花 1 小时 15 分。所以如果你已经有去京都、金泽或广岛的周游券，加上名古屋几乎不增加成本。在长途区间值得购买的 ${NOZOMI_TICKET} 希望号车票，在这个区间可以不买。周游券价格均来自 japanrailpass.net，${OWN} 核对。`,
  },
  {
    q: "需要提前订座吗？",
    a: `通常不需要。根据 JR东海时刻表，仅东京出发的希望号每天就有 ${NOZOMI_PER_DAY} 班，这是日本城际线路中直接到车站乘车也可行的线路。但有 8 个期间一定要订座。JR东海官方页面列出了希望号全车改为指定席、完全没有自由席的期间：${nozomiAllReservedPeriods.join("；")}。JR东海说明在这些期间，希望号以外的光号、回声号、瑞穗号、樱花号与燕子号“维持一般的自由席”，所以较慢的列车就是不订座也能乘坐的选择。指定席车票在列车从始发站发车当天的 1 个月前 10:00 开售。持有周游券的话订座本身免费，没有理由不订。${OWN} 核对。`,
  },
];

const topPrep = [
  withKlookLocale(nagoyaArrivalShinkansenPrep[0], LOCALE, {
    label: "名古屋站周边酒店",
    ctaLabel: "在 Klook 查看名古屋酒店 →",
    why: "新干线和地铁都从名古屋站出发，住在这里的话，去乐园或高山的日子都不必横穿市区。",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[1], LOCALE, {
    label: "吉卜力公园门票",
    ctaLabel: "查看吉卜力公园门票 →",
    why: "吉卜力大仓库的入场时间在结账时选择，建议和火车一起定好，不要留到当天。",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[2], LOCALE, {
    label: "LEGOLAND® Japan 乐高乐园门票",
    ctaLabel: "查看乐高乐园门票 →",
    why: "一日票是手机二维码，同一个商品页也能选择 SEA LIFE 名古屋套票与快速通行证。",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[3], LOCALE, {
    label: "名古屋出发吉卜力公园与爱知航空博物馆巴士一日游",
    ctaLabel: "查看名古屋出发巴士一日游 →",
    why: "不想自己安排 Linimo 换乘的话，可以参加从名古屋出发的拼团巴士一日游。",
  }),
];

const tourPicks = [
  withKlookLocale(ghibliParkNagoyaBusTour, LOCALE, {
    title: "名古屋出发吉卜力公园与爱知航空博物馆巴士一日游",
    desc: "从名古屋出发的拼团巴士一日游，结合吉卜力公园与爱知航空博物馆，不必自己处理 Linimo 换乘",
  }),
  withKlookLocale(takayamaShirakawagoNagoyaDayTrip, LOCALE, {
    title: "名古屋出发高山与白川乡一日游",
    desc: "从名古屋站出发，标注为往返约 11 小时，白川乡与高山老街各停留约 2 小时",
  }),
  withKlookLocale(shirakawagoTakayamaOldTownDayTour, LOCALE, {
    title: "白川乡与高山老街一日游（可加购飞驒牛午餐）",
    desc: "另一个名古屋出发、去同样两地的一日游，飞驒牛午餐是加购选项，不含在内",
  }),
  withKlookLocale(legolandJapanHotelPackage, LOCALE, {
    title: "LEGOLAND® Japan 乐高乐园酒店住宿",
    desc: "在乐园入口旁度假酒店的主题客房住一晚，含早餐。营业时间 10:00–17:00 的乐园可以分成两个早上玩",
  }),
];

const stayAreas = [
  withKlookLocale(nagoyaParkStayAreas[0], LOCALE, {
    area: "名古屋站",
    why: "前往两个乐园的交通都从这里出发：乘坐东山线到藤丘换乘 Linimo，或乘坐青波线到金城埠头（青波线标注 24 分钟、¥360）。东海道新干线也抵达同一栋建筑。",
  }),
  withKlookLocale(nagoyaParkStayAreas[1], LOCALE, {
    area: "吉卜力公园周边（长久手、濑户）",
    why: "不在市区，而是 Linimo 沿线的酒店。要赶上午 9 点吉卜力大仓库入场时间的话就选这里，乐园就在爱·地球博纪念公园站 2 号出口外。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "东京到名古屋新干线" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function LastChecked({ date, sources }: { date: string; sources: { label: string; href?: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      <strong>最后核对：{date}</strong>。
      {sources.map((s, i) => (
        <span key={s.label}>
          {i > 0 ? "、" : ""}
          {s.href ? (
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ) : (
            s.label
          )}
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
                    style={{ fontSize: c === 0 ? "0.88rem" : "0.85rem" }}
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

export default function ZhCnTokyoToNagoyaShinkansenPage({ updated }: { updated: PageUpdated }) {
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
            直达的希望号每隔几分钟一班。这也是东海道新干线上，持周游券只多花几分钟、而不是多花 1 小时 15 分的区间。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "smartEX 与 JR 集团官方票价（注明核对日期）", "JR Pass 回本点", "从名古屋可以去哪里"].map((t) => (
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
            <span className={styles.verdictLabel}>先说结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最快车程</p>
                <p className={styles.verdictStatValue}>{NOZOMI_FASTEST}（希望号），不用换乘</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>普通车指定席</p>
                <p className={styles.verdictStatValue}>单程 {SMART_EX_NOZOMI}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass（光号）</p>
                <p className={styles.verdictStatValue}>可以乘坐，{HIKARI_RANGE}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>东京出发的希望号（每天）</p>
                <p className={styles.verdictStatValue}>{NOZOMI_PER_DAY} 班，首班车 06:00</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>东京到名古屋新干线</strong>乘坐直达的希望号最快{" "}
              <strong>{NOZOMI_FASTEST_MIN}（{NOZOMI_FASTEST}）</strong>，普通车指定席按 JR 的 smartEX 价格计算单程 <strong>{SMART_EX_NOZOMI}</strong>。
              JAPAN RAIL PASS 不能乘坐希望号，但可以乘坐的光号同样直达，车程 <strong>{HIKARI_RANGE}</strong>，不用周游券的话票价为{" "}
              {SMART_EX_HIKARI}。数据来自 JR东海与 smart-ex.jp，{CHECKED}核对。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看东京 → 名古屋车票 →
              </KlookLink>
              <KlookLink href={GHIBLI_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                名古屋出发吉卜力公园一日游 →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>答案</span>
          <h2 className={styles.sectionTitle}>东京到名古屋新干线要多久？</h2>
          <p className={styles.bodyText}>
            最快 {NOZOMI_FASTEST_MIN}（{NOZOMI_FASTEST}），几乎所有希望号都是 {NOZOMI_RANGE}，不用换乘。JR东海的时刻表显示，{CHECKED}从东京出发、停靠名古屋的希望号共{" "}
            {NOZOMI_PER_DAY} 班，首班车 06:00。光号需 {HIKARI_RANGE}，每站都停的回声号需 {KODAMA_RANGE}。
          </p>
          <h2 className={styles.sectionTitle}>东京到名古屋新干线票价多少？</h2>
          <p className={styles.bodyText}>
            希望号普通车指定席单程 {SMART_EX_NOZOMI}，光号或回声号的同等座位 {SMART_EX_HIKARI}，均为 JR smartEX 的成人 1
            位价格。希望号往返为 ¥22,200，不到 7 日 JAPAN RAIL PASS（{JR_PASS_7}）的一半。
          </p>
          <Table
            head={["列车", "东京 → 名古屋车程", "指定席（smartEX）", "备注"]}
            rows={answerRows.map((r) => [r.train, r.time, r.fare, r.note])}
          />
          <LastChecked
            date={LAST_CHECKED}
            sources={[
              { label: "JR东海列车信息（东京，西行方向）", href: JRC_TRAININFO_URL },
              { label: "smartEX 指定席票价表（smart-ex.jp）", href: SMART_EX_PDF_URL },
            ]}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            要在名古屋过夜的话，
            <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>
              名古屋两日行程（英文）
            </Link>
            把抵达后安排成两天，
            <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>
              名古屋城门票指南（英文）
            </Link>
            则介绍大多数游客在市区度过的半天。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              购买东京 → 名古屋车票 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          headingLevel={3}
          label="与火车一起预订"
          heading="和车票一起预订的名古屋行程"
          intro="火车会把你送到名古屋站。其余的就是车站附近的住宿，以及按日期销售的乐园指定时段门票，建议购买车票时一起定好。"
          items={topPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>为什么名古屋最容易被忽略</h2>
          <p className={styles.bodyText}>
            因为大多数人只把它当成去京都的列车经过的城市。从时刻表来看，名古屋大约位于东海道新干线东京到新大阪的三分之一处，是日本最轻松的长途区间：希望号最快{" "}
            <strong>{NOZOMI_FASTEST}</strong>，不用换乘，仅东京出发的希望号每天就有 {NOZOMI_PER_DAY} 班。
          </p>
          <p className={styles.bodyText}>
            车票的选择也是整条线路最简单的，原因值得说明。在其他东海道新干线、山阳新干线区间，<strong>JAPAN RAIL PASS</strong>
            不能乘坐希望号，所以必须在另付车票与乘坐较慢列车之间选择。东京到名古屋是例外：<strong>光号</strong>直达，持周游券乘坐仍然不用换乘，只多约 15 分钟。
            {NOZOMI_TICKET} 的希望号车票也适用于这个区间，但在这个区间很少值得买。
          </p>
          <p className={styles.bodyText}>
            真正需要规划的是抵达之后。名古屋与其说是观光城市，不如说是前往四个好去处的换乘站：乘坐 Linimo 去吉卜力公园、乘坐青波线去乐高乐园、走山路去白川乡与高山，以及乘坐
            JR 周游券不能使用的铁路去伊势神宫。每个地方都有各自的运营方与票价，其中两处还有各自的预约规定。这是这趟旅程最值得提前了解的部分，也是本页接下来的内容。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>列车</span>
          <h2 className={styles.sectionTitle}>希望号、光号、回声号车程比较</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            最快 {NOZOMI_FASTEST}，直达。以下每个数字都注明出处与核对日期，也说明了为什么在这个区间，持周游券的行程和其他人几乎没有差别。
          </p>
          <Table
            head={["项目", "内容", "说明", "出处与核对日期"]}
            rows={routeRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            新干线车票的基本知识（由两部分组成的票价、座位等级、周游券能乘坐与不能乘坐的列车）请看
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              新干线指南（英文）
            </Link>
            ；
            <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
              东京到京都交通（英文）
            </Link>
            是同一条线路再往前 40 分钟；
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" style={linkStyle}>
              东京到广岛新干线（英文）
            </Link>
            则是周游券限制真正影响行程的区间。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              东京 → 名古屋车票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>东京到名古屋所有票价与周游券价格</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            希望号普通车指定席单程 {SMART_EX_NOZOMI}，光号或回声号的同等座位 {SMART_EX_HIKARI}。两者都是 JR 的在线价格，于 {OWN}
            从 smart-ex.jp 公开的 smartEX 票价表核对（成人 1 位、平常期）。需要说明的是，JR东海没有以固定表格公布车站售票处的票价，所以下表的车站售票处一行是本站四舍五入的参考值，并已注明。
          </p>
          <Table
            head={["车票", "价格", "内容", "出处与核对日期"]}
            rows={priceRows.map((r) => [r.item, r.price, r.covers, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            价格可能变动，购买前请再确认。车站售票处的票价是 JR Pass 可乘坐列车（东海道新干线、山阳新干线为光号、樱花号、回声号）平常期单程的基本票价加指定席特急费用（普通车），为四舍五入的参考值。smartEX
            是在线价格，与车站价格不同；旺季与淡季的指定席费用会上下浮动几百日元。本页不列出 Klook 价格，因为 Klook 价格按日期变化，请在商品页查看你的日期。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比较</span>
          <h2 className={styles.sectionTitle}>东京到名古屋买 JR Pass 划算吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            只走这一程不划算。指定席单程两张按 JR 的 smartEX 价格计算约 ¥22,200，7 日普通车周游券在线购买 {JR_PASS_7}，在海外购买的兑换券
            ¥53,000。但如果是<em>加进</em>本来就需要的周游券行程，名古屋是沿线最划算的城市，因为持周游券几乎不多花时间。
          </p>
          <Table
            head={["选项", "费用", "可以得到什么", "适合的情况"]}
            rows={compareRows.map((r) => [r.option, r.cost, r.gets, r.pick])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            JR 自己写明的规定是：持周游券乘坐希望号或瑞穗号，需要只卖给 JAPAN RAIL PASS 持有人的专用车票，而且“绿色车厢车票、普通车指定席车票与普通车自由席车票价格相同”。东京或品川到名古屋这张车票为{" "}
            <strong>{NOZOMI_TICKET}</strong>，是 JR 定价的六个区间中最便宜的，也是最可以不买的。
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass 指南（英文）
            </Link>
            可以按你自己的行程计算回本点，
            <Link href="/guides/transport/tokyo-to-kanazawa" style={linkStyle}>
              东京到金泽指南（英文）
            </Link>
            则介绍从北边前往白川乡的另一条中部地区路线。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS（7/14/21 日）→
            </KlookLink>
            <KlookLink href={SHORYUDO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              升龙道高速巴士周游券 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>订座</span>
          <h2 className={styles.sectionTitle}>需要提前订座吗？</h2>
          <p className={styles.bodyText}>
            一年中大部分时间确实不需要。根据 JR东海时刻表，东京出发的希望号每天 {NOZOMI_PER_DAY} 班，这是日本城际线路中直接到车站乘坐下一班车也合理的线路。不过有 8 个期间没有选择：JR东海在下列旺季期间让
            <strong>希望号全车都是指定席</strong>，那几天去名古屋的快车完全没有自由席。于 {OWN} 在 JR东海官方页面核对：
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
            这个区间的备选是光号。JR东海说明在同样的期间，希望号以外的列车，包括光号、回声号、瑞穗号、樱花号与燕子号，“维持一般的自由席”，而光号从东京直达名古屋。所以即使是黄金周，也有不订座就能乘坐的列车，只是多花约 15 分钟。
          </p>
          <p className={styles.bodyText}>
            如果要订座，不管哪一种列车时间都一样：指定席车票在列车从始发站发车当天的<strong>1 个月前 10:00</strong>
            开售，例如 4 月 1 日出发的列车从 3 月 1 日 10:00 开售。持有<strong>JAPAN RAIL PASS</strong>
            的话订座本身免费，在这个区间完全不用花钱。
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

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>从名古屋出发</span>
          <h2 className={styles.sectionTitle}>名古屋值得停留吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            作为住宿区域是值得的，理由在下表而不在城市本身。从东京去很麻烦或当天无法往返的四个地方，从名古屋站出发都很方便，其中两条交通就从新干线抵达的同一栋建筑出发。
          </p>
          <Table
            head={["目的地", "交通方式", "所需时间", "费用", "出处与核对日期"]}
            rows={fromNagoyaRows.map((r) => [r.place, r.how, r.time, r.cost, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            其中两处的预约规定比火车更重要。吉卜力公园销售指定日期与时段的门票，两个月前开售，吉卜力大仓库有指定入场时间；开售日程、两种门票等级与官方价格请看
            <Link href="/guides/attractions/ghibli-park-tickets" style={linkStyle}>
              吉卜力公园门票指南（英文）
            </Link>
            。乐高乐园的价格按日期变化，
            <Link href="/guides/attractions/legoland-japan-tickets" style={linkStyle}>
              乐高乐园门票指南（英文）
            </Link>
            有说明。往北的山区巴士有好几班需要预约，
            <Link href="/guides/attractions/takayama-shirakawago-tour" style={linkStyle}>
              高山与白川乡指南（英文）
            </Link>
            逐班整理。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={GHIBLI_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              吉卜力公园门票 →
            </KlookLink>
            <KlookLink href={LEGOLAND_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              LEGOLAND® Japan 乐高乐园门票 →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            从东京去大阪的途中可以在名古屋停留吗？
          </h3>
          <p className={styles.bodyText}>
            超过 100 公里的基本票价乘车券可以。JR东海允许在起点与终点之间的车站中途下车（出站后再进站），但不能走回头路。新干线特急券不能用于中途下车，所以请分别购买东京 → 名古屋与名古屋 →
            新大阪。smartEX 不能中途下车，下车后未乘坐的区段就会失效。以上规定于 2026 年 11 月 13 日在 JR东海的
            <a href="https://global.jr-central.co.jp/en/tickets/type/stopovers.html" target="_blank" rel="noopener">
              中途下车说明页面
            </a>
            与 smart-ex.jp 核对。到新大阪的票价请看
            <Link href="/zh-cn/guides/transport/tokyo-to-osaka-shinkansen" style={linkStyle}>
              东京到大阪新干线指南
            </Link>
            。要安排那半天，
            <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>
              名古屋城门票指南（英文）
            </Link>
            整理了名古屋城的价格、开放时间与不开放的天守阁。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>行李</span>
          <h2 className={styles.sectionTitle}>超大件行李有什么规定？</h2>
          <p className={styles.bodyText}>
            三边合计<strong>超过 160 厘米</strong>的行李必须提前预约。JR东海的行李说明页面把三边合计<strong>161 至 250 厘米</strong>
            的行李定为超大件行李，必须放在带超大件行李放置区的座位后方空间。这个座位不另收费，JR 说明车票“与普通车、绿色车厢指定席同价”。
          </p>
          <p className={styles.bodyText}>
            带着超大件行李却没有预约就上车，要付<strong>含税 ¥1,000 的行李费</strong>。{OWN}
            核对。可以在车站售票处、指定席售票机，或在线选择带行李放置区的座位预约。实际上大多数航空托运的行李箱都在 160 厘米以下，所以这条规定针对的是滑雪板包、高尔夫球包、超大行李箱与装袋的婴儿车。带行李放置区的座位只在指定席车厢，因此买自由席也无法避开这条规定。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>当天往返或过夜</span>
          <h2 className={styles.sectionTitle}>可以从东京当天往返吉卜力公园吗？</h2>
          <p className={styles.bodyText}>
            可以，但时间比看起来紧。新干线希望号单程约 <strong>1 小时 35 分</strong>，从名古屋站巴士中心乘坐名铁直达巴士按运营方标注为{" "}
            <strong>40 分钟</strong>，所以除了在园内的时间之外，光交通就要远远超过 4 个半小时。
          </p>
          <p className={styles.bodyText}>
            真正的限制不是距离，而是门票。
            <Link href="/guides/attractions/ghibli-park-tickets" style={linkStyle}>
              吉卜力公园门票（英文）
            </Link>
            是指定日期与时段的门票，吉卜力大仓库有指定入场时间，上午时段最先售罄。要配合上午 9 点的大仓库入场从东京出发，就得在 06:00
            前上车；而且名铁直达巴士在乐园休园日不运行，休园日包括星期二。在名古屋或 Linimo 沿线的长久手酒店住一晚，天亮前出发就会变成正常的早上行程。
          </p>
          <p className={styles.bodyText}>
            白川乡更是如此。从名古屋还要再乘坐 2 小时 45 分、需要预约的巴士，从东京当天往返根本无法好好游览。如果这两个地方之一是你此行的目的，请订一晚住宿；如果不想自己规划当地交通，名古屋站出发的一日游正是因为换乘麻烦才存在的。
          </p>
        </section>

        <KlookTourPicks
          heading="从名古屋出发的一日行程"
          intro="四个行程都从名古屋站或附近出发：帮你处理 Linimo 换乘的吉卜力公园一日游、只买乐园门票，以及两个把要换两次巴士的山区行程变成一次预订的白川乡与高山一日游。请在商品页查看你的日期是否有空位以及当前价格。"
          tours={tourPicks}
        />

        <KlookStayAreas
          heading="在名古屋过夜住哪里"
          intro="两个区域，选哪一个直接取决于上面的表格：如果名古屋只是较长铁路行程中的一站、乐园当天往返，就住车站周边；如果此行目的是吉卜力大仓库上午 9 点的入场时间，就住 Linimo 沿线。"
          areas={stayAreas}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>上车前</span>
          <h2 className={styles.sectionTitle}>上车前要准备好的一件事</h2>
          <p className={styles.bodyText}>
            上网。出了名古屋站之后的每个决定都要用手机：吉卜力公园门票是印有入场时间的二维码，名铁巴士和浓飞巴士的时刻表要和你实际抵达的时间对照，藤丘的
            Linimo 换乘有地图很简单、没有地图就很麻烦。出发前先开通 eSIM，这些都能直接用手机查。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              查看 Klook eSIM →
            </KlookLink>{" "}
            <Link href="/zh-cn/guides/esim/best-esim-japan" style={linkStyle}>
              日本 eSIM 推荐指南
            </Link>
            比较了其他选择，
            <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>
              IC 卡指南（英文）
            </Link>
            则说明下了新干线之后，如何用 IC 卡通过名古屋地铁、青波线与名铁的闸机。
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/nagoya-2-day-itinerary", title: "名古屋两日行程（2026）：吉卜力公园或乐高乐园（英文）" },
            { href: "/zh-cn/guides/transport/tokyo-to-osaka-shinkansen", title: "东京到大阪新干线 2026：票价、车程时间与购票方式" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "吉卜力公园门票 2026：购买方式、价格与开售日（英文）" },
            { href: "/guides/attractions/legoland-japan-tickets", title: "乐高乐园门票（2026）：按日期的价格（英文）" },
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山与白川乡一日游（2026）：出发班次与费用（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新干线指南 2026：车票、周游券与第一次乘坐的技巧（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 指南 2026：价格、是否划算与购买方式（英文）" },
            { href: "/zh-cn/guides/transport/kyoto-to-tokyo-shinkansen", title: "京都到东京新干线 2026：票价、车程时间与购票方式" },
            { href: "/guides/transport/tokyo-to-hiroshima-shinkansen", title: "东京到广岛新干线：车程、票价与 JR Pass（英文）" },
            { href: "/guides/transport/tokyo-to-kanazawa", title: "东京到金泽（2026）：光辉号车程、座位与周游券（英文）" },
            { href: "/zh-cn", title: "简体中文指南总览 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>一个半小时的车程，接着决定真正重要的事</h2>
            <p className={styles.ctaBannerDesc}>
              买单程票就买希望号，持周游券就预订光号的座位，在这个区间相差约 15 分钟。接着决定你去名古屋的目的：吉卜力公园的入场时间，或往北的巴士预约。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看东京 → 名古屋车票 →
              </KlookLink>
              <KlookLink href={SHIRAKAWAGO_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看白川乡一日游 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
