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
const TITLE = "嵯峨野小火車 2026：購票時間、座位與行駛日期";
const H1 = "嵯峨野小火車（嵐山小火車）2026：購票時間、座位與行駛日期";
const DESC =
  "嵯峨野小火車於乘車日 1 個月前的日本時間 00:00 開放線上購票，單程 ¥880。整理 2026 年 11、12 月行駛日期、冬季停駛與 2027 年新列車。";

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
    label: "嵯峨野小火車、保津川遊船與嵐山漫步導覽",
    ctaLabel: "查看小火車與遊船行程 →",
    url: TOUR_URL,
    why: "一次預訂小火車車票及順流返回嵐山的保津川遊船，適合不想透過兩個管道分別購票的旅客。",
  },
  {
    kind: "步行導覽",
    label: "嵐山竹林清晨步行導覽",
    ctaLabel: "查看清晨步行導覽 →",
    url: WALK_URL,
    why: "從嵯峨嵐山站出發，沿較安靜的小徑步行 2.5 小時的小團導覽，最後以抹茶茶道體驗結束，適合與小火車安排在同一天。",
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
    method: "適合大多數旅客：營運公司官網",
    opens: "乘車日 1 個月前（前一個月的同一天）日本時間 00:00。自 2027 年 3 月 1 日起，車票改為乘車日 30 天前開賣",
    cost: `只需付車資：成人 ${ADULT}、兒童 ${CHILD}。前一天 23:59 前免費取消，座位最多可免費變更 3 次。每次最多 8 張，須使用支援 3D 安全驗證（3-D Secure）的信用卡或簽帳金融卡`,
  },
  {
    method: "Klook（小火車車票）",
    opens: "可購票的日期顯示在商品頁面",
    cost: "價格與取消規定在商品頁面上，付款前請先確認",
  },
  {
    method: "小火車車站售票櫃檯（嵯峨、嵐山、龜岡）",
    opens: "僅販售當日票，售完為止：小火車嵯峨站約 08:35、小火車嵐山站 08:50、小火車龜岡站 09:10 開始",
    cost: "只需付車資。可用現金、信用卡或 IC 卡（PiTaPa 除外）。對號座車票售罄後，限量販售站票。小火車保津峽站不售票",
  },
  {
    method: "JR 售票處",
    opens: "不販售",
    cost: "營運公司的常見問題只列出官網與小火車車站售票櫃檯。不適用 JR Pass 與青春 18 車票",
  },
  {
    method: "15 人以上團體",
    opens: "透過旅行社，乘車日 1 年前至 1 個月前",
    cost: "成人 ¥800、兒童 ¥400。團體旅客無法搭乘 5 號車廂，當天購票沒有團體折扣",
  },
];

const calendarRows = [
  { dates: "2026 年 11 月 1 日～12 月 29 日", runs: "除 12 月 16 日（三）外每天行駛", trains: "小火車嵯峨站出發的例行班次 09:02～16:02", sale: "12 月 16 日以前的乘車日已開賣；12 月 17～29 日於 11 月 17～29 日日本時間 00:00 開賣" },
  { dates: "11 月 1～13 日", runs: "行駛", trains: "定期班次＋加開第 81／82 班（嵯峨 17:10 發車）", sale: "已開賣" },
  { dates: "11 月 14～30 日", runs: "行駛", trains: "定期班次＋81/82＋91/92（嵯峨 18:26 發車）", sale: "已開賣" },
  { dates: "12 月 1～4 日", runs: "行駛", trains: "定期班次＋81/82", sale: "已開賣" },
  { dates: "12 月 5～6 日（六～日）", runs: "行駛", trains: "定期班次＋81/82＋91/92", sale: "已開賣" },
  { dates: "12 月 7～13 日", runs: "行駛", trains: "定期班次＋81/82", sale: "已開賣" },
  { dates: "12 月 14～15 日", runs: "行駛", trains: "只有定期班次", sale: "已開賣" },
  { dates: "12 月 16 日（三）", runs: "停駛", trains: "無班次", sale: "—" },
  { dates: "12 月 17～25 日", runs: "行駛", trains: "只有定期班次", sale: "11 月 17～25 日日本時間 00:00" },
  { dates: "12 月 26～27 日（六～日）", runs: "行駛", trains: "定期班次＋81/82", sale: "11 月 26～27 日日本時間 00:00" },
  { dates: "12 月 28～29 日", runs: "行駛；12 月 29 日是現有車廂的最後一天", trains: "只有定期班次", sale: "11 月 28～29 日日本時間 00:00" },
  { dates: "2026 年 12 月 30 日～2027 年 2 月 28 日", runs: "冬季停駛", trains: "無班次", sale: "—" },
];

const directionRows = [
  {
    dir: "適合大多數旅客：小火車嵯峨 → 小火車龜岡（下行）",
    times: "小火車嵯峨站 09:02～16:02 每小時發車。下方日曆所列日期另有 17:10 與 18:26 加開班次",
    seats: "C、D 為順向座位；A、D 為靠窗座位",
    fit: "抵達龜岡後，可接著搭乘保津川遊船順流返回嵐山。購票時請選擇嵯峨／嵐山 → 龜岡方向。持嵯峨站出發的車票，也可在小火車嵐山站上車",
  },
  {
    dir: "小火車龜岡 → 小火車嵯峨（上行）",
    times: "小火車龜岡站 09:30～16:30 每小時發車。同樣日期另有 17:43 與 18:59 加開班次",
    seats: "A、B 為順向座位；A、D 為靠窗座位",
    fit: "終點位於嵐山，下車後即可前往竹林。前往龜岡可搭 JR 到馬堀站，再步行約 10 分鐘。根據營運公司資訊，自 16:30 發車的班次起可欣賞沿途夜間點燈。可在小火車嵐山站下車，但不能再上車",
  },
];

const fareRows = [
  { ticket: "成人單程", price: ADULT, note: "小火車嵯峨到小火車龜岡全程，或沿線任何較短的區間，票價皆相同，不依距離計價。" },
  { ticket: "兒童單程（6～11 歲）", price: CHILD, note: "為成人票價的半價。營運公司定義的兒童為 6 歲以上、未滿 12 歲。" },
  { ticket: "15 人以上團體（成人）", price: "¥800", note: "兒童 ¥400。營運公司說明當天購票沒有團體折扣。" },
  { ticket: "學生團體（成人）", price: "¥710", note: "兒童 ¥360，依營運公司的學校與學生團體票價表。" },
  { ticket: "寵物（須裝入寵物提籠）", price: "¥260", note: "隨身行李費。提籠長度須在 70 公分以內、長、寬、高合計約 90 公分以內、重量 10 公斤以內。" },
];

const changeRows = [
  { item: "成人單程（有座位）", now: `${ADULT}，含座位`, next: `${ADULT_2027}：車資 ${ADULT}＋座位費 ${SEAT_FEE_ADULT}` },
  { item: "兒童單程（有座位）", now: `${CHILD}，含座位`, next: `${CHILD_2027}：車資 ${CHILD}＋座位費 ${SEAT_FEE_CHILD}` },
  { item: "不使用座位的搭乘方式", now: "對號座車票售罄後，當天限量販售的站票", next: `只需支付車資，即可在各車廂的觀景平台區乘車：成人 ${ADULT}、兒童 ${CHILD}` },
  { item: "包廂", now: "無", next: "4 號車廂的 Premium Cabin Rankyo 包廂：每間 ¥9,000，最多 6 人，每位乘客另付車資。從小火車嵯峨站或小火車龜岡站上車" },
  { item: "線上開賣時間", now: "乘車日 1 個月前日本時間 00:00", next: "乘車日 30 天前日本時間 00:00。僅 2027 年 3 月 1 日的乘車日於 2027 年 2 月 1 日 10:00 左右開賣" },
  { item: "列車", now: "現有車廂，包含開放式的 5 號車廂「The Rich」。2026 年 12 月 29 日退役", next: "全新五節編組列車：一節機車頭加四節客車，側邊車窗玻璃延伸至腳邊，並採用挑高的玻璃車頂" },
  { item: "新舊列車首末行駛日", now: "現有列車最後行駛日：2026 年 12 月 29 日", next: "新列車首班：2027 年 3 月 1 日嵯峨野 3 號，10:02 從小火車嵯峨站發車" },
  { item: "冬季停駛", now: "2026 年 12 月 30 日～2027 年 2 月 28 日", next: "2027 年 12 月 30、31 日停駛。2028 年 1、2 月尚未公布" },
];

const seasonRows = [
  { period: "現在～2026 年 12 月 29 日", status: "行駛", note: "小火車嵯峨站的定期班次 09:02～16:02 發車，小火車龜岡站的末班回程 16:30 發車。12 月 29 日（二）是現有車廂的最後一天。" },
  { period: "2026 年 12 月 16 日", status: "停駛", note: "營運公司 2026 年日曆上，本季營運結束前唯一剩餘的停駛日。營運公司表示停駛日可能增加或變更。" },
  { period: "2026 年 10 月 24 日～12 月 29 日", status: "夜間點燈", note: "沿線自 16:30 起點燈，持續至末班車，營運公司表示從小火車龜岡站 16:30 發車的嵯峨野 16 號起就能看到。加開 81/82（小火車嵯峨站 17:10 發車）行駛於 10 月 24 日～12 月 13 日與 12 月 26～27 日；加開 91/92（18:26）行駛於 11 月 14～30 日與 12 月 5～6 日。" },
  { period: "2026 年 12 月 30 日～2027 年 2 月 28 日", status: "停駛", note: "冬季停駛。營運公司 2026 年日曆將 12 月 30、31 日標為冬季停駛日，2027 年的時刻表從 3 月 1 日開始。" },
  { period: "2027 年 3 月 1 日起", status: "新列車", note: "新列車從 10:02 的嵯峨野 3 號開始行駛，當天沒有 09:02 班次。定期時刻表不變，小火車嵯峨站 09:02～16:02 發車。根據 2027 年營運日曆，列車在旺季以外的大多數週三停駛，例如 3 月 10 日與 4 月 14 日，請確認預計搭乘的日期。" },
];

const carRows = [
  { car: "1～4 號車：一般車廂（至 2026 年 12 月 29 日）", what: "設有可開啟車窗的有頂車廂，四人一組的對坐式座位、木製長椅與燈泡照明。由鐵路貨運車廂改裝而成，行駛聲音也相當大。", pick: "一般首選；預報有雨時，選這種車廂最合理。購票時可依車廂編號及 A～D 座位代號選擇座位。" },
  { car: "5 號車：The Rich（至 2026 年 12 月 29 日）", what: "車窗採無玻璃的開放式設計，有玻璃車頂，車廂位置最靠近機車頭。營運公司表示下雨時車廂內可能被雨淋濕，車內禁止撐傘，也不因下雨退費。", pick: "想欣賞峽谷就訂這節車廂，但遇到大雨可能會後悔。請帶雨衣。購票時必須自行選擇「No. 5」，系統不會自動安排至該車廂。" },
  { car: "1～4 號車：新列車（2027 年 3 月 1 日起）", what: "側邊車窗玻璃延伸至腳邊、挑高玻璃車頂、木質座椅與地板，每節車廂的車門旁設有具頂棚的半戶外觀景平台。4 號車另有 Rankyo 包廂，設有榻榻米風格的長椅，可看前方景色。", pick: `成人票價（含座位）${ADULT_2027}。觀景平台區 ${ADULT}，包廂每間 ¥9,000 另加車資。新聞稿沒有附上新車廂的座位圖。` },
];

const combinationRows = [
  { option: "只搭小火車單程", cost: `成人 ${ADULT}、兒童 ${CHILD}；2027 年 3 月 1 日起含座位為 ${ADULT_2027} 與 ${CHILD_2027}`, time: "搭車約 25 分鐘", pick: "嵐山只是京都一日行程中的一站時適用。從嵯峨搭到龜岡，步行 10 分鐘到 JR 馬堀站，再搭 JR 嵯峨野線回來，回程付一般車資即可。" },
  { option: "小火車單程＋保津川遊船回程", cost: `成人 ${ADULT}＋¥6,000；兒童 ${CHILD}＋¥4,500（小火車車資為 2026 年 12 月 29 日前的價格）`, time: "約半天：小火車車程 25 分鐘，遊船順流而下約 2 小時", pick: "最經典的組合，也是多數人搭這班小火車的原因。遊船終點在嵐山，不必搭回程列車，上午行程結束時即可回到出發地。" },
  { option: "同時包含小火車與遊船的導覽行程", cost: "請在商品頁面確認預計搭乘日期的價格", time: "依行程內容約半天至一整天", pick: "日期適逢秋季、或遊船的航行期間難以配合，或不想分別預訂兩項相隔一小時的行程時適用。導覽行程也會安排小火車龜岡站至遊船搭船地點的交通，兩地無法步行往來。" },
];

const steps = [
  { title: "先透過營運日曆確認搭乘日期", desc: `若當天列車停駛，其他準備就沒有意義。本線行駛至 2026 年 12 月 29 日，12 月 30 日至 2027 年 2 月 28 日停駛，2027 年 3 月 1 日恢復行駛。營運公司每季也設有固定停駛日，標示在年度日曆上。${CHECKED}查核。` },
  { title: "日本時間 00:00 開賣時立刻上網購票", desc: "2026 年的車票於乘車日 1 個月前的 00:00 開賣。2027 年 3 月 1 日起的乘車日改為 30 天前的 00:00 開賣，唯有 3 月 1 日的車票例外，於 2027 年 2 月 1 日 10:00 左右開賣。車站不販售預售票。秋季賞楓期間，熱門日期會最先售罄。" },
  { title: "除了日期，也要選車廂與座位", desc: "購票頁面會要求選擇車廂號碼，以及四人一組對坐式座位中的 A～D 座位代號。營運公司的常見問題說明 A、D 是靠窗座位，往龜岡的班次 C、D 為順向座位，往嵯峨的班次則是 A、B。若要搭乘開放式的 5 號車廂「The Rich」，購票時須自行選擇「No. 5」。此車廂行駛至 2026 年 12 月 29 日。營運公司沒有公布 1～4 號車哪一側靠河、哪一側靠山，如果您搭乘是為了欣賞風景，選擇開放式車廂比挑選座位代號更可靠。" },
  { title: "當天出示 QR 碼", desc: "營運公司的常見問題說明，QR 碼只會在乘車當天顯示於智慧型手機或平板，僅出示紙本列印憑證無法上車。前一天 23:59 前可免費取消，在那之前也能在同一班次內最多變更三次座位。當天不能退票或變更。" },
  { title: "若預售票售罄，可於乘車當天到車站購票", desc: "除小火車保津峽站外，各站售票櫃檯皆販售當日票，依現場排隊順序售完為止。營運公司公布的售票開始時間為小火車嵯峨站約 08:35、小火車嵐山站 08:50、小火車龜岡站 09:10，對號座車票售罄後，限量販售站票。" },
  { title: "另外預訂保津川遊船，並留意搭乘方向", desc: `保津川遊船（保津川下り）從龜岡順流而下到嵐山，方向與小火車相反，因此兩段行程可以順利銜接。龜岡市公布的票價為成人 ¥6,000、4 歲至小學生 ¥4,500，約 2 小時；主要營運期間為 3 月 10 日～11 月 30 日，12 月中旬～3 月 9 日使用設有暖氣的遊船，12 月 29 日～1 月 4 日停航，天候不佳或水位過高時停航。${BOAT_CHECKED}查核。` },
];

const faqItems: FaqItem[] = [
  {
    q: "嵯峨野小火車車票什麼時候開賣？",
    a: `車票於乘車日 1 個月前的日本時間 00:00 在營運公司官網開賣。每個乘車日的車票在前一個月的同一天開賣，所以 2026 年 12 月 29 日的車票於 11 月 29 日 00:00 開賣。根據營運公司資訊，賞楓期約為 11 月中旬至 12 月上旬，若要在這段期間搭乘，請於開賣當下購票：所有座位皆為對號座，營運公司也未公布各乘車日的車票多快售罄。自 2027 年 3 月 1 日起，車票改為乘車日 30 天前開賣，3 月 1 日當天的車票於 2027 年 2 月 1 日 10:00 左右開賣。前一天 23:59 前可免費取消。${CHECKED}查核。`,
  },
  {
    q: "嵯峨野小火車可以當天買票嗎？",
    a: `可以，小火車嵯峨站、小火車嵐山站與小火車龜岡站的售票櫃檯販售當日票，依現場排隊順序販售，售完為止，小火車保津峽站不販售。營運公司公布的售票開始時間分別約為 08:35、08:50 與 09:10，旺季時三站都在 08:35 左右開始；對號座車票售罄後，每節車廂會限量販售站票，站票也售罄時該班列車即客滿。售票櫃檯可使用現金、信用卡，以及 PiTaPa 以外的 IC 卡。${CHECKED}查核。`,
  },
  {
    q: "嵯峨野小火車搭哪個方向比較好？",
    a: `大多數旅客的行程都適合小火車嵯峨 → 小火車龜岡，因為保津川遊船是反方向從龜岡順流而下到嵐山，兩者可以連成一圈。如果想在竹林結束行程，或想欣賞夜間點燈，請改搭龜岡 → 嵯峨；根據營運公司資訊，自龜岡 16:30 發車的班次起可欣賞沿途夜間點燈。兩個方向的單程票價皆為 ${ADULT}。營運公司的常見問題說明，往龜岡的班次 C、D 為順向座位，往嵯峨的班次則是 A、B。${CHECKED}查核。`,
  },
  {
    q: "2026～27 年冬天嵯峨野小火車有行駛嗎？",
    a: `只行駛到 2026 年 12 月 29 日。11 月 1 日至 12 月 29 日除 12 月 16 日（三）外每天行駛，之後於 2026 年 12 月 30 日至 2027 年 2 月 28 日停駛，並自 2027 年 3 月 1 日起改用新列車恢復營運。營運公司 2026 年日曆將 12 月 30、31 日標為冬季停駛，2027 年的時刻表從 3 月 1 日開始。${CHECKED}查核。`,
  },
  {
    q: "2027 年嵯峨野小火車新列車有什麼改變？",
    a: `2027 年 3 月 1 日起，全新五節編組列車取代現有車廂，現有車廂於 2026 年 12 月 29 日退役。車資維持 ${ADULT}，另加座位費 ${SEAT_FEE_ADULT}（兒童 ${SEAT_FEE_CHILD}），因此成人含座位的票價為 ${ADULT_2027}；在各車廂有頂棚的觀景平台區乘車，只需支付車資；4 號車廂的 Premium Cabin Rankyo 包廂每間 ¥9,000，最多 6 人，另加車資。線上開賣改為乘車日 30 天前。首班為 3 月 1 日 10:02 的嵯峨野 3 號。${CHECKED}查核。`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "嵯峨野小火車票價多少？",
    a: `2026 年 12 月 29 日以前，單程成人 ${ADULT}、6～11 歲兒童 ${CHILD}，適用小火車嵯峨站至小火車龜岡站之間 7.3 公里的全線，不依距離計價。依營運公司的票價表，15 人以上團體為 ¥800 與 ¥400，學生團體為 ¥710 與 ¥360；當天購票沒有團體折扣。攜帶裝入提籠的寵物，須支付 ¥260 隨身行李費。${CHECKED}查核。`,
  },
  {
    q: "嵯峨野小火車車程多久？會到哪裡？",
    a: "從小火車嵯峨站經小火車嵐山站、小火車保津峽站到小火車龜岡站，沿保津川峽谷行駛 7.3 公里，約 25 分鐘。從小火車嵯峨站出發的列車約每小時一班，09:02 至 16:02 發車，旺季另有加開班次。這是單程行程，而不是環狀路線，購票前就要先決定怎麼回來。",
  },
  {
    q: "嵯峨野小火車哪些日子不行駛？",
    a: `除了冬季停駛期間，營運公司每季也設有固定停駛日。2026 年本季結束前剩下的停駛日只有 12 月 16 日。2027 年日曆上，大多數停駛日是旺季以外的週三，例如 3 月 10 日與 4 月 14 日，11 月則每日行駛。營運公司表示停駛日可能變更，請在日曆上確認預計搭乘的日期。${CHECKED}查核。`,
  },
  {
    q: "最後一天可以搭乘「The Rich」是哪一天？",
    a: `若營運日期未變更，為 2026 年 12 月 29 日（二）。營運公司表示，包含開放式 5 號車廂在內的現有車廂預定在當天行駛後退役，新列車的新聞稿則介紹了側邊大面玻璃的車廂與有頂棚的觀景平台。團體購票不能使用 5 號車廂，最後幾個行駛日的車票同樣於 1 個月前開賣，所以 12 月 29 日的車票於 11 月 29 日日本時間 00:00 開賣。${CHECKED}查核。`,
  },
  {
    q: "想看河景要坐哪一側？",
    a: "現有列車方面，營運公司公布了座位圖：1～4 號車廂有車窗，座位為四人一組的對坐式，座位代號為 A～D；常見問題說明 A、D 是靠窗座位，往龜岡的班次 C、D 為順向座位，往嵯峨的班次則是 A、B。但營運公司沒有公布哪一側面向保津川，所以任何斷言左側或右側較能看到河景的說法，都是他人的推測，而不是鐵路公司的資訊。營運公司資料中能確認的答案，是開放式的 5 號車廂「The Rich」：車窗沒有玻璃、有玻璃車頂，兩側峽谷景色都看得到。購票時必須自行選擇。",
  },
  {
    q: "開放式的 5 號車廂「The Rich」值得搭乘嗎？",
    a: "在 2026 年 12 月 29 日以前，這節車廂正是不搭行經同一溪谷的 JR 一般列車、而選擇這條線的理由，也是唯一一節不論坐在哪個座位，都能看到相同景色的車廂。營運公司也已說明其缺點：車窗沒有玻璃，下雨時車廂內可能被雨淋濕；車內不能撐傘；營運公司也說明不因下雨退費。請帶雨衣，並在前一天查看天氣預報。若天氣預報不佳，選 1～4 號車的座位比較合適。",
  },
  {
    q: "怎麼前往小火車嵯峨站與小火車龜岡站？",
    a: "小火車嵯峨站就在 JR 嵯峨野線嵯峨嵐山站旁，步行約五分鐘；從京福嵐山本線的嵐電嵯峨站也約五分鐘，從阪急嵐山站步行約二十分鐘。另一端的小火車龜岡站，從 JR 山陰（嵯峨野）線馬堀站步行約十分鐘，所以「搭小火車前往龜岡、再搭 JR 回來」的行程很容易安排。",
  },
  {
    q: "要不要加上保津川遊船？",
    a: `保津川遊船是這一天理想的回程安排，因為方向相反：從龜岡順流而下到嵐山，因此搭完遊船就能回到出發地。龜岡市公布的票價為成人 ¥6,000、4 歲至小學生 ¥4,500，遊船航程約兩小時；主要營運期間為 3 月 10 日～11 月 30 日，12 月中旬至 3 月 9 日使用有頂棚及暖氣的遊船。12 月 29 日至 1 月 4 日停航，天候不佳或水位過高時也會停航；若要預訂不可退費的全天行程，最好事先了解這一點。${BOAT_CHECKED}查核。`,
  },
  {
    q: "帶小孩搭嵯峨野小火車值得嗎？",
    a: `值得，票價也很親民：2026 年 12 月 29 日以前兒童 ${CHILD}、成人 ${ADULT}（2027 年 3 月 1 日起含座位為 ${CHILD_2027} 與 ${ADULT_2027}），車程 25 分鐘，在孩子失去耐心之前就能抵達。營運公司資料中有兩個實用重點：嬰兒推車上車前須折疊收妥，列車上設有兩個輪椅空間。導盲犬與輔助犬可以搭乘，攜帶其他寵物時須使用提籠並支付 ¥260。5 號車廂是孩子最想坐的車廂，也是車窗沒有玻璃的開放式車廂，請以天氣而不是孩子們的投票來決定。`,
  },
];

const winterPicks = [
  withKlookLocale(saganoHozugawaGuaranteedTour, LOCALE, {
    title: "嵯峨野小火車、保津川遊船與嵐山漫步導覽",
    desc: "適用 2026 年 12 月 29 日以前或 2027 年 3 月 1 日以後的日期：小火車單程、順流回到嵐山的遊船，以及竹林自由活動時間",
  }),
  withKlookLocale(arashiyamaEarlyMorningWalk, LOCALE, {
    title: "嵐山竹林清晨步行導覽",
    desc: "從嵯峨嵐山站出發，沿主要路線以外較安靜的小徑步行 2.5 小時的小團導覽，最後以抹茶茶道體驗結束",
  }),
  { title: "嵐山飯店", desc: "入住竹林附近，就能在人潮湧入前抵達竹林", url: ARASHIYAMA_HOTELS_URL },
  { title: "京都站周邊飯店", desc: "前往嵯峨嵐山的 JR 嵯峨野線從這裡出發，搭乘快速列車約 11 分鐘", url: KYOTO_STATION_HOTELS_URL },
  { title: "Klook 日本 eSIM", desc: "以 QR Code 憑證提供的日本 eSIM，用手機查地圖與預訂頁面", url: ESIM_URL },
  withKlookLocale(saganoRomanticTrainTicket, LOCALE, {
    title: "嵯峨野小火車車票",
    desc: "若您計畫在停駛期間前後搭乘，可在此預訂小火車單程座位",
  }),
];

const guidedPicks = [
  withKlookLocale(saganoHozugawaGuaranteedTour, LOCALE, {
    title: "嵯峨野小火車、保津川遊船與嵐山漫步導覽",
    desc: "保證成團的經典組合：小火車單程、順流回到嵐山的保津川遊船，以及竹林自由活動時間",
  }),
  withKlookLocale(arashiyamaHozukyoHalfDayTour, LOCALE, {
    title: "嵐山與保津峽半日遊",
    desc: "一次預訂嵯峨野小火車、保津川遊船及嵐山景點的半日遊",
  }),
  withKlookLocale(saganoArashiyamaKiyomizuTour, LOCALE, {
    title: "嵯峨野小火車、嵐山與清水寺半日遊",
    desc: "結合小火車、嵐山與清水寺的巴士半日導覽行程",
  }),
  withKlookLocale(arashiyamaSaganoOptionalTour, LOCALE, {
    title: "嵐山一日遊（可加購嵯峨野小火車）",
    desc: "行程包含竹林與嵐山景點，小火車為可加購項目；若出發日期接近冬季停駛期間，請參考這一項",
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
            沿保津川峽谷行駛的京都觀光小火車。車票於乘車日 1 個月前開賣，現有車廂於 12 月 29 日退役，之後停駛到 3 月，2027 年 3 月 1 日起改用新列車營運。
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
            <strong>嵯峨野小火車（嵯峨野觀光小火車／Sagano Romantic Train）的購票時間如下：</strong>營運公司嵯峨野觀光鐵道的官網在<strong>乘車日 1 個月前的日本時間 00:00</strong> 開賣，所以現有列車最後行駛日（2026 年 12 月 29 日）的車票，於 11 月 29 日 00:00 開賣。根據營運公司資訊，賞楓期約為<strong>11 月中旬至 12 月上旬</strong>，若要在這段期間搭乘，請於開賣當天 00:00 購票：營運公司並未公布車票多快售罄，網路預售票售罄後，只能到車站售票櫃檯購買當日票或限量站票。票價為單程成人 <strong>{ADULT}</strong>、兒童 <strong>{CHILD}</strong>，<strong>2026 年 12 月 30 日至 2027 年 2 月 28 日停駛</strong>；<strong>2027 年 3 月 1 日</strong>起改用新列車營運，另收 {SEAT_FEE_ADULT} 座位費，含座位的票價為 <strong>{ADULT_2027}</strong>，並改為 <strong>30 天前</strong>開賣。以上官方資料於 {CHECKED}確認。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>預訂這趟行程</span>
          <h2 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>
            預訂小火車座位與當天其他行程
          </h2>
          <p className={styles.bodyText}>
            嵐山一日遊的各項行程中，只有小火車車票有明確的開賣時間。回程遊船、步行導覽與行動數據方案都可以一併預訂。請打開商品頁面，查看預計搭乘日期的剩餘座位與目前價格。
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              在 Klook 查看嵯峨野小火車日期與價格 →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
            在商品頁面選擇乘車日，就能看到價格與剩餘座位。現有列車的最後一天是 2026 年 12 月 29 日，2026 年 12 月 30 日至 2027 年 2 月 28 日不行駛。
          </p>
        </section>

        <KlookSameDayCards heading="在嵐山同日可一併預訂的行程" cards={SAME_DAY} />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>重點整理</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人票價（至 2026 年 12 月 29 日）</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>成人票價（含座位，2027 年 3 月 1 日起）</p>
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
              全程 <strong>7.3 公里</strong>，往返於嵐山的<strong>小火車嵯峨站</strong>（トロッコ嵯峨）與<strong>小火車龜岡站</strong>（トロッコ亀岡）之間，沿保津川峽谷行駛；從小火車嵯峨站出發的列車約每小時一班，<strong>09:02～16:02</strong> 發車。兒童票適用 6～11 歲。除小火車保津峽站外，各站皆販售當日票，依現場排隊順序售完為止。這班列車<strong>不能使用 JR Pass</strong>。Klook 販售車票，以及包含小火車的導覽行程。票價與日期來自營運公司官網，於 {CHECKED}查核。
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
          <h2 className={styles.sectionTitle}>嵯峨野小火車車票什麼時候開賣？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            車票於乘車日前一個月的同一天（日本時間 00:00）在營運公司官網開賣。自 2027 年 3 月 1 日起，車票改為乘車日 30 天前開賣，所以 2027 年 4 月 1 日的車票於 3 月 2 日 00:00 開賣；唯一例外是 2027 年 3 月 1 日，於 2027 年 2 月 1 日 10:00 左右開賣。
          </p>
          <Table head={["購票管道", "開賣時間", "票價與變更規定"]} rows={bookingRows.map((r) => [r.method, r.opens, r.cost])} boldFirst />
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
          <span className={styles.sectionLabel}>行駛日期</span>
          <h2 className={styles.sectionTitle}>2026 年 11 月與 12 月嵯峨野小火車有行駛嗎？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            有，2026 年 11 月 1 日至 12 月 29 日除 12 月 16 日（三）外每天行駛。秋季大部分行駛日皆有傍晚加開班次，12 月 30 日起進入冬季停駛。
          </p>
          <Table head={["日期", "行駛狀況", "班次", "開賣時間"]} rows={calendarRows.map((r) => [r.dates, r.runs, r.trains, r.sale])} />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{LAST_CHECKED}。資料來源：營運公司的<Src href={LIGHTUP_URL}>2026 年 9 月 18 日夜間點燈活動新聞稿</Src>與<Src href={CALENDAR_URL}>營運日曆</Src>。加開班次：81 於 17:10 從小火車嵯峨站發車、82 於 17:43 從小火車龜岡站發車；91 於 18:26 從嵯峨發車、92 於 18:59 從龜岡發車。營運公司表示停駛日與加開班次可能增加或變更，若已購票的班次停駛，票款將自動刷退至原付款信用卡。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>方向</span>
          <h2 className={styles.sectionTitle}>從嵯峨搭到龜岡，還是從龜岡搭到嵯峨比較好？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            大多數旅客的行程都適合從嵯峨搭到龜岡，因為回程可以搭乘保津川遊船返回嵐山。兩個方向的單程票價皆為 {ADULT}，不同的是發車時間、哪些是順向座位，以及終點在哪裡。
          </p>
          <Table head={["方向", "發車時間", "順向座位", "選擇理由"]} rows={directionRows.map((r) => [r.dir, r.times, r.seats, r.fit])} boldFirst />
          <p className={styles.bodyText} style={noteStyle}>
            最後查核：{LAST_CHECKED}。資料來源：營運公司的<Src href={FAQ_URL}>常見問題</Src>（座位與跨站乘車）與<Src href={CALENDAR_URL}>時刻表</Src>。營運公司未公布不同方向的擁擠程度，也沒有公布哪一側面向河流；2026 年 12 月 29 日以前，開放式的 5 號車廂可欣賞列車兩側景色。
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
            這是一條沿舊山陰本線行駛、全長 7.3 公里的觀光鐵道，從嵯峨嵐山站旁的<strong>小火車嵯峨站</strong>出發，經過<strong>小火車嵐山站</strong>與<strong>小火車保津峽站</strong>，抵達<strong>小火車龜岡站</strong>。車廂由鐵路貨運車廂改裝而成，車內設有木製長椅、燈泡照明與可開啟的車窗，行駛時聲音也很大。5 號車廂「The Rich」的車窗採無玻璃的開放式設計，並有玻璃車頂。這款列車將於 2026 年 12 月 29 日退役。
          </p>
          <p className={styles.bodyText}>
            搭乘這班小火車需要先安排購票，原因有兩個。第一，所有座位皆為對號座，網路在 1 個月前開賣，因此秋季的搭乘日期在出發前一個月就得確定。第二，這是一條<em>非環狀</em>、需另行安排回程的路線，且有季節性停駛。如何安排回程、預計搭乘當天是否行駛，比選擇座位更重要。
            <Link href="/guides/attractions/kyoto-2-day-itinerary" style={linkStyle}>
              京都兩天行程（英文）
            </Link>
            與
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>
              京都三天行程（英文）
            </Link>
            說明如何將這段小火車行程安排進京都之旅。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火車票價多少？</h2>
          <Table head={["票種", "票價", "說明"]} rows={fareRows.map((r) => [r.ticket, r.price, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            票價於 {CHECKED}對照營運公司的票價頁面與 2026 年 10 月 23 日新聞稿查核，為 2026 年 12 月 29 日以前的票價。請注意表中<em>沒有</em>的項目：開放式的 5 號車廂沒有加價，同樣是 {ADULT}，因此每個乘車日一開賣，5 號車廂就最先售罄。小火車行程常會搭配的京都景點門票，請看
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
            自 2027 年 3 月 1 日起將啟用新列車，並新增座位費。車資維持 {ADULT} 與 {CHILD}，因此成人含座位的票價為 {ADULT_2027}（原 {ADULT}）。線上開賣也改為乘車日 30 天前。
          </p>
          <Table head={["變更項目", "2026 年（至 12 月 29 日）", "2027 年（3 月 1 日起）"]} rows={changeRows.map((r) => [r.item, r.now, r.next])} />
          <p className={styles.bodyText} style={noteStyle}>
            於 {CHECKED}對照營運公司的<Src href={RELEASE_URL}>2026 年 10 月 23 日新聞稿</Src>與 2026 年日曆查核。新聞稿未說明觀景平台區的票券將如何販售、站票是否繼續販售，以及 2027 年 3 月以後的團體票價。營運公司的新列車頁面預告之後還會發布消息，安排相關行程前，請先確認官網最新資訊。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>行駛期間</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火車什麼時候行駛、什麼時候停駛？</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            行駛日期是最容易打亂行程的因素。這條路線冬季停駛兩個月，各季也另有停駛日。2026 年的夜間點燈，是選擇傍晚班次的理由。
          </p>
          <Table head={["期間", "行駛狀況", "營運公司的說明"]} rows={seasonRows.map((r) => [r.period, r.status, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            行駛期間與停駛日於 {CHECKED}查核。如果您的京都行程在 1 月或 2 月，這趟旅行就無法搭乘小火車。
            <Link href="/guides/attractions/things-to-do-kyoto" style={srcStyle}>
              京都必遊景點與體驗（英文）
            </Link>
            整理了無須預約即可造訪的其他景點。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={OPTIONAL_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              查看預計搭乘日期的剩餘座位 →
            </KlookLink>
            <GygCompareButton slug={SLUG} listing={gygArashiyama} />
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>冬季</span>
          <h2 className={styles.sectionTitle}>冬天嵯峨野小火車有行駛嗎？</h2>
          <p className={styles.bodyText}>
            行駛到 2026 年 12 月 29 日，之後<strong>2026 年 12 月 30 日至 2027 年 2 月 28 日停駛</strong>。營運公司 2026 年日曆將 12 月 30、31 日標為冬季停駛日，2027 年的營運時刻表未列出 3 月 1 日以前的班次。營運公司沒有另外公告 2027 年 1、2 月的情況，因此這段停駛期間是根據兩份營運日曆整理。{CHECKED}查核。
          </p>
          <p className={styles.bodyText}>
            冬天的嵐山依然值得一去。
            <Link href="/guides/attractions/arashiyama-bamboo-forest-tour" style={linkStyle}>
              嵐山竹林（英文）
            </Link>
            全年免費開放，清晨到竹林散步，很適合搭配
            <Link href="/guides/attractions/kyoto-kimono-rental" style={linkStyle}>
              嵐山和服租借（英文）
            </Link>
            。龜岡市也公布 12 月中旬至 3 月 9 日設有暖氣的保津川遊船，12 月 29 日至 1 月 4 日停航（{BOAT_CHECKED}查核）。想住在竹林附近，
            <Link href="/guides/attractions/where-to-stay-in-kyoto" style={linkStyle}>
              京都住宿區域指南（英文）
            </Link>
            比較了嵐山與京都站周邊。
          </p>
        </section>

        <KlookTourPicks
          heading="小火車停駛時，在嵐山可以預訂什麼？"
          intro="若您的日期可以調整，請先參考小火車與遊船的行程。Klook 說明小火車停駛時這個行程會取消並全額退款，所以只適用於現在到 2026 年 12 月 29 日，或 2027 年 3 月 1 日以後（2026 年 11 月 7 日查看商品頁面）。其他行程在冬季任何一天皆可安排。請打開商品頁面查看空位與目前價格。"
          tours={winterPicks}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>售罄</span>
          <h2 className={styles.sectionTitle}>嵯峨野小火車售罄怎麼辦？</h2>
          <p className={styles.bodyText}>
            官網車票售罄，不代表小火車行程只能取消。營運公司表示，小火車嵯峨站、小火車嵐山站與小火車龜岡站的售票櫃檯仍會販售<strong>當日票</strong>，小火車保津峽站則不販售。售票開始時間分別約為 08:35、08:50 與 09:10，旺季時三站都在 08:35 左右開始。對號座車票售罄後，每節車廂會限量販售<strong>站票</strong>，直到額滿為止。營運公司也提醒，列車客滿時可能無法上車。
          </p>
          <p className={styles.bodyText}>
            因為前一天 23:59 前可以免費取消，當天晚上再查一次官網也值得。如果不想排隊，導覽行程會把小火車與遊船一次訂好，請依預計搭乘日期查詢。即使整班列車都售罄，仍可搭乘 JR 嵯峨野線前往嵐山，不過小火車本身不能使用 JR Pass。{CHECKED}查核。
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              小火車＋遊船行程 →
            </KlookLink>
            <KlookLink href={WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              嵐山步行導覽 →
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
            這取決於您預計搭乘的日期，因為列車在 2027 年 3 月 1 日更換。
          </p>
          <Table head={["車廂", "車廂特色", "適合選擇的情況"]} rows={carRows.map((r) => [r.car, r.what, r.pick])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            關於旅客最常問的<strong>河景在哪一側</strong>，營運公司並未針對現有列車公布資訊。座位資料只說明車廂配置（四人一組的對坐式座位，座位代號 A～D）與 5 號車廂的規定。所以看到建議坐左側或右側的說法，請當作推測；如果您是為了峽谷而搭車，就選開放式車廂。同一份資料也提供無障礙乘車資訊：列車上設有兩個輪椅空間，導盲犬與輔助犬可以搭乘，嬰兒推車上車前須折疊收妥，寵物須放入約 70 公分、10 公斤以內的提籠並付 ¥260。{CHECKED}查核。
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>怎麼前往小火車嵯峨站與小火車龜岡站？</h2>
          <p className={styles.bodyText}>
            <strong>小火車嵯峨站</strong>就在 JR 嵯峨野線<strong>嵯峨嵐山站</strong>旁，步行約五分鐘。營運公司也說明，從京福嵐山本線的<strong>嵐電嵯峨站</strong>約五分鐘，從<strong>阪急嵐山站</strong>步行約二十分鐘。從京都站出發，搭乘班次密集的 JR 嵯峨野線是最直接的方式。
          </p>
          <p className={styles.bodyText}>
            另一端的<strong>小火車龜岡站</strong>，從 JR 山陰（嵯峨野）線<strong>馬堀站</strong><strong>步行約十分鐘</strong>。因此可以採用最省錢的安排：搭乘單程小火車，步行到馬堀站，再搭一般 JR 列車回來。如果您已訂了保津川遊船，也要注意這一點：保津川遊船的搭船地點位於龜岡，不在小火車龜岡站，兩地無法步行往來。
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>
              京都交通指南（英文）
            </Link>
            整理了 JR、地鐵、嵐電與公車；如果同一週要在關西各城市之間移動，
            <Link href="/guides/attractions/kansai-area-pass" style={linkStyle}>
              關西廣域鐵路周遊券（英文）
            </Link>
            可用於 JR 路段，但小火車由私營鐵路公司營運，不適用。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>比較</span>
          <h2 className={styles.sectionTitle}>只搭小火車、加上遊船，還是參加導覽行程？</h2>
          <Table head={["選項", "費用", "時間", "適合選擇的情況"]} rows={combinationRows.map((r) => [r.option, r.cost, r.time, r.pick])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            以下三項資訊須依實際出發日期確認，因此需直接查看商品頁面：那天小火車是否行駛、對號座是否已售罄，以及保津川遊船因水位過高停航時的取消規定。上方的遊船票價是龜岡市公布的金額（成人 ¥6,000、4 歲至小學生 ¥4,500，約兩小時），於 {BOAT_CHECKED}查核；但上述票價無法反映 11 月 18 日的剩餘名額。
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
          intro="這四項行程都會為您保留小火車座位，省去 1 個月前搶購車票的麻煩。前兩項行程結合了小火車與保津川遊船，第三項包含清水寺，第四項可加購小火車，若出發日期接近冬季停駛期間，請參考這一項。請打開商品頁面查看預計搭乘日期的剩餘座位與目前價格。"
          tours={guidedPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/arashiyama-bamboo-forest-tour", title: "嵐山竹林攻略（2026）：最佳造訪時段、行程與京都出發交通方式（英文）" },
            { href: "/guides/attractions/things-to-do-kyoto", title: "京都必遊景點與體驗（2026）：寺院、時段與要預訂的項目（英文）" },
            { href: "/guides/attractions/kyoto-kimono-rental", title: "京都和服租借（2026）：推薦地區、方案內容與歸還時間（英文）" },
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
            <h2 className={styles.ctaBannerTitle}>搭小火車前往龜岡，再搭遊船順流返回嵐山</h2>
            <p className={styles.ctaBannerDesc}>
              單程小火車搭配反方向的保津川遊船，是當天唯一能回到出發地的安排。對號座車票於乘車日 1 個月前開賣，列車冬季停駛，所以請先確認日期，再安排當天的其他行程。
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
