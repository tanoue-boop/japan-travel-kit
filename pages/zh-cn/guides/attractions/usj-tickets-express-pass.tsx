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
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import GygCompare, { GygCompareButton } from "../../../../components/GygCompare";
import { gygUsj, gygUsjExpressPass } from "../../../../lib/gyg-links";
import {
  jrHarukaUrl,
  jrKansaiMiniPass,
  klookEsim,
  nankaiRapitUrl,
  usjSameDayPrep,
  usjStayAreas,
  usjTripPrep,
  type KlookStayArea,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { cnUsjExpressPass, cnUsjStudioPass } from "../../../../lib/klook-links-zh-cn";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English guide (pages/guides/attractions/usj-tickets-express-pass.tsx) as of
// 2026-11-01: same sections, tables, FAQ and Klook / GetYourGuide blocks in the same order.
// No figure is added here; every fact and date is the English page's own.

const ROUTE = "/zh-cn/guides/attractions/usj-tickets-express-pass";
const TITLE = "日本环球影城门票与快速通行证（2026）：该买哪一种";
const DESC =
  "USJ 现在一律网上购票，超级任天堂世界需要指定时间入园。Studio Pass 的分级定价、快速通行证值不值得，以及 2026 年该买哪一种。";

const LOCALE = "zh-cn" as const;
const GYG_SLUG = "zh-cn-usj-tickets-express-pass";

const STUDIO_PASS_URL = cnUsjStudioPass.url;
const EXPRESS_PASS_URL = cnUsjExpressPass.url;
const HOTELS_URL = klookFor(usjStayAreas[0].url, LOCALE);
const HARUKA_URL = klookFor(jrHarukaUrl, LOCALE);
const RAPIT_URL = klookFor(nankaiRapitUrl, LOCALE);
const MINI_PASS_URL = klookFor(jrKansaiMiniPass.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const CHECKED = dateLabel("2026-10-26", LOCALE);
const CHECKED_USJ = dateLabel("2026-10-27", LOCALE);

const ticketRows = [
  { ticket: "一日 Studio Pass", what: "一天的入园资格；一般设施走普通排队", price: "按日期定价——当天价格在结账时显示" },
  { ticket: "两日 Studio Pass", what: "连续两天入园，平均每天通常更便宜", price: "按日期定价——当天价格在结账时显示" },
  { ticket: "快速通行证（加购）", what: "可以在指定的几个游乐项目使用更短的快速通道。不是入园票——还需要 Studio Pass 或年卡", price: "按日期定价，采用 USJ 自 2018 年起为快速通行证引入的制度" },
];

const variantRows = [
  {
    pass: "快速通行证 4",
    covers: "包含四个项目。USJ 把这一款描述为玩必玩项目用的通行证；具体是哪四项，按版本和日期固定。",
    snw: "只有注明包含的版本才有",
    bestFor: "时间短的一天、第二次来，或游客较少时只想体验主要热门项目",
  },
  {
    pass: "快速通行证 7",
    covers: "包含七个项目——多数第一次来的游客在两种数量中会选的较大那一款，包含的项目同样按版本而定。",
    snw: "只有注明包含的版本才有",
    bestFor: "只有一天、第一次来、人多的日子",
  },
  {
    pass: "其他数量与主题版本",
    covers: "USJ 也卖以单个项目或季节性项目组合为主的快速通行证，包含的项目各不相同，会随乐园活动推出和下架。",
    snw: "因版本而异",
    bestFor: "有某一项非玩不可的设施，而不是想尽量多玩几个项目",
  },
  {
    pass: "含区域入场的版本",
    covers: "部分快速通行证附带超级任天堂世界的区域指定时间入场券，可以在抵达前就确定入区时段。",
    snw: "有——多花的钱买的就是这个",
    bestFor: "超级任天堂世界就是这趟旅行理由的人",
  },
];

const pricingRows = [
  {
    what: "快速通行证价格",
    usj: "有效快速通行证的种类和价格，因日期而异。",
    source: "Universal Express Pass 页面，usj.co.jp",
  },
  {
    what: "这套做法实施多久了",
    usj: "快速通行证自 2018 年起即采用类似的需求定价制度，目前没有变更计划。",
    source: "《Pricing for Studio Passes to Change》，2026年6月30日，usj.co.jp",
  },
  {
    what: "Studio Pass 价格（你同时需要的入园票）",
    usj: "2026年7月1日起销售、适用于2026年9月1日起入园的门票，每日价格按需求重新评估。儿童和老人票价也会变动；年卡不在此列。",
    source: "《Pricing for Studio Passes to Change》，2026年6月30日，usj.co.jp",
  },
  {
    what: "USJ 官方建议",
    usj: "价格可能上涨，请尽早购买。",
    source: "《Pricing for Studio Passes to Change》，2026年6月30日，usj.co.jp",
  },
];

const windowRows = [
  {
    q: "最早可以提前多久买？",
    a: "大约在入园日前两个月，在官方 WEB Ticket Store 和 Lawson Ticket（网站以及罗森便利店内的 Loppi 机器）开售。",
    source: "购票期间公告，2025年4月21日，usj.co.jp",
  },
  {
    q: "这个期间曾经更长吗？",
    a: "有。大阪世博会期间（入园日截至2025年10月13日）放宽为三个月，USJ 表示之后会恢复为约两个月。",
    source: "购票期间公告，2025年4月21日，usj.co.jp",
  },
  {
    q: "每天卖多少张？",
    a: "每天数量有限——USJ 官方网站注明，经常会提前售罄。",
    source: "Universal Express Pass 页面，usj.co.jp",
  },
  {
    q: "可以改到别的日期吗？",
    a: "不行。提前购买的快速通行证只在票面日期有效；指定时间的设施如果迟到，既不退款，也不能改到其他时段。",
    source: "Universal Express Pass 页面，usj.co.jp",
  },
];

const needRows = [
  {
    date: "日本学校假期以外、人少的工作日",
    verdict: "通常可以不买",
    why: "普通排队最短，而通过官方 App 免费领取区域指定时间入场的方式，在你入园时最有可能还有名额。",
  },
  {
    date: "周六或周日",
    verdict: "买",
    why: "按日期定价反映的正是周末需求。这是快速通行证的一般情况，便宜的版本会最先售罄。",
  },
  {
    date: "日本法定节假日或小长假",
    verdict: "买，而且要早买",
    why: "国内需求叠加在游客需求之上，每天的配额又有上限。这些日子，你想要的版本最有可能已经售罄。",
  },
  {
    date: "25 周年与冬季假期日期",
    verdict: "入园日期一开售就买",
    why: `2026 年是 USJ 的 25 周年，USJ 官方新闻稿也在2026年9月14日推出 Holiday Kids Free Pass，邀请全日本的儿童今冬免费入园——同样的日期会有更多家庭，于${CHECKED_USJ}查阅。`,
  },
  {
    date: "主要为超级任天堂世界而去",
    verdict: "买含区域入场的版本",
    why: "这是在抵达前就确定入区时段的唯一方式。免费的方式确实存在，但那是当天在园内先到先得。",
  },
];

const buyRows = [
  {
    where: "USJ WEB Ticket Store（官方）",
    what: "入园当天在售的所有版本，按当天价格销售",
    note: "约两个月前开售。热门开售日请做好线上排队的准备。",
  },
  {
    where: "Lawson Ticket——网站和 Loppi 机器",
    what: "USJ 指定的另一个官方渠道",
    note: "在 USJ 2025年4月21日的购票期间公告中，与 WEB Ticket Store 并列。",
  },
  {
    where: "Klook",
    what: "单独销售的快速通行证，购票页面易于操作、支持境外信用卡支付，并提供电子票",
    note: "USJ 官方指定时间入场页面注明，区域入场也可以通过特定旅行社提前获得。",
  },
  {
    where: "GetYourGuide",
    what: "单独销售的快速通行证，作为第二个购买渠道",
    note: "第一个渠道在入园日期已售罄时值得看看——配额除了每天有上限，也是按销售渠道分配的。",
  },
];

const steps = [
  {
    title: "先定日期，再买 Studio Pass",
    desc: "这页的其他内容都以日期为准。USJ 已不在园区入口销售当日票，所以 Studio Pass 要网上购买——而它正是快速通行证不包含的入园票。",
  },
  {
    title: "判断这个日期需不需要快速通行证",
    desc: "参考上面的“买还是不买”表。人少的工作日常常不需要；周末、日本法定节假日或周年日期就需要。",
  },
  {
    title: "确认版本是否包含超级任天堂世界",
    desc: "区域入场是另外的附加内容，不是理所当然。如果主要为超级任天堂世界而去，就买注明含区域指定时间入场券的版本。",
  },
  {
    title: "出发前先安装官方 USJ App",
    desc: `USJ 官方指定时间入场页面注明，自2026年1月5日起，必须用官方 App 领取区域指定时间入场券和 Standby Entry Ticket，而且要先在 App 里绑定你的入园票。于${CHECKED_USJ}查阅。`,
  },
  {
    title: "开园前就到",
    desc: "人多的日子，开门时间可能比公布的早。提早到，才能让免费的区域指定时间入场方式变得现实可行——如果你买的版本不含区域入场的话。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "USJ 门票一定要提前买吗？",
    a: "要。日本环球影城已停止在园区入口销售当日票，所以要在出发前网上购买。通过 Klook 这类代售平台预订，购票页面易于操作、支持境外信用卡支付，并发送入园时可扫描的电子票。",
  },
  {
    q: "2026 年的 USJ 快速通行证值得买吗？",
    a: `人多的日子，值得。2026 年是 USJ 的 25 周年——乐园官方新闻稿在2026年9月14日和9月28日发布了周年相关消息，于${CHECKED_USJ}查阅——周末或法定节假日，快速通行证能让你不必排好几个小时的普通队伍，改走更短的快速通道，含区域入场的版本还附带超级任天堂世界的入区资格。人少的淡季工作日就没那么必要：普通排队最短，用 App 免费进入该区域也最有可能还有名额。`,
  },
  {
    q: "快速通行证 4 和快速通行证 7 有什么区别？",
    a: "数字代表通行证包含的项目数量——四个或七个。USJ 把快速通行证 4 描述为玩必玩项目用的那一款，快速通行证 7 则是两者中包含项目更多的。实际包含的项目按版本和日期固定，超级任天堂世界的区域入场也只有注明包含的版本才有，所以购买前请确认入园当天的具体内容。",
  },
  {
    q: "没有 Studio Pass 可以只用快速通行证吗？",
    a: `不行。USJ 官方快速通行证页面写明，入园需要 Studio Pass（或年卡），快速通行证之外还需要另外的乐园入场券。快速通行证只是在你入园后缩短排队。于${CHECKED_USJ}查阅。`,
  },
  {
    q: "日本环球影城快速通行证最早可以提前多久买？",
    a: `大约在入园日前两个月。USJ 2025年4月21日的官方购票期间公告说，门票——Studio Pass、快速通行证等——约在两个月前于官方 WEB Ticket Store 和 Lawson Ticket 开售；大阪世博会期间（入园日截至2025年10月13日）曾放宽为三个月，之后恢复为约两个月。于${CHECKED_USJ}查阅。`,
  },
  {
    q: "USJ 快速通行证可以改日期或退款吗？",
    a: `请当作不能改。USJ 官方快速通行证页面写明，提前购买的通行证只在票面日期有效；指定时间的设施如果迟到，不退款，也不能改到其他时段。于${CHECKED_USJ}查阅。`,
  },
  {
    q: "怎么进超级任天堂世界？",
    a: `有两种方式，都是 USJ 官方的：提前购买含区域指定时间入场券的快速通行证版本，或在入园后通过官方 USJ App 领取。USJ 的指定时间入场页面也说，自2026年1月5日起，必须用官方 App 领取区域指定时间入场券和 Standby Entry Ticket，而且要先在 App 里绑定入园票。于${CHECKED_USJ}查阅。人少的日子也许可以直接走进去，但不该把行程押在这上面。`,
  },
  {
    q: "日本环球影城快速通行证多少钱？",
    a: `USJ 没有公布固定价格。其官方快速通行证页面说，有效快速通行证的种类和价格因日期而异；2026年6月30日关于 Studio Pass 定价的公告也说，快速通行证自 2018 年起采用需求定价制度，目前没有变更计划。当天价格会在结账时显示，所以这里不列日元价格——于${CHECKED_USJ}查阅。`,
  },
  {
    q: "去日本环球影城住哪里好？",
    a: `想在开园时就到门口，住环球城；否则住梅田或大阪站一带。从 JR 梦咲线的环球城站步行到乐园大门约五分钟，从大阪站到乐园约 20 分钟——两个数字都是大阪观光局（Osaka Convention & Tourism Bureau）发布的，于${CHECKED}查阅。JR 西日本官方的目的地页面把环球城站列为乐园最近的车站，并形容乐园“就在旁边”。取舍在于其余行程：住在梅田和大阪站一带，方便利用 JR 主要线路，而环球城的酒店只有一小片，人多的日子最先订满。`,
  },
  {
    q: "从关西机场或大阪站怎么去 USJ？",
    a: `车站是 JR 梦咲线（樱岛线）的环球城站，通常在西九条换乘，大阪观光局说从大阪站到乐园约 20 分钟。从关西机场没有直达列车：JR 西日本的 HARUKA 无需换乘直达天王寺、大阪、新大阪和京都——以短期滞在身份入境的外国护照持有人可购买的优惠单程票，截至2026年10月31日，到天王寺 ¥1,300、到大阪或新大阪 ¥1,800，2026年11月1日起调整为 ¥1,600 和 ¥1,900——或坐南海 Rapi:t 到难波，最快 34 分钟，除车费外另需成人 ¥700 的特急券。之后都坐环状线到西九条，再换乘梦咲线。所有数字于${CHECKED}查阅。`,
  },
  {
    q: "USJ 快速通行证当天要怎么使用？",
    a: "在快速通行证入口向工作人员出示显示完整 QR 码的电子票页面。部分设施的时间印在票上，其余在营业时间内随时可玩。指定时间迟到不退款也不能改时段，票券每人一张。依 usj.co.jp 的搜索索引内容，2026 年 11 月 6 日查阅。",
  },
  {
    q: "有哪张大阪或关西的通票包含 USJ 吗？",
    a: `乐园本身不在大阪周游卡（Osaka Amazing Pass）的范围内，也没有任何大阪地铁通票包含前往环球城的 JR 路段。铁路方面，JR 西日本官方的关西地区铁路周游券页面把 WEST QR Kansai Mini Pass 描述为“京都、日本环球影城、大阪、难波、神户、奈良 3 日无限乘坐”——成人 ¥3,000、儿童 ¥1,500，连续三天可乘坐普通、快速和新快速列车，但不能乘坐包括 HARUKA 在内的任何特急。WEST QR Kansai Area Pass 则可乘坐 HARUKA，自由席不限次数加两次指定席，一日 ¥2,700 到四日 ¥6,700。于${CHECKED}查阅。以上都不含乐园门票——入园始终需要另外购买 Studio Pass。`,
  },
];

// Same products, same order as the English usjSameDayPrep — on Klook's zh-CN path.
const sameDayCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "日本环球影城周边酒店（环球城）",
    ctaLabel: "在 Klook 查看环球城酒店 →",
    why: "与我们大阪住宿攻略使用的同一个 Klook 酒店搜索。从环球城站步行到乐园大门约五分钟，适合打算开园前就到门口的早晨。",
  },
  {
    label: "大阪周游卡（1日／2日）",
    ctaLabel: "查看大阪周游卡 →",
    why: "用在乐园前后的大阪行程，而不是乐园当天：包含大阪地铁、市营巴士和 40 多处设施入场，但不含日本环球影城，也不含前往环球城的 JR。",
  },
  {
    label: "JR HARUKA 关西机场特急车票",
    ctaLabel: "查看 HARUKA 车票 →",
    why: "从关西机场直达天王寺、大阪或新大阪——USJ 行程的出发车站；Klook 商品页注明，仅限以“短期滞在（Temporary Visitor）”身份入境的非日本护照持有人购买。",
  },
  {
    label: "大阪美食导览（道顿堀小巷）",
    ctaLabel: "查看大阪美食导览 →",
    why: "留给不去乐园那天的晚上：3 小时的拼团步行导览，离开道顿堀大街，有炸串、章鱼烧、小巷里的居酒屋和当地甜点。",
  },
  {
    label: "Klook 日本 eSIM 流量卡",
    ctaLabel: "查看 Klook eSIM 方案 →",
    why: "超级任天堂世界的区域指定时间入场通过 USJ 官方 App 办理，当天在园内使用，Studio Pass 也是电子票——两者都需要你在排队现场有流量，而不只是酒店 Wi-Fi。",
  },
];
const sameDayPrep: KlookTripPrepItem[] = usjSameDayPrep.map((item, i) => withKlookLocale(item, LOCALE, sameDayCopy[i]));

const stayCopy: Pick<KlookStayArea, "area" | "why">[] = [
  {
    area: "环球城（Universal City）",
    why: "按大阪观光局发布的数字，从环球城站步行到乐园大门约五分钟——想在开园前就站在门口的那一天，这正是住这一区的全部理由。",
  },
  {
    area: "梅田／大阪站",
    why: "梦咲线直通班次的始发地：观光局说从大阪站到乐园约 20 分钟，而且其余行程也方便利用 JR 主要线路——京都线、神户线、环状线，以及新大阪的新干线。",
  },
  {
    area: "天王寺",
    why: "更便宜的 JR 沿线落脚点，也是 HARUKA 从关西机场出发后的第一个市区停靠站；坐环状线到西九条换乘梦咲线，不用穿过市中心。",
  },
  {
    area: "难波",
    why: "如果乐园只是大阪行程中的一天就选这里：道顿堀和黑门市场步行可达，也是南海的终点站——南海表示 Rapi:t 到关西机场最快 34 分钟，回国那天很方便。",
  },
];
const stayAreas: KlookStayArea[] = usjStayAreas.map((area, i) => withKlookLocale(area, LOCALE, stayCopy[i]));

const tripPrepCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "大阪周游卡（1日／2日）",
    ctaLabel: "查看大阪周游卡 →",
    why: "这一项请看仔细：周游卡不含日本环球影城，也不含前往环球城的 JR。它适用于大阪行程的其他日子——大阪地铁和市营巴士不限次乘坐，加上 40 多处设施入场。",
  },
  {
    label: "京都＋奈良一日游（清水寺、伏见稻荷和奈良公园）",
    ctaLabel: "查看京都奈良一日游 →",
    why: "专程飞到大阪玩主题乐园的人，第二天最顺理成章的安排：清水寺、伏见稻荷和奈良公园一次订好，从大阪出发，路线完全不用自己规划。",
  },
  {
    label: "Klook 日本 eSIM 流量卡",
    ctaLabel: "查看 Klook eSIM 方案 →",
    why: "USJ 的指定日期 Studio Pass 是电子票，超级任天堂世界的区域指定时间入场也通过官方 App 办理，当天在园内使用——排队时才发现手机没有流量，是最糟糕的情况。",
  },
];
const tripPrep: KlookTripPrepItem[] = usjTripPrep.map((item, i) => withKlookLocale(item, LOCALE, tripPrepCopy[i]));

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "日本环球影城门票与快速通行证" },
];

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnUsjTicketsPage({ updated }: { updated: PageUpdated }) {
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

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            日本环球影城快速通行证（2026）：<br />票种、价格及是否需要购买
          </h1>
          <p className={styles.heroSubtitle}>
            快速通行证 4 和快速通行证 7 分别包含哪些项目、为什么价格随日期变动，以及哪些日子只买 Studio Pass 就够了。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "快速通行证 4 vs 7", "超级任天堂世界", "买还是不买"].map((t) => (
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
          <p className={styles.bodyText}>
            <strong>日本环球影城快速通行证（Express Pass）</strong>是付费加购项目，可以在指定的几个游乐项目使用更短的快速通道——它不是入园票，同一天你仍然需要
            Studio Pass（或年卡）。它按包含项目数量分为不同编号的版本——<strong>快速通行证 4</strong> 和<strong>快速通行证 7</strong>
            是多数人会选的两款，另外还有按主题或项目组合推出的版本，以及附带超级任天堂世界区域入场的版本——每张都限定使用日期，不同版本包含的项目各不相同，价格也按日期而定：USJ
            官方网站注明，有效快速通行证的种类和价格因日期而异，而且每天只卖有限数量、经常提前售罄。所以“是否需要购买”主要取决于日期：周末、日本法定节假日或
            25 周年的日子，正是快速通行证最能发挥作用的时候；人少的工作日通常不需要。以上均于{CHECKED_USJ}查阅。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>每个人都要买</p>
                <p className={styles.verdictStatValue}>Studio Pass（网上）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>这些日子加快速通行证</p>
                <p className={styles.verdictStatValue}>周末／节假日／周年</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>价格</p>
                <p className={styles.verdictStatValue}>因日期而异——没有固定价格</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>开售</p>
                <p className={styles.verdictStatValue}>约两个月前，每天限量</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>先买 Studio Pass 入园，再按日期决定快速通行证。只有一天又是人多的日子、想体验主要热门项目，选快速通行证 7；入园日游客较少，或只想体验几个最热门的项目，选快速通行证
              4；如果超级任天堂世界是这趟的重点，选含区域入场的版本。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={STUDIO_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 门票（Studio Pass）→
              </KlookLink>
            </div>
          </div>
        </div>

        <BookingEsimCard />

        {/* Order on purpose (1 Nov 2026), as on the English page: Studio Pass, then the
            same-day bookings, then the Express Pass. */}
        <KlookTripPrep
          label="同一天要订的"
          heading="和 USJ 门票（Studio Pass）一起预订的项目"
          intro="Studio Pass 让你入园；乐园那一天还需要住宿、往返大阪市区的交通和手机流量。以下五项都能用同一个 Klook 账号，和门票一起预订。"
          items={sameDayPrep}
        />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速通行证</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              快速通行证是加购项目，不是入园票——同一天需要另外有 Studio Pass，而且每天的配额有上限。请按入园日期，参考下方内容决定。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={EXPRESS_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 快速通行证 →
              </KlookLink>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} label="到 GetYourGuide 比较快速通行证 →" />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>通行证介绍<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>日本环球影城快速通行证是什么？</h2>
          <p className={styles.bodyText}>
            它是绑定日期的加购项目，可以在指定的几个游乐项目改走更短的快速通道，而不是普通排队。它<strong>不是</strong>入园票：USJ
            官方快速通行证页面说，需要另外的乐园入场券，所以同一天必须有 Studio Pass 或年卡。于{CHECKED_USJ}查阅。
          </p>
          <p className={styles.bodyText}>
            比较版本之前还有两个细节。通行证上的设施有些是指定时间、有些不是——不指定时间的，USJ 说营业时间内随时都能使用——使用时在设施的快速通行证入口出示二维码。另外，通行证只适用于票面列出的项目，所以你买哪个版本，比票面上的数字更重要。
          </p>
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
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            USJ 定价规则于{CHECKED_USJ}在 usj.co.jp 查阅。表中没有日元价格，因为 USJ 没有公布固定价格——请看下方的价格部分。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>价格<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>日本环球影城快速通行证多少钱？</h2>
          <p className={styles.bodyText}>
            没有单一答案，这是 USJ 官方的做法，并非本站说法含糊：它的快速通行证页面说，有效快速通行证的种类和价格因日期而异；2026年6月30日关于
            Studio Pass 定价的公告也说，快速通行证自 2018 年起采用需求定价制度，目前没有变更计划。你能据此规划的是规则，所以这张表列的就是规则。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["项目", "USJ 的说法", `出处（${CHECKED_USJ}查阅）`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.usj}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            为什么不列价格区间：能显示价格的两个地方都无法使用。USJ 的会员购票页在{CHECKED_USJ}返回服务器错误（HTTP 503），官方 WEB Ticket Store
            则采用线上排队机制。与其照搬第三方网页的数字，本攻略列出 USJ 的定价规则，并请你以当天结账时的价格为准。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>选哪个版本<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>快速通行证 4 还是 7——该买哪一个？</h2>
          <p className={styles.bodyText}>
            人多的日子又是第一次来，选快速通行证 7；日期较清闲、时间短，或是第二次来只想体验几个最热门的项目，选快速通行证
            4。数字代表通行证包含的项目数量，具体项目按版本和日期固定——所以请看入园当天的具体内容，而不是票面上的数字。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["版本", "包含项目", "超级任天堂世界", "适用人群"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {variantRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            版本名称和区域入场规则于{CHECKED_USJ}在 usj.co.jp 查阅。某一天有哪些版本，要看那一天——项目组合会随乐园活动变动，所以上表描述的是整体情况，而不是固定的商品目录。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>买还是不买<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>去日本环球影城需要快速通行证吗？</h2>
          <p className={styles.bodyText}>
            几乎完全取决于日期，而不是个人。人少的工作日，通常只买 Studio Pass 就够了；周末、日本法定节假日或 25
            周年的日子，快速通行证决定的是你能直接玩到热门项目，还是要排长队。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["入园日期", "要买快速通行证吗？", "原因"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {needRows.map((row) => (
                    <tr key={row.date}>
                      <td className={styles.tdProvider}>{row.date}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 600 }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={EXPRESS_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看快速通行证 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} label="到 GetYourGuide 比较快速通行证 →" />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            日期定下来之后，接着要订的有三件事——乐园大门旁的房间、从关西机场进市区的交通，以及当天使用乐园官方 App 所需的流量：
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看环球城酒店 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看 HARUKA 车票 →
            </KlookLink>
            <KlookLink href={MINI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看 Kansai Mini Pass →
            </KlookLink>
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看 Klook eSIM 方案 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>售罄<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>USJ 快速通行证什么时候会售罄？</h2>
          <p className={styles.bodyText}>
            当天配额售完的时候——USJ 官方网站注明每天数量有限、经常提前售罄，所以没有“提前这么久就一定能买到”的标准，只能越早越好。可购买期间大约是两个月，这是最需要了解的一点。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["问题", "USJ 公布的内容", `出处（${CHECKED_USJ}查阅）`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {windowRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            实际上，这让快速通行证成为订完机票和住宿后第一个要订的东西，而不是最后一个。这时第二个购票渠道就值得查一查：配额除了每天有上限，也是按销售渠道分配的，所以一个网站售罄的日期，不一定所有渠道都售罄了。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>购买方式<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>日本环球影城快速通行证怎么买？</h2>
          <p className={styles.bodyText}>
            网上购买、指定日期，直接向 USJ 买或通过代售平台买。USJ 官方购票期间公告指定官方 WEB Ticket Store 和 Lawson Ticket
            为销售渠道，开售时间约在入园日前两个月；代售平台卖的是同样绑定日期的商品，并提供易于操作的购票页面。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["渠道", "能买到什么", "值得知道"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            销售渠道和购买期间出自 USJ 2025年4月21日的购票期间公告；通过旅行社进入超级任天堂世界的方式出自 USJ 的指定时间入场页面。两者均于{CHECKED_USJ}查阅。
            不管在哪里买，通行证都绑定日期，改期和退款都受限制——定日期之前，请先看下方常见问题中关于取消的那一题。
          </p>
          <div className={styles.stepsList} style={{ marginTop: "1.5rem" }}>
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
          <span className={styles.sectionLabel}>当天使用<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>USJ 快速通行证当天怎么用？</h2>
          <ul className={styles.bodyList}>
            <li><strong>指定时间的设施：</strong>部分设施的时间印在票上，须按该时间前往。迟到不退款，也不能改时段。</li>
            <li><strong>不指定时间的设施：</strong>其余设施在营业时间内随时可玩。</li>
            <li><strong>乘坐时：</strong>在快速通行证入口向工作人员出示显示完整 QR 码的电子票页面。</li>
            <li><strong>同一栏只能选一项：</strong>同一格印有多项设施时，只能使用其中一项。</li>
            <li><strong>每人一张：</strong>票券为个人使用，同行每人都需要自己的票。</li>
            <li><strong>单人乘坐：</strong>与快速通行证无关的另一套制度：与同行者分开，填补空位。部分日期与时段不能使用，请询问各设施的工作人员。</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            依 USJ 快速通行证与 FAQ 页面的搜索索引内容，2026 年 11 月 6 日查阅。时间可能变动，请以你票上的时间为准。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>超级任天堂世界<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>快速通行证包含超级任天堂世界吗？</h2>
          <p className={styles.bodyText}>
            只有版本上注明的才有。区域入场是另外的附加内容，不是每一张快速通行证都有——USJ
            官方指定时间入场页面描述了两种进入该区域的方式：提前通过特定的快速通行证或特定旅行社获得，或在入园后通过官方 USJ App 领取。
          </p>
          <p className={styles.bodyText}>
            App 是免费的方式，也是规定变严的那一个。USJ 表示，自2026年1月5日起，必须用官方 App 领取区域指定时间入场券和 Standby Entry
            Ticket：先在 App 里绑定你的入园票，再选择区域、人数和时段，然后在区域入口出示二维码。于{CHECKED_USJ}查阅。这是当天先到先得，也正因如此，含区域入场的快速通行证版本，是出发前就能确定超级任天堂世界入区时段的唯一方式。出发前就安装
            App 并绑定门票——在排队时才发现手机没有流量，是最容易避免的问题。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>住宿<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>去日本环球影城住哪里好？</h2>
          <p className={styles.bodyText}>
            <strong>想在开园时就到门口，住环球城；否则住梅田或大阪站一带。</strong>从 JR 梦咲线的环球城站步行到乐园大门约五分钟，从大阪站到乐园约 20
            分钟——两个数字都是大阪观光局（Osaka Convention &amp; Tourism Bureau）发布的，于{CHECKED}查阅。JR
            西日本官方的乐园目的地页面把环球城站列为最近的车站，并形容乐园“就在旁边”，同日查阅。
          </p>
          <p className={styles.bodyText}>
            步行就能到，就是住这一区的全部理由。买了快速通行证的日子，你会想早点过闸，而环球城是唯一能把交通变成五分钟步行的区域。反过来的考量是其余行程：住在梅田和大阪站一带，方便利用
            JR 主要线路，而环球城的酒店只有一小片，人多的日子最先订满。我们的{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>
              大阪住宿区域攻略（英文）
            </Link>{" "}
            按线路和机场交通比较了四个区域，{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>
              大阪两天行程（英文）
            </Link>{" "}
            则说明乐园那一天怎么搭配城市其他行程。
          </p>
        </section>

        <KlookStayAreas
          heading="USJ 酒店搜索：按区域查看"
          intro="还剩哪些房间、价格多少，要看日期，所以每个区域都直接链接到 Klook 该区的酒店搜索。设定 Studio Pass 的入园日期，拿环球城和其中一个 JR 沿线落脚点比较——人少的工作日区别通常在价格，周年周末区别通常在有没有房。"
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>从关西机场或大阪站怎么去 USJ？</h2>
          <p className={styles.bodyText}>
            USJ 在大阪西侧的此花区，车站是 JR 梦咲线（樱岛线）的环球城站——通常在西九条换乘。JR
            西日本把环球城站列为乐园最近的车站，大阪观光局则说从该站步行到大门约五分钟、从大阪站到乐园约 20 分钟。两者均于{CHECKED}查阅。JR
            西日本的英文网站没有公布梦咲线段的门到门时间，所以这里不列。
          </p>
          <p className={styles.bodyText}>
            从<strong>关西机场</strong>进市区有两个合理的选择，但都不会直达乐园。JR 西日本的 HARUKA 从机场无需换乘直达天王寺、大阪、新大阪和京都；它的优惠单程票——只卖给以短期滞在身份入境的外国护照持有人——截至2026年10月31日，到天王寺
            ¥1,300、到大阪或新大阪 ¥1,800，2026年11月1日起调整为 ¥1,600 和 ¥1,900，儿童半价。南海 Rapi:t 无需换乘到难波，最快 34
            分钟，除普通车费外另需特急券，成人 ¥700、儿童 ¥350——在车上购买贵 ¥300，使用无纸化购票（ticketless）方式可便宜 ¥150。JR 西日本和南海的数字均于{CHECKED}查阅。不管哪一种，之后都坐环状线到西九条，再换乘梦咲线。
          </p>
          <p className={styles.bodyText}>
            有一张票值得了解：JR 西日本官方的关西地区铁路周游券页面把 <strong>WEST QR Kansai Mini Pass</strong>{" "}
            描述为“京都、日本环球影城、大阪、难波、神户、奈良 3 日无限乘坐”，票价成人 ¥3,000、儿童 ¥1,500，连续三天可乘坐普通列车，含新快速和快速。它不能乘坐任何特急，HARUKA
            也包括在内——JR 西日本表明那需要另外买票。可乘坐 HARUKA 的是 <strong>WEST QR Kansai Area Pass</strong>（自由席不限次数，加两次指定席），一日
            ¥2,700 到四日 ¥6,700。以上均于{CHECKED}查阅。两张都不能乘坐大阪地铁，也没有任何大阪地铁通票可以坐到环球城。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看 HARUKA 车票 →
            </KlookLink>
            <KlookLink href={RAPIT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看南海 Rapi:t →
            </KlookLink>
            <KlookLink href={MINI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看 Kansai Mini Pass →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            规划路线可参考我们的{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={linkStyle}>
              大阪机场交通攻略（英文）
            </Link>
            （含 HARUKA 与南海 Rapi:t 比较）、{" "}
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>
              大阪市内交通攻略（英文）
            </Link>{" "}
            的一日券选择，或{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={linkStyle}>
              关西地区铁路周游券攻略（英文）
            </Link>{" "}
            查看上述 JR 通票的完整介绍。
          </p>
        </section>

        <KlookTripPrep
          label="一起预订"
          heading="大阪之旅还要订什么？"
          intro="乐园只是其中一天。以下三项是同一趟旅行通常还需要的，第一项放在这里，主要是为了避免你因为错误的理由买它。"
          items={tripPrep}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/where-to-stay-in-osaka", title: "大阪住宿区域推荐（2026）：按线路和机场交通比较（英文）" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "大阪海游馆门票（2026）：票价、开放时间和入场时段（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪必玩清单（2026）：周游卡划算与不划算的地方（英文）" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周游卡（2026）：一天 ¥3,500 值得吗？（英文）" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "大阪出发京都奈良一日游（2026）：该订哪个行程（英文）" },
            { href: "/guides/transport/osaka-airport-transfer", title: "大阪机场交通攻略（2026）：关西机场和伊丹机场到市区（英文）" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "大阪两天行程（2026）：每日安排和要预订的项目（英文）" },
            { href: "/guides/transport/osaka-transportation", title: "大阪市内交通（2026）：地铁、电车和 IC 卡（英文）" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
            { href: "/zh-cn/guides/attractions/tokyo-disney-tickets", title: "东京迪士尼门票（2026）：迪士尼乐园与迪士尼海洋怎么选、怎么买" },
            { href: "/guides/transport/osaka-metro-pass", title: "大阪地铁通票 vs Enjoy Eco Card（2026）：游客该买哪一张？（英文）" },
          ]}
        />

        <GygCompare
          slug={GYG_SLUG}
          heading="在 GetYourGuide 购买 USJ 门票和快速通行证"
          intro="快速通行证每天限量、绑定票面日期，所以你想要的那一款常常已经售罄。GetYourGuide 单独销售快速通行证——和其他地方一样，它不含乐园入场——Studio Pass 则另外销售。如果上面的渠道在入园日期已售罄，改行程日期之前先来这里试试。"
          listings={[gygUsjExpressPass, gygUsj]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>在 USJ 少排队</h2>
            <p className={styles.ctaBannerDesc}>
              网上买 Studio Pass 入园，再加上入园当天需要的快速通行证版本——每天的配额有上限，含超级任天堂世界区域入场的版本最先售罄。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={EXPRESS_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 USJ 门票与快速通行证 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
