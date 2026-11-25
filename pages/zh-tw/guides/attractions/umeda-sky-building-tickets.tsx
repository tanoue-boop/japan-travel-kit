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
import KlookTripPrep from "../../../../components/KlookTripPrep";
import {
  osakaAmazingPass,
  osakaCastleUmedaTonboriDayTour,
  osakaNaniWonderNightBusTour,
  osakaPrivateWalkingTour,
  umedaSkyBuildingTicket,
  umedaSkySameDayPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/umeda-sky-building-tickets) section by section
// as of 2026-11-25 (task-jtk-20261125-TR01): same sections, tables, FAQ and Klook CTAs in the
// same places. Every figure, date and source is the English page's; nothing is added.
// Title term: 梅田藍天大廈 — the name Taiwan and Hong Kong guides, Trip.com HK and Klook zh-TW
// use, with the observatory's own name 空中庭園展望台. The pass is 大阪周遊卡, as on the
// Traditional Chinese Dotonbori page.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/umeda-sky-building-tickets";
const TITLE = "梅田藍天大廈門票 2026：票價、營業時間與日落";
const H1 = "梅田藍天大廈門票 2026：空中庭園展望台票價、營業時間與日落時間";
const DESC =
  "梅田藍天大廈空中庭園展望台門票：成人 ¥2,000、4–12 歲 ¥500，9:30–22:30 開放，22:00 最後入場。大阪周遊卡限 15:00 前免費。";

const LAST_CHECKED_ISO = "2026-11-19";
const LAST_CHECKED = dateLabel(LAST_CHECKED_ISO, LOCALE);
const CHECKED_ISO = "2026-11-03";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const OFFICIAL_URL = "https://www.skybldg.co.jp/en/observatory/";
const HARUKAS_URL = "https://www.abenoharukas-300.jp/observatory/ticket/";
const NAOJ_URL = "https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s2811.html";
// The pass price is owned by lib/attraction-prices.ts, shared with the English page.
const PASS_1_DAY = priceLabel(PRICES.osakaAmazingPass.adult, LOCALE);

const TICKET_URL = klookFor(umedaSkyBuildingTicket.url, LOCALE);
const PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const NIGHT_BUS_URL = klookFor(osakaNaniWonderNightBusTour.url, LOCALE);
const DAY_TOUR_URL = klookFor(osakaCastleUmedaTonboriDayTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  {
    tier: "成人",
    price: "¥2,000",
    what: "39 樓售票櫃檯的票價，可用現金或信用卡付款。營運公司的日文網站另透過 asoview 販售指定日期、較便宜的線上門票，但沒有標示金額",
  },
  { tier: "兒童（4–12 歲）", price: "¥500", what: "成人票價的四分之一，在大阪的展望台中算是少見的便宜" },
  { tier: "未滿 4 歲", price: "免費", what: "不需要門票" },
  { tier: "持身心障礙證明者", price: "¥1,000／¥250", what: "成人／4–12 歲，出示證明後在展望台售票櫃檯購票" },
  { tier: "10 人以上團體", price: "¥1,800／¥450", what: "成人／4–12 歲，在 39 樓售票櫃檯辦理" },
  {
    tier: "持大阪周遊卡，15:00 前入場",
    price: "免費",
    what: "周遊卡含一次入場。周遊卡值不值得買，取決於您是否在這個時段入場",
  },
  {
    tier: "持大阪周遊卡，15:00 起入場",
    price: "9 折",
    what: "成人約 ¥1,800。看日落或夜景時，無法用周遊卡免費入場",
  },
];

const floorRows = [
  { floor: "RF（頂樓）", what: "360 度露天展望層；日文網站在這一層另列有 Lumi Sky Walk", ticket: "需要——大雨時可能關閉" },
  { floor: "40F", what: "室內樓層，有咖啡廳 SKY 40 與沿著窗邊的吧檯座位", ticket: "需要" },
  { floor: "39F", what: "售票櫃檯、紀念品店、中餐廳 Sangu、Sky Lounge Stardust", ticket: "售票櫃檯與商店所在樓層" },
  { floor: "35F–39F", what: "穿過兩棟大樓之間的空間、通往展望台的路線", ticket: "從展望台專用入口上樓，不是搭辦公樓層的電梯" },
  { floor: "B1F–1F", what: "瀧見小路——昭和懷舊風格的餐廳與商店街，另有 ATM 與郵局", ticket: "不需要" },
];

const hoursRows = [
  { what: "展望台開放時間", when: "9:30 – 22:30" },
  { what: "最後入場", when: "22:00" },
  { what: "公休日", when: "營運公司網站沒有列出固定公休日；淀川煙火大會等特別營業日，需購買特別門票，並依特別時間開放" },
  { what: "天候不佳", when: "大雨時露天頂樓可能關閉；39 樓與 40 樓為室內" },
  { what: "大阪周遊卡免費入場", when: "僅限 9:30 – 15:00；15:00 至 22:00 為 9 折" },
  { what: "建議停留時間", when: "1 – 2 小時（Klook 商品頁的估計）" },
];

const sunsetRows = [
  { date: "11 月 – 2 月", sunset: "16:47 – 17:53", note: "冬季請依日期在約 16:00 至 17:15 之間入場，各日期見下表" },
  { date: "11 月 1 日", sunset: "17:05", note: "約 16:30 前入場" },
  { date: "11 月 15 日", sunset: "16:54", note: "約 16:15 前入場" },
  { date: "11 月 30 日", sunset: "16:47", note: "一年中日落最早的日子，落在 11 月底與 12 月初之間" },
  { date: "12 月 1 日", sunset: "16:47", note: "黃金時刻在下午中段開始，落在周遊卡 15:00 前的免費時段內" },
  { date: "12 月 15 日", sunset: "16:49", note: "約 16:10 前入場" },
  { date: "12 月 31 日", sunset: "16:57", note: "約 17:30 天黑，到閉館前還有 5 小時可以看夜景" },
  { date: "1 月 1 日", sunset: "16:58", note: "約 16:15 前入場（2026 年表）" },
  { date: "1 月 15 日", sunset: "17:10", note: "約 16:30 前入場（2026 年表）" },
  { date: "2 月 1 日", sunset: "17:27", note: "約 16:45 前入場（2026 年表）" },
  { date: "2 月 15 日", sunset: "17:41", note: "約 17:00 前入場（2026 年表）" },
  { date: "2 月 28 日", sunset: "17:53", note: "約 17:10 前入場（2026 年表）" },
  { date: "3 月 31 日", sunset: "18:18", note: "櫻花季，是大阪一年中最擁擠的兩週" },
  { date: "7 月 1 日", sunset: "19:15", note: "一年中日落最晚的日子，請在 18:30 前入場" },
  { date: "9 月 1 日", sunset: "18:25", note: "頂樓溫暖、黃昏時間長，是最容易安排的日落" },
  { date: "9 月 30 日", sunset: "17:44", note: "日落已提早到 18:00 前，而且還會很快提早" },
];

const choiceRows = [
  {
    situation: "白天前往，同一天還要去至少兩處其他付費景點",
    pick: "大阪周遊卡，15:00 前進入展望台",
    why: "展望台（¥2,000）、大阪城（¥1,200）與 HEP FIVE 摩天輪（¥1,000）加起來超過周遊卡價格；15:00 後周遊卡在這裡只有 9 折",
  },
  {
    situation: "為了日落或夜景，當天沒有其他付費景點",
    pick: "單買一張展望台門票——售票櫃檯或線上",
    why: "沒有入場時段，也不會售罄，所以線上購票換來的是中文結帳畫面與海外發行的信用卡付款，而不是保證入場",
  },
  {
    situation: "大阪第一天，想看大阪城、展望台與道頓堀，又不想自己規劃路線",
    pick: "含梅田的導遊隨行一日遊",
    why: "只有一個集合地點、一次預訂；付款前請在商品頁確認停留景點與取消期限",
  },
];

const deckRows = [
  {
    deck: "梅田藍天大廈（空中庭園）",
    height: "173 公尺——39 樓、40 樓與露天頂樓",
    price: "成人 ¥2,000／4–12 歲 ¥500",
    hours: "9:30 – 22:30（最後入場 22:00）",
    area: "梅田——JR 大阪站步行 7 分鐘",
    pass: "15:00 前憑大阪周遊卡免費，之後 9 折",
  },
  {
    deck: "HARUKAS 300（阿倍野HARUKAS）",
    height: "營運公司稱為日本最高大樓的頂部樓層，58 樓有無屋頂的展望空間",
    price: "售票櫃檯成人 ¥2,200／兒童 ¥900；線上預購 ¥1,980／¥810",
    hours: "9:00 – 22:00（最後入場 21:30）",
    area: "天王寺——位於近鐵大阪阿部野橋站正上方",
    pass: "不在大阪周遊卡的設施名單上",
  },
  {
    deck: "通天閣",
    height: "新世界的地標塔",
    price: "成人（15 歲以上）¥1,500（12 月 30 日至 1 月 3 日為 ¥1,800）",
    hours: "9:00 – 21:45（最後入場 21:15）",
    area: "新世界——惠美須町／動物園前",
    pass: "憑大阪周遊卡免費，但需在設施現場預約入場時段",
  },
];

const whoFor = [
  {
    title: "這種情況請在 15:00 前去",
    desc: `您持有大阪周遊卡。周遊卡的免費入場到 15:00 為止，之後只有 9 折，等於從免費變成約 ¥1,800。想用周遊卡免費參觀這座展望台，只能在上午或下午稍早前往。${CHECKED}查核。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "這種情況請在日落時去",
    desc: "您想看大阪其他展望台都沒有的景色：在沒有屋頂、向天空敞開的 360 度環形頂樓，看著城市燈光亮起。日落前 30 至 45 分鐘入場，一張門票就能看到白天景色、黃金時刻與夜景。大阪的日落時間一年內相差將近兩個半小時，請先查看下方的日落表。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "這種情況請晚一點去",
    desc: `您想要人少一點。展望台開到 22:30、最後入場 22:00，比 HARUKAS 300 與通天閣都晚，即使在盛夏，日落後也還有兩個多小時。21:00 入場，景色一樣，人潮卻少很多，這個時間也還能在售票櫃檯購票。營業時間於${CHECKED}查核。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "先決定時間，再決定門票",
    desc: "這是本頁最重要的決定。15:00 前，大阪周遊卡可以免費入場；日落時則不行。日落時段的參觀體驗比較好，用周遊卡則比較便宜，但兩者無法同時兼得，請先決定您要以哪一個為優先。",
  },
  {
    title: "查清楚您出發日期的日落時間",
    desc: "大阪的日落時間從 12 月初的 16:47 到 7 月初的 19:15，相差將近兩個半小時，也決定了黃金時刻是在下午中段還是 19:00 左右。下方表格列出全年代表日期的官方日落時間。",
  },
  {
    title: "需要中文結帳畫面或使用海外信用卡時，再提前購票",
    desc: "這裡沒有入場時段，39 樓售票櫃檯可用現金或信用卡購票，所以提前購票是為了方便，不是為了確保能入場。營運公司的日文網站透過 asoview 販售指定日期、較便宜的線上門票；Klook 則以中文介面販售同樣的門票，可用海外發行的信用卡付款，並取得入場時掃描的條碼。取消規定依各商品而不同，付款前請在您的訂單畫面確認。",
  },
  {
    title: "手扶梯這一段請多預留 15 分鐘",
    desc: "售票櫃檯在 39 樓，上樓要搭從 35 樓出發、橫跨兩棟大樓之間空間的透明手扶梯。這座手扶梯本身就是拍照景點，也是這棟大樓出現在明信片上的原因，請把它當成參觀的一部分。",
  },
  {
    title: "穿著請以頂樓為準，而不是室內",
    desc: "最頂層是離地 173 公尺、頭上沒有任何遮蔽的 360 度露天環形展望台。一年四季都比地面風大、氣溫低，而且這一層沒有遮風避雨的地方；下一層的 40 樓是室內，沿著窗邊有一條 35 公尺長的玻璃吧檯。冬天請多帶一件外套，也請做好頭髮會被吹亂的準備。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "梅田藍天大廈門票多少錢？",
    a: `梅田藍天大廈門票成人 ¥2,000、4–12 歲兒童 ¥500，未滿 4 歲免費。持身心障礙證明者 ¥1,000／¥250，10 人以上團體 ¥1,800／¥450。大阪周遊卡 9:30 至 15:00 可免費入場，15:00 至 22:00 為 9 折。以上為 skybldg.co.jp 官方票價，最後查核日 ${LAST_CHECKED}。`,
  },
  {
    q: "梅田藍天大廈的營業時間是幾點？需要待多久？",
    a: `空中庭園展望台開放時間為 9:30 至 22:30，最後入場 22:00，營運公司網站沒有列出固定公休日。建議預留 1 至 2 小時（Klook 商品頁的估計）。淀川煙火大會等特別營業日需購買特別門票並依特別時間開放，大雨時露天頂樓可能關閉。營業時間最後查核日 ${LAST_CHECKED}。`,
  },
  {
    q: "梅田藍天大廈門票什麼時候開賣？",
    a: `沒有開賣日。展望台沒有入場時段，39 樓售票櫃檯從 9:30 到最後入場 22:00 都販售當日門票，成人 ¥2,000、4–12 歲 ¥500。只有淀川煙火大會等特別營業日，需要購買指定時間的特別門票。官方網站查核日 ${LAST_CHECKED_ISO}。`,
  },
  {
    q: "梅田藍天大廈需要提前購票嗎？",
    a: "不需要。這裡沒有入場時段，39 樓售票櫃檯販售當日門票。提前購票是為了方便：透過營運公司英文網站連結的 Klook，可以用中文結帳畫面與海外發行的信用卡付款。人潮最多的是日落前 1 小時，以及周遊卡 15:00 免費時段結束前；最少的是上午中段與 21:00 以後。如果您持有大阪周遊卡並在 15:00 前抵達，就完全不需要購票。",
  },
  {
    q: "梅田藍天大廈的日落時間是幾點？",
    a: "依日本國立天文台 2026 年大阪日落表，11 月至 2 月大阪的日落時間在 16:47 至 17:53 之間：11 月 1 日 17:05、11 月 15 日 16:54、11 月 30 日與 12 月 1 日 16:47、12 月 31 日 16:57、1 月 15 日 17:10、2 月 15 日 17:41。夏季最晚到 19:15（7 月 1 日）。日落前 30 至 45 分鐘入場，一張門票就能看到白天景色、黃金時刻與夜景。",
  },
];

const tripPrepItems = [
  withKlookLocale(umedaSkySameDayPrep[0], LOCALE, {
    label: "大阪美食導覽",
    ctaLabel: "查看大阪美食導覽 →",
    why: "參觀展望台後的晚上行程：從梅田搭御堂筋線到難波，在道頓堀主街旁的巷弄走三小時，品嚐串炸、章魚燒、隱藏版居酒屋與在地甜點，是團體導覽。",
  }),
  withKlookLocale(umedaSkySameDayPrep[1], LOCALE, {
    label: "大阪梅田飯店",
    ctaLabel: "查看梅田住宿 →",
    why: "展望台開到 22:30，住在大阪站周邊，晚上參觀後只要走幾分鐘就能回到住宿地點。",
  }),
  withKlookLocale(umedaSkySameDayPrep[2], LOCALE, {
    label: "HARUKA 特急（關西機場 ⇄ 大阪）",
    ctaLabel: "查看 HARUKA 車票 →",
    why: "從關西機場直達大阪站，也就是步行前往展望台的車站；依 Klook 商品頁說明，只販售給持有外國護照並蓋有短期停留入境章的旅客。",
  }),
  withKlookLocale(umedaSkySameDayPrep[3], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "Klook 的門票是存在手機裡的電子票，而從大阪站走過去的路上有一段地下道，用行動數據看地圖會比較方便。",
  }),
];

const tourPicks = [
  withKlookLocale(osakaCastleUmedaTonboriDayTour, LOCALE, {
    title: "大阪城、梅田藍天大廈與道頓堀遊船一日遊",
    desc: "由導遊帶領，一天走完大阪城、梅田展望台與道頓堀遊船，路線由導遊安排。",
  }),
  withKlookLocale(osakaPrivateWalkingTour, LOCALE, {
    title: "大阪私人半日／一日步行導覽",
    desc: "由會說英文或日文的專屬導遊，依您安排的路線走難波與心齋橋一帶。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "梅田藍天大廈" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h || `blank-${i}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.86rem" }}>
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

function LastChecked({ url, label }: { url: string; label: string }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      最後查核：{LAST_CHECKED_ISO}——資料來源：<a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
    </p>
  );
}

export default function ZhTwUmedaSkyBuildingTicketsPage({ updated }: { updated: PageUpdated }) {
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
            距大阪站步行 7 分鐘、位於梅田上空 173 公尺的露天環形頂樓。只有一種門票、沒有入場時段；但大阪周遊卡的免費入場到 15:00 為止，要不要買周遊卡，請以這個時間來判斷。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "官方票價與查核日期", "大阪各季日落時間"].map((t) => (
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
                <p className={styles.verdictStatLabel}>門票</p>
                <p className={styles.verdictStatValue}>成人 ¥2,000／兒童 ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>開放時間</p>
                <p className={styles.verdictStatValue}>9:30–22:30，最後入場 22:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>交通</p>
                <p className={styles.verdictStatValue}>JR 大阪站步行 7 分鐘</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>大阪周遊卡</p>
                <p className={styles.verdictStatValue}>只限 15:00 前免費</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              梅田藍天大廈（Umeda Sky Building）門票為<strong>成人 ¥2,000</strong>、<strong>4–12 歲兒童 ¥500</strong>，空中庭園展望台開放時間為<strong>9:30 至 22:30，最後入場 22:00</strong>（官方網站 skybldg.co.jp，{LAST_CHECKED_ISO} 查核）。門票沒有開賣日，也沒有入場時段，39 樓售票櫃檯當天就能以現金或信用卡購票，參觀約需<strong>1 至 2 小時</strong>。<strong>大阪周遊卡只在 9:30 至 15:00 可免費入場</strong>；11 月大阪的日落時間在 16:47 至 17:05 之間。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看梅田藍天大廈門票 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                大阪周遊卡 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>梅田藍天大廈門票：票價、營業時間與購票方式</h2>
          <p className={styles.bodyText}>
            梅田藍天大廈門票為<strong>成人 ¥2,000、4–12 歲兒童 ¥500</strong>，未滿 4 歲免費。展望台開放時間為<strong>9:30 至 22:30，最後入場 22:00</strong>，三個樓層全部看完約需 1 至 2 小時。冬季（11 月至 2 月）大阪的日落時間在<strong>16:47 至 17:53</strong>之間，想看日落請在約 16:00 至 17:15 之間入場。
          </p>
          <p className={styles.bodyText}>
            您可以<strong>當天在 39 樓售票櫃檯</strong>購票，或<strong>提前在線上購票</strong>：營運公司英文網站連結的 Klook（中文介面），或 asoview 上營運公司的指定日期線上門票（日文）（{CHECKED}查核）。<strong>大阪周遊卡在 9:30 至 15:00 可免費入場</strong>，15:00 至 22:00 為 9 折，所以白天參觀可以用，日落時段則不行。周遊卡在什麼情況下划算，請看
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              大阪周遊卡划算試算表（英文）
            </Link>
            。票價與營業時間於{LAST_CHECKED}在營運公司網站查核。
          </p>
          <p className={styles.bodyText}>
            兩棟高 173 公尺的 40 層大樓，在頂端以環形結構相連——這就是整棟建築的設計，也是它出現在每張大阪明信片上的原因。付費區域是<strong>空中庭園展望台</strong>，共有三層：購票與驗票的<strong>39 樓</strong>、沿窗設有 35 公尺長玻璃吧檯的室內<strong>40 樓</strong>，以及再往上、頭頂沒有任何遮蔽、可繞行 360 度一圈的<strong>露天頂樓</strong>。
          </p>
          <p className={styles.bodyText}>
            上樓的過程也是參觀的一部分。從 35 樓到 39 樓，有一座橫跨兩棟大樓之間空間的透明手扶梯，是這棟大樓最有名的拍照點，也是售票處設在高樓層而不是 1 樓的原因。樓層配置與交通資訊於{CHECKED}在大阪官方觀光網站查核。
          </p>
          <p className={styles.bodyText}>
            和需要指定入場時間的東京展望台不同，這裡不需要事先安排：沒有 15 分鐘一段的入場時段、沒有開賣日，也不用搶日落時段。取而代之的是<strong>大阪周遊卡免費入場只到 15:00</strong>這個條件，大多數人都要依這個時間來安排參觀。本頁其餘內容整理票價、營業時間、日落時間的計算，以及這一個決定。
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            各樓層介紹：從頂樓到地下
          </h3>
          <Table head={["樓層", "設施", "需要門票嗎？"]} rows={floorRows.map((r) => [r.floor, r.what, r.ticket])} />
          <p className={styles.bodyText} style={noteStyle}>
            樓層資訊依營運公司英文與日文展望台頁面，於{CHECKED}查核。日文頁面只在頂樓列出 Lumi Sky Walk 的名稱而沒有說明，因此本頁也不加以描述。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>開賣日</span>
          <h2 className={styles.sectionTitle}>梅田藍天大廈門票什麼時候開賣？</h2>
          <p className={styles.bodyText}>
            <strong>梅田藍天大廈門票沒有開賣日：</strong>這裡沒有入場時段，39 樓售票櫃檯從 9:30 到最後入場 22:00 都販售當日門票，成人 ¥2,000、4–12 歲 ¥500。唯一的例外是淀川煙火大會等特別營業日，營運公司表示當天需要購買指定時間的特別門票（skybldg.co.jp，{LAST_CHECKED_ISO} 查核）。
          </p>
          <p className={styles.bodyText}>
            線上方面，營運公司的日文網站透過 asoview 販售指定日期的線上門票，Klook 則以中文介面販售同樣的門票，可用海外發行的信用卡付款。沒有開賣日要等，大阪的日期確定後，在您方便的平台購票即可。如果展望台是較長關西行程中的一站，
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" style={linkStyle}>
              大阪京都 3 天行程（英文）
            </Link>
            把它排在大阪那一天；
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景點門票價格總表（英文）
            </Link>
            則列出哪些景點真的會提前售罄。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 購買指定日期的梅田藍天大廈門票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>梅田藍天大廈門票多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            門票為營運公司官方售票櫃檯價格：<strong>成人 ¥2,000</strong>、<strong>4–12 歲兒童 ¥500</strong>。每個年齡層只有一種票價，也沒有加價時段；唯一的變數是周遊卡，而周遊卡的免費入場有時間限制：
          </p>
          <Table head={["對象／時間", "票價", "說明"]} rows={priceRows.map((r) => [r.tier, r.price, r.what])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/（官方）" />
          <p className={styles.bodyText} style={noteStyle}>
            周遊卡相關的兩列，與{CHECKED}查核的大阪周遊卡營運公司設施名單一致。票價可能變動，購票前請再確認。本站介紹的日本各地門票與各自的查核日期，整理在
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景點門票價格總表（英文）
            </Link>
            。
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            梅田藍天大廈兒童票多少錢？
          </h3>
          <p className={styles.bodyText}>
            <strong>4–12 歲 ¥500，未滿 4 歲免費</strong>，是成人票價的四分之一。13 歲起適用 ¥2,000 的成人票。持身心障礙證明的兒童 ¥250，10 人以上團體中的兒童 ¥450。安排親子行程時，
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>
              大阪 2 天行程（英文）
            </Link>
            把展望台排在第二天，在水族館之後、周遊卡 15:00 免費時段結束之前。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>營業時間</span>
          <h2 className={styles.sectionTitle}>梅田藍天大廈的營業時間是幾點？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            展望台開放時間為<strong>9:30 至 22:30，最後入場 22:00</strong>，營運公司沒有列出固定公休日。建議預留 1 至 2 小時。
          </p>
          <Table head={["", "時間"]} rows={hoursRows.map((r) => [r.what, r.when])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/（官方）" />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>22:30 閉館</strong>是這座展望台不太為人注意的優點。它比 HARUKAS 300（22:00）與通天閣一般展望台（21:45）都晚，即使在大阪日落晚到 19:15 的盛夏，日落後也還有 3 小時。如果您白天的行程已經排滿，這是晚餐後還能去的景點。特別營業日需另購門票，遇到淀川煙火大會等大型活動的日期，請先查看官方網站。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>最佳時段</span>
          <h2 className={styles.sectionTitle}>梅田藍天大廈的日落時間是幾點？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            11 月至 2 月，大阪的日落時間在<strong>16:47 至 17:53</strong>之間；7 月初則晚到 19:15。<strong>日落前 30 至 45 分鐘入場</strong>，一張門票就能在露天頂樓看到白天景色、黃金時刻與夜景。以下是日本國立天文台公布的 2026 年大阪日落時間；2027 年的日期，請打開國立天文台同一頁面的該年度表格：
          </p>
          <Table head={["日期", "大阪日落", "在頂樓的意義"]} rows={sunsetRows.map((r) => [r.date, r.sunset, r.note])} />
          <LastChecked url={NAOJ_URL} label="日本國立天文台 大阪日出日落表（官方）" />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            從這張表可以看出兩件事。第一，<strong>冬季的日落落在周遊卡免費時段內，夏季則沒有</strong>：12 月 1 日黃金時刻在 15:00 前就已開始，持周遊卡的人可以同時免費入場又看到夕陽；7 月 1 日的日落則在周遊卡免費時段結束 4 小時後。第二，展望台一年四季在天黑後都還會開放很久，即使錯過夕陽，也不算白來——頂樓的夜景同樣是門票包含的內容，而且比夕陽更容易看到。
          </p>
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看梅田藍天大廈門票 →
            </KlookLink>
            <KlookLink href={NIGHT_BUS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪站出發的夜景巴士 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>人潮</span>
          <h2 className={styles.sectionTitle}>人潮有多擁擠？什麼時候人最少？</h2>
          <p className={styles.bodyText}>
            這裡沒有預約制度，好處是不會售罄，壞處是頂樓的人數也沒有上限。擁擠的時段可以從購票規則預測，不必用猜的。<strong>日落前 1 小時</strong>是最擁擠的時候，因為大家都想站在朝西那約 20 公尺長的欄杆前。<strong>15:00 之前</strong>則是比較少人注意到的第二個高峰，因為大阪周遊卡與大阪 e-Pass 的免費入場都在這時結束。
          </p>
          <p className={styles.bodyText}>
            人最少的付費時段就在這兩個高峰的前後：9:30 開門後的上午中段，以及晚上約 21:00 以後，景色一樣，距離最後入場也還有 1 小時。櫻花季（3 月下旬至 4 月中旬）與暑假期間，大阪各處的人潮都會增加，上表 3 月 31 日那一列正好落在這段期間。展望台以外的一天怎麼安排，請看
            <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>
              大阪景點攻略（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>梅田藍天大廈和阿倍野HARUKAS，哪一個比較值得去？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>想要露天頂樓、較晚閉館，以及就在大阪站旁邊的展望台，就選梅田藍天大廈：</strong>梅田 ¥2,000，HARUKAS 300 售票櫃檯 ¥2,200（線上預購 ¥1,980），而且梅田多開半小時。如果高度比露天更重要，就選阿倍野HARUKAS。大阪的三座付費展望台各有特色：一座最高、一座向天空敞開、一座最便宜並位於老街區新世界。大多數比較文章都忽略周遊卡這一欄，但實際花費的差別就在這裡：
          </p>
          <Table
            head={["展望台", "高度／樓層", "成人票價", "開放時間", "地區", "大阪周遊卡"]}
            rows={deckRows.map((r) => [r.deck, r.height, r.price, r.hours, r.area, r.pass])}
          />
          <LastChecked url={HARUKAS_URL} label="abenoharukas-300.jp（官方），梅田依 skybldg.co.jp" />
          <p className={styles.bodyText} style={noteStyle}>
            梅田與 HARUKAS 300 兩列於{LAST_CHECKED}重新查核；通天閣一列（tsutenkaku.co.jp）與周遊卡一欄（大阪周遊卡營運公司的設施名單）於{CHECKED}查核。梅田的 173 公尺高度依大阪官方觀光網站。請注意兩個差異：<strong>HARUKAS 300 不在大阪周遊卡的設施名單上</strong>，所以即使在使用周遊卡的那天也要付全額；<strong>通天閣即使持周遊卡，也需在現場預約入場時段</strong>，另外兩座則不需要。資訊可能變動，出發前請再確認。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通方式</span>
          <h2 className={styles.sectionTitle}>從大阪站怎麼去梅田藍天大廈？</h2>
          <p className={styles.bodyText}>
            步行即可：<strong>從 JR 大阪站步行 7 分鐘</strong>，<strong>從阪急大阪梅田站或大阪地鐵梅田站約 9 分鐘</strong>，穿過新梅田城（New Umeda City）往西北方向走（依大阪官方觀光網站；同網站另一頁寫約 10 分鐘）。感覺比 7 分鐘還遠，是因為鐵路：營運公司從各車站出發的步行路線，都包含一段穿過鐵軌下方、長 40 公尺的地下道，途中會有一段時間看不到大樓。繼續往前走，大樓就會再出現。進入大樓後，請走展望台專用入口，而不是辦公樓層的電梯。
          </p>
          <p className={styles.bodyText}>
            梅田是御堂筋線北端的轉運中心，從大阪市內任何地方要先到大阪站都很容易。
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>
              大阪交通攻略（英文）
            </Link>
            說明御堂筋線如何連接梅田、難波與天王寺；
            <Link href="/guides/transport/osaka-metro-pass" style={linkStyle}>
              大阪地鐵一日券攻略（英文）
            </Link>
            計算在一天要去好幾個地方時，一日券是否比刷 IC 卡划算；
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>
              大阪住宿區域攻略（英文）
            </Link>
            則比較以梅田或難波作為住宿地點。步行時間於{CHECKED}查核。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>梅田藍天大廈需要提前購票嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>不需要。</strong>這裡沒有入場時段，39 樓售票櫃檯當天就能用現金或信用卡購票。提前購票只是為了方便：想用中文結帳畫面與海外發行的信用卡付款，可以透過 Klook；能看懂日文的話，可以在 asoview 購買營運公司較便宜的指定日期線上門票。如果您持有大阪周遊卡並在 15:00 前抵達，就什麼都不用買。
          </p>
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
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            梅田藍天大廈該選哪一種門票？
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>依您前往的時間來選。</strong>當日門票在售票櫃檯販售，也不會售罄，但日落前 1 小時與 15:00 之前人潮較多；線上購票的取消規定依各商品而不同，付款前請在商品頁確認。
          </p>
          <Table head={["您的行程", "建議", "原因"]} rows={choiceRows.map((r) => [r.situation, r.pick, r.why])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/（官方）" />
          <p className={styles.bodyText} style={{ marginTop: "0.5rem" }}>
            周遊卡可用的完整設施名單，以及 1 日券與 2 日券的試算，請看
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              大阪周遊卡攻略（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看梅田藍天大廈門票 →
            </KlookLink>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              白天去？大阪周遊卡 →
            </KlookLink>
            <KlookLink href={DAY_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              加上大阪城與遊船 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="同一天一起預訂"
          heading="買了梅田藍天大廈門票，還要預訂什麼？"
          intro="展望台只需一兩個小時，這一天還需要晚餐、梅田附近的住宿、從關西機場進市區的交通，以及手機的行動數據。以下四項都能用和門票同一個 Klook 帳號預訂。本頁不列價格，請打開各商品頁查看最新價格。"
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>周遊卡</span>
          <h2 className={styles.sectionTitle}>大阪周遊卡可以免費進梅田藍天大廈嗎？</h2>
          <p className={styles.bodyText}>
            <strong>可以，但只限 9:30 至 15:00。</strong>梅田藍天大廈是大阪周遊卡（與大阪 e-Pass）40 多處免費設施之一，但大樓官方網站與周遊卡營運公司的設施名單，都把周遊卡入場限制在<strong>15:00 之前</strong>；15:00 起周遊卡只能享<strong>9 折</strong>，所以晚上去，除了已付的周遊卡 {PASS_1_DAY}，還要再付約 ¥1,800。這是使用大阪周遊卡當天最容易多花錢的誤解，但介紹這座展望台的文章幾乎都沒有提到。
          </p>
          <p className={styles.bodyText}>
            以周遊卡 1 日券 {PASS_1_DAY}（官方價格，2026 年 11 月 9 日查核）來計算：<strong>15:00 前的這座展望台（¥2,000）</strong>加上<strong>大阪城天守閣（¥1,200）</strong>，門票合計 ¥3,200，略低於周遊卡價格，需要再加上當天的地鐵車資才划算。再加上距梅田 5 分鐘的<strong>HEP FIVE 摩天輪（¥1,000）</strong>，合計 ¥4,200，不算車資就已超過周遊卡價格。反過來說，只為了晚上去這一棟大樓而買周遊卡，一定不划算。周遊卡的完整設施名單、2 日券價格與不適用的項目，請看
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              大阪周遊卡價格與划算試算表（英文）
            </Link>
            ；
            <Link href="/guides/attractions/osaka-castle-tickets" style={linkStyle}>
              大阪城門票攻略（英文）
            </Link>
            則從大阪城的角度做同樣的計算，城牆內就有三處付費設施。設施使用條件於{CHECKED}查核。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看大阪周遊卡 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              只買展望台門票 →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="梅田藍天大廈常見問題" />

        <KlookTourPicks
          heading="大阪一天的其他安排"
          intro="在頂樓待一兩個小時，一天大部分時間還沒用到，而梅田位於市區北端，離道頓堀與大阪城都有段距離。第一個行程一次走完大阪城與展望台，第二個是步行導覽。Klook 價格依日期而不同，請打開商品頁查看最新價格與集合地點。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/dotonbori-river-cruise", title: "道頓堀遊船（2026）：票價、班次時間與搭船處" },
            { href: "/guides/attractions/osaka-castle-tickets", title: "大阪城門票（2026）：票價、開放時間與周遊卡適用範圍（英文）" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周遊卡 2026：價格、是否划算與一日行程（英文）" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "海遊館門票（2026）：票價、開放時間與入場時段（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪景點攻略（2026）：周遊卡划算與不划算的地方（英文）" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "大阪 2 天行程（2026）：每日安排與預訂（英文）" },
            { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "大阪京都 3 天行程（2026）：每日安排與預訂（英文）" },
            { href: "/guides/attractions/osaka-food-tour", title: "大阪美食導覽（2026）：該訂哪一個、會吃到什麼（英文）" },
            { href: "/guides/attractions/where-to-stay-in-osaka", title: "大阪住宿區域 2026：難波、梅田、USJ 比較（英文）" },
            { href: "/guides/transport/osaka-transportation", title: "大阪交通攻略（2026）：地鐵、電車與 IC 卡（英文）" },
            { href: "/guides/transport/osaka-metro-pass", title: "大阪地鐵一日券 2026：1 日券與 2 日券比較（英文）" },
            { href: "/guides/attractions/tokyo-observation-decks", title: "東京展望台比較（2026）：哪一個值得付費（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景點門票價格 2026：官方票價與預約規則（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先決定時間，再選門票</h2>
            <p className={styles.ctaBannerDesc}>
              這裡不會售罄，唯一會影響花費的是參觀時間：15:00 前用大阪周遊卡免費，15:00 後用一張門票換更好的光線與夜景。想用中文結帳畫面與可用的海外信用卡付款，請提前購票，並在付款前確認訂單畫面上的取消規定。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看梅田藍天大廈門票 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                大阪周遊卡 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
