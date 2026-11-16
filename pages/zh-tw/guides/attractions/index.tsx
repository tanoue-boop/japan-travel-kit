import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import { seoTags } from "../../../../components/IntlSeo";
import {
  KLOOK_REL,
  Breadcrumb,
  Disclosure,
  FaqList,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import { zhKlookEsim, zhTokyoSubwayTicket } from "../../../../lib/klook-links-zh-tw";
import { attractionPrices, checkedLabel, latestChecked } from "../../../../lib/attraction-prices";
import { pageUpdated } from "../../../../lib/page-dates";
import { itemListJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, TRANSLATED_PAGES, editionGuideCount, editionPageCount, zhDateLabel, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions";
// task-jtk-20261116-R02: same structure as the English hub — "which Japan attraction
// tickets to book in advance, and when" — title, answer, booking-window table and FAQ.
const TITLE = "日本景點門票 2026：哪些要提前預約、何時開賣與票價";
const DESC =
  "日本景點門票哪些要提前預約：吉卜力美術館每月10日開賣、東京迪士尼與環球影城約2個月前、澀谷SKY 2週前。依城市整理成表，附官方來源。";

/** Booking windows read on each official site on this date (same sources as the English hub). */
const CHECKED = "2026-11-16";
const inline = { color: "var(--text)", fontWeight: 600 } as const;

type WindowRow = { name: string; city: string; opens: string; onTheDay: string; href: string; guide: string; source: string };
const windowRows: WindowRow[] = [
  { name: "吉卜力美術館", city: "東京（三鷹）", opens: "每月 10 日 10:00（日本時間）開賣下個月整月", onTheDay: "沒有——只接受預約，館內不售票", href: "/zh-tw/guides/attractions/things-to-do-tokyo", guide: "東京必去景點", source: "https://www.ghibli-museum.jp/en/tickets/" },
  { name: "吉卜力公園", city: "名古屋", opens: "2 個月前的 10 日 14:00（日本時間）", onTheDay: "沒有——一律須事先預約", href: "/guides/attractions/ghibli-park-tickets", guide: "Ghibli Park tickets（英文）", source: "https://ghibli-park.jp/en/ticket/" },
  { name: "東京迪士尼樂園・海洋", city: "東京（舞濱）", opens: "每天 14:00（日本時間）開賣 2 個月後的同一天", onTheDay: "有餘票時只能在官網或 App 買；園區不售票（迪士尼飯店住客除外）", href: "/zh-tw/guides/attractions/tokyo-disney-tickets", guide: "東京迪士尼門票", source: "https://www.tokyodisneyresort.jp/en/ticket/index.html" },
  { name: "日本環球影城（Studio Pass、快速通關）", city: "大阪", opens: "入園日約 2 個月前", onTheDay: "只能線上購買，可能售罄——售票亭自 2025 年 5 月 6 日起停售", href: "/zh-tw/guides/attractions/usj-tickets-express-pass", guide: "環球影城快速通關", source: "https://www.usj.co.jp/company/company_e/news/2025/0425/" },
  { name: "teamLab 無界", city: "東京（麻布台之丘）", opens: "入場日 2 個月前的月初（1 日前後）", onTheDay: "不建議期待——官方 FAQ 提醒可能售罄", href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", guide: "teamLab 無界門票", source: "https://www.teamlab.art/faq/tokyo/" },
  { name: "澀谷SKY", city: "東京（澀谷）", opens: "入場日 2 週前的 0:00（日本時間）", onTheDay: "有——售票櫃台與網路都可購買", href: "/zh-tw/guides/attractions/shibuya-sky-tickets", guide: "澀谷SKY 門票", source: "https://www.shibuya-scramble-square.com/sky/ticket/" },
  { name: "華納兄弟東京影城（哈利波特）", city: "東京（練馬）", opens: "官網提前販售；官方建議預約，日期與時段可能售罄", onTheDay: "有——現場售票處，未售罄時", href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", guide: "Warner Bros. Studio Tour（英文）", source: "https://www.wbstudiotour.jp/en/tickets/" },
];

// The hub is the entry point for the ten-page 繁體中文 trial, so it lists exactly
// those ten and nothing else — a hub that links mostly to English pages is not a
// Chinese hub. Everything else on the site is one click away through the English
// hub, which this page links to explicitly and labels as English.
type ZhHubGroup = {
  /** Anchor id, so the nav and the other pages can deep-link a group. */
  key: string;
  label: string;
  desc: string;
  /** zh-tw routes, in the order this hub renders them. */
  routes: string[];
};

const groups: ZhHubGroup[] = [
  {
    key: "tickets",
    label: "門票與景點",
    desc: "單一場館的入場券——指定時段的美術館與展望台。官方票價，以及為什麼「時段」常常比「門票」更重要。",
    routes: [
      "/zh-tw/guides/attractions/shibuya-sky-tickets",
      "/zh-tw/guides/attractions/teamlab-planets-tickets",
      "/zh-tw/guides/attractions/teamlab-borderless-tickets",
      "/zh-tw/guides/attractions/tokyo-skytree-tickets",
    ],
  },
  {
    key: "parks",
    label: "主題樂園",
    desc: "東京迪士尼與日本環球影城：票種、快速通關，以及從海外怎麼買。",
    routes: [
      "/zh-tw/guides/attractions/tokyo-disney-tickets",
      "/zh-tw/guides/attractions/usj-tickets-express-pass",
    ],
  },
  {
    // The header's 目的地 → 一日遊 link points at /zh-tw/guides/attractions#daytrips,
    // and the English hub uses the same key for the same group.
    key: "daytrips",
    label: "一日遊",
    desc: "離開市區一整天的行程，要選的是哪一條路線，而不是哪一張票。",
    routes: ["/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo"],
  },
  {
    key: "cities",
    label: "城市攻略",
    desc: "東京哪些要先購票、哪些可以直接去。",
    routes: ["/zh-tw/guides/attractions/things-to-do-tokyo"],
  },
  {
    key: "prep",
    label: "行前準備",
    desc: "抵達日本當天就會用到的兩樣東西：機場到市區的交通，以及手機上網。",
    routes: [
      "/zh-tw/guides/transport/tokyo-airport-transfer",
      "/zh-tw/guides/esim/best-esim-japan",
    ],
  },
];

/** Short Chinese blurb per page — one line on what it answers. */
const BLURBS: Record<string, string> = {
  "/zh-tw/guides/attractions/shibuya-sky-tickets":
    "澀谷十字路口上方的開放式屋頂。官方票價、為什麼日落時段最先售罄，以及海外信用卡無法在官網付款時怎麼購票。",
  "/zh-tw/guides/attractions/teamlab-planets-tickets":
    "豐洲的 Planets：官方票價、30 分鐘入場時段、赤腳涉水區該穿什麼，以及和無界的完整比較。",
  "/zh-tw/guides/attractions/teamlab-borderless-tickets":
    "麻布台之丘的無界：浮動定價怎麼算、指定時段與 Flexible Pass 的差別、營業時間與休館日。",
  "/zh-tw/guides/attractions/tokyo-skytree-tickets":
    "晴空塔門票怎麼買：350 公尺天望甲板與 450 公尺天望迴廊的票價比較、線上購票省下現場服務費，以及傍晚時段為什麼要先訂。",
  "/zh-tw/guides/attractions/tokyo-disney-tickets":
    "每張票都指定日期、門口完全不賣票。怎麼買（包括官網封鎖海外卡時），以及樂園與海洋怎麼選。",
  "/zh-tw/guides/attractions/usj-tickets-express-pass":
    "現在一律線上購票，超級任天堂世界需要指定時間入園。Studio Pass 的分級、快速通關 4／7／8 怎麼挑。",
  "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo":
    "四種行程比較：只去富士山，還是連箱根一起玩、Subaru Line 五合目是什麼，以及一天要多久。",
  "/zh-tw/guides/attractions/things-to-do-tokyo":
    "真正會賣完的只有四、五樣。這份短名單說哪些要提前多久購票，哪些可以吃早餐時再決定。",
  "/zh-tw/guides/transport/tokyo-airport-transfer":
    "成田與羽田進市區的每個選項，比價格、時間與方便度，附 2026 年車資與依飯店位置的建議。",
  "/zh-tw/guides/esim/best-esim-japan":
    "Klook 日本 eSIM，加上 Airalo、Holafly、eSIM Go、Sakura Mobile 的價格與網路比較。價格每天查核。",
};

/** The pair rows for this hub's own routes, keyed by route for title lookup. */
const pageByRoute = new Map(TRANSLATED_PAGES.map((p) => [p.zhTw, p]));

const hubRoutes = groups.flatMap((g) => g.routes);

const faqItems: FaqItem[] = [
  {
    q: "日本哪些景點門票一定要提前購買？",
    a: "門口完全不賣票的有四個：吉卜力美術館（只接受預約，每月 10 日 10:00 開賣下個月）、吉卜力公園（2 個月前的 10 日 14:00 開賣）、東京迪士尼（每天 14:00 開賣 2 個月後的同一天）與日本環球影城（約 2 個月前開賣，售票亭 2025 年 5 月 6 日起停售）。teamLab 無界與澀谷SKY 是指定時段、可能售罄，也建議提前購票。以上皆為日本時間，2026 年 11 月 16 日於各官網查核。",
  },
  {
    q: "teamLab 和澀谷SKY 要提前多久訂？",
    a: "需要特定時段的話，開賣當下就訂。teamLab 無界在入場日 2 個月前的月初（1 日前後）開賣，官方 FAQ 提醒可能售罄；澀谷SKY 在入場日剛好 2 週前的日本時間 0:00 開賣。2026 年 11 月 16 日於 teamlab.art 與 shibuya-scramble-square.com 查核。",
  },
  {
    q: "日本景點門票可以當天買嗎？",
    a: "部分可以。澀谷SKY 有售票櫃台，華納兄弟東京影城在未售罄時現場售票處也賣；東京迪士尼與日本環球影城的當日票只在網路上、有餘票時才買得到；吉卜力美術館與吉卜力公園當天不賣票。2026 年 11 月 16 日查核。",
  },
  {
    q: "東京景點的套票划算嗎？",
    a: "只有套票裡每個景點你本來就會去時才划算。先用門票價格總表把各景點的官方單票加起來比較；澀谷SKY、teamLab 這類指定時段的場館，買之前先確認套票能選哪些入場時段——會售罄的是時段，不是門票。",
  },
  {
    q: "為什麼我的海外信用卡無法在日本官方售票網站付款？",
    a: "好幾個日本景點的付款系統無法正常處理海外發行的信用卡——澀谷SKY 自 2024 年 7 月起就是如此，東京迪士尼也經常拒絕。這就是為什麼從海外購票時，透過售票平台往往比較順利：這些平台提供容易操作、也能使用海外信用卡付款的結帳流程，而不是更便宜的票。",
  },
];

const trail: Crumb[] = [{ label: "日本景點門票" }];

/**
 * "Updated" labels for the cards, in Chinese. The English hubs use
 * `articleDates`, which formats in en-US; here the ISO date comes straight out of
 * `pageUpdated` and `zhMonthLabel` does the formatting, so both editions read the
 * same git history and only the wording differs.
 */
export const getStaticProps = () => ({
  props: {
    dates: Object.fromEntries(hubRoutes.map((route) => [route, zhMonthLabel(pageUpdated(route).iso)])),
  },
});

export default function ZhAttractionsHubPage({ dates }: { dates: Record<string, string> }) {
  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: itemListJsonLd({
              route: ROUTE,
              name: "日本景點門票攻略 — Japan Travel Kit 繁體中文版",
              description: DESC,
              inLanguage: JSONLD_LANG["zh-tw"],
              items: hubRoutes.map((route) => ({
                href: route,
                title: pageByRoute.get(route)?.zhTitle ?? route,
              })),
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>繁體中文版</p>
          <h1 className={styles.heroTitle}>
            日本景點門票 2026：<br />哪些要提前預約、何時開賣
          </h1>
          <p className={styles.heroSubtitle}>
            依「要提前多久購票」整理的日本景點門票：開賣日、當天能不能買、官方票價與查核日期。
          </p>
          <div className={styles.heroBadges}>
            {["官方票價", "附查核日期", `${editionGuideCount("zh-tw")} 篇繁體中文攻略`].map((t) => (
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
            日本最熱門的景點中有四個<strong>門口完全不賣票</strong>，出發前就要買好：<strong>吉卜力美術館</strong>每月 10 日
            10:00 開賣下個月、<strong>吉卜力公園</strong>在 2 個月前的 10 日 14:00 開賣、<strong>東京迪士尼</strong>每天 14:00
            開賣 2 個月後的同一天，<strong>日本環球影城</strong>約 2 個月前開賣，2025 年 5 月 6 日起門口不再售票。
            <strong>teamLab 無界</strong>在 2 個月前的月初、<strong>澀谷SKY</strong>在 2 週前的 0:00 開賣——需要特定時段就在開賣當下訂（皆為日本時間，{CHECKED} 於各官網查核）。
          </p>
          <p className={styles.bodyText}>
            <strong>日本景點門票價格（2026）</strong>：澀谷SKY 網路購票 ¥2,700（15:00 前入場）／¥3,400（15:00
            起），teamLab Planets ¥3,800 起，teamLab 無界 ¥3,400 起，東京迪士尼一日護照 ¥8,900 起；日本環球影城依日期定價，結帳時才顯示當天價格。
            <strong>必須提前在網路上購票的</strong>是兩間 teamLab（指定時段）、東京迪士尼（現場不賣票）與日本環球影城（當天現場不售票），澀谷SKY
            只有日落時段需要提早購票。票價資料取自各官方網站：澀谷SKY 與 teamLab Planets 於 2026 年 11 月 6 日、東京迪士尼於 10 月 28 日、teamLab
            無界於 10 月 9 日查核。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>提前預約</span>
          <h2 className={styles.sectionTitle}>日本哪些景點門票一定要提前購買？</h2>
          <p className={styles.bodyText}>
            吉卜力美術館、吉卜力公園、東京迪士尼與日本環球影城：四個都不在門口賣票。下表是每個景點的開賣時間，以及當天還買不買得到。
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>景點</th>
                    <th>城市</th>
                    <th>何時開賣</th>
                    <th>當天能買嗎？</th>
                    <th>攻略</th>
                    <th>官方來源</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider} style={{ minWidth: "130px" }}>必須提前預約</td>
                    <td style={{ fontSize: "0.82rem" }}>東京、名古屋、大阪</td>
                    <td style={{ fontSize: "0.82rem", minWidth: "180px" }}>吉卜力美術館、吉卜力公園、東京迪士尼、日本環球影城</td>
                    <td style={{ fontSize: "0.82rem", minWidth: "160px" }}>門口不賣票——出發前買好</td>
                    <td style={{ fontSize: "0.82rem" }}>
                      <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={inline}>門票價格總表（英文）</Link>
                    </td>
                    <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>見下列各行</td>
                  </tr>
                  {windowRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ minWidth: "130px" }}>{row.name}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "100px" }}>{row.city}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "180px" }}>{row.opens}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "180px" }}>{row.onTheDay}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "130px" }}>
                        <Link href={row.href} hrefLang={row.href.startsWith("/zh-tw") ? undefined : "en"} style={inline}>{row.guide}</Link>
                      </td>
                      <td style={{ fontSize: "0.82rem", minWidth: "120px" }}>
                        <a href={row.source} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>
                          {new URL(row.source).hostname.replace(/^www\./, "")}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED}。官方頁面：ghibli-museum.jp/en/tickets/ · ghibli-park.jp/en/ticket/ ·
            tokyodisneyresort.jp/en/ticket/index.html 與 faq-en.tokyodisneyresort.jp · usj.co.jp/company/company_e/news/2025/0421/ 與 /0425/ ·
            teamlab.art/faq/tokyo/ · shibuya-scramble-square.com/sky/ticket/ · wbstudiotour.jp/en/tickets/。特別活動可能另訂開賣日。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>先看這個</span>
          <h2 className={styles.sectionTitle}>日本景點門票：重點不在價格</h2>
          <p className={styles.bodyText}>
            日本幾個最熱門的景點不提供現場售票。teamLab、東京迪士尼、日本環球影城與澀谷SKY 的日落時段，
            全都在線上販售指定日期與時段的票，熱門時段往往數週前就會售罄——迪士尼的情況更極端，門口完全不賣票。
          </p>
          <p className={styles.bodyText}>
            有兩件事特別容易讓旅客踩雷：日本官方售票網站有時無法使用海外發行的信用卡付款，而搜尋結果裡排名很前面的轉售頁面，
            常常是入場時無效的票。這些攻略寫的是官方票價、海外旅客可用的購票管道，以及該什麼時候購票。
          </p>
          <p className={styles.bodyText}>
            日本也有很多地方完全不需要這些。京都多數知名寺院可直接入內參觀，奈良公園免費，
            和服體驗或料理課前一週訂都還來得及。這些攻略的重點是：把規劃的力氣花在真的會影響結果的地方。
          </p>
          <p className={styles.bodyText}>
            冬天的北海道也是這樣：
            <Link href="/zh-tw/guides/attractions/sapporo-snow-festival-tours">札幌雪祭 2027</Link>
            （2027 年 2 月 4–11 日）三個會場都免費、不用門票，真正要先訂的是住宿和一日遊；想把雪祭放進一整週，
            <Link href="/zh-tw/guides/attractions/hokkaido-7-day-itinerary">北海道7天行程</Link>
            以札幌 4 晚、富良野 2 晚走完札幌、小樽、旭川、美瑛與富良野。不北上也能看雪：
            <Link href="/zh-tw/guides/attractions/jigokudani-snow-monkey-tour">地獄谷野猿公苑</Link>
            從東京搭新幹線到長野最快 79 分鐘，再轉車、步行約 35 分鐘就能看到泡湯的雪猴，12 月至 4 月持網路票者優先入園。
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.86rem", color: "var(--text-muted)" }}>
            本站目前已查核 {attractionPrices.length} 項日本景點、主題樂園、通票與一日遊景點的官方入場費用，
            最近一次查核是 {zhDateLabel(latestChecked())}（英文版記為 {checkedLabel(latestChecked())}）。
            完整的總表目前只有英文版：{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景點門票價格總表（英文）→
            </Link>
          </p>
        </section>

        {groups.map((group) => (
          <section key={group.key} id={group.key} className={styles.bodySection}>
            <span className={styles.sectionLabel}>{group.label}</span>
            <h2 className={styles.sectionTitle}>{group.label}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>{group.desc}</p>
            <div className={styles.relatedGrid}>
              {group.routes.map((route) => (
                <Link key={route} href={route} className={styles.relatedCard}>
                  <div className={styles.relatedMeta}>
                    <p className={styles.relatedTitle}>{pageByRoute.get(route)?.zhTitle ?? route}</p>
                    <p className={styles.bodyText} style={{ fontSize: "0.85rem", margin: "0.4rem 0 0.6rem" }}>
                      {BLURBS[route]}
                    </p>
                    <span className={styles.relatedArrow}>更新於 {dates[route]}｜看攻略 →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>其他語言</span>
          <h2 className={styles.sectionTitle}>還沒翻譯的部分</h2>
          <p className={styles.bodyText}>
            繁體中文版目前是 {editionPageCount("zh-tw")} 頁的試行版。京都與大阪的城市攻略、其他的一日遊、
            鐵路周遊券、IC 卡、付款與貨幣，以及完整的門票價格總表，目前只有英文版：{" "}
            <Link href="/guides/attractions" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>
              Things to Do in Japan（英文）
            </Link>
            {" "}與{" "}
            <Link href="/guides" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>
              全部攻略（英文）
            </Link>
            。每一頁兩種語言都有的時候，頁首會出現 English／繁體中文 的切換。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>抵達當天</span>
          <h2 className={styles.sectionTitle}>出發前先準備好的兩樣東西</h2>
          <p className={styles.bodyText}>
            通關之後最先用到的兩樣東西：手機上網，以及市區交通。打開商品頁看目前的方案與價格。
            Klook 網卡和其他 6 家的 7 天／15 天價格與買法，整理在{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan" style={inline}>日本eSIM推薦</Link>。
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <KlookLink href={zhKlookEsim.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              {zhKlookEsim.label} →
            </KlookLink>
            <KlookLink href={zhTokyoSubwayTicket.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              {zhTokyoSubwayTicket.label} →
            </KlookLink>
          </div>
        </section>

        <FaqList items={faqItems} />
      </div>
    </>
  );
}
