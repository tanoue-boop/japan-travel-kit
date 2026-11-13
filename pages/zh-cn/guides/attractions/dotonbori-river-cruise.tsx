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
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English guide (pages/guides/attractions/dotonbori-river-cruise.tsx) as of
// 2026-11-01: same sections, tables, FAQ and Klook CTAs in the same order. Every figure
// is the English page's (osaka-info.jp, the Osaka Amazing Pass operator's free-admission
// list and suito-osaka.jp, read 1 November 2026). Re-checked 13 Nov 2026 (task-jtk-20261113-C01):
// osaka-info.jp Tombori spot page, the Osaka Amazing Pass free list and the Wonder Cruise spot/396
// page — unchanged. The suito-osaka.jp no-roof line keeps its 1 Nov 2026 date.

const ROUTE = "/zh-cn/guides/attractions/dotonbori-river-cruise";
const TITLE = "道顿堀游船2026：票价¥2,000、开船时间与太左卫门桥码头";
const DESC =
  "道顿堀游船票价：成人¥2,000、儿童¥500，约20分钟，11:00–21:00每半小时一班，太左卫门桥码头出发，持大阪周游卡免费，可在Klook购买。";

const L = "zh-cn" as const;
const CHECKED_ISO = "2026-11-13";
const CHECKED = dateLabel(CHECKED_ISO, L);
const ROOF_CHECKED = dateLabel("2026-11-01", L);
const OSAKA_INFO_URL = "https://osaka-info.jp/en/spot/tombori-river-cruise/";
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
  { tier: "学生（初中及以上）", price: "¥1,000", what: "成人票价的一半，是大阪少数设有学生票价的景点之一" },
  { tier: "儿童（小学生）", price: "¥500", what: "成人票价的四分之一" },
  { tier: "学龄前儿童", price: "免费", what: "每位付费成人可带一位免费，第二位按儿童票 ¥500" },
  { tier: "大阪周游卡持有人", price: "免费", what: "含一次乘船，但必须先在换票柜台兑换成注明发船时间的船票" },
  { tier: "大阪 e-Pass 持有人", price: "免费", what: "大阪市官方的 e-Pass 页面也把它列为免费设施" },
];

const scheduleRows = [
  { what: "首班", when: "11:00" },
  { what: "末班", when: "21:00" },
  { what: "班距", when: "每 30 分钟一班（整点与半点），每天 21 个班次" },
  { what: "在水上的时间", when: "约 20 分钟" },
  { what: "乘船地点", when: "Tombori River Walk（とんぼりリバーウォーク，北岸）上的太左卫门桥码头，离戎桥步行一分钟" },
  { what: "换票柜台", when: "码头正对面的唐吉诃德道顿堀店 1 楼" },
  { what: "售票处开门", when: "当天首班前一小时（10:00）" },
  { what: "线上订票截止", when: "开船前 10 分钟（预先付款）" },
  { what: "电话预约", when: "不受理" },
  { what: "2026 年停航日", when: "7 月 13、24、25 日" },
  { what: "临时停航", when: "可能因河川状况与船只维修未经公告即变更" },
];

const boatRows = [
  {
    boat: "Tombori River Cruise（一本松海运）",
    run: "约 20 分钟，11:00–21:00 每半小时",
    fare: "成人 ¥2,000／学生 ¥1,000／儿童 ¥500",
    pass: "大阪周游卡与大阪 e-Pass 免费",
    sold: "太左卫门桥码头现场，或运营方官方的线上订票",
  },
  {
    boat: "Wonder Cruise — 道顿堀航线",
    run: "20 分钟，沿道顿堀河段游览",
    fare: "成人 ¥1,000／儿童 ¥500",
    pass: "未列为通票设施",
    sold: "日本桥码头，旁边 WONDER PUB 店内的售票亭",
  },
  {
    boat: "Wonder Cruise — 大阪航线",
    run: "30～40 分钟，日本桥↔八轩家滨单程",
    fare: "成人 ¥1,800／儿童 ¥900",
    pass: "未列为通票设施",
    sold: "同一个售票亭，班次有限，官方建议提前预约",
  },
  {
    boat: "浪花观光游船",
    run: "30 分钟（按 Klook 商品页说明）",
    fare: "当前票价请看商品页",
    pass: "不是通票设施",
    sold: "Klook，简体中文界面，支持境外银行卡支付",
  },
  {
    boat: "道顿堀 City Cruise",
    run: "20 分钟（按 Klook 商品页说明）",
    fare: "当前票价请看商品页",
    pass: "不是通票设施",
    sold: "Klook：沙发式座位、可自带饮料、可带宠物",
  },
  {
    boat: "TONBORIRAVE 游船",
    run: "DJ 船，而不是观光航程",
    fare: "当前票价请看商品页",
    pass: "不是通票设施",
    sold: "Klook：商品附 Piccadilly 夜店免费入场",
  },
];

const whoFor = [
  {
    title: "天黑之后再坐，如果…",
    desc: "你想看明信片上的那种道顿堀。格力高广告牌、戎桥一带店面的霓虹灯，以及水面上的倒影，才是这趟游船的重点，而下午两点这些都看不到。末班是 21:00，所以即使在大阪日落晚于 19:00 的盛夏，天黑后仍有四个班次可选。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "白天坐，如果…",
    desc: `你持有通票、想让一天的行程更顺，或带着孩子。白天的班次比较容易订到（通票运营方的建议就是在白天换票，因为傍晚的班次最先满员），而 13:00 的 20 分钟航程对通票持有人来说无需付费，还可以安排在另外两个行程之间。建议内容核查日 ${CHECKED}。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "改坐其他游船，如果…",
    desc: "你想要更便宜的票价、有靠背的座位、更长的航程，或想边喝饮料边游览。Tombori River Cruise 班次最密，也包含在通票中；Wonder Cruise 从日本桥码头出发，同样 20 分钟，票价只要一半；其他道顿堀运营方则提供 30 分钟的航程、可自带饮料的沙发座位游船，以及附夜店入场的 DJ 船。同一条河，能度过很不一样的夜晚。",
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
    title: "购票前，先决定是否使用通票",
    desc: `这是本页唯一会影响费用的决定。Tombori River Cruise 是大阪周游卡的免费设施，一日卡 ${PASS_1_DAY}，所以如果行程中本来就有一天要用通票，就不用另外买船票。如果没有通票，现场成人票价是 ¥2,000，而日本桥码头的 Wonder Cruise 20 分钟道顿堀航线是 ¥1,000，是这条河上较便宜的单买船票。`,
  },
  {
    title: "使用通票的话，当天尽早换票",
    desc: "仅凭通票不能直接登船。你需要在换票柜台兑换成注明发船时间的船票，运营方明确写着只能在票上的时间登船。通票运营方提醒傍晚的班次最先满员，所以请在白天完成换票：去其他景点途中经过码头时，顺便确定乘船时段。",
  },
  {
    title: "自费乘船的话，可现场或线上购票，不受理电话预约",
    desc: "当天票在码头旁的售票处出售，售票处在当天首班前一小时开门。不受理电话预约。线上订票开放到开船前 10 分钟，而且要预先付款，周五或周六晚上建议使用线上订票。",
  },
  {
    title: "码头比地址看起来更好找",
    desc: "太左卫门桥码头位于北岸的 Tombori River Walk 河滨步道上，换票柜台在唐吉诃德道顿堀店一楼，就是外墙装有摩天轮的那栋建筑。从难波、心斋桥或日本桥站步行 5 到 10 分钟，但从这三个车站出来都会先到对岸，所以要从戎桥或太左卫门桥过河。",
  },
  {
    title: "从头到尾预留约 40 分钟，不是 20 分钟",
    desc: "游船航程是 20 分钟。换票排队、走下浮动码头以及登上二三十人的小船，还需要另一半时间。如果要把它安排在晚餐预订与演出之间，请按 40 分钟来规划。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "道顿堀游船票价（价格）多少？",
    a: `成人 ¥2,000。Tombori River Cruise（运营方从太左卫门桥码头发船的游船）成人 ¥2,000，初中及以上学生 ¥1,000，小学生 ¥500，每位付费成人可带一位学龄前儿童免费。大阪官方旅游机构与大阪周游卡运营方发布的设施清单，列出的是同样这三个价格。持大阪周游卡或大阪 e-Pass 均可免费乘坐，但都要先在换票柜台兑换成注明发船时间的船票。这条河上的其他游船各自定价：日本桥码头的 Wonder Cruise 20 分钟道顿堀航线是 ¥1,000，Klook 上销售的几种游船则以各自商品页的标价为准。全部核查日 ${CHECKED}。`,
  },
  {
    q: "道顿堀游船的开船时间是几点到几点？",
    a: `从 11:00 到 21:00，每 30 分钟一班（整点与半点），每天 21 个班次，2026 年除 7 月 13、24、25 日外每天运营。码头旁的售票处在首班前一小时开门，也就是 10:00。安排行程时真正重要的是 21:00 的末班：无论哪个季节，晚餐后都还能安排一趟夜游，也正因如此，稀缺的是傍晚的时段，而不是白天。时刻核查日 ${CHECKED}；可能因河川状况与船只维修变动。`,
  },
  {
    q: "太左卫门桥码头在哪里？道顿堀游船在哪里坐？",
    a: "在太左卫门桥码头，位于道顿堀川北岸的 Tombori River Walk 河滨步道上，从戎桥往东步行约一分钟。换票柜台在码头正对面的唐吉诃德道顿堀店一楼，请先找这个地标，而不是码头本身。从难波、心斋桥或日本桥站步行 5 到 10 分钟，从这三个车站出来都会先到格力高广告牌所在的南岸，所以要从戎桥或太左卫门桥过河才能到达登船处。另外，Wonder Cruise 是另一家运营方，在日本桥码头登船；走去浮动码头之前，请先确认自己的船票属于哪种游船。",
  },
  {
    q: "道顿堀游船要坐多久？",
    a: `航程约 20 分钟，沿着穿过南区核心地带的道顿堀川往返。以游船来说算短，但这个长度正合适：这段河道两岸只有几百米的霓虹店面，航程再长也只是多绕一圈。算上换票、走到浮动码头和登船的时间，从头到尾请预留约 40 分钟。航程长度按大阪官方旅游网站与「水都大阪」游船门户网站，核查日 ${CHECKED}。`,
  },
  {
    q: "一本松海运的 Tombori River Cruise 和道顿堀游船是同一种游船吗？",
    a: `是同一种游船，只是有两个名字。Tombori River Cruise（とんぼりリバークルーズ）是官方商品名，由一本松海运运营，也是船票、码头和大阪周游卡免费设施清单上出现的名字。「道顿堀游船」是大多数游客搜索时使用的说法，也常被笼统地用来指这条河上的任何游船，包括日本桥码头的 Wonder Cruise，以及 Klook 上销售的 City Cruise、浪花观光游船与 TONBORIRAVE DJ 船，这些属于不同运营方，票价也不同。如果是为了用通票乘船，其中只有 Tombori River Cruise 包含在通票内。名称与运营方核查日 ${CHECKED}。`,
  },
  {
    q: "道顿堀游船的末班是几点？",
    a: `所有运营日的末班都是 21:00。因为每个班次票价相同，乘坐末班船，是以同样票价欣赏霓虹全部亮起的道顿堀的最划算方式。但它也属于通票运营方所说最先售罄的时段，所以这是唯一值得提前确定、而不是到现场碰运气的班次。使用通票的话，白天就去兑换 20:30 或 21:00 的船票；自费的话，运营方的线上订票开放到开船前 10 分钟。末班时间按大阪官方旅游网站与通票运营方的设施清单，两者一致，核查日 ${CHECKED}。`,
  },
  {
    q: "有比 ¥2,000 的 Tombori River Cruise 更便宜的游船吗？",
    a: `有，前提是不使用通票。大阪官方旅游机构列出的 Wonder Cruise 道顿堀航线为成人 ¥1,000、儿童 ¥500，在同一河段游览 20 分钟（航程相同，票价减半），在日本桥码头登船，售票亭在旁边的 WONDER PUB 店内。较长的大阪航线是日本桥到八轩家滨的单程，30 到 40 分钟，成人 ¥1,800、儿童 ¥900。不足之处是每条航线班次有限，官方建议提前预约，而且任何大阪通票都不包含它。如果你持有大阪周游卡，可免费乘坐 Tombori River Cruise，就不需要做这个比较。票价核查日 ${CHECKED}。`,
  },
  {
    q: "大阪周游卡坐道顿堀游船免费吗？",
    a: `免费。Tombori River Cruise 是大阪周游卡的免费设施之一，而且没有像梅田蓝天大厦那样的时间限制。它也是大阪 e-Pass 的免费设施。需要注意的是流程而不是费用：你要在换票柜台把通票兑换成注明发船时间的船票，运营方明确写着只能在票上的时间登船。通票运营方也提醒傍晚的游船很快售罄，建议在白天换票。一日卡 ${PASS_1_DAY}，仅 ¥2,000 的游船加上大阪城天守阁 ¥1,200，在还没乘坐任何一趟地铁之前就已经接近回本。条件核查日 ${CHECKED}。`,
  },
  {
    q: "道顿堀游船需要提前订吗？",
    a: "通常不用，但傍晚和下午的情况不同。当天票在码头旁的售票处出售，售票处在首班前一小时开门，工作日下午直接去即可。不受理电话预约。周五或周六晚上的班次，请使用运营方的线上订票（开放到开船前 10 分钟，须预先付款）；如果使用通票，就在白天先兑换好傍晚的时段，因为运营方表示夜间班次最先满员。",
  },
  {
    q: "道顿堀游船晚上还是白天好？",
    a: "只坐一次的话，建议晚上。这趟游船的看点是格力高广告牌、霓虹店面与水面的灯光，这些都要天黑后才看得到。白天也有两个实际的理由：时段比较容易订到；想在一天里安排好几个免费设施的通票持有人，会发现 13:00 的班次比 19:30 更好安排。如果想挑一班刚好赶上天色转暗的船，我们的梅田蓝天大厦攻略（英文）列有大阪各季节公布的日落时间。",
  },
  {
    q: "下雨还会开船吗？",
    a: `通常会，但请带件外套和帽子：这艘船在「水都大阪」游船门户网站上被列为没有顶棚（核查日 ${ROOF_CHECKED}），正因为没有顶棚，它才能从道顿堀那些低矮的桥下通过。公布的停航条件并不是下雨本身：通票运营方的设施清单写的是可能因河川状况或船只维修停止运营。真正的风险是大雨和水位上涨，而不是阵雨；天气不稳定的话，在同一片街区不用淋雨的替代方案是美食漫步，而不是坐船。`,
  },
  {
    q: "道顿堀的游船该选哪一艘？",
    a: "如果持有大阪通票，或想选班次最密的游船，选 Tombori River Cruise：¥2,000、20 分钟、每半小时一班，而且是唯一包含在通票中的游船。如果自费、想用 ¥1,000 坐同样 20 分钟的航程，不介意改到日本桥码头登船，也不介意因班次有限而需要提前预约，选 Wonder Cruise 道顿堀航线。想要 30 分钟较长的航程，选浪花观光游船。想坐沙发式座位、边喝自带的饮料边游览，选道顿堀 City Cruise；它的商品页还写明可以带宠物，这在游船中很少见。如果这趟是夜生活的开场而不是观光，选 TONBORIRAVE：船上有 DJ，船票还附 Piccadilly 夜店免费入场。同一条河，能度过很不一样的夜晚。",
  },
  {
    q: "带小孩坐道顿堀游船合适吗？",
    a: "合适，从票价设定就能看出来：小学生 ¥500，成人 ¥2,000。20 分钟的航程短到孩子能保持注意力，讲解轻松热闹而不是一本正经，而且不像观景台或主题乐园项目那样要排长队。需要提前考虑的是：这是一艘没有顶棚的船（八月有烈日，一月有寒风），而且船票指定了时间，要在票上的时间之前到达，而不是到了再说。",
  },
  {
    q: "游船前后，道顿堀周边还能做什么？",
    a: "20 分钟的游船填不满一个晚上，而码头两侧的街道是全日本美食最密集的地方。白天可以选美食漫步：Klook 上 11:00 到 14:00 的道顿堀拼团行程，包含串炸、章鱼烧、季节午餐套餐与一道甜点，2 到 10 人成团。晚上可以选穿梭于难波大街小巷的酒吧巡游，而不是只逛道顿堀大街。这两个行程走的都是游船从水上看到的那几百米街区。",
  },
];

const tourPicks = [
  withKlookLocale(dotonboriDaytimeFoodTour, L, {
    title: "大阪道顿堀白天美食之旅",
    desc: "三小时的拼团漫步，时间为 11:00–14:00、2 到 10 人，内容有串炸、章鱼烧、居酒屋的季节午餐套餐与一道本地甜点",
  }),
  withKlookLocale(nambaBarHoppingNightTour, L, {
    title: "大阪难波酒吧巡游夜间之旅",
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
            道顿堀游船 2026：<br />票价、开船时间与太左卫门桥码头
          </h1>
          <p className={styles.heroSubtitle}>
            成人 ¥2,000、约 20 分钟，11:00 到 21:00 之间从太左卫门桥码头每半小时一班。持大阪周游卡可免费乘船，
            但需在傍晚班次满员前完成换票。
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
              <strong>道顿堀游船</strong>（官方名称 <strong>Tombori River Cruise（とんぼりリバークルーズ）</strong>，
              由<strong>一本松海运</strong>运营）票价为成人<strong>¥2,000</strong>、学生<strong>¥1,000</strong>、
              儿童<strong>¥500</strong>，航程<strong>约 20 分钟</strong>。游船从离戎桥步行一分钟的
              <strong>太左卫门桥码头</strong>出发，<strong>11:00 到 21:00 每 30 分钟一班</strong>，售票处 10:00 开门。
              把通票兑换成指定时间的船票后，持<strong>大阪周游卡可免费乘坐</strong>。
            </p>
            <p className={styles.verdictText}>
              其余细节：学生票适用于初中及以上，儿童票适用于小学生，
              每位付费成人可带一位学龄前儿童免费。换票柜台位于码头正对面的唐吉诃德道顿堀店 1 楼。
              持<strong>大阪 e-Pass</strong> 也可免费乘坐，两种通票都没有下午时间限制。但仅凭通票不能直接登船：
              你需要在换票柜台兑换成注明发船时间的船票，而通票运营方提醒傍晚的班次最先售罄。当天票从首班前
              一小时（10:00）起在码头销售；线上订票在开船前 10 分钟截止，不受理电话预约。
              全部核查日 {CHECKED}。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看大阪周游卡 →
              </KlookLink>
              <KlookLink href={K.city} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                用简体中文预订道顿堀游船 →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>游船介绍<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>道顿堀游船是什么？</h2>
          <p className={styles.bodyText}>
            一趟 <strong>20 分钟、¥2,000</strong> 的航程，船身低、没有顶棚，名字叫
            <strong>Tombori River Cruise</strong>，由<strong>一本松海运</strong>运营，
            从<strong>太左卫门桥码头</strong>在 <strong>11:00 到 21:00</strong> 之间每半小时开一班，
            持<strong>大阪周游卡可免费乘坐</strong>。「道顿堀游船」是游客搜索时使用的说法；
            <strong>Tombori River Cruise（とんぼりリバークルーズ）</strong>才是船票、码头指示牌与通票运营方免费设施清单上的名字，
            也是你在现场要找的名字。
          </p>
          <p className={styles.bodyText}>
            游船行驶在格力高广告牌、戎桥人潮和巨型机械螃蟹招牌共同面对的那几百米河道上，船上有导游
            用大阪人特有的轻快风趣口吻讲解。
          </p>
          <p className={styles.bodyText}>
            这 20 分钟的价值在于观景视角。道顿堀街上人流拥挤：你在戎桥上和其他游客肩并肩，想拍下招牌全景却很难
            拉开距离。在水面上，你位于人群下方，可以毫无遮挡地正对店面，桥从头顶近距离经过，这也说明了
            这些船为什么没有顶棚。
          </p>
          <p className={styles.bodyText}>
            这里没有需要抢的分时入场系统，没有开售日，工作日下午也没有售罄的风险。需要注意的是
            <strong>通票持有人的换票规则</strong>，以及比白天更早满员的傍晚班次，大多数人的行程安排
            就取决于这两点。本页其余部分介绍票价、时刻、码头，以及在同一河段运营的另外四种游船。
          </p>
        </section>

        {/* Fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>门票价格<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>道顿堀游船票价多少？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>成人 ¥2,000、学生 ¥1,000、儿童 ¥500。</strong>每个年龄段只有一个票价，所有班次都一样：
            夜间班次不加价，这并不常见，也是它其实很划算的原因：
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
            <strong>Last checked: {CHECKED_ISO}</strong> — 来源：{" "}
            <a href={OSAKA_INFO_URL} target="_blank" rel="noopener">
              大阪观光局官方网站，Tombori River Cruise
            </a>
            。票价来自大阪官方旅游网站与大阪周游卡运营方发布的免费设施清单，核查日 {CHECKED}，两者列出的是同样
            三个价格。船公司官方网站在核查当天因维护无法访问，所以本页所有数字都来自上述两个来源。
            可能变动，付款前请确认。本站整理的日本其他景点门票（各自附核查日），请见{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景点门票价格总表（英文）
            </Link>。
          </p>
        </section>

        {/* Schedule */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>时间与码头<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>道顿堀游船几点开船？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>11:00 到 21:00，每 30 分钟一班</strong>（整点与半点），2026 年除 7 月 13、24、25 日
            外每天运营。码头旁的售票处在首班前一小时开门，也就是 <strong>10:00</strong>：
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {CHECKED_ISO}</strong> — 来源：{" "}
            <a href={OSAKA_INFO_URL} target="_blank" rel="noopener">
              osaka-info.jp，Tombori River Cruise
            </a>
            （&ldquo;11:00-21:00 Departs every hour on the hour and half hour&rdquo;）；7 月停航日来自{" "}
            <a href="https://osaka-amazing-pass.com/en/service_free.html" target="_blank" rel="noopener">
              大阪周游卡免费设施清单
            </a>
            。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            每天 21 个班次，是安排行程时有用的信息。这意味着游船可以安排在晚间行程中，无需为此占用整个晚上；
            而 <strong>21:00 的末班</strong>足够晚，无论哪个季节，晚餐后都还能乘坐。时刻核查日 {CHECKED}。
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            Tombori River Cruise 要坐多久？
          </h3>
          <p className={styles.bodyText}>
            <strong>在水上约 20 分钟。</strong>大阪官方旅游网站写 20 分钟，「水都大阪」游船门户网站写
            「约 20 分钟」，核查日都是 {CHECKED}。实际请预留<strong>从头到尾约 40 分钟</strong>：换票、
            走下浮动码头以及登上二三十人的小船，还需要另一半时间。20 分钟对这条航线来说正合适：这段河道
            两岸只有几百米的霓虹店面，航程再长也只是多绕一圈。
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            道顿堀游船在哪里坐？
          </h3>
          <p className={styles.bodyText}>
            在<strong>太左卫门桥码头</strong>，位于道顿堀川<strong>北岸</strong>的 Tombori River Walk
            河滨步道上，从戎桥往东步行约一分钟。请先找附近的地标，而不是码头：换票柜台在
            <strong>唐吉诃德道顿堀店 1 楼</strong>（就是外墙装有摩天轮的那栋建筑），就在浮动码头正对面。从
            <strong>难波</strong>、<strong>心斋桥</strong>或<strong>日本桥</strong>站步行 5 到 10 分钟，
            但从这三个车站出来，都会先到格力高广告牌所在的南岸，所以要从戎桥或太左卫门桥过河才能到达登船处。御堂筋线如何
            连接难波与梅田、天王寺，请见我们的{" "}
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>大阪交通攻略（英文）</Link>。
            位置与步行时间核查日 {CHECKED}。
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            当天购票还是提前预订，以及哪些班次容易满员
          </h3>
          <p className={styles.bodyText}>
            这两种方式并不相同，但差别只在天黑之后才明显。<strong>当天购票</strong>：码头旁的售票处从
            10:00 起出售下一个还有空位的班次，而通票运营方说得很直接：「所有座位都满的时候就不能登船」。
            <strong>提前预订</strong>：运营方的线上订票须预先付款，开放到<strong>开船前 10 分钟</strong>，
            周五或周六晚上建议使用。不受理电话预约。
          </p>
          <p className={styles.bodyText}>
            至于哪些时段最先满员，唯一公开的说法来自通票运营方，而且很具体：请在<strong>白天</strong>
            换票，因为<strong>傍晚的游船很快售罄</strong>。按这一说明，入夜后的班次（19:00 至 21:00
            的这些班次，周末更是如此）才是稀缺的，而工作日下午直接去就能坐。除此之外没有任何公开的
            载客率数据，所以更具体的说法都只能算推测。说明核查日 {CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪周游卡（含游船）→
            </KlookLink>
            <KlookLink href={K.city} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              提前预订道顿堀游船时段 →
            </KlookLink>
          </div>
        </section>

        {/* Night or day */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>乘船时段<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>道顿堀游船晚上还是白天好？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            <strong>只坐一次的话，建议晚上</strong>：霓虹灯夜景才是亮点，而每个班次票价相同，所以无需额外付费就能看到夜景。
            但使用通票时答案会不同，因为你实际能订到的时段，不一定是你想要的时段：
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
          <span className={styles.sectionLabel}>游船比较<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>道顿堀的游船该选哪一艘？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            这段河道上有好几家运营方，而且不能互相替代。有两点区别值得注意。第一，
            <strong>只有 Tombori River Cruise 是通票设施</strong>，而 Klook 并没有把它作为单独商品销售，所以如果
            你持有大阪通票，要在柜台换票，而不是在手机上预订。第二，唯一公布了官方票价的其他游船，
            日本桥码头的 <strong>Wonder Cruise</strong>，
            <strong>提供票价 ¥1,000、航程 20 分钟的道顿堀航线，票价是 Tombori River Cruise 的一半</strong>，
            适合自费且没有通票的游客。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["游船", "航程长度", "票价", "大阪通票是否包含", "购买渠道"].map((h) => (
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
            Tombori River Cruise 的数字来自大阪官方旅游网站与通票运营方的设施清单；Wonder Cruise 那两行来自同一旅游
            机构发布的 WONDER CRUISE・PIRATES 页面；最后三行为各 Klook 商品页的说明。全部核查日{" "}
            {CHECKED}。Klook 价格随日期变化，所以这里不引用任何 Klook 票价，请打开商品页查看当前票价
            与取消条件，取消条件按商品而不是按运营方设定。可能变动。
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
          <span className={styles.sectionLabel}>预订步骤<span className="sr-only">：</span></span>
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
          <span className={styles.sectionLabel}>通票说明<span className="sr-only">：</span></span>
          <h2 className={styles.sectionTitle}>大阪周游卡坐道顿堀游船免费吗？</h2>
          <p className={styles.bodyText}>
            <strong>免费，而且全天可用。</strong>Tombori River Cruise 是大阪周游卡 40 多项免费设施之一，而且
            <strong>没有下午时间限制</strong>。这一点值得说明，因为同一张通票的梅田蓝天大厦在 15:00
            之后就不再免费。它在大阪 e-Pass 也是免费设施。
          </p>
          <p className={styles.bodyText}>
            需要注意的不是使用时间，而是换票排队。仅凭通票不能直接登船：你需要在换票柜台兑换成注明发船时间的船票，
            运营方明确写着<strong>只能在票上的时间登船</strong>。他们公布的建议是傍晚的游船很快售罄，
            请在白天完成换票。实际操作上，就是去吃午饭的路上经过唐吉诃德时，顺便兑换 19:30 的班次，
            而不是 19:20 才到，然后发现下一班可免费乘坐的船是 21:00。
          </p>
          <p className={styles.bodyText}>
            要去第三个设施才划算。一日卡 {PASS_1_DAY}（官方价格，2026 年 11 月 9 日核查），游船（¥2,000）加上大阪城天守阁（¥1,200）是 ¥3,200 的
            门票，略低于通票价格；再加上 15:00 之前的梅田观景台就是 ¥5,200。完整的免费设施清单、
            两日卡价格与不含项目，请见我们的{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>大阪周游卡攻略（英文）</Link>；
            在大阪游玩一天，哪些项目包含在通票中、哪些不包含，请见{" "}
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

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="坐船前后的那几个小时"
          intro="20 分钟的游船之外，整个晚上都还空着，而码头周围的街道是全日本美食最密集的地方。第一个是白天的漫步行程，第二个是天黑之后的行程。Klook 价格随日期变化，请打开商品页查看当前票价与集合地点。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/osaka-food-tour", title: "大阪美食之旅（2026）：该订哪一个、时间与吃什么（英文）" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "大阪两日游行程（2026）：每日安排与该订什么（英文）" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周游卡（2026）：一日 ¥3,500 值得买吗？（英文）" },
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
            <h2 className={styles.ctaBannerTitle}>关键是提前确定乘船时段</h2>
            <p className={styles.ctaBannerDesc}>
              ¥2,000 的票价不是问题，稀缺的是傍晚的班次；即使持有可免费乘船的通票，也要在夜间班次满员前
              到柜台换票。付款前请查看订单上显示的取消条件，取消条件按商品而不是按运营方设定。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看大阪周游卡 →
              </KlookLink>
              <KlookLink href={K.city} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                预订道顿堀游船 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
