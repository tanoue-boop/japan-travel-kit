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

/**
 * Mirrors the English page (pages/guides/attractions/tokyo-disney-tickets.tsx) as of
 * 2026-11-01: same sections, tables, CTAs and Klook/GetYourGuide blocks in the same
 * order. Every rule and figure is the English page's (Tokyo Disney Resort's own,
 * read 28 Oct 2026); no figure has been added.
 */

const ROUTE = "/zh-tw/guides/attractions/tokyo-disney-tickets";
const TITLE = "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選";
const DESC =
  "東京迪士尼門票 2026：每張票都指定日期、現場完全不賣票。海外信用卡刷不過時怎麼買，以及迪士尼樂園與迪士尼海洋該選哪一個。";

const LOCALE = "zh-tw" as const;
const CHECKED = dateLabel("2026-10-28", LOCALE);
const DISNEY_TICKET_URL = klookFor(zhTokyoDisney.url, LOCALE);
const GYG_SLUG = "zh-tw-tokyo-disney-tickets";

/** The published minimums, by the resort's own age bands. */
const priceRows = [
  { band: "成人（大人）", who: "18 歲以上", price: priceLabel("From ¥8,900", LOCALE) },
  { band: "青少年（中人）", who: "12–17 歲——國中、高中年齡", price: priceLabel("From ¥7,400", LOCALE) },
  { band: "兒童（小人）", who: "4–11 歲——學齡前與國小年齡", price: priceLabel("From ¥5,300", LOCALE) },
  { band: "幼兒", who: "3 歲以下", price: priceLabel("Free", LOCALE) },
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
    note: "時間最短、最便宜的入園方式，適合平日晚上去。",
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
    note: "票種相關的 FAQ 表示，不販售涵蓋連續兩天以上的護照。",
  },
];

/** Operating hours — set per date, not a standing figure. */
const hoursRows = [
  {
    what: "開園與閉園時間",
    detail: "依日期而定。度假區把時間公布在自家的營運行事曆上，而不是固定的營業時間；購票畫面也會顯示你所選日期的時間。",
  },
  {
    what: "時間提前多久公布",
    detail: "大約五個月。FAQ 表示營運時間約在五個月前於官網公告。",
  },
  {
    what: "這對買票代表什麼",
    detail: "你的日期大約在兩個月前開賣，那時當天的營運時間早已公布好幾個月——所以請在買票前看行事曆，而不是買完才看。在 20:00 閉園的日期用 After 5 護照，就只有三小時。",
  },
];

/** The buying window, the sell-outs and what you can and cannot undo. */
const buyingRows = [
  {
    q: "我的日期什麼時候開賣？",
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
    a: "可以，這就是現有的彈性。線上購買的票可以在有效期間內變更日期，指定入園日之前或之後都行，次數不限——每次變更都以新日期的價格結算。變更在官網或 App 上操作，不是在園區。",
  },
  {
    q: "我的日期賣完了——就沒機會了嗎？",
    a: "不一定。FAQ 表示賣完的票種可能不經預告重新開賣；而當其他遊客把票改到別的日期，他們空出來的名額會回到販售池，再次在線上販售。回頭再查一次，比想像中值得。",
  },
];

const parkRows = [
  {
    park: "東京迪士尼樂園",
    style: "經典的迪士尼城堡式園區：遊行、煙火、闔家同樂的設施",
    suits: "第一次來、帶年紀小的孩子、經典迪士尼迷",
    note: "去過其他迪士尼的話，動線會很熟悉",
  },
  {
    park: "東京迪士尼海洋",
    style: "航海與水主題；更具東京獨有性、風格偏成人；園內供酒",
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
    desc: "東京迪士尼海洋正在慶祝 25 週年，期間為 2026 年 4 月到 2027 年 3 月。週年期間的熱門日期人潮更多，而在浮動定價下，那些日期也正是貴的日期——所以你的日期在兩個月前一開賣就訂下來。",
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
    desc: "東京迪士尼的每張票都指定日期與園區，而能在一天內兩座都去的一日雙園護照目前沒有販售。兩座園區就是兩天、兩張票。",
  },
  {
    title: "在營運行事曆上確認那天的時間",
    desc: "營運時間依日期而定，約五個月前公布。它決定了 After 5 護照是一整個晚上還是只有一小段，也決定煙火是否落在你的入園時間內。",
  },
  {
    title: "兩個月前的日本時間 14:00，守在結帳畫面",
    desc: "那就是你的日期開賣的時刻。用你自己的時區記進行事曆——東京 14:00 是台北 13:00——因為每天的名額有上限，販售可能不經預告就停止。",
  },
  {
    title: "海外信用卡有問題就用 Klook",
    desc: "東京迪士尼度假區官網經常拒絕或封鎖海外發行的信用卡。Klook 是官方授權的售票通路，接受海外卡、介面看得懂，這也是許多海外旅客選它的原因。",
  },
  {
    title: "把電子票 QR Code 綁進官方 App",
    desc: "購票後你會拿到電子票 QR Code，可以登錄到東京迪士尼度假區官方 App——當天的園內功能也在那裡操作。出發前先設定好。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年東京迪士尼樂園門票多少錢？",
    a: `沒有單一價格：東京迪士尼度假區明確表示，園區門票依入園日期定價。官方公布的是一日護照的最低價——成人（18 歲以上）¥8,900 起、青少年（12–17 歲）¥7,400 起、兒童（4–11 歲）¥5,300 起、3 歲以下免費——實際金額在你選好日期後才會顯示。查閱於 ${CHECKED}。熱門日期，特別是迪士尼海洋 25 週年期間的日期，會明顯高於最低價。`,
  },
  {
    q: "東京迪士尼門票一定要提前買嗎？",
    a: `實際上是的。度假區自己的 FAQ 表示，東京迪士尼樂園與東京迪士尼海洋現場不販售園區門票，所以沒有門口可以買。當天購買只能在官網或官方 App、而且那天還有名額時才行，FAQ 對後果說得很直接：如果賣完了，就無法入園。查閱於 ${CHECKED}。`,
  },
  {
    q: "東京迪士尼門票什麼時候開賣？",
    a: `每天日本時間 14:00 起，開賣兩個月後同一天的票——3 月 1 日入園的票在 1 月 1 日 14:00 開賣——若那個月沒有對應的日期，則在下個月 1 日 14:00 開賣。每筆訂單最多十張，當天張數達到上限後，該日期的販售可能不經預告就停止。查閱於 ${CHECKED}。`,
  },
  {
    q: "東京迪士尼該買哪一種票？",
    a: "想在一座園區玩一整天就買一日護照；想要便宜的平日晚上就買 After 5 護照；假日傍晚 15:00 起就買 After 3 護照。兩座園區都想去，就每座各買一張——一日雙園護照目前沒有販售。多日護照也不販售，所以兩座園區的行程就是兩張指定日期的票。",
  },
  {
    q: "東京迪士尼的營業時間是幾點到幾點？",
    a: `時間依日期而定，沒有固定的營業時間；度假區約在五個月前於官網公布，購票畫面也會顯示你所選日期的時間。買票前請先在營運行事曆上確認你那天的時間——那決定了晚間護照省下的錢值不值得。查閱於 ${CHECKED}。`,
  },
  {
    q: "東京迪士尼門票可以改日期或退款嗎？",
    a: `不能退款，但可以改日期。因個人因素取消與退款都不受理——關於惡劣天氣、地震或其他原因無法在指定日期入園的 FAQ，也指向同一條規定。線上購買的票可以在有效期間內變更日期，指定日之前或之後都行，次數不限，每次以新日期的價格結算，透過官網或 App 操作，而不是在園區。查閱於 ${CHECKED}。`,
  },
  {
    q: "我的日期賣完了——還進得去嗎？",
    a: `有可能。度假區的 FAQ 表示，賣完的票種可能不經預告重新開賣；而當遊客把票改到其他日期，他們空出的名額會回到原本的販售池，再次在線上販售。所以回頭查官網與 App 是值得的——另一個售票通路也值得查，因為名額除了按日分配，也按售票通路分配。查閱於 ${CHECKED}。`,
  },
  {
    q: "可以用海外信用卡買東京迪士尼門票嗎？",
    a: "在東京迪士尼度假區官網上，常常不行——官網經常拒絕或封鎖海外發行的信用卡，這是海外旅客長年的困擾。常見的解法是 Klook：它是官方授權的售票通路，接受海外卡、介面看得懂，並發送可以登錄到東京迪士尼度假區官方 App 的電子票 QR Code。",
  },
  {
    q: "東京迪士尼樂園和迪士尼海洋該選哪一個？",
    a: "一日護照只含一座園區，所以要選。東京迪士尼樂園是經典的城堡式園區——遊行與闔家同樂的設施，適合第一次來的人與帶小小孩的家庭。東京迪士尼海洋是航海主題，更具東京獨有性，風格偏成人，園內供酒，並正在慶祝 2026 年 4 月到 2027 年 3 月的 25 週年。第一次帶小孩去，選樂園；想要與眾不同，選海洋。",
  },
  {
    q: "怎麼去東京迪士尼度假區？",
    a: "搭 JR 京葉線到舞濱站，從東京站出發約 15 到 20 分鐘，再轉迪士尼度假區線單軌電車，或走一小段路到樂園門口。開園前要通勤一次、夜間表演後再通勤一次，所以如果你的日期是週末或週年期間，就有理由住在舞濱或再遠一站。",
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
    why: "你的護照是綁進東京迪士尼度假區官方 App 的 QR Code，當天的園內功能也在 App 裡操作——這些在只能等飯店 Wi-Fi 的手機上都用不了。",
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
            東京迪士尼門票（2026）：<br />樂園與海洋怎麼買、怎麼選
          </h1>
          <p className={styles.heroSubtitle}>
            指定日期的票、浮動定價、現場不賣票、不能退款。這頁說明一張護照多少錢、你的日期什麼時候開賣，
            以及該買哪一種票。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價與規定", "兩個月前開賣", "海外卡可走 Klook"].map((t) => (
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
            2026 年的<strong>東京迪士尼樂園門票</strong>，就是指定日期、進一座園區的一日護照：成人
            <strong>¥8,900</strong> 起、12–17 歲的青少年 <strong>¥7,400</strong> 起、4–11 歲的兒童
            <strong>¥5,300</strong> 起，3 歲以下免費——這些都是公布的最低價，因為度假區每張票都依入園日期定價，
            選好日期才會顯示當天的金額。購買管道是東京迪士尼度假區官網或官方 App，或是 Klook 這類授權售票通路：
            <strong>兩座園區門口都不賣票</strong>，而你的日期會在<strong>兩個月前、每天日本時間 14:00</strong>
            開賣——所以真正的期限是那一刻，不是出發那一週；賣完的日期就是進不去。因個人因素取消不行，改日期可以。
            所有規定與數字都是度假區自己的，查閱於 {CHECKED}。
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
                <p className={styles.verdictStatValue}>成人 ¥8,900 起</p>
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
              <strong>結論：</strong>選好園區與日期，在營運行事曆上確認那天的時間，然後在兩個月前開賣時買下。
              沒有退款，但線上購買的票可以不限次數改日期。如果官網拒絕你的海外信用卡，Klook 是官方授權的售票通路，
              接受海外卡，並發送可以綁進官方 App 的 QR Code。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看東京迪士尼門票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
            </div>
          </div>
        </div>

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>2026 年東京迪士尼樂園門票多少錢？</h2>
          <p className={styles.bodyText}>
            成人 ¥8,900 起——而這個「起」字很關鍵。東京迪士尼度假區表示園區門票採浮動定價、費用依入園日期而不同，
            所以公布的數字是最低價，不是定價。當天的實際金額，要在官方購票頁選好日期後才會出現。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["年齡區分", "適用對象", "一日護照（一座園區）"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.band}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            公布的最低價與年齡區分取自官方園區門票頁，查閱於 {CHECKED}；浮動定價的規定是度假區自己 FAQ 的說法。
            這裡不列上限，因為度假區沒有公布固定的上限——週末或迪士尼海洋 25 週年期間的日期，會明顯比最低價貴。
            東京其他指定日期的門票（每項都附查閱日期）請見我們的{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景點門票價格總表（英文）
            </Link>
            。
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
            票種、入園時間與一日雙園護照目前的狀態，都是度假區自己的 FAQ 回答，查閱於 {CHECKED}。你那天有哪些護照
            在賣，要看日期——期間限定的票會隨度假區的活動推出或結束——所以上表是票種的大致樣貌，而不是固定的清單。
          </p>
        </section>

        {/* Q3 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>營業時間</span>
          <h2 className={styles.sectionTitle}>東京迪士尼的營業時間是幾點到幾點？</h2>
          <p className={styles.bodyText}>
            沒有固定的營業時間可以列：度假區依日期設定，並約在五個月前公布在自家的營運行事曆上。這比門票開賣還早，
            這正是有用的地方——等你的日期開賣時，你已經能看到園區那天開多久。
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
        </section>

        {/* Q4 — the booking window, sell-outs and refunds, then the CTA stack. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>開賣時間</span>
          <h2 className={styles.sectionTitle}>東京迪士尼門票一定要提前買嗎？</h2>
          <p className={styles.bodyText}>
            是的，而且度假區直接拿掉了其他選項：東京迪士尼樂園與東京迪士尼海洋現場完全不賣園區門票。你的日期會在
            <strong>兩個月前、每天日本時間 14:00</strong> 開賣——也就是台北時間 13:00——每天的名額有上限，賣完後
            販售可能不經預告就停止。遇到週末、日本國定假日或迪士尼海洋 25 週年期間的日期，那一刻就是全部。
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            因為名額除了按日分配、也按售票通路分配，在一個管道賣完的日期，值得到另一個管道查查看——而官方結帳拒絕
            海外信用卡時，售票平台也是解法：
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
            一張票、一座園區——而一日雙園護照沒有販售，所以這是真正的選擇，不是先後順序。經典城堡式園區與年紀小的孩子，
            選樂園；想去別處沒有的園區、又碰上它的 25 週年，選海洋。
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
            不管選哪一座，都請先規劃路線——度假區離東京市中心要搭一段電車。我們的{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              東京交通攻略（英文）
            </Link>{" "}
            整理了去那裡會用到的電車、地鐵與 IC 卡。
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

        {/* Klook: the stay and the days either side. */}
        <KlookTripPrep
          label="園區日的前後"
          heading="要住在東京迪士尼度假區附近嗎？"
          intro="如果你的日期是週末或週年期間，答案是要——度假區從東京站搭 JR 京葉線約 15 到 20 分鐘，開園前要通勤一次、夜間遊行後再通勤一次。住在舞濱或再遠一站，就把一天的頭尾都省回來了。"
          items={tripPrepItems}
        />

        {/* Foreign card / Klook explainer */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>海外信用卡</span>
          <h2 className={styles.sectionTitle}>可以用海外信用卡買東京迪士尼門票嗎？</h2>
          <p className={styles.bodyText}>
            在官網上常常不行。東京迪士尼度假區官網是主要的購票管道，但它經常拒絕或封鎖海外發行的信用卡——這是國際旅客
            反覆遇到的頭痛問題；而當你要買的東西只在兩個月前的某一刻開賣時，問題就更嚴重。
          </p>
          <p className={styles.bodyText}>
            <strong>Klook 是東京迪士尼度假區官方授權的售票通路。</strong>它接受海外卡、介面看得懂，並發送可以
            登錄到東京迪士尼度假區官方 App 的電子票 QR Code。這個組合——支援海外卡，加上可以綁進 App 的 QR——就是它成為
            海外旅客標準解法的原因。如果你同時在安排東京其他行程，我們的{" "}
            <Link href="/zh-tw/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              澀谷SKY 門票攻略
            </Link>{" "}
            講的是另一個指定日期、透過售票平台比較好訂的預約。
          </p>
        </section>

        <FaqList items={faqItems} />

        {/* Klook tours in the same city. */}
        <KlookTourPicks
          heading="同一座城市出發的一日遊"
          intro="去園區就是一整天，所以多數人是把迪士尼排進東京這一週，而不是把一週排進迪士尼。下面兩個行程可以填掉其中一個非園區日，而且和門票在同一個 Klook 帳號裡結帳。"
          tours={tourItems}
        />

        {/* A second authorized-reseller route. */}
        <GygCompare
          slug={GYG_SLUG}
          heading="GetYourGuide 上的同款護照"
          intro="東京迪士尼現場不賣票，賣完的日期就進不去，所以在一個售票平台賣完的日期是真正的死路。GetYourGuide 也有販售一日護照，迪士尼樂園與迪士尼海洋都有——決定日期前，值得多開一個分頁查查看。"
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
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "東京華納兄弟哈利波特影城門票（2026）：票價與預約方式（英文）" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/zh-tw/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 門票（2026）：票價、預約方式與無界比較" },
            { href: "/guides/transport/tokyo-transportation", title: "東京交通全攻略（2026）：電車、地鐵與 IC 卡（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
            { href: "/zh-tw/guides/attractions/usj-tickets-express-pass", title: "日本環球影城門票與快速通關（2026）：該買哪一種" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "東京看相撲（2026）：本場所門票與晨間練習（英文）" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先把東京迪士尼的日期鎖住</h2>
            <p className={styles.ctaBannerDesc}>
              現場不賣票，賣完的日期就進不去，而你的日期在兩個月前的日本時間 14:00 開賣。Klook 是官方授權的售票通路，
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
