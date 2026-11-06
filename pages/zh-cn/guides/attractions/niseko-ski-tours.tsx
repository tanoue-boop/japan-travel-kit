import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  hokkaidoPrivateCarCharterNiseko,
  japanWinterStayAreas,
  jrHokkaidoRailPass,
  klookEsim,
  newChitoseAirportTransfers,
  nisekoHirafuEnglishSkiLesson,
  nisekoHirafuLiftPassBusTour,
  nisekoResortShuttleBus,
  nisekoRusutsuKiroroPrivateLesson,
  nisekoSkiHotSpringTourFromSapporo,
  nisekoSkiSnowboardRental,
  noboribetsuToyaNisekoDayTour,
  rhythmNisekoPrivateSkiLesson,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { seoTags } from "../../../../components/IntlSeo";
import {
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
} from "../../../../components/IntlChrome";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

// Mirrors the English guide (pages/guides/attractions/niseko-ski-tours.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/niseko-ski-tours";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "二世谷滑雪" }];

const OWN_ISO = "2026-11-01";
const OWN = dateLabel(OWN_ISO, LOCALE);

const SEASON_ISO = "2026-11-06";
const SEASON = dateLabel(SEASON_ISO, LOCALE);

const LESSON_PEAK = "2026 年 12 月 14 日到 2027 年 1 月 3 日，以及 2027 年 2 月 6 到 12 日";

const AIRPORT_BUS = "2.5 小时";
const AIRPORT_BUS_FARE = "¥6,000";
const AIRPORT_TRAIN = "3 小时";
const AIRPORT_TRAIN_FARE = "¥6,200";
const SEASON_OPEN = "2026 年 11 月 28 日";
const PEAK_FROM = "2026 年 12 月 24 日";
const PEAK_TO = "2027 年 2 月 28 日";
const PEAK_DAY = "¥13,500";
const REGULAR_DAY = "¥12,600";
const EARLY_DAY = "¥8,800";

const accessRows = [
  {
    option: "新千岁机场直达巴士",
    time: AIRPORT_BUS,
    cost: AIRPORT_BUS_FARE,
    booking: "需预约",
    note: `第一次去的默认选择，也是能放雪具的方式。数字出自 Niseko United。因为要预约，所以要在出发前决定，没有现场购票的版本。核查日期：${OWN}。`,
  },
  {
    option: "电车加公交巴士",
    time: AIRPORT_TRAIN,
    cost: AIRPORT_TRAIN_FARE,
    booking: "不需预约",
    note: "比巴士慢半小时、贵 ¥200，但这是唯一不用预约就能去的方式。不选它的原因是行李：带着雪具在冬天的站台换车，没有人会提前想到。",
  },
  {
    option: "季节滑雪巴士",
    time: "3 到 3.5 小时",
    cost: AIRPORT_BUS_FARE,
    booking: "需预约；仅 12 月至 3 月",
    note: "票价与直达巴士相同，最多多一小时，因为沿途停靠度假村。住宿刚好在路线上才有用。",
  },
  {
    option: "租车",
    time: "2 小时",
    cost: "每天 ¥8,000 起",
    booking: "需预约",
    note: "官方列出最快的方式，但有条件：这是北海道冬季道路，没开过冰雪路的话，两小时这个数字没有意义。",
  },
  {
    option: "包车接送",
    time: "2 小时",
    cost: "¥25,000 起",
    booking: "需预约",
    note: "按车计价而不是按人计价，所以对家庭或四人以上团体很合理。也是唯一配合航班实际到达时间出发的方式。",
  },
];

const seasonRows = [
  { what: "四区全部开放", detail: `${SEASON_OPEN}` },
  { what: "Grand HIRAFU 与 Annupuri 关闭", detail: "2027 年 5 月 5 日" },
  { what: "Hanazono 关闭", detail: "2027 年 4 月 11 日" },
  { what: "Niseko Village 关闭", detail: "2027 年 4 月 4 日" },
  { what: "夜间滑雪", detail: "2026 年 12 月 12 日到 2027 年 3 月 22 日" },
  { what: "早季", detail: "2026 年 11 月 28 日到 12 月 11 日，这段时间不在网上销售" },
  { what: "普通季", detail: "2026 年 12 月 12 到 23 日，以及 2027 年 3 月 1 到 22 日" },
  { what: "旺季", detail: `${PEAK_FROM} 到 ${PEAK_TO}` },
  { what: "春季", detail: "2027 年 3 月 23 日到 4 月 4 日" },
  { what: "末季", detail: "2027 年 4 月 5 日到 5 月 5 日" },
];

const passRows = [
  { period: "早季（2026/11/28–12/11）", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "普通季（2026/12/12–23、2027/3/1–22）", adult: REGULAR_DAY, youth: "¥10,700", child: "¥7,600", senior: "¥10,700" },
  { period: `旺季（${PEAK_FROM}–${PEAK_TO}）`, adult: PEAK_DAY, youth: "¥11,500", child: "¥8,100", senior: "¥11,500" },
  { period: "春季（2027/3/23–4/4）", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "末季（2027/4/5–5/5）", adult: "¥6,300", youth: "¥5,400", child: "¥3,800", senior: "¥5,400" },
];

const areaRows = [
  {
    area: "Grand HIRAFU",
    what: "四区中最大，也有村镇：餐厅、酒吧、租赁店和度假村滑雪学校都在这里",
    stay: "默认的住宿区，也是唯一晚上出门步行、不用坐接驳车的区域",
    note: "Grand Hirafu 官方数字：22 条雪道（初级 9、中级 6、高级 7），2 座缆车和 7 座吊椅，垂直落差 940 米（山顶 1,200 米、山脚 260 米），最长雪道 5,300 米。",
  },
  {
    area: "Hanazono",
    what: "山上最安静的一侧，也是度假村直营 Niseko International Snowsports School 的所在地",
    stay: "适合家庭或新手：初级雪道人少，课程从这里开始",
    note: "官方的教练课规定也出自这里：旺季只能预约全天课程。想在圣诞节上半天课之前，请先看清楚。",
  },
  {
    area: "Niseko Village",
    what: "以酒店为主的区域，缆车就在住宿门口，不用隔一条街",
    stay: "适合看重 ski-in, ski-out 便利、晚上不外出的旅行",
    note: "四区中最早关闭：2027 年 4 月 4 日，比 Grand HIRAFU 和 Annupuri 早一个月。订晚季时请确认。",
  },
  {
    area: "Annupuri",
    what: "四区中雪道最宽、最平缓，位于相连区域最西侧",
    stay: "安静的选择，适合想要空间而不是夜生活的中级滑雪者",
    note: "与 Grand HIRAFU 一起营业到 2027 年 5 月 5 日，所以适合春季或黄金周。",
  },
];

const monthRows = [
  {
    month: "12 月",
    snow: "最近一个完整雪季 Grand Hirafu 累积 386 厘米",
    crowds: "假期前缆车人少；旺季前的住宿价",
    verdict: "Niseko United 称这是当地人的月份。早季是整个冬天最便宜的 ¥8,800，但 12 月 12 日前不在网上销售，平安夜起就是旺季价。",
  },
  {
    month: "1 月",
    snow: "累积 620 厘米，是该季雪量远超其他月份的月份",
    crowds: "人多，度假村自己也用「拥挤」形容",
    verdict: `「Japanuary」，Niseko United 说这里是「全世界降雪最稳定的地方之一」。代价是整个月都是旺季价，每天 ${PEAK_DAY}。`,
  },
  {
    month: "2 月",
    snow: "累积 263 厘米，山顶积雪达当季最深的 400 厘米",
    crowds: "人多，春节前后最多，热门餐厅常客满",
    verdict: "粉雪持续，被雪埋住的村镇最上镜。到 2 月 28 日都是旺季价，雪祭那周札幌也客满。",
  },
  {
    month: "3 月",
    snow: "累积 75 厘米，但山顶仍有 380 厘米",
    crowds: "第一周后人变少",
    verdict: "最划算的月份，度假村自己也这么说：晴天较多、气温较暖、教练课和租赁有春季优惠，还是「最适合野雪探索的月份」。3 月 22 日前是普通价，之后春季价 ¥8,800。",
  },
  {
    month: "4 月到 5 月初",
    snow: "度假村资料：山顶积雪 4 月 315 厘米、5 月 170 厘米",
    crowds: "黄金周以外人少",
    verdict: "全年最便宜的雪票，4 月 5 日起每天 ¥6,300。这个时候只有 Grand HIRAFU 和 Annupuri 开放，Niseko Village 4 月 4 日、Hanazono 4 月 11 日关闭。",
  },
];

const faqItems = [
  {
    q: "新千岁机场怎么到二世谷？",
    a: `Niseko United 列出五种方式，默认是直达巴士：根据其交通页（核查日期：${OWN}）为 ${AIRPORT_BUS}、${AIRPORT_BUS_FARE}，需预约。其他选择同一来源：电车加公交巴士 ${AIRPORT_TRAIN}、${AIRPORT_TRAIN_FARE}，不需预约；季节滑雪巴士 3 到 3.5 小时、${AIRPORT_BUS_FARE}，仅 12 月至 3 月；租车 2 小时，每天 ¥8,000 起；包车 2 小时，¥25,000 起。多数人由两件事决定。第一是行李：巴士商品可放雪具加每人一件行李，1 月在北海道站台带雪具换车没有人会提前想到。第二是预约：只有电车加巴士不用预约，其他都要在出发前决定。自驾的话，两小时的前提是你习惯冰雪路。`,
  },
  {
    q: "二世谷什么时候滑雪最好？",
    a: `要雪选 1 月，要划算选 3 月，要安静选 12 月。Grand Hirafu 最近完整雪季在约 850 米的白桦雪道测得的累积降雪（核查日期：${OWN}）为 12 月 386 厘米、1 月 620 厘米、2 月 263 厘米、3 月 75 厘米，1 月遥遥领先，Niseko United 形容这里是「全世界降雪最稳定的地方之一」。代价是人潮和旺季价：整个 1 月都在 ${PEAK_FROM} 到 ${PEAK_TO} 的旺季区间，每天 ${PEAK_DAY}。2 月粉雪持续，加上春节人潮，山顶积雪达当季最深的 400 厘米。3 月是度假村主打划算的月份：晴天多、气温暖、教练课和租赁有春季优惠，也是「最适合野雪探索的月份」，山顶仍有 380 厘米，3 月 23 日起雪票降到 ${EARLY_DAY}。假期前的 12 月是当地人的选择：缆车人少、旺季前价格，雪票是冬季最低的 ${EARLY_DAY}。`,
  },
  {
    q: "二世谷滑雪课要提前预约吗？",
    a: `要，而且这不只是建议，而是官方规定。度假村直营的 Niseko International Snowsports School 在官网写明（核查日期：${SEASON}）「旺季仅可预约全天课程」，其教学旺季是 ${LESSON_PEAK}。这和缆车票的旺季不同：1 月下旬的半天课可以预约，12 月 20 日或 2 月 8 日的半天课只能现场询问。如果那几周你或孩子只适合上半天，请订全天提前结束，或改日期。学校暂定 2026 年 11 月 28 日到 2027 年 4 月 11 日开课，有团体、私人和定制课程，2026-27 已开放预约。经销商的私人课是另一批名额，可用海外信用卡付款，度假村学校满员时很有用。`,
  },
  {
    q: "二世谷适合新手吗？",
    a: `适合，比粉雪名声看起来更适合。根据 Grand Hirafu 官方雪道资料（核查日期：${OWN}），22 条雪道中有 9 条是初级（中级 6、高级 7），四区中最宽最平缓的雪道在西侧的 Annupuri。对新手有利的有两点：通用的 All Mountain Pass 让你进步时不会被困在一座山上；度假村滑雪学校在最安静的 Hanazono，学习的雪道上快速滑行的人较少。不利的也有两点：上面的预约规定是真正的问题，学校旺季 ${LESSON_PEAK} 只能预约全天课，对想谨慎上半天的新手不方便；旺季一日票成人 ${PEAK_DAY}，1 月的新手付的钱和高手滑全山一样，却只用九条初级道。这是选 12 月或 3 月的理由。`,
  },
  {
    q: "二世谷住哪里好？",
    a: `没有特别理由就选 Grand HIRAFU。它是四区中最大、唯一有村镇的区域，餐厅、酒吧、租赁店和晚上的活动都能步行到。官方数字：22 条雪道、2 座缆车和 7 座吊椅、垂直落差 940 米（山顶 1,200 米、山脚 260 米）、最长雪道 5,300 米。其他三区各有明确的好处。Hanazono 最安静，有度假村滑雪学校，适合家庭和新手。Niseko Village 以酒店为主，真正 ski-in, ski-out，适合晚上不外出的旅行。Annupuri 雪道最宽最缓，人也最少。有个常被忽略的日期：四区不是一起关闭。Niseko Village 2027 年 4 月 4 日、Hanazono 4 月 11 日关闭，Grand HIRAFU 和 Annupuri 到 5 月 5 日，所以晚季或黄金周只有两区开放。所有日期出自 Niseko United，核查日期：${OWN}。`,
  },
  {
    q: "二世谷缆车票多少钱？",
    a: `覆盖四区的 All Mountain Pass 一日票，成人旺季 ${PEAK_DAY}、普通季 ${REGULAR_DAY}、早季或春季 ${EARLY_DAY}、末季 ¥6,300，均为 Niseko United 官方价，核查日期：${OWN}。4 到 12 岁儿童旺季 ¥8,100、普通季 ¥7,600、早季或春季 ¥5,300、末季 ¥3,800。13 到 15 岁青少年和 65 岁以上老人价格相同：旺季 ¥11,500、普通季 ¥10,700、早季或春季 ¥7,500、末季 ¥5,400。规划时要看的是时段而不是价格：旺季 ${PEAK_FROM} 到 ${PEAK_TO}，包含圣诞、新年、整个 1 月和整个 2 月。还有一个实务细节：2026 年 11 月 28 日到 12 月 11 日的早季票不在网上销售，所以冬季最便宜的一周要到柜台购买。`,
  },
  {
    q: "二世谷要跟团，还是可以自己去？",
    a: `完全看你住哪里，这正是这个搜索词没说出来的问题。住在二世谷就不用跟团：订好机场巴士、教练课、装备和雪票，日子自然过得去。住在札幌的话（不少人如此，因为酒店和餐厅都在市区），导览一日游是滑二世谷唯一合理的方式，因为根据 Niseko United 的数字，从机场这侧单程要 2 到 3.5 小时，自己安排的话大部分白天都花在巴士上。这就是札幌出发的雪票加巴士行程的用途：Grand Hirafu 固定六小时，交通和雪票一次订好。第三种情况是同行者有人滑、有人不滑，这时包车最合适，因为是按车计价而不是按滑雪人数计价。`,
  },
  {
    q: "可以从札幌当天往返二世谷吗？",
    a: `可以，但要是预订好的行程，不能临时凑。限制在距离：Niseko United 的交通页写新千岁到二世谷预约巴士 ${AIRPORT_BUS}、电车加公交巴士 ${AIRPORT_TRAIN}，札幌也在同一侧，所以自己安排的一日游大部分白天都在路上。解决这个问题的商品是把巴士包进价格、销售固定的滑雪时段，通常是 Grand Hirafu 约六小时含雪票，在札幌市区多个地点上车。想在城市旅行中滑上一天，这最合适。想滑两天的话，算法就变了，含住宿的两三天行程不再是奢侈。如果山因强风关闭（这会发生，上方缆车尤其常见），走同一巴士网的登别与洞爷湖一日游就是备选。`,
  },
  {
    q: "二世谷有夜间滑雪吗？",
    a: `有，根据 Niseko United 日期为 2026 年 12 月 12 日到 2027 年 3 月 22 日（核查日期：${OWN}）。这是选二世谷而不是本州雪场的实际理由之一：在白天最短的纬度，灯光雪道延长了冬天短短的一天，而且正好是雪最多的那几周。有两点要注意。日期不覆盖整季：${SEASON_OPEN} 开业后的前两周没有夜滑，3 月 22 日后的春季和末季也没有，如果选了便宜的 4 月就要留意。夜间运营也和这里的一切一样看天气：上方缆车因风暂停，暴风雪的夜晚灯就不开。请看度假村每日的运营信息，不要只看攻略，包括这一篇。`,
  },
  {
    q: "二世谷要玩几天？",
    a: `为了雪而来的话至少三晚，原因在交通而不是山。根据 Niseko United 的数字，机场单程预约巴士 ${AIRPORT_BUS}，两晚的行程有相当部分在车上，一晚不值得。三晚有两个完整的滑雪日，加上到达当天下午或离开当天早上。五到七晚才开始值回票价，因为二世谷最有名的稳定、反复的粉雪是统计上的论点，不是一天的事，Grand Hirafu 1 月 620 厘米代表的是很多个早晨。反过来说，如果旅行以城市为主、只想滑一天，就不要把据点搬到二世谷，订札幌出发的导览一日游、留在市区酒店就好。`,
  },
];

const nisekoSameTrip: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "二世谷的一天由天气决定：上方缆车因风暂停，暴风雪中各区关闭又重开，这些公告都发到手机，不会出现在山脚的公告栏。",
  },
  {
    label: "二世谷接驳巴士（新千岁机场与札幌）",
    ctaLabel: "查看二世谷接驳 →",
    url: klookFor(nisekoResortShuttleBus.url, LOCALE),
    why: "根据 Niseko United 的数字，新千岁直达巴士 2.5 小时、¥6,000，电车加巴士 3 小时、¥6,200。这款商品可放雪具加每人一件行李，并要求国内线到达后 45 分钟、国际线到达后 90 分钟，请配合航班。",
  },
  {
    label: "JR 北海道周游券",
    ctaLabel: "查看 JR 北海道周游券 →",
    url: klookFor(jrHokkaidoRailPass.url, LOCALE),
    why: "只有二世谷是环岛长途旅行的一站才需要。根据 JR 北海道页面 5 天 ¥22,000 起，不含巴士，所以机场到度假村往返的旅行不用买。",
  },
  {
    label: "二世谷 Grand Hirafu 英语滑雪与单板课（4 或 6 小时）",
    ctaLabel: "查看二世谷教练课 →",
    url: klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE),
    why: `这项预订背后有官方规定：度假村学校在其旺季 ${LESSON_PEAK} 只接受全天课预约，所以那几周的半天课要通过经销商或现场询问。`,
  },
  {
    label: "二世谷雪具租赁（Rhythm，比罗夫）",
    ctaLabel: "查看二世谷雪具租赁 →",
    url: klookFor(nisekoSkiSnowboardRental.url, LOCALE),
    why: "出发前先预约装备，在缆车脚下的比罗夫领取，差别在于第一个早晨是在滑雪还是在排队。",
  },
  {
    label: "二世谷酒店",
    ctaLabel: "在 Klook 查看二世谷酒店 →",
    url: klookFor(japanWinterStayAreas[7].url, LOCALE),
    why: "决定其他一切的预订。住在四区中的哪一区，决定缆车是步行还是坐接驳车，Niseko United 也说旺季假期很早就订满。",
  },
];

const TITLE = "二世谷滑雪（2027）：接送、教练课与四大区域";
const DESC =
  "二世谷滑雪与交通：新千岁机场预约巴士 2.5 小时，四大相连雪场，旺季缆车票 ¥13,500，附 2026-27 官方日期。";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function NisekoSkiToursPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG[LOCALE] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

            <Breadcrumb trail={trail} />

            <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
更新于 {monthLabel(updated.iso, LOCALE)}
</p>
          <h1 className={styles.heroTitle}>
二世谷滑雪：<br />交通、教练课与四大区域
</h1>
          <p className={styles.heroSubtitle}>
四座相连雪场，新千岁预约巴士 {AIRPORT_BUS}，还有一条常让人措手不及的官方期限：旺季教练课规定。
</p>
          <div className={styles.heroBadges}>
            {[`更新于 ${monthLabel(updated.iso, LOCALE)}`, "2026-27 官方日期", "All Mountain Pass 票价", "旺季教练课规定，附出处"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
                <Disclosure />

        <WinterBookingTop
          heading={"2026-27 冬季该订哪些二世谷滑雪行程？"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
圣诞或新年期间，请在缆车开放的 11 月 28 日前订好教练课和机场巴士：学校的教学旺季从 12 月 14 日开始，期间只能预约全天课。1、2 月的话，请在 12 月 31 日前订好，赶在学校第二个旺季 2 月 6 到 12 日之前。
</>
          }
          tours={[
            {
              title: "札幌出发二世谷 Grand Hirafu 滑雪行程（6 小时雪票加巴士）",
              url: klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE),
              price: null,
              duration: "当天往返，6 小时雪票",
              departs: "札幌市区 10 个上车点",
            },
            {
              title: "二世谷 Grand Hirafu 英语滑雪与单板课（4 或 6 小时）",
              url: klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE),
              price: null,
              duration: "4 或 6 小时",
              departs: "Niseko Tokyu Grand Hirafu",
            },
            {
              title: "札幌出发登别、洞爷湖与二世谷一日游",
              url: klookFor(noboribetsuToyaNisekoDayTour.url, LOCALE),
              price: null,
              duration: "约 10 小时",
              departs: "札幌",
            },
          ]}
        />

                <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>
快速解答
</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
从新千岁出发
</p>
                <p className={styles.verdictStatValue}>
预约巴士 {AIRPORT_BUS}
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
雪季
</p>
                <p className={styles.verdictStatValue}>
2026/11/28 – 2027/5/5
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
一日雪票
</p>
                <p className={styles.verdictStatValue}>
旺季 {PEAK_DAY}／早季 {EARLY_DAY}
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
要提前订吗？
</p>
                <p className={styles.verdictStatValue}>
教练课和接送要
</p>
              </div>
            </div>
                        <p className={styles.verdictText}>
<strong>二世谷滑雪</strong>要先从交通想起，因为这是最长的部分：Niseko United 的交通页写明<strong>新千岁机场到二世谷，预约直达巴士 {AIRPORT_BUS}、{AIRPORT_BUS_FARE}</strong>，不需预约的电车加公交巴士 {AIRPORT_TRAIN}、{AIRPORT_TRAIN_FARE}，租车或包车 2 小时。到达的是<strong>一张雪票通用的四座相连雪场</strong>：<strong>Grand HIRAFU</strong>（最大，有村镇）、<strong>Hanazono</strong>（最安静，有度假村滑雪学校）、<strong>Niseko Village</strong>（ski-in, ski-out 酒店）和 <strong>Annupuri</strong>（最宽最缓）。四区都在 <strong>{SEASON_OPEN}</strong>开放，Grand HIRAFU 和 Annupuri 营业到 <strong>2027 年 5 月 5 日</strong>。All Mountain Pass 一日票在 <strong>{PEAK_FROM} 到 {PEAK_TO}</strong>的旺季是 <strong>{PEAK_DAY}</strong>，早季或春季 <strong>{EARLY_DAY}</strong>。唯一要预约而不是当天买的是<strong>教练课</strong>：度假村学校表示其旺季 {LESSON_PEAK} 只能预约全天课。所有数字均出自运营方官方，{SEASON} 重新核查。
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
札幌出发二世谷一日 →
</KlookLink>
              <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
二世谷机场接驳 →
</KlookLink>
            </div>
          </div>
        </div>

                <KlookTripPrep
          label={"同一趟旅行要订的"}
          heading={"二世谷之旅实际要订什么"}
          intro={"先订流量和机场巴士，因为这份清单上其他项目当天出错都不致命。Niseko United 的交通页标出了差距：预约巴士 2.5 小时，不预约的电车加巴士 3 小时。"}
          items={nisekoSameTrip}
        />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
交通方式
</span>
          <h2 className={styles.sectionTitle}>
新千岁机场怎么到二世谷？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
多数人的答案是<strong>预约直达巴士，{AIRPORT_BUS}、{AIRPORT_BUS_FARE}</strong>，这是 Niseko United 的官方数字。度假村公布五种方式，差别不在速度（2 到 3.5 小时），而在<strong>能不能不预约就去</strong>以及<strong>雪具怎么办</strong>。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["方式", "时间", "费用", "预约", "备注"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.booking}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
表中时间和票价都出自 Niseko United 的「Getting to Niseko」页面，{SEASON} 重新核查；备注栏是我们写的。有一件事表格看不出来，商品页才有：这班巴士能不能放雪具、每人可带多少行李。度假村接驳巴士的商品写明一件行李加雪具，这正是它和电车不同的地方。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷度假村接驳 →
</KlookLink>
            <KlookLink href={klookFor(hokkaidoPrivateCarCharterNiseko.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷包车 →
</KlookLink>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
新千岁接送 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
雪季
</span>
          <h2 className={styles.sectionTitle}>
2026-27 二世谷何时开放、何时关闭？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
四区都在 <strong>{SEASON_OPEN}</strong>开放，但不是一起关闭。而且五个<strong>票价时段</strong>比开业日更影响预订，因为旺季包含圣诞、新年、整个 1 月和整个 2 月。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `Niseko United，2026-27（核查日期：${SEASON}）`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
所有日期出自 Niseko United，核查日期：{SEASON}。度假村表示关闭日期为预定，北海道的春天可能使其变动。订晚季前值得再看一次：<strong>Niseko Village 4 月 4 日、Hanazono 4 月 11 日关闭</strong>，Grand HIRAFU 和 Annupuri 到 5 月 5 日。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
雪票
</span>
          <h2 className={styles.sectionTitle}>
二世谷缆车票多少钱？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
覆盖四区的 <strong>All Mountain Pass</strong> 一日票，成人从 <strong>{EARLY_DAY}</strong> 到 <strong>{PEAK_DAY}</strong>，完全看你什么时候去。13 到 15 岁青少年和 65 岁以上老人价格相同，这并不常见，同行的话值得知道。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["时段", "成人", "青少年 13–15 岁", "儿童 4–12 岁", "老人 65 岁以上"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.period}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.period}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td className={styles.tdPrice}>{row.youth}</td>
                      <td className={styles.tdPrice}>{row.child}</td>
                      <td className={styles.tdPrice}>{row.senior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
<strong>一个会改变计划的实务细节。</strong>早季票是冬季最便宜的一周（2026 年 11 月 28 日到 12 月 11 日），但 Niseko United 注明<strong>不在网上销售</strong>。所以全季最便宜的滑雪要到达后在柜台买，这没问题，只是无法在家先锁定。多日票最长七天，另有仅限网上的 50 小时票；这里只列一日票，因为那是我们能完整读到的度假村票价表。所有价格核查日期：{SEASON}。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
比罗夫雪票加巴士行程 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiSnowboardRental.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
预约二世谷雪具 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
教练课
</span>
          <h2 className={styles.sectionTitle}>
二世谷滑雪课要提前预约吗？
</h2>
          <p className={styles.bodyText}>
<strong>要，而且这是官方规定，不只是建议。</strong>度假村直营的 <strong>Niseko International Snowsports School</strong> 在官网写明（核查日期：{SEASON}）：<em>「旺季仅可预约全天课程。」</em>学校的旺季是 <strong>{LESSON_PEAK}</strong>，和缆车票的旺季 {PEAK_FROM} 到 {PEAK_TO} 不同。所以圣诞新年那几周和 2 月 6 到 12 日那周，半天课要现场询问，而不是提前预约。
</p>
          <p className={styles.bodyText}>
对家庭或新手来说，这是本页最重要的一句话，因为它颠覆了平常的计划。如果那几周你或孩子的体力只适合半天，有三个选择：订全天、午餐时结束；改到学校的普通周（12 月 8 到 13 日、1 月 4 日到 2 月 5 日、2 月 13 到 28 日）；或通过经销商预订，那是另一批名额，用你的货币计价，页面也是英文。学校暂定 <strong>{SEASON_OPEN}到 2027 年 4 月 11 日</strong>开课，有团体、私人和定制课程，2026-27 已开放预约。
</p>
          <p className={styles.bodyText}>
学校的私人课最多六人一组，根据官网（核查日期：{SEASON}）：六小时 Niseko Classic 旺季 <strong>¥120,000</strong>、普通周 ¥93,000、早季和春季 ¥87,000；上午课 ¥93,000、¥71,000、¥59,000；下午课 ¥55,000、¥43,000、¥43,000。团体课另有票价，11 月 28 日到 12 月 7 日不开课。经销商的价格请打开商品页按日期查看。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
比罗夫英语课 →
</KlookLink>
            <KlookLink href={klookFor(rhythmNisekoPrivateSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
Rhythm 私人课 →
</KlookLink>
            <KlookLink href={klookFor(nisekoRusutsuKiroroPrivateLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷／留寿都／喜乐乐 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
四大区域
</span>
          <h2 className={styles.sectionTitle}>
二世谷住哪里好？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>没有特别理由就选 Grand HIRAFU。</strong>它是四座相连雪场中最大、唯一有村镇的区域，所以晚餐步行就到，不用坐接驳车。其他三区各有明确的好处，真正的判断在最后一栏。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["区域", "特色", "适合住这里的人", "须知"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.stay}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
区域名称和关闭日期出自 Niseko United，Grand HIRAFU 雪道数字出自 Grand Hirafu：22 条雪道（初级 9、中级 6、高级 7）、2 座缆车和 7 座吊椅、垂直落差 940 米（山顶 1,200 米、山脚 260 米）、135 公顷、最长雪道 5,300 米、最陡 40°。均于 {OWN} 核查。Niseko United 表示最热门的住宿和旺季假期很早订满，但没有公布多早，所以我们也不写。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(japanWinterStayAreas[7].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
查看二世谷酒店 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiHotSpringTourFromSapporo.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
2 或 3 晚一次订好 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
哪个月
</span>
          <h2 className={styles.sectionTitle}>
二世谷什么时候滑雪最好？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>要雪选 1 月，要划算选 3 月，要安静选 12 月。</strong>降雪栏是 Grand Hirafu 最近完整雪季在约 850 米白桦雪道测得的每月累积量；人潮和评语栏根据 Niseko United 的逐月说明和公布的票价时段。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["月份", "降雪（上一完整雪季）", "人潮", "评语"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthRows.map((row) => (
                    <tr key={row.month}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.month}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.snow}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.crowds}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
降雪数字是单一雪季而非平均，也是度假村在山上单一地点的测量，请当作冬天的轮廓，不要当成预报。表中所有内容于 {OWN} 核查。<strong>夜间滑雪</strong>为 2026 年 12 月 12 日到 2027 年 3 月 22 日，所以开业的前两周和便宜的 4 月都没有。
</p>
        </section>

                <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>
要不要跟团
</span>
          <h2 className={styles.sectionTitle}>
二世谷要跟团，还是可以自己去？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
完全看你住哪里，这才是「二世谷滑雪行程」这个词背后的问题。四种情况，要四种不同的预订。
</p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
住二世谷？不用跟团
</p>
              <p className={styles.whoForDesc}>
订好机场巴士和装备，想上课就订教练课，买雪票，其他自然就好，四区一张票通用。有期限的预订只有接送、旺季教练课和住宿。
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
住札幌？订一日行程
</p>
              <p className={styles.whoForDesc}>
这才是真正需要导览行程的情况。根据 Niseko United 的数字单程 2 到 3.5 小时，自己安排的话白天都在巴士上。雪票加巴士商品销售 Grand Hirafu 的固定时段，交通和雪票一个价。
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
同行有人不滑？按车计价
</p>
              <p className={styles.whoForDesc}>
有人滑、有人不滑是二世谷最难安排的旅行，按座位计价在这里行不通。包车按车计价，所以四人以上时很合理。
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
不管怎样都看天气条款
</p>
              <p className={styles.whoForDesc}>
这座山的特点：上方缆车常因风暂停，要当成规划前提，而不是运气不好。预订前请看运营方取消和自己取消时的规定，本页无法告诉你，因为每款商品和日期都不同。
</p>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
有一项预订不属于以上任何一类：<strong>流量</strong>。二世谷的一天比日本其他滑雪旅行更受天气左右：缆车在暴风雪中暂停又重开、区域关闭、公路接送延误，这些公告都发到手机，不会出现在山脚的公告栏。<KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>查看 Klook eSIM →</KlookLink> <Link href="/zh-cn/guides/esim/best-esim-japan">日本流量卡推荐攻略</Link>比较了其他选择，<Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en">日本滑雪旅行保险攻略（英文）</Link>则说明买雪票前要处理的另一件事：你的保单是否覆盖雪上运动，以及有什么条件。
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
冬季行程的其他部分
</span>
          <h2 className={styles.sectionTitle}>
二世谷可以搭配什么？
</h2>
          <p className={styles.bodyText}>
2 月的旅行可以同时有城市和雪。<Link href="/zh-cn/guides/attractions/sapporo-snow-festival-tours">札幌雪祭攻略</Link>介绍 2027 年 2 月 4–11 日的八天，<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">札幌出发小樽一日游（英文）</Link>是回机场路上最轻松的休息日。如果雪只是一周的一部分，<Link href="/zh-cn/guides/attractions/hokkaido-7-day-itinerary">北海道 7 日游</Link>有改成滑雪的版本，<Link href="/zh-cn/guides/attractions/japan-winter-itinerary">日本冬季行程</Link>则把北海道当成全国旅行的一段。
</p>
          <p className={styles.bodyText}>
会经过东京？如果没滑过雪，想在决定去北海道前试试，<Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">东京出发 GALA 汤泽滑雪（英文）</Link>是负担较小的版本。同行不滑雪的人可以选<Link href="/zh-cn/guides/attractions/jigokudani-snow-monkey-tour">地狱谷雪猴行程</Link>和<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山与白川乡行程（英文）</Link>，都是不用滑雪的雪地之旅，<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">东京灯饰（英文）</Link>攻略则适合航班前后的夜晚。
</p>
        </section>

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"实际可以预订的二世谷行程"}
          intro={"同一趟旅行的四种形式：札幌出发的 Grand Hirafu 六小时含雪票、含住宿的两三晚、同行有人不滑时的包车，以及上方缆车因风暂停那天早上的非滑雪北海道一日游。"}
          tours={[withKlookLocale(nisekoHirafuLiftPassBusTour, LOCALE, { title: "札幌出发二世谷 Grand Hirafu 滑雪行程（6 小时雪票加巴士）", desc: "Grand Hirafu 六小时，札幌市区往返巴士和雪票一次订好，在市区多个地点上车" }), withKlookLocale(nisekoSkiHotSpringTourFromSapporo, LOCALE, { title: "札幌出发二世谷滑雪与温泉行程（2 天 1 晚／3 天 2 晚）", desc: "适合旅途中才发现一天不够的游客：小团、别墅住宿、札幌出发" }), withKlookLocale(hokkaidoPrivateCarCharterNiseko, LOCALE, { title: "北海道包车（札幌／新千岁到二世谷）", desc: "7 到 14 座含司机，往返札幌或机场与二世谷、留寿都、洞爷湖或富良野，按你的时间出发，不受时刻表限制" }), withKlookLocale(noboribetsuToyaNisekoDayTour, LOCALE, { title: "札幌出发登别、洞爷湖与二世谷一日游", desc: "地狱谷、洞爷湖和二世谷一侧的全天导览，是滑雪周的休息日，也是山因风关闭时可用的方案" })]}
        />

                <Related items={[{ href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "东京出发 GALA 汤泽滑雪一日游：71 分钟，缆车 ¥8,000 （英文）" }, { href: "/guides/money/best-travel-insurance-japan", title: "日本旅行保险推荐 2026：谁需要什么 （英文）" }, { href: "/guides/money/japan-ski-travel-insurance", title: "日本滑雪旅行保险：普通保单不保什么 （英文）" }, { href: "/zh-cn/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 日游：每日路线" }, { href: "/zh-cn/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭（2027）：2/4–11 三会场免费，该订什么" }, { href: "/zh-cn/guides/attractions/japan-winter-itinerary", title: "日本冬季行程（2027）：12 天路线逐日安排" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出发小樽一日游（2027）：¥800，JR 33 分钟 （英文）" }, { href: "/zh-cn/guides/attractions/jigokudani-snow-monkey-tour", title: "东京出发雪猴行程：地狱谷野猿公苑攻略（2027）" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山与白川乡行程（2027）：该从哪里出发 （英文）" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "东京灯饰：日期、时间与免费景点 （英文）" }, { href: "/zh-cn/guides/esim/best-esim-japan", title: "日本 eSIM 推荐（2026）：运营商、价格与怎么选" }, { href: "/zh-cn/guides/attractions", title: "更多日本景点 →" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
四区、一张票、一个期限
</h2>
            <p className={styles.ctaBannerDesc}>
缆车 {SEASON_OPEN}开放，旺季价 {PEAK_FROM}开始。接送和教练课是有日期的两项预订：12 月 14 日到 1 月 3 日和 2 月 6 到 12 日，度假村学校只接受全天课预约。
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
查看二世谷滑雪行程 →
</KlookLink>
              <KlookLink href={klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
预约二世谷教练课 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
