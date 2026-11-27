import type { ReactNode } from "react";
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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import {
  galaNaebaSkiDayTripTokyo,
  galaYuzawaLiftTicket,
  galaYuzawaSkiLesson,
  hakubaSkiResortDayTourTokyo,
  hanedaLimousineBus,
  jrEastPass,
  jrTokyoWidePass,
  klookEsim,
  naritaExpressRoundTripUrl,
  shinkansenTokyoGalaYuzawa,
  yuzawaIwapparaSkiDayTourTokyo,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import HotelStayBlock from "../../../../components/HotelStayBlock";

// Mirrors the English page (/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo) section by
// section as of 2026-11-25 (task-jtk-20261125-TR03): same sections, tables, FAQ and Klook CTAs in
// the same places. Every figure, date and source is the English page's (read 15 Nov 2026); nothing
// is added. Title term: GALA汤泽滑雪场 — JR East's own Simplified Chinese page writes "GALA汤泽",
// and Simplified Chinese guides write GALA汤泽滑雪场.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo";
const TITLE = "GALA汤泽滑雪场 2026-27：东京新干线一日游与JR Pass";
const H1 = "GALA汤泽滑雪场 2026-27：东京出发新干线一日游、JR Pass 与交通方式";
const DESC =
  "东京到GALA汤泽滑雪场乘上越新干线直达最快 71 分钟，可用 JR Pass。缆车票 ¥8,000，12 月 19 日开放滑雪，一日游费用与预订清单。";

const OWN_ISO = "2026-11-15";
const OWN = dateLabel(OWN_ISO, LOCALE);
const JRP_7DAY = "¥50,000";
const EAST_PASS_5DAY = "¥35,000";
const SLED = "¥2,500";
const FASTEST = "71 分钟";
const SLOPES_OPEN = "2026 年 12 月 19 日";
const SLOPES_CLOSE = "2027 年 5 月 5 日";
const SIGHTSEEING_OPEN = "2026 年 12 月 12 日";
const LIFT_WINDOW = "¥8,000";
const LIFT_WEB = "¥7,500";
const SKI_SET = "¥6,500";
const WEAR = "¥5,500";
const PASS_ADULT = "¥16,000";
const JR_EXAMPLE = "约 ¥21,500";

const LIFT_URL = klookFor(galaYuzawaLiftTicket.url, LOCALE);
const LESSON_URL = klookFor(galaYuzawaSkiLesson.url, LOCALE);
const TRAIN_URL = klookFor(shinkansenTokyoGalaYuzawa.url, LOCALE);
const WIDE_URL = klookFor(jrTokyoWidePass.url, LOCALE);
const EAST_URL = klookFor(jrEastPass.url, LOCALE);
const IWAPPARA_URL = klookFor(yuzawaIwapparaSkiDayTourTokyo.url, LOCALE);
const CHARTER_URL = klookFor(galaNaebaSkiDayTripTokyo.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const accessRows = [
  {
    leg: "首选：东京站 → GALA 汤泽站，上越新干线直达（谷川号）",
    time: `最快 ${FASTEST}，例如谷川 71 号东京 6:24 → GALA 汤泽 7:35；JR 东日本的旅游目的地介绍页面也注明乘谷川号约需 1 小时 20 分钟`,
    trains: "季节限定：从 2026 年 12 月 12 日起，JR 东日本把常规运行的谷川号延长运行到 GALA 汤泽，并加开临时列车；途中停靠上野和大宫",
    cost: `可使用 JAPAN RAIL PASS、JR东京广域周游券（${PASS_ADULT}）和 JR EAST PASS；如果不使用周游券，上越新干线票价以付款页面为准`,
    note: "GALA 汤泽站是位于滑雪中心内、仅在特定季节运营的新干线车站，出站后即可在同一栋建筑内购买缆车票及租赁滑雪装备。不用坐巴士、不用换乘、不用打车。并非每班谷川号都开到 GALA 汤泽，请选择终点站为 GALA 汤泽站的列车。",
  },
  {
    leg: "东京站 → 越后汤泽站，再换乘免费接驳车",
    time: "乘上越新干线到越后汤泽，再乘雪场免费接驳车约 10 分钟",
    trains: "越后汤泽站是上越新干线上全年运营的车站，位于 GALA 汤泽站的前一站",
    cost: "接驳车免费；铁路区间同样可以使用上述三种周游券",
    note: "想乘的直达列车车票售罄或当天不运行时的替代方案，也是 GALA 汤泽站运营季节以外唯一的方式：按 JR 东日本的说明，GALA 汤泽站只在冬季和春季运营，越后汤泽则是前一站、全年运营的车站。",
  },
  {
    leg: "东京出发的滑雪巴士一日游",
    time: "从东京出发至返回东京共 11 至 12.5 小时",
    trains: "按商品页面上标注的出发日期",
    cost: "按人数收费，因日期而异；请在商品页面选择计划日期查看",
    note: "这是另一种旅游产品，而非更便宜的同类产品：巴士一日游前往同在汤泽地区的岩原滑雪场，而不是 GALA 汤泽；一次预订即可安排往返交通，滑雪装备租赁和滑雪课程为可选项目。所需时间比新干线长，但无需自行安排任何事项。",
  },
  {
    leg: "包车前往 GALA 汤泽或苗场",
    time: "10 小时包车，从住宿地点接送",
    trains: "服务商可提供服务的日期",
    cost: "按车辆收费，因日期而异；请在商品页面查看",
    note: "适合带着滑雪装备的家庭或团体，或需要比首班车更早出发的情况。预订时选择雪场，同一包车产品可选择前往 GALA 汤泽或苗场。",
  },
];

const costRows = [
  {
    item: "不自带装备的成人双板或单板一日（缆车票＋装备套装＋滑雪服，线上价格）",
    price: "¥19,500＋车费",
    note: `大多数一日游游客需要准备的预算：缆车票 ${LIFT_WEB}＋双板或单板滑雪装备套装 ${SKI_SET}＋滑雪服上下装 ${WEAR}。在售票处购买缆车票为 ${LIFT_WINDOW}，合计 ¥20,000。`,
  },
  {
    item: "上越新干线，东京 ⇄ GALA 汤泽",
    price: "使用周游券，或以付款页面显示的票价为准",
    note: `JR东京广域周游券 3 日 ${PASS_ADULT}；JR 东日本公布的费用示例为 GALA 汤泽往返加日光往返、全程指定席，${JR_EXAMPLE}。JR 东日本已于 2026 年 3 月 14 日调整票价，单程票价请选好日期后在付款页面确认。`,
  },
  {
    item: "缆车＋吊椅 1 日票（成人）",
    price: `线上 ${LIFT_WEB}／售票处 ${LIFT_WINDOW}`,
    note: "小学生（儿童）线上 ¥3,500／售票处 ¥4,000。每位付费成人可免费携带 2 名学龄前儿童。",
  },
  {
    item: "双板 3 件套或单板 2 件套，1 日",
    price: SKI_SET,
    note: "小学生及以下 ¥4,000。2 日租金正好是 1 日的 2 倍。",
  },
  {
    item: "滑雪服（上衣和裤子），1 日",
    price: WEAR,
    note: "小学生及以下 ¥3,000。",
  },
  {
    item: "雪镜＋头盔，1 日",
    price: "¥1,800＋¥2,300",
    note: "不含在装备套装内，需单独租赁。",
  },
  {
    item: "不滑雪方案：缆车＋Barouche 吊椅票＋雪橇",
    price: `线上 ¥5,500＋${SLED}`,
    note: "缆车＋Barouche 吊椅票（售票处 ¥6,500）可进入缆车山顶站的雪上乐园并乘坐 Barouche 吊椅式索道；可在山顶站租赁雪橇。",
  },
  {
    item: "SPA GALA 之汤（温泉及游泳池），成人",
    price: "¥1,500",
    note: "位于车站建筑内，适合在等候返程列车时前往。票价信息来自 JR 东日本的 GALA 汤泽旅游介绍页面。",
  },
];

const seasonRows = [
  { what: "雪道开放期间（双板和单板）", detail: `${SLOPES_OPEN} → ${SLOPES_CLOSE}` },
  { what: "观光项目开放期间", detail: `${SIGHTSEEING_OPEN} → 2026 年 12 月 18 日：只运行缆车和观光吊椅，无论积雪多少都不能滑雪` },
  { what: "直达 GALA 汤泽的上越新干线", detail: "从 GALA 汤泽开始开放的 2026 年 12 月 12 日起，常规运行的谷川号延长运行到 GALA 汤泽，并加开临时列车（JR 东日本，2026 年 10 月 22 日）。该公告未写结束日期；该车站仅在冬季和春季运营" },
  { what: "夜间滑雪结束后的返程列车", detail: "谷川 198 号，GALA 汤泽 20:19 → 东京 21:40，2027 年 1 月 16 日、30 日和 2 月 13 日、27 日" },
  { what: "JR SKISKI 新干线＋缆车票套餐", detail: "JR 东日本旅游网站仍显示“Coming Soon”（即将推出），预计 2026 年 11 月中旬开放预订" },
  { what: "每日开放时间", detail: "2026-27 雪季每日开放时间尚待官方公布；开放日期和时间可能随积雪及天气调整" },
];

const liftRows = [
  { ticket: "缆车＋吊椅 1 日票，成人", window: LIFT_WINDOW, web: LIFT_WEB, note: "标准 1 日票。可乘坐本雪季开放的两个区域内所有缆车和吊椅。" },
  { ticket: "缆车＋吊椅 1 日票，小学生（儿童）", window: "¥4,000", web: "¥3,500", note: "现场价为成人票价的一半，线上再便宜 ¥500。" },
  { ticket: "缆车＋Barouche 吊椅票，成人", window: "¥6,500", web: "¥5,500", note: "较便宜的票，仅可乘坐缆车和 Barouche 4 人座吊椅。适合首次滑雪、玩雪，或只安排一个下午的游客；不适合想滑遍全山雪道的游客。" },
  { ticket: "缆车＋Barouche 吊椅票，小学生（儿童）", window: "¥3,400", web: "¥2,900", note: "这是儿童在这座雪场乘索道上雪地最便宜的方式。" },
  { ticket: "4 小时票，成人", window: "¥7,500", web: "¥7,000", note: "在售票处只比 1 日票便宜 ¥500，因此适合较晚到达的游客，而不是用来省钱。" },
  { ticket: "4 小时票，小学生（儿童）", window: "¥3,500", web: "¥3,000", note: "同样，年龄较小的儿童一天大多也只滑 4 小时左右。" },
  { ticket: "学龄前儿童", window: "免费", web: "免费", note: "每位付费成人可免费携带 2 名学龄前儿童；第 3 名起按小学生票价收费。这是雪场自己的规定。" },
];

const rentalRows = [
  { item: "双板滑雪装备 3 件套（滑雪板、滑雪鞋、滑雪杖）", adult: `1 日 ${SKI_SET}`, child: "1 日 ¥4,000（小学生及以下）", note: "2 日租金成人 ¥13,000、儿童 ¥8,000，正好是 1 日的 2 倍，因此多日租赁没有额外优惠。" },
  { item: "单板滑雪装备 2 件套（单板、单板滑雪鞋）", adult: `1 日 ${SKI_SET}`, child: "1 日 ¥4,000（小学生及以下）", note: "无论年龄还是租赁天数，价格均与双板装备套装相同。" },
  { item: "滑雪服（上衣和裤子）", adult: `1 日 ${WEAR}`, child: "1 日 ¥3,000（小学生及以下）", note: "从东京来一日游的游客大多需要，却常常忘记计入预算：乘飞机时穿的普通外套不适合滑雪。" },
  { item: "雪镜和头盔", adult: "1 日雪镜 ¥1,800、头盔 ¥2,300", child: "价格相同", note: "2 日租金分别为 ¥3,600 和 ¥4,600。不含在装备套装内，需单独租赁，因此租齐全部装备的一天费用会高于上面两项。" },
  { item: "PICK UP BOX", adult: "每人＋¥1,000", child: "每人＋¥1,000", note: "滑雪场提供的免排队装备领取服务，7:30–12:00。线上预约自雪场开业前 1 个月起开放，预约截止时间为使用日前 2 天中午；仅接受信用卡预付，名额有限，中午截止后取消将收取 100% 取消手续费。该服务提供期间为 12 月 19 日至 3 月 31 日。" },
];

const mountainRows = [
  { what: "开放雪道", detail: "全部 16 条雪道中开放 12 条：中央区 5 条、北区 6 条，以及 Falcon 滑降雪道" },
  { what: "南区（South Area）", detail: "4 条雪道在 2026-27 雪季暂停开放；滑雪场官方雪道图页面写着「南エリアの営業を休止いたします」（南区暂停开放）" },
  { what: "难度分布", detail: "初级 35%、中级 45%、高级 20%（滑雪场公布的全部雪道统计）" },
  { what: "缆车和吊椅", detail: "共 11 条索道，包括从车站建筑出发的 8 人座 Diligence 缆车" },
  { what: "最长雪道滑行距离", detail: "2,500 米，Falcon 滑降雪道" },
  { what: "海拔", detail: "山顶 1,181 米、山脚 358 米；面积 70 公顷；最大坡度 33°" },
  { what: "开放时间", detail: "2026-27 雪季每日开放时间尚待官方公布。装备租赁处自 12 月 19 日起每日 7:30 开门" },
];

const shapeRows = [
  {
    shape: "自己乘上越新干线",
    covers: "乘车前往 GALA 汤泽，缆车票和装备租赁在雪场或线上预订",
    verdict: "最适合大多数人，滑雪时间也最长",
    note: `最快 ${FASTEST}，车站就在建筑内。相应地，需要自行安排四项：新干线座位、缆车票、装备租赁和滑雪服租赁；而且 GALA 汤泽每一种缆车票在售票处都比线上贵至少 ¥500。`,
  },
  {
    shape: "上越新干线＋JR 东日本周游券",
    covers: "铁路交通可使用东京广域周游券或 JR EAST PASS",
    verdict: "只有安排两三次一日游、其中一次去 GALA 汤泽时，才值得比较周游券费用；只去 GALA 汤泽则不划算",
    note: `周游券连续 3 日 ${PASS_ADULT}，JR 东日本公布的费用示例（GALA 汤泽往返＋日光往返，指定席）为 ${JR_EXAMPLE}。只安排一次 GALA 汤泽一日游，车费达不到这个金额。`,
  },
  {
    shape: "东京出发巴士一日游",
    covers: "一次预订即可安排前往岩原滑雪场的往返交通，玩雪、装备租赁或滑雪课程为可选项目；不含餐",
    verdict: "适合首次滑雪，或想一次订好、不想分别安排上述四项的游客",
    note: "单程所需时间比上越新干线长，而且去的不是 GALA 汤泽，而是同一地区的另一座滑雪场。该产品的优势在于出发当天早上无需再安排任何事项。",
  },
  {
    shape: "包车",
    covers: "从住宿地点直达 GALA 汤泽或苗场，预订时选择雪场",
    verdict: "适合团体、带小孩的家庭，或需要比首班车更早出发的情况",
    note: "按车辆收费而不是按人数，4 人分摊就不算贵；这也是唯一可以把装备放进后备箱、无需扛着装备穿过东京站的方式。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "从东京怎么去 GALA 汤泽滑雪场？",
    a: `从东京站乘上越新干线（谷川号）直达 GALA 汤泽站，最快 ${FASTEST}，无需换乘；车站位于滑雪中心内，缆车也从同一栋建筑出发。直达列车仅在特定季节运行：从雪场开始开放的 2026 年 12 月 12 日起，JR 东日本把常规运行的谷川号延长运行到 GALA 汤泽，并加开临时列车。如果所乘列车的终点为越后汤泽站，或在 GALA 汤泽站运营季节以外前往，可乘雪场免费接驳车，约 10 分钟。其他方式是东京出发的巴士一日游（前往同在汤泽地区的岩原滑雪场）或包车。${OWN}确认。`,
  },
  {
    q: "从东京乘上越新干线到 GALA 汤泽要多久？",
    a: `最快 ${FASTEST}，滑雪场与 JR 东日本公布的所需时间一致。按 JR 东日本 2026 年 10 月 22 日的冬季列车公告，谷川 71 号为东京 6:24 → GALA 汤泽 7:35，回程谷川 86 号为 GALA 汤泽 17:04 → 东京 18:20；JR 东日本的旅游目的地介绍页面也注明乘谷川号约需 1 小时 20 分钟，所以建议按单程 71 至 80 分钟安排行程。在开放夜间滑雪的 4 个晚上，谷川 198 号 20:19 从 GALA 汤泽出发，21:40 抵达东京。${OWN}确认。`,
  },
  {
    q: "使用 JR Pass 可以乘车前往 GALA 汤泽吗？",
    a: `可以。全国版 JAPAN RAIL PASS 可乘坐 NOZOMI 和 MIZUHO 以外的所有 JR 集团新干线，因此前往 GALA 汤泽的上越新干线也在适用范围内（乘坐 Gran Class 车厢需另付费用）；7 日普通车厢周游券的线上售价为 ${JRP_7DAY}。JR东京广域周游券（${PASS_ADULT}，连续 3 日）和 JR EAST PASS（${EAST_PASS_5DAY}，5 日）也可以使用，JR 东日本也将 GALA 汤泽列为广域周游券的适用目的地之一。只安排一次 GALA 汤泽一日游，广域周游券并不划算：JR 东日本公布的费用示例为 GALA 汤泽往返加日光往返，${JR_EXAMPLE}。${OWN}确认。`,
  },
  {
    q: "GALA 汤泽 2026-27 雪季什么时候开始？",
    a: `雪道于 ${SLOPES_OPEN}开放，预计开放至 ${SLOPES_CLOSE}。${SIGHTSEEING_OPEN}至 2026 年 12 月 18 日只运行缆车和观光吊椅，无论积雪多少都不能滑雪。直达的上越新干线列车也将于 12 月 12 日开始运行。2026-27 雪季每日开放时间尚待官方公布，GALA 汤泽也说明开放日期和时间可能随积雪及天气调整。${OWN}确认。`,
  },
  {
    q: "GALA 汤泽适合滑雪初学者和不滑雪的游客吗？",
    a: `两者都适合。35% 的雪道为初级雪道，装备租赁处就在车站建筑内，也可预订英语授课的滑雪课程。不滑雪的游客可以购买缆车＋Barouche 吊椅票（线上 ¥5,500、售票处 ¥6,500），前往缆车山顶站的雪上乐园、租赁雪橇（${SLED}），并乘坐 Barouche 吊椅式索道到可眺望谷川连峰的观景台。2026-27 雪季要注意的是南区暂停开放，16 条雪道中有 12 条开放。${OWN}确认。`,
  },
];

const sameDayCards: KlookSameDayCard[] = [
  {
    kind: "列车",
    label: "东京 → GALA 汤泽新干线车票",
    ctaLabel: "查看东京 → GALA 汤泽列车 →",
    url: TRAIN_URL,
    why: "缆车票不包含往返雪场的交通：从东京站或上野站出发的谷川号直达列车座位，选择乘车日期预订，凭二维码乘车。",
  },
  {
    kind: "铁路周游券",
    label: "JR东京广域周游券（连续 3 日）",
    ctaLabel: "查看东京广域周游券 →",
    url: WIDE_URL,
    why: "JR 东日本说明这张周游券可乘坐前往 GALA 汤泽的上越新干线；如果同一个 3 天有效期内还安排了其他一日游，值得比较一下交通费用。",
  },
  {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "GALA 汤泽说明，开放日期和时间会随积雪及天气调整，Klook 商品页也要求使用可联网的手机出示缆车票电子凭证。",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "GALA 汤泽说明，开放日期和时间会随积雪及天气调整，2026-27 雪季每日开放时间也尚未公布。在季节性运营车站，只能通过手机获取暂停开放或新干线晚点的通知。",
  },
  {
    label: "成田特快（N'EX）往返车票",
    ctaLabel: "查看 N'EX 往返票 →",
    url: klookFor(naritaExpressRoundTripUrl, LOCALE),
    why: "可直达东京站，再从东京站乘上越新干线前往 GALA 汤泽。如果东京广域周游券从抵达日本当天起使用，就无需另买这张车票：JR 东日本说明这张周游券可乘坐 N'EX 指定席。",
  },
  {
    label: "羽田机场 – 东京利木津巴士",
    ctaLabel: "查看利木津巴士 →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "适用于羽田机场线路，凭二维码乘车。如果抵达时随身携带滑雪装备包，在乘车北上前还需先将行李送至东京的酒店，此时就可以使用这项服务。",
  },
  {
    label: "JR东京广域周游券（连续 3 日）",
    ctaLabel: "查看东京广域周游券 →",
    url: WIDE_URL,
    why: "尤其值得比较费用的一项预订。JR 东日本公布的费用示例为 GALA 汤泽往返加日光往返（指定席）约 ¥21,500，周游券连续 3 日 ¥16,000，因此 GALA 汤泽再加上另一个一日游，周游券大致就开始划算。",
  },
  {
    label: "东京 → GALA 汤泽新干线车票",
    ctaLabel: "查看东京 → GALA 汤泽列车 →",
    url: TRAIN_URL,
    why: "不使用周游券的 GALA 汤泽一日游：从东京站或上野站出发的谷川号直达列车座位，选择乘车日期预订，凭二维码乘车。JR 东日本加开的早班谷川 71 号（东京 6:24）只在 1 至 2 月的部分周末和节假日运行，按这班列车安排行程前，请先确认运行日期。",
  },
  {
    label: "GALA 汤泽滑雪场缆车票",
    ctaLabel: "查看 GALA 汤泽缆车票 →",
    url: LIFT_URL,
    why: "GALA 汤泽缆车＋吊椅式索道 1 日票，成人现场购票 ¥8,000，线上购票 ¥7,500，提前购买可省 ¥500。第三方预订平台支持境外发行的信用卡付款，并提供中文界面。",
  },
  {
    label: "GALA 汤泽滑雪场 1 日滑雪课程",
    ctaLabel: "查看 GALA 汤泽滑雪课程 →",
    url: LESSON_URL,
    why: "这是初学者最容易漏订的项目。GALA 汤泽的缆车票、装备租赁和滑雪课程均需分别预订，商品页也写明上课仍需另购缆车票。",
  },
];

const tourPicks = [
  withKlookLocale(yuzawaIwapparaSkiDayTourTokyo, LOCALE, {
    title: "东京出发汤泽岩原滑雪场玩雪＋滑雪一日游",
    desc: "从东京乘往返接送巴士前往越后汤泽地区的岩原滑雪场，玩雪、滑雪、装备租赁和滑雪课程均可在同一个订单中选择",
  }),
  withKlookLocale(galaNaebaSkiDayTripTokyo, LOCALE, {
    title: "东京出发 GALA 汤泽／苗场滑雪场一日游",
    desc: "冬季从东京出发、包车前往汤泽地区滑雪场的一日游，预订时选择雪场",
  }),
  withKlookLocale(hakubaSkiResortDayTourTokyo, LOCALE, {
    title: "东京出发长野白马滑雪场一日游",
    desc: "从东京前往白马山谷的一日游，可从 4 座滑雪场中选择，预订费用包含缆车票及装备租赁",
  }),
  withKlookLocale(galaYuzawaSkiLesson, LOCALE, {
    title: "GALA 汤泽滑雪场 1 日滑雪课程",
    desc: "在 GALA 汤泽参加由教练以中文或英语授课的 3 至 6 小时双板或单板课程；课程与缆车票需分别预订，商品页也写明仍需另购缆车票",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "GALA 汤泽滑雪一日游" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h || `blank-${i}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Sources({ children }: { children: ReactNode }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      最后确认：{OWN_ISO}。资料来源：{children}
    </p>
  );
}

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {label}
  </a>
);

export default function ZhCnGalaYuzawaSkiDayTripPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG["zh-cn"] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            日本唯一一座内部设有新干线车站的滑雪场。雪道于 {SLOPES_OPEN}开放，而南区本雪季全程暂停开放。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "JR 东日本上越新干线直达所需时间", "JR Pass 使用规则", "GALA 汤泽官方 2026-27 价格"].map((t) => (
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
          heading="目前有哪些东京出发的 GALA 汤泽一日游产品可以预订？"
          checkedIso={OWN_ISO}
          tours={[
            {
              title: "GALA 汤泽滑雪场缆车票",
              url: LIFT_URL,
              price: null,
              duration: "全天滑雪；上越新干线车票需另行预订",
              departs: "雪场内的 GALA 汤泽站",
            },
            {
              title: "东京出发 GALA 汤泽／苗场滑雪场一日游",
              url: CHARTER_URL,
              price: null,
              duration: "包车 10 小时",
              departs: "东京 23 区内的酒店",
            },
            {
              title: "GALA 汤泽滑雪场 1 日滑雪课程",
              url: LESSON_URL,
              price: null,
              duration: "3 至 6 小时",
              departs: "在 GALA 汤泽集合",
            },
          ]}
          deadline={
            <>
              如果计划在 12 月 19 日雪道开放当天至新年期间前往，请在 11 月 30 日前预订；12 月 12 日至 18 日只运行缆车，不能滑雪。如果计划在 1 至 2
              月前往，请至少提前 3 周预订。截至 11 月 15 日，JR 东日本的 JR SKISKI 新干线＋缆车票套餐仍显示“Coming Soon”（即将推出），预计 11 月中旬开放预订；GALA
              汤泽的 PICK UP BOX 装备租赁服务于雪场开业前 1 个月开放预约。
            </>
          }
          primaryCta="在 Klook 查看 GALA 汤泽缆车票的可订日期与价格 →"
          primaryNote={
            <>
              在商品页选择滑雪日期，即可查看价格及是否已开放预订：GALA 汤泽的雪道于 {SLOPES_OPEN}开放，2026-27 雪季的每日开放时间尚未公布。
            </>
          }
        />

        <KlookSameDayCards heading="GALA 汤泽一日游可一并预订的项目" cards={sameDayCards} />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>从东京站</p>
                <p className={styles.verdictStatValue}>{FASTEST}直达，无需换乘</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>雪道开放</p>
                <p className={styles.verdictStatValue}>2026/12/19 – 2027/5/5</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1 日缆车票</p>
                <p className={styles.verdictStatValue}>售票处 {LIFT_WINDOW}／线上 {LIFT_WEB}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass／广域周游券／JR EAST PASS</p>
                <p className={styles.verdictStatValue}>均可用于乘车前往 GALA 汤泽</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              从东京到 GALA 汤泽，请<strong>在东京站乘上越新干线直达 GALA 汤泽站，最快 {FASTEST}</strong>（JR 东日本谷川号 71 次列车 6:24 从东京站出发，7:35
              抵达 GALA 汤泽站），车站就在滑雪中心内；但直达列车只在冬季运行，从 <strong>{SIGHTSEEING_OPEN}</strong>开始。GALA 汤泽的<strong>雪道于 {SLOPES_OPEN}开放</strong>，
              开放至 {SLOPES_CLOSE}；12 月 12 日至 18 日仅开放缆车观光。<strong>JAPAN RAIL PASS</strong>（7 日线上 {JRP_7DAY}）、
              <strong>JR 东京广域周游券</strong>（{PASS_ADULT}，3 日）和 <strong>JR EAST PASS</strong>（{EAST_PASS_5DAY}，5 日）均可用于乘坐这一区间的列车；
              如果不自带装备，按 GALA 汤泽线上价格计算，一日游在雪场另需 <strong>¥19,500</strong>（缆车票 {LIFT_WEB}＋双板装备套装 {SKI_SET}＋滑雪服 {WEAR}）。
              以上信息于 {OWN}通过 GALA 汤泽及 JR 东日本官网核实；2026-27 雪季每日开放时间尚待官方公布。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                GALA 汤泽缆车票 →
              </KlookLink>
              <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                东京出发滑雪一日游 →
              </KlookLink>
              <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                东京 → GALA 汤泽列车 →
              </KlookLink>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看东京广域周游券价格 →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                GALA 汤泽滑雪课程 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="同一行程中可一并预订的项目"
          heading="GALA 汤泽一日游需要预订哪些项目"
          intro="先准备上网服务和机场交通，再预订周游券，最后预订 GALA 汤泽需要分别购买的项目：首次安排滑雪一日游时，最容易漏订的是缆车票和滑雪课程。Klook 价格因日期而异，请按计划日期打开商品页查看。"
          items={tripPrepItems}
        />

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="yuzawa" />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>交通方式</span>
          <h2 className={styles.sectionTitle}>从东京怎么去 GALA 汤泽滑雪场？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>从东京站乘上越新干线谷川号直达 GALA 汤泽站</strong>，最快 {FASTEST}，不用换乘，出站后即可进入滑雪中心。直达列车仅在特定季节运行，
            {SIGHTSEEING_OPEN}开始运行；另一种方式是乘上越新干线到越后汤泽站，再换乘 GALA 汤泽的免费接驳车，车程约 10 分钟；耗时较长的选择是东京出发的巴士一日游或包车。
          </p>
          <Table
            head={["路线", "所需时间", "交通方式／运营期间", "费用", "注意事项"]}
            rows={accessRows.map((r) => [r.leg, r.time, r.trains, r.cost, r.note])}
          />
          <Sources>
            {ext("https://gala.co.jp/winter/access/", "gala.co.jp/winter/access/")}、
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR 东日本冬季列车公告（2026 年 10 月 22 日）")}、
            {ext("https://www.jreast.co.jp/en/multi/destinations/gala.html", "JR 东日本 GALA 汤泽介绍页")}。本页不列单程票价：JR 东日本已于 2026 年 3 月
            14 日调整票价，计划乘车日期的票价会显示在付款页面。巴士一日游和包车的所需时间来自 Klook 商品页。
          </Sources>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>需要按出行日期确认的一点</strong>，即计划乘坐的列车当天是否开往 GALA 汤泽站：加开的早班谷川 71 号只在 1 至 2 月的部分周末和节假日运行。
            请按日期预订座位；如果计划安排两次一日游，其中一次前往 GALA 汤泽，请在{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              JR东京广域周游券攻略（英文）
            </Link>
            中计算周游券是否划算。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              东京 → GALA 汤泽上越新干线 →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              东京出发滑雪巴士一日游 →
            </KlookLink>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 汤泽缆车票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>所需时间</span>
          <h2 className={styles.sectionTitle}>从东京乘上越新干线到 GALA 汤泽要多久？</h2>
          <p className={styles.bodyText}>
            <strong>最快 {FASTEST}，实际约 71 至 80 分钟。</strong>按 JR 东日本 2026 年 10 月 22 日的公告，谷川 71 号为东京 6:24 → GALA 汤泽
            7:35，回程谷川 86 号为 GALA 汤泽 17:04 → 东京 18:20；JR 东日本的 GALA 汤泽介绍页则写乘谷川号约 1 小时 20 分钟。如果计划夜间滑雪，2027 年
            1 月 16 日、30 日和 2 月 13 日、27 日，谷川 198 号 20:19 从 GALA 汤泽出发，21:40 抵达东京。{OWN}确认。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>一日费用</span>
          <h2 className={styles.sectionTitle}>GALA 汤泽一日游要花多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>不自带装备的成人在雪场的费用约为 ¥19,500，车费另计</strong>，按 GALA 汤泽官方 2026-27 线上价格计算。如果不滑雪，只在雪上乐园玩雪橇，一天的费用为 ¥8,000。
          </p>
          <Table head={["项目", "价格", "费用说明"]} rows={costRows.map((r) => [r.item, r.price, r.note])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "GALA 汤泽缆车票价格")}、
            {ext("https://gala.co.jp/winter/rental/", "租赁")}、
            {ext("https://gala.co.jp/winter/activities/", "活动")}、
            {ext("https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html", "JR 东日本周游券价格")}、
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "JR 东日本旅游网站（SPA GALA 之汤）")}。
          </Sources>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 汤泽缆车票 →
            </KlookLink>
            <KlookLink href={EAST_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR EAST PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>雪季</span>
          <h2 className={styles.sectionTitle}>GALA 汤泽 2026-27 雪季什么时候开始？</h2>
          <p className={styles.bodyText}>
            <strong>雪道于 {SLOPES_OPEN}开放，预计开放至 {SLOPES_CLOSE}。</strong>此前一周，即 {SIGHTSEEING_OPEN}至 2026 年 12 月 18 日，仅开放观光项目：
            仅运行缆车和观光吊椅，无论积雪多少，均不开放双板或单板滑雪；直达的上越新干线列车也将于 12 月 12 日开始运行。GALA 汤泽另行说明，开放日期及项目可能随积雪和天气调整。
            如果预订 12 月 12 日至 18 日的行程，即使计划滑雪，实际上也只能乘缆车观光。那几天想看雪山，可以改订<Link href="/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>东京出发富士山一日游</Link>。
          </p>
          <Table head={["2026-27", "日期"]} rows={seasonRows.map((r) => [r.what, r.detail])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "gala.co.jp/winter/hours-pricing/")}、
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR 东日本（2026 年 10 月 22 日）")}、
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "JR 东日本旅游网站")}。
          </Sources>
          <div style={{ marginTop: "1.25rem" }}>
            <Table head={["雪场", `GALA 汤泽 2026-27（${OWN}确认）`]} rows={mountainRows.map((r) => [r.what, r.detail])} />
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            雪道、难度、缆车、海拔和南区暂停开放，均来自 GALA 汤泽官方雪道地图页面（
            {ext("https://gala.co.jp/winter/gelande/", "gala.co.jp/winter/gelande/")}），{OWN}确认。<strong>南区仅在 2026-27 雪季暂停开放</strong>，
            此前发布的攻略不会提到这一点。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>缆车票</span>
          <h2 className={styles.sectionTitle}>GALA 汤泽缆车票多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>成人 1 日票：现场 {LIFT_WINDOW}，线上 {LIFT_WEB}</strong>。GALA 汤泽各类缆车票的现场价与线上价至少相差 ¥500，所以提前在线购票是这次一日游最容易省钱的方式。
            真正能省钱的票种有两种，4 小时票并不在其中。
          </p>
          <Table head={["票种", "售票处", "线上价格", "需要知道的事"]} rows={liftRows.map((r) => [r.ticket, r.window, r.web, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            所有金额均为 GALA 汤泽官方 2026-27 价目表，{OWN}确认。“小学生（儿童）”对应雪场价目表中的“小学生”票价。请在付款时再次确认。GALA 汤泽自 2026 年 10
            月 5 日起限量发售 1,000 张的 ¥4,300 超早鸟票，目前已显示售罄，因此目前实际可购买的是上表的线上价格。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 汤泽缆车票 →
            </KlookLink>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 汤泽双板和单板课程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>装备租赁</span>
          <h2 className={styles.sectionTitle}>在 GALA 汤泽可以租赁滑雪装备吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可以，滑雪装备租赁处与车站位于同一栋建筑内，因此即使不自带装备，也可以从东京当天往返。计算预算前需要先了解，GALA 汤泽的<strong>滑雪装备和滑雪服分别收费</strong>，
            雪镜和头盔也需单独租赁。
          </p>
          <Table
            head={["项目", "初中生及以上", "小学生及以下", "租赁说明"]}
            rows={rentalRows.map((r) => [r.item, r.adult, r.child, r.note])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>预订前先计算一下总费用。</strong>不自带装备的成人在线购买缆车＋吊椅 1 日票为 {LIFT_WEB}，加上套装 {SKI_SET} 和滑雪服 {WEAR}，还不含雪镜、
            头盔、上越新干线和午餐。因此值得比较本页的 Klook 产品与现场逐项购买的总费用；而 ¥1,000 的 PICK UP BOX 是这里唯一能带来明确便利的加购服务：
            无需在装备租赁处排队。所有价格均为 GALA 汤泽官方价格，{OWN}确认。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>初学者</span>
          <h2 className={styles.sectionTitle}>GALA 汤泽适合滑雪初学者和不滑雪的游客吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            两者都适合。<strong>35% 的雪道为初级雪道</strong>，缆车可从车站建筑直接到达初级雪道上方；不滑雪的游客可购买价格较低的缆车＋Barouche 吊椅票，
            即可在缆车山顶站的雪上乐园和雪橇滑行区游玩。需要注意的是本雪季的情况：南区暂停开放，实际可滑的范围比早期攻略中介绍的要小。
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>不滑雪的人</p>
              <p className={styles.whoForDesc}>
                缆车＋Barouche 吊椅票（线上 ¥5,500、售票处 ¥6,500）包含缆车、山顶站的雪上乐园，以及可乘 Barouche 吊椅式索道前往“爱之钟”观景台，眺望谷川连峰
                （10:00–16:00，约 30 分钟）。可在山顶站租赁雪橇，{SLED}；天气允许时，雪上活动区 8:30–16:00 开放。学龄前儿童乘缆车免费。
                GALA 汤泽官方活动页面，{OWN}确认。如果想在离东京更近的地方体验雪橇，请看{" "}
                <Link href="/guides/attractions/tokyo-snow-day-trip" hrefLang="en" style={linkStyle}>
                  东京近郊玩雪一日游攻略（英文）
                </Link>
                。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>雪场的优势</p>
              <p className={styles.whoForDesc}>
                按雪场公布的数据，雪道为初级 35%、中级 45%、高级 20%，共有 11 条缆车及吊椅索道，从车站走到雪道只要几分钟。对于首次体验滑雪的游客，这里是从东京出发可当天往返的滑雪场中的最佳选择，
                因为前往雪场的交通安排几乎不会出问题。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>本雪季的不足之处</p>
              <p className={styles.whoForDesc}>
                南区 2026-27 雪季暂停开放，雪场的原文是「南エリアの営業を休止いたします」。开放的雪道包括中央区 5 条、北区 6 条以及 Falcon 滑降雪道，共 12 条。
                对初学者一天的滑雪已足够，但再次前来时就略显不足，这时也可以考虑白马或苗场的一日游。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>初学者容易漏订的项目</p>
              <p className={styles.whoForDesc}>
                滑雪课程。GALA 汤泽的价目表列出了缆车票和装备租赁套装的价格，课程要另外预订；Klook 商品页也明确写着上课仍需另购缆车票。如果当天只有缆车票和装备，却没有教练指导，
                即使有 35% 的初级雪道，也没有人教你如何滑雪。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>首次滑雪最省钱的方案</p>
              <p className={styles.whoForDesc}>
                购买缆车＋Barouche 吊椅票（售票处 ¥6,500、线上 ¥5,500），而不是 ¥8,000 的 1 日票。首次滑雪的游客不会离开缆车和 Barouche 吊椅覆盖的区域，
                所以购买全山缆车票，就等于多花 ¥2,500 在用不到的吊椅上。雪场官方价格，{OWN}确认。
              </p>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 汤泽 1 日滑雪课程 →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              东京出发初学者巴士一日游 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>周游券</span>
          <h2 className={styles.sectionTitle}>使用 JR Pass 可以乘车前往 GALA 汤泽吗？</h2>
          <p className={styles.bodyText}>
            <strong>可以，游客最常使用的三种周游券都能乘上越新干线到 GALA 汤泽。</strong>全国版 <strong>JAPAN RAIL PASS</strong> 可乘坐 NOZOMI 和
            MIZUHO 以外的所有 JR 集团新干线，因此前往 GALA 汤泽的上越新干线也在适用范围内（乘坐 Gran Class 车厢需另付费用）；7 日普通车厢周游券的线上售价为 <strong>{JRP_7DAY}</strong>，在海外代理商购买为
            ¥53,000。<strong>JR EAST PASS</strong> 5 日 <strong>{EAST_PASS_5DAY}</strong>、10 日 ¥50,000，可乘坐 JR 东日本所有线路。{OWN}在
            japanrailpass.net 和 JR 东日本确认。
          </p>
          <p className={styles.bodyText}>
            就这一行程而言，三者中价格最低的是 <strong>JR东京广域周游券</strong>：GALA 汤泽在适用范围内，JR 东日本也将 GALA 汤泽列为该周游券的适用目的地之一，可乘坐上越新干线普通车厢指定席或自由席前往。
            价格为成人 <strong>{PASS_ADULT}</strong>、6 至 11 岁儿童 <strong>¥8,000</strong>，<strong>有效期为连续 3 日</strong>；这是自{" "}
            <strong>2026 年 3 月 14 日</strong>起的调价后价格，此前分别为 ¥15,000 和 ¥7,500。{OWN}确认。
          </p>
          <p className={styles.bodyText}>
            需要比较的是这张周游券是否<em>划算</em>，JR 东日本公布了计算示例：<strong>GALA 汤泽往返加上日光特急往返</strong>，如果全程乘坐指定席并分别购票，总费用约为
            <strong>{JR_EXAMPLE}</strong>，周游券则是 {PASS_ADULT}。请注意，这个示例包含<strong>两次</strong>一日游。只安排一次 GALA 汤泽一日游，车费达不到周游券 {PASS_ADULT}
            的售价，因此原则是：如果从东京出发安排两三次一日游、其中一次去 GALA 汤泽，就买周游券；只去这一处，就按区间单独购票。季节性限制如下：GALA 汤泽站只在冬季和春季运营，
            在 GALA 汤泽站运营季节以外，同一张周游券只能乘车到越后汤泽站。{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              JR东京广域周游券攻略（英文）
            </Link>
            比较了关东各个一日游在什么条件下买周游券更划算，{" "}
            <Link href="/guides/transport/jr-pass-guide" hrefLang="en" style={linkStyle}>
              JR Pass 攻略（英文）
            </Link>
            则用同样方式分析全国版周游券是否划算。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看东京广域周游券价格 →
            </KlookLink>
            <KlookLink href={EAST_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR EAST PASS（5 日或 10 日）→
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>跟团游还是自行乘坐新干线</span>
          <h2 className={styles.sectionTitle}>应该报名跟团一日游，还是自行乘坐上越新干线？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            想尽量延长滑雪时间，就乘上越新干线；想尽量减少自行安排的麻烦，就报名巴士一日游。要先弄清楚的是，两种方式前往的并非同一座滑雪场：乘新干线前往 GALA 汤泽，东京出发的巴士一日游则去岩原等邻近的汤泽地区雪场。
          </p>
          <Table head={["一日游方式", "包含内容", "结论", "需要知道的事"]} rows={shapeRows.map((r) => [r.shape, r.covers, r.verdict, r.note])} />
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>目前有一项预订信息需要特别确认。</strong>截至 {OWN}，JR 东日本旅游网站上 2026-27 雪季的 <em>JR SKISKI</em> GALA 汤泽新干线＋缆车票套餐仍显示
            “Coming Soon”（即将推出），预计 2026 年 11 月中旬开放预订。也就是说，本雪季的官方套餐目前尚未开放预订，而下方第三方预订平台的产品已经开售，支持境外发行的信用卡付款，并提供中文界面。
            如果想买该套餐，请等到 11 月中旬；如果想现在就确定日期，可分别预订。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              东京出发汤泽巴士一日游 →
            </KlookLink>
            <KlookLink href={CHARTER_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 汤泽／苗场包车一日游 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>冬季其他行程</span>
          <h2 className={styles.sectionTitle}>GALA 汤泽一日游适合与哪些行程搭配？</h2>
          <p className={styles.bodyText}>
            GALA 汤泽一日游适合在东京住宿期间安排，所以请配合其他行程规划。{" "}
            <Link href="/zh-cn/guides/attractions/japan-winter-itinerary" style={linkStyle}>
              日本冬季 12 天行程
            </Link>
            介绍了如何将东京停留期间的行程与日本北部和西部的雪国旅行结合。另一个值得一并比较交通费用的冬季一日游是{" "}
            <Link href="/zh-cn/guides/attractions/jigokudani-snow-monkey-tour" style={linkStyle}>
              地狱谷野猿公苑雪猴行程
            </Link>
            ：经上越新干线前往的 GALA 汤泽和经北陆新干线前往的长野都在 JR EAST PASS 范围内，如果两个都去，周游券的费用比较结果就不同。滑雪结束后仍有时间返回东京市区，欣赏{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en" style={linkStyle}>
              东京冬季灯光秀（英文）
            </Link>
            ，只需要一个晚上。
          </p>
          <p className={styles.bodyText}>
            如果计划 1 月前往日本，请先确定{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={linkStyle}>
              高山和白川乡点灯行程（英文）
            </Link>
            ，再将 GALA 汤泽一日游排进行程，因为点灯只有固定的 4 个晚上，GALA 汤泽则整季开放。如果首次滑雪后想安排一次完整的一周滑雪之旅，接下来可以选择北海道的{" "}
            <Link href="/zh-cn/guides/attractions/niseko-ski-tours" style={linkStyle}>
              二世古滑雪行程
            </Link>
            ；如果不想坐飞机，也可以在长野住几晚：{" "}
            <Link href="/guides/attractions/hakuba-ski-tours" hrefLang="en" style={linkStyle}>
              白马滑雪行程攻略（英文）
            </Link>
            介绍从东京乘新干线转巴士的方式，{" "}
            <Link href="/guides/attractions/nozawa-onsen-ski" hrefLang="en" style={linkStyle}>
              野泽温泉滑雪攻略（英文）
            </Link>
            介绍如何从饭山站前往温泉村的滑雪场。{" "}
            <Link href="/guides/attractions/japan-ski-trip-itinerary" hrefLang="en" style={linkStyle}>
              日本滑雪旅行行程（英文）
            </Link>
            整理了 7 天或 10 天滑雪旅行中各地的住宿安排。如果计划 2 月前往日本北部，可围绕 2027 年 2 月 4 日至 11 日的{" "}
            <Link href="/zh-cn/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>
              札幌雪祭行程
            </Link>
            安排行程，加上{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en" style={linkStyle}>
              札幌出发小樽一日游（英文）
            </Link>
            ，也可将行程扩展为完整的{" "}
            <Link href="/zh-cn/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>
              北海道 7 天行程
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>滑雪之前</span>
          <h2 className={styles.sectionTitle}>旅游保险是否保障滑雪当天？</h2>
          <p className={styles.bodyText}>
            请务必在购买缆车票前确认保障范围。雪上运动是否属于保障范围，取决于具体保单条款：例如 SafetyWing 将佩戴头盔时在雪道内进行的双板及单板滑雪纳入保障；在雪道外滑雪则不在该条款保障范围内，
            其他保单可能需要附加雪上运动保障条款。滑雪当天是日本旅行期间最可能产生医疗费用的一天，所以这比在线购票省下的 ¥500 更重要。{" "}
            <Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en" style={linkStyle}>
              日本滑雪旅游保险攻略（英文）
            </Link>
            整理了常见免责条款的具体内容，并说明哪些情况属于雪道外滑雪。
          </p>
          <p className={styles.bodyText}>
            去 GALA 汤泽之前还有两件事要准备。一是<strong>手机上网</strong>：雪场在公告中说明开放日期和时间会随积雪及天气调整，而在支线上的季节性运营车站，暂停开放的通知只能通过手机获取。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              查看 Klook eSIM →
            </KlookLink>{" "}
            <Link href="/zh-cn/guides/esim/best-esim-japan" style={linkStyle}>
              日本 eSIM 推荐攻略
            </Link>
            则对比了其他上网方案。二是<strong>付款方式</strong>：滑雪场官方预订流程以日本境内发行的信用卡为前提，这也是游客通过第三方平台预订这家雪场的一大原因。
          </p>
        </section>

        <p className={styles.bodyText}>
          前往 GALA 汤泽的上越新干线从东京站出发，因此{" "}
          <Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en" style={linkStyle}>
            东京住宿区域攻略（英文）
          </Link>
          建议以一日游为主的游客住在东京站一带。
        </p>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="GALA 汤泽滑雪场常见问题" />

        <KlookTourPicks
          heading="从东京可以当天往返的其他滑雪行程"
          intro="GALA 汤泽是从东京出发最快到达的滑雪场，但不是唯一的选择。汤泽地区积雪不足、南区暂停开放后如果觉得 12 条雪道太少，或希望一次完成预订、不想分别安排四项时，可以考虑以下行程。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/jigokudani-snow-monkey-tour", title: "东京出发雪猴观赏行程：地狱谷野猿公苑攻略（2027）" },
            { href: "/guides/transport/jr-east-pass", title: "JR East Pass（2026）：价格、范围与是否划算（英文）" },
            { href: "/guides/transport/tokyo-wide-pass", title: "JR东京广域周游券 2026：价格、范围与是否划算（英文）" },
            { href: "/guides/money/best-travel-insurance-japan", title: "日本旅游保险推荐 2026：不同旅客适合哪些保障（英文）" },
            { href: "/guides/money/japan-ski-travel-insurance", title: "日本滑雪旅游保险：普通保单的免责范围（英文）" },
            { href: "/zh-cn/guides/attractions/niseko-ski-tours", title: "二世古滑雪行程 2026-27" },
            { href: "/zh-cn/guides/attractions/japan-winter-itinerary", title: "日本冬季 12 天行程（2027）" },
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山和白川乡行程（2027）：从哪里出发（英文）" },
            { href: "/zh-cn/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭行程（2027）" },
            { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出发小樽一日游（2027）（英文）" },
            { href: "/zh-cn/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 天行程" },
            { href: "/guides/attractions/tokyo-illumination-tours", title: "东京冬季灯光秀：举办日期、时间与免费观赏地点（英文）" },
            { href: "/guides/attractions/tokyo-snow-day-trip", title: "东京近郊玩雪一日游（2026-27）（英文）" },
            { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "东京出发轻井泽一日游（2026）：新干线、奥特莱斯与雪（英文）" },
            { href: "/zh-cn/guides/esim/best-esim-japan", title: "日本 eSIM 推荐（2026）" },
            { href: "/zh-cn/guides/attractions", title: "更多日本景点门票 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>从东京出发仅需 {FASTEST}，以及要预订的三项</h2>
            <p className={styles.ctaBannerDesc}>
              雪道于 {SLOPES_OPEN}开放。缆车票现场 {LIFT_WINDOW}、线上 {LIFT_WEB}，装备租赁和滑雪课程均另计，所以建议先买周游券，再订课程。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看东京广域周游券价格 →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 GALA 汤泽滑雪课程 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
