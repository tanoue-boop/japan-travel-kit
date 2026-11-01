import Head from "next/head";
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
import {
  cnDotonboriCityCruise,
  cnDotonboriNaniwaBoat,
  cnOsakaAmazingPass,
} from "../../../../lib/klook-links-zh-cn";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, zhDateLabel, zhMonthLabel } from "../../../../lib/i18n";

const ROUTE = "/zh-cn/guides/attractions/dotonbori-river-cruise";
const TITLE = "道顿堀游船（2026）：票价、时间与搭船处";
const DESC =
  "道顿堀游船票价与时间：とんぼり游船成人 ¥2,000、约 20 分钟，太左卫门桥码头 11:00–21:00 每半小时一班。";

// Every figure comes from the English guide, which read the fares, the schedule and
// the pass conditions off osaka-info.jp (Osaka Convention & Tourism Bureau), the
// Osaka Amazing Pass operator's own free-admission list and suito-osaka.jp on
// 1 November 2026. Nothing was re-checked or added for this edition.
const CHECKED = zhDateLabel("2026-11-01");
// The pass price is owned by lib/attraction-prices.ts, shared with the English pages.
const PASS_1_DAY = PRICES.osakaAmazingPass.adult;

const fareRows = [
  { tier: "成人", price: "¥2,000", what: "太左卫门桥码头的现场票价，也是衡量通票值不值得的基准" },
  { tier: "学生（初中以上）", price: "¥1,000", what: "成人的一半——大阪少数有学生票价的景点之一" },
  { tier: "儿童（小学生）", price: "¥500", what: "成人的四分之一" },
  { tier: "学龄前儿童", price: "免费", what: "每位付费成人可带一位免费，第二位按儿童票 ¥500" },
  { tier: "大阪周游卡持有人", price: "免费", what: "含一次乘船——但必须先在接待柜台换成指定时间的票" },
  { tier: "大阪 e-Pass 持有人", price: "免费", what: "大阪市官方的 e-Pass 页面也把它列为免费设施" },
];

const scheduleRows = [
  { what: "首班", when: "11:00" },
  { what: "末班", when: "21:00" },
  { what: "班距", when: "每 30 分钟一班——整点与半点，所以一天 21 班" },
  { what: "在水上的时间", when: "约 20 分钟" },
  { what: "搭船处", when: "とんぼりリバーウォーク（北岸）的太左卫门桥码头，离戎桥一分钟" },
  { what: "接待柜台", when: "码头正对面的唐吉诃德道顿堀店 1 楼" },
  { what: "售票处开门", when: "当天首班前一小时——10:00" },
  { what: "线上订票截止", when: "开船前 10 分钟（预先付款）" },
  { what: "电话预约", when: "不受理" },
  { what: "2026 年停航日", when: "7 月 13、24、25 日" },
  { what: "临时停航", when: "可能因河川状况与船只维修未经公告即变更" },
];

const boatRows = [
  {
    boat: "とんぼり游船（一本松海运）",
    run: "约 20 分钟，11:00–21:00 每半小时",
    fare: "成人 ¥2,000／学生 ¥1,000／儿童 ¥500",
    pass: "大阪周游卡与大阪 e-Pass 免费",
    sold: "太左卫门桥码头现场，或运营方自己的线上订票",
  },
  {
    boat: "Wonder Cruise — 道顿堀航线",
    run: "20 分钟，绕行道顿堀这一段",
    fare: "成人 ¥1,000／儿童 ¥500",
    pass: "不是通票设施",
    sold: "日本桥码头，旁边 WONDER PUB 店内的售票亭",
  },
  {
    boat: "Wonder Cruise — 大阪航线",
    run: "30～40 分钟，日本桥↔八轩家滨单程",
    fare: "成人 ¥1,800／儿童 ¥900",
    pass: "不是通票设施",
    sold: "同一个售票亭——班次有限，官方建议提前预约",
  },
  {
    boat: "浪花观光游船",
    run: "30 分钟（按 Klook 商品页说明）",
    fare: "现在的票价请看商品页",
    pass: "不是通票设施",
    sold: "Klook，简体中文界面、海外信用卡",
  },
  {
    boat: "道顿堀 City Cruise",
    run: "20 分钟（按 Klook 商品页说明）",
    fare: "现在的票价请看商品页",
    pass: "不是通票设施",
    sold: "Klook——沙发式座位、可自带饮料、可带宠物",
  },
];

const whoFor = [
  {
    title: "天黑之后再坐，如果…",
    desc: "你想要明信片上的那个版本。固力果招牌、戎桥一带店面的霓虹，以及水面上的反光，就是这趟游船的重点，而下午两点它们一个都不存在。末班是 21:00，所以就算在大阪日落超过 19:00 的盛夏，天黑后还有四班可坐。",
  },
  {
    title: "白天坐，如果…",
    desc: `你持有通票想把一天排得顺，或你带着小孩。白天的班次是比较好抢到的——通票运营方自己的建议就是在白天去换票，因为傍晚的船最先没位——而 13:00 的 20 分钟对通票持有人来说不花钱，还可以塞在另外两个行程之间。建议内容核查日 ${CHECKED}。`,
  },
  {
    title: "改坐别艘，如果…",
    desc: "你想要更便宜的票价、有靠背的座位、更长的航程，或是手上有一杯饮料。とんぼり那艘是班次最密、通票有涵盖的；Wonder Cruise 从日本桥码头出发，同样 20 分钟只要一半的钱；其他运营方则卖 30 分钟的航程、可自带饮料的沙发座位船，以及附夜店入场的 DJ 船。同一条河，很不一样的晚上。",
  },
];

const steps = [
  {
    title: "先决定你要不要用通票",
    desc: `这是整页唯一会动到钱的决定。とんぼり游船是大阪周游卡的免费设施，一日卡 ${PASS_1_DAY}——所以如果行程里本来就有一天要用通票，你根本不用买船票。如果没有，现场成人票价是 ¥2,000，而日本桥码头的 Wonder Cruise 20 分钟道顿堀航线是 ¥1,000，是这条河上较便宜的单张票。`,
  },
  {
    title: "用通票的话，当天早一点去换票",
    desc: "光有通票上不了船。你要在接待柜台换成一张印有时间的票，运营方明白写着只能在票上的时间登船。通票运营方自己的提醒是傍晚的船最先满，所以请在白天完成换票——走去别的行程时经过码头，顺手把时段处理掉。",
  },
  {
    title: "要自己付钱的话，现场或线上，不要打电话",
    desc: "当天票在码头旁的售票处卖，售票处在当天首班前一小时开门。不受理电话预约。线上订票开放到开船前 10 分钟，而且要预先付款——周五或周六晚上值得用这一种。",
  },
  {
    title: "码头比地址看起来好找",
    desc: "太左卫门桥码头在北岸的とんぼりリバーウォーク步道上，接待柜台在唐吉诃德道顿堀店一楼——就是侧面挂着摩天轮那一栋。从难波、心斋桥或日本桥站走 5 到 10 分钟，但这三站都把你放在对岸，所以要从戎桥或太左卫门桥过河。",
  },
  {
    title: "从头到尾预留约 40 分钟，不是 20 分钟",
    desc: "游船是 20 分钟。接待柜台排队、走下浮动码头，以及一艘几十人的船登船，是另外那一半。如果你要把它塞在晚餐订位与表演之间，请当成 40 分钟的区块。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "道顿堀游船票价多少？",
    a: `成人 ¥2,000。とんぼり游船——运营方从太左卫门桥码头开出的那一艘——成人 ¥2,000、初中以上学生 ¥1,000、小学生儿童 ¥500，每位付费成人可带一位学龄前儿童免费。大阪官方观光机构与大阪周游卡运营方自己的设施清单，印的是同样这三个数字。它在大阪周游卡与大阪 e-Pass 都免费，两种情况都要先在接待柜台换成指定时间的票。这条河上其他的船各自定价——日本桥码头的 Wonder Cruise 20 分钟道顿堀航线是 ¥1,000，Klook 上销售的几艘则在各自的商品页标价。全部核查日 ${CHECKED}。`,
  },
  {
    q: "とんぼり游船要坐多久？",
    a: `在水上约 20 分钟，沿着穿过南区核心的道顿堀川往返。以游船来说算短，但长度是对的：它涵盖的河段只有几百米的霓虹店面，再长一点也只是再绕一圈。把接待柜台、走到浮动码头与登船算进去，从头到尾请预留接近 40 分钟。航程长度按大阪官方观光网站与「水都大阪」游船门户网站，核查日 ${CHECKED}。`,
  },
  {
    q: "道顿堀游船几点开船？",
    a: `从 11:00 到 21:00，每 30 分钟一班——整点与半点，所以一天 21 班，2026 年只有 7 月 13、24、25 日停航。码头旁的售票处在首班前一小时开门，也就是 10:00。排行程时真正重要的数字是 21:00 的末班：它晚到任何季节都能在晚餐后塞进一趟夜游，也因此傍晚的时段才是稀少的那些，而不是白天。时刻核查日 ${CHECKED}；可能因河川状况与船只维修变动。`,
  },
  {
    q: "道顿堀游船的末班是几点？",
    a: "只要有航班的日子都是 21:00。因为每一班都同一个票价，末班是看到完全点灯版道顿堀最便宜的方式——但它也落在通票运营方说会最先卖完的时段里，所以这是唯一值得提前确保、而不是现场碰运气的一班。用通票的话，白天就去换 20:30 或 21:00 的票；自己付钱的话，运营方的网络订票开放到开船前 10 分钟。",
  },
  {
    q: "道顿堀游船在哪里坐？",
    a: "在太左卫门桥码头，位于道顿堀川北岸的とんぼりリバーウォーク步道上，大约在戎桥东边一分钟。接待柜台在码头正对面的唐吉诃德道顿堀店一楼，那才是该瞄准的地标，而不是码头本身。从难波、心斋桥或日本桥站走 5 到 10 分钟，三站都把你放在有固力果招牌的南岸，所以要从戎桥或太左卫门桥过河才到得了船边。另外 Wonder Cruise 是不同运营方，在日本桥码头登船——走去浮动码头之前，先确认你的票是哪一艘。",
  },
  {
    q: "道顿堀游船和とんぼり游船是同一艘吗？",
    a: `是同一艘、两个名字。「とんぼりリバークルーズ」是官方商品名，由一本松海运运营，也是票上、码头上与大阪周游卡免费设施清单上出现的名字。「道顿堀游船」是大多数旅客搜索的描述性说法，而且也被松散地用来指这条河上的任何一艘船——包括日本桥码头的 Wonder Cruise，以及 Klook 上销售的 City Cruise、浪花观光游船与 TONBORIRAVE DJ 船，那些是不同运营方、不同票价。如果你是因为通票才坐，这些当中只有とんぼり那艘被涵盖。名称与运营方核查日 ${CHECKED}。`,
  },
  {
    q: "有比 ¥2,000 的とんぼり游船更便宜的船吗？",
    a: `有，前提是你没有用通票。大阪官方观光机构把 Wonder Cruise 道顿堀航线列为成人 ¥1,000、儿童 ¥500，绕行同一段河 20 分钟——同样长度、一半票价——在日本桥码头登船，售票亭在旁边的 WONDER PUB 店内。它较长的大阪航线是日本桥到八轩家滨的单程 30 到 40 分钟，成人 ¥1,800、儿童 ¥900。代价是每条航线班次有限，官方建议提前预约，而且没有任何大阪通票涵盖它。如果你手上是大阪周游卡，とんぼり那艘免费，这个比较就不存在。票价核查日 ${CHECKED}。`,
  },
  {
    q: "大阪周游卡坐道顿堀游船免费吗？",
    a: `免费，而且全天都免费。とんぼり游船是大阪周游卡 40 多项免费设施之一，而且没有像梅田蓝天大厦那样的下午时间限制。它在大阪 e-Pass 也是免费设施。条件是流程而不是金额：你要在接待柜台把通票换成一张印有开船时间的票，运营方明白写着只能在票上的时间登船。通票运营方也提醒傍晚的游船很快卖完，建议在白天换票。一日卡 ${PASS_1_DAY}，光是 ¥2,000 的游船加上大阪城天守阁 ¥1,200，在你还没坐任何一趟地铁之前就已经接近打平。条件核查日 ${CHECKED}。`,
  },
  {
    q: "道顿堀游船需要提前订吗？",
    a: "通常不用，但傍晚和下午是两回事。当天票在码头旁的售票处卖，售票处在首班前一小时开门，平日下午直接去就好。不受理电话预约。周五或周六晚上的班次，请用运营方的线上订票——开放到开船前 10 分钟、要预先付款；如果你用通票，就在白天先换好傍晚的时段，因为运营方自己的说法是夜间的船最先没位。",
  },
  {
    q: "道顿堀游船晚上还是白天好？",
    a: "只坐一次的话，晚上。你付钱买的是固力果招牌、霓虹店面与水面的灯光，这些都需要天黑。白天有两个站得住脚的理由，而且都很实际：时段比较抢得到，而想在一天里塞进好几个免费设施的通票持有人，会发现 13:00 的班次比 19:30 好安排。",
  },
  {
    q: "下雨还会开船吗？",
    a: `通常会，但请带件外套和帽子：这艘船在「水都大阪」游船门户网站上被列为没有屋顶（核查日 ${CHECKED}），正是这点让它能从道顿堀那些低矮的桥下通过。公告的停航条件并不是雨本身——通票运营方的设施清单写的是可能因河川状况或船只维修停止运营。请把大雨与水位上升当成风险，而不是一阵雨。`,
  },
  {
    q: "道顿堀的游船该选哪一艘？",
    a: "如果你持有大阪通票，或想要班次最密的那一艘，选とんぼり游船——¥2,000、20 分钟、每半小时一班，而且是通票唯一涵盖的那艘。如果你要自己付钱、想用 ¥1,000 坐同样的 20 分钟，不介意改到日本桥码头登船、也不介意因为班次有限而要提前预约，选 Wonder Cruise 道顿堀航线。想要 30 分钟较长的航程，选浪花观光游船。比较想要沙发式座位和手上一杯自己的饮料，选道顿堀 City Cruise；它的商品页还写可以带宠物，这在游船里少见。如果这趟是夜生活的开场而不是观光，选 TONBORIRAVE——船上有 DJ，票还附 Piccadilly 夜店免费入场。",
  },
  {
    q: "带小孩适合吗？",
    a: "适合，票价结构就说明了：小学生儿童 ¥500，成人 ¥2,000。20 分钟短到足以撑住小小孩的注意力，而且不像观景台或主题乐园设施那样要排队。要先想好的是这是一艘没有屋顶的船——八月的太阳、一月的风——以及指定时间的票意味着你要在票上的时间之前抵达，而不是到了再说。",
  },
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "道顿堀游船" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnDotonboriRiverCruisePage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>更新于 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            道顿堀游船（2026）：<br />票价、班次时间与とんぼり那一艘
          </h1>
          <p className={styles.heroSubtitle}>
            成人 ¥2,000、约 20 分钟，11:00 到 21:00 之间从太左卫门桥码头每半小时一班——只要在傍晚的船
            满之前去换票，大阪周游卡就是免费。
          </p>
          <div className={styles.heroBadges}>
            {[`更新于 ${updatedLabel}`, "官方票价，附核查日", "五艘船比较"].map((t) => (
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
                <p className={styles.verdictStatLabel}>票价</p>
                <p className={styles.verdictStatValue}>成人 ¥2,000／儿童 ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>在水上的时间</p>
                <p className={styles.verdictStatValue}>约 20 分钟</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>班次</p>
                <p className={styles.verdictStatValue}>11:00–21:00，每半小时</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>大阪周游卡</p>
                <p className={styles.verdictStatValue}>全天免费</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>道顿堀游船</strong>——官方名称是<strong>とんぼりリバークルーズ</strong>，
              由<strong>一本松海运</strong>运营——成人<strong>¥2,000</strong>，
              航程<strong>约 20 分钟</strong>，从离戎桥一分钟的とんぼりリバーウォーク
              <strong>太左卫门桥码头</strong>，<strong>11:00 到 21:00 每 30 分钟一班</strong>。
              它在<strong>大阪周游卡是免费</strong>的。
            </p>
            <p className={styles.verdictText}>
              其余细节：初中以上学生<strong>¥1,000</strong>、小学生儿童<strong>¥500</strong>，
              每位付费成人可带一位学龄前儿童免费。接待柜台在码头正对面的唐吉诃德道顿堀店 1 楼。
              <strong>大阪 e-Pass</strong> 也涵盖它，两种通票都没有下午时间限制——但通票不会直接让你上船：
              你要在接待柜台换成一张印有开船时间的票，而通票运营方提醒傍晚的游船最先卖完。当天票从首班前
              一小时（10:00）起在码头销售；线上订票在开船前 10 分钟关闭，并且不受理电话预约。
              全部核查日 {CHECKED}。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={cnOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看大阪周游卡 →
              </KlookLink>
              <KlookLink href={cnDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                用简体中文订道顿堀游船 →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>总览</span>
          <h2 className={styles.sectionTitle}>道顿堀游船到底是什么</h2>
          <p className={styles.bodyText}>
            一趟 <strong>20 分钟、¥2,000</strong> 的航程，船身低、没有屋顶，名字叫
            <strong>とんぼりリバークルーズ</strong>，由<strong>一本松海运</strong>运营，
            从<strong>太左卫门桥码头</strong>在 <strong>11:00 到 21:00</strong> 之间每半小时开一班，
            而且<strong>大阪周游卡免费</strong>。「道顿堀游船」是旅客搜索的说法；
            <strong>とんぼりリバークルーズ</strong>才是票上、码头指示牌与通票免费设施清单上的名字，
            也是你在现场该找的那个。
          </p>
          <p className={styles.bodyText}>
            它行驶的，是固力果招牌、戎桥人潮与那只巨大机械蟹全都面对着的那几百米水面，船上有导览员
            用大阪那种节奏明快的口吻解说。
          </p>
          <p className={styles.bodyText}>
            值得花 20 分钟的理由是视线。街上的道顿堀是一团挤：你肩并肩站在戎桥上，想拍一个根本退不开的
            招牌。从水面上，你在人群之下，正对着店面有一条干净的视线，而桥从头上近距离经过，也顺便解释
            了这些船为什么没有屋顶。
          </p>
          <p className={styles.bodyText}>
            这里没有要抢的指定入场系统、没有开票日、平日下午也没有卖完的风险。取而代之的是
            <strong>通票持有人的换票规则</strong>，以及比一整天更早客满的傍晚——大多数人该怎么安排，
            就由这两行决定。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>道顿堀游船票价多少</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>成人 ¥2,000、学生 ¥1,000、儿童 ¥500。</strong>每个年龄层一个价，每一班都一样——
            夜间班次没有加价，这在游船里并不常见，也是它其实划算的安静理由：
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["对象", "票价", "备注"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.tier}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tier}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            票价读自大阪官方观光网站与大阪周游卡运营方自己的免费设施清单，核查日 {CHECKED}，两边印的是同样
            三个数字。船公司自己的网站在核查当天因维修无法连接，所以本页每一个数字的来源都是上面那两个。
            可能变动——付款前请确认。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>时间与码头</span>
          <h2 className={styles.sectionTitle}>几点开船、在哪里上船</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>11:00 到 21:00，每 30 分钟一班</strong>——整点与半点，2026 年只有 7 月 13、24、25 日
            停航。码头旁的售票处在首班前一小时开门，也就是 <strong>10:00</strong>：
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "内容"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            一天 21 班是有用的那个数字。它代表这趟游船是你塞进一个晚上的东西，而不是整个晚上要围着它排；
            而 <strong>21:00 的末班</strong>晚到任何季节都还能在晚餐后成立。时刻核查日 {CHECKED}。
          </p>
          <p className={styles.bodyText}>
            当天买与提前订并不等价，而差别只在天黑之后才重要。<strong>当天</strong>：码头旁的售票处从
            10:00 起卖下一个还有位的班次，而通票运营方的用语很直接——所有座位都满的时候就不能登船。
            <strong>提前</strong>：运营方的网络订票要预先付款，并开放到<strong>开船前 10 分钟</strong>，
            周五或周六晚上值得用这一种。电话预约完全不受理。
          </p>
          <p className={styles.bodyText}>
            至于哪些时段最先没位，唯一公告过的说法来自通票运营方，而且很具体：请在<strong>白天</strong>
            换票，因为<strong>傍晚的游船很快卖完</strong>。照字面读，天黑之后那些班次——19:00 到 21:00
            这一串，周末更是如此——才是稀少的，而平日下午是直接去就能坐的时段。除此之外没有任何公开的
            载客率数字，所以更精确的说法请当成猜测而不是数据。说明核查日 {CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={cnOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪周游卡——含游船 →
            </KlookLink>
            <KlookLink href={cnDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              提前订道顿堀游船时段 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>什么时候坐</span>
          <h2 className={styles.sectionTitle}>晚上还是白天？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            <strong>只坐一次就晚上</strong>——霓虹才是商品，而每一班票价相同，所以那个夜景是免费附赠。
            但通票会改变答案，因为你真正抢得到的时段，不一定是你想要的时段：
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={cnDotonboriNaniwaBoat.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              30 分钟观光游船 →
            </KlookLink>
            <KlookLink href={cnDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              沙发座位 City Cruise →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比较</span>
          <h2 className={styles.sectionTitle}>道顿堀的游船该选哪一艘</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            这段水面上有好几家运营方，而且不能互相替代。有两个不对称值得注意。第一，
            <strong>只有とんぼり那艘是通票设施</strong>，而 Klook 并没有把它当成单独商品销售——所以如果
            你持有大阪通票，你要的那艘是在柜台订、而不是在手机上订的。第二，唯一有公告官方票价的对手，
            日本桥码头的 <strong>Wonder Cruise</strong>，
            <strong>以 ¥1,000 跑同样 20 分钟的道顿堀航线——とんぼり票价的一半</strong>，
            这是你自己付钱又没有通票时的答案。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["船", "航程长度", "票价", "大阪通票？", "在哪里卖"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {boatRows.map((row) => (
                    <tr key={row.boat}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.boat}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.run}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            とんぼり的数字来自大阪官方观光网站与通票运营方的设施清单；Wonder Cruise 那两行来自同一个观光
            机构自己的 WONDER CRUISE・PIRATES 页面；最后两行写的是各 Klook 商品页自己的说明。全部核查日{" "}
            {CHECKED}。Klook 会阻挡自动读取价格，所以这里不引用任何 Klook 票价——请打开商品页看目前的金额
            与取消条件，那是按商品而不是按运营方设定的。可能变动。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步骤</span>
          <h2 className={styles.sectionTitle}>道顿堀游船怎么订</h2>
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

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>通票的问题</span>
          <h2 className={styles.sectionTitle}>大阪周游卡坐道顿堀游船免费吗</h2>
          <p className={styles.bodyText}>
            <strong>免费，而且全天。</strong>とんぼり游船是大阪周游卡 40 多项免费设施之一，而且
            <strong>没有下午时间限制</strong>——这值得说清楚，因为同一张通票的梅田蓝天大厦在 15:00
            之后就不再免费。它在大阪 e-Pass 也是免费设施。
          </p>
          <p className={styles.bodyText}>
            卡住你的是队伍，不是时钟。通票不会直接让你上船：你要在接待柜台换成一张印有开船时间的票，
            运营方明白写着<strong>只能在票上的时间登船</strong>。他们公告的建议是傍晚的游船很快卖完，
            请在白天完成换票。实务上，那表示去吃午餐的路上经过唐吉诃德，顺手把 19:30 的时段拿下来，
            而不是 19:20 才到、然后发现下一班免费的船是 21:00。
          </p>
          <p className={styles.bodyText}>
            算起来很宽裕。一日卡 {PASS_1_DAY}，游船（¥2,000）加上大阪城天守阁（¥1,200）就是 ¥3,200 的
            门票，而你还没算进任何一趟地铁；15:00 之前的梅田观景台再加 ¥2,000。条件核查日 {CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={cnOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪周游卡 →
            </KlookLink>
          </div>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/zh-cn/guides/attractions/usj-tickets-express-pass", title: "日本环球影城门票与快速通行证（2026）：该买哪一种" },
            { href: "/zh-cn/guides/attractions/tokyo-skytree-tickets", title: "东京晴空塔门票（2026）：票价、350 与 450 楼怎么选" },
            { href: "/zh-cn/guides/attractions/shibuya-sky-tickets", title: "涩谷SKY 门票（2026）：票价、最佳时段与预约方式" },
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京自由行景点（2026）：哪些要先订票、哪些可以现场去" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>要处理的是时段，不是票</h2>
            <p className={styles.ctaBannerDesc}>
              ¥2,000 的票价是小的那一半。稀少的是傍晚的班次，而让这趟免费的通票，还是要在夜间的船满之前
              到柜台换票。付款前请看自己订单上显示的取消条件——那是按商品、不是按运营方设定的。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={cnOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看大阪周游卡 →
              </KlookLink>
              <KlookLink href={cnDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                订道顿堀游船 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
