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
import { zhShibuyaSky } from "../../../../lib/klook-links-zh-tw";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhDateLabel, zhMonthLabel, zhPrice } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions/shibuya-sky-tickets";
const TITLE = "澀谷SKY 門票（2026）：票價、最佳時段與預約方式";
const DESC =
  "澀谷SKY 門票 2026：官方票價線上預購成人 ¥2,500、現場 ¥3,000，哪個時段最值得去（日落場最快售完），以及海外信用卡刷不過時怎麼訂。";

// Every figure on this page comes from lib/attraction-prices.ts — the same record
// the English guide and the ticket price table read. Nothing is re-checked for the
// Chinese edition and nothing new is added: same numbers, same source, same date.
const P = PRICES.shibuyaSky;
const CHECKED = zhDateLabel(P.checked);
// zhPrice moves the English qualifier in these records ("from …", "Free") into
// Chinese without touching the figure — see lib/i18n.ts.
const ADULT = zhPrice(P.adult);
const AT_DOOR = zhPrice(P.atDoor);

const priceRows = [
  { ticket: "成人（線上預購）", price: ADULT },
  { ticket: "成人（現場購票）", price: AT_DOOR },
  { ticket: "兒童（未滿5歲）", price: zhPrice(P.child) },
];

const deckRows = [
  {
    deck: "澀谷SKY（SHIBUYA SKY）",
    height: "約 229 公尺（屋頂）",
    highlight: "澀谷十字路口正上方的開放式屋頂，東京最有代表性的一張照片",
    price: "約 ¥2,500 起（成人線上預購）",
    area: "澀谷站",
  },
  {
    deck: "東京晴空塔",
    height: "350 公尺與 450 公尺展望台（塔高 634 公尺）",
    highlight: "全市最高的視野、玻璃地板區；天氣好時看得到富士山",
    price: "約 ¥1,800（350 公尺）；套票約 ¥3,100",
    area: "押上，淺草旁",
  },
  {
    deck: "東京鐵塔",
    height: "約 150 公尺與 250 公尺展望台（塔高 332 公尺）",
    highlight: "1958 年的復古地標；要上更高一層得買 Top Deck Tour",
    price: "約 ¥3,300（Top Deck Tour）",
    area: "芝公園／赤羽橋",
  },
  {
    deck: "東京都廳展望室",
    height: "約 202 公尺",
    highlight: "免費入場，不用門票就有完整的市景",
    price: "免費",
    area: "新宿",
  },
];

const whoFor = [
  {
    title: "想拍日落就選這個時段",
    desc: "日落場次是最美也最搶手的，通常最先賣完。建議挑日落前 30～60 分鐘入場，一次看完白天、黃金時刻與城市亮燈。",
  },
  {
    title: "行程不確定就選白天",
    desc: "白天場次比較好訂，常常臨近日期還有位子，天氣晴朗時甚至能看到富士山。如果行程還會變動，這是最有彈性的選擇。",
  },
  {
    title: "只想看夜景就選晚上",
    desc: "夜間場看的是整片霓虹燈海，看不到地平線。這也是最容易臨時訂到的時段，日落場售完時的備案。",
  },
];

const steps = [
  {
    title: "先決定時段，日落是重點",
    desc: "日落場一次給你白天、黃金時刻與夜景，所以也最先消失。要日落場就把訂票當成有時效的事來處理。",
  },
  {
    title: "約兩週前、日本時間午夜開賣",
    desc: "門票大約在入場日兩週前釋出，新日期通常在日本時間 00:00 開賣。想搶日落場，就在你的日期一開賣時登入下單。",
  },
  {
    title: "持海外信用卡建議走售票平台",
    desc: "自 2024 年 7 月起，澀谷SKY 官網對許多海外發行的信用卡刷不過。Klook 可以用海外卡結帳、介面看得懂，並提供入場前 24 小時內免費取消——東京天氣說變就變，這點很有用。",
  },
  {
    title: "日落場請提前 30～60 分鐘到",
    desc: "留時間過入口、把隨身物品寄進置物櫃（屋頂是開放式的，風很大），在光線轉變前先站好位置。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "澀谷SKY 門票多少錢？",
    a: `線上預購成人票 ${ADULT}，當天在現場窗口購買 ${AT_DOOR}。未滿 5 歲免費入場，另有兒童與敬老的優惠票種。線上買不只比較便宜，也比較安全——熱門時段（尤其是日落場）當天就沒票了。以上票價讀自澀谷SKY官方網站，查核日 ${CHECKED}。`,
  },
  {
    q: "澀谷SKY 什麼時候去最好？",
    a: "日落場最熱門也最美——一次看到白天、黃金時刻與夜景。也正因為如此，日落場是最快售完的。建議在日落前 30～60 分鐘入場。日落場沒票的話，晴朗的白天場看得到富士山，夜間場看的是整片燈海，而且最容易臨時訂到。",
  },
  {
    q: "澀谷SKY 要多久前訂票？",
    a: "門票通常在入場日約兩週前釋出，新日期大約在日本時間 00:00（午夜）開賣。日落場請在你的日期一開賣就下單——旺季時幾分鐘內就會賣完。白天與夜間場比較從容，但還是建議提前訂。",
  },
  {
    q: "可以用海外信用卡買澀谷SKY 門票嗎？",
    a: "在澀谷SKY 官網上，常常不行——自 2024 年 7 月起，官網對許多海外發行的信用卡刷不過。可靠的做法是透過 Klook 這類售票平台預訂：可以用海外卡結帳、拿到電子票，並且入場前 24 小時內可免費取消。",
  },
  {
    q: "澀谷SKY 有多高？會看到什麼？",
    a: "澀谷SKY 是位於澀谷上方約 229 公尺的屋頂展望台，分為開放式屋頂與室內區域。從上面可以 360 度看到澀谷十字路口、東京天際線，天氣清朗時還能看到富士山。重點是那個開放式屋頂，所以請穿擋風的衣服，出發前先看天氣。",
  },
  {
    q: "澀谷SKY 和晴空塔該選哪一個？",
    a: "澀谷SKY 賣的是體驗與照片：澀谷十字路口正上方約 229 公尺的開放式屋頂，日落時最美，是全市最有辨識度的一個視角。東京晴空塔賣的是高度與視距：350 公尺與 450 公尺兩層展望台、玻璃地板區，天氣好時看得很遠，包括富士山。想拍十字路口與氛圍選澀谷SKY；想要最高最廣的全景選晴空塔。",
  },
  {
    q: "東京有免費的展望台嗎？",
    a: "有。新宿的東京都廳在約 202 公尺處設有展望室，免費入場。這是東京最值得的免錢市景，如果你想把預算留給澀谷SKY 或其他體驗，是個聰明的選擇。開放時間與開放的展望室會變動，去之前請先確認。",
  },
  {
    q: "從澀谷SKY 看得到富士山嗎？",
    a: "天氣清朗時看得到——空氣通透的日子從澀谷SKY 可以看見富士山，不過機會最高的還是高度更高的東京晴空塔。能見度看天氣，通常在較涼、較乾燥的月份與清晨最好，任何一天都不保證。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "澀谷SKY 門票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhShibuyaSkyTicketsPage({ updated }: { updated: PageUpdated }) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            澀谷SKY 門票（2026）：<br />票價、最佳時段與預約方式
          </h1>
          <p className={styles.heroSubtitle}>
            東京最好的屋頂視角——澀谷十字路口上方 229 公尺。門票多少錢、什麼時候去、
            以及怎麼在日落場賣完之前訂到。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "日落場搶票重點", "與晴空塔、東京鐵塔比較"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>票價（線上）</p>
                <p className={styles.verdictStatValue}>成人 {ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最佳時段</p>
                <p className={styles.verdictStatValue}>日落場（最快售完）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>何時訂</p>
                <p className={styles.verdictStatValue}>約兩週前、日本時間午夜</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>海外信用卡？</p>
                <p className={styles.verdictStatValue}>建議走售票平台</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>線上買（{ADULT}，比現場便宜）並盡量挑日落場——那是最先賣完的時段。
              如果你的卡是海外發行的，走 Klook 比較穩：可以用海外卡結帳，入場前 24 小時內還能免費取消。
            </p>
            <KlookLink href={zhShibuyaSky.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看澀谷SKY 門票 →
            </KlookLink>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>這是什麼</span>
          <h2 className={styles.sectionTitle}>澀谷SKY 是什麼？</h2>
          <p className={styles.bodyText}>
            澀谷SKY 是澀谷 Scramble Square 頂樓的展望台，位在全世界最繁忙的路口之一上方約 229 公尺處。
            它由開放式屋頂與室內區域組成，可以 360 度看到澀谷十字路口、東京天際線，天氣好的日子還有富士山。
          </p>
          <p className={styles.bodyText}>
            它已經是東京最常被拍的地點之一——這既是它的賣點，也是它的麻煩：好時段會賣完，而訂票系統對海外旅客
            有幾個小陷阱。把這兩件事處理好，它就是東京最划算的體驗之一。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>澀谷SKY 門票價格</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "價格"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            以上票價讀自澀谷SKY 官方網站，查核日 {CHECKED}；票價可能調整，結帳前請再確認。
            線上預購（{ADULT}）既比現場（{AT_DOOR}）便宜，也是唯一能確保日落場的方式。同樣的官方票價，連同我們查核過的
            其他日本景點，都整理在{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景點門票價格總表（英文）
            </Link>
            ，每一列都附上查核日期。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>最佳時段</span>
          <h2 className={styles.sectionTitle}>該挑哪個時段？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>澀谷SKY 與東京其他展望台</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            澀谷SKY 贏在那張十字路口的照片，但它不是東京最高的展望台，也不是最便宜的。四個主要選項如下：
            要高度與富士山視野選晴空塔，要復古地標選東京鐵塔，想免費看全景選東京都廳。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["展望台", "高度", "特色", "票價（約）", "區域／最近車站"].map((h) => (
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
            高度與票價為 2026 年的概估值，可能調整，結帳前請再確認。晴空塔的部分：350 公尺天望甲板約 ¥1,800，
            加購 450 公尺天望迴廊約再 ¥1,400，套票約 ¥3,100。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>澀谷SKY 怎麼訂</h2>
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

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 門票（2026）：票價、預約方式與無界比較" },
            { href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", title: "teamLab 無界 門票（2026）：票價、時段預約與購票管道" },
            { href: "/zh-tw/guides/attractions/tokyo-disney-tickets", title: "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選" },
            { href: "/zh-tw/guides/attractions/things-to-do-tokyo", title: "東京自由行景點（2026）：哪些要先訂票、哪些可以現場去" },
            { href: "/zh-tw/guides/transport/tokyo-airport-transfer", title: "成田機場到東京市區交通（2026）：Skyliner、N'EX 與利木津巴士比較" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>搶下澀谷的日落</h2>
            <p className={styles.ctaBannerDesc}>
              線上買比現場便宜，也是鎖住日落場的唯一方式。Klook 可以用海外信用卡結帳，入場前 24 小時內免費取消——
              東京天氣變了也不心痛。
            </p>
            <KlookLink href={zhShibuyaSky.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看澀谷SKY 門票 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
