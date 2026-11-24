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
  hakoneCruiseCableCarTour,
  hakoneFreepass,
  hakoneFreepassTripPrep,
  hakoneLoopBusTour,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/hakone-free-pass) section by section as of
// 2026-11-24 (task-jtk-20261124-TR01): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added.
// Title term: 箱根周遊券 — the name on Hakone Navi's own Traditional Chinese page
// (hakonenavi.jp/international/tw/discount_passes/free_pass) and in Taiwan / Hong Kong results.
// Body text is kept on one line per paragraph: a JSX line break inside Chinese text renders as a space.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/hakone-free-pass";
const TITLE = "箱根周遊券 2026：新宿出發票價與是否划算";
const H1 = "箱根周遊券 2026：新宿出發票價、路線與是否划算";
const DESC =
  "箱根周遊券（Hakone Freepass）2026：新宿出發2日券 ¥7,100、小田原出發 ¥6,000。不用周遊券繞一圈 ¥8,322，當天來回也划算。";

const CHECKED_ISO = "2026-11-20";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const BUY_CHECKED_ISO = "2026-11-13";
const BUY_CHECKED = dateLabel(BUY_CHECKED_ISO, LOCALE);
const LOOP_URL = "https://www.hakonenavi.jp/international/en/article/4252";
const JR_URL = "https://odakyu-global.com/blog/2053/";
const LOOP_REGULAR = "¥8,322";
const LOOP_SAVING = "¥1,222";
const NAVI_URL = "https://www.hakonenavi.jp/international/en/discount_passes/free_pass";
const ODAKYU_URL = "https://www.odakyu.jp/english/passes/hakone/";
const FARE_NOTICE_URL = "https://www.hakonenavi.jp/international/en/wp-content/uploads/sites/2/2025/09/re_price202510.pdf";

const PASS_2_DAY_SHINJUKU = "¥7,100";
const PASS_3_DAY_SHINJUKU = "¥7,500";
const PASS_2_DAY_ODAWARA = "¥6,000";
const PASS_3_DAY_ODAWARA = "¥6,400";
const ROMANCECAR = "¥1,200";
const ROPEWAY = "¥2,000";
const CRUISE = "¥1,700";

const HAKONE_PASS_URL = klookFor(hakoneFreepass.url, LOCALE);
const HAKONE_TOUR_URL = klookFor(hakoneLoopBusTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  { pass: "大多數從東京出發的旅客：新宿出發 2 日券", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "新宿出發（含小田急線來回）", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "小田原出發（僅限箱根地區）", d2a: PASS_2_DAY_ODAWARA, d2c: "¥1,500", d3a: PASS_3_DAY_ODAWARA, d3c: "¥1,750" },
  { pass: "町田出發", d2a: "¥6,820", d2c: "¥1,600", d3a: "¥7,220", d3c: "¥1,850" },
  { pass: "藤澤出發", d2a: "¥7,050", d2c: "¥1,600", d3a: "¥7,450", d3c: "¥1,850" },
];

const buyRows = [
  {
    where: "簡單來說",
    ticket: "同行每個人都有智慧型手機，就在出發前線上購票",
    when: "若有沒有自己手機的兒童，就在小田急線車站買實體票",
    note: "電子票存在智慧型手機裡（一起同行時，可用 For Group 選項把最多 4 張放在同一支手機）；實體票則人人都能使用。",
  },
  {
    where: "EMot 線上購票（小田急官方網站）",
    ticket: "電子 QR Code，僅限智慧型手機",
    when: "出發前線上購買",
    note: "一起同行時，可用 For Group 選項在一支手機放最多 4 張。在這裡預訂浪漫特快座位比在車站買便宜 ¥50。只有票券上顯示退款按鈕時才能退款。",
  },
  {
    where: "小田急線各站（售票機）與小田急旅遊服務中心",
    ticket: "實體票",
    when: "小田急線車站從 1 個月前開始販售；售票機只賣當天起算的周遊券",
    note: "售票機可用現金、PASMO／Suica，以及 American Express、Diners Club、JCB、Mastercard、Visa 付款。",
  },
  {
    where: "7-ELEVEN（7-Ticket）",
    ticket: "用店內多功能事務機列印的實體票",
    when: "出發前",
    note: "不收發券手續費。含小田急線來回的版本只賣新宿出發。",
  },
  {
    where: "在箱根當地：箱根登山鐵道售票機與箱根登山巴士服務處",
    ticket: "實體票",
    when: "當天",
    note: "售票機設在箱根湯本、強羅、早雲山等登山鐵道各站；巴士服務處在小田原站、箱根湯本、元箱根、箱根町、仙石、桃源台與宮城野。",
  },
  {
    where: "Klook",
    ticket: "透過 Klook 預訂同一張小田急周遊券",
    when: "出發前線上購買",
    note: "中文結帳頁面，可用海外發行的信用卡付款。憑證怎麼兌換與取消規定，請看商品頁說明。",
  },
];

const coverageRows = [
  {
    mode: "小田急線（新宿 ⇄ 小田原）",
    included: "✓ 來回各 1 次",
    note: "僅限新宿出發的版本，途中可下車。小田原出發的版本不含這段。",
  },
  { mode: "箱根登山電車（小田原／箱根湯本 ⇄ 強羅）", included: "✓ 不限次數", note: "以之字形折返爬坡的登山鐵道，是從箱根湯本出發繞一圈的第一段。" },
  { mode: "箱根登山纜車（強羅 ⇄ 早雲山）", included: "✓ 不限次數", note: "爬到空中纜車起點站的地面纜車。" },
  { mode: "箱根空中纜車（早雲山 ⇄ 大涌谷 ⇄ 桃源台）", included: "✓ 不限次數", note: `經過大涌谷的一段，單程 ${ROPEWAY}，是整圈路線中單趟最貴的交通工具。` },
  { mode: "箱根海賊觀光船（蘆之湖）", included: "✓ 不限次數", note: `從桃源台到箱根町或元箱根，沒有周遊券時單程 ${CRUISE}。特別船艙需另外付費。` },
  { mode: "箱根登山巴士（指定區間）", included: "✓ 不限次數", note: "繞完一圈回到箱根湯本或小田原時搭乘。" },
  { mode: "觀光景點巡遊巴士（KANKO SHISETSU-MEGURI）", included: "✓ 不限次數", note: "由箱根登山巴士與小田急高速巴士在各觀光景點之間行駛。" },
  { mode: "小田急高速巴士（指定區間）", included: "✓ 不限次數", note: "持預約車票的乘客優先上車，因此可能客滿。" },
  { mode: "東海巴士（指定區間）", included: "✓ 不限次數", note: "只能在指定區間內使用。" },
  { mode: "特急浪漫特快", included: "✗ 不含", note: `需另購特急券：新宿到箱根湯本成人 ${ROMANCECAR}、兒童 ¥600。` },
  { mode: "伊豆箱根巴士", included: "✗ 不含", note: "屬於不同業者。上車前請先確認是哪一家巴士公司。" },
];

const legRows = [
  {
    leg: `從新宿出發一天繞完一圈：不用周遊券 ${LOOP_REGULAR}，用周遊券 ${PASS_2_DAY_SHINJUKU}`,
    adult: `省 ${LOOP_SAVING}`,
    child: "—",
    source: "箱根Navi（小田急箱根），IC 卡車資，不含浪漫特快",
  },
  {
    leg: "不用周遊券繞一圈：小田急線來回、登山電車、登山纜車、空中纜車、海賊觀光船、巴士",
    adult: LOOP_REGULAR,
    child: "—",
    source: "箱根Navi 合計（IC 卡車資）",
  },
  { leg: "箱根周遊券 新宿出發 2 日券", adult: PASS_2_DAY_SHINJUKU, child: "¥1,600", source: "odakyu-global.com／hakonenavi.jp" },
  { leg: "合計中的一段：箱根空中纜車 早雲山 → 桃源台（單程）", adult: ROPEWAY, child: "¥700", source: "小田急箱根票價公告，2025 年 10 月 1 日起" },
  { leg: "合計中的一段：蘆之湖海賊觀光船 桃源台 → 箱根町／元箱根（單程）", adult: CRUISE, child: "¥850", source: "小田急箱根票價公告，2025 年 10 月 1 日起" },
  { leg: "小田急線 新宿 ⇄ 小田原（一般車資，單程）", adult: "¥910", child: "—", source: "odakyu.jp" },
  { leg: "來回都搭浪漫特快時", adult: `${PASS_2_DAY_SHINJUKU} + ¥2,400 = ¥9,500`, child: "—", source: "odakyu.jp 試算範例" },
];

const worthRows = [
  {
    plan: "箱根兩天，在溫泉旅館住一晚",
    verdict: "✓ 買 2 日券",
    why: `這張周遊券的價格就是為這種行程訂的。新宿出發 ${PASS_2_DAY_SHINJUKU}，包含小田急線來回，兩天都能搭整圈路線的每一段。`,
  },
  {
    plan: "從東京當天來回，搭完整圈路線",
    verdict: "✓ 一樣划算",
    why: `依箱根Navi 計算，從新宿出發繞完一圈以 IC 卡一般車資計為 ${LOOP_REGULAR}，因此 ${PASS_2_DAY_SHINJUKU} 的周遊券就算只用第一天也能省 ${LOOP_SAVING}。小田急也表示當天來回也划算。`,
  },
  {
    plan: "搭新幹線抵達小田原，或已經住在箱根",
    verdict: "✓ 買小田原出發版本",
    why: `不含用不到的小田急線來回，所以是 ${PASS_2_DAY_ODAWARA}，而不是 ${PASS_2_DAY_SHINJUKU}。在箱根內可搭的 8 種交通工具相同。`,
  },
  {
    plan: "只到箱根湯本泡溫泉、吃午餐",
    verdict: "✗ 不用買",
    why: "不搭空中纜車和海賊觀光船，車資加起來不到周遊券的價格。每次搭乘時再付車資即可。",
  },
  {
    plan: "想繞一圈，但不想自己查時刻表",
    verdict: "✗ 改參加一日遊",
    why: "有導遊隨行的巴士依固定出發時間遊覽大涌谷與蘆之湖，當天晚上回到東京。這和交通周遊券是不同的商品。",
  },
];

const formatRows = [
  { item: "該選哪一種", digital: "同行每個人都有智慧型手機、想避開車站排隊時選電子票", paper: "兒童使用兒童手機，或不想依賴手機電量時選實體票" },
  { item: "購買地點", digital: "EMot 線上購票，僅限智慧型手機", paper: "小田急旅遊服務中心或車站售票機" },
  { item: "付款", digital: "線上付款", paper: "售票機可用現金、PASMO／Suica，以及 American Express、Diners Club、JCB、Mastercard、Visa" },
  { item: "多人同行", digital: "用 For Group 選項，一支手機最多 4 張；必須一起行動，進出閘門時先掃同行者，最後掃自己", paper: "每人一張實體票" },
  { item: "兒童", digital: "6–11 歲付兒童票價，未滿 6 歲不需購票。不能使用日本的兒童手機", paper: "6–11 歲付兒童票價，未滿 6 歲不需購票" },
  { item: "退款", digital: "只有票券上顯示退款按鈕時才能退款；因天候停駛的區段，透過 EMot 客服退款", paper: "遇到停駛時，在最後搭乘的車站只退還未搭乘的交通費用" },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年箱根周遊券多少錢？",
    a: `新宿出發 2 日券成人 ${PASS_2_DAY_SHINJUKU}、兒童（6–11 歲）¥1,600，3 日券為 ${PASS_3_DAY_SHINJUKU}／¥1,850。只含箱根地區的小田原出發版本，2 日券 ${PASS_2_DAY_ODAWARA}／¥1,500，3 日券 ${PASS_3_DAY_ODAWARA}／¥1,750。以上價格自 2025 年 10 月 1 日起適用，於 ${CHECKED} 在 hakonenavi.jp 與 odakyu.jp 查核。`,
  },
  {
    q: "箱根周遊券只用一天划算嗎？",
    a: `搭完整圈路線就划算。周遊券沒有 1 日券，但小田急箱根的官方網站箱根Navi 計算，從新宿出發的整圈路線（小田急線來回、登山電車、登山纜車、空中纜車、蘆之湖海賊觀光船與巴士）以 IC 卡一般車資計為 ${LOOP_REGULAR}，與 2 日券 ${PASS_2_DAY_SHINJUKU} 相比，一天就省 ${LOOP_SAVING}。其中大部分來自空中纜車（單程 ${ROPEWAY}）與海賊觀光船（${CRUISE}）。只去箱根湯本的話並不划算。${CHECKED} 查核。`,
  },
  {
    q: "箱根周遊券在哪裡買？",
    a: `可在小田急的 EMot 線上購票（電子 QR 票，僅限智慧型手機）、小田急線車站售票機與小田急旅遊服務中心（實體票）、7-ELEVEN 的 7-Ticket、小田急旅行門市，以及箱根當地的箱根登山鐵道售票機與箱根登山巴士服務處購買。小田急車站從 1 個月前開始販售；售票機只賣當天起算的周遊券。Klook 也有販售，可用中文頁面結帳。${BUY_CHECKED} 查核。`,
  },
  {
    q: "箱根周遊券包含浪漫特快嗎？",
    a: `不包含。新宿出發的版本含小田急線來回一次，但特急浪漫特快需另購特急券：新宿到箱根湯本單程成人 ${ROMANCECAR}、兒童 ¥600，從小田原出發則是 ¥200／¥100。直達約 80 分鐘，透過 EMot 線上購票預訂座位便宜 ¥50。小田急自己的試算範例：周遊券 ${PASS_2_DAY_SHINJUKU} + 浪漫特快來回 ¥2,400 = ¥9,500。${CHECKED} 查核。`,
  },
  {
    q: "箱根周遊券可以和 JR Pass 一起用嗎？",
    a: `可以搭配使用，但兩者無法互相取代。小田急表示，JR Pass 與 JR 東京廣域周遊券不能在箱根地區內使用，但可以搭 JR 線到小田原。從小田原起，請買只含箱根地區、不含用不到的小田急線的小田原出發箱根周遊券（2 日券 ${PASS_2_DAY_ODAWARA}，3 日券 ${PASS_3_DAY_ODAWARA}）。${CHECKED} 查核。`,
  },
];

const tripPrepItems = [
  withKlookLocale(hakoneFreepassTripPrep[0], LOCALE, {
    label: "箱根大涌谷、蘆之湖與箱根神社巴士一日遊",
    ctaLabel: "查看箱根一日遊 →",
    why: "周遊券沒有 1 日券。若只從東京出發玩一天，有導遊隨行的巴士一次就能遊覽大涌谷與蘆之湖。",
  }),
  withKlookLocale(hakoneFreepassTripPrep[1], LOCALE, {
    label: "箱根所有飯店",
    ctaLabel: "查看箱根住宿 →",
    why: "2 日券可用到第二天的末班車，在箱根住一晚，就能用上已經付費的第二天。",
  }),
  withKlookLocale(hakoneFreepassTripPrep[2], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "電子版周遊券是手機上的 QR Code，空中纜車與海賊觀光船的營運狀況，最方便的方式是在搭乘當天早上用手機查看。",
  }),
];

const tourPicks = [
  withKlookLocale(hakoneLoopBusTour, LOCALE, {
    title: "箱根大涌谷、蘆之湖與箱根神社巴士一日遊",
    desc: "從東京出發、由導遊隨行的巴士繞行箱根一圈，含空中纜車與海賊觀光船。",
  }),
  withKlookLocale(hakoneCruiseCableCarTour, LOCALE, {
    title: "箱根遊船、纜車與大涌谷一日遊",
    desc: "搭船遊蘆之湖、搭纜車越過火山谷，並安排溫泉行程，從東京出發一次預訂一整天。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "箱根周遊券" }];

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
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: r === 0 ? 700 : undefined }}
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

function LastChecked({ children, iso = CHECKED_ISO }: { children?: ReactNode; iso?: string }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      最後查核：{iso}——<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周遊券）</a>、<a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp（箱根周遊券）</a>
      {children}
    </p>
  );
}

export default function ZhTwHakoneFreePassPage({ updated }: { updated: PageUpdated }) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "箱根周遊券（Hakone Freepass）",
              description: DESC,
              brand: "Odakyu",
              currency: "JPY",
              lowPrice: 6000,
              highPrice: 7500,
              offerCount: 4,
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            依小田急官方票價整理新宿與小田原出發的箱根周遊券價格、只用一天就划算的環繞路線、存在手機裡的電子版，以及周遊券不含的浪漫特快座位。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "小田急官方票價", "沒有 1 日券"].map((t) => (
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
            <strong>箱根周遊券（Hakone Freepass）</strong>成人票價為<strong>新宿出發 2 日券 {PASS_2_DAY_SHINJUKU}、3 日券 {PASS_3_DAY_SHINJUKU}</strong>，小田原出發則是 {PASS_2_DAY_ODAWARA} 與 {PASS_3_DAY_ODAWARA}，於 {CHECKED} 在小田急官方網頁查核。可搭乘箱根登山電車、登山纜車、箱根空中纜車、蘆之湖海賊觀光船與箱根的巴士，新宿出發的版本另含小田急線來回一次。依箱根Navi 的計算，一天搭完這整圈路線，<strong>不用周遊券要 {LOOP_REGULAR}</strong>，所以新宿出發的周遊券<strong>一天就能省 {LOOP_SAVING}</strong>；浪漫特快的座位（單程 {ROMANCECAR}）無論哪種版本都要另外付費。
          </p>
          <p className={styles.bodyText}>
            本頁介紹的是周遊券本身：箱根周遊券的價格、可搭乘的範圍與購買地點。一天之內每一站怎麼安排，請看
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              東京出發箱根一日遊（英文）
            </Link>
            ；住一晚、把周遊券兩天都用上的安排，請看
            <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>
              箱根兩天行程（英文）
            </Link>
            。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>新宿出發 2 日券</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_SHINJUKU}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>小田原出發 2 日券</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_ODAWARA}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>可搭乘</p>
                <p className={styles.verdictStatValue}>8 種交通工具</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>浪漫特快</p>
                <p className={styles.verdictStatValue}>+{ROMANCECAR}，不含</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              小田急的英文官方寫法是 <strong>Freepass</strong>，很多人搜尋的是 Hakone Free Pass，兩者是同一張票。周遊券沒有 1 日券；線上購買（EMot 或 Klook）可以避開車站排隊；如果您搭新幹線抵達小田原，請買小田原出發的版本。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                在 Klook 查看箱根周遊券 →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                改看箱根一日遊 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>2026 年箱根周遊券多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            新宿出發 2 日券成人 {PASS_2_DAY_SHINJUKU}，是大多數從東京出發的旅客需要的版本。價格依周遊券的起點車站而不同，3 日券只比 2 日券多 ¥400。
          </p>
          <Table
            head={["出發車站", "2 日券 成人", "2 日券 兒童", "3 日券 成人", "3 日券 兒童"]}
            rows={priceRows.map((r) => [r.pass, r.d2a, r.d2c, r.d3a, r.d3c])}
          />
          <LastChecked>
            。兒童票適用 6–11 歲，未滿 6 歲免費。以上價格自 2025 年 10 月 1 日起適用。浪漫特快座位另計：到箱根湯本，從新宿 {ROMANCECAR}／¥600，從小田原 ¥200／¥100。
          </LastChecked>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            新宿出發還是小田原出發？兩者相差的 ¥1,100 只是新宿 ⇄ 小田原的小田急線來回，兩種版本在箱根內都能搭同樣 8 種交通工具。本站介紹的其他周遊券與門票，整理在
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景點門票價格總表（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 確認箱根周遊券 →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              只有一天？比較有導遊的箱根一日遊 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="同一趟旅程一起預訂"
          heading="買了箱根周遊券，還要預訂什麼？"
          headingLevel={3}
          intro="周遊券只負責交通，不包含一天的行程與住宿。如果只有一天、又不想查時刻表，有導遊隨行的箱根一日遊一次就能預訂同一圈路線；如果有兩天，在箱根訂一間住宿，就能用上已經付費的第二天。電子票需要的行動數據，也能用同一個 Klook 帳號預訂。"
          items={tripPrepItems}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>購買地點</span>
          <h2 className={styles.sectionTitle}>箱根周遊券在哪裡買？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可透過小田急的 EMot 線上購票或 Klook 在線上購買，也可以在小田急線各站、7-ELEVEN 或箱根當地買實體票。不同購買地點，拿到的票券形式與最早可購買的時間不同。
          </p>
          <Table
            head={["購買地點", "拿到的票券", "何時可以買", "注意事項"]}
            rows={buyRows.map((r) => [r.where, r.ticket, r.when, r.note])}
          />
          <LastChecked iso={BUY_CHECKED_ISO}>。Klook 這一列沒有官方資料來源，最新條件以商品頁為準。</LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>包含與不包含</span>
          <h2 className={styles.sectionTitle}>箱根周遊券可以搭哪些交通工具？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            箱根內 8 種交通工具不限次數搭乘，新宿出發的版本另含小田急線來回一次。浪漫特快座位與伊豆箱根巴士不包含在內。
          </p>
          <Table head={["交通工具", "周遊券可搭？", "說明"]} rows={coverageRows.map((r) => [r.mode, r.included, r.note])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            。出示周遊券還可在箱根約 70 處設施享有優惠，但名單會變動，因此本頁不列出金額。
          </LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>划算嗎？</span>
          <h2 className={styles.sectionTitle}>箱根周遊券只用一天划算嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            搭完整圈路線就划算。小田急箱根的官方網站箱根Navi 把新宿出發的經典路線以 IC 卡一般車資計為 {LOOP_REGULAR}，周遊券是 {PASS_2_DAY_SHINJUKU}，所以就算當天晚上就回東京，也能省 {LOOP_SAVING}。
          </p>
          <Table head={["路線（成人，不含浪漫特快）", "成人", "兒童", "資料來源"]} rows={legRows.map((r) => [r.leg, r.adult, r.child, r.source])} />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{CHECKED_ISO}——<a href={LOOP_URL} target="_blank" rel="noopener noreferrer">箱根Navi（整圈合計）</a>、<a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">小田急箱根票價公告（PDF）</a>、<a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp</a>。箱根Navi 沒有把 {LOOP_REGULAR} 拆成各段車資，因此本頁不逐一列出登山電車、登山纜車與巴士的車資。海賊觀光船的特別船艙單程另加 ¥800／¥400。
          </p>
          <Table head={["您的行程", "建議", "原因"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            空中纜車與海賊觀光船遇到惡劣天候都會停駛，空中纜車在大涌谷也可能臨時停止營運。若有區段停駛而沒有搭乘，實體周遊券可在最後搭乘的車站退款。每一站看什麼、何時從東京出發，請看
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              東京出發箱根一日遊（英文）
            </Link>
            ；本頁只介紹周遊券本身。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看箱根周遊券 →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              比較箱根一日遊 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通方式</span>
          <h2 className={styles.sectionTitle}>箱根周遊券包含浪漫特快嗎？</h2>
          <p className={styles.bodyText}>
            不包含。新宿出發的版本含小田急線來回一次，但特急浪漫特快需另購特急券：新宿到箱根湯本<strong>單程成人 {ROMANCECAR}、兒童 ¥600</strong>。<strong>直達約 80 分鐘</strong>，全車對號座，在 EMot 線上購票預訂座位比在車站買便宜 ¥50。小田急提供的新宿出發來回試算範例是周遊券 {PASS_2_DAY_SHINJUKU} 加浪漫特快來回 ¥2,400，合計 ¥9,500。周遊券可搭的一般小田急列車較花時間，通常要在小田原轉車。
          </p>
          <p className={styles.bodyText}>
            箱根也常和富士五湖排在一起，但那是另一張周遊券、另一個地區，請看
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>
              富士山一日遊自助交通（英文）
            </Link>
            。如果箱根是較長行程中的一晚，可在
            <Link href="/guides/attractions/tokyo-7-day-itinerary" style={linkStyle}>
              東京 7 天行程（英文）
            </Link>
            、
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>
              東京 5 天行程（英文）
            </Link>
            與
            <Link href="/guides/attractions/japan-14-day-itinerary" style={linkStyle}>
              日本 14 天行程（英文）
            </Link>
            查看箱根排在哪一天；
            <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>
              箱根附私人溫泉旅館（英文）
            </Link>
            則依區域整理從箱根湯本到蘆之湖的 10 間旅館，以及前往每間旅館的巴士或電車。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>持有 JR Pass</span>
          <h2 className={styles.sectionTitle}>箱根周遊券可以和 JR Pass 一起用嗎？</h2>
          <p className={styles.bodyText}>
            可以，但兩者的用途不同。小田急表示，JR Pass 與 JR 東京廣域周遊券不能在箱根地區內使用，只能搭 JR 線到小田原。從小田原起，<strong>小田原出發的箱根周遊券（2 日券 {PASS_2_DAY_ODAWARA}，3 日券 {PASS_3_DAY_ODAWARA}）</strong>就能搭完整圈路線，也不含您用不到的小田急線。回程若搭浪漫特快到新宿，需另付特急券與小田原–新宿的基本車資。JR Pass 在東京行程中是否划算，請看
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass 攻略（英文）
            </Link>
            與
            <Link href="/guides/transport/tokyo-wide-pass" style={linkStyle}>
              JR 東京廣域周遊券攻略（英文）
            </Link>
            。
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{CHECKED_ISO}——<a href={JR_URL} target="_blank" rel="noopener noreferrer">小田急箱根周遊券常見問題</a>、<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周遊券）</a>。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票券形式</span>
          <h2 className={styles.sectionTitle}>電子票還是實體票：該買哪一種箱根周遊券？</h2>
          <Table head={["", "電子票（EMot）", "實體票"]} rows={formatRows.map((r) => [r.item, r.digital, r.paper])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            。同行者一起行動、能放在同一支手機時選電子票；兒童使用兒童手機，或不想依賴手機電量時選實體票。有效期限以日曆日計算：2 日券在購買隔天的末班車後失效，而不是 48 小時後。
          </LastChecked>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="箱根周遊券常見問題" />

        <KlookTourPicks
          heading="如果只有一天"
          intro="想自己繞一圈，周遊券是正確的選擇。如果只想從東京出發玩一天、不想查時刻表，以下是同一圈路線的導遊隨行版本：一輛巴士、固定出發時間，當天晚上回到市區。請打開商品頁查看您出發日期的最新價格。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/hakone-ryokan-private-onsen", title: "箱根附私人溫泉旅館：依區域精選 10 間（2026）（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 價格 2026：新票價與是否划算（英文）" },
            { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "東京出發箱根一日遊（2026）：周遊券價格與一日遊比較（英文）" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "東京出發富士山一日遊（2026）：自助前往方式（英文）" },
            { href: "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日遊（東京出發．2026）：行程怎麼選、五合目看什麼" },
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "東京出發河口湖一日遊（2026）：路線、車資與一天能排什麼（英文）" },
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "東京 5 天行程（2026）：每日安排（英文）" },
            { href: "/guides/attractions/japan-14-day-itinerary", title: "日本 14 天行程（2026）：兩週每日安排（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新幹線攻略 2026：車票、周遊券與第一次搭乘須知（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景點門票價格 2026：官方票價與預約規則（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>一張票搭完箱根整圈路線</h2>
            <p className={styles.ctaBannerDesc}>
              8 種交通工具、2 天或 3 天，Klook 可用海外發行的信用卡結帳。如果只有一天、又不想查時刻表，同一圈路線的導遊巴士版本更適合您。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看箱根周遊券 →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看箱根一日遊 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
