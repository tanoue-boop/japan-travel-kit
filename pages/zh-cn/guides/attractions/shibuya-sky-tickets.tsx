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
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  fujiHakoneDayTour,
  shibuyaSkyDayTripPrep,
  shibuyaSkySameDayPrep,
  shibuyaSkyTicketUrl,
  tokyoSightseeingBusTour,
  type KlookTour,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { gygShibuyaSky } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

// Mirrors the English guide (/guides/attractions/shibuya-sky-tickets) block for block as of
// 2026-11-01: same sections, tables, Klook and GetYourGuide CTAs in the same places. Every
// figure is the English page's own or read from lib/attraction-prices.ts; nothing is added.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/shibuya-sky-tickets";
const TITLE = "涩谷SKY 门票（2026）：票价、最佳时段与预约方式";
const DESC =
  "涩谷SKY 门票 2026：官方票价网上预订成人 15 点前 ¥2,700、15 点后 ¥3,400，现场各加 ¥300；日落场次最快售罄。";

const SHIBUYA_SKY_URL = klookFor(shibuyaSkyTicketUrl, LOCALE);
const GYG_SLUG = "zh-cn-shibuya-sky-tickets";

const P = PRICES.shibuyaSky;
const CHECKED = dateLabel(P.checked, LOCALE);

/** 按入场时段与购买渠道区分的票价。 */
const priceRows = [
  { ticket: "成人，10:00～14:59 入场", online: "¥2,700", counter: "¥3,000" },
  { ticket: "成人，15:00～21:20 入场", online: "¥3,400", counter: "¥3,700" },
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
  { what: "较便宜的一档", detail: "10:00～14:59 入场" },
  { what: "较贵的一档", detail: "15:00～21:20 入场——所有日落场次都在这一档" },
  {
    what: "闭馆",
    detail: "元旦。其他日子也可能临时闭馆或缩短开放时间",
  },
];

/** 开售时间、窗口与退改规定。 */
const bookingRows = [
  {
    q: "某个日期什么时候开售？",
    a: "入场日两周前的日本时间 00:00。2025 年 2 月 27 日的公告特意把开售改在这个时间点，就是为了让开售时间可以预期。",
  },
  {
    q: "可以取消吗？",
    a: "同一份公告也为官网门票加入了入场日当天之前可免费取消的规定。请以你自己结账时显示的条款为准——第三方平台有各自的规定，Klook 的商品页标明入场前 24 小时可免费取消。",
  },
  {
    q: "现场能买到票吗？",
    a: "能——14 楼窗口售票，15 点前入场 ¥3,000、15 点起 ¥3,700。窗口做不到的是提前锁定时段，所以它是备选，而不是计划。",
  },
  {
    q: "哪些票只在窗口卖？",
    a: "儿童票。6～12 岁 ¥1,200，只在当天的 14 楼窗口售票、不在网上卖——所以全家网上订票时，是先买成人票，孩子的票到现场再付。",
  },
];

const deckRows = [
  {
    deck: "涩谷SKY",
    height: "约 229 米（屋顶）",
    highlight: "涩谷十字路口正上方的开放式屋顶——东京最具代表性的一张照片",
    price: `网上 ${priceLabel(P.adult, LOCALE)}（窗口 ${priceLabel(P.atDoor, LOCALE)}）`,
    area: "涩谷站",
  },
  {
    deck: "东京晴空塔",
    height: "350 米与 450 米观景台（塔高 634 米）",
    highlight: "最高的视野、玻璃地板区；天气晴朗时看得到富士山",
    price: `${priceLabel(PRICES.tokyoSkytree.adult, LOCALE)}（Floor 350）`,
    area: "押上，浅草附近",
  },
  {
    deck: "东京铁塔",
    height: "约 150 米与约 250 米观景台（塔高 332 米）",
    highlight: "1958 年的复古地标；要上更高一层得参加 Top Deck Tour",
    price: `${priceLabel(PRICES.tokyoTower.adult, LOCALE)}（Main Deck）`,
    area: "芝公园／赤羽桥",
  },
  {
    deck: "东京都厅观景室",
    height: "约 202 米",
    highlight: "免费入场；不用门票就有超值的城市全景",
    price: priceLabel(PRICES.tochoDeck.adult, LOCALE),
    area: "新宿",
  },
];

const whoFor = [
  {
    title: "选日落场，如果……",
    desc: "你想拍那张经典照片，而且能提前规划。不论哪个月份，日落都在 ¥3,400 那一档，所以你要权衡的只有“抢不抢得到”——而这正是最先售罄的场次。建议在日落前 30～60 分钟入场，一次看到白天、黄金时刻与城市亮灯。",
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
    desc: "价格比光线重要。10:00～14:59 入场是 ¥2,700，对比 ¥3,400——同一个屋顶便宜 ¥700，而且较早的场次最容易临时订到。在晴朗干燥的日子，白天的视野看得最远，包括富士山。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "选晚场，如果……",
    desc: "你要看的是霓虹夜景，而日落场已经没了。晚场和日落场同属 ¥3,400 那一档，但通常最晚售罄；最后入场 21:20，观景台开到 22:30——当你的日期两周前就开售、黄金时刻早已被订走时，这是很靠谱的补救方案。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "从你的日期往前推两周",
    desc: "每个日期在整整两周前的日本时间 00:00 开售（北京时间前一天 23:00）。在做任何事之前，先把这个时间点换算成你所在地的时间记进日历——日落场你到底抢不抢得到，就看这一刻。",
  },
  {
    title: "先定票价档位，再去看场次",
    desc: "15 点前入场 ¥2,700，15 点起入场 ¥3,400。日落和夜景都在较贵的那一档，所以没有便宜的日落场——先选你要的光线，再选时间。",
  },
  {
    title: "网上订，不要到窗口买",
    desc: "不论哪一档，网上都比 14 楼窗口便宜 ¥300，而且是唯一能提前锁定时段的方式。儿童票是例外：6～12 岁的票只在当天的窗口售票。",
  },
  {
    title: "持境外信用卡就用第三方平台",
    desc: "自 2024 年 7 月起，涩谷SKY 官网对许多境外发行的信用卡支付不成功。Klook 支持境外信用卡、结账流程看得懂，并标明入场前 24 小时可免费取消——面对东京多变的天气，这是很实用的保障。",
  },
  {
    title: "日落场请提前 30～60 分钟到",
    desc: "留出时间过入口、把随身物品放进储物柜（屋顶是开放式的，风很大），在光线变化之前先站好位置。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年涩谷SKY 门票多少钱？",
    a: `官网成人票 10:00～14:59 入场为 ¥2,700，15:00～21:20 入场为 ¥3,400。同样的票在 14 楼窗口买是 ¥3,000 和 ¥3,700，所以不论哪一档，网上预订都省 ¥300。6～12 岁儿童票 ¥1,200，仅在窗口售票；学龄前儿童免费入场。这套票价依据涩谷 Scramble Square 自己的票价调整，自 2025 年 4 月 1 日入场起适用；核查日期 ${CHECKED}。`,
  },
  {
    q: "涩谷SKY 几点开放？最后入场是几点？",
    a: `根据东京都官方旅游网站的信息（核查日期 ${CHECKED}），涩谷SKY 开放时间为 10:00～22:30，最后入场 21:20。元旦闭馆，其他日子也可能临时闭馆或缩短开放时间。开放时间不只影响行程，也影响票价：¥2,700 那一档到 14:59 为止，15:00 到 21:20 截止前一律 ¥3,400。`,
  },
  {
    q: "涩谷SKY 需要提前预约吗？",
    a: "想看日落的话，需要——而且这就是整件事的关键。白天或晚场通常不必急，但提前预订每人仍比窗口省 ¥300，也免去想要的时段被订走的风险。14 楼窗口当天确实有售票，所以没预约也不是进不去；当天做不到的，是自己决定什么时候上去。",
  },
  {
    q: "涩谷SKY 门票提前多久开售？",
    a: `两周。每个日期在整整十四天前的日本时间 00:00 开售，这是运营方在 2025 年 2 月 27 日的公告中特意定下的，让开售时间可以预期。热门日期的日落场，请在开售那一刻就下单，不要等到当天晚些时候。核查日期 ${CHECKED}。`,
  },
  {
    q: "涩谷SKY 哪个时段最先售罄？",
    a: "日落场，而且遥遥领先——这是唯一一个能一次看到白天、黄金时刻与夜景的场次；东京的日落时间从 12 月的 16:30 左右到 6 月的 19:00 之后，所以最抢手的场次每个月都不一样。白天时段最从容。晚场则是常见的备选：同样是 ¥3,400，竞争少得多，看到的是亮灯的城市而不是地平线。",
  },
  {
    q: "涩谷SKY 门票可以退改吗？",
    a: `推出现行票价的 2025 年 2 月 27 日公告，同时也为向运营方购买的官网门票加入了入场日当天之前可免费取消的规定。第三方平台有自己的条款——Klook 的商品页标明入场前 24 小时可免费取消——所以请以你结账时显示的内容为准。核查日期 ${CHECKED}。`,
  },
  {
    q: "可以用境外信用卡买涩谷SKY 门票吗？",
    a: "在涩谷SKY 官网上经常不行——自 2024 年 7 月起，官网对许多境外发行的信用卡支付不成功。可靠的替代方案是 Klook 这类第三方平台：支持境外信用卡、结账流程看得懂、提供电子票，并标明入场前 24 小时可免费取消。",
  },
  {
    q: "涩谷SKY 有多高？能看到什么？",
    a: "涩谷SKY 是位于涩谷上方约 229 米的屋顶观景台，分为开放式与室内区域。从顶楼可以 360 度看到涩谷十字路口、东京天际线，天气晴朗时还能看到富士山。开放式屋顶是最大的亮点，所以请穿挡风的衣服，出发前先确认天气。",
  },
  {
    q: "涩谷SKY 和晴空塔怎么选？",
    a: `涩谷SKY 卖的是体验与照片：十字路口上方约 229 米的开放式屋顶，日落时最美，15 点前 ¥2,700、15 点后 ¥3,400。东京晴空塔卖的是高度与视距：350 米与 450 米观景台、玻璃地板区与远处的景色，Floor 350 ${priceLabel(PRICES.tokyoSkytree.adult, LOCALE)}。想拍十字路口、感受氛围就选涩谷SKY；想要最高、最广的全景就选晴空塔。`,
  },
  {
    q: "东京有免费的观景台吗？",
    a: "有。新宿的东京都厅在约 202 米处设有观景室，免费入场——东京最好的免费城市景观；如果不想把预算花在日落场的 ¥3,400 上，这是很合理的替代。开放时间与开放的观景室会变动，去之前请先确认。",
  },
  {
    q: "SHIBUYA SKY 顶楼可以带包吗？",
    a: "不行。包、背包、雨伞与自拍杆不可带上顶楼，要先存放在 46 楼的储物柜；手机与可放进口袋的相机没问题。三脚架与单脚架只能在 46 楼室内使用，人多时可能被要求停止。依运营方购票 FAQ 的搜索索引内容，2026 年 11 月 6 日查阅。",
  },
  {
    q: "从涩谷SKY 能看到富士山吗？",
    a: "天气晴朗时能看到——不过高度更高的东京晴空塔机会更大。能见度取决于天气，通常在较凉爽干燥的月份、一天中较早的时候最好；如果你上去就是为了富士山，这也是选 ¥2,700 白天时段的理由。任何一天都没有保证。",
  },
];

// Klook "book for the same day" — the English page's items, on the zh-CN locale path.
const sameDayPrep: KlookTripPrepItem[] = [
  withKlookLocale(shibuyaSkySameDayPrep[0], LOCALE, {
    label: "新宿夜间美食导览（回忆横丁・歌舞伎町・黄金街）",
    ctaLabel: "查看新宿夜间导览 →",
    why: "日落场之后的夜晚，从涩谷坐山手线很快就到新宿：3 小时的拼团步行导览，走过回忆横丁、歌舞伎町和黄金街，最后在黄金街的居酒屋喝一杯。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[1], LOCALE, {
    label: "东京市区观光巴士一日游",
    ctaLabel: "查看东京一日游 →",
    why: "如果时段在晚上，白天还能逛东京其他地方：由导游带领游览皇居庭园、浅草和东京晴空塔的一日游，配有多语种语音导览。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[2], LOCALE, {
    label: "东京地铁通票（24／48／72小时）",
    ctaLabel: "查看地铁通票 →",
    why: "涩谷站有半藏门线、银座线和副都心线，24／48／72 小时票就能覆盖往返观景台的地铁——但不包括山手线等 JR 线路。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[3], LOCALE, {
    label: "Klook 日本 eSIM 流量卡",
    ctaLabel: "查看 Klook eSIM →",
    why: "Klook 的门票是手机上的电子票，时段也是固定的——从机场开始就有流量，当天的凭证、地图和天气都能随时查看。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[4], LOCALE, {
    label: "成田・羽田机场 ⇄ 东京 专车接送",
    ctaLabel: "查看机场接送 →",
    why: "直接预约到酒店地址而不是车站，成田、羽田两个机场都有，司机会跟踪你的航班——抵达当天就订了晚场时特别实用。",
  }),
];

// Klook "the rest of the day" — the English page's items, on the zh-CN locale path.
const dayTripPrep: KlookTripPrepItem[] = [
  withKlookLocale(shibuyaSkyDayTripPrep[0], LOCALE, {
    label: "涩谷周边酒店",
    ctaLabel: "在 Klook 查看涩谷酒店 →",
    why: "日落场结束时天已经黑了，山手线正是最挤的时候；住在涩谷，回程走路就到，第二天早上也正好在高速巴士发车的车站旁边。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[1], LOCALE, {
    label: "涩谷酒吧串游导览（3 小时）",
    ctaLabel: "查看涩谷酒吧串游 →",
    why: "日落场之后那几个小时最顺理成章的安排，也是屋顶上看不到的那一面涩谷——两家酒吧，由导游帮你点酒。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[2], LOCALE, {
    label: "东京夜间酒吧串游导览（新宿／涩谷）",
    ctaLabel: "查看夜间导览 →",
    why: "连新宿一起逛的版本，适合夜间场：观景台晚场最好订，看完之后这个晚上还有地方可去。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[3], LOCALE, {
    label: "涩谷美食与文化半日步行导览",
    ctaLabel: "查看美食步行导览 →",
    why: "如果你的时段在白天，或同行有未满 20 岁的人，这是白天、全年龄都适合的选择——半天游览涩谷 109、呑兵卫横丁和宫下公园，而不是酒吧串游。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[4], LOCALE, {
    label: "东京地铁通票（24／48／72小时）",
    ctaLabel: "查看地铁通票 →",
    why: "涩谷站有半藏门线、银座线和副都心线，24／48／72 小时票就能覆盖时段前后一整天的出行——而且境外非接触式信用卡刷不开这些闸机。",
  }),
];

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
  { label: "涩谷SKY 门票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnShibuyaSkyTicketsPage({ updated }: { updated: PageUpdated }) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            涩谷SKY 门票（2026）：<br />票价、开放时间与日落场次
          </h1>
          <p className={styles.heroSubtitle}>
            东京最好的屋顶视角——涩谷十字路口上方 229 米。两档票价、两周的预约窗口，
            以及一个真的会售罄的场次。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "官方票价已核查", "日落场开售时间", "与晴空塔、东京铁塔比较"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Lead paragraph */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>涩谷SKY 门票</strong>按上去的时间定价：官网成人票 10:00～14:59 入场为{" "}
            <strong>¥2,700</strong>，15:00～21:20 入场为 <strong>¥3,400</strong>；同样两种票在 14 楼窗口买是
            ¥3,000 和 ¥3,700——所以不论选哪一档，网上预订都省 ¥300；6～12 岁儿童票 ¥1,200，仅在窗口售票。
            可以在运营方官网或 Klook 这类第三方平台购买，而且要早点买：每个日期在
            <strong>整整两周前的日本时间 00:00</strong> 开售，售罄的正是日落场，所以实际的截止时间是你的日期开售那一刻，
            而不是出发那一周。观景台开放时间 10:00～22:30，最后入场 21:20。所有数据核查日期 {CHECKED}——票价出自涩谷
            Scramble Square 2025 年 2 月 27 日自己的票价调整公告，开放时间出自东京都的官方旅游网站。
          </p>
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
                <p className={styles.verdictStatValue}>日落场</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>网上订（两档都比窗口便宜 ¥300）；想看日落，就在两周前你的日期一开售时立刻订。
              如果你的卡是境外发行的，就通过 Klook 订：支持境外信用卡，并标明入场前 24 小时可免费取消。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看涩谷SKY 门票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
            </div>
          </div>
        </div>

        <BookingEsimCard />

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>2026 年涩谷SKY 门票多少钱？</h2>
          <p className={styles.bodyText}>
            成人 15 点前入场 ¥2,700、15 点起 ¥3,400——在窗口买而不是网上买，每档再多 ¥300。这个两档式的结构，
            是多数攻略到现在还写错的地方：自 2025 年 4 月 1 日涩谷 Scramble Square 按入场时间拆分票价以来，
            涩谷SKY 就不再只有一种票价。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票种", "官网（预订）", "14 楼窗口"].map((h) => (
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
            预订时请再确认——这些数据连同本攻略涵盖的其他景点，都整理在{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景点门票价格总表（英文）
            </Link>
            ，每一项都附有核查日期。
          </p>
        </section>

        {/* Klook, directly under the price table: what the same day needs booking. */}
        <KlookTripPrep
          label="同一天要订的"
          heading="和涩谷SKY 门票一起预订的项目"
          intro="涩谷SKY 的场次大约只占一天中的一小时。同一天通常还需要这五项：看完之后的夜晚、之前的白天、中间的交通、手机流量，以及从机场进市区。"
          items={sameDayPrep}
        />

        {/* Q2 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>开放时间</span>
          <h2 className={styles.sectionTitle}>涩谷SKY 几点开放？最后入场是几点？</h2>
          <p className={styles.bodyText}>
            10:00 到 22:30，最后入场 21:20。开放时间同时也决定票价：14:59 是 ¥2,700 那一档的最后入场时间，
            15:00 到截止前一律 ¥3,400——所以“我们几点去？”在成为光线问题之前，先是一个 ¥700 的问题。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `涩谷SKY（核查日期 ${CHECKED}）`].map((h) => (
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
            开放时间、最后入场与元旦闭馆，出自东京都官方旅游网站 gotokyo.org 上 SHIBUYA SKY 的信息，英文与日文版内容相同，
            核查日期 {CHECKED}。屋顶是开放式的，所以遇到大风、雷电或大雨时，屋顶可能当天关闭，室内楼层则照常开放。
          </p>
        </section>

        {/* Q3 — booking window, then the CTA stack */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>开售时间</span>
          <h2 className={styles.sectionTitle}>涩谷SKY 需要提前预约吗？</h2>
          <p className={styles.bodyText}>
            想看日落的话，需要——而且截止时间比多数人以为的更早。每个日期在
            <strong>整整两周前的日本时间 00:00</strong> 开售，也就是北京时间前一天晚上 23:00。热门日期的日落场就是会被抢光的那一批，
            所以实用的原则是：你的日期一开售就守在结账页面，而不是出发那一周才订。白天或晚场的余地大得多——
            但网上订每人仍省 ¥300。
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
            列出两个购票渠道，是因为一边售罄的场次，另一边不一定也没了——也因为自 2024 年 7 月起，
            官网对许多境外发行的信用卡支付不成功：
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看涩谷SKY 门票 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
          </div>
        </section>

        {/* Q4 — which slot */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>选场次</span>
          <h2 className={styles.sectionTitle}>涩谷SKY 该订哪个场次？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            抢得到就选日落场；价格是关键就选 15 点前；日落场没了就选晚场。东京的日落时间从 12 月的 16:30 左右
            到 6 月的 19:00 之后，所以最抢手的场次并不是一整年都同一个——但它永远在 ¥3,400 那一档。
          </p>
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
            在屋顶待一小时只是一个晚上的其中一段，所以场次通常是配合当天其他安排来选的。我们把它排进了{" "}
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
          heading="涩谷SKY 这一天还要订什么？"
          intro="观景台本身大约一小时，所以不论你在上面选了哪个场次，前后都还有大半天或一整个晚上。以下是随场次而来的预订——同一区的住宿、看完之后的去处，以及覆盖其间出行的票券。"
          items={dayTripPrep}
        />

        {/* Q5 — vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比较</span>
          <h2 className={styles.sectionTitle}>涩谷SKY、晴空塔、东京铁塔——该选哪个观景台？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            涩谷SKY 赢在那张经典的十字路口照片，但它既不是东京最高的观景台，也不是最便宜的——而且自 2025 年 4 月的票价调整后，
            15:00 入场比东京铁塔的 Top Deck Tour 还贵。要纯粹的高度与富士山视野选晴空塔，要复古地标选东京铁塔，
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
            高度为估算值；每个票价都是运营方自己的价格，取自{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              我们的门票价格总表（英文）
            </Link>
            ，每一项都有各自的核查日期。四个观景台逐一、逐场次的完整比较，请见{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={{ color: "var(--text)", fontWeight: 600 }}>
              东京观景台比较（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>顶楼规定</span>
          <h2 className={styles.sectionTitle}>SHIBUYA SKY 顶楼可以带什么上去？</h2>
          <ul className={styles.bodyList}>
            <li><strong>不可带上顶楼:</strong> 包、背包、雨伞、自拍杆。上去前先存放在 46 楼的储物柜。</li>
            <li><strong>可以带:</strong> 手机与可放进口袋的相机。</li>
            <li><strong>三脚架与单脚架:</strong> 只能在 46 楼室内使用，人多时工作人员可能请你停止。顶楼与其他楼层禁止使用。</li>
            <li><strong>天气不佳:</strong> 天气转坏时顶楼可能不经预告关闭，室内楼层仍开放。订票前请看清楚你的票券条款。</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            依运营方购票 FAQ 的搜索索引内容，2026 年 11 月 6 日查阅。规定可能变动，当天请在实际页面再确认。
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>涩谷SKY 怎么订？</h2>
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

        <FaqList items={faqItems} />

        {/* Klook tours in the same city */}
        <KlookTourPicks
          heading="同一座城市出发的一日游"
          intro="涩谷SKY 的场次只占一个晚上中的一小时，一天里其他时间都还空着。如果东京的某一天还没排好，这两个行程都能用你订门票的同一个 Klook 账号预订。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-observation-decks", title: "东京观景台比较（2026）：涩谷SKY、晴空塔、东京铁塔（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "东京三日游行程（2026）：要订什么、按什么顺序订（英文）" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "东京铁塔门票（2026）：票价、Main Deck 与 Top Deck、预订方式（英文）" },
            { href: "/zh-cn/guides/attractions/tokyo-skytree-tickets", title: "东京晴空塔门票（2026）：票价、350 与 450 楼怎么选" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "东京地铁通票（2026）：24、48 还是 72 小时——值得买吗？（英文）" },
            { href: "/zh-cn/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 门票 2026：票价、时间与预约方式" },
            { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", title: "teamLab 无界 门票（2026）：票价、时段预约与购票渠道" },
            { href: "/guides/transport/tokyo-transportation", title: "东京交通攻略（2026）：电车、地铁与 IC 卡（英文）" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
            { href: "/zh-cn/guides/attractions/tokyo-disney-tickets", title: "东京迪士尼门票（2026）：乐园与海洋怎么买、怎么选" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "东京看相扑（2026）：正式比赛门票与晨练参观（英文）" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>抢下涩谷的日落</h2>
            <p className={styles.ctaBannerDesc}>
              两档票价都是网上比窗口便宜 ¥300，每个日期在两周前的日本时间午夜开售。Klook 支持境外信用卡，
              并标明入场前 24 小时可免费取消——东京天气变了也不怕。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看涩谷SKY 门票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
