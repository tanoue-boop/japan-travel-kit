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
import { zhUsjExpressPass, zhUsjStudioPass } from "../../../../lib/klook-links-zh-tw";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions/usj-tickets-express-pass";
const TITLE = "日本環球影城門票與快速通關（2026）：該買哪一種";
const DESC =
  "USJ 現在一律線上購票，超級任天堂世界需要指定時間入園。這頁說明 Studio Pass 的分級定價、" +
  "快速通關 Express Pass 值不值得，以及 2026 年該買哪一種。內容與英文版同一組事實。";

// Same facts as the English guide: USJ prices by date tier and we deliberately
// quote no figure, because none could be verified for a given date.
const ticketRows = [
  { ticket: "一日 Studio Pass", what: "一天的入園資格；一般設施走普通排隊", price: "依日期分級——訂票時確認" },
  { ticket: "二日 Studio Pass", what: "連續兩天入園，平均每天通常比較便宜", price: "依日期分級——訂票時確認" },
  { ticket: "快速通關（加購）", what: "指定設施免排隊＋超級任天堂世界指定時間入園", price: "浮動，加購金額常常不小——訂票時確認" },
];

const expressRows = [
  { pass: "快速通關 4", rides: "約 4 項指定設施", snw: "通常含超級任天堂世界指定時間入園（依場次而異）", bestFor: "行程短、只想攻主力設施" },
  { pass: "快速通關 7", rides: "約 7 項指定設施", snw: "通常含超級任天堂世界指定時間入園", bestFor: "最熱門——忙碌的週末與連假" },
  { pass: "快速通關 8／Premium", rides: "涵蓋範圍最廣", snw: "含超級任天堂世界指定時間入園", bestFor: "人最多的日子與 25 週年期間" },
];

const whoFor = [
  {
    title: "平日離峰去的人",
    desc: "如果你挑清閒的平日、行程又有彈性，光買 Studio Pass 可能就夠了。超級任天堂世界用官方 USJ App 領免費的區域整理券，其他設施走普通排隊。",
  },
  {
    title: "週末／連假去的人",
    desc: "週末、連假，以及整個 2026 年的 25 週年期間，熱門設施的普通排隊可能衝到 180～240 分鐘。Studio Pass 加一張快速通關 7，才是實際玩到主力設施並確保進入超級任天堂世界的做法。",
  },
  {
    title: "只有一天，想全部玩到",
    desc: "如果你只有一天、又想把大設施加上超級任天堂世界都掃過，快速通關 7 或 8 值得那個價差。它實際上是把你本來要耗在隊伍裡的時間買回來。",
  },
];

const steps = [
  {
    title: "出發前先線上買 Studio Pass",
    desc: "自 2025 年 5 月起，USJ 門口不再販售當日票，所以線上購買實際上是必須的。Klook 是 USJ 的官方合作夥伴，介面看得懂，也支援海外信用卡。",
  },
  {
    title: "判斷你到底需不需要快速通關",
    desc: "用你的入園日期對照預期人潮。週末、連假與週年期間建議加購快速通關；清閒的平日可能不需要。",
  },
  {
    title: "把超級任天堂世界的入園方式搞定",
    desc: "人多的日子，超級任天堂世界常採指定時間入園。含超級任天堂世界指定時間入園的快速通關可以確保進得去；否則就在入園後，用官方 USJ App 領免費的區域整理券。",
  },
  {
    title: "開園前就到",
    desc: "人多的日子，開門時間可能比公告的早。提前 30～60 分鐘到，比較容易拿到超級任天堂世界的指定時間券，普通排隊也能先跑一輪。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "USJ 門票一定要提前買嗎？",
    a: "要。自 2025 年 5 月起，日本環球影城停止在門口販售當日票，所以你必須在出發前線上購買。透過 Klook 這類官方合作夥伴訂，介面看得懂、接受海外信用卡，並發送可以在入園時掃描的電子票。",
  },
  {
    q: "2026 年的 USJ 快速通關值得買嗎？",
    a: "人多的日子，值得。2026 年是 USJ 的 25 週年期，最熱門設施的普通排隊可能達到 180～240 分鐘。快速通關把那些好幾小時的等待換成優先入場，而且大多數版本還確保超級任天堂世界的指定時間入園。清閒的離峰平日就沒那麼必要——但週末、連假與週年人潮，如果你想玩到主力設施，它幾乎是必備。",
  },
  {
    q: "快速通關 4、7、8 差在哪？",
    a: "數字大致對應你可以免排隊的指定設施數量——快速通關 4 約四項、快速通關 7 約七項，8／Premium 級別涵蓋最廣。大多數版本也含一張超級任天堂世界的指定時間入園券。快速通關 7 是涵蓋範圍與價格之間最受歡迎的平衡點；8／Premium 適合最忙的日子。實際包含哪些設施會依日期不同，購買前請看清楚你那天的內容。",
  },
  {
    q: "怎麼進超級任天堂世界？",
    a: "人多的日子，超級任天堂世界採指定時間入園。有兩個可靠的方式：買一張含超級任天堂世界指定時間入園券的快速通關，或是在入園後用官方 USJ App 領免費的區域整理券。清閒的日子你可能可以直接走進去，但週末、連假與週年期間不要指望。",
  },
  {
    q: "USJ 門票多少錢？",
    a: "USJ 採依日期分級的定價，所以同一張票在熱門日期會比清閒日期貴。因為票價隨日期與需求變動，我們不報固定金額——請在訂票時查你那個特定日期的即時價格。快速通關是 Studio Pass 之外的加購項目，金額依日期差異很大。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "日本環球影城門票與快速通關" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhUsjTicketsPage({ updated }: { updated: PageUpdated }) {
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
            日本環球影城門票與<br />快速通關（2026）：該買哪一種
          </h1>
          <p className={styles.heroSubtitle}>
            現在一律線上購票，超級任天堂世界需要指定時間入園，而 2026 年又是 25 週年的人潮。
            這頁說明你這趟到底該買什麼。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "Studio Pass＋快速通關", "超級任天堂世界"].map((t) => (
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
                <p className={styles.verdictStatLabel}>每個人都要買</p>
                <p className={styles.verdictStatValue}>Studio Pass（線上）</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>什麼時候加快速通關</p>
                <p className={styles.verdictStatValue}>週末／連假／週年期</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>超級任天堂世界</p>
                <p className={styles.verdictStatValue}>人多時需指定時間入園</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>現場買得到嗎？</p>
                <p className={styles.verdictStatValue}>買不到——2025 年起只賣線上</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>線上買一張 Studio Pass 當入園票。人多的日子——2026 年都算人多——
              再加一張快速通關，省掉好幾小時的隊伍並確保進入超級任天堂世界。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={zhUsjStudioPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 門票（Studio Pass）→
              </KlookLink>
              <KlookLink href={zhUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ 快速通關 →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>2026 年 USJ 門票怎麼運作</h2>
          <p className={styles.bodyText}>
            買之前要搞懂兩件事。第一，<strong>Studio Pass</strong> 是你的入園票——每個人都要一張，
            而自 2025 年 5 月起，你不能當天在門口買。它只賣線上，而且採分級定價，熱門日期較貴。
          </p>
          <p className={styles.bodyText}>
            第二，<strong>快速通關（Express Pass）</strong>是選購的加購項目，讓你在指定設施跳過普通排隊，
            而大多數版本還含一張<strong>超級任天堂世界</strong>的指定時間入園券。它本身不是入園票——
            要在 Studio Pass 之外另外買。由於 2026 年是 USJ 的 25 週年期、人潮很重，快速通關的價值
            比平常年份高得多。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票種</span>
          <h2 className={styles.sectionTitle}>USJ 票種一覽</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "內容", "定價"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            USJ 採依日期分級的定價——同一張票在熱門日期比較貴。我們不報固定金額；請在訂票時查你那天的即時價格
            （2026 年，浮動，結帳時確認）。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>快速通關分級</span>
          <h2 className={styles.sectionTitle}>快速通關 4 vs 7 vs 8</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["快速通關", "免排隊設施", "超級任天堂世界", "最適合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {expressRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rides}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            實際涵蓋哪些設施、以及是否包含超級任天堂世界的指定時間入園，會依版本與日期而不同——
            購買前請務必確認你那天的內容。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>誰該買什麼</span>
          <h2 className={styles.sectionTitle}>你該買什麼？</h2>
          <div className={styles.stepsList}>
            {whoFor.map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>怎麼訂、怎麼安排這一天</h2>
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

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>從大阪與關西機場怎麼去 USJ</h2>
          <p className={styles.bodyText}>
            USJ 在大阪西側的此花區，從 JR 夢咲線（櫻島線）的 Universal City 站走過去很近——
            通常在西九條轉車。從關西機場進市區可以搭 Haruka 或南海的路線；到了市區之後，再轉一段電車就到。
          </p>
          <p className={styles.bodyText}>
            大阪的交通與機場段我們還沒有繁體中文版；英文版請看{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              大阪機場交通攻略（英文）
            </Link>
            {" "}與{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              大阪市區交通攻略（英文）
            </Link>
            。
          </p>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/tokyo-disney-tickets", title: "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/zh-tw/guides/esim/best-esim-japan", title: "日本網卡推薦（2026）：eSIM 方案比較與 Klook 日本 eSIM" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>在 USJ 少排隊</h2>
            <p className={styles.ctaBannerDesc}>
              線上買 Studio Pass（2025 年起必須），再加一張快速通關，避開 25 週年的人潮並確保進入超級任天堂世界。
            </p>
            <KlookLink href={zhUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看 USJ 門票與快速通關 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
