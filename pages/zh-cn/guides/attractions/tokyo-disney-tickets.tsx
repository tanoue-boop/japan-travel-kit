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
import { cnFujiDayTour, cnTokyoDisney, cnTokyoSightseeingBusTour } from "../../../../lib/klook-links-zh-cn";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions/tokyo-disney-tickets";
const TITLE = "东京迪士尼门票（2026）：乐园与海洋怎么买、怎么选";
const DESC =
  "东京迪士尼门票 2026：每张票都指定日期、现场完全不卖票。海外信用卡刷不过时怎么买，" +
  "以及迪士尼乐园与迪士尼海洋该选哪一个。内容与英文版同一组事实。";

// Facts and figures are the English guide's, unchanged. Tokyo Disney publishes no
// fixed yen price — the one-day ticket is variable, date-based — so this page quotes
// the same indicative "from about $55" the English page does and nothing more.
const ticketRows = [
  {
    ticket: "一日票（目前销售中）",
    what: "指定日期，进入其中一座园区（乐园或海洋）",
    price: "约 $55 起，按日期浮动——订票时请确认",
  },
  {
    ticket: "多日票与其他票种",
    what: "撰稿时并未普遍开售——销售情况会变动",
    price: "订票时查看实时供应状况",
  },
  {
    ticket: "现场／门口票",
    what: "不销售——所有票都指定日期、必须事先购买",
    price: "无此选项",
  },
];

const parkRows = [
  {
    park: "东京迪士尼乐园",
    style: "经典的城堡式园区：巡游、烟花、合家同乐的设施",
    suits: "第一次来、带年纪小的孩子、经典迪士尼迷",
    note: "去过其他迪士尼的话，动线会很熟悉",
  },
  {
    park: "东京迪士尼海洋",
    style: "航海与水主题；全世界只有东京有，风格偏成人；园内供酒",
    suits: "成人、情侣、想要不一样体验的回访者",
    note: "正在庆祝 25 周年（2026 年 4 月～2027 年 3 月）",
  },
];

const whoFor = [
  {
    title: "选东京迪士尼乐园的话…",
    desc: "你带着年纪较小的孩子，或这是你第一次去任何一座迪士尼。园区沿用经典的城堡式布局，有白天的巡游，重心放在合家同乐的设施——轻松、熟悉的一天。",
  },
  {
    title: "选东京迪士尼海洋的话…",
    desc: "你想要在别的迪士尼度假区拿不到的东西，而且你是成人或没有带小小孩。迪士尼海洋风格更偏成人，主题港湾是东京独有的，而且——和乐园不同——园内供酒。",
  },
  {
    title: "2026 年去？注意周年活动",
    desc: "东京迪士尼海洋正在庆祝 25 周年，期间为 2026 年 4 月到 2027 年 3 月。周年期通常人更多、热门日期更快售罄，所以指定日期的票请尽早订。",
  },
];

const steps = [
  {
    title: "先决定园区与确切日期",
    desc: "东京迪士尼的每张票都指定日期——你要选好要去的那一天以及要进的园区，而那张票也只在那天有效。买之前先决定乐园还是海洋，因为一日票只含一座园区，不是两座。",
  },
  {
    title: "提早订，现场没有票",
    desc: "因为门口不卖票、每张票又绑定特定日期，热门日期可能在数周到数月前就售罄。把订票当成出发前要做的事，不是到了才处理。",
  },
  {
    title: "海外信用卡有问题就用 Klook",
    desc: "东京迪士尼度假区官网经常拒绝或拦截海外发行的信用卡。Klook 是官方授权的销售渠道，可以用海外卡、界面看得懂，这也是许多海外旅客选它的原因。",
  },
  {
    title: "把电子票二维码绑进官方 App",
    desc: "购票后你会拿到电子票二维码。你可以把那个二维码绑进东京迪士尼度假区官方 App，当天的园内功能也在那里操作。出发前先设置好，入园时省时间。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "东京迪士尼门票一定要提前买吗？",
    a: "是。东京迪士尼度假区门口不卖票——所有票都指定日期，也就是购买时就要选好日期与园区。热门日期可能在数周到数月前售罄，所以提前订基本上是必要的，而不是选项。",
  },
  {
    q: "可以用海外信用卡买东京迪士尼门票吗？",
    a: "在东京迪士尼度假区官网上，常常不行——官网经常拒绝或拦截海外发行的信用卡，这是海外旅客常见的困扰。普遍的做法是通过 Klook：它是官方授权的销售渠道，接受海外卡、界面看得懂，并发送可以绑进东京迪士尼度假区官方 App 的电子票二维码。",
  },
  {
    q: "东京迪士尼乐园和迪士尼海洋该选哪一个？",
    a: "一日票只含一座园区，所以通常只能选一边。东京迪士尼乐园是经典的城堡式园区——巡游与合家同乐的设施，适合第一次来的人与带小小孩的家庭。东京迪士尼海洋是航海主题，全世界只有东京有，风格偏成人，而且园内供酒；它也正在庆祝 2026 年 4 月到 2027 年 3 月的 25 周年。第一次带小孩去，乐园是安全牌；想要与众不同，选海洋。",
  },
  {
    q: "现在有哪些票种在卖？",
    a: "撰稿时，普遍开售的通常是一日票。它采用按日期浮动的定价——大概来说约 $55 起——但金额会随日期与需求变动，所以请在订票时确认你那天的实时价格。其他票种是否销售会按时期而不同，请查看当下的供应状况。",
  },
  {
    q: "东京迪士尼一日票多少钱？",
    a: "定价是浮动的、按日期而定，所以同一张票在热门日期会比清闲日期贵。大概来说约 $55 起，但请只把它当成「起」的参考值——2026 年的票价可能调整，订票时请确认你那个特定日期的实际金额。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "东京迪士尼门票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnTokyoDisneyTicketsPage({ updated }: { updated: PageUpdated }) {
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
            东京迪士尼门票（2026）：<br />乐园与海洋怎么买、怎么选
          </h1>
          <p className={styles.heroSubtitle}>
            每张票都指定日期、现场完全不卖票，而官网还经常拒绝海外信用卡。
            这页说明怎么买，以及两座园区怎么选。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "指定日期票", "海外卡可走 Klook"].map((t) => (
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
                <p className={styles.verdictStatLabel}>目前销售</p>
                <p className={styles.verdictStatValue}>一日票</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>票价（参考）</p>
                <p className={styles.verdictStatValue}>约 $55 起，浮动</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>现场票</p>
                <p className={styles.verdictStatValue}>没有——只有指定日期票</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>海外信用卡？</p>
                <p className={styles.verdictStatValue}>用 Klook（官方授权渠道）</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>先选园区与日期，然后提前把一日票订下来——现场不卖票，热门日期会售罄。
              如果官网拒绝你的海外信用卡，Klook 是官方授权的销售渠道，接受海外卡，并发送可以绑进官方 App 的二维码。
            </p>
            <a href={cnTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看东京迪士尼门票 →
            </a>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>2026 年东京迪士尼门票怎么运作</h2>
          <p className={styles.bodyText}>
            东京迪士尼度假区位于东京东边的浦安，由两座独立的园区组成：<strong>东京迪士尼乐园</strong>与
            <strong>东京迪士尼海洋</strong>。买票前最重要的一件事是：门票<strong>指定日期</strong>——
            你选好确切的那一天与要进的园区，而那张票只在那天有效。
          </p>
          <p className={styles.bodyText}>
            而且<strong>门口完全不卖票</strong>。这表示你不能当天直接去现场买，而因为每张票绑定日期，
            热门日期可能在数周到数月前就售罄。目前普遍开售的通常是一日票，采用按日期浮动的定价——
            所以同一张票在热门日期会比较贵。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票种</span>
          <h2 className={styles.sectionTitle}>东京迪士尼票种一览</h2>
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
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            定价浮动且按日期而定（2026 年，可能调整——订票时请确认）。一日票「约 $55 起」只是参考值；
            请在结账时查你那个特定日期与园区的实时价格。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>乐园 vs 海洋</span>
          <h2 className={styles.sectionTitle}>该选哪一座园区？</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["园区", "整体性格", "最适合", "备注"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parkRows.map((row) => (
                    <tr key={row.park}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.park}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.style}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.suits}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            一日票只含一座园区，所以大多数人会选一边。以上是帮你做决定的概括描述——两座园区都很大，
            都是整天的行程。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>适合谁</span>
          <h2 className={styles.sectionTitle}>哪一座园区适合你？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            不管选哪一座，都请先规划路线——度假区离东京市中心要坐一段电车。抵达当天的机场段可以参考我们的{" "}
            <Link href="/zh-cn/guides/transport/tokyo-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              成田机场到东京市区交通攻略
            </Link>
            。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>东京迪士尼门票怎么买</h2>
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
          <span className={styles.sectionLabel}>海外信用卡</span>
          <h2 className={styles.sectionTitle}>为什么很多旅客改走 Klook</h2>
          <p className={styles.bodyText}>
            东京迪士尼度假区官网是主要的购票渠道，但它经常拒绝或拦截海外发行的信用卡——这是国际旅客长年的头痛。
            遇到这种情况，有一个直接的替代方案。
          </p>
          <p className={styles.bodyText}>
            <strong>Klook 是东京迪士尼度假区官方授权的销售渠道。</strong>它接受海外卡、界面看得懂，
            并发送可以绑进东京迪士尼度假区官方 App 的电子票二维码。这个组合——支持海外卡，加上可以绑进 App 的二维码——
            就是它成为海外旅客主流做法的原因。如果你同时在安排东京其他行程，我们的{" "}
            <Link href="/zh-cn/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              涩谷SKY 门票攻略
            </Link>
            {" "}讲的是另一个走售票平台比较顺的预订。
          </p>
        </section>

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>同一座城市的一日游</span>
          <h2 className={styles.sectionTitle}>非园区的那一天怎么排</h2>
          <p className={styles.bodyText}>
            去园区就是一整天，所以多数人是把迪士尼排进东京这一周、而不是把一周排进迪士尼。下面两个行程可以填掉
            非园区的那一天，而且和门票在同一个 Klook 账号里结账。
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <a href={cnFujiDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看{cnFujiDayTour.label} →
            </a>
            <a href={cnTokyoSightseeingBusTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看{cnTokyoSightseeingBusTour.label} →
            </a>
          </div>
        </section>

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/usj-tickets-express-pass", title: "日本环球影城门票与快速通行证（2026）：该买哪一种" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/zh-cn/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 门票（2026）：票价、预约方式与无界比较" },
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京自由行景点（2026）：哪些要先订票、哪些可以现场去" },
            { href: "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日游（东京出发·2026）：行程怎么选、五合目看什么" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先把东京迪士尼的日期锁住</h2>
            <p className={styles.ctaBannerDesc}>
              现场不卖票，热门日期会售罄，所以请提前订。Klook 是官方授权的销售渠道，接受海外信用卡，
              并发送可以绑进官方 App 的二维码。
            </p>
            <a href={cnTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看东京迪士尼门票 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
