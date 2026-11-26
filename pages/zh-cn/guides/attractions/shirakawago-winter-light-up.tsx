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
// and hokutetsu.co.jp, read 16 Nov 2026); nothing is added. Title term: 白川乡点灯 — the name
// gltjp.com/zh-hans and bring-you.info/zh-hans use. In the body the event is 夜间亮灯, per the
// Simplified style sheet; 浓飞巴士, 北陆铁道 and 白川乡观光协会 as on the 简体中文 winter itinerary.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/shirakawago-winter-light-up";
const TITLE = "白川乡点灯 2027：日期、预约与夜间亮灯巴士";
const H1 = "白川乡点灯 2027：日期、预约方式与合掌村夜间亮灯行程";
const DESC =
  "白川乡点灯 2027 只有 1 月 11、17、24、31 日四个晚上，完全预约制。比较名古屋出发的白川乡合掌村夜间亮灯行程，以及高山、金泽的亮灯巴士。";

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
    way: "现在最简单：夜间亮灯巴士行程（路线巴士公司或旅行社）",
    deck: "路线巴士公司行程：有的含，有的不含。旅行社行程：不含",
    status: "路线巴士公司行程已于 2026 年 10 月 13 日至 11 月 2 日按日期开售；旅行社方案 2026 年 12 月 2 日 13:00 公布链接",
    book: "向巴士公司或旅行社预订，不是观光协会",
  },
  {
    way: "住在村内",
    deck: "含",
    status: "抽签已于 10 月 31 日截止，11 月 10 日通知中签。中签者放弃的房间于 2026 年 11 月 26 日 13:00 起先到先得",
    book: "观光协会官网",
  },
  {
    way: "自驾，预约停车位（见岛停车场）",
    deck: "不含",
    status: "第一轮已售罄。第二轮 2026 年 12 月 1 日 13:00 开售：每辆 ¥7,000（1–5 人）、¥10,000（6–10 人）",
    book: "观光协会官网，信用卡付款，不可退款",
  },
  {
    way: "出租车，使用预约的停车位",
    deck: "不含",
    status: "与自驾相同的停车位销售；活动当天村里的出租车公司不运营",
    book: "先预约停车位，再预约出租车",
  },
  {
    way: "当天直接前往",
    deck: "—",
    status: "不行：当天不出售入场券，15:30 起闸口禁止没有入场券的人进村",
    book: "—",
  },
];

/** Table 2: ways to get there, on each operator's own figures. */
const routeRows = [
  {
    option: "Klook 名古屋出发夜间亮灯巴士（途中游览飞驒高山）",
    time: "商品页标注 12 小时 25 分钟，从名铁巴士中心出发",
    cost: "请在商品页查看计划日期的价格",
    book: "通过 Klook 预订；有会说英语的工作人员；商品页标注四天全部保证成团",
  },
  {
    option: "Klook 名古屋出发小团夜间亮灯行程",
    time: "一整天的行程；只参观村内，不含观景台",
    cost: "请在商品页查看计划日期的价格",
    book: "通过 Klook 预订；约九人，荣或名古屋站酒店接送",
  },
  {
    option: "浓飞巴士高山出发夜间亮灯巴士",
    time: "14:40–15:40 出发，20:20–20:45 回到高山",
    cost: "¥13,000（合掌造民家园与红豆汤）、¥14,000（温泉券）、¥16,000（观景台）",
    book: "只能在浓飞巴士官网预订，每单最多 6 人；不接受候补",
  },
  {
    option: "北陆铁道金泽出发夜间亮灯巴士",
    time: "金泽 14:30 → 村内 16:30–19:50 → 金泽 21:50",
    cost: "成人 ¥18,500、儿童 ¥16,500，含观景台入场券",
    book: "北陆铁道官网或电话，每单最多 4 人",
  },
  {
    option: "路线高速巴士（只有白天）",
    time: "金泽 1 小时 15 分钟；高山约 50 分钟",
    cost: `金泽成人 ¥2,800（北陆铁道）；高山 12 月 1 日起 ¥2,900（浓飞巴士，${NOHI_FARE_READ}查询）`,
    book: "对号入座；但离村的末班车 17:30 发车，亮灯还没结束",
  },
];

/** Table 3: where to sleep. */
const stayRows = [
  {
    base: "高山",
    why: "浓飞巴士的夜间亮灯巴士从 JR 高山站旁的巴士中心出发并回到原处，20:45 前回来",
    watch: "亮灯结束后没有回高山的路线巴士，所以回程要靠浓飞巴士的夜间亮灯巴士",
  },
  {
    base: "金泽",
    why: "北陆铁道的夜间亮灯巴士从金泽站西口出发，21:50 回来；位于北陆新干线沿线",
    watch: "21:50 才回到金泽，当晚住在金泽，不要再搭晚班车去下一站",
  },
  {
    base: "白川乡的合掌屋民宿",
    why: "唯一包含观景台入场券、也能在巴士离开后留在村里的住宿",
    watch: "亮灯当晚的住宿采用抽签（已截止）；取消的房间于 2026 年 11 月 26 日 13:00 起先到先得",
  },
  {
    base: "名古屋",
    why: "Klook 夜间亮灯巴士的出发地；位于东海道新干线沿线",
    watch: "四个住宿区域中一天最长的",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2027 年白川乡夜间亮灯是什么时候？",
    a: `四个晚上：2027 年 1 月 11 日（星期一，日本公众假期）、17、24、31 日，每晚 17:30 到 19:30，在荻町聚落举行。这是白川乡观光协会公布的第 41 届夜间亮灯（${OWN}查询）。如果全国性强寒潮可能造成交通严重中断，协会可能取消活动。`,
  },
  {
    q: "白川乡夜间亮灯需要预约吗？",
    a: `需要。活动采用完全预约制，入场券要挂在脖子上；当天不出售入场券，15:30 起闸口禁止没有入场券的人进村。五种参加方式是住在村内、自驾或乘出租车预约停车位、路线巴士公司的夜间亮灯行程，以及旅行社的巴士行程（${OWN}查询）。`,
  },
  {
    q: "参加行程是看夜间亮灯最好的方式吗？",
    a: "对大多数游客来说是的。离村的末班路线巴士 17:30 发车，亮灯还没结束；村内住宿已抽签结束；停车则需要一辆在雪路上装了雪地轮胎的车。从名古屋、高山或金泽出发的夜间亮灯巴士会保留入场名额，当晚把你送回去。",
  },
  {
    q: "可以在观景台看夜间亮灯吗？",
    a: "需要观景台入场券，而这张票不单独出售。它包含在按观景台方案预订的村内住宿，或路线巴士公司的观景台行程中，例如浓飞巴士高山出发 ¥16,000 的方案，或北陆铁道金泽出发 ¥18,500 的巴士。自驾、出租车和旅行社行程的游客在村里观赏亮灯。",
  },
  {
    q: "1 月晚上的白川乡有多冷？",
    a: `观光协会公布亮灯时段气温为 −10°C 到 0°C，路面结冰。协会建议准备保暖外套、防水保暖靴、鞋用冰爪和手电筒，因为脚下很暗（${OWN}查询）。`,
  },
  {
    q: "亮灯当天白天可以去白川乡吗？",
    a: "可以，但有限制。自驾不用预约，但须在 15:00 前进场、17:00 前离开；旅游巴士须预约停车，14:00 前进场、16:00 前离开。乘路线巴士的话，须搭 15:20 前到达村内的班次。去观景台的步道 15:45 关闭，观景台 16:10 关闭。",
  },
  {
    q: "夜间亮灯的预约可以取消或更改吗？",
    a: "停车预约除非执行委员会取消活动，否则不能更改或退款。浓飞巴士在出发前取消收取 ¥100 手续费，付款后不接受更改。Klook 行程请在付款前查看商品页的取消规定。",
  },
  {
    q: "有从东京出发的白川乡夜间亮灯行程吗？",
    a: "没有当天往返的。请前一天乘新干线到名古屋或金泽，再从那里搭夜间亮灯巴士；金泽路线请看我们的东京到金泽攻略（英文）。",
  },
];

const TRIP_PREP_ZH: Partial<KlookTripPrepItem>[] = [
  {
    label: "白川乡冬季夜间亮灯与飞驒高山一日巴士游（名古屋出发）",
    ctaLabel: "查看名古屋出发亮灯巴士 →",
    why: "入场采用预约制，亮灯结束后也没有离村的路线巴士，所以预订一趟保留亮灯名额的巴士，就把整个计划安排好了。",
  },
  {
    label: "高山站周边酒店",
    ctaLabel: "查看高山酒店 →",
    why: "浓飞巴士自营的夜间亮灯巴士从高山站旁的巴士中心出发，20:20–20:45 回到原处，当晚走一小段路就到住处。",
  },
  {
    label: "金泽酒店",
    ctaLabel: "查看金泽酒店 →",
    why: "北陆铁道的夜间亮灯巴士 14:30 从金泽站西口出发，21:50 回来，所以走这条路线要住在车站附近。",
  },
  {
    label: "北陆拱形周游券",
    ctaLabel: "查看北陆拱形周游券 →",
    why: "如果行程是乘铁路走东京 → 金泽 → 关西，周游券可用于新干线区段；去白川乡的巴士任何 JR Pass 都不能用。",
  },
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "寒潮造成的亮灯取消、雪天巴士延误和入场信息都通过网络通知，而村里没有车站可以询问。",
  },
];

const tripPrepItems: KlookTripPrepItem[] = shirakawagoLightUpTripPrep.map((item, i) =>
  withKlookLocale(item, LOCALE, TRIP_PREP_ZH[i] ?? {}),
);

const stayAreas = [
  withKlookLocale(japanWinterStayAreas[3], LOCALE, {
    area: "高山站",
    why: "这条路线在山区过夜的地方，也是 1 月白川乡亮灯巴士出发的住宿区域：浓飞巴士总站就在车站旁，19:30 结束后走回去就好，无需换乘。",
  }),
  withKlookLocale(japanWinterStayAreas[2], LOCALE, {
    area: "金泽",
    why: "北陆新干线终点的两晚，兼六园巴士和预约制白川乡巴士都从站前出发，这是旅行中时间最紧凑的一段。",
  }),
];

const tourPicks = [
  withKlookLocale(shirakawagoWinterLightUpTakayamaNagoyaBusTour, LOCALE, {
    title: "白川乡冬季夜间亮灯与飞驒高山一日巴士游（名古屋出发）",
    desc: "1 月四个亮灯晚上从名古屋名铁巴士中心出发的 12 小时 25 分钟巴士行程，有会说英语的工作人员，途中游览高山老街",
  }),
  withKlookLocale(shirakawagoLightUp2027NagoyaTour, LOCALE, {
    title: "白川乡夜间亮灯行程，2027 年四个晚上（名古屋出发）",
    desc: "2027 年 1 月四个亮灯晚上从名古屋出发的 10 到 12 小时行程，只参观村内，可选酒店接送",
  }),
  withKlookLocale(shirakawagoTakayamaKanazawaDayTour, LOCALE, {
    title: "金泽出发白川乡与高山一日巴士游",
    desc: "标注 8 到 10 小时的拼团行程，有持证英语导游，可选择回到金泽或在高山下车",
  }),
  withKlookLocale(takayamaShirakawagoNagoyaDayTrip, LOCALE, {
    title: "名古屋出发高山与白川乡一日游",
    desc: "从名古屋站往返，标注约 11 小时，在白川乡和高山老街各停留约两小时",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "白川乡点灯" }];

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

export default function ZhCnShirakawagoWinterLightUpPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG["zh-cn"] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>1 月只有四个晚上，而且只接受预约。这里整理了所有参加方式、当晚就能返回的巴士，以及住宿区域。</p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "观光协会规定，标注查询日期", "浓飞巴士与北陆铁道票价", "名古屋、高山、金泽"].map((t) => (
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
                <p className={styles.verdictStatLabel}>亮灯时间</p>
                <p className={styles.verdictStatValue}>17:30–19:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>预约</p>
                <p className={styles.verdictStatValue}>必须预约，当天不售票</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最佳方式</p>
                <p className={styles.verdictStatValue}>夜间亮灯巴士行程</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>白川乡冬季夜间亮灯</strong>在<strong>2027 年 1 月 11、17、24、31 日四个晚上，17:30 到 19:30</strong>举行，只能提前预约入场，当天不出售入场券。自驾需要预约停车位（第二轮于 <strong>2026 年 12 月 1 日 13:00</strong> 开售），离村的末班路线巴士 17:30 发车，亮灯还没结束。从<strong>名古屋、高山或金泽</strong>出发的夜间亮灯巴士行程，是最可靠的往返方式。规定于 {OWN}在白川乡观光协会官网查询。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                名古屋出发亮灯行程 →
              </KlookLink>
              <KlookLink href={TAKAYAMA_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                高山酒店 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>日期与预约</span>
          <h2 className={styles.sectionTitle}>2027 年白川乡夜间亮灯是什么时候？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>2027 年 1 月 11 日（星期一，日本公众假期）、17、24、31 日</strong>，每晚 17:30 到 19:30，在荻町举行。这是第 41 届夜间亮灯仅有的日期；如果全国性强寒潮可能造成交通严重中断，协会可能取消当晚活动。用哪种方式进村，决定了能不能上观景台：
          </p>
          <Table
            head={["参加方式", "可上观景台？", "现状（2026 年 11 月 16 日）", "预订渠道"]}
            rows={wayRows.map((r) => [r.way, r.deck, r.status, r.book])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最后查询：{OWN}，来自{" "}
            <a href="https://shirakawa-go.gr.jp/events/441/" target="_blank" rel="noopener">
              白川乡观光协会 2027 年夜间亮灯概要
            </a>
            与
            <a href="https://shirakawa-go.gr.jp/events/459/" target="_blank" rel="noopener">
              住宿抽签公告
            </a>
            。入场券只在当天有效，在村里要挂在脖子上。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>预约</span>
          <h2 className={styles.sectionTitle}>白川乡夜间亮灯需要预约吗？</h2>
          <p className={styles.bodyText}>
            需要，而且没有例外。协会采用<strong>发放入场券的完全预约制</strong>：没有入场券会被拒绝进村，<strong>当天不出售入场券</strong>。15:30 起村口设有闸口。观景台入场券从不单独出售，除非执行委员会取消活动，预约不能更改或退款（{OWN}查询）。
          </p>
          <p className={styles.bodyText}>
            <strong>哪种预约最先约满：</strong>村内住宿（抽签，已截止），其次是第一轮停车位（开售当天售罄）。第二轮停车位于 <strong>2026 年 12 月 1 日 13:00</strong> 开售，旅行社方案于 <strong>2026 年 12 月 2 日 13:00</strong> 在协会官网公布链接。Klook 的名古屋出发亮灯商品已经标注 1 月的日期，请在商品页确认计划日期。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              名古屋出发亮灯与高山 →
            </KlookLink>
            <KlookLink href={SMALL_GROUP_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              小团亮灯行程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>交通方式</span>
          <h2 className={styles.sectionTitle}>参加行程是看夜间亮灯最好的方式吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            对大多数游客来说是的。路线巴士 17:30 就收班，亮灯还没结束；夜间亮灯巴士或<strong>白川乡夜间亮灯行程</strong>会保留入场名额，当晚把你送回去。请选择从你住宿的城市出发的那一种。
          </p>
          <Table head={["方式", "时间", "价格", "预订"]} rows={routeRows.map((r) => [r.option, r.time, r.cost, r.book])} />
          <p className={styles.bodyText} style={noteStyle}>
            最后查询：{OWN}，来自{" "}
            <a href="https://www.nouhibus.co.jp/shirakawa_lightup_2027/" target="_blank" rel="noopener">
              浓飞巴士夜间亮灯巴士
            </a>
            、
            <a href="https://www.hokutetsu.co.jp/news/shirakawago-lightup2027/" target="_blank" rel="noopener">
              北陆铁道夜间亮灯巴士
            </a>
            与
            <a href="https://www.hokutetsu.co.jp/highway-bus/takayama/" target="_blank" rel="noopener">
              北陆铁道白川乡–高山线
            </a>
            。浓飞巴士 12 月 1 日起的高山票价 ¥2,900 于 {NOHI_FARE_READ}查询。浓飞巴士和北陆铁道在 10 月 13 日到 11 月 2 日之间按日期开售亮灯巴士座位；浓飞巴士不接受候补，取消释放的座位会重新出现在预订页面。Klook 行程内容以商品页说明为准。
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            应该选哪一种夜间亮灯巴士？
          </h3>
          <p className={styles.bodyText}>
            <strong>住在高山：</strong>想上观景台就选浓飞巴士 B 方案（¥16,000），单程约 20 分钟在雪中走上坡；只看村落和合掌造民家园就选 A 方案（¥13,000）。<strong>住在金泽：</strong>北陆铁道的巴士（¥18,500，含观景台），在村里约 3 小时 20 分钟。<strong>住在名古屋，或不方便使用日文预订网站：</strong>选可以用英文预订的 Klook 巴士。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              名古屋亮灯巴士（英语工作人员）→
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>白天</span>
          <h2 className={styles.sectionTitle}>亮灯当天白天可以去白川乡吗？</h2>
          <p className={styles.bodyText}>
            可以，但要早点离开。这四天自驾不用预约就能停车，但须在 <strong>15:00 前进场、17:00 前离开</strong>；旅游巴士须预约停车，14:00 前进场、16:00 前离开。乘路线巴士的话，请搭<strong>15:20 前到达村内</strong>的班次。去观景台的步道 15:45 关闭，观景台 16:10 关闭。协会建议参观村落 2 到 3 小时，并在 12:00 前停好车（{OWN}查询）。
          </p>
          <p className={styles.bodyText}>
            其他日子白天前往的班次和巴士票价，请看我们的{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={linkStyle}>
              高山与白川乡行程攻略（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANAZAWA_DAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              金泽出发白天行程 →
            </KlookLink>
            <KlookLink href={NAGOYA_DAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              名古屋出发白天行程 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="同一趟旅行一起预订"
          heading="去白川乡看夜间亮灯要预订什么？"
          intro="夜间亮灯巴士、出发城市的住宿、划算的话再加铁路周游券，还有上网卡。Klook 价格随日期变化，请打开商品页查看计划日期的价格。"
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>天气</span>
          <h2 className={styles.sectionTitle}>1 月晚上的白川乡有多冷？</h2>
          <p className={styles.bodyText}>
            按观光协会自己的数字，亮灯时段为 <strong>−10°C 到 0°C</strong>，路面结冰。请带保暖外套、防水保暖靴、鞋用冰爪和手电筒，房屋之间的小路很暗。观景台禁止使用三脚架，整个村落禁止无人机。
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            带孩子去看夜间亮灯可以吗？
          </h3>
          <p className={styles.bodyText}>
            可以，做好保暖就行。浓飞巴士成人和小学生同价，未满 6 岁不占座免费；北陆铁道儿童票价 ¥16,500。去观景台要在雪中爬坡。
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            因为下雪取消怎么办？
          </h3>
          <p className={styles.bodyText}>
            停车费只有在执行委员会取消活动时才退款。浓飞巴士提醒下雪可能让巴士延误，缩短在村里的时间。Klook 行程的天气与退款规定写在商品页上。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>住宿</span>
          <h2 className={styles.sectionTitle}>看夜间亮灯要住在哪里？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            住在夜间亮灯巴士出发的地方：浓飞巴士住高山，北陆铁道住金泽，Klook 巴士住名古屋。
          </p>
          <Table head={["住宿区域", "原因", "注意事项"]} rows={stayRows.map((r) => [r.base, r.why, r.watch])} />
          <p className={styles.bodyText} style={noteStyle}>
            最后查询：{OWN}，来自{" "}
            <a href="https://shirakawa-go.gr.jp/events/441/" target="_blank" rel="noopener">
              shirakawa-go.gr.jp
            </a>
            、
            <a href="https://www.nouhibus.co.jp/shirakawa_lightup_2027/" target="_blank" rel="noopener">
              nouhibus.co.jp
            </a>
            与
            <a href="https://www.hokutetsu.co.jp/news/shirakawago-lightup2027/" target="_blank" rel="noopener">
              hokutetsu.co.jp
            </a>
            。包含白川乡的金泽两天行程请看{" "}
            <Link href="/guides/attractions/kanazawa-2-day-itinerary" hrefLang="en" style={linkStyle}>
              金泽两天行程（英文）
            </Link>
            ，以夜间亮灯为中心的 1 月路线请看{" "}
            <Link href="/zh-cn/guides/attractions/japan-winter-itinerary" style={linkStyle}>
              日本冬季行程
            </Link>
            。
          </p>
        </section>

        <KlookStayAreas
          heading="看夜间亮灯的酒店搜索"
          intro="房价和空房随日期变化，所以每个住宿区域都链接到 Klook 该地区的酒店搜索。"
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            入场信息、巴士接送消息和寒潮取消通知都通过网络发送。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              查看 Klook eSIM →
            </KlookLink>{" "}
            从东京出发？新干线区段请看{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en" style={linkStyle}>
              东京到金泽攻略（英文）
            </Link>
            ，{" "}
            <Link href="/guides/transport/hokuriku-arch-pass" hrefLang="en" style={linkStyle}>
              北陆拱形周游券攻略（英文）
            </Link>
            则计算了金泽位于东京和大阪之间时，七天周游券是否比单程票划算。
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="常见问题" />

        <KlookTourPicks
          heading="Klook 上的白川乡行程"
          intro="两种名古屋出发的夜间亮灯巴士，以及适合其他日子的两种白天行程。所需时间、接送和包含项目请看各商品页。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山与白川乡行程：从哪里出发（英文）" },
            { href: "/guides/attractions/kanazawa-2-day-itinerary", title: "金泽两天行程：金泽与白川乡（英文）" },
            { href: "/zh-cn/guides/attractions/japan-winter-itinerary", title: "日本冬季行程 2026-27：北海道、雪景、滑雪与 12 天路线" },
            { href: "/guides/transport/tokyo-to-kanazawa", title: "东京到金泽乘新干线（英文）" },
            { href: "/guides/transport/hokuriku-arch-pass", title: "北陆拱形周游券（英文）" },
            { href: "/guides/attractions/hokkaido-winter-tours", title: "札幌出发北海道冬季行程（英文）" },
            { href: "/guides/attractions", title: "更多日本景点（英文）→" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>只有四个晚上，当天不售票</h2>
            <p className={styles.ctaBannerDesc}>选好日期，从你住宿的城市预订夜间亮灯巴士，并准备好应对 −10°C 的衣物。</p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看夜间亮灯行程 →
              </KlookLink>
              <KlookLink href={KANAZAWA_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                金泽酒店 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
