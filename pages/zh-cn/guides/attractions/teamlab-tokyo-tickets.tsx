// Simplified Chinese edition of /guides/attractions/teamlab-tokyo-tickets. This URL answers one
// question, which of Tokyo's two teamLab museums to book. Since 28 Nov 2026 (task
// jtk-20261128-R01) it mirrors the English page's order: a three-sentence answer with both
// price floors, the visit length and the booking rule; one comparison table with the verdict in
// row one (where, station, price, time, what to wear, when booking opens, tickets on the day);
// the two Klook buttons and a same-day block (Tokyo day tour, Subway Ticket, Klook eSIM) under
// it; question H2s — how much, on the day, both in one day — and the same five FAQ questions.
// Official figures were re-read on 28 Nov 2026.
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
import NextBookingBlock from "../../../../components/NextBookingBlock";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import { fujiDayTour, klookEsim, tokyoSightseeingBusTour, tokyoSubwayTicket, type KlookTour } from "../../../../lib/klook-links";
import { cnTeamlabBorderless, cnTeamlabPlanets } from "../../../../lib/klook-links-zh-cn";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import KlookAddOnLine from "../../../../components/KlookAddOnLine";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import HotelStayBlock from "../../../../components/HotelStayBlock";
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
const SOURCE_NOTE = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const ROUTE = "/zh-cn/guides/attractions/teamlab-tokyo-tickets";
// 16 Nov 2026 (C01): the search term 东京teamLab门票 leads, with the Planets price question it is
// found for (行星馆票价); H1 in the same word order. 20 Nov 2026 (R01): unchanged subject.
// 23 Nov 2026 (C01): 14 impressions at 6.3, still 0 clicks after 16 Nov. The title now leads with
// the official name teamLab and puts the two museums head to head (Planets vs 麻布台), matching the
// English page's which-to-book intent (W21); the price stays in the meta and the lead.
const TITLE = "teamLab 东京门票 2026：Planets vs 麻布台价格";
const H1_LINE = "teamLab 东京门票 2026：";
const DESC =
  "teamLab东京门票2026：丰洲Planets成人¥3,800起、麻布台无界¥3,400起，两馆分开买。想赤脚涉水选Planets，想自由漫游选麻布台无界。";
const CHECKED_ISO = "2026-11-28";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);

// 第一行是结论。
const compareRows = [
  { factor: "适合谁", planets: "想赤脚走进水中体验的人（带孩子选这座）", borderless: "想穿鞋、没有固定路线自由漫游作品的人" },
  { factor: "地点", planets: "丰洲（江东区）", borderless: "麻布台之丘（港区）" },
  { factor: "最近车站", planets: "新丰洲站（百合海鸥线）1A 出口步行 3 分钟", borderless: "神谷町站（日比谷线）5 号出口步行 2 分钟" },
  { factor: "成人（18 岁以上）", planets: `${PLANETS_ADULT}，热门日期与时段更贵`, borderless: `${BORDERLESS_ADULT}，热门日期与时段更贵` },
  { factor: "13～17 岁／4～12 岁", planets: `¥2,800／${CHILD}；3 岁以下免费`, borderless: `¥2,800／${CHILD}；3 岁以下免费` },
  { factor: "参观时长", planets: "官方未公布；建议预留 1.5～2 小时", borderless: "约 1.5～2 小时（官方 FAQ），馆内不限时" },
  { factor: "着装", planets: "赤脚，水深可达成人膝盖；可免费借短裤", borderless: "穿鞋参观，没有水" },
  { factor: "开售时间", planets: "官方未公布开售日；网上出售指定时段门票", borderless: "约在参观日期前两个月的 1 日" },
  { factor: "当天购票", planets: "现场不售票，出发前先在网上购买", borderless: "未售罄时当天可在网上购买，现场购票加收 ¥200" },
  { factor: "开放时间", planets: "08:00–22:00（12/31–1/2 为 08:00–20:30）", borderless: "08:30–21:00，部分日期不同" },
  { factor: "开放期限", planets: "开放至 2027 年底", borderless: "常设" },
];

const costRows = [
  { who: "成人（18 岁以上）", planets: PLANETS_ADULT, borderless: BORDERLESS_ADULT, both: "¥7,200 起" },
  { who: "13～17 岁", planets: "¥2,800", borderless: "¥2,800", both: "¥5,600" },
  { who: "4～12 岁", planets: CHILD, borderless: CHILD, both: "¥3,000" },
  { who: "3 岁以下", planets: "免费", borderless: "免费", both: "免费" },
  { who: "残障人士", planets: "¥1,900 起", borderless: "¥1,700 起", both: "¥3,600 起" },
  { who: "现场购票", planets: "不售票", borderless: "成人加收 ¥200", both: "—" },
];

const faqItems: FaqItem[] = [
  {
    q: "东京 teamLab 哪个更好，Planets 还是麻布台无界？",
    a: "没有绝对的好坏。Planets 要赤脚走过深及成人膝盖的水，适合带孩子同行；无界没有地图和固定路线，可以穿鞋自由漫游作品。",
  },
  {
    q: "2026 年东京 teamLab 门票多少钱？",
    a: `成人票 teamLab Planets ${PLANETS_ADULT}、teamLab 无界 ${BORDERLESS_ADULT}，热门日期与时段更贵（${CHECKED} 查阅 teamlab.art）。13～17 岁 ¥2,800，4～12 岁两座都是 ${CHILD}，3 岁以下免费。如果两座都去，成人门票合计至少 ¥7,200。`,
  },
  {
    q: "teamLab 门票可以当天买吗？",
    a: "只有无界可以。teamLab 无界未售罄时，当天也能在官方售票网站购买，现场购票成人贵 ¥200。teamLab Planets 现场完全不售票，出发前必须先在网上购买。",
  },
  {
    q: "Planets 和无界可以一天都去吗？",
    a: "可以，因为每张票都有各自的日期和时间。但两座分别位于丰洲和麻布台之丘，teamLab 官方称无界参观约需 1.5～2 小时。安排两个入场时段时，请至少预留这段参观时间以及两馆之间的交通时间，或者分成两个半天。",
  },
  {
    q: "在哪里买 teamLab 门票最便宜？",
    a: "基础票价以官方售票网站公布为准，teamLab 也把 Klook 列为无界的官方销售渠道。实际影响票价的是参观日期：两座的成人票在热门日期与时段都会涨价，付款前请比较几个日期。无界现场购票比网上贵 ¥200。",
  },
];

// 对比表正下方：东京一日游・东京地铁通票・Klook eSIM。
const sameDayBookings: KlookTour[] = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "东京观光巴士一日游",
    desc: "配有讲解服务的环线观光行程，游览皇居庭园、浅草与东京晴空塔，提供多语种语音讲解",
  }),
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "东京地铁通票（24／48／72 小时）",
    desc: "可不限次数乘坐东京地铁及都营地铁所有线路，抵达后领取车票，无需在售票机前排队购票",
  }),
  { title: "Klook 日本 eSIM", desc: "两座美术馆入口都要出示手机电子票，出发前先准备好流量", url: klookFor(klookEsim.url, LOCALE) },
];
const fujiTour = withKlookLocale(fujiDayTour, LOCALE, {
  title: "东京出发富士山一日游",
  desc: "乘坐大巴的全天行程，前往富士山五合目、河口湖与忍野八海，当天晚上回到东京",
});

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
            {H1_LINE} <br />Planets vs 麻布台无界，价格比较与两馆怎么选
          </h1>
          <p className={styles.heroSubtitle}>
            东京有两座 teamLab 美术馆，门票需分别购买。这里说明两者的区别，以及该选哪一座。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "官方票价", "两馆对比"].map((t) => (
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
            <strong>东京 teamLab 门票成人在丰洲的 teamLab Planets {PLANETS_ADULT}、麻布台之丘的 teamLab 无界 {BORDERLESS_ADULT}</strong>，两座在热门日期与时段都会更贵（{CHECKED} 查阅官网）。teamLab 官方称无界参观约需 1.5～2 小时，Planets
            未公布时长，同样按 1.5～2 小时安排即可。两座都在网上出售指定时段门票，只有无界也能现场购票（加收 ¥200）。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>东京 teamLab 门票</strong>要从两座美术馆中选一座：想赤脚走进水中<strong>选 Planets</strong>，想自由漫游作品<strong>选无界</strong>。各日期票价与预订步骤见{" "}
              <Link href="/zh-cn/guides/attractions/teamlab-planets-tickets">teamLab Planets 门票</Link>攻略。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={cnTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 Planets 门票 →
              </KlookLink>
              <KlookLink href={cnTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看无界门票 →
              </KlookLink>
            </div>
            {/* A32 (27 Nov 2026): one line of 5% / 20% under the 2% ticket buttons. */}
            <KlookAddOnLine
              lead="同一天一起订："
              items={[
                { label: "东京地铁通票（24／48／72 小时）", url: klookFor(tokyoSubwayTicket.url, "zh-cn") },
                { label: "Klook 日本 eSIM", url: klookFor(klookEsim.url, "zh-cn") },
              ]}
            />
            {/* A34 (27 Nov 2026): the next booking of the same trip (high-EPC guides) — lib/next-booking.ts. */}
            <NextBookingBlock region="tokyo" locale="zh-cn" />
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>两馆对比<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>东京 teamLab 哪个更好：Planets 还是麻布台无界？</h2>
          <p className={styles.bodyText}>想走进水中体验选 Planets（带孩子也选这座），想穿鞋自由漫游选无界；其余区别列在下表。</p>
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
          <p className={styles.bodyText} style={SOURCE_NOTE}>
            最后查阅：{CHECKED_ISO}。来源：{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>、
            <a href="https://teamlabplanets.dmm.com/en/ticket" target="_blank" rel="noopener noreferrer">teamlabplanets.dmm.com/en/ticket</a>、
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>、无界 FAQ{" "}
            <a href="https://www.teamlab.art/faq/Tokyo/" target="_blank" rel="noopener noreferrer">teamlab.art/faq/Tokyo</a>。两座的成人票都按日期与时段浮动、只公布最低价，请确认所选日期的实际票价。Planets 的参观时长是规划参考，teamLab 未公布。
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

        <KlookTourPicks
          heading="和 teamLab 门票同一天要订的"
          intro="带讲解的东京一日游、地铁通票，以及手机电子票需要的流量。东京地铁通票可到无界的神谷町站；Planets 可乘有乐町线到丰洲站（步行 10 分钟），但不含新丰洲站的百合海鸥线。Klook 价格随日期变化，请打开页面查看所选日期的实际价格。"
          tours={sameDayBookings}
        />

        <KlookSameDayCards heading={SAME_DAY.heading} cards={SAME_DAY.cards} />

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="tokyo" areas={["ginza", "odaiba", "roppongi", "tokyoStation"]} />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>东京 teamLab 门票多少钱？</h2>
          <p className={styles.bodyText}>
            成人 Planets {PLANETS_ADULT}、无界 {BORDERLESS_ADULT}；两座门票分开买，都去的话成人 ¥7,200 起、4～12 岁 ¥3,000。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["票种", "teamLab Planets", "teamLab 无界", "两座都去"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.both}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={SOURCE_NOTE}>
            最后查阅：{CHECKED_ISO}，
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>、
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>。成人与残障人士票价是最低价，部分日期会上涨；“两座都去”为两个最低价相加。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>当天购票<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>teamLab 门票可以当天买吗？</h2>
          <p className={styles.bodyText}>
            只有无界可以：未售罄时当天也能在官方售票网站购买，现场购票成人贵 ¥200。Planets 现场不售票，出发前必须先在网上购买。
          </p>
          <p className={styles.bodyText}>
            无界门票约在参观日期前两个月的 1 日开售，官方提醒可能售罄；Planets 未公布开售日。开售日期、Flexible Pass 与现场购票请看{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-borderless-tickets">teamLab 无界门票</Link>攻略；各日期票价、Premium Pass
            与涉水着装请看 <Link href="/zh-cn/guides/attractions/teamlab-planets-tickets">teamLab Planets 门票</Link>攻略。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>两座都去<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>一天可以两座都去吗？</h2>
          <p className={styles.bodyText}>
            可以，只要买两张指定时段门票并留好间隔：每座预留 1.5～2 小时，再加上丰洲与麻布台之丘之间的交通时间，或者分成两个半天。
          </p>
          <p className={styles.bodyText}>
            两座都去成人 ¥7,200 起。无界的神谷町站在东京地铁日比谷线；Planets 从有乐町线丰洲站步行 10 分钟、从百合海鸥线新丰洲站步行 3 分钟。
            teamLab 之外还要排哪些地方，<Link href="/zh-cn/guides/attractions/things-to-do-tokyo">东京必去景点</Link>按门票价格与预约时机列出了 11 个景点。
          </p>
        </section>

        <BookingEsimCard />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="从东京出发的一日游"
          intro="参观其中任何一座美术馆，都只会占用当天东京行程的一部分时间。想离开市区玩一整天，可以参加富士山一日游。Klook 价格随日期变化，所以请打开页面查看所选日期的实际价格。"
          tours={[fujiTour]}
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
