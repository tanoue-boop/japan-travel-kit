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
import { cnTeamlabBorderless } from "../../../../lib/klook-links-zh-cn";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhDateLabel, zhMonthLabel, zhPrice } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions/teamlab-borderless-tickets";
const TITLE = "teamLab 无界 门票（2026）：票价、时段预约与购票渠道";
const DESC =
  "teamLab 无界（麻布台之丘）门票 2026：官方票价成人 ¥3,400 起、浮动定价怎么算、指定入场时段与 Flexible Pass、" +
  "营业时间与休馆日，以及官网和 Klook 该选哪一个。数字与英文版同一组数据、同一个核查日期。";

// All figures come from lib/attraction-prices.ts and the English guide that read
// them off teamlab.art. Nothing was re-checked or added for this edition.
const P = PRICES.teamlabBorderless;
const CHECKED = zhDateLabel(P.checked);
// "from ¥3,400" -> "¥3,400 起": same figure, Chinese qualifier. See lib/i18n.ts.
const ADULT = zhPrice(P.adult, "zh-cn");
const CHILD = zhPrice(P.child, "zh-cn");

const priceRows = [
  { ticket: "成人（18 岁以上）", price: ADULT, note: "浮动定价——你选的日期与时段可能更贵" },
  { ticket: "13～17 岁", price: "¥2,800", note: "固定票价" },
  { ticket: "4～12 岁", price: CHILD, note: "固定票价" },
  { ticket: "3 岁以下", price: "免费", note: "不需购票" },
  { ticket: "残障人士", price: "¥1,700 起", note: "浮动定价；一位陪同人员同享优惠票价" },
];

const buyingRows = [
  {
    factor: "票价",
    official: "基础票价，按日期与时段浮动",
    klook: "同一张票，以你自己的货币标价",
    door: "成人 +¥200，儿童／残障票 +¥100",
  },
  {
    factor: "结账语言",
    official: "有英文版网站",
    klook: "简体中文界面，立即获得电子票",
    door: "现场在美术馆窗口",
  },
  {
    factor: "海外信用卡",
    official: "通常可以，但不保证",
    klook: "本来就为海外卡与移动支付设计",
    door: "现场可刷卡",
  },
  {
    factor: "改日期",
    official: "官网购票最多可改三次日期",
    klook: "视你选的方案而定——付款前请先看清楚",
    door: "不适用",
  },
  {
    factor: "买不到的风险",
    official: "早订就低",
    klook: "早订就低",
    door: "高——热门时段在当天之前就售罄",
  },
];

const whoFor = [
  {
    title: "选官网的话…",
    desc: "你想要最低的基础票价和最大的日期灵活度。teamLab 官网购买的票最多可以改三次日期，如果你的东京行程还在调整，这点很实用。",
  },
  {
    title: "选 Klook 的话…",
    desc: "你希望用自己的货币、看得懂的界面结账，用非日本发行的信用卡付款，并把电子票和其他预订放在同一个 App 里。Klook 是 teamLab 的官方售票合作伙伴，票是同一张，只是换一个柜台。",
  },
  {
    title: "别打算现场买，如果…",
    desc: "你的日期是周末、日本节假日，或你想去傍晚的时段。现场票成人要多付 ¥200（儿童与残障票多 ¥100），而且只在还有名额时才卖——偏偏大多数人想去的时段常常没有。",
  },
];

const steps = [
  {
    title: "先选日期，再看那天的价格",
    desc: "无界的成人票与残障票是浮动定价，你看到的金额取决于选的日期与入场时段。工作日上午通常最便宜也最清闲。",
  },
  {
    title: "选入场时间，或选 Flexible Pass",
    desc: "标准的 Entrance Pass 有指定入场时间。teamLab 另外也卖 Flexible Pass，指定日期但不指定入场时间，行程不好掌握时值得多付一点。",
  },
  {
    title: "周末与傍晚场请提前 2～3 周订",
    desc: "无界的年参观人次远超过百万，热门时段最先消失。早订的差别在于「你挑时段」还是「剩下的时段挑你」。",
  },
  {
    title: "预留约两小时，行李带少一点",
    desc: "馆内没有固定路线，作品会在房间之间移动，所以大多数人会想在里面待大约两小时。稍微提前抵达，并尽量轻装——神谷町站与六本木一丁目站都有地下通道直达，不必走到地面上。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年 teamLab 无界门票多少钱？",
    a: `按 teamLab 官方网站、核查日期 ${CHECKED}：Entrance Pass 成人（18 岁以上）${ADULT}，13～17 岁 ¥2,800，4～12 岁 ${CHILD}，3 岁以下免费。残障人士 ¥1,700 起，一位陪同人员同享优惠票价。成人票与残障票采用浮动定价，实际金额取决于你选的日期与时段，付款前请确认自己那天的价格。现场购票成人多 ¥200，儿童与残障票多 ¥100。`,
  },
  {
    q: "teamLab 无界是指定时段入场吗？可以直接去吗？",
    a: "标准的 Entrance Pass 是指定日期与时间的：订票时就要选入场时段。teamLab 另外也卖 Flexible Pass，指定日期但不指定入场时间。现场也有售票，但成人要多付 ¥200，而且只在还有名额时才卖——周末、节假日与傍晚场经常没有。把现场购票当成备选，不要当成计划。",
  },
  {
    q: "teamLab 无界的营业时间是？",
    a: `营业时间按日期而不同。我们在 ${CHECKED} 查看官方网站时，馆方公告的时间是 08:30–21:00，部分日期提早闭馆（2026 年 11 月 17 日为 17:00），部分日期延长到 22:00。最后入场是闭馆前一小时。另外也有不定期的周二休馆——2026 年 10 月 20 日、11 月 24 日与 12 月 8 日都在内。订时段之前，请务必打开官方日历查你自己的日期。`,
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
    a: "它们是东京不同区域的两间不同美术馆，不是同一品牌的两间分馆。麻布台之丘的「无界」是 50 多件作品组成的无地图迷宫，值得慢慢逛。丰洲的「Planets」是脱鞋走进水里的那一间，带小孩比较适合。如果只去一间：想看艺术、想拍照选无界；想要身体感受强烈、又带着孩子就选 Planets。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "teamLab 无界 门票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnTeamLabBorderlessPage({ updated }: { updated: PageUpdated }) {
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
            teamLab 无界 门票（2026）：<br />票价、时段预约与购票渠道
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
                <p className={styles.verdictStatValue}>指定日期＋时段</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>建议停留</p>
                <p className={styles.verdictStatValue}>约 2 小时</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>地点</p>
                <p className={styles.verdictStatValue}>港区．麻布台之丘</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>成人票 {ADULT}，采用浮动定价，最终金额由你选的日期与时段决定。
              门票指定日期与时间，现场购票成人多 ¥200 且要看还有没有名额；馆方公告的营业时间约 08:30–21:00，
              最后入场是闭馆前一小时。预留大约两小时，从神谷町站（日比谷线，步行 2 分钟）或六本木一丁目站
              （南北线，步行 6 分钟）过去，两站都有地下通道。想要基础票价与最多三次免费改期就买官网；
              想要看得懂、用自己货币、海外卡刷得过的结账就走 Klook。
            </p>
            <a href={cnTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看 teamLab 无界门票 →
            </a>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              本页的票价、营业时间与休馆日读自 teamLab 官方网站，核查日期 {CHECKED}。无界采用浮动定价、日历也会变动，
              请在结账时确认你自己日期的两项信息。
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>teamLab 无界门票价格</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            无界卖的是指定入场时间的 <strong>Entrance Pass</strong>。成人票与残障票采用浮动定价——
            下表是官网上的基础票价，热门的周六傍晚会比清闲的周二上午贵。青少年与儿童票是固定价。
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
            读自 teamLab 官方网站，核查日期 {CHECKED}。现场购票成人多 ¥200，儿童与残障票多 ¥100。
            优惠票需要出示证明文件，请带证件。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>订票前</span>
          <h2 className={styles.sectionTitle}>营业时间、入场时段与休馆日</h2>
          <p className={styles.bodyText}>
            无界开得很长，但日历常变——这件事比票价更常让人踩坑。以下是我们在 {CHECKED} 查看官方网站时的内容：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>营业时间：</strong>公告为 08:30–21:00，部分日期提早闭馆（2026 年 11 月 17 日为 17:00），部分日期延长到 22:00。</li>
            <li><strong>最后入场：</strong>闭馆前一小时——所以 21:00 闭馆表示你得在 20:00 前进场。</li>
            <li><strong>休馆日：</strong>不定期的周二，包含 2026 年 10 月 20 日、11 月 24 日与 12 月 8 日。</li>
            <li><strong>入场：</strong>Entrance Pass 指定日期与入场时间。另有 <strong>Flexible Pass</strong>，指定日期但不指定入场时间。</li>
            <li><strong>改日期：</strong>直接向 teamLab 购买的票，最多可以改三次日期。</li>
          </ul>
          <p className={styles.bodyText}>
            因为营业时间与休馆日每个月都在变，请先用你自己的旅行日期打开官方日历确认，再去订时段。
            工作日上午最清闲、通常也最便宜；周末与傍晚场最先消失。
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
            正因为这个设计，这张票值得先规划。赶一小时只能看到几个有名的展厅；大约两小时才够你乱走、折返，
            并找到那些要等才会出现的作品。这也让无界成为东京两间 teamLab 当中比较偏成人、比较适合摄影的那一间——
            想找脱鞋走进水里的丰洲那一间，请看我们的{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 门票攻略</Link>
            ，里面也有 Planets 与无界的完整比较。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>在哪买</span>
          <h2 className={styles.sectionTitle}>官网 vs Klook vs 现场</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Klook 是 teamLab 的官方售票合作伙伴，所以不论走哪个柜台，入场资格都一样。差别在结账流程、灵活度，
            以及——如果你拖到当天——价格。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "官方网站", "Klook", "当天现场"].map((h) => (
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
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            现场加价与改期次数按 teamLab 官方网站 {CHECKED} 的公告。售票平台的取消与变更条件按方案而异，
            付款前请在订购页上看清楚。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一种适合你</span>
          <h2 className={styles.sectionTitle}>该怎么买？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>teamLab 无界怎么订</h2>
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
            <a href={cnTeamlabBorderless.url} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看无界的时段与价格 →
            </a>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>teamLab 无界的位置</h2>
          <p className={styles.bodyText}>
            美术馆位于港区虎之门五丁目一带的「麻布台之丘 Garden Plaza B」地下一层。
            它不是以前台场的无界——那个场馆已经结束，所以任何把你带去海滨的路线都请忽略。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>神谷町站</strong>（东京地铁日比谷线）——5 号出口步行 2 分钟。</li>
            <li><strong>六本木一丁目站</strong>（东京地铁南北线）——4 号出口步行 6 分钟。</li>
            <li>两站都有地下通道连到麻布台之丘，可以全程照指示牌走，不必上到地面。</li>
          </ul>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 门票（2026）：票价、预约方式与无界比较" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京自由行景点（2026）：哪些要先订票、哪些可以现场去" },
            { href: "/zh-cn/guides/transport/tokyo-airport-transfer", title: "成田机场到东京市区交通（2026）：Skyliner、N'EX 与利木津巴士比较" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先把无界的时段订下来</h2>
            <p className={styles.ctaBannerDesc}>
              指定时段入场的意思是：你最想去的那个时段，就是最先售罄的那个。Klook 是 teamLab 的官方售票合作伙伴，
              可以用自己的货币结账，电子票直接存在手机里。
            </p>
            <a href={cnTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看 teamLab 无界门票 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
