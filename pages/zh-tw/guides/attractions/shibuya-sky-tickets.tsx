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
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  fujiHakoneDayTour,
  shibuyaSkyDayTripPrep,
  shibuyaSkySameDayPrep,
  shibuyaSkyTicketUrl,
  tokyoSightseeingBusTour,
  type KlookTour,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { gygShibuyaSky } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

// Mirrors the English guide (/guides/attractions/shibuya-sky-tickets) block for block as of
// 2026-11-01: same sections, tables, Klook and GetYourGuide CTAs in the same places. Every
// figure is the English page's own or read from lib/attraction-prices.ts; nothing is added.
// 2026-11-11 (R09): synced with English — answer-first lead, Last checked lines, stay rule, sunset table.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/shibuya-sky-tickets";
const TITLE = "澀谷SKY 門票（2026）：票價、最佳時段與預約方式";
const DESC =
  "澀谷SKY 門票 2026：官方票價線上預購成人 15 點前 ¥2,700、15 點後 ¥3,400，現場各加 ¥300；日落場最快售完。";

const SHIBUYA_SKY_URL = klookFor(shibuyaSkyTicketUrl, LOCALE);
const GYG_SLUG = "zh-tw-shibuya-sky-tickets";

const P = PRICES.shibuyaSky;
const CHECKED = dateLabel(P.checked, LOCALE);
const LAST_CHECKED = dateLabel("2026-11-11", LOCALE);
const OFFICIAL_URL = "https://www.shibuya-scramble-square.com/sky/ticket/";
const GOTOKYO_URL = "https://www.gotokyo.org/en/spot/1749/index.html";
const NAOJ_URL = "https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s1311.html";
const sourceLink = { color: "var(--text)", fontWeight: 600 } as const;

/** 2026 年每月 15 日的東京日落時間（日本國立天文台）。全部落在 ¥3,400 那一段。 */
const sunsetRows = [
  { month: "1 月", sunset: "16:50" },
  { month: "2 月", sunset: "17:22" },
  { month: "3 月", sunset: "17:48" },
  { month: "4 月", sunset: "18:14" },
  { month: "5 月", sunset: "18:39" },
  { month: "6 月", sunset: "18:58" },
  { month: "7 月", sunset: "18:57" },
  { month: "8 月", sunset: "18:31" },
  { month: "9 月", sunset: "17:49" },
  { month: "10 月", sunset: "17:06" },
  { month: "11 月", sunset: "16:35" },
  { month: "12 月", sunset: "16:29" },
];

/** 依入場時段與購買管道區分的票價。 */
const priceRows = [
  { ticket: "成人，10:00～14:59 入場——最划算，建議線上預訂", online: "¥2,700", counter: "¥3,000" },
  { ticket: "成人，15:00～21:20 入場——所有日落場次", online: "¥3,400", counter: "¥3,700" },
  {
    ticket: "兒童，6～12 歲（含仍就讀小學的 12 歲兒童）",
    online: "不在線上販售",
    counter: "¥1,200",
  },
  { ticket: "學齡前兒童（尚未就讀小學）", online: "免費", counter: "免費" },
];

/** 開放時間、最後入場與休館日——決定你付哪一段票價的部分。 */
const hoursRows = [
  { what: "開放時間", detail: "10:00～22:30" },
  { what: "最後入場", detail: "21:20" },
  { what: "停留時間限制", detail: "無——想待多久都可以；多數遊客停留約 90 分鐘" },
  { what: "交通", detail: "與澀谷站直通" },
  { what: "較便宜的時段", detail: "10:00～14:59 入場" },
  { what: "較貴的時段", detail: "15:00～21:20 入場——所有日落場次都落在這一段" },
  {
    what: "休館",
    detail: "元旦。其他日子也可能臨時休館或縮短開放時間",
  },
];

/** 開賣時間、窗口與取消規定。 */
const bookingRows = [
  {
    q: "某個日期什麼時候開賣？",
    a: "入場日兩週前的日本時間 00:00。2025 年 2 月 27 日的公告特別把開賣改在這個時間點，就是為了讓開賣時間可以預期。",
  },
  {
    q: "可以取消嗎？",
    a: "同一份公告也為官網門票加入了入場日當天前可免費取消的規定。請以你自己結帳時顯示的條款為準——售票平台有各自的規定，Klook 的商品頁標示入場前 24 小時可免費取消。",
  },
  {
    q: "現場買得到票嗎？",
    a: "買得到——14 樓窗口販售，15 點前入場 ¥3,000、15 點起 ¥3,700。窗口做不到的是事先保留時段，所以它是備案，不是計畫。",
  },
  {
    q: "哪些票只在窗口賣？",
    a: "兒童票。6～12 歲 ¥1,200，只在當天的 14 樓窗口販售、不在線上賣——所以全家線上訂票時，是先買成人票，孩子的票到現場再付。",
  },
];

const deckRows = [
  {
    deck: "澀谷SKY",
    height: "約 229 公尺（屋頂）",
    highlight: "澀谷十字路口正上方的開放式屋頂——東京最具代表性的一張照片",
    price: `線上 ${priceLabel(P.adult, LOCALE)}（窗口 ${priceLabel(P.atDoor, LOCALE)}）`,
    area: "澀谷站",
  },
  {
    deck: "東京晴空塔",
    height: "350 公尺與 450 公尺展望台（塔高 634 公尺）",
    highlight: "最高的視野、玻璃地板區；天氣晴朗時看得到富士山",
    price: `${priceLabel(PRICES.tokyoSkytree.adult, LOCALE)}（Floor 350）`,
    area: "押上，淺草附近",
  },
  {
    deck: "東京鐵塔",
    height: "約 150 公尺與約 250 公尺展望台（塔高 332 公尺）",
    highlight: "1958 年的復古地標；要上更高一層得參加 Top Deck Tour",
    price: `${priceLabel(PRICES.tokyoTower.adult, LOCALE)}（Main Deck）`,
    area: "芝公園／赤羽橋",
  },
  {
    deck: "東京都廳展望室",
    height: "約 202 公尺",
    highlight: "免費入場；不用門票就有超值的城市全景",
    price: priceLabel(PRICES.tochoDeck.adult, LOCALE),
    area: "新宿",
  },
];

const whoFor = [
  {
    title: "選日落場，如果……",
    desc: "你想拍那張經典照片，而且能提早規劃。不論哪個月份，日落都落在 ¥3,400 那一段，所以你要取捨的只有「訂不訂得到」——而這正是最先賣完的時段。建議在日落前 30～60 分鐘入場，一次看到白天、黃金時刻與城市亮燈。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="4.2" y1="10.2" x2="5.6" y2="11.6" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.4" y1="11.6" x2="19.8" y2="10.2" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "選 15 點前，如果……",
    desc: "價格比光線重要。10:00～14:59 入場是 ¥2,700，對比 ¥3,400——同一個屋頂便宜 ¥700，而且較早的時段最容易臨時訂到。在晴朗乾燥的日子，白天的視野看得最遠，包括富士山。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "選晚場，如果……",
    desc: "你要看的是霓虹夜景，而日落場已經沒了。晚場和日落場同屬 ¥3,400 那一段，但通常最晚賣完；最後入場 21:20，展望台開到 22:30——當你的日期兩週前就開賣、黃金時刻早已被訂走時，這是很可靠的補救方案。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "從你的日期往回推兩週",
    desc: "每個日期在剛好兩週前的日本時間 00:00 開賣（台北時間前一天 23:00）。在做任何事之前，先把這個時間點換算成你所在地的時間記進行事曆——日落場你到底訂不訂得到，就看這一刻。",
  },
  {
    title: "先決定時段區間，再去看場次",
    desc: "15 點前入場 ¥2,700，15 點起入場 ¥3,400。日落與夜景都在較貴的那一段，所以沒有便宜的日落場——先選你要的光線，再選時間。",
  },
  {
    title: "線上訂，不要到窗口買",
    desc: "不論哪一段，線上都比 14 樓窗口便宜 ¥300，而且是唯一能事先保留時段的方式。兒童票是例外：6～12 歲的票只在當天的窗口販售。",
  },
  {
    title: "持海外信用卡就用售票平台",
    desc: "自 2024 年 7 月起，澀谷SKY 官網對許多海外發行的信用卡刷不過。Klook 接受海外信用卡、結帳流程看得懂，並標示入場前 24 小時可免費取消——面對東京多變的天氣，這是很實用的保險。",
  },
  {
    title: "日落場請提前 30～60 分鐘到",
    desc: "留時間過入口、把隨身物品放進置物櫃（屋頂是開放式的，風很大），在光線轉變之前先站好位置。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年澀谷SKY 門票多少錢？",
    a: `官網成人票 10:00～14:59 入場為 ¥2,700，15:00～21:20 入場為 ¥3,400。同樣的票在 14 樓窗口買是 ¥3,000 與 ¥3,700，所以不論哪一段，線上預訂都省 ¥300。6～12 歲兒童票 ¥1,200，只在窗口販售；學齡前兒童免費入場。這套票價依澀谷 Scramble Square 自己的票價改定，自 2025 年 4 月 1 日入場起適用；查核日 ${CHECKED}。`,
  },
  {
    q: "澀谷SKY 幾點開放？最後入場是幾點？",
    a: `根據東京都官方觀光網站的資料（查核日 ${CHECKED}），澀谷SKY 開放時間為 10:00～22:30，最後入場 21:20。元旦休館，其他日子也可能臨時休館或縮短開放時間。開放時間不只影響行程，也影響票價：¥2,700 那一段到 14:59 為止，15:00 到 21:20 截止前一律 ¥3,400。`,
  },
  {
    q: "澀谷SKY 可以待多久？",
    a: `想待多久都可以：根據東京都官方觀光網站的資料（查核日 ${LAST_CHECKED}），澀谷SKY 入場後沒有停留時間限制，多數遊客停留約 90 分鐘。門票只固定入場時間，展望台 22:30 關閉。入場後不予退款，開放式屋頂遇惡劣天氣可能關閉。`,
  },
  {
    q: "澀谷SKY 需要事先預約嗎？",
    a: "想看日落的話，需要——而且這就是整件事的關鍵。白天或晚場通常不必急，但事先預訂每人仍比窗口省 ¥300，也免去想要的時段被訂走的風險。14 樓窗口當天確實有賣票，所以沒預約也不是進不去；當天做不到的，是自己決定什麼時候上去。",
  },
  {
    q: "澀谷SKY 門票多久前開賣？",
    a: `兩週。每個日期在剛好十四天前的日本時間 00:00 開賣，這是營運方在 2025 年 2 月 27 日的公告中刻意訂下的，讓開賣時間可以預期。熱門日期的日落場，請在開賣那一刻就下單，不要等到當天晚一點。查核日 ${CHECKED}。`,
  },
  {
    q: "澀谷SKY 哪個時段最先賣完？",
    a: "日落場，而且遙遙領先——這是唯一一個能一次看到白天、黃金時刻與夜景的時段；東京的日落時間從 12 月中旬的 16:29 到 6 月中旬的 18:58（日本國立天文台，2026 年），所以最搶手的場次每個月都不一樣。白天時段最從容。晚場則是常見的備案：同樣是 ¥3,400，競爭少得多，看到的是亮燈的城市而不是地平線。",
  },
  {
    q: "澀谷SKY 門票可以取消或更改嗎？",
    a: `推出現行票價的 2025 年 2 月 27 日公告，同時也為向營運方購買的官網門票加入了入場日當天前可免費取消的規定。售票平台有自己的條款——Klook 的商品頁標示入場前 24 小時可免費取消——所以請以你結帳時顯示的內容為準。查核日 ${CHECKED}。`,
  },
  {
    q: "可以用海外信用卡買澀谷SKY 門票嗎？",
    a: "在澀谷SKY 官網上常常不行——自 2024 年 7 月起，官網對許多海外發行的信用卡刷不過。可靠的替代方案是 Klook 這類售票平台：接受海外信用卡、結帳流程看得懂、提供電子票，並標示入場前 24 小時可免費取消。",
  },
  {
    q: "澀谷SKY 有多高？看得到什麼？",
    a: "澀谷SKY 是位在澀谷上方約 229 公尺的屋頂展望台，分為開放式與室內區域。從頂樓可以 360 度看到澀谷十字路口、東京天際線，天氣晴朗時還能看到富士山。開放式屋頂是最大的亮點，所以請穿擋風的衣服，出發前先確認天氣。",
  },
  {
    q: "澀谷SKY 和晴空塔怎麼選？",
    a: `澀谷SKY 賣的是體驗與照片：十字路口上方約 229 公尺的開放式屋頂，日落時最美，15 點前 ¥2,700、15 點後 ¥3,400。東京晴空塔賣的是高度與視距：350 公尺與 450 公尺展望台、玻璃地板區與遠方的景色，Floor 350 ${priceLabel(PRICES.tokyoSkytree.adult, LOCALE)}。想拍十字路口、感受氣氛就選澀谷SKY；想要最高、最廣的全景就選晴空塔。`,
  },
  {
    q: "東京有免費的展望台嗎？",
    a: "有。新宿的東京都廳在約 202 公尺處設有展望室，免費入場——東京最好的免費城市景觀；如果不想把預算花在日落場的 ¥3,400，這是很合理的替代。開放時間與開放的展望室會變動，去之前請先確認。",
  },
  {
    q: "SHIBUYA SKY 頂樓可以帶包包嗎？",
    a: "不行。包包、背包、雨傘與自拍棒不可帶上頂樓，要先存放在 46 樓的置物櫃；手機與可放進口袋的相機沒問題。三腳架與單腳架只能在 46 樓室內使用，人多時可能被請求停止。依營運方購票 FAQ 的搜尋索引內容，2026 年 11 月 6 日查閱。",
  },
  {
    q: "從澀谷SKY 看得到富士山嗎？",
    a: "天氣晴朗時看得到——不過高度更高的東京晴空塔機會更大。能見度取決於天氣，通常在較涼爽乾燥的月份、一天中較早的時候最好；如果你上去就是為了富士山，這也是選 ¥2,700 白天時段的理由。任何一天都沒有保證。",
  },
];

// Klook "book for the same day" — the English page's items, on the zh-TW locale path.
const sameDayPrep: KlookTripPrepItem[] = [
  withKlookLocale(shibuyaSkySameDayPrep[0], LOCALE, {
    label: "新宿夜間美食導覽（回憶橫丁・歌舞伎町・黃金街）",
    ctaLabel: "查看新宿夜間導覽 →",
    why: "日落場之後的夜晚，從澀谷搭山手線很快就到新宿：3 小時的併團步行導覽，走過回憶橫丁、歌舞伎町與黃金街，最後在黃金街的居酒屋喝一杯。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[1], LOCALE, {
    label: "東京市區觀光巴士一日遊",
    ctaLabel: "查看東京一日遊 →",
    why: "如果時段在晚上，白天還能看東京其他地方：由導遊帶領走訪皇居庭園、淺草與東京晴空塔的一日遊，附多語語音導覽。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[2], LOCALE, {
    label: "東京地鐵通票（24／48／72小時）",
    ctaLabel: "查看地鐵通票 →",
    why: "澀谷站有半藏門線、銀座線與副都心線，24／48／72 小時票就能涵蓋往返展望台的地鐵——但不包含山手線等 JR 路線。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[3], LOCALE, {
    label: "Klook 日本 eSIM 網卡",
    ctaLabel: "查看 Klook eSIM →",
    why: "Klook 的門票是手機上的電子票，時段也是固定的——從機場開始就有網路，當天的憑證、地圖和天氣都能隨時查看。",
  }),
  withKlookLocale(shibuyaSkySameDayPrep[4], LOCALE, {
    label: "成田・羽田機場 ⇄ 東京 專車接送",
    ctaLabel: "查看機場接送 →",
    why: "直接預約到飯店地址而不是車站，成田、羽田兩座機場都有，司機會追蹤你的航班——抵達當天就排了晚場時特別實用。",
  }),
];

// Klook "the rest of the day" — the English page's items, on the zh-TW locale path.
const dayTripPrep: KlookTripPrepItem[] = [
  withKlookLocale(shibuyaSkyDayTripPrep[0], LOCALE, {
    label: "澀谷周邊飯店",
    ctaLabel: "在 Klook 查看澀谷飯店 →",
    why: "日落場結束時天已經黑了，山手線正是最擠的時候；住在澀谷，回程就是走路的距離，隔天早上也正好在高速巴士發車的車站旁。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[1], LOCALE, {
    label: "澀谷酒吧巡禮導覽（3 小時）",
    ctaLabel: "查看澀谷酒吧巡禮 →",
    why: "日落場之後那幾個小時最順理成章的安排，也是屋頂上看不到的那一面澀谷——兩間酒吧，由導遊幫你點酒。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[2], LOCALE, {
    label: "東京夜間酒吧巡禮導覽（新宿／澀谷）",
    ctaLabel: "查看夜間導覽 →",
    why: "連新宿一起走的版本，適合夜間場：展望台晚場最好訂，看完之後這個夜晚還有地方可去。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[3], LOCALE, {
    label: "澀谷美食與文化半日步行導覽",
    ctaLabel: "查看美食步行導覽 →",
    why: "如果你的時段在白天，或同行有未滿 20 歲的人，這是白天、全年齡都適合的選擇——半天走訪澀谷 109、呑兵衛橫丁與宮下公園，而不是酒吧巡禮。",
  }),
  withKlookLocale(shibuyaSkyDayTripPrep[4], LOCALE, {
    label: "東京地鐵通票（24／48／72小時）",
    ctaLabel: "查看地鐵通票 →",
    why: "澀谷站有半藏門線、銀座線與副都心線，24／48／72 小時票就能涵蓋時段前後一整天的移動——而且海外感應式信用卡刷不開這些閘門。",
  }),
];

// Klook tours in the same city — the English page's two, on the zh-TW locale path.
const tourPicks: KlookTour[] = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "東京市區觀光巴士一日遊",
    desc: "由導遊帶領走訪皇居庭園、淺草與東京晴空塔，附多語語音導覽",
  }),
  withKlookLocale(fujiHakoneDayTour, LOCALE, {
    title: "富士山＋箱根一日遊",
    desc: "富士山五合目搭配箱根火山地帶與蘆之湖，從東京出發的一日遊",
  }),
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "澀谷SKY 門票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhShibuyaSkyTicketsPage({ updated }: { updated: PageUpdated }) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            澀谷SKY 門票（2026）：<br />票價、開放時間與日落時段
          </h1>
          <p className={styles.heroSubtitle}>
            東京最好的屋頂視角——澀谷十字路口上方 229 公尺。兩段票價、兩週的預約窗口，
            以及一個真的會賣完的時段。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價已查核", "日落場開賣時間", "與晴空塔、東京鐵塔比較"].map((t) => (
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
            <strong>澀谷SKY 門票線上購買，成人 10:00～14:59 入場 ¥2,700，15:00～21:20 入場 ¥3,400</strong>；14 樓窗口每段貴
            ¥300（¥3,000／¥3,700）。澀谷SKY 每個日期在<strong>兩週前的日本時間 00:00</strong> 開賣，日落場最先賣完，
            所以日落場要在你的日期開賣那一刻立刻訂。澀谷SKY 開放時間 10:00～22:30（最後入場 21:20），入場後沒有停留時間限制，
            多數遊客停留約 90 分鐘。
          </p>
          <p className={styles.bodyText}>
            6～12 歲兒童票 ¥1,200，只在窗口販售；學齡前兒童免費入場。可以向營運方官網或 Klook 這類售票平台購買——自
            2024 年 7 月起，官網對許多海外發行的信用卡刷不過。票價出自澀谷 Scramble Square 2025 年 2 月 27 日自己的票價改定
            （查核日 {CHECKED}）；票價、開放時間與停留規定已於 {LAST_CHECKED} 對照營運方官網與東京都官方觀光網站重新查核。
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
                <p className={styles.verdictStatLabel}>票價（線上）</p>
                <p className={styles.verdictStatValue}>成人 ¥2,700／¥3,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>開放時間</p>
                <p className={styles.verdictStatValue}>10:00～22:30，最後入場 21:20</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>開賣</p>
                <p className={styles.verdictStatValue}>兩週前、日本時間 00:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最先賣完</p>
                <p className={styles.verdictStatValue}>日落場</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>線上訂（兩段都比窗口便宜 ¥300）；想看日落，就在兩週前你的日期一開賣時立刻訂。
              如果你的卡是海外發行的，就透過 Klook 訂：接受海外信用卡，並標示入場前 24 小時可免費取消。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看澀谷SKY 門票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
            </div>
          </div>
        </div>

        <BookingEsimCard />

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>2026 年澀谷SKY 門票多少錢？</h2>
          <p className={styles.bodyText}>
            成人 15 點前入場 ¥2,700、15 點起 ¥3,400——在窗口買而不是線上買，每段再多 ¥300。這個兩段式的結構，
            是多數攻略到現在還寫錯的地方：自 2025 年 4 月 1 日澀谷 Scramble Square 依入場時間拆分票價以來，
            澀谷SKY 就不再只有一種票價。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "官網（預購）", "14 樓窗口"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.online}</td>
                      <td className={styles.tdPrice}>{row.counter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            票價查核日 {CHECKED}，依澀谷 Scramble Square 2025 年 2 月 27 日的公告「SHIBUYA SKY
            入場チケットの改定について」，自 2025 年 4 月 1 日入場起適用。兒童票價與僅限窗口販售的規定出自營運方的票券頁面。
            預訂時請再確認——這些數字連同本指南涵蓋的其他景點，都整理在{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景點門票價格總表（英文）
            </Link>
            ，每一項都附上查核日期。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後查核：{LAST_CHECKED}</strong> · 來源：
            <a href={OFFICIAL_URL} target="_blank" rel="noopener" style={sourceLink}>shibuya-scramble-square.com/sky/ticket/</a>
            （營運方）與
            <a href={GOTOKYO_URL} target="_blank" rel="noopener" style={sourceLink}>gotokyo.org</a>
            （東京都，刊載相同票價）。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看澀谷SKY 可訂時段 →
            </KlookLink>
          </div>
        </section>

        {/* Klook, directly under the price table: what the same day needs booking. */}
        <KlookTripPrep
          label="同一天要訂的"
          heading="和澀谷SKY 門票一起預訂的項目"
          intro="澀谷SKY 的時段大約只佔一天中的一小時。同一天通常還需要這五項：看完之後的夜晚、之前的白天、中間的移動、手機網路，以及從機場進市區。"
          items={sameDayPrep}
        />

        {/* Q2 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>開放時間</span>
          <h2 className={styles.sectionTitle}>澀谷SKY 幾點開放？最後入場是幾點？</h2>
          <p className={styles.bodyText}>
            10:00 到 22:30，最後入場 21:20。開放時間同時也是票價：14:59 是 ¥2,700 那一段的最後入場時間，
            15:00 到截止前一律 ¥3,400——所以「我們幾點去？」在成為光線問題之前，先是一個 ¥700 的問題。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "澀谷SKY"].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
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
            <strong>最後查核：{LAST_CHECKED}</strong> · 開放時間與最後入場：
            <a href="https://www.shibuya-scramble-square.com/en/" target="_blank" rel="noopener" style={sourceLink}>shibuya-scramble-square.com</a>
            （營運方）。停留時間限制、一般停留時間、交通與元旦休館：
            <a href={GOTOKYO_URL} target="_blank" rel="noopener" style={sourceLink}>gotokyo.org</a>
            （東京都）。屋頂是開放式的，所以遇到強風、打雷或大雨時，屋頂可能當天關閉，室內樓層則照常開放。
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            澀谷SKY 要待多久？
          </h3>
          <p className={styles.bodyText}>
            預留約 90 分鐘：澀谷SKY 入場後沒有停留時間限制，根據東京都官方觀光網站，多數遊客就是停留這麼久。
            門票只固定入場時間，所以在日落前 30～60 分鐘入場，就能一路待到城市亮燈，只要在 22:30 前離開即可。入場後不予退款。
          </p>
        </section>

        {/* Q3 — booking window, then the CTA stack */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>開賣時間</span>
          <h2 className={styles.sectionTitle}>澀谷SKY 需要事先預約嗎？</h2>
          <p className={styles.bodyText}>
            想看日落的話，需要——而且截止時間比多數人以為的更早。每個日期在
            <strong>剛好兩週前的日本時間 00:00</strong> 開賣，也就是台北時間前一天晚上 23:00。熱門日期的日落場就是會被訂光的那一批，
            所以實用的原則是：你的日期一開賣就在結帳頁面等著，而不是出發那一週才訂。白天或晚場的空間大得多——
            但線上訂每人仍省 ¥300。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["問題", `營運方公布的內容（查核日 ${CHECKED}）`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            列出兩個販售管道，是因為一邊賣完的時段，另一邊不一定也沒了——也因為自 2024 年 7 月起，
            官網對許多海外發行的信用卡刷不過：
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看澀谷SKY 門票 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
          </div>
        </section>

        {/* Q4 — which slot */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>選時段</span>
          <h2 className={styles.sectionTitle}>澀谷SKY 該訂哪個時段？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            訂得到就選日落場；價格是關鍵就選 15 點前；日落場沒了就選晚場。東京的日落時間從 12 月中旬的 16:29
            到 6 月中旬的 18:58，所以最搶手的場次並不是一整年都同一個——但它永遠落在 ¥3,400 那一段。
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.25rem", marginBottom: "0.6rem" }}>
            澀谷SKY 每個月的日落時段是幾點？
          </h3>
          <p className={styles.bodyText}>
            請預訂比下表日落時間早 30～60 分鐘的入場時段。這個時段最先賣完，所以請在你的日期於兩週前日本時間 00:00
            開賣時立刻訂。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["月份（15 日）", "東京日落時間", "建議入場時間"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sunsetRows.map((row) => {
                    const [h, m] = row.sunset.split(":").map(Number);
                    const start = h * 60 + m - 60;
                    const end = h * 60 + m - 30;
                    const fmt = (t: number) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
                    return (
                      <tr key={row.month}>
                        <td className={styles.tdProvider}>{row.month}</td>
                        <td className={styles.tdPrice}>{row.sunset}</td>
                        <td style={{ fontSize: "0.88rem" }}>{fmt(start)}～{fmt(end)}（¥3,400 那一段）</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後查核：{LAST_CHECKED}</strong> · 來源：2026 年東京日落時間，出自
            <a href={NAOJ_URL} target="_blank" rel="noopener" style={sourceLink}>日本國立天文台</a>
            ；其他年份相差一兩分鐘。「建議入場時間」為日落前 30～60 分鐘，是本指南的建議，並非營運方規定。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看你的日期的日落時段 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
          </div>
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
            在屋頂待一小時只是一個晚上的其中一段，所以時段通常是配合當天其他安排來選的。我們把它排進了{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              東京三天行程（英文）
            </Link>
            ，也列在{" "}
            <Link href="/zh-tw/guides/attractions/things-to-do-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              東京自由行景點
            </Link>
            的推薦名單裡。
          </p>
        </section>

        {/* Klook: the evening the slot sits inside. */}
        <KlookTripPrep
          label="當天其他時間"
          heading="澀谷SKY 這一天還要訂什麼？"
          intro="展望台本身大約一小時，所以不論你在上面選了哪個時段，前後都還有大半天或一整個晚上。以下是隨著時段而來的預訂——同一區的住宿、看完之後的去處，以及涵蓋其間移動的票券。"
          items={dayTripPrep}
        />

        {/* Q5 — vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>澀谷SKY、晴空塔、東京鐵塔——該選哪個展望台？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            澀谷SKY 贏在那張經典的十字路口照片，但它既不是東京最高的展望台，也不是最便宜的——而且自 2025 年 4 月的票價改定後，
            15:00 入場比東京鐵塔的 Top Deck Tour 還貴。要純粹的高度與富士山視野選晴空塔，要復古地標選東京鐵塔，
            想免費看全景就去新宿的東京都廳。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["展望台", "高度", "特色", "成人票價", "區域／最近車站"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            高度為概估值；每個票價都是營運方自己的價格，取自{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              我們的門票價格總表（英文）
            </Link>
            ，每一項都有各自的查核日期。四個展望台逐一、逐時段的完整比較，請見{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={{ color: "var(--text)", fontWeight: 600 }}>
              東京展望台比較（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>頂樓規定</span>
          <h2 className={styles.sectionTitle}>SHIBUYA SKY 頂樓可以帶什麼上去？</h2>
          <ul className={styles.bodyList}>
            <li><strong>不可帶上頂樓:</strong> 包包、背包、雨傘、自拍棒。上去前先存放在 46 樓的置物櫃。</li>
            <li><strong>可以帶:</strong> 手機與可放進口袋的相機。</li>
            <li><strong>三腳架與單腳架:</strong> 只能在 46 樓室內使用，人多時工作人員可能請你停止。頂樓與其他樓層禁止使用。</li>
            <li><strong>天候不佳:</strong> 天氣轉壞時頂樓可能不經預告關閉，室內樓層仍開放。訂票前請看清楚你的票券條款。</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            依營運方購票 FAQ 的搜尋索引內容，2026 年 11 月 6 日查閱。規定可能變動，當天請在實際頁面再確認。
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>澀谷SKY 怎麼訂？</h2>
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

        <FaqList items={faqItems} />

        {/* Klook tours in the same city */}
        <KlookTourPicks
          heading="同一座城市出發的一日遊"
          intro="澀谷SKY 的時段只佔一個晚上中的一小時，一天裡其他時間都還空著。如果東京的某一天還沒排好，這兩個行程都能用你訂門票的同一個 Klook 帳號預訂。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-observation-decks", title: "東京展望台比較（2026）：澀谷SKY、晴空塔、東京鐵塔（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "東京三天行程（2026）：要訂什麼、照什麼順序訂（英文）" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "東京鐵塔門票（2026）：票價、Main Deck 與 Top Deck、預訂方式（英文）" },
            { href: "/zh-tw/guides/attractions/tokyo-skytree-tickets", title: "東京晴空塔門票（2026）：票價、350 與 450 樓怎麼選" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "東京地鐵通票（2026）：24、48 或 72 小時——值得買嗎？（英文）" },
            { href: "/zh-tw/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 門票 2026：票價、時間與預約方式" },
            { href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", title: "teamLab 無界 門票（2026）：票價、時段預約與購票管道" },
            { href: "/guides/transport/tokyo-transportation", title: "東京交通攻略（2026）：電車、地鐵與 IC 卡（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
            { href: "/zh-tw/guides/attractions/tokyo-disney-tickets", title: "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "東京看相撲（2026）：本場所門票與晨間練習（英文）" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>搶下澀谷的日落</h2>
            <p className={styles.ctaBannerDesc}>
              兩段票價都是線上比窗口便宜 ¥300，每個日期在兩週前的日本時間午夜開賣。Klook 接受海外信用卡，
              並標示入場前 24 小時可免費取消——東京天氣變了也不怕。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看澀谷SKY 門票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
