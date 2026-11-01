// Traditional Chinese edition of /guides/attractions/teamlab-tokyo-tickets. Mirrors the English
// page block by block as of 2026-11-01 (same sections, tables, FAQ, Klook / GetYourGuide CTAs and
// tour picks in the same places); every figure comes from the English page or lib/attraction-prices.ts,
// none is added here.
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
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  fujiDayTour,
  tokyoBaySunsetBoatCruise,
  tokyoJoypolisPassport,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  tsukijiCultureFoodTour,
} from "../../../../lib/klook-links";
import { zhTeamlabPlanets } from "../../../../lib/klook-links-zh-tw";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { gygTeamlabPlanets } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "teamLab Planets 門票（2026）：票價、預約與無界比較";
const DESC =
  "teamLab Planets（豐洲）門票 2026：官方票價成人 ¥3,800 起、30 分鐘入場時段怎麼運作、赤腳涉水區該穿什麼，以及和無界差在哪。";

const LOCALE = "zh-tw" as const;
const GYG_SLUG = "zh-tw-teamlab-tokyo-tickets";

// teamLab Planets TOKYO（豐洲）門票 — the same Klook product as the English page, on zh-TW.
const PLANETS_URL = zhTeamlabPlanets.url;

const P = PRICES.teamlabPlanets;
// 票價與訂票規則讀自官方售票網站（CHECKED）；營業時間與休館日讀自 teamlab.art，保留自己的日期。
const CHECKED = dateLabel(P.checked, LOCALE);
const HOURS_CHECKED = dateLabel("2026-10-09", LOCALE);
const BORDERLESS_CHECKED = dateLabel(PRICES.teamlabBorderless.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const CHILD = priceLabel(P.child, LOCALE);

const priceRows = [
  {
    ticket: "成人（18 歲以上）",
    price: ADULT,
    varies: "會——依日期與入場時間",
    note: "¥3,800 是最低價，不是定價：官方售票網站對每個日期與時段分別定價",
  },
  { ticket: "國中、高中生", price: "¥2,800", varies: "不會——固定價", note: "請攜帶學生證" },
  { ticket: "兒童（4～12 歲）", price: CHILD, varies: "不會——固定價", note: "未滿 4 歲不需購票" },
  {
    ticket: "3 歲以下",
    price: priceLabel("Free", LOCALE),
    varies: "不會——免費",
    note: "記得帶替換衣物——涉水區大家都會濕",
  },
  {
    ticket: "身心障礙人士",
    price: "¥1,900 起",
    varies: "會——與成人票同一套價格行事曆",
    note: "請攜帶身障證明",
  },
  {
    ticket: "Premium Pass（4 歲以上）",
    price: "¥12,000",
    varies: "不會——固定價",
    note: "任何時間入場、不必排入口隊伍；館內的排隊不能跳過",
  },
];

const hoursRows = [
  { item: "營業時間", detail: "公告 08:00–22:00，依日期變動", source: `teamlab.art，${HOURS_CHECKED}` },
  { item: "最後入場", detail: "閉館前一小時", source: `官方售票網站，${CHECKED}` },
  {
    item: "休館日",
    detail: "不定期——2026 年 11 月 5 日（週四）與 12 月 3 日（週四）都在內",
    source: `teamlab.art，${HOURS_CHECKED}`,
  },
  {
    item: "入場時段",
    detail: "票面時間就是入場時間；從那一刻起的 30 分鐘是入場準備時間",
    source: `官方售票網站，${CHECKED}`,
  },
  {
    item: "入場等候",
    detail: "在入口可能要等 30 到 60 分鐘",
    source: `官方售票網站，${CHECKED}`,
  },
  {
    item: "趕不上時段",
    detail: "當天營業時間內仍可入場，但不得超過最後入場時間",
    source: `官方售票網站，${CHECKED}`,
  },
  {
    item: "建議預留時間",
    detail: "約 1.5～2 小時，含置物間與擦乾的時間",
    source: "本站的行程估算——teamLab 沒有公布",
  },
  {
    item: "置物櫃",
    detail: "免費，寬 23 × 深 34 × 高 37 公分；更大的物品沒有寄物處",
    source: `官方售票網站，${CHECKED}`,
  },
];

const ticketChoice = [
  {
    title: "Entrance Pass——成人 ¥3,800~",
    desc: `一般門票，也是幾乎所有人該買的那一種。它固定一個日期與一個入場時間，官方售票網站對每個組合分別定價，所以你選哪一天比你向誰買更重要。查核日 ${CHECKED}。`,
  },
  {
    title: "Premium Pass——¥12,000，4 歲以上",
    desc: `官方售票網站說它買到的只有一件事：任何時間入場、不必排入口隊伍——改到 Information Centre 報到。官方明確寫著它不能跳過展區內的排隊。只有當入口 30～60 分鐘的等候會打亂你一整天時才值得，不是一般的升級。查核日 ${CHECKED}。`,
  },
  {
    title: "可以改期，不能退款",
    desc: `一旦購買就不能退款。你能做的是改期：依官方說明頁，Entrance Pass 可在入場時間 2 小時前更改，Premium Pass 可改到當天 08:30，兩者都最多改三次；用優惠券購買的票完全不能改。查核日 ${CHECKED}。`,
  },
];

const compareRows = [
  { factor: "位置", planets: "豐洲（江東區）", borderless: "麻布台之丘（港區）" },
  { factor: "概念", planets: "沉浸式、赤腳、走進水裡", borderless: "沒有地圖的迷宮，50 多件作品" },
  { factor: "適合", planets: "親子、第一次來、想要身體感受", borderless: "藝術愛好者、慢慢逛、攝影" },
  { factor: "需要時間", planets: "含赤腳準備約 1.5～2 小時", borderless: "約 2 小時，想久留會更長" },
  { factor: "成人票（起）", planets: ADULT, borderless: priceLabel(PRICES.teamlabBorderless.adult, LOCALE) },
  { factor: "營業時間", planets: "公告 08:00–22:00，依日期變動", borderless: "公告 08:30–21:00，依日期變動" },
  { factor: "入場", planets: "30 分鐘入場時段", borderless: "指定時段，或不指定時間的 Flexible Pass" },
  { factor: "需要知道", planets: "預計營運到 2027 年底；赤腳與涉水區", borderless: "現場購票多 ¥200" },
];

const whoFor = [
  {
    title: "選 Planets 的話…",
    desc: "你帶著小孩、想要動手動腳的身體體驗，而且不介意腳濕——你會赤腳走過及成人膝蓋高的水。這是兩間裡比較好玩、感受比較直接的一間，也是帶孩子比較容易享受的一間。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: "選無界的話…",
    desc: "你想沉進藝術裡，而不是走過它。麻布台之丘的無界沒有固定路線——作品在房間之間移動，你在 50 多個空間裡自由遊走。它回報的是時間與耐心，對成人來說也是兩間裡更好拍的一間。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="1.5" />
        <circle cx="17.5" cy="10.5" r="1.5" />
        <circle cx="8.5" cy="7.5" r="1.5" />
        <circle cx="6.5" cy="12.5" r="1.5" />
        <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
      </svg>
    ),
  },
  {
    title: "兩間都去，如果…",
    desc: "你有兩個空的半天，而且是認真的 teamLab 迷。它們在城市的不同區域，是真正不同的體驗，所以兩間都去不會重複——只要把日期分開，並各自提前訂好指定時段。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "先選日期，再從行事曆讀出價格",
    desc: `成人票 ¥3,800~ 起，實際金額取決於你選的日期與入場時間——官方說明頁也確認不同日期的價格不同。先把你可以去的日期一個個點過，再決定哪一天。查核日 ${CHECKED}。`,
  },
  {
    title: "選入場時間，因為那就是你的預約",
    desc: "票面時間就是你的入場時間，從那一刻起的 30 分鐘是入場準備時間。美術館現場沒有售票櫃台可以補救，所以你選的時段就是你的參觀——當天也一樣，那時行事曆可能早就滿了。",
  },
  {
    title: "決定 Entrance Pass 還是 Premium Pass",
    desc: "四種票價加上 ¥12,000 的 Premium Pass，只有一種跟排隊有關。請先看上面的票種表：Premium Pass 買到的只是免排入口隊伍，別無其他，所以多數人該買的是 Entrance Pass，再選早一點的時段。",
  },
  {
    title: "向官方售票網站或它列出的通路購買",
    desc: `官方說明頁寫明現場的櫃台與售票機都不賣票，並列出有販售的通路：官方 Ticket Store、Lawson Ticket、Seven Ticket 與 Klook。Klook 的結帳頁面有中文、可用自己的幣別付款，這是多數旅客選它的實際原因。不論哪一種，門票都是手機上的 QR Code。查核日 ${CHECKED}。`,
  },
  {
    title: "穿適合涉水的衣服，在時段一開始就抵達",
    desc: "請穿短褲，或可以捲到膝蓋以上的長褲——部分作品是水空間，水深可達成人膝蓋高。如果你穿裙子或寬管褲，現場有 XS 到 6L 的免費短褲可借，因為部分地板是鏡面的。入口等候可能長達 30 到 60 分鐘，所以時段一開始就到。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年 teamLab Planets 門票多少錢？",
    a: `依 teamLab Planets 官方售票網站（查核日 ${CHECKED}）：成人票 ¥3,800 起，國中與高中生 ¥2,800，4～12 歲兒童 ¥1,500，3 歲以下免費。身心障礙人士 ¥1,900 起，另有 ¥12,000 的 Premium Pass（4 歲以上）。成人票價依日期與時段變動，付款前請確認你自己時段的金額。優惠票需要出示資格證明——請帶學生證、護照或身障證明。`,
  },
  {
    q: "teamLab Planets 需要提前訂票嗎？",
    a: "需要，而且比東京多數景點更需要。Planets 採 30 分鐘入場時段，熱門時間會在 2～3 週前賣完，週末與連假尤其明顯。官方說明頁寫得很清楚：不要指望在美術館現場買票——門票是線上提前販售，沒有臨櫃窗口。出發前就把日期與時段訂好。",
  },
  {
    q: "teamLab Planets 可以現場買票嗎？",
    a: `不行。官方售票網站的說明頁寫明，現場的售票櫃台與售票機都不販售門票，並列出有販售的通路：官方 Ticket Store、Lawson Ticket、Seven Ticket 與 Klook。如果你的日期已滿，沒有現場窗口可以補救——這是 Planets 和東京多數景點最大的不同。查核日 ${CHECKED}。`,
  },
  {
    q: "teamLab Planets 哪個時段最便宜？",
    a: `就是官方行事曆在你那一天標價最低的那一個——teamLab 沒有公布各時段的價目表，所以這是唯一誠實的答案。官方確認的是：成人 Entrance Pass 從 ¥3,800~ 起，而且不同日期價格不同——說明頁寫著預約可以更改「即使是價格不同的日期」。所以請打開官方行事曆，把你行程可以接受的日期與入場時間一一點過，付款前就比較，而不是付款後。查核日 ${CHECKED}。`,
  },
  {
    q: "teamLab Planets 有置物櫃嗎？",
    a: `有，而且免費。官方說明頁寫的尺寸是寬 23 公分、深 34 公分、高 37 公分——放得下後背包，放不下行李箱。現場沒有寄物處：更大的物品要由你自己用鋼索鎖鎖在館外的嬰兒車停放區。鞋子、襪子與褲襪也在置物櫃這裡脫掉，因為從這裡開始全程赤腳。查核日 ${CHECKED}。`,
  },
  {
    q: "去 teamLab Planets 該穿什麼？",
    a: "短褲，或可以捲到膝蓋以上的長褲。部分作品是水空間，水深可達成人膝蓋高，而且整間美術館都是赤腳體驗——入場時會在置物間脫掉鞋子、襪子與褲襪。部分地板是鏡面的，所以裙子與寬管褲不是好主意；現場有 XS 到 6L 的免費短褲可借。帶小孩的話請準備替換衣物，另外嬰兒車不能進場（有嬰兒車停放區，背巾可以）。",
  },
  {
    q: "teamLab Planets 要逛多久？",
    a: "整體預留大約 1.5 到 2 小時。作品本身以不趕的步調大約需要一到一個半小時，但你還要算上置物間、赤腳與事後擦乾的時間——而且在忙碌時段，光是入場準備就可能要 30～60 分鐘。結束後不要緊接著排其他行程。",
  },
  {
    q: "teamLab Planets 的營業時間？什麼時候休館？",
    a: `營業時間依日期而不同。我們在 ${HOURS_CHECKED} 查看 teamlab.art 時，Planets 公告的時間是 08:00–22:00；官方售票網站在 ${CHECKED} 仍寫著最後入場為閉館前一小時。2026 年年底的休館日包含 11 月 5 日（週四）與 12 月 3 日（週四）。因為行事曆每個月都在變，訂時段之前請用你自己的日期查官方行事曆。`,
  },
  {
    q: "錯過 teamLab Planets 的時段怎麼辦？",
    a: "不一定就進不去。官方說明頁寫的是：票面時間是參考值，如果你遲到，仍可在當天營業時間內入場——但要記得最後入場是閉館前一小時。不過你可能會比持有該時段票的人等更久，所以還是把你的時段當成計畫。",
  },
  {
    q: "teamLab Planets 在哪裡？怎麼去？",
    a: "位在東京東側水岸的豐洲。官方交通資訊寫的是：百合海鷗線「新豐洲站」步行 1 分鐘，「市場前站」與豐洲市場步行 5 分鐘，東京地下鐵有樂町線「豐洲站」步行 10 分鐘。從東京車站搭計程車約 15 分鐘，從羽田機場走高速公路約 15 分鐘。鐵路段用 Suica 或 PASMO 等 IC 卡就可以。",
  },
  {
    q: "teamLab Planets 要結束了嗎？",
    a: "豐洲的 teamLab Planets 預計營運到 2027 年底，teamLab 也公布了新增十件以上作品的擴建計畫。日期可能變動，如果你要為它專程安排行程，請先看官方網站。麻布台之丘的 teamLab 無界是另一間獨立、持續營運的美術館，門票分開。",
  },
  {
    q: "teamLab Planets 和無界差在哪？",
    a: "豐洲的 Planets 是沉浸式、赤腳的體驗，你會走進水裡與大型裝置之中——兩間裡比較偏身體感受、比較適合親子的那一間。麻布台之丘的無界是 50 多件作品組成的無地圖迷宮，沒有固定路線，作品在空間之間移動，你自由遊走。Planets 適合親子與第一次來的人；無界適合想慢慢探索的藝術愛好者。它們是東京不同區域的兩間美術館，門票各自分開。",
  },
];

const sameDayTours = [
  withKlookLocale(tokyoJoypolisPassport, LOCALE, {
    title: "東京 Joypolis 通行護照",
    desc: "台場 DECKS 室內樂園的入場加無限搭乘護照，手機 QR Code 入場，頁面上建議停留 2 到 4 小時",
  }),
  withKlookLocale(tokyoBaySunsetBoatCruise, LOCALE, {
    title: "東京灣白天與夕陽遊船",
    desc: "從芝浦出發、船上有導覽員的一小時小船遊船——不含晚餐的東京灣遊船",
  }),
  withKlookLocale(tsukijiCultureFoodTour, LOCALE, {
    title: "築地文化美食導覽",
    desc: "築地場外市場導覽散步，含試吃與坐下來吃的壽司，導覽語言為英語、中文或西班牙語",
  }),
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "東京地鐵通票（24／48／72 小時）",
    desc: "東京地下鐵與都營地下鐵全線無限搭乘，抵達後領取，不必排隊購買",
  }),
];

const dayTrips = [
  withKlookLocale(fujiDayTour, LOCALE, {
    title: "東京出發富士山一日遊",
    desc: "全日巴士行程，前往富士山五合目、河口湖與忍野八海，當天晚上回到東京",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "東京觀光巴士一日遊",
    desc: "附導覽的環狀行程，走訪皇居庭園、淺草與東京晴空塔，提供多語語音導覽",
  }),
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "teamLab Planets 門票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTeamLabPlanetsPage({ updated }: { updated: PageUpdated }) {
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
            teamLab Planets 門票（2026）：<br />票價、預約方式與無界比較
          </h1>
          <p className={styles.heroSubtitle}>
            豐洲的 teamLab Planets 門票多少錢、30 分鐘入場時段怎麼運作、涉水區該穿什麼——
            以及 Planets 和麻布台之丘的無界差在哪。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價", "Planets vs 無界"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <p className={styles.bodyText}>
          豐洲 <strong>teamLab Planets</strong> 的成人票在官方售票網站是 <strong>¥3,800~</strong>，
          金額會隨你選的日期與入場時間變動，所以 ¥3,800 是最低價而不是定價。入場採
          <strong>提前預約的 30 分鐘入場時段</strong>——官方售票網站寫明現場的櫃台與售票機都不賣票——
          而現場請<strong>預留約 1.5 到 2 小時</strong>，含赤腳的置物間與事後擦乾。入口距離百合海鷗線
          <strong>新豐洲站步行 1 分鐘</strong>。如果你搜尋的是 <strong>teamLab 東京門票</strong>
          而不特別指 Planets，東京有兩間 teamLab 美術館，本篇也會告訴你真正該去哪一間。票價與訂票規則讀自
          teamLab Planets 官方售票網站，查核日 {CHECKED}；營業時間讀自 teamlab.art，查核日 {HOURS_CHECKED}。
        </p>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人票</p>
                <p className={styles.verdictStatValue}>¥3,800 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>入場方式</p>
                <p className={styles.verdictStatValue}>30 分鐘時段，要先訂</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>建議停留</p>
                <p className={styles.verdictStatValue}>約 1.5～2 小時</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>穿著</p>
                <p className={styles.verdictStatValue}>短褲——赤腳、水深及膝</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>teamLab Planets 成人票 ¥3,800 起，高中生 ¥2,800，4～12 歲 ¥1,500。
              你的票對應一個 30 分鐘入場區間，而且現場沒有臨櫃售票，所以週末請提前 2～3 週訂。
              你會赤腳入場，部分作品是水空間、水深可達成人膝蓋高——請穿短褲或可捲起的長褲
              （現場有 XS–6L 免費短褲可借）。預留 1.5～2 小時，從新豐洲站步行 1 分鐘就到。
              想找麻布台之丘那一間？請看我們的{" "}
              <Link href="/zh-tw/guides/attractions/teamlab-borderless-tickets">teamLab 無界門票攻略</Link>。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 teamLab Planets 門票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              票價與訂票規則讀自 teamLab Planets 官方售票網站，查核日 {CHECKED}；營業時間與休館日讀自
              teamlab.art，查核日 {HOURS_CHECKED}。Planets 票價依日期與時段變動、行事曆也會改，
              請在結帳時確認你自己日期的兩項資訊。
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>2026 年 teamLab Planets 門票多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人 <strong>¥3,800~</strong>，國中與高中生 ¥2,800，4～12 歲兒童 ¥1,500，未滿 4 歲完全免費。
            會變動的只有成人與身障票：官方售票網站對每個日期、每個入場時間分別定價，所以官方的金額後面帶著
            波浪號，也因此你這趟旅程最便宜的門票是行事曆的問題，而不是向誰買的問題。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "票價（起）", "會隨日期變動嗎？", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.varies}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            讀自 teamLab Planets 官方售票網站的英文版與日文版，查核日 {CHECKED}。優惠票需要出示資格證明，
            請帶學生證、護照或身障證明。門票以手機 QR Code 形式發送。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>成人票價會變動多少，官方沒有公布。</strong>teamLab 只印出起價與一份行事曆，而不是價目表；
            說明頁也只確認價格有差異——預約可以更改「即使是價格不同的日期」。所以請把 ¥3,800 當成最低價，
            打開官方行事曆查看你行程可以接受的日期，付款前比較每一天的各個入場時間。在這裡能動的是把
            Planets 往前或往後挪一天；找更便宜的賣家則沒有用，因為價格是日期決定的。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>訂票前</span>
          <h2 className={styles.sectionTitle}>營業時間、入場時段與需要多久</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Planets 營業時間很長，但你的票不是：票面上的時間是入場時間，入口排隊還可能再加 30 到 60 分鐘。
            整體預留約 1.5 到 2 小時，後面不要排太緊的行程。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "官方資料怎麼寫", "來源與日期"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Planets 對你的要求也比一般美術館門票多——要赤腳進場，而且路線的一部分是水：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>赤腳：</strong>鞋子、襪子與褲襪在置物櫃脫掉，全程赤腳體驗。</li>
            <li><strong>水：</strong>部分作品是水空間，水深可達成人膝蓋高。請穿短褲或可以捲起的長褲。</li>
            <li><strong>鏡面地板：</strong>裙子與寬管褲會有問題——官方 FAQ 寫著內衣褲可能會被看見。現場有 XS 到 6L 的免費短褲可借。</li>
            <li><strong>帶小孩：</strong>請準備替換衣物。嬰兒車不能進場——館外有嬰兒車停放區，背巾可以。</li>
            <li><strong>行李：</strong>免費置物櫃的尺寸是 23 × 34 × 37 公分。沒有寄物處，所以行李箱要由你自己用鋼索鎖鎖在嬰兒車停放區。</li>
            <li><strong>水質衛生：</strong>官方 FAQ 寫著水會持續過濾、每小時測量氯濃度，出口備有消毒過的毛巾。</li>
            <li><strong>輪椅：</strong>可以入場，工作人員會說明路線；有些作品無法抵達，涉水區需要在同行者陪同下換乘專用輪椅。</li>
          </ul>
          <p className={styles.bodyText}>
            營業時間與休館日每個月都在變，所以請先用你自己的旅行日期打開官方行事曆，再決定時段。
            以上除了建議預留時間之外，都是官方的寫法，查核日期如表中所列。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>你買到的是什麼</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 究竟是什麼</h2>
          <p className={styles.bodyText}>
            teamLab 是以東京為據點的藝術團體，以「走進去」而不是「看著」的大型數位裝置聞名。豐洲的 Planets
            是身體感受最強的那一間：你赤腳、涉水，走過會對你的存在產生反應的作品——鏡面無限空間、漂浮光球的
            大廳、活的花園。它是東京兩間 teamLab 當中帶孩子比較容易享受的一間，也是如果你從未見過這種規模的
            數位藝術、衝擊最大的一間。
          </p>
          <p className={styles.bodyText}>
            它也很擁擠：teamLab 公布 2025 年參觀人次超過 250 萬。美術館預計營運到 2027 年底，並公布了新增
            十件以上作品的擴建計畫——所以如果你已經去過，再去也不會是同一趟。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>值不值得</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 值得去嗎？</h2>
          <p className={styles.bodyText}>
            對多數第一次來東京的人來說，值得——但它是一個 1.5 到 2 小時、每人 ¥3,800~ 的景點，
            價格像半天行程，花的時間卻像一頓悠閒的午餐。與其直接給結論，不如把算式攤開：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>每小時的花費很高。</strong>1.5～2 小時 ¥3,800~，是東京鐵塔主展望台 ¥1,500 的兩倍以上，也明顯高於澀谷SKY 的 ¥2,500，而這兩處你都可以待久一點。你付的是別處看不到的東西，不是時間長度——數字可以對照我們的<Link href="/guides/attractions/japan-attraction-ticket-prices">日本景點門票價格總表（英文）</Link>。</li>
            <li><strong>入場的成本是時間，不只是錢。</strong>官方 FAQ 提醒忙碌時段入場可能要等 30 到 60 分鐘，還要加上赤腳更換的時間。老實說要空出兩小時。</li>
            <li><strong>它是東京身體負擔最大的美術館。</strong>全程赤腳、水深及成人膝蓋、鏡面地板。如果這聽起來像折磨而不是體驗，麻布台的無界是同一個團體、但沒有水。</li>
            <li><strong>不怕下雨，也適合小孩。</strong>室內、未滿 4 歲免費，而且常常是孩子在整趟旅程中比寺廟更記得的地方。</li>
            <li><strong>當天無法補救。</strong>現場不賣票，行事曆滿了就是滿了。搞錯的代價是那一整個下午的計畫，這才是應該最先訂它的真正理由。</li>
          </ul>
          <p className={styles.bodyText}>
            如果你在東京的日子已經很緊、30 分鐘的固定時段會毀掉你想隨興安排的一天，或同行的人沒有人想捲起
            褲管，那就跳過。這三個是這張門票讓人失望的原因，而且沒有一個跟藝術本身有關。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>票況</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 門票會賣完嗎？</h2>
          <p className={styles.bodyText}>
            個別的入場時間會賣完，而且你的日期一滿就沒有櫃台可以補救：官方售票網站明白寫著，現場的售票櫃台與
            售票機都不賣票。所以 Planets 應該是東京一週行程裡第一個訂的，而不是最後一個。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>我們建議的預訂時間：</strong>週末或連假時段提前兩到三週，平日提前幾天，櫻花季或新年的日期則越早越好。這是我們依行事曆的變化給的行程建議，不是官方數字——teamLab 沒有公布售罄資料。</li>
            <li><strong>沒有現場票：</strong>官方資訊，查核日 {CHECKED}。只在線上販售，通路為官方 Ticket Store、Lawson Ticket、Seven Ticket 或 Klook。</li>
            <li><strong>一次最多十張：</strong>官方售票網站單次購買上限 10 張，庫存不足時會更少。20 人以上的團體要走另外的團體申請流程。</li>
            <li><strong>訂錯時段？</strong>改期就好，不必重訂。Entrance Pass 可在入場時間兩小時前更改，最多三次；Premium Pass 可改到當天 08:30。一律不能退款，用優惠券購買的票完全不能改。</li>
            <li><strong>遲到還有救，錯過當天就沒有：</strong>官方 FAQ 寫著當天營業時間內晚一點仍可入場，前提是在閉館前一小時的最後入場之前。</li>
          </ul>
          <p className={styles.bodyText}>
            實際上的結論：先選日期，再選入場時間，最後才選賣家。三者之中有兩個決定你到底進不進得去。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>買哪一種</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 該買哪一種票？</h2>
          <p className={styles.bodyText}>
            除了一種情況，都是 Entrance Pass。唯一的另一個選項是 ¥12,000 的 Premium Pass，而官方售票網站
            說它唯一的好處是不必排入口隊伍——所以如果 30 到 60 分鐘的等候會打亂你一整天，它就值得；
            如果不會，那就是白花 ¥8,000。
          </p>
          <div className={styles.stepsList}>
            {ticketChoice.map((item, i) => (
              <div key={item.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>至於選哪個入場時間：</strong>一天的第一批時段，以及最後入場前的最後一小時，是最不容易
            遇到入口長隊的兩個時段；平日則在排隊上、通常也在價格上勝過週末。我們無法告訴你你那一天哪個時段
            最便宜，因為 teamLab 沒有公布各時段的價目表——那要看行事曆，而在下面任一個賣家點一下就能看到。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看 teamLab Planets 日期與時段 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook 是官方售票網站列出的通路之一；GetYourGuide 則是當時段沒了時的第二個查詢管道。兩者都依日期
            定價，所以請打開行事曆，而不要相信任何標題上的金額——包括本頁的。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 門票怎麼訂？</h2>
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
            準備好鎖定時段了嗎？{" "}
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看 Planets 的空位與價格 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>直接向官方買</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 官方售票網站在哪裡？</h2>
          <p className={styles.bodyText}>
            美術館自己的頁面是 <strong>teamlab.art/e/planets</strong>，門票則是透過
            <strong>teamLab Planets TOKYO Official Ticket Store</strong>（
            <strong>teamlabplanets.dmm.com</strong>）販售——官方結帳是那個網站，而不是搜尋結果。本頁所有訂票
            規則也都出自它的說明頁，查核日 {CHECKED}。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>還有誰是官方通路：</strong>官方售票網站列出了 Lawson Ticket、Seven Ticket 與 Klook。不在這份名單上的都是轉售商，沒有理由去用。</li>
            <li><strong>付款方式：</strong>透過 DMM 使用信用卡、PayPay 與銀聯。如果你的卡被拒——這通常就是旅客改去別處買的原因——有國際結帳的賣家就能解決。</li>
            <li><strong>門票怎麼寄送：</strong>入場兩天前會收到附有 QR 門票連結的電子郵件，QR Code 本身從入場當天 00:00 起顯示。</li>
            <li><strong>直接買不會比較便宜：</strong>價格由日期與入場時間決定，不論走哪個官方通路，都是同一份行事曆定價。</li>
          </ul>
          <p className={styles.bodyText}>
            換句話說：如果你的卡能用、看日文或英文網站沒問題，就直接向官方買；如果你想用自己的語言與幣別結帳，
            就向官方列出的賣家買。兩者都是官方管道，都不是旁門左道。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>帶小孩</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 適合帶小孩嗎？</h2>
          <p className={styles.bodyText}>
            它是東京最適合親子的美術館，也是規定最多的一間。未滿 4 歲免費，4～12 歲 ¥1,500，水深有些地方及
            成人膝蓋——對孩子來說就更高——而且嬰兒車完全不能進場。以下都是官方的寫法，查核日 {CHECKED}。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>年齡與票價：</strong>3 歲以下免票；4～12 歲 ¥1,500；國中與高中生 ¥2,800。Premium Pass 從 4 歲起販售。</li>
            <li><strong>陪同：</strong>每三名兒童需有一名成人陪同。一位家長帶四個小小孩，官方售票網站不會受理。</li>
            <li><strong>嬰兒車：</strong>不能進入館內。館外有嬰兒車停放區，要自己用鋼索鎖上鎖；館內可以使用背巾。</li>
            <li><strong>尿布：</strong>尿布台在女廁內。</li>
            <li><strong>水：</strong>深及成人膝蓋，而且全程赤腳。請帶替換衣物，預期每個人都會濕，不只是小孩。</li>
            <li><strong>衣著：</strong>每個人都穿短褲或可捲起的長褲；有些地方的地板是鏡面的。免費短褲從 XS 到 6L，所以孩子穿洋裝來也不是問題。</li>
            <li><strong>寄放：</strong>免費置物櫃是 23 × 34 × 37 公分——放得下媽媽包，放不下行李箱，過大的物品要放到嬰兒車停放區。</li>
          </ul>
          <p className={styles.bodyText}>
            實際做法：訂早一點的時段，先讓孩子吃飽，下午的行程保持寬鬆。考驗小小孩的是入口 30 到 60 分鐘的
            等候，不是作品本身。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>並排比較</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs 無界：該訂哪一間？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>如果你帶著孩子、或只打算去一次 teamLab，就訂 Planets；如果你想「看」藝術而不是走過它，
            就訂無界。</strong>東京有兩間 teamLab 美術館，旅客經常訂錯。它們是城市不同區域的兩個獨立場館、
            門票分開：豐洲的 <strong>Planets</strong> 是赤腳走進水裡的那一間；麻布台之丘的
            <strong>無界</strong>是 50 多件作品在房間之間移動的無地圖迷宮。無界有自己的票價、時間與訂票
            眉角，我們寫在{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-borderless-tickets">teamLab 無界門票攻略</Link>。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Planets", "teamLab 無界"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Planets 票價讀自其官方售票網站，查核日 {CHECKED}；無界票價與兩間的營業時間讀自 teamlab.art，
            查核日 {BORDERLESS_CHECKED}。兩間的成人票都依日期與時段定價、行事曆也都會變動，請確認你自己的
            日期。「需要時間」是我們的行程建議，不是官方數字。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一間適合你</span>
          <h2 className={styles.sectionTitle}>該選哪一間 teamLab？</h2>
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

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 的位置</h2>
          <p className={styles.bodyText}>
            Planets 位在東京東側水岸的豐洲，緊鄰豐洲市場。官方交通資訊寫的是：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>新豐洲站</strong>（百合海鷗線）——步行 1 分鐘，最方便的走法。</li>
            <li><strong>市場前站</strong>／豐洲市場——步行 5 分鐘。</li>
            <li><strong>豐洲站</strong>（東京地下鐵有樂町線）——步行 10 分鐘，LaLaport 豐洲也是 10 分鐘。</li>
            <li>從東京車站搭計程車約 15 分鐘、從銀座約 10 分鐘，從羽田機場走高速公路約 15 分鐘。</li>
            <li><strong>美術館沒有停車場</strong>——官方售票網站請旅客搭電車或巴士前往。GINZA SIX 與 Planets 之間有付費接駁巴士。查核日 {CHECKED}。</li>
          </ul>
          <p className={styles.bodyText}>
            一張{" "}
            <Link href="/guides/transport/ic-cards-japan">Suica 或 PASMO 等 IC 卡（英文）</Link>{" "}
            就能搭有樂町線與百合海鷗線兩段——如果你對豐洲不熟，{" "}
            <Link href="/guides/transport/tokyo-transportation">我們的東京交通攻略（英文）</Link>{" "}
            有各路線的說明。
          </p>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="同一天在豐洲與台場就能訂的行程"
          intro="Planets 的時段只佔東邊這一天的一個半小時，而載你到門口的百合海鷗線會繼續開往台場。地鐵通票涵蓋到豐洲的地下鐵路段，但不含百合海鷗線；另外三個都在美術館附近、搭一小段車就到。Klook 會擋自動讀取價格，所以請打開頁面查看你那一天的金額與時間。"
          tours={sameDayTours}
        />

        <KlookTourPicks
          heading="從同一座城市出發的一日遊"
          intro="Planets 在現場大約一個半小時，所以通常會和別的行程共用一天。如果你東京那半段旅程還有一整天沒排，這兩個行程從市區出發、當天晚上回來。"
          tours={dayTrips}
        />

        <Related
          items={[
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking（英文）" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto Tickets: Prices, Hours & Booking（英文）" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab Botanical Garden Osaka Tickets: Prices & Hours（英文）" },
            { href: "/zh-tw/guides/attractions/tokyo-skytree-tickets", title: "東京晴空塔門票（2026）：票價、350 與 450 樓怎麼選" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "Warner Bros. Studio Tour Tokyo Tickets (2026): Prices & How to Book（英文）" },
            { href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", title: "teamLab 無界 門票（2026）：票價、時段預約與購票管道" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards Explained（英文）" },
            { href: "/guides/transport/ic-cards-japan", title: "IC Cards in Japan 2026: Suica, Pasmo & How to Use Them（英文）" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>準備訂 teamLab Planets 了嗎？</h2>
            <p className={styles.ctaBannerDesc}>
              入場以 30 分鐘為一段，好的時段 2～3 週前就會沒有。Klook 是 teamLab 的官方售票合作夥伴，
              結帳頁面有中文、可用自己的幣別付款，電子票直接存在手機裡。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 teamLab Planets 門票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
