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
import GygCompare, { GygCompareButton } from "../../../../components/GygCompare";
import { gygUsj, gygUsjExpressPass } from "../../../../lib/gyg-links";
import {
  jrHarukaUrl,
  jrKansaiMiniPass,
  klookEsim,
  nankaiRapitUrl,
  usjSameDayPrep,
  usjStayAreas,
  usjTripPrep,
  type KlookStayArea,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { zhUsjExpressPass, zhUsjStudioPass } from "../../../../lib/klook-links-zh-tw";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

// Mirrors the English guide (pages/guides/attractions/usj-tickets-express-pass.tsx) as of
// 2026-11-01: same sections, tables, FAQ and Klook / GetYourGuide blocks in the same order.
// No figure is added here; every fact and date is the English page's own.

const ROUTE = "/zh-tw/guides/attractions/usj-tickets-express-pass";
const TITLE = "日本環球影城門票與快速通關（2026）：該買哪一種";
const DESC =
  "USJ 現在一律線上購票，超級任天堂世界需要指定時間入園。Studio Pass 的分級定價、快速通關值不值得，以及 2026 年該買哪一種。";

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

const ticketRows = [
  { ticket: "一日 Studio Pass", what: "一天的入園資格；一般設施走普通排隊", price: "依日期定價——當天價格在結帳時顯示" },
  { ticket: "二日 Studio Pass", what: "連續兩天入園，平均每天通常比較便宜", price: "依日期定價——當天價格在結帳時顯示" },
  { ticket: "快速通關（加購）", what: "在固定幾項設施走另一條較短的隊伍。不是入園票——還需要 Studio Pass 或年票", price: "依日期定價，採用 USJ 自 2018 年起為快速通關導入的制度" },
];

const variantRows = [
  {
    pass: "快速通關 4",
    covers: "四個設施名額。USJ 把這一款描述為玩必玩設施用的通關券；是哪四項，依版本與日期固定。",
    snw: "只有註明包含的版本才有",
    bestFor: "時間短的一天、第二次來，或人少的日子只想玩主力設施",
  },
  {
    pass: "快速通關 7",
    covers: "七個設施名額——多數第一次來的人會在兩種數量中選的較大那一款，設施清單同樣依版本而定。",
    snw: "只有註明包含的版本才有",
    bestFor: "只有一天、第一次來、人多的日子",
  },
  {
    pass: "其他數量與主題版本",
    covers: "USJ 也賣以單一設施或季節陣容為主的快速通關，各有自己的清單，會隨樂園活動推出與下架。",
    snw: "依版本而異",
    bestFor: "有某一項非玩不可的設施，而不是追求廣泛涵蓋",
  },
  {
    pass: "含區域入場的版本",
    covers: "部分快速通關附帶超級任天堂世界的區域指定時間入場券，讓你在抵達前就握有入區時段。",
    snw: "有——多付的錢買的就是這個",
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
    what: "這套做法實施多久了",
    usj: "快速通關自 2018 年起即採類似的需求定價制度，目前沒有變更計畫。",
    source: "〈Pricing for Studio Passes to Change〉，2026年6月30日，usj.co.jp",
  },
  {
    what: "Studio Pass 價格（你同時需要的入園票）",
    usj: "2026年7月1日起販售、適用於2026年9月1日起入園的門票，每日價格依需求重新評估。兒童與長者票價也會變動；年票不在此列。",
    source: "〈Pricing for Studio Passes to Change〉，2026年6月30日，usj.co.jp",
  },
  {
    what: "USJ 自己的建議",
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
    a: "每天數量有限——USJ 自己的頁面說，常常會提前售完。",
    source: "Universal Express Pass 頁面，usj.co.jp",
  },
  {
    q: "可以改到別的日期嗎？",
    a: "不行。預先購買的快速通關只在票面日期有效；指定時間的設施若遲到，既不退款，也不能改到其他時段。",
    source: "Universal Express Pass 頁面，usj.co.jp",
  },
];

const needRows = [
  {
    date: "日本學校假期以外、人少的平日",
    verdict: "通常可以不買",
    why: "普通排隊最短，而透過官方 App 免費取得區域指定時間入場的方式，在你入園時最有可能還有名額。",
  },
  {
    date: "週六或週日",
    verdict: "買",
    why: "依日期定價反映的正是週末需求。這是快速通關的一般情況，便宜的版本會最先賣完。",
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
    why: "這是在抵達前就握有入區時段的唯一方式。免費的方式確實存在，但那是當天在園內先到先得。",
  },
];

const buyRows = [
  {
    where: "USJ WEB Ticket Store（官方）",
    what: "你那天在售的所有版本，以當天價格販售",
    note: "約兩個月前開賣。熱門開賣日請預期會有排隊系統。",
  },
  {
    where: "Lawson Ticket——網站與 Loppi 機台",
    what: "USJ 點名的另一個官方管道",
    note: "在 USJ 2025年4月21日的購票期間公告中，與 WEB Ticket Store 並列。",
  },
  {
    where: "Klook",
    what: "單獨販售的快速通關，結帳介面看得懂、可用海外信用卡付款，並提供電子票",
    note: "USJ 自己的指定時間入場頁面說，區域入場也可以透過特定旅行社事先取得。",
  },
  {
    where: "GetYourGuide",
    what: "單獨販售的快速通關，作為第二個購買管道",
    note: "第一個管道你的日期已售完時值得看看——配額除了每天有上限，也是按販售管道分配。",
  },
];

const steps = [
  {
    title: "先確定日期，再買 Studio Pass",
    desc: "這頁的其他內容都以日期為準。USJ 已不在門口販售當日票，所以 Studio Pass 要線上購買——而它正是快速通關不包含的入園票。",
  },
  {
    title: "判斷這個日期需不需要快速通關",
    desc: "參考上面的「買或不買」表。人少的平日常常不需要；週末、日本國定假日或週年日期就需要。",
  },
  {
    title: "確認版本是否包含超級任天堂世界",
    desc: "區域入場是另外的附加內容，不是理所當然。如果超級任天堂世界是你去的理由，就買註明含區域指定時間入場券的版本。",
  },
  {
    title: "出發前先安裝官方 USJ App",
    desc: `USJ 自己的指定時間入場頁面說，自2026年1月5日起，必須用官方 App 取得區域指定時間入場券與 Standby Entry Ticket，而且要先在 App 裡登錄你的入園票。於${CHECKED_USJ}查閱。`,
  },
  {
    title: "開園前就到",
    desc: "人多的日子，開門時間可能比公告的早。提早到，才能讓免費的區域指定時間入場方式變得實際可行——如果你買的版本不含區域入場的話。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "USJ 門票一定要提前買嗎？",
    a: "要。日本環球影城已停止在門口販售當日票，所以要在出發前線上購買。透過 Klook 這類代售平台訂，結帳介面看得懂、接受海外信用卡，並發送入園時可掃描的電子票。",
  },
  {
    q: "2026 年的 USJ 快速通關值得買嗎？",
    a: `人多的日子，值得。2026 年是 USJ 的 25 週年——樂園官方新聞稿在2026年9月14日與9月28日發布了週年相關消息，於${CHECKED_USJ}查閱——週末或國定假日，快速通關能把好幾小時的普通排隊換成另一條短隊伍，含區域入場的版本還附超級任天堂世界的入區資格。人少的離峰平日就沒那麼必要：普通排隊最短，用 App 免費進入該區也最有可能還有名額。`,
  },
  {
    q: "快速通關 4 和快速通關 7 差在哪？",
    a: "數字是通關券涵蓋的設施名額——四個或七個。USJ 把快速通關 4 描述為玩必玩設施用的那一款，快速通關 7 則是兩者中涵蓋較廣的。實際的設施清單依版本與日期固定，超級任天堂世界的區域入場也只有註明包含的版本才有，所以購買前請確認你那天的內容。",
  },
  {
    q: "沒有 Studio Pass 可以只用快速通關嗎？",
    a: `不行。USJ 自己的快速通關頁面寫明，入園需要 Studio Pass（或年票），快速通關之外還需要另外的樂園入場券。快速通關只是在你入園後縮短排隊。於${CHECKED_USJ}查閱。`,
  },
  {
    q: "日本環球影城快速通關最早可以多久前買？",
    a: `大約在入園日前兩個月。USJ 自己2025年4月21日的購票期間公告說，門票——Studio Pass、快速通關等——約在兩個月前於官方 WEB Ticket Store 與 Lawson Ticket 開賣；大阪世博期間（入園日至2025年10月13日為止）曾放寬為三個月，之後恢復為約兩個月。於${CHECKED_USJ}查閱。`,
  },
  {
    q: "USJ 快速通關可以改日期或退款嗎？",
    a: `請當作不能改。USJ 自己的快速通關頁面寫明，預先購買的通關券只在票面日期有效；指定時間的設施若遲到，不退款，也不能改到其他時段。於${CHECKED_USJ}查閱。`,
  },
  {
    q: "怎麼進超級任天堂世界？",
    a: `有兩種方式，都是 USJ 官方的：事先購買含區域指定時間入場券的快速通關版本，或在入園後透過官方 USJ App 取得。USJ 的指定時間入場頁面也說，自2026年1月5日起，必須用官方 App 取得區域指定時間入場券與 Standby Entry Ticket，而且要先在 App 裡登錄入園票。於${CHECKED_USJ}查閱。人少的日子也許可以直接走進去，但不該把行程押在這上面。`,
  },
  {
    q: "日本環球影城快速通關多少錢？",
    a: `USJ 沒有公布固定金額。它自己的快速通關頁面說，有效快速通關的種類與價格依日期而異；2026年6月30日關於 Studio Pass 定價的公告也說，快速通關自 2018 年起採需求定價制度，目前沒有變更計畫。當天價格會在結帳時顯示，所以這裡不列日圓金額——於${CHECKED_USJ}查閱。`,
  },
  {
    q: "去日本環球影城該住哪裡？",
    a: `想在開園時就到門口，住環球城；否則住梅田或大阪站一帶。從 JR 夢咲線的環球城站步行到樂園大門約五分鐘，從大阪站到樂園約 20 分鐘——兩個數字都是大阪觀光局（Osaka Convention & Tourism Bureau）自己的，於${CHECKED}查閱。JR 西日本自己的目的地頁面把環球城站列為樂園最近的車站，並形容樂園「就在旁邊」。取捨在於其餘行程：梅田與大阪站讓你留在 JR 主要路網上，而環球城的飯店只有一小區，人多的日子最先客滿。`,
  },
  {
    q: "從關西機場或大阪站怎麼去 USJ？",
    a: `車站是 JR 夢咲線（櫻島線）的環球城站，通常在西九條轉車，大阪觀光局說從大阪站到樂園約 20 分鐘。從關西機場沒有直達電車：JR 西日本的 HARUKA 不必轉車直達天王寺、大阪、新大阪與京都——以短期滯在身分入境的外國護照持有人可買的優惠單程票，到2026年10月31日為止，到天王寺 ¥1,300、到大阪或新大阪 ¥1,800，2026年11月1日起調整為 ¥1,600 與 ¥1,900——或搭南海 Rapi:t 到難波，最快 34 分鐘，除車資外另需成人 ¥700 的特急券。之後都搭環狀線到西九條，再轉夢咲線。所有數字於${CHECKED}查閱。`,
  },
  {
    q: "有哪張大阪或關西的票券包含 USJ 嗎？",
    a: `樂園本身不在大阪周遊卡（Osaka Amazing Pass）的範圍內，也沒有任何大阪地鐵票券涵蓋前往環球城的 JR 路段。鐵路方面，JR 西日本自己的關西地區鐵路周遊券頁面把 WEST QR Kansai Mini Pass 描述為「京都、日本環球影城、大阪、難波、神戶、奈良 3 日無限搭乘」——成人 ¥3,000、兒童 ¥1,500，連續三天可搭普通、快速與新快速列車，但不能搭包括 HARUKA 在內的任何特急。WEST QR Kansai Area Pass 則涵蓋 HARUKA，自由席無限次加上兩次指定席，一日 ¥2,700 到四日 ¥6,700。於${CHECKED}查閱。以上都不含樂園門票——那永遠是另外一張 Studio Pass。`,
  },
];

// Same products, same order as the English usjSameDayPrep — on Klook's zh-TW path.
const sameDayCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "日本環球影城周邊飯店（環球城）",
    ctaLabel: "在 Klook 查看環球城飯店 →",
    why: "與我們大阪住宿指南使用的同一個 Klook 飯店搜尋。從環球城站步行到樂園大門約五分鐘，適合打算在開園前就到門口的早晨。",
  },
  {
    label: "大阪周遊卡（1日／2日）",
    ctaLabel: "查看大阪周遊卡 →",
    why: "用在樂園前後的大阪行程，而不是樂園當天：包含大阪地鐵、市營巴士與 40 多處設施入場，但不含日本環球影城，也不含前往環球城的 JR。",
  },
  {
    label: "JR HARUKA 關西機場特急車票",
    ctaLabel: "查看 HARUKA 車票 →",
    why: "從關西機場直達天王寺、大阪或新大阪——USJ 行程的出發車站；Klook 商品頁註明，僅限持「短期滯在（Temporary Visitor）」入境章的非日本護照旅客購買。",
  },
  {
    label: "大阪美食導覽（道頓堀巷弄）",
    ctaLabel: "查看大阪美食導覽 →",
    why: "留給不去樂園那天的晚上：3 小時的併團步行導覽，離開道頓堀大街，有串炸、章魚燒、隱藏版居酒屋與在地甜點。",
  },
  {
    label: "Klook 日本 eSIM 網卡",
    ctaLabel: "查看 Klook eSIM 方案 →",
    why: "超級任天堂世界的區域指定時間入場透過 USJ 官方 App 辦理，當天在園內使用，Studio Pass 也是電子票——兩者都需要你在排隊現場有網路，而不只是飯店 Wi-Fi。",
  },
];
const sameDayPrep: KlookTripPrepItem[] = usjSameDayPrep.map((item, i) => withKlookLocale(item, LOCALE, sameDayCopy[i]));

const stayCopy: Pick<KlookStayArea, "area" | "why">[] = [
  {
    area: "環球城（Universal City）",
    why: "依大阪觀光局自己的數字，從環球城站步行到樂園大門約五分鐘——想在開園前就站在門口的那一天，這正是住這一區的全部理由。",
  },
  {
    area: "梅田／大阪站",
    why: "夢咲線直通班次的出發地：觀光局說從大阪站到樂園約 20 分鐘，而且其餘行程都留在 JR 主要路網上——京都線、神戶線、環狀線，以及新大阪的新幹線。",
  },
  {
    area: "天王寺",
    why: "比較便宜的 JR 側據點，也是 HARUKA 從關西機場出發後的第一個市區停靠站；搭環狀線到西九條轉夢咲線，不必穿越市中心。",
  },
  {
    area: "難波",
    why: "如果樂園只是大阪行程中的一天就選這裡：道頓堀與黑門市場走路就到，也是南海的終點站——南海表示 Rapi:t 到關西機場最快 34 分鐘，回國那天很方便。",
  },
];
const stayAreas: KlookStayArea[] = usjStayAreas.map((area, i) => withKlookLocale(area, LOCALE, stayCopy[i]));

const tripPrepCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "大阪周遊卡（1日／2日）",
    ctaLabel: "查看大阪周遊卡 →",
    why: "這一項請看仔細：周遊卡不含日本環球影城，也不含前往環球城的 JR。它涵蓋的是大阪行程的其他每一天——大阪地鐵與市營巴士無限搭乘，加上 40 多處設施入場。",
  },
  {
    label: "京都＋奈良一日遊（清水寺、伏見稻荷與奈良公園）",
    ctaLabel: "查看京都奈良一日遊 →",
    why: "專程飛到大阪玩主題樂園的人，第二天最順理成章的安排：清水寺、伏見稻荷與奈良公園一次訂好，從大阪出發，路線完全不用自己規劃。",
  },
  {
    label: "Klook 日本 eSIM 網卡",
    ctaLabel: "查看 Klook eSIM 方案 →",
    why: "USJ 的指定日期 Studio Pass 是電子票，超級任天堂世界的區域指定時間入場也透過官方 App 辦理，當天在園內使用——排隊時才發現手機沒網路，是最糟的時機。",
  },
];
const tripPrep: KlookTripPrepItem[] = usjTripPrep.map((item, i) => withKlookLocale(item, LOCALE, tripPrepCopy[i]));

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "日本環球影城門票與快速通關" },
];

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhUsjTicketsPage({ updated }: { updated: PageUpdated }) {
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

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            日本環球影城快速通關（2026）：<br />種類、價格與到底需不需要
          </h1>
          <p className={styles.heroSubtitle}>
            快速通關 4 與快速通關 7 各涵蓋什麼、為什麼價格隨日期變動，以及哪些日子只買 Studio Pass 就夠了。
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
            <strong>日本環球影城快速通關（Express Pass）</strong>是付費加購項目，讓你在固定幾項設施走另一條較短的隊伍——它不是入園票，同一天你仍需要
            Studio Pass（或年票）。它以編號版本販售——<strong>快速通關 4</strong> 與<strong>快速通關 7</strong>
            是多數人會選的兩款，另外還有主題陣容版本，以及附帶超級任天堂世界區域入場的版本——每一張都綁定一個日期、各有自己的設施清單，價格也依日期而定：USJ
            自己的頁面說，有效快速通關的種類與價格依日期而異，而且每天只賣有限數量、常常提前售完。所以「需不需要買」的簡短答案就是日期：週末、日本國定假日或
            25 週年的日子，正是快速通關的用武之地；人少的平日通常不需要。以上皆於{CHECKED_USJ}查閱。
          </p>
        </section>

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
              <strong>結論：</strong>先買 Studio Pass 入園，再依日期決定快速通關。只有一天又是人多的日子、想玩主力設施，選快速通關 7；日期較清閒或只想玩前幾名，選快速通關
              4；如果超級任天堂世界是這趟的重點，選含區域入場的版本。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={STUDIO_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 門票（Studio Pass）→
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Order on purpose (1 Nov 2026), as on the English page: Studio Pass, then the
            same-day bookings, then the Express Pass. */}
        <KlookTripPrep
          label="同一天要訂的"
          heading="和 USJ 門票（Studio Pass）一起預訂的項目"
          intro="Studio Pass 讓你入園；樂園那一天還需要住宿、往返大阪市區的交通與手機網路。以下五項都能用同一個 Klook 帳號，和門票一起預訂。"
          items={sameDayPrep}
        />

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

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>通關券本身</span>
          <h2 className={styles.sectionTitle}>日本環球影城快速通關是什麼？</h2>
          <p className={styles.bodyText}>
            它是綁定日期的加購項目，讓你在固定幾項設施改走較短的快速通關通道，而不是普通排隊。它<strong>不是</strong>入園票：USJ
            自己的快速通關頁面說，需要另外的樂園入場券，所以同一天必須有 Studio Pass 或年票。於{CHECKED_USJ}查閱。
          </p>
          <p className={styles.bodyText}>
            比較版本之前還有兩個細節。通關券上的設施有些是指定時間、有些不是——不指定時間的，USJ 說營業時間內隨時都能使用——使用時在設施的快速通關入口出示
            QR code。另外，通關券只涵蓋上面列出的設施，所以你買哪個版本，比票面上的數字更重要。
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

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>價格</span>
          <h2 className={styles.sectionTitle}>日本環球影城快速通關多少錢？</h2>
          <p className={styles.bodyText}>
            沒有單一答案，而這是 USJ 自己的立場，不是我們含糊其詞：它的快速通關頁面說，有效快速通關的種類與價格依日期而異；2026年6月30日關於
            Studio Pass 定價的公告也說，快速通關自 2018 年起採需求定價制度，目前沒有變更計畫。你能據以規劃的是規則，所以這張表列的就是規則。
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
            為什麼不列價格區間：能顯示價格的兩個地方都無法讀取。USJ 的會員購票頁在{CHECKED_USJ}對自動讀取回應 HTTP 503，官方 WEB Ticket Store
            則設有虛擬排隊室。與其照抄第三方網頁的數字，本指南列出 USJ 的定價規則，並請你以當天結帳時的價格為準。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>選哪個版本</span>
          <h2 className={styles.sectionTitle}>快速通關 4 還是 7——該買哪一個？</h2>
          <p className={styles.bodyText}>
            人多的日子又是第一次來，選快速通關 7；日期較清閒、時間短，或是第二次來只想玩前幾名，選快速通關
            4。數字是通關券涵蓋的設施名額，設施清單本身依版本與日期固定——所以請看你那天的內容，而不是票面上的數字。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["版本", "涵蓋內容", "超級任天堂世界", "最適合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {variantRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            版本名稱與區域入場規則於{CHECKED_USJ}在 usj.co.jp 查閱。某一天有哪些版本，要看那一天——陣容會隨樂園活動變動，所以上表描述的是整體樣貌，而不是固定的商品目錄。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>買或不買</span>
          <h2 className={styles.sectionTitle}>去日本環球影城需要快速通關嗎？</h2>
          <p className={styles.bodyText}>
            幾乎完全取決於日期，而不是你。人少的平日，通常只買 Studio Pass 就夠了；週末、日本國定假日或 25
            週年的日子，快速通關就是「玩到主力設施」和「排主力設施」之間的差別。
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
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>售完</span>
          <h2 className={styles.sectionTitle}>USJ 快速通關什麼時候會賣完？</h2>
          <p className={styles.bodyText}>
            當天配額賣光的時候——USJ 自己的頁面說每天數量有限、常常提前售完，所以沒有「這樣就安全」的提前量，只有「越早越好」。你能購買的期間大約是兩個月，這是關於它最有用的一件事。
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
                    {["管道", "能買到什麼", "值得知道"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
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
          <span className={styles.sectionLabel}>超級任天堂世界</span>
          <h2 className={styles.sectionTitle}>快速通關包含超級任天堂世界嗎？</h2>
          <p className={styles.bodyText}>
            只有版本上註明的才有。區域入場是另外的附加內容，不是每一張快速通關都有——USJ
            自己的指定時間入場頁面描述了兩種進入該區的方式：事先透過特定的快速通關或特定旅行社取得，或在入園後透過官方 USJ App 取得。
          </p>
          <p className={styles.bodyText}>
            App 是免費的方式，也是規定變嚴的那一個。USJ 表示，自2026年1月5日起，必須用官方 App 取得區域指定時間入場券與 Standby Entry
            Ticket：先在 App 裡登錄你的入園票，再選擇區域、人數與時段，然後在區域入口出示 QR code。於{CHECKED_USJ}查閱。這是當天先到先得，也正因如此，含區域入場的快速通關版本，是出發前就能握有超級任天堂世界入區時段的唯一方式。出發前就安裝
            App 並登錄門票——在隊伍裡用沒網路的手機處理，是這個問題最可以避免的版本。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>住宿</span>
          <h2 className={styles.sectionTitle}>去日本環球影城該住哪裡？</h2>
          <p className={styles.bodyText}>
            <strong>想在開園時就到門口，住環球城；否則住梅田或大阪站一帶。</strong>從 JR 夢咲線的環球城站步行到樂園大門約五分鐘，從大阪站到樂園約 20
            分鐘——兩個數字都是大阪觀光局（Osaka Convention &amp; Tourism Bureau）自己的，於{CHECKED}查閱。JR
            西日本自己的樂園目的地頁面把環球城站列為最近的車站，並形容樂園「就在旁邊」，同日查閱。
          </p>
          <p className={styles.bodyText}>
            那段步行就是全部的理由。買了快速通關的日子，你會想早點通過閘門，而環球城是唯一能把交通變成五分鐘步行的區域。反過來的考量是其餘行程：梅田與大阪站讓你留在
            JR 主要路網上，而環球城的飯店只有一小區，人多的日子最先客滿。我們的{" "}
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
            西日本的英文網站沒有公布夢咲線段的門到門時間，所以我們不列。
          </p>
          <p className={styles.bodyText}>
            從<strong>關西機場</strong>進市區有兩個合理的選擇，但都不會直達樂園。JR 西日本的 HARUKA 從機場不必轉車直達天王寺、大阪、新大阪與京都；它的優惠單程票——只賣給以短期滯在身分入境的外國護照持有人——到2026年10月31日為止，到天王寺
            ¥1,300、到大阪或新大阪 ¥1,800，2026年11月1日起調整為 ¥1,600 與 ¥1,900，兒童半價。南海 Rapi:t 不必轉車到難波，最快 34
            分鐘，除一般車資外另需特急券，成人 ¥700、兒童 ¥350——在車上買多 ¥300，用無票（ticketless）方式少 ¥150。JR 西日本與南海的數字皆於{CHECKED}查閱。不論哪一種，之後都搭環狀線到西九條，再轉夢咲線。
          </p>
          <p className={styles.bodyText}>
            有一張票值得知道：JR 西日本自己的關西地區鐵路周遊券頁面把 <strong>WEST QR Kansai Mini Pass</strong>{" "}
            描述為「京都、日本環球影城、大阪、難波、神戶、奈良 3 日無限搭乘」，票價成人 ¥3,000、兒童 ¥1,500，連續三天可搭普通列車，含新快速與快速。它不能搭任何特急，HARUKA
            也包括在內——JR 西日本表明那需要另外買票。涵蓋 HARUKA 的是 <strong>WEST QR Kansai Area Pass</strong>（自由席無限次，加上兩次指定席），一日
            ¥2,700 到四日 ¥6,700。以上皆於{CHECKED}查閱。兩張都不能搭大阪地鐵，也沒有任何大阪地鐵票券到得了環球城。
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
          label="一起預訂"
          heading="大阪之旅還要訂什麼？"
          intro="樂園只是其中一天。以下三項是同一趟旅行通常還需要的，第一項放在這裡，主要是為了避免你因為錯誤的理由買它。"
          items={tripPrep}
        />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/where-to-stay-in-osaka", title: "大阪住宿區域推薦（2026）：依路線與機場交通比較（英文）" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "大阪海遊館門票（2026）：票價、開放時間與入場時段（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪必做清單（2026）：周遊卡划算與不划算的地方（英文）" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周遊卡（2026）：一天 ¥2,500 值得嗎？（英文）" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "大阪出發京都奈良一日遊（2026）：該訂哪個行程（英文）" },
            { href: "/guides/transport/osaka-airport-transfer", title: "大阪機場交通指南（2026）：關西機場與伊丹機場到市區（英文）" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "大阪兩天行程（2026）：每日安排與要預訂的項目（英文）" },
            { href: "/guides/transport/osaka-transportation", title: "大阪市區交通（2026）：地鐵、電車與 IC 卡（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
            { href: "/zh-tw/guides/attractions/tokyo-disney-tickets", title: "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選" },
            { href: "/guides/transport/osaka-metro-pass", title: "大阪地鐵周遊券 vs Enjoy Eco Card（2026）：旅客該買哪一張？（英文）" },
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
            <h2 className={styles.ctaBannerTitle}>在 USJ 少排隊</h2>
            <p className={styles.ctaBannerDesc}>
              線上買 Studio Pass 入園，再加上你那天需要的快速通關版本——每天的配額有上限，含超級任天堂世界區域入場的版本最先賣完。
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
