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
import CityGuideIndex from "../../../../components/CityGuideIndex";
import GygCompare from "../../../../components/GygCompare";
import {
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  skytreeTicket,
  fujiHakoneDayTour,
} from "../../../../lib/klook-links";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { gygTokyo, gygTokyoEntryTickets } from "../../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { PRICES } from "../../../../lib/attraction-prices";

// Mirrors the English page (pages/guides/attractions/things-to-do-tokyo.tsx) as of
// 2026-11-01, section for section and block for block; no figures added beyond it.

const ROUTE = "/zh-cn/guides/attractions/things-to-do-tokyo";
const TITLE = "东京自由行景点（2026）：必去景点哪些要先订票、哪些可以现场去";
const DESC =
  "2026 年东京自由行景点，按紧迫性排序：真的会售罄的那四、五个指定时段门票，可以当天早上再决定的行程，以及全市最值得的免费视野。";

const CHECKED = dateLabel("2026-10-19", "zh-cn");
// Shibuya Sky and Skytree figures come from lib/attraction-prices.ts, as on the English page.
const SKY = PRICES.shibuyaSky;
const [SKY_ONLINE_DAY, SKY_ONLINE_LATE] = SKY.adult.split(" / ");
const [SKY_DOOR_DAY, SKY_DOOR_LATE] = (SKY.atDoor ?? "").split(" / ");
const SKY_CHECKED = dateLabel(SKY.checked, "zh-cn");

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

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
    a: "其实就四件事：东京迪士尼（指定日期、门口不卖票）、两家 teamLab 美术馆（30 分钟指定时段）、涩谷SKY 的日落时段，以及华纳兄弟哈利波特影城。大相扑也算，但只在你的日期落在 1 月、5 月或 9 月时。东京其他几乎所有东西——晴空塔、东京塔、神社、街区、免费的东京都厅观景台——都可以当天早上再决定。",
  },
  {
    q: "东京有免费的景点吗？",
    a: `有，而且其中一个是付费观景台的真正对手。新宿的东京都厅在 45 层、202 米处设有观景室，免费入场，晴空塔与东京塔都在视野里。神社、公园与整片街区都不用花钱就能逛，所以下面要付费的清单可以很短。高度与入场费读自 metro.tokyo.lg.jp，核查日期 ${CHECKED}。`,
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
            东京自由行景点（2026）：<br />必去景点哪些要先订票、哪些可以现场去
          </h1>
          <p className={styles.heroSubtitle}>
            东京真正会售罄的，只有四、五样。这页给你那份短名单、每一样要提前多久订，
            以及其他可以吃早饭时再决定的行程。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "按紧迫性排序", "官方票价"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>东京大部分的东西不需要预订</h2>
          <p className={styles.bodyText}>
            关于东京，最有用的一点是：真正有时效的景点名单非常短。四、五个场馆卖的是指定日期与时段、
            而且真的会售罄的票，其他东西——晴空塔、东京塔、神社、街区、全市最好的免费视野——
            都可以吃早饭时再决定。规划东京行程，主要就是先把那份短名单定下来。
          </p>
          <p className={styles.bodyText}>
            所以这一页是按紧迫性排序，而不是按名气。下面的表格说哪些要订、什么时候订；
            后面的段落则链接到每一样的完整攻略，附官方票价与从海外行得通的购票渠道。
          </p>
          <p className={styles.bodyText}>
            如果你想把这份清单的花费一次看完，我们的{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景点门票价格总表（英文）
            </Link>{" "}
            列出了下面每一个东京场馆的官方成人与儿童票价——外加日本其他地方的景点——并注明每个数字是哪一天从运营方官网读到的。
          </p>
        </section>

        {/* Booking urgency */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>先订还是现场去</span>
          <h2 className={styles.sectionTitle}>哪些要订、要提前多久</h2>
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

        {/* Views from above */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>高处的视野</span>
          <h2 className={styles.sectionTitle}>观景台</h2>
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
            它把四座观景台放在一起比较——包括新宿的东京都厅，那里 202 米高的观景室是免费的。票价核查日期 {CHECKED}。
          </p>
        </section>

        {/* teamLab */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>数字艺术</span>
          <h2 className={styles.sectionTitle}>teamLab 美术馆</h2>
          <p className={styles.bodyText}>
            东京有两家 teamLab 数字艺术美术馆——丰洲的 Planets 与麻布台的无界——
            两家都是走进去的沉浸式体验，都采用指定时段入场，而且很快售罄。我们的{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-tokyo-tickets" style={linkStyle}>teamLab 门票攻略</Link>{" "}
            对比了两家，说明哪一家适合你的行程，以及怎么在售罄之前订到。
          </p>
        </section>

        {/* Theme parks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>主题乐园</span>
          <h2 className={styles.sectionTitle}>东京迪士尼与华纳兄弟哈利波特影城</h2>
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
          <h2 className={styles.sectionTitle}>卡丁车、相扑、和服与刀剑</h2>
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
          <h2 className={styles.sectionTitle}>美食导览与料理课</h2>
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
          <h2 className={styles.sectionTitle}>四种一日游，四种不同的一天</h2>
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

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="值得提前订好的东京项目"
          intro="一张交通通票、大多数人最后都会买的那张观景台门票、一趟把三大景点串起来的导览，以及富士山的大巴一日游。打开商品页查看你那天的实时价格。"
          tours={tours}
        />

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
            { href: "/zh-cn/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 门票（2026）：票价、预约方式与无界比较" },
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
