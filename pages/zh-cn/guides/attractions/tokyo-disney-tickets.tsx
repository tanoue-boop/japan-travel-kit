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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import GygCompare, { GygCompareButton } from "../../../../components/GygCompare";
import { fujiDayTour, tokyoDisneyTripPrep, tokyoSightseeingBusTour } from "../../../../lib/klook-links";
import { cnTokyoDisney } from "../../../../lib/klook-links-zh-cn";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { gygTokyoDisneyResort, gygTokyoDisneySea } from "../../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

/**
 * Mirrors the English page (pages/guides/attractions/tokyo-disney-tickets.tsx) as of
 * 2026-11-01: same sections, tables, CTAs and Klook/GetYourGuide blocks in the same
 * order. Every rule and figure is the English page's (Tokyo Disney Resort's own,
 * read 28 Oct 2026); no figure has been added.
 */

const ROUTE = "/zh-cn/guides/attractions/tokyo-disney-tickets";
const TITLE = "东京迪士尼门票（2026）：乐园与海洋怎么买、怎么选";
const DESC =
  "东京迪士尼门票 2026：每张票都指定日期、现场完全不卖票。海外信用卡刷不过时怎么买，以及迪士尼乐园与迪士尼海洋该选哪一个。";

const LOCALE = "zh-cn" as const;
const CHECKED = dateLabel("2026-10-28", LOCALE);
const DISNEY_TICKET_URL = klookFor(cnTokyoDisney.url, LOCALE);
const GYG_SLUG = "zh-cn-tokyo-disney-tickets";

/** The published minimums, by the resort's own age bands. */
const priceRows = [
  { band: "成人（大人）", who: "18 岁及以上", price: priceLabel("From ¥8,900", LOCALE) },
  { band: "青少年（中人）", who: "12–17 岁——初中、高中年龄", price: priceLabel("From ¥7,400", LOCALE) },
  { band: "儿童（小人）", who: "4–11 岁——学龄前与小学年龄", price: priceLabel("From ¥5,300", LOCALE) },
  { band: "幼儿", who: "3 岁及以下", price: priceLabel("Free", LOCALE) },
];

/** Which passports exist, and when each one lets you through the gate. */
const ticketRows = [
  {
    ticket: "一日票",
    entry: "开园时起",
    dates: "每天",
    note: "一天进一座园区，日期与园区在购买时就固定。这是最普通的票。",
  },
  {
    ticket: "After 3 票（节假日限定）",
    entry: "15:00 起",
    dates: "节假日",
    note: "在有销售的日期，用更便宜的价格在傍晚进一座园区。",
  },
  {
    ticket: "After 5 票（工作日限定）",
    entry: "17:00 起",
    dates: "工作日",
    note: "时间最短、最便宜的入园方式，适合工作日晚上去。",
  },
  {
    ticket: "一日双园票（1-Day Park Hopper，期间限定）",
    entry: "—",
    dates: "目前未销售",
    note: "度假区 FAQ 明确表示目前没有销售；同一趟想两座园区都去，就每座园区各买一张票。",
  },
  {
    ticket: "多日票",
    entry: "—",
    dates: "不销售",
    note: "票种相关的 FAQ 表示，不销售涵盖连续两天及以上的票。",
  },
];

/** Operating hours — set per date, not a standing figure. */
const hoursRows = [
  {
    what: "开园与闭园时间",
    detail: "按日期而定。度假区把时间公布在自己的运营日历上，而不是固定的营业时间；购票页面也会显示你所选日期的时间。",
  },
  {
    what: "时间提前多久公布",
    detail: "大约五个月。FAQ 表示运营时间约在五个月前于官网公告。",
  },
  {
    what: "这对买票意味着什么",
    detail: "你的日期大约在两个月前开售，那时当天的运营时间早已公布好几个月——所以请在买票前看日历，而不是买完才看。在 20:00 闭园的日期用 After 5 票，就只有三小时。",
  },
];

/** The buying window, the sell-outs and what you can and cannot undo. */
const buyingRows = [
  {
    q: "我的日期什么时候开售？",
    a: "每天日本时间 14:00 起，开售两个月后同一天的票——所以 3 月 1 日入园的票，在 1 月 1 日 14:00 开售。如果那个月没有对应的日期，则在下个月 1 日 14:00 开售。",
  },
  {
    q: "一次可以买几张？",
    a: "每笔订单最多十张；当天的张数达到上限后，该日期的销售可能不经预告就停止。",
  },
  {
    q: "门口有卖票吗？",
    a: "没有。FAQ 明确表示东京迪士尼乐园与东京迪士尼海洋现场不销售园区门票。当天购买只能在官网或官方 App、而且还有名额时才行——如果售罄，就无法入园。",
  },
  {
    q: "有例外吗？",
    a: "迪士尼酒店的住客可以在酒店买当天的票。除此之外，当天购买只有官网与 App；提前购买的话，还有部分旅行社与便利店。",
  },
  {
    q: "可以取消退款吗？",
    a: "不行。因个人原因取消与退款都不受理；关于恶劣天气、地震或其他原因无法在指定日期入园的 FAQ，也指向同一条规定。",
  },
  {
    q: "那可以改日期吗？",
    a: "可以，这就是现有的灵活性。线上购买的票可以在有效期内变更日期，指定入园日之前或之后都行，次数不限——每次变更都按新日期的价格结算。变更在官网或 App 上操作，不是在园区。",
  },
  {
    q: "我的日期售罄了——就没机会了吗？",
    a: "不一定。FAQ 表示售罄的票种可能不经预告重新开售；而当其他游客把票改到别的日期，他们空出来的名额会回到销售池，再次在线上销售。回头再查一次，比想象中值得。",
  },
];

const parkRows = [
  {
    park: "东京迪士尼乐园",
    style: "经典的迪士尼城堡式园区：巡游、烟花、合家同乐的设施",
    suits: "第一次来、带年纪小的孩子、经典迪士尼迷",
    note: "去过其他迪士尼的话，动线会很熟悉",
  },
  {
    park: "东京迪士尼海洋",
    style: "航海与水主题；更具东京独有性、风格偏成人；园内供酒",
    suits: "成人、情侣、想要不一样体验的回访者",
    note: "正在庆祝 25 周年（2026 年 4 月～2027 年 3 月）",
  },
];

const whoFor = [
  {
    title: "选东京迪士尼乐园的话…",
    desc: "你带着年纪较小的孩子，或这是你第一次去任何一座迪士尼。园区沿用经典的城堡式布局，有白天的巡游，重心放在合家同乐的设施——轻松、熟悉的一天。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V11l4-3 5 4 5-4 4 3v10z" />
        <path d="M12 21v-5" />
        <path d="M7 11V6l2-2 2 2v2" />
      </svg>
    ),
  },
  {
    title: "选东京迪士尼海洋的话…",
    desc: "你想要在别的迪士尼度假区体验不到的东西，而且你是成人或没有带小小孩。迪士尼海洋风格更偏成人，主题港湾是东京独有的，而且——和乐园不同——园内供酒。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M5 12V7a7 7 0 0 1 14 0v5" />
        <path d="M4 16c2 1.5 4-1.5 8 0s6-1.5 8 0" />
      </svg>
    ),
  },
  {
    title: "2026 年去？注意周年活动",
    desc: "东京迪士尼海洋正在庆祝 25 周年，期间为 2026 年 4 月到 2027 年 3 月。周年期间的热门日期人更多，而在浮动定价下，那些日期也正是贵的日期——所以你的日期在两个月前一开售就订下来。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 5.4 5.6.5-4.2 3.8 1.3 5.7L12 14.8 6.9 17.4l1.3-5.7L4 7.9l5.6-.5z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "先把日期与园区定下来",
    desc: "东京迪士尼的每张票都指定日期与园区，而能在一天内两座都去的一日双园票目前没有销售。两座园区就是两天、两张票。",
  },
  {
    title: "在运营日历上确认那天的时间",
    desc: "运营时间按日期而定，约五个月前公布。它决定了 After 5 票是一整个晚上还是只有一小段，也决定烟花是否落在你的入园时间内。",
  },
  {
    title: "两个月前的日本时间 14:00，守在结账页面",
    desc: "那就是你的日期开售的时刻。按你自己的时区记进日历——东京 14:00 是北京时间 13:00——因为每天的名额有上限，销售可能不经预告就停止。",
  },
  {
    title: "海外信用卡有问题就用 Klook",
    desc: "东京迪士尼度假区官网经常拒绝或拦截海外发行的信用卡。Klook 是官方授权的销售渠道，接受海外卡、界面看得懂，这也是许多海外游客选它的原因。",
  },
  {
    title: "把电子票二维码绑进官方 App",
    desc: "购票后你会拿到电子票二维码，可以绑定到东京迪士尼度假区官方 App——当天的园内功能也在那里操作。出发前先设置好。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年东京迪士尼乐园门票多少钱？",
    a: `没有单一价格：东京迪士尼度假区明确表示，园区门票按入园日期定价。官方公布的是一日票的最低价——成人（18 岁及以上）¥8,900 起、青少年（12–17 岁）¥7,400 起、儿童（4–11 岁）¥5,300 起、3 岁及以下免费——实际金额在你选好日期后才会显示。查阅于 ${CHECKED}。热门日期，特别是迪士尼海洋 25 周年期间的日期，会明显高于最低价。`,
  },
  {
    q: "东京迪士尼门票一定要提前买吗？",
    a: `实际上是的。度假区自己的 FAQ 表示，东京迪士尼乐园与东京迪士尼海洋现场不销售园区门票，所以没有门口可以买。当天购买只能在官网或官方 App、而且那天还有名额时才行，FAQ 对后果说得很直接：如果售罄，就无法入园。查阅于 ${CHECKED}。`,
  },
  {
    q: "东京迪士尼门票什么时候开售？",
    a: `每天日本时间 14:00 起，开售两个月后同一天的票——3 月 1 日入园的票在 1 月 1 日 14:00 开售——如果那个月没有对应的日期，则在下个月 1 日 14:00 开售。每笔订单最多十张，当天张数达到上限后，该日期的销售可能不经预告就停止。查阅于 ${CHECKED}。`,
  },
  {
    q: "东京迪士尼该买哪一种票？",
    a: "想在一座园区玩一整天就买一日票；想要便宜的工作日晚上就买 After 5 票；节假日傍晚 15:00 起就买 After 3 票。两座园区都想去，就每座各买一张——一日双园票目前没有销售。多日票也不销售，所以两座园区的行程就是两张指定日期的票。",
  },
  {
    q: "东京迪士尼的营业时间是几点到几点？",
    a: `时间按日期而定，没有固定的营业时间；度假区约在五个月前于官网公布，购票页面也会显示你所选日期的时间。买票前请先在运营日历上确认你那天的时间——那决定了晚间票省下的钱值不值得。查阅于 ${CHECKED}。`,
  },
  {
    q: "东京迪士尼门票可以改日期或退款吗？",
    a: `不能退款，但可以改日期。因个人原因取消与退款都不受理——关于恶劣天气、地震或其他原因无法在指定日期入园的 FAQ，也指向同一条规定。线上购买的票可以在有效期内变更日期，指定日之前或之后都行，次数不限，每次按新日期的价格结算，通过官网或 App 操作，而不是在园区。查阅于 ${CHECKED}。`,
  },
  {
    q: "我的日期售罄了——还进得去吗？",
    a: `有可能。度假区的 FAQ 表示，售罄的票种可能不经预告重新开售；而当游客把票改到其他日期，他们空出的名额会回到原本的销售池，再次在线上销售。所以回头查官网与 App 是值得的——另一个销售渠道也值得查，因为名额除了按天分配，也按销售渠道分配。查阅于 ${CHECKED}。`,
  },
  {
    q: "可以用海外信用卡买东京迪士尼门票吗？",
    a: "在东京迪士尼度假区官网上，常常不行——官网经常拒绝或拦截海外发行的信用卡，这是海外游客长期的困扰。常见的解决办法是 Klook：它是官方授权的销售渠道，接受海外卡、界面看得懂，并发送可以绑定到东京迪士尼度假区官方 App 的电子票二维码。",
  },
  {
    q: "东京迪士尼乐园和迪士尼海洋该选哪一个？",
    a: "一日票只含一座园区，所以要选。东京迪士尼乐园是经典的城堡式园区——巡游与合家同乐的设施，适合第一次来的人与带小小孩的家庭。东京迪士尼海洋是航海主题，更具东京独有性，风格偏成人，园内供酒，并正在庆祝 2026 年 4 月到 2027 年 3 月的 25 周年。第一次带小孩去，选乐园；想要与众不同，选海洋。",
  },
  {
    q: "怎么去东京迪士尼度假区？",
    a: "坐 JR 京叶线到舞滨站，从东京站出发约 15 到 20 分钟，再换乘迪士尼度假区线单轨电车，或步行一小段到乐园门口。开园前要通勤一次、夜间表演后再通勤一次，所以如果你的日期是周末或周年期间，就有理由住在舞滨或再远一站。",
  },
];

/** The same Klook products as the English page, on the zh-CN locale path. */
const tripPrepItems = [
  withKlookLocale(tokyoDisneyTripPrep[0], LOCALE, {
    label: "舞滨周边酒店",
    ctaLabel: "在 Klook 查看舞滨酒店 →",
    why: "两座园区共用的车站，从东京站坐 JR 京叶线约 15 到 20 分钟——也是迪士尼度假区线单轨电车的起点，让一早入园或看完夜间巡游再走都变得可行。",
  }),
  withKlookLocale(tokyoDisneyTripPrep[1], LOCALE, {
    label: "浦安／新浦安酒店",
    ctaLabel: "在 Klook 查看浦安酒店 →",
    why: "再往外一站，通常比度假区旁的房间便宜，其中许多酒店有自己的免费班车到园区门口——代价是要配合班车时刻表，而不是单轨电车。",
  }),
  withKlookLocale(tokyoDisneyTripPrep[2], LOCALE, {
    label: "羽田机场利木津巴士",
    ctaLabel: "查看羽田巴士 →",
    why: "羽田的商品页把东京迪士尼度假区列在目的地之中，所以这是直达度假区的机场线路，而不是先到市区车站、再拖着行李离开。",
  }),
  withKlookLocale(tokyoDisneyTripPrep[3], LOCALE, {
    label: "成田机场利木津巴士",
    ctaLabel: "查看利木津巴士 →",
    why: "从成田进来的话，同一家利木津巴士运营方开往东京市中心的酒店与车站停靠点，可以托运行李；预订前请确认你那天的停靠站列表，因为目的地按线路而不同。",
  }),
  withKlookLocale(tokyoDisneyTripPrep[4], LOCALE, {
    label: "Klook 日本流量卡（eSIM）",
    ctaLabel: "在 Klook 查看流量卡方案 →",
    why: "你的门票是绑定在东京迪士尼度假区官方 App 里的二维码，当天的园内功能也在 App 里操作——这些在只能等酒店 Wi-Fi 的手机上都用不了。",
  }),
];

const tourItems = [
  withKlookLocale(fujiDayTour, LOCALE, {
    title: "东京出发富士山一日游",
    desc: "一整天的巴士行程，前往富士山五合目、河口湖与忍野八海，当天晚上回到东京",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "东京观光巴士一日游",
    desc: "带导览的环线行程，游览皇居庭园、浅草与东京晴空塔，提供多语种语音导览",
  }),
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "东京迪士尼门票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnTokyoDisneyTicketsPage({ updated }: { updated: PageUpdated }) {
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
            东京迪士尼门票（2026）：<br />乐园与海洋怎么买、怎么选
          </h1>
          <p className={styles.heroSubtitle}>
            指定日期的票、浮动定价、现场不卖票、不能退款。这篇攻略说明一张门票多少钱、你的日期什么时候开售，
            以及该买哪一种票。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "官方票价与规定", "两个月前开售", "海外卡可走 Klook"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Lead paragraph */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            2026 年的<strong>东京迪士尼乐园门票</strong>，就是指定日期、进一座园区的一日票：成人
            <strong>¥8,900</strong> 起、12–17 岁的青少年 <strong>¥7,400</strong> 起、4–11 岁的儿童
            <strong>¥5,300</strong> 起，3 岁及以下免费——这些都是公布的最低价，因为度假区每张票都按入园日期定价，
            选好日期才会显示当天的金额。购买渠道是东京迪士尼度假区官网或官方 App，或是 Klook 这类授权销售渠道：
            <strong>两座园区门口都不卖票</strong>，而你的日期会在<strong>两个月前、每天日本时间 14:00</strong>
            开售——所以真正的截止点是那一刻，不是出发那一周；售罄的日期就是进不去。因个人原因取消不行，改日期可以。
            所有规定与数字都是度假区自己的，查阅于 {CHECKED}。
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>一日票</p>
                <p className={styles.verdictStatValue}>成人 ¥8,900 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>定价</p>
                <p className={styles.verdictStatValue}>按入园日期浮动</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>开售</p>
                <p className={styles.verdictStatValue}>两个月前，日本时间 14:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>现场／门口票</p>
                <p className={styles.verdictStatValue}>两座园区都没有</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>选好园区与日期，在运营日历上确认那天的时间，然后在两个月前开售时买下。
              没有退款，但线上购买的票可以不限次数改日期。如果官网拒绝你的海外信用卡，Klook 是官方授权的销售渠道，
              接受海外卡，并发送可以绑进官方 App 的二维码。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看东京迪士尼门票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
            </div>
          </div>
        </div>

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>2026 年东京迪士尼乐园门票多少钱？</h2>
          <p className={styles.bodyText}>
            成人 ¥8,900 起——而这个“起”字很关键。东京迪士尼度假区表示园区门票采用浮动定价、费用按入园日期而不同，
            所以公布的数字是最低价，不是定价。当天的实际金额，要在官方购票页选好日期后才会出现。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["年龄区分", "适用对象", "一日票（一座园区）"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.band}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            公布的最低价与年龄区分取自官方园区门票页，查阅于 {CHECKED}；浮动定价的规定是度假区自己 FAQ 的说法。
            这里不列上限，因为度假区没有公布固定的上限——周末或迪士尼海洋 25 周年期间的日期，会明显比最低价贵。
            东京其他指定日期的门票（每项都附查阅日期）请见我们的{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景点门票价格总表（英文）
            </Link>
            。
          </p>
        </section>

        {/* Q2 — which ticket */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票种</span>
          <h2 className={styles.sectionTitle}>东京迪士尼该买哪一种票？</h2>
          <p className={styles.bodyText}>
            玩一整天买一日票，只想要晚上就买晚间票，两座园区都想去就买两张票——能在一天内玩两座的一日双园票
            目前没有销售，多日票则完全不销售。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票种", "入园时间", "日期", "内容"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.entry}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.dates}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            票种、入园时间与一日双园票目前的状态，都是度假区自己的 FAQ 回答，查阅于 {CHECKED}。你那天有哪些票
            在卖，要看日期——期间限定的票会随度假区的活动推出或结束——所以上表是票种的大致样貌，而不是固定的清单。
          </p>
        </section>

        {/* Q3 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>营业时间</span>
          <h2 className={styles.sectionTitle}>东京迪士尼的营业时间是几点到几点？</h2>
          <p className={styles.bodyText}>
            没有固定的营业时间可以列：度假区按日期设定，并约在五个月前公布在自己的运营日历上。这比门票开售还早，
            这正是有用的地方——等你的日期开售时，你已经能看到园区那天开多久。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `度假区公布的内容（查阅于 ${CHECKED}）`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Q4 — the booking window, sell-outs and refunds, then the CTA stack. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>开售时间</span>
          <h2 className={styles.sectionTitle}>东京迪士尼门票一定要提前买吗？</h2>
          <p className={styles.bodyText}>
            是的，而且度假区直接拿掉了其他选项：东京迪士尼乐园与东京迪士尼海洋现场完全不卖园区门票。你的日期会在
            <strong>两个月前、每天日本时间 14:00</strong> 开售——也就是北京时间 13:00——每天的名额有上限，售罄后
            销售可能不经预告就停止。遇到周末、日本法定节假日或迪士尼海洋 25 周年期间的日期，那一刻就是全部。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["问题", `度假区公布的内容（查阅于 ${CHECKED}）`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            因为名额除了按天分配、也按销售渠道分配，在一个渠道售罄的日期，值得到另一个渠道查查看——而官方结账拒绝
            海外信用卡时，第三方平台也是解决办法：
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看东京迪士尼门票 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
          </div>
        </section>

        {/* Q5 — which park */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>乐园 vs 海洋</span>
          <h2 className={styles.sectionTitle}>迪士尼乐园还是迪士尼海洋——该选哪一座？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            一张票、一座园区——而一日双园票没有销售，所以这是真正的选择，不是先后顺序。经典城堡式园区与年纪小的孩子，
            选乐园；想去别处没有的园区、又赶上它的 25 周年，选海洋。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["园区", "整体特点", "最适合", "备注"].map((h) => (
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
            以上是帮你做决定的概括描述——两座园区都很大，都是整天的行程。去园区也就是从城市行程里拿掉一整天，所以通常会
            排在前段：在我们的{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={{ color: "var(--text)", fontWeight: 600 }}>
              东京五天行程（英文）
            </Link>
            里，它排在第四天。
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>适合谁</span>
          <h2 className={styles.sectionTitle}>哪一座园区适合你？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            不管选哪一座，都请先规划路线——度假区离东京市中心要坐一段电车。我们的{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              东京交通攻略（英文）
            </Link>{" "}
            整理了去那里会用到的电车、地铁与 IC 卡。
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>东京迪士尼门票怎么买？</h2>
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

        {/* Klook: the stay and the days either side. */}
        <KlookTripPrep
          label="园区日的前后"
          heading="要住在东京迪士尼度假区附近吗？"
          intro="如果你的日期是周末或周年期间，答案是要——度假区从东京站坐 JR 京叶线约 15 到 20 分钟，开园前要通勤一次、夜间巡游后再通勤一次。住在舞滨或再远一站，就把一天的头尾都省回来了。"
          items={tripPrepItems}
        />

        {/* Foreign card / Klook explainer */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>海外信用卡</span>
          <h2 className={styles.sectionTitle}>可以用海外信用卡买东京迪士尼门票吗？</h2>
          <p className={styles.bodyText}>
            在官网上常常不行。东京迪士尼度假区官网是主要的购票渠道，但它经常拒绝或拦截海外发行的信用卡——这是国际游客
            反复遇到的头疼问题；而当你要买的东西只在两个月前的某一刻开售时，问题就更严重。
          </p>
          <p className={styles.bodyText}>
            <strong>Klook 是东京迪士尼度假区官方授权的销售渠道。</strong>它接受海外卡、界面看得懂，并发送可以
            绑定到东京迪士尼度假区官方 App 的电子票二维码。这个组合——支持海外卡，加上可以绑进 App 的二维码——就是它成为
            海外游客标准解决办法的原因。如果你同时在安排东京其他行程，我们的{" "}
            <Link href="/zh-cn/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              涩谷SKY 门票攻略
            </Link>{" "}
            讲的是另一个指定日期、通过第三方平台更好订的预约。
          </p>
        </section>

        <FaqList items={faqItems} />

        {/* Klook tours in the same city. */}
        <KlookTourPicks
          heading="同一座城市出发的一日游"
          intro="去园区就是一整天，所以多数人是把迪士尼排进东京这一周，而不是把一周排进迪士尼。下面两个行程可以填掉其中一个非园区日，而且和门票在同一个 Klook 账号里结账。"
          tours={tourItems}
        />

        {/* A second authorized-reseller route. */}
        <GygCompare
          slug={GYG_SLUG}
          heading="GetYourGuide 上的同款门票"
          intro="东京迪士尼现场不卖票，售罄的日期就进不去，所以在一个平台售罄的日期是真正的死路。GetYourGuide 也有销售一日票，迪士尼乐园与迪士尼海洋都有——决定日期前，值得多开一个标签页查查看。"
          listings={[gygTokyoDisneyResort, gygTokyoDisneySea]}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "东京五天行程（2026）：逐日安排（英文）" },
            { href: "/guides/attractions/legoland-japan-tickets", title: "日本乐高乐园门票（2026）：票价、营业时间与值不值得（英文）" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "吉卜力公园门票（2026）：票价、开售时间与海外购买方式（英文）" },
            { href: "/guides/transport/tokyo-airport-limousine-bus", title: "东京机场利木津巴士（2026）：成田与羽田的票价、时间与停靠站（英文）" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "三丽鸥彩虹乐园门票（2026）：票价、浮动定价与预订方式（英文）" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "富士急乐园门票（2026）：一日券票价、Q Pack 与交通方式（英文）" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "东京华纳兄弟哈利·波特影城门票（2026）：票价与预订方式（英文）" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/zh-cn/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 门票（2026）：票价、预约方式与无界比较" },
            { href: "/guides/transport/tokyo-transportation", title: "东京交通全攻略（2026）：电车、地铁与 IC 卡（英文）" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
            { href: "/zh-cn/guides/attractions/usj-tickets-express-pass", title: "日本环球影城门票与快速通行证（2026）：该买哪一种" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "东京看相扑（2026）：本场所门票与晨练参观（英文）" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先把东京迪士尼的日期锁住</h2>
            <p className={styles.ctaBannerDesc}>
              现场不卖票，售罄的日期就进不去，而你的日期在两个月前的日本时间 14:00 开售。Klook 是官方授权的销售渠道，
              接受海外信用卡，并发送可以绑定到官方 App 的二维码。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看东京迪士尼门票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
