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
import { zhTeamlabBorderless } from "../../../../lib/klook-links-zh-tw";
import { gygTeamlabBorderless } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

// Mirrors the English guide (pages/guides/attractions/teamlab-borderless-tickets.tsx) as of
// 2026-11-01, section by section; every figure is the English page's or comes from
// lib/attraction-prices.ts, and nothing was added for this edition.

const ROUTE = "/zh-tw/guides/attractions/teamlab-borderless-tickets";
const TITLE = "teamLab 無界 門票（2026）：票價、時段預約與購票管道";
const DESC =
  "teamLab 無界（麻布台之丘）門票 2026：官方票價成人 ¥3,400 起、浮動定價怎麼算、指定入場時段與休館日，官網和 Klook 該選哪個。";

const BORDERLESS_URL = zhTeamlabBorderless.url;
const GYG_SLUG = "zh-tw-teamlab-borderless-tickets";

const P = PRICES.teamlabBorderless;
const CHECKED = dateLabel(P.checked, "zh-tw");
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
  { ticket: "13～17 歲", price: "¥2,800", varies: "不會——固定價", note: "看起來比較成熟的話請帶證件" },
  { ticket: "4～12 歲", price: CHILD, varies: "不會——固定價", note: "不論選哪一天都一樣" },
  { ticket: "3 歲以下", price: "免費", varies: "不會——免費", note: "不需購票" },
  {
    ticket: "身心障礙人士",
    price: "¥1,700 起",
    varies: "會——與成人票同一套行事曆",
    note: "一位陪同者同享優惠票價；請攜帶資格證明",
  },
];

const hoursRows = [
  { item: "營業時間", detail: "公告為 08:30–21:00，依日期而異", source: `teamlab.art，${CHECKED}` },
  { item: "最後入場", detail: "閉館前一小時——21:00 閉館就得在 20:00 前進場", source: `teamlab.art，${CHECKED}` },
  {
    item: "提早與延長",
    detail: "部分日期提早閉館（2026 年 11 月 17 日為 17:00），部分日期延長（特定日期到 22:00）",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "休館日",
    detail: "不定期的週二——包含 2026 年 10 月 20 日、11 月 24 日與 12 月 8 日",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "Entrance Pass",
    detail: "同時指定日期與入場時間；時段就是你的預約",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "Flexible Pass",
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
    detail: "還有名額時在館內販售，成人 +¥200，兒童或身障票 +¥100",
    source: `teamlab.art，${CHECKED}`,
  },
  {
    item: "建議停留",
    detail: "約兩小時——拍照的話更久，而且沒有固定路線可以讓你趕",
    source: "本站的規劃參考值——teamLab 未公布",
  },
];

const vsPlanetsRows = [
  {
    factor: "地點",
    borderless: "港區．麻布台之丘——神谷町站步行 2 分鐘",
    planets: "豐洲——新豐洲站步行 1 分鐘",
  },
  { factor: "成人票", borderless: `${ADULT}，依日期與時段`, planets: `${priceLabel(PLANETS.adult, "zh-tw")}，依日期與時段` },
  { factor: "4～12 歲", borderless: CHILD, planets: priceLabel(PLANETS.child, "zh-tw") },
  {
    factor: "體驗方式",
    borderless: "穿著鞋，走進沒有地圖、50 多件作品組成的迷宮",
    planets: "赤腳，走過水深到成人膝蓋的水中",
  },
  {
    factor: "入場",
    borderless: "日期＋入場時間，或不指定時間的 Flexible Pass",
    planets: "只有日期＋入場時間",
  },
  {
    factor: "現場購票",
    borderless: "還有名額時販售，成人 +¥200",
    planets: "現場完全不賣——只能事先上網買",
  },
  { factor: "建議停留", borderless: "約 2 小時", planets: "約 1.5～2 小時" },
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
    door: "成人 +¥200，兒童／身障票 +¥100",
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
    desc: "你的日期是週末、日本連假，或你想去傍晚的時段。現場票成人要多付 ¥200（兒童與身障票多 ¥100），而且只在還有名額時才賣——偏偏大多數人想去的時段常常沒有。",
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
    title: "選入場時間，或選 Flexible Pass",
    desc: "標準的 Entrance Pass 有指定入場時間。teamLab 另外也賣 Flexible Pass，在指定日期有效但不指定入場時間，行程不好掌握時值得多付一點。",
  },
  {
    title: "週末與傍晚場請提前 2～3 週訂",
    desc: "無界的年參觀人次遠超過百萬，熱門時段最先消失。早訂的差別在於「你挑時段」還是「只能拿剩下的」。",
  },
  {
    title: "預留約兩小時，行李帶少一點",
    desc: "館內沒有固定路線，作品會在房間之間移動，所以大多數人會想在裡面待大約兩小時。稍微提前抵達，並盡量輕裝——神谷町站與六本木一丁目站都有地下通道相連，不必走到地面上。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年 teamLab 無界門票多少錢？",
    a: `依 teamLab 官方網站（查核日 ${CHECKED}），Entrance Pass 成人（18 歲以上）${ADULT}，13～17 歲 ¥2,800，4～12 歲 ${CHILD}，3 歲以下免費。身心障礙人士 ¥1,700 起，一位陪同者同享優惠票價。成人票與身障票採浮動定價，實際金額取決於你選的日期與時段，付款前請確認自己那天的價格。現場購票成人多 ¥200，兒童與身障票多 ¥100。`,
  },
  {
    q: "teamLab 無界可以現場買票嗎？",
    a: `可以，但只在還有名額時，而且要加價：我們在 ${CHECKED} 查看時，官方網站公告現場票成人多 ¥200、兒童與身障票多 ¥100。所以現場購票是備案而不是計畫——週末、連假與傍晚場，大多數人想要的時段在當天之前就沒了，行事曆一旦額滿，到窗口也救不回來。這也是它和豐洲 teamLab Planets 最明顯的差別：Planets 的官方售票頁寫明現場完全不售票。`,
  },
  {
    q: "teamLab 無界的門票可以改日期嗎？",
    a: `直接向 teamLab 購買的票最多可以改三次日期（依官方網站 ${CHECKED} 的公告）——如果你的東京行程還在變動，這就是直接在官網買、而不是透過售票平台買的主要實際理由。售票平台會依方案自訂變更與取消條件，而且各不相同，付款前請在訂購頁上看清楚，不要以為官方的改期次數也適用。`,
  },
  {
    q: "Entrance Pass 和 Flexible Pass 差在哪裡？",
    a: `Entrance Pass 指定日期與入場時間——結帳時選一個時段，那個時段就是你的預約。Flexible Pass 在指定日期有效、不指定入場時間，幾點到都可以，而這份自由要多付一點。兩者都列在官方網站上（查核日 ${CHECKED}）。如果你在麻布台之丘一帶的行程不好掌握，Flexible Pass 能把指定時段拿走的彈性買回來；如果行程已經確定，Entrance Pass 比較便宜。`,
  },
  {
    q: "teamLab 無界是指定時段入場嗎？可以直接去嗎？",
    a: "標準的 Entrance Pass 是指定日期與時間的：訂票時就要選入場時段。teamLab 另外也賣 Flexible Pass，在指定日期有效但不指定入場時間。現場也有售票，但成人要多付 ¥200，而且只在還有名額時才賣——週末、連假與傍晚場經常沒有。把現場購票當成備案，不要當成計畫。",
  },
  {
    q: "teamLab 無界的營業時間是？",
    a: `營業時間依日期而不同。我們在 ${CHECKED} 查看官方網站時，館方公告的時間是 08:30–21:00，部分日期提早閉館（2026 年 11 月 17 日為 17:00），部分日期延長（特定日期到 22:00）。最後入場是閉館前一小時。另外也有不定期的週二休館——2026 年 10 月 20 日、11 月 24 日與 12 月 8 日都在內。訂時段之前，請務必打開官方行事曆查你自己的日期。`,
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
    a: "它們是東京不同區域的兩間不同美術館，不是同一品牌的兩間分館。麻布台之丘的「無界」是 50 多件作品組成的無地圖迷宮，值得花時間、帶著好奇心慢慢逛。豐洲的「Planets」是赤腳的那一間——你會走過深及膝蓋的水，帶小孩比較容易。如果只能去一間：想看藝術、想拍照選無界；想帶孩子體驗身體感官的就選 Planets。",
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
          <h1 className={styles.heroTitle}>
            teamLab 無界 門票（2026）：<br />票價、預約方式與入場時段
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
        <Disclosure />

        <p className={styles.bodyText}>
          <strong>麻布台之丘</strong>的 <strong>teamLab 無界</strong>，成人票在 teamLab 官方網站上{" "}
          <strong>¥3,400 起</strong>，而且成人票採浮動定價，所以 ¥3,400 是底價，不是你那天的價格。入場是
          <strong>指定日期與時間</strong>的——標準的 Entrance Pass 固定一個入場時段，Flexible Pass 只固定日期——
          而這間沒有地圖、沒有固定路線可趕的美術館，請<strong>預留大約兩小時</strong>。本頁的票價、營業時間與休館日
          讀自 teamLab 官方網站（teamlab.art），查核日 {CHECKED}；成人票價會隨行事曆變動，付款前請確認你那天的金額。
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
                <p className={styles.verdictStatValue}>約 2 小時</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>地點</p>
                <p className={styles.verdictStatValue}>港區．麻布台之丘</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>成人票 ¥3,400 起，採浮動定價，最終金額由你選的日期與時段決定。
              門票指定日期與時間，現場購票成人多 ¥200 且要看還有沒有名額；館方公告的營業時間約 08:30–21:00，
              最後入場是閉館前一小時。預留大約兩小時，從神谷町站（日比谷線，步行 2 分鐘）或六本木一丁目站
              （南北線，步行 6 分鐘）過去，兩站都有地下通道。想要基本票價與最多三次免費改期就買官網；
              想要看得懂、用自己幣別、海外卡刷得過的結帳就走 Klook。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 teamLab 無界門票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              本頁的票價、營業時間與休館日讀自 teamLab 官方網站，查核日 {CHECKED}。無界採浮動定價、行事曆也會變動，
              請在結帳時確認你自己日期的兩項資訊。
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>2026 年 teamLab 無界門票多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人 <strong>¥3,400 起</strong>，13～17 歲 ¥2,800，4～12 歲兒童 ¥1,500，未滿 4 歲免費。
            會變動的只有成人票與身障票：無界依日期與入場時段為這兩種票定價，所以官方金額後面才會加上「起」，
            也因此你這趟旅行最便宜的票，取決於行事曆，而不是賣家。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "票價（起）", "會隨日期變動嗎？", "備註"].map((h) => (
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
            讀自 teamLab 官方網站，查核日 {CHECKED}。現場購票成人多 ¥200，兒童與身障票多 ¥100。
            優惠票需要出示資格證明，請帶證件。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>成人票價會浮動到多少，官方沒有公布。</strong>teamLab 給的是起價和一份行事曆，不是價目表，
            所以沒有任何誠實的攻略能告訴你週六傍晚的無界要多少錢——替你報出一個價格區間的頁面，都是自己編的。
            把 ¥3,400 當成底價，把你行程能容納的每一天都在官方行事曆上打開來看，比較過金額再付款。
            這裡真正有用的是把參觀日挪一天；換一個更便宜的賣家沒有用，因為價格是日期和時段決定的。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>訂票前</span>
          <h2 className={styles.sectionTitle}>營業時間、入場時段、休館日與建議停留時間</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            無界開得很長，但行事曆常變——這件事比票價更常讓人踩雷：美術館會在不定期的週二休館，部分日期 17:00 就關門。
            館內請預留大約兩小時，後面別排太緊的行程。
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
            因為營業時間與休館日每個月都在變，請先用你自己的旅行日期打開官方行事曆確認，再去訂時段。
            平日早上最清閒、通常也最便宜；週末與傍晚場最先消失。上表唯一不是 teamLab 自己說法的是「建議停留」，
            表中也標明了：館方沒有公布參觀要多久，因為路線由你自己決定。
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
            想找赤腳走進水裡的豐洲那一間，以及 Planets 那一方的考量，請看我們的{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 門票攻略</Link>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>值不值得</span>
          <h2 className={styles.sectionTitle}>teamLab 無界值得去嗎？</h2>
          <p className={styles.bodyText}>
            喜歡藝術、攝影，或只是想待在一個哪裡都看不到的地方——值得。但它是一個每人 ¥3,400 起、大約兩小時的景點，
            價格像一個下午，花掉的時間卻像一頓長午餐。與其直接給結論，不如把算式攤在你面前：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>每小時的花費偏高。</strong>¥3,400 換大約兩小時，是東京鐵塔主展望台 ¥1,500 的兩倍多，也高於澀谷SKY 白天線上票的 {PRICES.shibuyaSky.adult.split(" / ")[0]}，而那兩處都可以待很久——數字可以在我們的<Link href="/guides/attractions/japan-attraction-ticket-prices">日本景點門票價格表（英文）</Link>比較。你付的是別處看不到的東西，不是時間長度。</li>
            <li><strong>沒有地圖的設計是價值，也是風險。</strong>50 多件作品、沒有路線、沒有編號站點，代表趕一小時只能看到幾個有名的展間。如果你只有一小時，這張票就不划算，而不是「縮短版的好體驗」。</li>
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
          <span className={styles.sectionLabel}>會不會賣完</span>
          <h2 className={styles.sectionTitle}>teamLab 無界的門票會賣完嗎？</h2>
          <p className={styles.bodyText}>
            個別時段會，而且熱門的最先沒：無界的年參觀人次遠超過百萬，週末與傍晚的入場最先消失。
            不會發生的是「完全買不到」——還有名額時館內仍會售票，這讓無界比東京大多數指定時段的景點寬容，只是要多付錢。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>本站建議的訂票時間：</strong>週末、連假或傍晚場提前兩到三週；平日早上通常提前幾天就夠。這是我們依行事曆的變化給的規劃建議，不是官方數字——teamLab 沒有公布售罄資料。</li>
            <li><strong>當天與現場購票：</strong>還有名額時販售，成人多 ¥200，兒童或身障票多 ¥100。官方資訊，查核日 {CHECKED}。請當成備案而不是計畫：在大多數人想去的日子，大多數人想要的時段早就沒了。</li>
            <li><strong>日期變了就改期，不要重訂：</strong>直接向 teamLab 購買的票最多可以改三次日期。官方資訊，查核日 {CHECKED}。</li>
            <li><strong>售票平台的條件各自不同：</strong>Klook 與 GetYourGuide 的變更與取消期限依方案而定、彼此也不一樣，付款前請在訂購頁上看清楚，不要以為 teamLab 的三次改期也適用。</li>
            <li><strong>最便宜的時段要看行事曆：</strong>平日早上既最清閒、通常也最便宜，但 teamLab 沒有公布各時段的價目表，所以你那天的金額只存在於行事曆本身。</li>
          </ul>
          <p className={styles.bodyText}>
            所以實際的順序是：先選日期、看那天的價格，再選賣家。會改變你付多少錢的，只有前兩步。
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
            我們能確認與無法確認的內容，請看表格下方的說明。
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
            但 GetYourGuide 會擋自動讀取，所以我們無法確認它的價格、刷卡情況與變更條件，那幾格就照實寫，不用猜的。
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
          <h2 className={styles.sectionTitle}>teamLab 無界怎麼訂？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            先選日期、看那天的價格，在指定時段的 Entrance Pass 與 Flexible Pass 之間做選擇，然後購買——在官網買，
            或想用自己的幣別結帳就透過 Klook。一共四步，而只有第一步會改變你付多少錢。
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
            已經不是獨立的售票網站：它的英文與日文網址現在都會轉址到上面的 teamlab.art 頁面，這點我們在 {ADDRESS_CHECKED} 確認過。
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
            <Link href="/zh-tw/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 門票攻略</Link>。
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
            兩間美術館的成人票都依日期與時段定價，行事曆也都會變，請以你自己的日期為準。兩邊的建議停留時間是本站的規劃參考，不是官方數字。
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

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab 福岡門票 2026：票價、營業時間與預約（英文）" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab 京都門票：票價、營業時間與預約（英文）" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab 植物園 大阪門票：票價與營業時間（英文）" },
            { href: "/guides/attractions/tokyo-joypolis-tickets", title: "東京 Joypolis 門票（2026）：通行證票價、營業時間與身高限制（英文）" },
            { href: "/zh-tw/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 門票（2026）：票價、預約方式與無界比較" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/guides/transport/tokyo-transportation", title: "東京交通攻略（2026）：電車、地鐵與 IC 卡（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先把無界的時段訂下來</h2>
            <p className={styles.ctaBannerDesc}>
              指定時段入場的意思是：你最想去的那個時段，就是最先賣完的那個。Klook 是 teamLab 的官方售票合作夥伴，
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
