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
  dotonboriCityCruise,
  dotonboriDaytimeFoodTour,
  dotonboriNaniwaSightseeingBoat,
  dotonboriTonboriRaveCruise,
  nambaBarHoppingNightTour,
  osakaAmazingPass,
  osakaCastleUmedaTonboriDayTour,
  osakaWonderCruise,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

// Mirrors the English guide (pages/guides/attractions/dotonbori-river-cruise.tsx) as of
// 2026-11-01: same sections, tables, FAQ and Klook CTAs in the same order. Every figure
// is the English page's (osaka-info.jp, the Osaka Amazing Pass operator's free-admission
// list and suito-osaka.jp, read 1 November 2026); nothing was added for this edition.

const ROUTE = "/zh-cn/guides/attractions/dotonbori-river-cruise";
const TITLE = "道顿堀游船 2026：¥2,000、20 分钟、班次与搭船处";
const DESC =
  "道顿堀游船票价与时间：とんぼり游船成人 ¥2,000、约 20 分钟，11:00–21:00 每半小时一班，大阪周游卡免费。比较各船后预订。";

const L = "zh-cn" as const;
const CHECKED = dateLabel("2026-11-01", L);
// The pass price is owned by lib/attraction-prices.ts, shared with the English pages.
const PASS_1_DAY = priceLabel(PRICES.osakaAmazingPass.adult, L);

const K = {
  pass: klookFor(osakaAmazingPass.url, L),
  city: klookFor(dotonboriCityCruise.url, L),
  rave: klookFor(dotonboriTonboriRaveCruise.url, L),
  naniwa: klookFor(dotonboriNaniwaSightseeingBoat.url, L),
  wonder: klookFor(osakaWonderCruise.url, L),
  dayTour: klookFor(osakaCastleUmedaTonboriDayTour.url, L),
  foodTour: klookFor(dotonboriDaytimeFoodTour.url, L),
};

const linkStyle = { color: "var(--text)", fontWeight: 600 } as const;

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
    pass: "未列为通票设施",
    sold: "日本桥码头，旁边 WONDER PUB 店内的售票亭",
  },
  {
    boat: "Wonder Cruise — 大阪航线",
    run: "30～40 分钟，日本桥↔八轩家滨单程",
    fare: "成人 ¥1,800／儿童 ¥900",
    pass: "未列为通票设施",
    sold: "同一个售票亭——班次有限，官方建议提前预约",
  },
  {
    boat: "浪花观光游船",
    run: "30 分钟（按 Klook 商品页说明）",
    fare: "当前票价请看商品页",
    pass: "不是通票设施",
    sold: "Klook，简体中文界面、海外信用卡",
  },
  {
    boat: "道顿堀 City Cruise",
    run: "20 分钟（按 Klook 商品页说明）",
    fare: "当前票价请看商品页",
    pass: "不是通票设施",
    sold: "Klook——沙发式座位、可自带饮料、可带宠物",
  },
  {
    boat: "TONBORIRAVE 游船",
    run: "DJ 船，而不是观光航程",
    fare: "当前票价请看商品页",
    pass: "不是通票设施",
    sold: "Klook——商品附 Piccadilly 夜店免费入场",
  },
];

const whoFor = [
  {
    title: "天黑之后再坐，如果…",
    desc: "你想要明信片上的那个版本。固力果招牌、戎桥一带店面的霓虹，以及水面上的反光，就是这趟游船的重点，而下午两点它们一个都不存在。末班是 21:00，所以就算在大阪日落超过 19:00 的盛夏，天黑后还有四班可坐。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "白天坐，如果…",
    desc: `你持有通票想把一天排得顺，或你带着小孩。白天的班次比较好抢到——通票运营方自己的建议就是在白天去换票，因为傍晚的船最先没位——而 13:00 的 20 分钟航程对通票持有人来说不花钱，还可以塞在另外两个行程之间。建议内容核查日 ${CHECKED}。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "改坐别艘，如果…",
    desc: "你想要更便宜的票价、有靠背的座位、更长的航程，或是手上有一杯饮料。とんぼり那艘是班次最密、通票有涵盖的；Wonder Cruise 从日本桥码头出发，同样 20 分钟只要一半的钱；其他道顿堀运营方则卖 30 分钟的航程、可自带饮料的沙发座位船，以及附夜店入场的 DJ 船。同一条河，很不一样的晚上。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17h18l-2 4H5z" />
        <path d="M5 17V9h14v8" />
        <path d="M12 3v6" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "买任何东西之前，先决定你要不要用通票",
    desc: `这是整页唯一会动到钱的决定。とんぼり游船是大阪周游卡的免费设施，一日卡 ${PASS_1_DAY}——所以如果行程里本来就有一天要用通票，你根本不用买船票。如果没有，现场成人票价是 ¥2,000，而日本桥码头的 Wonder Cruise 20 分钟道顿堀航线是 ¥1,000，是这条河上较便宜的单张票。`,
  },
  {
    title: "用通票的话，当天早一点去换票",
    desc: "光有通票上不了船。你要在接待柜台换成一张印有时间的票，运营方明确写着只能在票上的时间登船。通票运营方自己的提醒是傍晚的船最先满，所以请在白天完成换票——去别的行程途中经过码头，顺手把时段搞定。",
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
    desc: "游船是 20 分钟。接待柜台排队、走下浮动码头，以及一艘二三十人的船登船，是另外那一半。如果你要把它塞在晚餐订位与演出之间，请当成 40 分钟的时间块。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "道顿堀游船票价多少？",
    a: `成人 ¥2,000。とんぼり游船——运营方从太左卫门桥码头开出的那一艘——成人 ¥2,000、初中以上学生 ¥1,000、小学生儿童 ¥500，每位付费成人可带一位学龄前儿童免费。大阪官方旅游机构与大阪周游卡运营方自己的设施清单，印的是同样这三个数字。它在大阪周游卡与大阪 e-Pass 都免费，两种情况都要先在接待柜台换成指定时间的票。这条河上其他的船各自定价——日本桥码头的 Wonder Cruise 20 分钟道顿堀航线是 ¥1,000，Klook 上销售的几艘则在各自的商品页标价。全部核查日 ${CHECKED}。`,
  },
  {
    q: "とんぼり游船要坐多久？",
    a: `在水上约 20 分钟，沿着穿过南区核心的道顿堀川往返。以游船来说算短，但长度是对的：它涵盖的河段只有几百米的霓虹店面，再长一点也只是再绕一圈。把接待柜台、走到浮动码头与登船算进去，从头到尾请预留接近 40 分钟。航程长度按大阪官方旅游网站与「水都大阪」游船门户网站，核查日 ${CHECKED}。`,
  },
  {
    q: "道顿堀游船几点开船？",
    a: `从 11:00 到 21:00，每 30 分钟一班——整点与半点，所以一天 21 班，2026 年除了 7 月 13、24、25 日之外每天运营。码头旁的售票处在首班前一小时开门，也就是 10:00。排行程时真正重要的数字是 21:00 的末班：它晚到任何季节都能在晚餐后塞进一趟夜游，也因此傍晚的时段才是稀缺的那些，而不是白天。时刻核查日 ${CHECKED}；可能因河川状况与船只维修变动。`,
  },
  {
    q: "道顿堀游船的末班是几点？",
    a: `只要有航班的日子都是 21:00。因为每一班都同一个票价，末班是看到完全亮灯版道顿堀最便宜的方式——但它也落在通票运营方说会最先卖完的时段里，所以这是唯一值得提前锁定、而不是现场碰运气的一班。用通票的话，白天就去换 20:30 或 21:00 的票；自己付钱的话，运营方的网上订票开放到开船前 10 分钟。末班时间按大阪官方旅游网站与通票运营方的设施清单，两者一致，核查日 ${CHECKED}。`,
  },
  {
    q: "道顿堀游船在哪里坐？",
    a: "在太左卫门桥码头，位于道顿堀川北岸的とんぼりリバーウォーク步道上，大约在戎桥东边一分钟。接待柜台在码头正对面的唐吉诃德道顿堀店一楼，那才是该瞄准的地标，而不是码头本身。从难波、心斋桥或日本桥站走 5 到 10 分钟，三站都把你放在有固力果招牌的南岸，所以要从戎桥或太左卫门桥过河才到得了船边。另外 Wonder Cruise 是不同运营方，在日本桥码头登船——走去浮动码头之前，先确认你的票是哪一艘。",
  },
  {
    q: "道顿堀游船和とんぼり游船是同一艘吗？",
    a: `是同一艘、两个名字。「とんぼりリバークルーズ」是官方商品名，由一本松海运运营，也是票上、码头上与大阪周游卡免费设施清单上出现的名字。「道顿堀游船」是大多数游客搜索的描述性说法，而且也被笼统地用来指这条河上的任何一艘船——包括日本桥码头的 Wonder Cruise，以及 Klook 上销售的 City Cruise、浪花观光游船与 TONBORIRAVE DJ 船，那些是不同运营方、不同票价。如果你是因为通票才坐，这些当中只有とんぼり那艘被涵盖。名称与运营方核查日 ${CHECKED}。`,
  },
  {
    q: "有比 ¥2,000 的とんぼり游船更便宜的船吗？",
    a: `有，前提是你没有用通票。大阪官方旅游机构把 Wonder Cruise 道顿堀航线列为成人 ¥1,000、儿童 ¥500，绕行同一段河 20 分钟——同样长度、一半票价——在日本桥码头登船，售票亭在旁边的 WONDER PUB 店内。它较长的大阪航线是日本桥到八轩家滨的单程 30 到 40 分钟，成人 ¥1,800、儿童 ¥900。代价是每条航线班次有限，官方建议提前预约，而且没有任何大阪通票涵盖它。如果你手上是大阪周游卡，とんぼり那艘免费，这个比较就不存在。票价核查日 ${CHECKED}。`,
  },
  {
    q: "大阪周游卡坐道顿堀游船免费吗？",
    a: `免费——とんぼり游船是大阪周游卡的免费设施之一，而且没有像梅田蓝天大厦那样的时间限制。它在大阪 e-Pass 也是免费设施。条件是流程而不是金额：你要在接待柜台把通票换成一张印有开船时间的票，运营方明确写着只能在票上的时间登船。通票运营方也提醒傍晚的游船很快卖完，建议在白天换票。一日卡 ${PASS_1_DAY}，光是 ¥2,000 的游船加上大阪城天守阁 ¥1,200，在你还没坐任何一趟地铁之前就已经接近回本。条件核查日 ${CHECKED}。`,
  },
  {
    q: "道顿堀游船需要提前订吗？",
    a: "通常不用，但傍晚和下午是两回事。当天票在码头旁的售票处卖，售票处在首班前一小时开门，工作日下午直接去就好。不受理电话预约。周五或周六晚上的班次，请用运营方的线上订票——开放到开船前 10 分钟、要预先付款；如果你用通票，就在白天先换好傍晚的时段，因为运营方自己的说法是夜间的船最先没位。",
  },
  {
    q: "道顿堀游船晚上还是白天好？",
    a: "只坐一次的话，晚上。你付钱买的是固力果招牌、霓虹店面与水面的灯光，这些都需要天黑。白天有两个站得住脚的理由，而且都很实际：时段比较抢得到，而想在一天里塞进好几个免费设施的通票持有人，会发现 13:00 的班次比 19:30 好安排。如果想挑一班刚好赶上天色转暗的船，我们的梅田蓝天大厦攻略（英文）列有大阪各季节公布的日落时间。",
  },
  {
    q: "下雨还会开船吗？",
    a: `通常会，但请带件外套和帽子：这艘船在「水都大阪」游船门户网站上被列为没有顶棚（核查日 ${CHECKED}），正是这点让它能从道顿堀那些低矮的桥下通过。公布的停航条件并不是雨本身——通票运营方的设施清单写的是可能因河川状况或船只维修停止运营。请把大雨与水位上涨当成风险，而不是一阵雨；天气不稳的话，同样几条街里淋不到雨的替代方案是美食漫步，而不是坐船。`,
  },
  {
    q: "道顿堀的游船该选哪一艘？",
    a: "如果你持有大阪通票，或想要班次最密的那一艘，选とんぼり游船——¥2,000、20 分钟、每半小时一班，而且是通票唯一涵盖的那艘。如果你要自己付钱、想用 ¥1,000 坐同样的 20 分钟，不介意改到日本桥码头登船、也不介意因为班次有限而要提前预约，选 Wonder Cruise 道顿堀航线。想要 30 分钟较长的航程，选浪花观光游船。比较想要沙发式座位和手上一杯自己的饮料，选道顿堀 City Cruise；它的商品页还写可以带宠物，这在游船里少见。如果这趟是夜生活的开场而不是观光，选 TONBORIRAVE——船上有 DJ，票还附 Piccadilly 夜店免费入场。同一条河，很不一样的晚上。",
  },
  {
    q: "带小孩坐道顿堀游船合适吗？",
    a: "合适，票价结构就说明了：小学生儿童 ¥500，成人 ¥2,000。20 分钟短到足以撑住小朋友的注意力，讲解轻快热闹而不是一本正经，而且不像观景台或主题乐园项目那样要排队。要先想好的是这是一艘没有顶棚的船——八月的太阳、一月的风——以及指定时间的票意味着你要在票上的时间之前到达，而不是到了再说。",
  },
  {
    q: "游船前后，道顿堀周边还能做什么？",
    a: "船上 20 分钟撑不起一个晚上，而码头两侧的街道是全日本吃的密度最高的地方。白天的选择是美食漫步——Klook 上 11:00 到 14:00 的道顿堀拼团行程，包含串炸、章鱼烧、季节午餐套餐与一道甜点，2 到 10 人成团。晚上的选择是穿过难波与小巷的酒吧串游，而不是道顿堀大街本身。两者走的都是游船从水上让你看到的那几百米城市。",
  },
];

const tourPicks = [
  withKlookLocale(dotonboriDaytimeFoodTour, L, {
    title: "大阪道顿堀白天美食之旅",
    desc: "三小时的拼团漫步，时间为 11:00–14:00、2 到 10 人，内容有串炸、章鱼烧、居酒屋的季节午餐套餐与一道本地甜点",
  }),
  withKlookLocale(nambaBarHoppingNightTour, L, {
    title: "大阪难波酒吧串游夜间之旅",
    desc: "三个半小时的晚间拼团行程，由说英语的导游带路，走难波与天满一带的酒吧，而不是道顿堀大街",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "道顿堀游船" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function CnDotonboriRiverCruisePage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, L);

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
              inLanguage: JSONLD_LANG[L],
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
            {[`更新于 ${updatedLabel}`, "官方票价，附核查日", "六种选择比较"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Quick Answer */}
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
              <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看大阪周游卡 →
              </KlookLink>
              <KlookLink href={K.city} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                用简体中文订道顿堀游船 →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>总览</span>
          <h2 className={styles.sectionTitle}>道顿堀游船到底是什么？</h2>
          <p className={styles.bodyText}>
            一趟 <strong>20 分钟、¥2,000</strong> 的航程，船身低、没有顶棚，名字叫
            <strong>とんぼりリバークルーズ</strong>，由<strong>一本松海运</strong>运营，
            从<strong>太左卫门桥码头</strong>在 <strong>11:00 到 21:00</strong> 之间每半小时开一班，
            而且<strong>大阪周游卡免费</strong>。「道顿堀游船」是游客搜索的说法；
            <strong>とんぼりリバークルーズ</strong>才是票上、码头指示牌与通票运营方免费设施清单上的名字，
            也是你在现场该找的那个。
          </p>
          <p className={styles.bodyText}>
            它行驶的，是固力果招牌、戎桥人潮与那只巨大机械蟹全都面对着的那几百米水面，船上有导游
            用大阪出了名的那种节奏明快的口吻讲解。
          </p>
          <p className={styles.bodyText}>
            值得花 20 分钟的理由是视线。街上的道顿堀挤成一团：你肩并肩站在戎桥上，想拍一个根本退不开的
            招牌。从水面上，你在人群之下，正对着店面有一条干净的视线，而桥从头顶近距离经过，也顺便解释
            了这些船为什么没有顶棚。
          </p>
          <p className={styles.bodyText}>
            这里没有要抢的分时入场系统、没有开票日、工作日下午也没有卖完的风险。取而代之的是
            <strong>通票持有人的换票规则</strong>，以及比白天更早客满的傍晚——大多数人该怎么安排，
            就由这两点决定。本页其余部分是票价、时刻、码头，以及在同一段河上运营的另外四艘船。
          </p>
        </section>

        {/* Fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>道顿堀游船票价多少？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>成人 ¥2,000、学生 ¥1,000、儿童 ¥500。</strong>每个年龄段一个价，每一班都一样——
            夜间班次没有加价，这并不常见，也是它其实划算的低调理由：
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
            票价读自大阪官方旅游网站与大阪周游卡运营方自己的免费设施清单，核查日 {CHECKED}，两边印的是同样
            三个数字。船公司自己的网站在核查当天因维护无法访问，所以本页每一个数字的来源都是上面那两个。
            可能变动——付款前请确认。我们追踪的日本其他景点门票（各自附核查日），请见{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景点门票价格总表（英文）
            </Link>。
          </p>
        </section>

        {/* Schedule */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>时间与码头</span>
          <h2 className={styles.sectionTitle}>道顿堀游船几点开船？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>11:00 到 21:00，每 30 分钟一班</strong>——整点与半点，2026 年除了 7 月 13、24、25 日
            之外每天运营。码头旁的售票处在首班前一小时开门，也就是 <strong>10:00</strong>：
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
            一天 21 班是有用的那个数字。它代表这趟游船是你塞进一个晚上的项目，而不是整个晚上要围着它排；
            而 <strong>21:00 的末班</strong>晚到任何季节都还能在晚餐后成行。时刻核查日 {CHECKED}。
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            とんぼり游船要坐多久？
          </h3>
          <p className={styles.bodyText}>
            <strong>在水上约 20 分钟。</strong>大阪官方旅游网站写 20 分钟，「水都大阪」游船门户网站写
            「约 20 分钟」，核查日都是 {CHECKED}。实际请预留<strong>从头到尾约 40 分钟</strong>：接待柜台、
            走下浮动码头，以及一艘二三十人的船登船，是另外那一半。20 分钟对这条路线来说刚好——这段河
            只有几百米的霓虹店面，再长一点也只是再绕一圈。
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            道顿堀游船在哪里坐？
          </h3>
          <p className={styles.bodyText}>
            在<strong>太左卫门桥码头</strong>，位于道顿堀川<strong>北岸</strong>的とんぼりリバーウォーク
            步道上，大约在戎桥东边一分钟。请瞄准地标而不是码头：接待柜台在
            <strong>唐吉诃德道顿堀店 1 楼</strong>——侧面挂着摩天轮那一栋——就在浮动码头正对面。从
            <strong>难波</strong>、<strong>心斋桥</strong>或<strong>日本桥</strong>站走 5 到 10 分钟，
            但三站都把你放在有固力果招牌的南岸，所以要从戎桥或太左卫门桥过河才到得了船边。御堂筋线如何
            连接难波与梅田、天王寺，请见我们的{" "}
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>大阪交通攻略（英文）</Link>。
            位置与步行时间核查日 {CHECKED}。
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            当天买还是提前订——以及船什么时候会满
          </h3>
          <p className={styles.bodyText}>
            这两种方式并不等价，而差别只在天黑之后才重要。<strong>当天</strong>：码头旁的售票处从
            10:00 起卖下一个还有位的班次，而通票运营方的用语很直接——「所有座位都满的时候就不能登船」。
            <strong>提前</strong>：运营方的网上订票要预先付款，并开放到<strong>开船前 10 分钟</strong>，
            周五或周六晚上值得用这一种。电话预约完全不受理。
          </p>
          <p className={styles.bodyText}>
            至于哪些时段最先没位，唯一公布过的说法来自通票运营方，而且很具体：请在<strong>白天</strong>
            换票，因为<strong>傍晚的游船很快卖完</strong>。照字面读，天黑之后那些班次——19:00 到 21:00
            这一串，周末更是如此——才是稀缺的，而工作日下午是直接去就能坐的时段。除此之外没有任何公开的
            载客率数字，所以更精确的说法请当成猜测而不是数据。说明核查日 {CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪周游卡——含游船 →
            </KlookLink>
            <KlookLink href={K.city} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              提前订道顿堀游船时段 →
            </KlookLink>
          </div>
        </section>

        {/* Night or day */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>什么时候坐</span>
          <h2 className={styles.sectionTitle}>道顿堀游船晚上还是白天好？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            <strong>只坐一次就晚上</strong>——霓虹才是卖点，而每一班票价相同，所以那个夜景是免费附赠。
            但通票会改变答案，因为你真正抢得到的时段，不一定是你想要的时段：
          </p>
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
            如果想刚好赶上天色转暗，请按日期挑班次：我们的{" "}
            <Link href="/guides/attractions/umeda-sky-building-tickets" style={linkStyle}>梅田蓝天大厦攻略（英文）</Link>{" "}
            列有大阪各季节公布的日落时间，一年之中前后相差约两个半小时。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={K.rave} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              夜生活路线的 DJ 游船 →
            </KlookLink>
            <KlookLink href={K.naniwa} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              30 分钟观光游船 →
            </KlookLink>
          </div>
        </section>

        {/* Compare the boats */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比较</span>
          <h2 className={styles.sectionTitle}>道顿堀的游船该选哪一艘？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            这段水面上有好几家运营方，而且不能互相替代。有两个不对称值得注意。第一，
            <strong>只有とんぼり那艘是通票设施</strong>，而 Klook 并没有把它当成单独商品销售——所以如果
            你持有大阪通票，你要的那艘是在柜台订、而不是在手机上订的。第二，唯一有公布官方票价的对手，
            日本桥码头的 <strong>Wonder Cruise</strong>，
            <strong>以 ¥1,000 跑 20 分钟的道顿堀航线——とんぼり票价的一半</strong>，
            这是你自己付钱又没有通票时的答案。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["船", "航程长度", "票价", "大阪通票涵盖？", "在哪里卖"].map((h) => (
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
            とんぼり的数字来自大阪官方旅游网站与通票运营方的设施清单；Wonder Cruise 那两行来自同一个旅游
            机构自己的 WONDER CRUISE・PIRATES 页面；最后三行写的是各 Klook 商品页自己的说明。全部核查日{" "}
            {CHECKED}。Klook 会拦截自动读取价格，所以这里不引用任何 Klook 票价——请打开商品页看当前的金额
            与取消条件，那是按商品而不是按运营方设定的。可能变动。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={K.city} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              沙发座位 City Cruise →
            </KlookLink>
            <KlookLink href={K.wonder} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪 Wonder Cruise →
            </KlookLink>
          </div>
        </section>

        {/* How to book */}
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看大阪周游卡 →
            </KlookLink>
            <KlookLink href={K.dayTour} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪城、梅田观景台加游船一日游 →
            </KlookLink>
          </div>
        </section>

        {/* The pass question */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>通票的问题</span>
          <h2 className={styles.sectionTitle}>大阪周游卡坐道顿堀游船免费吗？</h2>
          <p className={styles.bodyText}>
            <strong>免费，而且全天。</strong>とんぼり游船是大阪周游卡 40 多项免费设施之一，而且
            <strong>没有下午时间限制</strong>——这值得说清楚，因为同一张通票的梅田蓝天大厦在 15:00
            之后就不再免费。它在大阪 e-Pass 也是免费设施。
          </p>
          <p className={styles.bodyText}>
            卡住你的是排队，不是时钟。通票不会直接让你上船：你要在接待柜台换成一张印有开船时间的票，
            运营方明确写着<strong>只能在票上的时间登船</strong>。他们公布的建议是傍晚的游船很快卖完，
            请在白天完成换票。实际操作上，就是去吃午饭的路上经过唐吉诃德，顺手把 19:30 的时段拿下，
            而不是 19:20 才到、然后发现下一班免费的船是 21:00。
          </p>
          <p className={styles.bodyText}>
            算起来很宽裕。一日卡 {PASS_1_DAY}，游船（¥2,000）加上大阪城天守阁（¥1,200）就是 ¥3,200 的
            门票，而你还没算进任何一趟地铁；15:00 之前的梅田观景台再加 ¥2,000。完整的免费设施清单、
            两日卡价格与不含项目，请见我们的{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>大阪周游卡攻略（英文）</Link>；
            城市一日里哪些部分通票会帮你付、哪些不会，请见{" "}
            <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>大阪景点攻略（英文）</Link>。
            条件核查日 {CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪周游卡 →
            </KlookLink>
            <KlookLink href={K.foodTour} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              道顿堀美食漫步，11:00–14:00 →
            </KlookLink>
          </div>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="坐船前后的那几个小时"
          intro="船上 20 分钟之外，整个晚上都还空着，而码头周围的街道是全日本吃的密度最高的地方。第一个是白天的漫步行程，第二个是天黑之后的。Klook 会拦截自动读取价格，请打开商品页查看当前的金额与集合地点。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/osaka-food-tour", title: "大阪美食之旅（2026）：该订哪一个、时间与吃什么（英文）" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "大阪两日游行程（2026）：每日安排与该订什么（英文）" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周游卡（2026）：一日 ¥2,500 值得买吗？（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪景点（2026）：通票划算与不划算的地方（英文）" },
            { href: "/guides/attractions/umeda-sky-building-tickets", title: "梅田蓝天大厦门票（2026）：票价、开放时间与最佳时段（英文）" },
            { href: "/guides/attractions/osaka-castle-tickets", title: "大阪城门票（2026）：票价、开放时间与通票涵盖范围（英文）" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "大阪海游馆门票（2026）：票价、开放时间与入场时段（英文）" },
            { href: "/guides/attractions/tokyo-bay-cruise", title: "东京湾游船（2026）：屋形船与 Symphony 比较、时间与票价（英文）" },
            { href: "/guides/transport/osaka-transportation", title: "大阪交通攻略（2026）：地铁、电车与 IC 卡（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景点门票价格总表（2026）：官方票价与预约规则（英文）" },
            { href: "/zh-cn/guides/attractions", title: "日本景点门票攻略（2026）：官方票价、预约方式与一日游 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>要搞定的是时段，不是票</h2>
            <p className={styles.ctaBannerDesc}>
              ¥2,000 的票价是小事。稀缺的是傍晚的班次，而让这趟免费的通票，还是要在夜间的船满之前
              到柜台换票。付款前请看自己订单上显示的取消条件——那是按商品、不是按运营方设定的。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看大阪周游卡 →
              </KlookLink>
              <KlookLink href={K.city} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                订道顿堀游船 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
