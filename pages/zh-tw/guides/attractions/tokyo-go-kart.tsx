import type { ReactNode } from "react";
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
import {
  akihabaraGoKartTour,
  asakusaGoKartTour,
  asakusaSensojiWalkingTour,
  klookEsim,
  shibuyaAnnexGoKartTour,
  shinjukuNightFoodWalkingTour,
  tokyoBayGoKartTour,
  tokyoGoKartingListUrl,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/tokyo-go-kart) section by section as of
// 2026-11-24 (task-jtk-20261124-TR03): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added. Title term:
// 東京卡丁車 — the name Klook zh-TW and Taiwan/Hong Kong travel guides use, with 國際駕照.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/tokyo-go-kart";
const TITLE = "東京卡丁車 2026：價格、國際駕照與路線";
const H1 = "東京卡丁車 2026：街頭卡丁車價格、國際駕照與路線";
const DESC =
  "東京街頭卡丁車依官方價目表每人 ¥5,000–¥25,000。需備妥 1949 年日內瓦公約國際駕照、本國駕照與護照正本，可在 Klook 預訂。";

const LAST_CHECKED = "2026-11-15";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);
const NPA_CHECKED = dateLabel("2026-11-07", LOCALE);

// The English page's Akiba Kart Shibuya listing (its GOKART_URL), on Klook's zh-TW path.
const GOKART_URL = klookFor(
  "https://www.klook.com/en-US/activity/116875-shibuya-go-karting-experience-by-akiba-kart-shibuya/",
  LOCALE,
);
const ANNEX_URL = klookFor(shibuyaAnnexGoKartTour.url, LOCALE);
const AKIHABARA_URL = klookFor(akihabaraGoKartTour.url, LOCALE);
const BAY_URL = klookFor(tokyoBayGoKartTour.url, LOCALE);
const ASAKUSA_URL = klookFor(asakusaGoKartTour.url, LOCALE);
const LIST_URL = klookFor(tokyoGoKartingListUrl, LOCALE);
const BUS_URL = klookFor(tokyoSightseeingBusTour.url, LOCALE);
const FOOD_WALK_URL = klookFor(shinjukuNightFoodWalkingTour.url, LOCALE);
const ASAKUSA_WALK_URL = klookFor(asakusaSensojiWalkingTour.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const srcStyle = { color: "var(--text-muted)" } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  { shop: "不知道怎麼選？推薦這條路線：澀谷 Annex 店（H2-S）", route: "道玄坂、澀谷全向十字路口、表參道、原宿", time: "約 1 小時", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: ANNEX_URL, bookLabel: "Klook 澀谷 Annex 店" },
  { shop: "澀谷店（H-S）", route: "澀谷全向十字路口、原宿、表參道", time: "約 1 小時", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: GOKART_URL, bookLabel: "Klook 澀谷店" },
  { shop: "秋葉原 1 號店（A1-S）", route: "秋葉原主要街道", time: "約 1 小時", day: "¥9,000", evening: "¥12,000", regular: "¥15,000", book: AKIHABARA_URL, bookLabel: "Klook 秋葉原店" },
  { shop: "秋葉原 2 號店（A2-S）", route: "秋葉原、東京車站、銀座", time: "約 1 小時", day: "¥9,000", evening: "未列出", regular: "¥15,000", book: AKIHABARA_URL, bookLabel: "Klook 秋葉原店" },
  { shop: "秋葉原 2 號店（A2-M）", route: "皇居周邊、原宿、澀谷全向十字路口", time: "1.5 至 2 小時", day: "¥12,000", evening: "¥17,500", regular: "¥20,000", book: AKIHABARA_URL, bookLabel: "Klook 秋葉原店" },
  { shop: "東京灣店（K-M）", route: "彩虹大橋與東京鐵塔", time: "1.5 至 2 小時", day: "¥14,000", evening: "¥22,000", regular: "¥25,000", book: BAY_URL, bookLabel: "Klook 東京灣店" },
  { shop: "品川店（S-S）", route: "從品川到東京鐵塔", time: "約 1 小時", day: "¥14,000", evening: "¥16,000", regular: "¥20,000", book: LIST_URL, bookLabel: "Klook 東京卡丁車列表" },
  { shop: "淺草店（Samurai-S）", route: "淺草周邊", time: "45 分鐘至 1 小時", day: "¥5,000", evening: "¥6,000", regular: "¥12,000", book: ASAKUSA_URL, bookLabel: "Klook 淺草店" },
];

const licenceRows = [
  { doc: "多數旅客適用：1949 年日內瓦公約紙本國際駕照 + 本國駕照 + 護照", drive: "可以", note: "限出發前在本國申辦的紙本冊式。卡片式、電子版、單頁式國際駕照及影本均無效" },
  { doc: "只有 1968 年維也納公約國際駕照", drive: "不可以", note: "JAF：在日本只有 1949 年日內瓦公約國際駕照有效。若封面標示 1968，Street Kart 建議您先與門市聯繫" },
  { doc: "日本駕照", drive: "可以", note: "Street Kart 的駕照說明頁面將日本駕照列為第一項。輕型機車及機車駕照皆不適用" },
  { doc: "瑞士、德國、法國、台灣、比利時或摩納哥駕照 + 認可的日文譯本", drive: "可以", note: "譯本可取代國際駕照。JAF 只受理在日本境內提出的線上申請" },
  { doc: "SOFA 駕照（駐日美軍）", drive: "可以", note: "列於 Street Kart 駕照說明頁面" },
  { doc: "沒有駕照，或持有非 1949 年日內瓦公約締約國核發的駕照", drive: "不可以", note: "沒有乘客座位，店家當天也無法核發任何證件" },
];

const includedRows = [
  { item: "隨團導遊與卡丁車", status: "包含", note: "先進行安全說明，每位導遊最多帶領 6 位駕駛者" },
  { item: "燃料", status: "包含", note: "參加行程的旅客不需自行加油" },
  { item: "基本保險", status: "包含", note: "理賠上限：第三人傷害 ¥80,000,000、第三人財物損失 ¥20,000,000、駕駛者本人傷害 ¥5,000,000" },
  { item: "卡丁車損壞自負額", status: "不包含", note: "每輛 ¥50,000，卡丁車損壞時於行程結束後立即收取" },
  { item: "全險", status: "加購選項", note: "第三人傷害、第三人財物損失及卡丁車損壞的理賠無上限，駕駛者本人傷害的理賠上限提高至 ¥30,000,000" },
  { item: "服裝", status: "請確認預訂內容", note: "報到時挑選一套，服裝也有提供租借及販售" },
  { item: "運動攝影機", status: "加購選項", note: "可在店內租借，或自行攜帶" },
  { item: "國際駕照或譯本", status: "不包含", note: "須自行備妥，店家無法核發國際駕照或譯本" },
];

const fitRows = [
  { rule: "年齡限制", value: "18 歲", source: "Klook 秋葉原商品頁面與 Klook 卡丁車介紹" },
  { rule: "身高", value: "Klook 秋葉原行程的身高限制為 150–185 公分，Akiba Kart 澀谷行程則為 150–190 公分", source: "Klook 商品頁面" },
  { rule: "體重", value: "未滿 100 公斤", source: "Klook 秋葉原商品頁面" },
  { rule: "駕駛能力", value: "自排卡丁車，必須具備在一般道路駕駛的能力", source: "Street Kart 常見問題與使用條款" },
  { rule: "服裝", value: "不可穿高跟鞋、涼鞋或長裙", source: "Street Kart 各店頁面" },
];

const startRows = [
  { shop: "秋葉原 1 號店", address: "千代田區外神田 4-12-9", access: "末廣町站 1 號出口 3 分鐘；JR 秋葉原站 7 分鐘" },
  { shop: "秋葉原 2 號店", address: "千代田區神田佐久間町 4-16-7", access: "JR 秋葉原站（昭和通口）8 分鐘" },
  { shop: "澀谷店", address: "澀谷區圓山町 15-3", access: "京王井之頭線神泉站 3 分鐘；JR 澀谷站 15 分鐘" },
  { shop: "澀谷 Annex 店", address: "圓山町 10-11 The City Shibuya 2 樓", access: "京王井之頭線神泉站 5 分鐘；JR 澀谷站 15 分鐘" },
  { shop: "品川店", address: "品川區北品川 1-23-15", access: "京急北品川站 5 分鐘；JR 品川站 15 分鐘" },
  { shop: "淺草店", address: "台東區西淺草 3-25-31", access: "東京 Metro 淺草站 8 分鐘" },
  { shop: "東京灣店", address: "江東區新木場 2-10-8", access: "新木場站 10 至 13 分鐘" },
];

const whoFor = [
  {
    title: "持有正式駕照且有駕駛信心的人",
    desc: "您持有本國有效的正式駕照、習慣在一般道路開車，並已在出發前申辦國際駕照。這是專為持有駕照的成年人設計的行程，不是遊樂園設施。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h2l1-3h12l1 3h2" />
        <path d="M5 12v5h14v-5" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    title: "想換個角度看東京的旅客",
    desc: "您想駕駛沒有車頂的卡丁車，迎著風、以貼近路面的視角欣賞東京鐵塔、台場及彩虹大橋等地標周邊。熱門路線風景優美且由導遊帶領，只要跟著前方帶隊的導遊即可。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "不具備在日本合法駕駛資格的人不適合",
    desc: "如果您未滿 18 歲、沒有駕照，或持有日本不承認的外國駕照，就不能合法駕駛這些卡丁車。店家當天也無法協助補辦，請在預訂前備妥證件。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "出國前先在本國申辦國際駕照",
    desc: "1949 年日內瓦公約國際駕照只能在本國申辦，無法在日本辦理。必須是紙本冊式，卡片式、電子版與單頁式國際駕照均無效，網路上也有販售假國際駕照的業者。若您的駕照是由瑞士、德國、法國、台灣、比利時或摩納哥核發，則需改用認可的日文譯本。JAF 只受理在日本境內提出的線上申請，平均需要 2 至 3 個工作天，請在旅程初期預留申請時間，或洽詢駕照核發國家或地區的駐日代表機構。",
  },
  {
    title: "帶齊三項證件正本：國際駕照、本國駕照與護照",
    desc: "當天必須攜帶所有正本：本國駕照正本、國際駕照（或 JAF／大使館譯本）以及護照。不接受影本、手機內的證件照片及電子駕照，沒有帶正本就無法參加行程，也不會退費。",
  },
  {
    title: "確認您符合參加條件",
    desc: `Klook 商品頁面規定最低年齡為 18 歲，也須持有在日本有效的駕照（1949 年日內瓦公約國際駕照，或上述國家適用的譯本）。輕型機車與機車駕照不適用。Street Kart 也歡迎您在預訂後傳送證件照片，供門市事先確認證件。卡丁車為單人座，無法搭載乘客。Street Kart 規定於 ${CHECKED} 確認，Klook 年齡限制於 ${NPA_CHECKED} 確認。`,
  },
  {
    title: "提前預訂，並提早抵達門市參加安全說明",
    desc: `透過線上預訂選擇時段及路線。Street Kart 要求旅客於預訂時段前 30 分鐘抵達門市，進行證件檢查與安全說明，遲到者無法參加。請記得日本是靠左行駛。行程由導遊帶領，全程跟著前方帶隊的導遊駕駛。以上為 ${CHECKED} 的資訊。`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "在東京開卡丁車需要駕照嗎？",
    a: "需要。東京的街頭卡丁車行駛在一般道路上，因此您需要日本駕照，或本國駕照加上依 1949 年日內瓦公約核發的紙本國際駕照與護照，而且全部都要是正本。瑞士、德國、法國、台灣、比利時與摩納哥的駕照則以認可的日文譯本取代國際駕照。國際駕照只能在出發前於本國申辦。",
  },
  {
    q: "東京街頭卡丁車多少錢？",
    a: `Street Kart 2026 年 11 月的官方價目表中，每人最低價格為淺草 45 分鐘至 1 小時路線 ¥5,000、秋葉原 ¥9,000、澀谷 ¥16,000，1.5 至 2 小時的秋葉原與東京灣路線為 ¥12,000 至 ¥14,000。原價最高 ¥25,000。查核日期：${CHECKED}。`,
  },
  {
    q: "依 1968 年維也納公約核發的國際駕照可以在日本使用嗎？",
    a: "不可以。JAF 表示在日本只有依 1949 年日內瓦公約核發的國際駕照有效，依 1968 年維也納公約等其他公約核發的國際駕照無效。Street Kart 也補充，多數有效國際駕照的封面皆印有 1949，若您的封面印的是 1968，請先與門市聯繫。",
  },
  {
    q: "下雨天或冬天可以在東京開卡丁車嗎？",
    a: "原則上可以。Street Kart 表示，通常不受天氣影響，行程照常進行，不確定時請聯絡店家；東京各門市的價目表皆列有全年 12 個月的預訂時段，包括 12 月至 2 月。不過依使用條款，店家仍可暫停、取消或變更行程。",
  },
  {
    q: "東京街頭卡丁車安全合法嗎？",
    a: "只要持有在日本有效的駕照就是合法的：Street Kart 的卡丁車是專為日本一般道路設計，業者也會拒絕未攜帶符合規定證件的駕駛者。您是在靠左通行的實際道路上與一般車輛同行，由導遊帶領，每位導遊最多帶領 6 位駕駛者，包含基本保險，路線不走高速公路。",
  },
];

const picks = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "東京觀光巴士一日遊",
    desc: "由導遊帶領遊覽皇居庭園、淺草與東京晴空塔，提供多語言語音導覽。",
  }),
  withKlookLocale(shinjukuNightFoodWalkingTour, LOCALE, {
    title: "新宿夜間美食導覽：回憶橫丁、歌舞伎町與新宿黃金街",
    desc: "入夜後走訪回憶橫丁、歌舞伎町與新宿黃金街的 3 小時併團步行行程，包含在三家在地小店品嚐美食，以及在黃金街居酒屋喝一杯。",
  }),
  { title: "Klook 日本 eSIM", desc: "透過 QR Code 憑證取得的日本 eSIM，整趟旅程都能用地圖與通訊軟體。", url: ESIM_URL },
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "東京地鐵票 Tokyo Subway Ticket（24／48／72 小時）",
    desc: "東京 Metro 及都營地下鐵全線皆可不限次數搭乘，抵達後領取，不必排隊購票。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "東京卡丁車" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.88rem" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" style={srcStyle}>
      {children}
    </a>
  );
}

export default function ZhTwTokyoGoKartPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG["zh-tw"] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            親自駕駛可合法上路的卡丁車穿梭東京市中心，行經東京鐵塔、彩虹大橋等地標周邊。特別需要注意的是駕照及相關證件：國際駕照只能在出發前於本國申辦。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "須持國際駕照", "18 歲以上"].map((t) => (
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
          <p className={styles.bodyText}>
            要在東京駕駛卡丁車，您需要日本駕照，或本國駕照加上依<strong>1949 年日內瓦公約</strong>核發的紙本國際駕照與護照；僅持有依 1968 年維也納公約核發的國際駕照不被接受。Street Kart 2026 年 11 月的官方價目表中，1 小時路線每人最低 <strong>¥5,000</strong>（淺草）、<strong>¥9,000</strong>（秋葉原）或 <strong>¥16,000</strong>（澀谷），1.5 至 2 小時路線最低 <strong>¥12,000</strong>（秋葉原）或 <strong>¥14,000</strong>（東京灣，行經彩虹大橋），原價最高 ¥25,000。行程從澀谷、秋葉原、淺草、品川與東京灣（新木場）的門市出發，未攜帶證件正本的駕駛者無法參加，且不予退費。查核日期：{CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看澀谷卡丁車 →
            </KlookLink>
          </div>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>每人價格</p>
                <p className={styles.verdictStatValue}>約 ¥5,000 至 ¥25,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>行程長度</p>
                <p className={styles.verdictStatValue}>45 分鐘至 2 小時，導遊帶領</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>所需證件</p>
                <p className={styles.verdictStatValue}>國際駕照 + 本國駕照 + 護照</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>國際駕照申辦</p>
                <p className={styles.verdictStatValue}>出發前在本國辦好</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>簡單來說：</strong>預訂並不難，多數人無法參加都是因為證件不符規定。國際駕照<em>只能</em>在出發前於本國申辦，在日本無法辦理，店家當天也無法協助補辦。先備妥所需證件，其他細節就容易安排了。
            </p>
            <KlookLink href={GOKART_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看東京街頭卡丁車 →
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>日本的街頭卡丁車是什麼？東京卡丁車行程怎麼進行？</h2>
          <p className={styles.bodyText}>
            東京街頭卡丁車是親自駕駛可合法上路的小型卡丁車的體驗，跟著導遊帶領的車隊行駛在市區一般道路上。熱門路線會經過知名景點，彩虹大橋、東京鐵塔、台場與澀谷一帶都是常見的行程景點，讓您坐在沒有車頂的卡丁車上，以貼近路面的視角欣賞搭電車或巴士時看不到的東京。行程通常也會提供一般服裝供旅客穿著。
          </p>
          <p className={styles.bodyText}>
            先說明一個重點：這是<strong>一般的街頭卡丁車體驗</strong>，<strong>與任何電玩、遊戲角色或娛樂品牌都沒有合作、贊助或背書關係</strong>，提供的服裝也是一般服裝。這個行程真正的魅力在於駕駛本身，也正因如此，證件才這麼重要。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>價格</span>
          <h2 className={styles.sectionTitle}>東京街頭卡丁車多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            依 Street Kart 2026 年 11 月的價目表，東京街頭卡丁車的每人費用約為 ¥5,000 至 ¥25,000，費用依出發門市、路線及時段而定。若您還沒決定，請預訂澀谷 Annex 店的 1 小時路線，它會經過澀谷全向十字路口、表參道與原宿。下表中同時列出白天與傍晚時段的門市，傍晚時段都比白天貴。
          </p>
          <Table
            head={["出發門市與路線", "路線主要景點", "行程時間", "白天最低價", "傍晚最低價", "原價（最低）", "預訂"]}
            rows={priceRows.map((row) => [
              row.shop,
              row.route,
              row.time,
              row.day,
              row.evening,
              row.regular,
              <KlookLink key="b" href={row.book} target="_blank" rel={KLOOK_REL} style={{ color: "var(--red)", fontWeight: 600 }}>
                {row.bookLabel} →
              </KlookLink>,
            ])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            各門市官方價目表中 2026 年 11 月所列的每人最低費用，查核日期：{CHECKED}。價格依月份與時段而變，所選日期的實際費用，請以業者的預訂日曆為準。白天與傍晚欄位所列的是「評論優惠價」，線上預訂時會自動套用；依業者條款，無論是否留下評論，皆適用此價格，原價則適用於不希望公開到訪資訊的旅客。預訂欄位會開啟該出發門市的 Klook 商品頁面，Klook 的售價另計；品川門市沒有獨立的預訂商品頁面，因此連結開啟的是 Klook 的東京卡丁車列表。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後確認：{LAST_CHECKED}。官方資料來源：<Src href="https://akiba-kart.com/en/shibuya2.html">澀谷 Annex 店</Src>、
            <Src href="https://akiba-kart.com/en/shibuya.html">澀谷店</Src>、
            <Src href="https://streetkart.tokyo/en/akihabara.html">秋葉原 1 號店</Src>、
            <Src href="https://streetkart.tokyo/en/akihabara2.html">秋葉原 2 號店</Src>、
            <Src href="https://streetkart.com/en/tokyobay.html">東京灣店</Src>、
            <Src href="https://streetkart.com/en/shinagawa.html">品川店</Src>、
            <Src href="https://streetkart.com/en/asakusa.html">淺草店</Src>。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Klook 的預訂價格另計，請至商品頁面查詢所選日期的費用。作為比較，Street Kart 大阪店同月約 1 小時路線為 ¥7,000 起，沖繩也有門市。在大阪也可以使用相同的證件駕駛卡丁車，
            <Link href="/guides/attractions/osaka-go-kart" style={linkStyle}>
              大阪卡丁車指南（英文）
            </Link>
            整理並比較了行經道頓堀與難波的路線。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>費用包含</span>
          <h2 className={styles.sectionTitle}>東京卡丁車行程包含哪些項目？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            行程費用包含卡丁車、導遊與基本保險，但卡丁車損壞時您需負擔 ¥50,000 的自負額。國際駕照或譯本的費用一律自行負擔。
          </p>
          <Table head={["項目", "是否包含", "說明"]} rows={includedRows.map((r) => [r.item, r.status, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            資料來自 Street Kart 的常見問題、各店頁面與使用條款，查核日期：{CHECKED}。在 Klook 預訂時，以商品頁面所列的包含項目為準。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>路線選擇</span>
          <h2 className={styles.sectionTitle}>東京卡丁車哪條路線最好（澀谷、秋葉原或東京灣）？</h2>
          <p className={styles.bodyText}>
            想開過澀谷全向十字路口就選澀谷，想省錢就選秋葉原，想看彩虹大橋且有 1.5 至 2 小時就選東京灣。根據 11 月的價目表，澀谷路線 ¥16,000 起，秋葉原 1 小時路線則是 ¥9,000 起。秋葉原 2 號店的 1 小時路線也會經過東京車站與銀座。
          </p>
          <p className={styles.bodyText}>
            若有特別想去的地方，也可以選擇其他路線。品川路線前往東京鐵塔，想行經彩虹大橋，可以選擇東京灣路線，秋葉原 2 號店較長的 A2-M 路線則經皇居周邊與原宿抵達澀谷全向十字路口。如果您本來就住在秋葉原電器街附近，可以參考我們的
            <Link href="/guides/attractions/akihabara-anime-tour" style={linkStyle}>
              秋葉原動漫導覽指南（英文）
            </Link>
            ，一併規劃行程。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看澀谷 Annex 店行程 →
            </KlookLink>
            <KlookLink href={AKIHABARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看秋葉原行程 →
            </KlookLink>
            <KlookLink href={BAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看東京灣行程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>參加資格</span>
          <h2 className={styles.sectionTitle}>在東京開卡丁車需要駕照嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            需要。日本的街頭卡丁車行駛在一般道路上，所以您必須持有在日本有效的駕照，卡丁車沒有乘客座位，未持有駕照者也無法以乘客身分參加。最重要的一條規則：1949 年日內瓦公約國際駕照必須<strong>在出發前於本國辦好</strong>，在日本無法申辦。請參考下表，確認自己是否符合駕駛資格。
          </p>
          <Table head={["您持有的證件", "可以駕駛嗎？", "說明"]} rows={licenceRows.map((r) => [r.doc, r.drive, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            最後確認：{LAST_CHECKED}（Street Kart 駕照說明頁面與 JAF）。國際駕照或外國駕照在日本的有效期間為入境日起 1 年內或駕照有效期限內，以較早屆滿者為準；國際駕照本身的效期為核發起 1 年（日本警察廳；查核日期：{NPA_CHECKED}）。官方資料來源：
            <Src href="https://akiba-kart.com/en/license_shibuya.html">Street Kart 駕照說明頁面</Src>、
            <Src href="https://english.jaf.or.jp/driving-in-japan/drive-in-japan/switch-to-japanese-license">JAF</Src>。規定可能變動，預訂前請向業者確認您的國籍是否適用。行程當天須攜帶所有證件正本。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>沒有國際駕照</span>
          <h2 className={styles.sectionTitle}>沒有國際駕照可以在東京開卡丁車嗎？</h2>
          <p className={styles.bodyText}>
            只有在您持有其他可在日本合法駕駛的證件時才可以：日本駕照、SOFA 駕照，或上述六個國家與地區之一的駕照加上認可的日文譯本。若未持有上述任一種證件，就無法駕駛，店家當天無法處理，也不會退費。
          </p>
          <p className={styles.bodyText}>
            最容易出問題的是譯本，因為 JAF 不受理日本境外的申請。JAF 只受理在日本境內提出的線上申請，費用為 ¥6,000，另加每頁 ¥20 的列印費，這六個國家與地區的駕照平均需要 2 至 3 個工作天。若透過 JAF 申請日文譯本，行程前一天才抵達會來不及，建議將卡丁車安排在旅程後段。
          </p>
          <div className={styles.verdictBox} style={{ marginTop: "1.25rem" }}>
            <div className={styles.verdictBody}>
              <p className={styles.verdictText}>
                <strong>沒有國際駕照？改訂這些行程。</strong>不需要駕照，也能遊覽這些街區：由導遊帶領、遊覽皇居庭園、淺草與東京晴空塔的巴士行程，新宿夜間 3 小時美食步行導覽（併團），或由導遊帶領的淺草寺半日步行導覽。
              </p>
              <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
                <KlookLink href={BUS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  查看東京巴士一日遊 →
                </KlookLink>
                <KlookLink href={FOOD_WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  查看新宿夜間美食導覽 →
                </KlookLink>
                <KlookLink href={ASAKUSA_WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  查看淺草步行導覽 →
                </KlookLink>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>限制</span>
          <h2 className={styles.sectionTitle}>東京卡丁車有年齡與身高限制嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            有。Klook 商品頁面規定參加者須年滿 18 歲，身高至少 150 公分。Street Kart 官方頁面未列出年齡或身高限制，請確認您預訂的商品頁面。
          </p>
          <Table head={["規定", "內容", "資料來源"]} rows={fitRows.map((r) => [r.rule, r.value, r.source])} />
          <p className={styles.bodyText} style={noteStyle}>
            查核日期：{NPA_CHECKED}。Klook 的相關資訊取自搜尋引擎收錄的商品頁面內容。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>天氣</span>
          <h2 className={styles.sectionTitle}>下雨天或冬天可以在東京開卡丁車嗎？</h2>
          <p className={styles.bodyText}>
            通常可以。Street Kart 表示，通常不受天氣影響，行程照常進行，不確定時請聯絡店家，但依使用條款也可能暫停、取消或變更行程。冬天也不是淡季：東京各門市的價目表皆列有全年 12 個月的預訂時段，包括 12 月至 2 月。卡丁車沒有車頂，請準備適合的衣物。
          </p>
          <p className={styles.bodyText}>
            直接向業者預訂時，最晚可於活動日前 7 天（日本時間）免費取消。活動日前 6 天內則適用業者的取消規定，付款前請先閱讀；變更則視剩餘名額而定。透過 Klook 預訂則依 Klook 商品頁面的條款。查核日期：{CHECKED}。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>安全</span>
          <h2 className={styles.sectionTitle}>東京街頭卡丁車安全合法嗎？</h2>
          <p className={styles.bodyText}>
            只要每位駕駛都持有在日本有效的駕照就是合法的：Street Kart 表示其卡丁車是專為日本一般道路設計，未攜帶符合規定的證件正本者一律不得參加。不過，您仍是在靠左通行的實際道路上與一般車輛同行，請以實際開車的心態看待，而不是當成遊樂設施。
          </p>
          <p className={styles.bodyText}>
            在門市完成安全說明後，行程由導遊帶領，每位導遊最多帶領 6 位駕駛者。路線不走高速公路，基本保險已含在費用中，卡丁車為單人座，所以沒有人能以乘客身分同行。除非加購全險，卡丁車損壞時需負擔 ¥50,000 自負額。查核日期：{CHECKED}。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>適合對象</span>
          <h2 className={styles.sectionTitle}>街頭卡丁車行程適合您嗎？</h2>
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

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            1 小時路線加上 30 分鐘報到約需 90 分鐘，很容易排進我們的
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={linkStyle}>
              東京 3 天行程（英文）
            </Link>
            或
            <Link href="/zh-tw/guides/attractions/things-to-do-tokyo" style={linkStyle}>
              東京必去景點
            </Link>
            。兒童不能駕駛，卡丁車又是單人座，所以若是全家出遊，須另外為未滿 18 歲的家人安排行程；
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>
              東京親子行程（英文）
            </Link>
            有適合全家人的每日安排。想在傍晚步行逛逛嗎？
            <Link href="/guides/attractions/tokyo-night-food-tour" style={linkStyle}>
              東京夜間美食導覽（英文）
            </Link>
            完全不需要駕照，
            <Link href="/guides/attractions/tokyo-bike-tour" style={linkStyle}>
              東京單車導覽指南（英文）
            </Link>
            中的電動輔助自行車行程也一樣。行程較長的話，東京灣路線適合安排在
            <Link href="/guides/attractions/tokyo-4-day-itinerary" style={linkStyle}>
              東京 4 天行程（英文）
            </Link>
            中遊覽東京灣沿岸的那一天。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>如何預訂東京卡丁車行程？</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>證件都備妥了嗎？</strong>備齊證件後再預訂，因為證件不齊而無法參加時，店家不會退費。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 預訂澀谷 Annex 店行程 →
            </KlookLink>
            <KlookLink href={AKIHABARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 預訂秋葉原行程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>當日行程安排</span>
          <h2 className={styles.sectionTitle}>東京卡丁車行程從哪裡出發？</h2>
          <p className={styles.bodyText}>
            Street Kart 行程從您預訂的門市出發，每家店都有自己的路線。確切集合地點請看預訂確認信，並請預留充足的交通時間，於安全說明開始前抵達。
          </p>
          <Table head={["門市", "地址", "最近車站（步行）"]} rows={startRows.map((r) => [r.shop, r.address, r.access])} />
          <p className={styles.bodyText} style={noteStyle}>
            資料來自 Street Kart 各店頁面，查核日期：{CHECKED}。
          </p>
          <p className={styles.bodyText}>
            門市沒有停車場，業者也不建議自行開車或搭 Uber 前往，因為塞車可能讓您遲到，而遲到者無法參加。我們的
            <Link href="/guides/attractions/where-to-stay-in-tokyo" style={linkStyle}>
              東京住宿區域指南（英文）
            </Link>
            比較了適合住宿的地區；如果您還不熟悉東京交通，
            <Link href="/guides/transport/tokyo-transportation" style={linkStyle}>
              東京交通指南（英文）
            </Link>
            介紹電車、地鐵及 IC 卡的基本使用方式。
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="東京卡丁車常見問題" />

        <KlookTourPicks
          heading="若所持證件不符合規定"
          intro="兩項只需預訂即可參加的東京觀光行程，加上任何一天都用得到的 eSIM 與地鐵票。請至商品頁面查詢所選日期的最新價格。"
          tours={picks}
        />

        <Related
          items={[
            { href: "/guides/attractions/akihabara-anime-tour", title: "秋葉原動漫導覽（2026）：導覽行程、店家營業時間與交通方式（英文）" },
            { href: "/guides/transport/tokyo-transportation", title: "東京交通指南（2026）：電車、地鐵與 IC 卡（英文）" },
            { href: "/zh-tw/guides/attractions/things-to-do-tokyo", title: "東京必去景點：哪些要先購票、哪些可以直接去" },
            { href: "/guides/attractions/samurai-ninja-experience-tokyo", title: "東京武士與忍者體驗（2026）：該訂哪一種（英文）" },
            { href: "/guides/attractions/tokyo-food-tour", title: "東京美食導覽（2026）：推薦區域及參加導覽的好處（英文）" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "東京地鐵票（2026）：24、48 或 72 小時，划算嗎？（英文）" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>準備好在東京體驗街頭卡丁車了嗎？</h2>
            <p className={styles.ctaBannerDesc}>
              提前預訂街頭卡丁車行程，當天帶齊國際駕照、本國駕照與護照。請記得：國際駕照必須在出發前於本國辦好。
            </p>
            <KlookLink href={GOKART_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看東京街頭卡丁車 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
