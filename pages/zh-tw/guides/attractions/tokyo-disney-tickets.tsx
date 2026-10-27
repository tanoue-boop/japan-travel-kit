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
import { zhFujiDayTour, zhTokyoDisney, zhTokyoSightseeingBusTour } from "../../../../lib/klook-links-zh-tw";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-tw/guides/attractions/tokyo-disney-tickets";
const TITLE = "東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選";
const DESC =
  "東京迪士尼門票 2026：每張票都指定日期、現場完全不賣票。海外信用卡刷不過時怎麼買，" +
  "以及迪士尼樂園與迪士尼海洋該選哪一個。內容與英文版同一組事實。";

// Facts and figures are the English guide's, unchanged. Tokyo Disney publishes no
// fixed yen price — the passport is variable, date-based — so this page quotes the
// same indicative "from about $55" the English page does and nothing more.
const ticketRows = [
  {
    ticket: "一日護照（目前販售中）",
    what: "指定日期，進入其中一座園區（樂園或海洋）",
    price: "約 $55 起，依日期浮動——訂票時請確認",
  },
  {
    ticket: "多日票與其他護照",
    what: "撰稿時並未一般開賣——販售狀況會變動",
    price: "訂票時查看即時供應狀況",
  },
  {
    ticket: "現場／門口票",
    what: "不販售——所有票都指定日期、必須事先購買",
    price: "無此選項",
  },
];

const parkRows = [
  {
    park: "東京迪士尼樂園",
    style: "經典的城堡式園區：遊行、煙火、闔家同樂的設施",
    suits: "第一次來、帶年紀小的孩子、經典迪士尼迷",
    note: "去過其他迪士尼的話，動線會很熟悉",
  },
  {
    park: "東京迪士尼海洋",
    style: "航海與水主題；全世界只有東京有，風格偏成人；園內供酒",
    suits: "成人、情侶、想要不一樣體驗的回訪者",
    note: "正在慶祝 25 週年（2026 年 4 月～2027 年 3 月）",
  },
];

const whoFor = [
  {
    title: "選東京迪士尼樂園的話…",
    desc: "你帶著年紀較小的孩子，或這是你第一次去任何一座迪士尼。園區沿用經典的城堡式配置，有白天的遊行，重心放在闔家同樂的設施——輕鬆、熟悉的一天。",
  },
  {
    title: "選東京迪士尼海洋的話…",
    desc: "你想要在別的迪士尼度假區拿不到的東西，而且你是成人或沒有帶小小孩。迪士尼海洋風格更偏成人，主題港灣是東京獨有的，而且——和樂園不同——園內供酒。",
  },
  {
    title: "2026 年去？注意週年活動",
    desc: "東京迪士尼海洋正在慶祝 25 週年，期間為 2026 年 4 月到 2027 年 3 月。週年期通常人更多、熱門日期更快賣完，所以指定日期的票請盡早訂。",
  },
];

const steps = [
  {
    title: "先決定園區與確切日期",
    desc: "東京迪士尼的每張票都指定日期——你要選好要去的那一天以及要進的園區，而那張票也只在那天有效。買之前先決定樂園還是海洋，因為一日護照只含一座園區，不是兩座。",
  },
  {
    title: "提早訂，現場沒有票",
    desc: "因為門口不賣票、每張票又綁定特定日期，熱門日期可能在數週到數月前就賣完。把訂票當成出發前要做的事，不是到了才處理。",
  },
  {
    title: "海外信用卡有問題就用 Klook",
    desc: "東京迪士尼度假區官網經常拒絕或封鎖海外發行的信用卡。Klook 是官方授權的售票通路，可以用海外卡、介面看得懂，這也是許多海外旅客選它的原因。",
  },
  {
    title: "把電子票 QR Code 綁進官方 App",
    desc: "購票後你會拿到電子票 QR Code。你可以把那個 QR 綁進東京迪士尼度假區官方 App，當天的園內功能也在那裡操作。出發前先設定好，入園時省時間。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "東京迪士尼門票一定要提前買嗎？",
    a: "是。東京迪士尼度假區門口不賣票——所有票都指定日期，也就是購買時就要選好日期與園區。熱門日期可能在數週到數月前賣完，所以提前訂基本上是必要的，而不是選項。",
  },
  {
    q: "可以用海外信用卡買東京迪士尼門票嗎？",
    a: "在東京迪士尼度假區官網上，常常不行——官網經常拒絕或封鎖海外發行的信用卡，這是海外旅客常見的困擾。普遍的做法是透過 Klook：它是官方授權的售票通路，接受海外卡、介面看得懂，並發送可以綁進東京迪士尼度假區官方 App 的電子票 QR Code。",
  },
  {
    q: "東京迪士尼樂園和迪士尼海洋該選哪一個？",
    a: "一日護照只含一座園區，所以通常只能選一邊。東京迪士尼樂園是經典的城堡式園區——遊行與闔家同樂的設施，適合第一次來的人與帶小小孩的家庭。東京迪士尼海洋是航海主題，全世界只有東京有，風格偏成人，而且園內供酒；它也正在慶祝 2026 年 4 月到 2027 年 3 月的 25 週年。第一次帶小孩去，樂園是安全牌；想要與眾不同，選海洋。",
  },
  {
    q: "現在有哪些票種在賣？",
    a: "撰稿時，一般開賣的通常是一日護照。它採依日期浮動的定價——概略來說約 $55 起——但金額會隨日期與需求變動，所以請在訂票時確認你那天的即時價格。其他護照票種是否販售會依期間而不同，請查看當下的供應狀況。",
  },
  {
    q: "東京迪士尼一日護照多少錢？",
    a: "定價是浮動的、依日期而定，所以同一張護照在熱門日期會比清閒日期貴。概略來說約 $55 起，但請只把它當成「起」的參考值——2026 年的票價可能調整，訂票時請確認你那個特定日期的實際金額。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "東京迪士尼門票" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhTokyoDisneyTicketsPage({ updated }: { updated: PageUpdated }) {
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
            東京迪士尼門票（2026）：<br />樂園與海洋怎麼買、怎麼選
          </h1>
          <p className={styles.heroSubtitle}>
            每張票都指定日期、現場完全不賣票，而官網還經常拒絕海外信用卡。
            這頁說明怎麼買，以及兩座園區怎麼選。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "指定日期票", "海外卡可走 Klook"].map((t) => (
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
                <p className={styles.verdictStatLabel}>目前販售</p>
                <p className={styles.verdictStatValue}>一日護照</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>票價（參考）</p>
                <p className={styles.verdictStatValue}>約 $55 起，浮動</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>現場票</p>
                <p className={styles.verdictStatValue}>沒有——只有指定日期票</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>海外信用卡？</p>
                <p className={styles.verdictStatValue}>用 Klook（官方授權通路）</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>先選園區與日期，然後提前把一日護照訂下來——現場不賣票，熱門日期會賣完。
              如果官網拒絕你的海外信用卡，Klook 是官方授權的售票通路，接受海外卡，並發送可以綁進官方 App 的 QR Code。
            </p>
            <KlookLink href={zhTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看東京迪士尼門票 →
            </KlookLink>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>2026 年東京迪士尼門票怎麼運作</h2>
          <p className={styles.bodyText}>
            東京迪士尼度假區位在東京東邊的浦安，由兩座獨立的園區組成：<strong>東京迪士尼樂園</strong>與
            <strong>東京迪士尼海洋</strong>。買票前最重要的一件事是：門票<strong>指定日期</strong>——
            你選好確切的那一天與要進的園區，而那張票只在那天有效。
          </p>
          <p className={styles.bodyText}>
            而且<strong>門口完全不賣票</strong>。這表示你不能當天直接去現場買，而因為每張票綁定日期，
            熱門日期可能在數週到數月前就賣完。目前一般開賣的通常是一日護照，採依日期浮動的定價——
            所以同一張護照在熱門日期會比較貴。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票種</span>
          <h2 className={styles.sectionTitle}>東京迪士尼票種一覽</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票種", "內容", "定價"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            定價浮動且依日期而定（2026 年，可能調整——訂票時請確認）。一日護照「約 $55 起」只是參考值；
            請在結帳時查你那個特定日期與園區的即時價格。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>樂園 vs 海洋</span>
          <h2 className={styles.sectionTitle}>該選哪一座園區？</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["園區", "整體性格", "最適合", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parkRows.map((row) => (
                    <tr key={row.park}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.park}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.style}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.suits}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            一日護照只含一座園區，所以大多數人會選一邊。以上是幫你做決定的概括描述——兩座園區都很大，
            都是整天的行程。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>適合誰</span>
          <h2 className={styles.sectionTitle}>哪一座園區適合你？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            不管選哪一座，都請先規劃路線——度假區離東京市中心要搭一段電車。抵達當天的機場段可以參考我們的{" "}
            <Link href="/zh-tw/guides/transport/tokyo-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              成田機場到東京市區交通攻略
            </Link>
            。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>東京迪士尼門票怎麼買</h2>
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
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>海外信用卡</span>
          <h2 className={styles.sectionTitle}>為什麼很多旅客改走 Klook</h2>
          <p className={styles.bodyText}>
            東京迪士尼度假區官網是主要的購票管道，但它經常拒絕或封鎖海外發行的信用卡——這是國際旅客長年的頭痛。
            遇到這種情況，有一個直接的替代方案。
          </p>
          <p className={styles.bodyText}>
            <strong>Klook 是東京迪士尼度假區官方授權的售票通路。</strong>它接受海外卡、介面看得懂，
            並發送可以綁進東京迪士尼度假區官方 App 的電子票 QR Code。這個組合——支援海外卡，加上可以綁進 App 的 QR——
            就是它成為海外旅客主流做法的原因。如果你同時在安排東京其他行程，我們的{" "}
            <Link href="/zh-tw/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              澀谷SKY 門票攻略
            </Link>
            {" "}講的是另一個走售票平台比較順的預訂。
          </p>
        </section>

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>同一座城市的一日遊</span>
          <h2 className={styles.sectionTitle}>非園區的那一天怎麼排</h2>
          <p className={styles.bodyText}>
            去園區就是一整天，所以多數人是把迪士尼排進東京這一週、而不是把一週排進迪士尼。下面兩個行程可以填掉
            非園區的那一天，而且和門票在同一個 Klook 帳號裡結帳。
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <KlookLink href={zhFujiDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看{zhFujiDayTour.label} →
            </KlookLink>
            <KlookLink href={zhTokyoSightseeingBusTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看{zhTokyoSightseeingBusTour.label} →
            </KlookLink>
          </div>
        </section>

        <Related
          items={[
            { href: "/zh-tw/guides/attractions/usj-tickets-express-pass", title: "日本環球影城門票與快速通關（2026）：該買哪一種" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/zh-tw/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets 門票（2026）：票價、預約方式與無界比較" },
            { href: "/zh-tw/guides/attractions/things-to-do-tokyo", title: "東京自由行景點（2026）：哪些要先訂票、哪些可以現場去" },
            { href: "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日遊（東京出發．2026）：行程怎麼選、五合目看什麼" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先把東京迪士尼的日期鎖住</h2>
            <p className={styles.ctaBannerDesc}>
              現場不賣票，熱門日期會賣完，所以請提前訂。Klook 是官方授權的售票通路，接受海外信用卡，
              並發送可以綁進官方 App 的 QR Code。
            </p>
            <KlookLink href={zhTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看東京迪士尼門票 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
