// Simplified Chinese edition of /guides/attractions/teamlab-planets-tickets. Mirrors the English page
// block by block as of 2026-11-06 (same sections, tables, FAQ, Klook / GetYourGuide CTAs and tour
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
import { PlanetsAnswer, PlanetsSameDay } from "../../../../components/PlanetsBooking";
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
import { PLANETS_FACTS, PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, attractionEventJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

const LOCALE = "zh-cn" as const;
const GYG_SLUG = "zh-cn-teamlab-planets-tickets";

// teamLab Planets TOKYO（丰洲）门票 — the same Klook product as the English page, on zh-CN.
const PLANETS_URL = cnTeamlabPlanets.url;

// 所有内容均于同一天查阅：票价、开放时间、闭馆日与交通资料取自 teamlab.art，订票规则取自官方售票网站。
// 官方没有公布人流高峰时段和参观时长，这两项写「官方未公布」，建议预留时间标明是本站的估算。
const P = PRICES.teamlabPlanets;
const CHECKED = dateLabel(P.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const CHILD = priceLabel(P.child, LOCALE);

const ROUTE = "/zh-cn/guides/attractions/teamlab-planets-tickets";
const TITLE = "teamLab Planets 门票 2026：票价、时间与预约方式";
const DESC = `teamLab Planets（丰洲）门票成人 ${ADULT}，随日期与时段变动。这里整理开放时间、闭馆日、预约方式，以及从新丰洲站和丰洲站怎么走。`;

const priceRows = [
  {
    ticket: "成人（18 岁以上）",
    price: ADULT,
    varies: "会——随日期与入场时间变动",
    note: "这是最低起售价，并非固定票价：官方售票网站对每个日期与时段分别定价",
  },
  { ticket: "初高中生", price: "¥2,800", varies: "不会——固定价", note: "请携带学生证" },
  { ticket: "儿童（4～12 岁）", price: CHILD, varies: "不会——固定价", note: "未满 4 岁不需购票" },
  {
    ticket: "3 岁及以下",
    price: priceLabel("Free", LOCALE),
    varies: "不会——免费",
    note: "记得带上换洗衣物，经过涉水区每个人都会弄湿",
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
  { item: "开放时间", detail: "08:00–22:00；12 月 31 日（周四）至 1 月 2 日（周六）为 08:00–20:00", source: `teamlab.art，${CHECKED}` },
  { item: "最后入场", detail: "闭馆前 1 小时", source: `teamlab.art，${CHECKED}` },
  { item: "闭馆日", detail: "2026 年 12 月 3 日（周四）、2027 年 1 月 14 日（周四）", source: `teamlab.art，${CHECKED}` },
  { item: "展期", detail: "2018 年 7 月 7 日至 2027 年底", source: `teamlab.art，${CHECKED}` },
  {
    item: "入场时间",
    detail: "票面时间就是入场时间；从预约时间开始，有 30 分钟的入场准备时间",
    source: `官方售票网站，${CHECKED}`,
  },
  { item: "入场等候", detail: "可能要等 30 到 60 分钟", source: `官方售票网站，${CHECKED}` },
  { item: "人流高峰时段", detail: "官方未公布", source: `已查 teamlab.art 与官方售票网站，${CHECKED}` },
  {
    item: "赶不上时段",
    detail: "当天开放时间内仍可入场，但不得超过最后入场时间",
    source: `官方售票网站，${CHECKED}`,
  },
  {
    item: "建议预留时间",
    detail: "官方未公布。我们按 1.5–2 小时规划，含使用储物柜与擦干双脚的时间",
    source: "本站的规划估算",
  },
  {
    item: "储物柜",
    detail: "免费，宽 23 × 深 34 × 高 37 厘米；更大的物品没有寄存处",
    source: `官方售票网站，${CHECKED}`,
  },
];

const ticketChoice = [
  {
    title: `Entrance Pass——成人 ${ADULT}`,
    desc: `普通门票，也是几乎所有人该买的那一种。它固定一个日期和一个入场时间，官方售票网站对每个组合分别定价，所以你选哪一天比你从哪里买更重要。${CHECKED} 查阅。`,
  },
  {
    title: "Premium Pass——¥12,000，4 岁以上",
    desc: `官方售票网站说它买到的只有一件事：任何时间入场、不用排入口队伍——改到 Information Centre 报到。官方明确写着它不能跳过展区内的排队。只有当入口 30–60 分钟的等候会打乱你一整天时才值得，不是一般意义上的升级。${CHECKED} 查阅。`,
  },
  {
    title: "可以改期，不能退款",
    desc: `一旦购买就不能退款。你能做的是改期：按官方说明页，Entrance Pass 可在入场时间 2 小时前更改，Premium Pass 可改到当天 08:30，两者都最多改三次；用优惠券购买的票完全不能改。${CHECKED} 查阅。`,
  },
];

const prepRows = [
  { item: "穿着", detail: "短裤或可卷到膝盖以上的长裤。水深可到成人膝盖，部分地板是镜面，不建议穿超短裙。现场有免费租借短裤，尺码 XS 到 6L，离场前归还。" },
  { item: "门票", detail: "手机或平板上的二维码电子票，或打印出来。一个二维码涵盖同一订单的所有人。入场前 2 天会收到提醒邮件，二维码在入场当天 00:00 起才会显示。" },
  { item: "证件", detail: "初高中生票需学生证或官方年龄证明，残障人士票需经认可的证明文件。" },
  { item: "包", detail: "入场闸门后有免费储物柜，尺寸 23 × 34 × 37 厘米。更大的行李只能用钢缆锁固定在馆外的婴儿车停放区。" },
  { item: "毛巾", detail: "不必带。水中作品的出口提供毛巾。" },
  { item: "带孩子", detail: "每 3 名儿童至少要有 1 名成人陪同，免费入场的儿童也要计入。请带换洗衣物。背带可以入内，婴儿车需停在馆外。" },
  { item: "再次入场", detail: "所有票种都不可以，包括 Premium Pass。入场后不可退票。" },
];

const steps = [
  {
    title: "先选日期，再从日历上看价格",
    desc: `成人票 ${ADULT}，实际金额取决于你选的日期与入场时间——官方说明页也确认不同日期的价格不同。先把你能去的日期逐一点开看，再决定哪一天。${CHECKED} 查阅。`,
  },
  {
    title: "选入场时间，因为那就是你的预约",
    desc: "票面时间就是你的入场时间，从预约时间开始，有 30 分钟的入场准备时间。美术馆现场没有售票柜台可以补买，所以你选的时段就是你的参观——当天也一样，那时日历可能已经满了。",
  },
  {
    title: "决定 Entrance Pass 还是 Premium Pass",
    desc: "四档票价加上 ¥12,000 的 Premium Pass，只有一种跟排队有关。请先看上面的票种表：Premium Pass 买到的只是免排入口队伍，别无其他，所以多数人该买的是 Entrance Pass，再选早一点的时段。",
  },
  {
    title: "从官方售票网站或它列出的渠道购买",
    desc: `官方说明页写明现场的柜台与售票机都不卖票，并列出有售票的渠道：官方售票网站、Lawson Ticket、Seven Ticket 与 Klook。Klook 的结账页面有中文、可用自己的货币付款，这是多数游客选它的实际原因。不论哪一种，门票都是手机上的二维码。${CHECKED} 查阅。`,
  },
  {
    title: "穿适合涉水的衣服，在时段一开始就到",
    desc: "请穿短裤，或可以卷到膝盖以上的长裤——部分作品是水空间，水深可达成人膝盖高。如果你穿裙子或阔腿裤，现场有 XS 到 6L 的免费短裤可借，因为部分地板是镜面的。入口等候可能长达 30 到 60 分钟，所以时段一开始就到。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年 teamLab Planets 门票多少钱？",
    a: `按 teamLab Planets 官方售票网站（${CHECKED} 查阅）：成人票 ${ADULT}，初高中生 ¥2,800，4～12 岁儿童 ${CHILD}，3 岁及以下免费。残障人士 ¥1,900 起，另有 ¥12,000 的 Premium Pass（4 岁以上）。成人票价随日期与时段变动，付款前请确认你自己时段的金额。优惠票需要出示资格证明——请带学生证、护照或残障证明。`,
  },
  {
    q: "teamLab Planets 需要提前订票吗？",
    a: `需要。门票对应指定的日期和入场时间，官方售票网站也写明现场不售票，所以某一天满了就无法在门口补买。teamLab 没有公布售罄数据，日期会提前多久订满，官方未公布。行程一确定就订。${CHECKED} 查阅。`,
  },
  {
    q: "teamLab Planets 可以现场买票吗？",
    a: `不行。官方售票网站的说明页写明，现场的售票柜台与售票机都不销售门票，并列出有售票的渠道：官方售票网站、Lawson Ticket、Seven Ticket 与 Klook。如果你的日期已满，现场也没有售票窗口可以补买——这是 Planets 和东京多数景点最大的不同。${CHECKED} 查阅。`,
  },
  {
    q: "teamLab Planets 哪个时段最便宜？",
    a: `就是官方日历在你那一天标价最低的那一个——teamLab 没有公布各时段的价目表，所以这是唯一实在的答案。官方确认的是：成人 Entrance Pass ${ADULT}，而且不同日期价格不同——说明页写着预约可以更改「即使是价格不同的日期」。所以请打开官方日历，把你行程能接受的日期与入场时间逐一点开，付款前就比较，而不是付款后。${CHECKED} 查阅。`,
  },
  {
    q: "teamLab Planets 有储物柜吗？",
    a: `有，而且免费。官方说明页写的尺寸是宽 23 厘米、深 34 厘米、高 37 厘米——放得下双肩包，放不下行李箱。现场没有寄存处：更大的物品需自行用钢缆锁固定在馆外的婴儿车停放区。鞋子、袜子和连裤袜也在储物柜区域脱下，因为从这里开始全程赤脚。${CHECKED} 查阅。`,
  },
  {
    q: "去 teamLab Planets 该穿什么？",
    a: "短裤，或可以卷到膝盖以上的长裤。部分作品是水空间，水深可达成人膝盖高，而且整间美术馆都是赤脚体验——入场时会在储物柜区域脱下鞋子、袜子和连裤袜。部分地板是镜面的，所以穿裙子或阔腿裤会不方便；现场有 XS 到 6L 的免费短裤可借。带小孩的话请准备换洗衣物，另外婴儿车不能进场（有婴儿车停放区，背带可以）。",
  },
  {
    q: "teamLab Planets 的二维码门票什么时候会收到？",
    a: `门票一律是二维码电子票。购票确认邮件里有票券链接，入场前 2 天会收到提醒邮件，二维码在入场当天 00:00 起才会显示。一个二维码涵盖同一订单的所有人，可以用手机、平板出示或打印。${CHECKED} 查阅。`,
  },
  {
    q: "teamLab Planets 要逛多久？",
    a: `官方未公布参观时长。我们按馆内 1.5–2 小时规划，含使用储物柜与擦干双脚的时间。还要加上官方售票网站提醒的 30–60 分钟等候，结束后不要紧接着排其他行程。官方售票网站也写明，人多时停留较久的游客可能会被请求离场。${CHECKED} 查阅。`,
  },
  {
    q: "teamLab Planets 的开放时间？什么时候闭馆？",
    a: `teamlab.art 公布的开放时间是 08:00–22:00，12 月 31 日至 1 月 2 日为 08:00–20:00，闭馆前 1 小时停止入场。闭馆日为 2026 年 12 月 3 日（周四）和 2027 年 1 月 14 日（周四）。${CHECKED} 查阅。预订前请在官方网站确认你自己的日期。`,
  },
  {
    q: "错过 teamLab Planets 的时段怎么办？",
    a: "你仍然可以入场。官方说明页写的是：票面时间是参考值，如果你迟到，仍可在当天开放时间内入场。最后入场是闭馆前 1 小时。",
  },
  {
    q: "teamLab Planets 在哪里？怎么去？",
    a: `地址是东京都江东区丰洲 6-1-16。teamlab.art 公布的走法：百合海鸥线新丰洲站 1A 出口步行 3 分钟，市场前站与丰洲市场步行 5 分钟，东京地铁有乐町线丰洲站 7 号出口步行 10 分钟。从东京站打车 15 分钟，从羽田机场走高速公路 15 分钟。${CHECKED} 查阅。`,
  },
  {
    q: "teamLab Planets 要关闭了吗？",
    a: `teamlab.art 公布的展期是 2018 年 7 月 7 日至 2027 年底。${CHECKED} 查阅。麻布台之丘的 teamLab 无界是另一间独立的美术馆，门票分开。`,
  },
  {
    q: "teamLab Planets 和无界有什么区别？",
    a: "丰洲的 Planets 是赤脚走进水里的美术馆。麻布台之丘的无界是没有固定参观路线的迷宫式空间，作品在房间之间移动。两间是独立的美术馆，门票分开。我们的 teamLab Planets 与无界比较页把两者并排列出。",
  },
];

const sameDayTours = [
  withKlookLocale(tokyoJoypolisPassport, LOCALE, {
    title: "东京 Joypolis 通行护照",
    desc: "台场 DECKS 室内乐园入场及设施无限次游玩通行证，手机二维码入场，页面上建议游玩 2 到 4 小时",
  }),
  withKlookLocale(tokyoBaySunsetBoatCruise, LOCALE, {
    title: "东京湾白天与日落游船",
    desc: "从芝浦出发、配有讲解员的一小时小型游船——不含晚餐的东京湾游船",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: attractionEventJsonLd({
              route: ROUTE,
              name: "teamLab Planets TOKYO",
              description: DESC,
              inLanguage: JSONLD_LANG["zh-cn"],
              facts: PLANETS_FACTS,
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            teamLab Planets 门票（2026）：<br />票价、时间与预约方式
          </h1>
          <p className={styles.heroSubtitle}>
            丰洲 teamLab Planets 的门票多少钱、什么时候开放、怎么预约，以及从新丰洲站或丰洲站怎么走。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "官网票价与开放时间", "查阅 teamlab.art"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <PlanetsAnswer />

        <PlanetsSameDay />

        <p className={styles.bodyText}>
          还在两间东京美术馆之间犹豫？我们的{" "}
          <Link href="/zh-cn/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 与无界比较</Link>{" "}
          把两者并排列出。
        </p>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>2026 年 teamLab Planets 门票多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人 <strong>{ADULT}</strong>，初高中生 ¥2,800，4～12 岁儿童 {CHILD}，未满 4 岁完全免费。
            只有成人票和残障人士票的价格会变动：官方售票网站对每个日期、每个入场时间分别定价，所以官方标示的金额后面带有
            波浪号（～）；能否买到低价票，取决于日期，而不是购票渠道。
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
            {CHECKED} 查阅 teamLab Planets 官方售票网站的英文版与日文版。优惠票需要出示资格证明，
            请带学生证、护照或残障证明。门票以手机二维码形式发送。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>成人票价会变动多少，官方没有公布。</strong>teamLab 只给出起价和一份日历，而不是价目表；
            说明页也只确认价格有差异——预约可以更改「即使是价格不同的日期」。所以请把 {ADULT.replace(" 起", "")}{" "}
            当成最低价，打开官方日历查看你行程能接受的日期，付款前比较每一天的各个入场时间。更有效的办法是把
            参观日期提前或推后一天；找更便宜的卖家则没有用，因为价格是日期决定的。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>订票前</span>
          <h2 className={styles.sectionTitle}>开放时间、入场时段与需要多久</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            票面上的时间是入场时间，官方售票网站提醒可能要等 30 到 60 分钟。人流高峰时段和参观时长，
            teamLab 都没有公布。
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
            <li><strong>赤脚：</strong>在储物柜区域脱下鞋子、袜子和连裤袜，全程赤脚体验。</li>
            <li><strong>水：</strong>部分作品是水空间，水深可达成人膝盖高。请穿短裤或可以卷起的长裤。</li>
            <li><strong>镜面地板：</strong>穿裙子或阔腿裤会不方便——官方 FAQ 提醒，镜面地板可能映出内衣裤。现场有 XS 到 6L 的免费短裤可借。</li>
            <li><strong>带小孩：</strong>请准备换洗衣物。婴儿车不能进场——馆外有婴儿车停放区，背带可以。</li>
            <li><strong>行李：</strong>免费储物柜的尺寸是 23 × 34 × 37 厘米。没有寄存处，所以行李箱需自行用钢缆锁固定在婴儿车停放区。</li>
            <li><strong>水质卫生：</strong>官方 FAQ 写着水会持续过滤、每小时检测氯浓度，出口备有消毒过的毛巾。</li>
            <li><strong>轮椅：</strong>可以入场，工作人员会讲解路线；有些作品无法到达，涉水区需要在同行者陪同下换乘专用轮椅。</li>
          </ul>
          <p className={styles.bodyText}>
            预订前请在官方网站确认你自己的日期。以上除了建议预留时间之外，都是官方的写法，查阅日期如表中所列。
            官方售票网站也写明，人多时停留较久的游客可能会被请求离场。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>你买到的是什么</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 究竟是什么</h2>
          <p className={styles.bodyText}>
            teamLab 是以东京为据点的艺术团体，以让观众走进作品、亲身体验的大型数字艺术装置闻名。丰洲的 Planets
            是身体感受最强的那一间：你赤脚、涉水，走过会对你的存在产生反应的作品——镜面无限空间、漂浮光球的
            大厅、充满生机的花园。它是东京两间 teamLab 当中带孩子更容易玩得开心的一间，也是如果你从没见过这种规模的
            数字艺术、冲击最大的一间。
          </p>
          <p className={styles.bodyText}>
            teamlab.art 公布的展期是 2018 年 7 月 7 日至 2027 年底，这之后的行程需要重新确认。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>值不值得</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 值得去吗？</h2>
          <p className={styles.bodyText}>
            对多数第一次来东京的人来说，值得——但它是一个 1.5 到 2 小时、每人 {ADULT}的景点，
            票价相当于半天行程，参观时间却只有一顿悠闲午餐那么长。以下列出计算方式，方便自行比较：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>每小时的花费很高。</strong>1.5–2 小时 {ADULT}，是东京塔主展望台 ¥1,500 的两倍以上，也明显高于涩谷 SKY 白天网上票的 {PRICES.shibuyaSky.adult.split(" / ")[0]}，而这两处你都可以多待一会儿。你付的是别处看不到的东西，不是时长——数字可以对照我们的<Link href="/guides/attractions/japan-attraction-ticket-prices">日本景点门票价格总表（英文）</Link>。</li>
            <li><strong>入场的成本是时间，不只是钱。</strong>官方售票网站提醒入场可能要等 30 到 60 分钟，还要加上赤脚换装的时间。</li>
            <li><strong>它是东京体力消耗最大的美术馆。</strong>全程赤脚、水深及成人膝盖、镜面地板。如果你不喜欢赤脚或涉水，麻布台的无界是同一个团体、但没有水。</li>
            <li><strong>不怕下雨，也适合小孩。</strong>室内、未满 4 岁免费，而且常常是孩子在整趟旅行中比寺庙记得更清楚的地方。</li>
            <li><strong>当天无法在现场补买。</strong>现场不卖票，日历满了就是满了。出错的代价是那一整个下午的计划，这才是应该最先订它的真正理由。</li>
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
            个别入场时间会售罄，而且指定日期售罄后，现场也没有售票柜台可以补买：官方售票网站明确写着，现场的售票柜台与
            售票机都不卖票。所以 Planets 应该是东京一周行程里第一个订的，而不是最后一个。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>要提前多久：</strong>官方未公布，teamLab 也没有公布售罄数据。行程一确定就订。</li>
            <li><strong>没有现场票：</strong>官方信息，{CHECKED} 查阅。只在网上销售，渠道为官方售票网站、Lawson Ticket、Seven Ticket 或 Klook。</li>
            <li><strong>一次最多十张：</strong>官方售票网站单次购买上限 10 张，库存不足时会更少。20 人以上的团体要走单独的团体申请流程。</li>
            <li><strong>订错时段？</strong>改期就好，不必重新订。Entrance Pass 可在入场时间两小时前更改，最多三次；Premium Pass 可改到当天 08:30。一律不能退款，用优惠券购买的票完全不能改。</li>
            <li><strong>迟到仍可入场，错过当天则无法使用：</strong>官方 FAQ 写着当天开放时间内晚一点仍可入场，前提是在闭馆前 1 小时的最后入场之前。</li>
          </ul>
          <p className={styles.bodyText}>
            实际的结论：先选日期，再选入场时间，最后才选卖家。其中日期与入场时间决定你能否入场。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>买哪一种</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 该买哪一种票？</h2>
          <p className={styles.bodyText}>
            除了一种情况，都是 Entrance Pass。唯一的另一个选项是 ¥12,000 的 Premium Pass，而官方售票网站
            说它唯一的好处是不用排入口队伍——所以如果 30 到 60 分钟的等候会打乱你一整天，它就值得；
            如果不会，多付的 ¥8,000 就没有意义。
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
            <strong>至于选哪个入场时间：</strong>哪些时段人最多，官方未公布，teamLab 也没有公布各时段的价目表。
            在下面任一卖家点一下，日历上就能看到每个时间的价格。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看 teamLab Planets 日期与时段 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook 是官方售票网站列出的代理商之一；GetYourGuide 则是时段没了时的第二个查询渠道。两者都按日期
            定价，所以请以预订页面日历显示的实际票价为准，包括本页标题中的价格。
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
            准备好预订入场时段了吗？{" "}
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
            <strong>teamlabplanets.dmm.com</strong>）销售——官方购票请前往上述网站，而不是搜索结果中的其他页面。本页所有订票
            规则也都出自它的说明页，{CHECKED} 查阅。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>官方列出的其他渠道：</strong>官方售票网站列出了 Lawson Ticket、Seven Ticket 与 Klook。不在这份名单上的都是转卖商，没有理由去用。</li>
            <li><strong>支付方式：</strong>通过 DMM 使用信用卡、PayPay 与银联。如果你的卡被拒——这通常就是游客改去别处买的原因——可改用支持国际信用卡付款的售票平台。</li>
            <li><strong>门票怎么发送：</strong>入场两天前会收到附有二维码门票链接的邮件，二维码本身从入场当天 00:00 起显示。</li>
            <li><strong>直购不会更便宜：</strong>价格由日期与入场时间决定，不论走哪个官方列出的渠道，都是同一份日历定价。</li>
          </ul>
          <p className={styles.bodyText}>
            换句话说：如果你的卡能用、看日文或英文网站没问题，就直接在官方买；如果你想用自己的语言和货币结账，
            就从官方列出的卖家买。两者都是官方认可的正规购票渠道。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>带小孩</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 适合带小孩吗？</h2>
          <p className={styles.bodyText}>
            它是东京最适合亲子的美术馆，也是规定最多的一间。未满 4 岁免费，4～12 岁 {CHILD}，部分区域水深可达
            成人膝盖——对孩子来说就更高——而且婴儿车完全不能进场。以下都是官方的写法，{CHECKED} 查阅。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>年龄与票价：</strong>3 岁及以下免票；4～12 岁 {CHILD}；初高中生 ¥2,800。Premium Pass 从 4 岁起销售。</li>
            <li><strong>陪同：</strong>每三名儿童需有一名成人陪同。一位家长带四个小孩，官方售票网站不会受理。</li>
            <li><strong>婴儿车：</strong>不能进入馆内。馆外有婴儿车停放区，要自己用钢缆锁上锁；馆内可以使用背带。</li>
            <li><strong>纸尿裤：</strong>女卫生间内设有尿布台。</li>
            <li><strong>水：</strong>深及成人膝盖，而且全程赤脚。请带换洗衣物，不论大人或小孩，都要做好衣物弄湿的准备。</li>
            <li><strong>衣着：</strong>每个人都穿短裤或可卷起的长裤；有些地方的地板是镜面的。免费短裤从 XS 到 6L，所以孩子穿连衣裙来也不是问题。</li>
            <li><strong>寄存：</strong>免费储物柜是 23 × 34 × 37 厘米——放得下妈妈包，放不下行李箱，过大的物品要放到婴儿车停放区。</li>
          </ul>
          <p className={styles.bodyText}>
            实际做法：订早一点的时段，先让孩子吃饱，下午的行程保持宽松。考验小孩子的是入口 30 到 60 分钟的
            等候，不是作品本身。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Planets 还是无界</span>
          <h2 className={styles.sectionTitle}>该订 Planets 还是无界？</h2>
          <p className={styles.bodyText}>
            它们是两间独立的美术馆，门票分开。Planets 是赤脚走进水里的那一间；无界是位于麻布台之丘、没有固定参观路线的迷宫式空间。
            票价、开放时间和各自适合谁，请看我们的{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 与无界比较</Link>；
            无界的预订方式请看{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-borderless-tickets">teamLab 无界门票攻略</Link>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>出发前</span>
          <h2 className={styles.sectionTitle}>去 teamLab Planets 该穿什么、带什么？</h2>
          <ul className={styles.bodyList}>
            {prepRows.map((row) => (
              <li key={row.item}><strong>{row.item}：</strong>{row.detail}</li>
            ))}
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            资料来自官方售票网站与帮助页面，{CHECKED} 查阅。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>从丰洲站和新丰洲站怎么去 teamLab Planets</h2>
          <p className={styles.bodyText}>
            地址是东京都江东区丰洲 6-1-16（東京都江東区豊洲6-1-16）。teamlab.art 公布的走法如下，{CHECKED} 查阅：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>新丰洲站</strong>（百合海鸥线）：1A 出口步行 3 分钟。官方售票网站的指引是出检票口后右转，走北口。</li>
            <li><strong>丰洲站</strong>（东京地铁有乐町线）：7 号出口步行 10 分钟。沿百合海鸥线高架前行，美术馆在右手边。</li>
            <li><strong>市场前站</strong>（百合海鸥线）与丰洲市场：步行 5 分钟。</li>
            <li><strong>出租车：</strong>从银座 10 分钟，从东京站 15 分钟，从羽田机场走高速公路 15 分钟。</li>
            <li><strong>巴士：</strong>teamlab.art 提醒，从东京站、银座、筑地出发的都营巴士都 05-2 路非常拥挤，建议改用其他交通方式。GINZA SIX 与美术馆之间有收费接驳巴士。</li>
            <li><strong>停车场：</strong>美术馆没有停车场。</li>
          </ul>
          <p className={styles.bodyText}>
            一张{" "}
            <Link href="/guides/transport/ic-cards-japan">Suica 或 PASMO 等 IC 卡（英文）</Link>{" "}
            就能乘坐有乐町线与百合海鸥线两段——如果你对丰洲不熟，{" "}
            <Link href="/guides/transport/tokyo-transportation">我们的东京交通攻略（英文）</Link>{" "}
            有各线路的说明。
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="同一天在丰洲与台场就能订的行程"
          intro="我们按 1.5–2 小时规划 Planets，这只占东边这一天的一部分，而把你送到门口的百合海鸥线会继续开往台场。地铁通票覆盖去丰洲的地铁路段，但不含百合海鸥线；另外三个都在美术馆附近、坐一小段车就到。Klook 价格随日期变化，所以请打开页面查看你那一天的金额与时间。"
          tours={sameDayTours}
        />

        <KlookTourPicks
          heading="从同一座城市出发的一日游"
          intro="我们按 1.5–2 小时规划 Planets，所以它通常会和别的行程共用一天。如果你东京那半段旅程还有一整天没安排，这两个行程从市区出发、当天晚上回来。"
          tours={dayTrips}
        />

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 与无界对比：东京该去哪一馆（2026）" },
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking（英文）" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto Tickets: Prices, Hours & Booking（英文）" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab Botanical Garden Osaka Tickets: Prices & Hours（英文）" },
            { href: "/zh-cn/guides/attractions/tokyo-skytree-tickets", title: "东京晴空塔门票（2026）：票价、350 米与 450 米怎么选" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "Warner Bros. Studio Tour Tokyo Tickets (2026): Prices & How to Book（英文）" },
            { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", title: "teamLab 无界 门票（2026）：票价、时段预约与购票渠道" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷 SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards Explained（英文）" },
            { href: "/guides/transport/ic-cards-japan", title: "IC Cards in Japan 2026: Suica, Pasmo & How to Use Them（英文）" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>准备订 teamLab Planets 了吗？</h2>
            <p className={styles.ctaBannerDesc}>
              门票对应指定的日期和时间，美术馆现场不售票。Klook 是官方售票网站列出的代理商之一，门票是手机上的二维码。
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
