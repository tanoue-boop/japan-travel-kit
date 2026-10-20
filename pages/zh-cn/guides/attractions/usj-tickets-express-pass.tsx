import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import { zhSeoTags } from "../../../../components/ZhSeo";
import {
  KLOOK_REL,
  ZhBreadcrumb,
  ZhDisclosure,
  ZhFaqList,
  ZhRelated,
  zhBreadcrumbJsonLd,
  zhFaqJsonLd,
  type ZhCrumb,
  type ZhFaqItem,
} from "../../../../components/ZhChrome";
import { cnUsjExpressPass, cnUsjStudioPass } from "../../../../lib/klook-links-zh-cn";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions/usj-tickets-express-pass";
const TITLE = "日本环球影城门票与快速通行证（2026）：该买哪一种";
const DESC =
  "USJ 现在一律网上购票，超级任天堂世界需要指定时间入园。这页说明 Studio Pass 的分级定价、" +
  "快速通行证 Express Pass 值不值得，以及 2026 年该买哪一种。内容与英文版同一组事实。";

// Same facts as the English guide: USJ prices by date tier and we deliberately
// quote no figure, because none could be verified for a given date.
const ticketRows = [
  { ticket: "一日 Studio Pass", what: "一天的入园资格；一般设施走普通排队", price: "按日期分级——订票时确认" },
  { ticket: "两日 Studio Pass", what: "连续两天入园，平均每天通常比较便宜", price: "按日期分级——订票时确认" },
  { ticket: "快速通行证（加购）", what: "指定设施免排队＋超级任天堂世界指定时间入园", price: "浮动，加购金额常常不小——订票时确认" },
];

const expressRows = [
  { pass: "快速通行证 4", rides: "约 4 项指定设施", snw: "通常含超级任天堂世界指定时间入园（按场次而异）", bestFor: "行程短、只想攻主力设施" },
  { pass: "快速通行证 7", rides: "约 7 项指定设施", snw: "通常含超级任天堂世界指定时间入园", bestFor: "最热门——忙碌的周末与节假日" },
  { pass: "快速通行证 8／Premium", rides: "涵盖范围最广", snw: "含超级任天堂世界指定时间入园", bestFor: "人最多的日子与 25 周年期间" },
];

const whoFor = [
  {
    title: "工作日非高峰去的人",
    desc: "如果你挑清闲的工作日、行程又灵活，光买 Studio Pass 可能就够了。超级任天堂世界用官方 USJ App 领免费的区域整理券，其他设施走普通排队。",
  },
  {
    title: "周末／节假日去的人",
    desc: "周末、节假日，以及整个 2026 年的 25 周年期间，热门设施的普通排队可能冲到 180～240 分钟。Studio Pass 加一张快速通行证 7，才是实际玩到主力设施并确保进入超级任天堂世界的做法。",
  },
  {
    title: "只有一天，想全部玩到",
    desc: "如果你只有一天、又想把大设施加上超级任天堂世界都扫过，快速通行证 7 或 8 值得那个价差。它实际上是把你本来要耗在队伍里的时间买回来。",
  },
];

const steps = [
  {
    title: "出发前先网上买 Studio Pass",
    desc: "自 2025 年 5 月起，USJ 门口不再销售当日票，所以网上购买实际上是必须的。Klook 是 USJ 的官方合作伙伴，界面看得懂，也支持海外信用卡。",
  },
  {
    title: "判断你到底需不需要快速通行证",
    desc: "用你的入园日期对照预期人流。周末、节假日与周年期间建议加购快速通行证；清闲的工作日可能不需要。",
  },
  {
    title: "把超级任天堂世界的入园方式搞定",
    desc: "人多的日子，超级任天堂世界常采用指定时间入园。含超级任天堂世界指定时间入园的快速通行证可以确保进得去；否则就在入园后，用官方 USJ App 领免费的区域整理券。",
  },
  {
    title: "开园前就到",
    desc: "人多的日子，开门时间可能比公告的早。提前 30～60 分钟到，比较容易拿到超级任天堂世界的指定时间券，普通排队也能先跑一轮。",
  },
];

const faqItems: ZhFaqItem[] = [
  {
    q: "USJ 门票一定要提前买吗？",
    a: "要。自 2025 年 5 月起，日本环球影城停止在门口销售当日票，所以你必须在出发前网上购买。通过 Klook 这类官方合作伙伴订，界面看得懂、接受海外信用卡，并发送可以在入园时扫描的电子票。",
  },
  {
    q: "2026 年的 USJ 快速通行证值得买吗？",
    a: "人多的日子，值得。2026 年是 USJ 的 25 周年期，最热门设施的普通排队可能达到 180～240 分钟。快速通行证把那些好几小时的等待换成优先入场，而且大多数版本还确保超级任天堂世界的指定时间入园。清闲的非高峰工作日就没那么必要——但周末、节假日与周年人流，如果你想玩到主力设施，它几乎是必备。",
  },
  {
    q: "快速通行证 4、7、8 差在哪？",
    a: "数字大致对应你可以免排队的指定设施数量——快速通行证 4 约四项、快速通行证 7 约七项，8／Premium 级别涵盖最广。大多数版本也含一张超级任天堂世界的指定时间入园券。快速通行证 7 是涵盖范围与价格之间最受欢迎的平衡点；8／Premium 适合最忙的日子。实际包含哪些设施会按日期不同，购买前请看清楚你那天的内容。",
  },
  {
    q: "怎么进超级任天堂世界？",
    a: "人多的日子，超级任天堂世界采用指定时间入园。有两个可靠的方式：买一张含超级任天堂世界指定时间入园券的快速通行证，或是在入园后用官方 USJ App 领免费的区域整理券。清闲的日子你可能可以直接走进去，但周末、节假日与周年期间不要指望。",
  },
  {
    q: "USJ 门票多少钱？",
    a: "USJ 采用按日期分级的定价，所以同一张票在热门日期会比清闲日期贵。因为票价随日期与需求变动，我们不报固定金额——请在订票时查你那个特定日期的实时价格。快速通行证是 Studio Pass 之外的加购项目，金额按日期差异很大。",
  },
];

const trail: ZhCrumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "日本环球影城门票与快速通行证" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnUsjTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = zhMonthLabel(updated.iso);

  return (
    <>
      <Head>
        {zhSeoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: zhFaqJsonLd(faqItems) }} />
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: zhBreadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <ZhBreadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            日本环球影城门票与<br />快速通行证（2026）：该买哪一种
          </h1>
          <p className={styles.heroSubtitle}>
            现在一律网上购票，超级任天堂世界需要指定时间入园，而 2026 年又是 25 周年的人流。
            这页说明你这趟到底该买什么。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "Studio Pass＋快速通行证", "超级任天堂世界"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <ZhDisclosure />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>每个人都要买</p>
                <p className={styles.verdictStatValue}>Studio Pass（网上）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>什么时候加快速通行证</p>
                <p className={styles.verdictStatValue}>周末／节假日／周年期</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>超级任天堂世界</p>
                <p className={styles.verdictStatValue}>人多时需指定时间入园</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>现场买得到吗？</p>
                <p className={styles.verdictStatValue}>买不到——2025 年起只卖网上</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>网上买一张 Studio Pass 当入园票。人多的日子——2026 年都算人多——
              再加一张快速通行证，省掉好几小时的队伍并确保进入超级任天堂世界。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={cnUsjStudioPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 门票（Studio Pass）→
              </a>
              <a href={cnUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 快速通行证 →
              </a>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>2026 年 USJ 门票怎么运作</h2>
          <p className={styles.bodyText}>
            买之前要搞懂两件事。第一，<strong>Studio Pass</strong> 是你的入园票——每个人都要一张，
            而自 2025 年 5 月起，你不能当天在门口买。它只卖网上，而且采用分级定价，热门日期较贵。
          </p>
          <p className={styles.bodyText}>
            第二，<strong>快速通行证（Express Pass）</strong>是选购的加购项目，让你在指定设施跳过普通排队，
            而大多数版本还含一张<strong>超级任天堂世界</strong>的指定时间入园券。它本身不是入园票——
            要在 Studio Pass 之外另外买。由于 2026 年是 USJ 的 25 周年期、人流很重，快速通行证的价值
            比平常年份高得多。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票种</span>
          <h2 className={styles.sectionTitle}>USJ 票种一览</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票种", "内容", "定价"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            USJ 采用按日期分级的定价——同一张票在热门日期比较贵。我们不报固定金额；请在订票时查你那天的实时价格
            （2026 年，浮动，结账时确认）。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>快速通行证分级</span>
          <h2 className={styles.sectionTitle}>快速通行证 4 vs 7 vs 8</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["快速通行证", "免排队设施", "超级任天堂世界", "最适合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {expressRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rides}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            实际涵盖哪些设施、以及是否包含超级任天堂世界的指定时间入园，会按版本与日期而不同——
            购买前请务必确认你那天的内容。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>谁该买什么</span>
          <h2 className={styles.sectionTitle}>你该买什么？</h2>
          <div className={styles.stepsList}>
            {whoFor.map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>怎么订、怎么安排这一天</h2>
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

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>从大阪与关西机场怎么去 USJ</h2>
          <p className={styles.bodyText}>
            USJ 在大阪西侧的此花区，从 JR 梦咲线（樱岛线）的 Universal City 站走过去很近——
            通常在西九条换乘。从关西机场进市区可以坐 Haruka 或南海的线路；到了市区之后，再换一段电车就到。
          </p>
          <p className={styles.bodyText}>
            大阪的交通与机场段我们还没有简体中文版；英文版请看{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              大阪机场交通攻略（英文）
            </Link>
            {" "}与{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              大阪市区交通攻略（英文）
            </Link>
            。
          </p>
        </section>

        <ZhFaqList items={faqItems} />

        <ZhRelated
          items={[
            { href: "/zh-cn/guides/attractions/tokyo-disney-tickets", title: "东京迪士尼门票（2026）：乐园与海洋怎么买、怎么选" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/zh-cn/guides/esim/best-esim-japan", title: "日本eSIM推荐（2026）：流量卡方案比较与 Klook 日本 eSIM" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>在 USJ 少排队</h2>
            <p className={styles.ctaBannerDesc}>
              网上买 Studio Pass（2025 年起必须），再加一张快速通行证，避开 25 周年的人流并确保进入超级任天堂世界。
            </p>
            <a href={cnUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看 USJ 门票与快速通行证 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
