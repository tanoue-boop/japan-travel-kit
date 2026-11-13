// Traditional Chinese edition of /guides/attractions/teamlab-planets-tickets. Mirrors the English
// page block by block as of 2026-11-06 (same sections, tables, FAQ, Klook / GetYourGuide CTAs and
// tour picks in the same places); every figure comes from the English page or lib/attraction-prices.ts,
// none is added here.
import Head from "next/head";
import Link from "next/link";
import { PlanetsAnswer, PlanetsSameDay } from "../../../../components/PlanetsBooking";
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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  fujiDayTour,
  tokyoBaySunsetBoatCruise,
  tokyoJoypolisPassport,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  tsukijiCultureFoodTour,
} from "../../../../lib/klook-links";
import { zhTeamlabPlanets } from "../../../../lib/klook-links-zh-tw";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { gygTeamlabPlanets } from "../../../../lib/gyg-links";
import { PLANETS_FACTS, PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, attractionEventJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

const LOCALE = "zh-tw" as const;
const GYG_SLUG = "zh-tw-teamlab-planets-tickets";

// teamLab Planets TOKYO（豐洲）門票 — the same Klook product as the English page, on zh-TW.
const PLANETS_URL = zhTeamlabPlanets.url;

const P = PRICES.teamlabPlanets;
// 票價、營業時間、休館日與交通讀自 teamlab.art，訂票規則讀自官方售票網站，查核日相同。
// 官方沒有公布人潮尖峰與參觀時間，這兩項寫「官方未公布」，建議預留時間標明是本站的估算。
const CHECKED = dateLabel(P.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const CHILD = priceLabel(P.child, LOCALE);

const ROUTE = "/zh-tw/guides/attractions/teamlab-planets-tickets";
const TITLE = "teamLab Planets 門票 2026：豐洲官網票價與入場時段";
const DESC = `teamLab Planets 門票官網價：成人 ${ADULT}，需指定日期與入場時段，現場不售票；水深可達膝蓋。可在 Klook 預約時段。`;
// 2026-11-13（task-jtk-20261113-C01）：以 teamLab 的鏡像頁 art.team-lab.cn/en/e/planets 重新查核，
// 票價、營業時間、休館日與「水深可達成人膝蓋」皆未變動。詳見英文版。
const RECHECKED_ISO = "2026-11-13";
const OFFICIAL_URL = "https://www.teamlab.art/e/planets/";

const priceRows = [
  {
    ticket: "成人（18 歲以上）",
    price: ADULT,
    varies: "會——依日期與入場時間",
    note: "¥3,800 是最低價，不是定價：官方售票網站對每個日期與時段分別定價",
  },
  { ticket: "國中、高中生", price: "¥2,800", varies: "不會——固定價", note: "請攜帶學生證" },
  { ticket: "兒童（4～12 歲）", price: CHILD, varies: "不會——固定價", note: "未滿 4 歲不需購票" },
  {
    ticket: "3 歲以下",
    price: priceLabel("Free", LOCALE),
    varies: "不會——免費",
    note: "記得帶換洗衣物——經過涉水區每個人都會弄濕",
  },
  {
    ticket: "身心障礙人士",
    price: "¥1,900 起",
    varies: "會——與成人票依同一份預約日曆定價",
    note: "請攜帶身心障礙證明",
  },
  {
    ticket: "Premium Pass（4 歲以上）",
    price: "¥12,000",
    varies: "不會——固定價",
    note: "任何時間入場、不必排入口隊伍；館內的排隊不能跳過",
  },
];

const hoursRows = [
  { item: "營業時間", detail: "08:00–22:00；12 月 31 日（週四）至 1 月 2 日（週六）為 08:00–20:00", source: `teamlab.art，${CHECKED}` },
  { item: "最後入場", detail: "閉館前一小時", source: `teamlab.art，${CHECKED}` },
  { item: "休館日", detail: "2026 年 12 月 3 日（週四）、2027 年 1 月 14 日（週四）", source: `teamlab.art，${CHECKED}` },
  { item: "展期", detail: "2018 年 7 月 7 日至 2027 年底", source: `teamlab.art，${CHECKED}` },
  {
    item: "入場時段",
    detail: "票面時間就是入場時間；自票面指定時間起，有 30 分鐘的入場準備時間",
    source: `官方售票網站，${CHECKED}`,
  },
  {
    item: "入場等候",
    detail: "在入口可能要等 30 到 60 分鐘",
    source: `官方售票網站，${CHECKED}`,
  },
  { item: "人潮尖峰時段", detail: "官方未公布", source: `已查 teamlab.art 與官方售票網站，${CHECKED}` },
  {
    item: "趕不上時段",
    detail: "當天營業時間內仍可入場，但不得超過最後入場時間",
    source: `官方售票網站，${CHECKED}`,
  },
  {
    item: "建議預留時間",
    detail: "官方未公布。本站建議預留 1.5～2 小時，含置物櫃與擦乾的時間",
    source: "本站的規劃時間",
  },
  {
    item: "置物櫃",
    detail: "免費，寬 23 × 深 34 × 高 37 公分；更大的物品沒有寄物處",
    source: `官方售票網站，${CHECKED}`,
  },
];

const ticketChoice = [
  {
    title: "Entrance Pass——成人 ¥3,800 起",
    desc: `一般門票，也是幾乎所有人該買的那一種。它固定一個日期與一個入場時間，官方售票網站對每個組合分別定價，所以選哪一天比向哪個通路購買更重要。查核日 ${CHECKED}。`,
  },
  {
    title: "Premium Pass——¥12,000，4 歲以上",
    desc: `官方售票網站說它買到的只有一件事：任何時間入場、不必排入口隊伍——改到 Information Centre 報到。官方明確寫著它不能跳過展區內的排隊。只有當入口 30～60 分鐘的等候會打亂你一整天時才值得，不是一般的升級。查核日 ${CHECKED}。`,
  },
  {
    title: "可以改期，不能退款",
    desc: `一旦購買就不能退款。你能做的是改期：依官方說明頁，Entrance Pass 可在入場時間 2 小時前更改，Premium Pass 可改到當天 08:30，兩者都最多改三次；用優惠券購買的票完全不能改。查核日 ${CHECKED}。`,
  },
];

const steps = [
  {
    title: "先選日期，再從預約日曆查看價格",
    desc: `成人票 ¥3,800 起，實際金額取決於你選的日期與入場時間——官方說明頁也確認不同日期的價格不同。先把你可以去的日期一個個點過，再決定哪一天。查核日 ${CHECKED}。`,
  },
  {
    title: "選入場時間，因為那就是你的預約",
    desc: "票面時間就是你的入場時間，自票面指定時間起，有 30 分鐘的入場準備時間。美術館現場沒有售票櫃台可以補買，所以你選的時段就是你的參觀時段——當天也一樣，那時預約日曆可能早就滿了。",
  },
  {
    title: "決定 Entrance Pass 還是 Premium Pass",
    desc: "四種票價加上 ¥12,000 的 Premium Pass，只有一種跟排隊有關。請先看上面的票種表：Premium Pass 買到的只是免排入口隊伍，別無其他，所以多數人該買的是 Entrance Pass，再選早一點的時段。",
  },
  {
    title: "向官方售票網站或它列出的通路購買",
    desc: `官方說明頁寫明現場的櫃台與售票機都不賣票，並列出有販售的通路：官方 Ticket Store、Lawson Ticket、Seven Ticket 與 Klook。Klook 的結帳頁面有中文、可用自己的幣別付款，這是多數旅客選它的實際原因。不論哪一種，門票都是手機上的 QR Code。查核日 ${CHECKED}。`,
  },
  {
    title: "穿適合涉水的衣服，在時段一開始就抵達",
    desc: "請穿短褲，或可以捲到膝蓋以上的長褲——部分作品是水空間，水深可達成人膝蓋高。如果你穿裙子或寬管褲，現場有 XS 到 6L 的免費短褲可借，因為部分地板是鏡面的。入口等候可能長達 30 到 60 分鐘，所以時段一開始就到。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年 teamLab Planets 門票多少錢？",
    a: `依 teamLab Planets 官方售票網站（查核日 ${CHECKED}）：成人票 ¥3,800 起，國中與高中生 ¥2,800，4～12 歲兒童 ¥1,500，3 歲以下免費。身心障礙人士 ¥1,900 起，另有 ¥12,000 的 Premium Pass（4 歲以上）。成人票價依日期與時段變動，付款前請確認所選時段的金額。優惠票需要出示資格證明——請帶學生證、護照或身心障礙證明。`,
  },
  {
    q: "teamLab Planets 官網購票網站在哪裡？",
    a: `teamLab Planets TOKYO 官方售票網站是 teamlabplanets.dmm.com，可從美術館官方頁面 teamlab.art/e/planets 進入。售票網站的說明頁寫明，現場的售票櫃台與售票機都不販售門票，並列出有販售的通路：官方 Ticket Store、Lawson Ticket、Seven Ticket 與 Klook。不論哪個官方通路，都是指定日期與入場時間的 QR 票，價格由日期與時段決定。查核日 ${CHECKED}。`,
  },
  {
    q: "teamLab Planets 的入場時段怎麼運作？",
    a: `票面時間是入場時間，從該時間起 30 分鐘為入場準備時間；官方售票網站提醒入場可能需等候 30～60 分鐘。遲到的話，仍可在當天營業時間（08:00–22:00，閉館前一小時停止入場）內入場。Entrance Pass 最晚可在入場時間 2 小時前更改，最多 3 次，購買後不退款。查核日 ${CHECKED}。`,
  },
  {
    q: "去 teamLab Planets 該穿什麼？",
    a: "短褲，或可以捲到膝蓋以上的長褲。部分作品是水空間，水深可達成人膝蓋高，而且整間美術館都是赤腳體驗——入場時會在置物間脫掉鞋子、襪子與褲襪。部分地板是鏡面的，所以穿裙子或寬褲會不方便；現場有 XS 到 6L 的免費短褲可借。帶小孩的話請準備替換衣物，另外嬰兒車不能進場（有嬰兒車停放區，背巾可以）。",
  },
  {
    q: "teamLab Planets 要逛多久？",
    a: `官方未公布參觀時間。本站建議館內預留 1.5 到 2 小時，含置物櫃與擦乾的時間。另外要加上官方售票網站提醒的 30 到 60 分鐘等候，結束後也不要緊接著排其他行程。官方售票網站也寫明，忙碌時段可能會請停留較久的旅客移動。查核日 ${CHECKED}。`,
  },
];

const sameDayTours = [
  withKlookLocale(tokyoJoypolisPassport, LOCALE, {
    title: "東京 Joypolis 通行證",
    desc: "台場 DECKS 室內樂園入場及設施無限搭乘通行證，手機 QR Code 入場，頁面上建議停留 2 到 4 小時",
  }),
  withKlookLocale(tokyoBaySunsetBoatCruise, LOCALE, {
    title: "東京灣白天與夕陽遊船",
    desc: "從芝浦出發、船上有導覽員的一小時小船遊船——不含晚餐的東京灣遊船",
  }),
  withKlookLocale(tsukijiCultureFoodTour, LOCALE, {
    title: "築地文化美食導覽",
    desc: "築地場外市場導覽散步，含試吃與坐下來吃的壽司，導覽語言為英語、中文或西班牙語",
  }),
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "東京地鐵通票（24／48／72 小時）",
    desc: "東京地下鐵與都營地下鐵全線無限搭乘，抵達後領取，不必排隊購買",
  }),
];

const dayTrips = [
  withKlookLocale(fujiDayTour, LOCALE, {
    title: "東京出發富士山一日遊",
    desc: "全日巴士行程，前往富士山五合目、河口湖與忍野八海，當天晚上回到東京",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "東京觀光巴士一日遊",
    desc: "附導覽的環狀行程，走訪皇居庭園、淺草與東京晴空塔，提供多語語音導覽",
  }),
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "teamLab Planets 門票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTeamLabPlanetsPage({ updated }: { updated: PageUpdated }) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: attractionEventJsonLd({
              route: ROUTE,
              name: "teamLab Planets TOKYO",
              description: DESC,
              inLanguage: JSONLD_LANG["zh-tw"],
              facts: PLANETS_FACTS,
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            teamLab Planets 豐洲門票 2026：<br />官網票價、入場時段與預約方式
          </h1>
          <p className={styles.heroSubtitle}>
            豐洲的 teamLab Planets 門票多少錢、什麼時候開放、怎麼預約，以及從新豐洲站或豐洲站怎麼走。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價與時間", "資料取自 teamlab.art"].map((t) => (
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
            <strong>teamLab Planets 門票</strong>在官方售票網站的價格是成人 <strong>¥3,800 起</strong>、國高中生
            ¥2,800、4～12 歲 <strong>¥1,500</strong>，3 歲以下免費。每張票都要指定日期與入場時間，美術館現場不售票；
            官方未公布參觀時間，建議館內預留 <strong>1.5～2 小時</strong>，再加上官方售票網站提醒的 30～60 分鐘入場等候。
            全程赤腳，水作品的水深可達<strong>成人膝蓋高</strong>，請穿可以捲到膝蓋以上的短褲或長褲。
          </p>
        </section>

        <PlanetsAnswer />

        <PlanetsSameDay />

        <p className={styles.bodyText}>
          還在兩間東京美術館之間猶豫？請看我們的{" "}
          <Link href="/zh-tw/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 與無界比較</Link>。
        </p>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>2026 年 teamLab Planets 門票多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人 <strong>¥3,800 起</strong>，國中與高中生 ¥2,800，4～12 歲兒童 ¥1,500，未滿 4 歲完全免費。
            只有成人票與身心障礙者票的價格會變動：官方售票網站對每個日期、每個入場時間分別定價，因此官方標示的金額後面帶有
            波浪號（～）。想買到較便宜的門票，關鍵在於日期與時段，而不是購票通路。
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
            <strong>最後確認：{RECHECKED_ISO}</strong>（
            <a href={OFFICIAL_URL} target="_blank" rel="noopener">teamLab Planets 官方頁面</a>，票價未變動）。
            最初取自 teamLab Planets 官方售票網站（teamlabplanets.dmm.com）的英文版與日文版，查核日 {CHECKED}。優惠票需要出示資格證明，
            請帶學生證、護照或身心障礙證明。門票以手機 QR Code 形式發送。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>成人票價會變動多少，官方沒有公布。</strong>teamLab 只公布起價與預約日曆，而不是價目表；
            說明頁也只確認價格有差異——預約可以更改「即使是價格不同的日期」。所以請把 ¥3,800 當成最低價，
            打開官方預約日曆查看你行程可以接受的日期，付款前比較每一天的各個入場時間。真正有效的做法是把
            參觀日期提前或延後一天；找更便宜的賣家則沒有用，因為價格是日期決定的。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>訂票前</span>
          <h2 className={styles.sectionTitle}>營業時間、入場時段與需要多久</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            票面上的時間是入場時間，官方售票網站提醒入場可能要等 30 到 60 分鐘。人潮尖峰時段與參觀時間，
            teamLab 都沒有公布。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "官方資料怎麼寫", "來源與日期"].map((h) => (
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後確認：{RECHECKED_ISO}</strong>——營業時間、最後入場、休館日與展期已在{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener">teamLab Planets 官方頁面</a>重新確認；官方售票網站的項目以 {CHECKED} 為準。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Planets 對你的要求也比一般美術館門票多——要赤腳進場，而且路線的一部分是水：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>赤腳：</strong>鞋子、襪子與褲襪在置物櫃脫掉，全程赤腳體驗。</li>
            <li><strong>水：</strong>部分作品是水空間，水深可達成人膝蓋高。請穿短褲或可以捲起的長褲。</li>
            <li><strong>鏡面地板：</strong>穿裙子或寬褲會不方便——官方 FAQ 提醒，鏡面地板可能映出內衣褲。現場有 XS 到 6L 的免費短褲可借。</li>
            <li><strong>帶小孩：</strong>請準備替換衣物。嬰兒車不能進場——館外有嬰兒車停放區，背巾可以。</li>
            <li><strong>行李：</strong>免費置物櫃的尺寸是 23 × 34 × 37 公分。沒有寄物處，所以行李箱需自行用鋼索鎖固定在嬰兒車停放區。</li>
            <li><strong>水質衛生：</strong>官方 FAQ 寫著水會持續過濾、每小時測量氯濃度，出口備有消毒過的毛巾。</li>
            <li><strong>輪椅：</strong>可以入場，工作人員會說明路線；有些作品無法抵達，涉水區需要在同行者陪同下換乘專用輪椅。</li>
          </ul>
          <p className={styles.bodyText}>
            訂票前請依造訪日期查詢官方網站。以上除了建議預留時間之外，都是官方的寫法，查核日期如表中所列。
            官方售票網站也寫明，忙碌時段可能會請停留較久的旅客移動。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>你買到的是什麼</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 究竟是什麼</h2>
          <p className={styles.bodyText}>
            teamLab 是以東京為據點的藝術團體，以讓觀眾走入作品、親身體驗的大型數位藝術裝置聞名。豐洲的 Planets
            是身體感受最強的那一間：你赤腳、涉水，走過會對你的存在產生反應的作品——鏡面無限空間、漂浮光球的
            大廳、充滿生命力的花園。它是東京兩間 teamLab 當中帶孩子比較容易享受的一間，也是如果你從未見過這種規模的
            數位藝術、衝擊最大的一間。
          </p>
          <p className={styles.bodyText}>
            teamlab.art 列出的展期是 2018 年 7 月 7 日至 2027 年底，之後的行程請重新確認。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>值不值得</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 值得去嗎？</h2>
          <p className={styles.bodyText}>
            對多數第一次來東京的人來說，值得——但它是一個 1.5 到 2 小時、每人 ¥3,800 起的景點，
            票價相當於半日行程，參觀時間卻只有一頓悠閒午餐的長度。以下列出計算方式，方便自行比較：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>每小時的花費很高。</strong>1.5～2 小時 ¥3,800 起，是東京鐵塔主展望台 ¥1,500 的兩倍以上，也明顯高於澀谷SKY 白天線上票的 {PRICES.shibuyaSky.adult.split(" / ")[0]}，而這兩處你都可以待久一點。你付的是別處看不到的東西，不是時間長度——數字可以對照我們的<Link href="/guides/attractions/japan-attraction-ticket-prices">日本景點門票價格總表（英文）</Link>。</li>
            <li><strong>入場的成本是時間，不只是錢。</strong>官方售票網站提醒入場可能要等 30 到 60 分鐘，還要加上赤腳更換的時間。</li>
            <li><strong>它是東京身體負擔最大的美術館。</strong>全程赤腳、水深及成人膝蓋、鏡面地板。如果你不喜歡赤腳或涉水，麻布台的無界是同一個團體、但沒有水。</li>
            <li><strong>不怕下雨，也適合小孩。</strong>室內、未滿 4 歲免費，而且常常是孩子在整趟旅程中比寺廟更記得的地方。</li>
            <li><strong>當天無法在現場補買。</strong>現場不賣票，預約日曆額滿就無法入場。訂不到會打亂那一整個下午的計畫，這才是應該最先訂它的真正理由。</li>
          </ul>
          <p className={styles.bodyText}>
            如果你在東京的日子已經很緊、30 分鐘的固定時段會毀掉你想隨興安排的一天，或同行的人沒有人想捲起
            褲管，那就跳過。這三個是這張門票讓人失望的原因，而且沒有一個跟藝術本身有關。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>票況</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 門票會賣完嗎？</h2>
          <p className={styles.bodyText}>
            個別的入場時間會賣完，而且指定日期售罄後，現場也沒有售票櫃檯：官方售票網站明白寫著，現場的售票櫃台與
            售票機都不賣票。所以 Planets 應該是東京一週行程裡第一個訂的，而不是最後一個。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>要提前多久：</strong>官方未公布，teamLab 也沒有公布售罄資料。日期一確定就訂。</li>
            <li><strong>沒有現場票：</strong>官方資訊，查核日 {CHECKED}。只在線上販售，通路為官方 Ticket Store、Lawson Ticket、Seven Ticket 或 Klook。</li>
            <li><strong>一次最多十張：</strong>官方售票網站單次購買上限 10 張，庫存不足時會更少。20 人以上的團體要走另外的團體申請流程。</li>
            <li><strong>訂錯時段？</strong>改期就好，不必重訂。Entrance Pass 可在入場時間兩小時前更改，最多三次；Premium Pass 可改到當天 08:30。一律不能退款，用優惠券購買的票完全不能改。</li>
            <li><strong>遲到仍可入場，但錯過當天就無法使用：</strong>官方 FAQ 寫著當天營業時間內晚一點仍可入場，前提是在閉館前一小時的最後入場之前。</li>
          </ul>
          <p className={styles.bodyText}>
            實際上的結論：先選日期，再選入場時間，最後才選賣家。其中日期與入場時段決定能否入場。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>買哪一種</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 該買哪一種票？</h2>
          <p className={styles.bodyText}>
            除了一種情況，都是 Entrance Pass。唯一的另一個選項是 ¥12,000 的 Premium Pass，而官方售票網站
            說它唯一的好處是不必排入口隊伍——所以如果 30 到 60 分鐘的等候會打亂你一整天，它就值得；
            如果不會，多付的 ¥8,000 就沒有意義。
          </p>
          <div className={styles.stepsList}>
            {ticketChoice.map((item, i) => (
              <div key={item.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>至於選哪個入場時間：</strong>哪些時段最擁擠，官方未公布，teamLab 也沒有公布各時段的
            價目表。各時段的價格要看預約日曆，在下面任一個賣家點一下就能看到。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看 teamLab Planets 日期與時段 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook 是官方售票網站列出的通路之一；GetYourGuide 則是當時段沒了時的第二個查詢管道。兩者都依日期
            定價，請以預訂頁面顯示的實際票價為準，包括本頁標題中的價格。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 門票怎麼訂？</h2>
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
            準備好預訂入場時段了嗎？{" "}
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看 Planets 的空位與價格 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>直接向官方買</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 官方售票網站在哪裡？</h2>
          <p className={styles.bodyText}>
            美術館自己的頁面是 <strong>teamlab.art/e/planets</strong>，門票則是透過
            <strong>teamLab Planets TOKYO Official Ticket Store</strong>（
            <strong>teamlabplanets.dmm.com</strong>）販售——官方購票請前往上述網站，而不是搜尋結果中的其他頁面。本頁所有訂票
            規則也都出自它的說明頁，查核日 {CHECKED}。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>還有誰是官方通路：</strong>官方售票網站列出了 Lawson Ticket、Seven Ticket 與 Klook。不在這份名單上的都是轉售商，沒有理由去用。</li>
            <li><strong>付款方式：</strong>透過 DMM 使用信用卡、PayPay 與銀聯。如果你的卡被拒——這通常就是旅客改去別處買的原因——可改用支援國際信用卡付款的售票平台。</li>
            <li><strong>門票怎麼寄送：</strong>入場兩天前會收到附有 QR 門票連結的電子郵件，QR Code 本身從入場當天 00:00 起顯示。</li>
            <li><strong>直接買不會比較便宜：</strong>價格由日期與入場時間決定，不論走哪個官方通路，都依同一份預約日曆定價。</li>
          </ul>
          <p className={styles.bodyText}>
            換句話說：如果你的卡能用、看日文或英文網站沒問題，就直接向官方買；如果你想用自己的語言與幣別結帳，
            就向官方列出的賣家買。兩者都是官方認可的購票管道。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>帶小孩</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 適合帶小孩嗎？</h2>
          <p className={styles.bodyText}>
            它是東京最適合親子的美術館，也是規定最多的一間。未滿 4 歲免費，4～12 歲 ¥1,500，部分區域水深可達
            成人膝蓋——對孩子來說就更高——而且嬰兒車完全不能進場。以下都是官方的寫法，查核日 {CHECKED}。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>年齡與票價：</strong>3 歲以下免票；4～12 歲 ¥1,500；國中與高中生 ¥2,800。Premium Pass 從 4 歲起販售。</li>
            <li><strong>陪同：</strong>每三名兒童需有一名成人陪同。一位家長帶四個小小孩，官方售票網站不會受理。</li>
            <li><strong>嬰兒車：</strong>不能進入館內。館外有嬰兒車停放區，要自己用鋼索鎖上鎖；館內可以使用背巾。</li>
            <li><strong>尿布：</strong>女廁內設有尿布台。</li>
            <li><strong>水：</strong>深及成人膝蓋，而且全程赤腳。請帶替換衣物；不論大人或小孩，都要做好衣物弄濕的準備。</li>
            <li><strong>衣著：</strong>每個人都穿短褲或可捲起的長褲；有些地方的地板是鏡面的。免費短褲從 XS 到 6L，所以孩子穿洋裝來也不是問題。</li>
            <li><strong>寄放：</strong>免費置物櫃是 23 × 34 × 37 公分——放得下媽媽包，放不下行李箱，過大的物品要放到嬰兒車停放區。</li>
          </ul>
          <p className={styles.bodyText}>
            實際做法：訂早一點的時段，先讓孩子吃飽，下午的行程保持寬鬆。考驗小小孩的是入口 30 到 60 分鐘的
            等候，不是作品本身。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Planets 或無界</span>
          <h2 className={styles.sectionTitle}>該訂 Planets 還是無界？</h2>
          <p className={styles.bodyText}>
            它們是兩間獨立的美術館，門票分開。Planets 是赤腳走過水中的那一間；位於麻布台之丘的無界，是沒有固定參觀路線的迷宮式空間。
            票價、營業時間和適合對象請看我們的{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-tokyo-tickets">teamLab Planets 與無界比較</Link>，
            無界的訂票方式則請看{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-borderless-tickets">teamLab 無界門票攻略</Link>。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>出發前</span>
          <h2 className={styles.sectionTitle}>去 teamLab Planets 該穿什麼、帶什麼？</h2>
          <ul className={styles.bodyList}>
            <li><strong>穿著:</strong> 短褲或可捲到膝上的長褲。水深可到成人膝蓋，部分地板是鏡面，不建議穿迷你裙。現場有免費租借短褲，尺寸 XS 到 6L，離場前歸還。</li>
            <li><strong>門票:</strong> 手機或平板上的 QR 電子票，或列印出來。一個 QR 涵蓋同筆訂單的所有人。入場前 2 天會收到提醒信，QR 碼在入場當天 00:00 起才會顯示。</li>
            <li><strong>證件:</strong> 國高中生票需學生證或官方年齡證明，身心障礙者票需經認可的證明文件。</li>
            <li><strong>包包:</strong> 入場閘門後有免費置物櫃，尺寸 23 × 34 × 37 公分。更大的行李只能用鋼絲鎖固定在館外的嬰兒車停放處。</li>
            <li><strong>毛巾:</strong> 不必帶。水中作品的出口有提供毛巾。</li>
            <li><strong>帶小孩:</strong> 每 3 名兒童至少要有 1 名成人陪同，免費入場的兒童也要計入。請帶替換衣物。揹巾可入內，嬰兒車需停在館外。</li>
            <li><strong>再次入場:</strong> 所有票種都不可以，包括 Premium Pass。入場後不可退票。</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            資料來自官方售票網站與說明頁面，{CHECKED} 查閱。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>怎麼從豐洲站與新豐洲站到 teamLab Planets</h2>
          <p className={styles.bodyText}>
            地址是東京都江東區豐洲 6-1-16。以下是 teamlab.art 列出的交通方式，查核日 {CHECKED}：
          </p>
          <ul className={styles.bodyList}>
            <li><strong>新豐洲站</strong>（百合海鷗線）：1A 出口步行 3 分鐘。官方售票網站的說明是出剪票口後右轉，走北口。</li>
            <li><strong>豐洲站</strong>（東京地鐵有樂町線）：7 號出口步行 10 分鐘。沿百合海鷗線高架前進，美術館在右手邊。</li>
            <li><strong>市場前站</strong>（百合海鷗線）與豐洲市場：步行 5 分鐘。</li>
            <li><strong>計程車：</strong>銀座 10 分鐘、東京車站 15 分鐘；從羽田機場走高速公路 15 分鐘。</li>
            <li><strong>巴士：</strong>teamlab.art 提醒，從東京車站、銀座、築地出發的都營巴士「都05-2」非常擁擠，建議改用其他交通方式。GINZA SIX 與美術館之間有付費接駁巴士。</li>
            <li><strong>停車場：</strong>美術館沒有停車場。</li>
          </ul>
          <p className={styles.bodyText}>
            一張{" "}
            <Link href="/guides/transport/ic-cards-japan">Suica 或 PASMO 等 IC 卡（英文）</Link>{" "}
            就能搭有樂町線與百合海鷗線兩段——如果你對豐洲不熟，{" "}
            <Link href="/guides/transport/tokyo-transportation">我們的東京交通攻略（英文）</Link>{" "}
            有各路線的說明。
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="同一天在豐洲與台場就能訂的行程"
          intro="Planets 的時段只佔東邊這一天的一個半小時，而載你到門口的百合海鷗線會繼續開往台場。地鐵通票涵蓋到豐洲的地下鐵路段，但不含百合海鷗線；另外三個都在美術館附近、搭一小段車就到。Klook 價格依日期而變，請打開頁面查看實際金額與時間。"
          tours={sameDayTours}
        />

        <KlookTourPicks
          heading="從同一座城市出發的一日遊"
          intro="Planets 在現場大約一個半小時，所以通常會和別的行程共用一天。如果你東京那半段旅程還有一整天沒排，這兩個行程從市區出發、當天晚上回來。"
          tours={dayTrips}
        />

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 與無界比較：東京該去哪一館（2026）" },
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking（英文）" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto Tickets: Prices, Hours & Booking（英文）" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab Botanical Garden Osaka Tickets: Prices & Hours（英文）" },
            { href: "/zh-tw/guides/attractions/tokyo-skytree-tickets", title: "東京晴空塔門票（2026）：票價、350 公尺與 450 公尺怎麼選" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "Warner Bros. Studio Tour Tokyo Tickets (2026): Prices & How to Book（英文）" },
            { href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", title: "teamLab 無界 門票（2026）：票價、時段預約與購票管道" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards Explained（英文）" },
            { href: "/guides/transport/ic-cards-japan", title: "IC Cards in Japan 2026: Suica, Pasmo & How to Use Them（英文）" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>準備訂 teamLab Planets 了嗎？</h2>
            <p className={styles.ctaBannerDesc}>
              門票要指定日期與時間，美術館現場不售票。Klook 是官方售票網站列出的通路之一，
              門票是手機上的 QR Code。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看 teamLab Planets 門票 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
