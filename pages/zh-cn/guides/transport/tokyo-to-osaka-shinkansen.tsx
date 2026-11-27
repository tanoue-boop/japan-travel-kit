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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  dotonboriDaytimeFoodTour,
  jrPassWholeJapan,
  kantoKansaiLuggageDelivery,
  klookEsim,
  luggageDeliveryCards,
  osakaAmazingPass,
  osakaArrivalShinkansenPrep,
  shinkansenTokyoOsaka,
  tokyoOsakaArrivalPrep,
  tokyoOsakaArrivalStayAreas,
  tokyoOsakaFareTablePrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { PRICES } from "../../../../lib/attraction-prices";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/tokyo-to-osaka-shinkansen) section by section as of
// 2026-11-27 (task jtk-20261127-TR02): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: 东京到大阪新干线 — the route as Simplified Chinese results write it (ekitan.com/zh-cn
// "从东京到大阪的新干线票价和订票方式", shinkansentickets.net/zh "东海道新干线…东京至大阪").

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/transport/tokyo-to-osaka-shinkansen";
const TITLE = "东京到大阪新干线 2026：票价、车程时间与购票方式";
const H1 = "东京到大阪新干线 2026：票价、车程时间与购票方式";
const DESC =
  "东京到大阪新干线票价：希望号指定席 ¥14,720、自由席 ¥13,870，最快 2 小时 21 分。smartEX、Klook、JR Pass 比较。";

const OWN_ISO = "2026-11-21";
const OWN = dateLabel(OWN_ISO, LOCALE);
const EARLIER = dateLabel("2026-11-04", LOCALE);

const WINDOW_NOZOMI = "¥14,720";
const WINDOW_HIKARI = "¥14,400";
const SMART_NOZOMI = "¥14,520";
const SMART_HIKARI = "¥14,200";
const NON_RESERVED = "¥13,870";
const NOZOMI_TICKET = "¥4,960";
const JR_PASS_ONLINE = "¥50,000";
const JR_PASS_ORDER = "¥53,000";

const SHINKANSEN_URL = klookFor(shinkansenTokyoOsaka.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);
const LUGGAGE_URL = klookFor(kantoKansaiLuggageDelivery.url, LOCALE);
const AMAZING_PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const FOOD_TOUR_URL = klookFor(dotonboriDaytimeFoodTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

/** Only the periods still ahead on the date this page was checked. */
const nozomiAllReservedPeriods = [
  "2026 年 11 月 21–23 日",
  "2026 年 12 月 25 日–2027 年 1 月 5 日",
  "2027 年 1 月 9–11 日",
  "2027 年 3 月 20–22 日",
];

const fareRows = [
  {
    train: "希望号：最快，建议预订",
    time: "最快 2 小时 21 分，一般 2 小时 27 分",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_NOZOMI}（smartEX ${SMART_NOZOMI}）`,
    green: "¥19,590（smartEX ¥19,390）",
    pass: `不可以，需另购 ${NOZOMI_TICKET} 车票`,
  },
  {
    train: "光号：JR Pass 可乘坐的列车",
    time: "2 小时 48 分至 3 小时 06 分",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI}（smartEX ${SMART_HIKARI}）`,
    green: "¥19,270（smartEX ¥19,070）",
    pass: "可以",
  },
  {
    train: "回声号（每站停车）",
    time: "3 小时 42 分至 3 小时 54 分",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI}（smartEX ${SMART_HIKARI}）`,
    green: "¥19,270（smartEX ¥19,070）",
    pass: "可以",
  },
];

const frequencyRows = [
  {
    item: "希望号，东京 → 新大阪",
    value: "160 班，2 小时 21 分至 2 小时 30 分",
    detail: "2026 年 11 月 21 日从东京出发、开到新大阪的全部希望号；一般（中位数）车程 2 小时 27 分，无需换乘",
    source: "JR东海时刻表数据",
  },
  {
    item: "希望号首班车与末班车",
    value: "06:00 与 21:24",
    detail: "2026 年 11 月 21 日的东京发车时间。节假日时刻表的末班车时间会变化，请查看你出行日期的时刻表",
    source: "JR东海时刻表数据",
  },
  {
    item: "光号与回声号",
    value: "28 班与 11 班",
    detail: "同一天光号 2 小时 48 分至 3 小时 06 分，回声号 3 小时 42 分至 3 小时 54 分，是 JR Pass 可以乘坐的列车",
    source: "JR东海时刻表数据",
  },
  {
    item: "全线班次",
    value: "每小时最多 18 班",
    detail: "错过一班车，通常不用等很久",
    source: "global.jr-central.co.jp",
  },
];

const passRows = [
  {
    item: "东京–大阪往返一次",
    answer: "买单程车票，不买周游券",
    cost: `smartEX 希望号指定席两张 ¥29,040，最便宜的 7 日周游券为 ${JR_PASS_ONLINE}`,
  },
  {
    item: "7 日普通车 JR Pass",
    answer: "2026 年 10 月 1 日起的价格",
    cost: `官方网站 ${JR_PASS_ONLINE}，海外旅行社的兑换券 ${JR_PASS_ORDER}`,
  },
  {
    item: "光号与回声号",
    answer: "周游券可以乘坐",
    cost: "普通车指定席与自由席都无需另付费用",
  },
  {
    item: "希望号",
    answer: "仅凭周游券不能乘坐",
    cost: `东京–新大阪每乘坐一次 ${NOZOMI_TICKET}，指定席、自由席、绿色车厢同价（绿色车厢限绿色周游券持有人）`,
  },
  {
    item: "周游券划算的情况",
    answer: "7 天内乘坐 4 段以上长途",
    cost: "按 smartEX 价格计算，要乘坐 4 次希望号单程才超过 ¥50,000，所以需要再加上广岛、金泽或东北",
  },
];

const bookingRows = [
  {
    route: "smartEX（JR 官方网站与应用程序）：首选",
    price: `希望号指定席 ${SMART_NOZOMI}，所有指定席便宜 ¥200`,
    when: "从乘车日 1 年前的 5:30 起，到发车前 4 分钟。座位在 1 个月前的 8:00 后确定",
    cancel: "购买后 3 个月内、发车前 4 分钟前可免费改签，次数不限。退票手续费 ¥320",
  },
  {
    route: "Klook 东京 → 大阪铁路页面",
    price: "结账时按日期显示",
    when: "选择日期、车次与座位等级：自由席、指定席或绿色车厢",
    cancel: "按 Klook 自己的规定，付款前会显示",
  },
  {
    route: "车站售票机或售票处",
    price: `车站价格：希望号 ${WINDOW_NOZOMI}，光号指定席 ${WINDOW_HIKARI}`,
    when: "在东京站当天购买，或从列车自始发站发车前 1 个月的 10:00 起购买指定席",
    cancel: `请向售票处咨询。JR Pass 持有人也在这里购买 ${NOZOMI_TICKET} 的希望号车票`,
  },
  {
    route: "JR Pass（7 日普通车）",
    price: `线上 ${JR_PASS_ONLINE}，海外旅行社 ${JR_PASS_ORDER}；希望号每次另付 ${NOZOMI_TICKET}`,
    when: "持周游券可免费预订光号与回声号座位；希望号车票从乘车 1 个月前起在日本的 JR 车站发售",
    cancel: "只有同样 7 天内还要去广岛、金泽或东北才划算，请参考上方的 JR Pass 表格",
  },
];

const altRows = [
  {
    option: "新干线自由席",
    time: "按车次 2 小时 21 分至 3 小时 54 分",
    cost: `${NON_RESERVED}，全年同价`,
    verdict: "最便宜的新干线座位。不能选座，没有超大行李座位，高峰期希望号不设自由席车厢。",
    source: `smart-ex.jp 票价表，${OWN}`,
  },
  {
    option: "smartEX 新干线指定席",
    time: "最快 2 小时 21 分",
    cost: `光号 ${SMART_HIKARI}，希望号 ${SMART_NOZOMI}`,
    verdict: "每个指定席都比车站价格便宜 ¥200。smartEX 也出售名额有限的早鸟票，价格以 smart-ex.jp 为准。",
    source: `smart-ex.jp 与 JR东海，${OWN}`,
  },
  {
    option: "夜间高速巴士",
    time: "约 8 至 9 小时",
    cost: "因日期、运营公司与座位而异，请查看商品页",
    verdict: "票价最低，能在车上睡觉的话还能省一晚住宿。不适合带大行李箱。",
    source: `kosokubus.com（预订网站，不是运营公司），${EARLIER}`,
  },
  {
    option: "飞机，羽田 → 伊丹或关西",
    time: "不列出",
    cost: "因日期与航空公司而异",
    verdict: "ANA 与 JAL 官方网页没有公布飞行时间，因此不列出。比较时请加上两端往返机场的交通。",
    source: `ana.co.jp 与 jal.co.jp，${EARLIER}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "东京到大阪新干线票价多少？",
    a: `希望号普通车指定席在车站购买单程 ${WINDOW_NOZOMI}，在 JR 的 smartEX 购买 ${SMART_NOZOMI}。光号与回声号指定席 ${WINDOW_HIKARI}（smartEX ${SMART_HIKARI}），任何车次的自由席都是 ${NON_RESERVED}。以上是成人 1 位、平季的价格；指定席在旺季贵 ¥200、最旺季贵 ¥400，淡季便宜 ¥200。希望号绿色车厢 ¥19,590（smartEX ¥19,390）。于 ${OWN} 在 JR东海与 smartEX 官方网页核对。`,
  },
  {
    q: "东京到大阪新干线要多久？",
    a: `从东京站到新大阪，希望号最快 2 小时 21 分，一般 2 小时 27 分，无需换乘。JR东海的时刻表数据显示，2026 年 11 月 21 日共有 160 班希望号运行这段线路，首班车 06:00，末班车 21:24。光号需 2 小时 48 分至 3 小时 06 分，每站停车的回声号需 3 小时 42 分至 3 小时 54 分。${OWN} 核对。`,
  },
  {
    q: "东京到大阪新干线需要提前订座吗？",
    a: `通常不需要，但有些日期需要。平日每小时最多 18 班，自由席车票（${NON_RESERVED}）就够用。以下期间希望号全车都是指定席：${nozomiAllReservedPeriods.join("；")}。这些期间光号与回声号仍有自由席车厢，但 JR 提醒可能非常拥挤。三边之和 161 至 250 厘米的行李（没有预订超大行李座位就上车需付 ¥1,000）、有固定的换乘安排，或想坐能看到富士山的座位时，一定要提前订座。于 ${OWN} 在 JR东海网站核对。`,
  },
  {
    q: "只去东京–大阪，买 JR Pass 划算吗？",
    a: `不划算。smartEX 希望号指定席两张 ¥29,040，7 日普通车周游券线上购买 ${JR_PASS_ONLINE}，海外旅行社 ${JR_PASS_ORDER}（2026 年 10 月 1 日起的价格）。而且周游券乘坐希望号每次都要另购 ${NOZOMI_TICKET} 的车票，只在日本的 JR 车站出售。同一周还要去广岛、金泽或东北，才开始划算。于 ${OWN} 在 japanrailpass.net 核对。`,
  },
  {
    q: "东京到大阪坐哪一侧能看到富士山？",
    a: "向西行驶时的右侧：普通车选 E 座，绿色车厢选 D 座，这是 JR东海官方指南指定的座位。自由席无法保证坐到，所以请预订座位；JR东海也提醒，受天气影响可能看不到富士山。于 2026 年 11 月 21 日在 global.jr-central.co.jp 核对。",
  },
];

const topPrep = [
  withKlookLocale(osakaArrivalShinkansenPrep[0], LOCALE, {
    label: "梅田、大阪站周边酒店",
    ctaLabel: "在 Klook 查看大阪站周边酒店 →",
    why: "梅田距新大阪只有御堂筋线两站，下了站台很快就到酒店。",
  }),
  withKlookLocale(osakaArrivalShinkansenPrep[1], LOCALE, {
    label: "大阪周游卡（1 日／2 日）",
    ctaLabel: "查看大阪周游卡 →",
    why: "从走出新大阪那一刻起就能乘坐大阪地铁与市营巴士，同一天还能用于参观大阪城和乘坐游船。",
  }),
  withKlookLocale(osakaArrivalShinkansenPrep[2], LOCALE, {
    label: "日本环球影城电子门票",
    ctaLabel: "查看环球影城门票 →",
    why: "如果去大阪就是为了环球影城：指定日期的电子门票可扫 QR 码直接入园，不用在门口排队买票。",
  }),
];

const fareTablePrep = [
  withKlookLocale(tokyoOsakaFareTablePrep[0], LOCALE, {
    label: "大阪城、梅田蓝天大厦与道顿堀游船一日游",
    ctaLabel: "查看大阪一日游 →",
    why: "大阪城、梅田展望台与道顿堀游船安排成一天的导览行程，适合抵达后的第二天上午，或从东京乘坐早班希望号的那天。",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[1], LOCALE, {
    label: "大阪周游卡（1 日／2 日）",
    ctaLabel: "查看大阪周游卡 →",
    why: "从走出新大阪那一刻起就能乘坐大阪地铁与市营巴士，同一天还能用于参观大阪城和乘坐游船。",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[2], LOCALE, {
    label: "日本环球影城周边酒店（环球城）",
    ctaLabel: "在 Klook 查看环球城酒店 →",
    why: "如果去大阪就是为了环球影城：从环球城站步行约 5 分钟就到园区入口，请把同一晚的房间和座位一起订好。",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[3], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "smartEX 改签、QR 车票与晚点通知都会发到手机上，到达东京站之前就需要能上网。",
  }),
];

const arrivalPrep = [
  withKlookLocale(tokyoOsakaArrivalPrep[0], LOCALE, {
    label: "道顿堀白天美食导览",
    ctaLabel: "查看美食导览 →",
    why: "行程时间为 11:00 至 14:00，约 08:00 前从东京上车就能赶上，下午还有时间。",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[1], LOCALE, {
    label: "大阪周游卡（1 日／2 日）",
    ctaLabel: "查看大阪周游卡 →",
    why: "从走出新大阪那一刻起就能乘坐大阪地铁与市营巴士，同一天还能用于参观大阪城和乘坐游船。",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[2], LOCALE, {
    label: "梅田、大阪站周边酒店",
    ctaLabel: "在 Klook 查看大阪站周边酒店 →",
    why: "房间和座位一起订，要坐的车次和抵达当晚的住宿一次就能确定。",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[3], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "改签 smartEX 座位或查看晚点通知都在手机上进行，到达东京站之前就需要能上网。",
  }),
  withKlookLocale(luggageDeliveryCards.tokyoToOsakaFlyHome, LOCALE, {
    label: "行李配送（大阪、京都酒店 ⇔ 关西机场）",
    ctaLabel: "查看酒店 → 关西机场配送 →",
    why: "如果从关西乘飞机回国，最后一天早上和换城市那天的做法一样：行李箱先离开大阪或京都的酒店，在关西机场等你。",
    guide: { href: "/guides/transport/japan-luggage-delivery", label: "行李配送使用方式（英文）" },
  }),
];

const stayAreas = [
  withKlookLocale(tokyoOsakaArrivalStayAreas[0], LOCALE, {
    area: "大阪梅田",
    why: "从新大阪乘御堂筋线两站，与大阪站相连；回程也坐火车的话，是更方便的住宿区域。",
  }),
  withKlookLocale(tokyoOsakaArrivalStayAreas[1], LOCALE, {
    area: "大阪难波",
    why: "从新大阪乘同一班御堂筋线列车直达，步行可到道顿堀，也是前往关西机场的南海电铁起点。",
  }),
  withKlookLocale(tokyoOsakaArrivalStayAreas[2], LOCALE, {
    area: "大阪天王寺",
    why: "御堂筋线常用区段的终点；如果从关西机场出境，JR HARUKA 直接停靠这一站。",
  }),
];

const tourPicks = [
  withKlookLocale(dotonboriDaytimeFoodTour, LOCALE, {
    title: "大阪道顿堀白天美食导览",
    desc: "11:00 至 14:00、2 至 10 人的 3 小时拼团步行导览，包含串炸、章鱼烧、居酒屋时令午餐套餐与当地甜点",
  }),
  withKlookLocale(osakaAmazingPass, LOCALE, {
    title: "大阪周游卡（1 日／2 日）",
    desc: "大阪地铁与市营巴士无限次乘坐，并可免费进入 40 多处设施的电子周游卡",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "东京到大阪新干线" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function LastChecked({ date, sources }: { date: string; sources: { label: string; href?: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      <strong>最后核对：{date}</strong>。{" "}
      {sources.map((s, i) => (
        <span key={s.label}>
          {i > 0 ? "、" : ""}
          {s.href ? (
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ) : (
            s.label
          )}
        </span>
      ))}
    </p>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
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
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : c === 1 ? styles.tdPrice : undefined}
                    style={{ fontSize: c === 0 ? "0.88rem" : "0.85rem" }}
                  >
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

export default function ZhCnTokyoToOsakaShinkansenPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            希望号、光号、回声号各类座位的票价，新干线要坐多久，JR Pass 是否划算，以及在哪里购票。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "JR 官方票价（注明核对日期）", "JR Pass 回本点", "购票渠道比较"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            最快的<strong>东京到大阪新干线</strong>是希望号，从东京站到新大阪需 <strong>2 小时 21 分</strong>（一般班次 2 小时 27
            分），2026 年 11 月 21 日共有 160 班希望号运行这段线路。希望号指定席在车站购买单程 <strong>{WINDOW_NOZOMI}</strong>，在 JR 的
            smartEX 购买 {SMART_NOZOMI}；任何车次的自由席都是 <strong>{NON_RESERVED}</strong>。JR Pass 可以乘坐光号（指定席{" "}
            {WINDOW_HIKARI}，约 3 小时），但乘坐希望号要另购 {NOZOMI_TICKET} 的车票，所以只往返一次的话，买两张单程票更便宜。票价与车程于{" "}
            {OWN} 在 JR东海与 smartEX 官方网页核对。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>希望号指定席票价</p>
                <p className={styles.verdictStatValue}>{WINDOW_NOZOMI}，smartEX {SMART_NOZOMI}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最快车程</p>
                <p className={styles.verdictStatValue}>2 小时 21 分，无需换乘</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最便宜的座位</p>
                <p className={styles.verdictStatValue}>自由席 {NON_RESERVED}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>持 JR Pass 乘坐希望号</p>
                <p className={styles.verdictStatValue}>需另购 {NOZOMI_TICKET} 车票</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>简单来说：</strong>除非同一周还要去广岛、金泽或东北，否则去程和回程各买一张希望号指定席。smartEX 两张单程票{" "}
              ¥29,040，最便宜的 7 日周游券则是 {JR_PASS_ONLINE}。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看东京 → 大阪车票 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="与新干线一起预订"
          heading="订座位时一起预订的大阪行程"
          intro="希望号的终点是新大阪。住宿、市内周游卡和乐园门票，趁订票页面还开着时一起定下来最方便。"
          items={topPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>东京到大阪新干线票价多少？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            希望号指定席单程 {WINDOW_NOZOMI}，smartEX {SMART_NOZOMI}（成人 1 位、平季）。三种列车的自由席都是 {NON_RESERVED}，不随季节变化；指定席在旺季贵
            ¥200、最旺季贵 ¥400，淡季便宜 ¥200。
          </p>
          <Table
            head={["车次类型", "东京 → 新大阪", "自由席", "指定席（车站／smartEX）", "绿色车厢", "能用 JR Pass 吗？"]}
            rows={fareRows.map((r) => [r.train, r.time, r.nonReserved, r.reserved, r.green, r.pass])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "JR东海与 JR西日本新闻稿，2026 年 10 月 16 日（车站票价）", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
              { label: "smartEX 指定席票价（PDF）", href: "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_reserved.pdf" },
              { label: "smartEX 服务说明", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "JR东海列车信息", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            车程是 JR东海时刻表数据中，2026 年 11 月 21 日东京到新大阪最快与最慢的班次。光号与绿色车厢的车站价格按 JR东海新闻稿中的费用表计算，各比 smartEX 价格高
            ¥200。Klook 的价格随日期变化，因此本页不列出。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Klook 东京 → 大阪车票 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          headingLevel={3}
          label="抵达大阪当天"
          heading="抵达大阪当天要预订的项目"
          intro="座位只占这一天的 2 小时。离开东京前先把其余部分安排好的四项：有导游带的第一天、市内周游卡、以乐园为目的时环球影城门口的房间，以及手机上网。"
          items={fareTablePrep}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>车程</span>
          <h2 className={styles.sectionTitle}>东京到大阪新干线要多久？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            最快的希望号 2 小时 21 分，一般希望号 2 小时 27 分，无需换乘。光号停站较多，需 2 小时 48 分至 3 小时 06 分，回声号需 3 小时 42 分至 3 小时 54
            分；开往新大阪的希望号从东京发车的时间为 06:00 至 21:24。
          </p>
          <Table
            head={["项目", "数值", "说明", "数据来源"]}
            rows={frequencyRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "JR东海列车信息（2026 年 11 月 21 日时刻表）", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
              { label: "JR东海 东海道新干线", href: "https://global.jr-central.co.jp/en/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            班次数是某个星期六的数据，工作日与节假日时刻表不同。能看到富士山的一侧、行李规定与新干线整体介绍，请看{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              新干线新手攻略（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>只去东京–大阪，买 JR Pass 划算吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            只往返一次并不划算：smartEX 希望号指定席两张 ¥29,040，最便宜的 7 日周游券是 {JR_PASS_ONLINE}。周游券可以乘坐光号与回声号，但每次乘坐希望号都要另购{" "}
            {NOZOMI_TICKET} 的车票，而且只在日本的 JR 车站出售，乘车 1 个月前开始发售。
          </p>
          <Table
            head={["问题", "答案", "费用"]}
            rows={passRows.map((r) => [r.item, r.answer, r.cost])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "japanrailpass.net 价格", href: "https://japanrailpass.net/en/purchase/price/" },
              { label: "japanrailpass.net 希望号与瑞穗号车票", href: "https://japanrailpass.net/en/use/special-ticket/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            14 日与 21 日普通车周游券线上 ¥80,000、¥100,000，旅行社 ¥84,000、¥105,000。
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass 价格攻略（英文）
            </Link>
            整理了 2026 年 10 月的涨价，并按你自己的路段计算回本点。想绕道金泽前往吗？
            <Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>
              Hokuriku Arch Pass（英文）
            </Link>
            可在 7 天内乘坐北陆新干线与雷鸟号从东京到大阪，但不能乘坐东海道新干线。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS（7／14／21 日）→
            </KlookLink>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              或在 Klook 买单程票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>更便宜的方式</span>
          <h2 className={styles.sectionTitle}>东京到大阪有更便宜的交通方式吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            新干线中，{NON_RESERVED} 的自由席是最便宜的常规票价，smartEX 的所有指定席便宜 ¥200。比这更便宜的是夜间高速巴士，约需 8 至 9 小时。
          </p>
          <Table
            head={["选项", "时间", "费用", "评价", "数据来源与核对日期"]}
            rows={altRows.map((r) => [r.option, r.time, r.cost, r.verdict, r.source])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "smartEX 自由席票价（PDF）", href: "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_non_reserved.pdf" },
              { label: "smartEX 服务说明", href: "https://smart-ex.jp/en/product/plan/service/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            途中想在京都停留吗？
            <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
              东京到京都交通（英文）
            </Link>
            比较了这一段的巴士与火车，
            <Link href="/zh-cn/guides/transport/kyoto-to-tokyo-shinkansen" style={linkStyle}>
              京都到东京新干线攻略
            </Link>
            介绍回程。其他路段请看
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              新干线购票方式（英文）
            </Link>
            的表格，比较 smartEX、车站、Klook 与 JR Pass，以及大件行李座位的规定。
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            从东京到大阪途中可以在名古屋下车吗？
          </h3>
          <p className={styles.bodyText}>
            可以，只要是超过 100 公里的基本运费乘车券：JR东海允许在起点与终点之间的车站中途下车（出站后再进站），但不能走回头路。新干线的特急券不能用于中途下车，所以请分别购买东京
            → 名古屋与名古屋 → 新大阪；smartEX 不能中途下车，一出站，没乘坐的区段就会作废。规定于 2026 年 11 月 13 日在 JR东海的
            <a href="https://global.jr-central.co.jp/en/tickets/type/stopovers.html" target="_blank" rel="noopener">
              中途下车说明页
            </a>
            与 smart-ex.jp 核对。在名古屋怎么安排这一天，请看
            <Link href="/zh-cn/guides/transport/tokyo-to-nagoya-shinkansen" style={linkStyle}>
              东京到名古屋新干线攻略
            </Link>
            。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>购票</span>
          <h2 className={styles.sectionTitle}>东京到大阪新干线怎么订票？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            想要最低的指定席价格和免费改签，用 smartEX；想和行程中的其他项目一起结账、自己选车次与座位等级，用 Klook；已经在日本、当天出发，到车站购买；同一周要去比大阪远得多的地方，才考虑
            JR Pass。
          </p>
          <Table
            head={["购票渠道", "价格", "何时可以购票", "改签与退票"]}
            rows={bookingRows.map((r) => [r.route, r.price, r.when, r.cancel])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "smartEX 服务说明", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "JR东海与 JR西日本新闻稿（车站票价）", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
              { label: "japanrailpass.net 希望号与瑞穗号车票", href: "https://japanrailpass.net/en/use/special-ticket/" },
              { label: "Klook 的规定显示在结账页面" },
            ]}
          />
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 选择车次与座位等级 →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            东京到大阪新干线需要提前订座吗？
          </h3>
          <p className={styles.bodyText}>
            平日不需要，但以下日期需要：这些期间希望号全车都是指定席，没有当天购买的希望号自由席车票，早上的班次最先售罄。光号与回声号仍有自由席车厢，但 JR
            提醒可能非常拥挤。于 {OWN} 在 JR东海网站核对。
          </p>
          <ul className={styles.pickList}>
            {nozomiAllReservedPeriods.map((period) => (
              <li key={period}>
                <span className={styles.proIcon}>▸</span>
                <span><strong>{period}</strong></span>
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            其他日期只有三种情况需要提前订座：三边之和 161 至 250 厘米的行李，需要带超大行李放置区的指定席（没有预订就上车需付 ¥1,000，超过 250
            厘米的行李不能带上车）；有固定的换乘安排；或想看富士山。自由席车厢这两种座位都没有。行李规定于 {OWN} 在 JR东海的
            <a href="https://global.jr-central.co.jp/en/info/oversized-baggage/" target="_blank" rel="noopener noreferrer">
              超大行李说明页
            </a>
            核对。
          </p>
          <p className={styles.bodyText}>
            如果麻烦的是行李箱而不是座位，可以让行李另外运送：Klook 上的 LuggAgent 当日配送，会把行李从东京地区的酒店送到大阪地区的酒店。预订前请在商品页确认两家酒店都在服务范围内，以及早上的交件截止时间。更慢但更便宜的是大和运输的宅急便（TA-Q-BIN），各尺寸价格请看
            <Link href="/guides/transport/japan-luggage-delivery" style={linkStyle}>
              日本行李配送（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <KlookLink href={LUGGAGE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              东京 → 大阪当日行李配送 →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            东京到大阪坐哪一侧能看到富士山？
          </h3>
          <p className={styles.bodyText}>
            向西行驶时的右侧：普通车选 <strong>E 座</strong>，绿色车厢选 <strong>D 座</strong>，这是 JR东海官方指南指定的座位。可在 smartEX
            的座位图上选择，或在售票处指定；能否看到取决于天气，JR东海也提醒可能看不到富士山。于 {OWN} 在
            <a href="https://global.jr-central.co.jp/en/goldenroute/shinkansen/" target="_blank" rel="noopener noreferrer">
              JR东海 Shinkansen Perfect Guide
            </a>
            核对。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>票价调整</span>
          <h2 className={styles.sectionTitle}>东京到大阪新干线票价会涨吗？</h2>
          <p className={styles.bodyText}>
            会，从 2027 年起。JR东海与 JR西日本于 2026 年 10 月 16 日宣布，<strong>2027 年 7 月 1 日起购买的车票</strong>，希望号指定席价格上调，东京到新大阪从{" "}
            {WINDOW_NOZOMI} 调为 <strong>¥15,420</strong>。绿色车厢自 2027 年 12 月 15 日起乘车的车票，从 ¥19,590 调为 <strong>¥23,290</strong>。自由席费用不变，在这些日期之前购票的行程不受影响。新闻稿只列出车站价格，没有
            smartEX 价格。{OWN} 核对。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>抵达</span>
          <h2 className={styles.sectionTitle}>坐新干线到大阪后住哪里好？</h2>
          <p className={styles.bodyText}>
            梅田或难波，两者都在新大阪出发的御堂筋线上。新干线不到大阪站，所以最后这段地铁每次都少不了；梅田只要两站，难波再多几站，都是同一班车。各区域比较请看
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>
              大阪住宿区域攻略（英文）
            </Link>
            。如果上午就到，1 日 {PRICES.osakaAmazingPass.adult} 的大阪周游卡可乘坐地铁并进入景点（运营方价格，于{" "}
            {dateLabel(PRICES.osakaAmazingPass.checked, LOCALE)} 核对）；
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              大阪周游卡回本计算表（英文）
            </Link>
            有详细计算，
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>
              大阪 2 天行程（英文）
            </Link>
            则安排之后的行程。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={AMAZING_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪周游卡 →
            </KlookLink>
            <KlookLink href={FOOD_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              道顿堀美食导览 →
            </KlookLink>
          </div>
        </section>

        <KlookStayAreas
          heading="御堂筋线沿线的大阪酒店"
          intro="三个区域都在新大阪出发的御堂筋线上，所以选择的重点是接下来的行程，而不是怎么过去。"
          areas={stayAreas}
        />

        <KlookTripPrep
          label="与新干线一起预订"
          heading="抵达当天要预订的项目"
          intro="这一天的火车 JR 已经安排好了。其余需要准备的是：到达后的午餐、市内交通、住宿、手机上网，以及如果从关西乘飞机回国，最后一天早上的行李配送。"
          items={arrivalPrep}
        />

        <KlookTourPicks
          heading="抵达第一天下午可以预订的行程"
          intro="中午前后到达的话，这两项就能排满一天。可预订日期与当前价格，请打开商品页确认。"
          tours={tourPicks}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>出发前</span>
          <h2 className={styles.sectionTitle}>上车前要准备好的一件事</h2>
          <p className={styles.bodyText}>
            手机上网。smartEX 改签、QR 车票与晚点通知都在手机上，一走出新大阪就需要地图。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              查看 Klook eSIM →
            </KlookLink>{" "}
            <Link href="/zh-cn/guides/esim/best-esim-japan" style={linkStyle}>
              日本 eSIM 推荐攻略
            </Link>
            比较了其他选择。
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/japan-first-time-itinerary", title: "第一次去日本行程（2026）：9 天每日安排（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新干线攻略 2026：车票、周游券与新手须知（英文）" },
            { href: "/guides/transport/tokyo-to-kyoto", title: "东京到京都（2026）：最便宜与最快的交通方式（英文）" },
            { href: "/zh-cn/guides/transport/kyoto-to-tokyo-shinkansen", title: "京都到东京新干线 2026：票价、车程时间与购票方式" },
            { href: "/zh-cn/guides/transport/tokyo-to-nagoya-shinkansen", title: "东京到名古屋新干线 2026：票价、车程时间与购票方式" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 价格 2026：10 月 1 日新价格与是否划算（英文）" },
            { href: "/zh-cn", title: "简体中文版所有攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先订好座位，再安排大阪的行程</h2>
            <p className={styles.ctaBannerDesc}>
              想看富士山选 E 座，带大行李选指定席车厢，持 JR Pass 就坐光号。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看东京 → 大阪车票 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
