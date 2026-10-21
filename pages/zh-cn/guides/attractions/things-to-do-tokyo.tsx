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
import {
  cnFujiHakoneDayTour,
  cnSkytreeTicket,
  cnTokyoSightseeingBusTour,
  cnTokyoSubwayTicket,
} from "../../../../lib/klook-links-zh-cn";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhDateLabel, zhMonthLabel, zhPrice } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions/things-to-do-tokyo";
const TITLE = "东京自由行景点（2026）：必去景点哪些要先订票、哪些可以现场去";
const DESC =
  "2026 年东京自由行景点，按「紧迫性」排序：真的会售罄的那四、五个指定时段门票，" +
  "可以当天早上再决定的其他行程，以及全市最值得的免费视野。票价与英文版同一组数据、同一个核查日期。";

// The only prices on this page are the two carried over from the guides that
// verified them against the operators' own sites — Shibuya Sky and Tokyo Skytree —
// plus the Tocho deck's free admission. Same records, same check date, as English.
const SKY = PRICES.shibuyaSky;
const TREE = PRICES.tokyoSkytree;
const TOCHO = PRICES.tochoDeck;
const CHECKED = zhDateLabel(SKY.checked);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const bookingRows = [
  { thing: "东京迪士尼乐园／迪士尼海洋", when: "数周前", why: "指定日期票，门口完全不卖票" },
  { thing: "teamLab Planets／无界", when: "数天到数周前", why: "30 分钟指定时段，会售罄" },
  { thing: "涩谷SKY", when: "日落场请提前数天", why: "日落场最先没；其他时段比较好订" },
  { thing: "华纳兄弟哈利波特影城", when: "数周前", why: "指定时段、不可重复入场，且要逛四小时" },
  { thing: "大相扑赛事", when: "开售当天", why: "东京只有 1 月、5 月与 9 月有" },
  { thing: "卡丁车", when: "出国前", why: "要处理的不是订位——是国际驾照" },
  { thing: "东京晴空塔、东京铁塔", when: "当天就可以", why: "网上预订省一点；名额通常不是问题" },
  { thing: "东京都厅免费观景室、神社、街区", when: "直接去", why: "没有票可以订" },
];

const faqItems: FaqItem[] = [
  {
    q: "东京到底哪些需要提前订？",
    a: "其实就四件事：东京迪士尼（指定日期、门口不卖票）、两间 teamLab 美术馆（30 分钟指定时段）、涩谷SKY 的日落时段，以及华纳兄弟哈利波特影城。大相扑也算，但只在你的日期落在 1 月、5 月或 9 月时。东京其他几乎所有东西——晴空塔、东京铁塔、神社、街区、全市最好的免费视野——都可以当天早上再决定。",
  },
  {
    q: "东京有免费的景点吗？",
    a: `有，而且其中一个是付费观景台的真正对手。新宿的东京都厅在 45 层、约 202 米处设有观景室，免费入场，晴空塔与东京铁塔都在视野里。神社、公园与整片街区都不用钱就能逛，所以下面要付费的清单可以很短。高度与入场费读自 metro.tokyo.lg.jp，核查日期 ${CHECKED}。`,
  },
  {
    q: "为什么东京的官方售票网站刷不过我的卡？",
    a: "好几个日本景点的付款页对海外发行的信用卡处理得不干净，东京迪士尼是最有名的例子。这就是为什么从海外订票时，走售票平台常常比较顺——即使官网理论上对你开放。它给你的是看得懂、海外卡刷得过的结账流程，而不是更便宜的票。我们每一篇景点攻略都会说那个场馆适合走哪条路。",
  },
  {
    q: "东京的景点需要几天？",
    a: "三到四天就够把两个大型售票景点——例如一座主题乐园加一个影城——配上一个观景台、一个体验，以及一趟出城的一日游。顺序比天数重要：先把指定时段的日期钉死，因为那是唯一不能移动的东西，再用可以现场去的观光填空档。",
  },
  {
    q: "从东京出发有哪些值得的一日游？",
    a: "四个特别突出，而且是真正不同的四天。镰仓最轻松——一条 JR 线不到一小时，有露天的大佛与海边寺院。日光是 UNESCO 神社加山景，往北两小时。箱根是温泉与火山谷，一张周游券涵盖整个环线。河口湖是去看富士山的地方。想去富士山五合目的话，那需要巴士团，我们的富士山一日游攻略整理了行程差异。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "东京自由行景点" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnThingsToDoTokyoPage({ updated }: { updated: PageUpdated }) {
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
            东京自由行景点（2026）：<br />必去景点哪些要先订票、哪些可以现场去
          </h1>
          <p className={styles.heroSubtitle}>
            东京真正会售罄的，只有四、五样。这页给你那份短名单、每一样要提前多久订，
            以及其他可以吃早餐时再决定的行程。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "按紧迫性排序", "官方票价"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>东京大部分的东西不需要订</h2>
          <p className={styles.bodyText}>
            关于东京，最有用的一件事是：真正有时效的景点名单非常短。四、五个场馆卖的是指定日期与时段、
            而且真的会售罄的票，其他东西——晴空塔、东京铁塔、神社、街区、全市最好的免费视野——
            都可以吃早餐时再决定。规划东京行程，主要就是先把那份短名单钉死。
          </p>
          <p className={styles.bodyText}>
            所以这一页是按紧迫性排序，而不是按名气。下面的表格说哪些要订、什么时候订；
            后面的段落则连到每一样的完整攻略，附官方票价与从海外行得通的购票渠道。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>先订还是现场去</span>
          <h2 className={styles.sectionTitle}>哪些要订、要提前多久</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["景点", "何时订", "原因"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.thing}>
                      <td className={styles.tdProvider}>{row.thing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>高处的视野</span>
          <h2 className={styles.sectionTitle}>观景台</h2>
          <p className={styles.bodyText}>
            <strong>涩谷SKY</strong> 是涩谷十字路口上方的开放式屋顶，也是唯一一个「时段比门票重要」的观景台：
            成人网上预订 {zhPrice(SKY.adult, "zh-cn")}、现场 {zhPrice(SKY.atDoor, "zh-cn")}，而会售罄的是日落那个时段。详见我们的{" "}
            <Link href="/zh-cn/guides/attractions/shibuya-sky-tickets" style={linkStyle}>涩谷SKY 门票攻略</Link>。{" "}
            <strong>东京晴空塔</strong>是走高度的选项，350 米天望甲板 {zhPrice(TREE.adult, "zh-cn")}，
            当天在柜台买每张要多付 ¥500 的手续费，所以提前网上买单纯比较便宜。
          </p>
          <p className={styles.bodyText}>
            在为任何一个付钱之前，也值得知道新宿的<strong>东京都厅</strong>：45 层、约 202 米的观景室，
            入场 {zhPrice(TOCHO.adult, "zh-cn")}。开放时间与开放的观景室会变动，去之前请先确认。
            票价与入场费核查日期 {CHECKED}。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>数字艺术</span>
          <h2 className={styles.sectionTitle}>teamLab 美术馆</h2>
          <p className={styles.bodyText}>
            东京有两间 teamLab 数字艺术美术馆——丰洲的 Planets 与麻布台之丘的无界——
            两间都是走进去的沉浸式体验，都采用指定时段入场，而且很快售罄。我们的{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-tokyo-tickets" style={linkStyle}>teamLab Planets 门票攻略</Link>{" "}
            比较了两间、说明哪一间适合你的行程；麻布台之丘那一间的票价与规则在{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-borderless-tickets" style={linkStyle}>teamLab 无界 门票攻略</Link>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>主题乐园</span>
          <h2 className={styles.sectionTitle}>东京迪士尼与哈利波特影城</h2>
          <p className={styles.bodyText}>
            <strong>东京迪士尼</strong>（乐园与海洋）用的是指定日期票，数周前就会售罄，而且门口完全不卖票——
            官网还可能拦截海外信用卡。我们的{" "}
            <Link href="/zh-cn/guides/attractions/tokyo-disney-tickets" style={linkStyle}>东京迪士尼门票攻略</Link>{" "}
            说明怎么买以及两座园区怎么选。哈利波特迷的话，<strong>华纳兄弟哈利波特影城东京</strong>
            在练马，指定时段、不可重复入场，要预留大约四小时——细节在我们的英文版{" "}
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" style={linkStyle}>影城攻略（英文）</Link>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>体验</span>
          <h2 className={styles.sectionTitle}>卡丁车、相扑、和服与刀剑</h2>
          <p className={styles.bodyText}>
            动手型的体验大多可以很晚才订，只有一个例外。<strong>街道卡丁车</strong>让你穿着装扮开上东京的一般道路，
            但它需要国际驾照，而国际驾照必须在你出国前、在自己的国家申请——这点与相扑的赛期（东京只在 1 月、5 月、
            9 月售票）、和服租借、茶道与武士忍者体验，目前都只有英文版，收在{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>英文版的东京景点攻略</Link>{" "}
            与该分类的各篇里。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>出城</span>
          <h2 className={styles.sectionTitle}>四种一日游，四种不同的一天</h2>
          <p className={styles.bodyText}>
            镰仓是你只剩一个早上可以规划时该去的——一条 JR 线不到一小时，露天的大佛与长谷寺相隔几分钟。
            日光往北两小时，看 UNESCO 神社与山中瀑布，神社之间的巴士是要规划的部分。
          </p>
          <p className={styles.bodyText}>
            富士山有两个不同的问题。想去河口湖一带的观景点，走的是直达电车；想站在山上的 Subaru Line 五合目，
            那需要巴士团——我们的{" "}
            <Link href="/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>富士山一日游攻略</Link>{" "}
            把四种行程整理清楚。箱根是温泉的替代方案，一张周游券涵盖整个环线；这两篇目前是英文版，
            收在{" "}
            <Link href="/guides/attractions#daytrips" style={linkStyle}>英文版的一日游分类（英文）</Link>。
          </p>
        </section>

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>值得先订好的东京预订</span>
          <h2 className={styles.sectionTitle}>四个先放进口袋的东西</h2>
          <p className={styles.bodyText}>
            一张交通通票、大多数人最后都会买的那张观景台门票、一趟把三大景点串起来的导览，以及富士山的巴士团。
            打开商品页看你那天的实时价格。
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            {[cnTokyoSubwayTicket, cnSkytreeTicket, cnTokyoSightseeingBusTour, cnFujiHakoneDayTour].map((t) => (
              <a key={t.url} href={t.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                {t.label} →
              </a>
            ))}
          </div>
        </section>

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/zh-cn/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 门票（2026）：票价、预约方式与无界比较" },
            { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", title: "teamLab 无界 门票（2026）：票价、时段预约与购票渠道" },
            { href: "/zh-cn/guides/attractions/tokyo-disney-tickets", title: "东京迪士尼门票（2026）：乐园与海洋怎么买、怎么选" },
            { href: "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日游（东京出发·2026）：行程怎么选、五合目看什么" },
            { href: "/zh-cn/guides/transport/tokyo-airport-transfer", title: "成田机场到东京市区交通（2026）：Skyliner、N'EX 与利木津巴士比较" },
            { href: "/zh-cn/guides/esim/best-esim-japan", title: "日本eSIM推荐（2026）：流量卡方案比较与 Klook 日本 eSIM" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />
      </div>
    </>
  );
}
