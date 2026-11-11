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
// Re-synced with the English guide on 2026-11-10 (answer-first opening, question headings,
// hours and cancellation table, three FAQs). Figures from lib/attraction-prices.ts and
// en.tokyo-skytree.jp, read 10 Nov 2026.
const TITLE = "东京晴空塔门票价格 2026：350 米 vs 450 米与预订";
const DESC =
  "东京晴空塔门票价格（2026/11 官网核查）：350 米天望甲板 ¥1,800 起，350 米＋450 米套票 ¥3,000 起，现场购票每张加 ¥500。";

const LOCALE = "zh-cn" as const;
const P = PRICES.tokyoSkytree;
const CHECKED = dateLabel(P.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const CHILD = priceLabel(P.child, LOCALE);
const FREE = priceLabel("Free", LOCALE);

const SKYTREE_URL = klookFor(skytreeTicket.url, LOCALE);

const priceRows = [
  { ticket: "350 米天望甲板 — 成人（15 岁以上）", advance: ADULT, sameDay: "另加服务费 ¥500" },
  { ticket: "350 米天望甲板 — 儿童（6～14 岁）", advance: CHILD, sameDay: "另加服务费 ¥500" },
  { ticket: "350 米＋450 米观景台套票 — 成人", advance: "¥3,000 起", sameDay: "另加服务费 ¥500" },
  { ticket: "350 米＋450 米观景台套票 — 儿童", advance: "¥1,500 起", sameDay: "另加服务费 ¥500" },
  { ticket: "现场加购 450 米天望回廊 — 成人", advance: "不单独销售", sameDay: "¥1,400（无服务费）" },
  { ticket: "现场加购 450 米天望回廊 — 儿童", advance: "不单独销售", sameDay: "¥700（无服务费）" },
  { ticket: "5 岁以下", advance: FREE, sameDay: FREE },
];

// Same rows as the English guide's visitRows, read off en.tokyo-skytree.jp on 10 Nov 2026.
const visitRows = [
  { item: "开放时间（2026 年 11 月 10 日）", detail: "10:00–22:00，最晚入场 21:00。开放时间按日期公布，可能不经通知变更；最晚入场一律为闭馆前 1 小时。" },
  { item: "更改日期或时段", detail: "不能更改。须取消后重新购买；套票与天望甲板门票之间互换也一样。" },
  { item: "退票手续费（官方线上票）", detail: "参观日 31 天前及更早 0%，30 天前起至入场时间 20%，入场时间后 100%。购买后 59 分钟内取消免手续费。" },
  { item: "当天现场购票", detail: "4 楼售票柜台和售票机，每张加 ¥500。能买到的时段视当天情况而定，可能需要排队。" },
  { item: "天望回廊（450 米）", detail: "445–450 米，最高点 451.2 米（Sorakara Point）。从 350 米乘天望回廊专用电梯上去；当天加购可能因人数限制暂停销售。" },
  { item: "人较少的时段", detail: "工作日下午、早上刚开门、闭馆前的晚间时段（依官方拥挤预测页）。" },
  { item: "最近车站", detail: "东京晴空塔站（东武晴空塔线）、押上站（半藏门线等）。从浅草约 5 分钟，从东京站约 20 分钟。" },
];

const whoFor = [
  {
    title: "只买 350 米天望甲板就够了，如果…",
    desc: `如果只是想看东京全景，就不需要加购。350 米天望甲板是由三个楼层组成的主观景台，光是这里就已经能俯瞰整个关东平原。成人 ${ADULT}，按每米观景高度的票价计算，是东京几大收费观景台里最便宜的一个。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h-6l3-7z" />
        <line x1="12" y1="9" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "加买 450 米天望回廊，如果…",
    desc: "如果高度本身就是此行的目的。450 米处是 Tembo Galleria（天望回廊），一条沿玻璃幕墙螺旋上升的空中回廊，通往塔内游客能到达的最高点。线上套票 ¥3,000 起；当天在 350 米天望甲板门票基础上加购，成人要再付 ¥1,400。",
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
    height: "350 米与 450 米",
    price: "¥1,800 起（350 米）・套票 ¥3,000 起",
    highlight: "东京最高的观景台，也是唯一的玻璃空中回廊",
    area: "押上／东京晴空塔站",
  },
  {
    deck: "SHIBUYA SKY",
    height: "约 229 米屋顶",
    price: `线上预购 ${priceLabel(PRICES.shibuyaSky.adult, LOCALE)}`,
    highlight: "涩谷十字路口正上方的露天屋顶——特色是那张经典照片，而不是高度",
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
    highlight: "完全不用买票——免费欣赏东京城市全景，性价比最高",
    area: "新宿",
  },
];

const steps = [
  {
    title: "订票前先决定只买 350 米天望甲板还是买套票",
    desc: "450 米天望回廊请通过线上套票购买（成人 ¥3,000 起），比当天在 350 米天望甲板门票上加购（成人多付 ¥1,400）便宜。只要有一点可能想上天望回廊，就一开始购买套票。",
  },
  {
    title: "线上预订指定日期的门票",
    desc: `官网按上面的「起」价销售指定日期门票，所选日期的实际票价可能更高。当天在 4 楼售票柜台或售票机购买，每张票要另加 ¥500 服务费——这是提前订票最明确的理由。核查日 ${CHECKED}。`,
  },
  {
    title: "用境外信用卡的话，通过票务平台买",
    desc: "Klook 销售同样的指定时段门票，有中文下单界面、提供电子票，可以避开不少游客在日本景点官网遇到的支付失败和语言问题。同一个商品页里也有 350 米＋450 米观景台套票。",
  },
  {
    title: "查询参观当天的营业时间，不要只看通用时间",
    desc: "晴空塔公布的是逐日营业日历，官网也明确写着「营业时间可能不经预告变更」，最后入场为闭馆前一小时。在核查当天，观景台的营业时间是 10:00–22:00，最后入场 21:00。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "东京晴空塔门票多少钱？",
    a: `官网的指定日期门票，主观景台 350 米天望甲板成人（15 岁以上）${ADULT}，6～14 岁儿童 ${CHILD}。包含 350 米和 450 米观景台的套票成人 ¥3,000 起、儿童 ¥1,500 起。5 岁以下免费。这些都是「起」价，所选日期的实际票价可能更高。官网核查日 ${CHECKED}。`,
  },
  {
    q: "东京晴空塔门票提前买更便宜吗？",
    a: `是的，而且节省的金额是明确公布的，不随当天客流变化。当天在 4 楼售票柜台或售票机购买，门票之外每张还要加 ¥500 服务费。一家四口提前在线购票，就能省下 ¥2,000 的服务费。线上预订指定日期门票，不管是官网还是票务平台，都能同时省掉这笔费用和柜台排队。核查日 ${CHECKED}。`,
  },
  {
    q: "350 米和 450 米观景台有什么区别？",
    a: "350 米处是 Tembo Deck（天望甲板），由三个楼层组成的主观景台，每张门票都包含。450 米处是 Tembo Galleria（天望回廊），一条沿玻璃幕墙螺旋上升的空中回廊，通往塔内游客能到达的最高点。450 米天望回廊不能单独参观：必须先有 350 米天望甲板的门票，要么买线上套票，要么在现场售票机加购（成人 ¥1,400）。",
  },
  {
    q: "450 米天望回廊的门票可以在网上买吗？",
    a: `不能单独买。官网只把 450 米天望回廊放在套票里销售；如果你持 350 米天望甲板门票，到现场才决定加购，就在馆内售票机购买，成人 ¥1,400、6～14 岁儿童 ¥700。线上买套票更划算——成人 ¥3,000 起，而分两次买是 ¥1,800 再加 ¥1,400。核查日 ${CHECKED}。`,
  },
  {
    q: "东京晴空塔的营业时间是几点到几点？",
    a: `晴空塔采用逐日营业日历，而不是一张固定时间表，官网也注明「营业时间可能不经预告变更」，最后入场为闭馆前一小时。在核查当天，观景台营业时间为 10:00–22:00，最后入场 21:00。如果要围绕它安排整个晚上，请先按参观日期查一下日历。核查日 ${CHECKED}。`,
  },
  {
    q: "东京晴空塔和 SHIBUYA SKY 选哪个？",
    a: "两者满足的是不同需求。晴空塔的特色是高度和远眺视野：350 米和 450 米观景台是东京最高的观景台，视野覆盖整个关东平原，天气晴朗时还能看到富士山。SHIBUYA SKY 的特色是拍照：约 229 米高的露天屋顶，就在涩谷十字路口正上方，日落时最美，氛围感大于高度。只能选一个的话，看全景选晴空塔，拍那张人人都认识的照片选 SHIBUYA SKY。",
  },
  {
    q: "在东京晴空塔能看到富士山吗？",
    a: "天气晴朗时能看到——而且凭借高度，在东京各观景台中看到富士山的机会最大。能见度完全取决于天气，凉爽干燥的月份和一天中较早的时段通常更好。任何一天都没有保证，如果你专门为了看富士山才付套票的钱，这一点值得先记住。",
  },
  {
    q: "怎么去东京晴空塔？",
    a: "塔就建在东武晴空塔线的「东京晴空塔站」和「押上站」上方；押上站有东京地铁半藏门线、都营浅草线和京成押上线。东京地铁通票适用于押上站，所以如果你已经有这张票，过去不用额外花钱。坐浅草线到浅草只有两站，两个地方很容易安排在同一个下午。",
  },
  {
    q: "东京晴空塔门票可以改日期或时段吗？",
    a: `不能。官网说明已购买的门票无法更改，要换日期、时段或票种，必须取消后重新购买。官方线上票在参观日 31 天前及更早取消免手续费，30 天前起至入场时间收 20%，入场时间后不能取消；购买后 59 分钟内取消也不收费。通过旅行社或票务平台购买的门票，按该卖家的规定处理。核查日 ${CHECKED}。`,
  },
  {
    q: "东京晴空塔儿童票适用几岁？",
    a: `儿童票适用 6～14 岁（初中生及以下）。15 岁起（含高中生）为成人票，5 岁以下免费。核查日 ${CHECKED}。`,
  },
  {
    q: "450 米天望回廊当天会卖完吗？",
    a: `可能暂停销售。天望回廊加购票当天在 350 米天望甲板内的售票机销售，官网提示可能因人数限制而暂停销售。线上购买的套票，已在你预约的时段包含 450 米入场。核查日 ${CHECKED}。`,
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
    why: "露天双层观光巴士的随上随下车票，线路包含浅草——如果这一天既有浅草寺又有晴空塔，比每一段都单独付一次地铁车费更合适。",
  }),
  withKlookLocale(skytreeTripPrep[3], LOCALE, {
    label: "东京地铁通票（24／48／72小时）",
    ctaLabel: "查看地铁通票 →",
    why: "押上是半藏门线和都营浅草线的地铁站，所以 24、48 或 72 小时的东京地铁及都营通票本身就适用于去晴空塔的路程——之后去浅草寺的两站也包含在内。",
  }),
];

const tourPicks = [
  withKlookLocale(skytreeAquariumCombo, LOCALE, {
    title: "东京晴空塔＋墨田水族馆套票",
    desc: "一张票包含观景台和塔下东京晴空街道商场内的水族馆",
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
            东京晴空塔门票价格（2026）：<br />350 米和 450 米怎么选？如何预订？
          </h1>
          <p className={styles.heroSubtitle}>
            东京晴空塔门票：350 米天望甲板成人 ¥1,800 起，加上 450 米天望回廊的套票 ¥3,000 起（官网核查日
            {CHECKED}；票价因日期而异，实际出行当天的价格可能更高）。提前在线购买指定日期和时段的门票，可免去现场柜台和售票机每张 ¥500
            的服务费，而现场能买到的时段视当天情况而定——如果想选特定时段，尤其是傍晚，最好提前预订。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "官网票价", "350 米 vs 450 米"].map((t) => (
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
                <p className={styles.verdictStatLabel}>350 米天望甲板（成人）</p>
                <p className={styles.verdictStatValue}>¥1,800 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>350 米＋450 米套票</p>
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
              所以提前订票可以省下官网明确标明的服务费。如果你可能也想登上 450 米的天望回廊，
              就一开始购买套票——事后到现场再加购，成人要多付 ¥1,400。票价来自官网，核查日 {CHECKED}。
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
          <span className={styles.sectionLabel}>概览<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>东京晴空塔门票包含哪些区域？</h2>
          <p className={styles.bodyText}>
            本文介绍东京晴空塔的门票种类、价格及预订方式；如果还在决定上哪座观景台，
            <Link href="/guides/attractions/tokyo-observation-decks">东京观景台对比（英文）</Link>
            把晴空塔和 SHIBUYA SKY、东京塔、免费的都厅展望室并排对比。东京晴空塔出售两个不同高度观景区域的门票。<strong>350 米</strong>处是 Tembo Deck（天望甲板），由三个楼层组成的观景台，
            每张门票都包含。<strong>450 米</strong>处是 Tembo Galleria（天望回廊），一条沿玻璃幕墙螺旋上升的空中回廊，
            通往塔内游客能到达的最高点——而且不能单独参观。
          </p>
          <p className={styles.bodyText}>
            大部分困惑都来自这两个观景区域的购票方式：两者的价格取决于是线上一起买，还是当天分开买。
            下面把这两种买法并排列出来。
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>门票价格<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>2026 年东京晴空塔门票多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人 350 米天望甲板 ¥1,800 起、加上 450 米天望回廊的套票 ¥3,000 起；6～14 岁儿童分别为 ¥900 起和
            ¥1,500 起。在塔内现场购票每张加 ¥500。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.5rem" }}>
                  官网票价（en.tokyo-skytree.jp/ticket），核查日 {CHECKED}。
                </caption>
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
            数据来自东京晴空塔官网，核查日 {CHECKED}。官方页面把这些标为「起」价，所以所选日期的实际票价可能更高，
            请在下单时确认。核查的官方资料没有另列工作日与节假日票价表，结账时显示的当日金额就是实际票价。¥500
            现场服务费按每张票收取，4 楼售票柜台和售票机都适用；450 米加购票不收服务费。
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>选哪种票<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>450 米天望回廊值得比 350 米多花钱吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            只有特别想登上更高处时才值得。成人套票比只买天望甲板贵 ¥1,200（¥3,000 起 vs ¥1,800 起），
            从 350 米再往上到 445–450 米的玻璃回廊，最高点 451.2 米。拿不定主意就线上买套票——当天再加购 450 米要
            ¥1,400，而且官网表示人多时可能暂停销售。
          </p>
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

        {/* Booking CTA — after the price table and the which-ticket choice */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>选好票了吗？</strong>Klook 的 TOKYO SKYTREE 商品页同时有指定时段门票和 350 米＋450 米套票，
              中文结账、电子票。参观当天的实际价格和可选时段，请在商品页确认。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <KlookLink href={SKYTREE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看 TOKYO SKYTREE 门票 →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Around the tower */}
        <KlookTripPrep
          label="晴空塔周边"
          heading="押上一带的行程，还有哪些要提前订"
          intro="一个观景台时段大约一到两小时，上面那张门票是其中唯一需要选时段的部分。下面这些是当天下午其余行程要用到的预订——这些地点都和晴空塔在隅田川同一侧，也可以和门票用同一个账号预订。"
          items={tripPrepItems}
        />

        {/* At the door */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>当天<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>东京晴空塔门票可以现场买吗？</h2>
          <p className={styles.bodyText}>
            可以，在 4 楼售票柜台和售票机买，但每张比线上贵 ¥500；官网也说明当天能买到的时段视当天情况而定，
            购票可能要排队。450 米天望回廊加购票在 350 米天望甲板内的售票机销售、不收服务费，但人多时可能暂停销售。
          </p>
        </section>

        {/* Best time */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>时段<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>什么时候去东京晴空塔最好？</h2>
          <p className={styles.bodyText}>
            想要人少，选工作日下午或早上第一个时段；想看夜景，选闭馆前的一两个小时。这是官方拥挤预测页点名的三个时段，
            并提醒新年、黄金周和春假期间人更多。日落时间随季节变化，傍晚时段请对照参观当天的日落时间。
            想把晴空塔排进东京行程，可以看{" "}
            <Link href="/zh-cn/guides/attractions/things-to-do-tokyo">东京必做清单</Link>{" "}
            里还有哪些需要预约时段的景点。
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.5rem" }}>
                  TOKYO SKYTREE 官网（开放时间、退票、拥挤预测、交通和楼层介绍页），核查日 {CHECKED}。
                </caption>
                <thead>
                  <tr>
                    {["项目", "官方信息"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visitRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>对比<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>晴空塔和东京其他观景台有什么不同？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            晴空塔的优势在于高度。如果你真正想要的是涩谷十字路口那张照片，
            <Link href="/zh-cn/guides/attractions/shibuya-sky-tickets">SHIBUYA SKY（涩谷天空）</Link>{" "}
            更值得买；如果想免费欣赏城市全景，新宿的东京都厅展望室是免费的。
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
            晴空塔和 SHIBUYA SKY 的数据来自运营方官网；东京塔和都厅为大致数字，可能有变动。请在下单时确认。
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>预订步骤<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>东京晴空塔门票怎么订？</h2>
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
            前往晴空塔的地铁也在通票范围内。东京地铁与都营地铁怎么衔接，请看我们的
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
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "SHIBUYA SKY（涩谷天空）门票（2026）：票价、最佳时段与预约方式" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "东京地铁通票（2026）：24、48 还是 72 小时？值不值得买（英文）" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "华纳兄弟东京影城之旅门票（2026）：票价与预订方式（英文）" },
            { href: "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日游（东京出发·2026）：行程怎么选、五合目看什么" },
            { href: "/zh-cn/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 门票（2026）：票价、时间与预约方式" },
            { href: "/zh-cn/guides/attractions", title: "更多日本景点门票攻略 →" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>提前在线订票，避免现场加收费用</h2>
            <p className={styles.ctaBannerDesc}>
              当天购票每人要另加 ¥500 服务费。线上预订指定日期门票，服务费和排队都能省掉——
              而且 Klook 有中文下单界面，支持境外信用卡支付。
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
