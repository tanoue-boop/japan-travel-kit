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
import { cnShibuyaSky } from "../../../../lib/klook-links-zh-cn";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhDateLabel, zhMonthLabel, zhPrice } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions/shibuya-sky-tickets";
const TITLE = "涩谷SKY 门票（2026）：票价、最佳时段与预约方式";
const DESC =
  "涩谷SKY 门票 2026：官方票价（网上预订成人 ¥2,500、现场 ¥3,000）、哪个时段最值得去（日落场次最快售罄）、" +
  "以及海外信用卡刷不过时怎么订。票价与英文版同一组数据、同一个核查日期。";

// Every figure on this page comes from lib/attraction-prices.ts — the same record
// the English guide, the 繁體中文 page and the ticket price table read. Nothing is
// re-checked for this edition and nothing new is added: same numbers, same source,
// same date.
const P = PRICES.shibuyaSky;
const CHECKED = zhDateLabel(P.checked);
// zhPrice moves the English qualifier in these records ("from …", "Free") into
// Chinese without touching the figure — see lib/i18n.ts.
const ADULT = zhPrice(P.adult, "zh-cn");
const AT_DOOR = zhPrice(P.atDoor, "zh-cn");

const priceRows = [
  { ticket: "成人（网上预订）", price: ADULT },
  { ticket: "成人（现场购票）", price: AT_DOOR },
  { ticket: "儿童（未满5岁）", price: zhPrice(P.child, "zh-cn") },
];

const deckRows = [
  {
    deck: "涩谷SKY（SHIBUYA SKY）",
    height: "约 229 米（屋顶）",
    highlight: "涩谷十字路口正上方的开放式屋顶，东京最有代表性的一张照片",
    price: "约 ¥2,500 起（成人网上预订）",
    area: "涩谷站",
  },
  {
    deck: "东京晴空塔",
    height: "350 米与 450 米观景台（塔高 634 米）",
    highlight: "全市最高的视野、玻璃地板区；天气好时看得到富士山",
    price: "约 ¥1,800（350 米）；套票约 ¥3,100",
    area: "押上，浅草旁",
  },
  {
    deck: "东京铁塔",
    height: "约 150 米与 250 米观景台（塔高 332 米）",
    highlight: "1958 年的复古地标；要上更高一层得买 Top Deck Tour",
    price: "约 ¥3,300（Top Deck Tour）",
    area: "芝公园／赤羽桥",
  },
  {
    deck: "东京都厅观景室",
    height: "约 202 米",
    highlight: "免费入场，不用门票就有完整的城市景观",
    price: "免费",
    area: "新宿",
  },
];

const whoFor = [
  {
    title: "想拍日落就选这个时段",
    desc: "日落场次是最美也最抢手的，通常最先售罄。建议挑日落前 30～60 分钟入场，一次看完白天、黄金时刻与城市亮灯。",
  },
  {
    title: "行程不确定就选白天",
    desc: "白天场次比较好订，常常临近日期还有名额，天气晴朗时甚至能看到富士山。如果行程还会变动，这是最灵活的选择。",
  },
  {
    title: "只想看夜景就选晚上",
    desc: "夜间场看的是整片霓虹灯海，看不到地平线。这也是最容易临时订到的时段，日落场售罄时的备选。",
  },
];

const steps = [
  {
    title: "先决定时段，日落是重点",
    desc: "日落场一次给你白天、黄金时刻与夜景，所以也最先消失。要日落场，就把订票当成有时效的事来处理。",
  },
  {
    title: "约两周前、日本时间午夜开售",
    desc: "门票大约在入场日两周前放出，新日期通常在日本时间 00:00 开售。想抢日落场，就在你的日期一开售时登录下单。",
  },
  {
    title: "持海外信用卡建议走售票平台",
    desc: "自 2024 年 7 月起，涩谷SKY 官网对许多海外发行的信用卡刷不过。Klook 可以用海外卡结账、界面看得懂，并提供入场前 24 小时内免费取消——东京天气说变就变，这点很有用。",
  },
  {
    title: "日落场请提前 30～60 分钟到",
    desc: "留时间过入口、把随身物品寄进储物柜（屋顶是开放式的，风很大），在光线转变前先站好位置。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "涩谷SKY 门票多少钱？",
    a: `网上预订成人票 ${ADULT}，当天在现场窗口购买 ${AT_DOOR}。未满 5 岁免费入场，另有儿童与敬老的优惠票种。网上买不只比较便宜，也比较稳妥——热门时段（尤其是日落场）当天就没票了。以上票价读自涩谷SKY 官方网站，核查日期 ${CHECKED}。`,
  },
  {
    q: "涩谷SKY 什么时候去最好？",
    a: "日落场最热门也最美——一次看到白天、黄金时刻与夜景。也正因为如此，日落场是最快售罄的。建议在日落前 30～60 分钟入场。日落场没票的话，晴朗的白天场看得到富士山，夜间场看的是整片灯海，而且最容易临时订到。",
  },
  {
    q: "涩谷SKY 要多久前订票？",
    a: "门票通常在入场日约两周前放出，新日期大约在日本时间 00:00（午夜）开售。日落场请在你的日期一开售就下单——旺季时几分钟内就会售罄。白天与夜间场比较从容，但还是建议提前订。",
  },
  {
    q: "可以用海外信用卡买涩谷SKY 门票吗？",
    a: "在涩谷SKY 官网上，常常不行——自 2024 年 7 月起，官网对许多海外发行的信用卡刷不过。可靠的做法是通过 Klook 这类售票平台预订：可以用海外卡结账、拿到电子票，并且入场前 24 小时内可免费取消。",
  },
  {
    q: "涩谷SKY 有多高？会看到什么？",
    a: "涩谷SKY 是位于涩谷上方约 229 米的屋顶观景台，分为开放式屋顶与室内区域。从上面可以 360 度看到涩谷十字路口、东京天际线，天气清朗时还能看到富士山。重点是那个开放式屋顶，所以请穿挡风的衣服，出发前先看天气。",
  },
  {
    q: "涩谷SKY 和晴空塔该选哪一个？",
    a: "涩谷SKY 卖的是体验与照片：涩谷十字路口正上方约 229 米的开放式屋顶，日落时最美，是全市最有辨识度的一个视角。东京晴空塔卖的是高度与视距：350 米与 450 米两层观景台、玻璃地板区，天气好时看得很远，包括富士山。想拍十字路口与氛围选涩谷SKY；想要最高最广的全景选晴空塔。",
  },
  {
    q: "东京有免费的观景台吗？",
    a: "有。新宿的东京都厅在约 202 米处设有观景室，免费入场。这是东京最值得的免费城市景观，如果你想把预算留给涩谷SKY 或其他体验，是个聪明的选择。开放时间与开放的观景室会变动，去之前请先确认。",
  },
  {
    q: "从涩谷SKY 看得到富士山吗？",
    a: "天气清朗时看得到——空气通透的日子从涩谷SKY 可以看见富士山，不过机会最高的还是高度更高的东京晴空塔。能见度看天气，通常在较凉、较干燥的月份与清晨最好，任何一天都不保证。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "涩谷SKY 门票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnShibuyaSkyTicketsPage({ updated }: { updated: PageUpdated }) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            涩谷SKY 门票（2026）：<br />票价、最佳时段与预约方式
          </h1>
          <p className={styles.heroSubtitle}>
            东京最好的屋顶视角——涩谷十字路口上方 229 米。门票多少钱、什么时候去、
            以及怎么在日落场售罄之前订到。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "日落场抢票要点", "与晴空塔、东京铁塔比较"].map((t) => (
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
                <p className={styles.verdictStatLabel}>票价（网上）</p>
                <p className={styles.verdictStatValue}>成人 {ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最佳时段</p>
                <p className={styles.verdictStatValue}>日落场（最快售罄）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>何时订</p>
                <p className={styles.verdictStatValue}>约两周前、日本时间午夜</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>海外信用卡？</p>
                <p className={styles.verdictStatValue}>建议走售票平台</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>网上买（{ADULT}，比现场便宜）并尽量挑日落场——那是最先售罄的时段。
              如果你的卡是海外发行的，走 Klook 比较稳：可以用海外卡结账，入场前 24 小时内还能免费取消。
            </p>
            <KlookLink href={cnShibuyaSky.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看涩谷SKY 门票 →
            </KlookLink>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>这是什么</span>
          <h2 className={styles.sectionTitle}>涩谷SKY 是什么？</h2>
          <p className={styles.bodyText}>
            涩谷SKY 是涩谷 Scramble Square 顶楼的观景台，位于全世界最繁忙的路口之一上方约 229 米处。
            它由开放式屋顶与室内区域组成，可以 360 度看到涩谷十字路口、东京天际线，天气好的日子还有富士山。
          </p>
          <p className={styles.bodyText}>
            它已经是东京最常被拍的地点之一——这既是它的卖点，也是它的麻烦：好时段会售罄，而订票系统对海外旅客
            有几个小陷阱。把这两件事处理好，它就是东京最划算的体验之一。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>涩谷SKY 门票价格</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票种", "价格"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            以上票价读自涩谷SKY 官方网站，核查日期 {CHECKED}；票价可能调整，结账前请再确认。
            网上预订（{ADULT}）既比现场（{AT_DOOR}）便宜，也是唯一能确保日落场的方式。同样的官方票价，连同我们核查过的
            其他日本景点，都整理在{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景点门票价格总表（英文）
            </Link>
            ，每一行都附上核查日期。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>最佳时段</span>
          <h2 className={styles.sectionTitle}>该挑哪个时段？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比较</span>
          <h2 className={styles.sectionTitle}>涩谷SKY 与东京其他观景台</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            涩谷SKY 赢在那张十字路口的照片，但它不是东京最高的观景台，也不是最便宜的。四个主要选项如下：
            要高度与富士山视野选晴空塔，要复古地标选东京铁塔，想免费看全景选东京都厅。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["观景台", "高度", "特色", "票价（约）", "区域／最近车站"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            高度与票价为 2026 年的概估值，可能调整，结账前请再确认。晴空塔的部分：350 米天望甲板约 ¥1,800，
            加购 450 米天望回廊约再 ¥1,400，套票约 ¥3,100。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>涩谷SKY 怎么订</h2>
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

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 门票（2026）：票价、预约方式与无界比较" },
            { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", title: "teamLab 无界 门票（2026）：票价、时段预约与购票渠道" },
            { href: "/zh-cn/guides/attractions/tokyo-disney-tickets", title: "东京迪士尼门票（2026）：乐园与海洋怎么买、怎么选" },
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京自由行景点（2026）：哪些要先订票、哪些可以现场去" },
            { href: "/zh-cn/guides/transport/tokyo-airport-transfer", title: "成田机场到东京市区交通（2026）：Skyliner、N'EX 与利木津巴士比较" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>抢下涩谷的日落</h2>
            <p className={styles.ctaBannerDesc}>
              网上买比现场便宜，也是锁住日落场的唯一方式。Klook 可以用海外信用卡结账，入场前 24 小时内免费取消——
              东京天气变了也不心疼。
            </p>
            <KlookLink href={cnShibuyaSky.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看涩谷SKY 门票 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
