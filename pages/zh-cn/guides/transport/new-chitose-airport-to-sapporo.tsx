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
// Title term: 新千岁机场到札幌 — the phrase Simplified Chinese results use (sapporo.travel/zh,
// hokkaido-airports.com/zh-CHS, ANA zh/cn, matcha-jp.com/cn); the train is JR Hokkaido's 快速 Airport,
// which these pages also call 机场快线.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/transport/new-chitose-airport-to-sapporo";
const TITLE = "新千岁机场到札幌 2026：JR 快速 Airport、巴士票价";
const H1 = "新千岁机场到札幌 2026：电车与巴士对比、票价与时间";
const DESC =
  "新千岁机场到札幌：JR 快速 Airport 37 分钟 ¥1,230、末班车 23:21，机场巴士约 70 分钟 ¥1,500，出租车打表规则与下雪天怎么走。";

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
    mode: "大多数人的首选：JR 快速 Airport",
    time: "到札幌 37 分钟（特别快速最快 33 分钟）",
    fare: "¥1,230；指定席 u-Seat 车厢 ¥2,230",
    service: "9:00–16:00 每小时 6 班；机场出发首班 6:38、末班 23:21",
    snow: "不走公路，不受堵车影响；JR 停运时，JR 北海道的机场页面有停运时的替代交通说明",
    bags: "最多 2 件，每件三边之和 250 厘米、30 公斤以内；需自己搬上车",
  },
  {
    mode: "机场巴士（北都交通、北海道中央巴士）",
    time: "到札幌站前约 70 分钟，途中停靠薄野与大通",
    fare: "¥1,500（儿童 ¥750）",
    service: "国内线航站楼出发 8:40–22:55，约每 10–20 分钟一班；2026 年 12 月 11 日起每天 83 班",
    snow: "与汽车走同样的公路；运营方表示所需时间仅供参考，并提醒可能因堵车延误",
    bags: "行李箱放进行李舱；不接受预约",
  },
  {
    mode: "出租车乘车点",
    time: "直达门口；与巴士一样走公路",
    fare: "打表：起步 1.4 公里 ¥740，之后每 293 米 ¥100；冬季加价 20%、夜间加价 20%；过路费另计",
    service: "两座航站楼都有乘车点，任何时段都能乘坐",
    snow: "走同样的公路；冬季加价期为 12 月 10 日至 3 月 26 日",
    bags: "放进后备箱；旅行车和 9 座面包车需另外提出",
  },
  {
    mode: "预约包车（Klook）",
    time: "直达门口",
    fare: "按车辆计价，你出行日期的价格请看商品页",
    service: "出发前预约，司机按航班接机",
    snow: "与巴士走同样的公路",
    bags: "带滑雪板包请选择合适的车型",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "新千岁机场到札幌怎么走？",
    a: `从国内线航站楼正下方的车站乘 JR 快速 Airport：到札幌站 37 分钟、¥1,230，白天每小时 6 班，末班车 23:21。机场巴士约 70 分钟、¥1,500，停靠薄野、大通与札幌站。${CHECKED}确认。`,
  },
  {
    q: "从新千岁机场出发，电车和巴士哪个更好？",
    a: "看重速度或遇到下雪天，选电车：比巴士快约半小时、便宜 ¥270，也不会堵在路上。如果酒店就在薄野或大通的巴士站附近，或者行李太重搬不上车，就选巴士，行李箱会放进行李舱。",
  },
  {
    q: "去札幌能用 JR Pass 或北海道铁路周游券吗？",
    a: "可以。两者都可用于 JR 北海道的快速 Airport。北海道铁路周游券提前购买 5 日券 ¥22,000 起，只有行程中还要乘 JR 去小樽、旭川、函馆或二世古方向时才划算；只坐机场这一段是 ¥1,230。机场巴士由民营公司运营，两种周游券都不能用。",
  },
  {
    q: "新千岁机场到札幌的末班车是几点？",
    a: `23:21 的特别快速 Airport。这是 JR 北海道为晚到航班开行的班次，即使航班延误也会准时发车。国内线航站楼出发的机场巴士末班车是 22:55。之后只能乘打表出租车，或提前预约的包车。${CHECKED}确认。`,
  },
  {
    q: "新千岁机场到札幌打车要多少钱？",
    a: "没有任何公司公布固定车费：千岁地区的出租车一律打表，起步 1.4 公里 ¥740，之后每 293 米 ¥100；12 月 10 日至 3 月 26 日加价 20%，22:00–5:00 再加价 20%，过路费另计。在 Klook 预约的包车则在出发前就按车辆定好价格。",
  },
];

const tripPrepItems = [
  withKlookLocale(newChitoseSapporoTripPrep[0], LOCALE, {
    label: "札幌站周边酒店",
    ctaLabel: "查看札幌站酒店 →",
    why: "大多数快速 Airport 的终点站，也是机场巴士的停靠站。无论乘哪一种，拖着行李箱在雪地上走的距离都最短。",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[1], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "电车时刻、巴士乘车处编号、走到酒店的路线，从走出新千岁机场到达大厅的那一刻起都需要上网。",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[2], LOCALE, {
    label: "新千岁机场接送（包车与拼车）",
    ctaLabel: "查看新千岁机场接送 →",
    why: "按车辆计价、直达酒店门口。适合带滑雪板包、全家出行，或在 23:21 末班车之后才抵达的旅客。",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[3], LOCALE, {
    label: "JR 北海道铁路周游券",
    ctaLabel: "查看 JR 北海道周游券价格 →",
    why: "可用于快速 Airport，但单程只要 ¥1,230，行程中还要去小樽、旭川、函馆或乘电车去二世古时，周游券才划算。",
  }),
];

const stayAreas = [
  withKlookLocale(newChitoseSapporoStayAreas[0], LOCALE, {
    area: "札幌站",
    why: "快速 Airport 的终点站，机场巴士也停靠札幌站前。住在车站附近，就不用拖着行李箱再换乘一段。",
  }),
  withKlookLocale(newChitoseSapporoStayAreas[1], LOCALE, {
    area: "薄野",
    why: "机场巴士会先停南 3 条薄野，再到大通与札幌站；2026 年 12 月 11 日起，回程还有从薄野直达机场、约 62 分钟的巴士。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "新千岁机场到札幌" }];

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

export default function ZhCnNewChitoseAirportToSapporoPage({ updated }: { updated: PageUpdated }) {
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
            从新千岁机场到札幌市中心的 JR 快速 Airport、机场巴士、出租车与预约包车：票价、首班与末班车，以及下雪天该乘哪一种。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "票价来自 JR 北海道与巴士运营方", "Klook 价格请按日期查询"].map((t) => (
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
                <p className={styles.verdictStatValue}>JR，37 分钟，¥1,230</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>行李放行李舱</p>
                <p className={styles.verdictStatValue}>巴士，约 70 分钟，¥1,500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>末班车</p>
                <p className={styles.verdictStatValue}>电车 23:21（巴士 22:55）</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>新千岁机场到札幌</strong>，乘 <strong>JR 快速 Airport</strong>（机场快线，Rapid Airport）到札幌站只要 <strong>37 分钟</strong>、<strong>¥1,230</strong>，白天每小时 6 班，末班车 <strong>23:21</strong>。<strong>机场巴士</strong>到札幌站前约 <strong>70 分钟</strong>、<strong>¥1,500</strong>，途中停靠薄野与大通，行李箱放进行李舱。出租车一律打表，起步 1.4 公里 ¥740，12 月 10 日至 3 月 26 日另加 20%；想以固定价格直达酒店门口，请在出发前预约包车。资料来自 JR 北海道、北都交通与北海道中央巴士，{CHECKED}确认。
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              要直接去滑雪场？请看
              <Link href="/guides/transport/sapporo-to-niseko-transfer" style={linkStyle}>
                冬季札幌到二世古（英文）
              </Link>
              ，里面有从机场出发的滑雪巴士。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                新千岁机场接送 →
              </KlookLink>
              <KlookLink href={RAIL_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                JR 北海道铁路周游券 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>所有交通方式</span>
          <h2 className={styles.sectionTitle}>新千岁机场到札幌怎么走？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            大多数旅客乘 JR 快速 Airport 即可：从国内线航站楼正下方的车站出发，37 分钟、¥1,230。下表每种交通方式一行，列出成人单程票价；第一行就是推荐的方式。
          </p>
          <SimpleTable
            head={["交通方式", "所需时间", "成人票价", "班次", "下雪天", "行李"]}
            rows={modeRows.map((r) => [r.mode, r.time, r.fare, r.service, r.snow, r.bags])}
          />
          <p className={styles.bodyText} style={note}>
            最后确认：2026-11-28。资料来源：{ext(JR_AIRPORT_URL, "JR 北海道快速 Airport")}、{ext(JR_EN_URL, "JR 北海道机场交通信息（英文）")}、{ext(JR_FARE_URL, "JR 北海道票价")}、{ext(BUS_URL, "北海道中央巴士机场巴士时刻表")}、{ext(HOKUTO_URL, "北都交通札幌市中心线")}、{ext(TAXI_URL, "北都交通千岁出租车车费")}、{ext(CTS_BUS_URL, "新千岁机场巴士乘车处")}。巴士时刻以国内线航站楼（ANA 一侧）为准，国际线航站楼站点约晚 6 分钟。6–11 岁儿童乘 JR 半价。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>电车还是巴士</span>
          <h2 className={styles.sectionTitle}>从新千岁机场出发，电车和巴士哪个更好？</h2>
          <p className={styles.bodyText}>
            除非行李重到搬不上电车，否则选电车。快速 Airport 比巴士快约半小时、便宜 ¥270，而且走铁轨而不是高速公路，在下雪的傍晚差别尤其明显。6 节车厢中有 5 节可以直接用 IC 卡进站乘车、不用买票，4 号车厢是指定席 u-Seat，另加 ¥1,000（无纸化车票 ¥800），有放大件行李箱的空间。JR 北海道允许每人携带 2 件、每件三边之和 250 厘米且 30 公斤以内的行李上车。如果行李箱搬不动，巴士更合适，行李会放进行李舱；酒店在薄野或大通公园附近时也适合乘巴士，因为巴士会先停这两站，再到札幌站前。两家运营方都表示巴士所需时间仅供参考，可能因交通状况延长；北都交通还在 2026 年 11 月 22 日发布通知，加强车辆检修期间部分班次可能停运。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              改乘包车 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>12 月 11 日起</span>
          <h2 className={styles.sectionTitle}>今年冬天机场巴士有什么变化？</h2>
          <p className={styles.bodyText}>
            班次更多、线路更简单，票价不变。2026 年 12 月 11 日起，北都交通与中央巴士把札幌市中心线分成两条：机场出发每天 72 班的<strong>札幌站前、薄野</strong>线路，以及每天 11 班的<strong>市中心酒店循环</strong>线路。酒店循环线大约在 12:30–19:30 从机场发车，停靠京王广场酒店、美居酒店等酒店与中岛公园。去机场方向则新增经札幌南 IC、约 1 小时 2 分钟的<strong>薄野直达</strong>班次，因为冬天常有巴士在薄野就已坐满、后面站点的乘客上不了车。成人票价仍为 ¥1,500（清田地区站点 ¥1,400），可用现金、非接触式信用卡或 PayPay 支付，不接受预约。
          </p>
          <p className={styles.bodyText} style={note}>
            最后确认：2026-11-28。资料来源：{ext(RENEWAL_URL, "北都交通新闻稿（2026 年 10 月 21 日）")}与{ext(BUS_URL, "北海道中央巴士时刻表")}。
          </p>
        </section>

        <KlookTripPrep
          label="出发前先订好"
          heading="飞往新千岁机场之前要先订什么？"
          intro="札幌站附近的住宿、上网，以及带滑雪板包或晚到时的包车。Klook 价格随日期变化，请打开商品页查看你出行日期的价格。"
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>铁路周游券</span>
          <h2 className={styles.sectionTitle}>去札幌能用 JR Pass 或北海道铁路周游券吗？</h2>
          <p className={styles.bodyText}>
            可以。两者都可用于快速 Airport，因为它是 JR 北海道的列车；但都不能用于民营公司运营的机场巴士。是否划算要另外计算。
            <Link href="/guides/transport/hokkaido-rail-pass" style={linkStyle}>
              北海道铁路周游券（英文）
            </Link>
            提前购买 5 日券 ¥22,000（JR 北海道，{CHECKED}），而机场单程是 ¥1,230，所以要有较长的 JR 行程才划算：小樽、旭川、函馆，或经小樽乘电车去二世古方向。全国版 JAPAN RAIL PASS 7 日券 ¥53,000（{JRP_CHECKED}），只有同一周还要在本州乘新干线时才值得考虑。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={RAIL_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR 北海道铁路周游券 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>晚到与下雪天</span>
          <h2 className={styles.sectionTitle}>航班晚到或下雪时怎么办？</h2>
          <p className={styles.bodyText}>
            先记住两个时间：国内线航站楼出发的机场巴士末班车是 <strong>22:55</strong>，电车末班车特别快速 Airport 是 <strong>23:21</strong>。JR 北海道为晚到航班开行这班车，但表示无论航班是否延误都会准时发车。下雪时电车更安全，因为不走公路；如果 JR 停运，机场页面会说明替代交通方式。末班车之后，只能在乘车点乘打表出租车（12 月 10 日起冬季加价 20%，22:00–5:00 再加价 20%，过路费另计），或乘提前预约的包车。2 月
            <Link href="/zh-cn/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>
              札幌雪祭
            </Link>
            期间市区住宿紧张，请先订好酒店；如果要带着滑雪板包直接去雪场，
            <Link href="/guides/transport/sapporo-to-niseko-transfer" style={linkStyle}>
              二世古接送（英文）
            </Link>
            也从同一座机场出发。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              预约新千岁机场包车 →
            </KlookLink>
          </div>
        </section>

        <KlookStayAreas
          heading="抵达后住札幌哪一区？"
          intro="电车的终点是札幌站，巴士停靠薄野、大通与札幌站。空房与价格随日期变化，每个区域都链接到 Klook 的酒店搜索。"
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>下一步</span>
          <h2 className={styles.sectionTitle}>离开机场之后怎么安排？</h2>
          <p className={styles.bodyText}>
            市区三天的安排请看
            <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>
              札幌 3 日游行程（英文）
            </Link>
            ，环岛一周请看
            <Link href="/zh-cn/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>
              北海道 7 日游
            </Link>
            。从札幌酒店出发的滑雪一日游请看
            <Link href="/guides/attractions/sapporo-ski-day-trip" style={linkStyle}>
              札幌滑雪一日游（英文）
            </Link>
            ；想把行李箱先寄走、不用一路拖着，请看
            <Link href="/guides/transport/japan-luggage-delivery" style={linkStyle}>
              日本行李寄送（英文）
            </Link>
            。
          </p>
        </section>

        <BookingEsimCard lead="电车时刻、巴士乘车处和酒店地图都要上网，抵达新千岁机场前先准备好上网方式。" />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/transport/sapporo-to-niseko-transfer", title: "冬季札幌到二世古：滑雪巴士、电车与接送（英文）" },
            { href: "/guides/attractions/sapporo-3-day-itinerary", title: "札幌 3 日游行程（英文）" },
            { href: "/guides/transport/hokkaido-rail-pass", title: "北海道铁路周游券（2026）：价格与是否划算（英文）" },
            { href: "/zh-cn/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭" },
            { href: "/zh-cn/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 日游" },
            { href: "/guides/attractions/sapporo-ski-day-trip", title: "札幌滑雪一日游（英文）" },
            { href: "/guides/transport/japan-luggage-delivery", title: "日本行李寄送（英文）" },
            { href: "/zh-cn", title: "简体中文版全部攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>新千岁机场到札幌，一程直达</h2>
            <p className={styles.ctaBannerDesc}>
              乘快速 Airport，或为滑雪板包和晚到航班预约包车，再把第一晚的住宿订在札幌站附近。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                新千岁机场接送 →
              </KlookLink>
              <KlookLink href={stayAreas[0].url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                札幌站酒店 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
