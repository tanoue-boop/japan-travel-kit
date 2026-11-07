import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import { seoTags } from "../../../../components/IntlSeo";
import {
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookLink from "../../../../components/KlookLink";
import CityGuideIndex from "../../../../components/CityGuideIndex";
import GygCompare from "../../../../components/GygCompare";
import {
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  skytreeTicket,
  fujiHakoneDayTour,
  klookEsim,
  klookPassGreaterTokyo,
  hanedaLimousineBus,
  naritaLimousineBus,
  shibuyaAnnexGoKartTour,
  shinjukuNightFoodWalkingTour,
  tokyoDisneyOneDayPassport,
  tokyoJoypolisPassport,
  tokyoStayAreas,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { gygTokyo, gygTokyoEntryTickets } from "../../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { PRICES, TOKYO_GUIDE_PRICES } from "../../../../lib/attraction-prices";

// Mirrors the English page (pages/guides/attractions/things-to-do-tokyo.tsx) as of
// 2026-11-07, section for section and block for block; no figures added beyond it.

const ROUTE = "/zh-tw/guides/attractions/things-to-do-tokyo";
const TITLE = "東京自由行景點 2026：必去清單與門票價格";
const DESC =
  "2026 東京自由行景點與門票價格：澀谷SKY ¥2,700 起、teamLab Planets ¥3,800 起、迪士尼 ¥8,900 起，哪些要先訂。";

const label = (iso: string) => dateLabel(iso, "zh-tw");
const CHECKED_FREE = label("2026-11-07");
const TOCHO_CHECKED = label(PRICES.tochoDeck.checked);
// All figures come from lib/attraction-prices.ts, as on the English page.
const SKY = PRICES.shibuyaSky;
const [SKY_ONLINE_DAY, SKY_ONLINE_LATE] = SKY.adult.split(" / ");
const [SKY_DOOR_DAY, SKY_DOOR_LATE] = (SKY.atDoor ?? "").split(" / ");
const SKY_CHECKED = label(SKY.checked);
const SUBWAY_CHECKED = label(PRICES.tokyoSubwayTicket.checked);
const zhPrice = (value: string) => priceLabel(value, "zh-tw");

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const priceRows = [
  {
    name: "澀谷SKY",
    adult: `15 點前 ${SKY_ONLINE_DAY}、15 點起 ${SKY_ONLINE_LATE}（線上）`,
    book: "建議：日落場會賣完",
    sameDay: `有，14 樓櫃台：${SKY_DOOR_DAY}／${SKY_DOOR_LATE}`,
    change: "官網線上票：入場日前可免費取消",
    checked: SKY.checked,
    href: "/zh-tw/guides/attractions/shibuya-sky-tickets",
    klook: SKY.klook.url,
  },
  {
    name: "東京迪士尼（一日護照）",
    adult: `${zhPrice(TOKYO_GUIDE_PRICES.tokyoDisney.adult)}，依日期`,
    book: "必須",
    sameDay: "門口不賣票；僅官網或 App，有票才能買",
    change: "不可退款；可線上改期，依新日期票價",
    checked: TOKYO_GUIDE_PRICES.tokyoDisney.checked,
    href: "/zh-tw/guides/attractions/tokyo-disney-tickets",
    klook: tokyoDisneyOneDayPassport.url,
  },
  {
    name: "teamLab Planets",
    adult: `${zhPrice(PRICES.teamlabPlanets.adult)}，依日期`,
    book: "必須",
    sameDay: "現場不售票",
    change: "不可退款；最多改 3 次，入場前 2 小時截止",
    checked: PRICES.teamlabPlanets.checked,
    href: "/zh-tw/guides/attractions/teamlab-planets-tickets",
    klook: PRICES.teamlabPlanets.klook.url,
  },
  {
    name: "teamLab 無界",
    adult: `${zhPrice(PRICES.teamlabBorderless.adult)}，依日期`,
    book: "必須",
    sameDay: "尚有名額時現場可買，多 ¥200",
    change: "官方票：日期最多可改 3 次",
    checked: PRICES.teamlabBorderless.checked,
    href: "/zh-tw/guides/attractions/teamlab-borderless-tickets",
    klook: PRICES.teamlabBorderless.klook.url,
  },
  {
    name: "華納兄弟哈利波特影城",
    adult: PRICES.wbStudioTour.adult,
    book: "必須",
    sameDay: "現場設有售票處，但日期與時段可能賣完",
    change: "不可退款；每次改日期或時段 ¥1,500",
    checked: PRICES.wbStudioTour.checked,
    href: PRICES.wbStudioTour.href,
    klook: PRICES.wbStudioTour.klook.url,
  },
  {
    name: "三麗鷗彩虹樂園（一日護照）",
    adult: PRICES.sanrioPuroland.adult,
    book: "必須：除了門票還要來園預約",
    sameDay: "售票窗口可買，但仍需來園預約",
    change: "沒有預約而無法入園時不退款",
    checked: PRICES.sanrioPuroland.checked,
    href: PRICES.sanrioPuroland.href,
    klook: PRICES.sanrioPuroland.klook.url,
  },
  {
    name: "東京晴空塔（350 樓）",
    adult: zhPrice(PRICES.tokyoSkytree.adult),
    book: "建議：比櫃台便宜",
    sameDay: "有，櫃台每張加收 ¥500",
    change: "官網線上票：31 天前免費，之後 20%；不可改期",
    checked: PRICES.tokyoSkytree.checked,
    href: "/zh-tw/guides/attractions/tokyo-skytree-tickets",
    klook: PRICES.tokyoSkytree.klook.url,
  },
  {
    name: "東京鐵塔（主展望台）",
    adult: PRICES.tokyoTower.adult,
    book: "不需要",
    sameDay: "有，同價",
    change: "票價頁面未說明",
    checked: PRICES.tokyoTower.checked,
    href: PRICES.tokyoTower.href,
    klook: PRICES.tokyoTower.klook.url,
  },
  {
    name: "東京 Joypolis（Passport）",
    adult: TOKYO_GUIDE_PRICES.tokyoJoypolis.adult,
    book: "不需要",
    sameDay: "有，現場販售",
    change: "請看賣家的條款",
    checked: TOKYO_GUIDE_PRICES.tokyoJoypolis.checked,
    href: "/guides/attractions/tokyo-joypolis-tickets",
    klook: tokyoJoypolisPassport.url,
  },
  {
    name: "東京街道卡丁車",
    adult: `${TOKYO_GUIDE_PRICES.tokyoGoKart.adult}，依路線`,
    book: "建議，且出國前要備妥國際駕照",
    sameDay: "業者未說明",
    change: "7 天前可免費取消；文件不齊不退款",
    checked: TOKYO_GUIDE_PRICES.tokyoGoKart.checked,
    href: "/guides/attractions/tokyo-go-kart",
    klook: shibuyaAnnexGoKartTour.url,
  },
  {
    name: "東京都廳展望室",
    adult: zhPrice(PRICES.tochoDeck.adult),
    book: "不需要",
    sameDay: "沒有票",
    change: "—",
    checked: PRICES.tochoDeck.checked,
    href: PRICES.tochoDeck.href,
    klook: null,
  },
];

const freeRows = [
  {
    thing: "東京都廳（新宿）",
    what: "45 樓、202 公尺的展望室；開放時間與開放的展望室會變動，請前一天確認",
    checked: TOCHO_CHECKED,
    source: "metro.tokyo.lg.jp",
  },
  {
    thing: "明治神宮（原宿）",
    what: "每天開放，日出到日落；境內部分設施較早關閉",
    checked: CHECKED_FREE,
    source: "meijijingu.or.jp",
  },
  {
    thing: "皇居東御苑",
    what: "通常週一、週五與 12 月 28 日至 1 月 3 日休園",
    checked: CHECKED_FREE,
    source: "kunaicho.go.jp",
  },
  {
    thing: "澀谷十字路口",
    what: "這是公共道路，沒有門票，也沒有開放時間",
    checked: "—",
    source: "—",
  },
];

const bookingRows = [
  { thing: "東京迪士尼樂園／迪士尼海洋", when: "數週前", why: "指定日期票，門口完全不賣票" },
  { thing: "teamLab Planets／無界", when: "數天到數週前", why: "30 分鐘指定時段，會賣完" },
  { thing: "澀谷SKY", when: "日落場請提前數天", why: "日落場最先沒；其他時段比較好訂" },
  { thing: "華納兄弟哈利波特影城", when: "數週前", why: "指定時段、不可重複入場，且要逛四小時" },
  { thing: "大相撲賽事", when: "開賣當天", why: "東京只有 1 月、5 月與 9 月有" },
  { thing: "卡丁車", when: "出國前", why: "要處理的不是訂位——是國際駕照" },
  { thing: "東京晴空塔、東京鐵塔", when: "當天就可以", why: "線上預購省一點；名額通常不是問題" },
  { thing: "東京都廳免費展望室、神社、街區", when: "直接去", why: "沒有票可以訂" },
];

const faqItems: FaqItem[] = [
  {
    q: "東京到底哪些需要提前訂？",
    a: "其實就五件事：東京迪士尼（指定日期、門口不賣票）、兩間 teamLab 美術館（30 分鐘指定時段）、澀谷SKY 的日落時段、華納兄弟哈利波特影城，以及除了門票還要來園預約的三麗鷗彩虹樂園。大相撲也算，但只在你的日期落在 1 月、5 月或 9 月時。東京其他幾乎所有東西——晴空塔、東京鐵塔、神社、街區、免費的東京都廳展望室——都可以當天早上再決定。",
  },
  {
    q: "東京有免費的景點嗎？",
    a: `有，而且其中一個是付費展望台的真正對手。新宿的東京都廳在 45 樓、202 公尺處設有展望室，免費入場，晴空塔與東京鐵塔都在視野裡。神社、公園與整片街區都不用錢就能逛，所以下面要付費的清單可以很短。高度與入場費讀自 metro.tokyo.lg.jp，查核日 ${TOCHO_CHECKED}。`,
  },
  {
    q: "為什麼東京的官方售票網站刷不過我的卡？",
    a: "好幾個日本景點的付款頁對海外發行的信用卡處理得不順，東京迪士尼是最有名的例子。這就是為什麼從海外訂票時，走售票平台常常比較順——即使官網理論上對你開放。它給你的是看得懂、海外卡刷得過的結帳流程，而不是更便宜的票。我們每一篇景點攻略都會說那個場館適合走哪條路。",
  },
  {
    q: "東京的景點需要幾天？",
    a: "三到四天就夠把兩個大型售票景點——例如一座主題樂園加一個影城——配上一個展望台、一個體驗，以及一趟出城的一日遊。順序比天數重要：先把指定時段的日期釘死，因為那是唯一不能移動的東西，再用可以現場去的觀光填空檔。",
  },
  {
    q: "從東京出發有哪些值得的一日遊？",
    a: "四個特別突出，而且是真正不同的四天。鎌倉最輕鬆——一條 JR 線不到一小時，有露天的大佛與海邊寺院。日光是 UNESCO 世界遺產的神社加山景，往北兩小時。箱根是溫泉與火山谷，一張周遊券涵蓋整個環線。河口湖是去看富士山的地方。每一個在下面都有自己的攻略。",
  },
  {
    q: "澀谷SKY 和東京晴空塔要選哪一個？",
    a: `想要澀谷十字路口上方的開放式屋頂就選澀谷SKY，想要高度就選東京晴空塔。澀谷SKY 線上購票 15 點前 ${SKY_ONLINE_DAY}、15 點起 ${SKY_ONLINE_LATE}，會賣完的是日落時段。晴空塔 350 樓 ${zhPrice(PRICES.tokyoSkytree.adult)}，在櫃台購票每張加收 ¥500。官方票價，查核日 ${SKY_CHECKED} 與 ${label(PRICES.tokyoSkytree.checked)}。`,
  },
  {
    q: "東京迪士尼兩座園區可以一天逛完嗎？",
    a: `目前一張票不行。每張園區門票只限一座園區、一個日期，官方 FAQ 也寫明一日跳園護照目前沒有販售，所以兩座園區就是兩天。查核日 ${label(TOKYO_GUIDE_PRICES.tokyoDisney.checked)}。`,
  },
  {
    q: "東京景點門票可以退款嗎？",
    a: "要看場館。東京迪士尼、teamLab Planets 與華納兄弟影城都不接受因個人因素退款，但各自有改期規則。澀谷SKY 官網線上票在入場日前可免費取消；晴空塔官網票 31 天以上前取消免費，之後收 20%。售票平台有自己的條款，請在結帳時確認。",
  },
];

const tours = [
  withKlookLocale(tokyoSubwayTicket, "zh-tw", {
    title: "東京地鐵通票（24／48／72 小時）",
    desc: "東京Metro與都營地下鐵全線無限次搭乘，抵達後領取，不必排隊現場買",
  }),
  withKlookLocale(skytreeTicket, "zh-tw", {
    title: "東京晴空塔門票",
    desc: "350 樓天望甲板的指定時段門票，同一個商品頁也能加購 450 樓套票",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "zh-tw", {
    title: "東京市區觀光巴士一日遊",
    desc: "附多語語音導覽，一趟走完皇居庭園、淺草與東京晴空塔",
  }),
  withKlookLocale(fujiHakoneDayTour, "zh-tw", {
    title: "富士山＋箱根一日遊",
    desc: "富士山五合目，加上箱根火山地帶與蘆之湖，從東京出發一天走完",
  }),
  withKlookLocale(shinjukuNightFoodWalkingTour, "zh-tw", {
    title: "新宿夜間美食導覽",
    desc: "三小時併團步行，走回憶橫丁、歌舞伎町與黃金街",
  }),
  withKlookLocale(
    { title: "新宿飯店", desc: "位於山手線上，也是中央線、小田急與京王線的起點", url: tokyoStayAreas[0].url },
    "zh-tw",
  ),
  withKlookLocale(
    { title: "東京車站／丸之內飯店", desc: "山手線車站，也是新幹線起點，最適合常跑一日遊的人", url: tokyoStayAreas[1].url },
    "zh-tw",
  ),
  withKlookLocale(naritaLimousineBus, "zh-tw", {
    title: "成田機場－東京利木津巴士",
    desc: "往返成田三座航廈與東京的飯店、車站，以 QR Code 上車",
  }),
  withKlookLocale(hanedaLimousineBus, "zh-tw", {
    title: "羽田機場－東京利木津巴士",
    desc: "從羽田三座航廈出發，目的地包含新宿、池袋與迪士尼度假區",
  }),
  withKlookLocale(klookPassGreaterTokyo, "zh-tw", {
    title: "Klook Pass Greater Tokyo",
    desc: "Klook 的多景點通票，可從清單選 2 到 7 個景點；確定三、四個付費景點後再比價",
  }),
  withKlookLocale({ title: "Klook 日本 eSIM", desc: "落地就有網路，和門票在同一個結帳流程買好", url: klookEsim.url }, "zh-tw"),
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "東京自由行景點" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhThingsToDoTokyoPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, "zh-tw");

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
              inLanguage: JSONLD_LANG["zh-tw"],
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
            東京自由行景點 2026：<br />必去清單與門票價格
          </h1>
          <p className={styles.heroSubtitle}>
            東京熱門景點的官方門票價格、哪些要先訂、哪些免費，
            以及其他可以吃早餐時再決定的行程。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "附查核日的官方票價", "依急迫性排序"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>東京哪些景點要先訂票？</h2>
          <p className={styles.bodyText}>
            東京需要事先訂票的只有幾處：澀谷SKY（成人 {SKY_ONLINE_DAY} 起）、teamLab Planets（{zhPrice(PRICES.teamlabPlanets.adult)}）、
            東京迪士尼（{zhPrice(TOKYO_GUIDE_PRICES.tokyoDisney.adult)}）、華納兄弟哈利波特影城（{PRICES.wbStudioTour.adult}），
            以及三麗鷗彩虹樂園的來園預約。其他都可以當天再決定；想看免費的景色，就去 202 公尺高的東京都廳展望室。
            以上是官方票價，每個數字的查核日都列在下表。
          </p>
          <p className={styles.bodyText}>
            這一頁只談東京。京都、大阪與兒童票價請看{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景點門票價格總表（英文）
            </Link>
            ；想細看各展望台的差別，請看{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>東京展望台比較（英文）</Link>。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(SKY.klook.url, "zh-tw")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看澀谷SKY →
            </KlookLink>
            <KlookLink href={klookFor(PRICES.teamlabPlanets.klook.url, "zh-tw")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看 teamLab Planets →
            </KlookLink>
            <KlookLink href={klookFor(tokyoDisneyOneDayPassport.url, "zh-tw")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看東京迪士尼 →
            </KlookLink>
            <KlookLink href={klookFor(PRICES.wbStudioTour.klook.url, "zh-tw")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看華納兄弟影城 →
            </KlookLink>
          </div>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>門票價格</span>
          <h2 className={styles.sectionTitle}>東京景點門票多少錢？</h2>
          <p className={styles.bodyText}>
            成人票方面，展望台或 teamLab 美術館從 ¥1,500 到 ¥3,800 起，主題樂園或影城從 ¥3,900 到 ¥8,900 起。
            有幾處票價依日期變動，所以「起」指的是官方公布的最低價。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["景點", "成人票價", "要先訂嗎", "當日票", "取消或改期", "查核日", "詳情"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider}>{row.name}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.book}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.change}</td>
                      <td style={{ fontSize: "0.88rem" }}>{label(row.checked)}</td>
                      <td style={{ fontSize: "0.88rem" }}>
                        <Link href={row.href} style={linkStyle}>攻略</Link>
                        {row.klook && (
                          <>
                            {" · "}
                            <KlookLink href={klookFor(row.klook, "zh-tw")} target="_blank" rel="sponsored noopener" style={linkStyle}>
                              Klook
                            </KlookLink>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            以上是官方成人票價與條款，於查核日讀自業者網站。Klook 有自己的價格與取消條款，請打開商品頁看你的日期。
            卡丁車價格是 Street Kart 官方價目表上的每人價格範圍。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(PRICES.teamlabBorderless.klook.url, "zh-tw")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看 teamLab 無界 →
            </KlookLink>
            <KlookLink href={klookFor(tokyoSightseeingBusTour.url, "zh-tw")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看東京一日遊 →
            </KlookLink>
          </div>
        </section>

        <KlookTourPicks
          heading="值得先訂好的東京行程"
          intro="交通通票、一日遊、夜間美食導覽、住宿、機場交通、多景點通票與手機網路，再加上展望台門票與富士山巴士行程。打開商品頁看你那天的即時價格。"
          tours={tours}
        />

        {/* Top picks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>必去清單</span>
          <h2 className={styles.sectionTitle}>東京必去景點有哪些？</h2>
          <p className={styles.bodyText}>
            東京必去的是日落時的展望台、一間 teamLab 美術館、一天主題樂園，以及一個吃小店的夜晚。
            再加上神社、庭園與一趟一日遊，第一次去東京就排滿了。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>高處的視野：</strong>日落時的<Link href="/zh-tw/guides/attractions/shibuya-sky-tickets" style={linkStyle}>澀谷SKY</Link>，或不必預訂的<Link href="/guides/attractions/tokyo-tower-tickets" style={linkStyle}>東京鐵塔（英文）</Link>。</li>
            <li><strong>數位藝術：</strong><Link href="/zh-tw/guides/attractions/teamlab-planets-tickets" style={linkStyle}>teamLab Planets</Link> 或 <Link href="/zh-tw/guides/attractions/teamlab-borderless-tickets" style={linkStyle}>teamLab 無界</Link>。</li>
            <li><strong>一天樂園：</strong><Link href="/zh-tw/guides/attractions/tokyo-disney-tickets" style={linkStyle}>東京迪士尼</Link>、<Link href="/guides/attractions/sanrio-puroland-tickets" style={linkStyle}>三麗鷗彩虹樂園（英文）</Link>或室內的<Link href="/guides/attractions/tokyo-joypolis-tickets" style={linkStyle}>東京 Joypolis（英文）</Link>。</li>
            <li><strong>夜晚：</strong>走回憶橫丁與黃金街的<Link href="/guides/attractions/tokyo-night-food-tour" style={linkStyle}>夜間美食導覽（英文）</Link>。</li>
            <li><strong>動手體驗：</strong>持有合格駕照文件的話，可以參加<Link href="/guides/attractions/tokyo-go-kart" style={linkStyle}>東京卡丁車（英文）</Link>。</li>
          </ul>
        </section>

        {/* Booking urgency */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>先訂還是現場去</span>
          <h2 className={styles.sectionTitle}>東京景點要提前多久訂？</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["景點", "何時訂", "原因"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.thing}>
                      <td className={styles.tdProvider}>{row.thing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Free */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>免費</span>
          <h2 className={styles.sectionTitle}>東京有哪些免費景點？</h2>
          <p className={styles.bodyText}>
            你可以從 202 公尺高處看東京、走明治神宮的森林與皇居東御苑，也可以走過澀谷十字路口，這四處都不用買票。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["地點", "須知", "查核日", "來源"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {freeRows.map((row) => (
                    <tr key={row.thing}>
                      <td className={styles.tdProvider}>{row.thing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.checked}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            冬天還有一些免費的{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours" style={linkStyle}>東京燈飾（英文）</Link>。
          </p>
        </section>

        {/* Subway ticket */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>東京地鐵通票划算嗎？</h2>
          <p className={styles.bodyText}>
            72 小時票通常划算，24 小時票要跑得多才划算。24 小時 {PRICES.tokyoSubwayTicket.adult}、48 小時 ¥1,500、
            72 小時 ¥2,000，最長的票平均每天約 ¥667；用 IC 卡每趟 ¥178 到 ¥324，大約四趟短程就回本。24 小時票則要五到六趟。
          </p>
          <p className={styles.bodyText}>
            它涵蓋東京Metro與都營地下鐵，但不含 JR，所以山手線不能搭。完整的回本計算請看{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={linkStyle}>東京地鐵通票攻略（英文）</Link>。
            票價與車資讀自 tokyometro.jp，查核日 {SUBWAY_CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(tokyoSubwayTicket.url, "zh-tw")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看東京地鐵通票 →
            </KlookLink>
          </div>
        </section>

        {/* Days */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>規劃</span>
          <h2 className={styles.sectionTitle}>東京要玩幾天？</h2>
          <p className={styles.bodyText}>
            三天可以走完主要景點，五天還能排兩趟出城的一日遊。先把指定時段的票排好，再用可以現場去的行程填空檔。
            我們的{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={linkStyle}>東京三天行程（英文）</Link>{" "}
            與{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>東京五天行程（英文）</Link>{" "}
            排好了每一天。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(tokyoSightseeingBusTour.url, "zh-tw")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看東京一日遊 →
            </KlookLink>
            <KlookLink href={klookFor(shinjukuNightFoodWalkingTour.url, "zh-tw")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看夜間美食導覽 →
            </KlookLink>
            <KlookLink href={klookFor(tokyoStayAreas[0].url, "zh-tw")} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              在 Klook 看新宿飯店 →
            </KlookLink>
          </div>
        </section>

        {/* Views from above */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>高處的視野</span>
          <h2 className={styles.sectionTitle}>東京展望台要選哪一個？</h2>
          <p className={styles.bodyText}>
            <strong>澀谷SKY</strong> 是澀谷十字路口上方的開放式屋頂，也是唯一一個「時段比門票重要」的展望台：
            成人線上預購 15 點前入場 {SKY_ONLINE_DAY}、15 點起 {SKY_ONLINE_LATE}；14 樓售票櫃台則是 {SKY_DOOR_DAY} 與{" "}
            {SKY_DOOR_LATE}（官方票價，查核日 {SKY_CHECKED}）。日落一定落在較晚的時段，而會賣完的正是這些時段。詳見我們的{" "}
            <Link href="/zh-tw/guides/attractions/shibuya-sky-tickets" style={linkStyle}>澀谷SKY 門票攻略</Link>。{" "}
            <strong>東京晴空塔</strong>是走高度的選項，350 樓天望甲板 {priceLabel(PRICES.tokyoSkytree.adult, "zh-tw")}——
            <Link href="/zh-tw/guides/attractions/tokyo-skytree-tickets" style={linkStyle}>我們的晴空塔門票攻略</Link>
            說明為什麼一開始就加購 450 樓，比到現場再加購便宜。
          </p>
          <p className={styles.bodyText}>
            在為任何一個付錢之前，先看看我們的{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>東京展望台比較（英文）</Link>，
            它把四座展望台並排比較——包括新宿的東京都廳，那裡 202 公尺高的展望室是免費的。
          </p>
        </section>

        {/* teamLab */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>數位藝術</span>
          <h2 className={styles.sectionTitle}>teamLab 美術館要訂哪一間？</h2>
          <p className={styles.bodyText}>
            東京有兩間 teamLab 數位藝術美術館——豐洲的 Planets 與麻布台的無界——
            兩間都是走進去的沉浸式體驗，都採指定時段入場，而且很快賣完。我們的{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-planets-tickets" style={linkStyle}>teamLab 門票攻略</Link>{" "}
            比較了兩間，說明哪一間適合你的行程，以及怎麼在賣完之前訂到。
          </p>
        </section>

        {/* Theme parks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>主題樂園</span>
          <h2 className={styles.sectionTitle}>東京迪士尼和華納兄弟影城要訂嗎？</h2>
          <p className={styles.bodyText}>
            <strong>東京迪士尼</strong>（樂園與海洋）用的是指定日期票，數週前就會賣完，而且門口完全不賣票——
            官網還可能擋下海外信用卡。我們的{" "}
            <Link href="/zh-tw/guides/attractions/tokyo-disney-tickets" style={linkStyle}>東京迪士尼門票攻略</Link>{" "}
            說明怎麼買以及兩座園區怎麼選。哈利波特迷的話，<strong>華納兄弟哈利波特影城東京</strong>
            是位於練馬的哈利波特影城，指定時段、不可重複入場，要預留大約四小時——細節在我們的{" "}
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" style={linkStyle}>影城攻略（英文）</Link>。
          </p>
        </section>

        {/* Experiences */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>體驗</span>
          <h2 className={styles.sectionTitle}>東京有哪些值得訂的體驗？</h2>
          <p className={styles.bodyText}>
            動手型的體驗大多可以很晚才訂，只有一個例外。<strong>街道卡丁車</strong>讓你穿著裝扮開上東京的一般道路，
            但它需要國際駕照，而國際駕照必須在出國前、在你自己的國家申請——我們的{" "}
            <Link href="/guides/attractions/tokyo-go-kart" style={linkStyle}>卡丁車攻略（英文）</Link>{" "}
            說明誰能申請、誰不能。想看日本的國技，我們的{" "}
            <Link href="/guides/attractions/sumo-tokyo-tickets" style={linkStyle}>東京相撲攻略（英文）</Link>{" "}
            比較了賽事門票（東京只在 1 月、5 月與 9 月有）與全年都有的晨間朝練參觀行程。
          </p>
          <p className={styles.bodyText}>
            比較安靜的選擇方面，淺草的{" "}
            <Link href="/guides/attractions/kimono-rental-japan" style={linkStyle}>和服租借（英文）</Link>{" "}
            是要投入半天、有固定歸還時間的行程，而不只是借件衣服；{" "}
            <Link href="/guides/attractions/tea-ceremony-japan" style={linkStyle}>茶道體驗（英文）</Link>{" "}
            不到一小時，大多數針對觀光客的方案都用英文教學；而{" "}
            <Link href="/guides/attractions/samurai-ninja-experience-tokyo" style={linkStyle}>武士與忍者體驗（英文）</Link>{" "}
            其實是用同一個名字在賣三種相當不同的東西。
          </p>
        </section>

        {/* Food */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>美食</span>
          <h2 className={styles.sectionTitle}>東京美食導覽值得訂嗎？</h2>
          <p className={styles.bodyText}>
            在東京，最好吃的東西常常藏在一扇你自己不會推開的門後——回憶橫丁只有六個座位的居酒屋吧台、
            黃金街的小酒吧。這才是參加{" "}
            <Link href="/guides/attractions/tokyo-food-tour" style={linkStyle}>美食導覽（英文）</Link>{" "}
            真正的理由：不是食物本身（那你自己也找得到），而是那些店。如果你寧可帶點什麼回家，{" "}
            <Link href="/guides/attractions/tokyo-cooking-class" style={linkStyle}>料理教室（英文）</Link>{" "}
            用英文上課、大約兩個小時，結束後你能自己再做一次那道菜。
          </p>
        </section>

        {/* Day trips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>出城</span>
          <h2 className={styles.sectionTitle}>從東京出發有哪些值得的一日遊？</h2>
          <p className={styles.bodyText}>
            <Link href="/guides/attractions/kamakura-day-trip" style={linkStyle}>鎌倉（英文）</Link>{" "}
            是你只想花一個早上規劃時該去的：一條 JR 線不到一小時、JR Pass 本來就涵蓋，
            露天的大佛與長谷寺相隔幾分鐘。{" "}
            <Link href="/guides/attractions/nikko-day-trip" style={linkStyle}>日光（英文）</Link>{" "}
            往北兩小時，看 UNESCO 世界遺產的神社與山中瀑布，兩者之間的公車是要規劃的部分。
          </p>
          <p className={styles.bodyText}>
            富士山其實是兩個不同的問題。想去河口湖一帶的觀景點，我們的{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>富士山一日遊交通攻略（英文）</Link>{" "}
            說明直達電車與 Mt. Fuji Pass；想站上山上的富士斯巴魯線五合目，那需要巴士，我們的{" "}
            <Link href="/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>富士山一日遊行程比較</Link>{" "}
            把各種行程整理清楚。{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>箱根（英文）</Link>{" "}
            是溫泉的替代方案，一張周遊券涵蓋整個環線。
          </p>
        </section>

        <FaqList items={faqItems} />

        <GygCompare
          slug="zh-tw-things-to-do-tokyo"
          heading="同一座城市的第二個商品目錄"
          intro="這一頁沒有任何東西只靠單一賣家。如果你在排日期時，上面某樣已經賣完——澀谷SKY 的時段、富士山巴士、teamLab 的入場——GetYourGuide 的東京商品目錄是另一個可以依日期搜尋的地方，而且有 Klook 沒有的業者。"
          listings={[gygTokyo, gygTokyoEntryTickets]}
        />

        <Related
          items={[
            { href: "/guides/attractions/akihabara-anime-tour", title: "秋葉原動漫導覽（2026）：導覽行程、店家營業時間與交通方式（英文）" },
            { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "從東京出發的 GALA 湯澤滑雪一日遊：71 分鐘、纜車券 ¥8,000（英文）" },
            { href: "/guides/attractions/tokyo-night-food-tour", title: "東京夜間美食導覽（2026）：回憶橫丁、黃金街與 20 歲以上規定（英文）" },
            { href: "/guides/attractions/where-to-stay-in-tokyo", title: "東京住宿區域推薦（2026）：依路線與機場比較最佳區域（英文）" },
            { href: "/guides/attractions/tokyo-illumination-tours", title: "東京燈飾 2026：日期、時間與哪些免費（英文）" },
            { href: "/zh-tw/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 門票 2026：票價、時間與預約方式" },
            { href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", title: "teamLab 無界 門票（2026）：票價、時段預約與購票管道" },
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "東京五天行程（2026）：東京 5 天，每天怎麼排（英文）" },
            { href: "/guides/attractions/tokyo-joypolis-tickets", title: "東京 Joypolis 門票（2026）：Passport 票價、營業時間與身高限制（英文）" },
            { href: "/guides/attractions/japan-14-day-itinerary", title: "日本 14 天行程（2026）：日本兩週，每天怎麼排（英文）" },
            { href: "/zh-tw/guides/esim/best-esim-japan", title: "日本網卡推薦（2026）：eSIM 方案比較與 Klook 日本 eSIM" },
            { href: "/guides/attractions/tokyo-bay-cruise", title: "東京灣遊船（2026）：屋形船與 Symphony 比較、時間與票價（英文）" },
            { href: "/guides/attractions/tsukiji-market-food-tour", title: "築地市場美食導覽（2026）：營業時間、吃什麼與該訂哪個導覽（英文）" },
            { href: "/guides/attractions/asakusa-kimono-rental", title: "淺草和服租借（2026）：歸還時間、髮型造型與拍照地點（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "東京三天行程（2026）：要訂什麼、依什麼順序（英文）" },
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "從東京出發的河口湖一日遊（2026）：路線、車資與一天排得下什麼（英文）" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "三麗鷗彩虹樂園門票（2026）：票價、浮動票價與預約方式（英文）" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "富士急樂園門票（2026）：一日券票價、Q Pack 與交通方式（英文）" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "東京鐵塔門票（2026）：票價、主展望台與頂層展望台比較、預約方式（英文）" },
            { href: "/guides/attractions/tokyo-observation-decks", title: "東京展望台（2026）：澀谷SKY、晴空塔與東京鐵塔比較（英文）" },
            { href: "/guides/attractions/tokyo-food-tour", title: "東京美食導覽（2026）：選哪一區，以及導覽多給你什麼（英文）" },
            { href: "/guides/attractions/tokyo-cooking-class", title: "東京料理教室（2026）：壽司、拉麵與上課內容（英文）" },
            { href: "/guides/attractions/samurai-ninja-experience-tokyo", title: "東京武士與忍者體驗（2026）：該訂哪一種（英文）" },
            { href: "/guides/attractions/nikko-day-trip", title: "從東京出發的日光一日遊（2026）：交通、花費與要不要跟團（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
            { href: "/guides/transport/tokyo-transportation", title: "東京交通攻略（2026）：電車、地鐵與 IC 卡一次看懂（英文）" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
          ]}
        />

        {/* Every guide for this city; the component compares against English hrefs and localises itself. */}
        <CityGuideIndex city="tokyo" exclude="/guides/attractions/things-to-do-tokyo" />
      </div>
    </>
  );
}
