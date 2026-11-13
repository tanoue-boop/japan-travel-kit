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
import { GygCompareButton } from "../../../../components/GygCompare";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import {
  klookEsim,
  roppongiHotels,
  tokyoSubwayTicket,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor } from "../../../../lib/klook-locale";
import { zhTeamlabBorderless } from "../../../../lib/klook-links-zh-tw";
import { gygTeamlabBorderless } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English guide (pages/guides/attractions/teamlab-borderless-tickets.tsx) as of
// 2026-11-13 (task-jtk-20261113-R01), section by section. The prices, Flexible Pass, hours
// and closed days were re-read off teamlab.art/e/tokyo/, and the sale window, time needed,
// cancellation, re-entry and child rules off teamlab.art/faq/tokyo/, on 13 November 2026 —
// so this page carries that date. Nothing was added beyond the English page.
// This is the Borderless booking page; "Planets or Borderless?" belongs to teamlab-tokyo-tickets.

const ROUTE = "/zh-tw/guides/attractions/teamlab-borderless-tickets";
const TITLE = "teamLab 無界 門票 2026：Borderless 預約方式";
const H1 = "teamLab Borderless 門票 2026：票價、入場時段與預約方式";
const DESC =
  "teamLab Borderless 門票 2026：成人 ¥3,400 起，依日期與時段定價，約提前 2 個月開賣，館內約 1.5～2 小時。看預約方式。";

const BORDERLESS_URL = zhTeamlabBorderless.url;
const GYG_SLUG = "zh-tw-teamlab-borderless-tickets";

const P = PRICES.teamlabBorderless;
const CHECKED_ISO = "2026-11-13";
const CHECKED = dateLabel(CHECKED_ISO, "zh-tw");
const OFFICIAL_URL = "https://www.teamlab.art/e/tokyo/";
const FAQ_URL = "https://www.teamlab.art/faq/tokyo/";
const ADULT = priceLabel(P.adult, "zh-tw");
const CHILD = priceLabel(P.child, "zh-tw");

const PLANETS = PRICES.teamlabPlanets;
const PLANETS_CHECKED = dateLabel(PLANETS.checked, "zh-tw");

// The date the official ticket address redirect was confirmed (English: ADDRESS_CHECKED).
const ADDRESS_CHECKED = dateLabel("2026-10-26", "zh-tw");
// GYG_CHECKED_AT in lib/gyg-links.ts ("21 Oct 2026"), written as a Chinese date.
const GYG_CHECKED = dateLabel("2026-10-21", "zh-tw");

const priceRows = [
  {
    ticket: "成人（18 歲以上）",
    price: ADULT,
    varies: "會——依日期與入場時段",
    note: "¥3,400 是底價，不是你的價格：付款前請確認你那天的金額",
  },
  { ticket: "13～17 歲", price: "¥2,800", varies: "不會——固定價", note: "入場時請攜帶可證明年齡的證件" },
  { ticket: "4～12 歲", price: CHILD, varies: "不會——固定價", note: "不論選哪一天都一樣" },
  { ticket: "3 歲以下", price: "免費", varies: "不會——免費", note: "不需購票" },
  {
    ticket: "身心障礙者",
    price: "¥1,700 起",
    varies: "會——與成人票同一套票價行事曆",
    note: "一位陪同者同享優惠票價；請攜帶資格證明",
  },
  {
    ticket: "彈性入場券（不指定入場時間）",
    price: "¥12,000",
    varies: "官方只列一個價格（成人／兒童）",
    note: "在選定的日期內有效，最後入場前都能進場",
  },
  {
    ticket: "現場購票",
    price: "成人 +¥200",
    varies: "—",
    note: "只在還有名額時販售；官方頁面另列現場價格，與線上不同",
  },
];

// The sale window and what happens after you buy — every row is teamLab's own wording,
// read off the official FAQ, except the worked example, which is that rule applied.
const saleRows = [
  {
    item: "開賣時間",
    detail: "約在入場日兩個月前的 1 號左右",
    source: "teamlab.art FAQ",
  },
  {
    item: "換算範例",
    detail: "2027 年 1 月入場 → 約 2026 年 11 月 1 日開賣；2027 年 2 月 → 約 2026 年 12 月 1 日",
    source: "套用 FAQ 規則推算",
  },
  {
    item: "會賣完嗎？",
    detail: "會——teamLab 表示門票可能售完，建議日期一確定就購買",
    source: "teamlab.art FAQ",
  },
  {
    item: "當天票",
    detail: "沒賣完的話可在官方售票網站購買；現場也有賣，但價格不同",
    source: "teamlab.art FAQ",
  },
  {
    item: "取消",
    detail: "原則上購買後無法取消",
    source: "teamlab.art FAQ",
  },
  {
    item: "更改日期",
    detail: "僅限官方票：最多 3 次，須在預約入場時間 2 小時前（彈性入場券為最後入場 2 小時前）",
    source: "teamlab.art FAQ",
  },
  {
    item: "在 Klook 等平台購買",
    detail: "依該售票平台自己的規定——teamLab 請購買者自行確認",
    source: "teamlab.art FAQ",
  },
];

const hoursRows = [
  {
    item: "建議停留",
    detail: "約 1.5～2 小時——teamLab 表示平均參觀時間約一個半小時，也寫「參觀約需 2 小時」；沒有時間限制，但不能再入場",
    source: `teamlab.art FAQ，${CHECKED}`,
  },
  { item: "營業時間", detail: "公告為 08:30–21:00，依日期而異", source: `teamlab.art，${CHECKED}` },
  { item: "最後入場", detail: "閉館前一小時——21:00 閉館就得在 20:00 前進場", source: `teamlab.art，${CHECKED}` },
  {
    item: "提早與延長",
    detail: "2026 年 11 月 2、5、6、9、12、13 日與 12 月 26～30 日開到 22:00；2027 年 1 月 26 日 17:00 閉館",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "休館日",
    detail: "2026 年 11 月 24 日（二）、12 月 8 日（二）；2027 年 1 月 13 日（三）、1 月 19 日（二）",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "指定時段入場券",
    detail: "同時指定日期與入場時間；時段就是你的預約",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "彈性入場券",
    detail: "在指定日期有效、不指定入場時間，價格較高",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "改日期",
    detail: "直接向 teamLab 購買的票最多可改三次",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "現場購票",
    detail: "還有名額時在館內販售，成人 +¥200",
    source: `teamlab.art，${CHECKED}`,
  },
];

const vsPlanetsRows = [
  {
    factor: "地點",
    borderless: "港區．麻布台之丘——神谷町站步行 2 分鐘",
    planets: "豐洲——新豐洲站 1A 出口步行 3 分鐘",
  },
  { factor: "成人票", borderless: `${ADULT}，依日期與時段`, planets: `${priceLabel(PLANETS.adult, "zh-tw")}，依日期與時段` },
  { factor: "4～12 歲", borderless: CHILD, planets: priceLabel(PLANETS.child, "zh-tw") },
  {
    factor: "體驗方式",
    borderless: "穿著鞋，走進沒有地圖、約 70 件作品組成的迷宮",
    planets: "赤腳，走過水深到成人膝蓋的水中",
  },
  {
    factor: "穿著",
    borderless: "穿什麼都可以；teamLab 建議穿白色或明亮的素色衣服，拍照比較好看",
    planets: "能捲到膝蓋以上的褲子——水深及膝",
  },
  {
    factor: "入場",
    borderless: "日期＋入場時間，或不指定時間的彈性入場券",
    planets: "只有日期＋入場時間",
  },
  {
    factor: "現場購票",
    borderless: "還有名額時販售，成人 +¥200",
    planets: "現場完全不賣——只能事先上網買",
  },
  { factor: "建議停留", borderless: "約 1.5～2 小時（官方 FAQ）", planets: "約 1.5～2 小時" },
  {
    factor: "適合誰",
    borderless: "藝術、攝影、大人，以及東京市中心的下雨午後",
    planets: "帶小孩，以及想要第一次就印象最深刻的人",
  },
];

// The GetYourGuide column is deliberately thin: GetYourGuide blocks automated reads, so only
// the listing's existence could be confirmed (see the note under the table).
const buyingRows = [
  {
    factor: "票價",
    official: "基本票價，依日期與時段浮動",
    klook: "同一張票，以你自己的幣別標價",
    gyg: "依方案而定；請在頁面上確認",
    door: "成人 +¥200；其他票種的現場價格也不同",
  },
  {
    factor: "結帳語言",
    official: "有英文版網站",
    klook: "繁體中文介面，立即取得電子票",
    gyg: "英文頁面",
    door: "現場在美術館窗口",
  },
  {
    factor: "海外信用卡",
    official: "通常可以，但不保證",
    klook: "本來就為海外卡與行動支付設計",
    gyg: "未確認——請在結帳時確認",
    door: "現場可刷卡",
  },
  {
    factor: "改日期",
    official: "最多可改三次日期",
    klook: "視你選的 Klook 方案而定——付款前請先確認",
    gyg: "未確認——依方案而異，付款前請看清楚",
    door: "不適用",
  },
  {
    factor: "買不到的風險",
    official: "早訂就低",
    klook: "早訂就低",
    gyg: "第一個管道沒有你要的時段時，值得再查的第二個櫃台",
    door: "高——熱門時段在當天之前就賣完",
  },
];

const whoFor = [
  {
    title: "選官網的話…",
    desc: "你想要最低的基本票價和最大的日期彈性。teamLab 官網購買的票最多可以改三次日期，如果你的東京行程還在調整，這點很實用。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: "選 Klook 的話…",
    desc: "你希望用自己的幣別、看得懂的介面結帳，用非日本發行的信用卡付款，並把電子票和其他預訂放在同一個 App 裡。Klook 是 teamLab 的官方售票合作夥伴，票是同一張，只是換一個櫃台。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M14 6v12" strokeDasharray="2 2" />
        <path d="M6 10h4M6 14h4" />
      </svg>
    ),
  },
  {
    title: "別打算現場買，如果…",
    desc: "你的日期是週末、日本連假，或你想去傍晚的時段。現場票成人要多付 ¥200，而且只在還有名額時才賣——偏偏大多數人想去的時段常常沒有。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "先選日期，再看那天的價格",
    desc: "無界的成人票與身障票是浮動定價，你看到的金額取決於選的日期與入場時段。平日早上通常最便宜也最清閒。",
  },
  {
    title: "選入場時間，或選彈性入場券",
    desc: "標準的指定時段入場券有指定入場時間。teamLab 另外也賣彈性入場券，在指定日期有效但不指定入場時間，行程不好掌握時值得多付一點。",
  },
  {
    title: "日期一確定就買——大約兩個月前開賣",
    desc: "門票約在入場日兩個月前的 1 號左右開賣，teamLab 自己的建議是日期一確定就購買，因為門票可能售完。週末與傍晚的時段最該優先搶。",
  },
  {
    title: "用手機出示門票，預留 1.5～2 小時",
    desc: "官方門票從確認信裡的連結打開——有手機就不必列印。入場後沒有時間限制，但不能再入場；teamLab 表示參觀約需 1.5～2 小時。嬰兒車要寄放在行李寄放處，神谷町站與六本木一丁目站都有地下通道相連。",
  },
];

// Same three products as the English teamlabBorderlessTripPrep(), with the copy written
// for this edition and each URL moved onto Klook's zh-TW path.
const tripPrep: KlookTripPrepItem[] = [
  {
    label: "六本木站周邊飯店",
    ctaLabel: "在 Klook 查看六本木飯店 →",
    url: klookFor(roppongiHotels.url, "zh-tw"),
    why: "六本木一丁目站有地下通道連到美術館，住在這一帶，08:30 的第一個時段或 20:00 的最後入場都只是走一小段路，不必橫跨半個東京。",
  },
  {
    label: "東京地鐵通票（24／48／72 小時）",
    ctaLabel: "查看地鐵通票 →",
    url: klookFor(tokyoSubwayTicket.url, "zh-tw"),
    why: "兩個最近的車站——日比谷線神谷町站與南北線六本木一丁目站——都是東京地下鐵，24、48 或 72 小時券就能涵蓋往返與當天其他行程。",
  },
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM 方案 →",
    url: klookFor(klookEsim.url, "zh-tw"),
    why: "官方門票是從確認信連結打開、在入口出示的畫面，改日期也必須在預約時段 2 小時前上網辦理——兩件事都需要在街上就有網路，不能只靠飯店 Wi-Fi。",
  },
];

// Five questions, matching the English page's five (each a query that already lands on it).
// The older questions — door, date changes, the two passes, hours, location, official vs
// Klook, Planets — are answered in the body.
const faqItems: FaqItem[] = [
  {
    q: "teamLab Borderless 指定時段門票怎麼訂？",
    a: `在官方售票行事曆（teamlab.art/e/tokyo）或 Klook（teamLab 公布的另一個官方售票網站）選好日期，確認那天的成人票價，再為指定時段入場券選一個入場時間——或改買不指定入場時間的彈性入場券（¥12,000）。用信用卡付款（官網也接受 PayPay），門票會以確認信裡的連結寄給你，入場時用手機出示即可。價格與規定依官方網站 ${CHECKED} 的公告。`,
  },
  {
    q: "teamLab Borderless 門票什麼時候開賣？",
    a: `約在入場日兩個月前的 1 號左右——所以 2027 年 1 月的票約在 2026 年 11 月 1 日開賣。依 teamLab 官方 FAQ（查核日 ${CHECKED}），門票可能售完，建議日期一確定就購買；當天票只在還有剩的時候，於線上或現場販售。`,
  },
  {
    q: "teamLab Borderless 門票線上買多少錢？",
    a: `依官方售票網站（查核日 ${CHECKED}）：成人（18 歲以上）${ADULT}，13～17 歲 ¥2,800，4～12 歲 ${CHILD}，3 歲以下免費，身心障礙者 ¥1,700 起（一位陪同者同價）。成人票與身障票會依日期與入場時段變動，所以 ¥3,400 是底價。彈性入場券 ¥12,000，現場購票成人多 ¥200。`,
  },
  {
    q: "teamLab Borderless 要逛多久？",
    a: `約 1.5～2 小時。teamLab 官方 FAQ（查核日 ${CHECKED}）表示平均參觀時間約一個半小時，也寫參觀約需 2 小時；館內沒有時間限制，下一個時段開始時也不必離場，但不能再入場。`,
  },
  {
    q: "未滿 4 歲的孩子需要買 teamLab Borderless 門票嗎？",
    a: `不用——3 歲以下免費入場，也沒有最低年齡限制；4～12 歲為 ${CHILD}。國小以下的兒童必須由 18 歲以上的大人陪同，每 5 名兒童至少 1 名大人（免費的 3 歲以下幼兒也算在內），嬰兒車不能進入館內，須寄放在行李寄放處。依官方 FAQ，查核日 ${CHECKED}。`,
  },
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "teamLab 無界 門票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTeamLabBorderlessPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, "zh-tw");

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
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            麻布台之丘的 teamLab 無界，門票要多少錢、每個月的票什麼時候開賣、指定時段怎麼運作，
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
        <Disclosure />

        <p className={styles.bodyText}>
          <strong>teamLab Borderless 門票</strong>（無界）在官方網站上成人 <strong>¥3,400 起</strong>、13～17 歲
          ¥2,800、4～12 歲 ¥1,500，3 歲以下免費；成人票在熱門日期與時段會更貴。指定時段入場券（Entrance
          Pass）同時指定日期與<strong>入場時間</strong>，門票<strong>約在入場日兩個月前的 1 號左右開賣</strong>
          ——2027 年 1 月入場的票，約在 2026 年 11 月 1 日開賣。teamLab 表示參觀約需{" "}
          <strong>1.5～2 小時</strong>，入場後沒有時間限制。
        </p>
        <p className={styles.bodyText}>
          以上數字皆讀自 teamLab 官方網站與官方 FAQ，查核日 {CHECKED}。還在猶豫該去哪一間？請看{" "}
          <Link href="/zh-tw/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 與 Borderless 比較</Link>
          ；本頁專講 Borderless 本身怎麼訂。
        </p>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人票</p>
                <p className={styles.verdictStatValue}>¥3,400 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>入場方式</p>
                <p className={styles.verdictStatValue}>指定日期＋時段</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>建議停留</p>
                <p className={styles.verdictStatValue}>約 1.5～2 小時</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>開賣時間</p>
                <p className={styles.verdictStatValue}>約兩個月前的 1 號</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>成人票 ¥3,400 起，採浮動定價，最終金額由你選的日期與時段決定。
              門票指定日期與時間，原則上不能取消，也可能賣完；現場購票成人多 ¥200 且要看還有沒有名額。館方公告的營業時間約 08:30–21:00，
              最後入場是閉館前一小時。預留 1.5～2 小時，從神谷町站（日比谷線，步行 2 分鐘）或六本木一丁目站
              （南北線，步行 6 分鐘）過去，兩站都有地下通道。想要基本票價與最多三次免費改期就買官網；
              想要看得懂、用自己幣別、海外卡刷得過的結帳就走 Klook。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                預訂 teamLab 無界門票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              本頁的票價、營業時間與休館日讀自 teamLab 官方網站，查核日 {CHECKED}。無界採浮動定價、行事曆也會變動，
              請在結帳時確認你自己日期的兩項資訊。
            </p>
          </div>
        </div>

        <KlookTripPrep
          label="同一天要訂的"
          heading="teamLab Borderless 那天還要訂什麼？"
          headingLevel={3}
          intro="指定時段決定了你幾點要在哪裡。以下三項都能和門票用同一個 Klook 帳號預訂：麻布台之丘附近的住宿、兩個最近車站都能用的地鐵通票，以及出示電子票需要的網路。"
          items={tripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless 門票線上買多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            線上購買時，成人 <strong>¥3,400 起</strong>，13～17 歲 ¥2,800，4～12 歲兒童 ¥1,500，未滿 4 歲免費；彈性入場券 ¥12,000。
            會變動的只有成人票與身障票：無界依日期與入場時段為這兩種票定價，所以官方金額後面才會加上「起」，
            也因此你這趟旅行最便宜的票，取決於票價行事曆，而不是售票平台。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "票價（起）", "是否依日期調整票價？", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.varies}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後查核：{CHECKED_ISO}——
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">teamlab.art/e/tokyo</a>。
            現場購票成人多 ¥200。優惠票需要出示資格證明，請帶證件。
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.2rem", marginTop: "2rem" }}>
            未滿 4 歲的孩子需要買票嗎？
          </h3>
          <p className={styles.bodyText}>
            不用。3 歲以下免費入場，也沒有最低年齡限制；不過國小以下的兒童都必須由 18 歲以上的大人陪同——每 5 名兒童至少
            1 名大人，免費的 3 歲以下幼兒也算在內。嬰兒車不能進入館內，須寄放在行李寄放處（官方 FAQ，{CHECKED}）。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>成人票價會浮動到多少，官方沒有公布。</strong>teamLab 給的是起價和一份票價行事曆，不是價目表，
            所以沒有任何誠實的攻略能告訴你週六傍晚的無界要多少錢——替你報出一個價格區間的頁面，都是自己編的。
            把 ¥3,400 當成底價，把你行程能容納的每一天都在官方行事曆上打開來看，比較過金額再付款。
            這裡真正有用的是把參觀日挪一天；換一家較便宜的售票平台也無法降低票價，因為價格是日期和時段決定的。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>訂票前</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless 要逛多久？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            約 1.5～2 小時：teamLab 表示平均參觀時間約一個半小時，館內沒有時間限制，下一個時段開始時也不必離場——但不能再入場。
            比起時間，更常讓人踩雷的是行事曆：美術館有不定期的休館日，部分日期提早或延後閉館，選時段前請先看下表。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "官方網站的說法", "資料來源與日期"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            最後查核：{CHECKED_ISO}——
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">teamlab.art/e/tokyo</a>
            （營業時間、休館日、票種）與
            <a href={FAQ_URL} target="_blank" rel="noopener noreferrer">teamlab.art/faq/tokyo</a>
            （建議停留）。營業時間與休館日每個月都在變，請先用你自己的日期打開官方行事曆確認，再去訂時段。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>你買到的是什麼</span>
          <h2 className={styles.sectionTitle}>teamLab 無界究竟是什麼</h2>
          <p className={styles.bodyText}>
            無界是一間沒有地圖的美術館。約 70 件作品分布在互相連通的房間群裡，而作品本身會移動——
            它們會從一個空間走到另一個空間、會對房間裡的人有反應、整天都在變化。沒有建議路線、沒有編號站點，
            所以買同一張票的兩個人，體驗可能真的不一樣。
          </p>
          <p className={styles.bodyText}>
            正因為這個設計，這張票值得先規劃。趕一小時只能看到幾個有名的展間；1.5～2 小時才夠你亂走、折返，
            並找到那些要等才會出現的作品。這也讓無界成為東京兩間 teamLab 當中比較偏成人、比較適合攝影的那一間——
            想找赤腳走進水裡的豐洲那一間，以及 Planets 那一方的考量，請看我們的{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-planets-tickets">teamLab Planets 門票攻略</Link>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>值不值得</span>
          <h2 className={styles.sectionTitle}>teamLab 無界值得去嗎？</h2>
          <p className={styles.bodyText}>
            喜歡藝術、攝影，或只是想待在一個哪裡都看不到的地方——值得。但它是一個每人 ¥3,400 起、約 1.5～2 小時的景點，
            價格像一個下午，花掉的時間卻像一頓長午餐。與其直接給結論，不如把算式攤在你面前：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>每小時的花費偏高。</strong>¥3,400 換 1.5～2 小時，是東京鐵塔主展望台 ¥1,500 的兩倍多，也高於澀谷 SKY 白天線上票的 {PRICES.shibuyaSky.adult.split(" / ")[0]}，而那兩處都可以待很久——數字可以在我們的<Link href="/guides/attractions/japan-attraction-ticket-prices">日本景點門票價格表（英文）</Link>比較。你付的是別處看不到的東西，不是時間長度。</li>
            <li><strong>沒有地圖的設計是價值，也是風險。</strong>約 70 件作品、沒有路線、沒有編號站點，代表趕一小時只能看到幾個有名的展間。如果你只有一小時，這張票就不划算，而不是「縮短版的好體驗」。</li>
            <li><strong>它是兩間當中最不費體力的。</strong>穿著鞋、不用涉水，也不必帶替換衣物。如果 Planets 的形式對你來說像折磨而不是體驗，這裡就是同一個團隊、但沒有那些的版本。</li>
            <li><strong>不怕下雨，又在市中心。</strong>麻布台之丘離神谷町站走地下 2 分鐘，下雨的午後在交通上不會有任何損失——東京大多數雨天行程可做不到。</li>
            <li><strong>這裡失誤還有救。</strong>和 Planets 不同，無界在還有名額時會現場售票，所以沒訂到的代價是多付 ¥200、時段差一點，而不是賠掉一個下午。</li>
          </ul>
          <p className={styles.bodyText}>
            如果你的東京行程已經很緊、只能給它一小時，或者帶著小小孩、只排得進一間 teamLab——Planets 帶孩子比較輕鬆——
            那就跳過。這是讓這張票令人失望的三個原因，而沒有一個和作品本身有關。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>開賣與售完</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless 門票什麼時候開賣？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            約在入場日兩個月前的 1 號左右——所以 2027 年 1 月的場次約在 2026 年 11 月 1 日開賣。teamLab 表示門票可能售完，
            建議日期一確定就購買；官方門票也不能取消，只能改到其他日期。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab 的說法", "資料來源"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {saleRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後查核：{CHECKED_ISO}——
            <a href={FAQ_URL} target="_blank" rel="noopener noreferrer">teamlab.art/faq/tokyo</a>。
            teamLab 沒有公布各時段會提前幾天售完，所以本頁也不提供這個數字。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>不只規劃參觀日，也要規劃購買日：</strong>如果你旅行的月份在你還沒決定行程時就會開賣，開賣那天就是該記進行事曆的日子。</li>
            <li><strong>當天票只是備案：</strong>只在還有剩的時候於線上或現場販售，而且現場成人票貴 ¥200。</li>
            <li><strong>日期變了就改期，不要重訂：</strong>官方門票最多可以改三次日期，須在預約入場時間 2 小時前辦理；新日期比較貴的話要付新價格，原本的金額會退還。</li>
            <li><strong>售票平台的條件各自不同：</strong>Klook 與 GetYourGuide 的變更與取消期限依方案而定，付款前請在訂購頁上看清楚，不要以為 teamLab 的三次改期也適用。</li>
          </ul>
          <p className={styles.bodyText}>
            所以實際的順序是：先選日期、看那天的價格，再選售票平台。會改變你付多少錢的，只有前兩步。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看 teamLab 無界的日期與時段 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook 是 teamLab 的官方售票合作夥伴；GetYourGuide 則是你想要的時段沒了時，第二個可以查的地方。
            本頁不替兩者標價——兩邊都依日期定價，所以請打開行事曆，不要相信任何標題上的金額，包括本頁的。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>在哪買</span>
          <h2 className={styles.sectionTitle}>官網 vs Klook vs GetYourGuide vs 現場</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Klook 是 teamLab 的官方售票合作夥伴，所以不論走哪個櫃台，入場資格都一樣。差別在結帳流程、彈性，
            以及——如果你拖到當天——價格。GetYourGuide 也賣無界的票，下表中它那一欄刻意寫得很少：
            已確認與未確認的內容，請看表格下方的說明。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "官方網站", "Klook", "GetYourGuide", "當天現場"].map((h) => (
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
                      <td style={{ fontSize: "0.88rem" }}>{row.gyg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            現場加價與改期次數依 teamLab 官方網站 {CHECKED} 的公告。售票平台的取消與變更條件依方案而異，
            付款前請在訂購頁上看清楚。GetYourGuide 一欄刻意寫得很短：它的無界頁面在 {GYG_CHECKED} 確認仍在販售，
            但它的價格、刷卡情況與變更條件未經本頁確認，請在商品頁查看。那幾格就照實寫，不用猜的。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一種適合你</span>
          <h2 className={styles.sectionTitle}>該怎麼買？</h2>
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

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless 指定時段門票怎麼訂？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            先選日期、看那天的價格，為指定時段入場券選一個入場時間（或改買不指定時間的彈性入場券，¥12,000），然後購買——
            在官網買，或在 Klook 買（teamLab 公布的另一個官方售票網站）。一共四步，而只有第一步會改變你付多少錢。
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            決定好要訂了嗎？{" "}
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看無界的空位與價格 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>直接購買</span>
          <h2 className={styles.sectionTitle}>teamLab 無界的官方購票網站在哪裡？</h2>
          <p className={styles.bodyText}>
            美術館自己的頁面是 <strong>teamlab.art/e/tokyo</strong>（英文版，日文版為 teamlab.art/jp/e/tokyo），
            購票行事曆與結帳都從那裡進入。如果你存的是舊連結，<strong>borderless.teamlab.art</strong>{" "}
            已經不是獨立的售票網站：它的英文與日文網址現在都會轉址到上面的 teamlab.art 頁面，這點已於 {ADDRESS_CHECKED} 確認。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>為什麼「官方」在這裡很重要：</strong>基本票價在 teamLab 自己的行事曆上，三次免費改期也只有直接購買的票才有。售票平台賣的是同一個入場資格，但用自己的條件。</li>
            <li><strong>還有誰是正規的：</strong>Klook 是 teamLab 的官方售票合作夥伴，所以 Klook 的票就是在另一個櫃台買到的同一個入場資格——不是旁門左道，也不是在門票價上加價。</li>
            <li><strong>直接買不會讓你得到的：</strong>折扣。成人票價由日期與時段決定，而每個官方管道背後都是同一份行事曆。</li>
            <li><strong>直接買可能讓你付出的：</strong>信用卡被拒。日文結帳頁面是遊客最後改用售票平台的常見原因，而改用國際化的結帳流程是合理的解法，不是錯誤。</li>
          </ul>
          <p className={styles.bodyText}>
            所以：你的卡刷得過、又想要日期彈性，就直接在官網買；想用自己的語言和幣別結帳、讓電子票和其他預訂放在一起，就透過 Klook。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>並排比較</span>
          <h2 className={styles.sectionTitle}>teamLab 無界 vs Planets：該訂哪一個？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>想「看」藝術就訂無界；想「走進」藝術，或要帶小孩，就訂 Planets。</strong>東京有兩間 teamLab 美術館，
            遊客經常訂錯。它們是不同的場館、不同的門票，位在城市的不同區域，下面這些數字就是決定的關鍵。
            Planets 那一方的完整資訊——赤腳規定、置物櫃、兒童相關規定——請看我們的{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-planets-tickets">teamLab Planets 門票攻略</Link>。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab 無界", "teamLab Planets"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsPlanetsRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            無界的數字讀自 teamLab 官方網站，查核日 {CHECKED}；Planets 的數字讀自其官方售票網站，查核日 {PLANETS_CHECKED}。
            兩間美術館的成人票都依日期與時段定價，行事曆也都會變，請以你自己的日期為準。無界的建議停留時間出自官方 FAQ；Planets 的則是本站的規劃參考，不是官方數字。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            如果兩間都有時間去，請分在不同天：一個下午看四小時數位藝術，是最快讓你什麼都看不進去的方法，
            而且兩個場館在城市的兩端，相距 30 分鐘。
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
          <p className={styles.bodyText}>
            用{" "}
            <Link href="/guides/transport/ic-cards-japan">Suica 或 Pasmo 等 IC 卡（英文）</Link>{" "}
            刷卡進出，兩站都不需要特別規劃——
            <Link href="/guides/transport/tokyo-transportation">東京交通攻略（英文）</Link>有更詳細的路線說明。
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab 福岡門票 2026：票價、營業時間與預約（英文）" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab 京都門票：票價、營業時間與預約（英文）" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab 植物園 大阪門票：票價與營業時間（英文）" },
            { href: "/guides/attractions/tokyo-joypolis-tickets", title: "東京 Joypolis 門票（2026）：通行證票價、營業時間與身高限制（英文）" },
            { href: "/zh-tw/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 門票 2026：票價、時間與預約方式" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳參觀時段與購票方式" },
            { href: "/guides/transport/tokyo-transportation", title: "東京交通攻略（2026）：電車、地鐵與 IC 卡（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先把無界的時段訂下來</h2>
            <p className={styles.ctaBannerDesc}>
              指定時段入場的意思是：最熱門的入場時段通常最早售罄。Klook 是 teamLab 的官方售票合作夥伴，
              可以用繁體中文介面、自己的幣別結帳，電子票直接存在手機裡。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 teamLab 無界門票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
