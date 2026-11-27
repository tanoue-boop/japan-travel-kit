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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  dotonboriDaytimeFoodTour,
  jrPassWholeJapan,
  kantoKansaiLuggageDelivery,
  klookEsim,
  luggageDeliveryCards,
  osakaAmazingPass,
  osakaArrivalShinkansenPrep,
  shinkansenTokyoOsaka,
  tokyoOsakaArrivalPrep,
  tokyoOsakaArrivalStayAreas,
  tokyoOsakaFareTablePrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { PRICES } from "../../../../lib/attraction-prices";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/tokyo-to-osaka-shinkansen) section by section as of
// 2026-11-27 (task jtk-20261127-TR02): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: 東京到大阪新幹線 — the route as Taiwan / Hong Kong results write it (ekitan.com/zh-tw
// "大阪至東京新幹線票價及訂票方式" and its Tokyo → Osaka counterpart, japan-bullettrain.com/zh-tw).

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/transport/tokyo-to-osaka-shinkansen";
const TITLE = "東京到大阪新幹線 2026：票價、車程時間與購票方式";
const H1 = "東京到大阪新幹線 2026：票價、車程時間與購票方式";
const DESC =
  "東京到大阪新幹線票價：希望號指定席 ¥14,720、自由席 ¥13,870，最快 2 小時 21 分。smartEX、Klook、JR Pass 比較。";

const OWN_ISO = "2026-11-21";
const OWN = dateLabel(OWN_ISO, LOCALE);
const EARLIER = dateLabel("2026-11-04", LOCALE);

const WINDOW_NOZOMI = "¥14,720";
const WINDOW_HIKARI = "¥14,400";
const SMART_NOZOMI = "¥14,520";
const SMART_HIKARI = "¥14,200";
const NON_RESERVED = "¥13,870";
const NOZOMI_TICKET = "¥4,960";
const JR_PASS_ONLINE = "¥50,000";
const JR_PASS_ORDER = "¥53,000";

const SHINKANSEN_URL = klookFor(shinkansenTokyoOsaka.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);
const LUGGAGE_URL = klookFor(kantoKansaiLuggageDelivery.url, LOCALE);
const AMAZING_PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const FOOD_TOUR_URL = klookFor(dotonboriDaytimeFoodTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

/** Only the periods still ahead on the date this page was checked. */
const nozomiAllReservedPeriods = [
  "2026 年 11 月 21–23 日",
  "2026 年 12 月 25 日–2027 年 1 月 5 日",
  "2027 年 1 月 9–11 日",
  "2027 年 3 月 20–22 日",
];

const fareRows = [
  {
    train: "希望號：最快，建議預訂這一種",
    time: "最快 2 小時 21 分，一般 2 小時 27 分",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_NOZOMI}（smartEX ${SMART_NOZOMI}）`,
    green: "¥19,590（smartEX ¥19,390）",
    pass: `不可，需另購 ${NOZOMI_TICKET} 車票`,
  },
  {
    train: "光號：JR Pass 可搭的列車",
    time: "2 小時 48 分至 3 小時 06 分",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI}（smartEX ${SMART_HIKARI}）`,
    green: "¥19,270（smartEX ¥19,070）",
    pass: "可以",
  },
  {
    train: "回聲號（每站皆停）",
    time: "3 小時 42 分至 3 小時 54 分",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI}（smartEX ${SMART_HIKARI}）`,
    green: "¥19,270（smartEX ¥19,070）",
    pass: "可以",
  },
];

const frequencyRows = [
  {
    item: "希望號，東京 → 新大阪",
    value: "160 班，2 小時 21 分至 2 小時 30 分",
    detail: "2026 年 11 月 21 日從東京出發、開到新大阪的所有希望號；一般（中位數）車程 2 小時 27 分，不用轉車",
    source: "JR東海時刻表資料",
  },
  {
    item: "希望號首班車與末班車",
    value: "06:00 與 21:24",
    detail: "2026 年 11 月 21 日的東京出發時間。假日時刻表的末班車時間會變動，請查看您搭乘日期的時刻表",
    source: "JR東海時刻表資料",
  },
  {
    item: "光號與回聲號",
    value: "28 班與 11 班",
    detail: "同一天光號 2 小時 48 分至 3 小時 06 分，回聲號 3 小時 42 分至 3 小時 54 分，是 JR Pass 可搭乘的列車",
    source: "JR東海時刻表資料",
  },
  {
    item: "全線班次",
    value: "每小時最多 18 班",
    detail: "錯過一班車，通常不必久等",
    source: "global.jr-central.co.jp",
  },
];

const passRows = [
  {
    item: "東京–大阪來回一趟",
    answer: "買單程車票，不買周遊卡",
    cost: `smartEX 希望號指定席兩張 ¥29,040，最便宜的 7 日周遊卡為 ${JR_PASS_ONLINE}`,
  },
  {
    item: "7 日普通車 JR Pass",
    answer: "2026 年 10 月 1 日起的價格",
    cost: `官方網站 ${JR_PASS_ONLINE}，海外旅行社的兌換券 ${JR_PASS_ORDER}`,
  },
  {
    item: "光號與回聲號",
    answer: "周遊卡可搭乘",
    cost: "普通車指定席與自由席都不必另付費用",
  },
  {
    item: "希望號",
    answer: "只持周遊卡不能搭乘",
    cost: `東京–新大阪每搭一次 ${NOZOMI_TICKET}，指定席、自由席、綠色車廂同價（綠色車廂限綠色周遊卡持有人）`,
  },
  {
    item: "周遊卡划算的情況",
    answer: "7 天內搭 4 段以上長途",
    cost: "以 smartEX 價格計算，要搭 4 趟希望號單程才會超過 ¥50,000，所以要再加上廣島、金澤或東北",
  },
];

const bookingRows = [
  {
    route: "smartEX（JR 官方網站與 App）：首選",
    price: `希望號指定席 ${SMART_NOZOMI}，所有指定席便宜 ¥200`,
    when: "從乘車日 1 年前的 5:30 起，到發車前 4 分鐘。座位在 1 個月前的 8:00 後確定",
    cancel: "購買後 3 個月內、發車前 4 分鐘前可免費變更，次數不限。退票手續費 ¥320",
  },
  {
    route: "Klook 東京 → 大阪鐵路頁面",
    price: "結帳時依日期顯示",
    when: "選擇日期、車次與座位等級：自由席、指定席或綠色車廂",
    cancel: "依 Klook 自己的規定，付款前會顯示",
  },
  {
    route: "車站售票機或售票櫃檯",
    price: `車站價格：希望號 ${WINDOW_NOZOMI}，光號指定席 ${WINDOW_HIKARI}`,
    when: "在東京車站當天購買，或從列車自起站發車前 1 個月的 10:00 起購買指定席",
    cancel: `請向售票櫃檯洽詢。JR Pass 持有人也是在這裡購買 ${NOZOMI_TICKET} 的希望號車票`,
  },
  {
    route: "JR Pass（7 日普通車）",
    price: `線上 ${JR_PASS_ONLINE}，海外旅行社 ${JR_PASS_ORDER}；希望號每次另付 ${NOZOMI_TICKET}`,
    when: "持周遊卡可免費劃光號與回聲號座位；希望號車票從乘車 1 個月前起在日本的 JR 車站販售",
    cancel: "只有同樣 7 天內還要去廣島、金澤或東北才划算，請參考上方的 JR Pass 表格",
  },
];

const altRows = [
  {
    option: "新幹線自由席",
    time: "依車種 2 小時 21 分至 3 小時 54 分",
    cost: `${NON_RESERVED}，全年同價`,
    verdict: "最便宜的新幹線座位。不能選位，沒有超大件行李座位，旺季時希望號沒有自由席車廂。",
    source: `smart-ex.jp 票價表，${OWN}`,
  },
  {
    option: "smartEX 新幹線指定席",
    time: "最快 2 小時 21 分",
    cost: `光號 ${SMART_HIKARI}，希望號 ${SMART_NOZOMI}`,
    verdict: "每個指定席都比車站價格便宜 ¥200。smartEX 也販售名額有限的早鳥票，價格以 smart-ex.jp 為準。",
    source: `smart-ex.jp 與 JR東海，${OWN}`,
  },
  {
    option: "夜間高速巴士",
    time: "約 8 至 9 小時",
    cost: "依日期、業者與座位而異，請查看商品頁",
    verdict: "票價最低，能在車上睡的話還能省一晚住宿。不適合帶大行李箱。",
    source: `kosokubus.com（訂票網站，不是營運業者），${EARLIER}`,
  },
  {
    option: "飛機，羽田 → 伊丹或關西",
    time: "不列出",
    cost: "依日期與航空公司而異",
    verdict: "ANA 與 JAL 官方網頁沒有公布飛行時間，因此不列出。比較時請加上兩端往返機場的交通。",
    source: `ana.co.jp 與 jal.co.jp，${EARLIER}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "東京到大阪新幹線票價多少？",
    a: `希望號普通車指定席在車站購買單程 ${WINDOW_NOZOMI}，在 JR 的 smartEX 購買 ${SMART_NOZOMI}。光號與回聲號指定席 ${WINDOW_HIKARI}（smartEX ${SMART_HIKARI}），任何車種的自由席都是 ${NON_RESERVED}。以上是大人 1 位、平常期的價格；指定席在旺季貴 ¥200、最旺季貴 ¥400，離峰期便宜 ¥200。希望號綠色車廂 ¥19,590（smartEX ¥19,390）。於 ${OWN} 在 JR東海與 smartEX 官方網頁查核。`,
  },
  {
    q: "東京到大阪新幹線要多久？",
    a: `從東京車站到新大阪，希望號最快 2 小時 21 分，一般 2 小時 27 分，不用轉車。JR東海的時刻表資料顯示，2026 年 11 月 21 日共有 160 班希望號行駛這段路線，首班車 06:00，末班車 21:24。光號需 2 小時 48 分至 3 小時 06 分，每站皆停的回聲號需 3 小時 42 分至 3 小時 54 分。${OWN} 查核。`,
  },
  {
    q: "東京到大阪新幹線需要先劃位嗎？",
    a: `通常不需要，但有些日期需要。平常日每小時最多 18 班，自由席車票（${NON_RESERVED}）就夠用。以下期間希望號全車都是指定席：${nozomiAllReservedPeriods.join("；")}。這些期間光號與回聲號仍有自由席車廂，但 JR 提醒可能非常擁擠。三邊合計 161 至 250 公分的行李（沒有劃超大件行李座位就上車需付 ¥1,000）、有固定的轉乘行程，或想坐看得到富士山的座位時，一定要先劃位。於 ${OWN} 在 JR東海網站查核。`,
  },
  {
    q: "只去東京–大阪，買 JR Pass 划算嗎？",
    a: `不划算。smartEX 希望號指定席兩張 ¥29,040，7 日普通車周遊卡線上購買 ${JR_PASS_ONLINE}，海外旅行社 ${JR_PASS_ORDER}（2026 年 10 月 1 日起的價格）。而且周遊卡搭希望號每次都要另購 ${NOZOMI_TICKET} 的車票，只在日本的 JR 車站販售。同一週還要去廣島、金澤或東北，才開始划算。於 ${OWN} 在 japanrailpass.net 查核。`,
  },
  {
    q: "東京到大阪坐哪一側看得到富士山？",
    a: "往西行駛時的右側：普通車選 E 座，綠色車廂選 D 座，這是 JR東海官方指南指定的座位。自由席無法保證坐到，所以請劃位；JR東海也提醒，依天氣可能看不到富士山。於 2026 年 11 月 21 日在 global.jr-central.co.jp 查核。",
  },
];

const topPrep = [
  withKlookLocale(osakaArrivalShinkansenPrep[0], LOCALE, {
    label: "梅田、大阪車站周邊飯店",
    ctaLabel: "在 Klook 查看大阪車站周邊飯店 →",
    why: "梅田距新大阪只有御堂筋線兩站，下了月台很快就到飯店。",
  }),
  withKlookLocale(osakaArrivalShinkansenPrep[1], LOCALE, {
    label: "大阪周遊卡（1 日／2 日）",
    ctaLabel: "查看大阪周遊卡 →",
    why: "從走出新大阪那一刻起就能搭大阪地鐵與市營巴士，同一天也能用來參觀大阪城與搭乘遊船。",
  }),
  withKlookLocale(osakaArrivalShinkansenPrep[2], LOCALE, {
    label: "日本環球影城電子門票",
    ctaLabel: "查看環球影城門票 →",
    why: "如果去大阪就是為了環球影城：指定日期的電子門票可掃 QR Code 直接入園，不必在入口排隊買票。",
  }),
];

const fareTablePrep = [
  withKlookLocale(tokyoOsakaFareTablePrep[0], LOCALE, {
    label: "大阪城、梅田藍天大廈與道頓堀遊船一日遊",
    ctaLabel: "查看大阪一日遊 →",
    why: "大阪城、梅田展望台與道頓堀遊船安排成一天的導覽行程，適合抵達隔天早上，或從東京搭早班希望號的那天。",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[1], LOCALE, {
    label: "大阪周遊卡（1 日／2 日）",
    ctaLabel: "查看大阪周遊卡 →",
    why: "從走出新大阪那一刻起就能搭大阪地鐵與市營巴士，同一天也能用來參觀大阪城與搭乘遊船。",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[2], LOCALE, {
    label: "日本環球影城周邊飯店（環球城）",
    ctaLabel: "在 Klook 查看環球城飯店 →",
    why: "如果去大阪就是為了環球影城：從環球城站步行約 5 分鐘就到園區入口，請把同一晚的房間和座位一起訂好。",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[3], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "smartEX 變更、QR 車票與誤點通知都會傳到手機上，抵達東京車站前就需要行動數據。",
  }),
];

const arrivalPrep = [
  withKlookLocale(tokyoOsakaArrivalPrep[0], LOCALE, {
    label: "道頓堀白天美食導覽",
    ctaLabel: "查看美食導覽 →",
    why: "行程時間為 11:00 至 14:00，約 08:00 前從東京搭上列車就趕得上，下午還有時間。",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[1], LOCALE, {
    label: "大阪周遊卡（1 日／2 日）",
    ctaLabel: "查看大阪周遊卡 →",
    why: "從走出新大阪那一刻起就能搭大阪地鐵與市營巴士，同一天也能用來參觀大阪城與搭乘遊船。",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[2], LOCALE, {
    label: "梅田、大阪車站周邊飯店",
    ctaLabel: "在 Klook 查看大阪車站周邊飯店 →",
    why: "房間和座位一起訂，要搭的車次和抵達當晚的住宿一次就能確定。",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[3], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "變更 smartEX 座位或查看誤點通知都在手機上進行，抵達東京車站前就需要行動數據。",
  }),
  withKlookLocale(luggageDeliveryCards.tokyoToOsakaFlyHome, LOCALE, {
    label: "行李配送（大阪、京都飯店 ⇔ 關西機場）",
    ctaLabel: "查看飯店 → 關西機場配送 →",
    why: "如果從關西搭機回國，最後一天早上和移動日的做法相同：行李箱先離開大阪或京都的飯店，在關西機場等您。",
    guide: { href: "/guides/transport/japan-luggage-delivery", label: "行李配送使用方式（英文）" },
  }),
];

const stayAreas = [
  withKlookLocale(tokyoOsakaArrivalStayAreas[0], LOCALE, {
    area: "大阪梅田",
    why: "從新大阪搭御堂筋線兩站，與大阪車站相連；回程也搭火車的話，是較方便的住宿區域。",
  }),
  withKlookLocale(tokyoOsakaArrivalStayAreas[1], LOCALE, {
    area: "大阪難波",
    why: "從新大阪搭同一班御堂筋線列車直達，走路可到道頓堀，也是前往關西機場的南海電鐵起點。",
  }),
  withKlookLocale(tokyoOsakaArrivalStayAreas[2], LOCALE, {
    area: "大阪天王寺",
    why: "御堂筋線常用區段的終點；如果從關西機場出境，JR HARUKA 直接停靠這一站。",
  }),
];

const tourPicks = [
  withKlookLocale(dotonboriDaytimeFoodTour, LOCALE, {
    title: "大阪道頓堀白天美食導覽",
    desc: "11:00 至 14:00、2 至 10 人的 3 小時併團步行導覽，包含串炸、章魚燒、居酒屋季節午餐套餐與在地甜點",
  }),
  withKlookLocale(osakaAmazingPass, LOCALE, {
    title: "大阪周遊卡（1 日／2 日）",
    desc: "大阪地鐵與市營巴士無限次搭乘，並可免費進入 40 多處設施的電子周遊卡",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "東京到大阪新幹線" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function LastChecked({ date, sources }: { date: string; sources: { label: string; href?: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      <strong>最後查核：{date}</strong>。{" "}
      {sources.map((s, i) => (
        <span key={s.label}>
          {i > 0 ? "、" : ""}
          {s.href ? (
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ) : (
            s.label
          )}
        </span>
      ))}
    </p>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
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
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : c === 1 ? styles.tdPrice : undefined}
                    style={{ fontSize: c === 0 ? "0.88rem" : "0.85rem" }}
                  >
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

export default function ZhTwTokyoToOsakaShinkansenPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

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
          <p className={styles.eyebrow}>更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            希望號、光號、回聲號各種座位的票價，新幹線要坐多久，JR Pass 划不划算，以及在哪裡購票。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "JR 官方票價（標註查詢日）", "JR Pass 回本點", "購票方式比較"].map((t) => (
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
            最快的<strong>東京到大阪新幹線</strong>是希望號，從東京車站到新大阪需 <strong>2 小時 21 分</strong>（一般班次 2 小時
            27 分），2026 年 11 月 21 日共有 160 班希望號行駛這段路線。希望號指定席在車站購買單程 <strong>{WINDOW_NOZOMI}</strong>，在
            JR 的 smartEX 購買 {SMART_NOZOMI}；任何車種的自由席都是 <strong>{NON_RESERVED}</strong>。JR Pass 可搭光號（指定席{" "}
            {WINDOW_HIKARI}，約 3 小時），但搭希望號要另購 {NOZOMI_TICKET} 的車票，所以只來回一趟的話，買兩張單程票比較便宜。票價與車程於{" "}
            {OWN} 在 JR東海與 smartEX 官方網頁查核。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>希望號指定席票價</p>
                <p className={styles.verdictStatValue}>{WINDOW_NOZOMI}，smartEX {SMART_NOZOMI}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最快車程</p>
                <p className={styles.verdictStatValue}>2 小時 21 分，不用轉車</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最便宜的座位</p>
                <p className={styles.verdictStatValue}>自由席 {NON_RESERVED}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>持 JR Pass 搭希望號</p>
                <p className={styles.verdictStatValue}>需另購 {NOZOMI_TICKET} 車票</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>簡單來說：</strong>除非同一週還要去廣島、金澤或東北，否則去程與回程各買一張希望號指定席。smartEX 兩張單程票{" "}
              ¥29,040，最便宜的 7 日周遊卡則是 {JR_PASS_ONLINE}。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看東京 → 大阪車票 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="和新幹線一起安排"
          heading="訂座位時一起安排的大阪行程"
          intro="希望號的終點是新大阪。住宿、市區周遊卡與樂園門票，趁訂票頁面還開著時一起決定最方便。"
          items={topPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>東京到大阪新幹線票價多少？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            希望號指定席單程 {WINDOW_NOZOMI}，smartEX {SMART_NOZOMI}（大人 1 位、平常期）。三種車的自由席都是 {NON_RESERVED}，不隨季節變動；指定席在旺季貴
            ¥200、最旺季貴 ¥400，離峰期便宜 ¥200。
          </p>
          <Table
            head={["車種", "東京 → 新大阪", "自由席", "指定席（車站／smartEX）", "綠色車廂", "可用 JR Pass？"]}
            rows={fareRows.map((r) => [r.train, r.time, r.nonReserved, r.reserved, r.green, r.pass])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "JR東海與 JR西日本新聞稿，2026 年 10 月 16 日（車站票價）", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
              { label: "smartEX 指定席票價（PDF）", href: "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_reserved.pdf" },
              { label: "smartEX 服務說明", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "JR東海列車資訊", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            車程是 JR東海時刻表資料中，2026 年 11 月 21 日東京到新大阪最快與最慢的班次。光號與綠色車廂的車站價格是依 JR東海新聞稿的費用表計算，各比
            smartEX 價格高 ¥200。Klook 的價格依日期變動，因此本頁不列出。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Klook 東京 → 大阪車票 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          headingLevel={3}
          label="抵達大阪當天"
          heading="抵達大阪當天要預訂的項目"
          intro="座位只占這一天的 2 小時。離開東京前先安排好其餘部分的四個項目：有導遊帶的第一天、市區周遊卡、以樂園為目的時環球影城入口旁的房間，以及手機的行動數據。"
          items={fareTablePrep}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>車程</span>
          <h2 className={styles.sectionTitle}>東京到大阪新幹線要多久？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            最快的希望號 2 小時 21 分，一般希望號 2 小時 27 分，不用轉車。光號停靠站較多，需 2 小時 48 分至 3 小時 06 分，回聲號需 3 小時 42 分至 3 小時 54
            分；開往新大阪的希望號從東京出發的時間為 06:00 至 21:24。
          </p>
          <Table
            head={["項目", "數值", "代表什麼", "資料來源"]}
            rows={frequencyRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "JR東海列車資訊（2026 年 11 月 21 日時刻表）", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
              { label: "JR東海 東海道新幹線", href: "https://global.jr-central.co.jp/en/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            班次數為某個星期六的資料，平日與假日時刻表不同。看得到富士山的一側、行李規定與新幹線整體介紹，請見{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              新幹線新手指南（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>只去東京–大阪，買 JR Pass 划算嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            只來回一趟並不划算：smartEX 希望號指定席兩張 ¥29,040，最便宜的 7 日周遊卡是 {JR_PASS_ONLINE}。周遊卡可搭光號與回聲號，但每次搭希望號都要另購{" "}
            {NOZOMI_TICKET} 的車票，而且只在日本的 JR 車站販售，乘車 1 個月前開始發售。
          </p>
          <Table
            head={["問題", "答案", "費用"]}
            rows={passRows.map((r) => [r.item, r.answer, r.cost])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "japanrailpass.net 價格", href: "https://japanrailpass.net/en/purchase/price/" },
              { label: "japanrailpass.net 希望號與瑞穗號車票", href: "https://japanrailpass.net/en/use/special-ticket/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            14 日與 21 日普通車周遊卡線上 ¥80,000、¥100,000，旅行社 ¥84,000、¥105,000。
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass 價格指南（英文）
            </Link>
            整理了 2026 年 10 月的漲價，並依您自己的路段計算回本點。想繞經金澤前往嗎？
            <Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>
              Hokuriku Arch Pass（英文）
            </Link>
            可在 7 天內搭北陸新幹線與雷鳥號從東京到大阪，但不能搭東海道新幹線。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS（7／14／21 日）→
            </KlookLink>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              或在 Klook 買單程票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>更便宜的方式</span>
          <h2 className={styles.sectionTitle}>東京到大阪有更便宜的交通方式嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            新幹線之中，{NON_RESERVED} 的自由席是最便宜的一般票價，smartEX 的所有指定席便宜 ¥200。比這更便宜的是夜間高速巴士，約需 8 至 9 小時。
          </p>
          <Table
            head={["選項", "時間", "費用", "評估", "資料來源與查核日"]}
            rows={altRows.map((r) => [r.option, r.time, r.cost, r.verdict, r.source])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "smartEX 自由席票價（PDF）", href: "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_non_reserved.pdf" },
              { label: "smartEX 服務說明", href: "https://smart-ex.jp/en/product/plan/service/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            途中想在京都停留嗎？
            <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
              東京到京都交通（英文）
            </Link>
            比較了這一段的巴士與火車，
            <Link href="/zh-tw/guides/transport/kyoto-to-tokyo-shinkansen" style={linkStyle}>
              京都到東京新幹線攻略
            </Link>
            則介紹回程。其他路段請看
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              新幹線購票方式（英文）
            </Link>
            的表格，比較 smartEX、車站、Klook 與 JR Pass，以及大件行李座位的規定。
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            從東京到大阪途中可以在名古屋下車嗎？
          </h3>
          <p className={styles.bodyText}>
            可以，只要是超過 100 公里的基本車資乘車券：JR東海允許在起點與終點之間的車站中途下車（出站後再進站），但不能走回頭路。新幹線的特急券不能用於中途下車，所以請分開購買東京
            → 名古屋與名古屋 → 新大阪；smartEX 則不能中途下車，一出站，沒搭的區段就會失效。規定於 2026 年 11 月 13 日在 JR東海的
            <a href="https://global.jr-central.co.jp/en/tickets/type/stopovers.html" target="_blank" rel="noopener">
              中途下車說明頁
            </a>
            與 smart-ex.jp 查核。在名古屋怎麼安排這一天，請見
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen" style={linkStyle}>
              東京到名古屋新幹線指南（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>購票</span>
          <h2 className={styles.sectionTitle}>東京到大阪新幹線怎麼訂票？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            想要最低的指定席價格與免費變更，用 smartEX；想和其他行程一起結帳、自己選車次與座位等級，用 Klook；已經在日本、當天出發，到車站購買；同一週會去比大阪遠得多的地方，才考慮
            JR Pass。
          </p>
          <Table
            head={["購票管道", "價格", "何時可以購票", "變更與退票"]}
            rows={bookingRows.map((r) => [r.route, r.price, r.when, r.cancel])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "smartEX 服務說明", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "JR東海與 JR西日本新聞稿（車站票價）", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
              { label: "japanrailpass.net 希望號與瑞穗號車票", href: "https://japanrailpass.net/en/use/special-ticket/" },
              { label: "Klook 的規定顯示在結帳頁面" },
            ]}
          />
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 選擇車次與座位等級 →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            東京到大阪新幹線需要先劃位嗎？
          </h3>
          <p className={styles.bodyText}>
            平常日不需要，但以下日期需要：這些期間希望號全車都是指定席，沒有當天購買的希望號自由席車票，早上的班次最先售罄。光號與回聲號仍有自由席車廂，但 JR
            提醒可能非常擁擠。於 {OWN} 在 JR東海網站查核。
          </p>
          <ul className={styles.pickList}>
            {nozomiAllReservedPeriods.map((period) => (
              <li key={period}>
                <span className={styles.proIcon}>▸</span>
                <span><strong>{period}</strong></span>
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            其他日期只有三種情況需要先劃位：三邊合計 161 至 250 公分的行李，需要附超大件行李放置區的指定席（沒有劃位就上車需付 ¥1,000，超過 250
            公分的行李不能帶上車）；有固定的轉乘行程；或想看富士山。自由席車廂兩種座位都沒有。行李規定於 {OWN} 在 JR東海的
            <a href="https://global.jr-central.co.jp/en/info/oversized-baggage/" target="_blank" rel="noopener noreferrer">
              超大件行李說明頁
            </a>
            查核。
          </p>
          <p className={styles.bodyText}>
            如果問題在行李箱而不是座位，可以讓行李另外運送：Klook 上的 LuggAgent 當日配送，會把行李從東京地區的飯店送到大阪地區的飯店。訂購前請在商品頁確認兩間飯店都在服務範圍內，以及早上的寄件截止時間。較慢但較便宜的是大和運輸的宅急便（TA-Q-BIN），各尺寸價格請見
            <Link href="/guides/transport/japan-luggage-delivery" style={linkStyle}>
              日本行李配送（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <KlookLink href={LUGGAGE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              東京 → 大阪當日行李配送 →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            東京到大阪坐哪一側看得到富士山？
          </h3>
          <p className={styles.bodyText}>
            往西行駛時的右側：普通車選 <strong>E 座</strong>，綠色車廂選 <strong>D 座</strong>，這是 JR東海官方指南指定的座位。可在 smartEX
            的座位圖上選擇，或在售票櫃檯指定；能否看到要看天氣，JR東海也提醒可能看不到富士山。於 {OWN} 在
            <a href="https://global.jr-central.co.jp/en/goldenroute/shinkansen/" target="_blank" rel="noopener noreferrer">
              JR東海 Shinkansen Perfect Guide
            </a>
            查核。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>票價調整</span>
          <h2 className={styles.sectionTitle}>東京到大阪新幹線票價會漲嗎？</h2>
          <p className={styles.bodyText}>
            會，從 2027 年起。JR東海與 JR西日本於 2026 年 10 月 16 日宣布，<strong>2027 年 7 月 1 日起購買的車票</strong>，希望號指定席價格上調，東京到新大阪從{" "}
            {WINDOW_NOZOMI} 調為 <strong>¥15,420</strong>。綠色車廂自 2027 年 12 月 15 日起搭乘的車票，從 ¥19,590 調為 <strong>¥23,290</strong>。自由席費用不變，在這些日期前購票的行程不受影響。新聞稿只列出車站價格，沒有
            smartEX 價格。{OWN} 查核。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>抵達</span>
          <h2 className={styles.sectionTitle}>搭新幹線抵達後，大阪住哪裡好？</h2>
          <p className={styles.bodyText}>
            梅田或難波，兩者都在新大阪出發的御堂筋線上。新幹線不到大阪車站，所以最後這段地鐵每趟都少不了；梅田只要兩站，難波再多幾站，都是同一班車。各區比較請見
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>
              大阪住宿區域指南（英文）
            </Link>
            。如果上午就抵達，1 日 {PRICES.osakaAmazingPass.adult} 的大阪周遊卡可搭地鐵並進入景點（營運單位價格，於{" "}
            {dateLabel(PRICES.osakaAmazingPass.checked, LOCALE)} 查核）；
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              大阪周遊卡回本計算表（英文）
            </Link>
            有詳細計算，
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>
              大阪 2 天行程（英文）
            </Link>
            則安排之後的行程。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={AMAZING_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪周遊卡 →
            </KlookLink>
            <KlookLink href={FOOD_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              道頓堀美食導覽 →
            </KlookLink>
          </div>
        </section>

        <KlookStayAreas
          heading="御堂筋線沿線的大阪飯店"
          intro="三個區域都在新大阪出發的御堂筋線上，所以選擇的重點是之後的行程，而不是怎麼過去。"
          areas={stayAreas}
        />

        <KlookTripPrep
          label="和新幹線一起安排"
          heading="抵達當天要預訂的項目"
          intro="這一天的火車 JR 已經幫您安排好了。其餘需要準備的是：抵達後的午餐、市區交通、住宿、手機的行動數據，以及若從關西搭機回國，最後一天早上的行李配送。"
          items={arrivalPrep}
        />

        <KlookTourPicks
          heading="抵達第一天下午可以預訂的行程"
          intro="中午前後抵達的話，這兩項就能排滿一天。可預訂日期與目前價格，請打開商品頁確認。"
          tours={tourPicks}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>出發前</span>
          <h2 className={styles.sectionTitle}>上車前要準備好的一件事</h2>
          <p className={styles.bodyText}>
            行動數據。smartEX 變更、QR 車票與誤點通知都在手機上，一走出新大阪就需要地圖。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              查看 Klook eSIM →
            </KlookLink>{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan" style={linkStyle}>
              日本 eSIM 推薦攻略
            </Link>
            比較了其他選擇。
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/japan-first-time-itinerary", title: "第一次去日本行程（2026）：9 天每日安排（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新幹線指南 2026：車票、周遊卡與新手須知（英文）" },
            { href: "/guides/transport/tokyo-to-kyoto", title: "東京到京都（2026）：最便宜與最快的方式（英文）" },
            { href: "/zh-tw/guides/transport/kyoto-to-tokyo-shinkansen", title: "京都到東京新幹線 2026：票價、車程時間與購票方式" },
            { href: "/guides/transport/tokyo-to-nagoya-shinkansen", title: "東京到名古屋新幹線：車程、票價與 JR Pass（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 價格 2026：10 月 1 日新價格與值不值得（英文）" },
            { href: "/zh-tw", title: "繁體中文版所有攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先訂好座位，再安排大阪的行程</h2>
            <p className={styles.ctaBannerDesc}>
              想看富士山選 E 座，帶大行李選指定席車廂，持 JR Pass 就搭光號。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看東京 → 大阪車票 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
