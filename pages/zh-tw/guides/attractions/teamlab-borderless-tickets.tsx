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
import { zhTeamlabBorderless } from "../../../../lib/klook-links-zh-tw";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhDateLabel, zhMonthLabel, zhPrice } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions/teamlab-borderless-tickets";
const TITLE = "teamLab 無界 門票（2026）：票價、時段預約與購票管道";
const DESC =
  "teamLab 無界（麻布台之丘）門票 2026：官方票價成人 ¥3,400 起、浮動定價怎麼算、指定入場時段與 Flexible Pass、" +
  "營業時間與休館日，以及官網和 Klook 該選哪一個。數字與英文版同一組資料、同一個查核日。";

// All figures come from lib/attraction-prices.ts and the English guide that read
// them off teamlab.art. Nothing was re-checked or added for this edition.
const P = PRICES.teamlabBorderless;
const CHECKED = zhDateLabel(P.checked);
// "from ¥3,400" -> "¥3,400 起": same figure, Chinese qualifier. See lib/i18n.ts.
const ADULT = zhPrice(P.adult);
const CHILD = zhPrice(P.child);

const priceRows = [
  { ticket: "成人（18 歲以上）", price: ADULT, note: "浮動定價——你選的日期與時段可能更貴" },
  { ticket: "13～17 歲", price: "¥2,800", note: "固定票價" },
  { ticket: "4～12 歲", price: CHILD, note: "固定票價" },
  { ticket: "3 歲以下", price: "免費", note: "不需購票" },
  { ticket: "身心障礙人士", price: "¥1,700 起", note: "浮動定價；一位陪同者同享優惠票價" },
];

const buyingRows = [
  {
    factor: "票價",
    official: "基本票價，依日期與時段浮動",
    klook: "同一張票，以你自己的幣別標價",
    door: "成人 +¥200，兒童／身障票 +¥100",
  },
  {
    factor: "結帳語言",
    official: "有英文版網站",
    klook: "繁體中文介面，立即取得電子票",
    door: "現場在美術館窗口",
  },
  {
    factor: "海外信用卡",
    official: "通常可以，但不保證",
    klook: "本來就為海外卡與行動支付設計",
    door: "現場可刷卡",
  },
  {
    factor: "改日期",
    official: "官網購票最多可改三次日期",
    klook: "視你選的方案而定——付款前請先看清楚",
    door: "不適用",
  },
  {
    factor: "買不到的風險",
    official: "早訂就低",
    klook: "早訂就低",
    door: "高——熱門時段在當天之前就賣完",
  },
];

const whoFor = [
  {
    title: "選官網的話…",
    desc: "你想要最低的基本票價和最大的日期彈性。teamLab 官網購買的票最多可以改三次日期，如果你的東京行程還在調整，這點很實用。",
  },
  {
    title: "選 Klook 的話…",
    desc: "你希望用自己的幣別、看得懂的介面結帳，用非日本發行的信用卡付款，並把電子票和其他預訂放在同一個 App 裡。Klook 是 teamLab 的官方售票合作夥伴，票是同一張，只是換一個櫃台。",
  },
  {
    title: "別打算現場買，如果…",
    desc: "你的日期是週末、日本連假，或你想去傍晚的時段。現場票成人要多付 ¥200（兒童與身障票多 ¥100），而且只在還有名額時才賣——偏偏大多數人想去的時段常常沒有。",
  },
];

const steps = [
  {
    title: "先選日期，再看那天的價格",
    desc: "無界的成人票與身障票是浮動定價，你看到的金額取決於選的日期與入場時段。平日早上通常最便宜也最清閒。",
  },
  {
    title: "選入場時間，或選 Flexible Pass",
    desc: "標準的 Entrance Pass 有指定入場時間。teamLab 另外也賣 Flexible Pass，指定日期但不指定入場時間，行程不好掌握時值得多付一點。",
  },
  {
    title: "週末與傍晚場請提前 2～3 週訂",
    desc: "無界的年參觀人次遠超過百萬，熱門時段最先消失。早訂的差別在於「你挑時段」還是「剩下的時段挑你」。",
  },
  {
    title: "預留約兩小時，行李帶少一點",
    desc: "館內沒有固定路線，作品會在房間之間移動，所以大多數人會想在裡面待大約兩小時。稍微提前抵達，並盡量輕裝——神谷町站與六本木一丁目站都有地下通道直達，不必走到地面上。",
  },
];

const faqItems: ZhFaqItem[] = [
  {
    q: "2026 年 teamLab 無界門票多少錢？",
    a: `依 teamLab 官方網站、查核日 ${CHECKED}：Entrance Pass 成人（18 歲以上）${ADULT}，13～17 歲 ¥2,800，4～12 歲 ${CHILD}，3 歲以下免費。身心障礙人士 ¥1,700 起，一位陪同者同享優惠票價。成人票與身障票採浮動定價，實際金額取決於你選的日期與時段，付款前請確認自己那天的價格。現場購票成人多 ¥200，兒童與身障票多 ¥100。`,
  },
  {
    q: "teamLab 無界是指定時段入場嗎？可以直接去嗎？",
    a: "標準的 Entrance Pass 是指定日期與時間的：訂票時就要選入場時段。teamLab 另外也賣 Flexible Pass，指定日期但不指定入場時間。現場也有售票，但成人要多付 ¥200，而且只在還有名額時才賣——週末、連假與傍晚場經常沒有。把現場購票當成備案，不要當成計畫。",
  },
  {
    q: "teamLab 無界的營業時間是？",
    a: `營業時間依日期而不同。我們在 ${CHECKED} 查看官方網站時，館方公告的時間是 08:30–21:00，部分日期提早閉館（2026 年 11 月 17 日為 17:00），部分日期延長到 22:00。最後入場是閉館前一小時。另外也有不定期的週二休館——2026 年 10 月 20 日、11 月 24 日與 12 月 8 日都在內。訂時段之前，請務必打開官方行事曆查你自己的日期。`,
  },
  {
    q: "teamLab 無界要逛多久？",
    a: "預留大約兩小時。無界沒有地圖、沒有固定路線——50 多件作品分布在迷宮般的空間裡，作品會跨房間移動、整天都在變化——所以待多久真的看你自己。兩小時足夠不趕地看完主要展間；藝術與攝影愛好者常待到接近三小時。",
  },
  {
    q: "teamLab 無界在哪裡？怎麼去？",
    a: "位在東京港區虎之門五丁目一帶的「麻布台之丘 Garden Plaza B」地下一樓。官方交通資訊寫的是：東京地下鐵日比谷線「神谷町站」5 號出口步行 2 分鐘，南北線「六本木一丁目站」4 號出口步行 6 分鐘。兩站都有地下通道連到麻布台之丘，可以全程照指標走、不必上到地面——下雨或夏天很有用。",
  },
  {
    q: "teamLab 無界該在官網買還是 Klook 買？",
    a: "兩邊都正規：Klook 是 teamLab 的官方售票合作夥伴，不管從哪邊買都是同一張票。官網給你基本票價，而且最多可以改三次日期。Klook 給你自己幣別、看得懂的結帳流程，對非日本發行的信用卡接受度高，電子票也和其他預訂放在一起。最在意日期彈性就買官網；最在意結帳順不順就走 Klook。",
  },
  {
    q: "teamLab 無界和 teamLab Planets 該訂哪一個？",
    a: "它們是東京不同區域的兩間不同美術館，不是同一品牌的兩間分館。麻布台之丘的「無界」是 50 多件作品組成的無地圖迷宮，值得慢慢逛。豐洲的「Planets」是脫鞋走進水裡的那一間，帶小孩比較適合。如果只去一間：想看藝術、想拍照選無界；想要身體感受強烈、又帶著孩子就選 Planets。",
  },
];

const trail: ZhCrumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "teamLab 無界 門票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTeamLabBorderlessPage({ updated }: { updated: PageUpdated }) {
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
            teamLab 無界 門票（2026）：<br />票價、時段預約與購票管道
          </h1>
          <p className={styles.heroSubtitle}>
            麻布台之丘的 teamLab 無界，一張票實際要多少錢、指定時段怎麼運作，
            以及該在官網買還是透過 Klook。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價", "指定時段入場說明"].map((t) => (
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
                <p className={styles.verdictStatValue}>指定日期＋時段</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>建議停留</p>
                <p className={styles.verdictStatValue}>約 2 小時</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>地點</p>
                <p className={styles.verdictStatValue}>港區．麻布台之丘</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>成人票 {ADULT}，採浮動定價，最終金額由你選的日期與時段決定。
              門票指定日期與時間，現場購票成人多 ¥200 且要看還有沒有名額；館方公告的營業時間約 08:30–21:00，
              最後入場是閉館前一小時。預留大約兩小時，從神谷町站（日比谷線，步行 2 分鐘）或六本木一丁目站
              （南北線，步行 6 分鐘）過去，兩站都有地下通道。想要基本票價與最多三次免費改期就買官網；
              想要看得懂、用自己幣別、海外卡刷得過的結帳就走 Klook。
            </p>
            <a href={zhTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看 teamLab 無界門票 →
            </a>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              本頁的票價、營業時間與休館日讀自 teamLab 官方網站，查核日 {CHECKED}。無界採浮動定價、行事曆也會變動，
              請在結帳時確認你自己日期的兩項資訊。
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>teamLab 無界門票價格</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            無界賣的是指定入場時間的 <strong>Entrance Pass</strong>。成人票與身障票採浮動定價——
            下表是官網上的基本票價，熱門的週六傍晚會比清閒的週二早上貴。青少年與兒童票是固定價。
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
            讀自 teamLab 官方網站，查核日 {CHECKED}。現場購票成人多 ¥200，兒童與身障票多 ¥100。
            優惠票需要出示證明文件，請帶證件。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>訂票前</span>
          <h2 className={styles.sectionTitle}>營業時間、入場時段與休館日</h2>
          <p className={styles.bodyText}>
            無界開得很長，但行事曆常變——這件事比票價更常讓人踩雷。以下是我們在 {CHECKED} 查看官方網站時的內容：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>營業時間：</strong>公告為 08:30–21:00，部分日期提早閉館（2026 年 11 月 17 日為 17:00），部分日期延長到 22:00。</li>
            <li><strong>最後入場：</strong>閉館前一小時——所以 21:00 閉館表示你得在 20:00 前進場。</li>
            <li><strong>休館日：</strong>不定期的週二，包含 2026 年 10 月 20 日、11 月 24 日與 12 月 8 日。</li>
            <li><strong>入場：</strong>Entrance Pass 指定日期與入場時間。另有 <strong>Flexible Pass</strong>，指定日期但不指定入場時間。</li>
            <li><strong>改日期：</strong>直接向 teamLab 購買的票，最多可以改三次日期。</li>
          </ul>
          <p className={styles.bodyText}>
            因為營業時間與休館日每個月都在變，請先用你自己的旅行日期打開官方行事曆確認，再去訂時段。
            平日早上最清閒、通常也最便宜；週末與傍晚場最先消失。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>你買到的是什麼</span>
          <h2 className={styles.sectionTitle}>teamLab 無界究竟是什麼</h2>
          <p className={styles.bodyText}>
            無界是一間沒有地圖的美術館。50 多件數位作品分布在互相連通的房間群裡，而作品本身會移動——
            它們會從一個空間走到另一個空間、會對房間裡的人有反應、整天都在變化。沒有建議路線、沒有編號站點，
            所以買同一張票的兩個人，體驗可能真的不一樣。
          </p>
          <p className={styles.bodyText}>
            正因為這個設計，這張票值得先規劃。趕一小時只能看到幾個有名的展間；大約兩小時才夠你亂走、折返，
            並找到那些要等才會出現的作品。這也讓無界成為東京兩間 teamLab 當中比較偏成人、比較適合攝影的那一間——
            想找脫鞋走進水裡的豐洲那一間，請看我們的{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 門票攻略</Link>
            ，裡面也有 Planets 與無界的完整比較。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>在哪買</span>
          <h2 className={styles.sectionTitle}>官網 vs Klook vs 現場</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Klook 是 teamLab 的官方售票合作夥伴，所以不論走哪個櫃台，入場資格都一樣。差別在結帳流程、彈性，
            以及——如果你拖到當天——價格。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "官方網站", "Klook", "當天現場"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.official}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.klook}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            現場加價與改期次數依 teamLab 官方網站 {CHECKED} 的公告。售票平台的取消與變更條件依方案而異，
            付款前請在訂購頁上看清楚。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一種適合你</span>
          <h2 className={styles.sectionTitle}>該怎麼買？</h2>
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
          <h2 className={styles.sectionTitle}>teamLab 無界怎麼訂</h2>
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
            <a href={zhTeamlabBorderless.url} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看無界的時段與價格 →
            </a>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>teamLab 無界的位置</h2>
          <p className={styles.bodyText}>
            美術館位在港區虎之門五丁目一帶的「麻布台之丘 Garden Plaza B」地下一樓。
            它不是以前台場的無界——那個場館已經結束，所以任何把你帶去海濱的路線都請忽略。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>神谷町站</strong>（東京地下鐵日比谷線）——5 號出口步行 2 分鐘。</li>
            <li><strong>六本木一丁目站</strong>（東京地下鐵南北線）——4 號出口步行 6 分鐘。</li>
            <li>兩站都有地下通道連到麻布台之丘，可以全程照指標走，不必上到地面。</li>
          </ul>
        </section>

        <ZhFaqList items={faqItems} />

        <ZhRelated
          items={[
            { href: "/zh-tw/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 門票（2026）：票價、預約方式與無界比較" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/zh-tw/guides/attractions/things-to-do-tokyo", title: "東京自由行景點（2026）：哪些要先訂票、哪些可以現場去" },
            { href: "/zh-tw/guides/transport/tokyo-airport-transfer", title: "成田機場到東京市區交通（2026）：Skyliner、N'EX 與利木津巴士比較" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先把無界的時段訂下來</h2>
            <p className={styles.ctaBannerDesc}>
              指定時段入場的意思是：你最想去的那個時段，就是最先賣完的那個。Klook 是 teamLab 的官方售票合作夥伴，
              可以用自己的幣別結帳，電子票直接存在手機裡。
            </p>
            <a href={zhTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看 teamLab 無界門票 →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
