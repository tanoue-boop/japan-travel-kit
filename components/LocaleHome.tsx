import Head from "next/head";
import Link from "next/link";
import { seoTags } from "./IntlSeo";
import { FaqList, breadcrumbJsonLd, faqJsonLd, type Crumb, type FaqItem } from "./IntlChrome";
import {
  BOOK_CARDS,
  BOOK_CARD_KEYS,
  CITY_HREFS,
  HUB_HREFS,
  POPULAR_HREFS,
  BookSection,
  CtaBand,
  HomeHero,
  HomeSection,
  PaperBand,
  RowGroup,
  StatsBand,
  TrustBand,
  type BookCard,
  type BookCardKey,
  type HomeRow,
} from "./HomeSections";
import { esimArticles } from "../lib/guides-esim";
import { transportArticles } from "../lib/guides-transport";
import { moneyArticles } from "../lib/guides-money";
import { attractionArticles } from "../lib/guides-attractions";
import { attractionPrices, latestChecked } from "../lib/attraction-prices";
import { itemListJsonLd } from "../lib/structured-data";
import {
  HOME_GROUP,
  JSONLD_LANG,
  LOCALE_HOME,
  editionGuideCount,
  editionPageCount,
  monthLabel,
  pagesIn,
  pairFor,
  routeOf,
  titleOf,
  type TranslatedLocale,
} from "../lib/i18n";

/**
 * The entry page of a translated edition — /zh-tw, /zh-cn, /ko and /th.
 *
 * Rebuilt 2026-11-01 (task jtk-20261101-A14) on the English home page's own layout.
 * Until then this was a text-only hero over a list of cards in the article stylesheet,
 * so choosing a language on the home page swapped the whole design and lost the
 * photograph. It now renders the same sections, in the same order, from the same
 * components (components/HomeSections.tsx): hero with the Kyoto photograph, "Book
 * before you fly", the stats band, Travel Guides, Browse by city, Popular Guides,
 * then Trust and the closing CTA. What differs is the words, and which links exist:
 *
 *   - Travel Guides holds this edition's translated pages, grouped as before (the
 *     group list is what keeps the page usable as editions grow), followed by the
 *     English category hubs, each marked as English — the old "not translated yet"
 *     section, folded in;
 *   - Browse by city and the booking block's "Read:" links go to this edition's page
 *     where it has one and to the English page, marked, where it does not;
 *   - Popular Guides lists only the popular guides this edition has translated;
 *   - the Klook links are the English page's own products, pointed at this edition's
 *     Klook locale (localizeKlookUrl), and carry this page's ad id via KlookLink;
 *   - the FAQ stays, between Popular Guides and Trust, because the page's FAQPage
 *     JSON-LD has to describe something visible.
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

type Copy = {
  /** The edition's name — the breadcrumb label. */
  eyebrow: string;
  /** H1: the first line, then the accent line. The <title> comes from lib/i18n.ts. */
  titleLines: [string, string];
  subtitle: string;
  desc: string;
  groups: Group[];
  blurbs: Record<string, string>;
  englishTitle: string;
  englishIntro: string;
  faq: FaqItem[];
  itemListName: string;
};

const COPY: Record<TranslatedLocale, Copy> = {
  // ── 繁體中文 ──────────────────────────────────────────────────────────────
  "zh-tw": {
    eyebrow: "繁體中文版",
    titleLines: ["日本旅遊實用指南（2026）：", "門票、交通、網卡"],
    subtitle: "哪幾張票一定要先訂、從海外行得通的購票管道，以及落地那天的交通與上網。",
    desc:
      "Japan Travel Kit 繁體中文版：日本景點門票、東京迪士尼與日本環球影城預約規則、" +
      "富士山一日遊、成田機場交通與日本網卡。票價讀自官網並標示查核日期。",
    groups: [
      {
        key: "winter",
        label: "冬季旅遊",
        desc: "12 月到 2 月的雪祭、滑雪與雪猴：什麼要先訂，以及從哪裡出發。",
        routes: [
          "/zh-tw/guides/attractions/sapporo-snow-festival-tours",
          "/zh-tw/guides/attractions/niseko-ski-tours",
          "/zh-tw/guides/attractions/hokkaido-7-day-itinerary",
          "/zh-tw/guides/attractions/japan-winter-itinerary",
          "/zh-tw/guides/attractions/jigokudani-snow-monkey-tour",
        ],
      },
      {
        key: "tickets",
        label: "門票與景點",
        desc: "單一場館的入場券——東京的美術館與展望台，以及大阪的道頓堀遊船。",
        routes: [
          "/zh-tw/guides/attractions/shibuya-sky-tickets",
          "/zh-tw/guides/attractions/tokyo-skytree-tickets",
          "/zh-tw/guides/attractions/teamlab-planets-tickets",
          "/zh-tw/guides/attractions/teamlab-borderless-tickets",
          "/zh-tw/guides/attractions/dotonbori-river-cruise",
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
      "/zh-tw/guides/attractions/sapporo-snow-festival-tours":
        "2027 年 2 月 4–11 日，三個會場都免費。真正要先訂的是住宿與周邊一日遊。",
      "/zh-tw/guides/attractions/niseko-ski-tours":
        "新千歲機場接送、教練課、四大雪場怎麼選，以及從札幌出發的滑雪行程。",
      "/zh-tw/guides/attractions/hokkaido-7-day-itinerary":
        "7 天逐日路線，含周遊券的算法，以及冬季要怎麼調整。",
      "/zh-tw/guides/attractions/japan-winter-itinerary":
        "12 天的冬季路線：東京、金澤、京都、大阪，以及 2 月的北海道版本。",
      "/zh-tw/guides/attractions/jigokudani-snow-monkey-tour":
        "從東京出發看泡湯雪猴：一日遊、自行前往的交通與入苑資訊。",
      "/zh-tw/guides/attractions/shibuya-sky-tickets":
        "官方票價、為什麼日落場最先賣完，以及海外信用卡刷不過時怎麼訂。",
      "/zh-tw/guides/attractions/tokyo-skytree-tickets":
        "350 樓與 450 樓怎麼選、套票為什麼比現場加購便宜，以及當天購票多 ¥500。",
      "/zh-tw/guides/attractions/dotonbori-river-cruise":
        "とんぼり遊船的票價與班次、大阪周遊卡怎麼換票，以及同一條河上五艘船的比較。",
      "/zh-tw/guides/attractions/teamlab-planets-tickets":
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
    englishTitle: "還沒翻譯的部分",
    englishIntro:
      "京都與大阪的城市攻略、其他的一日遊、鐵路周遊券、IC 卡、付款與貨幣，以及完整的門票價格總表，目前只有英文版。以下連結都是英文頁：",
    faq: [
      {
        q: "這個網站有繁體中文版嗎？",
        a: `有，但不是全站。目前繁體中文版共 ${editionPageCount("zh-tw")} 頁（本頁、門票總覽與 ${editionGuideCount("zh-tw")} 篇攻略），挑的是台灣與香港讀者最常查、也最需要先訂票的那幾個入口。其餘的攻略只有英文版，連結到那些頁面時我們會標示「（英文）」。`,
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
    desc:
      "Japan Travel Kit 简体中文版：日本景点门票、东京迪士尼与日本环球影城预约规则、" +
      "富士山一日游、机场交通与日本eSIM。票价读自官网并标示核查日期。",
    groups: [
      {
        key: "winter",
        label: "冬季旅游",
        desc: "12 月到 2 月的雪祭、滑雪与雪猴：什么要先订，以及从哪里出发。",
        routes: [
          "/zh-cn/guides/attractions/sapporo-snow-festival-tours",
          "/zh-cn/guides/attractions/niseko-ski-tours",
          "/zh-cn/guides/attractions/hokkaido-7-day-itinerary",
          "/zh-cn/guides/attractions/japan-winter-itinerary",
          "/zh-cn/guides/attractions/jigokudani-snow-monkey-tour",
        ],
      },
      {
        key: "tickets",
        label: "门票与景点",
        desc: "单一场馆的入场券——东京的美术馆与观景台，以及大阪的道顿堀游船。",
        routes: [
          "/zh-cn/guides/attractions/shibuya-sky-tickets",
          "/zh-cn/guides/attractions/tokyo-skytree-tickets",
          "/zh-cn/guides/attractions/teamlab-planets-tickets",
          "/zh-cn/guides/attractions/teamlab-borderless-tickets",
          "/zh-cn/guides/attractions/dotonbori-river-cruise",
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
      "/zh-cn/guides/attractions/sapporo-snow-festival-tours":
        "2027 年 2 月 4–11 日，三个会场都免费。真正要先订的是住宿与周边一日游。",
      "/zh-cn/guides/attractions/niseko-ski-tours":
        "新千岁机场接送、教练课、四大雪场怎么选，以及从札幌出发的滑雪行程。",
      "/zh-cn/guides/attractions/hokkaido-7-day-itinerary":
        "7 天逐日路线，含周游券的算法，以及冬季要怎么调整。",
      "/zh-cn/guides/attractions/japan-winter-itinerary":
        "12 天的冬季路线：东京、金泽、京都、大阪，以及 2 月的北海道版本。",
      "/zh-cn/guides/attractions/jigokudani-snow-monkey-tour":
        "从东京出发看泡汤雪猴：一日游、自行前往的交通与入苑信息。",
      "/zh-cn/guides/attractions/shibuya-sky-tickets":
        "官方票价、为什么日落场最先卖完，以及海外信用卡刷不过时怎么订。",
      "/zh-cn/guides/attractions/tokyo-skytree-tickets":
        "350 楼与 450 楼怎么选、套票为什么比现场加购便宜，以及当天购票多 ¥500。",
      "/zh-cn/guides/attractions/dotonbori-river-cruise":
        "とんぼり游船的票价与班次、大阪周游卡怎么换票，以及同一条河上五艘船的比较。",
      "/zh-cn/guides/attractions/teamlab-planets-tickets":
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
    englishTitle: "还没翻译的部分",
    englishIntro:
      "京都与大阪的城市攻略、其他的一日游、铁路周游券、IC 卡、支付与货币，以及完整的门票价格总表，目前只有英文版。以下链接都是英文页：",
    faq: [
      {
        q: "这个网站有简体中文版吗？",
        a: `有，但不是全站。目前简体中文版共 ${editionPageCount("zh-cn")} 页（本页、门票总览与 ${editionGuideCount("zh-cn")} 篇攻略），挑的是销售与点击实绩最高、也最需要提前订票的那几个入口。其余的攻略只有英文版，链接到那些页面时我们会标示「（英文）」。`,
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
    titleLines: ["일본 여행 준비 가이드(2026): ", "티켓, 교통, eSIM"],
    subtitle: "미리 예약해야 하는 입장권, 해외 카드로도 결제되는 예약 경로, 그리고 도착 당일에 필요한 것들.",
    desc:
      "Japan Travel Kit 한국어판: 시부야 스카이, 팀랩 플래닛, 도쿄 디즈니랜드, " +
      "USJ 티켓과 일본 이심 비교 5편. 공식 요금 기준.",
    groups: [
      {
        key: "winter",
        label: "겨울 여행",
        desc: "12월부터 2월까지의 눈축제, 스키, 눈원숭이 — 무엇을 먼저 예약하고 어디서 출발할지.",
        routes: [
          "/ko/guides/attractions/sapporo-snow-festival-tours",
          "/ko/guides/attractions/niseko-ski-tours",
          "/ko/guides/attractions/hokkaido-7-day-itinerary",
          "/ko/guides/attractions/japan-winter-itinerary",
          "/ko/guides/attractions/jigokudani-snow-monkey-tour",
        ],
      },
      {
        key: "tickets",
        label: "입장권",
        desc: "도쿄의 전망대와 미술관, 그리고 오사카의 도톤보리 리버크루즈 — 공식 요금과 예약 방법.",
        routes: [
          "/ko/guides/attractions/shibuya-sky-tickets",
          "/ko/guides/attractions/tokyo-skytree-tickets",
          "/ko/guides/attractions/teamlab-planets-tickets",
          "/ko/guides/attractions/teamlab-borderless-tickets",
          "/ko/guides/attractions/dotonbori-river-cruise",
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
      "/ko/guides/attractions/sapporo-snow-festival-tours":
        "2027년 2월 4~11일, 세 회장 모두 무료. 먼저 예약할 것은 숙소와 근교 당일 투어입니다.",
      "/ko/guides/attractions/niseko-ski-tours":
        "신치토세 공항 셔틀, 강습, 4개 스키장 선택, 삿포로 출발 스키 투어.",
      "/ko/guides/attractions/hokkaido-7-day-itinerary":
        "7일 일정을 날짜별로 정리하고 패스 계산과 겨울철 조정 방법을 담았습니다.",
      "/ko/guides/attractions/japan-winter-itinerary":
        "도쿄, 가나자와, 교토, 오사카를 잇는 12일 겨울 일정과 2월 홋카이도 버전.",
      "/ko/guides/attractions/jigokudani-snow-monkey-tour":
        "도쿄에서 온천 원숭이를 보러 가는 당일 투어, 직접 가는 교통편, 입장 정보.",
      "/ko/guides/attractions/shibuya-sky-tickets":
        "공식 요금, 일몰 시간대가 가장 먼저 마감되는 이유, 해외 카드가 막힐 때의 예약 방법.",
      "/ko/guides/attractions/tokyo-skytree-tickets":
        "플로어 350과 450 선택 기준, 콤보가 현장 추가보다 싼 이유, 당일 구매 ¥500 추가.",
      "/ko/guides/attractions/teamlab-planets-tickets":
        "도요스 플래닛의 요금과 30분 단위 입장 시간, 물에 들어가는 구역 복장, 보더리스와 비교.",
      "/ko/guides/attractions/teamlab-borderless-tickets":
        "아자부다이힐스 보더리스: 변동 요금제, 지정 시간 입장과 Flexible Pass의 차이.",
      "/ko/guides/attractions/dotonbori-river-cruise":
        "톤보리 리버크루즈의 요금과 운항 시간, 오사카 주유패스 교환 규칙, 배 5종 비교.",
      "/ko/guides/attractions/tokyo-disney-tickets":
        "모든 티켓이 날짜 지정이고 현장 판매는 없습니다. 구매 방법과 랜드·씨 선택 기준.",
      "/ko/guides/attractions/usj-tickets-express-pass":
        "전면 온라인 판매, 슈퍼 닌텐도 월드는 입장 시간 지정. 익스프레스 패스 4·7·8 선택법.",
      "/ko/guides/esim/best-esim-japan":
        "클룩 일본 eSIM과 Airalo·Holafly·eSIM Go·Sakura Mobile의 요금·회선 비교.",
    },
    englishTitle: "아직 번역되지 않은 부분",
    englishIntro:
      "교토·오사카 도시 가이드, 근교 투어, JR 패스, IC 카드, 결제와 환전, 그리고 전체 입장 요금표는 현재 영어판만 있습니다. 아래 링크는 모두 영어 페이지입니다:",
    faq: [
      {
        q: "이 사이트는 전체가 한국어인가요?",
        a: `아니요. 현재 한국어판은 이 페이지와 가이드 ${editionGuideCount("ko")}편, 모두 ${editionPageCount("ko")}페이지입니다. 한국 여행자가 가장 많이 찾고 미리 예약해야 하는 입장권을 중심으로 골랐습니다. 나머지 가이드는 영어판만 있고, 그런 링크에는 "(영어)"를 붙여 둡니다.`,
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
    titleLines: ["คู่มือเที่ยวญี่ปุ่น 2026: ", "ตั๋ว การเดินทาง และ eSIM"],
    subtitle: "ตั๋วที่ต้องจองล่วงหน้า ช่องทางจองที่ใช้ได้จากต่างประเทศ และสิ่งที่ควรเตรียมไว้สำหรับวันเดินทางถึงญี่ปุ่น",
    desc:
      "ฉบับภาษาไทยของ Japan Travel Kit: ตั๋ว Shibuya Sky, ดิสนีย์แลนด์โตเกียว, " +
      "USJ และ eSIM ญี่ปุ่น",
    groups: [
      {
        key: "winter",
        label: "เที่ยวหน้าหนาว",
        desc: "เทศกาลหิมะ สกี และลิงแช่ออนเซ็นช่วงธันวาคมถึงกุมภาพันธ์ — ควรจองอะไรก่อนและออกจากที่ไหน",
        routes: [
          "/th/guides/attractions/sapporo-snow-festival-tours",
          "/th/guides/attractions/niseko-ski-tours",
          "/th/guides/attractions/hokkaido-7-day-itinerary",
          "/th/guides/attractions/japan-winter-itinerary",
          "/th/guides/attractions/jigokudani-snow-monkey-tour",
        ],
      },
      {
        key: "tickets",
        label: "ตั๋วเข้าชม",
        desc: "จุดชมวิวและพิพิธภัณฑ์ในโตเกียว และล่องเรือโดทงโบริที่โอซาก้า — ราคาทางการและวิธีจอง",
        routes: [
          "/th/guides/attractions/shibuya-sky-tickets",
          "/th/guides/attractions/tokyo-skytree-tickets",
          "/th/guides/attractions/teamlab-planets-tickets",
          "/th/guides/attractions/teamlab-borderless-tickets",
          "/th/guides/attractions/dotonbori-river-cruise",
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
        desc: "สิ่งแรกที่ได้ใช้เมื่อเดินทางถึงญี่ปุ่น — เน็ตมือถือ",
        routes: ["/th/guides/esim/best-esim-japan"],
      },
    ],
    blurbs: {
      "/th/guides/attractions/sapporo-snow-festival-tours":
        "4–11 กุมภาพันธ์ 2027 ทั้งสามสถานที่เข้าฟรี สิ่งที่ต้องจองก่อนคือที่พักและทริปรอบเมือง",
      "/th/guides/attractions/niseko-ski-tours":
        "รถรับส่งสนามบินชิโตเสะ คลาสสกี การเลือกสี่พื้นที่ และทัวร์สกีจากซัปโปโร",
      "/th/guides/attractions/hokkaido-7-day-itinerary":
        "แผนเที่ยวรายวัน 7 วัน พร้อมวิธีคำนวณพาส และการปรับแผนในหน้าหนาว",
      "/th/guides/attractions/japan-winter-itinerary":
        "เส้นทาง 12 วันผ่านโตเกียว คานาซาวะ เกียวโต และโอซาก้า พร้อมแบบฮอกไกโดช่วงกุมภาพันธ์",
      "/th/guides/attractions/jigokudani-snow-monkey-tour":
        "ไปดูลิงแช่ออนเซ็นจากโตเกียว: ทัวร์วันเดียว การเดินทางเอง และข้อมูลการเข้าชม",
      "/th/guides/attractions/shibuya-sky-tickets":
        "ราคาทางการ เหตุผลที่รอบพระอาทิตย์ตกเต็มก่อน และวิธีจองเมื่อบัตรต่างประเทศถูกปฏิเสธ",
      "/th/guides/attractions/tokyo-skytree-tickets":
        "เลือกชั้น 350 หรือ 450 เหตุผลที่คอมโบถูกกว่าการเพิ่มหน้างาน และค่าบริการ ¥500 เมื่อซื้อวันนั้น",
      "/th/guides/attractions/teamlab-planets-tickets":
        "ราคาของ Planets ที่โทโยสุ รอบเข้าชมทุก 30 นาที การแต่งตัวสำหรับโซนลุยน้ำ และเทียบกับ Borderless",
      "/th/guides/attractions/teamlab-borderless-tickets":
        "Borderless ที่อาซาบุไดฮิลส์: ราคาแบบยืดหยุ่น และความต่างของรอบระบุเวลากับ Flexible Pass",
      "/th/guides/attractions/dotonbori-river-cruise":
        "ราคาและรอบของ Tombori River Cruise กฎการแลกตั๋วของ Osaka Amazing Pass และเทียบเรือห้าลำ",
      "/th/guides/attractions/tokyo-disney-tickets":
        "บัตรทุกใบระบุวัน และไม่มีขายที่ประตู วิธีซื้อ และเลือกระหว่างแลนด์กับซี",
      "/th/guides/attractions/usj-tickets-express-pass":
        "ขายออนไลน์ทั้งหมด Super Nintendo World ต้องระบุเวลาเข้า และเลือก Express Pass 4／7／8",
      "/th/guides/esim/best-esim-japan":
        "eSIM ญี่ปุ่นของ Klook พร้อมเทียบราคาและเครือข่ายกับ Airalo, Holafly, eSIM Go และ Sakura Mobile",
    },
    englishTitle: "ส่วนที่ยังไม่ได้แปล",
    englishIntro:
      "ไกด์เมืองเกียวโตและโอซาก้า ทัวร์วันเดียวอื่น ๆ JR Pass บัตร IC การจ่ายเงินและแลกเงิน รวมถึงตารางราคาตั๋วฉบับเต็ม ยังมีเฉพาะภาษาอังกฤษ ลิงก์ด้านล่างเป็นหน้าภาษาอังกฤษทั้งหมด:",
    faq: [
      {
        q: "เว็บไซต์นี้เป็นภาษาไทยทั้งหมดไหม",
        a: `ยังไม่ทั้งหมด ปัจจุบันฉบับภาษาไทยมี ${editionPageCount("th")} หน้า (หน้านี้กับไกด์อีก ${editionGuideCount("th")} บท) เลือกจากตั๋วที่นักท่องเที่ยวไทยค้นหามากที่สุดและต้องจองล่วงหน้า ไกด์ที่เหลือมีเฉพาะภาษาอังกฤษ และเราจะกำกับลิงก์เหล่านั้นว่า "(อังกฤษ)"`,
      },
      {
        q: "เปลี่ยนจากหน้าภาษาอังกฤษเป็นภาษาไทยได้อย่างไร",
        a: "ทุกหน้ามีเมนูภาษา (ไอคอนลูกโลก) ที่มุมขวาของส่วนหัว ถ้าหน้านั้นมีฉบับภาษาไทยจะพาไปหน้านั้นทันที ถ้าไม่มีจะกลับมาที่หน้าแรกภาษาไทยนี้ บนมือถืออยู่บนสุดของเมนู และที่ท้ายหน้าก็มีลิงก์ภาษาด้วย",
      },
      {
        q: "ราคาในฉบับภาษาไทยตรงกับฉบับภาษาอังกฤษหรือไม่",
        a: "ตรงกัน ราคาทุกตัวอ่านจากเว็บไซต์ของผู้ให้บริการเอง ฉบับภาษาไทยใช้ข้อมูลชุดเดียวกันและวันที่ตรวจสอบเดียวกับฉบับภาษาอังกฤษ ไม่มีตัวเลขใดที่มีเฉพาะในหน้าภาษาไทย",
      },
    ],
    itemListName: "ไกด์เที่ยวญี่ปุ่น — Japan Travel Kit ฉบับภาษาไทย",
  },
};

// ---------------------------------------------------------------------------
// The home-page sections, in each edition's words
// ---------------------------------------------------------------------------

/**
 * The words of the sections shared with the English home page. Each string is a
 * translation of the English page's own copy (pages/index.tsx) — no figure or claim
 * is added that the English does not make. Where an edition's version of a section
 * only differs because its translated set is smaller, the framing says so.
 */
type HomeCopy = {
  heroEyebrow: string;
  heroAlt: string;
  primary: { href: string; label: string };
  secondaryLabel: string;
  book: {
    eyebrow: string;
    title: string;
    desc: string;
    cards: Record<BookCardKey, { kicker: string; title: string; desc: string; ctas: string[]; guide: string }>;
    note: string;
    disclaimer: string;
  };
  stats: { translated: string; prices: string; total: string; checked: string };
  guides: { eyebrow: string; title: string; desc: string };
  hubs: Record<(typeof HUB_HREFS)[number], { title: string; desc: string }>;
  cities: {
    eyebrow: string;
    title: string;
    desc: string;
    items: Record<keyof typeof CITY_HREFS, { title: string; desc: string }>;
    footLink: (count: number) => string;
  };
  popular: { eyebrow: string; title: string; desc: string };
  trust: { eyebrow: string; title: string; desc: string; checks: string[] };
  cta: { eyebrow: string; title: string; desc: string };
  /** The meta line on a row that leads to an English page. */
  englishMeta: string;
  /** Appended to an inline link that leads to an English page — the FAQ promises it. */
  englishSuffix: string;
  /** The meta line on a row that leads to a page of this edition. */
  updated: (month: string) => string;
};

const HOME: Record<TranslatedLocale, HomeCopy> = {
  // ── 繁體中文 ──────────────────────────────────────────────────────────────
  "zh-tw": {
    heroEyebrow: "繁體中文版・2026 旅遊季更新",
    heroAlt: "清晨空無一人的京都東山街道，町家屋頂後方是八坂塔",
    primary: { href: "/zh-tw/guides/attractions", label: "看門票與行程" },
    secondaryLabel: "規劃行程",
    book: {
      eyebrow: "出發前先訂",
      title: "值得在家先搞定的四件事",
      desc: "日本旅行大部分的事都可以當天再安排，這四件是例外：上網、住宿、鐵路，以及一個會依日期賣完的一日遊。每張卡片都附上說明它的攻略，以及預訂的地方。",
      cards: {
        esim: {
          kicker: "上網",
          title: "日本 eSIM，走出航廈前就能用",
          desc: "落地那一刻最值得已經能用的東西：乘車 App、飯店入住和你的門票，全都在手機上。Klook 自己也賣日本 eSIM，以 QR 碼憑證發送。",
          ctas: ["在 Klook 看 eSIM 方案 →"],
          guide: "閱讀：日本 eSIM 推薦",
        },
        stay: {
          kicker: "住宿",
          title: "住在你真正會搭的路線上",
          desc: "在東京、京都和大阪，區域比房間更重要。住在山手線環線上、京都車站前，或御堂筋線沿線，整趟旅程每天都能少轉一次車。",
          ctas: ["東京飯店（Klook）→", "京都飯店（Klook）→", "大阪飯店（Klook）→"],
          guide: "閱讀：東京住哪裡",
        },
        rail: {
          kicker: "鐵路",
          title: "JR Pass，拿你自己的路線來算",
          desc: "全國版周遊券在長途移動時划算，只玩一個城市就虧，所以唯一誠實的買法，是拿你打算搭的車來比價。有 7、14、21 天版本，分普通車廂與綠色車廂。",
          ctas: ["在 Klook 查 JR Pass 價格 →"],
          guide: "閱讀：JR Pass 值不值得買",
        },
        daytrip: {
          kicker: "一日遊",
          title: "富士山與箱根，從東京出發一天來回",
          desc: "最難自己拼起來的一日遊：富士山五合目搭配箱根火山區與蘆之湖，當天傍晚回到東京的巴士行程。",
          ctas: ["在 Klook 看一日遊 →"],
          guide: "閱讀：富士山一日遊怎麼選",
        },
      },
      note: "上方的預訂連結是聯盟連結：如果你透過這些連結預訂，我們可能會獲得小額佣金，你不需多付任何費用。價格與供應情況以賣家為準。",
      disclaimer: "完整聲明（英文）→",
    },
    stats: { translated: "篇繁體中文攻略", prices: "項官方票價已查核", total: "篇攻略（英文版全站）", checked: "最近一次查核票價" },
    guides: {
      eyebrow: "規劃行程",
      title: "旅遊攻略",
      desc: "先處理需要預訂的，再整理其他的——以下是已有繁體中文版的攻略，依類別整理。",
    },
    hubs: {
      "/guides/attractions": {
        title: "日本景點與門票",
        desc: "門票、行程、主題樂園與一日遊——哪些要先訂、官方票價多少，以及從海外行得通的購票管道。",
      },
      "/guides/transport": { title: "交通", desc: "新幹線周遊券、IC 卡、機場鐵路，以及各城市的交通攻略。" },
      "/guides/esim": { title: "eSIM 與 SIM 卡", desc: "該買哪張 eSIM、怎麼安裝、網路涵蓋範圍，以及老實的方案比較。" },
      "/guides/money": { title: "付款與貨幣", desc: "旅遊卡、ATM 提款、現金還是刷卡，以及在日本各地怎麼付錢。" },
    },
    cities: {
      eyebrow: "目的地",
      title: "依城市瀏覽",
      desc: "大多數行程都是一個城市一個城市規劃的。每個城市頁列出我們為它寫的所有攻略。",
      items: {
        tokyo: { title: "東京", desc: "展望台、teamLab 的入場時段、迪士尼、片廠導覽——以及從東京出發的四個一日遊。" },
        kyoto: { title: "京都", desc: "大多是可以直接走進去的寺院，這會改變你安排一天的方式——另外還有和服租借與巴士票的算法。" },
        osaka: { title: "大阪", desc: "城市周遊卡真正划算的地方、沒有任何周遊卡涵蓋的那一個景點，以及關西的一日遊。" },
        daytrips: { title: "一日遊與行程", desc: "富士山、箱根、日光、鎌倉、奈良、廣島——該訂哪一種行程，以及什麼時候自己去比較便宜。" },
      },
      footLink: (n) => `瀏覽全部 ${n} 篇攻略（英文）→`,
    },
    popular: { eyebrow: "最多人看", title: "熱門攻略", desc: "旅客出發前最常打開的攻略中，已有繁體中文版的幾篇。" },
    trust: {
      eyebrow: "我們怎麼做",
      title: "獨立、誠實、持續更新。",
      desc: "我們推薦的每項產品都做過研究，並拿業者自己公布的價格核對。我們的評論從不接受贊助——只有你透過我們的連結購買時，我們才會獲得小額聯盟佣金，你不需多付任何費用。",
      checks: ["沒有付費置入", "價格經過核對", "每月更新"],
    },
    cta: {
      eyebrow: "從這裡開始",
      title: "準備好規劃日本行程了嗎？",
      desc: "從預訂開始——指定時段的門票與行程，是日本旅行中唯一可能在你抵達前就賣完的部分。",
    },
    englishMeta: "英文頁 · English",
    englishSuffix: "（英文）",
    updated: (m) => `更新於 ${m}`,
  },

  // ── 简体中文 ──────────────────────────────────────────────────────────────
  "zh-cn": {
    heroEyebrow: "简体中文版・2026 旅游季更新",
    heroAlt: "清晨空无一人的京都东山街道，町家屋顶后方是八坂塔",
    primary: { href: "/zh-cn/guides/attractions", label: "看门票与行程" },
    secondaryLabel: "规划行程",
    book: {
      eyebrow: "出发前先订",
      title: "值得在家先搞定的四件事",
      desc: "日本旅行大部分的事都可以当天再安排，这四件是例外：上网、住宿、铁路，以及一个会按日期卖完的一日游。每张卡片都附上讲解它的攻略，以及预订的地方。",
      cards: {
        esim: {
          kicker: "上网",
          title: "日本 eSIM，走出航站楼前就能用",
          desc: "落地那一刻最值得已经能用的东西：乘车 App、酒店入住和你的门票，全都在手机上。Klook 自己也卖日本 eSIM，以二维码凭证发送。",
          ctas: ["在 Klook 看 eSIM 方案 →"],
          guide: "阅读：日本 eSIM 推荐",
        },
        stay: {
          kicker: "住宿",
          title: "住在你真正会坐的线路上",
          desc: "在东京、京都和大阪，区域比房间更重要。住在山手线环线上、京都站前，或御堂筋线沿线，整趟旅程每天都能少换乘一次。",
          ctas: ["东京酒店（Klook）→", "京都酒店（Klook）→", "大阪酒店（Klook）→"],
          guide: "阅读：东京住哪里",
        },
        rail: {
          kicker: "铁路",
          title: "JR Pass，拿你自己的路线来算",
          desc: "全国版周游券在长途移动时划算，只玩一个城市就亏，所以唯一诚实的买法，是拿你打算坐的车来比价。有 7、14、21 天版本，分普通车厢与绿色车厢。",
          ctas: ["在 Klook 查 JR Pass 价格 →"],
          guide: "阅读：JR Pass 值不值得买",
        },
        daytrip: {
          kicker: "一日游",
          title: "富士山与箱根，从东京出发一天往返",
          desc: "最难自己拼起来的一日游：富士山五合目搭配箱根火山区与芦之湖，当天傍晚回到东京的大巴行程。",
          ctas: ["在 Klook 看一日游 →"],
          guide: "阅读：富士山一日游怎么选",
        },
      },
      note: "上方的预订链接是联盟链接：如果你通过这些链接预订，我们可能会获得小额佣金，你不需要多付任何费用。价格与库存以卖家为准。",
      disclaimer: "完整声明（英文）→",
    },
    stats: { translated: "篇简体中文攻略", prices: "项官方票价已核查", total: "篇攻略（英文版全站）", checked: "最近一次核查票价" },
    guides: {
      eyebrow: "规划行程",
      title: "旅游攻略",
      desc: "先处理需要预订的，再整理其他的——以下是已有简体中文版的攻略，按类别整理。",
    },
    hubs: {
      "/guides/attractions": {
        title: "日本景点与门票",
        desc: "门票、行程、主题乐园与一日游——哪些要先订、官方票价多少，以及从海外行得通的购票渠道。",
      },
      "/guides/transport": { title: "交通", desc: "新干线周游券、IC 卡、机场铁路，以及各城市的交通攻略。" },
      "/guides/esim": { title: "eSIM 与 SIM 卡", desc: "该买哪张 eSIM、怎么安装、网络覆盖范围，以及实在的套餐比较。" },
      "/guides/money": { title: "支付与货币", desc: "旅行卡、ATM 取现、现金还是刷卡，以及在日本各地怎么付钱。" },
    },
    cities: {
      eyebrow: "目的地",
      title: "按城市浏览",
      desc: "大多数行程都是一个城市一个城市规划的。每个城市页列出我们为它写的所有攻略。",
      items: {
        tokyo: { title: "东京", desc: "观景台、teamLab 的入场时段、迪士尼、片场导览——以及从东京出发的四个一日游。" },
        kyoto: { title: "京都", desc: "大多是可以直接走进去的寺院，这会改变你安排一天的方式——另外还有和服租赁与巴士票的算法。" },
        osaka: { title: "大阪", desc: "城市周游卡真正划算的地方、没有任何周游卡覆盖的那一个景点，以及关西的一日游。" },
        daytrips: { title: "一日游与行程", desc: "富士山、箱根、日光、镰仓、奈良、广岛——该订哪一种行程，以及什么时候自己去更便宜。" },
      },
      footLink: (n) => `浏览全部 ${n} 篇攻略（英文）→`,
    },
    popular: { eyebrow: "最多人看", title: "热门攻略", desc: "旅客出发前最常打开的攻略中，已有简体中文版的几篇。" },
    trust: {
      eyebrow: "我们怎么做",
      title: "独立、诚实、持续更新。",
      desc: "我们推荐的每项产品都做过研究，并拿商家自己公布的价格核对。我们的评测从不接受赞助——只有你通过我们的链接购买时，我们才会获得小额联盟佣金，你不需要多付任何费用。",
      checks: ["没有付费推广", "价格经过核对", "每月更新"],
    },
    cta: {
      eyebrow: "从这里开始",
      title: "准备好规划日本行程了吗？",
      desc: "从预订开始——指定时段的门票与行程，是日本旅行中唯一可能在你抵达前就卖完的部分。",
    },
    englishMeta: "英文页 · English",
    englishSuffix: "（英文）",
    updated: (m) => `更新于 ${m}`,
  },

  // ── 한국어 ────────────────────────────────────────────────────────────────
  ko: {
    heroEyebrow: "한국어판 · 2026 시즌 기준 업데이트",
    heroAlt: "이른 아침 인적 없는 교토 히가시야마 거리와 마치야 지붕 너머로 보이는 야사카 탑",
    // ko and th have no translated Things to Do hub, so the button goes to the
    // edition's own ticket list further down the page rather than out to English.
    primary: { href: "#tickets", label: "티켓·투어 가이드 보기" },
    secondaryLabel: "여행 준비하기",
    book: {
      eyebrow: "출발 전에 예약",
      title: "집에서 미리 해 두면 좋은 네 가지",
      desc: "일본 여행에서는 대부분의 일정을 현지에서 정해도 괜찮습니다. 다만 데이터, 숙소, 철도, 그리고 날짜에 따라 조기 마감되는 근교 투어, 이 네 가지는 예외입니다. 각 카드에는 그 내용을 설명하는 가이드와 예약할 곳을 함께 걸어 두었습니다.",
      cards: {
        esim: {
          kicker: "데이터",
          title: "공항을 나서기 전부터 바로 사용할 수 있는 일본 eSIM",
          desc: "일본에 도착하자마자 필요한 것, 바로 인터넷입니다. 교통 앱, 호텔 체크인, 입장권을 모두 휴대폰으로 이용하기 때문입니다. 클룩도 자체 일본 eSIM을 QR 바우처로 판매합니다.",
          ctas: ["클룩에서 eSIM 옵션 보기 →"],
          guide: "읽기: 일본 eSIM 추천",
        },
        stay: {
          kicker: "숙소",
          title: "실제 이용할 교통편을 고려한 호텔 선택",
          desc: "도쿄·교토·오사카에서는 객실보다 숙소의 위치가 여행의 편리함을 더 크게 좌우합니다. 야마노테선 순환선 역 근처, 교토역 앞, 미도스지선 역 근처에 숙소를 잡으면 여행 내내 매일 환승 한 번을 줄입니다.",
          ctas: ["도쿄 호텔(클룩) →", "교토 호텔(클룩) →", "오사카 호텔(클룩) →"],
          guide: "읽기: 도쿄 숙소 지역 고르기",
        },
        rail: {
          kicker: "철도",
          title: "JR 패스, 내 일정에 맞춰 계산하기",
          desc: "전국 패스는 장거리 이동에서 본전을 뽑고 한 도시만 도는 여행에서는 손해입니다. 그래서 타려는 열차를 기준으로 가격을 비교해 보는 것이 유일하게 정직한 구매법입니다. 7·14·21일권이 있고, 보통차와 그린차로 나뉩니다.",
          ctas: ["클룩에서 JR 패스 가격 보기 →"],
          guide: "읽기: JR 패스는 살 만한가",
        },
        daytrip: {
          kicker: "근교 투어",
          title: "후지산과 하코네, 도쿄에서 하루 만에",
          desc: "혼자 짜기 가장 어려운 근교 여행: 후지산 5합목과 하코네 화산 지대·아시노호를 묶어, 그날 저녁 도쿄로 돌아오는 버스 투어입니다.",
          ctas: ["클룩에서 투어 보기 →"],
          guide: "읽기: 후지산 1일 투어 고르기",
        },
      },
      note: "위 예약 링크는 제휴 링크입니다. 이 링크로 예약하시면 저희가 소액의 수수료를 받을 수 있으며, 추가 비용은 없습니다. 가격과 재고는 판매자 기준입니다.",
      disclaimer: "전체 고지 (영어) →",
    },
    stats: { translated: "한국어 가이드", prices: "공식 요금 확인 항목", total: "전체 가이드(영어판)", checked: "최근 요금 확인" },
    guides: {
      eyebrow: "여행 준비",
      title: "여행 가이드",
      desc: "예약이 필요한 것부터 먼저 준비하세요. 한국어로 옮긴 가이드를 종류별로 모았습니다.",
    },
    hubs: {
      "/guides/attractions": {
        title: "일본 관광·티켓",
        desc: "입장권, 투어, 테마파크, 근교 여행 — 무엇을 미리 예약해야 하는지, 공식 요금은 얼마인지, 해외에서 되는 예약 경로는 무엇인지.",
      },
      "/guides/transport": { title: "교통", desc: "신칸센 패스, IC 카드, 공항 철도, 도시별 교통 가이드." },
      "/guides/esim": { title: "eSIM·유심", desc: "어떤 eSIM을 살지, 설치 방법, 통신망 커버리지, 솔직한 요금제 비교." },
      "/guides/money": { title: "결제·환전", desc: "트래블 카드, ATM 이용, 현금과 카드, 일본에서 돈 내는 방법." },
    },
    cities: {
      eyebrow: "여행지",
      title: "도시별로 보기",
      desc: "여행은 대부분 도시 단위로 계획합니다. 각 도시 페이지에 그 도시에 관해 쓴 가이드를 모두 모아 두었습니다.",
      items: {
        tokyo: { title: "도쿄", desc: "전망대, 팀랩 입장 시간대, 디즈니, 스튜디오 투어 — 그리고 도쿄에서 떠나는 근교 여행 네 곳." },
        kyoto: { title: "교토", desc: "대부분 그냥 들어가는 사찰이라 하루 계획 짜는 법이 달라집니다 — 기모노 대여와 버스 패스 계산도." },
        osaka: { title: "오사카", desc: "시티 패스가 실제로 이득인 곳, 어떤 패스로도 안 되는 명소 하나, 그리고 간사이 근교 여행." },
        daytrips: { title: "근교 여행·투어", desc: "후지산, 하코네, 닛코, 가마쿠라, 나라, 히로시마 — 어떤 일정을 예약할지, 직접 가는 편이 더 싼 경우는 언제인지." },
      },
      footLink: (n) => `가이드 ${n}편 모두 보기 (영어) →`,
    },
    popular: { eyebrow: "많이 읽은 글", title: "인기 가이드", desc: "여행자들이 일본에 도착하기 전에 가장 많이 여는 가이드 가운데 한국어판이 있는 것들입니다." },
    trust: {
      eyebrow: "운영 원칙",
      title: "독립적인 평가와 정확한 최신 정보를 제공합니다.",
      desc: "추천하는 모든 상품을 조사하고, 가격은 업체가 직접 공개한 요금과 대조합니다. 리뷰는 협찬을 받지 않으며, 저희 링크로 구매하실 때만 소액의 제휴 수수료를 받습니다. 추가 비용은 없습니다.",
      checks: ["유료 게재 없음", "가격 확인", "매월 업데이트"],
    },
    cta: {
      eyebrow: "여기서 시작",
      title: "일본 여행, 준비를 시작해 볼까요?",
      desc: "예약부터 시작하세요 — 시간 지정 입장권과 투어는 일본 여행에서 도착 전에 매진될 수 있는 유일한 부분입니다.",
    },
    englishMeta: "영어 페이지 · English",
    englishSuffix: " (영어)",
    updated: (m) => `${m} 업데이트`,
  },

  // ── ไทย ───────────────────────────────────────────────────────────────────
  th: {
    heroEyebrow: "ฉบับภาษาไทย · อัปเดตสำหรับฤดูกาล 2026",
    heroAlt: "ถนนย่านฮิกาชิยามะในเกียวโตยามเช้าตรู่ที่ไร้ผู้คน มองเห็นเจดีย์ยาซากะอยู่เลยหลังคาบ้านมาจิยะ",
    primary: { href: "#tickets", label: "ดูไกด์ตั๋วและทัวร์" },
    secondaryLabel: "วางแผนทริป",
    book: {
      eyebrow: "จองก่อนบิน",
      title: "4 สิ่งที่ควรเตรียมให้พร้อมก่อนเดินทาง",
      desc: "เรื่องส่วนใหญ่ระหว่างเที่ยวญี่ปุ่นสามารถตัดสินใจได้เมื่อไปถึง ยกเว้นสี่อย่างนี้ — เน็ต ที่พัก รถไฟ และทัวร์แบบไปเช้าเย็นกลับที่อาจเต็มในบางวัน แต่ละการ์ดมีลิงก์ไปยังไกด์ที่อธิบายเรื่องนั้น และที่สำหรับจอง",
      cards: {
        esim: {
          kicker: "เน็ต",
          title: "eSIM สำหรับเที่ยวญี่ปุ่น ใช้งานได้ทันทีเมื่อเดินทางถึง",
          desc: "สิ่งที่ควรใช้งานได้ทันทีเมื่อถึงญี่ปุ่น: แอปรถไฟ การเช็กอินโรงแรม และตั๋วของคุณล้วนอยู่บนมือถือ Klook ขาย eSIM ญี่ปุ่นของตัวเองในรูปแบบวอเชอร์ QR",
          ctas: ["ดูตัวเลือก eSIM บน Klook →"],
          guide: "อ่าน: eSIM ญี่ปุ่นที่แนะนำ",
        },
        stay: {
          kicker: "ที่พัก",
          title: "เลือกโรงแรมใกล้เส้นทางรถไฟที่คุณจะใช้",
          desc: "ในโตเกียว เกียวโต และโอซาก้า ทำเลที่ตั้งสำคัญกว่าตัวห้องพัก ที่พักใกล้สถานีบนสายวงแหวนยามาโนเตะ (JR Yamanote Line) หน้าสถานีเกียวโต หรือใกล้สถานีบนสายมิโดสุจิ (Midosuji Line) ช่วยลดการเปลี่ยนรถได้วันละครั้งตลอดทริป",
          ctas: ["โรงแรมในโตเกียว (Klook) →", "โรงแรมในเกียวโต (Klook) →", "โรงแรมในโอซาก้า (Klook) →"],
          guide: "อ่าน: พักย่านไหนในโตเกียว",
        },
        rail: {
          kicker: "รถไฟ",
          title: "JR Pass คำนวณเทียบกับเส้นทางของคุณเอง",
          desc: "JR Pass แบบทั่วประเทศมักคุ้มเมื่อเดินทางไกลหลายเมือง แต่ถ้าเที่ยวเมืองเดียวอาจไม่คุ้มค่า วิธีซื้อที่ตรงไปตรงมาที่สุดจึงเป็นการเทียบราคากับรถไฟที่คุณวางแผนจะนั่ง มีแบบ 7, 14 และ 21 วัน ทั้งตู้ธรรมดาและตู้ Green Car",
          ctas: ["เช็กราคา JR Pass บน Klook →"],
          guide: "อ่าน: JR Pass คุ้มไหม",
        },
        daytrip: {
          kicker: "ทัวร์วันเดียว",
          title: "ภูเขาไฟฟูจิและฮาโกเน่ ไปกลับจากโตเกียวในวันเดียว",
          desc: "ทริปวันเดียวที่จัดเองยากที่สุด: ฟูจิชั้น 5 คู่กับเขตภูเขาไฟฮาโกเน่และทะเลสาบอาชิ เป็นทัวร์รถโค้ชที่กลับถึงโตเกียวในเย็นวันเดียวกัน",
          ctas: ["ดูทัวร์บน Klook →"],
          guide: "อ่าน: เลือกทัวร์ภูเขาไฟฟูจิ",
        },
      },
      note: "ลิงก์จองด้านบนเป็นลิงก์พันธมิตร: เราอาจได้รับค่าคอมมิชชันเล็กน้อยหากคุณจองผ่านลิงก์เหล่านี้ โดยคุณไม่ต้องจ่ายเพิ่ม ราคาและความพร้อมให้บริการเป็นไปตามผู้ขาย",
      disclaimer: "ข้อจำกัดความรับผิดชอบฉบับเต็ม (อังกฤษ) →",
    },
    stats: { translated: "ไกด์ภาษาไทย", prices: "ราคาทางการที่ตรวจสอบแล้ว", total: "ไกด์ทั้งหมด (ภาษาอังกฤษ)", checked: "ตรวจสอบราคาล่าสุด" },
    guides: {
      eyebrow: "วางแผนทริป",
      title: "ไกด์เที่ยว",
      desc: "เริ่มจากสิ่งที่ต้องจอง แล้วค่อยจัดการส่วนที่เหลือ — ไกด์ที่แปลเป็นภาษาไทยแล้ว จัดตามหมวด",
    },
    hubs: {
      "/guides/attractions": {
        title: "ที่เที่ยวและตั๋ว",
        desc: "ตั๋ว ทัวร์ สวนสนุก และทริปวันเดียว — อะไรต้องจองล่วงหน้า ราคาทางการเท่าไร และช่องทางจองไหนใช้ได้จากต่างประเทศ",
      },
      "/guides/transport": { title: "การเดินทาง", desc: "พาสชินคันเซ็น บัตร IC รถไฟสนามบิน และไกด์การเดินทางแยกตามเมือง" },
      "/guides/esim": { title: "eSIM และซิมการ์ด", desc: "ควรซื้อ eSIM ตัวไหน วิธีติดตั้ง ความครอบคลุมของเครือข่าย และการเทียบแพ็กเกจอย่างตรงไปตรงมา" },
      "/guides/money": { title: "การเงินและการจ่ายเงิน", desc: "บัตรท่องเที่ยว การใช้ ATM เงินสดหรือบัตร และวิธีจ่ายเงินทั่วญี่ปุ่น" },
    },
    cities: {
      eyebrow: "จุดหมาย",
      title: "เลือกตามเมือง",
      desc: "ทริปส่วนใหญ่วางแผนทีละเมือง แต่ละหน้ารวมไกด์ทุกบทที่เราเขียนถึงเมืองนั้น",
      items: {
        tokyo: { title: "โตเกียว", desc: "จุดชมวิว รอบเวลาของ teamLab ดิสนีย์ สตูดิโอทัวร์ — และทริปวันเดียวสี่แห่งจากโตเกียว" },
        kyoto: { title: "เกียวโต", desc: "วัดส่วนใหญ่เดินเข้าได้เลย ซึ่งเปลี่ยนวิธีวางแผนแต่ละวัน — รวมถึงการเช่ากิโมโนและการคำนวณบัตรรถบัส" },
        osaka: { title: "โอซาก้า", desc: "ที่ที่ซิตี้พาสคุ้มจริง สถานที่หนึ่งแห่งที่ไม่มีพาสไหนครอบคลุม และทริปวันเดียวในคันไซ" },
        daytrips: { title: "ทริปวันเดียวและทัวร์", desc: "ภูเขาไฟฟูจิ ฮาโกเน่ นิกโก้ คามาคุระ นารา ฮิโรชิมา — ควรจองแผนเที่ยวแบบไหน และเมื่อไรที่ไปเองถูกกว่า" },
      },
      footLink: (n) => `ดูไกด์ทั้งหมด ${n} บท (อังกฤษ) →`,
    },
    popular: { eyebrow: "อ่านมากที่สุด", title: "ไกด์ยอดนิยม", desc: "บทความที่นักเดินทางเปิดอ่านมากที่สุดก่อนถึงญี่ปุ่น เฉพาะบทที่มีฉบับภาษาไทยแล้ว" },
    trust: {
      eyebrow: "วิธีทำงานของเรา",
      title: "อิสระ ตรงไปตรงมา และทันสมัย",
      desc: "เราศึกษาทุกผลิตภัณฑ์ที่แนะนำ และตรวจราคากับราคาที่ผู้ให้บริการประกาศเอง รีวิวของเราไม่มีสปอนเซอร์ — เราได้รับเพียงค่าคอมมิชชันพันธมิตรเล็กน้อยเมื่อคุณซื้อผ่านลิงก์ของเรา โดยคุณไม่ต้องจ่ายเพิ่ม",
      checks: ["ไม่มีพื้นที่โฆษณาแบบจ่ายเงิน", "ราคาผ่านการตรวจสอบ", "อัปเดตทุกเดือน"],
    },
    cta: {
      eyebrow: "เริ่มที่นี่",
      title: "พร้อมวางแผนทริปญี่ปุ่นหรือยัง",
      desc: "เริ่มจากการจอง — ตั๋วและทัวร์แบบระบุเวลาคือส่วนเดียวของทริปญี่ปุ่นที่อาจขายหมดก่อนคุณไปถึง",
    },
    englishMeta: "หน้าภาษาอังกฤษ · English",
    englishSuffix: " (อังกฤษ)",
    updated: (m) => `อัปเดต ${m}`,
  },
};

/** Klook's own locale path segment for each edition — the one scripts/check-i18n.js expects. */
const KLOOK_LOCALE: Record<TranslatedLocale, string> = {
  "zh-tw": "zh-TW",
  "zh-cn": "zh-CN",
  ko: "ko",
  th: "th",
};

/**
 * The same Klook product in this edition's locale. Product ids are Klook's and are
 * locale-independent — see lib/klook-links-ko.ts — so the English page's own
 * constant with /en-US/ swapped is the same listing, in the reader's language and
 * currency. Throws on anything else, so a new English URL in another form cannot
 * reach a translated page unconverted.
 */
function localizeKlookUrl(url: string, locale: TranslatedLocale): string {
  const from = "https://www.klook.com/en-US/";
  if (!url.startsWith(from)) throw new Error(`LocaleHome: unexpected Klook URL ${url}`);
  return `https://www.klook.com/${KLOOK_LOCALE[locale]}/${url.slice(from.length)}`;
}

const allArticles = [...esimArticles, ...transportArticles, ...moneyArticles, ...attractionArticles];

/**
 * Every route of this edition the entry page links to.
 *
 * Exported because the four pages need it in their getStaticProps, to look up each
 * row's "Updated" month. That lookup cannot live here: lib/page-dates reads git
 * history through node:fs and node:child_process, and this component is in the client
 * bundle, so importing it here breaks the build. In a page file the same import is
 * dropped along with getStaticProps, which is how the Chinese hubs do it too.
 */
export function localeHomeRoutes(locale: TranslatedLocale): string[] {
  const grouped = COPY[locale].groups.flatMap((g) => g.routes);
  const rest = pagesIn(locale)
    .map((p) => routeOf(p, locale) as string)
    .filter((r) => !grouped.includes(r));
  return [...grouped, ...rest];
}

export default function LocaleHome({
  locale,
  dates,
}: {
  locale: TranslatedLocale;
  dates: Record<string, string>;
}) {
  const copy = COPY[locale];
  const home = HOME[locale];
  const route = LOCALE_HOME[locale];
  // The <title> lives in lib/i18n.ts beside the other sides of the group, so the
  // switch, the hreflang set and this page's own head can never disagree about it.
  const title = titleOf(HOME_GROUP, locale) ?? "";
  const trail: Crumb[] = [{ label: copy.eyebrow }];
  const groupRoutes = copy.groups.flatMap((g) => g.routes);

  /** A row's heading — the translated <title> of the page it points at. */
  const cardTitle = (target: string) => {
    const pair = pairFor(target);
    return (pair && titleOf(pair, locale)) || target;
  };

  /** This edition's version of an English route, or null when it has none. */
  const translated = (enHref: string) => {
    const pair = pairFor(enHref.split("#")[0]);
    return pair ? routeOf(pair, locale) : null;
  };

  /** A row for a page of this edition. */
  const ownRow = (target: string): HomeRow => ({
    href: target,
    title: cardTitle(target),
    desc: copy.blurbs[target] ?? "",
    meta: dates[target] ? home.updated(dates[target]) : "",
  });

  /** A row that leads into the English guides, marked as such. */
  const englishRow = (href: string, t: { title: string; desc: string }): HomeRow => ({
    href,
    title: t.title,
    desc: t.desc,
    meta: home.englishMeta,
    hrefLang: "en",
  });

  const bookCards: BookCard[] = BOOK_CARD_KEYS.map((key) => {
    const words = home.book.cards[key];
    const own = translated(BOOK_CARDS[key].guide);
    return {
      kicker: words.kicker,
      title: words.title,
      desc: words.desc,
      ctas: BOOK_CARDS[key].urls.map((url, i) => ({ label: words.ctas[i], url: localizeKlookUrl(url, locale) })),
      guide: own
        ? { href: own, label: words.guide }
        : { href: BOOK_CARDS[key].guide, label: `${words.guide}${home.englishSuffix}`, hrefLang: "en" },
    };
  });

  const stats = [
    { value: `${editionGuideCount(locale)}`, label: home.stats.translated },
    { value: `${attractionPrices.length}`, label: home.stats.prices },
    { value: `${allArticles.length}`, label: home.stats.total },
    { value: monthLabel(latestChecked(), locale), label: home.stats.checked },
  ];

  // English hubs this edition has no page for. Where it has one (the Chinese
  // editions' Things to Do hub), that page is already in the groups above.
  const englishHubRows = HUB_HREFS.filter((href) => !translated(href)).map((href) =>
    englishRow(href, home.hubs[href]),
  );

  const cityRows: HomeRow[] = (Object.keys(CITY_HREFS) as (keyof typeof CITY_HREFS)[]).map((key) => {
    const own = translated(CITY_HREFS[key]);
    const words = home.cities.items[key];
    return own
      ? { ...ownRow(own), title: words.title, desc: words.desc }
      : englishRow(CITY_HREFS[key], words);
  });

  const popularRows = POPULAR_HREFS.map(translated)
    .filter((r): r is string => r !== null)
    .map(ownRow);

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
              items: groupRoutes.map((target) => ({ href: target, title: cardTitle(target) })),
            }),
          }}
        />
      </Head>

      <HomeHero
        eyebrow={home.heroEyebrow}
        title={copy.titleLines[0]}
        titleAccent={copy.titleLines[1]}
        desc={copy.subtitle}
        primary={home.primary}
        secondary={{ href: "#categories", label: home.secondaryLabel }}
        imageAlt={home.heroAlt}
      />

      <BookSection
        eyebrow={home.book.eyebrow}
        title={home.book.title}
        desc={home.book.desc}
        cards={bookCards}
        note={
          <>
            {`${home.book.note} `}
            <Link href="/disclaimer" hrefLang="en">
              {home.book.disclaimer}
            </Link>
          </>
        }
      />

      <StatsBand stats={stats} />

      {/* Travel Guides — this edition's pages by group, then the English hubs it
          has no page for. The groups are what keeps the page usable as editions grow. */}
      <HomeSection
        id="categories"
        tone="white"
        eyebrow={home.guides.eyebrow}
        title={home.guides.title}
        desc={home.guides.desc}
      >
        {copy.groups.map((g) => (
          <RowGroup key={g.key} id={g.key} title={g.label} desc={g.desc} rows={g.routes.map(ownRow)} />
        ))}
        {englishHubRows.length > 0 && (
          <RowGroup id="english" title={copy.englishTitle} desc={copy.englishIntro} rows={englishHubRows} />
        )}
      </HomeSection>

      <HomeSection
        tone="paper"
        eyebrow={home.cities.eyebrow}
        title={home.cities.title}
        desc={home.cities.desc}
        rows={cityRows}
        footLink={{ href: "/guides", label: home.cities.footLink(allArticles.length), hrefLang: "en" }}
      />

      <HomeSection
        tone="white"
        eyebrow={home.popular.eyebrow}
        title={home.popular.title}
        desc={home.popular.desc}
        rows={popularRows}
      />

      {/* Not on the English page: the FAQPage JSON-LD above has to describe something
          the reader can see, and the three answers are about the edition itself. */}
      <PaperBand>
        <FaqList items={copy.faq} />
      </PaperBand>

      <TrustBand
        eyebrow={home.trust.eyebrow}
        title={home.trust.title}
        desc={home.trust.desc}
        checks={home.trust.checks}
      />

      <CtaBand eyebrow={home.cta.eyebrow} title={home.cta.title} desc={home.cta.desc} button={home.primary} />
    </>
  );
}
