// Mirrors the English page (pages/guides/attractions/mt-fuji-day-tour-from-tokyo.tsx) as of
// 2026-11-01: same sections, tables, FAQ, Klook/GetYourGuide blocks in the same order. Tour
// contents and durations are the English page's (Klook listings checked 19 Oct 2026); no
// figure has been added, and no price is quoted because Klook blocks automated reads.
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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import GygCompare, { GygCompareButton } from "../../../../components/GygCompare";
import {
  fujiDayTour,
  fujiHakoneDayTour,
  fujiSubaruLineHakoneBusTour,
  fujiHakoneBulletTrainTour,
} from "../../../../lib/klook-links";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { gygFujiBusTours, gygFujiFromTokyo } from "../../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo";
const TITLE = "富士山一日遊（東京出發．2026）：行程怎麼選、五合目看什麼";
const DESC =
  "比較東京出發的富士山一日遊：只跑富士山，還是加箱根；Subaru Line 五合目是什麼地方、一天要多久、從海外怎麼訂。與英文版同一組資料、同一個查核日。";
const GYG_SLUG = "zh-tw-mt-fuji-day-tour-from-tokyo";

const CHECKED = dateLabel("2026-10-19", LOCALE);

const tourFuji = withKlookLocale(fujiDayTour, LOCALE, {
  title: "東京出發富士山一日遊",
  desc: "整天的巴士行程，前往富士山五合目、河口湖與忍野八海，當天晚上回到東京",
});
const tourFujiHakone = withKlookLocale(fujiHakoneDayTour, LOCALE, {
  title: "富士山＋箱根一日遊",
  desc: "富士山五合目搭配箱根火山地帶與蘆之湖，從東京出發的一日行程",
});
const tourSubaruBus = withKlookLocale(fujiSubaruLineHakoneBusTour, LOCALE, {
  title: "富士山Subaru Line五合目、蘆之湖＋箱根巴士團",
  desc: "東京出發的拼團巴士一日遊，把 Subaru Line 五合目與蘆之湖遊船排在同一天",
});
const tourBulletReturn = withKlookLocale(fujiHakoneBulletTrainTour, LOCALE, {
  title: "富士山＋箱根（可選新幹線回程）",
  desc: "同樣的五合目與蘆之湖路線，回東京時可選搭新幹線而不是巴士",
});

const tourRows = [
  {
    tour: "富士山五合目、河口湖、忍野八海＋御殿場",
    covers: "五合目，加上河口湖、湧泉村落忍野八海與一站 outlet",
    length: "整天，當天晚上回到東京",
    url: tourFuji.url,
    best: "一天能遊覽最多景點",
  },
  {
    tour: "富士山＋箱根一日遊",
    covers: "五合目、大涌谷火山谷（含纜車下行）、蘆之湖遊船",
    length: "行程標示約 11 小時",
    best: "一天跑兩個目的地",
    url: tourFujiHakone.url,
  },
  {
    tour: "富士山Subaru Line五合目、蘆之湖＋箱根拼團巴士",
    covers: "同樣的富士山加箱根組合，拼團巴士版本",
    length: "東京出發，整天",
    best: "費用較低的巴士座位",
    url: tourSubaruBus.url,
  },
  {
    tour: "富士山＋箱根（可選新幹線回程）",
    covers: "五合目、大涌谷與蘆之湖，回程可選搭新幹線",
    length: "東京出發，整天",
    best: "回程時間較短，也比較舒適",
    url: tourBulletReturn.url,
  },
];

const whoFor = [
  {
    title: "選只跑富士山的行程，如果…",
    desc: "山本身就是重點，而且你想在湖邊多停留一些時間。五合目、河口湖與忍野八海都在山的北側、彼此很近，所以只跑富士山的一天比較從容，每個景點都有時間下車遊覽，而不是一整天不斷搭巴士移動。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18l6-13 5 8 3-4 4 9z" />
        <line x1="2" y1="21" x2="22" y2="21" />
      </svg>
    ),
  },
  {
    title: "選富士山＋箱根的行程，如果…",
    desc: "你只有一天空檔，卻想一次遊覽兩個目的地。合併行程多了大涌谷火山谷、一段纜車與蘆之湖遊船——所列行程標示約 11 小時，行程雖然很長，但內容相當充實。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
        <path d="M5 12l4-7 4 6 2-2 4 5z" />
      </svg>
    ),
  },
  {
    title: "改成自己去，如果…",
    desc: "你寧願照自己的節奏走，也不介意轉電車與公車。箱根特別適合這樣——使用箱根周遊券，一張票就能搭乘整條環線的交通工具。相較之下，富士山五合目就難去得多，沒有參加一日遊或租車不太好到。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "先決定是只跑富士山，還是富士山加箱根",
    desc: "這才是真正的選擇，也決定了你這一天有多長。只跑富士山的行程把時間都放在山的北側；合併行程會少去其中一部分景點，換成箱根的火山谷與湖上遊船，代價是在巴士上坐得更久。",
  },
  {
    title: "先了解行程中的五合目實際上是什麼地方",
    desc: `富士Subaru Line五合目是這座山上公路能到的最高點——所列行程把它寫成海拔 2,300 公尺。這裡是一處觀景點，加上一區商店，不是山頂：富士山的官方登山季在 9 月 10 日結束，上方的登山道冬季封閉。查核日 ${CHECKED}。`,
  },
  {
    title: "先接受能否看到富士山取決於天氣",
    desc: "沒有任何行程能保證你看到山。富士山經常被雲層遮住，能見度通常在較涼爽、較乾燥的月份與一天中較早的時段比較好。業者不論天氣都會出團，所以評估這一天是否值得時，也要把其他停留景點考慮進去。",
  },
  {
    title: "選好日期，使用看得懂的介面與能順利付款的信用卡訂購",
    desc: "這些是指定日期、座位有限的巴士團，熱門日期會先額滿。Klook 的訂購介面容易理解，也接受海外信用卡——這點很重要，因為不少日本業者的訂票網站，在語言支援和信用卡付款方面都不太方便。",
  },
  {
    title: "想清楚你要怎麼到集合地點",
    desc: "東京出發的團大多清晨從新宿或東京車站附近出發。先確認集合地點在哪裡，再安排當天要搭乘的首班地鐵或 JR 列車——錯過巴士出發，是補救不了的失誤。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "東京出發的富士山一日遊值得嗎？",
    a: "對大多數只有一天空檔的旅客來說，值得——主要是因為替代方案比看起來難。富士Subaru Line五合目搭電車到不了，自己去就得轉公車或租車，而山周邊的景點又很分散。參加巴士團，一次預訂就能包含這些景點。要注意的是天氣：山經常在雲裡，沒有任何行程能保證你看到它。",
  },
  {
    q: "富士Subaru Line五合目是什麼？",
    a: `它是富士山上公路能到達的最高點，也是幾乎每一個東京出發的一日遊都會停的地方——所列 Klook 行程把它寫成海拔 2,300 公尺。它是一個有商店與餐廳的觀景點，不是山頂。富士山的官方登山季在 9 月 10 日結束，五合目以上的登山道冬季封閉，所以這類一日遊是前往山腰觀光，而不是登山。查核日 ${CHECKED}。`,
  },
  {
    q: "東京出發的富士山一日遊要多久？",
    a: `請預留一整天。所列的富士山加箱根合併行程標示約 11 小時，只跑富士山的行程也是當天晚上才回到東京。清晨從東京市中心出發。如果你的行程很緊，要知道這類一日遊會占用整整一天，並不是半天就能結束的行程。行程時間依 ${CHECKED} 的標示。`,
  },
  {
    q: "該選只跑富士山，還是富士山加箱根？",
    a: "只跑富士山的行程停留在山的北側，通常會去河口湖與湧泉村落忍野八海，這樣的一天比較不趕，每一站都有實際的停留時間。富士山加箱根的行程多了大涌谷火山谷、一段纜車與蘆之湖遊船，但一天更長，也需要花更多時間搭車移動。如果你只有這一天空檔，選合併行程；如果你寧願少看幾個地方但看得仔細，選只跑富士山。",
  },
  {
    q: "多雲的話，行程中看得到富士山嗎？",
    a: "不太能指望。富士山會自己形成天氣，相當多的時間都在雲裡，在較溫暖、較潮濕的月份尤其如此。能見度一般在一年中較涼爽、較乾燥的時期與一天中較早的時段比較好。行程不論天氣都會出團，所以合理的做法是：選擇一個即使只看其他停留點（湖泊、火山谷或遊船）也願意參加的行程。",
  },
  {
    q: "不參加一日遊，可以自己當天來回富士山嗎？",
    a: "你可以自己搭高速巴士或電車到河口湖一帶，從那裡在開放季節有公車開上 Subaru Line。這需要規劃，班次不多，如果沒算好回程班次，還可能回不了東京。兩者之中，箱根比較適合自行安排，因為箱根周遊券一張票就涵蓋電車、登山纜車、空中纜車、巴士與遊船的整個環線。",
  },
  {
    q: "富士山一日遊需要 JR Pass 嗎？",
    a: "不需要。東京出發的一日遊搭的是巴士，車資已含在行程價格裡——鐵路周遊券在這段路上幫不上忙。唯一的例外是提供新幹線回程的行程，周遊券可能涵蓋那一段。如果你在考慮整趟旅程要不要買鐵路周遊券，我們的英文版 JR Pass 攻略計算了回本門檻。",
  },
  {
    q: "東京的富士山一日遊從哪裡出發？",
    a: "大多清晨從新宿或東京車站一帶出發；確切的集合地點寫在你預訂的行程頁上。訂的時候就確認，並以它為準安排當天第一段交通，因為巴士不會等人。如果集合地點位於東京地下鐵或都營線沿線，東京地鐵通票可以使用，但不含 JR。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-tw/guides/attractions", label: "日本景點門票" },
  { label: "富士山一日遊（東京出發）" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhMtFujiDayTourPage({ updated }: { updated: PageUpdated }) {
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
            富士山一日遊（東京出發．2026）： <br />行程怎麼選、實際會看到什麼
          </h1>
          <p className={styles.heroSubtitle}>
            每一個行程都會停 Subaru Line 五合目。差別在於這一天剩下的時間給了富士山還是箱根——
            以及你願意花多少時間搭巴士。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "只跑富士山 vs 富士山＋箱根", "五合目是什麼"].map((t) => (
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
                <p className={styles.verdictStatLabel}>一天長度</p>
                <p className={styles.verdictStatValue}>最長約 11 小時</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>主要停留</p>
                <p className={styles.verdictStatValue}>Subaru Line 五合目</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>出發</p>
                <p className={styles.verdictStatValue}>清晨，東京市中心</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>能看到富士山嗎？</p>
                <p className={styles.verdictStatValue}>永遠不保證</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>結論：</strong>如果你只有這一天空檔，選富士山加箱根的行程，一天就能遊覽兩個目的地。
              如果你寧願少看幾個地方但看得仔細，選含河口湖與忍野八海的只跑富士山行程。不論哪一種，這類行程都需要約 11 小時，而山可能在雲裡——請挑一個就算沒看到山、其他停留點你也會喜歡的行程。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tourFujiHakone.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看富士山一日遊 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygFujiFromTokyo} />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>為什麼幾乎每個人都參加一日遊</h2>
          <p className={styles.bodyText}>
            富士山距離東京約兩小時車程，但旅客真正想去的地方，實際上無法搭電車抵達。五合目沒有車站：
            富士Subaru Line是一條收費公路，自己上去就得從河口湖一帶轉公車，而如果太晚出門，就會趕不上那班公車。
          </p>
          <p className={styles.bodyText}>
            這也是富士山周邊一日遊行程這麼多的原因，而這些行程乍看之下也都非常相似。它們全都停五合目。
            差別在於剩下那六個小時做什麼——這才是比較各個行程時應該看的部分。
          </p>
          <p className={styles.bodyText}>
            河口湖周邊的情況就不同了：五重塔、湖畔與忍野八海都能從新宿搭直達電車抵達。我們的{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo">富士山自助一日遊攻略（英文）</Link>
            介紹了這條路線、Mt. Fuji Pass 的價格，以及不搭巴士團要怎麼安排這一天。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>東京出發的四種富士山一日遊</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["行程", "內容", "長度", "最適合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider}>
                        <KlookLink href={row.url} target="_blank" rel={KLOOK_REL} className={styles.tdLink}>
                          {row.tour}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            內容與時間依 {CHECKED} Klook 行程頁上的描述。這裡不列價格：Klook 價格依日期而變——請打開行程頁查看你那天的即時價格。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一種一天</span>
          <h2 className={styles.sectionTitle}>哪一種安排適合你？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            如果你最感興趣的是箱根那一半，箱根也是最適合自行安排的那一半——請看我們的{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">箱根一日遊攻略（英文）</Link>
            ，裡面有周遊券價格與整個環線怎麼串起來。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>富士山一日遊怎麼訂</h2>
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
            鐵路方面——周遊券到底值不值得買，以及部分行程的新幹線回程怎麼搭配——請看我們的{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass 攻略（英文）</Link>與{" "}
            <Link href="/guides/transport/tokyo-transportation">東京交通攻略（英文）</Link>。
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="上面比較的四個行程"
          intro="四個行程都從東京出發、都會停 Subaru Line 五合目。打開行程頁，查看你那天的價格與出發地點。"
          tours={[tourFujiHakone, tourFuji, tourSubaruBus, tourBulletReturn]}
        />

        <GygCompare
          slug={GYG_SLUG}
          heading="GetYourGuide 上的富士山一日遊"
          intro="拼團巴士在固定日期只有固定的座位數，所以安排富士山這一天，真正該問的不是哪個行程最好，而是哪個行程在你想去的日期還有名額。GetYourGuide 上則是其他業者的行程——如果上面四個都額滿了，先從這裡找，先別急著放棄富士山行程。"
          listings={[gygFujiFromTokyo, gygFujiBusTours]}
        />

        <Related
          items={[
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "河口湖一日遊（東京出發．2026）：路線、車資與一天能排多少（英文）" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "富士急樂園門票（2026）：Free Pass 價格、Q Pack 與交通方式（英文）" },
            { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "箱根一日遊（東京出發．2026）：周遊券價格 vs 一日遊行程（英文）" },
            { href: "/zh-tw/guides/attractions/tokyo-skytree-tickets", title: "東京晴空塔門票（2026）：票價、350 公尺與 450 公尺觀景台怎麼選" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "富士山自助一日遊（東京出發．2026）：自己怎麼去（英文）" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "東京地鐵通票（2026）：24、48 還是 72 小時，值得買嗎？（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略（2026）：價格、值不值得與購買方式（英文）" },
            { href: "/zh-tw/guides/attractions/shibuya-sky-tickets", title: "澀谷SKY 門票（2026）：票價、最佳時段與預約方式" },
            { href: "/guides/transport/tokyo-transportation", title: "東京交通攻略（2026）：電車、地鐵與 IC 卡（英文）" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>只有一天空檔，也能遊覽兩個目的地</h2>
            <p className={styles.ctaBannerDesc}>
              富士山加箱根的行程把 Subaru Line 五合目和大涌谷、蘆之湖遊船排在同一天。
              Klook 的訂購介面容易理解，也接受海外信用卡。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={tourFujiHakone.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看富士山一日遊 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygFujiFromTokyo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
