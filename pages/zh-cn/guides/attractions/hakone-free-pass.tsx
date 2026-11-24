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
  hakoneCruiseCableCarTour,
  hakoneFreepass,
  hakoneFreepassTripPrep,
  hakoneLoopBusTour,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/hakone-free-pass) section by section as of
// 2026-11-24 (task-jtk-20261124-TR01): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added.
// Title term: 箱根周游券 — the name on Hakone Navi's own Simplified Chinese page
// (hakonenavi.jp/international/cn/discount_passes/free_pass) and in Simplified-Chinese results.
// Body text is kept on one line per paragraph: a JSX line break inside Chinese text renders as a space.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/hakone-free-pass";
const TITLE = "箱根周游券 2026：新宿出发价格与是否划算";
const H1 = "箱根周游券 2026：新宿出发价格、路线与是否划算";
const DESC =
  "箱根周游券（Hakone Freepass）2026：新宿出发2日券 ¥7,100，小田原出发 ¥6,000。不用周游券绕一圈 ¥8,322，当天往返也划算。";

const CHECKED_ISO = "2026-11-20";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const BUY_CHECKED_ISO = "2026-11-13";
const BUY_CHECKED = dateLabel(BUY_CHECKED_ISO, LOCALE);
const LOOP_URL = "https://www.hakonenavi.jp/international/en/article/4252";
const JR_URL = "https://odakyu-global.com/blog/2053/";
const LOOP_REGULAR = "¥8,322";
const LOOP_SAVING = "¥1,222";
const NAVI_URL = "https://www.hakonenavi.jp/international/en/discount_passes/free_pass";
const ODAKYU_URL = "https://www.odakyu.jp/english/passes/hakone/";
const FARE_NOTICE_URL = "https://www.hakonenavi.jp/international/en/wp-content/uploads/sites/2/2025/09/re_price202510.pdf";

const PASS_2_DAY_SHINJUKU = "¥7,100";
const PASS_3_DAY_SHINJUKU = "¥7,500";
const PASS_2_DAY_ODAWARA = "¥6,000";
const PASS_3_DAY_ODAWARA = "¥6,400";
const ROMANCECAR = "¥1,200";
const ROPEWAY = "¥2,000";
const CRUISE = "¥1,700";

const HAKONE_PASS_URL = klookFor(hakoneFreepass.url, LOCALE);
const HAKONE_TOUR_URL = klookFor(hakoneLoopBusTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  { pass: "大多数从东京出发的游客：新宿出发 2 日券", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "新宿出发（含小田急线往返）", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "小田原出发（仅限箱根地区）", d2a: PASS_2_DAY_ODAWARA, d2c: "¥1,500", d3a: PASS_3_DAY_ODAWARA, d3c: "¥1,750" },
  { pass: "町田出发", d2a: "¥6,820", d2c: "¥1,600", d3a: "¥7,220", d3c: "¥1,850" },
  { pass: "藤泽出发", d2a: "¥7,050", d2c: "¥1,600", d3a: "¥7,450", d3c: "¥1,850" },
];

const buyRows = [
  {
    where: "简单来说",
    ticket: "同行每个人都有智能手机，就在出发前在线购买",
    when: "如果有没有自己手机的儿童，就在小田急线车站买纸质票",
    note: "电子票保存在智能手机里（一起出行时，可用 For Group 选项把最多 4 张放在同一部手机）；纸质票则人人都能使用。",
  },
  {
    where: "EMot 在线购票（小田急官方网站）",
    ticket: "电子二维码，仅限智能手机",
    when: "出发前在线购买",
    note: "一起出行时，可用 For Group 选项在一部手机里放最多 4 张。在这里预订浪漫特快座位比在车站购买便宜 ¥50。只有票面显示退款按钮时才能退款。",
  },
  {
    where: "小田急线各站（售票机）与小田急旅游服务中心",
    ticket: "纸质票",
    when: "小田急线车站从 1 个月前开始发售；售票机只卖当天起有效的周游券",
    note: "售票机可用现金、PASMO／Suica，以及 American Express、Diners Club、JCB、Mastercard、Visa 支付。",
  },
  {
    where: "7-ELEVEN（7-Ticket）",
    ticket: "用店内多功能复印机打印的纸质票",
    when: "出发前",
    note: "不收出票手续费。含小田急线往返的版本只卖新宿出发。",
  },
  {
    where: "在箱根当地：箱根登山铁道售票机与箱根登山巴士服务处",
    ticket: "纸质票",
    when: "当天",
    note: "售票机设在箱根汤本、强罗、早云山等登山铁道各站；巴士服务处在小田原站、箱根汤本、元箱根、箱根町、仙石、桃源台与宫城野。",
  },
  {
    where: "Klook",
    ticket: "通过 Klook 预订同一张小田急周游券",
    when: "出发前在线购买",
    note: "中文结账页面，可用境外发行的银行卡支付。凭证如何兑换以及取消规定，请看商品页说明。",
  },
];

const coverageRows = [
  {
    mode: "小田急线（新宿 ⇄ 小田原）",
    included: "✓ 往返各 1 次",
    note: "仅限新宿出发的版本，途中可以下车。小田原出发的版本不含这一段。",
  },
  { mode: "箱根登山电车（小田原／箱根汤本 ⇄ 强罗）", included: "✓ 不限次数", note: "以之字形折返爬坡的登山铁路，是从箱根汤本出发绕一圈的第一段。" },
  { mode: "箱根登山缆车（强罗 ⇄ 早云山）", included: "✓ 不限次数", note: "爬升到空中缆车起点站的地面缆车。" },
  { mode: "箱根空中缆车（早云山 ⇄ 大涌谷 ⇄ 桃源台）", included: "✓ 不限次数", note: `经过大涌谷的一段，单程 ${ROPEWAY}，是整圈路线中单程最贵的交通工具。` },
  { mode: "箱根海贼观光船（芦之湖）", included: "✓ 不限次数", note: `从桃源台到箱根町或元箱根，没有周游券时单程 ${CRUISE}。特别船舱需要另外付费。` },
  { mode: "箱根登山巴士（指定区间）", included: "✓ 不限次数", note: "绕完一圈返回箱根汤本或小田原时乘坐。" },
  { mode: "观光景点巡游巴士（KANKO SHISETSU-MEGURI）", included: "✓ 不限次数", note: "由箱根登山巴士和小田急高速巴士在各观光景点之间运行。" },
  { mode: "小田急高速巴士（指定区间）", included: "✓ 不限次数", note: "持预约车票的乘客优先上车，因此可能满座。" },
  { mode: "东海巴士（指定区间）", included: "✓ 不限次数", note: "只能在指定区间内使用。" },
  { mode: "特急浪漫特快", included: "✗ 不含", note: `需要另购特急券：新宿到箱根汤本成人 ${ROMANCECAR}，儿童 ¥600。` },
  { mode: "伊豆箱根巴士", included: "✗ 不含", note: "属于其他运营公司。上车前请先确认是哪一家巴士公司。" },
];

const legRows = [
  {
    leg: `从新宿出发一天绕完一圈：不用周游券 ${LOOP_REGULAR}，用周游券 ${PASS_2_DAY_SHINJUKU}`,
    adult: `省 ${LOOP_SAVING}`,
    child: "—",
    source: "箱根Navi（小田急箱根），IC 卡票价，不含浪漫特快",
  },
  {
    leg: "不用周游券绕一圈：小田急线往返、登山电车、登山缆车、空中缆车、海贼观光船、巴士",
    adult: LOOP_REGULAR,
    child: "—",
    source: "箱根Navi 合计（IC 卡票价）",
  },
  { leg: "箱根周游券 新宿出发 2 日券", adult: PASS_2_DAY_SHINJUKU, child: "¥1,600", source: "odakyu-global.com／hakonenavi.jp" },
  { leg: "合计中的一段：箱根空中缆车 早云山 → 桃源台（单程）", adult: ROPEWAY, child: "¥700", source: "小田急箱根票价公告，2025 年 10 月 1 日起" },
  { leg: "合计中的一段：芦之湖海贼观光船 桃源台 → 箱根町／元箱根（单程）", adult: CRUISE, child: "¥850", source: "小田急箱根票价公告，2025 年 10 月 1 日起" },
  { leg: "小田急线 新宿 ⇄ 小田原（普通票价，单程）", adult: "¥910", child: "—", source: "odakyu.jp" },
  { leg: "往返都乘坐浪漫特快时", adult: `${PASS_2_DAY_SHINJUKU} + ¥2,400 = ¥9,500`, child: "—", source: "odakyu.jp 计算示例" },
];

const worthRows = [
  {
    plan: "箱根两天，在温泉旅馆住一晚",
    verdict: "✓ 买 2 日券",
    why: `这张周游券的价格就是按这种行程定的。新宿出发 ${PASS_2_DAY_SHINJUKU}，包含小田急线往返，两天都能乘坐整圈路线的每一段。`,
  },
  {
    plan: "从东京当天往返，坐完整圈路线",
    verdict: "✓ 同样划算",
    why: `按箱根Navi 的计算，从新宿出发绕完一圈按 IC 卡普通票价为 ${LOOP_REGULAR}，因此 ${PASS_2_DAY_SHINJUKU} 的周游券即使只用第一天也能省 ${LOOP_SAVING}。小田急也表示当天往返同样划算。`,
  },
  {
    plan: "乘新干线到达小田原，或已经住在箱根",
    verdict: "✓ 买小田原出发版本",
    why: `不含用不到的小田急线往返，所以是 ${PASS_2_DAY_ODAWARA}，而不是 ${PASS_2_DAY_SHINJUKU}。在箱根内可乘坐的 8 种交通工具相同。`,
  },
  {
    plan: "只去箱根汤本泡温泉、吃午饭",
    verdict: "✗ 不用买",
    why: "不坐空中缆车和海贼观光船，车费加起来不到周游券的价格。每次乘坐时单独付费即可。",
  },
  {
    plan: "想绕一圈，但不想自己查时刻表",
    verdict: "✗ 改为参加一日游",
    why: "有导游随行的巴士按固定出发时间游览大涌谷和芦之湖，当天晚上回到东京。这和交通周游券是不同的商品。",
  },
];

const formatRows = [
  { item: "该选哪一种", digital: "同行每个人都有智能手机、想避开车站排队时选电子票", paper: "儿童使用儿童手机，或不想依赖手机电量时选纸质票" },
  { item: "购买地点", digital: "EMot 在线购票，仅限智能手机", paper: "小田急旅游服务中心或车站售票机" },
  { item: "支付", digital: "在线支付", paper: "售票机可用现金、PASMO／Suica，以及 American Express、Diners Club、JCB、Mastercard、Visa" },
  { item: "多人同行", digital: "用 For Group 选项，一部手机最多 4 张；必须一起行动，过闸机时先扫同行者，最后扫自己", paper: "每人一张纸质票" },
  { item: "儿童", digital: "6–11 岁按儿童票价，未满 6 岁无需购票。不能使用日本的儿童手机", paper: "6–11 岁按儿童票价，未满 6 岁无需购票" },
  { item: "退款", digital: "只有票面显示退款按钮时才能退款；因天气停运的区段，通过 EMot 客服退款", paper: "遇到停运时，在最后乘坐的车站只退还未乘坐的交通费用" },
];

const faqItems: FaqItem[] = [
  {
    q: "2026 年箱根周游券多少钱？",
    a: `新宿出发 2 日券成人 ${PASS_2_DAY_SHINJUKU}、儿童（6–11 岁）¥1,600，3 日券为 ${PASS_3_DAY_SHINJUKU}／¥1,850。只含箱根地区的小田原出发版本，2 日券 ${PASS_2_DAY_ODAWARA}／¥1,500，3 日券 ${PASS_3_DAY_ODAWARA}／¥1,750。以上价格自 2025 年 10 月 1 日起适用，于 ${CHECKED} 在 hakonenavi.jp 和 odakyu.jp 核查。`,
  },
  {
    q: "箱根周游券只用一天划算吗？",
    a: `坐完整圈路线就划算。周游券没有 1 日券，但小田急箱根的官方网站箱根Navi 计算，从新宿出发的整圈路线（小田急线往返、登山电车、登山缆车、空中缆车、芦之湖海贼观光船和巴士）按 IC 卡普通票价为 ${LOOP_REGULAR}，与 2 日券 ${PASS_2_DAY_SHINJUKU} 相比，一天就能省 ${LOOP_SAVING}。其中大部分来自空中缆车（单程 ${ROPEWAY}）和海贼观光船（${CRUISE}）。只去箱根汤本的话并不划算。${CHECKED} 核查。`,
  },
  {
    q: "箱根周游券在哪里买？",
    a: `可以在小田急的 EMot 在线购票（电子二维码票，仅限智能手机）、小田急线车站售票机和小田急旅游服务中心（纸质票）、7-ELEVEN 的 7-Ticket、小田急旅行门店，以及箱根当地的箱根登山铁道售票机和箱根登山巴士服务处购买。小田急车站从 1 个月前开始发售；售票机只卖当天起有效的周游券。Klook 也有销售，可在中文页面结账。${BUY_CHECKED} 核查。`,
  },
  {
    q: "箱根周游券包含浪漫特快吗？",
    a: `不包含。新宿出发的版本含小田急线往返一次，但特急浪漫特快需要另购特急券：新宿到箱根汤本单程成人 ${ROMANCECAR}、儿童 ¥600，从小田原出发则是 ¥200／¥100。直达约 80 分钟，通过 EMot 在线购票预订座位便宜 ¥50。小田急自己的计算示例：周游券 ${PASS_2_DAY_SHINJUKU} + 浪漫特快往返 ¥2,400 = ¥9,500。${CHECKED} 核查。`,
  },
  {
    q: "箱根周游券可以和 JR Pass 一起用吗？",
    a: `可以搭配使用，但两者不能互相替代。小田急表示，JR Pass 和 JR 东京广域周游券不能在箱根地区内使用，但可以乘 JR 线到小田原。从小田原开始，请买只含箱根地区、不含用不到的小田急线的小田原出发箱根周游券（2 日券 ${PASS_2_DAY_ODAWARA}，3 日券 ${PASS_3_DAY_ODAWARA}）。${CHECKED} 核查。`,
  },
];

const tripPrepItems = [
  withKlookLocale(hakoneFreepassTripPrep[0], LOCALE, {
    label: "箱根大涌谷、芦之湖与箱根神社巴士一日游",
    ctaLabel: "查看箱根一日游 →",
    why: "周游券没有 1 日券。如果只从东京出发玩一天，有导游随行的巴士一次就能游览大涌谷和芦之湖。",
  }),
  withKlookLocale(hakoneFreepassTripPrep[1], LOCALE, {
    label: "箱根全部酒店",
    ctaLabel: "查看箱根酒店 →",
    why: "2 日券可以用到第二天的末班车，在箱根住一晚，就能用上已经付费的第二天。",
  }),
  withKlookLocale(hakoneFreepassTripPrep[2], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "电子版周游券是手机上的二维码，空中缆车和海贼观光船的运行情况，最方便的方式是在乘坐当天早上用手机查看。",
  }),
];

const tourPicks = [
  withKlookLocale(hakoneLoopBusTour, LOCALE, {
    title: "箱根大涌谷、芦之湖与箱根神社巴士一日游",
    desc: "从东京出发、由导游随行的巴士绕行箱根一圈，含空中缆车和海贼观光船。",
  }),
  withKlookLocale(hakoneCruiseCableCarTour, LOCALE, {
    title: "箱根游船、缆车与大涌谷一日游",
    desc: "乘船游芦之湖、乘缆车越过火山谷，并安排温泉行程，从东京出发一次预订一整天。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "箱根周游券" }];

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
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: r === 0 ? 700 : undefined }}
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

function LastChecked({ children, iso = CHECKED_ISO }: { children?: ReactNode; iso?: string }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      最后核查：{iso}。来源：<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周游券）</a>、<a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp（箱根周游券）</a>
      {children}
    </p>
  );
}

export default function ZhCnHakoneFreePassPage({ updated }: { updated: PageUpdated }) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "箱根周游券（Hakone Freepass）",
              description: DESC,
              brand: "Odakyu",
              currency: "JPY",
              lowPrice: 6000,
              highPrice: 7500,
              offerCount: 4,
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            按小田急官方票价整理新宿和小田原出发的箱根周游券价格、只用一天就划算的环线路线、保存在手机里的电子版，以及周游券不含的浪漫特快座位。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "小田急官方票价", "没有 1 日券"].map((t) => (
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
            <strong>箱根周游券（Hakone Freepass）</strong>成人票价为<strong>新宿出发 2 日券 {PASS_2_DAY_SHINJUKU}、3 日券 {PASS_3_DAY_SHINJUKU}</strong>，小田原出发则是 {PASS_2_DAY_ODAWARA} 和 {PASS_3_DAY_ODAWARA}，于 {CHECKED} 在小田急官方网页核查。可以乘坐箱根登山电车、登山缆车、箱根空中缆车、芦之湖海贼观光船和箱根的巴士，新宿出发的版本另含小田急线往返一次。按箱根Navi 的计算，一天坐完这一整圈，<strong>不用周游券要 {LOOP_REGULAR}</strong>，所以新宿出发的周游券<strong>一天就能省 {LOOP_SAVING}</strong>。浪漫特快的座位（单程 {ROMANCECAR}）无论哪个版本都要另外付费。
          </p>
          <p className={styles.bodyText}>
            本页介绍的是周游券本身：箱根周游券的价格、可乘坐的范围和购买地点。一天之内每一站怎么安排，请看
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              东京出发箱根一日游（英文）
            </Link>
            ；住一晚、把周游券两天都用上的安排，请看
            <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>
              箱根两天行程（英文）
            </Link>
            。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>新宿出发 2 日券</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_SHINJUKU}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>小田原出发 2 日券</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_ODAWARA}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>可乘坐</p>
                <p className={styles.verdictStatValue}>8 种交通工具</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>浪漫特快</p>
                <p className={styles.verdictStatValue}>+{ROMANCECAR}，不含</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              小田急的英文官方写法是 <strong>Freepass</strong>，很多人搜索的是 Hakone Free Pass，两者是同一张票。周游券没有 1 日券；在线购买（EMot 或 Klook）可以避开车站排队；如果你乘新干线到达小田原，请买小田原出发的版本。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                在 Klook 查看箱根周游券 →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                改看箱根一日游 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>价格</span>
          <h2 className={styles.sectionTitle}>2026 年箱根周游券多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            新宿出发 2 日券成人 {PASS_2_DAY_SHINJUKU}，是大多数从东京出发的游客需要的版本。价格因周游券的起点车站而不同，3 日券只比 2 日券贵 ¥400。
          </p>
          <Table
            head={["出发车站", "2 日券 成人", "2 日券 儿童", "3 日券 成人", "3 日券 儿童"]}
            rows={priceRows.map((r) => [r.pass, r.d2a, r.d2c, r.d3a, r.d3c])}
          />
          <LastChecked>
            。儿童票适用 6–11 岁，未满 6 岁免费。以上价格自 2025 年 10 月 1 日起适用。浪漫特快座位另计：到箱根汤本，从新宿 {ROMANCECAR}／¥600，从小田原 ¥200／¥100。
          </LastChecked>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            新宿出发还是小田原出发？两者相差的 ¥1,100 只是新宿 ⇄ 小田原的小田急线往返，两个版本在箱根内都能乘坐同样的 8 种交通工具。本站介绍的其他周游券和门票，整理在
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景点门票价格总表（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 确认箱根周游券 →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              只有一天？比较有导游的箱根一日游 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="同一趟行程一起预订"
          heading="买了箱根周游券，还要预订什么？"
          headingLevel={3}
          intro="周游券只解决交通，不包含一天的行程和住宿。如果只有一天、又不想查时刻表，有导游随行的箱根一日游一次就能预订同一圈路线；如果有两天，在箱根订一间住宿，就能用上已经付费的第二天。电子票需要的手机流量，也能用同一个 Klook 账号预订。"
          items={tripPrepItems}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>购买地点</span>
          <h2 className={styles.sectionTitle}>箱根周游券在哪里买？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可以通过小田急的 EMot 在线购票或 Klook 在线购买，也可以在小田急线各站、7-ELEVEN 或箱根当地买纸质票。不同购买地点，拿到的票券形式和最早可购买的时间不同。
          </p>
          <Table
            head={["购买地点", "拿到的票券", "何时可以买", "注意事项"]}
            rows={buyRows.map((r) => [r.where, r.ticket, r.when, r.note])}
          />
          <LastChecked iso={BUY_CHECKED_ISO}>。Klook 这一行没有官方资料来源，最新条件以商品页为准。</LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>包含与不包含</span>
          <h2 className={styles.sectionTitle}>箱根周游券可以乘坐哪些交通工具？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            箱根内 8 种交通工具不限次数乘坐，新宿出发的版本另含小田急线往返一次。浪漫特快座位和伊豆箱根巴士不包含在内。
          </p>
          <Table head={["交通工具", "周游券可乘坐？", "说明"]} rows={coverageRows.map((r) => [r.mode, r.included, r.note])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            。出示周游券还可以在箱根约 70 处设施享受优惠，但名单会变动，因此本页不列出金额。
          </LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>划算吗？</span>
          <h2 className={styles.sectionTitle}>箱根周游券只用一天划算吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            坐完整圈路线就划算。小田急箱根的官方网站箱根Navi 把新宿出发的经典路线按 IC 卡普通票价计为 {LOOP_REGULAR}，周游券是 {PASS_2_DAY_SHINJUKU}，所以即使当天晚上就回东京，也能省 {LOOP_SAVING}。
          </p>
          <Table head={["路线（成人，不含浪漫特快）", "成人", "儿童", "资料来源"]} rows={legRows.map((r) => [r.leg, r.adult, r.child, r.source])} />
          <p className={styles.bodyText} style={noteStyle}>
            最后核查：{CHECKED_ISO}。来源：<a href={LOOP_URL} target="_blank" rel="noopener noreferrer">箱根Navi（整圈合计）</a>、<a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">小田急箱根票价公告（PDF）</a>、<a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp</a>。箱根Navi 没有把 {LOOP_REGULAR} 拆成各段票价，因此本页不逐一列出登山电车、登山缆车和巴士的票价。海贼观光船的特别船舱单程另加 ¥800／¥400。
          </p>
          <Table head={["你的行程", "建议", "原因"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            空中缆车和海贼观光船遇到恶劣天气都会停运，空中缆车在大涌谷也可能临时停止运行。如果有区段停运而没有乘坐，纸质周游券可以在最后乘坐的车站退款。每一站看什么、什么时候从东京出发，请看
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              东京出发箱根一日游（英文）
            </Link>
            ；本页只介绍周游券本身。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看箱根周游券 →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              比较箱根一日游 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通方式</span>
          <h2 className={styles.sectionTitle}>箱根周游券包含浪漫特快吗？</h2>
          <p className={styles.bodyText}>
            不包含。新宿出发的版本含小田急线往返一次，但特急浪漫特快需要另购特急券：新宿到箱根汤本<strong>单程成人 {ROMANCECAR}、儿童 ¥600</strong>。<strong>直达约 80 分钟</strong>，全车指定席，在 EMot 在线购票预订座位比在车站购买便宜 ¥50。小田急提供的新宿出发往返计算示例是周游券 {PASS_2_DAY_SHINJUKU} 加浪漫特快往返 ¥2,400，合计 ¥9,500。周游券可以乘坐的普通小田急列车用时更长，通常要在小田原换乘。
          </p>
          <p className={styles.bodyText}>
            箱根也常和富士五湖安排在一起，但那是另一张周游券、另一个地区，请看
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>
              富士山一日游自助交通（英文）
            </Link>
            。如果箱根是较长行程中的一晚，可以在
            <Link href="/guides/attractions/tokyo-7-day-itinerary" style={linkStyle}>
              东京 7 天行程（英文）
            </Link>
            、
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>
              东京 5 天行程（英文）
            </Link>
            和
            <Link href="/guides/attractions/japan-14-day-itinerary" style={linkStyle}>
              日本 14 天行程（英文）
            </Link>
            查看箱根排在哪一天；
            <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>
              箱根带私人温泉的旅馆（英文）
            </Link>
            则按区域整理从箱根汤本到芦之湖的 10 家旅馆，以及前往每家旅馆的巴士或电车。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>持有 JR Pass</span>
          <h2 className={styles.sectionTitle}>箱根周游券可以和 JR Pass 一起用吗？</h2>
          <p className={styles.bodyText}>
            可以，但两者的用途不同。小田急表示，JR Pass 和 JR 东京广域周游券不能在箱根地区内使用，只能乘 JR 线到小田原。从小田原开始，<strong>小田原出发的箱根周游券（2 日券 {PASS_2_DAY_ODAWARA}，3 日券 {PASS_3_DAY_ODAWARA}）</strong>就能坐完整圈路线，也不含你用不到的小田急线。回程如果乘浪漫特快到新宿，需要另付特急券和小田原到新宿的基本票价。JR Pass 在东京行程中是否划算，请看
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass 攻略（英文）
            </Link>
            和
            <Link href="/guides/transport/tokyo-wide-pass" style={linkStyle}>
              JR 东京广域周游券攻略（英文）
            </Link>
            。
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            最后核查：{CHECKED_ISO}。来源：<a href={JR_URL} target="_blank" rel="noopener noreferrer">小田急箱根周游券常见问题</a>、<a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp（箱根周游券）</a>。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票券形式</span>
          <h2 className={styles.sectionTitle}>电子票还是纸质票：该买哪一种箱根周游券？</h2>
          <Table head={["", "电子票（EMot）", "纸质票"]} rows={formatRows.map((r) => [r.item, r.digital, r.paper])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            。同行者一起行动、能放在同一部手机时选电子票；儿童使用儿童手机，或不想依赖手机电量时选纸质票。有效期按自然日计算：2 日券在购买次日的末班车后失效，而不是 48 小时后。
          </LastChecked>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="箱根周游券常见问题" />

        <KlookTourPicks
          heading="如果只有一天"
          intro="想自己绕一圈，周游券是合适的选择。如果只想从东京出发玩一天、不想查时刻表，以下是同一圈路线的导游随行版本：一辆巴士、固定出发时间，当天晚上回到市区。请打开商品页查看你出发日期的最新价格。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/hakone-ryokan-private-onsen", title: "箱根带私人温泉的旅馆：按区域精选 10 家（2026）（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 价格 2026：新票价与是否划算（英文）" },
            { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "东京出发箱根一日游（2026）：周游券价格与一日游比较（英文）" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "东京出发富士山一日游（2026）：自助前往方式（英文）" },
            { href: "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "富士山一日游（东京出发·2026）：行程怎么选、五合目看什么" },
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "东京出发河口湖一日游（2026）：路线、票价与一天能安排什么（英文）" },
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "东京 5 天行程（2026）：每日安排（英文）" },
            { href: "/guides/attractions/japan-14-day-itinerary", title: "日本 14 天行程（2026）：两周每日安排（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新干线攻略 2026：车票、周游券与第一次乘坐须知（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景点门票价格 2026：官方票价与预约规则（英文）" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>一张票坐完箱根整圈路线</h2>
            <p className={styles.ctaBannerDesc}>
              8 种交通工具、2 天或 3 天，Klook 可以用境外发行的银行卡结账。如果只有一天、又不想查时刻表，同一圈路线的导游巴士版本更适合你。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看箱根周游券 →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看箱根一日游 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
