import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  hanedaLimousineBus,
  jigokudaniStayAreas,
  jigokudaniZenkojiPrivateDayTrip,
  jigokudaniZenkojiSukiyakiTour,
  jrEastPass,
  klookEsim,
  naritaExpressRoundTripUrl,
  nozawaSnowMonkeyZenkojiTour,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import {
  snowMonkeySukiyakiTourTokyo,
  snowMonkeysZenkojiSakeNaganoTour,
} from "../../../../lib/klook-links-winter-honshu";
import { seoTags } from "../../../../components/IntlSeo";
import {
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
} from "../../../../components/IntlChrome";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

// Mirrors the English guide (pages/guides/attractions/jigokudani-snow-monkey-tour.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/jigokudani-snow-monkey-tour";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "地狱谷野猿公苑" }];

const CHECKED_ISO = "2026-11-06";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);

const factRows = [
  { item: "12 月 1 日起门票，成人（18 岁以上）", value: "现场 ¥1,000，网上票 ¥880", note: "11 月 30 日前 ¥800。20 人以上团体 ¥840，网上票 ¥740" },
  { item: "12 月 1 日起门票，儿童（小学到高中）", value: "现场 ¥500，网上票 ¥440", note: "11 月 30 日前 ¥400。未满 6 岁由监护人陪同免费；团体 ¥420，网上票 ¥380" },
  { item: "开放时间，11 月至 3 月", value: "9:00–16:00", note: "请在闭园前 30 分钟到达" },
  { item: "开放时间，4 月至 10 月", value: "8:30–17:00", note: "" },
  { item: "休园日", value: "无固定休园日", note: "可能因天气、猴子的行为或自然灾害临时闭园" },
  { item: "网上票", value: "12 月至 4 月优先入园", note: "网上购买并指定日期；12 月 1 日起比现场便宜" },
  { item: "海拔", value: "850 m", note: "冬季最低气温 −10°C，积雪超过 1 米" },
];

const routeRows = [
  {
    leg: "东京 → 长野",
    how: "北陆新干线（Kagayaki、Hakutaka 或 Asama）",
    time: "最快 79 分钟",
    notes: "JR EAST PASS 可乘坐。票价不列于此，请见下方说明",
  },
  {
    leg: "长野 → 汤田中",
    how: "长野电铁特急",
    time: "38 分钟",
    notes: "私铁，JR 周游券不适用",
  },
  {
    leg: "汤田中 → Snow Monkey Park 站",
    how: "公交巴士",
    time: "15 分钟",
    notes: "包含在长电的 SNOW MONKEY PASS（电车版）内",
  },
  {
    leg: "长野 → Snow Monkey Park 站（备选路线）",
    how: "长野站东口的急行巴士",
    time: "41 分钟",
    notes: "代替电车和公交巴士。长电也销售巴士加门票的套票",
  },
  {
    leg: "Snow Monkey Park 站 → 公苑",
    how: "步行，未硬化的步道",
    time: "约 35 分钟",
    notes: "冬季有雪和冰；轮椅和推车无法通行",
  },
  {
    leg: "上林温泉停车场 → 公苑",
    how: "步行，游步道（约 2 公里）",
    time: "约 30 分钟",
    notes: "公苑的免费停车场。大致平坦，部分路段有坡",
  },
  {
    leg: "地狱谷停车场 → 公苑",
    how: "步行",
    time: "约 15 分钟",
    notes: "每车 ¥500，但从涩温泉上来的林道冬季封闭",
  },
];

const compareRows = [
  {
    aspect: "交通方式",
    diy: "坐新干线到长野（最快 79 分钟），再换电车和巴士或急行巴士，最后步行",
    tour: "东京出发的巴士团，或自己坐新干线到长野站参加导览团，换乘都由行程解决",
  },
  {
    aspect: "单程路上时间",
    diy: "不含等车，交通加步行约 2 小时 50 分钟（79 + 38 + 15 + 35 分钟）",
    tour: "一整天都在路上：东京出发的行程往返约 12 到 13 小时，但不用担心错过换乘",
  },
  {
    aspect: "入园",
    diy: "12 月 1 日起现场 ¥1,000，或指定日期的网上票 ¥880，12 月至 4 月网上票优先入园",
    tour: "是否含门票请查看商品页",
  },
  {
    aspect: "同一天去善光寺",
    diy: "可以，但要早点出发：善光寺在长野市区，公苑还要再往里走 41 分钟以上",
    tour: "Klook 上有几款地狱谷一日游已包含善光寺；新宿出发的寿喜烧巴士团不含",
  },
  {
    aspect: "容易出问题的地方",
    diy: "在汤田中或长野错过巴士，以及冬季 16:00 闭园比预想来得更快",
    tour: "下雪时高速公路的天气与拥堵；在公苑的停留时间固定",
  },
  {
    aspect: "适合谁",
    diy: "已持有 JR EAST PASS 的游客，或在涩温泉、汤田中、上林温泉住一晚的游客",
    tour: "从东京当天往返且不在长野过夜的游客、第一次去的游客，以及希望步道上有导游的家庭",
  },
];

const faqItems = [
  {
    q: "地狱谷野猿公苑门票多少钱？",
    a: `根据公苑的票价公告，2026 年 12 月 1 日起现场票成人（18 岁以上）¥1,000、小学到高中儿童 ¥500，网上票为 ¥880 和 ¥440。11 月 30 日前仍是 ¥800 和 ¥400。未满 6 岁由监护人陪同免费，20 人以上团体为 ¥840 和 ¥420（网上票 ¥740 和 ¥380），没有老人优惠，折扣不能叠加。12 月至 4 月，购买当日网上票的游客优先入园。核查日期：${CHECKED}。`,
  },
  {
    q: "地狱谷的开放时间是？",
    a: `根据公苑官网，11 月至 3 月为 9:00 到 16:00，4 月至 10 月为 8:30 到 17:00。没有固定休园日，但公苑表示可能因天气、猴子的行为或自然灾害临时闭园，并请游客在闭园前至少 30 分钟到达，以便按时离开。核查日期：${CHECKED}。`,
  },
  {
    q: "可以从东京当天往返看雪猴吗？",
    a: "可以，但会是很长的一天。根据公苑的交通信息，东京到长野坐北陆新干线最快 79 分钟，换长野电铁特急到汤田中 38 分钟，再坐 15 分钟巴士到 Snow Monkey Park 站，然后步行约 35 分钟。不算等车，单程就接近三小时，而公苑冬季 16:00 闭园。请一早从东京出发，或者把换乘交给行程。",
  },
  {
    q: "走到雪猴那里要多久？",
    a: "从 Snow Monkey Park 巴士站约 35 分钟，从上林温泉的免费停车场约 30 分钟（游步道约 2 公里），从收费的地狱谷停车场约 15 分钟，但冬季从涩温泉上来的林道封闭，无法使用这个停车场。步道未硬化，有坡道和台阶，轮椅和推车无法通行。",
  },
  {
    q: "什么时候看雪猴最好？",
    a: "想看泡温泉就选 12 月到 3 月。公苑表示猴子主要在这段时间泡温泉取暖，天气暖和时不太愿意下水。海拔 850 米的冬天最低气温可到 −10°C、积雪超过一米，正是多数游客想看的画面。猴子是野生的，公苑每周会发布出现概率预报，出发前请先确认。",
  },
  {
    q: "冬天去地狱谷穿什么？",
    a: "雪地靴，有的话再加简易冰爪。公苑的建议是冬季穿靴子或雪地靴，夏季穿运动鞋或登山鞋，并用简易冰爪（套在鞋上的轻便防滑钉）在压实的雪和冰上走得更安全。请按 −10°C 而不是东京的气温来穿，并空出双手走台阶。",
  },
  {
    q: "雪猴一日游值得吗？",
    a: "从东京当天往返，通常值得。电车路线有四段加步行，其中两段是班次有限的小型运营商，冬季又是 16:00 闭园，错过一班车损失的不只是时间，而是看不到猴子。有些行程还包含自己很难排进同一天的善光寺。如果在涩温泉、汤田中或上林温泉住一晚，或已有 JR EAST PASS，自己去既简单又便宜。",
  },
  {
    q: "雪猴可以和涩温泉或善光寺一起玩吗？",
    a: "可以，两者都顺路。涩温泉是公苑下方的温泉街，住一晚时最适合顺便去。善光寺在换车的长野市区，Klook 上有几款地狱谷一日游把它和公苑排在一起。自己从东京当天往返时，善光寺最适合放在回程的下午，但前提是你在冬季 16:00 闭园之前早早离开公苑。",
  },
  {
    q: "地狱谷门票需要提前预订吗？",
    a: "不是必须，但冬季值得先买。公苑销售指定日期的网上票，12 月至 4 月持票者优先入园，而且 2026 年 12 月 1 日起只要 ¥880，现场是 ¥1,000，所以旺季时网上票既能少排队又更便宜。跟团行程每天有名额上限，日期确定就订，并查看商品页关于雪天的取消条款。",
  },
  {
    q: "可以带小孩、婴儿车或狗去地狱谷吗？",
    a: "小孩可以，婴儿车和狗不行。未满 6 岁由监护人陪同免费，但步道未硬化、有坡道和台阶，公苑表示轮椅和推车无法使用，小孩请抱着走。狗和猫不得入园，导盲犬等辅助犬也一样，因为狗是猴子的天敌。",
  },
  {
    q: "野猿公苑有哪些规定？",
    a: "不要喂食、触摸或盯着猴子看。公苑的注意事项说，带食物会让猴子抢包、抱住腿，近距离盯着猴子的眼睛是敌意的表现，幼猴靠近时要走开。拍照甚至用闪光灯都没问题，但禁止无人机和自拍杆，相机也不能靠近猴子或伸进浴池。",
  },
  {
    q: "JR Pass 或 JR EAST PASS 能到雪猴那里吗？",
    a: "只到长野。JR EAST PASS（5 天 ¥35,000，10 天 ¥50,000）覆盖东京到长野的北陆新干线。长野以后的长野电铁和巴士都是民营，需要另外付费，或购买长电的 SNOW MONKEY PASS，内含铁路、汤田中巴士和公苑门票。",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const sameTripItems: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "当日网上票、汤田中与长野的巴士时刻和公苑的猴子预报都在手机上，而且公苑可能因天气临时闭园。",
  },
  {
    label: "成田特快（N'EX）往返票",
    ctaLabel: "查看 N'EX 往返票 →",
    url: klookFor(naritaExpressRoundTripUrl, LOCALE),
    why: "它到达东京站，也就是北陆新干线前往长野的出发站，从成田入境的游客可以住在第一班北上列车附近。",
  },
  {
    label: "羽田机场 – 东京利木津巴士",
    ctaLabel: "查看利木津巴士 →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "羽田入境的版本，停靠站包含新宿。如果你要坐新宿出发的巴士团，这一点很重要，因为它一早就从车站西侧出发。",
  },
  {
    label: "JR EAST PASS（连续 5 天或 10 天）",
    ctaLabel: "查看 JR EAST PASS →",
    url: klookFor(jrEastPass.url, LOCALE),
    why: "覆盖到长野的新干线，不含之后的私铁和巴士。同样的 5 天或 10 天内有多趟长途移动时才划算。",
  },
];

const TITLE = "地狱谷野猿公苑（2027）：东京出发一日游与交通";
const DESC =
  "地狱谷野猿公苑 12 月 1 日起门票 ¥1,000（网上 ¥880），冬季 9:00–16:00，新干线到长野 79 分钟，再走雪路 35 分钟。";

export default function JigokudaniSnowMonkeyTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG[LOCALE] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

            <Breadcrumb trail={trail} />

            <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
更新于 {monthLabel(updated.iso, LOCALE)}
</p>
          <h1 className={styles.heroTitle}>
东京出发看雪猴（2027）：<br />地狱谷门票、时间、步行与跟团或自助比较
</h1>
          <p className={styles.heroSubtitle}>
日本会泡温泉的猴子住在长野上方的山谷，下了新干线还要坐电车、巴士，再走一段雪路。这里整理费用、时间，以及什么情况跟团更好。
</p>
          <div className={styles.heroBadges}>
            {[`更新于 ${monthLabel(updated.iso, LOCALE)}`, "官方票价与时间，附核查日期", "跟团或自助比较"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
                <Disclosure />

        <WinterBookingTop
          heading={"今年冬天可以预订哪些东京出发的雪猴行程？"}
          checkedIso="2026-11-06"
          deadline={
            <>
圣诞和新年期间请在 11 月 30 日前预订，1、2 月至少提前三周。泡温泉主要在 12 月到 3 月，所有行程日期都集中在这段短短的季节里。自己去的话，日期一确定就买指定日期的网上票：12 月至 4 月持票者优先入园，12 月 1 日起 ¥880，现场 ¥1,000。
</>
          }
          tours={[
            {
              title: "东京出发雪猴一日游（牛肉寿喜烧午餐）",
              url: klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE),
              price: "约 US$128 起",
              duration: "12 小时（08:00–20:00）",
              departs: "东京新宿",
            },
            {
              title: "地狱谷野猿公苑与善光寺一日游（牛肉寿喜烧午餐）",
              url: klookFor(jigokudaniZenkojiSukiyakiTour.url, LOCALE),
              price: null,
              duration: "约 13 小时 10 分钟",
              departs: "东京",
            },
            {
              title: "地狱谷野猿公苑与善光寺包车一日游",
              url: klookFor(jigokudaniZenkojiPrivateDayTrip.url, LOCALE),
              price: null,
              duration: "10 小时",
              departs: "你在东京的酒店",
            },
          ]}
        />

                <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>
快速解答
</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
12 月 1 日起门票
</p>
                <p className={styles.verdictStatValue}>
成人 ¥1,000（网上 ¥880）
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
冬季时间（11–3 月）
</p>
                <p className={styles.verdictStatValue}>9:00–16:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
东京 → 长野
</p>
                <p className={styles.verdictStatValue}>
最快 79 分钟
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
步行到雪猴
</p>
                <p className={styles.verdictStatValue}>
30–35 分钟，冬季有雪
</p>
              </div>
            </div>
            <p className={styles.verdictText}>
<strong>要点：</strong>地狱谷野猿公苑（Snow Monkey Park）2026 年 12 月 1 日起现场票成人 ¥1,000、儿童 ¥500，网上票 ¥880 和 ¥440（11 月 30 日前 ¥800 和 ¥400），11 月至 3 月开放 9:00–16:00（4 月至 10 月 8:30–17:00）。从东京坐北陆新干线到长野最快 79 分钟，换长野电铁到汤田中 38 分钟，再坐 15 分钟巴士（或从长野坐 41 分钟急行巴士），最后走约 35 分钟冬季满是冰雪的未硬化步道。雪猴一日游会解决所有换乘，也常包含善光寺；自己去更便宜，但单程接近三小时。所有数字均出自公苑官网，核查日期：{CHECKED}。
</p>
            <KlookLink
              href={klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
在 Klook 查看雪猴行程 →
</KlookLink>
          </div>
        </div>

                <KlookTripPrep
          label={"同一趟旅行要订的"}
          heading={"看雪猴还需要准备什么？"}
          intro={"去地狱谷要靠三件事：查巴士和门票的流量、从机场进市区的交通，以及覆盖新干线段的周游券。"}
          items={sameTripItems}
        />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
概况
</span>
          <h2 className={styles.sectionTitle}>
地狱谷野猿公苑是什么地方？
</h2>
          <p className={styles.bodyText}>
地狱谷野猿公苑是长野县北部山之内町上方横汤川山谷里的野生猴子公园，1964 年开园，位于海拔 850 米，最著名的就是日本猕猴在飘雪中泡温泉的画面。公苑介绍冬季最低可到 −10°C、积雪超过一米，猴子泡温泉是为了取暖，主要在 12 月到 3 月。
</p>
          <p className={styles.bodyText}>
猴子是野生的，来去自由。公苑每周发布出现概率预报，也提醒有些日子它们可能完全不下山，所以从东京花一整天过来之前请先确认。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
票价与时间
</span>
          <h2 className={styles.sectionTitle}>
门票多少钱，什么时候开放？
</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "官方数字", "备注"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
票价出自公苑 2026 年 9 月 20 日的票价调整公告；开放时间与休园出自时间与票价页（已确认 12 月 1 日调整，但表格仍是旧价）；网上票优先入园出自首页；海拔与气候出自英文介绍页。票价、时间与优先入园于 {CHECKED} 在 jigokudani-yaenkoen.co.jp 核查。网上票在公苑的网上售票页销售，长电也销售巴士加门票的版本。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
交通方式
</span>
          <h2 className={styles.sectionTitle}>
从东京怎么去看雪猴？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
四段交通加一段步行。第一段很快，后三段才决定这一天的成败。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["路段", "方式", "时间", "须知"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.how}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
时间出自公苑交通页（{CHECKED} 核查）；票券内容出自长野电铁的 Snow Monkey 页面（2026 年 11 月 3 日核查）。<strong>关于票价：</strong>这里不列新干线、长电电车和巴士的日元票价。JR 东日本官网没有返回可读取的票价页，长电的票价表只有我们无法读取的 PDF，第三方对 2026-27 急行巴士的数字又互相不一致，请在车站或运营商官网确认。<Link href="/guides/transport/jr-east-pass" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>JR 东日本周游券攻略（英文）</Link>算出了周游券什么时候比单买到长野划算。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jrEastPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
在 Klook 查看 JR EAST PASS →
</KlookLink>
            <KlookLink href={klookFor(snowMonkeysZenkojiSakeNaganoTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
长野站出发导览团 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
步行
</span>
          <h2 className={styles.sectionTitle}>
走到雪猴那里要多久？
</h2>
          <p className={styles.bodyText}>
<strong>冬季不管走哪条路，都约 30 到 35 分钟。</strong>公苑表示从 Snow Monkey Park 巴士站约 35 分钟；从上林温泉免费停车场沿约 2 公里的游步道约 30 分钟，路况大致平坦、部分有坡。最短的路线是从收费的地狱谷停车场（¥500）走约 15 分钟，但只有夏季能用：从涩温泉上来的林道冬季封闭，而且任何季节都太窄，大型车无法通行。
</p>
          <p className={styles.bodyText}>
步道未硬化，有坡道和台阶，公苑表示轮椅和推车无法使用。冬季路面是压实的雪，部分路段结冰。往返步行请预留一小时，再加上观赏时间，并在冬季 16:00 闭园前至少 30 分钟到达入口。
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
穿着
</span>
          <h2 className={styles.sectionTitle}>
冬天看雪猴穿什么？
</h2>
          <p className={styles.bodyText}>
<strong>雪地靴，最好再加简易冰爪。</strong>公苑建议冬季穿靴子或雪地靴（其他季节穿运动鞋或登山鞋），并提前买好简易冰爪（套在鞋上的轻便防滑钉）以保安全。请按山谷的气温而不是东京来穿，公苑提到冬季最低 −10°C。能用手机的手套、帽子和能关严的包也不可少。
</p>
          <p className={styles.bodyText}>
入园后的规定不多，但公苑执行得很严格：不喂食、不触摸、不近距离盯着眼睛（这是敌意的表现），幼猴靠近时要走开。拍照和闪光灯都可以，但禁止无人机和自拍杆，相机也不能伸向猴子或浴池。狗和猫不得入园，辅助犬也一样。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
比较
</span>
          <h2 className={styles.sectionTitle}>
雪猴行程值得跟团，还是自己去？
</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "自助前往", "雪猴一日游"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.aspect}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.aspect}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.diy}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.tour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
判断方法：<strong>从东京当天往返、不在长野过夜，就跟团。</strong>四段交通、两家小型运营商加上 16:00 闭园，错过一班巴士的余地很小。<strong>在涩温泉、汤田中或上林温泉住一晚，或已有 JR EAST PASS，就自己去。</strong>住得近，步行就成了一日游游客到达前的晨间散步。
</p>
          <p className={styles.bodyText}>
<strong>何时预订：</strong>跟团行程每天有名额上限，泡温泉的季节只有四个月，日期一确定就订，假期周优先。付款前请查看商品页的取消条款，高速公路下雪是冬季行程最常变动的原因。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jigokudaniZenkojiSukiyakiTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
雪猴 + 善光寺一日游 →
</KlookLink>
            <KlookLink href={klookFor(jigokudaniZenkojiPrivateDayTrip.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
自家人的包车一日游 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
季节
</span>
          <h2 className={styles.sectionTitle}>
什么时候看雪猴最好？
</h2>
          <p className={styles.bodyText}>
<strong>12 月到 3 月的寒冷日子。</strong>公苑表示猴子在这段时间泡温泉，最冷、雪最多的日子最常见。这也是公苑让网上票持有者优先入园的时期（12 月至 4 月），由此可知什么时候人多。请早点去：冬季 16:00 关门，上午到达才有余地坐晚一点的巴士。
</p>
          <p className={styles.bodyText}>
冬季以外开放时间更长（4 月至 10 月 8:30–17:00），猴子也都在，但公苑表示温暖的月份它们不太愿意泡温泉，所以不太看得到泡温泉的画面。如果是为了这张照片而去，11 月和 4 月要碰运气，夏天则不合适。
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
顺路玩
</span>
          <h2 className={styles.sectionTitle}>
雪猴可以和涩温泉或善光寺一起玩吗？
</h2>
          <p className={styles.bodyText}>
<strong>善光寺</strong>在长野市区，也就是所有前往公苑路线的换车点，Klook 上有几款地狱谷行程会加上它。自己去的话，请放在回程，而且前提是你及早离开公苑；不要放在去程，因为去程要紧的是公苑的闭园时间。
</p>
          <p className={styles.bodyText}>
<strong>涩温泉</strong>是公苑下方的老旅馆街，<strong>上林温泉</strong>就在步道起点。两者都不算一日游的顺路点，而是值得住一晚的理由。如果你在野泽温泉滑雪，Klook 也有冬季限定行程，从那里带你看雪猴和善光寺。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nozawaSnowMonkeyZenkojiTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
从野泽温泉出发 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
冬季行程的其他部分
</span>
          <h2 className={styles.sectionTitle}>
冬季旅行中，雪猴可以和什么搭配？
</h2>
          <p className={styles.bodyText}>
地狱谷最适合排进较长的路线，而不是单独成行，我们的<Link href="/guides/attractions/japan-winter-itinerary" hrefLang="en">日本冬季行程（英文）</Link>列出了 12 天的版本。以东京为据点时，最搭的是<Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">GALA 汤泽滑雪一日游（英文）</Link>：JR EAST PASS 两者都覆盖，两个长途日可以共用一张票。回到东京的晚上可以留给<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">东京灯饰（英文）</Link>，比起 12 小时的行程轻松得多。送你到长野的北陆新干线继续开往金泽，那里是<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山与白川乡行程（英文）</Link>常见的出发点；1 月的行程请先确定点灯日，再排雪猴。
</p>
          <p className={styles.bodyText}>
再往北就是另一趟旅行，如果目的是雪，这是不错的替代方案。滑雪的游客可以把这座山谷和<Link href="/zh-cn/guides/attractions/niseko-ski-tours">二世谷滑雪行程</Link>比较一下。2 月的<Link href="/zh-cn/guides/attractions/sapporo-snow-festival-tours">札幌雪祭行程</Link>绑定 2027 年 2 月 4–11 日，雪猴要排在前后。从札幌出发，<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">小樽一日游（英文）</Link>是最容易加上的行程，<Link href="/guides/attractions/hokkaido-7-day-itinerary" hrefLang="en">北海道 7 日游（英文）</Link>则呈现完整一周的安排。
</p>
        </section>

        <KlookStayAreas
          heading={"看雪猴住哪里？"}
          intro={"在公苑附近住一晚，三小时的路程就变成晨间散步。以下四个据点从步道起点到长野站，都附 Klook 酒店链接。"}
          areas={jigokudaniStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "步道起点的温泉乡：公苑的免费停车场和 2 公里游步道都从这里开始，你可以在一日游人潮到达前就上路。", area: "上林温泉（上林酒店仙寿阁）" }, { why: "公苑下方的老旅馆街，适合看完猴子、坐车回长野前住一晚。", area: "涩温泉（和风の宿 MASUYA）" }, { why: "长野电铁的终点，往 Snow Monkey Park 站的 15 分钟公交巴士从这里出发。", area: "汤田中（Hotel Tsubakino）" }, { why: "保留所有选项的据点：东京来的新干线、往汤田中的长电、往公苑的急行巴士和善光寺都从这里开始。", area: "长野站" }] as Partial<typeof item>[])[i]))}
        />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
出发前
</span>
          <h2 className={styles.sectionTitle}>
看雪猴需要移动数据吗？
</h2>
          <p className={styles.bodyText}>
需要，这趟比多数行程更需要。网上票、汤田中与长野的巴士时刻和公苑的猴子预报都在手机上，而步道和巴士站没有酒店 Wi-Fi。<KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>查看 Klook eSIM →</KlookLink> 或到<Link href="/zh-cn/guides/esim/best-esim-japan">日本流量卡推荐攻略</Link>比较各家运营商。
</p>
        </section>

                <FaqList items={faqItems} />

        <KlookTourPicks
          heading={"Klook 上的雪猴行程"}
          intro={"两款东京出发的一日游、一款长野站出发导览团、一款包车一日游，以及从野泽温泉出发的雪季行程。请打开商品页查看你的日期的价格、内容、导览语言和取消条款。"}
          tours={[withKlookLocale(snowMonkeySukiyakiTourTokyo, LOCALE, { title: "东京出发雪猴一日游（牛肉寿喜烧午餐）", desc: "从新宿出发的 12 小时巴士行程，含公苑门票和牛肉寿喜烧午餐。镰仓之里雪屋行程只在约 1 月下旬到 2 月下旬进行" }), withKlookLocale(jigokudaniZenkojiSukiyakiTour, LOCALE, { title: "地狱谷野猿公苑与善光寺一日游（牛肉寿喜烧午餐）", desc: "结合雪猴公苑与长野国宝善光寺的导览一日游，含牛肉寿喜烧午餐" }), withKlookLocale(snowMonkeysZenkojiSakeNaganoTour, LOCALE, { title: "长野雪猴、善光寺与清酒一日游", desc: "从长野站出发的导览团，适合持 JR 周游券坐新干线上来的游客：不用换私铁和巴士就能看雪猴、善光寺并参观酒造" }), withKlookLocale(jigokudaniZenkojiPrivateDayTrip, LOCALE, { title: "地狱谷野猿公苑与善光寺包车一日游", desc: "同样两个景点改由专车接送，适合家庭或想自己掌握步道节奏的游客" }), withKlookLocale(nozawaSnowMonkeyZenkojiTour, LOCALE, { title: "野泽温泉出发的冬季行程：雪猴、善光寺与清酒试饮", desc: "从野泽温泉出发的冬季限定一日游，适合已在长野滑雪的游客，顺路参观善光寺并品酒" })]}
        />

                <Related items={[{ href: "/guides/attractions/japan-winter-itinerary", title: "日本冬季行程 （英文）" }, { href: "/guides/transport/jr-east-pass", title: "JR East Pass（2026）：价格、范围与是否划算 （英文）" }, { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "东京出发 GALA 汤泽滑雪一日游 （英文）" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山与白川乡行程（2027）：该从哪里出发 （英文）" }, { href: "/zh-cn/guides/attractions/niseko-ski-tours", title: "二世谷滑雪（2027）：接送、教练课与四大区域" }, { href: "/zh-cn/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭行程（2027）" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出发小樽一日游（2027） （英文）" }, { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 日游：每日路线 （英文）" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "东京灯饰：日期、时间与免费景点 （英文）" }, { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "东京出发轻井泽一日游 （英文）" }, { href: "/guides/transport/tokyo-to-kanazawa", title: "东京到金泽（2026） （英文）" }, { href: "/guides/attractions/japan-14-day-itinerary", title: "日本 14 天行程（2026） （英文）" }, { href: "/guides/attractions/japan-10-day-itinerary", title: "日本 10 天行程（2026） （英文）" }, { href: "/zh-cn/guides/esim/best-esim-japan", title: "日本 eSIM 推荐（2026）" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
趁名额还在，先订好冬季日期
</h2>
            <p className={styles.ctaBannerDesc}>
雪猴行程每天有名额上限，泡温泉的季节只有 12 月到 3 月。选好日期，确认商品页的内容，电车、巴士和步道都交给导游。Klook 可使用海外信用卡付款。
</p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
在 Klook 查看雪猴行程 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
