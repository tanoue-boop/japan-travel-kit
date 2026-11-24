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
import {
  akihabaraGoKartTour,
  asakusaGoKartTour,
  asakusaSensojiWalkingTour,
  klookEsim,
  shibuyaAnnexGoKartTour,
  shinjukuNightFoodWalkingTour,
  tokyoBayGoKartTour,
  tokyoGoKartingListUrl,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/tokyo-go-kart) section by section as of
// 2026-11-24 (task-jtk-20261124-TR03): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added. Title term:
// 东京卡丁车 — the name Klook zh-CN and Simplified Chinese listings (Singapore, Malaysia) use,
// with 国际驾照.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/tokyo-go-kart";
const TITLE = "东京卡丁车 2026：价格、国际驾照与路线";
const H1 = "东京卡丁车 2026：街头卡丁车价格、国际驾照与路线";
const DESC =
  "东京街头卡丁车按官方价目表每人 ¥5,000–¥25,000。需要 1949 年日内瓦公约国际驾照、本国驾照和护照原件，可通过 Klook 预订。";

const LAST_CHECKED = "2026-11-15";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);
const NPA_CHECKED = dateLabel("2026-11-07", LOCALE);

// The English page's Akiba Kart Shibuya listing (its GOKART_URL), on Klook's zh-CN path.
const GOKART_URL = klookFor(
  "https://www.klook.com/en-US/activity/116875-shibuya-go-karting-experience-by-akiba-kart-shibuya/",
  LOCALE,
);
const ANNEX_URL = klookFor(shibuyaAnnexGoKartTour.url, LOCALE);
const AKIHABARA_URL = klookFor(akihabaraGoKartTour.url, LOCALE);
const BAY_URL = klookFor(tokyoBayGoKartTour.url, LOCALE);
const ASAKUSA_URL = klookFor(asakusaGoKartTour.url, LOCALE);
const LIST_URL = klookFor(tokyoGoKartingListUrl, LOCALE);
const BUS_URL = klookFor(tokyoSightseeingBusTour.url, LOCALE);
const FOOD_WALK_URL = klookFor(shinjukuNightFoodWalkingTour.url, LOCALE);
const ASAKUSA_WALK_URL = klookFor(asakusaSensojiWalkingTour.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const srcStyle = { color: "var(--text-muted)" } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  { shop: "还没决定就选这个：涩谷 Annex 店（H2-S）", route: "道玄坂、涩谷十字路口、表参道、原宿", time: "约 1 小时", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: ANNEX_URL, bookLabel: "Klook 涩谷 Annex 店" },
  { shop: "涩谷店（H-S）", route: "涩谷十字路口、原宿、表参道", time: "约 1 小时", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: GOKART_URL, bookLabel: "Klook 涩谷店" },
  { shop: "秋叶原 1 号店（A1-S）", route: "秋叶原主要街道", time: "约 1 小时", day: "¥9,000", evening: "¥12,000", regular: "¥15,000", book: AKIHABARA_URL, bookLabel: "Klook 秋叶原店" },
  { shop: "秋叶原 2 号店（A2-S）", route: "秋叶原、东京站、银座", time: "约 1 小时", day: "¥9,000", evening: "未列出", regular: "¥15,000", book: AKIHABARA_URL, bookLabel: "Klook 秋叶原店" },
  { shop: "秋叶原 2 号店（A2-M）", route: "皇居周边、原宿、涩谷十字路口", time: "1.5 至 2 小时", day: "¥12,000", evening: "¥17,500", regular: "¥20,000", book: AKIHABARA_URL, bookLabel: "Klook 秋叶原店" },
  { shop: "东京湾店（K-M）", route: "彩虹大桥和东京塔", time: "1.5 至 2 小时", day: "¥14,000", evening: "¥22,000", regular: "¥25,000", book: BAY_URL, bookLabel: "Klook 东京湾店" },
  { shop: "品川店（S-S）", route: "从品川到东京塔", time: "约 1 小时", day: "¥14,000", evening: "¥16,000", regular: "¥20,000", book: LIST_URL, bookLabel: "Klook 东京卡丁车列表" },
  { shop: "浅草店（Samurai-S）", route: "浅草周边", time: "45 分钟至 1 小时", day: "¥5,000", evening: "¥6,000", regular: "¥12,000", book: ASAKUSA_URL, bookLabel: "Klook 浅草店" },
];

const licenceRows = [
  { doc: "多数旅客适用：1949 年日内瓦公约纸质国际驾照 + 本国驾照 + 护照", drive: "可以", note: "仅限出发前在本国签发的册子形式。卡片式、电子版、单页式国际驾照和复印件均无效" },
  { doc: "只有 1968 年维也纳公约国际驾照", drive: "不可以", note: "JAF：在日本只有 1949 年日内瓦公约国际驾照有效。如果封面写的是 1968，Street Kart 请你先联系店家" },
  { doc: "日本驾照", drive: "可以", note: "Street Kart 驾照说明页面列在第一项。轻便摩托车和摩托车驾照不适用" },
  { doc: "瑞士、德国、法国、台湾、比利时或摩纳哥驾照 + 认可的日文译本", drive: "可以", note: "译本可代替国际驾照。JAF 只受理在日本境内提交的在线申请" },
  { doc: "SOFA 驾照（驻日美军）", drive: "可以", note: "列在 Street Kart 驾照说明页面" },
  { doc: "没有驾照，或驾照来自不在 1949 年日内瓦公约名单内的国家", drive: "不可以", note: "没有乘客座位，店家当天也无法签发任何文件" },
];

const includedRows = [
  { item: "领队向导和卡丁车", status: "包含", note: "先进行安全讲解，一名向导最多带领 6 名驾驶者" },
  { item: "燃油", status: "包含", note: "参加行程的旅客不需要自己加油" },
  { item: "基本保险", status: "包含", note: "赔偿上限：他人人身伤害 ¥80,000,000、财物 ¥20,000,000、驾驶者本人伤害 ¥5,000,000" },
  { item: "卡丁车损坏自付额", status: "不包含", note: "每辆 ¥50,000，卡丁车损坏时在行程结束后立即收取" },
  { item: "全险", status: "可选加购", note: "取消他人、财物和卡丁车的赔偿上限，驾驶者本人伤害提高到 ¥30,000,000" },
  { item: "服装", status: "请查看预订内容", note: "报到时挑选一套，服装也列在租借和销售项目中" },
  { item: "运动相机", status: "可选加购", note: "可在店内租借，也可以自己带" },
  { item: "国际驾照或译本", status: "不包含", note: "需要自己办理，店家无法签发任何一种" },
];

const fitRows = [
  { rule: "最低年龄", value: "18 岁", source: "Klook 秋叶原商品页面和 Klook 卡丁车指南" },
  { rule: "身高", value: "Klook 秋叶原商品为 150–185 厘米，Akiba Kart 涩谷商品为 150–190 厘米", source: "Klook 商品页面" },
  { rule: "体重", value: "不足 100 公斤", source: "Klook 秋叶原商品页面" },
  { rule: "驾驶能力", value: "自动挡卡丁车，必须具备在公共道路驾驶的能力", source: "Street Kart 常见问题和使用条款" },
  { rule: "着装", value: "不能穿高跟鞋、凉鞋或长裙", source: "Street Kart 各店页面" },
];

const startRows = [
  { shop: "秋叶原 1 号店", address: "千代田区外神田 4-12-9", access: "末广町站 1 号出口 3 分钟；JR 秋叶原站 7 分钟" },
  { shop: "秋叶原 2 号店", address: "千代田区神田佐久间町 4-16-7", access: "JR 秋叶原站（昭和通口）8 分钟" },
  { shop: "涩谷店", address: "涩谷区圆山町 15-3", access: "京王井之头线神泉站 3 分钟；JR 涩谷站 15 分钟" },
  { shop: "涩谷 Annex 店", address: "圆山町 10-11 The City Shibuya 2 楼", access: "京王井之头线神泉站 5 分钟；JR 涩谷站 15 分钟" },
  { shop: "品川店", address: "品川区北品川 1-23-15", access: "京急北品川站 5 分钟；JR 品川站 15 分钟" },
  { shop: "浅草店", address: "台东区西浅草 3-25-31", access: "东京地铁浅草站 8 分钟" },
  { shop: "东京湾店", address: "江东区新木场 2-10-8", access: "新木场站 10 至 13 分钟" },
];

const whoFor = [
  {
    title: "持有正式驾照、对驾驶有信心的人",
    desc: "你持有本国有效的正式驾照，习惯在真实道路上开车，并且出发前已经办好国际驾照。这是为持照成年人设计的行程，不是游乐园设施。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h2l1-3h12l1 3h2" />
        <path d="M5 12v5h14v-5" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    title: "想换个角度看东京的游客",
    desc: "你想坐在没有车顶的卡丁车上，从路面高度迎着风看东京塔、台场和彩虹大桥一带等地标。热门路线风景好，而且由向导带领，你只需要跟着前方的领队驾驶即可。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "不能在日本开车的人不适合",
    desc: "如果你未满 18 岁、没有驾照，或者驾照来自日本在此规定下不认可的国家，就不能合法驾驶这些卡丁车。店家当天没有任何补救办法，请在预订前准备好文件。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "出发前在本国办好国际驾照",
    desc: "1949 年日内瓦公约国际驾照只能在本国签发，在日本无法办理。必须是纸质册子形式，卡片式、电子版和单页式国际驾照均无效，网上也有出售假国际驾照的商家。如果你的驾照来自瑞士、德国、法国、台湾、比利时或摩纳哥，则需要改用认可的日文译本。JAF 只受理在日本境内提交的在线申请，平均需要 2 至 3 个工作日，请在行程开始时留出这段时间，或咨询你的国家驻日大使馆或领事馆。",
  },
  {
    title: "带齐三样原件：国际驾照、本国驾照和护照",
    desc: "当天必须携带全部原件：本国实体驾照、国际驾照（或 JAF、大使馆译本）以及护照。复印件、手机照片和电子驾照都不被接受，没有带原件就无法参加，也不会退款。",
  },
  {
    title: "确认你符合参加条件",
    desc: `Klook 商品页面规定最低年龄为 18 岁，驾照也必须是在日本可以用于驾驶的驾照（1949 年日内瓦公约国际驾照，或上述国家适用的译本）。轻便摩托车和摩托车驾照不适用。Street Kart 也欢迎你在预订后发送文件照片，让店家提前确认。卡丁车是单人座，没有乘客选项。Street Kart 规定于 ${CHECKED} 确认，Klook 年龄限制于 ${NPA_CHECKED} 确认。`,
  },
  {
    title: "提前预订，并提早到店参加安全讲解",
    desc: `在线预订时段并选择路线。Street Kart 要求你在预约时段前 30 分钟到店，进行文件检查和安全讲解，迟到者无法参加。请记住日本是靠左行驶。行程由向导带领，全程跟着领队驾驶前进。以上为 ${CHECKED} 的信息。`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "在东京开卡丁车需要驾照吗？",
    a: "需要。东京的街头卡丁车在公共道路上行驶，所以你需要日本驾照，或本国驾照加上按 1949 年日内瓦公约签发的纸质国际驾照和护照，而且全部都必须是原件。瑞士、德国、法国、台湾、比利时和摩纳哥的驾照则用认可的日文译本代替国际驾照。国际驾照只能在出发前于本国签发。",
  },
  {
    q: "东京街头卡丁车多少钱？",
    a: `Street Kart 2026 年 11 月的官方价目表中，每人最低价格为浅草 45 分钟至 1 小时路线 ¥5,000、秋叶原 ¥9,000、涩谷 ¥16,000，1.5 至 2 小时的秋叶原和东京湾路线为 ¥12,000 至 ¥14,000。原价最高 ¥25,000。${CHECKED} 确认。`,
  },
  {
    q: "1968 年维也纳公约的国际驾照在日本能用吗？",
    a: "不能。JAF 表示在日本只有按 1949 年日内瓦公约签发的国际驾照有效，按 1968 年维也纳公约等其他公约签发的国际驾照无效。Street Kart 还补充说，大多数有效国际驾照的封面印有 1949，如果你的封面印的是 1968，请先联系店家。",
  },
  {
    q: "下雨天或冬天能在东京开卡丁车吗？",
    a: "原则上可以。Street Kart 表示通常不论天气都会照常出发，不确定时请联系店家；东京每家店的价目表都列出全年 12 个月的时段，包括 12 月至 2 月。不过按照使用条款，店家仍然可以暂停、取消或变更行程。",
  },
  {
    q: "东京街头卡丁车安全合法吗？",
    a: "只要持有在日本有效的驾照就是合法的：Street Kart 的卡丁车是为日本公共道路打造的，运营方也会拒绝没有正确文件的驾驶者。行驶的是靠左通行的真实车流，由向导带领，每名向导最多带 6 名驾驶者，包含基本保险，路线不走高速公路。",
  },
];

const picks = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "东京观光巴士一日游",
    desc: "由向导带领游览皇居庭园、浅草和东京晴空塔，配有多语种语音导览。",
  }),
  withKlookLocale(shinjukuNightFoodWalkingTour, LOCALE, {
    title: "新宿夜间美食之旅：回忆横丁、歌舞伎町和黄金街",
    desc: "入夜后步行游览回忆横丁、歌舞伎町和黄金街的 3 小时拼团行程，包括三家当地小店的试吃，以及在黄金街居酒屋喝一杯。",
  }),
  { title: "Klook 日本 eSIM", desc: "以二维码凭证发放的日本 eSIM，整个行程都能用地图和聊天软件。", url: ESIM_URL },
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "东京地铁通票（24／48／72 小时）",
    desc: "东京 Metro 和都营地铁全线不限次数乘坐，抵达后领取，不用排队购票。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "东京卡丁车" }];

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
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.88rem" }}>
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

function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" style={srcStyle}>
      {children}
    </a>
  );
}

export default function ZhCnTokyoGoKartPage({ updated }: { updated: PageUpdated }) {
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
            亲自驾驶可以合法上路的卡丁车穿过东京市中心，途经东京塔和彩虹大桥一带等地标。需要注意的是驾驶文件：国际驾照只能在出发前于本国签发。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "必须持有国际驾照", "18 岁以上"].map((t) => (
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
            要在东京驾驶卡丁车，你需要日本驾照，或本国驾照加上按<strong>1949 年日内瓦公约</strong>签发的纸质国际驾照和护照；只有 1968 年维也纳公约的国际驾照不被接受。Street Kart 2026 年 11 月的官方价目表中，1 小时路线每人最低 <strong>¥5,000</strong>（浅草）、<strong>¥9,000</strong>（秋叶原）或 <strong>¥16,000</strong>（涩谷），1.5 至 2 小时路线最低 <strong>¥12,000</strong>（秋叶原）或 <strong>¥14,000</strong>（东京湾，经过彩虹大桥），原价最高 ¥25,000。行程从涩谷、秋叶原、浅草、品川和东京湾（新木场）的店铺出发，没有携带文件原件的驾驶者无法参加，也不会退款。{CHECKED} 确认。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看涩谷卡丁车 →
            </KlookLink>
          </div>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>每人价格</p>
                <p className={styles.verdictStatValue}>约 ¥5,000 至 ¥25,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>行程时长</p>
                <p className={styles.verdictStatValue}>45 分钟至 2 小时，向导带领</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>驾驶需要</p>
                <p className={styles.verdictStatValue}>国际驾照 + 本国驾照 + 护照</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>办理国际驾照</p>
                <p className={styles.verdictStatValue}>出发前在本国办好</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>简单来说：</strong>预订并不难，让大多数人无法参加的是文件。国际驾照<em>只能</em>在出发前于本国签发，在日本无法办理，店家当天也没有任何补救办法。先准备好文件，其他都是细节。
            </p>
            <KlookLink href={GOKART_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看东京街头卡丁车 →
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概况</span>
          <h2 className={styles.sectionTitle}>日本的街头卡丁车是什么？东京卡丁车行程怎么进行？</h2>
          <p className={styles.bodyText}>
            东京街头卡丁车行程是驾驶一辆可以合法上路的小型卡丁车，跟着向导带领的车队在市区公共道路上行驶。热门路线经过知名景点，彩虹大桥、东京塔、台场和涩谷一带经常出现在行程中，让你在没有车顶、贴近路面的位置看东京，这是乘电车或巴士看不到的角度。行程中通常也提供普通服装可以穿。
          </p>
          <p className={styles.bodyText}>
            先说明一个重点：这是<strong>普通的街头卡丁车体验</strong>，<strong>与任何电子游戏、角色或娱乐品牌都没有合作、赞助或背书关系</strong>，提供的服装也是普通服装。这个行程真正的魅力在于驾驶本身，也正因为如此，文件才这么重要。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>价格</span>
          <h2 className={styles.sectionTitle}>东京街头卡丁车多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            按 Street Kart 2026 年 11 月的价目表，东京街头卡丁车每人约 ¥5,000 至 ¥25,000，价格取决于出发店铺、路线和时段。如果还没决定，请预订涩谷 Annex 店的 1 小时路线，它会经过涩谷十字路口、表参道和原宿。下表中同时列出白天和傍晚时段的店铺，傍晚时段都比白天贵。
          </p>
          <Table
            head={["出发店铺与路线", "路线主要景点", "路线时长", "白天最低价", "傍晚最低价", "原价最低价", "预订"]}
            rows={priceRows.map((row) => [
              row.shop,
              row.route,
              row.time,
              row.day,
              row.evening,
              row.regular,
              <KlookLink key="b" href={row.book} target="_blank" rel={KLOOK_REL} style={{ color: "var(--red)", fontWeight: 600 }}>
                {row.bookLabel} →
              </KlookLink>,
            ])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            来自各店官方价目表 2026 年 11 月页签的每人最低价格，{CHECKED} 确认。价格按月份和时段变化，你计划日期的金额以运营方预约日历为准。白天和傍晚两列是“评价价”，在线预订时自动适用；按运营方条款，这个价格与是否发表评价无关，原价则适用于希望不公开到访的旅客。预订一列打开该出发店铺的 Klook 商品页面，Klook 另有自己的价格；品川店没有单独的商品，所以链接打开的是 Klook 的东京卡丁车列表。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最后确认：{LAST_CHECKED}。官方来源：<Src href="https://akiba-kart.com/en/shibuya2.html">涩谷 Annex 店</Src>、
            <Src href="https://akiba-kart.com/en/shibuya.html">涩谷店</Src>、
            <Src href="https://streetkart.tokyo/en/akihabara.html">秋叶原 1 号店</Src>、
            <Src href="https://streetkart.tokyo/en/akihabara2.html">秋叶原 2 号店</Src>、
            <Src href="https://streetkart.com/en/tokyobay.html">东京湾店</Src>、
            <Src href="https://streetkart.com/en/shinagawa.html">品川店</Src>、
            <Src href="https://streetkart.com/en/asakusa.html">浅草店</Src>。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            通过 Klook 预订有自己的价格，请打开商品页面查看你计划日期的金额。作为比较，Street Kart 大阪店同月约 1 小时路线 ¥7,000 起，冲绳也有店铺。在大阪可以凭同样的文件驾驶，
            <Link href="/guides/attractions/osaka-go-kart" style={linkStyle}>
              大阪卡丁车指南（英文）
            </Link>
            比较了经过道顿堀和难波的路线。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>费用包含</span>
          <h2 className={styles.sectionTitle}>东京卡丁车行程包含哪些项目？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            行程费用包含卡丁车、向导和基本保险，但卡丁车损坏时你需要承担 ¥50,000 的自付额。国际驾照或译本的费用一律自己承担。
          </p>
          <Table head={["项目", "是否包含", "说明"]} rows={includedRows.map((r) => [r.item, r.status, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            来自 Street Kart 的常见问题、各店页面和使用条款，{CHECKED} 确认。通过 Klook 预订时，以商品页面列出的包含项目为准。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>路线选择</span>
          <h2 className={styles.sectionTitle}>东京卡丁车哪条路线最好（涩谷、秋叶原或东京湾）？</h2>
          <p className={styles.bodyText}>
            想开过涩谷十字路口就选涩谷，想少花钱就选秋叶原，想看彩虹大桥并且有 1.5 至 2 小时就选东京湾。在 11 月的价目表中，涩谷路线 ¥16,000 起，秋叶原 1 小时路线 ¥9,000 起。秋叶原 2 号店的 1 小时路线还会经过东京站和银座。
          </p>
          <p className={styles.bodyText}>
            其他路线适合更具体的需求。品川路线前往东京塔，东京湾路线是经过彩虹大桥的那一条，秋叶原 2 号店较长的 A2-M 路线则经过皇居周边和原宿到达涩谷十字路口。如果你本来就住在秋叶原电器街附近，可以搭配我们的
            <Link href="/guides/attractions/akihabara-anime-tour" style={linkStyle}>
              秋叶原动漫之旅指南（英文）
            </Link>
            一起安排。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看涩谷 Annex 店行程 →
            </KlookLink>
            <KlookLink href={AKIHABARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看秋叶原行程 →
            </KlookLink>
            <KlookLink href={BAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              查看东京湾行程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>参加条件</span>
          <h2 className={styles.sectionTitle}>在东京开卡丁车需要驾照吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            需要。日本的街头卡丁车在公共道路上行驶，所以你必须持有日本认可可以驾驶的驾照，没有驾照的人也没有乘客座位。最重要的一条规则：1949 年日内瓦公约国际驾照必须<strong>在出发前于本国办好</strong>，在日本无法签发。请用下表找到你的情况。
          </p>
          <Table head={["你持有的文件", "可以驾驶吗？", "说明"]} rows={licenceRows.map((r) => [r.doc, r.drive, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            最后确认：{LAST_CHECKED}（Street Kart 驾照说明页面和 JAF）。国际驾照或外国驾照在日本的有效期为入境起 1 年或至驾照到期日，以先到者为准；国际驾照本身自签发起有效 1 年（日本警察厅，{NPA_CHECKED} 确认）。官方来源：
            <Src href="https://akiba-kart.com/en/license_shibuya.html">Street Kart 驾照说明页面</Src>、
            <Src href="https://english.jaf.or.jp/driving-in-japan/drive-in-japan/switch-to-japanese-license">JAF</Src>。规定可能变化，预订前请向运营方确认你的国籍是否适用。所有文件当天都必须携带原件。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>没有国际驾照</span>
          <h2 className={styles.sectionTitle}>没有国际驾照能在东京开卡丁车吗？</h2>
          <p className={styles.bodyText}>
            只有在你持有其他在日本道路上有效的文件时才可以：日本驾照、SOFA 驾照，或上述六个国家和地区之一的驾照加上认可的日文译本。没有其中任何一种就不能驾驶，店家当天无法处理，也不会退款。
          </p>
          <p className={styles.bodyText}>
            最容易出问题的是译本，因为 JAF 不受理日本境外的申请。JAF 只受理在日本境内提交的在线申请，费用为 ¥6,000，另加每页 ¥20 的打印费，这六个国家和地区的驾照平均需要 2 至 3 个工作日。如果通过 JAF 办理，行程前一天才抵达日本时间不够，请把卡丁车安排在旅程后段。
          </p>
          <div className={styles.verdictBox} style={{ marginTop: "1.25rem" }}>
            <div className={styles.verdictBody}>
              <p className={styles.verdictText}>
                <strong>没有国际驾照？改订这些行程。</strong>不需要驾照也能走过同样的街道：由向导带领、游览皇居庭园、浅草和东京晴空塔的巴士行程，入夜后在新宿步行 3 小时的拼团美食之旅，或由向导带领的浅草寺半日步行游。
              </p>
              <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
                <KlookLink href={BUS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  查看东京巴士一日游 →
                </KlookLink>
                <KlookLink href={FOOD_WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  查看新宿夜间美食之旅 →
                </KlookLink>
                <KlookLink href={ASAKUSA_WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  查看浅草步行游 →
                </KlookLink>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>限制</span>
          <h2 className={styles.sectionTitle}>东京卡丁车有年龄和身高限制吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            有。Klook 商品页面规定最低年龄为 18 岁，身高范围从 150 厘米起。Street Kart 自己的页面没有写年龄或身高，请查看你预订的商品页面。
          </p>
          <Table head={["规定", "内容", "来源"]} rows={fitRows.map((r) => [r.rule, r.value, r.source])} />
          <p className={styles.bodyText} style={noteStyle}>
            {NPA_CHECKED} 确认。Klook 的文字来自搜索引擎收录的商品页面内容。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>天气</span>
          <h2 className={styles.sectionTitle}>下雨天或冬天能在东京开卡丁车吗？</h2>
          <p className={styles.bodyText}>
            通常可以。Street Kart 表示一般不论天气都会照常出发，不确定时请联系店家，但按照使用条款也可能暂停、取消或变更行程。冬天也不是淡季：东京每家店的价目表都列出全年 12 个月的时段，包括 12 月至 2 月，请按没有车顶的卡丁车准备衣物。
          </p>
          <p className={styles.bodyText}>
            直接向运营方预订时，可以在活动日前 7 天（日本时间）之前免费取消。之后的 6 天内适用运营方的取消规定，付款前请先阅读；变更则取决于可预订名额。通过 Klook 预订则按 Klook 商品页面的条款执行。{CHECKED} 确认。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>安全</span>
          <h2 className={styles.sectionTitle}>东京街头卡丁车安全合法吗？</h2>
          <p className={styles.bodyText}>
            只要每名驾驶者都持有在日本有效的驾照就是合法的：Street Kart 表示其卡丁车是专门为日本公共道路制造的，没有正确文件原件的人一律不接待。不过这仍然是靠左通行的真实车流，请把它当作开车，而不是游乐设施。
          </p>
          <p className={styles.bodyText}>
            行程在店内安全讲解后由向导带领，每名向导最多带 6 名驾驶者。路线不走高速公路，基本保险已包含在费用中，卡丁车是单人座，所以没有人能以乘客身份同行。除非加购全险，卡丁车损坏时需要承担 ¥50,000 自付额。{CHECKED} 确认。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>适合人群</span>
          <h2 className={styles.sectionTitle}>街头卡丁车行程适合你吗？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            1 小时路线加上 30 分钟报到约需 90 分钟，很容易安排进我们的
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={linkStyle}>
              东京 3 天行程（英文）
            </Link>
            或
            <Link href="/zh-cn/guides/attractions/things-to-do-tokyo" style={linkStyle}>
              东京必去景点
            </Link>
            。儿童不能驾驶，卡丁车又是单人座，所以全家出游时需要为未满 18 岁的家人另做安排；
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>
              东京亲子行程（英文）
            </Link>
            有适合全家人的每日安排。想在傍晚步行逛逛吗？
            <Link href="/guides/attractions/tokyo-night-food-tour" style={linkStyle}>
              东京夜间美食之旅（英文）
            </Link>
            完全不需要驾照，
            <Link href="/guides/attractions/tokyo-bike-tour" style={linkStyle}>
              东京自行车之旅指南（英文）
            </Link>
            中的电动助力自行车行程也一样。行程较长的话，东京湾路线适合放进
            <Link href="/guides/attractions/tokyo-4-day-itinerary" style={linkStyle}>
              东京 4 天行程（英文）
            </Link>
            的东京湾那一天。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>怎样预订东京卡丁车行程？</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>文件都准备好了吗？</strong>那就是预订的时候，在此之前不要预订，因为文件不齐时店家不会退款。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 预订涩谷 Annex 店行程 →
            </KlookLink>
            <KlookLink href={AKIHABARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 预订秋叶原行程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>安排当天</span>
          <h2 className={styles.sectionTitle}>东京卡丁车行程从哪里出发？</h2>
          <p className={styles.bodyText}>
            Street Kart 行程从你预订的店铺出发，每家店都有自己的路线。具体集合地点请看预订确认信息，并留出充足时间，在安全讲解前到达。
          </p>
          <Table head={["店铺", "地址", "最近车站（步行）"]} rows={startRows.map((r) => [r.shop, r.address, r.access])} />
          <p className={styles.bodyText} style={noteStyle}>
            来自 Street Kart 各店页面，{CHECKED} 确认。
          </p>
          <p className={styles.bodyText}>
            店铺没有停车场，运营方也不建议开车或乘 Uber，因为堵车可能让你迟到，而迟到者无法参加。我们的
            <Link href="/guides/attractions/where-to-stay-in-tokyo" style={linkStyle}>
              东京住宿区域指南（英文）
            </Link>
            比较了适合入住的地区；如果你还不熟悉东京交通，
            <Link href="/guides/transport/tokyo-transportation" style={linkStyle}>
              东京交通指南（英文）
            </Link>
            讲解了电车、地铁和 IC 卡的基础知识。
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="东京卡丁车常见问题" />

        <KlookTourPicks
          heading="如果文件不符合要求"
          intro="两个只需预订就能参加的东京行程，加上任何一天都用得上的 eSIM 和地铁票。请打开商品页面查看你计划日期的当前价格。"
          tours={picks}
        />

        <Related
          items={[
            { href: "/guides/attractions/akihabara-anime-tour", title: "秋叶原动漫之旅（2026）：导览行程、店铺营业时间和交通方式（英文）" },
            { href: "/guides/transport/tokyo-transportation", title: "东京交通指南（2026）：电车、地铁和 IC 卡（英文）" },
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京必去景点：哪些要提前购票、哪些可以直接去" },
            { href: "/guides/attractions/samurai-ninja-experience-tokyo", title: "东京武士和忍者体验（2026）：该订哪一种（英文）" },
            { href: "/guides/attractions/tokyo-food-tour", title: "东京美食之旅（2026）：选哪个区，以及导览能带来什么（英文）" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "东京地铁通票（2026）：24、48 或 72 小时，划算吗？（英文）" },
            { href: "/zh-cn/guides/attractions", title: "更多日本景点门票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>准备好在东京开车了吗？</h2>
            <p className={styles.ctaBannerDesc}>
              提前预订街头卡丁车行程，当天带齐国际驾照、本国驾照和护照。请记住：国际驾照必须在出发前于本国办好。
            </p>
            <KlookLink href={GOKART_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看东京街头卡丁车 →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
