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
import { zhSkytreeTicket, zhTokyoSubwayTicket } from "../../../../lib/klook-links-zh-tw";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhDateLabel, zhMonthLabel, zhPrice } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions/tokyo-skytree-tickets";
const TITLE = "東京晴空塔門票（2026）：票價與樓層選擇";
const DESC =
  "東京晴空塔門票 2026：350 樓展望台 ¥1,800 起、350＋450 套票 ¥3,000 起，當天購票每張多 ¥500。";

// All figures come from lib/attraction-prices.ts and the English guide that read
// them off tokyo-skytree.jp. Nothing was re-checked or added for this edition.
const P = PRICES.tokyoSkytree;
const CHECKED = zhDateLabel(P.checked);
// "from ¥1,800" -> "¥1,800 起": same figure, Chinese qualifier. See lib/i18n.ts.
const ADULT = zhPrice(P.adult);
const CHILD = zhPrice(P.child);

const priceRows = [
  { ticket: "350 樓 — 成人（15 歲以上）", advance: ADULT, sameDay: "另加服務費 ¥500" },
  { ticket: "350 樓 — 兒童（6～14 歲）", advance: CHILD, sameDay: "另加服務費 ¥500" },
  { ticket: "350＋450 樓套票 — 成人", advance: "¥3,000 起", sameDay: "另加服務費 ¥500" },
  { ticket: "350＋450 樓套票 — 兒童", advance: "¥1,500 起", sameDay: "另加服務費 ¥500" },
  { ticket: "現場加購 450 樓 — 成人", advance: "線上不販售", sameDay: "¥1,400" },
  { ticket: "現場加購 450 樓 — 兒童", advance: "線上不販售", sameDay: "¥700" },
  { ticket: "5 歲以下", advance: "免費", sameDay: "免費" },
];

const deckRows = [
  {
    deck: "東京晴空塔",
    height: "350 樓與 450 樓",
    price: `350 樓 ${ADULT}・套票 ¥3,000 起`,
    highlight: "東京最高的展望台，也是唯一的玻璃空中迴廊",
    area: "押上／東京晴空塔站",
  },
  {
    deck: "澀谷SKY",
    height: "約 229 公尺屋頂",
    price: "線上預購 ¥2,500",
    highlight: "直接在澀谷十字路口上方的露天屋頂——重點是照片，不是高度",
    area: "澀谷站",
  },
  {
    deck: "東京鐵塔",
    height: "約 150 與約 250 公尺兩層",
    price: "約 ¥3,300（Top Deck Tour）",
    highlight: "1958 年的地標，而且視野裡看得到晴空塔",
    area: "芝公園／赤羽橋",
  },
  {
    deck: "東京都廳展望室",
    height: "約 202 公尺",
    price: "免費",
    highlight: "完全不用票——東京最划算的城市全景",
    area: "新宿",
  },
];

const whoFor = [
  {
    title: "只買 350 樓就夠了，如果…",
    desc: `你要的是視野，不是加購。350 樓是三層樓的主展望台，光是這裡就已經看得到整片關東平原。成人 ${ADULT}，以每公尺高度換算，是東京主要付費展望台裡最便宜的一個。`,
  },
  {
    title: "加買 450 樓，如果…",
    desc: "高度本身就是這趟的目的。450 樓是 Tembo Galleria，一條斜斜往上繞的玻璃空中迴廊，通到塔內可抵達的最高點。線上套票 ¥3,000 起；當天在 350 樓票上加購，要再付 ¥1,400。",
  },
  {
    title: "選晚一點的時段，如果…",
    desc: `你更想要夜景而不是地平線。官方網站查核日 ${CHECKED} 時，展望台營業到 22:00，最後入場 21:00。白天時段賣完之後，還有名額的通常就是晚場。`,
  },
];

const steps = [
  {
    title: "訂票前先決定只買 350 樓還是買套票",
    desc: "450 樓用線上套票買（成人 ¥3,000 起）比當天在 350 樓票上加購（多 ¥1,400）便宜。只要你有一點可能想上空中迴廊，就一開始買套票。",
  },
  {
    title: "線上訂指定日期的票",
    desc: `官方網站以上面的「起」價販售指定日期票，你那天的實際金額可能更高。當天在 4 樓售票櫃台或便利商店購買，每張票要另加 ¥500 服務費——這是提前訂票最明確的理由。查核日 ${CHECKED}。`,
  },
  {
    title: "海外發行的信用卡就走售票平台",
    desc: "Klook 賣的是同一張指定時間入場券，結帳看得懂、立即拿到電子票，可以避開日本官方售票網站常見的卡與語言問題。同一個商品頁也有 450 樓套票。",
  },
  {
    title: "查你自己那天的時間，不要看一般時間",
    desc: `晴空塔公布的是逐日行事曆，官網也明白寫著「營業時間可能未經公告即變更」，最後入場是閉館前一小時。查核日 ${CHECKED} 時，展望台的時間是 10:00–22:00，最後入場 21:00。`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年東京晴空塔門票多少錢？",
    a: `官方網站的指定日期票，主展望台 350 樓成人（15 歲以上）${ADULT}，6～14 歲兒童 ${CHILD}。涵蓋 350 樓與 450 樓的套票成人 ¥3,000 起、兒童 ¥1,500 起。5 歲以下免費。這些都是「起」價，特定日期的金額可能更高。官方網站查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔門票提前買比較便宜嗎？",
    a: `是，而且便宜多少是寫明的，不是看當天需求。當天在 4 樓售票櫃台或便利商店購買，入場費之外每張票要再加 ¥500 服務費。四個人就是 ¥2,000 的可省成本。線上訂指定日期票——官網或售票平台都一樣——就同時省掉這筆費用和櫃台排隊。查核日 ${CHECKED}。`,
  },
  {
    q: "350 樓和 450 樓差在哪裡？",
    a: "350 樓是 Tembo Deck，三層樓的主展望層，每一張票都含。450 樓是 Tembo Galleria，一條玻璃牆面、斜斜往上繞的空中迴廊，通到塔內可抵達的最高點。450 樓不能單獨參觀：你必須先有 350 樓的票，要嘛買線上套票，要嘛當天在現場售票機加購成人 ¥1,400。",
  },
  {
    q: "450 樓的票可以線上買嗎？",
    a: `不能單買。官方網站只把 450 樓放在套票裡賣；如果你帶著 350 樓的票到現場才改變主意，就在館內售票機加購，成人 ¥1,400、6～14 歲兒童 ¥700。線上買套票是便宜的那條路——成人 ¥3,000 起，分兩次買則是 ¥1,800 再加 ¥1,400。查核日 ${CHECKED}。`,
  },
  {
    q: "東京晴空塔的營業時間是？",
    a: `晴空塔用的是逐日行事曆而不是一張固定時刻表，官網也註明「營業時間可能未經公告即變更」，最後入場是閉館前一小時。查核日 ${CHECKED} 時，展望台的時間是 10:00–22:00，最後入場 21:00。要把一個晚上排在這裡之前，請先用你自己的日期打開行事曆確認。`,
  },
  {
    q: "東京晴空塔和澀谷SKY 該選哪一個？",
    a: "它們回答的是不同問題。晴空塔講的是高度與視野：350 樓和 450 樓是東京最高的展望台，視野涵蓋整片關東平原，天氣好的時候富士山也在裡面。澀谷SKY 講的是照片：約 229 公尺的露天屋頂，就在澀谷十字路口正上方，日落最好看，氣氛大於高度。只能選一個的話，全景選晴空塔，大家都認得的那張照片選澀谷SKY。",
  },
  {
    q: "在東京晴空塔看得到富士山嗎？",
    a: "天氣好的時候看得到，而且憑高度，它的機率是東京各展望台裡最高的。能見度完全看天氣，涼爽乾燥的月份和一天中較早的時段通常比較好。任何一個特定日期都沒有保證，如果你是為了富士山視野才付套票價，這點值得記住。",
  },
  {
    q: "東京晴空塔怎麼去？",
    a: "塔就在東武晴空塔線的「東京晴空塔站」與「押上站」上方，押上有東京地下鐵半藏門線、都營淺草線與京成押上線。押上在東京地鐵通票的範圍內，所以如果你已經帶著那張通票，過去不會多花錢。淺草線往淺草只有兩站，兩個地方很容易排在同一個下午。",
  },
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "東京晴空塔門票" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTokyoSkytreePage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = zhMonthLabel(updated.iso);

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
            東京晴空塔門票（2026）：<br />票價、350 與 450 樓怎麼選、怎麼訂
          </h1>
          <p className={styles.heroSubtitle}>
            東京最高的展望台，也是少數「當天才買」有明文代價的景點。這裡是官方票價、450 樓實際多給你什麼，
            以及從海外怎麼訂。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價", "350 樓 vs 450 樓"].map((t) => (
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
                <p className={styles.verdictStatLabel}>350 樓（成人）</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>350＋450 套票</p>
                <p className={styles.verdictStatValue}>¥3,000 起</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>當天購票</p>
                <p className={styles.verdictStatValue}>每張多 ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>5 歲以下</p>
                <p className={styles.verdictStatValue}>免費</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>線上訂指定日期的票。晴空塔在當天售票櫃台每張票收 ¥500 服務費，
              所以提前訂票便宜的是一個寫明的金額，不是運氣。如果你有可能想上 450 樓空中迴廊，
              一開始就買套票——到現場再加購要多付 ¥1,400。票價讀自官方網站，查核日 {CHECKED}。
            </p>
            <KlookLink href={zhSkytreeTicket.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看東京晴空塔門票 →
            </KlookLink>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>你買到的是什麼</span>
          <h2 className={styles.sectionTitle}>一張票涵蓋到哪裡</h2>
          <p className={styles.bodyText}>
            東京晴空塔賣的是兩個不同樓層的入場。<strong>350 樓</strong>是 Tembo Deck，三層樓的展望層，
            每一張票都含。<strong>450 樓</strong>是 Tembo Galleria，一條斜斜往上繞的玻璃牆面空中迴廊，
            通到塔內可抵達的最高點——而且它不能單獨參觀。
          </p>
          <p className={styles.bodyText}>
            大部分的混亂都來自這個兩層結構，因為兩層的價格取決於你是線上一起買，還是當天分開買。
            下面這段把兩條路並排放在一起。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>東京晴空塔門票價格</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "線上指定日期", "當天現場"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.advance}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            讀自東京晴空塔官方網站，查核日 {CHECKED}。官方頁面把這些標為「起」價，所以特定日期的金額可能更高，
            請在結帳時確認。¥500 當天服務費是每張票計算，4 樓售票櫃台與便利商店都適用。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一種票</span>
          <h2 className={styles.sectionTitle}>350 樓、套票，還是晚場？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>晴空塔 vs 東京其他展望台</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            晴空塔是「高度」那一票。如果你真正想要的是澀谷十字路口的照片，
            <Link href="/zh-tw/guides/attractions/shibuya-sky-tickets">澀谷SKY</Link>{" "}
            才是更好的選擇；如果你想完全不花錢看城市全景，新宿的東京都廳展望室免費。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["展望台", "高度", "票價（約）", "特色", "區域"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            晴空塔與澀谷SKY 的數字來自業者自己的網站；東京鐵塔與都廳是約略值，可能變動。請在結帳時確認。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>東京晴空塔門票怎麼訂</h2>
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
            <KlookLink href={zhSkytreeTicket.url} target="_blank" rel={KLOOK_REL}>
              在 Klook 查看晴空塔的時段與價格 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>東京晴空塔的位置</h2>
          <p className={styles.bodyText}>
            交通是最簡單的部分：塔就直接蓋在車站上面。
          </p>
          <ul className={styles.bodyList}>
            <li><strong>東京晴空塔站</strong>（東武晴空塔線）——就在塔的正下方。</li>
            <li><strong>押上站</strong>——東京地下鐵半藏門線、都營淺草線、京成押上線。</li>
            <li>押上是地鐵站，所以在東京地鐵通票的範圍內；帶著那張通票過去不會多花錢。</li>
            <li>淺草線往淺草只有兩站，兩邊很容易排在同一個下午。</li>
          </ul>
          <KlookLink href={zhTokyoSubwayTicket.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta} style={{ marginTop: "0.75rem", display: "inline-block" }}>
            {zhTokyoSubwayTicket.label} →
          </KlookLink>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/zh-tw/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 門票（2026）：票價、預約方式與無界比較" },
            { href: "/zh-tw/guides/attractions/teamlab-borderless-tickets", title: "teamLab 無界 門票（2026）：票價、時段預約與購票管道" },
            { href: "/zh-tw/guides/attractions/things-to-do-tokyo", title: "東京自由行景點（2026）：哪些要先訂票、哪些可以現場去" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>在櫃台多收你錢之前先訂好</h2>
            <p className={styles.ctaBannerDesc}>
              當天購票每人要另加 ¥500 服務費。線上訂的指定日期票同時省掉這筆費用和排隊，
              Klook 可以用自己的幣別結帳，電子票直接存在手機裡。
            </p>
            <KlookLink href={zhSkytreeTicket.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看東京晴空塔門票 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
