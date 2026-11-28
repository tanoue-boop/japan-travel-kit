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
import NextBookingBlock from "../../../../components/NextBookingBlock";
import {
  jrHarukaUrl,
  kaiyukanLegolandCombo,
  kaiyukanNifrelCombo,
  kaiyukanSameDayCards,
  kaiyukanSameDayPrep,
  osakaAmazingPassKaiyukanCombo,
  osakaAquariumKaiyukanTicket,
  osakaMetroDayPass,
  osakaPrivateWalkingTour,
  osakaSightsHighRatePrep,
  osakaSkyVistaHalfDayBusTour,
  santaMariaDayCruise,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/osaka-aquarium-kaiyukan-tickets) section by
// section as of 2026-11-28 (task-jtk-20261128-TR01): same sections, tables, FAQ and Klook CTAs in
// the same places. Every figure, date and source is the English page's; nothing is added. Title
// term: 海游馆门票 — the Simplified form of the aquarium's name with 门票, as Simplified results
// write it (大阪海游馆 门票 / 票价 on gltjp zh-hans, enjoy-osaka-kyoto-kobe zh-Hans, bring-you
// zh-hans). The pass is 大阪周游卡, as on the other Simplified Osaka pages.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/osaka-aquarium-kaiyukan-tickets";
const TITLE = "大阪海游馆门票 2026：票价、入场时段与最佳时间";
const H1 = "大阪海游馆门票 2026：票价与最佳参观时间";
const DESC =
  "海游馆门票成人按日期 ¥2,700–3,200、中小学生 ¥1,400–1,650。电子票约 30 天前开售并指定时段，不能再入馆。";

const CHECKED_ISO = "2026-11-19";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
/** The 15-minute entry unit and the 10:00 / 20:00 hours pattern: last read on this date. */
const SET_CHECKED = dateLabel("2026-10-22", LOCALE);
const BANDS_CHECKED_ISO = "2026-11-23";

const OFFICIAL = {
  bands: "https://www.kaiyukan.com/info/group/",
  ticket: "https://www.kaiyukan.com/info/ticket/",
  calendar: "https://www.kaiyukan.com/info/ticket/kaiyukan/",
  night: "https://www.kaiyukan.com/program/night/",
  harbor: "https://www.kaiyukan.com/thv/general/",
  captainLine: "https://www.kaiyukan.com/thv/captline/",
  santaMaria: "https://suijo-bus.osaka/intro/santamaria/",
  amazingPass: "https://osaka-amazing-pass.com/en/service_free.html",
};

const TICKET_URL = klookFor(osakaAquariumKaiyukanTicket.url, LOCALE);
const PASS_COMBO_URL = klookFor(osakaAmazingPassKaiyukanCombo.url, LOCALE);
const LEGO_COMBO_URL = klookFor(kaiyukanLegolandCombo.url, LOCALE);
const NIFREL_COMBO_URL = klookFor(kaiyukanNifrelCombo.url, LOCALE);
const SANTA_MARIA_URL = klookFor(santaMariaDayCruise.url, LOCALE);
const HARUKA_URL = klookFor(jrHarukaUrl, LOCALE);
const METRO_PASS_URL = klookFor(osakaMetroDayPass.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  {
    ticket: "首选：入馆电子票（指定日期与时段）",
    who: "成人：高中生或 16 岁以上",
    price: "¥2,700–¥3,200",
    what: "票价按日期而定，电子票约 30 天前开售。官方预约说明：票价 ¥3,200 的日子只能预约 15:00 以后入场，¥3,500 的日子不接受预约",
  },
  {
    ticket: "入馆门票",
    who: "儿童：小学生与初中生",
    price: "¥1,400–¥1,650",
    what: "在整个价格区间内约为成人票价的一半",
  },
  {
    ticket: "入馆门票",
    who: "幼儿：3 岁以上",
    price: "¥700–¥800",
    what: "成人票价的四分之一",
  },
  {
    ticket: "入馆门票",
    who: "2 岁及以下",
    price: "免费",
    what: "不需要门票",
  },
  {
    ticket: "入馆门票，残障优惠",
    who: "持残障证明者与 1 名陪同者",
    price: "上述票价的一半",
    what: "残障手册、Mirairo ID 应用或 My Number Portal 都可作为证明，截图不可以",
  },
  {
    ticket: "海游馆 + 圣玛丽亚号白天航班套票",
    who: "成人／初中生／小学生",
    price: "¥4,200／¥2,900／¥2,150 起",
    what: "按最低入馆票价分开购买为 ¥4,700／¥3,400／¥2,400；游船运营方说明旺季套票价格可能调整",
  },
];

const timingRows = [
  {
    when: "最佳选择",
    official: "入馆费为根据需求按日期设定的浮动票价",
    means: "在价格日历上选票价较低的日子，最好是学校假期以外的平日，入场时段选下午三点前后以后",
  },
  {
    when: "最拥挤（票价最高）的日子",
    official: "成人 ¥3,200 的日子只能预约 15:00 以后入场；成人 ¥3,500 的日子不接受预约",
    means: "日历上的票价高就说明人多。这些日子请安排下午参观",
  },
  {
    when: "没买票直接前往",
    official: "售票处只卖当日票，从开馆卖到最后入馆；不一定能买到想要的时段，也可能需要等候",
    means: "改买约 30 天前开售的指定日期与时段电子票",
  },
  {
    when: "17:00 起",
    official: "夜间节目 17:00–20:00，最后入馆 19:00；时间随季节调整",
    means: "同一张门票，灯光和音乐换成夜间版本，是多数游客不会选的晚间时段",
  },
  {
    when: "参观一圈",
    official: "单向参观路线走一圈约 90–120 分钟；再入馆已于 2026 年 6 月 15 日停止",
    means: "馆内预留两小时，在入馆前或出馆后用餐，不要在中途",
  },
];

const nearbyRows = [
  {
    what: "最方便的搭配：圣玛丽亚号白天航班",
    time: "约 45 分钟；白天航班 11:00–16:00，每小时整点出航",
    price: "成人 ¥2,000、小学生 ¥1,000（每名成人可免费带 1 名学龄前儿童）",
    pass: "适用",
    note: "在水族馆旁的海游馆西码头上船。12 月 31 日及 1 月 12 日至 2 月 5 日停航；视天气和海况航行",
  },
  {
    what: "天保山大摩天轮（112.5 米）",
    time: "就在隔壁；平日 10:00–21:00，周末及节假日 10:00–22:00",
    price: "¥1,000（周游卡列出的普通票价）",
    pass: "适用",
    note: "运营方不同，所以没有海游馆 + 摩天轮套票。游船运营方另售摩天轮 + 圣玛丽亚号套票",
  },
  {
    what: "前往日本环球影城的 Captain Line 渡轮",
    time: "船程约 10 分钟；9:30–20:00，时刻表每月不同",
    price: "往返 ¥1,700（周游卡列出的普通票价）",
    pass: "适用",
    note: "环球城码头（Universal City Port）距 JR 梦咲线环球城站步行约 5 分钟。海游馆出售 Captain Line 套票",
  },
  {
    what: "大阪乐高探索中心（LEGOLAND Discovery Center Osaka）",
    time: "同一栋设施内；平日 10:00–18:00（最后入场 16:00），周末 10:00–19:00（最后入场 17:00）",
    price: "请见运营方网站",
    pass: "仅限指定日期，需提前预约",
    note: "不能只有成人或只有儿童入场。海游馆出售乐高套票",
  },
];

const factRows = [
  {
    item: "门票方式",
    value: "指定日期与时段入馆，票价按日期浮动；电子票原则上 30 天前开售",
    source: "kaiyukan.com/info/ticket/",
  },
  {
    item: "售票处",
    value: "只卖当日票，从开馆卖到最后入馆；想要的入场时段可能已售罄",
    source: "kaiyukan.com/info/ticket/",
  },
  {
    item: "最拥挤日子的规定",
    value: "成人 ¥3,200 的日子只能预约 15:00 以后入场；成人 ¥3,500 的日子不接受预约",
    source: "kaiyukan.com/info/group/",
  },
  {
    item: "夜间节目",
    value: "17:00–20:00，最后入馆 19:00；时间随季节调整",
    source: "kaiyukan.com/program/night/",
  },
  {
    item: "再入馆",
    value: "2026 年 6 月 15 日起停止，一张门票只能入馆一次",
    source: "kaiyukan.com/about/news/20564.html",
  },
  {
    item: "未满 3 岁",
    value: "2 岁及以下免费",
    source: "kaiyukan.com/info/ticket/kaiyukan/",
  },
  {
    item: "婴儿",
    value: "设有育婴室（尿布台、冲奶粉用热水机）和哺乳室",
    source: "kaiyukan.com/info/area/",
  },
  {
    item: "储物柜与轮椅",
    value: "入口附近、海游馆大厅和博物馆商店旁设有储物柜；轮椅可在服务台借用",
    source: "kaiyukan.com/info/area/",
  },
  {
    item: "交通",
    value: "大阪港站（中央线）1 号出口步行约 5 分钟；停车位约 1,000 个",
    source: "kaiyukan.com/info/access/",
  },
];

const whoFor = [
  {
    title: "这些情况买指定日期与时段的电子票",
    desc: `你在周末或假期前往，或者只要能提前安排行程，都建议购买。官方电子票会固定日期和入场时段，大约在参观日 30 天前开售；官方也提醒，在售票处买当日票不一定能进到想要的时段。${CHECKED} 确认。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
        <circle cx="12" cy="15" r="2.5" />
      </svg>
    ),
  },
  {
    title: "这些情况晚一点去",
    desc: `你想避开人潮，也想买到更便宜的票。17:00 起进入夜间节目，灯光和音乐会改变；20:00 闭馆的日子最后入馆为 19:00。成人票价最高 ¥3,200 的日子只接受 15:00 以后的预约，所以最拥挤的日子本来就会被安排到下午。${CHECKED} 确认。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "这些情况买套票",
    desc: "你这一天要逛的是整个天保山港湾区，而不只是水族馆。海游馆的官方套票可以加上圣玛丽亚号港湾游船、前往环球城的 Captain Line 渡轮，或隔壁的乐高探索中心。也请注意清单上没有的项目：天保山大摩天轮由其他公司运营，所以没有官方的水族馆 + 摩天轮门票。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15h18l-2 5H5z" />
        <path d="M12 3v9M12 3l6 3-6 3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "先在价格日历上查你的日期",
    desc: `海游馆采用浮动票价制（官方称“価格変動制”），入馆费根据需求按日期设定，没有固定的单一票价。成人价格区间为 ¥2,700 到 ¥3,200，官方另外说明了只接受 15:00 以后预约的 ¥3,200 票价，以及完全不接受预约的 ¥3,500 票价。适用哪一种，取决于你的日期。${CHECKED} 确认。`,
  },
  {
    title: "选好入场时段，而不只是日期",
    desc: `官方电子票是指定日期与时段的门票（${CHECKED} 确认），入场时段以 15 分钟为单位（${SET_CHECKED} 确认）。想避开人潮就要选好入场时段：官方让每个时段的入馆人数保持稳定，最拥挤的日子只接受 15:00 以后的预约。`,
  },
  {
    title: "大约 30 天前开始购票",
    desc: `官方表示电子票原则上在参观日 30 天前开售，售票处只卖当日票，从开馆卖到最后入馆。所以这里确实有购票期限：不用像东京需要指定时段的观景台那样在两周前半夜抢票，但也不是什么时候都能买到。${CHECKED} 确认。`,
  },
  {
    title: "想用中文界面或日本境外发行的银行卡付款，可以通过代售平台购票",
    desc: "官方电子票系统以日语为主。通过 Klook 购买，可以用中文界面以日本境外发行的银行卡付款，并拿到入场时扫描的二维码，套票和大阪周游卡组合产品也都在同一个地方。取消期限和是否指定日期因产品而异，付款前请确认。",
  },
  {
    title: "再入馆已经停止，请一次参观完",
    desc: `这是很多其他攻略还没更新的规定。海游馆在 2026 年 6 月 15 日停止再入馆，理由是希望让每个时段的入馆人数保持稳定。在天保山市场吃完午饭再回来逛第二圈的安排已经不可行：一张门票只能入馆一次。${CHECKED} 确认。`,
  },
];

/** The five questions in the FAQPage markup, as on the English page. */
const faqItems: FaqItem[] = [
  {
    q: "海游馆门票多少钱？",
    a: `海游馆门票成人（高中生或 16 岁以上）¥2,700–¥3,200，小学生与初中生 ¥1,400–¥1,650，3 岁以上幼儿 ¥700–¥800，2 岁及以下免费。水族馆采用浮动票价，具体金额在价格日历上按日期设定，越拥挤的日子越接近区间上限。持残障证明者和 1 名陪同者半价。海游馆 + 圣玛丽亚号游船套票成人 ¥4,200 起。${CHECKED} 在 kaiyukan.com 和 suijo-bus.osaka 确认。`,
  },
  {
    q: "大阪海游馆门票需要提前买吗？",
    a: `不是必须，但建议提前买。入馆需指定日期和时段；售票处只卖当日票，并提醒可能买不到想要的时段、也可能需要等候，而官方电子票会固定你的入场时段，大约在参观日 30 天前开售。票价最高的日子预约规定更严格：成人 ¥3,200 的日子只能预约 15:00 以后入场，¥3,500 的日子不接受预约。${CHECKED} 确认。`,
  },
  {
    q: "参观海游馆需要多长时间？",
    a: `水族馆表示单向参观路线走一圈约 90–120 分钟。路线先带你到顶层，再沿着水槽螺旋向下，途中会经过有鲸鲨的太平洋水槽，所以只需走一次。再入馆已于 2026 年 6 月 15 日停止，请把参观安排成连续的一段时间，再另外预留圣玛丽亚号游船（约 45 分钟）或隔壁摩天轮的时间。${CHECKED} 确认。`,
  },
  {
    q: "什么时候去海游馆最好？",
    a: `选价格日历上票价较低的平日，下午三点前后以后入场。官方没有公布拥挤预测，但票价根据需求设定，票价最高（¥3,200）的日子只接受 15:00 以后的预约，夜间节目为 17:00–20:00、最后入馆 19:00（时间随季节调整）。${CHECKED} 确认。`,
  },
  {
    q: "大阪周游卡可以进海游馆吗？",
    a: `不可以。${CHECKED} 确认的大阪周游卡合作设施清单里没有海游馆。周游卡（1 日券 ¥3,500）适用于旁边的三个设施：天保山大摩天轮、圣玛丽亚号白天航班，以及前往环球城码头的 Captain Line 渡轮，所以如果你在天保山这天也要乘坐这些，周游卡仍可能划算。Klook 也出售大阪周游卡 + 海游馆的组合产品，一次结账即可。`,
  },
];

/** Further questions shown on the page but kept out of the FAQPage markup. */
const moreFaqItems: FaqItem[] = [
  {
    q: "海游馆门票为什么每天价格不同？",
    a: `因为水族馆这样决定。海游馆表示引入浮动票价制（価格変動制），是为了根据需求设定“合理的价格”，让更多游客入馆。实际上，二月冷清的周二和黄金周的周六价格不同，任何第三方网页上的单一金额都不可能同时符合这两天。票价本身也反映拥挤程度：如果你的日期接近区间上限，当天人就会很多。引入理由和浮动票价说明于 ${CHECKED} 确认。`,
  },
  {
    q: "大阪海游馆的开放时间是几点到几点？",
    a: `按日期而不同。官方用日历公布开放时间，而不是固定时间表，并请游客自己确认参观日期，这也是最准确的建议。一般是 10:00 开馆、20:00 闭馆，最后入馆为闭馆前 1 小时，闭馆日是一月和二月的几天（${SET_CHECKED} 确认）。夜间节目页面写的是 17:00–20:00、最后入馆 19:00，时间随季节调整（${CHECKED} 确认）。安排一天的行程前，请先在日历上确认你的日期。`,
  },
  {
    q: "海游馆有投币储物柜吗？",
    a: `有，共三处：水族馆入口附近、海游馆大厅，以及博物馆商店附近。大厅和商店旁的储物柜没有门票也能使用，天保山市场和摩天轮下方也有储物柜。轮椅可在服务台借用。${CHECKED} 在 kaiyukan.com/info/area/ 确认。`,
  },
  {
    q: "年末年初海游馆门票会更贵吗？",
    a: `请在日历上查你的日期，因为 ${CHECKED} 确认的官方页面没有用文字列出 11 月到新年期间的票价，每天的金额只显示在价格日历上。官方公布的是高价日子的规定：成人 ¥3,200 的日子只接受 15:00 以后的预约，成人 ¥3,500 的日子完全不接受预约。如果你的日期在假期期间，请在电子票大约 30 天前开售时马上查询。`,
  },
  {
    q: "怎么去大阪海游馆？",
    a: `主要路线是乘大阪地铁中央线到大阪港站，官方站名为“大阪港駅（海遊館前）”，意思是“海游馆前的大阪港站”，从 1 号出口步行约 5 分钟。从日本环球影城那一侧，可以乘 Captain Line 渡轮直接到入口前的海游馆西码头。大阪市营巴士停靠“天保山 Harbor Village”站，南海巴士停靠“海游馆（天保山）”站，停车位约 1,000 个。以上都于 ${CHECKED} 在 kaiyukan.com/info/access/ 确认。`,
  },
  {
    q: "出去吃午饭后还能再进海游馆吗？",
    a: `不能，现在已经不行了，这也是多数攻略还写错的地方。海游馆宣布自 2026 年 6 月 15 日起停止再入馆，理由是希望让每个时段的入馆人数保持稳定，让游客能按自己的节奏观看展示。请在入馆前或出馆后用餐；多数人会在隔壁的天保山市场吃饭，入馆门票在那里还可以当作优惠券使用。${CHECKED} 确认。`,
  },
  {
    q: "海游馆可以和天保山摩天轮或圣玛丽亚号一起玩吗？",
    a: `部分可以，购票时这个区别很重要。水族馆出售三种官方套票：约 45 分钟环绕大阪港的复刻帆船圣玛丽亚号（成人套票 ¥4,200 起）、船程约 10 分钟前往环球城码头的 Captain Line 渡轮，以及同一栋设施内的大阪乐高探索中心。同在 Harbor Village、高 112.5 米的天保山大摩天轮不在清单上，由其他公司运营，所以没有官方的水族馆 + 摩天轮门票；摩天轮请当天购票，或使用适用于摩天轮的大阪周游卡。以上都于 ${CHECKED} 确认。`,
  },
  {
    q: "带小孩去海游馆值得吗？",
    a: `海游馆是大阪主要景点中对家庭比较友好的一个，需要注意的是实际安排，而不是好不好玩。未满 3 岁免费，3 岁以上 ¥700–800；参观路线是一条单向路线，不会迷路；鲸鲨所在的太平洋水槽和南极企鹅这些主要展示，正是小朋友想看的。馆内有带尿布台和冲奶粉用热水机的育婴室，还有哺乳室。需要提前安排的是：再入馆已经停止，参观必须一次完成；官方表示走一圈需要 90–120 分钟。确认的官方页面没有说明婴儿车规定，如果出发前需要知道，请在入口询问。票价和设施于 ${CHECKED} 确认。`,
  },
  {
    q: "大阪下雨天适合去海游馆吗？",
    a: "是最合适的选择之一，但有一个缺点。水族馆完全在室内，隔壁的天保山市场也有屋顶，所以下雨天在馆内完全不受影响；不过从大阪港站 1 号出口仍要步行 5 分钟，而最常搭配的圣玛丽亚号港湾游船和摩天轮，正是天保山行程中最受雨天影响的部分。圣玛丽亚号尤其要视天气和海况航行。如果天气预报不好，就只买入馆门票，把游船和摩天轮留到别的日子。",
  },
];

/** Simplified copy per English card, keyed by the card's kind (each kind appears once). */
const SAME_DAY_ZH: Record<string, Partial<KlookSameDayCard>> = {
  Cruise: {
    kind: "游船",
    label: "圣玛丽亚号白天航班",
    ctaLabel: "查看圣玛丽亚号游船 →",
    why: "从水族馆旁的码头出发，约 45 分钟环绕大阪港；白天航班每小时整点出航。",
  },
  Hotel: {
    kind: "酒店",
    label: "日本环球影城周边酒店（环球城）",
    ctaLabel: "查看环球城酒店 →",
    why: "乘 Captain Line 渡轮从环球城码头到水族馆门口约 10 分钟。",
  },
  Pass: {
    kind: "周游卡",
    label: "大阪周游卡（1 日券／2 日券）",
    ctaLabel: "查看大阪周游卡 →",
    why: "海游馆不能使用，但隔壁的天保山摩天轮、圣玛丽亚号和 Captain Line 都包含在内。",
  },
  Activity: {
    kind: "体验",
    label: "天保山大摩天轮",
    ctaLabel: "查看摩天轮 →",
    why: "高 112.5 米的摩天轮和水族馆在同一个天保山设施内，是港湾行程的另一半。",
  },
  "Food tour": {
    kind: "美食之旅",
    label: "道顿堀白天美食之旅",
    ctaLabel: "查看美食之旅 →",
    why: "行程时间为 11:00–14:00，可以排在乘中央线前往水族馆的下午时段之前。",
  },
  eSIM: {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "水族馆的指定时段电子票和去大阪港站的路线都在手机上，从机场开始就能上网会方便很多。",
  },
  "Airport train": {
    kind: "机场列车",
    label: "南海特急 Rapi:t 车票",
    ctaLabel: "查看 Rapi:t 车票 →",
    why: "关西机场和难波之间的指定席列车，用于大阪行程的抵达日或离开日。",
  },
};

const sameDayCards: KlookSameDayCard[] = kaiyukanSameDayCards.map((card) =>
  withKlookLocale(card, LOCALE, SAME_DAY_ZH[card.kind] ?? {}),
);

// The same-day cards under the main CTA leave the lower blocks, as on the English page.
const notInTopCards = (item: { url: string }) => !kaiyukanSameDayCards.some((c) => c.url === item.url);

// On the English page every item of kaiyukanSameDayPrep is also a same-day card, so this block
// renders its heading and intro with no lines, exactly as the English one does.
const sameDayPrepItems: KlookTripPrepItem[] = kaiyukanSameDayPrep
  .filter(notInTopCards)
  .map((item) => withKlookLocale(item, LOCALE));

const HIGH_RATE_ZH: Partial<KlookTripPrepItem>[] = [
  {
    label: "大阪城天守阁门票",
    ctaLabel: "查看大阪城门票 →",
    why: "可参观天守阁 8 个楼层和丰臣石垣馆，入口扫码入场。持有大阪周游卡就不用买，周游卡已包含大阪城。",
  },
  {
    label: "梅田蓝天大厦空中庭园观景台门票",
    ctaLabel: "查看梅田蓝天大厦门票 →",
    why: "双塔顶端高 173 米的环形屋顶观景台，从大阪站步行可达，适合晚上顺路前往。大阪周游卡也适用。",
  },
  {
    label: "大阪城、梅田蓝天大厦与道顿堀游船一日游",
    ctaLabel: "查看大阪一日游 →",
    why: "由导游带领，一天走完大阪城、梅田观景台和道顿堀的 Tombori River Cruise，路线已经安排好。",
  },
];

const highRateItems: KlookTripPrepItem[] = osakaSightsHighRatePrep.map((item, i) =>
  withKlookLocale(item, LOCALE, HIGH_RATE_ZH[i] ?? {}),
);

const tourPicks = [osakaSkyVistaHalfDayBusTour, osakaPrivateWalkingTour].filter(notInTopCards).map((tour) =>
  withKlookLocale(
    tour,
    LOCALE,
    tour.url === osakaSkyVistaHalfDayBusTour.url
      ? {
          title: "大阪 Sky Vista 双层观光巴士半日游",
          desc: "乘开顶双层巴士经过大阪城、道顿堀和通天阁的半日团体游",
        }
      : {
          title: "大阪私人半日／一日徒步导览",
          desc: "由英语或日语专属导游带领，按你想走的路线逛难波和心斋桥一带",
        },
  ),
);

const trail: Crumb[] = [...TRAIL_BASE["zh-cn"], { label: "大阪海游馆门票" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h || `blank-${i}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.86rem" }}>
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

export default function ZhCnOsakaAquariumKaiyukanTicketsPage({ updated }: { updated: PageUpdated }) {
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
            海游馆各年龄票价、官方透露的拥挤时段信号、走一圈要多久，以及在天保山可以一起安排的摩天轮、圣玛丽亚号游船和前往日本环球影城的渡轮。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "官方价格区间，附确认日期", "说明再入馆规定"].map((t) => (
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
            <strong>大阪海游馆门票成人 ¥2,700–¥3,200、小学生与初中生 ¥1,400–¥1,650、3 岁以上幼儿 ¥700–¥800，未满 3 岁免费</strong>。票价按水族馆的浮动票价制逐日设定，越拥挤的日子越接近区间上限（kaiyukan.com，{CHECKED} 确认）。入馆需指定日期和时段：不一定要预约，但售票处只卖当日票，也可能没有你想要的时段，所以大约 30 天前开售的官方电子票最稳妥。海游馆距大阪地铁中央线大阪港站 1 号出口步行约 5 分钟，水族馆表示单向参观路线走一圈约 90–120 分钟。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看你日期的海游馆门票 →
            </KlookLink>
          </div>
          <NextBookingBlock region="osaka" locale="zh-cn" />
        </section>

        <KlookSameDayCards
          heading="去海游馆当天可以一起预订的项目"
          cards={sameDayCards}
          footnote={
            <>
              大阪周游卡不包含海游馆（osaka-amazing-pass.com 设施清单，2026 年 11 月 23 日确认），但包含天保山摩天轮和圣玛丽亚号。从关西机场进出、会经过京都、新大阪或天王寺吗？{" "}
              <KlookLink href={HARUKA_URL} adPlacement="same-day-cards" target="_blank" rel={KLOOK_REL}>
                在 Klook 查看 JR HARUKA 车票 →
              </KlookLink>{" "}
              乘地铁的次数比参观收费景点还多吗？{" "}
              <KlookLink href={METRO_PASS_URL} adPlacement="same-day-cards" target="_blank" rel={KLOOK_REL}>
                在 Klook 查看大阪地铁 1 日券／2 日券 →
              </KlookLink>{" "}
              （和车站售票机出售的 Enjoy Eco Card 的比较，请见
              <Link href="/guides/transport/osaka-metro-pass" hrefLang="en">
                大阪地铁一日券攻略（英文）
              </Link>
              ）。
            </>
          }
        />

        <EsimCtaTop />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速回答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人门票</p>
                <p className={styles.verdictStatValue}>¥2,700–3,200，按日期</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>预留时间</p>
                <p className={styles.verdictStatValue}>90–120 分钟，单向一圈</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>交通</p>
                <p className={styles.verdictStatValue}>大阪港站 1 号出口步行 5 分钟</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>购票</p>
                <p className={styles.verdictStatValue}>指定日期电子票，30 天前开售</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>要点：</strong>大阪海游馆门票没有单一价格。水族馆采用浮动票价，成人按日期支付 <strong>¥2,700 到 ¥3,200</strong>，小学生与初中生 <strong>¥1,400–1,650</strong>，3 岁以上幼儿 <strong>¥700–800</strong>，未满 3 岁免费。请购买官方指定日期与时段的电子票，入场时间固定，大约在参观日 <strong>30 天</strong>前开售；售票处只卖当日票，所以电子票也是不用排售票队伍的方法。请预留 <strong>90–120 分钟</strong>（水族馆公布的走一圈时间），并一次参观完：<strong>再入馆已于 2026 年 6 月 15 日停止</strong>。从中央线大阪港站 1 号出口步行 5 分钟，大阪周游卡<strong>不</strong>包含海游馆。以上都于 {CHECKED} 在 kaiyukan.com 确认。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看海游馆门票 →
              </KlookLink>
              <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                搭配大阪周游卡 →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>大阪海游馆是什么样的地方？</h2>
          <p className={styles.bodyText}>
            海游馆是位于大阪港区天保山海边的水族馆，整体以环太平洋各地的栖息环境为主题，让游客依次走过，中心是住着鲸鲨的巨大太平洋水槽。官方表示馆内约有 <strong>620 种、3 万只</strong>生物，其中包括多数游客出馆后最常提起的南极企鹅。
          </p>
          <p className={styles.bodyText}>
            买票前有三件事值得先想清楚。票价随日期变化，同样的参观有便宜的日子，也有贵的日子。入场时段在购票时就固定下来，是避开人潮唯一能控制的方法。另外，从 2026 年 6 月起不能出馆后再进来，所以参观必须安排成连续的一段，不能被午饭打断。本页接下来就是这三个决定和背后的数字。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票价</span>
          <h2 className={styles.sectionTitle}>2026 年海游馆门票多少钱？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            海游馆成人门票按日期为 ¥2,700 到 ¥3,200，儿童 ¥1,400 到 ¥1,650。海游馆说明入馆费为浮动价格（入館料は変動価格），你那天的金额会显示在价格日历上。各年龄的门票如下：
          </p>
          <Table
            head={["门票", "对象", "票价（官方）", "备注"]}
            rows={priceRows.map((r) => [r.ticket, r.who, <span key="p" style={{ whiteSpace: "nowrap" }}>{r.price}</span>, r.what])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最后确认：{BANDS_CHECKED_ISO}：<a href={OFFICIAL.bands} target="_blank" rel="noopener">kaiyukan.com/info/group/</a>（价格区间与预约说明）；{CHECKED_ISO}：<a href={OFFICIAL.calendar} target="_blank" rel="noopener">kaiyukan.com/info/ticket/kaiyukan/</a>（浮动票价、价格日历、残障优惠）与 <a href={OFFICIAL.santaMaria} target="_blank" rel="noopener">suijo-bus.osaka/intro/santamaria/</a>（套票）。
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            用文字列出价格区间的是团体预约页面，普通门票页面要在日历上选好日期才会显示具体金额。确认的页面没有用文字列出 11 月到新年期间的票价，假期日期请直接在日历上查询。票价可能变动，购票前请确认你的日期。日本其他景点的门票和各自的确认日期，请见
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              日本景点门票价格总表（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看你日期的海游馆门票 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Klook 的价格也随日期变化，付款前请先查看你日期的产品页面和取消规定。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>规定与设施</span>
          <h2 className={styles.sectionTitle}>海游馆的入馆规定、开放时间和设施有哪些？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            入馆需指定日期和时段，再入馆已经停止，晚上开到 20:00、最后入馆 19:00。下表每一项都来自所列的官方页面，并附上确认日期：
          </p>
          <Table head={["项目", "官方说明", "出处", "确认日期"]} rows={factRows.map((r) => [r.item, r.value, r.source, CHECKED])} />
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>选择门票</span>
          <h2 className={styles.sectionTitle}>海游馆门票应该买哪一种？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看海游馆门票 →
            </KlookLink>
            <KlookLink href={LEGO_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              搭配隔壁的乐高探索中心 →
            </KlookLink>
            <KlookLink href={NIFREL_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              搭配 EXPOCITY 的 NIFREL →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem" }}>
            隔壁的乐高是室内的探索中心，不是户外乐园。完整的乐园是名古屋的日本乐高乐园，票价、开放时间和从名古屋站乘青波线的方法，请见
            <Link href="/guides/attractions/legoland-japan-tickets" hrefLang="en" style={linkStyle}>
              日本乐高乐园门票攻略（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>开放时间与人流</span>
          <h2 className={styles.sectionTitle}>什么时候去海游馆最好？</h2>
          <p className={styles.bodyText}>
            <strong>选价格日历上票价较低的平日，下午三点前后以后入场。</strong>{CHECKED} 确认的官方页面没有公布拥挤预测，但预约规定指向同一个方向：成人票价最高（¥3,200）的日子，海游馆只接受 15:00 以后的预约；夜间节目为 <strong>17:00–20:00、最后入馆 19:00</strong>，时间随季节调整。
          </p>
          <div style={{ margin: "1rem 0" }}>
            <Table head={["时段", "官方页面的说明", "对你的意义"]} rows={timingRows.map((r) => [r.when, r.official, r.means])} />
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最后确认：{CHECKED_ISO}：<a href={OFFICIAL.calendar} target="_blank" rel="noopener">kaiyukan.com/info/ticket/kaiyukan/</a>、<a href={OFFICIAL.bands} target="_blank" rel="noopener">kaiyukan.com/info/group/</a>（预约说明与走一圈 90–120 分钟）、<a href={OFFICIAL.ticket} target="_blank" rel="noopener">kaiyukan.com/info/ticket/</a>（售票处销售）与 <a href={OFFICIAL.night} target="_blank" rel="noopener">kaiyukan.com/program/night/</a>。
          </p>
          <p className={styles.bodyText}>
            开放时间和票价在同一个日历上按日期公布，官网请游客自己确认日期。一般是 <strong>10:00 开馆、20:00 闭馆，最后入馆为闭馆前 1 小时</strong>，闭馆日是一月和二月的少数几天（{SET_CHECKED} 确认）。17:00 起灯光和音乐改为夜间节目：同一张门票、同样的水槽，正是最拥挤的日子价格日历引导你去的下午时段。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>参观时间</span>
          <h2 className={styles.sectionTitle}>参观海游馆需要多长时间？</h2>
          <p className={styles.bodyText}>
            <strong>按水族馆的说法是 90–120 分钟。</strong>海游馆的团体页面把这个时间作为走完建筑一圈的时间（{CHECKED} 确认）：路线先带你到顶层，再沿着水槽单向向下，所以只需走一次。如果想在太平洋水槽前多看看鲸鲨，或去日本海沟水槽后面、部分座位面向水槽的 Cafe R.O.F 坐坐，请再多留一些时间。
          </p>
          <p className={styles.bodyText}>
            这样一天大部分时间还在。天保山位于海湾边，最简单的搭配是港湾区的另一半：摩天轮或圣玛丽亚号，或者对岸的日本环球影城。
            <Link href="/guides/attractions/osaka-2-day-itinerary" hrefLang="en" style={linkStyle}>
              大阪 2 天行程（英文）
            </Link>
            把海游馆排进完整的一天并规划好路线，
            <Link href="/guides/attractions/osaka-3-day-itinerary" hrefLang="en" style={linkStyle}>
              大阪 3 天行程（英文）
            </Link>
            把它安排在海湾边的下午，
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" hrefLang="en" style={linkStyle}>
              大阪京都 3 天行程（英文）
            </Link>
            则把它作为第 3 天下雨或以小孩为主时的选择。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>再入馆</span>
          <h2 className={styles.sectionTitle}>海游馆可以再入馆吗？</h2>
          <p className={styles.bodyText}>
            <strong>不可以。</strong>海游馆自 <strong>2026 年 6 月 15 日</strong>起停止再入馆，于 2026 年 5 月 21 日公布，是为了让每个时段的入馆人数保持稳定、让游客能按自己的节奏观看展示的措施之一（kaiyukan.com/about/news/20564.html，{CHECKED} 确认）。
          </p>
          <p className={styles.bodyText}>
            请在入馆前或出馆后用餐。饮品店 SEA SAW 位于检票口前的区域，天保山市场就在隔壁，海游馆大厅和博物馆商店旁的储物柜不用门票也能使用，方便入馆前先寄存行李。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>亲子</span>
          <h2 className={styles.sectionTitle}>带婴儿或小孩去海游馆方便吗？</h2>
          <p className={styles.bodyText}>
            <strong>从官方设施清单来看，是方便的。</strong>2 岁及以下免费，馆内有带尿布台和冲奶粉用热水机的<strong>育婴室</strong>，还有<strong>哺乳室</strong>。轮椅可在服务台借用。以上都于 {CHECKED} 在 kaiyukan.com 确认。确认的官方页面没有说明婴儿车规定，如果这会影响你的安排，请在入口询问。
          </p>
          <p className={styles.bodyText}>
            家庭的安排方式和其他游客一样，只是更需要做好：预约入场时段，让小朋友不用在当日票队伍里排队；再入馆已经停止，午睡或吃饭要安排在入馆前或出馆后，而不是中途。如果这趟旅行以小孩为主，
            <Link href="/guides/attractions/where-to-stay-in-osaka" hrefLang="en" style={linkStyle}>
              大阪住宿区域攻略（英文）
            </Link>
            比较了各个住宿区域，包括乘 Captain Line 渡轮很快就到水族馆的环球城。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>购票步骤</span>
          <h2 className={styles.sectionTitle}>大阪海游馆门票需要提前买吗？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>不是必须，但建议提前买。</strong>售票处只卖当日票，并提醒可能买不到想要的入场时段；官方指定日期与时段的电子票大约 30 天前开售（kaiyukan.com/info/ticket/，{CHECKED} 确认）。购票步骤如下：
          </p>
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
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看海游馆门票 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="同一天一起预订"
          heading="去海游馆那天还可以预订什么？"
          intro="在水族馆待两到三小时，一天还剩很多时间；不包含海游馆的周游卡，在另一天仍然划算。以下都可以用购买门票的同一个 Klook 账号预订。"
          items={sameDayPrepItems}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>套票与周边</span>
          <h2 className={styles.sectionTitle}>海游馆附近可以搭配哪些景点？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>最方便的搭配是圣玛丽亚号港湾游船：</strong>在水族馆旁的码头上船，约 45 分钟。水族馆出售三种官方套票：圣玛丽亚号、Captain Line 渡轮和乐高探索中心；大阪周游卡包含摩天轮、游船和 Captain Line，但不包含海游馆本身：
          </p>
          <Table
            head={["项目", "时间", "票价（官方）", "大阪周游卡", "须知"]}
            rows={nearbyRows.map((r) => [r.what, r.time, r.price, r.pass, r.note])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最后确认：{CHECKED_ISO}：<a href={OFFICIAL.santaMaria} target="_blank" rel="noopener">suijo-bus.osaka/intro/santamaria/</a>（游船票价、航程时间、码头）、<a href={OFFICIAL.amazingPass} target="_blank" rel="noopener">osaka-amazing-pass.com/en/service_free.html</a>（开放时间、休息日、清单上的票价和周游卡适用范围）、<a href={OFFICIAL.captainLine} target="_blank" rel="noopener">kaiyukan.com/thv/captline/</a> 与 <a href={OFFICIAL.harbor} target="_blank" rel="noopener">kaiyukan.com/thv/general/</a>（船程时间、摩天轮高度）。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SANTA_MARIA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看圣玛丽亚号游船 →
            </KlookLink>
            <KlookLink href={LEGO_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看海游馆 + 乐高探索中心 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            也请注意水族馆套票清单上<strong>没有</strong>的项目。<strong>天保山大摩天轮</strong>高 112.5 米，是世界上最大的摩天轮之一，和水族馆同在 Harbor Village，但由其他公司运营，所以没有官方的水族馆 + 摩天轮组合，摩天轮请当天购票。如果你的行程包含日本环球影城，<strong>Captain Line</strong> 套票值得多看一眼：从环球城码头乘船 10 分钟就到水族馆门口，把海湾两岸的两个景点变成同一个下午的行程。日本环球影城本身需要预订的项目，请见
            <Link href="/zh-cn/guides/attractions/usj-tickets-express-pass" style={linkStyle}>
              日本环球影城门票与快速通行证攻略
            </Link>
            ；乘一趟船就到的环球城酒店比较，请见
            <Link href="/guides/attractions/usj-hotels" hrefLang="en" style={linkStyle}>
              日本环球影城酒店攻略（英文）
            </Link>
            。套票和摩天轮 112.5 米的高度于 {CHECKED} 在 kaiyukan.com 确认。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>怎么去海游馆？</h2>
          <p className={styles.bodyText}>
            乘大阪地铁<strong>中央线到大阪港站</strong>，水族馆称这一站为“大阪港駅（海遊館前）”，意思是“海游馆前的大阪港站”，从<strong> 1 号出口步行约 5 分钟</strong>。几乎所有游客都走这条路线；中央线穿过市中心，从本町站可以直达，其他市中心车站大多换乘一次即可。
            <Link href="/guides/transport/osaka-transportation" hrefLang="en" style={linkStyle}>
              大阪交通攻略（英文）
            </Link>
            说明中央线和其他线路的关系，
            <Link href="/guides/transport/osaka-metro-pass" hrefLang="en" style={linkStyle}>
              大阪地铁一日券攻略（英文）
            </Link>
            则计算在这样的一天里，买 1 日券是否比刷 IC 卡划算。
          </p>
          <p className={styles.bodyText}>
            官方交通页面还列出另外三种方式：从环球城码头出发、直接停靠入口前海游馆西码头的 <strong>Captain Line</strong> 渡轮；停靠“天保山 Harbor Village”站的大阪市营巴士，以及停靠“海游馆（天保山）”站的南海巴士，两个车站都离入口只有几步；开车则有约 1,000 个停车位。以上都于 {CHECKED} 确认。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>周游卡问题</span>
          <h2 className={styles.sectionTitle}>大阪周游卡可以进海游馆吗？</h2>
          <p className={styles.bodyText}>
            <strong>不可以。</strong>海游馆不在周游卡的合作设施清单上（osaka-amazing-pass.com，{CHECKED} 确认），也是周游卡没有包含的设施中最贵的一个。周游卡（1 日券 ¥3,500、2 日券 ¥5,000）包含大阪地铁和市营巴士无限次乘坐，以及约 40 个设施免费入场，包括大阪城、梅田蓝天大厦观景台和各条河上游船（其中的
            <Link href="/zh-cn/guides/attractions/dotonbori-river-cruise" style={linkStyle}>
              道顿堀游船
            </Link>
            不用周游卡为 ¥2,000），以及水族馆旁的天保山大摩天轮、圣玛丽亚号白天航班和 Captain Line。日本环球影城也不在清单上。完整的设施清单和回本计算，请见
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              大阪周游卡攻略（英文）
            </Link>
            。
          </p>
          <p className={styles.bodyText}>
            所以关键在于行程安排，而不是金额。一天内去三四个周游卡设施的市区观光日，周游卡才划算；以海游馆为主的一天则不然，为这一天多买一天周游卡，付的钱大部分用不上。比较有效的安排是用周游卡逛市区一天，再用不带周游卡的一天去大型景点，
            <Link href="/guides/attractions/things-to-do-osaka" hrefLang="en" style={linkStyle}>
              大阪景点攻略（英文）
            </Link>
            按两到三天的行程整理了这种安排。如果你还是想一次结账，Klook 出售附带海游馆门票的大阪周游卡，是唯一这样组合的产品。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看大阪周游卡 + 海游馆 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              只买水族馆门票 →
            </KlookLink>
          </div>
        </section>

        <div data-placement="kaiyukan-highrate-faq">
          <KlookTripPrep
            label="同一趟旅行"
            heading="同一趟旅行还可以预订哪些大阪景点？"
            intro="海游馆参观两到三小时，当晚或第二天还能安排大阪城或梅田观景台。这两处都包含在大阪周游卡里，所以以下是给不买周游卡的行程准备的。"
            items={highRateItems}
            adPlacement="kaiyukan-highrate-faq"
          />
        </div>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            海游馆的姐妹馆
            <Link href="/guides/attractions/nifrel-osaka-tickets" hrefLang="en" style={linkStyle}>
              NIFREL（英文）
            </Link>
            位于吹田市的 EXPOCITY，成人 ¥2,400，2027 年 1 月 19–20 日闭馆。
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            在四国，香川县的
            <Link href="/guides/attractions/shikoku-aquarium-tickets" hrefLang="en" style={linkStyle}>
              四国水族馆（英文）
            </Link>
            成人 ¥2,600，小学生与初中生 ¥1,400。
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            隔壁天保山市场里的
            <Link href="/guides/attractions/legoland-discovery-center-osaka-tickets" hrefLang="en" style={linkStyle}>
              大阪乐高探索中心（英文）
            </Link>
            ，3 岁以上网上购票 ¥2,900–3,300。
          </p>
        </section>
        <EsimCtaBottom />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="海游馆门票常见问题" />

        <KlookTourPicks
          heading="大阪一天的其他时间"
          intro="海游馆只占一天里的两到三小时，还有半天可以安排；而天保山离多数人想去的大阪市中心有一段距离。这个行程覆盖大阪城、道顿堀和新世界一带。Klook 价格随日期变化，请打开产品页面查看当前价格和集合地点。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "冲绳美丽海水族馆门票 2026：票价、开放时间与交通（英文）" },
            { href: "/zh-cn/guides/attractions/osaka-castle-tickets", title: "大阪城天守阁门票 2026：票价、开放时间与御座船" },
            { href: "/zh-cn/guides/attractions/umeda-sky-building-tickets", title: "梅田蓝天大厦门票（2026）：票价、开放时间与最佳时段" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周游卡 2026：¥3,500 值得买吗？附一日行程（英文）" },
            { href: "/zh-cn/guides/attractions/usj-tickets-express-pass", title: "日本环球影城门票与快速通行证（2026）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪景点攻略（2026）：周游卡划算与不划算的地方（英文）" },
            { href: "/guides/transport/osaka-transportation", title: "大阪交通攻略（2026）：地铁、电车与交通卡（英文）" },
            { href: "/guides/transport/osaka-metro-pass", title: "大阪地铁一日券 2026：1 日券与 2 日券比较（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景点门票价格 2026：官方票价与预约规则（英文）" },
            { href: "/zh-cn/guides/attractions", title: "更多日本景点门票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>选好入场时段，而不只是日期</h2>
            <p className={styles.ctaBannerDesc}>
              票价随日期变化，人流随时段变化，所以入场时段才是值得认真决定的事。提前购票可以使用中文结账界面和日本境外发行的银行卡，入场时扫码即可，不用在售票处排队。付款前请确认你日期显示的取消期限。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看海游馆门票 →
              </KlookLink>
              <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                搭配大阪周游卡 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
