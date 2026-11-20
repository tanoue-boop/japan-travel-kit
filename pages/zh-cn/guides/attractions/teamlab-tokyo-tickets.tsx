// Simplified Chinese edition of /guides/attractions/teamlab-tokyo-tickets. This URL answers one
// question, which of Tokyo's two teamLab museums to book. Since 20 Nov 2026 (task
// jtk-20261120-R01) it mirrors the English page's order: a numbers-first answer, one comparison
// table with the verdict in row one, the Klook buttons and same-day block under it, short
// Planets-only / Borderless-only sections that hand over to their own guides, and the same five
// FAQ questions. Official figures were re-read on teamlab.art on 20 Nov 2026.
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
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import { teamlabSameDayCards } from "../../../../lib/teamlab-same-day-cards";

// Same-day cards under the comparison table (task-jtk-20261115-P01, moved 20 Nov 2026).
const SAME_DAY = teamlabSameDayCards("tokyo", "zh-cn");

const LOCALE = "zh-cn" as const;

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const PLANETS_ADULT = priceLabel(P.adult, LOCALE);
const BORDERLESS_ADULT = priceLabel(B.adult, LOCALE);
const CHILD = priceLabel(P.child, LOCALE);

const ROUTE = "/zh-cn/guides/attractions/teamlab-tokyo-tickets";
// 16 Nov 2026 (C01): the search term 东京teamLab门票 leads, with the Planets price question it is
// found for (行星馆票价); H1 in the same word order. 20 Nov 2026 (R01): unchanged subject.
const TITLE = "东京teamLab门票 2026：Planets与无界价格比较";
const H1_LINE = "东京teamLab门票 2026：";
const DESC =
  "东京teamLab门票2026：Planets成人¥3,800起、无界¥3,400起，两馆分开买。带孩子选Planets，首次成人游选无界，可在Klook预订。";
const CHECKED_ISO = "2026-11-20";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);

// 第一行是结论。
const compareRows = [
  { factor: "适合谁", planets: "带孩子同行，或想赤脚涉水体验的人", borderless: "不带孩子的首次参观者，或想穿鞋慢慢欣赏艺术的人" },
  { factor: "成人（18 岁以上）", planets: `${PLANETS_ADULT}，热门日期与时段更贵`, borderless: `${BORDERLESS_ADULT}，热门日期与时段更贵` },
  { factor: "13～17 岁", planets: "¥2,800", borderless: "¥2,800" },
  { factor: "儿童（4～12 岁）", planets: `${CHILD}；3 岁以下免费`, borderless: `${CHILD}；3 岁以下免费` },
  { factor: "需要涉水吗", planets: "需要。赤脚，水深可达成人膝盖", borderless: "不需要，可以穿鞋参观" },
  { factor: "参观时长", planets: "官方未公布；建议预留 1.5～2 小时", borderless: "约 1.5～2 小时（官方 FAQ），馆内不限时" },
  { factor: "会售罄吗", planets: "指定时段，现场不售票，须提前网上预订", borderless: "官网注明门票可能售罄；约在参观日两个月前的 1 日开售" },
  { factor: "现场购票", planets: "现场不售票", borderless: "有余票时可现场购买，加收 ¥200" },
  { factor: "最近车站", planets: "新丰洲站（百合海鸥线）1A 出口步行 3 分钟", borderless: "神谷町站（日比谷线）5 号出口步行 2 分钟" },
  { factor: "开放时间", planets: "08:00–22:00（12/31–1/2 为 08:00–20:00）", borderless: "08:30–21:00，部分日期不同" },
  { factor: "开放期限", planets: "开放至 2027 年底", borderless: "常设" },
];

const whoFor = [
  {
    title: "选 Planets 的话…",
    desc: "如果带孩子同行、喜欢身体互动体验，也不介意赤脚涉水。你需要赤脚走过深及成人膝盖的水域。",
  },
  {
    title: "选无界的话…",
    desc: "如果更想欣赏艺术，而不是涉水。这里没有固定路线，作品会在不同展区之间移动，你可以按自己的节奏游览。",
  },
  {
    title: "两座都去，如果…",
    desc: "如果行程中能安排出两个半天，又喜欢 teamLab。两座美术馆位于城市的不同区域，需要分别购买指定入场时段的门票，因此请错开两座场馆的预约时间。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "teamLab Planets 和无界哪个更好？",
    a: "没有绝对的好坏。Planets 要赤脚走过深及成人膝盖的水，适合带孩子同行；无界没有地图和固定路线，可以穿鞋慢慢欣赏艺术。带孩子可选 Planets；不带孩子、首次参观可选无界。",
  },
  {
    q: "2026 年东京 teamLab 门票多少钱？",
    a: `成人票 teamLab Planets ${PLANETS_ADULT}、teamLab 无界 ${BORDERLESS_ADULT}，热门日期与时段更贵（${CHECKED} 查阅 teamlab.art）。13～17 岁 ¥2,800，4～12 岁两座都是 ${CHILD}，3 岁以下免费。两座都去，成人至少 ¥7,200。`,
  },
  {
    q: "teamLab 门票会售罄吗？",
    a: "会。无界官网注明门票指定日期与时段、可能售罄，建议行程确定后尽快购买；门票约在参观日两个月前的 1 日开售。Planets 现场完全不售票，必须提前在网上预订。",
  },
  {
    q: "Planets 和无界可以同一天去吗？",
    a: "可以，因为每张票都有各自的日期和时间。但两座分别位于丰洲和麻布台之丘，teamLab 官方称无界参观约需 1.5～2 小时。两个入场时间之间请至少留出这段时间加上路程，或者分成两个半天。",
  },
  {
    q: "在哪里买 teamLab 门票最便宜？",
    a: "基础票价以官方售票网站公布为准，teamLab 也把 Klook 列为无界的官方销售渠道。实际影响票价的是参观日期：两座的成人票在热门日期与时段都会涨价，付款前请比较几个日期。无界现场购票比网上贵 ¥200。",
  },
];

const subwayTour = withKlookLocale(tokyoSubwayTicket, LOCALE, {
  title: "东京地铁通票（24／48／72 小时）",
  desc: "可不限次数乘坐东京地铁及都营地铁所有线路，抵达后领取，无需排队购票",
});
const tripTours = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "东京观光巴士一日游",
    desc: "提供讲解的环线观光行程，游览皇居庭园、浅草与东京晴空塔，提供多语种语音讲解",
  }),
  withKlookLocale(fujiDayTour, LOCALE, {
    title: "东京出发富士山一日游",
    desc: "乘坐大巴的全天行程，前往富士山五合目、河口湖与忍野八海，当天晚上回到东京",
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

      {/* 16 Nov 2026 (C01): Google showed this page as "日本景点门票teamLab Planets 门票" — the
          breadcrumb glued to the title — so, as on the Shibuya Sky page, the breadcrumb now sits
          below the hero and the H1 is the first text on the page. */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            {H1_LINE} <br />Planets 与无界价格比较，两馆怎么选
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

      <Breadcrumb trail={trail} />

      <div className={styles.content}>
        <Disclosure />

        {/* Lead paragraph: the answer, in the body rather than the hero (16 Nov 2026, C01). */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>东京两座 teamLab 美术馆的门票需要分别购买：丰洲的 teamLab Planets 成人 ¥3,800 起，麻布台之丘的 teamLab 无界成人 ¥3,400 起</strong>，
            4～12 岁儿童票两座都是 ¥1,500，3 岁以下免费（{CHECKED} 查阅官网）。teamLab 官方称无界参观约需 1.5～2 小时，Planets
            未公布时长，同样按 1.5～2 小时安排即可。带孩子就选赤脚涉水的 Planets；如果是第一次参观且不带孩子，就选可以穿鞋参观、有余票时也能现场购票的无界。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>东京 teamLab 门票</strong>首先要从两座美术馆中选一座：带孩子<strong>选 Planets</strong>，
              不带孩子、首次参观<strong>选无界</strong>。成人票 Planets {PLANETS_ADULT}，无界 {BORDERLESS_ADULT}。
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

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>两馆对比<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>teamLab Planets 和无界，该选哪一座？</h2>
          <p className={styles.bodyText}>带孩子选 Planets，不带孩子、首次参观的成人选无界；理由逐项列在下表。</p>
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
            最后查阅：{CHECKED_ISO}。来源：{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>、
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>、
            无界 FAQ{" "}
            <a href="https://www.teamlab.art/faq/Tokyo/" target="_blank" rel="noopener noreferrer">teamlab.art/faq/Tokyo</a>。
            两座的成人票都按日期与时段浮动、只公布最低价，请确认所选日期的实际票价。Planets 的参观时长是规划参考，teamLab 未公布。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={cnTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看所选日期的 Planets 门票 →
            </KlookLink>
            <KlookLink href={cnTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看所选日期的无界门票 →
            </KlookLink>
          </div>
        </section>

        <KlookSameDayCards heading={SAME_DAY.heading} cards={SAME_DAY.cards} />

        <KlookTourPicks
          heading="丰洲与麻布台之丘之间怎么走"
          intro="无界所在的神谷町站属于东京地铁日比谷线，东京地铁通票可在 24／48／72 小时内不限次数乘坐东京地铁及都营地铁所有线路。Planets 所在的新丰洲站属于百合海鸥线，通票不能乘坐，可改用有乐町线丰洲站。"
          tours={[subwayTour]}
        />

        <BookingEsimCard />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>只去 Planets<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>已经决定去 teamLab Planets 了吗？</h2>
          <p className={styles.bodyText}>
            丰洲的 teamLab Planets 只卖指定时段门票，成人 {PLANETS_ADULT}，现场不售票，所以在网上选好日期和入场时间就是预约。
            各日期票价、Premium Pass、涉水穿着以及从新丰洲站或丰洲站过去的路线，都在 Planets 门票攻略里。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <Link href="/zh-cn/guides/attractions/teamlab-planets-tickets" className={styles.verdictBtn}>
              查看完整的 Planets 门票攻略 →
            </Link>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>只去无界<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>已经决定去 teamLab 无界了吗？</h2>
          <p className={styles.bodyText}>
            麻布台之丘的 teamLab 无界出售成人 {BORDERLESS_ADULT} 的指定时段门票和不指定入场时间的 Flexible Pass，约在参观日两个月前的
            1 日开售。开售日期、Flexible Pass、闭馆时间变动和现场购票，请看无界门票攻略。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <Link href="/zh-cn/guides/attractions/teamlab-borderless-tickets" className={styles.verdictBtn}>
              查看完整的无界门票攻略 →
            </Link>
          </div>
        </section>

        <EsimCtaTop />

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

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="同一趟旅程可以一起订的行程"
          intro="参观其中任何一座美术馆，都只会占用当天东京行程的一部分时间。这里有带讲解的市区一日游和郊外一日游。Klook 价格随日期变化，所以请打开页面查看所选日期的实际价格。"
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
