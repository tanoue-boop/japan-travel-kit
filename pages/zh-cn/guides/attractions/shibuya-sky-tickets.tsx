import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../../components/BookingEsimCard";
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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  fujiHakoneDayTour,
  shibuyaSkyDayTripPrep,
  shibuyaSkySameDayCards,
  shibuyaSkySameDayPrep,
  shibuyaSkyTicketUrl,
  tokyoSightseeingBusTour,
  type KlookTour,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { gygShibuyaSky } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import HotelStayBlock from "../../../../components/HotelStayBlock";

// Mirrors the English guide (/guides/attractions/shibuya-sky-tickets) block for block as of
// 2026-11-01: same sections, tables, Klook and GetYourGuide CTAs in the same places. Every
// figure is the English page's own or read from lib/attraction-prices.ts; nothing is added.
// 2026-11-11 (R09): synced with English — answer-first lead, Last checked lines, stay rule, sunset table.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/shibuya-sky-tickets";
// 16 Nov 2026 (C01): the search term 涩谷SKY门票 leads; H1 in the same word order.
// 23 Nov 2026 (C01): still 0% CTR at 6.9; Bing shows the page for 涩谷sky官网预约, so the
// booking method leads the title, H1 and meta, with a 官网怎么预约 H2 under the lead.
const TITLE = "涩谷SKY门票 官网预约方法 2026：¥2,700起";
const DESC =
  "涩谷SKY门票官网预约方法2026：两周前日本时间00:00开售，选日期・时段・张数后付款。成人¥2,700／¥3,400，境外卡付不了可用Klook。";

const SHIBUYA_SKY_URL = klookFor(shibuyaSkyTicketUrl, LOCALE);
const GYG_SLUG = "zh-cn-shibuya-sky-tickets";

const P = PRICES.shibuyaSky;
const CHECKED = dateLabel(P.checked, LOCALE);
const LAST_CHECKED = dateLabel("2026-11-11", LOCALE);
const OFFICIAL_URL = "https://www.shibuya-scramble-square.com/sky/ticket/";
const GOTOKYO_URL = "https://www.gotokyo.org/en/spot/1749/index.html";
const NAOJ_URL = "https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s1311.html";
const sourceLink = { color: "var(--text)", fontWeight: 600 } as const;

/** 2026 年每月 15 日的东京日落时间（日本国立天文台）。全部落在 ¥3,400 那一档。 */
const sunsetRows = [
  { month: "1 月", sunset: "16:50" },
  { month: "2 月", sunset: "17:22" },
  { month: "3 月", sunset: "17:48" },
  { month: "4 月", sunset: "18:14" },
  { month: "5 月", sunset: "18:39" },
  { month: "6 月", sunset: "18:58" },
  { month: "7 月", sunset: "18:57" },
  { month: "8 月", sunset: "18:31" },
  { month: "9 月", sunset: "17:49" },
  { month: "10 月", sunset: "17:06" },
  { month: "11 月", sunset: "16:35" },
  { month: "12 月", sunset: "16:29" },
];

/** 按入场时段与购买渠道区分的票价。 */
const priceRows = [
  { ticket: "成人，10:00～14:59 入场——价格更低，建议网上预订", online: "¥2,700", counter: "¥3,000" },
  { ticket: "成人，15:00～21:20 入场——所有日落时段", online: "¥3,400", counter: "¥3,700" },
  {
    ticket: "儿童，6～12 岁（含仍在读小学的 12 岁儿童）",
    online: "不在网上销售",
    counter: "¥1,200",
  },
  { ticket: "学龄前儿童（尚未上小学）", online: "免费", counter: "免费" },
];

/** 开放时间、最后入场与闭馆日——决定你付哪一档票价的部分。 */
const hoursRows = [
  { what: "开放时间", detail: "10:00～22:30" },
  { what: "最后入场", detail: "21:20" },
  { what: "停留时间限制", detail: "无固定时长限制——想待多久都可以；多数游客停留约 90 分钟" },
  { what: "交通", detail: "与涩谷站直通" },
  { what: "较便宜的一档", detail: "10:00～14:59 入场" },
  { what: "较贵的一档", detail: "15:00～21:20 入场，所有日落时段都在这一档" },
  {
    what: "闭馆",
    detail: "元旦。其他日子也可能临时闭馆或缩短开放时间",
  },
];

/** 开售时间、窗口与退改规定。 */
const bookingRows = [
  {
    q: "指定日期的门票什么时候开售？",
    a: "入场日两周前的日本时间 00:00。2025 年 2 月 27 日的公告特意把开售改在这个时间点，就是为了让游客能够提前确定开售时间。",
  },
  {
    q: "可以取消吗？",
    a: "同一份公告也为官网门票加入了入场日当天之前可免费取消的规定。请以结账时显示的条款为准；第三方平台有各自的规定，Klook 的商品页标明入场前 24 小时可免费取消。",
  },
  {
    q: "现场能买到票吗？",
    a: "能。14 楼窗口售票，15 点前入场 ¥3,000、15 点起 ¥3,700。现场窗口购票无法提前锁定入场时段，因此只适合作为备选。",
  },
  {
    q: "哪些票只在窗口卖？",
    a: "儿童票。6～12 岁 ¥1,200，只在当天的 14 楼窗口售票，不在网上销售。所以全家网上订票时，先买成人票，儿童票则需要到现场窗口购买。",
  },
];

const deckRows = [
  {
    deck: "SHIBUYA SKY",
    height: "约 229 米（屋顶）",
    highlight: "涩谷十字路口正上方的开放式屋顶，可以拍到东京最具代表性的照片",
    price: `网上 ${priceLabel(P.adult, LOCALE)}（窗口 ${priceLabel(P.atDoor, LOCALE)}）`,
    area: "涩谷站",
  },
  {
    deck: "东京晴空塔",
    height: "350 米与 450 米观景台（塔高 634 米）",
    highlight: "高空全景视野和玻璃地板观景区；天气晴朗时看得到富士山",
    price: `${priceLabel(PRICES.tokyoSkytree.adult, LOCALE)}（Floor 350）`,
    area: "押上，浅草附近",
  },
  {
    deck: "东京塔",
    height: "约 150 米与约 250 米观景台（塔高 332 米）",
    highlight: "建于 1958 年的复古地标；如需登上更高的观景层，须参加 Top Deck Tour",
    price: `${priceLabel(PRICES.tokyoTower.adult, LOCALE)}（Main Deck）`,
    area: "芝公园／赤羽桥",
  },
  {
    deck: "东京都厅观景室",
    height: "约 202 米",
    highlight: "免费入场，不用买票就能欣赏城市全景",
    price: priceLabel(PRICES.tochoDeck.adult, LOCALE),
    area: "新宿",
  },
];

const whoFor = [
  {
    title: "选日落时段，如果……",
    desc: "你想拍摄经典的涩谷全景照片，而且能提前规划。不论哪个月份，日落都在 ¥3,400 那一档，所以要考虑的只有能否订到，而这正是最先售罄的时段。建议在日落前 30～60 分钟入场，一次欣赏白天的景色、日落时的金色光线和华灯初上的城市夜景。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="4.2" y1="10.2" x2="5.6" y2="11.6" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.4" y1="11.6" x2="19.8" y2="10.2" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "选 15 点前，如果……",
    desc: "你更看重票价，而不是拍摄时的光线。10:00～14:59 入场是 ¥2,700，对比 ¥3,400，参观同一个屋顶观景台，票价便宜 ¥700，而且较早的时段最容易临时订到。天气晴朗、空气干燥时，白天的能见度最好，包括富士山。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "选夜间时段，如果……",
    desc: "你想看霓虹夜景，而日落时段已经售罄。夜间时段和日落时段的票价同为 ¥3,400，但夜间时段通常最晚售罄；最后入场 21:20，观景台开到 22:30。当目标日期两周前就已开售、日落前后的黄金时段也已售罄时，这是很可靠的备选方案。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "从参观日期往前推两周",
    desc: "每个入场日期的门票均在该日期整整两周前的日本时间 00:00 开售（北京时间前一天 23:00）。首先把这个时间点换算成所在地的时间并记进日历：能否抢到日落时段的门票，就取决于开售时是否及时下单。",
  },
  {
    title: "先确定票价档位，再选择入场时段",
    desc: "15 点前入场 ¥2,700，15 点起入场 ¥3,400。日落和夜景都在较贵的那一档，所以没有便宜的日落时段。先决定想看白天的景色、日落还是夜景，再选时间。",
  },
  {
    title: "网上预订，不要到窗口购买",
    desc: "不论哪一档，网上都比 14 楼窗口便宜 ¥300，而且是唯一能提前确定时段的方式。儿童票是例外：6～12 岁的票只在当天的窗口售票。",
  },
  {
    title: "持境外信用卡的话，可使用第三方平台",
    desc: "自 2024 年 7 月起，许多境外发行的信用卡无法在 SHIBUYA SKY 官网成功付款。Klook 支持境外信用卡，购票和支付流程容易理解，并标明入场前 24 小时可免费取消，面对东京多变的天气，这是很实用的保障。",
  },
  {
    title: "请在预约的日落时段开始前 30～60 分钟到达",
    desc: "留出时间完成入场手续，并将随身物品存入储物柜（屋顶是开放式的，风很大），在光线变化之前找到合适的观景位置。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年涩谷SKY门票多少钱？",
    a: `官网成人票 10:00～14:59 入场为 ¥2,700，15:00～21:20 入场为 ¥3,400。同样的票在 14 楼窗口买是 ¥3,000 和 ¥3,700，所以不论哪一档，网上预订都省 ¥300。6～12 岁儿童票 ¥1,200，仅在窗口售票；学龄前儿童免费入场。这套票价依据涩谷 Scramble Square 发布的票价调整，自 2025 年 4 月 1 日入场起适用；核查日期 ${CHECKED}。`,
  },
  {
    q: "涩谷SKY官网怎么预约？",
    a: `在入场日整整两周前的日本时间 00:00（北京时间前一天 23:00）进入官网购票页面，选择入场日期、时段和购票数量，再用信用卡付款：10:00～14:59 入场 ¥2,700，15:00～21:20 入场 ¥3,400。自 2024 年 7 月起许多境外发行的信用卡无法在官网付款，这种情况可在 Klook 购买。6～12 岁儿童票只在 14 楼窗口当天售票。核查日期 ${CHECKED}。`,
  },
  {
    q: "SHIBUYA SKY 几点开放？最后入场是几点？",
    a: `根据东京都官方旅游网站的信息（核查日期 ${CHECKED}），SHIBUYA SKY 开放时间为 10:00～22:30，最后入场 21:20。元旦闭馆，其他日子也可能临时闭馆或缩短开放时间。开放时间不只影响行程，也影响票价：¥2,700 那一档到 14:59 为止，15:00 到 21:20 截止前一律 ¥3,400。`,
  },
  {
    q: "SHIBUYA SKY 可以待多久？",
    a: `想待多久都可以：根据东京都官方旅游网站的信息（核查日期 ${LAST_CHECKED}），SHIBUYA SKY 入场后没有停留时间限制，多数游客停留约 90 分钟。门票只固定入场时间，观景台 22:30 关闭。入场后不予退款，开放式屋顶遇恶劣天气可能关闭。`,
  },
  {
    q: "SHIBUYA SKY 需要提前预约吗？",
    a: "想看日落的话，需要，而且这是最关键的一点。白天或夜间时段通常不必着急，但提前预订每人仍比窗口省 ¥300，也能避免想要的时段被订走。14 楼窗口当天确实有售票，所以没预约也能入场；但当天购票无法自己决定入场时间。",
  },
  {
    q: "涩谷SKY门票提前多久开售？",
    a: `两周。每个入场日期的门票均在该日期整整十四天前的日本时间 00:00 开售，这是运营方在 2025 年 2 月 27 日的公告中特意定下的，让游客能够提前确定开售时间。热门日期的日落时段，请在开售时尽早下单，不要等到当天晚些时候。核查日期 ${CHECKED}。`,
  },
  {
    q: "涩谷SKY哪个时段最先售罄？",
    a: "日落时段，而且比其他时段早得多：这是唯一能一次看到白天、黄金时刻与夜景的时段；东京的日落时间从 12 月中旬的 16:29 到 6 月中旬的 18:58（日本国立天文台，2026 年），所以最抢手的时段每个月都不一样。白天时段最容易订到。夜间时段则是常见的备选：同样是 ¥3,400，竞争少得多，看到的是灯火通明的城市夜景，而不是日落时的天际线。",
  },
  {
    q: "SHIBUYA SKY 门票可以退改吗？",
    a: `2025 年 2 月 27 日发布的票价调整公告，同时也为通过运营方官网购买的门票增加了入场日当天之前可免费取消的规定。第三方平台有各自的条款（Klook 的商品页标明入场前 24 小时可免费取消），所以请以结账时显示的内容为准。核查日期 ${CHECKED}。`,
  },
  {
    q: "可以用境外信用卡买 SHIBUYA SKY 门票吗？",
    a: "在 SHIBUYA SKY 官网上经常无法支付：自 2024 年 7 月起，许多境外发行的信用卡无法在官网成功付款。可靠的替代方案是 Klook 这类第三方平台：支持境外信用卡，购票和支付流程简单易懂，并提供电子票，并标明入场前 24 小时可免费取消。",
  },
  {
    q: "SHIBUYA SKY 有多高？能看到什么？",
    a: "SHIBUYA SKY 是位于涩谷上方约 229 米的屋顶观景台，分为开放式与室内区域。从屋顶可以 360 度俯瞰涩谷十字路口和东京城市天际线，天气晴朗时还能看到富士山。开放式屋顶是最大的亮点，所以建议穿防风外套，出发前先确认天气。",
  },
  {
    q: "SHIBUYA SKY 和晴空塔怎么选？",
    a: `SHIBUYA SKY 的特色是露天体验和拍照：十字路口上方约 229 米的开放式屋顶，日落时最美，15 点前 ¥2,700、15 点后 ¥3,400。东京晴空塔的特色是高度和远眺视野：350 米与 450 米观景台、玻璃地板区与远处的景色，Floor 350 ${priceLabel(PRICES.tokyoSkytree.adult, LOCALE)}。想拍十字路口、感受氛围就选 SHIBUYA SKY；想从更高处欣赏更开阔的城市全景，就选东京晴空塔。`,
  },
  {
    q: "东京有免费开放的观景台吗？",
    a: "有。新宿的东京都厅在约 202 米处设有观景室，免费入场，是东京最好的免费城市景观；如果不想把预算花在日落时段的 ¥3,400 上，这是很合理的替代。开放时间与开放的观景室会变动，去之前请先确认。",
  },
  {
    q: "SHIBUYA SKY 屋顶可以带包吗？",
    a: "不行。包、背包、雨伞与自拍杆不可带上屋顶，要先存放在 46 楼的储物柜；手机与可放进口袋的相机没问题。三脚架与独脚架只能在 46 楼室内使用，游客较多时可能被要求停止使用。依据搜索引擎收录的运营方购票常见问题页面内容，2026 年 11 月 6 日查阅。",
  },
  {
    q: "从 SHIBUYA SKY 能看到富士山吗？",
    a: "天气晴朗时能看到，不过从高度更高的东京晴空塔看到富士山的机会更大。能见度取决于天气，通常在较凉爽干燥的月份、一天中较早的时候最好；如果你上去就是为了富士山，这也是选 ¥2,700 白天时段的理由。无论哪一天，都无法保证一定能看到富士山。",
  },
];

// 16 Nov 2026 (C01): FAQPage carries the five questions the search terms ask; the visible list keeps all.
const FAQ_SCHEMA_QS = new Set([
  "2026 年涩谷SKY门票多少钱？",
  "涩谷SKY官网怎么预约？",
  "涩谷SKY门票提前多久开售？",
  "涩谷SKY哪个时段最先售罄？",
  "SHIBUYA SKY 需要提前预约吗？",
]);

// Klook "book for the same day" — the English page's items, on the zh-CN locale path.
const sameDayPrep: KlookTripPrepItem[] = [
  withKlookLocale(shibuyaSkySameDayPrep[0], LOCALE, {
    label: "新宿夜间美食导览（回忆横丁・歌舞伎町・黄金街）",
    ctaLabel: "查看新宿夜间导览 →",
    why: "日落时段之后的夜晚，从涩谷乘坐 JR 山手线很快就能到新宿：3 小时的拼团步行导览，走过回忆横丁、歌舞伎町和黄金街，最后在黄金街的居酒屋喝一杯。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[1], LOCALE, {
    label: "东京市区观光巴士一日游",
    ctaLabel: "查看东京一日游 →",
    why: "如果时段在晚上，白天还能逛东京其他地方：由导游带领游览皇居庭园、浅草和东京晴空塔的一日游，配有多语种语音导览。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[2], LOCALE, {
    label: "东京地铁通票（24／48／72小时）",
    ctaLabel: "查看地铁通票 →",
    why: "涩谷站有半藏门线、银座线和副都心线，24／48／72 小时票适用于往返观景台的地铁，但不包括山手线等 JR 线路。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[3], LOCALE, {
    label: "Klook 日本 eSIM 流量卡",
    ctaLabel: "查看 Klook eSIM →",
    why: "Klook 的门票是手机上的电子票，入场时段也是固定的。从抵达机场起就能上网，当天的电子凭证、地图和天气都能随时查看。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[4], LOCALE, {
    label: "成田机场／羽田机场 ⇄ 东京市区专车接送",
    ctaLabel: "查看机场接送 →",
    why: "可以直接预约送至酒店，而不只是车站，成田、羽田两个机场都有，司机会实时查询你的航班动态；如果抵达当天就订了夜间时段，特别实用。",
  }),
];

// Klook "the rest of the day" — the English page's items, on the zh-CN locale path.
const dayTripPrep: KlookTripPrepItem[] = [
  withKlookLocale(shibuyaSkyDayTripPrep[0], LOCALE, {
    label: "涩谷周边酒店",
    ctaLabel: "在 Klook 查看涩谷酒店 →",
    why: "看完日落时天已经黑了，山手线正是最挤的时候；如果住在涩谷，步行就能返回酒店，第二天早上也正好在高速巴士发车的车站旁边。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[1], LOCALE, {
    label: "涩谷酒吧巡游导览（3 小时）",
    ctaLabel: "查看涩谷酒吧巡游 →",
    why: "看完日落后，很适合安排这项活动，还能体验从观景台无法感受到的涩谷街头氛围：两家酒吧，由导游帮你点酒。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[2], LOCALE, {
    label: "东京夜间酒吧巡游导览（新宿／涩谷）",
    ctaLabel: "查看夜间导览 →",
    why: "这条路线还能顺道游览新宿，适合预约了夜间时段的游客：观景台夜间时段最容易订到，看完之后这个晚上还有地方可去。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[3], LOCALE, {
    label: "涩谷美食与文化半日步行导览",
    ctaLabel: "查看美食步行导览 →",
    why: "如果你的时段在白天，或同行有未满 20 岁的人，这是白天、全年龄都适合的选择：半天游览 SHIBUYA109、涩谷吞兵卫横丁（のんべい横丁）和宫下公园，而不是酒吧巡游。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[4], LOCALE, {
    label: "东京地铁通票（24／48／72小时）",
    ctaLabel: "查看地铁通票 →",
    why: "涩谷站有半藏门线、银座线和副都心线，24／48／72 小时票可用于观景台预约时段前后一整天的市内出行，而且这些闸机不支持境外非接触式信用卡。",
  }),
];

// P01 (14 Nov 2026): the same-day cards under the main CTA — Shibuya hotels (6.5%), the Shibuya
// go-kart (5%) and the Shinjuku night food tour (6.5%). Labels reuse the blocks below; those
// blocks drop the two items that moved up (see inTopCards).
const sameDayCards: KlookSameDayCard[] = [
  { ...withKlookLocale(shibuyaSkySameDayCards[0], LOCALE), label: dayTripPrep[0].label, ctaLabel: dayTripPrep[0].ctaLabel, kind: "住宿", why: "看完日落时天已经黑了；如果住在涩谷，步行就能返回酒店。" },
  withKlookLocale(shibuyaSkySameDayCards[1], LOCALE, {
    kind: "体验",
    label: "涩谷街头卡丁车（Street Kart 涩谷 Annex）",
    ctaLabel: "查看涩谷卡丁车 →",
    why: "约 1 小时的街头卡丁车体验，沿普通道路行驶，途经涩谷十字路口。需要本国驾照及符合 1949 年《日内瓦道路交通公约》的国际驾驶许可证；仅持中国大陆驾照无法参加。",
  }),
  { ...withKlookLocale(shibuyaSkySameDayCards[2], LOCALE), label: sameDayPrep[0].label, ctaLabel: sameDayPrep[0].ctaLabel, kind: "夜间导览", why: "参观完观景台后的夜间活动：3 小时拼团徒步游，从涩谷乘坐 JR 山手线很快就能到新宿。" },
];
const notInTopCards = (item: KlookTripPrepItem) => !sameDayCards.some((card) => card.url === item.url);

// Klook tours in the same city — the English page's two, on the zh-CN locale path.
const tourPicks: KlookTour[] = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "东京市区观光巴士一日游",
    desc: "由导游带领游览皇居庭园、浅草和东京晴空塔，配有多语种语音导览",
  }),
  withKlookLocale(fujiHakoneDayTour, LOCALE, {
    title: "富士山＋箱根一日游",
    desc: "富士山五合目搭配箱根火山地带与芦之湖，从东京出发的一日游",
  }),
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "SHIBUYA SKY 门票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnShibuyaSkyTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems.filter((item) => FAQ_SCHEMA_QS.has(item.q))) }} />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }}
        />
      </Head>

      {/* Hero — the H1 is the first text on the page. Google was showing the breadcrumb
          label glued to the last crumb ("日本景点门票涩谷SKY 门票") as the title (2026-11-13, R02),
          so the breadcrumb and the update line now sit below the H1. */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            涩谷SKY门票 官网预约方法 2026： <br />价格、开售时间与日落时段
          </h1>
          <p className={styles.heroSubtitle}>
            东京最好的露天观景体验，位于涩谷十字路口上方 229 米。票价分为两档，提前两周开放预订，
            其中日落时段最容易售罄。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "官方票价已核查", "日落时段开售时间", "与晴空塔、东京塔比较"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Breadcrumb trail={trail} />

      <div className={styles.content}>
        <Disclosure />

        {/* Lead paragraph */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>2026 年涩谷SKY官网成人门票价格为：15:00 前入场 ¥2,700，15:00 起入场 ¥3,400，每个入场日期的门票均在该日期前两周的日本时间 00:00 开售。</strong>
            日落时段最先售罄，想看日落就在开售时立即下单。自 2024 年 7 月起许多境外发行的信用卡无法在官网付款，这种情况可改用 Klook 购买。
          </p>
          <p className={styles.bodyText}>
            <strong>SHIBUYA SKY（涩谷天空）门票可在线购买，成人 10:00～14:59 入场票价为 ¥2,700，15:00～21:20 入场票价为
            ¥3,400</strong>；14 楼售票窗口的两个票价档位均贵 ¥300（¥3,000／¥3,700）。SHIBUYA SKY 每个入场日期的门票均在该日期
            <strong>前两周的日本时间 00:00</strong> 开售，日落时段最先售罄，所以想预订日落时段，最好在目标日期的门票开售后立即下单。
            SHIBUYA SKY 开放时间 10:00～22:30（最后入场 21:20），入场后没有停留时间限制，多数游客停留约 90 分钟。
          </p>
          <p className={styles.bodyText}>
            6～12 岁儿童票 ¥1,200，仅在窗口售票；学龄前儿童免费入场。可以在运营方官网或 Klook 这类第三方平台购买——自
            2024 年 7 月起，许多境外发行的信用卡无法在官网成功付款。票价依据涩谷 Scramble Square 2025 年 2 月 27 日发布的票价调整公告
            （核查日期 {CHECKED}）；票价、开放时间与停留规定已于 {LAST_CHECKED} 对照运营方官网与东京都官方旅游网站重新核查。
          </p>
        </section>

        {/* 23 Nov 2026 (C01): the Bing query 涩谷sky官网预约 as an H2, answered in three steps. */}
        <section className={styles.bodySection}>
          <h2 className={styles.sectionTitle}>涩谷SKY官网怎么预约？</h2>
          <ol className={styles.bodyList}>
            <li>
              <strong>算好开售时间：</strong>入场日整整两周前的日本时间 00:00（北京时间前一天 23:00），进入<a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer" style={sourceLink}>官网购票页面</a>，在线选购门票。
            </li>
            <li>
              <strong>选日期、入场时段和张数：</strong>10:00～14:59 入场 ¥2,700，15:00～21:20 入场 ¥3,400（所有日落时段都在这一档）；6～12 岁儿童票只在 14 楼窗口当天售票。
            </li>
            <li>
              <strong>付款：</strong>用信用卡结账；如果境外发行的信用卡付款失败，可在 Klook 购买同样的指定时段门票。
            </li>
          </ol>
          <div className={styles.pickCtaRow}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 预订 SHIBUYA SKY 门票 →
            </KlookLink>
          </div>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>票价（网上）</p>
                <p className={styles.verdictStatValue}>成人 ¥2,700／¥3,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>开放时间</p>
                <p className={styles.verdictStatValue}>10:00～22:30，最后入场 21:20</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>开售</p>
                <p className={styles.verdictStatValue}>两周前、日本时间 00:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最先售罄</p>
                <p className={styles.verdictStatValue}>日落时段</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>网上预订（两档都比窗口便宜 ¥300）；想看日落，就在目标日期于两周前开售时立即预订。
              如果你的银行卡是境外发行的，可以通过 Klook 购买：支持境外信用卡，并标明入场前 24 小时可免费取消。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 SHIBUYA SKY 门票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
            </div>
          </div>
        </div>

        {/* P01: the 6.5% / 5% bookings of the same day, directly under the 2% ticket CTA. */}
        <KlookSameDayCards heading="SHIBUYA SKY 同一天还能预订什么？" cards={sameDayCards} />

        <BookingEsimCard />

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="tokyo" areas={["shibuya", "shinjuku", "tokyoStation", "ueno"]} />

        <EsimCtaTop />

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>门票价格<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>2026 年 SHIBUYA SKY 门票多少钱？</h2>
          <p className={styles.bodyText}>
            成人 15 点前入场 ¥2,700、15 点起 ¥3,400；如果在现场窗口购票，每档票价都比网上预订贵 ¥300。这种按入场时段划分的两档票价，至今仍有不少攻略写错：自 2025 年 4 月 1 日涩谷 Scramble Square 按入场时段实行分档票价以来，
            SHIBUYA SKY 就不再只有一种票价。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票种", "官网预订价格", "14 楼窗口"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.online}</td>
                      <td className={styles.tdPrice}>{row.counter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            票价核查日期 {CHECKED}，依据涩谷 Scramble Square 2025 年 2 月 27 日的公告“SHIBUYA SKY
            入場チケットの改定について”，自 2025 年 4 月 1 日入场起适用。儿童票价与仅限窗口售票的规定出自运营方的票务页面。
            预订时请再确认。这些票价信息以及本攻略涉及的其他景点票价，都整理在{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景点门票价格总表（英文）
            </Link>
            ，每一项都附有核查日期。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最后核查：{LAST_CHECKED}</strong> · 来源：
            <a href={OFFICIAL_URL} target="_blank" rel="noopener" style={sourceLink}>shibuya-scramble-square.com/sky/ticket/</a>
            （运营方）与
            <a href={GOTOKYO_URL} target="_blank" rel="noopener" style={sourceLink}>gotokyo.org</a>
            （东京都，刊载相同票价）。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看 SHIBUYA SKY 可订时段 →
            </KlookLink>
          </div>
        </section>

        {/* Klook, directly under the price table: what the same day needs booking. */}
        <KlookTripPrep
          label="同一天要订的"
          heading="和 SHIBUYA SKY 门票一起预订的项目"
          intro="参观 SHIBUYA SKY 大约只需要一小时。同一天通常还需要安排四件事：白天的观光行程、市内交通、手机上网流量，以及从机场前往市区的交通。"
          items={sameDayPrep.filter(notInTopCards)}
        />

        {/* Q2 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>开放时间<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>SHIBUYA SKY 几点开放？最后入场是几点？</h2>
          <p className={styles.bodyText}>
            10:00 到 22:30，最后入场 21:20。入场时间也会影响票价：14:59 是 ¥2,700 这一票价档位的最晚入场时间，
            15:00 到截止前一律 ¥3,400。所以选择几点入场，除了光线，还关系到 ¥700 的差价。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "SHIBUYA SKY"].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最后核查：{LAST_CHECKED}</strong> · 开放时间与最后入场：
            <a href="https://www.shibuya-scramble-square.com/en/" target="_blank" rel="noopener" style={sourceLink}>shibuya-scramble-square.com</a>
            （运营方）。停留时间限制、一般停留时长、交通与元旦闭馆：
            <a href={GOTOKYO_URL} target="_blank" rel="noopener" style={sourceLink}>gotokyo.org</a>
            （东京都）。屋顶是开放式的，所以遇到大风、雷电或大雨时，屋顶可能当天关闭，室内楼层则照常开放。
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            SHIBUYA SKY 要预留多长时间？
          </h3>
          <p className={styles.bodyText}>
            预留约 90 分钟：SHIBUYA SKY 入场后没有停留时间限制，根据东京都官方旅游网站，多数游客的停留时间也是约 90 分钟。
            门票只固定入场时间，所以在日落前 30～60 分钟入场，就能一直待到城市亮灯，只要在 22:30 前离开即可。入场后不予退款。
          </p>
        </section>

        {/* Q3 — booking window, then the CTA stack */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>开售时间<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>SHIBUYA SKY 需要提前预约吗？</h2>
          <p className={styles.bodyText}>
            想看日落的话，需要，而且热门时段往往比大多数人预想的更早售罄。每个入场日期的门票均在该日期
            <strong>整整两周前的日本时间 00:00</strong> 开售，也就是北京时间前一天晚上 23:00。热门日期的日落时段总是最先售罄，
            所以实用的原则是：在目标日期开售时尽早进入购票页面下单，而不是出发前一周才订。白天或夜间时段的选择余地大得多，
            但网上预订每人仍省 ¥300。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["问题", `运营方公布的内容（核查日期 ${CHECKED}）`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            列出两个购票渠道，是因为一边售罄的时段，另一个渠道不一定也已售罄；也因为自 2024 年 7 月起，
            许多境外发行的信用卡无法在官网成功付款：
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看 SHIBUYA SKY 门票 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
          </div>
        </section>

        {/* Q4 — which slot */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>选择时段<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>SHIBUYA SKY 该订哪个时段？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            如果能订到，优先选择日落时段；更在意价格，就选 15 点前；如果日落时段售罄，则选择夜间时段。东京的日落时间从 12 月中旬的 16:29
            到 6 月中旬的 18:58，所以最抢手的时段并不是一整年都一样，但它始终在 ¥3,400 那一档。
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.25rem", marginBottom: "0.6rem" }}>
            东京各个月份的日落时间是几点？
          </h3>
          <p className={styles.bodyText}>
            请预订比下表日落时间早 30～60 分钟的入场时段。这个时段最先售罄，所以请在目标日期于两周前日本时间 00:00 开售时立即预订。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["月份（15 日）", "东京日落时间", "建议入场时间"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sunsetRows.map((row) => {
                    const [h, m] = row.sunset.split(":").map(Number);
                    const start = h * 60 + m - 60;
                    const end = h * 60 + m - 30;
                    const fmt = (t: number) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
                    return (
                      <tr key={row.month}>
                        <td className={styles.tdProvider}>{row.month}</td>
                        <td className={styles.tdPrice}>{row.sunset}</td>
                        <td style={{ fontSize: "0.88rem" }}>{fmt(start)}～{fmt(end)}（¥3,400 档）</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最后核查：{LAST_CHECKED}</strong> · 来源：2026 年东京日落时间，出自
            <a href={NAOJ_URL} target="_blank" rel="noopener" style={sourceLink}>日本国立天文台</a>
            ；其他年份相差一两分钟。“建议入场时间”为日落前 30～60 分钟，是本攻略的建议，并非运营方规定。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看目标日期的日落时段 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
          </div>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            在屋顶观景台停留一小时，只是当晚行程的一部分，所以时段通常要配合当天其他安排来选。我们把它排进了{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              东京三日游行程（英文）
            </Link>
            ，也列在{" "}
            <Link href="/zh-cn/guides/attractions/things-to-do-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              东京自由行景点
            </Link>
            的推荐清单里。
          </p>
        </section>

        {/* Klook: the evening the slot sits inside. */}
        <KlookTripPrep
          label="当天其他时间"
          heading="SHIBUYA SKY 这一天还要订什么？"
          intro="观景台本身大约一小时，所以不论选了哪个时段，前后都还有大半天或一整个晚上。以下是适合搭配入场时段预订的行程和交通票券：看完之后的去处，以及适用于当天出行的票券。"
          items={dayTripPrep.filter(notInTopCards)}
        />

        {/* Q5 — vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>观景台比较<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>SHIBUYA SKY、晴空塔、东京塔：该选哪个观景台？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            SHIBUYA SKY 的优势在于能拍到经典的涩谷十字路口全景，但它既不是东京最高的观景台，也不是最便宜的；而且自 2025 年 4 月的票价调整后，
            15:00 入场比东京塔的 Top Deck Tour 还贵。如果更看重观景高度和远眺富士山的视野，就选东京晴空塔；想参观复古地标，就选东京塔；
            想免费看全景就去新宿的东京都厅。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["观景台", "高度", "特色", "成人票价", "区域／最近车站"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            高度为估算值；每个票价都是运营方公布的价格，取自{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              我们的门票价格总表（英文）
            </Link>
            ，每一项都有各自的核查日期。四个观景台逐一、逐时段的完整比较，请见{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={{ color: "var(--text)", fontWeight: 600 }}>
              东京观景台比较（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>屋顶规定<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>SHIBUYA SKY 屋顶可以携带什么？</h2>
          <ul className={styles.bodyList}>
            <li><strong>不可带上屋顶：</strong>包、背包、雨伞、自拍杆。上去前先存放在 46 楼的储物柜。</li>
            <li><strong>可以携带：</strong>手机与可放进口袋的相机。</li>
            <li><strong>三脚架与独脚架：</strong>只能在 46 楼室内使用，游客较多时工作人员可能要求停止使用。屋顶与其他楼层禁止使用。</li>
            <li><strong>天气不佳：</strong>天气转坏时屋顶可能不经预告关闭，室内楼层仍开放。订票前请确认门票条款。</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            依据搜索引擎收录的运营方购票常见问题页面内容，2026 年 11 月 6 日查阅。规定可能变动，当天请在实际页面再确认。
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>预订步骤<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>SHIBUYA SKY 怎么订？</h2>
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

        <FaqList items={faqItems} />

        {/* Klook tours in the same city */}
        <KlookTourPicks
          heading="从东京出发的一日游"
          intro="晚上参观 SHIBUYA SKY 大约只需要一小时，当天其他时间仍可安排其他活动。如果东京的某一天还没排好，这两个行程都能用你订门票的同一个 Klook 账号预订。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-observation-decks", title: "东京观景台比较（2026）：SHIBUYA SKY、晴空塔、东京塔（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "东京三日游行程（2026）：要订什么、按什么顺序订（英文）" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "东京塔门票（2026）：票价、Main Deck 与 Top Deck、预订方式（英文）" },
            { href: "/zh-cn/guides/attractions/tokyo-skytree-tickets", title: "东京晴空塔门票（2026）：票价、350 米与 450 米观景台怎么选" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "东京地铁通票（2026）：24、48 还是 72 小时——值得买吗？（英文）" },
            { href: "/zh-cn/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 门票（2026）：票价、时间与预约方式" },
            { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", title: "teamLab Borderless（无界美术馆）门票（2026）：票价、时段预约与购票渠道" },
            { href: "/guides/transport/tokyo-transportation", title: "东京交通攻略（2026）：电车、地铁与 IC 卡（英文）" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
            { href: "/zh-cn/guides/attractions/tokyo-disney-tickets", title: "东京迪士尼门票（2026）：迪士尼乐园与迪士尼海洋怎么选、怎么买" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "东京看相扑（2026）：正式比赛门票与晨练参观（英文）" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>提前订好涩谷的日落时段</h2>
            <p className={styles.ctaBannerDesc}>
              两档门票的网上预订价格均比现场窗口便宜 ¥300，每个入场日期的门票均在该日期两周前的日本时间午夜开售。Klook 支持境外信用卡，
              并标明入场前 24 小时可免费取消，即使东京天气多变，也能更灵活地调整行程。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 SHIBUYA SKY 门票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
