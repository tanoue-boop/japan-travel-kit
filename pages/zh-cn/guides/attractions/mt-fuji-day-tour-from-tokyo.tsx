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
import {
  cnFujiDayTour,
  cnFujiHakoneBulletTrainTour,
  cnFujiHakoneDayTour,
  cnFujiSubaruLineHakoneBusTour,
} from "../../../../lib/klook-links-zh-cn";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo";
const TITLE = "富士山一日游（东京出发·2026）：行程怎么选、五合目看什么";
const DESC =
  "比较东京出发的富士山一日游：只跑富士山，还是富士山加箱根；Subaru Line 五合目到底是什么地方、" +
  "一天要多久、以及从海外怎么订。行程内容与英文版同一组数据、同一个核查日期。";

// Tour contents and durations are as the Klook listings described them on
// 19 Oct 2026 — the same check the English guide records. No price is quoted
// here or there: Klook answers automated reads of its product pages with 403.
const CHECKED = "2026年10月19日";

const tourRows = [
  {
    tour: "富士山五合目、河口湖、忍野八海＋御殿场",
    covers: "五合目，加上河口湖、涌泉村落与一站奥特莱斯",
    length: "整天，当天晚上回到东京",
    url: cnFujiDayTour.url,
    best: "一天里的观光点最多",
  },
  {
    tour: "富士山＋箱根一日游",
    covers: "五合目、大涌谷火山谷（含缆车下行）、芦之湖游船",
    length: "行程标示约 11 小时",
    best: "一天跑两个目的地",
    url: cnFujiHakoneDayTour.url,
  },
  {
    tour: "富士山Subaru Line五合目、芦之湖＋箱根拼团巴士",
    covers: "同样的富士山加箱根组合，拼团巴士版本",
    length: "东京出发，整天",
    best: "巴士座位，费用较低",
    url: cnFujiSubaruLineHakoneBusTour.url,
  },
  {
    tour: "富士山＋箱根（可选新干线返程）",
    covers: "五合目、大涌谷与芦之湖，返程可选坐新干线",
    length: "东京出发，整天",
    best: "返程比较短、比较舒服",
    url: cnFujiHakoneBulletTrainTour.url,
  },
];

const whoFor = [
  {
    title: "只跑富士山的行程，如果…",
    desc: "山本身是重点，而你想在湖边待久一点。五合目、河口湖与忍野八海都在北侧、彼此很近，所以只跑富士山的一天比较从容，是真的有停留，而不是一连串的巴士移动。",
  },
  {
    title: "富士山＋箱根的行程，如果…",
    desc: "你只有一天空档，想从里面挤出两个目的地。合并行程加上大涌谷火山谷、一段缆车与芦之湖游船——我们查到的行程标示约 11 小时，是很长但很满的一天。",
  },
  {
    title: "自己去，如果…",
    desc: "你宁愿按自己的节奏走，也不介意换乘电车与巴士。箱根特别适合这样——箱根周游券把整个环线变成一张票。富士山的五合目就比较难，没有一日游或租车不好到。",
  },
];

const steps = [
  {
    title: "先决定是只跑富士山，还是富士山加箱根",
    desc: "这是真正的选择，也决定了你这一天有多长。只跑富士山的行程把时间放在山的北侧；合并行程拿掉其中一部分，换成箱根的火山谷与湖上游船，代价是在巴士上更久。",
  },
  {
    title: "确认你那天的「五合目」到底是什么",
    desc: `富士Subaru Line五合目是这座山上公路可以到的最高点——我们查到的行程把它写成海拔 2,300 米。它是一个观景点加一丛店铺，不是山顶：富士山的官方登山季在 9 月 10 日结束，上方的登山道冬季封闭。核查日期 ${CHECKED}。`,
  },
  {
    title: "接受看不看得到山要看天气",
    desc: "没有任何行程能保证你看到山。富士山经常在云里，能见度在较凉、较干燥的月份与一天中较早的时候比较好。运营方不管天气都会出团，所以订这一天时，要连其他停留点一起算进值不值得。",
  },
  {
    title: "订一个日期，用看得懂的界面、刷得过的卡",
    desc: "这些是指定日期、座位有限的巴士团，热门日期先没。Klook 的界面看得懂、接受海外信用卡——这点很重要，因为好几家日本运营方自己的订票页，对这两件事都不太友好。",
  },
  {
    title: "想清楚你怎么到集合地点",
    desc: "东京出发的团大多清晨从新宿或东京站附近出发。先确认是哪一边，并把当天第一班地铁或 JR 的时间排进去——错过巴士出发是补不回来的。",
  },
];

const faqItems: ZhFaqItem[] = [
  {
    q: "东京出发的富士山一日游值得吗？",
    a: "对大多数只有一天空档的旅客来说，值得——主要是因为替代方案比看起来难。富士Subaru Line五合目坐电车到不了，所以自己去就要换乘巴士或租车，而山周边的景点又很分散。巴士团把这些收拢成一次预订。要注意的是天气：山经常在云里，没有行程能保证你看到它。",
  },
  {
    q: "富士Subaru Line五合目是什么？",
    a: `它是富士山上公路可以到达的最高点，也是几乎每一个东京出发的一日游都会停的地方——我们查到的 Klook 行程把它写成海拔 2,300 米。它是一个有店铺与餐厅的观景点，不是山顶。富士山的官方登山季在 9 月 10 日结束，五合目以上的登山道冬季封闭，所以一日游是去山腰，不是去登顶。核查日期 ${CHECKED}。`,
  },
  {
    q: "东京出发的富士山一日游要多久？",
    a: `请预留一整天。我们查到的富士山加箱根合并行程标示约 11 小时，只跑富士山的行程也是当天晚上回到东京。出发时间是清晨，从东京市中心。如果你的行程很紧，一日游是整天都没了——不是半天的小旅行。行程时间按 ${CHECKED} 的标示。`,
  },
  {
    q: "该选只跑富士山，还是富士山加箱根？",
    a: "只跑富士山的行程停在山的北侧，通常会去河口湖与涌泉村落忍野八海，这样的一天没那么赶，每个点都真的有时间。富士山加箱根的行程多了大涌谷火山谷、一段缆车与芦之湖游船，但一天更长，而且更多时间在移动。如果这是你唯一的空档日，选合并行程；如果你宁愿看得少但看得仔细，选只跑富士山。",
  },
  {
    q: "下雨或多云的话，行程中看得到富士山吗？",
    a: "不太能指望。富士山自己造天气，相当多的时间都在云里，在较暖、较潮湿的月份尤其明显。能见度一般在一年中较凉、较干燥的那段时间与一天中较早的时候比较好。不论天气行程都会出团，所以合理的做法是：挑一个就算没看到山、其他停留点（湖、火山谷、游船）你也愿意去的行程。",
  },
  {
    q: "可以不参加一日游、自己去富士山吗？",
    a: "你可以自己坐高速巴士或电车到河口湖一带，从那里在季节内有巴士开上 Subaru Line。这需要规划，班次不密，而且返程算错时间可能会被困住。箱根是两者中比较容易自己跑的，因为箱根周游券一张票就涵盖了电车、缆索铁道、空中缆车、巴士与游船的整个环线。",
  },
  {
    q: "富士山一日游需要 JR Pass 吗？",
    a: "不需要。东京出发的一日游走公路，车费含在行程价格里——铁路周游券在这段路上买不到任何东西。唯一的例外是提供新干线返程的行程，周游券可能涵盖那一段。如果你在考虑整趟旅程要不要买铁路周游券，我们的英文版 JR Pass 攻略算了盈亏平衡点。",
  },
  {
    q: "东京的富士山一日游从哪里出发？",
    a: "大多清晨从新宿或东京站一带出发；确切的集合地点写在你订的那个行程页上。订的时候就确认，并把当天第一段行程排在它前面，因为巴士不会等人。如果你的集合点在东京地铁或都营线上，东京地铁通票涵盖这两家，但不含 JR。",
  },
];

const trail: ZhCrumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "富士山一日游（东京出发）" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnMtFujiDayTourPage({ updated }: { updated: PageUpdated }) {
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
            富士山一日游（东京出发·2026）：<br />行程怎么选、五合目看什么
          </h1>
          <p className={styles.heroSubtitle}>
            每一个行程都会停 Subaru Line 五合目。差别在于这一天剩下的时间是给富士山还是箱根——
            以及你愿意在巴士上坐多久。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "只跑富士山 vs 富士山＋箱根", "五合目是什么"].map((t) => (
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
                <p className={styles.verdictStatLabel}>一天长度</p>
                <p className={styles.verdictStatValue}>最长约 11 小时</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>主要停留</p>
                <p className={styles.verdictStatValue}>Subaru Line 五合目</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>出发</p>
                <p className={styles.verdictStatValue}>清晨，东京市中心</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>看得到富士山？</p>
                <p className={styles.verdictStatValue}>永远不保证</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>如果这是你唯一的空档日，选富士山加箱根的行程，一天拿到两个目的地。
              如果你宁愿看得少但看得仔细，选含河口湖与忍野八海的只跑富士山行程。不论哪一种，这一天大约 11 小时，
              而山可能在云里——请挑一个你就算没看到山也会满意其他停留点的行程。
            </p>
            <a href={cnFujiHakoneDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              在 Klook 查看富士山一日游 →
            </a>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>为什么几乎每个人都选一日游</h2>
          <p className={styles.bodyText}>
            富士山距离东京约两小时车程，但在旅客真正想站的那个位置，电车实际上到不了。五合目没有车站：
            富士Subaru Line是一条收费公路，自己上去就得从河口湖一带换乘巴士，而那个时刻表不会原谅你晚出门。
          </p>
          <p className={styles.bodyText}>
            这就是富士山周边一日游市场这么大的原因，也是这些行程第一眼看起来这么像的原因。它们全都停五合目。
            差别在于剩下那六个小时做什么——而那才是值得拿来做选择的事。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比较</span>
          <h2 className={styles.sectionTitle}>东京出发的四种富士山一日游</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["行程", "内容", "长度", "最适合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider}>
                        <a href={row.url} target="_blank" rel={KLOOK_REL} className={styles.tdLink}>
                          {row.tour}
                        </a>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            内容与时间按 {CHECKED} Klook 行程页上的描述。这里不报价格：Klook 拦截对产品页的自动读取，
            所以没有任何一个数字是我们能核查的——请打开行程页看你那天的实时价格。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一种一天</span>
          <h2 className={styles.sectionTitle}>哪一种安排适合你？</h2>
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
          <h2 className={styles.sectionTitle}>富士山一日游怎么订</h2>
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
            抵达东京当天的机场交通，请看我们的{" "}
            <Link href="/zh-cn/guides/transport/tokyo-airport-transfer">成田机场到东京市区交通攻略</Link>
            ；出门前先把网络准备好，请看{" "}
            <Link href="/zh-cn/guides/esim/best-esim-japan">日本eSIM推荐</Link>。
          </p>
        </section>

        <ZhFaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>上面比较的四个行程</span>
          <h2 className={styles.sectionTitle}>直接打开行程看价格</h2>
          <p className={styles.bodyText}>
            四个行程都从东京出发、都停 Subaru Line 五合目。打开行程页看你那天的价格与出发地点。
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            {[cnFujiHakoneDayTour, cnFujiDayTour, cnFujiSubaruLineHakoneBusTour, cnFujiHakoneBulletTrainTour].map((t) => (
              <a key={t.url} href={t.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                {t.label} →
              </a>
            ))}
          </div>
        </section>

        <ZhRelated
          items={[
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京自由行景点（2026）：哪些要先订票、哪些可以现场去" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/zh-cn/guides/transport/tokyo-airport-transfer", title: "成田机场到东京市区交通（2026）：Skyliner、N'EX 与利木津巴士比较" },
            { href: "/zh-cn/guides/esim/best-esim-japan", title: "日本eSIM推荐（2026）：流量卡方案比较与 Klook 日本 eSIM" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>一天空档，两个目的地</h2>
            <p className={styles.ctaBannerDesc}>
              富士山加箱根的行程把 Subaru Line 五合目和大涌谷、芦之湖游船排在同一天。
              Klook 的界面看得懂，也接受海外信用卡。
            </p>
            <a href={cnFujiHakoneDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              在 Klook 查看富士山一日游 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
