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
import {
  zhFujiHakoneDayTour,
  zhSkytreeTicket,
  zhTokyoSightseeingBusTour,
  zhTokyoSubwayTicket,
} from "../../../../lib/klook-links-zh-tw";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhDateLabel, zhMonthLabel, zhPrice } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions/things-to-do-tokyo";
const TITLE = "東京自由行景點（2026）：必去景點哪些要先訂票、哪些可以現場去";
const DESC =
  "2026 年東京自由行景點，依「急迫性」排序：真的會賣完的那四、五個指定時段門票，" +
  "可以當天早上再決定的其他行程，以及全市最值得的免費視野。票價與英文版同一組資料、同一個查核日。";

// The only prices on this page are the two carried over from the guides that
// verified them against the operators' own sites — Shibuya Sky and Tokyo Skytree —
// plus the Tocho deck's free admission. Same records, same check date, as English.
const SKY = PRICES.shibuyaSky;
const TREE = PRICES.tokyoSkytree;
const TOCHO = PRICES.tochoDeck;
const CHECKED = zhDateLabel(SKY.checked);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

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
    a: "其實就四件事：東京迪士尼（指定日期、門口不賣票）、兩間 teamLab 美術館（30 分鐘指定時段）、澀谷SKY 的日落時段，以及華納兄弟哈利波特影城。大相撲也算，但只在你的日期落在 1 月、5 月或 9 月時。東京其他幾乎所有東西——晴空塔、東京鐵塔、神社、街區、全市最好的免費視野——都可以當天早上再決定。",
  },
  {
    q: "東京有免費的景點嗎？",
    a: `有，而且其中一個是付費展望台的真正對手。新宿的東京都廳在 45 樓、約 202 公尺處設有展望室，免費入場，晴空塔與東京鐵塔都在視野裡。神社、公園與整片街區都不用錢就能逛，所以下面要付費的清單可以很短。高度與入場費讀自 metro.tokyo.lg.jp，查核日 ${CHECKED}。`,
  },
  {
    q: "為什麼東京的官方售票網站刷不過我的卡？",
    a: "好幾個日本景點的付款頁對海外發行的信用卡處理得不乾淨，東京迪士尼是最有名的例子。這就是為什麼從海外訂票時，走售票平台常常比較順——即使官網理論上對你開放。它給你的是看得懂、海外卡刷得過的結帳流程，而不是更便宜的票。我們每一篇景點攻略都會說那個場館適合走哪條路。",
  },
  {
    q: "東京的景點需要幾天？",
    a: "三到四天就夠把兩個大型售票景點——例如一座主題樂園加一個影城——配上一個展望台、一個體驗，以及一趟出城的一日遊。順序比天數重要：先把指定時段的日期釘死，因為那是唯一不能移動的東西，再用可以現場去的觀光填空檔。",
  },
  {
    q: "從東京出發有哪些值得的一日遊？",
    a: "四個特別突出，而且是真正不同的四天。鎌倉最輕鬆——一條 JR 線不到一小時，有露天的大佛與海邊寺院。日光是 UNESCO 神社加山景，往北兩小時。箱根是溫泉與火山谷，一張周遊券涵蓋整個環線。河口湖是去看富士山的地方。想去富士山五合目的話，那需要巴士團，我們的富士山一日遊攻略整理了行程差異。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "東京自由行景點" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhThingsToDoTokyoPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = zhMonthLabel(updated.iso);

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
            東京自由行景點（2026）：<br />必去景點哪些要先訂票、哪些可以現場去
          </h1>
          <p className={styles.heroSubtitle}>
            東京真正會賣完的，只有四、五樣。這頁給你那份短名單、每一樣要提前多久訂，
            以及其他可以吃早餐時再決定的行程。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "依急迫性排序", "官方票價"].map((t) => (
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
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>東京大部分的東西不需要訂</h2>
          <p className={styles.bodyText}>
            關於東京，最有用的一件事是：真正有時效的景點名單非常短。四、五個場館賣的是指定日期與時段、
            而且真的會賣完的票，其他東西——晴空塔、東京鐵塔、神社、街區、全市最好的免費視野——
            都可以吃早餐時再決定。規劃東京行程，主要就是先把那份短名單釘死。
          </p>
          <p className={styles.bodyText}>
            所以這一頁是依急迫性排序，而不是依名氣。下面的表格說哪些要訂、什麼時候訂；
            後面的段落則連到每一樣的完整攻略，附官方票價與從海外行得通的購票管道。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>先訂還是現場去</span>
          <h2 className={styles.sectionTitle}>哪些要訂、要提前多久</h2>
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

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>高處的視野</span>
          <h2 className={styles.sectionTitle}>展望台</h2>
          <p className={styles.bodyText}>
            <strong>澀谷SKY</strong> 是澀谷十字路口上方的開放式屋頂，也是唯一一個「時段比門票重要」的展望台：
            成人線上預購 {zhPrice(SKY.adult)}、現場 {zhPrice(SKY.atDoor)}，而會賣完的是日落那個時段。詳見我們的{" "}
            <Link href="/zh-tw/guides/attractions/shibuya-sky-tickets" style={linkStyle}>澀谷SKY 門票攻略</Link>。{" "}
            <strong>東京晴空塔</strong>是走高度的選項，350 公尺天望甲板 {zhPrice(TREE.adult)}，
            當天在櫃台買每張要多付 ¥500 的服務費，所以提前線上買單純比較便宜。
          </p>
          <p className={styles.bodyText}>
            在為任何一個付錢之前，也值得知道新宿的<strong>東京都廳</strong>：45 樓、約 202 公尺的展望室，
            入場 {zhPrice(TOCHO.adult)}。開放時間與開放的展望室會變動，去之前請先確認。
            票價與入場費查核日 {CHECKED}。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>數位藝術</span>
          <h2 className={styles.sectionTitle}>teamLab 美術館</h2>
          <p className={styles.bodyText}>
            東京有兩間 teamLab 數位藝術美術館——豐洲的 Planets 與麻布台之丘的無界——
            兩間都是走進去的沉浸式體驗，都採指定時段入場，而且很快賣完。我們的{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-tokyo-tickets" style={linkStyle}>teamLab Planets 門票攻略</Link>{" "}
            比較了兩間、說明哪一間適合你的行程；麻布台之丘那一間的票價與規則在{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-borderless-tickets" style={linkStyle}>teamLab 無界 門票攻略</Link>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>主題樂園</span>
          <h2 className={styles.sectionTitle}>東京迪士尼與哈利波特影城</h2>
          <p className={styles.bodyText}>
            <strong>東京迪士尼</strong>（樂園與海洋）用的是指定日期票，數週前就會賣完，而且門口完全不賣票——
            官網還可能封鎖海外信用卡。我們的{" "}
            <Link href="/zh-tw/guides/attractions/tokyo-disney-tickets" style={linkStyle}>東京迪士尼門票攻略</Link>{" "}
            說明怎麼買以及兩座園區怎麼選。哈利波特迷的話，<strong>華納兄弟哈利波特影城東京</strong>
            在練馬，指定時段、不可重複入場，要預留大約四小時——細節在我們的英文版{" "}
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" style={linkStyle}>影城攻略（英文）</Link>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>體驗</span>
          <h2 className={styles.sectionTitle}>卡丁車、相撲、和服與刀劍</h2>
          <p className={styles.bodyText}>
            動手型的體驗大多可以很晚才訂，只有一個例外。<strong>街道卡丁車</strong>讓你穿著裝扮開上東京的一般道路，
            但它需要國際駕照，而國際駕照必須在你出國前、在自己的國家申請——這點與相撲的賽期（東京只在 1 月、5 月、
            9 月售票）、和服租借、茶道與武士忍者體驗，目前都只有英文版，收在{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>英文版的東京景點攻略</Link>{" "}
            與該分類的各篇裡。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>出城</span>
          <h2 className={styles.sectionTitle}>四種一日遊，四種不同的一天</h2>
          <p className={styles.bodyText}>
            鎌倉是你只剩一個早上可以規劃時該去的——一條 JR 線不到一小時，露天的大佛與長谷寺相隔幾分鐘。
            日光往北兩小時，看 UNESCO 神社與山中瀑布，神社之間的公車是要規劃的部分。
          </p>
          <p className={styles.bodyText}>
            富士山有兩個不同的問題。想去河口湖一帶的觀景點，走的是直達電車；想站在山上的 Subaru Line 五合目，
            那需要巴士團——我們的{" "}
            <Link href="/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>富士山一日遊攻略</Link>{" "}
            把四種行程整理清楚。箱根是溫泉的替代方案，一張周遊券涵蓋整個環線；這兩篇目前是英文版，
            收在{" "}
            <Link href="/guides/attractions#daytrips" style={linkStyle}>英文版的一日遊分類（英文）</Link>。
          </p>
        </section>

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>值得先訂好的東京預訂</span>
          <h2 className={styles.sectionTitle}>四個先放進口袋的東西</h2>
          <p className={styles.bodyText}>
            一張交通通票、大多數人最後都會買的那張展望台門票、一趟把三大景點串起來的導覽，以及富士山的巴士團。
            打開商品頁看你那天的即時價格。
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            {[zhTokyoSubwayTicket, zhSkytreeTicket, zhTokyoSightseeingBusTour, zhFujiHakoneDayTour].map((t) => (
              <a key={t.url} href={t.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                {t.label} →
              </a>
            ))}
          </div>
        </section>

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/zh-tw/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 門票（2026）：票價、預約方式與無界比較" },
            { href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", title: "teamLab 無界 門票（2026）：票價、時段預約與購票管道" },
            { href: "/zh-tw/guides/attractions/tokyo-disney-tickets", title: "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選" },
            { href: "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日遊（東京出發．2026）：行程怎麼選、五合目看什麼" },
            { href: "/zh-tw/guides/transport/tokyo-airport-transfer", title: "成田機場到東京市區交通（2026）：Skyliner、N'EX 與利木津巴士比較" },
            { href: "/zh-tw/guides/esim/best-esim-japan", title: "日本網卡推薦（2026）：eSIM 方案比較與 Klook 日本 eSIM" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />
      </div>
    </>
  );
}
