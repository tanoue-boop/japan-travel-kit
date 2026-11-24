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
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  arashiyamaEarlyMorningWalk,
  arashiyamaHozukyoHalfDayTour,
  arashiyamaSaganoOptionalTour,
  hozugawaRiverBoatTicket,
  klookEsim,
  saganoArashiyamaKiyomizuTour,
  saganoHozugawaGuaranteedTour,
  saganoRomanticTrainTicket,
  whereToStayKyotoAreas,
  type KlookSameDayCard,
} from "../../../../lib/klook-links";
import { gygArashiyama, gygHozugawaKudari } from "../../../../lib/gyg-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/sagano-romantic-train-tickets) section by
// section as of 2026-11-24 (task-jtk-20261124-TR02): same sections, tables, FAQ and Klook /
// GetYourGuide CTAs in the same places. Every figure, date and source is the English page's;
// nothing is added. Title term: 嵯峨野小火車 — the name Taiwan and Hong Kong guides use, with
// 嵐山小火車 as the other common name in the H1.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/sagano-romantic-train-tickets";
const SLUG = "sagano-romantic-train-tickets";
const TITLE = "嵯峨野小火車 2026：購票時間、座位與運行日";
const H1 = "嵯峨野小火車（嵐山小火車）2026：購票時間、座位與運行日";
const DESC =
  "嵯峨野小火車於乘車日 1 個月前的日本時間 00:00 開放線上購票，單程 ¥880。整理 2026 年 11、12 月運行日、冬季停駛與 2027 年新列車。";

const LAST_CHECKED = "2026-11-16";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);
const BOAT_CHECKED = dateLabel("2026-10-25", LOCALE);

const ADULT = "¥880";
const CHILD = "¥440";
const SEAT_FEE_ADULT = "¥620";
const SEAT_FEE_CHILD = "¥310";
const ADULT_2027 = "¥1,500";
const CHILD_2027 = "¥750";

const TOUR_URL = klookFor(saganoHozugawaGuaranteedTour.url, LOCALE);
const TICKET_URL = klookFor(saganoRomanticTrainTicket.url, LOCALE);
const BOAT_URL = klookFor(hozugawaRiverBoatTicket.url, LOCALE);
const WALK_URL = klookFor(arashiyamaEarlyMorningWalk.url, LOCALE);
const OPTIONAL_TOUR_URL = klookFor(arashiyamaSaganoOptionalTour.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);
const ARASHIYAMA_HOTELS_URL = klookFor(whereToStayKyotoAreas[3].url, LOCALE);
const KYOTO_STATION_HOTELS_URL = klookFor(whereToStayKyotoAreas[0].url, LOCALE);

const FAQ_URL = "https://www.sagano-kanko.co.jp/faq/";
const TICKET_PAGE_URL = "https://www.sagano-kanko.co.jp/ticket/";
const RELEASE_URL = "https://www.sagano-kanko.co.jp/news/5535/";
const LIGHTUP_URL = "https://www.sagano-kanko.co.jp/news/5197/";
const CALENDAR_URL = "https://www.sagano-kanko.co.jp/train-info/";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const srcStyle = { color: "var(--text)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const SAME_DAY: KlookSameDayCard[] = [
  {
    kind: "導覽行程",
    label: "嵯峨野小火車、保津川遊船與嵐山散步",
    ctaLabel: "查看小火車與遊船行程 →",
    url: TOUR_URL,
    why: "小火車與順流而下回到嵐山的保津川遊船一次預訂，適合不想分別處理兩個售票管道的您。",
  },
  {
    kind: "徒步導覽",
    label: "嵐山竹林清晨徒步導覽",
    ctaLabel: "查看清晨徒步導覽 →",
    url: WALK_URL,
    why: "從嵯峨嵐山站出發、走較安靜小路的 2.5 小時小團徒步，最後以抹茶茶道體驗結束，正好是搭小火車那天的竹林行程。",
  },
  {
    kind: "eSIM",
    label: "Klook 日本 eSIM",
    ctaLabel: "查看 Klook eSIM →",
    url: ESIM_URL,
    why: "營運公司表示停駛日可能增加或變更，搭乘當天用手機查看公告較方便。",
  },
];

const bookingRows = [
  {
    method: "多數人適用：營運公司官網",
    opens: "乘車日 1 個月前（前一個月的同一天）日本時間 00:00。2027 年 3 月 1 日起的乘車日改為 30 天前",
    cost: `只需付車資：成人 ${ADULT}、兒童 ${CHILD}。前一天 23:59 前免費取消，座位可免費變更最多 3 次。每次最多 8 張，需支援 3-D 驗證的信用卡或簽帳卡`,
  },
  {
    method: "Klook（小火車車票）",
    opens: "可購票的日期顯示在商品頁面",
    cost: "價格與取消規定在商品頁面上，付款前請先確認",
  },
  {
    method: "小火車車站售票櫃檯（嵯峨、嵐山、龜岡）",
    opens: "僅限當天，先到先得：小火車嵯峨站約 08:35、小火車嵐山站 08:50、小火車龜岡站 09:10 開始",
    cost: "只需付車資。可用現金、信用卡或 IC 卡（PiTaPa 除外）。指定席售罄後限量販售站票。小火車保津峽站不售票",
  },
  {
    method: "JR 售票處",
    opens: "不販售",
    cost: "營運公司的常見問題只列出官網與小火車車站售票櫃檯。JR Pass 與青春 18 車票不能使用",
  },
  {
    method: "15 人以上團體",
    opens: "透過旅行社，乘車日 1 年前至 1 個月前",
    cost: "成人 ¥800、兒童 ¥400。團體不能使用 5 號車，當天購票沒有團體折扣",
  },
];

const calendarRows = [
  { dates: "2026 年 11 月 1 日～12 月 29 日", runs: "除 12 月 16 日（三）外每天行駛", trains: "小火車嵯峨站發車的定期班次 09:02～16:02", sale: "12 月 16 日以前的乘車日已開賣；12 月 17～29 日於 11 月 17～29 日日本時間 00:00 開賣" },
  { dates: "11 月 1～13 日", runs: "行駛", trains: "定期班次＋加開 81/82（嵯峨 17:10 發車）", sale: "已開賣" },
  { dates: "11 月 14～30 日", runs: "行駛", trains: "定期班次＋81/82＋91/92（嵯峨 18:26 發車）", sale: "已開賣" },
  { dates: "12 月 1～4 日", runs: "行駛", trains: "定期班次＋81/82", sale: "已開賣" },
  { dates: "12 月 5～6 日（六～日）", runs: "行駛", trains: "定期班次＋81/82＋91/92", sale: "已開賣" },
  { dates: "12 月 7～13 日", runs: "行駛", trains: "定期班次＋81/82", sale: "已開賣" },
  { dates: "12 月 14～15 日", runs: "行駛", trains: "只有定期班次", sale: "已開賣" },
  { dates: "12 月 16 日（三）", runs: "停駛", trains: "無班次", sale: "—" },
  { dates: "12 月 17～25 日", runs: "行駛", trains: "只有定期班次", sale: "11 月 17～25 日日本時間 00:00" },
  { dates: "12 月 26～27 日（六～日）", runs: "行駛", trains: "定期班次＋81/82", sale: "11 月 26～27 日日本時間 00:00" },
  { dates: "12 月 28～29 日", runs: "行駛；12 月 29 日是現行車廂的最後一天", trains: "只有定期班次", sale: "11 月 28～29 日日本時間 00:00" },
  { dates: "2026 年 12 月 30 日～2027 年 2 月 28 日", runs: "冬季停駛", trains: "無班次", sale: "—" },
];

const directionRows = [
  {
    dir: "多數人適用：小火車嵯峨 → 小火車龜岡（下行）",
    times: "小火車嵯峨站 09:02～16:02 每小時發車。下方日曆所列日期另有 17:10 與 18:26 加開班次",
    seats: "C、D 面向前進方向；A、D 為靠窗座位",
    fit: "可接從龜岡順流回到嵐山的保津川遊船。購票時請選擇嵯峨／嵐山 → 龜岡方向。嵯峨出發的車票也能在小火車嵐山站上車",
  },
  {
    dir: "小火車龜岡 → 小火車嵯峨（上行）",
    times: "小火車龜岡站 09:30～16:30 每小時發車。同樣日期另有 17:43 與 18:59 加開班次",
    seats: "A、B 面向前進方向；A、D 為靠窗座位",
    fit: "終點在嵐山，搭完再去竹林。前往龜岡可搭 JR 到馬堀站，再步行約 10 分鐘。營運公司表示從 16:30 發車的班次起可以看到點燈。可在小火車嵐山站下車，但不能再上車",
  },
];

const fareRows = [
  { ticket: "成人單程", price: ADULT, note: "小火車嵯峨到小火車龜岡全程，或線上任何較短的區間都同一價格，不依距離計價。" },
  { ticket: "兒童單程（6～11 歲）", price: CHILD, note: "正好是成人票價的一半。營運公司定義的兒童為 6 歲以上、未滿 12 歲。" },
  { ticket: "15 人以上團體（成人）", price: "¥800", note: "兒童 ¥400。營運公司說明當天購票沒有團體折扣。" },
  { ticket: "學生團體（成人）", price: "¥710", note: "兒童 ¥360，依營運公司的學校與學生團體票價表。" },
  { ticket: "寵物（放入提籠）", price: "¥260", note: "手提行李費。提籠長度須在 70 公分以內、三邊合計約 90 公分以內、重量 10 公斤以內。" },
];

const changeRows = [
  { item: "成人單程（有座位）", now: `${ADULT}，含座位`, next: `${ADULT_2027}：車資 ${ADULT}＋座位費 ${SEAT_FEE_ADULT}` },
  { item: "兒童單程（有座位）", now: `${CHILD}，含座位`, next: `${CHILD_2027}：車資 ${CHILD}＋座位費 ${SEAT_FEE_CHILD}` },
  { item: "不坐座位搭乘", now: "指定席售罄後，當天限量販售的站票", next: `只付車資即可在各車廂的露台區搭乘：成人 ${ADULT}、兒童 ${CHILD}` },
  { item: "包廂", now: "無", next: "4 號車 Premium Cabin Rankyo：每間 ¥9,000，最多 6 人，每位乘客另付車資。從小火車嵯峨站或小火車龜岡站上車" },
  { item: "線上開賣時間", now: "乘車日 1 個月前日本時間 00:00", next: "乘車日 30 天前日本時間 00:00。僅 2027 年 3 月 1 日的乘車日於 2027 年 2 月 1 日 10:00 左右開賣" },
  { item: "列車", now: "現行車廂，包含開放式的 5 號車「Rich 號」。2026 年 12 月 29 日退役", next: "新的五節編組列車：一節機關車加四節客車，側面玻璃一直延伸到腳邊，並有挑高的玻璃天花板" },
  { item: "首班與末班", now: "末班 2026 年 12 月 29 日", next: "首班 2027 年 3 月 1 日：嵯峨野 3 號，10:02 從小火車嵯峨站發車" },
  { item: "冬季停駛", now: "2026 年 12 月 30 日～2027 年 2 月 28 日", next: "2027 年 12 月 30、31 日停駛。2028 年 1、2 月尚未公布" },
];

const seasonRows = [
  { period: "現在～2026 年 12 月 29 日", status: "行駛", note: "小火車嵯峨站的定期班次 09:02～16:02 發車，小火車龜岡站的末班回程 16:30 發車。12 月 29 日（二）是現行車廂的最後一天。" },
  { period: "2026 年 12 月 16 日", status: "停駛", note: "營運公司 2026 年日曆上，本季結束前剩下的唯一停駛日。營運公司表示停駛日可能增加或變更。" },
  { period: "2026 年 10 月 24 日～12 月 29 日", status: "點燈", note: "16:30 至末班車之間沿線點燈，營運公司表示從小火車龜岡站 16:30 發車的嵯峨野 16 號起就能看到。加開 81/82（小火車嵯峨站 17:10 發車）行駛於 10 月 24 日～12 月 13 日與 12 月 26～27 日；加開 91/92（18:26）行駛於 11 月 14～30 日與 12 月 5～6 日。" },
  { period: "2026 年 12 月 30 日～2027 年 2 月 28 日", status: "停駛", note: "冬季停駛。營運公司 2026 年日曆將 12 月 30、31 日標為冬季停駛日，2027 年的時刻表從 3 月 1 日開始。" },
  { period: "2027 年 3 月 1 日起", status: "新列車", note: "新列車從 10:02 的嵯峨野 3 號開始行駛，當天沒有 09:02 班次。定期時刻表不變，小火車嵯峨站 09:02～16:02 發車。2027 年日曆在旺季以外的大多數週三停駛，例如 3 月 10 日與 4 月 14 日，請確認您的日期。" },
];

const carRows = [
  { car: "1～4 號車：一般車廂（至 2026 年 12 月 29 日）", what: "有窗戶可以拉開的有頂車廂，四人座包廂式座位、木製長椅與燈泡照明。由貨車改裝而成，行駛聲音也相當大。", pick: "預設選擇；預報有雨時，選這種車廂最合理。座位依車廂號碼與 A～D 座位代號販售。" },
  { car: "5 號車：Rich 號（至 2026 年 12 月 29 日）", what: "完全沒有窗戶的開放式車廂，有玻璃天花板，位置最靠近機關車。營運公司表示下雨時車內可能淋濕，車內禁止撐傘，也不因下雨退費。", pick: "想看峽谷就訂這節，但遇到大雨可能後悔。請帶雨衣。購票時必須自行選擇「No. 5」，系統不會自動分配。" },
  { car: "1～4 號車：新列車（2027 年 3 月 1 日起）", what: "側面玻璃延伸到腳邊、挑高玻璃天花板、木質座椅與地板，每節車廂門邊有加蓋的半戶外露台區。4 號車另有 Rankyo 包廂，設有榻榻米風長椅，可看前方景色。", pick: `成人座位 ${ADULT_2027}。露台區 ${ADULT}，包廂每間 ¥9,000 另加車資。新聞稿沒有附上新車廂的座位圖。` },
];

const combinationRows = [
  { option: "只搭小火車單程", cost: `成人 ${ADULT}、兒童 ${CHILD}；2027 年 3 月 1 日起含座位為 ${ADULT_2027} 與 ${CHILD_2027}`, time: "搭車約 25 分鐘", pick: "嵐山只是京都一日行程中的一站時適用。從嵯峨搭到龜岡，步行 10 分鐘到 JR 馬堀站，再搭 JR 嵯峨野線回來，回程付一般車資即可。" },
  { option: "小火車單程＋保津川遊船回程", cost: `成人 ${ADULT}＋¥6,000；兒童 ${CHILD}＋¥4,500（小火車車資為 2026 年 12 月 29 日前的價格）`, time: "大約半天：上行 25 分鐘，順流而下約 2 小時", pick: "最經典的組合，也是多數人搭這班小火車的原因。遊船終點在嵐山，不必搭回程列車，就能在出發的地方結束上午行程。" },
  { option: "兩者都包含的導覽行程", cost: "請在商品頁面確認您日期的價格", time: "依行程為半天或一整天", pick: "日期在秋季、遊船的航行期間對不上，或不想分別處理相隔一小時的兩筆預訂時適用。導覽行程也會處理小火車龜岡站到遊船乘船處之間的移動，兩地無法步行往來。" },
];

const steps = [
  { title: "先在營運日曆上確認日期", desc: `列車不行駛，其他準備都沒有意義。本線行駛至 2026 年 12 月 29 日，12 月 30 日至 2027 年 2 月 28 日停駛，2027 年 3 月 1 日恢復行駛。營運公司在每季之中也有固定停駛日，標示在年度日曆上。${CHECKED}查核。` },
  { title: "日本時間 00:00 開賣時立刻上網購票", desc: "2026 年的乘車日於乘車日 1 個月前的 00:00 開賣。2027 年 3 月 1 日起的乘車日改為 30 天前的 00:00 開賣，只有 3 月 1 日當天的車票於 2027 年 2 月 1 日 10:00 左右開賣。車站不販售預售票。秋季紅葉期間，熱門日期會最先售罄。" },
  { title: "除了日期，也要選車廂與座位", desc: "購票頁面會要求選擇車廂號碼，以及四人座包廂中的 A～D 座位代號。營運公司的常見問題說明 A、D 是靠窗座位，往龜岡的班次 C、D 面向前進方向，往嵯峨的班次則是 A、B。開放式的 5 號車 Rich 號必須自行選擇，購票時請選「No. 5」，至 2026 年 12 月 29 日為止。營運公司沒有公布 1～4 號車哪一側靠河、哪一側靠山，如果您是為了風景，選開放式車廂比挑座位代號更可靠。" },
  { title: "當天出示 QR 碼", desc: "營運公司的常見問題說明，QR 碼只會在乘車當天顯示於智慧型手機或平板，只有列印的憑證無法上車。前一天 23:59 前可免費取消，在那之前也能在同一班列車內變更座位最多三次。當天不能退票或變更。" },
  { title: "如果售罄，當天到車站購票", desc: "當天車票在各站售票櫃檯先到先得販售，小火車保津峽站除外。營運公司公布的開始販售時間為小火車嵯峨站約 08:35、小火車嵐山站 08:50、小火車龜岡站 09:10，指定席售罄後會限量販售站票。" },
  { title: "遊船另外預訂，並注意方向", desc: `保津川遊船（保津川下り）從龜岡順流而下到嵐山，方向與小火車相反，所以兩者可以接在一起。龜岡市公布的票價為成人 ¥6,000、4 歲至小學生 ¥4,500，約 2 小時；主要航行期為 3 月 10 日～11 月 30 日，12 月中旬～3 月 9 日為暖氣船，12 月 29 日～1 月 4 日停航，天候不佳或水位過高時停航。${BOAT_CHECKED}查核。` },
];

const faqItems: FaqItem[] = [
  {
    q: "嵯峨野小火車應該什麼時候購票？",
    a: `在乘車日 1 個月前的日本時間 00:00，於營運公司官網購票。每個乘車日的車票在前一個月的同一天開賣，所以 2026 年 12 月 29 日的車票於 11 月 29 日 00:00 開賣。營運公司表示紅葉約在 11 月中旬至 12 月上旬，這段期間請在開賣當下購票：全車都是指定席，營運公司也沒有公布各日期多快售罄。2027 年 3 月 1 日起的乘車日改為 30 天前開賣，3 月 1 日當天的車票於 2027 年 2 月 1 日 10:00 左右開賣。前一天 23:59 前可免費取消。${CHECKED}查核。`,
  },
  {
    q: "嵯峨野小火車可以當天買票嗎？",
    a: `可以，在小火車嵯峨站、小火車嵐山站與小火車龜岡站的售票櫃檯先到先得購票，小火車保津峽站不販售。營運公司公布的開始販售時間分別約為 08:35、08:50 與 09:10，旺季時三站都在 08:35 左右開始；指定席售罄後，每節車廂會限量販售站票，站票也售罄時該班列車即客滿。售票櫃檯可使用現金、信用卡，以及 PiTaPa 以外的 IC 卡。${CHECKED}查核。`,
  },
  {
    q: "嵯峨野小火車搭哪個方向比較好？",
    a: `多數人適合小火車嵯峨 → 小火車龜岡，因為保津川遊船是反方向從龜岡順流而下到嵐山，兩者可以連成一圈。如果想在竹林結束行程，或想看點燈，請改搭龜岡 → 嵯峨；營運公司表示從龜岡 16:30 發車的班次起可以看到點燈。兩個方向都是 ${ADULT}。營運公司的常見問題說明，往龜岡的班次 C、D 座位面向前進方向，往嵯峨的班次則是 A、B。${CHECKED}查核。`,
  },
  {
    q: "2026～27 年冬天嵯峨野小火車有行駛嗎？",
    a: `只行駛到 2026 年 12 月 29 日。11 月 1 日至 12 月 29 日除 12 月 16 日（三）外每天行駛，之後於 2026 年 12 月 30 日至 2027 年 2 月 28 日停駛，2027 年 3 月 1 日以新列車恢復行駛。營運公司 2026 年日曆將 12 月 30、31 日標為冬季停駛，2027 年的時刻表從 3 月 1 日開始。${CHECKED}查核。`,
  },
  {
    q: "2027 年嵯峨野小火車新列車有什麼改變？",
    a: `2027 年 3 月 1 日起，新的五節編組列車取代現行車廂，現行車廂於 2026 年 12 月 29 日退役。車資維持 ${ADULT}，另加座位費 ${SEAT_FEE_ADULT}（兒童 ${SEAT_FEE_CHILD}），所以成人座位為 ${ADULT_2027}；各車廂加蓋的露台區只需付車資；4 號車的 Premium Cabin Rankyo 每間 ¥9,000，最多 6 人，另加車資。線上開賣改為乘車日 30 天前。首班為 3 月 1 日 10:02 的嵯峨野 3 號。${CHECKED}查核。`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "嵯峨野小火車票價多少？",
    a: `2026 年 12 月 29 日以前，單程成人 ${ADULT}、6～11 歲兒童 ${CHILD}，適用小火車嵯峨站至小火車龜岡站之間 7.3 公里的全線，不依距離計價。依營運公司的票價表，15 人以上團體為 ¥800 與 ¥400，學生團體為 ¥710 與 ¥360；當天購票沒有團體折扣。放入提籠的寵物收手提行李費 ¥260。${CHECKED}查核。`,
  },
  {
    q: "嵯峨野小火車要搭多久、到哪裡？",
    a: "從小火車嵯峨站經小火車嵐山站、小火車保津峽站到小火車龜岡站，沿保津川峽谷行駛 7.3 公里，約 25 分鐘。小火車嵯峨站大約每小時一班，09:02 至 16:02 發車，旺季另有加開班次。這是單程路線而不是環狀線，購票前就要先決定怎麼回來。",
  },
  {
    q: "嵯峨野小火車哪些日子不行駛？",
    a: `除了冬季，營運公司在每季之中也有固定停駛日。2026 年本季結束前剩下的停駛日只有 12 月 16 日。2027 年日曆上，大多數停駛日是旺季以外的週三，從 3 月 10 日與 4 月 14 日開始，11 月則完全不停駛。營運公司表示停駛日可能變更，請在日曆上確認您的日期。${CHECKED}查核。`,
  },
  {
    q: "最後一天能搭 Rich 號是哪天？",
    a: `若日期不變，是 2026 年 12 月 29 日（二）。營運公司表示，包含開放式 5 號車在內的現行車廂預定在當天行駛後退役，新列車的新聞稿介紹的則是玻璃側面的車廂與加蓋的露台區。團體購票不能使用 5 號車，最後幾天的座位也是 1 個月前開賣，所以 12 月 29 日的車票於 11 月 29 日日本時間 00:00 開賣。${CHECKED}查核。`,
  },
  {
    q: "想看河景要坐哪一側？",
    a: "現行列車方面，營運公司公布了座位圖：1～4 號車是有窗戶的四人座包廂，座位代號為 A～D；常見問題說明 A、D 是靠窗座位，往龜岡的班次 C、D 面向前進方向，往嵯峨的班次則是 A、B。但營運公司沒有公布哪一側面向保津川，所以任何斷言左側或右側的說法，都是別人的推測，而不是鐵路公司的資訊。營運公司資料中真正找得到的答案是開放式的 5 號車「Rich 號」：沒有窗戶、有玻璃天花板，兩側峽谷都看得到。購票時必須自行選擇。",
  },
  {
    q: "開放式的 5 號車 Rich 號值得選嗎？",
    a: "在 2026 年 12 月 29 日以前，這節車廂就是捨棄同一條溪谷的一般 JR 列車、改搭這條線的理由，也是唯一一節不論分到哪個座位，景色都一樣的車廂。缺點也已公開：沒有窗戶，下雨時車內可能淋濕；車內不能撐傘；營運公司也說明不因下雨退費。請帶雨衣，並在前一天查看天氣預報。如果預報不好，選 1～4 號車的座位比較合適。",
  },
  {
    q: "怎麼前往小火車嵯峨站與小火車龜岡站？",
    a: "小火車嵯峨站就在 JR 嵯峨野線嵯峨嵐山站旁，步行約五分鐘；從京福嵐山本線的嵐電嵯峨站也約五分鐘，從阪急嵐山站步行約二十分鐘。另一端的小火車龜岡站，從 JR 山陰（嵯峨野）線馬堀站步行約十分鐘，所以「搭小火車上行、搭 JR 回來」的行程很容易安排。",
  },
  {
    q: "要不要加上保津川遊船？",
    a: `遊船是這一天自然的另一半，因為方向相反：從龜岡順流而下到嵐山，所以會在出發的地方結束。龜岡市公布的票價為成人 ¥6,000、4 歲至小學生 ¥4,500，在河上約兩小時；主要航行期為 3 月 10 日～11 月 30 日，12 月中旬至 3 月 9 日為加蓋的暖氣船。12 月 29 日至 1 月 4 日停航，天候不佳或水位過高時也會停航；在安排一整天不能退費的行程前，最好先知道這一點。${BOAT_CHECKED}查核。`,
  },
  {
    q: "帶小孩搭嵯峨野小火車值得嗎？",
    a: `值得，票價也很友善：2026 年 12 月 29 日以前兒童 ${CHILD}、成人 ${ADULT}（2027 年 3 月 1 日起含座位為 ${CHILD_2027} 與 ${ADULT_2027}），車程 25 分鐘，在孩子失去耐心前就會結束。營運公司資料中有兩個實用重點：嬰兒車上車須收合，列車上有兩個輪椅空間。導盲犬與輔助犬可以搭乘，其他寵物需要提籠並付 ¥260。5 號車是孩子最想坐的車廂，也是沒有窗戶的車廂，請依天氣而不是投票來決定。`,
  },
];

const winterPicks = [
  withKlookLocale(saganoHozugawaGuaranteedTour, LOCALE, {
    title: "嵯峨野小火車、保津川遊船與嵐山散步",
    desc: "適用 2026 年 12 月 29 日以前或 2027 年 3 月 1 日以後的日期：小火車單程、順流回到嵐山的遊船，以及竹林自由活動時間",
  }),
  withKlookLocale(arashiyamaEarlyMorningWalk, LOCALE, {
    title: "嵐山竹林清晨徒步導覽",
    desc: "從嵯峨嵐山站出發、走主要路線以外安靜小路的 2.5 小時小團徒步，最後以抹茶茶道體驗結束",
  }),
  { title: "嵐山飯店", desc: "住在竹林附近，在人潮湧入前抵達", url: ARASHIYAMA_HOTELS_URL },
  { title: "京都站周邊飯店", desc: "前往嵯峨嵐山的 JR 嵯峨野線從這裡出發，搭快速約 11 分鐘", url: KYOTO_STATION_HOTELS_URL },
  { title: "Klook 日本 eSIM", desc: "以 QR 碼憑證寄送的日本 eSIM，用手機查地圖與預訂頁面", url: ESIM_URL },
  withKlookLocale(saganoRomanticTrainTicket, LOCALE, {
    title: "嵯峨野小火車車票",
    desc: "如果您的日期在停駛期間前後，這是小火車單程座位",
  }),
];

const guidedPicks = [
  withKlookLocale(saganoHozugawaGuaranteedTour, LOCALE, {
    title: "嵯峨野小火車、保津川遊船與嵐山散步",
    desc: "保證出團的經典組合：小火車單程、順流回到嵐山的保津川遊船，以及竹林自由活動時間",
  }),
  withKlookLocale(arashiyamaHozukyoHalfDayTour, LOCALE, {
    title: "嵐山與保津峽半日遊",
    desc: "把嵯峨野小火車、保津川遊船與嵐山景點一次預訂的半日行程",
  }),
  withKlookLocale(saganoArashiyamaKiyomizuTour, LOCALE, {
    title: "嵯峨野小火車、嵐山與清水寺半日遊",
    desc: "小火車、嵐山與清水寺排在同一條巴士路線的導覽半日行程",
  }),
  withKlookLocale(arashiyamaSaganoOptionalTour, LOCALE, {
    title: "嵐山一日遊（可加選嵯峨野小火車）",
    desc: "竹林與嵐山景點，小火車為可加選項目；日期在冬季停駛期間時請看這一項",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "嵯峨野小火車" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows, boldFirst = false }: { head: string[]; rows: ReactNode[][]; boldFirst?: boolean }) {
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
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (boldFirst && r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: boldFirst && r === 0 ? 700 : undefined }}
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

function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={srcStyle}>
      {children}
    </a>
  );
}

export default function ZhTwSaganoRomanticTrainTicketsPage({ updated }: { updated: PageUpdated }) {
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
            沿保津川峽谷行駛的京都觀光小火車。座位 1 個月前開賣，現行車廂於 12 月 29 日退役，之後停駛到 3 月，2027 年 3 月 1 日起由新列車行駛。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "營運公司官方票價", "2027 年 3 月 1 日起新列車"].map((t) => (
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
            <strong>嵯峨野小火車（嵯峨野觀光小火車／Sagano Romantic Train）什麼時候購票：</strong>營運公司嵯峨野觀光鐵道的官網在<strong>乘車日 1 個月前的日本時間 00:00</strong> 開賣，所以現行列車最後一天 2026 年 12 月 29 日的車票，於 11 月 29 日 00:00 開賣。營運公司表示紅葉約在<strong>11 月中旬至 12 月上旬</strong>，這段期間請在開賣的 00:00 購票：營運公司沒有公布售罄時間，網路座位售罄後，只剩車站售票櫃檯的當天座位與限量站票。票價為單程成人 <strong>{ADULT}</strong>、兒童 <strong>{CHILD}</strong>，<strong>2026 年 12 月 30 日至 2027 年 2 月 28 日停駛</strong>；<strong>2027 年 3 月 1 日</strong>起改由新列車行駛，加收 {SEAT_FEE_ADULT} 座位費，座位為 <strong>{ADULT_2027}</strong>，並改為 <strong>30 天前</strong>開賣。官方數字於 {CHECKED}查核。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>預訂這趟行程</span>
          <h2 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>
            預訂小火車座位與當天其他行程
          </h2>
          <p className={styles.bodyText}>
            嵐山一日行程中，只有小火車座位有嚴格的開賣時間。回程的遊船、導覽徒步與行動數據都可以一次訂好。請打開商品頁面，查看您日期的空位與目前價格。
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看嵯峨野小火車日期與價格 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
            在商品頁面選擇乘車日，就能看到價格與剩餘座位。現行列車的最後一天是 2026 年 12 月 29 日，2026 年 12 月 30 日至 2027 年 2 月 28 日不行駛。
          </p>
        </section>

        <KlookSameDayCards heading="同一天在嵐山可以一起預訂的項目" cards={SAME_DAY} />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速結論</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人，至 2026 年 12 月 29 日</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人座位，2027 年 3 月 1 日起</p>
                <p className={styles.verdictStatValue}>{ADULT_2027}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>冬季停駛</p>
                <p className={styles.verdictStatValue}>12 月 30 日～2 月 28 日</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>開賣時間</p>
                <p className={styles.verdictStatValue}>1 個月前；2027 年 3 月起 30 天前</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              全程 <strong>7.3 公里</strong>，往返於嵐山的<strong>小火車嵯峨站</strong>（トロッコ嵯峨）與<strong>小火車龜岡站</strong>（トロッコ亀岡）之間，沿保津川峽谷行駛；小火車嵯峨站大約每小時一班，<strong>09:02～16:02</strong> 發車。兒童票適用 6～11 歲。當天車票在保津峽以外的各小火車站先到先得販售。這班列車<strong>不能使用 JR Pass</strong>。Klook 販售車票，以及包含小火車的導覽行程。票價與日期來自營運公司官網，於 {CHECKED}查核。
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                小火車＋保津川遊船行程 →
              </KlookLink>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                只買小火車車票 →
              </KlookLink>
              <GygCompareButton slug={SLUG} listing={gygArashiyama} />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>開賣時間</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火車應該什麼時候購票？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            在乘車日前一個月的同一天、日本時間 00:00，於營運公司官網購票。2027 年 3 月 1 日起的乘車日改為 30 天前，所以 2027 年 4 月 1 日的車票於 3 月 2 日 00:00 開賣；唯一例外是 2027 年 3 月 1 日，於 2027 年 2 月 1 日 10:00 左右開賣。
          </p>
          <Table head={["購票管道", "開賣時間", "費用與變更"]} rows={bookingRows.map((r) => [r.method, r.opens, r.cost])} boldFirst />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{LAST_CHECKED}。資料來源：營運公司的<Src href={FAQ_URL}>常見問題</Src>、<Src href={TICKET_PAGE_URL}>票價與車票頁面</Src>及<Src href={RELEASE_URL}>2026 年 10 月 23 日新聞稿</Src>。在網路上變更日期或人數，需要先取消再重新購票。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看小火車日期 →
            </KlookLink>
            <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              小火車＋遊船導覽行程 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>運行日</span>
          <h2 className={styles.sectionTitle}>2026 年 11 月與 12 月嵯峨野小火車有行駛嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            有，2026 年 11 月 1 日至 12 月 29 日除 12 月 16 日（三）外每天行駛。秋季大多數日期都有傍晚加開班次，12 月 30 日起進入冬季停駛。
          </p>
          <Table head={["日期", "行駛狀況", "班次", "開賣時間"]} rows={calendarRows.map((r) => [r.dates, r.runs, r.trains, r.sale])} />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{LAST_CHECKED}。資料來源：營運公司的<Src href={LIGHTUP_URL}>2026 年 9 月 18 日點燈新聞稿</Src>與<Src href={CALENDAR_URL}>營運日曆</Src>。加開班次：81 於 17:10 從小火車嵯峨站發車、82 於 17:43 從小火車龜岡站發車；91 於 18:26 從嵯峨發車、92 於 18:59 從龜岡發車。營運公司表示停駛日與加開班次可能增加或變更，已購票的班次停駛時，車資會自動退回信用卡。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>方向</span>
          <h2 className={styles.sectionTitle}>嵯峨到龜岡，還是龜岡到嵯峨比較好？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            多數行程適合嵯峨到龜岡，因為保津川遊船會把您帶回嵐山。兩個方向都是 {ADULT}，不同的是發車時間、哪些座位面向前進方向，以及終點在哪裡。
          </p>
          <Table head={["方向", "發車時間", "面向前進方向的座位", "選擇理由"]} rows={directionRows.map((r) => [r.dir, r.times, r.seats, r.fit])} boldFirst />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{LAST_CHECKED}。資料來源：營運公司的<Src href={FAQ_URL}>常見問題</Src>（座位與跨站乘車）與<Src href={CALENDAR_URL}>時刻表</Src>。營運公司沒有公布各方向的擁擠程度，也沒有公布哪一側面向河流；2026 年 12 月 29 日以前，開放式的 5 號車兩側都看得到。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={BOAT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              搭保津川遊船回到嵐山 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygHozugawaKudari} />
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>簡介</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火車是什麼？</h2>
          <p className={styles.bodyText}>
            這是一條沿舊山陰本線行駛、全長 7.3 公里的觀光鐵道，從嵯峨嵐山站旁的<strong>小火車嵯峨站</strong>出發，經過<strong>小火車嵐山站</strong>與<strong>小火車保津峽站</strong>，抵達<strong>小火車龜岡站</strong>。車廂由貨車改裝：木製長椅、燈泡照明、可以拉開的窗戶，聲音也很大。5 號車「Rich 號」完全沒有窗戶，並有玻璃天花板。這款列車將於 2026 年 12 月 29 日退役。
          </p>
          <p className={styles.bodyText}>
            這班小火車需要先處理購票，原因有兩個。第一，全車都是對號指定席，網路在 1 個月前開賣，所以秋季日期在您抵達前一個月就決定了。第二，這是一條有季節性停駛的<em>單程</em>路線。怎麼回來、您的日期是否行駛，比選哪個座位更重要。
            <Link href="/guides/attractions/kyoto-2-day-itinerary" style={linkStyle}>
              京都兩天行程（英文）
            </Link>
            與
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>
              京都三天行程（英文）
            </Link>
            說明了這段車程在京都旅程中的位置。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火車票價多少？</h2>
          <Table head={["票種", "票價", "說明"]} rows={fareRows.map((r) => [r.ticket, r.price, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            票價於 {CHECKED}對照營運公司的票價頁面與 2026 年 10 月 23 日新聞稿查核，為 2026 年 12 月 29 日以前的票價。請注意表中<em>沒有</em>的項目：開放式的 5 號車沒有加價，同樣是 {ADULT}，所以每個日期一開賣它就最先售罄。小火車行程常會搭配的京都景點門票，請看
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={srcStyle}>
              日本景點門票價格表（英文）
            </Link>
            ，每一項都附上查核日期。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>2027 年變更</span>
          <h2 className={styles.sectionTitle}>2027 年嵯峨野小火車有什麼改變？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            2027 年 3 月 1 日起會有新列車與新的座位費。車資維持 {ADULT} 與 {CHILD}，所以成人座位從 {ADULT} 變成 {ADULT_2027}。線上開賣也改為乘車日 30 天前。
          </p>
          <Table head={["變更項目", "2026 年（至 12 月 29 日）", "2027 年（3 月 1 日起）"]} rows={changeRows.map((r) => [r.item, r.now, r.next])} />
          <p className={styles.bodyText} style={noteStyle}>
            於 {CHECKED}對照營運公司的<Src href={RELEASE_URL}>2026 年 10 月 23 日新聞稿</Src>與 2026 年日曆查核。新聞稿沒有說明露台區的位置如何販售、站票是否繼續販售，以及 2027 年 3 月以後的團體票價。營運公司的新列車頁面預告之後還會發布消息，安排這些部分前，請先查看官網。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>行駛期間</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火車什麼時候行駛、什麼時候停駛？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            這是最容易打亂行程的部分。本線冬季停駛兩個月，每季之中也有停駛日。2026 年的傍晚，點燈是選擇晚班車的理由。
          </p>
          <Table head={["期間", "行駛狀況", "營運公司的說明"]} rows={seasonRows.map((r) => [r.period, r.status, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            行駛期間與停駛日於 {CHECKED}查核。如果您的京都行程在 1 月或 2 月，這趟旅行就無法搭乘小火車。
            <Link href="/guides/attractions/things-to-do-kyoto" style={srcStyle}>
              京都必做清單（英文）
            </Link>
            整理了不需預約就能去的替代景點。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={OPTIONAL_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看您日期的空位 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygArashiyama} />
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>冬季</span>
          <h2 className={styles.sectionTitle}>冬天嵯峨野小火車有行駛嗎？</h2>
          <p className={styles.bodyText}>
            行駛到 2026 年 12 月 29 日，之後<strong>2026 年 12 月 30 日至 2027 年 2 月 28 日停駛</strong>。營運公司 2026 年日曆將 12 月 30、31 日標為冬季停駛日，2027 年的時刻表在 3 月 1 日以前沒有日期。營運公司沒有另外公告 2027 年 1、2 月的情況，所以這段期間是依兩份日曆整理。{CHECKED}查核。
          </p>
          <p className={styles.bodyText}>
            冬天的嵐山依然值得一去。
            <Link href="/guides/attractions/arashiyama-bamboo-forest-tour" style={linkStyle}>
              嵐山竹林（英文）
            </Link>
            全年免費開放，清晨走一趟竹林，很適合搭配
            <Link href="/guides/attractions/kyoto-kimono-rental" style={linkStyle}>
              嵐山和服租借（英文）
            </Link>
            。龜岡市也公布 12 月中旬至 3 月 9 日有暖氣的保津川遊船，12 月 29 日至 1 月 4 日停航（{BOAT_CHECKED}查核）。想住在竹林附近，
            <Link href="/guides/attractions/where-to-stay-in-kyoto" style={linkStyle}>
              京都住宿區域指南（英文）
            </Link>
            比較了嵐山與京都站周邊。
          </p>
        </section>

        <KlookTourPicks
          heading="小火車停駛時，在嵐山可以預訂什麼？"
          intro="能調整日期的人，先看小火車與遊船的行程。Klook 說明小火車停駛時這個行程會取消並全額退款，所以只適用於現在到 2026 年 12 月 29 日，或 2027 年 3 月 1 日以後（2026 年 11 月 7 日查看商品頁面）。其他項目在冬季任何日期都可以使用。請打開商品頁面查看空位與目前價格。"
          tours={winterPicks}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>售罄</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火車售罄怎麼辦？</h2>
          <p className={styles.bodyText}>
            官網售罄不代表行程只能取消。營運公司表示，小火車嵯峨站、小火車嵐山站與小火車龜岡站的售票櫃檯仍會販售<strong>當天車票</strong>，小火車保津峽站則不販售。開始販售時間分別約為 08:35、08:50 與 09:10，旺季時三站都在 08:35 左右開始。指定席售罄後，每節車廂會限量販售<strong>站票</strong>，直到額滿為止。營運公司也提醒，列車客滿時可能無法上車。
          </p>
          <p className={styles.bodyText}>
            因為前一天 23:59 前可以免費取消，當天晚上再查一次官網也值得。如果不想排隊，導覽行程會把小火車與遊船一次訂好，請用您的日期查看。即使整班列車都售罄，JR 嵯峨野線仍能帶您到嵐山，不過小火車本身不能使用 JR Pass。{CHECKED}查核。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              小火車＋遊船行程 →
            </KlookLink>
            <KlookLink href={WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              嵐山徒步導覽 →
            </KlookLink>
            <KlookLink href={ARASHIYAMA_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              嵐山飯店 →
            </KlookLink>
            <KlookLink href={KYOTO_STATION_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              京都站飯店 →
            </KlookLink>
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              Klook eSIM →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 購買小火車車票 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygArashiyama} />
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>座位</span>
          <h2 className={styles.sectionTitle}>應該訂哪一節車廂、哪個座位？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            答案取決於您的日期，因為列車在 2027 年 3 月 1 日更換。
          </p>
          <Table head={["車廂", "車廂特色", "適合選擇的情況"]} rows={carRows.map((r) => [r.car, r.what, r.pick])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            大家最常問的<strong>哪一側面向河流</strong>，營運公司並沒有針對現行列車公布答案。座位資料只說明車廂配置（四人座包廂，座位代號 A～D）與 5 號車的規定。所以看到建議坐左側或右側的說法，請當作推測；如果您是為了峽谷而搭車，就選開放式車廂。同一份資料的無障礙資訊：列車上有兩個輪椅空間，導盲犬與輔助犬可以搭乘，嬰兒車須收合，寵物須放入約 70 公分、10 公斤以內的提籠並付 ¥260。{CHECKED}查核。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>怎麼前往小火車嵯峨站與小火車龜岡站？</h2>
          <p className={styles.bodyText}>
            <strong>小火車嵯峨站</strong>就在 JR 嵯峨野線<strong>嵯峨嵐山站</strong>旁，步行約五分鐘。營運公司也說明，從京福嵐山本線的<strong>嵐電嵯峨站</strong>約五分鐘，從<strong>阪急嵐山站</strong>步行約二十分鐘。從京都站出發，班次多的 JR 嵯峨野線是最直接的方式。
          </p>
          <p className={styles.bodyText}>
            另一端的<strong>小火車龜岡站</strong>，從 JR 山陰（嵯峨野）線<strong>馬堀站</strong><strong>步行約十分鐘</strong>。這讓最省錢的安排可行：小火車搭單程，步行到馬堀站，再搭一般 JR 列車回來。如果您已訂了保津川遊船，也要注意這一點：遊船乘船處在龜岡，不在小火車龜岡站，兩地無法步行往來。
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>
              京都交通指南（英文）
            </Link>
            整理了 JR、地鐵、嵐電與公車；如果同一週要在關西各城市之間移動，
            <Link href="/guides/attractions/kansai-area-pass" style={linkStyle}>
              關西廣域鐵路周遊券（英文）
            </Link>
            可用於 JR 路段，但小火車屬於私鐵，不能使用。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>只搭小火車、加上遊船，還是參加導覽行程？</h2>
          <Table head={["選項", "費用", "時間", "適合選擇的情況"]} rows={combinationRows.map((r) => [r.option, r.cost, r.time, r.pick])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            有三件事任何整理都無法替您的日期回答，所以需要直接打開商品頁面：那天小火車是否行駛、指定席是否已售罄，以及保津川遊船因水位過高停航時的取消規定。上方的遊船票價是龜岡市公布的金額（成人 ¥6,000、4 歲至小學生 ¥4,500，約兩小時），於 {BOAT_CHECKED}查核；但這些數字無法告訴您 11 月 18 日的空位。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              小火車＋遊船導覽行程 →
            </KlookLink>
            <KlookLink href={BOAT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              保津川遊船船票 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygHozugawaKudari} />
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>購票步驟</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火車怎麼購票？</h2>
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
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="嵯峨野小火車常見問題" />

        <section className={styles.faqSection} style={{ paddingTop: 0 }}>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>更多問題</h3>
          <div className={styles.faqList}>
            {moreFaqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{faqItems.length + i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <KlookTourPicks
          heading="包含小火車的導覽行程"
          intro="這四個行程都會替您保留小火車座位，免去 1 個月前開賣帶來的麻煩。前兩個把小火車與保津川遊船排在一起，第三個加上清水寺，第四個可加選小火車，日期接近冬季停駛期間時請看這一項。請打開商品頁面查看您日期的空位與目前價格。"
          tours={guidedPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/arashiyama-bamboo-forest-tour", title: "嵐山竹林導覽（2026）：最佳時段、行程與從京都出發的路線（英文）" },
            { href: "/guides/attractions/things-to-do-kyoto", title: "京都必做清單（2026）：寺院、時段與要預訂的項目（英文）" },
            { href: "/guides/attractions/kyoto-kimono-rental", title: "京都和服租借（2026）：哪一區、包含什麼、何時歸還（英文）" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "大阪出發京都奈良一日遊（2026）：該訂哪一種行程（英文）" },
            { href: "/guides/attractions/arima-onsen-day-trip", title: "有馬溫泉一日遊（2026）：從大阪或神戶出發與泡湯費用（英文）" },
            { href: "/guides/transport/kyoto-transportation", title: "京都交通指南（2026）：公車、電車與計程車（英文）" },
            { href: "/guides/attractions/kansai-area-pass", title: "關西廣域鐵路周遊券（2026）：價格、適用範圍與是否划算（英文）" },
            { href: "/guides/attractions/nara-day-trip", title: "奈良一日遊（2026）：從大阪或京都出發與東大寺門票（英文）" },
            { href: "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary", title: "東京京都大阪 7 天行程（2026）：逐日安排（英文）" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票攻略 →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>搭小火車上行，坐遊船順流而下</h2>
            <p className={styles.ctaBannerDesc}>
              小火車單程加上反方向的保津川遊船，是這一天唯一能回到出發地的安排。指定席 1 個月前開賣，冬季停駛，所以請先確認日期，再安排當天的其他行程。
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看小火車＋遊船行程 →
              </KlookLink>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                查看小火車車票 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
