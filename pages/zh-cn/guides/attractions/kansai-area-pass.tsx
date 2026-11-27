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
import {
  jrHarukaUrl,
  jrKansaiAreaPass3276,
  jrKansaiMiniPass,
  kansaiAreaPassSameDayCards,
  kansaiAreaPassSameDayPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/kansai-area-pass) section by section as of
// 2026-11-25 (task-jtk-20261125-TR02): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added.
// Title term: 关西地区铁路周游券 — JR West's own Simplified Chinese name
// ("WEST QR关西地区铁路周游券", westjr.co.jp/global/sc/ticket/westqr/kansaiarea/). Other pass
// names follow JR West's sc pages (关西广域铁路周游券, 关西迷你铁路周游券, 关西&广岛地区铁路周游券).

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/kansai-area-pass";
const TITLE = "JR关西地区铁路周游券 2026：价格与关西广域比较";
const H1 = "JR关西地区铁路周游券 2026：价格、HARUKA 与关西广域铁路周游券比较";
const DESC =
  "JR关西地区铁路周游券 2026：1 日 ¥2,700 至 4 日 ¥6,700。关西机场到京都加奈良，单程票合计 ¥4,140。含 HARUKA，不含新干线。";

// R18 (2026-11-27, task jtk-20261127-R18): mirrors the English page's itinerary table,
// ordinary-fare table, coverage H2, same-day cards and KANSAI ONE PASS FAQ. Fares from
// JR West's Keihanshin fare PDF (別紙4) and the 25 Feb 2026 press release (Osaka–Himeji ¥1,460).
const CHECKED_ISO = "2026-11-27";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const R04_CHECKED = dateLabel("2026-11-13", LOCALE);
const PREV_CHECKED = dateLabel("2026-11-03", LOCALE);
const OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/";
const HARUKA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/haruka/";
const WIDE_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/pass/kansai_wide/";
const ICOCA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/howto/icoca/";
const FARE_PDF_URL = "https://www.westjr.co.jp/press/article/items/240515_00_press_keihanshin_unchin.pdf";
const HIMEJI_FARE_URL = "https://www.westjr.co.jp/press/article/items/260225_00_press_JRWESTQR2daypass_1.pdf";
const KOP_NOTICE_URL = "https://www.hanshin.co.jp/press/docs/20241223-toshikotsu-wanpasssyuryo2.pdf";

const KANSAI_PASS_URL = klookFor(jrKansaiAreaPass3276.url, LOCALE);
const HARUKA_URL = klookFor(jrHarukaUrl, LOCALE);

const QR_1_DAY = "¥2,700";
const QR_4_DAY = "¥6,700";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const vsWideRows = [
  {
    option: "结论",
    area: "乘 JR 往返京都、大阪、奈良、神户、姬路与关西机场 → 关西地区铁路周游券",
    shinkansen: "要乘新干线去冈山，或去城崎温泉、天桥立、白滨 → 关西广域",
    price: "只在一座城市内乘地铁 → ICOCA",
    who: "",
  },
  {
    option: "JR 西日本关西地区铁路周游券（WEST QR）",
    area: "京都、大阪、奈良、神户、姬路、和歌山、大津、敦贺、伊贺上野一带的 JR 西日本在来线列车；HARUKA 自由席不限次数，指定席 2 次",
    shinkansen: "✗ 不能乘新干线；HARUKA 以外的特急也不能乘",
    price: "¥2,700（1 日）、¥4,700（2 日）、¥5,500（3 日）、¥6,700（4 日），成人",
    who: "以关西机场为起点或终点的 1–4 天关西行程",
  },
  {
    option: "JR 西日本关西广域铁路周游券",
    area: "关西地区铁路周游券的全部范围，再加上冈山、高松、城崎温泉、天桥立、鸟取、白滨；HARUKA、KUROSHIO、KONOTORI、SUPER HAKUTO 等特急的指定席",
    shinkansen: "✓ 山阳新干线指定席，仅限新大阪 ⇔ 冈山（不含前往东京的东海道新干线）",
    price: "连续 5 天 ¥12,000，成人（儿童 ¥6,000）",
    who: "5 天行程中至少有一天要去比姬路更远的地方",
  },
  {
    option: "ICOCA（JR 西日本 IC 卡）",
    area: "在日本全国支持交通 IC 卡的区域内，乘坐 JR、地铁、私铁及巴士时按次扣费",
    shinkansen: "非周游券：每次乘车从卡内余额扣除车费",
    price: "面向访日游客发行的 ICOCA ¥2,000，含 ¥500 押金（关西机场站 JR 售票处）",
    who: "只在一座城市游玩、主要乘地铁或私铁的日子，以及与周游券搭配支付范围外的车费",
  },
];

const priceRows = [
  { days: "1 日", qrAdult: QR_1_DAY, qrChild: "¥1,350", perDay: "¥2,700", oldAdult: "¥2,800" },
  { days: "2 日", qrAdult: "¥4,700", qrChild: "¥2,350", perDay: "¥2,350", oldAdult: "¥4,800" },
  { days: "3 日", qrAdult: "¥5,500", qrChild: "¥2,750", perDay: "¥1,833", oldAdult: "¥5,800" },
  { days: "4 日", qrAdult: QR_4_DAY, qrChild: "¥3,350", perDay: "¥1,675", oldAdult: "¥7,000" },
];

const breakEvenRows = [
  { trip: "关西机场 → 京都，1 天", singles: "¥2,700", pass: `${QR_1_DAY}（1 日券）`, result: "价格相同，当天乘坐其他 JR 列车也无需另付车费" },
  { trip: "关西机场 → 神户，1 天", singles: "¥2,300", pass: `${QR_1_DAY}（1 日券）`, result: "当天其他 JR 车费累计达到 ¥400 才划算" },
  { trip: "关西机场 → 奈良，1 天", singles: "¥2,200", pass: `${QR_1_DAY}（1 日券）`, result: "当天其他 JR 车费累计达到 ¥500 才划算" },
  { trip: "关西机场 → 大阪／新大阪，1 天", singles: "¥1,900", pass: `${QR_1_DAY}（1 日券）`, result: "当天其他 JR 车费累计达到 ¥800 才划算" },
  { trip: "关西机场 → 只到天王寺", singles: "¥1,600", pass: `${QR_1_DAY}（1 日券）`, result: "单程票便宜 ¥1,100，不必买周游券" },
  { trip: "关西机场往返京都，2 天行程", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: "¥4,700（2 日券）", result: "即使不乘其他列车，周游券也便宜 ¥700" },
  { trip: "抵达后前往京都、从大阪返回机场，3 天行程", singles: "¥2,700 + ¥1,900 = ¥4,600", pass: "¥5,500（3 日券）", result: "3 天内其他 JR 车费累计达到 ¥900 才划算" },
  { trip: "关西机场往返京都，4 天行程", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: `${QR_4_DAY}（4 日券）`, result: "4 天内其他 JR 车费累计达到 ¥1,300 才划算" },
];

// R18: JR West ordinary adult fares, same as the English page.
const fareRows = [
  { route: "关西机场 → 京都（HARUKA 单程票）", fare: "¥2,700", onPass: "✓ 可乘坐 HARUKA 自由席，或使用 2 次指定席中的 1 次" },
  { route: "关西机场 → 大阪／新大阪（HARUKA 单程票）", fare: "¥1,900", onPass: "✓ HARUKA（新大阪）或关空快速" },
  { route: "大阪 ↔ 京都（JR 京都线新快速）", fare: "¥580", onPass: "✓ 新快速；✗ 新大阪–京都的新干线" },
  { route: "京都 ↔ 奈良（JR 奈良线）", fare: "¥720", onPass: "✓" },
  { route: "天王寺 ↔ 奈良（JR 大和路线）", fare: "¥510", onPass: "✓" },
  { route: "大阪 ↔ 三宫（神户，JR 神户线）", fare: "¥420", onPass: "✓" },
  { route: "大阪 ↔ 姬路（JR 神户线新快速）", fare: "¥1,460", onPass: "✓ 新快速；✗ 新大阪–姬路的新干线" },
];

// R18: itineraries priced as singles vs the pass (the Table component adds the verdict row first).
const itineraryRows = [
  { plan: "第 1 天：关西机场 → 京都，再往返京都 ↔ 奈良", singles: "¥2,700 + ¥720 + ¥720 = ¥4,140", pass: "¥2,700（1 日券）", result: "✓ 周游券省 ¥1,440" },
  { plan: "大阪 ↔ 姬路一日游", singles: "¥1,460 × 2 = ¥2,920", pass: "¥2,700（1 日券）", result: "✓ 周游券省 ¥220" },
  { plan: "只往返大阪 ↔ 京都", singles: "¥580 × 2 = ¥1,160", pass: "¥2,700（1 日券）", result: "✗ 单独购票便宜 ¥1,540" },
  { plan: "只往返天王寺 ↔ 奈良", singles: "¥510 × 2 = ¥1,020", pass: "¥2,700（1 日券）", result: "✗ 单独购票便宜 ¥1,680" },
  { plan: "3 天：关西机场 → 京都；京都 ↔ 奈良；京都 → 大阪 → 关西机场", singles: "¥2,700 + ¥1,440 + ¥580 + ¥1,900 = ¥6,620", pass: "¥5,500（3 日券）", result: "✓ 周游券省 ¥1,120" },
  { plan: "4 天：上面的 3 天行程，第 3 天再加大阪 ↔ 姬路", singles: "¥6,620 + ¥2,920 = ¥9,540", pass: `${QR_4_DAY}（4 日券）`, result: "✓ 周游券省 ¥2,840" },
  { plan: "仅在大阪游玩的 2 天行程：关西机场 → 大阪、大阪 → 关西机场", singles: "¥1,900 × 2 = ¥3,800", pass: "¥4,700（2 日券）", result: "✗ 单独购票便宜 ¥900" },
];

const LINES_LEAD = "JR 西日本在来线列车加上 HARUKA。不能乘新干线、其他特急、地铁、公交或私铁。";

const lineRows = [
  { service: "JR 京都线／神户线新快速", allowed: "✓ 不限次数", note: "京都–大阪–三宫–姬路之间的 JR 快速列车普通座位。使用付费 A-Seat 座位需另行付费。" },
  { service: "JR 奈良线与大和路线", allowed: "✓ 不限次数", note: "奈良线：京都–稻荷（伏见稻荷）–奈良；大和路线：天王寺／JR 难波–奈良。" },
  { service: "关西机场线快速（关空快速）", allowed: "✓ 不限次数", note: "经天王寺前往大阪、耗时较长的 JR 机场列车；如果 HARUKA 的发车时间不合适，可以改乘该列车。" },
  { service: "关西机场特急 HARUKA，自由席", allowed: "✓ 不限次数", note: "从关西机场到天王寺、新大阪、京都的机场列车。这是购买这张周游券最主要的理由。" },
  { service: "关西机场特急 HARUKA，普通车厢指定席", allowed: "✓ 2 次", note: "含 2 次指定席，无需另付费用。自乘车日前 30 天起，可通过 WEST-QR 网站预约；JR 西日本说明无法在车上、售票机或车站售票处预约。" },
  { service: "HARUKA 绿色车厢（头等）", allowed: "✗ 不含", note: "需另外购票。周游券只能乘普通车厢。" },
  { service: "JR 西日本新快速、快速与普通列车", allowed: "✓ 不限次数", note: "有效区域内的普通线路：大阪–京都、大阪–神户、大阪–奈良、大阪–姬路等。" },
  { service: "新干线（东海道、山阳）", allowed: "✗ 不能乘", note: "任何区间都不能乘。即使当天在周游券有效期内，新大阪到京都乘新干线也要另外买票。" },
  { service: "其他特急列车", allowed: "✗ 不含", note: "周游券能乘的特急只有 HARUKA。Thunderbird（雷鸟号）、KUROSHIO（黑潮号）等都要另外买票。" },
  { service: "私铁：阪急、京阪、近铁、南海", allowed: "✗ 不含", note: "这是 JR 西日本的票券；JR 西日本旧版周游券页面上的京阪、阪急乘车券，也是另外出售的兑换券。在京都和大阪观光时，最方便的线路往往是这些私铁，而不是 JR。" },
  { service: "大阪地铁（Osaka Metro）、京都市营地铁与市区公交", allowed: "✗ 不含", note: "不能乘地铁与市区公交。在这两座城市内出行，仍需另外使用交通 IC 卡或市内交通周游券。" },
  { service: "JR 列车的付费座位（A-Seat）及普通列车的绿色车厢", allowed: "✗ 需加价", note: "可乘坐新快速、快速及普通列车的普通座位；付费的 A-Seat 与绿色车厢需要加价。" },
];

const compareRows = [
  { option: "结论", price: "—", covers: "只在关西、乘 JR 与 HARUKA → 关西地区铁路周游券。乘近铁去奈良 → 近铁周游券。同一行程还要去广岛 → 关西&广岛地区铁路周游券", pick: "KANSAI ONE PASS 是 IC 卡，不能替代周游券" },
  { option: "WEST QR 关西地区铁路周游券", price: `${QR_1_DAY}（1 日）至 ${QR_4_DAY}（4 日），成人`, covers: "大阪、京都、神户、奈良、姬路、和歌山、大津、敦贺、伊贺上野一带的 JR 西日本在来线列车，加上 HARUKA 自由席不限次数与 2 次指定席", pick: "以关西机场为起点或终点的关西行程，首选这款" },
  { option: "关西迷你铁路周游券", price: "连续 3 天 ¥3,000，成人（儿童 ¥1,500）", covers: "JR 西日本快速、普通列车与关空快速。HARUKA 需另购特急券", pick: "如果机场交通改乘耗时较长的关空快速而非 HARUKA，这款最便宜" },
  { option: "HARUKA 单程票（HARUKA One-way Ticket）", price: "从关西机场出发：天王寺 ¥1,600、大阪／新大阪 ¥1,900、神户 ¥2,300、奈良 ¥2,200、京都 ¥2,700", covers: "仅含一次机场交通，不含之后的城市间交通", pick: "整个行程仅在往返机场时乘坐 JR" },
  { option: "近铁周游券（KINTETSU RAIL PASS）", price: "¥1,900（1 日）、¥3,700（2 日）、¥4,900（5 日）、¥6,700（5 日 plus）", covers: "仅限近铁：大阪难波到近铁奈良与京都，5 日券可到伊势志摩与名古屋。不含 JR 与 HARUKA", pick: "如果奈良公园是主要的一日游目的地，而且住在难波附近（从难波到奈良的是近铁，不是 JR）" },
  { option: "关西&广岛地区铁路周游券", price: "连续 5 天 ¥17,000，成人（儿童 ¥8,500）", covers: "关西的 JR 西日本，加上山阳新干线新大阪 ⇄ 广岛指定席、含 HARUKA 在内的特急，以及 JR 宫岛渡轮", pick: "同一趟要去广岛与宫岛时；关西地区铁路周游券完全不能乘新干线" },
  { option: "KANSAI ONE PASS", price: "非周游券：可充值、按次扣费的交通 IC 卡", covers: "JR、私铁、地铁与巴士按次扣费；2027 年 3 月前陆续停售", pick: "不能替代铁路周游券。如果按次付费，ICOCA 等交通 IC 卡都具有相同功能" },
  { option: "关西广域铁路周游券", price: "连续 5 天 ¥12,000，成人（儿童 ¥6,000）", covers: "在关西地区铁路周游券的范围上，再加上山阳新干线新大阪 ⇄ 冈山区间指定席，以及高松、城崎温泉、天桥立、鸟取、白滨", pick: "如果行程不只到姬路为止；如果安排去关西以外的一日游，适合的周游券也会不同" },
  { option: "大阪周游卡（OSAKA AMAZING PASS）", price: `1 日 ¥3,500、2 日 ¥5,000（${PREV_CHECKED}确认）`, covers: "免费乘坐大阪周游卡线路图所列的巴士与电车，并可进入指定景点：这是市内交通及景点周游卡，不是区域铁路周游券", pick: "在大阪市内游玩一天时使用。无法替代关西地区铁路周游券的机场路段，以及往返京都、奈良的移动" },
  { option: "JR Pass 全国版（2026 年 10 月 1 日改版后）", price: `7 日普通车厢：官网 ¥50,000，海外旅行社兑换券 ¥53,000（${PREV_CHECKED}确认）`, covers: "日本全国 JR 线路，含大部分新干线：适用范围远大于关西地区铁路周游券，价格是关西地区铁路周游券 4 日券的 7 倍以上", pick: "行程包含东京时才考虑；是否划算请看 JR Pass 攻略" },
];

const worthRows = [
  { plan: "抵达关西机场后直接去京都", verdict: "✓ 买 1 日券", why: "2026 年 11 月 1 日起售出的 HARUKA 单程票到京都为 ¥2,700，与 1 日券同价。买周游券也不会多花钱，当天乘坐的其他 JR 也都无需另付车费。" },
  { plan: "在大阪、京都、奈良、神户之间乘 JR 游玩 3 或 4 天", verdict: "✓ 买 3 日或 4 日券", why: `${QR_4_DAY} 的 4 日券涵盖机场往返与城市间交通。仅机场两段：HARUKA 单程到京都 ¥2,700、从大阪前往关西机场 ¥1,900，就占了 ¥6,700 中的 ¥4,600，其余 ¥2,100 需由其他行程的 JR 车费补足。` },
  { plan: "住在一座城市，主要靠步行、地铁和公交游览", verdict: "✗ 不用买", why: "大阪地铁、京都市营地铁与市区公交都不能乘。如果每天都在同一座城市，IC 卡加城市周游卡更便宜，周游券能用到的只有机场交通。" },
  { plan: "乘阪急、京阪或近铁游览京都寺庙", verdict: "✗ 买错票", why: "伏见稻荷、岚山与奈良都既有 JR 也有私铁；周游券只能用于 JR 线路（稻荷、嵯峨岚山、JR 奈良）。购买 JR 票券之前，请先确认要去的车站属于哪家公司的线路。" },
  { plan: "同一行程还包括东京，或需要乘坐新干线", verdict: "✗ 不适合这张周游券", why: "任何区间的新干线都不能乘，适用范围也远未覆盖东京。请比较全国版 JR Pass 的价格，或单独购买相应区间的新干线车票，仅在关西游玩的日子使用关西周游券。" },
  { plan: "持日本护照或居住在日本", verdict: "✗ 不符合资格", why: "JR 西日本只向持外国政府签发护照、以“短期滞在”身份入境的旅客出售。日本国籍者不能使用，在日本有永住权的外国人也不能使用。" },
];

const faqItems: FaqItem[] = [
  {
    q: "JR关西地区铁路周游券多少钱？",
    a: `成人周游券价格为：连续 1 天 ${QR_1_DAY}、2 天 ¥4,700、3 天 ¥5,500、4 天 ${QR_4_DAY}；6 至 11 岁儿童半价（¥1,350／¥2,350／¥2,750／¥3,350）。这是目前正在出售的 JR 西日本 WEST QR 关西地区铁路周游券的价格。旧版纸质周游券（¥2,800／¥4,800／¥5,800／¥7,000）已于 2026 年 9 月 30 日停售。${CHECKED}在 westjr.co.jp 确认。`,
  },
  {
    q: "关西地区铁路周游券和关西广域铁路周游券，哪一张更好？",
    a: `对于大多数首次前往关西的旅客，买关西地区铁路周游券就够了；只有要去比姬路更远的地方，才需要关西广域铁路周游券。关西地区铁路周游券 1 至 4 天 ${QR_1_DAY}–${QR_4_DAY}，不能乘新干线。关西广域铁路周游券连续 5 天 ¥12,000，另外包含新大阪与冈山之间的山阳新干线指定席，以及城崎温泉、天桥立、鸟取、白滨与高松。如果行程只有京都、大阪、奈良、神户与姬路，4 日券（${QR_4_DAY}）便宜 ¥5,300。两者均于${CHECKED}在 westjr.co.jp 确认。`,
  },
  {
    q: "KANSAI ONE PASS 停售了吗？",
    a: `是的。KANSAI ONE PASS 是可充值的 IC 卡，不是铁路周游券；根据 JR 西日本等 10 家公司及交通机构 2024 年 12 月 23 日的联合公告，自 2025 年 11 月 1 日起各公司售完库存即陆续停售，并于 2026 财年结束前（2027 年 3 月）全面停售。已购买的卡片仍可作为 IC 卡使用，商店及景点优惠于 2026 财年末终止。公告未公布后续替代卡。${CHECKED}确认。`,
  },
  {
    q: "去京都和大阪，买关西地区铁路周游券划算吗？",
    a: `从关西机场入境、乘 JR 在城市之间移动的话划算；只往返一次大阪–京都的话不划算。按 JR 西日本公布的票价，关西机场到京都的 HARUKA 单程票（¥2,700）加上京都–奈良往返（¥1,440）共 ¥4,140，1 日券只要 ¥2,700；关西机场 → 京都 → 奈良 → 大阪 → 关西机场的 3 天行程，单独购票合计 ¥6,620，3 日券 ¥5,500。大阪–京都往返只要 ¥1,160（单程 ¥580），只为这一趟往返买 ¥2,700 的 1 日券并不划算。大阪地铁、京都市营地铁、市区公交，以及近铁、阪急、京阪、南海都不能乘。票价来自 westjr.co.jp，${CHECKED}确认。`,
  },
  {
    q: "关西地区铁路周游券可以乘新干线、HARUKA 和地铁吗？",
    a: `可以乘 HARUKA，但不能乘新干线和地铁。JR 西日本说明 WEST QR 关西地区铁路周游券可不限次数乘坐 HARUKA 自由席，另含 2 次指定席，并且“即使支付追加费用，也不能乘坐新干线”。大阪地铁、京都市营地铁、市区公交与私铁都不属于 JR 西日本，不能乘。如果需要可乘坐新干线的关西周游券，关西广域铁路周游券（¥12,000，5 天）包含山阳新干线新大阪 ⇔ 冈山指定席，关西&广岛地区铁路周游券（¥17,000，5 天）则可用于新大阪 ⇔ 广岛区间。${CHECKED}确认（关西&广岛为${R04_CHECKED}）。`,
  },
];

const tripPrepItems = [
  withKlookLocale(kansaiAreaPassSameDayPrep[0], LOCALE, {
    label: "京都、奈良一日游（清水寺、伏见稻荷、奈良公园）",
    ctaLabel: "查看京都奈良一日游 →",
    why: "只需预订一次带导游的巴士一日游，即可游览京都和奈良公园，行程还包括周游券不涵盖的景点间巴士及步行路段。",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[1], LOCALE, {
    label: "大阪出发姬路城巴士一日游（拼团）",
    ctaLabel: "查看姬路一日游 →",
    why: "姬路位于周游券适用的 JR 范围内；如果不想自行规划姬路城一日游，可以改参加从大阪出发的巴士拼团行程。",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[2], LOCALE, {
    label: "JR 机场特急 HARUKA 车票（关西机场）",
    ctaLabel: "查看 HARUKA 车票 →",
    why: "如果往返机场的日期不在周游券有效期内，或整个行程中只有机场交通乘坐 JR，可与周游券比价的关西机场车票就是 HARUKA 单程票。",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[3], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "WEST QR 周游券通过手机上的二维码使用：点击“Use ticket（使用车票）”和在线预约 2 次 HARUKA 指定席都需要上网，从抵达日本那一刻起就需要移动数据。",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[4], LOCALE, {
    label: "梅田／大阪站周边酒店",
    ctaLabel: "查看大阪站周边酒店 →",
    why: "大阪站是乘坐 JR 西日本新快速前往京都、神户和姬路的主要枢纽，多日周游券是否划算，关键就在于这些城市间的出行。",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[5], LOCALE, {
    label: "京都站周边酒店",
    ctaLabel: "查看京都站周边酒店 →",
    why: "京都站是从关西机场出发的 HARUKA 终点站，住在这里，周游券的机场路段就不用换乘。",
  }),
];

// R18: the three same-day cards under the main CTA, dropped from the lower list.
const sameDayCards = [
  withKlookLocale(kansaiAreaPassSameDayCards[0], LOCALE, {
    kind: "一日游",
    label: "京都、奈良一日游（清水寺、伏见稻荷、奈良公园）",
    ctaLabel: "查看京都奈良一日游 →",
    why: "只需预订一次带导游的巴士一日游，即可游览京都和奈良公园，行程还包括周游券不涵盖的景点间巴士及步行路段。",
  }),
  withKlookLocale(kansaiAreaPassSameDayCards[1], LOCALE, {
    kind: "酒店",
    label: "京都站周边酒店",
    ctaLabel: "查看京都站周边酒店 →",
    why: "京都站是 HARUKA 的终点，也是 JR 奈良线的起点，使用周游券最常乘坐的两条线路都可在附近直接乘车。",
  }),
  withKlookLocale(kansaiAreaPassSameDayCards[2], LOCALE, {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "WEST QR 周游券通过手机上的二维码使用：点击“Use ticket（使用车票）”和预约 2 次 HARUKA 指定席，抵达机场到达大厅后就需要上网。",
  }),
];
const lowerPrep = tripPrepItems.filter((p) => !sameDayCards.some((c) => c.url === p.url));

const tourPicks = [
  withKlookLocale(jrKansaiAreaPass3276, LOCALE, {
    title: "JR 西日本关西地区铁路周游券",
    desc: "Klook 出售的关西地区铁路周游券：大阪、京都、神户、奈良、姬路一带的 JR 西日本普通、快速与新快速列车不限次数乘坐，还可乘坐往返关西机场的 HARUKA。",
  }),
  withKlookLocale(jrKansaiMiniPass, LOCALE, {
    title: "JR 关西迷你铁路周游券（3 日）",
    desc: "面向不乘 HARUKA 的旅客、价格更低的 3 日券：只能乘 JR 西日本快速与普通列车，含关空快速。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "JR关西地区铁路周游券" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows, lead }: { head: string[]; rows: ReactNode[][]; lead?: { label: string; text: ReactNode } }) {
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
            {lead && (
              <tr>
                <td className={styles.tdProvider} style={{ fontWeight: 700 }}>{lead.label}</td>
                <td className={styles.tdPrice} colSpan={head.length - 1} style={{ fontSize: "0.88rem" }}>{lead.text}</td>
              </tr>
            )}
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.88rem" }}>
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

export default function ZhCnKansaiAreaPassPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);
  const [vsLead, ...vsRest] = vsWideRows;
  const [cmpLead, ...cmpRest] = compareRows;

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "WEST QR 关西地区铁路周游券（Kansai Area Pass）",
              description: DESC,
              brand: "JR West",
              currency: "JPY",
              lowPrice: 2700,
              highPrice: 6700,
              offerCount: 4,
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>1 日券与 3 日券的价格、周游券涵盖的关西机场 HARUKA 乘车范围，以及哪些情况下改买关西广域铁路周游券或 ICOCA 更合适。</p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "JR 西日本官方票价", "与关西广域周游券比较"].map((t) => (
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
            根据 JR 西日本官方 WEST QR 页面（{CHECKED}确认），<strong>JR 西日本关西地区铁路周游券</strong>成人 <strong>1 日 {QR_1_DAY}、2 日 ¥4,700、3 日 ¥5,500、4 日 {QR_4_DAY}</strong>（6 至 11 岁儿童半价）；仅通过海外旅行社销售，因此没有单独的日本国内售价。1 日券与关西机场到京都的 HARUKA 单程票同为 {QR_1_DAY}，当天再往返京都–奈良（单程 ¥720），周游券就比单独购票便宜 ¥1,440。可乘坐 <strong>京都、大阪、奈良、神户与关西机场</strong>之间的 JR 西日本列车，其中机场特急 <strong>HARUKA</strong> 自由席可不限次数乘坐，但不能乘新干线，也不能乘近铁、阪急、京阪与南海。只有计划前往冈山、城崎温泉或天桥立等比姬路更远的目的地时，才选 <strong>关西广域铁路周游券</strong>（5 天 ¥12,000）；如果只在一座城市里乘地铁，两张都不用买，改用 <strong>ICOCA</strong> 卡即可。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1 日券</p>
                <p className={styles.verdictStatValue}>{QR_1_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>4 日券</p>
                <p className={styles.verdictStatValue}>{QR_4_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>HARUKA</p>
                <p className={styles.verdictStatValue}>可乘坐（含 2 次指定席）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>新干线</p>
                <p className={styles.verdictStatValue}>不含</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>JR 西日本关西地区铁路周游券</strong>成人 <strong>1 日 {QR_1_DAY}</strong>、2 日 ¥4,700、3 日 ¥5,500、<strong>4 日 {QR_4_DAY}</strong>（6 至 11 岁儿童半价；JR 西日本 WEST QR 关西地区铁路周游券，{CHECKED}在 westjr.co.jp 确认）。可不限次数乘坐 <strong>关西机场与天王寺、新大阪、京都之间的 HARUKA</strong> 自由席（另含 2 次指定席），以及大阪、京都、神户、奈良、姬路一带的 JR 西日本新快速、快速与普通列车。新干线、其他特急、大阪地铁与京都市营地铁、市区公交，以及阪急、京阪、近铁、南海等私铁都 <strong>不能乘</strong>。最划算的情况是 <strong>抵达关西机场后前往京都</strong>：HARUKA 单程到京都也是 ¥2,700，1 日券同价，当天乘坐其他 JR 列车也无需另付车费。纸质版已于 2026 年 9 月 30 日停售。使用周游券可乘车到三宫，也适用于 <Link href="/guides/attractions/arima-onsen-day-trip" style={linkStyle}>有马温泉一日游（英文）</Link>，但从三宫前往温泉的巴士和神户市营地铁不在周游券适用范围内。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                在 Klook 查看关西地区铁路周游券 →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                改买 HARUKA 单程票 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookSameDayCards heading="可与关西地区铁路周游券一并预订的项目" cards={sameDayCards} />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>周游券与单独购票对比</span>
          <h2 className={styles.sectionTitle}>按你的行程，关西地区铁路周游券划算吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            当天乘 HARUKA 前往京都，或去较远的姬路一日游，购买周游券划算；如果当天只往返一次大阪与京都或大阪与奈良，则不划算。按 JR 西日本公布的票价，关西机场 → 京都 → 奈良 → 大阪 → 关西机场的 3 天行程，单独购票合计 ¥6,620，3 日券 ¥5,500。
          </p>
          <Table
            head={["行程", "单独购票合计（成人）", "周游券", "结果"]}
            lead={{ label: "结论", text: "抵达后先前往京都、去姬路一日游，或连续 3–4 天在多个城市之间乘车时，建议购买；只往返一次大阪–京都或大阪–奈良就不用买" }}
            rows={itineraryRows.map((r) => [r.plan, r.singles, r.pass, r.result])}
          />
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>JR 单程票要多少钱？</h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            JR 西日本在来线列车成人票价：大阪–京都 ¥580、京都–奈良 ¥720、大阪–姬路 ¥1,460；关西机场到京都的 HARUKA 单程票 ¥2,700。
          </p>
          <Table
            head={["区间", "成人单程", "能否使用关西地区铁路周游券"]}
            lead={{ label: "结论", text: "以下各区间均可使用周游券乘坐 JR 在来线列车或 HARUKA，但都不能乘新干线" }}
            rows={fareRows.map((r) => [r.route, r.fare, r.onPass])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最后确认：{CHECKED_ISO}。官方来源：<a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR 关西地区铁路周游券</a>、<a href={HARUKA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR HARUKA One-way Ticket</a>（适用于 2026 年 11 月 1 日起售出的车票）、<a href={FARE_PDF_URL} target="_blank" rel="noopener noreferrer">JR 西日本京阪神票价表（特定票价，2025 年 4 月 1 日起）</a>与 <a href={HIMEJI_FARE_URL} target="_blank" rel="noopener noreferrer">JR 西日本 2026 年 2 月 25 日新闻稿（大阪–姬路 ¥1,460）</a>。大阪站–奈良不在特定票价表中，因此前往奈良的车费以天王寺站为起点计算。票价为成人普通纸质车票价格，儿童半价。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看关西地区铁路周游券 →
            </KlookLink>
          </div>
        </section>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>关西地区铁路周游券是什么？</h2>
          <p className={styles.bodyText}>
            这是 JR 西日本各地区周游券中适用范围最小、价格最低的一款，也是大多数首次前往关西的旅客真正需要的周游券。连续 1 至 4 天内，可不限次数乘坐 JR 西日本的在来线列车（普通、快速、新快速），根据 JR 西日本的说明，适用范围涵盖 <strong>大阪、京都、神户、奈良、姬路、和歌山、大津、敦贺与伊贺上野</strong>；此外，还有普通交通 IC 卡不具备的一项权益：可不限次数乘坐关西机场特急 HARUKA 自由席，并可使用 2 次普通车厢指定席。
          </p>
          <p className={styles.bodyText}>
            2026 年有一项比价格更重要的变化。JR 西日本的页面写明，关西地区铁路周游券已于 <strong>2026 年 9 月 30 日停售</strong>，在此之前购买的票券在有效期内仍可使用。产品并没有消失，而是改为 <strong>WEST QR 关西地区铁路周游券</strong>：有效期仍为 1 至 4 天，改为在线登记后、在检票口扫描二维码使用的电子票，价格也略低。如果看到旧攻略写 1 天 ¥2,800，那是已不再适用的旧价格。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>JR关西地区铁路周游券多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人连续 1 天 {QR_1_DAY}、2 天 ¥4,700、3 天 ¥5,500、4 天 {QR_4_DAY}，6 至 11 岁儿童正好半价。JR 西日本只公布一份 WEST QR 周游券价目表，没有按销售渠道另定价格。
          </p>
          <Table
            head={["天数", "成人（WEST QR）", "儿童（6–11 岁）", "成人日均费用", "旧版纸质周游券（成人）"]}
            lead={{ label: "结论", text: `1 日券（${QR_1_DAY}）与 HARUKA 单程到京都同价；4 日券（${QR_4_DAY}）每天 ¥1,675，最便宜` }}
            rows={priceRows.map((r) => [r.days, r.qrAdult, r.qrChild, r.perDay, r.oldAdult])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最后确认：{CHECKED_ISO}。官方来源：<a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR 关西地区铁路周游券</a>。旧版一栏（JR 西日本：“2026 年 9 月 30 日停售”）仅供识别过时的价格。成人日均费用为成人售价除以有效天数。周游券按日本时间计算，自使用首日 04:00 起至最后一天 24:00 止，有效期须连续。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看关西地区铁路周游券 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            购买前，请在商品页面确认票价表中未列明的两项信息：兑换券的可兑换期限是否与你的航班日期相符，以及销售平台的退款规定。点击“Use ticket（使用车票）”之后，JR 西日本不予退款。
          </p>
          <KlookTripPrep
            label="同一趟行程一起预订"
            heading="买了关西地区铁路周游券，还要预订什么？"
            intro="周游券解决城市之间的交通；此外还需准备周游券适用的 JR 线路沿线住宿、前往奈良或姬路的带导游一日游，以及显示二维码所需的上网服务。这里不列价格，请打开各产品页查看当前价格。"
            items={lowerPrep}
          />
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>地区周游券、广域周游券与 ICOCA 对比</span>
          <h2 className={styles.sectionTitle}>关西地区铁路周游券和关西广域铁路周游券，哪一张更好？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            如果行程只在京都、大阪、奈良、神户与姬路之间，选关西地区铁路周游券：4 日券（{QR_4_DAY}）比关西广域铁路周游券 5 日券（¥12,000）便宜 ¥5,300。行程中至少有一天去较远的地方，广域周游券才划算，例如乘山阳新干线到冈山，或乘坐特急列车指定席前往城崎温泉、天桥立、白滨。ICOCA 并非周游券，而是按次扣费的交通 IC 卡，适合只待在一座城市的行程。
          </p>
          <Table
            head={["", "适用范围", "新干线", "价格（成人）", "适合谁"]}
            lead={{ label: vsLead.option, text: `${vsLead.area}／${vsLead.shinkansen}／${vsLead.price}` }}
            rows={vsRest.map((r) => [r.option, r.area, r.shinkansen, r.price, r.who])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最后确认：{CHECKED_ISO}。官方来源：<a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR 关西地区铁路周游券</a>、<a href={WIDE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，关西广域铁路周游券</a>、<a href={ICOCA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，ICOCA 说明</a>。三者的购买和领取方式不同：关西地区铁路周游券是只由海外旅行社出售的 WEST QR 兑换券，不需要换票；广域周游券可通过海外旅行社购买兑换券，或在 JR-WEST ONLINE TRAIN RESERVATION 预订后，持护照到 JR 西日本车站领取；面向访日游客发行的 ICOCA 在关西机场站的 JR 售票处购买。广域周游券自使用首日 00:00 起生效，地区周游券则自 04:00 起生效。两张都不能乘前往东京的东海道新干线。
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            无论选哪一张，是否划算都取决于一日游：<Link href="/guides/attractions/himeji-castle-day-trip" style={linkStyle}>姬路城一日游（英文）</Link>的目的地位于地区周游券适用范围的最边缘，而 <Link href="/guides/attractions/amanohashidate-ine-day-trip" style={linkStyle}>天桥立一日游（英文）</Link>则需要广域周游券。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>可乘坐与不可乘坐</span>
          <h2 className={styles.sectionTitle}>关西地区铁路周游券可以乘新干线、HARUKA 和地铁吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可以乘 HARUKA（自由席不限次数、指定席 2 次），但不能乘新干线和地铁。除 HARUKA 以外，只能乘 JR 西日本的在来线列车（新快速、快速、普通），包括 JR 京都线、神户线、奈良线、大和路线与关西机场线；其他特急、公交与私铁都不能乘。是否值得买这张周游券，往往取决于哪些交通无法使用，而不是哪些可以使用。
          </p>
          <Table head={["交通工具", "是否适用", "具体说明"]} lead={{ label: "结论", text: LINES_LEAD }} rows={lineRows.map((r) => [r.service, r.allowed, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            最后确认：{CHECKED_ISO}。官方来源：<a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR 关西地区铁路周游券</a>（可乘车种一览）。周游券不含的市内交通，请看 <Link href="/guides/transport/osaka-transportation" style={linkStyle}>大阪交通攻略（英文）</Link>与 <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>京都交通攻略（英文）</Link>，两篇攻略均介绍了仍需另外付费的地铁、公交及可选的 <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>交通 IC 卡（英文）</Link>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>从机场出发</span>
          <h2 className={styles.sectionTitle}>从关西机场乘 HARUKA 时，关西地区铁路周游券怎么用？</h2>
          <p className={styles.bodyText}>在 JR 检票口扫描二维码后，即可乘坐任意一班 HARUKA：关西机场与天王寺、新大阪、京都之间的自由席不限次数，另含 2 次普通车厢指定席（绿色车厢需加价）。</p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>关西地区铁路周游券可以乘新干线吗？</h3>
          <p className={styles.bodyText}>不可以。JR 西日本说明这张周游券“即使支付追加费用，也不能乘坐新干线”。可乘坐新干线的关西周游券是关西广域铁路周游券，可乘新大阪与冈山之间的山阳新干线指定席。</p>
          <p className={styles.bodyText}>
            抵达当天 04:00 以后点击“Use ticket（使用车票）”，在关西机场的 JR 检票口扫描二维码，乘 HARUKA 前往 <strong>天王寺</strong>、<strong>新大阪</strong>或 <strong>京都</strong>。即使在周游券有效的日子，新大阪到京都乘新干线也要另外买票；如果行程有前往广岛的新干线路段，含新干线的是 <Link href="/guides/transport/kansai-hiroshima-area-pass" style={linkStyle}>关西&广岛地区铁路周游券（英文）</Link>，两张周游券的区别在于能否去广岛。
          </p>
          <p className={styles.bodyText}>
            2 次指定席适合在携带行李箱出行时使用。根据 JR 西日本说明，指定席可自乘车日前 30 天起通过 WEST-QR 网站预约，无法在车上、售票机或车站售票处预约，请在出发前先订好。{CHECKED}确认。
          </p>
          <p className={styles.bodyText}>
            如果目的地是难波和道顿堀一带，HARUKA 并不合适：前往该区域的南海电铁不在周游券适用范围内。<Link href="/guides/transport/haruka-vs-nankai-rapit" style={linkStyle}>HARUKA 与南海 Rapi:t 比较（英文）</Link>按目的地而非票价比较这两种列车，<Link href="/guides/transport/osaka-airport-transfer" style={linkStyle}>大阪机场交通攻略（英文）</Link>也涵盖伊丹机场。简单来说，这张周游券是否适合用于机场交通，取决于你的住宿地点。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              含 HARUKA 的关西地区铁路周游券 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              HARUKA 单程票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比较</span>
          <h2 className={styles.sectionTitle}>还有哪些关西周游券可以替代关西地区铁路周游券？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            如果行程仅限关西、主要乘坐 JR 与 HARUKA，就买关西地区铁路周游券。近铁周游券适合乘近铁去奈良，关西&广岛地区铁路周游券适合乘坐新干线向西出行，KANSAI ONE PASS 则是 IC 卡，不是周游券。
          </p>
          <Table
            head={["选项", "价格（成人）", "涵盖范围", "什么时候选"]}
            lead={{ label: cmpLead.option, text: `${cmpLead.covers}。${cmpLead.pick}` }}
            rows={cmpRest.map((r) => [r.option, r.price, r.covers, r.pick])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最后确认：JR 西日本关西地区、HARUKA 单程票、关西迷你与关西广域铁路周游券页面（westjr.co.jp）以及 KANSAI ONE PASS 公告为 {CHECKED_ISO}；关西&广岛页面与近铁（kintetsu.co.jp/foreign/english/ticket/）为{R04_CHECKED}；全国版 JR Pass（japanrailpass.net）与大阪周游卡官网为{PREV_CHECKED}。如果奈良是主要的一日游，<Link href="/guides/transport/kintetsu-rail-pass" style={linkStyle}>近铁周游券攻略（英文）</Link>对比了近铁周游券在哪些行程下比单独购票划算；在大阪市内游玩一天，<Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>大阪周游卡攻略（英文）</Link>介绍了关西地区铁路周游券无法替代的城市周游卡。去城崎温泉的话，关西地区铁路周游券不能乘特急 KONOTORI（东方白鹳号），广域周游券则含其指定席；<Link href="/guides/attractions/kinosaki-onsen-day-trip" style={linkStyle}>城崎温泉一日游攻略（英文）</Link>整理了从大阪出发的 KONOTORI 时刻。HARUKA 单程票是面向以短期滞在身份入境的外国护照持有人的优惠单程票；上表票价适用于 2026 年 11 月 1 日 JR 西日本上调票价后售出的车票，京都单程现在与 1 日券同价。全国版周游券是否划算请看 <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>JR Pass 攻略（英文）</Link>；从东京出发、经金泽前往关西的环线行程，<Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>北陆拱型铁路周游券（英文）</Link> 7 日券可乘北陆新干线，也可乘 Thunderbird 与 HARUKA；关西地区铁路周游券和关西广域铁路周游券都到不了的广岛，<Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={linkStyle}>大阪到广岛新干线攻略（英文）</Link>比较了 JR 西日本关西&广岛地区铁路周游券与单程票。ICOCA &amp; HARUKA 未列入：核查时 JR 西日本的英文页面未标明价格。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>划算吗</span>
          <h2 className={styles.sectionTitle}>去京都和大阪，买关西地区铁路周游券划算吗？</h2>
          <p className={styles.bodyText}>
            从关西机场入境、在京都与大阪之间乘 JR 移动的话划算；只待在一座城市乘地铁的话不划算。1 天的例子（关西机场到京都）：HARUKA 单程 ¥2,700，与 1 日券同价。3 天行程示例（抵达后前往京都，从大阪返回机场）：两张单程票合计 ¥4,600，3 日券 ¥5,500，期间其他 JR 车费累计达到 ¥900 就划算。
          </p>
          <div style={{ marginBottom: "1rem" }}>
            <Table
              head={["行程", "HARUKA 单程票合计", "相同天数的周游券价格", "结果"]}
              lead={{ label: "结论", text: "抵达后先前往京都，或往返机场的日期都在有效期内时建议购买；如果只有机场到天王寺或大阪这一段乘 JR，就不用买" }}
              rows={breakEvenRows.map((r) => [r.trip, r.singles, r.pass, r.result])}
            />
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最后确认：{CHECKED_ISO}。官方来源：<a href={HARUKA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR 西日本，WEST QR HARUKA One-way Ticket</a>（2026 年 11 月 1 日起售出车票的成人票价）与 <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">WEST QR 关西地区铁路周游券</a>。单程票仅限单向，往返需购买两张；周游券只有在往返机场的日期都在周游券的连续有效期内时才包含回程。京都–大阪、天王寺–奈良、大阪–姬路等城市间的 JR 票价，见上方“JR 单程票要多少钱？”的票价表。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              周游券划算：查看关西地区铁路周游券 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              单程票更便宜：查看 HARUKA 车票 →
            </KlookLink>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Table head={["你的行程", "建议", "原因"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            有两项信息无法从公开票价表中确认，请在产品页确认：你的旅行日期出售的是哪一种版本（二维码，或在日本兑换的兑换券），以及取消规定；周游券只能在你指定的连续日期使用，所以取消规定很重要。兑换券通常设有可兑换期限，而非指定某个固定日期，购买前请确认该期限与你的航班相符。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看关西地区铁路周游券 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              比较 HARUKA 单程票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>划算的行程</span>
          <h2 className={styles.sectionTitle}>哪些行程能让周游券物有所值？</h2>
          <p className={styles.bodyText}>
            游客应以优惠的 <strong>HARUKA 单程票</strong>而非普通车费作为比较基准，这是 JR 西日本面向外国护照持有人销售的价格最低的官方机场单程票。<strong>2026 年 11 月 1 日</strong>起售出的票价为：天王寺 ¥1,600、大阪或新大阪 ¥1,900、京都 ¥2,700、神户 ¥2,300、奈良 ¥2,200。周游券的价格低于这些车费合计才划算。
          </p>
          <p className={styles.bodyText}>
            <strong>抵达后先前往京都，1 日券（{QR_1_DAY}）。</strong>京都单程 ¥2,700，正好等于周游券价格。与单独买机场车票相比无需多花钱，当天乘坐其他 JR 列车，包括京都–奈良或京都–大阪区间，也无需另付车费。
          </p>
          <p className={styles.bodyText}>
            <strong>关西 4 天，4 日券（{QR_4_DAY}）。</strong>从关西机场入境并从关西机场出境：关西机场到京都 ¥2,700、从大阪前往关西机场 ¥1,900，仅往返机场两段车费就相当于周游券 {QR_4_DAY} 中的 ¥4,600。剩余 ¥2,100 需由 4 天内城市间的 JR 车费补足，例如京都到奈良、大阪到神户、大阪到姬路；如果这些行程都乘 JR，车费很容易超过这一金额。但如果这几天都只在同一座城市乘地铁，就 <em>补不回差价</em>，因为这些都不在周游券范围内。只在大阪市内游玩的那一天，<Link href="/guides/transport/osaka-metro-pass" style={linkStyle}>大阪地铁一日券（Enjoy Eco Card）（英文）</Link>可在一个自然日内乘坐地铁与市区公交。5 天行程中有一天待在大阪时，最后 3 天用 3 日券比 4 日券便宜，每天的车费计算请看 <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>关西 5 天行程（英文）</Link>。
          </p>
          <p className={styles.bodyText}>
            <strong>不划算的情况。</strong>周游券有效期内有一天不乘车、乘近铁去奈良且乘阪急去岚山，或行程中有前往东京的新干线路段。这三种情况下购买周游券都不划算。车费于{CHECKED}确认。如果只想安排一天，<Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" style={linkStyle}>大阪出发京都奈良一日游（英文）</Link>含巴士接送，那一天就不需要铁路周游券。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>不是同一种产品</span>
          <h2 className={styles.sectionTitle}>KANSAI ONE PASS 停售了吗？</h2>
          <p className={styles.bodyText}>
            是的，正在逐步停售，而且它一直都不是 JR 铁路周游券。KANSAI ONE PASS 是面向游客的可充值交通 IC 卡。在 2024 年 12 月 23 日的联合公告中，JR 西日本、阪急、近铁、京阪、南海、阪神、大阪地铁、大阪市巴士，以及京都市与神户市交通局表示，自 2025 年 11 月 1 日起，各公司及交通机构在库存售罄后停止销售，并于 2026 财年结束前（2027 年 3 月）全面停售。
          </p>
          <p className={styles.bodyText}>
            同一份公告说明，已购买的卡片仍可作为充值式 IC 卡继续使用，商店及景点优惠则于 2026 财年末终止。公告未公布后续替代卡，并将面向游客的 KANSAI MaaS 电子票等服务的普及列为停售原因。这张卡从来不能替代关西地区铁路周游券：IC 卡按次支付车费，而周游券在适用范围内无需另付车费。如果按次付费，ICOCA 也能做到。
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            最后确认：{CHECKED_ISO}。官方来源：<a href={KOP_NOTICE_URL} target="_blank" rel="noopener noreferrer">2024 年 12 月 23 日联合公告（JR 西日本、阪急、近铁、京阪、南海、阪神、大阪地铁等，hanshin.co.jp）</a>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>购买方式</span>
          <h2 className={styles.sectionTitle}>关西地区铁路周游券在哪里买、如何使用？</h2>
          <p className={styles.bodyText}>
            出发前向海外旅行社购买 WEST-QR 兑换券即可，到日本后不需要兑换。JR 西日本说明这张周游券无法在日本国内旅行社或 JR-WEST ONLINE TRAIN RESERVATION 购买，JR 车站也不出售。
          </p>
          <ol className={styles.bodyText} style={{ paddingLeft: "1.25rem" }}>
            <li>通过 Klook 等海外旅行社购买兑换券。</li>
            <li>在兑换券上注明的 WEST-QR 网站登记兑换券信息。</li>
            <li>自乘车日前 30 天起，可在同一网站预约 2 次 HARUKA 指定席。</li>
            <li>第一天 04:00 以后点击“Use ticket（使用车票）”，在检票口扫描二维码。</li>
          </ol>
          <p className={styles.bodyText}>
            如需在点击“Use ticket”之前变更或退款，请联系购买周游券的旅行社，旅行社可能另收手续费；点击“Use ticket”之后，即使列车延误或停运，JR 西日本也不予退款。需要能上网的智能手机（也可以用同行者的手机显示二维码）。购买者须持外国政府签发的护照，并以“短期滞在”资格入境，日本国籍者不能使用。2026 年 9 月 30 日前出售的旧版纸质周游券，才需要到 JR 西日本车站兑换实体周游券。{CHECKED}在 <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">westjr.co.jp</a> 确认。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              购买关西地区铁路周游券兑换券 →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="JR关西地区铁路周游券常见问题" />

        <KlookTourPicks
          heading="两款关西铁路周游券对比"
          intro="两款产品都是上文介绍的 JR 西日本周游券，支持在简体中文页面付款。地区周游券可乘 HARUKA；迷你周游券价格更低，但不能乘 HARUKA。请打开产品页查看你出行日期的当前价格。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/kinosaki-onsen-day-trip", title: "城崎温泉一日游（2026）：大阪出发、外汤券与旅馆（英文）" },
            { href: "/guides/attractions/kumano-kodo-tour", title: "熊野古道行程（2026）：一日游、中边路与步行距离（英文）" },
            { href: "/guides/attractions/amanohashidate-ine-day-trip", title: "天桥立一日游（2026）：伊根舟屋、行程与京都出发列车（英文）" },
            { href: "/guides/attractions/hiroshima-peace-memorial-tours", title: "广岛和平纪念公园行程：导览、资料馆与门票（英文）" },
            { href: "/guides/transport/kintetsu-rail-pass", title: "近铁周游券（2026）：价格与是否划算（英文）" },
            { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "大阪、京都 3 天行程（2026）：逐日安排与预订（英文）" },
            { href: "/guides/attractions/himeji-castle-day-trip", title: "姬路城一日游（2026）：门票 ¥2,500 与开放时间（英文）" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "大阪出发京都奈良一日游（2026）：该订哪一个（英文）" },
            { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "大阪出发神户一日游（2026）：交通路线、神户牛肉与一日安排（英文）" },
            { href: "/guides/transport/haruka-vs-nankai-rapit", title: "HARUKA 与南海 Rapi:t 比较（2026）：关西机场交通的最佳列车（英文）" },
            { href: "/guides/transport/osaka-airport-transfer", title: "大阪机场交通攻略（2026）：从关西机场与伊丹机场前往市区（英文）" },
            { href: "/guides/transport/kyoto-transportation", title: "京都交通攻略（2026）：公交、电车与出租车（英文）" },
            { href: "/guides/transport/osaka-transportation", title: "大阪交通攻略（2026）：地铁、电车与 IC 卡（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略 2026：价格、是否划算与购买方式（英文）" },
            { href: "/guides/transport/osaka-metro-pass", title: "大阪地铁一日券与 Enjoy Eco Card（2026）：该买哪一张（英文）" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周游卡 2026：¥3,500 是否划算及一日行程（英文）" },
            { href: "/guides/attractions/nara-day-trip", title: "奈良一日游（2026）：大阪或京都出发与东大寺门票（英文）" },
            { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "广岛宫岛一日游（2026）：一天够吗（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪必去景点（2026）：使用周游卡划算与不划算的景点（英文）" },
            { href: "/zh-cn/guides/attractions", title: "更多日本景点门票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>不只往返机场，还能在关西各地乘坐 JR</h2>
            <p className={styles.ctaBannerDesc}>1 至 4 天内乘坐大阪、京都、神户、奈良、姬路一带的 JR 西日本列车，还可乘坐往返关西机场的 HARUKA。如果整个行程只有机场交通乘坐 JR，请改买单程票。</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看关西地区铁路周游券 →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 HARUKA 车票 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
