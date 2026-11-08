// Mirrors the English page (pages/guides/attractions/mt-fuji-day-tour-from-tokyo.tsx) as of
// 2026-11-01: same sections, tables, FAQ, Klook/GetYourGuide blocks in the same order. Tour
// contents and durations are the English page's (Klook listings checked 19 Oct 2026); no
// figure has been added, and no price is quoted because Klook blocks automated reads.
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
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import GygCompare, { GygCompareButton } from "../../../../components/GygCompare";
import {
  fujiDayTour,
  fujiHakoneDayTour,
  fujiSubaruLineHakoneBusTour,
  fujiHakoneBulletTrainTour,
} from "../../../../lib/klook-links";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { gygFujiBusTours, gygFujiFromTokyo } from "../../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo";
const TITLE = "富士山一日游（东京出发·2026）：行程怎么选、五合目看什么";
const DESC =
  "比较东京出发的富士山一日游：只跑富士山，还是加箱根；Subaru Line 五合目是什么地方、一天要多久、从海外怎么订。与英文版同一组数据、同一个核查日。";
const GYG_SLUG = "zh-cn-mt-fuji-day-tour-from-tokyo";

const CHECKED = dateLabel("2026-10-19", LOCALE);

const tourFuji = withKlookLocale(fujiDayTour, LOCALE, {
  title: "东京出发富士山一日游",
  desc: "全天巴士行程，前往富士山五合目、河口湖与忍野八海，当天晚上回到东京",
});
const tourFujiHakone = withKlookLocale(fujiHakoneDayTour, LOCALE, {
  title: "富士山＋箱根一日游",
  desc: "富士山五合目搭配箱根火山地带与芦之湖，从东京出发的一日行程",
});
const tourSubaruBus = withKlookLocale(fujiSubaruLineHakoneBusTour, LOCALE, {
  title: "富士山Subaru Line五合目、芦之湖＋箱根巴士团",
  desc: "东京出发的拼团巴士一日游，把 Subaru Line 五合目与芦之湖游船排在同一天",
});
const tourBulletReturn = withKlookLocale(fujiHakoneBulletTrainTour, LOCALE, {
  title: "富士山＋箱根（可选新干线返程）",
  desc: "同样的五合目与芦之湖路线，回东京时可选坐新干线而不是巴士",
});

const tourRows = [
  {
    tour: "富士山五合目、河口湖、忍野八海＋御殿场",
    covers: "五合目，加上河口湖、涌泉村落忍野八海与一站奥特莱斯",
    length: "全天，当天晚上回到东京",
    url: tourFuji.url,
    best: "一天里的景点最多",
  },
  {
    tour: "富士山＋箱根一日游",
    covers: "五合目、大涌谷火山谷（含缆车下行）、芦之湖游船",
    length: "行程标示约 11 小时",
    best: "一天跑两个目的地",
    url: tourFujiHakone.url,
  },
  {
    tour: "富士山Subaru Line五合目、芦之湖＋箱根拼团巴士",
    covers: "同样的富士山加箱根组合，拼团巴士版本",
    length: "东京出发，全天",
    best: "费用较低的巴士座位",
    url: tourSubaruBus.url,
  },
  {
    tour: "富士山＋箱根（可选新干线返程）",
    covers: "五合目、大涌谷与芦之湖，返程可选坐新干线",
    length: "东京出发，全天",
    best: "返程更短、更舒服",
    url: tourBulletReturn.url,
  },
];

const whoFor = [
  {
    title: "选只跑富士山的行程，如果…",
    desc: "山本身就是重点，而且你想在湖边多待一会儿。五合目、河口湖与忍野八海都在山的北侧、彼此很近，所以只跑富士山的一天比较从容，每一站都真的有停留，而不是一连串的巴士移动。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18l6-13 5 8 3-4 4 9z" />
        <line x1="2" y1="21" x2="22" y2="21" />
      </svg>
    ),
  },
  {
    title: "选富士山＋箱根的行程，如果…",
    desc: "你只有一天空档，想从中拿到两个目的地。合并行程多了大涌谷火山谷、一段缆车与芦之湖游船——所列行程标示约 11 小时，是很长但很充实的一天。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
        <path d="M5 12l4-7 4 6 2-2 4 5z" />
      </svg>
    ),
  },
  {
    title: "改成自己去，如果…",
    desc: "你宁愿按自己的节奏走，也不介意换乘电车与巴士。箱根特别适合这样——箱根周游券把整个环线变成一张票。富士山的五合目就难得多，不参加一日游或不租车不太好到。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "先决定是只跑富士山，还是富士山加箱根",
    desc: "这才是真正的选择，也决定了你这一天有多长。只跑富士山的行程把时间都放在山的北侧；合并行程拿掉其中一部分，换成箱根的火山谷与湖上游船，代价是在巴士上坐得更久。",
  },
  {
    title: "确认你那天的五合目实际上是什么",
    desc: `富士Subaru Line五合目是这座山上公路能到的最高点——所列行程把它写成海拔 2,300 米。它是一个观景点加上一片店铺，不是山顶：富士山的官方登山季在 9 月 10 日结束，上方的登山道冬季封闭。核查日期 ${CHECKED}。`,
  },
  {
    title: "接受看不看得到山要看天气",
    desc: "没有任何行程能保证你看到山。富士山经常躲在云里，能见度通常在较凉爽、较干燥的月份与一天中较早的时段比较好。运营方不论天气都会出团，所以订这一天时，要把其他停留点也一起算进值不值得。",
  },
  {
    title: "选好日期，用看得懂的界面、刷得过的卡来订",
    desc: "这些是指定日期、座位有限的巴士团，热门日期会先订满。Klook 的界面看得懂、接受境外信用卡——这点很重要，因为好几家日本运营方自己的订票页，在语言和刷卡上都不太友好。",
  },
  {
    title: "想清楚你要怎么到集合地点",
    desc: "东京出发的团大多清晨从新宿或东京站附近出发。先确认是哪一边，再把当天第一班地铁或 JR 排进去——错过巴士出发，是没法补救的失误。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "东京出发的富士山一日游值得吗？",
    a: "对大多数只有一天空档的游客来说，值得——主要是因为替代方案比看起来难。富士Subaru Line五合目坐电车到不了，自己去就得换乘巴士或租车，而山周边的景点又很分散。巴士团把这些收拢成一次预订。要注意的是天气：山经常在云里，没有任何行程能保证你看到它。",
  },
  {
    q: "富士Subaru Line五合目是什么？",
    a: `它是富士山上公路能到达的最高点，也是几乎每一个东京出发的一日游都会停的地方——所列 Klook 行程把它写成海拔 2,300 米。它是一个有商店和餐厅的观景点，不是山顶。富士山的官方登山季在 9 月 10 日结束，五合目以上的登山道冬季封闭，所以一日游是到山腰走走，而不是登山。核查日期 ${CHECKED}。`,
  },
  {
    q: "东京出发的富士山一日游要多久？",
    a: `请预留一整天。所列的富士山加箱根合并行程标示约 11 小时，只跑富士山的行程也是当天晚上才回到东京。清晨从东京市中心出发。如果你的行程很紧，要知道一日游就是整整一天——不是半天的小旅行。行程时间按 ${CHECKED} 的标示。`,
  },
  {
    q: "该选只跑富士山，还是富士山加箱根？",
    a: "只跑富士山的行程停留在山的北侧，通常会去河口湖与涌泉村落忍野八海，这样的一天比较不赶，每一站都有实际的停留时间。富士山加箱根的行程多了大涌谷火山谷、一段缆车与芦之湖游船，但一天更长，更多时间花在路上。如果这是你唯一的空档日，选合并行程；如果你宁愿少看几个地方但看得仔细，选只跑富士山。",
  },
  {
    q: "多云的话，行程中看得到富士山吗？",
    a: "不太能指望。富士山会自己形成天气，相当多的时间都在云里，在较温暖、较潮湿的月份尤其如此。能见度一般在一年中较凉爽、较干燥的时期与一天中较早的时段比较好。行程不论天气都会出团，所以合理的做法是：挑一个其他停留点——湖、火山谷、游船——本身就让你愿意去的行程。",
  },
  {
    q: "不参加一日游，可以自己当天往返富士山吗？",
    a: "你可以自己坐高速巴士或电车到河口湖一带，从那里在开放季节有巴士开上 Subaru Line。这需要规划，班次不多，返程时间算错还可能被困住。箱根是两者中比较容易自己跑的，因为箱根周游券一张票就涵盖电车、登山缆车、空中缆车、巴士与游船的整个环线。",
  },
  {
    q: "富士山一日游需要 JR Pass 吗？",
    a: "不需要。东京出发的一日游坐的是巴士，车费已含在行程价格里——铁路周游券在这段路上派不上用场。唯一的例外是提供新干线返程的行程，周游券可能涵盖那一段。如果你在考虑整趟旅程要不要买铁路周游券，我们的英文版 JR Pass 攻略算了回本点。",
  },
  {
    q: "东京的富士山一日游从哪里出发？",
    a: "大多清晨从新宿或东京站一带出发；确切的集合地点写在你预订的行程页上。订的时候就确认，并以它为准安排当天第一段交通，因为巴士不会等人。如果你的集合点在东京地铁或都营线上，东京地铁通票可以使用，但不含 JR。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "富士山一日游（东京出发）" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnMtFujiDayTourPage({ updated }: { updated: PageUpdated }) {
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
            富士山一日游（东京出发·2026）：<br />行程怎么选、实际能看到什么
          </h1>
          <p className={styles.heroSubtitle}>
            每一个行程都会停 Subaru Line 五合目。差别在于这一天剩下的时间给了富士山还是箱根——
            以及你愿意在巴士上坐多久。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "只跑富士山 vs 富士山＋箱根", "五合目是什么"].map((t) => (
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
            <span className={styles.verdictLabel}>快速结论</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>一天长度</p>
                <p className={styles.verdictStatValue}>最长约 11 小时</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>主要停留</p>
                <p className={styles.verdictStatValue}>Subaru Line 五合目</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>出发</p>
                <p className={styles.verdictStatValue}>清晨，东京市中心</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>看得到富士山？</p>
                <p className={styles.verdictStatValue}>永远不保证</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>结论：</strong>如果这是你唯一的空档日，选富士山加箱根的行程，一天拿到两个目的地。
              如果你宁愿少看几个地方但看得仔细，选含河口湖与忍野八海的只跑富士山行程。不论哪一种，这一天都大约
              11 小时，而山可能在云里——请挑一个就算没看到山、其他停留点你也会喜欢的行程。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tourFujiHakone.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看富士山一日游 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygFujiFromTokyo} />
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>为什么几乎每个人都参加一日游</h2>
          <p className={styles.bodyText}>
            富士山距离东京约两小时车程，但游客真正想站的那个位置，电车实际上到不了。五合目没有车站：
            富士Subaru Line是一条收费公路，自己上去就得从河口湖一带换乘巴士，而那班巴士的时刻表不会原谅你晚出门。
          </p>
          <p className={styles.bodyText}>
            这就是富士山周边一日游市场这么大的原因，也是这些行程第一眼看起来这么像的原因。它们全都停五合目。
            差别在于剩下那六个小时做什么——而那才是值得拿来比较的地方。
          </p>
          <p className={styles.bodyText}>
            河口湖这一侧就不一样了：五重塔、湖畔与忍野八海都能从新宿坐直达电车抵达。我们的{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo">富士山自助一日游攻略（英文）</Link>
            介绍了这条路线、Mt. Fuji Pass 的价格，以及不跟巴士团要怎么安排这一天。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比较</span>
          <h2 className={styles.sectionTitle}>东京出发的四种富士山一日游</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["行程", "内容", "时长", "最适合"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider}>
                        <KlookLink href={row.url} target="_blank" rel={KLOOK_REL} className={styles.tdLink}>
                          {row.tour}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            内容与时长按 {CHECKED} Klook 行程页上的描述。这里不列价格：Klook 价格随日期变化——请打开行程页查看你那天的实时价格。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>哪一种一天</span>
          <h2 className={styles.sectionTitle}>哪一种安排适合你？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            如果你最感兴趣的是箱根那一半，它也正是最适合自己跑的那一半——请看我们的{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">箱根一日游攻略（英文）</Link>
            ，里面有周游券价格与整个环线怎么串起来。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>富士山一日游怎么订</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            铁路方面——周游券到底值不值得买，以及部分行程的新干线返程怎么搭配——请看我们的{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass 攻略（英文）</Link>和{" "}
            <Link href="/guides/transport/tokyo-transportation">东京交通攻略（英文）</Link>。
          </p>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="上面比较的四个行程"
          intro="四个行程都从东京出发、都会停 Subaru Line 五合目。打开行程页，查看你那天的价格与出发地点。"
          tours={[tourFujiHakone, tourFuji, tourSubaruBus, tourBulletReturn]}
        />

        <GygCompare
          slug={GYG_SLUG}
          heading="GetYourGuide 上的富士山一日游"
          intro="拼团巴士在固定日期只有固定的座位数，所以安排富士山这一天，真正该问的不是哪个行程最好，而是哪个行程在你那天还有位子。GetYourGuide 上是另一批运营方——如果上面四个都订满了，先从这里找，别急着放弃富士山。"
          listings={[gygFujiFromTokyo, gygFujiBusTours]}
        />

        <Related
          items={[
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "河口湖一日游（东京出发·2026）：路线、车费与一天能排多少（英文）" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "富士急乐园门票（2026）：Free Pass 价格、Q Pack 与交通方式（英文）" },
            { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "箱根一日游（东京出发·2026）：周游券价格 vs 一日游行程（英文）" },
            { href: "/zh-cn/guides/attractions/tokyo-skytree-tickets", title: "东京晴空塔门票（2026）：票价、350 与 450 楼怎么选" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "富士山自助一日游（东京出发·2026）：自己怎么去（英文）" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "东京地铁通票（2026）：24、48 还是 72 小时，值得买吗？（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略（2026）：价格、值不值得与购买方式（英文）" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/guides/transport/tokyo-transportation", title: "东京交通攻略（2026）：电车、地铁与 IC 卡（英文）" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>一天空档，两个目的地</h2>
            <p className={styles.ctaBannerDesc}>
              富士山加箱根的行程把 Subaru Line 五合目和大涌谷、芦之湖游船排在同一天。
              Klook 的界面看得懂，也接受境外信用卡。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={tourFujiHakone.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看富士山一日游 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygFujiFromTokyo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
