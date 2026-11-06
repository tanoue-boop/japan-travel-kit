import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  bieiFuranoLavenderDayTour,
  furanoBieiBluePondDayTour,
  hokkaidoSevenDayStayAreas,
  jozankeiHotSpringBusTrip,
  jrHokkaidoRailPass,
  klookEsim,
  lakeShikotsuIceFestivalHalfDayTour,
  newChitoseAirportTransfers,
  nisekoResortShuttleBus,
  noboribetsuToyaNisekoDayTour,
  noboribetsuToyaOtaruDayTour,
  otaruCanalCruiseSealCarving,
  otaruShakotanYoichiCoachTour,
  otaruSnowParkDayTour,
  sapporoFuranoAreaPass,
  sapporoFuranoBieiLavenderBusTour,
  sapporoJozankeiBuddhaDayTour,
  sapporoSnowParkHalfDayTour,
  sapporoTvTowerMoiwaSetTicket,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import {
  asahiyamaBieiHighlightsTour,
  furanoBieiWinterIlluminationTour,
  yoichiOtaruWalkingTour,
} from "../../../../lib/klook-links-winter-hokkaido";
import { seoTags } from "../../../../components/IntlSeo";
import {
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
} from "../../../../components/IntlChrome";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

// Mirrors the English guide (pages/guides/attractions/hokkaido-7-day-itinerary.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/hokkaido-7-day-itinerary";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "北海道7日游" }];

const OWN_ISO = "2026-11-01";
const OWN = dateLabel(OWN_ISO, LOCALE);

const SEASON_ISO = "2026-11-06";
const SEASON = dateLabel(SEASON_ISO, LOCALE);

const FESTIVAL_CHECKED = dateLabel("2026-10-30", LOCALE);
const JMA_CHECKED = dateLabel("2026-10-28", LOCALE);

const AIRPORT_FARE = "¥1,230";
const OTARU_FARE = "¥800";
const ASAHIKAWA_RT = "¥10,880";
const ASAHIKAWA_OW = "¥5,440";
const FURANO_RT = "¥12,560";
const FURANO_OW = "¥6,280";
const FURANO_LOCAL = "¥1,380";
const FURANO_WINTER = "¥6,820";
const TOTAL_SUMMER = "¥17,160";
const TOTAL_WINTER = "¥17,700";
const PASS_7 = "¥28,000";
const PASS_5 = "¥22,000";
const PASS_10 = "¥37,000";
const AREA_FURANO = "¥11,000";
const AREA_NOBORIBETSU = "¥10,000";
const ZOO_ADULT = "¥1,000";
const CRUISE_DAY = "¥1,800";
const SUBWAY_DAY_PASS = "¥830";
const DONICHIKA = "¥520";
const FEB_MAX = "0.4°C";
const FEB_MIN = "−6.2°C";
const FEB_SNOW = "116 厘米";
const HND_FLIGHT = "1 小时 30 分钟";

type Stop = {
  time: string;
  place: string;
    allow: string;
  getting: string;
  booking: string;
};

type Pick = { label: string; url: string };

type Day = {
  n: number;
  label: string;
  heading: string;
  intro: string;
  stops: Stop[];
  book: ReactNode;
  picks: Pick[];
};

const baseRows = [
  {
    base: "札幌站",
    nights: "6 晚中的 4 晚",
    why: "第 1、2、3、6 晚。这条路线的每一段都从这栋建筑下方出发：新千岁来的快速 Airport、往旭川的 Lilac 和 Kamui，以及夏季的富良野薰衣草特快，到大通只要一站地铁或走有遮蔽的路。这几晚可以一次订或分两次订，通常看价格决定。",
  },
  {
    base: "富良野",
    nights: "6 晚中的 2 晚",
    why: "第 4、5 晚。住在内陆而不是往返的原因：从札幌当天去美瑛和富良野是十小时的巴士行程，而从富良野的酒店出发的两个早晨，不管哪个季节都是这周最好的部分。",
  },
  {
    base: "小樽站（替换）",
    nights: "1 晚，代替札幌一晚",
    why: "如果想看夜晚的运河，把第 3 晚换到这里，尤其是 2 月上旬小樽雪灯之路举行时。回札幌 ¥800、约 33 分钟，换过来几乎不花钱。",
  },
  {
    base: "二世谷（仅滑雪版）",
    nights: "2 晚，代替富良野",
    why: "只适合真正以滑雪为主的一周。机场巴士从新千岁直达二世谷，也能放雪具，所以这个版本到达当天完全不经过札幌。",
  },
];

const seasonRows = [
  {
    day: "第 1 天",
    winter: "飞抵，坐快速 Airport 到札幌，天黑后逛大通和薄野，12 月下午四点左右就天黑了",
    summer: "飞抵，坐快速 Airport 到札幌，在大通公园和夏季啤酒花园度过长长的傍晚",
  },
  {
    day: "第 2 天",
    winter: "札幌：2 月上旬看雪祭会场，其他时间去定山溪温泉半天，下午待室内",
    summer: "札幌：黄昏的藻岩山、头大佛和白色恋人公园，脚下没有冰的时候都更好",
  },
  {
    day: "第 3 天",
    winter: "小樽，待到天黑看运河煤气灯；2027 年 2 月 6–13 日有小樽雪灯之路",
    summer: "小樽加余市蒸馏所，或只有夏天才值得开车去的积丹半岛和神威岬",
  },
  {
    day: "第 4 天",
    winter: "在企鹅散步的季节去旭川和旭山动物园，再坐普通列车到富良野",
    summer: "夏季时段的旭川和旭山动物园，再坐普通列车经美瑛到富良野",
  },
  {
    day: "第 5 天",
    winter: "雪中的美瑛和富良野：山丘一片白而不是条纹，在富良野雪场滑雪或玩雪半天",
    summer: "富田农场和美瑛山丘，薰衣草季让这天成为北海道最多人预订的一天",
  },
  {
    day: "第 6 天",
    winter: "薰衣草特快是夏季列车，所以坐普通列车到旭川再换 Lilac 或 Kamui 回札幌，然后去雪上乐园半天，或 2027 年 1 月 30 日到 2 月 23 日的支笏湖冰涛节",
    summer: "回札幌，再往南去登别和洞爷湖的长途一日，或在市区悠闲度过最后一个下午",
  },
  {
    day: "第 7 天",
    winter: "札幌到新千岁离开，不要坐当天第一班，因为 2 月航班常延误",
    summer: "札幌到新千岁离开，留时间逛机场，机场本身就是景点",
  },
];

const passRows = [
  {
    leg: "新千岁机场 → 札幌（第 1 天）",
    fare: AIRPORT_FARE,
    note: "快速 Airport，按车型 36 到 43 分钟。不用预订；uシート对号座加 ¥1,000。",
  },
  {
    leg: "札幌 ↔ 小樽往返（第 3 天）",
    fare: "¥1,600",
    note: `单程 ${OTARU_FARE}，最快约 33 分钟。路线上最便宜的一段。`,
  },
  {
    leg: "札幌 → 旭川，特急对号座（第 4 天）",
    fare: ASAHIKAWA_OW,
    note: `JR 北海道 Lilac／Kamui 往返票 ${ASAHIKAWA_RT} 的一半，1 小时 25 分钟。`,
  },
  {
    leg: "旭川 → 美瑛 → 富良野，普通列车（第 4 天）",
    fare: FURANO_LOCAL,
    note: `旭川到富良野的票价出自 JR 北海道 2026 年该线公告，公告也说旭川到富良野之间不能用 IC 卡，请买票。核查日期：${SEASON}。`,
  },
  {
    leg: "富良野 → 札幌，富良野薰衣草特快对号座（第 6 天，夏季）",
    fare: FURANO_OW,
    note: `JR 北海道往返票 ${FURANO_RT} 的一半。两小时直达，只在 JR 北海道公布的 6 到 9 月日期运行；2027 年日期待公布。`,
  },
  {
    leg: "富良野 → 旭川 → 札幌，普通列车加 Lilac 或 Kamui（第 6 天，冬季）",
    fare: FURANO_WINTER,
    note: `${FURANO_LOCAL} 加 ${ASAHIKAWA_OW}。这是 JR 北海道在薰衣草特快不运行时建议的路线。请预留整个上午，并查好普通列车的衔接时刻。`,
  },
  {
    leg: "札幌 → 新千岁机场（第 7 天）",
    fare: AIRPORT_FARE,
    note: "同一趟快速 Airport 的反方向。",
  },
  {
    leg: "合计，夏季版",
    fare: TOTAL_SUMMER,
    note: "上列所有路段，不含冬季回程。",
  },
  {
    leg: "合计，冬季版",
    fare: TOTAL_WINTER,
    note: "上列所有路段，不含薰衣草特快。两种都低于 ¥18,000。",
  },
];

const days: Day[] = [
  {
    n: 1,
    label: "第 1 天",
    heading: "第 1 天：飞抵，新千岁到札幌的 36 分钟",
    intro:
      "北海道从机场开始，不是从车站开始，第 1 天只要把这件事做好。新千岁到札幌的电车白天每小时六班，按车型 36 到 43 分钟，¥1,230，所以没有接送要安排，也没有票要先拿。到达前值得决定的是：要不要带着行李坐在座位上，以及走出航站楼时手机能不能上网。",
    stops: [
      {
        time: "到达后",
        place: "入境、取行李、连上网络",
        allow: "45 分钟到 1.5 小时",
        getting: "n/a",
        booking: "出发前激活 eSIM，不用到柜台领取",
      },
      {
        time: "一小时内",
        place: "新千岁机场站 → 坐快速 Airport 到札幌",
        allow: "36–43 分钟",
        getting: `JR，成人 ${AIRPORT_FARE}；09:00 到 16:00 每小时六班`,
        booking: "不用，除非想坐 uシート对号座，加 ¥1,000 或无票 ¥800",
      },
      {
        time: "傍晚前",
        place: "在札幌站附近办入住、放行李",
        allow: "45 分钟",
        getting: "步行，选对据点的话大多在地下",
        booking: "要，6 晚中有 4 晚在这里",
      },
      {
        time: "晚上",
        place: "大通公园、札幌电视塔展望台和薄野",
        allow: "2–3 小时",
        getting: "从札幌站一站地铁，或步行约 10 分钟",
        booking: "公园和街道不用；展望台现场买票",
      },
    ],
    book: (
      <>
流量、酒店，以及如果 2 月带托运行李，一个座位而不是站台。电车不用预订，这正是这趟到达方便的地方；预约公路接送则是行李很大或酒店不在车站旁时的选择，要在出发前决定。第 1 天还有一个非交通的决定：如果中午前到达，新千岁直达小樽最快 73 分钟，不用换车，到达当天下午就能好好利用，请看<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">小樽一日游攻略（英文）</Link>了解这如何改变一周。
</>
    ),
    picks: [
      { label: "新千岁接送 →", url: klookFor(newChitoseAirportTransfers.url, LOCALE) },
      { label: "查看 Klook eSIM →", url: klookFor(klookEsim.url, LOCALE) },
      { label: "查看 JR 北海道周游券 →", url: klookFor(jrHokkaidoRailPass.url, LOCALE) },
      { label: "电视塔加藻岩山套票 →", url: klookFor(sapporoTvTowerMoiwaSetTicket.url, LOCALE) },
    ],
  },
  {
    n: 2,
    label: "第 2 天",
    heading: "第 2 天：札幌，以及离开市区的半天",
    intro:
      "札幌是约两百万人的棋盘式城市，本身撑不起两天的景点，它擅长的是当据点，最好的第 2 天是半天在市区、半天在近郊。2 月上旬这另一半已经帮你决定了：雪祭于 2027 年 2 月 4–11 日在三个免费会场举行，晚上看亮灯的大通雪雕是这份行程最划算的事。其他日期，往南不到一小时的定山溪能解决 2 月札幌一天真正需要的：让中段待在室内。",
    stops: [
      {
        time: "上午",
        place: "大通公园、北海道厅旧本厅舍和二条市场",
        allow: "2–3 小时",
        getting: "步行加一两站地铁",
        booking: "不用",
      },
      {
        time: "中午",
        place: "拉面或汤咖喱午餐，然后去札幌啤酒博物馆",
        allow: "2 小时",
        getting: "东丰线，或工厂循环巴士",
        booking: "博物馆不用；试饮当天付费",
      },
      {
        time: "下午",
        place: "定山溪温泉或头大佛，或 2027 年 2 月 4–11 日去 Tsudome 雪祭会场",
        allow: "半天",
        getting: "定铁巴士或预订的巴士；Tsudome 坐东丰线到荣町再换接驳车",
        booking: "导览半天建议预订；雪祭会场免费，不用订",
      },
      {
        time: "晚上",
        place: "黄昏坐藻岩山索道，或雪祭周看亮灯的大通和薄野",
        allow: "2–3 小时",
        getting: "有轨电车再换索道；或大通一站地铁",
        booking: "索道现场买；雪祭什么都不用",
      },
    ],
    book: (
      <>
只要那半天的行程。根据执行委员会常见问题，雪祭三个会场全免费（「全会場無料です」，核查日期：{FESTIVAL_CHECKED}），所以雪祭周的钱花在酒店和一日游而不是门票，<Link href="/zh-cn/guides/attractions/sapporo-snow-festival-tours">札幌雪祭攻略</Link>有详细说明。其他日期请看定山溪的商品：一款是含定铁巴士票的温泉行程，另一款把峡谷和安藤忠雄的头大佛、白色恋人公园排在一起。市区内唯一值得买的票是交通局地铁一日券：平日 {SUBWAY_DAY_PASS}，周末和节假日 {DONICHIKA}，单区 ¥210，坐三四次就回本。
</>
    ),
    picks: [
      { label: "定山溪与头大佛一日 →", url: klookFor(sapporoJozankeiBuddhaDayTour.url, LOCALE) },
      { label: "含巴士定山溪温泉一日 →", url: klookFor(jozankeiHotSpringBusTrip.url, LOCALE) },
      { label: "电视塔加藻岩山套票 →", url: klookFor(sapporoTvTowerMoiwaSetTicket.url, LOCALE) },
      { label: "查看札幌酒店 →", url: klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE) },
    ],
  },
  {
    n: 3,
    label: "第 3 天",
    heading: "第 3 天：小樽，要不要加余市",
    intro:
      "这周最便宜又好玩的一天：快速 Airport 单程 ¥800、约 33 分钟，到一座靠步行而不是排队的港口小城。运河和煤气灯约半小时，堺町通的玻璃工房和旧银行建筑要一两小时，寿司则是专程来的理由。这天有两个决定：要不要待到天黑，因为运河是煤气灯下的风景，不是白天的；以及要不要加余市的 Nikka 蒸馏所，这是一天中唯一预订巴士胜过买电车票的部分。",
    stops: [
      {
        time: "上午",
        place: "札幌 → 小樽，再步行到运河",
        allow: "电车 40 分钟，运河 30–45 分钟",
        getting: `JR 快速 Airport，成人 ${OTARU_FARE}；运河在车站下坡约 10 分钟`,
        booking: "不用，闸机可刷 IC 卡",
      },
      {
        time: "中午",
        place: "堺町通、蒸汽时钟和玻璃工房，然后吃寿司午餐",
        allow: "2–3 小时",
        getting: "从运河步行",
        booking: "周末建议订寿司吧台；其他不用",
      },
      {
        time: "下午",
        place: "余市蒸馏所、天狗山或小樽水族馆",
        allow: "2–3 小时",
        getting: "JR 到余市再走 5 分钟，但 Nikka 提醒班次很少；其他地方坐巴士或行程",
        booking: "Nikka 导览要，免费但要求提前预约",
      },
      {
        time: "黄昏",
        place: `天黑后的运河游船，或 2027 年 2 月 6–13 日的小樽雪灯之路`,
        allow: "船上 40 分钟，加上运营方要求提前的 15 分钟",
        getting: "在中央桥上船，从车站走一小段",
        booking: `热门日期建议预订。成人白天 ${CRUISE_DAY}、夜间 ¥2,000，小学生 ¥500`,
      },
    ],
    book: (
      <>
不是电车，而是小樽以外的那半天。Nikka 的常见问题说蒸馏所导览免费但要求提前预约，交通页也提醒<em>「小樽站与余市站之间班次很少」</em>：时刻表稀疏的终点加上固定时间的预约，正是导览行程能解决的，所以这里把余市行程放在前面。蒸馏所 12 月 23 日到 1 月 7 日闭馆。运河游船也值得先订：运营方票价成人白天 {CRUISE_DAY}、夜间 ¥2,000，40 分钟，天气不好会停航。<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">札幌出发小樽一日游（英文）</Link>攻略有这天的完整版本，也说明为什么值得住在这里。
</>
    ),
    picks: [
      { label: "余市与小樽步行一日 →", url: klookFor(yoichiOtaruWalkingTour.url, LOCALE) },
      { label: "神威岬加余市巴士一日 →", url: klookFor(otaruShakotanYoichiCoachTour.url, LOCALE) },
      { label: "运河游船加手作 →", url: klookFor(otaruCanalCruiseSealCarving.url, LOCALE) },
      { label: "小樽与雪上乐园一日 →", url: klookFor(otaruSnowParkDayTour.url, LOCALE) },
    ],
  },
  {
    n: 4,
    label: "第 4 天",
    heading: "第 4 天：往内陆，旭川、动物园，坐车到富良野",
    intro:
      "从这天起行程不再是城市之旅。札幌到旭川坐特急 Lilac 或 Kamui 1 小时 25 分钟，几乎所有人都是为了旭山动物园而来，它是札幌以外北海道最多人造访的地方。之后不回头，继续坐普通列车往南经美瑛到富良野，住在那一端让第 5 天从巴士行程变成悠闲的早晨。有两个要注意的事实：动物园 12 月 30 日到 1 月 1 日休园；冬季 15:30 关门，最后入园 15:00，比你以为该离开的时间还早。",
    stops: [
      {
        time: "一早",
        place: "札幌 → 旭川",
        allow: "1 小时 25 分钟",
        getting: `特急 Lilac 或 Kamui，全车对号，按 JR 北海道往返票单程 ${ASAHIKAWA_OW}`,
        booking: "要，都是全车对号列车",
      },
      {
        time: "上午到下午中段",
        place: "旭山动物园",
        allow: "3–4 小时",
        getting: "旭川站前的旭川电气轨道巴士",
        booking: `不用。成人 ${ZOO_ADULT}，初中以下免费`,
      },
      {
        time: "下午中段",
        place: "回旭川，再坐普通列车往南",
        allow: "请查时刻表：JR 北海道只公布美瑛到富良野 40 分钟，没有旭川段的时间",
        getting: `JR 普通列车，旭川到富良野 ${FURANO_LOCAL}。这条线不能用 IC 卡`,
        booking: "不用",
      },
      {
        time: "晚上",
        place: "到富良野办入住，在农场附近用餐",
        allow: "当天剩余时间",
        getting: "从车站步行或短途出租车",
        booking: "要，两晚，而且富良野的房间比札幌少得多",
      },
    ],
    book: (
      <>
对号座和富良野的酒店，按这个顺序。Lilac 和 Kamui 全车对号，所以旭川这段要预订，这也是决定周游券的一段：这段、第 6 天富良野回程和小樽往返加起来，已超过 4 日札幌–富良野区域周游券的价格。动物园现场 {ZOO_ADULT}（2027 年 4 月 29 日起 ¥1,400），不用预订，重点是时间。旭山官方页面（核查日期：{SEASON}）：冬季期间 <strong>2026 年 11 月 11 日到 2027 年 4 月 7 日</strong>，<strong>10:30–15:30，最后入园 15:00</strong>，<strong>12 月 30 日到 1 月 1 日休园</strong>。冬天来的真正理由是企鹅散步，要有足够的雪才能开始，动物园说约 12 月下旬到 3 月中旬，11:00 和 14:30，3 月只有 11:00。2026-27 开始日期待动物园官方社交媒体公布。
</>
    ),
    picks: [
      { label: "札幌出发旭山动物园一日 →", url: klookFor(asahiyamaBieiHighlightsTour.url, LOCALE) },
      { label: "富良野与美瑛青池一日 →", url: klookFor(furanoBieiBluePondDayTour.url, LOCALE) },
      { label: "查看富良野酒店 →", url: klookFor(hokkaidoSevenDayStayAreas[2].url, LOCALE) },
      { label: "查看 JR 北海道周游券 →", url: klookFor(jrHokkaidoRailPass.url, LOCALE) },
    ],
  },
  {
    n: 5,
    label: "第 5 天",
    heading: "第 5 天：美瑛和富良野，季节决定的一天",
    intro:
      "七天中，这一天在 2 月和 7 月完全不同，也是内陆住两晚的理由。夏天是四季彩之丘的条纹山丘、富田农场的薰衣草和白金青池，是风景之日，也是 7 月来北海道的理由。冬天是同样的山丘覆盖白雪，更安静空旷，比听起来更好，山谷尽头还有富良野雪场。不管哪个季节，实际重点相同：这里是为开车设计的，巴士很少，以富良野为据点才能拥有早晨，而不是巴士行程的中段。",
    stops: [
      {
        time: "上午",
        place: "富田农场和富良野花田（夏季），或富良野雪场（冬季）",
        allow: "2–3 小时",
        getting: "夏季坐普通列车到中富良野，冬季坐度假村接驳车",
        booking: "农场不用；雪票和租赁要",
      },
      {
        time: "中午",
        place: "富良野蛋包咖喱或农场餐厅午餐",
        allow: "1 小时",
        getting: "步行",
        booking: "不用",
      },
      {
        time: "下午",
        place: "美瑛：四季彩之丘、拼布山丘、白金青池",
        allow: "3–4 小时",
        getting: "普通列车到美瑛再坐公交巴士、观光巴士、出租车路线或预订的巴士",
        booking: "强烈建议以某种方式预订，这是公共交通最弱的一段",
      },
      {
        time: "晚上",
        place: "回到富良野，冬季有非常暗的夜空",
        allow: "当天剩余时间",
        getting: "普通列车或一日游的送达",
        booking: "不用",
      },
    ],
    book: (
      <>
你在美瑛的移动方式，这是这份行程唯一真正困难的交通问题。富田农场公布时间 9:30 到 16:30，并写明「营业时间外不可入场」（核查日期：{OWN}）；农场本身不是问题，问题是没有车时怎么往返农场、山丘和青池。可行的三个选择是观光巴士、出租车路线，或全部走完但放弃清晨光线的札幌出发导览一日游。如果在薰衣草季，请提前用某种方式订好：这是北海道最多人预订的一天，各商品差别正在重点上，也就是是否包含青池、富田农场，以及午餐是否含在价格内。我们不写花期，因为富田农场官网页面没有写。
</>
    ),
    picks: [
      { label: "富良野与美瑛冬季一日 →", url: klookFor(furanoBieiWinterIlluminationTour.url, LOCALE) },
      { label: "美瑛与富良野薰衣草一日（夏季）→", url: klookFor(bieiFuranoLavenderDayTour.url, LOCALE) },
      { label: "富良野、青池与四季彩之丘 →", url: klookFor(furanoBieiBluePondDayTour.url, LOCALE) },
      { label: "富良野与美瑛跟团巴士（夏季）→", url: klookFor(sapporoFuranoBieiLavenderBusTour.url, LOCALE) },
      { label: "查看富良野酒店 →", url: klookFor(hokkaidoSevenDayStayAreas[2].url, LOCALE) },
    ],
  },
  {
    n: 6,
    label: "第 6 天",
    heading: "第 6 天：回札幌，最后一个大行程",
    intro:
      "怎么回去要看季节。夏季富良野薰衣草特快两小时直达札幌，第 6 天早上移动后仍有完整一天。这是季节列车，所以 12 月到 2 月要坐普通列车到旭川再换 Lilac 或 Kamui，整个上午就过去了。下午怎么安排也看季节。冬天最好留在札幌附近：雪上乐园半天，或 2027 年 1 月 30 日到 2 月 23 日的支笏湖冰涛节，16:30 起亮灯，有导览半天和单纯巴士座位两种卖法。夏天则是往南去登别和洞爷湖的长途，温泉谷加火山口湖，一天巴士很长，但这是不加第二个据点就能看到两者的唯一方式。",
    stops: [
      {
        time: "上午",
        place: "富良野 → 札幌：夏季薰衣草特快，冬季普通列车加 Lilac 或 Kamui",
        allow: "2 小时",
        getting: `夏季：特急对号座，按 JR 北海道往返票单程 ${FURANO_OW}。冬季：经旭川 ${FURANO_WINTER}`,
        booking: "要",
      },
      {
        time: "下午",
        place: "滑雪或玩雪一日（冬季），或登别与洞爷湖（夏季）",
        allow: "半天到一整天",
        getting: "札幌的度假村接驳车，或跟团巴士",
        booking: "要，两者都是有固定上车点的预订班次",
      },
      {
        time: "晚上",
        place: "在薄野吃最后一顿晚餐，或 2 月看夜间亮灯的支笏湖冰涛节",
        allow: "2–3 小时",
        getting: "一站地铁；或到湖边的往返巴士座位",
        booking: "薄野不用；湖边巴士要",
      },
      {
        time: "深夜",
        place: "整理行李，确认明天的航班",
        allow: "1 小时",
        getting: "n/a",
        booking: "n/a",
      },
    ],
    book: (
      <>
你选的那个下午，以及夏季时回程的薰衣草特快座位。想改成滑雪的话，<Link href="/zh-cn/guides/attractions/niseko-ski-tours">二世谷滑雪攻略</Link>介绍札幌出发当天往返的雪票加巴士方案。2027 年 1 月 30 日到 2 月 23 日，支笏湖冰涛节是值得知道的替代选择，下面的半日游是最简单的去法。不管订什么，都请看取消条款。北海道下雪时最先受影响的就是这一天：不会关闭免费的雪祭会场，但会封闭出城的道路。
</>
    ),
    picks: [
      { label: "登别、洞爷湖与小樽一日 →", url: klookFor(noboribetsuToyaOtaruDayTour.url, LOCALE) },
      { label: "支笏湖冰涛节 →", url: klookFor(lakeShikotsuIceFestivalHalfDayTour.url, LOCALE) },
      { label: "札幌雪上乐园半日 →", url: klookFor(sapporoSnowParkHalfDayTour.url, LOCALE) },
      { label: "登别、洞爷湖与二世谷一日 →", url: klookFor(noboribetsuToyaNisekoDayTour.url, LOCALE) },
    ],
  },
  {
    n: 7,
    label: "第 7 天",
    heading: "第 7 天：新千岁，以及一件不要做的事",
    intro:
      "北海道离开当天有个特定的陷阱，就是天气。快速 Airport 36 到 43 分钟、¥1,230，白天每小时六班，这段本身很简单，但 2 月新千岁的公路和航空是这趟最容易受影响的部分，这正是不要订第一班的理由。另外，新千岁是很值得早到的机场：国内线航站楼是有电影院和温泉的购物街，多留一小时不会浪费。",
    stops: [
      {
        time: "上午",
        place: "在札幌站和大通一带最后采购",
        allow: "1–2 小时",
        getting: "步行，走地下",
        booking: "不用",
      },
      {
        time: "起飞前三小时",
        place: "札幌 → 新千岁机场",
        allow: "36–43 分钟，另加缓冲时间",
        getting: `快速 Airport，成人 ${AIRPORT_FARE}；uシート对号座加 ¥1,000`,
        booking: "不用，但有托运行李建议订座",
      },
      {
        time: "在机场",
        place: "国内线航站楼购物楼层和美食街",
        allow: "1–2 小时",
        getting: "从航站楼下方的车站步行",
        booking: "不用",
      },
      {
        time: "出发",
        place: "飞往东京、大阪或下一站",
        allow: `按 JAL 的数字到羽田 ${HND_FLIGHT}`,
        getting: "n/a",
        booking: "早已订好，但冬季不要订第一班",
      },
    ],
    book: (
      <>
没有新东西要买，这正是规划得好的最后一天。两件事要确认而不是购买。第一，eSIM 或流量套餐在离开当天要还能用，2 月的航班变更通知是发到手机，不是柜台。第二，如果在东京或大阪转机，北海道这段要留比新干线更多的缓冲：根据 JAL 国内航线资料，羽田到札幌 {HND_FLIGHT}、每天十六班，错过早班还能补救，错过国际线转机就不行了。
</>
    ),
    picks: [
      { label: "新千岁接送 →", url: klookFor(newChitoseAirportTransfers.url, LOCALE) },
      { label: "查看 Klook eSIM →", url: klookFor(klookEsim.url, LOCALE) },
    ],
  },
];

const hokkaidoSameTrip: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "2 月的一周靠通知运转：列车延误、道路封闭和航班变更都先发到手机，旭川和富良野段更需要实时时刻表。",
  },
  {
    label: "新千岁机场接送（包车与拼车）",
    ctaLabel: "查看新千岁接送 →",
    url: klookFor(newChitoseAirportTransfers.url, LOCALE),
    why: `${AIRPORT_FARE} 的快速 Airport 适合多数到达的游客。预约接送适合航班晚到、酒店不在车站旁，或带雪具的团体。`,
  },
  {
    label: "北海道札幌–富良野区域周游券（4 天）",
    ctaLabel: "查看区域周游券 →",
    url: klookFor(sapporoFuranoAreaPass.url, LOCALE),
    why: `这条路线划算的周游券：根据 JR 北海道页面连续 4 天 ${AREA_FURANO}，用在第 3 到第 6 天。`,
  },
  {
    label: "札幌站周边酒店",
    ctaLabel: "在 Klook 查看札幌酒店 →",
    url: klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE),
    why: "6 晚中有 4 晚在这里，这周每一段铁路都从这栋建筑出发。",
  },
];

const faqItems = [
  {
    q: "北海道 7 天够吗？",
    a: `玩半个岛绰绰有余。7 天 6 晚可以不赶地走完札幌、小樽、旭川、美瑛和富良野，也就是本页的路线：札幌四晚、富良野两晚。7 天玩不完整个岛。北海道大约和奥地利一样大，东部的知床、钏路、阿寒湖在旭川之外还要四五小时，南部的函馆又是另一个方向。七天行程想再加其中之一，最后一周都会在火车上。规划原则是两到三晚一个据点：两个据点能好好看西部，三个会很赶，四个就是交通行程而不是度假了。`,
  },
  {
    q: "在北海道需要开车吗？",
    a: `这条路线不需要，只有一个例外。札幌、小樽、旭川和富良野都在 JR 线上，有特急或每小时数班的快速：根据 JR 北海道数字（核查日期：${OWN}），札幌到小樽 ${OTARU_FARE}、约 33 分钟，札幌到旭川 1 小时 25 分钟，札幌到富良野夏季坐季节性的薰衣草特快两小时。冬季这趟车不开，要坐普通列车到旭川再换 Lilac 或 Kamui。札幌市内地铁就够了。例外是第 5 天：美瑛的拼布山丘、四季彩之丘和白金青池散布在农田间，公交巴士很少，这是唯一没车真的不便的一段。没车时可行的是观光巴士、美瑛站出租车路线或导览行程，所以这天的商品是本页最有用的。如果想自驾，有两点提醒：北海道冬季路况是真正的危险，不只是不方便；在城市的四天，车子只是白花钱。`,
  },
  {
    q: "7 天值得买北海道周游券吗？",
    a: `这条路线不值得，算给你看。JR 北海道官方价（核查日期：${OWN}）：北海道周游券连续 5 天 ${PASS_5}、7 天 ${PASS_7}、10 天 ${PASS_10}（到达前购买），车站购买贵 ¥1,000，没有灵活版。看路段：机场单程 ${AIRPORT_FARE}。小樽往返 ¥1,600。札幌到旭川对号座单程 ${ASAHIKAWA_OW}，是往返 ${ASAHIKAWA_RT} 的一半。旭川到富良野普通列车 ${FURANO_LOCAL}。富良野回札幌夏季薰衣草特快 ${FURANO_OW}，是往返 ${FURANO_RT} 的一半；冬季坐普通列车加 Lilac 或 Kamui ${FURANO_WINTER}。合计夏季 ${TOTAL_SUMMER}、冬季 ${TOTAL_WINTER}，都低于 ¥18,000。和 ${PASS_7} 相比，7 日券亏约 ¥10,000。划算的是 4 日札幌–富良野区域周游券 ${AREA_FURANO}：旭川和富良野特急段就要 ¥11,720，还覆盖新千岁、札幌、小樽和美瑛，用在第 3 到第 6 天，加上小樽往返就回本。札幌–登别区域周游券 ${AREA_NOBORIBETSU} 是往南而不是往内陆路线的版本。2026 年 10 月 1 日涨价后 7 日 ¥53,000 的全国版 JR Pass，只玩北海道完全不适用。`,
  },
  {
    q: "北海道住哪里好？",
    a: `7 天两个据点：札幌四晚、富良野两晚。札幌站是让路线顺畅的据点，不是看景的据点：新千岁来的快速 Airport、往旭川的 Lilac 和 Kamui，以及夏季的薰衣草特快都从这栋建筑出发，到大通一站地铁或走有遮蔽的路，在平均最高气温 ${FEB_MAX} 的月份这比什么都重要。第 4、5 晚的富良野常被跳过，但不该跳过：从札幌当天去美瑛和富良野是十小时巴士，从富良野的酒店出发的两个早晨则是这周最好的部分。有两个值得的替换：想看亮灯的运河，把第 3 晚换到小樽，尤其是 2 月上旬小樽雪灯之路期间，${OTARU_FARE}、约 33 分钟回札幌，几乎不花钱。如果是真正的滑雪周，把富良野换成二世谷，因为机场巴士从新千岁直达，也能放雪具。`,
  },
  {
    q: "什么时候去北海道最好？",
    a: `有两个正确答案，也是两种不同的假期。2 月是冬季版，有固定日期：根据执行委员会公告，札幌雪祭 2027 年 2 月 4 到 11 日在三个免费会场举行（核查日期：${FESTIVAL_CHECKED}）；根据小樽观光协会页面，小樽雪灯之路 2027 年 2 月 6 到 13 日（核查日期：${OWN}）；旭山动物园的企鹅散步需要雪道，开始日期由动物园官方社交媒体公布。代价是天气：根据日本气象厅 1991–2020 年札幌平年值，2 月平均最高 ${FEB_MAX}、最低 ${FEB_MIN}、降雪 ${FEB_SNOW}（核查日期：${JMA_CHECKED}）。7 月是夏季版，完全相反：富良野薰衣草、美瑛山丘、长长的白昼，也是日本其他地方难以忍受而北海道舒适的月份。两者之间，5 月有晚开的樱花和积丹海岸，9 月下旬到 10 月有大雪山红叶。要三思的是 11 月，换季时景点会闭馆，旭山动物园也在 11 月 4 到 10 日休园；还有满地泥泞的 4 月。`,
  },
  {
    q: "新千岁机场怎么到札幌？",
    a: `坐快速 Airport，${AIRPORT_FARE}。JR 北海道的数字（核查日期：${OWN}）：09:00 到 16:00 每小时六班，特别快速一班、快速三班、区间快速两班，日文页面写按车型最快 36、37、43 分钟，英文页面写特别快速 33 分钟。车站在国内线航站楼下方，不用预订，闸机可刷 Kitaca、Suica 和 PASMO。4 号车是 uシート对号座，票价外加 ¥1,000，无票 ¥800，冬季普通车厢常被雪具塞满，所以值得。电车还有两件出乎意料的事：直达小樽不用换车，按 JR 北海道最快 73 分钟，早到的话可以直接去；另一个选择是预约公路接送，实际好处是直接到酒店门口，不用带着行李站在雪中的车站。请在出发前预订，并查看商品页的接送条款。`,
  },
  {
    q: "从东京或大阪飞北海道要多久？",
    a: `根据 JAL 国内航线资料（核查日期：${OWN}），羽田到新千岁 ${HND_FLIGHT}、每天十六班，是世界最繁忙的航线之一，持可改签机票的话几乎随到随飞。大阪的部分我们不写数字：核查当天没有航空公司页面公布伊丹或关西到新千岁的时间，比价网站的数字也不是运营方官方，请查你日期的航空公司时刻表。规划上的重点一样：在航程外加上新千岁到札幌的 ${AIRPORT_FARE} 和 36 到 43 分钟，2 月离开时比新干线多留缓冲，最后一天早上不要订第一班。也有铁路可选：北海道新干线到新函馆北斗，不到札幌，7 天行程里单程就要花掉一天。`,
  },
  {
    q: "北海道 7 天交通费要多少？",
    a: `上述路线的铁路票价每人低于 ¥18,000，多数人对这个数字估得不是太高就是太低。按 JR 北海道数字分项（核查日期：${OWN}）：新千岁进札幌 ${AIRPORT_FARE}、小樽往返 ¥1,600、往旭川特急对号座 ${ASAHIKAWA_OW}、旭川到富良野普通列车 ${FURANO_LOCAL}、回程夏季薰衣草特快 ${FURANO_OW} 或冬季经旭川 ${FURANO_WINTER}、回机场 ${AIRPORT_FARE}，合计夏季 ${TOTAL_SUMMER}、冬季 ${TOTAL_WINTER}。札幌市内地铁单区 ¥210，交通局一日券平日 ${SUBWAY_DAY_PASS}、周末和节假日 ${DONICHIKA}，坐三四次回本。这个数字不包含、但真正决定预算的是：往返机票、六晚住宿，以及公共交通确实不便的美瑛和余市导览行程。这三项最值得比较，而且都按日期而定，所以本页都不标价。`,
  },
  {
    q: "这份行程可以反过来走，或从新千岁往外走吗？",
    a: `可以，其中一种反向比原版更好。如果是滑雪周，到达后直接坐度假村巴士去二世谷或留寿都：从新千岁直达，可放雪具加每人一件行李，快速 Airport 加小樽换车做不到。在那里住两三晚，再经札幌玩城市那一半。另一种反向是先内陆后城市，这不太理想，原因很平常：往旭川和富良野的特急全车对号，班次也比机场快速少，排在可能遇到航班延误的到达日，是一周中唯一的时间风险。真要先走内陆，就把 4 日区域周游券用在旅行前段，因为贵的路段在那里。`,
  },
  {
    q: "只有 5 天，或想玩 10 天呢？",
    a: `5 天就删掉第 6 天和札幌一晚：到达、札幌一天、小樽、旭川加富良野、离开，保留大家来的两个重点，删掉可有可无的大行程。这时 5 日北海道周游券 ${PASS_5} 比 7 日版更不划算，4 日区域周游券仍能回本。10 天的话，不要在西部加第四个据点，要加东部。10 天大约是知床或阿寒湖能成为旅行一部分、而不只是长途火车的分界，也是 10 日周游券 ${PASS_10} 开始值得计算的时候，因为东部路段又长又贵。日本 14 天行程用全国路线说明同样逻辑，日本冬季行程则把北海道当成 2 月全国旅行的一段。`,
  },
];

const TITLE = "北海道7日游（2027）：每日路线与周游券算法";
const DESC =
  "北海道7日游怎么排：每天一张表，走札幌、小樽、旭川、美瑛和富良野，并附两个住宿据点、航班信息与铁路周游券的完整算法说明。";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function Hokkaido7DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>
更新于 {monthLabel(updated.iso, LOCALE)}
</p>
          <h1 className={styles.heroTitle}>
北海道7日游：<br />每日路线安排
</h1>
          <p className={styles.heroSubtitle}>
两个据点、六晚，每天一张表，加上用 JR 北海道票价算的周游券，以及 2 月和 7 月版本对照。
</p>
          <div className={styles.heroBadges}>
            {[`更新于 ${monthLabel(updated.iso, LOCALE)}`, "每天一张表", "运营方票价，附核查日期", "冬季与夏季版本"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
                <Disclosure />

        <WinterBookingTop
          heading={"北海道7日游该订哪些一日游？"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
如果这周碰上 2027 年 2 月 4–11 日的札幌雪祭或 2 月 6–13 日的小樽雪灯之路，请先订酒店。一日游在 12 月 31 日前订好，Nikka 蒸馏所则等开放预约的四周前再订。
</>
          }
          tours={[
            {
              title: "富良野与美瑛一日游，冬季亮灯路线",
              url: klookFor(furanoBieiWinterIlluminationTour.url, LOCALE),
              price: null,
              duration: "约 10 小时",
              departs: "札幌",
            },
            {
              title: "札幌出发旭山动物园、美瑛青池与精灵露台一日游",
              url: klookFor(asahiyamaBieiHighlightsTour.url, LOCALE),
              price: "约 US$55 起",
              duration: "一整天",
              departs: "札幌",
            },
            {
              title: "札幌出发余市与小樽步行一日游",
              url: klookFor(yoichiOtaruWalkingTour.url, LOCALE),
              price: null,
              duration: "见商品页",
              departs: "札幌",
            },
          ]}
        />

                <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>
快速解答
</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
路线
</p>
                <p className={styles.verdictStatValue}>
札幌 · 小樽 · 旭川 · 美瑛 · 富良野
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
据点
</p>
                <p className={styles.verdictStatValue}>
札幌 4 晚、富良野 2 晚
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
整周铁路票价
</p>
                <p className={styles.verdictStatValue}>
每人低于 ¥18,000
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
要买 7 日全岛周游券吗？
</p>
                <p className={styles.verdictStatValue}>
不用，4 日区域周游券才划算
</p>
              </div>
            </div>
                        <p className={styles.verdictText}>
这份<strong>北海道7日游</strong>用<strong>两个据点、六晚</strong>：<strong>札幌四晚</strong>、<strong>富良野两晚</strong>，路线是<strong>札幌 → 小樽 → 旭川 → 美瑛和富良野 → 札幌</strong>。距离短到全程可坐火车，按 JR 北海道数字：新千岁到札幌 <strong>{AIRPORT_FARE}</strong>、<strong>36 到 43 分钟</strong>；札幌到小樽 <strong>{OTARU_FARE}</strong>、<strong>约 33 分钟</strong>；札幌到旭川坐对号座 Lilac 或 Kamui <strong>1 小时 25 分钟</strong>；富良野回札幌夏季坐薰衣草特快<strong>两小时</strong>，冬季坐普通列车加 Lilac 或 Kamui。加起来整周铁路票价每人<strong>低于 ¥18,000</strong>，所以<strong>这条路线买 {PASS_7} 的 7 日北海道周游券不划算</strong>，4 日<strong>札幌–富良野区域周游券 {AREA_FURANO}</strong> 才划算。公共交通唯一走不好的是<strong>美瑛</strong>，<strong>2 月</strong>和 <strong>7 月</strong>完全不同的是<strong>富良野</strong>。票价与周游券价格核查日期：{OWN}。
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
查看札幌酒店 →
</KlookLink>
              <KlookLink href={klookFor(jrHokkaidoRailPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
查看 JR 北海道周游券 →
</KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label={"同一趟旅行要订的"}
          heading={"北海道一周要一起订什么"}
          intro={"七天之外还有三件事：传递所有天气和时刻通知的流量、机场交通，以及这条路线划算的铁路周游券。Klook 拦截自动查价，请打开商品页查看你的日期的价格。"}
          items={hokkaidoSameTrip}
        />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
一周的架构
</span>
          <h2 className={styles.sectionTitle}>
北海道 7 天住哪里好？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>两个据点，不是四个。</strong>北海道一周最常见的错误，是像本州一样每两晚换酒店，在这么大的岛上就等于一周都在火车上。札幌四晚加富良野两晚就能不赶地走完下面所有内容，表中两个替换选项是唯一值得做的变动。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["据点", "晚数", "为什么住这里"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {baseRows.map((row) => (
                    <tr key={row.base}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.base}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.nights}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
冬季或夏季
</span>
          <h2 className={styles.sectionTitle}>
什么时候去北海道最好？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>2 月和 7 月，而且是两种不同的假期。</strong>一周的架构相同，但七天中有四天内容不同，所以分开列出。2 月有固定日期可依循：<strong>札幌雪祭 2027 年 2 月 4 到 11 日</strong>、<strong>小樽雪灯之路 2027 年 2 月 6 到 13 日</strong>；代价是根据日本气象厅 1991–2020 年札幌平年值，平均最高 <strong>{FEB_MAX}</strong>、全月降雪 <strong>{FEB_SNOW}</strong>。7 月有富良野薰衣草和长长的白昼，是日本其他地方难受而北海道舒适的月份。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["日期", "冬季版（12–3 月）", "夏季版（6–8 月）"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.day}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.day}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.winter}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.summer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
雪祭日期出自执行委员会公告，于 {FESTIVAL_CHECKED} 为<Link href="/zh-cn/guides/attractions/sapporo-snow-festival-tours" style={{ color: "var(--text)", fontWeight: 600 }}>札幌雪祭攻略</Link>核查；小樽雪灯之路日期出自小樽观光协会 2027 年页面（核查日期：{OWN}），页面写明日期，并表示详情确定后公布。气温和降雪平年值出自日本气象厅（核查日期：{JMA_CHECKED}）。要三思的两个月是景点换季闭馆的 11 月（旭山动物园 11 月 4 到 10 日也休园）和 4 月。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
周游券算法
</span>
          <h2 className={styles.sectionTitle}>
7 天值得买北海道周游券吗？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>这条路线不值得，4 日区域周游券才值得。</strong>这是本页最有用的数字，所以列出完整算法，不只给结论。下列票价都是 JR 北海道官方数字，核查日期 {OWN} 或 {SEASON}，两段特急是运营方在模范路线页公布的往返票价的一半。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["路段", "成人票价", "备注"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
<strong>那该买哪一张？</strong><strong>北海道周游券</strong>到达前购买连续 5 天 {PASS_5}、7 天 <strong>{PASS_7}</strong>、10 天 {PASS_10}，车站购买贵 ¥1,000，儿童半价，没有灵活版，所以和低于 ¥18,000 的票价相比，7 日券亏约 ¥10,000。连续 4 天 <strong>{AREA_FURANO}</strong> 的<strong>札幌–富良野区域周游券</strong>才划算：旭川和富良野特急段就要 ¥11,720，还覆盖新千岁、札幌、小樽和美瑛，用在第 3 到第 6 天，加上小樽往返就回本（不含 Tomamu）。<strong>札幌–登别区域周游券</strong> {AREA_NOBORIBETSU} 是往南路线的版本，覆盖新千岁、札幌、小樽和登别，不含洞爷。全国版 <strong>JR Pass</strong> 在 2026 年 10 月 1 日涨价后 7 天 ¥53,000、14 天 ¥84,000、21 天 ¥105,000，不适合只玩北海道；何时适合请看 <Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR Pass 攻略（英文）</Link>。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jrHokkaidoRailPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
查看 JR 北海道周游券 →
</KlookLink>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
新千岁接送 →
</KlookLink>
            <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷度假村接驳 →
</KlookLink>
          </div>
        </section>

        <p className={styles.bodyText} style={{ marginBottom: "2.5rem" }}>
下面七天每天都有一张表：时段、地点、预留时间、交通方式、是否要预订，下方是当天的商品。如果旅行形式不同，<Link href="/zh-cn/guides/attractions/japan-winter-itinerary">日本冬季行程</Link>是含 2 月北海道版本的 12 天全国路线，<Link href="/guides/attractions/japan-10-day-itinerary" hrefLang="en">日本 10 天行程（英文）</Link>和<Link href="/guides/attractions/japan-14-day-itinerary" hrefLang="en">日本 14 天行程（英文）</Link>走东京到京都大阪，<Link href="/zh-cn/guides/attractions/sapporo-snow-festival-tours">札幌雪祭攻略</Link>则是完全围绕 2 月日期的版本。经东京回程的话，还可以加其他冬季行程：<Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">东京出发 GALA 汤泽滑雪（英文）</Link>滑一天雪、<Link href="/zh-cn/guides/attractions/jigokudani-snow-monkey-tour">地狱谷雪猴行程</Link>看泡温泉的猴子，或晚上看<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">东京灯饰（英文）</Link>。本州的雪乡则请看<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山与白川乡行程（英文）</Link>。
</p>

                {days.map((day) => (
          <section key={day.n} className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>{day.label}</span>
            <h2 className={styles.sectionTitle}>{day.heading}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{day.intro}</p>
            <div className={styles.tableWrap}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {["时段", "地点", "预留时间", "交通方式", "要预订吗？"].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {day.stops.map((row) => (
                      <tr key={row.place}>
                        <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
              <strong>
第 {day.n} 天要订什么。
</strong> {day.book}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              {day.picks.map((pick) => (
                <KlookLink
                  key={pick.url}
                  href={pick.url}
                  target="_blank"
                  rel="sponsored noopener"
                  className={styles.pickCta}
                >
                  {pick.label}
                </KlookLink>
              ))}
            </div>
          </section>
        ))}

        <p
          className={styles.bodyText}
          style={{ marginTop: "-1.5rem", marginBottom: "3.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}
        >
七张表的「预留时间」是我们的规划估计，不是运营方数字。所有车程和票价都是运营方官方：机场、小樽、旭川和富良野段出自 JR 北海道，旭山动物园 {ZOO_ADULT} 门票和冬季时间出自旭川市，运河游船票价出自运营方官网，富田农场时间出自富田农场，余市蒸馏所信息出自 Nikka，均于 {OWN} 核查。雪祭日期和札幌地铁一日券出自<Link href="/zh-cn/guides/attractions/sapporo-snow-festival-tours" style={{ color: "var(--text)", fontWeight: 600 }}>札幌雪祭攻略</Link>，核查日期：{FESTIVAL_CHECKED}。
</p>

                <KlookStayAreas
          heading={"上述据点的酒店搜索"}
          intro={"两据点一周的四个搜索，含两个替换选项。在 2 月高峰明显的岛上，还有哪些房间、多少钱要看日期，所以每个据点都链接到 Klook 酒店搜索，每项说明讲的是上表的交通理由，而不是景观。"}
          areas={hokkaidoSevenDayStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "七晚中的三四晚，因为这条路线每个内陆和海岸行程都从这里出发：新千岁来的快速 Airport、往旭川的 Lilac 和 Kamui，以及夏季的薰衣草特快都从这栋建筑出发，到大通一站地铁或走有遮蔽的路。", area: "札幌站" }, { why: "想看亮灯的运河，以及一日游游客离开后的小樽雪灯之路，值得住一晚而不是当天往返。按 JR 北海道数字回札幌 ¥800、约 33 分钟，搬过来几乎不花钱。", area: "小樽站" }, { why: "让内陆段从十小时巴士变成两个悠闲日子的据点：在晨光中看富田农场和美瑛山丘，而不是在一日游的尾段，夏季坐薰衣草特快回札幌两小时。", area: "富良野" }, { why: "只适合以雪为主的一周：缆车就在门口，能放雪具的巴士从新千岁直达，所以滑雪版路线到达当天不经过札幌。", area: "二世谷" }] as Partial<typeof item>[])[i]))}
        />

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3rem" }}>
有一个时间提醒适用于这四处。这座岛最忙的 2 月那周是一年前就公布的固定日期，雪祭执行委员会在 2026 年 2 月 11 日公布了 2027 年日期，所以 2 月上旬的房间是没有备选的预订，札幌订满时标准答案是小樽。官方没有公布入住率，所以我们也不写。
</p>

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"这条路线实际要订的四天"}
          intro={"七天中有四天可以不预订，三天不行。这里列出没有预订真的很难的三天：美瑛和富良野、小樽加余市，以及旭川动物园，再加上有多余一天时往南的长途行程。"}
          tours={[withKlookLocale(furanoBieiBluePondDayTour, LOCALE, { title: "札幌出发富良野、美瑛青池与四季彩之丘一日游", desc: "包含白金青池和四季彩之丘花田的内陆行程，含拖拉机游园和薰衣草枕手作" }), withKlookLocale(yoichiOtaruWalkingTour, LOCALE, { title: "札幌出发余市与小樽步行一日游", desc: "有英语助理的小团电车与巴士一日：Nikka 余市蒸馏所、酒造和小樽运河游船，步行约 4 公里" }), withKlookLocale(asahiyamaBieiHighlightsTour, LOCALE, { title: "札幌出发旭山动物园、美瑛青池与精灵露台一日游", desc: "从札幌前往旭川动物园、美瑛青池和精灵露台的一日巴士，有多条路线，冬季可加购雪地摩托" }), withKlookLocale(noboribetsuToyaOtaruDayTour, LOCALE, { title: "札幌出发登别、洞爷湖与小樽一日游", desc: "市区南方和西方的全景跟团行程，适合多一天、又不想在大通度过第四晚的雪祭旅行" })]}
        />

                <Related items={[{ href: "/guides/transport/hokkaido-rail-pass", title: "北海道周游券（2026）：价格与是否划算 （英文）" }, { href: "/zh-cn/guides/attractions/niseko-ski-tours", title: "二世谷滑雪（2027）：接送、教练课与四大区域" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出发小樽一日游（2027）：¥800，JR 33 分钟 （英文）" }, { href: "/zh-cn/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭（2027）：2/4–11 三会场免费，该订什么" }, { href: "/zh-cn/guides/attractions/japan-winter-itinerary", title: "日本冬季行程（2027）：12 天路线逐日安排" }, { href: "/guides/money/best-travel-insurance-japan", title: "日本旅行保险推荐 2026：谁需要什么 （英文）" }, { href: "/guides/money/japan-ski-travel-insurance", title: "日本滑雪旅行保险（2027）：该保什么 （英文）" }, { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略（2026）：价格、范围与是否划算 （英文）" }, { href: "/zh-cn/guides/esim/best-esim-japan", title: "日本 eSIM 推荐（2026）：运营商、价格与怎么选" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
两个据点、六晚，铁路低于 ¥18,000
</h2>
            <p className={styles.ctaBannerDesc}>
铁路段几乎不用预订。酒店和三天导览行程要订，而 2 月上旬酒店是这周唯一没有备选的部分。
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
查看札幌酒店 →
</KlookLink>
              <KlookLink href={klookFor(hokkaidoSevenDayStayAreas[2].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
查看富良野酒店 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
