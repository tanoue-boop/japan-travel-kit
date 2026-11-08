// Traditional Chinese edition of /guides/attractions/teamlab-tokyo-tickets. Mirrors the English
// comparison page as of 2026-11-06: it answers one question, which of Tokyo's two teamLab museums
// to book. Planets tickets, hours and access live on /zh-tw/guides/attractions/teamlab-planets-tickets.
// Every figure comes from the English page or lib/attraction-prices.ts, none is added here.
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

const ROUTE = "/zh-tw/guides/attractions/teamlab-tokyo-tickets";
const LOCALE = "zh-tw" as const;

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const PLANETS_CHECKED = dateLabel(P.checked, LOCALE);
const BORDERLESS_CHECKED = dateLabel(B.checked, LOCALE);
const PLANETS_ADULT = priceLabel(P.adult, LOCALE);
const BORDERLESS_ADULT = priceLabel(B.adult, LOCALE);

const TITLE = "teamLab Planets 無界 比較：東京該去哪一館（2026）";
const DESC =
  "東京有兩間 teamLab 美術館，門票各自分開。比較 Planets 與無界的票價、營業時間、地點和適合對象，再訂適合你的那一間。";

const compareRows = [
  { factor: "地點", planets: "豐洲（江東區）", borderless: "麻布台之丘（港區）" },
  { factor: "體驗", planets: "赤腳走過水中", borderless: "沒有地圖的迷宮，50 多件作品" },
  { factor: "適合", planets: "親子、第一次來、想要身體感受的人", borderless: "藝術愛好者、想慢慢逛、攝影" },
  { factor: "成人票", planets: PLANETS_ADULT, borderless: BORDERLESS_ADULT },
  {
    factor: "兒童票",
    planets: `${priceLabel(P.child, LOCALE)}（4～12 歲；未滿 4 歲免費）`,
    borderless: `${priceLabel(B.child, LOCALE)}（4～12 歲；未滿 4 歲免費）`,
  },
  { factor: "營業時間", planets: "08:00–22:00（12/31–1/2 為 08:00–20:00）", borderless: "公告 08:30–21:00，依日期變動" },
  { factor: "入場", planets: "指定日期與入場時間", borderless: "指定時段，或不指定時間的 Flexible Pass" },
  { factor: "現場購票", planets: "現場不售票", borderless: "現場購票多 ¥200" },
  { factor: "展期", planets: "到 2027 年底", borderless: "常設" },
];

const whoFor = [
  {
    title: "選 Planets 的話…",
    desc: "你帶著小孩、想要身體感受，也不介意腳濕。你會赤腳走過深及成人膝蓋的水。",
  },
  {
    title: "選無界的話…",
    desc: "你想看藝術，而不是涉水走過它。這裡沒有固定路線，作品在房間之間移動，你可以照自己的步調逛。",
  },
  {
    title: "兩間都去，如果…",
    desc: "你有兩個空的半天，也喜歡 teamLab。兩間在城市的不同區域，需要分別購買指定時間的門票，所以請把行程分開。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "東京的 teamLab，Planets 和無界哪個比較好？",
    a: "沒有哪一間整體比較好。Planets 適合親子和第一次來、想要身體感受的人，你會赤腳走過水中。無界適合想慢慢探索的藝術愛好者，沒有地圖，也沒有固定路線。如果只有時間去一間，又帶著小孩，就選 Planets。",
  },
  {
    q: "teamLab Planets 和無界是同一張門票嗎？",
    a: "不是。它們是兩間獨立的美術館，門票分開，位在東京不同區域。Planets 的門票不能進無界，無界的門票也不能進 Planets。",
  },
  {
    q: "東京的 teamLab 門票多少錢？",
    a: `Planets 成人票 ${PLANETS_ADULT}（${PLANETS_CHECKED} 查閱），無界成人票 ${BORDERLESS_ADULT}（${BORDERLESS_CHECKED} 查閱）。兩間都依日期與時段定價，請確認你自己日期的金額。`,
  },
  {
    q: "Planets 和無界可以同一天去嗎？",
    a: "可以，因為兩張票各有自己的日期與時間。不過兩間在城市的不同區域，每一間都要花不少時間，分成兩個半天會比較輕鬆。",
  },
  {
    q: "哪一間 teamLab 比較適合小孩？",
    a: "Planets。兩間都是未滿 4 歲免費，但 Planets 時間較短、以身體體驗為主，小孩比較容易跟上。請帶替換衣物，因為涉水區大家都會濕；另外嬰兒車不能進場。",
  },
];

const tours = [
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "東京地鐵通票（24／48／72 小時）",
    desc: "東京地下鐵與都營地下鐵全線無限搭乘，抵達後領取，不必排隊購買",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "東京觀光巴士一日遊",
    desc: "附導覽的環狀行程，走訪皇居庭園、淺草與東京晴空塔，提供多語語音導覽",
  }),
  withKlookLocale(fujiDayTour, LOCALE, {
    title: "東京出發富士山一日遊",
    desc: "全日巴士行程，前往富士山五合目、河口湖與忍野八海，當天晚上回到東京",
  }),
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "teamLab Planets 與無界比較" },
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
            teamLab Planets 與無界比較（2026）：<br />東京該訂哪一間
          </h1>
          <p className={styles.heroSubtitle}>
            東京有兩間 teamLab 美術館，門票各自分開。這裡整理兩間的差別，以及該訂哪一間。
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
              <strong>東京的 teamLab 門票</strong>，其實是在兩間美術館之間做選擇。帶小孩或想走進水裡，
              <strong>就訂 Planets</strong>；想慢慢探索藝術，<strong>就訂無界</strong>。兩間門票分開，
              成人票 Planets {PLANETS_ADULT}，無界 {BORDERLESS_ADULT}。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={zhTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 Planets 門票 →
              </KlookLink>
              <KlookLink href={zhTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看無界門票 →
              </KlookLink>
            </div>
          </div>
        </div>

        <p className={styles.bodyText}>
          已經決定了？營業時間、預約方式與交通請看{" "}
          <Link href="/zh-tw/guides/attractions/teamlab-planets-tickets">teamLab Planets 門票攻略</Link>，或{" "}
          <Link href="/zh-tw/guides/attractions/teamlab-borderless-tickets">teamLab 無界門票攻略</Link>。
        </p>

        <BookingEsimCard />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>並排比較</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs 無界：該訂哪一間？</h2>
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
            Planets 資料讀自 teamlab.art 與官方售票網站，查核日 {PLANETS_CHECKED}；無界資料讀自 teamlab.art，
            查核日 {BORDERLESS_CHECKED}。兩間的成人票都依日期與時段定價，請確認你自己的日期。
          </p>
        </section>

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

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="同一趟旅程可以一起訂的行程"
          intro="兩間美術館都只佔東京一天的一部分。這三項涵蓋地鐵、附導覽的市區一日遊，以及離開東京的一日遊。Klook 價格依日期而變，所以請打開頁面查看你那一天的金額。"
          tours={tours}
        />

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 門票 2026：票價、時間與預約方式" },
            { href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", title: "teamLab 無界 門票（2026）：票價、時段預約與購票管道" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto Tickets: Prices, Hours & Booking（英文）" },
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking（英文）" },
            { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards Explained（英文）" },
          ]}
        />
      </div>
    </>
  );
}
