import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import tools from "../../../../styles/Tools.module.css";
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
import { cnKlookEsim } from "../../../../lib/klook-links-zh-cn";
import { klookEsim } from "../../../../lib/klook-links";
import {
  cheapestPlan,
  formatDate,
  formatUsd,
  getProvider,
  latestCheckedAt,
  priceAtLeastLabel,
  priceFromLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/esim/best-esim-japan";
const TITLE = "日本eSIM推荐（2026）：流量卡方案比较与 Klook";
const DESC =
  "日本eSIM推荐 2026：Klook 日本 eSIM，以及 Airalo、Holafly、eSIM Go 等四家的价格比较，每天更新。";

// Prices come from data/esim-prices.json via lib/esim-prices.ts — the same file
// scripts/fetch-esim-prices.mjs refreshes daily and the English page reads. This
// edition quotes no figure the English one does not.
const pricesCheckedAt = formatDate(latestCheckedAt());

// The eSIM hub and the plan table are English-only for now, so the "see every
// plan" links are labelled as English rather than silently switching language.
const PLANS_HREF = "/guides/esim/japan-esim-data-plans";

type CnPick = {
  esimId: EsimProviderId;
  rank: number;
  /** The brand as these readers see it written. All four go by their Latin names. */
  name: string;
  bestFor: string;
  target: string;
  voice: boolean;
  physicalSim: boolean;
  /** Set where we cannot link the provider itself — see HOLAFLY_NOTE. */
  altOf?: EsimProviderId;
  altNote?: string;
};

// Holafly runs no affiliate programme we can join, which is why the English page
// points its CTA at Airalo's unlimited plans. Same decision, stated the same way.
const HOLAFLY_NOTE = "Holafly 没有我们能加入的推广联盟方案，所以这里的链接指向我们建议的替代选择 Airalo 的无限流量方案。";

const picks: CnPick[] = [
  {
    esimId: "airalo",
    rank: 1,
    name: "Airalo",
    bestFor: "综合首选",
    target: "大多数旅客——稳定、便宜、设置非常简单。",
    voice: false,
    physicalSim: false,
  },
  {
    esimId: "holafly",
    rank: 2,
    name: "Holafly",
    bestFor: "无限流量首选",
    target: "重度用量：远程办公、直播、每天视频通话的人。",
    voice: false,
    physicalSim: false,
    altOf: "airalo",
    altNote: HOLAFLY_NOTE,
  },
  {
    esimId: "esimgo",
    rank: 3,
    name: "eSIM Go",
    bestFor: "最划算",
    target: "预算有限，或这趟要走亚洲多国的人。",
    voice: false,
    physicalSim: false,
  },
  {
    esimId: "sakura",
    rank: 4,
    name: "Sakura Mobile",
    bestFor: "长期停留首选",
    target: "停留一个月以上、需要语音通话与英文客服的人。",
    voice: true,
    physicalSim: true,
  },
];

const installSteps = [
  {
    title: "购买并收到二维码",
    desc: "出发前在网上买好。几分钟内你就会收到邮件里的二维码，直接寄到你的邮箱。",
  },
  {
    title: "在「设置」里扫二维码",
    desc: "进入「设置」→「蜂窝网络」（或移动网络）→「添加 eSIM」→「扫描二维码」。不到 2 分钟，还没收拾行李就能在家做完。",
  },
  {
    title: "抵达时启用",
    desc: "飞机落地时把移动数据切到日本的 eSIM。你会在走到行李转盘前就有 4G 信号——不用找机场的 SIM 卡售货机。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "eSIM 是什么？去日本需要吗？",
    a: "eSIM 是内置在手机里的数字 SIM——不需要实体卡片。你用二维码下载配置文件，马上就能用。去日本不一定要 eSIM，但它是目前最方便的选项：出发前买好并安装，落地启用。",
  },
  {
    q: "哪些手机在日本支持 eSIM？",
    a: "大多数近几年的手机都支持 eSIM：iPhone XS 以后、Google Pixel 3 以后、Samsung Galaxy S20 以后，以及许多其他 Android 旗舰机。请到手机「设置」→「关于本机」确认。注意：部分被运营商锁定的手机可能不支持 eSIM。",
  },
  {
    q: "用日本 eSIM 的时候，原本的号码可以继续开着吗？",
    a: "可以——这是 eSIM 最大的优点之一。大多数双卡手机可以同时使用两张 SIM。你可以让原本的号码继续接电话与短信（例如银行卡的交易通知），由日本 eSIM 负责数据。",
  },
  {
    q: "日本要用 Airalo 还是 Holafly？",
    a: "对大多数人来说 Airalo 比较好——比较便宜、流量档位有弹性，而且同时使用 Docomo 与 SoftBank。如果你真的需要无限流量（远程办公、大量看视频），而且这趟的预算撑得起它的价差，Holafly 才胜出。",
  },
  {
    q: "落地日本后 eSIM 不能用怎么办？",
    a: "先确认那个 eSIM 配置文件的「数据漫游」有打开。还是没信号的话，把飞行模式开关一次，强制重新搜索网络。这里列的每一家都提供 24 小时在线人工客服——Airalo 与 Holafly 响应特别快。",
  },
  {
    q: "日本的 eSIM 和实体流量卡差在哪？",
    a: "两者都给你日本的移动数据，但 eSIM 设置更快（不必在机场排队）、多数情况更便宜，而且出发前就能买好。实体 SIM 卡要在落地后到机场柜台或售货机等。实体 SIM 的主要优点是：在不支持 eSIM 的手机上也能用。",
  },
  {
    q: "可以在日本直接用本国运营商的漫游吗？",
    a: "可以，但漫游很贵。多数国际运营商对日本漫游收每天约 $10～15。10 天的行程光是数据就要 $100～150——而一整个日本 eSIM 方案是 $9～18。除非你的运营商有涵盖日本的平价旅游加购包，专用的日本 eSIM 几乎都更便宜。",
  },
  {
    q: "Airalo 在日本用哪家网络？",
    a: "Airalo 的日本 eSIM 方案走 Docomo 与 SoftBank。Docomo 在日本的覆盖最广，包含乡村、山区与离岛。SoftBank 在都市与近郊很强。实际上，在观光区大多数旅客感觉不出两者的差别。",
  },
  {
    q: "Sakura Mobile 是什么？适合谁？",
    a: "Sakura Mobile 是日本本地的运营商，专为旅客与长期停留者提供 SIM 卡与 eSIM。和 Airalo、Holafly 不同，Sakura Mobile 含语音通话功能、有英语客服，方案也适用到 90 天的停留。它走 Docomo（日本最大的运营商）。它比便宜的 eSIM 贵，但对任何需要日本电话号码或长期停留的人来说是最好的选择。",
  },
  {
    q: "去日本需要多少流量？",
    a: "一般观光用途——Google 地图、消息、轻度浏览、拍几张照——每天 1 GB 是合理的估计。10 天的行程大约用 8～10 GB。如果你大量用导航开车、看视频，或远程办公，请算每天 2 GB 以上。多数旅客觉得 3～5 GB 的方案足够一周的日本行。",
  },
  {
    q: "日本流量卡（eSIM）要多少钱？",
    a: `日本 eSIM 的价格按运营商与流量档位而不同（核查时间 ${pricesCheckedAt}）。省钱选项：eSIM Go ${priceFromLabel("esimgo")} 起、Airalo ${priceFromLabel("airalo")} 起。中档：5 GB 方案 eSIM Go ${priceAtLeastLabel("esimgo", 5)}，Airalo ${priceAtLeastLabel("airalo", 5)}。无限流量：Holafly ${unlimitedFromLabel("holafly")} 起。日本本地、有英语电话客服：Sakura Mobile ${priceFromLabel("sakura")} 起。一般旅客一周的行程，预期在 $10～20。`,
  },
  {
    q: "日本行程买无限流量值得吗？",
    a: "对大多数观光客：不值得。日本的酒店、便利店与观光区 Wi-Fi 覆盖很好。3～5 GB 的方案就能撑过一般一周的导航、消息与浏览。无限流量方案（例如 Holafly）贵 2～3 倍，主要对大量看视频、频繁视频通话，或会去 Wi-Fi 不好的地区的重度使用者有意义。如果拿不定主意，先从 5 GB 开始，再考虑要不要加。",
  },
  {
    q: "到了日本可以加购流量吗？",
    a: "可以——大多数运营商支持在 App 内充值，不需要新的二维码。用 Airalo 的话，在 App 里买一个新方案，它会自动加到你现有的 eSIM 配置文件上。eSIM Go 与 Sakura Mobile 有类似的充值流程。Holafly 的无限流量方案是固定天数的，待更久就要买新方案。",
  },
  {
    q: "日本的 eSIM 方案含通话与短信吗？",
    a: "大多数面向旅客的 eSIM 方案——包括 Airalo、eSIM Go 与 Holafly——都是纯数据，不含语音通话或短信。在日本要通话，可以用 WhatsApp、LINE 或 FaceTime 走数据。如果你真的需要一个可以通话的日本号码，主要运营商里 Sakura Mobile 是最好的选择。",
  },
  {
    q: "日本 eSIM 什么时候启用？",
    a: "出发前就先安装（扫二维码）——这需要 2～5 分钟和一个 Wi-Fi 连接。不过大多数方案的天数是从你在日本第一次连上网络开始算，不是从你安装配置文件开始。所以飞机落地后再把数据切到日本的 eSIM，方案才会在你需要的时候才开始跑。",
  },
  {
    q: "日本哪家网络覆盖最好？",
    a: "Docomo 的乡村覆盖最完整，所以如果你的行程会离开主要城市，值得刻意挑它——eSIM Go 与 Sakura Mobile 都走它。SoftBank 与 KDDI（Airalo 与 Holafly 使用）在城市与观光动线上表现很好。走标准的东京－京都－大阪－广岛路线，四家都够用，你感觉不出差别。",
  },
  {
    q: "日本流量卡什么时候买？",
    a: "eSIM 出发前就买好，飞机落地立刻启用——没有等的理由，也不会售罄。实体 SIM 不一样：机场柜台与售货机在旺季真的会缺热门方案，而预订 Sakura Mobile 的 SIM 卡到机场或酒店取件，既比落地现买便宜，也比碰运气安全。",
  },
  {
    q: "为什么我的日本 eSIM 速度很慢？",
    a: "几个可能原因：你用掉了大部分流量（许多方案在门槛后降速）、你在覆盖不好的地方（隧道、山区），或是在涩谷、京都站这类拥挤观光区遇到网络拥堵。先试着开关飞行模式。如果流量还没用完、速度也没改善，请联系运营商客服。",
  },
];

const trail: Crumb[] = [
  { href: "/zh-cn/guides/attractions", label: "日本景点门票" },
  { label: "日本eSIM推荐" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnBestEsimJapanPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = zhMonthLabel(updated.iso);

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
              inLanguage: JSONLD_LANG["zh-cn"],
            }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>价格核查时间 {pricesCheckedAt}｜更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            日本eSIM推荐（2026）：<br />流量卡方案比较与 Klook 日本 eSIM
          </h1>
          <p className={styles.heroSubtitle}>
            主要的日本 eSIM 整理在一页，比价格、流量与网络。已经在 Klook 订门票的人，另有一个更省事的选择。
          </p>
          <div className={styles.heroBadges}>
            {["价格每天核查", "4 家 eSIM 比较", "独立评测"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Klook's Japan eSIM leads this edition for the same reason it leads the
            Traditional one: a reader from Singapore or Malaysia is very likely
            already holding a Klook account for the tickets, and one checkout is a
            real convenience rather than a sales line. It still carries no price,
            because Klook's product page blocks automated reads — the same
            constraint the English page states. */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>已经在用 Klook？</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>Klook 日本 eSIM：</strong>如果你的门票、一日游或机场车票已经订在 Klook 上，
              它自己也卖日本 eSIM——同一个账号、同一次结账、一张二维码电子券。对已经在那个平台上的人来说，
              这是最省事的做法。
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.86rem" }}>
              我们不把它放进下面的排名，原因很单纯：Klook 的产品页拦截自动读取（我们最后一次尝试是{" "}
              {klookEsim.checkedAt}），所以我们没有经过核查的价格或流量档位可以拿来跟其他四家比。
              打开商品页看目前的方案。下面四家的价格则是每天从它们自己的网站读取的。
            </p>
            <KlookLink href={cnKlookEsim.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              查看 Klook 日本 eSIM 方案 →
            </KlookLink>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>一览</span>
          <h2 className={styles.sectionTitle}>快速比较</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["运营商", "最适合", "最低价", "最便宜方案", "网络", "语音／短信", "实体SIM", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {picks.map(({ esimId, name, bestFor, voice, physicalSim, altOf }) => {
                    const cheapest = cheapestPlan(esimId);
                    const affiliateUrl = getProvider(altOf ?? esimId).affiliateUrl;
                    const isExternal = affiliateUrl !== "#";
                    const label = altOf ? "获取 Airalo 无限流量 eSIM →" : `获取 ${name} →`;
                    return (
                      <tr key={esimId}>
                        <td className={styles.tdProvider}>{name}</td>
                        <td className={styles.tdBestFor}>{bestFor}</td>
                        <td className={styles.tdPrice}>{cheapest ? formatUsd(cheapest.priceUsd) : "—"}</td>
                        <td className={styles.tdNetwork}>{cheapest ? cheapest.name : "—"}</td>
                        <td className={styles.tdNetwork}>{getProvider(esimId).network}</td>
                        <td>{voice ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>{physicalSim ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>
                          {isExternal ? (
                            <a href={affiliateUrl} className={styles.tdLink} target="_blank" rel="sponsored noopener">
                              {label}
                            </a>
                          ) : (
                            <Link href={PLANS_HREF} className={styles.tdLink}>
                              查看所有方案（英文）
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Klook, unranked for the reason stated in the box above. */}
                  <tr>
                    <td className={styles.tdProvider}>{cnKlookEsim.label}</td>
                    <td className={styles.tdBestFor}>已经在 Klook 订门票的人</td>
                    <td className={tools.tdMuted}>在 Klook 查看</td>
                    <td className={tools.tdMuted}>—</td>
                    <td className={tools.tdMuted}>商品页未标示</td>
                    <td><span className={styles.no}>✗</span></td>
                    <td><span className={styles.no}>✗</span></td>
                    <td>
                      <KlookLink href={cnKlookEsim.url} className={styles.tdLink} target="_blank" rel={KLOOK_REL}>
                        查看 Klook eSIM 价格 →
                      </KlookLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            <span className={tools.liveBadge}><span className={tools.liveDot} /> 价格每天核查</span>
            <span>
              「最低价」是各运营商最便宜的日本方案，时间点为 {pricesCheckedAt}。{" "}
              <Link href={PLANS_HREF} className={tools.inlineLink}>查看所有方案、按每 GB 单价排序（英文）→</Link>
            </span>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            只有 Sakura Mobile 卖语音方案与实体 SIM 卡——另外三家都是纯数据的 eSIM。如果你需要一个日本电话号码，
            或你的手机完全不能用 eSIM，在考虑价格之前选择就只剩一个。
          </p>
        </section>

        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>我们的排名</span>
          <h2 className={styles.sectionTitle}>日本 eSIM 四强</h2>
          <div className={styles.picksList}>
            {picks.map(({ esimId, rank, name, bestFor, target, altOf, altNote }) => {
              const provider = getProvider(esimId);
              const cheapest = cheapestPlan(esimId);
              const affiliateUrl = getProvider(altOf ?? esimId).affiliateUrl;
              const isExternal = affiliateUrl !== "#";
              const label = altOf ? "获取 Airalo 无限流量 eSIM →" : `获取 ${name} →`;
              return (
                <article key={esimId} id={esimId} className={styles.pickCard}>
                  <div className={styles.pickCardHeader}>
                    <div className={styles.pickRank}>
                      <span className={styles.pickNumber}>{rank}</span>
                      <div className={styles.pickMeta}>
                        <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>{bestFor}</span>
                        <span className={styles.pickName}>{name}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.pickCardBody}>
                    <p className={styles.pickSummary}>
                      网络：{provider.network}。
                      {cheapest ? `最便宜的日本方案为 ${formatUsd(cheapest.priceUsd)}（${cheapest.name}），价格核查时间 ${pricesCheckedAt}。` : ""}
                    </p>
                    <div className={styles.pickTarget}>
                      <span className={styles.pickTargetLabel}>最适合：</span>
                      <span>{target}</span>
                    </div>
                    <div className={styles.pickCtaRow}>
                      {isExternal ? (
                        <a href={affiliateUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
                          {label}
                        </a>
                      ) : (
                        <Link href={PLANS_HREF} className={styles.pickCta}>
                          查看所有方案（英文）
                        </Link>
                      )}
                    </div>
                    {altNote && (
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                        {altNote}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>设置教程</span>
          <h2 className={styles.sectionTitle}>日本 eSIM 怎么安装</h2>
          <div className={styles.stepsList}>
            {installSteps.map((step, i) => (
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

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/zh-cn/guides/transport/tokyo-airport-transfer", title: "成田机场到东京市区交通（2026）：Skyliner、N'EX 与利木津巴士比较" },
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京自由行景点（2026）：哪些要先订票、哪些可以现场去" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>门票订在 Klook，流量卡也一起订</h2>
            <p className={styles.ctaBannerDesc}>
              同一个账号、同一次结账、一张二维码电子券。打开商品页看目前的方案与价格。
            </p>
            <KlookLink href={cnKlookEsim.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看 Klook 日本 eSIM →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
