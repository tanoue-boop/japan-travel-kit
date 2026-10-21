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
  zhHanedaLimousineBus,
  zhKeiseiSkyliner,
  zhKlookEsim,
  zhNaritaExpress,
  zhNaritaLimousineBus,
  zhTokyoSubwayTicket,
} from "../../../../lib/klook-links-zh-tw";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/transport/tokyo-airport-transfer";
const TITLE = "成田機場到東京市區交通（2026）：Skyliner、N'EX 與利木津巴士比較";
const DESC =
  "成田機場到東京怎麼走，羽田機場也一起比較：電車、巴士與計程車的價格、時間與方便度，附 2026 年車資。" +
  "所有車資與英文版同一組數字。";

// Every fare and journey time below is the English guide's, unchanged. They are
// approximate 2026 one-way figures as that page states, and can change.
const naritaOptions = [
  { option: "成田特快 N'EX", time: "約 60 分鐘", price: "¥3,070", bestFor: "速度與舒適" },
  { option: "京成 Skyliner", time: "約 41 分鐘", price: "¥2,570", bestFor: "到日暮里／上野最快" },
  { option: "利木津巴士", time: "90～120 分鐘", price: "¥3,200", bestFor: "行李很重" },
  { option: "京成本線（普通特急）", time: "約 90 分鐘", price: "¥1,320", bestFor: "省錢" },
  { option: "計程車", time: "60～90 分鐘", price: "¥20,000 起", bestFor: "多人同行／深夜抵達" },
];

const hanedaOptions = [
  { option: "京急線", time: "約 37 分鐘", price: "¥310", bestFor: "便宜又快" },
  { option: "東京單軌電車", time: "約 20 分鐘", price: "¥500", bestFor: "快速到濱松町" },
  { option: "利木津巴士", time: "30～60 分鐘", price: "¥1,200", bestFor: "行李很重／直達飯店" },
  { option: "計程車", time: "30～60 分鐘", price: "¥6,000 起", bestFor: "門到門" },
];

const nexGuidePoints = [
  {
    title: "JR Pass 可以用",
    desc: "N'EX 是 JR 的列車，所以持 JR Pass 免費搭乘。如果你買了 7 日或 14 日的周遊券，這就是從成田出發第一天最明顯的選擇。在機場的 JR 售票處（綠色窗口）訂座位。",
  },
  {
    title: "直達主要車站",
    desc: "N'EX 不用換車就能直達新宿（90 分鐘）、澀谷（75 分鐘）與橫濱（90 分鐘）。住在東京西側的人，方便度上很難被超越。",
  },
  {
    title: "有外國旅客優惠票",
    desc: "JR 東日本為持外國護照者提供 N'EX 東京來回優惠票：來回 ¥4,000（兩張單程要 ¥6,140）。抵達後在成田機場的 JR 售票處出示護照購買。",
  },
  {
    title: "大約每 30 分鐘一班",
    desc: "從成田第 1 航廈與第 2／3 航廈出發的班次，整天大約每 30 分鐘一班。如果你是清晨或深夜的航班，請事先查時刻表。",
  },
];

const skylinerPoints = [
  {
    title: "成田到東京市中心最快的電車",
    desc: "京成 Skyliner 從成田機場到日暮里（東京東側）的 66 公里，只要 41 分鐘。從日暮里再轉一小段 JR 或地下鐵，就能到東京大部分區域。",
  },
  {
    title: "JR Pass 不能用",
    desc: "Skyliner 走的是京成電鐵這家民營鐵路，不是 JR。持 JR Pass 不能搭。不過京成有 Skyliner 加東京地鐵 24／48／72 小時通票的組合票——如果你打算靠地下鐵逛東京，很實用。",
  },
  {
    title: "住東京東側或北側最適合",
    desc: "如果你的飯店在淺草、上野、秋葉原，或任何東京地下鐵／都營線到得了的地方，Skyliner 加地下鐵的組合常常比 N'EX 更快也更便宜。",
  },
];

const skylinerVsNexRows = [
  { feature: "營運公司", skyliner: "京成電鐵（民營）", nex: "JR 東日本" },
  { feature: "單程車資", skyliner: "¥2,570", nex: "¥3,070" },
  { feature: "最快時間", skyliner: "到日暮里 41 分鐘", nex: "到東京車站約 60 分鐘" },
  { feature: "JR Pass 可用", skyliner: "不可", nex: "可——免費" },
  { feature: "IC 卡付車資", skyliner: "不可（需另付特別車資）", nex: "可" },
  { feature: "直達停靠", skyliner: "日暮里、京成上野", nex: "東京、新宿、澀谷、橫濱" },
  { feature: "班距", skyliner: "約每 30 分鐘", nex: "約每 30 分鐘" },
  { feature: "優惠方案", skyliner: "＋東京地鐵通票組合", nex: "外國旅客來回票 ¥4,000" },
];

const destinationRows = [
  { dest: "日暮里", pick: "Skyliner", note: "41 分鐘直達——到東京市中心最快的電車。" },
  { dest: "京成上野", pick: "Skyliner", note: "Skyliner 終點，比日暮里再幾分鐘（約 44 分鐘）。" },
  { dest: "淺草／秋葉原", pick: "Skyliner", note: "搭 Skyliner 到上野／日暮里，再轉一小段地下鐵或都營線。" },
  { dest: "東京車站", pick: "N'EX", note: "約 60 分鐘直達，不用換車。" },
  { dest: "澀谷", pick: "N'EX", note: "同一班車 75 分鐘直達。" },
  { dest: "新宿", pick: "N'EX", note: "90 分鐘直達——不用拖著行李轉車。" },
  { dest: "橫濱", pick: "N'EX", note: "90 分鐘直達，往東京以南的明顯選擇。" },
];

const busFareRows = [
  { airport: "成田（NRT）", time: "90～120 分鐘", price: "¥3,200", note: "受路況影響；上下班時段更久" },
  { airport: "羽田（HND）", time: "30～60 分鐘", price: "¥1,200", note: "比成田離市區近得多" },
];

const busPoints = [
  {
    title: "行李很重或很大時最理想",
    desc: "機場利木津巴士把行李放進車底行李艙——你不必把包包拖過車廂、扛上電扶梯。帶家人、帶滑雪裝備，或拉大型行李箱的人特別有用。",
  },
  {
    title: "直達主要飯店區",
    desc: "很多利木津巴士路線直接停在主要飯店區：新宿、澀谷、東京車站、赤坂、池袋。部分路線停在個別飯店。路線請查 TCAT（東京城市航空總站）的時刻表。",
  },
  {
    title: "零換車——而且收班更晚",
    desc: "許多路線直達主要飯店與區域，所以你上一次車、下車就在門口附近——帶小小孩、長輩或大量裝備時很理想。機場巴士的營運時間也比大多數機場電車更晚，所以如果你在電車收班後才落地，巴士通常是叫計程車之前最便宜的選項。請確認你那條路線的末班時間。",
  },
  {
    title: "會受路況影響",
    desc: "東京高速公路在尖峰時段（早上 7～9 點、傍晚 5～8 點）可能嚴重堵塞。如果你在尖峰時段移動，請多留時間，或考慮搭電車、把重行李用宅配送到飯店。",
  },
  {
    title: "旺季請提前訂",
    desc: "旺季提前訂可以在熱門路線上確保座位、鎖定車資，也省掉長途飛行後在機場櫃台排隊。",
  },
];

const transferTips = [
  {
    title: "落地前先把 IC 卡準備好",
    desc: "透過 Suica App 開好的 IC 卡（Suica 或 PASMO）讓你一抵達就能直接刷進閘門，不用在售票機前排隊。如果你沒有，成田與羽田的 IC 卡機器都有英文介面。",
  },
  {
    title: "深夜抵達的選項有限",
    desc: "成田的電車大約在晚上 11 點到午夜之間收班。如果你的班機很晚落地，選項就是機場利木津巴士（大約營運到 23:30）或計程車。成田的計程車請準備 ¥20,000～¥25,000；羽田比較近也比較便宜，約 ¥6,000～¥8,000。",
  },
  {
    title: "用 JR Pass 的人：上車前先換票",
    desc: "如果你帶著 JR Pass 兌換券抵達成田，請先在入境大廳的 JR 東日本旅行服務中心換成正式的周遊券，再去搭 N'EX。光有兌換券進不了閘門。",
  },
  {
    title: "考慮行李宅配（宅急便）",
    desc: "日本的宅急便（最常見的是黑貓宅急便）可以把行李從機場送到你的飯店，每件約 ¥1,500～¥3,000，隔天送達。這讓你可以輕裝搭電車，不用把重箱子拖過車站。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "成田機場到東京最便宜的方式是什麼？",
    a: "最便宜的電車選項是京成本線的特急（不是 Skyliner），¥1,320，到上野大約 90 分鐘。如果你持 JR Pass，成田特快是免費的，也是最舒服的選項。沒有周遊券、純粹想省錢的話，京成特急最划算。",
  },
  {
    q: "羽田機場到東京市中心要多久？",
    a: "羽田機場（HND）比成田離市區近得多。京急線到品川大約 13 分鐘（¥310），到新宿轉一次車大約 37 分鐘。東京單軌電車到濱松町大約 20 分鐘（¥500）。計程車依路況 30～60 分鐘，約 ¥6,000～¥9,000。",
  },
  {
    q: "成田機場可以用 IC 卡嗎？",
    a: "可以——IC 卡（Suica 與 PASMO）在成田的京成普通車與 N'EX 上都能用。不過它們不涵蓋京成 Skyliner 的特別車資（Skyliner 的指定座位要另外付）。在羽田，京急線與東京單軌電車都可以用 IC 卡。在入境大廳任何一台售票機都能加值。",
  },
  {
    q: "成田特快 N'EX 值得搭嗎？",
    a: "如果你有 JR Pass，絕對值得——它免費，而且是最舒服的選項。沒有周遊券的話，單程 ¥3,070 的 N'EX 換到的是不用換車直達新宿、澀谷與橫濱。外國旅客來回票（¥4,000）如果你回程也從成田飛，特別划算。",
  },
  {
    q: "成田機場到新宿怎麼走？",
    a: "最快的是成田特快 N'EX，直達新宿大約 90 分鐘（無周遊券 ¥3,070；持 JR Pass 免費）。次佳是京成 Skyliner 到日暮里（41 分鐘），再轉 JR 山手線到新宿（再約 30 分鐘）。兩個都可靠；N'EX 在行李方便度上勝出，因為你全程坐同一班車。",
  },
  {
    q: "Skyliner 和 N'EX 哪個快？",
    a: "看你要去哪裡。京成 Skyliner 是成田到東京市中心最快的單一列車，41 分鐘到日暮里。但它只開到日暮里與京成上野，所以如果你的目的地是新宿、澀谷或橫濱，成田特快 N'EX 整體通常更快，因為它不用換車直接到。",
  },
  {
    q: "Skyliner 可以用 JR Pass 嗎？",
    a: "不行。Skyliner 走的是京成電鐵這家民營鐵路，日本鐵路周遊券不涵蓋。持 JR Pass 的人應該搭 N'EX，它是 JR 東日本的列車，用周遊券免費。如果你沒有 JR Pass，Skyliner 對往東京東側來說是很強的選項。",
  },
  {
    q: "在東京，機場利木津巴士比電車好嗎？",
    a: "看你在意什麼。行李很重、想要不換車直達飯店、深夜落地，或住的地方就在巴士站旁邊時，巴士勝出。電車（Skyliner 或 N'EX）在速度與可預測性上勝出，尤其在尖峰路況下。對大多數行李不多、住在車站旁飯店的旅客來說，電車比較快；對所有拉著大行李箱的人來說，巴士比較輕鬆。",
  },
  {
    q: "成田與羽田的利木津巴士多少錢？",
    a: "從成田單程約 ¥3,200，依路況約 90～120 分鐘。從羽田約 ¥1,200，30～60 分鐘——羽田離東京市中心近得多，所以巴士既便宜也更快。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "成田機場到東京交通" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTokyoAirportTransferPage({ updated }: { updated: PageUpdated }) {
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
            成田機場到東京市區交通（2026）：<br />Skyliner、N&apos;EX 與利木津巴士比較
          </h1>
          <p className={styles.heroSubtitle}>
            從成田或羽田進東京市區其實很簡單——前提是你知道哪一個選項符合你的預算與時間。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "成田與羽田", "Skyliner vs N'EX vs 巴士"].map((t) => (
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
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最便宜</p>
                <p className={styles.verdictStatValue}>京成本線（¥1,320）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成田出發最快</p>
                <p className={styles.verdictStatValue}>京成 Skyliner（41 分鐘）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>大多數人最適合</p>
                <p className={styles.verdictStatValue}>N&apos;EX 或 Skyliner</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>原則：</strong>持 JR Pass，或要去東京西側（新宿、澀谷、橫濱），搭
              <strong>成田特快 N&apos;EX</strong>。要去上野或東京東側，搭<strong>京成 Skyliner</strong>。
              從<strong>羽田</strong>出發就搭京急線——快、便宜、好懂。
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>成田機場（NRT）</span>
          <h2 className={styles.sectionTitle}>成田機場的交通選項</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["選項", "時間", "價格", "最適合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {naritaOptions.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            成田機場（NRT）在東京市中心以東約 60～70 公里。上表的電車時間除另有標示外，是到新宿或上野。
            計程車價格變動很大，且已含過路費。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>羽田機場（HND）</span>
          <h2 className={styles.sectionTitle}>羽田機場的交通選項</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["選項", "時間", "價格", "最適合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hanedaOptions.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            羽田機場（HND）距離東京市中心只有 15～20 公里——是全世界離首都最近的大型機場之一。
            大多數旅客都覺得羽田比成田好走得多。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>成田特快</span>
          <h2 className={styles.sectionTitle}>成田特快 N&apos;EX 指南</h2>
          <div className={styles.stepsList}>
            {nexGuidePoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href={zhNaritaExpress.url}
            className={styles.pickCta}
            target="_blank"
            rel={KLOOK_REL}
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            在 Klook 訂 N&apos;EX 車票 →
          </a>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>京成 Skyliner</span>
          <h2 className={styles.sectionTitle}>京成 Skyliner 指南</h2>
          <div className={styles.stepsList}>
            {skylinerPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href={zhKeiseiSkyliner.url}
            className={styles.pickCta}
            target="_blank"
            rel={KLOOK_REL}
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            在 Klook 訂京成 Skyliner →
          </a>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>正面對決</span>
          <h2 className={styles.sectionTitle}>Skyliner vs N&apos;EX 一覽</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "京成 Skyliner", "成田特快 N'EX"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {skylinerVsNexRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td>{row.skyliner}</td>
                      <td>{row.nex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            車資為 2026 年的單程概估值，可能調整。Skyliner 的時間是到日暮里（66 公里）；N&apos;EX 的時間是到東京車站。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>依目的地</span>
          <h2 className={styles.sectionTitle}>你的飯店該搭哪一班？</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["目的地", "我們的選擇", "原因"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {destinationRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td className={styles.tdPrice}>{row.pick}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>機場巴士</span>
          <h2 className={styles.sectionTitle}>機場利木津巴士</h2>
          <div className={styles.tableWrap} style={{ marginBottom: "1.25rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["機場", "車程", "單程車資", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {busFareRows.map((row) => (
                    <tr key={row.airport}>
                      <td className={styles.tdProvider}>{row.airport}</td>
                      <td>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.stepsList}>
            {busPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href={zhNaritaLimousineBus.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              成田利木津巴士（Klook）→
            </a>
            <a href={zhHanedaLimousineBus.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              羽田利木津巴士（Klook）→
            </a>
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>小提醒</span>
          <h2 className={styles.sectionTitle}>機場交通的幾個要點</h2>
          <div className={styles.stepsList}>
            {transferTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>機場票沒涵蓋的兩件事</span>
          <h2 className={styles.sectionTitle}>下車之後的兩個缺口</h2>
          <p className={styles.bodyText}>
            機場票只送你到第一個車站。這兩項負責它的前後：
          </p>
          <ul className={styles.bodyList}>
            <li>
              <strong>網路：</strong>月台、巴士乘車處與飯店 check-in，在你通關時網路就已經能用的話都會順很多，
              而不是先去排 SIM 卡櫃台。做法請看我們的{" "}
              <Link href="/zh-tw/guides/esim/best-esim-japan">日本網卡推薦</Link>。
            </li>
            <li>
              <strong>市區交通：</strong>上面任何一張機場票都不涵蓋你進城之後的移動；東京地鐵通票涵蓋，
              東京地下鐵與都營全線、24、48 或 72 小時。
            </li>
          </ul>
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href={zhKlookEsim.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              查看 {zhKlookEsim.label} →
            </a>
            <a href={zhTokyoSubwayTicket.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
              查看 {zhTokyoSubwayTicket.label} →
            </a>
          </div>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/zh-tw/guides/esim/best-esim-japan", title: "日本網卡推薦（2026）：eSIM 方案比較與 Klook 日本 eSIM" },
            { href: "/zh-tw/guides/attractions/things-to-do-tokyo", title: "東京自由行景點（2026）：哪些要先訂票、哪些可以現場去" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日遊（東京出發．2026）：行程怎麼選、五合目看什麼" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />
      </div>
    </>
  );
}
