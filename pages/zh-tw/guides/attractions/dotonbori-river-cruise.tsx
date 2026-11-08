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

const ROUTE = "/zh-tw/guides/attractions/dotonbori-river-cruise";
const TITLE = "道頓堀遊船 2026：¥2,000、20 分鐘、班次與搭船處";
const DESC =
  "道頓堀遊船票價與時間：とんぼり遊船成人 ¥2,000、約 20 分鐘，11:00–21:00 每半小時一班，大阪周遊卡免費。比較各船後預訂。";

const L = "zh-tw" as const;
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
  { tier: "成人", price: "¥2,000", what: "太左衛門橋碼頭的現場票價，也是衡量通票值不值得的基準" },
  { tier: "學生（國中以上）", price: "¥1,000", what: "成人的一半——大阪少數有學生票價的景點之一" },
  { tier: "兒童（小學生）", price: "¥500", what: "成人的四分之一" },
  { tier: "學齡前兒童", price: "免費", what: "每位付費成人可帶一位免費，第二位依兒童票 ¥500" },
  { tier: "大阪周遊卡持有人", price: "免費", what: "含一次搭乘——但必須先在接待櫃台換成指定時間的票" },
  { tier: "大阪 e-Pass 持有人", price: "免費", what: "大阪市官方的 e-Pass 頁面也把它列為免費設施" },
];

const scheduleRows = [
  { what: "首班", when: "11:00" },
  { what: "末班", when: "21:00" },
  { what: "班距", when: "每 30 分鐘一班——整點與半點，所以一天 21 班" },
  { what: "在水上的時間", when: "約 20 分鐘" },
  { what: "搭船處", when: "とんぼりリバーウォーク（北岸）的太左衛門橋碼頭，離戎橋一分鐘" },
  { what: "接待櫃台", when: "碼頭正對面的唐吉訶德道頓堀店 1 樓" },
  { what: "售票處開門", when: "當天首班前一小時——10:00" },
  { what: "線上訂票截止", when: "開船前 10 分鐘（預先付款）" },
  { what: "電話預約", when: "不受理" },
  { what: "2026 年停航日", when: "7 月 13、24、25 日" },
  { what: "臨時停航", when: "可能因河川狀況與船隻維修未經公告即變更" },
];

const boatRows = [
  {
    boat: "とんぼり遊船（一本松海運）",
    run: "約 20 分鐘，11:00–21:00 每半小時",
    fare: "成人 ¥2,000／學生 ¥1,000／兒童 ¥500",
    pass: "大阪周遊卡與大阪 e-Pass 免費",
    sold: "太左衛門橋碼頭現場，或業者自己的線上訂票",
  },
  {
    boat: "Wonder Cruise — 道頓堀航線",
    run: "20 分鐘，繞行道頓堀這一段",
    fare: "成人 ¥1,000／兒童 ¥500",
    pass: "未列為通票設施",
    sold: "日本橋碼頭，旁邊 WONDER PUB 店內的售票亭",
  },
  {
    boat: "Wonder Cruise — 大阪航線",
    run: "30～40 分鐘，日本橋↔八軒家濱單程",
    fare: "成人 ¥1,800／兒童 ¥900",
    pass: "未列為通票設施",
    sold: "同一個售票亭——班次有限，官方建議提前預約",
  },
  {
    boat: "浪花觀光遊船",
    run: "30 分鐘（依 Klook 商品頁說明）",
    fare: "目前票價請看商品頁",
    pass: "不是通票設施",
    sold: "Klook，繁體中文介面、海外信用卡",
  },
  {
    boat: "道頓堀 City Cruise",
    run: "20 分鐘（依 Klook 商品頁說明）",
    fare: "目前票價請看商品頁",
    pass: "不是通票設施",
    sold: "Klook——沙發式座位、可自帶飲料、可帶寵物",
  },
  {
    boat: "TONBORIRAVE 遊船",
    run: "DJ 船，而不是觀光航程",
    fare: "目前票價請看商品頁",
    pass: "不是通票設施",
    sold: "Klook——商品附 Piccadilly 夜店免費入場",
  },
];

const whoFor = [
  {
    title: "天黑之後再搭，如果…",
    desc: "你想要明信片上的那個版本。固力果招牌、戎橋一帶店面的霓虹、以及水面上的反光，就是這趟遊船的重點，而下午兩點它們一個都不存在。末班是 21:00，所以就算在大阪日落超過 19:00 的盛夏，天黑後還有四班可搭。",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "白天搭，如果…",
    desc: `你持有通票想把一天排得順，或你帶著小孩。白天的班次比較好搶到——通票業者自己的建議就是在白天去換票，因為傍晚的船最先沒位——而 13:00 的 20 分鐘航程對通票持有人來說不用錢，還可以塞在另外兩個行程之間。建議內容查核日 ${CHECKED}。`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "改搭別艘，如果…",
    desc: "你想要更便宜的票價、有靠背的座位、更長的航程，或是手上有一杯飲料。とんぼり那艘是班次最密、通票有涵蓋的；Wonder Cruise 從日本橋碼頭出發，同樣 20 分鐘只要一半的錢；其他道頓堀業者則賣 30 分鐘的航程、可自帶飲料的沙發座位船，以及附夜店入場的 DJ 船。同一條河，很不一樣的晚上。",
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
    title: "買任何東西之前，先決定你要不要用通票",
    desc: `這是整頁唯一會動到錢的決定。とんぼり遊船是大阪周遊卡的免費設施，一日卡 ${PASS_1_DAY}——所以如果行程裡本來就有一天要用通票，你根本不用買船票。如果沒有，現場成人票價是 ¥2,000，而日本橋碼頭的 Wonder Cruise 20 分鐘道頓堀航線是 ¥1,000，是這條河上較便宜的單張票。`,
  },
  {
    title: "用通票的話，當天早一點去換票",
    desc: "光有通票上不了船。你要在接待櫃台換成一張印有時間的票，業者明白寫著只能在票上的時間登船。通票業者自己的提醒是傍晚的船最先滿，所以請在白天完成換票——去別的行程途中經過碼頭，順手把時段處理掉。",
  },
  {
    title: "要自己付錢的話，現場或線上，不要打電話",
    desc: "當天票在碼頭旁的售票處賣，售票處在當天首班前一小時開門。不受理電話預約。線上訂票開放到開船前 10 分鐘，而且要預先付款——週五或週六晚上值得用這一種。",
  },
  {
    title: "碼頭比地址看起來好找",
    desc: "太左衛門橋碼頭在北岸的とんぼりリバーウォーク步道上，接待櫃台在唐吉訶德道頓堀店一樓——就是側面掛著摩天輪那一棟。從難波、心齋橋或日本橋站走 5 到 10 分鐘，但這三站都把你放在對岸，所以要從戎橋或太左衛門橋過河。",
  },
  {
    title: "從頭到尾預留約 40 分鐘，不是 20 分鐘",
    desc: "遊船是 20 分鐘。接待櫃台排隊、走下浮動碼頭、以及一艘二、三十人的船登船，是另外那一半。如果你要把它塞在晚餐訂位與表演之間，請當成 40 分鐘的區塊。",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "道頓堀遊船票價多少？",
    a: `成人 ¥2,000。とんぼり遊船——業者從太左衛門橋碼頭開出的那一艘——成人 ¥2,000、國中以上學生 ¥1,000、小學生兒童 ¥500，每位付費成人可帶一位學齡前兒童免費。大阪官方觀光機構與大阪周遊卡業者自己的設施清單，印的是同樣這三個數字。它在大阪周遊卡與大阪 e-Pass 都免費，兩種情況都要先在接待櫃台換成指定時間的票。這條河上其他的船各自定價——日本橋碼頭的 Wonder Cruise 20 分鐘道頓堀航線是 ¥1,000，Klook 上販售的幾艘則在各自的商品頁標價。全部查核日 ${CHECKED}。`,
  },
  {
    q: "とんぼり遊船要搭多久？",
    a: `在水上約 20 分鐘，沿著穿過南區核心的道頓堀川來回。以遊船來說算短，但長度是對的：它涵蓋的河段只有幾百公尺的霓虹店面，再長一點也只是再繞一圈。把接待櫃台、走到浮動碼頭與登船算進去，從頭到尾請預留接近 40 分鐘。航程長度依大阪官方觀光網站與「水都大阪」遊船入口網站，查核日 ${CHECKED}。`,
  },
  {
    q: "道頓堀遊船幾點開船？",
    a: `從 11:00 到 21:00，每 30 分鐘一班——整點與半點，所以一天 21 班，2026 年除了 7 月 13、24、25 日之外每天航行。碼頭旁的售票處在首班前一小時開門，也就是 10:00。排行程時真正重要的數字是 21:00 的末班：它晚到任何季節都能在晚餐後塞進一趟夜遊，也因此傍晚的時段才是稀少的那些，而不是白天。時刻查核日 ${CHECKED}；可能因河川狀況與船隻維修變動。`,
  },
  {
    q: "道頓堀遊船的末班是幾點？",
    a: `只要有航班的日子都是 21:00。因為每一班都同一個票價，末班是看到完全點燈版道頓堀最便宜的方式——但它也落在通票業者說會最先賣完的時段裡，所以這是唯一值得提前確保、而不是現場碰運氣的一班。用通票的話，白天就去換 20:30 或 21:00 的票；自己付錢的話，業者的網路訂票開放到開船前 10 分鐘。末班時間依大阪官方觀光網站與通票業者的設施清單，兩者一致，查核日 ${CHECKED}。`,
  },
  {
    q: "道頓堀遊船在哪裡搭？",
    a: "在太左衛門橋碼頭，位於道頓堀川北岸的とんぼりリバーウォーク步道上，大約在戎橋東邊一分鐘。接待櫃台在碼頭正對面的唐吉訶德道頓堀店一樓，那才是該瞄準的地標，而不是碼頭本身。從難波、心齋橋或日本橋站走 5 到 10 分鐘，三站都把你放在有固力果招牌的南岸，所以要從戎橋或太左衛門橋過河才到得了船邊。另外 Wonder Cruise 是不同業者，在日本橋碼頭登船——走去浮動碼頭之前，先確認你的票是哪一艘。",
  },
  {
    q: "道頓堀遊船和とんぼり遊船是同一艘嗎？",
    a: `是同一艘、兩個名字。「とんぼりリバークルーズ」是官方商品名，由一本松海運營運，也是票上、碼頭上與大阪周遊卡免費設施清單上出現的名字。「道頓堀遊船」是大多數旅客搜尋的描述性說法，而且也被鬆散地用來指這條河上的任何一艘船——包括日本橋碼頭的 Wonder Cruise，以及 Klook 上販售的 City Cruise、浪花觀光遊船與 TONBORIRAVE DJ 船，那些是不同業者、不同票價。如果你是因為通票才搭，這些當中只有とんぼり那艘被涵蓋。名稱與業者查核日 ${CHECKED}。`,
  },
  {
    q: "有比 ¥2,000 的とんぼり遊船更便宜的船嗎？",
    a: `有，前提是你沒有用通票。大阪官方觀光機構把 Wonder Cruise 道頓堀航線列為成人 ¥1,000、兒童 ¥500，繞行同一段河 20 分鐘——同樣長度、一半票價——在日本橋碼頭登船，售票亭在旁邊的 WONDER PUB 店內。它較長的大阪航線是日本橋到八軒家濱的單程 30 到 40 分鐘，成人 ¥1,800、兒童 ¥900。代價是每條航線班次有限，官方建議提前預約，而且沒有任何大阪通票涵蓋它。如果你手上是大阪周遊卡，とんぼり那艘免費，這個比較就不存在。票價查核日 ${CHECKED}。`,
  },
  {
    q: "大阪周遊卡搭道頓堀遊船免費嗎？",
    a: `免費——とんぼり遊船是大阪周遊卡的免費設施之一，而且沒有像梅田藍天大廈那樣的時間限制。它在大阪 e-Pass 也是免費設施。條件是流程而不是金額：你要在接待櫃台把通票換成一張印有開船時間的票，業者明白寫著只能在票上的時間登船。通票業者也提醒傍晚的遊船很快賣完，建議在白天換票。一日卡 ${PASS_1_DAY}，光是 ¥2,000 的遊船加上大阪城天守閣 ¥1,200，在你還沒搭任何一趟地鐵之前就已經接近打平。條件查核日 ${CHECKED}。`,
  },
  {
    q: "道頓堀遊船需要提前訂嗎？",
    a: "通常不用，但傍晚和下午是兩回事。當天票在碼頭旁的售票處賣，售票處在首班前一小時開門，平日下午直接去就好。不受理電話預約。週五或週六晚上的班次，請用業者的線上訂票——開放到開船前 10 分鐘、要預先付款；如果你用通票，就在白天先換好傍晚的時段，因為業者自己的說法是夜間的船最先沒位。",
  },
  {
    q: "道頓堀遊船晚上還是白天好？",
    a: "只搭一次的話，晚上。你付錢買的是固力果招牌、霓虹店面與水面的燈光，這些都需要天黑。白天有兩個站得住腳的理由，而且都很實際：時段比較搶得到，而想在一天裡塞進好幾個免費設施的通票持有人，會發現 13:00 的班次比 19:30 好安排。如果想挑一班剛好遇上天色轉暗的船，我們的梅田藍天大廈攻略（英文）列有大阪各季節公告的日落時間。",
  },
  {
    q: "下雨還會開船嗎？",
    a: `通常會，但請帶件外套和帽子：這艘船在「水都大阪」遊船入口網站上被列為沒有屋頂（查核日 ${CHECKED}），正是這點讓它能從道頓堀那些低矮的橋下通過。公告的停航條件並不是雨本身——通票業者的設施清單寫的是可能因河川狀況或船隻維修停止營運。請把大雨與水位上升當成風險，而不是一陣雨；天氣不穩的話，同樣幾條街裡淋不到雨的替代方案是美食散步，而不是搭船。`,
  },
  {
    q: "道頓堀的遊船該選哪一艘？",
    a: "如果你持有大阪通票，或想要班次最密的那一艘，選とんぼり遊船——¥2,000、20 分鐘、每半小時一班，而且是通票唯一涵蓋的那艘。如果你要自己付錢、想用 ¥1,000 搭同樣的 20 分鐘，不介意改到日本橋碼頭登船、也不介意因為班次有限而要提前預約，選 Wonder Cruise 道頓堀航線。想要 30 分鐘較長的航程，選浪花觀光遊船。比較想要沙發式座位和手上一杯自己的飲料，選道頓堀 City Cruise；它的商品頁還寫可以帶寵物，這在遊船裡少見。如果這趟是夜生活的開場而不是觀光，選 TONBORIRAVE——船上有 DJ，票還附 Piccadilly 夜店免費入場。同一條河，很不一樣的晚上。",
  },
  {
    q: "帶小孩搭道頓堀遊船適合嗎？",
    a: "適合，票價結構就說明了：小學生兒童 ¥500，成人 ¥2,000。20 分鐘短到足以撐住小小孩的注意力，解說輕快熱鬧而不是一本正經，而且不像展望台或主題樂園設施那樣要排隊。要先想好的是這是一艘沒有屋頂的船——八月的太陽、一月的風——以及指定時間的票意味著你要在票上的時間之前抵達，而不是到了再說。",
  },
  {
    q: "遊船前後，道頓堀周邊還能做什麼？",
    a: "船上 20 分鐘撐不起一個晚上，而碼頭兩側的街道是全日本吃的密度最高的地方。白天的選擇是美食散步——Klook 上 11:00 到 14:00 的道頓堀拼團行程，包含串炸、章魚燒、季節午餐套餐與一道甜點，2 到 10 人成團。晚上的選擇是穿過難波與後巷的酒吧巡禮，而不是道頓堀大街本身。兩者走的都是遊船從水上讓你看到的那幾百公尺城市。",
  },
];

const tourPicks = [
  withKlookLocale(dotonboriDaytimeFoodTour, L, {
    title: "大阪道頓堀白天美食之旅",
    desc: "三小時的拼團散步，時間為 11:00–14:00、2 到 10 人，內容有串炸、章魚燒、居酒屋的季節午餐套餐與一道在地甜點",
  }),
  withKlookLocale(nambaBarHoppingNightTour, L, {
    title: "大阪難波酒吧巡禮夜間之旅",
    desc: "三個半小時的晚間拼團行程，由說英語的導遊帶路，走難波與天滿一帶的酒吧，而不是道頓堀大街",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "道頓堀遊船" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ZhDotonboriRiverCruisePage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            道頓堀遊船（2026）：<br />票價、班次時間與とんぼり那一艘
          </h1>
          <p className={styles.heroSubtitle}>
            成人 ¥2,000、約 20 分鐘，11:00 到 21:00 之間從太左衛門橋碼頭每半小時一班——只要在傍晚的船
            滿之前去換票，大阪周遊卡就是免費。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "官方票價，附查核日", "六種選擇比較"].map((t) => (
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
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>票價</p>
                <p className={styles.verdictStatValue}>成人 ¥2,000／兒童 ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>在水上的時間</p>
                <p className={styles.verdictStatValue}>約 20 分鐘</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>班次</p>
                <p className={styles.verdictStatValue}>11:00–21:00，每半小時</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>大阪周遊卡</p>
                <p className={styles.verdictStatValue}>全天免費</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>道頓堀遊船</strong>——官方名稱是<strong>とんぼりリバークルーズ</strong>，
              由<strong>一本松海運</strong>營運——成人<strong>¥2,000</strong>，
              航程<strong>約 20 分鐘</strong>，從離戎橋一分鐘的とんぼりリバーウォーク
              <strong>太左衛門橋碼頭</strong>，<strong>11:00 到 21:00 每 30 分鐘一班</strong>。
              它在<strong>大阪周遊卡是免費</strong>的。
            </p>
            <p className={styles.verdictText}>
              其餘細節：國中以上學生<strong>¥1,000</strong>、小學生兒童<strong>¥500</strong>，
              每位付費成人可帶一位學齡前兒童免費。接待櫃台在碼頭正對面的唐吉訶德道頓堀店 1 樓。
              <strong>大阪 e-Pass</strong> 也涵蓋它，兩種通票都沒有下午時間限制——但通票不會直接讓你上船：
              你要在接待櫃台換成一張印有開船時間的票，而通票業者提醒傍晚的遊船最先賣完。當天票從首班前
              一小時（10:00）起在碼頭販售；線上訂票在開船前 10 分鐘關閉，並且不受理電話預約。
              全部查核日 {CHECKED}。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看大阪周遊卡 →
              </KlookLink>
              <KlookLink href={K.city} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                用繁體中文訂道頓堀遊船 →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>總覽</span>
          <h2 className={styles.sectionTitle}>道頓堀遊船到底是什麼？</h2>
          <p className={styles.bodyText}>
            一趟 <strong>20 分鐘、¥2,000</strong> 的航程，船身低、沒有屋頂，名字叫
            <strong>とんぼりリバークルーズ</strong>，由<strong>一本松海運</strong>營運，
            從<strong>太左衛門橋碼頭</strong>在 <strong>11:00 到 21:00</strong> 之間每半小時開一班，
            而且<strong>大阪周遊卡免費</strong>。「道頓堀遊船」是旅客搜尋的說法；
            <strong>とんぼりリバークルーズ</strong>才是票上、碼頭指標與通票業者免費設施清單上的名字，
            也是你在現場該找的那個。
          </p>
          <p className={styles.bodyText}>
            它行駛的，是固力果招牌、戎橋人潮與那隻巨大機械蟹全都面對著的那幾百公尺水面，船上有導覽員
            用大阪出了名的那種節奏明快的口吻解說。
          </p>
          <p className={styles.bodyText}>
            值得花 20 分鐘的理由是視線。街上的道頓堀是一團擠：你肩並肩站在戎橋上，想拍一個根本退不開的
            招牌。從水面上，你在人群之下，正對著店面有一條乾淨的視線，而橋從頭上近距離經過，也順便解釋
            了這些船為什麼沒有屋頂。
          </p>
          <p className={styles.bodyText}>
            這裡沒有要搶的指定入場系統、沒有開票日、平日下午也沒有賣完的風險。取而代之的是
            <strong>通票持有人的換票規則</strong>，以及比白天更早客滿的傍晚——大多數人該怎麼安排，
            就由這兩點決定。本頁其餘部分是票價、時刻、碼頭，以及在同一段河上營運的另外四艘船。
          </p>
        </section>

        {/* Fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>道頓堀遊船票價多少？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>成人 ¥2,000、學生 ¥1,000、兒童 ¥500。</strong>每個年齡層一個價，每一班都一樣——
            夜間班次沒有加價，這並不常見，也是它其實划算的低調理由：
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["對象", "票價", "備註"].map((h) => (
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
            票價讀自大阪官方觀光網站與大阪周遊卡業者自己的免費設施清單，查核日 {CHECKED}，兩邊印的是同樣
            三個數字。船公司自己的網站在查核當天因維修無法連線，所以本頁每一個數字的來源都是上面那兩個。
            可能變動——付款前請確認。本站整理的日本其他景點門票（各自附查核日），請見{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              日本景點門票價格總表（英文）
            </Link>。
          </p>
        </section>

        {/* Schedule */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>時間與碼頭</span>
          <h2 className={styles.sectionTitle}>道頓堀遊船幾點開船？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>11:00 到 21:00，每 30 分鐘一班</strong>——整點與半點，2026 年除了 7 月 13、24、25 日
            之外每天航行。碼頭旁的售票處在首班前一小時開門，也就是 <strong>10:00</strong>：
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "內容"].map((h) => (
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
            一天 21 班是有用的那個數字。它代表這趟遊船是你塞進一個晚上的東西，而不是整個晚上要圍著它排；
            而 <strong>21:00 的末班</strong>晚到任何季節都還能在晚餐後成立。時刻查核日 {CHECKED}。
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            とんぼり遊船要搭多久？
          </h3>
          <p className={styles.bodyText}>
            <strong>在水上約 20 分鐘。</strong>大阪官方觀光網站寫 20 分鐘，「水都大阪」遊船入口網站寫
            「約 20 分鐘」，查核日都是 {CHECKED}。實際請預留<strong>從頭到尾約 40 分鐘</strong>：接待櫃台、
            走下浮動碼頭，以及一艘二、三十人的船登船，是另外那一半。20 分鐘對這條路線來說剛好——這段河
            只有幾百公尺的霓虹店面，再長一點也只是再繞一圈。
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            道頓堀遊船在哪裡搭？
          </h3>
          <p className={styles.bodyText}>
            在<strong>太左衛門橋碼頭</strong>，位於道頓堀川<strong>北岸</strong>的とんぼりリバーウォーク
            步道上，大約在戎橋東邊一分鐘。請瞄準地標而不是碼頭：接待櫃台在
            <strong>唐吉訶德道頓堀店 1 樓</strong>——側面掛著摩天輪那一棟——就在浮動碼頭正對面。從
            <strong>難波</strong>、<strong>心齋橋</strong>或<strong>日本橋</strong>站走 5 到 10 分鐘，
            但三站都把你放在有固力果招牌的南岸，所以要從戎橋或太左衛門橋過河才到得了船邊。御堂筋線如何
            連接難波與梅田、天王寺，請見我們的{" "}
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>大阪交通攻略（英文）</Link>。
            位置與步行時間查核日 {CHECKED}。
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            當天買還是提前訂——以及船什麼時候會滿
          </h3>
          <p className={styles.bodyText}>
            這兩種方式並不等價，而差別只在天黑之後才重要。<strong>當天</strong>：碼頭旁的售票處從
            10:00 起賣下一個還有位的班次，而通票業者的用語很直接——「所有座位都滿的時候就不能登船」。
            <strong>提前</strong>：業者的網路訂票要預先付款，並開放到<strong>開船前 10 分鐘</strong>，
            週五或週六晚上值得用這一種。電話預約完全不受理。
          </p>
          <p className={styles.bodyText}>
            至於哪些時段最先沒位，唯一公告過的說法來自通票業者，而且很具體：請在<strong>白天</strong>
            換票，因為<strong>傍晚的遊船很快賣完</strong>。照字面讀，天黑之後那些班次——19:00 到 21:00
            這一串，週末更是如此——才是稀少的，而平日下午是直接去就能搭的時段。除此之外沒有任何公開的
            載客率數字，所以更精確的說法請當成猜測而不是數據。說明查核日 {CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪周遊卡——含遊船 →
            </KlookLink>
            <KlookLink href={K.city} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              提前訂道頓堀遊船時段 →
            </KlookLink>
          </div>
        </section>

        {/* Night or day */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>什麼時候搭</span>
          <h2 className={styles.sectionTitle}>道頓堀遊船晚上還是白天好？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            <strong>只搭一次就晚上</strong>——霓虹才是商品，而每一班票價相同，所以那個夜景是免費附贈。
            但通票會改變答案，因為你真正搶得到的時段，不一定是你想要的時段：
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
            如果想剛好遇上天色轉暗，請依日期挑班次：我們的{" "}
            <Link href="/guides/attractions/umeda-sky-building-tickets" style={linkStyle}>梅田藍天大廈攻略（英文）</Link>{" "}
            列有大阪各季節公告的日落時間，一年之中前後相差約兩個半小時。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={K.rave} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              夜生活路線的 DJ 遊船 →
            </KlookLink>
            <KlookLink href={K.naniwa} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              30 分鐘觀光遊船 →
            </KlookLink>
          </div>
        </section>

        {/* Compare the boats */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>道頓堀的遊船該選哪一艘？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            這段水面上有好幾家業者，而且不能互相替代。有兩個不對稱值得注意。第一，
            <strong>只有とんぼり那艘是通票設施</strong>，而 Klook 並沒有把它當成單獨商品販售——所以如果
            你持有大阪通票，你要的那艘是在櫃台訂、而不是在手機上訂的。第二，唯一有公告官方票價的對手，
            日本橋碼頭的 <strong>Wonder Cruise</strong>，
            <strong>以 ¥1,000 跑 20 分鐘的道頓堀航線——とんぼり票價的一半</strong>，
            這是你自己付錢又沒有通票時的答案。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["船", "航程長度", "票價", "大阪通票涵蓋？", "在哪裡賣"].map((h) => (
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
            とんぼり的數字來自大阪官方觀光網站與通票業者的設施清單；Wonder Cruise 那兩列來自同一個觀光
            機構自己的 WONDER CRUISE・PIRATES 頁面；最後三列寫的是各 Klook 商品頁自己的說明。全部查核日{" "}
            {CHECKED}。Klook 價格依日期而變，所以這裡不引用任何 Klook 票價——請打開商品頁看目前的金額
            與取消條件，那是依商品而不是依業者設定的。可能變動。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={K.city} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              沙發座位 City Cruise →
            </KlookLink>
            <KlookLink href={K.wonder} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪 Wonder Cruise →
            </KlookLink>
          </div>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>道頓堀遊船怎麼訂</h2>
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
              在 Klook 查看大阪周遊卡 →
            </KlookLink>
            <KlookLink href={K.dayTour} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪城、梅田展望台加遊船一日遊 →
            </KlookLink>
          </div>
        </section>

        {/* The pass question */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>通票的問題</span>
          <h2 className={styles.sectionTitle}>大阪周遊卡搭道頓堀遊船免費嗎？</h2>
          <p className={styles.bodyText}>
            <strong>免費，而且全天。</strong>とんぼり遊船是大阪周遊卡 40 多項免費設施之一，而且
            <strong>沒有下午時間限制</strong>——這值得說清楚，因為同一張通票的梅田藍天大廈在 15:00
            之後就不再免費。它在大阪 e-Pass 也是免費設施。
          </p>
          <p className={styles.bodyText}>
            卡住你的是隊伍，不是時鐘。通票不會直接讓你上船：你要在接待櫃台換成一張印有開船時間的票，
            業者明白寫著<strong>只能在票上的時間登船</strong>。他們公告的建議是傍晚的遊船很快賣完，
            請在白天完成換票。實務上，那表示去吃午餐的路上經過唐吉訶德，順手把 19:30 的時段拿下來，
            而不是 19:20 才到、然後發現下一班免費的船是 21:00。
          </p>
          <p className={styles.bodyText}>
            算起來很寬裕。一日卡 {PASS_1_DAY}，遊船（¥2,000）加上大阪城天守閣（¥1,200）就是 ¥3,200 的
            入場費，而你還沒算進任何一趟地鐵；15:00 之前的梅田展望台再加 ¥2,000。完整的免費設施清單、
            兩日卡價格與不含項目，請見我們的{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>大阪周遊卡攻略（英文）</Link>；
            城市一日裡哪些部分通票會幫你付、哪些不會，請見{" "}
            <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>大阪景點攻略（英文）</Link>。
            條件查核日 {CHECKED}。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              大阪周遊卡 →
            </KlookLink>
            <KlookLink href={K.foodTour} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              道頓堀美食散步，11:00–14:00 →
            </KlookLink>
          </div>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="搭船前後的那幾個小時"
          intro="船上 20 分鐘之外，整個晚上都還空著，而碼頭周圍的街道是全日本吃的密度最高的地方。第一個是白天的散步行程，第二個是天黑之後的。Klook 價格依日期而變，請打開商品頁查看目前的金額與集合地點。"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/osaka-food-tour", title: "大阪美食之旅（2026）：該訂哪一個、時間與吃什麼（英文）" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "大阪兩天一夜行程（2026）：每日安排與該訂什麼（英文）" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "大阪周遊卡（2026）：一日 ¥2,500 值得買嗎？（英文）" },
            { href: "/guides/attractions/things-to-do-osaka", title: "大阪景點（2026）：通票划算與不划算的地方（英文）" },
            { href: "/guides/attractions/umeda-sky-building-tickets", title: "梅田藍天大廈門票（2026）：票價、營業時間與最佳時段（英文）" },
            { href: "/guides/attractions/osaka-castle-tickets", title: "大阪城門票（2026）：票價、營業時間與通票涵蓋範圍（英文）" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "大阪海遊館門票（2026）：票價、營業時間與入場時段（英文）" },
            { href: "/guides/attractions/tokyo-bay-cruise", title: "東京灣遊船（2026）：屋形船與 Symphony 比較、時間與票價（英文）" },
            { href: "/guides/transport/osaka-transportation", title: "大阪交通攻略（2026）：地鐵、電車與 IC 卡（英文）" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "日本景點門票價格總表（2026）：官方票價與預約規則（英文）" },
            { href: "/zh-tw/guides/attractions", title: "日本景點門票攻略（2026）：官方票價、預約方式與一日遊 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>要處理的是時段，不是票</h2>
            <p className={styles.ctaBannerDesc}>
              ¥2,000 的票價是小事。稀少的是傍晚的班次，而讓這趟免費的通票，還是要在夜間的船滿之前
              到櫃台換票。付款前請看自己訂單上顯示的取消條件——那是依商品、不是依業者設定的。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={K.pass} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                在 Klook 查看大阪周遊卡 →
              </KlookLink>
              <KlookLink href={K.city} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                訂道頓堀遊船 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
