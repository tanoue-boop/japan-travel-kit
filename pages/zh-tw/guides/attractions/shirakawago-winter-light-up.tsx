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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import {
  japanWinterStayAreas,
  klookEsim,
  shirakawagoLightUpTripPrep,
  shirakawagoTakayamaKanazawaDayTour,
  shirakawagoWinterLightUpTakayamaNagoyaBusTour,
  takayamaShirakawagoNagoyaDayTrip,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { shirakawagoLightUp2027NagoyaTour } from "../../../../lib/klook-links-winter-hub";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/shirakawago-winter-light-up) section by section as
// of 2026-11-26 (task-jtk-20261126-TR03): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (shirakawa-go.gr.jp, nouhibus.co.jp
// and hokutetsu.co.jp, read 16 Nov 2026); nothing is added. Title term: 白川鄉點燈 — the name
// marieclaire.com.tw, funtime.com.tw and hk01 use; 合掌村, 濃飛巴士, 北陸鐵道 and 白川鄉觀光協會 as on
// the 繁體中文 winter itinerary.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/shirakawago-winter-light-up";
const TITLE = "白川鄉點燈 2027：日期、預約與點燈巴士";
const H1 = "白川鄉點燈 2027：日期、預約方式與合掌村點燈行程";
const DESC =
  "白川鄉點燈 2027 只有 1 月 11、17、24、31 日四個晚上，採完全預約制。比較名古屋出發的白川鄉合掌村點燈行程與高山、金澤點燈巴士。";

const OWN = dateLabel("2026-11-16", LOCALE);
const NOHI_FARE_READ = dateLabel("2026-11-06", LOCALE);

const COACH_URL = klookFor(shirakawagoWinterLightUpTakayamaNagoyaBusTour.url, LOCALE);
const SMALL_GROUP_URL = klookFor(shirakawagoLightUp2027NagoyaTour.url, LOCALE);
const KANAZAWA_DAY_URL = klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE);
const NAGOYA_DAY_URL = klookFor(takayamaShirakawagoNagoyaDayTrip.url, LOCALE);
const TAKAYAMA_HOTELS_URL = klookFor(japanWinterStayAreas[3].url, LOCALE);
const KANAZAWA_HOTELS_URL = klookFor(japanWinterStayAreas[2].url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

/** Table 1: dates and the five ways in. First row is the answer. */
const wayRows = [
  {
    way: "現在最簡單：點燈巴士行程（路線巴士公司或旅行社）",
    deck: "路線巴士公司行程：有些含、有些不含。旅行社行程：不含",
    status: "路線巴士公司行程已於 2026 年 10 月 13 日至 11 月 2 日依日期開賣；旅行社方案 2026 年 12 月 2 日 13：00 公布連結",
    book: "向巴士公司或旅行社預訂，不是觀光協會",
  },
  {
    way: "住在村內",
    deck: "含",
    status: "抽籤已於 10 月 31 日截止，11 月 10 日通知中籤。中籤者放棄的房間於 2026 年 11 月 26 日 13：00 起先到先得",
    book: "觀光協會網站",
  },
  {
    way: "自駕，預約停車位（見島停車場）",
    deck: "不含",
    status: "第一輪已售罄。第二輪 2026 年 12 月 1 日 13：00 開賣：每輛 ¥7,000（1–5 人）、¥10,000（6–10 人）",
    book: "觀光協會網站，信用卡付款，不可退款",
  },
  {
    way: "計程車，使用預約的停車位",
    deck: "不含",
    status: "與自駕相同的停車位販售；活動當天村內計程車公司不營業",
    book: "先預約停車位，再叫計程車",
  },
  {
    way: "當天直接前往",
    deck: "—",
    status: "不行：當天不販售入場券，15：30 起閘口禁止沒有入場券的人進村",
    book: "—",
  },
];

/** Table 2: ways to get there, on each operator's own figures. */
const routeRows = [
  {
    option: "Klook 名古屋出發點燈巴士（途中遊覽飛驒高山）",
    time: "商品頁標示 12 小時 25 分鐘，從名鐵巴士中心出發",
    cost: "請在商品頁查看您日期的價格",
    book: "在 Klook 購買；有會說英語的工作人員；商品頁標示四天全部保證出團",
  },
  {
    option: "Klook 名古屋出發小團點燈行程",
    time: "一整天的行程；只參觀村內，不含展望台",
    cost: "請在商品頁查看您日期的價格",
    book: "在 Klook 購買；約九人，榮或名古屋站飯店接送",
  },
  {
    option: "濃飛巴士高山出發點燈巴士",
    time: "14：40–15：40 出發，20：20–20：45 回到高山",
    cost: "¥13,000（合掌造民家園＋紅豆湯）、¥14,000（溫泉券）、¥16,000（展望台）",
    book: "只能在濃飛巴士網站預訂，每筆最多 6 人；不接受候補",
  },
  {
    option: "北陸鐵道金澤出發點燈巴士",
    time: "金澤 14：30 → 村內 16：30–19：50 → 金澤 21：50",
    cost: "成人 ¥18,500、兒童 ¥16,500，含展望台入場券",
    book: "北陸鐵道網站或電話，每筆最多 4 人",
  },
  {
    option: "路線高速巴士（只有白天）",
    time: "金澤 1 小時 15 分鐘；高山約 50 分鐘",
    cost: `金澤成人 ¥2,800（北陸鐵道）；高山 12 月 1 日起 ¥2,900（濃飛巴士，${NOHI_FARE_READ}查核）`,
    book: "對號座；但離村的末班車 17：30 發車，點燈還沒結束",
  },
];

/** Table 3: where to sleep. */
const stayRows = [
  {
    base: "高山",
    why: "濃飛巴士的點燈巴士從 JR 高山站旁的巴士中心出發並回到原處，20：45 前回來",
    watch: "點燈結束後沒有路線巴士回高山，所以回程就靠濃飛巴士的點燈巴士",
  },
  {
    base: "金澤",
    why: "北陸鐵道的點燈巴士從金澤站西口出發，21：50 回來；位於北陸新幹線沿線",
    watch: "21：50 才回到金澤，當晚請住金澤，不要再搭晚班車移動",
  },
  {
    base: "白川鄉的合掌屋民宿",
    why: "唯一包含展望台入場券、也能在巴士離開後留在村內的住宿",
    watch: "點燈夜的住宿採抽籤（已截止）；取消的房間於 2026 年 11 月 26 日 13：00 起先到先得",
  },
  {
    base: "名古屋",
    why: "Klook 點燈巴士的出發地；位於東海道新幹線沿線",
    watch: "四個住宿地點中一天最長的",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2027 年白川鄉點燈是什麼時候？",
    a: `四個晚上：2027 年 1 月 11 日（星期一，國定假日）、17、24、31 日，每晚 17：30 到 19：30，在荻町聚落舉行。這是白川鄉觀光協會公布的第 41 屆點燈（${OWN}查核）。若全國性強烈寒流可能造成交通嚴重中斷，協會可能取消活動。`,
  },
  {
    q: "白川鄉點燈需要預約嗎？",
    a: `需要。活動採完全預約制，入場券須掛在脖子上；當天不販售入場券，15：30 起閘口禁止沒有入場券的人進村。五種參加方式是住在村內、自駕或計程車預約停車位、路線巴士公司的點燈行程，以及旅行社的巴士行程（${OWN}查核）。`,
  },
  {
    q: "參加行程是看點燈最好的方式嗎？",
    a: "對大多數旅客來說是的。離村的末班路線巴士 17：30 發車，點燈還沒結束；村內住宿已抽籤結束；停車則需要一輛在雪路上裝了雪胎的車。從名古屋、高山或金澤出發的點燈巴士會保留入場名額，當晚把您送回去。",
  },
  {
    q: "可以從展望台看點燈嗎？",
    a: "要有展望台入場券才行，而這張票不單獨販售。它包含在以展望台方案預訂的村內住宿，或路線巴士公司的展望台行程中，例如濃飛巴士高山出發 ¥16,000 的方案，或北陸鐵道金澤出發 ¥18,500 的巴士。自駕、計程車和旅行社行程的旅客在村內欣賞點燈。",
  },
  {
    q: "1 月晚上的白川鄉有多冷？",
    a: `觀光協會公布點燈時段氣溫為 −10°C 到 0°C，路面結冰。協會建議準備保暖外套、防水保暖靴、鞋用冰爪和手電筒，因為腳下很暗（${OWN}查核）。`,
  },
  {
    q: "點燈當天白天可以去白川鄉嗎？",
    a: "可以，但有限制。自駕不用預約，但須在 15：00 前進場、17：00 前離開；觀光巴士須預約停車，14：00 前進場、16：00 前離開。搭路線巴士的話，須搭 15：20 前抵達村內的班次。往展望台的步道 15：45 關閉，展望台 16：10 關閉。",
  },
  {
    q: "點燈預約可以取消或更改嗎？",
    a: "停車預約除非執行委員會取消活動，否則不能更改或退款。濃飛巴士在出發前取消收取 ¥100 手續費，付款後不接受更改。Klook 行程請在付款前查看商品頁的取消規定。",
  },
  {
    q: "有從東京出發的白川鄉點燈行程嗎？",
    a: "沒有當天往返的。請前一天搭新幹線到名古屋或金澤，再從那裡搭點燈巴士；金澤路線請看我們的東京到金澤攻略（英文）。",
  },
];

const TRIP_PREP_ZH: Partial<KlookTripPrepItem>[] = [
  {
    label: "白川鄉冬季點燈與飛驒高山一日巴士遊（名古屋出發）",
    ctaLabel: "查看名古屋出發點燈巴士 →",
    why: "入場採預約制，點燈結束後也沒有路線巴士離村，所以一趟保留點燈名額的巴士，訂一次就把整個計畫安排好。",
  },
  {
    label: "高山站周邊飯店",
    ctaLabel: "查看高山飯店 →",
    why: "濃飛巴士自營的點燈巴士從高山站旁的巴士中心出發，20：20–20：45 回到原處，當晚走一小段路就到住宿。",
  },
  {
    label: "金澤飯店",
    ctaLabel: "查看金澤飯店 →",
    why: "北陸鐵道的點燈巴士 14：30 從金澤站西口出發，21：50 回來，所以走這條路線要住在車站附近。",
  },
  {
    label: "北陸拱型周遊券",
    ctaLabel: "查看北陸拱型周遊券 →",
    why: "如果行程是搭鐵路走東京 → 金澤 → 關西，周遊券可用於新幹線區段；往白川鄉的巴士任何 JR Pass 都不能用。",
  },
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "寒流造成的點燈取消、雪地巴士延誤和入場資訊都透過網路通知，而村裡沒有車站可以詢問。",
  },
];

const tripPrepItems: KlookTripPrepItem[] = shirakawagoLightUpTripPrep.map((item, i) =>
  withKlookLocale(item, LOCALE, TRIP_PREP_ZH[i] ?? {}),
);

const stayAreas = [
  withKlookLocale(japanWinterStayAreas[3], LOCALE, {
    area: "高山站",
    why: "這條路線在山區過夜的地方，也是 1 月白川鄉點燈巴士出發的住宿地點：濃飛巴士總站就在車站旁，19：30 結束後走回去就好，不用轉車。",
  }),
  withKlookLocale(japanWinterStayAreas[2], LOCALE, {
    area: "金澤",
    why: "北陸新幹線終點的兩晚，兼六園巴士和預約制白川鄉巴士都從站前出發，這是旅程中時間最緊湊的一段。",
  }),
];

const tourPicks = [
  withKlookLocale(shirakawagoWinterLightUpTakayamaNagoyaBusTour, LOCALE, {
    title: "白川鄉冬季點燈與飛驒高山一日巴士遊（名古屋出發）",
    desc: "1 月四個點燈晚上從名古屋名鐵巴士中心出發的 12 小時 25 分鐘巴士行程，有會說英語的工作人員，途中遊覽高山老街",
  }),
  withKlookLocale(shirakawagoLightUp2027NagoyaTour, LOCALE, {
    title: "白川鄉點燈行程，2027 年四個晚上（名古屋出發）",
    desc: "2027 年 1 月四個點燈晚上從名古屋出發的 10 到 12 小時行程，只參觀村內，可選飯店接送",
  }),
  withKlookLocale(shirakawagoTakayamaKanazawaDayTour, LOCALE, {
    title: "金澤出發白川鄉與高山一日巴士遊",
    desc: "標示 8 到 10 小時的拼團行程，有英語持證導遊，可選擇回到金澤或在高山下車",
  }),
  withKlookLocale(takayamaShirakawagoNagoyaDayTrip, LOCALE, {
    title: "名古屋出發高山與白川鄉一日遊",
    desc: "從名古屋站往返，標示約 11 小時，在白川鄉和高山老街各停留約兩小時",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "白川鄉點燈" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
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
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.86rem" }}>
                    {cell}
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

export default function ZhTwShirakawagoWinterLightUpPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG["zh-tw"] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>1 月只有四個晚上，而且只接受預約。這裡整理所有參加方式、當晚就能回程的巴士，以及住宿地點。</p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "觀光協會規定，標示查核日", "濃飛巴士與北陸鐵道票價", "名古屋、高山、金澤"].map((t) => (
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
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>2027 年日期</p>
                <p className={styles.verdictStatValue}>1 月 11、17、24、31 日</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>點燈時間</p>
                <p className={styles.verdictStatValue}>17：30–19：30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>預約</p>
                <p className={styles.verdictStatValue}>必須預約，當天不售票</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最佳方式</p>
                <p className={styles.verdictStatValue}>點燈巴士行程</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>白川鄉冬季點燈</strong>在<strong>2027 年 1 月 11、17、24、31 日四個晚上，17：30 到 19：30</strong>舉行，只能事先預約入場，當天不販售入場券。自駕需要預約停車位（第二輪於 <strong>2026 年 12 月 1 日 13：00</strong> 開賣），離村的末班路線巴士 17：30 發車，點燈還沒結束。從<strong>名古屋、高山或金澤</strong>出發的點燈巴士行程，是最可靠的去回方式。規定於 {OWN}在白川鄉觀光協會網站查核。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                名古屋出發點燈行程 →
              </KlookLink>
              <KlookLink href={TAKAYAMA_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                高山飯店 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>日期與預約</span>
          <h2 className={styles.sectionTitle}>2027 年白川鄉點燈是什麼時候？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>2027 年 1 月 11 日（星期一，國定假日）、17、24、31 日</strong>，每晚 17：30 到 19：30，在荻町舉行。這是第 41 屆點燈僅有的日期；若全國性強烈寒流可能造成交通嚴重中斷，協會可能取消當晚活動。您用哪種方式進村，決定了能不能上展望台：
          </p>
          <Table
            head={["參加方式", "可上展望台？", "現況（2026 年 11 月 16 日）", "預訂管道"]}
            rows={wayRows.map((r) => [r.way, r.deck, r.status, r.book])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{OWN}，取自{" "}
            <a href="https://shirakawa-go.gr.jp/events/441/" target="_blank" rel="noopener">
              白川鄉觀光協會 2027 年點燈概要
            </a>
            、
            <a href="https://shirakawa-go.gr.jp/events/459/" target="_blank" rel="noopener">
              住宿抽籤公告
            </a>
            。入場券只在當天有效，在村內須掛在脖子上。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>預約</span>
          <h2 className={styles.sectionTitle}>白川鄉點燈需要預約嗎？</h2>
          <p className={styles.bodyText}>
            需要，而且沒有例外。協會採<strong>發放入場券的完全預約制</strong>：沒有入場券就會被拒絕入村，<strong>當天不販售入場券</strong>。15：30 起村口設有閘口。展望台入場券從不單獨販售，除非執行委員會取消活動，預約不能更改或退款（{OWN}查核）。
          </p>
          <p className={styles.bodyText}>
            <strong>哪種預約最先額滿：</strong>村內住宿（抽籤，已截止），其次是第一輪停車位（開賣當天售罄）。第二輪停車位於 <strong>2026 年 12 月 1 日 13：00</strong> 開賣，旅行社方案於 <strong>2026 年 12 月 2 日 13：00</strong> 在協會網站公布連結。Klook 的名古屋出發點燈商品已標示 1 月的日期，請在商品頁確認您的日期。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              名古屋出發點燈＋高山 →
            </KlookLink>
            <KlookLink href={SMALL_GROUP_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              小團點燈行程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>交通方式</span>
          <h2 className={styles.sectionTitle}>參加行程是看點燈最好的方式嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            對大多數旅客來說是的。路線巴士 17：30 就收班，點燈還沒結束；點燈巴士或<strong>白川鄉點燈行程</strong>會保留入場名額，當晚把您送回去。請選擇從您住宿地點出發的那一種。
          </p>
          <Table head={["方式", "時間", "價格", "預訂"]} rows={routeRows.map((r) => [r.option, r.time, r.cost, r.book])} />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{OWN}，取自{" "}
            <a href="https://www.nouhibus.co.jp/shirakawa_lightup_2027/" target="_blank" rel="noopener">
              濃飛巴士點燈巴士
            </a>
            、
            <a href="https://www.hokutetsu.co.jp/news/shirakawago-lightup2027/" target="_blank" rel="noopener">
              北陸鐵道點燈巴士
            </a>
            、
            <a href="https://www.hokutetsu.co.jp/highway-bus/takayama/" target="_blank" rel="noopener">
              北陸鐵道白川鄉–高山線
            </a>
            。濃飛巴士 12 月 1 日起高山票價 ¥2,900 於 {NOHI_FARE_READ}查核。濃飛巴士和北陸鐵道在 10 月 13 日到 11 月 2 日之間依日期開賣點燈巴士座位；濃飛巴士不接受候補，取消釋出的座位會重新出現在預訂頁面。Klook 行程內容以商品頁說明為準。
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            該選哪一種點燈巴士？
          </h3>
          <p className={styles.bodyText}>
            <strong>住在高山：</strong>想上展望台就選濃飛巴士 B 方案（¥16,000），單程約 20 分鐘在雪中走上坡；只看村落和合掌造民家園就選 A 方案（¥13,000）。<strong>住在金澤：</strong>北陸鐵道的巴士（¥18,500，含展望台），在村內約 3 小時 20 分鐘。<strong>住在名古屋，或不方便使用日文預訂網站：</strong>選可用英文預訂的 Klook 巴士。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              名古屋點燈巴士（英語工作人員）→
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>白天</span>
          <h2 className={styles.sectionTitle}>點燈當天白天可以去白川鄉嗎？</h2>
          <p className={styles.bodyText}>
            可以，但要早點離開。這四天自駕不用預約就能停車，但須在 <strong>15：00 前進場、17：00 前離開</strong>；觀光巴士須預約停車，14：00 前進場、16：00 前離開。搭路線巴士的話，請搭<strong>15：20 前抵達村內</strong>的班次。往展望台的步道 15：45 關閉，展望台 16：10 關閉。協會建議參觀村落 2 到 3 小時，並在 12：00 前停好車（{OWN}查核）。
          </p>
          <p className={styles.bodyText}>
            其他日子白天前往的班次和巴士票價，請看我們的{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={linkStyle}>
              高山與白川鄉行程攻略（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANAZAWA_DAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              金澤出發白天行程 →
            </KlookLink>
            <KlookLink href={NAGOYA_DAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              名古屋出發白天行程 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="同一趟旅程一起預訂"
          heading="去白川鄉點燈要預訂什麼？"
          intro="點燈巴士、出發城市的住宿、划算的話再加鐵路周遊券，還有行動數據。Klook 價格依日期而異，請打開商品頁查看您日期的價格。"
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>天氣</span>
          <h2 className={styles.sectionTitle}>1 月晚上的白川鄉有多冷？</h2>
          <p className={styles.bodyText}>
            依觀光協會自己的數字，點燈時段為 <strong>−10°C 到 0°C</strong>，路面結冰。請帶保暖外套、防水保暖靴、鞋用冰爪和手電筒，房屋之間的小路很暗。展望台禁止使用三腳架，整個村落禁止空拍機。
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            帶小孩去看點燈可以嗎？
          </h3>
          <p className={styles.bodyText}>
            可以，做好保暖就好。濃飛巴士成人和小學生同價，未滿 6 歲不占座位免費；北陸鐵道兒童票價 ¥16,500。去展望台要在雪中爬坡。
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            因下雪取消怎麼辦？
          </h3>
          <p className={styles.bodyText}>
            停車費只有在執行委員會取消活動時才退款。濃飛巴士提醒下雪可能讓巴士延誤，縮短在村內的時間。Klook 行程的天氣與退款規定寫在商品頁上。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>住宿</span>
          <h2 className={styles.sectionTitle}>看點燈要住在哪裡？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            住在點燈巴士出發的地方：濃飛巴士住高山，北陸鐵道住金澤，Klook 巴士住名古屋。
          </p>
          <Table head={["住宿地點", "原因", "注意事項"]} rows={stayRows.map((r) => [r.base, r.why, r.watch])} />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{OWN}，取自{" "}
            <a href="https://shirakawa-go.gr.jp/events/441/" target="_blank" rel="noopener">
              shirakawa-go.gr.jp
            </a>
            、
            <a href="https://www.nouhibus.co.jp/shirakawa_lightup_2027/" target="_blank" rel="noopener">
              nouhibus.co.jp
            </a>
            、
            <a href="https://www.hokutetsu.co.jp/news/shirakawago-lightup2027/" target="_blank" rel="noopener">
              hokutetsu.co.jp
            </a>
            。含白川鄉的金澤兩天行程請看{" "}
            <Link href="/guides/attractions/kanazawa-2-day-itinerary" hrefLang="en" style={linkStyle}>
              金澤兩天行程（英文）
            </Link>
            ，以點燈為中心的 1 月路線請看{" "}
            <Link href="/zh-tw/guides/attractions/japan-winter-itinerary" style={linkStyle}>
              日本冬季行程
            </Link>
            。
          </p>
        </section>

        <KlookStayAreas
          heading="看點燈的飯店搜尋"
          intro="房價和空房依日期而異，所以每個住宿地點都連到 Klook 該地區的飯店搜尋。"
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            入場資訊、巴士接送訊息和寒流取消通知都透過網路傳來。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              查看 Klook eSIM →
            </KlookLink>{" "}
            從東京出發？新幹線區段請看{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en" style={linkStyle}>
              東京到金澤攻略（英文）
            </Link>
            ，而{" "}
            <Link href="/guides/transport/hokuriku-arch-pass" hrefLang="en" style={linkStyle}>
              北陸拱型周遊券攻略（英文）
            </Link>
            計算了金澤夾在東京和大阪之間時，七天周遊券是否比單程票划算。
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="常見問題" />

        <KlookTourPicks
          heading="Klook 上的白川鄉行程"
          intro="兩種名古屋出發的點燈巴士，以及適合其他日子的兩種白天行程。所需時間、接送和包含項目請看各商品頁。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山與白川鄉行程：從哪裡出發（英文）" },
            { href: "/guides/attractions/kanazawa-2-day-itinerary", title: "金澤兩天行程：金澤與白川鄉（英文）" },
            { href: "/zh-tw/guides/attractions/japan-winter-itinerary", title: "日本冬季行程（2027）：12 天路線逐日安排" },
            { href: "/guides/transport/tokyo-to-kanazawa", title: "東京到金澤搭新幹線（英文）" },
            { href: "/guides/transport/hokuriku-arch-pass", title: "北陸拱型周遊券（英文）" },
            { href: "/guides/attractions/hokkaido-winter-tours", title: "札幌出發北海道冬季行程（英文）" },
            { href: "/guides/attractions", title: "更多日本景點（英文）→" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>只有四個晚上，當天不售票</h2>
            <p className={styles.ctaBannerDesc}>選好日期，從您住宿的城市預訂點燈巴士，並準備好應付 −10°C 的衣物。</p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看點燈行程 →
              </KlookLink>
              <KlookLink href={KANAZAWA_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                金澤飯店 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
