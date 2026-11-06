// 简体中文 edition of /guides/attractions/tokyo-skytree-tickets. Mirrors the English page
// block for block as of 2026-11-01 (same sections, tables, Klook / GetYourGuide CTAs and
// blocks in the same order); every figure comes from the English page or from
// lib/attraction-prices.ts — nothing was re-checked or added for this edition.
import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../../components/BookingEsimCard";
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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../../components/GygCompare";
import { gygTokyoSkytree } from "../../../../lib/gyg-links";
import {
  skytreeTicket,
  skytreeAquariumCombo,
  fujiHakoneDayTour,
  tokyoSightseeingBusTour,
  skytreeTripPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions/tokyo-skytree-tickets";
const TITLE = "东京晴空塔门票（2026）：票价与楼层选择";
const DESC =
  "东京晴空塔门票 2026：350 楼展望台 ¥1,800 起、350＋450 套票 ¥3,000 起，当天购票每张多 ¥500。";

const LOCALE = "zh-cn" as const;
const P = PRICES.tokyoSkytree;
const CHECKED = dateLabel(P.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const CHILD = priceLabel(P.child, LOCALE);
const FREE = priceLabel("Free", LOCALE);

const SKYTREE_URL = klookFor(skytreeTicket.url, LOCALE);

const priceRows = [
  { ticket: "350 楼 — 成人（15 岁以上）", advance: ADULT, sameDay: "另加服务费 ¥500" },
  { ticket: "350 楼 — 儿童（6～14 岁）", advance: CHILD, sameDay: "另加服务费 ¥500" },
  { ticket: "350＋450 楼套票 — 成人", advance: "¥3,000 起", sameDay: "另加服务费 ¥500" },
  { ticket: "350＋450 楼套票 — 儿童", advance: "¥1,500 起", sameDay: "另加服务费 ¥500" },
  { ticket: "现场加购 450 楼 — 成人", advance: "线上不销售", sameDay: "¥1,400" },
  { ticket: "现场加购 450 楼 — 儿童", advance: "线上不销售", sameDay: "¥700" },
  { ticket: "5 岁以下", advance: FREE, sameDay: FREE },
];

const whoFor = [
  {
    title: "只买 350 楼就够了，如果…",
    desc: `你要的是风景，不是加购。350 楼是三层楼高的主观景台，光是这里就已经能俯瞰整个关东平原。成人 ${ADULT}，按每米高度算，是东京几大收费观景台里最便宜的一个。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h-6l3-7z" />
        <line x1="12" y1="9" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "加买 450 楼，如果…",
    desc: "高度本身就是这趟的目的。450 楼是 Tembo Galleria（天望回廊），一条螺旋上升的玻璃空中回廊，通往塔内游客能到达的最高点。线上套票 ¥3,000 起；当天在 350 楼门票基础上加购，要再付 ¥1,400。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "选晚一点的时段，如果…",
    desc: "比起远处的地平线，你更想看夜景。在核查当天，观景台营业到 22:00，最后入场 21:00；白天时段售罄之后，往往还有余票的就是晚场。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const deckRows = [
  {
    deck: "东京晴空塔",
    height: "350 楼与 450 楼",
    price: "¥1,800 起（350 楼）・套票 ¥3,000 起",
    highlight: "东京最高的观景台，也是唯一的玻璃空中回廊",
    area: "押上／东京晴空塔站",
  },
  {
    deck: "涩谷SKY",
    height: "约 229 米屋顶",
    price: "线上预购 ¥2,500",
    highlight: "涩谷十字路口正上方的露天屋顶——拍的是那张照片，不是高度",
    area: "涩谷站",
  },
  {
    deck: "东京塔",
    height: "约 150 米与约 250 米两层",
    price: "约 ¥3,300（Top Deck Tour）",
    highlight: "1958 年建成的地标，而且视野里能看到晴空塔",
    area: "芝公园／赤羽桥",
  },
  {
    deck: "东京都厅",
    height: "约 202 米",
    price: FREE,
    highlight: "完全不用买票——东京性价比最高的城市全景",
    area: "新宿",
  },
];

const steps = [
  {
    title: "订票前先决定只买 350 楼还是买套票",
    desc: "450 楼放在线上套票里买（成人 ¥3,000 起），比当天在 350 楼门票上加购（多 ¥1,400）便宜。只要有一点可能想上空中回廊，就一开始买套票。",
  },
  {
    title: "线上预订指定日期的门票",
    desc: `官网按上面的「起」价销售指定日期门票，你那天的实际价格可能更高。当天在 4 楼售票柜台或便利店购买，每张票要另加 ¥500 服务费——这是提前订票最明确的理由。核查日 ${CHECKED}。`,
  },
  {
    title: "用境外信用卡的话，通过票务平台买",
    desc: "Klook 卖的是同样的指定时段门票，有中文下单界面、出电子票，可以避开不少游客在日本景点官网遇到的刷卡和语言问题。同一个商品页里也有 450 楼套票。",
  },
  {
    title: "查你那一天的营业时间，别看通用时间",
    desc: "晴空塔公布的是逐日营业日历，官网也明确写着「营业时间可能不经预告变更」，最后入场为闭馆前一小时。在核查当天，观景台的营业时间是 10:00–22:00，最后入场 21:00。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "东京晴空塔门票多少钱？",
    a: `官网的指定日期门票，主观景台 350 楼成人（15 岁以上）${ADULT}，6～14 岁儿童 ${CHILD}。包含 350 楼和 450 楼的套票成人 ¥3,000 起、儿童 ¥1,500 起。5 岁以下免费。这些都是「起」价，具体某一天的价格可能更高。官网核查日 ${CHECKED}。`,
  },
  {
    q: "东京晴空塔门票提前买更便宜吗？",
    a: `是的，而且便宜多少是明码标价的，不是看当天客流浮动。当天在 4 楼售票柜台——或便利店——购买，门票之外每张还要加 ¥500 服务费。一家四口就是 ¥2,000 本可以省下的钱。线上预订指定日期门票，不管是官网还是票务平台，都能同时省掉这笔费用和柜台排队。核查日 ${CHECKED}。`,
  },
  {
    q: "350 楼和 450 楼有什么区别？",
    a: "350 楼是 Tembo Deck（天望甲板），三层楼高的主观景层，每张门票都包含。450 楼是 Tembo Galleria（天望回廊），一条玻璃墙面、螺旋上升的空中回廊，通往塔内游客能到达的最高点。450 楼不能单独参观：必须先有 350 楼的门票，要么买线上套票，要么在现场售票机加购（成人 ¥1,400）。",
  },
  {
    q: "450 楼的门票可以在网上买吗？",
    a: `不能单独买。官网只把 450 楼放在套票里销售；如果你拿着 350 楼门票到了现场才改主意，就在馆内售票机加购，成人 ¥1,400、6～14 岁儿童 ¥700。线上买套票更划算——成人 ¥3,000 起，而分两次买是 ¥1,800 再加 ¥1,400。核查日 ${CHECKED}。`,
  },
  {
    q: "东京晴空塔的营业时间是几点到几点？",
    a: `晴空塔采用逐日营业日历，而不是一张固定时间表，官网也注明「营业时间可能不经预告变更」，最后入场为闭馆前一小时。在核查当天，观景台营业时间为 10:00–22:00，最后入场 21:00。要围绕它安排整个晚上，请先按你自己的日期查一下日历。核查日 ${CHECKED}。`,
  },
  {
    q: "东京晴空塔和涩谷SKY 选哪个？",
    a: "两者解决的是不同需求。晴空塔看的是高度和视野范围：350 楼和 450 楼是东京最高的观景台，视野覆盖整个关东平原，天气晴朗时还能看到富士山。涩谷SKY 拍的是照片：约 229 米高的露天屋顶，就在涩谷十字路口正上方，日落时最美，氛围感大于高度。只能选一个的话，看全景选晴空塔，拍那张人人都认识的照片选涩谷SKY。",
  },
  {
    q: "在东京晴空塔能看到富士山吗？",
    a: "天气晴朗时能看到——而且凭借高度，它的概率是东京各观景台里最高的。能见度完全取决于天气，凉爽干燥的月份和一天中较早的时段通常更好。任何一天都没有保证，如果你专门为了看富士山才付套票的钱，这一点值得先记住。",
  },
  {
    q: "怎么去东京晴空塔？",
    a: "塔就建在东武晴空塔线的「东京晴空塔站」和「押上站」上方；押上站有东京地铁半藏门线、都营浅草线和京成押上线。押上在东京地铁通票的覆盖范围内，所以如果你已经有这张票，过去不用额外花钱。坐浅草线到浅草只有两站，两个地方很容易安排在同一个下午。",
  },
];

// The English page's Around-the-tower block, same four products in the same order.
const tripPrepItems = [
  withKlookLocale(skytreeTripPrep[0], LOCALE, {
    label: "上野／浅草周边酒店",
    ctaLabel: "在 Klook 查看上野和浅草的酒店 →",
    why: "就在晴空塔所在的河岸这一侧：上野在山手线上，银座线从上野直达浅草，押上再坐浅草线两站就到——看完晚场夜景，不用横穿整个东京回酒店。",
  }),
  withKlookLocale(skytreeTripPrep[1], LOCALE, {
    label: "浅草 Kimono Yae 和服租赁",
    ctaLabel: "查看浅草和服租赁 →",
    why: "同一趟行程的白天部分，只隔两站：店就在雷门旁边，商品页要求 17:30 前归还——正好排在晚场晴空塔之前，而不是和它抢时间。",
  }),
  withKlookLocale(skytreeTripPrep[2], LOCALE, {
    label: "东京随上随下观光巴士（Skyhop Bus）",
    ctaLabel: "查看露天巴士票 →",
    why: "露天双层的随上随下车票，线路包含浅草——如果这一天既有浅草寺又有晴空塔，比每一段都单独付一次地铁车费更合适。",
  }),
  withKlookLocale(skytreeTripPrep[3], LOCALE, {
    label: "东京地铁通票（24／48／72小时）",
    ctaLabel: "查看地铁通票 →",
    why: "押上是半藏门线和都营浅草线的地铁站，所以 24、48 或 72 小时的东京地铁及都营通票本身就覆盖去晴空塔的路程——之后去浅草寺的两站也包含在内。",
  }),
];

const tourPicks = [
  withKlookLocale(skytreeAquariumCombo, LOCALE, {
    title: "东京晴空塔＋墨田水族馆套票",
    desc: "观景台加上塔底同一个晴空街道商场里的水族馆，一张票搞定",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "东京观光巴士一日游",
    desc: "带讲解的巴士行程，途经皇居外苑、浅草和东京晴空塔，配多语种语音导览",
  }),
  withKlookLocale(fujiHakoneDayTour, LOCALE, {
    title: "富士山＋箱根一日游",
    desc: "富士山五合目搭配箱根火山区和芦之湖，从东京出发当天往返",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "东京晴空塔门票" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnTokyoSkytreePage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

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
              inLanguage: JSONLD_LANG[LOCALE],
            }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            东京晴空塔门票（2026）：<br />票价、350 与 450 楼怎么选、怎么订
          </h1>
          <p className={styles.heroSubtitle}>
            东京最高的观景台，也是少数「当天才买」要多付钱、而且明码写出来的景点。这里整理官方票价、450 楼到底多了什么，
            以及从国外怎么订。
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

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>350 楼（成人）</p>
                <p className={styles.verdictStatValue}>¥1,800 起</p>
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
                <p className={styles.verdictStatValue}>{FREE}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>线上预订指定日期的门票。晴空塔当天售票柜台每张票收 ¥500 服务费，
              所以提前订票省下的是一个明码标出的金额，而不是碰运气。如果你可能想上 450 楼空中回廊，
              一开始就买套票——事后到现场再加购要多付 ¥1,400。票价来自官网，核查日 {CHECKED}。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SKYTREE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看东京晴空塔门票 →
              </KlookLink>
              <GygCompareButton slug="zh-cn-tokyo-skytree-tickets" listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>

        <BookingEsimCard />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概览</span>
          <h2 className={styles.sectionTitle}>你买到的是什么</h2>
          <p className={styles.bodyText}>
            东京晴空塔卖的是两个不同楼层的门票。<strong>350 楼</strong>是 Tembo Deck（天望甲板），三层楼高的观景层，
            每张门票都包含。<strong>450 楼</strong>是 Tembo Galleria（天望回廊），一条螺旋上升的玻璃墙面空中回廊，
            通往塔内游客能到达的最高点——而且不能单独参观。
          </p>
          <p className={styles.bodyText}>
            大部分困惑都来自这种两层结构：两层的价格取决于你是线上一起买，还是当天分开买。
            下面把这两种买法并排列出来。
          </p>
        </section>

        {/* Price table */}
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
            数据来自东京晴空塔官网，核查日 {CHECKED}。官方页面把这些标为「起」价，所以具体某一天的价格可能更高，
            请在下单时确认。¥500 当天服务费按每张票收取，4 楼售票柜台和便利店都适用。
          </p>
        </section>

        {/* Around the tower */}
        <KlookTripPrep
          label="晴空塔周边"
          heading="押上这边的行程，还有哪些要提前订"
          intro="一个观景台时段大约一到两小时，上面那张门票是其中唯一需要选时段的部分。下面这些是当天下午其余行程要用到的预订——都和晴空塔在河的同一侧，也都和门票在同一个账号里。"
          items={tripPrepItems}
        />

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>选哪种票</span>
          <h2 className={styles.sectionTitle}>350 楼、套票，还是晚场？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>对比</span>
          <h2 className={styles.sectionTitle}>晴空塔 vs 东京其他观景台</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            晴空塔胜在高度。如果你真正想要的是涩谷十字路口那张照片，
            <Link href="/zh-cn/guides/attractions/shibuya-sky-tickets">涩谷SKY</Link>{" "}
            更值得买；如果想一分钱不花看城市全景，新宿的东京都厅展望室是免费的。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["观景台", "高度", "票价（约）", "亮点", "区域"].map((h) => (
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
            晴空塔和涩谷SKY 的数据来自运营方官网；东京塔和都厅为大致数字，可能有变动。请在下单时确认。
          </p>
        </section>

        {/* How to book */}
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
            交通是最简单的部分：塔就建在东京晴空塔站和押上站上方，而押上是地铁站——所以如果你有
            <Link href="/guides/attractions/tokyo-subway-ticket">东京地铁通票（英文）</Link>，
            过去就包含在内。东京地铁和都营两套线网怎么配合，请看我们的
            <Link href="/guides/transport/tokyo-transportation">东京交通攻略（英文）</Link>。
          </p>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="和当天其他行程一起订"
          intro="一个晴空塔时段大约一到两小时。下面这些商品和门票在同一个 Klook 账号里，当天其余的行程可以在同一次下单里订好。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-bay-cruise", title: "东京湾游船（2026）：屋形船与 Symphony 对比、时间和票价（英文）" },
            { href: "/guides/attractions/asakusa-kimono-rental", title: "浅草和服租赁（2026）：归还时间、发型与拍照地点（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "东京三日游行程（2026）：要订什么、按什么顺序订（英文）" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "东京塔门票（2026）：票价、Main Deck 与 Top Deck 对比及预订方式（英文）" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "东京地铁通票（2026）：24、48 还是 72 小时？值不值得买（英文）" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "华纳兄弟东京影城之旅门票（2026）：票价与预订方式（英文）" },
            { href: "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日游（东京出发·2026）：行程怎么选、五合目看什么" },
            { href: "/zh-cn/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 门票（2026）：票价、预约方式与无界比较" },
            { href: "/zh-cn/guides/attractions", title: "更多日本景点门票攻略 →" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>别等柜台多收你钱，提前订好</h2>
            <p className={styles.ctaBannerDesc}>
              当天购票每人要另加 ¥500 服务费。线上预订指定日期门票，服务费和排队都能省掉——
              而且 Klook 有中文下单界面，境外信用卡也能支付。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SKYTREE_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看东京晴空塔门票 →
              </KlookLink>
              <GygCompareButton slug="zh-cn-tokyo-skytree-tickets" listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
