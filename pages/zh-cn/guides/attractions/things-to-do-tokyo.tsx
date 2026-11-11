import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import { seoTags } from "../../../../components/IntlSeo";
import {
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookLink from "../../../../components/KlookLink";
import CityGuideIndex from "../../../../components/CityGuideIndex";
import GygCompare from "../../../../components/GygCompare";
import {
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  skytreeTicket,
  fujiHakoneDayTour,
  klookEsim,
  klookPassGreaterTokyo,
  hanedaLimousineBus,
  naritaLimousineBus,
  shibuyaAnnexGoKartTour,
  shinjukuNightFoodWalkingTour,
  tokyoDisneyOneDayPassport,
  tokyoJoypolisPassport,
  tokyoStayAreas,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { gygTokyo, gygTokyoEntryTickets } from "../../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { PRICES, TOKYO_GUIDE_PRICES } from "../../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (pages/guides/attractions/things-to-do-tokyo.tsx) as of
// 2026-11-07, section for section and block for block; no figures added beyond it.

const ROUTE = "/zh-cn/guides/attractions/things-to-do-tokyo";
const TITLE = "东京自由行景点 2026：必去清单与门票价格";
const DESC =
  "2026 东京自由行景点与门票价格：涩谷SKY ¥2,700 起、teamLab Planets ¥3,800 起、迪士尼 ¥8,900 起，哪些要先订。";

const label = (iso: string) => dateLabel(iso, "zh-cn");
const CHECKED_FREE = label("2026-11-07");
const TOCHO_CHECKED = label(PRICES.tochoDeck.checked);
// All figures come from lib/attraction-prices.ts, as on the English page.
const SKY = PRICES.shibuyaSky;
const [SKY_ONLINE_DAY, SKY_ONLINE_LATE] = SKY.adult.split(" / ");
const [SKY_DOOR_DAY, SKY_DOOR_LATE] = (SKY.atDoor ?? "").split(" / ");
const SKY_CHECKED = label(SKY.checked);
const SUBWAY_CHECKED = label(PRICES.tokyoSubwayTicket.checked);
const zhPrice = (value: string) => priceLabel(value, "zh-cn");

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const priceRows = [
  {
    name: "涩谷SKY",
    adult: `15 点前 ${SKY_ONLINE_DAY}、15 点起 ${SKY_ONLINE_LATE}（线上）`,
    book: "建议：日落场会售罄",
    sameDay: `有，14 层柜台：${SKY_DOOR_DAY}／${SKY_DOOR_LATE}`,
    change: "官网线上票：入场日前可免费取消",
    checked: SKY.checked,
    href: "/zh-cn/guides/attractions/shibuya-sky-tickets",
    klook: SKY.klook.url,
  },
  {
    name: "东京迪士尼（一日护照）",
    adult: `${zhPrice(TOKYO_GUIDE_PRICES.tokyoDisney.adult)}，按日期`,
    book: "必须",
    sameDay: "门口不卖票；仅官网或 App，有票才能买",
    change: "不可退款；可线上改期，按新日期票价",
    checked: TOKYO_GUIDE_PRICES.tokyoDisney.checked,
    href: "/zh-cn/guides/attractions/tokyo-disney-tickets",
    klook: tokyoDisneyOneDayPassport.url,
  },
  {
    name: "teamLab Planets",
    adult: `${zhPrice(PRICES.teamlabPlanets.adult)}，按日期`,
    book: "必须",
    sameDay: "现场不售票",
    change: "不可退款；最多改 3 次，入场前 2 小时截止",
    checked: PRICES.teamlabPlanets.checked,
    href: "/zh-cn/guides/attractions/teamlab-planets-tickets",
    klook: PRICES.teamlabPlanets.klook.url,
  },
  {
    name: "teamLab 无界",
    adult: `${zhPrice(PRICES.teamlabBorderless.adult)}，按日期`,
    book: "必须",
    sameDay: "尚有名额时现场可买，多 ¥200",
    change: "官方票：日期最多可改 3 次",
    checked: PRICES.teamlabBorderless.checked,
    href: "/zh-cn/guides/attractions/teamlab-borderless-tickets",
    klook: PRICES.teamlabBorderless.klook.url,
  },
  {
    name: "华纳兄弟哈利波特影城",
    adult: PRICES.wbStudioTour.adult,
    book: "必须",
    sameDay: "现场设有售票处，但日期与时段可能售罄",
    change: "不可退款；每次改日期或时段 ¥1,500",
    checked: PRICES.wbStudioTour.checked,
    href: PRICES.wbStudioTour.href,
    klook: PRICES.wbStudioTour.klook.url,
  },
  {
    name: "三丽鸥彩虹乐园（一日护照）",
    adult: PRICES.sanrioPuroland.adult,
    book: "必须：除了门票还要来园预约",
    sameDay: "售票窗口可买，但仍需来园预约",
    change: "没有预约而无法入园时不退款",
    checked: PRICES.sanrioPuroland.checked,
    href: PRICES.sanrioPuroland.href,
    klook: PRICES.sanrioPuroland.klook.url,
  },
  {
    name: "东京晴空塔（350 层）",
    adult: zhPrice(PRICES.tokyoSkytree.adult),
    book: "建议：比柜台便宜",
    sameDay: "有，柜台每张加收 ¥500",
    change: "官网线上票：31 天前免费，之后 20%；不可改期",
    checked: PRICES.tokyoSkytree.checked,
    href: "/zh-cn/guides/attractions/tokyo-skytree-tickets",
    klook: PRICES.tokyoSkytree.klook.url,
  },
  {
    name: "东京塔（主观景台）",
    adult: PRICES.tokyoTower.adult,
    book: "不需要",
    sameDay: "有，同价",
    change: "票价页面未说明",
    checked: PRICES.tokyoTower.checked,
    href: PRICES.tokyoTower.href,
    klook: PRICES.tokyoTower.klook.url,
  },
  {
    name: "东京 Joypolis（Passport）",
    adult: TOKYO_GUIDE_PRICES.tokyoJoypolis.adult,
    book: "不需要",
    sameDay: "有，现场销售",
    change: "请看卖家的条款",
    checked: TOKYO_GUIDE_PRICES.tokyoJoypolis.checked,
    href: "/guides/attractions/tokyo-joypolis-tickets",
    klook: tokyoJoypolisPassport.url,
  },
  {
    name: "东京街头卡丁车",
    adult: `${TOKYO_GUIDE_PRICES.tokyoGoKart.adult}，按路线`,
    book: "建议，且出国前要备好国际驾照",
    sameDay: "运营方未说明",
    change: "7 天前可免费取消；文件不齐不退款",
    checked: TOKYO_GUIDE_PRICES.tokyoGoKart.checked,
    href: "/guides/attractions/tokyo-go-kart",
    klook: shibuyaAnnexGoKartTour.url,
  },
  {
    name: "东京都厅观景室",
    adult: zhPrice(PRICES.tochoDeck.adult),
    book: "不需要",
    sameDay: "没有票",
    change: "—",
    checked: PRICES.tochoDeck.checked,
    href: PRICES.tochoDeck.href,
    klook: null,
  },
];

const freeRows = [
  {
    thing: "东京都厅（新宿）",
    what: "45 层、202 米的观景室；开放时间与开放的观景室会变动，请提前一天确认",
    checked: TOCHO_CHECKED,
    source: "metro.tokyo.lg.jp",
  },
  {
    thing: "明治神宫（原宿）",
    what: "每天开放，日出到日落；境内部分设施较早关闭",
    checked: CHECKED_FREE,
    source: "meijijingu.or.jp",
  },
  {
    thing: "皇居东御苑",
    what: "通常周一、周五与 12 月 28 日至 1 月 3 日闭园",
    checked: CHECKED_FREE,
    source: "kunaicho.go.jp",
  },
  {
    thing: "涩谷十字路口",
    what: "这是公共道路，没有门票，也没有开放时间",
    checked: "—",
    source: "—",
  },
];

const bookingRows = [
  { thing: "东京迪士尼乐园／迪士尼海洋", when: "提前数周", why: "指定日期票，门口完全不卖票" },
  { thing: "teamLab Planets／无界", when: "提前数天到数周", why: "30 分钟指定时段，会售罄" },
  { thing: "涩谷SKY", when: "日落场请提前数天", why: "日落场最先售罄；其他时段比较好订" },
  { thing: "华纳兄弟哈利波特影城", when: "提前数周", why: "指定时段、不可重复入场，且要逛四小时" },
  { thing: "大相扑赛事", when: "开售当天", why: "东京只有 1 月、5 月与 9 月有" },
  { thing: "卡丁车", when: "出国前", why: "要处理的不是预订——是国际驾照" },
  { thing: "东京晴空塔、东京塔", when: "当天就可以", why: "网上预订省一点；名额通常不是问题" },
  { thing: "东京都厅免费观景台、神社、街区", when: "直接去", why: "没有票可以订" },
];

const faqItems: FaqItem[] = [
  {
    q: "东京到底哪些需要提前订？",
    a: "其实就五件事：东京迪士尼（指定日期、门口不卖票）、两家 teamLab 美术馆（30 分钟指定时段）、涩谷SKY 的日落时段、华纳兄弟哈利波特影城，以及除了门票还要来园预约的三丽鸥彩虹乐园。大相扑也算，但只在你的日期落在 1 月、5 月或 9 月时。东京其他几乎所有东西——晴空塔、东京塔、神社、街区、免费的东京都厅观景台——都可以当天早上再决定。",
  },
  {
    q: "东京有免费的景点吗？",
    a: `有，而且其中一个是付费观景台的真正对手。新宿的东京都厅在 45 层、202 米处设有观景室，免费入场，晴空塔与东京塔都在视野里。神社、公园与整片街区都不用花钱就能逛，所以下面要付费的清单可以很短。高度与入场费读自 metro.tokyo.lg.jp，核查日期 ${TOCHO_CHECKED}。`,
  },
  {
    q: "为什么东京的官方售票网站刷不了我的卡？",
    a: "好几个日本景点的支付页面对境外发行的信用卡处理得不顺畅，东京迪士尼是最有名的例子。这就是为什么从海外订票时，走第三方平台常常更顺利——即使官网理论上对你开放。它给你的是看得懂、境外卡能支付的结账流程，而不是更便宜的票。我们每一篇景点攻略都会说明那个场馆适合走哪条渠道。",
  },
  {
    q: "东京的景点需要几天？",
    a: "三到四天就够把两个大型售票景点——比如一座主题乐园加一个影城——配上一个观景台、一个体验项目，以及一趟出城的一日游。顺序比天数重要：先把指定时段的日期定死，因为那是唯一不能挪动的东西，再用可以现场去的观光填空档。",
  },
  {
    q: "从东京出发有哪些值得的一日游？",
    a: "四个特别突出，而且是真正不同的四天。镰仓最轻松——一条 JR 线不到一小时，有露天大佛与海边寺院。日光是 UNESCO 世界遗产的神社加山景，往北两小时。箱根是温泉与火山谷，一张周游券涵盖整个环线。河口湖是去看富士山的地方。每一个在下面都有单独的攻略。",
  },
  {
    q: "涩谷SKY 和东京晴空塔选哪一个？",
    a: `想要涩谷十字路口上方的露天屋顶就选涩谷SKY，想要高度就选东京晴空塔。涩谷SKY 线上购票 15 点前 ${SKY_ONLINE_DAY}、15 点起 ${SKY_ONLINE_LATE}，会售罄的是日落时段。晴空塔 350 层 ${zhPrice(PRICES.tokyoSkytree.adult)}，在柜台购票每张加收 ¥500。官方票价，核查日期 ${SKY_CHECKED} 与 ${label(PRICES.tokyoSkytree.checked)}。`,
  },
  {
    q: "东京迪士尼两座园区可以一天逛完吗？",
    a: `目前一张票不行。每张园区门票只限一座园区、一个日期，官方 FAQ 也写明一日跳园护照目前没有销售，所以两座园区就是两天。核查日期 ${label(TOKYO_GUIDE_PRICES.tokyoDisney.checked)}。`,
  },
  {
    q: "东京景点门票可以退款吗？",
    a: "要看场馆。东京迪士尼、teamLab Planets 与华纳兄弟影城都不接受因个人原因退款，但各自有改期规则。涩谷SKY 官网线上票在入场日前可免费取消；晴空塔官网票提前 31 天以上取消免费，之后收 20%。第三方平台有自己的条款，请在结账时确认。",
  },
];

const tours = [
  withKlookLocale(tokyoSubwayTicket, "zh-cn", {
    title: "东京地铁通票（24／48／72 小时）",
    desc: "东京Metro与都营地铁全线不限次乘坐，抵达后领取，不必排队现场买",
  }),
  withKlookLocale(skytreeTicket, "zh-cn", {
    title: "东京晴空塔门票",
    desc: "350 层天望甲板的指定时段门票，同一个商品页也能加购 450 层套票",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "zh-cn", {
    title: "东京市区观光巴士一日游",
    desc: "附多语种语音导览，一趟走完皇居庭园、浅草与东京晴空塔",
  }),
  withKlookLocale(fujiHakoneDayTour, "zh-cn", {
    title: "富士山＋箱根一日游",
    desc: "富士山五合目，加上箱根火山地带与芦之湖，从东京出发一天走完",
  }),
  withKlookLocale(shinjukuNightFoodWalkingTour, "zh-cn", {
    title: "新宿夜间美食导览",
    desc: "三小时拼团步行，走回忆横丁、歌舞伎町与黄金街",
  }),
  withKlookLocale(
    { title: "新宿酒店", desc: "位于山手线上，也是中央线、小田急与京王线的起点", url: tokyoStayAreas[0].url },
    "zh-cn",
  ),
  withKlookLocale(
    { title: "东京站／丸之内酒店", desc: "山手线车站，也是新干线起点，最适合常跑一日游的人", url: tokyoStayAreas[1].url },
    "zh-cn",
  ),
  withKlookLocale(naritaLimousineBus, "zh-cn", {
    title: "成田机场－东京利木津巴士",
    desc: "往返成田三座航站楼与东京的酒店、车站，凭二维码上车",
  }),
  withKlookLocale(hanedaLimousineBus, "zh-cn", {
    title: "羽田机场－东京利木津巴士",
    desc: "从羽田三座航站楼出发，目的地包括新宿、池袋与迪士尼度假区",
  }),
  withKlookLocale(klookPassGreaterTokyo, "zh-cn", {
    title: "Klook Pass Greater Tokyo",
    desc: "Klook 的多景点通票，可从清单选 2 到 7 个景点；确定三、四个付费景点后再比价",
  }),
  withKlookLocale({ title: "Klook 日本 eSIM", desc: "落地就有网络，和门票在同一个结账流程买好", url: klookEsim.url }, "zh-cn"),
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "东京自由行景点" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnThingsToDoTokyoPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, "zh-cn");

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
            东京自由行景点 2026：<br />必去清单与门票价格
          </h1>
          <p className={styles.heroSubtitle}>
            东京热门景点的官方门票价格、哪些要先订、哪些免费，
            以及其他可以吃早饭时再决定的行程。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "附核查日期的官方票价", "按紧迫性排序"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>东京哪些景点要先订票？</h2>
          <p className={styles.bodyText}>
            东京需要提前订票的只有几处：涩谷SKY（成人 {SKY_ONLINE_DAY} 起）、teamLab Planets（{zhPrice(PRICES.teamlabPlanets.adult)}）、
            东京迪士尼（{zhPrice(TOKYO_GUIDE_PRICES.tokyoDisney.adult)}）、华纳兄弟哈利波特影城（{PRICES.wbStudioTour.adult}），
            以及三丽鸥彩虹乐园的来园预约。其他都可以当天再决定；想看免费的景色，就去 202 米高的东京都厅观景室。
            以上是官方票价，每个数字的核查日期都列在下表。
          </p>
          <p className={styles.bodyText}>
            这一页只谈东京。京都、大阪与儿童票价请看{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景点门票价格总表（英文）
            </Link>
            ；想细看各观景台的差别，请看{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>东京观景台对比（英文）</Link>。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(SKY.klook.url, "zh-cn")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看涩谷SKY →
            </KlookLink>
            <KlookLink href={klookFor(PRICES.teamlabPlanets.klook.url, "zh-cn")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看 teamLab Planets →
            </KlookLink>
            <KlookLink href={klookFor(tokyoDisneyOneDayPassport.url, "zh-cn")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看东京迪士尼 →
            </KlookLink>
            <KlookLink href={klookFor(PRICES.wbStudioTour.klook.url, "zh-cn")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看华纳兄弟影城 →
            </KlookLink>
          </div>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>门票价格</span>
          <h2 className={styles.sectionTitle}>东京景点门票多少钱？</h2>
          <p className={styles.bodyText}>
            成人票方面，观景台或 teamLab 美术馆从 ¥1,500 到 ¥3,800 起，主题乐园或影城从 ¥3,900 到 ¥8,900 起。
            有几处票价按日期变动，所以“起”指的是官方公布的最低价。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["景点", "成人票价", "要先订吗", "当日票", "取消或改期", "核查日期", "详情"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider}>{row.name}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.book}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.change}</td>
                      <td style={{ fontSize: "0.88rem" }}>{label(row.checked)}</td>
                      <td style={{ fontSize: "0.88rem" }}>
                        <Link href={row.href} style={linkStyle}>攻略</Link>
                        {row.klook && (
                          <>
                            {" · "}
                            <KlookLink href={klookFor(row.klook, "zh-cn")} target="_blank" rel="sponsored noopener" style={linkStyle}>
                              Klook
                            </KlookLink>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            以上是官方成人票价与条款，于核查日期读自运营方网站。Klook 有自己的价格与取消条款，请打开商品页查看你的日期。
            卡丁车价格是 Street Kart 官方价目表上的每人价格范围。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(PRICES.teamlabBorderless.klook.url, "zh-cn")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看 teamLab 无界 →
            </KlookLink>
            <KlookLink href={klookFor(tokyoSightseeingBusTour.url, "zh-cn")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看东京一日游 →
            </KlookLink>
          </div>
        </section>

        <KlookTourPicks
          heading="值得提前订好的东京项目"
          intro="交通通票、一日游、夜间美食导览、住宿、机场交通、多景点通票与手机网络，再加上观景台门票与富士山大巴一日游。打开商品页查看你那天的实时价格。"
          tours={tours}
        />

        {/* Top picks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>必去清单</span>
          <h2 className={styles.sectionTitle}>东京必去景点有哪些？</h2>
          <p className={styles.bodyText}>
            东京必去的是日落时的观景台、一家 teamLab 美术馆、一天主题乐园，以及一个吃小店的夜晚。
            再加上神社、庭园与一趟一日游，第一次去东京就排满了。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>高处的视野：</strong>日落时的<Link href="/zh-cn/guides/attractions/shibuya-sky-tickets" style={linkStyle}>涩谷SKY</Link>，或不必预订的<Link href="/guides/attractions/tokyo-tower-tickets" style={linkStyle}>东京塔（英文）</Link>。</li>
            <li><strong>数字艺术：</strong><Link href="/zh-cn/guides/attractions/teamlab-planets-tickets" style={linkStyle}>teamLab Planets</Link> 或 <Link href="/zh-cn/guides/attractions/teamlab-borderless-tickets" style={linkStyle}>teamLab 无界</Link>。</li>
            <li><strong>一天乐园：</strong><Link href="/zh-cn/guides/attractions/tokyo-disney-tickets" style={linkStyle}>东京迪士尼</Link>、<Link href="/guides/attractions/sanrio-puroland-tickets" style={linkStyle}>三丽鸥彩虹乐园（英文）</Link>或室内的<Link href="/guides/attractions/tokyo-joypolis-tickets" style={linkStyle}>东京 Joypolis（英文）</Link>。</li>
            <li><strong>夜晚：</strong>走回忆横丁与黄金街的<Link href="/guides/attractions/tokyo-night-food-tour" style={linkStyle}>夜间美食导览（英文）</Link>。</li>
            <li><strong>动手体验：</strong>持有合格驾照文件的话，可以参加<Link href="/guides/attractions/tokyo-go-kart" style={linkStyle}>东京卡丁车（英文）</Link>。</li>
          </ul>
        </section>

        {/* Booking urgency */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>先订还是现场去</span>
          <h2 className={styles.sectionTitle}>东京景点要提前多久订？</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["景点", "何时订", "原因"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.thing}>
                      <td className={styles.tdProvider}>{row.thing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Free */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>免费</span>
          <h2 className={styles.sectionTitle}>东京有哪些免费景点？</h2>
          <p className={styles.bodyText}>
            你可以从 202 米高处看东京、走明治神宫的森林与皇居东御苑，也可以走过涩谷十字路口，这四处都不用买票。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["地点", "须知", "核查日期", "来源"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {freeRows.map((row) => (
                    <tr key={row.thing}>
                      <td className={styles.tdProvider}>{row.thing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.checked}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            冬天还有一些免费的{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours" style={linkStyle}>东京灯饰（英文）</Link>。
          </p>
        </section>

        {/* Subway ticket */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>东京地铁通票划算吗？</h2>
          <p className={styles.bodyText}>
            72 小时票通常划算，24 小时票要跑得多才划算。24 小时 {PRICES.tokyoSubwayTicket.adult}、48 小时 ¥1,500、
            72 小时 ¥2,000，最长的票平均每天约 ¥667；用 IC 卡每趟 ¥178 到 ¥324，大约四趟短程就回本。24 小时票则要五到六趟。
          </p>
          <p className={styles.bodyText}>
            它涵盖东京Metro与都营地铁，但不含 JR，所以山手线不能坐。完整的回本计算请看{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={linkStyle}>东京地铁通票攻略（英文）</Link>。
            票价与车费读自 tokyometro.jp，核查日期 {SUBWAY_CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(tokyoSubwayTicket.url, "zh-cn")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看东京地铁通票 →
            </KlookLink>
          </div>
        </section>

        {/* Days */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>规划</span>
          <h2 className={styles.sectionTitle}>东京要玩几天？</h2>
          <p className={styles.bodyText}>
            三天可以走完主要景点，五天还能排两趟出城的一日游。先把指定时段的票排好，再用可以现场去的行程填空档。
            我们的{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={linkStyle}>东京三天行程（英文）</Link>{" "}
            与{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>东京五天行程（英文）</Link>{" "}
            排好了每一天。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(tokyoSightseeingBusTour.url, "zh-cn")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看东京一日游 →
            </KlookLink>
            <KlookLink href={klookFor(shinjukuNightFoodWalkingTour.url, "zh-cn")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看夜间美食导览 →
            </KlookLink>
            <KlookLink href={klookFor(tokyoStayAreas[0].url, "zh-cn")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看新宿酒店 →
            </KlookLink>
          </div>
        </section>

        {/* Views from above */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>高处的视野</span>
          <h2 className={styles.sectionTitle}>东京观景台选哪一个？</h2>
          <p className={styles.bodyText}>
            <strong>涩谷SKY</strong> 是涩谷十字路口上方的露天屋顶，也是唯一一个“时段比门票重要”的观景台：
            成人网上预订 15 点前入场 {SKY_ONLINE_DAY}、15 点起 {SKY_ONLINE_LATE}；14 层售票柜台则是 {SKY_DOOR_DAY} 与{" "}
            {SKY_DOOR_LATE}（官方票价，核查日期 {SKY_CHECKED}）。日落一定落在较晚的时段，而会售罄的正是这些时段。详见我们的{" "}
            <Link href="/zh-cn/guides/attractions/shibuya-sky-tickets" style={linkStyle}>涩谷SKY 门票攻略</Link>。{" "}
            <strong>东京晴空塔</strong>是走高度的选项，350 层天望甲板 {priceLabel(PRICES.tokyoSkytree.adult, "zh-cn")}——
            <Link href="/zh-cn/guides/attractions/tokyo-skytree-tickets" style={linkStyle}>我们的晴空塔门票攻略</Link>
            解释了为什么一开始就加购 450 层，比到现场再加购便宜。
          </p>
          <p className={styles.bodyText}>
            在为任何一个付钱之前，先看看我们的{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>东京观景台对比（英文）</Link>，
            它把四座观景台放在一起比较——包括新宿的东京都厅，那里 202 米高的观景室是免费的。
          </p>
        </section>

        {/* teamLab */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>数字艺术</span>
          <h2 className={styles.sectionTitle}>teamLab 美术馆订哪一家？</h2>
          <p className={styles.bodyText}>
            东京有两家 teamLab 数字艺术美术馆——丰洲的 Planets 与麻布台的无界——
            两家都是走进去的沉浸式体验，都采用指定时段入场，而且很快售罄。我们的{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-planets-tickets" style={linkStyle}>teamLab 门票攻略</Link>{" "}
            对比了两家，说明哪一家适合你的行程，以及怎么在售罄之前订到。
          </p>
        </section>

        {/* Theme parks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>主题乐园</span>
          <h2 className={styles.sectionTitle}>东京迪士尼和华纳兄弟影城要订吗？</h2>
          <p className={styles.bodyText}>
            <strong>东京迪士尼</strong>（乐园与海洋）用的是指定日期票，提前数周就会售罄，而且门口完全不卖票——
            官网还可能拒绝境外信用卡。我们的{" "}
            <Link href="/zh-cn/guides/attractions/tokyo-disney-tickets" style={linkStyle}>东京迪士尼门票攻略</Link>{" "}
            说明怎么买以及两座园区怎么选。哈利波特迷的话，<strong>华纳兄弟哈利波特影城东京</strong>
            是位于练马的哈利波特影城，指定时段、不可重复入场，要预留大约四小时——详情见我们的{" "}
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" style={linkStyle}>影城攻略（英文）</Link>。
          </p>
        </section>

        {/* Experiences */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>体验</span>
          <h2 className={styles.sectionTitle}>东京有哪些值得订的体验？</h2>
          <p className={styles.bodyText}>
            动手类的体验大多可以很晚才订，只有一个例外。<strong>街头卡丁车</strong>让你穿着角色服装开上东京的公共道路，
            但它需要国际驾照，而国际驾照必须在出国前、在你自己的国家办理——我们的{" "}
            <Link href="/guides/attractions/tokyo-go-kart" style={linkStyle}>卡丁车攻略（英文）</Link>{" "}
            说明谁能办、谁不能办。想看日本的国技，我们的{" "}
            <Link href="/guides/attractions/sumo-tokyo-tickets" style={linkStyle}>东京相扑攻略（英文）</Link>{" "}
            对比了赛事门票（东京只在 1 月、5 月与 9 月有）与全年都有的晨间训练参观行程。
          </p>
          <p className={styles.bodyText}>
            比较安静的选择方面，浅草的{" "}
            <Link href="/guides/attractions/kimono-rental-japan" style={linkStyle}>和服租赁（英文）</Link>{" "}
            是要投入半天、有固定归还时间的行程，而不只是租件衣服；{" "}
            <Link href="/guides/attractions/tea-ceremony-japan" style={linkStyle}>茶道体验（英文）</Link>{" "}
            不到一小时，大多数面向游客的项目都用英文教学；而{" "}
            <Link href="/guides/attractions/samurai-ninja-experience-tokyo" style={linkStyle}>武士与忍者体验（英文）</Link>{" "}
            其实是用同一个名字在卖三种相当不同的东西。
          </p>
        </section>

        {/* Food */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>美食</span>
          <h2 className={styles.sectionTitle}>东京美食导览值得订吗？</h2>
          <p className={styles.bodyText}>
            在东京，最好吃的东西常常藏在一扇你自己不会推开的门后——回忆横丁只有六个座位的居酒屋吧台、
            黄金街的小酒吧。这才是参加{" "}
            <Link href="/guides/attractions/tokyo-food-tour" style={linkStyle}>美食导览（英文）</Link>{" "}
            真正的理由：不是食物本身（那你自己也找得到），而是那些店。如果你更想带点什么回家，{" "}
            <Link href="/guides/attractions/tokyo-cooking-class" style={linkStyle}>料理课（英文）</Link>{" "}
            用英文授课、大约两个小时，结束后你能自己再做一次那道菜。
          </p>
        </section>

        {/* Day trips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>出城</span>
          <h2 className={styles.sectionTitle}>从东京出发有哪些值得的一日游？</h2>
          <p className={styles.bodyText}>
            <Link href="/guides/attractions/kamakura-day-trip" style={linkStyle}>镰仓（英文）</Link>{" "}
            是你只想花一个早上做攻略时该去的：一条 JR 线不到一小时、JR Pass 本来就涵盖，
            露天大佛与长谷寺相隔几分钟。{" "}
            <Link href="/guides/attractions/nikko-day-trip" style={linkStyle}>日光（英文）</Link>{" "}
            往北两小时，看 UNESCO 世界遗产的神社与山中瀑布，两者之间的巴士是要提前规划的部分。
          </p>
          <p className={styles.bodyText}>
            富士山其实是两个不同的问题。想去河口湖一带的观景点，我们的{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>富士山一日游交通攻略（英文）</Link>{" "}
            介绍直达列车与 Mt. Fuji Pass；想登上山上的富士斯巴鲁线五合目，那需要大巴，我们的{" "}
            <Link href="/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>富士山一日游行程对比</Link>{" "}
            把各种行程整理清楚。{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>箱根（英文）</Link>{" "}
            是泡温泉的替代方案，一张周游券涵盖整个环线。
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <GygCompare
          slug="zh-cn-things-to-do-tokyo"
          heading="同一座城市的第二个商品目录"
          intro="这一页没有任何东西只依赖单一卖家。如果你在排日期时，上面某样已经售罄——涩谷SKY 的时段、富士山大巴、teamLab 的入场——GetYourGuide 的东京商品目录是另一个可以按日期搜索的地方，而且有 Klook 没有的运营商。"
          listings={[gygTokyo, gygTokyoEntryTickets]}
        />

        <Related
          items={[
            { href: "/guides/attractions/akihabara-anime-tour", title: "秋叶原动漫导览（2026）：导览行程、店铺营业时间与交通方式（英文）" },
            { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "从东京出发的 GALA 汤泽滑雪一日游：71 分钟、缆车票 ¥8,000（英文）" },
            { href: "/guides/attractions/tokyo-night-food-tour", title: "东京夜间美食导览（2026）：回忆横丁、黄金街与 20 岁以上规定（英文）" },
            { href: "/guides/attractions/where-to-stay-in-tokyo", title: "东京住宿区域推荐（2026）：按线路与机场对比最佳区域（英文）" },
            { href: "/guides/attractions/tokyo-illumination-tours", title: "东京灯光秀 2026：日期、时间与哪些免费（英文）" },
            { href: "/zh-cn/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 门票 2026：票价、时间与预约方式" },
            { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", title: "teamLab 无界 门票（2026）：票价、时段预约与购票渠道" },
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "东京五天行程（2026）：东京 5 天，每天怎么安排（英文）" },
            { href: "/guides/attractions/tokyo-joypolis-tickets", title: "东京 Joypolis 门票（2026）：Passport 票价、营业时间与身高限制（英文）" },
            { href: "/guides/attractions/japan-14-day-itinerary", title: "日本 14 天行程（2026）：日本两周，每天怎么安排（英文）" },
            { href: "/zh-cn/guides/esim/best-esim-japan", title: "日本eSIM推荐（2026）：流量卡方案比较与 Klook 日本 eSIM" },
            { href: "/guides/attractions/tokyo-bay-cruise", title: "东京湾游船（2026）：屋形船与 Symphony 对比、时间与票价（英文）" },
            { href: "/guides/attractions/tsukiji-market-food-tour", title: "筑地市场美食导览（2026）：营业时间、吃什么与该订哪个导览（英文）" },
            { href: "/guides/attractions/asakusa-kimono-rental", title: "浅草和服租赁（2026）：归还时间、发型造型与拍照地点（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "东京三天行程（2026）：要订什么、按什么顺序（英文）" },
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "从东京出发的河口湖一日游（2026）：路线、车费与一天能安排什么（英文）" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "三丽鸥彩虹乐园门票（2026）：票价、浮动票价与预约方式（英文）" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "富士急乐园门票（2026）：一日通票票价、Q Pack 与交通方式（英文）" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "东京塔门票（2026）：票价、主观景台与顶层观景台对比、预约方式（英文）" },
            { href: "/guides/attractions/tokyo-observation-decks", title: "东京观景台（2026）：涩谷SKY、晴空塔与东京塔对比（英文）" },
            { href: "/guides/attractions/tokyo-food-tour", title: "东京美食导览（2026）：选哪个区域，以及导览多给你什么（英文）" },
            { href: "/guides/attractions/tokyo-cooking-class", title: "东京料理课（2026）：寿司、拉面与上课内容（英文）" },
            { href: "/guides/attractions/samurai-ninja-experience-tokyo", title: "东京武士与忍者体验（2026）：该订哪一种（英文）" },
            { href: "/guides/attractions/nikko-day-trip", title: "从东京出发的日光一日游（2026）：交通、花费与要不要跟团（英文）" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
            { href: "/guides/transport/tokyo-transportation", title: "东京交通攻略（2026）：电车、地铁与 IC 卡一次看懂（英文）" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
          ]}
        />

        {/* Every guide for this city; the component compares against English hrefs and localises itself. */}
        <CityGuideIndex city="tokyo" exclude="/guides/attractions/things-to-do-tokyo" />
      </div>
    </>
  );
}
