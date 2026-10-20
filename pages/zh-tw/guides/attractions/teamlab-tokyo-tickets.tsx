import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import { zhSeoTags } from "../../../../components/ZhSeo";
import {
  KLOOK_REL,
  ZhBreadcrumb,
  ZhDisclosure,
  ZhFaqList,
  ZhRelated,
  zhBreadcrumbJsonLd,
  zhFaqJsonLd,
  type ZhCrumb,
  type ZhFaqItem,
} from "../../../../components/ZhChrome";
import { zhFujiHakoneDayTour, zhTeamlabPlanets } from "../../../../lib/klook-links-zh-tw";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhDateLabel, zhMonthLabel, zhPrice } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "teamLab Planets 門票（2026）：票價、預約方式與無界比較";
const DESC =
  "teamLab Planets（豐洲）門票 2026：官方票價成人 ¥3,800 起、30 分鐘入場時段怎麼運作、" +
  "赤腳涉水區該穿什麼，以及 Planets 和麻布台之丘的無界差在哪。數字與英文版同一組資料、同一個查核日。";

// Same records the English guide and the ticket price table read, from
// lib/attraction-prices.ts. No figure here is new to the Chinese edition.
const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const CHECKED = zhDateLabel(P.checked);
// "from ¥3,800" -> "¥3,800 起": same figure, Chinese qualifier. See lib/i18n.ts.
const ADULT = zhPrice(P.adult);
const CHILD = zhPrice(P.child);
const B_ADULT = zhPrice(B.adult);

const priceRows = [
  { ticket: "成人", price: ADULT, note: "票價依日期與時段變動" },
  { ticket: "國中、高中生", price: "¥2,800", note: "請攜帶學生證" },
  { ticket: "兒童（4～12 歲）", price: CHILD, note: "未滿 4 歲不需購票" },
  { ticket: "3 歲以下", price: "免費", note: "記得帶替換衣物——涉水區大家都會濕" },
  { ticket: "身心障礙人士", price: "¥1,900 起", note: "請攜帶身障證明" },
  { ticket: "Premium Pass", price: "¥12,000", note: "優先入場方案，4 歲以上適用" },
];

const compareRows = [
  { factor: "位置", planets: "豐洲（江東區）", borderless: "麻布台之丘（港區）" },
  { factor: "概念", planets: "沉浸式、赤腳、走進水裡", borderless: "沒有地圖的迷宮，50 多件作品" },
  { factor: "適合", planets: "親子、第一次來、想要身體感受", borderless: "藝術愛好者、慢慢逛、攝影" },
  { factor: "需要時間", planets: "含赤腳準備約 1.5～2 小時", borderless: "約 2 小時，想久留會更長" },
  { factor: "成人票（起）", planets: ADULT, borderless: B_ADULT },
  { factor: "營業時間", planets: "公告 08:00–22:00，依日期變動", borderless: "公告 08:30–21:00，依日期變動" },
  { factor: "入場", planets: "30 分鐘入場時段", borderless: "指定時段，或不指定時間的 Flexible Pass" },
  {
    factor: "需要知道",
    planets: "預計營運到 2027 年底；赤腳與涉水區",
    borderless: "現場購票成人多 ¥200",
  },
];

const whoFor = [
  {
    title: "選 Planets 的話…",
    desc: "你帶著小孩、想要動手動腳的身體體驗，而且不介意腳濕——你會赤腳走過及成人膝蓋高的水區。這是兩間裡比較好玩、感受比較直接的一間，也是帶孩子比較容易享受的一間。",
  },
  {
    title: "選無界的話…",
    desc: "你想沉進藝術裡，而不是走過它。麻布台之丘的無界沒有固定路線——作品在房間之間移動，你在 50 多個空間裡自由遊走。它回報的是時間與耐心，對成人來說也更好拍。",
  },
  {
    title: "兩間都去，如果…",
    desc: "你有兩個空的半天，而且是認真的 teamLab 迷。它們在城市的不同區域，是真正不同的體驗，所以兩間都去不會重複——只要把日期分開，並各自提前訂好指定時段。",
  },
];

const steps = [
  {
    title: "先選日期，再看那天的價格",
    desc: "Planets 的成人票 ¥3,800 起，但實際金額取決於你選的日期與時段。平日早上最便宜也最清閒。",
  },
  {
    title: "提前 2～3 週訂 30 分鐘入場時段",
    desc: "你的票對應一個 30 分鐘的入場區間，例如 10:00–10:30。熱門時段經常在 2～3 週前就賣完，而且美術館現場沒有臨櫃售票，所以提前訂是計畫本身，不是備案。",
  },
  {
    title: "向 teamLab 或官方售票夥伴購買",
    desc: "Planets 官方售票網站直接賣電子票；Klook 是 teamLab 的官方售票合作夥伴，可以用自己的幣別、看得懂的介面結帳，對非日本發行的信用卡接受度高。兩邊都是手機上的 QR Code。",
  },
  {
    title: "穿對衣服，在時段內抵達",
    desc: "請穿短褲，或可以捲到膝蓋以上的長褲——部分作品是水空間，水深可達成人膝蓋高。如果你穿裙子或寬管褲，現場有 XS 到 6L 的免費短褲可借，因為部分地板是鏡面的。忙碌時段入場準備可能要 30～60 分鐘，請在時段一開始就到。",
  },
];

const faqItems: ZhFaqItem[] = [
  {
    q: "2026 年 teamLab Planets 門票多少錢？",
    a: `依 teamLab Planets 官方售票網站、查核日 ${CHECKED}：成人票 ${ADULT}，國中與高中生 ¥2,800，4～12 歲兒童 ${CHILD}，3 歲以下免費。身心障礙人士 ¥1,900 起，另有 ¥12,000 的 Premium Pass（4 歲以上適用）。成人票會依日期與時段變動，付款前請確認你自己時段的金額。優惠票需要出示證明——請帶學生證、護照或身障證明。`,
  },
  {
    q: "teamLab Planets 需要提前訂票嗎？",
    a: "需要，而且比東京多數景點更需要。Planets 採 30 分鐘入場時段，熱門時間會在 2～3 週前賣完，週末與連假尤其明顯。官方說明頁寫得很清楚：不要指望在美術館現場買票——門票是線上提前販售，而不是臨櫃販售。出發前就把日期與時段訂好。",
  },
  {
    q: "去 teamLab Planets 該穿什麼？",
    a: "短褲，或可以捲到膝蓋以上的長褲。部分作品是水空間，水深可達成人膝蓋高，而且整間美術館都是赤腳體驗——鞋子、襪子與褲襪會在入口的置物間脫掉。部分地板是鏡面的，所以裙子與寬管褲不是好主意；現場有 XS 到 6L 的免費短褲可借。帶小孩的話請準備替換衣物，另外嬰兒車不能進場（有嬰兒車停放區，背巾可以）。",
  },
  {
    q: "teamLab Planets 要逛多久？",
    a: "整體預留大約 1.5 到 2 小時。作品本身以不趕的步調看大約需要一到一個半小時，但你還要算上置物間、赤腳與事後擦乾的時間——而且在忙碌時段，光是入場準備就可能要 30～60 分鐘。結束後不要緊接著排其他行程。",
  },
  {
    q: "teamLab Planets 的營業時間？什麼時候休館？",
    a: `營業時間依日期而不同。我們在 ${CHECKED} 查看官方網站時，Planets 公告的時間是 08:00–22:00，最後入場為閉館前一小時。2026 年年底的休館日包含 11 月 5 日（週四）與 12 月 3 日（週四）。因為行事曆每個月都在變，訂時段之前請用你自己的日期查官方行事曆。`,
  },
  {
    q: "錯過 teamLab Planets 的時段怎麼辦？",
    a: "不一定就進不去。官方說明頁寫的是：票面時間是參考值，如果你遲到，仍可在當天營業時間內入場——前提是不超過閉館前一小時的最後入場。不過你可能會比持有該時段票的人等更久，所以還是把你的時段當成計畫。",
  },
  {
    q: "teamLab Planets 在哪裡？怎麼去？",
    a: "位在東京東側水岸的豐洲。官方交通資訊寫的是：百合海鷗線「新豐洲站」步行 1 分鐘，「市場前站」與豐洲市場步行 5 分鐘，東京地下鐵有樂町線「豐洲站」步行 10 分鐘。從東京車站搭計程車約 15 分鐘，從羽田機場走高速公路也約 15 分鐘。鐵路段用 Suica 或 PASMO 等 IC 卡就夠了。",
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

const trail: ZhCrumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "teamLab Planets 門票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTeamLabPlanetsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = zhMonthLabel(updated.iso);

  return (
    <>
      <Head>
        {zhSeoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: zhFaqJsonLd(faqItems) }} />
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: zhBreadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <ZhBreadcrumb trail={trail} />

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
        <ZhDisclosure />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人票</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
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
              <strong>結論：</strong>teamLab Planets 成人票 {ADULT}，高中生 ¥2,800，4～12 歲 {CHILD}。
              你的票對應一個 30 分鐘入場區間，而且現場沒有臨櫃售票，所以週末請提前 2～3 週訂。
              你會赤腳入場，部分作品是水空間、水深可達成人膝蓋高——請穿短褲或可捲起的長褲
              （現場有 XS–6L 免費短褲可借）。預留 1.5～2 小時，從新豐洲站步行 1 分鐘就到。
              想找麻布台之丘那一間？請看我們的{" "}
              <Link href="/zh-tw/guides/attractions/teamlab-borderless-tickets">teamLab 無界門票攻略</Link>。
            </p>
            <a href={zhTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看 teamLab Planets 門票 →
            </a>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              本頁的票價、營業時間與休館日讀自 teamLab 官方網站，查核日 {CHECKED}。Planets 票價依日期與時段變動、
              行事曆也會改，請在結帳時確認你自己日期的兩項資訊。
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 門票價格</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            會動的是成人票：{ADULT}，你看到的金額取決於選的日期與時段。學生與兒童票是固定價，
            未滿 4 歲完全不需要票。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "票價（起）", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            讀自 teamLab Planets 官方售票網站，查核日 {CHECKED}。優惠票需要出示證明文件，請帶學生證、護照或身障證明。
            門票以手機 QR Code 形式發送。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>訂票前</span>
          <h2 className={styles.sectionTitle}>營業時間、入場時段與穿著</h2>
          <p className={styles.bodyText}>
            Planets 對你的要求比一般美術館多：要赤腳進場，而且路線的一部分是水。以下是我們在 {CHECKED}
            查看官方網站時的內容：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>營業時間：</strong>公告為 08:00–22:00，依日期變動，最後入場為閉館前一小時。</li>
            <li><strong>休館日：</strong>不定期，2026 年 11 月 5 日（週四）與 12 月 3 日（週四）都在內。</li>
            <li><strong>入場：</strong>你的票對應一個 30 分鐘入場區間，例如 10:00–10:30。忙碌時段入場準備可能要 30～60 分鐘。</li>
            <li><strong>遲到了？</strong>官方說明頁寫的是：票面時間是參考值，當天營業時間內仍可入場，但不得超過最後入場時間。</li>
            <li><strong>赤腳：</strong>鞋子、襪子與褲襪在置物間脫掉，全程赤腳體驗。</li>
            <li><strong>水：</strong>部分作品是水空間，水深可達成人膝蓋高。請穿短褲或可以捲起的長褲。</li>
            <li><strong>鏡面地板：</strong>裙子與寬管褲會有問題。現場有 XS 到 6L 的免費短褲可借。</li>
            <li><strong>帶小孩：</strong>請準備替換衣物。嬰兒車不能進場——有嬰兒車停放區，背巾可以。</li>
            <li><strong>行李：</strong>超過約 23 × 34 × 37 公分的包包要放到指定寄放區，不是置物櫃。</li>
          </ul>
          <p className={styles.bodyText}>
            營業時間與休館日每個月都在變，所以請先用你自己的旅行日期打開官方行事曆確認，再決定時段。
            平日早上最便宜也最清閒。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>你買到的是什麼</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 究竟是什麼</h2>
          <p className={styles.bodyText}>
            teamLab 是東京的藝術團體，以「走進去」而不是「看著」的大型數位裝置著名。豐洲的 Planets 是身體感受最強的那一間：
            你赤腳、涉水，走過會對你的存在產生反應的作品——鏡面無限空間、漂浮光球的大廳、活的花園。
            它是東京兩間 teamLab 當中帶孩子比較容易享受的一間，也是如果你從未見過這種規模的數位藝術、衝擊最大的一間。
          </p>
          <p className={styles.bodyText}>
            它也很擁擠：teamLab 公布 2025 年參觀人次超過 250 萬。美術館預計營運到 2027 年底，並公布了新增十件以上作品的
            擴建計畫——所以如果你已經去過，下次也不會是同一趟。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 門票怎麼訂</h2>
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
            決定好要訂了嗎？{" "}
            <a href={zhTeamlabPlanets.url} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看 Planets 的時段與價格 →
            </a>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>並排比較</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs 無界</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            東京有兩間 teamLab 美術館，旅客經常訂錯。它們是城市不同區域的兩個獨立場館、門票分開：
            豐洲的 <strong>Planets</strong> 是赤腳走進水裡的那一間；麻布台之丘的 <strong>無界</strong>
            是 50 多件作品在房間之間移動的無地圖迷宮。無界有自己的票價、時間與訂票規則，我們寫在{" "}
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
            票價與營業時間讀自 teamLab 官方網站，查核日 {CHECKED}。兩間的成人票都依日期與時段定價、行事曆也都會變動，
            請確認你自己的日期。「需要時間」是我們的行程建議，不是官方數字。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一間適合你</span>
          <h2 className={styles.sectionTitle}>該選哪一間 teamLab？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
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
            <li><strong>新豐洲站</strong>（百合海鷗線）——步行 1 分鐘，最好走的路線。</li>
            <li><strong>市場前站</strong>／豐洲市場——步行 5 分鐘。</li>
            <li><strong>豐洲站</strong>（東京地下鐵有樂町線）——步行 10 分鐘，LaLaport 豐洲也是。</li>
            <li>從東京車站搭計程車約 15 分鐘，從羽田機場走高速公路約 15 分鐘。</li>
          </ul>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>同一天的其他安排</span>
          <h2 className={styles.sectionTitle}>Planets 只佔一小時，剩下的半天呢</h2>
          <p className={styles.bodyText}>
            Planets 在館內大約一小時，所以通常會和別的行程共用一天。如果你東京的行程還有一整天沒排，
            富士山與箱根的一日遊從東京出發、當天晚上回來，而且和門票在同一個 Klook 帳號裡結帳——
            我們的{" "}
            <Link href="/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo">富士山一日遊攻略</Link>
            {" "}比較了四種行程。
          </p>
          <a href={zhFujiHakoneDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta} style={{ marginTop: "0.5rem", display: "inline-block" }}>
            查看{zhFujiHakoneDayTour.label} →
          </a>
        </section>

        <ZhFaqList items={faqItems} />

        <ZhRelated
          items={[
            { href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", title: "teamLab 無界 門票（2026）：票價、時段預約與購票管道" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/zh-tw/guides/attractions/tokyo-disney-tickets", title: "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選" },
            { href: "/zh-tw/guides/attractions/things-to-do-tokyo", title: "東京自由行景點（2026）：哪些要先訂票、哪些可以現場去" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>準備訂 teamLab Planets 了嗎？</h2>
            <p className={styles.ctaBannerDesc}>
              入場以 30 分鐘為一段，好的時段 2～3 週前就會沒有。Klook 是 teamLab 的官方售票合作夥伴，
              可以用自己的幣別結帳，電子票直接存在手機裡。
            </p>
            <a href={zhTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看 teamLab Planets 門票 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
