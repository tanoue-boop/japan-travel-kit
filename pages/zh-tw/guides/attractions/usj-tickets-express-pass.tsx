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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import GygCompare, { GygCompareButton } from "../../../../components/GygCompare";
import { gygUsj, gygUsjExpressPass } from "../../../../lib/gyg-links";
import {
  jrHarukaUrl,
  jrKansaiMiniPass,
  klookEsim,
  nankaiRapitUrl,
  parkFrontHotelUsjKlook,
  usjExpressSameDayPrep,
  usjSameDayPrep,
  usjStayAreas,
  usjTripPrep,
  usjHighRateTopPrep,
  osakaSightsHighRatePrep,
  type KlookStayArea,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { zhUsjExpressPass, zhUsjStudioPass } from "../../../../lib/klook-links-zh-tw";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English guide (pages/guides/attractions/usj-tickets-express-pass.tsx) as of
// 2026-11-01: same sections, tables, FAQ and Klook / GetYourGuide blocks in the same order.
// No figure is added here; every fact and date is the English page's own.

const ROUTE = "/zh-tw/guides/attractions/usj-tickets-express-pass";
// 2026-11-14: the exact query leads the title, H1 and meta, in the same order (mirrors English).
// 2026-11-22 (R04): Taiwanese readers search "fast pass", "快證", "快速通關", "快通4" — not "Express Pass".
// Title and H1 now read 快速通關 → Fast Pass → 價錢 → 種類, in that order.
const TITLE = "日本環球影城快速通關 2026：Fast Pass 價錢・種類比較";
const H1 = "日本環球影城快速通關 2026：快速通關價格與種類比較";
const DESC =
  "USJ fast pass（快證）價錢依入園日期變動、須另買入園票。快通4・快通7 差在哪、提早多久買、沒有快速通關可以玩嗎，一次比較。";

const LOCALE = "zh-tw" as const;
const GYG_SLUG = "zh-tw-usj-tickets-express-pass";

const STUDIO_PASS_URL = zhUsjStudioPass.url;
const EXPRESS_PASS_URL = zhUsjExpressPass.url;
const HOTELS_URL = klookFor(usjStayAreas[0].url, LOCALE);
const HARUKA_URL = klookFor(jrHarukaUrl, LOCALE);
const RAPIT_URL = klookFor(nankaiRapitUrl, LOCALE);
const MINI_PASS_URL = klookFor(jrKansaiMiniPass.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const CHECKED = dateLabel("2026-10-26", LOCALE);
const CHECKED_USJ = dateLabel("2026-10-27", LOCALE);
const CHECKED_TODAY = dateLabel("2026-11-22", LOCALE);
const USJ_EXPRESS_URL = "https://www.usj.co.jp/web/en/us/tickets/express-pass";
const VARIANT_PRICE = "依入園日期而異——結帳時顯示";

// 2026-11-22 (R04): one-glance table under the opening answer — type × what it covers × price × where to
// buy. Every value is taken from the variant and buy-channel tables below (and the English page); no yen.
const typeRows = [
  {
    type: "結論：多數人選快速通關 7",
    covers: "第一次造訪、只有一天能玩，又遇上週末或國定假日，建議選擇涵蓋 7 項設施的快速通關 7；人少的日期選快速通關 4。",
    price: "依入園日期而異，USJ 不公布固定金額",
    where: "USJ 官方 WEB Ticket Store／Klook，約入園前兩個月開賣",
  },
  {
    type: "快速通關 4（Express Pass 4）",
    covers: "包含 4 項設施，實際設施組合依版本與日期而定",
    price: VARIANT_PRICE,
    where: "官方 WEB Ticket Store、Lawson Ticket、Klook",
  },
  {
    type: "快速通關 7（Express Pass 7）",
    covers: "包含 7 項設施，包含的設施同樣依版本而定",
    price: VARIANT_PRICE,
    where: "官方 WEB Ticket Store、Lawson Ticket、Klook",
  },
  {
    type: "含超級任天堂世界區域入場的版本",
    covers: "附超級任天堂世界的園區指定時段入場券，出發前就能確定入區時段",
    price: VARIANT_PRICE,
    where: "只有註明包含的版本才有",
  },
  {
    type: "當天在樂園門口",
    covers: "—",
    price: "—",
    where: "沒有門口販售——USJ 已不在門口販售當日票，請事先線上購買",
  },
];

const ticketRows = [
  { ticket: "一日 Studio Pass", what: "一天的入園資格；一般設施走普通排隊", price: "依日期定價——當天價格在結帳時顯示" },
  { ticket: "二日 Studio Pass", what: "連續兩天入園，平均每天通常比較便宜", price: "依日期定價——當天價格在結帳時顯示" },
  { ticket: "快速通關（加購）", what: "在固定幾項設施走另一條較短的隊伍。不是入園票——還需要 Studio Pass 或年票", price: "依日期定價，採用 USJ 自 2018 年起為快速通關導入的制度" },
];

const variantRows = [
  // First row is the answer (2026-11-14, mirrors English).
  {
    pass: "不確定？從這裡開始",
    covers: "第一次來、人多的一天選快速通關 7；人潮較少的日期或第二次來選快速通關 4；如果超級任天堂世界是這趟的理由，選含超級任天堂世界區域入場的版本。",
    snw: "選註明含區域入場的版本",
    price: VARIANT_PRICE,
    bestFor: "週末或假日第一次來的多數人：快速通關 7",
  },
  {
    pass: "快速通關 4",
    covers: "四項設施。USJ 將這款定位為暢玩人氣設施的通關券；實際設施組合依版本與日期而定。",
    snw: "只有註明包含的版本才有",
    price: VARIANT_PRICE,
    bestFor: "時間短的一天、第二次來，或人少的日子只想玩主力設施",
  },
  {
    pass: "快速通關 7",
    covers: "七項設施——多數第一次來的人會在兩種數量中選的較大那一款，設施清單同樣依版本而定。",
    snw: "只有註明包含的版本才有",
    price: VARIANT_PRICE,
    bestFor: "只有一天、第一次來、人多的日子",
  },
  {
    pass: "其他數量與主題版本",
    covers: "USJ 也賣以單一設施或季節陣容為主的快速通關，各有自己的清單，會隨樂園活動推出與下架。",
    snw: "依版本而異",
    price: VARIANT_PRICE,
    bestFor: "有特別想玩的設施，而非希望一次體驗多項設施的旅客",
  },
  {
    pass: "含區域入場的版本",
    covers: "部分快速通關附帶超級任天堂世界的園區指定時段入場券，讓你在抵達前就取得入區時段。",
    snw: "有——多付的錢就是買這項入場資格",
    price: VARIANT_PRICE,
    bestFor: "超級任天堂世界就是這趟旅行理由的人",
  },
];

const pricingRows = [
  {
    what: "快速通關價格",
    usj: "有效快速通關的種類與價格，依日期而異。",
    source: "Universal Express Pass 頁面，usj.co.jp",
  },
  {
    what: "這套定價方式實施多久了",
    usj: "快速通關自 2018 年起即採類似的需求定價制度，目前沒有變更計畫。",
    source: "〈Pricing for Studio Passes to Change〉，2026年6月30日，usj.co.jp",
  },
  {
    what: "Studio Pass 價格（你同時需要的入園票）",
    usj: "2026年7月1日起販售、適用於2026年9月1日起入園的門票，每日價格依需求重新評估。兒童與長者票價也會變動；年票不在此列。",
    source: "〈Pricing for Studio Passes to Change〉，2026年6月30日，usj.co.jp",
  },
  {
    what: "USJ 官方建議",
    usj: "價格可能上漲，請盡早購買。",
    source: "〈Pricing for Studio Passes to Change〉，2026年6月30日，usj.co.jp",
  },
];

const windowRows = [
  {
    q: "最早可以多久前買？",
    a: "大約在入園日前兩個月，於官方 WEB Ticket Store 與 Lawson Ticket（網站與 Lawson 店內的 Loppi 機台）開賣。",
    source: "購票期間公告，2025年4月21日，usj.co.jp",
  },
  {
    q: "這個期間曾經更長嗎？",
    a: "有。大阪世博期間（入園日至2025年10月13日為止）放寬為三個月，USJ 表示之後會恢復為約兩個月。",
    source: "購票期間公告，2025年4月21日，usj.co.jp",
  },
  {
    q: "每天賣多少張？",
    a: "每天數量有限——USJ 官方頁面指出，常常會提前售完。",
    source: "Universal Express Pass 頁面，usj.co.jp",
  },
  {
    q: "可以改到別的日期嗎？",
    a: "不行。預先購買的快速通關只在票面日期有效；指定時間的設施若遲到，既不退款，也不能改到其他時段。",
    source: "Universal Express Pass 頁面，usj.co.jp",
  },
];

const needRows = [
  // First row is the answer (2026-11-14, mirrors English).
  {
    date: "簡短答案",
    verdict: "週末、假日與寒假期間買；人少的平日不買",
    why: "USJ 每天販售數量有限，並表示常常提前售完，價格也依日期隨需求變動。",
  },
  {
    date: "日本學校假期以外、人少的平日",
    verdict: "通常可以不買",
    why: "一般排隊所需的時間較短，而透過官方 App 免費取得園區指定時段入場的方式，在你入園時最有可能還有名額。",
  },
  {
    date: "週六或週日",
    verdict: "買",
    why: "依日期定價反映的正是週末需求。這是快速通關的一般情況，便宜的版本會最早售罄。",
  },
  {
    date: "日本國定假日或連假",
    verdict: "買，而且要早買",
    why: "國內需求疊在旅客需求之上，每天的配額又有上限。這些日子，你想要的版本最有可能已經沒了。",
  },
  {
    date: "25 週年與冬季假期日期",
    verdict: "你的日期一開賣就買",
    why: `2026 年是 USJ 的 25 週年，USJ 官方新聞稿也在2026年9月14日推出 Holiday Kids Free Pass，邀請全國兒童這個冬天免費入園——同樣的日期會有更多家庭，於${CHECKED_USJ}查閱。`,
  },
  {
    date: "超級任天堂世界是你去的理由",
    verdict: "買含區域入場的版本",
    why: "這是在抵達前就取得入區時段的唯一方式。免費的方式確實存在，但那是當天在園內先到先得。",
  },
];

const buyRows = [
  {
    where: "USJ WEB Ticket Store（官方）",
    what: "你入園日期當天在售的所有版本，以當天價格販售",
    opens: "入園日前約兩個月",
    change: "僅限票面日期有效（USJ）",
    note: "熱門日期開賣時，購票網站可能啟用線上排隊系統。",
  },
  {
    where: "Lawson Ticket——網站與 Loppi 機台",
    what: "USJ 點名的另一個官方管道",
    opens: "入園日前約兩個月",
    change: "僅限票面日期有效（USJ）",
    note: "在 USJ 2025年4月21日的購票期間公告中，與 WEB Ticket Store 並列。",
  },
  {
    where: "Klook",
    what: "單獨販售的快速通關，結帳介面易懂、可用海外信用卡付款，並提供電子票",
    opens: "依商品頁顯示的日期",
    change: "請看商品頁的取消規定",
    note: "USJ 官方指定時間入場頁面指出，區域入場也可以透過特定旅行社事先取得。",
  },
  {
    where: "GetYourGuide",
    what: "單獨販售的快速通關，作為第二個購買管道",
    opens: "依商品頁顯示的日期",
    change: "請看商品頁的取消規定",
    note: "第一個管道已售完你要的日期時，值得來這裡看看——配額除了每天有上限，也是按販售管道分配。",
  },
  {
    where: "當天在樂園",
    what: "沒有門口販售——USJ 已不在門口販售當日票",
    opens: "—",
    change: "—",
    note: "出發前先線上購買。",
  },
];

const steps = [
  {
    title: "先確定日期，再買 Studio Pass",
    desc: "這頁的其他內容都以日期為準。USJ 已不在門口販售當日票，所以 Studio Pass 要線上購買——而它正是快速通關不包含的入園票。",
  },
  {
    title: "判斷這個日期需不需要快速通關",
    desc: "參考上面的「買或不買」表。人少的平日常常不需要；週末、日本國定假日或週年慶期間就需要。",
  },
  {
    title: "確認版本是否包含超級任天堂世界",
    desc: "區域入場是另外的附加內容，不是理所當然。如果超級任天堂世界是你去的理由，就買註明含園區指定時段入場券的版本。",
  },
  {
    title: "出發前先安裝官方 USJ App",
    desc: `USJ 官方指定時間入場頁面指出，自2026年1月5日起，必須用官方 App 取得園區指定時段入場券與 Standby Entry Ticket，而且要先在 App 裡登錄你的入園票。於${CHECKED_USJ}查閱。`,
  },
  {
    title: "建議提早抵達園區",
    desc: "人潮較多時，園區可能提早開園。提早到，免費取得區域指定時段入場的機會才比較實際——如果你買的版本不含區域入場的話。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "USJ 快速通關、fast pass、快證是一樣的嗎？",
    a: `是同一張票。日本環球影城付費縮短排隊的票叫做 Universal Express Pass（快速通關），「USJ fast pass」「快證」「快通」都是旅客對它的叫法；USJ 官方票券頁面沒有另外的 Fast Pass 商品。它主要分為快速通關 4 與快速通關 7，綁定一個日期，同一天還需要 Studio Pass。於${CHECKED_USJ}在 usj.co.jp 查閱。`,
  },
  {
    q: "USJ 門票一定要提前買嗎？",
    a: "要。日本環球影城已停止在門口販售當日票，所以要在出發前線上購買。透過 Klook 這類代售平台訂，結帳介面易懂、接受海外信用卡，並發送入園時可掃描的電子票。",
  },
  {
    q: "2026 年的 USJ 快速通關值得買嗎？",
    a: `人多的日子，值得。2026 年是 USJ 的 25 週年——樂園官方新聞稿在2026年9月14日與9月28日發布了週年相關消息，於${CHECKED_USJ}查閱——週末或國定假日，快速通關能把好幾小時的普通排隊換成另一條短隊伍，含區域入場的版本還附超級任天堂世界的入區資格。人少的離峰平日就沒那麼必要：一般排隊所需的時間較短，用 App 免費取得該區入場資格的機會也最高。`,
  },
  {
    q: "環球快通4 和快通7 差在哪？",
    a: "差在涵蓋的設施數：快通4（快速通關 4）是四項，快通7（快速通關 7）是七項。USJ 將快速通關 4 定位為暢玩人氣設施的那一款，快速通關 7 則是兩者中涵蓋較廣的。實際設施組合依版本與日期而定，超級任天堂世界的區域入場也只有註明包含的版本才有，所以購買前請確認你那天的內容。",
  },
  {
    q: "沒有 Studio Pass 可以只用快速通關嗎？",
    a: `不行。USJ 官方快速通關頁面寫明，入園需要 Studio Pass 入園券（或年票），快速通關之外還需要另外購買的樂園入場券。快速通關只是在你入園後縮短排隊。於${CHECKED_USJ}查閱。`,
  },
  {
    q: "沒有快速通關可以玩嗎？",
    a: `可以。有 Studio Pass 就能入園、排一般隊伍玩所有設施；快速通關只是另外付費縮短排隊。人少的平日通常只買 Studio Pass 就夠了，USJ 也有免費的單人乘坐通道（Single Rider），超級任天堂世界則可在入園後用官方 App 免費取得園區指定時段入場券（先到先得）。週末、國定假日與寒假期間排隊較長，才建議加買。於${CHECKED_USJ}在 usj.co.jp 查閱。`,
  },
  {
    q: "大阪環球影城快速通關要提早多久買？",
    a: `入園日前約兩個月開賣，週末、國定假日與寒假期間的日期一開賣就買。每天數量有限，USJ 官方頁面指出常常提前售完。USJ 官方2025年4月21日的購票期間公告指出，門票——Studio Pass、快速通關等——約在兩個月前於官方 WEB Ticket Store 與 Lawson Ticket 開賣；大阪世博期間（入園日至2025年10月13日為止）曾放寬為三個月，之後恢復為約兩個月。於${CHECKED_USJ}查閱。`,
  },
  {
    q: "USJ 快速通關可以改日期或退款嗎？",
    a: `請視為無法更改。USJ 官方快速通關頁面寫明，預先購買的通關券只在票面日期有效；指定時間的設施若遲到，不退款，也不能改到其他時段。於${CHECKED_USJ}查閱。`,
  },
  {
    q: "怎麼進超級任天堂世界？",
    a: `有兩種方式，都是 USJ 官方的：事先購買含園區指定時段入場券的快速通關版本，或在入園後透過官方 USJ App 取得。USJ 的指定時間入場頁面也說，自2026年1月5日起，必須用官方 App 取得園區指定時段入場券與 Standby Entry Ticket，而且要先在 App 裡登錄入園票。於${CHECKED_USJ}查閱。人少的日子也許可以直接入園，但不該把行程賭在這上面。`,
  },
  {
    q: "USJ fast pass 多少錢？",
    a: `USJ 沒有公布固定金額。它自己的快速通關頁面說，有效快速通關的種類與價格依日期而異；2026年6月30日關於 Studio Pass 定價的公告也說，快速通關自 2018 年起採需求定價制度，目前沒有變更計畫。當天價格會在結帳時顯示，所以這裡不列日圓金額——於${CHECKED_USJ}查閱。`,
  },
  {
    q: "去日本環球影城該住哪裡？",
    a: `想在開園時就到門口，住環球城；否則住梅田或大阪站一帶。從 JR 夢咲線的環球城站步行到樂園大門約五分鐘，從大阪站到樂園約 20 分鐘——兩個數字都出自大阪觀光局（Osaka Convention & Tourism Bureau）官方資料，於${CHECKED}查閱。JR 西日本官方目的地頁面把環球城站列為樂園最近的車站，並形容樂園「就在旁邊」。取捨在於其餘行程：梅田與大阪站讓你留在 JR 主要路網上，而環球城的飯店集中在一小區，人多的日子最先客滿。`,
  },
  {
    q: "從關西機場或大阪站怎麼去 USJ？",
    a: `車站是 JR 夢咲線（櫻島線）的環球城站，通常在西九條轉車，大阪觀光局說從大阪站到樂園約 20 分鐘。從關西機場沒有直達電車：JR 西日本的 HARUKA 不必轉車直達天王寺、大阪、新大阪與京都——以「短期停留（Temporary Visitor）」身分入境的外國護照持有人可買的優惠單程票，到2026年10月31日為止，到天王寺 ¥1,300、到大阪或新大阪 ¥1,800，2026年11月1日起調整為 ¥1,600 與 ¥1,900——或搭南海 Rapi:t 到難波，最快 34 分鐘，除了車資外，還需另外購買成人 ¥700 的特急券。之後都搭環狀線到西九條，再轉夢咲線。所有數字於${CHECKED}查閱。`,
  },
  {
    q: "USJ 快速通關當天要怎麼使用？",
    a: "在快速通關入口向工作人員出示含 QR 碼的完整票券畫面。部分設施的時間印在票上，其餘在營業時間內隨時可使用快速通關。若未依指定時間抵達，恕不退款，也無法更改時段；票券每人一張。依 usj.co.jp 的搜尋索引內容，2026 年 11 月 6 日查閱。",
  },
  {
    q: "有哪張大阪或關西的票券包含 USJ 嗎？",
    a: `樂園本身不在大阪周遊卡（Osaka Amazing Pass）的範圍內，也沒有任何大阪地鐵票券涵蓋前往環球城的 JR 路段。鐵路方面，JR 西日本官方的關西地區鐵路周遊券頁面把 WEST QR Kansai Mini Pass 描述為「京都、日本環球影城、大阪、難波、神戶、奈良 3 日無限搭乘」——成人 ¥3,000、兒童 ¥1,500，連續三天可搭普通、快速與新快速列車，但不能搭包括 HARUKA 在內的任何特急。WEST QR Kansai Area Pass 則涵蓋 HARUKA，自由席無限次加上兩次指定席，一日 ¥2,700 到四日 ¥6,700。於${CHECKED}查閱。以上都不含樂園門票——入園一定要另外買 Studio Pass。`,
  },
];

/** The FAQPage markup carries five questions; the visible list keeps all of them.
 *  2026-11-22 (R04): the five are the landing queries as readers type them (fast pass, 快證, 快通4). */
const FAQ_SCHEMA_QS = new Set([
  "USJ fast pass 多少錢？",
  "環球快通4 和快通7 差在哪？",
  "大阪環球影城快速通關要提早多久買？",
  "沒有快速通關可以玩嗎？",
  "USJ 快速通關、fast pass、快證是一樣的嗎？",
]);
const faqSchemaItems = faqItems.filter((item) => FAQ_SCHEMA_QS.has(item.q));

// Same products, same order as the English usjExpressSameDayPrep — on Klook's zh-TW path.
const expressSameDayCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "The Park Front Hotel at Universal Studios Japan（USJ 官方飯店）",
    ctaLabel: "查看 The Park Front Hotel →",
    why: "就在主大門外的 USJ 官方飯店——買了快速通關的日子，重點就是早點通過閘門。大門旁的飯店房間，正是在快速通關售完的同一批熱門日期最先客滿。",
  },
  {
    label: "Hotel Kintetsu Universal City（USJ 官方飯店）",
    ctaLabel: "查看 Hotel Kintetsu Universal City →",
    why: "另一家 USJ 官方飯店，就在環球城站旁，適合你那天 The Park Front Hotel 已客滿時。",
  },
  {
    label: "關西機場利木津巴士（單程）",
    ctaLabel: "查看機場利木津巴士 →",
    why: "商品包含關西機場 ⇄ 日本環球影城路線，抵達當天不必拖著行李轉車。",
  },
  {
    label: "Klook 日本 eSIM 網卡",
    ctaLabel: "查看 Klook eSIM 方案 →",
    why: "快速通關與 Studio Pass 都是 QR 電子票，超級任天堂世界的園區指定時段入場也透過 USJ 官方 App 辦理——使用這些服務時，都需要在園內能連上網路。",
  },
];
const expressSameDayPrep: KlookTripPrepItem[] = usjExpressSameDayPrep.map((item, i) => withKlookLocale(item, LOCALE, expressSameDayCopy[i]));

// Same products, same order as the English usjSameDayPrep — on Klook's zh-TW path.
const sameDayCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "日本環球影城周邊飯店（環球城）",
    ctaLabel: "在 Klook 查看環球城飯店 →",
    why: "與我們大阪住宿指南使用的同一個 Klook 飯店搜尋。從環球城站步行到樂園大門約五分鐘，適合想在開園前就抵達入口的旅客。",
  },
  {
    label: "大阪周遊卡（1日／2日）",
    ctaLabel: "查看大阪周遊卡 →",
    why: "用在樂園前後的大阪行程，而不是樂園當天：包含大阪地鐵、市營巴士與 40 多處設施入場，但不含日本環球影城，也不含前往環球城的 JR。",
  },
  {
    label: "JR HARUKA 關西機場特急車票",
    ctaLabel: "查看 HARUKA 車票 →",
    why: "從關西機場直達天王寺、大阪或新大阪——前往 USJ 的轉乘車站；Klook 商品頁註明，僅限以「短期停留（Temporary Visitor）」身分入境的非日本護照旅客購買。",
  },
  {
    label: "大阪美食導覽（道頓堀巷弄）",
    ctaLabel: "查看大阪美食導覽 →",
    why: "安排在不去樂園那天的晚上：3 小時的併團步行導覽，走進道頓堀大街以外的巷弄，品嚐串炸、章魚燒與在地甜點，並造訪隱藏版居酒屋。",
  },
  {
    label: "Klook 日本 eSIM 網卡",
    ctaLabel: "查看 Klook eSIM 方案 →",
    why: "超級任天堂世界的園區指定時段入場透過 USJ 官方 App 辦理，當天在園內使用，Studio Pass 也是電子票——兩者都需要你在排隊現場有網路，而不只是飯店 Wi-Fi。",
  },
];
const sameDayPrep: KlookTripPrepItem[] = usjSameDayPrep.map((item, i) => withKlookLocale(item, LOCALE, sameDayCopy[i]));
// 2026-11-22 (R04): directly under the opening answer — USJ-area hotels (6.5%), the Osaka Amazing Pass (5%)
// and the Klook eSIM (20%), the three bookings that share the Express Pass date. Same products as
// usjSameDayPrep[0], [1] and [4]; GA4 placement usj-sameday-answer.
const answerSameDayPrep: KlookTripPrepItem[] = [0, 1, 4].map((i) => sameDayPrep[i]);

const stayCopy: Pick<KlookStayArea, "area" | "why">[] = [
  {
    area: "環球城（Universal City）",
    why: "依大阪觀光局官方數字，從環球城站步行到樂園大門約五分鐘——想在開園前就站在門口的那一天，這正是選擇住在環球城的理由。",
  },
  {
    area: "梅田／大阪站",
    why: "夢咲線直通列車的發車站：觀光局說從大阪站到樂園約 20 分鐘，而且其餘行程都留在 JR 主要路網上——京都線、神戶線、環狀線，以及新大阪的新幹線。",
  },
  {
    area: "天王寺",
    why: "比較便宜的 JR 側據點，也是 HARUKA 從關西機場出發後的第一個市區停靠站；搭環狀線到西九條轉夢咲線，不必穿越市中心。",
  },
  {
    area: "難波",
    why: "如果樂園只是大阪行程中的一天就選這裡：道頓堀與黑門市場走路就到，也是南海電鐵的終點站——南海表示 Rapi:t 到關西機場最快 34 分鐘，回國那天很方便。",
  },
];
const stayAreas: KlookStayArea[] = usjStayAreas.map((area, i) => withKlookLocale(area, LOCALE, stayCopy[i]));

const tripPrepCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "大阪周遊卡（1日／2日）",
    ctaLabel: "查看大阪周遊卡 →",
    why: "這一項請特別留意適用範圍：周遊卡不含日本環球影城，也不含前往環球城的 JR。它涵蓋的是大阪行程的其他每一天——大阪地鐵與市營巴士無限搭乘，加上 40 多處設施入場。",
  },
  {
    label: "京都＋奈良一日遊（清水寺、伏見稻荷與奈良公園）",
    ctaLabel: "查看京都奈良一日遊 →",
    why: "專程飛到大阪玩主題樂園的人，第二天最順理成章的安排：清水寺、伏見稻荷與奈良公園一次訂好，從大阪出發，路線完全不用自己規劃。",
  },
  {
    label: "Klook 日本 eSIM 網卡",
    ctaLabel: "查看 Klook eSIM 方案 →",
    why: "USJ 的指定日期 Studio Pass 是電子票，超級任天堂世界的園區指定時段入場也透過官方 App 辦理，當天在園內使用——排隊時才發現手機沒網路，是最糟的時機。",
  },
];
const tripPrep: KlookTripPrepItem[] = usjTripPrep.map((item, i) => withKlookLocale(item, LOCALE, tripPrepCopy[i]));

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "日本環球影城門票與快速通關" },
];

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

// P01 (21 Nov 2026, task-jtk-20261121-P01): as on the English page, the 5% / 6.5% blocks under the
// Express Pass block and before the FAQ. Same products and order as lib/klook-links.ts.
const highRateTopPrep: KlookTripPrepItem[] = [
  withKlookLocale(usjHighRateTopPrep[0], LOCALE, {
    label: "京都・奈良一日遊（清水寺・伏見稻荷・奈良公園）",
    ctaLabel: "查看京都・奈良一日遊 →",
    why: "飛到大阪玩 USJ 的旅客最常排的第二天：從大阪出發，一天走完清水寺、伏見稻荷和奈良公園。",
  }),
  withKlookLocale(usjHighRateTopPrep[1], LOCALE, {
    label: "關西機場與大阪飯店間的行李配送服務（LuggAgent）",
    ctaLabel: "查看行李配送 →",
    why: "行李另外在關西機場與大阪飯店之間配送，抵達日或離開日也能不拖行李箱觀光。預訂前請確認飯店是否在服務範圍內，以及寄件截止時間。",
  }),
  withKlookLocale(usjHighRateTopPrep[2], LOCALE, {
    label: "JR 西日本關西鐵路周遊券（1～4 天）",
    ctaLabel: "查看 JR 關西周遊券 →",
    why: "依 Klook 商品說明，可不限次搭乘大阪・京都・神戶・奈良一帶的 JR 西日本的普通與快速列車，以及從關西機場出發的 HARUKA，適合自己去京都或奈良的日子。",
  }),
];
const highRateFaqPrep: KlookTripPrepItem[] = [
  withKlookLocale(osakaSightsHighRatePrep[0], LOCALE, {
    label: "大阪城天守閣門票",
    ctaLabel: "查看大阪城門票 →",
    why: "天守閣 8 個樓層與豐臣石垣館的門票，在入口掃碼入場。已有大阪周遊卡就不需要另外購買。",
  }),
  withKlookLocale(osakaSightsHighRatePrep[1], LOCALE, {
    label: "梅田藍天大廈空中庭園展望台門票",
    ctaLabel: "查看梅田藍天大廈門票 →",
    why: "雙塔頂端 173 公尺的屋頂環形展望台，從大阪站步行可達，適合傍晚順路前往。大阪周遊卡同樣包含這裡。",
  }),
  withKlookLocale(osakaSightsHighRatePrep[2], LOCALE, {
    label: "大阪城・梅田藍天大廈・道頓堀水上觀光船一日遊",
    ctaLabel: "查看一日遊 →",
    why: "由導遊帶領，一天走完大阪城、梅田展望台與道頓堀水上觀光船，路線不必自己安排。",
  }),
];

export default function ZhUsjTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqSchemaItems) }} />
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

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            快速通關 4、快速通關 7（Express Pass 4／7）各包含哪些設施、快速通關價格為何會隨日期變動，以及哪些日期只買 Studio Pass 就夠了。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "快速通關 4 vs 7", "超級任天堂世界", "買或不買"].map((t) => (
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
            <strong>日本環球影城快速通關（Universal Express Pass，也常被稱為 USJ Fast Pass）</strong>主要有<strong>快速通關 4（Express Pass 4，包含 4 項設施）</strong>與
            <strong>快速通關 7（Express Pass 7，包含 7 項設施）</strong>兩種，另有含超級任天堂世界區域入場的版本。價錢沒有固定金額：USJ
            依入園日期定價，當天價格在結帳時顯示。快速通關不是入園票，同一天一定要另外買 Studio Pass。
          </p>
          <p className={styles.bodyText}>
            約在入園日前兩個月開賣，每天限量、常常提前售完——週末、日本國定假日或寒假期間的日期一開賣就買；人少的平日，通常只買 Studio Pass
            就夠了。以上於{CHECKED_USJ}與{CHECKED_TODAY}在 usj.co.jp 查閱。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["快速通關種類", "包含的設施", "價錢", "在哪裡買"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {typeRows.map((row, i) => (
                    <tr key={row.type} style={i === 0 ? { fontWeight: 600 } : undefined}>
                      <td className={styles.tdProvider}>{row.type}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後確認：2026-11-22——
            <a href={USJ_EXPRESS_URL} target="_blank" rel="noopener noreferrer">USJ 官方 Universal Express Pass 頁面</a>
            （種類與價格依日期而異、需另外的入園票）。販售管道與開賣時間出自 USJ 2025年4月21日的購票期間公告。USJ 不公布固定金額，所以表中不列日圓價格。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={EXPRESS_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看快速通關日期 →
            </KlookLink>
          </div>
        </section>

        {/* 2026-11-22 (R04): the bookings that share the Express Pass date, right under the answer:
            hotels 6.5%, Osaka Amazing Pass 5%, Klook eSIM 20%. GA4 placement usj-sameday-answer. */}
        <div data-placement="usj-sameday-answer">
          <KlookTripPrep
            label="同一天要預訂的"
            heading="訂好快速通關後，建議一併預訂的項目"
            intro="快速通關的日期一確定，USJ 周邊飯店、樂園行程前後幾天使用的大阪周遊卡，以及樂園 App 與電子票要用的網路，最好同一天一起訂好。熱門日期的環球城飯店，常和快速通關一樣早早客滿。"
            items={answerSameDayPrep}
            headingLevel={3}
          />
        </div>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>每個人都要買</p>
                <p className={styles.verdictStatValue}>Studio Pass（線上）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>這些日子加快速通關</p>
                <p className={styles.verdictStatValue}>週末／假日／週年</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>價格</p>
                <p className={styles.verdictStatValue}>依日期而異——沒有固定金額</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>開賣</p>
                <p className={styles.verdictStatValue}>約兩個月前，每天限量</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>先買 Studio Pass 入園，再依日期決定快速通關。只有一天又是人多的日子、想玩主力設施，選快速通關 7；人潮較少的日期或只想玩幾項熱門設施，選快速通關
              4；如果超級任天堂世界是這趟旅程的重點，選含超級任天堂世界區域入場的版本。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={STUDIO_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 門票（Studio Pass）→
              </KlookLink>
            </div>
          </div>
        </div>

        <BookingEsimCard />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速通關</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              快速通關是加購項目，不是入園票——同一天需要另外有 Studio Pass，而且每天的配額有上限。請依你的日期，參考下方內容決定。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={EXPRESS_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 快速通關 →
              </KlookLink>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} label="到 GetYourGuide 比較快速通關 →" />
            </div>
          </div>
        </div>

        {/* 2026-11-14, as on the English page: directly under the Express Pass button, the
            bookings that share its date. */}
        <KlookTripPrep
          label="同一天訂"
          heading="和快速通關一起訂的項目"
          intro="快速通關決定了你去樂園的日期。在它會售完的熱門日子，大門旁的官方合作飯店也會客滿——所以房間、從關西機場進來的交通，以及樂園 App 要用的網路，值得同一天一起訂好。"
          items={expressSameDayPrep}
        />

        {/* 21 Nov 2026 (P01): 5% / 6.5% for the days either side of the park, under the 0% Express Pass. GA4 placement usj-highrate-top. */}
        <div data-placement="usj-highrate-top">
          <KlookTripPrep
            label="樂園前後幾天"
            heading="USJ 前後幾天可以一起預訂的項目"
            intro="快速通關確定入園日期後，大阪其他幾天的行程也可以一併訂好：京都・奈良一日遊、機場與飯店之間的行李配送，以及 JR 關西鐵路周遊券。"
            items={highRateTopPrep}
            adPlacement="usj-highrate-top"
            headingLevel={3}
          />
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>通關券本身</span>
          <h2 className={styles.sectionTitle}>日本環球影城快速通關是什麼？</h2>
          <p className={styles.bodyText}>
            它是綁定日期的加購項目，讓你在固定幾項設施改走較短的快速通關通道，不用排一般隊伍。它<strong>不是</strong>入園票：USJ
            官方快速通關頁面指出，需要另外購買的樂園入場券，所以同一天必須有 Studio Pass 或年票。於{CHECKED_USJ}查閱。
          </p>
          <p className={styles.bodyText}>
            比較版本之前還有兩個細節。通關券上的設施有些是指定時間、有些不是——不指定時間的，USJ 說營業時間內隨時都能使用——使用時在設施的快速通關入口出示
            QR Code。另外，通關券只涵蓋上面列出的設施，所以你買哪個版本，比票面上的數字更重要。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "內容", "定價"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            USJ 定價規則於{CHECKED_USJ}在 usj.co.jp 查閱。表中沒有日圓金額，因為 USJ 沒有公布固定金額——請看下方的價格段落。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>入園票</span>
          <h2 className={styles.sectionTitle}>買快速通關還需要 Studio Pass 嗎？</h2>
          <p className={styles.bodyText}>
            需要。USJ 官方快速通關頁面指出，需要另外購買的樂園入場券，所以每位遊客都需要一張與快速通關同一天有效的 Studio Pass（或年票）——快速通關只是在你入園後縮短排隊。於{CHECKED_USJ}查閱。
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={STUDIO_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              USJ 門票（Studio Pass）→
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>fast pass</span>
          <h2 className={styles.sectionTitle}>快速通關（Express Pass）和 fast pass 有什麼不同？</h2>
          <p className={styles.bodyText}>
            在日本環球影城，兩者是同一個東西：USJ 付費縮短排隊的票叫做 <strong>Universal Express Pass（快速通關）</strong>，「USJ fast
            pass」只是很多旅客搜尋它時用的名稱——USJ 官方票券頁面沒有另外叫 Fast Pass 的商品。USJ 兩種免費縮短排隊的方式，則是另外的東西：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>單人乘坐通道（Single Rider）：</strong>另一條隊伍，與同行者分開、填補空位；並非隨時開放。</li>
            <li><strong>園區指定時段入場券（官方 App）：</strong>進入超級任天堂世界的時段，當天在園內取得——它不會縮短設施排隊。</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            出自 USJ 的快速通關、FAQ 與指定時間入場頁面，於{CHECKED_USJ}與 2026 年 11 月 6 日查閱。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>價格</span>
          <h2 className={styles.sectionTitle}>USJ fast pass 多少錢？</h2>
          <p className={styles.bodyText}>
            日本環球影城快速通關沒有固定的 2026 年價格：USJ 依入園日期與種類定價，當天金額在結帳時顯示。沒有單一答案，而這是 USJ 自己的立場，不是我們含糊其詞：它的快速通關頁面說，有效快速通關的種類與價格依日期而異；2026年6月30日關於
            Studio Pass 定價的公告也說，快速通關自 2018 年起採需求定價制度，目前沒有變更計畫。因此，下表整理可供規劃行程時參考的定價規則。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["項目", "USJ 的說法", `出處（${CHECKED_USJ}查閱）`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.usj}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後確認：2026-11-22——
            <a href={USJ_EXPRESS_URL} target="_blank" rel="noopener noreferrer">USJ 官方 Universal Express Pass 頁面</a>。
            為什麼不列價格區間：usj.co.jp 不同票券列表頁上的「起」價彼此不一致，而 WEB Ticket Store 的列表也說價格依入園日期而異。與其照抄一個可能不適用於你入園日期的價格，本指南列出
            USJ 的定價規則，並請你以當天結帳時的價格為準。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>選哪個版本</span>
          <h2 className={styles.sectionTitle}>環球快通4 和快通7 差在哪？</h2>
          <p className={styles.bodyText}>
            差在涵蓋的設施數：快通4 是 4 項、快通7 是 7 項，價錢同樣依入園日期而異。第一次來、又剛好是人多的日子，選快速通關 7；人潮較少的日期、時間短，或是第二次來只想玩幾項熱門設施，選快速通關
            4。數字是通關券涵蓋的設施數，實際設施組合依版本與日期而定——所以請看你那天的內容，而不是票面上的數字。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["快速通關種類", "涵蓋內容", "超級任天堂世界入場", "官方價格", "最適合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {variantRows.map((row, i) => (
                    <tr key={row.pass} style={i === 0 ? { fontWeight: 600 } : undefined}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後確認：2026-11-22——
            <a href={USJ_EXPRESS_URL} target="_blank" rel="noopener noreferrer">USJ 官方 Universal Express Pass 頁面</a>。
            版本名稱與區域入場規則於{CHECKED_USJ}在 usj.co.jp 查閱；{CHECKED_TODAY}再次查閱的 USJ 官方快速通關列表中，還有 Express Pass Premium
            以及數款主題版快速通關 4，各自在指定的入園期間販售。某一天有哪些版本，要看那一天，所以上表描述的是整體樣貌，而不是固定的商品目錄。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={EXPRESS_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看快速通關日期 →
            </KlookLink>
            <KlookLink href={klookFor(parkFrontHotelUsjKlook.url, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              The Park Front Hotel（USJ 官方飯店）→
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>不買快速通關</span>
          <h2 className={styles.sectionTitle}>沒有快速通關可以玩嗎？</h2>
          <p className={styles.bodyText}>
            可以。有 Studio Pass 就能入園，所有設施都能排一般隊伍搭乘；快速通關只是另外付費縮短排隊。人少的平日通常只買 Studio Pass 就夠了，週末、國定假日與寒假期間排隊較長，才建議加買。
          </p>
          <p className={styles.bodyText}>
            不買快速通關時，還有兩種免費的方式：單人乘坐通道（Single Rider，與同行者分開搭乘，並非隨時開放），以及入園後用官方 USJ App
            免費取得超級任天堂世界的園區指定時段入場券（當天先到先得）。於{CHECKED_USJ}在 usj.co.jp 查閱。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>買或不買</span>
          <h2 className={styles.sectionTitle}>USJ 快速通關值得買嗎？</h2>
          <p className={styles.bodyText}>
            週末、日本國定假日或寒假期間的日期，值得；人少的平日，通常不必。幾乎完全取決於日期，而不是你。人少的平日，通常只買 Studio Pass 就夠了；週末、日本國定假日或 25
            週年慶期間，快速通關就是「玩到主力設施」和「排主力設施」之間的差別。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["你的日期", "要買快速通關嗎？", "原因"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {needRows.map((row) => (
                    <tr key={row.date}>
                      <td className={styles.tdProvider}>{row.date}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 600 }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後確認：2026-10-27——
            <a href={USJ_EXPRESS_URL} target="_blank" rel="noopener noreferrer">USJ 官方 Universal Express Pass 頁面</a>
            （每日限量與售完）與 USJ 新聞稿（25 週年活動、Holiday Kids Free Pass，於{CHECKED_USJ}查閱）。USJ 沒有公布各日期的人潮預測，所以表格是依日期類型，而不是逐日列出。
          </p>

          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={EXPRESS_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看快速通關 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} label="到 GetYourGuide 比較快速通關 →" />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            日期確定之後，接著要訂的有三件事——樂園大門旁的房間、從關西機場進市區的交通，以及當天使用樂園官方 App 所需的網路：
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看環球城飯店 →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看 HARUKA 車票 →
            </KlookLink>
            <KlookLink href={MINI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看 Kansai Mini Pass →
            </KlookLink>
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看 Klook eSIM 方案 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            園區指定時段入場要在官方 App 裡辦理，網卡怎麼選請見{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan">日本eSIM推薦</Link>。
            同一趟也要去東京的迪士尼？那邊的門票同樣綁定日期，DPA（尊享卡）則要入園後在 App 另外買，請見{" "}
            <Link href="/zh-tw/guides/attractions/tokyo-disney-tickets">東京迪士尼門票價格與購買方式</Link>。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>售完</span>
          <h2 className={styles.sectionTitle}>大阪環球影城快速通關要提早多久買？</h2>
          <p className={styles.bodyText}>
            入園日前約兩個月開賣，週末、國定假日與寒假期間的日期一開賣就買。USJ 官方頁面指出每天數量有限、常常提前售完，因此沒有「提早這麼多天就一定買得到」的時間點，只有「越早越好」。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["問題", "USJ 公布的內容", `出處（${CHECKED_USJ}查閱）`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {windowRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            實際上，這讓快速通關成為訂完機票和住宿後第一個要訂的東西，而不是最後一個。也讓第二個購買管道從「有也不錯」變成「值得一看」：配額除了每天有上限，也是按販售管道分配，所以一個網站賣完的日期，不一定每個地方都賣完了。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>怎麼買</span>
          <h2 className={styles.sectionTitle}>日本環球影城快速通關怎麼買？</h2>
          <p className={styles.bodyText}>
            線上購買、指定日期，向 USJ 直接買或透過代售平台買。USJ 自己的購票期間公告點名官方 WEB Ticket Store 與 Lawson Ticket
            為販售管道，開賣時間約在入園日前兩個月；代售平台賣的是同樣綁定日期的商品，並提供看得懂的結帳介面。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["管道", "能買到什麼", "開賣時間", "改期／退款", "值得知道"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.opens}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.change}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後確認：2026-10-27——
            <a href="https://www.usj.co.jp/company/company_e/news/2025/0421/" target="_blank" rel="noopener noreferrer">USJ 購票期間公告</a>
            與
            <a href={USJ_EXPRESS_URL} target="_blank" rel="noopener noreferrer">USJ 快速通關頁面</a>。
            販售管道與購買期間出自 USJ 2025年4月21日的購票期間公告；經旅行社進入超級任天堂世界的方式出自 USJ 的指定時間入場頁面。兩者皆於{CHECKED_USJ}查閱。
            不論在哪裡買，通關券都綁定日期，改期與退款都受限制——決定日期前，請先看下方常見問題中關於取消的那一題。
          </p>
          <div className={styles.stepsList} style={{ marginTop: "1.5rem" }}>
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

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>當天使用</span>
          <h2 className={styles.sectionTitle}>USJ 快速通關當天怎麼用？</h2>
          <ul className={styles.bodyList}>
            <li><strong>指定時間的設施:</strong> 部分設施的時間印在票上，須依該時間前往。若未依指定時間抵達，恕不退款，也無法更改時段。</li>
            <li><strong>沒有指定搭乘時間的設施:</strong> 其餘設施在營業時間內隨時可使用快速通關。</li>
            <li><strong>搭乘時:</strong> 在快速通關入口向工作人員出示含 QR 碼的完整票券畫面。</li>
            <li><strong>每欄限一項:</strong> 同一欄列有多項設施時，只能選擇其中一項使用。</li>
            <li><strong>每人一張:</strong> 門票限本人使用，同行每人都需要自己的票。</li>
            <li><strong>單人乘坐通道（Single Rider）:</strong> 與快速通關無關的另一套制度：與同行者分開排隊，利用設施剩餘座位搭乘。部分日期與時段不能使用，請洽各設施的工作人員。</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            依 USJ 快速通關與 FAQ 頁面的搜尋索引內容，2026 年 11 月 6 日查閱。時間可能變動，請以你票上的時間為準。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>超級任天堂世界</span>
          <h2 className={styles.sectionTitle}>快速通關包含超級任天堂世界嗎？</h2>
          <p className={styles.bodyText}>
            只有版本上註明的才有。區域入場是另外的附加內容，不是每一張快速通關都有——USJ
            官方指定時間入場頁面描述了兩種進入該區的方式：事先透過特定的快速通關或特定旅行社取得，或在入園後透過官方 USJ App 取得。
          </p>
          <p className={styles.bodyText}>
            App 是免費的方式，也是規定變嚴的那一個。USJ 表示，自2026年1月5日起，必須用官方 App 取得園區指定時段入場券與 Standby Entry
            Ticket：先在 App 裡登錄你的入園票，再選擇區域、人數與時段，然後在區域入口出示 QR Code。於{CHECKED_USJ}查閱。這是當天先到先得，也正因如此，含區域入場的快速通關版本，是出發前就能取得超級任天堂世界入區時段的唯一方式。出發前就安裝
            App 並登錄門票——在隊伍裡用沒網路的手機處理，是這個問題最可以避免的版本。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>住宿</span>
          <h2 className={styles.sectionTitle}>去日本環球影城該住哪裡？</h2>
          <p className={styles.bodyText}>
            <strong>想在開園時就到門口，住環球城；否則住梅田或大阪站一帶。</strong>從 JR 夢咲線的環球城站步行到樂園大門約五分鐘，從大阪站到樂園約 20
            分鐘——兩個數字都出自大阪觀光局（Osaka Convention &amp; Tourism Bureau）官方資料，於{CHECKED}查閱。JR
            西日本官方的樂園目的地頁面把環球城站列為最近的車站，並形容樂園「就在旁邊」，同日查閱。
          </p>
          <p className={styles.bodyText}>
            那段步行就是全部的理由。買了快速通關的那天，你會想早點入園，而環球城是唯一能把交通變成五分鐘步行的區域。反過來的考量是其餘行程：梅田與大阪站讓你留在
            JR 主要路網上，而環球城的飯店集中在一小區，人多的日子最先客滿。我們的{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>
              大阪住宿區域指南（英文）
            </Link>{" "}
            依路線與機場交通比較了四個區域，{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>
              大阪兩天行程（英文）
            </Link>{" "}
            則說明樂園那一天怎麼搭配城市其他行程。
          </p>
        </section>

        <KlookStayAreas
          heading="USJ 住宿搜尋：依區域查看"
          intro="還剩哪些房間、價格多少，要看日期，所以每個區域都直接連到 Klook 該區的飯店搜尋。設定你 Studio Pass 的日期，拿環球城和其中一個 JR 側據點比較——人少的平日差別通常在價格，週年週末差別通常在有沒有房。"
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>從關西機場或大阪站怎麼去 USJ？</h2>
          <p className={styles.bodyText}>
            USJ 在大阪西側的此花區，車站是 JR 夢咲線（櫻島線）的環球城站——通常在西九條轉車。JR
            西日本把環球城站列為樂園最近的車站，大阪觀光局則說從該站步行到大門約五分鐘、從大阪站到樂園約 20 分鐘。兩者皆於{CHECKED}查閱。JR
            西日本的英文網站沒有公布夢咲線段的全程所需時間，所以這裡不列。
          </p>
          <p className={styles.bodyText}>
            從<strong>關西機場</strong>進市區有兩個合理的選擇，但都不會直達樂園。JR 西日本的 HARUKA 從機場不必轉車直達天王寺、大阪、新大阪與京都；它的優惠單程票——只賣給以「短期停留（Temporary Visitor）」身分入境的外國護照持有人——到2026年10月31日為止，到天王寺
            ¥1,300、到大阪或新大阪 ¥1,800，2026年11月1日起調整為 ¥1,600 與 ¥1,900，兒童半價。南海 Rapi:t 不必轉車到難波，最快 34
            分鐘，除了一般車資外，還需另外購買特急券，成人 ¥700、兒童 ¥350——在車上買多 ¥300，用無紙化購票（ticketless）可省 ¥150。JR 西日本與南海的數字皆於{CHECKED}查閱。不論哪一種，之後都搭環狀線到西九條，再轉夢咲線。
          </p>
          <p className={styles.bodyText}>
            有一張票值得知道：JR 西日本官方的關西地區鐵路周遊券頁面把 <strong>WEST QR Kansai Mini Pass</strong>{" "}
            描述為「京都、日本環球影城、大阪、難波、神戶、奈良 3 日無限搭乘」，票價成人 ¥3,000、兒童 ¥1,500，連續三天可搭普通列車，含新快速與快速。這張票不能搭任何特急列車，包括
            HARUKA——JR 西日本表明那需要另外買票。涵蓋 HARUKA 的是 <strong>WEST QR Kansai Area Pass</strong>（自由席無限次，加上兩次指定席），一日
            ¥2,700 到四日 ¥6,700。以上皆於{CHECKED}查閱。兩張都不能搭大阪地鐵，也沒有任何大阪地鐵票券能搭到環球城。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看 HARUKA 車票 →
            </KlookLink>
            <KlookLink href={RAPIT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看南海 Rapi:t →
            </KlookLink>
            <KlookLink href={MINI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看 Kansai Mini Pass →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            規劃路線可參考我們的{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={linkStyle}>
              大阪機場交通指南（英文）
            </Link>
            （含 HARUKA 與南海 Rapi:t 比較）、{" "}
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>
              大阪市區交通指南（英文）
            </Link>{" "}
            的一日券選擇，或{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={linkStyle}>
              關西地區鐵路周遊券指南（英文）
            </Link>{" "}
            看上述 JR 票券的完整介紹。
          </p>
        </section>

        <KlookTripPrep
          label="樂園日前後"
          heading="和 USJ 門票（Studio Pass）一起預訂的項目"
          intro="Studio Pass 讓你入園；樂園那一天還需要住宿、往返大阪市區的交通與手機網路。以下五項都能用同一個 Klook 帳號，和門票一起預訂。"
          items={sameDayPrep}
        />

        <KlookTripPrep
          label="一起預訂"
          heading="大阪之旅還要訂什麼？"
          intro="樂園只是其中一天。以下三項是同一趟旅行通常還會用到的項目，第一項放在這裡，主要是為了避免你因為錯誤的理由買它。"
          items={tripPrep}
        />

        {/* 21 Nov 2026 (P01): the 5% Osaka sights and a 6.5% day tour, just before the FAQ. GA4 placement usj-highrate-faq. */}
        <div data-placement="usj-highrate-faq">
          <KlookTripPrep
            label="不去樂園的日子"
            heading="不去樂園的那天，可以預訂的大阪景點"
            intro="如果不買大阪周遊卡（Osaka Amazing Pass），大阪城和梅田藍天大廈都需要另外購票。也有一天走完兩處的導覽行程。"
            items={highRateFaqPrep}
            adPlacement="usj-highrate-faq"
          />
        </div>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/where-to-stay-in-osaka", title: "大阪住宿區域推薦（2026）：依路線與機場交通比較（英文）" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "大阪海遊館門票（2026）：票價、開放時間與入場時段（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪必做清單（2026）：周遊卡划算與不划算的地方（英文）" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周遊卡（2026）：一天 ¥3,500 值得嗎？（英文）" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "大阪出發京都奈良一日遊（2026）：該訂哪個行程（英文）" },
            { href: "/guides/transport/osaka-airport-transfer", title: "大阪機場交通指南（2026）：關西機場與伊丹機場到市區（英文）" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "大阪兩天行程（2026）：每日安排與要預訂的項目（英文）" },
            { href: "/guides/transport/osaka-transportation", title: "大阪市區交通（2026）：地鐵、電車與 IC 卡（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
            { href: "/zh-tw/guides/attractions/tokyo-disney-tickets", title: "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選" },
            { href: "/guides/transport/osaka-metro-pass", title: "大阪地鐵周遊券與 Enjoy Eco Card 比較（2026）：旅客該買哪一張？（英文）" },
          ]}
        />

        <GygCompare
          slug={GYG_SLUG}
          heading="在 GetYourGuide 購買 USJ 門票與快速通關"
          intro="快速通關每天限量、綁定票面日期，所以你想要的那一款常常就是已經沒了。GetYourGuide 單獨販售快速通關——和其他地方一樣，它不含樂園入場——Studio Pass 則另外販售。如果上面你的日期已售完，改行程日期之前先來這裡試試。"
          listings={[gygUsjExpressPass, gygUsj]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>在 USJ 縮短排隊時間</h2>
            <p className={styles.ctaBannerDesc}>
              線上買 Studio Pass 入園，再加上你那天需要的快速通關版本——每天的配額有上限，含超級任天堂世界園區入場資格的版本最早售罄。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={EXPRESS_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 USJ 門票與快速通關 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
