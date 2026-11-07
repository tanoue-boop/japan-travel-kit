import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import {
  type KlookTripPrepItem,
    dotonboriCityCruise,
  galaNaebaSkiDayTripTokyo,
  galaYuzawaLiftTicket,
  hakubaHapponeBusLiftRental,
  hakubaSkiResortDayTourTokyo,
  hanedaLimousineBus,
  hokurikuArchPass,
  japanWinterStayAreas,
  jrEastSouthHokkaidoPass,
  jrHarukaUrl,
  kanazawaGeishaKenrokuenCastleDayTour,
  kanazawaKenrokuenHigashiChayaDayTour,
  klookEsim,
  kyotoHighlightBusTour,
  kyotoKimonoYumeyakata,
  kyotoNaraKiyomizuTour,
  lakeShikotsuIceFestivalHalfDayTour,
  nankaiRapitUrl,
  naritaExpressRoundTripUrl,
  naritaLimousineBus,
  newChitoseSapporoSharedTransfer,
  nisekoResortShuttleBus,
  nisekoSkiSnowboardRental,
  osakaAmazingPass,
  otaruSnowParkDayTour,
  rusutsuResortShuttleBus,
  sapporoSnowParkHalfDayTour,
  shibuyaSkyTicketUrl,
  shinkansenTokyoKanazawa,
  shinkansenTokyoKyoto,
  shirakawagoLightUpTakayamaDayTour,
  shirakawagoLineBusTicket,
  shirakawagoTakayamaKanazawaDayTour,
  takayamaShirakawagoGokayamaUnescoTour,
  teamlabBotanicalGardenOsakaTicket,
  teamlabPlanetsTicketUrl,
  tokyoMegaIllumiTicket,
  tokyoNightTourAkihabaraShibuya,
  tokyoOpenTopBusSightseeing,
  tokyoSubwayTicket,
  yomiurilandTicket,
} from "../../../../lib/klook-links";
import { asahiyamaBieiHighlightsTour } from "../../../../lib/klook-links-winter-hokkaido";
import { jrPassWholeJapanCurrent, shirakawagoLightUp2027NagoyaTour } from "../../../../lib/klook-links-winter-hub";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
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

// Mirrors the English guide (pages/guides/attractions/japan-winter-itinerary.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/japan-winter-itinerary";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "日本冬季行程" }];

const CHECKED = dateLabel("2026-10-28", LOCALE);
const REREAD = dateLabel("2026-11-06", LOCALE);

const sameTripItems: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "冬天是計畫會當天改變的季節：電車因雪暫停、纜車因風關閉，這些通知都傳到手機，不會傳到櫃台。",
  },
  {
    label: "成田機場利木津巴士",
    ctaLabel: "查看成田巴士 →",
    url: klookFor(naritaLimousineBus.url, LOCALE),
    why: "單程，因為這條路線從關西回國。行李很大或帶冬裝、飯店又不在車站旁時，選這種抵達方式。",
  },
  {
    label: "羽田機場利木津巴士",
    ctaLabel: "查看羽田巴士 →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "羽田出發同樣買單程，停靠站有新宿和池袋，在下午四點半就天黑的第 1 天很實用。",
  },
  {
    label: "JR 北陸拱型周遊券（7 天）",
    ctaLabel: "查看北陸拱型周遊券 →",
    url: klookFor(hokurikuArchPass.url, LOCALE),
    why: "真正符合這份行程形狀的票券：連續七天涵蓋東京出發的北陸新幹線和終點的關西地區。不含東海道新幹線，所以只適合去程和回程走不同路線。",
  },
  {
    label: "JAPAN RAIL PASS（7、14 或 21 天）",
    ctaLabel: "在 Klook 查看 JR Pass →",
    url: klookFor(jrPassWholeJapanCurrent.url, LOCALE),
    why: "購買前請用這條路線算一次。東京 → 金澤 → 高山 → 京都 → 大阪的 12 天旅程有兩段長途和一段特急，不一定超過周遊券價格；JR Pass 攻略有可用自己路段計算的工具。",
  },
  {
    label: "東京地鐵票（24／48／72 小時）",
    ctaLabel: "查看地鐵票 →",
    url: klookFor(tokyoSubwayTicket.url, LOCALE),
    why: "前段的東京日子都搭東京地鐵和都營線，燈飾路線丸之內、六本木、惠比壽也在這些線上，不是山手線。此票不含 JR 和山手線，這是最常被誤解的地方。",
  },
];

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

const days: Day[] = [
  {
    n: 1,
    label: "第 1 天",
    heading: "第 1 天：東京，在黑暗中從機場進市區",
    intro:
      "冬天讓這一天有一個具體的改變：下午四點半左右就天黑了，多數行程排在抵達日的觀光根本做不到。請規劃交通、入住，再走走一個點燈的街區。這不算妥協，東京的燈飾季 11 月初就開始了，而燈光最美的時段正好是你抵達的時間。",
    stops: [
      {
        time: "抵達後",
        place: "入境、領行李、手機上網",
        allow: "1–1.5 小時",
        getting: "n/a",
        booking: "出發前啟用 eSIM，不用領取，也不用在寒冷的航廈排櫃台",
      },
      {
        time: "下午或傍晚",
        place: "機場到東京據點",
        allow: "依機場和據點 40 分鐘到 1.5 小時",
        getting: "成田特快、京成 Skyliner 或利木津巴士；羽田搭京急或單軌電車",
        booking: "值得預訂：有行李空間的對號座，而且很暖",
      },
      {
        time: "傍晚前",
        place: "辦入住、放行李",
        allow: "1 小時",
        getting: "選對據點的話從車站步行",
        booking: "東京四晚，提前訂好",
      },
      {
        time: "晚上",
        place: "住宿周邊的夜晚：新宿回憶橫丁、淺草仲見世，或住東京站的話看丸之內燈飾",
        allow: "2–3 小時",
        getting: "步行",
        booking: "不用，街頭燈飾免費",
      },
    ],
    book: (
      <>
機場交通、網路，以及接下來三天東京的地鐵票。成田路線完全看你住在城市哪一側，<Link href="/zh-tw/guides/transport/tokyo-airport-transfer">東京機場交通攻略</Link>都有介紹；行李大或飯店不在車站旁時選利木津巴士，N&apos;EX 來回票只有從東京回國的版本才用得到回程。東京地鐵票有個冬季特點：燈飾路線丸之內、六本木、惠比壽在東京地鐵和都營線上，不是山手線，所以 12 月比其他月份更適合，此票不含 JR 和山手線。
</>
    ),
    picks: [
      { label: "成田特快來回 →", url: klookFor(naritaExpressRoundTripUrl, LOCALE) },
      { label: "成田利木津巴士 →", url: klookFor(naritaLimousineBus.url, LOCALE) },
      { label: "羽田利木津巴士 →", url: klookFor(hanedaLimousineBus.url, LOCALE) },
      { label: "東京地鐵票 →", url: klookFor(tokyoSubwayTicket.url, LOCALE) },
      { label: "查看 Klook eSIM →", url: klookFor(klookEsim.url, LOCALE) },
    ],
  },
  {
    n: 2,
    label: "第 2 天",
    heading: "第 2 天：白天東京東側，晚上看燈飾",
    intro:
      "東京冬天唯一勝過夏天的是傍晚，所以從傍晚往回排一天。趁這個季節清爽乾燥的空氣逛淺草寺、仲見世和隅田川一帶，天黑後看一處燈飾。免費的街頭燈飾最讓人難忘，而兩處收費的則要提前決定。",
    stops: [
      {
        time: "上午",
        place: "淺草寺與仲見世",
        allow: "2 小時",
        getting: "銀座線或淺草線到淺草，都可用地鐵票",
        booking: "不用",
      },
      {
        time: "下午前段",
        place: "東京晴空塔，或隅田川畔與清澄",
        allow: "2 小時",
        getting: "淺草線兩站到押上",
        booking: "展望台建議預約時段；河畔隨時可去",
      },
      {
        time: "黃昏，約 16:30 起",
        place: "免費街頭燈飾：丸之內（到 2 月 14 日）、六本木櫸樹坂（到 12 月 25 日）、惠比壽花園廣場（到 2 月 28 日）",
        allow: "1.5–2 小時",
        getting: "地鐵；丸之內從東京站步行",
        booking: "不用，免費也不需門票",
      },
      {
        time: "晚上",
        place: "如果想看單一場地而不是散步，選收費燈飾：大井賽馬場的東京 Mega Illumi，或讀賣樂園 Jewellumination",
        allow: "2–3 小時",
        getting: "東京單軌電車到大井競馬場前；讀賣樂園搭京王線加巴士",
        booking: "建議，這些是門票，不是街道",
      },
    ],
    book: (
      <>
這個晚上免費的部分不用買票，<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">東京燈飾攻略（英文）</Link>列出各處的日期、時間、票價和出處。值得預訂的是能走更多地方的版本：夜間導覽步行，或行經整條燈飾路線的開頂巴士。想看一處大型收費燈飾的話，東京 Mega Illumi 和讀賣樂園都可預售。Mega Illumi 是賽馬場改建暫停前的最後一季：官網顯示 12 月 24 日到 1 月 1 日休息，最後一晚是 2027 年 1 月 10 日，所以 1 月下旬的旅程只能去讀賣樂園。
</>
    ),
    picks: [
      { label: "東京夜間步行導覽 →", url: klookFor(tokyoNightTourAkihabaraShibuya.url, LOCALE) },
      { label: "開頂觀光巴士 →", url: klookFor(tokyoOpenTopBusSightseeing.url, LOCALE) },
      { label: "東京 Mega Illumi 門票 →", url: klookFor(tokyoMegaIllumiTicket.url, LOCALE) },
      { label: "讀賣樂園門票 →", url: klookFor(yomiurilandTicket.url, LOCALE) },
    ],
  },
  {
    n: 3,
    label: "第 3 天",
    heading: "第 3 天：雪之日，GALA 湯澤或白馬當天來回",
    intro:
      "這是只有冬天才有的一天，排在第 3 天是因為有天氣風險：放在前面，取消了還有三天可以移動。日本特別的是不需要滑雪假期也能滑一天：GALA 湯澤從東京站搭上越新幹線不用轉車，車站和纜車站是同一棟建築。",
    stops: [
      {
        time: "一早",
        place: "從東京站到雪地",
        allow: "單程 1.5–2 小時",
        getting: "GALA 湯澤和苗場搭上越新幹線；白馬搭巴士或北陸線",
        booking: "跟團或套裝行程必須預訂；不論如何都建議訂位",
      },
      {
        time: "上午後段到下午中段",
        place: "在雪道上，或只是看看也好",
        allow: "4–5 小時",
        getting: "GALA 從車站大樓搭纜車；白馬從村內搭接駁車",
        booking: "租借和雪票比電車還快賣完",
      },
      {
        time: "下午中段",
        place: "山腳的溫泉，這是大家常忘記安排的部分",
        allow: "1 小時",
        getting: "步行",
        booking: "不用",
      },
      {
        time: "晚上",
        place: "晚餐前回到東京",
        allow: "2 小時",
        getting: "新幹線或巴士",
        booking: "雪季週日晚上建議對號座",
      },
    ],
    book: (
      <>
先決定是要滑雪還是看雪，因為預訂完全不同。要滑雪的話，巴士、雪票和裝備的套裝比分開買值得，否則要用看不懂的語言排三次隊。不滑雪或團體同行，包車一日涵蓋 GALA 湯澤、苗場或白馬，以車計價，只買 GALA 雪票也能玩半天雪橇再慢慢吃午餐。GALA 官方行事曆為 2026 年 12 月 19 日到 2027 年 5 月 5 日開放雪道，12 月 12 到 18 日僅觀光運行，南區整季關閉；電車和雪票價格請看 <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">GALA 湯澤滑雪一日遊攻略（英文）</Link>。如果想看雪而不是滑雪，<Link href="/zh-tw/guides/attractions/jigokudani-snow-monkey-tour">地獄谷雪猴行程攻略</Link>介紹長野一側的冬季一日遊，正好放在這個時段。出發前有件事要確認：旅遊保險對雪道內和雪道外的處理完全不同，<Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en">滑雪旅遊保險比較（英文）</Link>依公開條款說明。
</>
    ),
    picks: [
      { label: "GALA 湯澤／苗場包車 →", url: klookFor(galaNaebaSkiDayTripTokyo.url, LOCALE) },
      { label: "東京出發白馬一日遊 →", url: klookFor(hakubaSkiResortDayTourTokyo.url, LOCALE) },
      { label: "八方尾根巴士加雪票加租借 →", url: klookFor(hakubaHapponeBusLiftRental.url, LOCALE) },
      { label: "GALA 湯澤雪票 →", url: klookFor(galaYuzawaLiftTicket.url, LOCALE) },
    ],
  },
  {
    n: 4,
    label: "第 4 天",
    heading: "第 4 天：東京西側，明治神宮、澀谷與一年中最清澈的夕陽",
    intro:
      "冬天是東京展望台真正值回票價的季節，因為寒冷乾燥的空氣才看得到富士山。這也是夕陽早到能排進一天之中而不是結尾的季節：12 月太陽四點半前就下山，所以可以看完夕陽再吃晚餐，不用二選一。",
    stops: [
      {
        time: "上午",
        place: "明治神宮和原宿一帶",
        allow: "2 小時",
        getting: "山手線到原宿",
        booking: "不用，神宮境內免費",
      },
      {
        time: "下午前段",
        place: "豐洲的 teamLab Planets，或步行表參道和澀谷",
        allow: "2–3 小時",
        getting: "teamLab 搭百合海鷗線到新豐洲；其他步行",
        booking: "teamLab 必須，30 分鐘一個入場時段，現場不售票",
      },
      {
        time: "日落",
        place: "SHIBUYA SKY",
        allow: "1–1.5 小時",
        getting: "車站上方的澀谷 Scramble Square 內",
        booking: "實際上必須，日落時段最先賣完",
      },
      {
        time: "晚上",
        place: "在澀谷或新宿吃晚餐，然後回去",
        allow: "2–3 小時",
        getting: "步行加山手線一站",
        booking: "不用",
      },
    ],
    book: (
      <>
兩張指定時段的票，有期限的是展望台。SHIBUYA SKY 在日本時間 0:00 開賣兩週後的日期，熱門冬季日期的日落時段最先賣完，<Link href="/guides/attractions/shibuya-sky-tickets" hrefLang="en">澀谷 SKY 門票攻略（英文）</Link>有兩種價格和預訂時間。teamLab Planets 是 30 分鐘一個入場時段、現場不售票，請看 <Link href="/zh-tw/guides/attractions/teamlab-planets-tickets">teamLab Planets 攻略</Link>。兩者都在室內或有遮蔽，如果第 3 天因雪取消，這天很適合調整。
</>
    ),
    picks: [
      { label: "SHIBUYA SKY 門票 →", url: klookFor(shibuyaSkyTicketUrl, LOCALE) },
      { label: "teamLab Planets 門票 →", url: klookFor(teamlabPlanetsTicketUrl, LOCALE) },
      { label: "東京地鐵票 →", url: klookFor(tokyoSubwayTicket.url, LOCALE) },
    ],
  },
  {
    n: 5,
    label: "第 5 天",
    heading: "第 5 天：搭北陸新幹線從東京到金澤",
    intro:
      "這段移動讓這份行程成為真正的冬季行程。北陸新幹線約兩個半小時從太平洋側穿到日本海側，天氣也跟著改變：金澤和後方的山區有東京很少見到的雪。松枝由繩索支撐、覆蓋白雪的兼六園，是這條路線最核心的畫面。",
    stops: [
      {
        time: "上午",
        place: "東京站到金澤",
        allow: "含走到月台 2.5–3 小時",
        getting: "北陸新幹線，依 JR 西日本 2 小時 28 分鐘，不用轉車",
        booking: "Kagayaki 必須：全車對號，沒有現場直接搭的選項",
      },
      {
        time: "下午前段",
        place: "放好行李，到近江町市場吃午餐",
        allow: "1.5 小時",
        getting: "從車站搭巴士或短程計程車",
        booking: "不用",
      },
      {
        time: "下午",
        place: "兼六園和金澤城公園",
        allow: "2–3 小時",
        getting: "從站前搭金澤周遊巴士",
        booking: "不用，現場購票",
      },
      {
        time: "晚上",
        place: "天黑後的東茶屋街",
        allow: "2 小時",
        getting: "從市場搭巴士或步行 25 分鐘",
        booking: "不用",
      },
    ],
    book: (
      <>
電車，以及終點的兩晚。要搭的是 <strong>Kagayaki</strong>，它有個特別的規定：全車對號，沒有自由座，所以這段不能留到當天早上。<Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en">東京到金澤攻略（英文）</Link>有時間、座位等級和有自由座的 Hakutaka。周遊券方面，全國版 JR Pass 很少適合這種旅程，<Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR Pass 攻略（英文）</Link>有計算工具；北陸拱型周遊券則常常適合，因為它正好涵蓋東京 → 金澤 → 關西，並刻意不含回程的東海道新幹線。
</>
    ),
    picks: [
      { label: "東京 → 金澤新幹線 →", url: klookFor(shinkansenTokyoKanazawa.url, LOCALE) },
      { label: "北陸拱型周遊券 →", url: klookFor(hokurikuArchPass.url, LOCALE) },
      { label: "查看 JR Pass →", url: klookFor(jrPassWholeJapanCurrent.url, LOCALE) },
    ],
  },
  {
    n: 6,
    label: "第 6 天",
    heading: "第 6 天：金澤，庭園、茶屋街與市場",
    intro:
      "整天待在一座小城是奢侈，這份行程負擔得起，因為兩晚已經訂好。金澤小巧，幾乎都能直接入內參觀，所以這是預訂最少的一天，也最適合吸收其他地方因雪失去的一天。",
    stops: [
      {
        time: "上午",
        place: "一早再訪兼六園，或金澤 21 世紀美術館",
        allow: "2–3 小時",
        getting: "周遊巴士",
        booking: "美術館的收費展建議預訂；庭園現場購票",
      },
      {
        time: "中午",
        place: "近江町市場海鮮午餐，這座市場最有名的就是冬天",
        allow: "1.5 小時",
        getting: "步行",
        booking: "不用，但吧台座位常客滿",
      },
      {
        time: "下午",
        place: "長町武家屋敷和東茶屋街",
        allow: "2–3 小時",
        getting: "步行加一趟巴士",
        booking: "不用",
      },
      {
        time: "晚上",
        place: "留在金澤早點休息，明天一早要搭預訂的巴士",
        allow: "2 小時",
        getting: "步行",
        booking: "如果還沒訂，就訂明天的巴士座位",
      },
    ],
    book: (
      <>
只有兩件事，其中一件是明天的。金澤導覽一日把兼六園、東茶屋街和近江町市場併成一次預訂，冬天下午很短，省下三段巴士很值得。重要的是明天出城的巴士：北陸鐵道說明金澤到白川鄉是全車對號，上車前必須預訂，從金澤站西口出發 1 小時 15 分鐘，乘車日一個月前開放訂位。共同經營的濃飛巴士列出成人票價 2026 年 11 月 30 日前 ¥2,800、12 月 1 日起 ¥2,900；北陸鐵道頁面在 {REREAD} 查核時仍是 ¥2,800。這一側沒有現場搭乘的備案，<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山與白川鄉攻略（英文）</Link>有說明。
</>
    ),
    picks: [
      { label: "金澤導覽一日（兼六園與東茶屋街）→", url: klookFor(kanazawaKenrokuenHigashiChayaDayTour.url, LOCALE) },
      { label: "金澤步行一日遊 →", url: klookFor(kanazawaGeishaKenrokuenCastleDayTour.url, LOCALE) },
    ],
  },
  {
    n: 7,
    label: "第 7 天",
    heading: "第 7 天：金澤到白川鄉再到高山",
    intro:
      "行程進入山區的一天，也是沒有電車的一天：白川鄉沒有火車站，這個事實決定了這一帶所有的計畫。雪中的村落是大家 1、2 月而不是 4 月來的原因，合掌屋也是真的有人居住，不是布景。",
    stops: [
      {
        time: "上午",
        place: "金澤站西口到白川鄉",
        allow: "1.5 小時",
        getting: "北陸鐵道高速巴士，1 小時 15 分鐘，2026 年 12 月 1 日起成人 ¥2,900",
        booking: "必須，全車對號，上車前要預訂",
      },
      {
        time: "上午後段到下午中段",
        place: "荻町：合掌屋、合掌造民家園、上方的城山天守閣展望台",
        allow: "2–3 小時",
        getting: "步行；展望台要爬坡",
        booking: "村落不用；展望台冬季有另外的安排",
      },
      {
        time: "下午中段",
        place: "白川鄉到高山",
        allow: "1 小時",
        getting: "濃飛巴士白川鄉線，約 50 分鐘，2026 年 12 月 1 日起成人 ¥2,900",
        booking: "部分班次標示需預約；如果當天行程靠這班車，兩端都請訂好",
      },
      {
        time: "晚上",
        place: "高山三町老街和飛驒牛晚餐",
        allow: "2–3 小時",
        getting: "從車站步行",
        booking: "旺季晚餐建議預訂",
      },
    ],
    book: (
      <>
一個幫你完成移動的導覽行程，或兩張巴士票。金澤出發的商品是唯一能把你送到高山而不是送回金澤的，正好符合這段需要，時間 8 到 10 小時，有英語持證導遊。自己走的話，上面是業者官方票價，2026 年 12 月 1 日調漲：金澤 → 白川鄉 ¥2,900，再到高山約 50 分鐘 ¥2,900，各由 ¥2,800 調高。兩段都是民營高速巴士，任何 JR 周遊券都不適用。
</>
    ),
    picks: [
      { label: "金澤出發白川鄉與高山一日 →", url: klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE) },
      { label: "白川鄉線巴士票 →", url: klookFor(shirakawagoLineBusTicket.url, LOCALE) },
    ],
  },
  {
    n: 8,
    label: "第 8 天",
    heading: "第 8 天：高山，若碰上四個日期之一就去白川鄉點燈",
    intro:
      "這是行程中唯一不能臨時決定的晚上。白川鄉冬季點燈只有四個晚上：2027 年 1 月 11、17、24、31 日，每晚 17:30 到 19:30，由白川鄉觀光協會以完全事前預約加入場券的方式舉辦。公告說得很清楚：當天不售票，沒票到現場也進不去。如果旅程不在這四天，這天就是高山之日，也很好。",
    stops: [
      {
        time: "上午",
        place: "宮川朝市和三町老街",
        allow: "2–3 小時",
        getting: "步行",
        booking: "不用",
      },
      {
        time: "中午",
        place: "飛驒民俗村（飛驒之里），不用搭巴士就能看雪屋頂村落",
        allow: "2 小時",
        getting: "從車站搭路線巴士",
        booking: "不用",
      },
      {
        time: "下午",
        place: "五箇山與白川鄉導覽一日，或在市區悠閒度過下午",
        allow: "導覽版最長 7 小時 20 分鐘",
        getting: "從車站旁的巴士總站搭濃飛巴士",
        booking: "建議",
      },
      {
        time: "17:30–19:30，僅 2027 年 1 月 11、17、24、31 日",
        place: "白川鄉點燈",
        allow: "依濃飛巴士 2027 年時刻表，各路線 4 小時 40 分鐘到 5 小時 35 分鐘",
        getting: "高山出發的預約巴士，14:40 到 15:40 出發；這個活動沒有不預約的去法",
        booking: "必須提前預訂，當天完全不售票",
      },
    ],
    book: (
      <>
如果日期是這四天之一，請比旅程其他項目都先訂。協會公布五種參加方式，{REREAD} 查核時有兩種幾乎已無法使用：村內住宿抽籤已於 10 月 31 日截止，第一輪停車場預約售罄，第二輪 12 月 1 日 13:00 開放，五人以內 ¥7,000。旅行社行程 12 月 2 日 13:00 公布。不需要車也不需要住村內的方式是濃飛巴士從高山出發的點燈巴士，11 月 2 日起四晚都開賣：含戶外博物館 ¥13,000、含溫泉 ¥14,000、含展望台 ¥16,000（唯一能到展望台的路線），只能透過日文網路系統預訂。Klook 高山出發的點燈一日遊時間 5 到 5.5 小時，同樣可選博物館或展望台，但索引尚未顯示 2027 年的日期，請在商品頁確認你的日期。如果不是這四天，就改走五箇山一日遊，加上相倉和民家園，<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山與白川鄉攻略（英文）</Link>依出發地逐一說明。
</>
    ),
    picks: [
      { label: "高山出發白川鄉點燈一日 →", url: klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE) },
      { label: "白川鄉與五箇山世界遺產一日 →", url: klookFor(takayamaShirakawagoGokayamaUnescoTour.url, LOCALE) },
    ],
  },
  {
    n: 9,
    label: "第 9 天",
    heading: "第 9 天：高山到京都，漫長的下山路",
    intro:
      "這是移動日，也是這條路線唯一真的花掉大半天的日子。高山本線特急沿河谷下到名古屋，再轉東海道新幹線，雪中很美，任何天氣都慢。抵達京都後看一座點燈的寺院就好，不要想看三座。",
    stops: [
      {
        time: "上午",
        place: "搭特急沿飛驒河谷從高山到名古屋",
        allow: "大半個上午",
        getting: "高山本線特急，請訂靠河一側的座位",
        booking: "建議，單線鐵路，班次有限",
      },
      {
        time: "中午",
        place: "名古屋到京都",
        allow: "電車 40 分鐘到一小時",
        getting: "東海道新幹線；Hikari 可用周遊券，Nozomi 不行",
        booking: "旺季建議",
      },
      {
        time: "下午中段",
        place: "在京都站附近辦入住，再步行到東本願寺或東寺",
        allow: "2 小時",
        getting: "步行",
        booking: "不用",
      },
      {
        time: "晚上",
        place: "一處冬季夜間點燈，京都在寒冷月份會點亮部分寺院",
        allow: "2 小時",
        getting: "市區巴士或地鐵",
        booking: "請查寺院公告日期；多數現場售票",
      },
    ],
    book: (
      <>
這天沒有什麼需要透過我們購買，這正是要特別說明的：鐵路就是一整天。如果持周遊券，飛驒特急和東海道新幹線 Hikari 都可搭，Nozomi 不行，到京都差約半小時，<Link href="/guides/transport/tokyo-to-kyoto" hrefLang="en">東京到京都攻略（英文）</Link>用同一條線說明。值得做的是訂飛驒的座位：單線鐵路班次少，在車廂連接處站兩小時太浪費行程最美的風景。
</>
    ),
    picks: [
      { label: "查看這幾段的 JR Pass →", url: klookFor(jrPassWholeJapanCurrent.url, LOCALE) },
      { label: "東京 ⇄ 京都新幹線車票 →", url: klookFor(shinkansenTokyoKyoto.url, LOCALE) },
    ],
  },
  {
    n: 10,
    label: "第 10 天",
    heading: "第 10 天：寒冷中的京都，金閣寺、伏見稻荷與嵐山",
    intro:
      "京都是冬天帶來最多好處的城市，原因並不浪漫：新年週到梅花開之間人潮最少，著名景點幾乎都能直接入內參觀。屋頂覆雪的金閣寺人人想拍，卻沒人能計畫：京都 1 月均溫 4.8°C，穿錯外套會很難受，卻不足以保證下雪。",
    stops: [
      {
        time: "一早",
        place: "趁遊覽車到達前去伏見稻荷",
        allow: "2 小時",
        getting: "JR 奈良線，京都站兩站",
        booking: "不用，全天開放、免費，任何季節都以 07:00 最好",
      },
      {
        time: "上午後段",
        place: "金閣寺",
        allow: "1 小時",
        getting: "京都站搭市區巴士 101 或 205",
        booking: "不用，現場購票",
      },
      {
        time: "下午",
        place: "嵐山：竹林、天龍寺、桂川畔",
        allow: "3 小時",
        getting: "JR 嵯峨野線到嵯峨嵐山",
        booking: "竹林不用；嵯峨野小火車 2026/12/30～2027/2/28 停駛，3/1 起改用新車並加收座位費，請不要以它安排一天",
      },
      {
        time: "晚上",
        place: "天黑後的祇園和先斗町",
        allow: "2–3 小時",
        getting: "巴士或京阪線",
        booking: "晚餐建議預訂",
      },
    ],
    book: (
      <>
京都幾乎不用訂什麼，城市攻略也這麼說。預訂換來的是解決巴士問題：一個導覽一日連起金閣寺、伏見稻荷和嵐山，省下三段市區巴士，在冬天短短的下午，這就是三個景點和兩個的差別。和服租借也值得預約而不是現場去，冬季方案有羽織。住哪裡比訂什麼更重要：<Link href="/guides/attractions/where-to-stay-in-kyoto" hrefLang="en">京都住宿攻略（英文）</Link>用交通時間而不是氣氛比較車站、市中心和嵐山。
</>
    ),
    picks: [
      { label: "京都精華巴士一日 →", url: klookFor(kyotoHighlightBusTour.url, LOCALE) },
      { label: "京都與奈良導覽一日 →", url: klookFor(kyotoNaraKiyomizuTour.url, LOCALE) },
      { label: "京都和服租借 →", url: klookFor(kyotoKimonoYumeyakata.url, LOCALE) },
    ],
  },
  {
    n: 11,
    label: "第 11 天",
    heading: "第 11 天：京都到大阪，以及夜間點亮的庭園",
    intro:
      "JR 新快速三十分鐘，旅程的氣氛就變了：冬天的大阪是室內和夜晚的城市，很適合這個季節。要記下的是 teamLab 植物園大阪，因為它是只在夜間開放的戶外場地，這段期間最後入場 20:30，要為它安排晚上，而不是硬塞進去。",
    stops: [
      {
        time: "上午",
        place: "京都到大阪，行李放飯店",
        allow: "含移動 1.5 小時",
        getting: "JR 新快速或阪急線，都約 30 分鐘",
        booking: "不用",
      },
      {
        time: "中午",
        place: "大阪城，或黑門市場午餐",
        allow: "2–3 小時",
        getting: "御堂筋線和中央線",
        booking: "不用，都可直接入內",
      },
      {
        time: "下午",
        place: "道頓堀和心齋橋，或河川遊船",
        allow: "2 小時",
        getting: "從難波步行",
        booking: "遊船建議預訂",
      },
      {
        time: "18:00 起",
        place: "teamLab 植物園大阪，長居",
        allow: "另加交通 1.5–2 小時",
        getting: "御堂筋線到長居（M26），3 號出口步行約 10 分鐘",
        booking: "建議，成人比現場便宜 ¥200，現場可能售罄",
      },
    ],
    book: (
      <>
兩件事，以及一張決定第一件要不要買的票。大阪周遊卡涵蓋 40 多處設施和其間的地鐵，對排得滿滿的大阪一天很划算，但不含 teamLab 庭園，那是另一張票。teamLab 官方票價成人 ¥1,800、6 到 15 歲 ¥500，現場 ¥2,000 和 ¥600；<Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets" hrefLang="en">teamLab 植物園大阪攻略（英文）</Link>有依日期的時間、雨天規定和官方票可改期三次的說明。住宿方面，住在御堂筋線上，21:00 在長居結束也只要一班車，<Link href="/guides/attractions/where-to-stay-in-osaka" hrefLang="en">大阪住宿攻略（英文）</Link>有比較。
</>
    ),
    picks: [
      { label: "teamLab 植物園大阪 →", url: klookFor(teamlabBotanicalGardenOsakaTicket.url, LOCALE) },
      { label: "大阪周遊卡 →", url: klookFor(osakaAmazingPass.url, LOCALE) },
      { label: "道頓堀河川遊船 →", url: klookFor(dotonboriCityCruise.url, LOCALE) },
    ],
  },
  {
    n: 12,
    label: "第 12 天",
    heading: "第 12 天：從關西離開",
    intro:
      "離開當天有個冬季特有的警告：兩百公里外的降雪也可能影響到這個早上，因為東海道和北陸線都連到關西路網。請比時刻表多留一小時，把機場交通事先訂好，不要在月台上才想辦法。",
    stops: [
      {
        time: "上午",
        place: "飯店一站之內剩下想去的地方",
        allow: "1–2 小時",
        getting: "步行",
        booking: "不用",
      },
      {
        time: "中午",
        place: "大阪到關西國際機場",
        allow: "從出門到登機口 1.5–2 小時",
        getting: "天王寺或新大阪搭 JR HARUKA，或難波搭南海 Rapi:t",
        booking: "建議，冬季週日有行李空間的對號座值得多花幾百日圓",
      },
      {
        time: "在機場",
        place: "如果有購物，到退稅櫃台",
        allow: "30–45 分鐘",
        getting: "依航廈指標",
        booking: "不用",
      },
    ],
    book: (
      <>
只有機場交通。選哪一個看你住哪裡：HARUKA 從天王寺和新大阪出發，Rapi:t 從難波出發，<Link href="/guides/transport/haruka-vs-nankai-rapit" hrefLang="en">HARUKA 與南海 Rapi:t 比較（英文）</Link>把時間和價格並列。巴士和伊丹機場請看<Link href="/guides/transport/osaka-airport-transfer" hrefLang="en">大阪機場交通攻略（英文）</Link>。
</>
    ),
    picks: [
      { label: "JR HARUKA 車票 →", url: klookFor(jrHarukaUrl, LOCALE) },
      { label: "南海 Rapi:t 車票 →", url: klookFor(nankaiRapitUrl, LOCALE) },
    ],
  },
];

const baseRows = [
  { base: "東京", nights: "4", why: "兩個城市日、一個雪地來回和燈飾夜晚，這是冬天勝過夏天的真正優勢" },
  { base: "金澤", nights: "2", why: "雪中的兼六園，也是這一側唯一有預約制白川鄉巴士出發的據點" },
  { base: "高山", nights: "2", why: "老街，也是 1 月四個晚上濃飛巴士點燈巴士的據點，不需要車也不需要住村內" },
  { base: "京都", nights: "2", why: "可直接入內參觀的景點一年中人最少，幾乎不用預訂" },
  { base: "大阪", nights: "1", why: "室內與夜晚的城市，加上夜間限定的 teamLab 庭園，飯店樓下就是往關西機場的車" },
];

const tempRows = [
  { city: "東京", dec: "7.7°C (12.0 / 3.8)", jan: "5.4°C (9.8 / 1.2)", feb: "6.1°C (10.9 / 2.1)" },
  { city: "京都", dec: "7.2°C", jan: "4.8°C", feb: "5.4°C" },
  { city: "大阪", dec: "8.7°C (12.3 / 5.3)", jan: "6.2°C (9.7 / 3.0)", feb: "6.6°C (10.5 / 3.2)" },
  { city: "札幌", dec: "−0.9°C (2.0 / −4.0)", jan: "−3.2°C (−0.4 / −6.4)", feb: "−2.7°C (0.4 / −6.2)" },
];

const datedRows = [
  {
    event: "白川鄉冬季點燈（第 41 屆）",
    when: "2027 年 1 月 11、17、24、31 日，每晚 17:30–19:30",
    rule: "完全事前預約加入場券。協會明確表示當天不售票，沒預約到現場也進不去，並公布五種參加方式。村內住宿抽籤已於 10 月 31 日截止，第二輪停車場 12 月 1 日 13:00 開放，濃飛巴士高山點燈巴士四晚都開賣中",
    source: "白川鄉觀光協會；濃飛巴士",
  },
  {
    event: "札幌雪祭（第 77 屆）",
    when: "2027 年 2 月 4–11 日，共八天",
    rule: "免費入場，大通會場（西 1 到西 11 丁目）和薄野會場（站前通南 4 到南 6 條）都不用票。賣光的是城市本身：札幌住宿和新千歲航班幾個月前就滿，這才是這個活動真正要訂的",
    source: "札幌雪祭執行委員會",
  },
  {
    event: "小樽雪燈之路（第 29 屆）",
    when: "2027 年 2 月 6–13 日，與札幌雪祭重疊",
    rule: "日期已定；小樽觀光協會表示詳情稍後公布，所以時間和會場待官方公布",
    source: "小樽觀光協會；北海道官方觀光網站",
  },
  {
    event: "支笏湖冰濤祭",
    when: "2027 年 1 月 30 日–2 月 23 日，每天 10:00–20:00，16:30–20:00 點燈",
    rule: "需門票，小學生以下免費。北海道官方觀光網站沒有列出成人票價，所以我們也不寫",
    source: "北海道官方觀光網站",
  },
  {
    event: "滑雪與租借",
    when: "二世谷預定 2026 年 11 月 28 日；GALA 湯澤雪道 2026 年 12 月 19 日起；白馬開幕日期待官方公布",
    rule: "巴士加雪票加裝備的套裝按日期販售。租借值得提早確定：當天早上店裡沒有你的鞋碼就沒有其他選擇，不過 Klook 的八方尾根套裝是當天在度假村店取用裝備",
    source: "Niseko United；GALA 湯澤；Hakuba Valley；Klook 商品",
  },
  {
    event: "teamLab 植物園大阪",
    when: "僅夜間開放，2027 年 1 月 31 日前最後入場 20:30",
    rule: "現場有當日票，但成人貴 ¥200，也可能售罄。官網票在入場當天 21:00 前可改期三次",
    source: "teamLab",
  },
];

const snowRows = [
  {
    place: "湯澤與苗場（新潟）",
    getting: "東京站搭上越新幹線，不用轉車，GALA 湯澤的車站和纜車站是同一棟建築",
    season: "依 GALA 官方行事曆雪道 2026 年 12 月 19 日到 2027 年 5 月 5 日；12 月 12–18 日僅觀光運行",
    forWhom: "不用多住一晚，在東京行程中加入一個雪日",
  },
  {
    place: "白馬（長野）",
    getting: "東京搭巴士，或北陸新幹線到長野再轉巴士",
    season: "依 Hakuba Valley 季票預定 2026 年 12 月到 2027 年 5 月初；各雪場開幕日期待官方公布",
    forWhom: "真正的滑雪，一張山谷通票玩四座雪場",
  },
  {
    place: "白川鄉與高山（岐阜）",
    getting: "金澤或高山搭預約高速巴士；白川鄉完全沒有火車站",
    season: "1 月和 2 月積雪最深",
    forWhom: "雪屋頂村落的照片，不是滑雪",
  },
  {
    place: "二世谷與留壽都（北海道）",
    getting: "新千歲機場直達巴士，能放雪具",
    season: "Niseko United 預定四區 2026 年 11 月 28 日開放，依區域 2027 年 4 月 4 日到 5 月 5 日關閉",
    forWhom: "以雪而不是城市為主的旅程",
  },
  {
    place: "札幌與小樽（北海道）",
    getting: "飛新千歲，再搭電車或預約接送",
    season: "12、1、2 月地上都有雪，依氣象廳平年值光 1 月降雪就有 137 公分",
    forWhom: "把雪當成城市體驗，再加上 2 月的祭典",
  },
];

const packRows = [
  { item: "真正的外套，而不是厚毛衣", why: "依氣象廳平年值，1 月平均最低東京 1.2°C、札幌 −6.4°C。每棟建築和每班電車暖氣都很強，所以防風外殼加多層穿搭勝過一件厚重衣物" },
  { item: "有抓地力的鞋和備用襪子", why: "高山人行道或寺院小路上壓實的雪，是這份行程唯一的危險，白川鄉展望台還要爬坡" },
  { item: "手套和能蓋住耳朵的東西", why: "這份計畫的戶外部分都在天黑後：燈飾、點燈、teamLab 庭園，這時氣溫接近最低，而不是平均" },
  { item: "比你想的更少的衣服，加上投幣洗衣計畫", why: "冬裝體積大，這條路線要換五次據點，對號座又有行李限制。日本飯店幾乎都有投幣洗衣機" },
  { item: "護唇膏和護手霜", why: "太平洋側的冬天又冷又乾，這正是東京展望台看得到富士山的原因，也是第 4 天手開始乾裂的原因" },
  { item: "雪地本身不用帶什麼", why: "要滑雪就在度假村租。裝備可在出發前預訂，自帶雪靴很少值得付行李費" },
];

const hokkaidoRows = [
  { leg: "第 1–4 天", plan: "東京，和上面完全相同，燈飾夜晚和雪日不變" },
  { leg: "第 5 天", plan: "羽田飛新千歲，或持 JR 東日本南北海道周遊券搭東北與北海道新幹線。預約接送進札幌" },
  { leg: "第 6–7 天", plan: "雪祭會場：大通西 1 到西 11 丁目、薄野站前通和 Tsudome 會場。全部免費入場，全在戶外，平均最高 0.4°C" },
  { leg: "第 8 天", plan: "一日遊：小樽和雪上樂園（小樽雪燈之路 2027 年 2 月 6–13 日），或在企鵝散步的季節去旭山動物園，或支笏湖冰濤祭半日（2027 年 1 月 30 日–2 月 23 日）" },
  { leg: "第 9–11 天", plan: "搭能放雪具的機場巴士去二世谷或留壽都，或想兩者都要就回東京走主要路線的金澤那一半" },
  { leg: "第 12 天", plan: "從新千歲離開，或回到東京。這個版本唯一的風險是 2 月下雪關閉機場，所以不要訂當天最後一班" },
];

const faqItems = [
  {
    q: "日本冬天值得去嗎？",
    a: `值得，而且有三個其他季節沒有的理由。可直接入內的景點，也就是京都大部分和整個奈良公園，在新年週到梅花開之間人最少。太平洋側空氣乾燥清澈，只有這時能穩定從東京展望台看到富士山。而夏天只是次要繞路的日本海側成了主角：金澤兼六園和白川鄉合掌村在雪中都更美。代價是日照。12 月下午四點半左右就天黑，觀光時間變短，所以這份行程在東京每天都排了晚上的活動，而不是當成附加。`,
  },
  {
    q: "冬天去日本要帶什麼？",
    a: `防風外殼加多層穿搭、有抓地力的鞋、手套，以及比你想的少得多的行李。重要數字是日本氣象廳 1991–2020 年平年值（查核日：${CHECKED}）：1 月平均最低東京 1.2°C，月均溫京都 4.8°C、大阪 6.2°C，平均最低札幌 −6.4°C。所以本州是穿大衣的天氣，還不到遠征等級，北海道則真的很冷。有三個實用重點：電車、商店和餐廳暖氣都很強，一件脫不掉的厚衣服比三件薄的差。冬季旅程的戶外部分幾乎都在天黑後，氣溫接近最低。要滑雪就在度假村租，出發前就能預訂。`,
  },
  {
    q: "日本 12 月、1 月、2 月有多冷？",
    a: `依日本氣象廳 1991–2020 年平年值，東京 12 月 7.7°C、1 月 5.4°C、2 月 6.1°C，1 月平均最高 9.8°C、最低 1.2°C。京都三個月都比東京低約一度：7.2°C、4.8°C、5.4°C。大阪高約一度：8.7°C、6.2°C、6.6°C。札幌完全是另一回事：−0.9°C、−3.2°C、−2.7°C，1 月平均最高在冰點以下 −0.4°C，光 1 月降雪就有 137 公分。1 月是這些地方最冷的月份，2 月比 1 月略暖。查核日：${CHECKED}。`,
  },
  {
    q: "在日本哪裡看得到雪？",
    a: `通常不是東京、京都或大阪，這三座太平洋側城市下雪是新聞，不是季節。雪在日本海側和山區，離東京最近又可靠的是新潟湯澤：GALA 湯澤從東京站搭上越新幹線不用轉車，車站和纜車站是同一棟建築，所以不用滑雪假期也能滑一天。長野白馬也能當天往返，雪質更好。把雪當風景而不是運動的話，1、2 月的白川鄉和高山就是這份行程的核心。北海道當然有雪：札幌 1 月降雪平年值 137 公分。`,
  },
  {
    q: "冬季行程要提前預訂嗎？",
    a: `這份行程有兩件事絕對要，其他比你想的少。白川鄉點燈 2027 年只有四個晚上（1 月 11、17、24、31 日，每晚 17:30–19:30），完全事前預約，協會公告寫明當天不售入場券。金澤到白川鄉高速巴士全車對號，北陸鐵道要求上車前預訂，沒有現場備案。此外，北陸新幹線 Kagayaki 完全沒有自由座，滑雪租借最先缺你的尺寸，SHIBUYA SKY 日落時段在開賣瞬間就賣完。其他幾乎都能直接去：京都寺院、兼六園、東京免費燈飾、雪祭會場。`,
  },
  {
    q: "冬天去日本要幾天？",
    a: "本頁路線最少 10 天，不趕要 12 天，想加北海道和北陸兩邊要 14 天。冬天對短程特別不利，原因有二：白天短，同樣的一天比 5 月能做的少；天氣風險真實存在，沒有餘裕的計畫就沒地方移動因雪取消的一天。只有一週的話，刪高山和金澤而不是東京，改走東京、京都、大阪的一週，晚上加燈飾。有 10 天的話，10 天行程是同一路線，也放得下冬季計畫。",
  },
  {
    q: "新幹線下雪時會開嗎？",
    a: `會，這是 2 月在日本旅行最讓人安心的事之一。上越和東北線照常穿過已開發國家中雪量最大的地區，配有灑水設備和防雪棚。真正會發生的是延誤而不是停駛，而且會擴散：新潟或岐阜的雪可能讓幾小時外的東海道線延誤。實用原則是：當天有班機就留一小時緩衝，不要訂關西或新千歲的最後一班，手機保持上網，延誤和替代交通的通知都這樣傳來。`,
  },
  {
    q: "新年期間不適合去嗎？",
    a: `這是冬天唯一要繞開而不是排進去的一週。約 12 月 29 日到 1 月 3 日，博物館和許多餐廳休息，電車和新幹線是全年最滿，這份行程每座城市的房價都到最高。神社是例外，也是有人還是去的原因：初詣，也就是新年第一次參拜，在明治神宮和伏見稻荷很壯觀，都免費。如果日期只能在這週，請在 30 天前開放預訂時立刻訂鐵路座位，並把可直接入內的景點當成要預訂的來看待。`,
  },
  {
    q: "這條冬季路線值得買 JR Pass 嗎？",
    a: `全國版大概不值得，北陸拱型周遊券則很可能值得。全國版要靠很多長途才回本，這條路線只有兩段：東京到金澤，以及高山到京都那天。北陸拱型周遊券連續七天涵蓋東京到敦賀的北陸新幹線和關西地區，刻意不含東海道新幹線，正好符合從金澤出去、經京都大阪回來的旅程。兩種都不含往白川鄉的高速巴士，那是民營，請另外編預算。JR Pass 攻略有依自己路段計算的工具。`,
  },
  {
    q: "冬天可以帶小孩走這份行程嗎？",
    a: `大部分可以，要調整兩處。第一是晚上：燈飾、白川鄉點燈和 teamLab 庭園都是天黑後的寒冷外出，濃飛巴士點燈巴士最早 20:20 才回到高山，對小小孩太晚。第二是第 9 天的移動日，大半天都在兩班車上，孩子小的話值得拆開或刪掉。適合的是雪日，玩雪不需技術也不用雪票，北海道的雪上樂園半日就是為此設計。teamLab 植物園大阪也是全線最便宜的親子票，6 到 15 歲 ¥500、學齡前免費，但商品說明提醒有閃光和大聲響。`,
  },
];

const TITLE = "日本冬季行程（2027）：12 天路線逐日安排";
const DESC =
  "日本冬季行程 12 天怎麼排：東京、金澤、白川鄉、高山、京都與大阪，每天一張表，並附冬季活動日期、氣溫與該先預訂的項目。";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function JapanWinterItineraryPage({ updated }: { updated: PageUpdated }) {
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
日本冬季行程：<br />12 天逐日安排
</h1>
          <p className={styles.heroSubtitle}>
東京、金澤、白川鄉、高山、京都與大阪，加上日期固定的兩個冬季活動，以及現場完全不賣票的那一個。
</p>
          <div className={styles.heroBadges}>
            {[`更新於 ${monthLabel(updated.iso, LOCALE)}`, "12 天每天一張表", "2027 年冬季活動日期", "官方氣溫"].map((t) => (
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
          heading={"日本冬季行程要先訂什麼？"}
          checkedIso="2026-11-06"
          deadline={
            <>
先訂 1 月的點燈：濃飛巴士高山出發四晚都開賣了，當天不售票，下一輪停車場 12 月 1 日開放，請在 <strong>11 月 30 日</strong>前訂好座位。如果旅程圍繞 2 月 4–11 日的雪祭，住宿和機票也請同一天前確定。
</>
          }
          tours={[
            {
              title: "金澤出發白川鄉與高山一日遊",
              url: klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE),
              price: null,
              duration: "8–10 小時",
              departs: "金澤，可回金澤或單程到高山",
            },
            {
              title: "名古屋出發白川鄉點燈行程，2027 年四晚",
              url: klookFor(shirakawagoLightUp2027NagoyaTour.url, LOCALE),
              price: null,
              duration: "10–12 小時",
              departs: "名古屋，可選飯店接送",
            },
            {
              title: "白馬滑雪一日遊，四座雪場任選",
              url: klookFor(hakubaSkiResortDayTourTokyo.url, LOCALE),
              price: null,
              duration: "約 11 小時 20 分鐘",
              departs: "東京，專車",
            },
          ]}
        />

                <section className={styles.bodySection}>
          <p className={styles.bodyText}>
這份<strong>日本冬季行程</strong>共<strong>十二天、五個據點</strong>（東京 4 晚、金澤 2 晚、高山 2 晚、京都 2 晚、大阪 1 晚），圍繞冬天改變的三件事，而不是景點清單。主軸是依 JR 西日本 <strong>2 小時 28 分鐘</strong>的北陸新幹線東京到金澤，再搭預約高速巴士進山，然後走東海道線下到關西。有兩個日期固定不能改：<strong>白川鄉冬季點燈只有 2027 年 1 月 11、17、24、31 日四個晚上，每晚 17:30–19:30，主辦單位當天完全不售票</strong>；<strong>第 77 屆札幌雪祭是 2027 年 2 月 4–11 日</strong>，免費入場。白天很短，12 月下午四點半左右就天黑，依日本氣象廳 1991–2020 年平年值，1 月均溫東京 5.4°C、札幌 −3.2°C。下面的活動日期、氣溫和票價都附出處：活動日期和巴士票價於 {REREAD} 重新查核，氣候平年值於 {CHECKED} 查核。
</p>
        </section>

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
天數
</p>
                <p className={styles.verdictStatValue}>
12 天，5 個據點
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
先訂
</p>
                <p className={styles.verdictStatValue}>
白川鄉點燈
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
最長路段
</p>
                <p className={styles.verdictStatValue}>
東京 → 金澤，2 小時 28 分鐘
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
1 月均溫
</p>
                <p className={styles.verdictStatValue}>
東京 5.4°C，札幌 −3.2°C
</p>
              </div>
            </div>
            <p className={styles.verdictText}>
<strong>重點：</strong>先確定有日期的：點燈的晚上、金澤預約巴士、全車對號的 Kagayaki 和住宿；京都幾乎不用訂，旺季也大多可直接入內。
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink
                href={klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE)}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
              >
查看白川鄉點燈一日 →
</KlookLink>
              <KlookLink
                href={klookFor(hokurikuArchPass.url, LOCALE)}
                target="_blank"
                rel="sponsored noopener"
                className={styles.pickCta}
              >
查看北陸拱型周遊券 →
</KlookLink>
            </div>
          </div>
        </div>

                <KlookTripPrep
          label={"同一趟旅程要訂的"}
          heading={"出發前要訂什麼？"}
          intro={"依冬季旅程的重要順序列出：傳遞天氣通知的網路、東京兩座機場的單程交通、真正符合這條路線的周遊券、周遊券的比較，以及燈飾路線所在的東京地鐵票。"}
          items={sameTripItems}
        />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
架構
</span>
          <h2 className={styles.sectionTitle}>
日本冬天 12 天怎麼分配？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
五個據點，不是八個，因為冬天白天短，1 月的移動日比 5 月代價更高。特別的選擇是高山兩晚，這正是讓計畫可行的關鍵：濃飛巴士在 1 月四個點燈晚上從那裡自營巴士，所以不需要車，也不需要住村內。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["據點", "晚數", "為什麼列入"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {baseRows.map((row) => (
                    <tr key={row.base}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.base}</td>
                      <td className={styles.tdPrice}>{row.nights}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
如果旅程長度或季節不同，<Link href="/guides/attractions/japan-10-day-itinerary" hrefLang="en">日本 10 天行程（英文）</Link>和<Link href="/guides/attractions/japan-14-day-itinerary" hrefLang="en">日本 14 天行程（英文）</Link>走東京到京都大阪、不繞北陸，<Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" hrefLang="en">東京、京都、大阪 7 天行程（英文）</Link>則是一週版本。下面十二天每天都有一張表：時段、地點、預留時間、交通方式、是否要預訂，下方是當天的商品。
</p>
        </section>

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
十二張表的「預留時間」是我們的規劃估計，不是業者數字。車程和票價是業者官方：北陸新幹線 2 小時 28 分鐘出自 JR 西日本，轉引自<Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>東京到金澤攻略（英文）</Link>；白川鄉巴士票價和車程出自濃飛巴士和北陸鐵道，於 {REREAD} 重新查核，完整情況請看<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>高山與白川鄉攻略（英文）</Link>。
</p>

                <KlookStayAreas
          heading={"日本冬季旅行住哪裡好？"}
          intro={"十二天五個據點，冬天比平常多一個條件：天黑後拖行李從車站要走多遠。下面每項都是該區域的 Klook 飯店搜尋，依計畫實際使用的路線或巴士總站挑選。住宿攻略對東京、京都和大阪內部有更詳細的比較。"}
          areas={japanWinterStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "雪日最省事的冬季據點：滑雪巴士和往箱根的小田急線從這座車站下方出發，山手線就在門口，方便燈飾夜晚。", area: "東京新宿" }, { why: "適合兩次搭新幹線離開東京的計畫：往 GALA 湯澤的上越線和往金澤的北陸線都從下方出發，走出大樓就是丸之內燈飾。", area: "東京站／丸之內" }, { why: "北陸新幹線終點的兩晚，兼六園巴士和預約制白川鄉巴士都從站前出發，這是旅程中最沒有餘裕的一段。", area: "金澤" }, { why: "這條路線在山區過夜的地方，也是 1 月白川鄉點燈巴士的據點：濃飛巴士總站就在車站旁，19:30 結束後走回去就好，不用轉車。", area: "高山站" }, { why: "飛驒和東海道列車抵達的地方，也是 100 和 101 觀光巴士的起點，還是離開當天清晨搭機場 HARUKA 的月台。", area: "京都站" }, { why: "御堂筋線、步行可到道頓堀和黑門市場，樓下是往關西機場的南海總站，也能直達南邊的長居，那裡的 teamLab 庭園 18:00 後才開放。", area: "大阪難波" }, { why: "2 月替換版的城市據點：到大通公園一站地鐵或走一小段，雪祭會場在戶外、2 月平均最高 0.4°C 時正需要這樣。", area: "札幌站" }, { why: "只有以雪而不是城市為主的旅程才值得單獨當據點：纜車就在門口，能放雪具的機場巴士從新千歲直達。", area: "二世谷" }] as Partial<typeof item>[])[i]))}
        />

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3rem" }}>
三座城市的攻略比搜尋更深入：<Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en" style={{ color: "var(--red)", fontWeight: 600 }}>東京住宿攻略（英文）</Link>依路線和機場比較，<Link href="/guides/attractions/where-to-stay-in-kyoto" hrefLang="en" style={{ color: "var(--red)", fontWeight: 600 }}>京都住宿攻略（英文）</Link>依到寺院的時間，<Link href="/guides/attractions/where-to-stay-in-osaka" hrefLang="en" style={{ color: "var(--red)", fontWeight: 600 }}>大阪住宿攻略（英文）</Link>依飯店樓下的機場交通。這條路線上，金澤和高山值得直接付錢住車站旁，因為兩班預約巴士都從車站旁出發，而且都很早。
</p>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
據點之間的移動
</span>
          <h2 className={styles.sectionTitle}>
據點之間怎麼移動，周遊券划算嗎？
</h2>
          <p className={styles.bodyText}>
兩段長途鐵路、兩段預約高速巴士和一個移動日。容易出錯的不是長度，這裡沒有超過約三小時的路段，而是預約：北陸快車完全沒有自由座，金澤側往白川鄉的巴士沒預約上不了車。
</p>
          <ul className={styles.pickList}>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>東京 → 金澤，2 小時 28 分鐘。</strong>JR 西日本的北陸新幹線官方數字，不用轉車。<strong>Kagayaki</strong> 是快車，全車對號（JR 西日本寫作全車指定席），所以這段必須預訂。Hakutaka 較慢，有自由座。詳情請看<Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en">東京到金澤攻略（英文）</Link>。
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>金澤 → 白川鄉，1 小時 15 分鐘，2026 年 12 月 1 日起成人 ¥2,900。</strong>依濃飛巴士票價表 11 月 30 日前 ¥2,800，從金澤站西口出發。全車對號，一個月前開放訂位，北陸鐵道說明上車前必須預訂，這一側沒有現場備案。
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>白川鄉 → 高山，約 50 分鐘，2026 年 12 月 1 日起成人 ¥2,900。</strong>濃飛巴士白川鄉線，11 月 30 日前 ¥2,800。時刻表上部分班次標示需預約，其餘不對號，所以有現場座位，但數量有限，而且白川鄉沒有火車站，沒有電車替代。
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>高山 → 京都，大半天。</strong>高山本線特急到名古屋，再搭東海道新幹線。Hikari 可用周遊券、Nozomi 不行，東京到京都差別是 2 小時 45 分鐘對 2 小時 15 分鐘，<Link href="/guides/transport/tokyo-to-kyoto" hrefLang="en">東京到京都攻略（英文）</Link>有計算。
</span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
<strong>京都 → 大阪，約 30 分鐘。</strong>JR 新快速或阪急線。這份行程唯一不用規劃的一段。
</span>
            </li>
          </ul>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
周遊券方面，全國版 JR Pass 要靠長途回本，這條路線只有兩段，所以請實際計算，不要憑感覺。<strong>北陸拱型周遊券</strong>才符合這趟旅程的形狀：連續七天涵蓋東京到敦賀的北陸新幹線和關西地區，刻意不含東海道新幹線，所以只適合去回走不同路線。兩者都不含民營的白川鄉巴士。<Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR Pass 攻略（英文）</Link>有依自己路段計算的工具，<Link href="/guides/transport/shinkansen-guide" hrefLang="en">新幹線攻略（英文）</Link>說明座位等級和預訂。
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={klookFor(hokurikuArchPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
查看北陸拱型周遊券 →
</KlookLink>
            <KlookLink href={klookFor(jrPassWholeJapanCurrent.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
查看 JAPAN RAIL PASS →
</KlookLink>
            <KlookLink href={klookFor(shinkansenTokyoKanazawa.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
東京 → 金澤車票 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
天氣
</span>
          <h2 className={styles.sectionTitle}>
日本 12 月、1 月、2 月有多冷？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
本州是穿大衣的天氣，北海道則真的冷；1 月到處都是最冷的月份，2 月略暖而不是更糟。下面是日本氣象廳 1991–2020 年氣候平年值：先列月均溫，影響穿著的地方在括號內列平均最高和最低。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["城市", "12 月", "1 月", "2 月"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tempRows.map((row) => (
                    <tr key={row.city}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.city}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.dec}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.jan}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.feb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
月平均氣溫，括號內為平均最高和最低，出自日本氣象廳 1991–2020 年東京、京都、大阪和札幌平年值，查核日：{CHECKED}。同一表中札幌月降雪為 12 月 113 公分、1 月 137 公分、2 月 116 公分。這些數字沒顯示兩件事：本州日本海側的金澤、高山、白川鄉雪量遠超過氣溫給人的印象；你在這份行程待在戶外的時間大多在天黑後，更接近最低而非平均。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
雪
</span>
          <h2 className={styles.sectionTitle}>
在日本哪裡看得到雪？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
通常不是東京、京都或大阪，這三座太平洋側城市下雪是新聞，不是季節。雪在山區和日本海側，有用的問題不是哪裡最深，而是哪種雪適合你實際的旅程。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["地點", "交通方式", "雪季", "適合誰"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {snowRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.season}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.forWhom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
唯一不用多住一晚的是湯澤這邊，所以放在這份計畫的第 3 天。要滑雪而不只是看的話，最該先訂的是裝備而不是雪票，出發前也請確定保險，雪道內和雪道外在條款中完全不同，<Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en">滑雪旅遊保險比較（英文）</Link>有說明。如果雪是旅程的全部，請跳過城市，看<Link href="/zh-tw/guides/attractions/niseko-ski-tours">二世谷滑雪攻略</Link>，內容涵蓋接送、教練課和四大區域，依 Niseko United 票價表 2026 年 12 月 24 日到 2027 年 2 月 28 日成人 All Mountain 一日票 ¥13,500。
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={klookFor(galaNaebaSkiDayTripTokyo.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
GALA 湯澤／苗場包車 →
</KlookLink>
            <KlookLink href={klookFor(hakubaHapponeBusLiftRental.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
白馬巴士加雪票加租借 →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiSnowboardRental.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷雪具租借 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
預訂
</span>
          <h2 className={styles.sectionTitle}>
冬季行程要提前預訂嗎？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
這份行程有一件事的答案不是「建議」而是「否則就去不了」。白川鄉點燈一年四個晚上，完全事前預約，協會公告明確說當天不售入場券。清單上其他項目都只是程度問題。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["項目", "時間", "主辦單位實際要求", "出處"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datedRows.map((row) => (
                    <tr key={row.event}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.event}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rule}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
點燈日期和當天不售票規定出自白川鄉觀光協會第 41 屆公告，點燈巴士出自濃飛巴士頁面；雪祭日期和會場出自札幌雪祭第 77 屆公告；小樽日期出自小樽觀光協會和北海道官方觀光網站，該網站也列出支笏湖祭典；滑雪日期出自 Niseko United、GALA 湯澤和 Hakuba Valley；teamLab 數字出自 teamLab 展覽頁面。均於 {REREAD} 查核。除各主辦單位公布的日期外沒有任何假設，如果旅程在這些期間之外，請視為該列不適用，而不是大致適用。
</p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
從頭開始的實際預訂順序：日期合適的話先訂點燈之夜，再訂住宿、Kagayaki 座位、金澤巴士、滑雪租借、兩週前的 SHIBUYA SKY，其他在最後兩週處理。
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink
              href={klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
白川鄉點燈一日 →
</KlookLink>
            <KlookLink
              href={klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
金澤出發白川鄉一日 →
</KlookLink>
            <KlookLink
              href={klookFor(teamlabBotanicalGardenOsakaTicket.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
teamLab 植物園大阪 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
另一條冬季路線
</span>
          <h2 className={styles.sectionTitle}>
為了雪祭改去北海道會更好嗎？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
如果旅程在 2 月上半，請認真考慮。<strong>第 77 屆札幌雪祭於 2027 年 2 月 4 到 11 日舉行</strong>，有三個會場：大通西 1 到西 11 丁目、薄野站前通南 4 到南 6 條和 Tsudome 會場，全部免費入場，和白川鄉點燈正好相反。雪祭需要的是住宿和機票，都是幾個月前就滿。<Link href="/zh-tw/guides/attractions/sapporo-snow-festival-tours">札幌雪祭攻略</Link>有完整的會場和行程。這個版本保留東京，換掉北陸段。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["天數", "改做什麼"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hokkaidoRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
雪祭日期和會場範圍出自札幌雪祭執行委員會第 77 屆公告，查核日：{REREAD}；同一公告新增 2027 年 2 月 12 到 14 日的札幌 Snow Sports Park 為相關活動。札幌 2 月平均最高 0.4°C 和 1 月降雪平年值 137 公分是上面的氣象廳數字。有一點要說明：往北海道的鐵路很長，多數旅客都搭飛機，JR 東日本南北海道周遊券只有本來就會常搭 JR 東日本時才值得。
</p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
第 8 天的一日遊，小樽雪燈之路在 2027 年 2 月 6 到 13 日，所以雪祭旅程可以兩者都看；<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">札幌出發小樽一日遊攻略（英文）</Link>有電車和運河小鎮的介紹。如果想把整趟旅程都給北海道，<Link href="/zh-tw/guides/attractions/hokkaido-7-day-itinerary">北海道 7 天行程</Link>是留在島上的一週。
</p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={klookFor(newChitoseSapporoSharedTransfer.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
新千歲 → 札幌接送 →
</KlookLink>
            <KlookLink href={klookFor(sapporoSnowParkHalfDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
札幌雪上樂園半日 →
</KlookLink>
            <KlookLink href={klookFor(jrEastSouthHokkaidoPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
JR 東日本南北海道周遊券 →
</KlookLink>
            <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
二世谷機場接駁 →
</KlookLink>
            <KlookLink href={klookFor(rusutsuResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
留壽都機場接駁 →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
行李
</span>
          <h2 className={styles.sectionTitle}>
冬天去日本要帶什麼？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
比你想的少，而且要多層而不是厚重。原因不是戶外氣溫，而是室內：這份行程的電車、商店和餐廳暖氣都很強，一件脫不掉的厚衣服比三件能脫的薄衣服差。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["項目", "在這條路線為什麼需要"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {packRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"如果加上北海道的冬季一日遊"}
          intro={"四個札幌出發的冬季行程，用於這趟旅程的 2 月版本。全部是季節商品而不是全年商品，所以值得提早打開，不要等到當天。"}
          tours={[withKlookLocale(otaruSnowParkDayTour, LOCALE, { title: "小樽、白色戀人公園與雪上樂園一日遊", desc: "結合小樽運河、蒸汽時鐘、白色戀人公園和玩雪的北海道一日遊" }), withKlookLocale(asahiyamaBieiHighlightsTour, LOCALE, { title: "札幌出發旭山動物園、美瑛青池與精靈露台一日遊", desc: "從札幌前往旭川動物園、美瑛青池和精靈露台的一日巴士，有多條路線，冬季可加購雪上摩托車" }), withKlookLocale(lakeShikotsuIceFestivalHalfDayTour, LOCALE, { title: "札幌出發支笏湖冰濤祭半日遊", desc: "冬季限定的支笏湖冰濤祭，從札幌出發的導覽半日，是北海道這一側另一個 2 月活動" }), withKlookLocale(sapporoSnowParkHalfDayTour, LOCALE, { title: "Wonderland Sapporo 雪上樂園半日遊", desc: "市郊雪上樂園半日，含飯店接送和成吉思汗烤肉，是為不帶雪具的旅客設計的版本" })]}
        />

                <Related items={[{ href: "/guides/attractions/okinawa-day-tours", title: "那霸出發沖繩一日遊：北部與南部比較（2026） （英文）" }, { href: "/zh-tw/guides/attractions/jigokudani-snow-monkey-tour", title: "東京出發雪猴行程：地獄谷野猿公苑攻略（2027）" }, { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "東京出發 GALA 湯澤滑雪一日遊：71 分鐘，纜車 ¥8,000 （英文）" }, { href: "/zh-tw/guides/attractions/niseko-ski-tours", title: "二世谷滑雪（2027）：接送、教練課與四大區域" }, { href: "/zh-tw/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 天行程：每日路線" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出發小樽一日遊（2027）：¥800，JR 33 分鐘 （英文）" }, { href: "/zh-tw/guides/attractions/sapporo-snow-festival-tours", title: "札幌雪祭（2027）：2/4–11 三會場免費，該訂什麼" }, { href: "/guides/attractions/japan-10-day-itinerary", title: "日本 10 天行程（2026）：逐日安排 （英文）" }, { href: "/guides/attractions/japan-14-day-itinerary", title: "日本 14 天行程（2026）：逐日安排 （英文）" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山與白川鄉行程（2027）：該從哪裡出發 （英文）" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "東京燈飾 2026-27：日期、時間與免費景點 （英文）" }, { href: "/guides/transport/tokyo-to-kanazawa", title: "東京到金澤（2026）：Kagayaki 時刻、座位與周遊券 （英文）" }, { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略 2026：價格、是否划算與購買方式 （英文）" }, { href: "/guides/money/japan-ski-travel-insurance", title: "滑雪旅遊保險比較：雪道外、救援費用與保障範圍 （英文）" }, { href: "/guides/attractions/where-to-stay-in-tokyo", title: "東京住宿攻略（2026）：依路線和機場比較 （英文）" }, { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab 植物園大阪門票：價格與時間 （英文）" }, { href: "/zh-tw/guides/attractions", title: "更多日本景點 →" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
先確定有日期的項目
</h2>
            <p className={styles.ctaBannerDesc}>
白川鄉點燈只有 2027 年 1 月的四個晚上，現場什麼都不賣；金澤巴士沒預約上不了車；Kagayaki 沒有自由座。這份行程其他都可以等。
</p>
            <div className={styles.pickCtaRow}>
              <KlookLink
                href={klookFor(shirakawagoLightUpTakayamaDayTour.url, LOCALE)}
                target="_blank"
                rel="sponsored noopener"
                className={styles.ctaBannerBtn}
              >
查看白川鄉點燈一日 →
</KlookLink>
              <KlookLink href={klookFor(hokurikuArchPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
查看北陸拱型周遊券 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
