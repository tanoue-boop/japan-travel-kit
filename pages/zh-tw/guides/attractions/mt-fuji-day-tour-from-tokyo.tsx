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
  zhFujiDayTour,
  zhFujiHakoneBulletTrainTour,
  zhFujiHakoneDayTour,
  zhFujiSubaruLineHakoneBusTour,
} from "../../../../lib/klook-links-zh-tw";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo";
const TITLE = "富士山一日遊（東京出發．2026）：行程怎麼選、五合目看什麼";
const DESC =
  "比較東京出發的富士山一日遊：只跑富士山，還是富士山加箱根；Subaru Line 五合目到底是什麼地方、" +
  "一天要多久、以及從海外怎麼訂。行程內容與英文版同一組資料、同一個查核日。";

// Tour contents and durations are as the Klook listings described them on
// 19 Oct 2026 — the same check the English guide records. No price is quoted
// here or there: Klook answers automated reads of its product pages with 403.
const CHECKED = "2026年10月19日";

const tourRows = [
  {
    tour: "富士山五合目、河口湖、忍野八海＋御殿場",
    covers: "五合目，加上河口湖、湧泉村落與一站 outlet",
    length: "整天，當天晚上回到東京",
    url: zhFujiDayTour.url,
    best: "一天裡的觀光點最多",
  },
  {
    tour: "富士山＋箱根一日遊",
    covers: "五合目、大涌谷火山谷（含纜車下行）、蘆之湖遊船",
    length: "行程標示約 11 小時",
    best: "一天跑兩個目的地",
    url: zhFujiHakoneDayTour.url,
  },
  {
    tour: "富士山Subaru Line五合目、蘆之湖＋箱根拼團巴士",
    covers: "同樣的富士山加箱根組合，拼團巴士版本",
    length: "東京出發，整天",
    best: "巴士座位，費用較低",
    url: zhFujiSubaruLineHakoneBusTour.url,
  },
  {
    tour: "富士山＋箱根（可選新幹線回程）",
    covers: "五合目、大涌谷與蘆之湖，回程可選搭新幹線",
    length: "東京出發，整天",
    best: "回程比較短、比較舒服",
    url: zhFujiHakoneBulletTrainTour.url,
  },
];

const whoFor = [
  {
    title: "只跑富士山的行程，如果…",
    desc: "山本身是重點，而你想在湖邊待久一點。五合目、河口湖與忍野八海都在北側、彼此很近，所以只跑富士山的一天比較從容，是真的有停留，而不是一連串的巴士移動。",
  },
  {
    title: "富士山＋箱根的行程，如果…",
    desc: "你只有一天空檔，想從裡面擠出兩個目的地。合併行程加上大涌谷火山谷、一段纜車與蘆之湖遊船——我們查到的行程標示約 11 小時，是很長但很滿的一天。",
  },
  {
    title: "自己去，如果…",
    desc: "你寧願照自己的節奏走，也不介意轉電車與公車。箱根特別適合這樣——箱根周遊券把整個環線變成一張票。富士山的五合目就比較難，沒有一日遊或租車不好到。",
  },
];

const steps = [
  {
    title: "先決定是只跑富士山，還是富士山加箱根",
    desc: "這是真正的選擇，也決定了你這一天有多長。只跑富士山的行程把時間放在山的北側；合併行程拿掉其中一部分，換成箱根的火山谷與湖上遊船，代價是在巴士上更久。",
  },
  {
    title: "確認你那天的「五合目」到底是什麼",
    desc: `富士Subaru Line五合目是這座山上公路可以到的最高點——我們查到的行程把它寫成海拔 2,300 公尺。它是一個觀景點加一叢店家，不是山頂：富士山的官方登山季在 9 月 10 日結束，上方的登山道冬季封閉。查核日 ${CHECKED}。`,
  },
  {
    title: "接受看不看得到山要看天氣",
    desc: "沒有任何行程能保證你看到山。富士山經常在雲裡，能見度在較涼、較乾燥的月份與一天中較早的時候比較好。業者不管天氣都會出團，所以訂這一天時，要連其他停留點一起算進值不值得。",
  },
  {
    title: "訂一個日期，用看得懂的介面、刷得過的卡",
    desc: "這些是指定日期、座位有限的巴士團，熱門日期先沒。Klook 的介面看得懂、接受海外信用卡——這點很重要，因為好幾家日本業者自己的訂票頁，對這兩件事都不太友善。",
  },
  {
    title: "想清楚你怎麼到集合地點",
    desc: "東京出發的團大多清晨從新宿或東京車站附近出發。先確認是哪一邊，並把當天第一班地鐵或 JR 的時間排進去——錯過巴士出發是補不回來的。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "東京出發的富士山一日遊值得嗎？",
    a: "對大多數只有一天空檔的旅客來說，值得——主要是因為替代方案比看起來難。富士Subaru Line五合目搭電車到不了，所以自己去就要轉公車或租車，而山周邊的景點又很分散。巴士團把這些收攏成一次預訂。要注意的是天氣：山經常在雲裡，沒有行程能保證你看到它。",
  },
  {
    q: "富士Subaru Line五合目是什麼？",
    a: `它是富士山上公路可以到達的最高點，也是幾乎每一個東京出發的一日遊都會停的地方——我們查到的 Klook 行程把它寫成海拔 2,300 公尺。它是一個有店家與餐廳的觀景點，不是山頂。富士山的官方登山季在 9 月 10 日結束，五合目以上的登山道冬季封閉，所以一日遊是去山腰，不是去登頂。查核日 ${CHECKED}。`,
  },
  {
    q: "東京出發的富士山一日遊要多久？",
    a: `請預留一整天。我們查到的富士山加箱根合併行程標示約 11 小時，只跑富士山的行程也是當天晚上回到東京。出發時間是清晨，從東京市中心。如果你的行程很緊，一日遊是整天都沒了——不是半天的小旅行。行程時間依 ${CHECKED} 的標示。`,
  },
  {
    q: "該選只跑富士山，還是富士山加箱根？",
    a: "只跑富士山的行程停在山的北側，通常會去河口湖與湧泉村落忍野八海，這樣的一天沒那麼趕，每個點都真的有時間。富士山加箱根的行程多了大涌谷火山谷、一段纜車與蘆之湖遊船，但一天更長，而且更多時間在移動。如果這是你唯一的空檔日，選合併行程；如果你寧願看得少但看得仔細，選只跑富士山。",
  },
  {
    q: "下雨或多雲的話，行程中看得到富士山嗎？",
    a: "不太能指望。富士山自己造天氣，相當多的時間都在雲裡，在較暖、較潮濕的月份尤其明顯。能見度一般在一年中較涼、較乾燥的那段時間與一天中較早的時候比較好。不論天氣行程都會出團，所以合理的做法是：挑一個就算沒看到山、其他停留點（湖、火山谷、遊船）你也願意去的行程。",
  },
  {
    q: "可以不參加一日遊、自己去富士山嗎？",
    a: "你可以自己搭高速巴士或電車到河口湖一帶，從那裡在季節內有公車開上 Subaru Line。這需要規劃，班次不密，而且回程算錯時間可能會被困住。箱根是兩者中比較容易自己跑的，因為箱根周遊券一張票就涵蓋了電車、纜索鐵道、空中纜車、巴士與遊船的整個環線。",
  },
  {
    q: "富士山一日遊需要 JR Pass 嗎？",
    a: "不需要。東京出發的一日遊走公路，車費含在行程價格裡——鐵路周遊券在這段路上買不到任何東西。唯一的例外是提供新幹線回程的行程，周遊券可能涵蓋那一段。如果你在考慮整趟旅程要不要買鐵路周遊券，我們的英文版 JR Pass 攻略算了損益平衡點。",
  },
  {
    q: "東京的富士山一日遊從哪裡出發？",
    a: "大多清晨從新宿或東京車站一帶出發；確切的集合地點寫在你訂的那個行程頁上。訂的時候就確認，並把當天第一段行程排在它前面，因為巴士不會等人。如果你的集合點在東京地下鐵或都營線上，東京地鐵通票涵蓋這兩家，但不含 JR。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "富士山一日遊（東京出發）" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhMtFujiDayTourPage({ updated }: { updated: PageUpdated }) {
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
            富士山一日遊（東京出發．2026）：<br />行程怎麼選、五合目看什麼
          </h1>
          <p className={styles.heroSubtitle}>
            每一個行程都會停 Subaru Line 五合目。差別在於這一天剩下的時間是給富士山還是箱根——
            以及你願意在巴士上坐多久。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "只跑富士山 vs 富士山＋箱根", "五合目是什麼"].map((t) => (
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
                <p className={styles.verdictStatLabel}>一天長度</p>
                <p className={styles.verdictStatValue}>最長約 11 小時</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>主要停留</p>
                <p className={styles.verdictStatValue}>Subaru Line 五合目</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>出發</p>
                <p className={styles.verdictStatValue}>清晨，東京市中心</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>看得到富士山？</p>
                <p className={styles.verdictStatValue}>永遠不保證</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>如果這是你唯一的空檔日，選富士山加箱根的行程，一天拿到兩個目的地。
              如果你寧願看得少但看得仔細，選含河口湖與忍野八海的只跑富士山行程。不論哪一種，這一天大約 11 小時，
              而山可能在雲裡——請挑一個你就算沒看到山也會滿意其他停留點的行程。
            </p>
            <a href={zhFujiHakoneDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              在 Klook 查看富士山一日遊 →
            </a>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>為什麼幾乎每個人都選一日遊</h2>
          <p className={styles.bodyText}>
            富士山距離東京約兩小時車程，但在旅客真正想站的那個位置，電車實際上到不了。五合目沒有車站：
            富士Subaru Line是一條收費公路，自己上去就得從河口湖一帶轉公車，而那個時刻表不會原諒你晚出門。
          </p>
          <p className={styles.bodyText}>
            這就是富士山周邊一日遊市場這麼大的原因，也是這些行程第一眼看起來這麼像的原因。它們全都停五合目。
            差別在於剩下那六個小時做什麼——而那才是值得拿來做選擇的事。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>東京出發的四種富士山一日遊</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["行程", "內容", "長度", "最適合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider}>
                        <a href={row.url} target="_blank" rel={KLOOK_REL} className={styles.tdLink}>
                          {row.tour}
                        </a>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            內容與時間依 {CHECKED} Klook 行程頁上的描述。這裡不報價格：Klook 封鎖對產品頁的自動讀取，
            所以沒有任何一個數字是我們能查核的——請打開行程頁看你那天的即時價格。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一種一天</span>
          <h2 className={styles.sectionTitle}>哪一種安排適合你？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>富士山一日遊怎麼訂</h2>
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
            抵達東京當天的機場交通，請看我們的{" "}
            <Link href="/zh-tw/guides/transport/tokyo-airport-transfer">成田機場到東京市區交通攻略</Link>
            ；出門前先把網路準備好，請看{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan">日本網卡推薦</Link>。
          </p>
        </section>

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>上面比較的四個行程</span>
          <h2 className={styles.sectionTitle}>直接打開行程看價格</h2>
          <p className={styles.bodyText}>
            四個行程都從東京出發、都停 Subaru Line 五合目。打開行程頁看你那天的價格與出發地點。
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            {[zhFujiHakoneDayTour, zhFujiDayTour, zhFujiSubaruLineHakoneBusTour, zhFujiHakoneBulletTrainTour].map((t) => (
              <a key={t.url} href={t.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                {t.label} →
              </a>
            ))}
          </div>
        </section>

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/things-to-do-tokyo", title: "東京自由行景點（2026）：哪些要先訂票、哪些可以現場去" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/zh-tw/guides/transport/tokyo-airport-transfer", title: "成田機場到東京市區交通（2026）：Skyliner、N'EX 與利木津巴士比較" },
            { href: "/zh-tw/guides/esim/best-esim-japan", title: "日本網卡推薦（2026）：eSIM 方案比較與 Klook 日本 eSIM" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>一天空檔，兩個目的地</h2>
            <p className={styles.ctaBannerDesc}>
              富士山加箱根的行程把 Subaru Line 五合目和大涌谷、蘆之湖遊船排在同一天。
              Klook 的介面看得懂，也接受海外信用卡。
            </p>
            <a href={zhFujiHakoneDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              在 Klook 查看富士山一日遊 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
