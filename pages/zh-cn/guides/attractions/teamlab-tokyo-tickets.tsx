// Simplified Chinese edition of /guides/attractions/teamlab-tokyo-tickets. Mirrors the English page
// block by block as of 2026-11-01 (same sections, tables, FAQ, Klook / GetYourGuide CTAs and tour
// picks in the same places); every figure comes from the English page or lib/attraction-prices.ts,
// none is added here.
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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  fujiDayTour,
  tokyoBaySunsetBoatCruise,
  tokyoJoypolisPassport,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  tsukijiCultureFoodTour,
} from "../../../../lib/klook-links";
import { cnTeamlabPlanets } from "../../../../lib/klook-links-zh-cn";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { gygTeamlabPlanets } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "teamLab Planets 门票（2026）：票价、预约与无界比较";
const DESC =
  "teamLab Planets（丰洲）门票 2026：官方票价成人 ¥3,800 起、30 分钟入场时段怎么运作、赤脚涉水区该穿什么，以及和无界差在哪。";

const LOCALE = "zh-cn" as const;
const GYG_SLUG = "zh-cn-teamlab-tokyo-tickets";

// teamLab Planets TOKYO（丰洲）门票 — the same Klook product as the English page, on zh-CN.
const PLANETS_URL = cnTeamlabPlanets.url;

const P = PRICES.teamlabPlanets;
// 票价与订票规则读自官方售票网站（CHECKED）；营业时间与休馆日读自 teamlab.art，保留自己的日期。
const CHECKED = dateLabel(P.checked, LOCALE);
const HOURS_CHECKED = dateLabel("2026-10-09", LOCALE);
const BORDERLESS_CHECKED = dateLabel(PRICES.teamlabBorderless.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const CHILD = priceLabel(P.child, LOCALE);

const priceRows = [
  {
    ticket: "成人（18 岁以上）",
    price: ADULT,
    varies: "会——按日期与入场时间",
    note: "¥3,800 是最低价，不是定价：官方售票网站对每个日期与时段分别定价",
  },
  { ticket: "初中、高中生", price: "¥2,800", varies: "不会——固定价", note: "请携带学生证" },
  { ticket: "儿童（4～12 岁）", price: CHILD, varies: "不会——固定价", note: "未满 4 岁不需购票" },
  {
    ticket: "3 岁以下",
    price: priceLabel("Free", LOCALE),
    varies: "不会——免费",
    note: "记得带替换衣物——涉水区大家都会湿",
  },
  {
    ticket: "残障人士",
    price: "¥1,900 起",
    varies: "会——与成人票同一套价格日历",
    note: "请携带残障证明",
  },
  {
    ticket: "Premium Pass（4 岁以上）",
    price: "¥12,000",
    varies: "不会——固定价",
    note: "任何时间入场、不用排入口队伍；馆内的排队不能跳过",
  },
];

const hoursRows = [
  { item: "营业时间", detail: "公告 08:00–22:00，按日期变动", source: `teamlab.art，${HOURS_CHECKED}` },
  { item: "最后入场", detail: "闭馆前一小时", source: `官方售票网站，${CHECKED}` },
  {
    item: "休馆日",
    detail: "不定期——2026 年 11 月 5 日（周四）与 12 月 3 日（周四）都在内",
    source: `teamlab.art，${HOURS_CHECKED}`,
  },
  {
    item: "入场时段",
    detail: "票面时间就是入场时间；从那一刻起的 30 分钟是入场准备时间",
    source: `官方售票网站，${CHECKED}`,
  },
  {
    item: "入场等候",
    detail: "在入口可能要等 30 到 60 分钟",
    source: `官方售票网站，${CHECKED}`,
  },
  {
    item: "赶不上时段",
    detail: "当天营业时间内仍可入场，但不得超过最后入场时间",
    source: `官方售票网站，${CHECKED}`,
  },
  {
    item: "建议预留时间",
    detail: "约 1.5～2 小时，含储物间与擦干的时间",
    source: "本站的行程估算——teamLab 没有公布",
  },
  {
    item: "储物柜",
    detail: "免费，宽 23 × 深 34 × 高 37 厘米；更大的物品没有寄存处",
    source: `官方售票网站，${CHECKED}`,
  },
];

const ticketChoice = [
  {
    title: "Entrance Pass——成人 ¥3,800~",
    desc: `普通门票，也是几乎所有人该买的那一种。它固定一个日期和一个入场时间，官方售票网站对每个组合分别定价，所以你选哪一天比你从哪里买更重要。核查日期 ${CHECKED}。`,
  },
  {
    title: "Premium Pass——¥12,000，4 岁以上",
    desc: `官方售票网站说它买到的只有一件事：任何时间入场、不用排入口队伍——改到 Information Centre 报到。官方明确写着它不能跳过展区内的排队。只有当入口 30～60 分钟的等候会打乱你一整天时才值得，不是一般意义上的升级。核查日期 ${CHECKED}。`,
  },
  {
    title: "可以改期，不能退款",
    desc: `一旦购买就不能退款。你能做的是改期：按官方说明页，Entrance Pass 可在入场时间 2 小时前更改，Premium Pass 可改到当天 08:30，两者都最多改三次；用优惠券购买的票完全不能改。核查日期 ${CHECKED}。`,
  },
];

const compareRows = [
  { factor: "位置", planets: "丰洲（江东区）", borderless: "麻布台之丘（港区）" },
  { factor: "概念", planets: "沉浸式、赤脚、走进水里", borderless: "没有地图的迷宫，50 多件作品" },
  { factor: "适合", planets: "亲子、第一次来、想要身体感受", borderless: "艺术爱好者、慢慢逛、摄影" },
  { factor: "需要时间", planets: "含赤脚准备约 1.5～2 小时", borderless: "约 2 小时，想久留会更长" },
  { factor: "成人票（起）", planets: ADULT, borderless: priceLabel(PRICES.teamlabBorderless.adult, LOCALE) },
  { factor: "营业时间", planets: "公告 08:00–22:00，按日期变动", borderless: "公告 08:30–21:00，按日期变动" },
  { factor: "入场", planets: "30 分钟入场时段", borderless: "指定时段，或不指定时间的 Flexible Pass" },
  { factor: "需要知道", planets: "预计运营到 2027 年底；赤脚与涉水区", borderless: "现场购票贵 ¥200" },
];

const whoFor = [
  {
    title: "选 Planets 的话…",
    desc: "你带着小孩、想要动手动脚的身体体验，而且不介意脚湿——你会赤脚走过及成人膝盖高的水。这是两间里更好玩、感受更直接的一间，也是带孩子更容易玩得开心的一间。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: "选无界的话…",
    desc: "你想沉浸在艺术里，而不是走过它。麻布台之丘的无界没有固定路线——作品在房间之间移动，你在 50 多个空间里自由游走。它回报的是时间与耐心，对成人来说也是两间里更出片的一间。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="1.5" />
        <circle cx="17.5" cy="10.5" r="1.5" />
        <circle cx="8.5" cy="7.5" r="1.5" />
        <circle cx="6.5" cy="12.5" r="1.5" />
        <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
      </svg>
    ),
  },
  {
    title: "两间都去，如果…",
    desc: "你有两个空闲的半天，而且是资深 teamLab 粉丝。它们在城市的不同区域，是真正不同的体验，所以两间都去不会重复——只要把日期错开，并各自提前订好指定时段。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "先选日期，再从日历上看价格",
    desc: `成人票 ¥3,800~ 起，实际金额取决于你选的日期与入场时间——官方说明页也确认不同日期的价格不同。先把你能去的日期逐一点开看，再决定哪一天。核查日期 ${CHECKED}。`,
  },
  {
    title: "选入场时间，因为那就是你的预约",
    desc: "票面时间就是你的入场时间，从那一刻起的 30 分钟是入场准备时间。美术馆现场没有售票柜台可以补救，所以你选的时段就是你的参观——当天也一样，那时日历可能早就满了。",
  },
  {
    title: "决定 Entrance Pass 还是 Premium Pass",
    desc: "四档票价加上 ¥12,000 的 Premium Pass，只有一种跟排队有关。请先看上面的票种表：Premium Pass 买到的只是免排入口队伍，别无其他，所以多数人该买的是 Entrance Pass，再选早一点的时段。",
  },
  {
    title: "从官方售票网站或它列出的渠道购买",
    desc: `官方说明页写明现场的柜台与售票机都不卖票，并列出有售票的渠道：官方 Ticket Store、Lawson Ticket、Seven Ticket 与 Klook。Klook 的结账页面有中文、可用自己的货币付款，这是多数游客选它的实际原因。不论哪一种，门票都是手机上的二维码。核查日期 ${CHECKED}。`,
  },
  {
    title: "穿适合涉水的衣服，在时段一开始就到",
    desc: "请穿短裤，或可以卷到膝盖以上的长裤——部分作品是水空间，水深可达成人膝盖高。如果你穿裙子或阔腿裤，现场有 XS 到 6L 的免费短裤可借，因为部分地板是镜面的。入口等候可能长达 30 到 60 分钟，所以时段一开始就到。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年 teamLab Planets 门票多少钱？",
    a: `按 teamLab Planets 官方售票网站（核查日期 ${CHECKED}）：成人票 ¥3,800 起，初中与高中生 ¥2,800，4～12 岁儿童 ¥1,500，3 岁以下免费。残障人士 ¥1,900 起，另有 ¥12,000 的 Premium Pass（4 岁以上）。成人票价按日期与时段变动，付款前请确认你自己时段的金额。优惠票需要出示资格证明——请带学生证、护照或残障证明。`,
  },
  {
    q: "teamLab Planets 需要提前订票吗？",
    a: "需要，而且比东京多数景点更需要。Planets 采用 30 分钟入场时段，热门时间会在 2～3 周前售罄，周末与节假日尤其明显。官方说明页写得很清楚：不要指望在美术馆现场买票——门票是网上提前销售，没有现场窗口。出发前就把日期与时段订好。",
  },
  {
    q: "teamLab Planets 可以现场买票吗？",
    a: `不行。官方售票网站的说明页写明，现场的售票柜台与售票机都不销售门票，并列出有售票的渠道：官方 Ticket Store、Lawson Ticket、Seven Ticket 与 Klook。如果你的日期已满，没有现场窗口可以补救——这是 Planets 和东京多数景点最大的不同。核查日期 ${CHECKED}。`,
  },
  {
    q: "teamLab Planets 哪个时段最便宜？",
    a: `就是官方日历在你那一天标价最低的那一个——teamLab 没有公布各时段的价目表，所以这是唯一实在的答案。官方确认的是：成人 Entrance Pass 从 ¥3,800~ 起，而且不同日期价格不同——说明页写着预约可以更改「即使是价格不同的日期」。所以请打开官方日历，把你行程能接受的日期与入场时间逐一点开，付款前就比较，而不是付款后。核查日期 ${CHECKED}。`,
  },
  {
    q: "teamLab Planets 有储物柜吗？",
    a: `有，而且免费。官方说明页写的尺寸是宽 23 厘米、深 34 厘米、高 37 厘米——放得下双肩包，放不下行李箱。现场没有寄存处：更大的物品要由你自己用钢缆锁锁在馆外的婴儿车停放区。鞋子、袜子与裤袜也在储物柜这里脱掉，因为从这里开始全程赤脚。核查日期 ${CHECKED}。`,
  },
  {
    q: "去 teamLab Planets 该穿什么？",
    a: "短裤，或可以卷到膝盖以上的长裤。部分作品是水空间，水深可达成人膝盖高，而且整间美术馆都是赤脚体验——入场时会在储物间脱掉鞋子、袜子与裤袜。部分地板是镜面的，所以裙子与阔腿裤不是好主意；现场有 XS 到 6L 的免费短裤可借。带小孩的话请准备替换衣物，另外婴儿车不能进场（有婴儿车停放区，背带可以）。",
  },
  {
    q: "teamLab Planets 要逛多久？",
    a: "整体预留大约 1.5 到 2 小时。作品本身以不赶的节奏大约需要一到一个半小时，但你还要算上储物间、赤脚与事后擦干的时间——而且在高峰时段，光是入场准备就可能要 30～60 分钟。结束后不要紧接着排其他行程。",
  },
  {
    q: "teamLab Planets 的营业时间？什么时候休馆？",
    a: `营业时间按日期而不同。我们在 ${HOURS_CHECKED} 查看 teamlab.art 时，Planets 公告的时间是 08:00–22:00；官方售票网站在 ${CHECKED} 仍写着最后入场为闭馆前一小时。2026 年年底的休馆日包含 11 月 5 日（周四）与 12 月 3 日（周四）。因为日历每个月都在变，订时段之前请用你自己的日期查官方日历。`,
  },
  {
    q: "错过 teamLab Planets 的时段怎么办？",
    a: "不一定就进不去。官方说明页写的是：票面时间是参考值，如果你迟到，仍可在当天营业时间内入场——但要记得最后入场是闭馆前一小时。不过你可能会比持有该时段票的人等更久，所以还是把你的时段当成计划。",
  },
  {
    q: "teamLab Planets 在哪里？怎么去？",
    a: "位于东京东侧水岸的丰洲。官方交通信息写的是：百合海鸥线「新丰洲站」步行 1 分钟，「市场前站」与丰洲市场步行 5 分钟，东京地铁有乐町线「丰洲站」步行 10 分钟。从东京站打车约 15 分钟，从羽田机场走高速公路约 15 分钟。铁路段用 Suica 或 PASMO 等 IC 卡就可以。",
  },
  {
    q: "teamLab Planets 要关闭了吗？",
    a: "丰洲的 teamLab Planets 预计运营到 2027 年底，teamLab 也公布了新增十件以上作品的扩建计划。日期可能变动，如果你要为它专程安排行程，请先看官方网站。麻布台之丘的 teamLab 无界是另一间独立、持续运营的美术馆，门票分开。",
  },
  {
    q: "teamLab Planets 和无界有什么区别？",
    a: "丰洲的 Planets 是沉浸式、赤脚的体验，你会走进水里与大型装置之中——两间里更偏身体感受、更适合亲子的那一间。麻布台之丘的无界是 50 多件作品组成的无地图迷宫，没有固定路线，作品在空间之间移动，你自由游走。Planets 适合亲子与第一次来的人；无界适合想慢慢探索的艺术爱好者。它们是东京不同区域的两间美术馆，门票各自分开。",
  },
];

const sameDayTours = [
  withKlookLocale(tokyoJoypolisPassport, LOCALE, {
    title: "东京 Joypolis 通行护照",
    desc: "台场 DECKS 室内乐园的入场加无限次游玩护照，手机二维码入场，页面上建议游玩 2 到 4 小时",
  }),
  withKlookLocale(tokyoBaySunsetBoatCruise, LOCALE, {
    title: "东京湾白天与日落游船",
    desc: "从芝浦出发、船上有讲解员的一小时小船游船——不含晚餐的东京湾游船",
  }),
  withKlookLocale(tsukijiCultureFoodTour, LOCALE, {
    title: "筑地文化美食之旅",
    desc: "筑地场外市场导览步行，含试吃与坐下来吃的寿司，讲解语言为英语、中文或西班牙语",
  }),
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "东京地铁通票（24／48／72 小时）",
    desc: "东京地铁与都营地铁全线不限次乘坐，抵达后领取，不用排队购买",
  }),
];

const dayTrips = [
  withKlookLocale(fujiDayTour, LOCALE, {
    title: "东京出发富士山一日游",
    desc: "全天大巴行程，前往富士山五合目、河口湖与忍野八海，当天晚上回到东京",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "东京观光巴士一日游",
    desc: "带讲解的环线行程，游览皇居庭园、浅草与东京晴空塔，提供多语种语音讲解",
  }),
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "teamLab Planets 门票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnTeamLabPlanetsPage({ updated }: { updated: PageUpdated }) {
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

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            teamLab Planets 门票（2026）：<br />票价、预约方式与无界比较
          </h1>
          <p className={styles.heroSubtitle}>
            丰洲的 teamLab Planets 门票多少钱、30 分钟入场时段怎么运作、涉水区该穿什么——
            以及 Planets 和麻布台之丘的无界有什么区别。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "官方票价", "Planets vs 无界"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <p className={styles.bodyText}>
          丰洲 <strong>teamLab Planets</strong> 的成人票在官方售票网站是 <strong>¥3,800~</strong>，
          金额会随你选的日期与入场时间变动，所以 ¥3,800 是最低价而不是定价。入场采用
          <strong>提前预约的 30 分钟入场时段</strong>——官方售票网站写明现场的柜台与售票机都不卖票——
          现场请<strong>预留约 1.5 到 2 小时</strong>，含赤脚的储物间与事后擦干。入口距离百合海鸥线
          <strong>新丰洲站步行 1 分钟</strong>。如果你搜索的是 <strong>teamLab 东京门票</strong>
          而不是特指 Planets，东京有两间 teamLab 美术馆，本篇也会告诉你真正该去哪一间。票价与订票规则读自
          teamLab Planets 官方售票网站，核查日期 {CHECKED}；营业时间读自 teamlab.art，核查日期 {HOURS_CHECKED}。
        </p>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人票</p>
                <p className={styles.verdictStatValue}>¥3,800 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>入场方式</p>
                <p className={styles.verdictStatValue}>30 分钟时段，需提前订</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>建议停留</p>
                <p className={styles.verdictStatValue}>约 1.5～2 小时</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>穿着</p>
                <p className={styles.verdictStatValue}>短裤——赤脚、水深及膝</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>teamLab Planets 成人票 ¥3,800 起，高中生 ¥2,800，4～12 岁 ¥1,500。
              你的票对应一个 30 分钟入场区间，而且现场没有柜台售票，所以周末请提前 2～3 周订。
              你会赤脚入场，部分作品是水空间、水深可达成人膝盖高——请穿短裤或可卷起的长裤
              （现场有 XS–6L 免费短裤可借）。预留 1.5～2 小时，从新丰洲站步行 1 分钟就到。
              想找麻布台之丘那一间？请看我们的{" "}
              <Link href="/zh-cn/guides/attractions/teamlab-borderless-tickets">teamLab 无界门票攻略</Link>。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 teamLab Planets 门票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              票价与订票规则读自 teamLab Planets 官方售票网站，核查日期 {CHECKED}；营业时间与休馆日读自
              teamlab.art，核查日期 {HOURS_CHECKED}。Planets 票价按日期与时段变动、日历也会改，
              请在结账时确认你自己日期的这两项信息。
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>2026 年 teamLab Planets 门票多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人 <strong>¥3,800~</strong>，初中与高中生 ¥2,800，4～12 岁儿童 ¥1,500，未满 4 岁完全免费。
            会变动的只有成人票与残障票：官方售票网站对每个日期、每个入场时间分别定价，所以官方的金额后面带着
            波浪号，也因此你这趟旅程最便宜的门票是日历的问题，而不是从哪里买的问题。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票种", "票价（起）", "会随日期变动吗？", "备注"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.varies}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            读自 teamLab Planets 官方售票网站的英文版与日文版，核查日期 {CHECKED}。优惠票需要出示资格证明，
            请带学生证、护照或残障证明。门票以手机二维码形式发送。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>成人票价会变动多少，官方没有公布。</strong>teamLab 只给出起价和一份日历，而不是价目表；
            说明页也只确认价格有差异——预约可以更改「即使是价格不同的日期」。所以请把 ¥3,800 当成最低价，
            打开官方日历查看你行程能接受的日期，付款前比较每一天的各个入场时间。在这里真正有用的是把 Planets
            往前或往后挪一天；找更便宜的卖家则没有用，因为价格是日期决定的。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>订票前</span>
          <h2 className={styles.sectionTitle}>营业时间、入场时段与需要多久</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Planets 营业时间很长，但你的票不是：票面上的时间是入场时间，入口排队还可能再加 30 到 60 分钟。
            整体预留约 1.5 到 2 小时，后面不要排太紧的行程。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "官方资料怎么写", "来源与日期"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Planets 对你的要求也比一般美术馆门票多——要赤脚进场，而且路线的一部分是水：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>赤脚：</strong>鞋子、袜子与裤袜在储物柜脱掉，全程赤脚体验。</li>
            <li><strong>水：</strong>部分作品是水空间，水深可达成人膝盖高。请穿短裤或可以卷起的长裤。</li>
            <li><strong>镜面地板：</strong>裙子与阔腿裤会有问题——官方 FAQ 写着内衣裤可能会被看见。现场有 XS 到 6L 的免费短裤可借。</li>
            <li><strong>带小孩：</strong>请准备替换衣物。婴儿车不能进场——馆外有婴儿车停放区，背带可以。</li>
            <li><strong>行李：</strong>免费储物柜的尺寸是 23 × 34 × 37 厘米。没有寄存处，所以行李箱要由你自己用钢缆锁锁在婴儿车停放区。</li>
            <li><strong>水质卫生：</strong>官方 FAQ 写着水会持续过滤、每小时检测氯浓度，出口备有消毒过的毛巾。</li>
            <li><strong>轮椅：</strong>可以入场，工作人员会讲解路线；有些作品无法到达，涉水区需要在同行者陪同下换乘专用轮椅。</li>
          </ul>
          <p className={styles.bodyText}>
            营业时间与休馆日每个月都在变，所以请先用你自己的旅行日期打开官方日历，再决定时段。
            以上除了建议预留时间之外，都是官方的写法，核查日期如表中所列。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>你买到的是什么</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 究竟是什么</h2>
          <p className={styles.bodyText}>
            teamLab 是以东京为据点的艺术团体，以「走进去」而不是「看着」的大型数字装置闻名。丰洲的 Planets
            是身体感受最强的那一间：你赤脚、涉水，走过会对你的存在产生反应的作品——镜面无限空间、漂浮光球的
            大厅、活的花园。它是东京两间 teamLab 当中带孩子更容易玩得开心的一间，也是如果你从没见过这种规模的
            数字艺术、冲击最大的一间。
          </p>
          <p className={styles.bodyText}>
            它也很拥挤：teamLab 公布 2025 年参观人次超过 250 万。美术馆预计运营到 2027 年底，并公布了新增
            十件以上作品的扩建计划——所以如果你已经去过，再去也不会是同一趟。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>值不值得</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 值得去吗？</h2>
          <p className={styles.bodyText}>
            对多数第一次来东京的人来说，值得——但它是一个 1.5 到 2 小时、每人 ¥3,800~ 的景点，
            价格像半天行程，花的时间却像一顿悠闲的午饭。与其直接给结论，不如把账摊开算：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>每小时的花费很高。</strong>1.5～2 小时 ¥3,800~，是东京塔主展望台 ¥1,500 的两倍以上，也明显高于涩谷SKY 白天网上票的 {PRICES.shibuyaSky.adult.split(" / ")[0]}，而这两处你都可以多待一会儿。你付的是别处看不到的东西，不是时长——数字可以对照我们的<Link href="/guides/attractions/japan-attraction-ticket-prices">日本景点门票价格总表（英文）</Link>。</li>
            <li><strong>入场的成本是时间，不只是钱。</strong>官方 FAQ 提醒高峰时段入场可能要等 30 到 60 分钟，还要加上赤脚换装的时间。实际要空出两小时。</li>
            <li><strong>它是东京体力消耗最大的美术馆。</strong>全程赤脚、水深及成人膝盖、镜面地板。如果这听起来像折腾而不是体验，麻布台的无界是同一个团体、但没有水。</li>
            <li><strong>不怕下雨，也适合小孩。</strong>室内、未满 4 岁免费，而且常常是孩子在整趟旅行中比寺庙记得更清楚的地方。</li>
            <li><strong>当天无法补救。</strong>现场不卖票，日历满了就是满了。出错的代价是那一整个下午的计划，这才是应该最先订它的真正理由。</li>
          </ul>
          <p className={styles.bodyText}>
            如果你在东京的日程已经很紧、30 分钟的固定时段会打乱你想随性安排的一天，或者同行的人没人想卷起
            裤腿，那就跳过。这三点是这张门票让人失望的原因，而且没有一个跟艺术本身有关。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>余票</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 门票会售罄吗？</h2>
          <p className={styles.bodyText}>
            个别入场时间会售罄，而且你的日期一满就没有柜台可以补救：官方售票网站明确写着，现场的售票柜台与
            售票机都不卖票。所以 Planets 应该是东京一周行程里第一个订的，而不是最后一个。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>我们建议的预订时间：</strong>周末或节假日时段提前两到三周，工作日提前几天，樱花季或新年的日期则越早越好。这是我们根据日历的变化给出的行程建议，不是官方数字——teamLab 没有公布售罄数据。</li>
            <li><strong>没有现场票：</strong>官方信息，核查日期 {CHECKED}。只在网上销售，渠道为官方 Ticket Store、Lawson Ticket、Seven Ticket 或 Klook。</li>
            <li><strong>一次最多十张：</strong>官方售票网站单次购买上限 10 张，库存不足时会更少。20 人以上的团体要走单独的团体申请流程。</li>
            <li><strong>订错时段？</strong>改期就好，不必重新订。Entrance Pass 可在入场时间两小时前更改，最多三次；Premium Pass 可改到当天 08:30。一律不能退款，用优惠券购买的票完全不能改。</li>
            <li><strong>迟到还有救，错过当天就没有：</strong>官方 FAQ 写着当天营业时间内晚一点仍可入场，前提是在闭馆前一小时的最后入场之前。</li>
          </ul>
          <p className={styles.bodyText}>
            实际的结论：先选日期，再选入场时间，最后才选卖家。三者之中有两个决定你到底能不能进去。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>买哪一种</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 该买哪一种票？</h2>
          <p className={styles.bodyText}>
            除了一种情况，都是 Entrance Pass。唯一的另一个选项是 ¥12,000 的 Premium Pass，而官方售票网站
            说它唯一的好处是不用排入口队伍——所以如果 30 到 60 分钟的等候会打乱你一整天，它就值得；
            如果不会，那就是白花 ¥8,000。
          </p>
          <div className={styles.stepsList}>
            {ticketChoice.map((item, i) => (
              <div key={item.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>至于选哪个入场时间：</strong>一天中最早的几个时段，以及最后入场前的最后一小时，是最不容易
            遇到入口长队的两个时段；工作日则在排队上、通常也在价格上胜过周末。我们无法告诉你你那一天哪个时段
            最便宜，因为 teamLab 没有公布各时段的价目表——那要看日历，在下面任一卖家点一下就能看到。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看 teamLab Planets 日期与时段 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook 是官方售票网站列出的渠道之一；GetYourGuide 则是时段没了时的第二个查询渠道。两者都按日期
            定价，所以请打开日历，而不要相信任何标题上的金额——包括本页的。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 门票怎么订？</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            准备好锁定时段了吗？{" "}
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看 Planets 的余票与价格 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>官方直购</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 官方售票网站在哪里？</h2>
          <p className={styles.bodyText}>
            美术馆自己的页面是 <strong>teamlab.art/e/planets</strong>，门票则是通过
            <strong>teamLab Planets TOKYO Official Ticket Store</strong>（
            <strong>teamlabplanets.dmm.com</strong>）销售——官方结账是那个网站，而不是搜索结果。本页所有订票
            规则也都出自它的说明页，核查日期 {CHECKED}。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>还有谁是官方渠道：</strong>官方售票网站列出了 Lawson Ticket、Seven Ticket 与 Klook。不在这份名单上的都是转卖商，没有理由去用。</li>
            <li><strong>支付方式：</strong>通过 DMM 使用信用卡、PayPay 与银联。如果你的卡被拒——这通常就是游客改去别处买的原因——有国际结账的卖家就能解决。</li>
            <li><strong>门票怎么发送：</strong>入场两天前会收到附有二维码门票链接的邮件，二维码本身从入场当天 00:00 起显示。</li>
            <li><strong>直购不会更便宜：</strong>价格由日期与入场时间决定，不论走哪个官方渠道，都是同一份日历定价。</li>
          </ul>
          <p className={styles.bodyText}>
            换句话说：如果你的卡能用、看日文或英文网站没问题，就直接在官方买；如果你想用自己的语言和货币结账，
            就从官方列出的卖家买。两者都是官方渠道，都不是旁门左道。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>带小孩</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 适合带小孩吗？</h2>
          <p className={styles.bodyText}>
            它是东京最适合亲子的美术馆，也是规定最多的一间。未满 4 岁免费，4～12 岁 ¥1,500，水深有些地方及
            成人膝盖——对孩子来说就更高——而且婴儿车完全不能进场。以下都是官方的写法，核查日期 {CHECKED}。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>年龄与票价：</strong>3 岁以下免票；4～12 岁 ¥1,500；初中与高中生 ¥2,800。Premium Pass 从 4 岁起销售。</li>
            <li><strong>陪同：</strong>每三名儿童需有一名成人陪同。一位家长带四个小孩，官方售票网站不会受理。</li>
            <li><strong>婴儿车：</strong>不能进入馆内。馆外有婴儿车停放区，要自己用钢缆锁上锁；馆内可以使用背带。</li>
            <li><strong>纸尿裤：</strong>尿布台在女卫生间内。</li>
            <li><strong>水：</strong>深及成人膝盖，而且全程赤脚。请带替换衣物，做好每个人都会湿的准备，不只是小孩。</li>
            <li><strong>衣着：</strong>每个人都穿短裤或可卷起的长裤；有些地方的地板是镜面的。免费短裤从 XS 到 6L，所以孩子穿连衣裙来也不是问题。</li>
            <li><strong>寄存：</strong>免费储物柜是 23 × 34 × 37 厘米——放得下妈咪包，放不下行李箱，过大的物品要放到婴儿车停放区。</li>
          </ul>
          <p className={styles.bodyText}>
            实际做法：订早一点的时段，先让孩子吃饱，下午的行程保持宽松。考验小孩子的是入口 30 到 60 分钟的
            等候，不是作品本身。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>并排比较</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs 无界：该订哪一间？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>如果你带着孩子、或只打算去一次 teamLab，就订 Planets；如果你想「看」艺术而不是走过它，
            就订无界。</strong>东京有两间 teamLab 美术馆，游客经常订错。它们是城市不同区域的两个独立场馆、
            门票分开：丰洲的 <strong>Planets</strong> 是赤脚走进水里的那一间；麻布台之丘的
            <strong>无界</strong>是 50 多件作品在房间之间移动的无地图迷宫。无界有自己的票价、时间与订票
            门道，我们写在{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-borderless-tickets">teamLab 无界门票攻略</Link>。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Planets", "teamLab 无界"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Planets 票价读自其官方售票网站，核查日期 {CHECKED}；无界票价与两间的营业时间读自 teamlab.art，
            核查日期 {BORDERLESS_CHECKED}。两间的成人票都按日期与时段定价、日历也都会变动，请确认你自己的
            日期。「需要时间」是我们的行程建议，不是官方数字。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一间适合你</span>
          <h2 className={styles.sectionTitle}>该选哪一间 teamLab？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 的位置</h2>
          <p className={styles.bodyText}>
            Planets 位于东京东侧水岸的丰洲，紧邻丰洲市场。官方交通信息写的是：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>新丰洲站</strong>（百合海鸥线）——步行 1 分钟，最方便的走法。</li>
            <li><strong>市场前站</strong>／丰洲市场——步行 5 分钟。</li>
            <li><strong>丰洲站</strong>（东京地铁有乐町线）——步行 10 分钟，LaLaport 丰洲也是 10 分钟。</li>
            <li>从东京站打车约 15 分钟、从银座约 10 分钟，从羽田机场走高速公路约 15 分钟。</li>
            <li><strong>美术馆没有停车场</strong>——官方售票网站请游客乘电车或巴士前往。GINZA SIX 与 Planets 之间有收费接驳巴士。核查日期 {CHECKED}。</li>
          </ul>
          <p className={styles.bodyText}>
            一张{" "}
            <Link href="/guides/transport/ic-cards-japan">Suica 或 PASMO 等 IC 卡（英文）</Link>{" "}
            就能乘坐有乐町线与百合海鸥线两段——如果你对丰洲不熟，{" "}
            <Link href="/guides/transport/tokyo-transportation">我们的东京交通攻略（英文）</Link>{" "}
            有各线路的说明。
          </p>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="同一天在丰洲与台场就能订的行程"
          intro="Planets 的时段只占东边这一天的一个半小时，而把你送到门口的百合海鸥线会继续开往台场。地铁通票覆盖去丰洲的地铁路段，但不含百合海鸥线；另外三个都在美术馆附近、坐一小段车就到。Klook 会拦截自动读取价格，所以请打开页面查看你那一天的金额与时间。"
          tours={sameDayTours}
        />

        <KlookTourPicks
          heading="从同一座城市出发的一日游"
          intro="Planets 在现场大约一个半小时，所以通常会和别的行程共用一天。如果你东京那半段旅程还有一整天没安排，这两个行程从市区出发、当天晚上回来。"
          tours={dayTrips}
        />

        <Related
          items={[
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking（英文）" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto Tickets: Prices, Hours & Booking（英文）" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab Botanical Garden Osaka Tickets: Prices & Hours（英文）" },
            { href: "/zh-cn/guides/attractions/tokyo-skytree-tickets", title: "东京晴空塔门票（2026）：票价、350 与 450 楼怎么选" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "Warner Bros. Studio Tour Tokyo Tickets (2026): Prices & How to Book（英文）" },
            { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", title: "teamLab 无界 门票（2026）：票价、时段预约与购票渠道" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards Explained（英文）" },
            { href: "/guides/transport/ic-cards-japan", title: "IC Cards in Japan 2026: Suica, Pasmo & How to Use Them（英文）" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>准备订 teamLab Planets 了吗？</h2>
            <p className={styles.ctaBannerDesc}>
              入场以 30 分钟为一段，好的时段 2～3 周前就会没有。Klook 是 teamLab 的官方售票合作伙伴，
              结账页面有中文、可用自己的货币付款，电子票直接存在手机里。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 teamLab Planets 门票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
