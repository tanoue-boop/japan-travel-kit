// 繁體中文 edition of /guides/attractions/tokyo-skytree-tickets. Mirrors the English page
// block for block as of 2026-11-01 (same sections, tables, Klook / GetYourGuide CTAs and
// blocks in the same order); every figure comes from the English page or from
// lib/attraction-prices.ts — nothing was re-checked or added for this edition.
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
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../../components/GygCompare";
import { gygTokyoSkytree } from "../../../../lib/gyg-links";
import {
  skytreeTicket,
  skytreeAquariumCombo,
  fujiHakoneDayTour,
  tokyoSightseeingBusTour,
  skytreeTripPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions/tokyo-skytree-tickets";
const TITLE = "東京晴空塔門票（2026）：票價與樓層選擇";
const DESC =
  "東京晴空塔門票 2026：350 樓展望台 ¥1,800 起、350＋450 套票 ¥3,000 起，當天購票每張多 ¥500。";

const LOCALE = "zh-tw" as const;
const P = PRICES.tokyoSkytree;
const CHECKED = dateLabel(P.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const CHILD = priceLabel(P.child, LOCALE);
const FREE = priceLabel("Free", LOCALE);

const SKYTREE_URL = klookFor(skytreeTicket.url, LOCALE);

const priceRows = [
  { ticket: "350 樓 — 成人（15 歲以上）", advance: ADULT, sameDay: "另加服務費 ¥500" },
  { ticket: "350 樓 — 兒童（6～14 歲）", advance: CHILD, sameDay: "另加服務費 ¥500" },
  { ticket: "350＋450 樓套票 — 成人", advance: "¥3,000 起", sameDay: "另加服務費 ¥500" },
  { ticket: "350＋450 樓套票 — 兒童", advance: "¥1,500 起", sameDay: "另加服務費 ¥500" },
  { ticket: "現場加購 450 樓 — 成人", advance: "線上不販售", sameDay: "¥1,400" },
  { ticket: "現場加購 450 樓 — 兒童", advance: "線上不販售", sameDay: "¥700" },
  { ticket: "5 歲以下", advance: FREE, sameDay: FREE },
];

const whoFor = [
  {
    title: "只買 350 樓就夠了，如果…",
    desc: `你要的是視野，不是加購。350 樓是三層樓的主展望台，光是這裡就已經看得到整片關東平原。成人 ${ADULT}，以每公尺高度換算，是東京主要付費展望台裡最便宜的一個。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h-6l3-7z" />
        <line x1="12" y1="9" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "加買 450 樓，如果…",
    desc: "高度本身就是這趟的目的。450 樓是 Tembo Galleria，一條斜斜往上繞的玻璃空中迴廊，通到塔內可抵達的最高點。線上套票 ¥3,000 起；當天在 350 樓票上加購，要再付 ¥1,400。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "選晚一點的時段，如果…",
    desc: "你更想要夜景而不是地平線。在查核當天，展望台營業到 22:00，最後入場 21:00；白天時段賣完之後，還看得到空位的通常就是晚場。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const deckRows = [
  {
    deck: "東京晴空塔",
    height: "350 樓與 450 樓",
    price: "¥1,800 起（350 樓）・套票 ¥3,000 起",
    highlight: "東京最高的展望台，也是唯一的玻璃空中迴廊",
    area: "押上／東京晴空塔站",
  },
  {
    deck: "澀谷SKY",
    height: "約 229 公尺屋頂",
    price: "線上預購 ¥2,500",
    highlight: "澀谷十字路口正上方的露天屋頂——重點是那張照片，不是高度",
    area: "澀谷站",
  },
  {
    deck: "東京鐵塔",
    height: "約 150 公尺與約 250 公尺兩層",
    price: "約 ¥3,300（Top Deck Tour）",
    highlight: "1958 年的地標，而且視野裡看得到晴空塔",
    area: "芝公園／赤羽橋",
  },
  {
    deck: "東京都廳",
    height: "約 202 公尺",
    price: FREE,
    highlight: "完全不用買票——東京最划算的城市全景",
    area: "新宿",
  },
];

const steps = [
  {
    title: "訂票前先決定只買 350 樓還是買套票",
    desc: "450 樓用線上套票買（成人 ¥3,000 起），比當天在 350 樓票上加購（多 ¥1,400）便宜。只要有一點可能想上空中迴廊，就一開始買套票。",
  },
  {
    title: "線上訂指定日期的票",
    desc: `官方網站以上面的「起」價販售指定日期票，你那天的實際金額可能更高。當天在 4 樓售票櫃台或便利商店購買，每張票要另加 ¥500 服務費——這是提前訂票最明確的理由。查核日 ${CHECKED}。`,
  },
  {
    title: "信用卡是海外發行的，就透過售票平台買",
    desc: "Klook 賣的是同一張指定時段入場券，結帳介面有中文、拿到的是電子票，可以避開不少旅客在日本景點官網遇到的刷卡與語言問題。同一個商品頁也有 450 樓套票。",
  },
  {
    title: "查你那一天的營業時間，不要看一般時間",
    desc: "晴空塔公布的是逐日營業行事曆，官網也明白寫著「營業時間可能未經公告即變更」，最後入場是閉館前一小時。在查核當天，展望台的時間是 10:00–22:00，最後入場 21:00。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "東京晴空塔門票多少錢？",
    a: `官方網站的指定日期票，主展望台 350 樓成人（15 歲以上）${ADULT}，6～14 歲兒童 ${CHILD}。涵蓋 350 樓與 450 樓的套票成人 ¥3,000 起、兒童 ¥1,500 起。5 歲以下免費。這些都是「起」價，特定日期的金額可能更高。官方網站查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔門票提前買比較便宜嗎？",
    a: `是，而且便宜多少是寫明的，不是看當天需求浮動。當天在 4 樓售票櫃台——或便利商店——購買，入場費之外每張票要再加 ¥500 服務費。一家四口就是 ¥2,000 本來可以省下的錢。線上訂指定日期票，不論官網或售票平台，都能同時省掉這筆費用和櫃台排隊。查核日 ${CHECKED}。`,
  },
  {
    q: "350 樓和 450 樓差在哪裡？",
    a: "350 樓是 Tembo Deck（天望甲板），三層樓的主展望層，每一張票都含。450 樓是 Tembo Galleria（天望迴廊），一條玻璃牆面、斜斜往上繞的空中迴廊，通到塔內可抵達的最高點。450 樓不能單獨參觀：你必須先有 350 樓的票，要嘛買線上套票，要嘛在現場售票機加購（成人 ¥1,400）。",
  },
  {
    q: "450 樓的票可以線上買嗎？",
    a: `不能單買。官方網站只把 450 樓放在套票裡賣；如果你拿著 350 樓的票到現場才改變主意，就在館內售票機加購，成人 ¥1,400、6～14 歲兒童 ¥700。線上買套票是比較便宜的那條路——成人 ¥3,000 起，分兩次買則是 ¥1,800 再加 ¥1,400。查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔的營業時間是？",
    a: `晴空塔用的是逐日行事曆，而不是一張固定時刻表，官網也註明「營業時間可能未經公告即變更」，最後入場是閉館前一小時。在查核當天，展望台的時間是 10:00–22:00，最後入場 21:00。要把整個晚上排在這裡之前，請先用你自己的日期查一下行事曆。查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔和澀谷SKY 該選哪一個？",
    a: "它們回答的是不同問題。晴空塔講的是高度與視野範圍：350 樓和 450 樓是東京最高的展望台，視野涵蓋整片關東平原，天氣好的時候富士山也在裡面。澀谷SKY 講的是照片：約 229 公尺高的露天屋頂，就在澀谷十字路口正上方，日落時最好看，氣氛大於高度。只能選一個的話，要全景選晴空塔，要那張大家都認得的照片選澀谷SKY。",
  },
  {
    q: "在東京晴空塔看得到富士山嗎？",
    a: "天氣好的時候看得到——而且憑著高度，它的機率是東京各展望台裡最高的。能見度完全看天氣，涼爽乾燥的月份和一天中較早的時段通常比較好。任何一天都沒有保證，如果你是專為富士山視野才付套票價，這點值得先記住。",
  },
  {
    q: "東京晴空塔怎麼去？",
    a: "塔就蓋在東武晴空塔線的「東京晴空塔站」和「押上站」上方；押上站有東京地下鐵半藏門線、都營淺草線與京成押上線。押上在東京地鐵通票的範圍內，所以如果你已經帶著這張票，過去不用多花錢。搭淺草線到淺草只有兩站，兩個地方很容易排在同一個下午。",
  },
];

// The English page's Around-the-tower block, same four products in the same order.
const tripPrepItems = [
  withKlookLocale(skytreeTripPrep[0], LOCALE, {
    label: "上野／淺草周邊飯店",
    ctaLabel: "在 Klook 查看上野與淺草的飯店 →",
    why: "就在晴空塔這一側的河岸：上野在山手線上，銀座線從上野通到淺草，押上再搭淺草線兩站就到——晚場看完夜景，不必橫跨整個東京回飯店。",
  }),
  withKlookLocale(skytreeTripPrep[1], LOCALE, {
    label: "淺草 Kimono Yae 和服租借",
    ctaLabel: "查看淺草和服租借 →",
    why: "同一趟行程的白天部分，只隔兩站：店就在雷門旁邊，商品頁要求 17:30 前歸還——剛好排在晚場晴空塔之前，而不是跟它搶時間。",
  }),
  withKlookLocale(skytreeTripPrep[2], LOCALE, {
    label: "東京隨上隨下觀光巴士（Skyhop Bus）",
    ctaLabel: "查看露天巴士票 →",
    why: "露天雙層的隨上隨下車票，路線包含淺草——如果這一天同時有淺草寺和晴空塔，比每段都各付一次地鐵車資更適合。",
  }),
  withKlookLocale(skytreeTripPrep[3], LOCALE, {
    label: "東京地鐵通票（24／48／72小時）",
    ctaLabel: "查看地鐵通票 →",
    why: "押上是半藏門線與都營淺草線的地鐵站，所以 24、48 或 72 小時的東京地鐵與都營通票本身就涵蓋去晴空塔的車程——之後去淺草寺的兩站也包含在內。",
  }),
];

const tourPicks = [
  withKlookLocale(skytreeAquariumCombo, LOCALE, {
    title: "東京晴空塔＋墨田水族館套票",
    desc: "展望台加上塔底同一個晴空街道商場裡的水族館，一張票搞定",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "東京觀光巴士一日遊",
    desc: "有導覽的巴士行程，繞行皇居外苑、淺草與東京晴空塔，附多語言語音導覽",
  }),
  withKlookLocale(fujiHakoneDayTour, LOCALE, {
    title: "富士山＋箱根一日遊",
    desc: "富士山五合目搭配箱根火山區與蘆之湖，從東京出發一天來回",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "東京晴空塔門票" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTokyoSkytreePage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

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
              inLanguage: JSONLD_LANG[LOCALE],
            }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            東京晴空塔門票（2026）：<br />票價、350 與 450 樓怎麼選、怎麼訂
          </h1>
          <p className={styles.heroSubtitle}>
            東京最高的展望台，也是少數「當天才買」有明文代價的景點。這裡整理官方票價、450 樓實際多給你什麼，
            以及從海外怎麼訂。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價", "350 樓 vs 450 樓"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>350 樓（成人）</p>
                <p className={styles.verdictStatValue}>¥1,800 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>350＋450 套票</p>
                <p className={styles.verdictStatValue}>¥3,000 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>當天購票</p>
                <p className={styles.verdictStatValue}>每張多 ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>5 歲以下</p>
                <p className={styles.verdictStatValue}>{FREE}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>線上訂指定日期的票。晴空塔在當天售票櫃台每張票收 ¥500 服務費，
              所以提前訂票省下的是一個公告的金額，不是靠運氣。如果你有可能想上 450 樓空中迴廊，
              一開始就買套票——之後到現場再加購要多付 ¥1,400。票價讀自官方網站，查核日 {CHECKED}。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SKYTREE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看東京晴空塔門票 →
              </KlookLink>
              <GygCompareButton slug="zh-tw-tokyo-skytree-tickets" listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概覽</span>
          <h2 className={styles.sectionTitle}>你買到的是什麼</h2>
          <p className={styles.bodyText}>
            東京晴空塔賣的是兩個不同樓層的入場。<strong>350 樓</strong>是 Tembo Deck（天望甲板），三層樓的展望層，
            每一張票都含。<strong>450 樓</strong>是 Tembo Galleria（天望迴廊），一條斜斜往上繞的玻璃牆面空中迴廊，
            通到塔內可抵達的最高點——而且它不能單獨參觀。
          </p>
          <p className={styles.bodyText}>
            大部分的困惑都來自這個兩層結構：兩層的價格取決於你是線上一起買，還是當天分開買。
            下面把這兩條路並排列出來。
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>東京晴空塔門票價格</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "線上指定日期", "當天現場"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.advance}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            讀自東京晴空塔官方網站，查核日 {CHECKED}。官方頁面把這些標為「起」價，所以特定日期的金額可能更高，
            請在訂票時確認。¥500 當天服務費按每張票計算，4 樓售票櫃台與便利商店都適用。
          </p>
        </section>

        {/* Around the tower */}
        <KlookTripPrep
          label="晴空塔周邊"
          heading="押上這一側的行程，還有哪些要先訂"
          intro="一個展望台時段大約一到兩小時，上面那張票是其中唯一需要指定時間的部分。下面這些是那個下午其餘行程要靠的預訂——全都和晴空塔在河的同一側，也都和門票在同一個帳號裡。"
          items={tripPrepItems}
        />

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一種票</span>
          <h2 className={styles.sectionTitle}>350 樓、套票，還是晚場？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>晴空塔 vs 東京其他展望台</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            晴空塔是「高度」的選擇。如果你真正想要的是澀谷十字路口那張照片，
            <Link href="/zh-tw/guides/attractions/shibuya-sky-tickets">澀谷SKY</Link>{" "}
            會更值得；如果想完全不花錢看城市全景，新宿的東京都廳展望室是免費的。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["展望台", "高度", "票價（約）", "特色", "區域"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            晴空塔與澀谷SKY 的數字來自業者自己的網站；東京鐵塔與都廳為約略值，可能變動。請在訂票時確認。
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>東京晴空塔門票怎麼訂</h2>
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
            交通是最簡單的部分：塔就蓋在東京晴空塔站與押上站上面，而押上是地鐵站——所以如果你帶著
            <Link href="/guides/attractions/tokyo-subway-ticket">東京地鐵通票（英文）</Link>，
            過去就包含在內。東京地下鐵與都營兩個路網怎麼搭配，請看我們的
            <Link href="/guides/transport/tokyo-transportation">東京交通指南（英文）</Link>。
          </p>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="和這一天的其他行程一起訂"
          intro="一個晴空塔時段大約一到兩小時。下面這些商品和門票在同一個 Klook 帳號裡，這一天其餘的行程可以在同一次結帳中訂好。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-bay-cruise", title: "東京灣遊船（2026）：屋形船與 Symphony 比較、時間與票價（英文）" },
            { href: "/guides/attractions/asakusa-kimono-rental", title: "淺草和服租借（2026）：歸還時間、髮型與拍照地點（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "東京三天行程（2026）：要訂什麼、照什麼順序訂（英文）" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "東京鐵塔門票（2026）：票價、Main Deck 與 Top Deck 比較與預約方式（英文）" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "東京地鐵通票（2026）：24、48 還是 72 小時？值得買嗎（英文）" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "華納兄弟東京影城之旅門票（2026）：票價與預約方式（英文）" },
            { href: "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日遊（東京出發．2026）：行程怎麼選、五合目看什麼" },
            { href: "/zh-tw/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 門票（2026）：票價、預約方式與無界比較" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票攻略 →" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>在櫃台多收你錢之前先訂好</h2>
            <p className={styles.ctaBannerDesc}>
              當天購票每人要另加 ¥500 服務費。線上訂的指定日期票同時省掉這筆費用和排隊——
              而 Klook 的結帳介面有中文，用海外發行的信用卡也能付款。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SKYTREE_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看東京晴空塔門票 →
              </KlookLink>
              <GygCompareButton slug="zh-tw-tokyo-skytree-tickets" listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
