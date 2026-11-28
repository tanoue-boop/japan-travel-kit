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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  jrHokkaidoRailPass,
  newChitoseAirportTransfers,
  newChitoseSapporoStayAreas,
  newChitoseSapporoTripPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/new-chitose-airport-to-sapporo) section by section as
// of 2026-11-28 (task jtk-20261128-TR03): same sections, table, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: 新千歲機場到札幌 — the phrase Taiwan / Hong Kong results use (livejapan.com/zh-tw,
// funliday.com, trvlogue.com/zh-Hant), with 快速 Airport as JR Hokkaido's Chinese page and those
// guides name the train.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/transport/new-chitose-airport-to-sapporo";
const TITLE = "新千歲機場到札幌 2026：JR 快速 Airport、巴士票價與時間";
const H1 = "新千歲機場到札幌 2026：電車與巴士比較、票價與時間";
const DESC =
  "新千歲機場到札幌：JR 快速 Airport 37 分鐘 ¥1,230、末班車 23:21，機場巴士約 70 分鐘 ¥1,500，計程車跳表規則與下雪天怎麼走。";

const CHECKED = dateLabel("2026-11-28", LOCALE);
const JRP_CHECKED = dateLabel("2026-11-03", LOCALE);

const JR_AIRPORT_URL = "https://www.jrhokkaido.co.jp/airport/";
const JR_EN_URL = "https://www.jrhokkaido.co.jp/global/english/travel/airport.html";
const JR_FARE_URL = "https://www.jrhokkaido.co.jp/global/english/ticket/regular/";
const BUS_URL = "https://www.chuo-bus.co.jp/feature/airport";
const HOKUTO_URL = "https://www.hokto.co.jp/sapporo-chitose/";
const RENEWAL_URL = "https://www.hokto.co.jp/information/49138/";
const TAXI_URL = "https://www.hokto.co.jp/hire-chitose/";
const CTS_BUS_URL = "https://www.hokkaido-airports.com/en/new-chitose/access/bus/";

const TRANSFERS_URL = klookFor(newChitoseAirportTransfers.url, LOCALE);
const RAIL_PASS_URL = klookFor(jrHokkaidoRailPass.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>{label}</a>
);

type ModeRow = { mode: string; time: string; fare: string; service: string; snow: string; bags: string };

const modeRows: ModeRow[] = [
  {
    mode: "多數人的首選：JR 快速 Airport",
    time: "到札幌 37 分鐘（特別快速最快 33 分鐘）",
    fare: "¥1,230；指定席 u-Seat 車廂 ¥2,230",
    service: "9:00–16:00 每小時 6 班；機場出發首班 6:38、末班 23:21",
    snow: "不走道路，不受塞車影響；JR 停駛時，JR 北海道的機場頁面有停駛時的替代交通說明",
    bags: "最多 2 件，每件三邊合計 250 公分、30 公斤以內；需自行搬上車",
  },
  {
    mode: "機場巴士（北都交通、北海道中央巴士）",
    time: "到札幌站前約 70 分鐘，途中停靠薄野與大通",
    fare: "¥1,500（兒童 ¥750）",
    service: "國內線航廈出發 8:40–22:55，約每 10–20 分鐘一班；2026 年 12 月 11 日起每天 83 班",
    snow: "與汽車走同樣的道路；業者表示所需時間僅供參考，並提醒可能因塞車延誤",
    bags: "行李箱放在行李艙；不接受預約",
  },
  {
    mode: "計程車招呼站",
    time: "直達門口；與巴士一樣走道路",
    fare: "跳表：起跳 1.4 公里 ¥740，之後每 293 公尺 ¥100；冬季加成 20%、夜間加成 20%；過路費另計",
    service: "兩座航廈都有招呼站，任何時段都能搭乘",
    snow: "走同樣的道路；冬季加成期間為 12 月 10 日至 3 月 26 日",
    bags: "放在後車廂；旅行車與 9 人座廂型車需另外要求",
  },
  {
    mode: "預約包車（Klook）",
    time: "直達門口",
    fare: "以車輛計價，您的日期價格請見商品頁",
    service: "出發前預約，司機配合航班接機",
    snow: "與巴士走同樣的道路",
    bags: "帶滑雪板袋請選擇合適的車型",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "新千歲機場到札幌怎麼去？",
    a: `從國內線航廈正下方的車站搭 JR 快速 Airport：到札幌站 37 分鐘、¥1,230，白天每小時 6 班，末班車 23:21。機場巴士約 70 分鐘、¥1,500，停靠薄野、大通與札幌站。${CHECKED}確認。`,
  },
  {
    q: "從新千歲機場出發，電車和巴士哪個比較好？",
    a: "重視速度或遇到下雪天，選電車：比巴士快約半小時、便宜 ¥270，也不會卡在車陣中。如果飯店就在薄野或大通的巴士站附近，或行李太重搬不上車，則選巴士，行李箱會放進行李艙。",
  },
  {
    q: "到札幌可以用 JR Pass 或北海道鐵路周遊券嗎？",
    a: "可以。兩者都適用於 JR 北海道的快速 Airport。北海道鐵路周遊券事先購買 5 日券 ¥22,000 起，只有行程中也要搭 JR 前往小樽、旭川、函館或二世古方向時才划算；只搭機場這一段是 ¥1,230。機場巴士由民營公司經營，兩種周遊卡都不適用。",
  },
  {
    q: "新千歲機場到札幌的末班車是幾點？",
    a: `23:21 的特別快速 Airport。這是 JR 北海道為晚到航班開行的班次，即使航班延誤也會準時發車。國內線航廈出發的機場巴士末班車是 22:55。之後只能搭跳表計程車，或事先預約的包車。${CHECKED}確認。`,
  },
  {
    q: "新千歲機場到札幌搭計程車要多少錢？",
    a: "沒有任何業者公布固定車資：千歲地區的計程車一律跳表，起跳 1.4 公里 ¥740，之後每 293 公尺 ¥100；12 月 10 日至 3 月 26 日加成 20%，22:00–5:00 再加成 20%，過路費另計。在 Klook 預約的包車則在出發前就以車輛計價確定費用。",
  },
];

const tripPrepItems = [
  withKlookLocale(newChitoseSapporoTripPrep[0], LOCALE, {
    label: "札幌站周邊飯店",
    ctaLabel: "查看札幌站飯店 →",
    why: "多數快速 Airport 的終點站，也是機場巴士的停靠站。不論搭哪一種，帶著行李箱在雪地上走的距離都最短。",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[1], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "電車時刻、巴士乘車處編號、走到飯店的路線，從走出新千歲機場入境大廳的那一刻起都需要行動數據。",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[2], LOCALE, {
    label: "新千歲機場接送（包車與共乘）",
    ctaLabel: "查看新千歲機場接送 →",
    why: "以車輛計價、直達飯店門口。適合帶滑雪板袋、全家出遊，或在 23:21 末班車之後才抵達的旅客。",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[3], LOCALE, {
    label: "JR 北海道鐵路周遊券",
    ctaLabel: "查看 JR 北海道周遊卡價格 →",
    why: "適用於快速 Airport，但單程只要 ¥1,230，行程中還要去小樽、旭川、函館或搭電車前往二世古時，周遊卡才划算。",
  }),
];

const stayAreas = [
  withKlookLocale(newChitoseSapporoStayAreas[0], LOCALE, {
    area: "札幌站",
    why: "快速 Airport 的終點站，機場巴士也停靠札幌站前。住在車站附近，就不用帶著行李箱再轉一段車。",
  }),
  withKlookLocale(newChitoseSapporoStayAreas[1], LOCALE, {
    area: "薄野",
    why: "機場巴士會先停南 3 條薄野，再到大通與札幌站；2026 年 12 月 11 日起，回程還有薄野直達機場、約 62 分鐘的巴士。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "新千歲機場到札幌" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map((c, j) => (
                  <td key={j} className={j === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {c}
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

const note = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function ZhTwNewChitoseAirportToSapporoPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG[LOCALE] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            從新千歲機場到札幌市中心的 JR 快速 Airport、機場巴士、計程車與預約包車：票價、首班與末班車，以及下雪天該搭哪一種。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "票價來自 JR 北海道與巴士業者", "Klook 價格請依日期查詢"].map((t) => (
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
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最快</p>
                <p className={styles.verdictStatValue}>JR，37 分鐘，¥1,230</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>行李放行李艙</p>
                <p className={styles.verdictStatValue}>巴士，約 70 分鐘，¥1,500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>末班車</p>
                <p className={styles.verdictStatValue}>電車 23:21（巴士 22:55）</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>新千歲機場到札幌</strong>，搭 <strong>JR 快速 Airport</strong>（機場快速列車，Rapid Airport）到札幌站只要 <strong>37 分鐘</strong>、<strong>¥1,230</strong>，白天每小時 6 班，末班車 <strong>23:21</strong>。<strong>機場巴士</strong>到札幌站前約 <strong>70 分鐘</strong>、<strong>¥1,500</strong>，途中停靠薄野與大通，行李箱放在行李艙。計程車一律跳表，起跳 1.4 公里 ¥740，12 月 10 日至 3 月 26 日另加 20%；想以固定價格直達飯店門口，請在出發前預約包車。資料來自 JR 北海道、北都交通與北海道中央巴士，{CHECKED}確認。
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              要直接前往滑雪場？請參考
              <Link href="/guides/transport/sapporo-to-niseko-transfer" style={linkStyle}>
                冬季札幌到二世古（英文）
              </Link>
              ，有從機場出發的滑雪巴士。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                新千歲機場接送 →
              </KlookLink>
              <KlookLink href={RAIL_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                JR 北海道鐵路周遊券 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>所有交通方式</span>
          <h2 className={styles.sectionTitle}>新千歲機場到札幌怎麼去？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            多數旅客搭 JR 快速 Airport 即可：從國內線航廈正下方的車站出發，37 分鐘、¥1,230。下表每種交通方式一行，列出成人單程票價；第一行就是建議的答案。
          </p>
          <SimpleTable
            head={["交通方式", "所需時間", "成人票價", "班次", "下雪天", "行李"]}
            rows={modeRows.map((r) => [r.mode, r.time, r.fare, r.service, r.snow, r.bags])}
          />
          <p className={styles.bodyText} style={note}>
            最後確認：2026-11-28。資料來源：{ext(JR_AIRPORT_URL, "JR 北海道快速 Airport")}、{ext(JR_EN_URL, "JR 北海道機場交通資訊（英文）")}、{ext(JR_FARE_URL, "JR 北海道票價")}、{ext(BUS_URL, "北海道中央巴士機場巴士時刻表")}、{ext(HOKUTO_URL, "北都交通札幌市中心線")}、{ext(TAXI_URL, "北都交通千歲計程車車資")}、{ext(CTS_BUS_URL, "新千歲機場巴士乘車處")}。巴士時刻以國內線航廈（ANA 側）為準，國際線航廈站牌約晚 6 分鐘。6–11 歲兒童搭 JR 為半價。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>電車或巴士</span>
          <h2 className={styles.sectionTitle}>從新千歲機場出發，電車和巴士哪個比較好？</h2>
          <p className={styles.bodyText}>
            除非行李讓您搬不上電車，否則選電車。快速 Airport 比巴士快約半小時、便宜 ¥270，而且走鐵軌而不是高速公路，下雪的傍晚特別有差別。6 節車廂中有 5 節可直接刷 IC 卡通過驗票閘門搭乘、不必買票，4 號車廂是指定席 u-Seat，另加 ¥1,000（無票券乘車 ¥800），有放大型行李箱的空間。JR 北海道允許每人攜帶 2 件、每件三邊合計 250 公分且 30 公斤以內的行李上車。如果行李箱搬不動，巴士較合適，行李會放進行李艙；飯店在薄野或大通公園附近時也適合搭巴士，因為巴士會先停這兩站，再到札幌站前。兩家業者都表示巴士所需時間僅供參考，可能因交通狀況拉長；北都交通也在 2026 年 11 月 22 日公告，加強車輛檢修期間部分班次可能停駛。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              改搭包車 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>12 月 11 日起</span>
          <h2 className={styles.sectionTitle}>今年冬天機場巴士有什麼改變？</h2>
          <p className={styles.bodyText}>
            班次變多、路線更簡單，票價不變。2026 年 12 月 11 日起，北都交通與中央巴士把札幌市中心線拆成兩條：機場出發每天 72 班的<strong>札幌站前、薄野</strong>路線，以及每天 11 班的<strong>市中心飯店循環</strong>路線。飯店循環線約在 12:30–19:30 從機場發車，停靠京王廣場飯店、Grand Mercure 等飯店與中島公園。往機場方向則新增經札幌南 IC、約 1 小時 2 分鐘的<strong>薄野直達</strong>班次，因為冬天常有巴士在薄野就已客滿、後面站牌的乘客上不了車。成人票價維持 ¥1,500（清田地區站牌 ¥1,400），可用現金、感應式信用卡或 PayPay 付款，不接受預約。
          </p>
          <p className={styles.bodyText} style={note}>
            最後確認：2026-11-28。資料來源：{ext(RENEWAL_URL, "北都交通新聞稿（2026 年 10 月 21 日）")}與{ext(BUS_URL, "北海道中央巴士時刻表")}。
          </p>
        </section>

        <KlookTripPrep
          label="抵達前先訂好"
          heading="飛往新千歲機場前要先訂什麼？"
          intro="札幌站附近的住宿、行動數據，以及帶滑雪板袋或晚到時的包車。Klook 價格依日期而異，請打開商品頁查看您日期的價格。"
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>鐵路周遊券</span>
          <h2 className={styles.sectionTitle}>到札幌可以用 JR Pass 或北海道鐵路周遊券嗎？</h2>
          <p className={styles.bodyText}>
            可以。兩者都適用於快速 Airport，因為它是 JR 北海道的列車；但都不適用於民營公司經營的機場巴士。划不划算則要另外計算。
            <Link href="/guides/transport/hokkaido-rail-pass" style={linkStyle}>
              北海道鐵路周遊券（英文）
            </Link>
            事先購買 5 日券 ¥22,000（JR 北海道，{CHECKED}），而機場單程是 ¥1,230，所以要有較長的 JR 行程才划算：小樽、旭川、函館，或經小樽搭電車前往二世古方向。全國版 JAPAN RAIL PASS 7 日券 ¥53,000（{JRP_CHECKED}），只有同一週還要在本州搭新幹線時才值得考慮。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={RAIL_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR 北海道鐵路周遊券 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>晚到與下雪天</span>
          <h2 className={styles.sectionTitle}>班機晚到或下雪時怎麼辦？</h2>
          <p className={styles.bodyText}>
            先記住兩個時間：國內線航廈出發的機場巴士末班車是 <strong>22:55</strong>，電車末班車特別快速 Airport 是 <strong>23:21</strong>。JR 北海道為晚到航班開行這班車，但表示無論航班是否延誤都會準時發車。下雪時電車較安全，因為不走道路；若 JR 停駛，機場頁面會說明替代交通方式。末班車之後，只能在招呼站搭跳表計程車（12 月 10 日起冬季加成 20%，22:00–5:00 再加成 20%，過路費另計），或搭事先預約的包車。2 月
            <Link href="/zh-tw/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>
              札幌雪祭
            </Link>
            期間市區住宿很滿，請先訂好飯店；若要帶著滑雪板袋直接前往雪場，
            <Link href="/guides/transport/sapporo-to-niseko-transfer" style={linkStyle}>
              二世古接送（英文）
            </Link>
            也從同一座機場出發。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              預約新千歲機場包車 →
            </KlookLink>
          </div>
        </section>

        <KlookStayAreas
          heading="抵達後住札幌哪一區？"
          intro="電車的終點是札幌站，巴士停靠薄野、大通與札幌站。空房與價格依日期而異，每個區域都連到 Klook 的飯店搜尋。"
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>下一步</span>
          <h2 className={styles.sectionTitle}>離開機場之後怎麼安排？</h2>
          <p className={styles.bodyText}>
            市區三天的安排請見
            <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>
              札幌 3 天行程（英文）
            </Link>
            ，環島一週請見
            <Link href="/zh-tw/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>
              北海道 7 天行程
            </Link>
            。從札幌飯店出發的滑雪一日遊請見
            <Link href="/guides/attractions/sapporo-ski-day-trip" style={linkStyle}>
              札幌滑雪一日遊（英文）
            </Link>
            ；想把行李箱先寄走、不用一路拖著，請見
            <Link href="/guides/transport/japan-luggage-delivery" style={linkStyle}>
              日本行李寄送（英文）
            </Link>
            。
          </p>
        </section>

        <BookingEsimCard lead="電車時刻、巴士乘車處與飯店地圖都要用到網路，抵達新千歲機場前先準備好行動數據。" />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/transport/sapporo-to-niseko-transfer", title: "冬季札幌到二世古：滑雪巴士、電車與接送（英文）" },
            { href: "/guides/attractions/sapporo-3-day-itinerary", title: "札幌 3 天行程（英文）" },
            { href: "/guides/transport/hokkaido-rail-pass", title: "北海道鐵路周遊券（2026）：價格與是否划算（英文）" },
            { href: "/zh-tw/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭" },
            { href: "/zh-tw/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 天行程" },
            { href: "/guides/attractions/sapporo-ski-day-trip", title: "札幌滑雪一日遊（英文）" },
            { href: "/guides/transport/japan-luggage-delivery", title: "日本行李寄送（英文）" },
            { href: "/zh-tw", title: "繁體中文版所有攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>新千歲機場到札幌，一趟直達</h2>
            <p className={styles.ctaBannerDesc}>
              搭快速 Airport，或為滑雪板袋與晚到航班預約包車，再把第一晚的住宿訂在札幌站附近。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                新千歲機場接送 →
              </KlookLink>
              <KlookLink href={stayAreas[0].url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                札幌站飯店 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
