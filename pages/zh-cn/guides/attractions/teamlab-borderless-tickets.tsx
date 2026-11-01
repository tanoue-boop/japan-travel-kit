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
import { GygCompareButton } from "../../../../components/GygCompare";
import { cnTeamlabBorderless } from "../../../../lib/klook-links-zh-cn";
import { gygTeamlabBorderless } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

// Mirrors the English guide (pages/guides/attractions/teamlab-borderless-tickets.tsx) as of
// 2026-11-01, section by section; every figure is the English page's or comes from
// lib/attraction-prices.ts, and nothing was added for this edition.

const ROUTE = "/zh-cn/guides/attractions/teamlab-borderless-tickets";
const TITLE = "teamLab 无界 门票（2026）：票价、时段预约与购票渠道";
const DESC =
  "teamLab 无界（麻布台之丘）门票 2026：官方票价成人 ¥3,400 起、浮动定价怎么算、指定入场时段与休馆日，官网和 Klook 该选哪个。";

const BORDERLESS_URL = cnTeamlabBorderless.url;
const GYG_SLUG = "zh-cn-teamlab-borderless-tickets";

const P = PRICES.teamlabBorderless;
const CHECKED = dateLabel(P.checked, "zh-cn");
const ADULT = priceLabel(P.adult, "zh-cn");
const CHILD = priceLabel(P.child, "zh-cn");

const PLANETS = PRICES.teamlabPlanets;
const PLANETS_CHECKED = dateLabel(PLANETS.checked, "zh-cn");

// The date the official ticket address redirect was confirmed (English: ADDRESS_CHECKED).
const ADDRESS_CHECKED = dateLabel("2026-10-26", "zh-cn");
// GYG_CHECKED_AT in lib/gyg-links.ts ("21 Oct 2026"), written as a Chinese date.
const GYG_CHECKED = dateLabel("2026-10-21", "zh-cn");

const priceRows = [
  {
    ticket: "成人（18 岁以上）",
    price: ADULT,
    varies: "会——按日期与入场时段",
    note: "¥3,400 是底价，不是你的价格：付款前请确认你那天的金额",
  },
  { ticket: "13～17 岁", price: "¥2,800", varies: "不会——固定价", note: "看起来比较成熟的话请带证件" },
  { ticket: "4～12 岁", price: CHILD, varies: "不会——固定价", note: "不论选哪一天都一样" },
  { ticket: "3 岁以下", price: "免费", varies: "不会——免费", note: "不需购票" },
  {
    ticket: "残障人士",
    price: "¥1,700 起",
    varies: "会——与成人票同一套日历",
    note: "一位陪同人员同享优惠票价；请携带资格证明",
  },
];

const hoursRows = [
  { item: "营业时间", detail: "公告为 08:30–21:00，按日期而异", source: `teamlab.art，${CHECKED}` },
  { item: "最后入场", detail: "闭馆前一小时——21:00 闭馆就得在 20:00 前进场", source: `teamlab.art，${CHECKED}` },
  {
    item: "提早与延长",
    detail: "部分日期提早闭馆（2026 年 11 月 17 日为 17:00），部分日期延长（特定日期到 22:00）",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "休馆日",
    detail: "不定期的周二——包括 2026 年 10 月 20 日、11 月 24 日与 12 月 8 日",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "Entrance Pass",
    detail: "同时指定日期与入场时间；时段就是你的预约",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "Flexible Pass",
    detail: "在指定日期有效、不指定入场时间，价格较高",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "改日期",
    detail: "直接向 teamLab 购买的票最多可改三次",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "现场购票",
    detail: "还有名额时在馆内销售，成人 +¥200，儿童或残障票 +¥100",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "建议停留",
    detail: "约两小时——拍照的话更久，而且没有固定路线可以让你赶",
    source: "本站的规划参考值——teamLab 未公布",
  },
];

const vsPlanetsRows = [
  {
    factor: "地点",
    borderless: "港区·麻布台之丘——神谷町站步行 2 分钟",
    planets: "丰洲——新丰洲站步行 1 分钟",
  },
  { factor: "成人票", borderless: `${ADULT}，按日期与时段`, planets: `${priceLabel(PLANETS.adult, "zh-cn")}，按日期与时段` },
  { factor: "4～12 岁", borderless: CHILD, planets: priceLabel(PLANETS.child, "zh-cn") },
  {
    factor: "体验方式",
    borderless: "穿着鞋，走进没有地图、50 多件作品组成的迷宫",
    planets: "赤脚，走过水深到成人膝盖的水中",
  },
  {
    factor: "入场",
    borderless: "日期＋入场时间，或不指定时间的 Flexible Pass",
    planets: "只有日期＋入场时间",
  },
  {
    factor: "现场购票",
    borderless: "还有名额时销售，成人 +¥200",
    planets: "现场完全不卖——只能提前在网上买",
  },
  { factor: "建议停留", borderless: "约 2 小时", planets: "约 1.5～2 小时" },
  {
    factor: "适合谁",
    borderless: "艺术、摄影、成年人，以及东京市中心的下雨午后",
    planets: "带孩子，以及想要第一次就印象最深刻的人",
  },
];

// The GetYourGuide column is deliberately thin: GetYourGuide blocks automated reads, so only
// the listing's existence could be confirmed (see the note under the table).
const buyingRows = [
  {
    factor: "票价",
    official: "基础票价，按日期与时段浮动",
    klook: "同一张票，以你自己的货币标价",
    gyg: "按套餐而定；请在页面上确认",
    door: "成人 +¥200，儿童／残障票 +¥100",
  },
  {
    factor: "结账语言",
    official: "有英文版网站",
    klook: "简体中文界面，立即获得电子票",
    gyg: "英文页面",
    door: "现场在美术馆窗口",
  },
  {
    factor: "海外信用卡",
    official: "通常可以，但不保证",
    klook: "本来就为海外卡与移动支付设计",
    gyg: "未确认——请在结账时确认",
    door: "现场可刷卡",
  },
  {
    factor: "改日期",
    official: "最多可改三次日期",
    klook: "视你选的 Klook 套餐而定——付款前请先确认",
    gyg: "未确认——按套餐而异，付款前请看清楚",
    door: "不适用",
  },
  {
    factor: "买不到的风险",
    official: "早订就低",
    klook: "早订就低",
    gyg: "第一个渠道没有你要的时段时，值得再查的第二个柜台",
    door: "高——热门时段在当天之前就售罄",
  },
];

const whoFor = [
  {
    title: "选官网的话…",
    desc: "你想要最低的基础票价和最大的日期灵活度。teamLab 官网购买的票最多可以改三次日期，如果你的东京行程还在调整，这点很实用。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: "选 Klook 的话…",
    desc: "你希望用自己的货币、看得懂的界面结账，用非日本发行的信用卡付款，并把电子票和其他预订放在同一个 App 里。Klook 是 teamLab 的官方售票合作伙伴，票是同一张，只是换一个柜台。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M14 6v12" strokeDasharray="2 2" />
        <path d="M6 10h4M6 14h4" />
      </svg>
    ),
  },
  {
    title: "别打算现场买，如果…",
    desc: "你的日期是周末、日本节假日，或你想去傍晚的时段。现场票成人要多付 ¥200（儿童与残障票多 ¥100），而且只在还有名额时才卖——偏偏大多数人想去的时段常常没有。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "先选日期，再看那天的价格",
    desc: "无界的成人票与残障票是浮动定价，你看到的金额取决于选的日期与入场时段。工作日上午通常最便宜也最清闲。",
  },
  {
    title: "选入场时间，或选 Flexible Pass",
    desc: "标准的 Entrance Pass 有指定入场时间。teamLab 另外也卖 Flexible Pass，在指定日期有效但不指定入场时间，行程不好把握时值得多付一点。",
  },
  {
    title: "周末与傍晚场请提前 2～3 周订",
    desc: "无界的年参观人次远超过百万，热门时段最先消失。早订的差别在于「你挑时段」还是「只能拿剩下的」。",
  },
  {
    title: "预留约两小时，行李带少一点",
    desc: "馆内没有固定路线，作品会在房间之间移动，所以大多数人会想在里面待大约两小时。稍微提前抵达，并尽量轻装——神谷町站与六本木一丁目站都有地下通道相连，不必走到地面上。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年 teamLab 无界门票多少钱？",
    a: `按 teamLab 官方网站（核查日期 ${CHECKED}），Entrance Pass 成人（18 岁以上）${ADULT}，13～17 岁 ¥2,800，4～12 岁 ${CHILD}，3 岁以下免费。残障人士 ¥1,700 起，一位陪同人员同享优惠票价。成人票与残障票采用浮动定价，实际金额取决于你选的日期与时段，付款前请确认自己那天的价格。现场购票成人多 ¥200，儿童与残障票多 ¥100。`,
  },
  {
    q: "teamLab 无界可以现场买票吗？",
    a: `可以，但只在还有名额时，而且要加价：我们在 ${CHECKED} 查看时，官方网站公告现场票成人多 ¥200、儿童与残障票多 ¥100。所以现场购票是备选而不是计划——周末、节假日与傍晚场，大多数人想要的时段在当天之前就没了，日历一旦约满，到窗口也救不回来。这也是它和丰洲 teamLab Planets 最明显的区别：Planets 的官方售票页写明现场完全不售票。`,
  },
  {
    q: "teamLab 无界的门票可以改日期吗？",
    a: `直接向 teamLab 购买的票最多可以改三次日期（按官方网站 ${CHECKED} 的公告）——如果你的东京行程还在变动，这就是直接在官网买、而不是通过售票平台买的主要实际理由。售票平台会按套餐自定变更与取消条件，而且各不相同，付款前请在订购页上看清楚，不要以为官方的改期次数也适用。`,
  },
  {
    q: "Entrance Pass 和 Flexible Pass 有什么区别？",
    a: `Entrance Pass 指定日期与入场时间——结账时选一个时段，那个时段就是你的预约。Flexible Pass 在指定日期有效、不指定入场时间，几点到都可以，而这份自由要多付一点。两者都列在官方网站上（核查日期 ${CHECKED}）。如果你在麻布台之丘一带的行程不好把握，Flexible Pass 能把指定时段拿走的灵活度买回来；如果行程已经确定，Entrance Pass 更便宜。`,
  },
  {
    q: "teamLab 无界是指定时段入场吗？可以直接去吗？",
    a: "标准的 Entrance Pass 是指定日期与时间的：订票时就要选入场时段。teamLab 另外也卖 Flexible Pass，在指定日期有效但不指定入场时间。现场也有售票，但成人要多付 ¥200，而且只在还有名额时才卖——周末、节假日与傍晚场经常没有。把现场购票当成备选，不要当成计划。",
  },
  {
    q: "teamLab 无界的营业时间是？",
    a: `营业时间按日期而不同。我们在 ${CHECKED} 查看官方网站时，馆方公告的时间是 08:30–21:00，部分日期提早闭馆（2026 年 11 月 17 日为 17:00），部分日期延长（特定日期到 22:00）。最后入场是闭馆前一小时。另外也有不定期的周二休馆——2026 年 10 月 20 日、11 月 24 日与 12 月 8 日都在内。订时段之前，请务必打开官方日历查你自己的日期。`,
  },
  {
    q: "teamLab 无界要逛多久？",
    a: "预留大约两小时。无界没有地图、没有固定路线——50 多件作品分布在迷宫般的空间里，作品会跨房间移动、整天都在变化——所以待多久真的看你自己。两小时足够不赶地看完主要展厅；艺术与摄影爱好者常待到接近三小时。",
  },
  {
    q: "teamLab 无界在哪里？怎么去？",
    a: "位于东京港区虎之门五丁目一带的「麻布台之丘 Garden Plaza B」地下一层。官方交通信息写的是：东京地铁日比谷线「神谷町站」5 号出口步行 2 分钟，南北线「六本木一丁目站」4 号出口步行 6 分钟。两站都有地下通道连到麻布台之丘，可以全程照指示牌走、不必上到地面——下雨或夏天很有用。",
  },
  {
    q: "teamLab 无界该在官网买还是 Klook 买？",
    a: "两边都正规：Klook 是 teamLab 的官方售票合作伙伴，不管从哪边买都是同一张票。官网给你基础票价，而且最多可以改三次日期。Klook 给你自己货币、看得懂的结账流程，对非日本发行的信用卡接受度高，电子票也和其他预订放在一起。最在意日期灵活度就买官网；最在意结账顺不顺就走 Klook。",
  },
  {
    q: "teamLab 无界和 teamLab Planets 该订哪一个？",
    a: "它们是东京不同区域的两间不同美术馆，不是同一品牌的两家分馆。麻布台之丘的「无界」是 50 多件作品组成的无地图迷宫，值得花时间、带着好奇心慢慢逛。丰洲的「Planets」是赤脚的那一间——你会走过深及膝盖的水，带孩子更轻松。如果只能去一间：想看艺术、想拍照选无界；想带孩子体验身体感官的就选 Planets。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "teamLab 无界 门票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnTeamLabBorderlessPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, "zh-cn");

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
              inLanguage: JSONLD_LANG["zh-cn"],
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
            teamLab 无界 门票（2026）：<br />票价、预约方式与入场时段
          </h1>
          <p className={styles.heroSubtitle}>
            麻布台之丘的 teamLab 无界，一张票实际要多少钱、指定时段怎么运作，
            以及该在官网买还是通过 Klook。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "官方票价", "指定时段入场说明"].map((t) => (
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
          <strong>麻布台之丘</strong>的 <strong>teamLab 无界</strong>，成人票在 teamLab 官方网站上{" "}
          <strong>¥3,400 起</strong>，而且成人票采用浮动定价，所以 ¥3,400 是底价，不是你那天的价格。入场是
          <strong>指定日期与时间</strong>的——标准的 Entrance Pass 固定一个入场时段，Flexible Pass 只固定日期——
          而这间没有地图、没有固定路线可赶的美术馆，请<strong>预留大约两小时</strong>。本页的票价、营业时间与休馆日
          读自 teamLab 官方网站（teamlab.art），核查日期 {CHECKED}；成人票价会随日历变动，付款前请确认你那天的金额。
        </p>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人票</p>
                <p className={styles.verdictStatValue}>¥3,400 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>入场方式</p>
                <p className={styles.verdictStatValue}>指定日期＋时段</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>建议停留</p>
                <p className={styles.verdictStatValue}>约 2 小时</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>地点</p>
                <p className={styles.verdictStatValue}>港区·麻布台之丘</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>成人票 ¥3,400 起，采用浮动定价，最终金额由你选的日期与时段决定。
              门票指定日期与时间，现场购票成人多 ¥200 且要看还有没有名额；馆方公告的营业时间约 08:30–21:00，
              最后入场是闭馆前一小时。预留大约两小时，从神谷町站（日比谷线，步行 2 分钟）或六本木一丁目站
              （南北线，步行 6 分钟）过去，两站都有地下通道。想要基础票价与最多三次免费改期就买官网；
              想要看得懂、用自己货币、海外卡刷得过的结账就走 Klook。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 teamLab 无界门票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              本页的票价、营业时间与休馆日读自 teamLab 官方网站，核查日期 {CHECKED}。无界采用浮动定价、日历也会变动，
              请在结账时确认你自己日期的这两项信息。
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>2026 年 teamLab 无界门票多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人 <strong>¥3,400 起</strong>，13～17 岁 ¥2,800，4～12 岁儿童 ¥1,500，未满 4 岁免费。
            会变动的只有成人票与残障票：无界按日期与入场时段为这两种票定价，所以官方金额后面才会加上「起」，
            也因此你这趟旅行最便宜的票，取决于日历，而不是卖家。
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
            读自 teamLab 官方网站，核查日期 {CHECKED}。现场购票成人多 ¥200，儿童与残障票多 ¥100。
            优惠票需要出示资格证明，请带证件。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>成人票价会浮动到多少，官方没有公布。</strong>teamLab 给的是起价和一份日历，不是价目表，
            所以没有任何诚实的攻略能告诉你周六傍晚的无界要多少钱——给你报出一个价格区间的页面，都是自己编的。
            把 ¥3,400 当成底价，把你行程能容纳的每一天都在官方日历上打开来看，比较过金额再付款。
            这里真正有用的是把参观日挪一天；换一个更便宜的卖家没有用，因为价格是日期和时段决定的。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>订票前</span>
          <h2 className={styles.sectionTitle}>营业时间、入场时段、休馆日与建议停留时间</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            无界开得很长，但日历常变——这件事比票价更常让人踩坑：美术馆会在不定期的周二休馆，部分日期 17:00 就关门。
            馆内请预留大约两小时，后面别排太紧的行程。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "官方网站的说法", "信息来源与日期"].map((h) => (
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
            因为营业时间与休馆日每个月都在变，请先用你自己的旅行日期打开官方日历确认，再去订时段。
            工作日上午最清闲、通常也最便宜；周末与傍晚场最先消失。上表唯一不是 teamLab 自己说法的是「建议停留」，
            表中也标明了：馆方没有公布参观要多久，因为路线由你自己决定。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>你买到的是什么</span>
          <h2 className={styles.sectionTitle}>teamLab 无界究竟是什么</h2>
          <p className={styles.bodyText}>
            无界是一间没有地图的美术馆。50 多件数字作品分布在互相连通的房间群里，而作品本身会移动——
            它们会从一个空间走到另一个空间、会对房间里的人有反应、整天都在变化。没有建议路线、没有编号站点，
            所以买同一张票的两个人，体验可能真的不一样。
          </p>
          <p className={styles.bodyText}>
            正因为这个设计，这张票值得提前规划。赶一小时只能看到几个有名的展厅；大约两小时才够你随意走、折返，
            并找到那些要等才会出现的作品。这也让无界成为东京两间 teamLab 当中更偏成人、更适合摄影的那一间——
            想找赤脚走进水里的丰洲那一间，以及 Planets 那一方的考量，请看我们的{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 门票攻略</Link>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>值不值得</span>
          <h2 className={styles.sectionTitle}>teamLab 无界值得去吗？</h2>
          <p className={styles.bodyText}>
            喜欢艺术、摄影，或只是想待在一个别处都看不到的地方——值得。但它是一个每人 ¥3,400 起、大约两小时的景点，
            价格像一个下午，花掉的时间却像一顿长午饭。与其直接给结论，不如把算式摆在你面前：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>每小时的花费偏高。</strong>¥3,400 换大约两小时，是东京塔主展望台 ¥1,500 的两倍多，也高于涩谷SKY 白天网上票的 {PRICES.shibuyaSky.adult.split(" / ")[0]}，而那两处都可以待很久——数字可以在我们的<Link href="/guides/attractions/japan-attraction-ticket-prices">日本景点门票价格表（英文）</Link>比较。你付的是别处看不到的东西，不是时间长度。</li>
            <li><strong>没有地图的设计是价值，也是风险。</strong>50 多件作品、没有路线、没有编号站点，意味着赶一小时只能看到几个有名的展厅。如果你只有一小时，这张票就不划算，而不是「缩短版的好体验」。</li>
            <li><strong>它是两间当中最不费体力的。</strong>穿着鞋、不用蹚水，也不必带替换衣物。如果 Planets 的形式对你来说像折磨而不是体验，这里就是同一个团队、但没有那些的版本。</li>
            <li><strong>不怕下雨，又在市中心。</strong>麻布台之丘离神谷町站走地下 2 分钟，下雨的午后在交通上不会有任何损失——东京大多数雨天行程可做不到。</li>
            <li><strong>这里失误还有救。</strong>和 Planets 不同，无界在还有名额时会现场售票，所以没订到的代价是多付 ¥200、时段差一点，而不是赔掉一个下午。</li>
          </ul>
          <p className={styles.bodyText}>
            如果你的东京行程已经很紧、只能给它一小时，或者带着小孩、只排得进一间 teamLab——Planets 带孩子更轻松——
            那就跳过。这是让这张票令人失望的三个原因，而没有一个和作品本身有关。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>会不会售罄</span>
          <h2 className={styles.sectionTitle}>teamLab 无界的门票会售罄吗？</h2>
          <p className={styles.bodyText}>
            个别时段会，而且热门的最先没：无界的年参观人次远超过百万，周末与傍晚的入场最先消失。
            不会发生的是「完全买不到」——还有名额时馆内仍会售票，这让无界比东京大多数指定时段的景点宽容，只是要多付钱。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>本站建议的订票时间：</strong>周末、节假日或傍晚场提前两到三周；工作日上午通常提前几天就够。这是我们根据日历的变化给的规划建议，不是官方数字——teamLab 没有公布售罄数据。</li>
            <li><strong>当天与现场购票：</strong>还有名额时销售，成人多 ¥200，儿童或残障票多 ¥100。官方信息，核查日期 {CHECKED}。请当成备选而不是计划：在大多数人想去的日子，大多数人想要的时段早就没了。</li>
            <li><strong>日期变了就改期，不要重订：</strong>直接向 teamLab 购买的票最多可以改三次日期。官方信息，核查日期 {CHECKED}。</li>
            <li><strong>售票平台的条件各自不同：</strong>Klook 与 GetYourGuide 的变更与取消期限按套餐而定、彼此也不一样，付款前请在订购页上看清楚，不要以为 teamLab 的三次改期也适用。</li>
            <li><strong>最便宜的时段要看日历：</strong>工作日上午既最清闲、通常也最便宜，但 teamLab 没有公布各时段的价目表，所以你那天的金额只存在于日历本身。</li>
          </ul>
          <p className={styles.bodyText}>
            所以实际的顺序是：先选日期、看那天的价格，再选卖家。会改变你付多少钱的，只有前两步。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看 teamLab 无界的日期与时段 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook 是 teamLab 的官方售票合作伙伴；GetYourGuide 则是你想要的时段没了时，第二个可以查的地方。
            本页不给两者标价——两边都按日期定价，所以请打开日历，不要相信任何标题上的金额，包括本页的。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>在哪买</span>
          <h2 className={styles.sectionTitle}>官网 vs Klook vs GetYourGuide vs 现场</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Klook 是 teamLab 的官方售票合作伙伴，所以不论走哪个柜台，入场资格都一样。差别在结账流程、灵活度，
            以及——如果你拖到当天——价格。GetYourGuide 也卖无界的票，下表中它那一栏刻意写得很少：
            我们能确认与无法确认的内容，请看表格下方的说明。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "官方网站", "Klook", "GetYourGuide", "当天现场"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.official}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.klook}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.gyg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            现场加价与改期次数按 teamLab 官方网站 {CHECKED} 的公告。售票平台的取消与变更条件按套餐而异，
            付款前请在订购页上看清楚。GetYourGuide 一栏刻意写得很短：它的无界页面在 {GYG_CHECKED} 确认仍在销售，
            但 GetYourGuide 会屏蔽自动读取，所以我们无法确认它的价格、刷卡情况与变更条件，那几格就如实写明，不做猜测。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一种适合你</span>
          <h2 className={styles.sectionTitle}>该怎么买？</h2>
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

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>teamLab 无界怎么订？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            先选日期、看那天的价格，在指定时段的 Entrance Pass 与 Flexible Pass 之间做选择，然后购买——在官网买，
            或想用自己的货币结账就通过 Klook。一共四步，而只有第一步会改变你付多少钱。
          </p>
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
            决定好要订了吗？{" "}
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看无界的余票与价格 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>直接购买</span>
          <h2 className={styles.sectionTitle}>teamLab 无界的官方购票网站在哪里？</h2>
          <p className={styles.bodyText}>
            美术馆自己的页面是 <strong>teamlab.art/e/tokyo</strong>（英文版，日文版为 teamlab.art/jp/e/tokyo），
            购票日历与结账都从那里进入。如果你保存的是旧链接，<strong>borderless.teamlab.art</strong>{" "}
            已经不是独立的售票网站：它的英文与日文网址现在都会跳转到上面的 teamlab.art 页面，这一点我们在 {ADDRESS_CHECKED} 确认过。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>为什么「官方」在这里很重要：</strong>基础票价在 teamLab 自己的日历上，三次免费改期也只有直接购买的票才有。售票平台卖的是同一个入场资格，但用自己的条件。</li>
            <li><strong>还有谁是正规的：</strong>Klook 是 teamLab 的官方售票合作伙伴，所以 Klook 的票就是在另一个柜台买到的同一个入场资格——不是旁门左道，也不是在门票价上加价。</li>
            <li><strong>直接买不会让你得到的：</strong>折扣。成人票价由日期与时段决定，而每个官方渠道背后都是同一份日历。</li>
            <li><strong>直接买可能让你付出的：</strong>信用卡被拒。日文结账页面是游客最后改用售票平台的常见原因，而改用国际化的结账流程是合理的解决办法，不是错误。</li>
          </ul>
          <p className={styles.bodyText}>
            所以：你的卡刷得过、又想要日期灵活度，就直接在官网买；想用自己的语言和货币结账、让电子票和其他预订放在一起，就通过 Klook。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>并排比较</span>
          <h2 className={styles.sectionTitle}>teamLab 无界 vs Planets：该订哪一个？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>想「看」艺术就订无界；想「走进」艺术，或要带孩子，就订 Planets。</strong>东京有两间 teamLab 美术馆，
            游客经常订错。它们是不同的场馆、不同的门票，位于城市的不同区域，下面这些数字就是决定的关键。
            Planets 那一方的完整信息——赤脚规定、储物柜、儿童相关规定——请看我们的{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 门票攻略</Link>。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab 无界", "teamLab Planets"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsPlanetsRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            无界的数字读自 teamLab 官方网站，核查日期 {CHECKED}；Planets 的数字读自其官方售票网站，核查日期 {PLANETS_CHECKED}。
            两间美术馆的成人票都按日期与时段定价，日历也都会变，请以你自己的日期为准。两边的建议停留时间是本站的规划参考，不是官方数字。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            如果两间都有时间去，请分在不同天：一个下午看四小时数字艺术，是最快让你什么都看不进去的方法，
            而且两个场馆在城市的两端，相距 30 分钟。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>teamLab 无界的位置</h2>
          <p className={styles.bodyText}>
            美术馆位于港区虎之门五丁目一带的「麻布台之丘 Garden Plaza B」地下一层。
            它不是以前台场的无界——那个场馆已经关闭，所以任何把你带去海滨的路线都请忽略。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>神谷町站</strong>（东京地铁日比谷线）——5 号出口步行 2 分钟。</li>
            <li><strong>六本木一丁目站</strong>（东京地铁南北线）——4 号出口步行 6 分钟。</li>
            <li>两站都有地下通道连到麻布台之丘，可以全程照指示牌走，不必上到地面。</li>
          </ul>
          <p className={styles.bodyText}>
            用{" "}
            <Link href="/guides/transport/ic-cards-japan">Suica 或 Pasmo 等交通卡（英文）</Link>{" "}
            刷卡进出，两站都不需要特别规划——
            <Link href="/guides/transport/tokyo-transportation">东京交通攻略（英文）</Link>有更详细的线路说明。
          </p>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab 福冈门票 2026：票价、营业时间与预订（英文）" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab 京都门票：票价、营业时间与预订（英文）" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab 植物园 大阪门票：票价与营业时间（英文）" },
            { href: "/guides/attractions/tokyo-joypolis-tickets", title: "东京 Joypolis 门票（2026）：通票价格、营业时间与身高限制（英文）" },
            { href: "/zh-cn/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 门票（2026）：票价、预约方式与无界比较" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/guides/transport/tokyo-transportation", title: "东京交通攻略（2026）：电车、地铁与交通卡（英文）" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先把无界的时段订下来</h2>
            <p className={styles.ctaBannerDesc}>
              指定时段入场的意思是：你最想去的那个时段，就是最先售罄的那个。Klook 是 teamLab 的官方售票合作伙伴，
              可以用简体中文界面、自己的货币结账，电子票直接存在手机里。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 teamLab 无界门票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
