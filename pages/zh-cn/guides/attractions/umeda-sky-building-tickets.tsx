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
import {
  osakaAmazingPass,
  osakaCastleUmedaTonboriDayTour,
  osakaNaniWonderNightBusTour,
  osakaPrivateWalkingTour,
  umedaSkyBuildingTicket,
  umedaSkySameDayPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/umeda-sky-building-tickets) section by section
// as of 2026-11-25 (task-jtk-20261125-TR01): same sections, tables, FAQ and Klook CTAs in the
// same places. Every figure, date and source is the English page's; nothing is added.
// Title term: 梅田蓝天大厦 — the name osaka-info.jp's Simplified Chinese spot page, Klook zh-CN
// and Simplified Chinese guides use; the observatory is 空中庭园观景台. The pass is 大阪周游卡,
// as on the Simplified Chinese Dotonbori page.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/umeda-sky-building-tickets";
const TITLE = "梅田蓝天大厦门票 2026：票价、开放时间与日落";
const H1 = "梅田蓝天大厦门票 2026：空中庭园观景台票价、开放时间与日落时间";
const DESC =
  "梅田蓝天大厦空中庭园观景台门票：成人 ¥2,000、4–12 岁 ¥500，9:30–22:30 开放，22:00 停止入场。大阪周游卡限 15:00 前免费。";

const LAST_CHECKED_ISO = "2026-11-19";
const LAST_CHECKED = dateLabel(LAST_CHECKED_ISO, LOCALE);
const CHECKED_ISO = "2026-11-03";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const OFFICIAL_URL = "https://www.skybldg.co.jp/en/observatory/";
const HARUKAS_URL = "https://www.abenoharukas-300.jp/observatory/ticket/";
const NAOJ_URL = "https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s2811.html";
// The pass price is owned by lib/attraction-prices.ts, shared with the English page.
const PASS_1_DAY = priceLabel(PRICES.osakaAmazingPass.adult, LOCALE);

const TICKET_URL = klookFor(umedaSkyBuildingTicket.url, LOCALE);
const PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const NIGHT_BUS_URL = klookFor(osakaNaniWonderNightBusTour.url, LOCALE);
const DAY_TOUR_URL = klookFor(osakaCastleUmedaTonboriDayTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  {
    tier: "成人",
    price: "¥2,000",
    what: "39 楼售票处的票价，可用现金或信用卡支付。运营方的日文官网还通过 asoview 销售价格更优惠的指定日期网上门票，但未标明具体价格",
  },
  { tier: "儿童（4–12 岁）", price: "¥500", what: "是成人票价的四分之一，在大阪各观景台的儿童票价中属于少见的低价" },
  { tier: "未满 4 岁", price: "免费", what: "不需要门票" },
  { tier: "持残疾证明的游客", price: "¥1,000／¥250", what: "成人／4–12 岁，出示证明后在观景台售票处购票" },
  { tier: "10 人以上团体", price: "¥1,800／¥450", what: "成人／4–12 岁，在 39 楼售票处办理" },
  {
    tier: "持大阪周游卡，15:00 前入场",
    price: "免费",
    what: "持周游卡可免费入场一次。大阪周游卡是否划算，取决于你能否在该免费时段内入场",
  },
  {
    tier: "持大阪周游卡，15:00 起入场",
    price: "9 折",
    what: "成人约 ¥1,800。看日落或夜景时，不能用周游卡免费入场",
  },
];

const floorRows = [
  { floor: "RF（屋顶）", what: "360 度露天观景层；日文官网还将 Lumi Sky Walk 列为该楼层的设施", ticket: "需要，大雨时可能关闭" },
  { floor: "40F", what: "室内楼层，有咖啡馆 SKY 40 和沿窗的吧台座位", ticket: "需要" },
  { floor: "39F", what: "售票处、纪念品店、中餐厅 Sangu、Sky Lounge Stardust", ticket: "售票处和商店所在楼层" },
  { floor: "35F–39F", what: "穿过两栋大楼之间的空间、通往观景台的路线", ticket: "从观景台专用入口上楼，不要乘坐通往办公楼层的电梯" },
  { floor: "B1F–1F", what: "泷见小路：昭和怀旧风格的餐厅与商店街，另有 ATM 和邮局", ticket: "不需要" },
];

const hoursRows = [
  { what: "观景台开放时间", when: "9:30 – 22:30" },
  { what: "停止入场", when: "22:00" },
  { what: "休息日", when: "运营方官网未公布固定休馆日；淀川烟花大会等特殊开放日需要购买特别门票，并按当天的特别开放时间运营" },
  { what: "恶劣天气", when: "大雨时露天屋顶可能关闭；39 楼和 40 楼是室内" },
  { what: "大阪周游卡免费入场", when: "仅限 9:30 – 15:00；15:00 至 22:00 为 9 折" },
  { what: "建议游览时间", when: "1 – 2 小时（Klook 商品页面提供的预计游览时间）" },
];

const sunsetRows = [
  { date: "11 月 – 2 月", sunset: "16:47 – 17:53", note: "冬季请按日期在约 16:00 至 17:15 之间入场，各日期见下表" },
  { date: "11 月 1 日", sunset: "17:05", note: "约 16:30 前入场" },
  { date: "11 月 15 日", sunset: "16:54", note: "约 16:15 前入场" },
  { date: "11 月 30 日", sunset: "16:47", note: "11 月底至 12 月初是一年中日落最早的时期" },
  { date: "12 月 1 日", sunset: "16:47", note: "黄金时段在下午中段开始，落在周游卡 15:00 前的免费时段内" },
  { date: "12 月 15 日", sunset: "16:49", note: "约 16:10 前入场" },
  { date: "12 月 31 日", sunset: "16:57", note: "约 17:30 天黑，到闭馆前还有 5 小时可以看夜景" },
  { date: "1 月 1 日", sunset: "16:58", note: "约 16:15 前入场（2026 年表）" },
  { date: "1 月 15 日", sunset: "17:10", note: "约 16:30 前入场（2026 年表）" },
  { date: "2 月 1 日", sunset: "17:27", note: "约 16:45 前入场（2026 年表）" },
  { date: "2 月 15 日", sunset: "17:41", note: "约 17:00 前入场（2026 年表）" },
  { date: "2 月 28 日", sunset: "17:53", note: "约 17:10 前入场（2026 年表）" },
  { date: "3 月 31 日", sunset: "18:18", note: "樱花季，是大阪一年中游客最多的两周" },
  { date: "7 月 1 日", sunset: "19:15", note: "一年中日落最晚的日子，请在 18:30 前入场" },
  { date: "9 月 1 日", sunset: "18:25", note: "屋顶气候温暖，黄昏持续时间较长，最容易安排日落观景" },
  { date: "9 月 30 日", sunset: "17:44", note: "日落已经提前到 18:00 之前，而且日落时间还在迅速提前" },
];

const choiceRows = [
  {
    situation: "白天前往，同一天还要去至少两处其他收费景点",
    pick: "大阪周游卡，15:00 前进入观景台",
    why: "观景台（¥2,000）、大阪城（¥1,200）和 HEP FIVE 摩天轮（¥1,000）加起来超过周游卡价格；15:00 后周游卡在这里只能打 9 折",
  },
  {
    situation: "主要想看日落或夜景，当天不安排其他收费景点",
    pick: "单买一张观景台门票，柜台或网上均可",
    why: "没有入场时段，也不会售罄，所以提前网上购票的好处是可以使用中文购票页面和日本境外发行的银行卡，而不是确保入场",
  },
  {
    situation: "在大阪的第一天，想看大阪城、观景台和道顿堀，又不想自己规划路线",
    pick: "包含梅田蓝天大厦的导游带队一日游",
    why: "只需前往一个集合地点，完成一次预订；付款前请在商品页确认游览地点和取消期限",
  },
];

const deckRows = [
  {
    deck: "梅田蓝天大厦（空中庭园）",
    height: "173 米：39 楼、40 楼和露天屋顶",
    price: "成人 ¥2,000／4–12 岁 ¥500",
    hours: "9:30 – 22:30（22:00 停止入场）",
    area: "梅田：JR 大阪站步行 7 分钟",
    pass: "15:00 前凭大阪周游卡免费，之后 9 折",
  },
  {
    deck: "HARUKAS 300（阿倍野 HARUKAS）",
    height: "运营方称为日本最高大楼的顶部楼层，58 楼设有露天观景空间",
    price: "售票处成人 ¥2,200／儿童 ¥900；网上预购 ¥1,980／¥810",
    hours: "9:00 – 22:00（21:30 停止入场）",
    area: "天王寺：位于近铁大阪阿部野桥站正上方",
    pass: "不属于大阪周游卡适用设施",
  },
  {
    deck: "通天阁",
    height: "新世界的地标塔",
    price: "成人（15 岁以上）¥1,500（12 月 30 日至 1 月 3 日为 ¥1,800）",
    hours: "9:00 – 21:45（21:15 停止入场）",
    area: "新世界：惠美须町／动物园前",
    pass: "凭大阪周游卡免费，但需要到现场预约入场时段",
  },
];

const whoFor = [
  {
    title: "适合在 15:00 前游览的情况",
    desc: `你持有大阪周游卡。周游卡的免费入场到 15:00 为止，之后只有 9 折，原本免费的入场将变为约 ¥1,800。想用周游卡免费参观这座观景台，只能在上午或下午早些时候前往。${CHECKED}核实。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "适合在日落时分游览的情况",
    desc: "你想看大阪其他观景台都没有的景色：在无遮蔽的 360 度露天环形屋顶上，看着城市灯光亮起。日落前 30 至 45 分钟入场，凭一张门票，就能欣赏白天景色、黄金时段的景色和夜景。大阪的日落时间一年内相差将近两个半小时，请先查看下方的日落表。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "适合较晚时段游览的情况",
    desc: `你希望人少一些。观景台开到 22:30、22:00 停止入场，比 HARUKAS 300 和通天阁都晚，即使在盛夏，日落后也还有两个多小时。21:00 入场，景色一样，人却少得多，此时仍可在现场售票处购票。开放时间于${CHECKED}核实。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "先决定时间，再决定门票",
    desc: "选择门票前，首先要确定游览时间。15:00 前，大阪周游卡可以免费入场；日落时则不行。日落时段的游览体验更好，用周游卡则更便宜，但两者无法兼得，请先决定你要优先哪一个。",
  },
  {
    title: "查询出行当天的日落时间",
    desc: "大阪的日落时间从 12 月初的 16:47 到 7 月初的 19:15，相差将近两个半小时，也决定了黄金时段是在下午还是 19:00 左右。下方表格列出了全年各代表性日期的官方日落时间。",
  },
  {
    title: "需要中文支付页面或使用日本境外发行的银行卡时，再提前购票",
    desc: "这里没有入场时段，39 楼售票处可以用现金或信用卡购票，所以提前购票是为了方便，而不是为了确保能入场。运营方的日文官网通过 asoview 销售指定日期、更便宜的网上门票；Klook 则提供同款门票的中文购票页面，可以用日本境外发行的银行卡支付，并获取入场时使用的二维码电子门票。不同商品的取消政策有所不同，付款前请在你的订单页面确认。",
  },
  {
    title: "乘坐自动扶梯请额外预留 15 分钟",
    desc: "售票处在 39 楼，上楼要乘坐从 35 楼出发、横跨两栋大楼之间的透明自动扶梯。这部扶梯本身就是拍照点，也是这栋大楼出现在明信片上的原因，不妨把乘坐扶梯也当作游览的一部分。",
  },
  {
    title: "根据屋顶的室外环境准备衣物",
    desc: "最顶层是离地 173 米、头顶没有任何遮挡的 360 度露天环形观景台。一年四季，屋顶的风都比地面大，气温也更低，而且这一层没有遮风挡雨的地方；下一层的 40 楼是室内，沿窗有一条 35 米长的玻璃吧台。冬季建议多带一件外套，屋顶的风也可能吹乱头发。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "梅田蓝天大厦门票多少钱？",
    a: `梅田蓝天大厦门票成人 ¥2,000、4–12 岁儿童 ¥500，未满 4 岁免费。持残疾证明的游客 ¥1,000／¥250，10 人以上团体 ¥1,800／¥450。大阪周游卡在 9:30 至 15:00 可免费入场，15:00 至 22:00 为 9 折。以上为 skybldg.co.jp 官方票价，最后核实日期 ${LAST_CHECKED}。`,
  },
  {
    q: "梅田蓝天大厦什么时候开放？建议游览多长时间？",
    a: `空中庭园观景台开放时间为 9:30 至 22:30，22:00 停止入场，运营方官网未公布固定休馆日。建议预留 1 至 2 小时（Klook 商品页面提供的预计游览时间）。淀川烟花大会等特殊开放日需要购买特别门票并按当天的特别开放时间运营，大雨时露天屋顶可能关闭。开放时间最后核实日期 ${LAST_CHECKED}。`,
  },
  {
    q: "梅田蓝天大厦门票什么时候开售？",
    a: `没有开售日。观景台没有入场时段，39 楼售票处从 9:30 开始售票，直至 22:00 停止入场，期间均可购买当日门票，成人 ¥2,000、4–12 岁 ¥500。只有淀川烟花大会等特殊开放日，需要购买指定入场时段的特别门票。官网核实日期 ${LAST_CHECKED_ISO}。`,
  },
  {
    q: "梅田蓝天大厦需要提前预订吗？",
    a: "不需要。这里没有入场时段，39 楼售票处销售当日门票。提前购票是为了方便：通过运营方英文官网提供链接的 Klook，可以用中文支付页面和日本境外发行的银行卡付款。人最多的是日落前 1 小时，以及周游卡免费入场时段于 15:00 结束之前；人最少的是上午中段和 21:00 以后。如果你持有大阪周游卡并在 15:00 前到达，就无须另外购买观景台门票。",
  },
  {
    q: "梅田蓝天大厦的日落时间是几点？",
    a: "根据日本国立天文台 2026 年大阪日落表，11 月至 2 月大阪的日落时间在 16:47 至 17:53 之间：11 月 1 日 17:05、11 月 15 日 16:54、11 月 30 日和 12 月 1 日 16:47、12 月 31 日 16:57、1 月 15 日 17:10、2 月 15 日 17:41。夏季最晚到 19:15（7 月 1 日）。日落前 30 至 45 分钟入场，凭一张门票，就能欣赏白天景色、黄金时段的景色和夜景。",
  },
];

const tripPrepItems = [
  withKlookLocale(umedaSkySameDayPrep[0], LOCALE, {
    label: "大阪美食导览",
    ctaLabel: "查看大阪美食导览 →",
    why: "参观观景台后的晚间行程：从梅田乘御堂筋线到难波，在道顿堀主街附近的小巷中进行三小时的美食徒步游，品尝炸串、章鱼烧和当地甜点，探访隐蔽的居酒屋。该行程为拼团游。",
  }),
  withKlookLocale(umedaSkySameDayPrep[1], LOCALE, {
    label: "大阪梅田酒店",
    ctaLabel: "查看梅田酒店 →",
    why: "观景台开到 22:30，住在大阪站周边，晚上参观后步行几分钟就能回到住处。",
  }),
  withKlookLocale(umedaSkySameDayPrep[2], LOCALE, {
    label: "HARUKA 特急（关西机场 ⇄ 大阪）",
    ctaLabel: "查看 HARUKA 车票 →",
    why: "从关西机场直达大阪站，到站后即可步行前往观景台；根据 Klook 商品页说明，仅向持外国护照且护照上盖有「短期停留」入境章的旅客销售。",
  }),
  withKlookLocale(umedaSkySameDayPrep[3], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "Klook 提供可在手机上出示的电子门票，而从大阪站走过去的路上有一段地下通道，用手机流量看地图会更方便。",
  }),
];

const tourPicks = [
  withKlookLocale(osakaCastleUmedaTonboriDayTour, LOCALE, {
    title: "大阪城、梅田蓝天大厦与道顿堀游船一日游",
    desc: "由导游带队，一天游览大阪城、梅田观景台和道顿堀游船，路线由导游安排。",
  }),
  withKlookLocale(osakaPrivateWalkingTour, LOCALE, {
    title: "大阪私人半日／一日徒步导览",
    desc: "由提供英语或日语服务的专属导游陪同，按照你设定的路线游览难波和心斋桥一带。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "梅田蓝天大厦" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h || `blank-${i}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.86rem" }}>
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

function LastChecked({ url, label }: { url: string; label: string }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      最后核实：{LAST_CHECKED_ISO}。来源：<a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
    </p>
  );
}

export default function ZhCnUmedaSkyBuildingTicketsPage({ updated }: { updated: PageUpdated }) {
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
            这是一座位于梅田、距地面 173 米高的露天环形屋顶观景台，从大阪站步行 7 分钟即可到达。常规门票只有一种，也无须预约入场时段；但持大阪周游卡只能在 15:00 前免费入场，是否购买大阪周游卡，取决于你计划入场的时间。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "官方票价与核实日期", "大阪各季日落时间"].map((t) => (
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
            <span className={styles.verdictLabel}>关键信息速览</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>门票</p>
                <p className={styles.verdictStatValue}>成人 ¥2,000／儿童 ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>开放时间</p>
                <p className={styles.verdictStatValue}>9:30–22:30，22:00 停止入场</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>交通</p>
                <p className={styles.verdictStatValue}>从 JR 大阪站步行 7 分钟</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>大阪周游卡</p>
                <p className={styles.verdictStatValue}>仅限 15:00 前免费</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              梅田蓝天大厦（Umeda Sky Building）门票为<strong>成人 ¥2,000</strong>、<strong>4–12 岁儿童 ¥500</strong>，空中庭园观景台开放时间为<strong>9:30 至 22:30，22:00 停止入场</strong>（官网 skybldg.co.jp，{LAST_CHECKED_ISO} 核实）。门票无须等待开售，也无须预约入场时段，39 楼售票处当天就能用现金或信用卡购票，游览约需<strong>1 至 2 小时</strong>。<strong>持大阪周游卡仅可在 9:30 至 15:00 免费入场</strong>；11 月大阪的日落时间在 16:47 至 17:05 之间。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看梅田蓝天大厦门票 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                大阪周游卡 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>梅田蓝天大厦门票：票价、开放时间与购票方式</h2>
          <p className={styles.bodyText}>
            梅田蓝天大厦门票为<strong>成人 ¥2,000、4–12 岁儿童 ¥500</strong>，未满 4 岁免费。观景台开放时间为<strong>9:30 至 22:30，22:00 停止入场</strong>，游览全部三层约需 1 至 2 小时。冬季（11 月至 2 月）大阪的日落时间在<strong>16:47 至 17:53</strong>之间，想看日落，建议在 16:00 至 17:15 左右入场。
          </p>
          <p className={styles.bodyText}>
            你可以<strong>当天在 39 楼售票处</strong>购票，也可以<strong>提前在网上购票</strong>：运营方英文官网提供链接的 Klook（中文页面），或运营方在 asoview 平台销售的指定日期电子门票（日文）（{CHECKED}核实）。<strong>大阪周游卡在 9:30 至 15:00 可免费入场</strong>，15:00 至 22:00 可享 9 折，因此白天游览可以免费入场，日落时段则不能。周游卡在什么情况下划算，请看
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              大阪周游卡费用对比表（英文）
            </Link>
            。票价和开放时间于{LAST_CHECKED}在运营方官网核实。
          </p>
          <p className={styles.bodyText}>
            整座建筑由两栋高 173 米、共 40 层的大楼组成，顶部以环形结构相连，这也是它出现在每张大阪明信片上的原因。收费区域是<strong>空中庭园观景台</strong>，共有三层：购票和验票的<strong>39 楼</strong>、沿窗设有 35 米长玻璃吧台的室内<strong>40 楼</strong>，以及再往上、可以环绕一周、无遮挡欣赏 360 度景观的<strong>露天屋顶</strong>。
          </p>
          <p className={styles.bodyText}>
            上楼的过程也是游览的一部分。从 35 楼到 39 楼，有一部横跨两栋大楼之间的透明自动扶梯，是这栋大楼最有名的拍照点，也是售票处设在高层而不是 1 楼的原因。楼层布局和交通信息于{CHECKED}在大阪官方旅游网站核实。
          </p>
          <p className={styles.bodyText}>
            和需要指定入场时间的东京观景台不同，这里不需要事先安排：无须按每 15 分钟划分的时段预约入场，没有开售日，也不用抢日落时段。真正需要留意的是，<strong>大阪周游卡的免费入场时间截至 15:00</strong>，大多数人都要按这个时间来安排游览。下文介绍票价、开放时间、日落时间，以及如何根据游览时间做出选择。
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            楼层指南：从屋顶到地下层
          </h3>
          <Table head={["楼层", "设施", "需要门票吗？"]} rows={floorRows.map((r) => [r.floor, r.what, r.ticket])} />
          <p className={styles.bodyText} style={noteStyle}>
            楼层信息来自运营方英文和日文观景台页面，于{CHECKED}核实。日文页面只在屋顶层列出 Lumi Sky Walk 的名称而没有说明，因此本页也不作描述。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>开售日</span>
          <h2 className={styles.sectionTitle}>梅田蓝天大厦门票什么时候开售？</h2>
          <p className={styles.bodyText}>
            <strong>梅田蓝天大厦门票无须等待开售：</strong>这里没有入场时段，39 楼售票处从 9:30 开始售票，直至 22:00 停止入场，期间均可购买当日门票，成人 ¥2,000、4–12 岁 ¥500。唯一的例外是淀川烟花大会等特殊开放日，运营方表示当天需要购买指定入场时段的特别门票（skybldg.co.jp，{LAST_CHECKED_ISO} 核实）。
          </p>
          <p className={styles.bodyText}>
            网上购票方面，运营方的日文官网通过 asoview 销售指定日期的网上门票，Klook 则提供同款门票的中文购票页面，可以用日本境外发行的银行卡支付。无须等待开售，确定在大阪的游览日期后，选择自己方便使用的平台购票即可。如果观景台是较长关西行程中的一站，
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" style={linkStyle}>
              大阪京都 3 天行程（英文）
            </Link>
            将它安排在游览大阪的当天；
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景点门票价格总表（英文）
            </Link>
            则列出了哪些景点确实会提前售罄。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 选择出行日期并购买梅田蓝天大厦门票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>梅田蓝天大厦门票多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            以下为运营方公布的现场门票价格：<strong>成人 ¥2,000</strong>、<strong>4–12 岁儿童 ¥500</strong>。各年龄段均为统一票价，不分时段加价；唯一影响费用的是大阪周游卡的使用时段，而周游卡的免费入场有时间限制：
          </p>
          <Table head={["对象／时间", "票价", "说明"]} rows={priceRows.map((r) => [r.tier, r.price, r.what])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/（官方）" />
          <p className={styles.bodyText} style={noteStyle}>
            表中与周游卡有关的两项信息，与{CHECKED}核实的大阪周游卡运营方设施名单一致。票价可能变动，购票前请再次确认。本站介绍的日本各地门票及各自的核实日期，整理在
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景点门票价格总表（英文）
            </Link>
            。
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            梅田蓝天大厦儿童票多少钱？
          </h3>
          <p className={styles.bodyText}>
            <strong>4–12 岁 ¥500，未满 4 岁免费</strong>，是成人票价的四分之一。13 岁起适用 ¥2,000 的成人票。持残疾证明的儿童 ¥250，10 人以上团体中的儿童 ¥450。安排亲子行程时，
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>
              大阪 2 天行程（英文）
            </Link>
            把观景台安排在第二天，在水族馆之后、周游卡免费入场时段于 15:00 结束之前。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>开放时间</span>
          <h2 className={styles.sectionTitle}>梅田蓝天大厦的开放时间是几点？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            观景台开放时间为<strong>9:30 至 22:30，22:00 停止入场</strong>，运营方未公布固定休馆日。建议预留 1 至 2 小时。
          </p>
          <Table head={["", "时间"]} rows={hoursRows.map((r) => [r.what, r.when])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/（官方）" />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>22:30 闭馆</strong>是这座观景台一个容易被忽略的优势。它的闭馆时间比 HARUKAS 300（22:00）和通天阁普通观景台（21:45）都晚，即使在大阪日落晚到 19:15 的盛夏，日落后也还有 3 小时。如果白天的行程已经排满，这是晚饭后还能去的景点。特殊开放日需要购买特别门票，遇到淀川烟花大会等大型活动的日期，请先查看官网。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>最佳时段</span>
          <h2 className={styles.sectionTitle}>梅田蓝天大厦的日落时间是几点？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            11 月至 2 月，大阪的日落时间在<strong>16:47 至 17:53</strong>之间；7 月初的日落时间最晚可达 19:15。<strong>日落前 30 至 45 分钟入场</strong>，凭一张门票，就能在露天屋顶欣赏白天景色、黄金时段的景色和夜景。以下是日本国立天文台公布的 2026 年大阪日落时间；如需查询 2027 年的日落时间，请在日本国立天文台同一页面选择该年度的表格：
          </p>
          <Table head={["日期", "大阪日落时间", "游览时间建议"]} rows={sunsetRows.map((r) => [r.date, r.sunset, r.note])} />
          <LastChecked url={NAOJ_URL} label="日本国立天文台 大阪日出日落表（官方）" />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            从这张表可以看出两点。第一，<strong>冬季的日落在周游卡免费时段内，夏季则不在</strong>：12 月 1 日黄金时段在 15:00 前就已开始，持周游卡的人可以免费入场，同时看到夕阳；7 月 1 日的日落则在周游卡免费时段结束 4 小时之后。第二，观景台一年四季在天黑后都还会开放很久，即使错过夕阳，也不算白来。凭同一张门票也能欣赏屋顶夜景，而且夜景比日落更容易安排。
          </p>
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看梅田蓝天大厦门票 →
            </KlookLink>
            <KlookLink href={NIGHT_BUS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪站出发的夜景巴士 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>人流</span>
          <h2 className={styles.sectionTitle}>游客有多少？什么时间人最少？</h2>
          <p className={styles.bodyText}>
            这里没有预约制度，好处是不会售罄，坏处是屋顶上的人数也没有上限。根据购票和入场规则，就能判断哪些时段游客较多。<strong>日落前 1 小时</strong>人最多，因为大家都想在西侧约 20 米长的栏杆旁观赏日落。<strong>15:00 之前</strong>是另一个容易被忽略的客流高峰，因为大阪周游卡和大阪 e-Pass 的免费入场都在这个时间结束。
          </p>
          <p className={styles.bodyText}>
            人最少的收费时段就在这两个高峰的前后：9:30 开放后的上午时段，以及晚上约 21:00 以后，景色相同，距离停止入场也还有 1 小时。樱花季（3 月下旬至 4 月中旬）和暑假期间，大阪各处的游客都会增加，上表 3 月 31 日那一行正好在这段时间内。除了观景台，大阪的一天还可以怎么安排，请看
            <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>
              大阪景点攻略（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比较</span>
          <h2 className={styles.sectionTitle}>梅田蓝天大厦和阿倍野 HARUKAS，哪一个更值得去？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>想要露天屋顶、较晚闭馆，以及就在大阪站旁边的观景台，就选梅田蓝天大厦：</strong>梅田 ¥2,000，HARUKAS 300 售票处 ¥2,200（网上预购 ¥1,980），而且梅田蓝天大厦的开放时间晚半小时。如果你更看重高度，而不是露天观景，就选阿倍野 HARUKAS。大阪的三座收费观景台各有特点：一座最高，一座是露天观景台，还有一座票价最低，位于大阪老城区新世界。大多数比较文章都会忽略周游卡这一列，但这一列决定了实际花费的差别：
          </p>
          <Table
            head={["观景台", "高度／楼层", "成人票价", "开放时间", "区域", "大阪周游卡"]}
            rows={deckRows.map((r) => [r.deck, r.height, r.price, r.hours, r.area, r.pass])}
          />
          <LastChecked url={HARUKAS_URL} label="abenoharukas-300.jp（官方），梅田来自 skybldg.co.jp" />
          <p className={styles.bodyText} style={noteStyle}>
            梅田蓝天大厦和 HARUKAS 300 的相关信息已于{LAST_CHECKED}重新核实；通天阁一行（tsutenkaku.co.jp）和周游卡一列（大阪周游卡运营方的设施名单）于{CHECKED}核实。梅田的 173 米高度来自大阪官方旅游网站。比较时请注意以下两点区别：<strong>HARUKAS 300 不在大阪周游卡的设施名单上</strong>，所以即使在使用周游卡的当天也要付全价；<strong>通天阁即使持周游卡，也需要在现场预约入场时段</strong>，另外两座则无须预约入场时段。信息可能变动，出发前请再次确认。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>从大阪站怎么去梅田蓝天大厦？</h2>
          <p className={styles.bodyText}>
            步行即可：<strong>从 JR 大阪站步行 7 分钟</strong>，<strong>从阪急大阪梅田站或大阪地铁梅田站约 9 分钟</strong>，朝西北方向步行，穿过新梅田城（New Umeda City）（来自大阪官方旅游网站；同一网站的另一页面写约 10 分钟）。之所以感觉比 7 分钟远，是因为途中要穿过铁路下方：运营方给出的从各车站出发的步行路线，都包括一段从铁轨下方穿过、长 40 米的地下通道，途中有一段路看不到大楼。继续往前走，大楼就会重新出现。进入大楼后，请走观景台专用入口，不要乘坐通往办公楼层的电梯。
          </p>
          <p className={styles.bodyText}>
            梅田是御堂筋线北部的交通枢纽，从大阪市内任何地方先到大阪站都很容易。
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>
              大阪交通攻略（英文）
            </Link>
            说明御堂筋线如何连接梅田、难波和天王寺；
            <Link href="/guides/transport/osaka-metro-pass" style={linkStyle}>
              大阪地铁一日券攻略（英文）
            </Link>
            对比一天游览多个景点时，一日券和交通卡哪种更划算；
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>
              大阪住宿区域攻略（英文）
            </Link>
            则比较住在梅田和难波各自的优势。步行时间于{CHECKED}核实。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>梅田蓝天大厦需要提前预订吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>不需要。</strong>这里没有入场时段，39 楼售票处当天就能用现金或信用卡购票。提前购票只是为了方便：如果希望通过中文页面购票，并使用日本境外发行的银行卡付款，可以通过 Klook 购买；能看懂日文的话，可以在 asoview 购买运营方更便宜的指定日期网上门票。如果你持有大阪周游卡并在 15:00 前到达，就无须另外购买观景台门票。
          </p>
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
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            梅田蓝天大厦应该选哪一种门票？
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>根据计划游览的时间选择门票。</strong>当日门票在售票处销售，也不会售罄，但日落前 1 小时和 15:00 之前人比较多；网上购票时，不同商品的取消政策有所不同，付款前请在商品页确认。
          </p>
          <Table head={["你的行程", "推荐", "原因"]} rows={choiceRows.map((r) => [r.situation, r.pick, r.why])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/（官方）" />
          <p className={styles.bodyText} style={{ marginTop: "0.5rem" }}>
            周游卡适用设施的完整名单，以及 1 日券和 2 日券的费用对比，请看
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              大阪周游卡攻略（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看梅田蓝天大厦门票 →
            </KlookLink>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              白天游览？查看大阪周游卡 →
            </KlookLink>
            <KlookLink href={DAY_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              搭配大阪城及游船行程 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="同一行程推荐预订项目"
          heading="买了梅田蓝天大厦门票，还要预订什么？"
          intro="观景台只需要一两个小时，这一天还需要晚餐、梅田附近的住宿、从关西机场进入市区的交通，以及手机上网。以下四项均可使用购买门票时的同一个 Klook 账号预订。本页不列价格，请打开各商品页查看最新价格。"
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>周游卡</span>
          <h2 className={styles.sectionTitle}>大阪周游卡可以免费进入梅田蓝天大厦吗？</h2>
          <p className={styles.bodyText}>
            <strong>可以，但仅限 9:30 至 15:00。</strong>梅田蓝天大厦是大阪周游卡（以及大阪 e-Pass）40 多处免费设施之一，但大楼官网和周游卡运营方的设施名单，均规定持周游卡免费入场的时间截至<strong>15:00</strong>；15:00 起周游卡只能打<strong>9 折</strong>，所以晚上去，除了已经支付的周游卡 {PASS_1_DAY}，还要再付约 ¥1,800。这是使用大阪周游卡时最容易因误解而多花钱的地方，但介绍这座观景台的文章几乎都没有提到。
          </p>
          <p className={styles.bodyText}>
            以周游卡 1 日券 {PASS_1_DAY}（官方价格，2026 年 11 月 9 日核实）计算：<strong>15:00 前参观这座观景台（¥2,000）</strong>加上<strong>大阪城天守阁（¥1,200）</strong>，门票合计 ¥3,200，略低于周游卡价格，再计入当天的地铁车费，周游卡才划算。再加上距梅田仅 5 分钟路程的<strong>HEP FIVE 摩天轮（¥1,000）</strong>，合计 ¥4,200，不算车费就已经超过周游卡价格。相反，仅为了晚上参观梅田蓝天大厦而购买周游卡，肯定不划算。周游卡的完整设施名单、2 日券价格和不适用的项目，请看
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              大阪周游卡价格及费用对比表（英文）
            </Link>
            ；
            <Link href="/guides/attractions/osaka-castle-tickets" style={linkStyle}>
              大阪城门票攻略（英文）
            </Link>
            则以大阪城为例做了同样的费用对比，城墙内就有三处收费设施。设施使用条件于{CHECKED}核实。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看大阪周游卡 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              只买观景台门票 →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="梅田蓝天大厦常见问题" />

        <KlookTourPicks
          heading="大阪一天的其他安排"
          intro="游览屋顶只需一两个小时，一天中还有充足时间安排其他行程，而梅田位于市区北端，离道顿堀和大阪城都有一段距离。第一个行程可一次游览大阪城和梅田蓝天大厦观景台，第二个是步行导览。Klook 的价格按日期而不同，请打开商品页查看最新价格和集合地点。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/dotonbori-river-cruise", title: "道顿堀游船（2026）：票价、发船时间与乘船地点" },
            { href: "/guides/attractions/osaka-castle-tickets", title: "大阪城门票（2026）：票价、开放时间与周游卡适用范围（英文）" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周游卡 2026：价格、是否划算与一日行程（英文）" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "海游馆门票（2026）：票价、开放时间与入场时段（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪景点攻略（2026）：周游卡划算与不划算的地方（英文）" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "大阪 2 天行程（2026）：每日安排与预订（英文）" },
            { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "大阪京都 3 天行程（2026）：每日安排与预订（英文）" },
            { href: "/guides/attractions/osaka-food-tour", title: "大阪美食之旅（2026）：行程推荐及特色美食（英文）" },
            { href: "/guides/attractions/where-to-stay-in-osaka", title: "大阪住宿区域 2026：难波、梅田、USJ 比较（英文）" },
            { href: "/guides/transport/osaka-transportation", title: "大阪交通攻略（2026）：地铁、电车与交通卡（英文）" },
            { href: "/guides/transport/osaka-metro-pass", title: "大阪地铁一日券 2026：1 日券与 2 日券比较（英文）" },
            { href: "/guides/attractions/tokyo-observation-decks", title: "东京观景台比较（2026）：哪一个值得付费（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景点门票价格 2026：官方票价与预约规则（英文）" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>先定时间，再选门票</h2>
            <p className={styles.ctaBannerDesc}>
              这里的门票不会售罄，游览时间是唯一影响花费的因素：15:00 前用大阪周游卡免费，15:00 后购票入场，可以欣赏更好的光线和夜景。想用中文支付页面和日本境外发行的银行卡付款，请提前购票，并在付款前确认订单页面上的取消规定。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看梅田蓝天大厦门票 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                大阪周游卡 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
