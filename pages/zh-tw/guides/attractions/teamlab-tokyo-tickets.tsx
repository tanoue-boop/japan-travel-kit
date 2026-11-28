// Traditional Chinese edition of /guides/attractions/teamlab-tokyo-tickets. It answers one
// question, which of Tokyo's two teamLab museums to book. Since 28 Nov 2026 (task
// jtk-20261128-R01) it mirrors the English page's order: a three-sentence answer with both
// price floors, the visit length and the booking rule; one comparison table with the verdict in
// row one (where, station, price, time, what to wear, when booking opens, tickets on the day);
// the two Klook buttons and a same-day block (Tokyo day tour, Subway Ticket, Klook eSIM) under
// it; question H2s — how much, on the day, both in one day — and the same five FAQ questions.
// Official figures were re-read on 28 Nov 2026.
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
import NextBookingBlock from "../../../../components/NextBookingBlock";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import { fujiDayTour, klookEsim, tokyoSightseeingBusTour, tokyoSubwayTicket, type KlookTour } from "../../../../lib/klook-links";
import { zhTeamlabBorderless, zhTeamlabPlanets } from "../../../../lib/klook-links-zh-tw";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import KlookAddOnLine from "../../../../components/KlookAddOnLine";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import HotelStayBlock from "../../../../components/HotelStayBlock";
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
const CHECKED_ISO = "2026-11-28";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const SOURCE_NOTE = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const TITLE = "teamLab Planets 無界 比較：票價與怎麼選（2026）";
const DESC =
  "東京兩間 teamLab 門票分開賣：Planets 成人 ¥3,800 起、無界 ¥3,400 起。想赤腳涉水選 Planets，想自由漫遊選無界，附比較表。";

// 第一列是結論。
const compareRows = [
  { factor: "適合誰", planets: "想赤腳走進水中體驗的人（帶小孩選這間）", borderless: "想穿著鞋、沒有固定路線自由漫遊作品的人" },
  { factor: "地點", planets: "豐洲（江東區）", borderless: "麻布台之丘（港區）" },
  { factor: "最近車站", planets: "新豐洲站（百合海鷗線）1A 出口步行 3 分鐘", borderless: "神谷町站（日比谷線）5 號出口步行 2 分鐘" },
  { factor: "成人（18 歲以上）", planets: `${PLANETS_ADULT}，熱門日期與時段較貴`, borderless: `${BORDERLESS_ADULT}，熱門日期與時段較貴` },
  { factor: "13～17 歲／4～12 歲", planets: `¥2,800／${CHILD}；3 歲以下免費`, borderless: `¥2,800／${CHILD}；3 歲以下免費` },
  { factor: "參觀時間", planets: "官方未公布；建議預留 1.5～2 小時", borderless: "約 1.5～2 小時（官方 FAQ），館內不限時" },
  { factor: "穿著", planets: "赤腳，水深可達成人膝蓋；可免費借短褲", borderless: "穿鞋參觀，沒有水" },
  { factor: "開賣時間", planets: "官方未公布開賣日；網路販售指定時段門票", borderless: "約在參觀日兩個月前的 1 日" },
  { factor: "當天購票", planets: "現場不售票，出發前先上網購買", borderless: "未售完時當天可上網購買，現場購票需加 ¥200" },
  { factor: "營業時間", planets: "08:00–22:00（12/31–1/2 為 08:00–20:30）", borderless: "08:30–21:00，部分日期不同" },
  { factor: "開放期間", planets: "開放至 2027 年底", borderless: "常設" },
];

const costRows = [
  { who: "成人（18 歲以上）", planets: PLANETS_ADULT, borderless: BORDERLESS_ADULT, both: "¥7,200 起" },
  { who: "13～17 歲", planets: "¥2,800", borderless: "¥2,800", both: "¥5,600" },
  { who: "4～12 歲", planets: CHILD, borderless: CHILD, both: "¥3,000" },
  { who: "3 歲以下", planets: "免費", borderless: "免費", both: "免費" },
  { who: "身心障礙者", planets: "¥1,900 起", borderless: "¥1,700 起", both: "¥3,600 起" },
  { who: "現場購票", planets: "不售票", borderless: "成人加 ¥200", both: "—" },
];

const faqItems: FaqItem[] = [
  {
    q: "東京 teamLab 該選 Planets 還是無界？",
    a: "沒有哪一間絕對比較好。teamLab Planets 要赤腳走過深及成人膝蓋的水，適合帶小孩同行；teamLab 無界沒有地圖、也沒有固定路線，可以穿著鞋自由漫遊作品。",
  },
  {
    q: "2026 年東京 teamLab 門票多少錢？",
    a: `成人票 teamLab Planets ${PLANETS_ADULT}、teamLab 無界 ${BORDERLESS_ADULT}，熱門日期與時段會更貴（${CHECKED} 查閱 teamlab.art）。13～17 歲 ¥2,800，4～12 歲兩座都是 ${CHILD}，3 歲以下免費。兩座都參觀的話，成人合計至少 ¥7,200。`,
  },
  {
    q: "teamLab 門票可以當天買嗎？",
    a: "只有無界可以。teamLab 無界未售完時，當天也能在官方售票網站購買，現場購票成人貴 ¥200。teamLab Planets 現場完全不售票，出發前一定要先上網購買。",
  },
  {
    q: "teamLab Planets 和 teamLab 無界可以同一天去嗎？",
    a: "可以，因為兩張門票各自指定日期與入場時間。不過兩座分別在豐洲與麻布台之丘，teamLab 官方表示無界參觀約需 1.5～2 小時。兩個入場時段之間，請至少預留這段參觀時間加上交通時間，或分成兩個半天。",
  },
  {
    q: "teamLab 門票在哪裡買最便宜？",
    a: "基本票價由官方售票網站決定，teamLab 也把 Klook 列為無界的官方販售管道。真正影響價格的是日期：兩座的成人票在熱門日期與時段都會漲價，付款前請比較幾個日期。teamLab 無界現場購票比網路貴 ¥200。",
  },
];

// 比較表正下方：東京一日遊・東京地鐵通票・Klook eSIM。
const sameDayBookings: KlookTour[] = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "東京觀光巴士一日遊",
    desc: "附導覽的東京市區環遊行程，走訪皇居庭園、淺草與東京晴空塔，提供多語語音導覽",
  }),
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "東京地鐵通票（24／48／72 小時）",
    desc: "東京地下鐵與都營地下鐵全線無限搭乘，抵達後領取，無須排隊購票",
  }),
  { title: "Klook 日本 eSIM 網卡", desc: "兩座美術館入口都要出示手機電子票，出發前先準備好網路", url: klookFor(klookEsim.url, LOCALE) },
];
const fujiTour = withKlookLocale(fujiDayTour, LOCALE, {
  title: "東京出發富士山一日遊",
  desc: "全天巴士行程，前往富士山五合目、河口湖與忍野八海，當天晚上回到東京",
});

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
            東京有兩座 teamLab 美術館，門票需分別購買。這裡整理兩座的差別，以及該選哪一間。
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
              <strong>東京 teamLab 門票</strong>成人在豐洲的 <strong>teamLab Planets {PLANETS_ADULT}</strong>、麻布台之丘的{" "}
              <strong>teamLab 無界 {BORDERLESS_ADULT}</strong>，兩座在熱門日期與時段都會更貴（{CHECKED} 查閱官網）。teamLab
              官方表示無界參觀約需 1.5～2 小時，Planets 未公布時間，同樣建議預留 1.5～2 小時。兩座都在網路販售指定時段門票，只有無界也能現場購票（加 ¥200）。
            </p>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0 }}>
              想赤腳走進水中選 <strong>teamLab Planets</strong>，想自由漫遊作品選 <strong>teamLab 無界</strong>。各日期票價與預約步驟請看{" "}
              <Link href="/zh-tw/guides/attractions/teamlab-planets-tickets">teamLab Planets 門票</Link>攻略。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={zhTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 teamLab Planets 門票 →
              </KlookLink>
              <KlookLink href={zhTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 teamLab 無界門票 →
              </KlookLink>
            </div>
            {/* A32 (27 Nov 2026): one line of 5% / 20% under the 2% ticket buttons. */}
            <KlookAddOnLine
              lead="同一天一起訂："
              items={[
                { label: "東京地鐵通票（24／48／72 小時）", url: klookFor(tokyoSubwayTicket.url, "zh-tw") },
                { label: "Klook 日本 eSIM 網卡", url: klookFor(klookEsim.url, "zh-tw") },
              ]}
            />
            {/* A34 (27 Nov 2026): the next booking of the same trip (high-EPC guides) — lib/next-booking.ts. */}
            <NextBookingBlock region="tokyo" locale="zh-tw" />
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>並排比較</span>
          <h2 className={styles.sectionTitle}>東京 teamLab 哪間比較好：Planets 還是無界？</h2>
          <p className={styles.bodyText}>想走進水中體驗選 teamLab Planets（帶小孩也選這間），想穿鞋自由漫遊選 teamLab 無界；其餘差別列在下表。</p>
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
          <p className={styles.bodyText} style={SOURCE_NOTE}>
            最後查核：{CHECKED_ISO}。來源：{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>、
            <a href="https://teamlabplanets.dmm.com/en/ticket" target="_blank" rel="noopener noreferrer">teamlabplanets.dmm.com/en/ticket</a>、
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>、無界 FAQ{" "}
            <a href="https://www.teamlab.art/faq/Tokyo/" target="_blank" rel="noopener noreferrer">teamlab.art/faq/Tokyo</a>。兩座的成人票都依日期與時段浮動、只公布最低價，請確認你預計參觀日期的票價。Planets 的參觀時間是規劃參考，teamLab 未公布。
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

        <KlookTourPicks
          heading="和 teamLab 門票同一天要訂的"
          intro="附導覽的東京一日遊、地鐵通票，以及手機電子票需要的網路。東京地鐵通票可到無界的神谷町站；Planets 可搭有樂町線到豐洲站（步行 10 分鐘），但不含新豐洲站的百合海鷗線。Klook 價格依日期而變，請打開頁面查看你那一天的金額。"
          tours={sameDayBookings}
        />

        <KlookSameDayCards heading={SAME_DAY.heading} cards={SAME_DAY.cards} />

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="tokyo" areas={["ginza", "odaiba", "roppongi", "tokyoStation"]} />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>東京 teamLab 門票多少錢？</h2>
          <p className={styles.bodyText}>
            成人 Planets {PLANETS_ADULT}、無界 {BORDERLESS_ADULT}；兩座門票分開買，都去的話成人 ¥7,200 起、4～12 歲 ¥3,000。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "teamLab Planets", "teamLab 無界", "兩座都去"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.both}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={SOURCE_NOTE}>
            最後查核：{CHECKED_ISO}，
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>、
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>。成人與身心障礙者票價是最低價，部分日期會漲；「兩座都去」為兩個最低價相加。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>當天購票</span>
          <h2 className={styles.sectionTitle}>teamLab 門票可以當天買嗎？</h2>
          <p className={styles.bodyText}>
            只有無界可以：未售完時當天也能在官方售票網站購買，現場購票成人貴 ¥200。Planets 現場不售票，出發前一定要先上網購買。
          </p>
          <p className={styles.bodyText}>
            無界門票約在參觀日兩個月前的 1 日開賣，官方提醒可能售完；Planets 未公布開賣日。開賣日期、Flexible Pass 與現場購票請看{" "}
            <Link href="/zh-tw/guides/attractions/teamlab-borderless-tickets">teamLab 無界門票</Link>攻略；各日期票價、Premium Pass
            與涉水穿著請看 <Link href="/zh-tw/guides/attractions/teamlab-planets-tickets">teamLab Planets 門票</Link>攻略。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>兩座都去</span>
          <h2 className={styles.sectionTitle}>一天可以兩座都去嗎？</h2>
          <p className={styles.bodyText}>
            可以，只要買兩張指定時段門票並留好間隔：每座預留 1.5～2 小時，再加上豐洲與麻布台之丘之間的交通時間，或分成兩個半天。
          </p>
          <p className={styles.bodyText}>
            兩座都去成人 ¥7,200 起。無界的神谷町站在東京地下鐵日比谷線；Planets 從有樂町線豐洲站步行 10 分鐘、從百合海鷗線新豐洲站步行 3 分鐘。同一趟想再加一個展望台，晴空塔 350 公尺與 450 公尺展望台的票價比較請看{" "}
            <Link href="/zh-tw/guides/attractions/tokyo-skytree-tickets">東京晴空塔門票攻略</Link>。
            teamLab 和迪士尼都要先選日期再買票；帶小孩的話，迪士尼的兒童票適用 4–11 歲、3 歲以下免費，請看{" "}
            <Link href="/zh-tw/guides/attractions/tokyo-disney-tickets">東京迪士尼門票攻略</Link>。上網預約、當天查路線都要用到手機網路，網卡怎麼選請見{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan">日本eSIM推薦</Link>。
          </p>
        </section>

        <BookingEsimCard />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="從東京出發的一日遊"
          intro="兩座美術館都只需安排一天中的部分時間。想離開市區玩一整天，可以參加富士山一日遊。Klook 價格依日期而變，所以請打開頁面查看你那一天的金額。"
          tours={[fujiTour]}
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
