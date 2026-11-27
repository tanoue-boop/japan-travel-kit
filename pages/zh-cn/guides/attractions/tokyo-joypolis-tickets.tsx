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
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  klookEsim,
  odaibaHotelsUrl,
  skyhopHopOnHopOffBus,
  teamlabPlanetsTicketUrl,
  tokyoBayDinnerCruiseSymphony,
  tokyoBaySunsetBoatCruise,
  tokyoBaySunsetCruise,
  tokyoBayYakatabuneDinnerShow,
  tokyoJoypolisPassport,
  tokyoJoypolisTicket,
  tokyoSightseeingBusTour,
  tokyoAirportStayAreas,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/tokyo-joypolis-tickets) section by section as of
// 2026-11-26 (task-jtk-20261126-TR01): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (tokyo-joypolis.com, read 17 Nov
// 2026); nothing is added. Title term: 东京JOYPOLIS — the Tokyo Convention & Visitors Bureau's
// Simplified Chinese page and LIVE JAPAN (东京JOYPOLIS主题乐园) write it so; resellers serving
// Singapore and Malaysia (Pelago, KKday) add 世嘉 and 通票, so both appear in the title and hero.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/tokyo-joypolis-tickets";
const TITLE = "东京JOYPOLIS门票 2026：世嘉室内乐园通票价格";
const H1 = "东京JOYPOLIS门票 2026：JOYPOLIS通票价格，值不值得买？";
const DESC =
  "东京JOYPOLIS门票：入场券 ¥1,700，设施无限次乘坐的通票 ¥6,000（15:00 后 ¥5,000），玩到第 5 项就回本。附台场一日行程。";

const CHECKED_ISO = "2026-11-17";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);

const PASSPORT_URL = klookFor(tokyoJoypolisPassport.url, LOCALE);
const TICKET_URL = klookFor(tokyoJoypolisTicket.url, LOCALE);
const SUNSET_URL = klookFor(tokyoBaySunsetCruise.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const OFFICIAL = [
  { label: "tokyo-joypolis.com 票价页", href: "https://tokyo-joypolis.com/ticket/" },
  { label: "设施列表与单次费用", href: "https://tokyo-joypolis.com/attraction/" },
  { label: "交通信息页", href: "https://tokyo-joypolis.com/access/" },
];

const priceRows = [
  {
    ticket: "结论：买哪一种？",
    adult: "玩第 5 项起买通票",
    child: "玩第 4 项起买通票",
    what: "只买入场券时，每项设施 ¥700–¥1,000。打算玩 5 项以上（学生 4 项以上）就买通票；少于这个数量，就买入场券再逐项付费",
  },
  {
    ticket: "入场券（入場券）",
    adult: "¥1,700",
    child: "¥1,400",
    what: "只能入园，每项设施都要另外付费",
  },
  {
    ticket: "持入场券玩单项设施",
    adult: "¥700–¥1,000",
    child: "¥700–¥1,000",
    what: "每人每次。过山车、Halfpipe Tokyo 和 NARUTO 为 ¥1,000，其他多为 ¥700–¥900",
  },
  {
    ticket: "通票（パスポート）",
    adult: "¥6,000",
    child: "¥5,000",
    what: "入场加当天设施无限次乘坐，几乎所有人要买的都是这一张",
  },
  {
    ticket: "入园后在园内购买通票（館内料金）",
    adult: "¥4,300",
    child: "¥3,600",
    what: "已持入场券入园后的升级价格。¥1,700 + ¥4,300 = ¥6,000，所以不是折扣",
  },
  {
    ticket: "傍晚通票（イブニングパスポート）",
    adult: "¥5,000",
    child: "¥4,000",
    what: "15:00 起发售，22:00 闭园的日子为 16:00 起。当天剩下的时间设施无限次乘坐",
  },
  {
    ticket: "入园后在园内购买傍晚通票",
    adult: "¥3,300",
    child: "¥2,600",
    what: "算法同上：¥1,700 + ¥3,300 = ¥5,000",
  },
  {
    ticket: "CHOI-NORI-NIGHT 2 次券（ちょいのりナイト2回券）",
    adult: "¥3,100",
    child: "¥3,100",
    what: "入场加任选 2 项设施，小学生以上统一价格。17:00 起发售，22:00 闭园的日子为 18:00 起",
  },
  {
    ticket: "年票（年間パスポート）",
    adult: "¥29,000",
    child: "¥24,000",
    what: "一年内设施无限次乘坐，只适合住在东京的人",
  },
];

const heightRows = [
  {
    limit: "无身高限制",
    rides:
      "Pirate's Plunder、NARUTO Music Dancer、MISSION SPARK、Gyakuten Saiban in Joypolis、Fortune Forest、Laura & Carla、Attack on Titan THE ATTRACTION、MURDER LODGE",
    note: "21 项中的 8 项，足够带幼儿玩上一段时间，但都不是刺激类设施",
  },
  {
    limit: "90 厘米以上",
    rides: "Spicy Taxi、House of the Dead ~Scarlet Dawn~ THE ATTRACTION",
    note: "园内最低的身高限制",
  },
  {
    limit: "110 厘米以上",
    rides:
      "LASER SHOOTING ISSEN、Sonic Athletics、Ayakashi Yashiki、Wild Wing、Wild Jungle Brothers、Wild River The Treasure Hunt",
    note: "大多数家庭出游会卡在这一级，也正好是免费入场标准的 110 厘米",
  },
  {
    limit: "130 厘米以上",
    rides: "Gekion Live Coaster、Halfpipe Tokyo、Transformers Human Alliance Special",
    note: "室内过山车与 Halfpipe，正是 JOYPOLIS 最有名的两项设施",
  },
  {
    limit: "140 厘米以上，并有上限",
    rides: "Sadako ~Kurui Uranai no Yakata~（140–185 厘米）、Storm-G（140–200 厘米）",
    note: "同时设有最低与最高身高限制的只有这两项",
  },
];

const comboRows = [
  {
    when: "结论",
    what: "上午 teamLab Planets，15:00 起用傍晚通票玩 JOYPOLIS，晚上到台场海滨公园看夜景",
    ticket: "先订 Planets 的入场时段；JOYPOLIS 不需要指定日期",
  },
  {
    when: "上午",
    what: "teamLab Planets TOKYO（丰洲）：百合海鸥线新丰洲站 1A 出口步行 3 分钟。开放 8:00–22:00，最后入场为闭馆前 1 小时",
    ticket: "指定日期与入场时段的门票；官方售票网站成人 ¥3,800 起",
  },
  {
    when: "中午",
    what: "同一条百合海鸥线从新丰洲直达台场海滨公园，不用换乘；午餐在 DECKS Tokyo Beach",
    ticket: "IC 卡",
  },
  {
    when: "15:00 起",
    what: "东京JOYPOLIS，位于 DECKS 3–5 层，台场海滨公园站步行 2 分钟。傍晚通票 15:00 起发售（22:00 闭园的日子为 16:00）",
    ticket: "傍晚通票成人 ¥5,000，学生 ¥4,000；最后入场为闭园前 45 分钟",
  },
  {
    when: "晚上",
    what: "DECKS 前面的台场海滨公园：公园管理方特别推荐从沙滩、观景台或空中步道看日落和夜景",
    ticket: "无需预订",
  },
  {
    when: "替代方案",
    what: "东京湾日落游船，经过彩虹大桥与台场海岸，适合想从海上看夜景的人",
    ticket: "请提前预订；参考游船攻略",
  },
];

const whoFor = [
  {
    title: "这些情况买通票",
    desc: `你会玩 5 项以上设施（学生 4 项以上）。通票成人 ¥6,000、学生 ¥5,000，其中设施部分相当于 ¥4,300 和 ¥3,600，而单项设施为 ¥700–¥1,000，所以选 ¥1,000 的设施时，从第 5 项起通票就更划算，也不用每次排队前都算一遍。票价来自 ${CHECKED} 的 tokyo-joypolis.com。`,
  },
  {
    title: "这些情况只买入场券",
    desc: `你只想玩两三项、逛游戏机楼层，或者是帮大家看包的大人。入场券成人 ¥1,700、学生 ¥1,400，入园后可以用 ¥4,300 升级为通票，合计同样是 ¥6,000，所以到现场再决定也没有损失。${CHECKED} 核实。`,
  },
  {
    title: "这些情况买傍晚票",
    desc: `JOYPOLIS 排在台场一日行程的后半段。傍晚通票 15:00 起发售（22:00 闭园的日子为 16:00 起），成人 ¥5,000、儿童 ¥4,000；CHOI-NORI-NIGHT 2 次券 17:00 起发售，小学生以上统一 ¥3,100。${CHECKED} 核实。`,
  },
];

const steps = [
  {
    title: "先在官方日历上确认日期",
    desc: `这是唯一不能跳过的一步。JOYPOLIS 没有公布固定的营业时间：官网用日历按时段公布，并说明时间可能不经通知变更。计划入园日期有哪一种傍晚票、几点开售，取决于当天是否 22:00 闭园。${CHECKED} 核实。`,
  },
  {
    title: "先决定票种，再决定在哪里买",
    desc: "入场券、通票、傍晚通票和 2 次夜间券是四种不同的产品，最便宜与最贵之间相差超过 ¥4,000。先从上面的表格选好票种，再打开购票渠道，顺序不要反过来。",
  },
  {
    title: "想用中文界面或日本境外发行的银行卡付款，就提前预订",
    desc: "JOYPOLIS 现场也售票，所以不用担心售罄；麻烦的是付款。Klook 的商品页可以用中文界面结账、接受日本境外发行的银行卡，入口出示手机二维码即可入园，不用在售票处排队。商品页还标明可预订当日、即时确认和免费取消；付款前请确认计划入园日期显示的取消期限。",
  },
  {
    title: "至少在闭园前 90 分钟到达，最好更早",
    desc: `最后入场为闭园前 45 分钟，这是当天的硬性期限。此外，Klook 商品页建议预留 2 到 4 小时，设施又分布在三个楼层，闭园前 1 小时才到只够转一圈。最后入场规定来自 ${CHECKED} 的 tokyo-joypolis.com。`,
  },
  {
    title: "保留 JOYPOLIS 卡以便再次入园",
    desc: `官方英文页说明，持 JOYPOLIS 卡者在发卡当天可以无限次再次入园；日文官网补充，再次入园可到闭园前 45 分钟为止。正因如此，JOYPOLIS 可以和台场的其他行程搭配，而不用花掉一整天。${CHECKED} 核实。`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "东京JOYPOLIS通票多少钱？",
    a: `JOYPOLIS 通票（入场加当天设施无限次乘坐）现场价格为成人（18 岁以上）¥6,000，小学、初中、高中学生 ¥5,000。持入场券入园后在园内购买为 ¥4,300 和 ¥3,600，合计相同。15:00 后（22:00 闭园的日子为 16:00 后）的傍晚通票为 ¥5,000 和 ¥4,000。只买入场券为 ¥1,700 和 ¥1,400。来自 ${CHECKED} 的 tokyo-joypolis.com。`,
  },
  {
    q: "东京JOYPOLIS值得去吗？",
    a: `如果同行的人会玩至少 5 项设施，而且每个人都符合身高限制，就值得。只持入场券时每项设施 ¥700 到 ¥1,000，所以成人通票中 ¥4,300 的设施部分，从第 5 项（选 ¥1,000 的设施）到第 7 项（选 ¥700 的设施）起回本。身高不足 110 厘米的儿童只能玩无身高限制的设施，就没那么划算。${CHECKED} 核实的票价。`,
  },
  {
    q: "JOYPOLIS 需要玩多久？",
    a: `预留 2 到 4 小时，这是 Klook 商品页给出的时间。三个楼层共有 21 项设施，最后入场为闭园前 45 分钟，所以即使只是短暂停留，也请至少在闭园前 90 分钟到达。当天在最后入场前都可以再次入园，可以出去吃午饭再回来。${CHECKED} 核实。`,
  },
  {
    q: "JOYPOLIS 适合成年人吗？",
    a: `适合。园区以青少年和成年人的设施为主：Gekion Live Coaster 和 Halfpipe Tokyo 需要 130 厘米以上，Storm-G 为 140 到 200 厘米，3D 音效恐怖设施 MURDER LODGE 不接待 7 岁以下儿童。成人通票 ¥6,000；60 岁以上出示年龄证明可免费入场，并可以用园内价格 ¥4,300 购买通票。${CHECKED} 核实。`,
  },
  {
    q: "怎么去东京JOYPOLIS？",
    a: `乘百合海鸥线到台场海滨公园站，步行 2 分钟；或乘临海线到东京电讯港站，步行 5 分钟。官方交通页标明百合海鸥线从新桥约 13 分钟、从东京站经新桥约 23 分钟，临海线从涩谷约 18 分钟、从新宿约 23 分钟。JOYPOLIS 位于台场 1-6-1 DECKS Tokyo Beach 3 至 5 层。${CHECKED} 核实。`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "东京JOYPOLIS门票多少钱？",
    a: `只买入场券为 18 岁以上成人 ¥1,700，小学、初中、高中学生 ¥1,400。加上当天设施无限次乘坐的通票为成人 ¥6,000、学生 ¥5,000。傍晚通票 15:00 起发售（22:00 闭园的日子为 16:00 起），为 ¥5,000 和 ¥4,000；CHOI-NORI-NIGHT 券（入场加任选 2 项设施，17:00 起发售）小学生以上统一 ¥3,100。年票为成人 ¥29,000、学生 ¥24,000。全部来自 ${CHECKED} 的 tokyo-joypolis.com。`,
  },
  {
    q: "入场券和 JOYPOLIS 通票有什么区别？",
    a: `入场券让你进入建筑，通票让你乘坐设施。持成人入场券 ¥1,700 入园后，每项设施都要另外付费，也可以在园内用 ¥4,300 升级为通票，合计正好是现场通票的 ¥6,000，所以分两次购买既不省钱也不多花钱。单项设施为 ¥700 到 ¥1,000，想玩 5 项以上就买通票。${CHECKED} 核实。`,
  },
  {
    q: "JOYPOLIS 傍晚有更便宜的门票吗？",
    a: `有两种。傍晚通票成人 ¥5,000、学生 ¥4,000，比一日通票便宜 ¥1,000，平时 15:00 起发售，22:00 闭园的日子为 16:00 起。更便宜的是 CHOI-NORI-NIGHT 2 次券，小学生以上统一 ¥3,100，17:00 起发售（22:00 闭园的日子为 18:00 起），包含入场和任选 2 项设施。两者都来自 ${CHECKED} 的官方票价页。`,
  },
  {
    q: "东京JOYPOLIS营业时间是几点？",
    a: `没有唯一的答案，而这正是官方的说法：tokyo-joypolis.com 用日历按时段公布营业时间，并说明可能不经通知变更。每天都适用的规则有两条：最后入场为闭园前 45 分钟，再次入园也到闭园前 45 分钟为止。傍晚票的开售时间取决于闭园时间（傍晚通票 15:00 或 16:00，夜间券 17:00 或 18:00），所以在日历上确认日期时，也就知道当天有哪一种傍晚票。${CHECKED} 核实。`,
  },
  {
    q: "东京JOYPOLIS有身高限制吗？",
    a: `有，21 项设施中有 13 项，而且影响比一般乐园大。90 厘米以上 2 项、110 厘米以上 6 项、130 厘米以上 3 项（包括园区最有名的 Gekion Live Coaster 和 Halfpipe Tokyo），另有 2 项同时设有上限：Sadako 为 140 到 185 厘米，Storm-G 为 140 到 200 厘米。其余 8 项完全没有限制。来自 ${CHECKED} 的官方设施页。`,
  },
  {
    q: "可以带幼儿去东京JOYPOLIS吗？",
    a: `可以免费入场，但在把整个下午安排进去之前，请先看身高限制表。官网规定身高不足 110 厘米的学龄前儿童免费入场，而 110 厘米同时也是 6 项设施的最低身高，另有 3 项为 130 厘米。实际上，身高不足 110 厘米的儿童可以玩 8 项无身高限制的设施和游戏机楼层，值得去，但时间不长。限制最低的 Spicy Taxi 和 House of the Dead 设施从 90 厘米起。${CHECKED} 核实。`,
  },
  {
    q: "还有哪些人可以免费入场？",
    a: `官方票价页列出四类：身高不足 110 厘米的学龄前儿童；出示年龄证明的 60 岁以上游客；出示母子手册的孕妇；残障人士手册持有人及最多 2 名陪同者。同行者如果属于其中一类，请在现场为他们购票，不要在线购买。${CHECKED} 核实。`,
  },
  {
    q: "东京JOYPOLIS门票需要提前预订吗？",
    a: "不需要。和东京迪士尼或 teamLab 不同，JOYPOLIS 是直接入园的乐园，没有指定日期的门票，也没有入场时段，所以不会售罄，也不用提前几周安排。在线购票的好处在于结账，而不在于名额：通过第三方预订平台可以用中文界面购买、使用能顺利付款的银行卡，并在入口出示二维码。如果你已经在台场，身上又有日本发行的银行卡，在售票处购买也完全没问题。",
  },
  {
    q: "下雨天去东京JOYPOLIS是好选择吗？",
    a: "是东京比较好的雨天选择之一。整个园区都在购物中心内的室内，购物中心与台场海岸的其他设施之间部分有遮蔽通道相连，百合海鸥线车站也只要 2 分钟。如果东京湾游船或户外观景台因雨取消，这是不需要重新预订就能替换的行程；而且可以再次入园，也能出去 DECKS 吃饭再回来。",
  },
  {
    q: "同一天在台场还能做什么？",
    a: "最顺的搭配是东京湾游船：船从台场和不远的日之出码头出发，傍晚的航班和傍晚通票的时间刚好衔接。有一点要更正，因为仍有不少人弄错：teamLab Borderless 已经不在台场。它在台场闭馆后，迁到麻布台之丘重新开幕，所以 JOYPOLIS 加 teamLab 的一天，现在是东京两个不同的区域，而不是同一片海岸。另外，曾和 JOYPOLIS 同在 DECKS 大楼、常和 JOYPOLIS 一起以套票出售的东京杜莎夫人蜡像馆，其官网说明已于 2026 年 9 月 30 日停止营业。",
  },
];

const sameDayCards: KlookSameDayCard[] = [
  {
    kind: "门票",
    label: "teamLab Planets TOKYO 门票",
    ctaLabel: "预订 teamLab Planets 入场时段 →",
    url: klookFor(teamlabPlanetsTicketUrl, LOCALE),
    why: "Planets 位于和 JOYPOLIS 同一条百合海鸥线的新丰洲站，步行 3 分钟，但门票指定日期与入场时段，是台场一日行程中最应该先预订的部分。",
  },
  {
    kind: "酒店",
    label: "台场酒店",
    ctaLabel: "在 Klook 查看台场酒店 →",
    url: klookFor(odaibaHotelsUrl, LOCALE),
    why: "傍晚通票可以用到闭园，海岸夜景又在那之后，住在台场就不用深夜再过海回市区。",
  },
  {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "JOYPOLIS 用日历公布营业时间，而不是固定时间，傍晚票也取决于当天的时间，出发前请用手机确认日期。",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "东京湾日落游船",
    ctaLabel: "查看东京湾日落游船 →",
    url: SUNSET_URL,
    why: "配合日落时间出航，经过彩虹大桥与台场海岸，和在 JOYPOLIS 用傍晚通票度过的下午时间衔接得上。",
  },
  {
    label: "东京湾 Symphony 号晚餐游船",
    ctaLabel: "查看 Symphony 晚餐游船 →",
    url: klookFor(tokyoBayDinnerCruiseSymphony.url, LOCALE),
    why: "同一个晚上的晚餐版：从日之出码头出发，绕彩虹大桥一圈的 2 小时 30 分钟全餐游船。",
  },
  {
    label: "东京敞篷观光巴士（Skyhop Bus）",
    ctaLabel: "查看敞篷巴士车票 →",
    url: klookFor(skyhopHopOnHopOffBus.url, LOCALE),
    why: "路线除了浅草和六本木、涩谷，也包括台场，去程和台场周边的其余时间都能乘坐。",
  },
  {
    label: "东京站、丸之内周边酒店",
    ctaLabel: "在 Klook 查看酒店价格 →",
    url: klookFor(tokyoAirportStayAreas[0].url, LOCALE),
    why: "两个机场的利木津巴士和成田的 N'EX 都停靠这里，如果在行程前段安排台场一日游，这是最简单的住宿区域。",
  },
];

const tourPicks = [
  withKlookLocale(tokyoBaySunsetBoatCruise, LOCALE, {
    title: "东京湾白天与日落小船游船",
    desc: "从芝浦出发、船上有导游的 1 小时小船游船，是不含晚餐的东京湾游船",
  }),
  withKlookLocale(tokyoBayYakatabuneDinnerShow, LOCALE, {
    title: "东京湾屋形船晚餐游船（含表演）",
    desc: "1 小时 30 分钟的传统屋形船，含寿喜烧和软饮畅饮，可以在台场外海走上甲板",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "东京观光巴士一日游",
    desc: "配有多语种语音导览，游览皇居庭园、浅草和东京晴空塔的导览行程",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "东京JOYPOLIS门票" }];

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
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
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

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)" }}>
    {label}
  </a>
);

export default function ZhCnTokyoJoypolisTicketsPage({ updated }: { updated: PageUpdated }) {
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
            世嘉（SEGA）经营的室内主题乐园东京JOYPOLIS（東京ジョイポリス）位于台场一栋大楼的 3 层以上，距离百合海鸥线车站 2 分钟。各种门票的价格、通票从第几项设施开始回本，以及怎样排进台场一日行程。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "官方票价，标明核实日期", "通票回本点"].map((t) => (
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
            东京JOYPOLIS门票成人只买入场券为 ¥1,700，设施无限次乘坐的 JOYPOLIS 通票为 ¥6,000（小学至高中学生为 ¥1,400 和 ¥5,000）；只持入场券时每项设施 ¥700–¥1,000，所以通票大约从第 5 项起回本。傍晚另有价格：傍晚通票 15:00 起（22:00 闭园的日子为 16:00 起）¥5,000，可玩 2 项的 CHOI-NORI-NIGHT 券 17:00 起 ¥3,100。预留 2 到 4 小时，乘百合海鸥线到台场海滨公园站（步行 2 分钟，从新桥约 13 分钟），或乘临海线到东京电讯港站（步行 5 分钟）。票价与交通来自 {CHECKED} 的 tokyo-joypolis.com。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>只买入场券</p>
                <p className={styles.verdictStatValue}>成人 ¥1,700，学生 ¥1,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>通票（设施无限次乘坐）</p>
                <p className={styles.verdictStatValue}>成人 ¥6,000，学生 ¥5,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>预留时间</p>
                <p className={styles.verdictStatValue}>2–4 小时，最后入场为闭园前 45 分钟</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>交通</p>
                <p className={styles.verdictStatValue}>台场海滨公园站步行 2 分钟</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>要点：</strong>东京JOYPOLIS门票共有四种。只买入场券为成人 ¥1,700、学生 ¥1,400；加上设施无限次乘坐的通票为 ¥6,000 和 ¥5,000；15:00 起发售的傍晚通票为 ¥5,000 和 ¥4,000；17:00 起发售的 2 次夜间券统一 ¥3,100。不用指定日期，也不会售罄，所以要买的是合适的票，而不是最早的票。购买前也请先看下面的身高限制表：21 项设施中有 13 项设有最低身高，最有名的两项需要 130 厘米。票价来自 {CHECKED} 的 tokyo-joypolis.com。
            </p>
            <KlookLink
              href={PASSPORT_URL}
              target="_blank"
              rel={KLOOK_REL}
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              在 Klook 查看 JOYPOLIS 通票 →
            </KlookLink>
          </div>
        </div>

        <KlookSameDayCards
          heading="台场一日行程的其他预订：teamLab Planets、海边住宿和手机上网"
          cards={sameDayCards}
          footnote={
            <>
              入场时段与票价请参考{" "}
              <Link href="/zh-cn/guides/attractions/teamlab-planets-tickets">teamLab Planets 门票攻略</Link>。
            </>
          }
        />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概况</span>
          <h2 className={styles.sectionTitle}>东京JOYPOLIS是什么样的地方？</h2>
          <p className={styles.bodyText}>
            东京JOYPOLIS是世嘉的室内游乐园，位于台场 1-6-1 DECKS Tokyo Beach 购物中心的 3 至 5 层。它不是迪士尼那样的主题乐园，也没有打算装成那样。21 项设施，包括室内过山车、Halfpipe 模拟器、几个步行体验的恐怖与解谜设施，以及几项授权作品的体验，全部和游戏机楼层一起在同一个屋顶下。
          </p>
          <p className={styles.bodyText}>
            所以它的用途很明确：完全在室内、离车站步行 2 分钟、不需要提前预订，而且 2 到 4 小时就能玩完，不用花一整天。下雨的下午、青少年同行，或者台场一日行程的后半段，这里都是东京最容易加进行程的地方之一。真正要决定好的是四种门票买哪一种，以及同行的每个人是否都符合身高限制。
          </p>
          <p className={styles.bodyText}>
            如果同行的人比起乘坐设施，更想看表演、和角色见面，东京另一个大型室内乐园是多摩中心的三丽鸥彩虹乐园。和 JOYPOLIS 不同，它出售指定日期的通票，还需要预约入园时间，选日期前请先看{" "}
            <Link href="/guides/attractions/sanrio-puroland-tickets" hrefLang="en" style={linkStyle}>
              三丽鸥彩虹乐园门票攻略（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>东京JOYPOLIS通票多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            成人 ¥6,000、学生 ¥5,000；15:00 起的傍晚通票为 ¥5,000 和 ¥4,000。下面列出东京JOYPOLIS所有门票，第一行是通票开始回本的设施数量。“学生”是园方自己的票种（小学、初中、高中学生），“成人”指 18 岁以上。
          </p>
          <Table
            head={["票种", "成人（18 岁以上）", "学生", "说明"]}
            rows={priceRows.map((r) => [r.ticket, r.adult, r.child, r.what])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最后核实：{CHECKED_ISO}。官方来源：
            {OFFICIAL.map((o, i) => (
              <span key={o.href}>
                {ext(o.href, o.label)}
                {i < OFFICIAL.length - 1 ? "、" : "。"}
              </span>
            ))}
            回本那一行是用这些票价计算的：通票减去入场券为成人 ¥4,300、学生 ¥3,600，所以选 ¥1,000 的设施时从第 5 项（学生第 4 项）起回本，选 ¥700 的设施时从第 7 项（第 6 项）起。票价可能调整，购买时请再确认，且园方不退票。可免费入场的有四类：身高不足 110 厘米的学龄前儿童、出示年龄证明的 60 岁以上游客、出示母子手册的孕妇，以及残障人士手册持有人及最多 2 名陪同者。日本各地景点门票与各自的核实日期，请看{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              日本景点门票价格总表（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>选哪种票</span>
          <h2 className={styles.sectionTitle}>东京JOYPOLIS值得去吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            如果你会玩 5 项以上设施，而且每个人都符合身高限制，就值得；只玩两三项的话，入场券加单项费用更便宜。四种当日门票各自适合的情况如下：
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
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Klook JOYPOLIS 通票 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              以入场为主的门票商品 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>身高限制</span>
          <h2 className={styles.sectionTitle}>哪些设施有身高限制？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            21 项设施中有 13 项设有最低身高，其中 2 项另有最高身高。给身高 105 厘米的孩子买 ¥5,000 学生通票之前，就应该先看这张表；这也是免费入场标准 110 厘米值得再看一眼的原因，因为它同时是园内最常见的最低身高。
          </p>
          <Table head={["身高", "设施", "意味着什么"]} rows={heightRows.map((r) => [r.limit, r.rides, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            以上所有限制来自 {CHECKED} tokyo-joypolis.com 的各设施页面。联名设施会更换，如果是为了某一项设施而去，请确认计划入园日期的设施列表。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>成年人</span>
          <h2 className={styles.sectionTitle}>JOYPOLIS 适合成年人吗？</h2>
          <p className={styles.bodyText}>
            适合。园区最有名的两项设施 Gekion Live Coaster 和 Halfpipe Tokyo 需要 130 厘米以上，Storm-G 为 140 到 200 厘米。其他设施也是同样的取向：House of the Dead、LASER SHOOTING ISSEN 等射击设施，步行体验的贞子设施，以及不接待 7 岁以下儿童的 3D 音效恐怖设施 MURDER LODGE。成人通票 ¥6,000；60 岁以上出示年龄证明可免费入场，并可以用园内价格 ¥4,300 购买通票。来自 {CHECKED} 的 tokyo-joypolis.com。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>营业时间与交通</span>
          <h2 className={styles.sectionTitle}>怎么去东京JOYPOLIS？</h2>
          <p className={styles.bodyText}>
            乘百合海鸥线到台场海滨公园站步行 2 分钟，或乘临海线到东京电讯港站步行 5 分钟；各出发地的完整路线列在本节最后。
          </p>
          <h2 className={styles.sectionTitle}>JOYPOLIS 需要玩多久？</h2>
          <p className={styles.bodyText}>
            按 Klook 商品页的建议预留 2 到 4 小时，并至少在闭园前 90 分钟到达。JOYPOLIS 没有公布固定的营业时间：官网用日历按时段公布，并明确说明时间可能不经通知变更。所以实际的做法是确认你自己的日期，而不是相信其他任何网站上的数字，包括本页。每天都适用的规则有两条：<strong>最后入场为闭园前 45 分钟</strong>，再次入园也到闭园前 45 分钟为止；官方英文页还说明，持 JOYPOLIS 卡者在发卡当天可以无限次再次入园。
          </p>
          <p className={styles.bodyText}>
            闭园时间也决定傍晚票。平时傍晚通票 15:00 起、2 次夜间券 17:00 起发售；22:00 闭园的日子分别推迟到 16:00 和 18:00。打算买傍晚票的话，第一件事就是看日历。
          </p>
          <p className={styles.bodyText}>
            交通很简单。官方交通页标明乘百合海鸥线到台场海滨公园站步行约 2 分钟，或乘临海线到东京电讯港站步行约 5 分钟。到台场海滨公园，从新桥约 13 分钟、从东京站经新桥约 23 分钟、从丰洲约 18 分钟；乘临海线从涩谷、新宿、池袋分别约 18、23、29 分钟。官方请游客乘坐公共交通。全部为 {CHECKED} 核实。{" "}
            <Link href="/guides/transport/tokyo-transportation" hrefLang="en" style={linkStyle}>
              东京交通攻略（英文）
            </Link>
            说明百合海鸥线和临海线怎样配合 IC 卡与周游券使用，而{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" hrefLang="en" style={linkStyle}>
              东京地铁通票（英文）
            </Link>
            这两条线路都不能使用，请特别注意。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>购票步骤</span>
          <h2 className={styles.sectionTitle}>东京JOYPOLIS门票怎么买</h2>
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
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看通票 →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="JOYPOLIS 门票订好了？出发前先准备手机上网。" />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>台场一日</span>
          <h2 className={styles.sectionTitle}>teamLab Planets 和 JOYPOLIS 可以安排在同一天吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可以：两者都在百合海鸥线上，上午去 Planets，15:00 起用傍晚通票玩 JOYPOLIS，天黑后到台场海岸。需要预约入场时段的只有 Planets。
          </p>
          <Table head={["时间", "行程", "门票"]} rows={comboRows.map((r) => [r.when, r.what, r.ticket])} />
          <p className={styles.bodyText} style={noteStyle}>
            最后核实：{CHECKED_ISO}。官方来源：{ext("https://tokyo-joypolis.com/ticket/", "东京JOYPOLIS票价")}；
            {ext("https://www.teamlab.art/e/planets/", "teamLab Planets 开放时间与交通")}及其
            {ext("https://teamlabplanets.dmm.com/en", "官方售票网站")}；{ext("https://www.tptc.co.jp/park/01_02", "台场海滨公园")}。teamLab 成人票价因日期与时段而异。游船请看{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise" hrefLang="en" style={linkStyle}>
              东京湾游船攻略（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Klook JOYPOLIS 通票 →
            </KlookLink>
            <KlookLink href={SUNSET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              东京湾日落游船 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>当天其他行程</span>
          <h2 className={styles.sectionTitle}>当天在台场还能做什么？</h2>
          <p className={styles.bodyText}>
            在里面玩 2 到 4 小时，一天还剩下大半，而且可以再次入园，所以 JOYPOLIS 可以作为行程中的一段，而不是整天的安排。最顺的搭配是海上：东京湾游船从台场海岸和不远的日之出码头出发，傍晚的航班和 15:00 买的傍晚通票时间刚好衔接。{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise" hrefLang="en" style={linkStyle}>
              东京湾游船攻略（英文）
            </Link>
            区分了用同一个搜索词出售、但完全不同的两种船，并附官方航班时间和价格。
          </p>
          <p className={styles.bodyText}>
            有一点值得更正，因为仍有人因此跑到东京另一头：<strong>teamLab Borderless 已经不在台场。</strong>它在台场闭馆后，迁到麻布台之丘重新开幕，所以 JOYPOLIS 加 teamLab 的一天，现在是两个不同的区域、两段电车路程。{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-borderless-tickets" style={linkStyle}>
              teamLab Borderless 门票攻略
            </Link>
            有目前的地点、指定时段和票价。东京另一个 teamLab，也就是 Planets，就在前往台场的百合海鸥线上，按 teamLab 官方信息，从新丰洲站 1A 出口步行 3 分钟；{" "}
            <Link href="/zh-cn/guides/attractions/teamlab-planets-tickets" style={linkStyle}>
              teamLab Planets 门票攻略
            </Link>
            整理了入场时段和官方售票网站。同样，曾和 JOYPOLIS 同在 DECKS 大楼、常一起以套票出售的东京杜莎夫人蜡像馆，其官网说明已于 2026 年 9 月 30 日停止营业，所以这个组合已经不存在。
          </p>
          <p className={styles.bodyText}>
            如果要把 JOYPOLIS 排进较短的行程，{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" hrefLang="en" style={linkStyle}>
              东京 3 天行程（英文）
            </Link>
            示范了怎样在不挤掉两个真正需要指定时段的景点的前提下，安排一个海岸下午；{" "}
            <Link href="/zh-cn/guides/attractions/things-to-do-tokyo" style={linkStyle}>
              东京必玩清单
            </Link>
            则把东京景点分成需要提前几周购票的和可以直接去的。JOYPOLIS 明确属于后者。天气好、想出城一天时，可以看<Link href="/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>东京出发富士山一日游</Link>的价格与路线。
          </p>
        </section>

        <KlookTripPrep
          label="同一天一起预订"
          heading="台场一日行程还值得预订什么？"
          intro="在里面玩 2 到 4 小时，晚上还空着，最适合的安排就是海上。"
          items={tripPrepItems}
        />

        <EsimCtaBottom />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="东京JOYPOLIS门票常见问题" />

        <KlookTourPicks
          heading="台场一日行程的其余时间"
          intro="两项从台场和日之出一侧出航的东京湾游船，加上市区观光巴士，适合 JOYPOLIS 前后的时段。Klook 价格因日期而异，请打开商品页确认计划日期的价格和上船地点。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/legoland-japan-tickets", title: "日本乐高乐园门票（2026）：价格、营业时间与值不值得（英文）" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "吉卜力公园门票（2026）：价格、开售时间与海外购票（英文）" },
            { href: "/zh-cn/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 门票：票价、开放时间与购票方式" },
            { href: "/guides/attractions/tokyo-bay-cruise", title: "东京湾游船（2026）：屋形船与 Symphony 号、时间与价格（英文）" },
            { href: "/zh-cn/guides/attractions/teamlab-borderless-tickets", title: "teamLab Borderless 门票：票价、购票方式与入场时段" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "三丽鸥彩虹乐园门票 2026：价格与购票（英文）" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "富士急乐园门票（2026）：一日券价格与交通（英文）" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "东京 3 天行程（2026）：买什么票、按什么顺序（英文）" },
            { href: "/zh-cn/guides/attractions/things-to-do-tokyo", title: "东京必玩清单：哪些要提前购票、哪些可以直接去" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "东京地铁通票（2026）：24、48、72 小时（英文）" },
            { href: "/guides/transport/tokyo-transportation", title: "东京交通攻略（2026）：电车、地铁与 IC 卡（英文）" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>买合适的票，而不是第一眼看到的票</h2>
            <p className={styles.ctaBannerDesc}>
              这里不用指定日期，也不会售罄，唯一要决定的是四种产品中买哪一种。Klook 商品页可以用中文界面结账、接受日本境外发行的银行卡，并提供入口用的二维码；付款前请确认计划入园日期显示的取消期限。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看 JOYPOLIS 通票 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
