// Traditional Chinese edition of /guides/attractions/teamlab-tokyo-tickets. It answers one
// question, which of Tokyo's two teamLab museums to book. Since 20 Nov 2026 (task
// jtk-20261120-R01) it mirrors the English page's order: a numbers-first answer, one comparison
// table with the verdict in row one, the Klook buttons and same-day block under it, short
// Planets-only / Borderless-only sections that hand over to their own guides, and the same five
// FAQ questions. Official figures were re-read on teamlab.art on 20 Nov 2026.
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
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import { fujiDayTour, tokyoSightseeingBusTour, tokyoSubwayTicket } from "../../../../lib/klook-links";
import { zhTeamlabBorderless, zhTeamlabPlanets } from "../../../../lib/klook-links-zh-tw";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import { teamlabSameDayCards } from "../../../../lib/teamlab-same-day-cards";

// Same-day cards under the comparison table (task-jtk-20261115-P01, moved 20 Nov 2026).
const SAME_DAY = teamlabSameDayCards("tokyo", "zh-tw");

const ROUTE = "/zh-tw/guides/attractions/teamlab-tokyo-tickets";
const LOCALE = "zh-tw" as const;

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const PLANETS_ADULT = priceLabel(P.adult, LOCALE);
const BORDERLESS_ADULT = priceLabel(B.adult, LOCALE);
const CHILD = priceLabel(P.child, LOCALE);
const CHECKED_ISO = "2026-11-20";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);

const TITLE = "teamLab Planets 無界 比較：票價與怎麼選（2026）";
const DESC =
  "東京兩間 teamLab 門票分開賣：Planets 成人 ¥3,800 起、無界 ¥3,400 起。帶小孩選 Planets，大人初訪選無界，看比較表再預訂。";

// 第一列是結論。
const compareRows = [
  { factor: "適合誰", planets: "帶小孩同行，或想赤腳涉水體驗的人", borderless: "不帶小孩、第一次去，或想穿著鞋慢慢欣賞藝術的人" },
  { factor: "成人（18 歲以上）", planets: `${PLANETS_ADULT}，熱門日期與時段較貴`, borderless: `${BORDERLESS_ADULT}，熱門日期與時段較貴` },
  { factor: "13～17 歲", planets: "¥2,800", borderless: "¥2,800" },
  { factor: "兒童（4～12 歲）", planets: `${CHILD}；3 歲以下免費`, borderless: `${CHILD}；3 歲以下免費` },
  { factor: "要下水嗎", planets: "要。赤腳，水深可達成人膝蓋", borderless: "不用。穿著鞋參觀" },
  { factor: "參觀時間", planets: "官方未公布；建議預留 1.5～2 小時", borderless: "約 1.5～2 小時（官方 FAQ），館內不限時" },
  { factor: "會售完嗎", planets: "指定時段，現場不售票，須事先上網預訂", borderless: "官網註明門票可能售完；約在參觀日兩個月前的 1 日開賣" },
  { factor: "現場購票", planets: "現場不售票", borderless: "尚有名額時可現場購買，需加 ¥200" },
  { factor: "最近車站", planets: "新豐洲站（百合海鷗線）1A 出口步行 3 分鐘", borderless: "神谷町站（日比谷線）5 號出口步行 2 分鐘" },
  { factor: "營業時間", planets: "08:00–22:00（12/31–1/2 為 08:00–20:00）", borderless: "08:30–21:00，部分日期不同" },
  { factor: "開放期間", planets: "至 2027 年底", borderless: "常設" },
];

const whoFor = [
  {
    title: "選 teamLab Planets 的話…",
    desc: "你帶著小孩、想親身體驗藝術，也不介意把腳弄濕。你會赤腳走過深及成人膝蓋的水。",
  },
  {
    title: "選 teamLab 無界的話…",
    desc: "你想欣賞藝術作品，而不是走進水中體驗。這裡沒有固定路線，作品在房間之間移動，你可以照自己的步調逛。",
  },
  {
    title: "兩座都去，如果…",
    desc: "你有兩個空閒的半天，而且很喜歡 teamLab。兩座位在東京不同區域，需要各自的指定時段門票，所以請分開安排。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "teamLab Planets 和 teamLab 無界哪個比較好？",
    a: "沒有哪一間整體比較好。teamLab Planets 要赤腳走過深及成人膝蓋的水，適合帶小孩同行；teamLab 無界沒有地圖、也沒有固定路線，可以穿著鞋慢慢欣賞作品。帶小孩就選 teamLab Planets，不帶小孩第一次去就選 teamLab 無界。",
  },
  {
    q: "2026 年東京 teamLab 門票多少錢？",
    a: `成人票 teamLab Planets ${PLANETS_ADULT}、teamLab 無界 ${BORDERLESS_ADULT}，熱門日期與時段會更貴（${CHECKED} 查閱 teamlab.art）。13～17 歲 ¥2,800，4～12 歲兩座都是 ${CHILD}，3 歲以下免費。兩座都去，成人至少 ¥7,200。`,
  },
  {
    q: "teamLab 門票會售完嗎？",
    a: "會。teamLab 無界官網註明門票指定日期與時段、可能售完，建議行程確定後盡早購買；門票約在參觀日兩個月前的 1 日開賣。teamLab Planets 現場完全不售票，一定要事先上網預訂。",
  },
  {
    q: "teamLab Planets 和 teamLab 無界可以同一天去嗎？",
    a: "可以，因為兩張票各有自己的日期與時間。不過兩座分別在豐洲與麻布台之丘，teamLab 官方表示無界參觀約需 1.5～2 小時。兩個入場時間之間請至少留下這段時間再加上交通時間，或分成兩個半天。",
  },
  {
    q: "teamLab 門票在哪裡買最便宜？",
    a: "基本票價由官方售票網站決定，teamLab 也把 Klook 列為無界的官方販售管道。真正影響價格的是日期：兩座的成人票在熱門日期與時段都會漲價，付款前請比較幾個日期。teamLab 無界現場購票比網路貴 ¥200。",
  },
];

const subwayTour = withKlookLocale(tokyoSubwayTicket, LOCALE, {
  title: "東京地鐵通票（24／48／72 小時）",
  desc: "東京地下鐵與都營地下鐵全線無限搭乘，抵達後領取，不必排隊購買",
});
const tours = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "東京觀光巴士一日遊",
    desc: "附導覽的環狀觀光路線，走訪皇居庭園、淺草與東京晴空塔，提供多語語音導覽",
  }),
  withKlookLocale(fujiDayTour, LOCALE, {
    title: "東京出發富士山一日遊",
    desc: "全日巴士行程，前往富士山五合目、河口湖與忍野八海，當天晚上回到東京",
  }),
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "teamLab Planets 與 teamLab 無界比較" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTeamLabTokyoPage({ updated }: { updated: PageUpdated }) {
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

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            teamLab Planets 無界 比較： <br />票價與怎麼選（2026）
          </h1>
          <p className={styles.heroSubtitle}>
            東京有兩座 teamLab 美術館，門票各自分開。這裡整理兩座的差別，以及該選哪一間。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價", "並排比較"].map((t) => (
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
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>東京的 teamLab 門票</strong>由兩座美術館分開販售：豐洲的 <strong>teamLab Planets 成人 {PLANETS_ADULT}</strong>，
              麻布台之丘的 <strong>teamLab 無界成人 {BORDERLESS_ADULT}</strong>，4～12 歲兩座都是 {CHILD}（{CHECKED} 查閱官網）。
              teamLab 官方表示無界參觀約需 1.5～2 小時，Planets 未公布時間，同樣抓 1.5～2 小時即可。帶小孩就選赤腳涉水的{" "}
              <strong>teamLab Planets</strong>；不帶小孩第一次去，就選穿著鞋參觀、有名額時也能現場購票的 <strong>teamLab 無界</strong>。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={zhTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 teamLab Planets 門票 →
              </KlookLink>
              <KlookLink href={zhTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 teamLab 無界門票 →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>並排比較</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs teamLab 無界：該選哪一間？</h2>
          <p className={styles.bodyText}>帶小孩選 teamLab Planets，大人第一次去選 teamLab 無界；理由逐項列在下表。</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Planets", "teamLab 無界"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後查核：{CHECKED_ISO}。來源：{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>、
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>、
            無界 FAQ{" "}
            <a href="https://www.teamlab.art/faq/Tokyo/" target="_blank" rel="noopener noreferrer">teamlab.art/faq/Tokyo</a>。
            兩座的成人票都依日期與時段浮動、只公布最低價，請確認你預計參觀日期的票價。Planets 的參觀時間是規劃參考，teamLab 未公布。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={zhTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看你那天的 teamLab Planets 門票 →
            </KlookLink>
            <KlookLink href={zhTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看你那天的 teamLab 無界門票 →
            </KlookLink>
          </div>
        </section>

        <KlookSameDayCards heading={SAME_DAY.heading} cards={SAME_DAY.cards} />

        <KlookTourPicks
          heading="豐洲與麻布台之丘之間怎麼移動"
          intro="無界所在的神谷町站屬於東京地下鐵日比谷線，東京地鐵通票可在 24／48／72 小時內無限搭乘東京地下鐵與都營地下鐵全線。Planets 所在的新豐洲站屬於百合海鷗線，通票不能搭，可改走有樂町線豐洲站。"
          tours={[subwayTour]}
        />

        <BookingEsimCard />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>只去 Planets</span>
          <h2 className={styles.sectionTitle}>已經決定去 teamLab Planets 了嗎？</h2>
          <p className={styles.bodyText}>
            豐洲的 teamLab Planets 只賣指定時段門票，成人 {PLANETS_ADULT}，現場不售票，所以上網選好日期與入場時間就是預約。
            各日期票價、Premium Pass、涉水穿著，以及從新豐洲站或豐洲站過去的路線，都在 Planets 門票攻略裡。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <Link href="/zh-tw/guides/attractions/teamlab-planets-tickets" className={styles.verdictBtn}>
              看完整的 teamLab Planets 門票攻略 →
            </Link>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>只去無界</span>
          <h2 className={styles.sectionTitle}>已經決定去 teamLab 無界了嗎？</h2>
          <p className={styles.bodyText}>
            麻布台之丘的 teamLab 無界販售成人 {BORDERLESS_ADULT} 的指定時段門票，以及不指定入場時間的 Flexible Pass，約在參觀日兩個月前的
            1 日開賣。開賣日期、Flexible Pass、閉館時間變動與現場購票，請看無界門票攻略。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <Link href="/zh-tw/guides/attractions/teamlab-borderless-tickets" className={styles.verdictBtn}>
              看完整的 teamLab 無界門票攻略 →
            </Link>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            同一趟想再加一個展望台，晴空塔 350 公尺與 450 公尺的票價比較請看{" "}
            <Link href="/zh-tw/guides/attractions/tokyo-skytree-tickets">東京晴空塔門票攻略</Link>。
          </p>
        </section>

        <EsimCtaTop />

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一間適合你</span>
          <h2 className={styles.sectionTitle}>該選哪一間 teamLab？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="同一趟旅程，順遊東京其他景點"
          intro="兩座美術館都只會佔用東京一天中的一部分時間。以下包括附導覽的東京市區一日遊，以及從東京出發的一日遊。Klook 價格依日期而變，所以請打開頁面查看你那一天的金額。"
          tours={tours}
        />

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 門票 2026：票價、時間與預約方式" },
            { href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", title: "teamLab 無界 門票（2026）：票價、時段預約與購票管道" },
            { href: "/zh-tw/guides/attractions/tokyo-skytree-tickets", title: "東京晴空塔門票（2026）：票價、350 公尺與 450 公尺觀景台怎麼選" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto Tickets: Prices, Hours & Booking（英文）" },
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking（英文）" },
            { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards Explained（英文）" },
          ]}
        />
      </div>
    </>
  );
}
