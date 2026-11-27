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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  ghibliParkNagoyaBusTour,
  ghibliParkTicket,
  jrPassWholeJapan,
  klookEsim,
  legolandJapanHotelPackage,
  legolandJapanTicket,
  nagoyaArrivalShinkansenPrep,
  nagoyaParkStayAreas,
  shinkansenTokyoNagoya,
  shoryudoHighwayBusPass,
  takayamaShirakawagoNagoyaDayTrip,
  shirakawagoTakayamaOldTownDayTour,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import fares from "../../../../data/jr-fares.json";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/tokyo-to-nagoya-shinkansen) section by section as of
// 2026-11-28 (task jtk-20261127-TR03): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: 東京到名古屋新幹線 — the route as Taiwan / Hong Kong results write it (ekitan.com/zh-tw
// "從東京到名古屋的新幹線票價和訂票方式").

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/transport/tokyo-to-nagoya-shinkansen";
const TITLE = "東京到名古屋新幹線 2026：票價、車程時間與購票方式";
const H1 = "東京到名古屋新幹線 2026：車程時間、票價與 JR Pass";
const DESC =
  "東京到名古屋新幹線：希望號最快 1 小時 33 分直達，指定席 ¥11,100。JR Pass 可搭光號，透過 Klook 購票。";

const OWN_ISO = "2026-10-28";
const OWN = dateLabel(OWN_ISO, LOCALE);
const PARKS = dateLabel("2026-10-26", LOCALE);
const LAST_CHECKED = "2026-11-18";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);

const tokyoNagoya = fares.segments.find((s) => s.id === "tokyo-nagoya")!;
const WINDOW_FARE = `¥${tokyoNagoya.fareYen.toLocaleString("en-US")}`;
const FARE_AS_OF = monthLabel(`${fares.asOf}-01`, LOCALE);

const SMART_EX_NOZOMI = "¥11,100";
const SMART_EX_HIKARI = "¥10,890";
const NOZOMI_TICKET = "¥4,180";
const JR_PASS_7 = "¥50,000";
const KINTETSU_PASS_1 = "¥1,900";

const JRC_TRAININFO_URL = "https://traininfo.jr-central.co.jp/shinkansen/pc/en/ti04.html?station=1&bound=2";
const SMART_EX_PDF_URL = "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_reserved.pdf";
const NOZOMI_FASTEST = "1 小時 33 分";
const NOZOMI_RANGE = "1 小時 33 分至 1 小時 41 分";
const HIKARI_RANGE = "1 小時 41 分至 1 小時 59 分";
const KODAMA_RANGE = "2 小時 36 分至 2 小時 46 分";
const NOZOMI_PER_DAY = 119;

const SHINKANSEN_URL = klookFor(shinkansenTokyoNagoya.url, LOCALE);
const GHIBLI_TOUR_URL = klookFor(ghibliParkNagoyaBusTour.url, LOCALE);
const GHIBLI_TICKET_URL = klookFor(ghibliParkTicket.url, LOCALE);
const LEGOLAND_URL = klookFor(legolandJapanTicket.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const SHORYUDO_URL = klookFor(shoryudoHighwayBusPass.url, LOCALE);
const SHIRAKAWAGO_URL = klookFor(takayamaShirakawagoNagoyaDayTrip.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const answerRows = [
  {
    train: "希望號 NOZOMI（最快）",
    time: `${NOZOMI_RANGE}，直達`,
    fare: SMART_EX_NOZOMI,
    note: `每天從東京出發、停靠名古屋的有 ${NOZOMI_PER_DAY} 班，首班車 06:00。JR Pass 不能搭乘`,
  },
  {
    train: "光號 HIKARI",
    time: `${HIKARI_RANGE}，直達`,
    fare: SMART_EX_HIKARI,
    note: "每天從東京出發 30 班。JAPAN RAIL PASS 可搭乘",
  },
  {
    train: "回聲號 KODAMA",
    time: `${KODAMA_RANGE}，直達`,
    fare: SMART_EX_HIKARI,
    note: "每天從東京出發 29 班，每站皆停",
  },
];

/** The eight 2026–27 periods JR Central lists, as the English page prints them. */
const nozomiAllReservedPeriods = [
  "2026 年 4 月 24 日–5 月 6 日（黃金週）",
  "2026 年 8 月 7–16 日（盂蘭盆節）",
  "2026 年 9 月 18–23 日",
  "2026 年 10 月 10–12 日",
  "2026 年 11 月 21–23 日",
  "2026 年 12 月 25 日–2027 年 1 月 5 日",
  "2027 年 1 月 9–11 日",
  "2027 年 3 月 20–22 日",
];

const routeRows = [
  {
    item: "東京 → 名古屋最快車程",
    value: `希望號 ${NOZOMI_FASTEST}`,
    detail: `直達，不用轉車。大部分希望號需 1 小時 35 分至 1 小時 40 分，查核當天的完整範圍是 ${NOZOMI_RANGE}`,
    source: `JR東海列車資訊，${CHECKED}`,
  },
  {
    item: "從東京出發、停靠名古屋的希望號",
    value: `每天 ${NOZOMI_PER_DAY} 班，首班車 06:00`,
    detail: "每班希望號都停靠名古屋。大部分時段每隔幾分鐘就有一班，所以規劃時要看的是您的車票能搭哪一班，而不是時刻表",
    source: `JR東海列車資訊，${CHECKED}`,
  },
  {
    item: "JR Pass 可搭的列車（光號）",
    value: `${HIKARI_RANGE}，不用轉車`,
    detail: "JAPAN RAIL PASS 不能搭希望號，但可以搭從東京直達名古屋的光號，每天從東京出發 30 班。多花的是幾分鐘而不是一小時，因此這是東海道新幹線上對 JR Pass 持有人最友善的路段",
    source: `JR東海列車資訊，${CHECKED}`,
  },
  {
    item: "回聲號（每站皆停）",
    value: KODAMA_RANGE,
    detail: "每站皆停的列車，每天從東京出發 29 班。JR Pass 可搭乘，但只有要去途中的小站時才值得搭",
    source: `JR東海列車資訊，${CHECKED}`,
  },
  {
    item: "這段路線販售的座位等級",
    value: "普通車自由席、普通車指定席、綠色車廂指定席",
    detail: "Klook 路線頁面列出的三種車票。東海道新幹線沒有 Gran Class，Gran Class 是東北與北陸新幹線的車廂",
    source: `klook.com 鐵路頁面，${OWN}`,
  },
  {
    item: "改從品川出發",
    value: "同樣的車票，同樣的希望號車票價格",
    detail: "東海道新幹線的希望號都會在離開東京車站幾分鐘後停靠品川，JR 也把 JR Pass 持有人的希望號車票訂為「東京／品川–名古屋」同一價格。住在東京南側或西側的話，從品川上車即可",
    source: `japanrailpass.net，${OWN}`,
  },
];

const priceRows = [
  {
    item: "東京 → 名古屋單程，普通車指定席（希望號、瑞穗號）",
    price: SMART_EX_NOZOMI,
    covers: "JR 的 smartEX 線上價格，大人 1 位、平常期、最快的列車。大多數旅客付的就是這個價格",
    source: `smart-ex.jp smartEX 票價表，${OWN}`,
  },
  {
    item: "光號、回聲號、櫻花號、燕子號的同等座位",
    price: SMART_EX_HIKARI,
    covers: "同一張 smartEX 票價表上便宜 ¥210，是不搭希望號的折扣。這段路線搭較慢的列車約多花 15 分鐘",
    source: `smart-ex.jp smartEX 票價表，${OWN}`,
  },
  {
    item: "東京 → 名古屋，車站售票櫃檯",
    price: `約 ${WINDOW_FARE}`,
    covers: "基本車資加上光號指定席特急費用。光號是 JAPAN RAIL PASS 不必另付費用就能搭的列車",
    source: `本站 JR 票價資料，${FARE_AS_OF}時點。是四捨五入的參考值，不是營運業者的票價表`,
  },
  {
    item: "JR Pass 持有人專用的希望號、瑞穗號車票",
    price: `${NOZOMI_TICKET}，東京或品川–名古屋`,
    covers:
      "JAPAN RAIL PASS 持有人每次搭希望號都要購買的專用車票。JR 說明「綠色車廂車票、普通車指定席車票與普通車自由席車票價格相同」",
    source: `japanrailpass.net，${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS 普通車",
    price: `線上 7 日 ${JR_PASS_7}、14 日 ¥80,000、21 日 ¥100,000`,
    covers: "向海外旅行社購買的兌換券為 ¥53,000、¥84,000、¥105,000。綠色車廂線上 ¥70,000、¥110,000、¥140,000，兌換券 ¥74,000、¥116,000、¥147,000",
    source: `JR 集團官方價格表，${OWN}`,
  },
  {
    item: "近鐵周遊券 KINTETSU RAIL PASS（伊勢路段）",
    price: `1 日 ${KINTETSU_PASS_1}、2 日 ¥3,700、5 日 ¥4,900、5 日 Plus ¥6,700`,
    covers: "近鐵自己的外國旅客周遊券。從近鐵名古屋到伊勢的是近鐵路線，和 JR 是不同的鐵路公司，JR 的周遊卡都不能用",
    source: `kintetsu.co.jp 英文周遊券頁面，${OWN}`,
  },
];

const compareRows = [
  {
    option: "每趟購買希望號指定席單程票",
    cost: `smartEX 單程 ${SMART_EX_NOZOMI}`,
    gets: `最快的直達列車（最快 ${NOZOMI_FASTEST}），不用轉車，也不必另外購買或規劃其他東西。`,
    pick: "首選。單程兩張約 ¥22,200，7 日周遊卡官方網站 ¥50,000、旅行社 ¥53,000，只來回名古屋遠遠不划算。",
  },
  {
    option: "JAPAN RAIL PASS 7 日普通車，搭光號",
    cost: `線上 ${JR_PASS_7}`,
    gets: "可搭全國 JR 路線，東京–名古屋搭光號也一樣直達，不用轉車。",
    pick: "同一週還要去京都、金澤、廣島或東北時才選。名古屋是東海道新幹線沿線用周遊卡幾乎不多花時間的城市，最適合當周遊卡行程的中途停留站。",
  },
  {
    option: "JAPAN RAIL PASS 加希望號車票",
    cost: `${JR_PASS_7}，每趟另付 ${NOZOMI_TICKET}`,
    gets: "周遊卡加上最快的列車，但這段路線光號只慢約 15 分鐘。",
    pick: "這段路線很少值得。等於花 ¥4,180 換 15 分鐘。希望號車票留給車程差距達 1 小時 15 分的東京–廣島使用。",
  },
  {
    option: "普通車自由席",
    cost: "比指定席便宜，差額就是指定席費用",
    gets: "到車站直接搭來的那一班。但下方 8 個旺季期間，希望號全車都是指定席。",
    pick: `非旺季、行李不多時。光是東京出發的希望號每天就有 ${NOZOMI_PER_DAY} 班，這個方法實際可行；每天只有 30 班的路線就不行。`,
  },
  {
    option: "昇龍道高速巴士周遊券",
    cost: "請在商品頁查看您的日期",
    gets: "以名古屋為起點，3 天或 5 天搭乘中部地區外國旅客專用高速巴士，含機場交通車票。",
    pick: "不是用在東京這一段。抵達後如果不是只去一座樂園，而是要去高山、白川鄉和伊勢，這才是要買的周遊券。",
  },
  {
    option: "名古屋出發的一日遊",
    cost: "請在商品頁查看您的日期",
    gets: "白川鄉與高山老街，或吉卜力公園與愛知航空博物館，一次預約。",
    pick: "先決定好火車再選。Linimo 轉乘、需預約的山區巴士這類麻煩的當地交通，交給一日遊最省事。",
  },
];

const fromNagoyaRows = [
  {
    place: "吉卜力公園（長久手）",
    how: "從名古屋車站的巴士中心搭名鐵直達巴士，或搭東山線到藤丘再轉 Linimo",
    time: "直達巴士 40 分鐘",
    cost: "巴士大人 ¥1,200、兒童 ¥600；從藤丘搭 Linimo 為 ¥400、¥200",
    source: `名鐵巴士與 Linimo 官方網站，${PARKS}`,
  },
  {
    place: "LEGOLAND® Japan 樂高樂園（金城埠頭）",
    how: "從名古屋車站搭青波線（Aonami Line），與新幹線抵達的是同一棟建築",
    time: "24 分鐘，15.2 公里",
    cost: "大人 ¥360、兒童 ¥180",
    source: `aonamiline.co.jp，${PARKS}`,
  },
  {
    place: "高山與白川鄉",
    how: "名古屋車站的名鐵巴士中心與高山濃飛巴士中心之間的濃飛巴士，或名古屋車站出發的一日遊",
    time: "到高山 2 小時 45 分；一日遊標示為來回約 11 小時",
    cost: "巴士需預約。一日遊價格請看商品頁",
    source: `nouhibus.co.jp，${OWN}`,
  },
  {
    place: "伊勢（伊勢神宮）",
    how: "從近鐵名古屋搭近鐵，和 JR 是不同的鐵路公司，車站就在 JR 名古屋車站旁",
    time: "約 1 小時 15 分。近鐵的島風號時刻表為近鐵名古屋 10:25 發車，伊勢市 11:40、宇治山田 11:42 抵達",
    cost: `JR 的周遊卡都不能用。近鐵周遊券 1 日券 ${KINTETSU_PASS_1}`,
    source: `kintetsu.co.jp，${OWN}`,
  },
  {
    place: "京都、大阪與東海道新幹線其他路段",
    how: "在同一個月台繼續往西",
    time: "名古屋大約位在東京–新大阪的三分之一處",
    cost: "適用與本頁相同的車票規則",
    source: `本指南，${OWN}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "東京到名古屋新幹線要多久？",
    a: `搭希望號最快 ${NOZOMI_FASTEST}，直達不用轉車。依 ${CHECKED} 查核的 JR東海列車資訊，每天從東京出發前往名古屋的 ${NOZOMI_PER_DAY} 班希望號車程為 ${NOZOMI_RANGE}。JAPAN RAIL PASS 可搭的光號需 ${HIKARI_RANGE}，同樣不用轉車；每站皆停的回聲號需 ${KODAMA_RANGE}。`,
  },
  {
    q: "東京到名古屋新幹線票價多少？",
    a: `依 JR 的 smartEX 票價表，希望號普通車指定席單程 ${SMART_EX_NOZOMI}（大人 1 位，${CHECKED} 查核）。光號或回聲號的同等座位為 ${SMART_EX_HIKARI}，便宜 ¥210。希望號單程兩張合計 ¥22,200，7 日普通車 JAPAN RAIL PASS 線上購買為 ${JR_PASS_7}。`,
  },
  {
    q: "希望號、光號、回聲號要搭哪一種？",
    a: `買單程票就搭希望號，持周遊卡就搭光號，只有要去途中小站時才搭回聲號。希望號 ${NOZOMI_RANGE}，指定席 ${SMART_EX_NOZOMI}；光號 ${HIKARI_RANGE}，${SMART_EX_HIKARI}，同樣直達不用轉車；回聲號 ${KODAMA_RANGE}。JAPAN RAIL PASS 可搭光號與回聲號，不能搭希望號，而在這段路線上，這個限制只讓周遊卡持有人多花幾分鐘。`,
  },
  {
    q: "東京到名古屋買 JR Pass 划算嗎？",
    a: `只來回一趟不划算，但如果您本來就要買周遊卡，名古屋是最划算的停留站。7 日普通車 JAPAN RAIL PASS 線上 ${JR_PASS_7}，向海外旅行社購買的兌換券 ¥53,000；來回名古屋的指定席兩張以 JR 的 smartEX 價格計算約 ¥22,200，金額上完全不划算。時間上則不同：光號從東京直達名古屋，周遊卡持有人只多花幾分鐘（JR東海時刻表上光號 ${HIKARI_RANGE}，希望號 ${NOZOMI_RANGE}），而廣島路段要多花 1 小時 15 分。所以如果您已經有去京都、金澤或廣島的周遊卡，加上名古屋幾乎不增加成本。在長途路段值得購買的 ${NOZOMI_TICKET} 希望號車票，在這段路線可以不買。周遊卡價格皆來自 japanrailpass.net，${OWN} 查核。`,
  },
  {
    q: "需要先劃位嗎？",
    a: `通常不需要。依 JR東海時刻表，光是東京出發的希望號每天就有 ${NOZOMI_PER_DAY} 班，這是日本城際路線中直接到車站搭車也可行的路線。但有 8 個期間一定要劃位。JR東海官方頁面列出希望號全車改為指定席、完全沒有自由席的期間：${nozomiAllReservedPeriods.join("；")}。JR東海說明這些期間希望號以外的光號、回聲號、瑞穗號、櫻花號與燕子號「維持一般的自由席」，所以較慢的列車就是不劃位也能搭的選擇。指定席在列車從起站發車當天的 1 個月前 10:00 開始販售。持有周遊卡的話劃位本身免費，沒有理由不劃。${OWN} 查核。`,
  },
];

const topPrep = [
  withKlookLocale(nagoyaArrivalShinkansenPrep[0], LOCALE, {
    label: "名古屋車站周邊飯店",
    ctaLabel: "在 Klook 查看名古屋飯店 →",
    why: "新幹線和地鐵都從名古屋車站出發，住在這裡的話，去樂園或高山的日子都不必橫跨市區。",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[1], LOCALE, {
    label: "吉卜力公園門票",
    ctaLabel: "查看吉卜力公園門票 →",
    why: "吉卜力大倉庫的入場時間在結帳時選擇，建議和火車一起決定，不要留到當天。",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[2], LOCALE, {
    label: "LEGOLAND® Japan 樂高樂園門票",
    ctaLabel: "查看樂高樂園門票 →",
    why: "一日票是手機 QR code，同一個商品頁也能選 SEA LIFE 名古屋套票與快速通關。",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[3], LOCALE, {
    label: "名古屋出發吉卜力公園與愛知航空博物館巴士一日遊",
    ctaLabel: "查看名古屋出發巴士一日遊 →",
    why: "不想自己安排 Linimo 轉乘的話，可以參加從名古屋出發的拼團巴士一日遊。",
  }),
];

const tourPicks = [
  withKlookLocale(ghibliParkNagoyaBusTour, LOCALE, {
    title: "名古屋出發吉卜力公園與愛知航空博物館巴士一日遊",
    desc: "從名古屋出發的拼團巴士一日遊，結合吉卜力公園與愛知航空博物館，不必自己處理 Linimo 轉乘",
  }),
  withKlookLocale(takayamaShirakawagoNagoyaDayTrip, LOCALE, {
    title: "名古屋出發高山與白川鄉一日遊",
    desc: "從名古屋車站出發，標示為來回約 11 小時，白川鄉與高山老街各停留約 2 小時",
  }),
  withKlookLocale(shirakawagoTakayamaOldTownDayTour, LOCALE, {
    title: "白川鄉與高山老街一日遊（可加購飛驒牛午餐）",
    desc: "另一個名古屋出發、去同樣兩地的一日遊，飛驒牛午餐是加購選項，不含在內",
  }),
  withKlookLocale(legolandJapanHotelPackage, LOCALE, {
    title: "LEGOLAND® Japan 樂高樂園飯店住宿",
    desc: "在樂園入口旁度假飯店的主題客房住一晚，含早餐。營業 10:00–17:00 的樂園可以分成兩個早上玩",
  }),
];

const stayAreas = [
  withKlookLocale(nagoyaParkStayAreas[0], LOCALE, {
    area: "名古屋車站",
    why: "前往兩座樂園的交通都從這裡出發：搭東山線到藤丘轉 Linimo，或搭青波線到金城埠頭（青波線標示 24 分鐘、¥360）。東海道新幹線也抵達同一棟建築。",
  }),
  withKlookLocale(nagoyaParkStayAreas[1], LOCALE, {
    area: "吉卜力公園周邊（長久手、瀨戶）",
    why: "不在市區，而是 Linimo 沿線的飯店。要趕上午 9 點吉卜力大倉庫入場時間的話就選這裡，樂園就在愛·地球博紀念公園站 2 號出口外。",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "東京到名古屋新幹線" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function LastChecked({ date, sources }: { date: string; sources: { label: string; href?: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      <strong>最後查核：{date}</strong>。
      {sources.map((s, i) => (
        <span key={s.label}>
          {i > 0 ? "、" : ""}
          {s.href ? (
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ) : (
            s.label
          )}
        </span>
      ))}
    </p>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
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
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : c === 1 ? styles.tdPrice : undefined}
                    style={{ fontSize: c === 0 ? "0.88rem" : "0.85rem" }}
                  >
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

export default function ZhTwTokyoToNagoyaShinkansenPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

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
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            約一個半小時，希望號每隔幾分鐘一班。這也是東海道新幹線上，持周遊卡只多花幾分鐘、而不是多花 1 小時 15 分的路段。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "smartEX 與 JR 集團官方票價（附查核日期）", "JR Pass 損益平衡", "從名古屋可以去哪裡"].map((t) => (
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
            <span className={styles.verdictLabel}>先說結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最快車程</p>
                <p className={styles.verdictStatValue}>{NOZOMI_FASTEST}（希望號），不用轉車</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>普通車指定席</p>
                <p className={styles.verdictStatValue}>單程 {SMART_EX_NOZOMI}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass（光號）</p>
                <p className={styles.verdictStatValue}>可搭乘，{HIKARI_RANGE}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>東京出發的希望號（每天）</p>
                <p className={styles.verdictStatValue}>{NOZOMI_PER_DAY} 班，首班車 06:00</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>東京到名古屋新幹線</strong>搭直達的希望號最快 <strong>{NOZOMI_FASTEST}</strong>（東京每天出發的{" "}
              {NOZOMI_PER_DAY} 班為 {NOZOMI_RANGE}），普通車指定席以 JR 的 smartEX 價格計算單程 <strong>{SMART_EX_NOZOMI}</strong>。
              JAPAN RAIL PASS 不能搭希望號，但可搭的光號同樣直達，車程 <strong>{HIKARI_RANGE}</strong>，不用周遊卡的話票價為{" "}
              {SMART_EX_HIKARI}。數字來自 JR東海與 smart-ex.jp，{CHECKED}查核。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                在 Klook 查看東京 → 名古屋車票 →
              </KlookLink>
              <KlookLink href={GHIBLI_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                名古屋出發吉卜力公園一日遊 →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>答案</span>
          <h2 className={styles.sectionTitle}>東京到名古屋新幹線要多久？</h2>
          <p className={styles.bodyText}>
            最快 {NOZOMI_FASTEST}，幾乎所有希望號都是 {NOZOMI_RANGE}，不用轉車。JR東海的時刻表顯示，{CHECKED}從東京出發、停靠名古屋的希望號共{" "}
            {NOZOMI_PER_DAY} 班，首班車 06:00。光號需 {HIKARI_RANGE}，每站皆停的回聲號需 {KODAMA_RANGE}。
          </p>
          <h2 className={styles.sectionTitle}>東京到名古屋新幹線票價多少？</h2>
          <p className={styles.bodyText}>
            希望號普通車指定席單程 {SMART_EX_NOZOMI}，光號或回聲號的同等座位 {SMART_EX_HIKARI}，皆為 JR smartEX 的大人 1
            位價格。希望號來回為 ¥22,200，不到 7 日 JAPAN RAIL PASS（{JR_PASS_7}）的一半。
          </p>
          <Table
            head={["列車", "東京 → 名古屋車程", "指定席（smartEX）", "備註"]}
            rows={answerRows.map((r) => [r.train, r.time, r.fare, r.note])}
          />
          <LastChecked
            date={LAST_CHECKED}
            sources={[
              { label: "JR東海列車資訊（東京，往西方向）", href: JRC_TRAININFO_URL },
              { label: "smartEX 指定席票價表（smart-ex.jp）", href: SMART_EX_PDF_URL },
            ]}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            要在名古屋過夜的話，
            <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>
              名古屋兩天行程（英文）
            </Link>
            把抵達後安排成兩天，
            <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>
              名古屋城門票指南（英文）
            </Link>
            則介紹大多數旅客在市區度過的半天。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              購買東京 → 名古屋座位 →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          headingLevel={3}
          label="與火車一起預訂"
          heading="和座位一起預訂的名古屋行程"
          intro="火車會帶您到名古屋車站。其餘的就是車站附近的住宿，以及依日期販售的樂園指定時段門票，建議購買車票時一起決定。"
          items={topPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>為什麼名古屋最容易被忽略</h2>
          <p className={styles.bodyText}>
            因為大多數人只把它當成往京都的列車經過的城市。從時刻表來看，名古屋大約位在東海道新幹線東京到新大阪的三分之一處，是日本最輕鬆的長途路段：希望號最快{" "}
            <strong>{NOZOMI_FASTEST}</strong>，不用轉車，光是東京出發的希望號每天就有 {NOZOMI_PER_DAY} 班。
          </p>
          <p className={styles.bodyText}>
            車票的選擇也是整條路線最簡單的，原因值得說明。在其他東海道、山陽新幹線路段，<strong>JAPAN RAIL PASS</strong>
            不能搭希望號，所以必須在另付車票與搭較慢列車之間選擇。東京到名古屋是例外：<strong>光號</strong>直達，持周遊卡搭乘仍然不用轉車，只多約 15 分鐘。
            {NOZOMI_TICKET} 的希望號車票也適用這段路線，但在這段路線上很少值得買。
          </p>
          <p className={styles.bodyText}>
            真正需要規劃的是抵達之後。名古屋與其說是觀光城市，不如說是前往四個好去處的轉乘站：搭 Linimo 去吉卜力公園、搭青波線去樂高樂園、走山路去白川鄉與高山，以及搭
            JR 周遊卡不能用的鐵路去伊勢神宮。每個地方都有各自的營運業者與票價，其中兩處還有各自的預約規定。這是這趟旅程最值得事先了解的部分，也是本頁接下來的內容。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>列車</span>
          <h2 className={styles.sectionTitle}>希望號、光號、回聲號車程比較</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            最快 {NOZOMI_FASTEST}，直達。以下每個數字都附上出處與查核日期，也說明為什麼在這段路線上，持周遊卡的行程和其他人幾乎沒有差別。
          </p>
          <Table
            head={["項目", "內容", "說明", "出處與查核日期"]}
            rows={routeRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            新幹線車票的基本概念（兩部分組成的票價、座位等級、周遊卡能搭與不能搭的列車）請看
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              新幹線指南（英文）
            </Link>
            ；
            <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
              東京到京都交通（英文）
            </Link>
            是同一條路線再往前 40 分鐘；
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" style={linkStyle}>
              東京到廣島新幹線（英文）
            </Link>
            則是周遊卡限制真正影響行程的路段。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              東京 → 名古屋車票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>東京到名古屋所有票價與周遊卡價格</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            希望號普通車指定席單程 {SMART_EX_NOZOMI}，光號或回聲號的同等座位 {SMART_EX_HIKARI}。兩者都是 JR 的線上價格，於 {OWN}
            從 smart-ex.jp 公開的 smartEX 票價表查核（大人 1 位、平常期）。要說明的是，JR東海沒有以固定表格公布車站售票櫃檯的票價，所以下表的車站售票櫃檯一列是本站四捨五入的參考值，並已標明。
          </p>
          <Table
            head={["車票", "價格", "內容", "出處與查核日期"]}
            rows={priceRows.map((r) => [r.item, r.price, r.covers, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            價格可能變動，購買前請再確認。車站售票櫃檯的票價是 JR Pass 可搭列車（東海道、山陽新幹線為光號、櫻花號、回聲號）平常期單程的基本車資加指定席特急費用（普通車），為四捨五入的參考值。smartEX
            是線上價格，與車站價格不同；旺季與離峰期的指定席費用會上下浮動幾百日圓。本頁不列出 Klook 價格，因為 Klook 價格依日期而異，請在商品頁查看您的日期。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>東京到名古屋買 JR Pass 划算嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            只走這一段不划算。指定席單程兩張以 JR 的 smartEX 價格計算約 ¥22,200，7 日普通車周遊卡線上 {JR_PASS_7}，在海外購買的兌換券
            ¥53,000。但如果是<em>加進</em>本來就需要的周遊卡行程，名古屋是沿線最划算的城市，因為持周遊卡幾乎不多花時間。
          </p>
          <Table
            head={["選項", "費用", "可以得到什麼", "適合的情況"]}
            rows={compareRows.map((r) => [r.option, r.cost, r.gets, r.pick])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            JR 自己寫下的規定是：持周遊卡搭希望號或瑞穗號，需要只賣給 JAPAN RAIL PASS 持有人的專用車票，而且「綠色車廂車票、普通車指定席車票與普通車自由席車票價格相同」。東京或品川到名古屋這張車票為{" "}
            <strong>{NOZOMI_TICKET}</strong>，是 JR 訂價的六個區間中最便宜的，也是最可以不買的。
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass 指南（英文）
            </Link>
            可以用您自己的行程計算損益平衡，
            <Link href="/guides/transport/tokyo-to-kanazawa" style={linkStyle}>
              東京到金澤指南（英文）
            </Link>
            則介紹從北邊前往白川鄉的另一條中部地區路線。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS（7/14/21 日）→
            </KlookLink>
            <KlookLink href={SHORYUDO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              昇龍道高速巴士周遊券 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>劃位</span>
          <h2 className={styles.sectionTitle}>需要先劃位嗎？</h2>
          <p className={styles.bodyText}>
            一年中大部分時間確實不需要。依 JR東海時刻表，東京出發的希望號每天 {NOZOMI_PER_DAY} 班，這是日本城際路線中直接到車站搭下一班車也合理的路線。不過有 8 個期間沒有選擇：JR東海在下列旺季期間讓
            <strong>希望號全車都是指定席</strong>，那幾天往名古屋的快車完全沒有自由席。於 {OWN} 在 JR東海官方頁面查核：
          </p>
          <ul className={styles.pickList}>
            {nozomiAllReservedPeriods.map((period) => (
              <li key={period}>
                <span className={styles.proIcon}>▸</span>
                <span><strong>{period}</strong></span>
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            這段路線的退路是光號。JR東海說明在同樣的期間，希望號以外的列車，包括光號、回聲號、瑞穗號、櫻花號與燕子號，「維持一般的自由席」，而光號從東京直達名古屋。所以即使是黃金週，也有不必劃位就能搭的列車，只是多花約 15 分鐘。
          </p>
          <p className={styles.bodyText}>
            如果要劃位，不管哪一種列車時間都一樣：指定席在列車從起站發車當天的<strong>1 個月前 10:00</strong>
            開始販售，例如 4 月 1 日出發的列車從 3 月 1 日 10:00 開賣。持有<strong>JAPAN RAIL PASS</strong>
            的話劃位本身免費，在這段路線上完全不用花錢。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              選擇車次與座位等級 →
            </KlookLink>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>從名古屋出發</span>
          <h2 className={styles.sectionTitle}>名古屋值得停留嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            作為住宿地點是值得的，理由在下表而不在城市本身。從東京去很麻煩或當天無法往返的四個地方，從名古屋車站出發都很方便，其中兩條交通就從新幹線抵達的同一棟建築出發。
          </p>
          <Table
            head={["目的地", "交通方式", "所需時間", "費用", "出處與查核日期"]}
            rows={fromNagoyaRows.map((r) => [r.place, r.how, r.time, r.cost, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            其中兩處的預約規定比火車更重要。吉卜力公園販售指定日期與時段的門票，兩個月前開賣，吉卜力大倉庫有指定入場時間；開賣日程、兩種門票等級與官方價格請看
            <Link href="/guides/attractions/ghibli-park-tickets" style={linkStyle}>
              吉卜力公園門票指南（英文）
            </Link>
            。樂高樂園的價格依日期而異，
            <Link href="/guides/attractions/legoland-japan-tickets" style={linkStyle}>
              樂高樂園門票指南（英文）
            </Link>
            有說明。往北的山區巴士有好幾班需要預約，
            <Link href="/guides/attractions/takayama-shirakawago-tour" style={linkStyle}>
              高山與白川鄉指南（英文）
            </Link>
            逐班整理。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={GHIBLI_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              吉卜力公園門票 →
            </KlookLink>
            <KlookLink href={LEGOLAND_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              LEGOLAND® Japan 樂高樂園門票 →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            從東京去大阪的途中可以在名古屋停留嗎？
          </h3>
          <p className={styles.bodyText}>
            超過 100 公里的基本車資乘車券可以。JR東海允許在起點與終點之間的車站中途下車（出站後再進站），但不能走回頭路。新幹線特急券不能用於中途下車，所以請分別購買東京 → 名古屋與名古屋 →
            新大阪。smartEX 不能中途下車，下車後未搭乘的區段就會失效。以上規定於 2026 年 11 月 13 日在 JR東海的
            <a href="https://global.jr-central.co.jp/en/tickets/type/stopovers.html" target="_blank" rel="noopener">
              中途下車說明頁面
            </a>
            與 smart-ex.jp 查核。到新大阪的票價請看
            <Link href="/zh-tw/guides/transport/tokyo-to-osaka-shinkansen" style={linkStyle}>
              東京到大阪新幹線指南
            </Link>
            。要安排那半天，
            <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>
              名古屋城門票指南（英文）
            </Link>
            整理了名古屋城的價格、開放時間與不開放的天守閣。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>行李</span>
          <h2 className={styles.sectionTitle}>超大件行李有什麼規定？</h2>
          <p className={styles.bodyText}>
            三邊合計<strong>超過 160 公分</strong>的行李必須事先預約。JR東海的行李說明頁面把三邊合計<strong>161 至 250 公分</strong>
            的行李定為超大件行李，必須放在附超大件行李放置處的座位後方空間。這個座位不另收費，JR 說明車票「與普通車、綠色車廂指定席同價」。
          </p>
          <p className={styles.bodyText}>
            帶著超大件行李卻沒有預約就上車，要付<strong>含稅 ¥1,000 的行李費</strong>。{OWN}
            查核。可在車站售票櫃檯、指定席售票機，或線上選擇附行李放置處的座位預約。實際上大多數航空託運的行李箱都在 160 公分以下，所以這條規定針對的是滑雪板袋、高爾夫球袋、超大行李箱與裝袋的嬰兒車。附行李放置處的座位只在指定席車廂，因此買自由席也無法避開這條規定。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>當天來回或過夜</span>
          <h2 className={styles.sectionTitle}>可以從東京當天來回吉卜力公園嗎？</h2>
          <p className={styles.bodyText}>
            可以，但時間比看起來緊。新幹線希望號單程約 <strong>1 小時 35 分</strong>，從名古屋車站巴士中心搭名鐵直達巴士依業者標示為{" "}
            <strong>40 分鐘</strong>，所以除了在園內的時間之外，光交通就要遠遠超過 4 個半小時。
          </p>
          <p className={styles.bodyText}>
            真正的限制不是距離，而是門票。
            <Link href="/guides/attractions/ghibli-park-tickets" style={linkStyle}>
              吉卜力公園門票（英文）
            </Link>
            是指定日期與時段的門票，吉卜力大倉庫有指定入場時間，上午時段最先售罄。要配合上午 9 點的大倉庫入場從東京搭車，就得在 06:00
            前出發；而且名鐵直達巴士在樂園休園日不行駛，休園日包括星期二。在名古屋或 Linimo 沿線的長久手飯店住一晚，天亮前出發就會變成一般的早上行程。
          </p>
          <p className={styles.bodyText}>
            白川鄉更是如此。從名古屋還要再搭 2 小時 45 分、需要預約的巴士，從東京當天來回根本無法好好遊覽。如果這兩個地方之一是您此行的目的，請訂一晚住宿；如果不想自己規劃當地交通，名古屋車站出發的一日遊正是因為轉乘麻煩才存在的。
          </p>
        </section>

        <KlookTourPicks
          heading="從名古屋出發的一日行程"
          intro="四個行程都從名古屋車站或附近出發：幫您處理 Linimo 轉乘的吉卜力公園一日遊、只買樂園門票，以及兩個把要轉兩次巴士的山區行程變成一次預約的白川鄉與高山一日遊。請在商品頁查看您日期的空位與目前價格。"
          tours={tourPicks}
        />

        <KlookStayAreas
          heading="在名古屋過夜要住哪裡"
          intro="兩個區域，選哪一個直接取決於上面的表格：如果名古屋只是較長鐵路行程中的一站、樂園當天來回，就住車站周邊；如果此行目的是吉卜力大倉庫上午 9 點的入場時間，就住 Linimo 沿線。"
          areas={stayAreas}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>上車前</span>
          <h2 className={styles.sectionTitle}>上車前要準備好的一件事</h2>
          <p className={styles.bodyText}>
            行動數據。出了名古屋車站之後的每個決定都要用手機：吉卜力公園門票是印有入場時間的 QR code，名鐵巴士和濃飛巴士的時刻表要和您實際抵達的時間對照，藤丘的
            Linimo 轉乘有地圖很簡單、沒有地圖就很麻煩。出發前先開通 eSIM，這些都能直接用手機查。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              查看 Klook eSIM →
            </KlookLink>{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan" style={linkStyle}>
              日本 eSIM 推薦指南
            </Link>
            比較了其他選擇，
            <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>
              IC 卡指南（英文）
            </Link>
            則說明下了新幹線之後，如何用 IC 卡通過名古屋地鐵、青波線與名鐵的閘門。
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/nagoya-2-day-itinerary", title: "名古屋兩天行程（2026）：吉卜力公園或樂高樂園（英文）" },
            { href: "/zh-tw/guides/transport/tokyo-to-osaka-shinkansen", title: "東京到大阪新幹線 2026：票價、車程時間與購票方式" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "吉卜力公園門票 2026：購買方式、價格與開賣日（英文）" },
            { href: "/guides/attractions/legoland-japan-tickets", title: "樂高樂園門票（2026）：依日期的價格（英文）" },
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山與白川鄉一日遊（2026）：出發班次與費用（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新幹線指南 2026：車票、周遊卡與第一次搭乘的訣竅（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 指南 2026：價格、是否划算與購買方式（英文）" },
            { href: "/zh-tw/guides/transport/kyoto-to-tokyo-shinkansen", title: "京都到東京新幹線 2026：票價、車程時間與購票方式" },
            { href: "/guides/transport/tokyo-to-hiroshima-shinkansen", title: "東京到廣島新幹線：車程、票價與 JR Pass（英文）" },
            { href: "/guides/transport/tokyo-to-kanazawa", title: "東京到金澤（2026）：光輝號車程、座位與周遊卡（英文）" },
            { href: "/zh-tw", title: "繁體中文指南總覽 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>一個半小時的車程，接著決定真正重要的事</h2>
            <p className={styles.ctaBannerDesc}>
              買單程票就買希望號，持周遊卡就劃光號的座位，在這段路線上差距約 15 分鐘。接著決定您去名古屋的目的：吉卜力公園的入場時間，或往北的巴士預約。
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看東京 → 名古屋車票 →
              </KlookLink>
              <KlookLink href={SHIRAKAWAGO_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看白川鄉一日遊 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
