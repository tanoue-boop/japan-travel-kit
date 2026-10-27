import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import { seoTags } from "../../../../components/IntlSeo";
import {
  KLOOK_REL,
  Breadcrumb,
  Disclosure,
  FaqList,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import { zhKlookEsim, zhTokyoSubwayTicket } from "../../../../lib/klook-links-zh-tw";
import { attractionPrices, checkedLabel, latestChecked } from "../../../../lib/attraction-prices";
import { pageUpdated } from "../../../../lib/page-dates";
import { itemListJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, TRANSLATED_PAGES, zhDateLabel, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions";
const TITLE = "日本景點門票攻略（2026）：官方票價、預約方式與一日遊";
const DESC =
  "日本景點門票 2026：澀谷SKY、teamLab、東京迪士尼、日本環球影城的官方票價與預約規則，" +
  "加上富士山一日遊、機場交通與日本網卡。票價全部讀自業者官網，並標示查核日期。";

// The hub is the entry point for the ten-page 繁體中文 trial, so it lists exactly
// those ten and nothing else — a hub that links mostly to English pages is not a
// Chinese hub. Everything else on the site is one click away through the English
// hub, which this page links to explicitly and labels as English.
type ZhHubGroup = {
  /** Anchor id, so the nav and the other pages can deep-link a group. */
  key: string;
  label: string;
  desc: string;
  /** zh-tw routes, in the order this hub renders them. */
  routes: string[];
};

const groups: ZhHubGroup[] = [
  {
    key: "tickets",
    label: "門票與景點",
    desc: "單一場館的入場券——指定時段的美術館與展望台。官方票價，以及為什麼「時段」常常比「門票」更重要。",
    routes: [
      "/zh-tw/guides/attractions/shibuya-sky-tickets",
      "/zh-tw/guides/attractions/teamlab-tokyo-tickets",
      "/zh-tw/guides/attractions/teamlab-borderless-tickets",
    ],
  },
  {
    key: "parks",
    label: "主題樂園",
    desc: "東京迪士尼與日本環球影城：票種、快速通關，以及從海外怎麼買。",
    routes: [
      "/zh-tw/guides/attractions/tokyo-disney-tickets",
      "/zh-tw/guides/attractions/usj-tickets-express-pass",
    ],
  },
  {
    // The header's 目的地 → 一日遊 link points at /zh-tw/guides/attractions#daytrips,
    // and the English hub uses the same key for the same group.
    key: "daytrips",
    label: "一日遊",
    desc: "整天出城的行程，要選的是哪一條路線，而不是哪一張票。",
    routes: ["/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo"],
  },
  {
    key: "cities",
    label: "城市攻略",
    desc: "東京哪些要先訂票、哪些可以直接去。",
    routes: ["/zh-tw/guides/attractions/things-to-do-tokyo"],
  },
  {
    key: "prep",
    label: "行前準備",
    desc: "落地那天就會用到的兩件事：機場到市區的交通，以及手機上網。",
    routes: [
      "/zh-tw/guides/transport/tokyo-airport-transfer",
      "/zh-tw/guides/esim/best-esim-japan",
    ],
  },
];

/** Short Chinese blurb per page — one line on what it answers. */
const BLURBS: Record<string, string> = {
  "/zh-tw/guides/attractions/shibuya-sky-tickets":
    "澀谷十字路口上方的開放式屋頂。官方票價、為什麼日落場最先賣完，以及海外信用卡刷不過時怎麼訂。",
  "/zh-tw/guides/attractions/teamlab-tokyo-tickets":
    "豐洲的 Planets：官方票價、30 分鐘入場時段、赤腳涉水區該穿什麼，以及和無界的完整比較。",
  "/zh-tw/guides/attractions/teamlab-borderless-tickets":
    "麻布台之丘的無界：浮動定價怎麼算、指定時段與 Flexible Pass 的差別、營業時間與休館日。",
  "/zh-tw/guides/attractions/tokyo-disney-tickets":
    "每張票都指定日期、門口完全不賣票。怎麼買（包括官網封鎖海外卡時），以及樂園與海洋怎麼選。",
  "/zh-tw/guides/attractions/usj-tickets-express-pass":
    "現在一律線上購票，超級任天堂世界需要指定時間入園。Studio Pass 的分級、快速通關 4／7／8 怎麼挑。",
  "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo":
    "四種行程比較：只跑富士山還是加箱根、Subaru Line 五合目是什麼，以及一天要多久。",
  "/zh-tw/guides/attractions/things-to-do-tokyo":
    "真正會賣完的只有四、五樣。這份短名單說哪些要提前多久訂，哪些可以吃早餐時再決定。",
  "/zh-tw/guides/transport/tokyo-airport-transfer":
    "成田與羽田進市區的每個選項，比價格、時間與方便度，附 2026 年車資與依飯店位置的建議。",
  "/zh-tw/guides/esim/best-esim-japan":
    "Klook 日本 eSIM，加上 Airalo、Holafly、eSIM Go、Sakura Mobile 的價格與網路比較。價格每天查核。",
};

/** The pair rows for this hub's own routes, keyed by route for title lookup. */
const pageByRoute = new Map(TRANSLATED_PAGES.map((p) => [p.zhTw, p]));

const hubRoutes = groups.flatMap((g) => g.routes);

const faqItems: FaqItem[] = [
  {
    q: "日本哪些景點門票一定要提前訂？",
    a: "會賣完的是指定日期與時段的那幾個：東京迪士尼（指定日期，門口完全不賣票）、兩間 teamLab 美術館（指定時段）、澀谷SKY 的日落場，以及日本環球影城（2025 年 5 月起當天門口不再售票）。其他大部分的景點與神社，當天再決定都來得及。",
  },
  {
    q: "為什麼日本官方售票網站刷不過我的海外信用卡？",
    a: "好幾個日本景點的付款頁對海外發行的信用卡處理得不乾淨——澀谷SKY 自 2024 年 7 月起就是如此，東京迪士尼也經常拒絕。這就是為什麼從海外訂票時走售票平台常常比較順：它給你的是看得懂、海外卡刷得過的結帳流程，而不是更便宜的票。",
  },
  {
    q: "這些攻略上的票價是哪裡來的？",
    a: `每一個價格都讀自業者自己的網站——鐵道公司、場館、售票網站——並且每一頁都標示讀取的日期。本站目前已查核 ${attractionPrices.length} 項日本景點、主題樂園、通票與一日遊景點的入場費用，最近一次查核是 ${zhDateLabel(latestChecked())}。繁體中文版與英文版用的是同一組資料、同一個查核日，中文頁不會出現英文頁沒有的數字。`,
  },
  {
    q: "繁體中文版只有這幾頁嗎？",
    a: `目前是。繁體中文版是試行版，共 ${TRANSLATED_PAGES.length} 頁，挑的是銷售與點擊實績最高的那幾個入口頁。其他的攻略（京都、大阪、鐵路周遊券、付款與貨幣等）目前只有英文版，連結到那些頁面時我們會標示「（英文）」。每一頁的右上角都有 English／繁體中文 切換，只在該頁兩種語言都有時才顯示。`,
  },
];

const trail: Crumb[] = [{ label: "日本景點門票" }];

/**
 * "Updated" labels for the cards, in Chinese. The English hubs use
 * `articleDates`, which formats in en-US; here the ISO date comes straight out of
 * `pageUpdated` and `zhMonthLabel` does the formatting, so both editions read the
 * same git history and only the wording differs.
 */
export const getStaticProps = () => ({
  props: {
    dates: Object.fromEntries(hubRoutes.map((route) => [route, zhMonthLabel(pageUpdated(route).iso)])),
  },
});

export default function ZhAttractionsHubPage({ dates }: { dates: Record<string, string> }) {
  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: itemListJsonLd({
              route: ROUTE,
              name: "日本景點門票攻略 — Japan Travel Kit 繁體中文版",
              description: DESC,
              inLanguage: JSONLD_LANG["zh-tw"],
              items: hubRoutes.map((route) => ({
                href: route,
                title: pageByRoute.get(route)?.zhTitle ?? route,
              })),
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>繁體中文版</p>
          <h1 className={styles.heroTitle}>
            日本景點門票攻略（2026）：<br />官方票價、預約方式與一日遊
          </h1>
          <p className={styles.heroSubtitle}>
            會賣完的那幾張票、從海外行得通的購票管道，以及每一個價格的查核日期。
          </p>
          <div className={styles.heroBadges}>
            {["官方票價", "附查核日期", `${TRANSLATED_PAGES.length} 篇繁體中文攻略`].map((t) => (
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
          <span className={styles.sectionLabel}>先看這個</span>
          <h2 className={styles.sectionTitle}>日本的門票，問題不在價格</h2>
          <p className={styles.bodyText}>
            日本幾個最有名的景點，門口是買不到票的。teamLab、東京迪士尼、日本環球影城與澀谷SKY 的日落場，
            全都在線上販售指定日期與時段的票，熱門時段數週前就沒了——迪士尼的情況更極端，完全沒有當日票。
          </p>
          <p className={styles.bodyText}>
            有兩件事特別容易讓旅客踩雷：官方網站有時刷不過海外發行的信用卡，而搜尋結果裡排名很前面的轉售頁面，
            常常是入場時無效的票。這些攻略寫的是官方票價、從海外行得通的購票管道，以及該什麼時候訂。
          </p>
          <p className={styles.bodyText}>
            日本也有很多地方完全不需要這些。京都多數知名寺院可以直接走進去，奈良公園免費，
            和服體驗或料理課前一週訂都還來得及。這些攻略的重點是：把規劃的力氣花在真的會影響結果的地方。
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.86rem", color: "var(--text-muted)" }}>
            本站目前已查核 {attractionPrices.length} 項日本景點、主題樂園、通票與一日遊景點的官方入場費用，
            最近一次查核是 {zhDateLabel(latestChecked())}（英文版記為 {checkedLabel(latestChecked())}）。
            完整的總表目前只有英文版：{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              日本景點門票價格總表（英文）→
            </Link>
          </p>
        </section>

        {groups.map((group) => (
          <section key={group.key} id={group.key} className={styles.bodySection}>
            <span className={styles.sectionLabel}>{group.label}</span>
            <h2 className={styles.sectionTitle}>{group.label}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>{group.desc}</p>
            <div className={styles.relatedGrid}>
              {group.routes.map((route) => (
                <Link key={route} href={route} className={styles.relatedCard}>
                  <div className={styles.relatedMeta}>
                    <p className={styles.relatedTitle}>{pageByRoute.get(route)?.zhTitle ?? route}</p>
                    <p className={styles.bodyText} style={{ fontSize: "0.85rem", margin: "0.4rem 0 0.6rem" }}>
                      {BLURBS[route]}
                    </p>
                    <span className={styles.relatedArrow}>更新於 {dates[route]}｜看攻略 →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>其他語言</span>
          <h2 className={styles.sectionTitle}>還沒翻譯的部分</h2>
          <p className={styles.bodyText}>
            繁體中文版目前是 {TRANSLATED_PAGES.length} 頁的試行版。京都與大阪的城市攻略、其他的一日遊、
            鐵路周遊券、IC 卡、付款與貨幣，以及完整的門票價格總表，目前只有英文版：{" "}
            <Link href="/guides/attractions" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>
              Things to Do in Japan（英文）
            </Link>
            {" "}與{" "}
            <Link href="/guides" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>
              全部攻略（英文）
            </Link>
            。每一頁兩種語言都有的時候，頁首會出現 English／繁體中文 的切換。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>落地那天</span>
          <h2 className={styles.sectionTitle}>兩件先放進口袋的事</h2>
          <p className={styles.bodyText}>
            通關之後最先用到的兩樣東西：手機上網，以及市區交通。打開商品頁看目前的方案與價格。
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <KlookLink href={zhKlookEsim.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              {zhKlookEsim.label} →
            </KlookLink>
            <KlookLink href={zhTokyoSubwayTicket.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              {zhTokyoSubwayTicket.label} →
            </KlookLink>
          </div>
        </section>

        <FaqList items={faqItems} />
      </div>
    </>
  );
}
