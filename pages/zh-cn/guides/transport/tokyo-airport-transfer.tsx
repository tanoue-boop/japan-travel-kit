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
import {
  cnHanedaLimousineBus,
  cnKeiseiSkyliner,
  cnKlookEsim,
  cnNaritaExpress,
  cnNaritaLimousineBus,
  cnTokyoSubwayTicket,
} from "../../../../lib/klook-links-zh-cn";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/transport/tokyo-airport-transfer";
const TITLE = "成田机场到东京交通（2026）：Skyliner、N'EX 与巴士";
const DESC =
  "成田机场到东京怎么走，羽田机场也一起比较：电车、巴士与出租车的价格、时间与方便度，附 2026 年票价。与英文版同一组数字。";

// Every fare and journey time below is the English guide's, unchanged. They are
// approximate 2026 one-way figures as that page states, and can change.
const naritaOptions = [
  { option: "成田特快 N'EX", time: "约 60 分钟", price: "¥3,070", bestFor: "速度与舒适" },
  { option: "京成 Skyliner", time: "约 41 分钟", price: "¥2,570", bestFor: "到日暮里／上野最快" },
  { option: "利木津巴士", time: "90～120 分钟", price: "¥3,200", bestFor: "行李很重" },
  { option: "京成本线（普通特急）", time: "约 90 分钟", price: "¥1,320", bestFor: "省钱" },
  { option: "出租车", time: "60～90 分钟", price: "¥20,000 起", bestFor: "多人同行／深夜抵达" },
];

const hanedaOptions = [
  { option: "京急线", time: "约 37 分钟", price: "¥310", bestFor: "便宜又快" },
  { option: "东京单轨电车", time: "约 20 分钟", price: "¥500", bestFor: "快速到滨松町" },
  { option: "利木津巴士", time: "30～60 分钟", price: "¥1,200", bestFor: "行李很重／直达酒店" },
  { option: "出租车", time: "30～60 分钟", price: "¥6,000 起", bestFor: "门到门" },
];

const nexGuidePoints = [
  {
    title: "JR Pass 可以用",
    desc: "N'EX 是 JR 的列车，所以持 JR Pass 免费乘坐。如果你买了 7 日或 14 日的周游券，这就是从成田出发第一天最明显的选择。在机场的 JR 售票处（绿色窗口）订座位。",
  },
  {
    title: "直达主要车站",
    desc: "N'EX 不用换车就能直达新宿（90 分钟）、涩谷（75 分钟）与横滨（90 分钟）。住在东京西侧的人，方便度上很难被超越。",
  },
  {
    title: "有外国旅客优惠票",
    desc: "JR 东日本为持外国护照者提供 N'EX 东京往返优惠票：往返 ¥4,000（两张单程要 ¥6,140）。抵达后在成田机场的 JR 售票处出示护照购买。",
  },
  {
    title: "大约每 30 分钟一班",
    desc: "从成田第 1 航站楼与第 2／3 航站楼出发的班次，整天大约每 30 分钟一班。如果你是清晨或深夜的航班，请事先查时刻表。",
  },
];

const skylinerPoints = [
  {
    title: "成田到东京市中心最快的电车",
    desc: "京成 Skyliner 从成田机场到日暮里（东京东侧）的 66 公里，只要 41 分钟。从日暮里再换一小段 JR 或地铁，就能到东京大部分区域。",
  },
  {
    title: "JR Pass 不能用",
    desc: "Skyliner 走的是京成电铁这家民营铁路，不是 JR。持 JR Pass 不能坐。不过京成有 Skyliner 加东京地铁 24／48／72 小时通票的组合票——如果你打算靠地铁逛东京，很实用。",
  },
  {
    title: "住东京东侧或北侧最适合",
    desc: "如果你的酒店在浅草、上野、秋叶原，或任何东京地铁／都营线到得了的地方，Skyliner 加地铁的组合常常比 N'EX 更快也更便宜。",
  },
];

const skylinerVsNexRows = [
  { feature: "运营公司", skyliner: "京成电铁（民营）", nex: "JR 东日本" },
  { feature: "单程票价", skyliner: "¥2,570", nex: "¥3,070" },
  { feature: "最快时间", skyliner: "到日暮里 41 分钟", nex: "到东京站约 60 分钟" },
  { feature: "JR Pass 可用", skyliner: "不可", nex: "可——免费" },
  { feature: "IC 卡付车费", skyliner: "不可（需另付特别车费）", nex: "可" },
  { feature: "直达停靠", skyliner: "日暮里、京成上野", nex: "东京、新宿、涩谷、横滨" },
  { feature: "发车间隔", skyliner: "约每 30 分钟", nex: "约每 30 分钟" },
  { feature: "优惠方案", skyliner: "＋东京地铁通票组合", nex: "外国旅客往返票 ¥4,000" },
];

const destinationRows = [
  { dest: "日暮里", pick: "Skyliner", note: "41 分钟直达——到东京市中心最快的电车。" },
  { dest: "京成上野", pick: "Skyliner", note: "Skyliner 终点，比日暮里再几分钟（约 44 分钟）。" },
  { dest: "浅草／秋叶原", pick: "Skyliner", note: "坐 Skyliner 到上野／日暮里，再换一小段地铁或都营线。" },
  { dest: "东京站", pick: "N'EX", note: "约 60 分钟直达，不用换车。" },
  { dest: "涩谷", pick: "N'EX", note: "同一班车 75 分钟直达。" },
  { dest: "新宿", pick: "N'EX", note: "90 分钟直达——不用拖着行李换车。" },
  { dest: "横滨", pick: "N'EX", note: "90 分钟直达，往东京以南的明显选择。" },
];

const busFareRows = [
  { airport: "成田（NRT）", time: "90～120 分钟", price: "¥3,200", note: "受路况影响；上下班时段更久" },
  { airport: "羽田（HND）", time: "30～60 分钟", price: "¥1,200", note: "比成田离市区近得多" },
];

const busPoints = [
  {
    title: "行李很重或很大时最理想",
    desc: "机场利木津巴士把行李放进车底行李舱——你不必把包拖过车厢、扛上扶梯。带家人、带滑雪装备，或拉大型行李箱的人特别有用。",
  },
  {
    title: "直达主要酒店区",
    desc: "很多利木津巴士线路直接停在主要酒店区：新宿、涩谷、东京站、赤坂、池袋。部分线路停在个别酒店。线路请查 TCAT（东京城市航空总站）的时刻表。",
  },
  {
    title: "零换车——而且收车更晚",
    desc: "许多线路直达主要酒店与区域，所以你上一次车、下车就在门口附近——带小小孩、长辈或大量装备时很理想。机场巴士的运营时间也比大多数机场电车更晚，所以如果你在电车末班之后才落地，巴士通常是打车之前最便宜的选项。请确认你那条线路的末班时间。",
  },
  {
    title: "会受路况影响",
    desc: "东京高速公路在高峰时段（早上 7～9 点、傍晚 5～8 点）可能严重拥堵。如果你在高峰时段移动，请多留时间，或考虑坐电车、把重行李用宅急便送到酒店。",
  },
  {
    title: "旺季请提前订",
    desc: "旺季提前订可以在热门线路上确保座位、锁定票价，也省掉长途飞行后在机场柜台排队。",
  },
];

const transferTips = [
  {
    title: "落地前先把 IC 卡准备好",
    desc: "通过 Suica App 开好的 IC 卡（Suica 或 PASMO）让你一抵达就能直接刷闸机，不用在售票机前排队。如果你没有，成田与羽田的 IC 卡机器都有英文界面。",
  },
  {
    title: "深夜抵达的选项有限",
    desc: "成田的电车大约在晚上 11 点到午夜之间收车。如果你的航班很晚落地，选项就是机场利木津巴士（大约运营到 23:30）或出租车。成田的出租车请准备 ¥20,000～¥25,000；羽田比较近也比较便宜，约 ¥6,000～¥8,000。",
  },
  {
    title: "用 JR Pass 的人：上车前先换票",
    desc: "如果你带着 JR Pass 兑换券抵达成田，请先在入境大厅的 JR 东日本旅行服务中心换成正式的周游券，再去坐 N'EX。光有兑换券进不了闸机。",
  },
  {
    title: "考虑行李托运（宅急便）",
    desc: "日本的宅急便（最常见的是黑猫宅急便）可以把行李从机场送到你的酒店，每件约 ¥1,500～¥3,000，隔天送达。这让你可以轻装坐电车，不用把重箱子拖过车站。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "成田机场到东京最便宜的方式是什么？",
    a: "最便宜的电车选项是京成本线的特急（不是 Skyliner），¥1,320，到上野大约 90 分钟。如果你持 JR Pass，成田特快是免费的，也是最舒服的选项。没有周游券、纯粹想省钱的话，京成特急最划算。",
  },
  {
    q: "羽田机场到东京市中心要多久？",
    a: "羽田机场（HND）比成田离市区近得多。京急线到品川大约 13 分钟（¥310），到新宿换乘一次大约 37 分钟。东京单轨电车到滨松町大约 20 分钟（¥500）。出租车按路况 30～60 分钟，约 ¥6,000～¥9,000。",
  },
  {
    q: "成田机场可以用 IC 卡吗？",
    a: "可以——IC 卡（Suica 与 PASMO）在成田的京成普通车与 N'EX 上都能用。不过它们不涵盖京成 Skyliner 的特别车费（Skyliner 的指定座位要另外付）。在羽田，京急线与东京单轨电车都可以用 IC 卡。在入境大厅任何一台售票机都能充值。",
  },
  {
    q: "成田特快 N'EX 值得坐吗？",
    a: "如果你有 JR Pass，绝对值得——它免费，而且是最舒服的选项。没有周游券的话，单程 ¥3,070 的 N'EX 换到的是不用换车直达新宿、涩谷与横滨。外国旅客往返票（¥4,000）如果你返程也从成田飞，特别划算。",
  },
  {
    q: "成田机场到新宿怎么走？",
    a: "最快的是成田特快 N'EX，直达新宿大约 90 分钟（无周游券 ¥3,070；持 JR Pass 免费）。次佳是京成 Skyliner 到日暮里（41 分钟），再换 JR 山手线到新宿（再约 30 分钟）。两个都可靠；N'EX 在行李方便度上胜出，因为你全程坐同一班车。",
  },
  {
    q: "Skyliner 和 N'EX 哪个快？",
    a: "看你要去哪里。京成 Skyliner 是成田到东京市中心最快的单一列车，41 分钟到日暮里。但它只开到日暮里与京成上野，所以如果你的目的地是新宿、涩谷或横滨，成田特快 N'EX 整体通常更快，因为它不用换车直接到。",
  },
  {
    q: "Skyliner 可以用 JR Pass 吗？",
    a: "不行。Skyliner 走的是京成电铁这家民营铁路，日本铁路周游券不涵盖。持 JR Pass 的人应该坐 N'EX，它是 JR 东日本的列车，用周游券免费。如果你没有 JR Pass，Skyliner 对往东京东侧来说是很强的选项。",
  },
  {
    q: "在东京，机场利木津巴士比电车好吗？",
    a: "看你在意什么。行李很重、想要不换车直达酒店、深夜落地，或住的地方就在巴士站旁边时，巴士胜出。电车（Skyliner 或 N'EX）在速度与可预测性上胜出，尤其在高峰路况下。对大多数行李不多、住在车站旁酒店的旅客来说，电车比较快；对所有拉着大行李箱的人来说，巴士比较轻松。",
  },
  {
    q: "成田与羽田的利木津巴士多少钱？",
    a: "从成田单程约 ¥3,200，按路况约 90～120 分钟。从羽田约 ¥1,200，30～60 分钟——羽田离东京市中心近得多，所以巴士既便宜也更快。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "成田机场到东京交通" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnTokyoAirportTransferPage({ updated }: { updated: PageUpdated }) {
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
            成田机场到东京市区交通（2026）：<br />Skyliner、N&apos;EX 与利木津巴士比较
          </h1>
          <p className={styles.heroSubtitle}>
            从成田或羽田进东京市区其实很简单——前提是你知道哪一个选项符合你的预算与时间。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "成田与羽田", "Skyliner vs N'EX vs 巴士"].map((t) => (
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
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最便宜</p>
                <p className={styles.verdictStatValue}>京成本线（¥1,320）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成田出发最快</p>
                <p className={styles.verdictStatValue}>京成 Skyliner（41 分钟）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>大多数人最适合</p>
                <p className={styles.verdictStatValue}>N&apos;EX 或 Skyliner</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>原则：</strong>持 JR Pass，或要去东京西侧（新宿、涩谷、横滨），坐
              <strong>成田特快 N&apos;EX</strong>。要去上野或东京东侧，坐<strong>京成 Skyliner</strong>。
              从<strong>羽田</strong>出发就坐京急线——快、便宜、好懂。
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>成田机场（NRT）</span>
          <h2 className={styles.sectionTitle}>成田机场的交通选项</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["选项", "时间", "价格", "最适合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {naritaOptions.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            成田机场（NRT）在东京市中心以东约 60～70 公里。上表的电车时间除另有标示外，是到新宿或上野。
            出租车价格变动很大，且已含过路费。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>羽田机场（HND）</span>
          <h2 className={styles.sectionTitle}>羽田机场的交通选项</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["选项", "时间", "价格", "最适合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hanedaOptions.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            羽田机场（HND）距离东京市中心只有 15～20 公里——是全世界离首都最近的大型机场之一。
            大多数旅客都觉得羽田比成田好走得多。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>成田特快</span>
          <h2 className={styles.sectionTitle}>成田特快 N&apos;EX 指南</h2>
          <div className={styles.stepsList}>
            {nexGuidePoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <KlookLink
            href={cnNaritaExpress.url}
            className={styles.pickCta}
            target="_blank"
            rel={KLOOK_REL}
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            在 Klook 订 N&apos;EX 车票 →
          </KlookLink>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>京成 Skyliner</span>
          <h2 className={styles.sectionTitle}>京成 Skyliner 指南</h2>
          <div className={styles.stepsList}>
            {skylinerPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <KlookLink
            href={cnKeiseiSkyliner.url}
            className={styles.pickCta}
            target="_blank"
            rel={KLOOK_REL}
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            在 Klook 订京成 Skyliner →
          </KlookLink>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>正面对决</span>
          <h2 className={styles.sectionTitle}>Skyliner vs N&apos;EX 一览</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "京成 Skyliner", "成田特快 N'EX"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {skylinerVsNexRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td>{row.skyliner}</td>
                      <td>{row.nex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            票价为 2026 年的单程概估值，可能调整。Skyliner 的时间是到日暮里（66 公里）；N&apos;EX 的时间是到东京站。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>按目的地</span>
          <h2 className={styles.sectionTitle}>你的酒店该坐哪一班？</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["目的地", "我们的选择", "原因"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {destinationRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td className={styles.tdPrice}>{row.pick}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>机场巴士</span>
          <h2 className={styles.sectionTitle}>机场利木津巴士</h2>
          <div className={styles.tableWrap} style={{ marginBottom: "1.25rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["机场", "车程", "单程票价", "备注"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {busFareRows.map((row) => (
                    <tr key={row.airport}>
                      <td className={styles.tdProvider}>{row.airport}</td>
                      <td>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.stepsList}>
            {busPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <KlookLink href={cnNaritaLimousineBus.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              成田利木津巴士（Klook）→
            </KlookLink>
            <KlookLink href={cnHanedaLimousineBus.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              羽田利木津巴士（Klook）→
            </KlookLink>
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>小提醒</span>
          <h2 className={styles.sectionTitle}>机场交通的几个要点</h2>
          <div className={styles.stepsList}>
            {transferTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>机场票没涵盖的两件事</span>
          <h2 className={styles.sectionTitle}>下车之后的两个缺口</h2>
          <p className={styles.bodyText}>
            机场票只送你到第一个车站。这两项负责它的前后：
          </p>
          <ul className={styles.bodyList}>
            <li>
              <strong>网络：</strong>站台、巴士乘车处与酒店入住，在你过海关时网络就已经能用的话都会顺很多，
              而不是先去排 SIM 卡柜台。做法请看我们的{" "}
              <Link href="/zh-cn/guides/esim/best-esim-japan">日本eSIM推荐</Link>。
            </li>
            <li>
              <strong>市区交通：</strong>上面任何一张机场票都不涵盖你进城之后的移动；东京地铁通票涵盖，
              东京地铁与都营全线、24、48 或 72 小时。
            </li>
          </ul>
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <KlookLink href={cnKlookEsim.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              查看 {cnKlookEsim.label} →
            </KlookLink>
            <KlookLink href={cnTokyoSubwayTicket.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              查看 {cnTokyoSubwayTicket.label} →
            </KlookLink>
          </div>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/zh-cn/guides/esim/best-esim-japan", title: "日本eSIM推荐（2026）：流量卡方案比较与 Klook 日本 eSIM" },
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京自由行景点（2026）：哪些要先订票、哪些可以现场去" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日游（东京出发·2026）：行程怎么选、五合目看什么" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />
      </div>
    </>
  );
}
