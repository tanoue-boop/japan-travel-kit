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
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  jrHarukaUrl,
  osakaAmazingPass,
  osakaCastleNishinomaruWalkingTour,
  osakaCastleSameDayCards,
  osakaCastleTicket,
  osakaCastleTripPrep,
  osakaCastleUmedaTonboriDayTour,
  osakaSkyVistaHalfDayBusTour,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/osaka-castle-tickets) section by section as of
// 2026-11-26 (task-jtk-20261126-TR02): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (osakacastle.net, osaka-info.jp and
// osaka-amazing-pass.com, read 23 Oct 2026; price table re-read 23 Nov 2026); nothing is added.
// Title term: 大阪城天守阁门票 — osaka-info.jp's Simplified Chinese (zh-CHS) pages call the keep
// 大阪城天守阁 and the boat 大阪城御座船, and Simplified Chinese guides read by Singapore and
// Malaysia readers search 大阪城天守阁门票 / 大阪城御座船, so both sit in the title.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/osaka-castle-tickets";
const TITLE = "大阪城天守阁门票 2026：票价、开放时间与御座船";
const H1 = "大阪城天守阁门票 2026：票价、开放时间与周游卡免费设施";
const DESC =
  "大阪城天守阁门票成人 ¥1,200、大学生与高中生 ¥600，初中生及以下免费。开放 9:00–18:00，最后入场 17:30。附城内四项收费设施与周游卡。";

/** Every figure on this page was read on this date (the English page's CHECKED_ISO). */
const CHECKED_ISO = "2026-10-23";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const LAST_CHECKED_ISO = "2026-11-23";
// The pass price is owned by lib/attraction-prices.ts, shared with the English page.
const PASS_1_DAY = priceLabel(PRICES.osakaAmazingPass.adult, LOCALE);

const TICKET_URL = klookFor(osakaCastleTicket.url, LOCALE);
const PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const WALK_URL = klookFor(osakaCastleNishinomaruWalkingTour.url, LOCALE);
const DAY_TOUR_URL = klookFor(osakaCastleUmedaTonboriDayTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  {
    tier: "成人",
    price: "¥1,200",
    what: "可参观天守阁 8 层，同一天也可进入丰臣石垣馆",
  },
  {
    tier: "大学生与高中生",
    price: "¥600",
    what: "购票时需出示学生证，海外学生需出示 ISIC 国际学生证。没有证件按成人票价收费",
  },
  {
    tier: "初中生及以下",
    price: "免费",
    what: "需出示年龄证明，学生手册、保险证或护照均可",
  },
  {
    tier: "团体票（15 名以上付费者）",
    price: "¥1,080 / ¥540",
    what: "分别为成人与学生票价，免费对象仍然免费",
  },
  {
    tier: "大阪周游卡持有者",
    price: "免费",
    what: "每个使用日可入场 1 次，这个设施没有时间段限制",
  },
];

const parkRows = [
  {
    place: "大阪城天守阁（主楼）",
    fee: "成人 ¥1,200",
    hours: "9:00 – 18:00（最后入场 17:30）",
    pass: "周游卡免费",
    note: "门票包含丰臣石垣馆。12 月 28 日至 1 月 1 日闭馆",
  },
  {
    place: "西之丸庭园",
    fee: "¥300（樱花季 ¥350）",
    hours: "3–10 月 9:00 – 17:00，11–2 月 9:00 – 16:30（闭园前 30 分钟停止入场）",
    pass: "周游卡免费",
    note: "可以拍到明信片角度天守阁的草坪，种有约 300 棵樱花树。周一与年末年初休园",
  },
  {
    place: "大阪城御座船（Gozabune）",
    fee: "成人（16 岁以上）¥1,800、中小学生 ¥900、65 岁以上 ¥1,200、学龄前儿童免费",
    hours: "10:00 – 16:30（末班）",
    pass: "周游卡免费，但需要在现场换取船票",
    note: "绕内护城河一圈约 20 分钟。初中生及以下儿童不能单独乘船",
  },
  {
    place: "大阪城橹（Yagura）",
    fee: "高中生及以上 ¥900",
    hours: "10:00 – 16:30（最后入场 16:00）",
    pass: "周游卡免费",
    note: "被列为重要文化财产的城橹，看的是城防内部而不是天守阁",
  },
  {
    place: "海洋堂 Figure Museum（KAIYODO），位于 MIRAIZA OSAKA-JO",
    fee: "成人 ¥1,000 / 儿童 ¥500",
    hours: "9:30 – 17:30（最后入场 17:00）",
    pass: "周游卡免费",
    note: "位于天守阁脚下的旧陆军司令部大楼内，MIRAIZA OSAKA-JO 建筑本身可以免费进入",
  },
];

const accessRows = [
  {
    station: "JR 大阪城公园站（大阪环状线）",
    walk: "约 15–20 分钟",
    note: "游客最常用的车站，经过大阪城音乐厅一侧进入，途中有公园内的咖啡餐饮区",
  },
  {
    station: "JR / 大阪地铁 森之宫站",
    walk: "约 15–20 分钟",
    note: "地铁 1 号与 3-B 号出口。从南侧进入，比大阪城公园站那条路安静",
  },
  {
    station: "大阪地铁 谷町四丁目站",
    walk: "约 15–20 分钟",
    note: "谷町线 1-B 号出口、中央线 9 号出口。从西侧经大手门进入，这是历史上的正门路线",
  },
  {
    station: "大阪地铁 / 京阪 天满桥站",
    walk: "约 15–20 分钟",
    note: "地铁谷町线 3 号出口。从北侧进入，离御座船乘船处最近",
  },
  {
    station: "大阪地铁 大阪商务园区站（OBP）",
    walk: "约 15–20 分钟",
    note: "长堀鹤见绿地线 1 号出口，住在 OBP 高楼一带的话比较方便",
  },
];

const whoFor = [
  {
    title: "以下情况，9:00 去",
    desc: `你想参观天守阁又不想排队。天守阁 9:00 开门，官方网站提醒，人多时可能在 17:30 截止前就提前限制入场，所以开门的这一段时间是唯一不会被限制的时间。上午参观完，整个下午还可以留给庭园和御座船。${CHECKED}核查。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "以下情况，下午去",
    desc: "你更看重公园而不是博物馆。园区免费，天守阁 18:00 关门后仍可游览，天黑后天守阁有夜间亮灯，黄昏时分从大手门走进来是整个景区最好的拍照角度。只是要注意城内几处更早关门的设施：御座船 16:30 停止，城橹也是 16:30。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "以下情况，买周游卡",
    desc: `你不只参观天守阁。大阪城公园内五个收费设施的现场票价，成人合计 ¥5,200，而持一日 ${PASS_1_DAY} 的大阪周游卡五个都免费，还包含地铁。天守阁、御座船和海洋堂 Figure Museum 三项合计 ¥4,000，单这三项就超过周游卡价格。设施列表于${CHECKED}核查，周游卡价格于 2026 年 11 月 9 日核查。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
        <path d="M12 6v12" strokeDasharray="2 3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "购票前，先算清要去几个收费设施",
    desc: `天守阁是 ¥1,200，大多数人看到这里就停了。但同一片城墙内还有四个收费设施：西之丸庭园、大阪城御座船、大阪城橹和 MIRAIZA OSAKA-JO 里的海洋堂 Figure Museum，成人全部加起来是 ¥5,200。决定买哪种票的，是你想去其中两个还是全部五个，而不是天守阁本身。${CHECKED}核查。`,
  },
  {
    title: "三个或以上，买周游卡更便宜",
    desc: `五个设施持大阪周游卡都可免费入场，周游卡一日 ${PASS_1_DAY}（官方价格，2026 年 11 月 9 日核查）。天守阁加御座船现场票价 ¥3,000，天守阁加庭园加御座船 ¥3,300，两者都略低于周游卡价格，要把当天的地铁车费也算进去才划算。天守阁、御座船和海洋堂 Figure Museum 三项合计 ¥4,000，不出城就超过周游卡价格。`,
  },
  {
    title: "只去天守阁的话，提前买单张门票",
    desc: "天守阁有自己的网上售票网站，而 Klook 的商品是用中文页面和日本境外发行的银行卡购买同一张门票的购票渠道。两者都不是必须的，售票处当天也卖票，但提前购票可以在手机里拿到入场码，不用在门口排队，春季周末尤其有用。付款前请确认你自己订单上显示的取消期限。",
  },
  {
    title: "御座船当天在现场购票",
    desc: "御座船是这里唯一不能提前办好的项目：船票在天守阁北侧、极乐桥西边的售票亭销售，周游卡持有者也在同一个柜台换取标有乘船时间的乘船券。座位有限，只能在乘船券上印的时间登船，所以要在上午早些时候换票，不要等到 16:00。",
  },
  {
    title: "天守阁留 1 小时，城墙一带再留 1 小时",
    desc: `大阪官方观光网站估计参观天守阁约需 60 分钟，8 层展览加上电梯直达顶层，这个时间合适。周围的公园要另外留 1 到 2 小时：护城河、大手门一路和丰臣时代的石垣都不收费，也最值得花时间。所需时间于${CHECKED}核查。`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "大阪城天守阁门票多少钱？",
    a: `天守阁（大阪城天守阁博物馆）成人门票 ¥1,200。大学生与高中生出示学生证 ¥600，初中生及以下出示年龄证明免费。15 名以上付费者的团体为 ¥1,080 和 ¥540。门票同一天也可进入丰臣石垣馆。海外学生需出示 ISIC 国际学生证，没有证件按成人票价收费。以上均于${CHECKED}在 osakacastle.net 与大阪官方观光网站核查。`,
  },
  {
    q: "大阪城天守阁的开放时间是几点？",
    a: `天守阁开放时间为 9:00 至 18:00，售票与最后入场为 17:30，即闭馆前 30 分钟。12 月 28 日至 1 月 1 日闭馆。官方网站上有一点在人多的日子很重要：游客多时，可能在 17:30 之前就提前限制入场，所以樱花季 17:00 才到很可能进不去。公园本身没有大门，也没有关门时间。${CHECKED}核查。`,
  },
  {
    q: "参观大阪城需要多长时间？",
    a: `大阪官方观光网站估计天守阁约需 60 分钟，这个数字是准确的：8 层展览，有电梯到顶层观景台，按一个方向走完。城内园区至少再留 1 小时：外护城河与内护城河、大手门一路和丰臣时代的石垣都免费，也是这里值得专程来的原因。如果还要去庭园和坐御座船，就把大阪城当作半天行程来安排。`,
  },
  {
    q: "大阪城公园内还有哪些设施要收费？",
    a: `天守阁以外还有四个，正是它们让一次大阪城游览从 ¥1,200 变成 ¥5,200。西之丸庭园 ¥300（樱花季 ¥350），3 至 10 月 9:00–17:00，11 至 2 月 9:00–16:30，周一休园。大阪城御座船成人（16 岁以上）¥1,800、中小学生 ¥900、65 岁以上 ¥1,200、学龄前儿童免费，运行时间 10:00 至 16:30。大阪城橹高中生及以上 ¥900，10:00–16:30，最后入场 16:00。MIRAIZA OSAKA-JO 内的海洋堂 Figure Museum 成人 ¥1,000、儿童 ¥500，9:30–17:30。公园内其他地方，包括护城河、城门、石垣和 MIRAIZA OSAKA-JO 建筑本身，都免费。票价于${CHECKED}核查。`,
  },
  {
    q: "大阪周游卡可以免费进大阪城天守阁吗？",
    a: `可以，公园内另外四个收费设施也可以。周游卡运营方的设施列表包括大阪城天守阁、西之丸庭园、大阪城橹、MIRAIZA OSAKA-JO 的海洋堂 Figure Museum 和御座船，成人现场票价合计 ¥5,200，而一日周游卡为 ${PASS_1_DAY}。梅田蓝天大厦只在 15:00 前免费，大阪城的设施则都没有时间段限制，但御座船需要在自己的柜台用周游卡换取标有时间的乘船券。设施列表于${CHECKED}核查。`,
  },
  {
    q: "只去大阪城的话，买大阪周游卡划算吗？",
    a: `去三个收费设施，或者两个设施加上一整天坐地铁，才划算。周游卡为 ${PASS_1_DAY}（官方价格，2026 年 11 月 9 日核查）。天守阁（¥1,200）加御座船（¥1,800）现场票价 ¥3,000，再加庭园是 ¥3,300，两者都不到周游卡价格，要算上周游卡同样包含的大阪地铁车费才划算。天守阁、御座船和海洋堂 Figure Museum（¥1,000）合计 ¥4,000，直接超过周游卡价格。只去天守阁则不划算。大阪周游卡攻略（英文）用同样的方法计算了整个大阪市的情况。`,
  },
  {
    q: "怎么去大阪城？",
    a: `有五个车站可以到，走到天守阁都要大约 15 到 20 分钟，因为公园很大，天守阁在正中间，没有近路。最常用的是大阪环状线的 JR 大阪城公园站；森之宫站在南侧，JR 和地铁都有；大阪地铁谷町四丁目站（谷町线 1-B 号出口、中央线 9 号出口）经大手门进入，这是历史上的正门路线；地铁和京阪的天满桥站在北侧，离御座船最近；大阪商务园区站适合住在 OBP 高楼一带的人。市营巴士停靠大阪城大手前和马场町，河上游船停靠大阪城港。车站与出口于${CHECKED}在 osakacastle.net 核查。`,
  },
  {
    q: "什么时候去大阪城人最少？",
    a: `早上去，并且避开 4 月上半月。天守阁 9:00 开门，官方网站说明人多时可能在 17:30 截止前限制入场，这说明人最多的是中午前后。春季的高峰期很明确，可以特意避开，也可以特意去：2026 年西之丸庭园的樱花季夜间开放是 3 月 20 日至 4 月 12 日，开放到 21:00，最后入场 20:30，门票 ¥350。那两周是这里最美的时候，也是人最多的时候，而且多出很多。避开这段时间的平日早上，人少很多。`,
  },
  {
    q: "大阪城天守阁门票需要提前购买吗？",
    a: "不需要。没有入场时段，也不会售罄，天守阁售票处在开放时间内全天销售当天门票。提前购票是为了方便：天守阁有自己的网上售票网站，Klook 的商品则可以用中文页面和日本境外发行的银行卡购买同一张门票，并拿到扫码入场的二维码。真正不能拖到傍晚的只有两项：座位有限、需要按乘船券时间登船的御座船，以及需要凑齐人数和固定出发时间的导览团。",
  },
  {
    q: "带孩子去大阪城合适吗？",
    a: "从票价看很合适：初中生及以下出示年龄证明免费，所以天守阁是大阪市内家庭出游最便宜的主要景点之一。实际要注意的是距离和楼梯。每个车站走到天守阁都要 15 到 20 分钟，博物馆有 8 层，电梯经常排队，盛夏时开阔的步道几乎没有树荫。公园弥补了这些，这里是大阪市中心少有的可以让孩子随意奔跑的地方。孩子最容易记住的是御座船，但初中生及以下儿童必须有大人陪同才能乘船。",
  },
  {
    q: "下雨天去大阪城合适吗？",
    a: "一部分合适，界线很清楚。天守阁是 8 层的室内博物馆，¥1,200 的门票不受天气影响，MIRAIZA OSAKA-JO 的海洋堂 Figure Museum 也在室内。下雨时其他项目就不适合了：御座船在露天的护城河上行驶，西之丸庭园是一片草坪，城橹要穿过空地才能到，从每个车站走过来的 15 到 20 分钟路程也没有遮挡。下雨天只买天守阁门票，护城河和庭园留到其他日子。",
  },
];

// The same seven cards as the English page (osakaCastleSameDayCards), in the same order, with
// the Klook product switched to the zh-CN storefront.
const sameDayCards: KlookSameDayCard[] = [
  withKlookLocale(osakaCastleSameDayCards[0], LOCALE, {
    kind: "周游卡",
    label: "大阪周游卡（Osaka Amazing Pass）",
    ctaLabel: "在 Klook 查看大阪周游卡 →",
    why: "天守阁、西之丸庭园、御座船、城橹和海洋堂 Figure Museum 都在周游卡范围内，往返地铁也包含在内。大阪海游馆不包含。",
  }),
  withKlookLocale(osakaCastleSameDayCards[1], LOCALE, {
    kind: "导览",
    label: "大阪城与西之丸庭园半日徒步导览",
    ctaLabel: "查看大阪城徒步导览 →",
    why: "半日拼团导览，游览大阪城园区和单独收费的西之丸庭园（天守阁下方的草坪）。",
  }),
  withKlookLocale(osakaCastleSameDayCards[2], LOCALE, {
    kind: "美食导览",
    label: "道顿堀白天美食导览",
    ctaLabel: "查看美食导览 →",
    why: "商品页显示在道顿堀 11:00 至 14:00 进行：9:00 参观天守阁，然后边走边吃午餐。",
  }),
  withKlookLocale(osakaCastleSameDayCards[3], LOCALE, {
    kind: "游船",
    label: "道顿堀游船",
    ctaLabel: "查看道顿堀游船 →",
    why: "从太左卫门桥码头出发、经过格力高广告牌的 20 分钟游船，适合安排在从大阪城开始的一天的傍晚。",
  }),
  withKlookLocale(osakaCastleSameDayCards[4], LOCALE, {
    kind: "酒店",
    label: "难波周边酒店",
    ctaLabel: "在 Klook 查看难波酒店 →",
    why: "从难波可以步行到道顿堀，去关西机场的南海线也从这里出发。",
  }),
  withKlookLocale(osakaCastleSameDayCards[5], LOCALE, {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "入场码、车站出口和御座船售票亭的地图都在手机上，而穿过这个公园要 15 到 20 分钟。",
  }),
  withKlookLocale(osakaCastleSameDayCards[6], LOCALE, {
    kind: "机场列车",
    label: "南海 Rapi:t 特急（关西机场 ⇄ 难波）",
    ctaLabel: "查看 Rapi:t 车票 →",
    why: "关西机场与难波之间的对号座位，用于大阪行程的抵达或离开。",
  }),
];

// The English page drops the trip-prep items already shown as same-day cards
// (notInTopCards); what is left is the Umeda hotels and the night bus tour.
const tripPrepItems: KlookTripPrepItem[] = [
  withKlookLocale(osakaCastleTripPrep[0], LOCALE, {
    label: "大阪梅田酒店",
    ctaLabel: "在 Klook 查看梅田酒店 →",
    why: "梅田是御堂筋线的北端枢纽，与大阪站相连，大阪城、梅田的观景台和出城的列车都离酒店很近。",
  }),
  withKlookLocale(osakaCastleTripPrep[3], LOCALE, {
    label: "大阪“Nani Wonder”敞篷双层巴士夜游",
    ctaLabel: "查看夜游巴士 →",
    why: "从大阪站巴士总站出发，沿御堂筋一路开到新世界的敞篷夜游，适合天守阁闭馆后的时间。",
  }),
];

const tourPicks = [
  withKlookLocale(osakaCastleNishinomaruWalkingTour, LOCALE, {
    title: "大阪城与西之丸庭园半日徒步导览",
    desc: "半日拼团导览，游览大阪城园区和西之丸庭园。西之丸庭园是单独收费的草坪，可以拍到明信片角度的天守阁，还有约 300 棵樱花树",
  }),
  withKlookLocale(osakaCastleUmedaTonboriDayTour, LOCALE, {
    title: "大阪城、梅田蓝天大厦与道顿堀游船一日游",
    desc: "导游带领的一日游，包括大阪城、梅田的观景台和道顿堀游船，路线由导游安排",
  }),
  withKlookLocale(osakaSkyVistaHalfDayBusTour, LOCALE, {
    title: "大阪 Sky Vista 敞篷双层巴士半日游",
    desc: "乘坐敞篷双层巴士的半日拼团游，经过大阪城、道顿堀和通天阁，是购物日里坐着游览的半天",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "大阪城天守阁门票" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
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
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.86rem" }}>
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

export default function ZhCnOsakaCastleTicketsPage({ updated }: { updated: PageUpdated }) {
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
            天守阁门票 ¥1,200，参观约 1 小时。同一片城墙内还有四个收费设施，全部去的话一次大阪城游览会变成 ¥5,200，持有大阪周游卡（Osaka Amazing Pass）则全部免费。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "官方票价，注明核查日期", "园内五个收费设施全部列出票价"].map((t) => (
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
            <span className={styles.verdictLabel}>快速回答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>天守阁</p>
                <p className={styles.verdictStatValue}>成人 ¥1,200，学生 ¥600</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>开放时间</p>
                <p className={styles.verdictStatValue}>9:00–18:00，最后入场 17:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>参观时间</p>
                <p className={styles.verdictStatValue}>馆内约 60 分钟</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>交通</p>
                <p className={styles.verdictStatValue}>任何车站步行 15–20 分钟</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>要点：</strong>大阪城天守阁门票成人 <strong>¥1,200</strong>，大学生与高中生出示学生证 <strong>¥600</strong>，初中生及以下<strong>免费</strong>。一张门票同时包含丰臣石垣馆。天守阁开放时间为 <strong>9:00 至 18:00，最后入场 17:30</strong>，12 月 28 日至 1 月 1 日闭馆，大阪官方观光网站估计参观<strong>约需 60 分钟</strong>。每个车站都要<strong>步行 15 到 20 分钟</strong>。大多数人没有算进预算的是：公园内还有四个收费设施，即西之丸庭园、大阪城御座船（Gozabune）、大阪城橹（Yagura）和海洋堂 Figure Museum（KAIYODO），<strong>五个设施现场票价合计 ¥5,200，持一日 {PASS_1_DAY} 的大阪周游卡则全部免费</strong>。以上均于{CHECKED}核查。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看大阪城天守阁门票 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                大阪周游卡 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookSameDayCards
          heading="游览大阪城的同一天，还可以预订什么"
          cards={sameDayCards}
          footnote={
            <>
              大阪周游卡包含天守阁（osaka-amazing-pass.com 设施编号 18，2026 年 11 月 23 日核查），但不包含大阪海游馆，详见{" "}
              <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" hrefLang="en">海游馆门票攻略（英文）</Link>。
              在关西机场落地后要去京都、新大阪或天王寺，而不是难波？{" "}
              <KlookLink href={klookFor(jrHarukaUrl, LOCALE)} target="_blank" rel={KLOOK_REL}>
                在 Klook 查看 JR HARUKA 车票 →
              </KlookLink>
            </>
          }
        />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概况</span>
          <h2 className={styles.sectionTitle}>大阪城天守阁门票包含什么？</h2>
          <p className={styles.bodyText}>
            只包含一栋建筑。¥1,200 的门票可以进入<strong>大阪城天守阁</strong>，也就是重建的天守阁，馆内 8 层展示丰臣秀吉的生平和最终让丰臣家灭亡的战役，有电梯，顶层是观景台；同一天还可以进入<strong>丰臣石垣馆</strong>。这就是这张门票包含的全部内容。
          </p>
          <p className={styles.bodyText}>
            大阪城的其他地方，要么免费，要么另外收费，本页就是为了把这两者分清楚。护城河、城门、大手门一路和天守阁脚下的 MIRAIZA OSAKA-JO（ミライザ大阪城）建筑都可以免费进入。庭园、内护城河上的御座船、城橹和 Figure Museum 则各有各的票价、更早的关门时间和各自的排队。五个设施全部加起来，同一片城墙内成人要 <strong>¥5,200</strong>，这也是为什么大阪城是大阪最能体现周游卡价值的单一景点。票价于{CHECKED}核查。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>大阪城天守阁门票多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            按对象分档的固定票价，没有浮动价格，也没有提前购票折扣，售票处和网上价格相同。官方网站注明现行票价自 2025 年 4 月 1 日起实施：
          </p>
          <Table head={["对象", "门票", "说明"]} rows={priceRows.map((r) => [r.tier, r.price, r.what])} />
          <p className={styles.bodyText} style={noteStyle}>
            最终核查：{LAST_CHECKED_ISO}，来源：{" "}
            <a href="https://www.osakacastle.net/guide/" target="_blank" rel="noopener noreferrer">osakacastle.net/guide/</a>
            （¥1,200 / ¥600 / 免费，9:00–18:00，最后入场 17:30）。学生票和团体票于{CHECKED}在 osakacastle.net 与大阪官方观光网站核查。票价可能变动，购票前请确认。日本其他景点的门票价格及各自的核查日期，请看{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              日本景点门票价格总表（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>开放时间</span>
          <h2 className={styles.sectionTitle}>大阪城天守阁几点开放？</h2>
          <p className={styles.bodyText}>
            天守阁开放时间为 <strong>9:00 至 18:00，售票与最后入场为 17:30</strong>，即闭馆前 30 分钟。<strong>12 月 28 日至 1 月 1 日</strong>闭馆，一年中其他日子都开放。
          </p>
          <p className={styles.bodyText}>
            官方网站上有一句话值得注意：游客多时，<strong>可能在 17:30 之前就提前限制入场</strong>。所以樱花季傍晚才到，很可能进不去；这也是运营方对馆内何时人满给出的最明确的提示。天守阁外的公园没有大门，也没有关门时间，博物馆关门后很久仍可以看城墙和夜间亮灯的天守阁。开放时间于{CHECKED}核查。
          </p>
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>城内设施</span>
          <h2 className={styles.sectionTitle}>大阪城公园内还有哪些设施要收费？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            一个公园里有五个收费设施。人人都会买的是天守阁，预算主要花在另外四个上，其中三个比天守阁更早关门：
          </p>
          <Table
            head={["设施", "一般票价", "开放时间", "周游卡", "须知"]}
            rows={parkRows.map((r) => [r.place, r.fee, r.hours, r.pass, r.note])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            票价与开放时间来自大阪周游卡运营方的设施列表，于{CHECKED}核查；御座船的票价档位和庭园的休园日来自同一天的大阪官方观光网站。有一点要说明：西之丸庭园在周游卡运营方的现行列表上是 <strong>¥300</strong>，在大阪观光网站较旧的一页上仍是 <strong>¥200</strong>，所以请把庭园票价看作 ¥200–300，并在入口确认。公园内其他地方，包括护城河、大手门一路、石垣和 MIRAIZA OSAKA-JO 建筑本身，都免费。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看大阪城天守阁门票 →
            </KlookLink>
            <KlookLink href={WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪城与西之丸庭园徒步导览 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>周游卡</span>
          <h2 className={styles.sectionTitle}>在大阪城用大阪周游卡划算吗？</h2>
          <p className={styles.bodyText}>
            <strong>去三个设施就划算。</strong>周游卡运营方的列表包括大阪城公园内全部五个收费设施：天守阁、西之丸庭园、大阪城橹、海洋堂 Figure Museum 和御座船。成人现场票价合计 <strong>¥5,200</strong>，而一日周游卡为 <strong>{PASS_1_DAY}</strong>，而且和梅田蓝天大厦不同，这些设施都没有时间段限制。
          </p>
          <p className={styles.bodyText}>
            计算很简单。周游卡一日 {PASS_1_DAY}（官方价格，2026 年 11 月 9 日核查）。天守阁加御座船是 <strong>¥3,000</strong>，天守阁加庭园加御座船是 <strong>¥3,300</strong>，两者都略低于周游卡价格，要把当天的地铁车费算进去才划算。天守阁、御座船和海洋堂 Figure Museum 合计 <strong>¥4,000</strong>，不出城就超过周游卡价格。只去天守阁则周游卡不划算，所以规则是：只去一个设施，买单张门票；去三个或以上，买周游卡。{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              大阪周游卡价格与划算计算表（英文）
            </Link>
            用同样的方法计算了全市游览的情况。
          </p>
          <p className={styles.bodyText}>
            用周游卡安排以大阪城为主的一天之前，有一点要先知道，而且它在城市另一边。{" "}
            <Link href="/zh-cn/guides/attractions/umeda-sky-building-tickets" style={linkStyle}>
              梅田蓝天大厦门票攻略
            </Link>
            说明了周游卡只在 <strong>15:00 前</strong>可以免费进入那个观景台，这决定了周游卡一日的顺序：上午去梅田观景台，下午去大阪城，不要反过来。{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              大阪周游卡攻略（英文）
            </Link>
            列出了 40 多个包含设施、二日卡价格和两个主要的不包含设施，{" "}
            <Link href="/guides/attractions/things-to-do-osaka" hrefLang="en" style={linkStyle}>
              大阪景点攻略（英文）
            </Link>
            则说明了怎样围绕这些设施安排两三天的行程。设施列表于{CHECKED}核查。想看原样保存下来的天守阁而不是重建的，{" "}
            <Link href="/guides/attractions/himeji-castle-day-trip" hrefLang="en" style={linkStyle}>
              大阪出发的姬路城一日游（英文）
            </Link>
            乘 JR 新快速单程约 1 小时。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看大阪周游卡 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              只买天守阁门票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>怎么去大阪城？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            有五个车站可以到公园，<strong>每个车站走到天守阁都要大约 15 到 20 分钟</strong>。园区就是这么大，没有近路。选哪个车站改变的是进入的方向，而不是距离：
          </p>
          <Table head={["车站", "步行到天守阁", "沿途情况"]} rows={accessRows.map((r) => [r.station, r.walk, r.note])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            市营巴士停靠大阪城大手前和马场町，河上游船停靠北侧的大阪城港。车站与出口于{CHECKED}在 osakacastle.net 核查，步行时间来自同一天的大阪官方观光网站。{" "}
            <Link href="/guides/transport/osaka-transportation" hrefLang="en" style={linkStyle}>
              大阪交通攻略（英文）
            </Link>
            说明了中央线和谷町线在整个线网中的位置；如果不买周游卡，{" "}
            <Link href="/guides/transport/osaka-metro-pass" hrefLang="en" style={linkStyle}>
              大阪地铁一日券攻略（英文）
            </Link>
            计算了普通一日券是否比刷交通卡便宜。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>购票步骤</span>
          <h2 className={styles.sectionTitle}>怎么购买大阪城天守阁门票</h2>
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看大阪城天守阁门票 →
            </KlookLink>
            <KlookLink href={DAY_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              加上梅田观景台与道顿堀游船 →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="大阪城门票订好了？出发前先准备手机上网。" />

        <KlookTripPrep
          label="同一天预订"
          heading="游览大阪城的一天，还值得预订什么？"
          intro="天守阁和城墙一带大约要半天，大阪城位于梅田和难波之间，所以剩下要订的是住在哪里，以及晚上怎么安排。"
          items={tripPrepItems}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="常见问题" />

        <KlookTourPicks
          heading="导览游，或者大阪的其他地方"
          intro="天守阁 1 小时、城墙 1 小时，就是半天，而大阪城位于梅田和道顿堀之间，去哪边都不顺路。第一个是有导游带领游览园区和庭园的导览团；第二个用一天走完大阪城、梅田观景台和道顿堀游船。Klook 的价格按日期变化，请打开商品页查看当前价格和集合地点。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/dotonbori-river-cruise", title: "道顿堀游船（2026）：票价、时间、码头与周游卡" },
            { href: "/zh-cn/guides/attractions/umeda-sky-building-tickets", title: "梅田蓝天大厦门票 2026：票价、开放时间与日落" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周游卡 2026：¥3,500 是否划算与一日行程（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪景点攻略（2026）：周游卡划算与不划算的地方（英文）" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "海游馆门票（2026）：票价、开放时间与入场时段（英文）" },
            { href: "/zh-cn/guides/attractions/usj-tickets-express-pass", title: "日本环球影城门票与快速通行证（2026）：该买哪一种" },
            { href: "/guides/transport/osaka-transportation", title: "大阪交通攻略（2026）：地铁、电车与交通卡（英文）" },
            { href: "/guides/transport/osaka-metro-pass", title: "大阪地铁一日券 2026：1 日券与 2 日券、Enjoy Eco Card 比较（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景点门票价格 2026：官方票价与预约规则（英文）" },
            { href: "/zh-cn/guides/attractions", title: "更多日本景点门票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>去一个设施，还是五个？</h2>
            <p className={styles.ctaBannerDesc}>
              在这里，决定花多少钱的只有这一个问题。只去天守阁是 ¥1,200，买单张门票就对了。再加上御座船、庭园或城橹，不出城墙，周游卡就更便宜，而且还包含地铁。付款前请确认你自己订单上显示的取消期限。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看大阪城天守阁门票 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                大阪周游卡 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
