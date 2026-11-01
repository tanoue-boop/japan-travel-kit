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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import {
  hanedaLimousineBus,
  keiseiSkylinerUrl,
  naritaBusSubwayCombo,
  naritaExpressRoundTripUrl,
  naritaLimousineBus,
  tokyoAirportStayAreas,
  tokyoAirportTripPrep,
  tokyoPrivateAirportTransfer,
  tokyoSharedAirportTransfer,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

/**
 * 東京機場交通（繁體中文版）— mirrors pages/guides/transport/tokyo-airport-transfer.tsx
 * section by section as of 2026-11-01: same sections, tables, Klook CTAs and
 * components in the same order. Every fare, time and date is the English page's;
 * no figure was added in translation.
 */

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/transport/tokyo-airport-transfer";
const TITLE = "成田機場到東京交通（2026）：Skyliner、N'EX 與巴士";
const DESC =
  "成田機場到東京怎麼走，羽田機場也一起比較：電車、巴士與計程車的價格、時間與方便度，附 2026 年車資。與英文版同一組數字。";

/** The day the operators' fares, times and frequencies were read. */
const CHECKED = dateLabel("2026-10-25", LOCALE);
/** The day the taxi flat fares and the Skyliner first/last departures were read. */
const CHECKED_TAXI = dateLabel("2026-10-28", LOCALE);

// Klook — the same products as the English page, on the zh-TW locale path.
const skylinerUrl = klookFor(keiseiSkylinerUrl, LOCALE);
const nexRoundTripUrl = klookFor(naritaExpressRoundTripUrl, LOCALE);
const naritaBusUrl = klookFor(naritaLimousineBus.url, LOCALE);
const hanedaBusUrl = klookFor(hanedaLimousineBus.url, LOCALE);
const privateTransferUrl = klookFor(tokyoPrivateAirportTransfer.url, LOCALE);
const sharedTransferUrl = klookFor(tokyoSharedAirportTransfer.url, LOCALE);
const busSubwayComboUrl = klookFor(naritaBusSubwayCombo.url, LOCALE);

const stayAreas = [
  withKlookLocale(tokyoAirportStayAreas[0], LOCALE, {
    area: "東京車站／丸之內",
    why: "N'EX 從成田約 60 分鐘直達這裡，不用換車。",
  }),
  withKlookLocale(tokyoAirportStayAreas[1], LOCALE, {
    area: "新宿",
    why: "N'EX 直達停靠站（從成田約 90 分鐘），也是利木津巴士的停靠站；從羽田搭京急線轉一次車大約 37 分鐘。",
  }),
  withKlookLocale(tokyoAirportStayAreas[2], LOCALE, {
    area: "上野／淺草",
    why: "京成 Skyliner 41 分鐘到日暮里、約 44 分鐘到京成上野，是從成田抵達最快的一側。",
  }),
];

const tripPrep = [
  withKlookLocale(tokyoAirportTripPrep[0], LOCALE, {
    label: "Klook 日本 eSIM",
    why: "月台、巴士乘車處與飯店 check-in，在你通關時網路就已經能用的話都會順很多，不必先去排 SIM 卡櫃台。",
    ctaLabel: "在 Klook 查看 eSIM 方案 →",
  }),
  withKlookLocale(tokyoAirportTripPrep[1], LOCALE, {
    label: "東京地鐵通票（24／48／72 小時）",
    why: "上面任何一張機場票都不涵蓋你進城之後的移動；地鐵通票涵蓋，東京地下鐵與都營全線、24、48 或 72 小時。",
    ctaLabel: "查看地鐵通票 →",
  }),
];

// ---------------------------------------------------------------------------
// The two master tables: every option, with the figure and the operator.
// ---------------------------------------------------------------------------

const naritaMasterRows = [
  {
    option: "京成 Skyliner",
    time: "到京成上野 41 分鐘",
    fare: "¥2,580（IC ¥2,567）",
    often: "每小時 3 班",
    lands: "日暮里、京成上野",
    source: "京成",
  },
  {
    option: "成田特快 N'EX",
    time: "到東京車站最快 53 分鐘",
    fare: "東京 ¥3,140；品川／澀谷／新宿 ¥3,330；橫濱 ¥4,480",
    often: "每 30 分鐘",
    lands: "東京、品川、澀谷、新宿、橫濱",
    source: "JR 東日本",
  },
  {
    option: "京成 Access 特急",
    time: "到淺草 50 分鐘",
    fare: "到日暮里／京成上野 ¥1,280（IC ¥1,267）",
    often: "未公布具體數字",
    lands: "日暮里、上野、押上、淺草、日本橋、品川",
    source: "京成",
  },
  {
    option: "京成本線特急",
    time: "未公布具體數字",
    fare: "到京成上野 ¥1,060（IC ¥1,052）",
    often: "未公布具體數字",
    lands: "船橋、日暮里、京成上野",
    source: "京成",
  },
  {
    option: "機場利木津巴士",
    time: "公布的東京車站時刻表為 1 小時 50 分",
    fare: "東京車站／T-CAT ¥3,100；新宿或澀谷 ¥3,600；迪士尼度假區 ¥2,900",
    often: "依路線而定——請見巴士指南",
    lands: "飯店與車站停靠站，不用換車",
    source: "利木津巴士",
  },
  {
    option: "定額計程車",
    time: "視路況而定，未公布數字",
    fare: "依區域 ¥23,500～¥38,500，高速公路過路費另計",
    often: "隨叫隨走",
    lands: "你的飯店地址",
    source: "成田機場",
  },
];

const hanedaMasterRows = [
  {
    option: "京急機場線",
    time: "第 3 航廈到品川 11 分鐘（第 1·2 航廈 14 分鐘）",
    fare: "到品川 ¥330（IC ¥327）",
    often: "隨到隨搭",
    lands: "品川，並直通新橋、銀座、淺草",
    source: "京急",
  },
  {
    option: "東京單軌電車",
    time: "到濱松町 13 分鐘",
    fare: "大人 ¥520、兒童 ¥260",
    often: "約每 5 分鐘",
    lands: "濱松町，可轉山手線",
    source: "東京單軌電車",
  },
  {
    option: "機場利木津巴士",
    time: "視路況而定，依路線",
    fare: "東京車站 ¥1,200；澀谷 ¥1,300；新宿／中野 ¥1,400",
    often: "依路線而定——請見巴士指南",
    lands: "飯店與車站停靠站，不用換車",
    source: "利木津巴士",
  },
  {
    option: "深夜／清晨接駁巴士",
    time: "視路況而定，依路線",
    fare: "新宿／池袋 ¥2,800；東京／銀座／淺草／秋葉原 ¥1,900",
    often: "機場發車 00:00～02:00",
    lands: "只停少數指定的市區站點",
    source: "利木津巴士",
  },
  {
    option: "定額計程車",
    time: "視路況而定，未公布數字",
    fare: "機場確認有定額制度，但未公布金額",
    often: "隨叫隨走",
    lands: "你的飯店地址",
    source: "羽田機場",
  },
];

/** Keikyu's own estimated travel times from Haneda. */
const keikyuTimeRows = [
  { dest: "品川", t3: "11 分鐘", t12: "14 分鐘" },
  { dest: "東京", t3: "20 分鐘", t12: "23 分鐘" },
  { dest: "新橋", t3: "21 分鐘", t12: "24 分鐘" },
  { dest: "東銀座", t3: "23 分鐘", t12: "26 分鐘" },
  { dest: "澀谷", t3: "23 分鐘", t12: "26 分鐘" },
  { dest: "橫濱", t3: "23 分鐘", t12: "28 分鐘" },
  { dest: "新宿", t3: "30 分鐘", t12: "33 分鐘" },
  { dest: "淺草", t3: "34 分鐘", t12: "37 分鐘" },
  { dest: "池袋", t3: "38 分鐘", t12: "41 分鐘" },
];

/** What is actually worth buying before you fly, and what it costs if you do. */
const prebuyRows = [
  {
    item: "Skyliner 優惠票",
    price: "單程 ¥2,310、來回 ¥4,500（原價 ¥2,580／¥5,160）",
    collect: "電子票，或在第 1 航廈與第 2·3 航廈的 Skyliner 櫃台兌換",
    worth: "值得——同一班車，每趟便宜 ¥270",
  },
  {
    item: "京成 Skyliner ＋東京地鐵通票",
    price: "單程搭配 24／48／72 小時地鐵通票 ¥2,840／¥3,240／¥3,540；來回 ¥4,780／¥5,180／¥5,480",
    collect: "成田機場櫃台，或 Skyliner 電子票網站",
    worth: "值得，如果你在東京的日子主要靠地鐵移動",
  },
  {
    item: "N'EX 東京來回車票",
    price: "大人 ¥5,200、兒童 ¥2,600，效期 14 天",
    collect: "只能在成田機場第 1 航廈或第 2·3 航廈站出示護照領取",
    worth: "值得，如果回程也從成田飛——到新宿兩張單程要 ¥6,660",
  },
  {
    item: "單軌電車＆山手線優惠票",
    price: "大人 ¥590、兒童 ¥290（原價 ¥680～¥870）",
    collect: "羽田三個單軌電車站的售票機",
    worth: "只限販售日——週六、週日、假日與指定期間",
  },
  {
    item: "利木津巴士＋東京地鐵通票",
    price: "成田 ¥4,200（1 趟＋24 小時）到 ¥8,000（2 趟＋72 小時）；羽田 ¥2,300 到 ¥4,600",
    collect: "QR code 或兌換券，在巴士櫃台兌換",
    worth: "值得，如果有託運行李、行程又以地鐵為主",
  },
  {
    item: "京急羽得票（Hanetoku）＆東京地鐵通票",
    price: "搭配 24／48／72 小時通票 ¥1,600／¥2,100／¥2,600",
    collect: "羽田機場不販售——要透過 ANA、JAL MaaS 或晴空塔套票購買",
    worth: "只有在出發前就能買到時才划算；涵蓋第 1·2 航廈到泉岳寺",
  },
];

/** The late-arrival and pre-dawn-departure figures, which is where plans break. */
const nightRows = [
  {
    item: "京急末班車，羽田第 3 航廈 → 品川",
    detail: "00:08 發車、00:20 抵達，平日與週末相同",
    source: "京急",
    checked: CHECKED,
  },
  {
    item: "京急首班車，羽田第 3 航廈 → 品川",
    detail: "05:26 發車、05:46 抵達",
    source: "京急",
    checked: CHECKED,
  },
  {
    item: "從品川回羽田的末班車",
    detail: "平日 23:59（00:23 抵達）；週末 23:45，需在京急蒲田轉車",
    source: "京急",
    checked: CHECKED,
  },
  {
    item: "羽田深夜接駁巴士",
    detail: "00:00 到 02:00 之間從機場發車；新宿或池袋 ¥2,800，東京、銀座、淺草或秋葉原 ¥1,900",
    source: "利木津巴士",
    checked: CHECKED,
  },
  {
    item: "羽田清晨接駁巴士",
    detail: "約 04:00 起從市區開往第 3 航廈——池袋 03:35 發車、東新宿 03:50、新宿高速巴士總站（Busta 新宿）04:00",
    source: "利木津巴士",
    checked: CHECKED,
  },
  {
    item: "成田 Skyliner 末班車，平日",
    detail: "Skyliner 188 號 23:00 從成田機場站、23:03 從第 2·3 航廈站發車，23:43 抵達日暮里、23:48 抵達京成上野",
    source: "京成",
    checked: CHECKED_TAXI,
  },
  {
    item: "成田 Skyliner 末班車，週末與假日",
    detail: "Skyliner 186 號 22:40 從成田機場站、22:43 從第 2·3 航廈站發車，23:23 抵達日暮里、23:28 抵達京成上野",
    source: "京成",
    checked: CHECKED_TAXI,
  },
  {
    item: "成田 Skyliner 首班車",
    detail: "Skyliner 2 號 07:23 從成田機場站、07:27 從第 2·3 航廈站發車，08:23 抵達日暮里、08:29 抵達京成上野",
    source: "京成",
    checked: CHECKED_TAXI,
  },
];

/** Every option from both airports in one table. */
const allOptionRows = [
  { airport: "成田", option: "京成 Access 特急", time: "到淺草 50 分鐘", fare: "到日暮里／京成上野 ¥1,280", source: "京成", taxi: false },
  { airport: "成田", option: "京成本線特急", time: "未公布具體數字", fare: "到京成上野 ¥1,060", source: "京成", taxi: false },
  { airport: "成田", option: "京成 Skyliner", time: "到京成上野 41 分鐘", fare: "¥2,580（IC ¥2,567）", source: "京成", taxi: false },
  { airport: "成田", option: "機場利木津巴士", time: "到東京車站 1 小時 50 分", fare: "東京車站 ¥3,100；新宿或澀谷 ¥3,600", source: "利木津巴士", taxi: false },
  { airport: "成田", option: "成田特快 N'EX", time: "到東京車站最快 53 分鐘", fare: "東京 ¥3,140；品川／澀谷／新宿 ¥3,330", source: "JR 東日本", taxi: false },
  { airport: "成田", option: "定額計程車", time: "視路況而定，未公布數字", fare: "依區域 ¥23,500～¥38,500，高速公路過路費另計", source: "成田機場", taxi: true },
  { airport: "羽田", option: "京急機場線", time: "到品川 11 分鐘（第 3 航廈）", fare: "到品川 ¥330（IC ¥327）", source: "京急", taxi: false },
  { airport: "羽田", option: "東京單軌電車", time: "到濱松町 13 分鐘", fare: "大人 ¥520、兒童 ¥260", source: "東京單軌電車", taxi: false },
  { airport: "羽田", option: "機場利木津巴士", time: "視路況而定，依路線", fare: "東京車站 ¥1,200；新宿 ¥1,400", source: "利木津巴士", taxi: false },
  { airport: "羽田", option: "深夜接駁巴士", time: "機場發車 00:00～02:00", fare: "東京／銀座／淺草 ¥1,900；新宿／池袋 ¥2,800", source: "利木津巴士", taxi: false },
  { airport: "羽田", option: "定額計程車", time: "視路況而定，未公布數字", fare: "確認有定額制度，未公布金額", source: "羽田機場", taxi: true },
];

/** Hotel area against airport — fastest, cheapest, and whether anything arrives without a transfer. */
const areaRows = [
  {
    area: "新宿",
    naritaFast: "N'EX 直達，¥3,330",
    naritaCheap: "Access 特急到日暮里 ¥1,280，再轉山手線",
    hanedaFast: "京急，第 3 航廈 30 分鐘（第 1·2 航廈 33 分鐘），轉一次車",
    direct: "成田搭 N'EX；兩座機場都有利木津巴士（¥3,600／¥1,400）",
  },
  {
    area: "澀谷",
    naritaFast: "N'EX 直達，¥3,330",
    naritaCheap: "Access 特急到日暮里 ¥1,280，再轉山手線",
    hanedaFast: "京急，第 3 航廈 23 分鐘（第 1·2 航廈 26 分鐘）",
    direct: "成田搭 N'EX；兩座機場都有利木津巴士（¥3,600／¥1,300）",
  },
  {
    area: "東京車站／丸之內",
    naritaFast: "N'EX，最快 53 分鐘，¥3,140",
    naritaCheap: "Access 特急到日暮里 ¥1,280，再轉山手線",
    hanedaFast: "京急，第 3 航廈 20 分鐘；或單軌電車 ¥520、13 分鐘到濱松町",
    direct: "成田搭 N'EX；兩座機場都有利木津巴士（¥3,100／¥1,200）",
  },
  {
    area: "上野／淺草",
    naritaFast: "Skyliner，41 分鐘到京成上野，¥2,580",
    naritaCheap: "京成本線特急到京成上野 ¥1,060",
    hanedaFast: "京急，第 3 航廈到淺草 34 分鐘，不用換車",
    direct: "兩邊都可以——成田搭 Skyliner 或 Access 特急，羽田搭京急直通淺草",
  },
  {
    area: "銀座",
    naritaFast: "N'EX 到東京車站 ¥3,140，再搭一站地下鐵",
    naritaCheap: "Access 特急直通東銀座，不用換車",
    hanedaFast: "京急，第 3 航廈到東銀座 23 分鐘",
    direct: "成田搭 Access 特急；羽田搭京急",
  },
];

/** Narita Airport's own six-zone flat taxi fare. Tolls are charged on top of every figure. */
const naritaTaxiRows = [
  { zone: "A", wards: "江戶川區、葛飾區、足立區", keiyo: "¥23,500", bay: "¥26,500" },
  { zone: "B", wards: "江東區、墨田區、港區（台場）、品川區（東八潮）", keiyo: "¥28,000", bay: "¥28,000" },
  { zone: "C", wards: "中央區、千代田區、台東區、文京區、荒川區", keiyo: "¥29,000", bay: "¥31,000" },
  { zone: "D", wards: "新宿區、豐島區、中野區、澀谷區、目黑區、港區、品川區、大田區", keiyo: "¥31,500", bay: "¥32,500" },
  { zone: "E", wards: "板橋區、北區、練馬區", keiyo: "¥34,000", bay: "¥36,000" },
  { zone: "F", wards: "世田谷區、杉並區、三鷹市、武藏野市", keiyo: "¥35,500", bay: "¥38,500" },
];

/** The per-person arithmetic — published one-way fares multiplied out, nothing new. */
const familyRows = [
  {
    option: "京成 Access 特急＋山手線",
    route: "成田 → 日暮里 → 新宿",
    four: "¥5,120，另加山手線那一段",
    each: "¥1,280",
    kids: "此路線未公布兒童票價",
  },
  {
    option: "京成 Skyliner＋山手線",
    route: "成田 → 日暮里 → 新宿",
    four: "¥10,320，另加山手線那一段",
    each: "¥2,580",
    kids: "兒童 ¥1,290，所以兩大兩小是 ¥7,740",
  },
  {
    option: "成田特快 N'EX",
    route: "成田 → 新宿，直達",
    four: "¥13,320",
    each: "¥3,330",
    kids: "來回車票兒童 ¥2,600、大人 ¥5,200",
  },
  {
    option: "機場利木津巴士",
    route: "成田 → 新宿，直達，行李放車底",
    four: "¥14,400",
    each: "¥3,600",
    kids: "成田路線未公布兒童票價",
  },
  {
    option: "定額計程車，D 區",
    route: "成田 → 新宿，門到門",
    four: "¥31,500～¥32,500＋過路費",
    each: "¥7,875～¥8,125＋過路費",
    kids: "同一個價——計價的是車，不是座位",
  },
  {
    option: "京急機場線",
    route: "羽田 → 品川，再轉一次車",
    four: "機場這一段 ¥1,320",
    each: "¥330",
    kids: "所查頁面未公布兒童票價",
  },
  {
    option: "機場利木津巴士",
    route: "羽田 → 新宿，直達",
    four: "¥5,600",
    each: "¥1,400",
    kids: "兒童 ¥700，所以兩大兩小是 ¥4,200",
  },
  {
    option: "東京單軌電車",
    route: "羽田 → 濱松町，再轉山手線",
    four: "機場這一段 ¥2,080",
    each: "¥520",
    kids: "兒童 ¥260，所以兩大兩小是 ¥1,560",
  },
];

const nexGuidePoints = [
  {
    title: "JR Pass 可以搭",
    desc: "N'EX 是 JR 的列車，所以持 JR Pass 免費搭乘，指定席也包含在內。如果你持有 7 日或 14 日周遊券，這就是從成田出發第一天最明顯的選擇。請在機場的 JR 售票處（綠色窗口）劃位。",
  },
  {
    title: "直達主要車站",
    desc: "N'EX 不用換車就能直達東京、品川、澀谷、新宿、池袋與橫濱。住在東京西側、又拖著行李的人，方便度上很難被超越。",
  },
  {
    title: "持外國護照者的來回車票",
    desc: `JR 東日本販售 N'EX 東京來回車票，大人 ¥5,200、兒童 ¥2,600，效期 14 天，可搭去程與回程各一次普通車指定席。到新宿兩張單程要 ¥6,660，所以省下 ¥1,460。只能在成田機場第 1 航廈或第 2·3 航廈站，出示非日本護照領取。查詢於 ${CHECKED}。`,
  },
  {
    title: "每 30 分鐘一班，車資隨季節浮動",
    desc: `JR 東日本表示，往東京、新宿與橫濱的列車一天中大部分時段每 30 分鐘一班；車資中的指定席部分淡季便宜 ¥200、旺季貴 ¥200。所以 ¥3,140 與 ¥3,330 是平常期的數字。查詢於 ${CHECKED}。`,
  },
];

const skylinerPoints = [
  {
    title: "京成進城最快的列車",
    desc: `京成公布 Skyliner 從成田機場第 2·3 航廈到上野 41 分鐘，並形容到東京市中心「最快只要 36 分鐘」。從日暮里轉一小段 JR 或地下鐵，就能到東京大部分區域。查詢於 ${CHECKED}。`,
  },
  {
    title: "¥2,580，分成兩部分",
    desc: `車資是 ¥1,280 的乘車券加 ¥1,300 的 Liner 券——合計 ¥2,580；乘車券部分用 IC 卡付的話是 ¥2,567。兒童 ¥1,290。京成的英文票價表仍寫著舊的 ¥2,470；它的日文車票頁與官方 FAQ 都寫 ¥2,580，本頁採用後者。查詢於 ${CHECKED}。`,
  },
  {
    title: "JR Pass 不能搭",
    desc: "Skyliner 屬於京成電鐵這家民營鐵路，不是 JR。持 JR Pass 不能搭。京成另有 Skyliner ＋東京地鐵 24／48／72 小時的組合票，如果你打算靠地下鐵逛東京，這個更划算。",
  },
  {
    title: "每小時 3 班，事先買還更便宜",
    desc: `京成表示 Skyliner 每小時 3 班。它自家的優惠票單程 ¥2,310、來回 ¥4,500，櫃台原價則是 ¥2,580 與 ¥5,160；可以買電子票，或在機場 Skyliner 櫃台兌換。查詢於 ${CHECKED}。`,
  },
  {
    title: "最適合前往東京東側或北側的旅客",
    desc: "如果你的飯店在淺草、上野、秋葉原，或任何東京地下鐵／都營線到得了的地方，Skyliner 加地下鐵的組合常常比 N'EX 更快也更便宜。",
  },
];

const skylinerVsNexRows = [
  { feature: "營運公司", skyliner: "京成（民營鐵路）", nex: "JR 東日本" },
  { feature: "單程車資", skyliner: "¥2,580（IC ¥2,567）", nex: "到東京 ¥3,140、到新宿 ¥3,330" },
  { feature: "公布時間", skyliner: "到京成上野 41 分鐘", nex: "到東京車站最快 53 分鐘" },
  { feature: "JR Pass 可用", skyliner: "不可", nex: "可——免費，含指定席" },
  { feature: "IC 卡付車資", skyliner: "只限乘車券部分，Liner 券不行", nex: "可" },
  { feature: "直達停靠", skyliner: "日暮里、京成上野", nex: "東京、品川、澀谷、新宿、池袋、橫濱" },
  { feature: "班次", skyliner: "每小時 3 班", nex: "每 30 分鐘" },
  { feature: "最便宜的買法", skyliner: "優惠票單程 ¥2,310、來回 ¥4,500", nex: "來回車票 ¥5,200，效期 14 天" },
];

const destinationRows = [
  { dest: "日暮里", pick: "Skyliner", note: "到東京市中心最快的鐵路，並可同月台轉乘山手線。" },
  { dest: "京成上野", pick: "Skyliner", note: "Skyliner 終點站，依京成自家數字從第 2·3 航廈 41 分鐘。" },
  { dest: "淺草／秋葉原", pick: "Skyliner 或 Access 特急", note: "搭 Skyliner 到上野／日暮里再轉一小段，或搭 Access 特急 50 分鐘直通淺草。" },
  { dest: "東京車站", pick: "N'EX", note: "最快 53 分鐘直達，不用換車，¥3,140。" },
  { dest: "澀谷", pick: "N'EX", note: "同一班車直達，¥3,330。" },
  { dest: "新宿", pick: "N'EX", note: "直達——不用拖著行李轉車——¥3,330。" },
  { dest: "橫濱", pick: "N'EX", note: "直達 ¥4,480，往東京以南的明顯選擇。" },
];

const busFareRows = [
  { airport: "成田（NRT）", time: "公布的東京車站時刻表為 1 小時 50 分", price: "¥2,900～3,600", note: "依路線：迪士尼 ¥2,900、東京車站 ¥3,100、新宿 ¥3,600" },
  { airport: "羽田（HND）", time: "視路況而定，短得多", price: "¥1,000～1,400", note: "東京車站 ¥1,200、澀谷 ¥1,300、新宿 ¥1,400" },
];

const busPoints = [
  {
    title: "行李很重或很大時最理想",
    desc: "機場利木津巴士把行李放進車底行李艙——你不必把包包拖過車廂、扛上電扶梯。帶家人、帶滑雪裝備，或拉大型行李箱的人特別有用。",
  },
  {
    title: "直達主要飯店",
    desc: "很多利木津巴士路線直接停在主要飯店區：新宿、澀谷、東京車站、赤坂、池袋，部分路線停在個別飯店。路線請查 T-CAT（東京城市航空總站）的時刻表。",
  },
  {
    title: "零換車——而且收班更晚",
    desc: "許多路線直達主要飯店與區域，所以你上一次車、下車就在門口附近——帶小小孩、長輩或大量裝備時很理想。機場巴士的營運時間也比大多數機場電車更晚，所以如果你在電車收班後才落地，巴士通常是叫計程車之前最便宜的選項。請確認你那條路線的末班時間。",
  },
  {
    title: "會受路況影響",
    desc: "東京高速公路在尖峰時段（早上 7～9 點、傍晚 5～8 點）可能嚴重塞車。如果你在尖峰時段移動，請多留時間，或考慮搭電車、把重行李用宅急便（行李宅配）送到飯店。",
  },
  {
    title: "旺季請提前訂",
    desc: "旺季提前訂可以在熱門路線上確保座位、鎖定車資，也省掉長途飛行後在機場櫃台排隊。",
  },
];

const transferTips = [
  {
    title: "落地前先把 IC 卡準備好",
    desc: "透過 Suica App 開好的 IC 卡（Suica 或 PASMO）讓你一抵達就能直接刷進閘門，不用在售票機前排隊。如果你沒有，成田與羽田的 IC 卡機器都有英文介面。京成提醒一點：IC 卡只能付 Skyliner 的 ¥1,280 乘車券部分，¥1,300 的 Liner 券要另外購買。",
  },
  {
    title: "深夜抵達的選項有限",
    desc: `從羽田出發，往品川的京急末班車 00:08 從第 3 航廈開出；之後的選擇只剩深夜接駁巴士（00:00 到 02:00 之間從機場發車，新宿或池袋 ¥2,800，東京、銀座、淺草或秋葉原 ¥1,900）或用車。從成田出發，Skyliner 末班車平日 23:00、週末與假日 22:40 從機場開出。羽田完全沒有公布計程車車資，成田的定額車資未含過路費就從 ¥23,500 起跳，所以與其用猜的，不如把預約接送列入預算。時間與巴士車資查詢於 ${CHECKED}；Skyliner 發車時間與計程車車資查詢於 ${CHECKED_TAXI}。`,
  },
  {
    title: "持 JR Pass 的人：上車前先完成啟用",
    desc: "如果你帶著 JR Pass 兌換券抵達成田，請先在入境大廳的 JR 東日本旅行服務中心換成正式的周遊券，再去搭 N'EX。光有兌換券進不了閘門。",
  },
  {
    title: "考慮行李宅配（宅急便）",
    desc: "日本的宅急便服務（最常見的是黑貓大和運輸）可以把行李從機場送到你的飯店，通常隔天送達。這讓你可以輕裝搭電車，不用把重箱子拖過車站。價格由宅配業者訂定，而不是上述任何一家交通業者，所以請到入境大廳的櫃台依你的行李尺寸確認。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "成田機場到東京最便宜的方式是什麼？",
    a: `最便宜的電車是京成本線特急，到京成上野 ¥1,060（IC ¥1,052）——經京成成田的一般列車，雖然叫「特急」，但不收特急費。走較快的成田 Sky Access 線的 Access 特急，到日暮里或京成上野 ¥1,280（IC ¥1,267），到淺草 50 分鐘。兩者都不必劃位。如果你持有 JR Pass，成田特快已經包含在內，是更好的選擇。車資查詢自京成，${CHECKED}。`,
  },
  {
    q: "成田特快和 Skyliner 哪個快？",
    a: `依業者自家數字，到東京東側 Skyliner 比較快，到東京西側 N'EX 比較快。京成公布 Skyliner 從第 2·3 航廈到京成上野 41 分鐘；JR 東日本公布 N'EX 到東京車站「最快 53 分鐘」。不過 Skyliner 只停日暮里與京成上野，所以如果你的飯店在新宿、澀谷或橫濱，N'EX 整體通常勝出，因為它不用換車就到。Skyliner 車資 ¥2,580，N'EX 到東京 ¥3,140；買京成自家優惠票的話 Skyliner 只要 ¥2,310。查詢於 ${CHECKED}。`,
  },
  {
    q: "羽田機場到新宿怎麼走？",
    a: `三種方式。京急機場線最快——京急自家估計從第 3 航廈到新宿 30 分鐘、第 1·2 航廈 33 分鐘，轉一次車；機場到品川這段 ¥330。東京單軌電車 13 分鐘到濱松町、¥520，再搭山手線繞到新宿。機場利木津巴士直達新宿與中野站點 ¥1,400（兒童 ¥700），行李放車底。每人一個行李箱就搭電車；三個就搭巴士。查詢於 ${CHECKED}。`,
  },
  {
    q: "機場交通需要事先預訂嗎？",
    a: `電車方面，事先預訂是為了價格而不是座位：Skyliner 優惠票單程 ¥2,310 而不是 ¥2,580，N'EX 東京來回車票 ¥5,200，而到新宿買兩張單程要 ¥6,660，Skyliner ＋東京地鐵通票組合從 ¥2,840 起。這些都要在機場領取，所以還是要預留櫃台的時間。真正需要預訂的是車輛固定的選項：旺季的利木津巴士指定路線，以及任何專車或共乘接送，尤其是末班車之後才落地的航班。查詢於 ${CHECKED}。`,
  },
  {
    q: "末班車之後才落地怎麼辦？",
    a: `從羽田出發，京急末班車 00:08 從第 3 航廈開往品川，00:20 抵達。之後官方的選項是深夜接駁巴士，00:00 到 02:00 之間從機場發車，新宿或池袋 ¥2,800，東京、銀座、淺草或秋葉原 ¥1,900——而且只停這些指定站點。從成田出發，Skyliner 末班車平日 23:00、週末 22:40 從機場開出，分別在 23:48 與 23:28 抵達京成上野。在這些之後，只有預約的車能到任意地址——這是唯一一種付錢買接送而不是買車票明顯划算的情況。電車時間查詢於 ${CHECKED}，Skyliner 發車時間查詢於 ${CHECKED_TAXI}。`,
  },
  {
    q: "羽田機場到東京市中心要多久？",
    a: `羽田比成田離市區近得多。依京急自家估計，第 3 航廈到品川 11 分鐘、東京 20 分鐘、澀谷 23 分鐘、橫濱 23 分鐘、新宿 30 分鐘、淺草 34 分鐘、池袋 38 分鐘；從第 1·2 航廈出發約加 3 分鐘。東京單軌電車 13 分鐘到濱松町，大約每 5 分鐘一班。查詢於 ${CHECKED}。`,
  },
  {
    q: "成田機場可以用 IC 卡嗎？",
    a: "可以——IC 卡（Suica 與 PASMO）在成田的京成列車與 N'EX 上都能用。搭 Skyliner 時，IC 卡只能付 ¥1,280 的乘車券部分（IC ¥1,267）；¥1,300 的 Liner 券要另外購買。在羽田，京急線與東京單軌電車都可以用 IC 卡。在機場入境大廳任何一台售票機都能加值。",
  },
  {
    q: "成田特快 N'EX 值得搭嗎？",
    a: `如果你有 JR Pass，絕對值得——它免費、含指定席，也是最舒服的選項。沒有周遊券的話，到東京車站 ¥3,140、到品川、澀谷或新宿 ¥3,330，換到的是不用換車的直達；如果回程也從成田飛，¥5,200 的來回車票又更划算。車資中的指定席部分淡季便宜 ¥200、旺季貴 ¥200。查詢於 ${CHECKED}。`,
  },
  {
    q: "成田機場到新宿怎麼走？",
    a: `最簡單的是成田特快 N'EX，直達新宿 ¥3,330（持 JR Pass 免費），不用換車。另一個選擇是京成 Skyliner 到日暮里——依京成數字到京成上野 41 分鐘——再轉 JR 山手線，比較便宜（¥2,580），但你和飯店之間會多一次轉乘和一段樓梯。利木津巴士到新宿站點 ¥3,600，行李放車底。查詢於 ${CHECKED}。`,
  },
  {
    q: "Skyliner 可以用 JR Pass 嗎？",
    a: "不行。Skyliner 屬於京成電鐵這家民營鐵路，日本鐵路周遊券不涵蓋。持 JR Pass 的人應該搭 N'EX，它是 JR 東日本的列車，持周遊券免費，含指定席。如果你沒有 JR Pass，Skyliner 對往東京東側來說是很強的選項。",
  },
  {
    q: "在東京，機場利木津巴士比電車好嗎？",
    a: "看你在意什麼。行李很重、想要不換車直達飯店、深夜落地，或住的地方就在巴士站旁邊時，巴士勝出。電車在速度與可預測性上勝出，尤其在尖峰路況下。對大多數行李不多、住在車站旁飯店的旅客來說，電車比較快；對所有拉著大行李箱的人來說，巴士比較輕鬆。",
  },
  {
    q: "成田的末班車幾點？",
    a: `Skyliner 方面，京成自家時刻表顯示平日從成田機場站發出的末班車是 23:00——Skyliner 188 號，23:03 停第 2·3 航廈、23:43 到日暮里、23:48 到京成上野；週末與假日是 22:40 的 Skyliner 186 號，23:23 到日暮里、23:28 到京成上野。首班車是 07:23 的 Skyliner 2 號，08:29 抵達京成上野。京成一般列車比 Skyliner 末班稍晚，但 Skyliner 時刻表上沒有給一個統一的時間，請查你出發當天的時刻。查詢於 ${CHECKED_TAXI}。`,
  },
  {
    q: "從成田或羽田搭計程車到東京要多少錢？",
    a: `成田有機場訂定的六區定額車資：江戶川區、葛飾區、足立區 ¥23,500～¥26,500；江東區、墨田區、台場、東八潮 ¥28,000；中央區、千代田區、台東區、文京區、荒川區 ¥29,000～¥31,000；新宿區、豐島區、中野區、澀谷區、目黑區、港區、品川區、大田區 ¥31,500～¥32,500；板橋區、北區、練馬區 ¥34,000～¥36,000；世田谷區、杉並區、三鷹市、武藏野市 ¥35,500～¥38,500。每個區間的兩個數字是兩條高速公路路線，過路費另計，22:00 到 05:00 之間另有加成。羽田方面，機場確認有涵蓋東京都與神奈川縣的定額制度、過路費另計，但沒有公布金額，所以本頁不列數字。查詢於 ${CHECKED_TAXI}。`,
  },
  {
    q: "4 個人包車接送值得嗎？",
    a: `單看價格不值得。把成田到新宿的公布車資乘上四位大人：利木津巴士 ¥14,400，每人 ¥3,600，行李放車底；N'EX ¥13,320，每人 ¥3,330；定額計程車 ¥31,500～¥32,500 加過路費，每人 ¥7,875～¥8,125。從羽田差距更大，因為京急到品川這段每人只要 ¥330。包車值得的時候，問題不在車資——末班車之後才落地（羽田 00:08、成田 23:00 或 22:40）、飯店沒有任何巴士路線停靠、行李比手還多，或是 5 人以上同行，這時 7 人座或 10 人座是按車計價而不是按座位。車資查詢於 ${CHECKED}，計程車分區查詢於 ${CHECKED_TAXI}。`,
  },
  {
    q: "成田與羽田的利木津巴士多少錢？",
    a: `每座機場沒有單一車資——業者依路線定價。從成田到迪士尼度假區 ¥2,900、東京車站與 T-CAT ¥3,100、新宿或澀谷 ¥3,600；公布的東京車站時刻表車程約 1 小時 50 分。從羽田到東京車站 ¥1,200、澀谷 ¥1,300、新宿或中野 ¥1,400。查詢於 ${CHECKED}。`,
  },
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "成田機場到東京交通" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTokyoAirportTransferPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            東京機場交通 2026：<br />成田與羽田到東京市區，N&apos;EX vs Skyliner
          </h1>
          <p className={styles.heroSubtitle}>
            以下每一筆車資與車程都來自各業者的官方網站，查詢於 {CHECKED}；計程車定額車資與 Skyliner
            首末班車查詢於 {CHECKED_TAXI}。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "成田與羽田", "N'EX vs Skyliner"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* The answer first. */}
        <p className={styles.bodyText}>
          從<strong>成田</strong>出發，最快的<strong>東京機場交通</strong>是<strong>京成 Skyliner</strong>——
          <strong>41 分鐘</strong>到京成上野、<strong>¥2,580</strong>；最便宜的是
          <strong>京成本線特急，¥1,060</strong>。要去<strong>東京車站</strong>的話，
          <strong>成田特快 N&apos;EX</strong> 是 <strong>¥3,140</strong>、<strong>最快 53 分鐘</strong>，持 JR Pass
          免費。從<strong>羽田</strong>出發，最快和最便宜是同一班車：<strong>京急機場線</strong>
          <strong>11 分鐘到品川、¥330</strong>，<strong>東京單軌電車</strong>則是
          <strong>13 分鐘到濱松町、¥520</strong>。以上是大人單程車資，於 {CHECKED} 查詢自 JR 東日本、京成、京急、
          東京單軌電車與利木津巴士；成田的定額計程車依區域為 <strong>¥23,500～¥38,500</strong>，過路費另計，
          於 {CHECKED_TAXI} 查詢自成田機場。
        </p>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成田最便宜</p>
                <p className={styles.verdictStatValue}>京成本線特急（¥1,060）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成田最快</p>
                <p className={styles.verdictStatValue}>京成 Skyliner（41 分鐘）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>羽田最便宜</p>
                <p className={styles.verdictStatValue}>京急到品川（¥330）</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>原則：</strong>持 JR Pass，或要去東京西側（新宿、澀谷、橫濱），搭
              <strong>成田特快 N&apos;EX</strong>。要去上野或東京東側，搭<strong>京成 Skyliner</strong>。
              從<strong>羽田</strong>出發就搭京急線——快、便宜、好懂。
            </p>
          </div>
        </div>

        {/* Hotel area against airport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>依飯店區域</span>
          <h2 className={styles.sectionTitle}>我的飯店區域適合哪一種東京機場交通？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            如果你已經知道要住哪裡，這是你唯一需要的一張表。找到你的區域往右看：最快的選項、最便宜的選項，
            以及有沒有不必拖著行李箱轉車就能到的方式。從成田出發，東京西側是 N&apos;EX 的地盤，東側屬於京成；
            從羽田出發，京急線五個區域都到得了。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["飯店區域", "成田最快", "成田最便宜", "羽田最快", "不用轉車直達"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.area}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.naritaFast}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.naritaCheap}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hanedaFast}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.direct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            車資與成田車程於 {CHECKED} 查詢自 JR 東日本、京成與利木津巴士；羽田的時間是京急自家的估計值，
            不含轉乘本身的時間。還在挑房間？我們的{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo">東京住宿區域指南（英文）</Link>依路線與機場
            比較同樣這些區域，{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">東京 5 天行程（英文）</Link>則告訴你較長的行程
            實際上多半在山手線的哪一側度過。
          </p>
        </section>

        {/* Every option, one table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>價格與時間</span>
          <h2 className={styles.sectionTitle}>東京機場交通要多少錢、要多久？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            兩座機場共十一個選項，大人單程車資對照業者自家公布的車程，各機場內由便宜到貴排列。差距本身就說明了
            一切：從成田出發，價格範圍是 <strong>¥1,060 到 ¥38,500</strong>；從羽田出發，最便宜的進城方式只要{" "}
            <strong>¥330</strong>。業者沒有公布數字的地方，表格會直接註明。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["機場", "選項", "公布車程", "大人單程車資", "資料來源"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allOptionRows.map((row) => (
                    <tr key={`${row.airport}-${row.option}`}>
                      <td style={{ fontSize: "0.85rem" }}>{row.airport}</td>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                        {row.source}，{row.taxi ? CHECKED_TAXI : CHECKED}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={skylinerUrl} className={styles.verdictBtn} target="_blank" rel={KLOOK_REL}>
              在 Klook 訂 Skyliner 車票 →
            </KlookLink>
            <KlookLink href={nexRoundTripUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              在 Klook 訂 N&apos;EX 來回車票 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook 頁面會在新分頁開啟。本頁不列 Klook 價格：Klook 會擋自動讀取商品頁，所以這裡無法驗證任何數字。
            上面的鐵路車資是櫃台價——兩家業者都有賣更便宜的旅客票，請見下方的{" "}
            <a href="#prebuy" style={{ color: "var(--text)", fontWeight: 600 }}>預購票一覽表</a>。
          </p>
        </section>

        {/* Narita master table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>成田機場（NRT）</span>
          <h2 className={styles.sectionTitle}>成田機場到東京市中心怎麼走？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            共有六種方式，老實說該依你住哪裡來排名，而不是依速度。成田在東京市區以東約 60～70 公里，所以每個選項
            都不是小事：最快的電車 41 分鐘，最便宜的 ¥1,060。車資為大人單程；業者沒有公布數字的地方，表格直接註明，
            不做猜測。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["選項", "公布車程", "大人單程車資", "班次", "下車地點"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {naritaMasterRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.often}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.lands}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            查詢於 {CHECKED}：Skyliner 與京成車資來自京成的日文 Skyliner 車票頁與英文 FAQ（¥1,280 乘車券＋¥1,300
            Liner 券），車程來自京成的英文路線頁；N&apos;EX 車資與每 30 分鐘一班的班次來自 JR 東日本；巴士車資與東京車站
            時刻表來自利木津巴士。京成的英文票價表仍是 2025 年前的 Skyliner 車資 ¥2,470——本頁採用現行的 ¥2,580。
            這些業者都沒有公布計程車車資，計程車的數字來自成田機場本身（見下方計程車一節）。
          </p>
        </section>

        {/* Haneda master table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>羽田機場（HND）</span>
          <h2 className={styles.sectionTitle}>羽田機場到東京市中心怎麼走？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            羽田距離東京市中心 15～20 公里，進城只是一趟市內移動，不是長途跋涉：¥330、11 分鐘就到山手線上的品川。
            在羽田，問題幾乎從來不是速度——而是行李，以及你的班機幾點落地。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["選項", "公布車程", "大人單程車資", "班次", "下車地點"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hanedaMasterRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.often}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.lands}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            查詢於 {CHECKED}：京急車資與預估車程來自京急的機場交通網站；單軌電車車資與 13 分鐘、約每 5 分鐘一班的
            數字來自東京單軌電車；巴士與接駁巴士車資來自利木津巴士。京急的 ¥330 是第 3 航廈到品川的車資（IC ¥327）
            ——品川以後的車資依轉乘路線而定。
          </p>
        </section>

        {/* Cheapest */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>最便宜</span>
          <h2 className={styles.sectionTitle}>成田機場到東京最便宜的方式是什麼？</h2>
          <p className={styles.bodyText}>
            <strong>京成本線特急，¥1,060</strong> 到京成上野（IC ¥1,052）。它是一般通勤用的特急，不是高級列車，
            所以雖然叫「特急」，卻不收特急費、也不用劃位——直接上車。京成沒有公布它的單一車程，這是你除了行李空間之外
            唯一放棄的東西。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>¥1,060——京成本線特急</strong>到京成上野，經京成成田與船橋。從機場出發最便宜的電車，沒有之一。</li>
            <li><strong>¥1,280——京成 Access 特急</strong>到日暮里或京成上野（IC ¥1,267），走較快的成田 Sky Access 線。京成公布直通淺草 50 分鐘，並且不用換車繼續開往日本橋、新橋與品川。</li>
            <li><strong>¥2,580——京成 Skyliner</strong>，用京成自家優惠票是 ¥2,310。你多付的 ¥1,300 Liner 券買到的是指定席、行李架與 41 分鐘。</li>
            <li><strong>¥0——持 JR Pass 搭 N&apos;EX。</strong>指定席也包含在內，對持周遊券的人來說，這是遙遙領先的最便宜舒適選項。</li>
          </ul>
          <p className={styles.bodyText}>
            整個階梯就是這樣：¥1,060 買到最慢的車，¥2,580 買到最快的車，而如果你在乎錢、不在乎指定席，¥1,280 的
            Access 特急是大多數人該搭的那一班。車資於 {CHECKED} 查詢自京成；本線的數字是京成車站票價表上印的數字。
          </p>
        </section>

        {/* Which airport is closer */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>成田 vs 羽田</span>
          <h2 className={styles.sectionTitle}>東京哪一座機場離市區比較近？</h2>
          <p className={styles.bodyText}>
            <strong>羽田</strong>，而且差距很大，業者自家的數字就看得出有多大。京急公布
            <strong>羽田第 3 航廈到品川 11 分鐘、¥330</strong>；<strong>成田</strong>公布最快的電車是 Skyliner，
            <strong>到京成上野 41 分鐘、¥2,580</strong>，到東京車站最快的是 N&apos;EX，
            <strong>「最快 53 分鐘」、¥3,140</strong>。所以在羽田落地，還沒離開機場就大約省下半小時、每人約
            <strong>¥2,250</strong>。成田在市區以東約 60～70 公里；羽田在市區以南 15～20 公里——所以一個是長途移動，
            另一個只是市內搭電車。
          </p>
          <p className={styles.bodyText}>
            這在你還在選機票時很重要。如果成田的機票每人比羽田便宜不到約 ¥2,500，交通費就把省下的錢抵銷了——回程那天
            也是同樣的算法，因為從成田出發的清晨航班，比 Skyliner 首班車還早。數字查詢於 {CHECKED}。
          </p>
        </section>

        {/* N'EX Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>成田特快</span>
          <h2 className={styles.sectionTitle}>成田特快 N&apos;EX 怎麼搭？</h2>
          <p className={styles.bodyText}>
            它是 JR 東日本的全車指定席特急，從成田兩個航廈開往東京、品川、澀谷、新宿、池袋與橫濱——一班車、不用換車，
            一天中大部分時段每 30 分鐘一班。你需要乘車券與特急券兩張，下面的單一車資數字就是兩者合計。
          </p>
          <div className={styles.stepsList}>
            {nexGuidePoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={nexRoundTripUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看 N&apos;EX 來回車票 →
            </KlookLink>
          </div>
        </section>

        {/* Skyliner Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>京成 Skyliner</span>
          <h2 className={styles.sectionTitle}>京成 Skyliner 怎麼搭？</h2>
          <p className={styles.bodyText}>
            它是京成沿成田 Sky Access 線開往日暮里與京成上野的指定席特急——成田出發最快的電車，每小時 3 班，
            而且 JR Pass 不能搭。
          </p>
          <div className={styles.stepsList}>
            {skylinerPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={skylinerUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看 Skyliner 車票 →
            </KlookLink>
          </div>
        </section>

        {/* Skyliner vs N'EX */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>正面對決</span>
          <h2 className={styles.sectionTitle}>成田特快和 Skyliner 哪個快？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Skyliner</strong> 車比較快、票也比較便宜——依京成自家數字，<strong>41 分鐘</strong>到京成上野、
            <strong>¥2,580</strong>，N&apos;EX 則是 <strong>¥3,140</strong>、到東京車站<strong>「最快 53 分鐘」</strong>。
            但它只到兩個車站。如果你的飯店在新宿、澀谷、品川或橫濱，<strong>N&apos;EX</strong> <em>到飯店</em>反而比較快，
            因為它不用轉車就到——而且持 JR Pass 免費，對持周遊券的人來說直接定案。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "京成 Skyliner", "成田特快 N'EX"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {skylinerVsNexRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.skyliner}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.nex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>還有一個沒人比較的第三選項：</strong>兩種列車從機場出發走的是不同路線，而兩條路線上的便宜列車也
            不一樣。成田 Sky Access 線跑的是 Skyliner 與 Access 特急；京成本線跑的是一般特急。同一家業者、同一座機場，
            乘車券差 ¥220——Access 特急到日暮里 ¥1,280，本線特急到京成上野 ¥1,060。如果你在比的是 Sky Access 線對本線，
            而不是 Skyliner 對 N&apos;EX，差別就只有這樣：多付 ¥220 換較快的路線，兩者都沒有指定席。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            車資與車程於 {CHECKED} 查詢自 JR 東日本與京成。Skyliner 的時間是京成公布的第 2·3 航廈到京成上野；N&apos;EX
            的時間是 JR 東日本公布的最快班次到東京車站。兩家業者都會調整車資——請在櫃台或結帳時確認。
          </p>
        </section>

        {/* By destination */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>依目的地</span>
          <h2 className={styles.sectionTitle}>你的飯店該搭哪一班？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            選和你飯店相符的那一列，而不是最快的那班車。拖著兩個行李箱轉一次車，花掉的時間比 Skyliner 與 N&apos;EX
            之間的 12 分鐘還多。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["目的地", "我們的選擇", "原因"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {destinationRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            還沒訂飯店？那這張表就反過來用：最輕鬆的抵達方式，是在訂房之前就選好的那一種——進城後各條路線怎麼串連，
            請看{" "}
            <Link href="/guides/transport/tokyo-transportation">東京交通指南（英文）</Link>；短天數的行程實際上多半在
            山手線的哪一側，請看{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">東京 3 天行程（英文）</Link>。
          </p>
        </section>

        {/* Haneda to Shinjuku */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>羽田</span>
          <h2 className={styles.sectionTitle}>羽田機場到新宿怎麼走？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            京急自家估計<strong>從第 3 航廈 30 分鐘</strong>、第 1·2 航廈 33 分鐘，轉一次車；其中機場到品川這段 ¥330。
            不用轉車的選擇是<strong>利木津巴士到新宿與中野站點，¥1,400</strong>（兒童 ¥700），行李放車底。單軌電車路線
            ——13 分鐘到濱松町、¥520，再轉山手線——適合目的地是濱松町、新橋或東京車站，而不是新宿的人。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["目的地", "從第 3 航廈", "從第 1·2 航廈"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {keikyuTimeRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td className={styles.tdPrice}>{row.t3}</td>
                      <td>{row.t12}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            京急的預估車程，查詢於 {CHECKED}。不含轉乘時間，其中幾個目的地需要轉一次車。¥330（IC ¥327）是第 3 航廈到
            品川的車資；之後的車資依轉乘路線而定，用{" "}
            <Link href="/guides/transport/ic-cards-japan">IC 卡（英文指南）</Link>就能全部搞定，不必用售票機。
          </p>
        </section>

        {/* Limousine Bus */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>機場巴士</span>
          <h2 className={styles.sectionTitle}>機場利木津巴士比電車好嗎？</h2>
          <p className={styles.bodyText}>
            當問題是行李而不是分鐘數時，巴士比較好。每人兩件託運行李放進車底，直到你下車前都不用再碰，而且很多路線
            的終點是飯店門口，而不是車站大廳。尖峰時段它比較差，因為巴士和大家塞在同一條高速公路上。每座機場沒有單一
            車資——業者依路線定價。
          </p>
          <div className={styles.tableWrap} style={{ marginBottom: "1.25rem", marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["機場", "車程", "單程車資", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {busFareRows.map((row) => (
                    <tr key={row.airport}>
                      <td className={styles.tdProvider}>{row.airport}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.stepsList}>
            {busPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            每條路線的車資、行李限制與預約規則，都在我們的{" "}
            <Link href="/guides/transport/tokyo-airport-limousine-bus">東京機場利木津巴士指南（英文）</Link>裡，
            讀的是同一批業者頁面。上方巴士車資查詢於 {CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={naritaBusUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              成田利木津巴士（Klook）→
            </KlookLink>
            <KlookLink href={hanedaBusUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              羽田利木津巴士（Klook）→
            </KlookLink>
          </div>
        </section>

        {/* Taxi */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>計程車</span>
          <h2 className={styles.sectionTitle}>從成田或羽田搭計程車到東京要多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>成田</strong>有公布的答案，而且是定額而不是跳表：成田機場訂了
            <strong>六個區域，¥23,500 到 ¥38,500</strong>，<strong>高速公路過路費另計</strong>，
            <strong>22:00～05:00 另有加成</strong>。東京市中心——中央區、千代田區、台東區、文京區、荒川區——是 C 區，
            依司機走哪條高速公路為 <strong>¥29,000 或 ¥31,000</strong>；新宿與澀谷是 D 區，
            <strong>¥31,500 或 ¥32,500</strong>。<strong>羽田</strong>則沒有公布的答案：機場確認有涵蓋東京都與神奈川縣的
            定額制度、過路費另計，但表示乘客應向計程車公司詢問金額，而東京計程車協會自己的車資頁面在查詢時無法連線，
            所以本頁不列羽田的數字。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["區域", "行政區與城市", "經京葉道路", "經灣岸線"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {naritaTaxiRows.map((row) => (
                    <tr key={row.zone}>
                      <td className={styles.tdProvider}>{row.zone}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.wards}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.keiyo}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.bay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            成田機場自家公布的計程車定額車資，查詢於 {CHECKED_TAXI}。兩欄是機場分開定價的兩條高速公路路線；機場表示，
            上表每個數字之外，<em>「乘客須支付高速公路過路費」</em>，且 22:00 到 05:00 之間有深夜清晨加成，但沒有寫明金額。
            這是在排班處搭乘計程車的車資——事先預約的車由業者自行報價，不適用這張表。
          </p>
        </section>

        {/* Families */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>家庭與團體</span>
          <h2 className={styles.sectionTitle}>家庭出遊最適合哪一種東京機場交通？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            四個人的老實答案是<strong>成田搭利木津巴士</strong>、<strong>羽田搭電車</strong>——而不是包車，雖然大多數網頁
            都在暗示包車。把公布車資乘出來，四人從成田搭定額計程車到新宿是
            <strong>每人 ¥7,875～¥8,125 加過路費</strong>，搭巴士則是<strong>每人 ¥3,600</strong>、行李放車底；從羽田搭電車
            那一段是 <strong>¥330</strong>。四個人時，包車每人並不會比巴士便宜；它只是比計程車便宜，那是另一回事。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["選項", "計價路線", "四位大人合計", "每人", "有小孩時"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {familyRows.map((row) => (
                    <tr key={`${row.option}-${row.route}`}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.option}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.four}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.each}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.kids}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            每個數字都是上方各表的公布單程車資乘出來的——京成、JR 東日本、京急、東京單軌電車與利木津巴士，查詢於{" "}
            {CHECKED}；D 區計程車車資來自成田機場，查詢於 {CHECKED_TAXI}，過路費還要另加。業者沒有公布兒童票價的地方，
            表格直接註明，而不是把大人票價砍半。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>那門到門的接送車什麼時候真的勝出？</strong>依公布的數字，有四種情況，而且關鍵在「門口」而不是價格：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>你在末班車之後落地。</strong>羽田是 00:08 之後；成田的 Skyliner 末班車平日 23:00、週末 22:40 從機場開出。在那之後，只有車能把你送到地址，而不是站牌。</li>
            <li><strong>你的飯店不在巴士路線上。</strong>巴士每人 ¥3,600 的前提是它停在你門口附近；否則你付的是巴士加計程車。</li>
            <li><strong>行李比手還多。</strong>兩大兩小、四個行李箱加一台嬰兒車，在日暮里根本轉不了車，而 ¥1,280 的 Access 特急省下的錢，在第一次有人扛著行李箱爬樓梯時就沒了。</li>
            <li><strong>你們有 5 人以上。</strong>巴士與電車按座位計價、人數一多就線性增加；7 人座或 10 人座按車計價，所以每人分攤的金額會持續下降，車票則不會。</li>
          </ul>
          <p className={styles.bodyText}>
            要在出發前訂，而不是到排班處才叫：預約接送的重點是司機會追蹤你的航班號碼，這在入境大廳是安排不了的。請拿你們
            人數的報價和上表的「每人」欄比較——如果沒有比巴士便宜，就搭巴士。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={privateTransferUrl} className={styles.verdictBtn} target="_blank" rel={KLOOK_REL}>
              全員同車的專車接送 →
            </KlookLink>
            <KlookLink href={sharedTransferUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              共乘接送，按座位計價 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
            兩個商品都會在新分頁開啟 Klook，並於 {CHECKED} 確認仍在販售。本頁不列 Klook 價格——專車接送依區域與車型報價，
            就算 Klook 的商品頁能被自動讀取，單一數字對大多數訂單來說也是錯的。
          </p>
        </section>

        {/* Booking */}
        <section className={styles.comparisonSection} id="prebuy">
          <span className={styles.sectionLabel}>預訂</span>
          <h2 className={styles.sectionTitle}>機場交通需要事先預訂嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            電車方面，事先預訂買到的是比較低的價格，而不是一個否則會被搶光的座位：兩家業者都賣比櫃台價便宜的旅客票，
            而且兩者都還是要到機場領取。真正需要預訂的是車輛固定的選項——旺季的巴士指定路線，或是電車收班後才落地的
            航班要用的車。以下是每一種的價格，以及實際上怎麼拿到手。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["值得預購嗎？", "價格", "領取方式", "我們的看法"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prebuyRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "normal", fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.collect}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.worth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            價格查詢於 {CHECKED}，來自京成（Skyliner 優惠票與 Skyliner ＋東京地鐵通票組合）、JR 東日本（N&apos;EX 東京
            來回車票）、東京單軌電車（山手線優惠票及其販售日）、利木津巴士（巴士＋地鐵通票組合）與京急（羽得票組合，
            業者表示羽田機場不販售）。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>付款前先確認三件事。</strong>第一，是電子票還是要兌換的憑證：Skyliner 與巴士都可以是直接掃描的
            QR code，而 N&apos;EX 來回車票必須帶護照到機場車站領取，長途飛行後還要再排一次隊。第二，取消期限——在轉售平台上
            是依各商品而定，不是鐵路公司訂的，請確認你那天日期顯示的規定。第三，你幾點落地：23:40 抵達羽田，離末班車只剩
            半小時左右，事先買什麼都改變不了這一點，除了一台車。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={skylinerUrl} className={styles.verdictBtn} target="_blank" rel={KLOOK_REL}>
              在 Klook 訂 Skyliner 車票 →
            </KlookLink>
            <KlookLink href={nexRoundTripUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              在 Klook 訂 N&apos;EX 來回車票 →
            </KlookLink>
            <KlookLink href={naritaBusUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              成田利木津巴士 →
            </KlookLink>
            <KlookLink href={hanedaBusUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              羽田利木津巴士 →
            </KlookLink>
            <KlookLink href={privateTransferUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              機場專車接送 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook 頁面會在新分頁開啟。本頁不列 Klook 價格：Klook 會擋自動讀取商品頁，所以這裡無法驗證任何數字——
            請在結帳時確認你那天的現價與取消規定。如果你在市區的日子以地鐵為主，可以看看{" "}
            <KlookLink href={busSubwayComboUrl} target="_blank" rel={KLOOK_REL} style={{ color: "var(--text)", fontWeight: 600 }}>
              巴士＋東京地鐵通票組合
            </KlookLink>
            ；通票本身值不值得，請看我們的{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">東京地鐵通票指南（英文）</Link>。
          </p>
        </section>

        {/* Late night and pre-dawn */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>深夜與清晨</span>
          <h2 className={styles.sectionTitle}>深夜落地或清晨起飛怎麼辦？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            這是值得在出發前就決定的事，因為它有一條硬邊界。羽田的末班車 <strong>00:08</strong> 從第 3 航廈開出、首班車
            <strong>05:26</strong>；在兩者之間，唯一有固定班表的大眾運輸是深夜接駁巴士，只停少數指定站點。成田的 Skyliner
            末班車平日 <strong>23:00</strong>、週末 <strong>22:40</strong> 從機場開出，首班車 <strong>07:23</strong>。
            06:40 起飛的航班，代表你得在首班車都還沒開之前就到航廈。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "業者公布的內容", "資料來源"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nightRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "normal" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}，{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ul className={styles.bodyList} style={{ marginTop: "1.25rem" }}>
            <li><strong>午夜前在羽田落地：</strong>搭電車。¥330 到品川，勝過本頁其他所有選項。</li>
            <li><strong>00:10 到大約 02:00 之間在羽田落地：</strong>如果接駁巴士有站點靠近你的飯店就搭它——東京、銀座、淺草或秋葉原 ¥1,900，新宿或池袋 ¥2,800。否則就用車。</li>
            <li><strong>02:00 到 05:26 之間在羽田落地：</strong>預約的車，或待在航廈。羽田的管制區是開著的，電車則沒有。</li>
            <li><strong>平日 23:00 以後、或週末 22:40 以後在成田落地：</strong>當天的 Skyliner 已經收班。先查你那條路線的巴士，如果飯店不在路線上就訂車——定額計程車未含過路費就從 ¥23,500 起跳。</li>
            <li><strong>07:00 前起飛：</strong>羽田從 05:26 往回推、市區首班巴士約 04:00 往回推，或住在機場附近。清晨接駁巴士 03:35 從池袋、04:00 從新宿高速巴士總站（Busta 新宿）發車。</li>
          </ul>
          <p className={styles.bodyText}>
            這些選項中只有車能送你到地址而不是站點，這正是為什麼它在凌晨 1 點值得花錢、在下午 2 點則是浪費。請在出發前
            預訂——司機會追蹤你的航班號碼才是重點，這在入境大廳是安排不了的。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={privateTransferUrl} className={styles.verdictBtn} target="_blank" rel={KLOOK_REL}>
              專車接送，羽田或成田 →
            </KlookLink>
            <KlookLink href={sharedTransferUrl} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              一、兩人適合的共乘接送 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
            兩個商品都於 {CHECKED} 在 Klook 確認仍在販售。價格依區域與車型而定，請在結帳時確認——也請確認取消期限，
            因為依航班號碼預約的車，是本頁唯一一個當晚無法改訂的東西。
          </p>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>小提醒</span>
          <h2 className={styles.sectionTitle}>落地前還該知道什麼？</h2>
          <div className={styles.stepsList}>
            {transferTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where to stay for easy airport access */}
        <KlookStayAreas
          heading="住在哪裡，機場來回最輕鬆"
          intro="哪一種交通最好，與其說取決於機場，不如說取決於你住哪裡，因為只有少數區域有直達機場的電車。如果你還沒訂飯店，先從這幾區挑一間，抵達與離開都會簡單很多——搭清晨航班離開時尤其重要。"
          areas={stayAreas}
        />

        {/* Klook: two things the transfer ticket does not cover */}
        <KlookTripPrep
          heading="機場票沒涵蓋的兩件事"
          intro="機場票只送你到第一個車站。這兩項負責它的前後："
          items={tripPrep}
        />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/where-to-stay-in-tokyo", title: "東京住宿區域指南（2026）：依路線與機場比較最佳區域（英文）" },
            { href: "/guides/transport/tokyo-airport-limousine-bus", title: "東京機場利木津巴士（2026）：成田與羽田的車資、時間與站點（英文）" },
            { href: "/guides/transport/tokyo-transportation", title: "東京交通指南 2026：電車、地鐵與 IC 卡（英文）" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "東京地鐵通票（2026）：24、48 或 72 小時，值得買嗎？（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 指南 2026：日本行值得買嗎？（英文）" },
            { href: "/guides/transport/ic-cards-japan", title: "日本 IC 卡 2026：Suica、PASMO 與使用方式（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "東京 3 天行程（2026）：要訂什麼、依什麼順序（英文）" },
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "東京 5 天行程（2026）：五天行程與每天要訂的票（英文）" },
            { href: "/guides/transport/osaka-airport-transfer", title: "大阪機場交通（2026）：關西與伊丹機場到市區比較（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新幹線指南 2026：車票、周遊券與新手須知（英文）" },
            { href: "/guides/transport", title: "所有日本交通指南（英文）→" },
          ]}
        />
      </div>
    </>
  );
}
