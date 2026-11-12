import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  hanedaLimousineBus,
  jigokudaniStayAreas,
  jigokudaniZenkojiPrivateDayTrip,
  jigokudaniZenkojiSukiyakiTour,
  jrEastPass,
  klookEsim,
  naritaExpressRoundTripUrl,
  nozawaSnowMonkeyZenkojiTour,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import {
  snowMonkeySukiyakiTourTokyo,
  snowMonkeysZenkojiSakeNaganoTour,
} from "../../../../lib/klook-links-winter-honshu";
import { seoTags } from "../../../../components/IntlSeo";
import {
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
} from "../../../../components/IntlChrome";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English guide (pages/guides/attractions/jigokudani-snow-monkey-tour.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/jigokudani-snow-monkey-tour";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "地獄谷野猿公苑" }];

const CHECKED_ISO = "2026-11-06";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);

const factRows = [
  { item: "12 月 1 日起門票，成人（18 歲以上）", value: "現場 ¥1,000，網路票 ¥880", note: "11 月 30 日前 ¥800。20 人以上團體 ¥840，網路票 ¥740" },
  { item: "12 月 1 日起門票，兒童（小學到高中）", value: "現場 ¥500，網路票 ¥440", note: "11 月 30 日前 ¥400。未滿 6 歲由監護人陪同免費；團體 ¥420，網路票 ¥380" },
  { item: "開放時間，11 月至 3 月", value: "9:00–16:00", note: "請於閉園前 30 分鐘抵達" },
  { item: "開放時間，4 月至 10 月", value: "8:30–17:00", note: "" },
  { item: "休園日", value: "無固定休園日", note: "可能因天氣、猴子的行為或天災臨時休園" },
  { item: "網路票", value: "12 月至 4 月優先入園", note: "線上購買並指定日期；12 月 1 日起比現場便宜" },
  { item: "海拔", value: "850 m", note: "冬季最低溫 −10°C，積雪超過 1 公尺" },
];

const routeRows = [
  {
    leg: "東京 → 長野",
    how: "北陸新幹線（Kagayaki、Hakutaka 或 Asama）",
    time: "最快 79 分鐘",
    notes: "JR EAST PASS 可搭。票價不列於此，請見下方說明",
  },
  {
    leg: "長野 → 湯田中",
    how: "長野電鐵特急",
    time: "38 分鐘",
    notes: "私鐵，JR 周遊券不適用",
  },
  {
    leg: "湯田中 → Snow Monkey Park 站牌",
    how: "路線巴士",
    time: "15 分鐘",
    notes: "包含在長電的 SNOW MONKEY PASS（電車版）內",
  },
  {
    leg: "長野 → Snow Monkey Park 站牌（替代路線）",
    how: "長野站東口的急行巴士",
    time: "41 分鐘",
    notes: "取代電車與路線巴士。長電也販售巴士加門票的票券",
  },
  {
    leg: "Snow Monkey Park 站牌 → 公苑",
    how: "步行，走未鋪設路面的步道",
    time: "約 35 分鐘",
    notes: "冬季有雪和冰；輪椅與推車無法通行",
  },
  {
    leg: "上林溫泉停車場 → 公苑",
    how: "步行，遊步道（約 2 公里）",
    time: "約 30 分鐘",
    notes: "公苑的免費停車場。大致平坦，部分路段有坡",
  },
  {
    leg: "地獄谷停車場 → 公苑",
    how: "步行",
    time: "約 15 分鐘",
    notes: "每車 ¥500，但從澀溫泉上來的林道冬季封閉",
  },
];

const compareRows = [
  {
    aspect: "交通方式",
    diy: "搭新幹線到長野（最快 79 分鐘），再轉電車和巴士或急行巴士，最後步行",
    tour: "東京出發的巴士團，或自己搭新幹線到長野站參加導覽團，轉乘都由行程處理",
  },
  {
    aspect: "單程移動時間",
    diy: "不含等車，交通加步行約 2 小時 50 分鐘（79 + 38 + 15 + 35 分鐘）",
    tour: "一整天都在移動：東京出發的行程來回約 12 到 13 小時，但不必擔心錯過轉乘",
  },
  {
    aspect: "入園",
    diy: "12 月 1 日起現場 ¥1,000，或指定日期的網路票 ¥880，12 月至 4 月網路票優先入園",
    tour: "是否含門票請查看商品頁",
  },
  {
    aspect: "同一天去善光寺",
    diy: "可以，但要早點出發：善光寺在長野市區，公苑還要再往裡走 41 分鐘以上",
    tour: "Klook 有幾款地獄谷一日遊已排入善光寺；新宿出發的壽喜燒巴士團沒有",
  },
  {
    aspect: "可能出錯的地方",
    diy: "在湯田中或長野錯過巴士，以及冬季 16:00 閉園比預期更快到來",
    tour: "下雪時高速公路的路況與塞車；在公苑的停留時間固定",
  },
  {
    aspect: "適合誰",
    diy: "已持有 JR EAST PASS 的旅客，或在澀溫泉、湯田中、上林溫泉住一晚的旅客",
    tour: "從東京當天來回且不在長野過夜的旅客、第一次去的旅客，以及希望步道上有導遊的家庭",
  },
];

const faqItems = [
  {
    q: "地獄谷野猿公苑門票多少錢？",
    a: `依公苑的票價公告，2026 年 12 月 1 日起現場票成人（18 歲以上）¥1,000、小學到高中兒童 ¥500，網路票為 ¥880 與 ¥440。11 月 30 日前仍是 ¥800 與 ¥400。未滿 6 歲由監護人陪同免費，20 人以上團體為 ¥840 與 ¥420（網路票 ¥740 與 ¥380），沒有敬老優惠，折扣不可併用。12 月至 4 月，購買當日網路票的遊客優先入園。查核日：${CHECKED}。`,
  },
  {
    q: "地獄谷的開放時間是？",
    a: `依公苑官網，11 月至 3 月為 9:00 到 16:00，4 月至 10 月為 8:30 到 17:00。沒有固定休園日，但公苑表示可能因天氣、猴子的行為或天災臨時休園，並請遊客在閉園前至少 30 分鐘抵達，以便準時離開。查核日：${CHECKED}。`,
  },
  {
    q: "可以從東京當天來回看雪猴嗎？",
    a: "可以，但會是很長的一天。依公苑的交通資訊，東京到長野搭北陸新幹線最快 79 分鐘，轉長野電鐵特急到湯田中 38 分鐘，再搭 15 分鐘巴士到 Snow Monkey Park 站牌，然後步行約 35 分鐘。不算等車，單程就將近三小時，而公苑冬季 16:00 閉園。請一早從東京出發，或把轉乘交給行程。",
  },
  {
    q: "走到雪猴那裡要多久？",
    a: "從 Snow Monkey Park 巴士站約 35 分鐘，從上林溫泉的免費停車場約 30 分鐘（遊步道約 2 公里），從收費的地獄谷停車場約 15 分鐘，但冬季從澀溫泉上來的林道封閉，無法使用這座停車場。步道未鋪裝，有坡道和階梯，輪椅與推車無法通行。",
  },
  {
    q: "什麼時候看雪猴最好？",
    a: "想看泡湯就選 12 月到 3 月。公苑表示猴子主要在這段時間泡湯取暖，天氣暖時不太願意下水。海拔 850 公尺的冬天最低溫可到 −10°C、積雪超過一公尺，正是多數遊客想看的畫面。猴子是野生的，公苑每週會公布猴子出現機率預報，出發前請先確認。",
  },
  {
    q: "冬天去地獄谷要穿什麼？",
    a: "雪靴，有的話再加簡易冰爪。公苑的建議是冬季穿靴子或雪靴，夏季穿運動鞋或登山鞋，並用簡易冰爪（套在鞋上的輕便防滑釘）在壓實的雪和冰上走得更安全。請以 −10°C 而不是東京的氣溫來穿著，並空出雙手走階梯。",
  },
  {
    q: "雪猴一日遊值得嗎？",
    a: "從東京當天來回，通常值得。電車路線有四段加步行，其中兩段是班次有限的小型業者，冬季又是 16:00 閉園，錯過一班車損失的不只是時間，而是看不到猴子。有些行程還加上自己很難排進同一天的善光寺。如果在澀溫泉、湯田中或上林溫泉住一晚，或已有 JR EAST PASS，自己去既簡單又便宜。",
  },
  {
    q: "雪猴可以和澀溫泉或善光寺一起玩嗎？",
    a: "可以，兩者都順路。澀溫泉是公苑下方的溫泉街，住一晚時最適合順遊。善光寺在轉車的長野市區，Klook 有幾款地獄谷一日遊把它和公苑排在一起。自己從東京當天來回時，善光寺最適合排在回程的下午，但前提是您在冬季 16:00 閉園之前早早離開公苑。",
  },
  {
    q: "地獄谷門票需要事先預訂嗎？",
    a: "不是必要，但冬季值得先買。公苑販售指定日期的網路票，12 月至 4 月持票者優先入園，而且 2026 年 12 月 1 日起只要 ¥880，現場是 ¥1,000，所以旺季時網路票既能少排隊又比較便宜。跟團行程每天有名額上限，日期確定就訂，並查看商品頁關於雪天的取消條款。",
  },
  {
    q: "可以帶小孩、嬰兒車或狗去地獄谷嗎？",
    a: "小孩可以，嬰兒車和狗不行。未滿 6 歲由監護人陪同免費，但步道未鋪裝、有坡道和階梯，公苑表示輪椅與推車無法使用，小小孩請用抱的。狗和貓不得入園，導盲犬等輔助犬也一樣，因為狗是猴子的天敵。",
  },
  {
    q: "野猿公苑有哪些規定？",
    a: "不要餵食、觸摸或盯著猴子看。公苑的注意事項說，帶食物會讓猴子搶包包、抱住腿，近距離盯著猴子的眼睛是敵意的表現，幼猴靠近時要走開。拍照甚至用閃光燈都沒問題，但禁止無人機和自拍棒，相機也不可靠近猴子或伸進浴池。",
  },
  {
    q: "JR Pass 或 JR EAST PASS 能到雪猴那裡嗎？",
    a: "只到長野。JR EAST PASS（5 天 ¥35,000，10 天 ¥50,000）涵蓋東京到長野的北陸新幹線。長野以後的長野電鐵和巴士都是民營，需要另外付費，或購買長電的 SNOW MONKEY PASS，內含鐵路、湯田中巴士和公苑門票。",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const sameTripItems: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "當日網路票、湯田中與長野的巴士時刻和公苑的猴子預報都在手機上，而且公苑可能因天氣臨時休園。",
  },
  {
    label: "成田特快（N'EX）來回票",
    ctaLabel: "查看 N'EX 來回票 →",
    url: klookFor(naritaExpressRoundTripUrl, LOCALE),
    why: "它抵達東京站，也就是北陸新幹線前往長野的出發站，從成田入境的旅客可以住在第一班北上列車附近。",
  },
  {
    label: "羽田機場 – 東京利木津巴士",
    ctaLabel: "查看利木津巴士 →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "從羽田機場入境適用的路線，停靠站包含新宿。如果您要搭新宿出發的巴士團，這點很重要，因為它一早就從車站西側出發。",
  },
  {
    label: "JR EAST PASS（連續 5 天或 10 天）",
    ctaLabel: "查看 JR EAST PASS →",
    url: klookFor(jrEastPass.url, LOCALE),
    why: "涵蓋到長野的新幹線，不含之後的私鐵和巴士。在這 5 天或 10 天內安排多趟長途交通時才划算。",
  },
];

const TITLE = "地獄谷野猿公苑（2027）：東京出發一日遊與交通";
const DESC =
  "地獄谷野猿公苑 12 月 1 日起門票 ¥1,000（網路 ¥880），冬季 9:00–16:00，新幹線到長野 79 分鐘，再走雪路 35 分鐘。";

export default function JigokudaniSnowMonkeyTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG[LOCALE] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

            <Breadcrumb trail={trail} />

            <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
更新於 {monthLabel(updated.iso, LOCALE)}
</p>
          <h1 className={styles.heroTitle}>
東京出發看雪猴（2027）：<br />地獄谷門票、時間、步行與跟團或自助比較
</h1>
          <p className={styles.heroSubtitle}>
日本會泡溫泉的猴子住在長野市近郊山上的山谷裡，下新幹線後，還得轉搭電車、巴士，再走一段積雪的山路。這裡整理費用、時間，以及哪些情況適合跟團。
</p>
          <div className={styles.heroBadges}>
            {[`更新於 ${monthLabel(updated.iso, LOCALE)}`, "官方票價與時間，附查核日期", "跟團或自助比較"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
                <Disclosure />

        <WinterBookingTop
          heading={"今年冬天可以預訂哪些東京出發的雪猴行程？"}
          checkedIso="2026-11-06"
          deadline={
            <>
聖誕與新年期間請在 11 月 30 日前預訂，1、2 月至少提前三週。泡湯主要在 12 月到 3 月，所有行程都集中在這段短暫的季節裡。如果打算自助前往，日期一確定就買指定日期的網路票：12 月至 4 月持票者優先入園，12 月 1 日起 ¥880，現場 ¥1,000。
</>
          }
          tours={[
            {
              title: "東京出發雪猴一日遊（牛肉壽喜燒午餐）",
              url: klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE),
              price: "約 US$128 起",
              duration: "12 小時（08:00–20:00）",
              departs: "東京新宿",
            },
            {
              title: "地獄谷野猿公苑與善光寺一日遊（牛肉壽喜燒午餐）",
              url: klookFor(jigokudaniZenkojiSukiyakiTour.url, LOCALE),
              price: null,
              duration: "約 13 小時 10 分鐘",
              departs: "東京",
            },
            {
              title: "地獄谷野猿公苑與善光寺包車一日遊",
              url: klookFor(jigokudaniZenkojiPrivateDayTrip.url, LOCALE),
              price: null,
              duration: "10 小時",
              departs: "您在東京的飯店",
            },
          ]}
        />

                <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>
快速解答
</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
12 月 1 日起門票
</p>
                <p className={styles.verdictStatValue}>
成人 ¥1,000（網路 ¥880）
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
冬季時間（11–3 月）
</p>
                <p className={styles.verdictStatValue}>9:00–16:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
東京 → 長野
</p>
                <p className={styles.verdictStatValue}>
最快 79 分鐘
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
步行到雪猴
</p>
                <p className={styles.verdictStatValue}>
30–35 分鐘，冬季有雪
</p>
              </div>
            </div>
            <p className={styles.verdictText}>
<strong>重點：</strong>地獄谷野猿公苑（Snow Monkey Park）2026 年 12 月 1 日起現場票成人 ¥1,000、兒童 ¥500，網路票 ¥880 與 ¥440（11 月 30 日前 ¥800 與 ¥400），11 月至 3 月開放 9:00–16:00（4 月至 10 月 8:30–17:00）。從東京搭北陸新幹線到長野最快 79 分鐘，轉長野電鐵到湯田中 38 分鐘，再搭 15 分鐘巴士（或從長野搭 41 分鐘急行巴士），最後走約 35 分鐘冬季滿是冰雪的未鋪裝步道。雪猴一日遊會處理所有轉乘，也常加上善光寺；自己去比較便宜，但單程將近三小時。所有數字皆出自公苑官網，查核日：{CHECKED}。
</p>
            <KlookLink
              href={klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
在 Klook 查看雪猴行程 →
</KlookLink>
          </div>
        </div>

                <KlookTripPrep
          label={"同一趟旅程要訂的"}
          heading={"看雪猴還需要準備什麼？"}
          intro={"前往地獄谷需要準備三件事：查詢巴士與購買門票所需的網路、從機場進市區的交通，以及涵蓋新幹線段的周遊券。"}
          items={sameTripItems}
        />

        <EsimCtaTop />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
概要
</span>
          <h2 className={styles.sectionTitle}>
地獄谷野猿公苑是什麼地方？
</h2>
          <p className={styles.bodyText}>
地獄谷野猿公苑是長野縣北部山之內町上方橫湯川谷地的野生猴子公園，1964 年開園，海拔 850 公尺，最著名的就是日本獼猴在飄雪中泡溫泉的畫面。公苑介紹冬季最低可到 −10°C、積雪超過一公尺，猴子泡湯是為了取暖，主要在 12 月到 3 月。
</p>
          <p className={styles.bodyText}>
猴子是野生的，來去自由。公苑每週公布猴子出現機率預報，也提醒有些日子牠們可能完全不下山，所以從東京花一整天過來之前請先確認。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
票價與時間
</span>
          <h2 className={styles.sectionTitle}>
門票多少錢，何時開放？
</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "官方數字", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
票價出自公苑 2026 年 9 月 20 日的票價調整公告；開放時間與休園出自時間與票價頁（已確認 12 月 1 日調整，但表格仍是舊價）；網路票優先入園出自首頁；海拔與氣候出自英文介紹頁。票價、時間與優先入園於 {CHECKED} 在 jigokudani-yaenkoen.co.jp 查核。網路票在公苑的網路售票頁販售，長電也販售巴士加門票的版本。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
交通方式
</span>
          <h2 className={styles.sectionTitle}>
從東京怎麼去看雪猴？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
四段交通加一段步行。第一段很快，後三段才是這趟行程能否順利完成的關鍵。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["路段", "方式", "時間", "須知"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.how}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
時間出自公苑交通頁（{CHECKED} 查核）；票券內容出自長野電鐵的 Snow Monkey 頁面（2026 年 11 月 3 日查核）。<strong>關於票價：</strong>這裡不列新幹線、長電電車和巴士的日圓票價。JR 東日本官網沒有可供查核票價的網頁，長電的票價表只以 PDF 公布，第三方對 2026-27 急行巴士的數字又彼此不一致，請在車站或業者官網確認。<Link href="/guides/transport/jr-east-pass" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>JR 東日本周遊券攻略（英文）</Link>算出了周遊券何時比單買到長野划算。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jrEastPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
在 Klook 查看 JR EAST PASS →
</KlookLink>
            <KlookLink href={klookFor(snowMonkeysZenkojiSakeNaganoTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
長野站出發導覽團 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
步行
</span>
          <h2 className={styles.sectionTitle}>
走到雪猴那裡要多久？
</h2>
          <p className={styles.bodyText}>
<strong>冬季不論走哪條路，都約 30 到 35 分鐘。</strong>公苑表示從 Snow Monkey Park 巴士站約 35 分鐘；從上林溫泉免費停車場沿約 2 公里的遊步道約 30 分鐘，路況大致平坦、部分有坡。最短的路線是從收費的地獄谷停車場（¥500）走約 15 分鐘，但只有夏季能用：從澀溫泉上來的林道冬季封閉，而且任何季節都太窄，大型車無法通行。
</p>
          <p className={styles.bodyText}>
步道未鋪裝，有坡道和階梯，公苑表示輪椅與推車無法使用。冬季步道上有被踩實的積雪，部分路段結冰。來回步行請預留一小時，再加上觀賞時間，並在冬季 16:00 閉園前至少 30 分鐘抵達入口。
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
穿著
</span>
          <h2 className={styles.sectionTitle}>
冬天看雪猴要穿什麼？
</h2>
          <p className={styles.bodyText}>
<strong>雪靴，最好再加簡易冰爪。</strong>公苑建議冬季穿靴子或雪靴（其他季節穿運動鞋或登山鞋），並事先買好簡易冰爪（套在鞋上的輕便防滑釘）以策安全。請依山谷的氣溫而不是東京來穿著，公苑提到冬季最低 −10°C。可操作觸控螢幕的手套、帽子和能確實關好的包包也不可少。
</p>
          <p className={styles.bodyText}>
入園後的規定不多，但公苑執行得很嚴格：不餵食、不觸摸、不近距離盯著眼睛（這是敵意的表現），幼猴靠近時要走開。拍照和閃光燈都可以，但禁止無人機和自拍棒，相機也不可伸向猴子或浴池。狗和貓不得入園，輔助犬也一樣。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
比較
</span>
          <h2 className={styles.sectionTitle}>
雪猴行程值得跟團，還是自己去？
</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "自助前往", "雪猴一日遊"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.aspect}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.aspect}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.diy}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.tour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
判斷方式：<strong>如果從東京當天來回、不在長野過夜，就選擇跟團。</strong>四段交通、兩家小型業者加上 16:00 閉園，一旦錯過巴士，幾乎沒有調整行程的餘裕。<strong>在澀溫泉、湯田中或上林溫泉住一晚，或已有 JR EAST PASS，就自己去。</strong>住得近，步行就成了在一日遊旅客抵達前的晨間散步。
</p>
          <p className={styles.bodyText}>
<strong>何時預訂：</strong>跟團行程每天有名額上限，泡湯季只有四個月，日期一確定就訂，假期週優先。付款前請查看商品頁的取消條款，高速公路下雪是冬季行程最常變動的原因。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jigokudaniZenkojiSukiyakiTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
雪猴 + 善光寺一日遊 →
</KlookLink>
            <KlookLink href={klookFor(jigokudaniZenkojiPrivateDayTrip.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
專屬包車一日遊 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
季節
</span>
          <h2 className={styles.sectionTitle}>
什麼時候看雪猴最好？
</h2>
          <p className={styles.bodyText}>
<strong>12 月到 3 月的寒冷日子。</strong>公苑表示猴子在這段時間泡湯，最冷、雪最多的日子最常見。這也是公苑讓網路票持有者優先入園的時期（12 月至 4 月），也能看出哪段期間遊客較多。請早點去：冬季 16:00 關門，早上抵達才有餘裕搭晚一點的巴士。
</p>
          <p className={styles.bodyText}>
冬季以外開放時間較長（4 月至 10 月 8:30–17:00），猴子也都在，但公苑表示溫暖的月份牠們不太願意泡湯，所以不太看得到泡湯畫面。如果是為了這張照片而去，11 月和 4 月要碰運氣，夏天則不適合。
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
順遊
</span>
          <h2 className={styles.sectionTitle}>
雪猴可以和澀溫泉或善光寺一起玩嗎？
</h2>
          <p className={styles.bodyText}>
<strong>善光寺</strong>在長野市區，也就是所有前往公苑路線的轉車點，Klook 有幾款地獄谷行程會加上它。自己去的話，請排在回程，而且前提是您及早離開公苑；不要排在去程，因為去程要緊的是公苑的閉園時間。
</p>
          <p className={styles.bodyText}>
<strong>澀溫泉</strong>是公苑下方的老旅館街，<strong>上林溫泉</strong>就在步道起點。兩者都不算一日遊的順遊點，而是值得住一晚的理由。如果您在野澤溫泉滑雪，Klook 也有冬季限定行程，從那裡帶您看雪猴和善光寺。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nozawaSnowMonkeyZenkojiTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
從野澤溫泉出發 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
冬季行程的其他部分
</span>
          <h2 className={styles.sectionTitle}>
冬季旅行中，雪猴可以和什麼搭配？
</h2>
          <p className={styles.bodyText}>
地獄谷最適合排進較長的路線，而不是單獨成行，我們的<Link href="/zh-tw/guides/attractions/japan-winter-itinerary">日本冬季行程</Link>列出了 12 天的版本。以東京為住宿據點時，最搭的是<Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">GALA 湯澤滑雪一日遊（英文）</Link>：JR EAST PASS 兩者都涵蓋，兩個長途日可以共用一張票。回到東京的晚上可以留給<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">東京燈飾（英文）</Link>，比起 12 小時的行程輕鬆得多。送您到長野的北陸新幹線繼續開往金澤，那裡是<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山與白川鄉行程（英文）</Link>常見的出發點；1 月的旅程請先確定點燈日，再排雪猴。
</p>
          <p className={styles.bodyText}>
再往北就是另一趟旅程，如果目的是雪，這是不錯的替代方案。滑雪客可以把這座山谷和<Link href="/zh-tw/guides/attractions/niseko-ski-tours">二世谷滑雪行程</Link>比較一下。2 月的<Link href="/zh-tw/guides/attractions/sapporo-snow-festival-tours">札幌雪祭行程</Link>的日期固定在 2027 年 2 月 4–11 日，雪猴要排在前後。從札幌出發，<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">小樽一日遊（英文）</Link>是最容易加上的行程，<Link href="/zh-tw/guides/attractions/hokkaido-7-day-itinerary">北海道 7 天行程</Link>則呈現完整一週的安排。
</p>
        </section>

        <KlookStayAreas
          heading={"看雪猴要住哪裡？"}
          intro={"在公苑附近住一晚，就不用花三小時從東京趕路，早上散步就能到公苑。以下四個住宿據點從步道起點到長野站，都附 Klook 飯店連結。"}
          areas={jigokudaniStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "步道起點的溫泉鄉：公苑的免費停車場和 2 公里遊步道都從這裡開始，您可以在一日遊人潮抵達前就上路。", area: "上林溫泉（上林飯店仙壽閣）" }, { why: "公苑下方的老旅館街，適合看完猴子、搭車回長野前住一晚。", area: "澀溫泉（和風の宿 MASUYA）" }, { why: "長野電鐵的終點，往 Snow Monkey Park 站牌的 15 分鐘路線巴士從這裡出發。", area: "湯田中（Hotel Tsubakino）" }, { why: "保留所有選項的住宿據點：東京來的新幹線、往湯田中的長電、往公苑的急行巴士和善光寺都從這裡開始。", area: "長野站" }] as Partial<typeof item>[])[i]))}
        />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
出發前
</span>
          <h2 className={styles.sectionTitle}>
看雪猴需要行動網路嗎？
</h2>
          <p className={styles.bodyText}>
需要，而且這趟行程比一般行程更需要穩定的網路。網路票、湯田中與長野的巴士時刻和公苑的猴子預報都在手機上，而步道和巴士站沒有飯店 Wi-Fi。<KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>查看 Klook eSIM →</KlookLink> 或到<Link href="/zh-tw/guides/esim/best-esim-japan">日本網卡推薦攻略</Link>比較各家業者。
</p>
        </section>

        <EsimCtaBottom />

                <FaqList items={faqItems} />

        <KlookTourPicks
          heading={"Klook 的雪猴行程"}
          intro={"兩款東京出發的一日遊、一款長野站出發導覽團、一款包車一日遊，以及從野澤溫泉出發的雪季行程。請打開商品頁，查看您出發當天的價格、行程內容、導覽語言及取消規定。"}
          tours={[withKlookLocale(snowMonkeySukiyakiTourTokyo, LOCALE, { title: "東京出發雪猴一日遊（牛肉壽喜燒午餐）", desc: "從新宿出發的 12 小時巴士行程，含公苑門票與牛肉壽喜燒午餐。鎌倉之里雪屋行程只在約 1 月下旬到 2 月下旬進行" }), withKlookLocale(jigokudaniZenkojiSukiyakiTour, LOCALE, { title: "地獄谷野猿公苑與善光寺一日遊（牛肉壽喜燒午餐）", desc: "結合雪猴公苑與長野國寶善光寺的導覽一日遊，含牛肉壽喜燒午餐" }), withKlookLocale(snowMonkeysZenkojiSakeNaganoTour, LOCALE, { title: "長野雪猴、善光寺與清酒一日遊", desc: "從長野站出發的導覽團，適合持 JR 周遊券搭新幹線上來的旅客：不用轉私鐵和巴士就能看雪猴、善光寺並參訪酒造" }), withKlookLocale(jigokudaniZenkojiPrivateDayTrip, LOCALE, { title: "地獄谷野猿公苑與善光寺包車一日遊", desc: "同樣造訪這兩個景點，但改由專車接送，適合家庭或想自己掌握步道節奏的旅客" }), withKlookLocale(nozawaSnowMonkeyZenkojiTour, LOCALE, { title: "野澤溫泉出發的冬季行程：雪猴、善光寺與清酒試飲", desc: "從野澤溫泉出發的冬季限定一日遊，適合已在長野滑雪的旅客，順路造訪善光寺並品酒" })]}
        />

                <Related items={[{ href: "/zh-tw/guides/attractions/japan-winter-itinerary", title: "日本冬季行程" }, { href: "/guides/transport/jr-east-pass", title: "JR East Pass（2026）：價格、範圍與是否划算 （英文）" }, { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "東京出發 GALA 湯澤滑雪一日遊 （英文）" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山與白川鄉行程（2027）：該從哪裡出發 （英文）" }, { href: "/zh-tw/guides/attractions/niseko-ski-tours", title: "二世谷滑雪（2027）：接送、教練課與四大區域" }, { href: "/zh-tw/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭行程（2027）" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出發小樽一日遊（2027） （英文）" }, { href: "/zh-tw/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 天行程：每日路線" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "東京燈飾：日期、時間與免費景點 （英文）" }, { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "東京出發輕井澤一日遊 （英文）" }, { href: "/guides/transport/tokyo-to-kanazawa", title: "東京到金澤（2026） （英文）" }, { href: "/guides/attractions/japan-14-day-itinerary", title: "日本 14 天行程（2026） （英文）" }, { href: "/guides/attractions/japan-10-day-itinerary", title: "日本 10 天行程（2026） （英文）" }, { href: "/zh-tw/guides/esim/best-esim-japan", title: "日本 eSIM 推薦（2026）" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
趁名額還在，先訂好冬季日期
</h2>
            <p className={styles.ctaBannerDesc}>
雪猴行程每天有名額上限，泡湯季只有 12 月到 3 月。選好日期，確認商品頁的內容，電車、巴士和步道都交給導遊。Klook 可使用海外信用卡付款。
</p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
在 Klook 查看雪猴行程 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
