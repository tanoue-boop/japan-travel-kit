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
    leg: "首选：东京站 → GALA汤泽站，上越新干线直达（谷川号）",
    time: `最快 ${FASTEST}，例如谷川 71 号东京 6:24 → GALA汤泽 7:35；JR 东日本的目的地介绍页也写乘谷川号约 1 小时 20 分钟`,
    trains: "季节限定：从 2026 年 12 月 12 日起，JR 东日本把普通谷川号延长运行到GALA汤泽，并加开临时列车；途中停靠上野和大宫",
    cost: `可使用 JAPAN RAIL PASS、JR东京广域周游券（${PASS_ADULT}）和 JR EAST PASS；没有周游券时，上越新干线票价以结账页面为准`,
    note: "GALA汤泽站是建在滑雪中心里的季节限定新干线车站，出了检票口就是出售缆车票和租借滑雪装备的建筑。不用坐巴士、不用换乘、不用打车。并非每班谷川号都开到GALA汤泽，请选择终点站显示为GALA汤泽的列车。",
  },
  {
    leg: "东京站 → 越后汤泽站，再换乘免费接驳车",
    time: "乘上越新干线到越后汤泽，再乘雪场免费接驳车约 10 分钟",
    trains: "越后汤泽是全年运营的上越新干线车站，在GALA汤泽的前一站",
    cost: "接驳车免费；铁路区间同样可以使用上述三种周游券",
    note: "想乘的直达列车售罄或当天不运行时的替代方案，也是GALA汤泽营业季以外唯一的方式：按 JR 东日本的说明，GALA汤泽站只在冬季和春季运营，越后汤泽则是前一站、全年运营的车站。",
  },
  {
    leg: "东京出发的滑雪巴士一日游",
    time: "从东京上车到下车共 11 至 12.5 小时",
    trains: "按商品页面上标注的出发日期",
    cost: "按人计价，因日期而异；请在商品页面选择计划日期查看",
    note: "这是另一种商品，而不是更便宜的版本：巴士一日游前往同在汤泽地区的岩原滑雪场，而不是GALA汤泽；往返交通一次预订，滑雪装备租借和滑雪课程为可选项目。比新干线慢，但不需要自己安排任何事情。",
  },
  {
    leg: "包车前往GALA汤泽或苗场",
    time: "包车 10 小时，从住宿地点出发并送回",
    trains: "运营方接受的任何日期",
    cost: "按车计价，因日期而异；请在商品页面查看",
    note: "适合带着滑雪装备的家庭或团体，或需要比首班车更早出发的情况。预订时选择雪场，同一个商品可以去GALA汤泽，也可以去苗场。",
  },
];

const costRows = [
  {
    item: "不带装备的成人双板或单板一日（缆车票＋装备套装＋滑雪服，线上价格）",
    price: "¥19,500＋车费",
    note: `大多数一日游游客需要的金额：缆车票 ${LIFT_WEB}＋双板或单板套装 ${SKI_SET}＋滑雪服上下装 ${WEAR}。在售票处购买缆车票为 ${LIFT_WINDOW}，合计 ¥20,000。`,
  },
  {
    item: "上越新干线，东京 ⇄ GALA汤泽",
    price: "周游券，或以结账页面显示的票价为准",
    note: `JR东京广域周游券 3 日 ${PASS_ADULT}；JR 东日本自己的计算示例是GALA汤泽往返加日光往返、全程指定席，${JR_EXAMPLE}。JR 东日本已于 2026 年 3 月 14 日调整票价，单程票价请选好日期后在结账页面确认。`,
  },
  {
    item: "缆车＋吊椅 1 日票（成人）",
    price: `线上 ${LIFT_WEB}／售票处 ${LIFT_WINDOW}`,
    note: "小学生（儿童）线上 ¥3,500／售票处 ¥4,000。学龄前儿童每位付费成人可免费带 2 名。",
  },
  {
    item: "双板 3 件套或单板 2 件套，1 日",
    price: SKI_SET,
    note: "小学生及以下 ¥4,000。2 日刚好是 2 倍。",
  },
  {
    item: "滑雪服（上衣和裤子），1 日",
    price: WEAR,
    note: "小学生及以下 ¥3,000。",
  },
  {
    item: "雪镜＋头盔，1 日",
    price: "¥1,800＋¥2,300",
    note: "不含在套装内，单件租借。",
  },
  {
    item: "不滑雪的一天：缆车＋Barouche 票＋雪橇",
    price: `线上 ¥5,500＋${SLED}`,
    note: "缆车＋Barouche 票（售票处 ¥6,500）可进入缆车山顶站的玩雪乐园并乘坐 Barouche 空中吊椅；雪橇在山顶站租借。",
  },
  {
    item: "SPA GALA之汤（温泉和泳池），成人",
    price: "¥1,500",
    note: "位于车站建筑内，适合等回程列车时利用。金额来自 JR 东日本的GALA汤泽旅游页面。",
  },
];

const seasonRows = [
  { what: "雪道营业（双板和单板）", detail: `${SLOPES_OPEN} → ${SLOPES_CLOSE}` },
  { what: "观光营业期间", detail: `${SIGHTSEEING_OPEN} → 2026 年 12 月 18 日：只运行缆车和观光吊椅，无论积雪多少都不能滑雪` },
  { what: "直达GALA汤泽的上越新干线", detail: "从GALA汤泽开始营业的 2026 年 12 月 12 日起，普通谷川号延长运行到GALA汤泽，并加开临时列车（JR 东日本，2026 年 10 月 22 日）。该公告未写结束日期；车站只在冬季和春季运营" },
  { what: "夜间滑雪后的回程列车", detail: "谷川 198 号，GALA汤泽 20:19 → 东京 21:40，2027 年 1 月 16 日、30 日和 2 月 13 日、27 日" },
  { what: "JR SKISKI 新干线＋缆车票套餐", detail: "JR 东日本旅游网站仍显示“Coming Soon”，预计 2026 年 11 月中旬开放预订" },
  { what: "每日营业时间", detail: "2026-27 雪季每日营业时间尚待官方公布；营业日期和时间可能因积雪和天气变更" },
];

const liftRows = [
  { ticket: "缆车＋吊椅 1 日票，成人", window: LIFT_WINDOW, web: LIFT_WEB, note: "基本款。可乘坐本雪季营业的两个区域内所有缆车和吊椅。" },
  { ticket: "缆车＋吊椅 1 日票，小学生（儿童）", window: "¥4,000", web: "¥3,500", note: "售票处是成人价的一半，线上再便宜 ¥500。" },
  { ticket: "缆车＋Barouche 票，成人", window: "¥6,500", web: "¥5,500", note: "较便宜的票，只能乘坐缆车和 Barouche 4 人吊椅。适合第一次滑雪、玩雪或短短一个下午；不适合滑遍整座山。" },
  { ticket: "缆车＋Barouche 票，小学生（儿童）", window: "¥3,400", web: "¥2,900", note: "在这座雪场让孩子拿着缆车票上雪地最便宜的方式。" },
  { ticket: "4 小时票，成人", window: "¥7,500", web: "¥7,000", note: "在售票处只比 1 日票便宜 ¥500，所以适合晚到的日子，而不是用来省钱。" },
  { ticket: "4 小时票，小学生（儿童）", window: "¥3,500", web: "¥3,000", note: "道理相同：年纪较小的孩子一天大多也只滑 4 小时左右。" },
  { ticket: "学龄前儿童", window: "免费", web: "免费", note: "每位付费成人可免费带 2 名；第 3 名按小学生价格。这是雪场自己的规定。" },
];

const rentalRows = [
  { item: "双板 3 件套（雪板、雪鞋、雪杖）", adult: `1 日 ${SKI_SET}`, child: "1 日 ¥4,000（小学生及以下）", note: "2 日成人 ¥13,000、儿童 ¥8,000，刚好 2 倍，所以没有多日优惠。" },
  { item: "单板 2 件套（雪板、雪鞋）", adult: `1 日 ${SKI_SET}`, child: "1 日 ¥4,000（小学生及以下）", note: "无论年龄和天数，价格都与双板套装相同。" },
  { item: "滑雪服（上衣和裤子）", adult: `1 日 ${WEAR}`, child: "1 日 ¥3,000（小学生及以下）", note: "从东京来一日游的游客大多需要，却常常没算进预算：乘飞机穿来的外套不适合滑雪。" },
  { item: "雪镜和头盔", adult: "1 日雪镜 ¥1,800、头盔 ¥2,300", child: "价格相同", note: "2 日为 ¥3,600 和 ¥4,600。不含在套装内，是单件租借，所以装备齐全的一天会比上面两项的金额更高。" },
  { item: "PICK UP BOX", adult: "每人＋¥1,000", child: "每人＋¥1,000", note: "雪场自己的免排队取装备服务，7:30–12:00。线上预约在开业前 1 个月开放，使用日 2 天前中午截止；仅限信用卡预付、名额有限，中午截止后取消收取 100% 手续费。租借期间为 12 月 19 日至 3 月 31 日。" },
];

const mountainRows = [
  { what: "营业雪道", detail: "全部 16 条中的 12 条：中央区 5 条、北区 6 条，以及 Falcon 滑降雪道" },
  { what: "南区（South Area）", detail: "4 条雪道在 2026-27 雪季停止营业；雪场雪道地图页面写着「南エリアの営業を休止いたします」（南区暂停营业）" },
  { what: "难度分布", detail: "初级 35%、中级 45%、高级 20%（雪场公布的全山数据）" },
  { what: "缆车和吊椅", detail: "11 座，包括从车站建筑出发的 8 人座 Diligence 缆车" },
  { what: "最长滑行距离", detail: "2,500 米，Falcon 滑降雪道" },
  { what: "海拔", detail: "山顶 1,181 米、山脚 358 米；面积 70 公顷；最大坡度 33°" },
  { what: "营业时间", detail: "2026-27 雪季每日营业时间尚待官方公布。租借从 12 月 19 日起 7:30 开门" },
];

const shapeRows = [
  {
    shape: "自己乘上越新干线",
    covers: "乘车到GALA汤泽，缆车票和装备在雪场或线上购买",
    verdict: "最适合大多数人，在雪地上的时间也最长",
    note: `最快 ${FASTEST}，车站就在建筑内。代价是要自己买齐四样：座位、缆车票、装备、滑雪服；而且GALA汤泽每一种缆车票在售票处都比线上贵至少 ¥500。`,
  },
  {
    shape: "上越新干线＋JR 东日本周游券",
    covers: "铁路区间使用东京广域周游券或 JR EAST PASS",
    verdict: "只有GALA汤泽是两三个一日游之一时才值得计算；只去GALA汤泽则不划算",
    note: `周游券连续 3 日 ${PASS_ADULT}，JR 东日本自己的计算示例（GALA汤泽往返＋日光往返，指定席）为 ${JR_EXAMPLE}。只去一天GALA汤泽达不到这个金额。`,
  },
  {
    shape: "东京出发巴士一日游",
    covers: "前往岩原的往返交通一次预订，玩雪、装备租借或滑雪课程为可选项目；不含餐",
    verdict: "适合第一次滑雪，或想一次订好、不想分开买四样的人",
    note: "单程比上越新干线慢，而且去的不是GALA汤泽，而是同一地区的邻近雪场。这个商品的价值在于当天早上不需要再安排任何事情。",
  },
  {
    shape: "包车",
    covers: "从住宿地点直达GALA汤泽或苗场，预订时选择雪场",
    verdict: "适合团体、带小孩的家庭，或需要比首班车更早出发的情况",
    note: "按车计价而不是按人，4 个人分摊就不算奢侈；也是唯一能把装备放在后备箱、不用扛着穿过东京站的方式。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "从东京怎么去GALA汤泽滑雪场？",
    a: `从东京站乘上越新干线（谷川号）直达GALA汤泽站，最快 ${FASTEST}，不用换乘；车站建在滑雪中心里，缆车也从同一栋建筑出发。直达列车为季节限定：从雪场开始营业的 2026 年 12 月 12 日起，JR 东日本把普通谷川号延长运行到GALA汤泽，并加开临时列车。如果你的列车只到越后汤泽，或在营业季以外前往，可乘雪场免费接驳车，约 10 分钟。其他方式是东京出发的巴士一日游（前往同在汤泽地区的岩原滑雪场）或包车。${OWN}确认。`,
  },
  {
    q: "从东京乘上越新干线到GALA汤泽要多久？",
    a: `最快 ${FASTEST}，雪场和 JR 东日本公布的时间相同。按 JR 东日本 2026 年 10 月 22 日的冬季列车公告，谷川 71 号为东京 6:24 → GALA汤泽 7:35，回程谷川 86 号为GALA汤泽 17:04 → 东京 18:20；JR 东日本的目的地介绍页也写乘谷川号约 1 小时 20 分钟，所以请按单程 71 至 80 分钟规划。在 4 个夜间滑雪的晚上，谷川 198 号 20:19 从GALA汤泽出发，21:40 抵达东京。${OWN}确认。`,
  },
  {
    q: "JR Pass 可以坐到GALA汤泽吗？",
    a: `可以。全国版 JAPAN RAIL PASS 可乘坐 NOZOMI 和 MIZUHO 以外的所有 JR 集团新干线，所以前往GALA汤泽的上越新干线也包含在内（Gran Class 需另付费用）；7 日普通车厢版线上购买为 ${JRP_7DAY}。JR东京广域周游券（${PASS_ADULT}，连续 3 日）和 JR EAST PASS（${EAST_PASS_5DAY}，5 日）也可以使用，JR 东日本也把GALA汤泽列为广域周游券的目的地之一。只去一天GALA汤泽，广域周游券并不划算：JR 东日本自己的计算示例是GALA汤泽往返加日光往返，${JR_EXAMPLE}。${OWN}确认。`,
  },
  {
    q: "GALA汤泽 2026-27 雪季什么时候开放？",
    a: `雪道于 ${SLOPES_OPEN}开放，预计营业到 ${SLOPES_CLOSE}。${SIGHTSEEING_OPEN}至 2026 年 12 月 18 日只运行缆车和观光吊椅，无论积雪多少都不能滑雪。直达的上越新干线与雪场同样从 12 月 12 日开始。2026-27 雪季每日营业时间尚待官方公布，GALA汤泽也说明营业日期和时间可能因积雪和天气变更。${OWN}确认。`,
  },
  {
    q: "GALA汤泽适合初学者或不滑雪的人吗？",
    a: `两者都适合。35% 的雪道为初级，租借处就在车站建筑内，也可以预订英语滑雪课程。不滑雪的人可以购买缆车＋Barouche 票（线上 ¥5,500、售票处 ¥6,500），前往缆车山顶的玩雪乐园、租借雪橇（${SLED}），并乘坐 Barouche 空中吊椅到可眺望谷川连峰的观景台。2026-27 雪季要注意的是南区停止营业，16 条雪道中有 12 条营业。${OWN}确认。`,
  },
];

const sameDayCards: KlookSameDayCard[] = [
  {
    kind: "列车",
    label: "东京 → GALA汤泽新干线车票",
    ctaLabel: "查看东京 → GALA汤泽列车 →",
    url: TRAIN_URL,
    why: "缆车票不含交通：从东京或上野出发的谷川号直达座位，按日期预订，凭二维码乘车。",
  },
  {
    kind: "铁路周游券",
    label: "JR东京广域周游券（连续 3 日）",
    ctaLabel: "查看东京广域周游券 →",
    url: WIDE_URL,
    why: "JR 东日本说明这张周游券可乘坐前往GALA汤泽的上越新干线；如果同样的 3 天内还有另一个一日游，值得计算一下。",
  },
  {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "GALA汤泽说明营业日期和时间会因积雪和天气变更，Klook 商品页也要求用能上网的手机出示缆车票凭证。",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "GALA汤泽说明营业日期和时间会因积雪和天气变更，2026-27 雪季每日营业时间也尚未公布。在季节限定车站，停业通知或新干线延误的消息只能通过手机收到。",
  },
  {
    label: "成田特快（N'EX）往返车票",
    ctaLabel: "查看 N'EX 往返票 →",
    url: klookFor(naritaExpressRoundTripUrl, LOCALE),
    why: "直达前往GALA汤泽的上越新干线发车的东京站。如果你的东京广域周游券从抵达日本当天开始使用，就不需要：JR 东日本说明这张周游券可乘坐 N'EX 指定席。",
  },
  {
    label: "羽田机场 – 东京利木津巴士",
    ctaLabel: "查看利木津巴士 →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "羽田机场版本，凭二维码上车。如果你带着滑雪包抵达，在乘车北上之前还需要先把行李送到东京的酒店，这时就用得上。",
  },
  {
    label: "JR东京广域周游券（连续 3 日）",
    ctaLabel: "查看东京广域周游券 →",
    url: WIDE_URL,
    why: "真正值得计算的一项预订。JR 东日本自己的计算示例是GALA汤泽往返加日光往返（指定席）约 ¥21,500，周游券连续 3 日 ¥16,000，所以GALA汤泽加上另一个一日游，大致就开始划算。",
  },
  {
    label: "东京 → GALA汤泽新干线车票",
    ctaLabel: "查看东京 → GALA汤泽列车 →",
    url: TRAIN_URL,
    why: "不用周游券的GALA汤泽一日：从东京或上野出发的谷川号直达座位，按日期预订，凭二维码乘车。JR 东日本加开的早班谷川 71 号（东京 6:24）只在 1 至 2 月的部分周末和节假日运行，按这班车规划前请先确认日期。",
  },
  {
    label: "GALA汤泽滑雪场缆车票",
    ctaLabel: "查看GALA汤泽缆车票 →",
    url: LIFT_URL,
    why: "GALA汤泽的缆车＋吊椅 1 日票，成人在售票处为 ¥8,000，线上为 ¥7,500，提前购买可省 ¥500。第三方预订平台的结账也接受海外信用卡，界面为中文。",
  },
  {
    label: "GALA汤泽滑雪场 1 日滑雪课程",
    ctaLabel: "查看GALA汤泽滑雪课程 →",
    url: LESSON_URL,
    why: "初学者最容易忘记的一项。GALA汤泽的缆车票、装备租借和滑雪课程都要分开购买，商品页也写明上课仍需另购缆车票。",
  },
];

const tourPicks = [
  withKlookLocale(yuzawaIwapparaSkiDayTourTokyo, LOCALE, {
    title: "东京出发汤泽岩原滑雪场玩雪＋滑雪一日游",
    desc: "从东京乘往返巴士前往越后汤泽地区的岩原滑雪场，玩雪、滑雪、装备租借和滑雪课程都可以在同一笔预订中选择",
  }),
  withKlookLocale(galaNaebaSkiDayTripTokyo, LOCALE, {
    title: "东京出发GALA汤泽／苗场滑雪场一日游",
    desc: "冬季从东京包车前往汤泽地区雪场的一日游，预订时选择雪场",
  }),
  withKlookLocale(hakubaSkiResortDayTourTokyo, LOCALE, {
    title: "东京出发长野白马滑雪场一日游",
    desc: "从东京前往白马山谷的一日游，可从 4 家雪场中选择，缆车票和装备租借包含在预订内",
  }),
  withKlookLocale(galaYuzawaSkiLesson, LOCALE, {
    title: "GALA汤泽滑雪场 1 日滑雪课程",
    desc: "在GALA汤泽由中文或英语教练指导 3 至 6 小时的双板或单板课程；与缆车票分开预订，商品页也写明仍需另购缆车票",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "GALA汤泽滑雪一日游" }];

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
            日本唯一在滑雪场里设有新干线车站的雪场。雪道于 {SLOPES_OPEN}开放，而南区本雪季完全不营业。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "JR 东日本上越新干线直达时间", "JR Pass 使用规则", "GALA汤泽官方 2026-27 价格"].map((t) => (
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
          heading="现在可以预订哪些东京出发的GALA汤泽一日游？"
          checkedIso={OWN_ISO}
          tours={[
            {
              title: "GALA汤泽滑雪场缆车票",
              url: LIFT_URL,
              price: null,
              duration: "滑雪一日；上越新干线另外预订",
              departs: "雪场内的GALA汤泽站",
            },
            {
              title: "东京出发GALA汤泽／苗场滑雪场一日游",
              url: CHARTER_URL,
              price: null,
              duration: "包车 10 小时",
              departs: "东京 23 区内的酒店",
            },
            {
              title: "GALA汤泽滑雪场 1 日滑雪课程",
              url: LESSON_URL,
              price: null,
              duration: "3 至 6 小时",
              departs: "在GALA汤泽集合",
            },
          ]}
          deadline={
            <>
              雪道首次开放的 12 月 19 日至新年期间的日期，请在 11 月 30 日前预订；12 月 12 日至 18 日只运行缆车，不能滑雪。1 至 2 月请至少提前
              3 周预订。截至 11 月 15 日，JR 东日本的 JR SKISKI 新干线＋缆车票套餐仍显示“Coming Soon”，预计 11 月中旬开放预订；GALA汤泽的 PICK
              UP BOX 租借预约在开业前 1 个月开放。
            </>
          }
          primaryCta="在 Klook 查看GALA汤泽缆车票日期与价格 →"
          primaryNote={
            <>
              在商品页选择滑雪日期，就能看到价格和是否开售：GALA汤泽的雪道于 {SLOPES_OPEN}开放，2026-27 雪季每日营业时间尚未公布。
            </>
          }
        />

        <KlookSameDayCards heading="GALA汤泽同一天一起预订的项目" cards={sameDayCards} />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>从东京站</p>
                <p className={styles.verdictStatValue}>{FASTEST}，不用换乘</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>雪道开放</p>
                <p className={styles.verdictStatValue}>2026/12/19 – 2027/5/5</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>缆车票 1 日</p>
                <p className={styles.verdictStatValue}>售票处 {LIFT_WINDOW}／线上 {LIFT_WEB}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass／广域周游券／JR EAST PASS</p>
                <p className={styles.verdictStatValue}>都可坐到GALA汤泽</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              从东京到GALA汤泽，请<strong>在东京站乘上越新干线直达GALA汤泽站，最快 {FASTEST}</strong>（JR 东日本的谷川 71 号东京 6:24 出发、7:35
              抵达），车站就在滑雪中心内；但直达列车只在冬季运行，从 <strong>{SIGHTSEEING_OPEN}</strong>开始。GALA汤泽的<strong>雪道于 {SLOPES_OPEN}开放</strong>，
              营业到 {SLOPES_CLOSE}；12 月 12 日至 18 日只有缆车观光营业。<strong>JAPAN RAIL PASS</strong>（7 日线上 {JRP_7DAY}）、
              <strong>JR东京广域周游券</strong>（{PASS_ADULT}，3 日）和 <strong>JR EAST PASS</strong>（{EAST_PASS_5DAY}，5 日）都可以乘坐这段列车；
              不带装备的GALA汤泽一日游，按GALA汤泽线上价格另需 <strong>¥19,500</strong>（缆车票 {LIFT_WEB}＋双板套装 {SKI_SET}＋滑雪服 {WEAR}）。
              以上于 {OWN}在GALA汤泽和 JR 东日本官网确认；2026-27 雪季每日营业时间尚待官方公布。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                GALA汤泽缆车票 →
              </KlookLink>
              <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                东京出发滑雪一日游 →
              </KlookLink>
              <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                东京 → GALA汤泽列车 →
              </KlookLink>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看东京广域周游券价格 →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                GALA汤泽滑雪课程 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="同一趟旅行一起预订"
          heading="GALA汤泽一日游实际要预订什么"
          intro="先准备上网和机场交通，再是周游券，最后是GALA汤泽分开出售的项目：第一次滑雪一日游最容易漏订的是缆车票和滑雪课程。Klook 价格因日期而异，请按计划日期打开商品页查看。"
          items={tripPrepItems}
        />

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="yuzawa" />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>交通方式</span>
          <h2 className={styles.sectionTitle}>从东京怎么去GALA汤泽滑雪场？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>从东京站乘上越新干线直达GALA汤泽（谷川号）</strong>，最快 {FASTEST}，不用换乘，出了检票口就是滑雪中心。直达列车为季节限定，
            {SIGHTSEEING_OPEN}开始运行；替代方案是乘上越新干线到越后汤泽，再乘GALA汤泽的免费接驳车 10 分钟；较慢的选择是东京出发的巴士一日游或包车。
          </p>
          <Table
            head={["路线", "所需时间", "列车／运行期间", "费用", "注意事项"]}
            rows={accessRows.map((r) => [r.leg, r.time, r.trains, r.cost, r.note])}
          />
          <Sources>
            {ext("https://gala.co.jp/winter/access/", "gala.co.jp/winter/access/")}、
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR 东日本冬季列车公告（2026 年 10 月 22 日）")}、
            {ext("https://www.jreast.co.jp/en/multi/destinations/gala.html", "JR 东日本GALA汤泽介绍页")}。本页不列单程票价：JR 东日本已于 2026 年 3 月
            14 日调整票价，计划日期的票价会显示在结账页面。巴士一日游和包车的所需时间来自 Klook 商品页。
          </Sources>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>需要你自己按日期确认的一点</strong>，是想乘的列车在计划日期是否开到GALA汤泽：加开的早班谷川 71 号只在 1 至 2 月的部分周末和节假日运行。
            请按日期预订座位；如果GALA汤泽是两个一日游之一，请在{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              JR东京广域周游券攻略（英文）
            </Link>
            中计算周游券是否划算。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              东京 → GALA汤泽上越新干线 →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              东京出发滑雪巴士一日游 →
            </KlookLink>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA汤泽缆车票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>所需时间</span>
          <h2 className={styles.sectionTitle}>从东京乘上越新干线到GALA汤泽要多久？</h2>
          <p className={styles.bodyText}>
            <strong>最快 {FASTEST}，实际约 71 至 80 分钟。</strong>按 JR 东日本 2026 年 10 月 22 日的公告，谷川 71 号为东京 6:24 → GALA汤泽
            7:35，回程谷川 86 号为GALA汤泽 17:04 → 东京 18:20；JR 东日本的GALA汤泽介绍页则写乘谷川号约 1 小时 20 分钟。夜间滑雪的话，2027 年
            1 月 16 日、30 日和 2 月 13 日、27 日，谷川 198 号 20:19 从GALA汤泽出发，21:40 抵达东京。{OWN}确认。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>一日费用</span>
          <h2 className={styles.sectionTitle}>GALA汤泽一日游要花多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>不带装备的成人在雪场约 ¥19,500，另加车费</strong>，按GALA汤泽官方 2026-27 线上价格计算。不滑雪、在玩雪乐园玩雪橇的一天为 ¥8,000。
          </p>
          <Table head={["项目", "价格", "需要知道的事"]} rows={costRows.map((r) => [r.item, r.price, r.note])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "GALA汤泽缆车票价格")}、
            {ext("https://gala.co.jp/winter/rental/", "租借")}、
            {ext("https://gala.co.jp/winter/activities/", "活动")}、
            {ext("https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html", "JR 东日本周游券价格")}、
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "JR 东日本旅游网站（SPA GALA之汤）")}。
          </Sources>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA汤泽缆车票 →
            </KlookLink>
            <KlookLink href={EAST_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR EAST PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>雪季</span>
          <h2 className={styles.sectionTitle}>GALA汤泽 2026-27 雪季什么时候开放？</h2>
          <p className={styles.bodyText}>
            <strong>雪道于 {SLOPES_OPEN}开放，预计营业到 {SLOPES_CLOSE}。</strong>前一周的 {SIGHTSEEING_OPEN}至 2026 年 12 月 18 日只有观光营业：
            运行缆车和观光吊椅，无论积雪多少都不能滑双板或单板；直达的上越新干线也同样在 12 月 12 日开始。GALA汤泽另外说明，营业期间和内容可能因积雪和天气变更。
            如果在 12 月 12 日至 18 日预订想去滑雪，实际上只能乘缆车。那几天想看雪山，可以改订<Link href="/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>东京出发富士山一日游</Link>。
          </p>
          <Table head={["2026-27", "日期"]} rows={seasonRows.map((r) => [r.what, r.detail])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "gala.co.jp/winter/hours-pricing/")}、
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR 东日本（2026 年 10 月 22 日）")}、
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "JR 东日本旅游网站")}。
          </Sources>
          <div style={{ marginTop: "1.25rem" }}>
            <Table head={["雪场", `GALA汤泽 2026-27（${OWN}确认）`]} rows={mountainRows.map((r) => [r.what, r.detail])} />
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            雪道、难度、缆车、海拔和南区停止营业，均来自GALA汤泽官方雪道地图页面（
            {ext("https://gala.co.jp/winter/gelande/", "gala.co.jp/winter/gelande/")}），{OWN}确认。<strong>南区停止营业仅限 2026-27 雪季</strong>，
            较早写成的介绍不会提到这一点。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>缆车票</span>
          <h2 className={styles.sectionTitle}>GALA汤泽缆车票多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>成人 1 日票售票处 {LIFT_WINDOW}、线上 {LIFT_WEB}</strong>。GALA汤泽出售的每一种缆车票都有至少 ¥500 的差价，所以提前在线购买是这一天最容易省下的部分。
            真正更便宜的选择有两种，4 小时票其实不算其中之一。
          </p>
          <Table head={["票种", "售票处", "线上价格", "需要知道的事"]} rows={liftRows.map((r) => [r.ticket, r.window, r.web, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            所有金额均为GALA汤泽官方 2026-27 价目表，{OWN}确认。“小学生（儿童）”即雪场的「小学生」票价。请在结账时再次确认。GALA汤泽从 2026 年 10
            月 5 日起限量出售 1,000 张的 ¥4,300 超早鸟票已显示售罄，所以实际可以买到的是上表的线上价格。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA汤泽缆车票 →
            </KlookLink>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA汤泽双板和单板课程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>装备租借</span>
          <h2 className={styles.sectionTitle}>在GALA汤泽可以租滑雪装备吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可以，租借处和车站在同一栋建筑内，这正是从东京不带装备当天往返可行的原因。计算费用前要先知道，GALA汤泽的<strong>装备和滑雪服分开计价</strong>，
            雪镜和头盔也是另外单件租借。
          </p>
          <Table
            head={["项目", "初中生及以上", "小学生及以下", "需要知道的事"]}
            rows={rentalRows.map((r) => [r.item, r.adult, r.child, r.note])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>预订前先加总一次。</strong>不带装备的成人在线购买缆车＋吊椅 1 日票为 {LIFT_WEB}，加上套装 {SKI_SET} 和滑雪服 {WEAR}，还不含雪镜、
            头盔、上越新干线和午餐。所以本页的 Klook 商品值得与在现场逐项购买比较；而 ¥1,000 的 PICK UP BOX 是这里唯一能带来具体好处的加购项目：
            不用在租借处排队。所有价格均为GALA汤泽官方价格，{OWN}确认。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>初学者</span>
          <h2 className={styles.sectionTitle}>GALA汤泽适合初学者或不滑雪的人吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            两者都适合。<strong>35% 的雪道为初级</strong>，缆车从车站建筑直接把你送到初级雪道的上方；不滑雪的人用较便宜的缆车＋Barouche 票，
            就能在缆车山顶的玩雪乐园和雪橇场玩。需要注意的是本雪季的情况：南区停止营业，雪场比较早的介绍里描述的要小。
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>不滑雪的人</p>
              <p className={styles.whoForDesc}>
                缆车＋Barouche 票（线上 ¥5,500、售票处 ¥6,500）包含缆车、山顶站的玩雪乐园，以及前往可眺望谷川连峰的“爱之钟”观景台的 Barouche
                空中吊椅（10:00–16:00，约 30 分钟）。雪橇在山顶站租借，{SLED}；玩雪区天气允许时 8:30–16:00 开放。学龄前儿童乘缆车免费。
                GALA汤泽官方活动页面，{OWN}确认。想在离东京更近的地方玩雪橇，请看{" "}
                <Link href="/guides/attractions/tokyo-snow-day-trip" hrefLang="en" style={linkStyle}>
                  东京近郊玩雪一日游攻略（英文）
                </Link>
                。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>有利的地方</p>
              <p className={styles.whoForDesc}>
                按雪场公布的数据，雪道为初级 35%、中级 45%、高级 20%，共 11 座缆车和吊椅，从车站走到雪道只要几分钟。第一次上雪地的一天，这里是东京当天往返可到的雪场中最好的选择，
                因为出发前的交通环节几乎不会出问题。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>本雪季不利的地方</p>
              <p className={styles.whoForDesc}>
                南区 2026-27 雪季不营业，雪场的原文是「南エリアの営業を休止いたします」。可以滑的是中央区 5 条、北区 6 条和 Falcon 滑降雪道，共 12 条。
                初学者的一天足够，第二次来就略显不足，这时也可以考虑白马或苗场的一日游。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>初学者容易漏订的项目</p>
              <p className={styles.whoForDesc}>
                滑雪课程。GALA汤泽的价目表出售缆车票和租借套装，课程要另外预订；Klook 商品页也明确写着上课仍需另购缆车票。只有缆车票和装备、没有教练的一天，
                就算有 35% 的初级雪道，也没有人教你怎么滑。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>第一天最省钱的安排</p>
              <p className={styles.whoForDesc}>
                购买缆车＋Barouche 票（售票处 ¥6,500、线上 ¥5,500），而不是 ¥8,000 的 1 日票。第一次滑雪的人不会离开缆车和 Barouche 的范围，
                所以全山缆车票等于多付 ¥2,500 买不会乘坐的吊椅。雪场官方价格，{OWN}确认。
              </p>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA汤泽 1 日滑雪课程 →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              东京出发初学者巴士一日游 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>周游券</span>
          <h2 className={styles.sectionTitle}>JR Pass 可以坐到GALA汤泽吗？</h2>
          <p className={styles.bodyText}>
            <strong>可以，游客最可能持有的三种周游券都能乘上越新干线到GALA汤泽。</strong>全国版 <strong>JAPAN RAIL PASS</strong> 可乘坐 NOZOMI 和
            MIZUHO 以外的所有 JR 集团新干线，所以上越新干线也包含在内（Gran Class 需另付费用）；7 日普通车厢版线上为 <strong>{JRP_7DAY}</strong>，在海外代理商购买为
            ¥53,000。<strong>JR EAST PASS</strong> 5 日 <strong>{EAST_PASS_5DAY}</strong>、10 日 ¥50,000，可乘坐 JR 东日本所有线路。{OWN}在
            japanrailpass.net 和 JR 东日本确认。
          </p>
          <p className={styles.bodyText}>
            这趟行程三者中最便宜的是 <strong>JR东京广域周游券</strong>：GALA汤泽在适用范围内，JR 东日本也把它列为周游券的目的地之一，可乘坐上越新干线普通车厢指定席或自由席前往。
            价格为成人 <strong>{PASS_ADULT}</strong>、6 至 11 岁儿童 <strong>¥8,000</strong>，<strong>连续 3 日</strong>使用；这是从{" "}
            <strong>2026 年 3 月 14 日</strong>起、由 ¥15,000 和 ¥7,500 上调后的价格。{OWN}确认。
          </p>
          <p className={styles.bodyText}>
            值得回答的问题是它<em>划不划算</em>，而 JR 东日本自己给出了计算示例：<strong>GALA汤泽往返加上日光特急往返</strong>，全程指定席分开购买为
            <strong>{JR_EXAMPLE}</strong>，周游券则是 {PASS_ADULT}。请注意，这个示例是<strong>两个</strong>一日游。只去一天GALA汤泽达不到 {PASS_ADULT}
            的周游券价格，所以原则是：GALA汤泽是从东京出发的两三个一日游之一，就买周游券；只去这一个，就买单程车票。季节上的限制是：GALA汤泽站只在冬季和春季运营，
            营业季以外同一张周游券只能到越后汤泽。{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              JR东京广域周游券攻略（英文）
            </Link>
            计算了关东各个一日游的划算点，{" "}
            <Link href="/guides/transport/jr-pass-guide" hrefLang="en" style={linkStyle}>
              JR Pass 攻略（英文）
            </Link>
            则用同样方式整理全国版周游券。
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
          <span className={styles.sectionLabel}>跟团还是乘火车</span>
          <h2 className={styles.sectionTitle}>该报名一日游，还是自己乘上越新干线？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            想要最多的滑雪时间，就乘上越新干线；想要最少的决定，就报名巴士一日游。要先弄清楚的是，两者去的不是同一家雪场：火车去GALA汤泽，东京出发的巴士一日游则去岩原等邻近的汤泽地区雪场。
          </p>
          <Table head={["一日安排", "包含内容", "结论", "需要知道的事"]} rows={shapeRows.map((r) => [r.shape, r.covers, r.verdict, r.note])} />
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>有一项预订信息现在就需要确认。</strong>截至 {OWN}，JR 东日本旅游网站上 2026-27 雪季的 <em>JR SKISKI</em> GALA汤泽新干线＋缆车票套餐仍显示
            “Coming Soon”，预计 2026 年 11 月中旬开放预订。也就是说，本雪季的官方套餐目前还不能预订，而下方第三方预订平台的商品已经在售、接受海外信用卡，界面为中文。
            想要套餐就等到 11 月中旬；想现在先确定日期，就分开预订。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              东京出发汤泽巴士一日游 →
            </KlookLink>
            <KlookLink href={CHARTER_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA汤泽／苗场包车一日游 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>冬季其他行程</span>
          <h2 className={styles.sectionTitle}>GALA汤泽一日适合搭配哪些行程？</h2>
          <p className={styles.bodyText}>
            GALA汤泽是住在东京时安排的一天，所以请配合其他行程规划。{" "}
            <Link href="/zh-cn/guides/attractions/japan-winter-itinerary" style={linkStyle}>
              日本冬季 12 天行程
            </Link>
            说明了东京的停留如何搭配更北边和西边的雪国。值得一起比较价格的另一个冬季一日游是{" "}
            <Link href="/zh-cn/guides/attractions/jigokudani-snow-monkey-tour" style={linkStyle}>
              地狱谷野猿公苑雪猴行程
            </Link>
            ：上越新干线的GALA汤泽和北陆新干线的长野都在 JR EAST PASS 范围内，两个都去的话算法就不同。滑雪后可以及时回到市区，欣赏{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en" style={linkStyle}>
              东京冬季灯饰（英文）
            </Link>
            ，只需要一个晚上。
          </p>
          <p className={styles.bodyText}>
            如果你 1 月在日本，请先确定{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={linkStyle}>
              高山和白川乡点灯行程（英文）
            </Link>
            ，再把GALA汤泽排进去，因为点灯只有固定的 4 个晚上，GALA汤泽则整季营业。如果第一天让你想来一次正式的滑雪周，下一步是北海道的{" "}
            <Link href="/zh-cn/guides/attractions/niseko-ski-tours" style={linkStyle}>
              二世古滑雪行程
            </Link>
            ；不想坐飞机的话，可以在长野住几晚：{" "}
            <Link href="/guides/attractions/hakuba-ski-tours" hrefLang="en" style={linkStyle}>
              白马滑雪行程攻略（英文）
            </Link>
            介绍从东京乘新干线转巴士的方式，{" "}
            <Link href="/guides/attractions/nozawa-onsen-ski" hrefLang="en" style={linkStyle}>
              野泽温泉滑雪攻略（英文）
            </Link>
            介绍从饭山站前往的温泉村雪场。{" "}
            <Link href="/guides/attractions/japan-ski-trip-itinerary" hrefLang="en" style={linkStyle}>
              日本滑雪旅行行程（英文）
            </Link>
            整理了 7 天或 10 天滑雪周在各地住几晚。2 月往北走，可以以 2027 年 2 月 4 日至 11 日的{" "}
            <Link href="/zh-cn/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>
              札幌雪祭行程
            </Link>
            为主，加上{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en" style={linkStyle}>
              札幌出发小樽一日游（英文）
            </Link>
            ，或延伸为完整的{" "}
            <Link href="/zh-cn/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>
              北海道 7 天行程
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>滑雪之前</span>
          <h2 className={styles.sectionTitle}>旅游保险包含滑雪的那一天吗？</h2>
          <p className={styles.bodyText}>
            请在购买缆车票之前确认，而不是之后。保单是否包含雪上运动要看保单本身：例如 SafetyWing 在佩戴头盔的条件下包含雪道内的双板和单板，雪道外则不在该条款内，
            其他保单可能需要附加条款。在雪地上的一天，是日本旅行中最可能产生医疗费用的一天，所以这比在线购票省下的 ¥500 更重要。{" "}
            <Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en" style={linkStyle}>
              日本滑雪旅游保险攻略（英文）
            </Link>
            整理了常见除外条款的实际内容，以及什么算雪道外。
          </p>
          <p className={styles.bodyText}>
            去GALA汤泽之前还有两件事要准备。一是<strong>手机上网</strong>：雪场在公告中说明营业日期和时间会因积雪和天气变更，而支线上的季节限定车站，正是停业通知只能通过手机收到的地方。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              查看 Klook eSIM →
            </KlookLink>{" "}
            <Link href="/zh-cn/guides/esim/best-esim-japan" style={linkStyle}>
              日本 eSIM 推荐攻略
            </Link>
            则与其他选择比较。二是<strong>付款方式</strong>：雪场自己的预订流程是以日本国内信用卡为前提设计的，这也是这家雪场有第三方预订平台的一大原因。
          </p>
        </section>

        <p className={styles.bodyText}>
          前往GALA汤泽的上越新干线从东京站出发，因此{" "}
          <Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en" style={linkStyle}>
            东京住宿区域攻略（英文）
          </Link>
          建议以一日游为主的行程住在东京站一带。
        </p>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="GALA汤泽滑雪场常见问题" />

        <KlookTourPicks
          heading="从东京可以当天往返的其他滑雪行程"
          intro="GALA汤泽是最快的，但不是唯一的选择。汤泽地区积雪不足、南区停止营业让 12 条雪道显得太少，或你想一次订好而不是分开买四样时，可以考虑以下行程。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/jigokudani-snow-monkey-tour", title: "东京出发雪猴行程：地狱谷野猿公苑攻略（2027）" },
            { href: "/guides/transport/jr-east-pass", title: "JR East Pass（2026）：价格、范围与是否划算（英文）" },
            { href: "/guides/transport/tokyo-wide-pass", title: "JR东京广域周游券 2026：价格、范围与是否划算（英文）" },
            { href: "/guides/money/best-travel-insurance-japan", title: "日本旅游保险推荐 2026：谁需要什么（英文）" },
            { href: "/guides/money/japan-ski-travel-insurance", title: "日本滑雪旅游保险：普通保单不保什么（英文）" },
            { href: "/zh-cn/guides/attractions/niseko-ski-tours", title: "二世古滑雪行程 2026-27" },
            { href: "/zh-cn/guides/attractions/japan-winter-itinerary", title: "日本冬季 12 天行程（2027）" },
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山和白川乡行程（2027）：从哪里出发（英文）" },
            { href: "/zh-cn/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭行程（2027）" },
            { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出发小樽一日游（2027）（英文）" },
            { href: "/zh-cn/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 天行程" },
            { href: "/guides/attractions/tokyo-illumination-tours", title: "东京灯饰：日期、时间与免费景点（英文）" },
            { href: "/guides/attractions/tokyo-snow-day-trip", title: "东京近郊玩雪一日游（2026-27）（英文）" },
            { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "东京出发轻井泽一日游（2026）：新干线、奥特莱斯与雪（英文）" },
            { href: "/zh-cn/guides/esim/best-esim-japan", title: "日本 eSIM 推荐（2026）" },
            { href: "/zh-cn/guides/attractions", title: "更多日本景点门票 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>从东京 {FASTEST}，以及要买的三样东西</h2>
            <p className={styles.ctaBannerDesc}>
              雪道于 {SLOPES_OPEN}开放。缆车票售票处 {LIFT_WINDOW}、线上 {LIFT_WEB}，装备另计，滑雪课程也另计，所以建议先买周游券，再订课程。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看东京广域周游券价格 →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看GALA汤泽滑雪课程 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
