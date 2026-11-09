// Simplified Chinese edition of /guides/attractions/teamlab-tokyo-tickets. Mirrors the English page
// as of 2026-11-06: this URL answers one question, which of Tokyo's two teamLab museums to book.
// Planets tickets, hours and access live on /zh-cn/guides/attractions/teamlab-planets-tickets.
// Every figure comes from the English page or lib/attraction-prices.ts; none is added here.
import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../../components/BookingEsimCard";
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
import { fujiDayTour, tokyoSightseeingBusTour, tokyoSubwayTicket } from "../../../../lib/klook-links";
import { cnTeamlabBorderless, cnTeamlabPlanets } from "../../../../lib/klook-links-zh-cn";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const LOCALE = "zh-cn" as const;

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const PLANETS_CHECKED = dateLabel(P.checked, LOCALE);
const BORDERLESS_CHECKED = dateLabel(B.checked, LOCALE);
const PLANETS_ADULT = priceLabel(P.adult, LOCALE);
const BORDERLESS_ADULT = priceLabel(B.adult, LOCALE);
const CHILD_AGES = "4～12 岁；未满 4 岁免费";

const ROUTE = "/zh-cn/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "teamLab Planets 无界 比较（2026）：两馆怎么选";
const DESC =
  "东京有两座 teamLab 美术馆，门票需分别购买。从票价、开放时间、地点和适合人群对比 Planets 与无界，再决定选哪一座。";

const compareRows = [
  { factor: "地点", planets: "丰洲（江东区）", borderless: "麻布台之丘（港区）" },
  { factor: "形式", planets: "赤脚涉水", borderless: "由 50 多件作品构成、没有固定路线的艺术空间" },
  { factor: "适合", planets: "亲子游客、首次参观者、喜欢身体互动体验的人", borderless: "艺术爱好者、喜欢慢慢逛和摄影的游客" },
  { factor: "成人票", planets: PLANETS_ADULT, borderless: BORDERLESS_ADULT },
  {
    factor: "儿童票",
    planets: `${priceLabel(P.child, LOCALE)}（${CHILD_AGES}）`,
    borderless: `${priceLabel(B.child, LOCALE)}（${CHILD_AGES}）`,
  },
  { factor: "开放时间", planets: "08:00–22:00（12/31–1/2 为 08:00–20:00）", borderless: "公告 08:30–21:00，按日期变动" },
  { factor: "入场", planets: "指定日期与入场时间", borderless: "指定时段，或不指定时间的 Flexible Pass" },
  { factor: "现场购票", planets: "现场不售票", borderless: "现场购票需加收 ¥200" },
  { factor: "开放期限", planets: "开放至 2027 年底", borderless: "常设" },
];

const whoFor = [
  {
    title: "选 Planets 的话…",
    desc: "如果带孩子同行、喜欢身体互动体验，也不介意赤脚涉水。你会赤脚走过水深及成人膝盖的水。",
  },
  {
    title: "选无界的话…",
    desc: "如果更想欣赏艺术，而不是涉水。这里没有固定路线，作品会在不同展览空间之间移动，你可以按自己的节奏游览。",
  },
  {
    title: "两座都去，如果…",
    desc: "如果行程中能安排出两个半天，又喜欢 teamLab。两座美术馆位于城市的不同区域，要分别购买指定时间的门票，所以请把时间错开。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "东京的 teamLab，Planets 和无界哪个更好？",
    a: "没有绝对的好坏。Planets 适合亲子游客、首次参观者和喜欢身体互动体验的人，你会赤脚涉水。无界适合想慢慢探索的艺术爱好者，没有地图，也没有固定路线。如果只能去一座，又带着孩子，就选 Planets。",
  },
  {
    q: "teamLab Planets 和无界是同一张门票吗？",
    a: "不是。它们是两座独立的美术馆，门票需分别购买，位于东京不同区域。Planets 的门票不能用于进入无界，反之亦然。",
  },
  {
    q: "东京 teamLab 门票多少钱？",
    a: `Planets 成人票 ${PLANETS_ADULT}，${PLANETS_CHECKED} 查阅。无界成人票 ${BORDERLESS_ADULT}，${BORDERLESS_CHECKED} 查阅。两座都按日期与时段定价，请确认所选日期的实际票价。`,
  },
  {
    q: "Planets 和无界可以同一天去吗？",
    a: "可以，因为每张票都有各自的日期和时间，但两座美术馆位于城市的不同区域，每一座都要花不少时间。分成两个半天更轻松。",
  },
  {
    q: "哪一座 teamLab 更适合带孩子？",
    a: "Planets。两座都是未满 4 岁免费，但 Planets 参观时间较短、偏重身体互动体验，孩子容易跟上。请带替换衣物，因为在涉水区每个人都会弄湿；另外婴儿车不可带入馆内。",
  },
];

const tripTours = [
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "东京地铁通票（24／48／72 小时）",
    desc: "东京地铁与都营地铁全线不限次乘坐，抵达后领取，不用排队购买",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "东京观光巴士一日游",
    desc: "带讲解的环线行程，游览皇居庭园、浅草与东京晴空塔，提供多语种语音讲解",
  }),
  withKlookLocale(fujiDayTour, LOCALE, {
    title: "东京出发富士山一日游",
    desc: "全天大巴行程，前往富士山五合目、河口湖与忍野八海，当天晚上回到东京",
  }),
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "teamLab Planets 与无界对比" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnTeamLabTokyoPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            teamLab Planets 与无界对比（2026）：<br />东京两馆怎么选？
          </h1>
          <p className={styles.heroSubtitle}>
            东京有两座 teamLab 美术馆，门票需分别购买。这里说明两者的区别，以及该选哪一座。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "官方票价", "并排比较"].map((t) => (
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
            <p className={styles.verdictText}>
              <strong>东京 teamLab 门票</strong>要先在两座美术馆之间做选择。带孩子或想体验涉水，
              <strong>选 Planets</strong>；想慢慢探索数字艺术，<strong>选无界</strong>。两座门票需分别购买：
              成人票 Planets {PLANETS_ADULT}，无界 {BORDERLESS_ADULT}。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={cnTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 Planets 门票 →
              </KlookLink>
              <KlookLink href={cnTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看无界门票 →
              </KlookLink>
            </div>
          </div>
        </div>

        <p className={styles.bodyText}>
          已经决定了？开放时间、预约方式和交通请看{" "}
          <Link href="/zh-cn/guides/attractions/teamlab-planets-tickets">teamLab Planets 门票攻略</Link>，或{" "}
          <Link href="/zh-cn/guides/attractions/teamlab-borderless-tickets">teamLab 无界门票攻略</Link>。
        </p>

        <BookingEsimCard />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>两馆对比<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>teamLab Planets 和无界，该选哪一座？</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Planets", "teamLab 无界"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Planets 的信息于 {PLANETS_CHECKED} 查阅 teamlab.art 与官方售票网站；无界的信息于 {BORDERLESS_CHECKED}{" "}
            查阅 teamlab.art。两座的成人票都按日期与时段定价，请确认所选日期的实际票价。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>选择指南<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>哪一座 teamLab 适合你？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="同一趟旅程可以一起订的行程"
          intro="参观任何一座美术馆都只占东京一天中的一部分时间。这里有地铁通票、带讲解的市区一日游和郊外一日游。Klook 价格随日期变化，所以请打开页面查看所选日期的实际价格。"
          tours={tripTours}
        />

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 门票（2026）：票价、时间与预约方式" },
            { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", title: "teamLab Borderless（无界美术馆）门票（2026）：票价、时段预约与购票渠道" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab 京都门票：票价、营业时间与预订（英文）" },
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab 福冈门票（2026）：票价、营业时间与预订（英文）" },
            { href: "/guides/transport/tokyo-transportation", title: "东京交通攻略（2026）：电车、地铁与交通卡（英文）" },
          ]}
        />
      </div>
    </>
  );
}
