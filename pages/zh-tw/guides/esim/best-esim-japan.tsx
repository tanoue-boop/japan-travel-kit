import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import tools from "../../../../styles/Tools.module.css";
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
import { zhKlookEsim } from "../../../../lib/klook-links-zh-tw";
import { klookEsim } from "../../../../lib/klook-links";
import {
  cheapestPlan,
  formatDate,
  formatUsd,
  getProvider,
  latestCheckedAt,
  priceAtLeastLabel,
  priceFromLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/esim/best-esim-japan";
const TITLE = "日本網卡推薦（2026）：eSIM 方案比較與 Klook 日本 eSIM";
const DESC =
  "日本網卡推薦 2026：Klook 日本 eSIM，以及 Airalo、Holafly、eSIM Go、Sakura Mobile 四家的價格、" +
  "網路與語音比較。價格每天從各家官網抓取，與英文版同一組資料、同一個查核時間。";

// Prices come from data/esim-prices.json via lib/esim-prices.ts — the same file
// scripts/fetch-esim-prices.mjs refreshes daily and the English page reads. The
// Chinese edition quotes no figure the English one does not.
const pricesCheckedAt = formatDate(latestCheckedAt());

// The eSIM hub and the plan table are English-only for now, so the "see every
// plan" links are labelled as English rather than silently switching language.
const PLANS_HREF = "/guides/esim/japan-esim-data-plans";

type ZhPick = {
  esimId: EsimProviderId;
  rank: number;
  /** Chinese name, where the brand has a common one in Taiwan; otherwise the brand. */
  name: string;
  bestFor: string;
  target: string;
  voice: boolean;
  physicalSim: boolean;
  /** Set where we cannot link the provider itself — see HOLAFLY_NOTE. */
  altOf?: EsimProviderId;
  altNote?: string;
};

// Holafly runs no affiliate programme we can join, which is why the English page
// points its CTA at Airalo's unlimited plans. Same decision, stated the same way.
const HOLAFLY_NOTE = "Holafly 沒有我們能加入的聯盟方案，所以這裡的連結指向我們建議的替代選擇 Airalo 的無限方案。";

const picks: ZhPick[] = [
  {
    esimId: "airalo",
    rank: 1,
    name: "Airalo",
    bestFor: "綜合首選",
    target: "大多數旅客——穩定、便宜、設定非常簡單。",
    voice: false,
    physicalSim: false,
  },
  {
    esimId: "holafly",
    rank: 2,
    name: "Holafly",
    bestFor: "吃到飽首選",
    target: "重度用量：遠端工作、直播、每天視訊通話的人。",
    voice: false,
    physicalSim: false,
    altOf: "airalo",
    altNote: HOLAFLY_NOTE,
  },
  {
    esimId: "esimgo",
    rank: 3,
    name: "eSIM Go",
    bestFor: "最划算",
    target: "預算有限，或這趟要走亞洲多國的人。",
    voice: false,
    physicalSim: false,
  },
  {
    esimId: "sakura",
    rank: 4,
    name: "Sakura Mobile",
    bestFor: "長期停留首選",
    target: "停留一個月以上、需要語音通話與英文客服的人。",
    voice: true,
    physicalSim: true,
  },
];

const installSteps = [
  {
    title: "購買並收到 QR Code",
    desc: "出發前在線上買好。幾分鐘內你就會收到 email 裡的 QR Code，直接寄到你的信箱。",
  },
  {
    title: "在「設定」裡掃 QR Code",
    desc: "進入「設定」→「行動服務」（或行動網路）→「加入 eSIM」→「掃描 QR 碼」。不到 2 分鐘，還沒打包行李就能在家做完。",
  },
  {
    title: "抵達時啟用",
    desc: "飛機落地時把行動數據切到日本的 eSIM。你會在走到行李轉盤前就有 4G 訊號——不用找機場的 SIM 卡販賣機。",
  },
];

const faqItems: ZhFaqItem[] = [
  {
    q: "eSIM 是什麼？去日本需要嗎？",
    a: "eSIM 是內建在手機裡的數位 SIM——不需要實體卡片。你用 QR Code 下載設定檔，馬上就能用。去日本不一定要 eSIM，但它是目前最方便的選項：出發前買好並安裝，落地啟用。",
  },
  {
    q: "哪些手機在日本支援 eSIM？",
    a: "大多數近幾年的手機都支援 eSIM：iPhone XS 以後、Google Pixel 3 以後、Samsung Galaxy S20 以後，以及許多其他 Android 旗艦機。請到手機「設定」→「關於」確認。注意：部分被電信商鎖的手機可能不支援 eSIM。",
  },
  {
    q: "用日本 eSIM 的時候，台灣的號碼可以繼續開著嗎？",
    a: "可以——這是 eSIM 最大的優點之一。大多數雙 SIM 手機可以同時使用兩張 SIM。你可以讓原本的號碼繼續接電話與簡訊（例如信用卡刷卡通知），由日本 eSIM 負責數據。",
  },
  {
    q: "日本要用 Airalo 還是 Holafly？",
    a: "對大多數人來說 Airalo 比較好——比較便宜、流量級距有彈性，而且同時使用 Docomo 與 SoftBank。如果你真的需要吃到飽（遠端工作、大量看影片），而且這趟的預算撐得起它的價差，Holafly 才勝出。",
  },
  {
    q: "落地日本後 eSIM 不能用怎麼辦？",
    a: "先確認那個 eSIM 設定檔的「數據漫遊」有打開。還是沒訊號的話，把飛航模式開關一次，強制重新搜尋網路。這裡列的每一家都提供 24 小時真人線上客服——Airalo 與 Holafly 回應特別快。",
  },
  {
    q: "日本的 eSIM 和實體 SIM 卡差在哪？",
    a: "兩者都給你日本的行動數據，但 eSIM 設定更快（不必在機場排隊）、多數情況更便宜，而且出發前就能買好。實體 SIM 卡要在落地後到機場櫃台或販賣機等。實體 SIM 的主要優點是：在不支援 eSIM 的手機上也能用。",
  },
  {
    q: "可以在日本直接用台灣電信的漫遊嗎？",
    a: "可以，但漫遊很貴。多數國際電信對日本漫遊收每天約 $10～15。10 天的行程光是數據就要 $100～150——而一整個日本 eSIM 方案是 $9～18。除非你的電信有涵蓋日本的平價旅遊加購包，專用的日本 eSIM 幾乎都更便宜。",
  },
  {
    q: "Airalo 在日本用哪家網路？",
    a: "Airalo 的日本 eSIM 方案走 Docomo 與 SoftBank。Docomo 在日本的覆蓋最廣，包含鄉間、山區與離島。SoftBank 在都會與近郊很強。實際上，在觀光區大多數旅客感覺不出兩者的差別。",
  },
  {
    q: "Sakura Mobile 是什麼？適合誰？",
    a: "Sakura Mobile 是日本本地的電信業者，專為旅客與長期停留者提供 SIM 卡與 eSIM。和 Airalo、Holafly 不同，Sakura Mobile 含語音通話功能、有英語客服，方案也適用到 90 天的停留。它走 Docomo（日本最大的電信）。它比便宜的 eSIM 貴，但對任何需要日本電話號碼或長期停留的人來說是最好的選擇。",
  },
  {
    q: "去日本需要多少流量？",
    a: "一般觀光用途——Google 地圖、訊息、輕度瀏覽、拍幾張照——每天 1 GB 是合理的估計。10 天的行程大約用 8～10 GB。如果你大量用導航開車、看影片，或遠端工作，請算每天 2 GB 以上。多數旅客覺得 3～5 GB 的方案足夠一週的日本行。",
  },
  {
    q: "日本網卡（eSIM）要多少錢？",
    a: `日本 eSIM 的價格依業者與流量級距而不同（查核時間 ${pricesCheckedAt}）。省錢選項：eSIM Go ${priceFromLabel("esimgo")} 起、Airalo ${priceFromLabel("airalo")} 起。中階：5 GB 方案 eSIM Go ${priceAtLeastLabel("esimgo", 5)}，Airalo ${priceAtLeastLabel("airalo", 5)}。吃到飽：Holafly ${unlimitedFromLabel("holafly")} 起。日本本地、有英語電話客服：Sakura Mobile ${priceFromLabel("sakura")} 起。一般旅客一週的行程，預期在 $10～20。`,
  },
  {
    q: "日本行程買吃到飽值得嗎？",
    a: "對大多數觀光客：不值得。日本的飯店、便利商店與觀光區 Wi-Fi 覆蓋很好。3～5 GB 的方案就能撐過一般一週的導航、訊息與瀏覽。吃到飽方案（例如 Holafly）貴 2～3 倍，主要對大量看影片、頻繁視訊，或會去 Wi-Fi 不好的地區的重度使用者有意義。如果拿不定主意，先從 5 GB 開始，再考慮要不要加。",
  },
  {
    q: "到了日本可以加購流量嗎？",
    a: "可以——大多數業者支援在 App 內加值，不需要新的 QR Code。用 Airalo 的話，在 App 裡買一個新方案，它會自動加到你現有的 eSIM 設定檔上。eSIM Go 與 Sakura Mobile 有類似的加值流程。Holafly 的吃到飽方案是固定天數的，待更久就要買新方案。",
  },
  {
    q: "日本的 eSIM 方案含通話與簡訊嗎？",
    a: "大多數面向旅客的 eSIM 方案——包括 Airalo、eSIM Go 與 Holafly——都是純數據，不含語音通話或簡訊。在日本要通話，可以用 WhatsApp、LINE 或 FaceTime 走數據。如果你真的需要一個可以通話的日本號碼，主要業者裡 Sakura Mobile 是最好的選擇。",
  },
  {
    q: "日本 eSIM 什麼時候啟用？",
    a: "出發前就先安裝（掃 QR Code）——這需要 2～5 分鐘和一個 Wi-Fi 連線。不過大多數方案的天數是從你在日本第一次連上網路開始算，不是從你安裝設定檔開始。所以飛機落地後再把數據切到日本的 eSIM，方案才會在你需要的時候才開始跑。",
  },
  {
    q: "日本哪家網路覆蓋最好？",
    a: "Docomo 的鄉間覆蓋最完整，所以如果你的行程會離開主要城市，值得刻意挑它——eSIM Go 與 Sakura Mobile 都走它。SoftBank 與 KDDI（Airalo 與 Holafly 使用）在城市與觀光動線上表現很好。走標準的東京－京都－大阪－廣島路線，四家都夠用，你感覺不出差別。",
  },
  {
    q: "日本網卡什麼時候買？",
    a: "eSIM 出發前就買好，飛機落地立刻啟用——沒有等的理由，也不會賣完。實體 SIM 不一樣：機場櫃台與販賣機在旺季真的會缺熱門方案，而預訂 Sakura Mobile 的 SIM 卡到機場或飯店取件，既比落地現買便宜，也比碰運氣安全。",
  },
  {
    q: "為什麼我的日本 eSIM 速度很慢？",
    a: "幾個可能原因：你用掉了大部分流量（許多方案在門檻後降速）、你在覆蓋不好的地方（隧道、山區），或是在澀谷、京都車站這類擁擠觀光區遇到網路壅塞。先試著開關飛航模式。如果流量還沒用完、速度也沒改善，請聯絡業者客服。",
  },
];

const trail: ZhCrumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "日本網卡推薦" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhBestEsimJapanPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>價格查核時間 {pricesCheckedAt}｜更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            日本網卡推薦（2026）：<br />eSIM 方案比較與 Klook 日本 eSIM
          </h1>
          <p className={styles.heroSubtitle}>
            主要的日本 eSIM 整理在一頁，比價格、流量與網路。已經在 Klook 訂門票的人，另有一個更省事的選擇。
          </p>
          <div className={styles.heroBadges}>
            {["價格每天查核", "4 家 eSIM 比較", "獨立評比"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <ZhDisclosure />

        {/* Klook's Japan eSIM leads this edition: a reader from Taiwan or Hong Kong
            is very likely already holding a Klook account for the tickets, and one
            checkout is a real convenience rather than a sales line. It still carries
            no price, because Klook's product page blocks automated reads — the same
            constraint the English page states. */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>已經在用 Klook？</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>Klook 日本 eSIM：</strong>如果你的門票、一日遊或機場車票已經訂在 Klook 上，
              它自己也賣日本 eSIM——同一個帳號、同一次結帳、一張 QR Code 電子券。對已經在那個平台上的人來說，
              這是最省事的做法。
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.86rem" }}>
              我們不把它放進下面的排名，原因很單純：Klook 的產品頁封鎖自動讀取（我們最後一次嘗試是{" "}
              {klookEsim.checkedAt}），所以我們沒有經過查核的價格或流量級距可以拿來跟其他四家比。
              打開商品頁看目前的方案。下面四家的價格則是每天從它們自己的網站讀取的。
            </p>
            <a href={zhKlookEsim.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看 Klook 日本 eSIM 方案 →
            </a>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>一覽</span>
          <h2 className={styles.sectionTitle}>快速比較</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["業者", "最適合", "最低價", "最便宜方案", "網路", "語音／簡訊", "實體SIM", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {picks.map(({ esimId, name, bestFor, voice, physicalSim, altOf }) => {
                    const cheapest = cheapestPlan(esimId);
                    const affiliateUrl = getProvider(altOf ?? esimId).affiliateUrl;
                    const isExternal = affiliateUrl !== "#";
                    const label = altOf ? "取得 Airalo 吃到飽 eSIM →" : `取得 ${name} →`;
                    return (
                      <tr key={esimId}>
                        <td className={styles.tdProvider}>{name}</td>
                        <td className={styles.tdBestFor}>{bestFor}</td>
                        <td className={styles.tdPrice}>{cheapest ? formatUsd(cheapest.priceUsd) : "—"}</td>
                        <td className={styles.tdNetwork}>{cheapest ? cheapest.name : "—"}</td>
                        <td className={styles.tdNetwork}>{getProvider(esimId).network}</td>
                        <td>{voice ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>{physicalSim ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>
                          {isExternal ? (
                            <a href={affiliateUrl} className={styles.tdLink} target="_blank" rel="sponsored noopener">
                              {label}
                            </a>
                          ) : (
                            <Link href={PLANS_HREF} className={styles.tdLink}>
                              看所有方案（英文）
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Klook, unranked for the reason stated in the box above. */}
                  <tr>
                    <td className={styles.tdProvider}>{zhKlookEsim.label}</td>
                    <td className={styles.tdBestFor}>已經在 Klook 訂門票的人</td>
                    <td className={tools.tdMuted}>在 Klook 查看</td>
                    <td className={tools.tdMuted}>—</td>
                    <td className={tools.tdMuted}>商品頁未標示</td>
                    <td><span className={styles.no}>✗</span></td>
                    <td><span className={styles.no}>✗</span></td>
                    <td>
                      <a href={zhKlookEsim.url} className={styles.tdLink} target="_blank" rel={KLOOK_REL}>
                        查看 Klook eSIM 價格 →
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            <span className={tools.liveBadge}><span className={tools.liveDot} /> 價格每天查核</span>
            <span>
              「最低價」是各業者最便宜的日本方案，時間點為 {pricesCheckedAt}。{" "}
              <Link href={PLANS_HREF} className={tools.inlineLink}>看所有方案、依每 GB 單價排序（英文）→</Link>
            </span>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            只有 Sakura Mobile 賣語音方案與實體 SIM 卡——另外三家都是純數據的 eSIM。如果你需要一個日本電話號碼，
            或你的手機完全不能用 eSIM，在考慮價格之前選擇就只剩一個。
          </p>
        </section>

        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>我們的排名</span>
          <h2 className={styles.sectionTitle}>日本 eSIM 四強</h2>
          <div className={styles.picksList}>
            {picks.map(({ esimId, rank, name, bestFor, target, altOf, altNote }) => {
              const provider = getProvider(esimId);
              const cheapest = cheapestPlan(esimId);
              const affiliateUrl = getProvider(altOf ?? esimId).affiliateUrl;
              const isExternal = affiliateUrl !== "#";
              const label = altOf ? "取得 Airalo 吃到飽 eSIM →" : `取得 ${name} →`;
              return (
                <article key={esimId} id={esimId} className={styles.pickCard}>
                  <div className={styles.pickCardHeader}>
                    <div className={styles.pickRank}>
                      <span className={styles.pickNumber}>{rank}</span>
                      <div className={styles.pickMeta}>
                        <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>{bestFor}</span>
                        <span className={styles.pickName}>{name}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.pickCardBody}>
                    <p className={styles.pickSummary}>
                      網路：{provider.network}。
                      {cheapest ? `最便宜的日本方案為 ${formatUsd(cheapest.priceUsd)}（${cheapest.name}），價格查核時間 ${pricesCheckedAt}。` : ""}
                    </p>
                    <div className={styles.pickTarget}>
                      <span className={styles.pickTargetLabel}>最適合：</span>
                      <span>{target}</span>
                    </div>
                    <div className={styles.pickCtaRow}>
                      {isExternal ? (
                        <a href={affiliateUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
                          {label}
                        </a>
                      ) : (
                        <Link href={PLANS_HREF} className={styles.pickCta}>
                          看所有方案（英文）
                        </Link>
                      )}
                    </div>
                    {altNote && (
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                        {altNote}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>設定教學</span>
          <h2 className={styles.sectionTitle}>日本 eSIM 怎麼安裝</h2>
          <div className={styles.stepsList}>
            {installSteps.map((step, i) => (
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

        <ZhFaqList items={faqItems} />

        <ZhRelated
          items={[
            { href: "/zh-tw/guides/transport/tokyo-airport-transfer", title: "成田機場到東京市區交通（2026）：Skyliner、N'EX 與利木津巴士比較" },
            { href: "/zh-tw/guides/attractions/things-to-do-tokyo", title: "東京自由行景點（2026）：哪些要先訂票、哪些可以現場去" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>門票訂在 Klook，網卡也一起訂</h2>
            <p className={styles.ctaBannerDesc}>
              同一個帳號、同一次結帳、一張 QR Code 電子券。打開商品頁看目前的方案與價格。
            </p>
            <a href={zhKlookEsim.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看 Klook 日本 eSIM →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
