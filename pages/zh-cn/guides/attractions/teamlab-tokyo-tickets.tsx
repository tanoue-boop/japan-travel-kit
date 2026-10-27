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
import { cnFujiHakoneDayTour, cnTeamlabPlanets } from "../../../../lib/klook-links-zh-cn";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhDateLabel, zhMonthLabel, zhPrice } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "teamLab Planets 门票（2026）：票价、预约方式与无界比较";
const DESC =
  "teamLab Planets（丰洲）门票 2026：官方票价成人 ¥3,800 起、30 分钟入场时段怎么运作、" +
  "赤脚涉水区该穿什么，以及 Planets 和麻布台之丘的无界差在哪。数字与英文版同一组数据、同一个核查日期。";

// Same records the English guide and the ticket price table read, from
// lib/attraction-prices.ts. No figure here is new to this edition.
const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const CHECKED = zhDateLabel(P.checked);
// 票价是在官方售票网站重新核查的日期（CHECKED）；营业时间与休馆日读自 teamlab.art，
// 那一页是客户端渲染、无法重读，所以保留自己的日期而不借用更新的日期。与英文版一致。
const HOURS_CHECKED = zhDateLabel("2026-10-09");
// "from ¥3,800" -> "¥3,800 起": same figure, Chinese qualifier. See lib/i18n.ts.
const ADULT = zhPrice(P.adult, "zh-cn");
const CHILD = zhPrice(P.child, "zh-cn");
const B_ADULT = zhPrice(B.adult, "zh-cn");

const priceRows = [
  { ticket: "成人", price: ADULT, note: "票价按日期与时段变动" },
  { ticket: "初中、高中生", price: "¥2,800", note: "请携带学生证" },
  { ticket: "儿童（4～12 岁）", price: CHILD, note: "未满 4 岁不需购票" },
  { ticket: "3 岁以下", price: "免费", note: "记得带替换衣物——涉水区大家都会湿" },
  { ticket: "残障人士", price: "¥1,900 起", note: "请携带残障证明" },
  { ticket: "Premium Pass", price: "¥12,000", note: "优先入场方案，4 岁以上适用" },
];

const compareRows = [
  { factor: "位置", planets: "丰洲（江东区）", borderless: "麻布台之丘（港区）" },
  { factor: "概念", planets: "沉浸式、赤脚、走进水里", borderless: "没有地图的迷宫，50 多件作品" },
  { factor: "适合", planets: "亲子、第一次来、想要身体感受", borderless: "艺术爱好者、慢慢逛、摄影" },
  { factor: "需要时间", planets: "含赤脚准备约 1.5～2 小时", borderless: "约 2 小时，想久留会更长" },
  { factor: "成人票（起）", planets: ADULT, borderless: B_ADULT },
  { factor: "营业时间", planets: "公告 08:00–22:00，按日期变动", borderless: "公告 08:30–21:00，按日期变动" },
  { factor: "入场", planets: "30 分钟入场时段", borderless: "指定时段，或不指定时间的 Flexible Pass" },
  {
    factor: "需要知道",
    planets: "预计运营到 2027 年底；赤脚与涉水区",
    borderless: "现场购票成人多 ¥200",
  },
];

const whoFor = [
  {
    title: "选 Planets 的话…",
    desc: "你带着小孩、想要动手动脚的身体体验，而且不介意脚湿——你会赤脚走过及成人膝盖高的水区。这是两间里比较好玩、感受比较直接的一间，也是带孩子比较容易享受的一间。",
  },
  {
    title: "选无界的话…",
    desc: "你想沉进艺术里，而不是走过它。麻布台之丘的无界没有固定路线——作品在房间之间移动，你在 50 多个空间里自由游走。它回报的是时间与耐心，对成人来说也更好拍。",
  },
  {
    title: "两间都去，如果…",
    desc: "你有两个空的半天，而且是认真的 teamLab 迷。它们在城市的不同区域，是真正不同的体验，所以两间都去不会重复——只要把日期分开，并各自提前订好指定时段。",
  },
];

const steps = [
  {
    title: "先选日期，再看那天的价格",
    desc: "Planets 的成人票 ¥3,800 起，但实际金额取决于你选的日期与时段。工作日上午最便宜也最清闲。",
  },
  {
    title: "提前 2～3 周订 30 分钟入场时段",
    desc: "你的票对应一个 30 分钟的入场区间，例如 10:00–10:30。热门时段经常在 2～3 周前就售罄，而且美术馆现场没有柜台售票，所以提前订是计划本身，不是备选。",
  },
  {
    title: "向 teamLab 或官方售票伙伴购买",
    desc: "Planets 官方售票网站直接卖电子票；Klook 是 teamLab 的官方售票合作伙伴，可以用自己的货币、看得懂的界面结账，对非日本发行的信用卡接受度高。两边都是手机上的二维码。",
  },
  {
    title: "穿对衣服，在时段内抵达",
    desc: "请穿短裤，或可以卷到膝盖以上的长裤——部分作品是水空间，水深可达成人膝盖高。如果你穿裙子或阔腿裤，现场有 XS 到 6L 的免费短裤可借，因为部分地板是镜面的。忙碌时段入场准备可能要 30～60 分钟，请在时段一开始就到。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年 teamLab Planets 门票多少钱？",
    a: `按 teamLab Planets 官方售票网站、核查日期 ${CHECKED}：成人票 ${ADULT}，初中与高中生 ¥2,800，4～12 岁儿童 ${CHILD}，3 岁以下免费。残障人士 ¥1,900 起，另有 ¥12,000 的 Premium Pass（4 岁以上适用）。成人票会按日期与时段变动，付款前请确认你自己时段的金额。优惠票需要出示证明——请带学生证、护照或残障证明。`,
  },
  {
    q: "teamLab Planets 需要提前订票吗？",
    a: "需要，而且比东京多数景点更需要。Planets 采用 30 分钟入场时段，热门时间会在 2～3 周前售罄，周末与节假日尤其明显。官方说明页写得很清楚：不要指望在美术馆现场买票——门票是网上提前销售，而不是柜台销售。出发前就把日期与时段订好。",
  },
  {
    q: "去 teamLab Planets 该穿什么？",
    a: "短裤，或可以卷到膝盖以上的长裤。部分作品是水空间，水深可达成人膝盖高，而且整间美术馆都是赤脚体验——鞋子、袜子与裤袜会在入口的寄存处脱掉。部分地板是镜面的，所以裙子与阔腿裤不是好主意；现场有 XS 到 6L 的免费短裤可借。带小孩的话请准备替换衣物，另外婴儿车不能进场（有婴儿车停放区，背带可以）。",
  },
  {
    q: "teamLab Planets 要逛多久？",
    a: "整体预留大约 1.5 到 2 小时。作品本身以不赶的步调看大约需要一到一个半小时，但你还要算上寄存处、赤脚与事后擦干的时间——而且在忙碌时段，光是入场准备就可能要 30～60 分钟。结束后不要紧接着排其他行程。",
  },
  {
    q: "teamLab Planets 的营业时间？什么时候休馆？",
    a: `营业时间按日期而不同。我们在 ${HOURS_CHECKED} 查看官方网站时，Planets 公告的时间是 08:00–22:00，最后入场为闭馆前一小时。2026 年年底的休馆日包含 11 月 5 日（周四）与 12 月 3 日（周四）。因为日历每个月都在变，订时段之前请用你自己的日期查官方日历。`,
  },
  {
    q: "错过 teamLab Planets 的时段怎么办？",
    a: "不一定就进不去。官方说明页写的是：票面时间是参考值，如果你迟到，仍可在当天营业时间内入场——前提是不超过闭馆前一小时的最后入场。不过你可能会比持有该时段票的人等更久，所以还是把你的时段当成计划。",
  },
  {
    q: "teamLab Planets 在哪里？怎么去？",
    a: "位于东京东侧水岸的丰洲。官方交通信息写的是：百合海鸥线「新丰洲站」步行 1 分钟，「市场前站」与丰洲市场步行 5 分钟，东京地铁有乐町线「丰洲站」步行 10 分钟。从东京站打车约 15 分钟，从羽田机场走高速公路也约 15 分钟。铁路段用 Suica 或 PASMO 等 IC 卡就够了。",
  },
  {
    q: "teamLab Planets 要结束了吗？",
    a: "丰洲的 teamLab Planets 预计运营到 2027 年底，teamLab 也公布了新增十件以上作品的扩建计划。日期可能变动，如果你要为它专程安排行程，请先看官方网站。麻布台之丘的 teamLab 无界是另一间独立、持续运营的美术馆，门票分开。",
  },
  {
    q: "teamLab Planets 和无界差在哪？",
    a: "丰洲的 Planets 是沉浸式、赤脚的体验，你会走进水里与大型装置之中——两间里比较偏身体感受、比较适合亲子的那一间。麻布台之丘的无界是 50 多件作品组成的无地图迷宫，没有固定路线，作品在空间之间移动，你自由游走。Planets 适合亲子与第一次来的人；无界适合想慢慢探索的艺术爱好者。它们是东京不同区域的两间美术馆，门票各自分开。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "teamLab Planets 门票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnTeamLabPlanetsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = zhMonthLabel(updated.iso);

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
            teamLab Planets 门票（2026）：<br />票价、预约方式与无界比较
          </h1>
          <p className={styles.heroSubtitle}>
            丰洲的 teamLab Planets 门票多少钱、30 分钟入场时段怎么运作、涉水区该穿什么——
            以及 Planets 和麻布台之丘的无界差在哪。
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

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人票</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>入场方式</p>
                <p className={styles.verdictStatValue}>30 分钟时段，要先订</p>
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
              <strong>结论：</strong>teamLab Planets 成人票 {ADULT}，高中生 ¥2,800，4～12 岁 {CHILD}。
              你的票对应一个 30 分钟入场区间，而且现场没有柜台售票，所以周末请提前 2～3 周订。
              你会赤脚入场，部分作品是水空间、水深可达成人膝盖高——请穿短裤或可卷起的长裤
              （现场有 XS–6L 免费短裤可借）。预留 1.5～2 小时，从新丰洲站步行 1 分钟就到。
              想找麻布台之丘那一间？请看我们的{" "}
              <Link href="/zh-cn/guides/attractions/teamlab-borderless-tickets">teamLab 无界门票攻略</Link>。
            </p>
            <KlookLink href={cnTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看 teamLab Planets 门票 →
            </KlookLink>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              本页的票价读自 teamLab Planets 官方售票网站，核查日期 {CHECKED}；营业时间与休馆日读自
              teamlab.art，核查日期 {HOURS_CHECKED}。Planets 票价按日期与时段变动、
              日历也会改，请在结账时确认你自己日期的两项信息。
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 门票价格</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            会动的是成人票：{ADULT}，你看到的金额取决于选的日期与时段。学生与儿童票是固定价，
            未满 4 岁完全不需要票。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票种", "票价（起）", "备注"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            读自 teamLab Planets 官方售票网站，核查日期 {CHECKED}。优惠票需要出示证明文件，请带学生证、护照或残障证明。
            门票以手机二维码形式发送。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>订票前</span>
          <h2 className={styles.sectionTitle}>营业时间、入场时段与穿着</h2>
          <p className={styles.bodyText}>
            Planets 对你的要求比一般美术馆多：要赤脚进场，而且路线的一部分是水。以下是我们在 {CHECKED}
            查看官方售票网站时的内容，其中营业时间与休馆日为 {HOURS_CHECKED} 的核查结果：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>营业时间：</strong>公告为 08:00–22:00，按日期变动，最后入场为闭馆前一小时。</li>
            <li><strong>休馆日：</strong>不定期，2026 年 11 月 5 日（周四）与 12 月 3 日（周四）都在内。</li>
            <li><strong>入场：</strong>你的票对应一个 30 分钟入场区间，例如 10:00–10:30。忙碌时段入场准备可能要 30～60 分钟。</li>
            <li><strong>迟到了？</strong>官方说明页写的是：票面时间是参考值，当天营业时间内仍可入场，但不得超过最后入场时间。</li>
            <li><strong>赤脚：</strong>鞋子、袜子与裤袜在寄存处脱掉，全程赤脚体验。</li>
            <li><strong>水：</strong>部分作品是水空间，水深可达成人膝盖高。请穿短裤或可以卷起的长裤。</li>
            <li><strong>镜面地板：</strong>裙子与阔腿裤会有问题。现场有 XS 到 6L 的免费短裤可借。</li>
            <li><strong>带小孩：</strong>请准备替换衣物。婴儿车不能进场——有婴儿车停放区，背带可以。</li>
            <li><strong>行李：</strong>超过约 23 × 34 × 37 厘米的包要放到指定寄存区，不是储物柜。</li>
          </ul>
          <p className={styles.bodyText}>
            营业时间与休馆日每个月都在变，所以请先用你自己的旅行日期打开官方日历确认，再决定时段。
            工作日上午最便宜也最清闲。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>你买到的是什么</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 究竟是什么</h2>
          <p className={styles.bodyText}>
            teamLab 是东京的艺术团体，以「走进去」而不是「看着」的大型数字装置著名。丰洲的 Planets 是身体感受最强的那一间：
            你赤脚、涉水，走过会对你的存在产生反应的作品——镜面无限空间、漂浮光球的大厅、活的花园。
            它是东京两间 teamLab 当中带孩子比较容易享受的一间，也是如果你从未见过这种规模的数字艺术、冲击最大的一间。
          </p>
          <p className={styles.bodyText}>
            它也很拥挤：teamLab 公布 2025 年参观人次超过 250 万。美术馆预计运营到 2027 年底，并公布了新增十件以上作品的
            扩建计划——所以如果你已经去过，下次也不会是同一趟。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 门票怎么订</h2>
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
            <KlookLink href={cnTeamlabPlanets.url} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看 Planets 的时段与价格 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>并排比较</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs 无界</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            东京有两间 teamLab 美术馆，旅客经常订错。它们是城市不同区域的两个独立场馆、门票分开：
            丰洲的 <strong>Planets</strong> 是赤脚走进水里的那一间；麻布台之丘的 <strong>无界</strong>
            是 50 多件作品在房间之间移动的无地图迷宫。无界有自己的票价、时间与订票规则，我们写在{" "}
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
            Planets 票价读自官方售票网站，核查日期 {CHECKED}；无界票价与两间的营业时间读自 teamlab.art，
            核查日期 {HOURS_CHECKED}。两间的成人票都按日期与时段定价、日历也都会变动，
            请确认你自己的日期。「需要时间」是我们的行程建议，不是官方数字。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一间适合你</span>
          <h2 className={styles.sectionTitle}>该选哪一间 teamLab？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
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
            <li><strong>新丰洲站</strong>（百合海鸥线）——步行 1 分钟，最好走的路线。</li>
            <li><strong>市场前站</strong>／丰洲市场——步行 5 分钟。</li>
            <li><strong>丰洲站</strong>（东京地铁有乐町线）——步行 10 分钟，LaLaport 丰洲也是。</li>
            <li>从东京站打车约 15 分钟，从羽田机场走高速公路约 15 分钟。</li>
          </ul>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>同一天的其他安排</span>
          <h2 className={styles.sectionTitle}>Planets 只占一小时，剩下的半天呢</h2>
          <p className={styles.bodyText}>
            Planets 在馆内大约一小时，所以通常会和别的行程共用一天。如果你东京的行程还有一整天没排，
            富士山与箱根的一日游从东京出发、当天晚上回来，而且和门票在同一个 Klook 账号里结账——
            我们的{" "}
            <Link href="/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo">富士山一日游攻略</Link>
            {" "}比较了四种行程。
          </p>
          <KlookLink href={cnFujiHakoneDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta} style={{ marginTop: "0.5rem", display: "inline-block" }}>
            查看{cnFujiHakoneDayTour.label} →
          </KlookLink>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", title: "teamLab 无界 门票（2026）：票价、时段预约与购票渠道" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/zh-cn/guides/attractions/tokyo-disney-tickets", title: "东京迪士尼门票（2026）：乐园与海洋怎么买、怎么选" },
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京自由行景点（2026）：哪些要先订票、哪些可以现场去" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>准备订 teamLab Planets 了吗？</h2>
            <p className={styles.ctaBannerDesc}>
              入场以 30 分钟为一段，好的时段 2～3 周前就会没有。Klook 是 teamLab 的官方售票合作伙伴，
              可以用自己的货币结账，电子票直接存在手机里。
            </p>
            <KlookLink href={cnTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看 teamLab Planets 门票 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
