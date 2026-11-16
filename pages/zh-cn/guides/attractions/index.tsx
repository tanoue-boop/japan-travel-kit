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
const TITLE = "日本景点门票 2026：哪些要提前预约、何时开售与票价";
const DESC =
  "日本景点门票哪些要提前预约：吉卜力美术馆每月10日开售、东京迪士尼与环球影城约2个月前、SHIBUYA SKY 2周前。按城市整理成表，附官方来源。";

/** Booking windows read on each official site on this date (same sources as the English hub). */
const CHECKED = "2026-11-16";
const inline = { color: "var(--text)", fontWeight: 600 } as const;

type WindowRow = { name: string; city: string; opens: string; onTheDay: string; href: string; guide: string; source: string };
const windowRows: WindowRow[] = [
  { name: "吉卜力美术馆", city: "东京（三鹰）", opens: "每月 10 日 10:00（日本时间）开售下个月整月", onTheDay: "没有——只接受预约，馆内不售票", href: "/zh-cn/guides/attractions/things-to-do-tokyo", guide: "东京必去景点", source: "https://www.ghibli-museum.jp/en/tickets/" },
  { name: "吉卜力公园", city: "名古屋", opens: "2 个月前的 10 日 14:00（日本时间）", onTheDay: "没有——一律须事先预约", href: "/guides/attractions/ghibli-park-tickets", guide: "Ghibli Park tickets（英文）", source: "https://ghibli-park.jp/en/ticket/" },
  { name: "东京迪士尼乐园・海洋", city: "东京（舞滨）", opens: "每天 14:00（日本时间）开售 2 个月后的同一天", onTheDay: "有余票时只能在官网或 App 买；园区不售票（迪士尼酒店住客除外）", href: "/zh-cn/guides/attractions/tokyo-disney-tickets", guide: "东京迪士尼门票", source: "https://www.tokyodisneyresort.jp/en/ticket/index.html" },
  { name: "日本环球影城（Studio Pass、快速通关）", city: "大阪", opens: "入园日约 2 个月前", onTheDay: "只能网上购买，可能售罄——售票亭自 2025 年 5 月 6 日起停售", href: "/zh-cn/guides/attractions/usj-tickets-express-pass", guide: "环球影城快速通关", source: "https://www.usj.co.jp/company/company_e/news/2025/0425/" },
  { name: "teamLab 无界", city: "东京（麻布台之丘）", opens: "入场日 2 个月前的月初（1 日前后）", onTheDay: "不建议指望——官方 FAQ 提醒可能售罄", href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", guide: "teamLab 无界门票", source: "https://www.teamlab.art/faq/tokyo/" },
  { name: "SHIBUYA SKY", city: "东京（涩谷）", opens: "入场日 2 周前的 0:00（日本时间）", onTheDay: "有——售票柜台与网上都可购买", href: "/zh-cn/guides/attractions/shibuya-sky-tickets", guide: "SHIBUYA SKY 门票", source: "https://www.shibuya-scramble-square.com/sky/ticket/" },
  { name: "华纳兄弟东京影城（哈利·波特）", city: "东京（练马）", opens: "官网提前销售；官方建议预约，日期与时段可能售罄", onTheDay: "有——现场售票处，未售罄时", href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", guide: "Warner Bros. Studio Tour（英文）", source: "https://www.wbstudiotour.jp/en/tickets/" },
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
    desc: "单一场馆的入场券——指定时段的美术馆与观景台。官方票价，以及为什么「时段」常常比「门票」更重要。",
    routes: [
      "/zh-cn/guides/attractions/shibuya-sky-tickets",
      "/zh-cn/guides/attractions/teamlab-planets-tickets",
      "/zh-cn/guides/attractions/teamlab-borderless-tickets",
    ],
  },
  {
    key: "parks",
    label: "主题乐园",
    desc: "东京迪士尼与日本环球影城：票种、快速通行证，以及从海外怎么买。",
    routes: [
      "/zh-cn/guides/attractions/tokyo-disney-tickets",
      "/zh-cn/guides/attractions/usj-tickets-express-pass",
    ],
  },
  {
    // The header's 目的地 → 一日游 link points at /zh-cn/guides/attractions#daytrips,
    // and the English hub uses the same key for the same group.
    key: "daytrips",
    label: "一日游",
    desc: "需要一整天的郊游行程，要选的是哪一条路线，而不是哪一张票。",
    routes: ["/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo"],
  },
  {
    key: "cities",
    label: "城市攻略",
    desc: "东京哪些要先订票、哪些可以直接去。",
    routes: ["/zh-cn/guides/attractions/things-to-do-tokyo"],
  },
  {
    key: "prep",
    label: "行前准备",
    desc: "抵达日本当天就会用到的两样东西：机场到市区的交通，以及手机上网。",
    routes: [
      "/zh-cn/guides/transport/tokyo-airport-transfer",
      "/zh-cn/guides/esim/best-esim-japan",
    ],
  },
];

/** Short Chinese blurb per page — one line on what it answers. */
const BLURBS: Record<string, string> = {
  "/zh-cn/guides/attractions/shibuya-sky-tickets":
    "涩谷十字路口上方的开放式屋顶。官方票价、为什么日落时段最先售罄，以及海外信用卡无法付款时怎么订。",
  "/zh-cn/guides/attractions/teamlab-planets-tickets":
    "丰洲的 Planets：官方票价、30 分钟入场时段、赤脚涉水区该穿什么，以及和无界的完整比较。",
  "/zh-cn/guides/attractions/teamlab-borderless-tickets":
    "麻布台之丘的无界：浮动定价怎么算、指定时段与 Flexible Pass 的差别、营业时间与休馆日。",
  "/zh-cn/guides/attractions/tokyo-disney-tickets":
    "每张票都指定日期、门口完全不卖票。怎么买（包括官网拦截海外卡时），以及乐园与海洋怎么选。",
  "/zh-cn/guides/attractions/usj-tickets-express-pass":
    "现在一律网上购票，超级任天堂世界需要指定时间入园。Studio Pass 的分级、快速通行证 4／7／8 怎么挑。",
  "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo":
    "四种行程比较：只去富士山，还是连箱根一起玩、Subaru Line 五合目是什么，以及一天要多久。",
  "/zh-cn/guides/attractions/things-to-do-tokyo":
    "真正会售罄的只有四、五样。这份短名单说哪些要提前多久订，哪些可以吃早餐时再决定。",
  "/zh-cn/guides/transport/tokyo-airport-transfer":
    "成田与羽田进市区的每个选项，比价格、时间与方便度，附 2026 年票价与按酒店位置的建议。",
  "/zh-cn/guides/esim/best-esim-japan":
    "Klook 日本 eSIM，加上 Airalo、Holafly、eSIM Go、Sakura Mobile 的价格与网络比较。价格每天核查。",
};

/** The rows for this hub's own routes, keyed by route for title lookup. */
const pageByRoute = new Map(TRANSLATED_PAGES.map((p) => [p.zhCn, p]));

const hubRoutes = groups.flatMap((g) => g.routes);

const faqItems: FaqItem[] = [
  {
    q: "日本哪些景点门票一定要提前订？",
    a: "门口完全不卖票的有四个：吉卜力美术馆（只接受预约，每月 10 日 10:00 开售下个月）、吉卜力公园（2 个月前的 10 日 14:00 开售）、东京迪士尼（每天 14:00 开售 2 个月后的同一天）与日本环球影城（约 2 个月前开售，售票亭 2025 年 5 月 6 日起停售）。teamLab 无界与 SHIBUYA SKY 是指定时段、可能售罄，也建议提前订。以上均为日本时间，2026 年 11 月 16 日于各官网核查。",
  },
  {
    q: "teamLab 和 SHIBUYA SKY 要提前多久订？",
    a: "需要特定时段的话，开售当下就订。teamLab 无界在入场日 2 个月前的月初（1 日前后）开售，官方 FAQ 提醒可能售罄；SHIBUYA SKY 在入场日正好 2 周前的日本时间 0:00 开售。2026 年 11 月 16 日于 teamlab.art 与 shibuya-scramble-square.com 核查。",
  },
  {
    q: "日本景点门票可以当天买吗？",
    a: "部分可以。SHIBUYA SKY 有售票柜台，华纳兄弟东京影城在未售罄时现场售票处也卖；东京迪士尼与日本环球影城的当日票只在网上、有余票时才买得到；吉卜力美术馆与吉卜力公园当天不卖票。2026 年 11 月 16 日核查。",
  },
  {
    q: "东京景点的套票划算吗？",
    a: "只有套票里每个景点你本来就会去时才划算。先用门票价格总表把各景点的官方单票加起来比较；SHIBUYA SKY、teamLab 这类指定时段的场馆，买之前先确认套票能选哪些入场时段——会售罄的是时段，不是门票。",
  },
  {
    q: "为什么我的海外信用卡无法在日本官方售票网站付款？",
    a: "好几个日本景点的购票网站的支付系统对境外发行的信用卡兼容性不佳——SHIBUYA SKY 自 2024 年 7 月起就是如此，东京迪士尼也经常拒绝。这就是为什么从海外订票时，通过第三方售票平台预订往往更顺利：付款流程易于操作，也支持境外信用卡，而不是票价更便宜。",
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
            日本景点门票 2026：<br />哪些要提前预约、何时开售
          </h1>
          <p className={styles.heroSubtitle}>
            按「要提前多久购票」整理的日本景点门票：开售日、当天能不能买、官方票价与核查日期。
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
          <p className={styles.bodyText}>
            日本最热门的景点中有四个<strong>门口完全不卖票</strong>，出发前就要买好：<strong>吉卜力美术馆</strong>每月 10 日
            10:00 开售下个月、<strong>吉卜力公园</strong>在 2 个月前的 10 日 14:00 开售、<strong>东京迪士尼</strong>每天 14:00
            开售 2 个月后的同一天，<strong>日本环球影城</strong>约 2 个月前开售，2025 年 5 月 6 日起门口不再售票。
            <strong>teamLab 无界</strong>在 2 个月前的月初、<strong>SHIBUYA SKY</strong>在 2 周前的 0:00 开售——需要特定时段就在开售当下订（均为日本时间，{CHECKED} 于各官网核查）。
          </p>
          <p className={styles.bodyText}>
            <strong>日本景点门票价格（2026）</strong>：SHIBUYA SKY 网上购票 ¥2,700（15:00 前入场）／¥3,400（15:00
            起），teamLab Planets ¥3,800 起，teamLab 无界 ¥3,400 起，东京迪士尼一日护照 ¥8,900 起；日本环球影城按日期定价，结账时才显示当天价格。
            <strong>必须提前在网上预订的</strong>是两座 teamLab 美术馆（指定时段）、东京迪士尼（门口不卖票）与日本环球影城（当天门口不售票），SHIBUYA SKY
            只有日落时段需要早订。票价均来自各官方网站：SHIBUYA SKY 与 teamLab Planets 于 2026 年 11 月 6 日、东京迪士尼于 10 月 28 日、teamLab
            无界于 10 月 9 日核查。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>提前预约</span>
          <h2 className={styles.sectionTitle}>日本哪些景点门票一定要提前订？</h2>
          <p className={styles.bodyText}>
            吉卜力美术馆、吉卜力公园、东京迪士尼与日本环球影城：四个都不在门口卖票。下表是每个景点的开售时间，以及当天还买不买得到。
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>景点</th>
                    <th>城市</th>
                    <th>何时开售</th>
                    <th>当天能买吗？</th>
                    <th>攻略</th>
                    <th>官方来源</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider} style={{ minWidth: "130px" }}>必须提前预约</td>
                    <td style={{ fontSize: "0.82rem" }}>东京、名古屋、大阪</td>
                    <td style={{ fontSize: "0.82rem", minWidth: "180px" }}>吉卜力美术馆、吉卜力公园、东京迪士尼、日本环球影城</td>
                    <td style={{ fontSize: "0.82rem", minWidth: "160px" }}>门口不卖票——出发前买好</td>
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
            Last checked: {CHECKED}。官方页面：ghibli-museum.jp/en/tickets/ · ghibli-park.jp/en/ticket/ ·
            tokyodisneyresort.jp/en/ticket/index.html 与 faq-en.tokyodisneyresort.jp · usj.co.jp/company/company_e/news/2025/0421/ 与 /0425/ ·
            teamlab.art/faq/tokyo/ · shibuya-scramble-square.com/sky/ticket/ · wbstudiotour.jp/en/tickets/。特别活动可能另定开售日。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>先看这个</span>
          <h2 className={styles.sectionTitle}>日本的门票，问题不在价格</h2>
          <p className={styles.bodyText}>
            日本几个最有名的景点，到了现场也买不到门票。teamLab、东京迪士尼、日本环球影城与 SHIBUYA SKY 的日落时段，
            全都在网上销售指定日期与时段的票，热门时段的门票提前数周就会售罄——迪士尼的情况更极端，门口完全不卖票。
          </p>
          <p className={styles.bodyText}>
            有两件事特别容易让旅客踩坑：官方网站有时无法使用海外发行的信用卡付款，而搜索结果里排名很前面的转售页面，
            常常是入场时无效的票。这些攻略写的是官方票价、支持境外购票的渠道，以及该什么时候订。
          </p>
          <p className={styles.bodyText}>
            日本也有很多地方完全不需要这些。京都多数知名寺院可以直接走进去，奈良公园免费，
            和服体验或料理课前一周订都还来得及。这些攻略的重点是：把规划的力气花在真的会影响结果的地方。
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.86rem", color: "var(--text-muted)" }}>
            本站目前已核查 {attractionPrices.length} 项日本景点、主题乐园、通票与一日游景点的官方入场费用，
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
          <h2 className={styles.sectionTitle}>还没翻译的部分</h2>
          <p className={styles.bodyText}>
            简体中文版目前是 {editionPageCount("zh-cn")} 页。京都与大阪的城市攻略、其他的一日游、
            铁路周游券、IC 卡、支付与货币，以及完整的门票价格总表，目前只有英文版：{" "}
            <Link href="/guides/attractions" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>
              Things to Do in Japan（英文）
            </Link>
            {" "}与{" "}
            <Link href="/guides" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>
              全部攻略（英文）
            </Link>
            。这十页也有繁體中文版，给习惯读繁體的读者：{" "}
            <Link href="/zh-tw/guides/attractions" hrefLang="zh-Hant-TW" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景點門票攻略（繁體中文）
            </Link>
            。每一页三种语言都有的时候，页首会出现 English／繁體中文／简体中文 的切换。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>抵达日本当天</span>
          <h2 className={styles.sectionTitle}>出发前先准备好的两样东西</h2>
          <p className={styles.bodyText}>
            过海关之后最先用到的两样东西：手机上网，以及市区交通。打开商品页看目前的方案与价格。
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
