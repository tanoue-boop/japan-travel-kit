import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  bieiFuranoLavenderDayTour,
  furanoBieiBluePondDayTour,
  hokkaidoSevenDayStayAreas,
  jozankeiHotSpringBusTrip,
  jrHokkaidoRailPass,
  klookEsim,
  lakeShikotsuIceFestivalHalfDayTour,
  newChitoseAirportTransfers,
  nisekoResortShuttleBus,
  noboribetsuToyaNisekoDayTour,
  noboribetsuToyaOtaruDayTour,
  otaruCanalCruiseSealCarving,
  otaruShakotanYoichiCoachTour,
  otaruSnowParkDayTour,
  sapporoFuranoAreaPass,
  sapporoFuranoBieiLavenderBusTour,
  sapporoJozankeiBuddhaDayTour,
  sapporoSnowParkHalfDayTour,
  sapporoTvTowerMoiwaSetTicket,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import {
  asahiyamaBieiHighlightsTour,
  furanoBieiWinterIlluminationTour,
  yoichiOtaruWalkingTour,
} from "../../../../lib/klook-links-winter-hokkaido";
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
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English guide (pages/guides/attractions/hokkaido-7-day-itinerary.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/hokkaido-7-day-itinerary";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "北海道7天行程" }];

const OWN_ISO = "2026-11-01";
const OWN = dateLabel(OWN_ISO, LOCALE);

const SEASON_ISO = "2026-11-06";
const SEASON = dateLabel(SEASON_ISO, LOCALE);

const FESTIVAL_CHECKED = dateLabel("2026-10-30", LOCALE);
const JMA_CHECKED = dateLabel("2026-10-28", LOCALE);

const AIRPORT_FARE = "¥1,230";
const OTARU_FARE = "¥800";
const ASAHIKAWA_RT = "¥10,880";
const ASAHIKAWA_OW = "¥5,440";
const FURANO_RT = "¥12,560";
const FURANO_OW = "¥6,280";
const FURANO_LOCAL = "¥1,380";
const FURANO_WINTER = "¥6,820";
const TOTAL_SUMMER = "¥17,160";
const TOTAL_WINTER = "¥17,700";
const PASS_7 = "¥28,000";
const PASS_5 = "¥22,000";
const PASS_10 = "¥37,000";
const AREA_FURANO = "¥11,000";
const AREA_NOBORIBETSU = "¥10,000";
const ZOO_ADULT = "¥1,000";
const CRUISE_DAY = "¥1,800";
const SUBWAY_DAY_PASS = "¥830";
const DONICHIKA = "¥520";
const FEB_MAX = "0.4°C";
const FEB_MIN = "−6.2°C";
const FEB_SNOW = "116 公分";
const HND_FLIGHT = "1 小時 30 分鐘";

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

const baseRows = [
  {
    base: "札幌站",
    nights: "6 晚中的 4 晚",
    why: "第 1、2、3、6 晚。這條路線的每一段鐵路都從札幌站出發：新千歲來的快速 Airport、往旭川的 Lilac 和 Kamui，以及夏季的富良野薰衣草特快，到大通只要一站地鐵或走有遮蔽的路。這幾晚可以一次訂或分兩次訂，通常看價格決定。",
  },
  {
    base: "富良野",
    nights: "6 晚中的 2 晚",
    why: "第 4、5 晚。住在內陸而不是來回的原因：從札幌當天去美瑛和富良野是十小時的巴士行程，而從富良野的房間出發的兩個早晨，不論哪個季節都是這週最好的部分。",
  },
  {
    base: "小樽站（替換）",
    nights: "1 晚，取代札幌一晚",
    why: "如果想看夜晚的運河，把第 3 晚換到這裡，尤其是 2 月上旬小樽雪燈之路舉行時。回札幌 ¥800、約 33 分鐘，改住這裡，交通費幾乎不會增加。",
  },
  {
    base: "二世谷（僅滑雪版）",
    nights: "2 晚，取代富良野",
    why: "只適合真正以滑雪為主的一週。機場巴士從新千歲直達二世谷，也能放雪具，所以這個版本抵達當天完全不經過札幌。",
  },
];

const seasonRows = [
  {
    day: "第 1 天",
    winter: "飛抵，搭快速 Airport 到札幌，天黑後逛大通和薄野，12 月下午四點左右就天黑了",
    summer: "飛抵，搭快速 Airport 到札幌，在大通公園和夏季啤酒花園度過長長的傍晚",
  },
  {
    day: "第 2 天",
    winter: "札幌：2 月上旬看雪祭會場，其他時間去定山溪溫泉半日，下午待室內",
    summer: "札幌：黃昏的藻岩山、頭大佛和白色戀人公園，腳下沒有冰的時候都更好",
  },
  {
    day: "第 3 天",
    winter: "小樽，待到天黑看運河煤氣燈；2027 年 2 月 6–13 日有小樽雪燈之路",
    summer: "小樽加余市蒸餾所，或只有夏天才值得開車去的積丹半島與神威岬",
  },
  {
    day: "第 4 天",
    winter: "在企鵝散步活動期間去旭川和旭山動物園，再搭普通列車到富良野",
    summer: "夏季時段的旭川和旭山動物園，再搭普通列車經美瑛到富良野",
  },
  {
    day: "第 5 天",
    winter: "雪中的美瑛和富良野：山丘覆蓋白雪，而不是夏季的花田條紋，在富良野雪場滑雪或玩雪半天",
    summer: "富田農場和美瑛山丘，薰衣草季讓這天成為北海道最多人預訂的一天",
  },
  {
    day: "第 6 天",
    winter: "薰衣草特快是夏季列車，所以搭普通列車到旭川再轉 Lilac 或 Kamui 回札幌，然後去雪上樂園半日，或 2027 年 1 月 30 日到 2 月 23 日的支笏湖冰濤祭",
    summer: "回札幌，再往南去登別和洞爺湖的長途一日，或在市區悠閒度過最後一個下午",
  },
  {
    day: "第 7 天",
    winter: "札幌到新千歲離開，2 月班機常延誤，別搭當天第一班",
    summer: "札幌到新千歲離開，留時間逛機場，機場本身就值得一逛",
  },
];

const passRows = [
  {
    leg: "新千歲機場 → 札幌（第 1 天）",
    fare: AIRPORT_FARE,
    note: "快速 Airport，依列車種類 36 到 43 分鐘。不用預訂；uシート對號座加 ¥1,000。",
  },
  {
    leg: "札幌 ↔ 小樽來回（第 3 天）",
    fare: "¥1,600",
    note: `單程 ${OTARU_FARE}，最快約 33 分鐘。路線上最便宜的一段。`,
  },
  {
    leg: "札幌 → 旭川，特急對號座（第 4 天）",
    fare: ASAHIKAWA_OW,
    note: `JR 北海道 Lilac／Kamui 來回票 ${ASAHIKAWA_RT} 除以 2，1 小時 25 分鐘。`,
  },
  {
    leg: "旭川 → 美瑛 → 富良野，普通列車（第 4 天）",
    fare: FURANO_LOCAL,
    note: `旭川到富良野的票價出自 JR 北海道 2026 年該線公告，公告也說旭川到富良野之間不能用 IC 卡，請買票。查核日：${SEASON}。`,
  },
  {
    leg: "富良野 → 札幌，富良野薰衣草特快對號座（第 6 天，夏季）",
    fare: FURANO_OW,
    note: `JR 北海道來回票 ${FURANO_RT} 除以 2。兩小時直達，只在 JR 北海道公布的 6 到 9 月日期行駛；2027 年日期待公布。`,
  },
  {
    leg: "富良野 → 旭川 → 札幌，普通列車加 Lilac 或 Kamui（第 6 天，冬季）",
    fare: FURANO_WINTER,
    note: `${FURANO_LOCAL} 加 ${ASAHIKAWA_OW}。這是 JR 北海道在薰衣草特快不行駛時建議的路線。請預留整個上午，並查好普通列車的銜接時刻。`,
  },
  {
    leg: "札幌 → 新千歲機場（第 7 天）",
    fare: AIRPORT_FARE,
    note: "同一班快速 Airport 的反方向。",
  },
  {
    leg: "合計，夏季版",
    fare: TOTAL_SUMMER,
    note: "上列所有路段，不含冬季回程。",
  },
  {
    leg: "合計，冬季版",
    fare: TOTAL_WINTER,
    note: "上列所有路段，不含薰衣草特快。兩種都低於 ¥18,000。",
  },
];

const days: Day[] = [
  {
    n: 1,
    label: "第 1 天",
    heading: "第 1 天：飛抵，新千歲到札幌的 36 分鐘",
    intro:
      "北海道之旅從機場開始，而不是車站，第 1 天只要把這件事做好。新千歲到札幌的電車白天每小時六班，依列車種類 36 到 43 分鐘，¥1,230，所以沒有接送要安排，也沒有票要先拿。抵達前值得決定的是：是否要預訂座位，帶著行李坐著而不是站在月台，以及走出航廈時手機能不能上網。",
    stops: [
      {
        time: "抵達後",
        place: "入境、領行李、連上網路",
        allow: "45 分鐘到 1.5 小時",
        getting: "n/a",
        booking: "出發前啟用 eSIM，不用到櫃台領取",
      },
      {
        time: "一小時內",
        place: "新千歲機場站 → 搭快速 Airport 到札幌",
        allow: "36–43 分鐘",
        getting: `JR，成人 ${AIRPORT_FARE}；09:00 到 16:00 每小時六班`,
        booking: "不用，除非想坐 uシート對號座，加 ¥1,000，無紙化購票 ¥800",
      },
      {
        time: "傍晚前",
        place: "在札幌站附近辦入住、放行李",
        allow: "45 分鐘",
        getting: "步行，選對住宿地點的話大多在地下",
        booking: "要，6 晚中有 4 晚在這裡",
      },
      {
        time: "晚上",
        place: "大通公園、札幌電視塔展望台和薄野",
        allow: "2–3 小時",
        getting: "從札幌站一站地鐵，或步行約 10 分鐘",
        booking: "公園和街道不用；展望台現場買票",
      },
    ],
    book: (
      <>
網路、住宿，以及如果 2 月帶托運行李，預訂座位，不必帶著行李站在月台。電車不用預訂，這正是這趟抵達方便的地方；預約公路接送則是行李很大或飯店不在車站旁時的選擇，要在出發前決定。第 1 天還有一個非交通的決定：如果中午前抵達，新千歲直達小樽最快 73 分鐘，不用換車，抵達當天下午就能好好利用，請看<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">小樽一日遊攻略（英文）</Link>了解這如何改變一週。
</>
    ),
    picks: [
      { label: "新千歲接送 →", url: klookFor(newChitoseAirportTransfers.url, LOCALE) },
      { label: "查看 Klook eSIM →", url: klookFor(klookEsim.url, LOCALE) },
      { label: "查看 JR 北海道周遊券 →", url: klookFor(jrHokkaidoRailPass.url, LOCALE) },
      { label: "電視塔加藻岩山套票 →", url: klookFor(sapporoTvTowerMoiwaSetTicket.url, LOCALE) },
    ],
  },
  {
    n: 2,
    label: "第 2 天",
    heading: "第 2 天：札幌，以及離開市區的半天",
    intro:
      "札幌人口約兩百萬、街道呈棋盤式，市區景點不足以排滿兩天，它最適合當住宿地點，最好的第 2 天是半天在市區、半天在近郊。若在 2 月上旬造訪，另外半天就留給雪祭：雪祭於 2027 年 2 月 4–11 日在三個免費會場舉行，晚上看點燈的大通雪雕是這份行程最划算的事。其他日期，往南不到一小時的定山溪能解決 2 月札幌一天真正需要的：讓中段待在室內。",
    stops: [
      {
        time: "上午",
        place: "大通公園、北海道廳舊本廳舍和二條市場",
        allow: "2–3 小時",
        getting: "步行加一兩站地鐵",
        booking: "不用",
      },
      {
        time: "中午",
        place: "拉麵或湯咖哩午餐，然後去札幌啤酒博物館",
        allow: "2 小時",
        getting: "東豐線，或工廠循環巴士",
        booking: "博物館不用；試飲當天付費",
      },
      {
        time: "下午",
        place: "定山溪溫泉或頭大佛，或 2027 年 2 月 4–11 日去 Tsudome 雪祭會場",
        allow: "半天",
        getting: "定鐵巴士或預訂的巴士；Tsudome 搭東豐線到榮町再轉接駁車",
        booking: "導覽半日建議預訂；雪祭會場免費，不用訂",
      },
      {
        time: "晚上",
        place: "黃昏搭藻岩山纜車，或雪祭週看點燈的大通和薄野",
        allow: "2–3 小時",
        getting: "路面電車再轉纜車；或大通一站地鐵",
        booking: "纜車現場買；雪祭什麼都不用",
      },
    ],
    book: (
      <>
只要那半天的行程。依執行委員會常見問題，雪祭三個會場全免費（「全会場無料です」，查核日：{FESTIVAL_CHECKED}），所以雪祭週的錢花在住宿和一日遊而不是門票，<Link href="/zh-tw/guides/attractions/sapporo-snow-festival-tours">札幌雪祭攻略</Link>有詳細說明。其他日期請看定山溪的商品：一款是含定鐵巴士票的溫泉行程，另一款把峽谷和安藤忠雄的頭大佛、白色戀人公園排在一起。市區內唯一值得買的票是交通局地鐵一日券：平日 {SUBWAY_DAY_PASS}，週末與國定假日 {DONICHIKA}，單區 ¥210，搭三四次就划算。
</>
    ),
    picks: [
      { label: "定山溪與頭大佛一日 →", url: klookFor(sapporoJozankeiBuddhaDayTour.url, LOCALE) },
      { label: "含巴士定山溪溫泉一日 →", url: klookFor(jozankeiHotSpringBusTrip.url, LOCALE) },
      { label: "電視塔加藻岩山套票 →", url: klookFor(sapporoTvTowerMoiwaSetTicket.url, LOCALE) },
      { label: "查看札幌飯店 →", url: klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE) },
    ],
  },
  {
    n: 3,
    label: "第 3 天",
    heading: "第 3 天：小樽，要不要加余市",
    intro:
      "這週最便宜又好玩的一天：快速 Airport 單程 ¥800、約 33 分鐘。小樽是適合步行、不必一直排隊的港町。運河和煤氣燈約半小時，堺町通的玻璃工房和舊銀行建築要一兩小時，壽司則是專程來的理由。這天有兩個決定：要不要待到天黑，因為運河是煤氣燈下的風景，不是白天的；以及要不要加余市的 Nikka 蒸餾所，這是一天中唯一預訂巴士勝過買電車票的部分。",
    stops: [
      {
        time: "上午",
        place: "札幌 → 小樽，再步行到運河",
        allow: "電車 40 分鐘，運河 30–45 分鐘",
        getting: `JR 快速 Airport，成人 ${OTARU_FARE}；運河在車站下坡約 10 分鐘`,
        booking: "不用，閘門可刷 IC 卡",
      },
      {
        time: "中午",
        place: "堺町通、蒸汽時鐘和玻璃工房，然後吃壽司午餐",
        allow: "2–3 小時",
        getting: "從運河步行",
        booking: "週末建議訂壽司吧台；其他不用",
      },
      {
        time: "下午",
        place: "余市蒸餾所、天狗山或小樽水族館",
        allow: "2–3 小時",
        getting: "JR 到余市再走 5 分鐘，但 Nikka 提醒班次很少；其他地方搭巴士或行程",
        booking: "Nikka 導覽要，免費但要求事先預約",
      },
      {
        time: "黃昏",
        place: `天黑後的運河遊船，或 2027 年 2 月 6–13 日的小樽雪燈之路`,
        allow: "船上 40 分鐘，加上業者要求提前的 15 分鐘",
        getting: "在中央橋上船，從車站走一小段",
        booking: `熱門日期建議預訂。成人白天 ${CRUISE_DAY}、夜間 ¥2,000，小學生 ¥500`,
      },
    ],
    book: (
      <>
不是電車，而是小樽以外的那半天。Nikka 的常見問題說蒸餾所導覽免費但要求事先預約，交通頁也提醒<em>「小樽站與余市站之間班次很少」</em>：列車班次少，又要配合固定的預約時間，這正是導覽行程能解決的，所以這裡把余市行程放在前面。蒸餾所 12 月 23 日到 1 月 7 日休館。運河遊船也值得先訂：業者票價成人白天 {CRUISE_DAY}、夜間 ¥2,000，40 分鐘，天候不佳會停航。<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">札幌出發小樽一日遊（英文）</Link>攻略有這天的完整版本，也說明為什麼值得住在這裡。
</>
    ),
    picks: [
      { label: "余市與小樽步行一日 →", url: klookFor(yoichiOtaruWalkingTour.url, LOCALE) },
      { label: "神威岬加余市巴士一日 →", url: klookFor(otaruShakotanYoichiCoachTour.url, LOCALE) },
      { label: "運河遊船加手作 →", url: klookFor(otaruCanalCruiseSealCarving.url, LOCALE) },
      { label: "小樽與雪上樂園一日 →", url: klookFor(otaruSnowParkDayTour.url, LOCALE) },
    ],
  },
  {
    n: 4,
    label: "第 4 天",
    heading: "第 4 天：往內陸，旭川、動物園，搭車到富良野",
    intro:
      "從這天起行程離開城市，轉往內陸。札幌到旭川搭特急 Lilac 或 Kamui 1 小時 25 分鐘，幾乎所有人都是為了旭山動物園而來，它是札幌以外北海道最多人造訪的地方。之後不返回札幌，繼續搭普通列車往南經美瑛到富良野；住在富良野，第 5 天早上就能悠閒出發，不必一早搭巴士。有兩個要注意的事實：動物園 12 月 30 日到 1 月 1 日休園；冬季 15:30 關門，最後入園 15:00，比你以為該離開的時間還早。",
    stops: [
      {
        time: "一早",
        place: "札幌 → 旭川",
        allow: "1 小時 25 分鐘",
        getting: `特急 Lilac 或 Kamui，全車對號座，依 JR 北海道來回票單程 ${ASAHIKAWA_OW}`,
        booking: "要，都是全車對號座列車",
      },
      {
        time: "上午到下午中段",
        place: "旭山動物園",
        allow: "3–4 小時",
        getting: "旭川站前的旭川電氣軌道巴士",
        booking: `不用。成人 ${ZOO_ADULT}，國中以下免費`,
      },
      {
        time: "下午中段",
        place: "回旭川，再搭普通列車往南",
        allow: "請查時刻表：JR 北海道只公布美瑛到富良野 40 分鐘，沒有旭川段的時間",
        getting: `JR 普通列車，旭川到富良野 ${FURANO_LOCAL}。這條線不能用 IC 卡`,
        booking: "不用",
      },
      {
        time: "晚上",
        place: "到富良野辦入住，在農場附近用餐",
        allow: "當天剩餘時間",
        getting: "從車站步行或短程計程車",
        booking: "要，兩晚，而且富良野的房間比札幌少得多",
      },
    ],
    book: (
      <>
對號座和富良野的房間，依這個順序。Lilac 和 Kamui 全車對號座，所以旭川這段要預訂，這也是決定周遊券的一段：這段、第 6 天富良野回程和小樽來回加起來，已超過 4 日札幌–富良野區域周遊券的價格。動物園現場 {ZOO_ADULT}（2027 年 4 月 29 日起 ¥1,400），不用預訂，重點是時間。旭山官方頁面（查核日：{SEASON}）：冬季期間 <strong>2026 年 11 月 11 日到 2027 年 4 月 7 日</strong>，<strong>10:30–15:30，最後入園 15:00</strong>，<strong>12 月 30 日到 1 月 1 日休園</strong>。冬天來的真正理由是企鵝散步，要有足夠的雪才能開始，動物園說約 12 月下旬到 3 月中旬，11:00 和 14:30，3 月只有 11:00。2026-27 開始日期待動物園官方社群公布。
</>
    ),
    picks: [
      { label: "札幌出發旭山動物園一日 →", url: klookFor(asahiyamaBieiHighlightsTour.url, LOCALE) },
      { label: "富良野與美瑛青池一日 →", url: klookFor(furanoBieiBluePondDayTour.url, LOCALE) },
      { label: "查看富良野飯店 →", url: klookFor(hokkaidoSevenDayStayAreas[2].url, LOCALE) },
      { label: "查看 JR 北海道周遊券 →", url: klookFor(jrHokkaidoRailPass.url, LOCALE) },
    ],
  },
  {
    n: 5,
    label: "第 5 天",
    heading: "第 5 天：美瑛和富良野，季節決定的一天",
    intro:
      "七天中，這一天在 2 月和 7 月完全不同，也是內陸住兩晚的理由。夏天是四季彩之丘的條紋山丘、富田農場的薰衣草和白金青池，是以自然風光為主的一天，也是 7 月來北海道的理由。冬天是同樣的山丘覆蓋白雪，更安靜空曠，比聽起來更好，山谷盡頭還有富良野雪場。不論哪個季節，實際重點相同：這一帶以自駕為主，巴士班次很少，住在富良野才能從容利用早晨，而不是在巴士行程中途才抵達。",
    stops: [
      {
        time: "上午",
        place: "富田農場和富良野花田（夏季），或富良野雪場（冬季）",
        allow: "2–3 小時",
        getting: "夏季搭普通列車到中富良野，冬季搭度假村接駁車",
        booking: "農場不用；雪票和租借要",
      },
      {
        time: "中午",
        place: "富良野蛋包咖哩或農場餐廳午餐",
        allow: "1 小時",
        getting: "步行",
        booking: "不用",
      },
      {
        time: "下午",
        place: "美瑛：四季彩之丘、拼布山丘、白金青池",
        allow: "3–4 小時",
        getting: "普通列車到美瑛再搭路線巴士、觀光巴士、計程車路線或預訂的巴士",
        booking: "強烈建議以某種方式預訂，這是整條路線中大眾運輸最不方便的一段",
      },
      {
        time: "晚上",
        place: "回到富良野，冬季有非常暗的夜空",
        allow: "當天剩餘時間",
        getting: "普通列車或一日遊的送達",
        booking: "不用",
      },
    ],
    book: (
      <>
你在美瑛的移動方式，這是這份行程唯一真正困難的交通問題。富田農場公布時間 9:30 到 16:30，並寫明「營業時間外不可入場」（查核日：{OWN}）；農場本身不是問題，問題是沒有車時怎麼往返農場、山丘和青池。可行的三個選擇是觀光巴士、計程車路線，或全部走完但放棄清晨光線的札幌出發導覽一日遊。如果在薰衣草季，請提早用某種方式訂好：這是北海道最多人預訂的一天，各商品差別正在重點上，也就是是否包含青池、富田農場，以及午餐是否含在價格內。這裡不寫花期，因為富田農場官網頁面沒有寫。
</>
    ),
    picks: [
      { label: "富良野與美瑛冬季一日 →", url: klookFor(furanoBieiWinterIlluminationTour.url, LOCALE) },
      { label: "美瑛與富良野薰衣草一日（夏季）→", url: klookFor(bieiFuranoLavenderDayTour.url, LOCALE) },
      { label: "富良野、青池與四季彩之丘 →", url: klookFor(furanoBieiBluePondDayTour.url, LOCALE) },
      { label: "富良野與美瑛跟團巴士（夏季）→", url: klookFor(sapporoFuranoBieiLavenderBusTour.url, LOCALE) },
      { label: "查看富良野飯店 →", url: klookFor(hokkaidoSevenDayStayAreas[2].url, LOCALE) },
    ],
  },
  {
    n: 6,
    label: "第 6 天",
    heading: "第 6 天：回札幌，最後一個大行程",
    intro:
      "怎麼回去要看季節。夏季富良野薰衣草特快兩小時直達札幌，第 6 天早上移動後仍有完整一天。這是季節列車，所以 12 月到 2 月要搭普通列車到旭川再轉 Lilac 或 Kamui，整個上午就過去了。下午怎麼安排也看季節。冬天最好留在札幌附近：雪上樂園半日，或 2027 年 1 月 30 日到 2 月 23 日的支笏湖冰濤祭，16:30 起點燈，有導覽半日和單純巴士座位兩種賣法。夏天則是往南去登別和洞爺湖的長途，溫泉谷加火山口湖，一天巴士很長，但這是不增加第二個住宿地點就能看到兩者的唯一方式。",
    stops: [
      {
        time: "上午",
        place: "富良野 → 札幌：夏季薰衣草特快，冬季普通列車加 Lilac 或 Kamui",
        allow: "2 小時",
        getting: `夏季：特急對號座，依 JR 北海道來回票單程 ${FURANO_OW}。冬季：經旭川 ${FURANO_WINTER}`,
        booking: "要",
      },
      {
        time: "下午",
        place: "滑雪或玩雪一日（冬季），或登別與洞爺湖（夏季）",
        allow: "半天到一整天",
        getting: "札幌的度假村接駁車，或跟團巴士",
        booking: "要，兩者都是有固定上車點的預訂班次",
      },
      {
        time: "晚上",
        place: "在薄野吃最後一頓晚餐，或 2 月看夜間點燈的支笏湖冰濤祭",
        allow: "2–3 小時",
        getting: "一站地鐵；或到湖邊的來回巴士座位",
        booking: "薄野不用；湖邊巴士要",
      },
      {
        time: "深夜",
        place: "整理行李，確認明天的班機",
        allow: "1 小時",
        getting: "n/a",
        booking: "n/a",
      },
    ],
    book: (
      <>
你選的那個下午，以及夏季時回程的薰衣草特快座位。想改成滑雪的話，<Link href="/zh-tw/guides/attractions/niseko-ski-tours">二世谷滑雪攻略</Link>介紹札幌出發當天來回的雪票加巴士方案。2027 年 1 月 30 日到 2 月 23 日，支笏湖冰濤祭是值得知道的替代選擇，下面的半日遊是最簡單的去法。不論訂什麼，都請看取消條款。北海道下雪時最先受影響的就是這一天：不會關閉免費的雪祭會場，但會封閉出城的道路。
</>
    ),
    picks: [
      { label: "登別、洞爺湖與小樽一日 →", url: klookFor(noboribetsuToyaOtaruDayTour.url, LOCALE) },
      { label: "支笏湖冰濤祭 →", url: klookFor(lakeShikotsuIceFestivalHalfDayTour.url, LOCALE) },
      { label: "札幌雪上樂園半日 →", url: klookFor(sapporoSnowParkHalfDayTour.url, LOCALE) },
      { label: "登別、洞爺湖與二世谷一日 →", url: klookFor(noboribetsuToyaNisekoDayTour.url, LOCALE) },
    ],
  },
  {
    n: 7,
    label: "第 7 天",
    heading: "第 7 天：新千歲，以及一件不要做的事",
    intro:
      "離開北海道當天最需要留意的是天氣。快速 Airport 36 到 43 分鐘、¥1,230，白天每小時六班，這段本身很簡單，但 2 月新千歲的公路和航空是這趟最容易受影響的部分，這正是不要訂第一班的理由。另外，新千歲是很值得早到的機場：國內線航廈內有商店街、電影院和溫泉，多留一小時不會浪費。",
    stops: [
      {
        time: "上午",
        place: "在札幌站和大通一帶最後採買",
        allow: "1–2 小時",
        getting: "步行，走地下",
        booking: "不用",
      },
      {
        time: "起飛前三小時",
        place: "札幌 → 新千歲機場",
        allow: "36–43 分鐘，另加緩衝時間",
        getting: `快速 Airport，成人 ${AIRPORT_FARE}；uシート對號座加 ¥1,000`,
        booking: "不用，但有托運行李建議訂座",
      },
      {
        time: "在機場",
        place: "國內線航廈購物樓層和美食街",
        allow: "1–2 小時",
        getting: "從航廈下方的車站步行",
        booking: "不用",
      },
      {
        time: "出發",
        place: "飛往東京、大阪或下一站",
        allow: `依 JAL 的數字到羽田 ${HND_FLIGHT}`,
        getting: "n/a",
        booking: "早已訂好，但冬季不要訂第一班",
      },
    ],
    book: (
      <>
沒有新東西要買，這正是規劃得好的最後一天。兩件事要確認而不是購買。第一，eSIM 或上網方案在離開當天要還能用，2 月的航班變更通知是傳到手機，不是在櫃台公告。第二，如果在東京或大阪轉機，北海道這段要留比新幹線更多的緩衝：依 JAL 國內航線資料，羽田到札幌 {HND_FLIGHT}、每天十六班，錯過早班還能改搭後面的班次，錯過國際線轉機就不行了。
</>
    ),
    picks: [
      { label: "新千歲接送 →", url: klookFor(newChitoseAirportTransfers.url, LOCALE) },
      { label: "查看 Klook eSIM →", url: klookFor(klookEsim.url, LOCALE) },
    ],
  },
];

const hokkaidoSameTrip: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "2 月的行程要隨時掌握異動通知：列車延誤、道路封閉和班機變更都先傳到手機，旭川和富良野段更需要即時時刻表。",
  },
  {
    label: "新千歲機場接送（包車與共乘）",
    ctaLabel: "查看新千歲接送 →",
    url: klookFor(newChitoseAirportTransfers.url, LOCALE),
    why: `${AIRPORT_FARE} 的快速 Airport 適合多數抵達的旅客。預約接送適合班機晚到、飯店不在車站旁，或帶雪具的團體。`,
  },
  {
    label: "北海道札幌–富良野區域周遊券（4 天）",
    ctaLabel: "查看區域周遊券 →",
    url: klookFor(sapporoFuranoAreaPass.url, LOCALE),
    why: `這條路線划算的周遊券：依 JR 北海道頁面連續 4 天 ${AREA_FURANO}，用在第 3 到第 6 天。`,
  },
  {
    label: "札幌站周邊飯店",
    ctaLabel: "在 Klook 查看札幌飯店 →",
    url: klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE),
    why: "6 晚中有 4 晚在這裡，這趟行程的每段鐵路都從札幌站出發。",
  },
];

const faqItems = [
  {
    q: "北海道 7 天夠嗎？",
    a: `足以玩遍半個北海道。7 天 6 晚可以不趕地走完札幌、小樽、旭川、美瑛和富良野，也就是本頁的路線：札幌四晚、富良野兩晚。7 天玩不完整個島。北海道大約和奧地利一樣大，東部的知床、釧路、阿寒湖在旭川之外還要四五小時，南部的函館又是另一個方向。七天行程想再加其中之一，整週都會花在火車上。規劃原則是一個住宿地點住兩到三晚：兩個住宿地點能好好看西部，三個會很趕，四個就變成一路趕交通，而不是度假了。`,
  },
  {
    q: "在北海道需要開車嗎？",
    a: `這條路線不需要，只有一個例外。札幌、小樽、旭川和富良野都在 JR 線上，有特急或每小時數班的快速：依 JR 北海道數字（查核日：${OWN}），札幌到小樽 ${OTARU_FARE}、約 33 分鐘，札幌到旭川 1 小時 25 分鐘，札幌到富良野夏季搭季節性的薰衣草特快兩小時。冬季這班車不開，要搭普通列車到旭川再轉 Lilac 或 Kamui。札幌市內地鐵就夠了。例外是第 5 天：美瑛的拼布山丘、四季彩之丘和白金青池散布在農田間，路線巴士很少，這是唯一沒車真的不便的一段。沒車時可行的是觀光巴士、美瑛站計程車路線或導覽行程，所以這天的商品是本頁最有用的。如果想自駕，有兩點提醒：北海道冬季路況是真正的危險，不只是不方便；在市區的四天，租車只是多花錢。`,
  },
  {
    q: "7 天值得買北海道周遊券嗎？",
    a: `這條路線不值得，以下列出計算方式。JR 北海道官方價（查核日：${OWN}）：北海道周遊券連續 5 天 ${PASS_5}、7 天 ${PASS_7}、10 天 ${PASS_10}（抵達前購買），車站購買貴 ¥1,000，沒有非連續使用的版本。看路段：機場單程 ${AIRPORT_FARE}。小樽來回 ¥1,600。札幌到旭川對號座單程 ${ASAHIKAWA_OW}，是來回 ${ASAHIKAWA_RT} 除以 2。旭川到富良野普通列車 ${FURANO_LOCAL}。富良野回札幌夏季薰衣草特快 ${FURANO_OW}，是來回 ${FURANO_RT} 除以 2；冬季搭普通列車加 Lilac 或 Kamui ${FURANO_WINTER}。合計夏季 ${TOTAL_SUMMER}、冬季 ${TOTAL_WINTER}，都低於 ¥18,000。和 ${PASS_7} 相比，7 日券虧約 ¥10,000。划算的是 4 日札幌–富良野區域周遊券 ${AREA_FURANO}：旭川和富良野特急段就要 ¥11,720，還涵蓋新千歲、札幌、小樽和美瑛，用在第 3 到第 6 天，再加上小樽來回就划算。札幌–登別區域周遊券 ${AREA_NOBORIBETSU} 是往南而不是往內陸路線的版本。2026 年 10 月 1 日調漲後 7 日 ¥53,000 的全國版 JR Pass，只玩北海道完全不適用。`,
  },
  {
    q: "北海道住哪裡好？",
    a: `7 天兩個住宿地點：札幌四晚、富良野兩晚。住札幌站是為了交通順暢，而不是為了景色：新千歲來的快速 Airport、往旭川的 Lilac 和 Kamui，以及夏季的薰衣草特快都從札幌站出發，到大通一站地鐵或走有遮蔽的路，在平均最高溫 ${FEB_MAX} 的月份這比什麼都重要。第 4、5 晚的富良野常被跳過，但不該跳過：從札幌當天去美瑛和富良野是十小時巴士，從富良野的房間出發的兩個早晨則是這週最好的部分。有兩個值得的替換：想看點燈的運河，把第 3 晚換到小樽，尤其是 2 月上旬小樽雪燈之路期間，${OTARU_FARE}、約 33 分鐘回札幌，交通費幾乎不會增加。如果是真正的滑雪週，把富良野換成二世谷，因為機場巴士從新千歲直達，也能放雪具。`,
  },
  {
    q: "什麼時候去北海道最好？",
    a: `有兩個正確答案，也是兩種不同的假期。2 月是冬季版，有固定日期：依執行委員會公告，札幌雪祭 2027 年 2 月 4 到 11 日在三個免費會場舉行（查核日：${FESTIVAL_CHECKED}）；依小樽觀光協會頁面，小樽雪燈之路 2027 年 2 月 6 到 13 日（查核日：${OWN}）；旭山動物園的企鵝散步需要雪道，開始日期由動物園官方社群公布。代價是天氣：依日本氣象廳 1991–2020 年札幌平年值，2 月平均最高 ${FEB_MAX}、最低 ${FEB_MIN}、降雪 ${FEB_SNOW}（查核日：${JMA_CHECKED}）。7 月是夏季版，完全相反：富良野薰衣草、美瑛山丘、長長的白晝；日本其他地區悶熱時，北海道相對涼爽舒適。兩者之間，5 月有晚開的櫻花和積丹海岸，9 月下旬到 10 月有大雪山紅葉。要三思的是 11 月，換季時景點會休館，旭山動物園也在 11 月 4 到 10 日休園；還有滿地泥濘的 4 月。`,
  },
  {
    q: "新千歲機場怎麼到札幌？",
    a: `搭快速 Airport，${AIRPORT_FARE}。JR 北海道的數字（查核日：${OWN}）：09:00 到 16:00 每小時六班，特別快速一班、快速三班、區間快速兩班，日文頁面寫依列車種類最快 36、37、43 分鐘，英文頁面寫特別快速 33 分鐘。車站在國內線航廈下方，不用預訂，閘門可刷 Kitaca、Suica 和 PASMO。4 號車是 uシート對號座，票價外加 ¥1,000，無票 ¥800，冬季普通車廂常被雪具塞滿，所以值得。電車還有兩件出乎意料的事：直達小樽不用換車，依 JR 北海道最快 73 分鐘，早到的話可以直接去；另一個選擇是預約公路接送，實際好處是直接到飯店門口，不用帶著行李站在雪中的車站。請在出發前預訂，並查看商品頁的接送條款。`,
  },
  {
    q: "從東京或大阪飛北海道要多久？",
    a: `依 JAL 國內航線資料（查核日：${OWN}），羽田到新千歲 ${HND_FLIGHT}、每天十六班，是世界最繁忙的航線之一，持可改票機票的話，幾乎隨時都能改搭其他班次。大阪的部分這裡不寫數字：查核當天沒有航空公司頁面公布伊丹或關西到新千歲的時間，比價網站的數字也不是業者官方，請查詢出發日期的航空公司時刻表。規劃上的重點一樣：在航程外加上新千歲到札幌的 ${AIRPORT_FARE} 與 36 到 43 分鐘，2 月離開時比新幹線多留緩衝，最後一天早上不要訂第一班。也有鐵路可選：北海道新幹線到新函館北斗，不到札幌，7 天行程裡單程就要花掉一天。`,
  },
  {
    q: "北海道 7 天交通費要多少？",
    a: `上述路線的鐵路票價每人低於 ¥18,000，多數人對這筆交通費不是高估就是低估。依 JR 北海道數字分項（查核日：${OWN}）：新千歲進札幌 ${AIRPORT_FARE}、小樽來回 ¥1,600、往旭川特急對號座 ${ASAHIKAWA_OW}、旭川到富良野普通列車 ${FURANO_LOCAL}、回程夏季薰衣草特快 ${FURANO_OW} 或冬季經旭川 ${FURANO_WINTER}、回機場 ${AIRPORT_FARE}，合計夏季 ${TOTAL_SUMMER}、冬季 ${TOTAL_WINTER}。札幌市內地鐵單區 ¥210，交通局一日券平日 ${SUBWAY_DAY_PASS}、週末與國定假日 ${DONICHIKA}，搭三四次就划算。這個數字不包含、但真正決定預算的是：來回機票、六晚住宿，以及大眾運輸確實不便的美瑛和余市導覽行程。這三項最值得比較，而且都依日期而定，所以本頁都不標價。`,
  },
  {
    q: "這份行程可以反過來走，或從新千歲往外走嗎？",
    a: `可以，其中一種反向比原版更好。如果是滑雪週，抵達後直接搭度假村巴士去二世谷或留壽都：從新千歲直達，可放雪具加每人一件行李，快速 Airport 加小樽換車做不到。在那裡住兩三晚，再經札幌玩城市那一半。另一種反向是先內陸後城市，這比較不理想，原因很平凡：往旭川和富良野的特急全車對號座，班次也比機場快速少，排在可能遇到班機延誤的抵達日，是一週中唯一的時程風險。真要先走內陸，就把 4 日區域周遊券用在旅程前段，因為貴的路段在那裡。`,
  },
  {
    q: "只有 5 天，或想玩 10 天呢？",
    a: `5 天就刪掉第 6 天和札幌一晚：抵達、札幌一天、小樽、旭川加富良野、離開，保留大家來的兩個重點，刪掉可有可無的大行程。這時 5 日北海道周遊券 ${PASS_5} 比 7 日版更不划算，4 日區域周遊券仍然划算。10 天的話，不要在西部加第四個住宿地點，要加東部。10 天大約是知床或阿寒湖能成為旅程一部分、而不只是長途火車的分界，也是 10 日周遊券 ${PASS_10} 開始值得計算的時候，因為東部路段又長又貴。日本 14 天行程用全國路線說明同樣邏輯，日本冬季行程則把北海道當成 2 月全國旅程的一段。`,
  },
];

const TITLE = "北海道7天行程（2027）：每日路線與周遊券算法";
const DESC =
  "北海道7天行程怎麼排：每天一張表，走札幌、小樽、旭川、美瑛與富良野，並附兩個住宿地點、航班資訊與鐵路周遊券的完整算法說明。";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function Hokkaido7DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
更新於 {monthLabel(updated.iso, LOCALE)}
</p>
          <h1 className={styles.heroTitle}>
北海道7天行程：<br />每日路線安排
</h1>
          <p className={styles.heroSubtitle}>
以兩個住宿地點安排 6 晚，逐日整理行程表，加上用 JR 北海道票價算的周遊券，以及 2 月和 7 月版本對照。
</p>
          <div className={styles.heroBadges}>
            {[`更新於 ${monthLabel(updated.iso, LOCALE)}`, "每天一張表", "業者票價，附查核日期", "冬季與夏季版本"].map((t) => (
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
          heading={"北海道7天行程該訂哪些一日遊？"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
如果行程恰逢 2027 年 2 月 4–11 日的札幌雪祭或 2 月 6–13 日的小樽雪燈之路，請先訂住宿。一日遊在 12 月 31 日前訂好，Nikka 蒸餾所則等開放預約的四週前再訂。
</>
          }
          tours={[
            {
              title: "富良野與美瑛一日遊，冬季點燈路線",
              url: klookFor(furanoBieiWinterIlluminationTour.url, LOCALE),
              price: null,
              duration: "約 10 小時",
              departs: "札幌",
            },
            {
              title: "札幌出發旭山動物園、美瑛青池與精靈露台一日遊",
              url: klookFor(asahiyamaBieiHighlightsTour.url, LOCALE),
              price: "約 US$55 起",
              duration: "一整天",
              departs: "札幌",
            },
            {
              title: "札幌出發余市與小樽步行一日遊",
              url: klookFor(yoichiOtaruWalkingTour.url, LOCALE),
              price: null,
              duration: "見商品頁",
              departs: "札幌",
            },
          ]}
        />

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
路線
</p>
                <p className={styles.verdictStatValue}>
札幌 · 小樽 · 旭川 · 美瑛 · 富良野
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
住宿地點
</p>
                <p className={styles.verdictStatValue}>
札幌 4 晚、富良野 2 晚
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
全程鐵路交通費
</p>
                <p className={styles.verdictStatValue}>
每人低於 ¥18,000
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
需要買 7 日北海道周遊券嗎？
</p>
                <p className={styles.verdictStatValue}>
不用，4 日區域周遊券更划算
</p>
              </div>
            </div>
                        <p className={styles.verdictText}>
這份<strong>北海道7天行程</strong>以<strong>兩個住宿地點安排六晚</strong>：<strong>札幌四晚</strong>、<strong>富良野兩晚</strong>，路線是<strong>札幌 → 小樽 → 旭川 → 美瑛和富良野 → 札幌</strong>。距離短到全程可搭火車，依 JR 北海道數字：新千歲到札幌 <strong>{AIRPORT_FARE}</strong>、<strong>36 到 43 分鐘</strong>；札幌到小樽 <strong>{OTARU_FARE}</strong>、<strong>約 33 分鐘</strong>；札幌到旭川搭對號座 Lilac 或 Kamui <strong>1 小時 25 分鐘</strong>；富良野回札幌夏季搭薰衣草特快<strong>兩小時</strong>，冬季搭普通列車加 Lilac 或 Kamui。加起來全程鐵路交通費每人<strong>低於 ¥18,000</strong>，所以<strong>這條路線買 {PASS_7} 的 7 日北海道周遊券不划算</strong>，4 日<strong>札幌–富良野區域周遊券 {AREA_FURANO}</strong> 才划算。唯一不適合搭大眾運輸的是<strong>美瑛</strong>；<strong>富良野</strong>在 <strong>2 月</strong>和 <strong>7 月</strong>是完全不同的景色。票價與周遊券價格查核日：{OWN}。
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
查看札幌飯店 →
</KlookLink>
              <KlookLink href={klookFor(jrHokkaidoRailPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
查看 JR 北海道周遊券 →
</KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label={"同一趟旅程要訂的"}
          heading={"北海道一週要一起訂什麼"}
          intro={"7 天行程之外還要準備三件事：接收天氣與時刻異動通知的網路、機場交通，以及這條路線划算的鐵路周遊券。Klook 價格依日期而變，請打開商品頁查看出發日期的價格。"}
          items={hokkaidoSameTrip}
        />

        <EsimCtaTop />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
一週的架構
</span>
          <h2 className={styles.sectionTitle}>
北海道 7 天住哪裡好？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>兩個住宿地點，而不是四個。</strong>北海道一週最常見的錯誤，是像本州一樣每兩晚換飯店，在這麼大的島上，等於整週都花在火車上。札幌四晚加富良野兩晚就能不趕地走完下面所有內容，唯一值得考慮的調整是表中兩個替換方案。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["住宿地點", "晚數", "為什麼住這裡"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {baseRows.map((row) => (
                    <tr key={row.base}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.base}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.nights}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
冬季或夏季
</span>
          <h2 className={styles.sectionTitle}>
什麼時候去北海道最好？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>2 月和 7 月，而且是兩種不同的假期。</strong>一週的架構相同，但七天中有四天內容不同，所以分開列出。2 月有固定日期可依循：<strong>札幌雪祭 2027 年 2 月 4 到 11 日</strong>、<strong>小樽雪燈之路 2027 年 2 月 6 到 13 日</strong>；代價是依日本氣象廳 1991–2020 年札幌平年值，平均最高 <strong>{FEB_MAX}</strong>、全月降雪 <strong>{FEB_SNOW}</strong>。7 月有富良野薰衣草和長長的白晝；日本其他地區悶熱時，北海道相對涼爽舒適。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["日期", "冬季版（12–3 月）", "夏季版（6–8 月）"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.day}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.day}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.winter}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.summer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
雪祭日期出自執行委員會公告，於 {FESTIVAL_CHECKED} 為<Link href="/zh-tw/guides/attractions/sapporo-snow-festival-tours" style={{ color: "var(--text)", fontWeight: 600 }}>札幌雪祭攻略</Link>查核；小樽雪燈之路日期出自小樽觀光協會 2027 年頁面（查核日：{OWN}），頁面寫明日期，並表示詳情確定後公布。氣溫與降雪平年值出自日本氣象廳（查核日：{JMA_CHECKED}）。要三思的兩個月是景點換季休館的 11 月（旭山動物園 11 月 4 到 10 日也休園）和 4 月。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
周遊券算法
</span>
          <h2 className={styles.sectionTitle}>
7 天值得買北海道周遊券嗎？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>這條路線不適合買 7 日周遊券，4 日區域周遊券更划算。</strong>這是本頁最有用的數字，所以列出完整算法，不只給結論。下列票價都是 JR 北海道官方數字，查核日 {OWN} 或 {SEASON}，兩段特急票價為業者在官方範例路線頁公布的來回票價除以 2。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["路段", "成人票價", "備註"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
<strong>那該買哪一張？</strong><strong>北海道周遊券</strong>抵達前購買連續 5 天 {PASS_5}、7 天 <strong>{PASS_7}</strong>、10 天 {PASS_10}，車站購買貴 ¥1,000，兒童半價，沒有非連續使用的版本，所以和低於 ¥18,000 的票價相比，7 日券虧約 ¥10,000。連續 4 天 <strong>{AREA_FURANO}</strong> 的<strong>札幌–富良野區域周遊券</strong>才划算：旭川和富良野特急段就要 ¥11,720，還涵蓋新千歲、札幌、小樽和美瑛，用在第 3 到第 6 天，再加上小樽來回就划算（不含 Tomamu）。<strong>札幌–登別區域周遊券</strong> {AREA_NOBORIBETSU} 是往南路線的版本，涵蓋新千歲、札幌、小樽和登別，不含洞爺。全國版 <strong>JR Pass</strong> 在 2026 年 10 月 1 日調漲後 7 天 ¥53,000、14 天 ¥84,000、21 天 ¥105,000，不適合只玩北海道；何時適合請看 <Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR Pass 攻略（英文）</Link>。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jrHokkaidoRailPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
查看 JR 北海道周遊券 →
</KlookLink>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
新千歲接送 →
</KlookLink>
            <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷度假村接駁 →
</KlookLink>
          </div>
        </section>

        <p className={styles.bodyText} style={{ marginBottom: "2.5rem" }}>
下面七天每天都有一張表：時段、地點、預留時間、交通方式、是否要預訂，下方是當天的商品。如果旅程形式不同，<Link href="/zh-tw/guides/attractions/japan-winter-itinerary">日本冬季行程</Link>是含 2 月北海道版本的 12 天全國路線，<Link href="/guides/attractions/japan-10-day-itinerary" hrefLang="en">日本 10 天行程（英文）</Link>和<Link href="/guides/attractions/japan-14-day-itinerary" hrefLang="en">日本 14 天行程（英文）</Link>走東京到京都大阪，<Link href="/zh-tw/guides/attractions/sapporo-snow-festival-tours">札幌雪祭攻略</Link>則是完全圍繞 2 月日期的版本。經東京回程的話，還可以加其他冬季行程：<Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">東京出發 GALA 湯澤滑雪（英文）</Link>滑一天雪、<Link href="/zh-tw/guides/attractions/jigokudani-snow-monkey-tour">地獄谷雪猴行程</Link>看泡湯的猴子，或晚上看<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">東京燈飾（英文）</Link>。本州的雪鄉則請看<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山與白川鄉行程（英文）</Link>。
</p>

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
                      {["時段", "地點", "預留時間", "交通方式", "要預訂嗎？"].map((h) => (
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
第 {day.n} 天要訂什麼。
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
七張表的「預留時間」是我們的規劃估計，不是業者數字。所有車程和票價都是業者官方：機場、小樽、旭川和富良野段出自 JR 北海道，旭山動物園 {ZOO_ADULT} 門票和冬季時間出自旭川市，運河遊船票價出自業者官網，富田農場時間出自富田農場，余市蒸餾所資訊出自 Nikka，均於 {OWN} 查核。雪祭日期和札幌地鐵一日券出自<Link href="/zh-tw/guides/attractions/sapporo-snow-festival-tours" style={{ color: "var(--text)", fontWeight: 600 }}>札幌雪祭攻略</Link>，查核日：{FESTIVAL_CHECKED}。
</p>

                <KlookStayAreas
          heading={"上述住宿地點的飯店搜尋"}
          intro={"兩個住宿地點一週的四個搜尋，含兩個替換選項。北海道 2 月旺季特別明顯，還有哪些房間、多少錢要看日期，所以每個住宿地點都連到 Klook 飯店搜尋，每項說明講的是上表的交通理由，而不是景觀。"}
          areas={hokkaidoSevenDayStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "七晚中的三四晚，因為這條路線每個內陸和海岸行程都從這裡出發：新千歲來的快速 Airport、往旭川的 Lilac 和 Kamui，以及夏季的薰衣草特快都從札幌站出發，到大通只需搭一站地鐵，或走有遮蔽的地下步道。", area: "札幌站" }, { why: "想看點燈的運河，以及一日遊旅客離開後的小樽雪燈之路，值得住一晚而不是當天來回。依 JR 北海道數字回札幌 ¥800、約 33 分鐘，改住這裡，交通費幾乎不會增加。", area: "小樽站" }, { why: "讓內陸段從十小時巴士變成兩個悠閒日子的住宿地點：在晨光中看富田農場和美瑛山丘，而不是在一日遊的尾段，夏季搭薰衣草特快回札幌兩小時。", area: "富良野" }, { why: "只適合以雪為主的一週：纜車就在門口，能放雪具的巴士從新千歲直達，所以滑雪版路線抵達當天不經過札幌。", area: "二世谷" }] as Partial<typeof item>[])[i]))}
        />

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3rem" }}>
有一個時間提醒適用於這四處。北海道 2 月最繁忙的那一週是一年前就公布的固定日期，雪祭執行委員會在 2026 年 2 月 11 日公布了 2027 年日期，所以 2 月上旬的住宿沒有替代方案，務必先訂；札幌客滿時，首選是改住小樽。官方沒有公布住房率，所以這裡也不寫。
</p>

        <EsimCtaBottom />

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"這條路線實際要訂的四天"}
          intro={"七天中有四天可以不預訂，三天不行。這裡列出沒有預訂真的很難的三天：美瑛和富良野、小樽加余市，以及旭川動物園，再加上有多餘一天時往南的長途行程。"}
          tours={[withKlookLocale(furanoBieiBluePondDayTour, LOCALE, { title: "札幌出發富良野、美瑛青池與四季彩之丘一日遊", desc: "包含白金青池和四季彩之丘花田的內陸行程，含拖拉機遊園和薰衣草枕手作" }), withKlookLocale(yoichiOtaruWalkingTour, LOCALE, { title: "札幌出發余市與小樽步行一日遊", desc: "有英語助理的小團電車與巴士一日：Nikka 余市蒸餾所、酒造和小樽運河遊船，步行約 4 公里" }), withKlookLocale(asahiyamaBieiHighlightsTour, LOCALE, { title: "札幌出發旭山動物園、美瑛青池與精靈露台一日遊", desc: "從札幌前往旭川動物園、美瑛青池和精靈露台的一日巴士，有多條路線，冬季可加購雪上摩托車" }), withKlookLocale(noboribetsuToyaOtaruDayTour, LOCALE, { title: "札幌出發登別、洞爺湖與小樽一日遊", desc: "市區南方和西方的全景跟團行程，適合多一天、又不想在大通度過第四晚的雪祭旅程" })]}
        />

                <Related items={[{ href: "/guides/transport/hokkaido-rail-pass", title: "北海道周遊券（2026）：價格與是否划算 （英文）" }, { href: "/zh-tw/guides/attractions/niseko-ski-tours", title: "二世谷滑雪（2027）：接送、教練課與四大區域" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出發小樽一日遊（2027）：¥800，JR 33 分鐘 （英文）" }, { href: "/zh-tw/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭（2027）：2/4–11 三會場免費，該訂什麼" }, { href: "/zh-tw/guides/attractions/japan-winter-itinerary", title: "日本冬季行程（2027）：12 天路線逐日安排" }, { href: "/guides/money/best-travel-insurance-japan", title: "日本旅遊保險推薦 2026：誰需要什麼 （英文）" }, { href: "/guides/money/japan-ski-travel-insurance", title: "日本滑雪旅遊保險（2027）：該保什麼 （英文）" }, { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略（2026）：價格、範圍與是否划算 （英文）" }, { href: "/zh-tw/guides/esim/best-esim-japan", title: "日本 eSIM 推薦（2026）：業者、價格與怎麼選" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
兩個住宿地點、六晚，鐵路低於 ¥18,000
</h2>
            <p className={styles.ctaBannerDesc}>
鐵路段幾乎不用預訂。住宿和三天導覽行程要訂，而 2 月上旬的住宿是這趟行程唯一沒有替代方案的部分。
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(hokkaidoSevenDayStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
查看札幌飯店 →
</KlookLink>
              <KlookLink href={klookFor(hokkaidoSevenDayStayAreas[2].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
查看富良野飯店 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
