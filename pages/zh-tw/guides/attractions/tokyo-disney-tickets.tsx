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
import NextBookingBlock from "../../../../components/NextBookingBlock";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import GygCompare, { GygCompareButton } from "../../../../components/GygCompare";
import { fujiDayTour, tokyoDisneyTripPrep, tokyoSightseeingBusTour } from "../../../../lib/klook-links";
import { zhTokyoDisney } from "../../../../lib/klook-links-zh-tw";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { gygTokyoDisneyResort, gygTokyoDisneySea } from "../../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import HotelStayBlock from "../../../../components/HotelStayBlock";

/**
 * Mirrors the English page (pages/guides/attractions/tokyo-disney-tickets.tsx) as of
 * 2026-11-01: same sections, tables, CTAs and Klook/GetYourGuide blocks in the same
 * order. Every rule and figure is the English page's (Tokyo Disney Resort's own,
 * read 28 Oct 2026); no figure has been added.
 */

const ROUTE = "/zh-tw/guides/attractions/tokyo-disney-tickets";
/*
 * 27 Nov 2026 (R12): retargeted to the zh-TW queries 東京迪士尼門票 / 迪士尼門票 / 兒童票 / 敬老票 /
 * 星光票 / DPA. Re-read on 27 Nov 2026 (node fetch): /en/ticket/index.html (age bands "Adult: ages
 * 18 & over / Junior: ages 12-17 / Child: ages 4-11 - Children ages 3 & under are admitted for
 * free"; ticket types 1-Day, 1-Day for Guests with Disabilities, Campus Day, After 3 (weekends &
 * holidays from 3:00 p.m.), After 5 (weekdays excl. holidays from 5:00 p.m.) — no senior ticket
 * and no "Starlight Passport" among them); /en/ticket/index/202612/ and /202701/ ("As of 1:50
 * p.m., November 27, 2026": Dec 10,900–12,400, Jan 8,900–11,900 — same as R03); faq-en
 * answer/680ba05101fdf7431bafb6b8 (ID 00497: Premier Access is bought in the app after entering
 * the park, limited numbers, may sell out). The 10-per-order limit is the page's 28 Oct reading.
 */
const TITLE = "東京迪士尼門票 2026：價格、兒童票、星光票怎麼買";
const DESC =
  "東京迪士尼門票 2026：成人 ¥8,900–¥12,400、兒童 ¥5,300 起，沒有敬老票。星光票即 After 3／5 護照，DPA 入園後另購。";
const LAST_CHECKED_R12 = "2026-11-27";
// 11 Nov 2026 (R08): mirrors the English page's where-to-buy, validity, Premier Access and Happy Entry
// additions — same official FAQ sources and check dates; no figure added beyond the English page.
/*
 * 27 Nov 2026 (R03): mirrors the English page's R03 update. Official price calendar
 * (/en/ticket/index/202612/, /202701/, both parks identical, "As of 11:20 a.m., November 27, 2026"):
 * December 2026 adult 1-Day Passport 10,900–12,400 (12,400 on 5, 12, 19, 25, 26 Dec; 11,900 on
 * 24 Dec); January 2027 8,900–11,900 (11,900 on 1–3 Jan; 8,900 on 6–8 Jan); the calendar shows
 * prices up to 6 Mar 2027; overall 8,900–12,400. Published minimums unchanged. Validity
 * (faq-en answer/680ba03d01fdf7431bafb1d5), open tickets (/en/ticket/change/admission.html),
 * sell-outs (/en/ticket/index.html, legend "X: Tickets unavailable") and unofficial resale
 * (/ticket_info/ticket_resale.html) as on the English page; no figure added beyond it.
 */
const LAST_CHECKED_PRICES = "2026-11-27";
const LAST_CHECKED_CHANGES = "2026-11-27";
const LAST_CHECKED_RULES = "2026-11-11";
const CALENDAR_SPAN = "2026年11月27日至2027年3月6日";

const LOCALE = "zh-tw" as const;
const CHECKED = dateLabel("2026-10-28", LOCALE);
const DISNEY_TICKET_URL = klookFor(zhTokyoDisney.url, LOCALE);
const GYG_SLUG = "zh-tw-tokyo-disney-tickets";

/**
 * Ticket type × age band, as on the English page. Adult 1-Day Passport is the range on the
 * official calendar; every other figure is the resort's published minimum ("起").
 */
const SALE_RULE = "兩個月前，每天日本時間 14:00";
const PER_DATE = "依日期顯示";
const priceRows = [
  { ticket: "一日護照（全天）——最一般的票", entry: "開園時起", adult: "¥8,900–¥12,400", junior: priceLabel("From ¥7,400", LOCALE), child: priceLabel("From ¥5,300", LOCALE), sale: SALE_RULE },
  { ticket: "一日護照，2026 年 12 月的日期", entry: "開園時起", adult: "¥10,900–¥12,400", junior: PER_DATE, child: PER_DATE, sale: "現正販售" },
  { ticket: "一日護照，2027 年 1 月的日期", entry: "開園時起", adult: "¥8,900–¥11,900", junior: PER_DATE, child: PER_DATE, sale: "逐日開賣——每個日期在兩個月前的日本時間 14:00 開賣" },
  { ticket: "After 3 護照（假日的傍晚票）", entry: "週末與國定假日 15:00 起", adult: priceLabel("From ¥7,900", LOCALE), junior: priceLabel("From ¥6,600", LOCALE), child: priceLabel("From ¥4,400", LOCALE), sale: SALE_RULE },
  { ticket: "After 5 護照（平日夜間票）", entry: "平日（國定假日除外）17:00 起", adult: priceLabel("From ¥5,400", LOCALE), junior: priceLabel("From ¥4,600", LOCALE), child: priceLabel("From ¥3,600", LOCALE), sale: SALE_RULE },
  { ticket: "身心障礙者一日護照", entry: "開園時起", adult: priceLabel("From ¥7,100", LOCALE), junior: priceLabel("From ¥5,900", LOCALE), child: priceLabel("From ¥4,200", LOCALE), sale: SALE_RULE },
  { ticket: "校園一日護照（Campus Day Passport，期間限定，學生）", entry: "開園時起", adult: priceLabel("From ¥7,900", LOCALE), junior: priceLabel("From ¥6,600", LOCALE), child: "—", sale: "僅限期間內" },
  { ticket: "敬老票（長者優待票）", entry: "—", adult: "沒有這個票種——18 歲以上都買成人票", junior: "—", child: "—", sale: "—" },
  { ticket: "兩日或多日護照", entry: "—", adult: "不販售", junior: "不販售", child: "不販售", sale: "—" },
  { ticket: "3 歲以下", entry: "—", adult: "—", junior: "—", child: priceLabel("Free", LOCALE), sale: "不需門票" },
];

/** Who pays which band — first row is the answer. /en/ticket/index.html, read 27 Nov 2026. */
const ageRows = [
  { band: "兒童票（Child）", who: "4–11 歲", oneDay: priceLabel("From ¥5,300", LOCALE), evening: "After 3 ¥4,400 起／After 5 ¥3,600 起" },
  { band: "青少年票（Junior）", who: "12–17 歲", oneDay: priceLabel("From ¥7,400", LOCALE), evening: "After 3 ¥6,600 起／After 5 ¥4,600 起" },
  { band: "成人票（Adult）", who: "18 歲以上——包括長者", oneDay: "¥8,900–¥12,400", evening: "After 3 ¥7,900 起／After 5 ¥5,400 起" },
  { band: "敬老票", who: "沒有這個票種", oneDay: "—", evening: "—" },
  { band: "3 歲以下", who: "免費入園，不需門票", oneDay: "免費", evening: "免費" },
];

/**
 * A family of six at the published minimums — arithmetic on the resort's own figures, not a
 * quote. Adult 8,900 / Junior 7,400 / Child 5,300; adult maximum on the calendar 12,400.
 */
const sixRows = [
  { group: "4 位成人＋2 位兒童（4–11 歲）", min: "¥46,200 起", note: "成人 ¥8,900×4＋兒童 ¥5,300×2；在成人票價最高的日期（¥12,400），光 4 張成人票就是 ¥49,600" },
  { group: "2 位成人＋2 位長者＋2 位兒童", min: "¥46,200 起", note: "長者也買成人票，所以和上一列相同" },
  { group: "4 位成人＋1 位兒童＋1 位 3 歲以下", min: "¥40,900 起", note: "3 歲以下不需門票，實際只買 5 張" },
];

/** Validity by where you buy — first row is the answer. faq-en answer/680ba03d01fdf7431bafb1d5, read 27 Nov 2026. */
const validityRows = [
  { where: "官網或官方 App（大多數門票）", until: "購買日一年後的同一天——不是入園日一年後" },
  { where: "官網：期間限定的優惠門票", until: "有效期間較短，依各票種而定" },
  { where: "日本國內旅行社或便利商店，或日本境外的線上旅行平台（如 Klook）", until: "入園日一個月後的同一天" },
  { where: "名片尺寸的實體票（如贊助企業護照、股東護照）", until: "票面上印的有效期限" },
];

/** Dated vs open ticket — first row is the answer. /en/ticket/change/admission.html, read 27 Nov 2026. */
const openRows = [
  {
    q: "給一般旅客的建議：指定日期票",
    dated: "購買時就固定日期與園區，結帳完成即確保入園。官網販售的（一日護照、After 3、After 5）與 Klook 販售的一日護照都是這種票。",
    open: "—",
  },
  {
    q: "是什麼票",
    dated: "指定一座園區、一個日期的一日護照、After 3 或 After 5 護照",
    open: "未指定日期與園區的園區門票，例如贊助企業護照（Sponsor Passport）或股東護照（Shareholders' Passport）",
  },
  {
    q: "出發前要做什麼",
    dated: "不用再做什麼——在入園口掃 QR Code 即可",
    open: "入園前要在官方 App 或官網預約日期與園區",
  },
  {
    q: "什麼時候能確定日期",
    dated: "購買時，兩個月前的日本時間 14:00 起",
    open: "兩個月前的日本時間 14:00 起開放預約（贊助企業護照：三個月前）",
  },
  {
    q: "風險",
    dated: "在你購買前，那天可能已經賣完",
    open: "預約可能達到每日上限，因此不一定能在想要的日期入園",
  },
];

/** Which passports exist, and when each one lets you through the gate. */
const ticketRows = [
  {
    ticket: "一日護照",
    entry: "開園時起",
    dates: "每天",
    note: "一天進一座園區，日期與園區在購買時就固定。這是最一般的票。",
  },
  {
    ticket: "After 3 護照（假日限定）",
    entry: "15:00 起",
    dates: "假日",
    note: "在有販售的日期，用比較便宜的價格在傍晚進一座園區。",
  },
  {
    ticket: "After 5 護照（平日限定）",
    entry: "17:00 起",
    dates: "平日",
    note: "可遊玩時間最短、票價最低的選擇，適合平日晚上去。",
  },
  {
    ticket: "一日雙園護照（1-Day Park Hopper，期間限定）",
    entry: "—",
    dates: "目前未販售",
    note: "度假區 FAQ 明言目前沒有販售；同一趟想兩座園區都去，就每座園區各買一張票。",
  },
  {
    ticket: "多日護照",
    entry: "—",
    dates: "不販售",
    note: "票種相關的 FAQ 表示，不販售涵蓋連續兩天以上的門票。",
  },
];

/** Operating hours — set per date, not a standing figure. */
const hoursRows = [
  {
    what: "開園與閉園時間",
    detail: "依日期而定。度假區把時間公布在自家的園區營運時間表上，而不是固定的營業時間；購票畫面也會顯示你所選日期的時間。",
  },
  {
    what: "時間提前多久公布",
    detail: "大約五個月。FAQ 表示營運時間約在五個月前於官網公告。",
  },
  {
    what: "這對買票代表什麼",
    detail: "你要的日期大約在兩個月前開賣，那時當天的營運時間早已公布好幾個月——所以請在買票前看園區營運時間表，而不是買完才看。如果當天 20:00 閉園，After 5 護照就只能玩三小時。",
  },
  {
    what: "提前入園（Happy Entry）",
    detail: "僅限迪士尼飯店房客。東京迪士尼樂園比一般遊客早 15 分鐘開始入園；東京迪士尼海洋則限夢幻泉鄉飯店與觀海景飯店（MiraCosta）房客，早 5 到 15 分鐘。住宿期間每天（含退房日）可用，入住當天不可用；每人需要園區門票加一張專用入園券（Special Entrance Pass）。",
  },
];

/** Where to buy — first row is the recommendation. Validity from the resort's FAQ. */
const sellerRows = [
  {
    where: "推薦：官網或官方 App（tokyodisneyresort.jp）",
    best: "信用卡能在官網付款的人",
    validity: "購買日一年後的同一天",
    note: "可線上變更日期與年齡區分，不收手續費、次數不限（有效期間內）——每次以新日期的價格結算。",
  },
  {
    where: "授權的海外線上旅行平台（如 Klook）",
    best: "海外信用卡無法在官網付款的旅客",
    validity: "入園日一個月後的同一天",
    note: "接受海外信用卡、介面容易操作。官網顯示售罄時值得再查一次。注意有效期間較短。",
  },
  {
    where: "日本國內旅行社與便利商店",
    best: "日本居民與已在日本的旅客",
    validity: "入園日一個月後的同一天",
    note: "以預約兌換券形式販售。錯過日期時，請在兌換券到期前聯絡發券處。",
  },
  {
    where: "園區門口",
    best: "無——不賣票",
    validity: "—",
    note: "東京迪士尼樂園與東京迪士尼海洋現場不販售園區門票。只有迪士尼飯店房客能在飯店買當天的票。",
  },
];

/** In-park app services — first row is the recommendation. */
const accessRows = [
  {
    service: "我們的建議：先用免費的預約排隊卡（Standby Pass）與入場抽選（Entry Request）",
    cost: "免費",
    what: "預約排隊卡為指定遊樂設施分配返回時段；入場抽選每天每個場館可試一次，適用於指定的遊行、表演與角色見面。付費前先用這兩項。",
  },
  {
    service: "迪士尼尊享卡（Disney Premier Access）",
    cost: "付費，按次計費，另加園區門票",
    what: "為指定設施預約時段（縮短排隊），或為指定遊行與表演預約觀賞區。入園後在官方 App 購買，數量有限，可能賣完。",
  },
  {
    service: "一般排隊",
    cost: "門票已含",
    what: "所有設施都可以排隊體驗。",
  },
  {
    service: "40 週年優先卡（Priority Pass）",
    cost: "—",
    what: "免費的優先卡已於 2026 年 8 月 31 日結束。",
  },
];

/** The buying window, the sell-outs and what you can and cannot undo. */
const buyingRows = [
  {
    q: "我要的日期什麼時候開賣？",
    a: "每天日本時間 14:00 起，開賣兩個月後同一天的票——所以 3 月 1 日入園的票，在 1 月 1 日 14:00 開賣。若那個月沒有對應的日期，則在下個月 1 日 14:00 開賣。",
  },
  {
    q: "一次可以買幾張？",
    a: "每筆訂單最多十張；當天的張數達到上限後，該日期的販售可能不經預告就停止。",
  },
  {
    q: "門口有賣票嗎？",
    a: "沒有。FAQ 明確表示東京迪士尼樂園與東京迪士尼海洋現場不販售園區門票。當天購買只能在官網或官方 App、而且還有名額時才行——如果賣完了，就無法入園。",
  },
  {
    q: "有例外嗎？",
    a: "迪士尼飯店的住客可以在飯店買當天的票。除此之外，當天購買只有官網與 App；事先購買的話，還有部分旅行社與便利商店。",
  },
  {
    q: "可以取消退款嗎？",
    a: "不行。因個人因素取消與退款都不受理；關於惡劣天氣、地震或其他原因無法在指定日期入園的 FAQ，也指向同一條規定。",
  },
  {
    q: "那可以改日期嗎？",
    a: "可以，能彈性調整的就只有日期。線上購買的票可以在有效期間內變更日期，指定入園日之前或之後都行，次數不限——每次變更都以新日期的價格結算。變更在官網或 App 上操作，不是在園區。",
  },
  {
    q: "你想去的日期已售罄——就沒機會了嗎？",
    a: "不一定。FAQ 表示賣完的票種可能不經預告重新開賣；而當其他遊客把票改到別的日期，他們釋出的名額會重新開放販售，可以再次在線上購買。回頭再查一次，比想像中值得。",
  },
];

const parkRows = [
  {
    park: "東京迪士尼樂園",
    style: "經典的迪士尼城堡式園區：遊行、煙火、闔家同樂的設施",
    suits: "第一次來、帶年紀小的孩子、經典迪士尼迷",
    note: "去過其他迪士尼的話，園區配置會讓你感到熟悉",
  },
  {
    park: "東京迪士尼海洋",
    style: "航海與水主題；更有東京獨有的特色、風格偏成人；園內供酒",
    suits: "成人、情侶、想要不一樣體驗的回訪者",
    note: "正在慶祝 25 週年（2026 年 4 月～2027 年 3 月）",
  },
];

const whoFor = [
  {
    title: "選東京迪士尼樂園的話…",
    desc: "你帶著年紀較小的孩子，或這是你第一次去任何一座迪士尼。園區沿用經典的城堡式配置，有白天的遊行，重心放在闔家同樂的設施——輕鬆、熟悉的一天。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V11l4-3 5 4 5-4 4 3v10z" />
        <path d="M12 21v-5" />
        <path d="M7 11V6l2-2 2 2v2" />
      </svg>
    ),
  },
  {
    title: "選東京迪士尼海洋的話…",
    desc: "你想要在別的迪士尼度假區拿不到的東西，而且你是成人或沒有帶小小孩。迪士尼海洋風格更偏成人，主題港灣是東京獨有的，而且——和樂園不同——園內供酒。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M5 12V7a7 7 0 0 1 14 0v5" />
        <path d="M4 16c2 1.5 4-1.5 8 0s6-1.5 8 0" />
      </svg>
    ),
  },
  {
    title: "2026 年去？注意週年活動",
    desc: "東京迪士尼海洋正在慶祝 25 週年，期間為 2026 年 4 月到 2027 年 3 月。週年期間的熱門日期人潮更多，而在浮動定價下，那些日期也正是貴的日期——所以請在你要的日期於兩個月前一開賣時就購票。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 5.4 5.6.5-4.2 3.8 1.3 5.7L12 14.8 6.9 17.4l1.3-5.7L4 7.9l5.6-.5z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "先把日期與園區定下來",
    desc: "東京迪士尼的每張票都指定日期與園區，而能在一天內兩座都去的一日雙園護照目前沒有販售。若要參觀兩座園區，就必須安排兩天並分別購票。",
  },
  {
    title: "在園區營運時間表上確認那天的時間",
    desc: "營運時間依日期而定，約五個月前公布。它決定了 After 5 護照能玩一整個晚上，還是只能玩一小會兒，也決定煙火是否落在你的入園時間內。",
  },
  {
    title: "兩個月前的日本時間 14:00，準備好立刻購票",
    desc: "那就是你要的日期開賣的時刻。用你自己的時區記進行事曆——東京 14:00 是台北 13:00——因為每天的名額有上限，販售可能不經預告就停止。",
  },
  {
    title: "海外信用卡有問題就用 Klook",
    desc: "東京迪士尼度假區官網經常拒絕或封鎖海外發行的信用卡。Klook 是官方授權的售票通路，接受海外信用卡、介面容易操作，這也是許多海外旅客選它的原因。",
  },
  {
    title: "將電子票 QR Code 綁定至官方 App",
    desc: "購票後你會拿到電子票 QR Code，可以登錄到東京迪士尼度假區官方 App——當天的園內功能也在那裡操作。出發前先設定好。",
  },
];

/* R12 (27 Nov 2026): the five zh-TW landing questions. Figures as in the tables above. */
const faqItems: FaqItem[] = [
  {
    q: "東京迪士尼門票多少錢？",
    a: `成人一日護照依入園日期為 ¥8,900 至 ¥12,400（官方日曆上 ${CALENDAR_SPAN}的範圍），青少年（12–17 歲）¥7,400 起、兒童（4–11 歲）¥5,300 起，3 歲以下免費。東京迪士尼樂園與東京迪士尼海洋同價；2026 年 12 月的成人票價為 ¥10,900 至 ¥12,400，2027 年 1 月為 ¥8,900 至 ¥11,900。最後確認：${LAST_CHECKED_R12}。`,
  },
  {
    q: "東京迪士尼有兒童票和敬老票嗎？",
    a: `有兒童票，沒有敬老票。兒童票適用 4–11 歲（一日護照 ¥5,300 起），12–17 歲買青少年票（¥7,400 起），3 歲以下免費、不需門票；官方的年齡區分是 18 歲以上一律為成人，長者也買成人票。最後確認：${LAST_CHECKED_R12}。`,
  },
  {
    q: "一次買六張東京迪士尼門票，在哪裡買最方便？",
    a: `信用卡能在官網付款的話，在東京迪士尼度假區官網或官方 App 一筆訂單就能買完——每筆訂單最多十張，每張要選對年齡區分。官網拒絕海外信用卡時，可以在 Klook 這類授權售票平台買同樣的指定日期一日護照，但有效期只到入園日一個月後。4 位成人加 2 位兒童，以官方最低價計算為 ¥46,200 起。最後確認：${LAST_CHECKED_R12}。`,
  },
  {
    q: "買東京迪士尼門票時可以順便買 DPA 嗎？",
    a: `不行。迪士尼尊享卡（Disney Premier Access，DPA）不是和園區門票一起販售的，要在入園之後，於東京迪士尼度假區官方 App 上選擇設施或表演與時段購買；數量有限，可能賣完。不買 DPA 也能排隊體驗所有設施。最後確認：${LAST_CHECKED_R12}。`,
  },
  {
    q: "東京迪士尼星光票怎麼買？",
    a: `官方目前販售的票種裡沒有「星光護照（Starlight Passport）」；傍晚入園的票是 After 3 護照（週末與國定假日 15:00 起，成人 ¥7,900 起）與 After 5 護照（平日 17:00 起，成人 ¥5,400 起）。兩種都是指定日期的票，和一日護照一樣在官網或官方 App 購買，入園日兩個月前的日本時間 14:00 開賣。最後確認：${LAST_CHECKED_R12}。`,
  },
];

/** The same Klook products as the English page, on the zh-TW locale path. */
const tripPrepItems = [
  withKlookLocale(tokyoDisneyTripPrep[0], LOCALE, {
    label: "舞濱周邊飯店",
    ctaLabel: "在 Klook 查看舞濱飯店 →",
    why: "兩座園區共用的車站，從東京站搭 JR 京葉線約 15 到 20 分鐘——也是迪士尼度假區線單軌電車的起點，讓一早入園或看完夜間遊行再走都變得可行。",
  }),
  withKlookLocale(tokyoDisneyTripPrep[1], LOCALE, {
    label: "浦安／新浦安飯店",
    ctaLabel: "在 Klook 查看浦安飯店 →",
    why: "再往外一站，通常比度假區旁的房間便宜，其中許多飯店有自己的免費接駁車到園區門口——代價是要配合接駁車的時刻表，而不是單軌電車。",
  }),
  withKlookLocale(tokyoDisneyTripPrep[2], LOCALE, {
    label: "羽田機場利木津巴士",
    ctaLabel: "查看羽田巴士 →",
    why: "羽田的商品頁把東京迪士尼度假區列在目的地之中，所以這是直接抵達度假區的機場路線，而不是先到市區車站、再拖著行李離開。",
  }),
  withKlookLocale(tokyoDisneyTripPrep[3], LOCALE, {
    label: "成田機場利木津巴士",
    ctaLabel: "查看利木津巴士 →",
    why: "從成田進來的話，同一家利木津巴士業者開往東京市中心的飯店與車站停靠點，可以託運行李；訂之前請確認你那天的停靠站清單，因為目的地依路線而不同。",
  }),
  withKlookLocale(tokyoDisneyTripPrep[4], LOCALE, {
    label: "Klook 日本網卡（eSIM）",
    ctaLabel: "在 Klook 查看網卡方案 →",
    why: "你的一日入園票（一日護照）是登錄在東京迪士尼度假區官方 App 的 QR Code，當天的園內功能也在 App 裡操作——如果只靠飯店 Wi-Fi，在園區內就無法使用這些功能。",
  }),
];

const tourItems = [
  withKlookLocale(fujiDayTour, LOCALE, {
    title: "東京出發富士山一日遊",
    desc: "一整天的巴士行程，前往富士山五合目、河口湖與忍野八海，當天晚上回到東京",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "東京觀光巴士一日遊",
    desc: "附導覽的環線行程，走訪皇居庭園、淺草與東京晴空塔，提供多語語音導覽",
  }),
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "東京迪士尼門票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTokyoDisneyTicketsPage({ updated }: { updated: PageUpdated }) {
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
            東京迪士尼門票 2026： <br />價格、兒童票、星光票怎麼買
          </h1>
          <p className={styles.heroSubtitle}>
            指定日期入園、浮動票價、現場不售票、恕不退款。本頁整理一日護照與傍晚票的票價、兒童票的年齡區分、一次買多張的方法、DPA，
            以及該選哪一座園區。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價與規定", "兩個月前開賣", "海外信用卡可透過 Klook 購票"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Lead paragraph */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            2026 年<strong>東京迪士尼門票</strong>的成人一日護照依日期為 <strong>¥8,900 至 ¥12,400</strong>，青少年（12–17 歲）
            <strong>¥7,400</strong> 起，兒童（4–11 歲）<strong>¥5,300</strong> 起，3 歲以下免費，沒有敬老票。
            俗稱的星光票現在是傍晚入園的 <strong>After 3 護照</strong>（週末與國定假日 15:00 起，成人 ¥7,900 起）與平日夜間的
            <strong>After 5 護照</strong>（平日 17:00 起，成人 ¥5,400 起）。
            所有門票都在入園日<strong>兩個月前、每天日本時間 14:00</strong>開賣，DPA（迪士尼尊享卡）則要入園後在官方 App 另外購買。
          </p>
          <p className={styles.bodyText}>
            兩座園區門口都不賣票，所以要在東京迪士尼度假區官網或官方 App 購買——如果信用卡無法在官網付款，可透過 Klook 等授權售票平台購買。
            一張票只含一個日期、一座園區：東京迪士尼樂園適合第一次去與帶小小孩的旅客，東京迪士尼海洋適合成人，並正值 25 週年（2026 年 4 月～2027 年 3 月）。
            賣完的日期無法入園，不能退款，有效期間內可以不限次數改日期。票價、年齡區分與票種查閱自度假區門票頁（2026 年 11 月 27 日）；有效期限與園內規定查閱自官方
            FAQ。還在安排東京其他行程？可以比較我們的{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-tokyo-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>
              東京 teamLab 門票比較
            </Link>
            與{" "}
            <Link href="/zh-tw/guides/attractions/things-to-do-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              東京必玩攻略
            </Link>
            。同一趟也要去大阪的日本環球影城？兩邊的票都綁定日期，USJ 的 fast pass 另外收費，請見{" "}
            <Link href="/zh-tw/guides/attractions/usj-tickets-express-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本環球影城快速通關（快證）價錢與種類
            </Link>
            。
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>一日護照</p>
                <p className={styles.verdictStatValue}>成人 ¥8,900–¥12,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>定價</p>
                <p className={styles.verdictStatValue}>依入園日期浮動</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>開賣</p>
                <p className={styles.verdictStatValue}>兩個月前，日本時間 14:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>現場／門口票</p>
                <p className={styles.verdictStatValue}>兩座園區都沒有</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>選好園區與日期，在園區營運時間表上確認那天的時間，然後在兩個月前開賣時買下。
              沒有退款，但線上購買的票可以不限次數改日期。如果官網拒絕你的海外信用卡，Klook 是官方授權的售票通路，
              接受海外卡，並發送可以綁進官方 App 的 QR Code。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看東京迪士尼門票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
            </div>
            {/* A34 (27 Nov 2026): the next booking of the same trip (high-EPC guides) — lib/next-booking.ts. */}
            <NextBookingBlock region="tokyo" locale="zh-tw" />
          </div>
        </div>

        {/* R12 (27 Nov 2026): same-day bookings next to the answer, as on the English page (R04) —
            Maihama/Urayasu hotels 6.5%, airport limousine bus 5%, Klook eSIM 20%. Moved up from lower
            on the page. GA4 placement zh-tw-disney-sameday-answer. */}
        <div data-placement="zh-tw-disney-sameday-answer">
          <KlookTripPrep
            label="同一天要預訂的"
            heading="訂好迪士尼門票後，建議一併預訂的項目"
            intro="入園日期一確定，舞濱或浦安的飯店、直達度假區的機場利木津巴士，以及綁定門票 QR Code 的官方 App 要用的網路，最好同一天一起訂好。度假區從東京站搭 JR 京葉線約 15 到 20 分鐘，住在舞濱或鄰近一站，就能省下開園前與夜間遊行後的通勤。"
            items={tripPrepItems}
            headingLevel={3}
          />
        </div>
        <p className={styles.bodyText}>
          正在挑飯店的話，
          <Link href="/guides/attractions/tokyo-disney-hotels" style={{ color: "var(--red)", fontWeight: 600 }}>
            東京迪士尼飯店指南（英文）
          </Link>
          比較了迪士尼飯店、官方飯店和合作飯店前往園區的方式、「歡樂入園」，以及開放訂房的時間（迪士尼飯店為 4 個月前）。
        </p>

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="tokyo-disney" />

        <EsimCtaTop />

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>東京迪士尼門票多少錢？</h2>
          <p className={styles.bodyText}>成人一日護照依日期為 ¥8,900 至 ¥12,400。東京迪士尼度假區依入園日期為園區門票定價，並在官方日曆上公布每天的成人票價；2026 年 11 月 27 日查閱時，{CALENDAR_SPAN}的日曆從 ¥8,900（2027 年 1 月 6–8 日）到 ¥12,400（11 月與 12 月的幾個週末日期，以及 12 月 25–26 日），東京迪士尼樂園與東京迪士尼海洋同價。這段期間大部分平日為 ¥9,900 或 ¥10,900。其他票種與年齡區分，度假區公布的是最低價，所以標示為「起」。</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種（一座園區）", "入園時間", "成人（18 歲以上）", "青少年（12–17 歲）", "兒童（4–11 歲）", "開賣"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.entry}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.junior}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.child}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後確認：{LAST_CHECKED_PRICES}</strong> · 出處：https://www.tokyodisneyresort.jp/en/ticket/index.html（公布的最低價與開賣時間）、https://www.tokyodisneyresort.jp/en/ticket/index/202612/ 及 https://www.tokyodisneyresort.jp/en/ticket/index/202701/（每日成人票價日曆，2026 年 11 月 27 日上午 11:20 的狀態）。{" "}
            成人一日護照的區間是日曆上 {CALENDAR_SPAN}的最低價與最高價：2026 年 12 月，¥12,400 落在 12 月 5、12、19、25、26 日，¥11,900 落在 12 月 24 日；2027 年 1 月，¥8,900 落在 1 月 6–8 日，¥11,900 落在 1 月 1–3 日。日曆只顯示成人票價；青少年與兒童票價要選好日期才會顯示。之後的日期可能不同，購買前請確認你自己的日期。票價以日圓計、由度假區訂定；多日護照一列依據票種相關的 FAQ，查閱於 {CHECKED}。
            東京其他指定日期的門票（每項都附查閱日期）請見我們的{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景點門票價格總表（英文）
            </Link>
            。
          </p>
        </section>

        {/* R12 (27 Nov 2026): children and seniors. First row is the answer. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>兒童票與敬老票</span>
          <h2 className={styles.sectionTitle}>東京迪士尼有兒童票和敬老票嗎？</h2>
          <p className={styles.bodyText}>
            有兒童票，沒有敬老票：4–11 歲買兒童票（一日護照 ¥5,300 起），12–17 歲買青少年票（¥7,400 起），3 歲以下免費。
            東京迪士尼度假區的年齡區分是 18 歲以上一律為成人，所以帶爸媽去，長者和你一樣買成人票（¥8,900–¥12,400）。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["年齡區分", "適用對象", "一日護照", "傍晚票（After 3／After 5）"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ageRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.band}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      <td className={styles.tdPrice}>{row.oneDay}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.evening}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後確認：{LAST_CHECKED_R12}</strong> · 出處：https://www.tokyodisneyresort.jp/en/ticket/index.html（「Adult: ages 18 &amp; over / Junior: ages 12-17 / Child: ages 4-11 - Children ages 3 &amp; under are admitted for free」，以及販售中的全部票種——其中沒有長者票）。
            成人一日護照是官方日曆上 {CALENDAR_SPAN}的區間，其他是度假區公布的最低價。身心障礙者與一名陪同者可買身心障礙者一日護照（成人 ¥7,100 起），需出示適用的證明。
          </p>
        </section>

        {/* R12 (27 Nov 2026): "星光票" — the evening tickets now sold. First row of the price table above holds them. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>星光票</span>
          <h2 className={styles.sectionTitle}>東京迪士尼星光票怎麼買？</h2>
          <p className={styles.bodyText}>
            在官網或官方 App 買 After 3 或 After 5 護照：官方目前販售的票種裡沒有「星光護照（Starlight Passport）」，傍晚入園的票是週末與國定假日 15:00 起的
            After 3 護照（成人 ¥7,900 起）與平日 17:00 起的 After 5 護照（成人 ¥5,400 起）。兩種都指定日期與園區，和一日護照一樣在兩個月前的日本時間 14:00 開賣。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["傍晚票", "可用日期", "入園時間", "成人／青少年／兒童"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>平日晚上去：After 5 護照</td>
                    <td style={{ fontSize: "0.88rem" }}>平日（國定假日除外）</td>
                    <td style={{ fontSize: "0.88rem" }}>17:00 起</td>
                    <td className={styles.tdPrice}>¥5,400／¥4,600／¥3,600 起</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>週末下午去：After 3 護照</td>
                    <td style={{ fontSize: "0.88rem" }}>週末與國定假日</td>
                    <td style={{ fontSize: "0.88rem" }}>15:00 起</td>
                    <td className={styles.tdPrice}>¥7,900／¥6,600／¥4,400 起</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>星光護照（Starlight Passport）</td>
                    <td style={{ fontSize: "0.88rem" }}>不在目前販售的票種中</td>
                    <td style={{ fontSize: "0.88rem" }}>—</td>
                    <td style={{ fontSize: "0.88rem" }}>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後確認：{LAST_CHECKED_R12}</strong> · 出處：https://www.tokyodisneyresort.jp/en/ticket/index.html（「After 3 Passport (Weekends &amp; Holidays) … from 3:00 p.m.」、「After 5 Passport (Weekdays) … from 5:00 p.m. on weekdays (excluding holidays)」）。
            價格是度假區公布的最低價，實際金額依日期而定。閉園時間也依日期而定，買 After 5 護照前先看那天的園區營運時間——20:00 閉園的日子只能玩三小時。
          </p>
        </section>

        {/* Q2 — which ticket */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票種</span>
          <h2 className={styles.sectionTitle}>東京迪士尼該買哪一種票？</h2>
          <p className={styles.bodyText}>
            玩一整天買一日護照，只想要晚上就買晚間護照，兩座園區都想去就買兩張票——能在一天內玩兩座的一日雙園護照
            目前沒有販售，多日護照則完全不販售。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "入園時間", "日期", "內容"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.entry}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.dates}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            票種、入園時間與一日雙園護照目前的狀態，都是度假區自己的 FAQ 回答，查閱於 {CHECKED}。你那天有哪些票種
            在賣，要看日期——期間限定的票會隨度假區的活動推出或結束——所以上表是目前販售票種的概況，而不是固定的清單。
          </p>
        </section>

        {/* Q3 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>營業時間</span>
          <h2 className={styles.sectionTitle}>東京迪士尼的營業時間是幾點到幾點？</h2>
          <p className={styles.bodyText}>
            沒有固定的營業時間可以列：度假區依日期設定，並約在五個月前公布在自家的園區營運時間表上。這比門票開賣還早，
            這正是有用的地方——等你要的日期開賣時，你已經能看到園區那天開多久。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `度假區公布的內容（查閱於 ${CHECKED}）`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後確認：{LAST_CHECKED_RULES}</strong> · 出處：https://faq-en.tokyodisneyresort.jp/（營運時間）、
            https://www.tokyodisneyresort.jp/en/hotel/topics/info/happy_entry.html（Happy Entry）。Happy Entry 並不保證能多玩 15 分鐘：
            度假區說明，人多時飯店專用入口的入園可能需要時間。
          </p>
        </section>

        {/* R12 (27 Nov 2026): a family of six in one order. First row is the answer. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>全家一起買</span>
          <h2 className={styles.sectionTitle}>一次買六張東京迪士尼門票，在哪裡買最方便？</h2>
          <p className={styles.bodyText}>
            信用卡能在官網付款的話，東京迪士尼度假區官網或官方 App 一筆訂單就能買完六張——每筆訂單最多十張，每張選對成人、青少年或兒童即可。
            4 位成人（含長者）加 2 位 4–11 歲兒童，以官方最低價計算為 <strong>¥46,200 起</strong>；官網拒絕海外信用卡時，就在 Klook 這類授權售票平台買同一天的一日護照。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["六人組合（一日護照）", "最低合計", "怎麼算"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sixRows.map((row) => (
                    <tr key={row.group}>
                      <td className={styles.tdProvider}>{row.group}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.min}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後確認：{LAST_CHECKED_R12}</strong> · 出處：https://www.tokyodisneyresort.jp/en/ticket/index.html（各年齡區分的最低價）。
            合計是用度假區公布的最低價相加，不是報價；實際金額依你選的日期而定。每筆訂單最多十張的規定取自度假區的購票說明，查閱於 {CHECKED}。
            在園區用官方 App 出示 QR Code 需要網路，網卡怎麼選請看{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本eSIM推薦
            </Link>
            。
          </p>
        </section>

        {/* Where to buy — added 11 Nov 2026 (R08). First row is the recommendation. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>購買管道</span>
          <h2 className={styles.sectionTitle}>東京迪士尼樂園門票應該在哪裡買？</h2>
          <p className={styles.bodyText}>
            如果你的信用卡能在官網付款，就在東京迪士尼度假區官網或官方 App 買——在那裡買的票從購買日起有效一年。官網拒絕海外信用卡的話，
            Klook 這類授權的海外售票通路也賣同樣的指定日期門票，有效期到入園日一個月後。
          </p>
          <p className={styles.bodyText}>在 Klook 這類授權售票平台買票是安全的：東京迪士尼度假區把日本境外的線上旅行平台列為園區門票的購買管道之一，而它警告的是來自非官方賣家、網路轉售商店、拍賣與黃牛的門票——這類票可能失效，且不退款。</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["購買管道", "適合誰", "有效期至", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sellerRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.best}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.validity}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後確認：{LAST_CHECKED_RULES}</strong> · 出處：
            https://faq-en.tokyodisneyresort.jp/answer/680ba03d01fdf7431bafb1d5/（有效期限）及度假區關於園區門票的 FAQ（現場不賣票、當天購買、迪士尼飯店例外）。
            非官方轉售的警告：https://www.tokyodisneyresort.jp/ticket_info/ticket_resale.html（最後確認：{LAST_CHECKED_CHANGES}）。
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              信用卡無法在官網付款？在 Klook 查看 →
            </KlookLink>
          </div>
        </section>

        {/* Validity — added 27 Nov 2026 (R03). First row is the answer. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>有效期限</span>
          <h2 className={styles.sectionTitle}>東京迪士尼樂園門票的有效期限多久？</h2>
          <p className={styles.bodyText}>在官網或官方 App 購買的門票，有效期到購買日一年後的同一天；在 Klook 或其他日本境外線上旅行平台購買的門票，有效期到入園日一個月後的同一天。有效期間內，錯過的日期仍可變更——過了有效期，票就失效。</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["購買管道", "有效期至"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {validityRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.until}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後確認：{LAST_CHECKED_CHANGES}</strong> · 出處：https://faq-en.tokyodisneyresort.jp/answer/680ba03d01fdf7431bafb1d5/。隔年或隔月沒有同一天時，有效期到前一天為止。
          </p>
        </section>

        {/* Dated vs open-dated — added 27 Nov 2026 (R03). First row is the answer. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>指定日期或不指定</span>
          <h2 className={styles.sectionTitle}>指定日期票還是不指定日期的票——該選哪一種？</h2>
          <p className={styles.bodyText}>選指定日期票。指定日期的一日護照、After 3 或 After 5 護照在付款時就固定園區與日期；不指定日期的票——未指定日期與園區，例如贊助企業護照或股東護照——入園前仍要預約日期與園區，而預約可能達到每日上限。</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "指定日期票", "不指定日期的票（未指定日期與園區）"].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {openRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.dated}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後確認：{LAST_CHECKED_CHANGES}</strong> · 出處：https://www.tokyodisneyresort.jp/en/ticket/change/admission.html（園區入園預約）、https://www.tokyodisneyresort.jp/en/ticket/index.html（販售中的門票）。
          </p>
        </section>

        {/* Q4 — sell-outs, the booking window and refunds, then the CTA stack. Retitled 27 Nov 2026 (R03). */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>開賣時間</span>
          <h2 className={styles.sectionTitle}>東京迪士尼門票會賣完嗎？</h2>
          <p className={styles.bodyText}>會。每種票每天都有販售上限，達到上限後該日期的販售可能不經預告就停止，官方日曆會在那天標示「X：Tickets unavailable（無法購買）」——賣完的票可能不經預告重新開賣，但現場不賣票，沒有退路。</p>
          <p className={styles.bodyText}>
            所以一定要提前買，度假區沒有提供其他購買方式：東京迪士尼樂園與東京迪士尼海洋現場完全不賣園區門票。入園日前兩個月的
            <strong>日本時間 14:00</strong> 開放購票——也就是台北時間 13:00——每天的名額有上限，賣完後
            販售可能不經預告就停止。遇到週末、日本國定假日或迪士尼海洋 25 週年期間的日期，開賣那一刻就是搶票的關鍵。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["問題", `度假區公布的內容（查閱於 ${CHECKED}）`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後確認：{LAST_CHECKED_PRICES}</strong> · 出處：https://www.tokyodisneyresort.jp/en/ticket/index.html（開賣時間、每日販售上限、售罄門票重新開賣）、https://www.tokyodisneyresort.jp/en/ticket/index/202612/（日曆圖例）。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            因為名額除了按日分配、也按售票通路分配，在一個管道賣完的日期，值得到另一個管道查查看——而官網無法使用
            海外信用卡付款時，也可以改用售票平台：
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看東京迪士尼門票 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
          </div>
        </section>

        {/* Q5 — which park */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>樂園 vs 海洋</span>
          <h2 className={styles.sectionTitle}>迪士尼樂園還是迪士尼海洋——該選哪一座？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            一張票、一座園區——而一日雙園護照沒有販售，因此只能選其中一座，而不是決定先去哪一座。經典城堡式園區與年紀小的孩子，
            選樂園；想體驗其他地方沒有的迪士尼園區、又碰上它的 25 週年，選海洋。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["園區", "整體性格", "最適合", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parkRows.map((row) => (
                    <tr key={row.park}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.park}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.style}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.suits}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            以上是幫你做決定的概括描述——兩座園區都很大，都是整天的行程。去園區也就是從城市行程裡拿掉一整天，所以通常會
            排在前段：在我們的{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={{ color: "var(--text)", fontWeight: 600 }}>
              東京五天行程（英文）
            </Link>
            裡，它排在第四天。
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>適合誰</span>
          <h2 className={styles.sectionTitle}>哪一座園區適合你？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            不管選哪一座，都請先規劃路線——從東京市中心前往度假區需要搭一段電車。我們的{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              東京交通攻略（英文）
            </Link>{" "}
            整理了去那裡會用到的電車、地鐵與 IC 卡。
          </p>
        </section>

        {/* Premier Access — added 11 Nov 2026 (R08). First row is the recommendation. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>縮短排隊</span>
          <h2 className={styles.sectionTitle}>買門票時可以順便買 DPA 嗎？</h2>
          <p className={styles.bodyText}>
            不行，DPA（迪士尼尊享卡，Disney Premier Access）和園區門票分開販售：要在入園之後，於東京迪士尼度假區官方 App 選擇設施或表演與時段購買，數量有限、可能賣完。
            它也不是必買——所有設施都仍然可以排隊體驗，免費的預約排隊卡與入場抽選仍然可用；免費的 40 週年優先卡已於 2026 年 8 月 31 日結束。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["服務", "費用", "用途"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.service}>
                      <td className={styles.tdProvider}>{row.service}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後確認：{LAST_CHECKED_R12}</strong> · 出處：
            https://faq-en.tokyodisneyresort.jp/answer/680ba05101fdf7431bafb6b0/、
            https://faq-en.tokyodisneyresort.jp/answer/680ba05101fdf7431bafb6b8/（「After entering the park, Disney Premier Access can be purchased … on the Tokyo Disney Resort App」）。
            迪士尼尊享卡的價格依設施或表演而定，顯示在 App 中，本頁不列出。40 週年優先卡的結束日期查閱於 2026 年 11 月 11 日。
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>東京迪士尼門票怎麼買？</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The stay-near-the-resort block (tripPrepItems) now sits right after the answer (R12). */}

        {/* Foreign card / Klook explainer */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>海外信用卡</span>
          <h2 className={styles.sectionTitle}>可以用海外信用卡買東京迪士尼門票嗎？</h2>
          <p className={styles.bodyText}>
            在官網上常常不行。東京迪士尼度假區官網是主要的購票管道，但它經常拒絕或封鎖海外發行的信用卡——這是國際旅客
            經常遇到的棘手問題；而當你要買的東西只在兩個月前的某一刻開賣時，問題就更嚴重。
          </p>
          <p className={styles.bodyText}>
            <strong>Klook 是東京迪士尼度假區官方授權的售票通路。</strong>它接受海外信用卡、介面容易操作，並發送可以
            登錄到東京迪士尼度假區官方 App 的電子票 QR Code。正因為這個組合——支援海外卡，加上可以綁進 App 的 QR——它成了
            海外旅客常用的解決方式。如果你同時在安排東京其他行程，我們的{" "}
            <Link href="/zh-tw/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              澀谷SKY 門票攻略
            </Link>{" "}
            介紹的是另一種指定日期、透過售票平台比較容易購買的門票。
          </p>
          <p className={styles.bodyText}>
            電子票 QR Code 登錄在官方 App 裡，所以在園區用手機出示時需要網路。哪一張網卡適合東京行程，請看{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              日本eSIM推薦
            </Link>
            ——Klook 網卡可以和門票用同一個帳號結帳。
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        {/* Klook tours in the same city. */}
        <KlookTourPicks
          heading="同一座城市出發的一日遊"
          intro="去園區就是一整天，所以多數人會把迪士尼安排在東京行程中的其中一天。下面兩個行程可以填掉其中一個非園區日，而且和門票在同一個 Klook 帳號裡結帳。"
          tours={tourItems}
        />

        {/* A second authorized-reseller route. */}
        <GygCompare
          slug={GYG_SLUG}
          heading="GetYourGuide 上的同款一日護照"
          intro="東京迪士尼現場不賣票，賣完的日期就進不去，所以在某個售票平台已售罄的日期，就無法再從該平台購得。GetYourGuide 也有販售一日護照，迪士尼樂園與迪士尼海洋都有——決定日期前，值得多開一個分頁查查看。"
          listings={[gygTokyoDisneyResort, gygTokyoDisneySea]}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "東京五天行程（2026）：逐日安排（英文）" },
            { href: "/guides/attractions/legoland-japan-tickets", title: "日本樂高樂園門票（2026）：票價、營業時間與值不值得（英文）" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "吉卜力公園門票（2026）：票價、開賣時間與海外購買方式（英文）" },
            { href: "/guides/transport/tokyo-airport-limousine-bus", title: "東京機場利木津巴士（2026）：成田與羽田的票價、時間與停靠站（英文）" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "三麗鷗彩虹樂園門票（2026）：票價、浮動定價與預約方式（英文）" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "富士急樂園門票（2026）：一日券票價、Q Pack 與交通方式（英文）" },
            { href: "/zh-tw/guides/attractions/jigokudani-snow-monkey-tour", title: "地獄谷野猿公苑一日遊（東京出發．2026）：雪猴交通與門票" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "東京華納兄弟哈利波特影城門票（2026）：票價與預約方式（英文）" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/zh-tw/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 門票 2026：票價、時間與預約方式" },
            { href: "/guides/transport/tokyo-transportation", title: "東京交通全攻略（2026）：電車、地鐵與 IC 卡（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
            { href: "/zh-tw/guides/attractions/usj-tickets-express-pass", title: "日本環球影城門票與快速通關（2026）：該買哪一種" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "東京看相撲（2026）：本場所門票與晨間練習（英文）" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先買好東京迪士尼的入園門票</h2>
            <p className={styles.ctaBannerDesc}>
              現場不賣票，賣完的日期就進不去，而你要的日期在兩個月前的日本時間 14:00 開賣。Klook 是官方授權的售票通路，
              接受海外信用卡，並發送可以登錄到官方 App 的 QR Code。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看東京迪士尼門票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
