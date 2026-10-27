import Head from "next/head";
import Link from "next/link";
import styles from "../styles/BestEsimJapan.module.css";
import { seoTags } from "./IntlSeo";
import {
  KLOOK_REL,
  Breadcrumb,
  Disclosure,
  FaqList,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "./IntlChrome";
import KlookLink from "./KlookLink";
import { zhKlookEsim, zhTokyoSubwayTicket } from "../lib/klook-links-zh-tw";
import { cnKlookEsim, cnTokyoSubwayTicket } from "../lib/klook-links-zh-cn";
import { koKlookEsim, koShibuyaSky } from "../lib/klook-links-ko";
import { thKlookEsim, thShibuyaSky } from "../lib/klook-links-th";
import { attractionPrices, latestChecked } from "../lib/attraction-prices";
import { itemListJsonLd } from "../lib/structured-data";
import {
  HOME_GROUP,
  JSONLD_LANG,
  LOCALE_HOME,
  PAGE_GROUPS,
  dateLabel,
  pairFor,
  routeOf,
  titleOf,
  type TranslatedLocale,
} from "../lib/i18n";

/**
 * The entry page of a translated edition — /zh-tw, /zh-cn, /ko and /th.
 *
 * Added 2026-10-21 (task jtk-20261021-A04) to answer a plain complaint: there was no
 * way to choose a language from the site. The switch in the header only appeared on
 * the ten pages that had a translation, so a reader on the English home page, or on
 * any of the sixty-odd English-only articles, could not reach 繁體中文 at all. A
 * switch needs somewhere to point when the current page has no translation, and this
 * is it: one page per edition, listing every page that edition has, grouped the way
 * the English home page groups its categories, plus labelled links into the English
 * guides for everything that is not translated yet.
 *
 * All four editions are one component with four copy records, the same arrangement
 * Header, Footer and IntlChrome already use — the structure is identical and only the
 * words differ, and holding them side by side is what stops one edition quietly
 * drifting out of step with the others.
 *
 * Deliberately *not* a second copy of /zh-tw/guides/attractions. That page is the
 * ticket-topic hub: long body copy about why Japanese attractions sell out and how
 * the booking rules work. This one is the edition's directory — a short framing, then
 * the list — and it links to the hub as one of its cards.
 */

type Group = {
  /** Anchor id, so other pages can deep-link a group. */
  key: string;
  label: string;
  desc: string;
  /** Routes of this edition, in render order. */
  routes: string[];
};

type EnglishLink = { href: string; label: string };

type Copy = {
  eyebrow: string;
  /** H1, split where it should break. The <title> comes from lib/i18n.ts. */
  titleLines: string[];
  subtitle: string;
  badges: string[];
  desc: string;
  introLabel: string;
  introTitle: string;
  intro: string[];
  /** The line under the intro naming the price-check count and date. */
  checkedNote: (count: number, date: string) => string;
  groups: Group[];
  blurbs: Record<string, string>;
  /** "更新於 2026年10月｜看攻略 →" — the card's footer line. */
  cardFooter: (updated: string) => string;
  englishLabel: string;
  englishTitle: string;
  englishIntro: string;
  englishLinks: EnglishLink[];
  prepLabel: string;
  prepTitle: string;
  prepText: string;
  klook: { label: string; url: string }[];
  faq: FaqItem[];
  itemListName: string;
};

/** How many pages an edition has, this entry page included. */
const pageCount = (locale: TranslatedLocale) =>
  PAGE_GROUPS.filter((p) => routeOf(p, locale) !== null).length;

/** The English destinations every edition offers, in each edition's own wording. */
const englishHubs = (suffix: string): EnglishLink[] => [
  { href: "/guides/attractions", label: `Things to Do in Japan${suffix}` },
  { href: "/guides/transport", label: `Getting Around${suffix}` },
  { href: "/guides/esim", label: `eSIM & SIM Cards${suffix}` },
  { href: "/guides/money", label: `Money & Payment${suffix}` },
  { href: "/guides", label: `All Guides${suffix}` },
];

const COPY: Record<TranslatedLocale, Copy> = {
  // ── 繁體中文 ──────────────────────────────────────────────────────────────
  "zh-tw": {
    eyebrow: "繁體中文版",
    titleLines: ["日本旅遊實用指南（2026）：", "門票、交通、網卡"],
    subtitle: "哪幾張票一定要先訂、從海外行得通的購票管道，以及落地那天的交通與上網。",
    badges: ["官方票價", "附查核日期", `${pageCount("zh-tw")} 頁繁體中文`],
    desc:
      "Japan Travel Kit 繁體中文版：日本景點門票、東京迪士尼與日本環球影城的預約規則、" +
      "富士山一日遊、成田機場到東京的交通，以及日本網卡比較。票價讀自業者官網並標示查核日期。",
    introLabel: "從這裡開始",
    introTitle: "日本的門票，問題不在價格",
    intro: [
      "日本幾個最有名的景點，門口是買不到票的。teamLab、東京迪士尼、日本環球影城與澀谷SKY 的日落場，全都在線上販售指定日期或指定時段的票，熱門時段數週前就沒了。",
      "另外兩件事特別容易踩雷：日本官方售票網站有時刷不過海外發行的信用卡，而搜尋結果裡排名很前面的轉售頁面，常常是入場時無效的票。這些攻略寫的是官方票價、從海外行得通的購票管道，以及該什麼時候訂。",
      "日本也有很多地方完全不需要這些。京都多數知名寺院可以直接走進去，奈良公園免費。重點是把規劃的力氣花在真的會影響結果的地方。",
    ],
    checkedNote: (count, date) =>
      `本站目前已查核 ${count} 項日本景點、主題樂園、通票與一日遊的官方入場費用，最近一次查核是 ${date}。繁體中文版與英文版用的是同一組資料與同一個查核日。`,
    groups: [
      {
        key: "tickets",
        label: "門票與景點",
        desc: "單一場館的入場券——指定時段的美術館與展望台。",
        routes: [
          "/zh-tw/guides/attractions/shibuya-sky-tickets",
          "/zh-tw/guides/attractions/teamlab-tokyo-tickets",
          "/zh-tw/guides/attractions/teamlab-borderless-tickets",
        ],
      },
      {
        key: "parks",
        label: "主題樂園",
        desc: "東京迪士尼與日本環球影城：票種、快速通關，以及從海外怎麼買。",
        routes: [
          "/zh-tw/guides/attractions/tokyo-disney-tickets",
          "/zh-tw/guides/attractions/usj-tickets-express-pass",
        ],
      },
      {
        key: "daytrips",
        label: "一日遊",
        desc: "整天出城的行程，要選的是哪一條路線，而不是哪一張票。",
        routes: ["/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo"],
      },
      {
        key: "cities",
        label: "城市與總覽",
        desc: "東京哪些要先訂票、哪些可以直接去，以及繁體中文版的門票總覽。",
        routes: [
          "/zh-tw/guides/attractions/things-to-do-tokyo",
          "/zh-tw/guides/attractions",
        ],
      },
      {
        key: "prep",
        label: "行前準備",
        desc: "落地那天就會用到的兩件事：機場到市區的交通，以及手機上網。",
        routes: [
          "/zh-tw/guides/transport/tokyo-airport-transfer",
          "/zh-tw/guides/esim/best-esim-japan",
        ],
      },
    ],
    blurbs: {
      "/zh-tw/guides/attractions/shibuya-sky-tickets":
        "官方票價、為什麼日落場最先賣完，以及海外信用卡刷不過時怎麼訂。",
      "/zh-tw/guides/attractions/teamlab-tokyo-tickets":
        "豐洲 Planets 的票價、30 分鐘入場時段、涉水區該穿什麼，以及和無界的比較。",
      "/zh-tw/guides/attractions/teamlab-borderless-tickets":
        "麻布台之丘的無界：浮動定價怎麼算、指定時段與 Flexible Pass 的差別。",
      "/zh-tw/guides/attractions/tokyo-disney-tickets":
        "每張票都指定日期、門口完全不賣票。怎麼買，以及樂園與海洋怎麼選。",
      "/zh-tw/guides/attractions/usj-tickets-express-pass":
        "一律線上購票，超級任天堂世界需要指定入園時間。快速通關 4／7／8 怎麼挑。",
      "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo":
        "四種行程比較：只跑富士山還是加箱根、五合目是什麼，以及一天要多久。",
      "/zh-tw/guides/attractions/things-to-do-tokyo":
        "真正會賣完的只有四、五樣。哪些要提前訂，哪些可以當天再決定。",
      "/zh-tw/guides/attractions":
        "繁體中文版的景點門票總覽：官方票價、預約方式與一日遊，依類別整理。",
      "/zh-tw/guides/transport/tokyo-airport-transfer":
        "成田與羽田進市區的每個選項，比價格、時間與方便度，附 2026 年車資。",
      "/zh-tw/guides/esim/best-esim-japan":
        "Klook 日本 eSIM，加上 Airalo、Holafly、eSIM Go、Sakura Mobile 的價格比較。",
    },
    cardFooter: (updated) => `更新於 ${updated}｜看攻略 →`,
    englishLabel: "其他語言",
    englishTitle: "還沒翻譯的部分",
    englishIntro:
      "京都與大阪的城市攻略、其他的一日遊、鐵路周遊券、IC 卡、付款與貨幣，以及完整的門票價格總表，目前只有英文版。以下連結都是英文頁：",
    englishLinks: englishHubs("（英文）"),
    prepLabel: "落地那天",
    prepTitle: "兩件先放進口袋的事",
    prepText: "通關之後最先用到的兩樣東西：手機上網，以及市區交通。打開商品頁看目前的方案與價格。",
    klook: [zhKlookEsim, zhTokyoSubwayTicket],
    faq: [
      {
        q: "這個網站有繁體中文版嗎？",
        a: `有，但不是全站。目前繁體中文版共 ${pageCount("zh-tw")} 頁（本頁與 ${pageCount("zh-tw") - 1} 篇攻略），挑的是台灣與香港讀者最常查、也最需要先訂票的那幾個入口。其餘的攻略只有英文版，連結到那些頁面時我們會標示「（英文）」。`,
      },
      {
        q: "怎麼從英文頁切換到繁體中文？",
        a: "每一頁的頁首右上角都有語言選單（地球圖示）。該頁有繁體中文版就直接跳到那一頁；沒有的話會回到這個繁體中文首頁。手機版在選單的最上方，頁尾也有一排語言連結。",
      },
      {
        q: "中文頁的票價和英文頁一樣嗎？",
        a: "一樣。所有價格都讀自業者自己的網站，中文版與英文版共用同一組資料與同一個查核日期，中文頁不會出現英文頁沒有的數字。",
      },
    ],
    itemListName: "日本旅遊實用指南 — Japan Travel Kit 繁體中文版",
  },

  // ── 简体中文 ──────────────────────────────────────────────────────────────
  "zh-cn": {
    eyebrow: "简体中文版",
    titleLines: ["日本旅游实用指南（2026）：", "门票、交通、流量卡"],
    subtitle: "哪几张票一定要先订、从海外行得通的购票渠道，以及落地那天的交通与上网。",
    badges: ["官方票价", "附核查日期", `${pageCount("zh-cn")} 页简体中文`],
    desc:
      "Japan Travel Kit 简体中文版：日本景点门票、东京迪士尼与日本环球影城的预约规则、" +
      "富士山一日游、成田机场到东京的交通，以及日本eSIM比较。票价读自业者官网并标示核查日期。",
    introLabel: "从这里开始",
    introTitle: "日本的门票，问题不在价格",
    intro: [
      "日本几个最有名的景点，门口是买不到票的。teamLab、东京迪士尼、日本环球影城与涩谷SKY 的日落场，全都在线上销售指定日期或指定时段的票，热门时段几周前就没了。",
      "另外两件事特别容易踩坑：日本官方售票网站有时刷不过海外发行的信用卡，而搜索结果里排名很前面的转售页面，常常是入场时无效的票。这些攻略写的是官方票价、从海外行得通的购票渠道，以及该什么时候订。",
      "日本也有很多地方完全不需要这些。京都多数知名寺院可以直接走进去，奈良公园免费。重点是把规划的力气花在真的会影响结果的地方。",
    ],
    checkedNote: (count, date) =>
      `本站目前已核查 ${count} 项日本景点、主题乐园、通票与一日游的官方门票价格，最近一次核查是 ${date}。简体中文版与英文版用的是同一组数据与同一个核查日。`,
    groups: [
      {
        key: "tickets",
        label: "门票与景点",
        desc: "单一场馆的入场券——指定时段的美术馆与观景台。",
        routes: [
          "/zh-cn/guides/attractions/shibuya-sky-tickets",
          "/zh-cn/guides/attractions/teamlab-tokyo-tickets",
          "/zh-cn/guides/attractions/teamlab-borderless-tickets",
        ],
      },
      {
        key: "parks",
        label: "主题乐园",
        desc: "东京迪士尼与日本环球影城：票种、快速通行证，以及从海外怎么买。",
        routes: [
          "/zh-cn/guides/attractions/tokyo-disney-tickets",
          "/zh-cn/guides/attractions/usj-tickets-express-pass",
        ],
      },
      {
        key: "daytrips",
        label: "一日游",
        desc: "整天出城的行程，要选的是哪一条路线，而不是哪一张票。",
        routes: ["/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo"],
      },
      {
        key: "cities",
        label: "城市与总览",
        desc: "东京哪些要先订票、哪些可以直接去，以及简体中文版的门票总览。",
        routes: [
          "/zh-cn/guides/attractions/things-to-do-tokyo",
          "/zh-cn/guides/attractions",
        ],
      },
      {
        key: "prep",
        label: "行前准备",
        desc: "落地那天就会用到的两件事：机场到市区的交通，以及手机上网。",
        routes: [
          "/zh-cn/guides/transport/tokyo-airport-transfer",
          "/zh-cn/guides/esim/best-esim-japan",
        ],
      },
    ],
    blurbs: {
      "/zh-cn/guides/attractions/shibuya-sky-tickets":
        "官方票价、为什么日落场最先卖完，以及海外信用卡刷不过时怎么订。",
      "/zh-cn/guides/attractions/teamlab-tokyo-tickets":
        "丰洲 Planets 的票价、30 分钟入场时段、涉水区该穿什么，以及和无界的比较。",
      "/zh-cn/guides/attractions/teamlab-borderless-tickets":
        "麻布台之丘的无界：浮动定价怎么算、指定时段与 Flexible Pass 的差别。",
      "/zh-cn/guides/attractions/tokyo-disney-tickets":
        "每张票都指定日期、门口完全不卖票。怎么买，以及乐园与海洋怎么选。",
      "/zh-cn/guides/attractions/usj-tickets-express-pass":
        "一律在线购票，超级任天堂世界需要指定入园时间。快速通行证 4／7／8 怎么挑。",
      "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo":
        "四种行程比较：只跑富士山还是加箱根、五合目是什么，以及一天要多久。",
      "/zh-cn/guides/attractions/things-to-do-tokyo":
        "真正会卖完的只有四、五样。哪些要提前订，哪些可以当天再决定。",
      "/zh-cn/guides/attractions":
        "简体中文版的景点门票总览：官方票价、预约方式与一日游，按类别整理。",
      "/zh-cn/guides/transport/tokyo-airport-transfer":
        "成田与羽田进市区的每个选项，比价格、时间与方便度，附 2026 年票价。",
      "/zh-cn/guides/esim/best-esim-japan":
        "Klook 日本 eSIM，加上 Airalo、Holafly、eSIM Go、Sakura Mobile 的价格比较。",
    },
    cardFooter: (updated) => `更新于 ${updated}｜看攻略 →`,
    englishLabel: "其他语言",
    englishTitle: "还没翻译的部分",
    englishIntro:
      "京都与大阪的城市攻略、其他的一日游、铁路周游券、IC 卡、支付与货币，以及完整的门票价格总表，目前只有英文版。以下链接都是英文页：",
    englishLinks: englishHubs("（英文）"),
    prepLabel: "落地那天",
    prepTitle: "两件先放进口袋的事",
    prepText: "过关之后最先用到的两样东西：手机上网，以及市区交通。打开商品页看目前的方案与价格。",
    klook: [cnKlookEsim, cnTokyoSubwayTicket],
    faq: [
      {
        q: "这个网站有简体中文版吗？",
        a: `有，但不是全站。目前简体中文版共 ${pageCount("zh-cn")} 页（本页与 ${pageCount("zh-cn") - 1} 篇攻略），挑的是销售与点击实绩最高、也最需要提前订票的那几个入口。其余的攻略只有英文版，链接到那些页面时我们会标示「（英文）」。`,
      },
      {
        q: "怎么从英文页切换到简体中文？",
        a: "每一页的页首右上角都有语言菜单（地球图标）。该页有简体中文版就直接跳到那一页；没有的话会回到这个简体中文首页。手机版在菜单的最上方，页脚也有一排语言链接。",
      },
      {
        q: "中文页的票价和英文页一样吗？",
        a: "一样。所有价格都读自业者自己的网站，中文版与英文版共用同一组数据与同一个核查日期，中文页不会出现英文页没有的数字。",
      },
    ],
    itemListName: "日本旅游实用指南 — Japan Travel Kit 简体中文版",
  },

  // ── 한국어 ────────────────────────────────────────────────────────────────
  ko: {
    eyebrow: "한국어판",
    titleLines: ["일본 여행 준비 가이드(2026):", "티켓, 교통, eSIM"],
    subtitle: "미리 예약해야 하는 입장권, 해외 카드로도 결제되는 예약 경로, 그리고 도착 당일에 필요한 것들.",
    badges: ["공식 요금", "확인 날짜 표기", `한국어 ${pageCount("ko")}페이지`],
    desc:
      "Japan Travel Kit 한국어판: 시부야 스카이와 팀랩 플래닛 예약, 도쿄 디즈니랜드 티켓, " +
      "유니버설 스튜디오 재팬 익스프레스 패스, 일본 이심 비교. 요금은 운영사 공식 사이트에서 읽고 확인 날짜를 적어 둡니다.",
    introLabel: "먼저 읽어 보세요",
    introTitle: "일본 입장권은 가격보다 '언제 파는지'가 문제입니다",
    intro: [
      "일본에서 가장 유명한 몇 곳은 현장에서 티켓을 살 수 없습니다. 팀랩, 도쿄 디즈니랜드, 유니버설 스튜디오 재팬, 시부야 스카이의 일몰 시간대는 모두 날짜·시간 지정 티켓을 온라인으로만 팔고, 인기 시간대는 몇 주 전에 마감됩니다.",
      "함정은 두 가지입니다. 일본 공식 예매 사이트가 해외 발급 카드를 거부하는 경우가 있고, 검색 상위에 올라오는 재판매 페이지는 입장 시점에 쓸 수 없는 티켓인 경우가 많습니다. 이 가이드는 공식 요금, 해외에서 실제로 되는 예약 경로, 그리고 언제 예약해야 하는지를 다룹니다.",
      "반대로 예약이 전혀 필요 없는 곳도 많습니다. 교토의 유명 사찰은 대부분 그냥 들어갈 수 있고, 나라공원은 무료입니다. 준비는 결과가 달라지는 곳에만 쓰면 됩니다.",
    ],
    checkedNote: (count, date) =>
      `이 사이트는 현재 일본의 관광지·테마파크·패스·근교 투어 ${count}건의 공식 입장 요금을 확인해 두었고, 가장 최근 확인은 ${date}입니다. 한국어판과 영어판은 같은 데이터와 같은 확인 날짜를 씁니다.`,
    groups: [
      {
        key: "tickets",
        label: "입장권",
        desc: "시간대를 지정해서 파는 전망대와 미술관 — 공식 요금과 예약 방법.",
        routes: [
          "/ko/guides/attractions/shibuya-sky-tickets",
          "/ko/guides/attractions/teamlab-tokyo-tickets",
        ],
      },
      {
        key: "parks",
        label: "테마파크",
        desc: "도쿄 디즈니랜드와 유니버설 스튜디오 재팬: 티켓 종류와 해외에서 사는 방법.",
        routes: [
          "/ko/guides/attractions/tokyo-disney-tickets",
          "/ko/guides/attractions/usj-tickets-express-pass",
        ],
      },
      {
        key: "prep",
        label: "여행 준비",
        desc: "도착해서 가장 먼저 쓰는 것 — 휴대폰 데이터.",
        routes: ["/ko/guides/esim/best-esim-japan"],
      },
    ],
    blurbs: {
      "/ko/guides/attractions/shibuya-sky-tickets":
        "공식 요금, 일몰 시간대가 가장 먼저 마감되는 이유, 해외 카드가 막힐 때의 예약 방법.",
      "/ko/guides/attractions/teamlab-tokyo-tickets":
        "도요스 플래닛의 요금과 30분 단위 입장 시간, 물에 들어가는 구역 복장, 보더리스와 비교.",
      "/ko/guides/attractions/tokyo-disney-tickets":
        "모든 티켓이 날짜 지정이고 현장 판매는 없습니다. 구매 방법과 랜드·씨 선택 기준.",
      "/ko/guides/attractions/usj-tickets-express-pass":
        "전면 온라인 판매, 슈퍼 닌텐도 월드는 입장 시간 지정. 익스프레스 패스 4·7·8 선택법.",
      "/ko/guides/esim/best-esim-japan":
        "클룩 일본 eSIM과 Airalo·Holafly·eSIM Go·Sakura Mobile의 요금·회선 비교.",
    },
    cardFooter: (updated) => `${updated} 업데이트｜가이드 보기 →`,
    englishLabel: "다른 언어",
    englishTitle: "아직 번역되지 않은 부분",
    englishIntro:
      "교토·오사카 도시 가이드, 근교 투어, JR 패스, IC 카드, 결제와 환전, 그리고 전체 입장 요금표는 현재 영어판만 있습니다. 아래 링크는 모두 영어 페이지입니다:",
    englishLinks: englishHubs("(영어)"),
    prepLabel: "도착 당일",
    prepTitle: "먼저 챙겨 두면 되는 두 가지",
    prepText: "입국 심사를 지나면 바로 필요한 것: 휴대폰 데이터와 첫 입장권. 현재 요금은 상품 페이지에서 확인하세요.",
    klook: [koKlookEsim, koShibuyaSky],
    faq: [
      {
        q: "이 사이트는 전체가 한국어인가요?",
        a: `아니요. 현재 한국어판은 이 페이지와 가이드 ${pageCount("ko") - 1}편, 모두 ${pageCount("ko")}페이지입니다. 한국 여행자가 가장 많이 찾고 미리 예약해야 하는 입장권을 중심으로 골랐습니다. 나머지 가이드는 영어판만 있고, 그런 링크에는 "(영어)"를 붙여 둡니다.`,
      },
      {
        q: "영어 페이지에서 한국어로 어떻게 바꾸나요?",
        a: "모든 페이지 헤더 오른쪽에 지구 아이콘 언어 메뉴가 있습니다. 그 페이지에 한국어판이 있으면 바로 이동하고, 없으면 이 한국어 첫 페이지로 옵니다. 모바일에서는 메뉴 맨 위에 있고, 푸터에도 언어 링크가 있습니다.",
      },
      {
        q: "요금은 영어판과 같나요?",
        a: "같습니다. 모든 요금은 운영사 공식 사이트에서 읽은 값이고, 확인 날짜까지 영어판과 동일한 데이터를 씁니다. 한국어 페이지에만 있는 숫자는 없습니다.",
      },
    ],
    itemListName: "일본 여행 준비 가이드 — Japan Travel Kit 한국어판",
  },

  // ── ไทย ───────────────────────────────────────────────────────────────────
  th: {
    eyebrow: "ฉบับภาษาไทย",
    titleLines: ["ไกด์เที่ยวญี่ปุ่น 2026:", "ตั๋ว การเดินทาง และ eSIM"],
    subtitle: "ตั๋วที่ต้องจองล่วงหน้า ช่องทางจองที่ใช้ได้จากต่างประเทศ และสิ่งที่ต้องมีในวันที่เครื่องลง",
    badges: ["ราคาทางการ", "ระบุวันที่ตรวจสอบ", `ภาษาไทย ${pageCount("th")} หน้า`],
    desc:
      "Japan Travel Kit ฉบับภาษาไทย: ตั๋ว Shibuya Sky และ teamLab Planets, บัตรดิสนีย์แลนด์โตเกียว, " +
      "Express Pass USJ และการเทียบ eSIM ญี่ปุ่น ราคาทุกตัวอ่านจากเว็บไซต์ของผู้ให้บริการ พร้อมวันที่ตรวจสอบ",
    introLabel: "เริ่มที่นี่",
    introTitle: "เรื่องของตั๋วญี่ปุ่นไม่ใช่ราคา แต่เป็นเวลาที่ขาย",
    intro: [
      "สถานที่ดังหลายแห่งในญี่ปุ่นไม่ขายตั๋วที่หน้างาน teamLab, ดิสนีย์แลนด์โตเกียว, ยูนิเวอร์แซลสตูดิโอ และรอบพระอาทิตย์ตกของ Shibuya Sky ขายเป็นตั๋วระบุวันหรือระบุรอบเวลาทางออนไลน์เท่านั้น และรอบยอดนิยมเต็มล่วงหน้าหลายสัปดาห์",
      "มีสองอย่างที่ทำให้พลาดได้ง่าย เว็บไซต์จำหน่ายตั๋วทางการของญี่ปุ่นบางเว็บไม่รับบัตรเครดิตที่ออกจากต่างประเทศ และหน้าขายต่อที่ติดอันดับบนสุดในผลค้นหามักเป็นตั๋วที่ใช้เข้าไม่ได้ ไกด์เหล่านี้เขียนถึงราคาทางการ ช่องทางจองที่ใช้ได้จริงจากต่างประเทศ และควรจองเมื่อไร",
      "ในทางกลับกัน หลายที่ไม่ต้องจองเลย วัดดังในเกียวโตส่วนใหญ่เดินเข้าได้เลย และสวนนาราเข้าฟรี ควรใช้แรงวางแผนกับเรื่องที่เปลี่ยนผลลัพธ์จริง ๆ เท่านั้น",
    ],
    checkedNote: (count, date) =>
      `เว็บไซต์นี้ตรวจสอบค่าเข้าทางการของสถานที่ท่องเที่ยว สวนสนุก บัตรพาส และทัวร์วันเดียวในญี่ปุ่นแล้ว ${count} รายการ ตรวจสอบครั้งล่าสุด ${date} ฉบับภาษาไทยและฉบับภาษาอังกฤษใช้ข้อมูลชุดเดียวกันและวันที่ตรวจสอบเดียวกัน`,
    groups: [
      {
        key: "tickets",
        label: "ตั๋วเข้าชม",
        desc: "จุดชมวิวและพิพิธภัณฑ์ที่ขายเป็นรอบเวลา — ราคาทางการและวิธีจอง",
        routes: [
          "/th/guides/attractions/shibuya-sky-tickets",
          "/th/guides/attractions/teamlab-tokyo-tickets",
        ],
      },
      {
        key: "parks",
        label: "สวนสนุก",
        desc: "ดิสนีย์แลนด์โตเกียวและยูนิเวอร์แซลสตูดิโอ: ประเภทบัตร และวิธีซื้อจากต่างประเทศ",
        routes: [
          "/th/guides/attractions/tokyo-disney-tickets",
          "/th/guides/attractions/usj-tickets-express-pass",
        ],
      },
      {
        key: "prep",
        label: "เตรียมทริป",
        desc: "สิ่งแรกที่ได้ใช้หลังเครื่องลง — เน็ตมือถือ",
        routes: ["/th/guides/esim/best-esim-japan"],
      },
    ],
    blurbs: {
      "/th/guides/attractions/shibuya-sky-tickets":
        "ราคาทางการ เหตุผลที่รอบพระอาทิตย์ตกเต็มก่อน และวิธีจองเมื่อบัตรต่างประเทศถูกปฏิเสธ",
      "/th/guides/attractions/teamlab-tokyo-tickets":
        "ราคาของ Planets ที่โทโยสุ รอบเข้าชมทุก 30 นาที การแต่งตัวสำหรับโซนลุยน้ำ และเทียบกับ Borderless",
      "/th/guides/attractions/tokyo-disney-tickets":
        "บัตรทุกใบระบุวัน และไม่มีขายที่ประตู วิธีซื้อ และเลือกระหว่างแลนด์กับซี",
      "/th/guides/attractions/usj-tickets-express-pass":
        "ขายออนไลน์ทั้งหมด Super Nintendo World ต้องระบุเวลาเข้า และเลือก Express Pass 4／7／8",
      "/th/guides/esim/best-esim-japan":
        "eSIM ญี่ปุ่นของ Klook พร้อมเทียบราคาและเครือข่ายกับ Airalo, Holafly, eSIM Go และ Sakura Mobile",
    },
    cardFooter: (updated) => `อัปเดต ${updated}｜ดูไกด์ →`,
    englishLabel: "ภาษาอื่น",
    englishTitle: "ส่วนที่ยังไม่ได้แปล",
    englishIntro:
      "ไกด์เมืองเกียวโตและโอซาก้า ทัวร์วันเดียวอื่น ๆ JR Pass บัตร IC การจ่ายเงินและแลกเงิน รวมถึงตารางราคาตั๋วฉบับเต็ม ยังมีเฉพาะภาษาอังกฤษ ลิงก์ด้านล่างเป็นหน้าภาษาอังกฤษทั้งหมด:",
    englishLinks: englishHubs(" (อังกฤษ)"),
    prepLabel: "วันที่เครื่องลง",
    prepTitle: "สองอย่างที่ควรเตรียมไว้ก่อน",
    prepText: "สิ่งที่ได้ใช้ทันทีหลังผ่าน ตม.: เน็ตมือถือ และตั๋วใบแรก ดูแพ็กเกจและราคาปัจจุบันได้ที่หน้าสินค้า",
    klook: [thKlookEsim, thShibuyaSky],
    faq: [
      {
        q: "เว็บไซต์นี้เป็นภาษาไทยทั้งหมดไหม",
        a: `ยังไม่ทั้งหมด ปัจจุบันฉบับภาษาไทยมี ${pageCount("th")} หน้า (หน้านี้กับไกด์อีก ${pageCount("th") - 1} บท) เลือกจากตั๋วที่นักท่องเที่ยวไทยค้นหามากที่สุดและต้องจองล่วงหน้า ไกด์ที่เหลือมีเฉพาะภาษาอังกฤษ และเราจะกำกับลิงก์เหล่านั้นว่า "(อังกฤษ)"`,
      },
      {
        q: "เปลี่ยนจากหน้าภาษาอังกฤษเป็นภาษาไทยได้อย่างไร",
        a: "ทุกหน้ามีเมนูภาษา (ไอคอนลูกโลก) ที่มุมขวาของส่วนหัว ถ้าหน้านั้นมีฉบับภาษาไทยจะพาไปหน้านั้นทันที ถ้าไม่มีจะกลับมาที่หน้าแรกภาษาไทยนี้ บนมือถืออยู่บนสุดของเมนู และที่ท้ายหน้าก็มีลิงก์ภาษาด้วย",
      },
      {
        q: "ราคาตรงกับฉบับภาษาอังกฤษไหม",
        a: "ตรงกัน ราคาทุกตัวอ่านจากเว็บไซต์ของผู้ให้บริการเอง ฉบับภาษาไทยใช้ข้อมูลชุดเดียวกันและวันที่ตรวจสอบเดียวกับฉบับภาษาอังกฤษ ไม่มีตัวเลขใดที่มีเฉพาะในหน้าภาษาไทย",
      },
    ],
    itemListName: "ไกด์เที่ยวญี่ปุ่น — Japan Travel Kit ฉบับภาษาไทย",
  },
};

/**
 * Every route an edition's entry page links to, in render order.
 *
 * Exported because the four pages need it in their getStaticProps, to look up each
 * card's "Updated" month. That lookup cannot live here: lib/page-dates reads git
 * history through node:fs and node:child_process, and this component is in the client
 * bundle, so importing it here breaks the build. In a page file the same import is
 * dropped along with getStaticProps, which is how the Chinese hubs do it too.
 */
export function localeHomeRoutes(locale: TranslatedLocale): string[] {
  return COPY[locale].groups.flatMap((g) => g.routes);
}

export default function LocaleHome({
  locale,
  dates,
}: {
  locale: TranslatedLocale;
  dates: Record<string, string>;
}) {
  const copy = COPY[locale];
  const route = LOCALE_HOME[locale];
  // The <title> lives in lib/i18n.ts beside the other sides of the group, so the
  // switch, the hreflang set and this page's own head can never disagree about it.
  const title = titleOf(HOME_GROUP, locale) ?? "";
  const trail: Crumb[] = [{ label: copy.eyebrow }];
  const routes = localeHomeRoutes(locale);

  /** A card's heading — the translated <title> of the page it points at. */
  const cardTitle = (target: string) => {
    const pair = pairFor(target);
    return (pair && titleOf(pair, locale)) || target;
  };

  return (
    <>
      <Head>
        {seoTags({ route, title, desc: copy.desc })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(copy.faq) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, route) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: itemListJsonLd({
              route,
              name: copy.itemListName,
              description: copy.desc,
              inLanguage: JSONLD_LANG[locale],
              items: routes.map((target) => ({ href: target, title: cardTitle(target) })),
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.heroTitle}>
            {copy.titleLines.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.heroSubtitle}>{copy.subtitle}</p>
          <div className={styles.heroBadges}>
            {copy.badges.map((t) => (
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
          <span className={styles.sectionLabel}>{copy.introLabel}</span>
          <h2 className={styles.sectionTitle}>{copy.introTitle}</h2>
          {copy.intro.map((p) => (
            <p key={p.slice(0, 24)} className={styles.bodyText}>{p}</p>
          ))}
          <p className={styles.bodyText} style={{ fontSize: "0.86rem", color: "var(--text-muted)" }}>
            {copy.checkedNote(attractionPrices.length, dateLabel(latestChecked(), locale))}
          </p>
        </section>

        {copy.groups.map((g) => (
          <section key={g.key} id={g.key} className={styles.bodySection}>
            <span className={styles.sectionLabel}>{g.label}</span>
            <h2 className={styles.sectionTitle}>{g.label}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>{g.desc}</p>
            <div className={styles.relatedGrid}>
              {g.routes.map((target) => (
                <Link key={target} href={target} className={styles.relatedCard}>
                  <div className={styles.relatedMeta}>
                    <p className={styles.relatedTitle}>{cardTitle(target)}</p>
                    <p className={styles.bodyText} style={{ fontSize: "0.85rem", margin: "0.4rem 0 0.6rem" }}>
                      {copy.blurbs[target]}
                    </p>
                    <span className={styles.relatedArrow}>{copy.cardFooter(dates[target])}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>{copy.prepLabel}</span>
          <h2 className={styles.sectionTitle}>{copy.prepTitle}</h2>
          <p className={styles.bodyText}>{copy.prepText}</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            {copy.klook.map((product) => (
              <KlookLink key={product.url} href={product.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                {product.label} →
              </KlookLink>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>{copy.englishLabel}</span>
          <h2 className={styles.sectionTitle}>{copy.englishTitle}</h2>
          <p className={styles.bodyText}>{copy.englishIntro}</p>
          <div>
            {copy.englishLinks.map((l) => (
              <p key={l.href} className={styles.bodyText} style={{ margin: "0.3rem 0" }}>
                <Link href={l.href} hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>
                  {l.label} →
                </Link>
              </p>
            ))}
          </div>
        </section>

        <FaqList items={copy.faq} />
      </div>
    </>
  );
}
