// 繁體中文 edition of /guides/attractions/tokyo-skytree-tickets. Mirrors the English page
// block for block as of 2026-11-01 (same sections, tables, Klook / GetYourGuide CTAs and
// blocks in the same order); every figure comes from the English page or from
// lib/attraction-prices.ts — nothing was re-checked or added for this edition.
import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../../components/BookingEsimCard";
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
// Re-synced with the English guide on 2026-11-10 (answer-first opening, question headings,
// hours and cancellation table, three FAQs). Figures from lib/attraction-prices.ts and
// en.tokyo-skytree.jp, read 10 Nov 2026.
const TITLE = "東京晴空塔門票價格 2026：350 公尺與 450 公尺比較及購票";
const DESC =
  "東京晴空塔門票價格（2026/11 官網查核）：350 公尺天望甲板 ¥1,800 起、350＋450 公尺聯票 ¥3,000 起，現場購票每張加 ¥500。";

const LOCALE = "zh-tw" as const;
const P = PRICES.tokyoSkytree;
const CHECKED = dateLabel(P.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const CHILD = priceLabel(P.child, LOCALE);
const FREE = priceLabel("Free", LOCALE);

const SKYTREE_URL = klookFor(skytreeTicket.url, LOCALE);

const priceRows = [
  { ticket: "350 公尺 — 成人（15 歲以上）", advance: ADULT, sameDay: "另加服務費 ¥500" },
  { ticket: "350 公尺 — 兒童（6～14 歲）", advance: CHILD, sameDay: "另加服務費 ¥500" },
  { ticket: "350 公尺＋450 公尺聯票 —成人", advance: "¥3,000 起", sameDay: "另加服務費 ¥500" },
  { ticket: "350 公尺＋450 公尺聯票 —兒童", advance: "¥1,500 起", sameDay: "另加服務費 ¥500" },
  { ticket: "現場加購 450 公尺 — 成人", advance: "不單獨販售", sameDay: "¥1,400（無服務費）" },
  { ticket: "現場加購 450 公尺 — 兒童", advance: "不單獨販售", sameDay: "¥700（無服務費）" },
  { ticket: "5 歲以下", advance: FREE, sameDay: FREE },
];

// Same rows as the English guide's visitRows, read off en.tokyo-skytree.jp on 10 Nov 2026.
const visitRows = [
  { item: "營業時間（2026 年 11 月 10 日）", detail: "10:00–22:00，最後入場 21:00。營業時間按日期公布，可能未經通知變更；最後入場一律為關門前 1 小時。" },
  { item: "更改日期或時段", detail: "不行。須取消後重新購買；聯票與 350 公尺門票之間互換也一樣。" },
  { item: "取消手續費（官方線上票）", detail: "參觀日 31 天前以前 0%，30 天前起至入場時間 20%，入場時間後 100%。購買後 59 分鐘內取消免手續費。" },
  { item: "當天現場購票", detail: "4 樓售票櫃檯與售票機，每張加 ¥500。可買到的時段依當天而定，可能需要排隊。" },
  { item: "天望迴廊（450 公尺）", detail: "445–450 公尺，最高點 451.2 公尺（Sorakara Point）。由 350 公尺搭天望迴廊專用電梯上去；當天加購可能因人數限制暫停販售。" },
  { item: "人較少的時段", detail: "平日下午、早上剛開門、關門前的晚間時段（依官方擁擠預測頁）。" },
  { item: "最近車站", detail: "東京晴空塔站（東武晴空塔線）、押上站（半藏門線等）。從淺草約 5 分鐘，從東京站約 20 分鐘。" },
];

const whoFor = [
  {
    title: "只買 350 公尺就夠了，如果…",
    desc: `你只想欣賞東京全景，不需要加購。350 公尺是三層樓的主展望台，光是這裡就已經看得到整片關東平原。成人 ${ADULT}，以每公尺高度換算，是東京主要付費展望台裡最便宜的一個。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h-6l3-7z" />
        <line x1="12" y1="9" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "加買 450 公尺，如果…",
    desc: "你特別想登上更高處。450 公尺是 Tembo Galleria（天望迴廊），沿著玻璃牆面向上延伸的空中迴廊，通往塔內最高的參觀樓層。線上聯票 ¥3,000 起；當天在 350 公尺票上加購，要再付 ¥1,400。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "選晚一點的時段，如果…",
    desc: "比起遠方的地平線，你更想看夜景。在查核當天，展望台營業到 22:00，最後入場 21:00；白天時段賣完之後，還看得到空位的通常就是晚場。",
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
    height: "350 公尺與 450 公尺",
    price: "¥1,800 起（350 公尺）；聯票 ¥3,000 起",
    highlight: "東京最高的觀景設施，也是唯一的玻璃空中迴廊",
    area: "押上／東京晴空塔站",
  },
  {
    deck: "澀谷SKY",
    height: "約 229 公尺屋頂",
    price: "線上 ¥2,700（15:00 前）／¥3,400（15:00 後）",
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
    title: "訂票前先決定只買 350 公尺還是買聯票",
    desc: "450 公尺用線上聯票買（成人 ¥3,000 起），比當天在 350 公尺票上加購（多 ¥1,400）便宜。只要有一點可能想上空中迴廊，就一開始買聯票。",
  },
  {
    title: "線上訂指定日期的票",
    desc: `官方網站以上面的「起」價販售指定日期票，實際金額可能更高。當天在 4 樓售票櫃檯或售票機購票，每張票需額外支付 ¥500 服務費——這就是提前購票最直接的好處。查核日 ${CHECKED}。`,
  },
  {
    title: "使用海外發行的信用卡，就透過售票平台購票",
    desc: "Klook 賣的是同一張指定時段入場券，結帳介面有中文、拿到的是電子票，可以避開不少旅客在日本景點官網遇到的刷卡與語言問題。同一個商品頁也有 350 公尺＋450 公尺聯票。",
  },
  {
    title: "查詢造訪當天的營業時間，不要只看一般時間",
    desc: "晴空塔的營業時間依日期公布，官網也明白寫著「營業時間可能未經公告即變更」，最後入場是閉館前一小時。在查核當天，展望台的時間是 10:00–22:00，最後入場 21:00。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "東京晴空塔門票多少錢？",
    a: `官方網站的指定日期票，主展望台 350 公尺成人（15 歲以上）${ADULT}，6～14 歲兒童 ${CHILD}。涵蓋 350 公尺與 450 公尺的聯票成人 ¥3,000 起、兒童 ¥1,500 起。5 歲以下免費。這些都是「起」價，特定日期的金額可能更高。官方網站查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔門票提前買比較便宜嗎？",
    a: `是，而且便宜多少是寫明的，不是看當天需求浮動。當天在 4 樓售票櫃檯或售票機購票，入場費之外每張票需額外支付 ¥500 服務費。一家四口提前線上購票，就能省下 ¥2,000 的服務費。線上訂指定日期票，不論官網或售票平台，都能同時省掉這筆費用和櫃檯排隊。查核日 ${CHECKED}。`,
  },
  {
    q: "350 公尺和 450 公尺差在哪裡？",
    a: "350 公尺是 Tembo Deck（天望甲板），共有三層的主要觀景區，每一張票都含。450 公尺是 Tembo Galleria（天望迴廊），沿著玻璃牆面向上延伸的空中迴廊，通往塔內最高的參觀樓層。450 公尺不能單獨參觀：你必須先有 350 公尺的票，要嘛買線上聯票，要嘛在現場售票機加購（成人 ¥1,400）。",
  },
  {
    q: "450 公尺的票可以線上買嗎？",
    a: `不能單買。官方網站只把 450 公尺放在聯票裡賣；如果已購買 350 公尺門票，到現場才決定加購 450 公尺，就在館內售票機加購，成人 ¥1,400、6～14 歲兒童 ¥700。線上買聯票是比較便宜的那條路——成人 ¥3,000 起，分兩次買則是 ¥1,800 再加 ¥1,400。查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔的營業時間是？",
    a: `東京晴空塔的營業時間依日期公布，並非全年固定，官網也註明「營業時間可能未經公告即變更」，最後入場是閉館前一小時。在查核當天，展望台的時間是 10:00–22:00，最後入場 21:00。要把整個晚上排在這裡之前，請先查詢造訪當天的營業時間。查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔和澀谷SKY 該選哪一個？",
    a: "兩座展望台各有不同特色。晴空塔講的是高度與視野範圍：350 公尺和 450 公尺是東京最高的觀景設施，視野涵蓋整片關東平原，天氣好的時候富士山也在裡面。澀谷SKY 講的是照片：約 229 公尺高的露天屋頂，就在澀谷十字路口正上方，日落時最好看，氣氛大於高度。只能選一個的話，想欣賞遼闊全景就選晴空塔；想拍澀谷經典街景就選澀谷SKY。",
  },
  {
    q: "在東京晴空塔看得到富士山嗎？",
    a: "天氣好的時候看得到——而且憑著高度，在東京各展望台中，看到富士山的機率最高。能見度完全看天氣，涼爽乾燥的月份和一天中較早的時段通常比較好。任何一天都沒有保證，如果你是為了眺望富士山而購買聯票，這點值得先記住。",
  },
  {
    q: "東京晴空塔怎麼去？",
    a: "東京晴空塔就位於東武晴空塔線的「東京晴空塔站」和「押上站」上方；押上站有東京地下鐵半藏門線、都營淺草線與京成押上線。押上在東京地鐵通票的範圍內，所以如果你已經帶著這張票，過去不用多花錢。搭淺草線到淺草只有兩站，兩個地方很容易排在同一個下午。",
  },
  {
    q: "東京晴空塔門票可以改日期或時段嗎？",
    a: `不行。官網說明已購買的門票無法更改，要換日期、時段或票種，必須取消後重新購買。官方線上票在參觀日 31 天前以前取消免手續費，30 天前起至入場時間收 20%，入場時間後無法取消；購買後 59 分鐘內取消也不收費。透過旅行社或售票平台買的票，依該賣家的規定處理。查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔兒童票適用幾歲？",
    a: `兒童票適用 6～14 歲（國中生以下）。15 歲起（含高中生）為成人票，5 歲以下免費。查核日 ${CHECKED}。`,
  },
  {
    q: "450 公尺天望迴廊當天會賣完嗎？",
    a: `可能暫停販售。天望迴廊加購票在當天於 350 公尺天望甲板內的售票機販售，官網提醒可能因人數限制而暫停販售。線上買的聯票，已在你預約的時段含 450 公尺入場。查核日 ${CHECKED}。`,
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
            東京晴空塔門票價格 2026：<br />350 公尺與 450 公尺展望台比較及購票方式
          </h1>
          <p className={styles.heroSubtitle}>
            東京晴空塔門票：350 公尺天望甲板成人 ¥1,800 起，加上 450 公尺天望迴廊的聯票 ¥3,000 起（官網查核日
            {CHECKED}；票價依日期而異，實際價格可能更高）。線上購買指定日期與時段的門票，可免付現場櫃檯與售票機每張 ¥500
            的服務費，而現場能買到的時段依當天而定——想要的時段，尤其是傍晚，最好先訂。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價", "350 公尺 vs 450 公尺"].map((t) => (
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
                <p className={styles.verdictStatLabel}>350 公尺（成人）</p>
                <p className={styles.verdictStatValue}>¥1,800 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>350 公尺＋450 公尺聯票</p>
                <p className={styles.verdictStatValue}>¥3,000 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>當天購票</p>
                <p className={styles.verdictStatValue}>每張需額外支付 ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>5 歲以下</p>
                <p className={styles.verdictStatValue}>{FREE}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>線上訂指定日期的票。晴空塔在當天售票櫃檯每張票收 ¥500 服務費，
              因此提前訂票可省下官方明確標示的費用。如果你有可能想上 450 公尺空中迴廊，
              一開始就買聯票——之後到現場再加購要多付 ¥1,400。票價資料取自官方網站，查核日 {CHECKED}。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SKYTREE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看東京晴空塔門票 →
              </KlookLink>
              <GygCompareButton slug="zh-tw-tokyo-skytree-tickets" listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>

        <BookingEsimCard />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概覽</span>
          <h2 className={styles.sectionTitle}>東京晴空塔門票包含什麼？</h2>
          <p className={styles.bodyText}>
            這一頁講晴空塔的門票、票價與購票；如果還在決定要上哪一座展望台，
            <Link href="/guides/attractions/tokyo-observation-decks">東京展望台比較（英文）</Link>
            把晴空塔和澀谷SKY、東京鐵塔、免費的都廳展望室並排比較。東京晴空塔提供兩種不同高度的展望台門票。<strong>350 公尺</strong>是 Tembo Deck（天望甲板），共有三層的主要觀景區，
            每一張票都含。<strong>450 公尺</strong>是 Tembo Galleria（天望迴廊），沿著玻璃牆面向上延伸的空中迴廊，
            通往塔內最高的參觀樓層——而且它不能單獨參觀。
          </p>
          <p className={styles.bodyText}>
            多數人容易搞混的，就是這兩個展望台的購票方式：兩者的價格取決於你是線上一起買，還是當天分開買。
            下面把這兩種買法並排列出來。
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>2026 年東京晴空塔門票多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人 350 公尺天望甲板 ¥1,800 起、加上 450 公尺天望迴廊的聯票 ¥3,000 起；6～14 歲兒童分別為 ¥900 起與
            ¥1,500 起。在塔內現場購票每張加 ¥500。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.5rem" }}>
                  官方票價（en.tokyo-skytree.jp/ticket），查核日 {CHECKED}。
                </caption>
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
            資料取自東京晴空塔官方網站，查核日 {CHECKED}。官方頁面把這些標為「起」價，所以特定日期的金額可能更高，
            請在訂票時確認。查核的官方資料沒有另列平日與假日票價表，結帳時顯示的當日金額就是實際票價。¥500
            現場服務費按每張票計算，4 樓售票櫃檯與售票機都適用；450 公尺加購票不收服務費。
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一種票</span>
          <h2 className={styles.sectionTitle}>450 公尺天望迴廊值得比 350 公尺多花錢嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            只有在你特別想登上更高處時才值得。成人聯票比只買 350 公尺多 ¥1,200（¥3,000 起 vs ¥1,800 起），
            從 350 公尺再往上到 445–450 公尺的玻璃迴廊，最高點 451.2 公尺。拿不定主意就線上買聯票——當天再加購
            450 公尺要 ¥1,400，而且官網表示人多時可能暫停販售。
          </p>
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

        {/* Booking CTA — after the price table and the which-ticket choice */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>選好票了嗎？</strong>Klook 的 TOKYO SKYTREE 商品頁同時有指定時段入場券與 350 公尺＋450 公尺聯票，
              中文結帳、電子票。實際價格與可選時段，請在商品頁確認。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <KlookLink href={SKYTREE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看 TOKYO SKYTREE 門票 →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Around the tower */}
        <KlookTripPrep
          label="晴空塔周邊"
          heading="押上這一側的行程，還有哪些要先訂"
          intro="一個展望台時段大約一到兩小時，上面那張票是其中唯一需要指定時間的部分。以下是當天下午可一起安排、建議提前預訂的行程——這些行程都和晴空塔在隅田川同一側，也能和門票用同一個帳號預訂。"
          items={tripPrepItems}
        />

        {/* At the door */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>當天</span>
          <h2 className={styles.sectionTitle}>東京晴空塔門票可以現場買嗎？</h2>
          <p className={styles.bodyText}>
            可以，在 4 樓售票櫃檯與售票機買，但每張比線上貴 ¥500；官網也說明當天能買到的時段依當天而定，
            購票可能要排隊。450 公尺天望迴廊加購票在 350 公尺天望甲板內的售票機販售、不收服務費，但人多時可能暫停販售。
          </p>
        </section>

        {/* Best time */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>時段</span>
          <h2 className={styles.sectionTitle}>什麼時候去東京晴空塔最好？</h2>
          <p className={styles.bodyText}>
            想要人少，選平日下午或早上第一個時段；想看夜景，選關門前的一兩個小時。這是官方擁擠預測頁點名的三個時段，
            並提醒新年、黃金週與春假期間人更多。日落時間隨季節改變，傍晚時段請對照造訪當天的日落時間。
            想把晴空塔排進東京行程，可以看{" "}
            <Link href="/zh-tw/guides/attractions/things-to-do-tokyo">東京必做清單</Link>{" "}
            裡還有哪些需要預約時段的景點。
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.5rem" }}>
                  TOKYO SKYTREE 官方網站（營業時間、取消、擁擠預測、交通與樓層介紹頁），查核日 {CHECKED}。
                </caption>
                <thead>
                  <tr>
                    {["項目", "官方資訊"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visitRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>晴空塔和東京其他展望台有什麼不同？</h2>
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
          <h2 className={styles.sectionTitle}>東京晴空塔門票怎麼訂？</h2>
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
            交通是最簡單的部分：東京晴空塔就位於東京晴空塔站與押上站上方，而押上是地鐵站——所以如果你帶著
            <Link href="/guides/attractions/tokyo-subway-ticket">東京地鐵通票（英文）</Link>，
            前往晴空塔的地鐵也包含在內。東京地下鐵與都營兩個路網怎麼搭配，請看我們的
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
            { href: "/zh-tw/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 門票 2026：票價、時間與預約方式" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票攻略 →" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>提前線上訂票，省下現場購票服務費</h2>
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
