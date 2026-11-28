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
// term: 海遊館門票 — the aquarium's own name in Traditional characters, with 門票 as Taiwan and
// Hong Kong results write it (大阪海遊館 門票 in walkerplus / funtime / uptogo results). The pass
// is 大阪周遊卡, as on the other Traditional Osaka pages.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/osaka-aquarium-kaiyukan-tickets";
const TITLE = "大阪海遊館門票 2026：票價、入場時段與最佳時間";
const H1 = "大阪海遊館門票 2026：票價與最佳參觀時間";
const DESC =
  "海遊館門票成人依日期 ¥2,700–3,200、中小學生 ¥1,400–1,650。電子票約 30 天前開賣並指定時段，不可再入館。";

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
    ticket: "最推薦：入館電子票（指定日期與時段）",
    who: "成人：高中生或 16 歲以上",
    price: "¥2,700–¥3,200",
    what: "票價依日期而定，電子票約 30 天前開賣。官方預約說明：票價 ¥3,200 的日子只能預約 15:00 以後入場，¥3,500 的日子不接受預約",
  },
  {
    ticket: "入館門票",
    who: "兒童：國小與國中學生",
    price: "¥1,400–¥1,650",
    what: "整個價格區間約為成人票價的一半",
  },
  {
    ticket: "入館門票",
    who: "幼兒：3 歲以上",
    price: "¥700–¥800",
    what: "成人票價的四分之一",
  },
  {
    ticket: "入館門票",
    who: "2 歲以下",
    price: "免費",
    what: "不需要門票",
  },
  {
    ticket: "入館門票，身心障礙優惠",
    who: "持身心障礙手冊者與 1 名陪同者",
    price: "上述票價的一半",
    what: "手冊、Mirairo ID 應用程式或 My Number Portal 都可作為證明，截圖不行",
  },
  {
    ticket: "海遊館 + 聖瑪麗亞號白天航程套票",
    who: "成人／國中生／國小學生",
    price: "¥4,200／¥2,900／¥2,150 起",
    what: "以最低入館票價分開購買則為 ¥4,700／¥3,400／¥2,400；遊船營運公司註明旺季套票價格可能調整",
  },
];

const timingRows = [
  {
    when: "最佳選擇",
    official: "入館費為依需求逐日訂定的浮動票價",
    means: "在價格日曆上挑票價較低的日子，最好是學校假期以外的平日，入場時段選下午三點左右以後",
  },
  {
    when: "最擁擠（票價最高）的日子",
    official: "成人 ¥3,200 的日子只能預約 15:00 以後入場；成人 ¥3,500 的日子不接受預約",
    means: "日曆上的票價高，就代表人多。這些日子請安排下午參觀",
  },
  {
    when: "沒買票直接到館",
    official: "售票櫃檯只賣當日票，從開館賣到最後入館；不一定能買到想要的時段，也可能需要等候",
    means: "改買約 30 天前開賣的指定日期與時段電子票",
  },
  {
    when: "17:00 起",
    official: "夜間節目 17:00–20:00，最後入館 19:00；時間依季節調整",
    means: "同一張門票，燈光與音樂換成夜間版本，是多數遊客不會選的晚間時段",
  },
  {
    when: "逛一圈",
    official: "單向參觀路線逛一圈約 90–120 分鐘；再入館已於 2026 年 6 月 15 日停止",
    means: "館內預留兩小時，在入館前或出館後用餐，不要在中途",
  },
];

const nearbyRows = [
  {
    what: "最容易搭配：聖瑪麗亞號白天航程",
    time: "約 45 分鐘；白天航班 11:00–16:00，每小時整點出航",
    price: "成人 ¥2,000、國小學生 ¥1,000（每位成人可免費帶 1 名學齡前兒童）",
    pass: "可用",
    note: "在水族館旁的海遊館西碼頭上船。12 月 31 日與 1 月 12 日至 2 月 5 日停航；依天候與海況航行",
  },
  {
    what: "天保山大摩天輪（112.5 公尺）",
    time: "就在隔壁；平日 10:00–21:00，週末與假日 10:00–22:00",
    price: "¥1,000（周遊卡列出的一般票價）",
    pass: "可用",
    note: "營運公司不同，因此沒有海遊館 + 摩天輪套票。遊船營運公司另售摩天輪 + 聖瑪麗亞號套票",
  },
  {
    what: "前往日本環球影城的 Captain Line 渡輪",
    time: "船程約 10 分鐘；9:30–20:00，時刻表每月不同",
    price: "來回 ¥1,700（周遊卡列出的一般票價）",
    pass: "可用",
    note: "環球城碼頭（Universal City Port）距 JR 夢咲線環球城站步行約 5 分鐘。海遊館有販售 Captain Line 套票",
  },
  {
    what: "大阪樂高樂園探索中心",
    time: "同一棟設施內；平日 10:00–18:00（最後入場 16:00），週末 10:00–19:00（最後入場 17:00）",
    price: "請見營運公司網站",
    pass: "僅限指定日期，需事先預約",
    note: "不能只有成人或只有兒童入場。海遊館有販售樂高樂園套票",
  },
];

const factRows = [
  {
    item: "門票方式",
    value: "指定日期與時段入館，票價逐日浮動；電子票原則上於 30 天前開賣",
    source: "kaiyukan.com/info/ticket/",
  },
  {
    item: "售票櫃檯",
    value: "只賣當日票，從開館賣到最後入館；想要的入場時段可能已售罄",
    source: "kaiyukan.com/info/ticket/",
  },
  {
    item: "最擁擠日子的規定",
    value: "成人 ¥3,200 的日子只能預約 15:00 以後入場；成人 ¥3,500 的日子不接受預約",
    source: "kaiyukan.com/info/group/",
  },
  {
    item: "夜間節目",
    value: "17:00–20:00，最後入館 19:00；時間依季節調整",
    source: "kaiyukan.com/program/night/",
  },
  {
    item: "再入館",
    value: "2026 年 6 月 15 日起停止，一張門票只能入館一次",
    source: "kaiyukan.com/about/news/20564.html",
  },
  {
    item: "未滿 3 歲",
    value: "2 歲以下免費",
    source: "kaiyukan.com/info/ticket/kaiyukan/",
  },
  {
    item: "嬰兒",
    value: "設有育嬰室（尿布台、沖泡奶粉用熱水機）與哺乳室",
    source: "kaiyukan.com/info/area/",
  },
  {
    item: "置物櫃與輪椅",
    value: "入口附近、海遊館大廳與博物館商店旁設有置物櫃；輪椅可在服務台借用",
    source: "kaiyukan.com/info/area/",
  },
  {
    item: "交通",
    value: "大阪港站（中央線）1 號出口步行約 5 分鐘；停車位約 1,000 個",
    source: "kaiyukan.com/info/access/",
  },
];

const whoFor = [
  {
    title: "以下情況請買指定日期與時段的電子票",
    desc: `您在週末或假期前往，或是只要能事先安排行程，都建議購買。官方電子票會固定日期與入場時段，約在參觀日 30 天前開賣；官方也提醒，在售票櫃檯買當日票不一定能進到想要的時段。${CHECKED} 查核。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
        <circle cx="12" cy="15" r="2.5" />
      </svg>
    ),
  },
  {
    title: "以下情況請晚一點去",
    desc: `您想避開人潮、也想買到較便宜的票。17:00 起進入夜間節目，燈光與音樂會改變；20:00 閉館的日子最後入館為 19:00。成人票價最高 ¥3,200 的日子只接受 15:00 以後的預約，所以最擁擠的日子本來就會被安排到下午。${CHECKED} 查核。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "以下情況請買套票",
    desc: "您這一天要逛的是整個天保山港灣區，而不只是水族館。海遊館的官方套票可加上聖瑪麗亞號港灣遊船、前往環球城的 Captain Line 渡輪，或隔壁的樂高樂園。也請注意清單上沒有的項目：天保山大摩天輪由其他公司營運，所以沒有官方的水族館 + 摩天輪門票。",
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
    title: "先在價格日曆上查您要去的日期",
    desc: `海遊館採用浮動票價制（官方稱「価格変動制」），入館費依需求逐日訂定，沒有固定的單一票價。成人價格區間為 ¥2,700 到 ¥3,200，官方另外說明了只接受 15:00 以後預約的 ¥3,200 票價，以及完全不接受預約的 ¥3,500 票價。適用哪一種，取決於您的日期。${CHECKED} 查核。`,
  },
  {
    title: "選定入場時段，而不只是日期",
    desc: `官方電子票是指定日期與時段的門票（${CHECKED} 查核），入場時段以 15 分鐘為單位（${SET_CHECKED} 查核）。想避開人潮，就要選好入場時段：官方會讓每個時段的入館人數維持穩定，最擁擠的日子只接受 15:00 以後的預約。`,
  },
  {
    title: "約 30 天前開始購票",
    desc: `官方表示電子票原則上於參觀日 30 天前開賣，售票櫃檯只賣當日票，從開館賣到最後入館。所以這裡確實有購票期間：不必像東京需要指定時段的觀景台那樣在兩週前半夜搶票，但也不是隨時都買得到。${CHECKED} 查核。`,
  },
  {
    title: "想用中文介面或境外信用卡付款，請透過代售平台購票",
    desc: "官方電子票系統以日文為主。透過 Klook 購票，可用中文介面以境外信用卡付款，取得入場時掃描的條碼，套票與大阪周遊卡組合商品也都在同一處。取消期限與是否指定日期依商品而異，付款前請先確認。",
  },
  {
    title: "再入館已停止，請一次參觀完畢",
    desc: `這是許多其他攻略還沒更新的規定。海遊館於 2026 年 6 月 15 日停止再入館，理由是希望讓每個時段的入館人數維持穩定。在天保山市場吃完午餐再回來逛第二圈的安排已經不可行：一張門票只能入館一次。${CHECKED} 查核。`,
  },
];

/** The five questions in the FAQPage markup, as on the English page. */
const faqItems: FaqItem[] = [
  {
    q: "海遊館門票多少錢？",
    a: `海遊館門票成人（高中生或 16 歲以上）¥2,700–¥3,200，國小與國中學生 ¥1,400–¥1,650，3 歲以上幼兒 ¥700–¥800，2 歲以下免費。水族館採用浮動票價，實際金額依價格日曆逐日訂定，越擁擠的日子越接近區間上限。持身心障礙手冊者與 1 名陪同者半價。海遊館 + 聖瑪麗亞號遊船套票成人 ¥4,200 起。${CHECKED} 於 kaiyukan.com 與 suijo-bus.osaka 查核。`,
  },
  {
    q: "大阪海遊館門票需要事先購買嗎？",
    a: `不是必須，但建議事先購買。入館需指定日期與時段；售票櫃檯只賣當日票，並提醒可能買不到想要的時段、也可能需要等候，而官方電子票會固定您的入場時段，約在參觀日 30 天前開賣。票價最高的日子預約規定更嚴格：成人 ¥3,200 的日子只能預約 15:00 以後入場，¥3,500 的日子不接受預約。${CHECKED} 查核。`,
  },
  {
    q: "參觀海遊館需要多久？",
    a: `水族館表示單向參觀路線逛一圈約 90–120 分鐘。路線先帶您到頂樓，再沿著水槽螺旋往下，途中會經過有鯨鯊的太平洋水槽，因此只需走一次。再入館已於 2026 年 6 月 15 日停止，請把參觀排成一整段時間，再另外預留聖瑪麗亞號遊船（約 45 分鐘）或隔壁摩天輪的時間。${CHECKED} 查核。`,
  },
  {
    q: "什麼時候去海遊館最好？",
    a: `選價格日曆上票價較低的平日，下午三點左右以後入場。官方沒有公布擁擠預測，但票價依需求訂定，票價最高（¥3,200）的日子只接受 15:00 以後的預約，夜間節目為 17:00–20:00、最後入館 19:00（時間依季節調整）。${CHECKED} 查核。`,
  },
  {
    q: "大阪周遊卡可以進海遊館嗎？",
    a: `不行。${CHECKED} 查核的大阪周遊卡合作設施清單中沒有海遊館。周遊卡（1 日券 ¥3,500）可用於旁邊的三項設施：天保山大摩天輪、聖瑪麗亞號白天航程，以及前往環球城碼頭的 Captain Line 渡輪，所以若您在天保山這天也要搭這些，周遊卡仍可能划算。Klook 也販售大阪周遊卡 + 海遊館的組合商品，一次結帳即可。`,
  },
];

/** Further questions shown on the page but kept out of the FAQPage markup. */
const moreFaqItems: FaqItem[] = [
  {
    q: "海遊館門票為什麼每天價格不同？",
    a: `因為水族館這樣決定。海遊館表示導入浮動票價制（価格変動制），是為了依需求訂定「合理的價格」，讓更多遊客入館。實際上，二月冷清的週二與黃金週的週六價格不同，任何第三方網頁上的單一金額都不可能同時符合兩天。票價本身也反映擁擠程度：如果您的日期接近區間上限，當天就會很多人。導入理由與浮動票價說明於 ${CHECKED} 查核。`,
  },
  {
    q: "大阪海遊館的營業時間是幾點到幾點？",
    a: `依日期而不同。官方以日曆公布營業時間，而不是固定時間表，並請遊客自行確認參觀日期，這也是最正確的建議。一般的模式是 10:00 開館、20:00 閉館，最後入館為閉館前 1 小時，休館日是一月與二月的幾天（${SET_CHECKED} 查核）。夜間節目頁面寫的是 17:00–20:00、最後入館 19:00，時間依季節調整（${CHECKED} 查核）。安排行程前，請先在日曆上確認您的日期。`,
  },
  {
    q: "海遊館有投幣式置物櫃嗎？",
    a: `有，共三處：水族館入口附近、海遊館大廳，以及博物館商店附近。大廳與商店旁的置物櫃沒有門票也能使用，天保山市場與摩天輪下方也有置物櫃。輪椅可在服務台借用。${CHECKED} 於 kaiyukan.com/info/area/ 查核。`,
  },
  {
    q: "年末年初的海遊館門票比較貴嗎？",
    a: `請在日曆上查您的日期，因為 ${CHECKED} 查核的官方頁面沒有以文字列出 11 月到新年期間的票價，每天的金額只顯示在價格日曆上。官方公布的是高價日子的規定：成人 ¥3,200 的日子只接受 15:00 以後的預約，成人 ¥3,500 的日子完全不接受預約。如果您的日期在假期期間，請在電子票約 30 天前開賣時就馬上查詢。`,
  },
  {
    q: "怎麼去大阪海遊館？",
    a: `主要路線是搭大阪地鐵中央線到大阪港站，官方站名為「大阪港駅（海遊館前）」，意思是「海遊館前的大阪港站」，從 1 號出口步行約 5 分鐘。從日本環球影城那一側，可搭 Captain Line 渡輪直接抵達入口前的海遊館西碼頭。大阪市營巴士停靠「天保山 Harbor Village」站，南海巴士停靠「海遊館（天保山）」站，停車位約 1,000 個。以上皆於 ${CHECKED} 在 kaiyukan.com/info/access/ 查核。`,
  },
  {
    q: "出去吃午餐後可以再進海遊館嗎？",
    a: `不行，現在已經不能了，這也是多數攻略仍寫錯的地方。海遊館宣布自 2026 年 6 月 15 日起停止再入館，理由是希望讓每個時段的入館人數維持穩定，讓遊客能依自己的步調欣賞展示。請在入館前或出館後用餐；多數人會在隔壁的天保山市場用餐，入館門票在那裡也可當作折扣券使用。${CHECKED} 查核。`,
  },
  {
    q: "海遊館可以和天保山摩天輪或聖瑪麗亞號一起玩嗎？",
    a: `部分可以，購票時這個區別很重要。水族館販售三種官方套票：約 45 分鐘環繞大阪港的復刻帆船聖瑪麗亞號（成人套票 ¥4,200 起）、船程約 10 分鐘前往環球城碼頭的 Captain Line 渡輪，以及同一棟設施內的大阪樂高樂園探索中心。同在 Harbor Village、高 112.5 公尺的天保山大摩天輪不在清單上，由其他公司營運，所以沒有官方的水族館 + 摩天輪門票；摩天輪請當天購票，或使用適用摩天輪的大阪周遊卡。以上皆於 ${CHECKED} 查核。`,
  },
  {
    q: "帶小孩去海遊館值得嗎？",
    a: `海遊館是大阪主要景點中對家庭較友善的一處，需要注意的是實際安排，而不是好不好玩。未滿 3 歲免費，3 歲以上 ¥700–800；參觀路線是一條單向路線，不會迷路；鯨鯊所在的太平洋水槽與南極企鵝這些主要展示，也正是小朋友想看的。館內有附尿布台與沖泡奶粉用熱水機的育嬰室，另有哺乳室。需要事先安排的是：再入館已停止，參觀必須一次完成；官方表示逛一圈需 90–120 分鐘。查核的官方頁面沒有說明嬰兒車規定，若出發前需要確認，請在入口詢問。票價與設施於 ${CHECKED} 查核。`,
  },
  {
    q: "大阪下雨天適合去海遊館嗎？",
    a: "是最適合的選項之一，但有一個缺點。水族館全在室內，隔壁的天保山市場也有屋頂，所以下雨天在館內完全不受影響；不過從大阪港站 1 號出口仍需步行 5 分鐘，而最常搭配的聖瑪麗亞號港灣遊船與摩天輪，正是天保山行程中最受雨天影響的部分。聖瑪麗亞號尤其依天候與海況航行。如果天氣預報不好，就只買入館門票，把遊船與摩天輪留到其他天。",
  },
];

/** Traditional copy per English card, keyed by the card's kind (each kind appears once). */
const SAME_DAY_ZH: Record<string, Partial<KlookSameDayCard>> = {
  Cruise: {
    kind: "遊船",
    label: "聖瑪麗亞號白天航程",
    ctaLabel: "查看聖瑪麗亞號遊船 →",
    why: "從水族館旁的碼頭出發，約 45 分鐘環繞大阪港；白天航班每小時整點出航。",
  },
  Hotel: {
    kind: "飯店",
    label: "日本環球影城周邊飯店（環球城）",
    ctaLabel: "查看環球城飯店 →",
    why: "搭 Captain Line 渡輪從環球城碼頭到水族館門口約 10 分鐘。",
  },
  Pass: {
    kind: "周遊卡",
    label: "大阪周遊卡（1 日券／2 日券）",
    ctaLabel: "查看大阪周遊卡 →",
    why: "海遊館不能使用，但隔壁的天保山摩天輪、聖瑪麗亞號與 Captain Line 都包含在內。",
  },
  Activity: {
    kind: "體驗",
    label: "天保山大摩天輪",
    ctaLabel: "查看摩天輪 →",
    why: "高 112.5 公尺的摩天輪與水族館在同一個天保山設施內，是港灣行程的另一半。",
  },
  "Food tour": {
    kind: "美食導覽",
    label: "道頓堀白天美食導覽",
    ctaLabel: "查看美食導覽 →",
    why: "行程時間為 11:00–14:00，可以排在搭中央線前往水族館的下午時段之前。",
  },
  eSIM: {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    why: "水族館的指定時段電子票與前往大阪港站的路線都在手機上，從機場開始就有行動數據比較方便。",
  },
  "Airport train": {
    kind: "機場列車",
    label: "南海特急 Rapi:t 車票",
    ctaLabel: "查看 Rapi:t 車票 →",
    why: "關西機場與難波之間的對號座列車，用於大阪行程的抵達日或離開日。",
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
    label: "大阪城天守閣門票",
    ctaLabel: "查看大阪城門票 →",
    why: "可參觀天守閣 8 個樓層與豐臣石垣館，入口掃碼入場。持有大阪周遊卡就不用買，周遊卡已包含大阪城。",
  },
  {
    label: "梅田藍天大廈空中庭園展望台門票",
    ctaLabel: "查看梅田藍天大廈門票 →",
    why: "雙塔頂端高 173 公尺的環形屋頂展望台，從大阪車站步行可達，適合晚上順道前往。大阪周遊卡也適用。",
  },
  {
    label: "大阪城、梅田藍天大廈與道頓堀遊船一日遊",
    ctaLabel: "查看大阪一日遊 →",
    why: "由導遊帶領，一天走完大阪城、梅田展望台與道頓堀的 Tombori River Cruise，路線已安排好。",
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
          title: "大阪 Sky Vista 雙層觀光巴士半日遊",
          desc: "搭乘開頂雙層巴士經過大阪城、道頓堀與通天閣的半日團體行程",
        }
      : {
          title: "大阪私人半日／一日步行導覽",
          desc: "由英語或日語專屬導遊帶領，依您想走的路線逛難波與心齋橋一帶",
        },
  ),
);

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "大阪海遊館門票" }];

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

export default function ZhTwOsakaAquariumKaiyukanTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG["zh-tw"] }),
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
            海遊館各年齡票價、官方透露的擁擠時段訊號、逛一圈要多久，以及在天保山可以一起安排的摩天輪、聖瑪麗亞號遊船與前往日本環球影城的渡輪。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "官方價格區間，附查核日期", "說明再入館規定"].map((t) => (
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
            <strong>大阪海遊館門票成人 ¥2,700–¥3,200、國小與國中學生 ¥1,400–¥1,650、3 歲以上幼兒 ¥700–¥800，未滿 3 歲免費</strong>。票價依水族館的浮動票價制逐日訂定，越擁擠的日子越接近區間上限（kaiyukan.com，{CHECKED} 查核）。入館需指定日期與時段：不一定要預約，但售票櫃檯只賣當日票，也可能沒有您要的時段，所以約 30 天前開賣的官方電子票是最穩妥的選擇。海遊館距大阪地鐵中央線大阪港站 1 號出口步行約 5 分鐘，水族館表示單向參觀路線逛一圈約 90–120 分鐘。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看您日期的海遊館門票 →
            </KlookLink>
          </div>
          <NextBookingBlock region="osaka" locale="zh-tw" />
        </section>

        <KlookSameDayCards
          heading="去海遊館當天可以一起預訂的行程"
          cards={sameDayCards}
          footnote={
            <>
              大阪周遊卡不包含海遊館（osaka-amazing-pass.com 設施清單，2026 年 11 月 23 日查核），但包含天保山摩天輪與聖瑪麗亞號。從關西機場進出、會經過京都、新大阪或天王寺嗎？{" "}
              <KlookLink href={HARUKA_URL} adPlacement="same-day-cards" target="_blank" rel={KLOOK_REL}>
                在 Klook 查看 JR HARUKA 車票 →
              </KlookLink>{" "}
              搭地鐵的次數比參觀收費景點還多嗎？{" "}
              <KlookLink href={METRO_PASS_URL} adPlacement="same-day-cards" target="_blank" rel={KLOOK_REL}>
                在 Klook 查看大阪地鐵 1 日券／2 日券 →
              </KlookLink>{" "}
              （車站售票機販售的 Enjoy Eco Card 比較，請見
              <Link href="/guides/transport/osaka-metro-pass" hrefLang="en">
                大阪地鐵周遊卡攻略（英文）
              </Link>
              ）。
            </>
          }
        />

        <EsimCtaTop />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人門票</p>
                <p className={styles.verdictStatValue}>¥2,700–3,200，依日期</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>預留時間</p>
                <p className={styles.verdictStatValue}>90–120 分鐘，單向一圈</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>交通</p>
                <p className={styles.verdictStatValue}>大阪港站 1 號出口步行 5 分鐘</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>購票</p>
                <p className={styles.verdictStatValue}>指定日期電子票，30 天前開賣</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>重點整理：</strong>大阪海遊館門票沒有單一價格。水族館採用浮動票價，成人依日期付 <strong>¥2,700 到 ¥3,200</strong>，國小與國中學生 <strong>¥1,400–1,650</strong>，3 歲以上幼兒 <strong>¥700–800</strong>，未滿 3 歲免費。請購買官方指定日期與時段的電子票，入場時間固定，約在參觀日 <strong>30 天</strong>前開賣；售票櫃檯只賣當日票，所以電子票也是不用排售票隊伍的方法。請預留 <strong>90–120 分鐘</strong>（水族館公布的逛一圈時間），並一次參觀完畢：<strong>再入館已於 2026 年 6 月 15 日停止</strong>。從中央線大阪港站 1 號出口步行 5 分鐘，大阪周遊卡<strong>不</strong>包含海遊館。以上皆於 {CHECKED} 在 kaiyukan.com 查核。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看海遊館門票 →
              </KlookLink>
              <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                搭配大阪周遊卡 →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>大阪海遊館是什麼樣的地方？</h2>
          <p className={styles.bodyText}>
            海遊館是位於大阪港區天保山海邊的水族館，整體以環太平洋各地的生態環境為主題，讓遊客依序走過，中心是住著鯨鯊的巨大太平洋水槽。官方表示館內約有 <strong>620 種、3 萬隻</strong>生物，其中包括多數遊客出館後最常提起的南極企鵝。
          </p>
          <p className={styles.bodyText}>
            買票前有三件事值得先想清楚。票價隨日期變動，同樣的參觀有便宜的日子，也有貴的日子。入場時段在購票時就固定下來，是避開人潮唯一能掌握的方法。另外，從 2026 年 6 月起不能出館後再進來，所以參觀必須排成一整段，不能用午餐切開。本頁接下來就是這三個決定與背後的數字。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>2026 年海遊館門票多少錢？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            海遊館成人門票依日期為 ¥2,700 到 ¥3,200，兒童 ¥1,400 到 ¥1,650。海遊館說明入館費為浮動價格（入館料は変動価格），您那天的金額會顯示在價格日曆上。各年齡的門票如下：
          </p>
          <Table
            head={["門票", "對象", "票價（官方）", "備註"]}
            rows={priceRows.map((r) => [r.ticket, r.who, <span key="p" style={{ whiteSpace: "nowrap" }}>{r.price}</span>, r.what])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{BANDS_CHECKED_ISO}——<a href={OFFICIAL.bands} target="_blank" rel="noopener">kaiyukan.com/info/group/</a>（價格區間與預約說明）；{CHECKED_ISO}——<a href={OFFICIAL.calendar} target="_blank" rel="noopener">kaiyukan.com/info/ticket/kaiyukan/</a>（浮動票價、價格日曆、身心障礙優惠）與 <a href={OFFICIAL.santaMaria} target="_blank" rel="noopener">suijo-bus.osaka/intro/santamaria/</a>（套票）。
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            以文字列出價格區間的是團體預約頁面，一般門票頁面要在日曆上選日期後才會顯示確切金額。查核的頁面沒有以文字列出 11 月到新年期間的票價，假期日期請直接在日曆上查詢。票價可能變動，購票前請確認您的日期。日本其他景點的門票與各自的查核日期，請見
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              日本景點門票價格總表（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看您日期的海遊館門票 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Klook 的價格也依日期變動，付款前請先查看您日期的商品頁面與取消規定。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>規定與設施</span>
          <h2 className={styles.sectionTitle}>海遊館的入館規定、營業時間與設施有哪些？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            入館需指定日期與時段，再入館已停止，晚間開到 20:00、最後入館 19:00。下表每一項都出自所列的官方頁面，並附上查核日期：
          </p>
          <Table head={["項目", "官方說明", "出處", "查核日"]} rows={factRows.map((r) => [r.item, r.value, r.source, CHECKED])} />
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>選擇門票</span>
          <h2 className={styles.sectionTitle}>海遊館門票該買哪一種？</h2>
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
              在 Klook 查看海遊館門票 →
            </KlookLink>
            <KlookLink href={LEGO_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              搭配隔壁的樂高樂園 →
            </KlookLink>
            <KlookLink href={NIFREL_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              搭配 EXPOCITY 的 NIFREL →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem" }}>
            隔壁的樂高樂園是室內的探索中心，不是戶外樂園。完整的樂園是名古屋的日本樂高樂園，票價、營業時間與從名古屋車站搭青波線的方式，請見
            <Link href="/guides/attractions/legoland-japan-tickets" hrefLang="en" style={linkStyle}>
              日本樂高樂園門票攻略（英文）
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>營業時間與人潮</span>
          <h2 className={styles.sectionTitle}>什麼時候去海遊館最好？</h2>
          <p className={styles.bodyText}>
            <strong>選價格日曆上票價較低的平日，下午三點左右以後入場。</strong>{CHECKED} 查核的官方頁面沒有公布擁擠預測，但預約規定指向同一個方向：成人票價最高（¥3,200）的日子，海遊館只接受 15:00 以後的預約；夜間節目為 <strong>17:00–20:00、最後入館 19:00</strong>，時間依季節調整。
          </p>
          <div style={{ margin: "1rem 0" }}>
            <Table head={["時段", "官方頁面的說明", "對您的意義"]} rows={timingRows.map((r) => [r.when, r.official, r.means])} />
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            最後查核：{CHECKED_ISO}——<a href={OFFICIAL.calendar} target="_blank" rel="noopener">kaiyukan.com/info/ticket/kaiyukan/</a>、<a href={OFFICIAL.bands} target="_blank" rel="noopener">kaiyukan.com/info/group/</a>（預約說明與逛一圈 90–120 分鐘）、<a href={OFFICIAL.ticket} target="_blank" rel="noopener">kaiyukan.com/info/ticket/</a>（售票櫃檯販售）與 <a href={OFFICIAL.night} target="_blank" rel="noopener">kaiyukan.com/program/night/</a>。
          </p>
          <p className={styles.bodyText}>
            營業時間與票價在同一個日曆上逐日公布，官網請遊客自行確認日期。一般模式是 <strong>10:00 開館、20:00 閉館，最後入館為閉館前 1 小時</strong>，休館日是一月與二月的少數幾天（{SET_CHECKED} 查核）。17:00 起燈光與音樂改為夜間節目：同一張門票、同樣的水槽，正是最擁擠的日子價格日曆引導您前往的下午時段。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>參觀時間</span>
          <h2 className={styles.sectionTitle}>參觀海遊館需要多久？</h2>
          <p className={styles.bodyText}>
            <strong>依水族館的說法是 90–120 分鐘。</strong>海遊館的團體頁面以此作為逛完建築一圈的時間（{CHECKED} 查核）：路線先帶您到頂樓，再沿著水槽單向往下，所以只需走一次。如果想在太平洋水槽前多看鯨鯊，或到位於日本海溝水槽後方、部分座位面向水槽的 Cafe R.O.F 坐坐，請再多留一些時間。
          </p>
          <p className={styles.bodyText}>
            這樣一天大部分時間還在。天保山位在海灣邊，最簡單的搭配是港灣區的另一半：摩天輪或聖瑪麗亞號，或是對岸的日本環球影城。
            <Link href="/guides/attractions/osaka-2-day-itinerary" hrefLang="en" style={linkStyle}>
              大阪 2 天行程（英文）
            </Link>
            把海遊館排進完整的一天並規劃好路線，
            <Link href="/guides/attractions/osaka-3-day-itinerary" hrefLang="en" style={linkStyle}>
              大阪 3 天行程（英文）
            </Link>
            把它安排在海灣邊的下午，
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" hrefLang="en" style={linkStyle}>
              大阪與京都 3 天行程（英文）
            </Link>
            則把它當作第 3 天雨天或以小孩為主的選項。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>再入館</span>
          <h2 className={styles.sectionTitle}>海遊館可以再入館嗎？</h2>
          <p className={styles.bodyText}>
            <strong>不行。</strong>海遊館自 <strong>2026 年 6 月 15 日</strong>起停止再入館，於 2026 年 5 月 21 日公布，是為了讓每個時段的入館人數維持穩定、讓遊客能依自己的步調欣賞展示的措施之一（kaiyukan.com/about/news/20564.html，{CHECKED} 查核）。
          </p>
          <p className={styles.bodyText}>
            請在入館前或出館後用餐。飲料店 SEA SAW 位於驗票口前的區域，天保山市場就在隔壁，海遊館大廳與博物館商店旁的置物櫃不用門票也能使用，方便入館前先寄放行李。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>親子</span>
          <h2 className={styles.sectionTitle}>帶嬰兒或幼兒去海遊館方便嗎？</h2>
          <p className={styles.bodyText}>
            <strong>從官方設施清單來看，是方便的。</strong>2 歲以下免費，館內有附尿布台與沖泡奶粉用熱水機的<strong>育嬰室</strong>，另有<strong>哺乳室</strong>。輪椅可在服務台借用。以上皆於 {CHECKED} 在 kaiyukan.com 查核。查核的官方頁面沒有說明嬰兒車規定，如果這會影響您的安排，請在入口詢問。
          </p>
          <p className={styles.bodyText}>
            家庭的安排方式和其他遊客相同，只是更需要做好：預約入場時段，讓小朋友不用在當日票隊伍中排隊；再入館已停止，午睡或用餐要安排在入館前或出館後，而不是中途。如果這趟旅行以小孩為主，
            <Link href="/guides/attractions/where-to-stay-in-osaka" hrefLang="en" style={linkStyle}>
              大阪住宿區域攻略（英文）
            </Link>
            比較了各住宿地點，包括搭 Captain Line 渡輪短短一程就到水族館的環球城。
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>購票步驟</span>
          <h2 className={styles.sectionTitle}>大阪海遊館門票需要事先購買嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>不是必須，但建議事先購買。</strong>售票櫃檯只賣當日票，並提醒可能買不到想要的入場時段；官方指定日期與時段的電子票約 30 天前開賣（kaiyukan.com/info/ticket/，{CHECKED} 查核）。購票步驟如下：
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
              在 Klook 查看海遊館門票 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="同一天一起預訂"
          heading="去海遊館那天還可以預訂什麼？"
          intro="在水族館待兩到三小時，一天還剩很多時間；不包含海遊館的周遊卡，在另一天仍然划算。以下都可以用購買門票的同一個 Klook 帳號預訂。"
          items={sameDayPrepItems}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>套票與周邊</span>
          <h2 className={styles.sectionTitle}>海遊館附近可以搭配哪些景點？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>最容易搭配的是聖瑪麗亞號港灣遊船：</strong>在水族館旁的碼頭上船，約 45 分鐘。水族館販售三種官方套票：聖瑪麗亞號、Captain Line 渡輪與樂高樂園；大阪周遊卡包含摩天輪、遊船與 Captain Line，但不包含海遊館本身：
          </p>
          <Table
            head={["項目", "時間", "票價（官方）", "大阪周遊卡", "須知"]}
            rows={nearbyRows.map((r) => [r.what, r.time, r.price, r.pass, r.note])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{CHECKED_ISO}——<a href={OFFICIAL.santaMaria} target="_blank" rel="noopener">suijo-bus.osaka/intro/santamaria/</a>（遊船票價、航程時間、碼頭）、<a href={OFFICIAL.amazingPass} target="_blank" rel="noopener">osaka-amazing-pass.com/en/service_free.html</a>（營業時間、休業日、清單上的票價與周遊卡適用範圍）、<a href={OFFICIAL.captainLine} target="_blank" rel="noopener">kaiyukan.com/thv/captline/</a> 與 <a href={OFFICIAL.harbor} target="_blank" rel="noopener">kaiyukan.com/thv/general/</a>（船程時間、摩天輪高度）。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SANTA_MARIA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看聖瑪麗亞號遊船 →
            </KlookLink>
            <KlookLink href={LEGO_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看海遊館 + 樂高樂園 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            也請注意水族館套票清單上<strong>沒有</strong>的項目。<strong>天保山大摩天輪</strong>高 112.5 公尺，是世界最大級的摩天輪之一，與水族館同在 Harbor Village，但由其他公司營運，所以沒有官方的水族館 + 摩天輪組合，摩天輪請當天購票。如果您的行程包含日本環球影城，<strong>Captain Line</strong> 套票值得多看一眼：從環球城碼頭搭船 10 分鐘就到水族館門口，把海灣兩岸的兩個景點變成同一個下午的行程。日本環球影城本身需要預訂的項目，請見
            <Link href="/zh-tw/guides/attractions/usj-tickets-express-pass" style={linkStyle}>
              日本環球影城門票與快速通關攻略
            </Link>
            ；搭一趟船就到的環球城飯店比較，請見
            <Link href="/guides/attractions/usj-hotels" hrefLang="en" style={linkStyle}>
              日本環球影城飯店攻略（英文）
            </Link>
            。套票與摩天輪 112.5 公尺的高度於 {CHECKED} 在 kaiyukan.com 查核。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>怎麼去海遊館？</h2>
          <p className={styles.bodyText}>
            搭大阪地鐵<strong>中央線到大阪港站</strong>，水族館稱這一站為「大阪港駅（海遊館前）」，意思是「海遊館前的大阪港站」，從<strong> 1 號出口步行約 5 分鐘</strong>。幾乎所有遊客都走這條路線；中央線穿過市中心，從本町站可直達，其他市中心車站大多轉一次車即可。
            <Link href="/guides/transport/osaka-transportation" hrefLang="en" style={linkStyle}>
              大阪交通攻略（英文）
            </Link>
            說明中央線與其他路線的關係，
            <Link href="/guides/transport/osaka-metro-pass" hrefLang="en" style={linkStyle}>
              大阪地鐵周遊卡攻略（英文）
            </Link>
            則計算像這樣的一天，買 1 日券是否比刷 IC 卡划算。
          </p>
          <p className={styles.bodyText}>
            官方交通頁面還列出另外三種方式：從環球城碼頭出發、直接停靠入口前海遊館西碼頭的 <strong>Captain Line</strong> 渡輪；停靠「天保山 Harbor Village」站的大阪市營巴士，以及停靠「海遊館（天保山）」站的南海巴士，兩站都離入口幾步路；開車則有約 1,000 個停車位。以上皆於 {CHECKED} 查核。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>周遊卡問題</span>
          <h2 className={styles.sectionTitle}>大阪周遊卡可以進海遊館嗎？</h2>
          <p className={styles.bodyText}>
            <strong>不行。</strong>海遊館不在周遊卡的合作設施清單上（osaka-amazing-pass.com，{CHECKED} 查核），也是周遊卡沒有包含的設施中最貴的一個。周遊卡（1 日券 ¥3,500、2 日券 ¥5,000）包含大阪地鐵與市營巴士無限搭乘，以及約 40 個設施免費入場，包括大阪城、梅田藍天大廈展望台與各條河川遊船（其中的
            <Link href="/zh-tw/guides/attractions/dotonbori-river-cruise" style={linkStyle}>
              道頓堀遊船
            </Link>
            不用周遊卡為 ¥2,000），以及水族館旁的天保山大摩天輪、聖瑪麗亞號白天航程與 Captain Line。日本環球影城也不在清單上。完整的設施清單與回本計算，請見
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              大阪周遊卡攻略（英文）
            </Link>
            。
          </p>
          <p className={styles.bodyText}>
            因此重點在於行程安排，而不是金額。一天之內走三、四個周遊卡設施的市區觀光日，周遊卡才划算；以海遊館為主的一天則不然，為了這天多買一天周遊卡，付的錢大多用不到。比較有效率的安排是用周遊卡逛市區一天，再用不含周遊卡的一天去大型景點，
            <Link href="/guides/attractions/things-to-do-osaka" hrefLang="en" style={linkStyle}>
              大阪必去景點攻略（英文）
            </Link>
            依兩到三天的行程整理了這種安排。如果您仍想一次結帳，Klook 販售附海遊館門票的大阪周遊卡，是唯一這樣組合的商品。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看大阪周遊卡 + 海遊館 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              只買水族館門票 →
            </KlookLink>
          </div>
        </section>

        <div data-placement="kaiyukan-highrate-faq">
          <KlookTripPrep
            label="同一趟旅行"
            heading="同一趟旅行還可以預訂哪些大阪景點？"
            intro="海遊館參觀兩到三小時，當晚或隔天還能安排大阪城或梅田展望台。這兩處都包含在大阪周遊卡內，所以以下是給沒有買周遊卡的行程。"
            items={highRateItems}
            adPlacement="kaiyukan-highrate-faq"
          />
        </div>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            海遊館的姊妹館
            <Link href="/guides/attractions/nifrel-osaka-tickets" hrefLang="en" style={linkStyle}>
              NIFREL（英文）
            </Link>
            位於吹田市的 EXPOCITY，成人 ¥2,400，2027 年 1 月 19–20 日休館。
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            在四國，香川縣的
            <Link href="/guides/attractions/shikoku-aquarium-tickets" hrefLang="en" style={linkStyle}>
              四國水族館（英文）
            </Link>
            成人 ¥2,600，國小與國中學生 ¥1,400。
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            隔壁天保山市場內的
            <Link href="/guides/attractions/legoland-discovery-center-osaka-tickets" hrefLang="en" style={linkStyle}>
              大阪樂高樂園探索中心（英文）
            </Link>
            ，3 歲以上線上購票 ¥2,900–3,300。
          </p>
        </section>
        <EsimCtaBottom />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="海遊館門票常見問題" />

        <KlookTourPicks
          heading="大阪一天的其他時間"
          intro="海遊館只佔一天中的兩到三小時，還有半天可以安排；而天保山離多數人想去的大阪市中心有一段距離。這個行程涵蓋大阪城、道頓堀與新世界一帶。Klook 價格依日期變動，請打開商品頁面查看目前價格與集合地點。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "沖繩美麗海水族館門票 2026：票價、營業時間與交通（英文）" },
            { href: "/zh-tw/guides/attractions/osaka-castle-tickets", title: "大阪城天守閣門票 2026：票價、開放時間與御座船" },
            { href: "/zh-tw/guides/attractions/umeda-sky-building-tickets", title: "梅田藍天大廈門票（2026）：票價、開放時間與最佳時段" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周遊卡 2026：¥3,500 值得買嗎？附一日行程（英文）" },
            { href: "/zh-tw/guides/attractions/usj-tickets-express-pass", title: "日本環球影城門票與快速通關（2026）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪必去景點（2026）：周遊卡划算與不划算的地方（英文）" },
            { href: "/guides/transport/osaka-transportation", title: "大阪交通攻略（2026）：地鐵、電車與 IC 卡（英文）" },
            { href: "/guides/transport/osaka-metro-pass", title: "大阪地鐵周遊卡 2026：1 日券與 2 日券比較（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景點門票價格 2026：官方票價與預約規定（英文）" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>選好入場時段，而不只是日期</h2>
            <p className={styles.ctaBannerDesc}>
              票價依日期變動，人潮依時段變動，所以入場時段才是值得好好決定的事。事先購票可使用中文結帳畫面與可用的境外信用卡，入場時掃碼即可，不必在售票櫃檯排隊。付款前請確認您日期顯示的取消期限。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看海遊館門票 →
              </KlookLink>
              <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                搭配大阪周遊卡 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
