// 繁體中文 edition of /guides/attractions/tokyo-skytree-tickets. Mirrors the English page
// block for block as of 2026-11-01 (same sections, tables, Klook / GetYourGuide CTAs and
// blocks in the same order); every figure comes from the English page or from
// lib/attraction-prices.ts — nothing was re-checked or added for this edition.
import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../../components/BookingEsimCard";
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
import { GygCompareButton } from "../../../../components/GygCompare";
import { gygTokyoSkytree } from "../../../../lib/gyg-links";
import {
  skytreeTicket,
  skytreeAquariumCombo,
  fujiHakoneDayTour,
  tokyoSightseeingBusTour,
  skytreeTripPrep,
  skytreeSameDayCards,
  type KlookSameDayCard,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

const ROUTE = "/zh-tw/guides/attractions/tokyo-skytree-tickets";
// Re-synced with the English guide on 2026-11-10 (answer-first opening, question headings,
// hours and cancellation table, three FAQs). Figures from lib/attraction-prices.ts and
// en.tokyo-skytree.jp, read 10 Nov 2026.
// R02 (19 Nov 2026): re-synced with the English rewrite — answer-first paragraph, weekday /
// weekend / on-the-day price table, 350 vs 450 table, Skytree vs Shibuya Sky vs Tokyo Tower
// table, five-question FAQPage. Figures are the English page's (en.tokyo-skytree.jp/ticket/,
// /open-hours/day_hours/ and tokyotower.co.jp/fee/, read 19 Nov 2026).
const TITLE = "東京晴空塔門票價格 2026：350 vs 450 公尺比較與購票";
const DESC =
  "東京晴空塔門票價格：2026年11月19日官網確認，350公尺天望甲板 ¥1,800起，350＋450公尺套票線上 ¥3,000起，現場購票每張加 ¥500。";

const LOCALE = "zh-tw" as const;
const P = PRICES.tokyoSkytree;
const CHECKED = dateLabel(P.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const CHILD = priceLabel(P.child, LOCALE);
const FREE = priceLabel("Free", LOCALE);
const SHIBUYA_SKY_CHECKED = dateLabel(PRICES.shibuyaSky.checked, LOCALE);
const SHIBUYA_SKY_ADULT = priceLabel(PRICES.shibuyaSky.adult, LOCALE);

const SKYTREE_URL = klookFor(skytreeTicket.url, LOCALE);
const SKYTREE_TICKET_URL = "https://en.tokyo-skytree.jp/ticket/";
const SKYTREE_HOURS_URL = "https://en.tokyo-skytree.jp/open-hours/day_hours/";
const TOKYO_TOWER_FEE_URL = "https://www.tokyotower.co.jp/fee/";

const priceRows = [
  { ticket: "結論：350＋450 公尺聯票線上購買，成人", weekday: "¥3,000 起", weekend: "¥3,000 起", sameDay: "當日票價＋¥500" },
  { ticket: "天望甲板（350 公尺）— 成人（15 歲以上）", weekday: ADULT, weekend: ADULT, sameDay: "當日票價＋¥500" },
  { ticket: "天望甲板（350 公尺）— 兒童（6～14 歲）", weekday: CHILD, weekend: CHILD, sameDay: "當日票價＋¥500" },
  { ticket: "350 公尺＋450 公尺聯票 — 兒童（6～14 歲）", weekday: "¥1,500 起", weekend: "¥1,500 起", sameDay: "當日票價＋¥500" },
  { ticket: "現場加購天望迴廊（450 公尺）— 成人", weekday: "不單獨販售", weekend: "不單獨販售", sameDay: "¥1,400（無服務費）" },
  { ticket: "現場加購天望迴廊（450 公尺）— 兒童", weekday: "不單獨販售", weekend: "不單獨販售", sameDay: "¥700（無服務費）" },
  { ticket: "5 歲以下", weekday: FREE, weekend: FREE, sameDay: FREE },
];

const floorRows = [
  { item: "結論", deck: "看景色就夠了", galleria: "想登得更高才值得；請買聯票" },
  { item: "高度", deck: "340、345、350 樓層", galleria: "445、450 樓層；最高點 451.2 公尺（Sorakara Point）" },
  { item: "怎麼進去", deck: "所有門票都包含", galleria: "從 350 樓層搭天望迴廊專用電梯；須先有天望甲板門票" },
  { item: "成人票價", deck: "¥1,800 起", galleria: "線上聯票多 ¥1,200（¥3,000 起），或當天加購 ¥1,400" },
  { item: "人潮與售罄", deck: "現場可買時段依當天而定；可能需要排隊", galleria: "當天加購可能因人數限制暫停販售；聯票已保留入場" },
  { item: "當天服務費", deck: "櫃檯與售票機每張加 ¥500", galleria: "加購不收服務費" },
];

const towerRows = [
  {
    deck: "結論",
    price: "想登高就選晴空塔，想在露天觀景台看夕陽就選澀谷SKY，要最便宜、開最晚選東京鐵塔",
    hours: "",
    sunset: "",
  },
  {
    deck: "東京晴空塔（350 公尺／450 公尺）",
    price: "¥1,800 起（350 公尺）；¥3,000 起（350＋450 公尺）；當天另加 ¥500",
    hours: "10:00–22:00，最後入場 21:00（2026年11月19日；依日期而異）",
    sunset: "室內、隔著玻璃；2026年11月19日日落 16:31",
  },
  {
    deck: "SHIBUYA SKY（229 公尺屋頂）",
    price: `線上 ${SHIBUYA_SKY_ADULT}（15:00 前／15:00 起）`,
    hours: "10:00–22:30，最後入場 21:20",
    sunset: "露天；日落時段屬於較高的票價",
  },
  {
    deck: "東京鐵塔（150 公尺／250 公尺）",
    price: "Main Deck ¥1,500；Top Deck Tour 網路 ¥3,300／櫃檯 ¥3,500",
    hours: "Main Deck 9:00–23:00，最後入場 22:30",
    sunset: "室內展望台；三者中開到最晚",
  },
];

// Same rows as the English guide's visitRows, read off en.tokyo-skytree.jp on 10 Nov 2026.
const visitRows = [
  { item: "營業時間（2026 年 11 月 10 日）", detail: "10:00–22:00，最後入場 21:00。營業時間按日期公布，可能未經通知變更；最後入場一律為關門前 1 小時。" },
  { item: "更改日期或時段", detail: "不行。須取消後重新購買；聯票與 350 公尺門票之間互換也一樣。" },
  { item: "取消手續費（官方線上票）", detail: "參觀日 31 天前以前 0%，30 天前起至入場時間 20%，入場時間後 100%。購買後 59 分鐘內取消免手續費。" },
  { item: "當天現場購票", detail: "4 樓售票櫃檯與售票機，每張加 ¥500。可買到的時段依當天而定，可能需要排隊。" },
  { item: "天望迴廊（450 公尺）", detail: "445–450 公尺，最高點 451.2 公尺（Sorakara Point）。由 350 公尺搭天望迴廊專用電梯上去；當天加購可能因人數限制暫停販售。" },
  { item: "人較少的時段", detail: "平日下午、早上剛開門、關門前的晚間時段（依官方擁擠預測頁）。" },
  { item: "最近車站", detail: "東京晴空塔站（東武晴空塔線）、押上站（半藏門線等）。從淺草約 5 分鐘，從東京站約 20 分鐘。" },
];

const whoFor = [
  {
    title: "只買 350 公尺就夠了，如果…",
    desc: `如果只是想欣賞東京全景，就不需要加購。350 公尺是三層樓的主展望台，光是在這裡，就能將整片關東平原盡收眼底。成人 ${ADULT}，以每公尺的票價來算，是東京主要付費展望台中最便宜的一座。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h-6l3-7z" />
        <line x1="12" y1="9" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "加買 450 公尺，如果…",
    desc: "你特別想登上更高處。450 公尺是 Tembo Galleria（天望迴廊），沿著玻璃牆面向上延伸的空中迴廊，通往塔內最高的參觀樓層。線上聯票 ¥3,000 起；當天在 350 公尺票上加購，要再付 ¥1,400。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "選晚一點的時段，如果…",
    desc: "比起遠方的地平線，你更想看夜景。在查核當天，展望台營業到 22:00，最後入場 21:00；白天時段售罄後，晚間時段通常還有空位。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "訂票前先決定只買 350 公尺還是買聯票",
    desc: "想登上 450 公尺，就在線上購買聯票（成人 ¥3,000 起），比當天在 350 公尺票上加購（多 ¥1,400）便宜。只要有一點可能想上天望迴廊，就一開始買聯票。",
  },
  {
    title: "線上訂指定日期的票",
    desc: `官方網站販售指定日期的門票，票價為上述「起」價，實際金額可能更高。當天在 4 樓售票櫃檯或售票機購票，每張票需額外支付 ¥500 服務費——這就是提前購票最直接的好處。查核日 ${CHECKED}。`,
  },
  {
    title: "如果使用海外發行的信用卡，就透過售票平台購票",
    desc: "Klook 賣的是同一張指定時段入場券，結帳介面有中文、拿到的是電子票，可以避開許多旅客在日本景點官網購票時遇到的信用卡付款與語言問題。同一個商品頁也有 350 公尺＋450 公尺聯票。",
  },
  {
    title: "查詢造訪當天的營業時間，不要只看一般時間",
    desc: "晴空塔的營業時間依日期公布，官網也明確註明「營業時間可能未經公告即變更」，最後入場是閉館前一小時。在查核當天，展望台的時間是 10:00–22:00，最後入場 21:00。",
  },
];

// The five questions in FAQPage (R02, as on the English page). The older answers stay on the
// page under 更多問題 but are not in the structured data.
const faqItems: FaqItem[] = [
  {
    q: "東京晴空塔門票多少錢？",
    a: `東京晴空塔門票：天望甲板（350 公尺）成人（15 歲以上）${ADULT}、6～14 歲兒童 ${CHILD}；加上天望迴廊（450 公尺）的聯票成人 ¥3,000 起、兒童 ¥1,500 起，皆為線上指定日期與時段購買。當天在塔內購票每張加 ¥500。5 歲以下免費。這些都是「起」價：官網沒有另列平日與假日票價表，造訪日期的金額在結帳時顯示。官方網站查核日 ${CHECKED}。`,
  },
  {
    q: "450 公尺天望迴廊值得去嗎？",
    a: `如果登塔的目的就是想站得更高，就值得：它多了一段 445–450 公尺的傾斜玻璃空中迴廊，最高點 451.2 公尺，線上聯票只比單買天望甲板多 ¥1,200（成人 ¥3,000 起 vs ¥1,800 起）。如果重點是景色，350 公尺的天望甲板就已足夠。拿不定主意就買聯票：當天加購 450 公尺要 ¥1,400，而且官網表示這項販售可能因人數限制暫停。查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔門票需要提前預訂嗎？",
    a: `需要。當天在 4 樓售票櫃檯或售票機購票，每張票加收 ¥500 服務費——一家四口合計就是 ¥2,000——而官網也說明當天能買到的時段依當天而定。線上訂指定日期與時段的門票，可同時省掉服務費與櫃檯排隊。請注意更改規定：官方門票無法更改，只能取消；參觀日 31 天前以前取消免費，30 天前起收 20%。查核日 ${CHECKED}。`,
  },
  {
    q: "什麼時間去東京晴空塔最好？",
    a: `想要人少，選平日下午或早上第一個時段；想看夜景，選關門前的一兩個小時——這是官方人潮預測頁面列出的三個時段。${CHECKED} 展望台營業 10:00–22:00，最後入場 21:00，日落時間是 16:31，所以 16:00 的時段剛好能看到天色變化。營業時間按日期公布，請查詢造訪當天的時間。`,
  },
  {
    q: "東京晴空塔和澀谷SKY 該選哪一個？",
    a: `要高度與視野範圍選晴空塔——350 公尺與 450 公尺的室內玻璃展望台，成人 ¥1,800 起。要在澀谷十字路口上方 229 公尺的露天屋頂看夕陽選 SHIBUYA SKY，線上 ${SHIBUYA_SKY_ADULT}，依入場時間而定。第一次造訪、天氣晴朗只選一個的話，晴空塔的全景更遼闊；想拍出大家一眼就認得的澀谷景色，就選澀谷SKY。晴空塔票價查核日 ${CHECKED}；澀谷SKY ${SHIBUYA_SKY_CHECKED}。`,
  },
];

const moreQuestions: FaqItem[] = [
  {
    q: "350 公尺和 450 公尺差在哪裡？",
    a: "350 公尺的 Tembo Deck（天望甲板）是主要觀景區，共分為三層，所有門票都包含。450 公尺是 Tembo Galleria（天望迴廊），沿著玻璃牆面向上延伸的空中迴廊，通往塔內最高的參觀樓層。不能只買 450 公尺的門票：必須先持有 350 公尺的門票，可以在線上購買聯票，或在現場售票機加購（成人 ¥1,400）。",
  },
  {
    q: "450 公尺的票可以線上買嗎？",
    a: `不能單買。官方網站只把 450 公尺放在聯票裡賣；如果已購買 350 公尺門票，到現場才決定加購 450 公尺，就在館內售票機加購，成人 ¥1,400、6～14 歲兒童 ¥700。在線上購買聯票比較划算——成人 ¥3,000 起，分兩次買則是 ¥1,800 再加 ¥1,400。查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔的營業時間是？",
    a: `東京晴空塔的營業時間依日期公布，並非全年固定，官網也註明「營業時間可能未經公告即變更」，最後入場是閉館前一小時。在查核當天，展望台的時間是 10:00–22:00，最後入場 21:00。如果打算在這裡待到晚上，請先查詢造訪當天的營業時間。查核日 ${CHECKED}。`,
  },
  {
    q: "在東京晴空塔看得到富士山嗎？",
    a: "天氣好的時候看得到——而且憑著高度，在東京各展望台中，看到富士山的機率最高。能見度完全看天氣，涼爽乾燥的月份和一天中較早的時段通常比較好。任何一天都沒有保證，如果你是為了眺望富士山而購買聯票，這點值得先記住。",
  },
  {
    q: "東京晴空塔怎麼去？",
    a: "東京晴空塔就位於東武晴空塔線的「東京晴空塔站」和「押上站」上方；押上站有東京地下鐵半藏門線、都營淺草線與京成押上線。押上在東京地鐵通票的範圍內，所以如果已經持有這張通票，搭地鐵前往就不用另外付費。搭淺草線到淺草只有兩站，兩個地方很容易排在同一個下午。",
  },
  {
    q: "東京晴空塔門票可以改日期或時段嗎？",
    a: `不行。官網說明已購買的門票無法更改，要換日期、時段或票種，必須取消後重新購買。官方線上票在參觀日 31 天前以前取消免手續費，30 天前起至入場時間收 20%，入場時間後無法取消；購買後 59 分鐘內取消也不收費。透過旅行社或售票平台買的票，依該賣家的規定處理。查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔兒童票適用幾歲？",
    a: `兒童票適用 6～14 歲（國中生以下）。15 歲起（含高中生）為成人票，5 歲以下免費。查核日 ${CHECKED}。`,
  },
  {
    q: "450 公尺天望迴廊當天會賣完嗎？",
    a: `可能暫停販售。天望迴廊加購票在當天於 350 公尺天望甲板內的售票機販售，官網提醒可能因人數限制而暫停販售。線上買的聯票，已在你預約的時段含 450 公尺入場。查核日 ${CHECKED}。`,
  },
];

// The English page's Around-the-tower block, same four products in the same order.
const tripPrepItems = [
  withKlookLocale(skytreeTripPrep[0], LOCALE, {
    label: "上野／淺草周邊飯店",
    ctaLabel: "在 Klook 查看上野與淺草的飯店 →",
    why: "與晴空塔同在隅田川這一側：上野在山手線上，銀座線從上野通到淺草，押上再搭淺草線兩站就到——晚上看完夜景後，不必橫跨整個東京回飯店。",
  }),
  withKlookLocale(skytreeTripPrep[1], LOCALE, {
    label: "淺草 Kimono Yae 和服租借",
    ctaLabel: "查看淺草和服租借 →",
    why: "同一趟行程的白天部分，只隔兩站：店就在雷門旁邊，商品頁要求 17:30 前歸還——剛好可以安排在晚上登晴空塔之前，兩個行程不會互相衝突。",
  }),
  withKlookLocale(skytreeTripPrep[2], LOCALE, {
    label: "東京隨上隨下觀光巴士（Skyhop Bus）",
    ctaLabel: "查看露天巴士票 →",
    why: "露天雙層觀光巴士的隨上隨下車票，路線包含淺草——如果這一天同時安排淺草寺和晴空塔，會比每段路程分別付地鐵車資更划算。",
  }),
  withKlookLocale(skytreeTripPrep[3], LOCALE, {
    label: "東京地鐵通票（24／48／72小時）",
    ctaLabel: "查看地鐵通票 →",
    why: "押上是半藏門線與都營淺草線的地鐵站，所以 24、48 或 72 小時的東京地鐵與都營通票本身就涵蓋去晴空塔的車程——之後去淺草寺的兩站也包含在內。",
  }),
];

// P01 (14 Nov 2026): the same-day cards under the main CTA, as on the English page — an Asakusa
// guided walk (6.5%), an Asakusa kimono rental (6.5%) and the Tokyo Subway Ticket (5%). The pass
// reuses the label below; the Around-the-tower block drops it so it is not listed twice.
const sameDayCards: KlookSameDayCard[] = [
  withKlookLocale(skytreeSameDayCards[0], "zh-tw", {"kind":"導覽","label":"淺草、淺草寺半日徒步導覽","ctaLabel":"查看淺草步行導覽 →","why":"由英語導遊帶你走訪雷門、仲見世商店街與淺草寺；從晴空塔搭淺草線兩站就到。"}),
  withKlookLocale(skytreeSameDayCards[1], "zh-tw", {"kind":"和服","label":"和服租借＋髮型設計（愛和服 淺草1號店）","ctaLabel":"查看淺草和服租借 →","why":"租借 6 小時，含髮型設計，店家位於淺草，從晴空塔搭車只要兩站。"}),
  { ...withKlookLocale(skytreeSameDayCards[2], "zh-tw"), label: tripPrepItems[3].label, ctaLabel: tripPrepItems[3].ctaLabel, kind: "票券", why: "押上站有半藏門線與都營淺草線，24／48／72 小時票就能往返晴空塔與淺草。" },
  withKlookLocale(skytreeSameDayCards[3], "zh-tw", {"kind":"遊船","label":"淺草－台場 東京水邊線遊船","ctaLabel":"查看隅田川遊船 →","why":"從晴空塔對岸的淺草出發，沿隅田川一路開到台場——參觀完展望台後可以接著安排的行程。"}),
];
const aroundTowerItems = tripPrepItems.filter((item) => !sameDayCards.some((card) => card.url === item.url));

const tourPicks = [
  withKlookLocale(skytreeAquariumCombo, LOCALE, {
    title: "東京晴空塔＋墨田水族館套票",
    desc: "展望台加上位於塔下晴空街道商場內的水族館，一張票就能搞定",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "東京觀光巴士一日遊",
    desc: "有導覽的巴士行程，繞行皇居外苑、淺草與東京晴空塔，附多語言語音導覽",
  }),
  withKlookLocale(fujiHakoneDayTour, LOCALE, {
    title: "富士山＋箱根一日遊",
    desc: "富士山五合目搭配箱根火山區與蘆之湖，從東京出發一天來回",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "東京晴空塔門票" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTokyoSkytreePage({ updated }: { updated: PageUpdated }) {
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
            東京晴空塔門票價格 2026： <br />350 vs 450 公尺比較與購票
          </h1>
          <p className={styles.heroSubtitle}>
            東京晴空塔門票：350 公尺天望甲板成人 ¥1,800 起，加上 450 公尺天望迴廊的聯票 ¥3,000 起（官網查核日
            {CHECKED}；票價依日期而異，實際價格可能更高）。線上購買指定日期與時段的門票，可省下在現場櫃檯或售票機購票時每張 ¥500
            的服務費，而現場能買到的時段依當天而定——想要的時段，尤其是傍晚，最好先訂。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價", "350 公尺 vs 450 公尺"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* R02: the answer in the first body paragraph, ahead of the boxes */}
        <p className={styles.bodyText}>
          東京晴空塔門票：天望甲板（350 公尺）成人 ¥1,800 起，天望甲板＋天望迴廊（450 公尺）聯票 ¥3,000 起，
          皆為在官方網站線上指定日期與時段購買（查核日 {CHECKED}）；6～14 歲兒童分別為 ¥900 起與 ¥1,500 起。
          當天在塔內購票，每張票須在造訪日期的票價之外加收 ¥500；官網沒有另列平日與假日票價表，造訪日期的金額在結帳時顯示。
          如果有可能想登上 450 公尺的空中迴廊，就線上買聯票：當天加購要多付 ¥1,400，而且這項販售可能因人數限制暫停。
        </p>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>350 公尺（成人）</p>
                <p className={styles.verdictStatValue}>¥1,800 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>350 公尺＋450 公尺聯票</p>
                <p className={styles.verdictStatValue}>¥3,000 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>當天購票</p>
                <p className={styles.verdictStatValue}>每張需額外支付 ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>5 歲以下</p>
                <p className={styles.verdictStatValue}>{FREE}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>線上訂指定日期的票。晴空塔在當天售票櫃檯每張票收 ¥500 服務費，
              因此提前訂票可省下官方明確標示的費用。只要你有可能想登上 450 公尺的天望迴廊，
              一開始就買聯票——之後到現場再加購要多付 ¥1,400。票價資料取自官方網站，查核日 {CHECKED}。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SKYTREE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看東京晴空塔門票 →
              </KlookLink>
              <GygCompareButton slug="zh-tw-tokyo-skytree-tickets" listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>

        {/* P01: the 6.5% / 5% bookings of the same day, directly under the 2% ticket CTA. */}
        <KlookSameDayCards heading="晴空塔同一天還能預訂什麼？" cards={sameDayCards} />

        <BookingEsimCard />

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概覽</span>
          <h2 className={styles.sectionTitle}>東京晴空塔門票包含什麼？</h2>
          <p className={styles.bodyText}>
            這一頁介紹晴空塔的門票種類、票價與購票方式；如果還沒決定要去哪一座展望台，
            <Link href="/guides/attractions/tokyo-observation-decks">東京展望台比較（英文）</Link>
            把晴空塔和澀谷SKY、東京鐵塔、免費的都廳展望室並排比較。東京晴空塔提供兩種不同高度的展望台門票。<strong>350 公尺</strong>的 Tembo Deck（天望甲板）是分為三層的主要觀景區，
            所有門票都包含。<strong>450 公尺</strong>是 Tembo Galleria（天望迴廊），沿著玻璃牆面向上延伸的空中迴廊，
            通往塔內最高的參觀樓層——而且不能單獨購票入場。
          </p>
          <p className={styles.bodyText}>
            最容易搞混的，就是這兩個展望台該怎麼買票：票價會因為在線上一起購買或當天分開購買而不同。
            以下並列比較這兩種購票方式。
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>2026 年東京晴空塔門票多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人 350 公尺天望甲板 ¥1,800 起、加上 450 公尺天望迴廊的聯票 ¥3,000 起；6～14 歲兒童分別為 ¥900 起與
            ¥1,500 起。在塔內現場購票每張加 ¥500。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "線上・平日", "線上・週末／假日", "當天在塔內購買"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row, i) => (
                    <tr key={row.ticket} style={i === 0 ? { fontWeight: 700 } : undefined}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.weekday}</td>
                      <td className={styles.tdPrice}>{row.weekend}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後確認：{P.checked} — <a href={SKYTREE_TICKET_URL} target="_blank" rel="noopener">{SKYTREE_TICKET_URL}</a>。
            官方頁面列的是「起」價，沒有另列平日與假日票價表，所以兩欄都是同一個起價；結帳時顯示的造訪日期金額才是實際票價。
            ¥500 現場服務費按每張票計算，4 樓售票櫃檯與售票機都適用；天望迴廊加購票不收服務費。
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一種票</span>
          <h2 className={styles.sectionTitle}>450 公尺天望迴廊值得比 350 公尺多花錢嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            只有特別想登上更高的地方，才值得多花這筆錢。成人聯票比只買 350 公尺多 ¥1,200（¥3,000 起 vs ¥1,800 起），
            從 350 公尺再往上到 445–450 公尺的玻璃迴廊，最高點 451.2 公尺。如果拿不定主意，就在線上購買聯票——當天再加購
            450 公尺要 ¥1,400，而且官網表示人多時可能暫停販售。
          </p>
          <div className={styles.tableWrap} style={{ marginBottom: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "天望甲板（350 公尺）", "天望迴廊（450 公尺）"].map((h) => (
                      <th key={h || "item"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {floorRows.map((row, i) => (
                    <tr key={row.item} style={i === 0 ? { fontWeight: 700 } : undefined}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.galleria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginBottom: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後確認：{P.checked} — <a href={SKYTREE_TICKET_URL} target="_blank" rel="noopener">{SKYTREE_TICKET_URL}</a>
            （票價、加購與人數限制說明）；樓層高度取自官方天望迴廊樓層介紹頁（2026年11月10日資料）。
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking CTA — after the price table and the which-ticket choice */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>選好票了嗎？</strong>Klook 的 TOKYO SKYTREE 商品頁同時有指定時段入場券與 350 公尺＋450 公尺聯票，
              中文結帳、電子票。實際價格與可選時段，請在商品頁確認。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <KlookLink href={SKYTREE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看 TOKYO SKYTREE 門票 →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Around the tower */}
        <KlookTripPrep
          label="晴空塔周邊"
          heading="押上周邊還有哪些行程要先預訂"
          intro="一個展望台時段大約一到兩小時，其中只有前面提到的門票需要指定入場時間。以下是當天下午可一起安排、建議提前預訂的行程——這些行程都和晴空塔在隅田川同一側，也能和門票用同一個帳號預訂。"
          items={aroundTowerItems}
        />

        {/* At the door */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>當天</span>
          <h2 className={styles.sectionTitle}>東京晴空塔門票可以現場買嗎？</h2>
          <p className={styles.bodyText}>
            可以，在 4 樓售票櫃檯與售票機買，但每張比線上貴 ¥500；官網也說明當天能買到的時段依當天而定，
            購票可能要排隊。450 公尺天望迴廊加購票在 350 公尺天望甲板內的售票機販售、不收服務費，但人多時可能暫停販售。
          </p>
        </section>

        {/* Best time */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>時段</span>
          <h2 className={styles.sectionTitle}>什麼時候去東京晴空塔最好？</h2>
          <p className={styles.bodyText}>
            想要人少，選平日下午或早上第一個時段；想看夜景，選關門前的一兩個小時。這是官方人潮預測頁面列出的三個時段，
            並提醒新年、黃金週與春假期間人更多。日落時間隨季節改變——官方每日營業時間頁顯示 {CHECKED} 的日落是 16:31——傍晚時段請對照造訪當天的日落時間。
            想把晴空塔排進東京行程，可以看{" "}
            <Link href="/zh-tw/guides/attractions/things-to-do-tokyo">東京必做清單</Link>{" "}
            裡還有哪些需要預約時段的景點。
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.5rem" }}>
                  TOKYO SKYTREE 官方網站（營業時間、取消、擁擠預測、交通與樓層介紹頁），查核日 {CHECKED}。
                </caption>
                <thead>
                  <tr>
                    {["項目", "官方資訊"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visitRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>東京晴空塔、澀谷SKY、東京鐵塔：該買哪一張票？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            晴空塔是「高度」的選擇，350 公尺天望甲板 ¥1,800 起。如果真正想在俯瞰澀谷十字路口的露天觀景台欣賞夕陽，
            <Link href="/zh-tw/guides/attractions/shibuya-sky-tickets">澀谷SKY 門票</Link>
            更值得；如果想要最便宜的付費展望台、最晚的入場時間，
            <Link href="/guides/attractions/tokyo-tower-tickets">東京鐵塔門票（英文）</Link>
            ¥1,500 起。想從水上看晴空塔，
            <Link href="/guides/attractions/tokyo-bay-cruise">東京灣遊船（英文）</Link>
            從淺草到日之出棧橋搭 Tokyo Cruise 水上巴士是 ¥1,000。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["展望台", "成人票價", "營業時間", "夕陽與夜景"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {towerRows.map((row, i) =>
                    i === 0 ? (
                      <tr key={row.deck} style={{ fontWeight: 700 }}>
                        <td className={styles.tdProvider}>{row.deck}</td>
                        <td colSpan={3} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      </tr>
                    ) : (
                      <tr key={row.deck}>
                        <td className={styles.tdProvider}>{row.deck}</td>
                        <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.hours}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.sunset}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後確認：晴空塔 {P.checked} — <a href={SKYTREE_HOURS_URL} target="_blank" rel="noopener">{SKYTREE_HOURS_URL}</a>；
            東京鐵塔 2026-11-19 — <a href={TOKYO_TOWER_FEE_URL} target="_blank" rel="noopener">{TOKYO_TOWER_FEE_URL}</a>；
            SHIBUYA SKY 票價 {PRICES.shibuyaSky.checked} —{" "}
            <a href={PRICES.shibuyaSky.sourceUrl} target="_blank" rel="noopener">{PRICES.shibuyaSky.sourceUrl}</a>
            （營業時間取自 gotokyo.org，2026年11月14日）。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            還在挑展望台？
            <Link href="/guides/attractions/tokyo-observation-decks">東京展望台比較（英文）</Link>
            把所有展望台並排比較，包括免費的——這一頁只講怎麼買晴空塔門票。
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>東京晴空塔門票怎麼訂？</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            交通方面最簡單：東京晴空塔就位於東京晴空塔站與押上站上方，而押上是地鐵站——所以如果你帶著
            <Link href="/guides/attractions/tokyo-subway-ticket">東京地鐵通票（英文）</Link>，
            前往晴空塔的地鐵也包含在內。東京地下鐵與都營兩個路網怎麼搭配，請看我們的
            <Link href="/guides/transport/tokyo-transportation">東京交通指南（英文）</Link>。
            在東京搭地鐵、查詢路線時，都需要用手機上網，網卡的選法見{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan">日本eSIM推薦</Link>（Klook 網卡與 6 家價格比較）。
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        {/* The older answers, kept on the page but outside the FAQPage JSON-LD (as on the English page). */}
        <section className={styles.faqSection} style={{ paddingTop: 0 }}>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>更多問題</h3>
          <div className={styles.faqList}>
            {moreQuestions.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{faqItems.length + i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <KlookTourPicks
          heading="和這一天的其他行程一起訂"
          intro="一個晴空塔時段大約一到兩小時。以下商品可以和門票透過同一個 Klook 帳號預訂，這一天其餘的行程可以在同一次結帳中訂好。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-bay-cruise", title: "東京灣遊船（2026）：屋形船與 Symphony 比較、時間與票價（英文）" },
            { href: "/guides/attractions/asakusa-kimono-rental", title: "淺草和服租借（2026）：歸還時間、髮型與拍照地點（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "東京三天行程（2026）：要訂什麼、照什麼順序訂（英文）" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "東京鐵塔門票（2026）：票價、Main Deck 與 Top Deck 比較與預約方式（英文）" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "東京地鐵通票（2026）：24、48 還是 72 小時？值得買嗎（英文）" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "華納兄弟東京影城之旅門票（2026）：票價與預約方式（英文）" },
            { href: "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日遊（東京出發．2026）：行程怎麼選、五合目看什麼" },
            { href: "/zh-tw/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 門票 2026：票價、時間與預約方式" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票攻略 →" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>提前線上訂票，省下現場購票服務費</h2>
            <p className={styles.ctaBannerDesc}>
              當天購票每人要另加 ¥500 服務費。線上預訂指定日期的門票，既能省下這筆費用，也不用在現場排隊購票——
              而 Klook 的結帳介面有中文，用海外發行的信用卡也能付款。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SKYTREE_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看東京晴空塔門票 →
              </KlookLink>
              <GygCompareButton slug="zh-tw-tokyo-skytree-tickets" listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
