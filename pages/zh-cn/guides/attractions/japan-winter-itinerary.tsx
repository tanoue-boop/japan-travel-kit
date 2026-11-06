import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import {
  type KlookTripPrepItem,
    dotonboriCityCruise,
  galaNaebaSkiDayTripTokyo,
  galaYuzawaLiftTicket,
  hakubaHapponeBusLiftRental,
  hakubaSkiResortDayTourTokyo,
  hanedaLimousineBus,
  hokurikuArchPass,
  japanWinterStayAreas,
  jrEastSouthHokkaidoPass,
  jrHarukaUrl,
  kanazawaGeishaKenrokuenCastleDayTour,
  kanazawaKenrokuenHigashiChayaDayTour,
  klookEsim,
  kyotoHighlightBusTour,
  kyotoKimonoYumeyakata,
  kyotoNaraKiyomizuTour,
  lakeShikotsuIceFestivalHalfDayTour,
  nankaiRapitUrl,
  naritaExpressRoundTripUrl,
  naritaLimousineBus,
  newChitoseSapporoSharedTransfer,
  nisekoResortShuttleBus,
  nisekoSkiSnowboardRental,
  osakaAmazingPass,
  otaruSnowParkDayTour,
  rusutsuResortShuttleBus,
  sapporoSnowParkHalfDayTour,
  shibuyaSkyTicketUrl,
  shinkansenTokyoKanazawa,
  shinkansenTokyoKyoto,
  shirakawagoLightUpTakayamaDayTour,
  shirakawagoLineBusTicket,
  shirakawagoTakayamaKanazawaDayTour,
  takayamaShirakawagoGokayamaUnescoTour,
  teamlabBotanicalGardenOsakaTicket,
  teamlabPlanetsTicketUrl,
  tokyoMegaIllumiTicket,
  tokyoNightTourAkihabaraShibuya,
  tokyoOpenTopBusSightseeing,
  tokyoSubwayTicket,
  yomiurilandTicket,
} from "../../../../lib/klook-links";
import { asahiyamaBieiHighlightsTour } from "../../../../lib/klook-links-winter-hokkaido";
import { jrPassWholeJapanCurrent, shirakawagoLightUp2027NagoyaTour } from "../../../../lib/klook-links-winter-hub";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { seoTags } from "../../../../components/IntlSeo";
import {
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
} from "../../../../components/IntlChrome";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

// Mirrors the English guide (pages/guides/attractions/japan-winter-itinerary.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/japan-winter-itinerary";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "日本冬季行程" }];

const CHECKED = dateLabel("2026-10-28", LOCALE);
const REREAD = dateLabel("2026-11-06", LOCALE);

const sameTripItems: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "冬天是计划会当天改变的季节：电车因雪暂停、索道因风关闭，这些通知都发到手机，不会发到柜台。",
  },
  {
    label: "成田机场利木津巴士",
    ctaLabel: "查看成田巴士 →",
    url: klookFor(naritaLimousineBus.url, LOCALE),
    why: "单程，因为这条路线从关西回国。行李很大或带冬装、酒店又不在车站旁时，选这种到达方式。",
  },
  {
    label: "羽田机场利木津巴士",
    ctaLabel: "查看羽田巴士 →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "羽田出发同样买单程，停靠站有新宿和池袋，在下午四点半就天黑的第 1 天很实用。",
  },
  {
    label: "JR 北陆拱形周游券（7 天）",
    ctaLabel: "查看北陆拱形周游券 →",
    url: klookFor(hokurikuArchPass.url, LOCALE),
    why: "真正符合这份行程形状的票券：连续七天覆盖东京出发的北陆新干线和终点的关西地区。不含东海道新干线，所以只适合去程和回程走不同路线。",
  },
  {
    label: "JAPAN RAIL PASS（7、14 或 21 天）",
    ctaLabel: "在 Klook 查看 JR Pass →",
    url: klookFor(jrPassWholeJapanCurrent.url, LOCALE),
    why: "购买前请用这条路线算一次。东京 → 金泽 → 高山 → 京都 → 大阪的 12 天旅行有两段长途和一段特急，不一定超过周游券价格；JR Pass 攻略有可用自己路段计算的工具。",
  },
  {
    label: "东京地铁票（24／48／72 小时）",
    ctaLabel: "查看地铁票 →",
    url: klookFor(tokyoSubwayTicket.url, LOCALE),
    why: "前段的东京日子都坐东京地铁和都营线，灯饰路线丸之内、六本木、惠比寿也在这些线上，不是山手线。此票不含 JR 和山手线，这是最常被误解的地方。",
  },
];

type Stop = {
  time: string;
  place: string;
    allow: string;
  getting: string;
  booking: string;
};

type Pick = { label: string; url: string };

type Day = {
  n: number;
  label: string;
  heading: string;
  intro: string;
  stops: Stop[];
  book: ReactNode;
  picks: Pick[];
};

const days: Day[] = [
  {
    n: 1,
    label: "第 1 天",
    heading: "第 1 天：东京，在黑暗中从机场进市区",
    intro:
      "冬天让这一天有一个具体的改变：下午四点半左右就天黑了，多数行程排在到达日的观光根本做不到。请规划交通、入住，再走走一个亮灯的街区。这不算妥协，东京的灯饰季 11 月初就开始了，而灯光最美的时段正好是你到达的时间。",
    stops: [
      {
        time: "到达后",
        place: "入境、取行李、手机上网",
        allow: "1–1.5 小时",
        getting: "n/a",
        booking: "出发前激活 eSIM，不用领取，也不用在寒冷的航站楼排柜台",
      },
      {
        time: "下午或傍晚",
        place: "机场到东京据点",
        allow: "按机场和据点 40 分钟到 1.5 小时",
        getting: "成田特快、京成 Skyliner 或利木津巴士；羽田坐京急或单轨电车",
        booking: "值得预订：有行李空间的对号座，而且很暖和",
      },
      {
        time: "傍晚前",
        place: "办入住、放行李",
        allow: "1 小时",
        getting: "选对据点的话从车站步行",
        booking: "东京四晚，提前订好",
      },
      {
        time: "晚上",
        place: "住宿周边的夜晚：新宿回忆横丁、浅草仲见世，或住东京站的话看丸之内灯饰",
        allow: "2–3 小时",
        getting: "步行",
        booking: "不用，街头灯饰免费",
      },
    ],
    book: (
      <>
机场交通、流量，以及接下来三天东京的地铁票。成田路线完全看你住在城市哪一侧，<Link href="/zh-cn/guides/transport/tokyo-airport-transfer">东京机场交通攻略</Link>都有介绍；行李大或酒店不在车站旁时选利木津巴士，N&apos;EX 往返票只有从东京回国的版本才用得到回程。东京地铁票有个冬季特点：灯饰路线丸之内、六本木、惠比寿在东京地铁和都营线上，不是山手线，所以 12 月比其他月份更适合，此票不含 JR 和山手线。
</>
    ),
    picks: [
      { label: "成田特快往返 →", url: klookFor(naritaExpressRoundTripUrl, LOCALE) },
      { label: "成田利木津巴士 →", url: klookFor(naritaLimousineBus.url, LOCALE) },
      { label: "羽田利木津巴士 →", url: klookFor(hanedaLimousineBus.url, LOCALE) },
      { label: "东京地铁票 →", url: klookFor(tokyoSubwayTicket.url, LOCALE) },
      { label: "查看 Klook eSIM →", url: klookFor(klookEsim.url, LOCALE) },
    ],
  },
  {
    n: 2,
    label: "第 2 天",
    heading: "第 2 天：白天东京东侧，晚上看灯饰",
    intro:
      "东京冬天唯一胜过夏天的是傍晚，所以从傍晚往回排一天。趁这个季节清爽干燥的空气逛浅草寺、仲见世和隅田川一带，天黑后看一处灯饰。免费的街头灯饰最让人难忘，而两处收费的则要提前决定。",
    stops: [
      {
        time: "上午",
        place: "浅草寺和仲见世",
        allow: "2 小时",
        getting: "银座线或浅草线到浅草，都可用地铁票",
        booking: "不用",
      },
      {
        time: "下午前段",
        place: "东京晴空塔，或隅田川畔和清澄",
        allow: "2 小时",
        getting: "浅草线两站到押上",
        booking: "展望台建议预约时段；河畔随时可去",
      },
      {
        time: "黄昏，约 16:30 起",
        place: "免费街头灯饰：丸之内（到 2 月 14 日）、六本木榉树坂（到 12 月 25 日）、惠比寿花园广场（到 2 月 28 日）",
        allow: "1.5–2 小时",
        getting: "地铁；丸之内从东京站步行",
        booking: "不用，免费也不需门票",
      },
      {
        time: "晚上",
        place: "如果想看单一场地而不是散步，选收费灯饰：大井赛马场的东京 Mega Illumi，或读卖乐园 Jewellumination",
        allow: "2–3 小时",
        getting: "东京单轨电车到大井竞马场前；读卖乐园坐京王线加巴士",
        booking: "建议，这些是门票，不是街道",
      },
    ],
    book: (
      <>
这个晚上免费的部分不用买票，<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">东京灯饰攻略（英文）</Link>列出各处的日期、时间、票价和出处。值得预订的是能走更多地方的版本：夜间导览步行，或行经整条灯饰路线的敞篷巴士。想看一处大型收费灯饰的话，东京 Mega Illumi 和读卖乐园都可预售。Mega Illumi 是赛马场改建暂停前的最后一季：官网显示 12 月 24 日到 1 月 1 日休息，最后一晚是 2027 年 1 月 10 日，所以 1 月下旬的旅行只能去读卖乐园。
</>
    ),
    picks: [
      { label: "东京夜间步行导览 →", url: klookFor(tokyoNightTourAkihabaraShibuya.url, LOCALE) },
      { label: "敞篷观光巴士 →", url: klookFor(tokyoOpenTopBusSightseeing.url, LOCALE) },
      { label: "东京 Mega Illumi 门票 →", url: klookFor(tokyoMegaIllumiTicket.url, LOCALE) },
      { label: "读卖乐园门票 →", url: klookFor(yomiurilandTicket.url, LOCALE) },
    ],
  },
  {
    n: 3,
    label: "第 3 天",
    heading: "第 3 天：雪之日，GALA 汤泽或白马当天往返",
    intro:
      "这是只有冬天才有的一天，排在第 3 天是因为有天气风险：放在前面，取消了还有三天可以调整。日本特别的是不需要滑雪假期也能滑一天：GALA 汤泽从东京站坐上越新干线不用换车，车站和缆车站是同一栋建筑。",
    stops: [
      {
        time: "一早",
        place: "从东京站到雪地",
        allow: "单程 1.5–2 小时",
        getting: "GALA 汤泽和苗场坐上越新干线；白马坐巴士或北陆线",
        booking: "跟团或套餐必须预订；不管怎样都建议订座",
      },
      {
        time: "上午后段到下午中段",
        place: "在雪道上，或只是看看也好",
        allow: "4–5 小时",
        getting: "GALA 从车站大楼坐缆车；白马从村内坐接驳车",
        booking: "租赁和雪票比电车还快卖完",
      },
      {
        time: "下午中段",
        place: "山脚的温泉，这是大家常忘记安排的部分",
        allow: "1 小时",
        getting: "步行",
        booking: "不用",
      },
      {
        time: "晚上",
        place: "晚餐前回到东京",
        allow: "2 小时",
        getting: "新干线或巴士",
        booking: "雪季周日晚上建议对号座",
      },
    ],
    book: (
      <>
先决定是要滑雪还是看雪，因为预订完全不同。要滑雪的话，巴士、雪票和装备的套餐比分开买值得，否则要用看不懂的语言排三次队。不滑雪或团体同行，包车一日覆盖 GALA 汤泽、苗场或白马，按车计价，只买 GALA 雪票也能玩半天雪橇再慢慢吃午餐。GALA 官方日历为 2026 年 12 月 19 日到 2027 年 5 月 5 日开放雪道，12 月 12 到 18 日仅观光运行，南区整季关闭；电车和雪票价格请看 <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">GALA 汤泽滑雪一日游攻略（英文）</Link>。如果想看雪而不是滑雪，<Link href="/zh-cn/guides/attractions/jigokudani-snow-monkey-tour">地狱谷雪猴行程攻略</Link>介绍长野一侧的冬季一日游，正好放在这个时段。出发前有件事要确认：旅行保险对雪道内和雪道外的处理完全不同，<Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en">滑雪旅行保险比较（英文）</Link>根据公开条款说明。
</>
    ),
    picks: [
      { label: "GALA 汤泽／苗场包车 →", url: klookFor(galaNaebaSkiDayTripTokyo.url, LOCALE) },
      { label: "东京出发白马一日游 →", url: klookFor(hakubaSkiResortDayTourTokyo.url, LOCALE) },
      { label: "八方尾根巴士加雪票加租赁 →", url: klookFor(hakubaHapponeBusLiftRental.url, LOCALE) },
      { label: "GALA 汤泽雪票 →", url: klookFor(galaYuzawaLiftTicket.url, LOCALE) },
    ],
  },
  {
    n: 4,
    label: "第 4 天",
    heading: "第 4 天：东京西侧，明治神宫、涩谷和一年中最清澈的夕阳",
    intro:
      "冬天是东京展望台真正值回票价的季节，因为寒冷干燥的空气才看得到富士山。这也是夕阳早到能排进一天之中而不是结尾的季节：12 月太阳四点半前就下山，所以可以看完夕阳再吃晚餐，不用二选一。",
    stops: [
      {
        time: "上午",
        place: "明治神宫和原宿一带",
        allow: "2 小时",
        getting: "山手线到原宿",
        booking: "不用，神宫境内免费",
      },
      {
        time: "下午前段",
        place: "丰洲的 teamLab Planets，或步行表参道和涩谷",
        allow: "2–3 小时",
        getting: "teamLab 坐百合海鸥线到新丰洲；其他步行",
        booking: "teamLab 必须，30 分钟一个入场时段，现场不售票",
      },
      {
        time: "日落",
        place: "SHIBUYA SKY",
        allow: "1–1.5 小时",
        getting: "车站上方的涩谷 Scramble Square 内",
        booking: "实际上必须，日落时段最先卖完",
      },
      {
        time: "晚上",
        place: "在涩谷或新宿吃晚餐，然后回去",
        allow: "2–3 小时",
        getting: "步行加山手线一站",
        booking: "不用",
      },
    ],
    book: (
      <>
两张指定时段的票，有期限的是展望台。SHIBUYA SKY 在日本时间 0:00 开售两周后的日期，热门冬季日期的日落时段最先卖完，<Link href="/guides/attractions/shibuya-sky-tickets" hrefLang="en">涩谷 SKY 门票攻略（英文）</Link>有两种价格和预订时间。teamLab Planets 是 30 分钟一个入场时段、现场不售票，请看 <Link href="/zh-cn/guides/attractions/teamlab-planets-tickets">teamLab Planets 攻略</Link>。两者都在室内或有遮蔽，如果第 3 天因雪取消，这天很适合调整。
</>
    ),
    picks: [
      { label: "SHIBUYA SKY 门票 →", url: klookFor(shibuyaSkyTicketUrl, LOCALE) },
      { label: "teamLab Planets 门票 →", url: klookFor(teamlabPlanetsTicketUrl, LOCALE) },
      { label: "东京地铁票 →", url: klookFor(tokyoSubwayTicket.url, LOCALE) },
    ],
  },
  {
    n: 5,
    label: "第 5 天",
    heading: "第 5 天：坐北陆新干线从东京到金泽",
    intro:
      "这段移动让这份行程成为真正的冬季行程。北陆新干线约两个半小时从太平洋侧穿到日本海侧，天气也跟着改变：金泽和后方的山区有东京很少见到的雪。松枝由绳索支撑、覆盖白雪的兼六园，是这条路线最核心的画面。",
    stops: [
      {
        time: "上午",
        place: "东京站到金泽",
        allow: "含走到站台 2.5–3 小时",
        getting: "北陆新干线，根据 JR 西日本 2 小时 28 分钟，不用换车",
        booking: "Kagayaki 必须：全车对号，没有现场直接坐的选项",
      },
      {
        time: "下午前段",
        place: "放好行李，到近江町市场吃午餐",
        allow: "1.5 小时",
        getting: "从车站坐巴士或短途出租车",
        booking: "不用",
      },
      {
        time: "下午",
        place: "兼六园和金泽城公园",
        allow: "2–3 小时",
        getting: "从站前坐金泽周游巴士",
        booking: "不用，现场购票",
      },
      {
        time: "晚上",
        place: "天黑后的东茶屋街",
        allow: "2 小时",
        getting: "从市场坐巴士或步行 25 分钟",
        booking: "不用",
      },
    ],
    book: (
      <>
电车，以及终点的两晚。要坐的是 <strong>Kagayaki</strong>，它有个特别的规定：全车对号，没有自由席，所以这段不能留到当天早上。<Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en">东京到金泽攻略（英文）</Link>有时间、座位等级和有自由席的 Hakutaka。周游券方面，全国版 JR Pass 很少适合这种旅行，<Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR Pass 攻略（英文）</Link>有计算工具；北陆拱形周游券则常常适合，因为它正好覆盖东京 → 金泽 → 关西，并刻意不含回程的东海道新干线。
</>
    ),
    picks: [
      { label: "东京 → 金泽新干线 →", url: klookFor(shinkansenTokyoKanazawa.url, LOCALE) },
      { label: "北陆拱形周游券 →", url: klookFor(hokurikuArchPass.url, LOCALE) },
      { label: "查看 JR Pass →", url: klookFor(jrPassWholeJapanCurrent.url, LOCALE) },
    ],
  },
  {
    n: 6,
    label: "第 6 天",
    heading: "第 6 天：金泽，庭园、茶屋街和市场",
    intro:
      "整天待在一座小城是奢侈，这份行程负担得起，因为两晚已经订好。金泽小巧，几乎都能直接入内参观，所以这是预订最少的一天，也最适合吸收其他地方因雪失去的一天。",
    stops: [
      {
        time: "上午",
        place: "一早再访兼六园，或金泽 21 世纪美术馆",
        allow: "2–3 小时",
        getting: "周游巴士",
        booking: "美术馆的收费展建议预订；庭园现场购票",
      },
      {
        time: "中午",
        place: "近江町市场海鲜午餐，这座市场最有名的就是冬天",
        allow: "1.5 小时",
        getting: "步行",
        booking: "不用，但吧台座位常客满",
      },
      {
        time: "下午",
        place: "长町武家屋敷和东茶屋街",
        allow: "2–3 小时",
        getting: "步行加一趟巴士",
        booking: "不用",
      },
      {
        time: "晚上",
        place: "留在金泽早点休息，明天一早要坐预订的巴士",
        allow: "2 小时",
        getting: "步行",
        booking: "如果还没订，就订明天的巴士座位",
      },
    ],
    book: (
      <>
只有两件事，其中一件是明天的。金泽导览一日把兼六园、东茶屋街和近江町市场并成一次预订，冬天下午很短，省下三段巴士很值得。重要的是明天出城的巴士：北陆铁道说明金泽到白川乡是全车对号，上车前必须预订，从金泽站西口出发 1 小时 15 分钟，乘车日一个月前开放订座。共同运营的浓飞巴士列出成人票价 2026 年 11 月 30 日前 ¥2,800、12 月 1 日起 ¥2,900；北陆铁道页面在 {REREAD} 核查时仍是 ¥2,800。这一侧没有现场乘车的备选，<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山与白川乡攻略（英文）</Link>有说明。
</>
    ),
    picks: [
      { label: "金泽导览一日（兼六园和东茶屋街）→", url: klookFor(kanazawaKenrokuenHigashiChayaDayTour.url, LOCALE) },
      { label: "金泽步行一日游 →", url: klookFor(kanazawaGeishaKenrokuenCastleDayTour.url, LOCALE) },
    ],
  },
  {
    n: 7,
    label: "第 7 天",
    heading: "第 7 天：金泽到白川乡再到高山",
    intro:
      "行程进入山区的一天，也是没有电车的一天：白川乡没有火车站，这个事实决定了这一带所有的计划。雪中的村落是大家 1、2 月而不是 4 月来的原因，合掌屋也是真的有人居住，不是布景。",
    stops: [
      {
        time: "上午",
        place: "金泽站西口到白川乡",
        allow: "1.5 小时",
        getting: "北陆铁道高速巴士，1 小时 15 分钟，2026 年 12 月 1 日起成人 ¥2,900",
        booking: "必须，全车对号，上车前要预订",
      },
      {
        time: "上午后段到下午中段",
        place: "荻町：合掌屋、合掌造民家园、上方的城山天守阁展望台",
        allow: "2–3 小时",
        getting: "步行；展望台要爬坡",
        booking: "村落不用；展望台冬季有另外的安排",
      },
      {
        time: "下午中段",
        place: "白川乡到高山",
        allow: "1 小时",
        getting: "浓飞巴士白川乡线，约 50 分钟，2026 年 12 月 1 日起成人 ¥2,900",
        booking: "部分班次标注需预约；如果当天行程靠这班车，两端都请订好",
      },
      {
        time: "晚上",
        place: "高山三町老街和飞驒牛晚餐",
        allow: "2–3 小时",
        getting: "从车站步行",
        booking: "旺季晚餐建议预订",
      },
    ],
    book: (
      <>
一个帮你完成移动的导览行程，或两张巴士票。金泽出发的商品是唯一能把你送到高山而不是送回金泽的，正好符合这段需要，时间 8 到 10 小时，有英语持证导游。自己走的话，上面是运营方官方票价，2026 年 12 月 1 日上调：金泽 → 白川乡 ¥2,900，再到高山约 50 分钟 ¥2,900，各由 ¥2,800 上调。两段都是民营高速巴士，任何 JR 周游券都不适用。
</>
    ),
    picks: [
      { label: "金泽出发白川乡和高山一日 →", url: klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE) },
      { label: "白川乡线巴士票 →", url: klookFor(shirakawagoLineBusTicket.url, LOCALE) },
    ],
  },
  {
    n: 8,
    label: "第 8 天",
    heading: "第 8 天：高山，若碰上四个日期之一就去白川乡亮灯",
    intro:
      "这是行程中唯一不能临时决定的晚上。白川乡冬季亮灯只有四个晚上：2027 年 1 月 11、17、24、31 日，每晚 17:30 到 19:30，由白川乡观光协会以完全提前预约加入场券的方式举办。公告说得很清楚：当天不售票，没票到现场也进不去。如果旅行不在这四天，这天就是高山之日，也很好。",
    stops: [
      {
        time: "上午",
        place: "宫川朝市和三町老街",
        allow: "2–3 小时",
        getting: "步行",
        booking: "不用",
      },
      {
        time: "中午",
        place: "飞驒民俗村（飞驒之里），不用坐巴士就能看雪屋顶村落",
        allow: "2 小时",
        getting: "从车站坐公交巴士",
        booking: "不用",
      },
      {
        time: "下午",
        place: "五箇山和白川乡导览一日，或在市区悠闲度过下午",
        allow: "导览版最长 7 小时 20 分钟",
        getting: "从车站旁的巴士总站坐浓飞巴士",
        booking: "建议",
      },
      {
        time: "17:30–19:30，仅 2027 年 1 月 11、17、24、31 日",
        place: "白川乡亮灯",
        allow: "根据浓飞巴士 2027 年时刻表，各路线 4 小时 40 分钟到 5 小时 35 分钟",
        getting: "高山出发的预约巴士，14:40 到 15:40 出发；这个活动没有不预约的去法",
        booking: "必须提前预订，当天完全不售票",
      },
    ],
    book: (
      <>
如果日期是这四天之一，请比旅行其他项目都先订。协会公布五种参加方式，{REREAD} 核查时有两种几乎已无法使用：村内住宿抽签已于 10 月 31 日截止，第一轮停车场预约售罄，第二轮 12 月 1 日 13:00 开放，五人以内 ¥7,000。旅行社行程 12 月 2 日 13:00 公布。不需要车也不需要住村内的方式是浓飞巴士从高山出发的亮灯巴士，11 月 2 日起四晚都开售：含户外博物馆 ¥13,000、含温泉 ¥14,000、含展望台 ¥16,000（唯一能到展望台的路线），只能通过日文网络系统预订。Klook 高山出发的亮灯一日游时间 5 到 5.5 小时，同样可选博物馆或展望台，但索引尚未显示 2027 年的日期，请在商品页确认你的日期。如果不是这四天，就改走五箇山一日游，加上相仓和民家园，<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山与白川乡攻略（英文）</Link>按出发地逐一说明。
</>
    ),
    picks: [
      { label: "高山出发白川乡亮灯一日 →", url: klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE) },
      { label: "白川乡和五箇山世界遗产一日 →", url: klookFor(takayamaShirakawagoGokayamaUnescoTour.url, LOCALE) },
    ],
  },
  {
    n: 9,
    label: "第 9 天",
    heading: "第 9 天：高山到京都，漫长的下山路",
    intro:
      "这是移动日，也是这条路线唯一真的花掉大半天的日子。高山本线特急沿河谷下到名古屋，再换东海道新干线，雪中很美，任何天气都慢。到达京都后看一座亮灯的寺院就好，不要想看三座。",
    stops: [
      {
        time: "上午",
        place: "坐特急沿飞驒河谷从高山到名古屋",
        allow: "大半个上午",
        getting: "高山本线特急，请订靠河一侧的座位",
        booking: "建议，单线铁路，班次有限",
      },
      {
        time: "中午",
        place: "名古屋到京都",
        allow: "电车 40 分钟到一小时",
        getting: "东海道新干线；Hikari 可用周游券，Nozomi 不行",
        booking: "旺季建议",
      },
      {
        time: "下午中段",
        place: "在京都站附近办入住，再步行到东本愿寺或东寺",
        allow: "2 小时",
        getting: "步行",
        booking: "不用",
      },
      {
        time: "晚上",
        place: "一处冬季夜间亮灯，京都在寒冷月份会点亮部分寺院",
        allow: "2 小时",
        getting: "市区巴士或地铁",
        booking: "请查寺院公告日期；多数现场售票",
      },
    ],
    book: (
      <>
这天没有什么需要通过我们购买，这正是要特别说明的：铁路就是一整天。如果持周游券，飞驒特急和东海道新干线 Hikari 都可坐，Nozomi 不行，到京都差约半小时，<Link href="/guides/transport/tokyo-to-kyoto" hrefLang="en">东京到京都攻略（英文）</Link>用同一条线说明。值得做的是订飞驒的座位：单线铁路班次少，在车厢连接处站两小时太浪费行程最美的风景。
</>
    ),
    picks: [
      { label: "查看这几段的 JR Pass →", url: klookFor(jrPassWholeJapanCurrent.url, LOCALE) },
      { label: "东京 ⇄ 京都新干线车票 →", url: klookFor(shinkansenTokyoKyoto.url, LOCALE) },
    ],
  },
  {
    n: 10,
    label: "第 10 天",
    heading: "第 10 天：寒冷中的京都，金阁寺、伏见稻荷和岚山",
    intro:
      "京都是冬天带来最多好处的城市，原因并不浪漫：新年周到梅花开之间人潮最少，著名景点几乎都能直接入内参观。屋顶覆雪的金阁寺人人想拍，却没人能计划：京都 1 月均温 4.8°C，穿错外套会很难受，却不足以保证下雪。",
    stops: [
      {
        time: "一早",
        place: "趁旅游大巴到达前去伏见稻荷",
        allow: "2 小时",
        getting: "JR 奈良线，京都站两站",
        booking: "不用，全天开放、免费，任何季节都以 07:00 最好",
      },
      {
        time: "上午后段",
        place: "金阁寺",
        allow: "1 小时",
        getting: "京都站坐市区巴士 101 或 205",
        booking: "不用，现场购票",
      },
      {
        time: "下午",
        place: "岚山：竹林、天龙寺、桂川畔",
        allow: "3 小时",
        getting: "JR 嵯峨野线到嵯峨岚山",
        booking: "竹林不用；嵯峨野小火车隆冬不运行，请不要以它安排一天",
      },
      {
        time: "晚上",
        place: "天黑后的祇园和先斗町",
        allow: "2–3 小时",
        getting: "巴士或京阪线",
        booking: "晚餐建议预订",
      },
    ],
    book: (
      <>
京都几乎不用订什么，城市攻略也这么说。预订换来的是解决巴士问题：一个导览一日连起金阁寺、伏见稻荷和岚山，省下三段市区巴士，在冬天短短的下午，这就是三个景点和两个的差别。和服租赁也值得预约而不是现场去，冬季方案有羽织。住哪里比订什么更重要：<Link href="/guides/attractions/where-to-stay-in-kyoto" hrefLang="en">京都住宿攻略（英文）</Link>用交通时间而不是气氛比较车站、市中心和岚山。
</>
    ),
    picks: [
      { label: "京都精华巴士一日 →", url: klookFor(kyotoHighlightBusTour.url, LOCALE) },
      { label: "京都和奈良导览一日 →", url: klookFor(kyotoNaraKiyomizuTour.url, LOCALE) },
      { label: "京都和服租赁 →", url: klookFor(kyotoKimonoYumeyakata.url, LOCALE) },
    ],
  },
  {
    n: 11,
    label: "第 11 天",
    heading: "第 11 天：京都到大阪，以及夜间点亮的庭园",
    intro:
      "JR 新快速三十分钟，旅行的气氛就变了：冬天的大阪是室内和夜晚的城市，很适合这个季节。要记下的是 teamLab 植物园大阪，因为它是只在夜间开放的户外场地，这段时间最后入场 20:30，要为它安排晚上，而不是硬塞进去。",
    stops: [
      {
        time: "上午",
        place: "京都到大阪，行李放酒店",
        allow: "含移动 1.5 小时",
        getting: "JR 新快速或阪急线，都约 30 分钟",
        booking: "不用",
      },
      {
        time: "中午",
        place: "大阪城，或黑门市场午餐",
        allow: "2–3 小时",
        getting: "御堂筋线和中央线",
        booking: "不用，都可直接入内",
      },
      {
        time: "下午",
        place: "道顿堀和心斋桥，或河川游船",
        allow: "2 小时",
        getting: "从难波步行",
        booking: "游船建议预订",
      },
      {
        time: "18:00 起",
        place: "teamLab 植物园大阪，长居",
        allow: "另加交通 1.5–2 小时",
        getting: "御堂筋线到长居（M26），3 号出口步行约 10 分钟",
        booking: "建议，成人比现场便宜 ¥200，现场可能售罄",
      },
    ],
    book: (
      <>
两件事，以及一张决定第一件要不要买的票。大阪周游卡覆盖 40 多处设施和其间的地铁，对排得满满的大阪一天很划算，但不含 teamLab 庭园，那是另一张票。teamLab 官方票价成人 ¥1,800、6 到 15 岁 ¥500，现场 ¥2,000 和 ¥600；<Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets" hrefLang="en">teamLab 植物园大阪攻略（英文）</Link>有按日期的时间、雨天规定和官方票可改期三次的说明。住宿方面，住在御堂筋线上，21:00 在长居结束也只要一班车，<Link href="/guides/attractions/where-to-stay-in-osaka" hrefLang="en">大阪住宿攻略（英文）</Link>有比较。
</>
    ),
    picks: [
      { label: "teamLab 植物园大阪 →", url: klookFor(teamlabBotanicalGardenOsakaTicket.url, LOCALE) },
      { label: "大阪周游卡 →", url: klookFor(osakaAmazingPass.url, LOCALE) },
      { label: "道顿堀河川游船 →", url: klookFor(dotonboriCityCruise.url, LOCALE) },
    ],
  },
  {
    n: 12,
    label: "第 12 天",
    heading: "第 12 天：从关西离开",
    intro:
      "离开当天有个冬季特有的警告：两百公里外的降雪也可能影响到这个早上，因为东海道和北陆线都连到关西路网。请比时刻表多留一小时，把机场交通提前订好，不要在站台上才想办法。",
    stops: [
      {
        time: "上午",
        place: "酒店一站之内剩下想去的地方",
        allow: "1–2 小时",
        getting: "步行",
        booking: "不用",
      },
      {
        time: "中午",
        place: "大阪到关西国际机场",
        allow: "从出门到登机口 1.5–2 小时",
        getting: "天王寺或新大阪坐 JR HARUKA，或难波坐南海 Rapi:t",
        booking: "建议，冬季周日有行李空间的对号座值得多花几百日元",
      },
      {
        time: "在机场",
        place: "如果有购物，到退税柜台",
        allow: "30–45 分钟",
        getting: "按航站楼指示",
        booking: "不用",
      },
    ],
    book: (
      <>
只有机场交通。选哪一个看你住哪里：HARUKA 从天王寺和新大阪出发，Rapi:t 从难波出发，<Link href="/guides/transport/haruka-vs-nankai-rapit" hrefLang="en">HARUKA 与南海 Rapi:t 比较（英文）</Link>把时间和价格并列。巴士和伊丹机场请看<Link href="/guides/transport/osaka-airport-transfer" hrefLang="en">大阪机场交通攻略（英文）</Link>。
</>
    ),
    picks: [
      { label: "JR HARUKA 车票 →", url: klookFor(jrHarukaUrl, LOCALE) },
      { label: "南海 Rapi:t 车票 →", url: klookFor(nankaiRapitUrl, LOCALE) },
    ],
  },
];

const baseRows = [
  { base: "东京", nights: "4", why: "两个城市日、一个雪地往返和灯饰夜晚，这是冬天胜过夏天的真正优势" },
  { base: "金泽", nights: "2", why: "雪中的兼六园，也是这一侧唯一有预约制白川乡巴士出发的据点" },
  { base: "高山", nights: "2", why: "老街，也是 1 月四个晚上浓飞巴士亮灯巴士的据点，不需要车也不需要住村内" },
  { base: "京都", nights: "2", why: "可直接入内参观的景点一年中人最少，几乎不用预订" },
  { base: "大阪", nights: "1", why: "室内和夜晚的城市，加上夜间限定的 teamLab 庭园，酒店楼下就是往关西机场的车" },
];

const tempRows = [
  { city: "东京", dec: "7.7°C (12.0 / 3.8)", jan: "5.4°C (9.8 / 1.2)", feb: "6.1°C (10.9 / 2.1)" },
  { city: "京都", dec: "7.2°C", jan: "4.8°C", feb: "5.4°C" },
  { city: "大阪", dec: "8.7°C (12.3 / 5.3)", jan: "6.2°C (9.7 / 3.0)", feb: "6.6°C (10.5 / 3.2)" },
  { city: "札幌", dec: "−0.9°C (2.0 / −4.0)", jan: "−3.2°C (−0.4 / −6.4)", feb: "−2.7°C (0.4 / −6.2)" },
];

const datedRows = [
  {
    event: "白川乡冬季亮灯（第 41 届）",
    when: "2027 年 1 月 11、17、24、31 日，每晚 17:30–19:30",
    rule: "完全提前预约加入场券。协会明确表示当天不售票，没预约到现场也进不去，并公布五种参加方式。村内住宿抽签已于 10 月 31 日截止，第二轮停车场 12 月 1 日 13:00 开放，浓飞巴士高山亮灯巴士四晚都在销售中",
    source: "白川乡观光协会；浓飞巴士",
  },
  {
    event: "札幌雪祭（第 77 届）",
    when: "2027 年 2 月 4–11 日，共八天",
    rule: "免费入场，大通会场（西 1 到西 11 丁目）和薄野会场（站前通南 4 到南 6 条）都不用票。卖光的是城市本身：札幌酒店和新千岁航班几个月前就满，这才是这个活动真正要订的",
    source: "札幌雪祭执行委员会",
  },
  {
    event: "小樽雪灯之路（第 29 届）",
    when: "2027 年 2 月 6–13 日，与札幌雪祭重叠",
    rule: "日期已定；小樽观光协会表示详情稍后公布，所以时间和会场待官方公布",
    source: "小樽观光协会；北海道官方旅游网站",
  },
  {
    event: "支笏湖冰涛节",
    when: "2027 年 1 月 30 日–2 月 23 日，每天 10:00–20:00，16:30–20:00 亮灯",
    rule: "需门票，小学生以下免费。北海道官方旅游网站没有列出成人票价，所以我们也不写",
    source: "北海道官方旅游网站",
  },
  {
    event: "滑雪与租赁",
    when: "二世谷预定 2026 年 11 月 28 日；GALA 汤泽雪道 2026 年 12 月 19 日起；白马开业日期待官方公布",
    rule: "巴士加雪票加装备的套餐按日期销售。租赁值得提前确定：当天早上店里没有你的鞋码就没有其他选择，不过 Klook 的八方尾根套餐是当天在度假村店领取装备",
    source: "Niseko United；GALA 汤泽；Hakuba Valley；Klook 商品",
  },
  {
    event: "teamLab 植物园大阪",
    when: "仅夜间开放，2027 年 1 月 31 日前最后入场 20:30",
    rule: "现场有当日票，但成人贵 ¥200，也可能售罄。官网票在入场当天 21:00 前可改期三次",
    source: "teamLab",
  },
];

const snowRows = [
  {
    place: "汤泽和苗场（新潟）",
    getting: "东京站坐上越新干线，不用换车，GALA 汤泽的车站和缆车站是同一栋建筑",
    season: "根据 GALA 官方日历雪道 2026 年 12 月 19 日到 2027 年 5 月 5 日；12 月 12–18 日仅观光运行",
    forWhom: "不用多住一晚，在东京行程中加入一个雪日",
  },
  {
    place: "白马（长野）",
    getting: "东京坐巴士，或北陆新干线到长野再换巴士",
    season: "根据 Hakuba Valley 季票预定 2026 年 12 月到 2027 年 5 月初；各雪场开业日期待官方公布",
    forWhom: "真正的滑雪，一张山谷通票玩四座雪场",
  },
  {
    place: "白川乡和高山（岐阜）",
    getting: "金泽或高山坐预约高速巴士；白川乡完全没有火车站",
    season: "1 月和 2 月积雪最深",
    forWhom: "雪屋顶村落的照片，不是滑雪",
  },
  {
    place: "二世谷和留寿都（北海道）",
    getting: "新千岁机场直达巴士，能放雪具",
    season: "Niseko United 预定四区 2026 年 11 月 28 日开放，按区域 2027 年 4 月 4 日到 5 月 5 日关闭",
    forWhom: "以雪而不是城市为主的旅行",
  },
  {
    place: "札幌和小樽（北海道）",
    getting: "飞新千岁，再坐电车或预约接送",
    season: "12、1、2 月地上都有雪，根据气象厅平年值光 1 月降雪就有 137 厘米",
    forWhom: "把雪当成城市体验，再加上 2 月的雪祭",
  },
];

const packRows = [
  { item: "真正的外套，而不是厚毛衣", why: "根据气象厅平年值，1 月平均最低东京 1.2°C、札幌 −6.4°C。每栋建筑和每趟电车暖气都很足，所以防风外壳加多层穿搭胜过一件厚重衣物" },
  { item: "防滑的鞋和备用袜子", why: "高山人行道或寺院小路上压实的雪，是这份行程唯一的危险，白川乡展望台还要爬坡" },
  { item: "手套和能盖住耳朵的东西", why: "这份计划的户外部分都在天黑后：灯饰、亮灯、teamLab 庭园，这时气温接近最低，而不是平均" },
  { item: "比你想的更少的衣服，加上投币洗衣计划", why: "冬装体积大，这条路线要换五次据点，对号座又有行李限制。日本酒店几乎都有投币洗衣机" },
  { item: "润唇膏和护手霜", why: "太平洋侧的冬天又冷又干，这正是东京展望台看得到富士山的原因，也是第 4 天手开始干裂的原因" },
  { item: "雪地本身不用带什么", why: "要滑雪就在度假村租。装备可在出发前预订，自带雪靴很少值得付行李费" },
];

const hokkaidoRows = [
  { leg: "第 1–4 天", plan: "东京，和上面完全相同，灯饰夜晚和雪日不变" },
  { leg: "第 5 天", plan: "羽田飞新千岁，或持 JR 东日本南北海道周游券坐东北和北海道新干线。预约接送进札幌" },
  { leg: "第 6–7 天", plan: "雪祭会场：大通西 1 到西 11 丁目、薄野站前通和 Tsudome 会场。全部免费入场，全在户外，平均最高 0.4°C" },
  { leg: "第 8 天", plan: "一日游：小樽和雪上乐园（小樽雪灯之路 2027 年 2 月 6–13 日），或在企鹅散步的季节去旭山动物园，或支笏湖冰涛节半天（2027 年 1 月 30 日–2 月 23 日）" },
  { leg: "第 9–11 天", plan: "坐能放雪具的机场巴士去二世谷或留寿都，或想两者都要就回东京走主要路线的金泽那一半" },
  { leg: "第 12 天", plan: "从新千岁离开，或回到东京。这个版本唯一的风险是 2 月下雪关闭机场，所以不要订当天最后一班" },
];

const faqItems = [
  {
    q: "日本冬天值得去吗？",
    a: `值得，而且有三个其他季节没有的理由。可直接入内的景点，也就是京都大部分和整个奈良公园，在新年周到梅花开之间人最少。太平洋侧空气干燥清澈，只有这时能稳定从东京展望台看到富士山。而夏天只是次要绕路的日本海侧成了主角：金泽兼六园和白川乡合掌村在雪中都更美。代价是日照。12 月下午四点半左右就天黑，观光时间变短，所以这份行程在东京每天都排了晚上的活动，而不是当成附加。`,
  },
  {
    q: "冬天去日本要带什么？",
    a: `防风外壳加多层穿搭、防滑的鞋、手套，以及比你想的少得多的行李。重要数字是日本气象厅 1991–2020 年平年值（核查日期：${CHECKED}）：1 月平均最低东京 1.2°C，月均温京都 4.8°C、大阪 6.2°C，平均最低札幌 −6.4°C。所以本州是穿大衣的天气，还不到探险级别，北海道则真的很冷。有三个实用重点：电车、商店和餐厅暖气都很足，一件脱不掉的厚衣服比三件薄的差。冬季旅行的户外部分几乎都在天黑后，气温接近最低。要滑雪就在度假村租，出发前就能预订。`,
  },
  {
    q: "日本 12 月、1 月、2 月有多冷？",
    a: `根据日本气象厅 1991–2020 年平年值，东京 12 月 7.7°C、1 月 5.4°C、2 月 6.1°C，1 月平均最高 9.8°C、最低 1.2°C。京都三个月都比东京低约一度：7.2°C、4.8°C、5.4°C。大阪高约一度：8.7°C、6.2°C、6.6°C。札幌完全是另一回事：−0.9°C、−3.2°C、−2.7°C，1 月平均最高在冰点以下 −0.4°C，光 1 月降雪就有 137 厘米。1 月是这些地方最冷的月份，2 月比 1 月略暖。核查日期：${CHECKED}。`,
  },
  {
    q: "在日本哪里看得到雪？",
    a: `通常不是东京、京都或大阪，这三座太平洋侧城市下雪是新闻，不是季节。雪在日本海侧和山区，离东京最近又可靠的是新潟汤泽：GALA 汤泽从东京站坐上越新干线不用换车，车站和缆车站是同一栋建筑，所以不用滑雪假期也能滑一天。长野白马也能当天往返，雪质更好。把雪当风景而不是运动的话，1、2 月的白川乡和高山就是这份行程的核心。北海道当然有雪：札幌 1 月降雪平年值 137 厘米。`,
  },
  {
    q: "冬季行程要提前预订吗？",
    a: `这份行程有两件事绝对要，其他比你想的少。白川乡亮灯 2027 年只有四个晚上（1 月 11、17、24、31 日，每晚 17:30–19:30），完全提前预约，协会公告写明当天不售入场券。金泽到白川乡高速巴士全车对号，北陆铁道要求上车前预订，没有现场备选。此外，北陆新干线 Kagayaki 完全没有自由席，滑雪租赁最先缺你的尺码，SHIBUYA SKY 日落时段在开售瞬间就卖完。其他几乎都能直接去：京都寺院、兼六园、东京免费灯饰、雪祭会场。`,
  },
  {
    q: "冬天去日本要几天？",
    a: "本页路线最少 10 天，不赶要 12 天，想加北海道和北陆两边要 14 天。冬天对短途特别不利，原因有二：白天短，同样的一天比 5 月能做的少；天气风险真实存在，没有余量的计划就没地方调整因雪取消的一天。只有一周的话，删高山和金泽而不是东京，改走东京、京都、大阪的一周，晚上加灯饰。有 10 天的话，10 天行程是同一路线，也放得下冬季计划。",
  },
  {
    q: "新干线下雪时会开吗？",
    a: `会，这是 2 月在日本旅行最让人安心的事之一。上越和东北线照常穿过发达国家中雪量最大的地区，配有洒水设备和防雪棚。真正会发生的是延误而不是停运，而且会扩散：新潟或岐阜的雪可能让几小时外的东海道线延误。实用原则是：当天有航班就留一小时缓冲，不要订关西或新千岁的最后一班，手机保持上网，延误和替代交通的通知都这样发来。`,
  },
  {
    q: "新年期间不适合去吗？",
    a: `这是冬天唯一要绕开而不是排进去的一周。约 12 月 29 日到 1 月 3 日，博物馆和许多餐厅休息，电车和新干线是全年最满，这份行程每座城市的房价都到最高。神社是例外，也是有人还是去的原因：初诣，也就是新年第一次参拜，在明治神宫和伏见稻荷很壮观，都免费。如果日期只能在这周，请在 30 天前开放预订时立刻订铁路座位，并把可直接入内的景点当成要预订的来看待。`,
  },
  {
    q: "这条冬季路线值得买 JR Pass 吗？",
    a: `全国版大概不值得，北陆拱形周游券则很可能值得。全国版要靠很多长途才回本，这条路线只有两段：东京到金泽，以及高山到京都那天。北陆拱形周游券连续七天覆盖东京到敦贺的北陆新干线和关西地区，刻意不含东海道新干线，正好符合从金泽出去、经京都大阪回来的旅行。两种都不含往白川乡的高速巴士，那是民营，请另外做预算。JR Pass 攻略有按自己路段计算的工具。`,
  },
  {
    q: "冬天可以带小孩走这份行程吗？",
    a: `大部分可以，要调整两处。第一是晚上：灯饰、白川乡亮灯和 teamLab 庭园都是天黑后的寒冷外出，浓飞巴士亮灯巴士最早 20:20 才回到高山，对小孩太晚。第二是第 9 天的移动日，大半天都在两趟车上，孩子小的话值得拆开或删掉。适合的是雪日，玩雪不需技术也不用雪票，北海道的雪上乐园半天就是为此设计。teamLab 植物园大阪也是全线最便宜的亲子票，6 到 15 岁 ¥500、学龄前免费，但商品说明提醒有闪光和大声响。`,
  },
];

const TITLE = "日本冬季行程（2027）：12 天路线逐日安排";
const DESC =
  "日本冬季行程 12 天怎么排：东京、金泽、白川乡、高山、京都和大阪，每天一张表，并附冬季活动日期、气温和该先预订的项目。";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function JapanWinterItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG[LOCALE] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

            <Breadcrumb trail={trail} />

            <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
更新于 {monthLabel(updated.iso, LOCALE)}
</p>
          <h1 className={styles.heroTitle}>
日本冬季行程：<br />12 天逐日安排
</h1>
          <p className={styles.heroSubtitle}>
东京、金泽、白川乡、高山、京都和大阪，加上日期固定的两个冬季活动，以及现场完全不卖票的那一个。
</p>
          <div className={styles.heroBadges}>
            {[`更新于 ${monthLabel(updated.iso, LOCALE)}`, "12 天每天一张表", "2027 年冬季活动日期", "官方气温"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
                <Disclosure />

                <WinterBookingTop
          heading={"日本冬季行程要先订什么？"}
          checkedIso="2026-11-06"
          deadline={
            <>
先订 1 月的亮灯：浓飞巴士高山出发四晚都开售了，当天不售票，下一轮停车场 12 月 1 日开放，请在 <strong>11 月 30 日</strong>前订好座位。如果旅行围绕 2 月 4–11 日的雪祭，酒店和机票也请同一天前确定。
</>
          }
          tours={[
            {
              title: "金泽出发白川乡和高山一日游",
              url: klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE),
              price: null,
              duration: "8–10 小时",
              departs: "金泽，可回金泽或单程到高山",
            },
            {
              title: "名古屋出发白川乡亮灯行程，2027 年四晚",
              url: klookFor(shirakawagoLightUp2027NagoyaTour.url, LOCALE),
              price: null,
              duration: "10–12 小时",
              departs: "名古屋，可选酒店接送",
            },
            {
              title: "白马滑雪一日游，四座雪场任选",
              url: klookFor(hakubaSkiResortDayTourTokyo.url, LOCALE),
              price: null,
              duration: "约 11 小时 20 分钟",
              departs: "东京，专车",
            },
          ]}
        />

                <section className={styles.bodySection}>
          <p className={styles.bodyText}>
这份<strong>日本冬季行程</strong>共<strong>十二天、五个据点</strong>（东京 4 晚、金泽 2 晚、高山 2 晚、京都 2 晚、大阪 1 晚），围绕冬天改变的三件事，而不是景点清单。主轴是根据 JR 西日本 <strong>2 小时 28 分钟</strong>的北陆新干线东京到金泽，再坐预约高速巴士进山，然后走东海道线下到关西。有两个日期固定不能改：<strong>白川乡冬季亮灯只有 2027 年 1 月 11、17、24、31 日四个晚上，每晚 17:30–19:30，主办方当天完全不售票</strong>；<strong>第 77 届札幌雪祭是 2027 年 2 月 4–11 日</strong>，免费入场。白天很短，12 月下午四点半左右就天黑，根据日本气象厅 1991–2020 年平年值，1 月均温东京 5.4°C、札幌 −3.2°C。下面的活动日期、气温和票价都附出处：活动日期和巴士票价于 {REREAD} 重新核查，气候平年值于 {CHECKED} 核查。
</p>
        </section>

                <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>
快速解答
</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
天数
</p>
                <p className={styles.verdictStatValue}>
12 天，5 个据点
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
先订
</p>
                <p className={styles.verdictStatValue}>
白川乡亮灯
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
最长路段
</p>
                <p className={styles.verdictStatValue}>
东京 → 金泽，2 小时 28 分钟
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
1 月均温
</p>
                <p className={styles.verdictStatValue}>
东京 5.4°C，札幌 −3.2°C
</p>
              </div>
            </div>
            <p className={styles.verdictText}>
<strong>要点：</strong>先确定有日期的：亮灯的晚上、金泽预约巴士、全车对号的 Kagayaki 和酒店；京都几乎不用订，旺季也大多可直接入内。
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink
                href={klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE)}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
              >
查看白川乡亮灯一日 →
</KlookLink>
              <KlookLink
                href={klookFor(hokurikuArchPass.url, LOCALE)}
                target="_blank"
                rel="sponsored noopener"
                className={styles.pickCta}
              >
查看北陆拱形周游券 →
</KlookLink>
            </div>
          </div>
        </div>

                <KlookTripPrep
          label={"同一趟旅行要订的"}
          heading={"出发前要订什么？"}
          intro={"按冬季旅行的重要顺序列出：传递天气通知的流量、东京两座机场的单程交通、真正符合这条路线的周游券、周游券的比较，以及灯饰路线所在的东京地铁票。"}
          items={sameTripItems}
        />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
架构
</span>
          <h2 className={styles.sectionTitle}>
日本冬天 12 天怎么分配？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
五个据点，不是八个，因为冬天白天短，1 月的移动日比 5 月代价更高。特别的选择是高山两晚，这正是让计划可行的关键：浓飞巴士在 1 月四个亮灯晚上从那里自营巴士，所以不需要车，也不需要住村内。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["据点", "晚数", "为什么列入"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {baseRows.map((row) => (
                    <tr key={row.base}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.base}</td>
                      <td className={styles.tdPrice}>{row.nights}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
如果旅行长度或季节不同，<Link href="/guides/attractions/japan-10-day-itinerary" hrefLang="en">日本 10 天行程（英文）</Link>和<Link href="/guides/attractions/japan-14-day-itinerary" hrefLang="en">日本 14 天行程（英文）</Link>走东京到京都大阪、不绕北陆，<Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" hrefLang="en">东京、京都、大阪 7 天行程（英文）</Link>则是一周版本。下面十二天每天都有一张表：时段、地点、预留时间、交通方式、是否要预订，下方是当天的商品。
</p>
        </section>

                {days.map((day) => (
          <section key={day.n} className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>{day.label}</span>
            <h2 className={styles.sectionTitle}>{day.heading}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{day.intro}</p>
            <div className={styles.tableWrap}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {["时段", "地点", "预留时间", "交通方式", "要预订吗？"].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {day.stops.map((row) => (
                      <tr key={row.place}>
                        <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
              <strong>
第 {day.n} 天要订什么。
</strong> {day.book}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              {day.picks.map((pick) => (
                <KlookLink
                  key={pick.url}
                  href={pick.url}
                  target="_blank"
                  rel="sponsored noopener"
                  className={styles.pickCta}
                >
                  {pick.label}
                </KlookLink>
              ))}
            </div>
          </section>
        ))}

        <p
          className={styles.bodyText}
          style={{ marginTop: "-1.5rem", marginBottom: "3.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}
        >
十二张表的「预留时间」是我们的规划估计，不是运营方数字。车程和票价是运营方官方：北陆新干线 2 小时 28 分钟出自 JR 西日本，转引自<Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>东京到金泽攻略（英文）</Link>；白川乡巴士票价和车程出自浓飞巴士和北陆铁道，于 {REREAD} 重新核查，完整情况请看<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>高山与白川乡攻略（英文）</Link>。
</p>

                <KlookStayAreas
          heading={"日本冬季旅行住哪里好？"}
          intro={"十二天五个据点，冬天比平常多一个条件：天黑后拖行李从车站要走多远。下面每项都是该区域的 Klook 酒店搜索，按计划实际使用的路线或巴士总站挑选。住宿攻略对东京、京都和大阪内部有更详细的比较。"}
          areas={japanWinterStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "雪日最省事的冬季据点：滑雪巴士和往箱根的小田急线从这座车站下方出发，山手线就在门口，方便灯饰夜晚。", area: "东京新宿" }, { why: "适合两次坐新干线离开东京的计划：往 GALA 汤泽的上越线和往金泽的北陆线都从下方出发，走出大楼就是丸之内灯饰。", area: "东京站／丸之内" }, { why: "北陆新干线终点的两晚，兼六园巴士和预约制白川乡巴士都从站前出发，这是旅行中最没有余量的一段。", area: "金泽" }, { why: "这条路线在山区过夜的地方，也是 1 月白川乡亮灯巴士的据点：浓飞巴士总站就在车站旁，19:30 结束后走回去就好，不用换车。", area: "高山站" }, { why: "飞驒和东海道列车到达的地方，也是 100 和 101 观光巴士的起点，还是离开当天清晨坐机场 HARUKA 的站台。", area: "京都站" }, { why: "御堂筋线、步行可到道顿堀和黑门市场，楼下是往关西机场的南海总站，也能直达南边的长居，那里的 teamLab 庭园 18:00 后才开放。", area: "大阪难波" }, { why: "2 月替换版的城市据点：到大通公园一站地铁或走一小段，雪祭会场在户外、2 月平均最高 0.4°C 时正需要这样。", area: "札幌站" }, { why: "只有以雪而不是城市为主的旅行才值得单独当据点：缆车就在门口，能放雪具的机场巴士从新千岁直达。", area: "二世谷" }] as Partial<typeof item>[])[i]))}
        />

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3rem" }}>
三座城市的攻略比搜索更深入：<Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en" style={{ color: "var(--red)", fontWeight: 600 }}>东京住宿攻略（英文）</Link>按路线和机场比较，<Link href="/guides/attractions/where-to-stay-in-kyoto" hrefLang="en" style={{ color: "var(--red)", fontWeight: 600 }}>京都住宿攻略（英文）</Link>按到寺院的时间，<Link href="/guides/attractions/where-to-stay-in-osaka" hrefLang="en" style={{ color: "var(--red)", fontWeight: 600 }}>大阪住宿攻略（英文）</Link>按酒店楼下的机场交通。这条路线上，金泽和高山值得直接付钱住车站旁，因为两班预约巴士都从车站旁出发，而且都很早。
</p>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
据点之间的移动
</span>
          <h2 className={styles.sectionTitle}>
据点之间怎么移动，周游券划算吗？
</h2>
          <p className={styles.bodyText}>
两段长途铁路、两段预约高速巴士和一个移动日。容易出错的不是长度，这里没有超过约三小时的路段，而是预约：北陆快车完全没有自由席，金泽侧往白川乡的巴士没预约上不了车。
</p>
          <ul className={styles.pickList}>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>东京 → 金泽，2 小时 28 分钟。</strong>JR 西日本的北陆新干线官方数字，不用换车。<strong>Kagayaki</strong> 是快车，全车对号（JR 西日本写作全車指定席），所以这段必须预订。Hakutaka 较慢，有自由席。详情请看<Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en">东京到金泽攻略（英文）</Link>。
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>金泽 → 白川乡，1 小时 15 分钟，2026 年 12 月 1 日起成人 ¥2,900。</strong>根据浓飞巴士票价表 11 月 30 日前 ¥2,800，从金泽站西口出发。全车对号，一个月前开放订座，北陆铁道说明上车前必须预订，这一侧没有现场备选。
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>白川乡 → 高山，约 50 分钟，2026 年 12 月 1 日起成人 ¥2,900。</strong>浓飞巴士白川乡线，11 月 30 日前 ¥2,800。时刻表上部分班次标注需预约，其余不对号，所以有现场座位，但数量有限，而且白川乡没有火车站，没有电车替代。
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>高山 → 京都，大半天。</strong>高山本线特急到名古屋，再坐东海道新干线。Hikari 可用周游券、Nozomi 不行，东京到京都差别是 2 小时 45 分钟对 2 小时 15 分钟，<Link href="/guides/transport/tokyo-to-kyoto" hrefLang="en">东京到京都攻略（英文）</Link>有计算。
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>京都 → 大阪，约 30 分钟。</strong>JR 新快速或阪急线。这份行程唯一不用规划的一段。
</span>
            </li>
          </ul>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
周游券方面，全国版 JR Pass 要靠长途回本，这条路线只有两段，所以请实际计算，不要凭感觉。<strong>北陆拱形周游券</strong>才符合这趟旅行的形状：连续七天覆盖东京到敦贺的北陆新干线和关西地区，刻意不含东海道新干线，所以只适合去回走不同路线。两者都不含民营的白川乡巴士。<Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR Pass 攻略（英文）</Link>有按自己路段计算的工具，<Link href="/guides/transport/shinkansen-guide" hrefLang="en">新干线攻略（英文）</Link>说明座位等级和预订。
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={klookFor(hokurikuArchPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
查看北陆拱形周游券 →
</KlookLink>
            <KlookLink href={klookFor(jrPassWholeJapanCurrent.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
查看 JAPAN RAIL PASS →
</KlookLink>
            <KlookLink href={klookFor(shinkansenTokyoKanazawa.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
东京 → 金泽车票 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
天气
</span>
          <h2 className={styles.sectionTitle}>
日本 12 月、1 月、2 月有多冷？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
本州是穿大衣的天气，北海道则真的冷；1 月到处都是最冷的月份，2 月略暖而不是更糟。下面是日本气象厅 1991–2020 年气候平年值：先列月均温，影响穿着的地方在括号内列平均最高和最低。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["城市", "12 月", "1 月", "2 月"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tempRows.map((row) => (
                    <tr key={row.city}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.city}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.dec}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.jan}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.feb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
月平均气温，括号内为平均最高和最低，出自日本气象厅 1991–2020 年东京、京都、大阪和札幌平年值，核查日期：{CHECKED}。同一表中札幌月降雪为 12 月 113 厘米、1 月 137 厘米、2 月 116 厘米。这些数字没显示两件事：本州日本海侧的金泽、高山、白川乡雪量远超过气温给人的印象；你在这份行程待在户外的时间大多在天黑后，更接近最低而非平均。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
雪
</span>
          <h2 className={styles.sectionTitle}>
在日本哪里看得到雪？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
通常不是东京、京都或大阪，这三座太平洋侧城市下雪是新闻，不是季节。雪在山区和日本海侧，有用的问题不是哪里最深，而是哪种雪适合你实际的旅行。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["地点", "交通方式", "雪季", "适合谁"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {snowRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.season}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.forWhom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
唯一不用多住一晚的是汤泽这边，所以放在这份计划的第 3 天。要滑雪而不只是看的话，最该先订的是装备而不是雪票，出发前也请确定保险，雪道内和雪道外在条款中完全不同，<Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en">滑雪旅行保险比较（英文）</Link>有说明。如果雪是旅行的全部，请跳过城市，看<Link href="/zh-cn/guides/attractions/niseko-ski-tours">二世谷滑雪攻略</Link>，内容覆盖接送、教练课和四大区域，根据 Niseko United 票价表 2026 年 12 月 24 日到 2027 年 2 月 28 日成人 All Mountain 一日票 ¥13,500。
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={klookFor(galaNaebaSkiDayTripTokyo.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
GALA 汤泽／苗场包车 →
</KlookLink>
            <KlookLink href={klookFor(hakubaHapponeBusLiftRental.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
白马巴士加雪票加租赁 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiSnowboardRental.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷雪具租赁 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
预订
</span>
          <h2 className={styles.sectionTitle}>
冬季行程要提前预订吗？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
这份行程有一件事的答案不是「建议」而是「否则就去不了」。白川乡亮灯一年四个晚上，完全提前预约，协会公告明确说当天不售入场券。清单上其他项目都只是程度问题。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["项目", "时间", "主办方实际要求", "出处"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datedRows.map((row) => (
                    <tr key={row.event}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.event}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rule}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
亮灯日期和当天不售票规定出自白川乡观光协会第 41 届公告，亮灯巴士出自浓飞巴士页面；雪祭日期和会场出自札幌雪祭第 77 届公告；小樽日期出自小樽观光协会和北海道官方旅游网站，该网站也列出支笏湖活动；滑雪日期出自 Niseko United、GALA 汤泽和 Hakuba Valley；teamLab 数字出自 teamLab 展览页面。均于 {REREAD} 核查。除各主办方公布的日期外没有任何假设，如果旅行在这些时段之外，请视为该行不适用，而不是大致适用。
</p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
从头开始的实际预订顺序：日期合适的话先订亮灯之夜，再订酒店、Kagayaki 座位、金泽巴士、滑雪租赁、两周前的 SHIBUYA SKY，其他在最后两周处理。
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink
              href={klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
白川乡亮灯一日 →
</KlookLink>
            <KlookLink
              href={klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
金泽出发白川乡一日 →
</KlookLink>
            <KlookLink
              href={klookFor(teamlabBotanicalGardenOsakaTicket.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
teamLab 植物园大阪 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
另一条冬季路线
</span>
          <h2 className={styles.sectionTitle}>
为了雪祭改去北海道会更好吗？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
如果旅行在 2 月上半，请认真考虑。<strong>第 77 届札幌雪祭于 2027 年 2 月 4 到 11 日举行</strong>，有三个会场：大通西 1 到西 11 丁目、薄野站前通南 4 到南 6 条和 Tsudome 会场，全部免费入场，和白川乡亮灯正好相反。雪祭需要的是酒店和机票，都是几个月前就满。<Link href="/zh-cn/guides/attractions/sapporo-snow-festival-tours">札幌雪祭攻略</Link>有完整的会场和行程。这个版本保留东京，换掉北陆段。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["天数", "改做什么"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hokkaidoRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
雪祭日期和会场范围出自札幌雪祭执行委员会第 77 届公告，核查日期：{REREAD}；同一公告新增 2027 年 2 月 12 到 14 日的札幌 Snow Sports Park 为相关活动。札幌 2 月平均最高 0.4°C 和 1 月降雪平年值 137 厘米是上面的气象厅数字。有一点要说明：往北海道的铁路很长，多数游客都坐飞机，JR 东日本南北海道周游券只有本来就会常坐 JR 东日本时才值得。
</p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
第 8 天的一日游，小樽雪灯之路在 2027 年 2 月 6 到 13 日，所以雪祭旅行可以两者都看；<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">札幌出发小樽一日游攻略（英文）</Link>有电车和运河小镇的介绍。如果想把整趟旅行都给北海道，<Link href="/zh-cn/guides/attractions/hokkaido-7-day-itinerary">北海道 7 日游</Link>是留在岛上的一周。
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={klookFor(newChitoseSapporoSharedTransfer.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
新千岁 → 札幌接送 →
</KlookLink>
            <KlookLink href={klookFor(sapporoSnowParkHalfDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
札幌雪上乐园半日 →
</KlookLink>
            <KlookLink href={klookFor(jrEastSouthHokkaidoPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
JR 东日本南北海道周游券 →
</KlookLink>
            <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷机场接驳 →
</KlookLink>
            <KlookLink href={klookFor(rusutsuResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
留寿都机场接驳 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
行李
</span>
          <h2 className={styles.sectionTitle}>
冬天去日本要带什么？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
比你想的少，而且要多层而不是厚重。原因不是户外气温，而是室内：这份行程的电车、商店和餐厅暖气都很足，一件脱不掉的厚衣服比三件能脱的薄衣服差。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["项目", "在这条路线为什么需要"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {packRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"如果加上北海道的冬季一日游"}
          intro={"四个札幌出发的冬季行程，用于这趟旅行的 2 月版本。全部是季节商品而不是全年商品，所以值得提前打开，不要等到当天。"}
          tours={[withKlookLocale(otaruSnowParkDayTour, LOCALE, { title: "小樽、白色恋人公园与雪上乐园一日游", desc: "结合小樽运河、蒸汽时钟、白色恋人公园和玩雪的北海道一日游" }), withKlookLocale(asahiyamaBieiHighlightsTour, LOCALE, { title: "札幌出发旭山动物园、美瑛青池与精灵露台一日游", desc: "从札幌前往旭川动物园、美瑛青池和精灵露台的一日巴士，有多条路线，冬季可加购雪地摩托" }), withKlookLocale(lakeShikotsuIceFestivalHalfDayTour, LOCALE, { title: "札幌出发支笏湖冰涛节半日游", desc: "冬季限定的支笏湖冰涛节，从札幌出发的导览半日，是北海道这一侧另一个 2 月活动" }), withKlookLocale(sapporoSnowParkHalfDayTour, LOCALE, { title: "Wonderland Sapporo 雪上乐园半日游", desc: "市郊雪上乐园半日，含酒店接送和成吉思汗烤肉，是为不带雪具的游客设计的版本" })]}
        />

                <Related items={[{ href: "/guides/attractions/okinawa-day-tours", title: "那霸出发冲绳一日游：北部与南部比较（2026） （英文）" }, { href: "/zh-cn/guides/attractions/jigokudani-snow-monkey-tour", title: "东京出发雪猴行程：地狱谷野猿公苑攻略（2027）" }, { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "东京出发 GALA 汤泽滑雪一日游：71 分钟，缆车 ¥8,000 （英文）" }, { href: "/zh-cn/guides/attractions/niseko-ski-tours", title: "二世谷滑雪（2027）：接送、教练课与四大区域" }, { href: "/zh-cn/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 日游：每日路线" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出发小樽一日游（2027）：¥800，JR 33 分钟 （英文）" }, { href: "/zh-cn/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭（2027）：2/4–11 三会场免费，该订什么" }, { href: "/guides/attractions/japan-10-day-itinerary", title: "日本 10 天行程（2026）：逐日安排 （英文）" }, { href: "/guides/attractions/japan-14-day-itinerary", title: "日本 14 天行程（2026）：逐日安排 （英文）" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山与白川乡行程（2027）：该从哪里出发 （英文）" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "东京灯饰 2026-27：日期、时间与免费景点 （英文）" }, { href: "/guides/transport/tokyo-to-kanazawa", title: "东京到金泽（2026）：Kagayaki 时刻、座位与周游券 （英文）" }, { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略 2026：价格、是否划算与购买方式 （英文）" }, { href: "/guides/money/japan-ski-travel-insurance", title: "滑雪旅行保险比较：雪道外、救援费用与保障范围 （英文）" }, { href: "/guides/attractions/where-to-stay-in-tokyo", title: "东京住宿攻略（2026）：按路线和机场比较 （英文）" }, { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab 植物园大阪门票：价格与时间 （英文）" }, { href: "/zh-cn/guides/attractions", title: "更多日本景点 →" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
先确定有日期的项目
</h2>
            <p className={styles.ctaBannerDesc}>
白川乡亮灯只有 2027 年 1 月的四个晚上，现场什么都不卖；金泽巴士没预约上不了车；Kagayaki 没有自由席。这份行程其他都可以等。
</p>
            <div className={styles.pickCtaRow}>
              <KlookLink
                href={klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE)}
                target="_blank"
                rel="sponsored noopener"
                className={styles.ctaBannerBtn}
              >
查看白川乡亮灯一日 →
</KlookLink>
              <KlookLink href={klookFor(hokurikuArchPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
查看北陆拱形周游券 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
