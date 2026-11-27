import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import { seoTags } from "../../../../components/IntlSeo";
import {
  KLOOK_REL,
  Breadcrumb,
  Disclosure,
  FaqList,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import { cnKlookEsim, cnTokyoSubwayTicket } from "../../../../lib/klook-links-zh-cn";
import { attractionPrices, checkedLabel, latestChecked } from "../../../../lib/attraction-prices";
import { pageUpdated } from "../../../../lib/page-dates";
import { itemListJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, TRANSLATED_PAGES, editionGuideCount, editionPageCount, zhDateLabel, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions";
// task-jtk-20261116-R02: same structure as the English hub — "which Japan attraction
// tickets to book in advance, and when" — title, answer, booking-window table and FAQ.
// task-jtk-20261119-C01: "东京・大阪・京都" added to title, description and H1, and the five
// most-read zh-cn guides linked above the fold.
const TITLE = "日本景点门票 2026：东京・大阪・京都哪些要提前预约与票价";
const DESC =
  "日本景点门票（东京・大阪・京都）：吉卜力美术馆每月10日开售，迪士尼与环球影城约2个月前，SHIBUYA SKY 2周前开售。按城市整理开售日与官方票价。";

/** The five zh-cn guides readers open most, linked at the top of the hub. */
const popularLinks = [
  { href: "/zh-cn/guides/attractions/usj-tickets-express-pass", label: "大阪：日本环球影城门票与快速通关" },
  { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", label: "东京：SHIBUYA SKY 门票" },
  { href: "/zh-cn/guides/attractions/tokyo-disney-tickets", label: "东京：东京迪士尼门票" },
  { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", label: "东京：teamLab 无界门票" },
  { href: "/zh-cn/guides/attractions/things-to-do-tokyo", label: "东京热门景点及门票预订时间" },
];

/** Booking windows read on each official site on this date (same sources as the English hub). */
const CHECKED = "2026-11-16";
const inline = { color: "var(--text)", fontWeight: 600 } as const;

type WindowRow = { name: string; city: string; opens: string; onTheDay: string; href: string; guide: string; source: string };
const windowRows: WindowRow[] = [
  { name: "吉卜力美术馆", city: "东京（三鹰）", opens: "每月 10 日 10:00（日本时间）开售下个月整月", onTheDay: "不能——仅接受提前预约，馆内不售票", href: "/zh-cn/guides/attractions/things-to-do-tokyo", guide: "东京必去景点", source: "https://www.ghibli-museum.jp/en/tickets/" },
  { name: "吉卜力公园", city: "名古屋", opens: "2 个月前的 10 日 14:00（日本时间）", onTheDay: "不能——必须提前预约", href: "/guides/attractions/ghibli-park-tickets", guide: "Ghibli Park tickets（英文）", source: "https://ghibli-park.jp/en/ticket/" },
  { name: "东京迪士尼乐园与东京迪士尼海洋", city: "东京（舞滨）", opens: "每天 14:00（日本时间）开售 2 个月后的同一天", onTheDay: "如有余票，当天只能通过官网或 App 购买；园区不售票（迪士尼酒店住客除外）", href: "/zh-cn/guides/attractions/tokyo-disney-tickets", guide: "东京迪士尼门票", source: "https://www.tokyodisneyresort.jp/en/ticket/index.html" },
  { name: "日本环球影城（Studio Pass、快速通关）", city: "大阪", opens: "入园日约 2 个月前", onTheDay: "只能网上购买，可能售罄——售票亭自 2025 年 5 月 6 日起停售", href: "/zh-cn/guides/attractions/usj-tickets-express-pass", guide: "环球影城快速通关", source: "https://www.usj.co.jp/company/company_e/news/2025/0425/" },
  { name: "teamLab 无界", city: "东京（麻布台之丘）", opens: "入场日期前两个月的月初（1 日前后）", onTheDay: "不建议依赖当天购票——官方常见问题页面提醒，门票可能售罄", href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", guide: "teamLab 无界门票", source: "https://www.teamlab.art/faq/tokyo/" },
  { name: "SHIBUYA SKY", city: "东京（涩谷）", opens: "入场日 2 周前的 0:00（日本时间）", onTheDay: "有——售票柜台与网上都可购买", href: "/zh-cn/guides/attractions/shibuya-sky-tickets", guide: "SHIBUYA SKY 门票", source: "https://www.shibuya-scramble-square.com/sky/ticket/" },
  { name: "华纳兄弟东京影城（哈利·波特）", city: "东京（练马区）", opens: "官网提前销售；官方建议预约，日期与时段可能售罄", onTheDay: "有——未售罄时可在现场售票处购买", href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", guide: "Warner Bros. Studio Tour（英文）", source: "https://www.wbstudiotour.jp/en/tickets/" },
];

// The hub is the entry point for the ten-page 简体中文 edition, so it lists exactly
// those ten and nothing else — a hub that links mostly to English pages is not a
// Chinese hub. Everything else on the site is one click away through the English
// hub, which this page links to explicitly and labels as English.
type CnHubGroup = {
  /** Anchor id, so the nav and the other pages can deep-link a group. */
  key: string;
  label: string;
  desc: string;
  /** zh-cn routes, in the order this hub renders them. */
  routes: string[];
};

const groups: CnHubGroup[] = [
  {
    key: "tickets",
    label: "门票与景点",
    desc: "单个场馆的门票，包括需要预约入场时段的美术馆和观景台。介绍官方票价，以及为什么具体入场时段往往比是否还有余票更值得关注。",
    routes: [
      "/zh-cn/guides/attractions/shibuya-sky-tickets",
      "/zh-cn/guides/attractions/teamlab-planets-tickets",
      "/zh-cn/guides/attractions/teamlab-borderless-tickets",
      "/zh-cn/guides/attractions/umeda-sky-building-tickets",
      "/zh-cn/guides/attractions/osaka-castle-tickets",
    ],
  },
  {
    key: "parks",
    label: "主题乐园",
    desc: "东京迪士尼与日本环球影城：票种、快速通行证，以及如何从境外购买。",
    routes: [
      "/zh-cn/guides/attractions/tokyo-disney-tickets",
      "/zh-cn/guides/attractions/usj-tickets-express-pass",
      "/zh-cn/guides/attractions/tokyo-joypolis-tickets",
    ],
  },
  {
    // The header's 目的地 → 一日游 link points at /zh-cn/guides/attractions#daytrips,
    // and the English hub uses the same key for the same group.
    key: "daytrips",
    label: "一日游",
    desc: "安排一整天的近郊游时，重点是选择路线，而不是门票。",
    routes: [
      "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo",
      "/zh-cn/guides/attractions/hakone-free-pass",
      "/zh-cn/guides/attractions/sagano-romantic-train-tickets",
      "/zh-cn/guides/attractions/kansai-area-pass",
      "/zh-cn/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo",
      "/zh-cn/guides/attractions/shirakawago-winter-light-up",
    ],
  },
  {
    key: "cities",
    label: "城市攻略",
    desc: "东京哪些景点需要提前订票，哪些可以直接前往，以及开街头卡丁车需要哪些驾照。",
    routes: ["/zh-cn/guides/attractions/things-to-do-tokyo", "/zh-cn/guides/attractions/tokyo-go-kart"],
  },
  {
    key: "prep",
    label: "行前准备",
    desc: "抵达日本当天就需要用到的交通与上网：机场到市区、京都到东京的新干线，以及日本 eSIM。",
    routes: [
      "/zh-cn/guides/transport/tokyo-airport-transfer",
      "/zh-cn/guides/transport/kyoto-to-tokyo-shinkansen",
      "/zh-cn/guides/esim/best-esim-japan",
    ],
  },
];

/** Short Chinese blurb per page — one line on what it answers. */
const BLURBS: Record<string, string> = {
  "/zh-cn/guides/attractions/osaka-castle-tickets":
    "大阪城天守阁门票：成人 ¥1,200、大学生与高中生 ¥600、初中生及以下免费，9:00–18:00 开放，最后入场 17:30。城内西之丸庭园、大阪城御座船等 5 项收费设施合计 ¥5,200，持大阪周游卡全部免费。",
  "/zh-cn/guides/attractions/tokyo-joypolis-tickets":
    "台场的世嘉室内主题乐园东京JOYPOLIS：入场券 ¥1,700、设施无限次乘坐的通票 ¥6,000（15:00 起傍晚通票 ¥5,000），玩到第 5 项就回本。21 项设施中 13 项有身高限制，以及与 teamLab Planets 排在同一天的台场行程。",
  "/zh-cn/guides/attractions/shirakawago-winter-light-up":
    "白川乡冬季夜间亮灯：2027 年 1 月 11、17、24、31 日，17:30–19:30，完全预约制、当天不售入场券。五种参加方式、浓飞巴士（¥13,000 起）与北陆铁道（¥18,500）亮灯巴士，以及观景台入场券怎么获得。",
  "/zh-cn/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo":
    "东京出发的GALA汤泽滑雪一日游：上越新干线直达最快 71 分钟、JR Pass 可用，缆车票 ¥8,000 与装备租借费用，12 月 19 日开放滑雪，以及 2026-27 雪季南区停业。",
  "/zh-cn/guides/attractions/kansai-area-pass":
    "JR 西日本关西地区铁路周游券：1 日 ¥2,700、4 日 ¥6,700，含关西机场 HARUKA，不含新干线。与关西广域铁路周游券、ICOCA 比较，以及从京都入境为什么 1 日券就划算。",
  "/zh-cn/guides/attractions/umeda-sky-building-tickets":
    "大阪梅田蓝天大厦的空中庭园观景台：成人 ¥2,000、9:30–22:30 开放，没有入场时段。大阪周游卡仅在 15:00 前免费，并附各季大阪日落时间。",
  "/zh-cn/guides/attractions/shibuya-sky-tickets":
    "位于涩谷十字路口上方的露天观景台。官方票价、为什么日落时段最先售罄，以及海外信用卡无法付款时怎么订。",
  "/zh-cn/guides/attractions/teamlab-planets-tickets":
    "丰洲的 Planets：官方票价、30 分钟入场时段、赤脚涉水区该穿什么，以及和无界的完整比较。",
  "/zh-cn/guides/attractions/teamlab-borderless-tickets":
    "麻布台之丘的无界：浮动票价如何计算、指定时段与 Flexible Pass 的差别、营业时间与休馆日。",
  "/zh-cn/guides/attractions/tokyo-disney-tickets":
    "每张票都指定日期、不在现场售票。如何购票（包括官网无法使用境外信用卡付款时），以及乐园与海洋怎么选。",
  "/zh-cn/guides/attractions/usj-tickets-express-pass":
    "现在一律网上购票，超级任天堂世界需要在指定时段入场。Studio Pass 的不同票种，以及快速通行证 4／7／8 该如何选择。",
  "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo":
    "对比四种行程：只游览富士山还是同时前往箱根、Subaru Line 五合目是什么，以及全天行程需要多长时间。",
  "/zh-cn/guides/attractions/hakone-free-pass":
    "新宿出发 2 日券 ¥7,100，包含小田急线往返和箱根内 8 种交通工具。一天绕完一圈就划算，浪漫特快另计。",
  "/zh-cn/guides/attractions/sagano-romantic-train-tickets":
    "京都岚山的嵯峨野小火车：乘车日 1 个月前的日本时间 00:00 开放网上购票，单程 ¥880。2026 年 11、12 月运行日、冬季停运与 2027 年新列车。",
  "/zh-cn/guides/attractions/things-to-do-tokyo":
    "实际上，容易售罄的景点门票只有四五类。这份简短清单列出了哪些景点需要提前多久预订，以及哪些可以当天早上再决定。",
  "/zh-cn/guides/attractions/tokyo-go-kart":
    "东京街头卡丁车：Street Kart 官方价目表每人 ¥5,000–¥25,000，比较涩谷、秋叶原、东京湾等路线。需要 1949 年日内瓦公约国际驾照、本国驾照和护照原件。",
  "/zh-cn/guides/transport/tokyo-airport-transfer":
    "从成田机场和羽田机场前往市区的各种交通方式，比较价格、所需时间和便利程度，附 2026 年票价与按酒店位置的建议。",
  "/zh-cn/guides/transport/kyoto-to-tokyo-shinkansen":
    "京都到东京新干线：希望号约 2 小时 12 分、每小时 8–12 班，smartEX 指定席 ¥13,970、自由席 ¥13,320，车站购票 ¥14,170。JR Pass 乘希望号另付 ¥4,960，京都站 11、12 号站台，以及在东京、品川、新横滨哪一站下车。",
  "/zh-cn/guides/esim/best-esim-japan":
    "对比 Klook 日本 eSIM 与 Airalo、Holafly、eSIM Go、Sakura Mobile 的价格和网络。价格每天核查。",
};

/** The rows for this hub's own routes, keyed by route for title lookup. */
const pageByRoute = new Map(TRANSLATED_PAGES.map((p) => [p.zhCn, p]));

const hubRoutes = groups.flatMap((g) => g.routes);

const faqItems: FaqItem[] = [
  {
    q: "日本哪些景点门票一定要提前订？",
    a: "不在现场售票的有四个：吉卜力美术馆（只接受预约，每月 10 日 10:00 开售下个月）、吉卜力公园（2 个月前的 10 日 14:00 开售）、东京迪士尼（每天 14:00 开售 2 个月后的同一天）与日本环球影城（约 2 个月前开售，售票亭 2025 年 5 月 6 日起停售）。teamLab 无界与 SHIBUYA SKY 均按指定时段入场，门票可能售罄，也建议提前订。以上均为日本时间，2026 年 11 月 16 日于各官网核查。",
  },
  {
    q: "teamLab 和 SHIBUYA SKY 要提前多久订？",
    a: "如果想预订特定入场时段，最好在开售后立即下单。teamLab 无界在入场日期前两个月的月初（1 日前后）开售，官方 FAQ 提醒可能售罄；SHIBUYA SKY 在入场日正好 2 周前的日本时间 0:00 开售。2026 年 11 月 16 日于 teamlab.art 与 shibuya-scramble-square.com 核查。",
  },
  {
    q: "日本景点门票可以当天买吗？",
    a: "部分景点可以。SHIBUYA SKY 设有现场售票柜台，华纳兄弟东京影城在未售罄时现场售票处也卖；东京迪士尼与日本环球影城的当日票只在网上、有余票时才买得到；吉卜力美术馆与吉卜力公园当天不卖票。2026 年 11 月 16 日核查。",
  },
  {
    q: "东京景点的套票划算吗？",
    a: "只有套票中包含的景点都是你原本计划前往的，购买套票才划算。先用门票价格总表将各景点单独购票的官方价格相加进行比较；SHIBUYA SKY、teamLab 这类指定时段的场馆，买之前先确认套票能选哪些入场时段——会售罄的是特定入场时段，而不是门票本身。",
  },
  {
    q: "为什么我的海外信用卡无法在日本官方售票网站付款？",
    a: "日本多个景点购票网站对境外发行的信用卡支持不佳——SHIBUYA SKY 自 2024 年 7 月起就是如此，东京迪士尼的购票系统也经常拒绝境外信用卡付款。这就是为什么从海外订票时，通过第三方售票平台预订往往更顺利：主要原因是第三方平台的支付流程更方便，也支持境外信用卡，而不是票价更低。",
  },
];

const trail: Crumb[] = [{ label: "日本景点门票" }];

/**
 * "Updated" labels for the cards, in Chinese. The English hubs use `articleDates`,
 * which formats in en-US; here the ISO date comes straight out of `pageUpdated` and
 * `zhMonthLabel` does the formatting, so all three editions read the same git
 * history and only the wording differs.
 */
export const getStaticProps = () => ({
  props: {
    dates: Object.fromEntries(hubRoutes.map((route) => [route, zhMonthLabel(pageUpdated(route).iso)])),
  },
});

export default function CnAttractionsHubPage({ dates }: { dates: Record<string, string> }) {
  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: itemListJsonLd({
              route: ROUTE,
              name: "日本景点门票攻略 — Japan Travel Kit 简体中文版",
              description: DESC,
              inLanguage: JSONLD_LANG["zh-cn"],
              items: hubRoutes.map((route) => ({
                href: route,
                title: pageByRoute.get(route)?.zhCnTitle ?? route,
              })),
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>简体中文版</p>
          <h1 className={styles.heroTitle}>
            日本景点门票 2026： <br />东京・大阪・京都哪些要提前预约与票价
          </h1>
          <p className={styles.heroSubtitle}>
            按“需要提前多久购票”整理的日本景点门票攻略：开售日、当天能不能买、官方票价与核查日期。
          </p>
          <div className={styles.heroBadges}>
            {["官方票价", "附核查日期", `${editionGuideCount("zh-cn")} 篇简体中文攻略`].map((t) => (
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
          <h2 className={styles.sectionTitle}>东京、大阪、京都的景点门票攻略，建议先看哪几篇？</h2>
          <p className={styles.bodyText}>
            <strong>先看下面 5 篇：东京迪士尼与日本环球影城约 2 个月前开售、门口不卖票，SHIBUYA SKY 在入场日 2 周前开售</strong>
            （{CHECKED} 于各官网核查）；京都大多数知名寺院无需提前预约，可以直接前往参观。
          </p>
          <ul style={{ margin: "0.5rem 0 1rem 1.25rem", lineHeight: 1.9 }}>
            {popularLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} style={inline}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            日本最热门的景点中，有四个<strong>不提供现场售票</strong>，需要在出发前买好门票：<strong>三鹰之森吉卜力美术馆</strong>每月 10 日
            10:00 开售下个月、<strong>吉卜力公园</strong>在 2 个月前的 10 日 14:00 开售、<strong>东京迪士尼</strong>每天 14:00
            开售 2 个月后的同一天，<strong>日本环球影城</strong>约 2 个月前开售，2025 年 5 月 6 日起门口不再售票。
            <strong>teamLab 无界</strong>在入场日期前两个月的月初、<strong>SHIBUYA SKY</strong>在 2 周前的 0:00 开售——如果想预订特定入场时段，最好在开售后立即下单（均为日本时间，{CHECKED} 于各官网核查）。
          </p>
          <p className={styles.bodyText}>
            <strong>日本景点门票价格（2026）</strong>：SHIBUYA SKY 网上购票 ¥2,700（15:00 前入场）／¥3,400（15:00
            起），teamLab Planets ¥3,800 起，teamLab 无界 ¥3,400 起，东京迪士尼一日护照 ¥8,900 起；日本环球影城按日期定价，结算时才会显示所选日期的票价。
            <strong>必须提前在网上预订的</strong>是两座 teamLab 美术馆（指定时段）、东京迪士尼（门口不卖票）与日本环球影城（当天门口不售票），SHIBUYA SKY 只有日落时段需要提前预订。票价均来自各官方网站：SHIBUYA SKY 与 teamLab Planets 于 2026 年 11 月 6 日、东京迪士尼于 10 月 28 日、teamLab
            无界于 10 月 9 日核查。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>提前预约</span>
          <h2 className={styles.sectionTitle}>日本哪些景点门票一定要提前订？</h2>
          <p className={styles.bodyText}>
            吉卜力美术馆、吉卜力公园、东京迪士尼与日本环球影城：四个都不在门口卖票。下表列出了各景点的开售时间，以及当天是否还能买到门票。
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>景点</th>
                    <th>城市</th>
                    <th>何时开售</th>
                    <th>当天还能买到票吗？</th>
                    <th>攻略</th>
                    <th>官方来源</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider} style={{ minWidth: "130px" }}>必须提前预约</td>
                    <td style={{ fontSize: "0.82rem" }}>东京、名古屋、大阪</td>
                    <td style={{ fontSize: "0.82rem", minWidth: "180px" }}>吉卜力美术馆、吉卜力公园、东京迪士尼、日本环球影城</td>
                    <td style={{ fontSize: "0.82rem", minWidth: "160px" }}>现场不售票，须在出发前购买</td>
                    <td style={{ fontSize: "0.82rem" }}>
                      <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={inline}>门票价格总表（英文）</Link>
                    </td>
                    <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>见下列各行</td>
                  </tr>
                  {windowRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ minWidth: "130px" }}>{row.name}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "100px" }}>{row.city}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "180px" }}>{row.opens}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "180px" }}>{row.onTheDay}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "130px" }}>
                        <Link href={row.href} hrefLang={row.href.startsWith("/zh-cn") ? undefined : "en"} style={inline}>{row.guide}</Link>
                      </td>
                      <td style={{ fontSize: "0.82rem", minWidth: "120px" }}>
                        <a href={row.source} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>
                          {new URL(row.source).hostname.replace(/^www\./, "")}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            最后核查日期：{CHECKED}。官方页面：ghibli-museum.jp/en/tickets/ · ghibli-park.jp/en/ticket/ ·
            tokyodisneyresort.jp/en/ticket/index.html 与 faq-en.tokyodisneyresort.jp · usj.co.jp/company/company_e/news/2025/0421/ 与 /0425/ ·
            teamlab.art/faq/tokyo/ · shibuya-scramble-square.com/sky/ticket/ · wbstudiotour.jp/en/tickets/。特别活动可能另定开售日。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>先看这个</span>
          <h2 className={styles.sectionTitle}>预订日本景点门票，难的不是比较价格</h2>
          <p className={styles.bodyText}>
            日本有几个知名景点，即使到了现场也买不到门票。teamLab、东京迪士尼、日本环球影城与 SHIBUYA SKY 的日落时段，
            全都在网上销售指定日期与时段的票，热门时段的门票提前数周就会售罄——迪士尼的情况更极端，完全不提供现场售票。
          </p>
          <p className={styles.bodyText}>
            有两点需要游客特别注意：官方网站有时无法使用境外发行的信用卡付款，而搜索结果中排名靠前的第三方转售网站，出售的门票常常无法用于入场。这些攻略介绍官方票价、支持境外购票的渠道，以及需要提前多久预订。
          </p>
          <p className={styles.bodyText}>
            日本也有很多景点完全无需提前订票。京都多数知名寺院可以直接入内参观，奈良公园免费，
            和服体验或烹饪课程，提前一周预订也来得及。这些攻略的重点是：把时间和精力用在真正影响行程安排的事情上。
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.86rem", color: "var(--text-muted)" }}>
            本站目前已核查日本 {attractionPrices.length} 项景点、主题乐园、交通通票及一日游项目的官方票价，
            最近一次核查是 {zhDateLabel(latestChecked())}（英文版记为 {checkedLabel(latestChecked())}）。
            完整的总表目前只有英文版：{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景点门票价格总表（英文）→
            </Link>
          </p>
        </section>

        {groups.map((group) => (
          <section key={group.key} id={group.key} className={styles.bodySection}>
            <span className={styles.sectionLabel}>{group.label}</span>
            <h2 className={styles.sectionTitle}>{group.label}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>{group.desc}</p>
            <div className={styles.relatedGrid}>
              {group.routes.map((route) => (
                <Link key={route} href={route} className={styles.relatedCard}>
                  <div className={styles.relatedMeta}>
                    <p className={styles.relatedTitle}>{pageByRoute.get(route)?.zhCnTitle ?? route}</p>
                    <p className={styles.bodyText} style={{ fontSize: "0.85rem", margin: "0.4rem 0 0.6rem" }}>
                      {BLURBS[route]}
                    </p>
                    <span className={styles.relatedArrow}>更新于 {dates[route]}｜看攻略 →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>其他语言</span>
          <h2 className={styles.sectionTitle}>尚未翻译的内容</h2>
          <p className={styles.bodyText}>
            简体中文版目前共有 {editionPageCount("zh-cn")} 页（含首页与本页）。京都与大阪的城市攻略、其他的一日游、
            铁路周游券、IC 卡、支付与货币，以及完整的门票价格总表，目前只有英文版：{" "}
            <Link href="/guides/attractions" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>
              Things to Do in Japan（英文）
            </Link>
            {" "}与{" "}
            <Link href="/guides" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>
              全部攻略（英文）
            </Link>
            。这些页面也都有繁体中文版，方便习惯阅读繁体中文的读者查看：{" "}
            <Link href="/zh-tw/guides/attractions" hrefLang="zh-Hant-TW" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景點門票攻略（繁體中文）
            </Link>
            。当某个页面提供全部三种语言版本时，页面顶部会显示 English／繁體中文／简体中文 语言切换选项。
          </p>
          <p className={styles.bodyText}>
            门票之外的行前准备（上网、机场交通、住宿区域），按类别整理在{" "}
            <Link href="/zh-cn" style={{ color: "var(--text)", fontWeight: 600 }}>日本旅行指南 2026 首页</Link>
            ；12 月到 2 月出发的话，先看{" "}
            <Link href="/zh-cn/guides/attractions/japan-winter-itinerary" style={{ color: "var(--text)", fontWeight: 600 }}>日本冬季行程 2026-27</Link>
            ，白川乡亮灯、札幌雪祭这些日期固定的冬季活动都按要先订的顺序列出。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>抵达日本当天</span>
          <h2 className={styles.sectionTitle}>出发前需要准备的两样东西</h2>
          <p className={styles.bodyText}>
            入境通关后最先用到的两样东西：手机上网，以及市区交通。打开商品页面，查看当前套餐和价格。
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <KlookLink href={cnKlookEsim.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              {cnKlookEsim.label} →
            </KlookLink>
            <KlookLink href={cnTokyoSubwayTicket.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              {cnTokyoSubwayTicket.label} →
            </KlookLink>
          </div>
        </section>

        <FaqList items={faqItems} />
      </div>
    </>
  );
}
