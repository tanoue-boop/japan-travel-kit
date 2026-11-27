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
  hanedaLimousineBus,
  jrPassWholeJapan,
  klookEsim,
  kyotoToTokyoArrivalStayAreas,
  kyotoToTokyoTripPrep,
  luggageDeliveryCards,
  naritaLimousineBus,
  shinkansenKyotoTokyo,
  tokyoPrivateAirportTransfer,
  tokyoSharedAirportTransfer,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/kyoto-to-tokyo-shinkansen) section by section as of
// 2026-11-27 (task jtk-20261127-TR01): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: 京都到東京新幹線 — the phrase Taiwan / Hong Kong results use for this route
// (ekitan.com/zh-tw "京都至東京新幹線票價及訂票方式", shinkansen-ticket.com/zh-hant).

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/transport/kyoto-to-tokyo-shinkansen";
const TITLE = "京都到東京新幹線 2026：票價、車程時間與購票方式";
const H1 = "京都到東京新幹線 2026：車程時間、票價與購票方式";
const DESC =
  "京都到東京新幹線：希望號 2 小時 12 分、每小時 8–12 班，指定席 ¥13,970、自由席 ¥13,320，JR Pass 另付 ¥4,960。";

const OWN_ISO = "2026-10-29";
const OWN = dateLabel(OWN_ISO, LOCALE);
const NOW = dateLabel("2026-11-11", LOCALE);
const TODAY_ISO = "2026-11-27";
const TODAY = dateLabel(TODAY_ISO, LOCALE);

const FARE_SOURCES = [
  { label: "smartEX 票價（JR東海）", href: "https://smart-ex.jp/en/product/plan/service/" },
  { label: "JR東海列車運行資訊", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
  { label: "JR東海票價調整新聞稿", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
  { label: "JAPAN RAIL PASS 希望號、瑞穗號車票", href: "https://japanrailpass.net/en/use/special-ticket/" },
  { label: "JR東海超大件行李說明", href: "https://global.jr-central.co.jp/en/info/oversized-baggage/" },
];

const STATION_NOZOMI = "¥14,170";
const NOZOMI_RESERVED = "¥13,970";
const HIKARI_RESERVED = "¥13,650";
const NON_RESERVED = "¥13,320";
const NOZOMI_TICKET = "¥4,960";
const JR_PASS_7 = "¥50,000";
const BAGGAGE_FEE = "¥1,000";

const SHINKANSEN_URL = klookFor(shinkansenKyotoTokyo.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);
const PRIVATE_TRANSFER_URL = klookFor(tokyoPrivateAirportTransfer.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const nozomiAllReservedPeriods = [
  "2026 年 4 月 24 日至 5 月 6 日（黃金週）",
  "2026 年 8 月 7 日至 16 日（盂蘭盆節）",
  "2026 年 9 月 18 日至 23 日",
  "2026 年 10 月 10 日至 12 日",
  "2026 年 11 月 21 日至 23 日",
  "2026 年 12 月 25 日至 2027 年 1 月 5 日",
  "2027 年 1 月 9 日至 11 日",
  "2027 年 3 月 20 日至 22 日",
];

const trainTypeRows = [
  {
    train: "結論：搭希望號",
    time: "多數班次 2 小時 12 分，不用轉車",
    count: "白天每小時 8–12 班",
    reserved: `${NOZOMI_RESERVED}（車站購票 ${STATION_NOZOMI}）`,
    nonReserved: NON_RESERVED,
    pass: `光號不必另付費用；希望號需另購 ${NOZOMI_TICKET} 車票`,
  },
  {
    train: "希望號",
    time: "2 小時 7 分–2 小時 15 分",
    count: "每天 151 班；07:00–21:00 每小時 8–12 班",
    reserved: NOZOMI_RESERVED,
    nonReserved: `${NON_RESERVED}（全車指定席的旺季日期沒有自由席）`,
    pass: `需另付費用：每次搭乘購買 ${NOZOMI_TICKET} 的希望號、瑞穗號車票`,
  },
  {
    train: "光號",
    time: "2 小時 24 分–2 小時 51 分",
    count: "每天 30 班；每小時 2 班",
    reserved: HIKARI_RESERVED,
    nonReserved: NON_RESERVED,
    pass: "可搭乘，劃位免費",
  },
  {
    train: "回聲號",
    time: "3 小時 38 分",
    count: "每天 12 班；每小時 1 班（08:10–19:10）",
    reserved: HIKARI_RESERVED,
    nonReserved: NON_RESERVED,
    pass: "可搭乘，劃位免費；每站皆停",
  },
];

const stationRows = [
  {
    item: "往東京的新幹線月台",
    answer: "11 號與 12 號月台",
    detail:
      "JR西日本 2026 年 11 月 11 日的京都車站時刻表上，所有往東京的列車都在 11 號或 12 號月台發車。您搭乘的列車在哪個月台，請看站內看板與車票；JR西日本提醒當天月台可能變更",
    source: `timetable.jr-odekake.net，${NOW}`,
  },
  {
    item: "從南側街道進站",
    answer: "八條口",
    detail:
      "新幹線大廳位於八條口（南側）。名為「新幹線中央口」的剪票口通往八條口，並不是在來線北側的「中央口」，這是最常走錯的地方",
    source: `kyoto.travel（京都市觀光協會），${NOW}`,
  },
  {
    item: "從北側街道進站",
    answer: "中央口（京都塔一側）",
    detail:
      "市營巴士總站就在北側中央口正前方、京都塔下方。從這裡過去，拖著行李穿過車站到新幹線剪票口，請預留幾分鐘",
    source: `kyoto.travel，${NOW}`,
  },
  {
    item: "從 JR 在來線（京都線、湖西線、奈良線）轉乘",
    answer: "中央轉乘剪票口",
    detail:
      "「JR線轉乘（中央轉乘）」剪票口不必出站，就能從在來線月台走到新幹線；剪票口外側就有手扶梯、電梯與多功能廁所",
    source: `kyoto.travel，${NOW}`,
  },
  {
    item: "從地下鐵烏丸線過來",
    answer: "地下鐵南剪票口 → 八條口一側",
    detail:
      "從新幹線大廳往八條口一側的通道，包括大廳深處的八條東口，都在地下與烏丸線南剪票口相連",
    source: `kyoto.travel，${NOW}`,
  },
];

const bookingRows = [
  {
    item: "指定席開賣時間",
    answer: "乘車日 1 個月前",
    detail:
      "JR東海的行李說明頁寫到，附超大件行李放置區的座位與「其他指定席相同」，1 個月前開賣；JAPAN RAIL PASS 的希望號、瑞穗號車票則是「乘車日 1 個月前起至乘車當天」販售",
    source: `global.jr-central.co.jp 與 japanrailpass.net，${NOW}`,
  },
  {
    item: "2026–27 年剩下的希望號全車指定席日期",
    answer: "2026 年 12 月 25 日至 2027 年 1 月 5 日；2027 年 1 月 9 日至 11 日；2027 年 3 月 20 日至 22 日",
    detail:
      "這些日期的希望號完全沒有自由席車廂，無法當天直接以自由席搭希望號。光號與回聲號照常有自由席，但 JR東海提醒「可能非常擁擠」",
    source: `railway.jr-central.co.jp/nozomi 與 global.jr-central.co.jp/en/nozomi，${OWN}`,
  },
  {
    item: "三邊合計 160 公分以內的行李",
    answer: "不必劃位，不收費用",
    detail: "放在頭頂行李架、腳邊，或車廂連接處的置物區",
    source: `JR東海行李說明，${NOW}`,
  },
  {
    item: "161–250 公分的行李",
    answer: "購買附超大件行李放置區的座位",
    detail: `價格與普通車指定席或綠色車廂座位相同；可在售票櫃檯、指定席售票機（「附超大件行李放置區的座位」）或線上購票。沒有劃這種座位就上車，需付 ${BAGGAGE_FEE}（含稅）`,
    source: `JR東海行李說明，${NOW}`,
  },
  {
    item: "超過 250 公分的行李",
    answer: "不可帶上車",
    detail: "JR東海說明三邊合計超過 250 公分的行李「不能帶上車」，請改用宅配寄送",
    source: `JR東海行李說明，${NOW}`,
  },
];

const routeRows = [
  {
    item: "京都 → 東京最短車程",
    value: "2 小時 7 分；多數希望號為 2 小時 12 分",
    detail:
      "JR東海 2026 年 11 月 27 日的列車運行資訊中，京都往東京的希望號車程都在 2 小時 7 分到 2 小時 15 分之間，不用轉車；當天最快的是末班車希望號 64 號，21:38 → 23:45",
    source: `traininfo.jr-central.co.jp，${TODAY}`,
  },
  {
    item: "京都往東京每天的班次",
    value: "193 班：希望號 151、光號 30、回聲號 12",
    detail:
      "依 JR東海 2026 年 11 月 27 日的列表，只計算開到東京的列車。07:00 到 21:00 每小時有 8 到 12 班希望號，光號每小時 2 班，回聲號每小時 1 班；回聲號每站皆停，比希望號慢約 1 個半小時",
    source: `traininfo.jr-central.co.jp，${TODAY}`,
  },
  {
    item: "往東京的首班車與末班車",
    value: "06:14 與 21:38（23:45 抵達）",
    detail:
      "往東京的首班車是 06:14 的希望號 230 號，末班車是 21:38 的希望號 64 號，23:45 抵達東京。當晚更晚往東的班次只開到名古屋",
    source: `traininfo.jr-central.co.jp，${TODAY}；timetable.jr-odekake.net，${NOW}`,
  },
  {
    item: "這條路線販售的座位等級",
    value: "普通車自由席、普通車指定席、綠色車廂指定席",
    detail:
      "Klook 京都往東京路線頁列出的三種車票。東海道新幹線沒有 Gran Class，那是東北與北陸新幹線的車廂。JR東海新推出的 Supreme Class 等級高於綠色車廂，將在這條路線登場，但路線頁目前還沒有販售",
    source: `klook.com 鐵路頁面，${OWN}`,
  },
  {
    item: "抵達終點站前的東京地區停靠站",
    value: "依序為新橫濱、品川、東京",
    detail:
      "依 JR東海的車站列表，往東的停靠順序為京都、米原、岐阜羽島、名古屋、三河安城、豐橋、濱松、掛川、靜岡、新富士、三島、熱海、小田原、新橫濱、品川、東京。最後三站要在哪裡下車，是真正需要決定的事，請見下方",
    source: `global.jr-central.co.jp 車站列表，${OWN}`,
  },
  {
    item: "改從新大阪出發",
    value: "同樣的列車也往反方向行駛",
    detail:
      "以整條路線來看，JR東海表示「從東京車站到新大阪只要 2 小時 21 分」。京都是新大阪的前一站，所以從京都出發只比從大阪出發少約 15 分鐘",
    source: `JR東海 Shinkansen Perfect Guide，${OWN}`,
  },
];

const priceRows = [
  {
    item: "希望號普通車指定席",
    price: NOZOMI_RESERVED,
    covers:
      "JR東海 smartEX 的大人 1 位、單程、平常期價格。依 smartEX 的季節規則，離峰期便宜 ¥200，旺季更貴",
    source: `smart-ex.jp 價目表 "As of April 1, 2025"，${TODAY}`,
  },
  {
    item: "希望號普通車指定席（車站購票）",
    price: STATION_NOZOMI,
    covers:
      "JR東海公布的東京、品川–京都希望號平常期標準票價，在售票機或 JR 售票櫃檯購票的價格。JR東海與 JR西日本已宣布，2027 年 7 月 1 日起購買的車票，這段希望號指定席費用調漲 ¥700；自由席費用不變",
    source: `jr-central.co.jp 2023 年 5 月 30 日與 2026 年 10 月 16 日新聞稿，${TODAY}`,
  },
  {
    item: "光號或回聲號普通車指定席",
    price: HIKARI_RESERVED,
    covers:
      "較慢列車的同等座位，比希望號便宜 ¥320。JAPAN RAIL PASS 不必另購車票就能搭的就是這兩種列車",
    source: `smart-ex.jp 價目表 "As of April 1, 2025"，${NOW}`,
  },
  {
    item: "普通車自由席",
    price: NON_RESERVED,
    covers:
      "任何設有自由席車廂的希望號、光號或回聲號，有空位就能坐。本頁下方列出的旺季日期，希望號全車都是指定席，無法以自由席搭希望號",
    source: `smart-ex.jp 價目表 "As of April 1, 2025"，${NOW}`,
  },
  {
    item: "綠色車廂指定席",
    price: "高於普通車指定席；另以獨立等級販售",
    covers:
      "Klook 京都往東京路線頁三種等級都有販售。綠色車廂更安靜、座位更寬；看富士山的靠窗座位字母也會改變，JR東海建議綠色車廂選 D 座，而不是 E 座",
    source: `klook.com 鐵路頁面與 JR東海 Shinkansen Perfect Guide，${OWN}`,
  },
  {
    item: "JR Pass 持有者的希望號、瑞穗號車票",
    price: `東京–京都 ${NOZOMI_TICKET}`,
    covers:
      "JAPAN RAIL PASS 持有者每次搭希望號都必須購買的專用車票。JR 說明「綠色車廂、普通車指定席與普通車自由席價格相同」，並於「乘車日 1 個月前起至乘車當天」販售",
    source: `japanrailpass.net，${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS 普通車",
    price: `7 天 ${JR_PASS_7}、14 天 ¥80,000、21 天 ¥100,000（線上購買）`,
    covers:
      "透過海外旅行社購買的兌換券為 ¥53,000、¥84,000、¥105,000。綠色車廂版線上 ¥70,000、¥110,000、¥140,000，兌換券 ¥74,000、¥116,000、¥147,000",
    source: `japanrailpass.net 官方價格頁，${OWN}`,
  },
  {
    item: "超大件行李未劃位",
    price: `${BAGGAGE_FEE}（含稅）`,
    covers:
      "帶著三邊合計超過 160 公分的行李上車，卻沒有附行李放置區的指定席時，JR 收取的費用。座位本身不另收費，請見下方行李段落",
    source: `JR東海行李說明，${OWN}`,
  },
];

const compareRows = [
  {
    option: "提前購買一張普通車指定席",
    cost: `希望號 ${NOZOMI_RESERVED}、光號 ${HIKARI_RESERVED}（smartEX）`,
    gets: "2 小時直達列車上有自己的座位，離開飯店前行李問題也已解決。",
    pick: "預設選擇，在京都的最後一個早上更是如此。您帶著旅途中買的所有東西，搭的又是不能錯過的那班車。",
  },
  {
    option: "普通車自由席，當天直接搭",
    cost: `${NON_RESERVED}（smartEX）`,
    gets: "走到月台時，任何一班有自由席車廂的列車都能搭。",
    pick: "平日、只帶隨身行李時可以這樣做。下方旺季日期不適合，因為那幾天希望號完全沒有自由席車廂。",
  },
  {
    option: "用 JAPAN RAIL PASS 搭光號或回聲號",
    cost: `線上 ${JR_PASS_7}、兌換券 ¥53,000`,
    gets: "這段不必另付費用，到東京後還能搭山手線與成田特快。光號（JR東海 11 月 27 日列表為 2 小時 24 分–2 小時 51 分）或回聲號（3 小時 38 分）都是直達。",
    pick: "只有同一週已經排了廣島、金澤或東北時才適合。京都–東京單程加上東京–京都單程，離 ¥50,000 還差很遠。",
  },
  {
    option: "JAPAN RAIL PASS 加希望號車票",
    cost: `${JR_PASS_7}，這段另加 ${NOZOMI_TICKET}`,
    gets: "有周遊卡，也能搭快車：約 2 小時 12 分，而不是光號的 2 小時 24 分–2 小時 51 分。",
    pick: "要趕飛機，或在東京有指定時間的行程時，這一段值得加購。不論之後坐綠色車廂、指定席或自由席，JR 定的價格都一樣。",
  },
  {
    option: "夜行巴士",
    cost: "新幹線票價的一小部分，車程約 7 到 8 小時",
    gets: "兩座城市之間最便宜的交通方式，在車上過一夜。",
    pick: "帶著大行李箱往東京時很少適合。東京往京都的頁面有完整比較，本頁不再重複那張表。",
  },
];

const buyRows = [
  {
    way: "結論：多數旅客用 smartEX",
    price: `希望號指定席 ${NOZOMI_RESERVED}，比車站價格 ${STATION_NOZOMI} 便宜 ¥200`,
    when: "提前購票、在座位圖上選位、免費變更；想在出發前付清，就用 Klook",
    board: "QR 車票或已登錄的 IC 卡",
  },
  {
    way: "smartEX（JR東海官方網站與 App，有英文版）",
    price: `希望號 ${NOZOMI_RESERVED}、光號或回聲號 ${HIKARI_RESERVED}、自由席 ${NON_RESERVED}`,
    when: "乘車日 1 年前早上 5:30 起（班次與座位於 1 個月前確定），到發車前 4 分鐘為止。發車前變更免費；退票手續費 ¥320",
    board: "以 QR 車票或 IC 卡直接通過新幹線剪票口",
  },
  {
    way: "車站售票機或 JR 售票櫃檯",
    price: `希望號指定席 ${STATION_NOZOMI}，平常期`,
    when: "指定席於乘車日 1 個月前開賣；JR Pass 持有者劃位與購買希望號、瑞穗號車票也在這裡",
    board: "以紙本車票通過剪票口",
  },
  {
    way: "Klook（京都往東京路線頁）",
    price: "依日期顯示於商品頁（本頁不列出）",
    when: "出發前以英文介面購票；路線頁販售自由席、普通車指定席與綠色車廂指定席",
    board: "依商品頁的取票或乘車說明",
  },
];

const arrivalRows = [
  {
    station: "結論：東京車站",
    forWho: "多數旅客；要去羽田、澀谷或台場的話改在品川下車",
    why: "終點站，不必留意下車站；品川是前一站",
    transfer: "請見下面兩列",
    source: `JR東海車站列表，${OWN}`,
  },
  {
    station: "東京車站",
    forWho: "丸之內、銀座、日本橋、淺草、上野，以及從成田出境的人",
    why: "終點站，不必擔心坐過站。成田特快與丸之內線、山手線、中央線、京葉線都從同一個車站建築發車，東海道新幹線月台也在站內",
    transfer: "成田特快、JR 山手線、中央線、京葉線、東京地下鐵丸之內線",
    source: `JR東海車站列表，${OWN}`,
  },
  {
    station: "品川",
    forWho: "澀谷、目黑、台場、橫濱，以及從羽田出境的人",
    why: "終點站前一站，省去進東京車站的最後一段與站內人潮。往羽田的京急線就在同一站，搭山手線幾站就到澀谷",
    transfer: "JR 山手線；往羽田機場的京急線",
    source: `JR東海車站列表，${OWN}`,
  },
  {
    station: "新橫濱",
    forWho: "橫濱、港未來、鎌倉與整個西南方向",
    why: "東京前兩站。如果當晚住橫濱而不是東京，在這裡下車就不必拖著行李折返將近一個小時",
    transfer: "往橫濱市區的在來線",
    source: `JR東海車站列表，${OWN}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "京都到東京新幹線要多久？",
    a: `最快的希望號約 2 小時 12 分，不用轉車。JR東海 2026 年 11 月 27 日的京都發車列表中，每班希望號都在 2 小時 7 分到 2 小時 15 分之間。光號需 2 小時 24 分到 2 小時 51 分，每站皆停的回聲號需 3 小時 38 分。白天每小時有 8 到 12 班希望號，另有光號 2 班與回聲號 1 班；往東京的首班車 06:14 發車，末班車 21:38 發車、23:45 抵達。查詢於 ${TODAY}，車程依班次與日期略有不同。`,
  },
  {
    q: "京都到東京新幹線票價多少？",
    a: `在 JR東海的 smartEX，單程希望號指定席 ${NOZOMI_RESERVED}、光號或回聲號指定席 ${HIKARI_RESERVED}、自由席 ${NON_RESERVED}。以上為大人 1 位、平常期，取自 smartEX 價目表 "As of April 1, 2025"，查詢於 ${TODAY}。在車站售票機或售票櫃檯，希望號指定席為 JR東海標準票價 ${STATION_NOZOMI}。指定席在離峰期便宜 ¥200，旺季貴 ¥200–¥400。JR東海已宣布，2027 年 7 月 1 日起購買的車票，東京–京都希望號指定席費用調漲 ¥700；自由席不變。`,
  },
  {
    q: "從京都搭希望號可以用 JR Pass 嗎？",
    a: `可以，但需另付費用：JAPAN RAIL PASS 持有者在京都與東京之間每次搭希望號，都要購買 ${NOZOMI_TICKET} 的希望號、瑞穗號車票；光號與回聲號不必另付費用，劃位也免費。希望號車票於乘車日 1 個月前開賣，綠色車廂、指定席與自由席價格相同（japanrailpass.net，查詢於 ${TODAY}）。只為了這一段，買周遊卡並不划算：7 天普通車周遊卡線上 ${JR_PASS_7}、兌換券 ¥53,000，而 smartEX 單程是 ${NOZOMI_RESERVED}。同一週還有廣島、金澤或東北行程時，才開始划算。`,
  },
  {
    q: "京都到東京新幹線需要提前購票嗎？",
    a: `旺季日期、帶大行李，或在東京有航班、已訂好的住宿時，建議提前購票；其他日子京都每小時有 8 到 12 班希望號，買 ${NON_RESERVED} 的自由席就可以。JR東海的旺季日期希望號全車為指定席（2026–27 年剩下的日期：2026 年 12 月 25 日至 2027 年 1 月 5 日；2027 年 1 月 9 日至 11 日；2027 年 3 月 20 日至 22 日），三邊合計 161–250 公分的行李需要附超大件行李放置區的指定席，座位含在車票內，沒劃位就上車需付 ${BAGGAGE_FEE}。車站的指定席於乘車日 1 個月前開賣；smartEX 最早 1 年前就能申請，發車前變更免費。查詢於 ${TODAY}。`,
  },
  {
    q: "京都到東京看富士山要坐哪一側？",
    a: `行進方向的左側：普通車選 E 座，綠色車廂選 D 座。JR東海的 Shinkansen Perfect Guide 寫道「想看富士山的最佳景色，普通車請選 E 座，綠色車廂請選 D 座」。座位字母固定在車廂上，所以從京都往東走，那一側的窗戶在您的左手邊。這個方向富士山出現得較晚，在全程最後三分之一的靜岡–新富士–三島一帶，而且常被雲遮住。查詢於 ${OWN}。`,
  },
];

const tripPrepItems = [
  withKlookLocale(kyotoToTokyoTripPrep[0], LOCALE, {
    label: "東京地鐵通票（24／48／72 小時）",
    ctaLabel: "查看地鐵通票 →",
    why: "新幹線車票到剪票口就結束了。這張通票可在抵達後的 24、48 或 72 小時內搭乘東京地下鐵與都營地下鐵全線。",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[1], LOCALE, {
    label: "東京新宿酒吧巡禮夜間導覽",
    ctaLabel: "查看新宿夜間導覽 →",
    why: "下午稍早從京都搭希望號，天黑前就到東京，新宿離東京車站或品川只有幾站。3 小時的併團夜間行程含餐點與飲料，抵達當天就能過一個東京的夜晚。",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[2], LOCALE, {
    label: "東京車站、丸之內周邊飯店",
    ctaLabel: "在 Klook 查看飯店價格 →",
    why: "東海道新幹線的終點在東京車站內，住丸之內的飯店，從月台走一小段就到，不必在一天結束時拖著行李穿越市區。",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[3], LOCALE, {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM 方案 →",
    why: "您的座位是手機上的 QR 碼或購票紀錄，要在品川還是東京車站下車，也是在車上決定。兩件事都需要在離開京都前就能使用行動數據。",
  }),
  withKlookLocale(luggageDeliveryCards.kyotoToTokyo, LOCALE, {
    label: "行李配送（東京飯店 ⇔ 成田／羽田）",
    ctaLabel: "查看飯店 ⇔ 機場行李配送 →",
    why: "多數京都到東京的行程，會在一兩天後從成田或羽田結束。以件計價預約，行李從東京飯店直接送到機場，最後一天觀光不必帶著它。",
  }),
];

const stayAreas = [
  withKlookLocale(kyotoToTokyoArrivalStayAreas[0], LOCALE, {
    area: "東京車站／丸之內",
    why: "東海道新幹線的終點就在車站建築內，抵達後往樓上走即可，不必拖著行李穿越市區；回國當天，成田特快也從同一個車站的地下月台發車。",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[1], LOCALE, {
    area: "銀座",
    why: "離東京車站搭丸之內線一站，從羽田搭京急、都營直通列車不用轉車就到東銀座。如果京都出發的列車是整趟旅程的倒數第二段，選這裡。",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[2], LOCALE, {
    area: "新宿",
    why: "不是新幹線停靠站，但從東京車站搭中央線直達，也是中央線、小田急線、京王線的起點。若東京還要待好幾天，而不是出境前只住一晚，以這裡為住宿區域。",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[3], LOCALE, {
    area: "澀谷",
    why: "品川是東海道新幹線終點前一站，從品川搭山手線兩站就到。提早在品川下車，就不必進東京車站後再往回走。",
  }),
];

const tourPicks = [
  withKlookLocale(tokyoPrivateAirportTransfer, LOCALE, {
    title: "羽田、成田 ⇄ 東京專車接送",
    desc: "車與司機直接預約到您的飯店地址，而不是車站；兩座機場都可用，司機會追蹤航班，標示為 24 小時服務，有 7 人座與 10 人座",
  }),
  withKlookLocale(tokyoSharedAirportTransfer, LOCALE, {
    title: "成田、羽田 → 東京共乘接送",
    desc: "同樣的服務，以座位計價，適合 1 到 2 位旅客，送到東京市中心的地址，不必包下整輛車",
  }),
  withKlookLocale(naritaLimousineBus, LOCALE, {
    title: "成田機場–東京利木津巴士",
    desc: "往返成田機場三座航廈與東京飯店、車站站點的機場利木津巴士，以 QR 碼上車，不用紙本車票",
  }),
  withKlookLocale(hanedaLimousineBus, LOCALE, {
    title: "羽田機場–東京利木津巴士",
    desc: "同一家業者從羽田三座航廈發車的路線，目的地包括新宿、池袋與迪士尼度假區",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "京都到東京新幹線" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function SourcesLine({ what }: { what: string }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      <strong>最後查詢：{TODAY_ISO}</strong>（{what}）。官方頁面：
      {FARE_SOURCES.map((s, i) => (
        <span key={s.href}>
          <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>{s.label}</a>
          {i < FARE_SOURCES.length - 1 ? "、" : "。"}
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
                    style={{ fontSize: c === 0 ? "0.88rem" : c === row.length - 1 && head.length === 4 ? "0.82rem" : "0.85rem" }}
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

export default function ZhTwKyotoToTokyoShinkansenPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>更新於 {updatedLabel}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            從京都車站出發：比較希望號、光號與回聲號，smartEX、車站與 Klook 的價格差異，以及在東京哪一站下車。
          </p>
          <div className={styles.heroBadges}>
            {[`更新於 ${updatedLabel}`, "smartEX 票價（標註查詢日）", "京都車站 11–12 號月台", "東京、品川或新橫濱"].map((t) => (
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
            <span className={styles.verdictLabel}>快速解答</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>京都 → 東京</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>最短車程</p>
                <p className={styles.verdictStatValue}>希望號 2 小時 12 分（最快 2 小時 7 分），不用轉車</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>指定席（smartEX）</p>
                <p className={styles.verdictStatValue}>希望號 {NOZOMI_RESERVED}、光號 {HIKARI_RESERVED}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>往東京末班車</p>
                <p className={styles.verdictStatValue}>21:38 發車，23:45 抵達</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>持 JR Pass</p>
                <p className={styles.verdictStatValue}>光號免費，希望號 {NOZOMI_TICKET}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>京都到東京新幹線</strong>是東海道新幹線希望號（Nozomi），依 JR東海 {TODAY} 的列車運行資訊，車程
              <strong>約 2 小時 12 分</strong>（最快 2 小時 7 分），不用轉車。在 JR東海的 smartEX，希望號單程
              <strong>指定席 {NOZOMI_RESERVED}</strong>、<strong>自由席 {NON_RESERVED}</strong>（大人、平常期；在車站購買指定席為{" "}
              {STATION_NOZOMI}）。京都 07:00 到 21:00 <strong>每小時有 8 到 12 班希望號開往東京</strong>，每天 151 班，另有每小時
              2 班光號（Hikari）與 1 班回聲號（Kodama）。
            </p>
            <p className={styles.verdictText}>
              持 <strong>JAPAN RAIL PASS</strong> 搭光號與回聲號不必另付費用，搭希望號則每次需購買{" "}
              <strong>{NOZOMI_TICKET}</strong> 的希望號、瑞穗號車票（japanrailpass.net，{TODAY}）。列車從京都車站八條口（南側）的
              11 號與 12 號月台發車，往東京的末班車是 21:38。本頁介紹往東京方向；反方向請見{" "}
              <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
                東京到京都交通（英文）
              </Link>
              。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看京都 → 東京新幹線車票 →
              </KlookLink>
              <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                查看 JAPAN RAIL PASS 價格 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="和新幹線一起安排"
          heading="同一天可以一起安排：地鐵通票、東京夜間導覽、飯店、eSIM"
          intro="列車在東京車站內抵達終點。之後幾天的地鐵通票、第一晚的導覽、靠近月台的飯店、路上用的行動數據，以及去機場那天的行李配送，都不包含在新幹線車票裡。"
          items={tripPrepItems}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>概要</span>
          <h2 className={styles.sectionTitle}>京都到東京新幹線，和東京到京都有什麼不同？</h2>
          <p className={styles.bodyText}>
            列車相同，路線也相同，不同的是周邊的一切。往西走時，您通常從飯店附近的車站出發，抵達單一的終點站，出發約 40
            分鐘後富士山出現在右側。往東走時，您在京都住宿的最後一個早上出發，月台在一座非常大的車站另一側，行李比來時更多；抵達的城市有三個新幹線停靠站，其中通常只有一個適合您。
          </p>
          <p className={styles.bodyText}>
            所以本頁圍繞著只有這個方向才會遇到的四個決定：<strong>京都車站要走哪個剪票口與月台</strong>、
            <strong>退房後行李怎麼處理</strong>、<strong>反方向行駛時富士山在哪一側</strong>，以及
            <strong>在東京、品川還是新橫濱下車</strong>。車票怎麼選兩個方向都一樣，下面會說明；新幹線與巴士的比較放在東京往京都的頁面，這裡只附連結，不重複刊出同一張表。
          </p>
          <p className={styles.bodyText}>
            最先要知道的一件事：往東京的列車比多數人想的更早結束。JR西日本 2026 年 11 月 11 日的京都車站時刻表上，往東京的末班車是{" "}
            <strong>21:38</strong>，23:45 抵達東京。如果移動當天在東京還要搭飛機，這個時間比票價更影響整個安排。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>列車</span>
          <h2 className={styles.sectionTitle}>京都到東京新幹線要多久？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            希望號約 2 小時 12 分，光號 2 小時 24 分到 2 小時 51 分，回聲號 3 小時 38 分，全部直達、不用轉車。下表的車程與班次涵蓋
            JR東海 2026 年 11 月 27 日京都發車列表中所有往東京的列車，票價為 JR東海 smartEX 的大人 1 位平常期價格，兩者都在{" "}
            {TODAY} 查詢。
          </p>
          <Table
            head={["列車", "京都 → 東京", "京都發車班次", "指定席（smartEX）", "自由席（smartEX）", "持 JR Pass"]}
            rows={trainTypeRows.map((r) => [r.train, r.time, r.count, r.reserved, r.nonReserved, r.pass])}
          />
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
            <strong>大件行李：</strong>三邊合計 161–250 公分的行李箱，需要在購票時一併劃「附超大件行李放置區的座位」，不另收費；沒劃位就上車，JR東海收取{" "}
            {BAGGAGE_FEE}（含稅）。160 公分以內不必劃位，超過 250 公分不能帶上車。
          </p>
          <SourcesLine what="JR東海京都發車列表的車程與班次、smartEX 票價、JR Pass 專用車票與 JR東海行李規定" />
          <p className={styles.bodyText} style={{ margin: "1rem 0" }}>
            路線的其他資訊，包括首末班車與東京之前的停靠站：
          </p>
          <Table
            head={["項目", "內容", "說明", "來源與查詢日"]}
            rows={routeRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            新幹線車票的基本規則，例如票價由兩部分組成、座位等級、周遊卡能搭與不能搭的列車，請見{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              新幹線指南（英文）
            </Link>
            ；
            <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
              東京到京都交通（英文）
            </Link>
            介紹這趟路程的反方向，並比較夜行巴士與列車票價。若從大阪出發，
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen" style={linkStyle}>
              東京到大阪新幹線票價與車程（英文）
            </Link>
            列有各座位等級的新大阪票價。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              京都 → 東京車票 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>京都到東京新幹線票價多少？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            單程希望號普通車指定席 <strong>{NOZOMI_RESERVED}</strong>，光號或回聲號 <strong>{HIKARI_RESERVED}</strong>，自由席{" "}
            <strong>{NON_RESERVED}</strong>。以上為 JR東海 smartEX 的大人 1 位平常期價格，取自標示 &ldquo;As of April 1,
            2025&rdquo; 的官方價目表，並於 {TODAY} 再次查詢。在車站售票機或售票櫃檯，希望號指定席為{" "}
            <strong>{STATION_NOZOMI}</strong>。周遊卡持有者相關的項目為 japanrailpass.net 公布的金額。
          </p>
          <Table
            head={["車票", "價格", "說明", "來源與查詢日"]}
            rows={priceRows.map((r) => [r.item, r.price, r.covers, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            價格可能變動，購票前請再確認。smartEX 價格為大人 1 位單程；依 smartEX 的季節規則，離峰期指定席便宜 ¥200，旺季更貴。本頁不列出
            Klook 價格：Klook 的價格依日期不同，請在商品頁查看您出發當天的價格。
          </p>
          <SourcesLine what="smartEX 價目表、JR東海票價新聞稿與 japanrailpass.net" />
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>購票</span>
          <h2 className={styles.sectionTitle}>京都到東京新幹線車票在哪裡買？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            平常票價最便宜的是 JR東海的 smartEX：同一個希望號座位，車站 {STATION_NOZOMI}，smartEX {NOZOMI_RESERVED}。想在出發前付清，可以透過
            Klook 購買。JR Pass 持有者劃位，以及任何人當天購票，都在車站售票機與售票櫃檯。
          </p>
          <Table
            head={["購票管道", "價格（大人、平常期）", "購票期間與變更", "通過剪票口的方式"]}
            rows={buyRows.map((r) => [r.way, r.price, r.when, r.board])}
          />
          <SourcesLine what="smartEX 購票規則、車站票價與 JR Pass 專用車票；Klook 座位等級依 2026 年 10 月 29 日的鐵路頁面" />
          <p className={styles.bodyText}>
            簡短回答沒提到的幾點：下方的旺季日期希望號全車為指定席，日期一確定就購票；smartEX 發車前變更免費，發車前退票收 ¥320；超過 160
            公分的行李需要附超大件行李放置區的座位，JR東海在售票櫃檯、指定席售票機與線上販售。各種車票的使用方式，請見{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              新幹線指南（英文）
            </Link>
            。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              在 Klook 查看京都 → 東京座位 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>從京都搭希望號可以用 JR Pass 嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            可以，但需另付費用：周遊卡持有者每次搭希望號往東京，都要購買 <strong>{NOZOMI_TICKET}</strong>{" "}
            的希望號、瑞穗號車票；光號與回聲號可搭，劃位也免費。不過只為這一段買周遊卡並不划算。7 天普通車{" "}
            <strong>JAPAN RAIL PASS</strong> 線上 {JR_PASS_7}、在海外購買的兌換券 ¥53,000，而 smartEX 希望號單程是{" "}
            {NOZOMI_RESERVED}，兩座城市來回一趟也還不到周遊卡的價格。會改變答案的是同一週的其他行程，以及到東京後您搭多少 JR。
          </p>
          <Table
            head={["選項", "費用", "可以得到什麼", "適合的情況"]}
            rows={compareRows.map((r) => [r.option, r.cost, r.gets, r.pick])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            JR 自己寫下的規定是：持周遊卡搭希望號或瑞穗號，需要只發給 JAPAN RAIL PASS 持有者的專用車票，且&ldquo;綠色車廂、普通車指定席與普通車自由席價格相同&rdquo;。東京–京都的這張車票為{" "}
            <strong>{NOZOMI_TICKET}</strong>，於&ldquo;乘車日 1 個月前起至乘車當天&rdquo;在指定席售票機、JR 售票櫃檯與旅行服務中心販售。
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass 價格指南（英文）
            </Link>
            可用 2026 年 10 月的價格對照您自己的路段，
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" style={linkStyle}>
              東京、京都、大阪 7 天行程（英文）
            </Link>
            則是周遊卡最常划算的行程類型。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS（7／14／21 天）→
            </KlookLink>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              改查單程車票價格 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>車窗景色</span>
          <h2 className={styles.sectionTitle}>京都到東京看富士山要坐哪一側？</h2>
          <p className={styles.bodyText}>
            行進方向的<strong>左側</strong>，而要選的座位字母和反方向相同。JR東海的 Shinkansen Perfect Guide 沒有附加任何條件：&ldquo;想看富士山的最佳景色，普通車請選
            E 座，綠色車廂請選 D 座。&rdquo;它沒有說左邊還是右邊，也不需要說。座位字母固定在車廂上，與列車行駛方向無關，所以 E 座與 D
            座的窗戶每一趟都朝向列車的同一側。從東京往西，那一側在您右手邊；從京都往東，則在左手邊。
          </p>
          <p className={styles.bodyText}>
            出現的時間點也相反。往西時富士山很早出現，往東時則較晚：依 JR東海的停靠順序，富士山位於
            <strong>靜岡–新富士–三島</strong>一帶，從京都出發時是全程的最後三分之一，而不是前段。如果打算在車上睡覺，請早點睡。
          </p>
          <p className={styles.bodyText}>
            還有一點是劃位也無法解決的：富士山經常看不到。晴朗乾燥的冬季早晨機會最大，霧濛濛的夏季下午機會最小。靠窗座位值得劃，但不值得為了天氣決定的景色多付綠色車廂的錢。查詢於{" "}
            {OWN}。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>京都出發</span>
          <h2 className={styles.sectionTitle}>京都車站往東京的新幹線在幾號月台？</h2>
          <p className={styles.bodyText}>
            <strong>11 號或 12 號月台。</strong>JR西日本 2026 年 11 月 11 日的京都車站時刻表上，每一班往東京的列車都在這兩個月台之一。月台位於車站的
            <strong>八條口（南側）</strong>，在新幹線專用剪票口內，與北側中央口、市營巴士總站和京都塔位在相反一側。要走哪個剪票口，取決於您怎麼抵達車站：
          </p>
          <Table
            head={["您從哪裡過來", "使用", "須知", "來源與查詢日"]}
            rows={stationRows.map((r) => [r.item, r.answer, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            為什麼值得整理成一張表：如果京都的最後一個早上在北側結束，例如錦市場、地下鐵烏丸線或大多數市營巴士，您在走到剪票口前，還得穿過日本最繁忙的車站大廳之一，走上好幾分鐘。拖著行李的移動日，請把這段時間算進去。
          </p>
          <p className={styles.bodyText}>
            行李本身有三種可行的處理方式。退房後寄放在飯店的行李室，前往車站途中再取；帶到京都車站，使用置物櫃或有人服務的寄放處；或用宅急便寄到東京的飯店。行李多到雙手拿不下的人通常選擇宅配，也完全不必處理新幹線超大件行李的劃位。費用與收件截止時間依飯店與櫃檯而不同，所以本頁不列出；請在前一晚向櫃檯詢問，並確認東京的飯店可以代收。
          </p>
          <p className={styles.bodyText}>
            那天早上在京都市內要搭哪班巴士、哪條地鐵，以及為了半天買一日券值不值得，請見{" "}
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>
              京都交通攻略（英文）
            </Link>
            與
            <Link href="/guides/transport/kyoto-subway-bus-pass" style={linkStyle}>
              京都地下鐵、巴士一日券分析（英文）
            </Link>
            ；如果這班車是短暫京都之旅的結尾，
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>
              京都 3 天行程（英文）
            </Link>
            可以幫您安排前面幾天。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>抵達</span>
          <h2 className={styles.sectionTitle}>該在東京、品川還是新橫濱下車？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            選離您住宿或機場最近的一站。依 JR東海的車站列表，路線依序是<strong>新橫濱、品川、東京</strong>，三個選項中有兩個在終點站之前，提早下車往往是到目的地更短的路程。
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["下車站", "適合", "原因", "轉乘", "來源與查詢日"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {arrivalRows.map((row) => (
                    <tr key={row.station}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.station}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.forWho}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.transfer}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>最後查詢：{OWN_ISO}</strong>（東海道新幹線停靠順序）。官方頁面：
            <a href="https://global.jr-central.co.jp/en/" target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>
              JR東海（global.jr-central.co.jp）
            </a>
            。
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            另外一個實際的提醒：終點站之所以最簡單，正是因為不可能坐過站。如果您很累、行李很多，或帶著小孩，即使品川其實比較近，在東京車站下車也不是錯的選擇。各區域的完整比較請見
            <Link href="/guides/attractions/where-to-stay-in-tokyo" style={linkStyle}>
              東京住宿區域指南（英文）
            </Link>
            ，從各區往成田與羽田的方式請見
            <Link href="/zh-tw/guides/transport/tokyo-airport-transfer" style={linkStyle}>
              東京機場交通攻略
            </Link>
            。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>購票時機</span>
          <h2 className={styles.sectionTitle}>京都到東京新幹線需要提前購票嗎？</h2>
          <p className={styles.bodyText}>
            下方的旺季日期、行李超過 160 公分，或在東京要趕飛機時，請提前購票；其他日子每小時有 8 到 12 班希望號，買 {NON_RESERVED}{" "}
            的自由席就可以。車站的指定席於乘車日 1 個月前開賣，smartEX 最早 1 年前就能申請。
          </p>
          <div style={{ margin: "1rem 0" }}>
            <Table
              head={["情況", "怎麼做", "說明", "來源與查詢日"]}
              rows={bookingRows.map((r) => [r.item, r.answer, r.detail, r.source])}
            />
          </div>
          <p className={styles.bodyText}>
            旺季以外，當天直接搭是可行的。依 JR東海 2026 年 11 月 27 日的列表，京都往東京<strong>每天有 193 班</strong>，拿自由席車票搭下一班車，是合理的安排。但有八段日期沒有選擇的餘地：JR東海在旺季期間把
            <strong>希望號全車改為指定席</strong>，那幾天往東京的快車完全沒有自由席。以下為 {OWN} 從 JR東海官方頁面查詢的日期：
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
            JR東海的英文說明是&ldquo;旺季期間希望號不設自由席&rdquo;，而&ldquo;光號、回聲號、瑞穗號、櫻花號與燕子號照常設有自由席&rdquo;，並提醒旺季期間光號與回聲號的自由席&ldquo;可能非常擁擠&rdquo;。所以黃金週也有不必事先購票的列車可搭，只是比較慢，也可能要站著。
          </p>
          <p className={styles.bodyText}>
            即使不在那些日期，這一段也有兩個理由值得劃位，而且都是這個方向特有的。從京都出發通常是旅程的最後一個早上，另一端有已訂好的東京住宿或航班，沒有更晚的班車可以補救。而且您的行李比來時多，有自己的座位，以及需要時的行李空間，多花幾百日圓也值得。持有
            <strong>JAPAN RAIL PASS</strong> 時劃位本身免費，更沒有不劃的理由。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              選擇班次與座位等級 →
            </KlookLink>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>行李</span>
          <h2 className={styles.sectionTitle}>新幹線上的大件行李要放哪裡？</h2>
          <p className={styles.bodyText}>
            三邊合計 <strong>160 公分以內</strong>的行李放在頭頂行李架或腳邊，不必劃位、不收費用。超過這個尺寸，依 JR東海的行李說明，需要附超大件行李放置區的指定席：三邊合計
            <strong>161 到 250 公分</strong>的行李，必須放在這種座位後方的行李空間。座位不另收費，JR 說明這種車票&ldquo;與普通車和綠色車廂指定席價格相同&rdquo;。
          </p>
          <p className={styles.bodyText}>
            帶著超大件行李卻沒有劃位就上車，需付<strong>行李費 {BAGGAGE_FEE}（含稅）</strong>。可在售票櫃檯要求附超大件行李放置區的座位，或在指定席售票機、線上購票。這項規定適用於東海道、山陽與九州新幹線，正是這段路程。查詢於{" "}
            {OWN}。
          </p>
          <p className={styles.bodyText}>
            這項規定在離開京都時比抵達時更容易碰到。多數航空託運行李箱在 160 公分以內，但旅途中買的東西、裝袋的嬰兒車、滑雪袋或高爾夫球袋就不一定；而行李放置區的座位只在指定席車廂，所以買自由席也避不開這項規定。尺寸接近上限時，把大行李箱用宅配寄到東京，比在剪票口才知道答案更便宜。
          </p>
        </section>

        <KlookTourPicks
          heading="京都 → 東京移動日的另一半"
          intro="從京都出發，通常會在東京的飯店或機場結束，而這第二段是大家最常沒有事先安排的。以下四項都在東京車站或品川搭乘：行李全帶在身上的話選專車，不是的話選共乘接送，出境那天則有兩座機場的利木津巴士。各日期能否預約與目前價格，請打開商品頁查看。"
          tours={tourPicks}
        />

        <KlookStayAreas
          heading="東京這一端住哪裡"
          intro="排序依據是新幹線抵達後的二十分鐘，而不是整趟東京旅程，所以和一般的住宿排名不同。丸之內排第一，因為東海道新幹線月台就在車站建築內；澀谷也在名單上，因為列車在抵達終點站前會停靠品川。"
          areas={stayAreas}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>上車前</span>
          <h2 className={styles.sectionTitle}>京都最後一個早上之前，先準備好一件事</h2>
          <p className={styles.bodyText}>
            行動數據，因為移動日一直需要查資料。您的座位是要出示的 QR 碼或購票紀錄，在京都車站大廳需要看地圖而不是用猜的，到了另一端還要在列車上決定品川還是東京車站下車。出發前開通 eSIM，這些事看一眼手機就能解決。{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              查看 Klook eSIM 方案 →
            </KlookLink>{" "}
            <Link href="/zh-tw/guides/esim/best-esim-japan" style={linkStyle}>
              日本網卡推薦
            </Link>
            比較了其他選擇，
            <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>
              日本 IC 卡指南（英文）
            </Link>
            說明為什麼 ICOCA 在東京也能通過山手線剪票口，但不能用來搭新幹線。
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/kyoto-day-trip-from-tokyo", title: "東京出發京都一日遊：交通、費用與行程（2026）（英文）" },
            { href: "/guides/transport/tokyo-to-kyoto", title: "東京到京都（2026）：最便宜與最快的方式（英文）" },
            { href: "/guides/transport/shinkansen-guide", title: "新幹線指南 2026：車票、周遊卡與新手須知（英文）" },
            { href: "/guides/transport/jr-pass-guide", title: "JR Pass 指南 2026：價格、值不值得與購買方式（英文）" },
            { href: "/zh-tw/guides/transport/tokyo-to-nagoya-shinkansen", title: "東京到名古屋新幹線 2026：票價、車程時間與購票方式" },
            { href: "/guides/transport/tokyo-to-hiroshima-shinkansen", title: "東京到廣島新幹線：車程、票價與 JR Pass（英文）" },
            { href: "/guides/transport/kyoto-transportation", title: "京都交通攻略（2026）：巴士、電車與計程車（英文）" },
            { href: "/guides/attractions/where-to-stay-in-tokyo", title: "東京住宿區域指南（2026）：依路線與機場比較（英文）" },
            { href: "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary", title: "東京、京都、大阪 7 天行程（2026）（英文）" },
            { href: "/zh-tw/guides/transport/tokyo-airport-transfer", title: "東京機場交通 2026：成田、羽田到東京車資與時間" },
            { href: "/zh-tw", title: "繁體中文版所有攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>兩小時的車程，出發前先決定三件事</h2>
            <p className={styles.ctaBannerDesc}>
              在京都最後一個早上之前就購票，而不是當天才買：確定自己的座位、需要時的行李空間，以及一班夠早、不必靠 21:38 末班車的列車。接著決定在東京哪一站下車，以及下車後怎麼走。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看京都 → 東京車票 →
              </KlookLink>
              <KlookLink href={PRIVATE_TRANSFER_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看東京機場接送 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
