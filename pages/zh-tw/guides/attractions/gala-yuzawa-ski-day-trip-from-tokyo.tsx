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

// Mirrors the English page (/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo) section by
// section as of 2026-11-25 (task-jtk-20261125-TR03): same sections, tables, FAQ and Klook CTAs in
// the same places. Every figure, date and source is the English page's (read 15 Nov 2026); nothing
// is added. Title term: GALA湯澤滑雪場 — JR East's own Traditional Chinese page writes "GALA湯澤",
// and Taiwan / Hong Kong guides write GALA湯澤滑雪場.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo";
const TITLE = "GALA湯澤滑雪場 2026-27：東京新幹線一日遊與JR Pass";
const H1 = "GALA湯澤滑雪場 2026-27：東京出發新幹線一日遊、JR Pass 與交通方式";
const DESC =
  "東京到GALA湯澤滑雪場搭新幹線直達最快 71 分鐘，可用 JR Pass。纜車票 ¥8,000，12 月 19 日開放滑雪，一日遊費用與該預訂的項目。";

const OWN_ISO = "2026-11-15";
const OWN = dateLabel(OWN_ISO, LOCALE);
const JRP_7DAY = "¥50,000";
const EAST_PASS_5DAY = "¥35,000";
const SLED = "¥2,500";
const FASTEST = "71 分鐘";
const SLOPES_OPEN = "2026 年 12 月 19 日";
const SLOPES_CLOSE = "2027 年 5 月 5 日";
const SIGHTSEEING_OPEN = "2026 年 12 月 12 日";
const LIFT_WINDOW = "¥8,000";
const LIFT_WEB = "¥7,500";
const SKI_SET = "¥6,500";
const WEAR = "¥5,500";
const PASS_ADULT = "¥16,000";
const JR_EXAMPLE = "約 ¥21,500";

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
    leg: "最推薦：東京站 → GALA湯澤站，上越新幹線直達（谷川號）",
    time: `最快 ${FASTEST}，例如谷川 71 號東京 6:24 → GALA湯澤 7:35；JR 東日本的目的地介紹頁也寫搭谷川號約 1 小時 20 分鐘`,
    trains: "季節限定：自 2026 年 12 月 12 日起，JR 東日本將一般谷川號延長行駛至GALA湯澤並加開臨時列車；途中停靠上野與大宮",
    cost: `可使用 JAPAN RAIL PASS、JR東京廣域周遊券（${PASS_ADULT}）與 JR EAST PASS；沒有周遊卡時，新幹線票價以結帳頁面為準`,
    note: "GALA湯澤站是建在滑雪中心裡的季節限定新幹線車站，出了剪票口就是販售纜車票與租借裝備的建築。不用搭巴士、不用轉車、不用搭計程車。並非每班谷川號都開到GALA湯澤，請選擇終點站標示為GALA湯澤的列車。",
  },
  {
    leg: "東京站 → 越後湯澤站，再轉免費接駁車",
    time: "搭新幹線到越後湯澤，再搭雪場免費接駁車約 10 分鐘",
    trains: "越後湯澤是全年營運的上越新幹線車站，位於GALA湯澤的前一站",
    cost: "接駁車免費；鐵路區間同樣可使用上述三種周遊卡",
    note: "想搭的直達列車客滿或當天沒有行駛時的替代方案，也是GALA湯澤營業季以外唯一的方式：依 JR 東日本的說明，GALA湯澤站只在冬季與春季營運，越後湯澤則是前一站、全年營運的車站。",
  },
  {
    leg: "東京出發的滑雪巴士一日遊",
    time: "從東京上車到下車共 11 至 12.5 小時",
    trains: "依商品頁面上標示的出發日期",
    cost: "按人計價，依日期而定；請在商品頁面選擇您的日期查看",
    note: "這是不同的商品，而不是比較便宜的版本：巴士行程前往同屬湯澤地區的岩原滑雪場，而不是GALA湯澤；來回交通一次預訂，裝備租借與滑雪課程為選購項目。比新幹線慢，但不需要自己安排任何事情。",
  },
  {
    leg: "包車前往GALA湯澤或苗場",
    time: "包車 10 小時，從住宿地點出發並送回",
    trains: "業者可接受的任何日期",
    cost: "按車計價，依日期而定；請在商品頁面查看",
    note: "適合帶著裝備的家庭或團體，或需要比首班車更早出發的情況。預訂時選擇雪場，同一個商品可以去GALA湯澤，也可以去苗場。",
  },
];

const costRows = [
  {
    item: "不帶裝備的成人滑雪或單板一日（纜車票＋裝備組＋雪衣，線上價格）",
    price: "¥19,500＋車資",
    note: `大多數一日遊旅客需要的金額：纜車票 ${LIFT_WEB}＋雙板或單板裝備組 ${SKI_SET}＋雪衣褲 ${WEAR}。在售票櫃檯購買纜車票為 ${LIFT_WINDOW}，合計 ¥20,000。`,
  },
  {
    item: "新幹線，東京 ⇄ GALA湯澤",
    price: "周遊卡，或以結帳頁面顯示的票價為準",
    note: `JR東京廣域周遊券 3 日 ${PASS_ADULT}；JR 東日本自己的試算是GALA湯澤來回加日光來回、全程指定席，${JR_EXAMPLE}。JR 東日本已於 2026 年 3 月 14 日調整票價，單程票價請選好日期後在結帳頁面確認。`,
  },
  {
    item: "纜車＋吊椅 1 日票（成人）",
    price: `線上 ${LIFT_WEB}／售票櫃檯 ${LIFT_WINDOW}`,
    note: "小學生（兒童）線上 ¥3,500／售票櫃檯 ¥4,000。學齡前兒童每位付費成人可免費帶 2 名。",
  },
  {
    item: "雙板 3 件組或單板 2 件組，1 日",
    price: SKI_SET,
    note: "小學生以下 ¥4,000。2 日剛好是 2 倍。",
  },
  {
    item: "雪衣（上衣與褲子），1 日",
    price: WEAR,
    note: "小學生以下 ¥3,000。",
  },
  {
    item: "雪鏡＋安全帽，1 日",
    price: "¥1,800＋¥2,300",
    note: "不含在裝備組內，單件租借。",
  },
  {
    item: "不滑雪的一天：纜車＋Barouche 票＋雪橇",
    price: `線上 ¥5,500＋${SLED}`,
    note: "纜車＋Barouche 票（售票櫃檯 ¥6,500）可進入纜車山頂站的玩雪樂園並搭乘 Barouche 空中吊椅；雪橇在山頂站租借。",
  },
  {
    item: "SPA GALA之湯（溫泉與泳池），成人",
    price: "¥1,500",
    note: "位於車站建築內，適合等回程列車時利用。金額來自 JR 東日本的GALA湯澤旅遊頁面。",
  },
];

const seasonRows = [
  { what: "雪道營業（雙板與單板）", detail: `${SLOPES_OPEN} → ${SLOPES_CLOSE}` },
  { what: "觀光營業期間", detail: `${SIGHTSEEING_OPEN} → 2026 年 12 月 18 日：只運行纜車與觀光吊椅，無論積雪多少都不能滑雪` },
  { what: "直達GALA湯澤的新幹線", detail: "自GALA湯澤開始營業的 2026 年 12 月 12 日起，一般谷川號延長行駛至GALA湯澤並加開臨時列車（JR 東日本，2026 年 10 月 22 日）。該公告未寫結束日期；車站只在冬季與春季營運" },
  { what: "夜間滑雪後的回程列車", detail: "谷川 198 號，GALA湯澤 20:19 → 東京 21:40，2027 年 1 月 16 日、30 日與 2 月 13 日、27 日" },
  { what: "JR SKISKI 新幹線＋纜車票套裝", detail: "JR 東日本旅遊網站仍標示「Coming Soon」，預計 2026 年 11 月中旬開放預訂" },
  { what: "每日營業時間", detail: "2026-27 雪季每日營業時間尚待官方公布；營業日期與時間可能依積雪與天候變更" },
];

const liftRows = [
  { ticket: "纜車＋吊椅 1 日票，成人", window: LIFT_WINDOW, web: LIFT_WEB, note: "基本款。可搭乘本雪季營業的兩個區域內所有纜車與吊椅。" },
  { ticket: "纜車＋吊椅 1 日票，小學生（兒童）", window: "¥4,000", web: "¥3,500", note: "售票櫃檯是成人價的一半，線上再便宜 ¥500。" },
  { ticket: "纜車＋Barouche 票，成人", window: "¥6,500", web: "¥5,500", note: "較便宜的票，只能搭乘纜車與 Barouche 4 人座吊椅。適合第一次滑雪、玩雪或短短一個下午；不適合滑遍整座山。" },
  { ticket: "纜車＋Barouche 票，小學生（兒童）", window: "¥3,400", web: "¥2,900", note: "在這座雪場讓孩子帶著纜車票上雪地最便宜的方式。" },
  { ticket: "4 小時票，成人", window: "¥7,500", web: "¥7,000", note: "在售票櫃檯只比 1 日票便宜 ¥500，所以適合晚到的日子，而不是用來省錢。" },
  { ticket: "4 小時票，小學生（兒童）", window: "¥3,500", web: "¥3,000", note: "道理相同：年紀較小的孩子一天大多也只滑 4 小時左右。" },
  { ticket: "學齡前兒童", window: "免費", web: "免費", note: "每位付費成人可免費帶 2 名；第 3 名適用小學生價格。這是雪場自己的規定。" },
];

const rentalRows = [
  { item: "雙板 3 件組（雪板、雪鞋、雪杖）", adult: `1 日 ${SKI_SET}`, child: "1 日 ¥4,000（小學生以下）", note: "2 日成人 ¥13,000、兒童 ¥8,000，剛好 2 倍，所以沒有多日優惠可等。" },
  { item: "單板 2 件組（雪板、雪鞋）", adult: `1 日 ${SKI_SET}`, child: "1 日 ¥4,000（小學生以下）", note: "不論年齡與天數，價格都與雙板組相同。" },
  { item: "雪衣（上衣與褲子）", adult: `1 日 ${WEAR}`, child: "1 日 ¥3,000（小學生以下）", note: "從東京來一日遊的旅客大多需要，卻常常沒算進預算：搭飛機穿來的外套不適合滑雪。" },
  { item: "雪鏡與安全帽", adult: "1 日雪鏡 ¥1,800、安全帽 ¥2,300", child: "價格相同", note: "2 日為 ¥3,600 與 ¥4,600。不含在裝備組內，是單件租借，所以裝備齊全的一天會比上面兩項的金額更高。" },
  { item: "PICK UP BOX", adult: "每人＋¥1,000", child: "每人＋¥1,000", note: "雪場自己的免排隊取件服務，7:30–12:00。線上預約於開幕前 1 個月開放，使用日 2 天前中午截止；僅限信用卡預付、名額有限，中午截止後取消收取 100% 手續費。租借期間為 12 月 19 日至 3 月 31 日。" },
];

const mountainRows = [
  { what: "營業雪道", detail: "全部 16 條中的 12 條：中央區 5 條、北區 6 條，以及 Falcon 滑降雪道" },
  { what: "南區（South Area）", detail: "4 條雪道於 2026-27 雪季停止營業；雪場雪道地圖頁面寫著「南エリアの営業を休止いたします」（南區暫停營業）" },
  { what: "難度分布", detail: "初級 35%、中級 45%、高級 20%（雪場公布的全山數據）" },
  { what: "吊椅與纜車", detail: "11 座，包括從車站建築出發的 8 人座 Diligence 纜車" },
  { what: "最長滑行距離", detail: "2,500 公尺，Falcon 滑降雪道" },
  { what: "海拔", detail: "山頂 1,181 公尺、山腳 358 公尺；面積 70 公頃；最大坡度 33°" },
  { what: "營業時間", detail: "2026-27 雪季每日營業時間尚待官方公布。租借自 12 月 19 日起 7:30 開門" },
];

const shapeRows = [
  {
    shape: "自行搭新幹線",
    covers: "搭車到GALA湯澤，纜車票與裝備在雪場或線上購買",
    verdict: "最適合大多數人，在雪地上的時間也最長",
    note: `最快 ${FASTEST}，車站就在建築內。代價是要自己買齊四樣：座位、纜車票、裝備、雪衣；而且GALA湯澤每一種纜車票在售票櫃檯都比線上貴至少 ¥500。`,
  },
  {
    shape: "新幹線＋JR 東日本周遊卡",
    covers: "鐵路區間使用東京廣域周遊券或 JR EAST PASS",
    verdict: "只有GALA湯澤是兩三個一日遊行程之一時才值得試算；只去GALA湯澤則不划算",
    note: `周遊卡連續 3 日 ${PASS_ADULT}，JR 東日本自己的試算（GALA湯澤來回＋日光來回，指定席）為 ${JR_EXAMPLE}。只去一天GALA湯澤達不到這個金額。`,
  },
  {
    shape: "東京出發巴士一日遊",
    covers: "前往岩原的來回交通一次預訂，玩雪、裝備租借或滑雪課程為選購項目；不含餐",
    verdict: "適合第一次滑雪，或想一次訂好、不想分開買四樣的人",
    note: "單程比新幹線慢，而且去的不是GALA湯澤，而是同一地區的鄰近雪場。這個商品的價值在於當天早上不需要再安排任何事情。",
  },
  {
    shape: "包車",
    covers: "從住宿地點直達GALA湯澤或苗場，預訂時選擇雪場",
    verdict: "適合團體、帶小孩的家庭，或需要比首班車更早出發的情況",
    note: "按車計價而非按人，4 個人分攤就不算奢侈；也是唯一能把裝備放在後車廂、不用扛著穿過東京站的方式。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "從東京怎麼去GALA湯澤滑雪場？",
    a: `從東京站搭上越新幹線（谷川號）直達GALA湯澤站，最快 ${FASTEST}，不用轉車；車站建在滑雪中心裡，纜車也從同一棟建築出發。直達列車為季節限定：自雪場開始營業的 2026 年 12 月 12 日起，JR 東日本將一般谷川號延長行駛至GALA湯澤並加開臨時列車。如果您的列車只開到越後湯澤，或在營業季以外前往，可搭雪場免費接駁車，約 10 分鐘。其他方式是東京出發的巴士一日遊（前往同屬湯澤地區的岩原滑雪場）或包車。${OWN}確認。`,
  },
  {
    q: "從東京搭新幹線到GALA湯澤要多久？",
    a: `最快 ${FASTEST}，雪場與 JR 東日本公布的時間相同。依 JR 東日本 2026 年 10 月 22 日的冬季列車公告，谷川 71 號為東京 6:24 → GALA湯澤 7:35，回程谷川 86 號為GALA湯澤 17:04 → 東京 18:20；JR 東日本的目的地介紹頁也寫搭谷川號約 1 小時 20 分鐘，所以請以單程 71 至 80 分鐘規劃。在 4 個夜間滑雪的晚上，谷川 198 號 20:19 從GALA湯澤出發，21:40 抵達東京。${OWN}確認。`,
  },
  {
    q: "JR Pass 可以搭到GALA湯澤嗎？",
    a: `可以。全國版 JAPAN RAIL PASS 可搭乘 NOZOMI 與 MIZUHO 以外的所有 JR 集團新幹線，所以前往GALA湯澤的上越新幹線也包含在內（Gran Class 需另付費用）；7 日普通車廂版線上購買為 ${JRP_7DAY}。JR東京廣域周遊券（${PASS_ADULT}，連續 3 日）與 JR EAST PASS（${EAST_PASS_5DAY}，5 日）也可以使用，JR 東日本也將GALA湯澤列為廣域周遊券的目的地之一。只去一天GALA湯澤，廣域周遊券並不划算：JR 東日本自己的試算是GALA湯澤來回加日光來回，${JR_EXAMPLE}。${OWN}確認。`,
  },
  {
    q: "GALA湯澤 2026-27 雪季什麼時候開放？",
    a: `雪道於 ${SLOPES_OPEN}開放，預計營業至 ${SLOPES_CLOSE}。${SIGHTSEEING_OPEN}至 2026 年 12 月 18 日只運行纜車與觀光吊椅，無論積雪多少都不能滑雪。直達新幹線與雪場同樣自 12 月 12 日開始。2026-27 雪季每日營業時間尚待官方公布，GALA湯澤也說明營業日期與時間可能依積雪與天候變更。${OWN}確認。`,
  },
  {
    q: "GALA湯澤適合初學者或不滑雪的人嗎？",
    a: `兩者都適合。35% 的雪道為初級，租借處就在車站建築內，也可以預訂英語滑雪課程。不滑雪的人可以購買纜車＋Barouche 票（線上 ¥5,500、售票櫃檯 ¥6,500），前往纜車山頂的玩雪樂園、租借雪橇（${SLED}），並搭乘 Barouche 空中吊椅到可眺望谷川連峰的觀景點。2026-27 雪季要注意的是南區停止營業，16 條雪道中有 12 條營業。${OWN}確認。`,
  },
];

const sameDayCards: KlookSameDayCard[] = [
  {
    kind: "列車",
    label: "東京 → GALA湯澤新幹線車票",
    ctaLabel: "查看東京 → GALA湯澤列車 →",
    url: TRAIN_URL,
    why: "纜車票不含交通：從東京或上野出發的谷川號直達座位，按日期預訂，以 QR 碼搭乘。",
  },
  {
    kind: "鐵路周遊卡",
    label: "JR東京廣域周遊券（連續 3 日）",
    ctaLabel: "查看東京廣域周遊券 →",
    url: WIDE_URL,
    why: "JR 東日本說明此周遊卡可搭乘前往GALA湯澤的新幹線；如果同樣的 3 天內還有另一個一日遊，值得試算。",
  },
  {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "GALA湯澤說明營業日期與時間會依積雪與天候變更，Klook 商品頁也要求以可上網的手機出示纜車票憑證。",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "GALA湯澤說明營業日期與時間會依積雪與天候變更，2026-27 雪季每日營業時間也尚未公布。在季節限定車站，停止營業的公告或新幹線延誤的消息只能用手機收到。",
  },
  {
    label: "成田特快（N'EX）來回車票",
    ctaLabel: "查看 N'EX 來回票 →",
    url: klookFor(naritaExpressRoundTripUrl, LOCALE),
    why: "可直達前往GALA湯澤的上越新幹線發車的東京站。如果您的東京廣域周遊券從抵達當天開始使用，就不需要：JR 東日本說明該周遊卡可搭乘 N'EX 指定席。",
  },
  {
    label: "羽田機場 – 東京利木津巴士",
    ctaLabel: "查看利木津巴士 →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "羽田機場版本，以 QR 碼上車。如果您帶著滑雪包抵達，在搭車北上之前還需要先把行李送到東京的飯店，這時就派得上用場。",
  },
  {
    label: "JR東京廣域周遊券（連續 3 日）",
    ctaLabel: "查看東京廣域周遊券 →",
    url: WIDE_URL,
    why: "真正值得試算的一項預訂。JR 東日本自己的試算是GALA湯澤來回加日光來回（指定席）約 ¥21,500，周遊卡連續 3 日 ¥16,000，所以GALA湯澤加上另一個一日遊，大致就開始划算。",
  },
  {
    label: "東京 → GALA湯澤新幹線車票",
    ctaLabel: "查看東京 → GALA湯澤列車 →",
    url: TRAIN_URL,
    why: "不用周遊卡的GALA湯澤一日：從東京或上野出發的谷川號直達座位，按日期預訂，以 QR 碼搭乘。JR 東日本加開的早班谷川 71 號（東京 6:24）只在 1 至 2 月的部分週末與假日行駛，以這班車規劃前請先確認日期。",
  },
  {
    label: "GALA湯澤滑雪場纜車票",
    ctaLabel: "查看GALA湯澤纜車票 →",
    url: LIFT_URL,
    why: "GALA湯澤的纜車＋吊椅 1 日票，成人在售票櫃檯為 ¥8,000，線上為 ¥7,500，提前購票可省 ¥500。第三方預訂平台的結帳也接受海外信用卡，介面為中文。",
  },
  {
    label: "GALA湯澤滑雪場 1 日滑雪課程",
    ctaLabel: "查看GALA湯澤滑雪課程 →",
    url: LESSON_URL,
    why: "初學者最容易忘記的一項。GALA湯澤的纜車票、裝備租借與滑雪課程都要分開購買，商品頁也寫明上課仍需另購纜車票。",
  },
];

const tourPicks = [
  withKlookLocale(yuzawaIwapparaSkiDayTourTokyo, LOCALE, {
    title: "東京出發湯澤岩原滑雪場玩雪＋滑雪一日遊",
    desc: "從東京搭來回巴士前往越後湯澤地區的岩原滑雪場，玩雪、滑雪、裝備租借與滑雪課程都可在同一筆預訂中選擇",
  }),
  withKlookLocale(galaNaebaSkiDayTripTokyo, LOCALE, {
    title: "東京出發GALA湯澤／苗場滑雪場一日遊",
    desc: "冬季從東京包車前往湯澤地區雪場的一日遊，預訂時選擇雪場",
  }),
  withKlookLocale(hakubaSkiResortDayTourTokyo, LOCALE, {
    title: "東京出發長野白馬滑雪場一日遊",
    desc: "從東京前往白馬山谷的一日遊，可從 4 座雪場中選擇，纜車票與裝備租借包含在預訂內",
  }),
  withKlookLocale(galaYuzawaSkiLesson, LOCALE, {
    title: "GALA湯澤滑雪場 1 日滑雪課程",
    desc: "在GALA湯澤由中文或英語教練指導 3 至 6 小時的雙板或單板課程；與纜車票分開預訂，商品頁也寫明仍需另購纜車票",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "GALA湯澤滑雪一日遊" }];

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
      最後確認：{OWN_ISO}。資料來源：{children}
    </p>
  );
}

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {label}
  </a>
);

export default function ZhTwGalaYuzawaSkiDayTripPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG["zh-tw"] }),
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
            日本唯一在滑雪場裡設有新幹線車站的雪場。雪道於 {SLOPES_OPEN}開放，而南區本雪季完全不營業。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "JR 東日本新幹線直達時間", "JR Pass 使用規則", "GALA湯澤官方 2026-27 價格"].map((t) => (
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
          heading="現在可以預訂哪些東京出發的GALA湯澤一日遊？"
          checkedIso={OWN_ISO}
          tours={[
            {
              title: "GALA湯澤滑雪場纜車票",
              url: LIFT_URL,
              price: null,
              duration: "滑雪一日；新幹線另外預訂",
              departs: "雪場內的GALA湯澤站",
            },
            {
              title: "東京出發GALA湯澤／苗場滑雪場一日遊",
              url: CHARTER_URL,
              price: null,
              duration: "包車 10 小時",
              departs: "東京 23 區內的飯店",
            },
            {
              title: "GALA湯澤滑雪場 1 日滑雪課程",
              url: LESSON_URL,
              price: null,
              duration: "3 至 6 小時",
              departs: "在GALA湯澤集合",
            },
          ]}
          deadline={
            <>
              雪道首次開放的 12 月 19 日至新年期間的日期，請在 11 月 30 日前預訂；12 月 12 日至 18 日只運行纜車，不能滑雪。
              1 至 2 月請至少提前 3 週預訂。截至 11 月 15 日，JR 東日本的 JR SKISKI 新幹線＋纜車票套裝仍標示「Coming Soon」，預計
              11 月中旬開放預訂；GALA湯澤的 PICK UP BOX 租借預約於開幕前 1 個月開放。
            </>
          }
          primaryCta="在 Klook 查看GALA湯澤纜車票日期與價格 →"
          primaryNote={
            <>
              在商品頁選擇滑雪日期，即可看到價格與是否開賣：GALA湯澤的雪道於 {SLOPES_OPEN}開放，2026-27 雪季每日營業時間尚未公布。
            </>
          }
        />

        <KlookSameDayCards heading="GALA湯澤同一天一起預訂的項目" cards={sameDayCards} />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>從東京站</p>
                <p className={styles.verdictStatValue}>{FASTEST}，不用轉車</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>雪道開放</p>
                <p className={styles.verdictStatValue}>2026/12/19 – 2027/5/5</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>纜車票 1 日</p>
                <p className={styles.verdictStatValue}>售票櫃檯 {LIFT_WINDOW}／線上 {LIFT_WEB}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass／廣域周遊券／JR EAST PASS</p>
                <p className={styles.verdictStatValue}>都可搭到GALA湯澤</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              從東京到GALA湯澤，請<strong>在東京站搭上越新幹線直達GALA湯澤站，最快 {FASTEST}</strong>（JR 東日本的谷川 71 號東京
              6:24 出發、7:35 抵達），車站就在滑雪中心內；但直達列車只在冬季行駛，自 <strong>{SIGHTSEEING_OPEN}</strong>起。GALA湯澤的
              <strong>雪道於 {SLOPES_OPEN}開放</strong>，營業至 {SLOPES_CLOSE}；12 月 12 日至 18 日只有纜車觀光營業。
              <strong>JAPAN RAIL PASS</strong>（7 日線上 {JRP_7DAY}）、<strong>JR東京廣域周遊券</strong>（{PASS_ADULT}，3 日）與
              <strong>JR EAST PASS</strong>（{EAST_PASS_5DAY}，5 日）都可搭乘這段列車；不帶裝備的GALA湯澤一日遊，以GALA湯澤線上價格計算另需
              <strong>¥19,500</strong>（纜車票 {LIFT_WEB}＋雙板裝備組 {SKI_SET}＋雪衣 {WEAR}）。以上於 {OWN}在GALA湯澤與 JR 東日本官方網站確認；
              2026-27 雪季每日營業時間尚待官方公布。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                GALA湯澤纜車票 →
              </KlookLink>
              <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                東京出發滑雪一日遊 →
              </KlookLink>
              <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                東京 → GALA湯澤列車 →
              </KlookLink>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看東京廣域周遊券價格 →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                GALA湯澤滑雪課程 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="同一趟旅程一起預訂"
          heading="GALA湯澤一日遊實際要預訂什麼"
          intro="先準備網路與機場交通，再來是周遊卡，最後是GALA湯澤分開販售的項目：第一次滑雪一日遊最常漏訂的是纜車票與滑雪課程。Klook 價格依日期變動，請以您的日期打開商品頁查看。"
          items={tripPrepItems}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>交通方式</span>
          <h2 className={styles.sectionTitle}>從東京怎麼去GALA湯澤滑雪場？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>從東京站搭上越新幹線直達GALA湯澤（谷川號）</strong>，最快 {FASTEST}，不用轉車，出了剪票口就是滑雪中心。直達列車為季節限定，
            {SIGHTSEEING_OPEN}起行駛；替代方案是搭新幹線到越後湯澤，再搭GALA湯澤的免費接駁車 10 分鐘；較慢的選擇是東京出發的巴士一日遊或包車。
          </p>
          <Table
            head={["路線", "所需時間", "列車／行駛期間", "費用", "注意事項"]}
            rows={accessRows.map((r) => [r.leg, r.time, r.trains, r.cost, r.note])}
          />
          <Sources>
            {ext("https://gala.co.jp/winter/access/", "gala.co.jp/winter/access/")}、
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR 東日本冬季列車公告（2026 年 10 月 22 日）")}、
            {ext("https://www.jreast.co.jp/en/multi/destinations/gala.html", "JR 東日本GALA湯澤介紹頁")}。本頁不列單程票價：JR 東日本已於 2026 年
            3 月 14 日調整票價，您日期的票價會顯示在結帳頁面。巴士行程與包車的所需時間來自 Klook 商品頁。
          </Sources>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>需要您自己按日期確認的一點</strong>，是想搭的列車在您的日期是否開到GALA湯澤：加開的早班谷川 71 號只在 1 至 2 月的部分週末與假日行駛。
            請按日期預訂座位；如果GALA湯澤是兩個一日遊行程之一，請在{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              JR東京廣域周遊券攻略（英文）
            </Link>
            中試算周遊卡。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              東京 → GALA湯澤新幹線 →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              東京出發滑雪巴士一日遊 →
            </KlookLink>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA湯澤纜車票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>所需時間</span>
          <h2 className={styles.sectionTitle}>從東京搭新幹線到GALA湯澤要多久？</h2>
          <p className={styles.bodyText}>
            <strong>最快 {FASTEST}，實際約 71 至 80 分鐘。</strong>依 JR 東日本 2026 年 10 月 22 日的公告，谷川 71 號為東京 6:24 → GALA湯澤
            7:35，回程谷川 86 號為GALA湯澤 17:04 → 東京 18:20；JR 東日本的GALA湯澤介紹頁則寫搭谷川號約 1 小時 20 分鐘。夜間滑雪的話，2027 年
            1 月 16 日、30 日與 2 月 13 日、27 日，谷川 198 號 20:19 從GALA湯澤出發，21:40 抵達東京。{OWN}確認。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>一日費用</span>
          <h2 className={styles.sectionTitle}>GALA湯澤一日遊要花多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>不帶裝備的成人在雪場約 ¥19,500，另加車資</strong>，以GALA湯澤官方 2026-27 線上價格計算。不滑雪、在玩雪樂園玩雪橇的一天為 ¥8,000。
          </p>
          <Table head={["項目", "價格", "需要知道的事"]} rows={costRows.map((r) => [r.item, r.price, r.note])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "GALA湯澤纜車票價格")}、
            {ext("https://gala.co.jp/winter/rental/", "租借")}、
            {ext("https://gala.co.jp/winter/activities/", "活動")}、
            {ext("https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html", "JR 東日本周遊卡價格")}、
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "JR 東日本旅遊網站（SPA GALA之湯）")}。
          </Sources>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA湯澤纜車票 →
            </KlookLink>
            <KlookLink href={EAST_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR EAST PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>雪季</span>
          <h2 className={styles.sectionTitle}>GALA湯澤 2026-27 雪季什麼時候開放？</h2>
          <p className={styles.bodyText}>
            <strong>雪道於 {SLOPES_OPEN}開放，預計營業至 {SLOPES_CLOSE}。</strong>前一週的 {SIGHTSEEING_OPEN}至 2026 年 12 月 18 日只有觀光營業：
            運行纜車與觀光吊椅，無論積雪多少都不能滑雙板或單板；直達新幹線也同樣在 12 月 12 日開始。GALA湯澤另外說明，營業期間與內容可能依積雪與天候變更。
            如果在 12 月 12 日至 18 日預訂想去滑雪，實際上只能搭纜車。
          </p>
          <Table head={["2026-27", "日期"]} rows={seasonRows.map((r) => [r.what, r.detail])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "gala.co.jp/winter/hours-pricing/")}、
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR 東日本（2026 年 10 月 22 日）")}、
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "JR 東日本旅遊網站")}。
          </Sources>
          <div style={{ marginTop: "1.25rem" }}>
            <Table head={["雪場", `GALA湯澤 2026-27（${OWN}確認）`]} rows={mountainRows.map((r) => [r.what, r.detail])} />
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            雪道、難度、吊椅、海拔與南區停止營業，均來自GALA湯澤官方雪道地圖頁面（
            {ext("https://gala.co.jp/winter/gelande/", "gala.co.jp/winter/gelande/")}），{OWN}確認。<strong>南區停止營業僅限 2026-27 雪季</strong>，
            較早撰寫的介紹不會提到這一點。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>纜車票</span>
          <h2 className={styles.sectionTitle}>GALA湯澤纜車票多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>成人 1 日票售票櫃檯 {LIFT_WINDOW}、線上 {LIFT_WEB}</strong>。GALA湯澤販售的每一種纜車票都有至少 ¥500 的價差，所以提前線上購票是這一天最容易省下的部分。
            真正比較便宜的選擇有兩種，4 小時票其實不算其中之一。
          </p>
          <Table head={["票種", "售票櫃檯", "線上價格", "需要知道的事"]} rows={liftRows.map((r) => [r.ticket, r.window, r.web, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            所有金額均為GALA湯澤官方 2026-27 價目表，{OWN}確認。「小學生（兒童）」即雪場的「小学生」票價。請在結帳時再次確認。GALA湯澤自 2026 年
            10 月 5 日起限量販售 1,000 張的 ¥4,300 超早鳥票已標示售罄，所以實際可買的是上表的線上價格。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA湯澤纜車票 →
            </KlookLink>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA湯澤雙板與單板課程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>裝備租借</span>
          <h2 className={styles.sectionTitle}>在GALA湯澤可以租滑雪裝備嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可以，租借處與車站在同一棟建築內，這正是從東京不帶裝備當天來回可行的原因。計算費用前要先知道，GALA湯澤的<strong>裝備與雪衣分開計價</strong>，
            雪鏡與安全帽也是另外單件租借。
          </p>
          <Table
            head={["項目", "國中生以上", "小學生以下", "需要知道的事"]}
            rows={rentalRows.map((r) => [r.item, r.adult, r.child, r.note])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>預訂前先加總一次。</strong>不帶裝備的成人線上購買纜車＋吊椅 1 日票為 {LIFT_WEB}，加上裝備組 {SKI_SET} 與雪衣 {WEAR}，還不含雪鏡、
            安全帽、新幹線與午餐。所以本頁的 Klook 商品值得與在現場逐項購買比較；而 ¥1,000 的 PICK UP BOX 是這裡唯一能換到具體好處的加購項目：
            不用在租借處排隊。所有價格均為GALA湯澤官方價格，{OWN}確認。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>初學者</span>
          <h2 className={styles.sectionTitle}>GALA湯澤適合初學者或不滑雪的人嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            兩者都適合。<strong>35% 的雪道為初級</strong>，纜車從車站建築直接載您到初級雪道的上方；不滑雪的人用較便宜的纜車＋Barouche 票，
            就能在纜車山頂的玩雪樂園與雪橇場玩。需要注意的是本雪季的情況：南區停止營業，雪場比較早的介紹所描述的小。
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>不滑雪的人</p>
              <p className={styles.whoForDesc}>
                纜車＋Barouche 票（線上 ¥5,500、售票櫃檯 ¥6,500）包含纜車、山頂站的玩雪樂園，以及前往可眺望谷川連峰的「愛之鐘」觀景點的 Barouche
                空中吊椅（10:00–16:00，約 30 分鐘）。雪橇在山頂站租借，{SLED}；玩雪區天候允許時 8:30–16:00 開放。學齡前兒童搭纜車免費。
                GALA湯澤官方活動頁面，{OWN}確認。想在離東京更近的地方玩雪橇，請看{" "}
                <Link href="/guides/attractions/tokyo-snow-day-trip" hrefLang="en" style={linkStyle}>
                  東京近郊玩雪一日遊攻略（英文）
                </Link>
                。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>有利的地方</p>
              <p className={styles.whoForDesc}>
                依雪場公布的數據，雪道為初級 35%、中級 45%、高級 20%，共 11 座吊椅與纜車，從車站走到雪道只要幾分鐘。第一次上雪地的一天，這裡是東京可當天來回的雪場中最好的選擇，
                因為出發前的交通環節幾乎不會出問題。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>本雪季不利的地方</p>
              <p className={styles.whoForDesc}>
                南區 2026-27 雪季不營業，雪場的原文是「南エリアの営業を休止いたします」。可以滑的是中央區 5 條、北區 6 條與 Falcon 滑降雪道，共 12 條。
                初學者的一天足夠，第二次來就稍嫌不足，這時也可以考慮白馬或苗場的一日遊。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>初學者容易漏訂的項目</p>
              <p className={styles.whoForDesc}>
                滑雪課程。GALA湯澤的價目表販售纜車票與租借裝備組，課程要另外預訂；Klook 商品頁也明確寫著上課仍需另購纜車票。只有纜車票與裝備、沒有教練的一天，
                就算有 35% 的初級雪道，也沒有人教您怎麼滑。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>第一天最省錢的安排</p>
              <p className={styles.whoForDesc}>
                購買纜車＋Barouche 票（售票櫃檯 ¥6,500、線上 ¥5,500），而不是 ¥8,000 的 1 日票。第一次滑雪的人不會離開纜車與 Barouche 的範圍，
                所以全山纜車票等於多付 ¥2,500 買不會搭的吊椅。雪場官方價格，{OWN}確認。
              </p>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA湯澤 1 日滑雪課程 →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              東京出發初學者巴士一日遊 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>周遊卡</span>
          <h2 className={styles.sectionTitle}>JR Pass 可以搭到GALA湯澤嗎？</h2>
          <p className={styles.bodyText}>
            <strong>可以，旅客最可能持有的三種周遊卡都能搭新幹線到GALA湯澤。</strong>全國版 <strong>JAPAN RAIL PASS</strong> 可搭乘 NOZOMI 與 MIZUHO
            以外的所有 JR 集團新幹線，所以上越新幹線也包含在內（Gran Class 需另付費用）；7 日普通車廂版線上為 <strong>{JRP_7DAY}</strong>，在海外代理商購買為
            ¥53,000。<strong>JR EAST PASS</strong> 5 日 <strong>{EAST_PASS_5DAY}</strong>、10 日 ¥50,000，可搭乘 JR 東日本所有路線。{OWN}在 japanrailpass.net
            與 JR 東日本確認。
          </p>
          <p className={styles.bodyText}>
            這趟行程三者中最便宜的是 <strong>JR東京廣域周遊券</strong>：GALA湯澤在適用範圍內，JR 東日本也將它列為周遊卡的目的地之一，可搭乘上越新幹線普通車廂指定席或自由席前往。
            價格為成人 <strong>{PASS_ADULT}</strong>、6 至 11 歲兒童 <strong>¥8,000</strong>，<strong>連續 3 日</strong>使用；這是自{" "}
            <strong>2026 年 3 月 14 日</strong>起、由 ¥15,000 與 ¥7,500 調漲後的價格。{OWN}確認。
          </p>
          <p className={styles.bodyText}>
            值得回答的問題是它<em>划不划算</em>，而 JR 東日本自己給了試算：<strong>GALA湯澤來回加上日光特急來回</strong>，全程指定席分開購買為
            <strong>{JR_EXAMPLE}</strong>，周遊卡則是 {PASS_ADULT}。請注意，這個試算是<strong>兩個</strong>一日遊。只去一天GALA湯澤達不到 {PASS_ADULT}
            的周遊卡價格，所以原則是：GALA湯澤是從東京出發的兩三個一日遊之一，就買周遊卡；只去這一個，就買單程車票。季節上的限制是：GALA湯澤站只在冬季與春季營運，
            營業季以外同一張周遊卡只能到越後湯澤。{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              JR東京廣域周遊券攻略（英文）
            </Link>
            試算了關東各一日遊的划算點，{" "}
            <Link href="/guides/transport/jr-pass-guide" hrefLang="en" style={linkStyle}>
              JR Pass 攻略（英文）
            </Link>
            則以同樣方式整理全國版周遊卡。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看東京廣域周遊券價格 →
            </KlookLink>
            <KlookLink href={EAST_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR EAST PASS（5 日或 10 日）→
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>行程或火車</span>
          <h2 className={styles.sectionTitle}>該報名行程，還是自己搭新幹線？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            想要最多的滑雪時間，就搭新幹線；想要最少的決定，就報名巴士一日遊。要先弄清楚的是，兩者去的不是同一座雪場：火車去GALA湯澤，東京出發的巴士行程則去岩原等鄰近的湯澤地區雪場。
          </p>
          <Table head={["一日安排", "包含內容", "結論", "需要知道的事"]} rows={shapeRows.map((r) => [r.shape, r.covers, r.verdict, r.note])} />
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>有一項預訂資訊現在就需要確認。</strong>截至 {OWN}，JR 東日本旅遊網站上 2026-27 雪季的 <em>JR SKISKI</em> GALA湯澤新幹線＋纜車票套裝仍標示
            「Coming Soon」，預計 2026 年 11 月中旬開放預訂。也就是說，本雪季的官方套裝目前還不能預訂，而下方第三方預訂平台的商品已在販售、接受海外信用卡，介面為中文。
            想要套裝就等到 11 月中旬；想現在先確定日期，就分開預訂。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              東京出發湯澤巴士一日遊 →
            </KlookLink>
            <KlookLink href={CHARTER_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA湯澤／苗場包車一日遊 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>冬季其他行程</span>
          <h2 className={styles.sectionTitle}>GALA湯澤一日適合搭配哪些行程？</h2>
          <p className={styles.bodyText}>
            GALA湯澤是住在東京時抽出的一天，所以請配合其他行程安排。{" "}
            <Link href="/zh-tw/guides/attractions/japan-winter-itinerary" style={linkStyle}>
              日本冬季 12 天行程
            </Link>
            說明了東京的停留如何搭配更北方與西邊的雪國。值得一起比較價格的另一個冬季一日遊是{" "}
            <Link href="/zh-tw/guides/attractions/jigokudani-snow-monkey-tour" style={linkStyle}>
              地獄谷野猿公苑雪猴行程
            </Link>
            ：上越新幹線的GALA湯澤與北陸新幹線的長野都在 JR EAST PASS 範圍內，兩個都去的話算法就不同。滑雪後可以及時回到市區，欣賞{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en" style={linkStyle}>
              東京冬季燈飾（英文）
            </Link>
            ，只需要一個晚上。
          </p>
          <p className={styles.bodyText}>
            如果您 1 月在日本，請先決定{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={linkStyle}>
              高山與白川鄉點燈行程（英文）
            </Link>
            ，再把GALA湯澤排進去，因為點燈只有固定的 4 個晚上，GALA湯澤則整季營業。如果第一天讓您想來一趟正式的滑雪週，下一步是北海道的{" "}
            <Link href="/zh-tw/guides/attractions/niseko-ski-tours" style={linkStyle}>
              二世谷滑雪行程
            </Link>
            ；不想搭飛機的話，可以在長野住幾晚：{" "}
            <Link href="/guides/attractions/hakuba-ski-tours" hrefLang="en" style={linkStyle}>
              白馬滑雪行程攻略（英文）
            </Link>
            介紹從東京搭新幹線轉巴士的方式，{" "}
            <Link href="/guides/attractions/nozawa-onsen-ski" hrefLang="en" style={linkStyle}>
              野澤溫泉滑雪攻略（英文）
            </Link>
            介紹從飯山站前往的溫泉村雪場。{" "}
            <Link href="/guides/attractions/japan-ski-trip-itinerary" hrefLang="en" style={linkStyle}>
              日本滑雪旅行行程（英文）
            </Link>
            整理了 7 天或 10 天滑雪週各地要住幾晚。2 月往北走，可以以 2027 年 2 月 4 日至 11 日的{" "}
            <Link href="/zh-tw/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>
              札幌雪祭行程
            </Link>
            為主，加上{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en" style={linkStyle}>
              札幌出發小樽一日遊（英文）
            </Link>
            ，或延伸為完整的{" "}
            <Link href="/zh-tw/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>
              北海道 7 天行程
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>滑雪之前</span>
          <h2 className={styles.sectionTitle}>旅遊保險涵蓋滑雪的那一天嗎？</h2>
          <p className={styles.bodyText}>
            請在購買纜車票之前確認，而不是之後。保單是否涵蓋雪上運動要看保單本身：例如 SafetyWing 在戴安全帽的條件下涵蓋雪道內的雙板與單板，雪道外則不在該條款內，
            其他保單可能需要附加條款。在雪地上的一天，是日本旅行中最可能產生醫療費用的一天，所以這比線上購票省下的 ¥500 更重要。{" "}
            <Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en" style={linkStyle}>
              日本滑雪旅遊保險攻略（英文）
            </Link>
            整理了常見除外條款的實際內容，以及什麼算雪道外。
          </p>
          <p className={styles.bodyText}>
            去GALA湯澤之前還有兩件事要準備。一是<strong>行動數據</strong>：雪場在公告中說明營業日期與時間會依積雪與天候變更，而支線上的季節限定車站，正是停止營業公告只能透過手機收到的地方。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              查看 Klook eSIM →
            </KlookLink>{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan" style={linkStyle}>
              日本 eSIM 推薦攻略
            </Link>
            則與其他選擇比較。二是<strong>付款方式</strong>：雪場自己的預訂流程是以日本國內信用卡為前提設計的，這也是這座雪場有第三方預訂平台的一大原因。
          </p>
        </section>

        <p className={styles.bodyText}>
          前往GALA湯澤的新幹線從東京站出發，因此{" "}
          <Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en" style={linkStyle}>
            東京住宿區域攻略（英文）
          </Link>
          建議以一日遊為主的旅程住在東京站一帶。
        </p>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="GALA湯澤滑雪場常見問題" />

        <KlookTourPicks
          heading="從東京可以當天來回的其他滑雪行程"
          intro="GALA湯澤是最快的，但不是唯一的選擇。湯澤地區積雪不足、南區停止營業讓 12 條雪道顯得太少，或您想一次訂好而不是分開買四樣時，可以考慮以下行程。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/jigokudani-snow-monkey-tour", title: "地獄谷野猿公苑 2026：交通、門票、東京出發一日遊" },
            { href: "/guides/transport/jr-east-pass", title: "JR East Pass（2026）：價格、範圍與是否划算（英文）" },
            { href: "/guides/transport/tokyo-wide-pass", title: "JR東京廣域周遊券 2026：價格、範圍與是否划算（英文）" },
            { href: "/guides/money/best-travel-insurance-japan", title: "日本旅遊保險推薦 2026：誰需要什麼（英文）" },
            { href: "/guides/money/japan-ski-travel-insurance", title: "日本滑雪旅遊保險：一般保單不保什麼（英文）" },
            { href: "/zh-tw/guides/attractions/niseko-ski-tours", title: "二世谷滑雪行程 2026-27" },
            { href: "/zh-tw/guides/attractions/japan-winter-itinerary", title: "日本冬季 12 天行程（2027）" },
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山與白川鄉行程（2027）：從哪裡出發（英文）" },
            { href: "/zh-tw/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭行程（2027）" },
            { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出發小樽一日遊（2027）（英文）" },
            { href: "/zh-tw/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 天行程" },
            { href: "/guides/attractions/tokyo-illumination-tours", title: "東京燈飾：日期、時間與免費景點（英文）" },
            { href: "/guides/attractions/tokyo-snow-day-trip", title: "東京近郊玩雪一日遊（2026-27）（英文）" },
            { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "東京出發輕井澤一日遊（2026）：新幹線、Outlet 與雪（英文）" },
            { href: "/zh-tw/guides/esim/best-esim-japan", title: "日本 eSIM 推薦（2026）" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>從東京 {FASTEST}，以及要買的三樣東西</h2>
            <p className={styles.ctaBannerDesc}>
              雪道於 {SLOPES_OPEN}開放。纜車票售票櫃檯 {LIFT_WINDOW}、線上 {LIFT_WEB}，裝備另計，滑雪課程也另計，所以建議先買周遊卡，再訂課程。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看東京廣域周遊券價格 →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看GALA湯澤滑雪課程 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
