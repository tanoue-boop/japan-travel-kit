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
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import { cnSkytreeTicket, cnTokyoSubwayTicket } from "../../../../lib/klook-links-zh-cn";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhDateLabel, zhMonthLabel, zhPrice } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions/tokyo-skytree-tickets";
const TITLE = "东京晴空塔门票（2026）：票价与楼层选择";
const DESC =
  "东京晴空塔门票 2026：350 楼展望台 ¥1,800 起、350＋450 套票 ¥3,000 起，当天购票每张多 ¥500。";

// All figures come from lib/attraction-prices.ts and the English guide that read
// them off tokyo-skytree.jp. Nothing was re-checked or added for this edition.
const P = PRICES.tokyoSkytree;
const CHECKED = zhDateLabel(P.checked);
// "from ¥1,800" -> "¥1,800 起": same figure, Chinese qualifier. See lib/i18n.ts.
const ADULT = zhPrice(P.adult, "zh-cn");
const CHILD = zhPrice(P.child, "zh-cn");

const priceRows = [
  { ticket: "350 楼 — 成人（15 岁以上）", advance: ADULT, sameDay: "另加服务费 ¥500" },
  { ticket: "350 楼 — 儿童（6～14 岁）", advance: CHILD, sameDay: "另加服务费 ¥500" },
  { ticket: "350＋450 楼套票 — 成人", advance: "¥3,000 起", sameDay: "另加服务费 ¥500" },
  { ticket: "350＋450 楼套票 — 儿童", advance: "¥1,500 起", sameDay: "另加服务费 ¥500" },
  { ticket: "现场加购 450 楼 — 成人", advance: "线上不销售", sameDay: "¥1,400" },
  { ticket: "现场加购 450 楼 — 儿童", advance: "线上不销售", sameDay: "¥700" },
  { ticket: "5 岁以下", advance: "免费", sameDay: "免费" },
];

const deckRows = [
  {
    deck: "东京晴空塔",
    height: "350 楼与 450 楼",
    price: `350 楼 ${ADULT}・套票 ¥3,000 起`,
    highlight: "东京最高的观景台，也是唯一的玻璃空中回廊",
    area: "押上／东京晴空塔站",
  },
  {
    deck: "涩谷SKY",
    height: "约 229 米屋顶",
    price: "线上预购 ¥2,500",
    highlight: "直接在涩谷十字路口上方的露天屋顶——重点是照片，不是高度",
    area: "涩谷站",
  },
  {
    deck: "东京铁塔",
    height: "约 150 与约 250 米两层",
    price: "约 ¥3,300（Top Deck Tour）",
    highlight: "1958 年的地标，而且视野里看得到晴空塔",
    area: "芝公园／赤羽桥",
  },
  {
    deck: "东京都厅展望室",
    height: "约 202 米",
    price: "免费",
    highlight: "完全不用票——东京最划算的城市全景",
    area: "新宿",
  },
];

const whoFor = [
  {
    title: "只买 350 楼就够了，如果…",
    desc: `你要的是视野，不是加购。350 楼是三层楼的主观景台，光是这里就已经看得到整片关东平原。成人 ${ADULT}，按每米高度换算，是东京主要收费观景台里最便宜的一个。`,
  },
  {
    title: "加买 450 楼，如果…",
    desc: "高度本身就是这趟的目的。450 楼是 Tembo Galleria，一条斜斜往上绕的玻璃空中回廊，通到塔内可抵达的最高点。线上套票 ¥3,000 起；当天在 350 楼票上加购，要再付 ¥1,400。",
  },
  {
    title: "选晚一点的时段，如果…",
    desc: `你更想要夜景而不是地平线。官方网站核查日 ${CHECKED} 时，观景台营业到 22:00，最后入场 21:00。白天时段卖完之后，还有名额的通常就是晚场。`,
  },
];

const steps = [
  {
    title: "订票前先决定只买 350 楼还是买套票",
    desc: "450 楼用线上套票买（成人 ¥3,000 起）比当天在 350 楼票上加购（多 ¥1,400）便宜。只要你有一点可能想上空中回廊，就一开始买套票。",
  },
  {
    title: "线上订指定日期的票",
    desc: `官方网站以上面的「起」价销售指定日期票，你那天的实际金额可能更高。当天在 4 楼售票柜台或便利店购买，每张票要另加 ¥500 服务费——这是提前订票最明确的理由。核查日 ${CHECKED}。`,
  },
  {
    title: "海外发行的信用卡就走售票平台",
    desc: "Klook 卖的是同一张指定时间入场券，结账看得懂、立即拿到电子票，可以避开日本官方售票网站常见的卡与语言问题。同一个商品页也有 450 楼套票。",
  },
  {
    title: "查你自己那天的时间，不要看一般时间",
    desc: `晴空塔公布的是逐日日历，官网也明白写着「营业时间可能未经公告即变更」，最后入场是闭馆前一小时。核查日 ${CHECKED} 时，观景台的时间是 10:00–22:00，最后入场 21:00。`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年东京晴空塔门票多少钱？",
    a: `官方网站的指定日期票，主观景台 350 楼成人（15 岁以上）${ADULT}，6～14 岁儿童 ${CHILD}。涵盖 350 楼与 450 楼的套票成人 ¥3,000 起、儿童 ¥1,500 起。5 岁以下免费。这些都是「起」价，特定日期的金额可能更高。官方网站核查日 ${CHECKED}。`,
  },
  {
    q: "东京晴空塔门票提前买更便宜吗？",
    a: `是，而且便宜多少是写明的，不是看当天需求。当天在 4 楼售票柜台或便利店购买，入场费之外每张票要再加 ¥500 服务费。四个人就是 ¥2,000 的可省成本。线上订指定日期票——官网或售票平台都一样——就同时省掉这笔费用和柜台排队。核查日 ${CHECKED}。`,
  },
  {
    q: "350 楼和 450 楼差在哪里？",
    a: "350 楼是 Tembo Deck，三层楼的主观景层，每一张票都含。450 楼是 Tembo Galleria，一条玻璃墙面、斜斜往上绕的空中回廊，通到塔内可抵达的最高点。450 楼不能单独参观：你必须先有 350 楼的票，要么买线上套票，要么当天在现场售票机加购成人 ¥1,400。",
  },
  {
    q: "450 楼的票可以线上买吗？",
    a: `不能单买。官方网站只把 450 楼放在套票里卖；如果你带着 350 楼的票到现场才改变主意，就在馆内售票机加购，成人 ¥1,400、6～14 岁儿童 ¥700。线上买套票是便宜的那条路——成人 ¥3,000 起，分两次买则是 ¥1,800 再加 ¥1,400。核查日 ${CHECKED}。`,
  },
  {
    q: "东京晴空塔的营业时间是？",
    a: `晴空塔用的是逐日日历而不是一张固定时刻表，官网也注明「营业时间可能未经公告即变更」，最后入场是闭馆前一小时。核查日 ${CHECKED} 时，观景台的时间是 10:00–22:00，最后入场 21:00。要把一个晚上排在这里之前，请先用你自己的日期打开日历确认。`,
  },
  {
    q: "东京晴空塔和涩谷SKY 该选哪一个？",
    a: "它们回答的是不同问题。晴空塔讲的是高度与视野：350 楼和 450 楼是东京最高的观景台，视野涵盖整片关东平原，天气好的时候富士山也在里面。涩谷SKY 讲的是照片：约 229 米的露天屋顶，就在涩谷十字路口正上方，日落最好看，气氛大于高度。只能选一个的话，全景选晴空塔，大家都认得的那张照片选涩谷SKY。",
  },
  {
    q: "在东京晴空塔看得到富士山吗？",
    a: "天气好的时候看得到，而且凭高度，它的概率是东京各观景台里最高的。能见度完全看天气，凉爽干燥的月份和一天中较早的时段通常比较好。任何一个特定日期都没有保证，如果你是为了富士山视野才付套票价，这点值得记住。",
  },
  {
    q: "东京晴空塔怎么去？",
    a: "塔就在东武晴空塔线的「东京晴空塔站」与「押上站」上方，押上有东京地下铁半藏门线、都营浅草线与京成押上线。押上在东京地铁通票的范围内，所以如果你已经带着那张通票，过去不会多花钱。浅草线往浅草只有两站，两个地方很容易排在同一个下午。",
  },
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "东京晴空塔门票" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnTokyoSkytreePage({ updated }: { updated: PageUpdated }) {
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
            东京晴空塔门票（2026）：<br />票价、350 与 450 楼怎么选、怎么订
          </h1>
          <p className={styles.heroSubtitle}>
            东京最高的观景台，也是少数「当天才买」有明文代价的景点。这里是官方票价、450 楼实际多给你什么，
            以及从海外怎么订。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "官方票价", "350 楼 vs 450 楼"].map((t) => (
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
                <p className={styles.verdictStatLabel}>350 楼（成人）</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>350＋450 套票</p>
                <p className={styles.verdictStatValue}>¥3,000 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>当天购票</p>
                <p className={styles.verdictStatValue}>每张多 ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>5 岁以下</p>
                <p className={styles.verdictStatValue}>免费</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>线上订指定日期的票。晴空塔在当天售票柜台每张票收 ¥500 服务费，
              所以提前订票便宜的是一个写明的金额，不是运气。如果你有可能想上 450 楼空中回廊，
              一开始就买套票——到现场再加购要多付 ¥1,400。票价读自官方网站，核查日 {CHECKED}。
            </p>
            <KlookLink href={cnSkytreeTicket.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看东京晴空塔门票 →
            </KlookLink>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>你买到的是什么</span>
          <h2 className={styles.sectionTitle}>一张票涵盖到哪里</h2>
          <p className={styles.bodyText}>
            东京晴空塔卖的是两个不同楼层的入场。<strong>350 楼</strong>是 Tembo Deck，三层楼的观景层，
            每一张票都含。<strong>450 楼</strong>是 Tembo Galleria，一条斜斜往上绕的玻璃墙面空中回廊，
            通到塔内可抵达的最高点——而且它不能单独参观。
          </p>
          <p className={styles.bodyText}>
            大部分的混乱都来自这个两层结构，因为两层的价格取决于你是线上一起买，还是当天分开买。
            下面这段把两条路并排放在一起。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>东京晴空塔门票价格</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票种", "线上指定日期", "当天现场"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.advance}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            读自东京晴空塔官方网站，核查日 {CHECKED}。官方页面把这些标为「起」价，所以特定日期的金额可能更高，
            请在结账时确认。¥500 当天服务费是每张票计算，4 楼售票柜台与便利店都适用。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一种票</span>
          <h2 className={styles.sectionTitle}>350 楼、套票，还是晚场？</h2>
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
          <h2 className={styles.sectionTitle}>晴空塔 vs 东京其他观景台</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            晴空塔是「高度」那一票。如果你真正想要的是涩谷十字路口的照片，
            <Link href="/zh-cn/guides/attractions/shibuya-sky-tickets">涩谷SKY</Link>{" "}
            才是更好的选择；如果你想完全不花钱看城市全景，新宿的东京都厅展望室免费。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["观景台", "高度", "票价（约）", "特色", "区域"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            晴空塔与涩谷SKY 的数字来自运营方自己的网站；东京铁塔与都厅是约略值，可能变动。请在结账时确认。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>东京晴空塔门票怎么订</h2>
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
            <KlookLink href={cnSkytreeTicket.url} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看晴空塔的时段与价格 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>东京晴空塔的位置</h2>
          <p className={styles.bodyText}>
            交通是最简单的部分：塔就直接盖在车站上面。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>东京晴空塔站</strong>（东武晴空塔线）——就在塔的正下方。</li>
            <li><strong>押上站</strong>——东京地下铁半藏门线、都营浅草线、京成押上线。</li>
            <li>押上是地铁站，所以在东京地铁通票的范围内；带着那张通票过去不会多花钱。</li>
            <li>浅草线往浅草只有两站，两边很容易排在同一个下午。</li>
          </ul>
          <KlookLink href={cnTokyoSubwayTicket.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta} style={{ marginTop: "0.75rem", display: "inline-block" }}>
            {cnTokyoSubwayTicket.label} →
          </KlookLink>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/zh-cn/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 门票（2026）：票价、预约方式与无界比较" },
            { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", title: "teamLab 无界 门票（2026）：票价、时段预约与购票渠道" },
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京自由行景点（2026）：哪些要先订票、哪些可以现场去" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>在柜台多收你钱之前先订好</h2>
            <p className={styles.ctaBannerDesc}>
              当天购票每人要另加 ¥500 服务费。线上订的指定日期票同时省掉这笔费用和排队，
              Klook 可以用自己的币种结账，电子票直接存在手机里。
            </p>
            <KlookLink href={cnSkytreeTicket.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看东京晴空塔门票 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
