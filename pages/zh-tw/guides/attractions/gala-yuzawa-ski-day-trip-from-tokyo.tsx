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
    leg: "最推薦：東京站 → GALA 湯澤站，上越新幹線直達（谷川號）",
    time: `最快 ${FASTEST}，例如谷川 71 號東京 6:24 → GALA 湯澤 7:35；JR 東日本的景點介紹頁面也指出，搭谷川號約需 1 小時 20 分鐘`,
    trains: "季節限定：自 2026 年 12 月 12 日起，JR 東日本將谷川號定期班次延駛至 GALA 湯澤，並加開臨時班次；途中停靠上野與大宮",
    cost: `可使用 JAPAN RAIL PASS、JR東京廣域周遊券（${PASS_ADULT}）與 JR EAST PASS；若未持有周遊卡，新幹線票價以結帳頁面為準`,
    note: "GALA 湯澤站是建在滑雪中心裡的季節限定新幹線車站，出了驗票閘門，即可在同一棟建築內購買纜車票及租借裝備。不用搭巴士、不用轉車、不用搭計程車。並非所有谷川號班次都行駛至 GALA 湯澤，請選擇終點站為 GALA 湯澤的班次。",
  },
  {
    leg: "東京站 → 越後湯澤站，再轉免費接駁車",
    time: "搭新幹線到越後湯澤，再搭雪場免費接駁車約 10 分鐘",
    trains: "越後湯澤站是全年營運的上越新幹線車站，位於 GALA 湯澤的前一站",
    cost: "接駁車免費；鐵路區間同樣可使用上述三種周遊卡",
    note: "若想搭的直達列車客滿或當天未行駛，可改走此路線，也是 GALA 湯澤營業季以外唯一的交通方式：依 JR 東日本的說明，GALA 湯澤站只在冬季與春季營運，越後湯澤則是前一站、全年營運的車站。",
  },
  {
    leg: "東京出發的滑雪巴士一日遊",
    time: "從東京出發至返回東京共 11 至 12.5 小時",
    trains: "依商品頁面上標示的出發日期",
    cost: "依人數計費，依日期而定；請在商品頁面選擇您的日期查看",
    note: "這是不同的行程，而非比較便宜的方案：巴士行程前往同屬湯澤地區的岩原滑雪場，而不是 GALA 湯澤；可一次預訂來回交通，可另外加購裝備租借與滑雪課程。比新幹線慢，但不需要自己安排任何事情。",
  },
  {
    leg: "包車前往 GALA 湯澤或苗場",
    time: "10 小時包車，提供住宿地點來回接送",
    trains: "業者開放預訂的日期",
    cost: "以車輛為單位計費，依日期而定；請在商品頁面查看",
    note: "適合帶著裝備的家庭或團體，或需要比首班車更早出發的情況。預訂時選擇雪場，同一個包車方案可選擇前往 GALA 湯澤或苗場。",
  },
];

const costRows = [
  {
    item: "未自備裝備的成人滑雪或單板一日（纜車票＋裝備組＋雪衣，線上價格）",
    price: "¥19,500＋車資",
    note: `大多數一日遊旅客所需的預算：纜車票 ${LIFT_WEB}＋雙板或單板滑雪裝備組 ${SKI_SET}＋雪衣及雪褲 ${WEAR}。在售票櫃檯購買纜車票為 ${LIFT_WINDOW}，合計 ¥20,000。`,
  },
  {
    item: "新幹線，東京 ⇄ GALA 湯澤",
    price: "周遊卡，或以結帳頁面顯示的票價為準",
    note: `JR東京廣域周遊券 3 日 ${PASS_ADULT}；根據 JR 東日本提供的試算範例，GALA 湯澤來回加日光來回、全程指定席為 ${JR_EXAMPLE}。JR 東日本已於 2026 年 3 月 14 日調整票價，單程票價請選好日期後在結帳頁面確認。`,
  },
  {
    item: "纜車＋吊椅 1 日票（成人）",
    price: `線上 ${LIFT_WEB}／售票櫃檯 ${LIFT_WINDOW}`,
    note: "小學生（兒童）線上 ¥3,500／售票櫃檯 ¥4,000。每位付費成人可免費攜帶 2 名學齡前兒童。",
  },
  {
    item: "雙板 3 件組或單板 2 件組，1 日",
    price: SKI_SET,
    note: "小學生以下 ¥4,000。2 日租金為 1 日的 2 倍。",
  },
  {
    item: "雪衣及雪褲（1 日租借）",
    price: WEAR,
    note: "小學生以下 ¥3,000。",
  },
  {
    item: "雪鏡＋安全帽，1 日",
    price: "¥1,800＋¥2,300",
    note: "不含在裝備組內，須另外租借。",
  },
  {
    item: "玩雪一日（不滑雪）：纜車＋Barouche 票＋雪橇",
    price: `線上 ¥5,500＋${SLED}`,
    note: "纜車＋Barouche 票（售票櫃檯 ¥6,500）可進入纜車山頂站的玩雪樂園並搭乘 Barouche 吊椅式纜車；可在山頂站租借雪橇。",
  },
  {
    item: "SPA GALA 之湯（溫泉與游泳池），成人",
    price: "¥1,500",
    note: "位於車站大樓內，適合在等回程列車時前往。金額來自 JR 東日本的 GALA 湯澤旅遊頁面。",
  },
];

const seasonRows = [
  { what: "雪道開放期間（雙板與單板）", detail: `${SLOPES_OPEN} → ${SLOPES_CLOSE}` },
  { what: "觀光開放期間", detail: `${SIGHTSEEING_OPEN} → 2026 年 12 月 18 日：僅開放纜車與觀光吊椅，無論積雪多少都不能滑雪` },
  { what: "直達 GALA 湯澤的新幹線", detail: "自 GALA 湯澤開始營業的 2026 年 12 月 12 日起，谷川號定期班次延駛至 GALA 湯澤，並加開臨時班次（JR 東日本，2026 年 10 月 22 日）。該公告未載明行駛結束日期；車站只在冬季與春季營運" },
  { what: "夜間滑雪後的回程列車", detail: "谷川 198 號，GALA 湯澤 20:19 → 東京 21:40，2027 年 1 月 16 日、30 日與 2 月 13 日、27 日" },
  { what: "JR SKISKI 新幹線＋纜車票套裝行程", detail: "JR 東日本旅遊網站仍標示「Coming Soon」，預計 2026 年 11 月中旬開放預訂" },
  { what: "每日營業時間", detail: "2026-27 雪季的每日營業時間尚待官方公布；營業日期與時間可能依積雪與天候變更" },
];

const liftRows = [
  { ticket: "纜車＋吊椅 1 日票，成人", window: LIFT_WINDOW, web: LIFT_WEB, note: "標準一日券。可搭乘本雪季開放的兩個區域內所有纜車與吊椅。" },
  { ticket: "纜車＋吊椅 1 日票，小學生（兒童）", window: "¥4,000", web: "¥3,500", note: "臨櫃購票為成人票價的一半，線上購票再省 ¥500。" },
  { ticket: "纜車＋Barouche 票，成人", window: "¥6,500", web: "¥5,500", note: "較便宜的票，只能搭乘纜車與 Barouche 4 人座吊椅。適合初次滑雪、玩雪，或只想滑一個短短的下午；不適合想滑遍所有雪道的旅客。" },
  { ticket: "纜車＋Barouche 票，小學生（兒童）", window: "¥3,400", web: "¥2,900", note: "這是讓孩子在這座雪場使用纜車上雪地最便宜的選擇。" },
  { ticket: "4 小時票，成人", window: "¥7,500", web: "¥7,000", note: "在售票櫃檯只比 1 日票便宜 ¥500，因此較適合晚到的旅客，而非用來省錢。" },
  { ticket: "4 小時票，小學生（兒童）", window: "¥3,500", web: "¥3,000", note: "同樣地，年紀較小的孩子一天大多也只滑 4 小時左右。" },
  { ticket: "學齡前兒童", window: "免費", web: "免費", note: "每位付費成人可免費攜帶 2 名；第 3 名起須購買小學生票。此為滑雪場的規定。" },
];

const rentalRows = [
  { item: "雙板 3 件組（雙板滑雪板、滑雪鞋、雪杖）", adult: `1 日 ${SKI_SET}`, child: "1 日 ¥4,000（小學生以下）", note: "2 日租金成人 ¥13,000、兒童 ¥8,000，正好是 1 日的 2 倍，因此沒有多日租借優惠。" },
  { item: "單板 2 件組（單板滑雪板、滑雪鞋）", adult: `1 日 ${SKI_SET}`, child: "1 日 ¥4,000（小學生以下）", note: "不同年齡及租借天數的費用，皆與雙板滑雪裝備組相同。" },
  { item: "雪衣及雪褲", adult: `1 日 ${WEAR}`, child: "1 日 ¥3,000（小學生以下）", note: "多數從東京來一日遊的旅客都需要，卻常忘了列入預算：搭機時穿的一般外套不適合滑雪。" },
  { item: "雪鏡與安全帽", adult: "1 日雪鏡 ¥1,800、安全帽 ¥2,300", child: "價格相同", note: "2 日為 ¥3,600 與 ¥4,600。不含在裝備組內，兩者須另外租借，因此裝備齊全的一日租金會高於上面兩項。" },
  { item: "PICK UP BOX", adult: "每人＋¥1,000", child: "每人＋¥1,000", note: "滑雪場提供的免排隊裝備領取服務，7:30–12:00。線上預約於雪場開放前 1 個月開放，預約截止時間為使用日前 2 天的中午；僅限信用卡預付、名額有限，截止後取消將收取 100% 取消手續費。此服務提供期間為 12 月 19 日至 3 月 31 日。" },
];

const mountainRows = [
  { what: "開放雪道", detail: "全場 16 條雪道中開放 12 條：中央區 5 條、北區 6 條，以及 Falcon 滑降雪道" },
  { what: "南區（South Area）", detail: "4 條雪道於 2026-27 雪季暫停開放；滑雪場官方雪道地圖頁面載明「南エリアの営業を休止いたします」（南區暫停營業）" },
  { what: "難度分布", detail: "初級 35%、中級 45%、高級 20%（滑雪場公布的全場雪道統計）" },
  { what: "吊椅與纜車", detail: "11 座，包括從車站建築出發的 8 人座 Diligence 纜車" },
  { what: "最長滑行距離", detail: "2,500 公尺，Falcon 滑降雪道" },
  { what: "海拔", detail: "山頂 1,181 公尺、山腳 358 公尺；面積 70 公頃；最大坡度 33°" },
  { what: "營業時間", detail: "2026-27 雪季的每日營業時間尚待官方公布。裝備租借自 12 月 19 日起每日 7:30 開始營業" },
];

const shapeRows = [
  {
    shape: "自行搭新幹線",
    covers: "自行搭車前往 GALA 湯澤，纜車票與裝備租借在雪場或線上預訂",
    verdict: "最適合多數旅客，能保留的滑雪時間也最長",
    note: `最快 ${FASTEST}，車站就在建築內。缺點是須自行安排四項：新幹線座位、纜車票、裝備租借及雪衣租借；而且 GALA 湯澤每一種纜車票在售票櫃檯都比線上貴至少 ¥500。`,
  },
  {
    shape: "新幹線＋JR 東日本周遊卡",
    covers: "鐵路區間使用東京廣域周遊券或 JR EAST PASS",
    verdict: "只有安排包含 GALA 湯澤在內的兩三個一日遊時，才值得比較費用；只去 GALA 湯澤則不划算",
    note: `周遊卡連續 3 日 ${PASS_ADULT}，JR 東日本提供的試算範例（GALA 湯澤來回＋日光來回，指定席）為 ${JR_EXAMPLE}。若只安排 GALA 湯澤一日遊，來回車資達不到這個金額。`,
  },
  {
    shape: "東京出發巴士一日遊",
    covers: "可一次預訂前往岩原滑雪場的來回交通，玩雪活動、裝備租借或滑雪課程皆可另外加購；不含餐",
    verdict: "適合第一次滑雪，或希望一次完成預訂、不想分別安排四項的旅客",
    note: "單程所需時間比新幹線長，而且去的不是 GALA 湯澤，而是同一地區的鄰近雪場。此行程的優點是當天早上不必再安排任何事。",
  },
  {
    shape: "包車",
    covers: "從住宿地點直達 GALA 湯澤或苗場，預訂時選擇雪場",
    verdict: "適合團體、帶小孩的家庭，或需要比首班車更早出發的情況",
    note: "以車輛計費而非按人數，4 人分攤就不算貴；也是唯一能把裝備放在後車廂、不必扛著滑雪裝備穿越東京站的交通方式。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "從東京怎麼去 GALA 湯澤滑雪場？",
    a: `從東京站搭上越新幹線（谷川號）直達 GALA 湯澤站，最快 ${FASTEST}，不用轉車；車站建在滑雪中心裡，纜車也從同一棟建築出發。直達列車僅於特定季節行駛：自雪場開始營業的 2026 年 12 月 12 日起，JR 東日本將谷川號定期班次延駛至 GALA 湯澤，並加開臨時班次。若您搭乘的列車終點站為越後湯澤站，或在 GALA 湯澤站營運季以外前往，可搭雪場免費接駁車，約 10 分鐘。其他方式是東京出發的巴士一日遊（前往同屬湯澤地區的岩原滑雪場）或包車。${OWN}確認。`,
  },
  {
    q: "從東京搭新幹線到 GALA 湯澤要多久？",
    a: `最快 ${FASTEST}，滑雪場與 JR 東日本公布的車程時間一致。依 JR 東日本 2026 年 10 月 22 日的冬季列車公告，谷川 71 號為東京 6:24 → GALA 湯澤 7:35，回程谷川 86 號為 GALA 湯澤 17:04 → 東京 18:20；JR 東日本的景點介紹頁面也指出，搭谷川號約需 1 小時 20 分鐘，因此建議以單程 71 至 80 分鐘規劃行程。在開放夜間滑雪的 4 個晚上，谷川 198 號 20:19 從 GALA 湯澤出發，21:40 抵達東京。${OWN}確認。`,
  },
  {
    q: "可以用 JR Pass 搭新幹線前往 GALA 湯澤嗎？",
    a: `可以。全國版 JAPAN RAIL PASS 可搭乘 NOZOMI 與 MIZUHO 以外的所有 JR 集團新幹線，因此也適用於前往 GALA 湯澤的上越新幹線（Gran Class（特等車廂）須另行付費）；7 日普通車廂周遊卡的線上售價為 ${JRP_7DAY}。JR東京廣域周遊券（${PASS_ADULT}，連續 3 日）與 JR EAST PASS（${EAST_PASS_5DAY}，5 日）也可以使用，JR 東日本也將 GALA 湯澤列為廣域周遊券的適用目的地之一。若只安排 GALA 湯澤一日遊，廣域周遊券並不划算：根據 JR 東日本提供的試算範例，GALA 湯澤來回加日光來回為 ${JR_EXAMPLE}。${OWN}確認。`,
  },
  {
    q: "GALA 湯澤 2026-27 雪季何時開始營業？",
    a: `雪道於 ${SLOPES_OPEN}開放，預計營業至 ${SLOPES_CLOSE}。${SIGHTSEEING_OPEN}至 2026 年 12 月 18 日僅開放纜車與觀光吊椅，無論積雪多少都不能滑雪。直達新幹線自 12 月 12 日起行駛，滑雪場也於同日開始營業。2026-27 雪季的每日營業時間尚待官方公布，GALA 湯澤也說明營業日期與時間可能依積雪與天候變更。${OWN}確認。`,
  },
  {
    q: "GALA 湯澤適合初學者或不滑雪的人嗎？",
    a: `兩者都適合。初級雪道占全場的 35%，租借處就在車站建築內，也可以預訂英語滑雪課程。不滑雪的人可以購買纜車＋Barouche 票（線上 ¥5,500、售票櫃檯 ¥6,500），前往纜車山頂站的玩雪樂園、租借雪橇（租金 ${SLED}），並搭乘 Barouche 吊椅式纜車到可遠眺谷川連峰的觀景台。2026-27 雪季要注意的是南區暫停開放，16 條雪道中有 12 條開放。${OWN}確認。`,
  },
];

const sameDayCards: KlookSameDayCard[] = [
  {
    kind: "列車",
    label: "東京 → GALA 湯澤新幹線車票",
    ctaLabel: "查看東京 → GALA 湯澤列車 →",
    url: TRAIN_URL,
    why: "纜車票不含交通：從東京或上野出發的谷川號直達列車座位，選擇乘車日期預訂，憑 QR 碼搭車。",
  },
  {
    kind: "鐵路周遊卡",
    label: "JR東京廣域周遊券（連續 3 日）",
    ctaLabel: "查看東京廣域周遊券 →",
    url: WIDE_URL,
    why: "JR 東日本說明此周遊卡可搭乘前往 GALA 湯澤的新幹線；如果同一個 3 天有效期間內還安排了其他一日遊，就值得比較費用。",
  },
  {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "GALA 湯澤說明營業日期與時間會依積雪與天候變更，Klook 商品頁也要求以可上網的手機出示纜車票憑證。",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "GALA 湯澤說明營業日期與時間會依積雪與天候變更，2026-27 雪季每日營業時間也尚未公布。前往季節限定營運的車站時，停業公告或新幹線誤點資訊只能透過手機接收。",
  },
  {
    label: "成田特快（N'EX）來回車票",
    ctaLabel: "查看 N'EX 來回票 →",
    url: klookFor(naritaExpressRoundTripUrl, LOCALE),
    why: "可直達東京站，再從東京站搭上越新幹線前往 GALA 湯澤。如果您的東京廣域周遊券從抵達當天開始使用，就不需要：JR 東日本說明該周遊卡可搭乘 N'EX 指定席。",
  },
  {
    label: "羽田機場 – 東京利木津巴士",
    ctaLabel: "查看利木津巴士 →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "羽田機場出發的車票，憑 QR 碼上車。如果您攜帶滑雪裝備袋抵達，在搭車北上之前還需要先把行李送到東京的飯店，這時就派得上用場。",
  },
  {
    label: "JR東京廣域周遊券（連續 3 日）",
    ctaLabel: "查看東京廣域周遊券 →",
    url: WIDE_URL,
    why: "值得先比較費用的鐵路周遊卡。根據 JR 東日本提供的試算範例，GALA 湯澤來回加日光來回（指定席）約 ¥21,500，周遊卡連續 3 日 ¥16,000，因此除了 GALA 湯澤再安排另一個一日遊，通常就划算。",
  },
  {
    label: "東京 → GALA 湯澤新幹線車票",
    ctaLabel: "查看東京 → GALA 湯澤列車 →",
    url: TRAIN_URL,
    why: "不使用周遊卡的 GALA 湯澤一日遊：從東京或上野出發的谷川號直達列車座位，選擇乘車日期預訂，憑 QR 碼搭車。JR 東日本加開的早班谷川 71 號（東京 6:24）只在 1 至 2 月的部分週末與假日行駛，若打算搭這班列車，請先確認行駛日期。",
  },
  {
    label: "GALA 湯澤滑雪場纜車票",
    ctaLabel: "查看 GALA 湯澤纜車票 →",
    url: LIFT_URL,
    why: "GALA 湯澤的纜車＋吊椅 1 日票，成人臨櫃購票為 ¥8,000，線上購票為 ¥7,500，提前購票可省 ¥500。第三方預訂平台提供中文介面，並接受海外信用卡付款。",
  },
  {
    label: "GALA 湯澤滑雪場 1 日滑雪課程",
    ctaLabel: "查看 GALA 湯澤滑雪課程 →",
    url: LESSON_URL,
    why: "初學者最容易忘記預訂的項目。GALA 湯澤的纜車票、裝備租借與滑雪課程都要分開購買，商品頁面也說明，參加課程仍須另購纜車票。",
  },
];

const tourPicks = [
  withKlookLocale(yuzawaIwapparaSkiDayTourTokyo, LOCALE, {
    title: "東京出發湯澤岩原滑雪場玩雪＋滑雪一日遊",
    desc: "從東京搭來回巴士前往越後湯澤地區的岩原滑雪場，玩雪、滑雪、裝備租借與滑雪課程都可在同一筆預訂中選擇",
  }),
  withKlookLocale(galaNaebaSkiDayTripTokyo, LOCALE, {
    title: "東京出發 GALA 湯澤／苗場滑雪場一日遊",
    desc: "冬季從東京包車前往湯澤地區雪場的一日遊，預訂時選擇雪場",
  }),
  withKlookLocale(hakubaSkiResortDayTourTokyo, LOCALE, {
    title: "東京出發長野白馬滑雪場一日遊",
    desc: "從東京出發的白馬山谷（Hakuba Valley）一日遊，可從 4 座滑雪場中擇一前往，行程費用包含纜車票與裝備租借",
  }),
  withKlookLocale(galaYuzawaSkiLesson, LOCALE, {
    title: "GALA 湯澤滑雪場 1 日滑雪課程",
    desc: "在 GALA 湯澤由中文或英語教練指導的雙板或單板課程，時間為 3 至 6 小時；與纜車票分開預訂，商品頁也寫明仍需另購纜車票",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "GALA 湯澤滑雪一日遊" }];

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
            日本唯一設有新幹線車站的滑雪場。雪道於 {SLOPES_OPEN}開放，本雪季南區全面暫停開放。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "JR 東日本新幹線直達所需時間", "JR Pass 使用規則", "GALA 湯澤官方 2026-27 價格"].map((t) => (
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
          heading="現在可以預訂哪些東京出發的 GALA 湯澤一日遊？"
          checkedIso={OWN_ISO}
          tours={[
            {
              title: "GALA 湯澤滑雪場纜車票",
              url: LIFT_URL,
              price: null,
              duration: "一日滑雪行程；新幹線車票須另外預訂",
              departs: "雪場內的 GALA 湯澤站",
            },
            {
              title: "東京出發 GALA 湯澤／苗場滑雪場一日遊",
              url: CHARTER_URL,
              price: null,
              duration: "包車 10 小時",
              departs: "東京 23 區內的飯店",
            },
            {
              title: "GALA 湯澤滑雪場 1 日滑雪課程",
              url: LESSON_URL,
              price: null,
              duration: "3 至 6 小時",
              departs: "在 GALA 湯澤集合",
            },
          ]}
          deadline={
            <>
              若計畫於雪道開放首日（12 月 19 日）至新年期間前往，請在 11 月 30 日前預訂；12 月 12 日至 18 日只運行纜車，不能滑雪。
              1 至 2 月請至少提前 3 週預訂。截至 11 月 15 日，JR 東日本的 JR SKISKI 新幹線＋纜車票套裝行程仍標示「Coming Soon」，預計
              11 月中旬開放預訂；GALA 湯澤的 PICK UP BOX 裝備租借於雪場開放前 1 個月開始接受預約。
            </>
          }
          primaryCta="在 Klook 查看 GALA 湯澤纜車票的可預訂日期與價格 →"
          primaryNote={
            <>
              在商品頁選擇滑雪日期，即可查看價格及是否開放預訂：GALA 湯澤的雪道於 {SLOPES_OPEN}開放，2026-27 雪季每日營業時間尚未公布。
            </>
          }
        />

        <KlookSameDayCards heading="GALA 湯澤一日遊的搭配預訂推薦" cards={sameDayCards} />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>重點速覽</span>
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
                <p className={styles.verdictStatLabel}>1 日纜車票</p>
                <p className={styles.verdictStatValue}>售票櫃檯 {LIFT_WINDOW}／線上 {LIFT_WEB}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass／廣域周遊券／JR EAST PASS</p>
                <p className={styles.verdictStatValue}>皆適用於前往 GALA 湯澤的新幹線</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              從東京到 GALA 湯澤，請<strong>在東京站搭上越新幹線直達 GALA 湯澤站，最快 {FASTEST}</strong>（JR 東日本谷川 71 號於東京站
              6:24 發車、7:35 抵達 GALA 湯澤），車站就在滑雪中心內；但直達列車只在冬季行駛，自 <strong>{SIGHTSEEING_OPEN}</strong>起。GALA 湯澤的
              <strong>雪道於 {SLOPES_OPEN}開放</strong>，營業至 {SLOPES_CLOSE}；12 月 12 日至 18 日僅開放搭乘纜車觀光。
              <strong>JAPAN RAIL PASS</strong>（7 日線上 {JRP_7DAY}）、<strong>JR東京廣域周遊券</strong>（{PASS_ADULT}，3 日）與
              <strong>JR EAST PASS</strong>（{EAST_PASS_5DAY}，5 日）都可搭乘這段列車；若未自備裝備，依 GALA 湯澤官方線上價格計算，一日遊另需
              <strong>¥19,500</strong>（纜車票 {LIFT_WEB}＋雙板裝備組 {SKI_SET}＋雪衣 {WEAR}）。以上於 {OWN}在 GALA 湯澤與 JR 東日本官方網站確認；
              2026-27 雪季的每日營業時間尚待官方公布。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                GALA 湯澤纜車票 →
              </KlookLink>
              <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                東京出發滑雪一日遊 →
              </KlookLink>
              <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                東京 → GALA 湯澤列車 →
              </KlookLink>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看東京廣域周遊券價格 →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                GALA 湯澤滑雪課程 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="同一趟旅程一起預訂"
          heading="GALA 湯澤一日遊需要預訂哪些項目？"
          intro="先準備網路與機場交通，再來是周遊卡，最後再預訂 GALA 湯澤須分開購買的項目：首次安排滑雪一日遊時，最常漏訂的是纜車票與滑雪課程。Klook 價格依日期變動，請至商品頁面選擇您的出發日期查看。"
          items={tripPrepItems}
        />

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="yuzawa" />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>交通方式</span>
          <h2 className={styles.sectionTitle}>從東京怎麼去 GALA 湯澤滑雪場？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>從東京站搭上越新幹線直達 GALA 湯澤（谷川號）</strong>，最快 {FASTEST}，不用轉車，出了驗票閘門就是滑雪中心。直達列車僅於特定季節行駛，
            {SIGHTSEEING_OPEN}起行駛；替代方案是搭新幹線到越後湯澤，再搭 GALA 湯澤的免費接駁車，車程約 10 分鐘；速度較慢的選擇是從東京出發的巴士一日遊或包車。
          </p>
          <Table
            head={["路線", "所需時間", "列車／行駛期間", "費用", "注意事項"]}
            rows={accessRows.map((r) => [r.leg, r.time, r.trains, r.cost, r.note])}
          />
          <Sources>
            {ext("https://gala.co.jp/winter/access/", "gala.co.jp/winter/access/")}、
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR 東日本冬季列車公告（2026 年 10 月 22 日）")}、
            {ext("https://www.jreast.co.jp/en/multi/destinations/gala.html", "JR 東日本 GALA 湯澤介紹頁")}。本頁不列單程票價：JR 東日本已於 2026 年
            3 月 14 日調整票價，您所選日期的票價會顯示在結帳頁面。巴士行程與包車的所需時間來自 Klook 商品頁。
          </Sources>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>需要按日期確認的一點</strong>，是您想搭的列車在乘車日是否行駛至 GALA 湯澤：加開的早班谷川 71 號只在 1 至 2 月的部分週末與假日行駛。
            請按日期預訂座位；如果您安排了包含 GALA 湯澤在內的兩個一日遊，請在{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              JR東京廣域周遊券攻略（英文）
            </Link>
            中比較周遊卡的費用。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              東京 → GALA 湯澤新幹線 →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              東京出發滑雪巴士一日遊 →
            </KlookLink>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 湯澤纜車票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>所需時間</span>
          <h2 className={styles.sectionTitle}>從東京搭新幹線到 GALA 湯澤要多久？</h2>
          <p className={styles.bodyText}>
            <strong>最快 {FASTEST}，實際車程約 71 至 80 分鐘。</strong>依 JR 東日本 2026 年 10 月 22 日的公告，谷川 71 號為東京 6:24 → GALA 湯澤
            7:35，回程谷川 86 號為 GALA 湯澤 17:04 → 東京 18:20；JR 東日本的 GALA 湯澤介紹頁則寫搭谷川號約 1 小時 20 分鐘。夜間滑雪的話，2027 年
            1 月 16 日、30 日與 2 月 13 日、27 日，谷川 198 號 20:19 從 GALA 湯澤出發，21:40 抵達東京。{OWN}確認。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>一日費用</span>
          <h2 className={styles.sectionTitle}>GALA 湯澤一日遊要花多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>未自備裝備的成人在雪場約花 ¥19,500，另加車資</strong>，以 GALA 湯澤官方 2026-27 線上價格計算。若不滑雪、只在玩雪樂園玩雪橇，一日費用為 ¥8,000。
          </p>
          <Table head={["項目", "價格", "費用說明"]} rows={costRows.map((r) => [r.item, r.price, r.note])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "GALA 湯澤纜車票價格")}、
            {ext("https://gala.co.jp/winter/rental/", "租借")}、
            {ext("https://gala.co.jp/winter/activities/", "活動")}、
            {ext("https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html", "JR 東日本周遊卡價格")}、
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "JR 東日本旅遊網站（SPA GALA 之湯）")}。
          </Sources>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 湯澤纜車票 →
            </KlookLink>
            <KlookLink href={EAST_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR EAST PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>雪季</span>
          <h2 className={styles.sectionTitle}>GALA 湯澤 2026-27 雪季何時開始營業？</h2>
          <p className={styles.bodyText}>
            <strong>雪道於 {SLOPES_OPEN}開放，預計營業至 {SLOPES_CLOSE}。</strong>雪道開放前一週，即 {SIGHTSEEING_OPEN}至 2026 年 12 月 18 日，僅提供觀光服務：
            運行纜車與觀光吊椅，無論積雪多寡，均不開放雙板及單板滑雪；直達新幹線也將於 12 月 12 日開始行駛。GALA 湯澤另外說明，營業期間與內容可能依積雪與天候變更。
            如果在 12 月 12 日至 18 日預訂想去滑雪，實際上只能搭纜車。
          </p>
          <Table head={["2026-27", "日期"]} rows={seasonRows.map((r) => [r.what, r.detail])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "gala.co.jp/winter/hours-pricing/")}、
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR 東日本（2026 年 10 月 22 日）")}、
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "JR 東日本旅遊網站")}。
          </Sources>
          <div style={{ marginTop: "1.25rem" }}>
            <Table head={["雪場", `GALA 湯澤 2026-27（${OWN}確認）`]} rows={mountainRows.map((r) => [r.what, r.detail])} />
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            雪道、難度、吊椅、海拔與南區暫停開放，均來自 GALA 湯澤官方雪道地圖頁面（
            {ext("https://gala.co.jp/winter/gelande/", "gala.co.jp/winter/gelande/")}），{OWN}確認。<strong>南區暫停開放僅限 2026-27 雪季</strong>，
            較早發布的攻略不會提到這一點。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>纜車票</span>
          <h2 className={styles.sectionTitle}>GALA 湯澤纜車票多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>成人 1 日票售票櫃檯 {LIFT_WINDOW}、線上 {LIFT_WEB}</strong>。GALA 湯澤各種纜車票的線上與臨櫃價格至少相差 ¥500，因此提前線上購票是一日遊最容易省錢的方式。
            價格較低的票券主要有兩種，4 小時票並不在其中。
          </p>
          <Table head={["票種", "售票櫃檯", "線上價格", "需要知道的事"]} rows={liftRows.map((r) => [r.ticket, r.window, r.web, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            所有金額均為 GALA 湯澤官方 2026-27 價目表，{OWN}確認。「小學生（兒童）」即雪場的「小学生」票價。請在結帳時再次確認。GALA 湯澤自 2026 年
            10 月 5 日起限量販售 1,000 張的 ¥4,300 超早鳥票已標示售罄，因此目前可購買的是上表的線上價格。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 湯澤纜車票 →
            </KlookLink>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 湯澤雙板與單板課程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>裝備租借</span>
          <h2 className={styles.sectionTitle}>在 GALA 湯澤可以租滑雪裝備嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可以，滑雪裝備租借處位於車站大樓內，因此即使未自備裝備，也能從東京當天來回。估算預算前須先了解，GALA 湯澤的<strong>滑雪裝備與雪衣須分開計費</strong>，
            雪鏡與安全帽也須另外租借。
          </p>
          <Table
            head={["項目", "國中生以上", "小學生以下", "需要知道的事"]}
            rows={rentalRows.map((r) => [r.item, r.adult, r.child, r.note])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>預訂前先估算整體費用。</strong>未自備裝備的成人線上購買纜車＋吊椅 1 日票為 {LIFT_WEB}，加上裝備組 {SKI_SET} 與雪衣 {WEAR}，還不含雪鏡、
            安全帽、新幹線與午餐。因此，建議比較本頁的 Klook 商品與在現場分開購買的費用；而 ¥1,000 的 PICK UP BOX 是這裡唯一有明確好處的加購服務：
            可省去在租借處排隊的時間。所有價格均為 GALA 湯澤官方價格，{OWN}確認。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>初學者</span>
          <h2 className={styles.sectionTitle}>GALA 湯澤適合初學者或不滑雪的人嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            兩者都適合。<strong>初級雪道占全場的 35%</strong>，搭乘車站大樓內的纜車即可直達初級雪道上方；不滑雪的旅客可購買價格較低的纜車＋Barouche 票，
            即可在纜車山頂站的玩雪樂園與雪橇場遊玩。需要注意的是本雪季的情況：南區暫停開放，實際可滑的範圍比較早的介紹所描述的小。
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>不滑雪的人</p>
              <p className={styles.whoForDesc}>
                纜車＋Barouche 票（線上 ¥5,500、售票櫃檯 ¥6,500）包含纜車、山頂站的玩雪樂園，以及前往可遠眺谷川連峰的「愛之鐘」觀景台的 Barouche
                吊椅式纜車（10:00–16:00，約 30 分鐘）。山頂站提供雪橇租借，費用 {SLED}；玩雪區在天候允許時開放 8:30–16:00。學齡前兒童搭纜車免費。
                GALA 湯澤官方活動頁面，{OWN}確認。想在離東京更近的地方玩雪橇，請看{" "}
                <Link href="/guides/attractions/tokyo-snow-day-trip" hrefLang="en" style={linkStyle}>
                  東京近郊玩雪一日遊攻略（英文）
                </Link>
                。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>優點</p>
              <p className={styles.whoForDesc}>
                依雪場公布的數據，雪道難度分布為初級 35%、中級 45%、高級 20%，共 11 座吊椅與纜車，從車站走到雪道只要幾分鐘。初次體驗滑雪的一日，這裡是東京可當天來回的雪場中最好的選擇，
                因為前往雪場的交通安排簡單，幾乎不會出問題。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>本雪季的缺點</p>
              <p className={styles.whoForDesc}>
                南區 2026-27 雪季暫停開放，雪場的原文是「南エリアの営業を休止いたします」。本雪季開放中央區 5 條、北區 6 條及 Falcon 滑降雪道，共 12 條。
                對初學者的一日行程已足夠，但再次造訪時雪道選擇可能稍嫌不足，這時也可以考慮白馬或苗場的一日遊。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>初學者容易漏訂的項目</p>
              <p className={styles.whoForDesc}>
                滑雪課程。GALA 湯澤的價目表列有纜車票與租借裝備組的費用，課程要另外預訂；Klook 商品頁也明確寫著上課仍需另購纜車票。如果只有纜車票與裝備、沒有安排教練，
                即使初級雪道占 35%，也沒有人教您怎麼滑。
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>初次滑雪最省錢的安排</p>
              <p className={styles.whoForDesc}>
                購買纜車＋Barouche 票（售票櫃檯 ¥6,500、線上 ¥5,500），而不是 ¥8,000 的 1 日票。初次滑雪的旅客不會滑出纜車與 Barouche 吊椅可到達的範圍，
                因此購買全區纜車票，等於多花 ¥2,500 在用不到的吊椅上。雪場官方價格，{OWN}確認。
              </p>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 湯澤 1 日滑雪課程 →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              東京出發初學者巴士一日遊 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>周遊卡</span>
          <h2 className={styles.sectionTitle}>可以用 JR Pass 搭新幹線前往 GALA 湯澤嗎？</h2>
          <p className={styles.bodyText}>
            <strong>可以，旅客最常使用的三種周遊卡，皆適用於前往 GALA 湯澤的新幹線。</strong>全國版 <strong>JAPAN RAIL PASS</strong> 可搭乘 NOZOMI 與 MIZUHO
            以外的所有 JR 集團新幹線，因此也適用於上越新幹線（Gran Class（特等車廂）須另行付費）；7 日普通車廂周遊卡的線上售價為 <strong>{JRP_7DAY}</strong>，在海外代理商購買為
            ¥53,000。<strong>JR EAST PASS</strong> 5 日 <strong>{EAST_PASS_5DAY}</strong>、10 日 ¥50,000，可搭乘 JR 東日本所有路線。{OWN}在 japanrailpass.net
            與 JR 東日本確認。
          </p>
          <p className={styles.bodyText}>
            就這趟行程而言，三者中價格最低的是 <strong>JR東京廣域周遊券</strong>：GALA 湯澤在適用範圍內，JR 東日本也將 GALA 湯澤列為這款周遊卡的適用目的地之一，可搭乘上越新幹線普通車廂指定席或自由席前往。
            價格為成人 <strong>{PASS_ADULT}</strong>、6 至 11 歲兒童 <strong>¥8,000</strong>，<strong>連續 3 日</strong>使用；以上為自{" "}
            <strong>2026 年 3 月 14 日</strong>起調漲後的票價，原價分別為 ¥15,000 與 ¥7,500。{OWN}確認。
          </p>
          <p className={styles.bodyText}>
            要比較的是這款周遊卡是否<em>划算</em>，JR 東日本已提供試算範例：<strong>GALA 湯澤來回加上日光特急來回</strong>，若全程搭指定席並分開購票，費用<strong>{JR_EXAMPLE}</strong>，周遊卡則是 {PASS_ADULT}。請注意，此試算包含<strong>兩個</strong>一日遊。若只安排 GALA 湯澤一日遊，來回車資達不到 {PASS_ADULT}
            的周遊卡價格，所以原則是：若從東京安排兩三個一日遊、其中包含 GALA 湯澤，就買周遊卡；只去這一處，就按區間單獨購票。季節性限制如下：GALA 湯澤站只在冬季與春季營運，
            在車站營運季以外，同一張周遊卡只能搭到越後湯澤站。{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              JR東京廣域周遊券攻略（英文）
            </Link>
            比較了關東各一日遊在什麼條件下購買周遊卡較划算，{" "}
            <Link href="/guides/transport/jr-pass-guide" hrefLang="en" style={linkStyle}>
              JR Pass 攻略（英文）
            </Link>
            則以相同方式分析全國版周遊卡是否划算。
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
          <span className={styles.sectionLabel}>跟團一日遊或自行搭車</span>
          <h2 className={styles.sectionTitle}>該參加一日遊行程，還是自行搭新幹線？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            想保留最多滑雪時間，建議搭新幹線；想減少自行安排的麻煩，建議參加巴士一日遊。要先弄清楚的是，兩者去的不是同一座雪場：搭新幹線前往 GALA 湯澤，東京出發的巴士行程則去岩原等鄰近的湯澤地區雪場。
          </p>
          <Table head={["一日遊方式", "包含內容", "結論", "需要知道的事"]} rows={shapeRows.map((r) => [r.shape, r.covers, r.verdict, r.note])} />
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>預訂前須特別確認以下資訊。</strong>截至 {OWN}，JR 東日本旅遊網站上 2026-27 雪季的 <em>JR SKISKI</em> GALA 湯澤新幹線＋纜車票套裝仍標示
            「Coming Soon」，預計 2026 年 11 月中旬開放預訂。也就是說，本雪季的官方套裝行程目前尚未開放預訂，而下方第三方預訂平台的商品已開放預訂，提供中文介面並接受海外信用卡。
            若想購買官方套裝行程，須等到 11 月中旬；若想現在就確定日期，可先分開預訂。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              東京出發湯澤巴士一日遊 →
            </KlookLink>
            <KlookLink href={CHARTER_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              GALA 湯澤／苗場包車一日遊 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>冬季其他行程</span>
          <h2 className={styles.sectionTitle}>GALA 湯澤一日遊適合搭配哪些行程？</h2>
          <p className={styles.bodyText}>
            GALA 湯澤適合安排在東京住宿期間的一日遊，可與其他行程搭配規劃。{" "}
            <Link href="/zh-tw/guides/attractions/japan-winter-itinerary" style={linkStyle}>
              日本冬季 12 天行程
            </Link>
            介紹如何將東京停留行程與北部、西部的雪國旅遊結合。另一個值得一併比較交通費用的冬季一日遊是{" "}
            <Link href="/zh-tw/guides/attractions/jigokudani-snow-monkey-tour" style={linkStyle}>
              地獄谷野猿公苑雪猴行程
            </Link>
            ：搭上越新幹線前往 GALA 湯澤，以及搭北陸新幹線前往長野，皆適用 JR EAST PASS；若兩地都去，交通費用的計算方式就不同。滑雪結束後仍來得及回到東京市區，欣賞{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en" style={linkStyle}>
              東京冬季點燈活動（英文）
            </Link>
            ，只需安排一個晚上。
          </p>
          <p className={styles.bodyText}>
            如果您 1 月前往日本，請先確定{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={linkStyle}>
              高山與白川鄉點燈行程（英文）
            </Link>
            ，再把 GALA 湯澤排進去，因為點燈只有固定的 4 個晚上，GALA 湯澤則整季營業。如果初次滑雪後，您想安排一週的正式滑雪旅行，下一步是北海道的{" "}
            <Link href="/zh-tw/guides/attractions/niseko-ski-tours" style={linkStyle}>
              二世谷滑雪行程
            </Link>
            ；不想搭飛機的話，可以在長野住幾晚：{" "}
            <Link href="/guides/attractions/hakuba-ski-tours" hrefLang="en" style={linkStyle}>
              白馬滑雪行程攻略（英文）
            </Link>
            介紹如何從東京搭新幹線再轉巴士前往，{" "}
            <Link href="/guides/attractions/nozawa-onsen-ski" hrefLang="en" style={linkStyle}>
              野澤溫泉滑雪攻略（英文）
            </Link>
            介紹從飯山站前往溫泉村滑雪場的方式。{" "}
            <Link href="/guides/attractions/japan-ski-trip-itinerary" hrefLang="en" style={linkStyle}>
              日本滑雪旅行行程（英文）
            </Link>
            整理了 7 天或 10 天滑雪行程中各地適合住幾晚。若 2 月計畫前往北海道，可將 2027 年 2 月 4 日至 11 日的{" "}
            <Link href="/zh-tw/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>
              札幌雪祭行程
            </Link>
            作為主要行程，加上{" "}
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
          <span className={styles.sectionLabel}>滑雪前的準備事項</span>
          <h2 className={styles.sectionTitle}>旅遊保險有保障滑雪一日遊嗎？</h2>
          <p className={styles.bodyText}>
            請務必在購買纜車票前確認。雪上運動是否納入保障，須視個別保單條款而定：例如 SafetyWing 在配戴安全帽的情況下，保障於雪道內進行的雙板及單板滑雪；雪道外滑雪則不在保障範圍內，
            其他保單可能須另外附加相關條款。滑雪當天，是日本旅遊期間最可能產生醫療費用的日子，所以這比線上購票省下的 ¥500 更重要。{" "}
            <Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en" style={linkStyle}>
              日本滑雪旅遊保險攻略（英文）
            </Link>
            整理常見的除外責任條款，並說明哪些情況屬於雪道外滑雪。
          </p>
          <p className={styles.bodyText}>
            去 GALA 湯澤之前還有兩件事要準備。一是<strong>行動數據</strong>：雪場在公告中說明營業日期與時間會依積雪與天候變更，前往位於支線、僅於特定季節營運的車站時，停業公告只能透過手機接收。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              查看 Klook eSIM →
            </KlookLink>{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan" style={linkStyle}>
              日本 eSIM 推薦攻略
            </Link>
            則與其他選擇比較。二是<strong>付款方式</strong>：滑雪場的官方預訂流程以日本國內發行的信用卡為前提，這也是這座雪場透過第三方平台提供預訂的主要原因之一。
          </p>
        </section>

        <p className={styles.bodyText}>
          前往 GALA 湯澤的新幹線從東京站出發，因此{" "}
          <Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en" style={linkStyle}>
            東京住宿區域攻略（英文）
          </Link>
          建議以一日遊為主的旅客住在東京站一帶。
        </p>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="GALA 湯澤滑雪場常見問題" />

        <KlookTourPicks
          heading="其他可從東京當天來回的滑雪行程"
          intro="GALA 湯澤是從東京最快抵達的滑雪場，但不是唯一的選擇。如果湯澤地區積雪不足、南區暫停開放後覺得 12 條雪道不夠多，或希望一次完成預訂、不想分別安排四項，可以考慮以下行程。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/jigokudani-snow-monkey-tour", title: "地獄谷野猿公苑 2026：交通、門票、東京出發一日遊" },
            { href: "/guides/transport/jr-east-pass", title: "JR East Pass（2026）：價格、範圍與是否划算（英文）" },
            { href: "/guides/transport/tokyo-wide-pass", title: "JR東京廣域周遊券 2026：價格、範圍與是否划算（英文）" },
            { href: "/guides/money/best-travel-insurance-japan", title: "日本旅遊保險推薦 2026：如何依需求選擇保障方案（英文）" },
            { href: "/guides/money/japan-ski-travel-insurance", title: "日本滑雪旅遊保險：一般保單不保障哪些項目？（英文）" },
            { href: "/zh-tw/guides/attractions/niseko-ski-tours", title: "二世谷滑雪行程 2026-27" },
            { href: "/zh-tw/guides/attractions/japan-winter-itinerary", title: "日本冬季 12 天行程（2027）" },
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山與白川鄉行程（2027）：出發地點與交通方式（英文）" },
            { href: "/zh-tw/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭行程（2027）" },
            { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出發小樽一日遊（2027）（英文）" },
            { href: "/zh-tw/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 天行程" },
            { href: "/guides/attractions/tokyo-illumination-tours", title: "東京燈飾：日期、時間與免費景點（英文）" },
            { href: "/guides/attractions/tokyo-snow-day-trip", title: "東京近郊玩雪一日遊（2026-27）（英文）" },
            { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "東京出發輕井澤一日遊（2026）：新幹線、Outlet 購物與雪景（英文）" },
            { href: "/zh-tw/guides/esim/best-esim-japan", title: "日本 eSIM 推薦（2026）" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>從東京出發只需 {FASTEST}：滑雪前須預訂的三個項目</h2>
            <p className={styles.ctaBannerDesc}>
              雪道於 {SLOPES_OPEN}開放。纜車票臨櫃購買為 {LIFT_WINDOW}，線上購買為 {LIFT_WEB}；裝備租借與滑雪課程皆須另外付費，因此建議先購買周遊卡，再預訂滑雪課程。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看東京廣域周遊券價格 →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 GALA 湯澤滑雪課程 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
