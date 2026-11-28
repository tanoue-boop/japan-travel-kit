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
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import HotelStayBlock from "../../../../components/HotelStayBlock";
import {
  fujiHakoneDayTour,
  fujiQHighlandAdmission,
  fujiQHighlandPass,
  fujiQHighlandQPack,
  fujikawaguchikoHotels,
  kawaguchikoYamanakakoBusTour,
  mtFujiPass,
  naritaLimousineBus,
  tokyoMtFujiHighwayBus,
  tokyoStayAreas,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/fuji-q-highland-tickets) section by section as of
// 2026-11-28 (task-jtk-20261128-TR02): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (fujiq.jp and bus.fujikyu.co.jp,
// read 23 Nov 2026); nothing is added. Title terms: 富士急乐园门票 and 一日通票 — the names
// Simplified Chinese results use (livejapan.com/zh-cn, jeepe.jp/zh, bring-you.info/zh-hans,
// Rakuten Travel Experiences zh-cn). Ride names stay in English apart from the two whose Japanese
// kanji name is the official one (战栗迷宫, 绝望要塞).

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/fuji-q-highland-tickets";
const TITLE = "富士急乐园门票 2026：一日通票价格、免费入园与优先券";
const H1 = "富士急乐园门票 2026：票价、免费入园与一日通票";
const DESC =
  "富士急乐园门票 2026：免费入园，一日通票按日期 ¥6,000–¥7,900，大型过山车每次 ¥2,000，玩 4 项以上买一日通票更划算。";

const LAST_CHECKED = "2026-11-23";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);

const OFFICIAL = {
  ticket: "https://www.fujiq.jp/en/ticket/",
  rides: "https://www.fujiq.jp/en/ticket/attraction.html",
  priority: "https://www.fujiq.jp/en/ticket/priority.html",
  tokuQ: "https://bus.fujikyu.co.jp/otoku/fujiq-beginner/",
  superTokuQ: "https://www.fujiq.jp/event/tokuQpack_2025.html",
  hours: "https://www.fujiq.jp/en/schedule/index.html",
  hotel: "https://www.fujiq.jp/en/relate/index.html",
  bus: "https://bus.fujikyu.co.jp/highway/detail/id/1",
};

const QPACK_URL = klookFor(fujiQHighlandQPack.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const textLink = { color: "var(--text)", fontWeight: 600 } as const;
const lastChecked = { marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

// Row 1 is the answer; the rest are adult prices as fujiq.jp lists them.
const priceRows = [
  ["该买哪一种", "大型过山车 4 项以上 → 一日通票", "1–2 项 → 免费入园后按次付费；从东京坐巴士 → Toku-Q Pack"],
  ["入园（免费入园券）", "免费（¥0）", "只含入园，所有游乐设施都在园内售票机付费"],
  ["一日通票（Free Pass）", "按日期 ¥6,000 – ¥7,900", "全天不限次数乘坐，乐园公布的不适用设施除外"],
  ["午后通票", "按日期 ¥4,100 – ¥6,000", "13:00 起不限次数乘坐"],
  ["Sunset★Night Pass", "¥3,700 / ¥4,000", "营业到 19:00 以后的日子 16:00 起可用；只在当天于园内发售"],
  ["托马斯乐园通票", "按日期 ¥3,000 – ¥3,500", "可乘坐托马斯乐园全部 12 项设施；托马斯乐园以外的设施另外付费"],
  ["优先入园一日通票", "按每月票价表", "仅限在线购买；可在开园前入园，这段时间只有大型过山车运营；2026 年 12 月 1 日至 2027 年 2 月 5 日不发售"],
  ["虚拟排队一日通票（分身君）", "一日通票价格 + ¥2,000", "可用 Q-chan App 为指定设施排队；数量有限，仅限成人至小学生"],
  ["大型过山车乘坐一次", "¥2,000", "Fujiyama、Takabisha、Eejanaika、ZOKKON、Attack on Titan THE RIDE"],
];

const ageRows = [
  ["成人（18–64 岁）", "¥6,000 – ¥7,900", "¥4,100 – ¥6,000"],
  ["初中生与高中生", "¥5,500 – ¥7,400", "¥3,800 – ¥5,700"],
  ["小学生", "¥4,400 – ¥5,100", "¥3,500 – ¥4,200"],
  ["幼儿（1 岁以上）", "¥2,100 – ¥2,600", "¥1,700 – ¥2,100"],
  ["长者（65 岁以上）", "¥2,100 – ¥2,600", "¥1,700 – ¥2,100"],
];

// Pay per ride, from fujiq.jp/en/ticket/attraction.html. Row 1 is the break-even.
const rideRows = [
  ["盈亏平衡点", "大型过山车 3 次 = ¥6,000", "等于一日通票最便宜日期的票价；大型过山车 4 次（¥8,000）在任何日期都比一日通票贵"],
  ["Fujiyama、Takabisha、Eejanaika、ZOKKON、Attack on Titan THE RIDE", "每次 ¥2,000", "大多数游客专程来玩的设施"],
  ["Tondemina、Tekkotsubanchou、Nagashimasuka、Fuji Airways、Panic Rock、绝望要塞（Desperation Fortress）、3D Shooting Ride", "每次 ¥1,500", "Tentekomai（同为 ¥1,500）暂停运营至 2027 年 7 月下旬"],
  ["战栗迷宫（Senritsu Meikyu，废弃医院鬼屋）", "每组 ¥4,000 / ¥8,000", "每组最多 4 人；持一日通票或午后通票 ¥4,000，不持票 ¥8,000；以指定时段票发售"],
  ["托马斯乐园设施", "每次 ¥500", "或购买托马斯乐园通票 ¥3,000 – ¥3,500"],
];

// The Toku-Q Pack, the plain pass and the priority ticket side by side. Row 1 is the answer.
const compareRows = [
  ["该选哪一种", "—", "从东京坐巴士：Toku-Q Pack。已经在湖区或坐火车前往：一日通票。人多的日子：再加购优先券。"],
  ["Super Toku-Q Pack（新宿高速巴士总站出发）", "成人 ¥11,100、初高中生 ¥10,700、小学生 ¥7,100", "往返高速巴士 + 一日通票 + 一项过山车优先乘坐一次（9:00–10:00 使用）"],
  ["Toku-Q Pack（其他出发地）", "按出发地而定", "往返直达巴士 + 一日通票，从东京、静冈周边 30 多个地点以及名古屋、京都、大阪出发"],
  ["只买一日通票", "按日期 ¥6,000 – ¥7,900", "不限次数乘坐；不含交通"],
  ["优先券（富士急的快速通行）", "按设施与时段而定；各年龄同价", "缩短一项设施的排队时间；仍需一日通票或单次乘坐券。3 天前 18:00 起在线发售"],
];

const hoursRows = [
  ["简答", "9:00 或 10:00 开园，17:00 – 20:00 闭园", "营业时间按日期而不同，出发前请查看当月营业时间表"],
  ["2026 年 11 月", "9:00 – 18:00 / 19:00 / 20:00", "11 月 30 日 10:00 – 17:00；11 月没有休园日"],
  ["2026 年 12 月工作日（至 25 日）", "10:00 – 17:00", "12 月 10 日（周四）休园"],
  ["2026 年 12 月周末", "9:00 – 18:00", "12 月 5–6 日、12–13 日、19–20 日"],
  ["2026 年 12 月 26 – 30 日", "9:00 – 19:00", "12 月 31 日 9:00 营业至次日 1:00"],
  ["因施工暂停运营的设施", "—", "Tentekomai 2026 年 10 月 5 日至 2027 年 7 月下旬（预定）；摩天轮 2026 年 11 月 9 日至 2027 年 1 月 31 日；Red Tower 暂停中"],
];

// Under the price table: the bus bundle and bus seat, the lakes tour and a night at the lake.
const priceTableCards: KlookSameDayCard[] = [
  {
    label: "富士急乐园 Q Pack（一日通票 + 高速巴士）",
    ctaLabel: "在 Klook 查看富士急 Q Pack →",
    url: QPACK_URL,
    kind: "一日通票 + 巴士",
    why: "一日通票加上新宿或上野出发的往返高速巴士，合在一张电子凭证上，可以用中文界面结账。",
  },
  {
    label: "东京–富士山高速巴士",
    ctaLabel: "查看富士山高速巴士 →",
    url: klookFor(tokyoMtFujiHighwayBus.url, LOCALE),
    kind: "巴士",
    why: "只买座位，适合按次付费或到园内再买一日通票的人。这趟巴士停靠富士急乐园与河口湖。",
  },
  {
    label: "河口湖与山中湖温泉一日巴士游（东京出发）",
    ctaLabel: "查看河口湖巴士一日游 →",
    url: klookFor(kawaguchikoYamanakakoBusTour.url, LOCALE),
    kind: "一日游",
    why: "适合同行者中比起玩设施更想看湖景的人：在富士山同一侧，跟着导游坐巴士玩一天。",
  },
  {
    label: "富士河口湖酒店",
    ctaLabel: "查看富士河口湖酒店 →",
    url: klookFor(fujikawaguchikoHotels.url, LOCALE),
    kind: "酒店",
    why: "新宿出发的巴士在乐园之后的下一站就是河口湖站，在湖边住一晚，就能把一天的乐园行程延长成两天。",
  },
];

const whoFor = [
  {
    title: "适合买 Toku-Q Pack / Q Pack 的情况",
    desc: "你从东京出发、没有开车。两者都把一日通票和往返高速巴士合在一起，整天行程只需购票一次而不是三次，而且巴士直接开到乐园自己的巴士站，不需要在车站再换乘。",
  },
  {
    title: "只买一日通票的情况",
    desc: "你已经在富士五湖一带，或者坐火车前往，而且会玩 4 项以上大型过山车。成人一日通票 ¥6,000 至 ¥7,900；大型过山车每次 ¥2,000，玩 4 次就是 ¥8,000。",
  },
  {
    title: "只入园的情况",
    desc: "你的重点不是游乐设施。富士急免费入园，可以在园内售票机按设施付费。如果是为了富士山景色、火影忍者与托马斯区域，或者只想玩一两项过山车，这是合适的做法。",
  },
];

const steps = [
  {
    title: "先了解入园免费，一日通票是用来玩设施的",
    desc: `富士急官方票价页面写明乐园免费入园，乘坐券在园内售票机发售。所以要决定的不是要不要买门票，而是买一日通票还是按次付费。${CHECKED}确认。`,
  },
  {
    title: "查看你出发当天的票价，而不是最低价",
    desc: `票价按日期而定：成人一日通票 ¥6,000 至 ¥7,900，13:00 起可用的午后通票 ¥4,100 至 ¥6,000。富士急公布每月票价表，做预算前请先查实际前往日期的价格。${CHECKED}确认。`,
  },
  {
    title: "买一日通票之前，先决定交通方式",
    desc: "套票与单买一日通票的区别就在这里。Toku-Q Pack 与 Klook 的 Q Pack 含东京出发的往返高速巴士，单买一日通票则不含。如果坐火车前往（JR 到大月，再换乘富士急行线到富士急乐园站），只买一日通票就够了。",
  },
  {
    title: "查看当天的营业时间与暂停运营的设施",
    desc: `营业时间按日期而不同：12 月大多数工作日 10:00 至 17:00，12 月周末 9:00 至 18:00，每月页面也会列出每天暂停运营的设施。Tentekomai 因施工暂停运营至 2027 年 7 月下旬。${CHECKED}确认。`,
  },
];

// The first five go into FAQPage, as on the English page.
const faqItems: FaqItem[] = [
  {
    q: "2026 年富士急乐园门票多少钱？",
    a: `富士急乐园免费入园，要花钱的是玩设施：一日通票 18–64 岁成人 ¥6,000 至 ¥7,900、初中生与高中生 ¥5,500 至 ¥7,400、小学生 ¥4,400 至 ¥5,100、1 岁以上幼儿与 65 岁以上长者 ¥2,100 至 ¥2,600。13:00 起可用的午后通票成人 ¥4,100 至 ¥6,000。大型过山车乘坐一次 ¥2,000。以上为${CHECKED}在 fujiq.jp 确认的票价。`,
  },
  {
    q: "富士急乐园免费入园吗？",
    a: `是的。官方票价页面写明富士急乐园免费入园（免费入园券 ¥0），游客在园内售票机购买乘坐券。同行者中不玩设施的人可以免费入园，看看乐园与富士山景色。${CHECKED}确认。`,
  },
  {
    q: "富士急一日通票（Free Pass）值得买吗？还是按次付费更好？",
    a: `数一数要玩几项大型过山车。Fujiyama、Takabisha、Eejanaika、ZOKKON 与 Attack on Titan THE RIDE 每次 ¥2,000，玩 3 项是 ¥6,000，等于一日通票的最低价；玩 4 项是 ¥8,000，比任何日期的一日通票（¥6,000 至 ¥7,900）都贵。玩 4 项以上就买一日通票，只玩一两项就按次付费。乘坐价格为${CHECKED}在 fujiq.jp 确认。`,
  },
  {
    q: "Toku-Q Pack 是什么？",
    a: `富士急自己的套票：往返富士急乐园的直达高速巴士加上一日通票，从东京、静冈周边 30 多个地点以及名古屋、京都、大阪出发，价格按出发地而定。从新宿高速巴士总站（Busta 新宿）出发的 Super Toku-Q Pack 另含 9:00 至 10:00 之间一项过山车的优先乘坐一次，成人 ¥11,100、初高中生 ¥10,700、小学生 ¥7,100。${CHECKED}在 fujiq.jp 与 bus.fujikyu.co.jp 确认。`,
  },
  {
    q: "富士急乐园有快速通行券吗？",
    a: `有，富士急称为优先券（Priority Ticket）。可以缩短清单上一项热门设施的排队时间，价格按设施与时段而定，各年龄同价，从 3 天前 18:00 起在线发售至使用时段前 60 分钟，数量有限。你仍需另外持有一日通票或乘坐券。另一种可在开园前入园的优先入园一日通票，2026 年 12 月 1 日至 2027 年 2 月 5 日不发售。${CHECKED}确认。`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "从新宿怎么去富士急乐园？",
    a: `从新宿高速巴士总站（Busta 新宿）坐富士急高速巴士，到富士急乐园站约 1 小时 40 分钟，成人 ¥2,200 起（在线购票 ¥2,000）；堵车时会更久。富士急乐园是河口湖站的前一站。Toku-Q Pack 与 Klook 的 Q Pack 都把往返巴士和一日通票合在一起。巴士时间为${CHECKED}在富士急巴士网站确认。`,
  },
  {
    q: "富士急乐园门票可以在哪里提前购买？",
    a: `富士急官方在线售票网站发售一日通票、午后通票、托马斯乐园通票与仅限在线购买的优先入园一日通票；Klook 发售一日通票与含巴士的 Q Pack。Toku-Q Pack 在富士急官方在线网站与富士急客服中心发售。官方门票购买后不能退票，也不能更改人数或年龄类别。${CHECKED}确认。`,
  },
  {
    q: "富士急乐园的营业时间是几点？",
    a: `按日期而不同。2026 年 11 月 9:00 开园，18:00 至 20:00 之间闭园；12 月大多数工作日 10:00 至 17:00、周末 9:00 至 18:00，12 月 10 日休园。富士急会公布每月营业时间表与每天暂停运营的设施。${CHECKED}在 fujiq.jp 确认。`,
  },
  {
    q: "富士急乐园有哪些代表性的过山车？",
    a: "号称“King of Coasters”的 Fujiyama、四次元超级过山车 Eejanaika、号称最陡的过山车 Takabisha，以及 ZOKKON，每次都是 ¥2,000。空中过山车 Tentekomai 因兴建新设施，2026 年 10 月 5 日至 2027 年 7 月下旬（预定）暂停运营。园内也有以火影忍者（NARUTO）、托马斯小火车与 San-X 角色为主题的区域。",
  },
  {
    q: "在富士急乐园能看到富士山吗？",
    a: "乐园位于河口湖附近的富士山脚下，天气晴朗时富士山就在乐园背后。和富士五湖其他地方一样，能不能看到取决于天气，比起盛夏，凉爽干燥的季节机会更高。请把它当作挑选晴天预报的理由，而不是保证一定能看到。",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "新宿周边酒店",
    ctaLabel: "在 Klook 查看新宿酒店 →",
    url: klookFor(tokyoStayAreas[0].url, LOCALE),
    why: "去河口湖的高速巴士在新宿上车，住在新宿的话，一早去乐园的巴士走路就能到巴士站。",
  },
  {
    label: "河口湖与山中湖温泉一日巴士游（东京出发）",
    ctaLabel: "查看河口湖巴士一日游 →",
    url: klookFor(kawaguchikoYamanakakoBusTour.url, LOCALE),
    why: "同一条路线上的湖区，由导游带你从东京玩一天；如果湖景和过山车一样重要，可以排在乐园前后一天。",
  },
  {
    label: "富士山与箱根一日游（东京出发）",
    ctaLabel: "查看一日游 →",
    url: klookFor(fujiHakoneDayTour.url, LOCALE),
    why: "从东京一天看富士山的另一种方式，同一辆巴士也会去箱根，适合同行者中想跳过游乐设施的人。",
  },
  {
    label: "成田机场利木津巴士",
    ctaLabel: "查看利木津巴士 →",
    url: klookFor(naritaLimousineBus.url, LOCALE),
    why: "可以放大件行李、开往东京市中心各站的机场巴士，抵达日本当天就能直接到之后去乐园的酒店；请先确认停靠站列表。",
  },
];

const parkPicks = [
  withKlookLocale(fujiQHighlandQPack, LOCALE, {
    title: "富士急乐园 Q Pack（一日通票 + 高速巴士）",
    desc: "不限次数乘坐的一日通票加上新宿或上野出发的往返高速巴士，整天行程只需购票一次",
  }),
  withKlookLocale(fujiQHighlandPass, LOCALE, {
    title: "富士急乐园一日通票（Free Pass）",
    desc: "只买一日通票，适合自己前往河口湖的人",
  }),
  withKlookLocale(fujiQHighlandAdmission, LOCALE, {
    title: "富士急乐园入园券",
    desc: "只入园、不含一日通票，适合为了富士山景色与主题区域前往的人",
  }),
];

const transportPicks = [
  withKlookLocale(tokyoMtFujiHighwayBus, LOCALE, {
    title: "东京–富士山高速巴士",
    desc: "从东京直达河口湖、富士急乐园与富士山站的巴士，买的是座位而不是旅游团",
  }),
  withKlookLocale(mtFujiPass, LOCALE, {
    title: "Mt. Fuji Pass（1、2 或 3 日）",
    desc: "富士五湖周边巴士与电车不限次数乘坐，含缆车与游湖船，适合不跟团的自由行旅客",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "富士急乐园门票" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows, boldFirst = false }: { head: string[]; rows: ReactNode[][]; boldFirst?: boolean }) {
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
              <tr key={r} style={boldFirst && r === 0 ? { fontWeight: 700 } : undefined}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
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

const checkedLine = (...urls: string[]) => `最后确认：${LAST_CHECKED}。资料来源：${urls.join("、")}`;

export default function ZhCnFujiQHighlandTicketsPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.heroSubtitle}>
            入园免费，你花钱买的是乘坐设施的权利。一日通票、把一日通票和巴士合在一起的 Toku-Q Pack，或每项过山车 ¥2,000 的单次券，哪一种更便宜，取决于你想玩几项设施。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "官方票价", "免费入园"].map((t) => (
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
            <strong>富士急乐园免费入园，一日通票（Free Pass）成人按日期 ¥6,000 至 ¥7,900。</strong>大型过山车 Fujiyama、Takabisha、Eejanaika 与 ZOKKON 每次 ¥2,000，所以<strong>如果会玩 4 项以上，就买一日通票</strong>；只玩一两项就按次付费。从新宿高速巴士总站（Busta 新宿）出发的 Super Toku-Q Pack，把往返巴士、一日通票与一次优先乘坐合在一张票上，成人 ¥11,100。以上为{CHECKED}在 fujiq.jp 确认的票价。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>入园</p>
                <p className={styles.verdictStatValue}>免费</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>一日通票（成人）</p>
                <p className={styles.verdictStatValue}>¥6,000 – ¥7,900</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>大型过山车一次</p>
                <p className={styles.verdictStatValue}>¥2,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>从东京出发</p>
                <p className={styles.verdictStatValue}>Toku-Q / Q Pack（一日通票 + 巴士）</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>简单来说：</strong>不用买入园门票，入园是免费的。会玩 4 项以上大型过山车就买一日通票，午饭后才到就买午后通票，或者什么都不买，在园内售票机按次付费。从东京出发又没有开车，请购买附往返巴士的一日通票：富士急的 Toku-Q Pack 或 Klook 的 Q Pack。以上为{CHECKED}在 fujiq.jp 确认的票价。
            </p>
            <KlookLink href={QPACK_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              在 Klook 查看富士急 Q Pack →
            </KlookLink>
          </div>
        </div>

        <HotelStayBlock city="kawaguchiko" areas={["fujiQ", "kawaguchikoStation", "lakeKawaguchi"]} />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>富士急乐园门票多少钱？</h2>
          <p className={styles.bodyText}>
            入园免费；一日通票成人按日期 ¥6,000 至 ¥7,900，大型过山车每次 ¥2,000。富士急发售的所有票种与内容如下：
          </p>
          <Table head={["票种", "成人票价", "内容"]} rows={priceRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.ticket, OFFICIAL.rides)}
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            各年龄的一日通票与午后通票票价
          </h3>
          <Table head={["年龄类别", "一日通票", "午后通票（13:00 起）"]} rows={ageRows} />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            乐园按日期定价并公布每月票价表，请查看你前往日期的价格。幼儿可以在线购买二维码门票，或当天在售票处购买。
          </p>
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.ticket)}
          </p>
        </section>

        <KlookSameDayCards
          heading="安排乐园这一天：附巴士的一日通票、只买巴士、湖区一日游，或在湖边住一晚"
          cards={priceTableCards}
          footnote={
            <>
              想找客房能看到富士山的湖畔旅馆，请看<Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" hrefLang="en">河口湖富士山景观旅馆（英文）</Link>。
            </>
          }
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>入园</span>
          <h2 className={styles.sectionTitle}>富士急免费入园吗？</h2>
          <p className={styles.bodyText}>
            是的。富士急乐园官方票价页面写明乐园免费入园：免费入园券 ¥0，可以在售票处或在线申请，之后每项设施都用园内售票机购买的乘坐券付费，或使用一日通票乘坐。这在日本大型乐园中很少见，对成员喜好不同的团体很实用：不玩设施的人可以免费入园，欣赏富士山景色以及火影忍者、托马斯乐园与 San-X 区域。{CHECKED}确认。
          </p>
          <p className={styles.bodyText}>
            乐园的主角是过山车：号称“King of Coasters”的 Fujiyama、四次元的 Eejanaika、陡降的 Takabisha，以及 ZOKKON。空中过山车 Tentekomai 因兴建新设施，2026 年 10 月 5 日至 2027 年 7 月下旬（预定）暂停运营。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>一日通票或按次付费</span>
          <h2 className={styles.sectionTitle}>富士急一日通票与按次付费，哪个更便宜？</h2>
          <p className={styles.bodyText}>
            从第 4 项大型过山车起，一日通票更便宜：4 次 ¥2,000 共 ¥8,000，高于一日通票最高价 ¥7,900；3 次是 ¥6,000，等于最低价。官方设施价目表的乘坐价格如下：
          </p>
          <Table head={["设施", "每次价格", "备注"]} rows={rideRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.rides)}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Toku-Q Pack</span>
          <h2 className={styles.sectionTitle}>Toku-Q Pack 是什么？</h2>
          <p className={styles.bodyText}>
            Toku-Q Pack 是富士急的套票，内容是往返富士急乐园的直达高速巴士加上一日通票，价格按出发地而定。从新宿高速巴士总站出发的 Super Toku-Q Pack 另含 9:00 至 10:00 之间一项过山车的优先乘坐一次，成人 ¥11,100。比较一下：新宿巴士在线购票（单程 ¥2,000）再另外买一日通票，按日期合计 ¥10,000 至 ¥11,900。
          </p>
          <Table head={["选项", "价格", "内容"]} rows={compareRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.superTokuQ, OFFICIAL.tokuQ, OFFICIAL.priority, OFFICIAL.bus)}
          </p>
          <p className={styles.bodyText}>
            优先券是乐园的快速通行券：可以缩短富士急列表上一项设施（包括 Fujiyama、ZOKKON、Takabisha 与 Eejanaika）的排队时间，各年龄同价，数量有限，每次最多购买 10 张；从 3 天前 18:00 起在线发售至使用时段前 60 分钟，或当天在各设施旁的售票机购买。优先券不能代替一日通票，你仍需一日通票或乘坐券。{CHECKED}确认。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>票种选择</span>
          <h2 className={styles.sectionTitle}>Toku-Q Pack、一日通票，还是什么都不买？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>提前购票</span>
          <h2 className={styles.sectionTitle}>富士急门票可以在哪里提前购买？</h2>
          <p className={styles.bodyText}>
            两个购票渠道：富士急官方在线售票网站或 Klook。官方网站发售指定日期的一日通票、午后通票与托马斯乐园通票，另有仅限在线购买的优先入园一日通票与虚拟排队一日通票（发售至前一天）。Toku-Q Pack 在同一个官方网站或富士急客服中心发售。官方门票购买后不能退票，也不能更改人数或年龄类别；Sunset★Night Pass 只在当天 16:00 起于园内发售。{CHECKED}确认。
          </p>
          <p className={styles.bodyText}>
            Klook 发售一日通票、入园券与 Q Pack（一日通票加上新宿或上野出发的往返高速巴士），可以用中文界面结账。这一天也能排进东京一周的行程：<Link href="/guides/attractions/tokyo-7-day-itinerary" hrefLang="en">东京 7 天行程（英文）</Link>把富士山之旅排在第 6 天，<Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en">日本景点门票价格表（英文）</Link>则把富士急和其他大型乐园放在一起比较。
          </p>
        </section>

        <KlookTourPicks
          heading="Klook 上的三种富士急商品，按推荐顺序"
          intro="三种都是同一座乐园，区别在于价格是否含交通与游乐设施。从东京出发选 Q Pack，坐火车前往选一日通票，如果是为了景色和主题区域而不是过山车，就选入园券。"
          tours={parkPicks}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>住宿</span>
          <h2 className={styles.sectionTitle}>Highland Resort Hotel &amp; Spa 值得住吗？</h2>
          <p className={styles.bodyText}>
            如果你想在一日游客到达前就玩上过山车，就值得住。Highland Resort Hotel &amp; Spa 是富士急的官方酒店，与乐园直接相连，正前方就是富士山。富士急列出官方酒店住客的两项优惠：优先入园（这段时间只有部分设施运营），以及住宿期间代为保管行李。高速巴士站就在酒店停车场内，酒店有托马斯与火影忍者主题客房，角落生物主题客房于 11 月 28 日开业。{CHECKED}确认。
          </p>
          <p className={styles.bodyText}>
            如果景色与温泉比一早玩设施更重要，再往前一站就是河口湖，<Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" hrefLang="en">河口湖富士山景观旅馆（英文）</Link>比较了那里的 6 家旅馆。带孩子旅行的话，<Link href="/guides/attractions/tokyo-itinerary-with-kids" hrefLang="en">东京亲子行程（英文）</Link>说明了一日出游可以排在迪士尼与室内行程之间的哪个位置。
          </p>
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.hotel)}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>营业时间</span>
          <h2 className={styles.sectionTitle}>富士急乐园的营业时间是几点？</h2>
          <p className={styles.bodyText}>
            富士急按日期在 9:00 或 10:00 开园，17:00 至 20:00 之间闭园，偶尔也有休园日，2026 年是 12 月 10 日。
          </p>
          <Table head={["时期", "营业时间", "备注"]} rows={hoursRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.hours)}
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>富士急乐园门票购票步骤</h2>
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

        <BookingEsimCard lead="富士急门票买好了？出发前先准备好上网方式。" />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>从东京怎么去富士急乐园？</h2>
          <p className={styles.bodyText}>
            从新宿高速巴士总站（Busta 新宿）坐富士急高速巴士，到富士急乐园站约 1 小时 40 分钟，成人 ¥2,200 起（在线购票 ¥2,000），堵车时会更久。高速巴士的终点是乐园旁 Highland Resort Hotel &amp; Spa 停车场内的巴士站。坐火车的话，先坐 JR 到大月，再换乘富士急行线到富士急乐园站。{checkedLine(OFFICIAL.bus)}
          </p>
          <p className={styles.bodyText}>
            正因为有这个区别，才会有含巴士的套票，而一日往返通常也是套票更划算：巴士在乐园门口下车、回程也从那里上车，不需要配合大月的换乘时间。如果想保留弹性，<Link href="/guides/attractions/mt-fuji-day-trip-tokyo" hrefLang="en" style={textLink}>富士山自由行一日游（英文）</Link>介绍不含乐园门票的同一条路线，<Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" hrefLang="en" style={textLink}>东京出发河口湖一日游（英文）</Link>介绍再往前一站的湖区，<Link href="/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo" style={textLink}>东京出发富士山一日游比较</Link>则适合同行者中想去五合目的人。
          </p>
        </section>

        <KlookTripPrep
          label="同一天一起预订"
          heading="富士急这一天，还值得预订什么？"
          intro="乐园门票决定了这一天的行程，出发的住宿区域与乐园两侧的湖区，是这趟旅程需要的其他预订。"
          items={tripPrepItems}
        />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="富士急乐园常见问题" />

        <KlookTourPicks
          heading="不买 Q Pack 的交通方式"
          intro="如果你已经有一日通票，或者比起过山车更想游览富士五湖，这两项就能解决交通：高速巴士停靠富士急乐园与河口湖，周游券则可在抵达后乘坐当地巴士与电车。"
          tours={transportPicks}
        />

        <p className={styles.bodyText}>
          富士急巴士的出发地新宿，也是<Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en">东京住宿区域攻略（英文）</Link>推荐给第一次去东京的旅客的住宿区域。
        </p>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            还想多看看乐园周边的湖区吗？富士急的<Link href="/guides/transport/mt-fuji-pass" hrefLang="en" style={linkStyle}>Mt. Fuji Pass（英文）</Link>可在 1 至 3 天内乘坐富士山周边的巴士与电车。
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            附近的河口湖畔有往返 ¥1,200 的<Link href="/guides/attractions/mt-fuji-panoramic-ropeway-tickets" hrefLang="en" style={linkStyle}>富士山全景缆车（英文）</Link>，以及工作日 ¥1,800 的<Link href="/guides/attractions/kawaguchiko-music-forest-museum-tickets" hrefLang="en" style={linkStyle}>河口湖音乐盒之森美术馆（英文）</Link>。
          </p>
        </section>
        <EsimCtaBottom />

        <Related
          items={[
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "东京出发河口湖一日游（2026）：路线、车费与一天能玩什么（英文）" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "东京出发富士山自由行一日游（2026）（英文）" },
            { href: "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "东京出发富士山一日游比较" },
            { href: "/zh-cn/guides/attractions/tokyo-disney-tickets", title: "东京迪士尼门票：票价与购票方式" },
            { href: "/zh-cn/guides/attractions/usj-tickets-express-pass", title: "日本环球影城门票与快速通行证" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "三丽鸥彩虹乐园门票（2026）：票价与购票方式（英文）" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "东京塔门票（2026）：票价与购票方式（英文）" },
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京必去景点：哪些要提前订、哪些直接去" },
            { href: "/zh-cn/guides/attractions", title: "更多日本景点门票攻略" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>整天行程一次购票</h2>
            <p className={styles.ctaBannerDesc}>
              Q Pack 把一日通票与新宿或上野出发的往返高速巴士合在一张电子凭证上，可以用中文界面结账，不需要分别准备巴士与一日通票就能一日往返。
            </p>
            <KlookLink href={QPACK_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看富士急 Q Pack →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
