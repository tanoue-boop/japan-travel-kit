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
import {
  hakoneCruiseCableCarTour,
  hakoneFreepass,
  hakoneFreepassTripPrep,
  hakoneLoopBusTour,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import HotelStayBlock from "../../../../components/HotelStayBlock";

// Mirrors the English page (/guides/attractions/hakone-free-pass) section by section as of
// 2026-11-24 (task-jtk-20261124-TR01): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added.
// Title term: 箱根周遊券 — the name on Hakone Navi's own Traditional Chinese page
// (hakonenavi.jp/international/tw/discount_passes/free_pass) and in Taiwan / Hong Kong results.
// Body text is kept on one line per paragraph: a JSX line break inside Chinese text renders as a space.

// R17 (2026-11-27, task-jtk-20261127-R17): the ride-by-ride break-even table, the route table
// and the 1-day-or-2-day table mirror the English page with the same figures and sources.
const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/hakone-free-pass";
const TITLE = "箱根周遊券 2026：新宿出發票價與是否划算";
const H1 = "箱根周遊券 2026：新宿出發票價、路線與是否划算";
const DESC =
  "箱根周遊券 2026：新宿出發2日券 ¥7,100、小田原 ¥6,000，8種交通工具無限搭乘。環狀路線單程票合計 ¥8,322，當天來回也省 ¥1,222。";

const CHECKED_ISO = "2026-11-27";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const BUY_CHECKED_ISO = "2026-11-27";
const BUY_CHECKED = dateLabel(BUY_CHECKED_ISO, LOCALE);
const LOOP_URL = "https://www.hakonenavi.jp/international/en/article/4252";
const JR_URL = "https://odakyu-global.com/blog/2053/";
const LOOP_REGULAR = "¥8,322";
const LOOP_SAVING = "¥1,222";
const NAVI_URL = "https://www.hakonenavi.jp/international/en/discount_passes/free_pass";
const ODAKYU_URL = "https://www.odakyu.jp/english/passes/hakone/";
const FARE_NOTICE_URL = "https://www.hakonenavi.jp/international/en/wp-content/uploads/sites/2/2025/09/re_price202510.pdf";
const BREAKDOWN_URL = "https://www.hakonenavi.jp/feature/22866";
const LP_URL = "https://www.hakonenavi.jp/lp/hakone-freepass/";
const ROPEWAY_URL = "https://www.hakonenavi.jp/international/en/transportation/hakone-ropeway";
const CRUISE_URL = "https://www.hakonenavi.jp/international/en/transportation/hakone-kankosen";
const ITINERARY_URL = "https://hakonetrip.odakyu-global.com/feature/hakone-2-day-itinerary/";

const PASS_2_DAY_SHINJUKU = "¥7,100";
const PASS_3_DAY_SHINJUKU = "¥7,500";
const PASS_2_DAY_ODAWARA = "¥6,000";
const PASS_3_DAY_ODAWARA = "¥6,400";
const ROMANCECAR = "¥1,200";
const ROPEWAY = "¥2,000";
const CRUISE = "¥1,700";

const HAKONE_PASS_URL = klookFor(hakoneFreepass.url, LOCALE);
const HAKONE_TOUR_URL = klookFor(hakoneLoopBusTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  { pass: "大多數從東京出發的旅客：新宿出發 2 日券", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "新宿出發（含小田急線來回）", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "小田原出發（僅限箱根地區）", d2a: PASS_2_DAY_ODAWARA, d2c: "¥1,500", d3a: PASS_3_DAY_ODAWARA, d3c: "¥1,750" },
  { pass: "町田出發", d2a: "¥6,820", d2c: "¥1,600", d3a: "¥7,220", d3c: "¥1,850" },
  { pass: "藤澤出發", d2a: "¥7,050", d2c: "¥1,600", d3a: "¥7,450", d3c: "¥1,850" },
];

const buyRows = [
  {
    where: "簡單來說",
    ticket: "同行每個人都有智慧型手機，就在出發前線上購票",
    when: "若同行孩童沒有自己的手機，請在小田急線車站購買實體票",
    note: "電子票券儲存在智慧型手機中（同行者一起搭乘時，可透過 For Group 選項將最多 4 張票券存在同一支手機中）；實體票則人人都能使用。",
  },
  {
    where: "EMot 線上購票（小田急官方網站）",
    ticket: "QR Code 電子票券，僅限智慧型手機使用",
    when: "出發前線上購買",
    note: "同行者一起搭乘時，可透過 For Group 選項將最多 4 張票券存在同一支手機中。透過 EMot 預訂浪漫特快座位比在車站買便宜 ¥50。只有票券上顯示退款按鈕時才能退款。",
  },
  {
    where: "小田急線各站（售票機）與小田急旅遊服務中心",
    ticket: "實體票",
    when: "小田急線車站於使用日前 1 個月開始販售；售票機僅販售當天開始使用的周遊券",
    note: "售票機可用現金、PASMO／Suica，以及 American Express、Diners Club、JCB、Mastercard、Visa 付款。",
  },
  {
    where: "7-ELEVEN（7-Ticket）",
    ticket: "用店內多功能事務機列印的實體票",
    when: "出發前",
    note: "不收取開票手續費。含小田急線來回的周遊券只賣新宿出發。",
  },
  {
    where: "在箱根當地：箱根登山鐵道售票機與箱根登山巴士服務處",
    ticket: "實體票",
    when: "當天",
    note: "售票機設在箱根湯本、強羅、早雲山等登山鐵道各站；巴士服務處在小田原站、箱根湯本、元箱根、箱根町、仙石、桃源台與宮城野。",
  },
  {
    where: "Klook",
    ticket: "透過 Klook 預訂同一張小田急周遊券",
    when: "出發前線上購買",
    note: "提供中文結帳頁面，並支援海外發行的信用卡付款。憑證兌換方式及取消規定，請參閱商品頁面說明。",
  },
];

const coverageRows = [
  {
    mode: "小田急線（新宿 ⇄ 小田原）",
    included: "✓ 來回各 1 次",
    note: "僅限新宿出發的周遊券，途中可下車。小田原出發的周遊券不含這段。",
  },
  { mode: "箱根登山電車（小田原／箱根湯本 ⇄ 強羅）", included: "✓ 不限次數", note: "採用之字形折返方式爬坡的登山鐵道，是從箱根湯本出發的環狀路線第一段。" },
  { mode: "箱根登山纜車（強羅 ⇄ 早雲山）", included: "✓ 不限次數", note: "通往空中纜車起點站的登山纜車。" },
  { mode: "箱根空中纜車（早雲山 ⇄ 大涌谷 ⇄ 桃源台）", included: "✓ 不限次數", note: `經過大涌谷的空中纜車單程 ${ROPEWAY}，是整條環狀路線中單程票價最高的交通工具。` },
  { mode: "箱根海賊觀光船（蘆之湖）", included: "✓ 不限次數", note: `從桃源台到箱根町或元箱根，沒有周遊券時單程 ${CRUISE}。特別艙須另付費用。` },
  { mode: "箱根登山巴士（指定區間）", included: "✓ 不限次數", note: "走完環狀路線、返回箱根湯本或小田原時搭乘。" },
  { mode: "觀光景點巡迴巴士（KANKO SHISETSU-MEGURI）", included: "✓ 不限次數", note: "由箱根登山巴士與小田急高速巴士營運，往返各觀光景點。" },
  { mode: "小田急高速巴士（指定區間）", included: "✓ 不限次數", note: "已預約座位的乘客可優先上車，因此可能客滿。" },
  { mode: "東海巴士（指定區間）", included: "✓ 不限次數", note: "只能在指定區間內使用。" },
  { mode: "特急浪漫特快", included: "✗ 不含", note: `需另購特急券：新宿到箱根湯本成人 ${ROMANCECAR}、兒童 ¥600。` },
  { mode: "伊豆箱根巴士", included: "✗ 不含", note: "屬於不同業者。上車前請先確認是哪一家巴士公司。" },
];

const fareRows: ReactNode[][] = [
  ["結論", "環狀路線的第 7 段、也就是回新宿的電車，周遊券就回本", LOOP_REGULAR, `比 ${PASS_2_DAY_SHINJUKU} 的周遊券多 ${LOOP_SAVING}`],
  ["1. 小田急線＋登山線", "新宿 → 箱根湯本", "¥1,261", "¥1,261"],
  ["2. 箱根登山電車", "箱根湯本 → 雕刻之森（強羅的前一站）", "¥460", "¥1,721"],
  ["3. 箱根登山纜車", "強羅 → 早雲山", "¥430", "¥2,151"],
  ["4. 箱根空中纜車", "早雲山 → 大涌谷 → 桃源台", ROPEWAY, "¥4,151"],
  ["5. 箱根海賊觀光船", "桃源台 → 元箱根", CRUISE, "¥5,851"],
  ["6. 箱根登山巴士", "元箱根 → 箱根湯本", "¥1,210", "¥7,061——仍比周遊券少 ¥39"],
  ["7. 小田急線＋登山線", "箱根湯本 → 新宿", "¥1,261", `${LOOP_REGULAR}——周遊券已回本`],
  ["新宿出發 2 日券", "用周遊券走同一條路線", PASS_2_DAY_SHINJUKU, `一天省 ${LOOP_SAVING}`],
  ["新宿出發 3 日券", "用周遊券走同一條路線", PASS_3_DAY_SHINJUKU, "一天省 ¥822"],
  ["箱根Navi 的兩天行程", "環狀路線加上前往美術館與濕生花園的 4 段巴士", "¥10,622", `用 ${PASS_2_DAY_SHINJUKU} 的周遊券省 ¥3,522`],
  ["小田原出發周遊券，只算第 2–6 段", "從箱根湯本繞一圈再回來", "¥5,800", `比 ${PASS_2_DAY_ODAWARA} 的周遊券少 ¥200——加上小田原 ⇄ 箱根湯本的電車或第二天就回本`],
];

const routeRows: ReactNode[][] = [
  ["整條環狀路線", "箱根湯本 → 強羅 → 早雲山 → 大涌谷 → 桃源台 → 元箱根 → 箱根湯本", "搭乘時間約 2.5–3 小時，另加轉乘與停留時間", "✓ 每一段都可用"],
  ["1. 浪漫特快或小田急線", "新宿 → 箱根湯本", "浪漫特快直達約 80 分鐘；一般列車通常在小田原轉車", `✓ 小田急線（新宿出發版，來回一次）· ✗ 浪漫特快座位費 +${ROMANCECAR}`],
  ["2. 箱根登山電車", "箱根湯本 → 強羅（之字形折返）", "到雕刻之森約 40 分鐘，下一站就是強羅", "✓"],
  ["3. 箱根登山纜車", "強羅 → 早雲山", "約 10 分鐘", "✓"],
  ["4. 箱根空中纜車", "早雲山 → 大涌谷 → 姥子 → 桃源台", "每段約 15 分鐘，在大涌谷換車", "✓"],
  ["5. 箱根海賊觀光船", "桃源台 → 箱根町或元箱根", "約 25–35 分鐘", "✓（特別船艙 +¥800）"],
  ["6. 箱根登山巴士", "元箱根 → 箱根湯本", "約 40 分鐘（H 線）或 35 分鐘（K 線）", "✓ · ✗ 伊豆箱根巴士"],
  ["7. 小田急線或浪漫特快", "箱根湯本 → 新宿", "同第 1 段", "✓ 小田急線 · ✗ 浪漫特快座位費"],
];

const passChoiceRows: ReactNode[][] = [
  ["結論：箱根周遊券沒有 1 日券", "走完整條環狀路線的話，只玩一天也買 2 日券", `新宿出發 ${PASS_2_DAY_SHINJUKU}，比單買便宜 ${LOOP_SAVING}`],
  ["箱根周遊券（2 日或 3 日）", "完整環狀路線、在箱根住一晚，或兩者都要", `新宿出發 ${PASS_2_DAY_SHINJUKU}／${PASS_3_DAY_SHINJUKU}，小田原出發 ${PASS_2_DAY_ODAWARA}／${PASS_3_DAY_ODAWARA}`],
  ["大涌谷 2 日券（Owakudani 2-Day Pass）", "只去大涌谷與空中纜車：登山電車、登山纜車與全線空中纜車，強羅公園免費入園——不含海賊觀光船與巴士", "小田原出發成人 ¥5,000、兒童 ¥1,300"],
  ["觀光船＆空中纜車周遊券（1 日）", "開車前往：只含空中纜車與蘆之湖海賊觀光船", "成人 ¥5,000、兒童 ¥1,400"],
  ["單程票", "只到箱根湯本泡溫泉、吃午餐", "每段分開付費"],
];

const worthRows = [
  {
    plan: "箱根兩天，在溫泉旅館住一晚",
    verdict: "✓ 買 2 日券",
    why: `這張周遊券的票價就是針對這類行程設計的。新宿出發 ${PASS_2_DAY_SHINJUKU}，包含小田急線來回，兩天內皆可搭乘環狀路線上的各段交通工具。`,
  },
  {
    plan: "從東京當天來回，走完這條環狀路線",
    verdict: "✓ 一樣划算",
    why: `依箱根Navi 計算，從新宿出發走完環狀路線以 IC 卡一般車資計為 ${LOOP_REGULAR}，因此 ${PASS_2_DAY_SHINJUKU} 的周遊券就算只用第一天也能省 ${LOOP_SAVING}。小田急也表示當天來回也划算。`,
  },
  {
    plan: "搭新幹線抵達小田原，或已經住在箱根",
    verdict: "✓ 買小田原出發的周遊券",
    why: `不包含不需要搭乘的小田急線來回車資，所以是 ${PASS_2_DAY_ODAWARA}，而不是 ${PASS_2_DAY_SHINJUKU}。在箱根內可搭的 8 種交通工具相同。`,
  },
  {
    plan: "只到箱根湯本泡溫泉、吃午餐",
    verdict: "✗ 不用買",
    why: "不搭空中纜車和海賊觀光船，車資加起來不到周遊券的價格。各段交通費分開支付即可。",
  },
  {
    plan: "想走完環狀路線，但不想自己查時刻表",
    verdict: "✗ 改參加一日遊",
    why: "搭乘有導遊帶領的觀光巴士，依固定時間出發前往大涌谷與蘆之湖，當天晚上回到東京。這和交通周遊券是不同的商品。",
  },
];

const formatRows = [
  { item: "該選哪一種", digital: "同行每個人都有智慧型手機、想避開車站排隊時選電子票", paper: "孩童使用兒童專用手機，或不想依賴手機電量時選實體票" },
  { item: "購買地點", digital: "EMot 線上購票，僅限智慧型手機", paper: "小田急旅遊服務中心或車站售票機" },
  { item: "付款", digital: "線上付款", paper: "售票機可用現金、PASMO／Suica，以及 American Express、Diners Club、JCB、Mastercard、Visa" },
  { item: "多人同行", digital: "用 For Group 選項，一支手機最多 4 張；必須一起行動，進出閘門時，先掃描同行者的票券，最後再掃描自己的票券", paper: "每人一張實體票" },
  { item: "兒童", digital: "6–11 歲付兒童票價，未滿 6 歲不需購票。電子周遊券無法用於日本的兒童專用手機", paper: "6–11 歲付兒童票價，未滿 6 歲不需購票" },
  { item: "退款", digital: "只有票券上顯示退款按鈕時才能退款；因天候停駛的路段，可透過 EMot 客服辦理退費", paper: "若遇停駛，可在最後搭乘的車站辦理退費，僅退還未搭乘路段的車資" },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年箱根周遊券多少錢？",
    a: `新宿出發 2 日券成人 ${PASS_2_DAY_SHINJUKU}、兒童（6–11 歲）¥1,600，3 日券為 ${PASS_3_DAY_SHINJUKU}／¥1,850。只含箱根地區的小田原出發周遊券，2 日券 ${PASS_2_DAY_ODAWARA}／¥1,500，3 日券 ${PASS_3_DAY_ODAWARA}／¥1,750。以上價格自 2025 年 10 月 1 日起適用，於 ${CHECKED} 在 hakonenavi.jp 與 odakyu.jp 查核。`,
  },
  {
    q: "箱根周遊券划算嗎？",
    a: `走完整條環狀路線就划算，只玩一天也一樣。依箱根Navi 的單程票價，從新宿出發的環狀路線——小田急線單程 ¥1,261（來回各一次）、登山電車 ¥460、登山纜車 ¥430、空中纜車 ${ROPEWAY}、蘆之湖海賊觀光船 ${CRUISE}、回程巴士 ¥1,210——合計 ${LOOP_REGULAR}，2 日券是 ${PASS_2_DAY_SHINJUKU}，省 ${LOOP_SAVING}；箱根Navi 的兩天行程則省 ¥3,522。周遊券在第 7 段（回程電車）回本。只去箱根湯本的話並不划算。${CHECKED} 查核。`,
  },
  {
    q: "箱根周遊券在哪裡買？",
    a: `可在小田急的 EMot 線上購票（QR Code 電子票券，僅限智慧型手機使用）、小田急線車站售票機與小田急旅遊服務中心（實體票）、7-ELEVEN 的 7-Ticket、小田急旅行社門市，以及箱根當地的箱根登山鐵道售票機與箱根登山巴士服務處購買。小田急車站於使用日前 1 個月開始販售；售票機僅販售當天開始使用的周遊券。Klook 也有販售，可用中文頁面結帳。${BUY_CHECKED} 查核。`,
  },
  {
    q: "箱根周遊券包含浪漫特快嗎？",
    a: `不包含。新宿出發的周遊券含小田急線來回一次，但特急浪漫特快需另購特急券：新宿到箱根湯本單程成人 ${ROMANCECAR}、兒童 ¥600，從小田原出發則是 ¥200／¥100。直達車程約 80 分鐘，透過 EMot 線上預訂座位便宜 ¥50。小田急官方提供的試算範例：周遊券 ${PASS_2_DAY_SHINJUKU} + 浪漫特快來回 ¥2,400 = ¥9,500。${CHECKED} 查核。`,
  },
  {
    q: "1 日還是 2 日：該買哪一種箱根周遊券？",
    a: `箱根周遊券沒有 1 日券，只有 2 日券與 3 日券。走完整條環狀路線的話，只玩一天也買 2 日券（新宿出發 ${PASS_2_DAY_SHINJUKU}），因為比單買便宜 ${LOOP_SAVING}。只去大涌谷、不去蘆之湖時，大涌谷 2 日券（小田原出發 ¥5,000）含登山電車、登山纜車與空中纜車；開車前往的話，1 日有效的觀光船＆空中纜車周遊券是 ¥5,000。${CHECKED} 依小田急箱根票價公告與箱根Navi 查核。`,
  },
];

const tripPrepItems = [
  withKlookLocale(hakoneFreepassTripPrep[0], LOCALE, {
    label: "箱根大涌谷、蘆之湖與箱根神社巴士一日遊",
    ctaLabel: "查看箱根一日遊 →",
    why: "周遊券沒有 1 日券。若只從東京出發玩一天，有導遊帶領的巴士一次就能遊覽大涌谷與蘆之湖。",
  }),
  withKlookLocale(hakoneFreepassTripPrep[1], LOCALE, {
    label: "箱根住宿一覽",
    ctaLabel: "查看箱根住宿 →",
    why: "2 日券可用到第二天的末班車，在箱根住一晚，就能充分利用周遊券第二天的效期。",
  }),
  withKlookLocale(hakoneFreepassTripPrep[2], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "電子版周遊券是手機上的 QR Code，空中纜車與海賊觀光船的營運狀況，最方便的方式是在搭乘當天早上用手機查看。",
  }),
];

const tourPicks = [
  withKlookLocale(hakoneLoopBusTour, LOCALE, {
    title: "箱根大涌谷、蘆之湖與箱根神社巴士一日遊",
    desc: "從東京出發、由導遊帶領的巴士沿箱根環狀路線遊覽，含空中纜車與海賊觀光船。",
  }),
  withKlookLocale(hakoneCruiseCableCarTour, LOCALE, {
    title: "箱根遊船、纜車與大涌谷一日遊",
    desc: "搭遊船遊蘆之湖、搭空中纜車越過火山谷，並安排溫泉行程，一次預訂從東京出發的全天行程。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "箱根周遊券" }];

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
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: r === 0 ? 700 : undefined }}
                  >
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

function LastChecked({ children, iso = CHECKED_ISO }: { children?: ReactNode; iso?: string }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      最後查核：{iso}——<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周遊券）</a>、<a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp（箱根周遊券）</a>
      {children}
    </p>
  );
}

export default function ZhTwHakoneFreePassPage({ updated }: { updated: PageUpdated }) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "箱根周遊券（Hakone Freepass）",
              description: DESC,
              brand: "Odakyu",
              currency: "JPY",
              lowPrice: 6000,
              highPrice: 7500,
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
          <p className={styles.heroSubtitle}>
            依小田急官方票價整理新宿與小田原出發的箱根周遊券價格、只用一天也划算的環狀路線、可直接用手機出示的電子票券，以及周遊券不含的浪漫特快座位費（特急費用）。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "小田急官方票價", "沒有 1 日券"].map((t) => (
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
            <strong>箱根周遊券（Hakone Freepass）</strong>2 日券成人票價為<strong>新宿出發 {PASS_2_DAY_SHINJUKU}、小田原出發 {PASS_2_DAY_ODAWARA}</strong>（3 日券 {PASS_3_DAY_SHINJUKU}／{PASS_3_DAY_ODAWARA}），箱根內 8 種交通工具不限次數搭乘。從新宿出發走一圈環狀路線（小田急線、登山電車、登山纜車、空中纜車、蘆之湖海賊觀光船與巴士），<strong>單程票合計 {LOOP_REGULAR}</strong>，所以<strong>當天來回也比單買便宜 {LOOP_SAVING}</strong>。浪漫特快座位費（新宿出發單程 {ROMANCECAR}）另計；以上價格於 {CHECKED} 在小田急與箱根Navi 官方網頁查核。
          </p>
          <p className={styles.bodyText}>
            本頁介紹的是周遊券本身：箱根周遊券的價格、可搭乘的範圍與購買地點。一天之內每一站怎麼安排，請看
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              東京出發箱根一日遊（英文）
            </Link>
            ；在箱根住一晚、充分利用兩天周遊券的行程，請看
            <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>
              箱根兩天行程（英文）
            </Link>
            。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>重點整理</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>新宿出發 2 日券</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_SHINJUKU}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>小田原出發 2 日券</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_ODAWARA}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>可搭乘</p>
                <p className={styles.verdictStatValue}>8 種交通工具</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>浪漫特快</p>
                <p className={styles.verdictStatValue}>不含，須另付 {ROMANCECAR}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              小田急的英文官方寫法是 <strong>Freepass</strong>，很多人搜尋的是 Hakone Free Pass，兩者是同一張票。周遊券沒有 1 日券；線上購買（EMot 或 Klook）可以避開車站排隊；如果您搭新幹線抵達小田原，請買小田原出發的周遊券。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                在 Klook 查看箱根周遊券 →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                查看箱根一日遊 →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="hakone" />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>2026 年箱根周遊券多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            新宿出發的 2 日券成人票價為 {PASS_2_DAY_SHINJUKU}，適合大多數從東京出發的旅客。價格依周遊券的起點車站而不同，3 日券只比 2 日券貴 ¥400。
          </p>
          <Table
            head={["出發車站", "2 日券 成人", "2 日券 兒童", "3 日券 成人", "3 日券 兒童"]}
            rows={priceRows.map((r) => [r.pass, r.d2a, r.d2c, r.d3a, r.d3c])}
          />
          <LastChecked>
            。兒童票適用 6–11 歲，未滿 6 歲免費。以上價格自 2025 年 10 月 1 日起適用。浪漫特快座位費（特急費用）另計：到箱根湯本，從新宿 {ROMANCECAR}／¥600，從小田原 ¥200／¥100。
          </LastChecked>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            新宿出發還是小田原出發？兩者的 ¥1,100 價差，就是新宿 ⇄ 小田原的小田急線來回車資，兩種周遊券在箱根內都能搭同樣 8 種交通工具。本站介紹的其他周遊券與門票，整理在
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景點門票價格總表（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 確認箱根周遊券 →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              只有一天的時間？比較有導遊帶領的箱根一日遊 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="同一趟旅程可一併預訂"
          heading="買了箱根周遊券，還要預訂什麼？"
          headingLevel={3}
          intro="周遊券僅涵蓋交通，不包含一日遊行程及住宿。如果只有一天、又不想查時刻表，預訂有導遊帶領的箱根一日遊，即可一次安排相同的環狀路線；如果有兩天，在箱根訂一間住宿，就能充分利用周遊券第二天的效期。電子票需要的行動數據，也能用同一個 Klook 帳號預訂。"
          items={tripPrepItems}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>購買地點</span>
          <h2 className={styles.sectionTitle}>箱根周遊券在哪裡買？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可透過小田急官方的 EMot 或 Klook 線上購票，也可以在小田急線各站、7-ELEVEN 或箱根當地買實體票。不同購買地點，票券形式與最早可購買的時間不同。
          </p>
          <Table
            head={["購買地點", "票券形式", "何時可以買", "注意事項"]}
            rows={buyRows.map((r) => [r.where, r.ticket, r.when, r.note])}
          />
          <LastChecked iso={BUY_CHECKED_ISO}>。Klook 的購票資訊並非來自官方資料，最新條件以商品頁為準。</LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>包含與不包含</span>
          <h2 className={styles.sectionTitle}>箱根周遊券可以搭哪些交通工具？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            箱根內 8 種交通工具不限次數搭乘，新宿出發的周遊券另含小田急線來回一次。浪漫特快座位費（特急費用）與伊豆箱根巴士不包含在內。
          </p>
          <Table head={["交通工具", "是否適用周遊券", "說明"]} rows={coverageRows.map((r) => [r.mode, r.included, r.note])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            。出示周遊券還可在箱根約 70 處設施享有優惠，但名單會變動，因此本頁不列出金額。
          </LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>划算嗎？</span>
          <h2 className={styles.sectionTitle}>箱根周遊券划算嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            走完整條環狀路線就划算，只玩一天也一樣：從新宿出發再回到新宿的 7 段單程票合計 {LOOP_REGULAR}，周遊券是 {PASS_2_DAY_SHINJUKU}，省 {LOOP_SAVING}。累計金額在第 7 段、也就是回新宿的電車時超過周遊券價格。
          </p>
          <Table head={["路段（依環狀路線順序）", "區間", "成人單程票價", "累計"]} rows={fareRows} />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{CHECKED_ISO}——<a href={BREAKDOWN_URL} target="_blank" rel="noopener noreferrer">箱根Navi 各段票價（日文）</a>、<a href={LOOP_URL} target="_blank" rel="noopener noreferrer">箱根Navi（環狀路線合計）</a>、<a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">小田急箱根票價公告（PDF）</a>、<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周遊券）</a>。成人 IC 卡票價，不含浪漫特快。登山電車坐到強羅再加 ¥160。試算中沒有各段的兒童票價；空中纜車兒童單程 ¥700、海賊觀光船 ¥850。持周遊券可免費進入箱根強羅公園（¥650），海賊觀光船特別船艙單程另加 ¥800。
          </p>
          <Table head={["您的行程", "建議", "原因"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            空中纜車與海賊觀光船遇到惡劣天候都會停駛，空中纜車在大涌谷也可能臨時停止營運。若因部分路段停駛而未能搭乘，持實體周遊券可在最後搭乘的車站辦理退費。每一站看什麼、何時從東京出發，請看
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              東京出發箱根一日遊（英文）
            </Link>
            ；本頁只介紹周遊券本身。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看箱根周遊券 →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              比較箱根一日遊 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>路線圖</span>
          <h2 className={styles.sectionTitle}>箱根周遊券路線圖：依什麼順序搭乘？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            環狀路線共 7 段：搭小田急線到箱根湯本、登山電車上到強羅、登山纜車到早雲山、空中纜車經大涌谷到桃源台、海賊觀光船橫越蘆之湖、巴士回到箱根湯本，再搭小田急線回去。每一段都能用周遊券，反方向走也可以。
          </p>
          <Table head={["交通工具", "區間", "所需時間", "周遊券可用？"]} rows={routeRows} />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{CHECKED_ISO}——<a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp（浪漫特快所需時間）</a>、<a href={ITINERARY_URL} target="_blank" rel="noopener noreferrer">Odakyu HAKONE TRIP（登山電車所需時間）</a>、<a href={LP_URL} target="_blank" rel="noopener noreferrer">箱根Navi 周遊券頁面（登山纜車，日文）</a>、<a href={ROPEWAY_URL} target="_blank" rel="noopener noreferrer">箱根空中纜車常見問題</a>、<a href={CRUISE_URL} target="_blank" rel="noopener noreferrer">箱根海賊觀光船常見問題（船與巴士所需時間）</a>。搭乘時間合計是這些時間相加的結果。空中纜車與海賊觀光船遇強風或惡劣天候會停駛，空中纜車每年也會停駛進行定期維修，冬季停駛日期請看<Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>箱根兩天行程（英文）</Link>。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>選哪一種</span>
          <h2 className={styles.sectionTitle}>1 日還是 2 日：該買哪一種箱根周遊券？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            走完整條環狀路線的話，只玩一天也買 2 日券——箱根周遊券沒有 1 日券，而 2 日券仍比單買便宜 {LOOP_SAVING}。不去蘆之湖或不搭空中纜車時，範圍較小的周遊券才划算。
          </p>
          <Table head={["周遊券", "適合", "成人票價"]} rows={passChoiceRows} />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{CHECKED_ISO}——<a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">小田急箱根票價公告（PDF）</a>、<a href={LOOP_URL} target="_blank" rel="noopener noreferrer">箱根Navi 優惠票券</a>、<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周遊券）</a>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通方式</span>
          <h2 className={styles.sectionTitle}>箱根周遊券包含浪漫特快嗎？</h2>
          <p className={styles.bodyText}>
            不包含。新宿出發的周遊券含小田急線來回一次，但特急浪漫特快需另購特急券：新宿到箱根湯本<strong>單程成人 {ROMANCECAR}、兒童 ¥600</strong>。<strong>直達車程約 80 分鐘</strong>，全車對號座，透過 EMot 線上預訂座位比在車站買便宜 ¥50。小田急提供的新宿出發來回試算範例是周遊券 {PASS_2_DAY_SHINJUKU} 加浪漫特快來回 ¥2,400，合計 ¥9,500。使用周遊券搭乘小田急一般列車所需時間較長，通常要在小田原轉車。
          </p>
          <p className={styles.bodyText}>
            箱根也常與富士五湖安排在同一趟旅程中，但富士五湖屬於不同地區，適用的周遊券也不同，請看
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>
              富士山一日遊自由行交通方式（英文）
            </Link>
            。如果您計畫在較長的旅程中安排一晚入住箱根，可在
            <Link href="/guides/attractions/tokyo-7-day-itinerary" style={linkStyle}>
              東京 7 天行程（英文）
            </Link>
            、
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>
              東京 5 天行程（英文）
            </Link>
            與
            <Link href="/guides/attractions/japan-14-day-itinerary" style={linkStyle}>
              日本 14 天行程（英文）
            </Link>
            查看箱根排在哪一天；
            <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>
              箱根設有私人湯池的溫泉旅館（英文）
            </Link>
            則依區域整理從箱根湯本到蘆之湖的 10 間旅館，以及前往每間旅館的巴士或電車。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>持有 JR Pass</span>
          <h2 className={styles.sectionTitle}>箱根周遊券可以和 JR Pass 一起用嗎？</h2>
          <p className={styles.bodyText}>
            可以，但兩者的用途不同。小田急表示，JR Pass 與 JR 東京廣域周遊券不能在箱根地區內使用，只能搭 JR 線到小田原。抵達小田原後，<strong>小田原出發的箱根周遊券（2 日券 {PASS_2_DAY_ODAWARA}，3 日券 {PASS_3_DAY_ODAWARA}）</strong>就能走完這條環狀路線，也不包含您不需要搭乘的小田急線。回程若搭浪漫特快到新宿，須另購特急券，並支付小田原至新宿的基本車資。JR Pass 在東京行程中是否划算，請看
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass 攻略（英文）
            </Link>
            與
            <Link href="/guides/transport/tokyo-wide-pass" style={linkStyle}>
              JR 東京廣域周遊券攻略（英文）
            </Link>
            。
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{CHECKED_ISO}——<a href={JR_URL} target="_blank" rel="noopener noreferrer">小田急箱根周遊券常見問題</a>、<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周遊券）</a>。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票券形式</span>
          <h2 className={styles.sectionTitle}>電子票券還是實體票券：該買哪一種箱根周遊券？</h2>
          <Table head={["", "電子票（EMot）", "實體票"]} rows={formatRows.map((r) => [r.item, r.digital, r.paper])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            。同行者一起行動、能放在同一支手機時選電子票；孩童使用兒童專用手機，或不想依賴手機電量時選實體票。有效期限按曆日計算：2 日券在購買隔天的末班車後失效，而不是 48 小時後。
          </LastChecked>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="箱根周遊券常見問題" />

        <KlookTourPicks
          heading="如果只有一天"
          intro="想自行走完環狀路線，選擇周遊券就對了。如果只想從東京出發玩一天、不想查時刻表，以下是沿相同環狀路線、由導遊帶領的一日遊：一輛巴士、固定出發時間，當天晚上回到市區。請打開商品頁查看預計出發日期的最新價格。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/hakone-ryokan-private-onsen", title: "箱根設有私人湯池的溫泉旅館：依區域精選 10 間（2026）（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 價格 2026：新票價與是否划算（英文）" },
            { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "東京出發箱根一日遊（2026）：周遊券價格與一日遊比較（英文）" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "東京出發富士山一日遊（2026）：自由行交通方式（英文）" },
            { href: "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日遊（東京出發．2026）：行程怎麼選、五合目看什麼" },
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "東京出發河口湖一日遊（2026）：交通路線、車資與一日行程安排（英文）" },
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "東京 5 天行程（2026）：每日安排（英文）" },
            { href: "/guides/attractions/japan-14-day-itinerary", title: "日本 14 天行程（2026）：兩週行程逐日規劃（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新幹線攻略 2026：車票、周遊券與第一次搭乘須知（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景點門票價格 2026：官方票價與預約規則（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>一張票走完箱根環狀路線</h2>
            <p className={styles.ctaBannerDesc}>
              8 種交通工具、2 天或 3 天，Klook 可用海外發行的信用卡結帳。如果只有一天、又不想查時刻表，由導遊帶領、沿相同環狀路線遊覽的巴士一日遊更適合您。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看箱根周遊券 →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看箱根一日遊 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
